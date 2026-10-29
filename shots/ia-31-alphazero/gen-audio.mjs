// gen-audio.mjs — cama grave + efectos del Shot IA #31 (AlphaZero). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot AlphaZero base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const G = K.Gancho, R = K.Reglas, A = K.Autojuego, H = K.Horas, P = K.Pregunta, M = K.Medidor, D = K.Duelo, Ap = K.Aperturas, Ch = K.Chips, C = K.Cierre, Ou = K.Outro;
const mMid = M + (D - M) * 0.58;
const madera = (t, g = 0.22) => { m.tic(t, g, 900); m.golpe(t, g * 0.5, 160); };      // pieza que se apoya en el tablero

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let t = 0.2; t < Ou; t += 1.0) m.tic(t, 0.025, 1200);                             // pulso suave de reloj de ajedrez
madera(G + 0.55); madera(G + 1.8);                                                     // e4, e5
m.nota(G + 0.5, 69, 0.05, 0.4); m.nota(G + 1.3, 57, 0.05, 0.4);                        // los dos chips
m.golpe(G + 4.1, 0.5, 70); m.whoosh(G + 4.0, 0.4, 0.1);                                // cae el rey
m.whoosh(R, 0.5, 0.12); m.cruje(R + 1.8, 0.3);                                         // tacha "partidas humanas"
m.nota(R + 2.4, 72, 0.05, 0.5);
for (let i = 0; i < 6; i++) madera(R + 3.0 + i * 0.55, 0.14);                          // piezas al azar
m.whoosh(A, 0.5, 0.12); m.sube(A + 0.3, 2.4, 48, 72, 0.035);                          // contador de partidas
for (let i = 0; i < 16; i++) m.tic(A + 0.8 + i * 0.16, 0.06, 1800 + (i % 4) * 150);   // mini tableros
for (let i = 0; i < 16; i++) m.nota(A + 1.4 + i * 0.16, (i * 7) % 5 === 0 ? 57 : 76, 0.025, 0.2);  // ✔ / ✗
m.whoosh(H, 0.5, 0.12); m.sube(H + 0.3, 3.5, 50, 69, 0.03);                           // curva que sube
m.nota(H + 2.0, 76, 0.07, 0.8); m.nota(H + 2.05, 81, 0.05, 0.8);                       // cruza a Stockfish
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(M + 0.4, mMid - M - 0.4, 0.03, 160);                                          // árbol de Stockfish
m.nota(M + 3.7, 64, 0.06, 0.6); m.nota(M + 4.2, 67, 0.06, 0.6); m.nota(M + 4.7, 72, 0.06, 0.8);  // pocas ramas de AlphaZero
m.nota(mMid + 0.6, 76, 0.05, 0.5); m.nota(mMid + 0.9, 79, 0.05, 0.5); m.nota(mMid + 1.2, 84, 0.05, 0.7); // la red señala 3 ramas
m.golpe(D + 0.2, 0.35, 80);
for (let i = 0; i < 26; i++) m.tic(D + 2.6 + i * 0.11, 0.05, 2600);                    // 155 ganadas (verde agudo)
m.golpe(D + 4.6, 0.2, 60);                                                              // 6 perdidas (rojo grave)
for (let i = 0; i < 12; i++) m.tic(D + 4.8 + i * 0.07, 0.03, 1300);                    // empates (gris)
madera(Ap + 1.1, 0.18); madera(Ap + 1.9, 0.18); madera(Ap + 2.7, 0.18);                 // 1. d4 d5 2. c4
m.nota(Ap + 3.0, 72, 0.06, 0.6); m.nota(Ap + 3.05, 76, 0.05, 0.6);                     // "¡como los humanos!"
m.motor(Ch + 0.2, 2.8, 0.05); m.sube(Ch + 0.3, 1.2, 50, 67, 0.04);                     // servidores que se encienden
m.whoosh(C, 0.5, 0.12); m.gota(C + 1.1, 0.2, 1200); m.nota(C + 1.1, 81, 0.05, 0.8);     // la lupa encuentra la casilla
m.sube(C + 1.6, 0.8, 62, 45, 0.04);                                                     // se apaga el servidor
m.nota(C + 2.2, 72, 0.06, 0.8); m.nota(C + 2.25, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
