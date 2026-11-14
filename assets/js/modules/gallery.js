import { $, $$, restartAnimation } from "./dom.js";
import { scrollToSection } from "./scroll.js";

export function initGallery() {
  const grid = $("[data-gallery-grid]");
  if (!grid) return;
  const tabs = $$("[data-gallery-filter]");
  const items = $$("[data-tags]", grid);
  let filter = tabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset.galleryFilter || "best";

  const setFilter = (next) => {
    if (next === filter) return;
    filter = next;
    tabs.forEach((tab) => {
      const on = tab.dataset.galleryFilter === filter;
      tab.setAttribute("aria-selected", String(on));
      tab.classList.toggle("is-active", on);
    });
    items.forEach((item) => {
      const show = filter === "all" || item.dataset.tags.split(" ").includes(filter);
      item.classList.toggle("hidden", !show);
    });
    restartAnimation(grid, "gallery-grid");
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => setFilter(tab.dataset.galleryFilter)));
  $$("[data-gallery-show]").forEach((button) =>
    button.addEventListener("click", () => {
      setFilter(button.dataset.galleryShow);
      requestAnimationFrame(() => scrollToSection("gallery", 72));
    }),
  );
}
