// gen-audio.mjs — cama grave + efectos del Shot IA #47 (IA en la Olimpiada Internacional de Matemáticas 2025). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Olimpiada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, Ex = K.Examen, Ge = K.Gemini, Op = K.OpenAI, P = K.Pregunta, H = K.Humanos, A = K.Antes, Mx = K.Mexico, S = K.Seis, Ma = K.Matiz, C = K.Cierre, Ou = K.Outro;

m.pad(0, C + 2.2, 0.05, [43, 50, 55], 0.35);                                       // examen: tensa (tapada)
m.pad(C + 2.2, Ou + 3.5, 0.05, [43, 50, 57]);                                       // se abre cuando "tú" toma el problema seis
for (let i = 0; i < 18; i++) m.tic(G + 0.1 + i * 0.24, 0.05, 2600);                 // lápiz que escribe
m.golpe(G + 1.0, 0.35, 70);                                                         // VS
m.whoosh(G + 4.5, 0.5, 0.12);
for (let i = 0; i < 40; i++) m.tic(G + 6.4 + i * 0.07, 0.04, 1700 + (i % 4) * 150); // 558 puntos que se apagan
for (let i = 0; i < 6; i++) m.nota(G + 8.6 + i * 0.12, 72 + (i % 3) * 4, 0.04, 0.4); // brillan los 72 de oro
m.whoosh(Ex, 0.5, 0.12); m.burbuja(Ex + 0.7, 0.2, 420);                              // pin en Australia
for (let i = 0; i < 6; i++) m.tic(Ex + 1.6 + i * 0.18, 0.12, 1500);                  // seis hojas
for (let i = 0; i < 10; i++) m.tic(Ex + 3.1 + i * 0.22, 0.08, 1100);                 // reloj
m.whoosh(Ge, 0.5, 0.12);
for (let i = 0; i < 5; i++) m.nota(Ge + 1.0 + i * 0.6, 67 + i * 2, 0.07, 0.5);       // cinco palomitas
m.golpe(Ge + 4.2, 0.4, 55);                                                         // P6 en blanco
m.golpe(Ge + 6.3, 0.5, 80);                                                         // sello oficial
m.whoosh(Op, 0.5, 0.12);
for (let k = 0; k < 3; k++) m.burbuja(Op + 1.6 + k * 0.25, 0.15, 600); // jueces
m.golpe(Op + 3.2, 0.35, 90);                                                        // "no oficial"
m.sube(P + 0.05, 1.1, 50, 62, 0.05);
for (let i = 0; i < 8; i++) m.nota(H + 0.2 + i * 0.07, 76 + (i % 4) * 2, 0.035, 0.35); // 72 oros
m.sube(H + 1.8, 0.9, 55, 70, 0.04);                                                 // 26 suben
m.whoosh(A, 0.5, 0.12); m.golpe(A + 0.2, 0.3, 80);
m.zumbido(A + 0.6, 2.4, 0.03, 220);                                                 // reloj de 3 días
for (let i = 0; i < 12; i++) m.tic(A + 3.5 + i * 0.09, 0.06, 2200);                 // código Lean
m.whoosh(Mx, 0.5, 0.12);
for (let i = 0; i < 6; i++) m.nota(Mx + 0.4 + i * 0.15, i < 2 ? 79 : 74, 0.05, 0.4); // 2 platas, 4 bronces
m.whoosh(S, 0.6, 0.12);
for (let i = 0; i < 22; i++) m.tic(S + 0.3 + i * 0.095, 0.06, 1300 + (i % 5) * 100); // mosaicos
m.golpe(S + 1.0, 0.35, 55);                                                         // IA: 0
m.nota(S + 2.8, 72, 0.06, 0.6);
m.cruje(Ma + 0.6, 0.3);                                                             // abre la puerta
m.cruje(Ma + 2.2, 0.3);
m.whoosh(C, 0.5, 0.12);
m.nota(C + 2.2, 67, 0.06, 1.0); m.nota(C + 2.25, 71, 0.05, 1.0); m.nota(C + 2.3, 74, 0.05, 1.0); // brilla el problema seis
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
