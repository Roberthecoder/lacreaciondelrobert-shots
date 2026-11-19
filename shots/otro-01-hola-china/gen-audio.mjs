// gen-audio.mjs — música y efectos del Shot Otro 01 · Hola, China (presentación MUDA: sin voz). Nada grabado: todo se calcula aquí.
// Pieza original en Re mayor a 116 bpm (receta: maestro/recetas/composicion-musical.md). Cálida, curiosa y humana; sin cliché
// «oriental» (nada de gong ni escala pentatónica de película): marimba, guitarra de nailon (Karplus-Strong), flauta, bajo,
// colchón de cuerdas y percusión de mano. Forma atada a las escenas (1 escena = 2 o 3 compases):
//   Hola (A: tema en marimba) → Ciencia (A': secuencia del tema, entra el bajo) → Neta (B: se vacía, juguetón, staccato y un
//   «¿eh?» con silencio) → Amigos (A'': el tema en guitarra con banda completa) → China (C: el tema en flauta una octava arriba,
//   colchón que crece, acorde prestado Sol menor 6 = nostalgia del «algún día») → Cierre (cadencia en Re add9 que se queda sonando).
// Cada cosa que pasa en pantalla tiene su efecto en el mismo cuadro (los tiempos copian los de hola-china.jsx).
// Uso (lo llama .github/workflows/auto-render.yml desde la carpeta del shot):
//   node gen-audio.mjs "Shot Hola China.dc.html" assets/mezcla.wav
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hola China.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const src = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(src.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}; let acc = 0; for (const s of scenes) { K[s.name] = acc; acc += s.dur; }
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const H = K.Hola, C = K.Ciencia, Ne = K.Neta, A = K.Amigos, Z = K.China, O = K.Outro;
const n2 = Ne + 2.7, z2 = Z + 3.0;                         // = hola-china.jsx
const BPM = 116, BEAT = 60 / BPM, BAR = 4 * BEAT;

// buses estéreo: melodía, acompañamiento, efectos y envío a la sala (reverberación)
const mk = () => [new Float32Array(N), new Float32Array(N)];
const MEL = mk(), ACO = mk(), SFX = mk(), SALA = mk();
let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const hum = (t, j = 0.01) => t + (rnd() - 0.5) * 2 * j;          // tiempo humano (±10 ms)
const vel = (g, j = 0.15) => g * (1 - j / 2 + rnd() * j);        // intensidad humana
// add(bus, t, dur, fn, pan -1..1, envío a sala)
const add = (bus, t, dur, fn, pan = 0, sala = 0.25) => {
  const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR);
  const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < n && i0 + i < N; i++) { const v = fn(i / SR, i); bus[0][i0 + i] += v * gl; bus[1][i0 + i] += v * gr; if (sala) { SALA[0][i0 + i] += v * gl * sala; SALA[1][i0 + i] += v * gr * sala; } }
};
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const ventana = (u, d, a = 0.02, r = 0.08) => Math.max(0, Math.min(1, u / a, (d - u) / r));

/* ===================== INSTRUMENTOS ===================== */
// marimba: fundamental + parcial afinado (~3.93×, como la barra real) + golpe de baqueta
const marimba = (bus, t, m, g = 0.1, d = 1.1, pan = 0) => { const f = hz(m); t = hum(t); g = vel(g);
  add(bus, t, d, (u, i) => (Math.sin(2 * Math.PI * f * u) * Math.exp(-u * (3 + m / 30)) + 0.22 * Math.sin(2 * Math.PI * f * 3.93 * u) * Math.exp(-u * 22)
    + 0.08 * NOISE[(i * 3) % NOISE.length] * Math.exp(-u * 300)) * Math.min(1, u / 0.002) * g, pan, 0.3); };
