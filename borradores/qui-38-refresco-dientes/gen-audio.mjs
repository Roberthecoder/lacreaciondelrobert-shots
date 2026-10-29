// gen-audio.mjs — cama grave + efectos del Shot Químico #38 (el refresco y tu esmalte). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot RefrescoDientes base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 38);
const K = m.K;
const G = K.Gancho, E = K.Esmalte, C = K.Critico, A = K.Acido, Er = K.Erosion, Az = K.Azucar, P = K.Pregunta, Es = K.Estudio, Co = K.Consejo, D = K.Dentista, Ci = K.Cierre, Ou = K.Outro;
const micro = E + 2.4, estMid = Es + 5.3;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.pad(C + 0.6, Az, 0.025, [44, 51], 0.5);                                            // tensión mientras baja el pH
m.whoosh(G + 0.0, 0.5, 0.18);                                                         // "pssst" de la lata
m.whoosh(G + 0.2, 3.4, 0.07);                                                         // chorro
for (let i = 0; i < 22; i++) m.burbuja(G + 0.3 + i * 0.15, 0.06, 800 + (i % 5) * 110); // burbujeo
for (let i = 0; i < 3; i++) m.nota(G + 2.6 + i * 0.25, 79 + i * 2, 0.06, 0.5);        // destellos del esmalte
m.whoosh(E + 0.1, 0.6, 0.12); m.tic(E + 1.4, 0.2, 1800);                             // zoom al diente
m.whoosh(micro - 0.3, 0.7, 0.14);
for (let i = 0; i < 11; i++) m.nota(micro + i * 0.06, 72 + (i % 5) * 2, 0.03, 0.4);   // cristales que aparecen
m.sube(C + 0.6, 2.6, 64, 55, 0.04); m.tic(C + 3.1, 0.35, 2600);                      // el pH baja y cruza 5.5
m.golpe(A + 0.2, 0.25, 90); m.whoosh(A + 0.1, 0.6, 0.1); m.whoosh(A + 1.7, 0.6, 0.1); m.golpe(A + 1.9, 0.25, 85);
for (let i = 0; i < 14; i++) m.tic(Er + 0.2 + i * 0.25, 0.12, 2200 + (i % 3) * 400);  // H+ contra los cristales
m.cruje(Er + 1.0, 0.7); m.cruje(Er + 2.6, 0.5);                                      // se sueltan los iones
for (let i = 0; i < 7; i++) m.gota(Az + 0.9 + i * 0.25, 0.12, 700);                   // caen los cubos
for (let i = 0; i < 7; i++) m.tic(Az + 1.2 + i * 0.25, 0.1, 1200);                    // las bacterias se los comen
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 20; i++) m.tic(Es + 2.6 + i * 0.075, 0.08, 1600 + (i % 4) * 200);  // conteo de 379 bebidas
m.golpe(Es + 4.3, 0.3, 100);
m.whoosh(estMid, 0.6, 0.1); m.golpe(estMid + 0.3, 0.4, 70); m.gota(estMid + 1.2, 0.15, 1000);
m.gota(Co + 0.2, 0.15, 900); m.tic(Co + 1.6, 0.25, 900); m.tic(Co + 1.75, 0.25, 900); m.whoosh(Co + 3.6, 0.8, 0.1); // enjuague, cepillo, sorbo
m.metal(D + 0.6, 0.1, 800);
for (let i = 0; i < 9; i++) m.tic(D + 1.6 + i * 0.33, 0.12, 1500);                    // tic-tac del reloj
m.whoosh(D + 4.5, 0.6, 0.1); m.nota(D + 5.0, 69, 0.06, 0.8);
m.nota(Ci + 0.3, 57, 0.06, 1.2); m.golpe(Ci + 1.4, 0.3, 80);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
