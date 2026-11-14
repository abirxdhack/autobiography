import { GITHUB_USER } from "./config.js";
import { $, $$, escapeHtml } from "./dom.js";
import { icon } from "./icons.js";

const WIDGET_TIMEOUT = 7000;

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw res.status;
  return res.json();
}

function summarize(repos) {
  const own = repos.filter((r) => !r.fork);
  const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const forks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
  const counts = new Map();
  own.forEach((r) => {
    if (r.language) counts.set(r.language, (counts.get(r.language) || 0) + 1);
  });
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
  const langs = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, c]) => ({ name, pct: Math.round((c / total) * 100) }));
  const featured = [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);
  return { stars, forks, langs, featured };
}

function langMarkup(l) {
  return `<div><div class="mb-1 flex items-center justify-between text-[0.78rem]"><span class="font-bold text-fg">${escapeHtml(l.name)}</span><span class="text-accent">${l.pct}%</span></div><div class="h-2 overflow-hidden rounded-full bg-accent/10"><div class="h-full rounded-full bg-accent" style="width: ${Math.max(l.pct, 4)}%"></div></div></div>`;
}

function repoMarkup(r) {
  return `<a href="${escapeHtml(r.html_url)}" target="_blank" rel="noreferrer" class="group flex min-h-[172px] flex-col rounded-[10px] border border-accent/15 bg-bg/45 p-4 transition hover:-translate-y-1 hover:border-accent/55 hover:bg-bg/75"><div class="flex items-center justify-between gap-3"><span class="min-w-0 truncate text-[0.92rem] font-extrabold text-accent group-hover:underline">${escapeHtml(r.name)}</span><span class="flex shrink-0 items-center gap-1 text-[0.72rem] text-fg-dim">${icon("star", { size: 12 })}${r.stargazers_count}</span></div><p class="mt-3 line-clamp-3 text-[0.77rem] leading-[1.55] text-fg-muted">${escapeHtml(r.description ?? "Open-source repository by Abir Arafat Chawdhury.")}</p><div class="mt-auto flex items-center justify-between gap-2 pt-4 text-[0.68rem] uppercase tracking-[0.16em] text-fg-dim"><span>${escapeHtml(r.language ?? "Code")}</span><span>${r.forks_count} forks</span></div></a>`;
}

function setupWidget(card) {
  const frame = $("[data-gh-frame]", card);
  const img = $("[data-gh-img]", card);
  const overlay = $("[data-gh-overlay]", card);
  if (!frame || !img) return;
  let loaded = false;
  let failed = false;

  const showFallback = () => {
    if (loaded || failed) return;
    failed = true;
    const box = document.createElement("div");
    box.className = "min-h-[190px] rounded-[10px] border border-accent/15 bg-bg/55 p-4";
    box.append(...overlay.childNodes);
    frame.replaceWith(box);
  };

  const markLoaded = () => {
    if (loaded || failed) return;
    loaded = true;
    overlay.remove();
    img.classList.replace("opacity-0", "opacity-100");
  };

  const timer = setTimeout(showFallback, WIDGET_TIMEOUT);
  img.addEventListener("load", () => {
    clearTimeout(timer);
    markLoaded();
  });
  img.addEventListener("error", () => {
    clearTimeout(timer);
    showFallback();
  });
  if (img.complete) {
    clearTimeout(timer);
    if (img.naturalWidth > 0) markLoaded();
    else showFallback();
  }
}

export function initGithub() {
  const section = document.getElementById("github");
  if (!section) return;
  $$("[data-gh-widget]", section).forEach(setupWidget);

  Promise.all([getJson(`https://api.github.com/users/${GITHUB_USER}`), getJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)])
    .then(([profile, repos]) => {
      const stats = summarize(repos);
      $("[data-gh-avatar]", section).src = profile.avatar_url ?? `https://github.com/${GITHUB_USER}.png`;
      $("[data-gh-name]", section).textContent = profile.name ?? "Abir Arafat Chawdhury";
      $("[data-gh-bio]", section).textContent = profile.bio ?? "Entrepreneur, programmer, web developer and open-source builder creating practical software for real users.";
      const values = {
        "Public Repos": profile.public_repos ?? 67,
        Followers: profile.followers ?? 86,
        Following: profile.following ?? 1,
        "Total Stars": stats.stars || 850,
        "Total Forks": stats.forks || 149,
        Since: new Date(profile.created_at).getFullYear(),
      };
      $$("[data-gh-stat]", section).forEach((el) => {
        el.textContent = values[el.dataset.ghStat];
      });
      if (stats.langs.length) {
        $$("[data-gh-langs]", section).forEach((el) => {
          el.innerHTML = stats.langs.map(langMarkup).join("");
        });
      }
      if (stats.featured.length) $("[data-gh-featured]", section).innerHTML = stats.featured.map(repoMarkup).join("");
    })
    .catch(() => {
      $("[data-gh-views]", section).insertAdjacentHTML("afterend", '<p class="mt-3 text-[0.75rem] text-fg-dim">Live API fallback is temporarily limited; README widgets remain active.</p>');
    });
}
