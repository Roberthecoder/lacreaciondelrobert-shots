// gen-audio.mjs — cama grave + efectos del Shot Químico #47 (agua mineral con gas y tu lengua). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot AguaMineral base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, Ac = K.Acido, Ph = K.Ph, En = K.Enzima, Ne = K.Nervios, Ag = K.Agrio, Pr = K.Pregunta, Ca = K.Camara, Di = K.Dientes, Sa = K.Sabor, Ci = K.Cierre, Ou = K.Outro;
const mitadCa = Ca + 2.6, tubos = Di + 2.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.0, 0.5, 0.2);                                                          // destapar "pssst"
m.whoosh(G + 0.15, 1.5, 0.08);                                                        // chorro
for (let i = 0; i < 20; i++) m.burbuja(G + 0.3 + i * 0.08, 0.06, 800 + (i % 5) * 120); // burbujeo
for (let i = 0; i < 6; i++) m.tic(G + 1.5 + i * 0.12, 0.12, 2600);                    // piquete
m.golpe(G + 2.4, 0.3, 90);                                                             // ÁCIDO
m.nota(Ac + 1.9, 64, 0.07, 0.6);                                                       // CO₂ + H₂O se unen (clic)
m.tic(Ac + 1.9, 0.2, 1800);
m.nota(Ac + 3.0, 76, 0.06, 0.5);                                                       // suelta H⁺
m.tic(Ph + 0.4, 0.15, 1500);
m.sube(Ph + 1.4, 1.2, 64, 57, 0.05);                                                   // la aguja baja a 5
m.gota(Ph + 3.0, 0.2, 900); m.gota(Ph + 3.3, 0.18, 950);                               // la llave
m.nota(Ph + 4.6, 69, 0.06, 0.6);
for (let i = 0; i < 12; i++) m.tic(En + 0.8 + i * 0.27, 0.08, 1400 + (i % 3) * 300);  // la enzima trabaja rápido
m.zumbido(Ne, 2.8, 0.07, 190);                                                         // nervio encendido
for (let i = 0; i < 6; i++) m.tic(Ne + 0.2 + i * 0.4, 0.15, 3000);
m.golpe(Ag + 0.2, 0.35, 80);                                                           // tarjeta 2009
for (let i = 0; i < 6; i++) m.burbuja(Ag + 0.9 + i * 0.2, 0.06, 700);
m.nota(Ag + 3.0, 72, 0.06, 0.8);                                                       // brilla la célula agria
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Ca + 0.2, 0.35, 80);                                                           // tarjeta 2013
m.metal(Ca + 0.5, 0.15, 500); m.motor(Ca + 0.5, 1.6, 0.05);                            // compuerta y presión
m.whoosh(mitadCa + 0.8, 0.5, 0.1);
for (let i = 0; i < 2; i++) m.nota(Ca + 3.8 + i * 0.4, 62 + i * 2, 0.06, 0.6);        // las barras
m.golpe(Di + 0.2, 0.35, 80);                                                           // tarjeta 2001
m.metal(tubos, 0.12, 1500); m.metal(tubos + 0.2, 0.1, 1700);                           // tubos de laboratorio
for (let i = 0; i < 10; i++) m.burbuja(tubos + 0.6 + i * 0.15, 0.05, 600 + i * 30);
m.golpe(tubos + 2.4, 0.3, 95);                                                         // ≈ 100×
m.metal(Sa + 0.4, 0.12, 900);                                                          // balanza
m.tic(Sa + 1.8, 0.15, 1200);
for (let i = 0; i < 12; i++) m.burbuja(Ci + 0.3 + i * 0.15, 0.06, 750);
m.zumbido(Ci + 0.6, 2.0, 0.04, 190);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
