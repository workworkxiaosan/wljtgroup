const FALLBACK_CONFIG = {
  "version": "1.1.1",
  "updated_at": "2026-03-14T12:00:00+08:00",
  "meta": { "currency_symbol": "¥", "locale": "zh-CN" },
  "base_pricing": {
    "device_setup_fee": 3000,
    "first_device_first_platform_monthly_fee": 2200,
    "additional_platform_monthly_fee": 500,
    "max_platforms_per_device": 3,
    "price_reference_items": [
      { "icon": "📱", "label": "每臺裝置（一次性）", "amount": 3000, "unit": "one_time" },
      { "icon": "🥇", "label": "首臺主裝置首平臺", "amount": 2200, "unit": "monthly" },
      { "icon": "➕", "label": "其餘所有平臺（每個）", "amount": 500, "unit": "monthly" }
    ],
    "device_tip": {
      "title": "手機裝置 = 獨立運營單元",
      "paragraph_template": "每臺<strong>真實海外 iPhone</strong> 對應一個<strong>「地區 + 語言」</strong>組合，是獨立的平臺演算法推薦入口。單臺裝置最多同時運營 <strong>{max_platforms}</strong> 個平臺，{platform_names} 均可<strong>自由選擇</strong>。新增地區需增加裝置，每臺裝置一次性費用 <strong>{device_setup_fee}</strong>。"
    }
  },
  "scheme_types": {
    "enterprise": { "name": "企業出海代運營", "description": "針對外貿工廠的品牌出海短影片代運營方案", "icon": "🏭" },
    "culture": { "name": "文化（個人IP）出海矩陣代運營", "description": "真機+雲機矩陣運營，打造個人IP出海流量體系", "icon": "🎭" }
  },
  "culture_matrix_pricing": {
    "true_device_fee": 3000, "true_device_options": [5,10,15,20,25,30], "true_device_default": 10, "true_device_min": 5, "true_device_max": 30,
    "cloud_device_fee": 1000, "cloud_device_options": [30,50,80,100,150,200], "cloud_device_default": 50, "cloud_device_min": 30, "cloud_device_max": 200,
    "matrix_operation_monthly": 6000, "digital_human_sampling_fee_per_character": 200, "content_price_per_item": 60,
    "content_frequencies": {
      "biweekly": { "name": "每週2條", "sub": "每週約 2 條", "count_per_month": 8, "badge": "輕量起步", "badge_class": "badge-purple", "icon": "🌱" },
      "low": { "name": "隔日更", "sub": "每週約 3-4 條", "count_per_month": 14, "badge": "入門推薦", "badge_class": "badge-green", "icon": "📅" },
      "mid": { "name": "工作日更", "sub": "每週約 5 條", "count_per_month": 20, "badge": "推薦", "badge_class": "badge-blue", "icon": "⭐" },
      "high": { "name": "日更", "sub": "每天 1 條", "count_per_month": 30, "badge": "激進增長", "badge_class": "badge-orange", "icon": "🚀" }
    },
    "content_frequency_order": ["biweekly","low","mid","high"], "content_frequency_default": "biweekly", "quote_period_months": [6,12],
    "max_markets": 2, "recommended_markets": ["na","sea"],
    "website": {
      "showcase": { "title": "🌐 展示型獨立站", "name": "展示型獨立站", "description": "品牌展示 · 個人IP展示 · 聯絡方式 · 基礎SEO", "setup_fee": 5800, "fee_type": "一次性 · 交付含一年託管" },
      "ecommerce": { "title": "🛒 電商型獨立站", "name": "電商型獨立站", "description": "商品銷售 · 海外支付（Stripe / PayPal）· 物流配置", "setup_fee": 12800, "fee_type": "一次性 · 交付含一年託管" }
    },
    "true_device_roles": ["私域運營","私信轉化","流量承接","獨立站引導"],
    "cloud_device_roles": ["影片曝光","引流至真機","引流至獨立站"],
    "ops_tags_true": ["📱 私信運營","💬 評論運營","🎯 私域轉化","🔗 獨立站引流"],
    "ops_tags_cloud": ["📤 影片矩陣釋出","📱 引流至真機","🔗 引流至獨立站"],
    "price_reference_items": [
      { "icon": "📱", "label": "真機裝置（一年費用/臺，歸客戶所有）", "amount": 3000, "unit": "one_time" },
      { "icon": "☁️", "label": "雲機裝置（一年費用/臺）", "amount": 1000, "unit": "one_time" },
      { "icon": "⚙️", "label": "矩陣運營費（月費）", "amount": 6000, "unit": "monthly" },
      { "icon": "🎬", "label": "內容製作（每裝置/條）", "amount": 60, "unit": "per_item" }
    ]
  },
  "content": {
    "templates": {
      "basic": {
        "tier_label": "BASIC · 基礎版", "tier_class": "t-basic", "name": "基礎版·工廠展示", "title": "工廠產品展示型",
        "description": "純工廠/產品拍攝素材剪輯，目標語言字幕或旁白，簡潔直接，適合原材料、零部件類工廠", "price_per_item": 100,
        "preview_style_label": "工廠展示型"
      },
      "standard": {
        "tier_label": "STANDARD · 標準版", "tier_class": "t-std", "name": "標準版·AI主播", "title": "AI 虛擬數字人主播型",
        "description": "全程定製 AI 虛擬主播出鏡講解，一次定製多語言快速複製，極具專業感，多地區高效投放", "price_per_item": 150,
        "preview_style_label": "AI主播型"
      },
      "premium": {
        "tier_label": "PREMIUM · 高階版", "tier_class": "t-prem", "name": "高階版·真人講解", "title": "真人/數字人講解型",
        "description": "真人出鏡或數字人+工廠畫面交叉剪輯，專業講解產品優勢與工藝，信任感強，適合成品工廠", "price_per_item": 200,
        "preview_style_label": "真人/數字人型"
      }
    },
    "template_order": ["basic", "standard", "premium"],
    "template_required_option": { "standard": "ai", "premium": "human" },
    "frequencies": {
      "biweekly": { "name": "每週兩次", "sub": "每週約 2 條", "count_per_month": 8, "badge": "輕量起步", "badge_class": "badge-purple", "icon": "🌱" },
      "low": { "name": "隔日更", "sub": "每週約 3-4 條", "count_per_month": 14, "badge": "入門推薦", "badge_class": "badge-green", "icon": "📅" },
      "mid": { "name": "工作日更", "sub": "每週約 5 條", "count_per_month": 20, "badge": "價效比首選", "badge_class": "badge-blue", "icon": "⭐" },
      "high": { "name": "日更", "sub": "每天 1 條", "count_per_month": 30, "badge": "激進增長", "badge_class": "badge-orange", "icon": "🚀" }
    },
    "frequency_order": ["biweekly", "low", "mid", "high"],
    "language_subtitle_extra_per_item": 50,
    "digital_human": {
      "title": "出鏡數字人方案",
      "subtitle": "按模板自動匹配 · 標準版 AI / 高階版 真人",
      "option_order": ["ai", "human"],
      "options": {
        "human": { "title": "🎭 真人數字人取樣", "description": "以真實員工或代言人面孔為原型，生成專屬數字分身，形象貼近真實，信任感更強，適合高階版", "badge": "推薦", "setup_fee": 1500, "unit_label": "一次性取樣費用" },
        "ai": { "title": "🤖 AI 虛擬數字人", "description": "定製 AI 虛擬形象，快速啟用，無需真人取樣，支援多語言版本快速切換，適合標準版多地區投放", "setup_fee_per_character": 500, "unit_suffix": "/ 個形象", "unit_label": "一次性形象定製費", "min_count": 1, "max_count": 10, "count_label": "定製形象數量" }
      },
      "tip_html": "💡 標準版固定匹配 AI 虛擬數字人；高階版固定匹配真人數字人取樣。AI 形象每個 {ai_fee_per_char}，可按角色數量配置。"
    },
    "tips": {
      "on_site_shooting_html": "我們會提供<strong style=\"color:var(--text2)\">上門拍攝素材</strong>服務，專業團隊到訪工廠，完整記錄生產環境、產品細節與工藝流程，建立專屬素材資產庫",
      "timing_html": "運營團隊會根據<strong style=\"color:var(--text2)\">所屬地區的作息規律</strong>智慧調整發布時間，在目標買家活躍時段推送內容"
    },
    "preview": {
      "title": "內容製作月度費用預覽", "price_label": "單條價格", "count_label": "月釋出量", "result_label": "內容月度費用",
      "language_note_template": "含 {lang_count} 種語言字幕費：{count}條 × {subtitle_extra} × {extra_lang_count}種 = +{lang_extra}/月"
    }
  },
  "lead_capture": {
    "required_service": {
      "title": "基礎運營（必選 · 所有方案標配）",
      "description": "賬號日常維護與平臺互動管理，確保賬號健康度與演算法權重持續提升，是所有代運營方案的基礎服務，已包含在手機裝置月費內。",
      "tags": ["📱 賬號養號", "📤 內容釋出", "💬 評論回覆", "🎯 私域引流", "🔧 賬號維護"],
      "badge": "✓ 必選", "note": "已含在裝置月費"
    },
    "methods": {
      "expo": { "title": "📊 自然曝光（基礎）", "name": "自然曝光", "description": "依賴平臺演算法自然流量分發，Bio 配置聯絡方式，適合剛起步賬號", "monthly_fee": 0, "setup_fee": 0, "free_label": "免費", "free_desc": "無額外月費" },
      "full": { "title": "🔗 私域引流系統", "name": "私域引流系統", "description": "獨立站 + WhatsApp + 詢盤表單三端協同，最大化每位訪客價值", "monthly_fee": 500, "setup_fee": 2000 }
    },
    "method_order": ["expo", "full"]
  },
  "value_addons": {
    "free_included": {
      "title": "深度月度資料包告",
      "description": "每月提供完整資料包告：各平臺播放量、互動率、粉絲增長、引流轉化、賬號權重分析，資料透明可查",
      "badge": "✓ 必選 · 免費"
    },
    "items": {
      "website": { "title": "🌐 多語言獨立站建設", "name": "多語言獨立站建設", "description": "專為海外買家設計，支援英/阿/西語，含詢盤表單，與影片引流無縫銜接，首年含託管", "setup_fee": 3800, "fee_type": "一次性 · 交付含一年託管", "group": "main" },
      "email": { "title": "📧 企業專業郵箱搭建", "name": "企業專業郵箱搭建", "description": "繫結自有域名專業郵箱，大幅提升海外買家信任度，含反垃圾配置", "setup_fee": 1200, "fee_type": "一次性 · 含首年費用", "group": "main" },
      "phonekit": { "title": "📲 外貿真機監控套裝", "name": "外貿真機監控套裝", "description": "配置專屬海外對接手機，含 WhatsApp Business 配置 + 內容監看許可權，含一年海外流量，強烈推薦", "setup_fee": 3000, "fee_type": "一次性 · 含一年海外流量", "group": "main" },
      "pdf": { "title": "📄 PDF 營銷資料包", "name": "PDF營銷資料包", "description": "根據品牌資料準備度，選擇對應 PDF 營銷包製作檔位。", "note_html": "包含：<strong style=\"color:var(--text2)\">企業英文資料包</strong>（公司簡介 + 工廠實力 + 榮譽認證）· <strong style=\"color:var(--text2)\">產品英文資料包</strong>（產品目錄 + 規格引數 + 應用場景）· <strong style=\"color:var(--text2)\">英文溝通話術包</strong>（常見詢盤迴復模板 + 商務郵件範本）。以上均含中英雙語版本，並根據目標市場提供阿拉伯語或西班牙語附加版。", "default_option": "complete", "options": [ { "key": "complete", "title": "品牌海外資料齊全", "setup_fee": 0, "fee_type": "無需製作 · 免費" }, { "key": "zh_only", "title": "僅有中文品牌資料", "setup_fee": 2000, "fee_type": "一次性 · 基礎中英整理製作" }, { "key": "need_bilingual", "title": "需製作中英文品牌資料", "setup_fee": 3200, "fee_type": "一次性 · 完整中英文製作" } ], "group": "highlight" }
    },
    "tip_html": "💡 配置完成後點選右側「<strong>複製方案摘要</strong>」，可一鍵生成文字版方案，透過微信/WhatsApp 發給顧問獲取正式報價單。"
  },
  "markets": {
    "groups": [
      { "id": "na", "name": "北美市場", "flag": "🌎", "tip": "高詢盤", "langs": [ { "id": "na-en", "flag": "🇺🇸", "lang": "英語", "note": "主流" }, { "id": "na-es", "flag": "🇲🇽", "lang": "西班牙語", "note": "" } ] },
      { "id": "eu", "name": "歐洲市場", "flag": "🇪🇺", "tip": "高客單價", "langs": [ { "id": "eu-en", "flag": "🇬🇧", "lang": "英語", "note": "" }, { "id": "eu-de", "flag": "🇩🇪", "lang": "德語", "note": "" }, { "id": "eu-fr", "flag": "🇫🇷", "lang": "法語", "note": "" }, { "id": "eu-es", "flag": "🇪🇸", "lang": "西班牙語", "note": "" }, { "id": "eu-it", "flag": "🇮🇹", "lang": "義大利語", "note": "" } ] },
      { "id": "latam", "name": "拉美市場", "flag": "🌎", "tip": "增長快", "langs": [ { "id": "latam-pt", "flag": "🇧🇷", "lang": "葡語", "note": "增長快" }, { "id": "latam-es", "flag": "🇲🇽", "lang": "西班牙語", "note": "" } ] },
      { "id": "me", "name": "泛中東市場", "flag": "🕌", "tip": "高詢盤", "langs": [ { "id": "me-ar", "flag": "🇸🇦", "lang": "阿拉伯語", "note": "高詢盤" }, { "id": "me-en", "flag": "🇦🇪", "lang": "英語", "note": "" } ] },
      { "id": "gcc", "name": "海灣GCC", "flag": "🛢️", "tip": "高淨值", "langs": [ { "id": "gcc-ar", "flag": "🇸🇦", "lang": "阿拉伯語", "note": "高淨值" }, { "id": "gcc-en", "flag": "🇦🇪", "lang": "英語", "note": "" } ] },
      { "id": "sea", "name": "東南亞", "flag": "🌴", "tip": "", "langs": [ { "id": "sea-en", "flag": "🇸🇬", "lang": "英語", "note": "" }, { "id": "sea-id", "flag": "🇮🇩", "lang": "印尼語", "note": "" }, { "id": "sea-th", "flag": "🇹🇭", "lang": "泰語", "note": "" }, { "id": "sea-my", "flag": "🇲🇾", "lang": "馬來語", "note": "" }, { "id": "sea-vi", "flag": "🇻🇳", "lang": "越南語", "note": "" } ] },
      { "id": "jpkr", "name": "日韓市場", "flag": "🎌", "tip": "", "langs": [ { "id": "jp", "flag": "🇯🇵", "lang": "日語", "note": "" }, { "id": "kr", "flag": "🇰🇷", "lang": "韓語", "note": "" } ] },
      { "id": "ru", "name": "俄語區", "flag": "🇷🇺", "tip": "", "langs": [ { "id": "ru", "flag": "🇷🇺", "lang": "俄語", "note": "" } ] },
      { "id": "af", "name": "非洲市場", "flag": "🌍", "tip": "", "langs": [ { "id": "af-en", "flag": "🇳🇬", "lang": "英語", "note": "" }, { "id": "af-fr", "flag": "🇨🇮", "lang": "法語", "note": "" } ] }
    ],
    "platforms": [
      { "key": "tiktok", "icon": "./assets/icons/tiktok.svg", "name": "TikTok", "short_name": "TikTok" },
      { "key": "instagram", "icon": "./assets/icons/instagram.svg", "name": "Instagram", "short_name": "Ins" },
      { "key": "youtube", "icon": "./assets/icons/youtube.svg", "name": "YouTube", "short_name": "YT" }
    ]
  },
  "defaults": {
    "template": "basic", "frequency": "mid", "capture": "expo", "scheme": "enterprise", "digital_human_selected": [],
    "ai_char_count": 1, "addons_selected": [], "addon_option_selected": { "pdf": "complete" }, "content_configured": false
  },
  "summary": {
    "period_months": [6, 12],
    "scale": { "exposure_per_post_min": 800, "exposure_per_post_max": 10000, "exposure_per_video_min": 800, "exposure_per_video_max": 10000, "dm_rate_min": 0.001, "dm_rate_max": 0.003 },
    "validity_days": 30, "price_includes_tax": true,
    "copy_title": "海外短影片代運營方案摘要", "copy_disclaimer": "報價僅供參考，以正式合同為準"
  },
  "ui_texts": {
    "copy_button_default": "📋 複製方案摘要文字",
    "copy_button_success": "✅ 已複製！",
    "request_quote_alert_no_device": "請先在步驟 1 新增至少一個目標市場",
    "request_quote_alert_success": "方案摘要已複製到剪貼簿！\\n請透過微信 / WhatsApp 聯絡顧問，貼上方案內容獲取正式報價單。",
    "devices_empty_html": "<span>📱</span>點選上方地區，選擇語言新增第一臺裝置",
    "device_platform_select_label": "選擇運營平臺（至少選 1 個）",
    "device_platform_required_warning": "⚠️ 請至少選擇一個平臺",
    "main_device_badge": "主裝置",
    "lang_added": "✓ 已新增",
    "lang_add": "+ 新增",
    "lang_panel_suffix": "— 選擇語言版本"
  }
};

