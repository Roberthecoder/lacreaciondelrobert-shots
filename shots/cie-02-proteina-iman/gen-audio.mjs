// gen-audio.mjs — música y efectos del Shot cie-02 (la proteína que responde a un imán). Sintetizado.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (el gemelo mudo)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Proteina Iman Ciclo.dc.html" → la música son los datos y cuenta el estado: una nota por
//      fotón azul, un zumbido grave mientras el imán está puesto y la música TAPADA justo cuando baja
//      la fluorescencia; se destapa al quitar el imán. Cierra el loop volviendo al reposo.
//  · versión narrada (la llama narrar.mjs) → cama grave continua SIN golpe, debajo de la voz, con el
//      tono de radio de 604 MHz (representado agudo y fijo) en la escena del ODMR.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Proteina Iman Ciclo.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 604; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [50, 53, 57, 60, 62, 65, 69, 72, 74, 77, 81, 84, 86, 89, 93]; // re menor, abierta

const tic = (t, g = 0.22, f = 2800) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 95) * g, 0.06);
const nota = (t, m, g = 0.09, d = 0.5) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.22 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.005, d * 0.4) * g; }, d);
const campana = (t, m, g = 0.07, d = 1.6) => add(mus, t, (u) => [1, 2.01, 3.03].reduce((a, k, i) => a + Math.sin(2 * Math.PI * hz(m) * k * u) / (i + 1.6), 0) * Math.exp(-u / (d * 0.35)) * g, d);
const sube = (t, d, m0, m1, g = 0.07) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); };
const golpe = (t, g = 0.34, f0 = 72) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); };
const whoosh = (t, d = 0.6, g = 0.18) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
// chispa: el electrón que salta
const chispa = (t, g = 0.3) => { for (let k = 0; k < 5; k++) tic(t + k * 0.022, g * (1 - k * 0.15), 3600 - k * 420); };
// zumbido grave del imán mientras el campo está puesto
const zumbido = (t0, t1, g = 0.07) => { const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0);
    sfx[i] += (Math.sin(2 * Math.PI * 58 * t) + 0.4 * Math.sin(2 * Math.PI * 116 * t)) * g * Math.min(1, u * 6, (1 - u) * 6); } };
// tono de radio (representa los 604 MHz: no es audible de verdad, es una convención)
const radio = (t0, t1, g = 0.05) => { const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0);
    mus[i] += Math.sin(2 * Math.PI * 1208 * t) * g * (0.6 + 0.4 * Math.sin(t * 9)) * Math.min(1, u * 8, (1 - u) * 8); } };
const pad = (t0, t1, g = 0.05, notas = [38, 45, 50], tapa = 0) => {
  const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) {
    const t = i / SR, u = (i - n0) / (n1 - n0), tp = typeof tapa === 'function' ? tapa(u) : tapa;
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 240 + 1000 * (1 - tp)) * g * (1 + 0.55 * tp) * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8);
  }
};

