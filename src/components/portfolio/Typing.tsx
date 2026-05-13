import { useEffect, useState } from "react";

export function Typing({ words, speed = 90, pause = 1400 }: { words: string[]; speed?: number; pause?: number }) {
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const word = words[i % words.length];
    if (!del && text === word) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause, mounted]);

  return (
    <span suppressHydrationWarning className="font-mono">
      <span className="text-gradient">{mounted ? text : words[0]}</span>
      <span className="caret h-[1em] align-middle" />
    </span>
  );
}
