// gen-audio.mjs — cama grave + efectos del Shot Ambiental #20 (basura electrónica). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Basura Electronica base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 20);
const K = m.K;
const G = K.Gancho, Mo = K.Monton, Me = K.Metales, P = K.Pregunta, R = K.Reciclado, B = K.Bote, Mx = K.Mexico, C = K.Cajon, L = K.Litio, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ci, 0.05, [43, 50, 55], 0.5);                                                  // tapada mientras dura el problema
m.pad(Ci, Ou + 3.5, 0.05, [45, 52, 57]);                                                // se abre en el cierre
m.golpe(G + 0.02, 0.35, 90); for (let i = 0; i < 6; i++) m.tic(G + 0.2 + i * 0.12, 0.12, 1400 + i * 150);   // cajón que se abre, cosas que caen
m.zumbido(G + 1.3, 1.6, 0.04, 220); m.metal(G + 1.9, 0.12, 1200);                       // lupa: metal adentro
for (let i = 0; i < 13; i++) m.tic(Mo + i * 0.23, 0.1 + (i % 2) * 0.04, 700 + (i % 4) * 120); m.golpe(Mo + 3.0, 0.25, 70);   // el montón crece
m.nota(Mo + 0.4, 55, 0.06, 1.2, 0.4); m.whoosh(Mo + 3.3, 0.5, 0.08);                     // 62 millones; la persona
m.nota(Me + 0.4, 62, 0.06, 1.0, 0.3);
[0, 0.5, 1.0].forEach((d, i) => m.metal(Me + 1.5 + d, 0.22, [700, 1250, 520][i]));       // tres lingotes: cobre, oro, hierro
m.sube(P + 0.05, 1.3, 50, 62, 0.05);
m.whoosh(R + 0.2, 0.5, 0.1);                                                             // tarjeta del informe
for (let i = 0; i < 22; i++) m.tic(R + 2.6 + i * 0.09, 0.09, 2000);                      // 22 cuadritos verdes
m.golpe(B + 0.2, 0.2, 140); [0, 1, 2].forEach((i) => m.golpe(B + 1.2 + i * 0.5, 0.25, 110)); m.golpe(B + 2.6, 0.3, 120);   // bote: tapa, aparatos, tapa
m.cruje(B + 3.8, 0.4); m.sube(B + 3.8, 1.4, 50, 43, 0.04);                               // la tierra los entierra
m.nota(Mx + 0.6, 57, 0.05, 1.0, 0.4); for (let i = 0; i < 7; i++) m.tic(Mx + 0.3 + i * 0.27, 0.08, 900);
m.sube(Mx + 3.6, 1.4, 48, 50, 0.04);                                                     // la barra apenas sube (3.5 %)
for (let i = 0; i < 4; i++) m.tic(C + 0.8 + i * 0.8, 0.1, 2600);                         // hojas del calendario
m.golpe(L + 1.3, 0.3, 100); m.motor(L + 1.4, 1.0, 0.07); m.cruje(L + 2.1, 0.7);          // cae, prensa, se aplasta
for (let i = 0; i < 8; i++) m.tic(L + 2.3 + i * 0.08, 0.14, 3000);                       // chispas
m.whoosh(Ci + 0.6, 1.4, 0.12); m.metal(Ci + 2.2, 0.18, 990);                             // vuelan a la caja; brillo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
