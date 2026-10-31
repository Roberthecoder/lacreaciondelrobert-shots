// gen-audio.mjs — cama grave + efectos del Shot IA #25 (el Turco de ajedrez y el Mechanical Turk). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Turco base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 25);
const K = m.K;
const G = K.Gancho, Tu = K.Turco, Pu = K.Puertas, A = K.Adentro, N = K.Napoleon, P = K.Pregunta, Am = K.Amazon, E = K.Etiquetas, Ce = K.Cerro, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
for (let t = 0.3; t < Am - 0.3; t += 0.5) m.tic(t, 0.05, 900 + ((t * 2) % 2) * 250);   // tic-tac de engranes mientras dura el "autómata"
m.tic(G + 0.5, 0.25, 700); m.tic(G + 1.2, 0.3, 650);                                   // la pieza se levanta y cae en el tablero
m.whoosh(G + 1.6, 0.5, 0.12); m.sube(G + 1.8, 0.8, 50, 62, 0.04);                      // se abre la lupa: alguien adentro
m.golpe(G + 1.6, 0.3, 70);                                                              // se tacha "robot"
m.whoosh(Tu, 0.5, 0.1); m.tic(Tu + 2.1, 0.25, 700); m.tic(Tu + 2.8, 0.3, 650);
m.cruje(Pu + 0.4, 0.4); m.zumbido(Pu + 0.6, 1.2, 0.03, 120);                           // las puertas rechinan
m.motor(Pu + 1.2, 3.2, 0.05);                                                           // engranes girando
m.whoosh(A, 0.6, 0.12);
m.metal(A + 2.4, 0.15, 900); m.metal(A + 3.0, 0.12, 1000);                             // imanes
m.sube(A + 4.2, 0.9, 48, 55, 0.04);                                                     // la palanca
m.golpe(N + 0.2, 0.35, 80);                                                             // 1809
m.tic(N + 3.4, 0.25, 600);                                                              // la jugada tramposa
m.whoosh(N + 4.6, 0.4, 0.2); for (let i = 0; i < 14; i++) m.tic(N + 4.8 + i * 0.06, 0.2, 500 + (i % 4) * 160); m.golpe(N + 5.0, 0.4, 65);
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(Am + 0.2, 8.6, 0.02, 180);                                                    // paso al circuito
for (let i = 0; i < 3; i++) m.burbuja(Am + 1.5 + i * 0.6, 0.15, 600 + i * 120);         // tareas que llegan
m.nota(Am + 6.5, 67, 0.06, 0.6); m.nota(Am + 6.55, 74, 0.05, 0.6);                      // el turbante en el letrero
for (let i = 0; i < 6; i++) m.tic(E + 1.4 + i * 0.35, 0.22, 1600 + (i % 2) * 400);      // cada etiqueta
m.nota(E + 3.6, 72, 0.05, 0.5);
for (let i = 0; i < 10; i++) m.tic(Ce + 1.2 + i * 0.12, 0.12, 400 + i * 20);            // la persiana baja
m.golpe(Ce + 2.4, 0.5, 60);
m.whoosh(C, 0.5, 0.1); m.sube(C + 1.6, 0.8, 50, 62, 0.04); m.golpe(C + 2.4, 0.25, 75);
m.nota(C + 2.8, 72, 0.06, 0.8); m.nota(C + 2.85, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
