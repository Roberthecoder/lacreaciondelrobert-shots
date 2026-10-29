// gen-audio.mjs — cama grave + efectos del Shot Químico #26 (compresa fría instantánea). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Compresa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 26);
const K = m.K;
const G = K.Gancho, Ad = K.Adentro, Ap = K.Aprieta, Cr = K.Cristal, Ro = K.Robo, Pr = K.Pregunta, De = K.Desorden, Te = K.Termometro, Es = K.Estudio, Ur = K.Urea, Ci = K.Cierre, Ou = K.Outro;
const segB = Es + 8.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.cruje(G + 0.15, 0.5);                                                              // apretón de la bolsa
m.golpe(G + 1.5, 0.25, 90);                                                          // se tacha "fabrica frío"
m.whoosh(G + 1.9, 1.2, 0.08);                                                        // el calor sube
m.whoosh(Ad + 0.3, 0.5, 0.1);                                                        // abre la lupa
m.tic(Ad + 2.4, 0.2, 1600); m.tic(Ad + 3.8, 0.2, 1900);                              // etiquetas
m.cruje(Ap + 0.6, 0.35); m.golpe(Ap + 0.9, 0.35, 110);                               // ¡pop! de la bolsita
for (let i = 0; i < 18; i++) m.burbuja(Ap + 1.2 + i * 0.12, 0.06, 500 + (i % 5) * 70); // el agua inunda los gránulos
for (let i = 0; i < 10; i++) m.nota(Cr + 0.6 + i * 0.42, 69 - i, 0.04, 0.5);         // cada ion que se suelta (baja: se lleva energía)
m.tic(Cr + 2.6, 0.2, 1200); m.tic(Cr + 3.4, 0.2, 1500);                              // barras de energía
m.whoosh(Ro + 0.3, 1.4, 0.09);                                                       // calor que viaja
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.metal(De + 2.0, 0.12, 600);                                                        // la balanza se inclina
m.golpe(Te + 0.4, 0.25, 90);
m.sube(Te + 2.0, 3.6, 64, 52, 0.05);                                                 // el termómetro baja
for (let i = 0; i < 8; i++) m.gota(Te + 3.0 + i * 0.3, 0.1, 1100);                   // gotitas por fuera del vaso
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 5; i++) m.tic(Es + 3.6 + i * 0.25, 0.18, 1300);                  // cinco personas
m.golpe(Es + 6.2, 0.2, 70); m.golpe(Es + 7.2, 0.2, 70);
m.whoosh(segB + 0.6, 1.0, 0.1); m.metal(segB + 1.6, 0.2, 500);                       // a la basura
m.nota(segB + 1.7, 72, 0.06, 0.5);
m.burbuja(Ur + 0.3, 0.12, 500); m.nota(Ur + 2.4, 76, 0.06, 0.5);                     // urea = orina
m.whoosh(Ci + 0.3, 1.5, 0.08);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
