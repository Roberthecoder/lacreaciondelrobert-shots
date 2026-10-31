// gen-audio.mjs — cama grave + efectos del Shot Ambiental #19 (desperdicio de comida). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Desperdicio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K;
const G = K.Gancho, To = K.Toneladas, Ca = K.Cascaras, P = K.Pregunta, Cs = K.Casa, Ki = K.Kilos, Mx = K.Mexico, E = K.Estudio, Ri = K.Ricos, Ga = K.Gases, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ri, 0.05, [45, 52, 56], 0.4);                    // tensa (tapada) mientras se llena el bote
m.pad(Ri, Ou + 3.5, 0.05, [45, 52, 57]);                   // se abre hacia el final
m.whoosh(G + 0.05, 0.5, 0.12); m.tic(G + 0.1, 0.12, 900);  // se abre el refri (cuadro 0)
m.golpe(G + 2.6, 0.18, 140);                                // se marca la quinta repisa
m.metal(G + 3.3, 0.12);                                     // tapa del bote
for (let j = 0; j < 3; j++) m.golpe(G + 4.4 + j * 0.25, 0.22, 70 + j * 10);   // plop: cada cosa cae al bote
m.golpe(To + 0.1, 0.45, 50); m.sube(To + 0.1, 1.5, 40, 52, 0.06);              // la montaña crece
m.whoosh(Ca + 0.2, 0.6, 0.1); m.tic(Ca + 1.0, 0.1); m.tic(Ca + 1.3, 0.1); m.tic(Ca + 1.6, 0.1);   // lupa + etiquetas
for (let i = 0; i < 3; i++) m.golpe(P + 0.2 + i * 0.3, 0.2, 110 + i * 20);   // tres botes
m.sube(P + 0.1, 1.3, 52, 64, 0.05);
for (let i = 0; i < 10; i++) m.tic(Cs + 0.5 + i * 0.14, 0.18, i < 6 ? 1200 : i < 9 ? 1700 : 2200);   // un golpecito por kilo
for (let i = 0; i < 7; i++) m.golpe(Ki + 0.3 + i * 0.25, 0.16, 90);          // bolsas en la báscula
m.sube(Ki + 0.3, 2.1, 45, 57, 0.05);                                         // aguja a 79
m.whoosh(Mx + 0.1, 0.6, 0.08); m.sube(Mx + 0.6, 1.4, 57, 62, 0.05);          // 79 → 105
m.nota(E + 0.4, 64, 0.06, 0.8);
for (let i = 0; i < 12; i++) m.gota(E + 3.0 + i * 0.22, 0.06, 1200 + (i % 4) * 150);   // países que se encienden
m.metal(Ri + 1.4, 0.14);                                                      // tachón del mito
for (let i = 0; i < 3; i++) m.sube(Ri + 2.4 + i * 0.25, 0.9, 50, 57 + i, 0.04);
for (let i = 0; i < 8; i++) m.burbuja(Ga + 0.3 + i * 0.6, 0.05, 260);        // gas que sube
m.golpe(Ga + 0.8, 0.25, 70);
m.nota(C + 0.8, 64, 0.05, 0.9); m.whoosh(C + 3.6, 0.9, 0.08); m.golpe(C + 4.6, 0.3, 80);   // la puerta se cierra
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
