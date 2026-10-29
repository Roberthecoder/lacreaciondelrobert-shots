// gen-audio.mjs — cama grave + efectos del Shot Ambiental #21 (focos LED). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Focos LED base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 21);
const K = m.K;
const G = K.Gancho, Ca = K.Calor, F = K.Filamento, P = K.Pregunta, Ch = K.Chip, N = K.Nobel, A = K.Ahorro, M = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G + 0.15, F + 4.0 - G, 0.025, 120);                                          // zumbido del foco encendido
m.tic(G + 0.15, 0.35, 2200); m.whoosh(G + 0.4, 1.0, 0.12);                             // clic del apagador y "fsss" de calor
m.sube(Ca + 0.6, 2.0, 45, 52, 0.05); m.nota(Ca + 2.9, 76, 0.06, 0.8);                  // barra roja que crece, luz amarilla
for (let i = 0; i < 10; i++) { const t = Ca + 3.6 + i * 0.22; i < 9 ? m.golpe(t, 0.18, 70) : m.nota(t, 81, 0.08, 0.9); } // 9 de calor + 1 de luz
m.whoosh(F + 0.5, 0.6, 0.12); m.cruje(F + 1.4, 0.25);                                   // lupa y crepitar del filamento
m.golpe(F + 3.6, 0.35, 140); for (let i = 0; i < 6; i++) m.tic(F + 3.6 + i * 0.04, 0.12, 3000); // chispazo: se rompe
m.sube(P + 0.05, 1.2, 52, 64, 0.05); m.tic(P + 0.5, 0.2, 2200);                        // pregunta y clic del LED
for (let i = 0; i < 20; i++) { const t = Ch + 0.4 + i * 0.32 + 0.7; m.nota(t, i % 5 === 3 ? 57 : m.ESC[6 + (i % 6)], i % 5 === 3 ? 0.03 : 0.04, 0.35); } // destellos del chip
m.nota(N + 1.6, 72, 0.06, 1.2); m.nota(N + 2.6, 60, 0.05, 1.8); m.nota(N + 2.6, 64, 0.05, 1.8); m.nota(N + 2.6, 67, 0.05, 1.8); // azul y luz blanca
m.golpe(N + 4.0, 0.3, 90);                                                              // tarjeta Nobel
m.tic(A + 0.2, 0.2, 1800); m.tic(A + 0.5, 0.2, 2400);
for (let i = 0; i < 25; i++) m.tic(A + 3.8 + i * 0.08, 0.08, 1400 + i * 40);            // 25 tramos de vida del LED
m.tic(M + 4.6, 0.3, 1200); m.golpe(M + 4.6, 0.25, 100); m.sube(M + 6.0, 1.0, 52, 57, 0.05); m.tic(M + 6.9, 0.25, 900); // raya en 60, aguja a 16
m.whoosh(C + 2.4, 0.8, 0.12); m.tic(C + 2.6, 0.3, 2200); m.nota(C + 3.0, 69, 0.06, 1.2); // cambio por el LED
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
