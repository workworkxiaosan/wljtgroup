#!/usr/bin/env python3
"""
萬里金騰集團官網靜態站生成器
讀取 content.json，輸出多語言靜態 HTML 到 dist/。

用法:
    python3 build.py

更新網站內容 = 改 content.json → 重新執行 python3 build.py。
"""
import json, html, os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, 'dist')
C = json.load(open(os.path.join(ROOT, 'content.json'), encoding='utf-8'))
I18N = C['i18n']
LANGS = [l['code'] for l in C['languages']]
DEFAULT = C['default_lang']
PAGES = ['index', 'about', 'approach', 'portfolio', 'insights', 'contact']

def esc(s): return html.escape(str(s), quote=True)

def t(lang, *keys):
    d = I18N[lang]
    for k in keys: d = d[k]
    return d

# ---------------- URL 規則 ----------------
# 默認語言 zh-TW 放根目錄，其他語言在 /zh-CN/ /en/ /pt/ 子目錄
def page_href(page, target_lang, current_lang):
    if target_lang == DEFAULT:
        target = 'index.html' if page == 'index' else f'{page}.html'
    else:
        target = f'{target_lang}/' + ('index.html' if page == 'index' else f'{page}.html')
    prefix = '../' if current_lang != DEFAULT else ''
    return prefix + target

def asset(path, current_lang):
    prefix = '../' if current_lang != DEFAULT else ''
    return prefix + 'assets/' + path

def abs_url(page, lang):
    base = C.get('site_url', 'https://www.wljtgroup.com').rstrip('/')
    name = 'index.html' if page == 'index' else f'{page}.html'
    path = name if lang == DEFAULT else f'{lang}/{name}'
    return f'{base}/{path}'

def site_name(lang):
    return C['site_names'][lang]

