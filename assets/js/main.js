/* 萬里金騰集團官網交互腳本 */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- 頁頭滾動加深 ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 語言切換下拉 ---------- */
  function setLangOpen(sw, open) {
    var btn = sw.querySelector('button');
    sw.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeLangs(except) {
    document.querySelectorAll('.lang-switch.open').forEach(function (sw) {
      if (sw !== except) setLangOpen(sw, false);
    });
  }
  document.querySelectorAll('.lang-switch').forEach(function (sw) {
    var btn = sw.querySelector('button');
    if (!btn) return;
    setLangOpen(sw, false);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !sw.classList.contains('open');
      closeLangs(sw);
      setLangOpen(sw, open);
    });
  });
  document.addEventListener('click', function () { closeLangs(); });

  /* ---------- 手機選單 ---------- */
  var panel = document.getElementById('mobile-panel');
  var overlay = document.getElementById('panel-overlay');
  var toggle = document.getElementById('menu-toggle');
  var close = panel ? (document.getElementById('menu-close') || panel.querySelector('.menu-toggle.close')) : null;
  function setPanelOpen(open, moveFocus) {
    if (!panel || !toggle) return;
    var wasOpen = panel.classList.contains('open');
    panel.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) {
      panel.removeAttribute('inert');
      panel.inert = false;
    } else {
      panel.setAttribute('inert', '');
      panel.inert = true;
    }
    if (!moveFocus) return;
    if (open && close) close.focus();
    if (!open && wasOpen) toggle.focus();
  }
  function closePanel() { setPanelOpen(false, true); }
  if (toggle && panel) {
    setPanelOpen(false, false);
    toggle.addEventListener('click', function () {
      setPanelOpen(!panel.classList.contains('open'), true);
    });
    if (close) close.addEventListener('click', closePanel);
    if (overlay) overlay.addEventListener('click', closePanel);
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closePanel); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openLang = document.querySelector('.lang-switch.open');
    closeLangs();
    if (openLang) {
      var langBtn = openLang.querySelector('button');
      if (langBtn) langBtn.focus();
    }
    if (panel && panel.classList.contains('open')) closePanel();
  });

  /* ---------- 進場動畫 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
    /* 兜底：1.5s 後強制顯示全部 */
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }, 1500);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 表單校驗 + 提交 ---------- */
  document.querySelectorAll('form.ajax-form').forEach(function (form) {
    var toast = form.querySelector('.form-toast');
    var fields = form.querySelectorAll('[required]');
    function validateField(field) {
      var err = form.querySelector('.err-msg[data-for="' + field.name + '"]');
      var msg = '';
      if (!field.value.trim()) {
        msg = form.dataset.errRequired || '此欄位為必填項';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        msg = form.dataset.errEmail || '請輸入有效的電子郵件地址';
      }
      field.classList.toggle('error', !!msg);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        if (toast) toast.classList.remove('show');
        firstInvalid.focus();
        return;
      }
      if (toast) {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 4000);
      }
    });
    fields.forEach(function (field) {
      field.addEventListener('input', function () { validateField(field); });
    });
  });
})();
