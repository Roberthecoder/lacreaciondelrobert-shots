// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #39 (la prueba del talón). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tamiz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 39);
const K = m.K;
const G = K.Gancho, Ta = K.Talon, Bu = K.Busca, En = K.Enzima, Pr = K.Pregunta, Gu = K.Guthrie, Ag = K.Agar, Ha = K.Halo, Ho = K.Hoy, Di = K.Dieta, Re = K.Refresco, Mx = K.Mexico, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, En, 0.05, [45, 52, 57]);
m.pad(En, Pr, 0.05, [44, 51, 56], 0.5);                                          // el problema: cama tapada
m.pad(Pr, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 5; i++) m.gota(G + 0.05 + i * 0.85 + 0.32, 0.22, 850 + i * 40); // 5 gotas sobre la tarjeta
m.tic(Ta + 1.0, 0.25, 2600);                                                      // el piquetito
m.whoosh(Ta + 1.9, 0.8, 0.12);                                                    // la tarjeta llega
m.gota(Ta + 3.35, 0.22, 900);
m.whoosh(Bu + 1.0, 0.5, 0.1);                                                     // Lupa
for (let i = 0; i < 22; i++) m.nota(En + 0.4 + i * 0.2 + 1.1, 57 + (i % 4) * 2, 0.025, 0.3, 0.6); // cada Phe que se acumula
for (let i = 0; i < 4; i++) m.latido(En + 3.3 + i * 0.6, 0.16);                   // el cerebro en alerta
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
m.metal(Pr + 0.5, 0.18, 760);                                                     // sacabocado
m.golpe(Gu + 0.2, 0.3, 80);                                                       // tarjeta del estudio
for (let i = 0; i < 6; i++) m.tic(Ag + 1.6 + i * 0.4 + 0.35, 0.12, 1500);          // discos sobre el agar
for (let i = 0; i < 16; i++) m.tic(Ha + 0.3 + i * 0.25, 0.05, 2200);              // horas del time-lapse
m.nota(Ha + 2.0, 57, 0.06, 1.6); m.nota(Ha + 2.0, 64, 0.05, 1.6); m.nota(Ha + 2.0, 69, 0.05, 1.6); // aparece el halo
m.whoosh(Ho + 0.3, 1.0, 0.1);                                                     // el disco entra al aparato
for (let i = 0; i < 11; i++) m.nota(Ho + 1.6 + i * 0.236, 64 + (i % 5) * 2, 0.04, 0.25); // un bip por pico
m.motor(Ho + 0.5, 4.2, 0.03);
for (let i = 0; i < 5; i++) m.nota(Di + 2.4 + i * 0.25, 60 + i * 2, 0.04, 0.6);    // el cerebro sano
m.metal(Re + 0.4, 0.2, 980); m.metal(Re + 1.0, 0.12, 1200);                       // la lata gira
for (let i = 0; i < 18; i++) m.burbuja(Mx + 0.5 + i * 0.15, 0.06, 600 + (i % 6) * 80); // hospitales que se encienden
for (let i = 0; i < 5; i++) m.nota(Ci + 0.6 + i * 0.44, 72 + [0, 2, 4, 7, 9][i], 0.05, 0.7); // palomitas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
