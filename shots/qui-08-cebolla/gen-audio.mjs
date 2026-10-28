// gen-audio.mjs — cama grave + efectos del Shot Químico #08 (cebolla y lágrimas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cebolla base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 88);
const K = m.K;
const G = K.Gancho, Ce = K.Celula, Co = K.Corte, Ac = K.Acido, Ga = K.Gas, De = K.Defensa, Pr = K.Pregunta, Ja = K.Japon, Si = K.Sinlagrimas, Cr = K.Crispr, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.golpe(G + 0.4, 0.5, 90); m.cruje(G + 0.4, 0.3);                                  // el cuchillo corta
m.zumbido(G + 0.6, 2.6, 0.03, 300); m.whoosh(G + 0.6, 2.4, 0.08);                  // sube el gas
m.nota(Ce + 0.6, 72, 0.05, 0.6); m.nota(Ce + 1.4, 64, 0.05, 0.6);
m.whoosh(Co, 1.2, 0.15); m.cruje(Co + 0.4, 0.4);                                   // se rompe la célula
for (let i = 0; i < 9; i++) m.metal(Ac + 0.1 + i * 0.08, 0.05, 2400);              // tijeras
for (let i = 0; i < 9; i++) m.burbuja(Ga + 0.5 + i * 0.12, 0.08, 700);             // se vuelven gas
m.zumbido(Ga + 1.4, 3.0, 0.03, 320);
for (let i = 0; i < 4; i++) m.gota(Ga + 4.6 + i * 0.35, 0.18, 1100);               // lágrimas
m.golpe(De + 0.4, 0.3, 100); m.whoosh(De + 1.8, 1.6, 0.08);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Ja + 0.2, 0.35, 80);
m.zumbido(Si + 0.2, 2.2, 0.04, 140);                                                // haz de iones
m.sube(Si + 2.6, 1.0, 69, 57, 0.05);
for (let i = 0; i < 20; i++) m.tic(Si + 4.0 + i * 0.08, 0.04, 2400);               // 20 caritas
m.metal(Cr + 1.0, 0.12, 1500); m.pad(Cr + 2.4, Ci, 0.03, [40, 46], 0.5); m.golpe(Cr + 4.0, 0.35, 70);
m.whoosh(Ci + 0.3, 1.2, 0.08); m.nota(Ci + 1.0, 72, 0.06, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
