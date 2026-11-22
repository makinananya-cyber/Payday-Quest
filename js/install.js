/* Install as an app: home-screen button, prompt handling and step-by-step help. */
(function () {
"use strict";
const PQ = window.PQ;
const SITE = "https://makinananya-cyber.github.io/Payday-Quest/";
let deferred = null;
const MODES = ["standalone", "fullscreen", "minimal-ui", "window-controls-overlay"];
const inApp_ = () => MODES.some(m => matchMedia(`(display-mode: ${m})`).matches) || navigator.standalone === true || document.referrer.startsWith("android-app://");
/* installedElsewhere: the app is installed on this device but we're in a normal browser tab.
   Buttons stay visible there and switch to "Open the app". They are only hidden inside the app itself. */
let installedElsewhere = false;
const standalone = () => inApp_();
if (inApp_()) document.documentElement.classList.add("pq-app");
MODES.forEach(m => { try { matchMedia(`(display-mode: ${m})`).addEventListener("change", () => { if (inApp_()) document.documentElement.classList.add("pq-app"); refresh(); }); } catch (e) {} });
/* Chrome (Android, Windows, Mac) can tell us when the app is already installed */
if (navigator.getInstalledRelatedApps) navigator.getInstalledRelatedApps().then(apps => { if (apps && apps.length) { installedElsewhere = true; refresh(); } }).catch(() => {});
const ua = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const onSite = /github\.io$/.test(location.hostname) || location.hostname === "localhost";

addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; });
addEventListener("appinstalled", () => { deferred = null; installedElsewhere = true; refresh(); PQ.toast && PQ.toast("<b>Installed!</b> Find Payday Quest on your home screen"); });

const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M12 7v7M9 11l3 3 3-3M10 18h4"/></svg>';
PQ.ICON.install = PHONE;

const inApp = /FBAN|FBAV|Instagram|Snapchat|TikTok|musical_ly|BytedanceWebview|Line\/|Twitter|Pinterest/i.test(ua);
const browser = /SamsungBrowser/.test(ua) ? "samsung" : /EdgA|EdgiOS|Edg\//.test(ua) ? "edge" : /FxiOS|Firefox/.test(ua) ? "firefox" : /CriOS|Chrome/.test(ua) ? "chrome" : /Safari/.test(ua) ? "safari" : "other";
const isMac = /Macintosh/.test(ua) && !isIOS;

function openSteps() {
  const where = isAndroid || isIOS ? "your home screen or app list" : isMac ? "Launchpad, your Dock or the Applications folder" : "the Start menu, your taskbar or desktop";
  const list = [`Open <b>Payday Quest</b> from ${where}.`];
  if (!isAndroid && !isIOS && (browser === "chrome" || browser === "edge")) list.unshift("Click the <b>Open in app</b> icon at the right end of the address bar (a screen with an arrow), or");
  list.push("Want to install it again? Remove the app first, then come back here and click this button.");
  return { title: "Payday Quest is already installed", intro: "This device already has the app. To open it:", list };
}

function steps() {
  if (installedElsewhere && onSite) return openSteps();
  if (!onSite) return { title: "Install from the website", intro: "Apps can only be installed from the main website. Open it on your phone, then tap the install button there.", list: [], link: true };
  if (inApp) return { title: "Open in your browser first", intro: "You're viewing this inside another app, which can't add apps to your home screen.", list: ["Tap the <b>⋯</b> or <b>⋮</b> menu in the corner of this screen.", `Choose <b>Open in ${isIOS ? "Safari" : "browser"}</b> (or <b>Open in external browser</b>).`, "Tap <b>Get app</b> again on the website."], link: true };
  if (isIOS) return { title: "Add to your iPhone or iPad", intro: browser === "safari" ? "In Safari:" : "In this browser (needs iOS 16.4 or newer; on older versions, use Safari):",
    list: [browser === "safari" ? "Tap the <b>Share</b> button (the square with an arrow pointing up) at the bottom or top of the screen." : "Tap the <b>Share</b> button (the square with an arrow pointing up). In Chrome it's at the right of the address bar; in other browsers check the <b>⋯</b> menu.", "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. Payday Quest now has its own icon."] };
  if (isAndroid) {
    if (browser === "samsung") return { title: "Add to your Android phone", intro: "In Samsung Internet:", list: ["Tap the <b>≡</b> menu at the bottom right.", "Tap <b>Add page to</b>, then <b>Home screen</b>.", "Tap <b>Add</b>. Payday Quest now has its own icon."] };
    if (browser === "firefox") return { title: "Add to your Android phone", intro: "In Firefox:", list: ["Tap the <b>⋮</b> menu.", "Tap <b>Install</b> or <b>Add to Home screen</b>.", "Tap <b>Add</b>. Payday Quest now has its own icon."] };
    return { title: "Add to your Android phone", intro: browser === "edge" ? "In Edge:" : "In Chrome:", list: [browser === "edge" ? "Tap the <b>⋯</b> menu at the bottom." : "Tap the <b>⋮</b> menu in the top-right corner.", "Tap <b>Install app</b> or <b>Add to Home screen</b>.", "Tap <b>Install</b>. Payday Quest now has its own icon."] };
  }
  if (isMac && browser === "safari") return { title: "Add to your Mac", intro: "In Safari (macOS Sonoma or newer):", list: ["Click <b>File</b> in the menu bar.", "Click <b>Add to Dock</b>.", "Click <b>Add</b>. Payday Quest opens from your Dock like an app."] };
  if (browser === "firefox") return { title: "Install on this computer", intro: "Firefox on computers can't install web apps. You can:", list: ["Open this site in <b>Chrome</b>, <b>Edge</b> or <b>Safari</b> and click install, or", "Bookmark it with <b>Ctrl+D</b> (<b>⌘+D</b> on Mac).", "On a phone? Open this website there and tap <b>Get app</b>."] };
  return { title: "Install on this computer", intro: browser === "edge" ? "In Edge:" : "In Chrome:", list: ["Click the <b>install icon</b> at the right end of the address bar (a screen with a down arrow), or open the <b>⋮</b> menu and choose <b>Install Payday Quest</b>.", "Click <b>Install</b>.", "On a phone? Open this website there and tap <b>Get app</b>."] };
}

