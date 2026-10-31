// gen-audio.mjs — cama grave + efectos del Shot Festivo #14 · Candelaria · Ambiental (razas de maíz). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Razas Maiz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 64);
const K = m.K, E = m.ESC;
const G = K.Gancho, Po = K.Pozole, To = K.Totopos, Pa = K.Palomitas, Pl = K.Polen, Se = K.Semilla, Al = K.Altura, P = K.Pregunta, Co = K.Color, St = K.Estudio, Ta = K.Tamal, B = K.Banco, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);                                        // cama grave continua, cálida
m.whoosh(G + 0.1, 0.7, 0.14); for (let i = 0; i < 6; i++) m.tic(G + 0.15 + i * 0.09, 0.05, 1400); // la hoja del tamal se abre
m.golpe(G + 1.5, 0.2, 110);                                                    // se tacha «¿maíz a secas?»
m.whoosh(G + 1.9, 0.6, 0.1);                                                   // el tamal baja
for (let i = 0; i < 64; i++) m.tic(G + 2.1 + (i / 64) * 2.2, 0.035, 1500 + (i % 8) * 180); // cada mazorca que llena la cuadrícula
m.nota(G + 3.6, 69, 0.06, 0.9); m.nota(G + 3.6, 76, 0.05, 0.9);                // «64 razas»
for (let i = 0; i < 12; i++) m.gota(Po + 1.2 + i * 0.15 + 0.5, 0.1, 500 + (i % 4) * 60); // granos que caen a la olla
m.burbuja(Po + 2.2, 0.08, 260); m.burbuja(Po + 2.6, 0.08, 300);                 // el pozole hierve
m.metal(To + 0.3, 0.05, 1600);                                                 // el punto del istmo
m.cruje(To + 1.9, 0.35);                                                       // aparece el totopo (crujiente)
for (let i = 0; i < 14; i++) m.golpe(Pa + 0.6 + i * 0.17, 0.12, 180 + (i % 5) * 30); // cada palomita que revienta
m.whoosh(Pl + 0.2, 2.0, 0.05);                                                 // viento en la milpa
for (let i = 0; i < 18; i++) m.nota(Pl + 2.6 + i * 0.2, E[6 + (i % 6)], 0.022, 0.4); // brillos del polen que viaja
for (let i = 0; i < 10; i++) m.tic(Se + 0.3 + i * 0.1 + 0.45, 0.05, 2200);    // granos que caen al frasco
m.whoosh(Se + 1.6, 1.0, 0.1);                                                  // se intercambian los frascos
m.sube(Se + 2.8, 0.8, 60, 67, 0.04);                                           // la semilla brota
for (let i = 0; i < 8; i++) m.nota(Al + 0.3 + i * 0.4, E[2 + i], 0.04, 0.5);   // notas que suben con la altura
m.sube(P + 0.1, 1.8, 52, 64, 0.05);                                            // pregunta
m.nota(Co + 0.8, 57, 0.06, 1.0); m.nota(Co + 0.8, 64, 0.04, 1.0);              // se colorea el pericarpio
m.nota(Co + 2.0, 60, 0.06, 1.0); m.nota(Co + 2.0, 67, 0.04, 1.0);              // se colorea la aleurona
m.nota(Co + 3.4, 64, 0.06, 1.2); m.nota(Co + 3.4, 69, 0.05, 1.2); m.nota(Co + 3.4, 72, 0.04, 1.2); // las dos
m.golpe(St + 0.2, 0.28, 85); m.metal(St + 0.25, 0.07, 1500);                   // tarjeta 1951
for (let i = 0; i < 24; i++) m.tic(St + 1.0 + i * 0.1, 0.04, 1800 + (i % 6) * 200); // puntos de colecta en el mapa
m.nota(St + 3.6, 64, 0.05, 0.7); m.nota(St + 4.8, 69, 0.06, 0.9);             // 25 razas → hoy 64
for (let i = 0; i < 10; i++) m.tic(Ta + 0.6 + i * 0.12 + 0.5, 0.04, 2600);    // granos a la harina
m.motor(Ta + 0.9, 1.4, 0.04);                                                  // se muele
m.whoosh(Ta + 3.0, 1.2, 0.1); m.cruje(Ta + 3.4, 0.25);                          // la hoja envuelve el tamal
m.zumbido(B, 2.6, 0.025, 120);                                                 // el frío del banco
for (let i = 0; i < 15; i++) m.tic(B + 0.2 + i * 0.08, 0.04, 2400 + (i % 5) * 150); // los frascos aparecen
m.sube(B + 3.0, 2.0, 55, 62, 0.03);                                            // el sol que calienta (clima futuro)
m.nota(B + 3.6, 72, 0.05, 1.0); m.nota(B + 3.6, 79, 0.04, 1.0);                // la semilla criolla brilla
m.whoosh(Ci - 0.2, 0.6, 0.12);
m.metal(Ci + 0.4, 0.08, 1800); m.metal(Ci + 0.7, 0.06, 2400);                  // campanita: regresamos al tamal
for (let i = 0; i < 6; i++) m.nota(Ci + 1.0 + i * 0.15, E[7 + i], 0.03, 0.5);  // las 64 razas se iluminan
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
