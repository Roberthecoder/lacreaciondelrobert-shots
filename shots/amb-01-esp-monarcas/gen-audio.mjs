// gen-audio.mjs — cama grave + efectos del Shot Ambiental #01 · Especial Día de Muertos (monarcas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Monarcas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K, E = m.ESC;
const G = K.Gancho, Vi = K.Viaje, A = K.Almas, Bi = K.Bisnieta, S = K.Sol, P = K.Pregunta, Bo = K.Bosque, Es = K.Estudio, An = K.Antes, Am = K.Amenazas, D = K.Dato, C = K.Cierre, Ou = K.Outro;
const aleteo = (t, n, g = 0.04) => { for (let i = 0; i < n; i++) m.tic(t + i * 0.09 + m.rnd() * 0.03, g, 900 + m.rnd() * 700); };

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 1.0, 0.18); aleteo(G + 0.2, 10, 0.03);                            // la nube de "hojas" llega
m.sube(G + 2.2, 1.0, 57, 69, 0.06); m.nota(G + 3.1, 69, 0.08, 1.0); aleteo(G + 2.4, 18); // se revelan las mariposas
for (let i = 0; i < 5; i++) m.whoosh(Vi + 0.6 + i * 0.7, 0.5, 0.06);           // vuelan por el mapa
m.golpe(Vi + 3.6, 0.3, 90); m.nota(Vi + 3.6, 64, 0.06, 0.6); m.golpe(Vi + 4.0, 0.3, 90); m.nota(Vi + 4.0, 69, 0.06, 0.6); // Michoacán y Edomex
m.pad(A, Bi, 0.03, [52, 59]); for (let i = 0; i < 6; i++) m.nota(A + 0.3 + i * 0.35, E[5 + (i % 3)], 0.035, 0.9); // las almas (velas)
for (let i = 0; i < 4; i++) m.nota(Bi + 0.3 + i * 0.7, E[2 + i * 2], 0.06, 0.5);   // cuatro generaciones
m.whoosh(Bi + 3.4, 1.0, 0.12);                                                 // la tataranieta despega
m.sube(S + 0.2, 1.2, 57, 64, 0.04); for (let i = 0; i < 16; i++) m.tic(S + 1.6 + i * 0.16, 0.05, 3000); // reloj en las antenas
m.sube(P + 0.05, 1.2, 52, 64, 0.05);
aleteo(Bo + 0.2, 26, 0.025); m.metal(Bo + 1.2, 0.1, 700);                     // el bosque cubierto y el marco
m.sube(Es + 0.3, 1.2, 52, 69, 0.05); m.nota(Es + 1.5, 69, 0.07, 1.0);
for (let i = 0; i < 3; i++) m.golpe(Es + 1.5 + i * 0.5, 0.25, 110);            // tres cuadritos de hectárea
m.nota(Es + 2.6, 76, 0.06, 0.8);                                               // +64 %
m.sube(An + 0.5, 1.1, 52, 76, 0.05); m.sube(An + 1.4, 0.8, 52, 57, 0.05);      // barra alta y barra baja
m.golpe(An + 2.4, 0.45, 60); m.nota(An + 2.4, 45, 0.08, 1.4);                  // seis veces más
m.golpe(Am + 0.9, 0.4, 70); m.cruje(Am + 0.95, 0.4);                           // tala
m.nota(Am + 2.4, 62, 0.05, 1.4, 0.7); m.nota(Am + 3.0, 60, 0.05, 1.4, 0.8);   // el algodoncillo se seca
m.zumbido(Am + 3.0, 2.4, 0.03, 140);                                           // clima extremo
for (let i = 0; i < 10; i++) m.tic(D + 0.3 + i * 0.22, 0.05, 1500);            // la oruga mastica
m.whoosh(D + 1.8, 0.7, 0.12); m.golpe(D + 2.6, 0.3, 120);                      // llega el pájaro y pica
m.burbuja(D + 4.0, 0.2, 300); m.whoosh(D + 4.0, 0.6, 0.1);                    // ¡puaj!
m.whoosh(C + 0.2, 0.8, 0.14); m.sube(C + 0.6, 1.0, 57, 69, 0.05); aleteo(C + 0.8, 18);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
