// gen-audio.mjs — música y efectos del Shot bio-08 (la insulina sale de un tanque). Todo sintetizado.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (el gemelo mudo)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Insulina Ciclo.dc.html" → la música son los datos: 51 notas = los 51 aminoácidos de la
//      insulina (21 de la cadena A + 30 de la cadena B), un blub por burbuja del tanque, un golpe por
//      cada división celular y el pulso lento del agitador. Cierra el loop volviendo al gen.
//  · versión narrada (la llama narrar.mjs) → cama grave continua SIN golpe, debajo de la voz.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Insulina Ciclo.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 1978; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [52, 55, 57, 59, 62, 64, 67, 69, 71, 74, 76, 79, 81, 83, 86]; // mi menor pentatónica

const tic = (t, g = 0.26, f = 2600) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 95) * g, 0.06);
const nota = (t, m, g = 0.09, d = 0.5) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.22 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.005, d * 0.4) * g; }, d);
const sube = (t, d, m0, m1, g = 0.07) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const golpe = (t, g = 0.38, f0 = 80) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); };
const whoosh = (t, d = 0.6, g = 0.2) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
const blub = (t, g = 0.15, f0 = 280) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 480 * u / 0.14) / SR; return Math.sin(ph) * Math.exp(-u * 26) * g; }, 0.3); };
const metal = (t, g = 0.28) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * 820 * k * u) / k, 0) * Math.exp(-u * 12) * g, 0.6);
// pulso lento del agitador: un latido grave cada 1.1 s mientras el tanque trabaja
const agitador = (t0, t1, g = 0.12) => { for (let t = t0; t < t1; t += 1.1) golpe(t, g, 58); };
const pad = (t0, t1, g = 0.05, notas = [40, 47, 52], tapa = 0) => {
  const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) {
    const t = i / SR, u = (i - n0) / (n1 - n0), tp = typeof tapa === 'function' ? tapa(u) : tapa;
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 260 + 900 * (1 - tp)) * g * (1 + 0.5 * tp) * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8);
  }
};

