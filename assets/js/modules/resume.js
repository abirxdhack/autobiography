export function initResume() {
  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => {
      const file = new URL(button.dataset.print, location.href).href;
      const frame = document.createElement("iframe");
      Object.assign(frame.style, { position: "fixed", right: "0", bottom: "0", width: "0", height: "0", border: "0" });
      frame.src = file;
      frame.onload = () => {
        try {
          frame.contentWindow?.focus();
          frame.contentWindow?.print();
        } catch (error) {
          window.open(file, "_blank", "noopener,noreferrer");
        }
      };
      document.body.appendChild(frame);
    });
  });
}