// guitarra de nailon: cuerda pulsada Karplus-Strong (ataque suave, ruido filtrado)
const guitarra = (bus, t, m, g = 0.12, d = 1.6, pan = 0, brillo = 0.5) => { t = hum(t, 0.012); g = vel(g);
  const L = Math.max(2, Math.round(SR / hz(m))), buf = new Float32Array(L); const f = lp();
  for (let k = 0; k < L; k++) buf[k] = f(rnd() * 2 - 1, 1500 + 4000 * brillo);
  let p = 0; const fin = lp();
  add(bus, t, d, (u) => { const a = buf[p], b = buf[(p + 1) % L]; const y = 0.5 * (a + b) * 0.9965; buf[p] = y; p = (p + 1) % L; return fin(a, 3200) * ventana(u, d, 0.003, 0.15) * g * 1.6; }, pan, 0.3); };
// flauta: casi seno, soplo filtrado y vibrato que entra tarde (después de 0.25 s)
const flauta = (bus, t, m, d, g = 0.08, pan = 0.1) => { t = hum(t, 0.008); g = vel(g, 0.1); const f0 = hz(m); let ph = 0; const sop = lp(), sop1 = lp(), sop2 = hp();
  add(bus, t, d + 0.12, (u, i) => { const vib = 1 + 0.0055 * Math.sin(2 * Math.PI * 5.1 * u) * Math.min(1, Math.max(0, (u - 0.25) / 0.3)); ph += 2 * Math.PI * f0 * vib / SR;
    const tono = Math.sin(ph) + 0.18 * Math.sin(2 * ph) + 0.06 * Math.sin(3 * ph);
    const aire = sop2(sop1(sop(NOISE[(i * 7) % NOISE.length], 2600), 2600), 700) * (0.25 + 0.75 * Math.exp(-u * 12));
    return (tono + aire * 0.2) * ventana(u, d + 0.12, 0.06, 0.14) * g; }, pan, 0.45); };
// colchón de cuerdas: sierras desafinadas y filtradas, ataque lento
const colchon = (t, d, notas, g = 0.025, corte = 1400) => { const f = lp(), f2 = lp(); const ph = notas.flatMap((m) => [0.996, 1, 1.004].map((dt) => ({ f: hz(m) * dt, p: rnd() })));
  add(ACO, t, d, (u) => { let x = 0; for (const o of ph) { o.p += o.f / SR; const a = 2 * Math.PI * o.p; for (let h = 1; h <= 7; h++) x += Math.sin(h * a) / h; } x *= 0.6 / ph.length;   // sierra de armónicos limitados (sin aliasing)
    return f2(f(x, corte), corte * 1.2) * ventana(u, d, 0.5, 0.6) * g * 3; }, 0, 0.5); };
// bajo pulsado (como contrabajo/bajo acústico)
const bajo = (t, m, d = 0.5, g = 0.16) => { t = hum(t, 0.006); g = vel(g, 0.1); const f = hz(m), fl = lp();
  add(ACO, t, d, (u) => fl(Math.sin(2 * Math.PI * f * u) + 0.35 * Math.sin(4 * Math.PI * f * u) + 0.1 * Math.sin(6 * Math.PI * f * u), 900) * Math.min(1, u / 0.008) * Math.exp(-u * 2.6) * ventana(u, d, 0.001, 0.06) * g, 0, 0.08); };
