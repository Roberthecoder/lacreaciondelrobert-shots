// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #34 (Candida albicans). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Candida base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 34);
const K = m.K;
const G = K.Gancho, Ca = K.Casa, V = K.Vecinas, Ab = K.Antibiotico, Tr = K.Truco, Fo = K.Formas, P = K.Pregunta, In = K.Invade, Es = K.Estudio, Tx = K.Toxina, Pl = K.Placas, Q = K.Quien, Al = K.Algodon, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ab, 0.05, [45, 52, 57], 0.2);                                       // cama tibia: todo en calma
m.pad(Ab, Pl, 0.05, [44, 51, 56], 0.5);                                      // se tensa: antibiótico, hifas, toxina
m.pad(Pl, C, 0.05, [45, 52, 57], 0.3);
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                 // regresa la calma
m.burbuja(G + 0.25, 0.14, 520); m.burbuja(G + 0.45, 0.14, 600);              // salen las burbujas de las bocas
m.gota(G + 1.0, 0.12, 900); m.gota(G + 1.2, 0.12, 900);                      // brotan las levaduras
m.nota(G + 1.2, 64, 0.06, 0.8);                                              // "="
for (let i = 0; i < 3; i++) m.nota(Ca + 0.2 + i * 0.6, 60 + i * 4, 0.05, 0.5); // se encienden boca, intestino y piel
for (let i = 0; i < 8; i++) m.tic(V - 0.3 + i * 0.1, 0.06, 2000 + i * 120);  // aparecen las bacterias
m.whoosh(Ab + 0.2, 1.6, 0.16);                                               // pasa el antibiótico
for (let i = 0; i < 6; i++) m.cruje(Ab + 0.5 + i * 0.25, 0.12);              // se apagan las bacterias
for (let i = 0; i < 10; i++) m.gota(Ab + 1.8 + i * 0.2, 0.1, 700 + i * 40);   // brotan levaduras nuevas
m.gota(Tr + 0.2, 0.14, 800); m.nota(Tr + 0.5, 67, 0.05, 0.6);                // la levadura y su truco
m.sube(Fo + 0.2, 2.8, 50, 62, 0.05);                                         // la hifa se estira
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                          // ¿?
m.sube(In + 0.3, 2.3, 48, 40, 0.04); m.golpe(In + 1.4, 0.3, 70);             // la hifa entra a la célula
m.golpe(Es + 0.2, 0.35, 80);                                                 // tarjeta del estudio
for (let i = 0; i < 16; i++) m.tic(Es + 2.4 + i * 0.08, 0.05, 2800);          // sale la candidalisina
m.cruje(Tx + 0.4, 0.35); m.cruje(Tx + 1.2, 0.35); m.golpe(Tx + 2.0, 0.3, 60); // se daña la membrana
m.metal(Tx + 2.3, 0.08, 1300); m.golpe(Tx + 2.8, 0.25, 90);                  // ratón sin toxina ✗
for (let i = 0; i < 10; i++) m.gota(Pl + 0.6 + i * 0.3, 0.08, 600 + i * 30);  // aparecen las placas
for (let i = 0; i < 4; i++) m.metal(Q + 0.4 + i * 1.1, 0.1, 1800);           // campanita de cada ícono
m.whoosh(Al + 0.2, 1.0, 0.1); m.burbuja(Al + 1.2, 0.1, 300);                 // entra el algodón
m.burbuja(C + 0.3, 0.12, 520); m.burbuja(C + 0.5, 0.12, 600);
for (let i = 0; i < 6; i++) m.tic(C + 1.0 + i * 0.12, 0.05, 2200);            // regresan las bacterias
m.nota(C + 1.6, 69, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
