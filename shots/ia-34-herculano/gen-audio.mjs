// gen-audio.mjs — cama grave + efectos del Shot IA #34 (pergaminos de Herculano leídos con IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Herculano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 34);
const K = m.K;
const G = K.Gancho, V = K.Volcan, A = K.Abrir, X = K.RayosX, P = K.Pregunta, I = K.IA, Pa = K.Palabra, Pr = K.Premio, M = K.Matiz, Pl = K.Placeres, Ti = K.Titulo, C = K.Cierre, Ou = K.Outro;

// cama grave: tapada mientras el rollo "no habla"; se abre con «púrpura»
m.pad(0, Pa + 3.2, 0.05, [41, 48, 53]);
m.pad(Pa + 3.0, Ou + 3.5, 0.05, [45, 52, 57, 64]);
m.cruje(G + 0.2, 0.3); m.cruje(G + 0.7, 0.2);                                   // el carbón cruje en la mano
m.whoosh(G + 1.0, 0.4, 0.12); m.zumbido(G + 1.2, 3.5, 0.02, 220);               // entra la lupa
m.golpe(V + 0.1, 0.6, 45); m.golpe(V + 0.6, 0.4, 50); m.motor(V + 0.2, 2.0, 0.05); // retumbo del volcán
for (let i = 0; i < 16; i++) m.tic(V + 2.5 + i * 0.09, 0.05, 900 + (i % 4) * 80); // los rollos en los estantes
m.golpe(A + 0.6, 0.35, 70); m.burbuja(A + 1.2, 0.15, 400); m.whoosh(A + 1.7, 0.5, 0.1); // pesa, químico, gas
m.cruje(A + 2.4, 0.5); m.cruje(A + 2.9, 0.4); m.cruje(A + 3.4, 0.3);            // se desmorona
m.zumbido(X + 0.2, 5.6, 0.03, 140);                                             // tomógrafo
m.nota(X + 3.0, 57, 0.05, 0.8, 0.7); m.nota(X + 3.05, 57, 0.05, 0.8, 0.7);       // mismo gris = misma nota
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 28; i++) m.tic(I + 1.0 + i * 0.15, 0.05, 1800 + (i % 6) * 110); // puntitos de tinta
m.zumbido(I + 0.6, 5.0, 0.02, 300);
m.golpe(Pa + 0.2, 0.35, 80);                                                    // tarjeta 2023
m.nota(Pa + 3.2, 72, 0.07, 1.2); m.nota(Pa + 3.25, 76, 0.06, 1.2); m.nota(Pa + 3.3, 79, 0.05, 1.4); // ¡púrpura!
for (let i = 0; i < 20; i++) m.tic(Pr + 0.3 + i * 0.11, 0.04, 2200 + (i % 5) * 90); // columnas que se llenan
m.sube(Pr + 0.6, 2.0, 52, 74, 0.035);
for (let i = 0; i < 6; i++) m.metal(Pr + 3.0 + i * 0.08, 0.1, 1200 + i * 60);     // monedas del premio
m.burbuja(M + 0.3, 0.15, 500); m.burbuja(M + 1.6, 0.15, 650);                    // tarjetas
m.nota(Pl + 1.2, 67, 0.06, 0.6); m.nota(Pl + 1.4, 71, 0.05, 0.6); m.nota(Pl + 1.6, 74, 0.05, 0.6); // la lira
m.burbuja(Pl + 2.0, 0.12, 450); m.nota(Pl + 2.8, 79, 0.05, 0.6);
m.whoosh(Ti + 0.5, 0.5, 0.1); m.nota(Ti + 0.8, 76, 0.06, 1.0); m.nota(Ti + 0.85, 81, 0.05, 1.0); // brilla el título
m.cruje(C + 0.2, 0.25); m.nota(C + 0.8, 72, 0.05, 1.2); m.nota(C + 1.2, 76, 0.05, 1.2); m.nota(C + 1.6, 79, 0.05, 1.4); // letras por dentro
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
