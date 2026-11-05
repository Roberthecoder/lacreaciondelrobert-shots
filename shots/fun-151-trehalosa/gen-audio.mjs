// gen-audio.mjs — música y efectos del Shot Fungi Mati #151 (trehalosa, el azúcar de los hongos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama cálida y juguetona de cocina a 104 BPM en sol mayor, con armonía de función
// (I–vi–IV–V; ii–V en la pregunta; se oscurece a mi menor en el colon y regresa a mayor en el cierre), voces cercanas y un motivo propio
// de 4 notas en "dos mitades iguales" (sol–si / si–sol, como las dos glucosas) que se contesta, se invierte y se secuencia; cambia de
// textura por parte (pad → pizzicato grave al microscopio → campanitas en el estudio → motivo arriba en el cierre). Siempre bajo la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Trehalosa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 1511);
const K = m.K;
const G = K.Gancho, No = K.Nombre, Fo = K.Forma, Cu = K.Cuanto, Es = K.Escudo, Le = K.Levadura, P = K.Pregunta, Tr = K.Trehalasa,
  Est = K.Estudio, Oc = K.Ocho, Co = K.Colon, Ge = K.Gen, Oj = K.Ojo, C = K.Cierre, Ou = K.Outro;
const BAR = 60 / 104 * 4;

const AC = {
  G: [43, 55, 59, 62], Em: [40, 55, 59, 64], C: [48, 55, 60, 64], D: [50, 54, 57, 62], Am: [45, 57, 60, 64], Bm: [47, 54, 59, 62],
  D7: [50, 54, 60, 62], B7: [47, 54, 57, 63], Cmaj7: [48, 55, 59, 64], Gadd9: [43, 57, 59, 62], Dsus: [50, 55, 57, 62],
};
const PARTES = [
  [G, Fo, ['G', 'Em', 'C', 'D'], 0.05, 0.2],          // gancho y nombre
  [Fo, Es, ['C', 'D', 'G', 'Em'], 0.05, 0],           // forma y cuánto
  [Es, P, ['Em', 'C', 'Am', 'B7'], 0.045, 0.3],       // al microscopio: menor, tapado
  [P, Tr, ['Am', 'D7'], 0.05, 0.3],                   // re-gancho
  [Tr, Est, ['G', 'Bm', 'C', 'D'], 0.05, 0.1],        // la tijera corta
  [Est, Co, ['C', 'G', 'Am', 'Dsus', 'D'], 0.055, 0], // el estudio: se abre
  [Co, Ge, ['Em', 'Am', 'B7', 'Em'], 0.045, 0.4],     // colon: más oscuro
  [Ge, C, ['C', 'D', 'Bm', 'Em', 'Am', 'D'], 0.05, 0], // gen y aviso
  [C, Ou + 3.5, ['C', 'D', 'Cmaj7', 'Gadd9'], 0.05, 0], // regreso, cadencia abierta
];
for (const [t0, t1, prog, g, tapa] of PARTES) {
  for (let t = t0, k = 0; t < t1 - 0.05; t += BAR, k++) {
    const ac = AC[prog[k % prog.length]], fin = Math.min(t + BAR + 0.15, t1);
    m.pad(t, fin, g, ac.slice(0, 3), tapa);
    m.bajo(t, ac[0] - 12, 0.05, 1.5);
    if (k % 2 === 1) m.bajo(t + BAR * 0.5, ac[0] - 12 + 7, 0.03, 0.9);
  }
}

const B = BAR / 4;
const frase = (t0, notas, g = 0.025, tapa = 0) => notas.forEach(([b, mm, d]) => m.nota(t0 + b * B, mm, g, d * B * 1.4, tapa));
const MOTIVO = [[0, 79, 0.5], [0.5, 83, 1.5], [2, 83, 0.5], [2.5, 79, 1.5]];   // sol–si | si–sol: dos mitades espejo
const RESPUESTA = [[0, 81, 1], [1, 84, 0.5], [1.5, 83, 0.5], [2, 79, 2]];
const SECUENCIA = MOTIVO.map(([b, mm, d]) => [b, mm + 2, d]);
const CADENCIA = [[0, 81, 1], [1, 78, 1], [2, 79, 2]];                         // la–fa#–sol
frase(G + 0.2, MOTIVO, 0.022, 0.25); frase(G + BAR + 0.2, RESPUESTA, 0.02, 0.25);
frase(No + 0.3, SECUENCIA, 0.024);
frase(Fo + 0.4, MOTIVO.map(([b, mm, d]) => [b, mm - 12, d]), 0.024); frase(Cu + 0.4, CADENCIA, 0.022);
frase(Es + 0.3, MOTIVO.map(([b, mm, d]) => [b, mm - 15, d]), 0.026, 0.3);     // al microscopio, en menor y grave
frase(Le + 0.3, RESPUESTA.map(([b, mm, d]) => [b, mm - 15, d]), 0.024, 0.3);
frase(P + 0.1, [[0, 81, 1], [1, 83, 1], [2, 84, 1.5]], 0.024, 0.2);          // pregunta abierta
frase(Tr + 0.3, SECUENCIA, 0.022); frase(Tr + BAR + 0.3, CADENCIA, 0.022);
for (let i = 0; i < 10; i++) m.nota(Est + 0.6 + i * 0.4, [72, 76, 79, 84][i % 4], 0.014, 0.5); // campanitas del estudio
frase(Oc + 0.3, RESPUESTA, 0.022);
frase(Co + 0.4, MOTIVO.map(([b, mm, d]) => [b, mm - 17, d]), 0.024, 0.4);
frase(Ge + 0.4, MOTIVO.map(([b, mm, d]) => [b, 162 - mm, d]), 0.02);          // el motivo invertido: "una letra cambia"
frase(Oj + 0.3, CADENCIA.map(([b, mm, d]) => [b, mm - 12, d]), 0.022);
frase(C + 0.4, MOTIVO, 0.024); frase(C + BAR + 0.4, CADENCIA, 0.024);

