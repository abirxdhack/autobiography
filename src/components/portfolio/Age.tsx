import { useEffect, useState } from "react";

const DOB = new Date("2009-04-17T00:00:00Z");

function calcAge(dob: Date): string {
  const now = new Date();
  let years = now.getUTCFullYear() - dob.getUTCFullYear();
  const m = now.getUTCMonth() - dob.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < dob.getUTCDate())) years--;
  const lastBday = new Date(Date.UTC(now.getUTCFullYear(), dob.getUTCMonth(), dob.getUTCDate()));
  if (lastBday.getTime() > now.getTime()) lastBday.setUTCFullYear(lastBday.getUTCFullYear() - 1);
  const nextBday = new Date(Date.UTC(lastBday.getUTCFullYear() + 1, dob.getUTCMonth(), dob.getUTCDate()));
  const frac = (now.getTime() - lastBday.getTime()) / (nextBday.getTime() - lastBday.getTime());
  return (years + frac).toFixed(7);
}

function calcAgeYears(dob: Date): number {
  const now = new Date();
  let years = now.getUTCFullYear() - dob.getUTCFullYear();
  const m = now.getUTCMonth() - dob.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < dob.getUTCDate())) years--;
  return years;
}

export function LiveAge() {
  const [age, setAge] = useState<string>(() => calcAge(DOB));
  useEffect(() => {
    setAge(calcAge(DOB));
    const id = setInterval(() => setAge(calcAge(DOB)), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <span suppressHydrationWarning className="font-mono text-gradient tabular-nums">
      {age}
    </span>
  );
}

export function AgeYears() {
  const [years, setYears] = useState<number>(() => calcAgeYears(DOB));
  useEffect(() => {
    setYears(calcAgeYears(DOB));
  }, []);
  return <span suppressHydrationWarning>{years}</span>;
}
