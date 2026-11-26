// gen-audio.mjs — música y efectos del Shot Fungi Mati #155 (Iceberg de los hongos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): un tema propio de 4 compases (motivo → respuesta → secuencia → cadencia)
// a 100 BPM que BAJA medio tono y se tapa un poco más en cada nivel del iceberg (el agua se oscurece), cambia de instrumento
// y de figura cada 2–4 compases, se vacía en el re-gancho («falta lo oscuro») y regresa en mayor, abierto, al alejarse en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Iceberg base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 155);
const K = m.K;
const G = K.Gancho, N1 = K.Nivel1, Pe = K.Penicilina, Qu = K.Quitina, Br = K.Brillan, Ar = K.Armillaria, Pr = K.Pregunta, Ho = K.Hormiga,
  La = K.Lazos, Se = K.Sexos, Ra = K.Radiacion, Ci = K.Cierre, Ou = K.Outro, FIN = Ou + 3.5;
const BEAT = 0.6; // 100 BPM

/* ---------- armonía por tramo: raíz (MIDI), modo y "tapa" (el agua oscurece el sonido) ---------- */
// re menor arriba; cada nivel medio tono abajo; el cierre regresa a re MAYOR
const TRAMOS = [
  { a: 0, b: N1, raiz: 50, menor: true, tapa: 0.0 },       // punta (cielo)
  { a: N1, b: Pe, raiz: 50, menor: true, tapa: 0.1 },      // nivel 1
  { a: Pe, b: Br, raiz: 49, menor: true, tapa: 0.25 },     // nivel 2
  { a: Br, b: Pr, raiz: 48, menor: true, tapa: 0.4 },      // nivel 3
  { a: Pr, b: Ho, raiz: 47, menor: true, tapa: 0.6, vacio: true }, // re-gancho: se vacía
  { a: Ho, b: Se, raiz: 47, menor: true, tapa: 0.55 },     // nivel 4
  { a: Se, b: Ci, raiz: 46, menor: true, tapa: 0.7 },      // nivel 5 (el fondo)
  { a: Ci, b: FIN, raiz: 50, menor: false, tapa: 0.0 },    // cierre: se abre
];
const escala = (menor) => (menor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11]);
const grado = (tr, g) => { const e = escala(tr.menor), o = Math.floor(g / 7); return tr.raiz + 12 + e[((g % 7) + 7) % 7] + 12 * o; };
// progresión i – VI – iv – V (en mayor: I – vi – IV – V), un acorde por compás
const PROG = [[0, 2, 4], [5, 7, 9], [3, 5, 7], [4, 6, 8]];

// cama: un acorde por compás, con conducción suave (el pad del kit, muy bajo)
for (const tr of TRAMOS) {
  const comp = BEAT * 4;
  for (let t = tr.a, k = 0; t < tr.b - 0.05; t += comp, k++) {
    const ac = PROG[k % 4].map((g) => grado(tr, g) - 12);
    m.pad(t, Math.min(tr.b, t + comp + 0.15), tr.vacio ? 0.03 : 0.042, ac, tr.tapa);
  }
}
// bajo: raíz en 1 y 3, con variación de figura cada 2 compases (y silencio en el re-gancho)
for (const tr of TRAMOS) {
  if (tr.vacio) continue;
  for (let t = tr.a, k = 0; t < tr.b - 0.3; t += BEAT, k++) {
    const comp = Math.floor(k / 4), pos = k % 4, r = grado(tr, PROG[comp % 4][0]) - 24;
    const figura = comp % 4 === 3 ? [0, 2, 3] : comp % 2 ? [0, 3] : [0, 2];
    if (figura.includes(pos)) m.bajo(t, pos === 3 ? r + 7 : r, 0.055, 0.5);
  }
}
// tema: motivo → respuesta → secuencia → cadencia (en grados de la escala; null = respiración)
const TEMA = [
  [[0, 1], [2, 0.5], [4, 0.5], [3, 1], [null, 1]],          // motivo
  [[4, 0.5], [3, 0.5], [2, 1], [1, 1], [null, 1]],          // respuesta
  [[1, 1], [3, 0.5], [5, 0.5], [4, 1], [null, 1]],          // secuencia (el motivo un grado arriba)
  [[3, 0.5], [2, 0.5], [1, 0.5], [-1, 0.5], [0, 2]],        // cadencia a la raíz
];
const frase = (tr, t0, i, oct = 0, g = 0.03, voz = 'nota') => { let t = t0;
  for (const [gr, d] of TEMA[i % 4]) { if (gr != null) { const n = grado(tr, gr) + oct;
    if (voz === 'nota') m.nota(t, n, g, d * BEAT * 1.6, tr.tapa); else m.bajo(t, n, g * 1.2, d * BEAT * 1.2); } t += d * BEAT; } };
