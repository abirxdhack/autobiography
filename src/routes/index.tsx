import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  ArrowUpRight,
  MapPin,
  GraduationCap,
  Mail,
  Code2,
  Sparkles,
  Heart,
  Send,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  BookOpen,
  Award,
  Cpu,
  Compass,
  Rocket,
} from "lucide-react";
import profileImg from "@/assets/profile.png";
import { Reveal } from "@/components/portfolio/Reveal";
import { Typing } from "@/components/portfolio/Typing";
import { LiveAge, AgeYears } from "@/components/portfolio/Age";
import { QuoteCarousel } from "@/components/portfolio/QuoteCarousel";
import { AnimatedWords } from "@/components/portfolio/AnimatedHeading";

export const Route = createFileRoute("/")({
  component: Home,
});

const GITHUB = "https://github.com/abirxdhack";

const projects = [
  {
    name: "irenogram",
    desc: "An expressive social experiment — building the experience layer of a modern community feed.",
    url: `${GITHUB}/irenogram`,
    tag: "Social",
  },
  {
    name: "TheSmartFaker",
    desc: "A developer-first fake data generator with smart locale awareness and composable schemas.",
    url: `${GITHUB}/TheSmartFaker`,
    tag: "Dev Tool",
  },
  {
    name: "TheSmartBinDB",
    desc: "Lightweight binary-style key-value database focused on speed, simplicity, and zero-config storage.",
    url: `${GITHUB}/TheSmartBinDB`,
    tag: "Database",
  },
];

const timeline = [
  {
    year: "PSC",
    title: "Primary School Certificate",
    detail: "GPA 5.00 — the first quiet proof to myself.",
    Icon: Award,
  },
  {
    year: "SSC",
    title: "Secondary School Certificate",
    detail: "GPA 4.94 — Science. Discipline over noise.",
    Icon: GraduationCap,
  },
  {
    year: "2027",
    title: "HSC — Govt. Yeasin College, Faridpur",
    detail: "Currently pursuing Higher Secondary in Science.",
    Icon: BookOpen,
  },
  {
    year: "Now",
    title: "Building. Learning. Becoming.",
    detail: "Python, PHP & JavaScript — shipping open-source tools.",
    Icon: Rocket,
  },
];

