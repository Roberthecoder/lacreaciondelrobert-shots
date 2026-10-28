// gen-audio.mjs — música y efectos de Químico #02 (estriado por agotamiento). Sin costo: todo se sintetiza.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (base narrada: cama grave + efectos, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// Mudo (M2, 5 errores): la música cuenta el estado y el AGOTAMIENTO mismo:
//   · cada colonia que aparece = una nota. Zona 1 = racimo encimado (un acorde ruidoso), zona 2 = 70 colonias, zona 3 = 22,
//     zona 4 = 7 → al hacerlo bien la música se va vaciando hasta notas sueltas (como las células).
//   · en cada error la música va TAPADA y con una nota disonante; con el asa caliente no crece nada: silencio.
//   · cada pasada del asa = un raspado; cada flameo = chisporroteo; las gotas de la tapa = gotas.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearAudio } from '../../motor/kit/audio-kit-lote-d.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estriado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const A = crearAudio(HERE, HTML), K = A.K, ESC = A.ESC;
const CUANTAS = [260, 70, 22, 7];                      // colonias por zona (las mismas de kEstriado en el kit)
// colonias de una zona que aparecen en [t, t + 0.6]: una nota cada una (la zona 1 se agrupa en un racimo)
const colonias = (t, q, g = 0.05, mult = 1) => {
  if (q === 0) { [45, 46, 52, 53, 57].forEach((m) => A.nota(t, m + 12, 0.04 * mult, 0.8)); A.raspa(t, 0.5, 0.06); return; }
  const n = CUANTAS[q]; for (let k = 0; k < n; k++) A.campana(t + 0.6 * (k / n), ESC[(k * 3 + q * 4) % 15], g * (q === 3 ? 1.6 : q === 2 ? 1 : 0.55) * mult, q === 3 ? 1.4 : 0.6);
};

if (K.Intro != null) {
  /* ---------- MUDO ---------- */
  const ERR = ['Caliente', 'Clavar', 'Flamear', 'Regresar', 'Boca'], B = K.Bien, F = K.Outro;
  A.pad(0, F + 3.5, 0.045, [45, 52, 57]);
  ERR.forEach((e, i) => {
    const a = K[e];
    A.pad(a, a + 9, 0.03, [46, 52]);                                    // disonancia (si bemol contra mi)
    A.tapar(a + 0.1, a + 8.9, 380);                                      // el problema: música ahogada
    A.golpe(a, 0.25, 60);
    [[0.6, 1.4], [1.5, 2.2], [2.3, 3.0], [3.1, 4.0]].forEach(([t0, t1]) => A.raspa(a + t0, t1 - t0, e === 'Clavar' ? 0.22 : 0.1));
    if (e === 'Caliente') A.chisporroteo(a + 0.6, 3.6, 0.2);
    if (e === 'Boca') for (let k = 0; k < 10; k++) A.gota(a + 4.4 + k * 0.15, 0.15);
    // incubar 48 h: tic de reloj
    for (let k = 0; k < 6; k++) A.tic(a + 4.3 + k * 0.25, 0.05, 1200);
    // colonias (salvo con el asa caliente: nada crece)
    if (e !== 'Caliente') for (let q = 0; q < 4; q++) { const dens = e === 'Flamear' || (e === 'Regresar' && q === 3); colonias(a + 4.3 + q * 0.12, dens ? 0 : q, 0.04, 0.8); }
    A.whoosh(a + 6, 0.5, 0.14);                                          // la X
  });
  // así sí: flameo entre zonas y la música se vacía zona por zona
  [[0.3, 1], [1.3, 1.9], [2.2, 2.8], [3.1, 3.8]].forEach(([t0, t1]) => A.raspa(B + t0, t1 - t0, 0.1));
  [1.05, 1.95, 2.85].forEach((d) => A.chisporroteo(B + d, 0.25, 0.12));
  for (let q = 0; q < 4; q++) colonias(B + 4.4 + q * 0.4, q, 0.05, 1);
  [57, 64, 69, 76].forEach((m, i) => A.campana(B + 7 + i * 0.2, m, 0.06, 2));
  [57, 64, 69].forEach((m) => A.nota(F + 0.3, m, 0.07, 2.8));
} else {
  /* ---------- NARRADA ---------- */
  const { Gancho: G, Material: M, Cuad1: C1, Cuad2: C2, Cuad3: C3, Pregunta: P, Cuad4: C4, Errores: Er, Estudio: E, Extra: X, Cierre: Ci, Outro: O } = K;
  A.pad(0, O + 3.5, 0.05, [45, 52, 57]);
  [[0.05, 0.9], [0.9, 1.6], [1.6, 2.3], [2.3, 3.0]].forEach(([t0, t1]) => A.raspa(G + t0, t1 - t0, 0.1));
  for (let q = 0; q < 4; q++) colonias(G + 3.2 + q * 0.2, q, 0.03, 0.6);
  [0.3, 1.4, 2.4].forEach((d, i) => { A.pop(M + d, 0.2); A.nota(M + d, ESC[4 + i], 0.05, 0.6); }); A.chisporroteo(M + 3.6, 0.8, 0.12);
  A.raspa(C1 + 0.4, 2.8, 0.08); A.whoosh(C1 + 2.4, 0.5, 0.12);
  A.chisporroteo(C2 + 0.2, 1.2, 0.14); A.raspa(C2 + 1.6, 2.4, 0.08);
  A.chisporroteo(C3 + 0.1, 1.2, 0.14); A.raspa(C3 + 1.2, 2.4, 0.08);
  A.whoosh(P, 0.4, 0.1);
  A.raspa(C4 + 0.1, 2.1, 0.08); for (let k = 0; k < 8; k++) A.tic(C4 + 2.4 + k * 0.25, 0.04, 1200);
  for (let q = 0; q < 4; q++) colonias(C4 + 3 + q * 0.3, q, 0.04, 0.7);
  [0.6, 2.2, 3.8].forEach((d) => { A.pop(Er + d, 0.2); A.raspa(Er + d + 0.6, 0.3, 0.1); });
  A.golpe(E + 0.2, 0.35, 80); for (let q = 0; q < 4; q++) colonias(E + 3.4 + q * 0.4, q, 0.04, 0.7);
  for (let k = 0; k < 10; k++) A.gota(X + 0.3 + k * 0.4, 0.07); A.whoosh(X + 1.2, 0.5, 0.12);
  A.whoosh(Ci, 0.6, 0.14); for (let k = 0; k < 6; k++) A.nota(Ci + 0.4 + k * 0.25, ESC[10 - k], 0.04, 0.5);
  [57, 64, 69].forEach((m) => A.nota(O + 0.3, m, 0.07, 2.8));
}
A.guardar(OUT, K.Intro != null ? 1.8 : 1);
