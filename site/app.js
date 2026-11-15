(function () {
  var C = window.MIAO_CONFIG || {};
  var yt = C.YOUTUBE_CHANNEL_URL || "https://www.youtube.com/results?search_query=Miao+Sando+AI%E7%8C%AB";
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
      location.href = "mailto:" + C.CONTACT_EMAIL + "?subject=" + encodeURIComponent("订阅三朵的猫生日记 / Subscribe") +
        "&body=" + encodeURIComponent("请把我加入三朵的更新列表 Please add me: " + em);
    } else {
      msg.hidden = false;
    }
  });
  // Language toggle
  var btn = document.getElementById("lang");
  function setLang(l) {
    document.documentElement.classList.toggle("en-only", l === "en");
    document.documentElement.lang = l === "en" ? "en" : "zh-Hans";
    btn.textContent = l === "en" ? "中文" : "EN";
    try { localStorage.setItem("miao-lang", l); } catch (e) {}
  }
  var saved = null; try { saved = localStorage.getItem("miao-lang"); } catch (e) {}
  if (saved === "en" || /[?&]lang=en/.test(location.search)) setLang("en");
  btn.addEventListener("click", function () { setLang(document.documentElement.classList.contains("en-only") ? "zh" : "en"); });
  // Lightbox
  var lb = document.getElementById("lb"), lbi = lb.querySelector("img");
  document.querySelectorAll(".frames a").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); lbi.src = a.href; lbi.alt = a.querySelector("img").alt; lb.showModal(); });
  });
  lb.addEventListener("click", function () { lb.close(); });
  document.getElementById("yr").textContent = new Date().getFullYear();
})();