if (K.Oscuro != null) {
  /* ---------- GEMELO MUDO: el ciclo del par radical ---------- */
  const { Oscuro: O, Luz: L, Emite: E, Iman: I, Triplete: Tr, Baja: B, Quita: Q, Vuelve: V, Outro: Ou } = K;
  pad(0, I, 0.055, [38, 45, 50], 0.2);                       // libre
  pad(I, Q, 0.06, [38, 44, 49], (u) => Math.min(1, u * 2));  // se tapa mientras el imán está puesto
  pad(Q, Ou + 3.5, 0.055, [38, 45, 50, 57], (u) => Math.max(0, 0.9 - u * 2));
  zumbido(I + 0.4, Q + 1.4, 0.07);
  // una nota por cada fotón azul que llega (siguen llegando todo el ciclo)
  for (let t = L + 0.5; t < Ou - 0.5; t += 0.74) { const k = Math.round((t - L) / 0.74);
    nota(t, ESC[k % ESC.length] + 12, 0.035, 0.26); }
  chispa(L + 1.2, 0.3); sube(L + 1.2, 0.8, 60, 84, 0.06);
  // emite
  campana(E + 0.3, 69, 0.08, 2.2); golpe(E + 0.3, 0.2, 90);
  // entra el imán
  whoosh(I + 0.4, 1.6, 0.2); golpe(I + 1.8, 0.3, 54);
  // los giros se desemparejan
  for (let i = 0; i < 6; i++) tic(Tr + 0.5 + i * 0.5, 0.14, 1600 - i * 120);
  sube(Tr + 0.6, 2.2, 84, 50, 0.06);
  // la luz cae
  golpe(B + 0.4, 0.3, 48);
  // se quita el imán: la música se destapa y vuelve a emitir
  whoosh(Q + 0.4, 1.4, 0.16); campana(V + 0.3, 69, 0.08, 2.4); campana(V + 0.5, 76, 0.06, 2.0);
  nota(Ou + 0.3, 38, 0.08, 2.8); nota(Ou + 0.3, 45, 0.06, 2.8); nota(Ou + 0.3, 50, 0.05, 2.8);
} else {
  /* ---------- VERSIÓN NARRADA ---------- */
  const { Gancho: G, Brillan: Br, Iman: I, Nombre: Nn, Avena: A, Pregunta: Q, Par: P, Giro: Gi,
    Campo: Ca, Mitad: M, Radio: R, Aves: Av, Cierre: C, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.045, [38, 45, 50], 0.2);
  pad(I, Nn, 0.03, [38, 44], 0.85);                 // tapada cuando el imán está puesto
  pad(Ca, R, 0.03, [38, 44], 0.7);
  // gancho: el imán entra
  whoosh(G + 0.2, 1.4, 0.2); zumbido(G + 0.8, Br - 0.2, 0.06); golpe(G + 1.4, 0.26, 54);
  // brillan: se enciende la luz azul
  sube(Br + 0.3, 1.0, 60, 84, 0.06); campana(Br + 0.4, 72, 0.08, 2.0);
  // imán: el brillo cae
  whoosh(I + 0.4, 1.4, 0.18); zumbido(I + 0.8, Nn - 0.2, 0.07); sube(I + 0.8, 1.6, 84, 60, 0.06);
  // nombre: la tarjeta
  golpe(Nn + 0.2, 0.3, 84);
  // avena: campo abierto
  for (let i = 0; i < 4; i++) nota(A + 0.5 + i * 0.4, ESC[4 + i], 0.06, 0.8);
  // pregunta
  sube(Q + 0.1, 1.2, 50, 65, 0.05);
  // par radical: el fotón llega y el electrón salta
  nota(P + 0.3, 84, 0.07, 0.5); chispa(P + 1.1, 0.32); sube(P + 1.1, 0.7, 65, 89, 0.06);
  for (let i = 0; i < 2; i++) campana(P + 1.9 + i * 0.3, 69 + i * 7, 0.06, 1.6);
  // giro: dos caminos
  nota(Gi + 0.6, 72, 0.08, 1.2); nota(Gi + 1.9, 56, 0.07, 1.2);
  // campo: la balanza se inclina
  whoosh(Ca + 0.3, 1.4, 0.17); zumbido(Ca + 0.8, M - 0.2, 0.06); sube(Ca + 1.2, 2.0, 72, 54, 0.06);
  // mitad: el número
  golpe(M + 0.4, 0.32, 50); sube(M + 0.4, 1.6, 72, 55, 0.06);
  // radio: el tono de 604 MHz
  radio(R + 0.3, Av - 0.3, 0.05); for (let i = 0; i < 5; i++) tic(R + 1.0 + i * 0.8, 0.14, 3200);
  // aves
  for (let i = 0; i < 5; i++) nota(Av + 0.4 + i * 0.5, ESC[6 + i], 0.06, 0.9);
  // cierre
  campana(C + 0.4, 69, 0.08, 2.4); zumbido(C + 0.6, Ou - 0.2, 0.05);
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
