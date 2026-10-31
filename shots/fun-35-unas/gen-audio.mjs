// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #35 (hongos en las uñas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Unas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 35);
const K = m.K;
const G = K.Gancho, Cu = K.Culpable, En = K.Entrada, Q = K.Queratina, D = K.Dano, P = K.Pregunta, R = K.Raiz, Es = K.Estudio, Re = K.Resultado, Ti = K.Tiempo, Rg = K.Regresa, S = K.Sirve, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.25);                                 // cama grave, lenta (paciencia)
m.whoosh(G + 0.15, 0.6, 0.12); m.golpe(G + 0.8, 0.35, 90);                    // cae la cajita de pastillas
for (let i = 0; i < 8; i++) m.tic(G + 1.0 + i * 0.25, 0.1, 1200); // se van las pastillas
m.nota(G + 0.9, 69, 0.05, 0.6);                                                // ✓ 12 semanas
for (let i = 0; i < 12; i++) m.tic(G + 3.6 + i * 0.3, 0.07, 2200);             // hojas del calendario
m.nota(G + 3.6, 57, 0.05, 1.2, 0.5);                                           // "1 año o más" (nota tapada)
m.sube(Cu, 0.8, 52, 64, 0.04);                                                 // se abre la lupa
m.cruje(Cu + 0.6, 0.25);                                                       // crecen las hifas
m.whoosh(En - 0.2, 0.7, 0.1);
for (let i = 0; i < 6; i++) m.cruje(En + 0.6 + i * 0.5, 0.12);                 // el hongo avanza bajo la uña
m.zumbido(Q, 2.8, 0.025, 120);                                                 // microscopio
for (let i = 0; i < 12; i++) m.burbuja(Q + 1.0 + i * 0.2, 0.06, 420 + (i % 4) * 60); // enzimas
m.cruje(Q + 2.2, 0.3);                                                         // la queratina se deshace
m.nota(D + 0.2, 60, 0.05, 0.4); m.nota(D + 0.7, 57, 0.05, 0.4); m.cruje(D + 1.3, 0.6); // color, grosor, se quiebra
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                            // ¿por qué?
m.latido(R + 0.3, 0.18); m.latido(R + 1.1, 0.18); m.latido(R + 1.9, 0.18);    // la raíz trabaja
m.sube(R + 1.0, 3.5, 48, 55, 0.035);                                           // la uña nueva empuja
m.golpe(Es + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 22; i++) m.tic(Es + 1.4 + i * 0.07, 0.07, 1500);           // 22 jóvenes
for (let i = 0; i < 22; i++) m.tic(Es + 3.0 + i * 0.05, 0.04, 3000);           // 22 marquitas
m.sube(Re + 0.3, 1.9, 60, 72, 0.04); m.nota(Re + 2.2, 72, 0.05, 0.6);          // manos: 3,47 mm
m.sube(Re + 2.4, 1.8, 60, 64, 0.04); m.nota(Re + 4.2, 64, 0.05, 0.6);          // pies: 1,62 mm (sube menos)
for (let i = 0; i < 18; i++) m.tic(Ti + 0.2 + i * 0.17, 0.06, 1800 + i * 40);  // 18 meses
m.nota(Rg + 1.4, 52, 0.07, 1.0, 0.4); m.golpe(Rg + 1.4, 0.3, 70);              // el hongo regresa
for (let i = 0; i < 8; i++) m.gota(S + i * 0.5, 0.06, 900 + (i % 3) * 200);     // regadera
m.golpe(S + 0.8, 0.25, 110); m.golpe(S + 1.0, 0.25, 120);                      // chanclas
m.nota(S + 0.8, 69, 0.05, 0.6); m.nota(S + 2.0, 72, 0.05, 0.6);
m.sube(C + 1.2, 2.4, 57, 69, 0.04); m.nota(C + 3.6, 76, 0.05, 1.2);            // la uña sana llega a la punta
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
