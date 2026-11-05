// gen-audio.mjs — música y efectos del Shot Fungi Mati #148 (tintes de hongos). Sin costo: todo se calcula aquí.
// Música (ver maestro/recetas/composicion-musical.md): cama cálida "de taller" a 100 BPM, compuesta, no al azar.
//   A (gancho → mordiente): tema propio en re menor, marimba de madera; frase 1 = motivo → respuesta (i–VI–III–VII),
//     frase 2 = el motivo en secuencia, más arriba, y cadencia a la dominante (i–VI–III–V).
//   B (por dentro de la fibra): arpegios que cambian cada 2 compases (iv–i–VI–V) + contramelodía suave de flauta; respiro en «¿y si…?».
//   C (otros colores, Rice, estudio): el tema en fa mayor, brillante, con shaker suave en los contratiempos.
//   D (veneno): se vacía: solo cuerdas graves con trémolo y un pulso lento; nada de melodía.
//   E (cierre): el tema regresa un tono más arriba (mi menor) y acaba en un acorde que se queda sonando.
// El bajo cambia de patrón cada 2 compases; nunca el mismo compás más de 4 veces. Todo va DEBAJO de la voz.
// Efectos en el mismo cuadro que en tintes.jsx (tiempos de autor; en la narrada se convierten solos a tiempo real).
// Uso: node gen-audio.mjs                                  → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tintes base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 148);
const K = m.K, W = m.warp, SR = m.SR, hz = m.hz, TOTAL = m.TOTAL;
const N = Math.ceil((TOTAL + 0.3) * SR);
const mus = new Float32Array(N);   // música propia (en tiempo REAL: el pulso no se estira con la voz)
let seed = 148; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const addR = (t, d, fn) => { const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(d * SR); for (let i = 0; i < n && i0 + i < N; i++) mus[i0 + i] += fn(i / SR, i); };
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const ven = (u, d, a = 0.01, r = 0.08) => Math.min(1, u / a, Math.max(0, (d - u) / r));

/* ---------- instrumentos (tiempo real) ---------- */
// marimba: parciales 1 y 4 (como la barra de madera), ataque blando, dos intensidades y pequeña variación de afinación (toma distinta)
const marimba = (t, mm, g = 0.05, d = 0.9) => { const f = hz(mm) * (1 + (rnd() - 0.5) * 0.002), gg = g * (0.85 + rnd() * 0.3);
  addR(t + (rnd() - 0.5) * 0.012, d, (u) => (Math.sin(2 * Math.PI * f * u) * Math.exp(-u * 3.2) + 0.35 * Math.sin(2 * Math.PI * f * 3.93 * u) * Math.exp(-u * 14) + 0.12 * Math.sin(2 * Math.PI * f * 9.2 * u) * Math.exp(-u * 40)) * Math.min(1, u / 0.003) * gg); };
// bajo de cuerda pulsada (Karplus-Strong sencillo)
const bajoKS = (t, mm, g = 0.09, d = 0.9) => { const L = Math.max(2, Math.round(SR / hz(mm))); const buf = Float32Array.from({ length: L }, () => rnd() * 2 - 1); let k = 0, prev = 0; const F = lp();
  addR(t, d, (u) => { const x = buf[k]; const y = 0.5 * (x + prev) * 0.996; prev = x; buf[k] = y; k = (k + 1) % L; return F(x, 900) * g * ven(u, d, 0.004, 0.1); }); };
// flauta suave con vibrato que entra tarde
const flauta = (t, mm, d, g = 0.03) => { const f = hz(mm); let ph = 0; const F = lp(); addR(t, d, (u, i) => { const vib = 1 + 0.004 * Math.sin(2 * Math.PI * 5 * u) * Math.min(1, Math.max(0, u - 0.25) / 0.3); ph += f * vib / SR;
  const x = Math.sin(2 * Math.PI * ph) + 0.18 * Math.sin(4 * Math.PI * ph) + 0.04 * (rnd() * 2 - 1); return F(x, 2600) * g * ven(u, d, 0.08, 0.15); }); };
// cuerdas (pad): sierras desafinadas y filtradas; trem = trémolo (veneno)
const cuerdas = (t, d, notas, g = 0.03, corte = 900, trem = 0) => { const F = lp(); const fs_ = notas.map((n) => [hz(n), hz(n) * 1.004]); const ph = fs_.map(() => [0, 0]);
  addR(t, d, (u) => { let x = 0; fs_.forEach((pp, j) => pp.forEach((f, q) => { ph[j][q] = (ph[j][q] + f / SR) % 1; x += 2 * ph[j][q] - 1; })); x /= fs_.length * 2;
    return F(x, corte) * g * ven(u, d, 0.5, 0.6) * (trem ? 0.7 + 0.3 * Math.sin(2 * Math.PI * 7 * u) : 1); }); };
