// musica.mjs — cama musical del pitch, generada (nada grabado ni de catálogo): pad cálido de cuerdas sintéticas,
// bajo suave y un brillo agudo que respira. Sigue la historia: tensa en el problema (cap. 1), abre al presentar
// Fungi Mati y se resuelve al final. Escribe un WAV estéreo de 48 kHz.
// Uso: node musica.mjs <salida.wav> <duración_s> <inicio_solución_s>
import fs from 'node:fs';

const [out = 'musica.wav', durS = '165', solS = '30'] = process.argv.slice(2);
const SR = 48000, D = +durS, SOL = +solS, N = Math.ceil(SR * D);
const L = new Float32Array(N), Rr = new Float32Array(N);
const nota = (m) => 440 * Math.pow(2, (m - 69) / 12);
// acordes (MIDI): problema en re menor; solución en Fa–Do–Re m–Si♭ y cierre en Fa
const tenso = [[50, 57, 62, 65], [46, 53, 58, 62], [50, 57, 62, 64], [45, 52, 57, 61]];
const abierto = [[53, 60, 65, 69], [48, 55, 60, 64], [50, 57, 62, 65], [46, 53, 58, 62]];
const COMPAS = 6.4;
function acordeEn(t) {
  if (t > D - 9) return [53, 60, 65, 69, 72];
  const lista = t < SOL ? tenso : abierto, base = t < SOL ? 0 : SOL;
  return lista[Math.floor((t - base) / COMPAS) % lista.length];
}
let fase = new Map();
const lfo = (t, f, a = 1) => a * Math.sin(2 * Math.PI * f * t);
for (let i = 0; i < N; i++) {
  const t = i / SR;
  // volumen general: entra suave, baja al final
  const gen = Math.min(1, t / 2.5) * Math.min(1, (D - t) / 4);
  const ac = acordeEn(t);
  // cruce entre acordes
  const enC = ((t < SOL ? t : t - SOL) % COMPAS) / COMPAS;
  const env = Math.min(1, enC * 6) * Math.min(1, (1 - enC) * 6) * 0.35 + 0.65;
  let l = 0, r = 0;
  ac.forEach((m, k) => {
    for (const det of [-0.07, 0, 0.06]) {
      const f = nota(m) * Math.pow(2, det / 12), key = m * 10 + det * 100;
      const ph = (fase.get(key) || 0) + (2 * Math.PI * f) / SR; fase.set(key, ph % (2 * Math.PI));
      // seno + armónicos suaves (pad cálido)
      const s = Math.sin(ph) + 0.28 * Math.sin(2 * ph + 0.3) + 0.12 * Math.sin(3 * ph + 1.1);
      const pan = 0.5 + 0.35 * Math.sin(k * 1.7 + det * 20);
      l += s * (1 - pan); r += s * pan;
    }
  });
  const pad = 0.022 * env;
  l *= pad; r *= pad;
  // bajo: raíz una octava abajo, con pulso lento (latido) en la parte de la solución
  const raiz = nota(ac[0] - 12), bph = 2 * Math.PI * raiz * t;
  const pulso = t < SOL ? 0.6 : 0.7 + 0.3 * Math.pow(Math.max(0, Math.sin(Math.PI * t / (COMPAS / 4))), 6);
  const bajo = 0.06 * Math.sin(bph) * pulso;
  // brillo agudo que respira (más presente cuando la historia abre)
  const br = t < SOL ? 0.15 : 0.5 + 0.5 * Math.min(1, (t - SOL) / 10);
  const brillo = 0.006 * br * (Math.sin(2 * Math.PI * nota(ac[2] + 24) * t) * (0.5 + lfo(t, 0.13, 0.5)) + Math.sin(2 * Math.PI * nota(ac[3] + 24) * t) * (0.5 + lfo(t, 0.09, 0.5)));
  L[i] = gen * (l + bajo + brillo * 0.8);
  Rr[i] = gen * (r + bajo + brillo * 1.2);
}
// reverberación sencilla (ecos cruzados) para dar espacio
for (const [dl, g] of [[0.031, 0.35], [0.047, 0.28], [0.071, 0.22], [0.113, 0.16], [0.173, 0.1]]) {
  const d = Math.round(dl * SR);
  for (let i = N - 1; i >= d; i--) { L[i] += Rr[i - d] * g; Rr[i] += L[i - d] * g * 0.9; }
}
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(Rr[i]));
const norm = 0.7 / (pico || 1);
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Rr[i] * norm)) * 32767), 46 + i * 4); }
fs.writeFileSync(out, buf);
console.log(`Música: ${D.toFixed(1)} s → ${out}`);
