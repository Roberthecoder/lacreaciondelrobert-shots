// gen-audio.mjs — música y efectos del Shot Libre 01 · Bacterias calientes (chiste MUDO: sin voz). Nada grabado: todo se calcula aquí.
// v2 (4 nov 2026): chiste directo de 20.5 s. Fría y temblorosa (refri) → bip 37 °C → tema "romántico" juguetón (órgano + sax)
// → rayón y silencio ("¿eh?") → "plop" de cada fisión con tono que sube → golpe musical de remate → cierre.
// Cada acción en pantalla tiene su efecto en el mismo cuadro (los tiempos copian los de bacterias.jsx).
// Uso (lo llama .github/workflows/auto-render.yml desde la carpeta del shot):
//   node gen-audio.mjs "Shot Bacterias calientes.dc.html" assets/mezcla.wav
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bacterias calientes.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const src = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(src.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}; let acc = 0; for (const s of scenes) { K[s.name] = acc; acc += s.dur; }
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.2) * SR);
const I = K.Incubadora, C = K.Calientes, R = K.Remate, O = K.Outro;

const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 11; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (buf, t, dur, fn) => { const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const env = (u, a, d) => (u < a ? u / a : Math.exp(-(u - a) / d));
const ventana = (u, d, a = 0.02, r = 0.08) => Math.min(1, u / a, Math.max(0, (d - u) / r));

/* ---------- efectos ---------- */
const tic = (t, g = 0.25, f = 2400) => add(sfx, t, 0.05, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.4 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 110) * g);
const golpe = (t, g = 0.45, f0 = 80) => { let ph = 0; add(sfx, t, 0.5, (u) => { ph += 2 * Math.PI * (f0 + 120 * Math.exp(-u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }); };
const metal = (t, g = 0.2, f0 = 900) => add(sfx, t, 0.6, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * f0 * k * u) / k, 0) * Math.exp(-u * 11) * g);
const whoosh = (t, d = 0.6, g = 0.2, f1 = 3000) => { const f = lp(), h = hp(); add(sfx, t, d, (u, i) => h(f(NOISE[i % NOISE.length], 300 + f1 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g); };
const succion = (t, g = 0.3) => { const f = lp(); add(sfx, t, 0.25, (u, i) => f(NOISE[(i * 3) % NOISE.length], 1800) * Math.exp(-u * 18) * g); golpe(t, g * 0.4, 140); };
const rechina = (t, d = 0.5, g = 0.08) => { let ph = 0; add(sfx, t, d, (u) => { ph += 2 * Math.PI * (380 + 220 * Math.sin(u * 9) + 120 * (u / d)) / SR; const saw = (ph / Math.PI) % 2 - 1; return saw * Math.sin(Math.PI * u / d) * g * (0.6 + 0.4 * Math.sin(u * 70)); }); };
const beep = (t, f = 1760, d = 0.12, g = 0.12) => add(sfx, t, d, (u) => (Math.sin(2 * Math.PI * f * u) > 0 ? 1 : -1) * 0.5 * ventana(u, d, 0.004, 0.02) * g);
const castaneo = (t, d, g = 0.06) => { for (let k = 0; k * 0.045 < d; k++) { const s = t + k * 0.045 + rnd() * 0.012; const fuerza = 0.5 + 0.5 * Math.sin(k * 0.9); tic(s, g * fuerza, 1500 + rnd() * 900); } };
const boing = (t, m0 = 72, g = 0.1) => { let ph = 0; add(sfx, t, 0.35, (u) => { ph += 2 * Math.PI * hz(m0 + 12 * (1 - Math.exp(-u * 14)) + Math.sin(u * 60) * 0.6) / SR; return Math.sin(ph) * env(u, 0.01, 0.12) * g; }); };
const ting = (t, m = 96, g = 0.09) => add(sfx, t, 0.9, (u) => (Math.sin(2 * Math.PI * hz(m) * u) + 0.4 * Math.sin(2 * Math.PI * hz(m + 7) * u)) * Math.exp(-u * 5) * g);
// "plop" de una fisión: burbuja que revienta, con tono m
const plop = (t, m = 64, g = 0.3) => { let ph = 0; add(sfx, t, 0.22, (u) => { ph += 2 * Math.PI * hz(m) * (1 + 2.5 * Math.min(1, u / 0.05)) / SR; return Math.sin(ph) * env(u, 0.003, 0.05) * g; }); tic(t, 0.08, 3800); };
// se estira (la bacteria se alarga antes de partirse): chirrido de hule que sube
const estira = (t, d = 1.2, m0 = 50, m1 = 62, g = 0.07) => { let ph = 0; add(sfx, t, d, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) * (1 + 0.012 * Math.sin(u * 40)) / SR; const sq = Math.sin(ph) + 0.35 * Math.sin(3 * ph); return sq * Math.sin(Math.PI * Math.min(1, u / d)) * g; }); };
const rayon = (t, g = 0.18) => { const f = lp(); let ph = 0; add(sfx, t, 0.45, (u, i) => { ph += 2 * Math.PI * (900 * Math.exp(-u * 7)) / SR; return (Math.sin(ph) * 0.6 + f(NOISE[i % NOISE.length], 2500) * 0.6) * Math.exp(-u * 6) * g; }); };
const tiriteo = (t0, t1, g = 0.025) => { const f = lp(); add(sfx, t0, t1 - t0, (u, i) => f(NOISE[(i * 7) % NOISE.length], 2600) * (0.5 + 0.5 * Math.sin(u * 2 * Math.PI * 0.4)) * ventana(u, t1 - t0, 0.6, 0.6) * g); };
const zumbidoRefri = (t0, t1, g = 0.025) => add(sfx, t0, t1 - t0, (u) => (Math.sin(2 * Math.PI * 60 * u) + 0.4 * Math.sin(2 * Math.PI * 120 * u)) * ventana(u, t1 - t0, 0.5, 0.5) * g);

