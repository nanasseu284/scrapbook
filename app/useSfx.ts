"use client";

// Satu AudioContext dipakai bersama — tidak bikin baru setiap klik
let _ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!_ctx) {
    _ctx = new AudioContext();
  }
  // Resume kalau browser suspend (wajib untuk menghindari blokir)
  if (_ctx.state === "suspended") {
    _ctx.resume();
  }
  return _ctx;
}

// ─── Klik tombol biasa / pilihan ─────────────────────────────────────
export function sfxClick() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

// ─── Klik tombol "Selanjutnya" / maju ───────────────────────────────
export function sfxNext() {
  const ctx = getCtx();
  const notes = [500, 700];
  notes.forEach((freq, i) => {
    const t = i * 0.07;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.1);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.1);
  });
}

// ─── Klik tombol "Kembali" ───────────────────────────────────────────
export function sfxBack() {
  const ctx = getCtx();
  const notes = [700, 450];
  notes.forEach((freq, i) => {
    const t = i * 0.07;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.18, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.1);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.1);
  });
}

// ─── Klik tombol "Mulai" ─────────────────────────────────────────────
export function sfxStart() {
  const ctx = getCtx();
  const notes = [400, 500, 650];
  notes.forEach((freq, i) => {
    const t = i * 0.09;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.22, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.15);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.15);
  });
}

// ─── Mulai drag gambar ───────────────────────────────────────────────
export function sfxDragStart() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

// ─── Drop gambar (berhasil) ──────────────────────────────────────────
export function sfxDrop() {
  const ctx = getCtx();

  // Bunyi "thud" rendah
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
  }
  const source = ctx.createBufferSource();
  source.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 200;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();

  // Nada kecil di atasnya
  const osc = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc.connect(gain2);
  gain2.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(520, ctx.currentTime + 0.05);
  gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start(ctx.currentTime + 0.05);
  osc.stop(ctx.currentTime + 0.2);
}

// ─── Jawaban benar ───────────────────────────────────────────────────
export function sfxSuccess() {
  const ctx = getCtx();
  const notes = [520, 660, 780];
  notes.forEach((freq, i) => {
    const t = i * 0.1;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.18);
  });
}

// ─── Jawaban salah ───────────────────────────────────────────────────
export function sfxError() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}