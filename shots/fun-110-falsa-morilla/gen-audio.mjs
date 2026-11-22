// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #110 (falsa morilla). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave continua debajo de la voz, sin golpe marcado, pero con armonía que avanza
// (la menor: i–VI–iv–V, un acorde por escena, conducción de voces por la nota más cercana), tensa en la toxina y la neurona,
// tapada en los mitos y abierta (la mayor) en el consejo final. Un motivo de 4 notas (la–do–si–mi) vuelve con otra altura
// en momentos clave (gancho, re-gancho, dato de Finlandia, cierre).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Falsa Morilla base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
const G = K.Gancho, Mo = K.Morilla, F = K.Falsa, Tx = K.Toxina, N = K.Neurona, S = K.Sintomas, H = K.Hervir, Fi = K.Finlandia, Fa = K.Familia, C = K.Cierre, Ou = K.Outro;

// cama: un acorde por escena (voces cercanas), con traslape de 0.4 s para que nunca haya hueco
const cama = [
  [G, Mo, [45, 52, 57, 60], 0.05],    // la menor
  [Mo, F, [45, 53, 57, 60], 0],       // fa (VI) — la morilla verdadera, más clara
  [F, Tx, [46, 50, 57, 62], 0.15],    // re menor (iv) con si bemol grave — la falsa
  [Tx, N, [44, 52, 56, 59], 0.1],     // mi mayor sobre sol# (V) — tensión química
  [N, S, [45, 51, 57, 60], 0.2],      // la con re# (tritono) — la neurona sin freno
  [S, H, [43, 50, 55, 59], 0.15],     // sol (VII) — síntomas
  [H, Fi, [41, 48, 57, 60], 0.35],    // fa — mito: sonido tapado
  [Fi, Fa, [40, 47, 55, 59], 0.1],    // mi menor (v) — el dato
  [Fa, C, [41, 48, 56, 60], 0.35],    // fa menor prestado — mito: tapado
  [C, Ou + 3.5, [45, 52, 57, 61], 0], // LA MAYOR — consejo y cierre: se abre
];
cama.forEach(([a, b, notas, tapa]) => m.pad(Math.max(0, a - 0.2), b + 0.2, 0.05, notas, tapa));
// bajo que respira cada ~2 s, muy suave (sin golpe): raíz del acorde
cama.forEach(([a, b, notas]) => { for (let t = a; t < b - 0.6; t += 2.1) m.nota(t, notas[0], 0.025, 1.9); });

// motivo (la–do–si–mi) y sus regresos
const motivo = (t, base, g = 0.045) => [0, 3, 2, -5].forEach((d, i) => m.nota(t + i * 0.32, base + d, g, 0.9));
motivo(G + 0.15, 69); motivo(H + 0.2, 72, 0.04); motivo(Fi + 3.6, 76, 0.035); motivo(C + 0.3, 69 + 4, 0.04);

// gancho: el hongo sale del suelo, sello NO, nave
m.sube(G, 0.6, 40, 52, 0.05); m.golpe(G + 1.0, 0.45, 70); m.cruje(G + 1.0, 0.2);
m.whoosh(G + 2.8, 1.4, 0.12); m.motor(G + 3.0, 2.6, 0.05);
// morilla: crece, se parte (corte)
m.sube(Mo, 0.6, 45, 57, 0.035); m.whoosh(Mo + 2.5, 0.5, 0.1); m.tic(Mo + 2.9, 0.25, 800); m.nota(Mo + 3.0, 72, 0.04, 0.8);
// falsa: crece, se parte; cámaras = tres tics huecos
m.sube(F, 0.6, 43, 50, 0.035); m.whoosh(F + 2.6, 0.5, 0.1);
[3.1, 3.25, 3.4].forEach((d, i) => m.burbuja(F + d, 0.07, 300 + i * 60));
// toxina: la molécula se parte, brilla la MMH, la nave echa bocanadas
m.cruje(Tx + 1.4, 0.25); m.sube(Tx + 1.6, 0.8, 57, 69, 0.04); m.nota(Tx + 2.3, 81, 0.04, 0.8);
m.whoosh(Tx + 3.4, 1.0, 0.1); for (let i = 0; i < 6; i++) m.whoosh(Tx + 4.0 + i * 0.45, 0.25, 0.05);
// neurona: 8 B6 se van (una nota que baja cada una), descargas
for (let i = 0; i < 8; i++) m.nota(N + 1.0 + i * 0.25, 76 - i, 0.035, 0.35);
for (let i = 0; i < 12; i++) m.tic(N + 3.5 + i * 0.18 + m.rnd() * 0.06, 0.12, 2600 + m.rnd() * 1500);
m.zumbido(N + 3.4, 2.4, 0.03, 160);
// síntomas: reloj, estómago revuelto, hígado
for (let i = 0; i < 10; i++) m.tic(S + 0.1 + i * 0.12, 0.08, 1500);
m.burbuja(S + 1.3, 0.1, 220); m.burbuja(S + 1.6, 0.1, 260); m.golpe(S + 2.4, 0.25, 55);
// hervir: burbujeo continuo, mito tachado, mareo
for (let i = 0; i < 24; i++) m.burbuja(H + 0.1 + i * 0.2, 0.05, 350 + (i % 5) * 70);
m.cruje(H + 1.5, 0.35); m.sube(H + 2.9, 0.8, 64, 58, 0.03);
// Finlandia: tarjeta, barras que bajan, número
m.golpe(Fi + 0.3, 0.3, 90); m.metal(Fi + 1.0, 0.08, 900);
m.sube(Fi + 2.8, 0.6, 52, 64, 0.035); m.sube(Fi + 3.6, 0.8, 64, 52, 0.035); m.nota(Fi + 4.4, 76, 0.04, 0.6);
// familia: mito tachado, platos (uno por año), el último en rojo
m.cruje(Fa + 1.9, 0.35);
for (let i = 0; i < 6; i++) m.nota(Fa + 2.6 + i * 0.35, 69 + [0, 2, 4, 5, 7, 9][i], 0.035, 0.4);
m.golpe(Fa + 4.6, 0.4, 60); m.nota(Fa + 4.65, 63, 0.04, 1.2);
// cierre: chips y acorde final
[0.5, 1.6, 3.0].forEach((d) => m.tic(C + d, 0.15, 1300));
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 61, 0.05, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8);
m.guardar(OUT, 1);
