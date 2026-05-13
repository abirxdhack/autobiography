import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

export const QUOTES: string[] = [
  "I never chose to hurt anyone. I never chose to become bitter. And maybe that is the only thing I am still proud of.",
  "Some people walked out of my story without ever explaining the ending — and I learned to write the next chapter alone.",
  "Silence is not weakness. Sometimes it is the loudest form of survival.",
  "I lost people I thought were forever. In return, I found a version of myself I did not know existed.",
  "Code never lied to me. Every error was honest, and every fix felt like trust I could rebuild.",
  "I do not write to be remembered. I write so that the boy I used to be feels finally heard.",
  "The world kept handing me reasons to harden. I kept choosing to stay soft. That is my quiet rebellion.",
  "Talent is loud. Discipline is quiet. I bet everything I have on the quiet one.",
  "I would rather be unseen and honest than worshipped and pretending.",
  "Every line of code is a small promise that tomorrow I will still be here, still trying.",
  "Pain did not make me stronger. Choosing not to pass it on did.",
  "I am not building a legacy. I am building a witness for the years no one else watched.",
];

export function QuoteCarousel({ interval = 1500 }: { interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), interval);
    return () => clearInterval(id);
  }, [interval, paused]);

  const text = QUOTES[i];

  return (
    <div
      className="glass relative overflow-hidden rounded-3xl p-8 sm:p-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.85_0.18_200/0.08)] via-transparent to-[oklch(0.72_0.25_330/0.08)]" />
      <Quote className="mx-auto h-9 w-9 text-[oklch(0.85_0.18_200)]" />

      <div className="relative mx-auto mt-6 flex min-h-[12rem] max-w-3xl items-center justify-center sm:min-h-[10rem]">
        <p
          key={i}
          className="quote-in font-serif-display text-center text-2xl leading-[1.5] text-foreground/95 sm:text-3xl md:text-[2rem]"
        >
          <span className="mr-1 align-top text-3xl text-[oklch(0.85_0.18_200)]">&ldquo;</span>
          {text}
          <span className="ml-1 align-top text-3xl text-[oklch(0.72_0.25_330)]">&rdquo;</span>
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[oklch(0.85_0.18_200)]" />
        <span className="font-chapter text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Bayejid
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[oklch(0.72_0.25_330)]" />
      </div>
    </div>
  );
}
