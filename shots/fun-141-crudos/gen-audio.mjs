// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #141 (¿hongos crudos?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama cálida "de cocina de noche" en la menor, con armonía que cambia cada escena (nunca el mismo acorde más de ~4 s),
// bajo que camina por grados conjuntos y un motivo de 4 notas que regresa en otro registro al cierre. Se tensa en Montana y se abre al final.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Crudos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 141);
const K = m.K;
const G = K.Gancho, D = K.Depende, A = K.Agaritina, G3 = K.Grupo3, S = K.Sarten, P = K.Pregunta, Mo = K.Montana, E = K.Enfermos,
  Cr = K.Crudas, Cu = K.Cultivo, F = K.Francia, Sh = K.Shiitake, C = K.Cierre, Ou = K.Outro;

// armonía (acordes graves por escena, con conducción de voces: cada voz se mueve a la nota más cercana)
const ACORDES = [
  [G, D, [45, 52, 60], 0], [D, A, [41, 53, 60], 0], [A, G3, [43, 50, 59], 0.15], [G3, S, [40, 52, 59], 0.1],
  [S, P, [41, 53, 57], 0], [P, Mo, [38, 50, 57], 0.1], [Mo, E, [40, 52, 56], 0.25], [E, Cr, [45, 52, 57], 0.3],
  [Cr, Cu, [41, 53, 56], 0.3], [Cu, F, [40, 52, 56], 0.2], [F, Sh, [43, 50, 59], 0.1], [Sh, C, [41, 48, 57], 0],
  [C, Ou + 3.5, [45, 52, 60], 0],
];
ACORDES.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.4, 0.045, notas, tapa));
// bajo que camina (una nota suave al entrar cada escena)
ACORDES.forEach(([a, , notas], i) => m.nota(a + 0.05, notas[0] - 12 + 12, 0.035, 1.6, 0.6));
// motivo de 4 notas (la–do–mi–re), quieto, al inicio; regresa una octava arriba al cierre
const motivo = (t0, base, g) => [0, 3, 7, 5].forEach((d, i) => m.nota(t0 + i * 0.42, base + d, g, 1.1, 0.35));
motivo(G + 0.6, 57, 0.03); motivo(C + 1.2, 69, 0.035);

// efectos en el mismo cuadro que la imagen
m.whoosh(G, 0.5, 0.1); m.metal(G + 0.55, 0.18, 1200);                               // cae el tenedor y rebota
for (let i = 0; i < 5; i++) m.tic(G + 0.15 + i * 0.12 + 0.2, 0.06, 1500 + i * 120); // rebanadas en el plato
m.golpe(G + 1.9, 0.25, 90);                                                         // la morilla cae en la tabla
m.golpe(G + 3.2, 0.3, 70);                                                          // ≠
m.sube(D, 1.4, 45, 52, 0.03);                                                       // el champiñón abre
for (let i = 0; i < 5; i++) { m.nota(A + 0.6 + i * 0.18, 76 + (i % 2) * 3, 0.03, 0.4); m.burbuja(A + 0.5 + i * 0.18, 0.05, 700); } // esporas
[1.6, 1.9, 2.2, 2.5].forEach((d, i) => m.burbuja(A + d, 0.07, 420 + i * 60));        // se arma la molécula
m.golpe(G3 + 0.15, 0.3, 80);                                                        // tarjeta IARC
for (let i = 0; i < 4; i++) m.tic(G3 + 1.4 + i * 0.13, 0.12, 900);                  // cajones
m.whoosh(G3 + 2.4, 0.7, 0.06); m.golpe(G3 + 3.1, 0.35, 60); m.nota(G3 + 3.15, 64, 0.04, 0.8); // cae en el cajón 3
m.golpe(S + 0.2, 0.25, 80);
for (let k = 0; k < 26; k++) m.tic(S + 0.6 + k * 0.2 + (k % 3) * 0.04, 0.05, 3000 + (k % 5) * 400); // chisporroteo del aceite
m.sube(S + 3.1, 2.5, 60, 52, 0.025);                                                // baja el medidor
m.sube(P + 0.05, 1.2, 52, 64, 0.04); m.cruje(P + 0.9, 0.25);                       // re-gancho; se parte la morilla
m.golpe(Mo + 0.2, 0.3, 80); m.tic(Mo + 0.5, 0.15, 1100);                            // tarjeta y Montana
m.golpe(Mo + 1.7, 0.2, 110); m.golpe(Mo + 2.3, 0.2, 120);                           // sushis
for (let i = 0; i < 51; i++) m.tic(E + 0.25 + i * 0.03, 0.035, 1700);               // 51 personas
[0, 1, 2].forEach((i) => m.nota(E + 2.6 + i * 0.12, 62, 0.03, 0.3));              // 3 al hospital
m.nota(E + 3.4, 45, 0.04, 1.6);                                                     // 2 murieron (grave, sin drama)
m.golpe(Cr + 0.25, 0.3, 70);                                                        // círculo en las crudas
m.whoosh(Cu + 1.2, 0.8, 0.07); m.nota(Cu + 2.0, 59, 0.03, 0.8, 0.4);               // entra la lupa; sin respuesta
m.golpe(F + 0.2, 0.3, 80);
for (let i = 0; i < 40; i++) m.tic(F + 2.6 + i * 0.045, 0.03, 2000 + (i % 4) * 250); // cuenta 446 (puntos)
m.metal(Sh + 1.2, 0.08, 900); m.whoosh(Sh + 1.6, 1.4, 0.05);                       // chip #26; aparecen las rayas
m.whoosh(C + 0.6, 0.5, 0.06);
for (let k = 0; k < 12; k++) m.tic(C + 0.7 + k * 0.22, 0.04, 3200);               // la morilla en la sartén
m.golpe(C + 1.8, 0.35, 110); m.nota(C + 1.85, 76, 0.04, 0.6);                      // sello COCIDOS
m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.045, 2.8); m.nota(Ou + 0.3, 72, 0.03, 2.8);
m.guardar(OUT, 1);
