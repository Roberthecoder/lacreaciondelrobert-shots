// gen-audio.mjs — cama + motivo + efectos del Shot Fungi Mati #149 (yesca de Ötzi). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): re dórico, ~100 BPM (compás de 2.4 s). Cama cálida que cambia de acorde cada compás
// (i–IV–VII–i, luego vi–IV, sube a mayor en Corund) y un tema de 4 notas «de madera» con frases motivo → respuesta →
// secuencia → cadencia; nunca el mismo compás más de 2 veces seguidas. Todo suave, debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Yesca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 149);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Ca = K.Capas, Mi = K.Micro, Ch = K.Chispa, P = K.Pregunta, O = K.Otzi, Pi = K.Pirita, A = K.Abedul, S = K.Sangre, Co = K.Corund, C = K.Cierre, Ou = K.Outro;
const FIN = Ou + 3.5, BAR = 2.4;

// --- cama: un acorde por compás (re dórico: Dm, G, C, Dm / Bb, F, C, Dm …), voces que se mueven a la nota más cercana
const ACORDES = [[38, 50, 53, 57], [43, 50, 55, 59], [36, 48, 52, 55], [38, 50, 53, 57], [34, 50, 53, 58], [41, 48, 53, 57], [36, 48, 52, 55], [38, 50, 53, 57],
  [38, 50, 53, 57], [43, 50, 55, 59], [34, 50, 53, 58], [36, 48, 52, 55], [41, 48, 53, 57], [43, 50, 55, 59], [38, 50, 53, 57], [38, 50, 54, 57]]; // último: Re mayor
const nBar = Math.ceil(FIN / BAR);
for (let b = 0; b < nBar; b++) {
  const t0 = b * BAR, enCorund = t0 >= Co - 0.3 && t0 < C + BAR;
  let ac = ACORDES[b % ACORDES.length];
  if (enCorund) ac = (b % 2) ? [41, 48, 53, 57] : [38, 50, 54, 57];          // se abre a mayor (Re – Fa) con las familias de Corund
  const tapa = t0 >= Mi && t0 < P ? 0.35 : 0;                                 // más oscura y cerrada en el microscopio y la chispa
  m.pad(t0, Math.min(FIN, t0 + BAR + 0.3), 0.04, ac, tapa);
}
// bajo pulsado suave en los tiempos 1 y 3 solo en el estudio (Ötzi): da camino, sin golpe marcado
for (let t = O; t < Pi + 5; t += BAR / 2) m.bajo(t, (Math.floor((t - O) / BAR) % 2) ? 31 : 26, 0.05, 0.9);

// --- tema «de madera» (nota corta con ataque suave). Frases de 4 compases: motivo → respuesta → secuencia → cadencia.
const q = BAR / 4; // negra
const frase = (t0, notas, g = 0.035) => notas.forEach(([pos, mm, dur]) => m.nota(t0 + pos * q, mm, g, dur * q * 1.6));
const MOTIVO = [[0, 62, 1], [1, 65, 1], [2, 69, 1.5], [3.5, 67, 0.5]];         // re – fa – la – sol
const RESPUESTA = [[0, 65, 1], [1, 64, 0.5], [1.5, 62, 0.5], [2, 60, 2]];       // fa – mi – re – do
const SECUENCIA = [[0, 64, 1], [1, 67, 1], [2, 71, 1.5], [3.5, 69, 0.5]];       // el motivo un tono arriba
const CADENCIA = [[0, 67, 1], [1, 65, 1], [2, 64, 0.5], [2.5, 62, 1.5]];        // cae a re
frase(G + 0.2, MOTIVO, 0.03); frase(G + 0.2 + BAR, RESPUESTA, 0.03);
frase(Ca + 0.2, SECUENCIA, 0.028); frase(Ca + 0.2 + BAR, CADENCIA, 0.028);
m.nota(P + 0.2, 62, 0.04, 0.8); m.nota(P + 0.6, 65, 0.04, 0.8); m.nota(P + 1.0, 69, 0.045, 1.4); // pregunta: motivo sin resolver
frase(A + 0.2, [[0, 69, 1], [1, 67, 1], [2, 65, 1], [3, 64, 1]], 0.026);       // abedul: línea que baja, pensativa
frase(Co + 0.3, [[0, 62, 1], [1, 66, 1], [2, 69, 1.5], [3.5, 71, 0.5]], 0.03); // Corund: el motivo en MAYOR
frase(Co + 0.3 + BAR, [[0, 74, 1], [1, 71, 1], [2, 69, 2]], 0.028);
frase(C + 0.1, MOTIVO, 0.032);                                                   // cierre: el tema regresa…
m.nota(Ou + 0.3, 62, 0.05, 2.8); m.nota(Ou + 0.3, 66, 0.04, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8); // …y por fin resuelve (Re mayor)

