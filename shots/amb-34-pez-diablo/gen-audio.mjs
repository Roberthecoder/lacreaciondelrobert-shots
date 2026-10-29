// gen-audio.mjs — cama grave + efectos del Shot Ambiental #34 (pez diablo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pez Diablo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 34);
const K = m.K;
const G = K.Gancho, O = K.Origen, S = K.Suelta, A = K.Armadura, Ai = K.Aire, P = K.Pregunta, I = K.Infiernillo, R = K.Redes, Tu = K.Tuneles, H = K.Harina, C = K.Cierre, Ou = K.Outro;

// cama grave: tapada mientras crece la invasión, más abierta en "lo bueno" y el cierre
m.pad(0, H, 0.05, [45, 52, 57], 0.35);
m.pad(H, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
for (let i = 0; i < 10; i++) m.tic(G + 0.2 + i * 0.35, 0.05, 2600 + (i % 2) * 400);      // raspado de la ventosa en el vidrio
m.cruje(G + 2.0, 0.25);                                                                     // tachón de "limpiapeceras"
m.golpe(G + 2.5, 0.3, 70);
m.whoosh(O + 0.1, 0.7, 0.12); m.nota(O + 0.8, 64, 0.05, 0.6); m.nota(O + 1.4, 67, 0.05, 0.6); m.nota(O + 1.8, 69, 0.05, 0.6);
m.sube(S + 0.2, 1.4, 52, 64, 0.06);                                                          // crece a 50 cm
m.burbuja(S + 2.6, 0.12, 300); m.gota(S + 2.8, 0.2, 500);                                    // escape de la granja
m.gota(S + 3.8, 0.25, 420); m.burbuja(S + 3.9, 0.12, 260);                                   // la cubeta al río
m.metal(A + 0.6, 0.12, 620); m.tic(A + 0.9, 0.1, 1200); m.tic(A + 1.1, 0.1, 1100);           // placas en la lupa
m.metal(A + 2.7, 0.18, 900);                                                                  // levanta las espinas
m.whoosh(A + 3.1, 0.5, 0.1);                                                                  // el pez nativo se va
m.burbuja(Ai + 0.8, 0.16, 420); m.burbuja(Ai + 1.6, 0.12, 360);                              // toma aire
m.latido(Ai + 1.2, 0.15); m.latido(Ai + 2.0, 0.15);
m.sube(Ai + 3.0, 1.2, 57, 45, 0.05); m.cruje(Ai + 4.0, 0.2);                                 // el agua se seca, el lodo se agrieta
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.motor(P + 0.2, 2.2, 0.05);
m.golpe(I + 0.4, 0.3, 90);                                                                    // marca en el mapa
m.sube(I + 1.6, 1.8, 52, 69, 0.05); m.nota(I + 3.4, 69, 0.06, 0.9);                         // contador de toneladas
for (let i = 0; i < 6; i++) m.gota(I + 2.6 + i * 0.12, 0.08, 800 + i * 50);                  // tilapias
m.whoosh(R + 0.2, 1.0, 0.14); for (let i = 0; i < 6; i++) m.gota(R + 1.0 + i * 0.07, 0.07, 650);   // la red sale del agua
for (let i = 0; i < 8; i++) m.tic(R + 1.6 + (i + 1) * 0.27, 0.07, 900);                      // cada tilapia que se vuelve pleco
m.golpe(R + 4.0, 0.35, 55); m.cruje(R + 5.0, 0.5);                                           // 70–80 % · la red se rasga
for (let i = 0; i < 6; i++) m.tic(Tu + 0.3 + i * 0.35, 0.06, 500);                           // cava
m.cruje(Tu + 2.8, 0.6); m.golpe(Tu + 3.4, 0.4, 50);                                          // derrumbe de la orilla
m.golpe(H + 2.0, 0.2, 120); m.golpe(H + 2.6, 0.35, 70);                                      // tacha la sardina · cae el costal de pleco
m.nota(H + 2.9, 69, 0.06, 0.8); m.nota(H + 3.2, 72, 0.06, 0.8);
for (let i = 0; i < 6; i++) m.burbuja(H + 3.5 + i * 0.3, 0.06, 500 + i * 30);                // crías comiendo
for (let i = 0; i < 6; i++) m.tic(C + 0.2 + i * 0.35, 0.04, 2600);
m.cruje(C + 1.6, 0.25); m.nota(C + 2.4, 64, 0.06, 0.8); m.nota(C + 2.8, 69, 0.06, 1.0);      // tacha el río · flecha al acuario
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
