/* Core: state, XP, streaks, badges, router, shared UI helpers, home page. */
(function () {
"use strict";
const PQ = window.PQ;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
PQ.$ = $; PQ.$$ = $$;
PQ.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
PQ.views = {};

/* ---------- lookups ---------- */
PQ.LESSONS = [];
PQ.UNITS.forEach((u, ui) => u.lessons.forEach((l, li) => { l.unit = u; l.ui = ui; l.li = li; PQ.LESSONS.push(l); }));
PQ.lesson = id => PQ.LESSONS.find(l => l.id === id);
PQ.unit = id => PQ.UNITS.find(u => u.id === id);
PQ.inkFor = c => ({ peach: "maroon", orchid: "maroon", pistachio: "forest", matcha: "forest", azure: "deep", indigo: "pistachio" }[c]);

/* ---------- state ---------- */
const KEY = "payday-quest-v2";
const blank = () => ({ xp: 0, cur: "$", goal: 30, days: {}, lessons: {}, badges: {}, seenBadges: {},
  stats: { answered: 0, correct: 0, quizzes: 0, quizPerfect: 0, flash: 0, match: 0, cross: 0, sortPerfect: 0, speedBest: 0, blurts: 0, blurtBest: 0, sims: 0, simBest: 0, planSaved: 0, goalSaved: 0 },
  plan: null, goalPlan: null });
let S = blank();
try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); S = Object.assign(blank(), d); S.stats = Object.assign(blank().stats, d.stats || {}); } } catch (e) {}
PQ.S = () => S;
PQ.save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
PQ.reset = () => { const cur = S.cur, goal = S.goal; S = blank(); S.cur = cur; S.goal = goal; PQ.save(); PQ.renderHud(); };

/* ---------- dates & streak ---------- */
const dkey = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
PQ.today = () => dkey(Date.now());
PQ.dayKey = dkey;
PQ.streak = () => {
  let n = 0, t = new Date(); t.setHours(12, 0, 0, 0);
  if (!(S.days[dkey(t)] > 0)) t.setDate(t.getDate() - 1);
  while (S.days[dkey(t)] > 0) { n++; t.setDate(t.getDate() - 1); }
  return n;
};
PQ.bestStreak = () => {
  const ks = Object.keys(S.days).filter(k => S.days[k] > 0).sort();
  let best = 0, run = 0, prev = null;
  ks.forEach(k => { const d = new Date(k + "T12:00:00"); run = prev && (d - prev) / 864e5 === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; });
  return best;
};
PQ.todayXp = () => S.days[PQ.today()] || 0;

/* ---------- money ---------- */
PQ.fmt = (n, dp) => {
  if (dp == null) dp = Math.abs(n % 1) > 0.001 ? 2 : 0;
  const neg = n < 0; n = Math.abs(n);
  return (neg ? "−" : "") + S.cur + n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};
PQ.money = str => String(str).replace(/\{([\d.]+)\}/g, (_, n) => PQ.fmt(+n));
PQ.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
PQ.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- levels ---------- */
PQ.TITLES = ["Piggy Bank Rookie", "Budget Apprentice", "Smart Saver", "Savings Strategist", "Credit Captain", "Market Explorer", "Wealth Builder", "Money Mentor", "Finance Ace", "Money Master"];
PQ.xpFor = n => 50 * n * (n - 1); // XP needed to reach level n
PQ.level = () => { let n = 1; while (S.xp >= PQ.xpFor(n + 1)) n++; return n; };
PQ.levelTitle = (n = PQ.level()) => PQ.TITLES[Math.min(n - 1, PQ.TITLES.length - 1)];
PQ.levelProgress = () => { const n = PQ.level(), a = PQ.xpFor(n), b = PQ.xpFor(n + 1); return { n, into: S.xp - a, need: b - a, pct: (S.xp - a) / (b - a) * 100 }; };

