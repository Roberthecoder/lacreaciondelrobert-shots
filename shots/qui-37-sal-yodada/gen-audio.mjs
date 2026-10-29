// gen-audio.mjs — cama grave + efectos del Shot Químico #37 (sal yodada, tiroides y bocio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot SalYodada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 37);
const K = m.K;
const G = K.Gancho, Ti = K.Tiroides, Tx = K.Tiroxina, Bo = K.Bocio, Em = K.Embarazo, Pr = K.Pregunta, Es = K.Estudio, Re = K.Resultado, Mx = K.Mexico, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 20; i++) m.tic(G + 0.1 + i * 0.12, 0.05, 2600 + (i % 3) * 300);   // la sal cae (salero sacudido)
m.nota(G + 1.0, 72, 0.06, 0.7);                                                         // brilla «yodada»
m.golpe(G + 1.9, 0.25, 90);                                                             // se tacha «¿adorno?»
m.whoosh(Ti + 0.8, 0.6, 0.06);                                                          // se abre la lupa
for (let i = 0; i < 8; i++) m.burbuja(Ti + 1.4 + i * 0.45, 0.05, 900 + (i % 3) * 80);  // el yodo entra a la tiroides
for (let i = 0; i < 4; i++) m.nota(Tx + 0.6 + i * 0.6, 60 + i * 4, 0.07, 0.4);           // clic de cada yodo (1·2·3·4)
m.pad(Bo + 0.2, Bo + 2.6, 0.03, [50], 0.7);                                             // falta yodo: se tapa
for (let i = 0; i < 6; i++) m.sube(Bo + 1.2 + i * 0.8, 0.5, 55, 60, 0.03);               // ondas de la hipófisis (TSH)
for (let i = 0; i < 4; i++) m.golpe(Bo + 2.6 + i * 0.6, 0.12, 60);                       // la tiroides crece (latido sordo)
m.whoosh(Em + 0.5, 0.6, 0.05);
for (let i = 0; i < 5; i++) m.nota(Em + 1.2 + i * 0.7, 67 + (i % 3) * 2, 0.04, 0.6);     // el cerebro se enciende
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);                                                            // tarjeta del estudio
for (let i = 0; i < 6; i++) m.tic(Es + 2.4 + i * 0.16, 0.05, 1800);                      // aparecen las niñas
for (let i = 0; i < 8; i++) m.gota(Es + 3.6 + i * 0.12, 0.12, 950);                      // el frasco reparte yodo
m.sube(Re + 0.6, 1.4, 48, 60, 0.05);                                                    // crecen las barras
for (let i = 0; i < 4; i++) m.tic(Re + 2.4 + i * 0.15, 0.06, 1500);                      // 1 de cada 4
m.nota(Re + 4.6, 76, 0.05, 0.8);                                                        // 2 de cada mil
m.metal(Mx + 1.0, 0.1, 600);                                                            // la báscula
for (let i = 0; i < 6; i++) m.burbuja(Mx + 1.2 + i * 0.12, 0.05, 1000);
m.nota(Mx + 4.0, 84, 0.04, 0.6); m.nota(Mx + 4.2, 88, 0.03, 0.6);                       // brilla el diente
for (let i = 0; i < 4; i++) m.tic(Da + 0.3 + i * 0.15, 0.06, 1200);                      // los yodos caen al platillo
m.golpe(Da + 1.5, 0.3, 70);                                                             // la balanza se inclina
m.whoosh(Ci + 0.6, 0.6, 0.05); m.nota(Ci + 1.3, 69, 0.06, 0.8);                         // flecha y mariposa sana
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
