// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #37 (guardar archivos en ADN). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: una nota por letra (A, C, G, T = 4 notas fijas) cada vez que un par de bits se vuelve letra,
// un clic por cada letra que pega el sintetizador y un tictac que se acelera con las 21 horas de HELLO.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot AdnDisco base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 37);
const K = m.K;
const G = K.Gancho, Bi = K.Bits, Le = K.Letras, Si = K.Sintesis, Se = K.Seco, Lc = K.Lectura, Pr = K.Pregunta, Ma = K.Mamut,
  So = K.Sonetos, Fo = K.Fountain, Ca = K.Caballo, Pb = K.Problema, Ci = K.Cierre, Ou = K.Outro;
const NOTA = { A: 57, C: 60, G: 64, T: 67 };              // una nota fija por letra
const L4 = ['A', 'C', 'G', 'T'];

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// gancho: el tubito cae en la balanza y se apilan los celulares
m.whoosh(G, 0.5, 0.12); m.golpe(G + 0.48, 0.35, 90); m.tic(G + 0.55, 0.12, 2600);
for (let i = 0; i < 18; i++) m.tic(G + 0.2 + i * 0.16, 0.06, 1800 + (i % 6) * 120);
// bits: la foto se vuelve ceros y unos; aparecen las cuatro letras
for (let i = 0; i < 14; i++) m.tic(Bi + 0.6 + i * 0.1, 0.035, 3200);
L4.forEach((l, i) => m.nota(Bi + 2.3 + i * 0.35, NOTA[l], 0.08, 0.7));
// letras: cada par de bits que se vuelve letra suena con la nota de su letra
for (let i = 0; i < 36; i++) m.nota(Le + 0.5 + i * 0.1 + (i % 6) * 0.02, NOTA[L4[(i * 7 + 3) % 4]] + 12, 0.035, 0.3);
// síntesis: un clic por ciclo (cada ciclo pega una letra a todas las hebras) y su gota
for (let k = 0; k < 18; k++) { m.tic(Si + 0.2 + k * 0.17, 0.07, 2200); m.gota(Si + 0.27 + k * 0.17, 0.05, 1100); }
// seco: se evapora
m.whoosh(Se + 0.2, 1.8, 0.07); m.nota(Se + 2.0, 69, 0.05, 0.8);
// lectura: se agrega agua, el secuenciador pita letra por letra y vuelve la foto
m.burbuja(Lc + 0.15, 0.12, 500); m.burbuja(Lc + 0.35, 0.1, 650);
for (let i = 0; i < 16; i++) m.tic(Lc + 0.9 + i * 0.22, 0.04, 2800 + (i % 4) * 300);
m.sube(Lc + 1.6, 2.2, 57, 69, 0.04);
// re-gancho
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
// mamut: hielo que cruje y la lupa que se abre
m.cruje(Ma + 0.1, 0.5); m.whoosh(Ma + 0.9, 0.6, 0.12);
// 2013: tarjeta y las letras que salen del libro y del audio
m.golpe(So + 0.2, 0.3, 80);
for (let i = 0; i < 14; i++) m.nota(So + 3.6 + i * 0.16, NOTA[L4[i % 4]] + 12, 0.035, 0.35);
// 2017: tarjeta, proyector y "0 errores"
m.golpe(Fo + 0.15, 0.3, 80); m.motor(Fo + 0.1, Ca - Fo, 0.05);
m.nota(Fo + 2.9, 69, 0.07, 1.0); m.nota(Fo + 3.0, 76, 0.06, 1.0);
// caballo: cada cuadro entra a una bacteria; las bacterias se dividen
for (let f = 0; f < 5; f++) { m.whoosh(Ca + 1.2 + f * 0.35, 0.4, 0.05); m.burbuja(Ca + 1.7 + f * 0.35, 0.09, 700); }
m.burbuja(Ca + 3.4, 0.12, 400); m.burbuja(Ca + 3.6, 0.12, 450); m.burbuja(Ca + 3.8, 0.12, 500);
// problema: tictac que se acelera (21 horas) y HELLO letra por letra
for (let t = Pb + 0.4, d = 0.42; t < Ci - 0.3; t += d, d = Math.max(0.08, d * 0.9)) m.tic(t, 0.06, 1500);
for (let i = 0; i < 5; i++) m.golpe(Pb + 0.7 + i * 0.6, 0.18, 120);
// cierre: el tubito brilla con el archivo adentro
m.tic(Ci + 0.2, 0.1, 2600); m.nota(Ci + 0.8, 64, 0.06, 1.4); m.nota(Ci + 1.0, 69, 0.05, 1.4);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
