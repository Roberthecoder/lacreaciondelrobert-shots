// gen-audio.mjs — música y efectos del Shot Fungi Mati #125 (hongo que se azula). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
//
// Música (ver maestro/recetas/composicion-musical.md): cama de bosque húmedo a 96 BPM (compás = 2.5 s), con armonía que avanza
// (nunca el mismo acorde más de 2 compases), arpegio que cambia de dibujo cada 2–4 compases y un tema propio de 4 notas
// (motivo → respuesta → secuencia → cadencia). Misterio en la menor; cuando el pigmento se vuelve azul la armonía se abre
// a mayor (La mayor / Re lidio); se tensa en «¿veneno?» y en el aviso; regresa el tema, ya en mayor, en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hongo Azul base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 125);
const K = m.K;
const G = K.Gancho, Bo = K.Boleto, To = K.Toque, Pi = K.Pigmento, Co = K.Corte, Ox = K.Oxida, P = K.Pregunta, E = K.Estudio, R = K.Respuesta, Av = K.Aviso, D = K.DatoExtra, C = K.Cierre, Ou = K.Outro;

// ---------- armonía: un acorde por compás (2.5 s), en tiempo de autor ----------
const BAR = 2.5;
const AC = {
  Am: [45, 52, 60, 64], F7: [41, 48, 57, 64], C: [48, 55, 64, 67], G6: [43, 50, 59, 64], Dm9: [38, 45, 53, 64], E4: [40, 47, 57, 59], E: [40, 47, 56, 59],
  A: [45, 52, 61, 64], D6: [38, 45, 54, 59], Fs7: [42, 49, 57, 64], Bm7: [47, 54, 62, 69], Bb: [46, 53, 62, 65], Dm: [38, 45, 53, 62], E7: [40, 47, 56, 62],
  Asus: [45, 52, 59, 64], Am9: [45, 52, 59, 64, 71],
};
// compás → acorde. 0–25 s misterio; 25–28 se abre (azul); 28–31 tenso; 31–38 estudio; 38–49 aviso; 49–54 dato; 54– cierre.
const SEQ = ['Am', 'F7', 'C', 'G6', 'Dm9', 'Am', 'F7', 'E4', 'E', 'Am9', 'A', 'D6', 'Bb', 'E7', 'Fs7', 'Bm7', 'Dm', 'Bb', 'E4', 'E', 'D6', 'A', 'Fs7', 'Bm7', 'D6', 'A', 'A'];
const FIN = Ou + 3.0;
const nBar = Math.ceil(FIN / BAR);
for (let b = 0; b < nBar; b++) {
  const t0 = b * BAR, t1 = Math.min(FIN, t0 + BAR + 0.25), ch = AC[SEQ[Math.min(b, SEQ.length - 1)]];
  const tension = (t0 >= P - 0.5 && t0 < E) || (t0 >= R && t0 < D) ? 0.25 : 0;
  m.pad(t0, t1, 0.045, ch.slice(0, 3), tension);
}

// ---------- arpegio suave (pulsado), dibujo distinto cada 2–4 compases ----------
const DIBUJOS = [
  [0, 1, 2, 3, 2, 1, 2, 3],   // sube y baja
  [0, 2, 1, 3, 0, 2, 3, 2],   // salteado
  [3, 2, 1, 2, 3, 2, 1, 0],   // baja
  [0, 3, 2, 3, 1, 3, 2, 3],   // pedal arriba
];
const dibujoDe = (b) => (b < 2 ? null : b < 4 ? 0 : b < 7 ? 1 : b < 9 ? 2 : b < 10 ? 0 : b < 12 ? 3 : b < 14 ? 1 : b < 18 ? 2 : b < 21 ? 0 : b < 23 ? 3 : 1);
for (let b = 0; b < nBar - 1; b++) {
  const d = dibujoDe(b); if (d == null) continue;
  const ch = AC[SEQ[Math.min(b, SEQ.length - 1)]].map((x) => (x < 52 ? x + 12 : x) + 12);
  const pat = DIBUJOS[d], paso = BAR / 8;
  pat.forEach((k, i) => {
    const t = b * BAR + i * paso + (i % 2 ? 0.012 : 0);           // un pelito de swing
    const acento = i === 0 ? 1 : i === 4 ? 0.8 : 0.55 + 0.1 * ((i * 7) % 3);
    if (b % 4 === 3 && i >= 6) return;                            // respiración al final de cada frase de 4 compases
    m.nota(t, ch[k % ch.length], 0.022 * acento, 0.9, 0.35);
  });
}

