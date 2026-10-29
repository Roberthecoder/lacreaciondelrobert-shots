// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #50 (teocintle → maíz). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Teocintle base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
const G = K.Gancho, Te = K.Teocintle, Mq = K.Mazorquita, Ma = K.Mazorca, Pr = K.Pregunta, Se = K.Seleccion, Ga = K.Tga1, Tb = K.Tb1,
  Es = K.Estudio, Ho = K.Hopscotch, De = K.Dependencia, Bi = K.Biotec, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                               // cama grave continua
m.whoosh(G + 0.02, 2.2, 0.06);                                                        // viento en la mata
m.whoosh(G + 0.3, 0.9, 0.05);                                                         // la tortilla se infla
m.metal(Te + 0.4, 0.06, 500); m.whoosh(Te + 1.0, 1.6, 0.05);                         // la cuenca se ilumina · el río corre
for (let i = 0; i < 4; i++) m.tic(Te + 1.6 + i * 0.3, 0.08, 1500);
for (let i = 0; i < 9; i++) { m.nota(Mq + 0.8 + i * 0.22, 60 + [0, 2, 4, 5, 7, 9, 11, 12, 14][i], 0.06, 0.4); m.tic(Mq + 0.8 + i * 0.22, 0.05, 900); } // un grano, una nota
m.cruje(Mq + 1.8, 0.4);                                                               // cáscara de piedra
for (let i = 0; i < 32; i++) m.tic(Ma + 0.5 + i * 0.05, 0.035, 1800 + (i % 5) * 200);  // conteo hacia 500
m.whoosh(Ma + 0.3, 0.6, 0.06);                                                        // las hojas de la mazorca
m.sube(Pr + 0.1, 1.6, 50, 62, 0.05);
for (let i = 0; i < 4; i++) m.nota(Se + 0.3 + i * 0.75, 55 + i * 4, 0.07, 0.6); // cada generación
m.whoosh(Ga + 0.2, 0.7, 0.07);                                                        // se abre la Lupa
m.nota(Ga + 0.8, 72, 0.05, 0.8);                                                      // se enciende tga1
m.cruje(Ga + 1.4, 0.5); m.metal(Ga + 2.6, 0.08, 900);                                 // la cáscara se abre
m.whoosh(Tb + 0.6, 2.4, 0.06);                                                        // las ramas se recogen
m.golpe(Es + 0.2, 0.3, 80);                                                           // sello de la tarjeta
for (let i = 0; i < 6; i++) m.whoosh(Es + 0.4 + i * 0.49, 0.3, 0.04);                 // la piedra de moler raspa
m.whoosh(Es + 3.4, 0.7, 0.07);                                                        // Lupa al microscopio
m.nota(Ho + 0.8, 67, 0.06, 0.8); m.nota(Ho + 1.6, 74, 0.06, 0.9);                    // la marca de tb1
m.golpe(De + 0.85, 0.35, 70);                                                         // la mazorca cae entera
for (let i = 0; i < 8; i++) m.tic(De + 0.5 + i * 0.12, 0.05, 1300);                    // el teocintle se desarma
for (let i = 0; i < 14; i++) m.nota(De + 1.6 + i * 0.14, 62 + (i % 4) * 2, 0.025, 0.3); // brotan apretados
for (let i = 0; i < 6; i++) m.tic(Bi + 0.3 + i * 0.37, 0.06, 1100);                    // semillas que caen
m.golpe(Bi + 1.3, 0.2, 120);                                                          // matraz tachado
m.whoosh(Ci + 0.02, 2.0, 0.05); m.golpe(Ci + 0.9, 0.2, 90);                           // viento · llega la mazorca
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
