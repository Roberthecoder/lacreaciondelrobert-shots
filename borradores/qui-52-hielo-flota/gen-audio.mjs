// gen-audio.mjs — cama grave + efectos del Shot Químico #52 (por qué flota el hielo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hielo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
const G = K.Gancho, Ra = K.Raro, Li = K.Liquido, He = K.Hexagonos, Nu = K.Numero, Pr = K.Pregunta, La = K.Lago, Ga = K.Galileo, Tu = K.Tuberias, Cu = K.Curioso, Ci = K.Cierre, Ou = K.Outro;
const mitadLa = La + 2.4;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                               // cama fría y grave
m.whoosh(G, 0.32, 0.12); m.gota(G + 0.32, 0.3, 500);                                    // cae el cubo y salpica
for (let i = 0; i < 6; i++) m.gota(G + 0.4 + i * 0.08, 0.1, 900 + i * 120);
m.burbuja(G + 0.9, 0.12, 300); m.metal(G + 0.35, 0.12, 1400);                          // tintineo del hielo en el vidrio
m.golpe(G + 2.0, 0.2, 110);                                                              // se tacha "¿agua apretada?"
m.golpe(Ra + 1.5, 0.25, 70);                                                             // el sólido toca el fondo
m.sube(Ra + 2.6, 1.0, 55, 67, 0.05); m.burbuja(Ra + 3.5, 0.12, 600);                    // el hielo sube
m.whoosh(Li + 0.1, 0.6, 0.1);                                                            // la lupa entra
for (let i = 0; i < 18; i++) m.tic(Li + 2.2 + i * 0.22, 0.05, 2000 + (i % 5) * 300);    // puentes que se forman y se rompen
for (let i = 0; i < 12; i++) m.nota(He + 0.4 + i * 0.18, m.ESC[(i * 3) % 10] + 12, 0.04, 0.6); // cristalitos: se arma el panal
m.nota(He + 2.8, 81, 0.05, 1.4); m.nota(He + 2.8, 88, 0.04, 1.4);                     // brillan los huecos
m.sube(Nu + 0.5, 1.5, 52, 59, 0.05); m.golpe(Nu + 1.6, 0.3, 90);                       // la caja crece · +9 %
m.sube(Pr + 0.3, 1.4, 60, 48, 0.06); m.golpe(Pr + 1.6, 0.3, 60);                       // ¿y si se hundiera? (baja al fondo)
m.cruje(La + 0.4, 0.5); m.golpe(La + 1.0, 0.3, 70);                                     // lago congelado entero ✗
m.pad(mitadLa, Ga, 0.03, [55, 62], 0);                                                    // agua libre abajo
for (let i = 0; i < 8; i++) m.burbuja(mitadLa + 0.5 + i * 0.5, 0.08, 400 + (i % 3) * 120); // peces y burbujitas
m.golpe(Ga + 0.2, 0.35, 80); m.golpe(Ga + 2.2, 0.2, 110);                              // tarjeta · mito tachado
m.whoosh(Ga + 3.0, 1.0, 0.1); m.golpe(Ga + 4.0, 0.25, 60);                             // la mano lo hunde al fondo
m.sube(Ga + 4.5, 1.1, 50, 64, 0.06); m.burbuja(Ga + 5.5, 0.15, 500); m.nota(Ga + 5.6, 76, 0.06, 0.9); // ¡sube solo!
for (let i = 0; i < 8; i++) m.nota(Tu + 0.2 + i * 0.2, 69 + i, 0.03, 0.4);            // el hielo crece en el tubo
m.cruje(Tu + 2.2, 0.9); m.golpe(Tu + 2.2, 0.4, 70); for (let i = 0; i < 6; i++) m.gota(Tu + 2.4 + i * 0.15, 0.12, 800); // ¡crac! y chorro
m.tic(Cu + 0.4, 0.15, 1800); m.sube(Cu + 1.3, 1.3, 62, 48, 0.06); m.golpe(Cu + 2.6, 0.3, 55); // el cubo de D₂O se hunde
m.metal(Ci + 0.2, 0.1, 1400); for (let i = 0; i < 6; i++) m.nota(Ci + 0.4 + i * 0.15, m.ESC[i + 4], 0.04, 0.7); // aparecen los huecos
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
