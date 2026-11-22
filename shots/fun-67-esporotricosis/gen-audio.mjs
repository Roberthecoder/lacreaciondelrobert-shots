// gen-audio.mjs — cama + efectos del Shot Fungi Mati #67 (esporotricosis). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: empieza cálida en fa mayor (jardín: F–Dm–B♭–C), se oscurece a re menor mientras el hongo avanza por el brazo
// (Dm–B♭–Gm–A) y vuelve a fa mayor con el guante. Un motivo de jardín de 5 notas (do–fa–la–sol–fa) que cambia de final.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esporotricosis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 67);
const K = m.K;
const G = K.Gancho, N = K.Nombre, En = K.Entra, Di = K.Dimorfo, Bu = K.Bulto, Ca = K.Cadena, P = K.Pregunta, Ga = K.Gatos, E = K.Estudio, Mx = K.Mexico, Mi = K.Mineros, C = K.Cierre, Ou = K.Outro;

const ACORDES = [[G, N, [41, 53, 57, 60]], [N, En, [38, 53, 57, 62]], [En, Di, [34, 53, 58, 62]], [Di, Bu, [36, 52, 55, 60]],
  [Bu, Ca, [38, 50, 53, 57]], [Ca, P, [34, 50, 53, 58]], [P, Ga, [45, 49, 52, 57]], [Ga, E, [38, 50, 53, 57]],
  [E, Mx, [43, 50, 55, 58]], [Mx, Mi, [41, 53, 57, 60]], [Mi, C, [38, 50, 53, 57]], [C, Ou + 3.5, [41, 53, 57, 60]]];
for (const [a, b, n] of ACORDES) m.pad(a, b + 0.15, 0.045, n, 0);
const MOT = [72, 77, 81, 79, 77];
const motivo = (t, notas = MOT, g = 0.04, paso = 0.28) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, 0.45));
motivo(G + 1.8); motivo(N + 2.4, [72, 77, 81, 79, 74], 0.035); motivo(Di + 2.6, [69, 74, 77, 76, 74], 0.035);
motivo(Ga + 3.2, [69, 74, 77, 76, 73], 0.035); motivo(Mx + 3.2, [72, 77, 81, 79, 77], 0.035); motivo(C + 2.2, [72, 77, 81, 84, 81], 0.05, 0.32);
// efectos
m.tic(G + 0.45, 0.25, 3400); m.gota(G + 0.8, 0.2, 1000); m.golpe(G + 1.6, 0.25, 85);            // piquete · gotita · tache
for (let i = 0; i < 4; i++) m.burbuja(N + 0.4 + i * 0.5, 0.12, 500 + i * 80);                     // 4 íconos
m.whoosh(En + 0.3, 0.6, 0.12); m.cruje(En + 1.0, 0.25); m.sube(En + 2.0, 1.6, 55, 67, 0.04);      // lupa · la espina entra · termómetro
for (let i = 0; i < 3; i++) m.cruje(Di + 0.3 + i * 0.3, 0.15); 
for (let i = 0; i < 5; i++) m.gota(Di + 2.0 + i * 0.2, 0.1, 800 + i * 60);                         // aparecen las levaduras
for (let i = 0; i < 12; i++) m.tic(Bu + 0.3 + i * 0.16, 0.06, 1500);                               // pasan las semanas
m.golpe(Bu + 2.3, 0.25, 110);                                                                       // el bultito
m.sube(Ca + 0.2, 1.4, 50, 57, 0.03); for (let i = 0; i < 3; i++) m.golpe(Ca + 1.4 + i * 0.6, 0.2, 100 + i * 10); // la fila
m.sube(P + 0.1, 1.4, 52, 64, 0.04);
m.whoosh(Ga + 1.4, 0.3, 0.2); m.cruje(Ga + 1.5, 0.3);                                             // zarpazo
m.golpe(E + 0.2, 0.3, 75); for (let i = 0; i < 16; i++) m.tic(E + 1.0 + i * 0.12, 0.05, 1300 + i * 40); // contador
for (let i = 0; i < 3; i++) m.nota(Mx + 1.0 + i * 0.4, [65, 60, 57][i], 0.05, 0.6);                // barras
for (let t = 0.4; t < C - Mi - 0.5; t += 1.3) m.metal(Mi + t, 0.06, 700);                          // pico en la mina (eco)
m.whoosh(C + 0.6, 0.6, 0.1); m.tic(C + 1.6, 0.15, 900);                                           // la espina toca el guante
m.nota(Ou + 0.3, 53, 0.07, 3); m.nota(Ou + 0.3, 60, 0.05, 3); m.nota(Ou + 0.3, 65, 0.05, 3); m.nota(Ou + 0.5, 69, 0.04, 2.6);
m.guardar(OUT, 1);
