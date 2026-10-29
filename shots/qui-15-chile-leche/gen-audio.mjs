// gen-audio.mjs — cama grave + efectos del Shot Químico #15 (chile, agua y leche). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chile base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 115);
const K = m.K;
const G = K.Gancho, Q = K.Que, Se = K.Sensor, En = K.Engano, Ag = K.Agua, Pr = K.Pregunta, Es = K.Estudio, Re = K.Resultado, Pt = K.Proteina, No = K.Nobel, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.4, 0.1); m.cruje(G + 0.42, 0.7);                                      // llega el chile y la mordida
m.zumbido(G + 0.6, 1.6, 0.05, 140);                                                   // chisporroteo del ardor
m.golpe(G + 1.8, 0.25, 90);                                                           // se tacha "es calor"
for (let i = 0; i < 3; i++) m.nota(Q + 0.4 + i * 0.5, 64 + i * 3, 0.05, 0.5);         // salen las capsaicinas
m.whoosh(Q + 2.4, 0.5, 0.08);                                                         // aparece el jalapeño
m.whoosh(Se + 0.8, 0.7, 0.08); m.tic(Se + 1.6, 0.25, 1600); m.zumbido(Se + 2.0, 1.6, 0.06, 220); // flama, clic del canal, señal
m.tic(En + 1.4, 0.25, 1600); m.zumbido(En + 1.7, 1.5, 0.06, 220); m.golpe(En + 2.4, 0.25, 70);  // la capsaicina abre el canal; cerebro
for (let i = 0; i < 14; i++) m.gota(Ag + 0.2 + i * 0.13, 0.12, 900 + (i % 4) * 80);   // chorro de agua
m.nota(Ag + 1.0, 60, 0.05, 0.8);                                                      // la gota que no se mezcla
m.sube(Pr + 0.05, 1.5, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 7; i++) m.tic(Es + 3.0 + i * 0.55, 0.15, 1300 + i * 60);           // ronda por ronda
for (let i = 0; i < 8; i++) m.nota(Re + 0.3 + i * 0.15, 57 + (i % 5) * 2, 0.04, 0.4); // las barras suben
m.nota(Re + 2.3, 69, 0.07, 0.9); m.nota(Re + 2.3, 76, 0.05, 0.9);                     // ganan la leche y el agua de sabor
m.golpe(Pt + 0.6, 0.25, 90);                                                          // "="
for (let i = 0; i < 3; i++) m.burbuja(Pt + 3.2 + i * 0.3, 0.1, 500);                  // la caseína atrapa capsaicina
m.golpe(No + 0.2, 0.35, 80); m.metal(No + 3.3, 0.18, 900); m.metal(No + 3.5, 0.12, 1200); // tarjeta y medalla
m.whoosh(Ci + 0.2, 0.6, 0.08);
for (let i = 0; i < 12; i++) m.burbuja(Ci + 0.9 + i * 0.2, 0.06, 420);                // "glu-glu" de la leche
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
