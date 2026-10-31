// gen-audio.mjs — cama grave + efectos del Shot IA #27 (implantes + IA que devolvieron el habla). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot VozDevuelta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 27);
const K = m.K;
const G = K.Gancho, I = K.Implante, O = K.Ordenes, IA = K.IA, R = K.Rapidez, P = K.Pregunta, B = K.Boda, E = K.Estudio, L = K.Lagrimas, Oj = K.Ojo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.nota(G + 0.05, 76, 0.05, 0.3); m.nota(G + 0.15, 81, 0.05, 0.4);                 // se enciende el monitor
for (let i = 0; i < 6; i++) m.burbuja(G + 0.5 + i * 0.5, 0.06, 420 + i * 30);      // pulsos del cable
m.whoosh(I, 0.5, 0.12); m.golpe(I + 0.6, 0.3, 90);                                // cae la lámina
for (let i = 0; i < 40; i++) m.tic(I + 1.2 + i * 0.07, 0.05, 1800 + (i % 6) * 110); // 253 electrodos encendiéndose
m.zumbido(O + 0.3, 4.6, 0.025, 160);                                              // por dentro
for (let i = 0; i < 6; i++) m.tic(O + 0.8 + i * 0.6, 0.12, 3200);                 // chispas
m.golpe(O + 2.3, 0.45, 60);                                                       // la barrera del infarto
m.zumbido(IA + 0.2, 3.8, 0.03, 300);                                              // red neuronal
m.nota(IA + 1.2, 69, 0.05, 0.4); m.nota(IA + 1.6, 72, 0.05, 0.4); m.nota(IA + 2.0, 76, 0.05, 0.5);  // texto, voz, gestos
m.sube(R + 0.4, 1.0, 48, 52, 0.04);                                               // aguja a 14
m.sube(R + 2.6, 1.2, 52, 76, 0.05);                                               // aguja a 78
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.motor(B + 0.1, 1.6, 0.03);                                                      // proyector de la tele vieja
m.whoosh(B + 0.6, 1.2, 0.1); m.nota(B + 1.9, 72, 0.06, 0.8); m.nota(B + 1.95, 79, 0.04, 0.8);
m.golpe(E + 0.2, 0.35, 80);
m.sube(E + 3.1, 1.0, 52, 70, 0.04); m.sube(E + 3.7, 1.0, 52, 67, 0.04); m.sube(E + 6.0, 1.0, 52, 79, 0.04);
for (let i = 0; i < 24; i++) m.nota(L + 0.8 + i * 0.1, m.ESC[i % 8 + 2], 0.025, 0.15); // 97 palabras
for (let i = 0; i < 3; i++) m.tic(L + 3.3 + i * 0.08, 0.1, 700);                  // 3 fallas
m.gota(L + 3.8, 0.2, 900); m.gota(L + 5.0, 0.15, 950);                           // lágrima
for (let i = 0; i < 3; i++) m.tic(Oj + 0.2 + i * 0.3, 0.15, 1500);
m.golpe(Oj + 2.4, 0.5, 70);                                                       // sello
m.nota(C + 0.3, 69, 0.05, 1.2); m.nota(C + 1.2, 76, 0.06, 1.2); m.nota(C + 1.25, 81, 0.04, 1.4);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
