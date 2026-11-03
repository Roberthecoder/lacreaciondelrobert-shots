// musica.mjs — cama musical del pitch, generada (nada grabado ni de catálogo): pad cálido de cuerdas sintéticas,
// bajo suave y un brillo agudo que respira. Sigue la historia: tensa en el problema (cap. 1), abre al presentar
// Fungi Mati y se resuelve al final. Escribe un WAV estéreo de 48 kHz.
// Uso: node musica.mjs <salida.wav> <duración_s> <inicio_solución_s>
import fs from 'node:fs';

const [out = 'musica.wav', durS = '165', solS = '30'] = process.argv.slice(2);
const SR = 48000, D = +durS, SOL = +solS, N = Math.ceil(SR * D);
const L = new Float32Array(N), Rr = new Float32Array(N), BAJO = new Float32Array(N);
const nota = (m) => 440 * Math.pow(2, (m - 69) / 12);
// acordes (MIDI): problema en re menor; solución en Fa–Do–Re m–Si♭ y cierre en Fa
const tenso = [[50, 57, 62, 65], [46, 53, 58, 62], [50, 57, 62, 64], [45, 52, 57, 61]];
const abierto = [[53, 60, 65, 69], [48, 55, 60, 64], [50, 57, 62, 65], [46, 53, 58, 62]];
const COMPAS = 6.4, CRUCE = 1.6;   // cada acorde dura 6.4 s y se funde con el siguiente durante 2.2 s (sin cortes)
// línea de tiempo de acordes: problema → solución → acorde final
const SEG = [];
for (let t = 0; t < SOL; t += COMPAS) SEG.push({ t: Math.min(t, SOL), n: tenso[SEG.length % tenso.length] });
let k0 = 0;
for (let t = SOL; t < D - 9; t += COMPAS) SEG.push({ t, n: abierto[k0++ % abierto.length] });
SEG.push({ t: D - 9, n: [53, 60, 65, 69, 72] });
const fase = new Map();
const suave = (x) => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
const lfo = (t, f, a = 1) => a * Math.sin(2 * Math.PI * f * t);
let seg = 0, faseBajo = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  while (seg + 1 < SEG.length && t >= SEG[seg + 1].t) seg++;
  const sig = SEG[seg + 1];
  // peso del acorde siguiente: sube suave en los últimos CRUCE s antes de que empiece
  const w = sig ? suave((t - (sig.t - CRUCE)) / CRUCE) : 0;
  const pesos = new Map();
  SEG[seg].n.forEach((m) => pesos.set(m, (pesos.get(m) || 0) + (1 - w)));
  if (sig) sig.n.forEach((m) => pesos.set(m, (pesos.get(m) || 0) + w));
  const gen = Math.min(1, t / 2.5) * Math.min(1, (D - t) / 4);
  let l = 0, r = 0, k = 0;
  for (const [m, pw] of pesos) {
    if (pw < 0.001) { k++; continue; }
    for (const det of [-0.07, 0, 0.06]) {
      const f = nota(m) * Math.pow(2, det / 12), key = m * 10 + det * 100;
      const ph = ((fase.get(key) || 0) + (2 * Math.PI * f) / SR) % (2 * Math.PI); fase.set(key, ph);
      const sv = (Math.sin(ph) + 0.28 * Math.sin(2 * ph + 0.3) + 0.12 * Math.sin(3 * ph + 1.1)) * Math.min(1, pw);
      const pan = 0.5 + 0.35 * Math.sin(m * 1.7 + det * 20);
      l += sv * (1 - pan); r += sv * pan;
    }
    k++;
  }
  const pad = 0.022;
  l *= pad; r *= pad;
  // bajo: raíz del acorde actual fundida con la del siguiente
  const raizA = nota(SEG[seg].n[0] - 12), raizB = sig ? nota(sig.n[0] - 12) : raizA;
  const pulso = t < SOL ? 0.6 : 0.7 + 0.3 * Math.pow(Math.max(0, Math.sin(Math.PI * t / (COMPAS / 4))), 2);
  // el bajo desliza de una nota a la siguiente (un solo oscilador, sin cortes ni 'golpes')
  const wb = sig ? suave((t - (sig.t - 0.5)) / 0.5) : 0;
  const fb = raizA * Math.pow(raizB / raizA, wb);
  faseBajo = (faseBajo + 2 * Math.PI * fb / SR) % (2 * Math.PI);
  const bajo = 0.05 * pulso * Math.sin(faseBajo);
  const br = t < SOL ? 0.15 : 0.5 + 0.5 * Math.min(1, (t - SOL) / 10);
  const n2 = SEG[seg].n, n3 = sig ? sig.n : n2;
  const brillo = 0.006 * br * ((1 - w) * (Math.sin(2 * Math.PI * nota(n2[2] + 24) * t) * (0.5 + lfo(t, 0.13, 0.5)) + Math.sin(2 * Math.PI * nota(n2[3] + 24) * t) * (0.5 + lfo(t, 0.09, 0.5)))
    + w * (Math.sin(2 * Math.PI * nota(n3[2] + 24) * t) * (0.5 + lfo(t, 0.13, 0.5)) + Math.sin(2 * Math.PI * nota(n3[3] + 24) * t) * (0.5 + lfo(t, 0.09, 0.5))));
  L[i] = gen * (l + brillo * 0.8);
  Rr[i] = gen * (r + brillo * 1.2);
  BAJO[i] = gen * bajo;   // el bajo va sin eco: el eco sobre notas graves hace subibajas de volumen
}
// reverberación sencilla (ecos cruzados) para dar espacio
for (const [dl, g] of [[0.031, 0.35], [0.047, 0.28], [0.071, 0.22], [0.113, 0.16], [0.173, 0.1]]) {
  const d = Math.round(dl * SR);
  for (let i = N - 1; i >= d; i--) { L[i] += Rr[i - d] * g; Rr[i] += L[i - d] * g * 0.9; }
}
for (let i = 0; i < N; i++) { L[i] += BAJO[i]; Rr[i] += BAJO[i]; }
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(Rr[i]));
const norm = 0.7 / (pico || 1);
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Rr[i] * norm)) * 32767), 46 + i * 4); }
fs.writeFileSync(out, buf);
console.log(`Música: ${D.toFixed(1)} s → ${out}`);
