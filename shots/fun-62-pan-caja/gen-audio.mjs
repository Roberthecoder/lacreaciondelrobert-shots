// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #62 (Pan de caja). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Forma: cocina cálida (re mayor) → por dentro de la hifa (re menor, oscuro) → re-gancho que se abre → estudio (fa mayor)
// → queso e intestino (sol) → regreso al tema de la cocina, completo, en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pan Caja base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 62);
const K = m.K;
const G = K.Gancho, H = K.Horno, Mo = K.Mohos, E = K.Etiqueta, En = K.Entra, P = K.Proton, Ea = K.Energia, Q = K.Pregunta,
  Es = K.Estudio, MM = K.MasaMadre, Qu = K.Queso, S = K.Seguro, C = K.Cierre, Ou = K.Outro;

// cama: acordes que cambian con la historia (cada uno con su color; nunca el mismo más de una escena seguida)
m.pad(0, H, 0.05, [50, 57, 62, 66], 0.1);        // D: la cocina
m.pad(H, Mo, 0.05, [47, 55, 59, 62], 0.15);       // G/B
m.pad(Mo, E, 0.05, [45, 52, 57, 61], 0.2);        // A: los mohos
m.pad(E, En, 0.05, [43, 50, 55, 59], 0.15);       // G: la etiqueta
m.pad(En, P, 0.05, [38, 45, 50, 53], 0.45);       // Dm grave: dentro de la hifa
m.pad(P, Ea, 0.05, [38, 46, 50, 53], 0.5);        // Bb/D: se acidifica
m.pad(Ea, Q, 0.05, [36, 45, 48, 52], 0.55);       // Am/C: se traba
m.pad(Q, Es, 0.05, [41, 48, 53, 57], 0.1);        // F: se abre «solo lo frena»
m.pad(Es, MM, 0.05, [41, 48, 53, 57, 60], 0.05);  // F add9: el estudio
m.pad(MM, Qu, 0.05, [43, 50, 55, 58], 0.05);      // Gm
m.pad(Qu, S, 0.05, [43, 50, 55, 59, 62], 0.1);    // G: queso e intestino
m.pad(S, C, 0.05, [45, 52, 57, 61], 0.1);         // A: sellos
m.pad(C, Ou + 3.5, 0.05, [50, 57, 62, 66, 69], 0); // D: regreso a la cocina

// tema propio (4 notas: re–fa#–la–sol) y sus variaciones
const tema = (t, base, g = 0.05, paso = 0.32) => [0, 4, 7, 5].forEach((iv, i) => m.nota(t + i * paso, base + iv, g, 0.9));
tema(G + 0.9, 74); tema(Qu + 0.4, 79, 0.04, 0.28); tema(C + 0.5, 74, 0.06, 0.4); m.nota(C + 2.3, 74, 0.06, 1.6);

// 1 · gancho: dos "toc" de las rebanadas y el escudo
m.golpe(G + 0.32, 0.4, 120); m.golpe(G + 0.47, 0.35, 140); m.nota(G + 1.3, 81, 0.06, 0.7);
// 2 · horno: chispa, esporas que se apagan, rebanadora y esporas que caen
m.zumbido(H, 1.6, 0.05, 110); [0.4, 0.55, 0.7, 0.85].forEach((d) => m.cruje(H + d, 0.15));
for (let i = 0; i < 9; i++) m.tic(H + 1.8 + i * 0.15, 0.08, 2600 + i * 120);
for (let i = 0; i < 8; i++) m.whoosh(H + 2.3 + i * 0.22, 0.18, 0.05);
// 3 · mohos: cada uno crece con su nota; la mancha crece con un crujido suave
m.sube(Mo + 0.1, 1.0, 62, 69, 0.03); m.sube(Mo + 0.6, 1.0, 64, 71, 0.03); m.sube(Mo + 1.1, 1.0, 57, 64, 0.03);
m.cruje(Mo + 2.2, 0.25);
// 4 · etiqueta: lupa y subrayado
m.whoosh(E + 0.1, 0.6, 0.1); m.nota(E + 0.7, 79, 0.06, 0.5); m.nota(E + 1.0, 83, 0.05, 0.6);
// 5 · entran (whoosh) o rebotan (clic)
[[0, 1], [1, 0], [2, 1], [3, 1], [4, 0], [5, 1]].forEach(([i, n]) => { const t0 = En + 0.4 + i * 0.35; if (n) m.whoosh(t0 + 0.6, 0.6, 0.06); else m.tic(t0 + 0.7, 0.2, 1500); });
// 6 · protones: "plop" por cada uno
[0, 2, 3, 5].forEach((i) => m.burbuja(P + 0.3 + i * 0.12, 0.12, 380 + i * 40)); m.sube(P + 0.8, 2.2, 50, 46, 0.03);
// 7 · bomba, pila que se vacía, engranes que se traban
for (let i = 0; i < 6; i++) m.burbuja(Ea + 0.3 + i * 0.25, 0.08, 300);
m.motor(Ea + 0.2, 2.2, 0.05); m.metal(Ea + 2.4, 0.2, 520); m.golpe(Ea + 2.45, 0.3, 70);
// 8 · re-gancho: sello NO y se abre
m.sube(Q + 0.1, 1.0, 52, 60, 0.04); m.golpe(Q + 1.3, 0.45, 70); m.nota(Q + 1.6, 77, 0.06, 1.2); m.nota(Q + 1.6, 81, 0.05, 1.2);
// 9–10 · estudio: tarjeta y los días que avanzan (un tic por día)
m.golpe(Es + 0.2, 0.3, 90);
for (let d = 0; d < 12; d++) m.tic(Es + 3.4 + d * (2 / 12), 0.08, 1800 + d * 60);
for (let d = 0; d < 14; d++) m.tic(MM + 0.2 + d * (1.8 / 14), 0.07, 2200 + d * 50);
m.nota(MM + 2.1, 81, 0.05, 0.8);
// 11 · queso (burbujas de CO2) e intestino
for (let i = 0; i < 8; i++) m.burbuja(Qu + 0.4 + i * 0.25, 0.1, 450 + (i % 4) * 70);
m.sube(Qu + 2.0, 1.2, 55, 62, 0.03);
// 12 · sellos FDA y EFSA
m.golpe(S + 0.4, 0.4, 80); m.nota(S + 0.5, 74, 0.05, 0.8); m.golpe(S + 2.4, 0.4, 95); m.nota(S + 2.5, 78, 0.05, 0.8);
// 13 · cierre: la mancha que crece en una, el escudo que aguanta en la otra
m.cruje(C + 0.3, 0.2);
m.nota(Ou + 0.3, 62, 0.08, 2.8); m.nota(Ou + 0.3, 66, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
