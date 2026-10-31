// gen-audio.mjs — música y efectos del Shot bio-09 (el cepario). Todo sintetizado, sin costo.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (el gemelo mudo)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Cepario Datos.dc.html" → la música son los datos: una nota por cada vial que se enciende
//      (80 viales) y cada bloque con su propio timbre: −80 °C golpe seco · −196 °C metal y vaho ·
//      liofilizado un siseo de vacío. Al final la gradilla se apaga vial por vial: cierra el loop.
//  · versión narrada (la llama narrar.mjs) → cama grave continua SIN golpe, debajo de la voz.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cepario Datos.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 909; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [48, 51, 53, 55, 58, 60, 63, 65, 67, 70, 72, 75, 77, 79, 82]; // do menor pentatónica

const tic = (t, g = 0.24, f = 2600) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 95) * g, 0.06);
const nota = (t, m, g = 0.09, d = 0.5) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.22 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.005, d * 0.4) * g; }, d);
const campana = (t, m, g = 0.08, d = 1.8) => add(mus, t, (u) => [1, 2.01, 3.03].reduce((a, k, i) => a + Math.sin(2 * Math.PI * hz(m) * k * u) / (i + 1.6), 0) * Math.exp(-u / (d * 0.35)) * g, d);
const sube = (t, d, m0, m1, g = 0.07) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const golpe = (t, g = 0.36, f0 = 80) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 10) * g; }, 0.5); };
const metal = (t, g = 0.26) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * 900 * k * u) / k, 0) * Math.exp(-u * 10) * g, 0.8);
const whoosh = (t, d = 0.6, g = 0.18) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
// siseo de vacío: ruido filtrado que baja de tono (la bomba del liofilizador)
const vacio = (t, d = 2.4, g = 0.14) => { const f = lp(); add(sfx, t, (u, i) => f(NOISE[(i * 3) % NOISE.length], 2600 - 2200 * (u / d)) * Math.sin(Math.PI * u / d) * g, d); };
const pad = (t0, t1, g = 0.05, notas = [36, 43, 48], tapa = 0) => {
  const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) {
    const t = i / SR, u = (i - n0) / (n1 - n0), tp = typeof tapa === 'function' ? tapa(u) : tapa;
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 260 + 900 * (1 - tp)) * g * (1 + 0.5 * tp) * (0.85 + 0.15 * Math.sin(t * 0.6)) * Math.min(1, u * 8, (1 - u) * 8);
  }
};

