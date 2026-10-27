// gen-audio.mjs — música + efectos sincronizados para el Shot Hormiga Zombi (sin voz).
// Lee las duraciones de escena del .dc.html, así que si cambian los tiempos basta con volver a correrlo.
// Uso: node gen-audio.mjs [archivo.dc.html] [salida.wav]   (por defecto la versión sin voz → assets/mezcla.wav)
// En la versión narrada las escenas se estiran (dur ≠ nat): los efectos se escriben en tiempo de autor y se convierten.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hormiga Zombi.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, KA = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = acc; KA[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
// tiempo de autor → tiempo real de reproducción
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.5) * SR);
const L = new Float32Array(N), R = new Float32Array(N);
const music = new Float32Array(N), sfx = new Float32Array(N);

let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, t, fn, dur) => { if (buf === sfx) t = warp(t); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
// filtro paso-bajo de un polo aplicado sobre la marcha
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };

/* ---------- efectos ---------- */
const S = {
  whoosh(t, d = 0.45, g = 0.5, up = true) { const f = lp(), h = hp(); add(sfx, t, (u, i) => { const p = u / d, fc = up ? 300 + 3200 * p : 3500 - 3200 * p; return h(f(NOISE[i % NOISE.length], fc), 200) * Math.sin(Math.PI * p) * g; }, d); },
  impact(t, g = 0.9) { let ph = 0; const f = lp(); add(sfx, t, (u, i) => { ph += 2 * Math.PI * (140 * Math.exp(-u * 9) + 38) / SR; return (Math.sin(ph) * 1.0 + f(NOISE[i % NOISE.length], 2500 * Math.exp(-u * 12) + 200) * 0.6) * Math.exp(-u * 6) * g; }, 0.7); },
  pop(t, g = 0.5, f0 = 420) { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * f0 * (1 + 1.8 * Math.min(1, u / 0.12)) / SR; return Math.sin(ph) * env(u, 0.004, 0.04) * g; }, 0.14); },
  ding(t, g = 0.35) { add(sfx, t, (u) => (Math.sin(2 * Math.PI * 1320 * u) + 0.6 * Math.sin(2 * Math.PI * 1980 * u)) * env(u, 0.003, 0.35) * g, 1.2); },
  boing(t, g = 0.4) { let ph = 0; add(sfx, t, (u) => { const f = (u < 0.12 ? 180 + 240 * (u / 0.12) : 420 - 160 * Math.min(1, (u - 0.12) / 0.3)) * (1 + 0.06 * Math.sin(2 * Math.PI * 18 * u)); ph += 2 * Math.PI * f / SR; return Math.sin(ph) * env(u, 0.005, 0.18) * g; }, 0.55); },
  stamp(t, g = 0.8) { S.impact(t, g * 0.7); const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[(i * 3) % NOISE.length], 1800), 400) * Math.exp(-u * 18) * g * 0.8, 0.3); },
  cut(t, g = 0.6) { const f = lp(); let ph = 0; add(sfx, t, (u, i) => { ph += 2 * Math.PI * (90 - 40 * Math.min(1, u / 0.2)) / SR; return (f(NOISE[i % NOISE.length], 4000 - 3100 * Math.min(1, u / 0.15)) * 0.7 + Math.sin(ph) * 0.8) * Math.exp(-u * 10) * g; }, 0.4); },
  crunch(t, g = 0.9) { S.impact(t, 0.6); const h = hp(); add(sfx, t, (u, i) => { const grain = (Math.floor(u * 90) % 2 ? 1 : 0.35); return h(NOISE[(i * 7) % NOISE.length], 900) * grain * Math.exp(-u * 7) * g; }, 0.45); },
  buzz(t, d, g = 0.22) { let ph = 0; const f = lp(); add(sfx, t, (u, i) => { ph += 2 * Math.PI * (110 + 25 * Math.sin(2 * Math.PI * 7 * u)) / SR; const saw = 2 * ((ph / (2 * Math.PI)) % 1) - 1; return f(saw * 0.8 + NOISE[i % NOISE.length] * 0.3, 1600) * Math.min(1, u / 0.05, (d - u) / 0.08) * g; }, d); },
  gliss(t, d, f0, f1, g = 0.18, type = 'sin') { let ph = 0; add(sfx, t, (u) => { const f = f0 * Math.pow(f1 / f0, u / d); ph += 2 * Math.PI * f / SR; const w = type === 'tri' ? 2 / Math.PI * Math.asin(Math.sin(ph)) : Math.sin(ph); return w * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); },
  warble(t, g = 0.3) { let ph = 0; add(sfx, t, (u) => { const f = 600 * Math.pow(0.35, u / 0.9) * (1 + 0.08 * Math.sin(2 * Math.PI * 9 * u)); ph += 2 * Math.PI * f / SR; return (2 / Math.PI) * Math.asin(Math.sin(ph)) * env(u, 0.02, 0.5) * g; }, 1.0); },
  tick(t, g = 0.12) { add(sfx, t, (u, i) => NOISE[(i * 5) % NOISE.length] * Math.exp(-u * 160) * g, 0.03); },
  slam(t, g = 0.9) { S.impact(t, g); add(sfx, t, (u) => (Math.sin(2 * Math.PI * 220 * u) + Math.sin(2 * Math.PI * 331 * u)) * 0.2 * Math.exp(-u * 8) * g, 0.6); },
};

