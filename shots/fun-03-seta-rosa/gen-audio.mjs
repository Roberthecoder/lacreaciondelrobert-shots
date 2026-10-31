// gen-audio.mjs — música y efectos de Fungi Mati #03 (la seta rosa). Sin costo: todo se sintetiza.
// Uso: node gen-audio.mjs                      → assets/mezcla.wav (base narrada: cama grave + efectos, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// Narrada: cama grave continua SIN golpe + un efecto por cada cosa en pantalla.
// Mudo (77 días en 61.5 s): la música sale de los datos reales del cultivo de Robert:
//   · 1 toque por cada día (77 toques; su altura sube con el día) · 1 acorde por cada etapa con fecha real
//   · música TAPADA (filtro) mientras el micelio crece a oscuras (placa → bolsa); se ABRE al salir los primordios
//   · las esporas de la esporada suenan como gotitas
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearAudio } from '../../motor/kit/audio-kit-lote-d.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Seta Rosa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const A = crearAudio(HERE, HTML), K = A.K, ESC = A.ESC;

if (K.Racimo != null) {
  /* ---------- MUDO ---------- */
  const { Racimo: Ra, Esporada: E, Placa: Pl, Grano: G, Bolsa: B, Primordios: Pr, Cosecha: C, Outro: F } = K;
  A.pad(0, F + 3.5, 0.045, [45, 52, 57]);
  // días: mismo reparto que el contador del video (cada día suena cuando el número cambia)
  const tramo = [[E, 0], [Pl, 1], [G, 40], [B, 54], [Pr, 75], [C, 77]];
  for (let i = 0; i < tramo.length - 1; i++) { const [t0, d0] = tramo[i], [t1, d1] = tramo[i + 1];
    for (let d = d0 + 1; d <= d1; d++) { const t = t0 + 0.5 + (t1 - 0.3 - t0 - 0.5) * ((d - d0 - 0.5) / (d1 - d0)); A.nota(t, ESC[Math.min(14, Math.floor(d / 77 * 12))], 0.05, 0.3); } }
  // un acorde por etapa con fecha
  [[Ra, 45], [E, 48], [Pl, 50], [G, 52], [B, 53], [Pr, 57], [C, 45]].forEach(([t, m]) => { A.bajo(t + 0.1, m, 0.1, 1.6); A.campana(t + 0.1, m + 24, 0.04, 1.6); });
  // esporas que caen (racimo) y esporada
  for (let i = 0; i < 24; i++) A.gota(Ra + 0.3 + i * 0.22, 0.06);
  A.whoosh(E + 1.6, 0.6, 0.12);
  // a oscuras: la música se tapa mientras el micelio come (placa → bolsa)
  A.tapar(Pl, Pr + 0.4, 380);
  // primordios: se abre todo; brillo que sube
  A.sube(Pr + 0.3, 2.5, 57, 76, 0.06); [69, 72, 76, 81].forEach((m, i) => A.campana(Pr + 2.8 + i * 0.25, m, 0.06, 1.4));
  // cosecha → vuelve a empezar
  A.pop(C + 0.1, 0.2); A.pop(C + 1.3, 0.2); A.whoosh(C + 5.2, 0.8, 0.14);
  [57, 64, 69].forEach((m) => A.nota(F + 0.3, m, 0.07, 2.8));
} else {
  /* ---------- NARRADA ---------- */
  const { Gancho: G, Especie: Es, Esporada: Ep, Placa: Pl, Grano: Gr, Pregunta: P, Aire: Ai, Humedad: H, Calor: Ca, Rosa: R, Cierre: Ci, Outro: O } = K;
  A.pad(0, O + 3.5, 0.05, [45, 52, 57]);
  A.pop(G + 0.05, 0.3); A.raspa(G + 1.4, 0.3, 0.12); A.raspa(G + 2.0, 0.3, 0.12); A.nota(G + 2.6, 69, 0.06, 0.8);
  A.whoosh(Es, 0.6, 0.15); A.pop(Es + 1.2, 0.2); A.nota(Es + 2.2, 64, 0.05, 0.8);
  for (let i = 0; i < 12; i++) A.gota(Ep + 0.4 + i * 0.35, 0.06);
  A.pop(Pl + 0.05, 0.2); A.whoosh(Pl + 0.7, 0.6, 0.15); A.sube(Pl + 1, 3, 55, 67, 0.04);
  A.pop(Gr + 0.05, 0.2); A.pop(Gr + 1.4, 0.2); A.nota(Gr + 0.3, 60, 0.05, 0.6); A.nota(Gr + 1.6, 67, 0.05, 0.6);
  A.whoosh(P + 0.3, 0.6, 0.15);
  // aire: el CO₂ baja (nota que baja), los deformes se van, salen los normales
  A.sube(Ai + 1.6, 2.2, 64, 52, 0.05); A.raspa(Ai + 3.6, 0.3, 0.12); A.pop(Ai + 3.9, 0.22);
  for (let i = 0; i < 14; i++) A.gota(H + 0.4 + i * 0.32, 0.05); A.sube(H + 1.2, 2.8, 52, 64, 0.05);
  A.sube(Ca + 0.2, 1.8, 45, 57, 0.06);
  A.golpe(R + 0.3, 0.35, 80); A.sube(R + 4.4, 2.2, 69, 62, 0.04);
  A.whoosh(Ci, 0.6, 0.14); A.whoosh(Ci + 0.8, 0.6, 0.12);
  [57, 64, 69].forEach((m) => A.nota(O + 0.3, m, 0.07, 2.8));
}
A.guardar(OUT, K.Racimo != null ? 1.8 : 1);
