import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Mail, Phone, MapPin, Send, Sun, Moon, Download,
  Code2, Briefcase, GraduationCap, Award, Rocket, Sparkles,
  Facebook, Instagram, Twitter, Youtube, ExternalLink, Menu, X,
  Palette, Camera, Video, Cpu, Globe,
} from "lucide-react";
import profile from "./assets/profile.png";
import profile2 from "./assets/profile2.png";
import profile3 from "./assets/profile3.png";

const ROLES = [
  "Entrepreneur",
  "Programmer",
  "Full Stack Web Developer",
  "Python Developer",
  "Tech Enthusiast",
  "Freelancer",
  "Founder of Abir X Official Community",
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: "25+", label: "Programming Projects" },
  { value: "40+", label: "Open Source Contributions" },
  { value: "5+", label: "Certifications" },
  { value: "10+", label: "Creative Skills" },
];

const EDUCATION = [
  { title: "Higher Secondary Certificate (HSC)", place: "Government Yasin College, Faridpur", year: "Current — First Year", note: "Science Group" },
  { title: "Secondary School Certificate (SSC)", place: "Sultanpur High School", year: "2025", note: "Science Group · GPA 4.94" },
  { title: "Junior School Certificate (JSC)", place: "Sultanpur High School", year: "2022", note: "GPA 5.00" },
  { title: "Primary School Certificate (PSC)", place: "Khalilpur Government Primary School", year: "2019", note: "GPA 5.00" },
];

const EXPERIENCE = [
  {
    role: "Founder & CEO",
    org: "Abir X Official Community",
    points: ["Community leadership", "Project management", "Technology development", "Innovation and strategy"],
  },
  {
    role: "Freelance Developer",
    org: "Independent Projects",
    points: ["Website development", "Backend & API development", "Automation systems", "Open-source software"],
  },
  {
    role: "Creative Editor",
    org: "Freelance",
    points: ["Professional video editing", "Motion graphics", "Photography & retouching", "Creative content production"],
  },
];

const SKILLS = [
  { group: "Programming", icon: Code2, items: [["Python", 92], ["PHP", 80], ["Java", 72]] },
  { group: "Web Development", icon: Globe, items: [["Frontend", 90], ["Backend", 88], ["Full Stack", 86], ["API Development", 84]] },
  { group: "Creative", icon: Palette, items: [["Video Editing", 88], ["Motion Graphics", 80], ["Premiere Pro", 85], ["Lightroom", 82], ["Photography", 78]] },
  { group: "Professional", icon: Sparkles, items: [["Leadership", 90], ["Entrepreneurship", 88], ["Problem Solving", 92], ["Project Management", 84]] },
];

const SERVICES = [
  { icon: Globe, title: "Custom Website Development", desc: "Modern websites tailored to business needs." },
  { icon: Code2, title: "Full Stack Web Apps", desc: "Complete frontend and backend solutions." },
  { icon: Briefcase, title: "Portfolio Website Design", desc: "Personal and professional portfolios." },
  { icon: Rocket, title: "E-Commerce Development", desc: "Modern online stores and shopping platforms." },
  { icon: Cpu, title: "API Development", desc: "Secure and scalable backend APIs." },
  { icon: Video, title: "Video Editing & Motion Graphics", desc: "Professional video production services." },
  { icon: Camera, title: "Photography & Retouching", desc: "Creative image enhancement and editing." },
  { icon: Palette, title: "Graphic Design", desc: "Creative branding and visual design." },
  { icon: Sparkles, title: "Content Creation", desc: "Digital content and media production." },
];

