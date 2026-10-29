// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #26 (la papaya y el virus de la mancha anular). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Papaya base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 26);
const K = m.K;
const G = K.Gancho, L = K.Llega, Pu = K.Pulgon, D = K.Dano, Ca = K.Caida, Pr = K.Pregunta, Ge = K.Gen, Di = K.Disparo,
  Si = K.Silencio, Es = K.Estudio, Ra = K.Rainbow, Me = K.Medida, Ci = K.Cierre, Ou = K.Outro;
const mx = Me + 4.2;

// cama grave continua: tapada mientras el virus avanza, libre cuando la defensa funciona
m.pad(0, Si + 2.4, 0.05, [45, 52, 57], 0.5);
m.pad(Si + 2.4, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
// 0 · gancho: el insecticida se tacha y la hebra brilla
m.metal(G + 1.6, 0.14, 600); m.sube(G + 2.2, 1.0, 64, 76, 0.05);
// 1 · Puna: el punto rojo
m.golpe(L + 0.8, 0.3, 80); for (let i = 0; i < 4; i++) m.nota(L + 1.4 + i * 0.3, 57 - i * 2, 0.04, 0.5, 0.4);
// 2 · el pulgón vuela, pica unos segundos y se va
m.zumbido(Pu + 0.2, 1.1, 0.06, 230); m.tic(Pu + 1.35, 0.2, 2600); m.zumbido(Pu + 2.5, 0.7, 0.05, 230);
// 3 · aparecen los anillos (una nota por anillo) y baja el azúcar
for (let i = 0; i < 9; i++) m.nota(D + 0.2 + i * 0.2, 64 - (i % 3) * 3, 0.035, 0.4, 0.3);
m.sube(D + 2.2, 1.4, 64, 52, 0.05);
// 4 · las barras: 1992 sube, 1997 baja más corta
m.sube(Ca + 0.4, 1.0, 50, 62, 0.05); m.sube(Ca + 1.4, 1.2, 50, 57, 0.05); m.golpe(Ca + 2.7, 0.3, 70);
// 5 · re-gancho
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
// 6 · se resalta y se recorta el gen
m.nota(Ge + 1.4, 76, 0.06, 1.2); m.tic(Ge + 2.4, 0.15, 1800); m.tic(Ge + 2.5, 0.15, 1800);
// 7 · el disparo y los microbalines que llegan
m.golpe(Di + 1.0, 0.4, 100); m.whoosh(Di + 1.0, 0.6, 0.15); for (let i = 0; i < 6; i++) m.tic(Di + 1.3 + i * 0.1, 0.08, 3000);
// 8 · la Lupa se abre, el gen se lee, entra el virus y las tijeras lo cortan
m.whoosh(Si + 0.2, 0.6, 0.12); for (let i = 0; i < 3; i++) m.nota(Si + 0.6 + i * 0.33, 69 + i * 3, 0.04, 0.5);
m.whoosh(Si + 2.4, 1.0, 0.08); for (let i = 0; i < 8; i++) m.tic(Si + 3.5 + i * 0.13, 0.14, 2000 + (i % 3) * 300);
// 9 · ensayo de 1995: una nota grave por cada árbol que enferma; los del gen, silencio
m.golpe(Es + 0.1, 0.35, 80);
for (let i = 0; i < 13; i++) m.nota(Es + 1.2 + i * 0.18, 45 + (i % 4), 0.04, 0.4, 0.5);
m.nota(Es + 3.2, 69, 0.05, 1.2); m.nota(Es + 3.2, 76, 0.04, 1.2);
// 10 · Rainbow y el pastel que se llena
m.metal(Ra + 0.2, 0.1, 900); m.sube(Ra + 2.6, 1.2, 60, 72, 0.05);
// 11 · llaves: Hawái abre, Brasil y Tailandia no; luego el punto en Veracruz
m.metal(Me + 1.1, 0.16, 1200); m.golpe(Me + 2.0, 0.25, 70); m.golpe(Me + 2.9, 0.25, 70); m.golpe(mx + 0.2, 0.3, 80);
// 12 · cierre
m.sube(Ci + 0.2, 1.2, 64, 76, 0.04);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
