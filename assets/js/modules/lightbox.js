import { photos, storyPaths } from "../data/photos.js";
import { siteUrl } from "./config.js";
import { escapeHtml, pad2 } from "./dom.js";
import { icon } from "./icons.js";

let state = null;

function markup(list, index) {
  const photo = list[index];
  const many = list.length > 1;
  const storyLink = photo.story
    ? `<a href="${siteUrl(storyPaths[photo.story])}" data-lightbox-story class="btn-primary">Read the story ${icon("arrow-up-right", { size: 14 })}</a>`
    : "";
  return `
    <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <span class="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-fg-muted">${pad2(index + 1)} / ${pad2(list.length)}</span>
      <button type="button" data-lightbox-close aria-label="Close photo" class="icon-btn">${icon("x", { size: 18 })}</button>
    </div>
    <div class="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16">
      <img src="${siteUrl(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${escapeHtml(photo.alt)}" data-lightbox-stop class="lightbox-img block h-auto max-h-full w-auto max-w-full rounded-[10px] object-contain">
      ${many ? `<button type="button" data-lightbox-prev data-lightbox-stop aria-label="Previous photo" class="icon-btn absolute left-3 top-1/2 hidden -translate-y-1/2 sm:grid">${icon("chevron-left", { size: 20 })}</button><button type="button" data-lightbox-next data-lightbox-stop aria-label="Next photo" class="icon-btn absolute right-3 top-1/2 hidden -translate-y-1/2 sm:grid">${icon("chevron-right", { size: 20 })}</button>` : ""}
    </div>
    <div data-lightbox-stop class="flex flex-wrap items-center justify-center gap-3 px-4 py-4 text-center sm:px-6">
      ${many ? `<button type="button" data-lightbox-prev aria-label="Previous photo" class="icon-btn sm:hidden">${icon("chevron-left", { size: 18 })}</button>` : ""}
      <p class="max-w-[560px] text-[0.9rem] italic leading-[1.5] text-fg/90">${escapeHtml(photo.caption)}</p>
      ${storyLink}
      ${many ? `<button type="button" data-lightbox-next aria-label="Next photo" class="icon-btn sm:hidden">${icon("chevron-right", { size: 18 })}</button>` : ""}
    </div>`;
}

function render() {
  const { dialog, list, index } = state;
  dialog.setAttribute("aria-label", list[index].alt);
  dialog.innerHTML = markup(list, index);
}

function go(step) {
  const { list } = state;
  state.index = (state.index + step + list.length) % list.length;
  render();
}

function close() {
  if (!state) return;
  document.removeEventListener("keydown", state.onKey);
  document.body.style.overflow = state.overflow;
  state.dialog.remove();
  state = null;
}

export function openLightbox(ids, index) {
  close();
  const list = ids.map((id) => photos[id]).filter(Boolean);
  if (!list.length) return;
  const dialog = document.createElement("div");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.className = "lightbox-backdrop fixed inset-0 z-[70] flex flex-col";
  dialog.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest("[data-lightbox-prev]")) return go(-1);
    if (target.closest("[data-lightbox-next]")) return go(1);
    if (target.closest("[data-lightbox-story]")) return close();
    if (target.closest("[data-lightbox-close]")) return close();
    if (target.closest("[data-lightbox-stop]")) return;
    close();
  });
  const onKey = (event) => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };
  state = { dialog, list, index: Math.min(Math.max(0, index), list.length - 1), onKey, overflow: document.body.style.overflow };
  document.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
  render();
  document.body.appendChild(dialog);
}

export function initLightbox() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-photo]");
    if (!button) return;
    const id = button.dataset.photo;
    const grid = button.closest("[data-gallery-grid]");
    let ids;
    if (grid) {
      ids = Array.from(grid.querySelectorAll("[data-tags]:not(.hidden) [data-photo]")).map((b) => b.dataset.photo);
    } else {
      const owner = button.closest("[data-photo-list]");
      ids = owner ? owner.dataset.photoList.split(",") : [id];
    }
    openLightbox(ids, Math.max(0, ids.indexOf(id)));
  });
}
