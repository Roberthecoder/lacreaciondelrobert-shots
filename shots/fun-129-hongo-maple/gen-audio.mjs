// gen-audio.mjs — música y efectos del Shot Fungi Mati #129 (hongo que huele a maple). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
//
// Composición (maestro/recetas/composicion-musical.md): «Desayuno con misterio», 96 BPM, compás de 4/4 (2.5 s).
//   A  (gancho → pregunta)      Fa mayor, I–V6–vi–IV: tema propio de 2 frases (motivo → respuesta) sobre arpegio cálido.
//   B  (1985 → la molécula)     Re menor, i–VI–iv–V: el tema en menor, arpegio más ralo; destellos agudos en cada átomo.
//   B' (gemela → sotolón)       secuencia del motivo un tono arriba, el bajo camina.
//   C  (primo tóxico → cuidado) se vacía: solo bajo y acordes largos, tensión en V.
//   A' (cierre)                 regresa el tema completo una octava arriba y resuelve en Fa con el acorde sonando.
// Ningún patrón se repite más de 4 compases: cada 2–4 compases cambia el arpegio, la frase o el acorde.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hongo Maple base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 129);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Fr = K.Fresco, S = K.Seco, P = K.Pregunta, Es = K.Estudiante, A = K.Anios, Ga = K.Gas, Hi = K.Hipotesis,
  Ge = K.Gemela, So = K.Sotolon, Pr = K.Primo, O = K.Orina, Cu = K.Cuidado, C = K.Cierre, Ou = K.Outro;

const BEAT = 60 / 96;                        // 0.625 s
const hum = () => (m.rnd() - 0.5) * 0.024;    // ±12 ms: que no suene a máquina
const vel = (g) => g * (0.82 + m.rnd() * 0.3);
// nota "de piano": dos parciales ligeramente desafinados para que respire
const pno = (t, mm, g, d) => { m.nota(t + hum(), mm, vel(g), d); m.nota(t + 0.004, mm + 12, vel(g) * 0.18, d * 0.6); };

// acordes (voicing cercano: cada voz va a la nota más próxima del siguiente)
const ACORDES = {
  F:  { b: 41, v: [57, 60, 65] }, 'C/E': { b: 40, v: [55, 60, 64] }, Dm: { b: 38, v: [57, 62, 65] }, Bb: { b: 46, v: [58, 62, 65] },
  Gm: { b: 43, v: [58, 62, 67] }, A:  { b: 45, v: [57, 61, 64] }, A7: { b: 45, v: [55, 61, 64] }, C: { b: 48, v: [55, 60, 64] },
  Eb: { b: 39, v: [58, 63, 67] }, Gm7: { b: 43, v: [58, 62, 65] },
};
// patrones de arpegio (índices: 0 bajo+8va, 1..3 voces), en corcheas
const ARP = {
  calido: [0, 1, 2, 3, 2, 1, 2, 3],
  ola:    [0, 2, 1, 3, 1, 2, 3, 2],
  ralo:   [0, -1, 2, -1, 1, -1, 3, -1],
  largo:  [0, -1, -1, -1, -1, -1, -1, -1],
};
function compas(t0, nombre, patron, g = 0.045, bajoG = 0.07) {
  const a = ACORDES[nombre];
  m.bajo(t0 + hum(), a.b, vel(bajoG), BEAT * (patron === 'largo' ? 4 : 2));
  if (patron !== 'largo') m.bajo(t0 + BEAT * 2 + hum(), a.b + (m.rnd() < 0.5 ? 7 : 12), vel(bajoG * 0.7), BEAT * 1.6);
  ARP[patron].forEach((ix, k) => { if (ix < 0) return; const mm = ix === 0 ? a.b + 24 : a.v[ix - 1];
    pno(t0 + k * BEAT / 2, mm, g * (k % 2 ? 0.75 : 1), patron === 'largo' ? BEAT * 4 : BEAT * 1.2); });
  if (patron === 'largo') a.v.forEach((mm) => pno(t0 + 0.02, mm, g * 0.8, BEAT * 4));
}
// el tema: frases de 4 compases [beat, nota, duración en beats]
const MOTIVO   = [[0, 69, 1], [1, 72, 1], [2, 74, 1.5], [3.5, 72, 0.5], [4, 69, 1], [5, 67, 1], [6, 65, 2]];          // A C D C | A G F
const RESPUESTA = [[0, 67, 1], [1, 69, 1], [2, 70, 1.5], [3.5, 69, 0.5], [4, 67, 1], [5, 64, 1], [6, 60, 2]];       // G A Bb A | G E C
const CADENCIA = [[0, 70, 1], [1, 69, 1], [2, 67, 1], [3, 64, 1], [4, 65, 4]];                                     // Bb A G E | F
const menor = (fr, dt = 0) => fr.map(([b, n, d]) => [b, n + dt, d]);   // el tema llevado a Re menor (−7: A C D C A G F → D F G F D C Sib)
function frase(t0, fr, g = 0.06, oct = 0) { fr.forEach(([b, n, d]) => { m.nota(t0 + b * BEAT + hum(), n + oct, vel(g), d * BEAT * 1.1); }); }

