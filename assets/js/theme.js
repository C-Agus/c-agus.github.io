// Light/dark toggle. Follows the system setting until the visitor picks one.
// Storage can be blocked (private windows, strict settings), so every access is guarded.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* ignore */ }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  var initial = saved();
  if (initial === "light" || initial === "dark") root.setAttribute("data-theme", initial);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    function isDark() {
      var t = root.getAttribute("data-theme");
      return t ? t === "dark" : systemDark();
    }
    function sync() {
      btn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
    }
    sync();
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      sync();
    });
  });
})();
