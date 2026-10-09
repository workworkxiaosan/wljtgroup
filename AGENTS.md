# 萬里金騰集團官網（wljtgroup.com）

澳門萬里金騰集團有限公司官方網站，靜態多語言站（繁中/简中/en/pt），托管於 GitHub Pages。

## 結構

- `content.json` — 全部網站內容的唯一母本（4 語言、集團動態文章、旗下企業資料）。**更新內容只改這裡**。
- `build.py` — 讀 `content.json` 生成靜態頁面到 `dist/`（含 `dist/CNAME`，內容 `www.wljtgroup.com`）。語言目錄：繁中在根目錄，其他在 `zh-CN/`、`en/`、`pt/`。
- `assets/` — 源頭樣式/腳本/圖片，`build.py` 會拷貝進 `dist/`。`logo.svg` 為自製金線「萬」字標（兼作 favicon）；`og-cover.jpg` 是社交分享圖（1200×630，PIL 生成）。
- `dist/` — 生成物，**不要手改**，已被 .gitignore 忽略。除 24 個頁面外還自動生成 `robots.txt`、`sitemap.xml`（含 4 語言 hreflang）、`404.html`。
- `.scrape/` — 舊 WordPress 佔位站及兩家被投企業官網的抓取備份（`NOTES.md` 是被投企業全部事實的核對來源）。

## 更新流程

1. 改 `content.json`（加集團動態文章 = 在 `insights` 數組加一條，4 語言都填；帶 `slug` 和 `body`（每語言是段落數組）會自動生成詳情頁 `insights/{slug}.html`，列表「閱讀更多」自動連到該頁）。
2. `python3 build.py`。
3. `git add -A && git commit -m "..." && git push`。
4. GitHub Pages 部署後線上生效。

## 關鍵事實

- 頁面共 6 個（`PAGES`）：index/about/approach/portfolio/insights/contact，× 4 語言 = 24 頁 + 3 篇動態詳情頁 × 4 語言。
- 公司名 4 語言（`content.json` 的 `site_names`）：zh-TW「澳門萬里金騰集團有限公司」、zh-CN「澳门万里金腾集团有限公司」、en「Macao WLJT Group Limited」（**暫定，待與註冊文件核對**）、pt「Grupo WLJT de Macau, Limitada」（**暫定，待核對**）。
- **佔位待確認**：email `info@wljtgroup.com` 為佔位；地址僅寫「澳門（詳細地址更新中）」，未取得前**不要虛構門牌**；社交鏈接（FB/LinkedIn/Twitter）在 `social` 字段，目前是 `#`。確認後改 `content.json` 重建即可。
- 旗下企業（`content.json` 的 `portfolio` 數組，含 4 語言名稱/業務/關鍵數據/官網鏈接）：
  1. **澳門海易通達科技有限公司**（Macao NexMatrix Technology Limited，https://nexmatrixs.com/）——AI 社媒矩陣與品牌出海一站式平台，旗艦硬件 NEXUS ONE。數據（5.3億+月活覆蓋/100+顧問/24 安卓實例/6 大服務維度）以 `.scrape/NOTES.md` 為準。
  2. **澳門橋霍頓有限公司**（United Macao Bridge Holden Corporation Limited，https://bridgeholdengroup.com/）——跨境醫療諮詢與醫療貿易。**合規口徑必須保留**：該公司僅提供諮詢協調與專家資源匹配，**不提供直接醫療治療服務**（portfolio 頁有醒目聲明，見 `disclaimer` 字段）。數據（47+專家/23 網絡/12+專科）以 `.scrape/NOTES.md` 為準。
- 域名 `www.wljtgroup.com`：`site_url` 是絕對 URL 的基準（canonical/OG/sitemap），換域名時改它。默認語言繁中在根路徑（如 `/about.html`）。
- 每頁自動帶 canonical / Open Graph / Twitter Card / hreflang 標籤，首頁帶 Organization JSON-LD（`site_names` 按各語言版本書寫，簡體頁用簡體公司名）。
- 設計：深墨藍黑（#0C1B2A / #101820）+ 香檳金點綴（#C3A24B / #B08D3E）+ 米白背景（#FAF9F6）；字體 Playfair Display（標題）+ DM Sans（正文），與橋霍頓站形成集團視覺延續；純手寫 CSS/JS，無框架。
- 繁體用港澳寫法（「平台/了解/群體」的 台/了/群 是正字）。
- 聯繫表單為前端演示，未接後端；如需真正收集留言可接 Formspree 等服務。
- 列表排序：集團動態按 date 降序，首頁最新動態取前 3 條。
- 舊站（2026-10 抓取）為 WordPress 佔位模板，無可用內容，全站文案為新撰。集團動態中兩篇投資文章的日期為合理虛構（2026-06-18 海易通達、2026-08-08 橋霍頓），如需精確日期請核實後修改。
