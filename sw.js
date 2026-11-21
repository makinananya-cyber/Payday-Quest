/* Offline support. Online: always loads the newest files and saves a copy. Offline: uses the saved copy. */
const CACHE = "payday-quest-v2";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png",
  "js/data-learn-1.js", "js/data-learn-2.js", "js/data-learn-3.js", "js/data-extra.js", "js/core.js", "js/install.js", "js/learn.js", "js/games.js", "js/sim.js", "js/progress.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === location.origin, font = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!same && !font) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    if (font) { const hit = await c.match(req); if (hit) return hit; const r = await fetch(req); c.put(req, r.clone()); return r; }
    try { const r = await fetch(req, { cache: "no-cache" }); if (r.ok) c.put(req, r.clone()); return r; }
    catch (err) { return (await c.match(req, { ignoreSearch: true })) || (req.mode === "navigate" ? c.match("index.html") : Response.error()); }
  }));
});
