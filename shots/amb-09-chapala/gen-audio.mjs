// gen-audio.mjs — cama grave + efectos del Shot Ambiental #09 (Lago de Chapala). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chapala base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 99);
const K = m.K;
const G = K.Gancho, L = K.Lago, Pl = K.Plano, P = K.Pregunta, Es = K.Estiaje, M = K.Minimo, Ci = K.Cienega, H = K.Hoy, R = K.Reparto, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 10; i++) { const t = G + 0.1 + i * 0.12; i < 6 ? m.gota(t, 0.14, 700 + i * 40) : m.tic(t, 0.05, 1600); }   // 10 litros: 6 de Chapala
m.nota(G + 1.4, 64, 0.06, 0.9);
m.whoosh(L + 0.1, 0.8, 0.1); for (let i = 0; i < 5; i++) m.burbuja(L + 1.0 + i * 0.5, 0.05, 380);
m.sube(Pl + 0.1, 0.9, 57, 69, 0.05); m.golpe(Pl + 1.4, 0.3, 120);                    // la línea de 1 m y la lupa
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 12; i++) m.gota(Es + 0.3 + i * 0.3, 0.07, 900 + (i % 3) * 120);     // lluvia
m.sube(M + 0.3, 1.7, 64, 45, 0.06); m.golpe(M + 2.0, 0.35, 55);                        // 1955: el mínimo
m.cruje(Ci + 1.5, 0.3); m.sube(Ci + 1.5, 2.5, 60, 52, 0.04);                           // se seca la Ciénega
m.sube(H + 0.3, 1.7, 45, 64, 0.06); m.nota(H + 2.2, 69, 0.06, 0.9);                    // hoy: 70 %
m.golpe(R + 0.6, 0.25, 90); m.nota(R + 1.2, 64, 0.05, 0.7); m.nota(R + 1.6, 67, 0.05, 0.7);
for (let i = 0; i < 10; i++) { const t = C - 0.5 + i * 0.12; i < 6 ? m.gota(t, 0.12, 700 + i * 40) : m.tic(t, 0.04, 1600); }
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
