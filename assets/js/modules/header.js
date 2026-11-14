import { $, $$, toggleClasses } from "./dom.js";
import { createBackToTop, updateProgress } from "./scroll.js";

const HIDDEN = "-translate-y-full opacity-0";
const SHOWN = "translate-y-0 opacity-100";
const SCROLLED = "border-b border-accent/15 bg-bg/55 backdrop-blur-md shadow-[0_8px_24px_-18px_rgba(0,0,0,.6)]";
const TOP = "border-b border-transparent bg-transparent";
const LINE_OPEN = ["translate-y-[5px] rotate-45", "opacity-0", "-translate-y-[5px] -rotate-45"];

export function scrollToNav(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
}

export function initHomeHeader() {
  const header = $("[data-site-header]");
  if (!header) return;
  const desktopNav = $("[data-desktop-nav]", header);
  const navButtons = $$("[data-nav]", desktopNav);
  const items = navButtons.map((b) => ({ id: b.dataset.nav, label: b.textContent.trim() }));
  const toggle = $("[data-menu-toggle]", header);
  const lines = $$("span > span", toggle);
  const bar = $("[data-progress]");
  const backToTop = createBackToTop("home");
  let active = "home";
  let lastY = 0;
  let hidden = false;
  let scrolled = false;
  let menu = null;

  const renderMenu = () => {
    if (!menu) return;
    menu.innerHTML = `<div class="grid gap-3">${items
      .map(
        (item) =>
          `<button type="button" data-mobile-nav="${item.id}" class="text-left text-xs font-bold uppercase tracking-wider transition ${active === item.id ? "text-accent" : "text-fg-muted hover:text-accent"}">${item.label}</button>`,
      )
      .join("")}</div>`;
  };

  const setActive = (id) => {
    if (id === active) return;
    active = id;
    navButtons.forEach((button) => {
      const on = button.dataset.nav === id;
      toggleClasses(button, on, "text-accent", "text-fg/85 hover:text-accent");
      toggleClasses(button.querySelector("span"), on, "w-full", "w-0");
    });
    renderMenu();
  };

  const setMenu = (open) => {
    lines.forEach((line, i) => toggleClasses(line, open, LINE_OPEN[i]));
    if (open && !menu) {
      menu = document.createElement("nav");
      menu.className = "border-y border-border bg-bg/96 px-6 py-4 lg:hidden";
      menu.addEventListener("click", (event) => {
        const button = event.target.closest("[data-mobile-nav]");
        if (!button) return;
        scrollToNav(button.dataset.mobileNav);
        setMenu(false);
      });
      header.appendChild(menu);
      renderMenu();
    } else if (!open && menu) {
      menu.remove();
      menu = null;
    }
  };

  toggle.addEventListener("click", () => setMenu(!menu));

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-nav]");
    if (!button) return;
    event.preventDefault();
    scrollToNav(button.dataset.nav);
  });

  const onScroll = () => {
    const sy = window.scrollY;
    backToTop(sy > 520);
    const nextScrolled = sy > 24;
    if (nextScrolled !== scrolled) {
      scrolled = nextScrolled;
      toggleClasses(header, scrolled, SCROLLED, TOP);
    }
    const delta = sy - lastY;
    let nextHidden = hidden;
    if (sy > 120 && delta > 6) nextHidden = true;
    else if (delta < -4) nextHidden = false;
    if (nextHidden !== hidden) {
      hidden = nextHidden;
      toggleClasses(header, hidden, HIDDEN, SHOWN);
    }
    lastY = sy;
    updateProgress(bar);
    const y = sy + 140;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      const el = document.getElementById(items[i].id);
      if (el && el.offsetTop <= y) {
        setActive(items[i].id);
        break;
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
