// gen-audio.mjs — cama grave + efectos del Shot IA #13 (estudiar con ChatGPT: mejor en la práctica, peor en el examen).
// Sin costo: todo se calcula (audio-kit.mjs). La cama se "tapa" mientras dura el problema (examen → pregunta → muleta) y se libera con el tutor.
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot TareaChatGPT base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 13);
const K = m.K;
const G = K.Gancho, Mi = K.Mito, E = K.Estudio, Gr = K.Grupos, Ex = K.Examen, P = K.Pregunta, Mu = K.Muleta, Er = K.Errores, Tu = K.Tutor, C = K.Cierre, Ou = K.Outro;
const exA = Ex + 3.35, erB = Er + 3.5;

m.pad(0, Ex, 0.05, [43, 50, 55]);
m.pad(Ex, Tu, 0.045, [41, 48, 53], 0.5);                                             // tensa: examen, pregunta, muleta, errores
m.pad(Tu, Ou + 3.5, 0.05, [43, 50, 55, 59]);                                      // se suelta con el tutor
// gancho
for (let i = 0; i < 3; i++) m.tic(G + 0.05 + i * 0.08, 0.12, 1800);              // el chat escribe
for (let i = 0; i < 4; i++) m.nota(G + 0.35 + i * 0.6, 72 + i * 2, 0.06, 0.4);    // palomitas
m.sube(G + 2.6, 0.9, 55, 79, 0.05);                                               // +48 %
m.whoosh(G + 4.7, 0.5, 0.12); m.golpe(G + 5.1, 0.55, 55);                         // se voltea a −17 %
m.nota(G + 5.6, 72, 0.05, 0.4); m.golpe(G + 6.0, 0.25, 90); m.golpe(G + 6.4, 0.25, 90); m.nota(G + 6.8, 72, 0.05, 0.4);
// mito
m.golpe(Mi + 0.2, 0.3, 80); m.cruje(Mi + 1.1, 0.3);
// estudio
m.golpe(E + 0.15, 0.35, 80);
for (let i = 0; i < 30; i++) m.tic(E + 0.6 + i * 0.08, 0.04, 1600 + (i % 6) * 150); // la multitud se llena
// grupos
m.burbuja(Gr + 0.3, 0.15, 500); m.burbuja(Gr + 2.3, 0.15, 650); m.nota(Gr + 2.9, 84, 0.05, 0.5); m.burbuja(Gr + 3.8, 0.15, 800);
// examen
m.whoosh(Ex + 0.3, 0.6, 0.14); m.golpe(Ex + 1.2, 0.3, 70); m.golpe(Ex + 2.0, 0.3, 70);
m.sube(exA + 0.4, 1.0, 52, 64, 0.04); m.sube(exA + 1.4, 1.0, 52, 59, 0.04); m.golpe(exA + 2.3, 0.4, 55);
// pregunta
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
// muleta: el chat va y viene, se copia
for (let k = 0; k < 7; k++) m.burbuja(Mu + 0.2 + k * 0.6, 0.12, k % 2 ? 420 : 620);
for (let i = 0; i < 4; i++) m.nota(Mu + 1.9 + i * 0.5, 67, 0.035, 0.3, 0.6);
m.golpe(Mu + 4.4, 0.45, 60);                                                      // aparece la muleta
// errores
m.metal(Er + 0.2, 0.15); for (let i = 0; i < 10; i++) m.tic(Er + 0.2 + i * 0.22, 0.05, 3000);  // moneda que gira
m.sube(Er + 0.4, 0.9, 52, 70, 0.04);                                              // 51 %
m.burbuja(erB + 0.5, 0.12, 400); m.burbuja(erB + 0.7, 0.12, 500); m.golpe(erB + 1.2, 0.3, 70);
// tutor
m.nota(Tu + 0.8, 79, 0.06, 0.8); m.nota(Tu + 0.85, 84, 0.05, 0.8);              // se enciende el foco
m.nota(Tu + 1.2, 72, 0.05, 0.4); m.golpe(Tu + 1.9, 0.25, 90);
m.sube(Tu + 3.5, 1.0, 52, 64, 0.04); m.sube(Tu + 4.2, 1.0, 52, 64, 0.04); m.nota(Tu + 5.2, 76, 0.05, 0.6);
// cierre
m.burbuja(C + 0.4, 0.13, 620); m.burbuja(C + 1.3, 0.13, 450);
for (let i = 0; i < 4; i++) m.nota(C + 2.0 + i * 0.45, 72 + i * 2, 0.06, 0.4);
m.cruje(C + 2.9, 0.35); m.nota(C + 3.2, 72, 0.06, 0.8); m.nota(C + 3.25, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
