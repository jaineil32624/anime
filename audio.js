// Original, in-browser synthesized audio. No external or copyrighted
// audio files are used — everything here is generated with oscillators.

const ArenaAudio = (() => {
  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let musicTimer = null;
  let musicStep = 0;
  let enabled = false;

  const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]; // C major-ish, bright and playful
  const bassNotes = [130.81, 130.81, 174.61, 196.0];

  function ensureContext() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = 0.16;
      musicGain.connect(masterGain);

      sfxGain = ctx.createGain();
      sfxGain.gain.value = 0.35;
      sfxGain.connect(masterGain);
    }
  }

  function blip(freq, duration, type, gainNode, startOffset, peak) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + (startOffset || 0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.5, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g);
    g.connect(gainNode);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function playMusicStep() {
    if (!enabled) return;
    const beat = musicStep % 8;
    const note = scale[[0, 2, 4, 2, 5, 4, 2, 0][beat]];
    blip(note, 0.18, "triangle", musicGain, 0, 0.5);
    if (beat % 4 === 0) {
      blip(bassNotes[Math.floor(musicStep / 8) % bassNotes.length], 0.35, "sine", musicGain, 0, 0.6);
    }
    musicStep++;
  }

  function startMusic() {
    ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    if (musicTimer) return;
    musicStep = 0;
    musicTimer = setInterval(playMusicStep, 220);
  }

  function stopMusic() {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  function toggle() {
    ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    enabled = !enabled;
    if (enabled) startMusic(); else stopMusic();
    return enabled;
  }

  function sfxClick() {
    ensureContext();
    blip(880, 0.08, "square", sfxGain, 0, 0.3);
  }

  function sfxSelect() {
    ensureContext();
    blip(660, 0.07, "square", sfxGain, 0, 0.3);
    blip(990, 0.09, "square", sfxGain, 0.06, 0.25);
  }

  function sfxSuccess() {
    ensureContext();
    [523.25, 659.25, 783.99].forEach((f, i) => blip(f, 0.16, "triangle", sfxGain, i * 0.09, 0.4));
  }

  function sfxWhoosh() {
    ensureContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    const t0 = ctx.currentTime;
    osc.frequency.setValueAtTime(200, t0);
    osc.frequency.exponentialRampToValueAtTime(900, t0 + 0.25);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
    osc.connect(g);
    g.connect(sfxGain);
    osc.start(t0);
    osc.stop(t0 + 0.32);
  }

  return { toggle, sfxClick, sfxSelect, sfxSuccess, sfxWhoosh, isEnabled: () => enabled };
})();
