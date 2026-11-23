// gen-audio.mjs — música y efectos del Shot Fungi Mati #147 (madera espalteada). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama cálida de taller en re menor a 100 BPM, debajo de la voz, sin golpe marcado.
// Forma: A (tema: motivo → respuesta) · B (desarrollo, el tema en otra octava y con otra armonía) · A' (regresa en RE MAYOR
// cuando la tabla se "lee" como mapa, en el cierre). La progresión cambia cada 2 compases y ningún patrón dura más de 4.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Espalteada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 147);
const K = m.K;
const G = K.Gancho, V = K.Valor, En = K.Entran, H = K.Hifas, Ch = K.Choque, M = K.Melanina, P = K.Pregunta, Ma = K.Mapa,
  B = K.Blanqueo, L = K.Laboratorio, Co = K.Costo, S = K.Secar, X = K.Xylaria, C = K.Cierre, Ou = K.Outro;
const BEAT = 0.6, BAR = 4 * BEAT;

// --- armonía: [inicio, fin, notas MIDI] (acordes en posición cercana: cada voz va a la nota más próxima) ---
const Dm = [50, 53, 57], Bb = [46, 53, 58], Gm = [43, 50, 55], A7 = [45, 52, 55, 61], Fa = [41, 53, 57], Do = [48, 52, 55], Dmaj = [50, 54, 57], Gmaj = [43, 50, 59], Amaj = [45, 52, 57, 61];
const prog = [];
let t = 0;
const secA = [Dm, Bb, Gm, A7], secB = [Fa, Do, Bb, A7, Dm, Gm, Bb, A7];
for (const ch of secA) { prog.push([t, t + 2 * BAR, ch]); t += 2 * BAR; }                // 0–19 s (gancho → hifas)
for (const ch of secB) { if (t >= C - 0.2) break; const fin = Math.min(t + 2 * BAR, C); prog.push([t, fin, ch]); t = fin; }
while (t < C - 0.2) { const ch = secA[Math.floor((t / (2 * BAR))) % 4]; const fin = Math.min(t + 2 * BAR, C); prog.push([t, fin, ch]); t = fin; }
prog.push([C, C + 2.2, Gmaj]); prog.push([C + 2.0, Ou, Amaj]); prog.push([Ou - 0.2, Ou + 3.6, Dmaj]);   // cierre: el tema regresa en mayor
for (const [a, b, ch] of prog) m.pad(a, b + 0.5, 0.042, ch, a < M + 2 ? 0.25 : 0);           // tapado mientras dura el choque

// bajo suave (cuerda pulsada) en el 1 de cada compás y una nota de paso en el 3, distinta cada compás
for (const [a, b, ch] of prog) for (let x = a, k = 0; x < b - 0.1; x += BAR, k++) {
  m.bajo(x, ch[0] - 12, 0.05, 0.9);
  if (k % 2 === 1) m.bajo(x + 2 * BEAT, ch[0] - 12 + (k % 4 === 1 ? 7 : 5), 0.035, 0.6);
}

// --- melodía (tema de 4 compases: motivo → respuesta), suave, entre frases de la voz ---
// [compás relativo, tiempo en el compás, nota, duración en tiempos]
const TEMA = [[0, 0, 69, 1.5], [0, 1.5, 67, 0.5], [0, 2, 65, 1], [0, 3, 64, 1], [1, 0, 62, 3],                // motivo
  [2, 0, 65, 1], [2, 1, 67, 1], [2, 2, 69, 1], [2, 3, 72, 1], [3, 0, 69, 2], [3, 2, 64, 2]];                 // respuesta (abre en la 5.ª)
const RESP = [[0, 0, 74, 1], [0, 1, 72, 1], [0, 2, 70, 2], [1, 0, 69, 2], [1, 2, 67, 2],                      // secuencia un tono abajo
  [2, 0, 65, 1.5], [2, 1.5, 64, 0.5], [2, 2, 62, 1], [2, 3, 61, 1], [3, 0, 62, 4]];                          // cadencia en la raíz
