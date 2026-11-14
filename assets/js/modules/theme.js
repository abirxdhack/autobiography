import { icon } from "./icons.js";

const STORAGE_KEY = "theme";
const OPTIONS = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

function savedMode() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "system";
  } catch (error) {
    return "system";
  }
}

export function applyTheme(mode) {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const light = mode === "light" || (mode === "system" && prefersLight);
  const root = document.documentElement;
  root.classList.toggle("light", light);
  root.classList.toggle("dark", !light);
  root.style.colorScheme = light ? "light" : "dark";
}

function menuMarkup(mode) {
  const items = OPTIONS.map(
    (o) =>
      `<button type="button" data-theme-option="${o.value}" class="flex w-full items-center gap-2 px-3 py-2 text-left text-[0.78rem] font-semibold transition hover:bg-accent/15 ${mode === o.value ? "text-accent" : "text-fg"}">${icon(o.icon, { size: 14 })} ${o.label}</button>`,
  ).join("");
  return `<div class="absolute right-0 top-[calc(100%+6px)] z-50 w-36 overflow-hidden rounded-[8px] border border-border bg-bg-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,.6)]">${items}</div>`;
}

function setupToggle(wrapper) {
  const button = wrapper.querySelector("button");
  let mode = savedMode();
  let menu = null;

  const renderIcon = () => {
    const current = OPTIONS.find((o) => o.value === mode) || OPTIONS[2];
    button.innerHTML = icon(current.icon, { size: 15 });
  };

  const close = () => {
    if (menu) menu.remove();
    menu = null;
  };

  const open = () => {
    wrapper.insertAdjacentHTML("beforeend", menuMarkup(mode));
    menu = wrapper.lastElementChild;
    menu.addEventListener("click", (event) => {
      const option = event.target.closest("[data-theme-option]");
      if (!option) return;
      mode = option.dataset.themeOption;
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (error) {}
      applyTheme(mode);
      renderIcon();
      close();
    });
  };

  button.addEventListener("click", () => (menu ? close() : open()));
  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) close();
  });

  applyTheme(mode);
  renderIcon();
}

export function initTheme() {
  document.querySelectorAll("[data-theme-toggle]").forEach(setupToggle);
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (savedMode() === "system") applyTheme("system");
  });
}
