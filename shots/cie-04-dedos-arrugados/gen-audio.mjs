// gen-audio.mjs — cama grave + efectos del Shot Científico #04 (dedos arrugados). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Dedos Arrugados base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, P = K.Piel, M = K.Mito, N = K.Nervio, Q = K.Pregunta, V = K.Vasos, L = K.Pliegue, Pr = K.Prueba, E = K.Estudio, R = K.Rapido, B = K.Berlin, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 4; i++) m.gota(G + 0.2 + i * 0.7, 0.18, 900 + i * 60);          // gotas del gancho
m.sube(G + 0.1, 2.4, 57, 64, 0.04);                                                  // la yema se arruga
m.nota(P + 0.4, 69, 0.06, 0.8); m.nota(P + 1.4, 72, 0.05, 0.8);                       // se iluminan palmas, yemas, plantas
for (let i = 0; i < 5; i++) m.gota(M + i * 0.4, 0.14, 800);                            // el agua "entra"
m.cruje(M + 2.6, 0.35);                                                              // se tacha el mito
m.golpe(N + 0.4, 0.3, 70);                                                           // la X roja en el nervio
m.sube(N + 0.8, 2.6, 57, 62, 0.035);
m.sube(Q + 0.1, 1.4, 52, 64, 0.05);
m.whoosh(V - 0.2, 0.6, 0.12);
for (let i = 0; i < 4; i++) m.tic(V + 0.3 + i * 0.25, 0.12, 2000);                     // señal del nervio
for (let i = 0; i < 5; i++) m.latido(V + 0.8 + i * 0.75, 0.16 - i * 0.025);            // menos sangre: el pulso se apaga
m.sube(L + 0.3, 2.4, 62, 55, 0.04);                                                  // la piel se pliega
m.burbuja(Pr + 0.6, 0.15, 400); m.burbuja(Pr + 0.9, 0.12, 460); m.nota(Pr + 1.1, 76, 0.06, 0.6);
m.golpe(E + 0.25, 0.35, 80);
for (let i = 0; i < 8; i++) m.tic(E + 3.2 + i * 0.7, 0.14, 2600 + (i % 3) * 200);     // cada canica cae en la caja
m.sube(R + 0.2, 1.2, 52, 64, 0.05); m.golpe(R + 1.4, 0.3, 60);
m.golpe(B + 0.25, 0.3, 75); m.nota(B + 2.4, 57, 0.06, 1.0);
for (let i = 0; i < 3; i++) m.gota(C + 0.4 + i * 0.6, 0.14, 900);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
