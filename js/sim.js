/* Simulator: life simulator + personal money tools. */
(function () {
"use strict";
const PQ = window.PQ, $ = PQ.$, $$ = PQ.$$, M = PQ.money, esc = PQ.esc, F = n => PQ.fmt(n, 0), F2 = n => PQ.fmt(n, 2);

const TOOLS = [
  { id: "life", t: "Life Simulator", c: "peach", feature: true, d: "Create your character, pick a job and a place to live, set a goal, and survive three months of real decisions. Every choice shows what would happen in real life and which lesson it connects to.", why: "Practise decisions with no real risk", ico: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-1a7 7 0 0 1 14 0v1"/>' },
  { id: "budget", t: "My Budget Builder", c: "pistachio", feature: true, d: "Enter your own income and spending to see where your money goes, compare it with the 50/30/20 rule and get personal tips.", why: "Plan your real money", ico: '<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>' },
  { id: "goal", t: "Goal Planner", c: "azure", d: "Turn something you want into a plan: how much to save each week, and when you'll get there.", why: "Reach goals faster", ico: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>' },
  { id: "pay", t: "Paycheck Calculator", c: "orchid", d: "Estimate your take-home pay from an hourly job, and see how many hours of work things really cost.", why: "Know what you'll actually earn", ico: '<rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/>' },
  { id: "debt", t: "Debt Payoff Lab", c: "matcha", d: "See how long a credit card balance takes to clear and how much interest you'd pay, then try paying more.", why: "Avoid the minimum-payment trap", ico: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>' },
  { id: "grow", t: "Growth Lab", c: "indigo", d: "Watch compound growth in action. See what saving a little each month could grow into, and the cost of waiting.", why: "See why starting early matters", ico: '<path d="M12 20V10M6 20v-4M18 20V4"/>' }
];

PQ.views.sim = (id, app) => {
  if (id) { const t = TOOLS.find(x => x.id === id); if (!t) { location.hash = "sim"; return; } PQ.setCrumbs([["Simulator", "#sim"], [t.t]]); return TOOL[id](app, t); }
  app.innerHTML = `<div class="head"><div><p class="label">Simulator</p><h1 style="margin-top:6px">Practise now, <em class="it">use it for real</em></h1></div><p class="muted">The life simulator lets you try money decisions safely. The tools help you plan with your own numbers. Your plans are saved in this browser.</p></div>
  <div class="hub">${TOOLS.map(t => `<a class="t-${t.c} ${t.feature ? "feature" : ""}" href="#sim-${t.id}"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t.ico}</svg></span><h3>${t.t}</h3><p>${M(t.d)}</p><span class="meta">${t.why}</span></a>`).join("")}</div>`;
};
const head = (t, sub) => `<div class="head"><div><a class="linkl" href="#sim" style="text-decoration:none">${PQ.ICON.back.replace("<svg", '<svg width="16" height="16"')} Simulator</a><h1 style="margin-top:8px">${t.t}</h1></div><p class="muted">${sub}</p></div>`;
const num = (id, label, val, opts = {}) => `<div class="field"><label for="${id}">${label}</label><div class="numwrap" style="max-width:none">${opts.money ? `<span class="pre" style="font-size:1rem">${esc(PQ.S().cur)}</span>` : ""}<input class="input" id="${id}" type="number" inputmode="decimal" min="${opts.min ?? 0}" step="${opts.step ?? "any"}" value="${val}" style="font-size:1rem; font-weight:700">${opts.suf ? `<span class="pre" style="font-size:.95rem">${opts.suf}</span>` : ""}</div>${opts.hint ? `<small>${opts.hint}</small>` : ""}</div>`;
const val = id => { const v = parseFloat($("#" + id).value); return isNaN(v) ? 0 : v; };

/* ---------- shared canvas chart ---------- */
function chart(canvas, series, opts = {}) {
  const dpr = devicePixelRatio || 1, w = canvas.clientWidth, h = canvas.clientHeight; if (!w) return;
  canvas.width = w * dpr; canvas.height = h * dpr; const g = canvas.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
  const pL = 58, pR = 12, pT = 12, pB = 28, n = Math.max(...series.map(s => s.pts.length)) - 1 || 1;
  const max = Math.max(1, ...series.flatMap(s => s.pts)) * 1.05;
  const X = i => pL + i / n * (w - pL - pR), Y = v => pT + (1 - v / max) * (h - pT - pB);
  g.font = "600 11px Manrope, sans-serif"; g.fillStyle = "#4A6878"; g.strokeStyle = "rgba(40,83,107,.12)"; g.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const v = max * i / 4, y = Y(v); g.beginPath(); g.moveTo(pL, y); g.lineTo(w - pR, y); g.stroke(); const lab = v >= 1e6 ? (v / 1e6).toFixed(1) + "M" : v >= 1e4 ? Math.round(v / 1e3) + "k" : v >= 1e3 ? (v / 1e3).toFixed(1) + "k" : Math.round(v); g.textAlign = "right"; g.fillText(PQ.S().cur + lab, pL - 8, y + 4); }
  g.textAlign = "center"; const every = Math.max(1, Math.ceil(n / 6)); for (let i = 0; i <= n; i += every) g.fillText(opts.xLabel ? opts.xLabel(i) : i, X(i), h - 8);
  series.forEach(s => {
    if (s.fill) { g.beginPath(); g.moveTo(X(0), Y(0)); s.pts.forEach((v, i) => g.lineTo(X(i), Y(v))); g.lineTo(X(s.pts.length - 1), Y(0)); g.closePath(); g.fillStyle = s.fill; g.fill(); }
    g.beginPath(); s.pts.forEach((v, i) => i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v))); g.strokeStyle = s.color; g.lineWidth = s.width || 2.5; g.setLineDash(s.dash || []); g.stroke(); g.setLineDash([]);
    const li = s.pts.length - 1; g.beginPath(); g.arc(X(li), Y(s.pts[li]), 4.5, 0, 7); g.fillStyle = "#F7FAFA"; g.fill(); g.strokeStyle = s.color; g.lineWidth = 2.5; g.stroke();
  });
}
const onResize = fn => { addEventListener("resize", fn); const prev = PQ.cleanup; PQ.cleanup = () => { removeEventListener("resize", fn); prev && prev(); }; };

const TOOL = {};

/* ================= LIFE SIMULATOR ================= */
TOOL.life = (app, t) => {
  const D = PQ.SIM; let sel = { job: D.jobs[1].id, home: D.homes[0].id, goal: D.goals[0].id, name: "" };
  const net = job => { const gross = job.rate * job.hours; const tax = gross * job.tax, soc = gross * 0.0765; return { gross, tax, soc, net: gross - tax - soc }; };
  const setup = () => {
    const job = D.jobs.find(j => j.id === sel.job), home = D.homes.find(h => h.id === sel.home), n = net(job), bills = home.bills.reduce((s, b) => s + b[1], 0);
    app.innerHTML = head(t, "Build your character, then live three months of paydays, budgets and surprises. Aim for a strong financial health score.") + `<div class="grid2" style="align-items:start">
    <div class="card panel setup" style="max-width:none">
      <div class="field"><label for="simName">Your character's name</label><input class="input" id="simName" maxlength="20" placeholder="e.g. Alex" value="${esc(sel.name)}"></div>
      <div><p class="label" style="margin-bottom:8px">1 · Pick a job</p><div class="choice-grid">${D.jobs.map(j => `<button class="pick" type="button" data-job="${j.id}" aria-pressed="${sel.job === j.id}">${esc(j.name)}<small>${F2(j.rate)}/hr · ${j.hours} hrs/month · ${esc(j.note)}</small></button>`).join("")}</div></div>
      <div><p class="label" style="margin-bottom:8px">2 · Where do you live?</p><div class="choice-grid">${D.homes.map(h => `<button class="pick" type="button" data-home="${h.id}" aria-pressed="${sel.home === h.id}">${esc(h.name)}<small>${esc(h.note)}</small></button>`).join("")}</div></div>
      <div><p class="label" style="margin-bottom:8px">3 · Choose a goal (3 months)</p><div class="choice-grid">${D.goals.map(gl => `<button class="pick" type="button" data-goal="${gl.id}" aria-pressed="${sel.goal === gl.id}">${esc(gl.name)}<small>Target ${F(gl.target)}</small></button>`).join("")}</div></div>
    </div>
    <div class="card panel" style="display:grid; gap:14px; align-content:start">
      <p class="label">Your month at a glance</p>
      <div class="calc-out" style="grid-template-columns:1fr 1fr"><div><small>Take-home pay</small><b>${F(n.net)}</b></div><div><small>Bills</small><b>${F(bills)}</b></div><div class="hl" style="grid-column:1/-1"><small>Left to plan each month</small><b>${F(n.net - bills)}</b></div></div>
      <div class="notice">${PQ.ICON.info}<span><b>How you're scored.</b> Financial health (0–100) combines progress to your goal, your safety net, staying out of debt and how smart your decisions are.</span></div>
      ${n.net - bills < 250 ? `<div class="notice bad">${PQ.ICON.info}<span>This combination leaves very little each month. It's possible, but it will be tough. That's real life!</span></div>` : ""}
      <button class="btn btn-primary" type="button" id="simGo">Start month 1 ${PQ.ICON.arrow}</button></div></div>`;
    $("#simName").oninput = e => sel.name = e.target.value;
    ["job", "home", "goal"].forEach(k => $$(`[data-${k}]`, app).forEach(b => b.onclick = () => { sel[k] = b.dataset[k]; setup(); }));
    $("#simGo").onclick = () => begin();
  };
  let G;
  const begin = () => {
    const job = D.jobs.find(j => j.id === sel.job), home = D.homes.find(h => h.id === sel.home), goal = D.goals.find(x => x.id === sel.goal);
    const ev = PQ.shuffle(D.events); const em = ev.filter(e => e.choices.some(c => c.kind === "emergency")), rest = ev.filter(e => !em.includes(e));
    G = { name: sel.name.trim() || "You", job, home, goalD: goal, safetyTarget: home.id === "home" ? 150 : 400, month: 1, goal: 0, safety: 0, fun: 0, card: 0, wise: 0, events: [em[0], rest[0], rest[1], em[1], rest[2], rest[3]], ev: 0, later: 0, freeze: 0, log: [] };
    payday();
  };
  const health = () => {
    const gp = Math.min(1, G.goal / G.goalD.target), sp = Math.min(1, G.safety / G.safetyTarget), dp = G.card <= 0 ? 1 : Math.max(0, 1 - G.card / 500), wp = Math.max(0, Math.min(1, (G.wise + 4) / 16));
    return { total: Math.round(gp * 35 + sp * 25 + dp * 20 + wp * 20), gp, sp, dp, wp };
  };
  const ring = (v, size = 70) => { const r = 28, c = 2 * Math.PI * r, col = v >= 80 ? "#8FB78F" : v >= 50 ? "#FFC49B" : "#F3A5BC"; return `<svg viewBox="0 0 70 70" style="width:${size}px;height:${size}px"><circle cx="35" cy="35" r="${r}" fill="none" stroke="#DCE8E9" stroke-width="8"/><circle cx="35" cy="35" r="${r}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - v / 100)}" transform="rotate(-90 35 35)" style="transition:stroke-dashoffset .7s"/><text x="35" y="41" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="17" fill="#1B3B4D">${v}</text></svg>`; };
  const side = () => { const h = health(); return `<aside class="card sim-side">
    <div class="health">${ring(h.total)}<div><p class="label">Financial health</p><b style="font-family:var(--f-serif); font-size:1.2rem">${esc(G.name)}</b><p class="muted" style="font-size:.84rem">${esc(G.job.name)} · ${esc(G.home.name)}</p></div></div>
    <div><p class="label" style="margin-bottom:6px">Month ${Math.min(G.month, 3)} of 3</p><div style="display:flex; gap:6px">${[1, 2, 3].map(m => `<span style="flex:1; height:6px; border-radius:9px; background:${m <= G.month ? "var(--indigo)" : "var(--azure-tint)"}"></span>`).join("")}</div></div>
    <div class="meter"><div class="top"><span>${esc(G.goalD.name)}</span><span class="num">${F(G.goal)} / ${F(G.goalD.target)}</span></div><div class="bar"><i style="width:${Math.min(100, G.goal / G.goalD.target * 100)}%"></i></div></div>
    <div class="meter"><div class="top"><span>Safety net</span><span class="num">${F(G.safety)} / ${F(G.safetyTarget)}</span></div><div class="bar"><i style="width:${Math.min(100, G.safety / G.safetyTarget * 100)}%; background:var(--azure)"></i></div></div>
    <div class="meter"><div class="top"><span>Fun money left</span><span class="num">${F(G.fun)}</span></div></div>
    <div class="notice ${G.card > 0 ? "bad" : "good"}" style="padding:10px 14px; justify-content:space-between"><b>Credit card debt</b><b class="num">${F(G.card)}</b></div>
    <div class="meter"><div class="top"><span>Smart-decision points</span><span class="num">${G.wise}</span></div></div></aside>`; };
  const layout = inner => { app.innerHTML = `<div class="sim-grid">${side()}<div class="card panel" style="display:grid; gap:18px">${inner}</div></div>`; };

  const payday = () => {
    const n = net(G.job);
    layout(`<div><p class="label">Month ${G.month} · Payday</p><h2 style="margin-top:6px">Your paycheck has arrived</h2><p class="muted" style="margin-top:6px">Watch what happens between what you earned and what actually lands in your account.</p></div>
    <div class="paystub" id="stub"><div class="r"><span>${G.job.hours} hours × ${F2(G.job.rate)}</span><span>${F2(n.gross)}</span></div><div class="r minus"><span>Income tax (${Math.round(G.job.tax * 100)}%)</span><span>−${F2(n.tax)}</span></div><div class="r minus"><span>Social insurance (7.65%)</span><span>−${F2(n.soc)}</span></div><div class="r total"><span>Net pay</span><span>${F2(n.net)}</span></div></div>
    <div class="notice">${PQ.ICON.bulb}<span>You keep about <b>${Math.round(n.net / n.gross * 100)}%</b> of your gross pay. Always budget with net pay. <a class="linkl" href="#lesson-u1l2">Lesson: Gross vs net pay</a></span></div>
    <div><button class="btn btn-primary" type="button" id="toBudget">Plan this month's budget ${PQ.ICON.arrow}</button></div>`);
    $$("#stub .r").forEach((r, i) => setTimeout(() => r.classList.add("show"), PQ.reduce ? 0 : 200 + i * 350));
    $("#toBudget").onclick = budget;
  };

  const budget = () => {
    const n = net(G.job), bills = G.home.bills.slice(); if (G.later) bills.push(["Dental bill (put off last month)", G.later]); if (G.freeze) bills.push(["Account frozen: fees and lost pay", G.freeze]);
    const billSum = bills.reduce((s, b) => s + b[1], 0), free = Math.max(0, Math.floor(n.net - billSum)); G.later = 0; G.freeze = 0;
    const remaining = Math.max(0, G.goalD.target - G.goal), perMonth = Math.ceil(remaining / (4 - G.month));
    layout(`<div><p class="label">Month ${G.month} · Budget</p><h2 style="margin-top:6px">Give every ${esc(PQ.S().cur)} a job</h2></div>
    <div><p style="font-weight:800; margin-bottom:8px">Bills paid automatically</p><div style="display:flex; flex-wrap:wrap; gap:8px">${bills.map(b => `<span class="pill t-azure" style="font-size:.84rem; padding:7px 12px">${esc(b[0])} · ${F(b[1])}</span>`).join("")}</div></div>
    <div class="notice">${PQ.ICON.bulb}<span>After bills you have <b>${F(free)}</b> to plan. To hit your goal on time you need about <b>${F(perMonth)}</b> a month.${G.card > 0 ? " Your card debt grows by 2% a month, so paying it down first saves money." : ""}</span></div>
    <div class="stack">
      ${G.card > 0 ? `<div class="alloc-row"><div class="top"><label for="aCard"><b>Pay off credit card</b><br><small class="muted">Balance ${F(G.card)} · 24% APR</small></label><output id="oCard"></output></div><input type="range" id="aCard" min="0" max="${Math.min(free, Math.ceil(G.card))}" step="1" value="0"></div>` : ""}
      <div class="alloc-row"><div class="top"><label for="aGoal"><b>${esc(G.goalD.name)}</b><br><small class="muted">Pay yourself first</small></label><output id="oGoal"></output></div><input type="range" id="aGoal" min="0" max="${free}" step="5" value="0"></div>
      <div class="alloc-row"><div class="top"><label for="aSafe"><b>Safety net</b><br><small class="muted">Target ${F(G.safetyTarget)} for emergencies</small></label><output id="oSafe"></output></div><input type="range" id="aSafe" min="0" max="${free}" step="5" value="0"></div>
      <div class="stackbar"><i id="sbCard" style="background:var(--orchid)"></i><i id="sbGoal" style="background:var(--matcha)"></i><i id="sbSafe" style="background:var(--azure)"></i><i id="sbFun" style="background:var(--peach)"></i></div>
      <div class="legend">${G.card > 0 ? '<span style="--sw:var(--orchid)">Card</span>' : ""}<span style="--sw:var(--matcha)">Goal</span><span style="--sw:var(--azure)">Safety net</span><span style="--sw:var(--peach)">Fun money</span></div>
      <div class="notice" style="background:var(--peach-tint); color:var(--maroon); justify-content:space-between; align-items:center"><b>Fun money (what's left)</b><b id="oFun" style="font-family:var(--f-serif); font-size:1.4rem"></b></div>
    </div>
    <div><button class="btn btn-primary" type="button" id="lock">Lock in my budget</button></div>`);
    const ids = ["aCard", "aGoal", "aSafe"].filter(id => $("#" + id));
    const upd = changed => {
      let v = Object.fromEntries(ids.map(id => [id, +$("#" + id).value])); let sum = ids.reduce((s, id) => s + v[id], 0);
      if (sum > free && changed) { $("#" + changed).value = Math.max(0, v[changed] - (sum - free)); v[changed] = +$("#" + changed).value; sum = ids.reduce((s, id) => s + v[id], 0); }
      const fun = free - sum, pct = x => free ? (x / free * 100) + "%" : "0%";
      if ($("#oCard")) $("#oCard").textContent = F(v.aCard); $("#oGoal").textContent = F(v.aGoal); $("#oSafe").textContent = F(v.aSafe); $("#oFun").textContent = F(fun);
      $("#sbCard").style.width = pct(v.aCard || 0); $("#sbGoal").style.width = pct(v.aGoal); $("#sbSafe").style.width = pct(v.aSafe); $("#sbFun").style.width = pct(fun);
      return { v, fun };
    };
    ids.forEach(id => $("#" + id).addEventListener("input", () => upd(id)));
    $("#aGoal").value = Math.min(free, Math.round(perMonth * .5 / 5) * 5); upd("aGoal");
    $("#lock").onclick = () => {
      const { v, fun } = upd(); const pay = v.aCard || 0;
      G.card = Math.max(0, G.card - pay); G.goal += v.aGoal; G.safety += v.aSafe; G.fun += fun;
      if (pay > 0) { G.wise++; G.log.push([true, `Paid ${F(pay)} off your card`]); }
      if (v.aGoal + v.aSafe >= free * .2) { G.wise++; G.log.push([true, `Month ${G.month}: saved ${Math.round((v.aGoal + v.aSafe) / Math.max(1, free) * 100)}% of spare money first`]); }
      else G.log.push([false, `Month ${G.month}: saved less than 20% of spare money`]);
      event();
    };
  };

  const spend = (cost, kind, notes) => {
    let rem = cost;
    const take = (k, label) => { if (rem <= 0) return 0; const x = Math.min(G[k], rem); if (x > 0) { G[k] -= x; rem -= x; notes.push(`${F(x)} came from ${label}`); } return x; };
    take("fun", "fun money");
    if (kind === "emergency") { if (take("safety", "your safety net")) notes.push("Your safety net did its job."); if (take("goal", "your goal fund")) { G.wise--; notes.push("You had to raid your goal fund."); } }
    else { if (take("goal", "your goal fund")) { G.wise--; notes.push("That want ate into your goal."); } if (take("safety", "your safety net")) { G.wise--; notes.push("Using your safety net for a want leaves you exposed."); } }
    if (rem > 0) { G.card += rem; G.wise--; notes.push(`${F(rem)} went on a credit card. That's debt now.`); }
  };

  const event = () => {
    const e = G.events[G.ev], L = PQ.lesson(e.lesson);
    layout(`<div><p class="label">Month ${G.month} · Life happens · ${G.ev % 2 + 1} of 2</p></div>
    <article class="event t-${e.color} pop-in"><span class="label" style="color:inherit; opacity:.8">${esc(e.tag)}</span><h2>${M(e.h)}</h2><p style="font-size:1.05rem">${M(e.p)}</p>
    <div class="choices">${e.choices.map((c, i) => `<button class="ch" type="button" data-c="${i}">${M(c.l)}<span>${c.gain ? "+" + F(c.gain) : c.cost ? (c.credit ? "on credit " : "−") + F(c.cost) : "free"}</span></button>`).join("")}</div></article><div id="outcome"></div>`);
    $$(".ch", app).forEach(b => b.onclick = () => {
      const ch = e.choices[+b.dataset.c]; $$(".ch", app).forEach(x => { x.disabled = true; if (x !== b) x.style.opacity = .45; });
      const notes = [];
      if (ch.gain) { if (ch.to === "split") { G.safety += ch.gain / 2; G.fun += ch.gain / 2; } else G[ch.to] += ch.gain; }
      else if (ch.cost) { if (ch.credit) { G.card += ch.cost; notes.push(`${F(ch.cost)} added to your card at 24% APR.`); } else spend(ch.cost, ch.kind, notes); }
      if (ch.later) { G.later = ch.later; notes.push(`It got worse. Next month brings a ${F(ch.later)} bill.`); }
      if (ch.freeze) { G.freeze = ch.freeze; notes.push(`Your bank froze your account. Expect ${F(ch.freeze)} in fees and lost pay next month.`); }
      G.wise += ch.wise; G.log.push([ch.wise > 0, `${M(e.h)} → ${M(ch.l)}`, ch.wise < 0 ? L : null]);
      const good = ch.wise > 0, bad = ch.wise < 0, last = G.ev % 2 === 1;
      $(".sim-side").outerHTML = side();
      $("#outcome").innerHTML = `<div class="notice ${good ? "good" : bad ? "bad" : ""} pop-in" style="display:grid; gap:6px"><b style="font-family:var(--f-serif); font-size:1.2rem">${good ? "Smart move" : bad ? "Risky move" : "Fair enough"} · ${ch.wise > 0 ? "+" : ""}${ch.wise} points</b><span>${M(ch.msg)}</span>${notes.length ? `<ul style="margin:4px 0 0; padding-left:18px">${notes.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}<span style="font-size:.9rem">Related lesson: <b>${esc(L.title)}</b> (Unit ${L.ui + 1})</span></div>
      <div style="margin-top:14px"><button class="btn btn-primary" type="button" id="evNext">${last ? "See the month's results" : "Next"} ${PQ.ICON.arrow}</button></div>`;
      $("#evNext").onclick = () => { G.ev++; last ? recap() : event(); };
    });
  };

  const recap = () => {
    const interest = G.card > 0 ? Math.round(G.card * .02 * 100) / 100 : 0; G.card += interest; const h = health();
    layout(`<div><p class="label">Month ${G.month} · Results</p><h2 style="margin-top:6px">${G.month < 3 ? "Here's how this month went" : "Three months complete"}</h2></div>
    <div class="calc-out" style="grid-template-columns:repeat(2,1fr)"><div><small>Goal fund</small><b>${F(G.goal)}</b></div><div><small>Safety net</small><b>${F(G.safety)}</b></div><div><small>Fun money carried over</small><b>${F(G.fun)}</b></div><div><small>Card debt</small><b style="color:${G.card > 0 ? "var(--maroon)" : "var(--forest)"}">${F(G.card)}</b></div></div>
    ${interest ? `<div class="notice bad">${PQ.ICON.info}<span>Your card charged <b>${F2(interest)}</b> interest this month. Debt grows while you wait.</span></div>` : ""}
    <div class="notice">${PQ.ICON.bulb}<span>Financial health is <b>${h.total}/100</b>. ${h.gp < .5 ? "Put more toward your goal on payday, before fun money." : h.sp < .5 ? "Your safety net is thin. Even a small buffer stops surprises hitting your goal." : G.card > 0 ? "Clearing the card should be your next priority." : "You're on a strong track. Keep it up."}</span></div>
    <div><button class="btn btn-primary" type="button" id="nm">${G.month < 3 ? "Next payday" : "See my final report"} ${PQ.ICON.arrow}</button></div>`);
    $("#nm").onclick = () => { if (G.month < 3) { G.month++; payday(); } else final(); };
  };

  const final = () => {
    const h = health(), xp = 30 + Math.round(h.total / 2), weak = [...new Map(G.log.filter(x => x[2]).map(x => [x[2].id, x[2]])).values()];
    const rows = [["Goal progress", h.gp, 35, `${F(G.goal)} of ${F(G.goalD.target)}`], ["Safety net", h.sp, 25, `${F(G.safety)} of ${F(G.safetyTarget)}`], ["Debt-free", h.dp, 20, G.card > 0 ? `${F(G.card)} owed` : "No debt"], ["Smart decisions", h.wp, 20, `${G.wise} points`]];
    app.innerHTML = `<div class="lesson" style="max-width:900px"><div class="card result pop-in">${ring(h.total, 120)}<p class="label">${esc(G.name)}'s final report</p><h1>${h.total >= 80 ? "Financially fit!" : h.total >= 55 ? "Solid foundations" : "A tough few months"}</h1>
    <p class="muted">${h.total >= 80 ? "You saved first, kept a safety net and avoided costly traps." : h.total >= 55 ? "Good progress, with a few things to sharpen." : "That's the point of practising. Try a different plan and see the difference."}</p>
    <div style="width:100%; max-width:620px; display:grid; gap:12px; text-align:left">${rows.map(r => `<div class="meter"><div class="top"><span>${r[0]} <small class="muted">(${r[2]} pts)</small></span><span class="num">${Math.round(r[1] * r[2])} pts · ${r[3]}</span></div><div class="bar"><i style="width:${r[1] * 100}%"></i></div></div>`).join("")}</div>
    <div style="width:100%; max-width:620px; text-align:left; display:grid; gap:8px"><p class="label">Your decisions</p>${G.log.map(x => `<div class="kw ${x[0] ? "hit" : "miss"}"><b>${x[0] ? "✓" : "✗"}</b><span>${x[1]}</span></div>`).join("")}</div>
    ${weak.length ? `<div style="width:100%; max-width:620px; text-align:left; display:grid; gap:8px"><p class="label">Lessons that would help</p>${weak.map(l => `<a class="card" style="padding:12px 16px; text-decoration:none; display:flex; justify-content:space-between; gap:10px" href="#lesson-${l.id}"><span><b>${esc(l.title)}</b><br><small class="muted">Unit ${l.ui + 1}: ${esc(l.unit.title)}</small></span>${PQ.ICON.arrow.replace("<svg", '<svg width="18"')}</a>`).join("")}</div>` : ""}
    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center"><button class="btn btn-primary" type="button" id="again">Play again</button><a class="btn btn-line" href="#sim-budget">Plan my real budget</a></div></div></div>`;
    $("#again").onclick = setup;
    PQ.stat("sims"); PQ.stat("simBest", h.total, "max"); PQ.addXP(xp, "life simulator"); if (h.total >= 80) PQ.confetti();
  };
  setup();
};

/* ================= BUDGET BUILDER ================= */
const EXAMPLE_PLAN = { income: [["Part-time job (net)", 520], ["Allowance", 60]], exp: [["Phone plan", 25, "need"], ["Bus pass", 40, "need"], ["Snacks & drinks", 60, "want"], ["Going out with friends", 80, "want"], ["Streaming & games", 20, "want"], ["Savings for goal", 150, "save"], ["Emergency fund", 50, "save"]] };
TOOL.budget = (app, t) => {
  const S = PQ.S(); let plan = S.plan ? JSON.parse(JSON.stringify(S.plan)) : JSON.parse(JSON.stringify(EXAMPLE_PLAN)); const isExample = !S.plan;
  app.innerHTML = head(t, "Use your real numbers for a typical month. Everything stays in this browser.") + `${isExample ? `<div class="notice" style="margin-bottom:16px">${PQ.ICON.info}<span>These are <b>example numbers</b>. Replace them with your own, then press Save.</span></div>` : ""}
  <div class="grid2" style="align-items:start"><div class="stack">
    <div class="card panel stack"><h3>Money coming in</h3><div id="incRows" class="stack" style="gap:8px"></div><button class="btn btn-soft btn-sm" type="button" id="addInc" style="width:fit-content">${PQ.ICON.plus} Add income</button></div>
    <div class="card panel stack"><h3>Money going out</h3><p class="muted" style="font-size:.88rem">Tag each line as a need, a want or savings.</p><div id="expRows" class="stack" style="gap:8px"></div><button class="btn btn-soft btn-sm" type="button" id="addExp" style="width:fit-content">${PQ.ICON.plus} Add a line</button></div>
  </div>
  <div class="card panel stack sticky-panel"><h3>Your plan</h3><div style="display:flex; gap:18px; align-items:center; flex-wrap:wrap"><svg class="donut" viewBox="0 0 42 42" id="donut"></svg><div class="stack" style="gap:8px; flex:1; min-width:160px" id="split"></div></div><div id="tips" class="stack" style="gap:8px"></div><button class="btn btn-primary" type="button" id="savePlan">Save my plan</button></div></div>`;
  const row = (arr, i, kind) => `<div class="exp-row ${kind === "exp" ? "exp4" : ""}"><input class="input" data-k="${kind}" data-i="${i}" data-f="0" value="${esc(arr[i][0])}" aria-label="Name"><input class="input" type="number" min="0" data-k="${kind}" data-i="${i}" data-f="1" value="${arr[i][1]}" aria-label="Amount">${kind === "exp" ? `<select class="input" data-k="exp" data-i="${i}" data-f="2" aria-label="Type" style="padding:10px 8px">${["need", "want", "save"].map(o => `<option value="${o}" ${arr[i][2] === o ? "selected" : ""}>${{ need: "Need", want: "Want", save: "Savings" }[o]}</option>`).join("")}</select>` : ""}<button class="iconbtn" type="button" data-del="${kind}" data-i="${i}" aria-label="Remove">${PQ.ICON.close}</button></div>`;
  const draw = () => {
    $("#incRows").innerHTML = plan.income.map((r, i) => row(plan.income, i, "inc")).join(""); $("#expRows").innerHTML = plan.exp.map((r, i) => row(plan.exp, i, "exp")).join("");
    $$("[data-k]", app).forEach(el => el.addEventListener("input", () => { const a = el.dataset.k === "inc" ? plan.income : plan.exp; a[+el.dataset.i][+el.dataset.f] = el.dataset.f === "1" ? (parseFloat(el.value) || 0) : el.value; calc(); }));
    $$("[data-del]", app).forEach(b => b.onclick = () => { (b.dataset.del === "inc" ? plan.income : plan.exp).splice(+b.dataset.i, 1); draw(); });
    calc();
  };
  const calc = () => {
    const inc = plan.income.reduce((s, r) => s + (+r[1] || 0), 0), by = { need: 0, want: 0, save: 0 }; plan.exp.forEach(r => by[r[2]] += +r[1] || 0);
    const out = by.need + by.want + by.save, left = inc - out, base = Math.max(inc, out, 1);
    const segs = [["need", "#B4CCCF", "Needs"], ["want", "#FFC49B", "Wants"], ["save", "#8FB78F", "Savings"]]; let off = 25, svg = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="#DCE8E9" stroke-width="6"/>`;
    segs.forEach(([k, col]) => { const p = by[k] / base * 100; if (p > 0) svg += `<circle cx="21" cy="21" r="15.9" fill="none" stroke="${col}" stroke-width="6" stroke-dasharray="${p} ${100 - p}" stroke-dashoffset="${off}"/>`; off -= p; });
    svg += `<text x="21" y="20" text-anchor="middle" font-size="4" font-weight="700" fill="#4A6878" font-family="Manrope">Left over</text><text x="21" y="26" text-anchor="middle" font-size="5.4" font-weight="600" fill="${left < 0 ? "#7A1E3A" : "#1B3B4D"}" font-family="Fraunces, Georgia">${F(left)}</text>`;
    $("#donut").innerHTML = svg;
    const pct = k => inc ? Math.round(by[k] / inc * 100) : 0, rec = { need: 50, want: 30, save: 20 };
    $("#split").innerHTML = segs.map(([k, col, n]) => `<div class="meter"><div class="top"><span><span style="display:inline-block; width:10px; height:10px; border-radius:3px; background:${col}; margin-right:6px"></span>${n} · ${F(by[k])}</span><span class="num">${pct(k)}% <small class="muted">(guide ${rec[k]}%)</small></span></div></div>`).join("") + `<div class="meter"><div class="top"><span>Income</span><span class="num">${F(inc)}</span></div></div>`;
    const tips = [];
    if (left < 0) tips.push(["bad", `You're planning to spend ${F(-left)} more than you earn. Cut wants first.`]);
    else if (left > 0) tips.push(["", `${F(left)} has no job yet. Give it one: savings, a goal or a sinking fund.`]);
    if (pct("save") >= 20) tips.push(["good", `You're saving ${pct("save")}% of your income. That beats the 20% guideline.`]); else tips.push(["bad", `You're saving ${pct("save")}%. Try to reach 20% by paying yourself first.`]);
    if (pct("want") > 30) tips.push(["bad", `Wants are ${pct("want")}% of income. The guide is about 30%. Look for budget leaks.`]);
    if (!plan.exp.some(r => /emergenc|safety/i.test(r[0]))) tips.push(["", "Add an emergency fund line, even a small one."]);
    $("#tips").innerHTML = tips.map(([c, txt]) => `<div class="notice ${c}">${c === "good" ? PQ.ICON.check : PQ.ICON.bulb}<span>${txt}</span></div>`).join("");
  };
  $("#addInc").onclick = () => { plan.income.push(["New income", 0]); draw(); };
  $("#addExp").onclick = () => { plan.exp.push(["New expense", 0, "want"]); draw(); };
  $("#savePlan").onclick = () => { S.plan = plan; PQ.save(); PQ.toast("<b>Plan saved</b> in this browser"); if (!S.stats.planSaved) PQ.addXP(20, "first budget plan"); PQ.stat("planSaved"); };
  draw();
};

/* ================= GOAL PLANNER ================= */
TOOL.goal = (app, t) => {
  const S = PQ.S(), gp = S.goalPlan || { name: "New laptop", cost: 650, saved: 80, months: 5, income: 0 };
  app.innerHTML = head(t, "A SMART goal has an amount and a deadline. Fill in yours and get a weekly plan.") + `<div class="grid2" style="align-items:start"><div class="card panel stack">
    <div class="field"><label for="gName">What are you saving for?</label><input class="input" id="gName" value="${esc(gp.name)}"></div>
    ${num("gCost", "How much does it cost?", gp.cost, { money: true })}${num("gSaved", "How much have you already saved?", gp.saved, { money: true })}${num("gMonths", "How many months until you want it?", gp.months, { min: 1, step: 1, suf: "months" })}
    ${num("gIncome", "Your monthly take-home pay (optional)", gp.income, { money: true, hint: "Used to show what share of your income the goal needs." })}
  </div><div class="card panel stack"><h3 id="gTitle"></h3><div class="calc-out"><div class="hl"><small>Save each week</small><b id="gWeek"></b></div><div><small>Save each month</small><b id="gMonth"></b></div><div><small>Still to save</small><b id="gLeft"></b></div></div><canvas class="chart" id="gChart" aria-label="Savings plan chart"></canvas><div id="gTips" class="stack" style="gap:8px"></div><button class="btn btn-primary" type="button" id="gSave">Save my goal</button></div></div>`;
  const calc = () => {
    const name = $("#gName").value || "Your goal", cost = val("gCost"), saved = val("gSaved"), months = Math.max(1, Math.round(val("gMonths"))), inc = val("gIncome");
    const left = Math.max(0, cost - saved), pm = left / months, pw = left / (months * 52 / 12);
    $("#gTitle").textContent = `${name}: ${F(cost)} in ${months} month${months > 1 ? "s" : ""}`; $("#gWeek").textContent = F2(pw); $("#gMonth").textContent = F2(pm); $("#gLeft").textContent = F(left);
    chart($("#gChart"), [{ pts: Array.from({ length: months + 1 }, (_, i) => saved + pm * i), color: "#28536B", fill: "rgba(143,183,143,.35)" }, { pts: Array.from({ length: months + 1 }, () => cost), color: "#F3A5BC", dash: [6, 5], width: 2 }], { xLabel: i => "M" + i });
    const tips = [];
    if (left === 0) tips.push(["good", "You've already got enough. Nice!"]);
    if (inc > 0) { const share = pm / inc * 100; tips.push([share > 50 ? "bad" : share > 25 ? "" : "good", `This needs ${share.toFixed(0)}% of your monthly pay. ${share > 50 ? "Consider a longer timeline or a cheaper option." : share > 25 ? "Doable with a tight budget." : "Very achievable."}`]); }
    const faster = Math.ceil(left / (pw + 5) / (52 / 12)); if (left > 0 && faster < months) tips.push(["", `Save ${F(Math.ceil(pw + 5))} a week instead and you'd get there in about ${faster} month${faster > 1 ? "s" : ""}.`]);
    tips.push(["", "Make it automatic: set up a weekly transfer on payday."]);
    $("#gTips").innerHTML = tips.map(([c, x]) => `<div class="notice ${c}">${PQ.ICON.bulb}<span>${x}</span></div>`).join("");
    return { name, cost, saved, months, income: inc };
  };
  $$("input", app).forEach(i => i.addEventListener("input", calc)); calc(); onResize(calc);
  $("#gSave").onclick = () => { S.goalPlan = calc(); PQ.save(); PQ.toast("<b>Goal saved</b> in this browser"); if (!S.stats.goalSaved) PQ.addXP(15, "goal plan"); PQ.stat("goalSaved"); };
};

/* ================= PAYCHECK CALCULATOR ================= */
TOOL.pay = (app, t) => {
  app.innerHTML = head(t, "Estimate what lands in your account. Rates vary by country, so adjust them to match where you live.") + `<div class="grid2" style="align-items:start"><div class="card panel stack">
    ${num("pRate", "Hourly pay", 12.5, { money: true })}${num("pHours", "Hours per week", 15, { suf: "hours" })}
    ${num("pTax", "Income tax rate", 5, { suf: "%", hint: "Many teens pay little or no income tax because of tax-free allowances." })}${num("pSoc", "Social insurance rate", 7.65, { suf: "%", hint: "7.65% is the US rate. Others differ." })}${num("pPen", "Pension or retirement contribution", 0, { suf: "%" })}
  </div><div class="stack"><div class="card panel stack"><h3>Your estimated pay</h3><div class="calc-out"><div><small>Gross per month</small><b id="pG"></b></div><div><small>Deductions per month</small><b id="pD"></b></div><div class="hl"><small>Take-home per month</small><b id="pN"></b></div></div><p class="muted" id="pY"></p></div>
    <div class="card panel stack"><h3>What does it really cost?</h3><p class="muted" style="font-size:.92rem">Enter a price to see how many hours of work it takes, after deductions.</p>${num("pPrice", "Price of something you want", 120, { money: true })}<div class="notice good">${PQ.ICON.info}<span id="pHrs"></span></div></div></div></div>`;
  const calc = () => {
    const gross = val("pRate") * val("pHours") * 52 / 12, ded = gross * (val("pTax") + val("pSoc") + val("pPen")) / 100, net = gross - ded, netHr = val("pRate") * (1 - (val("pTax") + val("pSoc") + val("pPen")) / 100);
    $("#pG").textContent = F(gross); $("#pD").textContent = F(ded); $("#pN").textContent = F(net);
    $("#pY").textContent = `That's about ${F(net * 12)} a year take-home, or ${F2(netHr)} for each hour you work.`;
    const hrs = netHr > 0 ? val("pPrice") / netHr : 0; $("#pHrs").innerHTML = `<b>${hrs.toFixed(1)} hours</b> of work (about ${(hrs / Math.max(1, val("pHours"))).toFixed(1)} weeks at your usual hours).`;
  };
  $$("input", app).forEach(i => i.addEventListener("input", calc)); calc();
};

/* ================= DEBT PAYOFF LAB ================= */
TOOL.debt = (app, t) => {
  app.innerHTML = head(t, "Credit card interest grows every month you carry a balance. See what different payments really cost.") + `<div class="grid2" style="align-items:start"><div class="card panel stack">
    ${num("dBal", "Balance owed", 800, { money: true })}${num("dApr", "APR (yearly interest rate)", 24, { suf: "%" })}${num("dPay", "Your monthly payment", 40, { money: true })}
    <div class="notice">${PQ.ICON.bulb}<span>The minimum payment on many cards is about 2–3% of the balance. Try it and compare.</span></div>
  </div><div class="card panel stack"><div class="calc-out"><div class="hl"><small>Time to clear</small><b id="dT"></b></div><div><small>Interest paid</small><b id="dI"></b></div><div><small>Total paid</small><b id="dP"></b></div></div>
    <canvas class="chart" id="dChart" aria-label="Balance over time"></canvas><div class="legend"><span style="--sw:#28536B">Your payment</span><span style="--sw:#8FB78F">Double your payment</span><span style="--sw:#F3A5BC">Minimum (2.5%, at least ${F(15)})</span></div><div id="dTips" class="stack" style="gap:8px"></div></div></div>`;
  const run = (bal, apr, payFn, cap = 600) => { const r = apr / 100 / 12; let b = bal, m = 0, int = 0; const pts = [b]; while (b > 0.005 && m < cap) { const i = b * r; int += i; b += i; const p = Math.min(b, payFn(b)); if (p <= i && m > 1) return { never: true, pts, int, m }; b -= p; m++; pts.push(b); } return { m, int, pts, never: b > 0.005 }; };
  const calc = () => {
    const bal = val("dBal"), apr = val("dApr"), pay = val("dPay");
    const mine = run(bal, apr, () => pay), dbl = run(bal, apr, () => pay * 2), min = run(bal, apr, b => Math.max(15, b * .025));
    const yrs = m => m >= 12 ? `${Math.floor(m / 12)} yr ${m % 12} mo` : `${m} months`;
    if (mine.never) { $("#dT").textContent = "Never"; $("#dI").textContent = "—"; $("#dP").textContent = "—"; }
    else { $("#dT").textContent = yrs(mine.m); $("#dI").textContent = F(mine.int); $("#dP").textContent = F(bal + mine.int); }
    const len = Math.min(240, Math.max(mine.pts.length, dbl.pts.length, min.pts.length));
    const pad = p => Array.from({ length: len }, (_, i) => p[i] ?? 0);
    chart($("#dChart"), [{ pts: pad(min.pts), color: "#F3A5BC", width: 2 }, { pts: pad(mine.pts), color: "#28536B" }, { pts: pad(dbl.pts), color: "#8FB78F" }], { xLabel: i => i ? i + "m" : "0" });
    const tips = [];
    if (mine.never) tips.push(["bad", `Your payment doesn't even cover the interest (${F2(bal * apr / 1200)} a month). The balance will never go down.`]);
    if (!dbl.never && !mine.never) tips.push(["good", `Paying ${F(pay * 2)} a month clears it in ${yrs(dbl.m)} and saves ${F(mine.int - dbl.int)} in interest.`]);
    if (!min.never) tips.push(["bad", `Paying only the minimum takes ${yrs(min.m)} and costs ${F(min.int)} in interest.`]);
    $("#dTips").innerHTML = tips.map(([c, x]) => `<div class="notice ${c}">${PQ.ICON.info}<span>${x}</span></div>`).join("");
  };
  $$("input", app).forEach(i => i.addEventListener("input", calc)); calc(); onResize(calc);
};

/* ================= GROWTH LAB ================= */
TOOL.grow = (app, t) => {
  app.innerHTML = head(t, "Compound growth turns small, regular amounts into large sums over time. The earlier you start, the more time does the work.") + `<div class="grid2" style="align-items:start"><div class="card panel stack">
    <div class="alloc-row"><div class="top"><label for="wM"><b>Invest each month</b></label><output id="wMo"></output></div><input type="range" id="wM" min="10" max="500" step="10" value="50"></div>
    <div class="alloc-row"><div class="top"><label for="wA"><b>Start at age</b></label><output id="wAo"></output></div><input type="range" id="wA" min="14" max="45" step="1" value="16"></div>
    <div class="alloc-row"><div class="top"><label for="wR"><b>Average yearly return</b><br><small class="muted">Long-run stock averages have been around 7%, but it's never guaranteed</small></label><output id="wRo"></output></div><input type="range" id="wR" min="1" max="10" step="0.5" value="7"></div>
    <div class="notice" id="wCmp"></div>
  </div><div class="card panel stack"><div class="calc-out"><div><small>You put in</small><b id="wIn"></b></div><div><small>Growth earned</small><b id="wGain"></b></div><div class="hl"><small>At age 65</small><b id="wTot"></b></div></div><canvas class="chart" id="wChart" aria-label="Growth chart"></canvas><div class="legend"><span style="--sw:#28536B">Total value</span><span style="--sw:#8FB78F">What you put in</span></div></div></div>`;
  let touched = false;
  const calc = () => {
    const m = val("wM"), a = val("wA"), r = val("wR") / 100 / 12, yrs = 65 - a;
    $("#wMo").textContent = F(m); $("#wAo").textContent = a; $("#wRo").textContent = val("wR") + "%";
    const fv = y => { let b = 0; for (let i = 0; i < y * 12; i++) b = b * (1 + r) + m; return b; };
    const pts = Array.from({ length: yrs + 1 }, (_, y) => fv(y)), inv = Array.from({ length: yrs + 1 }, (_, y) => m * 12 * y), tot = pts[yrs];
    $("#wIn").textContent = F(inv[yrs]); $("#wGain").textContent = F(tot - inv[yrs]); $("#wTot").textContent = F(tot);
    chart($("#wChart"), [{ pts, color: "#28536B", fill: "rgba(180,204,207,.45)" }, { pts: inv, color: "#8FB78F", fill: "rgba(203,230,199,.6)" }], { xLabel: i => "age " + (a + i) });
    const late = yrs > 10 ? fv(yrs - 10) : 0;
    $("#wCmp").innerHTML = `${PQ.ICON.bulb}<span>${late ? `If you wait 10 years and start at ${a + 10}, you'd have about <b>${F(late)}</b>. Starting now is worth <b>${F(tot - late)}</b> more.` : "Starting later leaves less time for growth to compound."}</span>`;
  };
  $$("input", app).forEach(i => i.addEventListener("input", () => { calc(); if (!touched) { touched = true; PQ.addXP(5, "explored compound growth"); } }));
  calc(); onResize(calc);
};
})();
