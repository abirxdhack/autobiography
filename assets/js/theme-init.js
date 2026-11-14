(function () {
  try {
    var saved = localStorage.getItem("theme") || "system";
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    var light = saved === "light" || (saved === "system" && prefersLight);
    var root = document.documentElement;
    root.classList.toggle("light", light);
    root.classList.toggle("dark", !light);
    root.style.colorScheme = light ? "light" : "dark";
  } catch (error) {}
})();
