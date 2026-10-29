// gen-audio.mjs — cama grave + efectos del Shot Ambiental #58 (la «isla de basura» del Pacífico). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mancha Pacifico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 58);
const K = m.K;
const G = K.Gancho, D = K.Donde, Gi = K.Giro, S = K.Sopa, P = K.Pregunta, E = K.Estudio, R = K.Redes, O = K.Origen, B = K.Boya, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                              // cama grave tipo mar abierto
m.whoosh(G + 0.1, 1.2, 0.08);                                                          // el tenis baja
m.golpe(G + 1.35, 0.3, 70); m.whoosh(G + 1.35, 0.7, 0.2);                              // chapuzón: la "isla" no aguanta el pie
for (let i = 0; i < 8; i++) m.gota(G + 1.5 + i * 0.13, 0.08, 700 + i * 60);            // las piezas se dispersan
m.metal(G + 1.5, 0.12, 900);                                                           // tache sobre "isla"
m.nota(G + 2.4, 64, 0.05, 0.8);                                                        // "sopa de plástico"
m.whoosh(D + 0.1, 0.8, 0.1); m.nota(D + 0.6, 57, 0.04, 0.6); m.nota(D + 0.9, 60, 0.04, 0.6);   // mapa, Hawái y California
m.sube(D + 1.2, 1.0, 52, 64, 0.05);                                                    // 1.6 millones de km²
for (let i = 0; i < 3; i++) m.whoosh(Gi + 0.2 + i * 1.6, 1.4, 0.07);                   // el giro da vueltas
m.tic(S + 0.8, 0.12, 2600);                                                            // la única pieza del metro cuadrado
m.golpe(S + 3.6, 0.2, 140); for (let i = 0; i < 5; i++) m.tic(S + 3.9 + i * 0.12, 0.08, 2200 + i * 200);   // lupa: fragmentos
m.sube(P + 0.05, 1.3, 52, 64, 0.05); m.metal(P + 0.3, 0.08, 600);                      // pregunta y báscula
m.motor(E + 0.2, 2.6, 0.06);                                                           // 18 barcos
m.zumbido(E + 3.0, 2.6, 0.05, 150); m.tic(E + 4.6, 0.15, 3000); m.tic(E + 5.0, 0.15, 3000); m.tic(E + 5.4, 0.15, 3000);   // avión y fotos
m.golpe(R + 0.3, 0.4, 55);                                                             // 79 mil toneladas en la báscula
m.sube(R + 2.4, 1.2, 50, 62, 0.05); m.nota(R + 3.0, 62, 0.05, 0.8);                    // la barra llega a 46 % de redes
m.golpe(O + 0.2, 0.2, 110); m.golpe(O + 0.45, 0.18, 95);                               // caen cajas y trampas
m.nota(O + 2.4, 64, 0.05, 0.6); m.nota(O + 2.8, 67, 0.05, 0.6);                        // Japón, China
m.metal(B + 0.05, 0.18, 260);                                                          // "clonc" hueco de la boya vieja
m.whoosh(C + 0.1, 1.6, 0.08); m.whoosh(C + 2.4, 1.6, 0.06);                            // la sopa sigue girando
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
