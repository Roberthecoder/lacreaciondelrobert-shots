// gen-audio.mjs — cama + efectos del Shot Fungi Mati #107 (la «semilla» de hongo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): ~100 BPM, compás de 2.4 s. Un motivo de 4 notas que cambia cada compás (directo,
// invertido, en secuencia, con respuesta) sobre una progresión que avanza; se ahoga en las esporas «impredecibles» y se
// abre en la cascada de lotes y en el cierre. Siempre debajo de la voz, sin golpe marcado.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Semilla Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 107);
const K = m.K;
const G = K.Gancho, S = K.Spawn, L = K.Lupa, Es = K.Esporas, Cl = K.Clon, R = K.Receta, Lo = K.Lotes, P = K.Pregunta, E = K.Estudio, Ro = K.Robert, D = K.Dato, C = K.Cierre, Ou = K.Outro;
const E2 = Es + 3.72, E9 = E + 4.41;

/* ---------- música ---------- */
// Acordes (bajo + cama) por compás; cambian cada compás y la forma no se repite igual más de 4 compases.
const ACORDES = { Am: [45, 52, 57], F: [41, 48, 57], C: [48, 52, 55], G: [43, 50, 55], Dm: [38, 45, 53], E: [40, 47, 56], Fmaj7: [41, 48, 52] };
const PROG = ['Am', 'F', 'C', 'G', 'Am', 'F', 'Dm', 'E', 'Am', 'Fmaj7', 'C', 'G', 'F', 'G', 'Am', 'E', 'F', 'C', 'G', 'Am', 'Dm', 'G', 'C', 'Am', 'F', 'G'];
// Variantes del motivo (grados de la pentatónica ESC desde una nota de partida) y su ritmo en pulsos de 0.6 s.
const MOTIVO = [
  { g: [0, 1, 2, 4], r: [0, 0.5, 1, 2] },          // tema
  { g: [4, 2, 1, 0], r: [0, 0.5, 1, 2] },          // invertido
  { g: [1, 2, 3, 5], r: [0, 0.5, 1, 2.5] },        // secuencia (un grado arriba)
  { g: [0, 1, 2, 1, 0], r: [0, 0.5, 1, 1.5, 2.5] },// respuesta que regresa
  { g: [2, 0, 1, 4], r: [0, 1, 1.5, 2] },          // otro ritmo
  { g: [0, 2, 4, 5], r: [0, 0.75, 1.5, 2.25] },    // sube abierto
];
const COMPAS = 2.4, FIN_VOZ = Ou;
const nComp = Math.ceil(FIN_VOZ / COMPAS);
for (let i = 0; i < nComp; i++) {
  const t = i * COMPAS, ac = ACORDES[PROG[i % PROG.length]];
  const tenso = t >= Es && t < Cl;                    // esporas impredecibles: se ahoga
  const abierto = (t >= Lo && t < P) || t >= C;        // cascada de lotes y cierre: se abre
  const estudio = t >= E && t < Ro;
  m.pad(t, Math.min(t + COMPAS + 0.05, FIN_VOZ + 0.5), abierto ? 0.05 : 0.042, ac, tenso ? 0.55 : 0);
  m.bajo(t, ac[0], 0.05, 1.6);              // pulso grave, suave
  if (i % 4 === 3) m.bajo(t + 1.8, ac[1] - 12, 0.035, 0.6); // respiración al final de cada frase
  // el motivo: una variante distinta cada compás, en ciclo de 6, transportado por el acorde
  const v = MOTIVO[(i + (i >> 2)) % MOTIVO.length];
  const base = m.ESC.indexOf(ac[2] + 12) >= 0 ? m.ESC.indexOf(ac[2] + 12) : (estudio ? 4 : 5);
  if (i % 8 === 7) continue;                           // un compás de silencio del motivo cada 8 (respira)
  v.g.forEach((gr, k) => {
    const idx = Math.max(0, Math.min(m.ESC.length - 1, base + gr + (abierto ? 2 : 0)));
    m.nota(t + v.r[k] * 0.6, m.ESC[idx], abierto ? 0.04 : 0.032, 0.55, tenso ? 0.6 : 0);
  });
  if (i % 2 === 1) m.nota(t + 1.8, ac[1] + 12, 0.022, 0.9, tenso ? 0.6 : 0);   // contestación de otra voz
}

