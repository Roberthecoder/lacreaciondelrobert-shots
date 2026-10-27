// gen-audio.mjs — música y efectos de Fungi Mati #04 (¿los hongos tienen metales pesados?). Sin costo.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (base narrada: cama grave + efectos, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// Mudo (M2 "¿Por qué NO…?"): la música cuenta el estado y sale de lo que pasa en pantalla:
//   · cada carro que pasa frente al hongo = un golpe grave (mismas fórmulas de posición que el dibujo)
//   · cada átomo de metal que llega al sombrero = un toque agudo (28 partículas en ciclo)
//   · mientras el hongo se carga de metales la música va TAPADA y tensa (segunda menor); lejos de la carretera se abre
//   · hervir: 12 metales que salen al agua = 12 gotas
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearAudio } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Metales Pesados base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const A = crearAudio(HERE, HTML), K = A.K, ESC = A.ESC;

if (K.Carretera != null) {
  /* ---------- MUDO ---------- */
  const { Pregunta: P, Carretera: C, Rayos: R, Bosque: B, Hervir: H, Respuesta: Re, Vuelta: V, Outro: F } = K;
  A.pad(0, B, 0.045, [45, 46, 52]);                         // tensa (La y Si bemol juntos)
  A.tapar(C, B, 420);                                      // ahogada mientras el problema crece
  A.pad(B, H, 0.05, [45, 52, 57, 61]);                     // libre: lejos de la contaminación
  A.pad(H, Re, 0.045, [45, 52, 57]);
  A.pad(Re, F + 3.5, 0.05, [45, 52, 57, 64]);
  // carros: cruzan x = 760 cuando (T·380 + i·520) mod 1700 = 1060
  for (let i = 0; i < 4; i++) for (let k = 0; k < 20; k++) { const t = (1060 - i * 520 + k * 1700) / 380; if (t < 0) continue; if ((t > P - 1 && t < B) || (t > V && t < F)) A.golpe(t, 0.18, 55); }
  // metales que llegan al sombrero: u = (T·0.25 + i/28) mod 1 vuelve a 0 → llegó
  for (let i = 0; i < 28; i++) for (let k = 1; k < 20; k++) { const t = (k - i / 28) / 0.25; const p = Math.min(1, Math.max(0, (t - C - 1) / (R + 2 - C - 1))); if (t > C && t < B && i / 28 <= p) A.tic(t, 0.07, 3000 + (i % 3) * 500); }
  A.whoosh(R + 0.2, 0.6, 0.15); for (let i = 0; i < 26; i++) A.tic(R + 0.4 + i * 0.08, 0.05, 2200 + (i % 3) * 400);
  A.whoosh(B - 0.2, 0.8, 0.14); [57, 61, 64].forEach((m) => A.campana(B + 0.5, m + 12, 0.05, 2));
  for (let i = 0; i < 12; i++) A.gota(H + 2 + i * 0.3, 0.12);
  A.whoosh(Re - 3, 1.2, 0.18);
  [57, 64, 69].forEach((m) => A.nota(Re + 0.5, m, 0.07, 2.4));
  A.whoosh(V - 0.3, 0.8, 0.14);
  [57, 64, 69].forEach((m) => A.nota(F + 0.3, m, 0.07, 2.8));
} else {
  /* ---------- NARRADA ---------- */
  const { Gancho: G, Micelio: Mi, Riesgo: R, Lugar: L, Cultivo: Cu, Pregunta: P, Estudio: E, Digestion: D, Limpia: Li, Cierre: Ci, Outro: O } = K;
  A.pad(0, O + 3.5, 0.05, [45, 52, 57]);
  A.gota(G + 0.05, 0.25); A.sube(G + 0.05, 1.3, 52, 64, 0.04); for (let i = 0; i < 10; i++) A.tic(G + 1.5 + i * 0.2, 0.06, 2600 + (i % 3) * 400);
  A.whoosh(Mi + 0.2, 1.0, 0.16); A.sube(Mi + 0.4, 1, 50, 62, 0.05);
  [0.4, 1.3, 2.2].forEach((d, i) => { A.pop(R + d, 0.2); A.nota(R + d, ESC[3 + i * 2], 0.06, 0.6); });
  A.whoosh(L, 0.8, 0.14); A.golpe(L + 0.8, 0.2, 55); A.golpe(L + 2.2, 0.2, 55); A.sube(L + 1.5, 2.7, 57, 69, 0.04);
  A.pop(Cu + 0.4, 0.15); A.pop(Cu + 0.8, 0.15); A.sube(Cu + 1, 2, 64, 55, 0.04);
  A.whoosh(P, 0.6, 0.14);
  A.golpe(E + 0.2, 0.35, 80); for (let i = 0; i < 10; i++) A.gota(E + 2.6 + i * 0.12, 0.08);
  A.whoosh(D - 3.4, 1.2, 0.18);
  A.golpe(D + 0.1, 0.3, 80); for (let i = 0; i < 12; i++) A.tic(D + 1 + i * 0.07 + 1.2, 0.05, 2400);
  for (let i = 0; i < 34; i += 2) A.tic(Li + 0.5 + i * 0.07 + 1.6, 0.05, 2800); A.sube(Li + 1, 2, 52, 64, 0.04);
  A.whoosh(Ci, 0.6, 0.14); A.sube(Ci + 0.4, 1, 57, 69, 0.04);
  [57, 64, 69].forEach((m) => A.nota(O + 0.3, m, 0.07, 2.8));
}
A.guardar(OUT, K.Carretera != null ? 1.8 : 1);
