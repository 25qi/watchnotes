// 中英切換:[data-lang] 只顯示目前語言;預設依 ?lang=、上次選擇、瀏覽器語言。沒有 JS 時兩種語言都顯示。
(function () {
  var KEY = "watchnotes-lang";
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "zh") return q;
    try { var saved = localStorage.getItem(KEY); if (saved === "en" || saved === "zh") return saved; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    return langs.some(function (l) { return /^zh/i.test(l); }) ? "zh" : "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-lang]").forEach(function (el) { el.hidden = el.getAttribute("data-lang") !== lang; });
    document.querySelectorAll("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang)); });
    var t = document.documentElement.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    document.querySelectorAll("a[data-keep-lang]").forEach(function (a) { a.search = "?lang=" + lang; });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-lang]");
    if (!b) return;
    var lang = b.getAttribute("data-set-lang");
    try { localStorage.setItem(KEY, lang); } catch (err) {}
    apply(lang);
  });
  apply(pick());
})();
