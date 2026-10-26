// gen-audio.mjs — música + efectos del Shot 002 (moho del pan). Sin costo: todo se sintetiza aquí.
// Uso: node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Moho Pan Ciclo.dc.html"  → música hecha de lo que pasa en pantalla (cada rama, cada cápsula que revienta).
//  · versión narrada (la llama narrar.mjs) → fondo suave que deja lugar a la voz + efectos en los momentos clave.
// Los tiempos se leen de OM_SCENES; en la narrada las escenas se estiran (dur ≠ nat) y se convierten.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Pan Ciclo.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla_ciclo.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const KA = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; KA[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 11; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
// t en tiempo de autor (se convierte a tiempo real)
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79]; // la menor pentatónica

const tic = (t, g = 0.35) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.6 + Math.sin(2 * Math.PI * 2400 * u)) * Math.exp(-u * 90) * g, 0.06);
const nota = (t, m, g = 0.12, d = 0.6) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.25 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.006, d * 0.4) * g; }, d);
const sube = (t, d, m0, m1, g = 0.1) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const bajo = (t, m, g = 0.2, d = 1.2) => { const f = lp(); add(mus, t, (u) => f(Math.sign(Math.sin(2 * Math.PI * hz(m) * u)), 380) * env(u, 0.01, d * 0.5) * g, d); };
const tambor = (t, g = 0.5, f0 = 90) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 120 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); };
const estalla = (t, g = 0.7) => { tambor(t, g, 70); const h = hp(); add(sfx, t, (u, i) => h(NOISE[(i * 3) % NOISE.length], 1500) * Math.exp(-u * 14) * g * 0.7, 0.35); for (let k = 0; k < 6; k++) tic(t + 0.05 + k * 0.04 + rnd() * 0.05, 0.1); };
const whoosh = (t, d = 0.6, g = 0.25) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
const pad = (t0, t1, g = 0.07, notas = [45, 52, 57]) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0); const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 600) * g * Math.min(1, u * 8, (1 - u) * 8); } };

if ('Llega' in KA) {
  /* ---------- CICLO: la música son los datos ---------- */
  const K = KA;
  pad(0, K.Outro + 3.5, 0.06);
  tic(1.2, 0.45);                                                     // la espora toca el pan
  sube(K.Germina + 0.3, 3.2, 57, 69, 0.12);                           // germina: nota que sube
  for (let i = 0; i < 40; i++) {                                      // cada rama nueva de hifa = una nota
    const t = K.Germina + 2.5 + (K.Sube - K.Germina - 2.5) * Math.pow(i / 40, 0.8) + rnd() * 0.1;
    nota(t, ESC[Math.floor(rnd() * ESC.length)], 0.06 + 0.06 * (i / 40), 0.5);
  }
  for (let k = 0; k < 7; k++) { bajo(K.Sube + 0.4 + k * 0.8, 33 + (k % 3) * 2); nota(K.Sube + 0.8 + k * 0.8, 76 + (k % 3) * 3, 0.08, 0.9); } // rizoides (grave) y tallos (agudo)
  for (let k = 0; k < 16; k++) tambor(K.Capsulas + 0.5 + k * (5.5 / 16) * (1 - k / 40), 0.12 + 0.3 * (k / 16), 110); // cápsulas: tambor que se tensa
  [2.6, 3.4, 4.2, 0.6, 5.0, 5.8, 6.6].forEach((d, k) => { estalla(K.Revientan + d, 0.55 + 0.05 * k); nota(K.Revientan + d + 0.05, ESC[(k * 3) % ESC.length] + 12, 0.07, 1.2); });
  whoosh(K.Otro + 0.5, 1.2, 0.3); whoosh(K.Otro + 4.2, 1.6, 0.25);
  for (let k = 0; k < 6; k++) nota(K.Otro + 1 + k * 1.1, ESC[(9 - k) % ESC.length], 0.09 * (1 - k / 8), 1.4);
  nota(K.Outro + 0.3, 57, 0.1, 2.5); nota(K.Outro + 0.3, 64, 0.08, 2.5);
} else {
  /* ---------- NARRADA: fondo suave, la voz manda ---------- */
  const K = KA, fin = KA.Outro;
  pad(0, fin + 3, 0.05, [45, 52, 57]);
  const B = 60 / 96; for (let t = 0.3; t < fin; t += B) { add(mus, t, (u, i) => NOISE[(i * 13) % NOISE.length] * Math.exp(-u * 70) * 0.05, 0.05); if (Math.round(t / B) % 4 === 0) bajo(t, 33, 0.09, 1.1); }
  tic(0.3, 0.4); whoosh(0.25, 0.5, 0.2);                              // el "puf" de esporas del gancho
  whoosh(K.Espora + 0.2, 1.4, 0.25); tic(K.Espora + 3.2, 0.4);         // viaje al microscopio y la espora toca el pan
  sube(K.Hifa + 0.4, 2.8, 57, 69, 0.07);
  for (let i = 0; i < 16; i++) nota(K.Hifa + 2.5 + i * 0.42, ESC[Math.floor(rnd() * ESC.length)], 0.04, 0.4);
  [1.3, 1.6, 1.0, 0.4, 1.9, 2.2, 1.5].forEach((d) => estalla(K.Vuelan + d, 0.35));
  whoosh(K.USDA + 0.1, 1.2, 0.22); tambor(K.USDA + 0.85, 0.5, 80);    // regreso a la rebanada + tarjeta
  tambor(K.Queso + 1.25, 0.3, 120); tambor(K.Queso + 2.85, 0.3, 120);
  tambor(K.Huelas + 1.0, 0.45, 70);
  nota(K.Tempeh + 0.4, 69, 0.07, 0.8); nota(K.Tempeh + 0.55, 76, 0.07, 0.8);
  whoosh(K.Cierre, 0.8, 0.2); nota(fin + 0.3, 57, 0.08, 2.5); nota(fin + 0.3, 64, 0.06, 2.5);
}

/* ---------- mezcla y WAV ---------- */
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const L = Math.tanh((mus[i] * 0.9 + sfx[i] * 0.8) * 1.2), R = Math.tanh((mus[i] * 0.85 + sfx[i] * 0.8) * 1.2);
  buf.writeInt16LE(Math.round(L * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R * 32767), 46 + i * 4);
}
fs.mkdirSync(path.join(HERE, 'assets'), { recursive: true });
fs.writeFileSync(path.join(HERE, OUT), buf);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s`);
