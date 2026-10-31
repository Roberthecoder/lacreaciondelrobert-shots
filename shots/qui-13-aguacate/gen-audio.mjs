// gen-audio.mjs — cama grave + efectos del Shot Químico #13 (guacamole café y polifenol oxidasa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Aguacate base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 113);
const K = m.K;
const G = K.Gancho, Ma = K.Machacar, En = K.Enzima, Me = K.Melanina, Pr = K.Pregunta, Es = K.Estudio, Li = K.Limon, Pl = K.Plastico, Hu = K.Hueso, Co = K.Cobre, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.1, 1.2, 0.1);                                                          // raspón de la cuchara
m.golpe(G + 1.7, 0.3, 90);                                                            // se tacha "¿podrido?"
for (let i = 0; i < 5; i++) m.golpe(Ma + i * 0.7 + 0.35, 0.32, 70);                   // golpes del tejolote
m.cruje(Ma + 2.6, 0.7); m.cruje(Ma + 3.2, 0.5);                                       // células que se rompen
for (let i = 0; i < 3; i++) { const t = En + 1.3 + i * 1.35; m.tic(t, 0.12, 1300); m.nota(t + 0.05, 64 + i * 3, 0.05, 0.5); } // mordidas
for (let i = 0; i < 11; i++) m.tic(Me + 0.3 + i * 0.22, 0.08, 1800 - i * 60);         // la cadena de melanina
m.nota(Me + 1.8, 57, 0.05, 1.2);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.pad(Pr + 2.6, Es, 0.02, [52, 57], 0.6);                                              // la enzima "dormida"
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 3; i++) m.nota(Es + 2.4 + i * 0.2, 69 + i * 3, 0.06, 0.4);
for (let i = 0; i < 12; i++) m.tic(Es + 3.2 + i * 0.35, 0.05, 2600);                   // tic-tac del relojito
for (let i = 0; i < 10; i++) m.gota(Li + 0.6 + i * 0.35, 0.14, 1000);                 // gotas de limón
m.whoosh(Pl, 0.6, 0.12);                                                              // el plástico
for (let i = 0; i < 4; i++) m.burbuja(Pl + 1.2 + i * 0.5, 0.06, 900);                  // O₂ que rebotan
m.golpe(Hu + 0.5, 0.35, 75);                                                          // cae el hueso
for (let i = 0; i < 6; i++) m.tic(Hu + 1.0 + i * 0.3, 0.05, 2600);
m.whoosh(Hu + 3.0, 0.5, 0.08);
m.sube(Hu + 4.3, 0.35, 60, 74, 0.08); m.golpe(Hu + 4.4, 0.25, 120);                    // ¡boing! de la pelota
m.metal(Co + 0.9, 0.18, 760); m.metal(Co + 1.1, 0.14, 980);                           // destello del cobre
m.nota(Ci + 0.3, 64, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
