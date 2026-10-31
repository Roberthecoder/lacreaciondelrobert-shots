// gen-audio.mjs — cama grave + efectos del Shot IA #16 (programadores que creían ir más rápido con IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Programadores base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 16);
const K = m.K;
const G = K.Gancho, A = K.Apuesta, E = K.Estudio, S = K.Sorteo, P = K.Pregunta, Pa = K.Pantalla, M = K.Matices, Co = K.Contraste, Gi = K.Giro, C = K.Cierre, Ou = K.Outro;
const PA2 = Pa + 5.1;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 14; i++) m.tic(G + 0.05 + i * 0.12, 0.05, 2600 + (i % 3) * 200);   // tecleo del cuadro 0
m.sube(G + 0.15, 0.8, 55, 72, 0.04);                                                   // −20 % (lo que sintieron)
m.whoosh(G + 4.3, 0.4, 0.14); m.golpe(G + 4.7, 0.45, 70);                              // cae el cronómetro, se tacha
m.sube(G + 4.6, 0.9, 72, 50, 0.04);                                                    // +19 % (baja)
for (let i = 0; i < 6; i++) m.tic(G + 5.2 + i * 0.5, 0.12, 1500);                      // tictac
m.whoosh(A, 0.5, 0.12); m.sube(A + 0.3, 0.8, 55, 70, 0.035); m.sube(A + 1.3, 0.8, 55, 68, 0.035); m.sube(A + 2.1, 0.8, 68, 50, 0.04);
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 16; i++) m.burbuja(E + 3.4 + i * 0.07, 0.06, 450 + i * 20);          // 16 caritas
for (let i = 0; i < 26; i++) m.tic(E + 4.0 + i * 0.1, 0.05, 2200 + (i % 4) * 150);       // 246 tareas
m.whoosh(S, 0.5, 0.12); m.metal(S + 0.5, 0.12, 1200);                                    // el dado
for (let i = 0; i < 10; i++) m.whoosh(S + 0.4 + i * 0.3, 0.25, 0.05);                    // tareas que vuelan
m.nota(S + 2.6, 76, 0.04, 0.3);                                                          // REC
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(Pa + 0.3, 8.0, 0.02, 170);
m.burbuja(Pa + 1.6, 0.14, 600); m.tic(Pa + 2.8, 0.15, 1300); m.tic(Pa + 3.3, 0.15, 1300); m.nota(Pa + 3.8, 64, 0.05, 0.4);
for (let i = 0; i < 25; i++) m.tic(PA2 + 0.15 + i * 0.07, 0.04, 2400);                  // aparecen las sugerencias
for (let i = 0; i < 7; i++) m.nota(PA2 + 2.2 + i * 0.06, i % 2 ? 72 : 60, 0.03, 0.25);   // ✔ / ✖
m.whoosh(M, 0.5, 0.12); for (let i = 0; i < 14; i++) m.tic(M + 0.3 + i * 0.12, 0.08, 900 + i * 40); // la torre de código
m.golpe(M + 3.6, 0.3, 75);
m.golpe(Co + 0.2, 0.35, 80); m.sube(Co + 3.1, 1.0, 52, 70, 0.04); m.sube(Co + 3.1, 1.0, 52, 62, 0.03);
m.nota(Co + 4.4, 72, 0.05, 0.5); m.nota(Co + 4.45, 76, 0.04, 0.5);
m.whoosh(Gi, 0.5, 0.12); m.golpe(Gi + 0.2, 0.3, 90); m.sube(Gi + 1.6, 0.8, 60, 72, 0.035); m.zumbido(Gi + 3.6, 1.0, 0.03, 140);
m.whoosh(C, 0.5, 0.12); for (let i = 0; i < 4; i++) m.tic(C + 0.4 + i * 0.5, 0.1, 1500);
m.cruje(C + 2.2, 0.3); m.nota(C + 2.6, 72, 0.06, 0.8); m.nota(C + 2.65, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
