// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #142 (¿los hongos son plantas?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua (sin golpe) con progresión con función (Am–F–C–G → Dm–Am–E) que cambia cada escena,
// y un tema propio de 4 notas (motivo → respuesta → secuencia → cadencia) que regresa en cada PRUEBA con otro registro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Plantas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 142);
const K = m.K;
const G = K.Gancho, Co = K.Cocina, Cl = K.Clorofila, Es = K.Estomago, Pa = K.Pared, Qu = K.Quitina, Gl = K.Glucogeno, P = K.Pregunta,
  E = K.Estudio, A = K.Arbol, F = K.Firma, W = K.Whittaker, C = K.Cierre, Ou = K.Outro;

// cama: acordes graves encadenados con conducción de voces (cada voz a la nota más cercana)
const ACORDES = [[G, [45, 52, 57, 60]], [Co, [41, 53, 57, 60]], [Cl, [48, 52, 55, 60]], [Es, [43, 50, 55, 59]], [Pa, [45, 52, 57, 60]], [Qu, [41, 53, 57, 60]],
  [Gl, [48, 52, 55, 64]], [P, [40, 52, 56, 59]], [E, [50, 53, 57, 62]], [A, [45, 52, 57, 64]], [F, [41, 53, 57, 65]], [W, [48, 55, 60, 64]], [C, [43, 50, 55, 62]], [Ou, [45, 52, 57, 64]]];
ACORDES.forEach(([t, ch], i) => { const t1 = i + 1 < ACORDES.length ? ACORDES[i + 1][0] + 0.25 : Ou + 3.5; m.pad(Math.max(0, t - 0.25), t1, 0.045, ch, i === 7 ? 0.3 : 0); });
// tema de 4 notas (la menor): motivo, respuesta, secuencia y cadencia, uno por PRUEBA
const TEMA = [[69, 72, 71, 69], [72, 74, 76, 74], [71, 72, 74, 76], [76, 74, 72, 69]];
[Cl, Es, Pa, Gl].forEach((t, i) => TEMA[i].forEach((n, j) => m.nota(t + 0.15 + j * 0.28, n - (i % 2 ? 12 : 0), 0.035, 0.7)));
// efectos, cada uno en el cuadro de su evento
for (let i = 0; i < 3; i++) m.tic(G + 0.3 * (i + 1), 0.25, 700 - i * 80);             // el champiñón brinca en la tabla
m.whoosh(G + 1.0, 0.6, 0.08); m.golpe(G + 1.6, 0.3, 70);                               // arco a la lechuga y tache
m.sube(G + 2.0, 0.8, 57, 69, 0.04); m.nota(G + 2.8, 76, 0.05, 0.8);                     // arco hacia "tú"
m.tic(Co + 0.2, 0.15, 1500);                                                            // chip cocina
for (let i = 0; i < 3; i++) m.golpe(Co + 1.0 + i * 0.2, 0.2, 90 + i * 15);               // tres reinos
m.whoosh(Co + 1.8, 1.0, 0.1); m.nota(Co + 2.8, 74, 0.05, 0.8);                           // vuela a FUNGI
for (let i = 0; i < 6; i++) m.tic(Cl + 0.6 + i * 0.08, 0.06, 2600);                      // rayos de sol
m.zumbido(Cl + 1.0, 0.7, 0.03, 330); m.metal(Cl + 1.4, 0.1, 1300);                       // cloroplastos brillan; rayos rebotan en el hongo
for (let i = 0; i < 5; i++) m.burbuja(Es + 0.6 + i * 0.35, 0.07, 380 + i * 40);          // estómago digiere
m.sube(Es + 0.3, 1.1, 50, 57, 0.03);                                                     // crece la hifa
for (let i = 0; i < 10; i++) m.gota(Es + 1.4 + i * 0.18, 0.06, 900 + i * 25);            // enzimas que salen
for (let i = 0; i < 10; i++) m.tic(Es + 3.0 + i * 0.16, 0.05, 1900);                     // moléculas que entran
for (let i = 0; i < 12; i++) m.tic(Pa + 0.4 + i * 0.1, 0.05, 1200);                      // fibras de celulosa
for (let i = 0; i < 7; i++) m.nota(Pa + 2.4 + i * 0.2, 64 + (i % 3) * 3, 0.03, 0.4);      // quitina y glucanos
m.cruje(Qu + 0.4, 0.25); m.cruje(Qu + 1.0, 0.2);                                          // caparazones
for (let i = 0; i < 4; i++) m.burbuja(Gl + 0.7 + i * 0.12, 0.06, 600);                   // rosetas en el hongo
for (let i = 0; i < 6; i++) m.burbuja(Gl + 1.6 + i * 0.1, 0.06, 520);                    // rosetas en el hígado
for (let i = 0; i < 3; i++) m.tic(Gl + 3.6 + i * 0.12, 0.12, 900);                       // granos de almidón
m.sube(P + 0.1, 1.5, 52, 64, 0.045);                                                     // re-gancho
m.golpe(E + 0.2, 0.3, 80);                                                               // tarjeta 1993
for (let i = 0; i < 30; i++) m.tic(E + 1.4 + i * 0.05, 0.04, 2200 + (i % 4) * 250);       // secuencias alineándose
[0.2, 0.8, 1.4].forEach((d, i) => m.nota(A + d + 0.6, [57, 64, 69][i], 0.045, 1.0));      // el árbol crece y se abre
m.nota(A + 2.5, 72, 0.05, 1.4); m.nota(A + 2.5, 76, 0.035, 1.4);                         // grupos hermanos
for (let i = 0; i < 12; i++) m.nota(F + 0.6 + i * 0.09, 81 + (i % 2) * 3, 0.025, 0.25);   // 12 aminoácidos (una nota cada uno)
m.metal(F + 2.0, 0.12, 1600);                                                            // campanita del bloque dorado
for (let i = 0; i < 5; i++) m.golpe(W + 0.4 + i * 0.25, 0.18, 85 + i * 12);              // cinco reinos
m.golpe(W + 1.6, 0.3, 80); m.nota(W + 2.1, 79, 0.04, 0.6); m.nota(W + 2.3, 76, 0.04, 0.8); // tarjeta 1969, "otro Robert"
m.whoosh(C + 0.2, 0.8, 0.06); for (let i = 0; i < 4; i++) m.tic(C + 1.2 + i * 0.25, 0.1, 1400);
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.045, 2.8); m.nota(Ou + 0.3, 72, 0.03, 2.8);
m.guardar(OUT, 1);
