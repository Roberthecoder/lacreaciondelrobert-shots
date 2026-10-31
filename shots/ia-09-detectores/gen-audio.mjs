// gen-audio.mjs — cama grave + efectos del Shot IA #09 (detectores de IA y escritores no nativos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Detectores base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, N = K.Nativos, E = K.Estudio, M = K.Marcas, P = K.Pregunta, Pr = K.Predecible, Pu = K.Prueba, Tr = K.Trampa, R = K.Riesgo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.1, 0.3, 0.12); m.golpe(G + 0.7, 0.55, 60);                        // cae el sello "IA"
m.sube(G + 3.6, 1.0, 52, 73, 0.04);                                               // 61.3 %
m.whoosh(N, 0.5, 0.12); m.sube(N + 0.4, 1.1, 52, 73, 0.04); m.nota(N + 1.8, 60, 0.05, 0.5);
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 7; i++) m.tic(E + 1.4 + i * 0.15, 0.14, 1400 + i * 90);       // 7 detectores
for (let i = 0; i < 30; i++) m.tic(M + 0.3 + i * 0.09, 0.05, 2000 + (i % 5) * 120); // hojas que se marcan
for (let i = 0; i < 6; i++) m.golpe(M + 3.6 + i * 0.27, 0.15, 70);                 // los siete a la vez
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(Pr + 0.5, 6.0, 0.02, 180);
m.sube(Pr + 1.6, 1.0, 52, 74, 0.04); m.sube(Pr + 3.6, 1.0, 52, 61, 0.04);           // medidores
m.whoosh(Pu, 0.5, 0.12); m.sube(Pu + 0.7, 1.1, 52, 73, 0.04); m.sube(Pu + 2.7, 1.1, 52, 59, 0.04);
m.burbuja(Tr + 0.4, 0.18, 500);                                                   // el sombrero
m.zumbido(Tr + 0.6, 1.4, 0.03, 300); m.nota(Tr + 2.0, 72, 0.06, 0.6); m.nota(Tr + 2.05, 76, 0.05, 0.6);  // "humano ✔"
m.golpe(R + 1.0, 0.3, 80);
m.cruje(C + 2.2, 0.35); m.nota(C + 2.8, 72, 0.06, 0.8); m.nota(C + 2.85, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
