// gen-audio.mjs — cama grave + efectos del Shot Ambiental #45 (agua embotellada). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Agua Embotellada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 45);
const K = m.K;
const G = K.Gancho, E = K.Encuesta, Ma = K.Mapa, Ga = K.Garrafon, P = K.Pregunta, H = K.Historia, Gs = K.Gasto, Q = K.QueSirve, Hv = K.Hervir, C = K.Cierre, Ou = K.Outro;

m.pad(0, Q, 0.05, [45, 52, 57]);                                        // tensa mientras dura la desconfianza
m.pad(Q, Ou + 3.5, 0.05, [45, 52, 57, 64]);                             // más abierta desde "¿qué sí sirve?"
for (let i = 0; i < 5; i++) { const t = G + 0.5 + i * 0.45; i < 4 ? m.tic(t, 0.12, 900) : m.nota(t, 69, 0.07, 0.6); }   // 4 taches y 1 palomita
m.gota(G + 0.15, 0.12, 900); m.nota(G + 0.3, 57, 0.05, 0.8);
m.golpe(E + 0.2, 0.25, 110); m.sube(E + 1.2, 1.4, 57, 62, 0.05); m.tic(E + 2.6, 0.08, 1500);   // tarjeta y 19 %
m.sube(E + 4.0, 1.2, 57, 59, 0.04); m.tic(E + 5.2, 0.06, 1300);                                  // Jalisco 8.9 %
[0.4, 0.9, 1.4, 2.6].forEach((d, i) => m.nota(Ma + d + 0.9, [72, 64, 60, 57][i], 0.05, 0.6));   // barras por estado
for (let i = 0; i < 4; i++) { const t = Ga + 0.6 + i * 0.4; i < 3 ? m.burbuja(t, 0.1, 420) : m.tic(t, 0.06, 1400); }   // garrafones
m.nota(Ga + 3.6, 64, 0.05, 0.8);
m.sube(P + 0.05, 1.3, 52, 64, 0.05); for (let i = 0; i < 3; i++) m.gota(P + 0.3 + i * 0.83, 0.1, 850);
m.whoosh(H + 0.1, 1.0, 0.1); m.golpe(H + 0.5, 0.45, 55); m.cruje(H + 0.6, 0.3);                 // sismo: el tubo se rompe
m.zumbido(H + 2.0, 1.6, 0.04, 210);                                                              // Vibrio
for (let i = 0; i < 8; i++) m.metal(Gs + 0.4 + i * 0.45 + 0.6, 0.08, 1300);                       // monedas
m.nota(Gs + 2.6, 69, 0.05, 0.8);
m.nota(Q + 0.3, 64, 0.06, 0.9); for (let i = 0; i < 32; i++) m.tic(Q + 1.6 + i * 0.07, 0.04, 1800 + (i % 4) * 150);   // 32 botellas
for (let i = 0; i < 16; i++) m.burbuja(Hv + 0.3 + i * 0.22, 0.07, 300 + (i % 5) * 60);             // hervor
m.sube(Hv + 1.6, 2.0, 64, 57, 0.03);
m.tic(Hv + 4.0, 0.1, 1200); m.nota(Hv + 5.0, 72, 0.06, 0.9);                                     // filtro y sello
m.whoosh(C + 0.2, 1.2, 0.08); for (let i = 0; i < 5; i++) m.nota(C + 0.9 + i * 0.3, [57, 60, 64, 67, 69][i], 0.05, 0.6);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
