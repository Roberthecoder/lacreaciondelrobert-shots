// gen-audio.mjs — cama grave + efectos del Shot Científico #06 (bacterias casi 1 a 1). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bacterias base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 66);
const K = m.K;
const G = K.Gancho, O = K.Origen, L = K.Litro, Co = K.Colon, Q = K.Pregunta, H = K.Humanas, Cu = K.Cuenta, E = K.Estudio, P = K.Peso, B = K.Bano, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 10; i++) m.burbuja(G + 0.05 + i * 0.12, 0.08, 500 + i * 30);     // aparecen las 10 bacterias
m.cruje(G + 3.1, 0.3); m.whoosh(G + 3.0, 1.0, 0.12);                                   // 9 se van
m.nota(G + 3.7, 69, 0.07, 0.8);
m.tic(O + 0.6, 0.15, 1500); m.sube(O + 0.6, 1.0, 60, 67, 0.04);                      // se subraya la frase
for (let i = 0; i < 8; i++) m.burbuja(L + 0.3 + i * 0.15, 0.07, 450 + i * 20);       // el intestino se llena
m.whoosh(Co + 0.3, 1.0, 0.1); m.nota(Co + 1.0, 72, 0.06, 0.8);                       // solo queda el colon
m.sube(Q + 0.1, 1.4, 52, 64, 0.05);
m.golpe(H + 0.2, 0.3, 75);
for (let i = 0; i < 10; i++) m.tic(H + 2.4 + i * 0.2, 0.08, 2000 + (i % 4) * 150);   // la cuadrícula se llena
m.sube(Cu + 0.2, 1.0, 52, 62, 0.04); m.sube(Cu + 0.2, 1.0, 52, 64, 0.04); m.golpe(Cu + 1.3, 0.25, 70);
m.golpe(E + 0.25, 0.35, 80);
m.metal(P + 0.6, 0.12, 900); m.cruje(P + 3.0, 0.3);                                    // la báscula; se tacha "1 a 3 kg"
m.whoosh(B + 2.0, 1.4, 0.16); m.gota(B + 2.2, 0.2, 700);                                // la descarga
for (let i = 0; i < 14; i++) m.tic(C + 2.2 + i * 0.2, 0.07, 1800 + (i % 5) * 160);  // 30 contra 38
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
