// gen-audio.mjs — cama grave + efectos del Shot Químico #22 (la pátina de la Estatua de la Libertad). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estatua base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 122);
const K = m.K;
const G = K.Gancho, P = K.Piel, Ca = K.Cafe, Cu = K.Cuprita, Br = K.Brochantita, Es = K.Escudo, Pr = K.Pregunta, St = K.Estudio, Pi = K.Pintura, Tu = K.Tu, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.1, 1.6, 0.12);                                                          // barrido de luz
for (let i = 0; i < 4; i++) m.nota(G + 1.0 + i * 0.15, 76 + i * 3, 0.04, 0.5);         // brillitos del cobre
m.golpe(G + 1.6, 0.25, 90);                                                            // se tacha "siempre fue verde"
m.nota(G + 3.6, 57, 0.07, 1.2); m.nota(G + 3.6, 64, 0.05, 1.2);                        // aparece el escudo
m.metal(P + 1.9, 0.22, 900); m.metal(P + 2.5, 0.22, 980);                              // caen los dos centavos
m.tic(P + 0.6, 0.1, 1600);                                                             // la regla
for (let i = 0; i < 6; i++) m.metal(Ca + 0.2 + i * 0.65, 0.05, 1200 + (i % 2) * 150);  // el centavo gira
for (let i = 0; i < 8; i++) m.tic(Cu + 1.7 + i * 0.22, 0.06, 1300 + i * 40);           // O₂ toca el cobre
m.sube(Cu + 2.2, 1.6, 50, 45, 0.05);                                                   // crece la cuprita (se oscurece)
m.motor(Br, 2.4, 0.05);                                                                // la fábrica
for (let i = 0; i < 14; i++) m.gota(Br + 1.4 + i * 0.32, 0.09, 950 + (i % 3) * 80);    // lluvia
for (let i = 0; i < 10; i++) m.nota(Br + 2.6 + i * 0.26, m.ESC[3 + (i % 6)], 0.04, 0.5); // crecen los cristales
for (let i = 0; i < 8; i++) m.gota(Es + 0.2 + i * 0.4, 0.08, 1300);                     // gotas que rebotan
m.nota(Es + 0.6, 62, 0.07, 1.4); m.nota(Es + 0.6, 69, 0.05, 1.4);                      // escudo
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 10; i++) m.tic(Pr + 0.3 + i * 0.2, 0.06, 2000);                    // contador de años
m.golpe(St + 0.2, 0.35, 80);                                                           // tarjeta del estudio
m.zumbido(St + 3.8, 2.0, 0.05, 220); m.zumbido(St + 6.0, 2.2, 0.05, 220);              // haz de rayos X
m.nota(St + 5.0, 72, 0.07, 0.8);                                                       // ✓ 1905
m.nota(St + 7.2, 58, 0.07, 0.6); m.nota(St + 7.4, 57, 0.06, 0.6);                      // ⚠ 1980
for (let i = 0; i < 8; i++) m.gota(St + 9.0 + i * 0.18, 0.07, 1000);                    // ¿lluvia ácida?
m.whoosh(Pi + 0.5, 1.1, 0.12);                                                          // entra la brocha
for (let i = 0; i < 3; i++) m.golpe(Pi + 1.8 + i * 0.3, 0.18, 150);                     // "¡No!"
m.whoosh(Pi + 3.0, 0.9, 0.08);                                                          // se va la brocha
m.nota(Pi + 3.6, 69, 0.06, 0.9);
for (let i = 0; i < 12; i++) m.gota(Tu + 1.4 + i * 0.33, 0.07, 900 + (i % 4) * 60);     // lluvia sobre el tubo
for (let i = 0; i < 9; i++) m.nota(Tu + 1.4 + i * 0.44, m.ESC[2 + (i % 5)], 0.03, 0.5); // manchas verdes
m.nota(Ci + 0.4, 57, 0.06, 1.6); m.nota(Ci + 0.4, 64, 0.05, 1.6); m.zumbido(Ci + 0.9, 1.2, 0.03, 260);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