const shaker = (t, g = 0.012) => { const F = lp(); addR(t, 0.07, (u) => { const x = rnd() * 2 - 1; return (x - F(x, 5000)) * Math.exp(-u * 60) * g; }); };
const pulso = (t, g = 0.08) => { let ph = 0; addR(t, 0.7, (u) => { ph += 2 * Math.PI * (48 + 20 * Math.exp(-u * 18)) / SR; return Math.sin(ph) * Math.exp(-u * 5) * g; }); };

/* ---------- forma (compases de 4 tiempos a 100 BPM) ---------- */
const BEAT = 0.6, BAR = 4 * BEAT;
const barDe = (tA) => Math.round(W(tA) / BAR);
const bB = barDe(K.Puente), bC = barDe(K.Colores), bD = barDe(K.Veneno), bE = barDe(K.Cierre), bFin = Math.ceil(TOTAL / BAR);
const tPreg = W(K.Pregunta);
// acordes (notas MIDI) por sección
const Dm = [50, 53, 57], Bb = [46, 50, 53], F = [53, 57, 60], C = [48, 52, 55], A = [45, 49, 52], Gm = [43, 46, 50];
const Em = [52, 55, 59], Cc = [48, 52, 55], G = [55, 59, 62], D = [50, 54, 57];
const prog = (b) => {
  if (b < bB) return [[Dm, Bb, F, C], [Dm, Bb, F, A]][Math.floor(b / 4) % 2][b % 4];
  if (b < bC) return [Gm, Dm, Bb, A][(b - bB) % 4];
  if (b < bD) return [[F, C, Dm, Bb], [F, C, Dm, C]][Math.floor((b - bC) / 4) % 2][(b - bC) % 4];
  if (b < bE) return [Dm, Bb, A][(b - bD) % 3];
  return [Em, Cc, G, D, Em][Math.min(4, b - bE)];
};
// tema (beat dentro de la frase de 4 compases, MIDI, duración en beats)
const FRASE1 = [[0, 69, 1], [1, 74, .5], [1.5, 77, .5], [2, 76, 1], [3, 74, 1], [4, 74, 1], [5, 72, .5], [5.5, 70, .5], [6, 70, 2],
  [8, 69, 1], [9, 72, .5], [9.5, 74, .5], [10, 72, 1], [11, 69, 1], [12, 67, 1], [13, 64, .5], [13.5, 65, .5], [14, 67, 2]];
const FRASE2 = [[0, 74, 1], [1, 77, .5], [1.5, 81, .5], [2, 79, 1], [3, 77, 1], [4, 77, 1], [5, 74, .5], [5.5, 72, .5], [6, 74, 2],
  [8, 72, 1], [9, 69, .5], [9.5, 72, .5], [10, 77, 1], [11, 76, 1], [12, 73, 1], [13, 76, .5], [13.5, 73, .5], [14, 69, 2]];
const MAYOR = [[0, 72, 1], [1, 77, .5], [1.5, 79, .5], [2, 81, 1], [3, 79, 1], [4, 79, 1], [5, 76, .5], [5.5, 72, .5], [6, 76, 2],
  [8, 74, 1], [9, 77, .5], [9.5, 81, .5], [10, 79, 1], [11, 77, 1], [12, 74, 1], [13, 72, .5], [13.5, 70, .5], [14, 74, 2]];
const MAYOR2 = MAYOR.slice(0, 12).concat([[12, 76, 1], [13, 74, .5], [13.5, 72, .5], [14, 72, 2]]);   // 2.ª vez: cadencia a do (V) → entra el veneno
const CIERRE = FRASE1.slice(0, 9).map(([b, n, d]) => [b, n + 2, d]).concat([[8, 71, 1], [9, 74, .5], [9.5, 76, .5], [10, 74, 1], [11, 71, 1], [12, 69, 1], [13, 66, .5], [13.5, 67, .5], [14, 69, 2]]);
const tocaFrase = (frase, b0, bMax, g, inst = marimba) => { for (const [bt, n, d] of frase) { const t = b0 * BAR + bt * BEAT; if (t >= bMax * BAR - 0.05) continue; if (Math.abs(t - tPreg) < 0.9) continue; inst(t, n, g, Math.max(0.5, d * BEAT * 1.4)); } };

