// gen-audio.mjs — música y efectos del Shot Fungi Mati #124 (sequía y suelo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): 96 BPM, re menor. Tema de 4 compases (motivo → respuesta → secuencia → cadencia) que cambia
// de instrumento y registro; armonía que se mueve cada 2 compases. Mientras dura la sequía suena "tapada" y seca; con la lluvia
// se abre a Fa mayor, el tema regresa más agudo y la cama respira con el pulso de CO₂. Debajo de la voz, sin golpe marcado.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sequia Suelo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 124);
const K = m.K;
const G = K.Gancho, Mi = K.Milpa, Ba = K.Bacterias, Se = K.Seca, Hi = K.Hifas, P = K.Pregunta, E = K.Estudio, R = K.Redes,
  Ch = K.Champinon, Pi = K.Pizza, Hp = K.Hipotesis, Ll = K.Lluvia, Bi = K.Birch, C = K.Cierre, Ou = K.Outro;
const BEAT = 60 / 96, BAR = BEAT * 4, FIN = Ou + 3;

// ---------- armonía: un acorde cada 2 compases ----------
const SECO = [[50, 53, 57], [46, 50, 53], [43, 46, 50], [45, 49, 52], [50, 53, 57], [46, 50, 55], [48, 52, 55], [45, 49, 52], [50, 53, 57]]; // Dm Bb Gm A Dm Gm/Bb C A Dm
const LLUVIA = [[53, 57, 60], [48, 52, 55], [50, 53, 57], [46, 50, 53], [53, 57, 60]];                                 // F C Dm Bb F
let t = 0, i = 0;
while (t < Ll - 0.01) { const t1 = Math.min(Ll, t + BAR * 2); m.pad(t, t1 + 0.4, 0.05, SECO[i % SECO.length], 0.45); t = t1; i++; }
t = Ll; i = 0;
while (t < FIN) { const t1 = Math.min(FIN, t + BAR * 2); m.pad(t, t1 + 0.4, 0.055, LLUVIA[i % LLUVIA.length], 0); t = t1; i++; }

// ---------- tema (re menor): frases de 4 compases; [tiempo en pulsos, nota, duración en pulsos] ----------
const MOTIVO = [[0, 62, 1], [1, 65, 0.5], [1.5, 64, 0.5], [2, 62, 1.5]];          // motivo
const RESPUESTA = [[0, 60, 1], [1, 62, 0.5], [1.5, 60, 0.5], [2, 57, 2]];         // respuesta
const SECUENCIA = MOTIVO.map(([b, n, d]) => [b, n - 2, d]);                        // el motivo un tono abajo
const CADENCIA = [[0, 58, 1], [1, 57, 1], [2, 55, 0.5], [2.5, 57, 0.5], [3, 62, 1]];
const CADENCIA2 = [[0, 65, 0.5], [0.5, 64, 0.5], [1, 62, 1], [2, 61, 1], [3, 62, 1]]; // otra cadencia (con sensible)
const FRASE_A = [MOTIVO, RESPUESTA, SECUENCIA, CADENCIA], FRASE_B = [MOTIVO, RESPUESTA, SECUENCIA, CADENCIA2];
const toca = (t0, frase, trans = 0, g = 0.03, tapa = 0.4, d0 = 1) => frase.forEach((compas, k) => compas.forEach(([b, n, d]) => {
  const tt = t0 + k * BAR + b * BEAT; if (tt < FIN) m.nota(tt, n + trans, g, d * BEAT * 1.6 * d0, tapa); }));
// sequía: el tema aparece seco y tapado, en registro grave-medio; las respuestas se adelgazan (sin agua)
toca(G + BAR * 0.5, FRASE_A, 0, 0.026, 0.55);
toca(G + BAR * 4.5, FRASE_B, -12, 0.032, 0.5);                 // segunda vez una octava abajo (bajo melódico)
toca(G + BAR * 8.5, FRASE_A, 0, 0.022, 0.6, 0.6);               // tercera vez: notas más cortas, como el agua que se va
// un pizzicato que cuenta los compases bajo la investigación (cambia de figura cada 2 compases)
const FIG = [[0, 2], [0, 1.5, 3], [0, 1, 2, 3], [0, 2.5]];
for (let b = 12; b < Math.floor(Ll / BAR); b++) FIG[Math.floor(b / 2) % 4].forEach((x, k) => m.nota(G + b * BAR + x * BEAT, (k % 2 ? 57 : 50) + (b % 4 === 3 ? 2 : 0), 0.02, 0.25, 0.3));
// lluvia: el tema regresa en Fa mayor, una octava arriba y libre (sin tapa)
const MAYOR = (fr) => fr.map((c) => c.map(([b, n, d]) => [b, n + 3 + 12, d]));
toca(Ll + BEAT, MAYOR(FRASE_A), 0, 0.022, 0);
for (let k = 0; k < 16; k++) m.nota(Bi + k * BEAT * 0.5, [65, 69, 72, 77][k % 4] + (k > 7 ? 2 : 0), 0.014, 0.5, 0);  // arpegio de gotas

