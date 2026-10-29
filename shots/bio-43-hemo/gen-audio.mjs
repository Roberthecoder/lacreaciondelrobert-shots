// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #43 (la hamburguesa vegetal que "sangra"). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hemo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 43);
const K = m.K;
const G = K.Gancho, Ha = K.Hamburguesa, He = K.Hemo, Sa = K.Sangre, No = K.Nodulos, Ox = K.Oxigeno, Pr = K.Pregunta,
  Le = K.Levadura, Ta = K.Tanque, Sb = K.Sabor, Es = K.Estudio, Co = K.Cocina, Ci = K.Cierre, Ou = K.Outro;
const chisporroteo = (a, b, dens = 7, g = 0.05) => { for (let t = a; t < b; t += 1 / dens) m.tic(t + ((t * 977) % 1) * 0.08, g, 2600 + ((t * 331) % 1) * 2400); };

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.5, 0.06);                                   // la espátula baja
m.gota(G + 0.75, 0.2, 700); m.gota(G + 1.3, 0.16, 520);          // la gota roja cae y hace charco
m.gota(G + 2.25, 0.18, 680); m.gota(G + 2.8, 0.14, 500);
m.nota(Ha + 0.4, 64, 0.05, 0.6);                                 // chip "vegetal"
m.whoosh(He + 0.2, 0.7, 0.07);                                   // la lupa se abre
m.metal(He + 1.0, 0.16, 1200);                                   // brilla el hierro
for (let i = 0; i < 3; i++) m.nota(Sa + 0.1 + i * 0.5, 57 + i * 3, 0.05, 0.5);   // las 3 tarjetas
for (let i = 0; i < 4; i++) m.nota(Sa + 1.6 + i * 0.25, 69 + i * 2, 0.06, 0.4);  // 4 notas = 4 hemos de la hemoglobina
m.cruje(No + 2.0, 0.5);                                          // se corta el nódulo
m.nota(No + 2.6, 72, 0.05, 0.9);
m.whoosh(Ox + 0.1, 0.7, 0.07);                                   // lupa del nódulo
for (let i = 0; i < 8; i++) m.burbuja(Ox + 0.8 + i * 0.4, 0.05, 900 + (i % 3) * 120);  // O₂ que entra
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                             // re-gancho
m.tic(Le + 2.3, 0.12, 1500);                                     // el gen entra a la levadura
for (let i = 0; i < 10; i++) m.nota(Le + 2.4 + i * 0.12, 64 + (i % 5) * 2, 0.025, 0.3);  // aparece la proteína
m.motor(Ta, 3.8, 0.05);                                          // el agitador del tanque
for (let i = 0; i < 18; i++) m.burbuja(Ta + 0.2 + i * 0.2, 0.06, 600 + (i % 5) * 90);
chisporroteo(Sb, Es - 0.2, 8, 0.04);                             // la sartén
m.whoosh(Sb + 0.4, 0.7, 0.07);
m.sube(Sb + 1.0, 1.4, 55, 62, 0.04);                             // la proteína se abre
for (let i = 0; i < 6; i++) m.nota(Sb + 2.4 + i * 0.35, 67 + (i % 3) * 3, 0.04, 0.5);  // moléculas que llegan al hemo
m.golpe(Es + 0.2, 0.3, 85);                                      // tarjeta 2018
m.golpe(Es + 3.4, 0.4, 75);                                      // sello 2019
chisporroteo(Co, Ci, 9, 0.045);
m.pad(Co, Ci, 0.02, [52, 57], 0.5);
m.nota(Ci + 1.0, 64, 0.05, 0.6); m.nota(Ci + 1.6, 69, 0.05, 0.6);  // las dos flechas del origen
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
