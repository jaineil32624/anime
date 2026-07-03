document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Toast ---------- */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- Sound toggle ---------- */
  const soundBtn = document.getElementById("sound-toggle");
  soundBtn.addEventListener("click", () => {
    const on = ArenaAudio.toggle();
    soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
    soundBtn.querySelector(".sound-icon").textContent = on ? "🔊" : "🔈";
    soundBtn.querySelector(".sound-label").textContent = on ? "Sound on" : "Sound off";
    showToast(on ? "Original chiptune music on" : "Sound muted");
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      if (ArenaAudio.isEnabled()) ArenaAudio.sfxClick();
    });
  });

  /* ---------- Type chart ---------- */
  const typeChart = document.getElementById("type-chart");
  typeChart.innerHTML = TYPE_CHART.map(t => `
    <div class="type-tile" style="background:${t.color}">
      <div class="t-name">${t.icon} ${t.name}</div>
      <div class="t-rel">Strong vs <b>${t.strong}</b><br>Weak vs <b>${t.weak}</b></div>
    </div>
  `).join("");

  /* ---------- Parts diagram ---------- */
  const partsDiagram = document.getElementById("parts-diagram");
  partsDiagram.innerHTML = SPIN_PARTS.map(p => `
    <div class="part-tile">
      <div class="p-icon">${p.icon}</div>
      <div class="p-name">${p.name}</div>
      <div class="p-desc">${p.desc}</div>
    </div>
  `).join("");

  /* ---------- Trope accordion ---------- */
  const accordion = document.getElementById("trope-accordion");
  accordion.innerHTML = TROPES.map((t, i) => `
    <div class="acc-item" data-idx="${i}">
      <button class="acc-trigger" aria-expanded="false">
        <span>${t.title}</span>
        <span class="chev">▾</span>
      </button>
      <div class="acc-panel">
        <div class="acc-panel-inner">${t.body}</div>
      </div>
    </div>
  `).join("");

  accordion.querySelectorAll(".acc-item").forEach(item => {
    const trigger = item.querySelector(".acc-trigger");
    const panel = item.querySelector(".acc-panel");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      if (ArenaAudio.isEnabled()) ArenaAudio.sfxClick();
      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Wyldkin / Blader / Gear grids ---------- */
  const wyldkinGrid = document.getElementById("wyldkin-grid");
  wyldkinGrid.innerHTML = WYLDKIN.map(w => `
    <div class="card wyld-card small">
      <div class="wyld-avatar" style="background:${w.color}">${w.icon}</div>
      <h4>${w.name}</h4>
      <div class="wyld-type" style="color:${w.color}">${w.type} type</div>
      <p>${w.blurb}</p>
    </div>
  `).join("");

  const bladerGrid = document.getElementById("blader-grid");
  bladerGrid.innerHTML = BLADERS.map(b => `
    <div class="card blader-card">
      <div class="blader-avatar" style="background:${b.color}">${b.icon}</div>
      <div class="blader-info">
        <h4>${b.name}</h4>
        <div class="blader-role">${b.role}</div>
        <p>${b.blurb}</p>
      </div>
    </div>
  `).join("");

  const gearGrid = document.getElementById("gear-grid");
  gearGrid.innerHTML = GEAR.map(g => `
    <div class="card gear-card small">
      <span class="gear-tag">${g.tag}</span>
      <h4>${g.name}</h4>
      <p>${g.desc}</p>
    </div>
  `).join("");

  /* ---------- Quiz ---------- */
  const quizApp = document.getElementById("quiz-app");
  let quizIndex = 0;
  const quizScores = { collect: 0, spin: 0, story: 0 };

  function renderQuiz() {
    if (quizIndex >= QUIZ_QUESTIONS.length) {
      renderQuizResult();
      return;
    }
    const q = QUIZ_QUESTIONS[quizIndex];
    const pct = Math.round((quizIndex / QUIZ_QUESTIONS.length) * 100);
    quizApp.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
      <div class="quiz-q-count">Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt.text}</button>`).join("")}
      </div>
    `;
    quizApp.querySelectorAll(".quiz-option").forEach(btn => {
      btn.addEventListener("click", () => {
        if (ArenaAudio.isEnabled()) ArenaAudio.sfxSelect();
        const opt = q.options[parseInt(btn.dataset.i, 10)];
        Object.keys(opt.scores).forEach(k => quizScores[k] += opt.scores[k]);
        quizIndex++;
        renderQuiz();
      });
    });
  }

  function renderQuizResult() {
    const winner = Object.keys(quizScores).reduce((a, b) => quizScores[a] >= quizScores[b] ? a : b);
    const r = QUIZ_RESULTS[winner];
    if (ArenaAudio.isEnabled()) ArenaAudio.sfxSuccess();
    quizApp.innerHTML = `
      <div class="quiz-result">
        <div class="r-icon">${r.icon}</div>
        <h3>${r.title}</h3>
        <p>${r.body}</p>
        <button class="btn btn-primary quiz-restart">Retake the quiz</button>
      </div>
    `;
    quizApp.querySelector(".quiz-restart").addEventListener("click", () => {
      quizIndex = 0;
      quizScores.collect = 0; quizScores.spin = 0; quizScores.story = 0;
      if (ArenaAudio.isEnabled()) ArenaAudio.sfxWhoosh();
      renderQuiz();
    });
  }

  renderQuiz();

  /* ---------- Poll ---------- */
  const pollApp = document.getElementById("poll-app");
  const POLL_KEY = "arena-codex-poll-v1";
  const VOTE_KEY = "arena-codex-poll-voted-v1";

  function getPollCounts() {
    try {
      const stored = JSON.parse(localStorage.getItem(POLL_KEY));
      if (stored) return stored;
    } catch (e) {}
    const base = {};
    POLL_OPTIONS.forEach(o => base[o.id] = Math.floor(Math.random() * 8) + 3);
    localStorage.setItem(POLL_KEY, JSON.stringify(base));
    return base;
  }

  function savePollCounts(counts) {
    localStorage.setItem(POLL_KEY, JSON.stringify(counts));
  }

  function renderPoll() {
    const counts = getPollCounts();
    const voted = localStorage.getItem(VOTE_KEY);
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

    pollApp.innerHTML = POLL_OPTIONS.map(o => {
      const c = counts[o.id] || 0;
      const pct = Math.round((c / total) * 100);
      const isPicked = voted === o.id;
      return `
        <div class="poll-option">
          <button class="poll-option-btn" data-id="${o.id}" ${voted ? "disabled" : ""}>
            <span>${o.label}${isPicked ? " ✓" : ""}</span>
            ${voted ? `<span class="poll-pct">${pct}%</span>` : ""}
          </button>
          ${voted ? `<div class="poll-bar-track"><div class="poll-bar-fill" style="width:${pct}%"></div></div>` : ""}
        </div>
      `;
    }).join("") + (voted
      ? `<p class="poll-voted-note">Thanks for voting — results are saved on this device.</p>`
      : `<p class="poll-voted-note">Pick one to see live results.</p>`);

    if (!voted) {
      pollApp.querySelectorAll(".poll-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const counts2 = getPollCounts();
          counts2[id] = (counts2[id] || 0) + 1;
          savePollCounts(counts2);
          localStorage.setItem(VOTE_KEY, id);
          if (ArenaAudio.isEnabled()) ArenaAudio.sfxSuccess();
          showToast("Vote counted — thanks!");
          renderPoll();
        });
      });
    }
  }

  renderPoll();

  /* ---------- General click SFX on primary buttons/links ---------- */
  document.querySelectorAll(".btn, .card-link").forEach(el => {
    el.addEventListener("click", () => {
      if (ArenaAudio.isEnabled()) ArenaAudio.sfxWhoosh();
    });
  });

});
