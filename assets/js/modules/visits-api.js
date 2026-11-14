import { VISITS_API } from "./config.js";

export const TRACKED_PATHS = ["/", "/public-speaking", "/the-silence", "/battles-nobody-sees", "/stories"];

export function isTrackedPath(path) {
  return TRACKED_PATHS.includes(path) || /^\/stories\/[a-z0-9-]{1,80}$/.test(path);
}

export function deviceFromScreen(width, coarsePointer) {
  if (width < 768) return "mobile";
  if (width < 1100 || (coarsePointer && width <= 1366)) return "tablet";
  return "desktop";
}

export function changePercent(current, previous) {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

function rpc(name, body) {
  return fetch(`${VISITS_API.url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { apikey: VISITS_API.key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return res.status === 204 ? null : res.json();
  });
}

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function visitorId() {
  const key = "abir-visitor-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = uuid();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function recordVisit(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (!isTrackedPath(clean)) return false;
  const seenKey = `abir-visit:${clean}`;
  if (sessionStorage.getItem(seenKey)) return false;
  sessionStorage.setItem(seenKey, "1");
  const width = Math.min(window.innerWidth, window.screen.width || window.innerWidth);
  const device = deviceFromScreen(width, window.matchMedia("(pointer: coarse)").matches);
  await rpc("record_visit", { p_visitor: visitorId(), p_path: clean, p_device: device });
  return true;
}

const num = (v) => (typeof v === "number" ? v : Number(v) || 0);

export function parseStats(raw) {
  const r = raw ?? {};
  const devices = r.devices ?? {};
  const pages = r.pages ?? {};
  const daily = Array.isArray(r.daily) ? r.daily : [];
  return {
    total: num(r.total),
    uniqueTotal: num(r.unique_total),
    today: num(r.today),
    yesterday: num(r.yesterday),
    uniqueToday: num(r.unique_today),
    newToday: num(r.new_today),
    thisWeek: num(r.this_week),
    lastWeek: num(r.last_week),
    returningVisitors: num(r.returning_visitors),
    daily: daily.map((d) => ({ day: String(d.day ?? ""), visits: num(d.visits) })),
    devices: { mobile: num(devices.mobile), tablet: num(devices.tablet), desktop: num(devices.desktop) },
    pages: {
      home: num(pages.home),
      publicSpeaking: num(pages.public_speaking),
      theSilence: num(pages.the_silence),
      battles: num(pages.battles),
      library: num(pages.library),
    },
  };
}

export async function fetchStats() {
  return parseStats(await rpc("get_visit_stats", {}));
}