const socials = [
  { icon: Github, href: GITHUB, label: "GitHub" },
  { icon: Send, href: "https://t.me/TheSmartDev", label: "Telegram" },
  { icon: Youtube, href: "https://youtube.com/@abirxdhackz", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com/abirxdhack", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/abirxdhack", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/abirxdhack", label: "X" },
  { icon: Mail, href: "mailto:abir@thesmartdev.io", label: "Email" },
];

const chapters = [
  {
    n: 1,
    title: "A small town, a small boy",
    Icon: Compass,
    body: "I was born on April 17, 2009 in Faridpur — a quiet town in Bangladesh that doesn't show up on most maps. My world started small: dusty roads, evening cricket, my mother's cooking, the call to prayer at sunset. I wasn't the kid who screamed for attention. I was the one watching the others, wondering how they made it look so easy.",
  },
  {
    n: 2,
    title: "The first computer",
    Icon: Cpu,
    body: "I still remember the first time a screen blinked back at me. It felt like the world finally had a language I could speak. While other kids played outside, I disappeared into HTML tags, broken Python scripts and YouTube tutorials in languages I barely understood. Every error message felt personal — and every fix felt like winning a tiny war.",
  },
  {
    n: 3,
    title: "School, silence, and a 5.00",
    Icon: Award,
    body: "I got GPA 5.00 in PSC. 4.94 in SSC. Numbers that looked nice on paper but never explained the nights behind them. I wasn't the loudest student. I wasn't the favorite. I just kept my head down and let the work speak. It still does.",
  },
  {
    n: 4,
    title: "Losing people I thought were forever",
    Icon: Heart,
    body: "Then came the part nobody warns you about. A best friend left. Someone I cared about deeply walked out of my story without explaining the ending. I learned that some people are seasons, not lifetimes — and that lesson cost more than I'd like to admit.",
  },
  {
    n: 5,
    title: "Losing pieces of myself",
    Icon: Sparkles,
    body: "After that, I started disappearing in slower ways. My confidence. My voice. My laugh. I became more silent, more distant, more inside my own world. Not because I wanted to — but because holding on was a skill nobody taught me.",
  },
  {
    n: 6,
    title: "Code became my therapist",
    Icon: Code2,
    body: "Python didn't ghost me. PHP didn't lie. JavaScript didn't leave. Building things became the way I rebuilt myself — line by line. irenogram, TheSmartFaker, TheSmartBinDB — every project is a piece of me I refused to let die.",
  },
  {
    n: 7,
    title: "The thing I'm proud of",
    Icon: Heart,
    body: "Through all of it, I never chose to hurt anyone. I never became bitter. I stayed soft in a world that kept handing me reasons to harden. Maybe that's not impressive to most people. To me, it's everything.",
  },
  {
    n: 8,
    title: "Where I am now",
    Icon: Rocket,
    body: "I am 17 now. Studying for HSC at Govt. Yeasin College, Faridpur. Shipping open-source tools at night. Running TheSmartDev community. Still quiet. Still learning. Still here. The story isn't finished — it's barely starting.",
  },
];

function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <section id="top" className="relative flex min-h-screen items-center px-4 pt-20 sm:pt-28">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-foreground/5 px-3 py-1 font-chapter text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                Portfolio · Bayejid Arafat Chawdhury
              </div>

              <h1 className="text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[1.02] tracking-tight">
                Abir Arafat <br />
                <span className="text-shimmer">Chawdhury</span>
                <span className="font-serif-display italic text-muted-foreground/70"> · Bayejid</span>
              </h1>

              <div className="text-lg sm:text-xl">
                <span className="text-muted-foreground">I am a </span>
                <Typing words={["Python Developer", "PHP Developer", "JS Developer"]} />
              </div>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A quiet builder from Bangladesh 🇧🇩 — currently <LiveAge /> years old.
                I write code the way some people write letters: carefully, slowly, and with intent.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.85_0.18_200)] to-[oklch(0.72_0.25_330)] px-5 py-3 text-sm font-semibold text-background glow-cyan transition hover:scale-[1.02]"
                >
                  See my work
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#story"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium hover:bg-foreground/10"
                >
                  Read my story
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square w-[78%] max-w-md md:w-full">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[oklch(0.85_0.18_200)] via-[oklch(0.72_0.25_330)] to-[oklch(0.65_0.24_290)] opacity-30 blur-3xl" />
              <div className="neon-border animate-float relative overflow-hidden rounded-[2rem] glow-magenta">
                <img
                  src={profileImg}
                  alt="Portrait of Abir Arafat Chawdhury"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />} text="About" />
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
              Self-taught. <span className="text-gradient">Self-driven.</span> Still <AgeYears />.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: <MapPin className="h-5 w-5" />, title: "Bangladesh 🇧🇩", body: "Born and rooted in Faridpur — building from a small place with a big window." },
              { icon: <GraduationCap className="h-5 w-5" />, title: "HSC 2027", body: "Govt. Yeasin College, Faridpur. Science group. Studying by day, shipping by night." },
              { icon: <Code2 className="h-5 w-5" />, title: "Polyglot dev", body: "Python, PHP, JavaScript. Open-source tools, small libraries, real problems." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="glass relative h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:bg-foreground/[0.07]">
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[oklch(0.85_0.18_200/0.2)] to-[oklch(0.72_0.25_330/0.2)] p-2.5 text-foreground">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel icon={<Code2 className="h-3.5 w-3.5" />} text="Projects" />
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Things I&apos;ve <span className="text-gradient">built</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Open-source experiments — each one a small attempt to leave the web a little better.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group neon-border relative block h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.22_0.04_280/0.6)] to-[oklch(0.16_0.03_270/0.6)] p-6 transition hover:-translate-y-1.5 hover:glow-cyan"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[oklch(0.72_0.25_330)] opacity-0 blur-3xl transition group-hover:opacity-30" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-border bg-foreground/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {p.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">
                    <span className="text-gradient">{p.name}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Github className="h-3.5 w-3.5" /> View on GitHub
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />} text="Journey" />
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
              <AnimatedWords text="The part I never showed." highlight="showed." />
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <article className="glass mt-10 rounded-2xl p-6 leading-[1.85] text-foreground/90 sm:p-10">
              <p>I was never the loud one.</p>
              <p>Not the one people noticed first. Not the one who could easily express everything inside.</p>
              <p>But I tried — in my own way. I built things. I learned. I stayed quiet… and kept going.</p>
              <p className="mt-4">Somewhere along the way, I lost people I never thought I would lose.</p>
              <p>A best friend… gone. Someone I cared about deeply… gone.</p>
              <p>And maybe the hardest part — I slowly started losing parts of myself too.</p>
              <p className="text-muted-foreground">My confidence. My creativity. My voice.</p>
              <p className="mt-6 text-gradient text-xl font-semibold">Still—</p>
              <p>I never chose to hurt anyone. I never chose to become bitter.</p>
              <p>And maybe that&apos;s the only thing I&apos;m still proud of.</p>
              <p className="mt-4 font-semibold">I&apos;m still here. Still building. Still trying.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="life" className="relative px-4 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.72_0.25_330/0.18)] blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel icon={<BookOpen className="h-3.5 w-3.5" />} text="My Life Story" />
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Chapters of a <span className="text-gradient">quiet boy</span> from Faridpur.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Not a highlight reel. Just the truth — written slowly, the same way I learned to live.
            </p>
          </Reveal>

          <div className="mt-14 space-y-10">
            {chapters.map((ch, i) => {
              const Icon = ch.Icon;
              return (
                <Reveal key={ch.n} delay={i * 80}>
                  <div className="glass group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 sm:p-8">
                    <div className="font-chapter pointer-events-none absolute -right-6 -top-8 text-[6.5rem] font-bold leading-none text-foreground/[0.05] transition group-hover:text-foreground/[0.09]">
                      {String(ch.n).padStart(2, "0")}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.85_0.18_200/0.25)] to-[oklch(0.72_0.25_330/0.25)] text-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-chapter text-lg italic text-foreground/85 sm:text-xl">
                        Chapter {ch.n}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <h3 className="mt-4 text-xl font-bold sm:text-2xl">
                      <span className="text-gradient">{ch.title}</span>
                    </h3>
                    <p className="mt-3 leading-relaxed text-foreground/85">{ch.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-16">
              <QuoteCarousel interval={1500} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="timeline" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel icon={<GraduationCap className="h-3.5 w-3.5" />} text="Timeline" />
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              A short <span className="text-gradient">walk</span> through years.
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2" />
            <div className="space-y-10">
              {timeline.map((t, i) => {
                const right = i % 2 === 1;
                const Icon = t.Icon;
                return (
                  <Reveal key={i} delay={i * 100}>
                    <div className="relative grid md:grid-cols-2 md:gap-10">
                      <div className={`pl-16 md:pl-0 ${right ? "md:order-2 md:text-left md:pl-10" : "md:text-right md:pr-10"}`}>
                        <div className="glass inline-block rounded-2xl p-5">
                          <div className="font-chapter text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.year}</div>
                          <div className="mt-1 font-semibold">{t.title}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{t.detail}</div>
                        </div>
                      </div>
                      <div className="hidden md:block" />
                      <div className="absolute left-5 top-5 -translate-x-1/2 md:left-1/2">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background glow-cyan">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.85_0.18_200/0.35)] to-[oklch(0.72_0.25_330/0.35)] blur-md" />
                          <Icon className="relative h-4 w-4 text-foreground" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.85_0.18_200/0.12)] via-transparent to-[oklch(0.72_0.25_330/0.12)]" />
              <SectionLabel icon={<Mail className="h-3.5 w-3.5" />} text="Contact" />
              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                Let&apos;s build something <span className="text-gradient">quietly great</span>.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Open to collaborations, mentorship, and conversations about code, life, and everything in between.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.85_0.18_200)] to-[oklch(0.72_0.25_330)] px-5 py-3 text-sm font-semibold text-background glow-magenta hover:scale-[1.02]"
                >
                  <Github className="h-4 w-4" /> @abirxdhack
                </a>
                <a
                  href="https://t.me/TheSmartDev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-5 py-3 text-sm font-medium hover:bg-foreground/10"
                >
                  <Send className="h-4 w-4" /> t.me/TheSmartDev
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="relative mt-10 border-t border-border px-4 py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[oklch(0.72_0.25_330/0.08)] to-transparent" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                aria-label={s.label}
                className="glass group inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:-translate-y-1 hover:glow-cyan"
              >
                <s.icon className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-sm text-foreground/90">
              Built with passion and innovation by{" "}
              <span className="text-gradient font-semibold">Abir Arafat Chawdhury</span>
              <Heart className="h-3.5 w-3.5 fill-[oklch(0.72_0.25_330)] text-[oklch(0.72_0.25_330)]" /> 🇧🇩
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Join our thriving developer community:{" "}
              <a
                href="https://t.me/TheSmartDev"
                target="_blank"
                rel="noreferrer"
                className="text-gradient font-mono font-semibold hover:underline"
              >
                t.me/TheSmartDev
              </a>
            </p>
          </div>

          <div className="mx-auto mt-8 h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Abir Arafat Chawdhury. All Rights Reserved. · Engineered with Excellence
          </p>
        </div>
      </footer>
    </main>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-3 py-1 font-chapter text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
      {icon} {text}
    </div>
  );
}
