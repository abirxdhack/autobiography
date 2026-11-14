import { $, $$ } from "./dom.js";

export function initStoryShelf() {
  const rail = $("[data-shelf-rail]");
  if (!rail) return;
  const tabs = $$("[data-shelf-filter]");
  const cards = $$("[data-category]", rail);
  let current = "all";

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      const next = tab.dataset.shelfFilter;
      if (next !== current) {
        current = next;
        tabs.forEach((t) => {
          const on = t.dataset.shelfFilter === current;
          t.setAttribute("aria-selected", String(on));
          t.classList.toggle("is-active", on);
        });
        cards.forEach((card) => card.classList.toggle("hidden", current !== "all" && card.dataset.category !== current));
      }
      rail.scrollTo({ left: 0 });
    }),
  );

  $$("[data-shelf-slide]").forEach((button) =>
    button.addEventListener("click", () => {
      const dir = Number(button.dataset.shelfSlide);
      rail.scrollBy({ left: dir * Math.max(280, rail.clientWidth * 0.8), behavior: "smooth" });
    }),
  );
}
