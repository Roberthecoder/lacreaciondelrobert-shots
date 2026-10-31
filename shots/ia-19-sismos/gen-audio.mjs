// gen-audio.mjs — cama grave + efectos del Shot IA #19 (¿la IA puede predecir sismos?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sismos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K;
const G = K.Gancho, P = K.Predecir, A = K.Alerta, E = K.Escuchar, Q = K.Pregunta, L = K.Laboratorio, R = K.Replicas, N = K.Neurona, C = K.Cierre, Ou = K.Outro;
const L2 = L + (R - L) * 0.81;

m.pad(0, Ou + 3.5, 0.05, [38, 45, 50]);                                          // retumbo grave de tierra
m.motor(G, 1.8, 0.06);                                                             // el celular vibra
for (let i = 0; i < 6; i++) m.tic(G + i * 0.3, 0.08, 180);
m.golpe(G + 3.4, 0.55, 55);                                                        // sello "ningún científico"
m.burbuja(G + 5.5, 0.15, 500); m.cruje(G + 6.3, 0.35);                             // robotito y bola de cristal tachada
m.whoosh(P - 0.2, 0.5, 0.12);
[0.3, 0.8, 1.3].forEach((d) => m.tic(P + d, 0.2, 1200));                           // aparecen las casillas
[2.2, 2.5, 2.8].forEach((d) => m.golpe(P + d, 0.25, 90));                         // X roja
m.whoosh(A - 0.2, 0.5, 0.12);
for (let i = 0; i < 16; i++) m.tic(A + 0.3 + i * 0.05, 0.06, 2200);                // sensores en la costa
m.golpe(A + 2.0, 0.5, 45); m.motor(A + 2.0, 3.5, 0.05);                            // el sismo empieza
m.sube(A + 2.4, 0.7, 60, 84, 0.04);                                                // la señal de radio (rápida)
for (let i = 0; i < 6; i++) m.nota(A + 3.1 + i * 0.4, i % 2 ? 76 : 81, 0.04, 0.3); // bocina (aviso, sin imitar la oficial)
m.zumbido(E, 7.0, 0.02, 160);                                                      // dentro de la máquina
for (const u of [0.12, 0.27, 0.4, 0.55, 0.66, 0.8, 0.9]) m.gota(E + 1.0 + u * 2.3 / 1.1, 0.18, 1100); // cada sismo diminuto encontrado
m.sube(E + 3.7, 1.0, 52, 64, 0.04); m.sube(E + 3.7, 1.0, 52, 76, 0.04);            // 8 521 vs 21 092
m.sube(Q + 0.05, 1.4, 48, 60, 0.05); m.cruje(Q + 1.2, 0.3);                       // la falla cruje
m.golpe(L + 0.3, 0.3, 80);
for (let t = L + 0.4; t < L2; t += 2.3) m.metal(t, 0.18, 620);                     // "clac" de cada sismo de laboratorio
m.whoosh(L2, 0.8, 0.15);                                                           // zoom out a la Tierra
m.whoosh(R - 0.2, 0.5, 0.12); m.golpe(R + 0.4, 0.35, 60);
for (let i = 0; i < 18; i++) m.tic(R + 0.6 + i * 0.1, 0.06, 1500 + (i % 4) * 150);  // réplicas que se encienden
m.sube(R + 2.9, 1.0, 52, 72, 0.04); m.sube(R + 2.9, 1.0, 52, 66, 0.04);
m.golpe(N + 0.2, 0.3, 80);
m.nota(N + 1.8, 72, 0.07, 0.8);                                                    // una sola neurona: "ding"
m.zumbido(N + 3.2, 2.6, 0.04, 240);                                                // la red enorme zumba
m.nota(N + 4.6, 76, 0.06, 0.6); m.nota(N + 4.65, 79, 0.05, 0.6);                   // mismo acierto
m.whoosh(C + 0.6, 0.9, 0.15); m.golpe(C + 1.5, 0.3, 70);                           // el mensaje a la basura
m.burbuja(C + 1.9, 0.15, 520);
for (let i = 0; i < 4; i++) m.tic(C + 2.3 + i * 0.25, 0.06, 900);
m.nota(Ou + 0.3, 50, 0.08, 2.8); m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 62, 0.05, 2.8);
m.guardar(OUT, 1);
