// gen-audio.mjs — cama grave + efectos del Shot Químico #28 (el polvo superabsorbente del pañal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Panal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 28);
const K = m.K;
const G = K.Gancho, Q = K.Que, Ca = K.Cargas, Rp = K.Repulsion, Os = K.Osmosis, Ge = K.Gel, Pr = K.Pregunta, Es = K.Estudio, Sa = K.Sal, Pe = K.Peoria, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 8; i++) m.tic(G + i * 0.06, 0.05, 2600 + i * 120);             // polvito que cae
m.whoosh(G + 0.15, 1.8, 0.07);                                                      // chorro de agua
for (let i = 0; i < 6; i++) m.gota(G + 0.4 + i * 0.25, 0.08, 800 + i * 40);
m.sube(G + 1.6, 1.0, 60, 67, 0.04);                                                 // se vuelve gel
m.whoosh(G + 2.8, 0.6, 0.12); m.golpe(G + 3.4, 0.25, 110);                          // el vaso se voltea… y nada cae
m.whoosh(Q - 0.2, 1.4, 0.08);                                                       // entramos al granito
m.nota(Q + 1.6, 57, 0.05, 0.8); m.nota(Q + 2.6, 64, 0.05, 0.8);
for (let i = 0; i < 16; i++) m.tic(Ca + 0.2 + i * 0.14, 0.06, 1800 + (i % 4) * 200); // cargas que se encienden
for (let i = 0; i < 8; i++) m.nota(Ca + 1.8 + i * 0.22, 69 + (i % 3) * 2, 0.025, 0.3); // los sodios
m.sube(Rp + 0.4, 2.6, 48, 60, 0.05); m.nota(Rp + 1.6, 72, 0.05, 0.5); m.nota(Rp + 1.75, 76, 0.05, 0.5); // la red se estira, «boing»
for (let i = 0; i < 10; i++) m.burbuja(Rp + 0.3 + i * 0.22, 0.05, 500 + (i % 5) * 60); // el agua entra
for (let i = 0; i < 12; i++) m.gota(Os + 0.3 + i * 0.35, 0.07, 700 + (i % 3) * 80);
m.metal(Ge + 0.3, 0.08, 900); m.golpe(Ge + 0.7, 0.15, 120);
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05); m.golpe(Pr + 1.4, 0.2, 90);                    // la báscula tambalea
m.golpe(Es + 0.2, 0.35, 80);                                                        // tarjeta 2025
m.whoosh(Es + 1.4, 1.2, 0.06);                                                      // corte del pañal
for (let i = 0; i < 8; i++) m.tic(Es + 2.6 + i * 0.1, 0.05, 2400);                  // granitos al tamiz
m.sube(Es + 4.2, 1.4, 55, 79, 0.05);                                                // barra alta: agua pura
m.nota(Es + 6.4, 50, 0.07, 0.9);                                                    // barra bajita: orina
m.pad(Sa, Pe, 0.025, [42, 49], 0.6);                                                // la sal ahoga la red
for (let i = 0; i < 10; i++) m.tic(Sa + 0.4 + i * 0.2, 0.06, 1200 - i * 50);
m.sube(Sa + 2.0, 2.0, 60, 48, 0.04);
m.golpe(Pe + 0.2, 0.35, 80);                                                        // tarjeta 1973
for (let i = 0; i < 12; i++) m.nota(Pe + 2.6 + i * 0.2, 60 + (i % 6) * 2, 0.03, 0.3); // cadenas que brotan
m.whoosh(Pe + 5.4, 0.8, 0.12); m.burbuja(Pe + 5.9, 0.12, 300); m.burbuja(Pe + 6.1, 0.12, 260); // «slurp»
m.whoosh(Ci + 0.5, 0.6, 0.06); m.nota(Ci + 1.0, 64, 0.05, 1.2);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