if (K.Entra != null) {
  /* ---------- GEMELO MUDO (ciclo) ---------- */
  const { Gen: Ge, Plasmido: P, Entra: E, Divide: D, Tanque: Ta, Ribosoma: Ri, Sale: S, Frasco: F, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.055, [40, 47, 52], 0.2);
  // el gen se recorta: dos clics
  tic(Ge + 1.2, 0.3, 3000); tic(Ge + 1.35, 0.26, 2200); sube(Ge + 2.0, 1.2, 52, 67, 0.06);
  // el plásmido se cierra: clic metálico
  metal(P + 3.0, 0.3); nota(P + 3.0, 59, 0.08, 1.2);
  // entra a la célula
  whoosh(E + 0.6, 1.0, 0.18); nota(E + 1.6, 64, 0.08, 1.4);
  // cada división celular, un golpe (16 divisiones)
  for (let i = 0; i < 16; i++) { golpe(D + 0.5 + i * 0.4, 0.26, 70 + i * 2); tic(D + 0.5 + i * 0.4, 0.1, 2600); }
  // el tanque: agitador y burbujas
  agitador(Ta, S, 0.11);
  for (let i = 0; i < 30; i++) blub(Ta + 0.3 + i * 0.4, 0.11 + rnd() * 0.05, 230 + rnd() * 200);
  // 51 notas = 51 aminoácidos
  const d51 = (S - 0.6) - (Ri + 0.4);
  for (let k = 0; k < 51; k++) nota(Ri + 0.4 + d51 * (k / 51), ESC[Math.floor(k / 51 * ESC.length)], 0.045 + 0.03 * (k / 51), 0.35);
  golpe(S - 0.5, 0.3, 76);
  // sale: la levadura la secreta (soplo suave), la bacteria se abre (crujido corto)
  for (let i = 0; i < 5; i++) whoosh(S + 0.3 + i * 0.5, 0.5, 0.1);
  for (let i = 0; i < 6; i++) tic(S + 1.4 + i * 0.12, 0.2, 1500 + rnd() * 1200);
  // el frasco se llena y la cámara vuelve al gen: cierra el loop
  for (let i = 0; i < 10; i++) nota(F + 1.0 + i * 0.26, ESC[4 + (i % 8)], 0.055, 0.6);
  sube(F + 4.4, 1.6, 67, 52, 0.06);
  nota(Ou + 0.3, 40, 0.08, 2.8); nota(Ou + 0.3, 47, 0.06, 2.8); nota(Ou + 0.3, 52, 0.05, 2.8);
} else {
  /* ---------- VERSIÓN NARRADA ---------- */
  const { Gancho: G, Antes: A, Reaccion: R, Gen: Ge, Lee: L, Pregunta: Q, Plasmido: P, Ribosoma: Ri,
    Humulin: H, Hoy: Ho, Levadura: Le, Diferencia: D, Cierre: C, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.045, [40, 47, 52], 0.2);
  pad(R, Ge, 0.03, [39, 46], 0.8);                       // tensa en las reacciones
  // gancho: el tanque trabajando
  agitador(G, A, 0.1); for (let i = 0; i < 10; i++) blub(G + 0.3 + i * 0.42, 0.12, 240 + rnd() * 200);
  // antes: los animales y el frasco viejo
  golpe(A + 0.3, 0.3, 84); tic(A + 1.7, 0.2, 1400);
  // reacción: tres piquetes
  for (let i = 0; i < 4; i++) tic(R + 0.9 + i * 0.22, 0.2, 1200);
  golpe(R + 2.2, 0.32, 60);
  // gen: se recorta y el plásmido se cierra
  tic(Ge + 1.15, 0.3, 3000); tic(Ge + 1.3, 0.26, 2200); metal(Ge + 2.9, 0.28); nota(Ge + 2.9, 59, 0.07, 1.2);
  // lee: salen cadenas
  for (let i = 0; i < 5; i++) { nota(L + 1.7 + i * 0.3, ESC[5 + i], 0.06, 0.7); tic(L + 1.7 + i * 0.3, 0.1, 2800); }
  // pregunta
  sube(Q + 0.1, 1.2, 52, 64, 0.05);
  // plásmido: la Lupa se abre
  whoosh(P + 0.3, 0.7, 0.16); sube(P + 0.3, 0.6, 64, 79, 0.06);
  // ribosoma: 51 notas = 51 aminoácidos
  const d51 = (H - 0.4) - (Ri + 0.4);
  for (let k = 0; k < 51; k++) nota(Ri + 0.4 + d51 * (k / 51), ESC[Math.floor(k / 51 * ESC.length)], 0.04 + 0.025 * (k / 51), 0.3);
  // humulin: el sello
  golpe(H + 0.3, 0.36, 86); metal(H + 2.7, 0.26);
  // hoy y levadura
  tic(Ho + 0.3, 0.2, 1800);
  for (let i = 0; i < 4; i++) whoosh(Le + 0.9 + i * 0.5, 0.5, 0.11);
  // diferencia: la bacteria guarda grumos (golpes sordos), la levadura suelta (soplos)
  for (let i = 0; i < 3; i++) golpe(D + 0.6 + i * 0.3, 0.2, 92);
  for (let i = 0; i < 3; i++) whoosh(D + 2.1 + i * 0.4, 0.45, 0.1);
  // cierre: el tanque otra vez
  agitador(C, Ou, 0.1); for (let i = 0; i < 8; i++) blub(C + 0.4 + i * 0.5, 0.11, 240 + rnd() * 200);
  nota(Ou + 0.3, 40, 0.08, 2.8); nota(Ou + 0.3, 47, 0.06, 2.8); nota(Ou + 0.3, 52, 0.05, 2.8);
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
