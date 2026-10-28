// gen-audio.mjs — música + efectos del Científico #03 (tu ADN no es completamente humano). Sin costo (motor/kit/audio-kit.mjs).
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (base narrada, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada · workflow: el mudo)
// Mudo (M4 "Ciclo"): el latido del bebé a 140 por minuto (frecuencia fetal típica 110–160); cada generación un pulso;
// 7 células que se funden = 7 notas que se vuelven un acorde; 100 cuadritos = 100 toques y los 8 virales (8 %) = 8 notas.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from '../../motor/kit/audio-kit-lote-c.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot ADN Viral base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K, E = m.ESC;

if (K.Virus != null) {
  /* ---------- gemelo mudo ---------- */
  const V = K.Virus, En = K.Entra, Ge = K.Germen, B = K.Bebe, Gn = K.Generaciones, Pl = K.Placenta, Cu = K.Cuadritos, L = K.Loop, FIN = L + 6.5;
  m.pad(V, En + 0.3, 0.045, [45, 52, 57]); for (let k = 0; k < 4; k++) m.nota(V + 0.3 + k * 1.1, E[5 + (k % 3)], 0.07, 0.9);
  m.pad(En, Ge + 0.3, 0.04, [40, 47]); m.whoosh(En + 0.2, 1.2, 0.12); m.sube(En + 2.5, 3, 52, 69, 0.06);   // se mete en el ADN
  for (let i = 0; i < 6; i++) m.tic(En + 3.5 + i * 0.3, 0.08, 2400);
  m.pad(Ge, B + 0.3, 0.045, [45, 52, 57]); m.whoosh(Ge + 0.5, 2.5, 0.08); m.golpe(Ge + 3, 0.3, 90); m.nota(Ge + 3, 69, 0.09, 1.2);
  // bebé: latido a 140 por minuto
  m.pad(B, Gn + 0.3, 0.04, [45, 52]); for (let t = B + 0.8; t < Gn - 0.2; t += 60 / 140) m.latido(t, 0.18);
  m.sube(B + 0.8, 0.6, 64, 76, 0.05);
  // generaciones: un pulso por generación (6) con su nota
  m.pad(Gn, Pl + 0.3, 0.045, [45, 52, 57]); for (let i = 0; i < 6; i++) { m.bajo(Gn + 0.4 + i * 1.3, 33 + i * 2, 0.13, 0.7); m.nota(Gn + 0.4 + i * 1.3, E[3 + i], 0.07, 0.8); }
  // placenta: 7 células → 7 notas sueltas que se funden en un acorde
  m.pad(Pl, Cu + 0.3, 0.04, [43, 50]); for (let i = 0; i < 7; i++) m.nota(Pl + 1 + i * 0.6, E[2 + i], 0.08, 0.7);
  m.nota(Pl + 6.2, 57, 0.08, 3); m.nota(Pl + 6.2, 64, 0.07, 3); m.nota(Pl + 6.2, 69, 0.06, 3); m.nota(Pl + 6.2, 76, 0.05, 3);
  // cuadritos: 100 toques; los 8 virales, notas brillantes
  const VIR100 = [7, 19, 23, 41, 56, 62, 78, 93];
  m.pad(Cu, L + 0.3, 0.045, [45, 52, 57]);
  for (let i = 0; i < 100; i++) { const t = Cu + 0.3 + (i + 1) / 100 * 7; if (VIR100.includes(i)) m.nota(t, E[6 + VIR100.indexOf(i)], 0.11, 0.8); else m.tic(t, 0.04, 1500); }
  // loop: el virus vuelve
  m.pad(L, FIN, 0.045, [45, 52, 57]); m.sube(L + 1, FIN - L - 1.6, 52, 64, 0.05); m.nota(FIN - 0.8, E[5], 0.07, 0.8);
} else {
  /* ---------- narrada ---------- */
  const G = K.Gancho, R = K.Retro, Ge = K.Germen, H = K.Hereda, Ro = K.Rotos, P = K.Pregunta, Es = K.Estudio, F = K.Funde, Ra = K.Ratones, O = K.Otros, C = K.Cierre, Ou = K.Outro;
  m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  m.pad(R, Ge, 0.03, [40, 47]); m.pad(Ro, P + 1, 0.03, [40, 47]);                         // escenas por dentro: más grave
  for (let i = 0; i < 30; i++) m.tic(G + 0.05 + i * 0.08, 0.04, 1800);                       // la cuadrícula se llena
  for (let i = 0; i < 8; i++) m.nota(G + 2.6 + i * 0.1, E[6 + i], 0.06, 0.5);                // se encienden las virales
  m.whoosh(R, 1.4, 0.12); m.sube(R + 2.2, 2, 52, 69, 0.05); m.tic(R + 4.2, 0.12, 2400);
  m.golpe(Ge + 2.0, 0.25, 90); m.nota(Ge + 2.2, 69, 0.07, 1);
  for (let i = 0; i < 5; i++) m.nota(H + 0.3 + i * 0.55, E[4 + i], 0.06, 0.6);
  for (let i = 0; i < 3; i++) m.cruje(Ro + 1.2 + i * 0.4, 0.25);
  m.sube(P + 0.1, 1.2, 52, 64, 0.05); m.nota(P + 0.6, 76, 0.07, 1);
  m.golpe(Es + 0.2, 0.35, 80); m.sube(Es + 3.6, 0.6, 64, 79, 0.06);
  for (let i = 0; i < 7; i++) m.nota(F + 0.8 + i * 0.4, E[2 + i], 0.05, 0.6); m.nota(F + 3.6, 57, 0.06, 2); m.nota(F + 3.6, 64, 0.05, 2);
  m.golpe(Ra + 0.2, 0.35, 80); m.sube(Ra + 2.2, 1.2, 60, 48, 0.05);
  for (let i = 0; i < 5; i++) m.nota(O + 0.4 + i * 0.45, E[3 + i * 2], 0.07, 0.7);
  for (let i = 0; i < 8; i++) m.nota(C + 1 + i * 0.12, E[6 + i], 0.05, 0.6);
  m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
}
m.guardar(OUT, K.Outro == null ? 1.9 : 1);
