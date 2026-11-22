// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #143 (¿por qué salen hongos después de la lluvia?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua (sin golpe) en re menor, húmeda y cálida, con progresión con función que cambia en cada escena
// (Dm–B♭–F–C → Gm–A → Dm–F–C → B♭–F–D mayor) y conducción de voces; un tema propio de 4 notas (motivo → respuesta →
// secuencia → cadencia) que pregunta en «¿por qué aparece de golpe?» y se resuelve en re MAYOR en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lluvia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 143);
const K = m.K;
const G = K.Gancho, Sp = K.Especie, F = K.Fruto, Mi = K.Micelio, P = K.Pregunta, B = K.Boton, I = K.Inflar, A = K.Agua,
  E = K.Estudio, Es = K.Estiron, Al = K.Alimento, Ti = K.Tinta, C = K.Cierre, Ou = K.Outro;

// cama: acordes graves encadenados (cada voz va a la nota más cercana); "tapada" mientras el suelo esconde el hongo
const ACORDES = [[G, [38, 50, 53, 57]], [Sp, [34, 50, 53, 58]], [F, [41, 48, 53, 57]], [Mi, [36, 48, 52, 55]], [P, [43, 50, 55, 58]], [B, [45, 49, 52, 57]],
  [I, [38, 50, 53, 57]], [A, [41, 48, 53, 57]], [E, [36, 48, 52, 55]], [Es, [34, 50, 53, 58]], [Al, [41, 48, 53, 60]], [Ti, [45, 49, 52, 57]],
  [C, [38, 50, 54, 57]], [Ou, [38, 50, 54, 57]]];
ACORDES.forEach(([t, ch], i) => { const t1 = i + 1 < ACORDES.length ? ACORDES[i + 1][0] + 0.25 : Ou + 3.5;
  m.pad(Math.max(0, t - 0.25), t1, 0.045, ch, (i >= 2 && i <= 5) || i === 10 ? 0.35 : 0); });
// bajo que respira en las raíces de cada acorde (sin golpe: notas largas y suaves)
ACORDES.forEach(([t, ch]) => m.bajo(t + 0.05, ch[0], 0.05, 1.6));
// tema de 4 notas: motivo (gancho) · respuesta (micelio) · secuencia que pregunta (re-gancho) · cadencia en mayor (cierre)
const TEMA = [[62, 65, 64, 62], [65, 67, 69, 67], [69, 70, 72, 69], [69, 66, 64, 62]];
[[G + 0.6, 0], [Mi + 0.6, 1], [P + 0.1, 2], [C + 0.5, 3]].forEach(([t, k]) => TEMA[k].forEach((n, j) => m.nota(t + j * 0.32, n, 0.035, 0.8)));
// respuesta del tema en otro registro: el estudio y el hongo tinta
[E + 0.4, Ti + 0.4].forEach((t, i) => TEMA[1].forEach((n, j) => m.nota(t + j * 0.3, n - 12 + i * 5, 0.03, 0.7)));

// efectos, cada uno en el cuadro de su evento
for (let i = 0; i < 26; i++) m.gota(G + 0.05 + i * 0.13 + (i % 3) * 0.03, 0.06, 1100 + (i % 5) * 160);   // lluvia
m.sube(G + 0.4, 2.0, 57, 69, 0.03);                                                                   // anoche → hoy (la luna se vuelve sol)
m.cruje(G + 1.4, 0.25); m.golpe(G + 1.4, 0.25, 70);                                                    // se tacha «¿nació anoche?»
m.tic(Sp + 0.3, 0.15, 1400); m.tic(Sp + 0.7, 0.15, 1600); m.tic(Sp + 1.2, 0.1, 1800); m.tic(Sp + 1.6, 0.1, 1800); // etiquetas
m.whoosh(F - 0.2, 0.9, 0.1); m.cruje(F + 0.2, 0.2);                                                    // la cámara baja al suelo
m.tic(F + 0.6, 0.15, 1300);                                                                           // chip «esto es el fruto»
for (let i = 0; i < 6; i++) m.tic(Mi + 0.9 + i * 0.72, 0.12, 900 + i * 60);                           // pasan los meses (calendario)
m.sube(Mi + 0.3, 4.0, 45, 52, 0.02);                                                                  // la red de micelio crece
m.sube(P + 0.05, 1.6, 52, 64, 0.04);                                                                  // re-gancho
m.pop ? m.pop(B + 0.4, 0.15) : m.burbuja(B + 0.4, 0.12, 300);                                          // aparece el botón
for (let i = 0; i < 4; i++) m.burbuja(B + 1.0 + i * 0.5, 0.06, 260 + i * 40);                          // el botón crece
m.whoosh(I - 0.2, 0.7, 0.08);                                                                          // entramos AL MICROSCOPIO
for (let i = 0; i < 16; i++) m.burbuja(I + 0.6 + i * 0.22, 0.07, 380 + (i % 6) * 60);                  // agua que entra a las células
m.sube(I + 0.6, 3.2, 50, 57, 0.03);                                                                   // las células se estiran
m.sube(A + 0.3, 1.7, 48, 60, 0.04); for (let i = 0; i < 8; i++) m.gota(A + 0.3 + i * 0.2, 0.06, 600 + i * 70); // se llena la barra de agua
m.golpe(E + 0.2, 0.3, 80);                                                                             // tarjeta 1977
for (let i = 0; i < 6; i++) m.tic(E + 1.6 + i * 0.25, 0.18, 2200);                                    // seis marcas en el pie
m.sube(E + 3.8, 6.0, 45, 57, 0.025);                                                                  // el pie se estira (puntitos que se separan)
m.tic(Es + 0.5, 0.15, 1300); m.tic(Es + 2.4, 0.15, 1500);                                             // chips
for (let i = 0; i < 6; i++) m.burbuja(Al + 0.2 + i * 0.45, 0.06, 420 + i * 30);                       // agua y alimento que suben
for (let i = 0; i < 40; i++) m.tic(Ti + 0.5 + i * 0.107, 0.05, 2600 + (i % 4) * 200);                 // cronómetro acelerado (5 h)
m.sube(Ti + 0.5, 4.3, 50, 62, 0.03); m.golpe(Ti + 4.8, 0.25, 90);                                    // estirón y "≈ 5 horas"
for (let i = 0; i < 14; i++) m.gota(C + 0.1 + i * 0.25, 0.05, 1100 + (i % 4) * 150);                  // vuelve la lluvia
m.sube(C + 0.4, 1.4, 50, 62, 0.03); m.tic(C + 1.6, 0.15, 1500);                                       // se ilumina el micelio · chip final
m.nota(Ou + 0.3, 62, 0.07, 2.8); m.nota(Ou + 0.3, 66, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);   // re mayor
m.guardar(OUT, 1);