/* ---------- música (125 BPM, re menor) ---------- */
const B = 60 / 125, BAR = 4 * B;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const BASS = [38, 38, 41, 36]; // D D F C
const ARP = [62, 65, 69, 72];   // D F A C
const start = K.Hook, end = K.Outro;
const kick = (t, g = 0.9) => { let ph = 0; add(music, t, (u) => { ph += 2 * Math.PI * (55 + 90 * Math.exp(-u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 7) * g; }, 0.4); };
const clap = (t, g = 0.35) => { const h = hp(); add(music, t, (u, i) => h(NOISE[(i * 11) % NOISE.length], 1200) * (Math.exp(-u * 30) + 0.4 * Math.exp(-Math.max(0, u - 0.012) * 25)) * g, 0.2); };
const hat = (t, g = 0.12) => { const h = hp(); add(music, t, (u, i) => h(NOISE[(i * 13) % NOISE.length], 7000) * Math.exp(-u * 60) * g, 0.06); };
const pluck = (t, m, g = 0.14, d = 0.3) => add(music, t, (u) => { const f = hz(m); return ((2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * f * u)) + 0.3 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.004, d * 0.35) * g; }, d);
const bassN = (t, m, g = 0.22) => { const f = lp(); add(music, t, (u) => f(Math.sign(Math.sin(2 * Math.PI * hz(m) * u)), 700) * env(u, 0.005, 0.16) * g, B / 2); };
const sceneIdx = (t) => { let k = 0; ['Espora', 'Invasion', 'Subida', 'Mordida', 'Hongo', 'Fosil', 'Humanos', 'Cierre'].forEach((n, i) => { if (t >= K[n]) k = i + 1; }); return k; };
// pad
{ const f = lp(); const n0 = Math.floor(start * SR), n1 = Math.floor((end + 0.3) * SR);
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (t - start) / (end - start);
    const x = [73.42, 110, 174.61].reduce((a, fr) => a + (2 * ((t * fr) % 1) - 1), 0) / 3;
    music[i] += f(x, 400 + 1100 * u) * 0.09 * Math.min(1, (t - start) / 2.5) * Math.min(1, (end + 0.3 - t) / 0.3); } }
