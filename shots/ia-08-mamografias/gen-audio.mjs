// gen-audio.mjs — cama grave + efectos del Shot IA #08 (mamografías con IA, ensayo MASAI). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mamografias base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 83);
const K = m.K;
const G = K.Gancho, M = K.Mamo, D = K.Doble, Tr = K.Triage, P = K.Pregunta, N = K.Numero, E = K.Estudio, Ch = K.Chicos, I = K.Intervalo, O = K.Ojo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.045, [45, 52, 57]);
m.golpe(G + 0.05, 0.3, 90);
m.sube(G + 0.9, 2.3, 64, 52, 0.04); m.sube(G + 0.9, 2.3, 60, 72, 0.04);          // lecturas bajan, cánceres suben
m.nota(G + 3.3, 72, 0.06, 0.7); m.nota(G + 3.35, 76, 0.05, 0.7);
m.whoosh(M, 0.5, 0.12); m.zumbido(M + 0.2, 1.0, 0.03, 300);                       // rayos X
m.golpe(D + 0.2, 0.25, 110); m.golpe(D + 0.8, 0.25, 120);                         // dos radiólogos
m.motor(Tr, 6.4, 0.035);                                                         // banda
[3, 7, 1, 10, 5, 9].forEach((sc, i) => { const t0 = Tr + 0.4 + i * 0.9; m.whoosh(t0, 0.4, 0.06); m.tic(t0 + 0.45, 0.25, 500); sc === 10 ? m.nota(t0 + 0.5, 79, 0.06, 0.4) : m.nota(t0 + 0.5, 69, 0.04, 0.3); });
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.sube(N + 0.5, 1.1, 52, 76, 0.04); m.sube(N + 2.7, 1.1, 52, 71, 0.04);            // 6.4 y 5.0
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 10; i++) m.tic(E + 1.5 + i * 0.12, 0.07, 1500 + i * 60);        // contador de mujeres
m.gota(Ch + 0.9, 0.18, 1200); m.metal(Ch + 1.0, 0.06, 2400);                      // la lupa encuentra el punto
m.golpe(Ch + 1.4, 0.2, 120); m.golpe(Ch + 3.4, 0.2, 120);
for (let i = 0; i < 8; i++) m.tic(I + 0.2 + i * 0.25, 0.06, 900);                 // pasa el tiempo (2 años)
m.sube(I + 2.5, 1.1, 52, 64, 0.04); m.sube(I + 3.3, 1.1, 52, 66, 0.04);
m.nota(I + 4.4, 72, 0.05, 0.6);
for (let i = 0; i < 4; i++) m.burbuja(O + 0.3 + i * 0.3, 0.14, 520 + i * 70);     // pines
m.sube(C + 0.4, 1.2, 64, 52, 0.04); m.sube(C + 0.4, 1.2, 60, 72, 0.04);
m.nota(C + 1.8, 72, 0.06, 0.8); m.nota(C + 1.85, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
