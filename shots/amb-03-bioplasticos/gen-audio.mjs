// gen-audio.mjs — música + efectos del Ambiental #03 (bioplásticos). Sin costo (motor/kit/audio-kit.mjs).
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (base narrada, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada · workflow: el mudo)
// Mudo (M2): la temperatura es la nota (nota = 36 + °C/2: 25 °C → grave, 58 °C → aguda); cada día es un toque;
// cada pedazo del vaso que se rompe en la composta es una nota libre; en el jardín y en el mar la música queda tapada.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from '../../motor/kit/audio-kit-lote-c.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bioplasticos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K, E = m.ESC;
const notaT = (c) => Math.round(36 + c / 2);

if (K.Entierra != null) {
  /* ---------- gemelo mudo ---------- */
  const P = K.Pregunta, En = K.Entierra, D = K.Dias, X = K.RayosX, M = K.Mar, R = K.Respuesta, L = K.Loop, FIN = L + 7;
  m.whoosh(P + 0.2, 1.2, 0.15); m.golpe(P + 1.4, 0.3, 70); m.golpe(P + 1.45, 0.25, 90);       // los dos vasos caen
  m.pad(P, X, 0.05, [45, 52], 0.85);                                                             // problema: tapada
  m.nota(En + 0.4, notaT(25), 0.12, 1.2, 0.6); m.nota(En + 0.6, notaT(58), 0.12, 1.2);              // 25 °C y 58 °C
  for (let d = 0; d <= 45; d++) m.tic(D + 0.5 + (d / 45) * 14.5, 0.06, 1800);                       // 45 días = 45 toques
  for (let i = 0; i < 8; i++) { const t = D + 0.5 + (i / 8 * 0.5 + 0.1) * 14.5; m.nota(t, E[4 + i], 0.08, 0.6); m.cruje(t, 0.2); }  // cada pedazo que se rompe
  for (let i = 0; i < 6; i++) m.bajo(D + 0.5 + i * 2.4, notaT(25) - 12, 0.1, 0.6);                  // pulso del jardín: grave y quieto
  // rayos X: el agua corta la cadena con calor (9 eslabones = 9 notas que suben)
  m.pad(X, M, 0.045, [45, 52, 57]); m.sube(X + 0.2, 0.6, 64, 79, 0.06);
  for (let i = 0; i < 9; i++) m.nota(X + 1 + (i / 9 * 0.6 + 0.2) * (M - 1 - X - 1), E[3 + i], 0.08, 0.5);
  // mar: 365 días (un toque cada 10 días), todo tapado; el medidor se queda en 0 %
  m.pad(M, R, 0.055, [38, 45], 1);
  for (let k = 0; k < 37; k++) m.tic(M + 0.5 + (k / 36) * (R - 1 - M - 0.5), 0.05, 700);
  for (let k = 0; k < 10; k++) m.burbuja(M + 0.3 + k * 0.9, 0.06, 400);
  // respuesta: 58 °C + humedad + semanas → tres notas y se libera
  m.pad(R, L + 0.3, 0.05, [45, 52, 57, 64]);
  [0.4, 1.6, 2.8].forEach((d, i) => { m.nota(R + d, notaT(58) + [0, 4, 7][i], 0.1, 1.2); m.golpe(R + d, 0.2, 90); });
  // loop: los vasos vuelven arriba
  m.sube(L + 1, 3, 57, 69, 0.05); m.pad(L, FIN, 0.04, [45, 52], 0.85);
} else {
  /* ---------- narrada ---------- */
  const G = K.Gancho, Q = K.Que, U = K.Uno, Do = K.Donde, Es = K.Estudio, P = K.Pregunta, D2 = K.Dos, Tr = K.Tres, Ca = K.Cafe, Ef = K.Estafa, C = K.Cierre, Ou = K.Outro;
  m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  m.pad(U, Do, 0.03, [40, 47]);                                                                   // por dentro: más grave
  m.whoosh(G + 0.05, 0.7, 0.15); m.golpe(G + 0.8, 0.35, 70);                                          // el vaso cae al jardín
  for (let k = 0; k < 18; k++) m.tic(G + 1.2 + k * 0.17, 0.05, 1600);                                  // días que pasan
  m.nota(Q + 0.2, 64, 0.06, 0.6); m.nota(Q + 0.9, 67, 0.06, 0.6); m.nota(Q + 1.7, 69, 0.06, 0.6);
  for (let i = 0; i < 9; i++) m.tic(Q + 2.4 + i * 0.18, 0.08, 2600);                                   // eslabones de la cadena
  m.sube(U + 0.5, 2.5, 52, 64, 0.05); m.sube(U + 1.6, 0.6, 64, 79, 0.06);                             // sube la temperatura; lupa
  for (let i = 0; i < 9; i++) m.tic(U + 3.2 + i * 0.22, 0.07, 3200);                                   // se cortan los eslabones
  [0.3, 0.9, 1.5].forEach((d, i) => m.nota(Do + d, [69, 57, 55][i], 0.07, 0.7));
  m.golpe(Es + 0.2, 0.35, 80); for (let k = 0; k < 20; k++) m.burbuja(Es + 2.8 + k * 0.15, 0.05, 450);
  m.sube(P + 0.1, 1.4, 52, 64, 0.05);
  for (let k = 0; k < 10; k++) m.tic(D2 + 0.3 + k * 0.45, 0.05, 900); m.metal(D2 + 3.2, 0.1, 500);   // banda de reciclaje
  m.sube(Tr + 0.4, 1.0, 45, 57, 0.06); for (let k = 0; k < 6; k++) m.metal(Tr + 1.4 + k * 0.12, 0.06, 1400 + k * 80);   // monedas
  m.whoosh(Ca + 0.3, 0.8, 0.12); m.sube(Ca + 1.5, 2, 60, 52, 0.05);                                   // café y el vaso que se ablanda
  m.cruje(Ef + 1.6, 0.4); m.sube(Ef + 2, 0.8, 52, 57, 0.05);
  m.nota(C + 1.4, 57, 0.07, 1.4); m.nota(C + 1.4, 64, 0.06, 1.4);
  m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
}
m.guardar(OUT, K.Outro == null ? 1.9 : 1);
