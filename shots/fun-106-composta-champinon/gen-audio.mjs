// gen-audio.mjs — cama + motivo + efectos del Shot Fungi Mati #106 (composta y champiñón). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave terrosa con progresión que cambia por sección (Am – F – C – G…), y un motivo
// de 4 notas (la–do–mi–re) que evoluciona: triste en la maceta, sube con la composta caliente, se ahoga "por dentro",
// se libera cuando las bacterias abren el candado, vuelve en mayor con la cosecha y entero en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Champinon base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 106);
const K = m.K;
const G = K.Gancho, M = K.Maceta, R = K.Receta, F1 = K.FaseI, F2 = K.FaseII, S = K.Siembra, P = K.Pregunta, Cb = K.Cobertura,
  O = K.Octenol, B = K.Bacterias, E = K.Estudio, Mx = K.Mexico, Co = K.Cosecha, C = K.Cierre, Ou = K.Outro;
const PRIM = B + 2.7;
// frase del motivo: notas MIDI con su separación; g baja para quedar debajo de la voz.
const frase = (t0, notas, paso = 0.38, g = 0.035, d = 0.7, tapa = 0) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n, g, d, tapa));

// --- cama (acordes por sección, la voz manda) ---
m.pad(0, M, 0.05, [45, 52, 57]);                 // Am
m.pad(M, R, 0.045, [41, 48, 57], 0.2);           // F (la maceta: un poco apagada)
m.pad(R, F1, 0.05, [43, 50, 55]);                // G
m.pad(F1, F2, 0.055, [45, 52, 60], 0);           // Am(add) — se calienta
m.pad(F2, S, 0.05, [41, 48, 53]);                // F
m.pad(S, P, 0.05, [48, 52, 55]);                 // C
m.pad(P, Cb, 0.05, [40, 47, 56], 0.1);           // E (suspenso del re-gancho)
m.pad(Cb, O, 0.05, [45, 52, 57]);                // Am
m.pad(O, B + 1.9, 0.05, [41, 48, 56], 0.55);     // F con sexta tensa, tapada (por dentro)
m.pad(B + 1.9, E, 0.05, [48, 55, 60], 0);        // C — se libera
m.pad(E, Mx, 0.05, [43, 50, 59]);                // G
m.pad(Mx, Co, 0.05, [41, 48, 57]);               // F
m.pad(Co, C, 0.05, [48, 52, 55]);                // C
m.pad(C, Ou + 3.5, 0.05, [45, 52, 60]);          // Am → cierre

// --- motivo que evoluciona ---
frase(G + 0.2, [57, 60, 64, 62]);                             // tema
frase(M + 0.4, [57, 60, 59, 55], 0.5, 0.03, 0.9, 0.3);        // triste y ahogado (la maceta falló)
frase(F1 + 0.4, [57, 60, 64, 67, 69], 0.55, 0.03);            // sube con la temperatura
frase(F1 + 3.2, [72, 71, 69], 0.4, 0.03);                     // 70 °C: cambia de carácter
frase(S + 0.8, [60, 64, 67, 64], 0.45, 0.03);                 // el micelio crece (en do)
frase(P + 0.1, [64, 68, 71], 0.3, 0.035, 1.0);                // pregunta (mi mayor, sin resolver)
frase(Cb + 0.5, [57, 60, 64, 62], 0.42, 0.03);                // el tema regresa
frase(O + 0.5, [53, 56, 53], 0.7, 0.03, 1.2, 0.7);           // por dentro: grave y tapado
frase(B + 2.0, [60, 64, 67, 72], 0.22, 0.04, 0.9);            // ¡se abre el candado!
frase(E + 0.6, [62, 67, 71, 69], 0.5, 0.028);                 // el estudio (sol)
frase(Mx + 0.5, [60, 65, 69, 67], 0.5, 0.028);                // México (fa)
frase(Co + 0.3, [59, 62, 66, 64], 0.36, 0.03);                // cosecha: tema un tono arriba (si–re–fa#–mi)
frase(Co + 2.4, [61, 64, 68, 66], 0.36, 0.03);                // segunda oleada, otro tono arriba
frase(C + 0.3, [57, 60, 64, 62, 60, 64, 69], 0.4, 0.035, 0.9); // cierre: el tema completo y resuelto

