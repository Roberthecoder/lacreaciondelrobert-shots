// gen-audio.mjs — cama grave + efectos del Shot Ambiental #08 (vaquita marina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vaquita base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 88);
const K = m.K;
const G = K.Gancho, Q = K.Quien, P = K.Pregunta, To = K.Totoaba, V = K.Vejiga, Ca = K.Caida, E = K.Estudio, Cr = K.Crias, B = K.Bloques, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 7; i++) m.nota(G + 0.2 + (3.0 * i) / 7, [57, 60, 62, 64, 67, 69, 72][i], 0.07, 0.5);   // un dedo, una nota (7)
for (let i = 0; i < 3; i++) m.nota(G + 3.6 + i * 0.3, 74 + i * 2, 0.03, 0.5);                       // los 3 posibles, más bajito
for (let i = 0; i < 6; i++) m.burbuja(Q + 0.3 + i * 0.6, 0.06, 420);                                 // burbujas en el mar
m.golpe(Q + 3.0, 0.3, 90);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.whoosh(To + 0.2, 0.8, 0.1); m.cruje(To + 2.0, 0.35);                                               // cae la red
m.sube(V + 0.3, 0.8, 64, 70, 0.04); m.zumbido(V + 2.6, 2.0, 0.04, 110);
m.golpe(Ca + 0.4, 0.35, 70); m.sube(Ca + 0.4, 1.2, 69, 50, 0.06); m.golpe(Ca + 3.6, 0.3, 55);       // 567 → 59
m.motor(E + 0.2, 3.0, 0.05);
for (let i = 0; i < 10; i++) m.tic(E + 3.6 + i * 0.35, 0.08, 1400 + (i % 3) * 400);                   // clics de los detectores acústicos
m.nota(Cr + 0.4, 69, 0.07, 1.0); m.nota(Cr + 1.4, 76, 0.06, 1.0);                                    // Frida y su cría
for (let i = 0; i < 3; i++) m.golpe(B + 0.3 + i * 0.4, 0.25, 80);                                    // los bloques
m.metal(B + 1.6, 0.12, 700);
for (let i = 0; i < 4; i++) m.nota(C + 0.4 + i * 0.4, [64, 67, 69, 72][i], 0.06, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
