// gen-audio.mjs — cama grave + efectos del Shot Químico #05 (nixtamalización). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nixtamal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Pr = K.Proceso, Ca = K.Cascara, Ne = K.Nejayote, Cl = K.Calcio, Ni = K.Niacina, Pg = K.Pregunta, Eu = K.Europa, Es = K.Estudio, Me = K.Mesoamerica, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.golpe(G + 0.5, 0.45, 70);                                                       // la masa cae
m.cruje(G + 2.6, 0.5);                                                            // la tortilla sin cal se desmorona
for (let i = 0; i < 12; i++) m.tic(Pr + 0.8 + i * 0.06, 0.04, 3200);              // cae la cal
for (let i = 0; i < 14; i++) m.burbuja(Pr + 0.4 + i * 0.2, 0.08, 350 + (i % 4) * 50); // hervor
for (let i = 0; i < 8; i++) m.tic(Pr + 3.4 + i * 0.35, 0.05, 1600);               // cronómetro
m.whoosh(Ca + 1.2, 2.6, 0.08); m.sube(Ca + 1.2, 2.6, 57, 69, 0.03);               // se despega el pericarpio
m.whoosh(Ne + 0.3, 2.0, 0.12);                                                    // chorro del nejayote
for (let i = 0; i < 8; i++) m.nota(Cl + 0.2 + i * 0.2, 72 + (i % 3) * 2, 0.04, 0.4); // entra el calcio
m.metal(Ni + 2.2, 0.15, 1100); m.metal(Ni + 2.3, 0.1, 1600);                      // candado
m.sube(Ni + 3.2, 1.4, 60, 72, 0.05);
m.sube(Pg + 0.1, 1.6, 52, 64, 0.05);
m.whoosh(Eu, 2.6, 0.1); m.pad(Eu + 3.0, Es, 0.03, [40, 46], 0.5);
for (let i = 0; i < 3; i++) m.golpe(Eu + 3.6 + i * 0.6, 0.3, 90 - i * 10);
m.golpe(Es + 0.2, 0.35, 80); m.sube(Es + 3.2, 2.0, 69, 57, 0.05); m.nota(Es + 5.2, 72, 0.06, 0.8);
for (let i = 0; i < 8; i++) m.whoosh(Me + 0.2 + i * 0.6, 0.5, 0.05);               // metate
m.golpe(Ci + 0.4, 0.3, 80); m.sube(Ci + 2.0, 1.2, 57, 69, 0.05); m.nota(Ci + 3.4, 76, 0.07, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