// --- efectos, en el mismo cuadro que la imagen ---
m.whoosh(G + 0.05, 0.5, 0.12);                                                     // la pala se inclina
for (let i = 0; i < 7; i++) m.golpe(G + 0.15 + i * 0.06 + 0.65, 0.12, 70 + i * 6);   // caen los grumos
m.golpe(G + 0.95, 0.4, 60); m.cruje(G + 0.95, 0.2);                                // sello ¡NO!
m.sube(G + 2.0, 1.4, 48, 60, 0.04);                                                // sale el champiñón
m.whoosh(M + 1.2, 0.9, 0.14);                                                      // se levanta la bolsa negra
m.nota(M + 2.35, 52, 0.05, 1.0, 0.4);                                              // … y nada
[0.25, 0.75, 1.75, 2.35].forEach((t, i) => { m.golpe(R + t, 0.25, 90 + i * 10); m.tic(R + t + 0.1, 0.12, 1200 + i * 200); }); // ingredientes
[1.45, 1.95, 2.95, 3.55].forEach((t) => m.golpe(R + t, 0.12, 55));                  // caen a la pila
for (let d = 0; d < 6; d++) m.tic(F1 + 0.3 + d * 0.5, 0.14, 1500 + d * 120);        // días 1→6
for (let i = 0; i < 8; i++) m.burbuja(F1 + 0.5 + i * 0.35, 0.05, 300 + i * 30);     // vapor
m.sube(F1 + 0.4, 2.8, 40, 52, 0.035);                                              // sube el termómetro
m.metal(F1 + 3.0, 0.12, 900);                                                      // > 70 °C
for (let i = 0; i < 4; i++) m.burbuja(F1 + 3.1 + i * 0.25, 0.08, 600 + i * 90);     // moléculas que se enlazan
m.golpe(F2 + 1.0, 0.2, 100);                                                       // 60 °C
for (let i = 0; i < 8; i++) m.tic(F2 + 1.4 + i * 0.25, 0.1, i % 2 ? 1800 : 2300);   // tic-tac del reloj
for (let i = 0; i < 14; i++) m.tic(S + 0.15 + i * 0.05 + 0.6, 0.09, 1000 + (i % 4) * 150); // caen los granos
m.zumbido(S + 1.0, 2.6, 0.02, 160);                                                // el micelio avanza
m.sube(P + 0.05, 1.6, 52, 64, 0.05);                                               // re-gancho
m.whoosh(Cb + 0.3, 0.9, 0.12); m.golpe(Cb + 1.2, 0.25, 70);                         // cae la cobertura
m.zumbido(O - 0.3, 1.8, 0.02, 120);                                                // las hifas crecen
for (let i = 0; i < 6; i++) m.burbuja(O + 0.6 + i * 0.15, 0.07, 420 + i * 40);      // nubecitas de octenol
m.metal(O + 1.6, 0.1, 500);                                                        // candado cerrado
for (let i = 0; i < 6; i++) { m.tic(B + 0.5 + i * 0.25, 0.12, 2600); m.tic(B + 0.58 + i * 0.25, 0.08, 2200); } // mordisquitos
m.metal(B + 1.9, 0.14, 1100);                                                      // se abre el candado
for (let i = 0; i < 10; i++) m.gota(PRIM + 0.1 + i * 0.12, 0.08, 1100 + i * 60);    // brotan los primordios
m.golpe(E + 0.2, 0.3, 80);                                                         // tarjeta del estudio
m.burbuja(E + 2.4, 0.07, 420); m.burbuja(E + 2.55, 0.07, 470);                     // gases
m.motor(E + 3.4, 2.2, 0.05);                                                       // ventilador
for (let i = 0; i < 6; i++) m.gota(E + 4.5 + i * 0.15, 0.08, 1200 + i * 80);        // primordios con ventilación
m.sube(Mx + 0.3, 0.9, 52, 60, 0.035);                                              // champiñón en el mapa
for (let i = 0; i < 10; i++) m.tic(Mx + 1.8 + i * 0.12, 0.08, 1400 + i * 60);       // cuenta 94 %
m.whoosh(Mx + 2.4, 1.0, 0.08);                                                     // se llena el pastel
for (let i = 0; i < 7; i++) m.gota(Co + 0.2 + i * 0.12, 0.1, 800 + i * 50);         // 1.ª oleada
m.whoosh(Co + 1.9, 0.4, 0.14); m.tic(Co + 2.05, 0.2, 3000);                         // cuchillo de cosecha
for (let i = 0; i < 7; i++) m.gota(Co + 2.4 + i * 0.12, 0.1, 900 + i * 50);         // 2.ª oleada
for (let i = 0; i < 5; i++) m.gota(C + 0.2 + i * 0.15, 0.09, 950 + i * 70);         // champiñones en la maceta
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 72, 0.05, 2.8);
m.guardar(OUT, 1);