// percusión de mano
const bombo = (t, g = 0.18) => { t = hum(t, 0.004); let ph = 0; add(ACO, t, 0.35, (u) => { ph += 2 * Math.PI * (48 + 60 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 10) * g; }, 0, 0.05); };
const aro = (t, g = 0.06, pan = -0.15) => { t = hum(t); g = vel(g, 0.3); const h = hp(); add(ACO, t, 0.08, (u, i) => (h(NOISE[(i * 5) % NOISE.length], 1800) * 0.7 + Math.sin(2 * Math.PI * 1750 * u) * 0.5) * Math.exp(-u * 70) * g, pan, 0.2); };
const palma = (t, g = 0.06) => { t = hum(t); const h = hp(); for (const dt of [0, 0.009, 0.019]) add(ACO, t + dt, 0.12, (u, i) => h(NOISE[(i * 13) % NOISE.length], 1200) * Math.exp(-u * (dt > 0.015 ? 25 : 90)) * g, 0.2, 0.35); };
const shaker = (t, g = 0.03, pan = 0.35) => { t = hum(t, 0.008); g = vel(g, 0.4); const h = hp(); add(ACO, t, 0.09, (u, i) => h(NOISE[(i * 11) % NOISE.length], 5000) * Math.min(1, u / 0.012) * Math.exp(-u * 45) * g, pan, 0.1); };
// glockenspiel (destellos)
const glock = (t, m, g = 0.05, pan = 0) => { const f = hz(m); add(SFX, hum(t, 0.004), 1.2, (u) => (Math.sin(2 * Math.PI * f * u) + 0.3 * Math.sin(2 * Math.PI * f * 2.76 * u) * Math.exp(-u * 6)) * Math.exp(-u * 3.2) * Math.min(1, u / 0.002) * g, pan, 0.5); };

/* ===================== EFECTOS ===================== */
const pop = (t, m = 76, g = 0.18, pan = 0) => { let ph = 0; add(SFX, t, 0.16, (u) => { ph += 2 * Math.PI * hz(m) * (0.7 + 0.6 * Math.min(1, u / 0.04)) / SR; return Math.sin(ph) * Math.min(1, u / 0.003) * Math.exp(-u * 30) * g; }, pan, 0.15); };
const tic = (t, g = 0.06, f = 3000, pan = 0) => add(SFX, t, 0.04, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 140) * g, pan, 0.1);
const whoosh = (t, d = 0.6, g = 0.1, f1 = 2500, pan0 = 0, pan1 = pan0) => { const f = lp(), h = hp(); const i0 = Math.floor(t * SR), n = Math.floor(d * SR);
  for (let i = 0; i < n && i0 + i < N; i++) { const u = i / n, pan = pan0 + (pan1 - pan0) * u; const v = h(f(NOISE[i % NOISE.length], 300 + f1 * Math.sin(Math.PI * u)), 150) * Math.sin(Math.PI * u) * g;
    SFX[0][i0 + i] += v * Math.cos((pan + 1) * Math.PI / 4); SFX[1][i0 + i] += v * Math.sin((pan + 1) * Math.PI / 4); } };
const papel = (t, d = 0.9, g = 0.05) => { const f = hp(), f2 = lp(); add(SFX, t, d, (u, i) => f2(f(NOISE[(i * 3) % NOISE.length], 1500), 6000) * (0.4 + 0.6 * Math.abs(Math.sin(u * 2 * Math.PI * 9))) * ventana(u, d, 0.05, 0.3) * g, 0, 0.2); };
const golpeSuave = (t, g = 0.14, f0 = 110) => { let ph = 0; add(SFX, t, 0.3, (u) => { ph += 2 * Math.PI * (f0 + 90 * Math.exp(-u * 40)) / SR; return Math.sin(ph) * Math.exp(-u * 14) * g; }, 0, 0.1); };
const boing = (t, m0 = 67, baja = false, g = 0.08, pan = 0) => { let ph = 0; add(SFX, t, 0.4, (u) => { const dm = baja ? -7 * (1 - Math.exp(-u * 10)) : 9 * (1 - Math.exp(-u * 14)); ph += 2 * Math.PI * hz(m0 + dm + Math.sin(u * 55) * 0.7) / SR; return Math.sin(ph) * Math.min(1, u / 0.01) * Math.exp(-u * 7) * g; }, pan, 0.2); };
const brillo = (t, base = 84, n = 5, g = 0.035, pan = 0) => { const esc = [0, 2, 4, 7, 9, 11, 12, 14]; for (let k = 0; k < n; k++) glock(t + k * 0.055, base + esc[k % esc.length] + 12 * Math.floor(k / esc.length), g * (1 - k * 0.08), pan); };
const sello = (t) => { golpeSuave(t, 0.2, 95); tic(t + 0.005, 0.07, 1800); };
const motorAvion = (t, d) => { const f = lp(), f2 = lp(); let ph = 0; const i0 = Math.floor(t * SR), n = Math.floor(d * SR);
  for (let i = 0; i < n && i0 + i < N; i++) { const u = i / n, pan = 0.85 - 1.7 * u; ph += 2 * Math.PI * (180 + 40 * Math.sin(Math.PI * u)) / SR;
    const fc = 700 + 1500 * Math.sin(Math.PI * u); const v = (f2(f(NOISE[(i * 3) % NOISE.length], fc), fc) * 1.1 + Math.sin(ph) * 0.12) * Math.sin(Math.PI * u) * 0.09;
    SFX[0][i0 + i] += v * Math.cos((pan + 1) * Math.PI / 4); SFX[1][i0 + i] += v * Math.sin((pan + 1) * Math.PI / 4); SALA[0][i0 + i] += v * 0.2; SALA[1][i0 + i] += v * 0.2; } };

