// gen-audio.mjs — cama grave + efectos del Shot Químico #36 (agua pura e iones). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot AguaPura base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 36);
const K = m.K;
const G = K.Gancho, Q = K.Que, Io = K.Iones, Pu = K.Pura, Pr = K.Pregunta, Re = K.Real, Es = K.Estudio, Cu = K.Cuerpo, Pe = K.Peligro, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.zumbido(0, Ou, 0.018, 120);                                                          // cama eléctrica suave
m.metal(G + 0.05, 0.12, 900); m.metal(G + 0.1, 0.1, 760);                             // las varillas entran al agua
m.sube(G + 0.45, 0.5, 60, 84, 0.07); m.tic(G + 0.9, 0.2, 2600);                        // "zing": la aguja del agua de mar al tope
m.tic(G + 1.2, 0.05, 1200);                                                            // la del agua pura apenas tiembla
m.golpe(Q + 1.6, 0.3, 90);                                                             // tachón
m.whoosh(Q + 1.8, 0.6, 0.08);                                                          // se abre la lupa
for (let i = 0; i < 16; i++) m.tic(Io + 0.4 + i * 0.08, 0.06, 1800 + (i % 4) * 300);  // el cubito de sal se deshace
m.zumbido(Io + 3.6, 2.8, 0.05, 220);                                                   // la corriente circula
for (let i = 0; i < 8; i++) m.tic(Io + 4.0 + i * 0.3, 0.07, 3000);                     // chispitas en las placas
m.nota(Pu + 0.9, 76, 0.06, 0.5); m.nota(Pu + 2.6, 79, 0.06, 0.5);                      // una molécula se parte (rara vez)
m.sube(Pr + 0.1, 1.6, 50, 62, 0.05); m.gota(Pr + 0.6, 0.15, 900);
m.gota(Re + 0.4, 0.2, 1000); m.burbuja(Re + 2.1, 0.12, 500); m.cruje(Re + 3.8, 0.25);  // llave · alberca · suelo
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) { m.whoosh(Es + 3.8 + i * 0.5, 0.5, 0.04); m.burbuja(Es + 5.0 + i * 0.5, 0.1, 600); } // CO2 que entra
m.sube(Es + 5.0, 2.5, 55, 67, 0.04);                                                   // la aguja sube
m.latido(Cu + 0.4, 0.2); m.latido(Cu + 1.2, 0.18); m.whoosh(Cu + 0.8, 0.6, 0.06);
for (let i = 0; i < 3; i++) m.zumbido(Pe + 0.3 + i * 0.8, 0.5, 0.05, 300);             // alerta (sin sonido de descarga)
m.golpe(Pe + 1.5, 0.3, 90); m.golpe(Pe + 2.1, 0.3, 90);
m.sube(Ci + 0.6, 0.6, 55, 72, 0.05); m.tic(Ci + 1.2, 0.12, 2200);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
