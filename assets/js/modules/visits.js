import { $, animateNumber, fmt } from "./dom.js";
import { icon } from "./icons.js";
import { changePercent, fetchStats } from "./visits-api.js";

const REFETCH_INTERVAL = 60000;
const STALE_TIME = 20000;
const RETRY_DELAYS = [1000, 2000, 4000];
const W = 600;
const H = 220;

const shown = new Map();
let board = null;
let meta = null;
let refreshIcon = null;
let data = null;
let dataJson = "";
let updatedAt = 0;
let fetching = false;
let activeDay = null;
let pending = null;

function countUp(el) {
  const key = el.dataset.countKey;
  const target = Number(el.dataset.countTo);
  const from = shown.get(key) ?? 0;
  animateNumber(from, target, 900, (value) => {
    shown.set(key, value);
    el.textContent = fmt(value);
  });
}

function cardHead(title, sub) {
  return `<div><h3 class="text-[0.98rem] font-extrabold text-fg">${title}</h3><p class="mt-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-fg-dim">${sub}</p></div>`;
}

function trend(change, onAccent) {
  if (change === null) return "";
  const name = change > 0 ? "trending-up" : change < 0 ? "trending-down" : "minus";
  const tone = onAccent ? "text-accent-foreground" : change > 0 ? "text-accent" : "text-fg-dim";
  return `<span class="inline-flex items-center gap-1 text-[0.72rem] font-extrabold ${tone}">${icon(name, { size: 13 })} ${change > 0 ? "+" : ""}${change}%</span>`;
}

function statCard({ key, iconName, label, value, note, change = null, highlight = false }) {
  return `<article class="${highlight ? "insight-card is-highlight" : "insight-card"}">
    <div class="flex items-start justify-between gap-2">
      <p class="text-[0.74rem] font-bold ${highlight ? "text-accent-foreground/85" : "text-fg-muted"}">${label}</p>
      <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full ${highlight ? "bg-accent-foreground/15 text-accent-foreground" : "bg-accent/10 text-accent"}">${icon(iconName, { size: 15 })}</span>
    </div>
    <div class="mt-3 flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
      <p data-count-key="${key}" data-count-to="${value}" class="text-[clamp(1.6rem,4.2vw,2.15rem)] font-black leading-none tabular-nums ${highlight ? "text-accent-foreground" : "text-fg"}">${fmt(shown.get(key) ?? 0)}</p>
      ${trend(change, highlight)}
    </div>
    <p class="mt-2 text-[0.7rem] ${highlight ? "text-accent-foreground/80" : "text-fg-dim"}">${note}</p>
  </article>`;
}

function miniMetric(label, value) {
  return `<div class="min-w-[8rem]"><dt class="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-fg-dim">${label}</dt><dd class="mt-1 text-[1.15rem] font-black leading-none text-fg tabular-nums">${value}</dd></div>`;
}

function smoothPath(pts, floor) {
  if (!pts.length) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = Math.min(floor, p1.y + (p2.y - p0.y) / 6);
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = Math.min(floor, p2.y - (p3.y - p1.y) / 6);
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function niceMax(n) {
  if (n <= 4) return 4;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s * 4 >= n) ?? pow * 10;
  return step * 4;
}

function dayLabel(day, style) {
  const options = style === "short" ? { weekday: "short" } : { weekday: "long", month: "short", day: "numeric" };
  return new Date(`${day}T00:00:00`).toLocaleDateString("en-US", options);
}

function chartPoints(daily) {
  const max = niceMax(Math.max(0, ...daily.map((d) => d.visits)));
  const pts = daily.map((d, i) => ({ x: daily.length > 1 ? (i / (daily.length - 1)) * W : W / 2, y: H - (d.visits / max) * (H - 16) - 4 }));
  return { max, pts };
}