for (let t = start; t < end - 0.01; t += B / 2) {
  const beat = Math.round((t - start) / B * 2), bar = Math.floor(beat / 8), on = beat % 2 === 0, k = sceneIdx(t);
  const q = (beat / 2) % 4;
  if (on && (q === 0 || q === 2)) kick(t);
  if (on && (q === 1 || q === 3) && k >= 1) clap(t);
  if (!on) hat(t, k >= 4 ? 0.14 : 0.1);
  if (k >= 4) hat(t + B / 4, 0.06);
  bassN(t, BASS[bar % 4] + (on ? 0 : 12));
  if (k >= 2) pluck(t, ARP[beat % 4] + (k >= 5 ? 12 : 0), 0.1);
}
// subidas antes de escenas clave y golpe final
for (const n of ['Mordida', 'Hongo', 'Cierre']) { const h = hp(), f = lp(); add(music, K[n] - 1.2, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 4700 * (u / 1.2)), 200) * (u / 1.2) * 0.25, 1.2); }
kick(K.Outro, 1); add(music, K.Outro, (u) => Math.sin(2 * Math.PI * 55 * u) * Math.exp(-u * 2) * 0.5, 1.5);
[62, 65, 69, 74].forEach((m, i) => pluck(K.Outro + 0.2 + i * 0.12, m, 0.12, 1.2));

/* ---------- efectos en los tiempos exactos del jsx ---------- */
const H = KA.Hook, E = KA.Espora, I = KA.Invasion, Su = KA.Subida, M = KA.Mordida, Ho = KA.Hongo, F = KA.Fosil, Hu = KA.Humanos, Ci = KA.Cierre;
[0, 0.2, 0.4].forEach((t) => { S.impact(t, 0.5); S.whoosh(t, 0.18, 0.3); });
S.whoosh(H + 0.75, 0.5, 0.5, false); S.impact(H + 1.25, 1); S.pop(H + 1.27, 0.6, 300); S.warble(H + 1.7); S.boing(H + 1.8);
for (const n of ['Espora', 'Invasion', 'Subida', 'Mordida', 'Hongo', 'Fosil', 'Humanos', 'Cierre']) { S.whoosh(KA[n] - 0.45, 0.45, 0.4); S.cut(KA[n]); }
S.whoosh(E + 0.15, 0.6, 0.4, false); S.impact(E + 0.75, 0.7); S.pop(E + 0.78, 0.4, 260);
S.buzz(E + 2.9, 1.75); for (let t = E + 3.1; t < I - 0.3; t += 0.25) S.pop(t, 0.18, 700 + rnd() * 400);
S.gliss(I + 0.6, 2.8, 200, 900, 0.12, 'tri'); S.ding(I + 3.2); S.stamp(I + 3.5); S.boing(I + 3.9);
for (let t = Su + 0.3; t < Su + 4.6; t += 0.16) S.tick(t); S.gliss(Su + 2.4, 2.2, 260, 780, 0.12); S.stamp(Su + 4.6, 0.6);
S.whoosh(M + 0.05, 0.5, 0.35, false); S.gliss(M + 0.4, 1.7, 500, 1000, 0.08); S.ding(M + 2.1, 0.3); S.crunch(M + 2.2); S.boing(M + 2.6);
S.gliss(Ho + 0.35, 2.25, 70, 160, 0.25, 'tri'); S.pop(Ho + 2.4, 0.5, 220); for (let i = 0; i < 18; i++) S.pop(Ho + 2.8 + rnd() * 2.6, 0.12, 900 + rnd() * 900);
S.slam(F + 0.35, 0.7); [0.9, 1.15, 1.4].forEach((d) => S.pop(F + d, 0.35, 500)); S.stamp(F + 1.6);
S.whoosh(Hu + 0.3, 0.4, 0.3, false); S.gliss(Hu + 0.8, 1.4, 300, 900, 0.1); S.pop(Hu + 1.6, 0.35, 400); S.stamp(Hu + 2.5); S.boing(Hu + 2.9);
S.impact(Ci, 0.8); S.boing(Ci + 0.6); S.ding(KA.Outro + 0.4, 0.3);

/* ---------- mezcla ---------- */
for (let i = 0; i < N; i++) {
  const m = music[i] * 0.9, s = sfx[i] * 0.75;
  L[i] = Math.tanh((m + s) * 1.1); R[i] = Math.tanh((m * 0.96 + s) * 1.1);
}
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4); }
fs.mkdirSync(path.join(HERE, 'assets'), { recursive: true });
fs.writeFileSync(path.join(HERE, OUT), buf);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s`);
