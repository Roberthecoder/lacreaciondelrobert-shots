// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #57 (Prototaxites). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Prototaxites base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 57);
const K = m.K;
const G = K.Gancho, D = K.Devonico, Pl = K.Plantas, Tu = K.Tubos, H = K.Hongo, Ca = K.Carbono, P = K.Pregunta, E = K.Estudio, Q = K.Quitina, S = K.Sinhuella, L = K.Linaje, De = K.Debate, C = K.Cierre, Ou = K.Outro;
const Qm = Q + 2.6, Qe = Q + 5.0;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.25);                                 // cama grave y misteriosa
m.sube(G + 0.1, 1.5, 33, 45, 0.09); m.whoosh(G + 0.1, 1.4, 0.12);             // el tronco crece hasta 8 m
m.cruje(G + 1.6, 0.3);                                                       // ¿árbol? tachado
m.nota(G + 2.2, 64, 0.06, 0.8);                                              // ¿hongo?
for (let i = 0; i < 8; i++) m.tic(D + 1.2 + i * 0.14, 0.08, 1200 + i * 120); // el contador de millones de años
m.golpe(D + 2.4, 0.3, 70);
m.whoosh(Pl - 0.3, 0.7, 0.1);                                                // cámara baja a la base
for (let i = 0; i < 6; i++) m.nota(Pl + 0.6 + i * 0.12, [57, 60, 62, 64, 67, 69][i], 0.035, 0.4); // brotan las plantitas
m.tic(Pl + 1.4, 0.12, 900);                                                  // línea de 40 cm
m.whoosh(Tu - 0.3, 1.0, 0.14); m.sube(Tu, 1.6, 40, 52, 0.05);                // zoom al interior
for (let i = 0; i < 6; i++) m.tic(Tu + 0.3 + i * 0.3, 0.06, 500 + i * 40);   // los tubos se enredan
m.golpe(H + 0.2, 0.35, 80);                                                  // tarjeta 2001
m.sube(H + 2.6, 1.8, 52, 59, 0.04);                                          // crecen las hifas
m.golpe(Ca + 0.1, 0.35, 80);                                                 // tarjeta 2007
m.nota(Ca + 2.3, 72, 0.06, 0.6); m.golpe(Ca + 2.9, 0.4, 60);                 // ✓ planta, ✗ Prototaxites
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                          // ¿?
m.golpe(E + 0.2, 0.35, 80); m.metal(E + 3.0, 0.12, 900);                     // tarjeta 2026 · brilla el fósil en la piedra
for (let i = 0; i < 6; i++) m.tic(E + 3.2 + i * 0.12, 0.07, 1500);
m.golpe(Q, 0.2, 110);                                                        // el champiñón cae en la tabla
m.whoosh(Qm - 0.3, 0.9, 0.12);                                               // al microscopio
for (let i = 0; i < 8; i++) m.nota(Qm + 0.3 + i * 0.19, 69 + (i % 3) * 3, 0.03, 0.3); // anillos de la quitina
for (let i = 0; i < 4; i++) m.tic(Qe + 0.2 + i * 0.35, 0.1, 2200);           // "bip" del espectro con picos
m.nota(S + 0.4, 57, 0.05, 1.0, 0.6); m.golpe(S + 1.2, 0.4, 60);              // otros picos, sin las bandas: ✗
m.whoosh(S + 2.3, 0.6, 0.1); m.golpe(S + 3.0, 0.3, 75);                      // ≠
m.sube(L + 0.1, 1.1, 45, 57, 0.05); m.cruje(L + 2.0, 0.4);                   // el árbol de la vida; la rama se corta
for (let i = 0; i < 6; i++) m.metal(De + 0.3 + i * 0.92, 0.05, 700);         // la balanza oscila
m.nota(De + 3.4, 64, 0.05, 1.0);
m.nota(C + 0.6, 57, 0.06, 1.4); m.nota(C + 0.6, 64, 0.04, 1.4);              // regreso al tronco con "?"
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
