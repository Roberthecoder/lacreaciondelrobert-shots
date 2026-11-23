// gen-audio.mjs — cama grave acuática + efectos del Shot Fungi Mati #131 (abanico de mar y Aspergillus sydowii). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Abanico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 131);
const K = m.K;
const G = K.Gancho, A = K.Animal, H = K.Hongo, Hi = K.Hifas, D = K.Defensa, An = K.Anillo, P = K.Pregunta, Po = K.Polvo, Co = K.Contra, F = K.Florida, Y = K.Yucatan, Hu = K.Humanos, C = K.Cierre, Ou = K.Outro;

// Cama grave continua que avanza por acordes (la menor → fa → do → mi): nunca el mismo color más de ~8 s.
// Tensa (un poco tapada) mientras dura el problema; se abre en el cierre.
const CAMA = [
  [0, A, [45, 52, 57], 0.1], [A, Hi, [41, 48, 57], 0.1], [Hi, An, [45, 52, 56], 0.25], [An, P, [40, 47, 55], 0.2],
  [P, Co, [41, 48, 53], 0.15], [Co, F, [43, 50, 55], 0.15], [F, Hu, [45, 52, 57], 0.2], [Hu, C, [40, 47, 56], 0.1],
  [C, Ou + 4.5, [48, 55, 60], 0],
];
CAMA.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.3, 0.05, notas, tapa));
// Un motivo de 4 notas (pregunta) que vuelve en otro registro en el re-gancho y, resuelto, en el cierre.
const motivo = (t, base, g = 0.045, resuelve = false) => [0, 3, 7, resuelve ? 12 : 5].forEach((d, i) => m.nota(t + i * 0.32, base + d, g, 0.9));
motivo(G + 0.2, 57); motivo(P + 0.1, 64); motivo(C + 0.5, 60, 0.05, true);

for (let i = 0; i < 6; i++) m.burbuja(G + 0.1 + i * 0.35, 0.07, 380 + i * 60);       // agua del arrecife (cuadro 0)
m.metal(G + 0.3, 0.12, 900); m.whoosh(G + 0.25, 0.5, 0.08);                            // se abre la lupa
for (let i = 0; i < 6; i++) m.nota(A + 0.3 + i * 0.2, 69 + (i % 3) * 3, 0.035, 0.4);   // se abren los pólipos
m.golpe(A + 2.4, 0.3, 90);                                                              // NO ES PLANTA
m.cruje(H + 0.1, 0.35);                                                                 // tierra
m.sube(H + 0.2, 1.6, 50, 62, 0.04);                                                     // crece el conidióforo
for (let i = 0; i < 12; i++) m.tic(H + 1.0 + i * 0.08, 0.08, 2000 + i * 60);           // cadenas de esporas
for (let i = 0; i < 10; i++) m.tic(Hi + 0.1 + i * 0.22, 0.06, 900 + (i % 3) * 120);   // crecen las hifas
for (let i = 0; i < 16; i++) m.burbuja(D + 0.1 + i * 0.07, 0.06, 600 + i * 25);       // llegan las células de defensa
m.golpe(D + 1.2, 0.3, 60);                                                              // banda de melanina
m.whoosh(An, 0.7, 0.08); m.golpe(An + 0.5, 0.2, 70);                                    // de vuelta afuera: el anillo
m.golpe(Po + 0.3, 0.4, 60); m.whoosh(Po + 0.5, 3.0, 0.12);                              // HIPÓTESIS y el polvo que cruza
m.golpe(Po + 1.4, 0.3, 80);                                                             // tarjeta 2000
m.golpe(Co + 0.1, 0.3, 80);                                                             // tarjeta 2008
[0.6, 0.8, 1.0, 1.2].forEach((d) => m.tic(Co + d, 0.2, 1100));                         // 4 muestras sin hongo
for (let i = 0; i < 12; i++) m.nota(Co + 2.8 + i * 0.08, 62 + (i % 4) * 2, 0.03, 0.3); // aparece el árbol
m.golpe(F + 0.3, 0.3, 70); m.golpe(F + 0.6, 0.3, 80);                                    // Florida y tarjeta
for (let i = 0; i < 10; i++) m.tic(F + 2.2 + i * 0.12, 0.08, 1500 + i * 40);           // contador > 50 %
m.sube(F + 2.3, 1.4, 52, 45, 0.04);                                                     // el abanico se vacía
m.golpe(Y + 0.2, 0.3, 80);
for (let i = 0; i < 8; i++) m.tic(Y + 1.0 + i * 0.08, 0.08, 1700);                      // 8 abanicos
m.nota(Y + 1.9, 56, 0.06, 0.8);                                                         // 1 enfermo
m.nota(Hu + 0.3, 72, 0.05, 0.6); m.nota(Hu + 0.45, 75, 0.05, 0.8);                       // dato raro
for (let i = 0; i < 4; i++) m.nota(C + 1.0 + i * 0.4, 67 + i * 2, 0.04, 0.8);           // llegan abanicos jóvenes
m.nota(Ou + 0.3, 60, 0.07, 3); m.nota(Ou + 0.3, 64, 0.05, 3); m.nota(Ou + 0.3, 67, 0.05, 3);
m.guardar(OUT, 1);
