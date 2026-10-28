// gen-audio.mjs — música + efectos del Ambiental #01 (vinazas). Sin costo: todo se sintetiza (motor/kit/audio-kit.mjs).
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (base narrada, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs la llama con la versión narrada; el workflow, con el mudo)
// Narrada: cama grave continua sin golpe + un efecto en el mismo cuadro de cada cosa que pasa.
// Mudo (M1): la música son los datos → 12 notas = 12 L de vinaza · pH 3–5 como notas · 20 toques = 20 L de agua
//   · la música se ahoga mientras baja el oxígeno · cada burbuja de biogás y cada seta que sale es una nota libre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vinazas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 9);
const K = m.K, E = m.ESC;

if (K.Caballito != null) {
  /* ---------- gemelo mudo ---------- */
  const C = K.Caballito, D = K.Doce, A = K.Acido, R = K.Rio, Re = K.Reactor, B = K.Bagazo, S = K.Setas, L = K.Loop, FIN = L + 6.5;
  // se sirve la jarra: 1 litro de tequila = 1 nota clara
  m.whoosh(C + 0.05, 0.9, 0.15); for (let k = 0; k < 6; k++) m.gota(C + 0.1 + k * 0.15, 0.12, 700 + k * 60);
  m.nota(C + 1.0, 69, 0.12, 1.6); m.nota(C + 1.0, 76, 0.07, 1.6);
  m.pad(C, D + 0.2, 0.04, [57, 64]);
  // 12 garrafas = 12 notas que bajan y se ahogan (cada litro de vinaza)
  for (let i = 0; i < 12; i++) { const t = D + 0.4 + i * 0.16; m.tic(t, 0.12, 1500); m.nota(t, E[11 - Math.min(11, i)] - 12, 0.11, 0.7, i / 12); }
  for (let i = 0; i < 12; i++) m.bajo(D + 3 + i * 0.45, 33, 0.14, 0.5);                     // 12 pulsos graves = 12 L
  m.pad(D, A + 0.3, 0.05, [33, 40], 0.5);
  // pH: 3, 4, 5 (vinaza, CIATEJ 2025) y 3.6 (naranja) → notas = 40 + 3·pH
  [3, 4, 5].forEach((ph, i) => m.nota(A + 0.8 + i * 0.25, Math.round(40 + 3 * ph), 0.12, 0.9, 0.4));
  m.nota(A + 1.6, Math.round(40 + 3 * 3.6) + 12, 0.1, 0.8);
  m.pad(A, R + 0.3, 0.045, [40, 47], 0.4);
  // río: la vinaza entra; cada burbuja de oxígeno es una nota y se van acabando; la música se ahoga
  m.whoosh(R + 0.5, 1.4, 0.16);
  for (let k = 0; k < 18; k++) { const t = R + 0.6 + k * 0.42, quedan = 1 - Math.max(0, (t - (R + 2.5)) / (Re - 1 - R - 2.5)); if (quedan > 0.05 && m.rnd() < quedan) m.burbuja(t, 0.12 * quedan, 600 + 400 * m.rnd()); }
  for (let k = 0; k < 8; k++) m.pad(R + k * 1.1, R + k * 1.1 + 1.3, 0.05, [45, 52], Math.min(1, k / 6));
  for (let i = 0; i < 20; i++) m.tic(R + 3.5 + i * 0.12, 0.05, 900);                       // 20 L de agua
  // reactor: cada burbuja de biogás, una nota libre de la pentatónica
  m.pad(Re, B + 0.3, 0.045, [45, 52, 57]);
  for (let k = 0; k < 30; k++) { const t = Re + 0.8 + k * 0.27; m.nota(t, E[Math.floor(m.rnd() * 10) + 2], 0.06, 0.5); m.burbuja(t, 0.07, 500 + 500 * m.rnd()); }
  m.whoosh(Re + 1.4, 0.8, 0.18);
  for (let i = 0; i < 8; i++) m.bajo(Re + 0.8 + i * 1.0, 45, 0.11, 0.6);
  // bagazo: molino y fibras
  m.motor(B + 0.4, 4.5, 0.06); m.cruje(B + 2.0, 0.6); m.cruje(B + 3.2, 0.4);
  m.pad(B, S + 0.3, 0.04, [43, 50, 55]);
  // setas: cada seta que sale suena cuando aparece (mismo cálculo que el dibujo)
  const c0 = S + 0.3, c1 = L - 0.5;
  for (let f = 0; f < 2; f++) for (let i = 0; i < 4; i++) for (let i2 = 0; i2 < 3; i2++) for (let j = 0; j < 3; j++) {
    const b = f * 4 + i, th = i2 * 0.2 + j * 0.06, c = (th + b * 0.06) / 1.3; if (c > 1) continue;
    m.nota(c0 + c * (c1 - c0) + 0.05, E[Math.min(14, 4 + Math.round(c * 9) + (j % 2))], 0.05, 0.6);
  }
  m.pad(S, L + 0.3, 0.045, [45, 52, 57, 64]);
  // loop: la jarra se vacía y vuelve a ser el primer cuadro
  m.sube(L + 0.2, 1.4, 64, 57, 0.06); m.pad(L, FIN, 0.04, [57, 64]); m.nota(FIN - 0.9, 69, 0.08, 0.9);
} else {
  /* ---------- narrada ---------- */
  const G = K.Gancho, Al = K.Alambique, D = K.Doce, A = K.Acida, R = K.Rio, P = K.Pregunta, Re = K.Reactor, Es = K.Estudio, B = K.Bagazo, S = K.Setas, Gr = K.Granja, C = K.Cierre, Ou = K.Outro;
  m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  m.pad(Re, Es, 0.03, [40, 47]);                                                             // dentro del reactor: más grave
  // gancho: se sirve la jarra de 1 L; aparecen las 12 garrafas
  m.whoosh(G + 0.05, 0.9, 0.15); for (let k = 0; k < 5; k++) m.gota(G + 0.1 + k * 0.16, 0.1, 700 + k * 70);
  for (let i = 0; i < 12; i++) { m.tic(G + 2.4 + i * 0.16, 0.1, 1400); m.nota(G + 2.4 + i * 0.16, E[11 - i] - 12, 0.05, 0.4); }
  // alambique: fuego, gotas de tequila y chorro de vinaza
  m.whoosh(Al, 1.2, 0.12); for (let k = 0; k < 7; k++) m.gota(Al + 0.9 + k * 0.7, 0.12, 1000);
  for (let k = 0; k < 10; k++) m.gota(Al + 1.9 + k * 0.25, 0.06, 450);
  // doce: 12 garrafas, 12 notas que bajan
  for (let i = 0; i < 12; i++) m.nota(D + 0.95 + i * 0.22, E[11 - i] - 12, 0.06, 0.45);
  // ácida: marcador de pH, naranja y 20 L de agua que se manchan
  m.golpe(A + 0.5, 0.3, 70); m.tic(A + 0.9, 0.2, 2600); for (let i = 0; i < 20; i++) m.tic(A + 2.4 + i * 0.07, 0.06, 900);
  // río: entra la vinaza, la lupa se abre, el oxígeno se acaba
  m.whoosh(R + 0.3, 1.2, 0.15); m.sube(R + 0.9, 0.6, 64, 79, 0.06); m.sube(R + 1.8, P - R - 2.2, 64, 50, 0.05);
  for (let k = 0; k < 6; k++) m.burbuja(R + 0.4 + k * 0.35, 0.08);
  // pregunta
  m.sube(P + 0.1, 1.6, 52, 64, 0.05);
  // reactor: burbujas de biogás y la flama
  for (let k = 0; k < 16; k++) m.burbuja(Re + 0.8 + k * 0.28, 0.08, 400 + 500 * m.rnd()); m.whoosh(Re + 1.5, 0.8, 0.16);
  // estudio: tarjeta y 4 productos
  m.golpe(Es + 0.2, 0.35, 80); for (let i = 0; i < 4; i++) m.nota(Es + 2.0 + i * 0.5, E[4 + i * 2], 0.07, 0.8);
  // bagazo: molino que exprime
  m.motor(B + 0.8, 2.8, 0.06); m.cruje(B + 1.6, 0.5); for (let k = 0; k < 8; k++) m.gota(B + 1.2 + k * 0.25, 0.05, 1100);
  // setas: tarjeta y setas que salen
  m.golpe(S + 0.1, 0.3, 80); for (let k = 0; k < 9; k++) m.nota(S + 1.0 + k * 0.35, E[3 + k], 0.04, 0.5);
  // granja: repisas que se llenan
  for (let k = 0; k < 8; k++) m.nota(Gr + 0.3 + k * 0.5, E[5 + (k % 5)], 0.04, 0.6);
  // cierre: las 12 garrafas otra vez, ahora con lo que se les saca
  for (let i = 0; i < 12; i++) m.tic(C - 1 + i * 0.16, 0.08, 1400);
  m.nota(C + 2.2, 57, 0.07, 1.6); m.nota(C + 2.2, 64, 0.06, 1.6); m.nota(C + 2.2, 69, 0.05, 1.6);
  m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
}
m.guardar(OUT, K.Outro == null ? 1.9 : 1);
