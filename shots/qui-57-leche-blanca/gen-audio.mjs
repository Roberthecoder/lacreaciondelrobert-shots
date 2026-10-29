// gen-audio.mjs — cama grave + efectos del Shot Químico #57 (por qué la leche es blanca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Leche base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 57);
const K = m.K;
const G = K.Gancho, Bo = K.Bolitas, Re = K.Rebote, Bl = K.Blanco, Pr = K.Pregunta, Az = K.Azul, Es = K.Estudio, Rs = K.Resultado, Ro = K.Rojo, Ra = K.Rayo, Ci = K.Cierre, Ou = K.Outro;
const mitadRo = Ro + 1.9;
// cuándo llega el rayo a cada rebote (mismo cálculo que el jsx)
const fracs = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L.map((v) => v / L[L.length - 1]); };
const REB = [[-40, 760], [300, 735], [470, 930], [300, 1040], [560, 1120], [740, 960], [610, 780], [820, 700], [930, 860]];
const ZZA = [[-40, 700], [250, 690], [380, 880], [230, 990], [470, 1060], [600, 860], [760, 1000], [690, 1180], [900, 1090], [1120, 1150]];
const ZZG = [[-40, 1000], [330, 990], [430, 1090], [360, 900], [470, 960], [410, 1130], [520, 860], [1100, 640]];

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G - 0.2, 2.4, 0.07);                                                          // chorro de leche
for (let i = 0; i < 10; i++) m.gota(G + 0.2 + i * 0.22, 0.06, 500 + i * 30);           // el vaso se llena
m.golpe(G + 1.6, 0.25, 90);                                                            // se tacha "¿pintura blanca?"
fracs(ZZG).slice(1, -1).forEach((f, i) => m.tic(G + 2.7 + f * 1.9, 0.12, 2600 + i * 120)); // primeros rebotes en el vaso
m.whoosh(Bo - 0.3, 0.7, 0.12);                                                         // entrar al microscopio
m.nota(Bo + 0.6, 57, 0.06, 0.8); m.nota(Bo + 1.9, 64, 0.06, 0.8);                      // grasa, micela
m.burbuja(Bo + 3.6, 0.1, 400); for (let i = 0; i < 6; i++) m.tic(Bo + 4.2 + i * 0.08, 0.06, 3200); // la micela crece, sus iones
fracs(REB).slice(1, -1).forEach((f, i) => { const t = Re + 0.3 + f * 4.3; m.tic(t, 0.18, 2200 + i * 150); m.nota(t, [69, 72, 74, 76, 79, 81, 84][i], 0.035, 0.4); }); // cada rebote
[64, 67, 71].forEach((n, i) => m.nota(Bl + 0.3 + i * 0.25, n, 0.06, 2.4));            // rojo, verde, azul → acorde
m.sube(Bl + 2.0, 0.6, 72, 79, 0.04);                                                  // el blanco en el ojo
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                  // re-gancho
m.whoosh(Az + 0.3, 1.8, 0.09);                                                        // la grasa se va
m.whoosh(Az + 2.4, 0.9, 0.06);                                                        // rojo pasa derecho
fracs(ZZA).slice(1, -1).forEach((f, i) => m.tic(Az + 2.6 + f * 2.8, 0.16, 2800 + i * 100)); // azul rebota y rebota
m.golpe(Es + 0.2, 0.35, 80);                                                          // tarjeta 2008
m.zumbido(Es + 1.0, 5.5, 0.03, 120);                                                  // la lámpara encendida
for (let i = 0; i < 8; i++) m.gota(Es + 3.0 + i * 0.35, 0.15, 900);                   // gotero de leche
m.nota(Rs + 0.2, 76, 0.06, 1.6); m.nota(Rs + 0.2, 81, 0.04, 1.6);                     // luz azul (agudo)
m.nota(Ro + 0.2, 48, 0.07, 1.8); m.nota(Ro + 0.2, 55, 0.05, 1.8);                     // luz rojiza (grave)
m.whoosh(mitadRo - 0.2, 0.8, 0.08); m.nota(mitadRo + 0.3, 57, 0.05, 2.2); m.nota(mitadRo + 0.3, 64, 0.04, 2.2); // el atardecer
m.golpe(Ra + 0.2, 0.35, 80);                                                          // tarjeta 2007
for (let i = 0; i < 46; i++) m.tic(Ra + 3.0 + i * ((Ci - 0.2 - Ra - 3.0) / 46), 0.05 + (i % 5 === 0 ? 0.04 : 0), 2400 + (i % 7) * 200); // miles de rebotes (simulación)
for (let i = 0; i < 12; i++) m.tic(Ci + 0.2 + i * 0.25, 0.08, 2600);                  // el vaso del inicio, rebotes
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