const frase = (t0, notas, tr = 0, g = 0.03) => notas.forEach(([c, b, n, d]) => m.nota(t0 + c * BAR + b * BEAT, n + tr, g, d * BEAT * 1.3));
frase(G + 0.2, TEMA);                    // gancho: el tema
frase(H + 0.2, RESP, -12, 0.026);        // hifas: la respuesta, una octava abajo (por dentro de la madera)
frase(Ma, TEMA, 0, 0.028);               // el mapa: regresa el tema
frase(L + 0.3, RESP, 0, 0.026);          // el laboratorio: la respuesta arriba
// cierre: el tema en RE MAYOR (3.ª y 6.ª suben) y acorde que se queda sonando
const MAYOR = TEMA.map(([c, b, n, d]) => [c, b, n === 65 ? 66 : n === 72 ? 71 : n, d]);
frase(C + 0.1, MAYOR.slice(0, 5), 0, 0.03);
m.nota(Ou + 0.2, 62, 0.05, 3.2); m.nota(Ou + 0.2, 66, 0.04, 3.2); m.nota(Ou + 0.2, 69, 0.04, 3.2); m.nota(Ou + 0.5, 74, 0.03, 2.8);

// --- efectos en el mismo cuadro ---
for (let i = 0; i < 12; i++) m.tic(G + 0.05 + i * 0.15, 0.05, 900 + (i % 4) * 120);              // trazo de tinta de las líneas
m.cruje(G + 1.5, 0.25);                                                                            // se tacha «vetas»
m.whoosh(V - 0.3, 0.7, 0.08); m.golpe(V + 0.5, 0.18, 70);                                          // sube el cuenco
for (let i = 0; i < 3; i++) m.tic(V + 1.4 + i * 0.5, 0.12, 2200 + i * 300);                        // $ $ $
for (let i = 0; i < 3; i++) { m.whoosh(En + 0.4 + i * 0.9, 0.4, 0.05); m.gota(En + 0.9 + i * 0.9, 0.12, 600 + i * 150); } // caen 3 esporas
m.whoosh(H - 0.6, 0.9, 0.08);                                                                      // entramos al microscopio
for (let i = 0; i < 24; i++) m.tic(H + 0.3 + i * 0.32, 0.03, 3000 + (i % 5) * 200);                // puntas de hifas que avanzan
for (let i = 0; i < 6; i++) m.tic(Ch + 0.3 + i * 0.25, 0.08, 1300);                                // chispas del choque
m.golpe(M + 0.15, 0.3, 55); m.golpe(M + 0.9, 0.2, 50);                                             // se levanta el muro de melanina
m.sube(P + 0.1, 1.4, 50, 62, 0.04);                                                                 // re-gancho
for (let i = 0; i < 12; i++) m.gota(P + 0.1 + i * 0.12, 0.06, 700 + i * 40);                       // muchas esporas
for (let i = 0; i < 11; i++) m.nota(Ma + 0.2 + i * 0.2, [62, 65, 69, 72, 74, 77, 74, 72, 69, 65, 62][i] + 12, 0.018, 0.4); // cada territorio se pinta
m.whoosh(B + 0.2, 0.9, 0.06);                            // crece Trametes; se aclara
m.golpe(L + 0.1, 0.2, 80);                                                                          // tarjeta 2012
for (let i = 0; i < 4; i++) m.metal(L + 0.2 + i * 0.35, 0.07, 1500 + i * 120);                     // clic de cada frasco
for (let i = 0; i < 11; i++) m.tic(L + 1.6 + i * ((Co - 0.4 - L - 1.6) / 11), 0.05, 1800);          // tic de cada semana
m.whoosh(Co - 0.3, 0.6, 0.06); m.golpe(Co + 0.4, 0.25, 60);                                         // el cubito cae en la báscula
for (let i = 0; i < 4; i++) m.cruje(Co + 0.9 + i * 0.4, 0.08);                                      // se pudre (huecos)
m.sube(Co + 1.0, 0.8, 62, 50, 0.03);                                                                // −30 %
for (let i = 0; i < 8; i++) m.burbuja(S + 0.2 + i * 0.22, 0.04, 900 + i * 50);                      // gotas que se evaporan
m.golpe(S + 1.4, 0.22, 90);                                                                         // sello PAUSA
for (let i = 0; i < 6; i++) m.cruje(S + 1.0 + i * 0.3, 0.1);                                        // la tabla húmeda se desmorona
for (let i = 0; i < 5; i++) m.cruje(X + 0.1 + i * 0.25, 0.08);                                      // brotan los dedos de muerto
for (let i = 0; i < 3; i++) m.tic(X + 2.6 + i * 0.6, 0.06, 900);                                    // líneas consigo mismo
m.guardar(OUT, 1);
