// gen-audio.mjs — cama grave + efectos del Shot Ambiental #28 (la lluvia de la CDMX). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lluvia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 28);
const K = m.K;
const G = K.Gancho, Mi = K.Milimetro, D = K.Drenaje, Ta = K.Tandeo, P = K.Pregunta, Te = K.Techo, Pr = K.Programa, E = K.Estudio, Tr = K.Truco, U = K.Usos, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 20; i++) m.gota(G + 0.05 + i * 0.21, 0.08, 800 + (i % 4) * 110);       // lluvia que llena el metro cuadrado
m.sube(G + 0.1, 4.0, 43, 55, 0.04); m.nota(G + 4.2, 62, 0.06, 0.9);
for (let i = 0; i < 8; i++) m.burbuja(Mi + 0.5 + i * 0.12, 0.06, 420 + i * 30);           // la botella se vacía (glug)
m.whoosh(Mi + 1.6, 0.5, 0.1); m.golpe(Mi + 1.7, 0.2, 140);                                // la lupa
m.sube(Mi + 3.6, 2.0, 50, 67, 0.05); m.nota(Mi + 5.6, 67, 0.06, 0.8);                   // pluviómetro a 925 mm
for (let i = 0; i < 10; i++) m.gota(D + 0.2 + i * 0.3, 0.06, 950);                         // lluvia en la calle
m.whoosh(D + 1.0, 1.2, 0.12); for (let i = 0; i < 10; i++) m.burbuja(D + 2.2 + i * 0.25, 0.05, 260);   // coladera y drenaje
for (let i = 0; i < 14; i++) m.tic(Ta + 0.3 + i * 0.16, 0.05, 1500 + (i % 3) * 200);      // colonias que se encienden
m.gota(Ta + 1.0, 0.1, 900); m.gota(Ta + 1.8, 0.08, 900); m.golpe(Ta + 3.0, 0.2, 70);       // la llave se seca
m.sube(P + 0.05, 1.4, 52, 64, 0.05);                                                      // la gota suspendida
for (let i = 0; i < 10; i++) m.gota(Te + 0.2 + i * 0.2, 0.06, 700 + i * 30);               // el techo se llena
for (let i = 0; i < 14; i++) m.burbuja(Te + 0.6 + i * 0.25, 0.05, 380 + i * 15);           // tinacos
for (let i = 0; i < 24; i++) m.tic(Pr + 0.4 + i * 0.12, 0.05, 2000);                       // casitas con su sistema
m.nota(Pr + 2.7, 64, 0.05, 0.8); m.nota(Pr + 3.0, 69, 0.05, 0.8);
m.golpe(E + 0.2, 0.3, 90); m.whoosh(E + 2.9, 0.5, 0.1);                                   // tarjeta del estudio y mapa
for (let i = 0; i < 8; i++) m.tic(E + 3.4 + i * 0.1, 0.06, 1700);
m.nota(E + 4.6, 60, 0.05, 0.7); m.nota(E + 5.2, 67, 0.05, 0.9);
for (let i = 0; i < 8; i++) m.burbuja(Tr + 0.4 + i * 0.2, 0.05, 240);                      // agua sucia al separador
m.tic(Tr + 2.0, 0.2, 1200); m.whoosh(Tr + 2.1, 0.6, 0.08);                                // el flotador hace clic
for (let i = 0; i < 6; i++) m.gota(Tr + 2.4 + i * 0.4, 0.06, 1000);                        // agua limpia al tinaco
m.golpe(U + 0.1, 0.2, 60); m.nota(U + 1.2, 64, 0.05, 0.4); m.nota(U + 1.7, 67, 0.05, 0.4); m.nota(U + 2.2, 71, 0.05, 0.6);
for (let i = 0; i < 12; i++) m.gota(C + 0.2 + i * 0.3, 0.06, 800 + (i % 3) * 120);
m.sube(C + 1.0, 3.0, 50, 62, 0.04);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
