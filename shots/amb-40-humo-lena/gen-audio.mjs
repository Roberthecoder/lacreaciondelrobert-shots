// gen-audio.mjs — cama grave + efectos del Shot Ambiental #40 (humo de la leña). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Humo Lena base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 40);
const K = m.K;
const G = K.Gancho, F = K.Fogon, Ca = K.Cabello, Pu = K.Pulmon, E = K.Encierro, Mu = K.Mundo, Mx = K.Mexico, P = K.Pregunta, Pa = K.Patsari, Mi = K.Mitad, C = K.Cierre, Ou = K.Outro;

// cama grave: "tapada" mientras el humo se queda en la cocina, se abre cuando sale por la chimenea
m.pad(0, Pa + 3.8, 0.05, [45, 52, 57], 0.5);
m.pad(Pa + 3.4, Ou + 3.5, 0.05, [45, 52, 57], 0);
const chispas = (t0, t1, cada = 0.23) => { for (let t = t0; t < t1; t += cada) m.tic(t + ((t * 7.3) % 0.1), 0.06, 2200 + ((t * 913) % 1400)); };
chispas(G, F + 3.2);                                                                 // la leña chisporrotea desde el cuadro 0
m.whoosh(G + 0.5, 0.6, 0.12); m.nota(G + 0.9, 64, 0.05, 0.8, 0.5);                   // la lupa se abre: partículas
for (let i = 0; i < 14; i++) m.tic(F + 0.2 + i * 0.05 * 4, 0.05, 1300 + i * 40);     // cada partícula que sale
m.whoosh(Ca + 0.1, 0.9, 0.14); m.golpe(Ca + 2.2, 0.25, 140);                          // entra el cabello; aparece la partícula
m.whoosh(Pu + 0.05, 0.8, 0.12); m.sube(Pu + 1.4, 0.6, 64, 52, 0.05);                 // baja por la tráquea · zoom a los alvéolos
m.latido(Pu + 2.4, 0.2); m.latido(Pu + 3.2, 0.2);                                     // algunas llegan a la sangre
m.sube(E + 0.8, 2.2, 45, 69, 0.05); m.golpe(E + 3.0, 0.35, 70);                       // el medidor sube a ×100
m.golpe(Mu + 0.2, 0.4, 60); m.nota(Mu + 1.4, 57, 0.05, 1.2, 0.4);                     // 2,100 millones
m.golpe(Mu + 5.0, 0.45, 50);                                                          // 2.9 millones
for (let i = 0; i < 10; i++) i === 6 ? m.nota(Mx + 0.4 + i * 0.12, 69, 0.07, 0.8) : m.tic(Mx + 0.4 + i * 0.12, 0.05, 1500);   // la fila de 10 casas
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                                  // re-gancho
for (let i = 0; i < 4; i++) m.golpe(Pa + 0.6 + i * 0.55, 0.18, 160);                  // los ladrillos de la Patsari
m.metal(Pa + 3.1, 0.12, 620); m.whoosh(Pa + 3.8, 1.2, 0.16);                          // la chimenea; el humo sale por arriba
m.sube(Mi + 0.4, 1.5, 64, 52, 0.05); m.nota(Mi + 1.9, 64, 0.06, 0.8);                 // −71 %
m.sube(Mi + 2.9, 1.3, 64, 57, 0.05); m.nota(Mi + 4.2, 69, 0.06, 0.8);                 // a la mitad
chispas(C, Ou, 0.4); m.whoosh(C + 0.6, 1.4, 0.1); m.nota(C + 0.9, 60, 0.05, 1.0);    // la misma cocina, con chimenea
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
