// gen-audio.mjs — cama grave + efectos del Shot Químico #16 (ceviche: el limón no lo cuece). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ceviche base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 116);
const K = m.K;
const G = K.Gancho, Q = K.Que, A = K.Acido, B = K.Blanco, F = K.Fuego, P = K.Pregunta, L = K.Lima, C = K.Croacia, Fr = K.Francia, Co = K.Congelar, Ci = K.Cierre, Ou = K.Outro;
const lima0 = L + 2.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 3; i++) m.whoosh(G + i * 0.8, 0.4, 0.06);                              // exprimir el limón
for (let i = 0; i < 13; i++) m.gota(G + 0.1 + i * 0.22, 0.12, 950 + (i % 3) * 80);           // goteo de jugo
m.golpe(G + 2.6, 0.25, 90);                                                                 // se tacha "¿cocido?"
m.whoosh(Q - 0.3, 0.8, 0.1);                                                                // entramos al pescado
m.nota(Q + 0.6, 57, 0.05, 1.2); m.nota(Q + 1.4, 64, 0.05, 1.2);                             // la proteína enrollada
for (let i = 0; i < 12; i++) m.tic(A + 0.9 + i * 0.1, 0.07, 1600 + (i % 4) * 200);          // llegan los H⁺
for (let i = 0; i < 8; i++) m.nota(A + 1.8 + i * 0.35, 60 + i, 0.03, 0.4);                  // se desenrolla
m.sube(A + 1.6, 3.0, 50, 62, 0.04);
for (let i = 0; i < 4; i++) m.pop ? m.pop(B + 0.3 + i * 0.2, 0.1) : m.burbuja(B + 0.3 + i * 0.2, 0.08, 500); // grumitos
for (let i = 0; i < 7; i++) m.nota(B + 1.4 + i * 0.12, 76 + (i % 3) * 2, 0.025, 0.5);       // la luz rebota
m.whoosh(B + 3.0, 0.6, 0.08);
m.whoosh(F + 0.2, 2.6, 0.05);                                                                // chisporroteo de la llama
m.golpe(F + 2.6, 0.3, 80);
m.sube(P + 0.1, 1.3, 52, 64, 0.05);
m.golpe(L + 0.15, 0.35, 80);
for (let i = 0; i < 20; i++) m.tic(lima0 + i * 0.2, 0.06, 2200);                            // reloj en cámara rápida
for (let i = 0; i < 10; i++) m.gota(lima0 + i * 0.35, 0.1, 950);
m.golpe(C + 0.15, 0.35, 80);
for (let i = 0; i < 5; i++) m.nota(C + 2.8 + i * 0.7, 62 + (i % 2) * 3, 0.05, 0.5);        // pasan los días
m.golpe(Fr + 0.15, 0.35, 75);
for (let i = 0; i < 40; i++) m.tic(Fr + 2.6 + i * 0.05, 0.05, 1300 + (i % 5) * 150);       // las 40 larvas
m.pad(Fr + 2.6, Co, 0.02, [44, 51], 0.5);                                                   // tensión tapada
m.whoosh(Co + 0.4, 1.2, 0.07);
m.sube(Co + 0.6, 2.8, 64, 52, 0.04);                                                        // baja la temperatura
for (let i = 0; i < 7; i++) m.metal(Co + 2.0 + i * 0.34, 0.05, 1200);                      // 7 días
m.cruje(Co + 3.6, 0.35);                                                                    // se congela
for (let i = 0; i < 6; i++) m.gota(Ci + 0.2 + i * 0.25, 0.1, 950);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