// --- efectos en el mismo cuadro que la imagen
m.whoosh(G - 0.15, 0.5, 0.12); m.golpe(G + 0.4, 0.25, 120);                     // el sombrero cae y aterriza (golpe suave de tela)
m.cruje(G + 1.4, 0.25);                                                          // se tacha «fieltro»
m.whoosh(G + 3.0, 0.8, 0.06); for (let i = 0; i < 5; i++) m.tic(G + 3.0 + i * 0.15, 0.08, 3200 + i * 200); // la chispa cruza
m.sube(H, 1.4, 38, 45, 0.04);                                                    // crece el yesquero
m.whoosh(Ca, 0.6, 0.12); m.metal(Ca + 0.5, 0.06, 1900);                          // el cuchillo corta
for (let i = 0; i < 8; i++) m.burbuja(Ch + 0.2 + i * 0.16, 0.06, 380 + (i % 3) * 70); // la olla hierve
[1.8, 2.25, 2.7].forEach((d) => m.golpe(Ch + d, 0.35, 70));                     // 3 golpes de mazo
[2.9, 3.0, 3.1].forEach((d, i) => m.gota(Ch + d + 0.3, 0.12, 900 + i * 120));  // gotas de salitre
m.metal(Ch + 3.7, 0.18, 2600); m.cruje(Ch + 3.72, 0.35);                         // pedernal contra pirita: chispas
for (let i = 0; i < 10; i++) m.tic(Ch + 4.2 + i * 0.13 + m.rnd() * 0.05, 0.05, 2000 + m.rnd() * 2500); // la brasa crepita
for (let i = 0; i < 8; i++) m.tic(P + 0.1 + i * 0.22 + m.rnd() * 0.05, 0.04, 2200 + m.rnd() * 2000);
m.whoosh(O, 2.2, 0.05); m.whoosh(O + 2.4, 2.0, 0.04);                            // viento del glaciar
m.golpe(O + 0.3, 0.3, 80);                                                       // tarjeta 1991
m.cruje(O + 6.0, 0.15); m.whoosh(O + 6.0, 0.5, 0.06);                            // se abre la bolsa de cuero
for (let k = 0; k < 3; k++) m.tic(O + 6.6 + k * 0.2, 0.12, 700);                 // salen los trozos de yesca
for (let i = 0; i < 6; i++) m.nota(Pi + 0.7 + i * 0.18, 81 + (i % 3) * 2, 0.02, 0.3); // destellos de pirita
m.metal(Pi + 3.0, 0.16, 2500); m.cruje(Pi + 3.0, 0.3); m.metal(Pi + 4.1, 0.14, 2700); m.cruje(Pi + 4.1, 0.25); // el raspador saca chispas
m.whoosh(A + 0.1, 0.7, 0.05); m.tic(A + 0.9, 0.08, 500); m.tic(A + 2.5, 0.07, 520); // los trozos se balancean
m.gota(S + 0.6, 0.12, 600); m.whoosh(S + 1.8, 0.6, 0.08); m.golpe(S + 2.5, 0.15, 140); // la gota; el cuadrito la tapa
m.whoosh(Co + 1.6, 2.4, 0.05);                                                   // la lámina se estira
m.tic(Co + 0.5, 0.15, 900);                                                      // punto de Corund
m.whoosh(C, 0.5, 0.06); for (let i = 0; i < 6; i++) m.tic(C + 0.5 + i * 0.2 + m.rnd() * 0.05, 0.04, 2400 + m.rnd() * 1500); // brasa del cierre
m.guardar(OUT, 1);
