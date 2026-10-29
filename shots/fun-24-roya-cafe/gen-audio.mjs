// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #24 (roya del café). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Roya Cafe base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 24);
const K = m.K;
const G = K.Gancho, H = K.Hoja, Es = K.Espora, Et = K.Estomas, Ha = K.Haustorios, R = K.Ramillete, C = K.Caida, P = K.Pregunta, S = K.Ceilan, E = K.Estudio, Cl = K.Clima, Ti = K.Timor, Ci = K.Cierre, Ou = K.Outro;

// cama grave continua: algo tapada mientras avanza la infección, se abre en la defensa y el cierre
m.pad(0, Ti, 0.05, [40, 47, 52], 0.3);
m.pad(Ti, Ou + 3.5, 0.05, [45, 52, 57], 0.1);
m.whoosh(G + 0.15, 1.1, 0.12);                                               // el dedo pasa por debajo de la hoja
for (let i = 0; i < 8; i++) m.tic(G + 0.6 + i * 0.06, 0.08, 3200 + i * 120); // cae el polvo
m.golpe(G + 1.6, 0.45, 75);                                                  // sello ÓXIDO
m.cruje(G + 2.4, 0.3);                                                       // se tacha
m.nota(G + 2.7, 64, 0.06, 0.8);                                              // «es un hongo»
for (let i = 0; i < 7; i++) m.nota(H + 0.4 + i * 0.2, m.ESC[2 + i], 0.035, 0.35); // aparecen las manchas
m.whoosh(H + 2.6, 0.7, 0.1);                                                 // la lupa
m.sube(Es - 0.3, 0.8, 52, 64, 0.04);                                         // bajada al microscopio
for (let i = 0; i < 6; i++) m.burbuja(Es + 0.1 + i * 0.25, 0.08, 600 + i * 40); // las esporas aparecen
m.gota(Et + 0.1, 0.25, 900);                                                 // la gota de agua
m.sube(Et + 0.6, 2.0, 55, 62, 0.035);                                        // crece el tubo
m.golpe(Et + 2.6, 0.25, 110);                                                // entra al estoma
for (let i = 0; i < 5; i++) { m.burbuja(Ha + 0.6 + i * 0.15, 0.07, 280); m.latido(Ha + 0.4 + i * 0.45, 0.08); } // haustorios: succión
for (let i = 0; i < 10; i++) m.tic(R + 0.3 + i * 0.07, 0.05, 2400);          // pasan las semanas
for (let i = 0; i < 9; i++) m.nota(R + 1.0 + i * 0.12, m.ESC[3 + (i % 6)], 0.04, 0.3); // brota el ramillete
m.whoosh(R + 3.0, 1.4, 0.16);                                                // viento
for (let i = 0; i < 6; i++) m.gota(R + 3.2 + i * 0.2, 0.1, 1100);            // lluvia
for (let i = 0; i < 12; i++) m.whoosh(C + 0.4 + i * 0.25, 0.3, 0.05);        // hojas que caen
m.sube(C + 2.0, 1.4, 52, 45, 0.04);                                          // menos café
m.golpe(P + 0.05, 0.3, 70); m.sube(P + 0.2, 1.8, 52, 64, 0.05);              // ¿?
for (let i = 0; i < 6; i++) m.cruje(S + 1.6 + i * 0.33, 0.12);               // el café se seca
m.sube(S + 2.3, 1.3, 60, 48, 0.04);                                          // el precio baja
for (let i = 0; i < 8; i++) m.nota(S + 4.4 + i * 0.25, m.ESC[1 + (i % 5)], 0.035, 0.5); // brota el té
m.golpe(E + 0.2, 0.35, 80);                                                  // tarjeta del estudio
m.sube(E + 2.4, 1.0, 50, 56, 0.04);                                          // el mapa se pinta
for (let i = 0; i < 5; i++) m.tic(E + 2.6 + i * 0.12, 0.08, 1600);           // puntos de roya en México
m.sube(E + 3.4, 1.0, 57, 52, 0.05);                                          // la barra baja −16 %
m.sube(Cl + 0.4, 2.2, 50, 54, 0.03); m.sube(Cl + 0.4, 2.2, 62, 58, 0.03);    // termómetros: se acercan
for (let i = 0; i < 6; i++) m.burbuja(Cl + 3.0 + i * 0.12, 0.07, 650);       // esporas más rápidas
m.metal(Ti + 0.2, 0.12, 900); m.metal(Ti + 0.7, 0.12, 1100); m.metal(Ti + 1.4, 0.15, 1300); // tarjetas
m.nota(Ti + 2.0, 69, 0.06, 1.0); m.nota(Ti + 2.0, 76, 0.04, 1.0);            // escudo
m.cruje(Ti + 3.8, 0.3); m.nota(Ti + 4.0, 58, 0.05, 1.0, 0.5);                // la roya evoluciona
m.whoosh(Ci, 0.8, 0.1); m.nota(Ci + 1.0, 64, 0.05, 1.2); m.nota(Ci + 1.2, 69, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
