// gen-audio.mjs — cama grave + efectos del Shot IA #01 (AlphaFold). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot AlphaFold base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K, E = m.ESC;
const G = K.Gancho, Co = K.Collar, D = K.Dobla, L = K.Llave, R = K.Rayos, P = K.Pregunta, Re = K.Red, Es = K.Estudio, B = K.Base, O = K.Ojo, Pe = K.Pesa, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.7, 0.2);                                                         // el estambre llega girando
m.sube(G + 2.4, 0.8, 57, 69, 0.06); m.nota(G + 3.0, 69, 0.08, 0.8);            // se revela la proteína
m.whoosh(Co - 0.3, 1.4, 0.12);                                                 // se estira
for (let i = 0; i < 12; i++) m.tic(Co + 1.5 + i * 0.05, 0.05, 2600 + i * 60);  // las letras de las cuentas
for (let i = 0; i < 8; i++) m.nota(D + 0.4 + i * 0.32, E[8 - i], 0.04, 0.4);   // se dobla, cuenta por cuenta
m.golpe(L + 1.1, 0.3, 90); m.metal(L + 1.15, 0.12, 1200);                     // la llave entra
m.golpe(L + 1.5, 0.35, 60); m.cruje(L + 1.55, 0.3);                           // otra forma: choca
m.zumbido(R + 1.0, P - R - 1.2, 0.04, 120);                                    // rayos X
for (let i = 0; i < 20; i++) m.tic(R + 1.6 + i * 0.11, 0.05, 3400);            // puntos del patrón
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 14; i++) m.tic(Re + 0.3 + i * 0.12, 0.05, 1800);           // las letras entran a la red
for (let k = 0; k < 3; k++) m.sube(Re + 1 + k * 2.2, 1.6, 57, 76, 0.03);       // la onda cruza la red
m.nota(Re + 4.2, 69, 0.07, 1.0); m.nota(Re + 4.2, 76, 0.05, 1.0);              // sale la forma
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 48; i++) m.tic(B + 0.8 + i * 0.07, 0.04, 2000 + (i % 8) * 150); // el catálogo se llena
m.sube(B + 0.4, 2.4, 52, 76, 0.04); m.nota(B + 2.8, 76, 0.08, 1.2);
m.pad(O, Pe, 0.025, [40, 47]); m.nota(O + 1.0, 64, 0.05, 0.8); m.nota(O + 1.6, 63, 0.05, 0.8); // confianza (azul y naranja)
for (let i = 0; i < 23; i++) m.golpe(Pe + 0.4 + i * 0.06, 0.06, 140);          // 23 discos
m.metal(Pe + 2.0, 0.1, 900); m.metal(Pe + 2.2, 0.1, 900);                      // celular lleno
m.whoosh(C + 0.2, 0.6, 0.12); m.sube(C + 1.8, 0.8, 57, 69, 0.05); m.golpe(C + 3.3, 0.3, 90); m.metal(C + 3.35, 0.1, 1200);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