/* ===================== PARTITURA ===================== */
// Acordes por compás (notas MIDI de la voz media; el bajo aparte). Conducción de voces: cada voz va a la nota más cercana.
const b = (n) => n * BAR;                                  // inicio del compás n (Hola empieza en 0)
const ACORDES = [
  { c: 0, d: 1, v: [62, 66, 69, 73], bj: 38 },             // Dmaj7
  { c: 1, d: 1, v: [62, 67, 71, 74], bj: 43 },             // G/D → G(add9)
  { c: 2, d: 1, v: [62, 66, 69, 73], bj: 47 },             // Bm7 (sobre Si)
  { c: 3, d: 0.5, v: [62, 64, 69, 74], bj: 45 },           // Asus4
  { c: 3.5, d: 0.5, v: [61, 64, 69, 73], bj: 45 },         // A
  { c: 4, d: 1, v: [62, 64, 67, 71], bj: 40 },             // Em7
  { c: 5, d: 1, v: [61, 64, 66, 69], bj: 42 },             // F#m7
  { c: 6, d: 0.5, v: [62, 64, 67, 71], bj: 43 },           // G6
  { c: 6.5, d: 0.5, v: [61, 64, 67, 69], bj: 45 },         // A7 (después del silencio)
  { c: 7, d: 1, v: [62, 66, 69, 74], bj: 38 },             // D
  { c: 8, d: 0.5, v: [62, 66, 69, 71], bj: 47 },           // Bm7
  { c: 8.5, d: 0.5, v: [62, 67, 71, 74], bj: 43 },         // G
  { c: 9, d: 1, v: [62, 66, 67, 71], bj: 43 },             // Gmaj7
  { c: 10, d: 0.5, v: [61, 64, 66, 69], bj: 45 },          // A6
  { c: 10.5, d: 0.5, v: [61, 64, 66, 69], bj: 42 },        // F#m7
  { c: 11, d: 0.5, v: [62, 67, 71, 74], bj: 43 },          // G
  { c: 11.5, d: 0.5, v: [62, 64, 67, 70], bj: 43 },        // Gm6 (prestado: la nostalgia del «algún día»)
  { c: 12, d: 1.5, v: [62, 64, 66, 69, 73], bj: 38 },      // Dmaj9 (cierre)
];

