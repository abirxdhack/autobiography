import { initTheme } from "./modules/theme.js";

initTheme();

const base = document.querySelector("base")?.getAttribute("href") || "/";
const path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
if (/^stories\/[^/]/.test(path)) {
  document.querySelector('[data-not-found="page"]').hidden = true;
  document.querySelector('[data-not-found="story"]').hidden = false;
}
