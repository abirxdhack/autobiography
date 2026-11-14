export const ROOT = new URL("../../../", import.meta.url);

export const GITHUB_USER = "abirxdhack";

export const VISITS_API = {
  url: "https://hjvmipnnqcxtebjfonec.supabase.co",
  key: "sb_publishable_J4O768wpEiXoL6QahBrebw_8coKhesV",
};

export const IS_LOCAL = ["localhost", "127.0.0.1", "[::1]", ""].includes(location.hostname);

export function siteUrl(path = "") {
  return new URL(path, ROOT).href;
}

export function sitePath() {
  const root = ROOT.pathname;
  let path = location.pathname;
  if (path.startsWith(root)) path = "/" + path.slice(root.length);
  path = path.replace(/index\.html$/, "").replace(/\/+$/, "");
  return path || "/";
}
