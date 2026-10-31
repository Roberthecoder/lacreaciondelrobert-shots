// gen-audio.mjs — música y efectos de Químico #01 (el agar). Sin costo: todo se sintetiza.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (base narrada: cama grave + efectos, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// Mudo (M2 "¿Por qué NO…?"): la TEMPERATURA del video es la melodía: un tono que sube y baja con el termómetro
//   (20 → 37 °C en la incubadora; 37 → 95 → 25 °C en la curva del agar). Cada cambio de estado (se derrite / cuaja) = acorde.
//   Mientras la gelatina se derrite y se la comen, la música va TAPADA; cuando el agar aguanta, se abre.
//   Cada bacteria que mastica la gelatina = un "ñam" (toques rápidos).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearAudio } from '../../motor/kit/audio-kit-lote-d.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Agar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const A = crearAudio(HERE, HTML), K = A.K, ESC = A.ESC;
const tono = (c) => 45 + c * 0.32;                  // °C → nota (20 °C ≈ La2+6; 95 °C ≈ dos octavas más arriba)

if (K.Calienta != null) {
  /* ---------- MUDO ---------- */
  const { Pregunta: P, Calienta: Ca, Comen: Co, Agar: Ag, Derrite: D, Cuaja: Cu, Respuesta: R, Outro: F } = K;
  A.pad(0, F + 3.5, 0.045, [45, 52, 57]);
  // incubadora: 20 → 37 °C entre Ca+0.5 y Ca+6
  A.sube(Ca + 0.5, 5.5, tono(20), tono(37), 0.05);
  A.tapar(Ca + 4, Ag, 400);
  for (let i = 0; i < 4; i++) for (let k = 0; k < 10; k++) A.tic(Co + 1.5 + i * 0.4 + k * 0.5, 0.05, 1500 + i * 200);
  [57, 64, 69, 76].forEach((m, i) => A.campana(Ag + 0.4 + i * 0.15, m, 0.06, 1.6));
  // curva del agar: 37 → 95 °C (D+0.5 → Cu−1) y 95 → 25 °C (Cu+0.3 → R−1); suena el mismo recorrido
  const tA = (t) => (t < Cu ? 37 + 58 * Math.min(1, Math.max(0, (t - D - 0.5) / (Cu - 1 - D - 0.5))) : 95 - 70 * Math.min(1, Math.max(0, (t - Cu - 0.3) / (R - 1 - Cu - 0.3))));
  for (let t = D + 0.5; t < R - 1; t += 0.25) A.nota(t, Math.round(tono(tA(t))), 0.04, 0.3);
  // cruces: se derrite al pasar 85 °C (subiendo) y cuaja al pasar 35 °C (bajando)
  const cruza = (c, sube) => { for (let t = D; t < R; t += 0.01) { const a = tA(t), b = tA(t + 0.01); if (sube ? a < c && b >= c : a > c && b <= c) return t; } return null; };
  const tDer = cruza(85, true), tCua = cruza(35, false);
  if (tDer) { A.whoosh(tDer, 0.6, 0.15); [64, 68, 71].forEach((m) => A.nota(tDer, m, 0.07, 1.4)); }
  if (tCua) { A.golpe(tCua, 0.25, 70); [57, 60, 64].forEach((m) => A.nota(tCua, m, 0.07, 1.4)); }
  [57, 64, 69].forEach((m) => A.nota(R + 0.3, m, 0.07, 2.2));
  [57, 64, 69].forEach((m) => A.nota(F + 0.3, m, 0.07, 2.8));
} else {
  /* ---------- NARRADA ---------- */
  const { Gancho: G, Alga: Al, Quimica: Q, Red: Rd, Temp: Tp, Pregunta: P, Incuba: I, Estudio: E, Come: C, Extra: X, Cierre: Ci, Outro: O } = K;
  A.pad(0, O + 3.5, 0.05, [45, 52, 57]);
  A.pad(Q, Tp, 0.03, [40, 47]);
  A.pop(G + 0.05, 0.25); A.raspa(G + 1.4, 0.3, 0.12); for (let i = 0; i < 16; i++) A.tic(G + 2.2 + i * 0.14, 0.04, 2600);
  A.whoosh(Al, 0.7, 0.14); [1.2, 2.2, 3.2].forEach((d, i) => { A.pop(Al + d, 0.18); A.nota(Al + d, ESC[3 + i], 0.05, 0.5); });
  for (let k = 0; k < 8; k++) { A.tic(Q + 0.3 + k * 0.26, 0.08, 1800 + k * 100); A.tic(Q + 2.2 + k * 0.25, 0.08, 1400 + k * 100); }
  A.sube(Rd + 0.6, 3.4, 62, 50, 0.05); A.golpe(Rd + 4, 0.2, 70);
  A.sube(Tp + 0.2, 2.6, tono(20), tono(100), 0.04); A.whoosh(Tp + 2.4, 0.5, 0.14); A.sube(Tp + 2.9, 2.7, tono(100), tono(20), 0.04); A.golpe(Tp + 5.2, 0.2, 70);
  A.whoosh(P, 0.5, 0.12);
  A.sube(I + 1, 3, 57, 50, 0.04);
  A.golpe(E + 0.2, 0.35, 80); A.pop(E + 3.3, 0.2); A.whoosh(E + 3.8, 0.5, 0.12); A.pop(E + 4.3, 0.2);
  for (let k = 0; k < 8; k++) A.tic(C + 2.6 + k * 0.3, 0.05, 1600);
  A.golpe(X + 0.1, 0.25, 80); A.whoosh(X + 1.8, 2.2, 0.12); A.pop(X + 4, 0.2);
  A.whoosh(Ci, 0.6, 0.14); for (let i = 0; i < 12; i++) A.tic(Ci + 0.5 + i * 0.2, 0.04, 3000);
  [57, 64, 69].forEach((m) => A.nota(O + 0.3, m, 0.07, 2.8));
}
A.guardar(OUT, K.Calienta != null ? 1.8 : 1);
