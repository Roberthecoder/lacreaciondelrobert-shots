// gen-audio.mjs — cama grave + efectos del Shot IA #32 (Mata contra Avianca: casos inventados por ChatGPT). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Avianca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 32);
const K = m.K;
const G = K.Gancho, P1 = K.Paso1, P2 = K.Paso2, P3 = K.Paso3, Q = K.Pregunta, R = K.Respuesta, M = K.Multa, Co = K.Conteo, C = K.Cierre, Ou = K.Outro;
const G2 = G + 6.3, M2 = M + 7.1;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
for (let t = G + 0.2; t < Ou; t += 1.0) m.tic(t, 0.035, 1100);                    // tic-tac de "manual" muy bajito
for (let i = 0; i < 6; i++) { m.whoosh(G - 0.05 + i * 0.12, 0.25, 0.06); m.golpe(G + 0.75 + i * 0.32, 0.4, 62); } // caen los expedientes y los sellos "NO EXISTE"
m.burbuja(G + 1.4, 0.12, 600);                                                    // chip "hechos por ChatGPT"
m.whoosh(G2 - 0.6, 0.4, 0.12); m.nota(G2 - 0.3, 64, 0.06, 0.6);                    // título del manual
const paso = (t) => { m.golpe(t, 0.3, 90); m.nota(t + 0.05, 69, 0.05, 0.4); };
paso(P1 + 0.05); m.motor(P1 + 0.3, 2.7, 0.06);                                     // avión
m.burbuja(P1 + 1.6, 0.1, 700);
m.motor(P1 + 3.2, 1.2, 0.05); m.metal(P1 + 4.4, 0.35, 760); m.golpe(P1 + 4.4, 0.35, 70); // carrito → ¡tac!
paso(P2 + 0.05);
m.tic(P2 + 0.6, 0.2, 2600); for (let i = 0; i < 3; i++) m.burbuja(P2 + 1.5 + [0, 0.6, 1.1][i], 0.12, 520 + i * 60); // mensajes del chat
m.whoosh(P2 + 2.6, 0.4, 0.1); m.cruje(P2 + 3.6, 0.3);                              // la hoja arrancada
paso(P3 + 0.05); m.whoosh(P3 + 0.5, 0.4, 0.1); m.golpe(P3 + 2.3, 0.25, 110);       // escrito de Avianca · "No"
m.sube(Q + 0.05, 1.4, 50, 62, 0.05);                                              // re-gancho
m.tic(R + 0.4, 0.2, 2600); m.burbuja(R + 1.9, 0.14, 560);
m.nota(R + 2.4, 72, 0.06, 0.5); m.nota(R + 2.45, 76, 0.05, 0.5);                    // palomita
m.nota(R + 4.0, 58, 0.07, 0.7); m.nota(R + 4.05, 57, 0.06, 0.7);                    // se vuelve tache
paso(M + 0.05); m.golpe(M + 1.1, 0.3, 80);
m.whoosh(M + 2.6, 0.6, 0.08); m.golpe(M + 3.3, 0.6, 55); m.metal(M + 3.3, 0.12, 300); // mazo
m.sube(M + 5.2, 0.9, 52, 74, 0.05); m.tic(M + 6.1, 0.2, 3000);                     // $5,000
for (let i = 0; i < 6; i++) { m.whoosh(M2 + 0.6 + i * 0.42, 0.5, 0.07); m.tic(M2 + 1.2 + i * 0.42, 0.12, 1800 + i * 80); } // sobres a cada juez
for (let i = 0; i < 40; i++) m.tic(Co + 0.6 + i * 0.075, 0.05, 2000 + (i % 5) * 120); // expedientes que se llenan
m.sube(Co + 0.5, 3.0, 48, 72, 0.035);
for (let i = 0; i < 6; i++) m.golpe(C + 0.8 + 3.2 * ((i * 340 + 120) / 1240), 0.25, 70); // la lupa revela cada sello
m.nota(C + 2.6, 72, 0.06, 0.8); m.nota(C + 2.65, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
