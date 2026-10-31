// gen-audio.mjs — cama grave + efectos del Shot Químico #03 (cloro + vinagre). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cloro base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 33);
const K = m.K;
const G = K.Gancho, Cl = K.Cloro, A = K.Acido, Am = K.Amoniaco, P = K.Pulmon, E = K.Efecto, Pr = K.Pregunta, Es = K.Estudio, Ca = K.Casa, En = K.Encuesta, Gu = K.Guerra, Ay = K.Ayuda, Ci = K.Cierre, Ou = K.Outro;
const mitad = (Es + Ca) / 2 - 0.4;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.golpe(G + 0.05, 0.35, 70);                                                    // "¿Por qué NO?"
m.whoosh(G + 0.1, 3.2, 0.08);                                                    // chorros
for (let i = 0; i < 16; i++) m.burbuja(G + 1.3 + i * 0.2, 0.08, 400 + (i % 5) * 60); // burbujeo
m.zumbido(G + 1.6, 3.2, 0.03, 160);                                              // siseo del gas
m.whoosh(Cl + 0.6, 0.6, 0.1); m.nota(Cl + 1.0, 69, 0.05, 0.6);                   // se abre la lupa
for (let i = 0; i < 8; i += 2) m.sube(A + 0.8 + i * 0.35, 1.2, 57, 69, 0.03);    // Cl2 que sube
for (let i = 0; i < 12; i++) m.burbuja(A + 1.0 + i * 0.28, 0.08, 500);
m.whoosh(Am + 0.2, 2.2, 0.08);
for (let i = 0; i < 3; i++) m.nota(Am + 1.2 + i * 0.3, 64 + i * 3, 0.05, 0.5);
for (let i = 0; i < 7; i++) m.tic(P + 2.2 + i * 0.35, 0.05, 2200);              // reacciones en la pared
m.pad(P + 3, Pr, 0.025, [40, 46], 0.5);                                         // ahogado
m.golpe(E + 0.1, 0.4, 110); m.golpe(E + 0.9, 0.35, 120);                        // tos
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 30; i++) m.tic(mitad + 0.2 + i * 0.05, 0.04, 1800 + (i % 6) * 120);
m.nota(mitad + 1.8, 76, 0.07, 1.0);
for (let i = 0; i < 85; i += 3) m.tic(Ca + 0.2 + i * 0.018, 0.04, 2400);
for (let i = 0; i < 35; i++) m.tic(En + 1.2 + i * 0.06, 0.05, 2800);
m.nota(En + 3.4, 64, 0.06, 0.8);
m.pad(Gu, Ay, 0.03, [38, 45], 0.6); m.motor(Gu + 0.3, 4, 0.04);                 // la nube avanza
m.metal(Ay + 0.3, 0.12, 500); m.whoosh(Ay + 0.5, 1.5, 0.08);                    // puerta y salida
m.sube(Ay + 2.0, 1.0, 57, 72, 0.04);
m.whoosh(Ci + 0.1, 2.4, 0.06); m.nota(Ci + 1.0, 72, 0.07, 0.8); m.nota(Ci + 1.8, 69, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
