// gen-audio.mjs — cama grave + efectos del Shot Ambiental #37 (curva de Keeling). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Keeling base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 37);
const K = m.K;
const G = K.Gancho, V = K.Volcan, Pp = K.Ppm, I = K.Inicio, Re = K.Respira, P = K.Pregunta, E = K.Estudio, H = K.Hoy, A = K.Antes, Vz = K.Volcanazo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// gancho: la línea se dibuja; un tic suave cada ~4 años y la nota sube con la curva
for (let i = 0; i < 17; i++) m.tic(G + 0.15 + i * 0.26, 0.035, 1400 + i * 30);
m.sube(G + 0.15, 4.4, 50, 62, 0.04);
m.whoosh(V + 0.1, 0.8, 0.1);                                                        // al volcán
for (let i = 0; i < 4; i++) m.whoosh(V + 1.0 + i * 0.9, 0.5, 0.03);                 // aire que entra a la toma
m.sube(V + 1.2, 1.2, 52, 64, 0.04); m.nota(V + 2.4, 64, 0.05, 0.6);                  // regla de 3,400 m
m.whoosh(Pp + 0.05, 0.7, 0.08); for (let i = 0; i < 8; i++) m.burbuja(Pp + 0.3 + i * 0.25, 0.04, 500 + (i % 4) * 80);   // moléculas
m.nota(Pp + 1.1, 69, 0.05, 0.5);                                                    // aparece el CO2
for (let i = 0; i < 4; i++) m.gota(Pp + 3.4 + i * 0.25, 0.08, 1200);                // los 4 de cada 10,000
m.golpe(I + 0.4, 0.3, 90); m.nota(I + 0.5, 57, 0.06, 0.8);                           // 313
for (let k = 0; k < 3; k++) { m.sube(Re + 0.2 + k * 2.0, 1.0, 52, 57, 0.04); m.sube(Re + 1.2 + k * 2.0, 1.0, 57, 52, 0.04); }  // respira
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.whoosh(E + 0.1, 0.6, 0.06); m.golpe(E + 0.3, 0.25, 110); m.nota(E + 3.4, 64, 0.05, 0.6); m.nota(E + 4.6, 67, 0.05, 0.6);
m.sube(H - 0.3, 2.1, 50, 64, 0.05); m.golpe(H + 1.9, 0.35, 70); m.nota(H + 2.0, 69, 0.06, 0.9);   // 427
m.cruje(A + 0.8, 0.25); for (let i = 0; i < 6; i++) m.burbuja(A + 1.0 + i * 0.3, 0.04, 700);     // hielo y burbujas
m.golpe(A + 4.4, 0.3, 60); m.whoosh(A + 4.5, 1.2, 0.05);                              // combustibles fósiles
m.golpe(Vz + 0.3, 0.6, 45); m.cruje(Vz + 0.4, 0.3); m.golpe(Vz + 0.9, 0.4, 50);      // erupción
m.whoosh(Vz + 2.2, 1.0, 0.06); m.nota(Vz + 3.1, 64, 0.05, 0.6);                      // a Maunakea
m.sube(C + 0.2, 2.0, 50, 62, 0.04); m.nota(C + 1.0, 64, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