// --- TEMA (motivo → respuesta). Notas: [pulso dentro de la frase, midi, duración en pulsos]
const MOTIVO = [[0, 78, 1], [1, 81, 0.5], [1.5, 83, 0.5], [2, 81, 1], [3, 78, 0.5], [3.5, 76, 0.5]];
const RESPUESTA = [[4, 74, 1.5], [5.5, 76, 0.5], [6, 71, 2]];
const SECUENCIA = [[0, 78, 1], [1, 81, 0.5], [1.5, 83, 0.5], [2, 86, 1], [3, 83, 0.5], [3.5, 81, 0.5], [4, 76, 1.5], [5.5, 78, 0.5], [6, 76, 1], [7, 73, 1]];
const toca = (inst, t0, frase, tr = 0) => { for (const [p, m, d] of frase) inst(t0 + p * BEAT, m + tr, d); };

// A · HOLA (compases 0–1): el tema en marimba, sola con un colchón suave; respira entre frases
colchon(0, b(2) + 0.3, [62, 66, 69], 0.018, 1000);
toca((t, m, d) => marimba(MEL, t, m, 0.12, Math.max(0.6, d * BEAT + 0.4), 0.1), b(0) + 0.05, [...MOTIVO, ...RESPUESTA]);
for (let k = 0; k < 8; k++) marimba(ACO, b(0) + k * BEAT, [50, 57, 55, 57, 55, 59, 62, 59][k], 0.045, 0.6, -0.3);   // pulso grave de marimba

// A' · CIENCIA (2–3): secuencia del tema (sube a Re6) y entra el bajo y el shaker
toca((t, m, d) => marimba(MEL, t, m, 0.12, Math.max(0.6, d * BEAT + 0.4), 0.1), b(2), SECUENCIA);
colchon(b(2), b(2) + 0.3 + BAR, [59, 62, 66, 69], 0.02, 1100);
colchon(b(3), BAR + 0.3, [61, 64, 69], 0.02, 1100);
for (const [n, m] of [[0, 47], [1.5, 47], [2, 54], [3, 47], [4, 45], [5.5, 45], [6, 45], [7, 44]]) bajo(b(2) + n * BEAT, m, BEAT * 1.2);
for (let k = 0; k < 16; k++) shaker(b(2) + k * BEAT / 2, k % 2 ? 0.022 : 0.034);
for (let k = 0; k < 8; k++) guitarra(ACO, b(2) + k * BEAT + BEAT / 2, [66, 69, 71, 69, 64, 69, 73, 69][k], 0.05, 0.7, -0.45, 0.3);

// B · NETA (4–6): se vacía. Staccato juguetón a contratiempo, bajo caminando; silencio de toda la banda antes del A7.
for (const [n, m] of [[0.5, 79], [1.5, 76], [2.5, 71], [3, 74], [4.5, 81], [5.5, 78], [6.5, 73], [7, 76]]) marimba(MEL, b(4) + n * BEAT, m, 0.1, 0.35, 0.15);
for (const [n, m] of [[0, 40], [1, 43], [2, 45], [3, 47], [4, 42], [5, 45], [6, 49], [7, 50]]) bajo(b(4) + n * BEAT, m, BEAT * 0.8, 0.13);
for (let k = 0; k < 8; k++) if (k % 2) aro(b(4) + k * BEAT, 0.045);
colchon(b(4), BAR + 0.2, [62, 64, 67, 71], 0.014, 900);
colchon(b(5), BAR + 0.2, [61, 64, 66, 69], 0.014, 900);
// compás 6: G6 en dos golpes… silencio de medio compás… y la anacrusa en A7 que lleva al tema
marimba(MEL, b(6), 71, 0.1, 0.4); marimba(ACO, b(6), 62, 0.06, 0.4); bajo(b(6), 43, BEAT * 0.8);
marimba(MEL, b(6) + BEAT * 0.75, 74, 0.09, 0.3);
for (const [n, m] of [[2.5, 69], [3, 73], [3.5, 76]]) { marimba(MEL, b(6) + n * BEAT, m, 0.11, 0.4); }
bajo(b(6) + BEAT * 2.5, 45, BEAT * 1.4);

