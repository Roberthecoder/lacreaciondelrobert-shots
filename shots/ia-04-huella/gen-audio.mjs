// gen-audio.mjs — cama grave + efectos del Shot IA #04 (lo que costó entrenar Llama 3). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// El calendario suena con un tic por cada 50 años (730 años del modelo 70B ≈ 15 tics); cada tarjeta que aparece suena al entrar.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huella IA base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 61);
const K = m.K, E = m.ESC;
const G = K.Gancho, Ll = K.Llama, H = K.Horas, Mu = K.Muchas, W = K.Watts, P = K.Pregunta, Co = K.CO2, Gr = K.Grande, Cm = K.Compensa, O = K.Ojo, Le = K.Leyo, Ex = K.Extra, C = K.Cierre, Ou = K.Outro;
const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.motor(G + 0.2, 5.0, 0.04);                                                     // los ventiladores
for (let a = 50; a < 730; a += 50) { let lo = 0, hi = 1; for (let i = 0; i < 25; i++) { const md = (lo + hi) / 2; if (suave(md) < a / 730.1) lo = md; else hi = md; } m.tic(G + 0.1 + lo * 5.4, 0.08, 1600 + a); }
m.golpe(G + 5.5, 0.35, 70);
m.nota(Ll + 0.3, 64, 0.07, 0.8); m.nota(Ll + 0.3, 69, 0.05, 0.8);
m.sube(H + 0.2, 1.0, 45, 64, 0.05); m.golpe(H + 1.2, 0.3, 80);
for (let i = 0; i < 24; i++) m.tic(Mu + 0.2 + i * 0.06, 0.05, 900 + (i % 4) * 120);  // 24 tarjetas
m.motor(Mu, P - Mu, 0.05); m.sube(W + 0.3, 1.3, 40, 64, 0.06);                      // a 700 W
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 9; i++) m.whoosh(Co + 0.4 + i * 0.25, 0.5, 0.05);                 // nubes
m.golpe(Co + 1.9, 0.35, 60);
m.golpe(Gr + 0.4, 0.3, 55); m.golpe(Gr + 0.8, 0.2, 110);                            // grande y chico
m.nota(Cm + 0.6, 57, 0.05, 1.4); m.nota(Cm + 1.6, 64, 0.05, 1.0);                     // la báscula
m.cruje(O + 0.3, 0.25); m.sube(O + 1.0, 2.5, 57, 52, 0.04);                          // el gas ya salió
for (let i = 0; i < 26; i++) m.tic(Le + 0.2 + i * 0.16 + 1.2, 0.04, 2000 + (i % 5) * 200);  // tokens a la llama
m.sube(Le + 1.6, 1.0, 57, 76, 0.05);
m.tic(Ex + 0.3, 0.1, 2400); m.tic(Ex + 1.6, 0.1, 2000);
for (let k = 0; k < 3; k++) m.metal(Ex + 1.7 + k * 0.9, 0.08, 1300);                  // rayitos de energía
m.motor(C, 4, 0.04); m.golpe(C + 0.4, 0.3, 70); m.tic(C + 1.0, 0.08, 2000);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
