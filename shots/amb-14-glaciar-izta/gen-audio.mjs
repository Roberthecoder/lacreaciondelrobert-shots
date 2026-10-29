// gen-audio.mjs — cama grave + efectos del Shot Ambiental #14 (el glaciar Ayoloco). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Glaciar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K;
const G = K.Gancho, A = K.Ayoloco, D = K.Doce, L = K.Linea, Cu = K.Cumbre, P = K.Pregunta, Po = K.Popo, Pl = K.Placa, O = K.Orizaba, Ci = K.Cinco, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                                   // cama grave y fría
for (let i = 0; i < 8; i++) m.gota(G + 0.3 + i * 0.35, 0.12, 820 + (i % 3) * 90);          // el hielo de la cumbre se derrite
m.metal(G + 2.5, 0.2, 760);                                                               // aparece la placa
m.whoosh(A + 0.1, 0.8, 0.1); m.nota(A + 0.9, 59, 0.05, 1.2);                              // la Mujer Dormida desde la ciudad
m.motor(D + 0.1, 2.3, 0.04);                                                   // avión de las fotos aéreas
for (let i = 0; i < 12; i++) m.tic(D + 0.5 + i * 0.13, 0.12, 2600);                       // 12 clics: 12 glaciares
for (let i = 0; i < 10; i++) m.nota(D + 3.2 + i * 0.06, 64 - i, 0.025, 0.3);              // se apagan
m.sube(L + 2.4, 3.0, 52, 64, 0.05);                                                       // la línea de equilibrio sube
for (let i = 0; i < 10; i++) m.gota(Cu + 0.2 + i * 0.4, 0.08, 900);                       // la cumbre gotea
m.golpe(Cu + 0.3, 0.3, 70);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.golpe(Po + 0.2, 0.5, 45); m.golpe(Po + 0.9, 0.35, 50);                                   // retumbo del Popo
m.cruje(Po + 1.2, 0.3); m.cruje(Po + 2.0, 0.25);                                           // el hielo se rompe
m.sube(Po + 1.0, 3.4, 60, 48, 0.04);
for (let i = 0; i < 8; i++) m.tic(Pl + 0.2 + i * 0.3, 0.06, 500 + (i % 2) * 120);          // pasos de los montañistas
m.metal(Pl + 2.1, 0.3, 700); m.golpe(Pl + 2.1, 0.25, 110);                                 // clavan la placa
m.nota(Pl + 3.1, 57, 0.06, 1.5); m.nota(Pl + 3.1, 64, 0.04, 1.5);
for (let i = 0; i < 25; i++) m.tic(O + 2.2 + i * 0.096, 0.05, 1800 - i * 30);             // 62 → 37 cuadritos
m.golpe(O + 2.6, 0.3, 60);
for (let i = 0; i < 5; i++) { m.tic(Ci + 1.4 + i * 0.7, 0.15, 1400); m.bajo(Ci + 1.4 + i * 0.7, 40 - i, 0.08, 0.5); }   // cuenta regresiva
m.metal(C + 0.6, 0.15, 760);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