// A · tema en re menor (dos frases de 4 compases)
tocaFrase(FRASE1, 0, bB, 0.045); tocaFrase(FRASE2, 4, bB, 0.05);
// B · arpegios que cambian cada 2 compases + flauta
for (let b = bB; b < bC; b++) { const ch = prog(b), pat = (b - bB) % 4 < 2 ? [0, 1, 2, 1, 0, 2, 1, 2] : [0, 2, 1, 2, 0, 1, 2, 1];
  pat.forEach((k, j) => { const t = b * BAR + j * BEAT / 2; if (Math.abs(t - tPreg) < 0.7) return; marimba(t, ch[k] + 24, j % 2 ? 0.02 : 0.03, 0.5); }); }
[[0, 74, 3], [3, 72, 1], [4, 70, 2], [6, 69, 2], [8, 70, 3], [11, 69, 1], [12, 73, 4]].forEach(([bt, n, d]) => { const t = bB * BAR + bt * BEAT; if (t < tPreg - 0.3) flauta(t, n, d * BEAT, 0.022); });
// C · tema en fa mayor + shaker suave en los contratiempos
tocaFrase(MAYOR, bC, bD, 0.05); tocaFrase(MAYOR2, bC + 4, bD, 0.05);
for (let b = bC; b < bD; b++) for (let j = 0; j < 4; j++) shaker(b * BAR + j * BEAT + BEAT / 2, j === 3 ? 0.016 : 0.01);
[[2, 77, 2], [6, 79, 2], [10, 81, 2], [14, 77, 2]].forEach(([bt, n, d]) => flauta((bC + 4) * BAR + bt * BEAT, n - 12, d * BEAT, 0.016));   // respuesta de flauta (2.ª vuelta)
// D · veneno: cuerdas graves con trémolo, pulso lento
for (let b = bD; b < bE; b++) { cuerdas(b * BAR, BAR + 0.4, prog(b).map((n) => n - 12), 0.05, 600, 1); pulso(b * BAR, 0.07); pulso(b * BAR + 2 * BEAT, 0.04); }
// E · el tema regresa un tono más arriba; acorde final que se queda sonando
tocaFrase(CIERRE, bE, bFin + 1, 0.05);
const tOut = W(K.Outro); [64, 71, 76, 79].forEach((n, i) => marimba(tOut + 0.3 + i * 0.06, n, 0.05, 3.0)); cuerdas(tOut, TOTAL - tOut, [40, 47, 52, 55, 59], 0.03, 700);
// cama y bajo en A, B, C y E (no en D: ahí se vacía)
for (let b = 0; b < bFin; b++) { if (b >= bD && b < bE) continue; const ch = prog(b), t = b * BAR;
  if (t >= tOut) break;
  cuerdas(t, BAR + 0.5, ch.map((n) => n - 12).concat([ch[0] + 12]), b < bB ? 0.018 : 0.022, 800);
  const pat = [[0, 1.5, 2, 3], [0, 2, 3.5], [0, 1, 2.5, 3], [0, 2, 2.5]][Math.floor(b / 2) % 4];
  pat.forEach((bt, j) => { const tt = t + bt * BEAT; if (Math.abs(tt - tPreg) < 0.7) return; bajoKS(tt, ch[0] - 12 + (j === pat.length - 1 && b % 2 ? 7 : 0), 0.08, BEAT * 1.4); }); }

