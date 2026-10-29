// gen-audio.mjs — cama grave + efectos del Shot IA #22 (colapso del modelo: IA entrenada con textos de IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot IAComeIA base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 22);
const K = m.K;
const G = K.Gancho, F = K.Fotocopia, E = K.Estudio, Gn = K.Generaciones, L = K.Liebres, P = K.Pregunta, C = K.Colas, I = K.Internet, A = K.Acumular, Ci = K.Cierre, Ou = K.Outro;
const S1 = G + 0.655 * (F - G), S4 = E + 0.52 * (Gn - E), S9 = C + 0.56 * (I - C), S5b = Gn + 0.68 * (L - Gn);

// La cama se "fotocopia": cada tramo un poco más tapada hasta las liebres; en "acumular" recupera el brillo.
m.pad(0, F, 0.05, [45, 52, 57], 0.1);
m.pad(F, Gn, 0.05, [45, 52, 57], 0.3);
m.pad(Gn, P, 0.05, [45, 52, 57], 0.55);
m.pad(P, A, 0.05, [43, 50, 55], 0.75);
m.pad(A, Ou + 3.5, 0.05, [45, 52, 57], 0.05);
for (let i = 0; i < 40; i++) m.tic(G + 0.05 + i * 0.1, 0.05, 2200 + (i % 4) * 150);      // la hoja se escribe sola
for (let i = 0; i < 5; i++) m.burbuja(G + 0.3 + i * 0.55, 0.14, 380 + i * 60);           // brincan las liebres
m.whoosh(S1 - 0.2, 0.8, 0.14);                                                          // la cámara retrocede
m.whoosh(F, 0.5, 0.12);
for (let k = 0; k < 4; k++) { m.zumbido(F + 0.2 + k * 0.6, 0.45, 0.04, 140); m.tic(F + 0.6 + k * 0.6, 0.18, 1200); } // fotocopias
m.golpe(E + 0.2, 0.35, 80);
for (let k = 0; k < 4; k++) m.nota(S4 - 0.2 + k * 0.45, 64 - k * 3, 0.05, 0.4, k * 0.25); // robotitos en cadena (cada uno más apagado)
m.whoosh(Gn, 0.5, 0.12); m.tic(Gn + 0.2, 0.2, 1600);
m.gota(Gn + 1.4, 0.2, 700); m.gota(Gn + 2.4, 0.2, 520);                                 // los pines
m.tic(S5b, 0.2, 1600); for (let i = 0; i < 18; i++) m.tic(S5b + i * 0.1, 0.04, 2400);   // generación 5 se escribe
for (let i = 0; i < 5; i++) { m.burbuja(L + 0.2 + i * 0.55, 0.16, 420 + i * 70); m.nota(L + 0.25 + i * 0.55, m.ESC[4 + i], 0.04, 0.4); } // cinco liebres
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(C + 0.3, (S9 - C) - 0.3, 0.02, 160);
for (let g = 0; g < 9; g++) m.tic(C + 0.6 + (g / 9) * (S9 - 0.9 - C), 0.12, 1500 + g * 60); // contador de generaciones
m.sube(C + 0.8, S9 - C - 1.0, 64, 52, 0.035);                                           // las colas se encogen
for (let i = 0; i < 5; i++) m.golpe(S9 + 0.2 + i * 0.25, 0.14, 95);                     // errores heredados
m.whoosh(I, 0.5, 0.12);
for (let i = 0; i < 26; i++) m.tic(I + 0.4 + i * 0.1, 0.05, 1900 + (i % 5) * 110);      // hojitas que llenan internet
m.burbuja(I + 3.0, 0.16, 300);
m.whoosh(A, 0.5, 0.12);
for (let k = 0; k < 5; k++) m.golpe(A + 0.9 + k * 0.7, 0.18, 110 + k * 8);               // pilas
m.nota(A + 0.9 + 4 * 0.7 + 0.3, 57, 0.05, 0.6); m.nota(A + 0.9 + 4 * 0.7 + 0.5, 72, 0.06, 0.6); m.nota(A + 0.9 + 4 * 0.7 + 0.55, 76, 0.05, 0.6);
for (let i = 0; i < 5; i++) m.burbuja(Ci + 0.2 + i * 0.3, 0.1, 400 + i * 50);
m.zumbido(Ci + 1.0, 1.2, 0.03, 300);                                                    // el espejo
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
