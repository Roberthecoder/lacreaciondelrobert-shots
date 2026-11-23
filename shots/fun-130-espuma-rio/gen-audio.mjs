// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #130 (Espuma del río). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama de agua fría y clara en re mayor / si menor, con progresión con función
// y voces cercanas (I – vi – IV – V, se oscurece a vi – ii en el laboratorio y se abre a IV – I en el cierre). Un tema propio de
// 4 notas tipo "estrella que titila" (motivo → respuesta → secuencia → cadencia) que vuelve en el cierre una octava abajo.
// Siempre bajo la voz, sin golpe marcado. Cada evento en pantalla tiene su sonido en el mismo cuadro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Espuma base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 130);
const K = m.K;
const G = K.Gancho, Na = K.Natural, Z = K.Zoom, M = K.Medida, H = K.Hongos, Ga = K.Galleta, P = K.Pregunta, W = K.Webster, B = K.Banquito,
  I = K.Ingold, R = K.Ramitas, L = K.Lluvia, C = K.Cierre, Ou = K.Outro;

// cama: acordes por sección (graves, conducción de voces cercana)
const D = [38, 50, 57, 62], Bm = [35, 50, 54, 59], Gm = [43, 50, 55, 59], A = [45, 52, 57, 61], Em = [40, 52, 55, 59], Fsm = [42, 49, 54, 57];
const cama = [[G, Na, D, 0], [Na, Z, Bm, 0], [Z, M, Gm, 0.1], [M, H, A, 0.1], [H, Ga, Bm, 0.2], [Ga, P, Gm, 0], [P, W, A, 0.25],
  [W, B, Em, 0.3], [B, I, Fsm, 0.25], [I, R, Gm, 0.1], [R, L, D, 0], [L, C, Bm, 0.05], [C, Ou, Gm, 0], [Ou, Ou + 3.5, D, 0]];
cama.forEach(([a, b, ch, tapa]) => m.pad(Math.max(0, a - 0.3), b + 0.3, 0.045, ch, tapa));

// tema "estrella" (notas suaves en los huecos de la voz): motivo D–A–F#…E, respuesta B–A–F#…D
const tema = (t, base = 0, g = 0.032) => [[0, 74], [0.4, 81], [0.8, 78], [1.5, 76]].forEach(([d, n]) => m.nota(t + d, n + base, g, 1.4));
const resp = (t, base = 0, g = 0.032) => [[0, 71], [0.4, 69], [0.8, 66], [1.5, 62]].forEach(([d, n]) => m.nota(t + d, n + base, g, 1.6));
tema(G + 1.2); resp(Na + 0.5, -12);                  // presenta el tema con las primeras estrellas, y su respuesta
tema(R + 2.6, -3, 0.028);                             // secuencia (transpuesto) cuando se llena la cuadrícula de especies
resp(Ou + 0.3, -12, 0.05); m.nota(Ou + 2.2, 50, 0.06, 1.3); m.nota(Ou + 2.2, 57, 0.04, 1.3); m.nota(Ou + 2.2, 62, 0.035, 1.3); // cadencia en re

// efectos en el mismo cuadro de cada evento
for (let i = 0; i < 8; i++) m.burbuja(G + 0.1 + i * 0.13, 0.06, 380 + (i % 4) * 70);       // la espuma se junta
m.cruje(G + 1.0, 0.25);                                                                    // se tacha el jabón
for (let i = 0; i < 9; i++) m.nota(G + 1.2 + i * 0.18, [86, 90, 93, 88, 91][i % 5], 0.02, 0.5); // titilan las estrellas
[0, 0.5, 1.0, 1.5].forEach((d) => m.whoosh(Na + d, 0.5, 0.05));                           // caen las hojas
for (let i = 0; i < 22; i++) m.burbuja(Na + 1.6 + i * 0.09, 0.05, 350 + (i % 5) * 60);    // salen burbujas de la hoja que se pudre
m.sube(Z, 0.9, 50, 62, 0.04);                                                              // baja la lupa al microscopio
for (let i = 0; i < 6; i++) m.nota(Z + 0.8 + i * 0.18, [81, 86, 88, 90, 93, 86][i], 0.035, 0.6); // aparecen 6 estrellas
m.whoosh(Z + 2.0, 0.4, 0.04); m.whoosh(Z + 2.2, 0.4, 0.04);                               // las sigmoides
m.tic(M + 1.0, 0.12, 1800); m.tic(M + 2.0, 0.12, 2200);                                    // medidor 20–50 µm
for (let k = 0; k < 4; k++) m.tic(H + 0.2 + k * 0.4, 0.08, 1500 + k * 200);                // brotan las hifas
m.cruje(H + 1.8, 0.2);                                                                     // la hoja se ablanda
m.sube(H + 2.6, 2.0, 55, 64, 0.03);                                                        // sube la proteína
for (let i = 0; i < 6; i++) m.tic(Ga + 0.6 + i * 0.22, 0.05, 900);                         // pasitos de la larva
m.cruje(Ga + 2.0, 0.15);                                                                   // mordida
m.golpe(Ga + 2.6, 0.2, 120); m.nota(Ga + 3.4, 79, 0.04, 0.8);                              // galletas; llega la crema
m.sube(P + 0.1, 1.2, 57, 69, 0.05);                                                        // re-gancho
m.golpe(W + 0.1, 0.3, 80);                                                                 // tarjeta 1959
for (let i = 0; i < 3; i++) m.tic(W + 1.6 + i, 0.08, 2600);                                // cronómetro
m.gota(W + 4.0, 0.2, 700); m.tic(W + 4.05, 0.2, 1200); m.whoosh(W + 4.0, 0.5, 0.06);       // chocan: la ovalada rebota, la estrella se queda
m.nota(W + 4.5, 81, 0.04, 0.6);
m.whoosh(B + 0.3, 1.0, 0.06); [0, 0.1, 0.2].forEach((d) => m.tic(B + 1.4 + d, 0.14, 1700)); // aterriza en tres puntas
m.golpe(B + 1.9, 0.15, 140); m.tic(B + 3.0, 0.1, 1100);                                    // chips
m.gota(I + 0.2, 0.12, 600); m.golpe(I + 1.3, 0.15, 160); m.golpe(I + 2.4, 0.3, 80);        // arroyo, punto del mapa, tarjeta 1942
for (let i = 0; i < 6; i++) m.burbuja(R + 0.1 + i * 0.15, 0.05, 420);                      // la espuma tras las ramitas
m.whoosh(R + 0.4, 0.8, 0.05);                                                              // entra la lupa
for (let i = 0; i < 18; i++) m.nota(R + 2.6 + i * 0.08, [74, 78, 81, 86][i % 4] + (i > 9 ? 2 : 0), 0.02, 0.4); // se llena la cuadrícula
for (let i = 0; i < 14; i++) m.gota(L + i * 0.3, 0.06, 900 + (i % 5) * 120);              // lluvia
m.gota(L + 1.2, 0.18, 600); m.nota(L + 1.6, 86, 0.035, 0.8);                                // la gota grande con su estrella
m.sube(C + 0.6, 1.6, 50, 57, 0.035);                                                       // la espuma se vuelve cielo
for (let i = 0; i < 10; i++) m.nota(C + 0.8 + i * 0.16, [86, 90, 93, 95, 98][i % 5] - 12, 0.022, 0.7);
m.guardar(OUT, 1);
