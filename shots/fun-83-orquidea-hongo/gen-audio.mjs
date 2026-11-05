// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #83 (Orquídea y hongo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Armonía por secciones (re menor → la): misterio (bosque) · íntima y oscura (microscopio) · suspensión (pregunta) ·
// se abre (protocormo) · cálida (estudio) · luminosa (cierre). Arpegio lento que cambia de dibujo cada sección.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Orquidea Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 83);
const K = m.K;
const G = K.Gancho, Bo = K.Bosque, Ca = K.Capsula, Se = K.Semilla, Hi = K.Hifa, Pe = K.Peloton, Pr = K.Pregunta, Di = K.Digiere,
  Pc = K.Protocormo, Es = K.Estudio, Re = K.Resultado, Va = K.Vainilla, C = K.Cierre, Ou = K.Outro;

// --- cama: una progresión por sección (notas MIDI graves) ---
const SECC = [
  [0, Ca, [38, 45, 53], 0.1],            // Dm — misterio del bosque
  [Ca, Se, [34, 41, 50], 0.05],          // Bb — el viento
  [Se, Pe, [36, 43, 51], 0.35],          // Cm — al microscopio, íntimo y tapado
  [Pe, Pr, [33, 40, 48], 0.3],           // Am(b6) — pelotones
  [Pr, Di, [38, 44, 53], 0.2],           // Dm(b5) — suspensión: ¿quién se come a quién?
  [Di, Pc, [34, 41, 50], 0.2],           // Bb — digiere
  [Pc, Es, [36, 43, 52], 0],             // C — se abre: el protocormo
  [Es, Re, [41, 48, 57], 0],             // F — cálida: el estudio
  [Re, Va, [34, 41, 50], 0],             // Bb
  [Va, C, [36, 43, 52], 0],              // C
  [C, Ou + 3.6, [38, 45, 54], 0],        // D mayor — luminosa, regresa al inicio transformada
];
SECC.forEach(([a, b, n, tapa]) => m.pad(a, b + 0.25, 0.05, n, tapa));
// arpegio lento y suave (cada sección con su propio dibujo; nunca el mismo patrón más de una sección)
const DIB = [[0, 2, 1, 2], [0, 1, 2, 1], [2, 1, 0, 1], [0, 2, 2, 1], [1, 2, 0, 2], [0, 1, 0, 2]];
SECC.forEach(([a, b, n], s) => { const dib = DIB[s % DIB.length], paso = s >= 6 ? 0.55 : 0.75;
  for (let t = a + 0.2, k = 0; t < b - 0.3; t += paso, k++) m.nota(t, n[dib[k % 4]] + 24, 0.022, 1.4, s >= 2 && s <= 5 ? 0.4 : 0); });

// --- efectos en el mismo cuadro que cada evento ---
m.tic(G + 0.05, 0.25, 900); m.cruje(G + 0.15, 0.35);                         // el dedo toca y la cápsula cruje al abrirse
m.whoosh(G + 0.35, 1.4, 0.07);                                               // sale la nube de semillas
m.golpe(G + 1.1, 0.25, 70);                                                  // se tacha «polvo»
m.nota(G + 1.5, 74, 0.05, 0.8); m.nota(G + 1.6, 81, 0.04, 0.8);              // «semillas de orquídea»
m.whoosh(Bo, 1.2, 0.05);                                                     // la cámara abre al bosque
for (let i = 0; i < 12; i++) m.tic(Bo + 0.4 + i * 0.08, 0.05, 1400 + i * 60); // cuenta +1,200
m.whoosh(Ca - 0.2, 2.5, 0.08);                                               // viento con las semillas
for (let i = 0; i < 18; i++) m.tic(Ca + 0.2 + i * 0.085, 0.04, 2000 + i * 40); // contador de semillas
m.sube(Se - 0.3, 0.9, 50, 62, 0.04);                                         // entramos al microscopio
m.nota(Se + 0.9, 69, 0.04, 0.6); m.nota(Se + 1.4, 72, 0.04, 0.6);            // etiquetas testa / embrión
m.golpe(Se + 2.6, 0.2, 90); m.tic(Se + 3.1, 0.2, 1200);                      // lonchera y su tache
m.sube(Hi + 0.2, 2.6, 55, 67, 0.035);                                        // la hifa avanza («zip» suave)
m.tic(Hi + 2.8, 0.12, 2600);                                                 // llega al embrión
for (let i = 0; i < 9; i++) m.sube(Pe + 0.3 + i * 0.3, 0.35, 64 + (i % 3) * 3, 60 + (i % 3) * 3, 0.03); // cada pelotón se enrolla
m.sube(Pr + 0.1, 1.5, 52, 64, 0.05);                                         // re-gancho
for (let i = 0; i < 10; i++) m.burbuja(Di + 1.0 + i * 0.22, 0.07, 380 + i * 25); // digiere
m.tic(Pc + 1.0, 0.25, 700); m.burbuja(Pc + 1.05, 0.12, 300);                 // «pop» de la testa que se rompe
m.sube(Pc + 2.2, 1.2, 60, 72, 0.04);                                         // brota la hoja
m.golpe(Es + 0.2, 0.3, 80);                                                  // tarjeta del estudio
[0.6, 0.8, 1.0].forEach((d, i) => m.metal(Es + d, 0.08, 1500 + i * 120));      // tintineo de frascos
m.whoosh(Es + 4.6, 1.0, 0.06);                                               // del laboratorio al Pedregal
for (let i = 0; i < 6; i++) m.tic(Es + 5.8 + i * 0.15, 0.08, 900);           // se plantan
for (let i = 0; i < 6; i++) m.tic(Re + 0.2 + i * 0.1, 0.04, 2400);           // pasan los años
[1, 3, 5].forEach((i) => m.sube(Re + 0.8 + i * 0.1, 0.9, 60, 52, 0.02));      // las que no sobreviven
m.nota(Re + 2.0, 76, 0.05, 1.0); m.nota(Re + 2.4, 81, 0.05, 1.2);            // campanita de cada flor
m.sube(Va, 1.5, 48, 60, 0.03); m.nota(Va + 1.2, 79, 0.05, 1.0);              // trepa la vainilla y abre su flor
m.tic(Va + 1.8, 0.1, 1100);                                                  // mapa
m.nota(C + 0.3, 74, 0.04, 1.0); m.nota(C + 0.6, 78, 0.04, 1.0); m.nota(C + 0.9, 81, 0.04, 1.4); // la orquídea florece
m.whoosh(C + 1.0, 2.0, 0.04);                                                // el polvo encuentra su hongo
m.nota(Ou + 0.3, 50, 0.08, 2.8); m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 62, 0.05, 2.8); m.nota(Ou + 0.3, 66, 0.04, 2.8);
m.guardar(OUT, 1);