// ---------- cama continua (debajo de todo) ----------
m.pad(0, Es, 0.03, [41, 48, 57], 0);
m.pad(Es, Pr, 0.03, [38, 45, 53], 0.15);
m.pad(Pr, C, 0.032, [38, 45, 52], 0.3);
m.pad(C, Ou + 3.5, 0.03, [41, 48, 57], 0);

// ---------- A: desayuno (Fa mayor) ----------
const BAR = BEAT * 4;
const progA = ['F', 'C/E', 'Dm', 'Bb', 'F', 'C/E', 'Bb', 'C'];
for (let i = 0; i < 6; i++) { const t = G + i * BAR; if (t > Es - 0.2) break; compas(t, progA[i], i < 2 ? 'calido' : i < 4 ? 'ola' : 'calido', 0.04); }
frase(G + BAR * 0.5, MOTIVO.slice(0, 5), 0.05);          // asoma el motivo (sin terminar: la voz manda)
frase(H + 0.2, RESPUESTA, 0.045);                          // respuesta en el bosque
frase(S + 0.5, MOTIVO, 0.05, 12);                          // al secarse, el tema sube una octava (el olor "se abre")

// ---------- B: la pregunta y el laboratorio (Re menor) ----------
const progB = ['Dm', 'Bb', 'Gm', 'A', 'Dm', 'Bb', 'Gm7', 'A7', 'Dm', 'Eb', 'Gm', 'A'];
for (let i = 0; i < 12; i++) { const t = Es + i * BAR; if (t > Pr - 0.2) break; compas(t, progB[i], i < 4 ? 'ralo' : i < 6 ? 'ola' : i < 8 ? 'ralo' : 'calido', 0.035, 0.065); }
frase(Es + 0.3, menor(MOTIVO, -7).slice(0, 4), 0.04);   // el motivo en menor, a media voz
frase(Hi + 0.2, menor(RESPUESTA, -5), 0.04);
frase(Ge + 0.3, MOTIVO.map(([b, n, d]) => [b, n + 2, d]).slice(0, 5), 0.045);  // secuencia un tono arriba (la gemela)

// ---------- C: el primo tóxico y el cuidado (se vacía) ----------
const progC = ['Gm', 'Eb', 'A', 'A7', 'Dm', 'C'];
for (let i = 0; i < 6; i++) { const t = Pr + i * BAR; if (t > C - 0.2) break; compas(t, progC[i], i % 2 ? 'largo' : 'ralo', 0.03, 0.06); }

