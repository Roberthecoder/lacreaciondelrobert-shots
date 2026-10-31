// gen-audio.mjs — cama grave + efectos del Shot Químico #58 (olor a tierra mojada, geosmina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lluvia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 58);
const K = m.K;
const G = K.Gancho, Q = K.Que, N = K.Nariz, Cu = K.Cuchara, Pr = K.Pregunta, Es = K.Estudio, Bu = K.Burbujas, Ae = K.Aerosol, Ll = K.Llovizna, Co = K.Colembolos, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 8; i++) m.gota(G + 0.05 + i * 0.32 + 0.45, 0.2, 700 + (i % 4) * 60);  // gotas sobre la tierra seca
for (let i = 0; i < 12; i++) m.gota(G + 2.8 + i * 0.26 + 0.4, 0.12, 820);
m.whoosh(G + 1.4, 1.0, 0.1);                                                              // la nariz aspira
for (let i = 0; i < 7; i++) m.nota(Q - 0.3 + i * 0.25, [57, 60, 64, 67, 69, 72, 76][i], 0.04, 0.5); // las hifas crecen
for (let i = 0; i < 4; i++) m.tic(Q + 2.4 + i * 0.3, 0.12, 2200);                       // sale la geosmina
m.whoosh(N + 0.4, 0.7, 0.12);                                                             // aspira
m.sube(N + 0.6, 1.6, 57, 69, 0.04);                                                       // el medidor
m.gota(Cu + 1.0, 0.25, 600);                                                              // la cucharadita cae a la alberca
for (let i = 0; i < 20; i++) m.tic(Cu + 1.6 + i * 0.08, 0.06, 1800 + (i % 5) * 200);     // aparecen las albercas
m.golpe(Cu + 2.2, 0.3, 90);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 7; i++) m.gota(Es + 0.6 + i * 0.8 + 0.45, 0.18, 900);                // el gotero
for (let i = 0; i < 20; i++) m.tic(Es + 3.2 + i * 0.11, 0.05, 2600);                     // contador 600
m.whoosh(Bu, 0.6, 0.12); m.gota(Bu + 0.6, 0.3, 500);                                      // la gota cae y se aplasta
for (let i = 0; i < 6; i++) m.burbuja(Bu + 1.1 + i * 0.12, 0.07, 400 + i * 40);          // se forman burbujas
for (let i = 0; i < 6; i++) { m.burbuja(Bu + 2.6 + i * 0.25, 0.16, 900); m.tic(Bu + 2.62 + i * 0.25, 0.1, 3000); } // revientan: pop
for (let i = 0; i < 10; i++) m.nota(Ae + 0.3 + i * 0.5, [69, 72, 74, 76, 79][i % 5], 0.03, 0.8); // gotitas que flotan
m.golpe(Ae + 2.2, 0.2, 110);
for (let i = 0; i < 9; i++) m.gota(Ll - 0.3 + i * 0.42 + 0.55, 0.1, 950);                 // llovizna
m.motor(Ll + 0.2, 3.6, 0.05);                                                             // aguacero
m.metal(Ll + 0.6, 0.1, 900); m.golpe(Ll + 2.0, 0.25, 70);
m.golpe(Co + 0.3, 0.35, 80);
for (let i = 0; i < 14; i++) m.tic(Co + 3.2 + i * 0.1, 0.05, 1500);                      // pasitos del colémbolo
for (let i = 0; i < 6; i++) m.tic(Co + 4.6 + i * 0.16, 0.1, 900);                        // mordisquea
m.burbuja(Co + 6.0, 0.08, 300);
for (let i = 0; i < 6; i++) m.gota(Ci - 0.5 + i * 0.6 + 0.45, 0.12, 800);
m.nota(Ci + 1.4, 72, 0.05, 0.6); m.nota(Ci + 1.6, 76, 0.05, 0.8);                        // el letrerito
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
