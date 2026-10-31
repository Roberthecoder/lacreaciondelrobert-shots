// gen-audio.mjs — música + efectos del Ambiental #02 (resistencia a antibióticos). Sin costo (motor/kit/audio-kit.mjs).
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (base narrada, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada · workflow: el mudo)
// Mudo (M5 "La carrera"): cada bacteria nueva es una nota (1 → 2 → 4 … 64); el antibiótico ahoga la música y cada
// bacteria que muere es un golpe sordo; las resistentes vuelven a duplicarse con música libre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from '../../motor/kit/audio-kit-lote-c.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Resistencia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 13);
const K = m.K, E = m.ESC;

if (K.Una != null) {
  /* ---------- gemelo mudo ---------- */
  const U = K.Una, D = K.Duplica, A = K.Antibiotico, S = K.Sobrevive, O = K.Otra, C = K.Comparte, L = K.Llena, Lo = K.Loop, FIN = Lo + 7;
  m.nota(U + 0.3, 57, 0.1, 1.2);                                                         // 1 bacteria
  // generaciones: cada 1.4 s (= 20 min simulados) nacen 2^g bacterias → 2^g notas
  const divide = (t0, base, tapa = 0) => { for (let g = 0; g < 6; g++) { const t = t0 + g * 1.4, nuevas = Math.pow(2, g);
    m.bajo(t, 33 + g * 2, 0.12, 0.5);
    for (let k = 0; k < nuevas; k++) m.nota(t + (k / nuevas) * 0.6, E[(base + k) % 10 + Math.min(4, g)], 0.04 + 0.03 / (1 + g), 0.35, tapa); } };
  m.pad(U, A, 0.04, [45, 52, 57]);
  divide(D + 0.3, 0);
  // antibiótico: la música se tapa; 63 golpes sordos (las que mueren); queda 1
  m.whoosh(A + 0.3, 1.5, 0.15); m.metal(A + 0.3, 0.15, 600);
  for (let i = 0; i < 64; i++) if (i !== 37) m.golpe(A + 1 + (i % 16) * 0.12 + Math.floor(i / 16) * 0.22, 0.07, 55);
  m.pad(A, S, 0.06, [40, 43, 47], 0.9);
  m.nota(S - 0.6, 64, 0.1, 1.0);                                                         // la que sobrevivió
  // las resistentes se duplican: música libre, una octava más arriba
  m.pad(S, O + 0.2, 0.045, [45, 52, 57, 64]); divide(S + 0.4, 3);
  // la segunda pastilla: cae y no pasa nada (golpe que rebota)
  m.whoosh(O + 0.3, 1.5, 0.15); m.metal(O + 0.3, 0.15, 600); for (let k = 0; k < 4; k++) m.tic(O + 1.2 + k * 0.4, 0.12, 3000);
  m.nota(O + 1.4, 69, 0.08, 0.6); m.nota(O + 1.6, 72, 0.08, 0.6);
  // el gen viaja a otra especie (nota que sube) y cada bacteria de esa especie que aparece es una nota
  m.pad(C, Lo + 0.3, 0.045, [45, 52, 57]); m.sube(C + 1.8, 2.0, 57, 69, 0.07);
  for (let i = 0; i < 12; i++) m.nota(L + i * 0.9, E[6 + (i % 6)], 0.07, 0.6);
  for (let i = 0; i < 8; i++) m.bajo(C + i * 1.4, 40, 0.1, 0.5);
  // loop: el plato se vacía y queda 1 (la misma nota del inicio)
  m.sube(Lo + 3.5, 2.5, 64, 57, 0.06); m.pad(Lo, FIN, 0.04, [45, 52, 57]); m.nota(FIN - 0.6, 57, 0.08, 0.6);
} else {
  /* ---------- narrada ---------- */
  const G = K.Gancho, Az = K.Azar, B = K.Barre, Cr = K.Crecen, Co = K.Comparten, P = K.Pregunta, Es = K.Estudio, An = K.Anual, R = K.Riesgo, F = K.Fleming, S = K.Sirve, C = K.Cierre, Ou = K.Outro;
  m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  m.pad(G + 2.2, P, 0.03, [40, 47]);                                                     // por dentro: más grave
  m.whoosh(G, 1.0, 0.15); m.golpe(G + 1.2, 0.3, 120);                                     // la cápsula entra
  m.whoosh(G + 2.0, 0.8, 0.18); m.sube(G + 2.0, 0.6, 64, 76, 0.05);                      // bajamos al microscopio
  for (let i = 0; i < 42; i++) m.golpe(G + 2.4 + (i / 46) * 0.9 + 0.4, 0.04, 60);           // las sensibles mueren
  m.nota(Az + 0.6, 64, 0.08, 1.0); m.nota(Az + 0.9, 69, 0.06, 1.0);                       // el gen
  for (let i = 0; i < 42; i++) m.tic(Cr + 0.3 + (i / 42) * 0.8 * 2.7 + 0.1, 0.05, 2200);   // crecen las resistentes
  m.metal(Cr + 3.2, 0.12, 600);                                                          // segunda pastilla: nada
  m.sube(Co + 0.8, 2.5, 57, 69, 0.05); m.nota(Co + 3.4, 69, 0.07, 0.8);                    // el gen pasa
  m.sube(P + 0.1, 1.4, 52, 64, 0.05);
  m.golpe(Es + 0.2, 0.35, 80); for (let i = 0; i < 39; i++) m.tic(Es + 3.0 + i * 0.05, 0.06, 1200);  // 39 millones = 39 cuadros
  m.sube(An + 0.4, 1.0, 45, 52, 0.06); m.sube(An + 0.4, 1.0, 45, 57, 0.05);
  [0.6, 1.3, 2.0].forEach((d, i) => m.nota(R + d, [52, 50, 47][i], 0.08, 0.8));
  m.golpe(F + 0.4, 0.35, 80);
  [0.8, 1.9, 3.0].forEach((d, i) => m.nota(S + d, [64, 67, 69][i], 0.07, 0.7));
  m.whoosh(C, 0.8, 0.18); m.metal(C + 0.4, 0.12, 600);
  m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
}
m.guardar(OUT, K.Outro == null ? 1.9 : 1);
