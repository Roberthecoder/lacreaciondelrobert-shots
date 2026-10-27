// gen-audio.mjs — cama grave + efectos del Shot IA #02 (lo que leyó GPT-3). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Cada cuadrito que se colorea suena (una nota por cuadrito): 92 notas del inglés, 2 del francés, 1 del alemán…
// y el español no alcanza a completar su nota (se corta al 77 %).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Espanol IA base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K, E = m.ESC;
const G = K.Gancho, Cu = K.Cuadritos, R = K.Reto, I = K.Ingles, O = K.Otros, Es = K.Espanol, M = K.Mucho, P = K.Pregunta, In = K.Internet, F = K.Ficha, Fu = K.Fuera, Co = K.Consejo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 12; i++) m.whoosh(G + 0.05 + i * 0.28, 0.4, 0.05);              // palabras que vuelan
for (let i = 0; i < 100; i += 2) m.tic(G + 0.2 + (i / 100) * 3.6, 0.03, 1500 + i * 8); // la cuadrícula se lee
m.nota(Cu + 0.4, 69, 0.08, 0.8);                                                     // un cuadrito
for (let i = 0; i < 3; i++) m.tic(R + 0.6 + i * 0.8, 0.08, 900);                     // reto: tic, tic, tic
for (let i = 0; i < 92; i++) { const u = i / 92, t = I + 2.0 * (u < 0.5 ? Math.cbrt(u / 4) : 1 - Math.cbrt((1 - u) / 4)); m.nota(t, E[i % 6] - 12, 0.025, 0.25); } // 92 del inglés
m.nota(O + 0.5, 64, 0.07, 0.6); m.nota(O + 0.9, 67, 0.07, 0.6);                      // francés (casi 2)
m.nota(O + 1.6, 72, 0.07, 0.6);                                                      // alemán (1.5)
for (let i = 0; i < 3; i++) m.nota(Es + 0.2 + i * 0.2, 55, 0.04, 0.3);                 // los demás idiomas
m.nota(Es + 1.0, 76, 0.09, 1.6 * 0.77);                                              // español: una nota que no se completa
m.golpe(Es + 2.0, 0.3, 70);
m.golpe(M + 0.6, 0.15, 160); m.sube(M + 4.2, 1.4, 45, 69, 0.07); m.golpe(M + 5.6, 0.4, 60); // la barra del inglés crece
m.sube(P + 0.1, 1.2, 52, 64, 0.05);
for (let i = 0; i < 24; i++) m.tic(In + 0.4 + i * 0.18 + 1.0, 0.04, i === 17 ? 3000 : 1600); // fichas al embudo
m.whoosh(F, 0.6, 0.15); m.metal(F + 4.6, 0.08, 1400); m.metal(F + 6.6, 0.08, 1400);   // ficha y resaltados
for (let i = 0; i < 6; i++) m.nota(Fu + 0.9 + i * 0.25, E[6 - i] - 12, 0.04, 0.5);       // comunidades que se apagan
m.tic(Co + 0.3, 0.1, 2400); m.tic(Co + 2.0, 0.1, 2000);                               // mensajes del chat
m.whoosh(C, 0.5, 0.1); m.nota(C + 0.6, 76, 0.08, 1.6 * 0.77);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
