// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #20 (el quitridio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Quitridio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 20);
const K = m.K;
const G = K.Gancho, P = K.Piel, Z = K.Zoosporas, Q = K.Queratina, E = K.Engrosa, Pr = K.Pregunta, Es = K.Estudio, C = K.Corazon, Sp = K.Especies, M = K.Mexico, Sa = K.Salamandras, Ci = K.Cierre, Ou = K.Outro;

// cama grave, tapada y triste (el problema no se resuelve)
m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.35);

// latido de la rana que se hace lento (misma fórmula que latidoEn() del jsx: f = 1.6 − 0.16·t; pico en fase n + 0.25)
const f0 = 1.6, k = 0.16;
for (let n = 0; ; n++) { const disc = f0 * f0 - 2 * k * (n + 0.25); if (disc < 0) break; const t = (f0 - Math.sqrt(disc)) / k; if (t > Z - 0.2) break; m.latido(G + t, 0.24 * (1 - t / 14)); }
for (let i = 0; i < 7; i++) m.tic(G + 0.4 + i * 0.6, 0.05, 3200 + i * 150);   // copos de piel que caen
m.cruje(G + 1.2, 0.35);                                                          // "¿dormida?" tachado
m.whoosh(P + 0.3, 0.7, 0.12);                                                    // se abre la lupa
for (let i = 0; i < 6; i++) m.gota(P + 0.9 + i * 0.5, 0.1, 700 + (i % 3) * 200); // agua y sales que cruzan la piel
// zoosporas nadando
m.whoosh(Z, 1.2, 0.1);
for (let i = 0; i < 12; i++) m.burbuja(Z + 0.3 + i * 0.38, 0.06, 420 + (i % 4) * 90);
// una espora llega, se pega, pierde la cola y entra; crecen las bolsitas y sueltan esporas
m.gota(Q + 1.0, 0.18, 1200); m.sube(Q + 1.0, 0.5, 64, 57, 0.04); m.sube(Q + 1.5, 0.5, 57, 50, 0.04);
[2.0, 2.4, 2.9, 3.3].forEach((d, i) => m.nota(Q + d, 52 + i * 3, 0.05, 0.9, 0.5));
m.burbuja(Q + 3.5, 0.12, 600); m.burbuja(Q + 3.8, 0.12, 700); m.burbuja(Q + 4.1, 0.12, 650);
// la piel se engruesa y las sales se atoran
m.sube(E, 1.4, 45, 40, 0.06); m.cruje(E + 0.3, 0.25);
for (let i = 0; i < 8; i++) m.tic(E + 0.9 + i * 0.22, 0.06, 1800 - i * 120);    // el medidor baja
m.golpe(E + 1.6, 0.3, 75); m.golpe(E + 1.8, 0.25, 70);                          // ✗ sales atoradas
m.sube(Pr + 0.1, 1.5, 50, 62, 0.05);                                             // re-gancho
// el estudio
m.golpe(Es + 0.2, 0.35, 80); m.whoosh(Es + 1.4, 0.6, 0.1); m.metal(Es + 1.9, 0.12, 1700);
for (let i = 0; i < 4; i++) m.latido(Es + 0.6 + i * 0.75, 0.1);
// sodio y potasio bajan; electrocardiograma que se apaga (tiempos = ECG del jsx)
m.sube(C + 0.8, 1.0, 57, 54, 0.04); m.sube(C + 1.4, 1.2, 55, 48, 0.05);
const ecg = (x) => C + 0.4 + (x - 280) / 740 * 3.6;
[[330, 1], [450, 0.9], [590, 0.72], [760, 0.5], [930, 0.28]].forEach(([x, A]) => { m.nota(ecg(x), 93, 0.05 * A + 0.02, 0.18); m.latido(ecg(x), 0.2 * A); });
m.nota(ecg(980), 93, 0.035, 1.2);                                                // línea plana
m.golpe(C + 3.6, 0.3, 65);
// 501 especies aparecen, se apagan y 90 se van a negro
for (let i = 0; i < 20; i++) m.tic(Sp + 0.3 + i * 0.09, 0.05, 2000 + i * 40);
m.sube(Sp + 2.2, 0.8, 60, 52, 0.05);
for (let i = 0; i < 10; i++) m.golpe(Sp + 3.3 + i * 0.1, 0.12, 60);
m.nota(Sp + 4.4, 48, 0.06, 1.5, 0.6);
// frascos de museo y la ola que sale del sur de México
[0, 0.25, 0.5].forEach((d) => m.metal(M + d, 0.1, 2100 + d * 400));
m.whoosh(M + 1.4, 2.6, 0.08);
[1.4, 2.6, 4.0].forEach((d, i) => { m.golpe(M + d, 0.25, 80 - i * 6); m.nota(M + d, 57 - i * 2, 0.05, 0.8, 0.4); });
// el primo: Batrachochytrium salamandrivorans
m.whoosh(Sa, 1.0, 0.12);
for (let i = 0; i < 10; i++) m.tic(Sa + 1.0 + i * 0.12, 0.05, 1500 + i * 60);
m.sube(Sa + 2.6, 1.6, 57, 43, 0.06);
m.golpe(Sa + 4.3, 0.4, 70); [0, 1, 2, 3].forEach((i) => m.nota(Sa + 4.4 + i * 0.15, 69 + i * 2, 0.04, 0.5));
// cierre: la misma rana, ya gris; la lupa muestra las bolsitas
m.sube(Ci, 1.6, 52, 45, 0.04); m.whoosh(Ci + 1.2, 0.7, 0.1);
m.burbuja(Ci + 1.8, 0.08, 600); m.burbuja(Ci + 2.6, 0.08, 650);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