/* ---------- efectos (tiempo de autor, mismo cuadro que tintes.jsx) ---------- */
const G0 = K.Gancho, H = K.Hongo, Pi = K.Pigmento, Ex = K.Extrae, Mo = K.Mordiente, Pu = K.Puente, P = K.Pregunta, Co = K.Colores, R = K.Rice, E = K.Estudio, V = K.Veneno, Ci = K.Cierre, Ou = K.Outro;
m.whoosh(G0, 0.5, 0.12); m.golpe(G0 + 0.55, 0.3, 70);                         // la madeja cae y rebota
m.cruje(G0 + 1.5, 0.3);                                                       // se tacha «tinte de fábrica»
m.sube(G0 + 2.0, 0.8, 52, 60, 0.04); m.nota(G0 + 2.6, 76, 0.04, 0.6);         // brota la seta
[0.1, 0.4, 0.7].forEach((d) => m.sube(H + d, 0.9, 50, 57, 0.025));             // brotan las 3 setas
m.whoosh(Pi + 0.6, 0.8, 0.08);                                                // entramos a las láminas
for (let i = 0; i < 3; i++) m.nota(Pi + 0.9 + i * 0.3, 81 + i * 3, 0.03, 0.5); // se arma la antraquinona
m.nota(Pi + 3.0, 84, 0.03, 0.6); m.nota(Pi + 3.8, 88, 0.03, 0.6);             // emodina, dermocibina
[0, 1, 2].forEach((k) => { m.tic(Ex + 0.32 + k * 0.32, 0.25, 1300); m.golpe(Ex + 0.33 + k * 0.32, 0.12, 140); }); // cortes del cuchillo
m.whoosh(Ex + 1.4, 0.7, 0.08);                                                // los pedacitos vuelan a la olla
for (let i = 0; i < 5; i++) m.gota(Ex + 1.9 + i * 0.05, 0.1, 600 + i * 60);    // caen al agua
for (let i = 0; i < 14; i++) m.burbuja(Ex + 2.2 + i * 0.18 + m.rnd() * 0.08, 0.05, 300 + m.rnd() * 300); // hierve; se suelta el color
m.whoosh(Mo + 0.2, 0.8, 0.07); m.gota(Mo + 1.0, 0.15, 500);                   // baja la madeja al agua
for (let i = 0; i < 9; i++) m.tic(Mo + 1.75 + i * 0.05, 0.08, 4200 + i * 150); // cristales de alumbre
for (let i = 0; i < 5; i++) m.nota(Mo + 2.1 + i * 0.08, 93 + (i % 2) * 2, 0.015, 0.4); // destellos
for (let i = 0; i < 6; i++) m.tic(Pu + 0.7 + i * 0.15, 0.12, 2000);           // cada aluminio se pega a la fibra
for (let i = 0; i < 6; i++) { m.tic(Pu + 2.8 + i * 0.12, 0.18, 2600); m.nota(Pu + 2.8 + i * 0.12, 79 + i * 2, 0.015, 0.3); } // clic: pigmento atrapado
m.whoosh(Pu + 4.0, 1.4, 0.1);                                                 // el chorro del lavado
m.sube(P + 0.05, 1.4, 52, 64, 0.04);                                          // re-gancho
m.golpe(Co + 0.1, 0.15, 90); m.golpe(Co + 0.6, 0.15, 70);                      // madeja con alumbre, con hierro
m.golpe(Co + 2.4, 0.15, 100); m.golpe(Co + 3.0, 0.15, 85);                     // Phaeolus, Tapinella
m.tic(R + 0.3, 0.2, 1500);                                                    // punto en Mendocino
for (let i = 0; i < 8; i++) m.tic(R + 1.0 + i * 0.28, 0.12, 1700 + i * 80);    // frascos de muestra, uno por uno
m.golpe(R + 3.4, 0.25, 80);                                                   // tarjeta 1974
m.golpe(E + 0.15, 0.25, 80);                                                  // tarjeta 2001
[2.7, 3.2, 4.3, 4.6].forEach((d, i) => m.gota(E + d, 0.12, 700 + i * 120));    // cada mechón de color
m.golpe(V + 2.1, 0.45, 55); m.cruje(V + 2.1, 0.2);                             // sello NO
m.zumbido(V + 3.4, 1.2, 0.03, 110);                                           // el riñón se apaga
m.whoosh(Ci + 0.3, 1.2, 0.07);                                                // la bufanda se teje
m.golpe(Ci + 1.6, 0.2, 90);                                                   // cartel «para teñir»

/* ---------- mezcla: música propia (real) + música/efectos del kit ---------- */
const kitPath = path.join(HERE, '.kit-tmp.wav');
m.guardar(path.basename(kitPath), 1);
const kit = fs.readFileSync(kitPath); fs.unlinkSync(kitPath);
const n = Math.min(N, (kit.length - 44) / 4);
for (let i = 0; i < n; i++) {
  const add = mus[i] * 0.9;
  for (const off of [44 + i * 4, 46 + i * 4]) { const v = kit.readInt16LE(off) / 32767; kit.writeInt16LE(Math.round(Math.tanh(Math.atanh(Math.max(-0.999, Math.min(0.999, v))) + add * 1.2) * 32767), off); }
}
const o = path.join(HERE, OUT); fs.mkdirSync(path.dirname(o), { recursive: true }); fs.writeFileSync(o, kit);
console.log(`${OUT} · ${TOTAL.toFixed(2)} s (música propia + efectos)`);
