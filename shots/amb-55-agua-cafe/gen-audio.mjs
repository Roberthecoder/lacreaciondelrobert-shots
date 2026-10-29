// gen-audio.mjs — cama grave + efectos del Shot Ambiental #55 (el agua detrás de tu taza de café). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Agua Cafe base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Gr = K.Granos, Ll = K.Lluvia, Ri = K.Riego, P = K.Pregunta, M = K.Mexico, Re = K.Rendimiento, E = K.Estudio, Go = K.Gotas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.5, 0.08);                                                          // vapor de la taza
for (let i = 0; i < 8; i++) m.burbuja(G + 0.6 + i * 0.3, 0.06, 300 + i * 30);           // el garrafón se llena (glug)
m.sube(G + 0.6, 2.4, 45, 57, 0.05); m.nota(G + 3.0, 69, 0.06, 0.9);
for (let i = 0; i < 9; i++) m.tic(Gr + 0.6 + i * 0.12, 0.08, 1300 + (i % 3) * 200);    // granos que caen en la taza
m.sube(Gr + 2.0, 2.0, 57, 64, 0.04);                                                    // la rama crece
for (let i = 0; i < 16; i++) m.gota(Ll + 0.3 + i * 0.25, 0.07, 850 + (i % 4) * 110);    // lluvia
m.whoosh(Ll + 1.5, 1.2, 0.06); m.sube(Ll + 0.6, 2.4, 45, 55, 0.04);                     // vapor de las hojas · se llena de verde
m.gota(Ri + 0.3, 0.12, 1200); m.tic(Ri + 0.8, 0.06, 2000);                              // el chorrito de riego
m.cruje(Ri + 2.4, 0.25); m.sube(Ri + 2.4, 1.4, 60, 52, 0.04);                           // el fertilizante escurre
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                                    // ¿?
m.nota(M + 0.2, 64, 0.06, 0.8); m.nota(M + 0.4, 67, 0.06, 0.8);                         // Chiapas y Veracruz
m.sube(M + 2.4, 0.6, 52, 57, 0.04); m.sube(M + 3.4, 0.8, 52, 62, 0.05); m.golpe(M + 4.2, 0.25, 70);
for (let i = 0; i < 8; i++) m.gota(Re + 0.3 + i * 0.3, 0.05, 900 + (i % 2) * 150);
m.golpe(Re + 1.6, 0.25, 110); m.golpe(Re + 2.4, 0.2, 140);                              // los costales
for (let k = 0; k < 12; k++) m.nota(E + 0.3 + k * 0.15, m.ESC[k % m.ESC.length], 0.035, 0.4); // la cuadrícula se colorea
m.golpe(E + 0.6, 0.2, 90);
m.gota(Go + 0.1, 0.12, 500); for (let i = 0; i < 20; i++) m.gota(Go + 0.2 + i * 0.1, 0.04, 1000 + (i % 5) * 120);  // mil gotas
for (let i = 0; i < 6; i++) m.gota(C + 0.5 + i * 0.3, 0.06, 850 + (i % 3) * 110);       // la nubecita final
m.nota(C + 1.2, 69, 0.05, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
