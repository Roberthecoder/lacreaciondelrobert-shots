// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #102 (Esporas Aire). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua y aérea (polvo flotando en la luz). Armonía con función, en la menor: i – VI – III – VII por
// tramos (cambia con cada escena, nunca el mismo acorde más de ~8 s), un motivo de 4 notas "que flota" que responde y se
// transpone; se oscurece/tapa en el microscopio y los pulmones, y se abre (mayor) en el anillo de aire y el planeta.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esporas Aire base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 102);
const K = m.K;
const G = K.Gancho, M = K.Metro, R = K.Respiro, Cl = K.Clado, F = K.Flotan, Pu = K.Pulmon, P = K.Pregunta, E = K.Estudio,
  A = K.Anillo, Co = K.Continente, To = K.Toneladas, I = K.Inmune, C = K.Cierre, Ou = K.Outro;

// cama por tramos: [desde, hasta, acorde (midi), tapa]
const CAMA = [
  [0, M, [45, 52, 57, 60], 0.1],        // la menor — el cuarto
  [M, Cl, [41, 48, 53, 57], 0.1],       // fa (VI)
  [Cl, Pu, [45, 52, 55, 60], 0.45],     // la menor con 7.ª, tapado: microscopio
  [Pu, P, [40, 47, 52, 55], 0.5],       // mi menor, oscuro: pulmones
  [P, E, [43, 50, 55, 59], 0.2],        // sol (VII), suspenso
  [E, A, [48, 55, 60, 64], 0.1],        // do (III)
  [A, To, [41, 48, 53, 57, 60], 0],     // fa, se abre: anillo y planeta
  [To, I, [43, 50, 55, 62], 0.1],       // sol
  [I, C, [45, 52, 57, 64], 0.15],       // la menor
  [C, Ou + 3.5, [45, 52, 57, 61], 0],   // la MAYOR al cierre: regreso transformado
];
CAMA.forEach(([a, b, ac, tapa]) => { m.pad(a, b + 0.3, 0.045, ac, tapa); m.bajo(a + 0.02, ac[0] - 12, 0.07, 1.6); });

// motivo que flota (4 notas) y sus respuestas/secuencias: cada frase distinta (motivo → respuesta → secuencia → cadencia)
const FRASES = [
  [G + 0.6, [69, 72, 76, 74]], [M + 0.8, [65, 69, 72, 69]], [R + 0.6, [72, 74, 76, 79]],
  [Cl + 1.0, [64, 67, 69, 67]], [F + 0.4, [67, 69, 72, 74]], [P + 0.2, [67, 71, 74, 72]],
  [E + 0.8, [72, 76, 79, 77]], [A + 1.2, [77, 79, 81, 84]], [Co + 0.6, [72, 77, 81, 79]],
  [To + 1.0, [74, 71, 67, 69]], [I + 0.8, [69, 72, 76, 72]], [C + 0.8, [69, 73, 76, 81]],
];
FRASES.forEach(([t0, ns], k) => ns.forEach((n, i) => m.nota(t0 + i * 0.42 + (i === 3 ? 0.14 : 0), n, 0.032 - (k % 3) * 0.004, 1.1 + (i === 3 ? 0.6 : 0), (k >= 3 && k <= 4) ? 0.4 : 0)));

// efectos, en el mismo cuadro que lo que pasa en pantalla
m.whoosh(G + 0.1, 0.9, 0.07);                                                     // inhalación del gancho
for (let i = 0; i < 6; i++) m.tic(G + 0.9 + i * 0.08, 0.05, 3200 + i * 200);     // brillitos de la lupa
m.golpe(M + 0.2, 0.25, 90);                                                       // tarjeta Hermosillo
m.tic(M + 0.3, 0.2, 1500);                                                        // punto en el mapa
m.metal(M + 0.6, 0.08, 900);                                                      // cubo de 1 m
for (let i = 0; i < 36; i++) m.tic(M + 1.4 + i * 0.05, 0.04, 2200 + (i % 5) * 180); // esporas en el cubo
for (let i = 0; i < 14; i++) m.tic(M + 2.8 + i * 0.085, 0.06, 1200 + i * 60);    // contador 8,445
m.whoosh(R + 0.6, 1.0, 0.08);                                                     // aire de la botella
[0, 1, 2, 3].forEach((i) => m.pop ? m.pop(R + 1.9 + i * 0.35, 0.1) : m.burbuja(R + 1.9 + i * 0.35, 0.1, 700 + i * 90)); // 4 esporas entran
m.golpe(R + 2.6, 0.25, 110);                                                      // ≈ 4
m.sube(Cl, 0.8, 40, 52, 0.05);                                                    // zoom al microscopio
for (let i = 0; i < 8; i++) m.nota(Cl + 0.6 + i * 0.25, 76 + (i % 4) * 2, 0.02, 0.3); // crecen las cadenitas
m.whoosh(F + 0.5, 1.6, 0.12); m.whoosh(F + 2.0, 1.4, 0.1);                        // ráfagas de viento
m.latido(Pu + 0.4, 0.12); m.whoosh(Pu + 0.3, 0.8, 0.06);                         // respiración / lupa del pulmón
m.sube(P + 0.05, 1.6, 52, 64, 0.04); m.ruido ? m.ruido(P, 2.4, 0.03) : m.whoosh(P, 2.4, 0.05); // lluvia del re-gancho
m.golpe(E + 0.2, 0.3, 80);                                                        // tarjeta 2019
for (let i = 0; i < 5; i++) m.tic(E + 1.2 + i * 0.2, 0.12, 2600);                // cuadros de la cámara rápida
m.gota(A + 0.4, 0.35, 700); m.golpe(A + 0.42, 0.18, 140);                         // "plic" de la gota sobre la hoja
m.whoosh(A + 0.6, 2.4, 0.1); m.sube(A + 0.6, 2.4, 57, 69, 0.03);                 // el anillo de aire sube
m.whoosh(Co + 0.3, 2.8, 0.08);                                                    // viento sobre el planeta
m.golpe(To + 0.3, 0.45, 55); m.cruje(To + 0.5, 0.3);                              // báscula y polvo
for (let i = 0; i < 10; i++) m.tic(To + 0.3 + i * 0.2, 0.05, 1000 + i * 100);    // contador
m.burbuja(I + 1.8, 0.12, 300); m.burbuja(I + 2.3, 0.1, 260);                      // "glup" del macrófago
m.whoosh(I + 3.4, 0.4, 0.1);                                                      // estornudito (alergia)
m.whoosh(C + 1.2, 0.9, 0.07);                                                     // inhalación del cierre
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 61, 0.05, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.5, 69, 0.04, 2.6);
m.guardar(OUT, 1);