let cfg = null;
let MARKET_GROUPS = [];
let MARKETS = [];
let PLATS = [];

const state = {
  step: 0,
  devices: [],
  tmpl: 'basic',
  freq: 'mid',
  capture: 'expo',
  dh: new Set(),
  aiCharCount: 1,
  addons: new Set(),
  addonOptions: {},
  selectedPeriodIdx: 0,
  contentConfigured: false
};
let activeGroupId = null;

// ═══ Culture IP State ═══
const cultureState = {
  trueDeviceCount: 10,
  cloudDeviceCount: 50,
  selectedMarkets: [],  // array of group IDs (max 2)
  freq: 'mid',
  websiteType: null,  // null | 'showcase' | 'ecommerce'
  contentConfigured: true  // always true for culture
};
let cultureActiveGroupId = null;

function isCulture() { return state.scheme === 'culture'; }

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function mergeConfig(base, override) {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (typeof base !== 'object' || base === null) return override === undefined ? base : override;
  const out = { ...base };
  const source = (typeof override === 'object' && override !== null) ? override : {};
  Object.keys(source).forEach((key) => {
    out[key] = key in base ? mergeConfig(base[key], source[key]) : source[key];
  });
  return out;
}

async function loadConfig() {
  const paths = ['/config.json', './config.json'];
  const errors = [];
  for (const path of paths) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const remote = await res.json();
      cfg = mergeConfig(deepClone(FALLBACK_CONFIG), remote);
      console.info(`[pricing-calculator] loaded config from ${path} v${cfg.version} (${cfg.updated_at})`);
      return;
    } catch (err) {
      errors.push({ path, err: String(err) });
    }
  }
  cfg = deepClone(FALLBACK_CONFIG);
  console.warn('[pricing-calculator] failed to load external config, using built-in fallback config', errors);
}