PQ.addXP = (n, why) => {
  if (n <= 0) return;
  const before = PQ.level(), t = PQ.today(), wasGoal = PQ.todayXp() >= S.goal;
  S.xp += n; S.days[t] = (S.days[t] || 0) + n; PQ.save(); PQ.renderHud();
  const c = $("#cXp"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  PQ.toast(`<b>+${n} XP</b> ${why || ""}`);
  if (!wasGoal && PQ.todayXp() >= S.goal) setTimeout(() => { PQ.toast("<b>Daily goal reached!</b> Streak protected for today"); PQ.confetti(); }, 700);
  if (PQ.level() > before) setTimeout(() => { PQ.toast(`<b>Level ${PQ.level()}</b> You are now a ${PQ.levelTitle()}`); PQ.confetti(); }, 1300);
  PQ.checkBadges();
};
PQ.stat = (k, v, mode) => { if (mode === "max") S.stats[k] = Math.max(S.stats[k] || 0, v); else S.stats[k] = (S.stats[k] || 0) + (v == null ? 1 : v); PQ.save(); PQ.checkBadges(); };

/* ---------- badges ---------- */
const doneCount = () => Object.values(S.lessons).filter(x => x.done).length;
const perfectCount = () => Object.values(S.lessons).filter(x => x.perfect).length;
const unitsDone = () => PQ.UNITS.filter(u => u.lessons.every(l => S.lessons[l.id] && S.lessons[l.id].done)).length;
PQ.BADGES = [
  { g: "Learning", id: "first", t: "First Steps", d: "Finish your first lesson", c: "pistachio", i: "1", p: () => [doneCount(), 1] },
  { g: "Learning", id: "unit", t: "Unit Champion", d: "Complete every lesson in a unit", c: "matcha", i: "U", p: () => [unitsDone(), 1] },
  { g: "Learning", id: "half", t: "Halfway There", d: "Complete 17 lessons", c: "azure", i: "½", p: () => [doneCount(), 17] },
  { g: "Learning", id: "scholar", t: "Scholar", d: "Complete all 34 lessons", c: "indigo", i: "S", p: () => [doneCount(), PQ.LESSONS.length] },
  { g: "Learning", id: "flawless", t: "Flawless", d: "Finish a lesson with no mistakes", c: "peach", i: "A+", p: () => [perfectCount(), 1] },
  { g: "Learning", id: "perfectionist", t: "Perfectionist", d: "Finish 10 lessons with no mistakes", c: "orchid", i: "10", p: () => [perfectCount(), 10] },
  { g: "Streaks & XP", id: "s3", t: "On a Roll", d: "Reach a 3-day streak", c: "peach", i: "3", p: () => [PQ.bestStreak(), 3] },
  { g: "Streaks & XP", id: "s7", t: "Week Warrior", d: "Reach a 7-day streak", c: "orchid", i: "7", p: () => [PQ.bestStreak(), 7] },
  { g: "Streaks & XP", id: "s30", t: "Unstoppable", d: "Reach a 30-day streak", c: "indigo", i: "30", p: () => [PQ.bestStreak(), 30] },
  { g: "Streaks & XP", id: "x500", t: "Rising Star", d: "Earn 500 XP", c: "pistachio", i: "★", p: () => [S.xp, 500] },
  { g: "Streaks & XP", id: "x2000", t: "Money Pro", d: "Earn 2,000 XP", c: "matcha", i: "★★", p: () => [S.xp, 2000] },
  { g: "Streaks & XP", id: "x5000", t: "Legend", d: "Earn 5,000 XP", c: "indigo", i: "♛", p: () => [S.xp, 5000] },
  { g: "Games", id: "quiz", t: "Quiz Whiz", d: "Score 100% on a 10-question quiz", c: "azure", i: "Q", p: () => [S.stats.quizPerfect, 1] },
  { g: "Games", id: "blurt", t: "Blurt Boss", d: "Score 80% or more on a blurt", c: "peach", i: "B", p: () => [S.stats.blurtBest, 80] },
  { g: "Games", id: "flash", t: "Flashcard Fan", d: "Review 100 flashcards", c: "pistachio", i: "F", p: () => [S.stats.flash, 100] },
  { g: "Games", id: "memory", t: "Memory Master", d: "Clear a matching board", c: "orchid", i: "M", p: () => [S.stats.match, 1] },
  { g: "Games", id: "cross", t: "Word Wizard", d: "Solve a crossword", c: "matcha", i: "W", p: () => [S.stats.cross, 1] },
  { g: "Games", id: "sorter", t: "Sorting Hat", d: "Sort a whole set with no mistakes", c: "azure", i: "⇄", p: () => [S.stats.sortPerfect, 1] },
  { g: "Games", id: "speed", t: "Lightning", d: "Score 15+ in the speed round", c: "peach", i: "⚡", p: () => [S.stats.speedBest, 15] },
  { g: "Simulator", id: "life", t: "Life Ready", d: "Finish the life simulator", c: "matcha", i: "L", p: () => [S.stats.sims, 1] },
  { g: "Simulator", id: "health", t: "Financially Fit", d: "Score 80+ financial health in the simulator", c: "indigo", i: "♥", p: () => [S.stats.simBest, 80] },
  { g: "Simulator", id: "planner", t: "The Planner", d: "Save your own budget plan", c: "pistachio", i: "P", p: () => [S.stats.planSaved, 1] },
  { g: "Simulator", id: "goal", t: "Goal Setter", d: "Save a savings goal plan", c: "orchid", i: "G", p: () => [S.stats.goalSaved, 1] }
];
PQ.checkBadges = () => {
  let delay = 900;
  PQ.BADGES.forEach(b => {
    const [cur, max] = b.p();
    if (cur >= max && !S.badges[b.id]) {
      S.badges[b.id] = Date.now(); PQ.save();
      setTimeout(() => { PQ.toast(`<b>Badge unlocked</b> ${b.t}`); PQ.confetti(); }, delay); delay += 1200;
    }
  });
};
const COLORS = { peach: ["#FFC49B", "#7A1E3A"], orchid: ["#F3A5BC", "#7A1E3A"], pistachio: ["#CBE6C7", "#1E3D1F"], matcha: ["#8FB78F", "#1E3D1F"], azure: ["#B4CCCF", "#1B3B4D"], indigo: ["#28536B", "#CBE6C7"] };
PQ.COLORS = COLORS;
PQ.medal = (b, cls = "med") => {
  const [bg, ink] = COLORS[b.c];
  return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 4h10l-6 18h-10z" fill="${ink}" opacity=".55"/><path d="M44 4H34l6 18h10z" fill="${ink}" opacity=".35"/><circle cx="32" cy="38" r="22" fill="${bg}" stroke="${ink}" stroke-width="2.5"/><circle cx="32" cy="38" r="16.5" fill="none" stroke="${ink}" stroke-width="1.2" stroke-dasharray="2 2.6" opacity=".6"/><text x="32" y="44.5" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="${b.i.length > 2 ? 12 : 17}" fill="${ink}">${b.i}</text></svg>`;
};

/* ---------- HUD ---------- */
PQ.renderHud = () => {
  const lp = PQ.levelProgress();
  $("#sLvl").textContent = lp.n; $("#sXp").textContent = S.xp.toLocaleString() + " XP";
  $("#sBar").style.width = lp.pct + "%"; $("#sTitle").textContent = PQ.levelTitle();
  $("#cXpN").textContent = S.xp.toLocaleString(); $("#cStreakN").textContent = PQ.streak();
  const tx = PQ.todayXp(); $("#cGoalTxt").textContent = `${Math.min(tx, S.goal)}/${S.goal}`;
  $("#cGoalArc").style.strokeDashoffset = 88 - 88 * Math.min(1, tx / S.goal);
};

/* ---------- toast & confetti ---------- */
PQ.toast = html => { const t = document.createElement("div"); t.className = "toast"; t.innerHTML = html; $("#toasts").appendChild(t); setTimeout(() => t.remove(), 3300); };
const cv = $("#confetti"), cx = cv.getContext("2d"); let parts = [], raf = 0;
PQ.confetti = () => {
  if (PQ.reduce) return;
  cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
  const cols = ["#8FB78F", "#CBE6C7", "#B4CCCF", "#28536B", "#F3A5BC", "#FFC49B"];
  for (let i = 0; i < 110; i++) parts.push({ x: innerWidth / 2 + (Math.random() - .5) * 240, y: innerHeight * .4, vx: (Math.random() - .5) * 14, vy: -Math.random() * 12 - 4, r: Math.random() * 6 + 4, c: cols[i % 6], a: Math.random() * 6, va: (Math.random() - .5) * .4, life: 0, sq: Math.random() > .5 });
  if (!raf) raf = requestAnimationFrame(step);
};
function step() {
  cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); cx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach(p => { p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; p.life++; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c; if (p.sq) cx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); else { cx.beginPath(); cx.arc(0, 0, p.r / 2.4, 0, 7); cx.fill(); } cx.restore(); });
  parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 240);
  if (parts.length) raf = requestAnimationFrame(step); else { raf = 0; cx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ---------- drag & tap helper (works with mouse, touch and pen) ---------- */
PQ.drag = (el, { onTap, onDrop }) => {
  el.addEventListener("pointerdown", e => {
    if (e.button !== 0 || el.disabled) return;
    const sx = e.clientX, sy = e.clientY; let ghost = null, over = null;
    const move = ev => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
        ghost = el.cloneNode(true); ghost.classList.add("ghost"); ghost.style.width = el.offsetWidth + "px"; document.body.appendChild(ghost); el.classList.add("dragging");
      }
      if (ghost) {
        ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px";
        const z = document.elementFromPoint(ev.clientX, ev.clientY)?.closest("[data-drop]");
        if (z !== over) { over && over.classList.remove("over"); over = z; over && over.classList.add("over"); }
      }
    };
    const up = ev => {
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      over && over.classList.remove("over");
      if (ghost) { ghost.remove(); el.classList.remove("dragging"); const z = document.elementFromPoint(ev.clientX, ev.clientY)?.closest("[data-drop]"); if (z && onDrop) onDrop(z); }
      else if (ev.type === "pointerup" && onTap) onTap();
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  });
  el.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && onTap) { e.preventDefault(); onTap(); } });
};