// ---------- efectos atados a la pantalla ----------
m.cruje(G + 0.25, 0.5); m.whoosh(G + 0.3, 0.6, 0.08);                         // el terrón se agrieta, polvo
m.sube(G + 0.6, 1.0, 45, 50, 0.03);                                            // "aguanta la respiración"
for (let k = 0; k < 4; k++) m.tic(Mi + 0.6 + k * 0.35, 0.12, 1500);             // soles: meses sin lluvia
m.whoosh(Mi + 0.4, 0.6, 0.08); m.nota(Mi + 0.9, 74, 0.03, 0.8);                // se abre la lupa
m.whoosh(Ba - 0.3, 0.9, 0.07);                                                  // entramos al microscopio
for (let k = 0; k < 6; k++) m.burbuja(Ba + 0.6 + k * 0.6, 0.06, 420 + k * 40);  // bacterias nadando en el agua
m.whoosh(Se + 0.2, 2.0, 0.05);                                                  // el agua se va (siseo)
m.tic(Se + 1.2, 0.15, 1200);                                                    // «poro con aire»
m.sube(Hi + 0.2, 3.4, 50, 62, 0.025);                                           // la hifa crece cruzando el aire
m.sube(P + 0.1, 1.5, 52, 64, 0.04);                                             // re-gancho
m.golpe(E + 0.2, 0.3, 80);                                                       // tarjeta 2018
for (let k = 0; k < 14; k++) m.gota(E + 0.3 + k * 0.4, 0.06, 1100 + (k % 3) * 120); // lluvia sobre el techo
for (let k = 0; k < 4; k++) m.tic(E + 0.4 + k * 0.12, 0.1, 900);                // salen las macetas
for (let k = 0; k < 20; k++) m.tic(E + 3.4 + k * 0.11, 0.04, 2600 + (k % 4) * 300); // se lee el ADN
m.tic(R + 0.1, 0.1, 1300); m.zumbido(R + 1.0, 2.2, 0.035, 150);                  // la red de bacterias tiembla
m.tic(R + 2.2, 0.12, 900); m.nota(R + 3.0, 69, 0.03, 0.8);                       // menos estable / más estable
m.golpe(Ch + 0.2, 0.3, 80); m.sube(Ch + 0.8, 2.6, 48, 55, 0.025);                // tarjeta 2015, crecen las hifas
for (let k = 0; k < 10; k++) m.gota(Ch + 3.0 + k * 0.25, 0.05, 1500 + (k % 2) * 200); // gotitas por las hifas
m.sube(Pi + 0.3, 1.2, 55, 67, 0.035); m.tic(Pi + 1.4, 0.2, 700);                // medidor +2,800 %, pizza
m.golpe(Hp + 0.25, 0.45, 70);                                                    // sello HIPÓTESIS
for (let k = 0; k < 40; k++) m.gota(Ll + 0.1 + k * 0.08 + m.rnd() * 0.05, 0.05, 700 + m.rnd() * 900); // lluvia
m.whoosh(Ll + 1.5, 1.6, 0.09);                                                   // la tierra exhala
for (let k = 0; k < 8; k++) m.burbuja(Ll + 1.8 + k * 0.35, 0.05, 300 + k * 30);  // burbujas de CO₂
m.tic(Bi + 0.1, 0.12, 1000); m.sube(Bi + 0.6, 0.6, 57, 69, 0.03);                // gráfica: sube de golpe…
m.sube(Bi + 1.2, 1.4, 69, 57, 0.02);                                             // …y baja despacio
m.tic(Bi + 2.6, 0.1, 1300); m.tic(Bi + 3.0, 0.1, 1500); m.golpe(Bi + 4.4, 0.25, 90);
m.nota(C + 0.3, 65, 0.03, 1.4); m.nota(C + 0.9, 69, 0.03, 1.4); m.nota(C + 1.5, 72, 0.03, 1.8);  // brotes
m.nota(Ou + 0.3, 53, 0.06, 2.8); m.nota(Ou + 0.3, 60, 0.05, 2.8); m.nota(Ou + 0.3, 65, 0.045, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8);
m.guardar(OUT, 1);
