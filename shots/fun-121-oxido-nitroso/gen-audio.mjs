// gen-audio.mjs — cama + efectos del Shot Fungi Mati #121 (óxido nitroso y hongos del suelo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Forma (composicion-musical.md): un acorde por escena, nunca el mismo más de ~7 s. Re menor «algo se escapa» en el gancho,
// se oscurece con el ozono, se ahoga (tapa) en el suelo sin oxígeno, se aclara a mayor con las bacterias que lo desarman,
// vuelve a tensarse con el hongo, avanza en los estudios y resuelve en Fa mayor en la milpa del cierre.
// Motivo propio de 4 notas (motivo → respuesta → secuencia → cadencia) muy quedito al inicio de cada escena, debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Oxido Nitroso base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 1212);
const K = m.K;
const G = K.Gancho, Oz = K.Ozono, Ca = K.Campo, Ch = K.Charco, P = K.Pregunta, B = K.Bacterias, H = K.Hongo, E = K.Estudio, Pa = K.Pastizal, M = K.Matiz, C = K.Cierre, Ou = K.Outro;
const H2 = H + 2.4, BT = 0.6;  // pulso: 100 BPM

const CAMA = [
  [0, G + 4.8, [38, 45, 50, 53], 0.2],         // Re menor
  [G + 4.8, Oz, [41, 48, 53, 57], 0.15],       // Fa (el número)
  [Oz, Ca, [34, 46, 49, 53], 0.25],            // Si bemol (espacio, ozono)
  [Ca, Ch, [36, 43, 48, 52], 0.2],             // Do
  [Ch, B, [40, 47, 52, 55], 0.55],             // Mi menor, ahogado (sin oxígeno)
  [B, H, [43, 50, 55, 59], 0],                 // Sol mayor: las bacterias lo desarman
  [H, H2, [38, 45, 50, 53], 0.25],             // Re menor: el hongo
  [H2, E, [37, 44, 49, 52], 0.3],              // Do# disminuido de color (la enzima que no se conoce)
  [E, Pa, [45, 52, 57, 60], 0.05],             // La menor (el estudio)
  [Pa, M, [41, 48, 53, 57], 0.05],             // Fa
  [M, C, [43, 50, 53, 58], 0.2],               // Sol menor (matiz)
  [C, Ou + 3.5, [41, 48, 53, 57, 60], 0],      // Fa mayor: resolución en la milpa
];
CAMA.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.25, 0.05, notas, tapa));

const MOT = [
  [G + 0.3, [62, 65, 69, 67]],      // motivo
  [G + 5.0, [65, 69, 72, 70]],      // respuesta (×273)
  [Oz + 0.4, [70, 69, 65, 62]],     // baja (ozono)
  [Ca + 0.4, [64, 67, 72, 71]],     // secuencia
  [Ch + 0.4, [64, 62, 59, 57]],     // cadencia oscura (ahogada)
  [B + 0.3, [67, 71, 74, 79]],      // se aclara
  [H + 0.4, [62, 65, 69, 67]],      // vuelve el motivo
  [E + 0.4, [69, 72, 76, 74]],      // estudio
  [Pa + 0.5, [65, 69, 72, 77]],     // pastizal
  [M + 0.3, [70, 69, 67, 65]],      // matiz
  [C + 0.4, [65, 69, 72, 74]],      // regreso del motivo…
];
MOT.forEach(([t, ns], k) => ns.forEach((n, i) => m.nota(t + i * BT * (k % 2 ? 0.75 : 1), n, 0.032, 0.9, k === 4 ? 0.6 : 0)));
m.nota(C + 3.2, 72, 0.035, 1.6); m.nota(C + 3.2, 77, 0.03, 1.6);   // …y cadencia en Fa

// efectos atados a la pantalla (tiempo de autor)
m.whoosh(G + 0.0, 0.5, 0.08);                                          // se inclina el costal (cuadro 0)
for (let i = 0; i < 24; i++) m.tic(G + 0.2 + i * 0.09, 0.06, 1800 + (i % 5) * 200); // granitos que caen
for (let i = 0; i < 8; i++) m.burbuja(G + 2.4 + i * 0.3, 0.07, 420 + i * 30);     // sube el N₂O
m.golpe(G + 4.6, 0.35, 70); m.sube(G + 4.6, 1.0, 50, 62, 0.04);         // ×273
m.tic(G + 6.2, 0.2, 1200);                                              // chip «kilo por kilo»
m.golpe(Oz + 0.3, 0.3, 80);                                             // tarjeta 2009
m.sube(Oz + 1.0, 2.5, 60, 52, 0.035);                                   // se adelgaza el ozono
m.tic(Oz + 2.0, 0.2, 1100);
m.sube(Ca + 0.4, 1.4, 52, 60, 0.035); m.sube(Ca + 1.4, 1.0, 48, 52, 0.03); // barras
for (let i = 0; i < 30; i++) m.gota(Ch + i * 0.08, 0.06, 900 + (i % 6) * 120); // lluvia
m.whoosh(Ch + 0.4, 2.4, 0.04);                                          // se llenan los poros
for (let i = 0; i < 9; i++) m.burbuja(Ch + 1.2 + i * 0.25, 0.06, 700 - i * 40); // se acaba el O₂
m.sube(P + 0.1, 1.4, 55, 67, 0.045);                                    // re-gancho
m.whoosh(B + 0.2, 1.0, 0.05); m.burbuja(B + 1.4, 0.1, 500); m.nota(B + 2.2, 79, 0.05, 0.6); // N₂O entra, sale N₂, palomita
m.sube(H - 0.2, 1.8, 45, 52, 0.03);                                     // crece la hifa
for (let i = 0; i < 3; i++) { m.tic(H2 + 0.3 + i * 1.8, 0.15, 900); m.burbuja(H2 + 1.2 + i * 1.8, 0.08, 380); } // NO + NO → N₂O
m.golpe(H2 + 2.4, 0.4, 60);                                             // tache
m.golpe(E + 0.2, 0.35, 80);                                             // tarjeta 2015
for (let i = 0; i < 70; i++) m.tic(E + 2.6 + i * 0.03, 0.05, 2000 + (i % 7) * 150); // 70 tubitos que se encienden
m.golpe(Pa + 0.2, 0.35, 80);                                            // tarjeta 2002
for (let i = 0; i < 3; i++) m.metal(Pa + 2.2 + i * 0.15, 0.06, 900 + i * 120); // frascos
m.sube(Pa + 2.6, 1.4, 50, 57, 0.03);                                    // barras
m.golpe(Pa + 4.0, 0.3, 70); m.tic(Pa + 4.4, 0.2, 1200);                 // −89 %, −23 %
for (let i = 0; i < 4; i++) m.tic(M + 0.2 + i * 0.15, 0.1, 900);        // cortes de suelo
m.tic(M + 1.2, 0.2, 1100);
m.whoosh(C + 0.2, 0.8, 0.05); m.sube(C + 0.4, 2.0, 48, 55, 0.03);       // hifas en la milpa
for (let i = 0; i < 6; i++) m.burbuja(C + 1.6 + i * 0.3, 0.06, 450 + i * 30); // el gas sube
m.nota(Ou + 0.3, 41, 0.07, 2.8); m.nota(Ou + 0.3, 53, 0.06, 2.8); m.nota(Ou + 0.3, 60, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8);
m.guardar(OUT, 1);