/* ---------- icons ---------- */
PQ.ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8 6.2 20l1.4-6.4L2.7 9.2l6.5-.7z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5V5.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
};

/* ---------- router ---------- */
const CRUMBS = { home: [], learn: [["Learn"]], sim: [["Simulator"]], games: [["Games"]], progress: [["Progress"]] };
PQ.setCrumbs = list => {
  const items = [["Home", "#home"], ...list];
  $("#crumbs").innerHTML = items.map((c, i) => i < items.length - 1 && c[1] ? `<a href="${c[1]}">${PQ.esc(c[0])}</a><span class="sep">/</span>` : `<span>${PQ.esc(c[0])}</span>`).join("");
};
PQ.cleanup = null;
function route() {
  const h = location.hash.replace("#", "") || "home";
  const [base, ...rest] = h.split("-"); const param = rest.join("-");
  const map = { home: "home", learn: "learn", lesson: "lesson", sim: "sim", games: "games", game: "game", progress: "progress" };
  const name = map[base] || "home";
  if (PQ.cleanup) { try { PQ.cleanup(); } catch (e) {} PQ.cleanup = null; }
  document.querySelectorAll(".sheet").forEach(s => s.remove());
  const navKey = { lesson: "learn", game: "games" }[name] || name;
  $$(".nav a").forEach(a => a.dataset.nav === navKey ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  PQ.setCrumbs(CRUMBS[name] || []);
  const app = $("#app"); app.className = "page view-enter"; void app.offsetWidth;
  (PQ.views[name] || PQ.views.home)(param, app);
  scrollTo({ top: 0, behavior: "auto" });
}
PQ.route = route;
addEventListener("hashchange", route);

/* ---------- home ---------- */
PQ.nextLesson = () => PQ.LESSONS.find(l => !(S.lessons[l.id] && S.lessons[l.id].done)) || null;
PQ.weekDots = () => {
  const out = [], t = new Date(); t.setHours(12, 0, 0, 0);
  const dow = (t.getDay() + 6) % 7; t.setDate(t.getDate() - dow);
  for (let i = 0; i < 7; i++) { const k = dkey(t); out.push({ l: "MTWTFSS"[i], on: S.days[k] > 0, today: k === PQ.today() }); t.setDate(t.getDate() + 1); }
  return `<div class="week">${out.map(d => `<div>${d.l}<i class="${d.on ? "on" : ""} ${d.today ? "today" : ""}">${d.on ? "✓" : ""}</i></div>`).join("")}</div>`;
};
PQ.goalRing = (size = 84) => {
  const pct = Math.min(1, PQ.todayXp() / S.goal), r = 34, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 84 84" style="width:${size}px;height:${size}px"><circle cx="42" cy="42" r="${r}" fill="none" stroke="#DCE8E9" stroke-width="10"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="#8FB78F" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 42 42)"/><text x="42" y="48" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="18" font-weight="600" fill="#1B3B4D">${Math.round(pct * 100)}%</text></svg>`;
};
PQ.views.home = (p, app) => {
  const next = PQ.nextLesson(), hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const done = doneCount(), tip = PQ.TIPS[new Date().getDate() % PQ.TIPS.length];
  const nu = next ? next.unit : null;
  app.innerHTML = `
  <section class="hero">
    <div class="welcome">
      <svg class="deco" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="90" fill="none" stroke="#B4CCCF" stroke-opacity=".25" stroke-width="18"/><circle cx="100" cy="100" r="58" fill="#FFC49B" fill-opacity=".9"/><circle cx="100" cy="100" r="44" fill="none" stroke="#7A1E3A" stroke-width="2" stroke-dasharray="3 4"/><path d="M100 76v48M88 89c0-5 5-8 12-8s12 3 12 8c0 11-24 6-24 17 0 5 5 8 12 8s12-3 12-8" fill="none" stroke="#7A1E3A" stroke-width="5" stroke-linecap="round"/></svg>
      <p class="label" style="color:var(--pistachio)">${greet}</p>
      <h1>Learn money skills <em>that last.</em></h1>
      <p>Bite-sized lessons, games and a life simulator that teach you how to earn, save, spend and grow money with confidence.</p>
      <div class="acts">
        <a class="btn btn-primary" href="${next ? "#lesson-" + next.id : "#learn"}">${PQ.ICON.play}${done ? "Continue learning" : "Start your first lesson"}</a>
        <a class="btn btn-ghost" href="#games">Play a game</a>
      </div>
    </div>
    <div class="card today">
      <div class="goal-big">${PQ.goalRing()}<div><p class="label">Today's goal</p><h3 style="margin-top:4px">${PQ.todayXp()} / ${S.goal} XP</h3><p class="muted" style="font-size:.9rem">${PQ.todayXp() >= S.goal ? "Goal reached. Nice work!" : "Finish a lesson to reach it."}</p></div></div>
      <div><p class="label" style="margin-bottom:6px">This week · ${PQ.streak()}-day streak</p>${PQ.weekDots()}</div>
    </div>
  </section>
  ${next ? `<a class="card continue" href="#lesson-${next.id}" style="text-decoration:none">
    <div class="badge-u t-${nu.color}">${next.ui + 1}</div>
    <div><p class="label">Up next · Unit ${next.ui + 1}: ${PQ.esc(nu.title)}</p><h3 style="margin-top:4px">${PQ.esc(next.title)}</h3><p class="muted" style="font-size:.92rem">${next.mins} min · ${next.qs.length} questions · ${done}/${PQ.LESSONS.length} lessons complete</p></div>
    <span class="btn btn-primary btn-sm">Start ${PQ.ICON.arrow}</span></a>` : `<div class="card continue"><div class="badge-u t-matcha">✓</div><div><h3>Every lesson complete</h3><p class="muted">Keep your skills sharp in the Games section.</p></div><a class="btn btn-primary btn-sm" href="#games">Play</a></div>`}
  <div class="tiles">
    <a class="tile t-pistachio" href="#learn"><svg class="big" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 7l10-4 10 4-10 4z"/><path d="M6 9v5c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/></svg><p class="label" style="color:inherit;opacity:.75">${PQ.UNITS.length} units · ${PQ.LESSONS.length} lessons</p><h3>Learn</h3><p>A step-by-step course from your first paycheck to investing, with questions after every lesson.</p><span class="go">Open the course ${PQ.ICON.arrow.replace("<svg", '<svg width="16" height="16"')}</span></a>
    <a class="tile t-peach" href="#sim"><svg class="big" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg><p class="label" style="color:inherit;opacity:.75">Life simulator + tools</p><h3>Simulator</h3><p>Practise real decisions safely, then plan your own budget and savings goals.</p><span class="go">Try it ${PQ.ICON.arrow.replace("<svg", '<svg width="16" height="16"')}</span></a>
    <a class="tile t-orchid" href="#games"><svg class="big" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg><p class="label" style="color:inherit;opacity:.75">7 ways to revise</p><h3>Games</h3><p>Quizzes, blurting, flashcards, matching, crosswords, sorting and a speed round.</p><span class="go">Choose a game ${PQ.ICON.arrow.replace("<svg", '<svg width="16" height="16"')}</span></a>
  </div>
  <div class="card tipcard"><div class="k">${tip[0]}</div><div><p class="label">Money tip of the day</p><p style="font-size:1.05rem; margin-top:4px">${PQ.money(tip[1])}</p></div><a class="btn btn-soft btn-sm" href="#progress">See your progress</a></div>`;
};

/* ---------- boot (after all scripts) ---------- */
addEventListener("DOMContentLoaded", () => { PQ.renderHud(); PQ.checkBadges(); route(); });
})();
