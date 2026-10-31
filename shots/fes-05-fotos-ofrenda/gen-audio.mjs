// gen-audio.mjs — cama grave + efectos del Shot IA #01 · Especial Día de Muertos (fotos restauradas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot FotosOfrenda base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K, E = m.ESC;
const G = K.Gancho, Pi = K.Pierde, Ad = K.Adivina, Ap = K.Aprendio, Co = K.Color, P = K.Pregunta, Es = K.Estudio, Ob = K.Obama, Se = K.Sesgo, Da = K.Danada, Or = K.Original, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.6, 0.05, [45, 52, 57]);
m.whoosh(G, 0.6, 0.2); m.golpe(G + 0.6, 0.35, 80);                               // la foto cae en la ofrenda
m.zumbido(G + 0.1, 2.3, 0.03, 220);                                              // escaneo
m.sube(G + 2.4, 0.6, 57, 69, 0.05); m.nota(G + 3.0, 69, 0.07, 0.8);              // se marca lo inventado
for (let i = 0; i < 4; i++) m.cruje(Pi + 0.6 + i * 0.6, 0.25);                   // rayones, manchas, polvo, grano
m.metal(Pi + 2.8, 0.1, 500);                                                     // aparece el hueco
m.pad(Ad, Ap, 0.025, [40, 47], 0.6);
m.zumbido(Ad + 0.1, 2.4, 0.04, 160);                                             // escaneo del hueco
m.nota(Ad + 0.7, 64, 0.05, 0.6); m.nota(Ad + 1.2, 63, 0.05, 0.6);
for (let i = 0; i < 8; i++) m.tic(Ad + 2.6 + i * 0.17, 0.06, 2200 + i * 120);     // la IA rellena pieza por pieza
m.nota(Ad + 4.0, 69, 0.06, 0.8);
for (let i = 0; i < 18; i++) m.tic(Ap - 0.2 + i * 0.17 + 1.0, 0.05, 1600 + (i % 6) * 200); // fotos entran a la red
m.sube(Ap + 0.6, 1.8, 52, 72, 0.03); m.nota(Ap + 2.3, 72, 0.06, 0.8);
for (let i = 0; i < 3; i++) m.nota(Co + 1.2 + i * 0.6, E[4 + i * 2], 0.06, 0.5);  // la IA prueba colores
m.sube(Co + 3.0, 0.6, 60, 72, 0.04);
m.sube(P + 0.1, 1.2, 52, 64, 0.05);
m.golpe(Es + 2.3, 0.35, 80);                                                     // tarjeta del estudio
for (let i = 0; i < 8; i++) m.tic(Es + 3.4 + i * 0.05, 0.05, 900);               // aparece el pixeleado
m.whoosh(Es + 4.0, 0.6, 0.12); m.nota(Es + 4.8, 76, 0.06, 1.0); m.nota(Es + 4.8, 81, 0.04, 1.0); // cara inventada
for (let i = 0; i < 8; i++) m.tic(Ob + 0.1 + i * 0.05, 0.05, 900);
m.whoosh(Ob + 1.6, 0.6, 0.12); m.golpe(Ob + 2.3, 0.4, 60); m.nota(Ob + 2.4, 58, 0.06, 1.2, 0.6); // el error
for (let i = 0; i < 12; i++) m.burbuja(Se + 0.6 + i * 0.22, 0.08, 500 + (i % 4) * 80);   // caras que salen
for (let i = 0; i < 4; i++) m.burbuja(Da + 0.4 + i * 0.35, 0.08, 420 + i * 60);
m.whoosh(Da + 2.0, 0.7, 0.12); m.golpe(Da + 2.6, 0.3, 90);                       // todas dan la misma foto
m.whoosh(Or, 0.6, 0.14); m.whoosh(Or + 0.2, 0.6, 0.1); m.nota(Or + 1.8, 69, 0.06, 0.8);
m.whoosh(C + 0.1, 0.5, 0.1); m.sube(C + 1.0, 0.8, 57, 69, 0.05);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
