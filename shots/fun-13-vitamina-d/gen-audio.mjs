// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #13 (vitamina D). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vitamina D base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 13);
const K = m.K;
const G = K.Gancho, O = K.Oscuras, E = K.Ergosterol, L = K.Luz, Pi = K.Piel, P = K.Pregunta, Es = K.Estudio, R = K.Resultado, Sa = K.Salmon, H = K.Hora, Cu = K.Cuerpo, Tr = K.Truco, C = K.Cierre, Ou = K.Outro;

m.pad(0, O, 0.05, [45, 52, 57], 0);                       // cama cálida con sol
m.pad(O, E, 0.05, [45, 52, 57], 0.8);                     // a oscuras: tapada
m.pad(E, Ou + 3.2, 0.05, [45, 52, 57], 0.2);
m.whoosh(G + 0.1, 0.6, 0.12);                             // entra el rayo de sol
for (let i = 0; i < 8; i++) m.nota(G + 0.4 + i * 0.27, m.ESC[4 + i], 0.05, 0.4); // se encienden los focos
for (let i = 0; i < 12; i++) m.tic(O + 0.2 + i * 0.12 + (i >= 6 ? 0.18 : 0), 0.06, 700); // brotan en la oscuridad
m.zumbido(O + 0.4, 3, 0.03, 70);                          // cuarto de cultivo
m.golpe(O + 1.6, 0.25, 90);                               // chip: algunos ya traen luz UV
m.sube(E - 0.2, 0.8, 64, 52, 0.04);                       // bajamos al microscopio
for (let i = 0; i < 4; i++) m.burbuja(E + 0.6 + i * 0.2, 0.08, 500 + i * 80); // aparece el ergosterol
m.nota(E + 2.5, 64, 0.05, 0.8); m.nota(E + 2.7, 64, 0.05, 0.8); // se parecen
for (let i = 0; i < 3; i++) m.zumbido(L + 0.2 + i * 0.15, 1.0, 0.04, 380 + i * 60); // rayos UV
m.cruje(L + 1.4, 0.35);                                   // se abre el anillo B
m.whoosh(L + 3.0, 1.0, 0.1); m.nota(L + 4.0, 76, 0.07, 1.0); // gira y brilla: vitamina D2
m.whoosh(Pi + 0.2, 0.7, 0.08); m.nota(Pi + 0.8, 69, 0.05, 0.6); m.nota(Pi + 1.2, 72, 0.05, 0.6);
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(Es + 0.1, 0.35, 80);                              // tarjeta 2015
m.metal(Es + 1.5, 0.15, 1200);                            // la charola
for (let i = 0; i < 24; i++) m.tic(R + 0.1 + i * 0.1, 0.05, 2600); // corre el reloj hasta 15:00
m.sube(R + 0.3, 2.2, 57, 69, 0.05);                       // se llena el medidor
m.nota(R + 2.5, 81, 0.08, 1.0); m.nota(R + 2.5, 76, 0.05, 1.0); // ¡ding! 15 min
m.whoosh(Sa + 0.2, 0.6, 0.08);                            // entra el salmón
m.sube(Sa + 1.0, 0.8, 57, 72, 0.05); m.sube(Sa + 2.4, 0.7, 57, 69, 0.04); // las dos barras
m.sube(H + 0.2, 0.9, 52, 64, 0.04); m.nota(H + 1.2, 64, 0.04, 1.2); m.sube(H + 2.4, 0.5, 64, 55, 0.04); // sube, se estanca, baja
m.golpe(Cu + 0.2, 0.35, 80);                              // tarjeta 2013
for (let i = 0; i < 10; i++) m.burbuja(Cu + 3.4 + i * 0.28, 0.07, 350 + i * 25); // se llenan los tubos
m.nota(Cu + 5.2, 69, 0.05, 0.8);
m.tic(Tr + 0.2, 0.2, 900); m.tic(Tr + 0.35, 0.2, 900);   // cuchillo
for (let i = 0; i < 3; i++) m.nota(Tr + 0.8 + i * 0.3, 72 + i * 2, 0.05, 0.4);
m.golpe(Tr + 2.3, 0.3, 120);                              // puerta del refri
for (let i = 0; i < 7; i++) m.tic(Tr + 2.7 + i * 0.19, 0.08, 1800); // días que se tachan
m.whoosh(C + 0.2, 0.7, 0.1);
for (let i = 0; i < 4; i++) m.nota(C + 0.6 + i * 0.25, m.ESC[5 + i], 0.06, 0.6);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
