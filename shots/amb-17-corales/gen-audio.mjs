// gen-audio.mjs — cama grave + efectos del Shot Ambiental #17 (corales y blanqueamiento). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Corales base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 117);
const K = m.K;
const G = K.Gancho, Po = K.Polipos, E = K.Esqueleto, A = K.Algas, Co = K.Comida, P = K.Pregunta, Ca = K.Calor, H = K.Hambre, M = K.Mundo, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ca, 0.05, [45, 52, 57]);                       // arrecife sano: cama tranquila
m.pad(Ca, Ou + 3.5, 0.05, [44, 51, 56], 0.5);            // con calor: más grave y tapada
for (let i = 0; i < 6; i++) m.burbuja(G + 0.1 + i * 0.35, 0.06, 420 + i * 30);   // burbujas y peces
m.tic(G + 1.1, 0.12, 1400); m.tic(G + 1.8, 0.12, 1400);                        // tachones: ¿roca? ¿planta?
m.nota(G + 2.2, 64, 0.07, 0.9);                                                 // ES UN ANIMAL
for (let i = 0; i < 12; i++) m.burbuja(Po + 0.25 + i * 0.12, 0.05, 600 + (i % 4) * 80);  // cada pólipo abre
m.golpe(E + 0.3, 0.3, 70); m.whoosh(E + 1.4, 0.5, 0.1); m.metal(E + 1.9, 0.08, 620);    // caliza y lupa
m.sube(A - 0.3, 1.0, 64, 52, 0.05);                                             // bajada al microscopio
for (let i = 0; i < 7; i++) m.nota(A + 0.2 + i * 0.2, 69 + (i % 3) * 3, 0.03, 0.5);    // aparece cada alga
for (let i = 0; i < 10; i++) m.gota(Co + 0.3 + i * 0.32, 0.06, 1100 + (i % 3) * 150);   // gotitas de azúcar
m.nota(Co + 0.3, 72, 0.05, 1.0);                                                // hasta 90 %
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                            // pregunta
m.sube(Ca + 0.2, 1.2, 50, 62, 0.06);                                            // termómetro sube
for (let i = 0; i < 7; i++) m.whoosh(Ca + 1.0 + i * 0.36, 0.35, 0.08);          // salen las algas
m.golpe(H + 0.3, 0.25, 90);
for (let i = 0; i < 6; i++) m.tic(H + 1.8 + i * 0.5, 0.05, 1000);              // la comida baja
m.cruje(H + 3.4, 0.25);                                                         // si sigue: muere
m.whoosh(M + 0.1, 0.7, 0.1);
for (let i = 0; i < 12; i++) m.tic(M + 0.8 + i * 0.23, 0.04, 1800);            // arrecifes que se blanquean
m.golpe(M + 0.8, 0.3, 60);
[57, 60, 64, 67].forEach((n, i) => m.nota(M + 5.4 + i * 0.35, n, 0.06, 0.7));   // una nota por evento global
m.whoosh(Mx + 0.1, 0.8, 0.1); m.sube(Mx + 0.3, 1.3, 52, 59, 0.04); m.golpe(Mx + 2.4, 0.3, 55);
m.sube(C - 0.3, 1.5, 57, 50, 0.05); for (let i = 0; i < 4; i++) m.burbuja(C + 0.5 + i * 0.4, 0.05, 400);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
