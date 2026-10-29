// gen-audio.mjs — cama grave + efectos del Shot IA #20 (cómo decide TikTok tu Para ti). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot TikTok base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 20);
const K = m.K;
const G = K.Gancho, S = K.Senales, Pe = K.Peso, R = K.Ranking, Q = K.Pregunta, P1 = K.Paso1, P2 = K.Paso2, P3 = K.Paso3, E = K.Estudio, X = K.Explora, C = K.Cierre, Ou = K.Outro;
const E2 = E + 112 / 17.6 + 0.35;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let t = G + 0.05; t < S; t += 1.1) m.whoosh(t + 0.15, 0.4, 0.1);             // cada deslizamiento
m.cruje(G + 1.3, 0.3);                                                             // se tacha la bola de cristal
for (let i = 0; G + 2.3 + 0.6 + i * 1.1 + 0.7 < S; i++) m.tic(G + 2.3 + 0.6 + i * 1.1 + 0.7, 0.18, 1600); // boletas a la urna
[0.3, 0.9, 1.5, 2.4, 3.4, 4.0].forEach((d) => m.burbuja(S + d, 0.14, 520));         // fichas que aparecen
[0.3, 0.9, 1.5, 2.4, 3.4].forEach((d) => m.gota(S + d + 2.2, 0.12, 700));          // caen al embudo
m.golpe(Pe + 0.3, 0.3, 80); m.sube(Pe + 0.5, 1.0, 52, 64, 0.04);                    // tarjeta 2020 · barra de progreso
m.golpe(Pe + 1.6, 0.5, 60); m.metal(Pe + 1.7, 0.12, 620);                           // baja la balanza
m.zumbido(R, 5.2, 0.02, 180);                                                       // por dentro de la máquina
for (let i = 0; i < 5; i++) m.tic(R + 0.2 + i * 0.15, 0.14, 1300 + i * 120);        // aparecen los videos
m.sube(R + 1.0, 1.0, 52, 72, 0.04); m.whoosh(R + 2.4, 0.9, 0.1); m.nota(R + 3.4, 72, 0.06, 0.6);
m.sube(Q + 0.05, 1.4, 50, 62, 0.05); m.whoosh(Q + 0.3, 1.6, 0.08);
m.golpe(P1, 0.3, 90); m.latido(P1 + 0.3, 0.15); m.pop ? m.pop(P1 + 0.9) : m.burbuja(P1 + 0.9, 0.16, 600); m.tic(P1 + 1.1, 0.2, 2200);
m.golpe(P2, 0.3, 90); [0.2, 1.0].forEach((d) => m.metal(P2 + d + 0.5, 0.08, 900)); [0.6, 1.4].forEach((d) => m.gota(P2 + d + 0.6, 0.12, 800));
m.golpe(P3, 0.3, 90); m.sube(P3 + 0.2, 1.4, 55, 79, 0.05); [0, 1, 2].forEach((k) => m.burbuja(P3 + 1.4 + k * 0.3, 0.14, 500 + k * 120));
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 24; i++) m.tic(E + 3.7 + i * 0.1, 0.05, 2000 + (i % 5) * 120); // llegan los 347 datos
m.whoosh(E2 - 0.2, 0.5, 0.1); m.sube(E2 + 0.5, 0.9, 52, 72, 0.04); m.sube(E2 + 1.1, 0.9, 52, 72, 0.04); m.sube(E2 + 1.8, 0.9, 52, 64, 0.03);
for (let i = 0; i < 26; i++) m.tic(X + 0.4 + i * 0.1, 0.05, 1800 + (i % 4) * 150); // se pintan los 100 videos
m.nota(X + 2.0, 69, 0.05, 0.6);
m.whoosh(C + 0.2, 0.5, 0.12); for (let i = 0; i < 3; i++) m.tic(C + 1.7 + i * 1.1, 0.18, 1600);
m.nota(C + 2.2, 72, 0.06, 0.8); m.nota(C + 2.25, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
