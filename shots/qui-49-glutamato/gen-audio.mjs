// gen-audio.mjs — cama grave + efectos del Shot Químico #49 (el mito del glutamato). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Glutamato base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 49);
const K = m.K;
const G = K.Gancho, Q = K.Que, U = K.Umami, Gr = K.Gramos, Pr = K.Pregunta, Ca = K.Carta, So = K.Sospechas, Es = K.Estudio, Le = K.Leche, Ci = K.Cierre, Ou = K.Outro;
const uOlla = U + 2.4, uLengua = U + 4.4, grBarras = Gr + 3.2;
const eGlu = Es + 5.2, ePla = Es + 6.6, eRep = Es + 8.4, eMitad = Es + 9.3, eComida = Es + 10.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 34; i += 2) m.tic(G + 0.6 + i * 0.07, 0.06, 3000 + (i % 5) * 200);   // cristalitos que caen
m.golpe(G + 1.8, 0.25, 90);                                                             // se tacha "¿veneno?"
m.whoosh(Q - 0.3, 0.6, 0.12); m.burbuja(Q + 0.7, 0.1, 400); m.burbuja(Q + 0.9, 0.1, 520);  // se disuelve
m.nota(Q + 1.3, 64, 0.06, 0.6); m.nota(Q + 2.1, 69, 0.05, 0.6);                          // sodio / glutamato / proteína
for (let i = 0; i < 4; i++) m.nota(U + 0.4 + i * 0.5, 60 + i * 2, 0.04, 0.5);            // moléculas que suben
m.golpe(uOlla, 0.3, 80); m.burbuja(uOlla + 0.6, 0.08, 300); m.burbuja(uOlla + 1.0, 0.08, 350);
m.nota(uLengua + 0.3, 69, 0.07, 1.2); m.nota(uLengua + 0.3, 76, 0.05, 1.2);              // ¡umami!
for (let i = 0; i < 6; i++) m.burbuja(Gr + 0.6 + i * 0.4, 0.07, 250);                   // tubo digestivo
m.sube(grBarras, 1.2, 50, 62, 0.05); m.golpe(grBarras + 1.2, 0.35, 80);                  // 13 g
m.tic(grBarras + 1.6, 0.08, 1800);                                                       // 0.55 g
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.whoosh(Ca + 0.2, 0.5, 0.12); m.whoosh(Ca + 0.9, 0.6, 0.08);                            // papel
for (let i = 0; i < 6; i++) m.latido(Ca + 3.8 + i * 0.42, 0.16);                         // palpitaciones
for (let i = 0; i < 3; i++) m.tic(So + 0.2 + i * 0.45, 0.1, 1200);                        // ? ? ?
m.golpe(So + 1.9, 0.4, 70);                                                              // sello
for (let i = 0; i < 3; i++) m.whoosh(So + 3.4 + i * 0.3, 0.3, 0.07);                     // recortes
m.golpe(Es + 0.2, 0.35, 80); m.metal(Es + 2.8, 0.1, 900);
for (let i = 0; i < 25; i++) m.nota(eGlu + i * 0.04, 72 + (i % 3), 0.02, 0.25);          // se encienden 50
for (let i = 0; i < 9; i++) m.nota(ePla + i * 0.08, 64, 0.02, 0.25);                     // 17 de placebo
m.whoosh(eRep, 0.5, 0.1);
for (let i = 0; i < 9; i++) m.nota(eMitad + i * 0.06, 60 - (i % 4), 0.025, 0.3);         // la mitad se apaga
m.metal(eComida, 0.08, 600);
m.gota(Le + 0.1, 0.25, 700);
for (let i = 0; i < 4; i++) m.burbuja(Ci + 0.6 + i * 0.12, 0.06, 600);
m.golpe(Ci + 1.4, 0.3, 90);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