// ---------- tema propio: motivo (Mi Re Do La) y sus vueltas ----------
const frase = (t, notas, g = 0.03) => notas.forEach(([dt, mm, d]) => m.nota(t + dt, mm, g, d || 0.9));
frase(Bo + 0.2, [[0, 76], [0.62, 74], [0.94, 72], [1.25, 69, 1.6]]);                 // motivo
frase(To + 1.0, [[0, 72], [0.62, 74], [0.94, 76], [1.25, 79, 1.6]], 0.026);          // respuesta (sube)
frase(Pi + 1.2, [[0, 77], [0.62, 76], [0.94, 74], [1.25, 72, 1.6]], 0.024);          // secuencia (un paso arriba)
frase(Pi + 4.2, [[0, 71], [0.62, 72], [0.94, 71], [1.25, 68, 2.0]], 0.022);          // cadencia en Mi (suspenso)
frase(Ox + 0.6, [[0, 76], [0.62, 78], [0.94, 81], [1.25, 85, 2.0]], 0.03);           // el azul: el tema se abre a mayor
frase(E + 2.6, [[0, 74], [0.62, 73], [0.94, 71], [1.25, 69, 1.6]], 0.022);
frase(D + 0.6, [[0, 78], [0.5, 76], [0.75, 73], [1.0, 71, 1.2]], 0.024);
frase(C + 0.4, [[0, 76], [0.62, 74], [0.94, 73], [1.25, 69, 2.6]], 0.03);            // regreso del tema, en La mayor
m.nota(Ou + 0.2, 57, 0.06, 3.0); m.nota(Ou + 0.2, 61, 0.05, 3.0); m.nota(Ou + 0.2, 64, 0.05, 3.0); m.nota(Ou + 0.3, 81, 0.025, 2.6);

// ---------- efectos, en el mismo cuadro que la imagen ----------
m.whoosh(G + 0.15, 0.45, 0.16); m.cruje(G + 0.45, 0.25);                             // navaja que parte el hongo
m.sube(G + 0.8, 3.0, 64, 76, 0.025);                                                 // el azul se extiende
m.whoosh(Bo, 0.6, 0.08); m.burbuja(Bo + 2.0, 0.08, 380);                             // cámara bajo el sombrero, esponja
m.tic(To + 1.1, 0.25, 600); m.gota(To + 1.25, 0.12, 500);                            // toque y mancha
m.tic(To + 2.6, 0.22, 650); m.gota(To + 2.75, 0.12, 560);
m.sube(Pi, 1.2, 40, 47, 0.04);                                                        // bajamos al microscopio
for (let i = 0; i < 6; i++) m.burbuja(Pi + 0.6 + i * 0.12, 0.05, 520 + i * 40);      // gotitas de pigmento
m.golpe(Pi + 2.7, 0.2, 90);                                                           // molécula
m.whoosh(Co + 0.3, 0.6, 0.12); m.cruje(Co + 0.7, 0.4);                               // navaja y células que se rompen
for (let i = 0; i < 5; i++) m.burbuja(Co + 2.0 + [0, 0.3, 0.6, 0.9, 1.1][i], 0.08, 700 + i * 60); // oxígeno
m.golpe(Co + 3.1, 0.18, 120);                                                         // enzima
for (let i = 0; i < 10; i++) m.nota(Ox + 0.4 + i * 0.07, m.ESC[6 + (i % 7)], 0.02, 0.5); // chispitas de la oxidación
m.golpe(Ox + 1.4, 0.25, 140);                                                         // anión azul
m.golpe(P + 0.1, 0.35, 55);                                                           // calavera
m.golpe(E + 0.2, 0.3, 80);                                                            // tarjeta del estudio
for (let i = 0; i < 4; i++) m.tic(E + 4.0 + i * 0.25, 0.14, 1500 + i * 200);         // 4 especies
m.whoosh(R + 1.6, 0.5, 0.06); m.whoosh(R + 3.2, 0.5, 0.06);
m.golpe(R + 5.6, 0.5, 60); m.cruje(R + 5.6, 0.2);                                     // sello
m.whoosh(Av + 0.6, 0.8, 0.1);                                                         // lupa del experto
m.sube(D + 0.8, 1.8, 66, 78, 0.022); m.golpe(D + 2.4, 0.2, 110);                     // Gyroporus se azula; otra molécula
m.whoosh(C + 0.2, 0.6, 0.06);
m.guardar(OUT, 1);
