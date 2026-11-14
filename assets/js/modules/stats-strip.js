import { animateNumber } from "./dom.js";

export function initStatsStrip() {
  const strip = document.querySelector("[data-stats-strip]");
  if (!strip) return;
  const start = () =>
    strip.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      animateNumber(0, target, 1400, (value) => {
        el.textContent = `${value}${suffix}`;
      }, { respectMotion: false });
    });
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      }),
    { threshold: 0.3 },
  );
  observer.observe(strip);
}
