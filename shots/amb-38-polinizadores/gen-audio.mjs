// gen-audio.mjs — cama grave + efectos del Shot Ambiental #38 (polinizadores). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Polinizadores base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 38);
const K = m.K;
const G = K.Gancho, Pl = K.Plato, M = K.Maiz, Ca = K.Cacao, Cf = K.Cafe, P = K.Pregunta, Z = K.Zumbido, E = K.Estudio, To = K.Toneladas, Mo = K.Moscas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(Math.max(0, G - 0.2), 4.4, 0.07, 170);                                  // el abejorro cruza
m.golpe(G + 2.3, 0.25, 120);                                                        // se tacha el mito
[0.1, 0.75, 1.85, 2.45, 3.45, 3.95].forEach((d, i) => m.nota(Pl + d, [64, 67, 69, 72, 74, 76][i], 0.06, 0.6));   // un "tin" por alimento
m.whoosh(M + 0.2, 1.4, 0.16); m.whoosh(M + 2.4, 1.4, 0.12);                          // viento con polen
m.nota(M + 1.6, 72, 0.06, 0.8); m.nota(M + 1.75, 76, 0.05, 0.8);                    // palomita: se quedan
m.whoosh(Ca + 0.45, 0.5, 0.2); m.sube(Ca + 0.5, 0.8, 64, 52, 0.05);                 // puf: chocolate
for (let i = 0; i < 3; i++) m.zumbido(Ca + 1.5 + i * 0.9, 0.5, 0.025, 420);        // insecto diminuto
m.whoosh(Ca + 4.45, 0.5, 0.2); m.sube(Ca + 4.5, 0.8, 60, 48, 0.05);                 // puf: calabaza
m.gota(Cf + 0.9, 0.18, 700); m.sube(Cf + 0.8, 2.2, 57, 50, 0.04);                   // el café baja
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                                // pregunta
m.zumbido(Z + 0.3, 1.2, 0.05, 220);                                                 // llega el abejorro
m.zumbido(Z + 1.6, 4.4, 0.09, 330);                                                 // vibra: bzzz
for (let i = 0; i < 10; i++) m.burbuja(Z + 2.0 + i * 0.4, 0.04, 900);               // sale el polen por el poro
m.golpe(E + 0.2, 0.3, 90); m.nota(E + 0.5, 69, 0.05, 0.9);                          // tarjeta 2016
for (let i = 0; i < 3; i++) m.tic(E + 3.4 + i * 0.5, 0.12, 1700); m.tic(E + 5.0, 0.06, 1200);   // casillas
m.golpe(To + 0.2, 0.3, 70); m.sube(To + 0.2, 0.8, 52, 57, 0.04);                     // barra de la cosecha
m.cruje(To + 2.4, 0.25); m.nota(To + 2.6, 60, 0.06, 0.9);                            // el 5–8 %
m.zumbido(Mo + 0.3, 1.6, 0.06, 260);                                                 // la mosca
m.nota(Mo + 1.1, 76, 0.05, 0.6);
m.whoosh(C + 0.3, 0.6, 0.14); m.whoosh(C + 0.6, 0.6, 0.12);                         // el plato se vacía
[76, 74, 72, 69, 67, 64].forEach((n, i) => m.nota(C + 1.0 + i * 0.25, n, 0.045, 0.6));   // los "tin" al revés
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
