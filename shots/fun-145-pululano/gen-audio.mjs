// gen-audio.mjs — cama + tema + efectos del Shot Fungi Mati #145 (pululano). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): la menor, ~104 BPM (compás de 2.3 s). Cama «de vidrio» que cambia de acorde cada compás
// (i–VI–III–VII, luego iv–i–V…), conducción de voces a la nota más cercana; un tema de campanita con frases
// motivo → respuesta → secuencia → cadencia. Se ahoga en el microscopio (el hongo por dentro), se abre a Do mayor con la
// película transparente y resuelve en La mayor en el cierre. Nunca el mismo compás más de 2 veces seguidas. Todo debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pululano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 145);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Ca = K.Casa, Mi = K.Micro, B = K.Baba, Mo = K.Molecula, P = K.Pregunta, Pe = K.Pelicula,
  O = K.Oxigeno, E = K.Estudio, Ti = K.Tiras, Pr = K.Precio, Pa = K.Panza, C = K.Cierre, Ou = K.Outro;
const FIN = Ou + 3.5, BAR = 2.3;

// --- cama: un acorde por compás. Am, F, C, G | Dm, Am, E, Am | F, G, Em, Am | Dm, F, G, E (16 compases, sin repetir 4 iguales)
const MENOR = [[45, 52, 57, 60], [41, 53, 57, 60], [48, 52, 55, 60], [43, 50, 55, 59], [38, 50, 53, 57], [45, 52, 57, 60], [40, 52, 56, 59], [45, 52, 57, 60],
  [41, 53, 57, 60], [43, 50, 55, 59], [40, 52, 55, 59], [45, 52, 57, 60], [38, 50, 53, 57], [41, 53, 57, 60], [43, 50, 55, 59], [40, 52, 56, 59]];
// desde la película: Do mayor luminoso (C, G, Am, F | C, Em, F, G)
const MAYOR = [[48, 52, 55, 60], [43, 50, 55, 59], [45, 52, 57, 60], [41, 53, 57, 60], [48, 52, 55, 64], [40, 52, 55, 59], [41, 53, 57, 60], [43, 50, 55, 62]];
const nBar = Math.ceil(FIN / BAR);
for (let b = 0; b < nBar; b++) {
  const t0 = b * BAR;
  let ac = t0 >= Pe - 0.2 ? MAYOR[b % MAYOR.length] : MENOR[b % MENOR.length];
  if (t0 >= Pr - 0.3 && t0 < Pa) ac = [40, 52, 56, 59];                    // «el problema»: Mi (dominante, tensión)
  if (t0 >= C - 0.2) ac = (b % 2) ? [45, 52, 57, 61] : [41, 53, 57, 60];   // cierre: Fa – La mayor (picardía)
  const tapa = t0 >= Mi - 0.3 && t0 < P ? 0.4 : 0;                          // más oscura y cerrada en el microscopio
  m.pad(t0, Math.min(FIN, t0 + BAR + 0.3), 0.04, ac, tapa);
}
// bajo pulsado suave en los tiempos 1 y 3 solo en el estudio (Japón / Europa): da camino, sin golpe marcado
for (let t = E; t < Ti + 0.2; t += BAR / 2) m.bajo(t, (Math.floor((t - E) / BAR) % 2) ? 36 : 43, 0.05, 0.9);

// --- tema «campanita de vidrio». Frases de 4 compases: motivo → respuesta → secuencia → cadencia.
const q = BAR / 4;
const frase = (t0, notas, g = 0.032) => notas.forEach(([pos, mm, dur]) => m.nota(t0 + pos * q, mm, g, dur * q * 1.6));
const MOTIVO = [[0, 69, 1], [1, 72, 0.5], [1.5, 76, 1.5], [3, 74, 1]];        // la – do – mi – re
const RESPUESTA = [[0, 72, 1], [1, 71, 0.5], [1.5, 69, 0.5], [2, 67, 2]];      // do – si – la – sol
const SECUENCIA = [[0, 71, 1], [1, 74, 0.5], [1.5, 77, 1.5], [3, 76, 1]];      // el motivo un tono arriba
const CADENCIA = [[0, 74, 1], [1, 72, 1], [2, 71, 0.5], [2.5, 69, 1.5]];       // cae a la
frase(G + 0.15, MOTIVO, 0.03); frase(G + 0.15 + BAR, RESPUESTA, 0.028);
frase(Ca + 0.1, SECUENCIA, 0.026); frase(Ca + 0.1 + BAR, CADENCIA, 0.026);
frase(Mo + 0.3, [[0, 64, 1], [1, 67, 1], [2, 69, 1], [3, 72, 1]], 0.024);      // la escalera: línea que sube por escalones
m.nota(P + 0.15, 69, 0.04, 0.7); m.nota(P + 0.5, 72, 0.04, 0.7); m.nota(P + 0.85, 76, 0.045, 1.2); // pregunta: motivo sin resolver
frase(Pe + 0.2, [[0, 72, 1], [1, 76, 0.5], [1.5, 79, 1.5], [3, 77, 1]], 0.03); // película: el motivo en MAYOR
frase(Pe + 0.2 + BAR, [[0, 76, 1], [1, 74, 0.5], [1.5, 72, 0.5], [2, 71, 2]], 0.028);
frase(Ti + 0.2, [[0, 79, 0.5], [0.5, 76, 0.5], [1, 72, 1], [2, 74, 2]], 0.026); // tiras: brillito juguetón
frase(Pa + 0.2, [[0, 67, 1], [1, 69, 0.5], [1.5, 72, 1.5], [3, 71, 1]], 0.026); // panza
frase(C + 0.1, MOTIVO, 0.03);                                                    // cierre: el tema regresa…
m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.3, 73, 0.04, 2.8); m.nota(Ou + 0.3, 76, 0.04, 2.8); // …y resuelve en La mayor

