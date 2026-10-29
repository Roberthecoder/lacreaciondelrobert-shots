// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #44 (síndrome de nariz blanca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nariz Blanca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, Cu = K.Cueva, H = K.Hongo, P = K.Piel, D = K.Despierta, Q = K.Pregunta, Gr = K.Grasa, E = K.Estudio, F = K.Foto, Mi = K.Millones, Eu = K.Europa, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.25);                                  // cama fría de cueva, tapada
for (let i = 0; i < 10; i++) m.tic(G + 0.05 + i * 0.2, 0.06, 3200 + (i % 3) * 400); // copos de escarcha
m.cruje(G + 2.2, 0.25);                                                        // «¿escarcha?» tachada
m.golpe(G + 2.6, 0.45, 70);                                                    // sello HONGO
for (let i = 0; i < 4; i++) m.gota(Cu + 0.3 + i * 0.8, 0.12, 700 + i * 60);   // goteo de la cueva
m.sube(Cu + 0.6, 2.0, 60, 48, 0.04);                                           // el cuerpo se enfría
m.sube(H, 2.4, 45, 55, 0.035); for (let i = 0; i < 9; i++) m.tic(H + 0.8 + i * 0.12, 0.07, 1800); // hifas y conidios
for (let i = 0; i < 4; i++) m.cruje(P + 0.5 + i * 0.25, 0.18);                 // las hifas entran a la piel
m.whoosh(D + 0.2, 0.5, 0.14); for (let i = 0; i < 4; i++) m.nota(D + 0.25 + i * 0.35, 76, 0.05, 0.25); // ¡despierta!
m.sube(Q + 0.1, 1.5, 52, 64, 0.05);
[0.25, 0.55, 0.82].forEach((w) => { m.nota(Gr + 0.4 + w * 3.4, 72, 0.05, 0.3); m.bajo(Gr + 0.4 + w * 3.4, 40, 0.1, 0.3); }); // sano: pocos despertares
[0.08, 0.17, 0.26, 0.35, 0.44, 0.53, 0.62, 0.7].forEach((w) => { m.nota(Gr + 4.0 + w * 3.9, 74, 0.045, 0.2); m.bajo(Gr + 4.0 + w * 3.9, 38, 0.08, 0.2); }); // enfermo: muchos
m.sube(Gr + 6.4, 1.0, 50, 38, 0.05);                                           // sin grasa
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 16; i++) m.tic(E + 3.2 + i * 0.09, 0.07, 1500);            // 16 días
for (let i = 0; i < 8; i++) m.tic(E + 5.2 + i * 0.09, 0.07, 1100);             // 8 días
m.whoosh(F, 0.6, 0.12); m.metal(F + 0.18, 0.12, 2600);                          // flash de la foto
m.golpe(Mi + 0.1, 0.4, 60);
for (let i = 0; i < 3; i++) m.sube(Mi + 3.0 + i * 0.4, 1.2, 55, 40, 0.04);     // tres barras que caen
m.nota(Eu + 0.4, 64, 0.05, 1.0); m.whoosh(Eu + 2.8, 1.0, 0.1);                 // Europa → América
m.latido(Mx + 1.2, 0.2); m.latido(Mx + 2.0, 0.2); m.latido(Mx + 2.8, 0.18);   // punto en Oaxaca
m.cruje(C + 0.7, 0.3); m.nota(C + 1.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
