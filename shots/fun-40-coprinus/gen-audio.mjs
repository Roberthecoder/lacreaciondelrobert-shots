// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #40 (Coprinus comatus). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Coprinus base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 40);
const K = m.K;
const G = K.Gancho, N = K.Nombre, L = K.Laminillas, O = K.Orilla, D = K.Digiere, Ol = K.Ola, Ti = K.Tinta, P = K.Pregunta, E = K.Estudio, B = K.Bolitas, Tx = K.Toxinas, Co = K.Comer, C = K.Cierre, Ou = K.Outro;
const MIC = E + 3.0;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53], 0.25);                                 // cama grave y húmeda
m.gota(G + 0.75, 0.3, 700);                                                    // cae la primera gota de tinta (cuadro 0.3–0.75)
for (let t = G; t < N; t += 0.8) m.gota(t + 0.55, 0.14, 600);                  // goteo del borde
m.nota(G + 1.9, 57, 0.05, 0.6); m.cruje(G + 1.9, 0.2);                         // "¿podrido?" tachado
m.nota(G + 2.9, 64, 0.06, 0.8);                                                // se digiere solo
m.sube(N, 1.2, 45, 52, 0.04); m.sube(N + 0.3, 1.2, 47, 55, 0.03); m.sube(N + 0.6, 1.2, 50, 57, 0.03); // brotan tres barbudas
m.whoosh(L - 0.3, 0.7, 0.12); m.cruje(L + 0.5, 0.25);                          // corte del sombrero
for (let i = 0; i < 6; i++) m.tic(L + 1.8 + i * 0.12, 0.08, 2200);             // laminillas pegadas
m.whoosh(O - 0.3, 0.7, 0.1);
for (let i = 0; i < 8; i++) m.burbuja(O + 0.4 + i * 0.2, 0.05, 900 - i * 40);   // esporas se ennegrecen
for (let i = 0; i < 10; i++) m.tic(O + 1.6 + i * 0.25, 0.1, 3000);             // "pop" de cada espora que se suelta
for (let i = 0; i < 16; i++) m.burbuja(D + 0.6 + i * 0.22, 0.08, 220 + (i % 4) * 30); // se derrite
m.zumbido(D + 0.2, 3.6, 0.025, 140);                                           // las enzimas trabajan
m.sube(Ol + 0.2, 3.4, 45, 57, 0.04);                                           // la ola sube
for (let i = 0; i < 6; i++) m.gota(Ol + 0.4 + i * 0.6, 0.18, 650);
for (let i = 0; i < 6; i++) m.burbuja(Ti + 0.3 + i * 0.3, 0.05, 400);           // tinta al microscopio
m.whoosh(Ti + 2.3, 0.6, 0.1);
for (let i = 0; i < 14; i++) m.tic(Ti + 2.9 + i * 0.12, 0.06, 5200 + (i % 3) * 300); // rasguño de la pluma
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // ¿qué más come?
m.golpe(E + 0.2, 0.35, 80);                                                    // tarjeta del estudio
m.whoosh(MIC - 0.3, 0.7, 0.12);
for (let i = 0; i < 3; i++) m.metal(MIC + 0.3 + i * 0.2, 0.08, 1300 + i * 200); // aparecen las bolitas con espinas
for (let i = 0; i < 6; i++) m.sube(MIC + 0.6 + i * 0.5, 0.4, 60 + (i % 3), 62 + (i % 3), 0.02); // nematodos serpentean
m.cruje(B + 1.4, 0.4); m.tic(B + 1.5, 0.2, 1800); m.tic(B + 1.8, 0.2, 1600);   // las espinas rasguñan
for (let i = 0; i < 6; i++) m.gota(B + 1.6 + i * 0.3, 0.1, 1100);              // sale líquido
for (let i = 0; i < 12; i++) m.burbuja(Tx + i * 0.12, 0.05, 1200);              // silbido de toxinas
for (let i = 0; i < 9; i++) m.tic(Tx + 0.3 + i * 0.3, 0.06, 2600);             // reloj
m.sube(Tx + 0.3, 2.3, 57, 45, 0.04);                                           // se quedan quietos
m.golpe(Co + 0.8, 0.3, 60); m.golpe(Co + 2.2, 0.2, 70); m.golpe(Co + 2.5, 0.2, 70); m.golpe(Co + 2.8, 0.2, 70); // hifas perforan y salen
m.nota(Co + 1.5, 48, 0.05, 1.5, 0.6);
for (let t = C; t < Ou; t += 0.9) m.gota(t + 0.3, 0.12, 600);                  // el cierre gotea igual que el inicio
m.whoosh(C + 1.1, 0.6, 0.1); m.nota(C + 1.6, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
