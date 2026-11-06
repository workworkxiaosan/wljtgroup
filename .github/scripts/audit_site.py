#!/usr/bin/env python3
import argparse
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit
import xml.etree.ElementTree as ET

PROJECT_ROOT = Path(__file__).resolve().parents[2]
MAX_REPORT_ERRORS = 300


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.references = []
        self.canonicals = []
        self.alternates = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "link" and "canonical" in values.get("rel", "").split():
            if values.get("href"):
                self.canonicals.append(values["href"])
        if tag == "link" and "alternate" in values.get("rel", "").split() and values.get("hreflang"):
            self.alternates.append((values["hreflang"], values.get("href", "")))

        attributes = []
        if tag in {"a", "area", "link"}:
            attributes.append("href")
        if tag in {"audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"}:
            attributes.append("src")
        if tag == "video":
            attributes.append("poster")
        for attribute in attributes:
            if values.get(attribute):
                self.references.append(values[attribute])


class SiteAudit:
    def __init__(self, root, dist):
        self.root = root
        self.dist = dist.resolve()
        self.content = json.loads((root / "content.json").read_text(encoding="utf-8"))
        self.languages = [language["code"] for language in self.content["languages"]]
        self.default_language = self.content["default_lang"]
        self.site_url = self.content["site_url"].rstrip("/")
        self.site = urlsplit(self.site_url)
        self.errors = []
        self.reference_count = 0
        self.pages = []
        self.seo_pages = []

    def error(self, source, message):
        self.errors.append(f"{source}: {message}")

    def relative_name(self, path):
        return path.relative_to(self.dist).as_posix()

    def page_key(self, path):
        relative = path.relative_to(self.dist)
        if relative.parts[0] in self.languages and relative.parts[0] != self.default_language:
            relative = relative.relative_to(relative.parts[0])
        return relative

    def expected_url(self, key, language):
        path = key if language == self.default_language else Path(language) / key
        return f"{self.site_url}/{quote(path.as_posix(), safe='/')}"

    def target_for(self, source, value):
        try:
            parsed = urlsplit(value)
        except ValueError as exc:
            self.error(self.relative_name(source), f"無效 URL {value!r}：{exc}")
            return None

        if parsed.scheme and parsed.scheme not in {"http", "https"}:
            return None
        if parsed.netloc and parsed.netloc != self.site.netloc:
            return None
        if parsed.scheme in {"http", "https"} and parsed.netloc != self.site.netloc:
            return None
        if not parsed.path:
            return None

        try:
            path = unquote(parsed.path, errors="strict")
        except UnicodeDecodeError as exc:
            self.error(self.relative_name(source), f"URL 編碼無效 {value!r}：{exc}")
            return None
        if "\x00" in path:
            self.error(self.relative_name(source), f"URL 含有空字元：{value!r}")
            return None

        if parsed.scheme or parsed.netloc or path.startswith("/"):
            target = self.dist / path.lstrip("/")
        else:
            target = source.parent / path
        target = target.resolve()
        try:
            target.relative_to(self.dist)
        except ValueError:
            self.error(self.relative_name(source), f"站內引用越出 dist：{value}")
            return None
        if target.is_dir():
            target = target / "index.html"
        return target

    def check_reference(self, source, value):
        if not value or value.startswith("#"):
            return
        target = self.target_for(source, value)
        if target is None:
            return
        self.reference_count += 1
        if not target.is_file():
            self.error(self.relative_name(source), f"找不到站內連結或資源 {value}（{self.relative_name(target)}）")

    def check_page(self, page):
        name = self.relative_name(page)
        parser = PageParser()
        try:
            parser.feed(page.read_text(encoding="utf-8"))
            parser.close()
        except (UnicodeDecodeError, ValueError) as exc:
            self.error(name, f"HTML 無法解析：{exc}")
            return

        for value in parser.references:
            self.check_reference(page, value)
        if page not in self.seo_pages:
            return

        key = self.page_key(page)
        current_language = self.default_language
        if page.relative_to(self.dist).parts[0] in self.languages:
            current_language = page.relative_to(self.dist).parts[0]
        expected_canonical = self.expected_url(key, current_language)
        if len(parser.canonicals) != 1:
            self.error(name, f"canonical 應正好 1 個，實際 {len(parser.canonicals)} 個")
        elif parser.canonicals[0] != expected_canonical:
            self.error(name, f"canonical 應為 {expected_canonical}，實際 {parser.canonicals[0]}")

        grouped = {}
        for language, href in parser.alternates:
            grouped.setdefault(language, []).append(href)
        expected_languages = set(self.languages)
        if set(grouped) - expected_languages - {"x-default"}:
            self.error(name, f"含未知 hreflang：{sorted(set(grouped) - expected_languages - {'x-default'})}")
        for language in self.languages:
            values = grouped.get(language, [])
            expected = self.expected_url(key, language)
            if len(values) != 1:
                self.error(name, f"hreflang={language} 應正好 1 個，實際 {len(values)} 個")
            elif values[0] != expected:
                self.error(name, f"hreflang={language} 應指向 {expected}，實際 {values[0]}")
        if "x-default" in grouped:
            values = grouped["x-default"]
            expected = self.expected_url(key, self.default_language)
            if len(values) != 1 or values[0] != expected:
                self.error(name, f"x-default 應只有 1 個並指向 {expected}")

    def check_css(self):
        pattern = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
        for css in sorted(self.dist.rglob("*.css")):
            try:
                text = css.read_text(encoding="utf-8")
            except UnicodeDecodeError as exc:
                self.error(self.relative_name(css), f"CSS 無法讀取：{exc}")
                continue
            for match in pattern.finditer(text):
                value = match.group(2).strip()
                if value and not value.startswith("data:"):
                    self.check_reference(css, value)

    def check_sitemap(self):
        sitemap = self.dist / "sitemap.xml"
        if not sitemap.is_file():
            self.error("sitemap.xml", "檔案不存在")
            return
        try:
            root = ET.parse(sitemap).getroot()
        except (ET.ParseError, OSError) as exc:
            self.error("sitemap.xml", f"XML 無法解析：{exc}")
            return

        namespaces = {
            "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
            "xhtml": "http://www.w3.org/1999/xhtml",
        }
        entries = root.findall("sm:url", namespaces)
        locations = []
        expected_by_url = {}
        for page in self.seo_pages:
            language = page.relative_to(self.dist).parts[0]
            if language not in self.languages:
                language = self.default_language
            expected_by_url[self.expected_url(self.page_key(page), language)] = self.page_key(page)

        for index, entry in enumerate(entries, 1):
            location = entry.find("sm:loc", namespaces)
            loc = (location.text or "").strip() if location is not None else ""
            if not loc:
                self.error("sitemap.xml", f"第 {index} 個 url 缺少 loc")
                continue
            locations.append(loc)
            key = expected_by_url.get(loc)
            if key is None:
                continue
            alternates = entry.findall("xhtml:link", namespaces)
            grouped = {}
            for alternate in alternates:
                if alternate.get("rel") == "alternate" and alternate.get("hreflang"):
                    grouped.setdefault(alternate.get("hreflang"), []).append(alternate.get("href", ""))
            for language in self.languages + ["x-default"]:
                expected_language = self.default_language if language == "x-default" else language
                values = grouped.get(language, [])
                expected = self.expected_url(key, expected_language)
                if len(values) != 1:
                    self.error("sitemap.xml", f"{loc} 的 hreflang={language} 應正好 1 個，實際 {len(values)} 個")
                elif values[0] != expected:
                    self.error("sitemap.xml", f"{loc} 的 hreflang={language} 指向錯誤")
            unknown = set(grouped) - set(self.languages) - {"x-default"}
            if unknown:
                self.error("sitemap.xml", f"{loc} 含未知 hreflang：{sorted(unknown)}")

        counts = Counter(locations)
        for loc, count in counts.items():
            if count > 1:
                self.error("sitemap.xml", f"重複收錄 {loc}（{count} 次）")
        expected = set(expected_by_url)
        for loc in sorted(expected - set(locations)):
            self.error("sitemap.xml", f"缺少頁面 {loc}")
        for loc in sorted(set(locations) - expected):
            self.error("sitemap.xml", f"收錄非頁面或 canonical 不符：{loc}")

    def run(self):
        if not self.dist.is_dir():
            self.error("dist", "目錄不存在，請先執行乾淨構建")
            return
        self.pages = sorted(self.dist.rglob("*.html"))
        self.seo_pages = [page for page in self.pages if page.relative_to(self.dist).as_posix() != "404.html"]
        if not self.pages:
            self.error("dist", "沒有 HTML 頁面")
            return
        for page in self.pages:
            self.check_page(page)
        self.check_css()
        self.check_sitemap()

    def report(self):
        now = datetime.now(timezone.utc).isoformat(timespec="seconds")
        lines = [
            "# WLJT 網站雙週體檢",
            "",
            f"- 時間（UTC）：{now}",
            f"- 結果：{'失敗' if self.errors else '通過'}",
            f"- HTML 頁面：{len(self.pages)}",
            f"- 站內連結／資源引用：{self.reference_count}",
            f"- 問題：{len(self.errors)}",
            "",
        ]
        if self.errors:
            lines.extend(["## 待修復問題", ""])
            shown = self.errors[:MAX_REPORT_ERRORS]
            lines.extend(f"- {message}" for message in shown)
            if len(self.errors) > len(shown):
                lines.append(f"- 另有 {len(self.errors) - len(shown)} 個問題未列出。")
        else:
            lines.append("乾淨構建後的站內連結、資源、canonical、hreflang 與 sitemap 基本驗證均通過。")
        return "\n".join(lines) + "\n"


def main():
    parser = argparse.ArgumentParser(description="審計 WLJT 靜態網站構建產物")
    parser.add_argument("--root", type=Path, default=PROJECT_ROOT)
    parser.add_argument("--dist", type=Path)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    root = args.root.resolve()
    dist = args.dist if args.dist is not None else root / "dist"
    if not dist.is_absolute():
        dist = root / dist

    try:
        audit = SiteAudit(root, dist)
        audit.run()
    except (OSError, KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
        print(f"審計無法執行：{exc}", file=sys.stderr)
        return 2

    report = audit.report()
    if args.report:
        args.report.write_text(report, encoding="utf-8")
    print(report, end="")
    return 1 if audit.errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
