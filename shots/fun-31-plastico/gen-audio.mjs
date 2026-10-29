// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #31 (hongos y plástico). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Plastico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const G = K.Gancho, H = K.Hongo, E = K.Estudio, Z = K.Enzima, O = K.SinOxigeno, P = K.Pregunta, Tr = K.Truco, Pk = K.Pakistan, R = K.Revision, Pe = K.Peso, S = K.Sirve, F = K.Futuro, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                   // cama grave, curiosa
for (let i = 0; i <= 5; i++) m.tic(G + 0.3 + i * 0.54, 0.14, 2200);           // días 0 → 5
for (let i = 0; i < 6; i++) m.burbuja(G + 0.4 + i * 0.4, 0.07, 420 + i * 30);  // el tubo se aclara
m.nota(G + 0.6, 69, 0.07, 0.8);                                                // ½ en ~5 días
m.cruje(G + 4.4, 0.3);                                                         // se tacha «¿adiós a la basura?»
m.whoosh(H, 0.7, 0.12); for (let i = 0; i < 4; i++) m.gota(H + 0.3 + i * 0.5, 0.12, 900 + i * 120); // selva
m.sube(H + 0.4, 0.8, 57, 64, 0.04);                                            // se abre la lupa
for (let i = 0; i < 3; i++) m.nota(H + 2.5 + i * 0.3, 72 + i * 3, 0.05, 0.5); // aparecen los conidios
m.golpe(E + 0.2, 0.3, 85);                                                     // tarjeta 2011
for (let i = 0; i < 20; i++) m.tic(E + 0.4 + i * 0.09, 0.06, 1800 + (i % 4) * 200); // cajas de Petri
m.nota(E + 3.0, 76, 0.07, 0.9);                                                // uno destaca
for (let i = 0; i < 3; i++) { m.tic(Z + 0.9 + i * 0.4, 0.16, 3000); m.cruje(Z + 1.0 + i * 0.4, 0.12); } // la enzima corta
m.burbuja(O + 0.4, 0.08, 400); m.burbuja(O + 0.4, 0.08, 520); m.nota(O + 0.6, 64, 0.05, 1.2); m.nota(O + 0.6, 64, 0.05, 1.2); // dos tubos a la par
m.sube(P + 0.1, 1.5, 52, 64, 0.05); m.nota(P + 0.3, 62, 0.05, 1.8); m.nota(P + 0.3, 67, 0.04, 1.8); // ? suspendido
for (let i = 0; i < 6; i++) m.burbuja(Tr + 0.3 + i * 0.12, 0.06, 600);        // gotitas en agua
m.whoosh(Tr + 1.8, 0.5, 0.1); m.golpe(Tr + 2.6, 0.4, 70);                      // la bolsa · ✗
m.golpe(Pk + 0.1, 0.3, 85);                                                    // tarjeta 2017
for (let i = 0; i < 14; i++) m.tic(Pk + 2.4 + i * 0.1, 0.05, 1200);           // manchas negras del hongo
m.cruje(Pk + 2.7, 0.5);                                                        // la película se rompe
m.nota(Pk + 3.6, 79, 0.05, 0.6);                                               // + glucosa
for (let i = 0; i < 24; i++) m.tic(R + 0.3 + i * 0.1, 0.05, 2600);            // 664 reportes
m.golpe(R + 1.4, 0.35, 80); m.whoosh(R + 3.6, 0.6, 0.1); m.golpe(R + 5.0, 0.35, 65); // bolsa · sin pruebas
m.sube(Pe + 0.6, 2.8, 60, 50, 0.05);                                           // la báscula baja
for (let i = 0; i < 14; i++) m.gota(Pe + 0.6 + i * 0.18, 0.06, 1400 + (i % 4) * 200); // salen aditivos
for (let i = 0; i < 3; i++) m.nota(S + 0.6 + i * 0.8, [72, 76, 79][i], 0.06, 0.7); // ✓ ✓ ✓
m.sube(F, 2.8, 57, 69, 0.04); m.nota(F + 0.6, 81, 0.04, 1.4);                  // crece el micelio
m.burbuja(C + 0.3, 0.06, 420); m.golpe(C + 1.2, 0.3, 75); m.nota(C + 1.8, 69, 0.06, 1.2); // tubo · bote
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
