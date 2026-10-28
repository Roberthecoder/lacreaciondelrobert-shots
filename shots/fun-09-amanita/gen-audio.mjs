// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #09 (Amanita phalloides). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Amanita base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 9);
const K = m.K;
const G = K.Gancho, A = K.Amanita, Mi = K.Mitos, Co = K.Cocinar, Cg = K.Congelar, P = K.Pregunta, H = K.Higado, Es = K.Estudio, R = K.Retraso, Tr = K.Trampa, Ts = K.Trasplante, S = K.Sirve, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55], 0.2);
for (let i = 0; i < 8; i++) m.burbuja(G + i * 0.15, 0.08, 300 + (i % 3) * 60); // el caldo hierve
m.metal(G + 0.3, 0.2, 1500); m.whoosh(G + 0.3, 0.8, 0.1);                   // sale la cuchara
m.golpe(G + 3.0, 0.5, 70);                                                   // ¡MITO!
m.sube(A, 1.6, 45, 52, 0.04); m.nota(A + 1.2, 52, 0.06, 1.0, 0.5);          // crece la amanita (nota oscura)
for (let i = 0; i < 4; i++) { m.nota(Mi + 0.2 + i * 0.6, 60, 0.04, 0.4); m.cruje(Mi + 2.6 + i * 0.4, 0.2); } // mitos tachados
for (let i = 0; i < 10; i++) m.burbuja(Co + 0.2 + i * 0.3, 0.07, 260 + i * 15); // hierve
for (let i = 0; i < 6; i++) m.tic(Co + 1.6 + i * 0.15, 0.12, 900);           // las toxinas siguen ahí
m.zumbido(Cg, 2.5, 0.03, 90); m.metal(Cg + 0.4, 0.12, 2400);                 // congelador
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.latido(H + 0.3, 0.2); m.latido(H + 1.1, 0.2); m.latido(H + 1.9, 0.2);       // la célula trabaja
m.golpe(H + 2.8, 0.45, 60); m.cruje(H + 2.9, 0.3);                           // la amanitina la frena
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 14; i++) m.tic(Es + 1.2 + i * 0.1, 0.08, 1500);          // 14 personas
for (let i = 0; i < 10; i++) m.tic(R + 0.3 + i * 0.32, 0.06, 2600);          // el reloj corre
m.sube(Tr, 1.2, 57, 45, 0.04); m.sube(Tr + 1.0, 1.0, 45, 57, 0.04); m.sube(Tr + 2.0, 1.2, 57, 40, 0.05); // baja, sube, se desploma
for (let i = 0; i < 3; i++) m.golpe(Ts + 0.8 + i * 0.3, 0.3, 90);            // 3 trasplantes
m.whoosh(S + 0.3, 0.9, 0.1); m.nota(S + 1.2, 72, 0.06, 0.8); m.nota(S + 2.4, 76, 0.05, 0.8);
m.cruje(C + 0.8, 0.3); m.nota(C + 1.4, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