/* ---------- efectos (en el mismo cuadro que la imagen) ---------- */
m.whoosh(G + 0.15, 0.6, 0.08); m.tic(G + 0.9, 0.35, 700); m.tic(G + 0.95, 0.15, 1200);   // se cae un grano y rebota
m.tic(G + 0.2, 0.2, 1600); m.cruje(G + 1.7, 0.25); m.golpe(G + 2.0, 0.3, 110);           // «¿echados a perder?» tachado · «semilla»
m.golpe(S + 0.1, 0.4, 70);                                                               // SPAWN
m.tic(S + 0.6, 0.25, 900); m.nota(S + 1.4, 64, 0.04, 0.4); m.sube(S + 1.4, 1.0, 60, 72, 0.03); // grano · + · crece el micelio
m.tic(S + 2.3, 0.2, 1100); m.nota(S + 2.6, 76, 0.05, 0.8);                              // = spawn (se pone blanco)
m.golpe(S + 3.0, 0.3, 60); m.tic(S + 3.0, 0.2, 2200);                                    // esporas: 0
m.whoosh(L + 0.3, 0.7, 0.1);                                                             // entra la lupa
for (let i = 0; i < 10; i++) m.burbuja(L + 0.7 + i * 0.25, 0.04, 700 + i * 40);          // crecen las hifas
m.tic(L + 2.0, 0.2, 1800); m.nota(L + 2.05, 81, 0.035, 0.5);                             // hifa con septos
for (let i = 0; i < 16; i++) m.tic(Es + 1.0 + ((i * 0.071) % 0.6), 0.08, 2600 + (i % 4) * 250); // caen las esporas
m.sube(Es + 1.8, 1.6, 55, 60, 0.03);                                                     // dos germinan
m.golpe(Es + 2.2, 0.3, 55);                                                              // germinan muy mal
[0, 1, 2, 3].forEach((i) => m.nota(E2 + 0.6 + i * 0.3, [62, 66, 71, 61][i], 0.05, 0.5)); // cuatro hongos distintos (no combinan)
m.golpe(E2 + 1.4, 0.25, 70);                                                             // resultado impredecible
m.metal(Cl + 0.6, 0.1, 1500); m.whoosh(Cl + 0.7, 0.8, 0.06);                             // se corta el tejido y viaja
m.burbuja(Cl + 1.6, 0.08, 500); m.burbuja(Cl + 2.0, 0.07, 560);                          // crece la colonia
[0, 1, 2].forEach((i) => m.nota(Cl + 2.7 + i * 0.15, 69, 0.05, 0.5));                    // tres iguales: el clon (misma nota)
m.tic(Cl + 2.8, 0.2, 1500);
[0, 1, 2].forEach((i) => m.metal(R + 0.75 + i * 0.25, 0.07, 1100 + i * 90));             // entran los frascos
m.tic(R + 0.4, 0.2, 1500); m.tic(R + 1.2, 0.15, 1700);                                   // chips
m.sube(R + 0.9, 1.7, 48, 60, 0.035); for (let i = 0; i < 8; i++) m.tic(R + 0.9 + i * 0.21, 0.07, 3000); // sube a 121 °C
m.whoosh(R + 2.2, 1.4, 0.07); m.zumbido(R + 2.3, 1.6, 0.025, 520);                       // vapor
m.nota(Lo + 0.45, 69, 0.05, 0.5);                                                        // 1 frasco
[0, 1, 2].forEach((i) => m.nota(Lo + 1.55 + i * 0.1, 72 + i * 2, 0.045, 0.5));           // 3 frascos
[0, 1].forEach((i) => m.nota(Lo + 2.65 + i * 0.15, 79 + i * 2, 0.05, 0.8));              // bolsas
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                                      // re-gancho
for (let i = 0; i < 6; i++) m.golpe(E + 0.15 + i * 0.11, 0.18, 60 + i * 4);              // ladrillos de estiércol
m.whoosh(E + 2.4, 0.6, 0.06);                                                            // llegan los frascos
for (let i = 0; i < 10; i++) m.tic(E9 + i * 0.14, 0.08, 1400 + i * 120);                 // carrera: el grano se blanquea
m.nota(E9 + 1.45, 76, 0.05, 0.6); m.golpe(E9 + 1.5, 0.35, 80);                           // tarjeta 1932
m.tic(E9 + 3.4, 0.2, 1500); m.nota(E9 + 3.45, 81, 0.04, 0.8);                            // hoy: casi todo
m.zumbido(Ro + 0.6, 1.9, 0.02, 880); for (let i = 0; i < 9; i++) m.tic(Ro + 0.7 + i * 0.2, 0.05, 2400); // la olla silba
for (let i = 0; i < 10; i++) m.tic(Ro + 2.7 + i * 0.12, 0.05, 3200);                     // caen esporas rosas
m.burbuja(Ro + 3.3, 0.08, 520); m.nota(Ro + 3.6, 72, 0.05, 0.9);                         // nace su cepa
m.whoosh(D + 0.3, 1.2, 0.06); m.tic(D + 0.3, 0.2, 1500);                                 // nube de esporas · chip
for (let i = 0; i < 18; i++) m.tic(D + 2.6 + 2.2 * Math.sqrt(i / 18), 0.07, 2000 + i * 60); // contador hasta 40 millones
m.nota(D + 4.8, 81, 0.05, 1.0);
m.whoosh(C + 0.4, 0.9, 0.08);                                                            // se levanta el frasco
for (let i = 0; i < 20; i++) m.tic(C + 1.3 + i * 0.09, 0.05, 1600 + (i % 5) * 200);      // cae el grano en la bolsa
m.tic(C + 1.4, 0.18, 1300);
m.pad(Ou, Ou + 3.5, 0.045, ACORDES.Am);
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8); m.nota(Ou + 0.6, 76, 0.035, 2.4);
m.guardar(OUT, 1);
