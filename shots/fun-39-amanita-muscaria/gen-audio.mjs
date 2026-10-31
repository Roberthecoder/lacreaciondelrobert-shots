// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #39 (Amanita muscaria). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Amanita Muscaria base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 39);
const K = m.K;
const G = K.Gancho, Hu = K.Huevo, Gl = K.Globo, B = K.Base, L = K.Lluvia, Mx = K.Mexico, R = K.Raices, P = K.Pregunta, Tx = K.Toxinas, E = K.Estudio, Re = K.Respirador, Mo = K.Moscas, C = K.Cierre, Ou = K.Outro;
const COC = Tx + 3.6;

m.pad(0, P, 0.05, [45, 52, 57], 0.1);                                        // bosque: cama tranquila
m.pad(P, Re + 3.8, 0.05, [44, 51, 56], 0.35);                                // tensión (venenoso → hospital)
m.pad(Re + 3.8, Ou + 3.5, 0.05, [45, 52, 57], 0);                            // se recuperó: se libera
m.sube(G, 0.6, 50, 62, 0.06); m.whoosh(G, 0.5, 0.12);                        // el hongo brota (cuadro 0)
m.golpe(G + 1.3, 0.25, 140); m.nota(G + 1.4, 76, 0.05, 0.6);                 // la lupa toca un punto
m.cruje(G + 2.6, 0.3);                                                       // "¿manchas?" tachado
m.sube(Hu + 0.1, 1.2, 64, 50, 0.05); m.whoosh(Hu + 0.2, 1.0, 0.1);           // se rebobina al botón
m.nota(Hu + 1.6, 57, 0.06, 1.0);
m.sube(Gl + 0.3, 3.8, 48, 60, 0.04);                                         // el sombrero se infla
for (let i = 0; i < 6; i++) m.cruje(Gl + 0.4 + i * 0.5, 0.25);               // el velo se agrieta y se rompe
for (let i = 0; i < 4; i++) m.nota(B + 0.4 + i * 0.4, [69, 72, 76, 79][i], 0.04, 0.4); // verrugas señaladas
m.golpe(B + 1.6, 0.3, 70);                                                   // el bulbo
for (let i = 0; i < 22; i++) m.gota(L + 0.1 + i * 0.16, 0.12, 700 + (i % 5) * 160); // lluvia
for (let i = 0; i < 10; i++) m.tic(L + 0.4 + i * 0.27, 0.1, 1200);          // caen las verrugas
m.whoosh(Mx, 0.8, 0.1); m.golpe(Mx + 0.6, 0.3, 90);                          // mapa, punto en Oaxaca
m.nota(Mx + 1.5, 64, 0.05, 0.8); m.nota(Mx + 1.9, 69, 0.05, 0.8);           // árboles y hongos
for (let i = 0; i < 6; i++) m.burbuja(R + 1.4 + i * 0.45, 0.06, 420 + i * 30); // pulsos de intercambio
m.sube(P + 0.05, 0.7, 52, 64, 0.05); m.golpe(P + 0.75, 0.5, 70);            // ¿venenoso? → sello
for (let i = 0; i < 3; i++) m.tic(Tx + 1.0 + i * 0.15, 0.15, 2600);          // las moléculas llegan
for (let i = 0; i < 8; i++) m.tic(Tx + 1.3 + i * 0.1, 0.1, 3200);            // chispas (excita)
m.sube(Tx + 2.3, 0.8, 60, 45, 0.05);                                         // muscimol: se apaga
for (let i = 0; i < 10; i++) m.burbuja(COC + 0.2 + i * 0.25, 0.07, 260 + i * 15); // la olla hierve
for (let i = 0; i < 3; i++) m.tic(COC + 0.5 + i * 0.2, 0.12, 900);          // algunas moléculas siguen
m.golpe(E + 0.2, 0.35, 80); m.sube(E + 0.8, 1.0, 50, 57, 0.04); m.golpe(E + 2.1, 0.3, 120); // tarjeta, hongo, ≠
for (let i = 0; i < 3; i++) m.tic(Re + 0.6 + i * 0.35, 0.15, 1500);         // síntomas
for (let i = 0; i < 8; i++) m.zumbido(Re + 1.0 + i * 0.5, 0.25, 0.03, 140);  // respirador
for (let i = 0; i < 4; i++) m.tic(Re + 2.4 + i * 0.3, 0.12, 2200);          // 4 días
m.nota(Re + 3.8, 72, 0.06, 0.8); m.nota(Re + 4.0, 76, 0.06, 0.9);           // se recuperó
m.zumbido(Mo + 0.3, 2.0, 0.04, 210);                                         // moscas
m.sube(Mo + 1.9, 1.2, 64, 52, 0.04);                                         // mareadas
m.nota(C + 0.6, 69, 0.05, 1.0); m.golpe(C + 2.6, 0.25, 90);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