// A'' · AMIGOS (7–8): el tema regresa en la guitarra (otro instrumento), marimba en terceras abajo, banda completa
toca((t, m, d) => guitarra(MEL, t, m, 0.4, Math.max(0.8, d * BEAT + 0.6), -0.1, 0.65), b(7), [...MOTIVO, ...RESPUESTA]);
toca((t, m, d) => marimba(ACO, t, m, 0.045, Math.max(0.5, d * BEAT + 0.3), 0.35), b(7), [[0, 74, 1], [1, 78, 0.5], [1.5, 79, 0.5], [2, 78, 1], [3, 74, 0.5], [3.5, 73, 0.5], [4, 71, 1.5], [5.5, 73, 0.5], [6, 67, 2]]);
colchon(b(7), BAR + 0.3, [62, 66, 69, 74], 0.02, 1300);
colchon(b(8), BAR + 0.3, [62, 67, 71], 0.02, 1300);
for (const [n, m] of [[0, 38], [1.5, 38], [2, 45], [3, 38], [4, 47], [5, 47], [6, 43], [7, 45]]) bajo(b(7) + n * BEAT, m, BEAT * 1.1);
for (let k = 0; k < 8; k++) { if (k % 4 === 0) bombo(b(7) + k * BEAT, 0.18); if (k % 2) palma(b(7) + k * BEAT, 0.07); }
bombo(b(7) + 2.5 * BEAT, 0.1); bombo(b(8) + 2.5 * BEAT, 0.1);
for (let k = 0; k < 16; k++) shaker(b(7) + k * BEAT / 2, k % 2 ? 0.024 : 0.036);

// C · CHINA (9–11): el tema en flauta una octava arriba, colchón que crece, guitarra en arpegio; Gm6 = nostalgia; cierre en Re
toca((t, m, d) => flauta(MEL, t, m, d * BEAT * 0.95, 0.075), b(9), [[0, 78, 1], [1, 81, 0.5], [1.5, 83, 0.5], [2, 86, 1.5], [3.5, 85, 0.5], [4, 83, 1], [5, 81, 1], [6, 78, 2]]);
toca((t, m, d) => flauta(MEL, t, m, d * BEAT * 0.95, 0.075), b(11), [[0, 83, 1], [1, 86, 1], [2, 88, 1.5], [3.5, 86, 0.5], [4, 82, 2.5]]);
colchon(b(9), 3 * BAR + 0.4, [55, 62, 66, 71, 74], 0.024, 1500);
colchon(b(10), BAR / 2 + 0.3, [57, 61, 64, 66, 69], 0.026, 1700);
colchon(b(10.5), BAR / 2 + 0.3, [54, 61, 64, 69], 0.026, 1700);
colchon(b(11), BAR / 2 + 0.3, [55, 62, 67, 71, 74], 0.03, 1900);
colchon(b(11.5), BAR / 2 + 0.3, [55, 62, 64, 70, 74], 0.03, 1700);
const ARP = { 9: [55, 62, 66, 71, 74, 71, 66, 62], 10: [57, 64, 69, 73, 54, 61, 66, 69], 11: [55, 62, 67, 71, 55, 62, 64, 70] };
for (const c of [9, 10, 11]) ARP[c].forEach((m, k) => guitarra(ACO, b(c) + k * BEAT / 2 + BEAT / 2 * 0, m + 12, 0.055, 0.9, k % 2 ? 0.5 : -0.5, 0.35));
for (const [n, m] of [[0, 43], [2, 43], [3, 42], [4, 45], [6, 42], [8, 43], [10, 43], [11, 43]]) bajo(b(9) + n * BEAT, m, BEAT * 1.8, 0.15);
for (let k = 0; k < 12; k++) { if (k % 4 === 0) bombo(b(9) + k * BEAT, 0.12); if (k % 2) aro(b(9) + k * BEAT, 0.035, 0.2); }
for (let k = 0; k < 24; k++) shaker(b(9) + k * BEAT / 2, k % 2 ? 0.018 : 0.028);

