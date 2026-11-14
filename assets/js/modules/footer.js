export function initFooter() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });
  document.querySelectorAll("[data-subscribe]").forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });
}
