/* Learn: course path, lesson player and the shared question engine. */
(function () {
"use strict";
const PQ = window.PQ, $ = PQ.$, $$ = PQ.$$, M = PQ.money, esc = PQ.esc;

/* ================= QUESTION ENGINE ================= */
const TYPE_LABEL = { mcq: "Multiple choice", tf: "True or false", fill: "Fill in the blank", order: "Put in order", sort: "Drag and sort", match: "Match the pairs", num: "Work it out", write: "Write your answer" };
const norm = s => String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9%'\- ]/g, " ").replace(/\s+/g, " ").trim();

/* Renders q into host. done(ok) is called after the learner presses Continue. opts.compact hides the type pill. */
PQ.renderQuestion = (q, host, done, opts = {}) => {
  host.innerHTML = `<div class="card q pop-in">
    <div class="qtype"><span class="pill t-azure">${TYPE_LABEL[q.t]}</span>${opts.tag ? `<span class="pill t-pistachio">${esc(opts.tag)}</span>` : ""}</div>
    <div class="prompt">${M(q.t === "tf" ? "True or false? " + q.q : q.q)}</div>
    <div class="qbody"></div>
  </div>
  <div class="checkbar"><button class="btn btn-soft" type="button" data-skip>Skip</button><button class="btn btn-primary" type="button" data-check disabled>Check</button></div>`;
  const body = $(".qbody", host), checkBtn = $("[data-check]", host), skipBtn = $("[data-skip]", host);
  const ready = v => { checkBtn.disabled = !v; };
  let evaluate;
  const R = RENDER[q.t];
  evaluate = R(q, body, ready);
  const finish = (res) => {
    checkBtn.disabled = true; skipBtn.disabled = true; host.querySelectorAll("button, input, textarea").forEach(b => { if (!b.closest(".sheet")) b.disabled = true; });
    host.querySelectorAll(".tilew").forEach(t => t.style.pointerEvents = "none");
    showSheet(res, () => done(res.ok, res));
  };
  checkBtn.onclick = () => finish(evaluate());
  skipBtn.onclick = () => { const r = evaluate(true); r.ok = false; r.skipped = true; finish(r); };
  const onKey = e => { if (e.key === "Enter" && !checkBtn.disabled && !(e.target.tagName === "TEXTAREA") && !document.querySelector(".sheet")) { e.preventDefault(); checkBtn.click(); } };
  host.addEventListener("keydown", onKey);
};

function showSheet(res, cont) {
  const s = document.createElement("div");
  s.className = "sheet " + (res.partial ? "neutral" : res.ok ? "good" : "bad");
  const head = res.ok ? ["Nice work!", "Well done!", "Exactly right!", "You got it!"][Math.floor(Math.random() * 4)] : res.skipped ? "Skipped" : "Not quite";
  s.innerHTML = `<div class="in"><div><h3>${res.partial ? res.partial : head}</h3>${res.answer && !res.ok ? `<p><b>Answer:</b> ${res.answer}</p>` : ""}${res.e ? `<p>${M(res.e)}</p>` : ""}</div><button class="btn ${res.ok ? "btn-good" : "btn-bad"}" type="button">Continue</button></div>`;
  document.body.appendChild(s);
  const b = $("button", s); b.focus({ preventScroll: true });
  b.onclick = () => { s.remove(); cont(); };
}

const RENDER = {
  mcq(q, body, ready) {
    const order = PQ.shuffle(q.o.map((o, i) => i));
    body.innerHTML = `<div class="opts">${order.map((i, k) => `<button class="opt" type="button" data-i="${i}"><kbd>${k + 1}</kbd>${M(q.o[i])}</button>`).join("")}</div>`;
    let sel = null; const btns = $$(".opt", body);
    btns.forEach(b => b.onclick = () => { btns.forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = +b.dataset.i; ready(true); });
    body.closest(".q").parentElement.addEventListener("keydown", e => { const n = +e.key; if (n >= 1 && n <= btns.length && !btns[0].disabled) btns[n - 1].click(); });
    return () => { const ok = sel === q.a; btns.forEach(b => { if (+b.dataset.i === q.a) b.classList.add("right"); else if (+b.dataset.i === sel) b.classList.add("wrong"); }); return { ok, answer: M(q.o[q.a]), e: q.e }; };
  },
  tf(q, body, ready) {
    body.innerHTML = `<div class="tf"><button class="opt" type="button" data-v="1">True</button><button class="opt" type="button" data-v="0">False</button></div>`;
    let sel = null; const btns = $$(".opt", body);
    btns.forEach(b => b.onclick = () => { btns.forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = b.dataset.v === "1"; ready(true); });
    return () => { const ok = sel === q.a; btns.forEach(b => { const v = b.dataset.v === "1"; if (v === q.a) b.classList.add("right"); else if (v === sel) b.classList.add("wrong"); }); return { ok, answer: q.a ? "True" : "False", e: q.e }; };
  },
  fill(q, body, ready) {
    const parts = M(q.s).split("___"); const n = parts.length - 1; const vals = Array(n).fill(null);
    const typed = !q.bank;
    body.innerHTML = `<p class="sentence">${parts.map((p, i) => esc(p) + (i < n ? (typed ? `<span class="blank"><input type="text" id="fb${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Blank ${i + 1}"></span>` : `<span class="blank" data-b="${i}" tabindex="0" role="button" aria-label="Blank ${i + 1}">&nbsp;</span>`) : "")).join("")}</p>${typed ? '<p class="muted" style="font-size:.88rem">Type your answer in the gap.</p>' : `<div class="bank">${PQ.shuffle(q.bank).map(w => `<button class="tilew" type="button" data-w="${esc(w)}">${esc(w)}</button>`).join("")}</div>`}`;
    const update = () => ready(typed ? $$("input", body).every(i => i.value.trim()) : vals.every(v => v));
    if (typed) { $$("input", body).forEach(i => i.addEventListener("input", update)); setTimeout(() => $("input", body)?.focus({ preventScroll: true }), 50); }
    else {
      const blanks = $$(".blank", body), tiles = $$(".tilew", body);
      const draw = () => { blanks.forEach((b, i) => { b.textContent = vals[i] ? vals[i].dataset.w : " "; b.classList.toggle("filled", !!vals[i]); }); tiles.forEach(t => t.classList.toggle("used", vals.includes(t))); update(); };
      tiles.forEach(t => t.onclick = () => { if (vals.includes(t)) return; const i = vals.indexOf(null); if (i >= 0) { vals[i] = t; draw(); } });
      blanks.forEach((b, i) => { const clear = () => { vals[i] = null; draw(); }; b.onclick = clear; b.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clear(); } }; });
    }
    return () => {
      let ok = true;
      const given = typed ? $$("input", body).map(i => i.value) : vals.map(v => v ? v.dataset.w : "");
      const targets = typed ? $$(".blank", body) : $$(".blank", body);
      given.forEach((g, i) => { const accept = [q.a[i], ...((q.alt && q.alt[i]) || [])].map(norm); const r = accept.includes(norm(g)); if (!r) ok = false; targets[i].classList.add(r ? "right" : "wrong"); });
      return { ok, answer: q.a.join(", "), e: q.e };
    };
  },
  order(q, body, ready) {
    body.innerHTML = `<div class="answer-row" data-drop="ans"></div><p class="muted" style="font-size:.85rem; margin:4px 0 0">Tap a step to add or remove it, or drag it into place.</p><div class="bank" data-drop="bank"></div>`;
    const ans = $(".answer-row", body), bank = $(".bank", body);
    let items = PQ.shuffle(q.items.map((t, i) => i)); if (items.every((v, i) => v === i)) items.reverse();
    items.forEach(i => { const t = document.createElement("div"); t.className = "tilew"; t.tabIndex = 0; t.setAttribute("role", "button"); t.dataset.i = i; t.textContent = M(q.items[i]); bank.appendChild(t);
      PQ.drag(t, { onTap: () => { (t.parentElement === ans ? bank : ans).appendChild(t); upd(); }, onDrop: z => { if (z === ans || z.closest(".answer-row")) ans.appendChild(t); else bank.appendChild(t); upd(); } }); });
    const upd = () => ready(bank.children.length === 0);
    return () => { const got = $$(".tilew", ans).map(t => +t.dataset.i); const ok = got.length === q.items.length && got.every((v, i) => v === i); $$(".tilew", ans).forEach((t, i) => t.classList.add(+t.dataset.i === i ? "right" : "wrong")); return { ok, answer: q.items.map((s, i) => `${i + 1}. ${M(s)}`).join(" → "), e: q.e }; };
  },
  sort(q, body, ready) {
    body.innerHTML = `<p class="muted" style="font-size:.88rem">Drag each card into a group, or tap a card and then tap a group.</p><div class="bank" data-drop="bank"></div><div class="buckets">${q.groups.map((g, i) => `<div class="bucket" data-drop="g${i}" data-g="${i}" tabindex="0" role="button" aria-label="${esc(g)}"><h4 class="${["t-pistachio", "t-orchid", "t-azure", "t-peach"][i]}">${esc(g)}</h4></div>`).join("")}</div>`;
    const bank = $(".bank", body), buckets = $$(".bucket", body); let sel = null;
    PQ.shuffle(q.items).forEach(([txt, g]) => { const t = document.createElement("div"); t.className = "tilew"; t.tabIndex = 0; t.setAttribute("role", "button"); t.dataset.g = g; t.textContent = M(txt); bank.appendChild(t);
      PQ.drag(t, { onTap: () => { if (sel === t) { t.classList.remove("sel"); sel = null; return; } $$(".tilew", body).forEach(x => x.classList.remove("sel")); if (t.parentElement !== bank) { bank.appendChild(t); upd(); return; } sel = t; t.classList.add("sel"); t.style.borderColor = "var(--indigo)"; }, onDrop: z => { const b = z.closest(".bucket"); (b || bank).appendChild(t); upd(); } }); });
    buckets.forEach(b => { const put = () => { if (sel) { b.appendChild(sel); sel.style.borderColor = ""; sel.classList.remove("sel"); sel = null; upd(); } }; b.addEventListener("click", e => { if (e.target.closest(".tilew")) return; put(); }); b.onkeydown = e => { if (e.key === "Enter") put(); }; });
    const upd = () => { $$(".tilew", body).forEach(x => { if (x !== sel) x.style.borderColor = ""; }); ready(bank.children.length === 0); };
    return () => { let ok = true; buckets.forEach(b => $$(".tilew", b).forEach(t => { const r = t.dataset.g === b.dataset.g; if (!r) ok = false; t.classList.add(r ? "right" : "wrong"); })); return { ok, answer: q.groups.map((g, gi) => `<b>${esc(g)}:</b> ${q.items.filter(x => x[1] === gi).map(x => M(x[0])).join(", ")}`).join(" · "), e: q.e }; };
  },
  match(q, body, ready) {
    const L = PQ.shuffle(q.pairs.map((p, i) => i)), Rr = PQ.shuffle(q.pairs.map((p, i) => i));
    body.innerHTML = `<div class="match"><div class="col">${L.map(i => `<button class="tilew" type="button" data-side="l" data-i="${i}">${M(q.pairs[i][0])}</button>`).join("")}</div><div class="col">${Rr.map(i => `<button class="tilew" type="button" data-side="r" data-i="${i}">${M(q.pairs[i][1])}</button>`).join("")}</div></div>`;
    let a = null, mistakes = 0, matched = 0;
    $$(".tilew", body).forEach(t => t.onclick = () => {
      if (t.classList.contains("done")) return;
      if (!a || a.dataset.side === t.dataset.side) { $$(".tilew", body).forEach(x => x.classList.remove("sel")); a = t; t.classList.add("sel"); return; }
      if (a.dataset.i === t.dataset.i) { a.classList.remove("sel"); a.classList.add("done"); t.classList.add("done"); matched++; a = null; if (matched === q.pairs.length) ready(true); }
      else { mistakes++; const b = a; [b, t].forEach(x => { x.classList.remove("bad"); void x.offsetWidth; x.classList.add("bad"); }); b.classList.remove("sel"); a = null; }
    });
    return (skip) => ({ ok: !skip && mistakes <= 1, answer: q.pairs.map(p => `${M(p[0])} = ${M(p[1])}`).join(" · "), e: (mistakes > 1 && !skip ? `You made ${mistakes} mismatches. ` : "") + (q.e || "") });
  },
  num(q, body, ready) {
    body.innerHTML = `<div class="numwrap">${q.money ? `<span class="pre">${esc(PQ.S().cur)}</span>` : ""}<input class="input" id="numIn" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer" aria-label="Your answer">${q.suf ? `<span class="pre" style="font-size:1rem">${esc(q.suf)}</span>` : ""}</div>`;
    const inp = $("input", body); inp.addEventListener("input", () => ready(inp.value.trim() !== "")); setTimeout(() => inp.focus({ preventScroll: true }), 50);
    return () => { const v = parseFloat(inp.value.replace(/[^0-9.\-]/g, "")); const ok = !isNaN(v) && Math.abs(v - q.a) <= (q.tol || 0.01); inp.style.borderColor = ok ? "var(--matcha)" : "var(--orchid)"; return { ok, answer: (q.money ? PQ.fmt(q.a) : q.a) + (q.suf ? " " + q.suf : ""), e: q.e }; };
  },
  write(q, body, ready) {
    body.innerHTML = `<textarea class="input" id="wrIn" style="min-height:150px" placeholder="Write a few sentences in your own words..." aria-label="Your answer"></textarea><p class="muted" style="font-size:.85rem">We check your answer for the key ideas. Spelling doesn't need to be perfect.</p><div class="kw-out"></div>`;
    const ta = $("textarea", body); ta.addEventListener("input", () => ready(ta.value.trim().split(/\s+/).length >= 4));
    return (skip) => {
      const res = PQ.checkKeywords(ta.value, q.keys);
      const ok = !skip && res.hits >= (q.need || q.keys.length);
      $(".kw-out", body).innerHTML = `<div class="kw-list" style="margin-top:6px">${res.list.map(k => `<div class="kw ${k.hit ? "hit" : "miss"}"><b>${k.hit ? "✓" : "✗"}</b><span>${esc(k.label)}</span></div>`).join("")}</div><div class="notice" style="margin-top:10px">${PQ.ICON.bulb}<span><b>Model answer:</b> ${M(q.model)}</span></div>`;
      return { ok, partial: skip ? null : ok ? null : res.hits > 0 ? `You covered ${res.hits} of ${q.keys.length} key ideas` : null, answer: "See the model answer above.", e: ok ? `You covered ${res.hits} of ${q.keys.length} key ideas.` : "Compare your answer with the key ideas above." };
    };
  }
};
PQ.checkKeywords = (text, keys) => {
  const t = " " + norm(text) + " ";
  const list = keys.map(k => ({ label: k.label, hit: k.any.some(w => t.includes(norm(w))) }));
  return { list, hits: list.filter(x => x.hit).length };
};

