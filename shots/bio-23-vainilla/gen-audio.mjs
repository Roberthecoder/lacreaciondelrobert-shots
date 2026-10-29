// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #23 (vainilla y vainillina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// El dato hecho sonido: el «< 1 %» del gancho es UNA nota aguda sola contra un acorde grave (la vaina contra todo lo demás).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vainilla base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K;
const G = K.Gancho, O = K.Origen, M = K.Molecula, E = K.Escasa, S = K.Sintetica, P = K.Precio, Q = K.Pregunta, Mi = K.Microbios, En = K.Enzimas,
  N = K.Natural, A = K.Albius, F = K.Flor, To = K.Toneladas, Ci = K.Cierre, Ou = K.Outro;
const MI2 = Mi + 1.5;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                              // cama grave continua, sin golpe
m.nota(G + 0.05, 45, 0.06, 1.6); m.nota(G + 0.05, 52, 0.05, 1.6); m.nota(G + 0.3, 88, 0.05, 1.2); // «< 1 %»: una nota sola arriba
for (let i = 0; i < 2; i++) m.gota(G + 1.2 + i * 0.9, 0.16, 1000);                    // gotas del helado
m.golpe(G + 2.4, 0.25, 90);                                                          // se tacha el mito
for (let i = 0; i < 7; i++) m.nota(O + 0.2 + i * 0.22, m.ESC[i + 2], 0.03, 0.3); // la enredadera crece
m.nota(O + 1.6, 76, 0.05, 1.0); m.nota(O + 1.75, 81, 0.04, 1.0);                     // abre la flor (campanita)
m.tic(O + 1.0, 0.12, 1800);                                                          // aparece Papantla
m.whoosh(M + 0.1, 0.6, 0.12);                                                        // se abre la Lupa
for (let i = 0; i < 8; i++) m.tic(M + 0.3 + i * 0.09, 0.05, 3200 + i * 120);        // escarcha de cristales
m.nota(M + 0.8, 69, 0.05, 0.8);                                                      // la molécula
m.golpe(E + 0.4, 0.3, 80); m.tic(E + 0.6, 0.1, 2000);                                // «1–2 %» y la rayita blanca
m.motor(S + 0.3, 1.5, 0.05);                                                         // barril y tronco entran
m.whoosh(S + 1.0, 1.4, 0.07);                                                        // chimenea
m.burbuja(S + 1.9, 0.08, 400);                                                       // sale el polvo
m.tic(P + 0.2, 0.12, 2600); m.golpe(P + 0.6, 0.28, 100);                             // etiqueta chica, etiqueta gigante
m.sube(P + 1.4, 1.0, 64, 52, 0.04);                                                  // el medidor baja a 1/100
m.sube(Q + 0.1, 1.6, 52, 64, 0.05);                                                  // pregunta
for (let i = 0; i < 4; i++) m.burbuja(Mi + 0.2 + i * 0.25, 0.08, 600 + i * 60);       // ácido ferúlico al tanque
m.whoosh(MI2 - 0.2, 0.6, 0.1);                                                       // entramos al microscopio
for (let i = 0; i < 6; i++) m.burbuja(MI2 + 0.6 + i * 0.25, 0.06, 500);               // la bacteria traga moléculas
m.tic(En + 0.75, 0.15, 1500); m.metal(En + 0.8, 0.08, 900);                          // enzima 1 pone la etiqueta
m.tic(En + 1.45, 0.18, 1300); m.tic(En + 1.52, 0.18, 1100);                          // enzima 2 corta
m.nota(En + 1.6, 72, 0.06, 1.0); m.nota(En + 1.7, 79, 0.05, 1.0);                    // brilla la vainillina
m.golpe(N + 0.6, 0.35, 85);                                                          // sello NATURAL
m.golpe(A + 0.2, 0.3, 80);                                                           // tarjeta 1841
m.tic(A + 5.2, 0.12, 2200); m.nota(A + 5.25, 81, 0.04, 0.8);                         // la varita toca la flor
for (let i = 0; i < 4; i++) m.tic(F + i * 0.45, 0.06, 1200);                         // el reloj del día
for (let i = 0; i < 30; i++) if (i % 3 === 0) m.tic(To + 0.3 + i * 0.05, 0.05, 2600); // caen montoncitos
m.sube(To + 1.6, 1.0, 50, 57, 0.04);                                                 // la barra
for (let i = 0; i < 3; i++) m.tic(Ci + 0.5 + i * 0.6, 0.12, 2000 + i * 300);         // banderitas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
