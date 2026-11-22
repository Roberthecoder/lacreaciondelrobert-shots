// gen-audio.mjs — cama + efectos del Shot Fungi Mati #66 (Candida auris). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: mi menor, seria y quieta. Un motivo de 3 notas (como el bip de un monitor: si–mi–sol) que se contesta y se
// varía en cada sección; la armonía camina Em–C–Am–B y en el cierre se aclara a mi mayor cuando la cama queda limpia.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Candida auris base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 66);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Ct = K.Continentes, Pi = K.Piel, Su = K.Superficies, Gr = K.Graves, P = K.Pregunta, Re = K.Resiste, Tr = K.Tres, Cf = K.Confunde, E = K.Estudio, D = K.Desinfecta, C = K.Cierre, Ou = K.Outro;

const ACORDES = [[G, N, [40, 52, 55, 59]], [N, Ct, [36, 52, 55, 60]], [Ct, Pi, [45, 52, 57, 60]], [Pi, Su, [47, 51, 54, 59]],
  [Su, Gr, [40, 52, 55, 59]], [Gr, P, [36, 52, 55, 60]], [P, Re, [47, 51, 54, 57]], [Re, Tr, [40, 52, 55, 59]],
  [Tr, Cf, [45, 52, 57, 60]], [Cf, E, [36, 52, 55, 60]], [E, D, [43, 50, 55, 59]], [D, C, [47, 51, 54, 59]], [C, Ou + 3.5, [40, 52, 56, 59]]];
for (const [a, b, n] of ACORDES) m.pad(a, b + 0.15, 0.045, n, 0);
// motivo del monitor: si–mi–sol, con respuestas distintas
const MOT = [71, 64, 67];
const motivo = (t, notas = MOT, g = 0.04, paso = 0.32) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, 0.5));
motivo(G + 0.2); motivo(N + 2.6, [71, 64, 69]); motivo(Pi + 0.4, [67, 64, 62], 0.035); motivo(Gr + 2.4, [71, 67, 64], 0.035);
motivo(Tr + 2.4, [72, 71, 64], 0.04); motivo(E + 4.4, [71, 64, 66], 0.035); motivo(C + 2.9, [71, 68, 76], 0.05, 0.38);
// bip del monitor (suave) en las escenas de la cama
for (let t = 0.3; t < N - G; t += 1.0) m.tic(G + t, 0.08, 1900);
for (let t = 0.3; t < P - Gr; t += 1.0) m.tic(Gr + t, 0.07, 1900);
for (let t = 0.3; t < Ou - C; t += 1.0) m.tic(C + t, 0.06, 1900);
// efectos en el cuadro
for (let i = 0; i < 5; i++) m.tic(G + 0.3 + i * 0.14, 0.12, 2600); for (let i = 0; i < 6; i++) m.tic(G + 1.6 + i * 0.17, 0.12, 2300);
m.golpe(G + 1.5, 0.25, 80);                                                                       // se tacha
m.whoosh(N + 0.7, 0.6, 0.12); m.burbuja(N + 1.2, 0.12, 400); m.golpe(N + 1.9, 0.3, 75);           // lupa · tarjeta 2009
for (let i = 0; i < 4; i++) m.nota(Ct + 0.4 + i * 0.48, [64, 67, 71, 74][i], 0.05, 0.6);            // 4 puntos en el globo
for (let i = 0; i < 3; i++) m.gota(Pi + 0.5 + i * 0.55, 0.12, 900);                                // axilas, ingle
for (let i = 0; i < 3; i++) m.metal(Su + 0.4 + i * 0.7, 0.08, 1200 + i * 200);                     // barandal, perilla, baumanómetro
m.sube(P + 0.1, 1.6, 52, 64, 0.04);
m.sube(Re + 0.6, 1.2, 52, 64, 0.03); m.sube(Re + 1.0, 1.2, 50, 57, 0.03);                         // barras que suben
for (let i = 0; i < 3; i++) m.metal(Tr + 0.8 + i * 0.6, 0.12, 900 + i * 300);                     // cada frasco rebota
m.golpe(Cf + 1.6, 0.25, 90); m.nota(Cf + 2.3, 76, 0.05, 0.6);                                     // tache · C. auris
m.golpe(E + 0.2, 0.3, 75); for (let i = 0; i < 12; i++) m.tic(E + 1.4 + i * 0.18, 0.08, 1500);   // tarjeta · 12 camitas
for (let i = 0; i < 3; i++) m.gota(E + 3.8 + i * 0.3, 0.12, 1100);                                // 3 muestras
m.whoosh(D + 0.5, 1.0, 0.1); m.golpe(D + 1.8, 0.25, 90);                                          // rocío · no la elimina
m.whoosh(C + 1.4, 1.6, 0.08); for (let i = 0; i < 6; i++) m.burbuja(C + 1.6 + i * 0.2, 0.08, 700); // el trapo limpia
m.nota(Ou + 0.3, 52, 0.07, 3); m.nota(Ou + 0.3, 59, 0.05, 3); m.nota(Ou + 0.3, 64, 0.05, 3); m.nota(Ou + 0.5, 68, 0.04, 2.6);
m.guardar(OUT, 1);
