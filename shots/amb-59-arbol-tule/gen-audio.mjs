// gen-audio.mjs — cama grave + efectos del Shot Ambiental #59 (árbol del Tule). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tule base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
const G = K.Gancho, Ci = K.Cinta, Ab = K.Abrazo, P = K.Pregunta, E = K.Estudio, A = K.Adn, Ed = K.Edad, Ag = K.Agua, Pa = K.Pantano, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);
m.cruje(G + 0.4, 0.5); m.golpe(G + 1.6, 0.35, 70);                                   // los troncos se juntan en uno
m.whoosh(Ci + 0.1, 0.7, 0.12); m.zumbido(Ci + 0.8, 2.5, 0.05, 240); m.nota(Ci + 3.3, 64, 0.06, 0.9);   // la cinta da la vuelta
for (let i = 0; i < 21; i++) m.burbuja(Ab + 0.3 + (i + 1) * 3.3 / 21, 0.07, 420 + (i % 5) * 60);      // 21 personas
m.nota(Ab + 3.7, 69, 0.06, 0.8);
m.sube(P + 0.2, 1.2, 52, 59, 0.05); m.cruje(P + 0.3, 0.3); m.sube(P + 3.6, 1.0, 59, 52, 0.04);
m.whoosh(E + 0.1, 0.6, 0.1); for (let i = 0; i < 6; i++) { m.tic(E + 0.4 + i / 6, 0.12, 1800); m.tic(E + 2.0 + i * 0.4, 0.18, 1200); }   // ramas 1–6 y cada hoja al tubo
for (let k = 0; k < 13; k++) m.tic(A + 0.3 + k * 2.7 / 14, 0.1, 2200 + (k % 3) * 200);                // bandas del gel
m.nota(A + 2.4, 64, 0.06, 0.9); m.nota(A + 4.4, 69, 0.06, 1.0);
m.tic(Ed + 0.3, 0.15, 900); m.tic(Ed + 0.8, 0.15, 900); m.tic(Ed + 1.3, 0.15, 900);
m.golpe(Ed + 2.5, 0.25, 110); m.golpe(Ed + 2.6, 0.25, 100); m.golpe(Ed + 2.7, 0.25, 90);              // se tachan
m.nota(Ed + 3.6, 60, 0.06, 1.0);
for (let i = 0; i < 6; i++) m.gota(Ag + 1.6 + i * 0.25, 0.1, 800 + i * 50);                           // aparece el agua
m.whoosh(Ag + 2.6, 0.5, 0.08);
for (let i = 0; i < 8; i++) m.burbuja(Pa + 0.4 + i * 0.15, 0.06, 300 + i * 30);                       // pantano
m.nota(Pa + 3.4, 64, 0.05, 1.2); m.nota(Pa + 3.4, 69, 0.04, 1.2);
m.cruje(C + 0.2, 0.3); for (let i = 0; i < 4; i++) m.gota(C + 1.2 + i * 0.9 + 0.5, 0.12, 750);         // gotas a las raíces
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