function trafficChart(daily, active) {
  const { max, pts } = chartPoints(daily);
  const line = smoothPath(pts, H - 4);
  const area = pts.length ? `${line} L ${W} ${H} L 0 ${H} Z` : "";
  const cur = daily[active];
  const curPt = pts[active];
  const grid = [0, 1, 2, 3, 4].map((k) => `<line x1="0" x2="${W}" y1="${(H / 4) * k}" y2="${(H / 4) * k}" stroke="var(--border)" stroke-dasharray="4 6" vector-effect="non-scaling-stroke"></line>`).join("");
  const dots = pts
    .map((p, i) => `<button type="button" data-chart-dot="${i}" aria-label="${daily[i] ? dayLabel(daily[i].day, "long") : ""}: ${fmt(daily[i]?.visits ?? 0)} visits" class="${i === active ? "chart-dot is-active" : "chart-dot"}" style="left: ${(p.x / W) * 100}%; top: ${(p.y / H) * 100}%"></button>`)
    .join("");
  const tip = cur && curPt ? `<div data-chart-tip class="chart-tip" style="left: clamp(3.4rem, ${(curPt.x / W) * 100}%, calc(100% - 3.4rem)); top: ${(curPt.y / H) * 100}%"><span class="block text-[1rem] font-black leading-none tabular-nums">${fmt(cur.visits)}</span><span class="mt-1 block whitespace-nowrap text-[0.6rem] opacity-80">${dayLabel(cur.day, "long")}</span></div>` : "";
  const cursor = curPt ? `<line data-chart-cursor x1="${curPt.x}" x2="${curPt.x}" y1="${curPt.y}" y2="${H}" stroke="var(--accent)" stroke-opacity="0.45" vector-effect="non-scaling-stroke"></line>` : "";
  return `<div data-chart class="flex min-w-0 gap-2">
    <div class="flex h-[200px] flex-col justify-between pb-6 text-right sm:h-[230px] lg:h-[264px] font-mono text-[0.62rem] text-fg-dim">${[4, 3, 2, 1, 0].map((k) => `<span>${fmt((max / 4) * k)}</span>`).join("")}</div>
    <div class="relative min-w-0 flex-1">
      <div class="relative h-[176px] sm:h-[206px] lg:h-[240px]">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs><linearGradient id="visits-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.32"></stop><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"></stop></linearGradient></defs>
          ${grid}${cursor}
          <path d="${area}" fill="url(#visits-fill)"></path>
          <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke"></path>
        </svg>
        ${dots}${tip}
      </div>
      <div class="mt-2 flex justify-between font-mono text-[0.62rem] text-fg-dim">${daily.map((d, i) => `<span data-chart-label="${i}"${i === active ? ' class="font-bold text-accent"' : ""}>${i === daily.length - 1 ? "Today" : dayLabel(d.day, "short")}</span>`).join("")}</div>
    </div>
  </div>`;
}

function setActiveDay(chart, daily, index) {
  if (index === activeDay) return;
  activeDay = index;
  const { pts } = chartPoints(daily);
  const p = pts[index];
  const d = daily[index];
  chart.querySelectorAll("[data-chart-dot]").forEach((dot) => dot.classList.toggle("is-active", Number(dot.dataset.chartDot) === index));
  chart.querySelectorAll("[data-chart-label]").forEach((label) => {
    const on = Number(label.dataset.chartLabel) === index;
    label.classList.toggle("font-bold", on);
    label.classList.toggle("text-accent", on);
  });
  const cursor = chart.querySelector("[data-chart-cursor]");
  if (cursor) {
    cursor.setAttribute("x1", p.x);
    cursor.setAttribute("x2", p.x);
    cursor.setAttribute("y1", p.y);
  }
  const tip = chart.querySelector("[data-chart-tip]");
  if (tip) {
    tip.style.left = `clamp(3.4rem, ${(p.x / W) * 100}%, calc(100% - 3.4rem))`;
    tip.style.top = `${(p.y / H) * 100}%`;
    tip.innerHTML = `<span class="block text-[1rem] font-black leading-none tabular-nums">${fmt(d.visits)}</span><span class="mt-1 block whitespace-nowrap text-[0.6rem] opacity-80">${dayLabel(d.day, "long")}</span>`;
  }
}

function deviceCard(devices) {
  const total = devices.mobile + devices.tablet + devices.desktop;
  const items = [
    { key: "mobile", label: "Mobile", iconName: "smartphone", value: devices.mobile, color: "var(--accent)" },
    { key: "tablet", label: "Tablet", iconName: "tablet", value: devices.tablet, color: "color-mix(in oklab, var(--accent) 45%, var(--fg))" },
    { key: "desktop", label: "Desktop", iconName: "monitor", value: devices.desktop, color: "var(--fg-dim)" },
  ];
  const R = 42;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const segments = total > 0
    ? items
        .map((it) => {
          const len = (it.value / total) * C;
          const seg = `<circle cx="50" cy="50" r="${R}" fill="none" stroke="${it.color}" stroke-width="11" stroke-dasharray="${Math.max(0, len - (it.value ? 1.2 : 0))} ${C}" stroke-dashoffset="${-offset}" class="donut-seg"></circle>`;
          offset += len;
          return seg;
        })
        .join("")
    : "";
  return `<article class="insight-card flex h-full flex-col">
    ${cardHead("Visitors by Device", "Phone, tablet &amp; laptop")}
    <div class="relative mx-auto my-5 aspect-square w-full max-w-[170px] sm:max-w-[200px]">
      <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" aria-hidden="true"><circle cx="50" cy="50" r="${R}" fill="none" stroke="var(--border)" stroke-width="11"></circle>${segments}</svg>
      <div class="absolute inset-0 grid place-items-center text-center"><div><p data-count-key="devices-total" data-count-to="${total}" class="text-[1.7rem] font-black leading-none text-fg tabular-nums">${fmt(shown.get("devices-total") ?? 0)}</p><p class="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-fg-dim">Visits</p></div></div>
    </div>
    <div class="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
      ${items.map((it) => `<div><p class="text-[1.15rem] font-black leading-none text-fg tabular-nums">${fmt(it.value)}</p><p class="mt-1.5 inline-flex items-center gap-1 text-[0.68rem] font-bold text-fg-muted"><span class="h-2 w-2 rounded-full" style="background: ${it.color}" aria-hidden="true"></span>${icon(it.iconName, { size: 12, className: "hidden sm:inline" })} ${it.label}</p></div>`).join("")}
    </div>
  </article>`;
}

