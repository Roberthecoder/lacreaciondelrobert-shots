// gen-audio.mjs — cama grave + efectos del Shot Químico #35 (la vela quema cera hecha vapor). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vela base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 135);
const K = m.K;
const G = K.Gancho, Co = K.Copa, Me = K.Mecha, Va = K.Vapor, Br = K.Brillo, Pr = K.Pregunta, Fa = K.Faraday, Hu = K.Humo, Es = K.Espacio, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Es, 0.05, [45, 52, 57]);
m.zumbido(G, 1.8, 0.03, 120);                                                          // chisporroteo suave de la llama
m.golpe(G + 1.9, 0.22, 110);                                                           // se tacha el mito
for (let i = 0; i < 5; i++) m.burbuja(G + 2.1 + i * 0.18, 0.08, 900);                  // vapor que sale
m.whoosh(Co - 0.2, 0.6, 0.1);                                                          // acercamiento
for (let i = 0; i < 5; i++) m.gota(Co + 0.6 + i * 0.55, 0.14, 700 + i * 60);           // la cera se derrite
m.sube(Co + 0.3, 2.9, 50, 60, 0.04);                                                  // termómetro
m.whoosh(Me - 0.2, 0.7, 0.08);                                                         // entrada al microscopio
for (let i = 0; i < 12; i++) m.burbuja(Me + 0.5 + i * 0.3, 0.06, 600 + (i % 4) * 80); // la cera sube por los hilos
for (let i = 0; i < 4; i++) m.nota(Me + 2.0 + i * 0.6, 72 + i * 2, 0.03, 0.5);         // el agua sube por la servilleta
for (let i = 0; i < 8; i++) m.burbuja(Va + 0.3 + i * 0.2, 0.07, 1100);                 // gotas → vapor
for (let i = 0; i < 4; i++) m.tic(Va + 1.5 + i * 0.3, 0.08, 1400);                     // llega el oxígeno
m.whoosh(Va + 2.4, 1.0, 0.18);                                                         // "fuf": se enciende
for (let i = 0; i < 10; i++) m.nota(Br + 0.5 + i * 0.4, 79 + (i % 3) * 3, 0.025, 0.4); // destellos del hollín
m.sube(Pr + 0.1, 1.8, 52, 64, 0.05);                                                   // pregunta
m.golpe(Fa + 0.2, 0.35, 80);                                                           // tarjeta 1860–61
m.metal(Fa + 3.6, 0.08, 1400);                                                         // el vidrio entra en la llama
m.zumbido(Fa + 4.2, 2.0, 0.035, 220);                                                  // siseo del vapor por el tubo
m.whoosh(Fa + 6.0, 0.7, 0.1);                                                          // llega la astilla
m.whoosh(Fa + 7.0, 0.8, 0.2); m.nota(Fa + 7.1, 69, 0.05, 1.2);                         // "fuf": segunda llama
m.whoosh(Hu + 0.1, 0.9, 0.22);                                                         // soplido
m.pad(Hu + 0.9, Hu + 4.8, 0.02, [52, 57], 0.6);                                        // silencio tenso con el humo
m.whoosh(Hu + 2.2, 0.8, 0.08);                                                         // la astilla se acerca
m.sube(Hu + 3.9, 0.9, 64, 52, 0.05); m.whoosh(Hu + 3.9, 0.9, 0.16);                   // el fuego baja por el humo
m.golpe(Hu + 4.8, 0.2, 140);                                                           // se vuelve a prender
m.golpe(Hu + 5.6, 0.2, 90);                                                            // advertencia
m.pad(Es, Ci, 0.04, [57, 64, 69], 0.3);                                                // tono etéreo del espacio
m.nota(Es + 1.6, 81, 0.04, 2.4); m.nota(Es + 1.8, 88, 0.03, 2.4);                     // aparece la esfera azul
m.pad(Ci, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(Ci + 0.1, 0.5, 0.1);
for (let i = 0; i < 5; i++) m.tic(Ci + 0.4 + i * 0.4, 0.06, 1600);                     // etiquetas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
