// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #73 (pasto termal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pasto base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 73);
const K = m.K;
const G = K.Gancho, L = K.Lugar, E = K.Endofito, S = K.Solos, J = K.Juntos, P = K.Pregunta, Es = K.Estudio, SV = K.SinVirus, CV = K.ConVirus, Ji = K.Jitomate, M = K.Mecanismo, C = K.Cierre, Ou = K.Outro;

m.pad(0, CV + 1.4, 0.05, [41, 48, 53], 0.25);                                   // cama grave cálida y tensa (calor)
m.pad(CV + 1.4, Ou + 3.5, 0.05, [41, 48, 55], 0);                                // se abre cuando vuelve el virus
for (let t = 0.3; t < CV + 1.4; t += 1.7) m.whoosh(t, 1.2, 0.025);              // vapor que sisea (temblor del calor)
for (let i = 0; i < 6; i++) m.tic(G + 0.1 + i * 0.35, 0.08, 1500 + i * 120);     // el termómetro sube
m.sube(G + 2.4, 1.0, 55, 64, 0.04); m.burbuja(G + 3.3, 0.08, 520); m.burbuja(G + 3.6, 0.08, 620); // lupa: hongo y virus
m.whoosh(L, 0.8, 0.06); for (let i = 0; i < 3; i++) m.burbuja(L + 0.6 + i * 0.5, 0.07, 300 + i * 60); // fumarolas
for (let i = 0; i < 4; i++) m.nota(L + 0.3 + i * 0.25, 60 + i * 2, 0.04, 0.4);   // brotan las matas
for (let i = 0; i < 6; i++) m.tic(L + 1.6 + i * 0.27, 0.07, 1500 + i * 150);     // termómetro a 70 °C
m.sube(E + 0.2, 2.6, 45, 57, 0.04);                                               // la hifa crece por la raíz
for (let i = 0; i < 8; i++) m.nota(E + 2.0 + i * 0.15, 72 + (i % 3) * 3, 0.03, 0.25); // aparecen los virus
for (let i = 0; i < 4; i++) m.tic(S + 0.4 + i * 0.3, 0.07, 1400);               // termómetro a 38 °C
m.cruje(S + 1.8, 0.4); m.golpe(S + 2.6, 0.35, 70); m.golpe(S + 2.8, 0.35, 70);   // se marchitan; dos tachas
for (let i = 0; i < 8; i++) m.tic(J + 0.2 + i * 0.15, 0.08, 1300 + i * 120);    // termómetro a 65 °C
m.golpe(J + 0.4, 0.3, 90); m.nota(J + 0.5, 69, 0.05, 0.8);                      // 65 °C: sigue verde
for (let i = 0; i < 13; i++) m.tic(J + 2.6 + i * 0.15, 0.05, 2200);             // pasan los 14 días
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                               // re-gancho
m.golpe(Es + 0.2, 0.35, 80);                                                      // tarjeta 2007
for (let i = 0; i < 10; i++) m.nota(Es + 2.7 + i * 0.12, 84 + (i % 4), 0.02, 0.3); // copos (congelado)
m.whoosh(Es + 3.6, 1.0, 0.05);                                                    // se va el virus
m.cruje(SV + 0.4, 0.6); m.cruje(SV + 1.2, 0.5); m.golpe(SV + 1.2, 0.4, 55);      // el pasto se seca
m.burbuja(CV + 1.3, 0.1, 380); m.burbuja(CV + 1.45, 0.1, 460);                   // se fusionan las hifas
for (let i = 0; i < 6; i++) m.nota(CV + 1.5 + i * 0.2, 64 + i * 2, 0.04, 0.4);   // el virus pasa
m.nota(CV + 2.8, 69, 0.06, 1.2); m.nota(CV + 2.8, 76, 0.04, 1.2);                // vuelve a aguantar
for (let i = 0; i < 3; i++) m.nota(Ji + 0.3 + i * 0.25, 62 + i * 3, 0.05, 0.5);  // brotan los jitomates
m.cruje(Ji + 2.7, 0.6); m.golpe(Ji + 3.5, 0.3, 60);                               // uno se dobla
m.sube(M + 1.0, 1.4, 48, 60, 0.04); m.tic(M + 1.6, 0.1, 900); m.golpe(M + 3.4, 0.25, 100); // medidores y chip
for (let i = 0; i < 3; i++) m.nota(C + 0.3 + i * 0.2, 60 + i * 4, 0.05, 1.0);    // los tres íconos
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