function audienceCard(stats) {
  const returningPct = stats.uniqueTotal ? Math.round((stats.returningVisitors / stats.uniqueTotal) * 100) : 0;
  return `<article class="insight-card h-full">
    ${cardHead("Readers Coming Back", "New and returning visitors")}
    <div class="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
      <div class="insight-chip-block">
        <div class="flex items-center gap-2 text-[0.72rem] font-bold">${icon("user-plus", { size: 14 })} New today</div>
        <p class="mt-1 text-[1.5rem] font-black leading-none tabular-nums">${fmt(stats.newToday)}</p>
        <div class="my-3 h-px bg-accent-foreground/25"></div>
        <div class="flex items-center gap-2 text-[0.72rem] font-bold">${icon("repeat", { size: 14 })} Returning</div>
        <p class="mt-1 text-[1.5rem] font-black leading-none tabular-nums">${returningPct}%</p>
      </div>
      <p class="text-[0.84rem] leading-[1.65] text-fg-muted"><span class="font-bold text-fg">${fmt(stats.returningVisitors)}</span> of <span class="font-bold text-fg">${fmt(stats.uniqueTotal)}</span> visitors came back on another day to keep reading.</p>
    </div>
  </article>`;
}

function pagesCard(pages) {
  const items = [
    { label: "Home", iconName: "house", value: pages.home },
    { label: "Public Speaking", iconName: "mic", value: pages.publicSpeaking },
    { label: "The Silence", iconName: "moon", value: pages.theSilence },
    { label: "Unseen Battles", iconName: "heart-pulse", value: pages.battles },
    { label: "Story Library &amp; Other Stories", iconName: "library-big", value: pages.library, wide: true },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  return `<article class="insight-card h-full">
    ${cardHead("Most Read Pages", "Share of all visits")}
    <div class="mt-4 grid gap-3 sm:grid-cols-2">
      ${items
        .map((it) => {
          const pct = total ? Math.round((it.value / total) * 100) : 0;
          return `<div class="rounded-[10px] border border-border bg-bg/50 p-3 ${it.wide ? "sm:col-span-2" : ""}"><div class="flex items-center justify-between gap-2"><span class="inline-flex min-w-0 items-center gap-2 text-[0.8rem] font-bold text-fg"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">${icon(it.iconName, { size: 13 })}</span><span class="truncate">${it.label}</span></span><span class="font-mono text-[0.72rem] font-bold text-fg-dim">${pct}%</span></div><div class="mt-2.5 h-1.5 overflow-hidden rounded-full bg-accent/10"><div class="h-full rounded-full bg-accent transition-[width] duration-700" style="width: ${Math.max(pct, it.value ? 3 : 0)}%"></div></div><p class="mt-1.5 text-[0.68rem] text-fg-dim">${fmt(it.value)} ${it.value === 1 ? "visit" : "visits"}</p></div>`;
        })
        .join("")}
    </div>
  </article>`;
}

function boardMarkup(stats) {
  const avgRaw = stats.daily.length ? stats.daily.reduce((s, d) => s + d.visits, 0) / stats.daily.length : 0;
  const avg = avgRaw >= 10 ? fmt(Math.round(avgRaw)) : avgRaw.toFixed(1).replace(/\.0$/, "");
  return `<div class="space-y-3 sm:space-y-4">
    <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${statCard({ key: "total", iconName: "eye", label: "Total Visits", value: stats.total, note: `+${fmt(stats.thisWeek)} this week`, highlight: true })}
      ${statCard({ key: "today", iconName: "calendar-days", label: "Today", value: stats.today, change: changePercent(stats.today, stats.yesterday), note: `${fmt(stats.yesterday)} yesterday` })}
      ${statCard({ key: "unique", iconName: "users", label: "Unique Visitors", value: stats.uniqueTotal, note: `${fmt(stats.uniqueToday)} today` })}
      ${statCard({ key: "week", iconName: "trending-up", label: "This Week", value: stats.thisWeek, change: changePercent(stats.thisWeek, stats.lastWeek), note: `${fmt(stats.lastWeek)} last week` })}
    </div>
    <div class="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
      <article class="insight-card md:col-span-2 lg:col-span-8">
        ${cardHead("Visits, Last 7 Days", "Daily page views")}
        <div class="mt-4 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          ${trafficChart(stats.daily, activeDay)}
          <dl class="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4 md:border-l md:border-border md:pl-5">
            ${miniMetric("Unique today", fmt(stats.uniqueToday))}
            ${miniMetric("New today", fmt(stats.newToday))}
            ${miniMetric("Returning visitors", fmt(stats.returningVisitors))}
            ${miniMetric("Average per day", avg)}
          </dl>
        </div>
      </article>
      <div class="lg:col-span-4">${deviceCard(stats.devices)}</div>
      <div class="lg:col-span-5">${audienceCard(stats)}</div>
      <div class="md:col-span-2 lg:col-span-7">${pagesCard(stats.pages)}</div>
    </div>
  </div>`;
}

function renderBoard() {
  if (activeDay === null || activeDay >= data.daily.length) activeDay = data.daily.length - 1;
  board.innerHTML = boardMarkup(data);
  board.querySelectorAll("[data-count-key]").forEach(countUp);
  const chart = board.querySelector("[data-chart]");
  const daily = data.daily;
  chart.querySelectorAll("[data-chart-dot]").forEach((dot) => {
    const index = Number(dot.dataset.chartDot);
    const select = () => setActiveDay(chart, daily, index);
    dot.addEventListener("click", select);
    dot.addEventListener("mouseenter", select);
    dot.addEventListener("focus", select);
  });
}

function renderError() {
  data = null;
  dataJson = "";
  shown.clear();
  board.innerHTML = `<div class="grid min-h-[260px] place-items-center p-6 text-center"><div><p class="text-[1rem] font-bold text-fg">Visitor numbers are unavailable right now.</p><button type="button" data-visits-retry class="btn-ghost mt-4">${icon("refresh-cw", { size: 14 })} Try again</button></div></div>`;
}

function renderMeta() {
  refreshIcon.classList.toggle("animate-spin", fetching);
  let stamp = meta.querySelector("[data-visits-updated]");
  if (!updatedAt) return;
  const text = `Updated ${new Date(updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  if (!stamp) {
    meta.insertAdjacentHTML("afterbegin", '<span data-visits-updated class="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-dim"></span>');
    stamp = meta.firstElementChild;
  }
  stamp.textContent = text;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadWithRetry() {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await fetchStats();
    } catch (error) {
      if (attempt >= RETRY_DELAYS.length) throw error;
      await wait(RETRY_DELAYS[attempt]);
    }
  }
}

