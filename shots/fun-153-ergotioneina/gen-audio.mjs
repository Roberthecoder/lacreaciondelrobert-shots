// gen-audio.mjs — cama musical + efectos del Shot Fungi Mati #153 (Ergotioneína). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama de "descubrimiento" a ~100 BPM, en la menor, debajo de la voz.
// Progresión con función que cambia cada 2 compases (i–VI–III–VII, luego iv–i–VI–V), un motivo de 4 notas que responde
// y se transpone (nunca el mismo patrón más de 4 compases), arco: misterio → se abre en la puerta (2005) → tensión
// en los ratones → luminoso en el porcini → resolución en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ergotioneina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 153);
const K = m.K;
const G = K.Gancho, N = K.Nombre, NF = K.NoFabrica, S = K.Suelo, Co = K.Comida, M = K.Membrana, P = K.Pregunta, E5 = K.Estudio2005,
  C1 = K.CienVeces, R = K.Ratones2010, Te = K.Tejidos, Po = K.Porcini, A = K.Ames, C = K.Cierre, Ou = K.Outro;

// ---- armonía: acordes (MIDI) por tramos; cada acorde dura 2 compases (4.8 s a 100 BPM) ----
const BAR = 2.4;
const PROG = {
  misterio: [[45, 52, 60], [41, 48, 57], [48, 55, 64], [43, 50, 59]],          // Am · F · C · G
  puerta:   [[41, 48, 57, 64], [48, 55, 64, 67], [43, 50, 59, 62], [45, 52, 60, 64]], // F · C · G · Am (se abre)
  tension:  [[50, 57, 65], [45, 52, 60], [41, 48, 57], [40, 47, 56]],          // Dm · Am · F · E (dominante)
  luz:      [[48, 55, 64, 67], [43, 50, 59, 62], [41, 48, 57, 65], [48, 55, 64]], // C · G · F · C
};
const tramos = [[0, E5, 'misterio'], [E5, R, 'puerta'], [R, Po, 'tension'], [Po, Ou + 3.5, 'luz']];
for (const [a, b, k] of tramos) {
  let t = a, i = 0;
  while (t < b - 0.05) { const t1 = Math.min(b, t + BAR * 2); m.pad(t, t1 + 0.15, 0.042, PROG[k][i % 4], 0.1); t = t1; i++; }
}
// bajo suave en cada cambio de acorde (sin golpe marcado)
for (const [a, b, k] of tramos) for (let t = a, i = 0; t < b - 0.3; t += BAR * 2, i++) m.bajo(t, PROG[k][i % 4][0] - 12, 0.05, 1.6);

// ---- motivo de 4 notas (pregunta → respuesta → secuencia → cadencia), ligero, entre frases ----
const MOT = [[0, 3, 7, 5], [0, 3, 5, 2], [2, 5, 9, 7], [0, -2, 0, 0]];
const motivo = (t0, raiz, var_, g = 0.028) => MOT[var_ % 4].forEach((d, i) => m.nota(t0 + i * 0.3, raiz + d, g * (i === 3 ? 1.2 : 1), i === 3 ? 1.2 : 0.5));
motivo(G + 3.0, 69, 0); motivo(N + 1.6, 69, 1); motivo(S + 2.6, 72, 2); motivo(Co + 1.4, 69, 3);
motivo(E5 + 1.0, 72, 0, 0.034); motivo(C1 + 2.0, 74, 2, 0.032);           // la puerta: más arriba y brillante
motivo(R + 3.0, 69, 1, 0.024);                                              // ratones: más quieto
motivo(Po + 2.6, 76, 0, 0.032); motivo(A + 3.4, 72, 3, 0.026);              // porcini luminoso; Ames resuelve suave

// ---- efectos en el mismo cuadro que lo que pasa en pantalla ----
m.ruido && m.ruido(G, 2.0, 0.02);
m.whoosh(G + 0.05, 0.6, 0.08); m.golpe(G + 0.7, 0.18, 70);                  // la tortilla se dobla sobre el comal
for (let i = 0; i < 18; i++) m.tic(G + 0.1 + i * 0.09, 0.03, 3200 + (i % 5) * 400); // chisporroteo del comal
m.whoosh(G + 1.6, 0.7, 0.1);                                                  // zoom a la célula
for (let i = 0; i < 5; i++) m.nota(G + 2.6 + i * 0.32, 76 + (i % 2) * 3, 0.03, 0.3); // clic suave: entran por la puerta
m.sube(N + 0.1, 1.3, 57, 64, 0.03); m.metal(N + 0.6, 0.06, 1200);            // se arma la molécula; brilla el azufre
m.golpe(NF + 0.5, 0.25, 60); m.golpe(NF + 1.9, 0.25, 60);                    // dos tachones
m.sube(S, 1.2, 40, 47, 0.03);                                                 // crece la raíz
for (let i = 0; i < 8; i++) m.burbuja(S + 1.2 + i * 0.25, 0.06, 420 + i * 30); // bolitas que sube la raíz
m.nota(S + 1.0, 72, 0.04, 0.4); m.nota(S + 1.6, 76, 0.04, 0.4);             // ✓ hongos, ✓ bacterias
for (let i = 0; i < 6; i++) m.burbuja(Co + 0.4 + i * 0.18, 0.05, 520 + i * 25);
for (let i = 0; i < 9; i++) m.tic(M + 0.2 + i * 0.35, 0.12, 700 + (i % 3) * 90); // "tunc": rebotan en la membrana
m.sube(P + 0.1, 1.2, 52, 64, 0.04);                                           // re-gancho
m.golpe(E5 + 0.2, 0.3, 80); m.whoosh(E5 + 0.4, 0.7, 0.08); m.nota(E5 + 1.0, 81, 0.04, 1.6); // tarjeta 2005; aparece la puerta
for (let i = 0; i < 10; i++) m.nota(E5 + 1.2 + i * 0.35, 79 + (i % 3) * 2, 0.018, 0.2); // pasan por la puerta
m.zumbido(C1 + 0.3, 1.2, 0.04, 220); m.nota(C1 + 1.5, 84, 0.04, 0.8);        // el número sube a >100×
m.golpe(R + 0.2, 0.3, 80); m.tic(R + 1.0, 0.1, 5200); m.tic(R + 1.1, 0.08, 5600); // tarjeta 2010; chillido corto del ratón
m.sube(R + 1.4, 1.2, 60, 52, 0.03);                                           // se vacía la sangre
[1.5, 2.3, 2.9, 3.6].forEach((d, i) => m.nota(Te + d, 72 + [0, 4, 7, 12][i], 0.04, 0.7)); // "ding" de cada órgano
m.pop ? m.pop(Po, 0.2) : m.burbuja(Po, 0.12, 300); m.burbuja(Po + 0.3, 0.1, 360); // salen los hongos
m.sube(Po + 1.0, 1.2, 48, 60, 0.035);                                         // sube la barra
m.golpe(A + 0.2, 0.3, 80); m.cruje(A + 2.6, 0.25); m.golpe(A + 2.6, 0.45, 60); // tarjeta y sello PROPUESTA
for (let i = 0; i < 6; i++) m.nota(C + 0.4 + i * 0.4, 72 + [0, 3, 7, 5, 3, 0][i], 0.03, 0.5); // cierre: entran otra vez
m.nota(Ou + 0.3, 57, 0.07, 3.0); m.nota(Ou + 0.3, 64, 0.05, 3.0); m.nota(Ou + 0.3, 72, 0.045, 3.0); // acorde final que se queda
m.guardar(OUT, 1);
