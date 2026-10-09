/* NexMatrix site interactions */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  /* Header scroll state */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Active nav link */
  const path = location.pathname.replace(/\/$/, "") || "/";
  const page = path.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[data-nav]").forEach((a) => {
    const key = a.getAttribute("data-nav");
    if (
      (key === "home" && (page === "" || page === "index.html" || page === "/")) ||
      a.getAttribute("href") === page ||
      a.getAttribute("href").endsWith(page)
    ) {
      a.classList.add("active");
    }
  });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* Contact form (client-side demo + mailto fallback) */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const company = (data.get("company") || "").toString().trim();
      const service = (data.get("service") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !phone || !message) {
        const isEn = (document.documentElement.lang || "").toLowerCase().startsWith("en");
        alert(isEn
          ? "Please fill in name, phone, and message."
          : "請填寫姓名、聯繫電話與需求說明。");
        return;
      }

      const success = form.querySelector(".form-success");
      if (success) success.classList.add("show");

      const body = [
        `姓名：${name}`,
        `电话：${phone}`,
        `公司：${company || "—"}`,
        `意向服务：${service || "—"}`,
        "",
        "需求说明：",
        message,
      ].join("\n");

      /* Optional: open mail client as secondary path */
      const subject = encodeURIComponent(`[NexMatrix 官网咨询] ${name}`);
      const mailto = `mailto:contact@nexmatrixs.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      /* Keep UX calm — only show success; user can still copy contact phones */
      form.reset();
      setTimeout(() => {
        if (success) success.classList.remove("show");
      }, 6000);

      /* Store lead locally for follow-up if needed */
      try {
        const leads = JSON.parse(localStorage.getItem("nm_leads") || "[]");
        leads.push({ name, phone, company, service, message, at: new Date().toISOString() });
        localStorage.setItem("nm_leads", JSON.stringify(leads.slice(-50)));
      } catch (_) { /* ignore */ }

      /* Silently prepare mailto without forcing navigation */
      form.dataset.mailto = mailto;
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* Horizontal image carousel (cases page) — no-op if absent */
  document.querySelectorAll("[data-carousel]").forEach((car) => {
    const track = car.querySelector(".cs-track");
    const prev = car.querySelector(".cs-cbtn--prev");
    const next = car.querySelector(".cs-cbtn--next");
    if (!track || !prev || !next) return;

    /* One slide + the gap between slides */
    function step() {
      const slide = track.querySelector(".cs-shot");
      if (!slide) return Math.round(track.clientWidth * 0.7);
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap || cs.gap) || 0;
      return slide.getBoundingClientRect().width + gap;
    }

    function sync() {
      const max = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= max - 1;
      prev.disabled = atStart;
      next.disabled = atEnd;
      /* Fade the edge blur out where there is nothing left to reveal */
      car.classList.toggle("at-start", atStart);
      car.classList.toggle("at-end", atEnd);
    }

    /* Bring a slide to the centre of the track */
    function centerSlide(i, instant) {
      const slides = track.querySelectorAll(".cs-shot");
      const slide = slides[i];
      if (!slide) return;
      const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
      const max = track.scrollWidth - track.clientWidth;
      const target = Math.max(0, Math.min(left, max));
      if (instant) {
        const prevBehavior = track.style.scrollBehavior;
        track.style.scrollBehavior = "auto";
        track.scrollLeft = target;
        track.style.scrollBehavior = prevBehavior;
        sync();
      } else {
        track.scrollTo({ left: target, behavior: "smooth" });
      }
    }

    /* Springy press feedback, nudged toward the travel direction */
    function press(btn, dir) {
      if (typeof btn.animate !== "function") return;
      btn.animate(
        [
          { transform: "scale(1) translateX(0)" },
          { transform: "scale(0.86) translateX(" + dir * 5 + "px)" },
          { transform: "scale(1.06) translateX(" + dir * -2 + "px)" },
          { transform: "scale(1) translateX(0)" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
      const icon = btn.querySelector("i");
      if (icon) {
        icon.animate(
          [
            { transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(" + dir * 7 + "px)", opacity: 0.15 },
            { transform: "translateX(" + dir * -7 + "px)", opacity: 0.15 },
            { transform: "translateX(0)", opacity: 1 },
          ],
          { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
      }
    }

    prev.addEventListener("click", () => {
      press(prev, -1);
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      press(next, 1);
      track.scrollBy({ left: step(), behavior: "smooth" });
    });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    /* Open on the middle slide so both edges peek */
    const slideCount = track.querySelectorAll(".cs-shot").length;
    if (slideCount > 2) centerSlide(Math.floor(slideCount / 2), true);
    else sync();
  });

  /* Year in footer */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
