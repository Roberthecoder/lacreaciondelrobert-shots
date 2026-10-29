// gen-audio.mjs — cama grave + efectos del Shot Químico #46 (plátano y etileno). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Platano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 46);
const K = m.K;
const G = K.Gancho, Q = K.Que, H = K.Hormona, Ca = K.Cadena, B = K.Bolsa, P = K.Pregunta, Ti = K.Tipos, N = K.Neljubov, Ga = K.Gane, Cu = K.Cuarto, Ci = K.Cierre, Ou = K.Outro;
const T7 = Ti + (N - Ti) * 0.62;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 8; i++) m.whoosh(G + 0.1 + i * 0.55, 0.4, 0.05);                 // "pfff" de las nubecitas de gas
m.nota(G + 1.6, 67, 0.05, 0.4);                                                       // se tacha "¿quieto?"
for (let i = 0; i < 6; i++) m.tic(Q + 0.1 + i * 0.25, 0.12, 1600 + i * 120);          // se arma la molécula
m.nota(Q + 3.4, 64, 0.05, 0.8);                                                       // escala 0.4 nm
m.metal(H + 1.5, 0.14, 900);                                                          // llave en la cerradura (receptor)
m.golpe(H + 2.0, 0.3, 90);                                                            // ¡MADURA!
for (let i = 0; i < 6; i++) m.burbuja(Ca + 0.3 + i * 0.3, 0.07, 500);                // respira (CO₂)
m.sube(Ca + 1.0, 1.0, 52, 59, 0.04);                                                  // cambia de color
m.golpe(Ca + 2.2, 0.18, 60);                                                          // se ablanda
for (let i = 0; i < 6; i++) m.whoosh(Ca + 2.9 + i * 0.2, 0.3, 0.05);                 // más etileno
m.cruje(B + 0.2, 0.5);                                                                // bolsa de papel
for (let i = 0; i < 6; i++) m.tic(B + 0.9 + i * 0.55, 0.1, 1200);                     // time-lapse día/noche
m.nota(B + 3.4, 72, 0.06, 0.6);                                                       // ✓ maduró
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 5; i++) m.tic(P + 0.4 + i * 0.4, 0.08, 2600);                     // las moléculas rebotan en las uvas
m.tic(Ti + 2.4, 0.3, 3200); m.tic(Ti + 2.5, 0.25, 2800);                              // tijeretazo
m.nota(T7 + 0.3, 60, 0.05, 0.5); m.nota(T7 + 0.8, 64, 0.05, 0.5); m.nota(T7 + 1.3, 67, 0.05, 0.8); // siguen madurando
m.golpe(N + 0.2, 0.35, 80); m.zumbido(N + 0.5, 3.2, 0.03, 160);                      // tarjeta + siseo de la lámpara
m.sube(N + 3.9, 1.2, 55, 67, 0.05);                                                   // se enderezan
m.golpe(Ga + 0.2, 0.35, 80);
for (let i = 0; i < 5; i++) m.burbuja(Ga + 1.0 + i * 0.45, 0.06, 650);               // el gas pasa al frasco
m.nota(Ga + 3.8, 72, 0.07, 0.7);
m.motor(Cu + 0.2, 1.4, 0.05);                                                         // llegan las cajas
m.whoosh(Cu + 2.4, 1.2, 0.08);                                                        // se llena el cuarto de etileno
m.nota(Cu + 3.4, 64, 0.05, 0.6); m.nota(Cu + 4.2, 69, 0.05, 0.8);
m.nota(Ci + 0.9, 76, 0.06, 0.6);                                                      // la coronita
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
