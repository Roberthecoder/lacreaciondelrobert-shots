// gen-audio.mjs — cama grave + efectos del Shot Ambiental #46 (cáscara: relleno vs. composta). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Composta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 46);
const K = m.K;
const G = K.Gancho, B = K.Bote, S = K.Sinaire, Ba = K.Bacterias, A = K.Arqueas, Po = K.Potencia, P = K.Pregunta, Co = K.Composta, E = K.Estudio, Ca = K.Calor, C = K.Cierre, Ou = K.Outro;

// cama: tapada (sorda) bajo tierra, sin aire; libre en la composta
m.pad(0, S, 0.05, [45, 52, 57]);
m.pad(S, P, 0.05, [43, 50, 55], 0.7);
m.pad(P, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.6, 0.15); m.golpe(G + 0.05, 0.25, 140); m.golpe(G + 0.8, 0.4, 70); m.tic(G + 1.3, 0.2, 900);   // tapa, cáscara cae, tapa se cierra
m.whoosh(G + 2.3, 0.5, 0.1);
for (let i = 0; i < 10; i++) m.golpe(B + 0.2 + i * 0.1, 0.12, 60 + i * 3);                                            // bolsas que caen
for (let i = 0; i < 4; i++) m.nota(B + 1.6 + i * 0.15, 64 + i * 2, 0.06, 0.4);                                        // 4 orgánicas
m.golpe(S + 0.1, 0.35, 50); m.sube(S + 0.1, 1.1, 52, 40, 0.05);                                                         // tierra encima
m.zumbido(S + 1.5, 0.5, 0.05, 300);                                                                                     // lupa
for (let i = 0; i < 5; i++) m.cruje(Ba + 0.3 + i * 0.35, 0.25);                                                         // fibras que se rompen
for (let i = 0; i < 8; i++) m.burbuja(Ba + 0.9 + i * 0.2, 0.08, 600 + (i % 3) * 120);                                  // ácidos e H2
for (let i = 0; i < 5; i++) m.tic(A + 0.1 + i * 0.15, 0.1, 1200);
for (let i = 0; i < 9; i++) m.burbuja(A + 0.8 + i * 0.25, 0.12, 300 + (i % 4) * 60);                                   // metano que sube
m.golpe(Po + 0.3, 0.35, 70); for (let i = 0; i < 20; i++) m.tic(Po + 1.0 + i * 0.07, 0.05, 2000);                      // balanza: 1 contra 80
m.sube(Po + 0.4, 1.4, 52, 64, 0.05); m.metal(Po + 2.6, 0.12, 700);
m.sube(P + 0.05, 1.3, 52, 64, 0.05); m.whoosh(P + 0.4, 1.0, 0.12);                                                     // aire
m.whoosh(Co + 0.2, 1.2, 0.14); for (let i = 0; i < 4; i++) m.nota(Co + 3.4 + i * 0.7, [69, 72, 74, 76][i], 0.06, 0.6); // abono, agua, calor, CO2
m.tic(Co + 0.8, 0.1, 1500); m.tic(Co + 1.2, 0.1, 1500); m.tic(Co + 1.6, 0.1, 1500);
m.golpe(E + 0.2, 0.3, 90); m.nota(E + 0.3, 69, 0.06, 0.9);                                                              // tarjeta 2018
for (let i = 0; i < 6; i++) m.tic(E + 3.8 + i * 0.5, 0.08, 2600);                                                      // sensores: bip
m.sube(E + 5.0, 1.4, 52, 64, 0.04); m.sube(E + 6.2, 1.4, 52, 57, 0.04);                                                // barras
m.sube(Ca + 0.3, 1.9, 52, 72, 0.06); m.whoosh(Ca + 1.0, 1.5, 0.08);                                                    // termómetro y vapor
for (let i = 0; i < 4; i++) m.pop ? m.pop(C + 0.2 + i * 0.6) : m.burbuja(C + 0.2 + i * 0.6, 0.1, 700);                 // receta
m.whoosh(C + 3.0, 0.6, 0.12); m.golpe(C + 3.7, 0.25, 90);                                                               // la cáscara cae otra vez
m.sube(C + 3.9, 2.3, 57, 69, 0.05); m.nota(C + 5.3, 76, 0.06, 1.2);                                                    // se hace tierra y brota
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