export function refreshVisits(force = false) {
  if (!board) return Promise.resolve();
  if (pending) return force ? pending.then(() => refreshVisits()) : pending;
  fetching = true;
  renderMeta();
  pending = loadWithRetry()
    .then((stats) => {
      updatedAt = Date.now();
      const json = JSON.stringify(stats);
      if (json !== dataJson) {
        data = stats;
        dataJson = json;
        renderBoard();
      }
    })
    .catch(() => renderError())
    .finally(() => {
      fetching = false;
      pending = null;
      renderMeta();
    });
  return pending;
}

export function initVisits() {
  const section = document.getElementById("visits");
  if (!section) return;
  board = $("[data-visits-board]", section);
  meta = $("[data-visits-meta]", section);
  const refresh = $("[data-visits-refresh]", section);
  refreshIcon = refresh.querySelector("svg");
  refresh.addEventListener("click", () => refreshVisits());
  board.addEventListener("click", (event) => {
    if (event.target.closest("[data-visits-retry]")) refreshVisits();
  });
  setInterval(() => {
    if (document.visibilityState === "visible") refreshVisits();
  }, REFETCH_INTERVAL);
  const refetchIfStale = () => {
    if (document.visibilityState === "visible" && Date.now() - updatedAt > STALE_TIME) refreshVisits();
  };
  window.addEventListener("focus", refetchIfStale);
  document.addEventListener("visibilitychange", refetchIfStale);
  refreshVisits();
}
