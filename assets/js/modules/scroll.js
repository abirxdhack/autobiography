import { icon } from "./icons.js";

const BACK_TO_TOP_CLASSES = {
  home: "fixed bottom-6 right-6 z-50 grid h-10 w-10 place-items-center rounded-full border border-accent bg-bg-2 text-accent shadow-[0_0_24px_rgba(226,113,12,.35)] transition hover:scale-110 hover:bg-accent hover:text-accent-foreground",
  story: "icon-btn fixed bottom-6 right-6 z-50",
};

export function createBackToTop(variant) {
  let button = null;
  return (visible) => {
    if (visible && !button) {
      button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Back to top");
      button.className = BACK_TO_TOP_CLASSES[variant];
      button.innerHTML = icon("arrow-up", { size: 16 });
      button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      document.body.appendChild(button);
    } else if (!visible && button) {
      button.remove();
      button = null;
    }
  };
}

export function updateProgress(bar) {
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
  bar.style.width = `${progress}%`;
}

export function initPageScroll() {
  const page = document.body.dataset.page;
  if (page !== "story" && page !== "library") return;
  const bar = document.querySelector("[data-progress]");
  const backToTop = createBackToTop("story");
  const onScroll = () => {
    if (page === "story") updateProgress(bar);
    backToTop(window.scrollY > 520);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  if (page === "story") onScroll();
}

export function initSmoothAnchors() {
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById(link.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

export function scrollToSection(id, offset) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
