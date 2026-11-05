// gen-audio.mjs — cama + efectos del Shot Fungi Mati #121 (bosque quemado / Pyronema). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Forma (composicion-musical.md): cama grave que cambia de acorde en cada escena (nunca el mismo más de ~6 s),
// tapada y en menor mientras todo «está muerto» (fuego, carbón, siglos), se abre a mayor cuando aparece Pyronema,
// regresa a lo sobrio en «fue poco» y resuelve en Do mayor con el brote. Un motivo propio de 4 notas
// (motivo → respuesta → secuencia → cadencia) entra muy quedito al inicio de cada escena, siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hongo Ceniza base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 121);
const K = m.K;
const G = K.Gancho, Tu = K.Tu, Ca = K.Carbon, Si = K.Siglos, Py = K.Pyronema, P = K.Pregunta, E = K.Estudio, A = K.Alimento, I = K.Isotopo, Ge = K.Genes, Po = K.Poquito, C = K.Cierre, Ou = K.Outro;
const I2 = I + 3.0, B = 0.6; // pulso: 100 BPM

// cama: [inicio, fin, acorde, tapa]
const CAMA = [
  [0, Tu, [45, 52, 57, 60], 0.45],          // La menor, tapada (bosque «muerto»)
  [Tu, Ca, [41, 48, 53, 57], 0.4],          // Fa
  [Ca, Si, [38, 45, 50, 53], 0.45],         // Re menor (fuego)
  [Si, Py, [40, 47, 52, 55], 0.55],         // Mi menor, la más tapada (siglos, intocable)
  [Py, P, [36, 48, 52, 55], 0.1],           // Do mayor: se abre con Pyronema
  [P, E, [43, 50, 55, 57], 0.2],            // Sol sus (pregunta)
  [E, A, [45, 52, 57, 60], 0.15],           // La menor, ya clara (el estudio)
  [A, I, [41, 48, 53, 57], 0.05],           // Fa
  [I, Ge, [48, 52, 55, 60], 0],             // Do
  [Ge, Po, [38, 50, 53, 57, 64], 0],        // Re menor 9 (genes)
  [Po, C, [40, 47, 52, 55], 0.3],           // Mi menor, sobrio («fue poco»)
  [C, C + 2.4, [41, 48, 53, 57], 0.05],     // Fa →
  [C + 2.4, Ou + 3.5, [36, 43, 52, 55, 60], 0], // Do mayor: resolución con el brote
];
CAMA.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.25, 0.05, notas, tapa));

// motivo propio (4 notas) y sus variaciones; [escena, notas]
const MOT = [
  [G + 0.2, [69, 72, 74, 76]],     // motivo
  [Tu + 0.2, [77, 76, 72, 69]],    // respuesta
  [Ca + 0.3, [74, 77, 79, 81]],    // secuencia (un tono arriba)
  [Si + 0.3, [76, 74, 71, 69]],    // cadencia a la raíz, oscura
  [Py + 0.8, [72, 76, 79, 84]],    // el motivo en mayor (aparece el hongo)
  [E + 0.4, [69, 72, 74, 76]],     // vuelve el motivo
  [A + 2.5, [72, 74, 77, 81]],     // crece el micelio
  [I + 0.3, [79, 81, 84, 86]],     // ¹³C
  [Ge + 0.3, [74, 77, 81, 86]],    // genes
  [Po + 0.4, [76, 74, 72, 71]],    // «fue poco»: baja
  [C + 0.4, [69, 72, 74, 76]],     // regreso del motivo…
];
MOT.forEach(([t, ns], k) => ns.forEach((n, i) => m.nota(t + i * B * (k % 2 ? 0.75 : 1), n, 0.032, 0.9, k < 4 ? 0.35 : 0)));
m.nota(C + 3.0, 79, 0.035, 1.6); m.nota(C + 3.0, 84, 0.03, 1.6);   // …y cadencia en Do

