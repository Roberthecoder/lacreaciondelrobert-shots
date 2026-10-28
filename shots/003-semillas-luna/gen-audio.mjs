// gen-audio.mjs — música + efectos del Shot 003 (semillas que viajaron a la Luna). Sin costo: todo se sintetiza aquí.
// Uso: node gen-audio.mjs <archivo.dc.html> <salida.wav>
// Narrada: cama grave continua SIN golpe (la voz manda) + efectos en el mismo cuadro + datos hechos sonido:
//   34 notas = 34 vueltas a la Luna · 5 notas = 5 especies · 40 toques = ~40 estados con árboles lunares.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Semillas Luna base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'musica_narrada.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91]; // la menor pentatónica, 3 octavas

const tic = (t, g = 0.3, f = 2400) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 90) * g, 0.06);
const nota = (t, m, g = 0.1, d = 0.6) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.25 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.006, d * 0.4) * g; }, d);
const sube = (t, d, m0, m1, g = 0.08) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const latido = (t, g = 0.22) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (55 + 30 * Math.exp(-u * 20)) / SR; return Math.sin(ph) * Math.exp(-u * 7) * g; }, 0.6); };
const golpe = (t, g = 0.4, f0 = 85) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); };
const metal = (t, g = 0.25) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * 820 * k * u) / k, 0) * Math.exp(-u * 12) * g, 0.6);
const cruje = (t, g = 0.6) => { for (let k = 0; k < 10; k++) tic(t + k * 0.03 + rnd() * 0.03, 0.12 * g + 0.04, 1800 + rnd() * 1800); const h = hp(), f = lp(); add(sfx, t + 0.08, (u, i) => h(f(NOISE[(i * 3) % NOISE.length], 900), 150) * Math.sin(Math.PI * Math.min(1, u / 1.0)) * g * 0.2, 1.0); };
const whoosh = (t, d = 0.6, g = 0.22) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
const pad = (t0, t1, g = 0.05, notas = [45, 52, 57]) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0); const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 520) * g * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8); } };
// momento en que un contador con kEase.suave cruza la fracción q (cada número suena cuando aparece)
const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const cruce = (q) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (suave(m) < q) lo = m; else hi = m; } return lo; };

const G = K.Gancho, V = K.Viaje, E = K.Especies, O = K.Orbita, P = K.Pregunta, D = K.Dentro, Va = K.Vacio, Es = K.Estudio, I = K.Igual, L = K.Lista, C = K.Cierre, Ou = K.Outro;
pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                   // cama grave continua, sin golpe
pad(D, Va, 0.03, [40, 47]);                                             // por dentro: más grave
// gancho: la semilla cae girando y toca el pasto; 34 notas = 34 vueltas
whoosh(G + 0.25, 1.4, 0.18); tic(G + 3.65, 0.3, 1400);
for (let k = 1; k <= 34; k++) nota(G + 1.3 + 2.2 * cruce((k - 0.5) / 34), ESC[Math.floor((k - 1) / 34 * ESC.length)], 0.045 + 0.03 * (k / 34), 0.35);
// viaje: tapa metálica y bolsitas
metal(V + 0.45, 0.22); [0, 1, 2, 3].forEach((i) => nota(V + 0.95 + i * 0.18, ESC[3 + i], 0.06, 0.5));
// especies: 5 notas, una por especie
for (let i = 0; i < 5; i++) { nota(E + 0.42 + i * 0.62, ESC[2 + i * 2], 0.08, 0.9); tic(E + 0.4 + i * 0.62, 0.12, 3000); }
// órbita: cada vuelta del contador, un toque; la nave pasa con un soplo
whoosh(O, 0.9, 0.2);
for (let k = 13; k <= 34; k++) tic(O + 0.6 + (P - 0.4 - O - 0.6) * cruce((k - 12.5) / 22), 0.07, 3200);   // el contador va de la vuelta 12 (separación) a la 34
for (let t = O + 0.4; t < P - 0.3; t += 2.62) whoosh(t, 1.0, 0.1);
// pregunta y por dentro: la Lupa se abre; el embrión "late" lento (dormido)
sube(P + 0.1, 1.6, 52, 64, 0.05);
sube(D + 0.1, 0.6, 64, 79, 0.07); whoosh(D + 0.1, 0.6, 0.15);
for (let t = D + 1.2; t < Va - 0.4; t += 2.4) latido(t, 0.2);
// vacío: las bolsas revientan; "¿ya no sirven?"
whoosh(Va, 0.8, 0.18); cruje(Va + 1.0, 0.7); golpe(Va + 3.6, 0.35, 60);
// estudio: tarjeta, macetas, brotan las dos (misma nota a la vez: no hay diferencia)
golpe(Es + 0.3, 0.4, 80); tic(Es + 3.3, 0.2, 1500); sube(I - 2.4, 1.8, 57, 69, 0.07); nota(I - 0.6, 69, 0.08, 1.2); nota(I - 0.6, 76, 0.06, 1.2);
// igual: los dos árboles crecen juntos; acorde al empatar
sube(I + 0.1, 2.9, 45, 57, 0.06); nota(I + 3.0, 57, 0.08, 1.6); nota(I + 3.0, 64, 0.07, 1.6); nota(I + 3.0, 69, 0.06, 1.6);
// lista: 40 toques = ~40 estados
for (let i = 0; i < 40; i++) nota(L + 0.3 + i * 0.07, ESC[(i * 3) % 10], 0.035, 0.25);
// cierre: regreso al pino y acorde final
whoosh(C, 0.8, 0.18); for (let k = 0; k < 4; k++) nota(C + 0.4 + k * 0.25, ESC[6 + k], 0.05, 0.7);
nota(Ou + 0.3, 57, 0.08, 2.8); nota(Ou + 0.3, 64, 0.06, 2.8); nota(Ou + 0.3, 69, 0.05, 2.8);

/* ---------- mezcla y WAV ---------- */
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const L2 = Math.tanh((mus[i] * 0.9 + sfx[i] * 0.8) * 1.2), R2 = Math.tanh((mus[i] * 0.85 + sfx[i] * 0.8) * 1.2);
  buf.writeInt16LE(Math.round(L2 * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R2 * 32767), 46 + i * 4);
}
fs.mkdirSync(path.join(HERE, 'assets'), { recursive: true });
fs.writeFileSync(path.join(HERE, OUT), buf);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s`);
