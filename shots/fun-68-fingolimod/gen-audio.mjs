// gen-audio.mjs — cama + efectos del Shot Fungi Mati #68 (fingolimod). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: sol menor con pulso suave de laboratorio nocturno (Gm–E♭–B♭–D). Un motivo de 4 notas (sol–si♭–re–do) que en
// «así surgió el FTY720» se completa subiendo a si bemol mayor; en la mielina baja y se oscurece; en el cierre vuelve lento.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fingolimod base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 68);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Cl = K.Caldo, Mi = K.Miriocina, To = K.Toxica, Cb = K.Cambio, Na = K.Nace, P = K.Pregunta, Me = K.Mielina, Ga = K.Ganglios, E = K.Estudio, Or = K.Oral, C = K.Cierre, Ou = K.Outro;

const ACORDES = [[G, H, [43, 55, 58, 62]], [H, Cl, [39, 55, 58, 63]], [Cl, Mi, [46, 53, 58, 62]], [Mi, To, [38, 54, 57, 62]],
  [To, Cb, [43, 55, 58, 62]], [Cb, Na, [39, 55, 58, 63]], [Na, P, [46, 53, 58, 62]], [P, Me, [38, 54, 57, 60]],
  [Me, Ga, [43, 55, 58, 62]], [Ga, E, [36, 55, 60, 63]], [E, Or, [46, 53, 58, 62]], [Or, C, [41, 53, 57, 60]], [C, Ou + 3.5, [43, 55, 58, 62]]];
for (const [a, b, n] of ACORDES) m.pad(a, b + 0.15, 0.045, n, 0);
const motivo = (t, notas, g = 0.04, paso = 0.3) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, 0.55));
motivo(G + 0.3, [67, 70, 74, 72]); motivo(H + 2.8, [67, 70, 74, 75], 0.035); motivo(Mi + 2.4, [70, 74, 77, 75], 0.035);
motivo(Na + 0.3, [70, 74, 77, 82], 0.05, 0.26); motivo(Me + 2.8, [67, 66, 62, 58], 0.035); motivo(E + 3.6, [70, 74, 77, 74], 0.035);
motivo(C + 1.8, [67, 70, 74, 79], 0.05, 0.42);
// efectos
for (let i = 0; i < 6; i++) m.tic(G + 0.2 + i * 0.4, 0.05, 1800);                                 // la cápsula gira
m.golpe(G + 1.8, 0.25, 85); m.zumbido(G + 2.1, 0.9, 0.05, 210);                                  // tache · cigarra
m.sube(H + 0.6, 2.0, 50, 62, 0.03); m.cruje(H + 1.4, 0.2);                                        // crecen los tallitos
for (let i = 0; i < 12; i++) m.burbuja(Cl + 0.3 + i * 0.22, 0.08, 400 + (i % 4) * 90);             // burbujas del matraz
m.sube(Mi + 1.4, 1.0, 55, 57, 0.03); m.sube(Mi + 2.0, 1.4, 55, 74, 0.04);                          // barras: ciclosporina vs miriocina
m.gota(To + 0.3, 0.15, 600); m.metal(To + 0.9, 0.08, 500);                                         // grumito · calavera
for (let i = 0; i < 4; i++) m.burbuja(Cb + 0.4 + i * 0.3, 0.12, 900 + i * 100);                   // salen las piezas
m.metal(Cb + 2.6, 0.18, 1600);                                                                     // encaja el anillo
m.sube(P + 0.1, 1.6, 52, 64, 0.04);
for (let i = 0; i < 3; i++) m.cruje(Me + 1.2 + i * 0.45, 0.15);                                    // mordidas a la mielina
m.golpe(Ga + 0.9, 0.3, 70); m.metal(Ga + 1.0, 0.1, 700);                                           // se cierra la puertita
m.golpe(E + 0.2, 0.3, 75); m.nota(E + 1.4, 62, 0.05, 0.8); m.nota(E + 2.0, 55, 0.05, 0.8);        // tarjeta · barras
m.golpe(Or + 0.5, 0.35, 70); m.golpe(Or + 1.5, 0.25, 90);                                          // sello FDA · tache
m.whoosh(C + 0.3, 0.6, 0.1); m.burbuja(C + 0.7, 0.12, 420);
m.nota(Ou + 0.3, 46, 0.07, 3); m.nota(Ou + 0.3, 58, 0.05, 3); m.nota(Ou + 0.3, 62, 0.05, 3); m.nota(Ou + 0.5, 65, 0.04, 2.6);
m.guardar(OUT, 1);
