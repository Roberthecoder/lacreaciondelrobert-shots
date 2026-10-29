// gen-audio.mjs — cama grave + efectos del Shot Químico #19 (la sal y el hervor). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hervir base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K;
const G = K.Gancho, Q = K.Que, I = K.Iones, Cu = K.Cuenta, O = K.Olla, P = K.Pregunta, B = K.Burbujas, E = K.Estudio, A = K.Altura, Ci = K.Cierre, Ou = K.Outro;
const avisa = B + 5.0;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 18; i++) m.tic(G + 0.15 + i * 0.07, 0.06, 3000 + (i % 5) * 300);   // granitos que caen
for (let i = 0; i < 10; i++) m.burbuja(G + 1.2 + i * 0.2, 0.05, 600);                    // agua caliente
m.golpe(G + 1.0, 0.3, 90); m.tic(G + 2.0, 0.15, 2000);                                  // número gigante · termómetro
m.golpe(G + 6.3, 0.25, 80);                                                              // mito tachado
for (let i = 0; i < 6; i++) m.burbuja(Q + 0.5 + i * 0.5, 0.06, 900);                     // moléculas que escapan
m.nota(Q + 2.8, 64, 0.06, 0.8);                                                          // el "="
m.whoosh(I + 0.6, 2.2, 0.08);                                                            // el cristal se desarma
for (let i = 0; i < 8; i++) m.tic(I + 0.8 + i * 0.25, 0.05, 1600);
m.sube(I + 3.0, 1.4, 64, 57, 0.04);                                                      // menos vapor
m.golpe(Cu + 0.2, 0.3, 85); m.tic(Cu + 3.2, 0.15, 2000);
for (let i = 0; i < 5; i++) m.tic(O + 1.6 + i * 0.2, 0.12, 2200 + i * 150);              // 100.01 … 100.05
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 20; i++) m.burbuja(P + 0.4 + i * 0.07, 0.07, 700 + (i % 5) * 120);   // fsssh
for (let i = 0; i < 26; i++) m.burbuja(B + 0.4 + i * 0.18, 0.06, 550 + (i % 6) * 80);    // nucleación
m.whoosh(avisa + 0.4, 1.0, 0.12);
for (let i = 0; i < 8; i++) m.gota(avisa + 0.6 + (i % 4) * 0.25, 0.12, 900);              // salpica
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 10; i++) m.burbuja(E + 3.0 + i * 0.3, 0.04, 650);
m.golpe(E + 4.6, 0.3, 90);
m.whoosh(A + 0.3, 1.2, 0.08); m.nota(A + 1.6, 69, 0.06, 0.8); m.nota(A + 2.6, 64, 0.06, 0.8);
for (let i = 0; i < 12; i++) m.burbuja(Ci + 0.3 + i * 0.15, 0.06, 700);
m.golpe(Ci + 0.9, 0.2, 80);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
