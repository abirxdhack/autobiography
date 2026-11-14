export const $ = (selector, root = document) => root.querySelector(selector);

export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export const pad2 = (n) => String(n).padStart(2, "0");

export const fmt = (n) => n.toLocaleString("en-US");

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function toggleClasses(el, on, whenOn, whenOff = "") {
  const a = whenOn.split(/\s+/).filter(Boolean);
  const b = whenOff.split(/\s+/).filter(Boolean);
  el.classList.remove(...(on ? b : a));
  el.classList.add(...(on ? a : b));
}

export function fromHtml(markup) {
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

export function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function animateNumber(from, to, duration, onFrame, { respectMotion = true } = {}) {
  if (from === to || (respectMotion && prefersReducedMotion())) {
    onFrame(to);
    return () => {};
  }
  let frame = 0;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    onFrame(Math.round(from + (to - from) * eased));
    if (p < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
