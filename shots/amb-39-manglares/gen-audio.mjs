// gen-audio.mjs — cama grave + efectos del Shot Ambiental #39 (manglares, carbono azul). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Manglares base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 39);
const K = m.K;
const G = K.Gancho, R = K.Raices, L = K.Lodo, Mi = K.Microbios, Ca = K.Capas, P = K.Pregunta, E = K.Estudio, S = K.Suelo, Mx = K.Mexico, X = K.Extra, C = K.Cierre, Ou = K.Outro;

const chapoteo = (t) => { m.golpe(t, 0.35, 70); for (let i = 0; i < 6; i++) m.gota(t + 0.03 + i * 0.05, 0.08, 300 + i * 60); m.whoosh(t - 0.35, 0.4, 0.08); };
m.pad(0, L, 0.05, [45, 52, 57]);
m.pad(L, P, 0.05, [45, 52, 57], 0.6);                // en el lodo: la cama se ahoga (poco oxígeno)
m.pad(P, Ou + 3.5, 0.05, [45, 52, 57]);
chapoteo(G + 0.47);                                   // la bota pisa el lodo
m.nota(G + 1.6, 64, 0.06, 0.9);
for (let i = 0; i < 4; i++) m.sube(R + 0.2 + i * 0.35, 0.5, 52 + i * 2, 57 + i * 2, 0.04);   // crecen las raíces arqueadas
for (let i = 0; i < 8; i++) m.tic(R + 2.6 + i * 0.2, 0.06, 900 + i * 60);  // salen los neumatóforos
for (let i = 0; i < 7; i++) { m.whoosh(L + 0.1 + i * 0.45, 0.35, 0.04); m.gota(L + 1.2 + i * 0.45, 0.1, 700); }  // hojas que caen al agua
m.sube(L + 2.2, 0.6, 57, 69, 0.04);                   // se abre la lupa
for (let i = 0; i < 6; i++) m.burbuja(L + 2.6 + i * 0.4, 0.05 * (1 - i / 7), 420);   // burbujas de O2 que se acaban
for (let i = 0; i < 5; i++) m.tic(Mi + 0.3 + i * 0.8, 0.07, 700);                   // tic-tac lento del reloj
for (let i = 0; i < 8; i++) m.golpe(Ca + 0.1 + i * 0.49, 0.12, 60 + i * 4);          // capa sobre capa
m.sube(P - 0.1, 1.4, 52, 64, 0.05);
m.metal(E + 0.7, 0.12, 660);                          // tarjeta del estudio
for (let i = 0; i < 20; i++) m.tic(E + 3.4 + i * 0.15, 0.04, 1300 + i * 20);        // la hectárea se llena
m.nota(E + 6.4, 69, 0.06, 0.9);
m.sube(S + 0.4, 1.0, 57, 64, 0.04); m.nota(S + 1.4, 60, 0.05, 0.8);
for (let i = 0; i < 22; i++) m.gota(Mx + 0.5 + i * 0.06, 0.04, 1000 + (i % 5) * 80);   // puntos de manglar en el mapa
m.nota(Mx + 1.8, 64, 0.06, 0.9);
m.whoosh(X + 0.2, 1.6, 0.14); m.whoosh(X + 1.2, 1.2, 0.08);                          // viento que pierde fuerza
for (let i = 0; i < 5; i++) m.burbuja(X + 2.6 + i * 0.35, 0.05, 520);                // crías entre las raíces
chapoteo(C + 0.22);
m.sube(C + 1.0, 0.6, 57, 69, 0.04);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
