/* Games hub and the seven revision games. */
(function () {
"use strict";
const PQ = window.PQ, $ = PQ.$, $$ = PQ.$$, M = PQ.money, esc = PQ.esc;

const GAMES = [
  { id: "quiz", t: "Mixed Quiz", c: "pistachio", feature: true, d: "Questions from any unit in every format: multiple choice, fill in the blank, drag and drop, matching, maths and written answers.", meta: "5–15 questions · up to 45 XP", ico: '<path d="M9 9a3 3 0 1 1 4 2.8c-.6.3-1 .9-1 1.5V14"/><path d="M12 17.5v.5"/><circle cx="12" cy="12" r="10"/>' },
  { id: "blurt", t: "Blurt It", c: "peach", feature: true, d: "Write down everything you remember about a topic. We check it for key ideas and common mistakes, then show you exactly what to revise.", meta: "Active recall · up to 25 XP", ico: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>' },
  { id: "flash", t: "Flashcards", c: "azure", d: "Flip through key terms and sort them into “got it” and “still learning”.", meta: `${PQ.GLOSSARY.length} terms`, ico: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>' },
  { id: "match", t: "Memory Match", c: "orchid", d: "Flip cards to pair each term with its meaning in as few moves as you can.", meta: "6 pairs · 15 XP", ico: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M13 7h8M3 17h8"/>' },
  { id: "cross", t: "Crossword", c: "matcha", d: "A fresh money crossword every time, built from the course vocabulary.", meta: "New puzzle each game · 25 XP", ico: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>' },
  { id: "sort", t: "Sort It", c: "indigo", d: "Drag cards into the right group: needs vs wants, assets vs liabilities, scams vs safe habits and more.", meta: `${PQ.SORTS.length} sets · 10 XP`, ico: '<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>' },
  { id: "speed", t: "Speed Round", c: "peach", d: "True or false? Answer as many money statements as you can in 60 seconds.", meta: "60 seconds · up to 40 XP", ico: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>' }
];

PQ.views.games = (p, app) => {
  app.innerHTML = `<div class="head"><div><p class="label">Games</p><h1 style="margin-top:6px">Revise by <em class="it">playing</em></h1></div><p class="muted">Each game uses what you learn in the course. Mix them up: research shows that testing yourself in different ways helps ideas stick.</p></div>
  <div class="hub">${GAMES.map(g => `<a class="t-${g.c} ${g.feature ? "feature" : ""}" href="#game-${g.id}"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g.ico}</svg></span><h3>${g.t}</h3><p>${g.d}</p><span class="meta">${g.meta}</span></a>`).join("")}</div>`;
};

PQ.views.game = (id, app) => {
  const g = GAMES.find(x => x.id === id);
  if (!g) { location.hash = "games"; return; }
  PQ.setCrumbs([["Games", "#games"], [g.t]]);
  GAME[id](app, g);
};
const head = (g, sub) => `<div class="head"><div><a class="linkl" href="#games" style="text-decoration:none">${PQ.ICON.back.replace("<svg", '<svg width="16" height="16"')} All games</a><h1 style="margin-top:8px">${g.t}</h1></div><p class="muted">${sub}</p></div>`;
const unitPicker = (sel, allowAll = true) => `<div class="choice-grid">${allowAll ? `<button class="pick" type="button" data-u="all" aria-pressed="${sel === "all"}">All units<small>Everything so far</small></button>` : ""}${PQ.UNITS.map((u, i) => `<button class="pick" type="button" data-u="${u.id}" aria-pressed="${sel === u.id}">${i + 1}. ${esc(u.title)}<small>${u.lessons.length} lessons</small></button>`).join("")}</div>`;
const bindPicks = (root, attr, cb) => $$(`[data-${attr}]`, root).forEach(b => b.onclick = () => { $$(`[data-${attr}]`, root).forEach(x => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); cb(b.dataset[attr]); });

const GAME = {};

/* ---------- Mixed quiz ---------- */
GAME.quiz = (app, g) => {
  let unit = PQ.prefUnit || "all", len = 10; PQ.prefUnit = null;
  app.innerHTML = head(g, "Pick a topic and length. Questions come from the course in every format.") + `<div class="card panel setup"><div><p class="label" style="margin-bottom:8px">Topic</p>${unitPicker(unit)}</div>
  <div><p class="label" style="margin-bottom:8px">Length</p><div class="tabs" id="lenTabs">${[5, 10, 15].map(n => `<button type="button" data-n="${n}" aria-pressed="${n === len}">${n} questions</button>`).join("")}</div></div>
  <div><button class="btn btn-primary" type="button" id="start">Start quiz ${PQ.ICON.arrow}</button></div></div>`;
  bindPicks(app, "u", v => unit = v); bindPicks(app, "n", v => len = +v);
  $("#start").onclick = () => {
    const pool = PQ.LESSONS.filter(l => unit === "all" || l.unit.id === unit).flatMap(l => l.qs.map(q => ({ q, l })));
    const qs = PQ.shuffle(pool).slice(0, len);
    let i = 0, right = 0; const wrong = [];
    const next = () => {
      if (i >= qs.length) return end();
      app.innerHTML = `<div class="lesson"><div class="lesson-top"><a class="xbtn" href="#games" aria-label="Leave quiz">${PQ.ICON.close}</a><div class="bar"><i style="width:${i / qs.length * 100}%"></i></div><span class="num" style="font-weight:800">${right} ✓</span></div><div id="qhost"></div></div>`;
      PQ.renderQuestion(qs[i].q, $("#qhost"), ok => { if (ok) right++; else wrong.push(qs[i]); PQ.S().stats.answered++; if (ok) PQ.S().stats.correct++; i++; next(); }, { tag: `Unit ${qs[i].l.ui + 1} · ${qs[i].l.title}` });
    };
    const end = () => {
      const pct = Math.round(right / qs.length * 100), xp = right * 3;
      app.innerHTML = `<div class="lesson"><div class="card result pop-in">${PQ.medal({ c: pct === 100 ? "peach" : pct >= 70 ? "matcha" : "azure", i: pct + "%" }, "medal")}<p class="label">Quiz complete</p><h1>${right} out of ${qs.length}</h1><p class="muted">${pct === 100 ? "A perfect score." : pct >= 70 ? "Strong work. Review the ones you missed below." : "Good practice. The lessons below will help."}</p>
      ${wrong.length ? `<div style="width:100%; max-width:560px; text-align:left; display:grid; gap:8px"><p class="label">Review these lessons</p>${[...new Map(wrong.map(w => [w.l.id, w.l])).values()].map(l => `<a class="card" style="padding:12px 16px; text-decoration:none; display:flex; justify-content:space-between; gap:10px" href="#lesson-${l.id}"><span><b>${esc(l.title)}</b><br><small class="muted">Unit ${l.ui + 1}: ${esc(l.unit.title)}</small></span>${PQ.ICON.arrow.replace("<svg", '<svg width="18"')}</a>`).join("")}</div>` : ""}
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center"><a class="btn btn-line" href="#games">All games</a><button class="btn btn-primary" type="button" id="again">New quiz</button></div></div></div>`;
      $("#again").onclick = () => GAME.quiz(app, g);
      PQ.stat("quizzes"); if (pct === 100 && qs.length >= 10) PQ.stat("quizPerfect");
      PQ.addXP(xp, "quiz"); if (pct === 100) PQ.confetti();
    };
    next();
  };
};

/* ---------- Blurt ---------- */
GAME.blurt = (app, g) => {
  app.innerHTML = head(g, "Blurting is a revision technique: write down everything you can remember about a topic without looking, then check what you missed.") +
  `<div class="grid2" style="margin-bottom:18px"><div class="notice">${PQ.ICON.info}<span><b>How it works.</b> Pick a topic, write for up to 3 minutes, then press Check. You'll see which key ideas you covered, what you missed and any statements that look wrong.</span></div><div class="notice good">${PQ.ICON.bulb}<span><b>Tip.</b> Use the proper terms (like “net pay” or “APR”) and explain them. Bullet points are fine.</span></div></div>
  <div class="hub">${PQ.BLURT.map((b, i) => { const u = PQ.unit(b.u); return `<a class="t-${u.color}" href="#game-blurt" data-b="${i}"><p class="label" style="color:inherit; opacity:.75">Unit ${PQ.UNITS.indexOf(u) + 1}</p><h3>${esc(b.title)}</h3><p>${b.concepts.length} key ideas to recall</p><span class="meta">Start blurting →</span></a>`; }).join("")}</div>`;
  $$("[data-b]", app).forEach(a => a.onclick = e => { e.preventDefault(); write(PQ.BLURT[+a.dataset.b]); });
  const write = (topic, prev = "") => {
    const u = PQ.unit(topic.u); let left = 180, timer;
    app.innerHTML = `<div class="lesson"><div class="lesson-top"><button class="xbtn" type="button" id="bBack" aria-label="Choose another topic">${PQ.ICON.back}</button><div style="flex:1"><p class="label">Blurt · ${esc(u.title)}</p><b style="font-family:var(--f-serif); font-size:1.2rem">${esc(topic.title)}</b></div><span class="pill t-peach num" id="bTime">3:00</span></div>
    <div class="card panel" style="display:grid; gap:14px"><p style="font-size:1.08rem">${esc(topic.prompt)}</p><textarea class="input" id="bText" placeholder="Start writing everything you remember...">${esc(prev)}</textarea><div style="display:flex; justify-content:space-between; gap:10px; align-items:center; flex-wrap:wrap"><span class="muted" id="bCount" style="font-size:.88rem">0 words</span><button class="btn btn-primary" type="button" id="bCheck" disabled>Check my blurt</button></div></div></div>`;
    const ta = $("#bText"), cnt = $("#bCount"), chk = $("#bCheck");
    const upd = () => { const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; cnt.textContent = n + " words"; chk.disabled = n < 5; };
    ta.addEventListener("input", upd); upd(); ta.focus();
    timer = setInterval(() => { left--; $("#bTime").textContent = Math.max(0, Math.floor(left / 60)) + ":" + String(Math.max(0, left % 60)).padStart(2, "0"); if (left <= 0) { clearInterval(timer); $("#bTime").textContent = "Time's up"; } }, 1000);
    PQ.cleanup = () => clearInterval(timer);
    $("#bBack").onclick = () => { clearInterval(timer); GAME.blurt(app, g); };
    chk.onclick = () => { clearInterval(timer); result(topic, ta.value); };
  };
  const result = (topic, text) => {
    const res = PQ.checkKeywords(text, topic.concepts);
    const t = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
    const wrong = topic.wrong.filter(w => new RegExp(w.re, "i").test(t));
    const score = Math.max(0, Math.round(res.hits / topic.concepts.length * 100) - wrong.length * 5);
    const u = PQ.unit(topic.u), firstL = u.lessons[0];
    const verdict = score >= 80 ? "Excellent recall" : score >= 50 ? "Good start" : "Keep building";
    app.innerHTML = `<div class="lesson" style="max-width:860px"><div class="lesson-top"><button class="xbtn" type="button" id="bBack" aria-label="Choose another topic">${PQ.ICON.back}</button><div style="flex:1"><p class="label">Blurt feedback</p><b style="font-family:var(--f-serif); font-size:1.2rem">${esc(topic.title)}</b></div></div>
    <div class="grid2" style="margin-bottom:18px"><div class="card panel" style="display:grid; gap:10px; align-content:start"><p class="label">Your score</p><div style="display:flex; align-items:center; gap:16px">${PQ.medal({ c: score >= 80 ? "matcha" : score >= 50 ? "peach" : "orchid", i: score + "%" }, "med\" style=\"width:84px;height:84px")}<div><h2>${verdict}</h2><p class="muted">${res.hits} of ${topic.concepts.length} key ideas${wrong.length ? `, ${wrong.length} statement${wrong.length > 1 ? "s" : ""} to fix` : ""}</p></div></div><div class="bar"><i style="width:${score}%"></i></div></div>
    <div class="card panel" style="display:grid; gap:10px; align-content:start"><p class="label">What you wrote</p><p style="white-space:pre-wrap; font-size:.95rem; max-height:180px; overflow:auto">${esc(text)}</p></div></div>
    ${wrong.length ? `<div class="card panel" style="margin-bottom:18px; display:grid; gap:10px"><h3>Check these statements</h3><p class="muted" style="font-size:.92rem">Part of your answer looks technically incorrect:</p><div class="kw-list">${wrong.map(w => `<div class="kw warn"><b>!</b><span>${M(w.fix)}</span></div>`).join("")}</div></div>` : ""}
    <div class="grid2"><div class="card panel" style="display:grid; gap:10px; align-content:start"><h3>You remembered</h3><div class="kw-list">${res.list.filter(x => x.hit).map(k => `<div class="kw hit"><b>✓</b><span>${esc(k.label)}</span></div>`).join("") || '<p class="muted">None of the key ideas yet. Have a look at the list on the right.</p>'}</div></div>
    <div class="card panel" style="display:grid; gap:10px; align-content:start"><h3>To revise</h3><div class="kw-list">${res.list.filter(x => !x.hit).map(k => `<div class="kw miss"><b>✗</b><span>${esc(k.label)}</span></div>`).join("") || '<p class="muted">Nothing missing. Brilliant!</p>'}</div></div></div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px"><button class="btn btn-primary" type="button" id="bAgain">Blurt again</button><button class="btn btn-soft" type="button" id="bEdit">Add to my answer</button><a class="btn btn-line" href="#lesson-${firstL.id}">Revise Unit ${PQ.UNITS.indexOf(u) + 1}</a></div></div>`;
    $("#bBack").onclick = () => GAME.blurt(app, g);
    $("#bAgain").onclick = () => write(topic);
    $("#bEdit").onclick = () => write(topic, text);
    PQ.stat("blurts"); PQ.stat("blurtBest", score, "max");
    PQ.addXP(5 + Math.round(score / 5), "blurt");
    if (score >= 80) PQ.confetti();
  };
};

/* ---------- Flashcards ---------- */
GAME.flash = (app, g) => {
  let unit = "all";
  app.innerHTML = head(g, "Flip each card, then be honest: do you know it or are you still learning it? Cards you're still learning come back.") + `<div class="card panel setup"><div><p class="label" style="margin-bottom:8px">Deck</p>${unitPicker(unit)}</div><div><button class="btn btn-primary" type="button" id="start">Start ${PQ.ICON.arrow}</button></div></div>`;
  bindPicks(app, "u", v => unit = v);
  $("#start").onclick = () => {
    let deck = PQ.shuffle(PQ.GLOSSARY.filter(x => unit === "all" || x.u === unit)).slice(0, 20);
    const total = deck.length; let known = 0, seen = 0;
    const show = () => {
      if (!deck.length) return end();
      const c = deck[0], u = PQ.unit(c.u);
      app.innerHTML = `<div class="lesson"><div class="lesson-top"><a class="xbtn" href="#games" aria-label="Leave flashcards">${PQ.ICON.close}</a><div class="bar"><i style="width:${known / total * 100}%"></i></div><span class="num" style="font-weight:800">${known}/${total}</span></div>
      <div class="flash-stage"><button class="flash" type="button" id="card" aria-label="Flip card"><div class="face t-${u.color}"><h3>${esc(c.t)}</h3><small>Tap to flip</small></div><div class="face back" style="background:var(--surface); border:2px solid var(--line)"><p>${esc(c.d)}</p><small>${esc(u.title)}</small></div></button></div>
      <div style="display:flex; justify-content:center; gap:12px; margin-top:22px; flex-wrap:wrap"><button class="btn btn-bad" type="button" id="learning">Still learning</button><button class="btn btn-good" type="button" id="gotit">Got it</button></div>
      <p class="muted" style="text-align:center; font-size:.85rem; margin-top:12px">Keyboard: space to flip, ← still learning, → got it</p></div>`;
      const card = $("#card"); card.onclick = () => card.classList.toggle("flip");
      $("#gotit").onclick = () => { deck.shift(); known++; seen++; show(); };
      $("#learning").onclick = () => { const x = deck.shift(); deck.splice(Math.min(deck.length, 3), 0, x); seen++; show(); };
    };
    const key = e => { if (!$("#card")) return; if (e.key === " ") { e.preventDefault(); $("#card").click(); } if (e.key === "ArrowRight") $("#gotit").click(); if (e.key === "ArrowLeft") $("#learning").click(); };
    addEventListener("keydown", key); PQ.cleanup = () => removeEventListener("keydown", key);
    const end = () => {
      app.innerHTML = `<div class="lesson"><div class="card result pop-in">${PQ.medal({ c: "azure", i: String(total) }, "medal")}<p class="label">Deck complete</p><h1>${total} cards learned</h1><p class="muted">You reviewed ${seen} cards in total. Repeating the tricky ones is exactly how memory works.</p><div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center"><a class="btn btn-line" href="#games">All games</a><button class="btn btn-primary" type="button" id="again">Another deck</button></div></div></div>`;
      $("#again").onclick = () => GAME.flash(app, g);
      PQ.stat("flash", seen); PQ.addXP(Math.min(30, total + 5), "flashcards");
    };
    show();
  };
};

/* ---------- Memory match ---------- */
GAME.match = (app, g) => {
  const pairs = PQ.shuffle(PQ.GLOSSARY.filter(x => x.d.length < 70)).slice(0, 6);
  const cards = PQ.shuffle(pairs.flatMap((p, i) => [{ i, txt: p.t, term: true }, { i, txt: p.d, term: false }]));
  let open = [], moves = 0, done = 0, lock = false; const t0 = Date.now();
  app.innerHTML = head(g, "Flip two cards at a time. Match each term to its meaning. Fewer moves is better.") + `<div style="display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap"><span class="pill t-azure" id="mMoves">Moves: 0</span><span class="pill t-pistachio" id="mDone">Pairs: 0/6</span><button class="btn btn-soft btn-sm" type="button" id="mNew" style="margin-left:auto">New board</button></div>
  <div class="memory">${cards.map((c, k) => `<button class="mcard" type="button" data-k="${k}" aria-label="Hidden card"><div class="inner"><div class="f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-1 1-1.6 2.5-1.6s2.5.6 2.5 1.5c0 2.3-5 1.2-5 3.6 0 1 1.1 1.6 2.5 1.6s2.5-.6 2.5-1.6"/></svg></div><div class="b ${c.term ? "term" : ""}">${esc(c.txt)}</div></div></button>`).join("")}</div>`;
  $("#mNew").onclick = () => GAME.match(app, g);
  $$(".mcard", app).forEach(el => el.onclick = () => {
    const k = +el.dataset.k; if (lock || el.classList.contains("open") || el.classList.contains("done")) return;
    el.classList.add("open"); el.setAttribute("aria-label", cards[k].txt); open.push(el);
    if (open.length === 2) {
      moves++; $("#mMoves").textContent = "Moves: " + moves;
      const [a, b] = open.map(x => cards[+x.dataset.k]);
      if (a.i === b.i && a.term !== b.term) { open.forEach(x => { x.classList.remove("open"); x.classList.add("done"); }); open = []; done++; $("#mDone").textContent = `Pairs: ${done}/6`; if (done === 6) setTimeout(win, 500); }
      else { lock = true; setTimeout(() => { open.forEach(x => { x.classList.remove("open"); x.setAttribute("aria-label", "Hidden card"); }); open = []; lock = false; }, 1000); }
    }
  });
  const win = () => {
    const secs = Math.round((Date.now() - t0) / 1000);
    app.innerHTML = `<div class="lesson"><div class="card result pop-in">${PQ.medal({ c: moves <= 9 ? "peach" : "orchid", i: String(moves) }, "medal")}<p class="label">Board cleared</p><h1>${moves} moves</h1><p class="muted">${moves <= 9 ? "Incredible memory!" : "Nice work."} Time: ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}. A perfect game is 6 moves.</p><div style="display:grid; gap:6px; text-align:left; max-width:520px; width:100%">${pairs.map(p => `<div class="kw hit"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></div>`).join("")}</div><div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center"><a class="btn btn-line" href="#games">All games</a><button class="btn btn-primary" type="button" id="again">Play again</button></div></div></div>`;
    $("#again").onclick = () => GAME.match(app, g);
    PQ.stat("match"); PQ.addXP(15, "memory match"); PQ.confetti();
  };
};

/* ---------- Crossword ---------- */
function buildCrossword(words) {
  const grid = new Map(), placed = [];
  const key = (r, c) => r + "," + c;
  const fits = (w, r, c, dir) => {
    const dr = dir === "d" ? 1 : 0, dc = dir === "a" ? 1 : 0; let inter = 0;
    if (grid.has(key(r - dr, c - dc)) || grid.has(key(r + dr * w.length, c + dc * w.length))) return -1;
    for (let i = 0; i < w.length; i++) {
      const rr = r + dr * i, cc = c + dc * i, ch = grid.get(key(rr, cc));
      if (ch) { if (ch !== w[i]) return -1; inter++; }
      else if (grid.has(key(rr + dc, cc + dr)) || grid.has(key(rr - dc, cc - dr))) return -1;
    }
    return inter;
  };
  const put = (e, r, c, dir) => { const dr = dir === "d" ? 1 : 0, dc = dir === "a" ? 1 : 0; for (let i = 0; i < e.w.length; i++) grid.set(key(r + dr * i, c + dc * i), e.w[i]); placed.push({ ...e, r, c, dir }); };
  put(words[0], 0, 0, "a");
  for (const e of words.slice(1)) {
    if (placed.length >= 10) break;
    let best = null;
    for (const p of placed) for (let i = 0; i < p.w.length; i++) for (let j = 0; j < e.w.length; j++) {
      if (p.w[i] !== e.w[j]) continue;
      const dir = p.dir === "a" ? "d" : "a";
      const r = p.dir === "a" ? p.r - j : p.r + i, c = p.dir === "a" ? p.c + i : p.c - j;
      const s = fits(e.w, r, c, dir);
      if (s > 0 && (!best || s > best.s || (s === best.s && Math.random() < .3))) best = { r, c, dir, s };
    }
    if (best) put(e, best.r, best.c, best.dir);
  }
  let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
  grid.forEach((v, k) => { const [r, c] = k.split(",").map(Number); minR = Math.min(minR, r); minC = Math.min(minC, c); maxR = Math.max(maxR, r); maxC = Math.max(maxC, c); });
  placed.forEach(p => { p.r -= minR; p.c -= minC; });
  const starts = [...new Set(placed.map(p => p.r * 1000 + p.c))].sort((a, b) => a - b);
  placed.forEach(p => p.n = starts.indexOf(p.r * 1000 + p.c) + 1);
  return { placed, rows: maxR - minR + 1, cols: maxC - minC + 1 };
}
GAME.cross = (app, g) => {
  const pool = PQ.GLOSSARY.filter(x => x.w && x.w.length >= 3 && x.w.length <= 11).map(x => ({ w: x.w, clue: x.d }));
  let cw; for (let k = 0; k < 30; k++) { const words = PQ.shuffle(pool).sort((a, b) => b.w.length - a.w.length + (Math.random() - .5) * 6); const t = buildCrossword(words); if (!cw || t.placed.length > cw.placed.length) cw = t; if (cw.placed.length >= 9 && cw.cols <= 15) break; }
  const cells = {}; cw.placed.forEach(p => { for (let i = 0; i < p.w.length; i++) { const r = p.r + (p.dir === "d" ? i : 0), c = p.c + (p.dir === "a" ? i : 0); const k = r + "," + c; cells[k] = cells[k] || { ch: p.w[i], words: [] }; cells[k].words.push(p); } });
  const nums = {}; cw.placed.forEach(p => nums[p.r + "," + p.c] = p.n);
  let dir = "a", active = null;
  let gridHtml = ""; for (let r = 0; r < cw.rows; r++) for (let c = 0; c < cw.cols; c++) { const k = r + "," + c; gridHtml += cells[k] ? `<div class="cell on" data-k="${k}">${nums[k] ? `<sup>${nums[k]}</sup>` : ""}<input maxlength="1" data-k="${k}" aria-label="Row ${r + 1} column ${c + 1}" autocomplete="off" autocapitalize="characters"></div>` : `<div class="cell"></div>`; }
  const clue = d => cw.placed.filter(p => p.dir === d).sort((a, b) => a.n - b.n).map(p => `<li data-w="${cw.placed.indexOf(p)}"><b>${p.n}</b>${esc(p.clue)} <span class="muted">(${p.w.length})</span></li>`).join("");
  app.innerHTML = head(g, "Fill the grid using the clues. Click a cell twice to switch between across and down.") + `<div class="card panel cw-wrap"><div><div class="cw-scroll"><div class="cw" style="grid-template-columns:repeat(${cw.cols}, 34px)">${gridHtml}</div></div>
  <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px"><button class="btn btn-primary btn-sm" type="button" id="cCheck">Check</button><button class="btn btn-soft btn-sm" type="button" id="cHint">Reveal a letter</button><button class="btn btn-line btn-sm" type="button" id="cShow">Show answers</button><button class="btn btn-line btn-sm" type="button" id="cNew">New puzzle</button></div></div>
  <div class="clues"><div><h4>Across</h4><ol>${clue("a")}</ol></div><div><h4>Down</h4><ol>${clue("d")}</ol></div></div></div>`;
  const inp = k => $(`input[data-k="${k}"]`, app);
  const wordOf = (k, d) => cells[k].words.find(p => p.dir === d) || cells[k].words[0];
  const highlight = () => { $$(".cell.hl", app).forEach(x => x.classList.remove("hl")); $$(".clues li", app).forEach(x => x.classList.remove("act")); if (!active) return; const p = wordOf(active, dir); dir = p.dir; for (let i = 0; i < p.w.length; i++) { const r = p.r + (p.dir === "d" ? i : 0), c = p.c + (p.dir === "a" ? i : 0); $(`.cell[data-k="${r},${c}"]`, app).classList.add("hl"); } const li = $(`.clues li[data-w="${cw.placed.indexOf(p)}"]`, app); li && li.classList.add("act"); };
  const step = (k, delta) => { const [r, c] = k.split(",").map(Number); const nk = dir === "a" ? r + "," + (c + delta) : (r + delta) + "," + c; return cells[nk] ? nk : null; };
  $$("input", app).forEach(el => {
    el.addEventListener("focus", () => { active = el.dataset.k; if (!cells[active].words.some(p => p.dir === dir)) dir = cells[active].words[0].dir; highlight(); });
    el.addEventListener("click", () => { if (cells[el.dataset.k].words.length > 1 && active === el.dataset.k && el.dataset.clicked) { dir = dir === "a" ? "d" : "a"; highlight(); } el.dataset.clicked = 1; });
    el.addEventListener("input", () => { el.value = el.value.replace(/[^a-z]/gi, "").toUpperCase().slice(-1); el.parentElement.classList.remove("wrong", "right"); if (el.value) { const n = step(el.dataset.k, 1); n && inp(n).focus(); } checkDone(); });
    el.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !el.value) { const p = step(el.dataset.k, -1); if (p) { e.preventDefault(); inp(p).value = ""; inp(p).focus(); } }
      const arrows = { ArrowRight: ["a", 1], ArrowLeft: ["a", -1], ArrowDown: ["d", 1], ArrowUp: ["d", -1] };
      if (arrows[e.key]) { e.preventDefault(); dir = arrows[e.key][0]; const [r, c] = el.dataset.k.split(",").map(Number); const nk = dir === "a" ? r + "," + (c + arrows[e.key][1]) : (r + arrows[e.key][1]) + "," + c; if (cells[nk]) inp(nk).focus(); else highlight(); }
    });
  });
  $$(".clues li", app).forEach(li => li.onclick = () => { const p = cw.placed[+li.dataset.w]; dir = p.dir; const k = p.r + "," + p.c; active = k; inp(k).focus(); highlight(); });
  let won = false;
  const checkDone = () => {
    cw.placed.forEach((p, i) => { let ok = true; for (let j = 0; j < p.w.length; j++) { const r = p.r + (p.dir === "d" ? j : 0), c = p.c + (p.dir === "a" ? j : 0); if (inp(r + "," + c).value !== p.w[j]) ok = false; } $(`.clues li[data-w="${i}"]`, app).classList.toggle("solved", ok); });
    if (!won && Object.keys(cells).every(k => inp(k).value === cells[k].ch)) { won = true; Object.keys(cells).forEach(k => inp(k).parentElement.classList.add("right")); PQ.toast("<b>Crossword solved!</b>"); PQ.stat("cross"); PQ.addXP(25, "crossword"); PQ.confetti(); }
  };
  $("#cCheck").onclick = () => { let wrong = 0; Object.keys(cells).forEach(k => { const v = inp(k).value; if (v) { const ok = v === cells[k].ch; inp(k).parentElement.classList.toggle("right", ok); inp(k).parentElement.classList.toggle("wrong", !ok); if (!ok) wrong++; } }); PQ.toast(wrong ? `${wrong} letter${wrong > 1 ? "s" : ""} to fix` : "Everything so far is correct"); };
  $("#cHint").onclick = () => { const k = active && inp(active).value !== cells[active].ch ? active : Object.keys(cells).find(k => inp(k).value !== cells[k].ch); if (!k) return; inp(k).value = cells[k].ch; inp(k).parentElement.classList.add("right"); checkDone(); };
  $("#cShow").onclick = () => { won = true; Object.keys(cells).forEach(k => { inp(k).value = cells[k].ch; }); checkDone(); PQ.toast("Answers shown. Try a new puzzle for XP."); };
  $("#cNew").onclick = () => GAME.cross(app, g);
};

/* ---------- Sort it ---------- */
GAME.sort = (app, g) => {
  app.innerHTML = head(g, "Pick a set, then drag every card into the right group. Get them all right to earn the Sorting Hat badge.") + `<div class="hub">${PQ.SORTS.map((s, i) => `<a class="${["t-pistachio", "t-peach", "t-azure", "t-orchid"][i % 4]}" href="#game-sort" data-s="${i}"><h3>${esc(s.title)}</h3><p>${s.items.length} cards · ${s.groups.join(" vs ")}</p><span class="meta">Play →</span></a>`).join("")}</div>`;
  $$("[data-s]", app).forEach(a => a.onclick = e => { e.preventDefault(); play(PQ.SORTS[+a.dataset.s]); });
  const play = set => {
    app.innerHTML = `<div class="lesson" style="max-width:900px"><div class="lesson-top"><button class="xbtn" type="button" id="sBack" aria-label="Back to sets">${PQ.ICON.back}</button><b style="font-family:var(--f-serif); font-size:1.25rem">${esc(set.title)}</b></div><div id="shost"></div></div>`;
    $("#sBack").onclick = () => GAME.sort(app, g);
    const q = { t: "sort", q: `Sort every card: ${set.groups.join(" or ")}?`, groups: set.groups, items: PQ.shuffle(set.items).slice(0, 12), e: "" };
    PQ.renderQuestion(q, $("#shost"), ok => {
      if (ok) { PQ.stat("sortPerfect"); PQ.addXP(10, "perfect sort"); PQ.confetti(); } else PQ.addXP(4, "sorting practice");
      GAME.sort(app, g);
    });
  };
};

/* ---------- Speed round ---------- */
GAME.speed = (app, g) => {
  const pool = PQ.SPEED.concat(PQ.LESSONS.flatMap(l => l.qs.filter(q => q.t === "tf").map(q => [M(q.q), q.a])));
  app.innerHTML = head(g, "Read each statement and decide: true or false? You have 60 seconds. Five in a row doubles your points.") + `<div class="card panel" style="display:grid; gap:16px; max-width:760px">
  <div class="speed-stage"><div class="hud"><span id="spScore">Score 0</span><span>Best ${PQ.S().stats.speedBest}</span></div><div class="timer"><i id="spTimer"></i></div><p class="stmt" id="spStmt">60 seconds. How many can you get right?</p><p class="fb" id="spFb">Keyboard: ← true, → false</p></div>
  <div id="spBtns"><button class="btn btn-primary" type="button" id="spStart" style="width:100%">Start the round</button></div></div>`;
  let G = null;
  const key = e => { if (!G || G.over) return; if (e.key === "ArrowLeft") { e.preventDefault(); ans(true); } if (e.key === "ArrowRight") { e.preventDefault(); ans(false); } };
  addEventListener("keydown", key); PQ.cleanup = () => { removeEventListener("keydown", key); if (G) G.over = true; };
  const start = () => {
    G = { deck: PQ.shuffle(pool), i: 0, score: 0, combo: 0, t0: performance.now(), over: false, wrong: [] };
    $("#spBtns").innerHTML = `<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px"><button class="btn btn-good" type="button" data-v="1">True</button><button class="btn btn-bad" type="button" data-v="0">False</button></div>`;
    $$("#spBtns [data-v]").forEach(b => b.onclick = () => ans(b.dataset.v === "1"));
    show(); tick();
  };
  const show = () => { const el = $("#spStmt"); el.textContent = G.deck[G.i % G.deck.length][0]; el.classList.remove("pop-in"); void el.offsetWidth; el.classList.add("pop-in"); };
  const tick = () => { if (!G || G.over || !$("#spTimer")) return; const left = Math.max(0, 1 - (performance.now() - G.t0) / 60000); $("#spTimer").style.width = left * 100 + "%"; if (left <= 0) return end(); requestAnimationFrame(tick); };
  const ans = v => {
    const [s, a] = G.deck[G.i % G.deck.length];
    if (v === a) { G.combo++; G.score += G.combo >= 5 ? 2 : 1; $("#spFb").textContent = G.combo >= 5 ? `Combo ×${G.combo}: double points!` : "Correct"; }
    else { G.combo = 0; G.wrong.push([s, a]); $("#spFb").textContent = `That one was ${a ? "true" : "false"}.`; }
    $("#spScore").textContent = "Score " + G.score; G.i++; show();
  };
  const end = () => {
    G.over = true; const sc = G.score;
    $("#spStmt").textContent = `Time! You scored ${sc}.`; $("#spFb").textContent = sc >= 15 ? "Lightning fast." : "Play again to beat your best.";
    $("#spBtns").innerHTML = `${G.wrong.length ? `<div style="display:grid; gap:6px; margin-bottom:12px"><p class="label">Learn from these</p>${G.wrong.slice(0, 5).map(([s, a]) => `<div class="kw miss"><b>${a ? "True" : "False"}</b><span>${esc(s)}</span></div>`).join("")}</div>` : ""}<button class="btn btn-primary" type="button" id="spStart" style="width:100%">Play again</button>`;
    $("#spStart").onclick = start;
    PQ.stat("speedBest", sc, "max"); if (sc > 0) PQ.addXP(Math.min(40, sc * 2), "speed round");
  };
  $("#spStart").onclick = start;
};
})();