function currencySymbol() { return cfg.meta.currency_symbol || '¥'; }
function locale() { return cfg.meta.locale || 'zh-CN'; }
function fmt(n) { return `${currencySymbol()}${Math.round(n).toLocaleString(locale())}`; }
function formatWan(n) {
  if (!Number.isFinite(n)) return '—';
  return `${(n / 10000).toLocaleString(locale(), { maximumFractionDigits: 1 })}萬`;
}
function unitSuffix(unit) {
  if (unit === 'monthly') return '/月';
  if (unit === 'per_item') return ' / 條';
  return '';
}
function replaceTokens(template, values) {
  return template.replace(/\{([^}]+)\}/g, (_, key) => (values[key] ?? `{${key}}`));
}
function platformByKey(key) { return PLATS.find((p) => p.key === key); }

function buildDerivedData() {
  MARKET_GROUPS = cfg.markets.groups;
  MARKETS = MARKET_GROUPS.flatMap((g) => g.langs.map((l) => ({
    id: l.id, flag: l.flag, region: g.name, lang: l.lang, note: l.note, groupId: g.id
  })));
  PLATS = cfg.markets.platforms;
}

function applyDefaults() {
  const defaults = cfg.defaults;
  state.scheme = defaults.scheme || 'enterprise';
  const tmplOrder = cfg.content.template_order;
  const freqOrder = cfg.content.frequency_order;
  const capOrder = cfg.lead_capture.method_order;
  state.tmpl = tmplOrder.includes(defaults.template) ? defaults.template : tmplOrder[0];
  state.freq = freqOrder.includes(defaults.frequency) ? defaults.frequency : freqOrder[0];
  state.capture = capOrder.includes(defaults.capture) ? defaults.capture : capOrder[0];
  state.dh = new Set((defaults.digital_human_selected || []).filter((k) => cfg.content.digital_human.options[k]));
  state.addons = new Set((defaults.addons_selected || []).filter((k) => cfg.value_addons.items[k]));
  state.addonOptions = { ...(defaults.addon_option_selected || {}) };
  const aiCfg = cfg.content.digital_human.options.ai;
  const minCount = aiCfg.min_count || 1;
  const maxCount = aiCfg.max_count || 10;
  state.aiCharCount = Math.min(maxCount, Math.max(minCount, defaults.ai_char_count || minCount));
  state.contentConfigured = Boolean(defaults.content_configured);
  state.selectedPeriodIdx = 0;
  enforceTemplateDHRequirement();

  // Culture defaults
  const cmp = cfg.culture_matrix_pricing;
  if (cmp) {
    cultureState.trueDeviceCount = cmp.true_device_default || 10;
    cultureState.cloudDeviceCount = cmp.cloud_device_default || 50;
    cultureState.freq = cmp.content_frequency_default || 'mid';
    cultureState.websiteType = null;
    cultureState.selectedMarkets = [];
  }
}

// ═══ Scheme Switching ═══
function renderSchemeSelector() {
  const types = cfg.scheme_types || {
    enterprise: { name: '企業出海代運營', description: '針對外貿工廠的品牌出海短影片代運營方案', icon: '🏭' },
    culture: { name: '文化（個人IP）出海矩陣代運營', description: '真機+雲機矩陣運營，打造個人IP出海流量體系', icon: '🎭' }
  };
  const el = document.getElementById('scheme-selector');
  el.innerHTML = Object.entries(types).map(([key, s]) => {
    const active = state.scheme === key;
    const badge = key === 'culture' ? '<span class="sc-badge">NEW</span>' : '';
    return `<div class="scheme-card${active ? ' scheme-active' : ''}" onclick="switchScheme('${key}')">
      <div class="sc-radio"></div>
      <div class="sc-header"><span class="sc-icon">${s.icon}</span><span class="sc-name">${s.name}</span>${badge}</div>
      <div class="sc-desc">${s.description}</div>
    </div>`;
  }).join('');
}

function switchScheme(scheme) {
  if (state.scheme === scheme) return;
  state.scheme = scheme;
  state.selectedPeriodIdx = 0;
  renderSchemeSelector();
  applySchemeUI();
  goStep(0);
  renderSummary();
}

function applySchemeUI() {
  const isC = isCulture();
  // Toggle step content visibility
  const show = (id, v) => { const el = document.getElementById(id); if (el) el.style.display = v ? '' : 'none'; };
  show('enterprise-step1', !isC);
  show('culture-step1', isC);
  show('enterprise-step2', !isC);
  show('culture-step2', isC);
  show('enterprise-step3', !isC);
  show('culture-step3', isC);
  show('enterprise-step4', !isC);
  show('culture-step4', isC);

  // Update header text
  const phTitle = document.getElementById('ph-title');
  const phSub = document.getElementById('ph-sub');
  const cbhTitle = document.getElementById('cbh-title');
  const cbhSub = document.getElementById('cbh-sub');
  const tipSection = document.getElementById('device-tip-section');

  if (isC) {
    phTitle.innerHTML = '4 步配置 · 實時生成<em>矩陣方案報價</em>';
    phSub.textContent = '配置真機/雲機矩陣規模、內容方案、運營服務與獨立站，報價實時顯示在右側';
    cbhTitle.textContent = '🧮 文化IP矩陣方案配置器';
    cbhSub.textContent = '真機+雲機矩陣運營 · 右側實時顯示費用明細';
    tipSection.style.display = 'none';
    document.getElementById('tab0-label').textContent = '矩陣配置';
    document.getElementById('tab1-label').textContent = '內容創作';
    document.getElementById('tab2-label').textContent = '運營服務';
    document.getElementById('tab3-label').textContent = '獨立站';
    document.getElementById('sum-section1-label').textContent = '矩陣規模 · 市場';
    document.getElementById('sum-section2-label').textContent = '內容 · 頻次';
    renderCultureStep1();
    renderCultureStep2();
    renderCultureStep3();
    renderCultureStep4();
    renderPeriodOptions();
  } else {
    phTitle.innerHTML = '4 步配置 · 實時生成<em>專屬報價</em>';
    phSub.textContent = '選擇目標市場與平臺、內容創作方案、運營服務與增值服務，報價實時顯示在右側';
    cbhTitle.textContent = '🧮 海外代運營方案配置器';
    cbhSub.textContent = '逐步配置，右側實時顯示費用明細';
    tipSection.style.display = '';
    document.getElementById('tab0-label').textContent = '目標市場';
    document.getElementById('tab1-label').textContent = '內容創作';
    document.getElementById('tab2-label').textContent = '運營服務';
    document.getElementById('tab3-label').textContent = '增值服務';
    document.getElementById('sum-section1-label').textContent = '市場 · 平臺';
    document.getElementById('sum-section2-label').textContent = '內容 · 出鏡 · 頻次';
    applyConfigToUI();
    renderPeriodOptions();
  }
}

// ═══ Culture IP: Step 1 Rendering ═══
function renderCultureStep1() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp) return;

  // True device options
  const tdEl = document.getElementById('true-device-options');
  tdEl.innerHTML = cmp.true_device_options.map((n) => {
    const sel = cultureState.trueDeviceCount === n ? ' ds-sel' : '';
    return `<div class="ds-opt${sel}" onclick="selectTrueDevice(${n})">${n}臺</div>`;
  }).join('');

  // True device roles
  document.getElementById('true-device-roles').innerHTML = (cmp.true_device_roles || []).map(
    (r) => `<span class="ds-role-tag real">${r}</span>`
  ).join('');

  // Cloud device options
  const cdEl = document.getElementById('cloud-device-options');
  cdEl.innerHTML = cmp.cloud_device_options.map((n) => {
    const sel = cultureState.cloudDeviceCount === n ? ' ds-sel ds-sel-cloud' : '';
    return `<div class="ds-opt${sel}" onclick="selectCloudDevice(${n})">${n}臺</div>`;
  }).join('');

  // Cloud device roles
  document.getElementById('cloud-device-roles').innerHTML = (cmp.cloud_device_roles || []).map(
    (r) => `<span class="ds-role-tag cloud">${r}</span>`
  ).join('');

  // Price reference
  document.getElementById('culture-price-ref').innerHTML = (cmp.price_reference_items || []).map((item) => (
    `<div class="pr-item"><span>${item.icon} ${item.label}</span><span class="pr-val">${fmt(item.amount)}${unitSuffix(item.unit)}</span></div>`
  )).join('');

  renderCultureMarkets();
}

function selectTrueDevice(n) {
  cultureState.trueDeviceCount = n;
  renderCultureStep1();
  renderSummary();
}

function selectCloudDevice(n) {
  cultureState.cloudDeviceCount = n;
  renderCultureStep1();
  renderSummary();
}

function renderCultureMarkets() {
  const cmp = cfg.culture_matrix_pricing;
  const maxM = cmp.max_markets || 2;
  const recommended = cmp.recommended_markets || [];
  const el = document.getElementById('culture-region-groups');
  el.innerHTML = MARKET_GROUPS.map((g) => {
    const isSelected = cultureState.selectedMarkets.includes(g.id);
    const isRec = recommended.includes(g.id);
    const isActive = cultureActiveGroupId === g.id;
    return `<div class="rg-btn${isActive ? ' rg-active' : ''}${isSelected ? ' rg-has' : ''}" onclick="cultureSelectGroup('${g.id}')">
      ${isSelected ? '<div class="rg-count-badge">✓</div>' : ''}
      <div class="rg-flag">${g.flag}</div>
      <div class="rg-name">${g.name}</div>
      ${isRec ? '<div class="rg-tip">推薦</div>' : (g.tip ? `<div class="rg-tip">${g.tip}</div>` : '')}
    </div>`;
  }).join('');

  // Show/hide market limit warning
  const warnEl = document.getElementById('culture-market-warn');
  warnEl.style.display = cultureState.selectedMarkets.length >= maxM ? '' : 'none';
}

