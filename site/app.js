(function () {
  var C = window.MIAO_CONFIG || {};
  var yt = C.YOUTUBE_CHANNEL_URL || "https://www.youtube.com/results?search_query=Miao+Sando+%E5%96%B5%E4%B8%89%E5%93%86";
  var sub = C.YOUTUBE_CHANNEL_URL ? C.YOUTUBE_CHANNEL_URL.replace(/\/$/, "") + "?sub_confirmation=1" : yt;
  document.querySelectorAll("[data-yt]").forEach(function (a) { a.href = sub; a.target = "_blank"; a.rel = "noopener"; });
  // Episode embeds
  document.querySelectorAll("[data-ep]").forEach(function (box) {
    var id = (C.EPISODES || {})[box.getAttribute("data-ep")];
    if (id) {
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
        '" title="Miao Sando episode" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      box.classList.add("live");
    }
  });
  // Email signup
  var form = document.getElementById("signup");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = document.getElementById("signup-msg");
    if (C.CONTACT_EMAIL) {
      var em = form.querySelector("input").value;
      location.href = "mailto:" + C.CONTACT_EMAIL + "?subject=" + encodeURIComponent("订阅喵三哆的猫生日记 / Subscribe") +
        "&body=" + encodeURIComponent("请把我加入喵三哆的更新列表 Please add me: " + em);
    } else { msg.hidden = false; }
  });
  // Language toggle + English title/meta (Chinese defaults stay in the HTML)
  var HOME_META = {
    zh: {
      title: "喵三哆的猫生日记 · Miao Sando | 真猫主角 × AI 小剧场",
      desc: "Miao Sando（喵三哆）是一只蓝眼睛的银渐层英短。她的主人在美国读大学、为未来奋斗；喵三哆嘴上高冷，却总是「顺便」照顾她。真猫主角 × AI 小剧场，每周更新。",
      ogTitle: "喵三哆的猫生日记 · Miao Sando's Secret Life",
      ogDesc: "主人在美国读大学、熬夜奋斗，这只银渐层偷偷做了什么？真猫主角 × AI 小剧场。「本喵只是顺便。」",
      twTitle: "Miao Sando 喵三哆 · Miao Sando's Secret Life",
      twDesc: "A real blue-eyed British Shorthair looking after his student human — AI-made stories. 「本喵只是顺便。」",
      locale: "zh_CN"
    },
    en: {
      title: "Miao Sando's Secret Life | A Real Cat · AI-Made Stories",
      desc: "Miao Sando is a real blue-eyed silver British Shorthair. His human is in college in the US, working toward her future. He pretends not to care — and quietly looks after her. Real cat, AI-made stories. New Shorts every week.",
      ogTitle: "Miao Sando's Secret Life",
      ogDesc: "A real blue-eyed British Shorthair looking after his student human — AI-made stories. He was just passing by.",
      twTitle: "Miao Sando's Secret Life",
      twDesc: "A real blue-eyed British Shorthair looking after his student human — AI-made stories. He was just passing by.",
      locale: "en_US"
    }
  };
  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }
  function setHomeMeta(l) {
    // Only swap title/meta on the homepage, so English landing pages keep their own tags.
    if (!document.getElementById("top")) return;
    var m = HOME_META[l] || HOME_META.zh;
    document.title = m.title;
    setAttr('meta[name="description"]', "content", m.desc);
    setAttr('meta[property="og:title"]', "content", m.ogTitle);
    setAttr('meta[property="og:description"]', "content", m.ogDesc);
    setAttr('meta[property="og:locale"]', "content", m.locale);
    setAttr('meta[name="twitter:title"]', "content", m.twTitle);
    setAttr('meta[name="twitter:description"]', "content", m.twDesc);
  }
  var btn = document.getElementById("lang"), root = document.documentElement;
  function setLang(l) {
    root.classList.toggle("en-only", l === "en");
    root.lang = l === "en" ? "en" : "zh-Hans";
    if (btn) btn.textContent = l === "en" ? "中文" : "EN";
    try { localStorage.setItem("miao-lang", l); } catch (e) {}
    setHomeMeta(l);
  }
  var saved = null; try { saved = localStorage.getItem("miao-lang"); } catch (e) {}
  if (saved === "en" || /[?&]lang=en/.test(location.search)) setLang("en");
  else setHomeMeta("zh");
  if (btn) btn.addEventListener("click", function () { setLang(root.classList.contains("en-only") ? "zh" : "en"); });
  // Sticky nav state
  var nav = document.getElementById("nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 5) * 70 + "ms"; io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }
  // Lightbox
  var lb = document.getElementById("lb");
  if (lb) {
    var lbi = lb.querySelector("img");
    document.querySelectorAll(".frames a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (!lb.showModal) return;
        e.preventDefault(); lbi.src = a.href; lbi.alt = a.querySelector("img").alt; lb.showModal();
      });
    });
    lb.addEventListener("click", function () { lb.close(); });
  }
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