// el tema entra por frases sueltas, siempre en otra altura o "instrumento", y nunca dos veces igual seguido
frase(TRAMOS[0], G + 0.2, 0, 12, 0.032);
frase(TRAMOS[0], G + 2.6, 1, 12, 0.028);
frase(TRAMOS[1], N1 + 0.8, 2, 0, 0.03);
frase(TRAMOS[1], N1 + 3.2, 3, 0, 0.03);
frase(TRAMOS[2], Pe + 0.4, 0, 0, 0.028);
frase(TRAMOS[2], Qu + 0.6, 1, -12, 0.04, 'bajo');           // la respuesta pasa al registro grave
frase(TRAMOS[2], Qu + 3.0, 2, 0, 0.026);
frase(TRAMOS[3], Br + 0.6, 0, 12, 0.022);                  // nivel 3: arriba, frágil, como luz
frase(TRAMOS[3], Ar + 0.6, 2, 0, 0.026);
frase(TRAMOS[3], Ar + 3.4, 3, -12, 0.04, 'bajo');
frase(TRAMOS[5], Ho + 0.6, 0, -12, 0.045, 'bajo');          // abismo: el tema en el bajo, tapado
frase(TRAMOS[5], La + 0.4, 1, 0, 0.022);
frase(TRAMOS[6], Se + 0.8, 2, -12, 0.045, 'bajo');
frase(TRAMOS[6], Ra + 0.6, 0, 0, 0.02);
frase(TRAMOS[6], Ra + 4.4, 1, -12, 0.04, 'bajo');
frase(TRAMOS[7], Ci + 0.3, 0, 12, 0.036);                   // cierre: el tema en mayor, arriba y abierto
frase(TRAMOS[7], Ci + 2.7, 3, 12, 0.034);
m.nota(Ou + 0.2, 62, 0.06, 3.0); m.nota(Ou + 0.2, 66, 0.05, 3.0); m.nota(Ou + 0.2, 69, 0.05, 3.0); m.nota(Ou + 0.25, 74, 0.04, 3.0);