function cultureSelectGroup(groupId) {
  const cmp = cfg.culture_matrix_pricing;
  const maxM = cmp.max_markets || 2;
  const idx = cultureState.selectedMarkets.indexOf(groupId);
  if (idx > -1) {
    // Deselect
    cultureState.selectedMarkets.splice(idx, 1);
    if (cultureActiveGroupId === groupId) cultureActiveGroupId = null;
  } else {
    if (cultureState.selectedMarkets.length >= maxM) return; // at limit
    cultureState.selectedMarkets.push(groupId);
  }
  cultureActiveGroupId = groupId;
  renderCultureMarkets();
  renderCultureLangPanel(groupId);
  renderSummary();
}

function renderCultureLangPanel(groupId) {
  const group = MARKET_GROUPS.find((g) => g.id === groupId);
  if (!group || !cultureState.selectedMarkets.includes(groupId)) {
    document.getElementById('culture-lang-sub-panel').style.display = 'none';
    return;
  }
  const wrap = document.getElementById('culture-lang-sub-panel');
  wrap.style.display = 'block';
  document.getElementById('culture-lsp-icon').textContent = group.flag;
  document.getElementById('culture-lsp-title').textContent = `${group.name} — 語言自動匹配`;
  const optsEl = document.getElementById('culture-lang-opts');
  optsEl.innerHTML = group.langs.map((l) => {
    return `<div class="lang-opt lo-added">
      <span class="lo-flag">${l.flag}</span>
      <span class="lo-lang">${l.lang}</span>
      ${l.note ? `<span class="lo-note">${l.note}</span>` : ''}
      <span class="lo-status" style="color:var(--green);font-weight:600;">✓ 自動匹配</span>
    </div>`;
  }).join('');
}

// ═══ Culture IP: Step 2 Rendering ═══
function renderCultureStep2() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp) return;

  document.getElementById('culture-sampling-fee').textContent = `真人數字人取樣費：形象數量 × ${fmt(cmp.digital_human_sampling_fee_per_character || 0)}（一次性）`;

  const freqs = cmp.content_frequencies || {};
  const order = cmp.content_frequency_order || ['biweekly', 'low', 'mid', 'high'];
  const el = document.getElementById('culture-freq-grid');
  el.innerHTML = order.map((key) => {
    const f = freqs[key];
    if (!f) return '';
    const selected = cultureState.freq === key ? ' sel' : '';
    return `<div class="freq-card${selected}" onclick="selectCultureFreq('${key}')">
      <div class="fc-icon">${f.icon}</div>
      <div class="fc-name">${f.name}</div>
      <div class="fc-sub">${f.sub}</div>
      <div class="fc-count">${f.count_per_month}</div>
      <div class="fc-unit">條 / 月</div>
      <div class="fc-badge ${f.badge_class}">${f.badge}</div>
    </div>`;
  }).join('');

  updateCultureContentPreview();
}

function selectCultureFreq(key) {
  cultureState.freq = key;
  renderCultureStep2();
  renderSummary();
}

function updateCultureContentPreview() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp) return;
  const freqs = cmp.content_frequencies || {};
  const f = freqs[cultureState.freq];
  if (!f) return;
  const price = cmp.content_price_per_item;
  const deviceCount = cultureState.trueDeviceCount + cultureState.cloudDeviceCount;
  const count = f.count_per_month;
  document.getElementById('culture-ccp-price').textContent = fmt(price);
  document.getElementById('culture-ccp-device-count').textContent = String(deviceCount);
  document.getElementById('culture-ccp-count').textContent = String(count);
  document.getElementById('culture-ccp-result').textContent = fmt(price * deviceCount * count);
}

// ═══ Culture IP: Step 3 Rendering ═══
function renderCultureStep3() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp) return;
  document.getElementById('culture-ops-true-tags').innerHTML = (cmp.ops_tags_true || []).map(
    (t) => `<span class="or-tag">${t}</span>`
  ).join('');
  document.getElementById('culture-ops-cloud-tags').innerHTML = (cmp.ops_tags_cloud || []).map(
    (t) => `<span class="or-tag">${t}</span>`
  ).join('');
  document.getElementById('culture-matrix-fee-display').textContent = `${fmt(cmp.matrix_operation_monthly)}/月`;
}

// ═══ Culture IP: Step 4 Rendering ═══
function renderCultureStep4() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp || !cmp.website) return;
  const el = document.getElementById('culture-website-grid');
  el.innerHTML = Object.entries(cmp.website).map(([key, w]) => {
    const sel = cultureState.websiteType === key ? ' sel' : '';
    return `<div class="cw-card${sel}" onclick="selectCultureWebsite('${key}')">
      <div class="cw-check">✓</div>
      <h4>${w.title}</h4>
      <p>${w.description}</p>
      <div class="cw-price">${fmt(w.setup_fee)}</div>
      <div class="cw-type">${w.fee_type}</div>
    </div>`;
  }).join('');
}

function selectCultureWebsite(key) {
  cultureState.websiteType = cultureState.websiteType === key ? null : key;
  renderCultureStep4();
  renderSummary();
}

// ═══ Culture IP: Calculation ═══
function calcCulture() {
  const cmp = cfg.culture_matrix_pricing;
  if (!cmp) return { totalMonthly: 0, totalSetup: 0, firstMonth: 0, periodTotals: [0, 0] };

  const totalDevices = cultureState.trueDeviceCount + cultureState.cloudDeviceCount;
  const trueSetup = cultureState.trueDeviceCount * cmp.true_device_fee;
  const cloudSetup = cultureState.cloudDeviceCount * (cmp.cloud_device_fee || 0);
  const matrixOps = cmp.matrix_operation_monthly;
  const samplingFee = totalDevices * (cmp.digital_human_sampling_fee_per_character || 0);

  const freqs = cmp.content_frequencies || {};
  const f = freqs[cultureState.freq];
  const contentAnnual = f ? totalDevices * cmp.content_price_per_item * f.count_per_month : 0;

  let websiteSetup = 0;
  if (cultureState.websiteType && cmp.website[cultureState.websiteType]) {
    websiteSetup = cmp.website[cultureState.websiteType].setup_fee;
  }

  const totalMonthly = matrixOps;
  const totalSetup = trueSetup + cloudSetup + samplingFee + websiteSetup + contentAnnual;
  const periods = getActivePeriodMonths();
  const periodTotals = periods.map((m) => totalMonthly * m + totalSetup);

  return {
    totalDevices,
    trueSetup,
    cloudSetup,
    matrixOps,
    samplingFee,
    contentAnnual,
    websiteSetup,
    totalMonthly,
    totalSetup,
    firstMonth: totalMonthly + totalSetup,
    periodTotals
  };
}


// ═══ Enterprise Mode: Original Logic (unchanged) ═══
function applyConfigToUI() {
  const platformNames = PLATS.map((p) => p.name).join(' / ');
  document.getElementById('device-tip-title').textContent = cfg.base_pricing.device_tip.title;
  document.getElementById('device-tip-body').innerHTML = replaceTokens(cfg.base_pricing.device_tip.paragraph_template, {
    max_platforms: String(cfg.base_pricing.max_platforms_per_device),
    platform_names: platformNames,
    device_setup_fee: fmt(cfg.base_pricing.device_setup_fee)
  });
  const priceRef = document.getElementById('price-ref');
  priceRef.innerHTML = cfg.base_pricing.price_reference_items.map((item) => (
    `<div class="pr-item"><span>${item.icon} ${item.label}</span><span class="pr-val">${fmt(item.amount)}${unitSuffix(item.unit)}</span></div>`
  )).join('');
  document.getElementById('content-preview-title').textContent = cfg.content.preview.title;
  document.getElementById('ccp-price-label').textContent = cfg.content.preview.price_label;
  document.getElementById('ccp-count-label').textContent = cfg.content.preview.count_label;
  document.getElementById('ccp-result-label').textContent = cfg.content.preview.result_label;
  document.getElementById('content-tip-shooting').innerHTML = cfg.content.tips.on_site_shooting_html;
  document.getElementById('content-tip-timing').innerHTML = cfg.content.tips.timing_html;

  const req = cfg.lead_capture.required_service;
  document.getElementById('ops-required-title').textContent = req.title;
  document.getElementById('ops-required-desc').textContent = req.description;
  document.getElementById('ops-required-badge').textContent = req.badge;
  document.getElementById('ops-required-note').textContent = req.note;
  document.getElementById('ops-required-tags').innerHTML = req.tags.map((t) => `<span class="or-tag">${t}</span>`).join('');

  document.getElementById('addon-free-title').textContent = cfg.value_addons.free_included.title;
  document.getElementById('addon-free-desc').textContent = cfg.value_addons.free_included.description;
  document.getElementById('addon-free-badge').textContent = cfg.value_addons.free_included.badge;
  document.getElementById('addon-tip-box').innerHTML = cfg.value_addons.tip_html;

  const infoText = `✅ 價格含稅 · 有效期 ${cfg.summary.validity_days} 天 · 正式合同以書面報價單為準`;
  document.getElementById('summary-info-note').textContent = infoText;
  document.getElementById('footer-disclaimer').textContent = `本報價系統僅供參考，最終費用以正式合同為準 · 價格含稅 · 有效期 ${cfg.summary.validity_days} 天`;
  document.getElementById('copy-summary-btn').textContent = cfg.ui_texts.copy_button_default;
  const periods = getActivePeriodMonths();
  if (state.selectedPeriodIdx > periods.length - 1) state.selectedPeriodIdx = 0;
  renderPeriodOptions();
  renderTemplateCards();
  renderDHCards();
  renderFreqCards();
  renderCaptureCards();
  renderAddonCards();
}

