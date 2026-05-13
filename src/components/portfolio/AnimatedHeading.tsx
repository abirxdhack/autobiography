import type { ReactNode } from "react";

export function AnimatedWords({
  text,
  className = "",
  highlight,
  highlightClass = "text-gradient",
  stagger = 80,
}: {
  text: string;
  className?: string;
  highlight?: string;
  highlightClass?: string;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`word-rise inline-block ${className}`}>
      {words.map((w, i) => {
        const isHi = highlight && w.replace(/[.,!?]/g, "") === highlight;
        const node: ReactNode = isHi ? <span className={highlightClass}>{w}</span> : w;
        return (
          <span
            key={`${w}-${i}`}
            style={{ animationDelay: `${i * stagger}ms` }}
            className="mr-[0.28em]"
          >
            {node}
          </span>
        );
      })}
    </span>
  );
}