/* ================= LEARN PATH ================= */
const PADS = [4, 16, 26, 16, 4, 0];
PQ.isUnlocked = l => l.li === 0 || !!(PQ.S().lessons[l.unit.lessons[l.li - 1].id] || {}).done;
PQ.views.learn = (p, app) => {
  const S = PQ.S(), next = PQ.nextLesson(), done = Object.values(S.lessons).filter(x => x.done).length;
  app.innerHTML = `<div class="head"><div><p class="label">Course</p><h1 style="margin-top:6px">Your money <em class="it">journey</em></h1></div><p class="muted">Work through each unit in order. Every lesson has short reading cards and ends with a mix of questions. Finish a lesson to unlock the next one.</p></div>
  <div class="learn-wrap"><div id="units"></div>
  <aside class="learn-side">
    <div class="card"><p class="label">Course progress</p><h3 style="margin:6px 0 10px">${done} of ${PQ.LESSONS.length} lessons</h3><div class="bar"><i style="width:${done / PQ.LESSONS.length * 100}%"></i></div>
    ${next ? `<a class="btn btn-primary" style="width:100%; margin-top:16px" href="#lesson-${next.id}">Continue: ${esc(next.title)}</a>` : ""}
    <div class="unit-jump">${PQ.UNITS.map((u, i) => { const d = u.lessons.filter(l => (S.lessons[l.id] || {}).done).length; return `<a href="#learn" data-jump="${u.id}"><span style="color:var(--ink)">${i + 1}. ${esc(u.title)}</span><span>${d}/${u.lessons.length}</span></a>`; }).join("")}</div></div>
    <div class="card"><p class="label">Today</p><div class="goal-big" style="margin-top:8px">${PQ.goalRing(64)}<div><b>${PQ.todayXp()} / ${S.goal} XP</b><p class="muted" style="font-size:.85rem">Daily goal</p></div></div></div>
  </aside></div>`;
  $("#units").innerHTML = PQ.UNITS.map((u, ui) => {
    const d = u.lessons.filter(l => (S.lessons[l.id] || {}).done).length;
    return `<section class="unit" id="unit-${u.id}">
      <div class="unit-banner t-${u.color}"><div style="min-width:0"><p class="label">Unit ${ui + 1}</p><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div>
      <div class="prog">${d}/${u.lessons.length} done<div class="bar"><i style="width:${d / u.lessons.length * 100}%"></i></div><a class="btn btn-sm" style="margin-top:10px; background:rgba(247,250,250,.55); color:inherit" href="#game-quiz" data-unitquiz="${u.id}">Practise unit</a></div></div>
      <div class="path">${u.lessons.map((l, li) => {
        const st = S.lessons[l.id] || {}, open = PQ.isUnlocked(l), cur = next && next.id === l.id;
        const [bg, ink] = PQ.COLORS[u.color];
        const icon = st.done ? PQ.ICON.check : !open ? PQ.ICON.lock : cur ? PQ.ICON.star : PQ.ICON.book;
        return `<div class="node-row" style="padding-left:${PADS[li % PADS.length]}%"><button class="node ${cur ? "current" : ""}" type="button" data-l="${l.id}" ${open ? "" : "disabled"} style="background:${bg}; color:${ink}" aria-label="${esc(l.title)}${st.done ? ", completed" : open ? "" : ", locked"}">${icon}${st.perfect ? '<span class="crown">★</span>' : ""}</button>
        <div class="node-label"><b>${esc(l.title)}</b><small>${st.done ? `Completed · best ${st.best}/${l.qs.length}` : open ? `${l.mins} min · ${l.qs.length} questions` : "Finish the lesson before to unlock"}</small></div></div>`;
      }).join("")}</div></section>`;
  }).join("");
  $$("[data-l]", app).forEach(b => b.onclick = () => location.hash = "lesson-" + b.dataset.l);
  $$("[data-jump]", app).forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById("unit-" + a.dataset.jump).scrollIntoView({ behavior: PQ.reduce ? "auto" : "smooth" }); });
  $$("[data-unitquiz]", app).forEach(a => a.onclick = () => { PQ.prefUnit = a.dataset.unitquiz; });
};

