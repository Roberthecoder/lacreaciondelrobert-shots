// gen-audio.mjs — cama grave + efectos del Shot IA #33 (la IA que predice olores). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Olor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 33);
const K = m.K;
const G = K.Gancho, E = K.Espejo, Ca = K.Catalogo, R = K.Red, P = K.Pregunta, Es = K.Estudio, Re = K.Resultado, A = K.Almizcle, M = K.Mapa, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.9, 0.16);                                                            // inhalación
m.tic(G + 1.5, 0.25, 1500); m.golpe(G + 1.65, 0.2, 140);                            // la pinza en la nariz del robot
m.zumbido(G + 2.6, 0.8, 0.03, 420);                                                // escaneo de la hoja
m.nota(G + 4.2, 69, 0.06, 0.5); m.nota(G + 4.3, 74, 0.05, 0.5);                    // "huele a hierbabuena"
m.whoosh(E, 0.5, 0.12); m.metal(E + 0.85, 0.18, 1400);                             // el reflejo en el espejo
m.whoosh(E + 1.8, 0.3, 0.08);
m.nota(E + 3.5, 76, 0.06, 0.6); m.nota(E + 4.7, 64, 0.06, 0.6);                    // hierbabuena / alcaravea
for (let i = 0; i < 50; i += 2) m.tic(Ca + 0.3 + i * 0.058, 0.07, 1800 + (i % 7) * 140); // cuadritos que se llenan
[3.3, 3.9, 4.5].forEach((d, i) => m.burbuja(Ca + d, 0.14, 420 + i * 120));          // etiquetas
m.whoosh(R, 0.5, 0.12); m.zumbido(R + 0.2, 4.0, 0.02, 180);
for (let i = 0; i < 4; i++) m.nota(R + 1.2 + i * 0.35, m.ESC[4 + i * 2], 0.05, 0.3); // la onda cruza la red
m.sube(R + 2.6, 0.8, 60, 79, 0.04); m.gota(R + 3.35, 0.2, 1000);                    // cae en el mapa
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 15; i++) m.tic(Es + 4.4 + i * 0.08, 0.06, 1200 + i * 40);       // 15 panelistas
m.burbuja(Es + 6.4, 0.12, 600); m.burbuja(Es + 8.0, 0.12, 700);
for (let i = 0; i < 34; i++) m.tic(Re + 0.3 + i * 0.068, 0.05, 2100 + (i % 5) * 150); // 100 cuadritos
m.golpe(Re + 2.4, 0.4, 70); m.nota(Re + 2.5, 72, 0.06, 0.8);                       // 53 %
m.golpe(A + 0.5, 0.3, 60); m.nota(A + 0.5, 50, 0.06, 1.2, 0.6);                 // su peor resultado (tapado)
for (let i = 0; i < 5; i++) m.burbuja(A + 1.6 + i * 0.3, 0.12, 300 + i * 70);       // cinco familias
for (let i = 0; i < 40; i++) m.tic(M + 0.4 + 3.2 * Math.sqrt(i / 40), 0.04 + i * 0.001, 2600 + (i % 6) * 200); // lluvia de puntos
m.sube(M + 0.4, 3.2, 52, 76, 0.03);
for (let i = 0; i < 8; i++) m.tic(M + 4.0 + i * 0.4, 0.12, 900);                     // tic-tac de los 70 años
m.golpe(M + 4.0, 0.35, 70);
m.whoosh(C, 0.8, 0.14); m.nota(C + 0.5, 72, 0.06, 0.8); m.nota(C + 0.55, 76, 0.05, 0.8);
m.gota(C + 1.0, 0.18, 1000);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
