// gen-audio.mjs — cama grave + efectos del Shot Químico #45 (lápiz y diamante). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lapiz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 45);
const K = m.K;
const G = K.Gancho, Mi = K.Mina, Ca = K.Capas, De = K.Desliza, Di = K.Diamante, Du = K.Duro, Pr = K.Pregunta, Es = K.Estudio, Gr = K.Grafeno, Cu = K.Curioso, Ci = K.Cierre, Ou = K.Outro;
const mitadCu = Cu + 3.4;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 4.2, 0.05);                                                                // rasgueo del lápiz
for (let i = 0; i < 14; i++) m.tic(G + 0.1 + i * 0.3, 0.05, 3200);
m.golpe(G + 1.4, 0.25, 90);                                                            // tachón "plomo"
m.nota(G + 2.2, 81, 0.07, 1.0); m.nota(G + 2.35, 88, 0.05, 1.0);                       // destello del diamante
m.golpe(Mi + 1.1, 0.3, 120); m.metal(Mi + 1.12, 0.1, 600);                             // cae el Pb
m.golpe(Mi + 1.6, 0.25, 90); m.whoosh(Mi + 2.4, 0.8, 0.1);                             // tache y se va
for (let i = 0; i < 5; i++) m.tic(Ca + 0.6 + i * 0.75, 0.12, 1500 + i * 120);         // cada hoja que se apila
m.nota(Ca + 4.0, 69, 0.05, 0.8);
m.whoosh(De + 0.8, 2.2, 0.09);                                                         // baraja que se resbala
for (let i = 0; i < 8; i++) m.tic(De + 0.9 + i * 0.26, 0.05, 2600);
m.whoosh(De + 3.4, 1.8, 0.07); m.tic(De + 5.2, 0.15, 1200);                            // la hoja aterriza en el papel
m.nota(Di + 1.2, 64, 0.06, 0.8); for (let i = 0; i < 4; i++) m.nota(Di + 1.4 + i * 0.12, 72 + i * 2, 0.04, 0.5); // 4 vecinos
m.motor(Du + 0.2, 2.8, 0.1); m.cruje(Du + 0.5, 0.5);                                   // disco corta roca
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 20; i++) m.tic(Es + 1.0 + i * 0.28, 0.06 + i * 0.002, 900 + i * 40); // la cinta pega y despega
m.nota(Gr + 0.4, 69, 0.05, 1.2); m.metal(Gr + 2.4, 0.12, 1000);                       // medalla
for (let i = 0; i < 18; i++) m.tic(Cu + 0.5 + i * 0.1, 0.04, 2000 + i * 60);           // contador de capas
m.nota(mitadCu + 0.3, 76, 0.05, 0.9);
m.whoosh(Ci + 0.1, 1.0, 0.06); m.nota(Ci + 0.6, 81, 0.05, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