// --- efectos en el mismo cuadro que la imagen
m.whoosh(G - 0.15, 0.5, 0.12); m.golpe(G + 0.4, 0.22, 160); m.tic(G + 0.42, 0.12, 1400); // la cápsula cae y aterriza (toc)
m.cruje(G + 1.2, 0.25);                                                           // se tacha «gelatina»
m.whoosh(G + 1.5, 0.5, 0.06);                                                     // entra la lupa
m.sube(H + 0.3, 2.8, 40, 47, 0.035);                                              // las colonias crecen y se oscurecen
[0.1, 0.8, 1.5].forEach((d, i) => m.tic(Ca + d, 0.14, 900 + i * 200));            // las 3 viñetas
for (let i = 0; i < 5; i++) m.gota(Mi + 0.9 + i * 0.25, 0.08, 1300 + i * 90);     // yemas que brotan
m.whoosh(Mi + 2.3, 1.6, 0.04);                                                    // crece el hilo
for (let i = 0; i < 10; i++) m.burbuja(B + 0.6 + i * 0.26, 0.05, 300 + (i % 4) * 50); // la baba sale de la célula
for (let k = 0; k < 9; k++) m.nota(Mo + 0.3 + k * 0.3, [64, 67, 71][k % 3] + Math.floor(k / 3) * 2, 0.022, 0.3); // cada glucosa que llega
[0, 1].forEach((k) => m.tic(Mo + 0.3 + (k + 1) * 0.9, 0.14, 2200));               // cada escalón (α-1,6)
for (let i = 0; i < 6; i++) m.tic(P + 0.1 + i * 0.25, 0.04, 2600);
for (let i = 0; i < 14; i++) m.tic(Pe + 0.1 + i * 0.05, 0.03, 4000 + (i % 5) * 300); // el polvo cae (arena)
m.whoosh(Pe + 0.8, 1.0, 0.06);                                                    // remolinos
m.whoosh(Pe + 1.7, 0.6, 0.08); m.gota(Pe + 2.1, 0.12, 500);                       // se vierte
m.whoosh(Pe + 2.4, 1.0, 0.035);                                                   // vapor
m.cruje(Pe + 3.4, 0.3);                                                           // la película se despega
for (let i = 0; i < 12; i++) m.tic(O + 0.4 + i * 0.24 + m.rnd() * 0.05, 0.05, 2800 + m.rnd() * 1500); // O₂ que rebota
m.golpe(E + 0.25, 0.25, 90); m.golpe(E + 2.85, 0.25, 90);                         // tarjetas
m.golpe(E + 4.3, 0.3, 110); m.metal(E + 4.32, 0.06, 1500);                        // sello ✓
m.whoosh(Ti + 0.4, 0.8, 0.07);                                                    // la tira cae
for (let i = 0; i < 9; i++) m.nota(Ti + 2.0 + i * 0.14, 84 + (i % 4) * 2, 0.014, 0.25); // se deshace en brillitos
m.metal(Pr + 0.4, 0.12, 900);                                                     // etiqueta de precio
for (let i = 0; i < 6; i++) m.gota(Pr + 2.2 + i * 0.4, 0.1, 700 + (i % 2) * 150); // filtro: gotas
m.sube(Pa + 1.2, 1.0, 43, 55, 0.05); m.whoosh(Pa + 3.0, 0.6, 0.08);               // la panza se infla y se desinfla
m.tic(Pa + 0.3, 0.12, 1800);                                                      // báscula
m.whoosh(C, 0.5, 0.06); m.golpe(C + 0.05, 0.15, 160);                             // regreso a la palma
for (let i = 0; i < 4; i++) m.nota(C + 0.5 + i * 0.18, 81 + i * 2, 0.016, 0.3);   // aparece la escalera en la pared
m.guardar(OUT, 1);
