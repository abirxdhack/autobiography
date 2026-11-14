import { $, $$, escapeHtml, restartAnimation } from "./dom.js";
import { icon } from "./icons.js";

export function initLibrary() {
  const section = $("[data-library]");
  if (!section) return;
  const input = $("[data-library-search]", section);
  const box = $("[data-library-search-box]", section);
  const tabs = $$("[data-library-filter]", section);
  const count = $("[data-library-count]", section);
  const grid = $("[data-library-grid]", section);
  const cards = $$("[data-search]", grid);
  const total = cards.length;
  let filter = "all";
  let query = "";
  let clearButton = null;
  let empty = null;

  const render = () => {
    const q = query.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const show = (filter === "all" || card.dataset.category === filter) && (!q || card.dataset.search.includes(q));
      card.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${total} stories`;
    tabs.forEach((tab) => {
      const on = tab.dataset.libraryFilter === filter;
      tab.setAttribute("aria-selected", String(on));
      tab.classList.toggle("is-active", on);
    });
    if (query && !clearButton) {
      clearButton = document.createElement("button");
      clearButton.type = "button";
      clearButton.setAttribute("aria-label", "Clear search");
      clearButton.className = "text-fg-dim hover:text-accent";
      clearButton.innerHTML = icon("x", { size: 15 });
      clearButton.addEventListener("click", (event) => {
        event.preventDefault();
        setState(filter, "");
      });
      box.appendChild(clearButton);
    } else if (!query && clearButton) {
      clearButton.remove();
      clearButton = null;
    }
    grid.classList.toggle("hidden", visible === 0);
    if (visible === 0) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "mt-8 rounded-[14px] border border-border p-8 text-center";
        grid.after(empty);
      }
      empty.innerHTML = `<p class="font-bold text-fg">No story matches “${escapeHtml(query)}”.</p><button type="button" class="btn-ghost mt-4">Show all stories</button>`;
      empty.querySelector("button").addEventListener("click", () => setState("all", ""));
    } else {
      if (empty) empty.remove();
      empty = null;
      restartAnimation(grid, "gallery-grid");
    }
  };

  const setState = (nextFilter, nextQuery) => {
    if (nextFilter === filter && nextQuery === query) return;
    filter = nextFilter;
    query = nextQuery;
    if (input.value !== query) input.value = query;
    render();
  };

  input.addEventListener("input", () => setState(filter, input.value));
  tabs.forEach((tab) => tab.addEventListener("click", () => setState(tab.dataset.libraryFilter, query)));
  if (input.value) setState(filter, input.value);
}