/* ---------- instrumentos ---------- */
// cama fría: notas agudas con trémolo rápido (tirita), ahogadas
const padFrio = (t0, t1, g = 0.04, notas = [76, 83, 88]) => { const f = lp(); add(mus, t0, t1 - t0, (u) => {
  const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * u * (1 + 0.002 * Math.sin(u * 3))), 0) / notas.length;
  return f(x, 1400) * (0.55 + 0.45 * Math.sin(2 * Math.PI * 9 * u)) * ventana(u, t1 - t0, 0.8, 0.8) * g; }); };
const pluck = (t, m, g = 0.08, d = 0.5, corte = 3000) => { const f = lp(); add(mus, t, d, (u) => f((Math.sin(2 * Math.PI * hz(m) * u) + 0.5 * Math.sin(4 * Math.PI * hz(m) * u)) * Math.exp(-u * 9), corte) * g); };
// órgano (barras armónicas) con trémolo lento
const organo = (t, d, notas, g = 0.03) => add(mus, t, d, (u) => notas.reduce((a, m) => { const f0 = hz(m); return a + Math.sin(2 * Math.PI * f0 * u) + 0.5 * Math.sin(4 * Math.PI * f0 * u) + 0.25 * Math.sin(6 * Math.PI * f0 * u); }, 0) / notas.length * (0.85 + 0.15 * Math.sin(2 * Math.PI * 5.5 * u)) * ventana(u, d, 0.05, 0.12) * g);
// bajo redondo
const bajo = (t, m, d = 0.5, g = 0.13) => add(mus, t, d, (u) => (Math.sin(2 * Math.PI * hz(m) * u) + 0.3 * Math.sin(4 * Math.PI * hz(m) * u)) * env(u, 0.006, d * 0.5) * g);
// sax sintetizado: diente de sierra filtrado con vibrato que entra tarde
const sax = (t, m, d, g = 0.06) => { const f = lp(); let ph = 0; add(mus, t, d, (u) => { const vib = 1 + 0.006 * Math.sin(2 * Math.PI * 5.2 * u) * Math.min(1, u / 0.25); ph += hz(m) * vib / SR; const saw = 2 * (ph % 1) - 1;
  return f(saw, 900 + 1500 * Math.min(1, u / 0.08) * Math.exp(-u * 1.2)) * ventana(u, d, 0.03, 0.09) * g; }); };
