/* Progress: level, streaks, daily goal, activity, unit mastery, badges and settings. */
(function () {
"use strict";
const PQ = window.PQ, $ = PQ.$, $$ = PQ.$$, esc = PQ.esc;

PQ.views.progress = (p, app) => {
  const S = PQ.S(), lp = PQ.levelProgress(), st = S.stats;
  const done = Object.values(S.lessons).filter(x => x.done).length, acc = st.answered ? Math.round(st.correct / st.answered * 100) : 0;
  const earned = PQ.BADGES.filter(b => S.badges[b.id]).length;
  const days = []; const t = new Date(); t.setHours(12, 0, 0, 0); t.setDate(t.getDate() - 13);
  for (let i = 0; i < 14; i++) { const k = PQ.dayKey(t); days.push({ k, xp: S.days[k] || 0, l: t.toLocaleDateString("en-GB", { weekday: "narrow" }), d: t.getDate() }); t.setDate(t.getDate() + 1); }
  const maxXp = Math.max(S.goal, ...days.map(d => d.xp));
  const groups = [...new Set(PQ.BADGES.map(b => b.g))];
  app.innerHTML = `<div class="head"><div><p class="label">Progress</p><h1 style="margin-top:6px">Your <em class="it">achievements</em></h1></div><p class="muted">Earn XP from lessons, games and the simulator. Keep a streak by earning XP every day.</p></div>
  <div class="prof">
    <div class="prof-hero"><p class="label" style="color:var(--pistachio)">Level ${lp.n}</p><h2>${PQ.levelTitle()}</h2>
      <div><div class="bar"><i style="width:${lp.pct}%"></i></div><p style="font-size:.88rem; margin-top:6px">${lp.into} / ${lp.need} XP to level ${lp.n + 1}: ${PQ.levelTitle(lp.n + 1)}</p></div>
      <div class="mini"><div><b>${S.xp.toLocaleString()}</b><small>total XP</small></div><div><b>${PQ.streak()}</b><small>day streak</small></div><div><b>${done}/${PQ.LESSONS.length}</b><small>lessons</small></div><div><b>${acc}%</b><small>accuracy</small></div></div></div>
    <div class="card panel stack"><div style="display:flex; justify-content:space-between; gap:12px; align-items:center; flex-wrap:wrap"><div><p class="label">Daily goal</p><h3 style="margin-top:4px">${PQ.todayXp()} / ${S.goal} XP today</h3></div>${PQ.goalRing(64)}</div>
      <div class="goalpick">${[[10, "Casual"], [30, "Regular"], [50, "Serious"], [100, "Intense"]].map(([n, l]) => `<button class="pick" type="button" data-goal="${n}" aria-pressed="${S.goal === n}" style="text-align:center">${l}<small>${n} XP/day</small></button>`).join("")}</div>
      <div><p class="label" style="margin-bottom:6px">This week · best streak ${PQ.bestStreak()} days</p>${PQ.weekDots()}</div></div>
  </div>
  <div class="grid2" style="margin-bottom:26px">
    <div class="card chartbox"><p class="label">Last 14 days</p><h3 style="margin:4px 0 14px">XP earned each day</h3>
      <div style="display:grid; grid-template-columns:repeat(14,1fr); gap:6px; align-items:end; height:150px; position:relative">
        <div style="position:absolute; left:0; right:0; bottom:${S.goal / maxXp * 100}%; border-top:2px dashed var(--orchid)" title="Daily goal"></div>
        ${days.map(d => `<div style="display:flex; flex-direction:column; justify-content:flex-end; height:100%" title="${d.k}: ${d.xp} XP"><div style="height:${Math.max(d.xp ? 4 : 2, d.xp / maxXp * 100)}%; border-radius:6px 6px 2px 2px; background:${d.xp >= S.goal ? "var(--matcha)" : d.xp ? "var(--azure)" : "var(--azure-tint)"}"></div></div>`).join("")}
      </div><div style="display:grid; grid-template-columns:repeat(14,1fr); gap:6px; text-align:center; font-size:.7rem; font-weight:700; color:var(--ink-soft); margin-top:6px">${days.map(d => `<span>${d.d}</span>`).join("")}</div>
      <div class="legend" style="margin-top:10px"><span style="--sw:var(--matcha)">Goal reached</span><span style="--sw:var(--azure)">Some XP</span><span style="--sw:var(--orchid)">Daily goal line</span></div></div>
    <div class="card chartbox"><p class="label">Unit mastery</p><h3 style="margin:4px 0 14px">Lessons completed</h3><div class="stack" style="gap:10px">${PQ.UNITS.map((u, i) => { const d = u.lessons.filter(l => (S.lessons[l.id] || {}).done).length, pf = u.lessons.filter(l => (S.lessons[l.id] || {}).perfect).length; return `<div class="meter"><div class="top"><span>${i + 1}. ${esc(u.title)}</span><span class="num">${d}/${u.lessons.length}${pf ? ` · ${pf}★` : ""}</span></div><div class="bar"><i style="width:${d / u.lessons.length * 100}%; background:${PQ.COLORS[u.color][0]}"></i></div></div>`; }).join("")}</div></div>
  </div>
  <div class="head" style="margin-bottom:14px"><div><p class="label">Badges</p><h2 style="margin-top:4px">${earned} of ${PQ.BADGES.length} unlocked</h2></div></div>
  ${groups.map(gname => `<section class="badge-sec"><h3>${esc(gname)}</h3><div class="badges">${PQ.BADGES.filter(b => b.g === gname).map(b => { const [c, m] = b.p(), got = !!S.badges[b.id]; return `<div class="bdg ${got ? "" : "locked"}">${PQ.medal(b)}<div><h4>${esc(b.t)}</h4><p>${esc(b.d)}</p>${got ? `<p style="color:var(--forest); font-weight:800; margin-top:4px">Unlocked</p>` : `<div class="bar"><i style="width:${Math.min(100, c / m * 100)}%"></i></div><p style="margin-top:3px">${Math.min(c, m).toLocaleString()} / ${m.toLocaleString()}</p>`}</div></div>`; }).join("")}</div></section>`).join("")}
  <div class="grid2"><div class="card panel stack"><h3>Game stats</h3><div class="calc-out" style="grid-template-columns:repeat(3,1fr)">
    <div><small>Quizzes</small><b>${st.quizzes}</b></div><div><small>Blurts</small><b>${st.blurts}</b></div><div><small>Best blurt</small><b>${st.blurtBest}%</b></div><div><small>Flashcards</small><b>${st.flash}</b></div><div><small>Speed best</small><b>${st.speedBest}</b></div><div><small>Simulator best</small><b>${st.simBest}</b></div></div></div>
    <div class="card panel stack"><h3>Settings</h3><div class="field"><label for="curSel">Currency symbol</label><select class="input" id="curSel">${[["$", "$ Dollar"], ["£", "£ Pound"], ["€", "€ Euro"], ["₹", "₹ Rupee"], ["A$", "A$ Australian dollar"], ["C$", "C$ Canadian dollar"], ["R", "R Rand"], ["₦", "₦ Naira"]].map(([v, l]) => `<option value="${v}" ${S.cur === v ? "selected" : ""}>${l}</option>`).join("")}</select><small>Changes how money appears in every lesson and tool.</small></div>
      <p class="muted" style="font-size:.88rem">Your progress is saved in this browser only. Clearing your browser data will reset it.</p><div id="resetBox"><button class="btn btn-line" type="button" id="resetBtn">Reset all progress</button></div></div></div>`;
  $$("[data-goal]", app).forEach(b => b.onclick = () => { S.goal = +b.dataset.goal; PQ.save(); PQ.renderHud(); PQ.views.progress(p, app); PQ.toast(`Daily goal set to <b>${S.goal} XP</b>`); });
  $("#curSel").onchange = e => { S.cur = e.target.value; PQ.save(); PQ.toast("Currency updated"); };
  const bindReset = () => $("#resetBtn").onclick = () => {
    $("#resetBox").innerHTML = `<div class="notice bad" style="align-items:center; flex-wrap:wrap"><span style="flex:1 1 200px">Erase all XP, lessons, badges and plans? This can't be undone.</span><button class="btn btn-bad btn-sm" type="button" id="rYes">Erase everything</button><button class="btn btn-line btn-sm" type="button" id="rNo">Cancel</button></div>`;
    $("#rNo").onclick = () => { $("#resetBox").innerHTML = '<button class="btn btn-line" type="button" id="resetBtn">Reset all progress</button>'; bindReset(); };
    $("#rYes").onclick = () => { PQ.reset(); PQ.toast("Progress reset"); PQ.views.progress(p, app); };
  };
  bindReset();
};
})();