/* ---------- efectos, en el mismo cuadro que la imagen ---------- */
m.whoosh(G, 0.9, 0.12); for (let i = 0; i < 6; i++) m.gota(G + 0.15 + i * 0.05, 0.08, 1200 + i * 120);       // ola y salpicadura
for (let k = 1; k < 3; k++) { m.whoosh(G + k * 2.2 - 0.1, 0.7, 0.07); for (let i = 0; i < 4; i++) m.gota(G + k * 2.2 + 0.15 + i * 0.05, 0.05, 1300 + i * 100); }
m.golpe(G + 0.4, 0.18, 120);                                                   // letrero LA PUNTA
for (let i = 0; i < 8; i++) m.burbuja(G + 0.5 + i * 0.3, 0.05, 300 + i * 40);    // crece el micelio bajo el agua
// «plunk» al cruzar cada nivel (más grave cada vez)
[[G + 3.4, 700], [N1 + 0.1, 620], [Pe + 0.25, 520], [Br + 0.35, 430], [Pr + 0.7, 360], [Se + 0.35, 300]].forEach(([t, f]) => { m.gota(t, 0.2, f); m.golpe(t, 0.12, 70); m.whoosh(t - 0.2, 0.6, 0.06); });
m.golpe(N1 + 0.2, 0.15, 110);                                                  // placa nivel 1
m.cruje(N1 + 2.5, 0.25); m.golpe(N1 + 2.5, 0.3, 70);                             // ✗ planta
for (let i = 0; i < 8; i++) m.burbuja(N1 + 3.5 + i * 0.22, 0.06, 420 + i * 30);  // la masa se infla
m.tic(N1 + 4.1, 0.2, 1500); m.nota(N1 + 4.7, 79, 0.03, 0.5);   // lupa y yema
m.golpe(Pe + 0.15, 0.15, 110); m.metal(Pe + 0.25, 0.08, 900);                   // placa y caja de Petri
m.sube(Pe + 0.4, 1.2, 55, 62, 0.025);                                          // crece la colonia
for (let i = 0; i < 10; i++) m.tic(Pe + 0.7 + i * 0.12, 0.05, 2200 + i * 80);   // bacterias
m.nota(Pe + 1.0, 74, 0.03, 0.8);                                               // halo limpio
m.nota(Qu + 1.0, 81, 0.03, 0.6);                                               // la pared brilla
for (let i = 0; i < 4; i++) m.tic(Qu + 1.4 + i * 0.3, 0.12, 900 + i * 150);     // anillos de quitina
m.golpe(Qu + 2.6, 0.15, 100); m.metal(Qu + 3.0, 0.06, 1300);                    // escarabajo y brillo del caparazón
m.golpe(Br + 0.15, 0.15, 110);
for (let i = 0; i < 8; i++) m.nota(Br + 1.6 + i * 0.2, [79, 81, 84, 86, 88, 86, 91, 93][i] - 1, 0.025, 0.7); // se encienden los hongos
for (let i = 0; i <= 10; i++) m.tic(Br + 2.0 + cruce(i / 10) * 1.2, 0.07, 1700); // contador +100
m.golpe(Ar + 0.2, 0.25, 85);                                                    // tarjeta 2003
for (let i = 0; i < 5; i++) m.sube(Ar + 1.2 + i * 0.8, 0.8, 38, 43, 0.03);       // el micelio pasa de raíz en raíz
m.golpe(Ar + 3.4, 0.2, 100); m.nota(Ar + 3.45, 69, 0.03, 0.9);                   // chip 9.65 km²
m.sube(Pr, 1.4, 50, 38, 0.05); m.whoosh(Pr + 0.1, 1.3, 0.12);                   // la cámara se hunde
m.golpe(Ho + 0.15, 0.15, 110);
for (let i = 0; i < 8; i++) m.tic(Ho + 0.9 + i * 0.16, 0.04, 2600);              // pasitos de la hormiga
m.cruje(Ho + 2.35, 0.35); m.golpe(Ho + 2.35, 0.25, 90);                          // mordida
m.golpe(Ho + 3.3, 0.2, 55);                                                     // ya muerta
m.sube(Ho + 4.0, 1.4, 40, 47, 0.04); m.cruje(Ho + 4.1, 0.15);                    // brota el tallo
m.zumbido(La + 0.1, 0.8, 0.03, 260);                                            // al microscopio
m.motor(La + 0.8, 1.4, 0.03);                                                  // el nematodo avanza
m.golpe(La + 2.25, 0.35, 70); m.burbuja(La + 2.25, 0.12, 200); m.burbuja(La + 2.4, 0.12, 180); // ¡se inflan y lo atrapan!
m.golpe(Se + 0.15, 0.15, 110);
for (let i = 0; i < 4; i++) m.tic(Se + 1.0 + i * 0.2, 0.08, 1100);              // abanicos
for (let i = 0; i <= 18; i++) m.tic(Se + 4.0 + cruce(i / 18) * 1.4, 0.06, 1500 + i * 30); // contador 23,000
m.golpe(Ra + 0.2, 0.25, 85);                                                    // tarjeta 2007
for (let i = 0; i < 26; i++) m.tic(Ra + 1.0 + i * 0.25 + m.rnd() * 0.15, 0.05, 3200); // chasquidos de radiación (contador Geiger)
m.sube(Ra + 2.0, 3.4, 36, 43, 0.03);                                            // crecen las colonias negras
m.nota(Ra + 5.7, 70, 0.03, 1.2);                                                // hipótesis
m.whoosh(Ci, 2.2, 0.1); m.sube(Ci + 0.2, 2.0, 46, 62, 0.04);                     // la cámara se aleja: todo se enciende
m.guardar(OUT, 1);
