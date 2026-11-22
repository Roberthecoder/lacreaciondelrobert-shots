// gen-audio.mjs — cama + efectos del Shot Fungi Mati #69 (Pneumocystis). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: re menor que "respira" (acordes que cambian cada ~4 s, como el ciclo de la respiración), con un motivo de
// 4 notas (re–fa–mi–la) que se responde a sí mismo, variado en cada sección; se abre a re mayor en el cierre ("a raya").
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pneumocystis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 69);
const K = m.K;
const G = K.Gancho, Ai = K.Aire, Al = K.Alveolo, Fo = K.Formas, Sa = K.Sano, Di = K.Disfraz, P = K.Pregunta, Co = K.Colesterol, An = K.Antibiotico, E = K.Estudio, B = K.Bebes, R = K.Ratas, C = K.Cierre, Ou = K.Outro;

// progresión (bajo + acorde) por tramos: Dm – B♭ – F – C | Dm – Gm – A (re-gancho) | … | D mayor al final
const ACORDES = [
  [G, Ai, [38, 50, 53, 57]], [Ai, Al, [34, 50, 53, 58]], [Al, Fo, [41, 48, 53, 57]], [Fo, Sa, [36, 48, 52, 55]],
  [Sa, Di, [38, 50, 53, 57]], [Di, P, [43, 50, 55, 58]], [P, Co, [45, 49, 52, 57]], [Co, An, [38, 50, 53, 57]],
  [An, E, [34, 50, 53, 58]], [E, B, [43, 50, 55, 58]], [B, R, [41, 48, 53, 57]], [R, C, [45, 49, 52, 57]],
  [C, Ou + 3.5, [38, 50, 54, 57]]];
for (const [a, b, n] of ACORDES) m.pad(a, b + 0.15, 0.045, n, 0);
// motivo: re–fa–mi–la; cada sección lo dice con otro final (nunca igual 2 veces seguidas)
const MOT = [[0, 62], [0.45, 65], [0.9, 64], [1.5, 69]];
const motivo = (t, tr = 0, g = 0.045, fin) => MOT.forEach(([dt, n], i) => m.nota(t + dt, (i === 3 && fin != null ? fin : n) + tr, g, 0.9));
motivo(G + 0.2); motivo(Al + 0.3, 0, 0.04, 67); motivo(Sa + 0.3, -2, 0.04); motivo(Di + 2.8, 0, 0.04, 70);
motivo(Co + 0.2, 0, 0.035, 65); motivo(E + 0.4, -2, 0.035, 67); motivo(B + 3.4, 0, 0.04, 72); motivo(C + 0.4, 0, 0.05, 66);
// la respiración: un soplo suave que sube y baja cada 4 s mientras vemos el torso
for (let t = 0.2; t < Ai; t += 4) m.whoosh(G + t, 1.8, 0.05);
for (let t = 0.2; t < Ou - C; t += 4) m.whoosh(C + t, 1.8, 0.05);
// efectos en el cuadro
m.metal(G + 0.6, 0.08, 2200); m.tic(G + 0.9, 0.2, 2600);                                       // brilla el hongo · chip
for (let i = 0; i < 16; i++) m.tic(Ai + 0.5 + i * 0.12, 0.06, 2600 + (i % 4) * 200);              // puntitos por el aire
m.whoosh(Al + 1.5, 0.6, 0.12); m.burbuja(Al + 2.0, 0.12, 380);                                    // se abre la lupa
for (let i = 0; i < 5; i++) m.gota(Fo + 0.35 + i * 0.15, 0.1, 700 + i * 80);                       // aparecen las tróficas
m.golpe(Fo + 1.5, 0.25, 90);                                                                        // el quiste
for (let i = 0; i < 8; i++) m.nota(Fo + 2.0 + i * 0.2, [62, 65, 69, 72, 74, 72, 69, 74][i], 0.05, 0.3); // 8 esporas, 8 notas
m.whoosh(Sa + 0.2, 1.2, 0.08); m.nota(Sa + 1.7, 74, 0.05, 0.8);                                   // llega el macrófago · escudo
m.golpe(Di + 2.0, 0.3, 70); m.cruje(Di + 2.1, 0.3); m.metal(Di + 3.0, 0.1, 1500);                  // se tacha · cambia la ficha
m.sube(P + 0.1, 1.6, 52, 64, 0.04);                                                                // re-gancho
m.metal(Co + 1.6, 0.12, 900); m.cruje(Co + 1.65, 0.2);                                             // rompe la membrana del hongo común
m.metal(Co + 2.5, 0.18, 1400);                                                                     // rebota en la de colesterol
m.golpe(An + 0.3, 0.25, 80);                                                                       // frasco
m.golpe(E + 0.2, 0.3, 75); for (let i = 0; i < 5; i++) m.golpe(E + 2.6 + i * 0.4, 0.18, 110);      // tarjeta · 5 personitas
for (let i = 0; i < 24; i++) m.tic(B + 0.8 + i * 0.1, 0.05, 1500);                                 // se pintan los bebés
m.whoosh(R + 0.4, 0.7, 0.1); m.golpe(R + 1.3, 0.35, 90);                                           // flecha · tache
m.whoosh(C + 0.4, 0.6, 0.1); m.burbuja(C + 0.9, 0.12, 420);
m.nota(Ou + 0.3, 50, 0.07, 3); m.nota(Ou + 0.3, 57, 0.05, 3); m.nota(Ou + 0.3, 62, 0.05, 3); m.nota(Ou + 0.5, 66, 0.04, 2.6);
m.guardar(OUT, 1);
