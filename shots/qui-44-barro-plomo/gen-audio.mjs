// gen-audio.mjs — cama grave + efectos del Shot Químico #44 (barro vidriado con plomo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Barro base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, Gr = K.Greta, Ho = K.Horno, Ac = K.Acido, Ce = K.Cerebro, Pr = K.Pregunta, Es = K.Estudio, Co = K.Comparacion, Cu = K.Curado, Al = K.Alternativa, Ci = K.Cierre, Ou = K.Outro;
const microHo = Ho + 2.3, barraCu = Cu + 4.6;

m.pad(0, Ce, 0.05, [45, 52, 57]);
m.pad(Ce, Al, 0.05, [44, 51, 56], 0.4);                                               // más oscuro mientras dura el problema
m.pad(Al, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 2.4, 0.07);                                                        // chorro de café
for (let i = 0; i < 3; i++) m.nota(G + 0.2 + i * 2.4, 81, 0.04, 0.5);                 // destello del esmalte
m.whoosh(Gr + 0.5, 1.8, 0.06); m.whoosh(Gr + 1.0, 1.4, 0.05);                         // polvo que cae
for (let i = 0; i < 5; i++) m.tic(Gr + 2.9 + i * 0.35, 0.08, 1100);                   // brochazos
m.cruje(Ho + 0.2, 0.5); m.sube(Ho + 0.2, 1.6, 50, 57, 0.04);                          // horno y termómetro que no llega
m.golpe(microHo, 0.25, 70);
for (let i = 0; i < 10; i++) { m.tic(Ac + 1.2 + i * 0.32, 0.08, 1600); m.burbuja(Ac + 0.3 + i * 0.4, 0.05, 500); } // cada Pb²⁺ que sale
for (let i = 0; i < 6; i++) m.gota(Ac + 1.0 + i * 0.35, 0.1, 1100);                    // limón
m.whoosh(Ce + 0.1, 0.7, 0.06); m.zumbido(Ce + 1.0, 0.6, 0.04, 220);                   // cuchara, rayos X
for (let i = 0; i < 5; i++) m.nota(Ce + 3.0 + i * 0.16, 64 - i * 2, 0.03, 0.4);       // conexiones que se apagan
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 22; i++) m.tic(Pr + 0.2 + i * 0.08, 0.05, 1900);                  // puntos en el mapa
m.golpe(Es + 0.2, 0.35, 80); m.tic(Es + 3.6, 0.2, 2600); m.metal(Es + 4.4, 0.1, 1200); // tarjeta, piquete, lector
for (let i = 0; i < 44; i++) m.tic(Co + 0.6 + i * 0.03, 0.04, 1500);                  // 44 se encienden
m.golpe(Co + 1.2, 0.3, 90);
for (let i = 0; i < 10; i++) m.tic(Co + 3.4 + i * 0.03, 0.04, 2000);                  // 10 se encienden
m.golpe(Co + 3.6, 0.2, 110);
m.whoosh(Cu + 0.4, 1.0, 0.05); for (let i = 0; i < 14; i++) m.burbuja(Cu + 1.8 + i * 0.12, 0.07, 600); // ajo, vinagre hirviendo
m.golpe(Cu + 3.0, 0.3, 80); m.sube(barraCu + 0.1, 1.2, 52, 66, 0.06); m.golpe(barraCu + 1.4, 0.3, 70);
for (let i = 0; i < 5; i++) m.tic(Al + 0.4 + i * 0.4, 0.07, 1100);                    // brochazos
m.nota(Al + 2.9, 69, 0.07, 0.8); m.nota(Al + 3.0, 76, 0.06, 0.8);                      // palomita
m.golpe(Ci + 0.9, 0.3, 100); m.nota(Ci + 0.9, 64, 0.06, 1.0);                         // sello "sin plomo"
m.nota(Ci + 0.2, 81, 0.04, 0.5); m.nota(Ci + 2.6, 81, 0.04, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
