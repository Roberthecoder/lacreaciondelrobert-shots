// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #45 (Taxol). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: un tic por gota del suero · el pulso de los microtúbulos (sube y baja) que se queda en una nota
// sostenida cuando entra el Taxol · tres crujidos de corteza = los tres árboles por paciente (GAO, 1992) · burbujeo del tanque.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Taxol base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 45);
const K = m.K;
const G = K.Gancho, Te = K.Tejo, Tx = K.Taxol, Ca = K.Cables, Co = K.Congela, Mu = K.Muere, Pr = K.Pregunta, Es = K.Estudio,
  Ar = K.Arboles, Ag = K.Agujas, Ta = K.Tanque, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let t = G; t < Te; t += 1 / 1.4) m.tic(t + 0.05, 0.06, 2600);                      // gotas del suero
m.whoosh(G + 0.1, 1.2, 0.06);                                                             // viento del bosque
m.golpe(G + 1.9, 0.25, 90);                                                               // se tacha el mito
m.cruje(Te + 0.6, 0.6);                                                                   // se desprende la corteza
m.golpe(Te + 3.2, 0.2, 110);                                                              // cae en la bolsa de muestra
for (let i = 0; i < 6; i++) m.burbuja(Tx + 0.3 + i * 0.22, 0.08, 500 + i * 60);           // el matraz se llena
m.nota(Tx + 2.0, 69, 0.08, 0.9); m.nota(Tx + 2.1, 76, 0.06, 0.9);                         // aparece el frasco
m.whoosh(Ca, 0.7, 0.18);                                                                  // la Lupa se abre
for (let i = 0; i < 12; i++) m.nota(Ca + 0.8 + i * 0.42, [57, 60, 64, 60][i % 4], 0.05, 0.35); // pulso de los microtúbulos
for (let i = 0; i < 3; i++) m.tic(Co + 0.2 + i * 0.4, 0.1, 3400);                          // se pegan las bolitas de Taxol
m.metal(Co + 0.7, 0.12, 1400);                                                            // escarcha (cristal)
m.nota(Co + 1.0, 64, 0.06, 3.0, 0.5);                                                     // nota congelada, sostenida
m.sube(Mu + 0.4, 1.4, 60, 50, 0.06);                                                      // la célula reparte mal
m.latido(Mu + 2.0, 0.18);                                                                 // la célula se apaga
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                      // re-gancho
m.tic(Pr + 0.3, 0.1, 1800);
m.golpe(Es + 0.4, 0.3, 80);                                                               // sello de la tarjeta 1979
for (let i = 0; i < 6; i++) m.metal(Es + 2.6 + i * 0.3, 0.05, 1800 + i * 120);              // hielo
for (let i = 0; i < 10; i++) m.tic(Es + 2.8 + i * 0.18, 0.05, 900);                        // se deshacen (sin taxol)
m.nota(Es + 4.8, 69, 0.07, 0.8); m.nota(Es + 4.9, 73, 0.06, 0.8);                         // ✓ con taxol
for (let i = 0; i < 3; i++) m.cruje(Ar + 0.8 + i * 0.9, 0.45);                            // tres árboles pelados
m.pad(Ar + 2.0, Ag, 0.02, [45, 51], 0.5);                                                 // se secan
m.tic(Ag + 0.8, 0.2, 2200); m.tic(Ag + 0.86, 0.2, 2600);                                  // tijeras
for (let i = 0; i < 6; i++) m.nota(Ag + 2.0 + i * 0.26, [62, 64, 67, 69, 72, 74][i], 0.05, 0.3); // las hojas rebrotan
m.motor(Ta, 5.0, 0.05);                                                                   // tanque
for (let i = 0; i < 20; i++) m.burbuja(Ta + 0.2 + i * 0.25, 0.06, 550 + (i % 5) * 80);
m.whoosh(Ta + 1.2, 0.6, 0.15);                                                            // Lupa
for (let t = Ci; t < Ou; t += 1 / 1.4) m.tic(t + 0.05, 0.05, 2600);                      // gotas otra vez
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
