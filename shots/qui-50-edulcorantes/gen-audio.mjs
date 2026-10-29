// gen-audio.mjs — cama grave + efectos del Shot Químico #50 (endulzantes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Edulcorantes base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
const G = K.Gancho, F = K.Familia, Re = K.Receptor, Ll = K.Llave, Po = K.Poquito, Pr = K.Pregunta, Sc = K.Schlatter, Lo = K.Londres, Es = K.Estudio, Li = K.Limite, Am = K.Amargo, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.12); m.gota(G + 0.55, 0.3, 700);                                  // el granito cae al café
for (let i = 0; i < 26; i++) m.tic(G + 1.0 + i * 0.12, 0.06, 2600 + (i % 4) * 300);  // lluvia de 600 granitos
m.golpe(G + 1.6, 0.25, 90);                                                           // ¿azúcar? tachado
[0, 0.5, 1.0].forEach((d, i) => m.nota(F + 0.2 + d, [76, 69, 72][i], 0.06, 0.6));    // las tres barras
m.whoosh(Re + 0.2, 1.8, 0.1); m.nota(Re + 1.6, 52, 0.05, 1.2);                        // zoom a la célula
m.tic(Ll + 0.9, 0.25, 1600); m.nota(Ll + 1.6, 79, 0.06, 0.5);                         // clic + "dulce"
m.tic(Ll + 2.6, 0.25, 1600); m.nota(Ll + 3.3, 79, 0.06, 0.5);
for (let i = 0; i < 10; i++) m.tic(Po + 0.4 + i * 0.12, 0.05, 3000);                 // cucharadas
m.tic(Po + 1.9, 0.08, 4200); m.sube(Po + 2.4, 1.4, 60, 72, 0.04);                     // la pizca y el dulzor
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
m.golpe(Sc + 0.2, 0.35, 80); m.tic(Sc + 2.8, 0.1, 2000); m.whoosh(Sc + 3.6, 0.8, 0.1); m.nota(Sc + 4.7, 84, 0.07, 0.8);
m.golpe(Lo + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) m.metal(Lo + 1.6 + i * 0.2, 0.08, 1300);                  // ring
m.whoosh(Lo + 3.0, 0.6, 0.1); m.nota(Lo + 4.1, 81, 0.06, 0.6);
m.golpe(Es + 0.6, 0.3, 90); m.golpe(Es + 1.2, 0.35, 80);
for (let i = 0; i < 4; i++) m.tic(Es + 3.6 + i * 0.25, 0.15, 900);                    // escalones
m.golpe(Es + 4.9, 0.45, 70);                                                          // sello 2B
m.golpe(Li + 0.2, 0.35, 80);
for (let i = 0; i < 9; i++) m.metal(Li + 1.8 + i * 0.33 + 0.3, 0.07, 900);            // latas
m.nota(Li + 5.0, 57, 0.06, 0.8);
m.tic(Am + 0.9, 0.25, 1600); m.nota(Am + 1.0, 79, 0.05, 0.4);
m.nota(Am + 1.5, 61, 0.06, 0.5); m.nota(Am + 1.8, 62, 0.06, 0.6);                     // nota disonante: amargo
m.gota(Ci + 0.2, 0.2, 700); m.tic(Ci + 1.3, 0.2, 1600);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