const PROJECTS = [
  { name: "SmartNoteWeaver", desc: "Automated LaTeX-powered educational note and PDF generation system.", url: "https://github.com/abirxdhack/SmartNoteWeaver", tag: "Python · LaTeX" },
  { name: "TheSmartFaker", desc: "Asynchronous Python library for generating fake addresses for bots and automation.", url: "https://github.com/abirxdhack/TheSmartFaker", tag: "Python · Async" },
  { name: "Smart Web Stream API", desc: "Telegram file streaming and download API built with FastAPI and Telethon.", url: "https://github.com/abirxdhack/FileToLink", tag: "FastAPI · Telethon" },
  { name: "A360API", desc: "Modern asynchronous Python API framework currently under development.", url: "https://github.com/abirxdhack/A360API", tag: "Framework" },
  { name: "GithubBot", desc: "Advanced GitHub integration bot with automation and webhook support.", url: "https://github.com/abirxdhack/GithubBot", tag: "Automation" },
];

const ACHIEVEMENTS = [
  "TESOL Bangladesh Phonetics Certification",
  "PSC GPA 5.00",
  "JSC GPA 5.00",
  "SSC GPA 4.94",
  "Government School Merit Selection",
  "Best Handwriting Winner (6 Times)",
  "Founder of Abir X Official Community",
  "Multiple Open Source Projects Published",
];

const SOCIAL = [
  { icon: Github, href: "https://github.com/TheSmartDevs", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/abirxdhackz", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/abirxdhackz", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/abirxdhackz", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@abirxdhackz", label: "YouTube" },
  { icon: Send, href: "https://t.me/AbirArafatChawdhury", label: "Telegram" },
];

