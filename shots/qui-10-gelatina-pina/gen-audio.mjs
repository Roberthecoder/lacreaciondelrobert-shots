// gen-audio.mjs — cama grave + efectos del Shot Químico #10 (gelatina y piña fresca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gelatina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
const G = K.Gancho, Q = K.Que, Rd = K.Red, Br = K.Bromelina, Co = K.Corta, Pr = K.Pregunta, Es = K.Estudio, La = K.Lata, Ki = K.Kiwi, Ci = K.Cierre, Ou = K.Outro;
const tubos = Es + 2.6, dEs = Math.max(1, La - 0.3 - (tubos + 0.3));

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.6, 0.06);                                                         // la cuchara entra
for (let i = 0; i < 5; i++) m.gota(G + 0.6 + i * 0.12, 0.12, 500 + i * 60);           // chapoteo de la gelatina líquida
m.golpe(G + 1.8, 0.25, 90);                                                            // se tacha "¿echada a perder?"
m.golpe(Q + 0.2, 0.15, 160); m.golpe(Q + 0.7, 0.15, 140); m.whoosh(Q + 1.1, 0.7, 0.05); m.golpe(Q + 1.7, 0.2, 110); // piel, hueso, flecha, sobre
m.sube(Q + 2.6, 0.8, 60, 72, 0.04);                                                    // se abre la lupa
for (let i = 0; i < 8; i++) m.nota(Rd + 1.2 + i * 0.38, [60, 64, 67, 72][i % 4], 0.04, 0.5); // las cadenas se enroscan
for (let i = 0; i < 6; i++) m.gota(Rd + 4.0 + i * 0.13, 0.1, 1100);                   // agua atrapada
for (let i = 0; i < 6; i++) m.whoosh(Br + 1.4 + i * 0.25, 0.25, 0.03);                // salen las tijeras
for (let i = 0; i < 49; i++) m.tic(Co + 0.5 + i * ((Pr - Co - 1.6) / 49), 0.05, 1800); // clic de cada corte
m.pad(Co + 0.5, Pr, 0.02, [44, 51], 0.7);                                               // tensión: la red se rompe
for (let i = 0; i < 5; i++) m.gota(Co + 2.8 + i * 0.4, 0.12, 700);                     // se escapa el agua
m.golpe(Pr + 0.3, 0.3, 120); m.sube(Pr + 0.4, 1.6, 52, 64, 0.05);                       // boing del molde firme
m.golpe(Es + 0.2, 0.35, 80);                                                            // tarjeta del estudio
for (let i = 0; i < 20; i++) m.tic(tubos + 0.3 + i * dEs / 20, 0.04, 1200);           // cronómetros
for (let i = 0; i < 16; i++) m.burbuja(tubos + 0.3 + i * dEs / 16, 0.07, 650);         // baño a 80 °C
m.nota(tubos + 0.3 + dEs * 0.9, 48, 0.07, 1.0);                                         // la enzima se apaga
for (let i = 0; i < 14; i++) m.burbuja(La + 0.3 + i * 0.18, 0.07, 600);                // olla hirviendo
m.sube(La + 1.6, 0.8, 60, 72, 0.04); m.nota(La + 2.6, 50, 0.06, 0.8);                  // lupa: tijeras apagadas
m.golpe(Ki + 0.2, 0.35, 80);
for (let i = 0; i < 5; i++) m.nota(Ki + 2.6 + i * 0.15, 67 - i * 2, 0.04, 0.4);        // las gelatinas se derriten
m.nota(Ki + 4.0, 72, 0.06, 0.6); m.nota(Ki + 4.3, 76, 0.06, 0.6);                      // los dos kiwis que sí cuajan
for (let i = 0; i < 4; i++) m.gota(Ci + 0.3 + i * 0.2, 0.1, 550);
m.golpe(Ci + 3.4, 0.25, 120); m.nota(Ci + 3.6, 69, 0.06, 0.8);                          // cuaja la de lata
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
