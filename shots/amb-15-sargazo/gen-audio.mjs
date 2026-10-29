// gen-audio.mjs — cama grave + efectos del Shot Ambiental #15 (sargazo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sargazo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 115);
const K = m.K;
const G = K.Gancho, Al = K.Alga, Ci = K.Cinturon, Cf = K.Cifra, H = K.Hoy, P = K.Pregunta, E = K.Estudio, N = K.Nitrogeno, Pl = K.Playa, M = K.Muertes, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G, 0.9, 0.18); m.golpe(G + 0.8, 0.3, 70);                                     // la ola deja el sargazo
m.cruje(G + 2.4, 0.4);                                                                  // se tacha "BASURA"
m.whoosh(Al + 0.1, 0.5, 0.1); for (let i = 0; i < 6; i++) m.burbuja(Al + 0.7 + i * 0.3, 0.07, 420 + i * 30);   // vesículas de gas
for (let i = 0; i < 8; i++) m.tic(Ci + 0.6 + i * 0.5, 0.05, 2600);                      // el satélite que escanea
m.sube(Ci + 0.6, 4.0, 48, 55, 0.04);                                                    // el cinturón que se dibuja
m.sube(Cf + 0.3, 1.7, 52, 64, 0.05); m.golpe(Cf + 2.8, 0.3, 90);                        // la regla de 8,850 km
m.golpe(H + 0.3, 0.25, 80); m.sube(H + 1.3, 1.3, 50, 62, 0.05); m.golpe(H + 2.6, 0.35, 60);   // las dos barras
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.nota(E + 0.2, 64, 0.06, 0.9);
for (let i = 0; i < 10; i++) m.burbuja(E + 2.8 + i * 0.3, 0.06, 300 + (i % 3) * 60);   // fósforo que sube
for (let i = 0; i < 8; i++) m.nota(N + 1.0 + i * 0.35, 72 + (i % 3) * 3, 0.03, 0.3);   // chispitas de nitrógeno
for (let i = 0; i < 14; i++) m.tic(Pl + 0.3 + i * 0.23, 0.05, 1400);                    // reloj de 48 h
for (let i = 0; i < 8; i++) m.burbuja(Pl + 1.4 + i * 0.4, 0.08, 200);                   // burbujeo del gas
m.sube(M + 0.4, 2.6, 55, 43, 0.06);                                                     // baja el oxígeno
for (let i = 0; i < 5; i++) m.golpe(M + 1.2 + i * 0.45, 0.15, 60);                      // cada animal que muere
m.whoosh(C, 0.8, 0.12); for (let i = 0; i < 4; i++) m.gota(C + 0.8 + i * 0.4, 0.08, 800 + i * 60);   // mar abierto
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