// ---------- efectos en el mismo cuadro ----------
m.whoosh(G, 0.45, 0.06); m.tic(G + 0.45, 0.3, 1900); m.golpe(G + 0.45, 0.2, 140);        // el tenedor pincha
m.sube(G + 0.5, 0.6, 38, 33, 0.05); m.sube(G + 1.2, 0.5, 36, 31, 0.04);                    // gruñido de panza
m.cruje(G + 1.8, 0.2); m.tic(G + 2.2, 0.2, 1500);                                         // tachón y chip
m.sube(No, 1.2, 62, 74, 0.035); m.nota(No + 1.2, 86, 0.03, 0.8);                           // sale y brilla la trehalosa
m.golpe(Fo + 1.2, 0.25, 70); m.nota(Fo + 1.6, 83, 0.04, 0.5); m.nota(Fo + 1.7, 83, 0.04, 0.5); // ✗ sacarosa · "1 ↔ 1"
m.golpe(Cu + 0.3, 0.25, 90); m.tic(Cu + 0.6, 0.15, 2400);                                 // báscula y cucharita
for (let i = 0; i < 18; i++) m.tic(Es + 0.3 + i * 0.07, 0.05, 2600 + (i % 4) * 200);     // la célula se llena
m.zumbido(Es + 2.0, 0.9, 0.03, 330); m.metal(Es + 2.4, 0.05, 2200);                      // sol y frío
m.whoosh(Es + 2.6, 1.0, 0.05);                                                            // las trehalosas forman el escudo
m.nota(Le + 1.0, 79, 0.04, 0.5); m.golpe(Le + 1.4, 0.2, 70);                              // ✓ y ✗
m.sube(P + 0.1, 1.4, 52, 64, 0.04);
m.whoosh(Tr - 0.3, 0.8, 0.08); m.tic(Tr + 1.8, 0.35, 2600); m.tic(Tr + 1.88, 0.25, 3100); // la trehalasa corta
m.gota(Tr + 2.6, 0.08, 700); m.gota(Tr + 2.9, 0.08, 800);                                // las glucosas entran
m.golpe(Est + 0.2, 0.3, 80); m.whoosh(Est + 1.8, 1.0, 0.05);                              // tarjeta 1988; flecha
for (let i = 0; i < 8; i++) m.nota(Oc + 0.4 + i * 0.12, 72 + (i % 4) * 2, 0.03, 0.3);      // se encienden 8
for (let i = 0; i < 10; i++) m.gota(Co + 0.9 + i * 0.15, 0.06, 500 + i * 30);             // jala agua
for (let i = 0; i < 12; i++) m.burbuja(Co + 3.0 + i * 0.22, 0.05, 260 + (i % 4) * 60);    // gases
m.sube(Co + 3.2, 1.2, 40, 44, 0.03);                                                      // la pancita se infla
m.tic(Ge + 0.6, 0.2, 1800); m.tic(Ge + 1.4, 0.3, 2800); m.tic(Ge + 1.5, 0.2, 2100);       // banda TREH; cambia la letra
for (let i = 0; i < 3; i++) m.nota(Ge + 2.0 + i * 0.2, 67 - i * 3, 0.03, 0.4);             // barras GG · AG · AA (bajan)
m.golpe(Oj + 0.3, 0.2, 100); m.tic(Oj + 1.2, 0.15, 1400);                                 // tarjetas y aviso
m.cruje(C + 0.8, 0.15); m.tic(C + 1.2, 0.2, 1500);                                        // tachón y chip
m.nota(Ou + 0.3, 43, 0.06, 3.0); m.nota(Ou + 0.3, 50, 0.05, 3.0); m.nota(Ou + 0.3, 59, 0.04, 3.0); m.nota(Ou + 0.3, 69, 0.035, 3.0);
m.guardar(OUT, 1);
