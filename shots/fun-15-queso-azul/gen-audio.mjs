// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #15 (queso azul, Penicillium roqueforti). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Queso Azul base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 15);
const K = m.K;
const G = K.Gancho, N = K.Nombre, In = K.Inocular, Ai = K.Aire, Pi = K.Picar, Ve = K.Venas, Gr = K.Grasa, P = K.Pregunta, Pa = K.Pan, E = K.Estudio, Po = K.Poblaciones, Co = K.Colores, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);                                // cama grave y cálida, continua
m.whoosh(G + 0.1, 0.6, 0.14); m.metal(G + 0.75, 0.16, 1700);                 // el cuchillo corta la cuña
m.nota(G + 1.0, 64, 0.04, 0.4); m.cruje(G + 2.4, 0.3);                       // «¿echado a perder?» se tacha
m.nota(G + 2.9, 69, 0.06, 0.8); m.nota(G + 3.1, 72, 0.05, 0.8);              // «sembrado a propósito»
m.golpe(N + 0.6, 0.3, 90); m.golpe(N + 1.4, 0.3, 75);                        // aparecen Roquefort y Gorgonzola
for (let i = 0; i < 26; i++) m.tic(In + 0.4 + i * 0.07, 0.05, 2800 + (i % 4) * 300); // cae el polvito de esporas
for (let i = 0; i < 5; i++) m.gota(In + 1.0 + i * 0.25, 0.08, 700 + i * 60);  // se reparten en la leche
m.zumbido(Ai, 3.5, 0.025, 70);                                               // por dentro: tapado, sin aire
for (let i = 0; i < 5; i++) m.burbuja(Ai + 1.2 + i * 0.2, 0.06, 420 + i * 40); // los huecos se llenan de esporas
for (const t of [Pi + 0.3, Pi + 1.25, Pi + 2.2]) { m.metal(t + 0.27, 0.12, 2200); m.tic(t + 0.28, 0.2, 1200); m.whoosh(t + 0.35, 0.4, 0.06); } // piquetes y aire
m.sube(Ve - 0.3, 2.5, 50, 62, 0.04);                                          // crecen las hifas
for (let i = 0; i < 8; i++) m.nota(Ve + 1.3 + i * 0.18, [69, 72, 74, 76, 79, 81, 84, 86][i], 0.035, 0.5); // brotan las esporas
for (let i = 0; i < 6; i++) m.burbuja(Gr + 0.9 + i * 0.18, 0.08, 300 + i * 50); // se rompen las gotas de grasa
for (let i = 0; i < 6; i++) m.gota(Gr + 2.0 + i * 0.3, 0.06, 1200);           // salen las moléculas
m.whoosh(Gr + 2.9, 1.4, 0.07);                                                 // el olor sube
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // re-gancho
m.golpe(Pa + 0.5, 0.3, 95); m.nota(Pa + 0.6, 76, 0.05, 0.8);                   // ✓ escogido
for (let i = 0; i < 12; i++) m.tic(Pa + 2.7 + i * 0.12, 0.05, 3200);           // esporas que llegan volando al pan
m.nota(Pa + 3.4, 63, 0.05, 0.7, 0.4);                                          // «¿cuál es?»
m.golpe(Pa + 5.0, 0.35, 70);                                                   // ⚠ toxinas
m.golpe(E + 0.2, 0.3, 80);
for (let i = 0; i < 34; i++) m.tic(E + 0.9 + i * 0.04, 0.05, 1600 + (i % 5) * 200); // 34 genomas
m.sube(E + 2.6, 0.6, 55, 60, 0.04); m.nota(E + 3.6, 64, 0.05, 0.6); m.nota(E + 3.6, 71, 0.05, 0.6); // la rama se parte en dos
m.zumbido(Po, 1.6, 0.03, 60); m.nota(Po + 0.5, 57, 0.05, 1.2, 0.5);            // eco de cueva
m.whoosh(Po + 1.6, 0.8, 0.08); for (let i = 0; i < 8; i++) m.nota(Po + 2.0 + i * 0.1, 72 + (i % 3) * 2, 0.025, 0.3); // el mundo
for (let i = 0; i < 4; i++) m.gota(Co + 0.4 + i * 0.5, 0.12, 500 + i * 150);   // plops de los colores
m.whoosh(C + 0.3, 1.2, 0.08); m.nota(C + 1.6, 69, 0.06, 1.2); m.nota(C + 1.8, 76, 0.05, 1.2); // túneles y esporas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
