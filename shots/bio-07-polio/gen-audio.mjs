// gen-audio.mjs — música y efectos del Shot bio-07 (el virus escrito desde su secuencia). Todo sintetizado.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (el gemelo mudo)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Polio Datos.dc.html" → la música son los datos: una nota por cada fila de 50 letras
//      (150 filas = 7,500 letras), un golpe grave en el ratón, ruido en el susto, dos sellos y un
//      candado en las reglas. Y cuenta el estado: tapada mientras dura el susto, limpia con las reglas.
//  · versión narrada (la llama narrar.mjs) → cama grave continua SIN golpe, debajo de la voz.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Polio Datos.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 2002; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [50, 53, 55, 57, 60, 62, 65, 67, 69, 72, 74, 77, 79, 81, 84]; // re menor pentatónica

const tic = (t, g = 0.25, f = 2600) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 95) * g, 0.06);
const nota = (t, m, g = 0.09, d = 0.5) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.22 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.005, d * 0.4) * g; }, d);
const sube = (t, d, m0, m1, g = 0.07) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const golpe = (t, g = 0.4, f0 = 78) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 8) * g; }, 0.6); };
const whoosh = (t, d = 0.6, g = 0.2) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
const sello = (t, g = 0.5) => { golpe(t, g * 0.7, 120); add(sfx, t, (u, i) => NOISE[(i * 7) % NOISE.length] * Math.exp(-u * 40) * g * 0.5, 0.2); };
const metal = (t, g = 0.3) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * 760 * k * u) / k, 0) * Math.exp(-u * 11) * g, 0.7);
const ruido = (t, d = 1.6, g = 0.16) => { const h = hp(); add(sfx, t, (u, i) => h(NOISE[(i * 3) % NOISE.length], 500) * Math.sin(Math.PI * u / d) * g, d); };
const pad = (t0, t1, g = 0.05, notas = [38, 45, 50], tapa = 0) => {
  const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) {
    const t = i / SR, u = (i - n0) / (n1 - n0), tp = typeof tapa === 'function' ? tapa(u) : tapa;
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 240 + 900 * (1 - tp)) * g * (1 + 0.5 * tp) * (0.85 + 0.15 * Math.sin(t * 0.6)) * Math.min(1, u * 8, (1 - u) * 8);
  }
};

if (K.Vacio != null) {
  /* ---------- GEMELO MUDO: una nota por cada fila de 50 letras ---------- */
  const { Vacio: V, Llena: Ll, Completo: Co, Vira: Vi, Raton: R, Susto: S, Reglas: Re, Cierra: Ci, Outro: Ou } = K;
  pad(0, R, 0.05, [38, 45, 50], 0.3);
  pad(R, Re, 0.06, [38, 44, 49], 0.95);                 // tapada y tensa: el susto
  pad(Re, Ou + 3.5, 0.055, [38, 45, 50, 57], 0);        // limpia: las reglas resuelven
  // 150 filas de 50 letras: 150 notas que suben mientras el contador llega a 7,500
  const dur = (Co - 0.2) - Ll;
  for (let r = 0; r < 150; r++) {
    const t = Ll + dur * (r / 150);
    nota(t, ESC[Math.floor(r / 150 * ESC.length)], 0.03 + 0.035 * (r / 150), 0.3);
    if (r % 10 === 0) tic(t, 0.12, 3000);
  }
  golpe(Co, 0.34, 70);                                   // el genoma completo
  // las letras se enrollan y aparece la cápside
  whoosh(Vi + 0.3, 1.6, 0.2);
  [0, 4, 7, 11].forEach((k, i) => nota(Vi + 2.8 + i * 0.12, 50 + k, 0.08, 1.8));
  // el ratón: un golpe grave y la música ya está tapada
  golpe(R + 1.4, 0.42, 52);
  // el susto
  ruido(S + 0.2, 2.2, 0.17); for (let i = 0; i < 7; i++) tic(S + 0.6 + i * 0.55, 0.14, 1200 + rnd() * 900);
  // las reglas: dos sellos y el candado que cierra
  sello(Re + 1.8, 0.5); sello(Re + 3.2, 0.5); metal(Re + 5.0, 0.34); golpe(Re + 5.2, 0.3, 90);
  sube(Re + 5.0, 1.4, 50, 69, 0.06);
  // cierre: la pantalla se vacía (el loop)
  for (let i = 0; i < 10; i++) nota(Ci + 2.2 + i * 0.3, ESC[14 - i], 0.05, 0.4);
  nota(Ou + 0.3, 38, 0.08, 2.8); nota(Ou + 0.3, 45, 0.06, 2.8); nota(Ou + 0.3, 50, 0.05, 2.8);
} else {
  /* ---------- VERSIÓN NARRADA ---------- */
  const { Gancho: G, Equipo: E, Secuencia: S, Pedazos: P, Arman: A, Raton: R, Pregunta: Q,
    Porque: Po, Science: Sc, Critica: Cr, Reglas: Re, Hoy: H, Cierre: C, Outro: Ou } = K;
  pad(0, R, 0.045, [38, 45, 50], 0.3);
  pad(R, Re, 0.045, [38, 44, 49], 0.85);                 // tensa en el ratón y la crítica
  pad(Re, Ou + 3.5, 0.045, [38, 45, 50, 57], 0.05);      // se abre con las reglas
  // gancho: la pantalla se llena (un tic cada 10 filas) y el número
  for (let r = 0; r < 150; r += 10) { const t = G + 0.1 + 3.3 * (r / 150); tic(t, 0.1, 2800); nota(t, ESC[Math.floor(r / 150 * ESC.length)], 0.04, 0.35); }
  // equipo y secuencia
  golpe(E + 0.3, 0.3, 84);
  for (let i = 0; i < 8; i++) tic(S + 0.6 + i * 0.18, 0.1, 3200);
  // pedazos: 10 sobres que llegan
  for (let i = 0; i < 10; i++) { tic(P + 0.45 + i * 0.22, 0.2, 1500); nota(P + 0.45 + i * 0.22, ESC[3 + (i % 6)], 0.05, 0.45); }
  sube(P + 3.0, 0.8, 50, 69, 0.06);
  // arman: la tira se enrolla y aparece la cápside
  whoosh(A + 0.2, 1.8, 0.18); [0, 4, 7].forEach((k, i) => nota(A + 2.4 + i * 0.12, 50 + k, 0.07, 1.6));
  // ratón: un golpe grave
  golpe(R + 1.3, 0.4, 52);
  // pregunta
  sube(Q + 0.1, 1.0, 50, 62, 0.05);
  // porqué: leer y escribir
  nota(Po + 0.5, 57, 0.07, 1.0); nota(Po + 2.0, 69, 0.08, 1.2); tic(Po + 2.0, 0.16, 2600);
  // science: la portada
  golpe(Sc + 0.3, 0.32, 88);
  // crítica: voces encontradas
  tic(Cr + 0.5, 0.18, 1300); tic(Cr + 2.0, 0.18, 2200);
  // reglas: dos sellos
  sello(Re + 1.6, 0.46); sello(Re + 2.8, 0.46); sube(Re + 3.4, 1.2, 50, 69, 0.055);
  // hoy: la lupa revisa y sella
  whoosh(H + 0.5, 0.8, 0.13); sello(H + 2.4, 0.4);
  // cierre: el candado
  metal(C + 1.8, 0.3); golpe(C + 2.0, 0.28, 92);
  nota(Ou + 0.3, 38, 0.08, 2.8); nota(Ou + 0.3, 45, 0.06, 2.8); nota(Ou + 0.3, 50, 0.05, 2.8);
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
