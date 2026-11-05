// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #90 (fósil de hongo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fósil base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 90);
const K = m.K;
const G = K.Gancho, R = K.Roca, Mi = K.Micro, Q = K.Quitina, A = K.Antes, P = K.Pregunta, Ag = K.Agua, E = K.Estudio, Ra = K.Rama, D = K.Duda, L = K.Lava, C = K.Cierre, Ou = K.Outro;

// cama grave con armonía que cambia por capítulo (re menor, misterio de tiempo profundo → se abre a mayor en «la rama»)
m.pad(0, Mi, 0.05, [38, 45, 50], 0.2);            // Dm (roca)
m.pad(Mi, A, 0.05, [41, 48, 53], 0.25);           // F (al microscopio)
m.pad(A, P, 0.05, [36, 43, 52], 0.2);             // C/E (línea del tiempo)
m.pad(P, E, 0.05, [34, 41, 50], 0.3);             // Bb (paisaje sin plantas)
m.pad(E, Ra, 0.05, [38, 45, 53], 0.15);           // Dm
m.pad(Ra, D, 0.055, [43, 50, 55, 59], 0);         // G mayor: la rama compartida
m.pad(D, C, 0.05, [40, 47, 52], 0.25);            // Em (duda, lava)
m.pad(C, Ou + 3.5, 0.05, [38, 45, 50, 57], 0);    // Dm abierto, cierre
// motivo de cuatro notas (re-fa-la-sol) que regresa en el gancho, en el estudio y en el cierre
const motivo = (t, g = 0.05, sube = 0) => [62, 65, 69, 67].forEach((n, i) => m.nota(t + i * 0.32, n + sube, g, 0.9));
motivo(G + 2.4); motivo(E + 0.4, 0.045, 2); motivo(C + 0.6, 0.05, 5);

for (let i = 0; i < 12; i++) m.tic(G + 0.15 + i * 0.12, 0.05, 900 + (i % 2) * 300);   // el dedo frota la roca
m.golpe(G + 0.6, 0.2, 90);                                                          // «no es mugre»
for (let i = 0; i < 14; i++) m.tic(G + 2.4 + i * 0.11, 0.06, 1600 + i * 60);        // contador de millones de años
m.whoosh(R - 0.3, 0.7, 0.12); m.golpe(R + 0.65, 0.3, 120);                          // mapa, punto
m.zumbido(Mi - 0.3, 1.2, 0.05, 160); m.sube(Mi - 0.2, 1.0, 45, 57, 0.04);            // entra al microscopio
[0.9, 1.3, 1.7, 2.1, 2.5].forEach((d, i) => m.nota(Mi + d + 0.6, 74 + i * 2, 0.04, 0.4)); // cada bolita
m.nota(Q + 0.3, 81, 0.05, 1.2); m.nota(Q + 0.3, 76, 0.04, 1.2);                     // la quitina brilla
m.whoosh(A + 0.3, 1.3, 0.1); m.golpe(A + 1.6, 0.25, 100);                           // la flecha llega a ~400 M
m.whoosh(A + 3.0, 1.4, 0.12); m.golpe(A + 4.4, 0.35, 70);                           // se estira a ~1,000 M
m.sube(P + 0.1, 1.6, 50, 62, 0.05);                                                 // re-gancho
for (let i = 0; i < 6; i++) m.whoosh(Ag + 0.2 + i * 0.5, 0.5, 0.05);               // el río y las olas
for (let i = 0; i < 6; i++) m.golpe(Ag + 1.6 + i * 0.28, 0.12, 140);                // capas de lodo
m.golpe(E + 0.2, 0.35, 80);                                                         // tarjeta del estudio
m.nota(Ra + 1.9, 67, 0.05, 1.4); m.nota(Ra + 2.0, 71, 0.04, 1.4); m.nota(Ra + 2.7, 79, 0.05, 1.6); // ramas y punto dorado
m.whoosh(D + 0.3, 0.9, 0.08);                                                       // entra la lupa
m.golpe(L + 0.2, 0.4, 55); for (let i = 0; i < 9; i++) m.tic(L + 0.6 + i * 0.27, 0.05, 700); // lava, hilos
m.nota(Ou + 0.3, 50, 0.08, 2.8); m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 62, 0.05, 2.8);
m.guardar(OUT, 1);
