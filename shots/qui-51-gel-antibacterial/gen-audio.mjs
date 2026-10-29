// gen-audio.mjs — cama grave + efectos del Shot Químico #51 (gel antibacterial y alcohol). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gel base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 51);
const K = m.K;
const G = K.Gancho, Q = K.Que, P = K.Proteinas, A = K.Agua, F = K.Frotar, Pr = K.Pregunta, N = K.No, E = K.Estudio, Gr = K.Grasa, M = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.9, 0.05, [45, 52, 57]);
m.tic(G + 0.05, 0.2, 900); m.tic(G + 0.6, 0.15, 1100);                                // dosificador (baja y sube)
m.gota(G + 0.7, 0.3, 500); m.burbuja(G + 0.72, 0.12, 300);                            // plop del gel en la palma
m.tic(Q + 0.5, 0.1, 1800);                                                            // aparece el etanol
m.sube(Q + 1.8, 1.6, 52, 64, 0.06); m.nota(Q + 2.8, 69, 0.07, 0.9);                    // el medidor sube a 60 %
m.whoosh(P - 0.4, 1.2, 0.18);                                                         // entra a la palma
for (let i = 0; i < 8; i++) m.tic(P + 2.0 + i * 0.12, 0.08, 1400 + i * 60);           // llegan los alcoholes
for (let i = 0; i < 3; i++) m.sube(P + 1.8 + i * 0.35, 1.0, 64 + i * 3, 52 + i * 3, 0.04); // los listones se despliegan
for (let i = 0; i < 6; i++) m.gota(A + 1.4 + i * 0.35, 0.12, 1000 + (i % 3) * 120);    // el agua
for (let i = 0; i < 10; i++) m.tic(A + 1.0 + i * 0.5, 0.05, 900);                      // reloj lento
for (let i = 0; i < 14; i++) m.tic(A + 1.4 + i * 0.14, 0.05, 2200);                    // reloj rápido
m.nota(A + 3.8, 64, 0.05, 0.7); m.nota(A + 4.0, 69, 0.05, 0.7);                        // franja 60–90 %
for (let i = 0; i < 20; i++) m.tic(F + 0.3 + i * 0.13, 0.05, 700 + (i % 2) * 200);      // frotado + conteo a 20
m.whoosh(F + 0.4, 2.6, 0.06);
m.sube(Pr + 0.1, 1.2, 52, 64, 0.05);
for (const t of [1.2, 1.6, 2.1, 2.5, 2.9, 3.3]) m.golpe(N + t + 0.55, 0.22, 140);      // el alcohol rebota
m.gota(N + 4.4, 0.2, 900); m.gota(N + 4.7, 0.2, 950); m.nota(N + 4.9, 72, 0.06, 0.6);  // agua y jabón
m.golpe(E + 0.2, 0.35, 80);                                                           // tarjeta del estudio
for (let i = 0; i < 10; i++) m.tic(E + 3.2 + i * 0.06, 0.08, 1600);                   // 10 dedos
m.nota(E + 5.6, 57, 0.06, 0.5, 0.6); m.sube(E + 7.0, 0.8, 57, 69, 0.05); m.sube(E + 7.7, 0.8, 57, 67, 0.05); // barras
for (let i = 0; i < 6; i++) m.burbuja(Gr + 0.4 + i * 0.12, 0.08, 500);                // gotitas sobre la grasa
m.golpe(Gr + 1.2, 0.25, 110);
for (let i = 0; i < 5; i++) m.tic(M + 0.6 + i * 0.35, 0.08, 1200);                    // botellas
m.metal(M + 1.4, 0.12, 600);                                                          // la frontera
for (let i = 0; i < 3; i++) m.nota(M + 4.0 + i * 0.25, 76 - i * 4, 0.05, 0.4);        // alerta del metanol
m.sube(M + 5.8, 1.0, 52, 60, 0.05);                                                   // barra: más de la mitad
for (let i = 0; i < 4; i++) m.nota(C + 0.6 + i * 0.25, [69, 72, 76, 79][i], 0.04, 0.5); // brillitos de la mano limpia
m.gota(C + 2.7, 0.15, 950);
m.nota(Ou + 0.3, 57, 0.08, 3.2); m.nota(Ou + 0.3, 64, 0.06, 3.2); m.nota(Ou + 0.3, 69, 0.05, 3.2);
m.guardar(OUT, 1);