function modal() {
  const s = steps();
  const m = document.createElement("div");
  m.className = "inst-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", s.title);
  m.innerHTML = `<div class="inst-box pop-in"><button class="xbtn inst-x" type="button" aria-label="Close">${PQ.ICON.close}</button>
    <div class="inst-ico"><img src="icons/icon-192.png" alt="" width="64" height="64" onerror="this.replaceWith(Object.assign(document.createElement('span'),{innerHTML:PQ.ICON.install}))"></div>
    <h2>${s.title}</h2><p class="muted">${s.intro}</p>
    ${s.list.length ? `<ol class="inst-steps">${s.list.map(x => `<li>${x}</li>`).join("")}</ol>` : ""}
    ${s.link ? `<div class="inst-link"><code>${SITE}</code><button class="btn btn-soft btn-sm" type="button" id="instCopy">Copy link</button></div><a class="btn btn-primary" href="${SITE}" target="_blank" rel="noopener">Open the website ${PQ.ICON.arrow}</a>` : ""}
    <p class="muted" style="font-size:.85rem">The app is free, works offline, and keeps your progress on your device.</p></div>`;
  document.body.appendChild(m);
  const close = () => { m.remove(); removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") close(); };
  addEventListener("keydown", esc);
  m.onclick = e => { if (e.target === m) close(); };
  m.querySelector(".inst-x").onclick = close; m.querySelector(".inst-x").focus();
  const cp = m.querySelector("#instCopy");
  if (cp) cp.onclick = () => { navigator.clipboard.writeText(SITE).then(() => { cp.textContent = "Copied"; }, () => { const c = m.querySelector("code"); const r = document.createRange(); r.selectNodeContents(c); getSelection().removeAllRanges(); getSelection().addRange(r); }); };
}

PQ.install = async () => {
  if (deferred) { deferred.prompt(); const r = await deferred.userChoice; deferred = null; if (r.outcome === "accepted") return; }
  modal();
};

const TXT = {
  get: { side: "Add to Home Screen", top: "Get app", h: "Get Payday Quest on your home screen", p: "Open it like any other app, full screen and even offline.", btn: "Add to Home Screen" },
  open: { side: "Open the app", top: "Open app", h: "You have the Payday Quest app", p: "It's installed on this device. Open it for full screen and offline use.", btn: "Open the app" }
};
PQ.installCard = () => { const t = TXT[installedElsewhere ? "open" : "get"]; return standalone() ? "" : `<div class="card install-card"><div class="inst-ico"><img src="icons/icon-192.png" alt="" width="56" height="56" onerror="this.replaceWith(Object.assign(document.createElement('span'),{innerHTML:PQ.ICON.install}))"></div><div><p class="label">Free app</p><h3 style="margin-top:2px" data-t="h">${t.h}</h3><p class="muted" style="font-size:.93rem" data-t="p">${t.p}</p></div><button class="btn btn-primary" type="button" data-install>${PHONE} <span data-t="btn">${t.btn}</span></button></div>`; };

function refresh() {
  const hide = standalone(), t = TXT[installedElsewhere ? "open" : "get"];
  document.querySelectorAll(".inst-btn, .install-card").forEach(el => el.hidden = hide);
  document.querySelectorAll(".side .inst-btn span").forEach(el => el.textContent = t.side);
  document.querySelectorAll(".inst-top").forEach(el => { el.lastChild.textContent = t.top; el.setAttribute("aria-label", t.side); });
  document.querySelectorAll(".install-card [data-t]").forEach(el => el.textContent = t[el.dataset.t]);
}
document.addEventListener("click", e => { if (e.target.closest("[data-install]")) PQ.install(); });
addEventListener("DOMContentLoaded", refresh);
addEventListener("hashchange", () => setTimeout(refresh, 0));
PQ.refreshInstall = refresh;
PQ.installInfo = () => ({ chromePromptReady: !!deferred, alreadyInstalled: installedElsewhere, insideApp: standalone() });
addEventListener("pageshow", refresh);
})();