if (K.Vacia != null) {
  /* ---------- GEMELO MUDO: una nota por vial, un timbre por método ---------- */
  const { Vacia: V, Frio: F, Nitro: Nn, Liofil: L, Mundo: M, Respaldo: R, Cierra: Ci, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.055, [36, 43, 48], 0.25);
  // bloque 1: 32 viales a −80 °C, cada uno con su golpe seco
  for (let i = 0; i < 32; i++) { const t = F + 0.3 + (Nn - 0.3 - F - 0.3) * (i / 32);
    nota(t, ESC[i % ESC.length], 0.05, 0.35); golpe(t, 0.14, 110); }
  // bloque 2: 24 viales en nitrógeno líquido, timbre de metal
  for (let i = 0; i < 24; i++) { const t = Nn + (L - 0.3 - Nn) * (i / 24);
    campana(t, ESC[(i + 4) % ESC.length] + 12, 0.045, 1.4); if (i % 3 === 0) metal(t, 0.12); }
  whoosh(Nn + 0.2, 1.6, 0.16);
  // bloque 3: 24 viales liofilizados, siseo de vacío
  for (let i = 0; i < 24; i++) { const t = L + (M - 0.3 - L) * (i / 24); nota(t, ESC[(i + 8) % ESC.length], 0.045, 0.6); }
  vacio(L + 0.2, 2.8, 0.15); vacio(L + 4.0, 2.2, 0.11);
  // el número del mundo
  sube(M + 0.3, 2.6, 48, 72, 0.06); golpe(M + 2.9, 0.3, 74);
  // respaldo: dos golpes iguales (las dos copias)
  golpe(R + 0.6, 0.3, 84); golpe(R + 1.4, 0.3, 84);
  // se apaga vial por vial: cierra el loop
  for (let i = 0; i < 20; i++) nota(Ci + 0.6 + i * 0.24, ESC[14 - (i % 15)], 0.04, 0.3);
  nota(Ou + 0.3, 36, 0.08, 2.8); nota(Ou + 0.3, 43, 0.06, 2.8); nota(Ou + 0.3, 48, 0.05, 2.8);
} else {
  /* ---------- VERSIÓN NARRADA ---------- */
  const { Gancho: G, Cepa: Ce, Tipos: Ti, Cepario: Cp, Cuido: Cu, Pregunta: Q, Cap1: C1, Cap1b: C1b,
    Cap2: C2, Cap3: C3, Dos: D, Mundo: M, Cierre: C, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.045, [36, 43, 48], 0.25);
  pad(C1, D, 0.03, [36, 43], 0.6);                      // los capítulos, más graves
  // gancho: el vial y su vaho
  campana(G + 0.2, 60, 0.09, 2.2); whoosh(G + 0.1, 1.2, 0.13);
  // cepa: la ficha
  tic(Ce + 0.5, 0.22, 2200); nota(Ce + 0.5, 63, 0.07, 0.9);
  // tipos: cuatro tarjetas, cuatro notas
  for (let i = 0; i < 4; i++) { nota(Ti + 0.3 + i * 0.4, ESC[3 + i * 2], 0.07, 0.8); tic(Ti + 0.3 + i * 0.4, 0.14, 3000); }
  // cepario: la gradilla se llena (una nota cada 4 viales)
  for (let i = 0; i < 18; i++) nota(Cp + 0.3 + i * 0.2, ESC[i % ESC.length], 0.04, 0.3);
  // cuido: la puerta del congelador
  golpe(Cu + 0.5, 0.34, 70); whoosh(Cu + 0.9, 1.4, 0.15);
  // pregunta
  sube(Q + 0.1, 1.2, 48, 60, 0.05);
  // capítulo 1: −80, golpe seco; el glicerol cae
  golpe(C1 + 0.2, 0.34, 100); sube(C1 + 0.3, 2.0, 72, 48, 0.06);
  for (let i = 0; i < 5; i++) tic(C1 + 1.8 + i * 0.22, 0.14, 2600);
  // capítulo 2: metal y vaho
  metal(C2 + 0.3, 0.28); whoosh(C2 + 0.6, 1.8, 0.18); sube(C2 + 0.4, 1.8, 55, 38, 0.06);
  for (let i = 0; i < 4; i++) campana(C2 + 1.6 + i * 0.5, 72 + i * 3, 0.05, 1.4);
  // capítulo 3: la bomba de vacío
  tic(C3 + 0.4, 0.26, 1500); vacio(C3 + 0.6, 2.6, 0.15);
  for (let i = 0; i < 6; i++) nota(C3 + 1.2 + i * 0.3, ESC[8 + (i % 6)], 0.05, 0.5);
  // dos copias: dos golpes iguales
  golpe(D + 0.4, 0.3, 84); golpe(D + 1.2, 0.3, 84);
  // mundo: el número sube
  sube(M + 0.3, 2.6, 48, 72, 0.06); golpe(M + 2.9, 0.28, 74);
  // cierre: el vial otra vez
  campana(C + 0.3, 60, 0.09, 2.4); nota(C + 2.4, 67, 0.07, 1.6);
  nota(Ou + 0.3, 36, 0.08, 2.8); nota(Ou + 0.3, 43, 0.06, 2.8); nota(Ou + 0.3, 48, 0.05, 2.8);
}

/* ---------- mezcla y WAV ---------- */
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const L = Math.tanh((mus[i] * 0.9 + sfx[i] * 0.8) * 1.2), R2 = Math.tanh((mus[i] * 0.85 + sfx[i] * 0.8) * 1.2);
  buf.writeInt16LE(Math.round(L * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R2 * 32767), 46 + i * 4);
}
fs.mkdirSync(path.join(HERE, 'assets'), { recursive: true });
fs.writeFileSync(path.join(HERE, OUT), buf);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s`);
