// gen-audio.mjs — música y efectos de Fungi Mati #01 (¿Qué es un hongo?). Sin costo: todo se sintetiza.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (base narrada: cama grave + efectos, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs y el workflow lo llaman así)
// Narrada: cama grave continua SIN golpe (la voz manda) + un efecto por cada cosa que pasa en pantalla.
// Mudo (ciclo): la música sale de los datos del dibujo:
//   · 1 nota por cada 8 hifas nuevas (la red tiene 320 tramos → 40 notas, al ritmo en que crece)
//   · el 2º micelio suena en otra tonalidad y al unirse los dos se vuelven un acorde
//   · el champiñón crece con una nota que sube · 60 esporas = 60 toques agudos · 8 etapas = 8 bajos
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearAudio } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Que Es Un Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const A = crearAudio(HERE, HTML), K = A.K, ESC = A.ESC;

if (K.Espora != null) {
  /* ---------- MUDO: ciclo del champiñón ---------- */
  const { Espora: E, Germina: G, Red: R, Une: U, Nudo: N, Crece: C, Esporas: S, Otro: O, Outro: F } = K;
  A.pad(0, F + 3.5, 0.045, [45, 52, 57]);
  [E, G, R, U, N, C, S, O].forEach((t, i) => A.bajo(t + 0.05, [45, 48, 50, 52, 53, 55, 57, 45][i], 0.1, 1.4));
  // espora que cae y toca el suelo; germina (tono que sube)
  A.whoosh(E + 0.2, 4, 0.08); A.gota(E + 4.5, 0.3); A.sube(G + 0.8, 5.6, 57, 69, 0.05);
  for (let k = 0; k < 8; k++) A.campana(G + 1 + k * 0.7, ESC[k], 0.04, 0.8);       // la hifa se alarga
  // micelio: 40 notas = 320 hifas (una nota cada 8), al ritmo del dibujo (kEase.suave entre Red y Une+2)
  for (let k = 1; k <= 40; k++) A.nota(R + (U + 2 - R) * A.cruce((k - 0.5) / 40), ESC[(k * 2) % 12], 0.045, 0.4);
  // segundo micelio (más agudo, otra escala) y la unión: acorde
  for (let k = 0; k < 16; k++) A.nota(U - 2 + 5 * A.cruce((k + 0.5) / 16), [71, 74, 76, 79][k % 4], 0.035, 0.4);
  [57, 64, 69, 76].forEach((m) => A.campana(U + 3, m, 0.06, 3));
  // nudo de hifas: 14 hilos que se juntan = 14 toques que se aceleran; brota el primordio
  for (let i = 0; i < 14; i++) A.tic(N + i * 0.1 + 1.4, 0.08, 2600);
  A.pop(N + 1.6, 0.25);
  // crece el champiñón (nota que sube con su tamaño) y se abre
  A.sube(N + 2.5, C + 5 - (N + 2.5), 45, 64, 0.06); A.whoosh(C + 4.2, 1.2, 0.12);
  // 60 esporas = 60 toques
  for (let i = 0; i < 60; i++) A.tic(S + 0.4 + i * 0.12, 0.06 + 0.03 * (i % 3), 3400 + (i % 5) * 300);
  // otra vez: una espora vuela y cae (empata con el inicio)
  A.whoosh(O - 0.6, 1.8, 0.14);
  [57, 64, 69].forEach((m) => A.nota(F + 0.3, m, 0.07, 2.8));
} else {
  /* ---------- NARRADA ---------- */
  const { Gancho: G, Red: R, Come: Co, Pregunta: P, Fruto: Fr, Manzana: M, Estudio: E, Quitina: Q, Levadura: L, Cierre: Ci, Outro: O } = K;
  A.pad(0, O + 3.5, 0.05, [45, 52, 57]);
  A.pad(R + 1.3, P, 0.03, [40, 47]);                                   // bajo tierra: más grave
  // gancho: brota el champiñón, caen esporas, se ilumina el micelio
  A.pop(G + 0.05, 0.3); A.whoosh(G + 0.6, 1.6, 0.12); A.sube(G + 2.4, 1.2, 52, 64, 0.06);
  // al micelio: zoom y las hifas crecen
  A.whoosh(R + 0.4, 1.0, 0.18); A.sube(R + 1.3, 5.2, 50, 62, 0.04); A.golpe(R + 6.4, 0.2, 70);
  // tachones y enzimas
  [0.7, 1.1, 1.6].forEach((d) => A.raspa(Co + d, 0.3, 0.12));
  for (let t = Co + 3.3; t < P - 0.3; t += 0.35) A.tic(t, 0.05, 2800);
  // pregunta: regreso arriba
  A.whoosh(P, 1.2, 0.16);
  // fruto: crece y se abre; esporas
  A.sube(Fr + 0.6, 3.6, 45, 60, 0.05); A.pop(Fr + 3.2, 0.2); for (let k = 0; k < 10; k++) A.tic(Fr + 5.4 + k * 0.12, 0.05, 3500);
  // manzana: chips
  [0.5, 0.7, 1.4, 1.6].forEach((d, i) => A.nota(M + d, ESC[4 + i], 0.06, 0.6));
  // estudio: tarjeta y árbol de parentesco
  A.golpe(E + 0.2, 0.35, 80); A.whoosh(E + 3.5, 1.4, 0.12); [57, 64, 69].forEach((m) => A.nota(E + 4.6, m, 0.06, 1.6));
  // quitina: un toque por anillo de la cadena; el escarabajo aparece
  for (let k = 0; k < 7; k++) A.tic(Q + 0.3 + k * 0.27, 0.1, 1800 + k * 120); A.pop(Q + 1.6, 0.2);
  // levadura: se abre la lupa y salen las yemas
  A.whoosh(L + 0.5, 0.6, 0.15); [0, 0.5, 1, 1.5].forEach((d) => A.pop(L + 1 + d, 0.15));
  // cierre: el micelio se ilumina otra vez
  A.whoosh(Ci, 0.8, 0.16); A.sube(Ci + 0.6, 1, 52, 64, 0.05);
  [57, 64, 69].forEach((m) => A.nota(O + 0.3, m, 0.07, 2.8));
}
A.guardar(OUT, K.Espora != null ? 1.8 : 1);
