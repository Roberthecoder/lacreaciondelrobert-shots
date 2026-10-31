// gen-audio.mjs — cama grave espacial + efectos del Shot IA #48 (el planeta escondido de Kepler-90). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Exoplaneta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
const G = K.Gancho, Tr = K.Transito, Ke = K.Kepler, Ru = K.Ruido, P = K.Pregunta, En = K.Entrena, Bu = K.Busca, H = K.Hallazgo, Em = K.Empate, C = K.Cierre, Ou = K.Outro;
const H2 = H + 3.9;

m.pad(0, Ou + 3.5, 0.05, [38, 45, 50, 57]);                                        // cama grave espacial
// gancho: la curva se dibuja y baja cuando el planeta cruza (≈ 55 % del trazo)
m.zumbido(G + 0.05, 5.4, 0.015, 110);
m.sube(G + 0.05 + 5.85 * 0.48, 0.5, 64, 59, 0.05); m.tic(G + 0.05 + 5.85 * 0.55, 0.12, 900);
// tránsito de cerca y los 10 000 focos
m.whoosh(Tr, 0.5, 0.12); m.sube(Tr + 0.2, 2.4, 57, 55, 0.03);
m.whoosh(Tr + 2.6, 0.4, 0.1); m.burbuja(Tr + 2.75, 0.12, 700);
m.tic(Tr + 3.6, 0.35, 1100); m.golpe(Tr + 3.65, 0.18, 70);                          // se apaga un foco
// Kepler: estrellas que se encienden y el contador
for (let i = 0; i < 24; i++) m.nota(Ke + 1.0 + i * 0.1, m.ESC[(i * 3) % 10] + 12, 0.018, 0.25);
m.sube(Ke + 1.4, 1.6, 52, 72, 0.035);
// ruido: estática con las curvas débiles
m.sube(Ru + 0.2, 1.4, 52, 70, 0.035);
for (let i = 0; i < 5; i++) m.tic(Ru + 0.4 + i * 0.25, 0.1, 1600 + i * 100);
m.whoosh(Ru + 2.2, 1.6, 0.06);
// pregunta
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
// red neuronal: tarjetas que entran y pulsos de la red
m.zumbido(En + 0.5, 7.0, 0.02, 180);
for (let i = 0; i < 4; i++) { m.whoosh(En + 0.8 + i * 1.6, 0.4, 0.07); m.nota(En + 1.6 + i * 1.6, i % 2 ? 57 : 69, 0.04, 0.4); }
for (let k = 0; k < 6; k++) m.tic(En + 1.2 + k * 1.1, 0.08, 2600);
m.sube(En + 4.2, 1.2, 52, 71, 0.035);
// estudio y búsqueda en 670 estrellas
m.golpe(Bu + 0.15, 0.35, 80);
for (let i = 0; i < 26; i++) m.tic(Bu + 2.6 + i * ((H - 0.3 - Bu - 2.6) / 26), 0.05, 2000 + (i % 4) * 150);
// hallazgo
m.sube(H + 0.1, 1.3, 55, 60, 0.03); m.nota(H + 1.5, 76, 0.06, 0.8); m.nota(H + 1.55, 81, 0.05, 0.8);   // la red marca la caída
m.whoosh(H + 1.9, 0.5, 0.1); m.nota(H + 2.7, 72, 0.06, 1.0); m.nota(H + 2.75, 79, 0.05, 1.0);          // aparece Kepler-90i
m.golpe(H2, 0.4, 60); m.cruje(H2 + 0.2, 0.25);                                     // el planeta rocoso, al rojo vivo
m.tic(H2 + 1.6, 0.15, 1500); m.zumbido(H2 + 3.0, 1.2, 0.03, 90); m.tic(H2 + 3.8, 0.12, 1500);
// empate 8 = 8
for (let i = 0; i < 8; i++) m.nota(Em + 0.6 + i * 0.12, m.ESC[i], 0.03, 0.3);
for (let i = 0; i < 8; i++) m.nota(Em + 1.7 + i * 0.12, m.ESC[i], 0.03, 0.3);
m.nota(Em + 2.4, 60, 0.06, 1.2); m.nota(Em + 2.4, 67, 0.05, 1.2); m.nota(Em + 2.9, 60, 0.06, 1.2); m.nota(Em + 2.9, 67, 0.05, 1.2);
// cierre: la misma estrella; el parpadeo ahora suena como un mundo
m.sube(C + 0.1 + (Ou - 0.5 - C) * 0.48, 0.5, 64, 59, 0.05); m.nota(C + 2.2, 72, 0.06, 0.9); m.nota(C + 2.25, 76, 0.05, 0.9);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
