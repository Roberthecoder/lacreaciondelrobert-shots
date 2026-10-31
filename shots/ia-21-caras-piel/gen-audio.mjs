// gen-audio.mjs — cama grave + efectos del Shot IA #21 (reconocimiento facial y tono de piel). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot CarasPiel base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 21);
const K = m.K;
const G = K.Gancho, E = K.Estudio, N = K.Numeros, P = K.Pregunta, D = K.Datos, M = K.Mejora, Ni = K.Nist, W = K.Williams, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.zumbido(G + 0.15, 2.6, 0.03, 220);                                              // láser de los dos escaneos
m.nota(G + 1.75, 76, 0.06, 0.4); m.nota(G + 1.8, 81, 0.05, 0.4);                  // ✔ hombre
m.golpe(G + 2.8, 0.35, 70); m.nota(G + 2.8, 58, 0.06, 0.5);                       // ✘ en ti
m.tic(G + 3.8, 0.2, 1600); m.tic(G + 4.6, 0.15, 1300);                            // chips
m.whoosh(E, 0.5, 0.12); m.golpe(E + 0.2, 0.35, 80);                               // tarjeta 2018
for (let i = 0; i < 3; i++) m.tic(E + 2.2 + i * 0.2, 0.16, 1400 + i * 150);       // 3 programas
m.zumbido(E + 2.4, 3.6, 0.02, 180); m.tic(E + 3.6, 0.15, 1800);
m.whoosh(N, 0.5, 0.12); m.sube(N + 0.5, 0.6, 52, 55, 0.04);                       // 0.8 %
m.sube(N + 3.5, 1.2, 52, 76, 0.05); m.golpe(N + 4.7, 0.3, 65);                    // 34.7 %
m.sube(P + 0.05, 1.4, 50, 62, 0.05); m.burbuja(P + 0.6, 0.15, 450);               // ? y robotito
m.zumbido(D + 0.3, 6.0, 0.02, 160); m.tic(D + 0.2, 0.2, 1500);                    // circuito · hipótesis
for (let i = 0; i < 24; i++) m.tic(D + 2.7 + i * 0.07, 0.05, 2100 + (i % 4) * 140); // álbum IJB-A
for (let i = 0; i < 24; i++) m.tic(D + 3.9 + i * 0.07, 0.05, 1900 + (i % 4) * 140); // álbum Adience
m.whoosh(M, 0.5, 0.12);
[1.6, 1.9, 2.2].forEach((d, i) => m.sube(M + d, 1.2, 74 - i * 2, 55, 0.035));       // las barras bajan
m.nota(M + 3.4, 69, 0.06, 0.9); m.nota(M + 3.45, 72, 0.05, 0.9); m.nota(M + 3.5, 76, 0.05, 0.9); // acorde que se abre
m.whoosh(Ni, 0.5, 0.12); m.golpe(Ni + 0.2, 0.35, 80);                             // tarjeta 2019
m.golpe(Ni + 5.3, 0.3, 60); m.nota(Ni + 5.35, 57, 0.06, 0.5);                     // "= ✔" equivocado
m.sube(Ni + 6.6, 0.5, 50, 55, 0.04); m.sube(Ni + 7.6, 0.6, 52, 64, 0.04); m.sube(Ni + 8.6, 0.9, 55, 79, 0.05); // ×1 ×10 ×100
m.whoosh(W, 0.5, 0.1); m.tic(W + 0.3, 0.12, 900);                                 // cámara
m.whoosh(W + 1.0, 0.4, 0.1); m.golpe(W + 1.95, 0.55, 55);                          // licencia → sello COINCIDENCIA
for (let i = 0; i < 10; i++) m.tic(W + 2.6 + i * 0.3, 0.12, 700);                  // tic-tac de las 30 h
m.tic(W + 5.2, 0.15, 1500);
m.whoosh(C, 0.5, 0.12); m.zumbido(C + 0.1, 2.5, 0.03, 220);
m.nota(C + 1.7, 76, 0.05, 0.4); m.golpe(C + 2.7, 0.3, 70); m.nota(C + 2.7, 58, 0.05, 0.6);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
