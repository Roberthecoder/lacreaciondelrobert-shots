// gen-audio.mjs — cama grave + efectos del Shot Ambiental #16 (ajolote de Xochimilco). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ajolote base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 16);
const K = m.K;
const G = K.Gancho, Ca = K.Casa, A = K.Antes, Cd = K.Caida, Cn = K.Cancha, P = K.Pregunta, Cs = K.Causas, Pe = K.Peces, R = K.Refugio, Rd = K.Redes, C = K.Cierre, Ou = K.Outro;

// cama grave: libre al inicio, más tapada mientras se vacía la cuadrícula y el canal se ensucia; se abre con los refugios
m.pad(0, Cd, 0.05, [45, 52, 57]);
m.pad(Cd, R, 0.05, [45, 52, 57], 0.6);
m.pad(R, Ou + 3.5, 0.05, [45, 52, 57], 0.2);
for (let i = 0; i < 8; i++) m.gota(G + 0.05 + i * 0.22, 0.12, 800 + i * 50);            // peceras que se encienden
m.whoosh(G + 2.9, 0.6, 0.12); m.golpe(G + 3.2, 0.3, 70);                                // 1 km² con 36
m.whoosh(Ca + 0.1, 0.7, 0.1); m.burbuja(Ca + 1.0, 0.1, 420); m.burbuja(Ca + 1.3, 0.08, 520);   // canales y lupa
for (let i = 0; i < 24; i++) m.nota(A + 0.3 + i * 0.085, m.ESC[i % m.ESC.length], 0.03, 0.4);  // la cuadrícula se llena (6,000)
m.sube(Cd + 0.2, 1.2, 69, 50, 0.06); m.golpe(Cd + 1.4, 0.3, 60);                       // 2008: 100
m.sube(Cd + 2.2, 0.8, 52, 45, 0.06); m.golpe(Cd + 3.0, 0.35, 50);                      // 2014: 36
for (let k = 0; k < 4; k++) m.tic(Cn + 0.2 + k * 0.25, 0.12, 1500);                    // 4 canchas
m.sube(P + 0.05, 1.2, 52, 64, 0.05);
for (let k = 0; k < 4; k++) m.golpe(Cs + 0.4 + k * 0.25, 0.18, 110 + k * 10);          // edificios
m.cruje(Cs + 2.2, 0.25);                                                                // agua sucia
m.whoosh(Cs + 4.0, 0.8, 0.12); m.burbuja(Cs + 4.6, 0.1, 380);                          // llegan carpa y tilapia
for (let i = 0; i < 6; i++) m.burbuja(Pe + 1.4 + i * 0.3, 0.1, 300);  // huevos que desaparecen
m.golpe(Pe + 3.0, 0.2, 90);
m.golpe(R + 2.0, 0.4, 100); m.tic(R + 2.0, 0.2, 900); m.golpe(R + 2.8, 0.3, 110);      // ¡toc! contra el filtro
m.nota(R + 4.4, 72, 0.06, 0.8);                                                         // 0.5 %
m.whoosh(Rd + 0.3, 0.9, 0.12); for (let i = 0; i < 6; i++) m.gota(Rd + 1.7 + i * 0.2, 0.08, 1000);  // red que sale vacía
m.sube(Rd + 3.8, 0.9, 60, 76, 0.05); m.nota(Rd + 4.4, 76, 0.05, 1.0);                   // brillo del ADN
m.golpe(C + 0.2, 0.3, 80); for (let i = 0; i < 5; i++) m.gota(C + 1.7 + i * 0.15, 0.1, 800 + i * 60);   // caja de 1863 y peceras
for (let i = 0; i < 8; i++) m.gota(C + 4.0 + i * 0.22, 0.09, 800 + i * 50);           // regreso al globo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