// CIERRE (12–13.5): Re add9 que se queda sonando, tema de 3 notas en marimba y campanita final
colchon(b(12), TOTAL - b(12), [62, 64, 66, 69, 73], 0.028, 1500);
bajo(b(12), 38, 2.6, 0.17); bombo(b(12), 0.14);
for (const [k, m] of [[0, 62], [1, 66], [2, 69], [3, 73], [4, 76]]) guitarra(ACO, b(12) + k * 0.035, m, 0.07, 2.8, -0.2 + k * 0.1, 0.5);   // rasgueo
toca((t, m, d) => marimba(MEL, t, m, 0.11, 1.2, 0.1), b(12) + BEAT, [[0, 78, 1], [1, 81, 0.5], [1.5, 83, 0.5], [2, 81, 2]]);
glock(b(12) + BEAT * 4.5, 86, 0.05); glock(b(12) + BEAT * 4.5 + 0.06, 90, 0.035);

/* ===================== EFECTOS (tiempos de hola-china.jsx) ===================== */
// 1 · HOLA: cae el papel picado (cada banderita su golpecito), letreros, mapa, México se llena
papel(0.0, 1.0, 0.05);
for (let i = 0; i < 8; i++) tic(0.9 * (i / 8) * 0.7 + 0.12, 0.05, 2600 + i * 180, -0.8 + i * 0.22);
pop(H + 0.12, 79, 0.16); pop(H + 1.3, 74, 0.15);
whoosh(H + 0.1, 0.6, 0.07, 1800);
brillo(H + 1.4, 86, 6, 0.03, 0.1); pop(H + 1.6, 81, 0.1, 0.1);
// 2 · CIENCIA: la pantalla sube, cada animación se enciende con un destello
whoosh(C - 0.2, 0.6, 0.09, 2200); pop(C + 0.1, 79, 0.15);
brillo(C + 0.5, 88, 4, 0.03, -0.4);
brillo(C + 1.25, 91, 4, 0.028, 0); boing(C + 1.3, 60, false, 0.05);                   // las setas crecen
brillo(C + 2.0, 93, 4, 0.028, 0.4);
// 3 · NETA: 「中文」 cae, tres «?» confundidos, desaparece; «¡Hola!» → flecha → 「你好！」 (sello)
pop(Ne + 0.1, 76, 0.15); sello(Ne + 0.25);
boing(Ne + 0.5, 72, true, 0.07, -0.5); boing(Ne + 0.75, 70, true, 0.07, 0.5); boing(Ne + 1.0, 67, true, 0.07, 0.6);
whoosh(n2 - 0.3, 0.5, 0.07, 2000);
pop(n2 + 0.05, 77, 0.14); pop(n2 + 0.2, 72, 0.15, -0.5); pop(n2 + 0.9, 74, 0.12);
whoosh(n2 + 0.9, 0.75, 0.07, 3000, -0.5, 0.5);
sello(n2 + 1.5); glock(n2 + 1.55, 88, 0.04, 0.5);
tic(n2 + 0.5, 0.04, 2400, -0.5); tic(n2 + 1.8, 0.04, 2400, 0.5);
// 4 · AMIGOS: cada amigo que aparece suena una nota del acorde que sube; corazones; se tejen las líneas entre amigos
pop(A + 0.1, 79, 0.15);
[62, 66, 69, 74, 78, 81, 86].forEach((m, k) => { pop(A + 0.4 + k * 0.32, m, 0.09, (k % 2 ? 1 : -1) * 0.5 * Math.min(1, k)); });
for (let k = 0; k < 6; k++) glock(A + 1.0 + k * 0.32, 93 + (k % 3) * 2, 0.02, (k % 2 ? 0.4 : -0.4));
tic(A + 1.4, 0.05, 2400, -0.5); tic(A + 2.0, 0.05, 2400, 0.5);
for (let k = 0; k < 6; k++) tic(A + 2.6 + k * 0.08, 0.035, 3400 + k * 200, 0);
// 5 · CHINA: bajan los farolitos y el papel picado, pines, destellos sobre China, el avión cruza de México (der.) a China (izq.)
for (let i = 0; i < 8; i++) tic(Z - 0.3 + i * 0.07 + 0.2, 0.045, i % 2 ? 1700 : 2900, -0.8 + i * 0.22);
pop(Z + 0.1, 79, 0.14); pop(Z + 0.2, 74, 0.11, 0.5); pop(Z + 0.6, 78, 0.11, -0.5);
brillo(Z + 0.8, 86, 7, 0.03, -0.5); brillo(Z + 1.9, 90, 5, 0.022, -0.5);
pop(z2 + 0.05, 77, 0.14);
motorAvion(z2 + 0.3, 2.5);
brillo(z2 + 2.6, 86, 8, 0.035, -0.5);
// CIERRE: el logo entra con un pop; Robert sube
pop(O + 0.2, 74, 0.14); whoosh(O + 0.3, 0.6, 0.07, 1800, 0.6, 0.6);

