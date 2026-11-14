export function initSkills() {
  document.querySelectorAll("[data-skill-row]").forEach((row) => {
    const bar = row.querySelector("[data-skill]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bar.style.width = `${bar.dataset.skill}%`;
            observer.disconnect();
          }
        }),
      { threshold: 0.4 },
    );
    observer.observe(row);
  });
}
