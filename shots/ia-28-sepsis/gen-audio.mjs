// gen-audio.mjs — cama grave + efectos del Shot IA #28 (la IA de sepsis que no vio 2 de cada 3 casos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sepsis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 28);
const K = m.K;
const G = K.Gancho, S = K.Sepsis, E = K.Estudio, C = K.Calificacion, P = K.Pregunta, A = K.Alertas, Ta = K.Tarde, Co = K.Contraste, L = K.Leccion, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
for (let i = 0; i < 4; i++) m.nota(G + 0.4 + i * 0.9, 81, 0.035, 0.25);           // bip del monitor
m.golpe(G + 3.7, 0.3, 80); m.tic(G + 3.95, 0.12, 1600); m.tic(G + 4.2, 0.12, 1600); // aparecen los tres pacientes
m.golpe(G + 4.7, 0.5, 60);                                                          // "2 de 3"
m.whoosh(S - 0.3, 0.6, 0.14);
for (let i = 0; i < 6; i++) m.burbuja(S + 0.3 + i * 0.15, 0.08, 420 + i * 40);     // bacterias
for (let i = 0; i < 14; i++) m.gota(S + 1.4 + i * 0.14, 0.06, 700 + (i % 4) * 90);   // glóbulos que se desbordan
for (let i = 0; i < 4; i++) m.latido(S + 3.0 + i * 0.45, 0.2);                       // órganos que se dañan
m.nota(S + 4.6, 67, 0.05, 0.6);
m.whoosh(E - 0.3, 0.6, 0.12); m.golpe(E + 0.5, 0.35, 80);
m.sube(E + 2.2, 1.8, 50, 74, 0.04);                                                 // contador 38,455
for (let i = 0; i < 12; i++) m.tic(E + 2.2 + i * 0.12, 0.06, 1800);
m.whoosh(C - 0.3, 0.5, 0.12); m.sube(C + 0.6, 1.2, 50, 58, 0.05); m.golpe(C + 1.8, 0.3, 70); // aguja a 0.63
m.nota(C + 3.6, 72, 0.05, 0.5); m.nota(C + 3.65, 76, 0.04, 0.5);                    // banda del fabricante
m.sube(P + 0.05, 1.4, 50, 62, 0.05); m.metal(P + 0.2, 0.08, 900); m.metal(P + 0.5, 0.06, 1100);
for (let i = 0; i < 18; i++) m.nota(A + 0.9 + i * 0.095, 81 + (i % 3) * 2, 0.03, 0.15); // 18 alarmas encimadas
m.zumbido(A + 2.6, 2.5, 0.03, 260);                                                  // fatiga
m.whoosh(Ta - 0.3, 0.5, 0.12);
for (let i = 0; i < 7; i++) m.nota(Ta + 0.9 + i * 0.19, 76, 0.05, 0.4);             // 7 estrellas
m.whoosh(Co - 0.3, 0.6, 0.12); m.golpe(Co + 0.3, 0.35, 80);
for (let i = 0; i < 6; i++) m.tic(Co + 2.2 + i * 0.25, 0.1, 1200);                   // reloj
m.nota(Co + 3.8, 72, 0.06, 0.6); m.nota(Co + 3.85, 79, 0.05, 0.6);                   // palomita del médico
m.sube(Co + 4.6, 1.0, 62, 50, 0.04);                                                 // flecha hacia abajo
m.golpe(Co + 6.6, 0.45, 60);                                                         // sello "estudio de sus creadores"
m.whoosh(L - 0.3, 0.5, 0.12); m.whoosh(L + 0.8, 1.4, 0.06); m.golpe(L + 2.4, 0.45, 70); // lupa y sello
m.whoosh(Ci - 0.3, 0.6, 0.12);
for (let i = 0; i < 3; i++) m.nota(Ci + 0.4 + i * 0.9, 81, 0.035, 0.25);
m.golpe(Ci + 1.4, 0.4, 60); m.nota(Ci + 1.45, 62, 0.05, 0.8);                        // los dos que faltaban
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