/* ================= LESSON PLAYER ================= */
PQ.views.lesson = (id, app) => {
  const l = PQ.lesson(id);
  if (!l) { location.hash = "learn"; return; }
  if (!PQ.isUnlocked(l)) { PQ.toast("Finish the previous lesson to unlock this one."); location.hash = "learn"; return; }
  const u = l.unit, ink = PQ.inkFor(u.color);
  PQ.setCrumbs([["Learn", "#learn"], [`Unit ${l.ui + 1}`, "#learn"], [l.title]]);
  const total = l.screens.length + l.qs.length;
  const st = { phase: "intro", i: 0, queue: l.qs.map((q, i) => i), retry: new Set(), firstOk: 0, answered: 0, t0: Date.now() };
  const shell = body => {
    const doneSteps = st.phase === "intro" ? 0 : st.phase === "read" ? st.i : st.phase === "quiz" ? l.screens.length + Math.min(st.answered, l.qs.length) : total;
    app.innerHTML = `<div class="lesson"><div class="lesson-top"><a class="xbtn" href="#learn" aria-label="Leave lesson">${PQ.ICON.close}</a><div class="bar"><i style="width:${doneSteps / total * 100}%"></i></div><span class="num" style="font-weight:800; font-size:.9rem">${doneSteps}/${total}</span></div><div id="stage">${body}</div></div>`;
    return $("#stage");
  };
  const intro = () => {
    shell(`<div class="card panel pop-in" style="display:grid; gap:16px"><span class="pill t-${u.color}" style="width:fit-content">Unit ${l.ui + 1} · ${esc(u.title)}</span><h1>${esc(l.title)}</h1>
      <div><p class="label">In this lesson you'll learn</p><ul class="intro-list">${l.goals.map(g => `<li>${esc(g)}</li>`).join("")}</ul></div>
      <div style="display:flex; gap:8px; flex-wrap:wrap"><span class="pill t-azure">${l.screens.length} reading cards</span><span class="pill t-azure">${l.qs.length} questions</span><span class="pill t-azure">About ${l.mins} min</span></div>
      <div><button class="btn btn-primary" type="button" id="go">Start lesson ${PQ.ICON.arrow}</button></div></div>`);
    $("#go").onclick = () => { st.phase = "read"; read(); };
  };
  const read = () => {
    const s = l.screens[st.i];
    const stage = shell(`<article class="screen t-${u.color} pop-in"><p class="label">${esc(l.title)} · Card ${st.i + 1} of ${l.screens.length}</p><h2>${M(s.h)}</h2>
      <div class="body">${(s.b || []).map(p => `<p>${M(p)}</p>`).join("")}${s.pts ? `<ul>${s.pts.map(x => `<li>${M(x)}</li>`).join("")}</ul>` : ""}</div>
      ${s.ex ? `<div class="ex"><b>${esc(s.ex[0])}</b>${M(s.ex[1])}</div>` : ""}${s.tip ? `<p class="tipline" style="color:var(--${ink})">${M(s.tip)}</p>` : ""}</article>
      <div class="lesson-foot"><button class="btn btn-line" type="button" id="prev" ${st.i === 0 ? "disabled" : ""}>${PQ.ICON.back} Back</button><button class="btn btn-primary" type="button" id="next">${st.i === l.screens.length - 1 ? "Start the questions" : "Continue"} ${PQ.ICON.arrow}</button></div>`);
    $("#prev").onclick = () => { st.i--; read(); };
    $("#next").onclick = () => { if (st.i < l.screens.length - 1) { st.i++; read(); } else { st.phase = "quiz"; ask(); } };
    $("#next").focus({ preventScroll: true });
  };
  const ask = () => {
    if (!st.queue.length) return finish();
    const qi = st.queue[0], q = l.qs[qi], isRetry = st.retry.has(qi);
    const stage = shell("");
    PQ.renderQuestion(q, stage, ok => {
      st.queue.shift();
      if (!isRetry) { st.answered++; PQ.S().stats.answered++; if (ok) { st.firstOk++; PQ.S().stats.correct++; } }
      if (!ok && !isRetry) { st.retry.add(qi); st.queue.push(qi); }
      PQ.save();
      ask();
    }, { tag: isRetry ? "Second chance" : null });
  };
  const finish = () => {
    st.phase = "done";
    const S = PQ.S(), prev = S.lessons[l.id] || {}, n = l.qs.length, perfect = st.firstOk === n;
    let xp = prev.done ? 5 + (perfect && !prev.perfect ? 10 : 0) : 10 + st.firstOk * 5 + (perfect ? 10 : 0);
    S.lessons[l.id] = { done: true, best: Math.max(prev.best || 0, st.firstOk), perfect: !!(prev.perfect || perfect), at: Date.now() };
    PQ.save();
    const secs = Math.round((Date.now() - st.t0) / 1000), acc = Math.round(st.firstOk / n * 100);
    const nextL = PQ.LESSONS[PQ.LESSONS.indexOf(l) + 1];
    const medal = PQ.medal({ c: perfect ? "peach" : acc >= 60 ? "matcha" : "azure", i: perfect ? "★" : "✓" }, "medal");
    shell(`<div class="card result pop-in">${medal}<p class="label">Lesson complete</p><h1>${perfect ? "Perfect lesson!" : acc >= 60 ? "Lesson complete!" : "Lesson complete. Keep practising!"}</h1>
      <div class="stats"><div class="stat" style="border-color:var(--peach)"><small style="color:var(--maroon)">XP earned</small><b>+${xp}</b></div><div class="stat" style="border-color:var(--matcha)"><small style="color:var(--forest)">Accuracy</small><b>${acc}%</b></div><div class="stat" style="border-color:var(--azure)"><small style="color:var(--deep)">Time</small><b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</b></div></div>
      <p class="muted" style="max-width:46ch">${perfect ? "Every question right on the first try." : `You got ${st.firstOk} of ${n} right on the first try. Mistakes came back for a second chance.`}</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center"><a class="btn btn-line" href="#learn">Back to the course</a>${nextL ? `<a class="btn btn-primary" href="#lesson-${nextL.id}">Next lesson ${PQ.ICON.arrow}</a>` : `<a class="btn btn-primary" href="#games">Play a game</a>`}</div></div>`);
    PQ.addXP(xp, "lesson complete");
    if (perfect) PQ.confetti();
  };
  intro();
};
})();
