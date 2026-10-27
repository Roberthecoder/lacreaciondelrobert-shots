// gen-audio.mjs — música y efectos del Shot bio-06 (lactosa y virus). Sin costo: todo se sintetiza aquí.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (el gemelo mudo)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
//  · "Shot Lactosa Ciclo.dc.html"   → música hecha de los datos y que cuenta el estado:
//      tapada y tensa mientras no hay enzima · abierta y libre cuando la lactosa se parte · se vuelve
//      a tapar al final para cerrar el loop. Una nota por molécula, un blub por burbuja, 5 golpes = 5 días,
//      un tic por cada célula nueva de la cripta.
//  · versión narrada (la llama narrar.mjs) → cama grave continua SIN golpe, debajo de la voz, con los
//      efectos en el mismo cuadro y los datos hechos sonido (18 enzimas = 18 notas, 5 días = 5 golpes).
// Los tiempos se leen de OM_SCENES; en la narrada las escenas se estiran (dur ≠ nat) y se convierten.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lactosa Ciclo.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 23; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
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
const golpe = (t, g = 0.4, f0 = 85) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); };
const whoosh = (t, d = 0.6, g = 0.22) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
// "blub" de burbuja: seno que sube rápido y se apaga
const blub = (t, g = 0.18, f0 = 300) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 500 * u / 0.14) / SR; return Math.sin(ph) * Math.exp(-u * 26) * g; }, 0.3); };
// tijera que corta: dos clics muy juntos
const corte = (t, g = 0.3) => { tic(t, g, 3200); tic(t + 0.045, g * 0.8, 2300); };
// cama de fondo. tapa: 0..1 (1 = muy tapada y tensa, 0 = abierta y libre)
const pad = (t0, t1, g = 0.05, notas = [45, 52, 57], tapa = 0) => {
  const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) {
    const t = i / SR, u = (i - n0) / (n1 - n0);
    const tp = typeof tapa === 'function' ? tapa(u) : tapa;
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
    mus[i] += f(x, 240 + 900 * (1 - tp)) * g * (1 + 0.55 * tp) * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8);
  }
};
// momento en que un contador con kEase.suave cruza la fracción q
const suav = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const cruce = (q) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (suav(m) < q) lo = m; else hi = m; } return lo; };