function renderPeriodOptions() {
  const periods = getActivePeriodMonths();
  const el = document.getElementById('period-options');
  if (!el) return;
  if (state.selectedPeriodIdx > periods.length - 1) state.selectedPeriodIdx = 0;
  el.innerHTML = periods.map((m, idx) => (
    `<button class="sp-period-opt${idx === state.selectedPeriodIdx ? ' active' : ''}" onclick="selectPeriod(${idx})">${m} 個月</button>`
  )).join('');
}

function selectPeriod(idx) {
  const periods = getActivePeriodMonths();
  if (idx < 0 || idx > periods.length - 1) return;
  state.selectedPeriodIdx = idx;
  renderPeriodOptions();
  renderSummary();
}

function getActivePeriodMonths() {
  if (isCulture()) return cfg.culture_matrix_pricing?.quote_period_months || [6, 12];
  return cfg.summary.period_months || [6, 12];
}

function getTemplate(key) { return cfg.content.templates[key]; }
function getFrequency(key) { return cfg.content.frequencies[key]; }
function getCaptureMethod(key) { return cfg.lead_capture.methods[key]; }
function getAddon(key) { return cfg.value_addons.items[key]; }
function getTemplateRequiredDH(key) { return cfg.content.template_required_option?.[key] || null; }

function enforceTemplateDHRequirement() {
  const required = getTemplateRequiredDH(state.tmpl);
  if (!required) return;
  state.dh = new Set([required]);
}

function getAddonOption(item, optionKey) {
  if (!item?.options) return null;
  return item.options.find((opt) => opt.key === optionKey) || null;
}
function getAddonSelectedOptionKey(addonKey) {
  const item = getAddon(addonKey);
  if (!item?.options) return null;
  const candidate = state.addonOptions[addonKey] || item.default_option || item.options[0]?.key;
  return getAddonOption(item, candidate) ? candidate : item.options[0]?.key;
}
function getAddonSelectedOption(addonKey) {
  const item = getAddon(addonKey);
  return getAddonOption(item, getAddonSelectedOptionKey(addonKey));
}
function getAddonSetupFee(addonKey) {
  const item = getAddon(addonKey);
  const opt = getAddonSelectedOption(addonKey);
  return opt ? opt.setup_fee : (item.setup_fee || 0);
}
function getAddonFeeType(addonKey) {
  const item = getAddon(addonKey);
  const opt = getAddonSelectedOption(addonKey);
  return opt?.fee_type || item.fee_type || '';
}

function renderTemplateCards() {
  const el = document.getElementById('tmpl-grid');
  el.innerHTML = cfg.content.template_order.map((key) => {
    const t = getTemplate(key);
    const selected = state.tmpl === key ? ' sel' : '';
    return `<div class="tmpl-card${selected}" id="tmpl-${key}" onclick="selectTmpl('${key}')">
      <div class="tmpl-check">✓</div>
      <div class="tmpl-tier ${t.tier_class}">${t.tier_label}</div>
      <h4>${t.title}</h4>
      <p>${t.description}</p>
      <div class="tmpl-price">${fmt(t.price_per_item)}<span> / 條</span></div>
    </div>`;
  }).join('');
}

function renderDHCards() {
  const titleRow = document.getElementById('dh-title-row');
  const dh = cfg.content.digital_human;
  titleRow.innerHTML = `${dh.title} <span class="sst-sub">${dh.subtitle}</span>`;
  const required = getTemplateRequiredDH(state.tmpl);
  const optionOrder = dh.option_order || ['human', 'ai'];
  const html = optionOrder.map((key) => {
    const opt = dh.options[key];
    if (!opt) return '';
    const selected = state.dh.has(key);
    const lockTag = required === key ? '<span class="dh-lock-tag">當前模板必選</span>' : '';
    const badge = opt.badge ? `<span class="dh-badge">${opt.badge}</span>` : '';
    const isAi = key === 'ai';
    const aiBlock = isAi ? `
      <div class="ai-count-row" id="ai-count-row" style="display:${selected ? 'flex' : 'none'};">
        <span class="acr-label">${opt.count_label}</span>
        <div class="acr-ctrl">
          <button class="acr-btn" onclick="changeAiCount(-1,event)">−</button>
          <div class="acr-val" id="ai-count-val">${state.aiCharCount}</div>
          <button class="acr-btn" onclick="changeAiCount(1,event)">+</button>
        </div>
        <span class="acr-cost" id="ai-count-cost">${fmt(state.aiCharCount * opt.setup_fee_per_character)} 一次性</span>
      </div>` : '';
    const price = isAi
      ? `${fmt(opt.setup_fee_per_character)} <span style="font-size:11px;color:var(--muted)">${opt.unit_suffix}</span>`
      : fmt(opt.setup_fee);
    return `<div class="dh-card${selected ? ' sel' : ''}" id="dh-${key}" onclick="toggleDH('${key}')">
        <div class="dh-check">✓</div>
        <h4>${opt.title}${badge}${lockTag}</h4>
        <p>${opt.description}</p>
        <div class="dh-price">${price}</div>
        <div class="dh-unit">${opt.unit_label}</div>
        ${aiBlock}
      </div>`;
  }).join('');
  document.getElementById('dh-grid').innerHTML = html;
  const ai = dh.options.ai;
  document.getElementById('dh-tip-box').innerHTML = replaceTokens(dh.tip_html, {
    ai_fee_per_char: fmt(ai.setup_fee_per_character)
  });
}

function renderFreqCards() {
  const el = document.getElementById('freq-grid');
  el.innerHTML = cfg.content.frequency_order.map((key) => {
    const f = getFrequency(key);
    const selected = state.freq === key ? ' sel' : '';
    return `<div class="freq-card${selected}" id="freq-${key}" onclick="selectFreq('${key}')">
      <div class="fc-icon">${f.icon}</div>
      <div class="fc-name">${f.name}</div>
      <div class="fc-sub">${f.sub}</div>
      <div class="fc-count">${f.count_per_month}</div>
      <div class="fc-unit">條 / 月</div>
      <div class="fc-badge ${f.badge_class}">${f.badge}</div>
    </div>`;
  }).join('');
}

function renderCaptureCards() {
  const el = document.getElementById('capture-grid');
  el.innerHTML = cfg.lead_capture.method_order.map((key) => {
    const cap = getCaptureMethod(key);
    const selected = state.capture === key ? ' sel' : '';
    const freeClass = cap.monthly_fee === 0 && cap.setup_fee === 0 ? ' cap-free' : '';
    const fees = cap.monthly_fee === 0 && cap.setup_fee === 0
      ? `<div class="cap-fee"><span class="cf-val">${cap.free_label || '免費'}</span><span class="cf-label"> ${cap.free_desc || ''}</span></div>`
      : `<div class="cap-fee"><span class="cf-val">+${fmt(cap.monthly_fee)}</span><span class="cf-label"> / 月</span></div>
         <div class="cap-fee"><span class="cf-val">+${fmt(cap.setup_fee)}</span><span class="cf-label"> 一次性設定</span></div>`;
    return `<div class="cap-card${freeClass}${selected}" id="cap-${key}" onclick="selectCapture('${key}')">
      <div class="cap-check">✓</div>
      <h4>${cap.title}</h4>
      <p>${cap.description}</p>
      <div class="cap-fees">${fees}</div>
    </div>`;
  }).join('');
}

function renderAddonCards() {
  const mainEl = document.getElementById('addon-grid-main');
  const hiEl = document.getElementById('addon-grid-highlight');
  const entries = Object.entries(cfg.value_addons.items);
  const renderItem = ([key, item]) => {
    const selected = state.addons.has(key) ? ' sel' : '';
    const highlight = item.group === 'highlight' ? ' addon-highlight' : '';
    const note = item.note_html ? `<div class="addon-note">${item.note_html}</div>` : '';
    const hasOptions = Array.isArray(item.options) && item.options.length > 0;
    const selectedOptionKey = getAddonSelectedOptionKey(key);
    const selectedOption = getAddonSelectedOption(key);
    const optionList = hasOptions ? `
      <div class="addon-option-list">
        ${item.options.map((opt) => `
          <button class="addon-opt-btn${selectedOptionKey === opt.key ? ' sel' : ''}" onclick="selectAddonOption('${key}','${opt.key}',event)">
            <span>${opt.title}</span><span>${fmt(opt.setup_fee)}</span>
          </button>`).join('')}
      </div>` : '';
    const priceStyle = (item.note_html || hasOptions) ? ' style="margin-top:12px;"' : '';
    const feeType = hasOptions ? (selectedOption?.fee_type || item.fee_type || '') : item.fee_type;
    return `<div class="addon-card${highlight}${selected}" id="addon-${key}" onclick="toggleAddon('${key}')">
      <div class="addon-check">✓</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      ${note}${optionList}
      <div class="addon-price"${priceStyle}>${fmt(getAddonSetupFee(key))}</div>
      <div class="addon-type">${feeType}</div>
    </div>`;
  };
  mainEl.innerHTML = entries.filter(([, item]) => item.group === 'main').map(renderItem).join('');
  hiEl.innerHTML = entries.filter(([, item]) => item.group === 'highlight').map(renderItem).join('');
}

