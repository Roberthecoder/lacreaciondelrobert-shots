// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #19 (goma xantana). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// El dato hecho sonido: mientras las cadenas están enredadas la cama suena tapada; al agitar (se alinean) se abre; quieto, se vuelve a tapar.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Xantana base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K;
const G = K.Gancho, E = K.Etiqueta, C = K.Col, Ta = K.Tanque, Al = K.Alcohol, P = K.Pregunta, Ca = K.Cadena, R = K.Red, Ag = K.Agitar, Es = K.Estudio, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const C2 = C + (Ta - C) * 0.53, A1 = Al + 1.7, A2 = Al + 3.6, AgQ = Ag + (Es - Ag) * 0.62, Es2 = Es + (D - Es) * 0.62;

// cama grave continua (sin golpe): tapada mientras la goma está espesa, abierta cuando corre
m.pad(0, R, 0.05, [43, 50, 55], 0.35);
m.pad(R, Ag + 0.3, 0.05, [43, 50, 55], 0.8);          // red enredada: tapada
m.pad(Ag + 0.3, AgQ, 0.05, [43, 50, 55, 62], 0);      // agitado: corre, se abre
m.pad(AgQ, Es, 0.05, [43, 50, 55], 0.8);              // quieto: se vuelve a tapar
m.pad(Es, Ou + 3.5, 0.05, [43, 50, 55], 0.3);

m.whoosh(G + 0.05, 0.5, 0.12); m.golpe(G + 0.7, 0.18, 70);                   // la cuchara se hunde (glup)
m.burbuja(G + 0.75, 0.14, 260); m.burbuja(G + 1.4, 0.1, 320);
m.golpe(G + 1.6, 0.22, 95);                                                  // tachón «¿solo crema?»
m.burbuja(G + 2.0, 0.12, 700);                                              // aparece la bacteria
m.nota(E + 0.3, 69, 0.06, 0.7); m.whoosh(E + 1.4, 0.6, 0.1); m.nota(E + 2.2, 74, 0.06, 0.7);
m.cruje(C + 0.4, 0.4);                                                        // la hoja se pudre
m.whoosh(C2, 0.6, 0.12);                                                      // la Lupa se abre
for (let i = 0; i < 4; i++) m.burbuja(C2 + 0.4 + i * 0.2, 0.08, 380 + i * 40); // la baba envuelve a cada bacteria
for (let i = 0; i < 6; i++) m.tic(Ta + 0.2 + i * 0.32 + 0.6, 0.15, 1500);     // cubos de azúcar que caen
m.motor(Ta, Al - Ta, 0.05);                                                   // agitador del tanque
for (let i = 0; i < 14; i++) m.burbuja(Ta + 0.3 + i * 0.28, 0.06, 600 + (i % 4) * 80);
m.whoosh(Ta + 1.6, 0.6, 0.1);
for (let i = 0; i < 8; i++) m.gota(Al + 0.2 + i * 0.25, 0.12, 900);           // el caldo pasa el filtro
m.whoosh(A1 + 0.2, 1.2, 0.12);                                                // chorro de alcohol
for (let i = 0; i < 9; i++) m.tic(A1 + 0.6 + i * 0.1, 0.06, 2200);           // fibras que se juntan
m.whoosh(A2, 1.5, 0.05);                                                        // polvo que cae
m.sube(P + 0.1, 1.6, 50, 62, 0.05);                                           // la pregunta
for (let i = 0; i < 10; i++) m.nota(Ca + 0.2 + i * 0.2, 57 + [0, 2, 4, 7, 9][i % 5], 0.04, 0.5); // una nota por azúcar de la cadena
m.whoosh(Ag + 0.2, 0.6, 0.1);
for (let i = 0; i < 26; i++) m.tic(Ag + 0.3 + i * 0.075, 0.07, 1100 + (i % 3) * 300); // el frasco se sacude
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 1.0, 0.08, 900);
m.golpe(Es2, 0.4, 70);                                                        // sello de 1969
m.motor(D, Ci - D, 0.07); m.golpe(D + 0.3, 0.3, 50);                          // la perforadora
m.whoosh(Ci + 0.3, 0.5, 0.12); m.golpe(Ci + 1.0, 0.18, 70); m.burbuja(Ci + 1.05, 0.12, 260);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
