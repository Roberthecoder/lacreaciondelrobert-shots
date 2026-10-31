// gen-audio.mjs — cama grave + efectos del Shot Químico #39 (antiácidos y neutralización). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Antiacido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 39);
const K = m.K;
const G = K.Gancho, A = K.Acido, P = K.Ph, Ag = K.Agruras, B = K.Base, Ga = K.Gas, Pr = K.Pregunta, O = K.Omeprazol, Be = K.Beaumont, Mu = K.Muriatico, Ci = K.Cierre, Ou = K.Outro;
const mitadB = B + 3.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.0, 0.8, 0.12);                                                      // la pastilla baja por el esófago
m.gota(G + 0.85, 0.3, 700); m.burbuja(G + 0.9, 0.15, 500);                         // plop en el ácido
for (let i = 0; i < 6; i++) m.tic(G + 0.9 + i * 0.05, 0.08, 2200);                 // chispazo
m.golpe(G + 1.8, 0.25, 90);                                                         // se tacha "¿calma?"
for (let i = 0; i < 12; i++) m.tic(A + 0.5 + i * 0.4, 0.06, 1500 + (i % 3) * 200); // bombas que sueltan H⁺
m.nota(A + 0.4, 64, 0.05, 0.6);
m.sube(P + 0.1, 1.2, 60, 48, 0.05);                                                 // la cápsula baja
for (let i = 0; i < 8; i++) m.tic(P + 1.0 + i * 0.2, 0.05, 2600 - i * 150);        // la aguja del pH
m.golpe(P + 2.6, 0.25, 80);
m.whoosh(Ag + 0.3, 1.2, 0.1);                                                       // la ola sube
m.zumbido(Ag + 1.0, 1.8, 0.04, 160);                                                // ardor
m.pad(Ag, B, 0.02, [52, 55], 0.6);                                                  // tensión (tapada)
for (let i = 0; i < 3; i++) m.golpe(B + 0.6 + i * 1.1, 0.22, 110 + i * 15);        // las tres fichas
for (let i = 0; i < 4; i++) { m.tic(mitadB + 1.0 + i * 0.45, 0.08, 1800); m.gota(mitadB + 1.0 + i * 0.45, 0.18, 1000); } // se forma agua
m.metal(mitadB + 1.6, 0.1, 900);                                                    // la sal
for (let i = 0; i < 12; i++) m.burbuja(Ga + 0.3 + i * 0.22, 0.09, 450 + (i % 4) * 80); // CO₂
m.golpe(Ga + 2.4, 0.3, 70); m.whoosh(Ga + 2.4, 0.4, 0.1);                          // ¡burp!
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.gota(O + 1.0, 0.18, 800);
for (let i = 0; i < 3; i++) m.metal(O + 2.0 + i * 0.12, 0.08, 1200);               // candaditos
for (let i = 0; i < 3; i++) m.tic(O + 3.6 + i * 0.8, 0.07, 1600);                  // días
m.golpe(Be + 0.8, 0.3, 60);                                                         // disparo lejano, amortiguado
m.golpe(Be + 0.2, 0.25, 80);                                                        // tarjeta
for (let i = 0; i < 4; i++) m.gota(Be + 5.8 + i * 0.35, 0.15, 900);                // jugo al frasco
for (let i = 0; i < 10; i++) m.burbuja(Be + 7.2 + i * 0.3, 0.05, 400);             // digiere
m.whoosh(Mu + 2.2, 0.6, 0.08);                                                      // gira la etiqueta
m.nota(Mu + 2.9, 69, 0.06, 0.8);
m.gota(Ci + 0.95, 0.25, 700);
for (let i = 0; i < 6; i++) m.burbuja(Ci + 1.1 + i * 0.25, 0.07, 600);
m.nota(Ci + 1.2, 57, 0.05, 1.5); m.nota(Ci + 1.6, 64, 0.05, 1.5);                  // ya libre
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
