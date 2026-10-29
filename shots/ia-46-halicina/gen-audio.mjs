// gen-audio.mjs — cama grave + efectos del Shot IA #46 (halicina, el antibiótico que predijo una IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Halicina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 46);
const K = m.K;
const G = K.Gancho, A = K.Aprende, B = K.Busca, H = K.Halicina, P = K.Pregunta, Ba = K.Bateria, R = K.Ratones, Tr = K.Treinta, Ab = K.Abaucina, O = K.Ojo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.35, 0.12); m.burbuja(G + 0.15, 0.16, 420);                           // aparece la molécula
m.cruje(G + 2.6, 0.3);                                                               // se tacha "para la diabetes"
m.nota(G + 4.0, 72, 0.06, 0.6); m.nota(G + 4.05, 79, 0.05, 0.6);                    // la IA predice
for (let i = 0; i < 5; i++) m.tic(G + 4.3 + i * 0.12, 0.08, 2600 + i * 200);        // brillitos
m.whoosh(A, 0.5, 0.12); m.zumbido(A + 0.3, 7.0, 0.018, 160);                        // por dentro de la máquina
const si = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0];
for (let i = 0; i < 10; i++) m.nota(A + 1.15 + i * 0.6, si[i] ? 76 : 64, 0.04, 0.25);  // ✔ / ✘ de cada ficha
m.sube(A + 0.6, 4.5, 50, 74, 0.03);                                                  // contador 2,335
m.whoosh(B, 0.5, 0.12); m.zumbido(B + 0.3, 3.9, 0.035, 240);                        // escaneo
for (let i = 0; i < 12; i++) m.tic(B + 0.5 + i * 0.32, 0.06, 1800);
m.nota(B + 4.3, 84, 0.07, 0.8);                                                      // ding: la elegida
m.golpe(H + 0.1, 0.35, 70); m.nota(H + 0.4, 69, 0.05, 0.5);
m.zumbido(H + 1.6, 3.0, 0.03, 110);                                                  // el ojo rojo
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.whoosh(Ba, 0.6, 0.14);
for (let i = 0; i < 3; i++) m.burbuja(Ba + 1.2 + i * 0.3, 0.14, 380 + i * 60);      // llegan las moléculas
m.sube(Ba + 2.2, 3.2, 70, 45, 0.05);                                                 // la batería se vacía
m.golpe(R + 0.2, 0.35, 80);                                                          // tarjeta del estudio
m.burbuja(R + 2.6, 0.12, 700); m.burbuja(R + 3.4, 0.12, 650);                       // los ratones
m.nota(R + 4.4, 72, 0.05, 0.6);
for (let i = 0; i < 30; i++) m.tic(Tr + 0.2 + i * 0.075, 0.05, 2100 + (i % 6) * 100); // 30 días
m.whoosh(Ab + 0.6, 0.9, 0.12);                                                       // la mira se mueve
[0, 2, 5].forEach((i) => m.golpe(Ab + 1.6 + i * 0.12, 0.25, 95));                    // A. baumannii cae
m.golpe(O + 0.8, 0.5, 60);                                                           // sello "aún no aprobada"
m.cruje(C + 1.0, 0.3); m.nota(C + 1.6, 72, 0.06, 0.8); m.nota(C + 1.65, 76, 0.05, 0.8);
for (let i = 0; i < 5; i++) m.tic(C + 2.6 + i * 0.12, 0.08, 2600 + i * 200);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