// ---------- A': cierre (regresa el tema arriba y resuelve) ----------
compas(C, 'Bb', 'calido', 0.04); compas(C + BAR, 'C', 'ola', 0.04);
frase(C + 0.1, CADENCIA, 0.055, 12);
compas(Ou + 0.1, 'F', 'largo', 0.05, 0.08);
m.nota(Ou + 0.3, 77, 0.04, 3.0); m.nota(Ou + 0.3, 81, 0.03, 3.0);

// ---------- efectos, en el mismo cuadro que lo que pasa ----------
m.whoosh(G + 0.1, 0.9, 0.08);                                         // cae el chorro de jarabe
for (let i = 0; i < 4; i++) m.gota(G + 0.9 + i * 0.22, 0.1, 520 + i * 40); // escurre por los hot cakes
m.whoosh(G + 1.8, 0.6, 0.1); m.golpe(G + 2.35, 0.25, 90);              // entra el frasco de hongos secos
m.sube(H - 0.2, 1.0, 43, 50, 0.03); m.tic(H + 0.5, 0.15, 1300); m.tic(H + 0.9, 0.15, 1500); // brota el hongo, etiquetas
m.gota(Fr + 0.3, 0.12, 1200);                                         // gotita de látex aguado
m.cruje(S + 0.2, 0.25);                                               // se seca y se arruga
m.sube(S + 0.2, 1.2, 55, 67, 0.03);                                   // sube el medidor de olor
m.tic(S + 1.8, 0.15, 1200); m.tic(S + 2.0, 0.15, 1400);               // galleta y helado
m.sube(P + 0.05, 1.4, 52, 62, 0.035);                                 // re-gancho
m.golpe(Es + 0.9, 0.3, 80);                                           // tarjeta 1985
for (let i = 0; i < 27; i++) m.tic(A + 0.1 + i * 0.058, 0.05, 1700 + (i % 3) * 200); // corre el calendario (27 años)
m.golpe(A + 1.65, 0.25, 110);
m.metal(Ga + 0.2, 0.08, 1100);                                        // baja la fibra
for (let i = 0; i < 8; i++) m.burbuja(Ga + 0.7 + i * 0.25, 0.05, 500 + i * 40); // moléculas al aire
m.sube(Ga + 1.2, 1.4, 60, 72, 0.025);                                 // dibuja el cromatograma
m.golpe(Ga + 1.0, 0.25, 80);                                          // tarjeta 2012
for (let i = 0; i < 6; i++) m.nota(Ga + 3.2 + i * 0.2, 81 + [0, 3, 5, 7, 10, 12][i], 0.03, 0.5); // se arma la molécula átomo por átomo
for (let i = 0; i < 6; i++) m.burbuja(Hi + 0.3 + i * 0.12, 0.05, 420 + i * 60); // aminoácidos que se juntan
m.nota(Ge + 1.4, 86, 0.04, 0.9); m.tic(Ge + 1.45, 0.15, 2200);       // clic NH₂ ↔ OH
m.whoosh(So + 2.4, 1.2, 0.06);                                        // la molécula vuela del fenogreco al maple
m.tic(Pr + 0.2, 0.12, 900); m.sube(Pr + 0.8, 0.8, 40, 47, 0.035);     // brota el primo (más grande)
m.golpe(Pr + 3.25, 0.4, 60);                                          // señal de advertencia
m.tic(O + 0.3, 0.12, 2600); m.tic(O + 0.45, 0.1, 2800);               // cucharita en la taza
m.golpe(O + 0.6, 0.25, 80);                                           // tarjeta 1999
m.whoosh(O + 2.2, 0.5, 0.06);                                         // entra el portapapeles
m.cruje(O + 4.6, 0.25); m.golpe(O + 4.6, 0.45, 60);                   // sello FALSO
for (let i = 0; i < 4; i++) m.tic(Cu + i * 0.12, 0.08, 1100);         // brotan los hongos silvestres
m.golpe(Cu + 0.6, 0.4, 60);                                           // ¡OJO!
m.metal(C + 0.4, 0.06, 900);                                          // se abre el frasco
m.guardar(OUT, 1);