function goStep(n) {
  state.step = n;
  document.querySelectorAll('.step-panel').forEach((p, i) => p.classList.toggle('active', i === n));
  document.querySelectorAll('.step-tab').forEach((t, i) => {
    t.classList.remove('active', 'done');
    if (i === n) t.classList.add('active');
    else if (i < n) t.classList.add('done');
  });
}

function renderRegionGroups() {
  const el = document.getElementById('region-groups');
  el.innerHTML = MARKET_GROUPS.map((g) => {
    const cnt = state.devices.filter((d) => MARKETS.find((m) => m.id === d.marketId)?.groupId === g.id).length;
    const isActive = activeGroupId === g.id;
    const hasD = cnt > 0;
    return `<div class="rg-btn${isActive ? ' rg-active' : ''}${hasD ? ' rg-has' : ''}" onclick="selectGroup('${g.id}')">
      ${cnt > 0 ? `<div class="rg-count-badge">${cnt}</div>` : ''}
      <div class="rg-flag">${g.flag}</div>
      <div class="rg-name">${g.name}</div>
      ${g.tip ? `<div class="rg-tip">${g.tip}</div>` : ''}
    </div>`;
  }).join('');
}

function selectGroup(groupId) {
  activeGroupId = groupId;
  renderRegionGroups();
  renderLangSubPanel(groupId);
}

function renderLangSubPanel(groupId) {
  const group = MARKET_GROUPS.find((g) => g.id === groupId);
  if (!group) return;
  const wrap = document.getElementById('lang-sub-panel');
  wrap.style.display = 'block';
  document.getElementById('lsp-icon').textContent = group.flag;
  document.getElementById('lsp-title').textContent = `${group.name} ${cfg.ui_texts.lang_panel_suffix}`;
  const optsEl = document.getElementById('lang-opts');
  optsEl.innerHTML = group.langs.map((l) => {
    const added = state.devices.some((d) => d.marketId === l.id);
    return `<div class="lang-opt${added ? ' lo-added' : ''}" onclick="toggleMarket('${l.id}')">
      <span class="lo-flag">${l.flag}</span>
      <span class="lo-lang">${l.lang}</span>
      ${l.note ? `<span class="lo-note">${l.note}</span>` : ''}
      <span class="lo-status">${added ? cfg.ui_texts.lang_added : cfg.ui_texts.lang_add}</span>
    </div>`;
  }).join('');
}

function toggleMarket(marketId) {
  const idx = state.devices.findIndex((d) => d.marketId === marketId);
  if (idx > -1) state.devices.splice(idx, 1);
  else state.devices.push({ marketId, platforms: new Set() });
  if (activeGroupId) renderLangSubPanel(activeGroupId);
  renderRegionGroups();
  renderDeviceCards();
  updateContentPreview();
  renderSummary();
}

function getPlatformBase() { return cfg.base_pricing.first_device_first_platform_monthly_fee; }