# ---------------- SVG 圖標 ----------------
def icon(name, cls=''):
    P = {
        'globe': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        'pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
        'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        'arrow': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
        'menu': '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
        'close': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        'check': '<polyline points="20 6 9 17 4 12"/>',
        'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
        'cpu': '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
        'compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
        'flag': '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
        'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
        'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
        'handshake': '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 1 0 3-3 6.18 6.18 0 0 0-8.14-.68l-3 3a5.79 5.79 0 0 0-7.06.87l-.47.28a2 2 0 1 1-3 3 3.74 3.74 0 0 0 2.06 1.57"/>',
        'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        'chart': '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
        'landmark': '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
        'coins': '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
        'building': '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="10" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/>',
        'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'external': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
        'facebook': '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
        'linkedin': '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
        'twitter': '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    }
    c = f' class="{cls}"' if cls else ''
    return (f'<svg{c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{P[name]}</svg>')

SOCIAL = [('facebook', 'Facebook'), ('linkedin', 'LinkedIn'), ('twitter', 'Twitter')]

# ---------------- 頁頭 / 頁尾 ----------------
def brand_block(lang, pre):
    logo = pre + asset('img/logo.svg', lang)
    hp = pre + page_href('index', lang, lang)
    return (f'<a href="{hp}" class="logo-link"><img src="{logo}" alt="{esc(site_name(lang))}">'
            f'<span class="wordmark"><span class="wordmark-zh">{esc(C["site_short"]["zh-TW"])}</span>'
            f'<span class="wordmark-en">WLJT GROUP</span></span></a>')

def header(page, lang, pre=''):
    nav = I18N[lang]['nav']
    hp = lambda p: pre + page_href(p, lang, lang)
    links = ''.join(
        f'<a href="{hp(p)}" class="{"active" if p == page else ""}">{esc(nav[p if p != "index" else "home"])}</a>'
        for p in PAGES)
    lang_btn_label = next(l['label'] for l in C['languages'] if l['code'] == lang)
    lang_items = ''.join(
        f'<a href="{pre + page_href(page, l["code"], lang)}" class="{"current" if l["code"] == lang else ""}">{l["flag"]} {esc(l["label"])}</a>'
        for l in C['languages'])
    mlinks = ''.join(
        f'<a href="{hp(p)}" class="mnav {"active" if p == page else ""}">{esc(nav[p if p != "index" else "home"])}</a>'
        for p in PAGES)
    return f'''<header class="site-header" id="site-header">
  <div class="container">
    {brand_block(lang, pre)}
    <nav class="main-nav">{links}</nav>
    <div class="header-actions">
      <div class="lang-switch">
        <button type="button" aria-haspopup="true">{icon('globe')}<span>{esc(lang_btn_label)}</span></button>
        <div class="dropdown">{lang_items}</div>
      </div>
      <button class="menu-toggle" id="menu-toggle" aria-label="Menu">{icon('menu')}</button>
    </div>
  </div>
</header>
<div class="panel-overlay" id="panel-overlay"></div>
<aside class="mobile-panel" id="mobile-panel">
  <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
    <button class="menu-toggle close" onclick="document.getElementById('mobile-panel').classList.remove('open');document.getElementById('panel-overlay').classList.remove('open');" aria-label="Close">{icon('close')}</button>
  </div>
  {mlinks}
  <div class="lang-switch" style="margin-top:1rem;">
    <button type="button" aria-haspopup="true">{icon('globe')}<span>{esc(lang_btn_label)}</span></button>
    <div class="dropdown" style="position:static;box-shadow:none;border:none;display:block;">{lang_items}</div>
  </div>
</aside>'''

def footer(lang, pre=''):
    nav = I18N[lang]['nav']
    ft = I18N[lang]['footer']
    hp = lambda p: pre + page_href(p, lang, lang)
    social = ''.join(f'<a href="{C["social"][s]}" aria-label="{label}">{icon(s)}</a>' for s, label in SOCIAL)
    companies = ''.join(
        f'<li><a href="{p["url"]}" target="_blank" rel="noopener">{esc(p["name"][lang])}</a></li>'
        for p in C['portfolio'])
    return f'''<footer class="site-footer">
  <div class="container section-spacing">
    <div class="footer-grid">
      <div class="footer-col">
        {brand_block(lang, pre)}
        <p class="desc">{esc(ft['description'])}</p>
        <div class="social-row">{social}</div>
      </div>
      <div class="footer-col">
        <h4>{esc(ft['quickLinks'])}</h4>
        <ul>
          <li><a href="{hp('index')}">{esc(nav['home'])}</a></li>
          <li><a href="{hp('about')}">{esc(nav['about'])}</a></li>
          <li><a href="{hp('approach')}">{esc(nav['approach'])}</a></li>
          <li><a href="{hp('portfolio')}">{esc(nav['portfolio'])}</a></li>
          <li><a href="{hp('insights')}">{esc(nav['insights'])}</a></li>
          <li><a href="{hp('contact')}">{esc(nav['contact'])}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>{esc(ft['companies'])}</h4>
        <ul>{companies}</ul>
      </div>
      <div class="footer-col">
        <h4>{esc(ft['contactTitle'])}</h4>
        <ul>
          <li><a href="mailto:{C['email']}">{C['email']}</a></li>
          <li><span>{esc(C['address'][lang])}</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom container">
    <span>© {C.get('year', 2026)} {esc(site_name(lang))}. {esc(ft['allRightsReserved'])}.</span>
    <a href="mailto:{C['email']}">{C['email']}</a>
  </div>
</footer>'''

def page_shell(page, lang, title, description, body, depth=0, url_path=None, og_image=None):
    pre = '../' * depth
    css = pre + asset('css/style.css', lang)
    js = pre + asset('js/main.js', lang)
    lang_links = ''.join(
        f'<link rel="alternate" hreflang="{l}" href="{abs_url(url_path or page, l)}">'
        for l in LANGS)
    canonical = abs_url(url_path or page, lang)
    base = C.get('site_url', 'https://www.wljtgroup.com').rstrip('/')
    og_image = og_image or (base + '/assets/img/og-cover.jpg')
    og_locale = {'zh-TW': 'zh_TW', 'zh-CN': 'zh_CN', 'en': 'en_US', 'pt': 'pt_PT'}[lang]
    sn = site_name(lang)
    jsonld = ''
    if page == 'index':
        jsonld = f'''<script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"Organization","name":"{sn}","alternateName":"{C['site_name_en']}","url":"{base}","logo":"{base}/assets/img/logo.svg","email":"{C['email']}"}}
  </script>'''
    return f'''<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} | {esc(sn)}</title>
  <meta name="description" content="{esc(description)}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="{'website' if page == 'index' else 'article'}">
  <meta property="og:site_name" content="{esc(sn)}">
  <meta property="og:locale" content="{og_locale}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{og_image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(description)}">
  <meta name="twitter:image" content="{og_image}">
  <link rel="icon" type="image/svg+xml" href="{pre + asset('img/logo.svg', lang)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{css}">
  <noscript><style>.reveal{{opacity:1 !important;transform:none !important;}}</style></noscript>
  {lang_links}
  {jsonld}
</head>
<body class="page-{page}">
{header(page, lang, pre)}
<main>
{body}
</main>
{footer(lang, pre)}
<script src="{js}" defer></script>
</body>
</html>'''

def page_hero(lang, section):
    return f'''<section class="page-hero">
  <div class="container">
    <div class="reveal">
      <div class="gold-rule"></div>
      <h1>{esc(t(lang, section, 'title'))}</h1>
      <p class="sub">{esc(t(lang, section, 'subtitle'))}</p>
    </div>
  </div>
</section>'''

def section_head(kicker, title, subtitle=None, light=False, center=True):
    cls = 'section-head' + (' light' if light else '') + (' center' if center else '')
    sub = f'<p class="section-sub">{esc(subtitle)}</p>' if subtitle else ''
    return f'''<div class="{cls} reveal">
      <span class="kicker">{esc(kicker)}</span>
      <h2>{esc(title)}</h2>
      {sub}
    </div>'''

def insight_card(a, lang, base_href=''):
    ins = I18N[lang]['insights']
    href = base_href + (f'insights/{a["slug"]}.html' if a.get('slug') else 'insights.html')
    return f'''
      <div class="card insight-card reveal">
        <div class="insight-meta">
          <span class="badge">{esc(a['category'][lang])}</span>
          <span class="date">{icon('calendar')}{a['date']}</span>
        </div>
        <h3>{esc(a['title'][lang])}</h3>
        <p>{esc(a['excerpt'][lang])}</p>
        <a class="read-more" href="{href}">{esc(ins['readMore'])}{icon('arrow')}</a>
      </div>'''

# ---------------- 首頁 ----------------
def render_index(lang):
    hm = I18N[lang]['home']
    stats = ''.join(f'''
        <div class="stat reveal"><span class="stat-value">{esc(s['value'])}</span><span class="stat-label">{esc(s['label'])}</span></div>'''
        for s in hm['stats'])
    sector_icons = ['heart', 'cpu', 'compass']
    sectors = ''.join(f'''
        <div class="card sector-card reveal">
          <div class="icon-badge">{icon(sector_icons[i])}</div>
          <h3>{esc(s['title'])}</h3>
          <p>{esc(s['text'])}</p>
        </div>''' for i, s in enumerate(hm['sectors']))
    companies = ''
    for p in C['portfolio']:
        companies += f'''
        <a class="card company-card reveal" href="{page_href('portfolio', lang, lang)}">
          <div class="company-img"><img src="{asset('img/' + p['image'], lang)}" alt="{esc(p['name'][lang])}" loading="lazy"></div>
          <div class="company-body">
            <span class="company-sector">{esc(p['sector'][lang])}</span>
            <h3>{esc(p['name'][lang])}</h3>
            <p>{esc(p['tagline'][lang])}</p>
            <span class="read-more">{esc(hm['learnMore'])}{icon('arrow')}</span>
          </div>
        </a>'''
    latest = ''.join(insight_card(a, lang) for a in sorted(C['insights'], key=lambda x: x['date'], reverse=True)[:3])
    body = f'''
<section class="hero">
  <div class="container">
    <div class="reveal">
      <span class="kicker gold">{esc(hm['heroKicker'])}</span>
      <h1>{esc(hm['heroTitle'])}</h1>
      <p class="hero-sub">{esc(hm['heroSubtitle'])}</p>
      <div class="cta-row">
        <a class="btn btn-gold" href="{page_href('about', lang, lang)}">{esc(hm['cta1'])}{icon('arrow')}</a>
        <a class="btn btn-ghost" href="{page_href('portfolio', lang, lang)}">{esc(hm['cta2'])}</a>
      </div>
    </div>
  </div>
</section>
<section class="stats-band">
  <div class="container">
    <div class="stats-grid">{stats}
    </div>
  </div>
</section>
<section class="section-spacing">
  <div class="container">
    {section_head(hm['sectorsKicker'], hm['sectorsTitle'], hm['sectorsSubtitle'])}
    <div class="grid grid-3">{sectors}
    </div>
  </div>
</section>
<section class="section-spacing bg-cream">
  <div class="container">
    {section_head(hm['portfolioKicker'], hm['portfolioTitle'], hm['portfolioSubtitle'])}
    <div class="grid grid-2">{companies}
    </div>
  </div>
</section>
<section class="section-spacing">
  <div class="container">
    {section_head(hm['latestKicker'], hm['latestTitle'])}
    <div class="grid grid-3">{latest}
    </div>
    <div class="text-center mt-12 reveal">
      <a class="btn btn-outline" href="{page_href('insights', lang, lang)}">{esc(hm['viewAll'])}{icon('arrow')}</a>
    </div>
  </div>
</section>
<section class="section-spacing cta-band">
  <div class="container">
    <div class="reveal">
      <div class="gold-rule center"></div>
      <h2>{esc(hm['ctaTitle'])}</h2>
      <p class="lead">{esc(hm['ctaText'])}</p>
      <a class="btn btn-gold" href="{page_href('contact', lang, lang)}">{esc(hm['ctaBtn'])}{icon('arrow')}</a>
    </div>
  </div>
</section>'''
    return page_shell('index', lang, t(lang, 'nav', 'home'), I18N[lang]['meta']['index'], body)

# ---------------- 關於集團 ----------------
def render_about(lang):
    ab = I18N[lang]['about']
    paras = ''.join(f'<p>{esc(p)}</p>' for p in ab['introParas'])
    values = ''.join(f'''
        <div class="card value-card reveal">
          <h3>{esc(v['title'])}</h3>
          <p>{esc(v['text'])}</p>
        </div>''' for v in ab['values'])
    gov_paras = ''.join(f'<p>{esc(p)}</p>' for p in ab['govParas'])
    body = page_hero(lang, 'about') + f'''
<section class="section-spacing">
  <div class="container">
    <div class="split">
      <div class="reveal">
        {section_head(ab['introKicker'], ab['introTitle'], center=False)}
        <div class="prose">{paras}</div>
      </div>
      <div class="reveal">
        <img class="framed-img" src="{asset('img/about-office.jpg', lang)}" alt="{esc(ab['introTitle'])}" loading="lazy">
      </div>
    </div>
  </div>
</section>
<section class="section-spacing bg-cream">
  <div class="container">
    <div class="grid grid-2">
      <div class="card vm-card reveal">
        <div class="icon-badge">{icon('eye')}</div>
        <h3>{esc(ab['visionTitle'])}</h3>
        <p>{esc(ab['visionText'])}</p>
      </div>
      <div class="card vm-card reveal">
        <div class="icon-badge">{icon('flag')}</div>
        <h3>{esc(ab['missionTitle'])}</h3>
        <p>{esc(ab['missionText'])}</p>
      </div>
    </div>
  </div>
</section>
<section class="section-spacing">
  <div class="container">
    {section_head(ab['valuesKicker'], ab['valuesTitle'])}
    <div class="grid grid-4">{values}
    </div>
  </div>
</section>
<section class="section-spacing dark-section">
  <div class="container">
    <div class="max-w-3 mx-auto text-center reveal">
      <span class="kicker gold">{esc(ab['govKicker'])}</span>
      <h2>{esc(ab['govTitle'])}</h2>
      <div class="prose light">{gov_paras}</div>
    </div>
  </div>
</section>'''
    return page_shell('about', lang, ab['title'], I18N[lang]['meta']['about'], body)

# ---------------- 投資理念 ----------------
def render_approach(lang):
    ap = I18N[lang]['approach']
    principle_icons = ['clock', 'chart', 'target', 'shield']
    principles = ''.join(f'''
        <div class="card principle-card reveal">
          <div class="icon-badge">{icon(principle_icons[i])}</div>
          <h3>{esc(p['title'])}</h3>
          <p>{esc(p['text'])}</p>
        </div>''' for i, p in enumerate(ap['principles']))
    way_icons = ['coins', 'link', 'users']
    ways = ''.join(f'''
        <div class="way-item reveal">
          <span class="way-num">0{i+1}</span>
          <div>
            <h3>{esc(w['title'])}</h3>
            <p>{esc(w['text'])}</p>
          </div>
        </div>''' for i, w in enumerate(ap['ways']))
    macao_icons = ['landmark', 'coins', 'globe', 'building']
    macao = ''.join(f'''
        <div class="card macao-card reveal">
          <div class="icon-badge">{icon(macao_icons[i])}</div>
          <h3>{esc(m['title'])}</h3>
          <p>{esc(m['text'])}</p>
        </div>''' for i, m in enumerate(ap['macao']))
    body = page_hero(lang, 'approach') + f'''
<section class="section-spacing">
  <div class="container">
    {section_head(ap['principlesKicker'], ap['principlesTitle'])}
    <div class="grid grid-4">{principles}
    </div>
  </div>
</section>
<section class="section-spacing bg-cream">
  <div class="container">
    {section_head(ap['waysKicker'], ap['waysTitle'])}
    <div class="max-w-3 mx-auto">{ways}
    </div>
  </div>
</section>
<section class="section-spacing dark-section">
  <div class="container">
    {section_head(ap['macaoKicker'], ap['macaoTitle'], ap['macaoSubtitle'], light=True)}
    <div class="grid grid-4">{macao}
    </div>
  </div>
</section>'''
    return page_shell('approach', lang, ap['title'], I18N[lang]['meta']['approach'], body)

# ---------------- 投資組合 ----------------
def render_portfolio(lang):
    pf = I18N[lang]['portfolio']
    sections = ''
    for i, p in enumerate(C['portfolio']):
        biz = ''.join(f'<li>{icon("check")}<span>{esc(b[lang])}</span></li>' for b in p['businesses'])
        stats = ''.join(
            f'<div class="stat"><span class="stat-value">{esc(s["value"])}</span><span class="stat-label">{esc(s["label"][lang])}</span></div>'
            for s in p['stats'])
        disclaimer = ''
        if p.get('disclaimer'):
            disclaimer = f'''<div class="disclaimer">{icon("shield")}<p>{esc(p['disclaimer'][lang])}</p></div>'''
        sections += f'''
    <div class="portfolio-block{' reverse' if i % 2 else ''}">
      <div class="portfolio-img reveal">
        <img src="{asset('img/' + p['image'], lang)}" alt="{esc(p['name'][lang])}" loading="lazy">
      </div>
      <div class="portfolio-text reveal">
        <span class="kicker">{esc(p['sector'][lang])}</span>
        <h2>{esc(p['name'][lang])}</h2>
        <p class="portfolio-tagline">{esc(p['tagline'][lang])}</p>
        <p>{esc(p['description'][lang])}</p>
        <h4>{esc(pf['businessLabel'])}</h4>
        <ul class="biz-list">{biz}</ul>
        <h4>{esc(pf['highlightsLabel'])}</h4>
        <div class="stats-grid inline">{stats}</div>
        {disclaimer}
        <a class="btn btn-outline" href="{p['url']}" target="_blank" rel="noopener">{esc(pf['visitSite'])}{icon('external')}</a>
      </div>
    </div>'''
    focus_icons = ['heart', 'cpu', 'globe']
    focus = ''.join(f'''
        <div class="card sector-card reveal">
          <div class="icon-badge">{icon(focus_icons[i])}</div>
          <h3>{esc(f['title'])}</h3>
          <p>{esc(f['text'])}</p>
        </div>''' for i, f in enumerate(pf['focus']))
    body = page_hero(lang, 'portfolio') + f'''
<section class="section-spacing">
  <div class="container">{sections}
  </div>
</section>
<section class="section-spacing bg-cream">
  <div class="container">
    {section_head(pf['focusKicker'], pf['focusTitle'], pf['focusSubtitle'])}
    <div class="grid grid-3">{focus}
    </div>
  </div>
</section>'''
    return page_shell('portfolio', lang, pf['title'], I18N[lang]['meta']['portfolio'], body)

# ---------------- 集團動態 ----------------
def render_insights(lang):
    all_sorted = sorted(C['insights'], key=lambda x: x['date'], reverse=True)
    cards = ''.join(insight_card(a, lang) for a in all_sorted)
    body = page_hero(lang, 'insights') + f'''
<section class="section-spacing">
  <div class="container">
    <div class="grid grid-3">{cards}
    </div>
  </div>
</section>'''
    return page_shell('insights', lang, t(lang, 'insights', 'title'), I18N[lang]['meta']['insights'], body)

def render_insight_article(lang, a):
    ins = I18N[lang]['insights']
    paras = ''.join(
        f'<p>{esc(p)}</p>' for p in a['body'][lang])
    body = f'''
<section class="page-hero">
  <div class="container">
    <div class="reveal max-w-3 mx-auto">
      <div class="insight-meta" style="justify-content:center;">
        <span class="badge">{esc(a['category'][lang])}</span>
        <span class="date">{icon('calendar')}{a['date']}</span>
      </div>
      <h1 style="font-size:clamp(1.75rem,3.5vw,2.5rem);">{esc(a['title'][lang])}</h1>
    </div>
  </div>
</section>
<section class="section-spacing" style="padding-top:0;">
  <div class="container">
    <div class="max-w-3 mx-auto card article-card">
      <div class="prose">{paras}</div>
      <div class="article-back">
        <a class="read-more" href="../insights.html">{icon('arrow')} {esc(ins['backTo'])}</a>
      </div>
    </div>
  </div>
</section>'''
    return page_shell('insights', lang, a['title'][lang], a['excerpt'][lang], body,
                      depth=1, url_path=f'insights/{a["slug"]}')

# ---------------- 聯繫我們 ----------------
def render_contact(lang):
    ct = I18N[lang]['contact']
    err_req, err_email, submitting = esc(ct['errorRequired']), esc(ct['errorEmail']), esc(ct['submitting'])
    body = page_hero(lang, 'contact') + f'''
<section class="section-spacing">
  <div class="container">
    <div class="contact-grid">
      <div class="card reveal">
        <div class="contact-info">
          <h3>{esc(ct['infoTitle'])}</h3>
          <div class="info-row">
            <div class="label">{icon('mail')}<span>{esc(ct['emailFieldLabel'])}</span></div>
            <a href="mailto:{C['email']}">{C['email']}</a>
          </div>
          <div class="info-row">
            <div class="label">{icon('pin')}<span>{esc(ct['addressLabel'])}</span></div>
            <span>{esc(C['address'][lang])}</span>
          </div>
          <p class="contact-note">{esc(ct['note'])}</p>
        </div>
      </div>
      <div class="card reveal">
        <h3 class="form-title">{esc(ct['formTitle'])}</h3>
        <form class="ajax-form" data-err-required="{err_req}" data-err-email="{err_email}" data-submitting="{submitting}" novalidate>
          <div class="form-group">
            <label for="c-name">{esc(ct['name'])}</label>
            <input id="c-name" name="name" type="text" placeholder="{esc(ct['namePlaceholder'])}" required>
            <p class="err-msg" data-for="name"></p>
          </div>
          <div class="form-group">
            <label for="c-email">{esc(ct['emailLabel'])}</label>
            <input id="c-email" name="email" type="email" placeholder="{esc(ct['emailPlaceholder'])}" required>
            <p class="err-msg" data-for="email"></p>
          </div>
          <div class="form-group">
            <label for="c-message">{esc(ct['message'])}</label>
            <textarea id="c-message" name="message" placeholder="{esc(ct['messagePlaceholder'])}" required></textarea>
            <p class="err-msg" data-for="message"></p>
          </div>
          <button type="submit" class="btn btn-gold-solid">{esc(ct['submit'])}</button>
          <div class="form-toast">{icon('check')}{esc(ct['successMessage'])}</div>
        </form>
      </div>
    </div>
  </div>
</section>'''
    return page_shell('contact', lang, ct['title'], I18N[lang]['meta']['contact'], body)

# ---------------- 構建 ----------------
RENDERERS = {'index': render_index, 'about': render_about, 'approach': render_approach,
             'portfolio': render_portfolio, 'insights': render_insights, 'contact': render_contact}

def build():
    if os.path.exists(DIST): shutil.rmtree(DIST)
    os.makedirs(DIST)
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(DIST, 'assets'))
    base = C.get('site_url', 'https://www.wljtgroup.com').rstrip('/')
    with open(os.path.join(DIST, 'CNAME'), 'w') as f:
        f.write('www.wljtgroup.com\n')
    with open(os.path.join(DIST, 'robots.txt'), 'w') as f:
        f.write(f'User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n')

    not_found_body = f'''
<section class="page-hero">
  <div class="container">
    <div class="reveal">
      <div class="gold-rule"></div>
      <h1>404</h1>
      <p class="sub">{esc({'zh-TW': '頁面不存在或已被移動', 'zh-CN': '页面不存在或已被移动', 'en': 'The page you are looking for does not exist or has been moved.', 'pt': 'A página que procura não existe ou foi movida.'}[DEFAULT])}</p>
      <div class="cta-row" style="margin-top:2rem;">
        <a class="btn btn-gold" href="index.html">{esc({'zh-TW': '返回首頁', 'zh-CN': '返回首页', 'en': 'Back to Home', 'pt': 'Voltar ao Início'}[DEFAULT])}{icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>'''
    with open(os.path.join(DIST, '404.html'), 'w', encoding='utf-8') as f:
        f.write(page_shell('index', DEFAULT, '404', 'Page not found', not_found_body))

    count = 2
    urls = []
    articles = [a for a in C['insights'] if a.get('slug') and a.get('body')]
    for lang in LANGS:
        outdir = DIST if lang == DEFAULT else os.path.join(DIST, lang)
        os.makedirs(outdir, exist_ok=True)
        for page in PAGES:
            name = 'index.html' if page == 'index' else f'{page}.html'
            with open(os.path.join(outdir, name), 'w', encoding='utf-8') as f:
                f.write(RENDERERS[page](lang))
            urls.append((page, lang))
            count += 1
        for a in articles:
            adir = os.path.join(outdir, 'insights')
            os.makedirs(adir, exist_ok=True)
            with open(os.path.join(adir, f'{a["slug"]}.html'), 'w', encoding='utf-8') as f:
                f.write(render_insight_article(lang, a))
            urls.append((f'insights/{a["slug"]}', lang))
            count += 1

    xhtml = 'xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    items = []
    for page, lang in urls:
        loc = abs_url(page, lang)
        alts = ''.join(
            f'\n      <xhtml:link rel="alternate" hreflang="{l}" href="{abs_url(page, l)}"/>'
            for l in LANGS)
        items.append(f'''  <url>
      <loc>{loc}</loc>{alts}
      <xhtml:link rel="alternate" hreflang="x-default" href="{abs_url(page, DEFAULT)}"/>
  </url>''')
    with open(os.path.join(DIST, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n'
                f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" {xhtml}>\n'
                + '\n'.join(items) + '\n</urlset>\n')
    print(f'OK: generated {count} files -> {DIST}')

if __name__ == '__main__':
    build()