// efectos atados a la pantalla (tiempo de autor)
m.cruje(G + 0.05, 0.5); m.whoosh(G + 0.1, 1.6, 0.06);                    // brasas y humo desde el cuadro 0
m.nota(G + 0.6, 72, 0.05, 0.4); m.burbuja(G + 0.8, 0.1, 380); // se enciende el primer tapete
for (let i = 0; i < 6; i++) m.burbuja(G + 2.6 + i * 0.3, 0.07, 420 + i * 40);    // aparecen los demás tapetes
m.cruje(Tu + 0.2, 0.45);                                                  // anafre prendido
m.whoosh(Tu + 1.4, 0.8, 0.05);                                            // se apaga / entra el cerro
m.tic(Tu + 1.8, 0.2, 1400);                                               // chip
for (let i = 0; i < 4; i++) m.cruje(Ca + 0.3 + i * 0.7, 0.35);            // el tronco arde
m.whoosh(Ca + 1.0, 0.8, 0.08);                                            // humo arriba
m.golpe(Ca + 3.0, 0.3, 70); for (let i = 0; i < 5; i++) m.tic(Ca + 3.05 + i * 0.07, 0.12, 900); // cae el carbón
for (let i = 0; i < 8; i++) m.tic(Si + 0.2 + i * 0.12, 0.08, 700);      // trozos de carbón en el suelo
m.golpe(Si + 0.6, 0.2, 60);                                               // chip «cientos o miles de años»
m.sube(Py + 0.1, 1.3, 52, 60, 0.035);                                     // zoom a lo pequeño
for (let i = 0; i < 16; i++) m.burbuja(Py + 0.8 + i * 0.17, 0.05, 520 + (i % 5) * 60); // brotan los discos
m.sube(P + 0.1, 1.6, 55, 67, 0.045);                                      // re-gancho
m.golpe(E + 0.2, 0.35, 80);                                               // tarjeta del estudio
m.tic(E + 2.2, 0.2, 1000); m.nota(E + 2.25, 81, 0.04, 0.5);               // punto del incendio Rim
m.whoosh(E + 2.8, 0.6, 0.05);                                             // flecha a la caja Petri
m.metal(A + 0.4, 0.12, 600);                                              // se prende el horno
for (let i = 0; i < 4; i++) m.tic(A + 0.6 + i * 0.15, 0.1, 1200);         // astillas
m.whoosh(A + 1.6, 0.8, 0.06); m.tic(A + 2.4, 0.2, 800);                   // el carbón vuela a la caja
for (let i = 0; i < 3; i++) m.whoosh(I + 0.2 + i * 0.25, 0.5, 0.04);      // flechas de ¹³CO₂
m.whoosh(I + 1.6, 0.6, 0.05);                   // carbón dorado
m.nota(I + 2.05, 84, 0.04, 1.0);
for (let i = 0; i < 14; i++) m.burbuja(I2 + 1.0 + i * 0.22, 0.07, 600 + (i % 4) * 90); // burbujas de CO₂ con ¹³C
for (let i = 0; i < 18; i++) m.tic(Ge + 0.3 + i * 0.09, 0.05, 2600 + (i % 4) * 300); // genes que se encienden
for (let i = 0; i < 6; i++) m.nota(Ge + 1.4 + i * 0.22, 74 + (i % 3) * 3, 0.03, 0.35); // anillos que se abren
m.tic(Po + 0.2, 0.2, 1100);                                               // chip «en laboratorio»
m.sube(Po + 0.4, 1.4, 55, 59, 0.03);                                      // barra dorada (chiquita)
m.sube(Po + 1.2, 1.4, 48, 52, 0.035);                                     // barra gris (grande)
m.whoosh(C + 0.2, 0.8, 0.05);                                             // regreso al bosque
for (let i = 0; i < 4; i++) m.burbuja(C + 1.2 + i * 0.25, 0.06, 700);     // CO₂ que sube
m.sube(C + 2.4, 0.8, 60, 67, 0.04);                                       // brote
m.nota(Ou + 0.3, 48, 0.07, 2.8); m.nota(Ou + 0.3, 55, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