const escobilla = (t, g = 0.03) => { const h = hp(); add(mus, t, 0.12, (u, i) => h(NOISE[(i * 11) % NOISE.length], 4000) * Math.exp(-u * 30) * g); };
const bombo = (t, g = 0.16) => { let ph = 0; add(mus, t, 0.3, (u) => { ph += 2 * Math.PI * (50 + 70 * Math.exp(-u * 40)) / SR; return Math.sin(ph) * Math.exp(-u * 12) * g; }); };

/* ===================== LÍNEA DE TIEMPO (copia los tiempos de bacterias.jsx) ===================== */
// 1 · REFRI 0–4: trémolo agudo, pizzicato ahogado, castañeteo de dientes, zumbido del refri, ráfaga con copos
padFrio(0, I + 0.6, 0.045);
zumbidoRefri(0, I + 0.4);
tiriteo(0, I + 0.3);
const frioMel = [69, 72, 71, 69, 64, 67, 69, 64];
for (let k = 0; k < 8; k++) pluck(0.1 + k * 0.5, frioMel[k], 0.07, 0.5, 1600);
for (let k = 0; k < 2; k++) bajo(k * 2, 45, 1.2, 0.06);
for (let k = 0; k < 4; k++) castaneo(0.05 + k * 1.0, 0.6, 0.05);
golpe(0.05, 0.25, 70); whoosh(0.0, 0.7, 0.12, 1800);
whoosh(1.6, 1.6, 0.2, 4200); for (let k = 0; k < 6; k++) tic(1.7 + k * 0.22, 0.05, 5200 + k * 300);
// 2 · INCUBADORA 4–8
succion(I + 0.15, 0.3);                                                    // se abre el refri
whoosh(I + 0.55, 1.0, 0.18, 2200);                                         // la mano lleva la caja
rechina(I + 0.7, 0.35, 0.06);                                              // se abre la incubadora
golpe(I + 1.3, 0.3, 95); tic(I + 1.3, 0.12, 1800);                         // se cierra el refri
metal(I + 1.5, 0.12, 1400);                                                // deja la caja en la repisa
golpe(I + 2.1, 0.5, 70); tic(I + 2.12, 0.2, 1200);                         // ¡pum! se cierra la incubadora
for (let k = 0; k <= 16; k++) beep(I + 2.2 + (1.2 * k) / 16, 1200 + k * 36, 0.03, 0.035);   // el display cuenta 4 → 37
{ let ph = 0; add(mus, I + 2.2, 1.4, (u) => { ph += 2 * Math.PI * hz(45 + 12 * (u / 1.4)) / SR; return (Math.sin(ph) + 0.5 * Math.sin(2 * ph)) * Math.sin(Math.PI * Math.min(1, u / 1.4) * 0.5) * 0.07; }); }
beep(I + 3.45, 1760, 0.1, 0.12); beep(I + 3.62, 2350, 0.16, 0.12);        // bip-bip: 37 °C
// 3 · CALIENTES 8–13: tema "romántico" juguetón (96 bpm): ii–V–I–VI en Do
const BEAT = 60 / 96, t0 = C + 0.05;
const acordes = [[62, 65, 69, 72], [55, 59, 62, 65], [60, 64, 67, 71], [57, 61, 64, 67]];
const bajos = [[38, 45, 41, 45], [31, 38, 35, 38], [36, 43, 40, 43], [33, 40, 37, 40]];
const finTema = R - 0.08;
const nBeats = Math.floor((finTema - t0) / BEAT);
for (let b = 0; b < nBeats; b++) {
  const bar = Math.floor(b / 4) % 4, tb = t0 + b * BEAT;
  if (b % 4 === 0) organo(tb, Math.min(BEAT * 4, finTema - tb), acordes[bar], 0.032);
  bajo(tb, bajos[bar][b % 4], BEAT * 0.9, 0.12);
  escobilla(tb + BEAT * 0.5, 0.025); if (b % 2 === 1) escobilla(tb, 0.04);
}
const frase = [[1, 74, 1], [2, 76, 0.5], [2.5, 77, 0.5], [3, 79, 2.5], [6, 77, 0.5], [6.5, 76, 0.5], [7, 74, 1]];
for (const [bt, m, d] of frase) { const t = t0 + bt * BEAT; if (t < finTema - 0.1) sax(t, m, Math.min(d * BEAT, finTema - t), 0.065); }
whoosh(C + 0.2, 0.6, 0.14, 2600); whoosh(C + 0.3, 0.6, 0.12, 2900); whoosh(C + 0.35, 0.6, 0.12, 3200);   // salen volando las bufandas
golpe(C + 1.2, 0.2, 90);                                                                                    // entra «Ya están calientes»
{ const f = lp(); add(sfx, C + 1.0, 3.2, (u, i) => f(NOISE[(i * 13) % NOISE.length], 5000) * ventana(u, 3.2, 0.5, 0.5) * 0.012); }   // chisporroteo (sudor)
for (let k = 0; k < 5; k++) boing(C + 1.6 + k * 0.4, 72 + (k % 3) * 2, 0.07);                             // corazones
ting(C + 2.2, 96, 0.07); ting(C + 2.6, 98, 0.07);                                                         // guiños
whoosh(C + 3.4, 0.8, 0.16, 2400); whoosh(C + 3.5, 0.8, 0.14, 2800);                                       // las otras dos se van
whoosh(C + 4.0, 0.8, 0.2, 3500);                                                                          // la vista llena la pantalla
// 4 · REMATE 13–17: rayón, silencio, "¿eh?"… plop, plop, plop (cada uno más agudo) y golpe musical
rayon(R - 0.08, 0.2);
boing(R + 0.47, 64, 0.09);                                                                                // "¿eh?"
const EXP = { t0: 0.9, paso: 0.42, D: 0.4, gens: 6 };   // = bacterias.jsx
const tGen = (g) => R + EXP.t0 + g * EXP.paso, tSepGen = (g) => tGen(g) + EXP.D * 0.5;
for (let g = 0; g < EXP.gens; g++) { estira(tGen(g), EXP.D * 0.45, 50 + g * 3, 58 + g * 3, 0.04); plop(tSepGen(g), 60 + g * 3, 0.32); bombo(tSepGen(g), 0.14); tic(tSepGen(g) + 0.02, 0.1, 2000 + g * 200); }
for (let k = 0; k * 0.105 < tSepGen(EXP.gens - 1) - tSepGen(0); k++) { const t = tSepGen(0) + k * 0.105; pluck(t, [60, 64, 67, 72][k % 4] + Math.floor(k / 4) * 2, 0.04, 0.25, 2600); }
golpe(R + 1.3, 0.3, 80);                                                                                  // entra «…y ni pareja necesitan»
const tFin = tSepGen(EXP.gens - 1) + 0.05;
golpe(tFin, 0.55, 60); metal(tFin, 0.12, 700); organo(tFin, 1.6, [60, 64, 67, 72, 76], 0.05); bajo(tFin, 36, 1.4, 0.16);   // ¡ta-dá!
for (let k = 0; k < 4; k++) ting(tFin + 0.25 + k * 0.15, 88 + k * 2, 0.03);
// 5 · CIERRE
golpe(O + 0.15, 0.25, 70); organo(O + 0.25, 3.0, [57, 64, 69, 76], 0.035); ting(O + 0.3, 93, 0.06);

/* ---------- mezcla ---------- */
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
const finO = Math.floor((TOTAL - 0.6) * SR);
for (let i = 0; i < N; i++) {
  const fade = i > finO ? Math.max(0, 1 - (i - finO) / (0.8 * SR)) : 1;
  const L = Math.tanh((mus[i] * 1.0 + sfx[i] * 0.95) * 1.3) * fade, Rr = Math.tanh((mus[i] * 0.92 + sfx[i] * 0.95) * 1.3) * fade;
  buf.writeInt16LE(Math.round(L * 32000), 44 + i * 4); buf.writeInt16LE(Math.round(Rr * 32000), 46 + i * 4);
}
const o = path.join(HERE, OUT); fs.mkdirSync(path.dirname(o), { recursive: true }); fs.writeFileSync(o, buf);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s`);
