// gen-audio.mjs — cama grave + efectos del Shot Ambiental #48 (ballena gris). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ballena Gris base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
const G = K.Gancho, A = K.Artico, Co = K.Comida, V = K.Viaje, L = K.Lagunas, P = K.Pregunta, Va = K.Varadas, Cr = K.Crias, Po = K.Poblacion, M = K.Misterio, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                                  // océano profundo
for (let i = 0; i < 10; i++) m.tic(G + 0.2 + i * 0.5, 0.05, 1300);                       // la ruta se dibuja
m.sube(G + 0.8, 4, 52, 64, 0.04);                                                         // los km suben
m.nota(G + 0.3, 45, 0.05, 2.5);                                                           // canto grave de ballena
m.whoosh(A + 0.1, 0.8, 0.12); m.cruje(A + 0.4, 0.4);                                     // zoom al hielo
for (let i = 0; i < 6; i++) m.tic(A + 1.0 + i * 0.15, 0.05, 2200);                        // aparecen los anfípodos
m.whoosh(Co + 0.2, 1.0, 0.1); for (let i = 0; i < 10; i++) m.burbuja(Co + 0.6 + i * 0.25, 0.06, 300 + i * 20);  // lodo
m.golpe(Co + 2.0, 0.25, 120); for (let i = 0; i < 4; i++) m.tic(Co + 3.2 + i * 0.3, 0.06, 2600);              // lupa y barbas
m.whoosh(V + 0.1, 2.6, 0.08);                                                             // baja por la costa
for (let i = 0; i < 3; i++) m.nota(L + 0.6 + i * 0.7, 64 + i * 3, 0.06, 0.8);             // se encienden las lagunas
m.nota(L + 2.8, 47, 0.06, 1.8);                                                           // madre y cría
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 24; i++) m.gota(Va + 0.4 + i * 0.11, 0.06, 500 + (i % 4) * 60);       // puntos de varamiento
m.golpe(Va + 3.2, 0.35, 60); m.sube(Va + 3.4, 1.6, 57, 48, 0.05);
for (let i = 0; i < 12; i++) m.tic(Cr + 0.5 + i * 0.42, 0.05, 1800);                      // crías que pasan el faro
m.golpe(Cr + 4.0, 0.3, 70);
m.sube(Po + 1.6, 1.6, 60, 45, 0.06);                                                      // la población baja
m.sube(M + 0.3, 1.9, 45, 57, 0.05); m.nota(M + 2.6, 62, 0.05, 2.4); m.nota(M + 2.6, 66, 0.04, 2.4);  // sube… ¿por qué?
m.nota(C + 0.8, 57, 0.05, 2.0); for (let i = 0; i < 6; i++) m.tic(C + 0.8 + i * 0.2, 0.04, 2200);    // vuelve la comida
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