function renderDeviceCards() {
  const area = document.getElementById('devices-area');
  const bar = document.getElementById('device-count-bar');
  document.getElementById('device-count-label').textContent = `${state.devices.length} 臺`;
  if (state.devices.length === 0) {
    area.innerHTML = `<div class="devices-empty">${cfg.ui_texts.devices_empty_html}</div>`;
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  document.getElementById('dcb-phones').innerHTML = state.devices.map(() => '<span class="dcb-phone-icon">📱</span>').join('');
  document.getElementById('dcb-count').textContent = String(state.devices.length);
  area.innerHTML = state.devices.map((dev, i) => {
    const m = MARKETS.find((mm) => mm.id === dev.marketId);
    const isFirst = i === 0;
    const selectedArr = [...dev.platforms];
    const primaryPlat = isFirst && selectedArr.length > 0 ? selectedArr[0] : null;
    const platHtml = PLATS.map((pl) => {
      const on = dev.platforms.has(pl.key);
      let costLabel = `+${fmt(cfg.base_pricing.additional_platform_monthly_fee)}/月`;
      if (on) {
        if (isFirst && pl.key === primaryPlat) costLabel = `${fmt(getPlatformBase())}/月`;
        else costLabel = `${fmt(cfg.base_pricing.additional_platform_monthly_fee)}/月`;
      }
      return `<div class="plat-slot ${on ? 'ps-on' : 'ps-off'}" onclick="toggleDevicePlatform(${i},'${pl.key}')">
        <img class="plat-svg" src="${pl.icon}" alt="${pl.name}"> ${pl.name}
        <span class="ps-cost">${costLabel}</span>
      </div>`;
    }).join('');
    const noPlatWarn = dev.platforms.size === 0 ? `<div class="plat-warn">${cfg.ui_texts.device_platform_required_warning}</div>` : '';
    return `<div class="device-card">
      <div class="dc-header">
        <div class="dc-num">${i + 1}</div>
        <div class="dc-market">${m.flag} ${m.region} · ${m.lang}</div>
        ${i === 0 ? `<span class="dc-badge">${cfg.ui_texts.main_device_badge}</span>` : ''}
        <button class="dc-remove" onclick="removeDevice(${i})">✕</button>
      </div>
      <div class="dc-plat-label">${cfg.ui_texts.device_platform_select_label}</div>
      <div class="dc-platforms">${platHtml}</div>
      ${noPlatWarn}
    </div>`;
  }).join('');
}

function toggleDevicePlatform(devIdx, platKey) {
  const dev = state.devices[devIdx];
  if (!dev) return;
  if (dev.platforms.has(platKey)) {
    if (dev.platforms.size <= 1) return;
    dev.platforms.delete(platKey);
  } else {
    if (dev.platforms.size >= cfg.base_pricing.max_platforms_per_device) return;
    dev.platforms.add(platKey);
  }
  renderDeviceCards();
  renderSummary();
}

function removeDevice(i) {
  state.devices.splice(i, 1);
  if (activeGroupId) renderLangSubPanel(activeGroupId);
  renderRegionGroups();
  renderDeviceCards();
  updateContentPreview();
  renderSummary();
}

function selectTmpl(key) {
  state.tmpl = key;
  state.contentConfigured = true;
  enforceTemplateDHRequirement();
  renderTemplateCards();
  renderDHCards();
  updateContentPreview();
  renderSummary();
}

function selectFreq(key) {
  state.freq = key;
  state.contentConfigured = true;
  renderFreqCards();
  updateContentPreview();
  renderSummary();
}

function toggleDH(key) {
  const required = getTemplateRequiredDH(state.tmpl);
  if (required) { state.dh = new Set([required]); renderDHCards(); renderSummary(); return; }
  if (state.dh.has(key)) state.dh.delete(key);
  else state.dh.add(key);
  renderDHCards();
  renderSummary();
}

function changeAiCount(delta, e) {
  e.stopPropagation();
  const aiCfg = cfg.content.digital_human.options.ai;
  state.aiCharCount = Math.max(aiCfg.min_count || 1, Math.min(aiCfg.max_count || 10, state.aiCharCount + delta));
  renderDHCards();
  renderSummary();
}

function getUniqueLanguageCount() {
  const langs = new Set();
  state.devices.forEach((dev) => {
    const m = MARKETS.find((mm) => mm.id === dev.marketId);
    if (m) langs.add(m.lang);
  });
  return langs.size;
}

function updateContentPreview() {
  const tmpl = getTemplate(state.tmpl);
  const freq = getFrequency(state.freq);
  const langCount = getUniqueLanguageCount();
  const baseContent = tmpl.price_per_item * freq.count_per_month;
  const subtitleExtra = cfg.content.language_subtitle_extra_per_item;
  const langExtra = langCount > 1 ? (freq.count_per_month * subtitleExtra * (langCount - 1)) : 0;
  const totalContent = baseContent + langExtra;
  document.getElementById('ccp-price').textContent = fmt(tmpl.price_per_item);
  document.getElementById('ccp-count').textContent = String(freq.count_per_month);
  document.getElementById('ccp-result').textContent = fmt(totalContent);
  const previewEl = document.querySelector('#enterprise-step2 .content-calc-preview');
  if (previewEl) {
    let langNote = previewEl.querySelector('.lang-note');
    if (langCount > 1) {
      if (!langNote) { langNote = document.createElement('div'); langNote.className = 'lang-note'; langNote.style.cssText = 'font-size:11px;color:var(--accent2);margin-top:8px;'; previewEl.appendChild(langNote); }
      langNote.textContent = replaceTokens(cfg.content.preview.language_note_template, {
        lang_count: String(langCount), count: String(freq.count_per_month),
        subtitle_extra: fmt(subtitleExtra), extra_lang_count: String(langCount - 1), lang_extra: fmt(langExtra)
      });
    } else if (langNote) { langNote.remove(); }
  }
  const shell = document.getElementById('phone-shell');
  if (shell) { shell.className = `phone-shell style-${state.tmpl}`; }
  const psl = document.getElementById('phone-style-label');
  if (psl) psl.textContent = tmpl.preview_style_label;
}

function selectCapture(key) { state.capture = key; renderCaptureCards(); renderSummary(); }

function toggleAddon(key) {
  if (state.addons.has(key)) state.addons.delete(key);
  else { state.addons.add(key); const item = getAddon(key); if (item?.options) state.addonOptions[key] = getAddonSelectedOptionKey(key); }
  renderAddonCards();
  renderSummary();
}

function selectAddonOption(addonKey, optionKey, e) {
  e.stopPropagation();
  const item = getAddon(addonKey);
  if (!item?.options || !getAddonOption(item, optionKey)) return;
  state.addonOptions[addonKey] = optionKey;
  state.addons.add(addonKey);
  renderAddonCards();
  renderSummary();
}

function getDeviceMonthly(platforms, isFirstDevice) {
  if (platforms.size === 0) return 0;
  const arr = [...platforms];
  if (isFirstDevice) return getPlatformBase() + (arr.length - 1) * cfg.base_pricing.additional_platform_monthly_fee;
  return arr.length * cfg.base_pricing.additional_platform_monthly_fee;
}

// ═══ Enterprise Calculation ═══
function calcEnterprise() {
  let devicesMonthly = 0, devicesSetup = 0;
  state.devices.forEach((dev, i) => {
    devicesMonthly += getDeviceMonthly(dev.platforms, i === 0);
    devicesSetup += cfg.base_pricing.device_setup_fee;
  });
  let contentMonthly = 0;
  if (state.contentConfigured) {
    const tmpl = getTemplate(state.tmpl);
    const freq = getFrequency(state.freq);
    const langCount = getUniqueLanguageCount();
    contentMonthly = tmpl.price_per_item * freq.count_per_month + (langCount > 1 ? freq.count_per_month * cfg.content.language_subtitle_extra_per_item * (langCount - 1) : 0);
  }
  const cap = getCaptureMethod(state.capture);
  const totalMonthly = devicesMonthly + contentMonthly + cap.monthly_fee;
  let dhSetup = 0;
  const dhCfg = cfg.content.digital_human.options;
  if (state.dh.has('human')) dhSetup += dhCfg.human.setup_fee;
  if (state.dh.has('ai')) dhSetup += dhCfg.ai.setup_fee_per_character * state.aiCharCount;
  let addonsSetup = 0;
  state.addons.forEach((k) => { addonsSetup += getAddonSetupFee(k); });
  const totalSetup = devicesSetup + cap.setup_fee + dhSetup + addonsSetup;
  const periods = cfg.summary.period_months || [6, 12];
  const periodTotals = periods.map((m) => totalMonthly * m + totalSetup);
  return { devicesMonthly, devicesSetup, contentMonthly, captureMonthly: cap.monthly_fee, captureSetup: cap.setup_fee, dhSetup, addonsSetup, totalMonthly, totalSetup, firstMonth: totalMonthly + totalSetup, periodTotals, sixMonth: periodTotals[0], twelveMonth: periodTotals[1], langCount: getUniqueLanguageCount() };
}

function calc() {
  return isCulture() ? calcCulture() : calcEnterprise();
}


// ═══ Unified Summary Rendering ═══
function renderSummary() {
  if (isCulture()) return renderCultureSummary();
  return renderEnterpriseSummary();
}

function renderEnterpriseSummary() {
  const r = calcEnterprise();
  document.getElementById('sum-devices').innerHTML = state.devices.length > 0
    ? state.devices.map((d) => {
      const m = MARKETS.find((mm) => mm.id === d.marketId);
      const pi = [...d.platforms].map((p) => { const plat = platformByKey(p); return `<img class="plat-svg" src="${plat.icon}" alt="${plat.name}">`; }).join('');
      return `<span class="sp-chip">${m.flag}${m.lang}${pi ? ` ${pi}` : ''}</span>`;
    }).join('') : '<span class="sp-empty">—</span>';

  let cchips = `<span class="sp-chip">${getTemplate(state.tmpl).name}</span><span class="sp-chip">${getFrequency(state.freq).name}</span>`;
  if (state.dh.has('human')) cchips += '<span class="sp-chip">🎭真人取樣</span>';
  if (state.dh.has('ai')) cchips += `<span class="sp-chip">🤖AI形象×${state.aiCharCount}</span>`;
  document.getElementById('sum-content-chips').innerHTML = cchips;

  const lines = [];
  state.devices.forEach((dev, i) => {
    const m = MARKETS.find((mm) => mm.id === dev.marketId);
    const mo = getDeviceMonthly(dev.platforms, i === 0);
    const pi = dev.platforms.size > 0 ? [...dev.platforms].map((p) => platformByKey(p).short_name).join('+') : '未選平臺';
    lines.push({ k: `${m.flag}${m.region}·${m.lang}（${pi}）`, v: `${fmt(mo)}/月`, type: 'monthly' });
  });
  if (r.contentMonthly > 0) {
    const freq = getFrequency(state.freq);
    const template = getTemplate(state.tmpl);
    if (r.langCount > 1) {
      const langExtra = freq.count_per_month * cfg.content.language_subtitle_extra_per_item * (r.langCount - 1);
      lines.push({ k: `內容製作（${fmt(template.price_per_item)}×${freq.count_per_month}條 + ${r.langCount}語言字幕+${fmt(langExtra)}）`, v: `${fmt(r.contentMonthly)}/月`, type: 'monthly' });
    } else {
      lines.push({ k: `內容製作（${fmt(template.price_per_item)}×${freq.count_per_month}條）`, v: `${fmt(r.contentMonthly)}/月`, type: 'monthly' });
    }
  }
  const cap = getCaptureMethod(state.capture);
  if (r.captureMonthly > 0) lines.push({ k: `${cap.name} 月費`, v: `${fmt(r.captureMonthly)}/月`, type: 'monthly' });
  if (r.devicesSetup > 0) lines.push({ k: `手機裝置×${state.devices.length}臺（一次性）`, v: fmt(r.devicesSetup), type: 'onetime' });
  if (r.captureSetup > 0) lines.push({ k: `${cap.name} 設定（一次性）`, v: fmt(r.captureSetup), type: 'onetime' });
  if (state.dh.has('human')) lines.push({ k: '真人數字人取樣（一次性）', v: fmt(cfg.content.digital_human.options.human.setup_fee), type: 'onetime' });
  if (state.dh.has('ai')) lines.push({ k: `AI數字人形象×${state.aiCharCount}個（一次性）`, v: fmt(cfg.content.digital_human.options.ai.setup_fee_per_character * state.aiCharCount), type: 'onetime' });
  state.addons.forEach((k) => {
    const addon = getAddon(k); const selectedOpt = getAddonSelectedOption(k);
    const label = selectedOpt ? `${addon.name}（${selectedOpt.title}）` : addon.name;
    lines.push({ k: `${label}（一次性）`, v: fmt(getAddonSetupFee(k)), type: 'onetime' });
  });
  renderSummaryCommon(r, lines);

  // Scale estimates
  const monthlyVideos = getFrequency(state.freq).count_per_month;
  const marketCount = state.devices.length;
  const allPlatforms = new Set();
  state.devices.forEach((dev) => dev.platforms.forEach((p) => allPlatforms.add(p)));
  const platformCount = allPlatforms.size;
  const scaleCfg = cfg.summary?.scale || {};
  const baseMinPerVideo = Number(scaleCfg.exposure_per_video_min ?? 800);
  const baseMaxPerVideo = Number(scaleCfg.exposure_per_video_max ?? 10000);
  const dmRateMin = Number(scaleCfg.dm_rate_min ?? 0.001);
  const dmRateMax = Number(scaleCfg.dm_rate_max ?? 0.003);
  const scaleGrid = document.getElementById('sp-scale-grid');
  if (marketCount > 0 && platformCount > 0) {
    scaleGrid.innerHTML = `
      <div class="sp-scale-item"><span class="sp-scale-key">每月總髮布量</span><span class="sp-scale-val">${monthlyVideos.toLocaleString(locale())} 條</span></div>
      <div class="sp-scale-item"><span class="sp-scale-key">覆蓋平臺數</span><span class="sp-scale-val">${platformCount} 個</span></div>
      <div class="sp-scale-item"><span class="sp-scale-key">覆蓋市場數</span><span class="sp-scale-val">${marketCount} 個</span></div>
      <div class="sp-scale-range"><span class="sp-scale-key">6個月累計曝光區間</span><span class="sp-scale-val sp-scale-emphasis">${formatWan(monthlyVideos*platformCount*marketCount*baseMinPerVideo*6)} – ${formatWan(monthlyVideos*platformCount*marketCount*baseMaxPerVideo*6)}</span></div>
      <div class="sp-scale-range"><span class="sp-scale-key">私信互動區間</span><span class="sp-scale-val sp-scale-emphasis">${formatWan(Math.round(monthlyVideos*platformCount*marketCount*baseMinPerVideo*6*dmRateMin))} – ${formatWan(Math.round(monthlyVideos*platformCount*marketCount*baseMaxPerVideo*6*dmRateMax))}</span></div>`;
  } else {
    scaleGrid.innerHTML = `
      <div class="sp-scale-item"><span class="sp-scale-key">每月總髮布量</span><span class="sp-scale-val">—</span></div>
      <div class="sp-scale-item"><span class="sp-scale-key">覆蓋平臺數</span><span class="sp-scale-val">—</span></div>
      <div class="sp-scale-item"><span class="sp-scale-key">覆蓋市場數</span><span class="sp-scale-val">—</span></div>
      <div class="sp-scale-range"><span class="sp-scale-key">6個月累計曝光區間</span><span class="sp-scale-val sp-scale-emphasis">—</span></div>
      <div class="sp-scale-range"><span class="sp-scale-key">私信互動區間</span><span class="sp-scale-val sp-scale-emphasis">—</span></div>`;
  }
}

function renderCultureSummary() {
  const r = calcCulture();
  const cmp = cfg.culture_matrix_pricing;
  const freqs = cmp.content_frequencies || {};
  const f = freqs[cultureState.freq];

  // Chips
  let devChips = `<span class="sp-chip">📱 真機 ${cultureState.trueDeviceCount}臺</span><span class="sp-chip">☁️ 雲機 ${cultureState.cloudDeviceCount}臺</span>`;
  cultureState.selectedMarkets.forEach((gid) => {
    const g = MARKET_GROUPS.find((gg) => gg.id === gid);
    if (g) devChips += `<span class="sp-chip">${g.flag} ${g.name}</span>`;
  });
  document.getElementById('sum-devices').innerHTML = devChips;

  let cchips = `<span class="sp-chip">🎭 真人AI數字人</span><span class="sp-chip">${f ? f.name : '—'}</span>`;
  if (cultureState.websiteType) {
    const w = cmp.website[cultureState.websiteType];
    if (w) cchips += `<span class="sp-chip">${w.name}</span>`;
  }
  document.getElementById('sum-content-chips').innerHTML = cchips;

  // Lines
  const lines = [];
  lines.push({ k: '矩陣運營費（真機+雲機運營）', v: `${fmt(r.matrixOps)}/月`, type: 'monthly' });
  if (r.contentAnnual > 0) {
    lines.push({ k: `內容製作（${r.totalDevices}臺 × ${fmt(cmp.content_price_per_item)} × ${f.count_per_month}條）`, v: fmt(r.contentAnnual), type: 'onetime' });
  }
  lines.push({ k: `真機 ${cultureState.trueDeviceCount}臺 × ${fmt(cmp.true_device_fee)}（一年費用，裝置歸客戶所有）`, v: fmt(r.trueSetup), type: 'onetime' });
  lines.push({ k: `雲機 ${cultureState.cloudDeviceCount}臺 × ${fmt(cmp.cloud_device_fee || 0)}（一年費用）`, v: fmt(r.cloudSetup), type: 'onetime' });
  lines.push({ k: `真人數字人取樣（${r.totalDevices}個形象 × ${fmt(cmp.digital_human_sampling_fee_per_character || 0)}）`, v: fmt(r.samplingFee), type: 'onetime' });
  if (r.websiteSetup > 0) {
    const w = cmp.website[cultureState.websiteType];
    lines.push({ k: `${w.name}（一次性）`, v: fmt(r.websiteSetup), type: 'onetime' });
  }

  renderSummaryCommon(r, lines);

  // Scale for culture: matrix-specific
  const monthlyPosts = f ? f.count_per_month : 0;
  const totalCloudPosts = monthlyPosts * cultureState.cloudDeviceCount;
  const scaleGrid = document.getElementById('sp-scale-grid');
  scaleGrid.innerHTML = `
    <div class="sp-scale-item"><span class="sp-scale-key">每月內容產出</span><span class="sp-scale-val">${monthlyPosts} 條/月</span></div>
    <div class="sp-scale-item"><span class="sp-scale-key">雲機矩陣總髮布</span><span class="sp-scale-val">${totalCloudPosts.toLocaleString(locale())} 條/月</span></div>
    <div class="sp-scale-item"><span class="sp-scale-key">真機賬號數</span><span class="sp-scale-val">${cultureState.trueDeviceCount} 個</span></div>
    <div class="sp-scale-item"><span class="sp-scale-key">目標市場</span><span class="sp-scale-val">${cultureState.selectedMarkets.length} 個</span></div>
    <div class="sp-scale-range"><span class="sp-scale-key">6個月矩陣曝光預估</span><span class="sp-scale-val sp-scale-emphasis">${formatWan(totalCloudPosts * 800 * 6)} – ${formatWan(totalCloudPosts * 5000 * 6)}</span></div>`;
}

function renderSummaryCommon(r, lines) {
  document.getElementById('sum-lines').innerHTML = lines.length > 0
    ? lines.map((l) => `<div class="sp-line"><span class="sp-key">${l.k}</span><span class="${l.type === 'onetime' ? 'sp-val-green' : 'sp-val'}">${l.v}</span></div>`).join('')
    : '<div class="sp-line"><span class="sp-key">（請先完成配置）</span><span class="sp-val">—</span></div>';

  const periods = getActivePeriodMonths();
  const sixIndex = periods.indexOf(6);
  const twelveIndex = periods.indexOf(12);
  const hasTotals = r.totalMonthly > 0 || r.totalSetup > 0;
  document.getElementById('sum-period-6').textContent = hasTotals && sixIndex > -1 ? fmt(r.periodTotals[sixIndex]) : `${currencySymbol()}0`;
  document.getElementById('sum-period-12').textContent = hasTotals && twelveIndex > -1 ? fmt(r.periodTotals[twelveIndex]) : `${currencySymbol()}0`;
}

function copySummary() {
  let text = '';
  if (isCulture()) {
    const r = calcCulture();
    const cmp = cfg.culture_matrix_pricing;
    const freqs = cmp.content_frequencies || {};
    const f = freqs[cultureState.freq];
    const marketNames = cultureState.selectedMarkets.map((gid) => {
      const g = MARKET_GROUPS.find((gg) => gg.id === gid);
      return g ? `${g.flag} ${g.name}` : gid;
    }).join('、') || '未選擇';
    const websiteName = cultureState.websiteType && cmp.website[cultureState.websiteType] ? cmp.website[cultureState.websiteType].name : '無';
    text = `【文化（個人IP）出海矩陣代運營方案摘要】
━━━━━━━━━━━━━━━━━━━━
矩陣配置：
  真機：${cultureState.trueDeviceCount} 臺
  雲機：${cultureState.cloudDeviceCount} 臺
  目標市場：${marketNames}

內容創作：
  模式：真人AI數字人 + AI爆款文案系統
  釋出頻次：${f ? f.name : '—'}（${f ? f.count_per_month : 0}條/月）
  內容製作費：${fmt(r.contentAnnual)}（按裝置總數核算）
  數字人取樣：${fmt(r.samplingFee)}（${r.totalDevices}個形象，一次性）

運營服務：
  矩陣運營費：${fmt(r.matrixOps)}/月（含真機+雲機全部運營）

裝置費用：
  真機裝置：${fmt(r.trueSetup)}（一年費用，裝置歸客戶所有）
  雲機裝置：${fmt(r.cloudSetup)}（一年費用）

增值服務：
  獨立站：${websiteName}${r.websiteSetup > 0 ? `（${fmt(r.websiteSetup)}）` : ''}
━━━━━━━━━━━━━━━━━━━━
6個月總費用：${fmt(r.periodTotals[0] || 0)}
12個月總費用：${fmt(r.periodTotals[1] || 0)}
━━━━━━━━━━━━━━━━━━━━
（${cfg.summary.copy_disclaimer}）`;
  } else {
    const r = calcEnterprise();
    const devDesc = state.devices.map((d, i) => {
      const m = MARKETS.find((mm) => mm.id === d.marketId);
      const pn = [...d.platforms].map((p) => platformByKey(p).name);
      return `  裝置${i + 1}：${m.flag} ${m.region}-${m.lang}（${pn.length > 0 ? pn.join('+') : '未選平臺'}）`;
    }).join('\n') || '  未配置';
    const dhDesc = [...state.dh].map((k) => (k === 'ai' ? `AI數字人×${state.aiCharCount}個` : '真人數字人取樣')).join('、') || '未選擇';
    const addDesc = [...state.addons].map((k) => {
      const addon = getAddon(k); const selectedOpt = getAddonSelectedOption(k);
      return selectedOpt ? `${addon.name}（${selectedOpt.title}）` : addon.name;
    }).join('、') || '無';
    const template = getTemplate(state.tmpl);
    const freq = getFrequency(state.freq);
    const cap = getCaptureMethod(state.capture);
    text = `【${cfg.summary.copy_title}】
━━━━━━━━━━━━━━━━━━━━
手機裝置配置（共 ${state.devices.length} 臺）：
${devDesc}

內容創作：
  影片風格：${template.name}（${fmt(template.price_per_item)}/條）
  釋出頻次：${freq.name}（${freq.count_per_month}條/月）
  內容月費：${fmt(r.contentMonthly)}/月
  出鏡方案：${dhDesc}

運營服務：
  基礎運營：養號 + 釋出 + 回覆 + 引流（必選標配）
  私域引流：${cap.name}

增值服務：${addDesc}
（深度月報：免費必選）
━━━━━━━━━━━━━━━━━━━━
6個月總費用：${fmt(r.periodTotals[0] || 0)}
12個月總費用：${fmt(r.periodTotals[1] || 0)}
━━━━━━━━━━━━━━━━━━━━
（${cfg.summary.copy_disclaimer}）`;
  }

  const btn = document.getElementById('copy-summary-btn');
  navigator.clipboard?.writeText(text).then(() => {
    btn.textContent = cfg.ui_texts.copy_button_success;
    setTimeout(() => { btn.textContent = cfg.ui_texts.copy_button_default; }, 2500);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    btn.textContent = cfg.ui_texts.copy_button_success;
    setTimeout(() => { btn.textContent = cfg.ui_texts.copy_button_default; }, 2500);
  });
}

function requestQuote() {
  if (!isCulture() && state.devices.length === 0) {
    alert(cfg.ui_texts.request_quote_alert_no_device);
    goStep(0);
    return;
  }
  copySummary();
  alert(cfg.ui_texts.request_quote_alert_success);
}

async function init() {
  await loadConfig();
  buildDerivedData();
  applyDefaults();

  // Render scheme selector first
  renderSchemeSelector();
  applySchemeUI();

  // Enterprise defaults
  applyConfigToUI();
  renderRegionGroups();
  renderDeviceCards();
  updateContentPreview();
  renderPeriodOptions();
  renderSummary();

  const obs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('vis');
  }), { threshold: 0.1 });
  document.querySelectorAll('.fi').forEach((el) => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', init);
