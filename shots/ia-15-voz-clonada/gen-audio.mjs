// gen-audio.mjs — cama grave + efectos del Shot IA #15 (voz clonada y la estafa del familiar). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot VozClonada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 15);
const K = m.K;
const G = K.Gancho, P1 = K.Paso1, P2 = K.Paso2, P3 = K.Paso3, S = K.Segundos, Q = K.Pregunta, O = K.Oidos, C = K.Confesion, D = K.Defensa, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
// el celular vibra (cuadro 0) y la voz se vuelve bloques
m.zumbido(G + 0.0, 1.6, 0.05, 140); m.zumbido(G + 2.0, 1.2, 0.04, 140);
for (let i = 0; i < 8; i++) m.tic(G + 2.0 + i * 0.1, 0.12, 900 + i * 160);
m.golpe(G + 2.2, 0.3, 90);
// paso 1: whoosh, tijera
m.whoosh(P1, 0.5, 0.12); m.golpe(P1 + 0.9, 0.3, 80);
m.metal(P1 + 2.6, 0.18, 1400); m.metal(P1 + 2.8, 0.15, 1600); m.burbuja(P1 + 3.3, 0.14, 600);
// paso 2: la máquina aprende
m.whoosh(P2, 0.5, 0.12); m.golpe(P2 + 0.05, 0.3, 80); m.zumbido(P2 + 0.3, 2.8, 0.03, 220); m.sube(P2 + 0.4, 2.2, 48, 67, 0.04); m.nota(P2 + 2.4, 72, 0.05, 0.6);
// paso 3: llamada urgente, choque, patrulla, "deposita ya"
m.golpe(P3 + 0.05, 0.3, 80); m.zumbido(P3 + 0.1, 1.4, 0.05, 140);
m.golpe(P3 + 1.6, 0.45, 60); m.cruje(P3 + 1.65, 0.3);
for (let i = 0; i < 6; i++) m.nota(P3 + 2.3 + i * 0.22, i % 2 ? 76 : 71, 0.04, 0.2);
m.golpe(P3 + 3.3, 0.35, 70);
// segundos: tarjeta, 3 tics del cronómetro
m.whoosh(S, 0.5, 0.12); m.golpe(S + 1.5, 0.3, 80);
for (let i = 0; i < 3; i++) m.tic(S + 5.0 + i * 0.33, 0.2, 2200);
m.nota(S + 6.0, 69, 0.05, 0.6);
// pregunta
m.sube(Q + 0.05, 1.4, 50, 62, 0.05);
// oídos: tarjeta, 529 personitas, 73 %
m.whoosh(O, 0.5, 0.12); m.golpe(O + 0.2, 0.3, 80);
for (let i = 0; i < 16; i++) m.tic(O + 2.2 + i * 0.1, 0.05, 1800 + (i % 4) * 150);
m.sube(O + 5.6, 1.6, 52, 70, 0.04); m.nota(O + 7.8, 57, 0.06, 0.6, 0.6);
// confesión
m.whoosh(C, 0.5, 0.1); m.nota(C + 0.8, 72, 0.05, 0.5); m.nota(C + 2.4, 76, 0.05, 0.6);
// defensa: tachón, paso 1, paso 2
m.whoosh(D, 0.5, 0.1); m.cruje(D + 1.5, 0.25);
m.golpe(D + 2.4, 0.3, 80); m.nota(D + 2.5, 72, 0.05, 0.5);
const D2 = D + (Ci - D) * 0.54;
m.golpe(D2 + 0.8, 0.3, 80); m.nota(D2 + 0.9, 76, 0.05, 0.5);
// cierre: vibra, la copia se desarma, clic del candado
m.zumbido(Ci + 0.0, 2.4, 0.04, 140); m.burbuja(Ci + 0.8, 0.14, 500);
for (let i = 0; i < 12; i++) m.tic(Ci + 2.0 + i * 0.08, 0.1, 700 + (i % 6) * 220);
m.metal(Ci + 3.1, 0.2, 1100); m.nota(Ci + 3.3, 72, 0.06, 0.8); m.nota(Ci + 3.35, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