if (K.Entra != null) {
  /* ---------- GEMELO MUDO: la música son los datos y cuenta el estado ---------- */
  const { Entra: En, Pasa: Pa, Gas: Ga, Llega: Ll, Hace: Ha, Corta: Co, Muda: Mu, Cripta: Cr, Outro: Ou } = K;
  // estado: tapada mientras no hay enzima (En→Co), libre cuando corta (Co→Mu), se vuelve a tapar al final
  pad(0, Co, 0.055, [45, 52, 57], (u) => 0.45 + 0.55 * u);          // se va cerrando: el problema aprieta
  pad(Co, Mu + 1.5, 0.06, [45, 52, 57, 64], 0);                      // libre
  pad(Mu + 1.5, Ou + 3.5, 0.055, [45, 52, 57], (u) => 0.9 * u);      // se vuelve a tapar: cierra el loop
  // 1 ENTRA: una nota por cada molécula de lactosa que entra (10)
  for (let i = 0; i < 10; i++) { nota(En + 0.4 + i * 0.62, ESC[i % ESC.length], 0.075, 0.7); tic(En + 0.4 + i * 0.62, 0.1, 2800); }
  // 2 PASA: la molécula roza el borde y nadie la corta (clics que no cierran)
  for (let i = 0; i < 8; i++) { tic(Pa + 0.5 + i * 0.78, 0.13, 1500); }
  // 3 GAS: un blub por burbuja
  for (let i = 0; i < 22; i++) blub(Ga + 0.3 + i * 0.3, 0.14 + rnd() * 0.07, 240 + rnd() * 220);
  golpe(Ga + 0.1, 0.3, 62);
  // 4 LLEGA: cuatro virus bajan (soplo) y sueltan el gen (nota que sube)
  for (let i = 0; i < 4; i++) { whoosh(Ll + 0.3 + i * 0.6, 1.2, 0.16); sube(Ll + 2.4 + i * 0.6, 0.5, 64, 79, 0.06); }
  // 5 HACE: 18 enzimas aparecen en el borde = 18 notas que suben
  for (let k = 0; k < 18; k++) nota(Ha + 0.3 + k * 0.36, ESC[Math.floor(k / 18 * ESC.length)], 0.055 + 0.03 * (k / 18), 0.5);
  // 6 CORTA: cada molécula que se parte, un corte + dos notas (glucosa y galactosa)
  for (let i = 0; i < 8; i++) { const t = Co + 0.5 + i * 0.8; corte(t, 0.26); nota(t + 0.06, ESC[4 + (i % 5)], 0.08, 0.8); nota(t + 0.06, ESC[7 + (i % 5)], 0.06, 0.8); }
  // 7 MUDA: 9 células se desprenden + 5 golpes = los 5 días
  for (let i = 0; i < 9; i++) whoosh(Mu + 0.5 + i * 0.42, 0.5, 0.1);
  for (let d = 0; d < 5; d++) golpe(Mu + 1.0 + d * 1.1, 0.3, 70);
  // 8 CRIPTA: un tic por cada célula nueva que sube, y vuelve a entrar lactosa (el loop)
  for (let i = 0; i < 12; i++) tic(Cr + 0.4 + i * 0.5, 0.1, 3400);
  for (let i = 0; i < 4; i++) { nota(Cr + 4.4 + i * 0.6, ESC[i], 0.075, 0.7); tic(Cr + 4.4 + i * 0.6, 0.1, 2800); }
  nota(Ou + 0.3, 45, 0.08, 2.8); nota(Ou + 0.3, 52, 0.06, 2.8); nota(Ou + 0.3, 57, 0.05, 2.8);
} else {
  /* ---------- VERSIÓN NARRADA: la voz manda ---------- */
  const { Gancho: G, Bebe: B, Adulto: A, Gas: Ga, Pregunta: P, Estudio: E, Ratas: R, Auto: Au,
    Ojo: O, Renueva: Re, Cripta: Cr, Pastilla: Pa, Cierre: C, Outro: Ou } = K;
  pad(0, Ou + 3.5, 0.045, [45, 52, 57], 0.25);                 // cama grave continua, sin golpe
  pad(Ga, P, 0.028, [40, 47], 0.8);                            // por dentro: más grave y tapada
  pad(O, Re, 0.03, [41, 48], 0.9);                             // el matiz: tensa
  // gancho: el virus gira y se acerca
  whoosh(G + 0.15, 1.3, 0.17); for (let k = 0; k < 3; k++) nota(G + 0.9 + k * 0.3, ESC[6 + k], 0.06, 0.6);
  // bebé: la Lupa se abre y el borde está lleno de enzimas (9 notas, una por enzima visible)
  sube(B + 0.3, 0.6, 64, 79, 0.06); whoosh(B + 0.3, 0.6, 0.14);
  for (let i = 0; i < 9; i++) nota(B + 1.0 + i * 0.3, ESC[4 + i], 0.055, 0.5);
  // adulto: la segunda Lupa y el medidor que cae
  whoosh(A + 0.25, 0.6, 0.13); sube(A + 0.6, 2.0, 72, 50, 0.07);
  // gas: un blub por burbuja
  for (let i = 0; i < 12; i++) blub(Ga + 0.7 + i * 0.32, 0.12 + rnd() * 0.05, 230 + rnd() * 200);
  // pregunta: la tijera que no alcanza
  for (let i = 0; i < 3; i++) tic(P + 0.4 + i * 0.6, 0.12, 1400);
  // estudio: tarjeta y tres virus que bajan y sueltan el gen
  golpe(E + 0.2, 0.34, 80);
  for (let i = 0; i < 3; i++) { whoosh(E + 2.5 + i * 0.5, 1.1, 0.14); sube(E + 4.4 + i * 0.5, 0.45, 64, 79, 0.055); }
  // ratas: el medidor sube y la lactosa se parte (4 cortes)
  sube(R + 0.6, 1.8, 52, 69, 0.07);
  for (let i = 0; i < 4; i++) { corte(R + 1.1 + i * 0.35, 0.2); nota(R + 1.16 + i * 0.35, ESC[5 + i], 0.06, 0.6); }
  // auto: el video arranca
  tic(Au + 0.4, 0.2, 1800); nota(Au + 0.5, 60, 0.06, 1.2);
  // ojo: el mito se tacha
  golpe(O + 1.6, 0.36, 58); for (let i = 0; i < 3; i++) tic(O + 2.1 + i * 0.9, 0.16, 1300);
  // renueva: 5 golpes = los 5 días; las células se desprenden
  for (let d = 0; d < 5; d++) golpe(Re + 0.4 + 3.2 * cruce((d + 0.5) / 5), 0.3, 72);
  for (let i = 0; i < 6; i++) whoosh(Re + 0.8 + i * 0.6, 0.45, 0.09);
  // cripta: un tic por cada célula nueva que sube
  for (let i = 0; i < 9; i++) tic(Cr + 0.4 + i * 0.5, 0.1, 3400);
  sube(Cr + 1.2, 1.2, 57, 69, 0.05);
  // pastilla: se abre y suelta enzimas que cortan
  tic(Pa + 0.5, 0.3, 1600); whoosh(Pa + 0.6, 0.7, 0.15);
  for (let i = 0; i < 4; i++) { const t = Pa + 2.4 + i * 0.2; corte(t, 0.22); nota(t, ESC[6 + i], 0.07, 0.8); }
  // cierre: regreso al vaso y acorde final
  whoosh(C, 0.8, 0.16); for (let k = 0; k < 4; k++) nota(C + 0.4 + k * 0.25, ESC[5 + k], 0.05, 0.7);
  nota(Ou + 0.3, 45, 0.08, 2.8); nota(Ou + 0.3, 52, 0.06, 2.8); nota(Ou + 0.3, 57, 0.05, 2.8);
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
