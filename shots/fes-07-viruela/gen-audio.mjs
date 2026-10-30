// gen-audio.mjs — cama grave + efectos del Shot Festivo #07 · Ciencia para la Paz · Biotecnológico (la viruela). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Viruela base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K, E = m.ESC;
const G = K.Gancho, V = K.Viruela, Va = K.Vaccinia, Gr = K.Granito, Me = K.Memoria, Co = K.Costra, P = K.Pregunta, Pr = K.Propuesta, Ri = K.Rivales, Ag = K.Aguja, An = K.Anillo, Ul = K.Ultimo, Li = K.Libre, Ci = K.Cierre, Ou = K.Outro;

// cama: tensa (menor, un poco tapada) mientras la viruela está en el mundo; se abre cuando llega a cero
m.pad(0, Li + 2.4, 0.05, [45, 52, 57], 0.35);
m.pad(Li + 2.0, Ou + 3.0, 0.05, [45, 52, 61], 0);
m.whoosh(G + 0.05, 0.55, 0.14);                                              // la manga se arremanga
m.nota(G + 0.7, 69, 0.05, 0.6); m.nota(G + 0.9, 76, 0.04, 0.6);               // aparece la marquita
m.sube(G + 0.9, 0.5, 64, 76, 0.03);                                           // la lupa
m.tic(G + 1.5, 0.3, 1400); m.whoosh(G + 1.5, 0.3, 0.08);                      // se tacha «¿lunar?»
for (let i = 0; i < 3; i++) m.golpe(V + 0.6 + i * 0.5, 0.32, 70);             // 3 de cada 10 se apagan
for (let i = 0; i < 10; i++) m.tic(V + 0.1 + i * 0.04, 0.05, 1800);           // aparecen las 10 personitas
for (let i = 0; i < 10; i++) m.burbuja(Va + 0.2 + i * 0.28, 0.05, 260 + (i % 4) * 40); // el mundo micro
m.zumbido(Va + 0.1, 0.9, 0.035, 120);                                         // variola (peligro)
m.nota(Va + 0.9, 72, 0.05, 0.7); m.nota(Va + 1.0, 79, 0.035, 0.7);            // vaccinia (leve)
m.sube(Va + 2.2, 0.8, 57, 69, 0.04);                                          // «parientes»
for (let i = 0; i < 8; i++) m.tic(Gr + 0.15 + i * 0.1, 0.07, 3000);           // el virus entra a la piel
m.burbuja(Gr + 1.2, 0.18, 380); m.burbuja(Gr + 1.5, 0.12, 460);               // se forma el granito
for (let i = 0; i < 3; i++) m.burbuja(Gr + 1.6 + i * 0.25, 0.08, 200);        // llegan los linfocitos
m.nota(Gr + 2.6, 81, 0.06, 0.5); m.nota(Gr + 2.62, 88, 0.04, 0.5);            // «foto»: aprenden su forma
for (let i = 0; i < 7; i++) m.tic(Me + 0.2 + i * 0.13, 0.05, 900);            // entra la viruela
m.sube(Me + 1.0, 0.4, 57, 72, 0.05);                                          // se despiertan
for (let i = 0; i < 14; i++) m.tic(Me + 1.5 + i * 0.07, 0.06, 2600 + (i % 4) * 300); // ráfaga de anticuerpos
for (let i = 0; i < 12; i++) m.tic(Co + 0.1 + i * 0.24, 0.035, 1500);         // reloj de los días
m.burbuja(Co + 0.8, 0.1, 420);                                                // ampolla
m.whoosh(Co + 2.3, 0.6, 0.1); m.golpe(Co + 2.9, 0.12, 120);                   // la costra se cae
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                           // ¿y cómo…?
m.whoosh(P + 0.8, 0.6, 0.1); m.whoosh(P + 1.1, 0.6, 0.1);                     // banderas
m.golpe(Pr + 0.4, 0.3, 80); m.metal(Pr + 0.45, 0.08, 1500);                   // tarjeta 1958 (mazo de la Asamblea)
for (let i = 0; i < 15; i++) m.metal(Ri + 0.3 + i * 0.15, 0.025, 1900 + (i % 5) * 120); // frascos que se apilan
m.golpe(Ri + 1.7, 0.18, 110); m.golpe(Ri + 1.9, 0.14, 120);                   // maletines
m.whoosh(Ri + 3.6, 0.9, 0.12); m.golpe(Ri + 4.5, 0.2, 95);                    // apretón de manos
m.nota(Ri + 4.55, 69, 0.06, 1.0); m.nota(Ri + 4.55, 76, 0.045, 1.0);
m.gota(Ag + 0.7, 0.18, 800);                                                  // la aguja entra al frasco
m.nota(Ag + 1.5, 88, 0.05, 0.4);                                              // «tink»: la gotita entre las puntas
for (let i = 0; i < 4; i++) m.nota(Ag + 1.6 + i * 0.3, E[5 + i], 0.035, 0.4);  // ×1 ×2 ×3 ×4
for (let i = 0; i < 15; i++) m.tic(Ag + 2.3 + i * 0.073, 0.08, 3400);         // 15 piquetitos
for (let i = 0; i < 8; i++) m.nota(An + 0.9 + i * 0.21, E[3 + i], 0.035, 0.45); // cada casa del anillo
m.sube(An + 2.8, 0.7, 64, 76, 0.04);                                          // el caso se apaga
m.whoosh(Ul + 0.5, 0.6, 0.08); m.tic(Ul + 1.0, 0.25, 900);                    // Somalia y Merca
m.golpe(Ul + 1.6, 0.26, 80); m.metal(Ul + 1.65, 0.07, 1400);                  // tarjeta 1977
m.nota(Ul + 4.2, 64, 0.05, 0.8);
for (let i = 0; i < 10; i++) m.nota(Li + 0.3 + i * 0.21, E[11 - i], 0.03, 0.4); // los puntos rojos se apagan
m.golpe(Li + 0.4, 0.2, 85);
m.nota(Li + 2.4, 57, 0.07, 2.0); m.nota(Li + 2.4, 64, 0.05, 2.0); m.nota(Li + 2.4, 69, 0.05, 2.0); m.nota(Li + 2.4, 73, 0.04, 2.0); // cero: acorde abierto
m.sube(Ci + 0.3, 0.7, 64, 76, 0.04); m.whoosh(Ci + 1.0, 0.5, 0.08);            // contorno dorado y la lupa
for (let i = 0; i < 5; i++) m.nota(Ci + 1.4 + i * 0.16, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
