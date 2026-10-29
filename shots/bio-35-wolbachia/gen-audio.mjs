// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #35 (Wolbachia). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Wolbachia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 35);
const K = m.K;
const G = K.Gancho, Ba = K.Bacteria, Pr = K.Prestada, PD = K.PorDentro, Sa = K.Saliva, Pq = K.Pregunta, He = K.Herencia,
  Tr = K.Truco, Ga = K.Gana, Es = K.Estudio, Re = K.Resultado, Oj = K.Ojo, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// gancho: el mosco llega zumbando y aterriza; la bacteria brilla
m.zumbido(0, 0.9, 0.07, 520); m.tic(G + 0.7, 0.12, 900); m.nota(G + 1.4, 76, 0.06, 0.9);
// insectos con Wolbachia (una nota por insecto) y el ✕ del Aedes
for (let i = 0; i < 4; i++) m.nota(Ba + 0.3 + i * 0.35, 69 + i * 3, 0.06, 0.5);
m.golpe(Ba + 2.6, 0.25, 110);
// mosca → células → huevo
m.zumbido(Pr, 1.0, 0.05, 430); m.whoosh(Pr + 1.2, 0.6, 0.12);
for (let i = 0; i < 12; i++) m.nota(Pr + 2.0 + i * 0.08, 72 + (i % 5) * 2, 0.03, 0.3);
m.whoosh(Pr + 3.4, 0.6, 0.12); m.metal(Pr + 4.7, 0.12, 1200); m.nota(Pr + 4.9, 81, 0.06, 0.8);
// lupa: virus que entran y se frenan
m.whoosh(PD + 0.1, 0.55, 0.14);
for (let i = 0; i < 5; i++) { const ti = PD + 0.8 + i * 0.45; m.burbuja(ti, 0.08, 600 + i * 60); m.nota(ti + 1.1, 52 - i, 0.05, 0.5, 0.8); }
// saliva: gotitas; la bacteria aparece
for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) m.gota(Sa + 0.4 + i * 1.1 + k * 3.3, 0.14, 1000);
m.nota(Sa + 1.5, 76, 0.06, 0.8);
// re-gancho
m.sube(Pq + 0.1, 1.4, 52, 64, 0.05); m.zumbido(Pq + 0.2, 2.2, 0.03, 500);
// la mamá pone huevos (uno por huevo)
for (let i = 0; i < 6; i++) m.gota(He + 0.4 + i * 0.3 + 0.4, 0.13, 800 + i * 40);
// cruces: el primero no nace (golpe sordo), los otros sí (nota)
for (let f = 0; f < 3; f++) { const t0 = Tr + 0.2 + f * 1.1; m.tic(t0, 0.1, 1600); if (f === 0) m.golpe(t0 + 0.6, 0.3, 70); else m.nota(t0 + 0.6, 69 + f * 3, 0.06, 0.6); }
// generaciones: cada vez más moscos con la bacteria (notas que suben)
for (let k = 0; k < 5; k++) m.nota(Ga + 0.3 + 2.9 * k / 5, 64 + k * 3, 0.05 + k * 0.01, 0.7, 0.6 - k * 0.15);
// estudio: 24 notas = 24 zonas (claras las 12 con Wolbachia, apagadas las 12 de control)
const ZONAS = [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1];
m.golpe(Es + 0.2, 0.3, 80);
ZONAS.forEach((z, i) => m.nota(Es + 3.0 + i * 0.06, z ? 76 : 57, z ? 0.05 : 0.03, 0.4, z ? 0 : 0.9));
// resultado
m.golpe(Re + 0.4, 0.35, 80); m.sube(Re + 0.4, 0.9, 57, 69, 0.04); m.golpe(Re + 2.8, 0.35, 75); m.sube(Re + 2.8, 0.9, 60, 72, 0.04);
// no es transgénico: se tacha
m.tic(Oj + 1.0, 0.18, 700); m.nota(Oj + 1.3, 72, 0.06, 0.7);
// cierre
m.zumbido(Ci, 0.6, 0.04, 520); m.nota(Ci + 0.6, 76, 0.05, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