function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function useTyped(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, del ? 40 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-3 md:mx-6 rounded-2xl ${scrolled ? "glass" : ""} flex items-center justify-between px-4 md:px-6 py-3`}>
        <a href="#home" className="font-display text-xl font-bold gradient-text">Abir.</a>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="opacity-75 hover:opacity-100 hover:text-indigo-500 transition">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-full glass hover:scale-110 transition">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={dark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-full glass" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden mx-3 mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="font-medium opacity-80 hover:opacity-100">{n.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const typed = useTyped(ROLES);
  return (
    <section id="home" className="relative pt-32 md:pt-40 overflow-hidden grid-bg">
      <div className="section grid lg:grid-cols-2 gap-12 items-center !py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available for opportunities
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="gradient-text">Abir Arafat<br />Chawdhury</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl font-display h-8">
            I'm a <span className="gradient-text font-semibold">{typed}</span>
            <span className="inline-block w-0.5 h-5 bg-indigo-500 align-middle ml-1 animate-pulse" />
          </p>
          <p className="mt-5 opacity-75 max-w-xl leading-relaxed">
            Entrepreneur, programmer and web developer passionate about creating innovative digital solutions. As founder of Abir X Official Community I focus on building modern technologies, powerful applications and helping bring ideas to life through code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary"><Rocket size={18} /> View Projects</a>
            <a href="#contact" className="btn-ghost"><Mail size={18} /> Contact Me</a>
            <a href="#" className="btn-ghost"><Download size={18} /> Resume</a>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="card text-center !p-4">
                <div className="font-display text-2xl md:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs opacity-70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center">
          <div className="absolute inset-0 blur-3xl opacity-50" style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 60%)" }} />
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ background: "conic-gradient(from 0deg, #6366f1, #a78bfa, #ec4899, #6366f1)" }} />
            <div className="absolute inset-2 rounded-full bg-white dark:bg-[#0a0a14] overflow-hidden">
              <img src={profile} alt="Abir Arafat Chawdhury" className="w-full h-full object-cover" />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-2 -right-2 glass rounded-2xl px-3 py-2 text-xs font-semibold flex items-center gap-2">
              <Cpu size={14} className="text-indigo-500" /> Full Stack
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-2 -left-2 glass rounded-2xl px-3 py-2 text-xs font-semibold flex items-center gap-2">
              <Sparkles size={14} className="text-pink-500" /> Abir X Founder
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">{kicker}</span>
      <h2 className="section-title mt-2">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHeader kicker="About" title="A visionary builder from Bangladesh" />
      <div className="grid lg:grid-cols-3 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="rounded-3xl overflow-hidden card !p-0">
            <img src={profile2} alt="Abir" className="w-full h-[420px] object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-5">
          <p className="text-lg leading-relaxed opacity-85">
            Abir Arafat Chawdhury is a visionary entrepreneur and technology enthusiast from Bangladesh, currently pursuing Higher Secondary education while actively developing software, web applications and digital solutions.
          </p>
          <p className="opacity-75 leading-relaxed">
            His passion lies in programming, web development, automation, technology innovation, video production, photography and entrepreneurship. He aspires to establish his future technology company <span className="font-semibold gradient-text">Abir 360</span>.
          </p>
          <div className="card border-l-4 border-indigo-500">
            <div className="text-xs uppercase tracking-widest opacity-60 mb-2">Mission</div>
            <p className="font-display text-lg md:text-xl">"Building smarter digital solutions that empower people and redefine the future of technology."</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {["Bangladesh", "HSC Student", "Open Source", "Founder", "Freelancer", "Creator"].map((t) => (
              <div key={t} className="glass rounded-xl px-3 py-2 text-sm text-center">{t}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <SectionHeader kicker="Education" title="Academic journey" sub="Consistent academic record across primary, secondary and higher levels." />
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-fuchsia-500/30 to-transparent" />
        <div className="space-y-8">
          {EDUCATION.map((e, i) => (
            <motion.div key={e.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <div className="card inline-block w-full">
                  <div className="text-xs font-semibold gradient-text">{e.year}</div>
                  <h3 className="font-display text-xl font-bold mt-1">{e.title}</h3>
                  <div className="opacity-70 text-sm mt-1">{e.place}</div>
                  <div className="mt-2 text-sm font-medium">{e.note}</div>
                </div>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 ring-4 ring-white dark:ring-[#07070d]" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-10 card">
        <h4 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><Award size={18} className="text-indigo-500" /> Additional Achievements</h4>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm opacity-85">
          <li>• TESOL Bangladesh Phonetics Certificate</li>
          <li>• Selected for Government Faridpur Zilla School (First Division Merit)</li>
          <li>• Best Handwriting Award Winner (6 Times)</li>
          <li>• Strong academic background in Science</li>
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader kicker="Experience" title="My Journey" sub="Extensive practical experience through independent learning, freelancing and open-source development." />
      <div className="grid md:grid-cols-3 gap-6">
        {EXPERIENCE.map((x, i) => (
          <motion.div key={x.role} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white mb-4">
              <Briefcase size={22} />
            </div>
            <h3 className="font-display text-xl font-bold">{x.role}</h3>
            <div className="text-sm gradient-text font-semibold">{x.org}</div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              {x.points.map((p) => <li key={p} className="flex gap-2"><span className="text-indigo-500">▸</span>{p}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader kicker="Skills" title="What I work with" />
      <div className="grid md:grid-cols-2 gap-6">
        {SKILLS.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.group} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{cat.group}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map(([name, val]) => (
                  <div key={String(name)}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{name}</span>
                      <span className="opacity-60">{val}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${val}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#6366f1,#a78bfa,#ec4899)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-8 card">
        <h4 className="font-display text-lg font-bold mb-3">Interests</h4>
        <div className="flex flex-wrap gap-2">
          {["Technology", "Open Source", "Software Development", "Innovation", "Singing", "Digital Creativity", "Content Creation", "Fast Typing"].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full glass text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <SectionHeader kicker="Services" title="What I can build for you" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/15 to-pink-500/15 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="text-sm opacity-70 mt-2">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeader kicker="Projects" title="Featured open source work" sub="A selection of recent projects shipped on GitHub." />
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.a key={p.name} href={p.url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card group block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs gradient-text font-semibold uppercase tracking-wider">{p.tag}</div>
                <h3 className="font-display text-xl font-bold mt-1">{p.name}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white group-hover:rotate-12 transition">
                <Github size={18} />
              </div>
            </div>
            <p className="text-sm opacity-75 mt-3">{p.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-500">
              View on GitHub <ExternalLink size={14} />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-12">
        <SectionHeader kicker="Achievements" title="Highlights" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="card !p-4 flex items-start gap-3">
              <Award size={18} className="text-indigo-500 mt-0.5 shrink-0" />
              <span className="text-sm">{a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="section">
      <div className="card !p-8 md:!p-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">Future Vision</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 max-w-3xl mx-auto">
            Building <span className="gradient-text">Abir 360</span> — a future-focused technology company.
          </h2>
          <p className="opacity-75 mt-4 max-w-2xl mx-auto">
            Dedicated to innovation, software development, artificial intelligence, automation and digital transformation.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ background: "conic-gradient(from 0deg, #6366f1, #a78bfa, #ec4899, #6366f1)" }} />
              <div className="absolute inset-2 rounded-full bg-white dark:bg-[#0a0a14] overflow-hidden">
                <img src={profile3} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeader kicker="Contact" title="Let's work together" sub="Open for freelance projects, collaborations and opportunities." />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "abirxdhackz.info.me@gmail.com", href: "mailto:abirxdhackz.info.me@gmail.com" },
            { icon: Phone, label: "Phone", value: "01728670144", href: "tel:01728670144" },
            { icon: MapPin, label: "Location", value: "Khalilpur Bazar, Faridpur Sadar, Bangladesh" },
            { icon: Globe, label: "Website", value: "abirthetech.serv00.net", href: "https://abirthetech.serv00.net" },
            { icon: Send, label: "Telegram", value: "@iSmartCoder", href: "https://t.me/iSmartCoder" },
          ].map((c) => {
            const Icon = c.icon;
            const Tag: any = c.href ? "a" : "div";
            return (
              <Tag key={c.label} href={c.href} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider opacity-60">{c.label}</div>
                  <div className="font-medium truncate">{c.value}</div>
                </div>
              </Tag>
            );
          })}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:abirxdhackz.info.me@gmail.com"; }} className="card space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider opacity-60">Your name</label>
            <input required className="w-full mt-1 bg-transparent border-b border-black/20 dark:border-white/20 py-2 focus:outline-none focus:border-indigo-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider opacity-60">Email</label>
            <input required type="email" className="w-full mt-1 bg-transparent border-b border-black/20 dark:border-white/20 py-2 focus:outline-none focus:border-indigo-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider opacity-60">Message</label>
            <textarea required rows={5} className="w-full mt-1 bg-transparent border-b border-black/20 dark:border-white/20 py-2 focus:outline-none focus:border-indigo-500 resize-none" placeholder="Tell me about your project..." />
          </div>
          <button type="submit" className="btn-primary w-full justify-center"><Send size={18} /> Send Message</button>
        </form>
      </div>
    </section>
  );
}

function FloatingSocial() {
  return (
    <div className="fixed left-3 md:left-5 bottom-5 z-40 flex flex-col gap-2">
      {SOCIAL.map(({ icon: Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-indigo-500 transition">
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid md:grid-cols-3 gap-6 items-center">
        <div>
          <div className="font-display text-2xl font-bold gradient-text">Abir.</div>
          <p className="text-sm opacity-70 mt-2 max-w-xs">Designed to showcase innovation, creativity and technical excellence.</p>
        </div>
        <div className="flex md:justify-center gap-3 flex-wrap">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-indigo-500 transition">
              <Icon size={16} />
            </a>
          ))}
        </div>
        <div className="text-sm opacity-70 md:text-right">© {new Date().getFullYear()} Abir Arafat Chawdhury. All Rights Reserved.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen">
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Services />
        <Projects />
        <Vision />
        <Contact />
      </main>
      <FloatingSocial />
      <Footer />
    </div>
  );
}