/* ===================== MEZCLA ===================== */
// sala: reverberación de Schroeder (4 peines + 2 pasatodo) por canal
const sala = (x, k) => { const out = new Float32Array(N); const cs = [1557, 1617, 1491, 1422].map((d) => Math.round(d * (1 + k * 0.023) * SR / 44100));
  for (const d of cs) { const buf = new Float32Array(d); let p = 0, f = 0; for (let i = 0; i < N; i++) { const y = buf[p]; f = y * 0.75 + f * 0.25; buf[p] = x[i] + f * 0.8; p = (p + 1) % d; out[i] += y * 0.25; } }
  for (const d of [225, 556].map((d) => Math.round(d * SR / 44100))) { const buf = new Float32Array(d); let p = 0; for (let i = 0; i < N; i++) { const bv = buf[p]; const y = -out[i] * 0.5 + bv; buf[p] = out[i] + bv * 0.5; out[i] = y; p = (p + 1) % d; } }
  return out; };
const rev = [sala(SALA[0], 0), sala(SALA[1], 1)];
const rms = (bus) => Math.sqrt(bus[0].reduce((a, v) => a + v * v, 0) / N);
const L = new Float32Array(N), R = new Float32Array(N);
const gMel = 1.8, gAco = 0.62, gSfx = 1.5, gRev = 0.32;
for (let i = 0; i < N; i++) { L[i] = MEL[0][i] * gMel + ACO[0][i] * gAco + SFX[0][i] * gSfx + rev[0][i] * gRev; R[i] = MEL[1][i] * gMel + ACO[1][i] * gAco + SFX[1][i] * gSfx + rev[1][i] * gRev; }
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
const G = 0.89 / pico * (process.env.GANANCIA ? +process.env.GANANCIA : 1.7);   // empuje con saturación suave (tanh) para llegar a ~-15 LUFS
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
const finO = Math.floor((TOTAL - 0.7) * SR);
for (let i = 0; i < N; i++) {
  const fade = (i > finO ? Math.max(0, 1 - (i - finO) / (0.7 * SR)) : 1) * Math.min(1, i / (0.004 * SR));
  buf.writeInt16LE(Math.round(Math.tanh(L[i] * G) * 0.97 * 32000 * fade), 44 + i * 4); buf.writeInt16LE(Math.round(Math.tanh(R[i] * G) * 0.97 * 32000 * fade), 46 + i * 4);
}
const o = path.join(HERE, OUT); fs.mkdirSync(path.dirname(o), { recursive: true }); fs.writeFileSync(o, buf);
const dB = (x) => (20 * Math.log10(x)).toFixed(1);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s · RMS melodía ${dB(rms(MEL) * gMel)} dB · acompañamiento ${dB(rms(ACO) * gAco)} dB · efectos ${dB(rms(SFX) * gSfx)} dB`);
