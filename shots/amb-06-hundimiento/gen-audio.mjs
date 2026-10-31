// gen-audio.mjs — cama grave + efectos del Shot Ambiental #06 (hundimiento de la CDMX). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hundimiento base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 66);
const K = m.K;
const G = K.Gancho, L = K.Lago, B = K.Bomba, Es = K.Esponja, P = K.Pregunta, Sa = K.Satelite, Ci = K.Cifra, U = K.Unas, H = K.Historia, Gr = K.Grietas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);
for (let i = 0; i < 14; i++) m.golpe(G + 0.1 + (3.1 * i) / 14, 0.18, 70 + i * 4);      // cada escalón que aparece (14)
m.sube(G + 0.1, 3.1, 57, 45, 0.04);                                                     // el suelo baja
m.whoosh(L + 0.1, 0.8, 0.12); for (let i = 0; i < 5; i++) m.gota(L + 0.8 + i * 0.5, 0.12, 700 + i * 60);
m.motor(B + 0.3, 4.2, 0.06); for (let i = 0; i < 8; i++) m.burbuja(B + 0.6 + i * 0.5, 0.08, 350);   // la bomba
m.cruje(Es + 0.6, 0.35); m.sube(Es + 0.4, 2.6, 52, 40, 0.05);                           // el lodo se aplasta
m.sube(P + 0.05, 1.4, 52, 64, 0.05);
m.whoosh(Sa + 0.1, 0.7, 0.12); for (let i = 0; i < 6; i++) m.zumbido(Sa + 1.6 + i * 0.6, 0.5, 0.04, 600);   // pulsos de radar
for (let i = 0; i < 4; i++) m.golpe(Ci + 0.6 + i * 0.35, 0.22, 60);                    // aparecen las manchas azules
m.nota(Ci + 2.0, 57, 0.07, 1.0);
m.sube(U + 0.2, 1.0, 64, 76, 0.04); m.sube(U + 0.2, 1.0, 64, 52, 0.05);                 // uñas contra suelo
m.golpe(H + 0.2, 0.35, 80); m.nota(H + 3.6, 52, 0.07, 1.2);
m.cruje(Gr + 0.2, 0.6); m.cruje(Gr + 1.2, 0.4); m.gota(Gr + 2.4, 0.15, 800);           // grietas y la tubería
for (let i = 0; i < 3; i++) m.nota(C + 0.3 + i * 0.3, [57, 64, 69][i], 0.06, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
