// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #132 (huevos de tortuga y Fusarium). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama continua en la menor con armonía que avanza por escena (nunca el mismo acorde más de ~5 s),
// un motivo propio de 4 notas (la–do–mi–re) que aparece en el gancho, se oscurece en el re-gancho y regresa resuelto en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tortuga Huevos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 132);
const K = m.K;
const G = K.Gancho, N = K.Nido, Li = K.Limpio, Ar = K.Arena, Ca = K.Cascara, M = K.Manchas, Co = K.Contagio, P = K.Pregunta, E = K.Estudio, D = K.Datos, Mu = K.Mundo, Cl = K.Calor, C = K.Cierre, Ou = K.Outro;

// armonía: (inicio, fin, voces MIDI, tapa 0..1 = sonido ahogado mientras crece el problema)
const ACORDES = [
  [0, N, [45, 52, 57, 60], 0],          // Am — la playa
  [N, Li, [41, 48, 57, 60], 0],          // F — el nido
  [Li, Ar, [48, 55, 60, 64], 0],         // C — huevos limpios
  [Ar, Ca, [43, 50, 55, 59], 0.25],      // G — la arena por dentro
  [Ca, M, [38, 45, 53, 57], 0.35],       // Dm — entra en la cáscara
  [M, P, [40, 47, 52, 55], 0.45],        // Em — muere el embrión, contagio
  [P, E, [41, 48, 53, 57], 0.2],         // F — la pregunta
  [E, D + 3, [45, 52, 57, 60], 0.1],     // Am — el estudio
  [D + 3, Mu, [41, 48, 57, 60], 0.3],    // F — los inundados
  [Mu, Mu + 4, [48, 55, 60, 64], 0],     // C — el mundo
  [Mu + 4, Cl, [43, 50, 55, 62], 0],     // G — Oaxaca
  [Cl, C, [38, 45, 53, 57], 0.15],       // Dm — la temperatura
  [C, Ou + 3.5, [45, 52, 57, 64], 0],    // Am(add) — regreso a la playa
];
for (const [a, b, v, tapa] of ACORDES) m.pad(a, b + 0.3, 0.045, v, tapa);
const motivo = (t, base, g = 0.06, paso = 0.32) => [0, 3, 7, 5].forEach((d, i) => m.nota(t + i * paso, base + d, g * (1 - i * 0.12), 0.9));

// 1 · gancho: el huevo rueda; el motivo se presenta
m.whoosh(G + 0.05, 1.1, 0.12); m.tic(G + 1.2, 0.25, 700); motivo(G + 1.3, 69);
for (let i = 0; i < 6; i++) m.burbuja(G + 0.4 + i * 0.22, 0.05, 300 + i * 40);       // las manchas aparecen
// 2 · nido: huevos que caen y la tortuga que se va
for (let i = 0; i < 30; i++) m.tic(N - 0.4 + i * 0.015 * 1.0 + 0.3, 0.05, 1500 + (i % 5) * 120);
m.sube(N + 0.4, 1.2, 57, 69, 0.03); for (let i = 0; i < 4; i++) m.whoosh(N + 0.9 + i * 0.6, 0.35, 0.05);  // aletazos en la arena
// 3 · limpio: 4 huevos que caen a la mano; palomita
for (let i = 0; i < 4; i++) m.gota(Li + 1.2 + i * 0.9, 0.18, 700 + i * 60);
m.nota(Li + 3.25, 72, 0.07, 0.8); m.nota(Li + 3.35, 76, 0.06, 0.8); m.nota(Li + 3.45, 79, 0.05, 1.2);
// 4 · arena al microscopio: crecen las hifas, aparecen conidios, enzimas
m.sube(Ar + 0.2, 3.0, 43, 50, 0.04);
for (let i = 0; i < 3; i++) m.nota(Ar + 1.0 + i * 0.2, 64 + i * 3, 0.04, 0.5);
for (let i = 0; i < 4; i++) m.tic(Ar + 1.6 + i * 0.1, 0.12, 2600);
for (let i = 0; i < 8; i++) m.burbuja(Ar + 2.2 + i * 0.17, 0.06, 420 + (i % 4) * 60);
// 5 · cáscara: red de hifas, ácidos, se deshace, entra
m.zumbido(Ca + 0.2, 1.4, 0.03, 160);
for (let i = 0; i < 10; i++) m.burbuja(Ca + 1.8 + i * 0.12, 0.06, 500 + (i % 5) * 50);
m.cruje(Ca + 2.3, 0.35); m.sube(Ca + 2.8, 1.6, 50, 38, 0.05); m.golpe(Ca + 4.3, 0.3, 55);
// 6 · manchas y embrión
m.whoosh(M + 1.2, 0.6, 0.1); m.latido(M + 1.8, 0.2); m.latido(M + 2.6, 0.13); m.latido(M + 3.4, 0.06);
// 7 · contagio
[0.2, 0.4, 0.6].forEach((d, i) => m.nota(Co + d + 0.8, 52 + i * 3, 0.05, 0.9, 0.5));
// 8 · re-gancho: el motivo en menor y abajo, sin resolver
m.sube(P, 1.4, 45, 57, 0.05); motivo(P + 0.4, 57, 0.06, 0.38);
// 9 · estudio: tarjeta, islas, 29 nidos
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 7; i++) m.tic(E + 0.8 + i * 0.06, 0.08, 1300);
for (let i = 0; i < 29; i++) m.tic(E + 1.6 + i * 0.05, 0.07, i < 13 ? 1800 : i < 21 ? 1200 : 900);
// 10 · datos: suben las barras, entra la marea
m.sube(D + 0.6, 1.8, 50, 62, 0.04); m.whoosh(D + 2.4, 1.4, 0.16); m.whoosh(D + 3.0, 1.0, 0.1);
m.tic(D + 3.2, 0.15, 1400); m.tic(D + 3.6, 0.15, 1400); m.tic(D + 4.6, 0.15, 1100);
// 11 · el mundo: 7 playas y 6 especies; la golfina hasta Oaxaca
[0, 2, 4, 7, 9, 11, 12].forEach((d, i) => m.nota(Mu + 0.5 + i * 0.2, 60 + d, 0.045, 0.6));
[0, 3, 5, 7, 10, 12].forEach((d, i) => m.nota(Mu + 2.0 + i * 0.3, 64 + d, 0.04, 0.7));
m.whoosh(Mu + 5.0, 1.0, 0.07); m.nota(Mu + 6.0, 74, 0.06, 1.2);
// 12 · temperatura: el termómetro sube; nido
m.sube(Cl + 0.3, 1.5, 45, 64, 0.05); m.tic(Cl + 1.8, 0.2, 1000); m.nota(Cl + 2.6, 69, 0.05, 1.0); m.golpe(Cl + 3.0, 0.2, 90);
// 13 · cierre: la marea, las hifas; el motivo resuelve hacia arriba
m.whoosh(C + 1.6, 2.0, 0.1); motivo(C + 0.6, 69, 0.05, 0.3);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.9, 72, 0.04, 2.4);
m.guardar(OUT, 1);
