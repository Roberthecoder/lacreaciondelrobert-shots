// gen-audio.mjs — música y efectos del Biotecnológico #05 (la petunia que brilla sola). Sin costo.
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (cama de la narrada base)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// "La nota de la luz verde": la luz de la petunia (~530 nm) vibra a 3×10⁸ / 530×10⁻⁹ ≈ 5.66×10¹⁴ Hz;
// bajada 40 octavas (÷ 2⁴⁰) queda en ≈ 515 Hz. Esa es la nota que suena cada vez que la luciferasa suelta luz.
// · Narrada: cama grave continua sin golpe + efectos en el mismo cuadro.
// · Muda: cada una de las 4 enzimas toca su nota cuando la molécula pasa por ella (el ciclo es un arpegio que
//   va acelerando toda la noche); la 3 es la nota de la luz. De día la cama es tibia; de noche aparece el brillo.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Petunia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML));
const K = M.K;
const LUZ_HZ = 3e8 / 530e-9 / Math.pow(2, 40);                 // ≈ 514.8 Hz
const LUZ_MIDI = 69 + 12 * Math.log2(LUZ_HZ / 440);             // ≈ 71.7
const ENZ = [60, 64, LUZ_MIDI, 67];                             // nota de cada enzima (la 3 = la luz)
const luz = (t, g = 0.08) => { M.campana(t, LUZ_MIDI, g, 2.0); M.campana(t, LUZ_MIDI + 12, g * 0.4, 1.4); };

if (K.Gancho != null) {
  /* ---------- NARRADA ---------- */
  M.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
  M.ruido(K.Gancho, 0.6, 0.08, 2000, 300);                                                        // se apaga el día
  [0, 1, 2, 3, 4].forEach((i) => M.nota(K.Gancho + 0.3 + i * 0.12, [64, 67, 69, LUZ_MIDI, 76][i], 0.05, 1.0));   // se prenden las 5 flores
  M.golpe(K.Gancho + 1.8, 0.2, 140); M.golpe(K.Gancho + 2.2, 0.2, 140);                            // tachones
  luz(K.Hongo + 0.3, 0.06); M.whoosh(K.Hongo + 1.4, 1.2, 0.1); luz(K.Hongo + 2.6, 0.05);
  const L = [0, 3.7, 7.3, 11.3, 15.5].map((d) => K.Ciclo + d);
  M.whoosh(K.Ciclo + 0.2, 0.6, 0.14); M.sube(K.Ciclo + 0.2, 0.6, 64, 79, 0.05);
  M.nota(L[0] + 1.6, 57, 0.07, 1.0);                                                               // ácido cafeico
  [0, 1, 2, 3].forEach((k) => M.pop(L[1] + 1.5 + k * 0.4, 0.1));                                    // aparecen las 4 enzimas
  M.nota(L[2] + 0.6, ENZ[0], 0.08, 0.9); M.nota(L[2] + 2.4, ENZ[1], 0.08, 0.9);
  luz(L[3] + 1.6, 0.1);
  M.nota(L[4] + 0.8, ENZ[3], 0.08, 0.9); for (let i = 0; i < 6; i++) M.nota(L[4] + 2.4 + i * 0.83, ENZ[i % 4], 0.04, 0.6);
  M.sube(K.Pregunta, 1.8, 55, 67, 0.05);
  M.golpe(K.Estudio + 0.25, 0.35, 80); M.ruido(K.Estudio + 3.6, 1.0, 0.07, 3000, 1500);             // regadera
  M.campana(K.Estudio + 3.8, 64, 0.05, 1.4); M.sube(K.Estudio + 5.0, 1.2, 64, 52, 0.04);              // brilla y se apaga
  for (let i = 0; i < 12; i++) M.tic(K.Wood + 0.8 + i * 0.22, 0.05, 1800 + i * 60);                  // los años corren
  M.golpe(K.Wood + 3.4, 0.25, 90);
  M.metal(K.Aprobada + 0.6, 0.15, 900); luz(K.Aprobada + 0.6, 0.07); M.pop(K.Aprobada + 2.4, 0.15);
  luz(K.Extra + 0.4, 0.06); M.golpe(K.Extra + 3.0, 0.25, 130);
  M.whoosh(K.Cierre, 0.8, 0.14); for (let i = 0; i < 8; i++) M.nota(K.Cierre + 0.6 + i * 0.36, ENZ[i % 4], 0.04, 0.6);
  M.nota(K.Outro + 0.3, 57, 0.08, 2.8); M.nota(K.Outro + 0.3, 64, 0.06, 2.8); M.campana(K.Outro + 0.3, LUZ_MIDI, 0.05, 2.8);
} else {
  /* ---------- MUDA ---------- */
  M.pad(0, K.Noche + 2, 0.045, [48, 55, 60], 800);                                                  // día: tibio
  M.pad(K.Noche, K.Amanecer + 4, 0.05, [45, 52, 57], 450);                                          // noche
  M.pad(K.Amanecer + 3, K.Outro + 3.5, 0.045, [48, 55, 60], 800);
  // el primer cuadro: pájaros de día (y el mismo sonido al final del loop)
  [0.2, 0.5, 0.65].forEach((d) => M.nota(d, 88 + (d * 10 % 3), 0.03, 0.15)); [0.2, 0.5, 0.65].forEach((d) => M.nota(K.Amanecer + 7.5 + d, 88 + (d * 10 % 3), 0.03, 0.15));
  // anochece: se prenden las flores, una por una
  M.ruido(K.Noche, 2.5, 0.06, 2000, 300); [0, 1, 2, 3, 4].forEach((i) => luz(K.Noche + 1.2 + i * 0.35, 0.05));
  // adentro: el ciclo (las 4 enzimas como arpegio). Mismo cálculo de tiempo que el jsx.
  M.whoosh(K.Ciclo1 - 0.6, 1.2, 0.12);
  const ini = K.Ciclo1 + 1.5, fin1 = K.Ciclo2 - 0.5;
  for (let k = 0; k < 4; k++) { const t = ini + (k + 0.5) * (fin1 - ini) / 4; k === 2 ? luz(t, 0.1) : M.campana(t, ENZ[k], 0.09, 1.4); }
  // segunda parte: la velocidad sube de 0.6 a 1.6 pasos por segundo → cada paso, su nota
  let g = 4, t = K.Ciclo2;
  while (t < K.Flores - 0.3) { const v = 0.6 + 1.0 * (t - K.Ciclo2) / (K.Flores - K.Ciclo2); const k = Math.floor(g) % 4; k === 2 ? luz(t, 0.07) : M.nota(t, ENZ[k], 0.06, 0.7); t += 1 / v; g += 1; }
  M.whoosh(K.Flores - 0.6, 1.0, 0.12);
  // flores: el botón nuevo se abre (nota que sube) y brilla más
  M.sube(K.Flores + 2.0, 3.0, 60, LUZ_MIDI, 0.05); luz(K.Flores + 5.0, 0.08);
  for (let i = 0; i < 6; i++) M.nota(K.Flores + 5.6 + i * 0.6, ENZ[i % 4], 0.035, 0.6);
  // amanece: el brillo se apaga a la vista (las notas de luz bajan de volumen)
  for (let i = 0; i < 5; i++) luz(K.Amanecer + 0.5 + i * 1.0, 0.06 * (1 - i / 5));
  M.nota(K.Outro + 0.3, 60, 0.07, 2.8); M.campana(K.Outro + 0.3, LUZ_MIDI, 0.05, 2.8);
}
M.guardar(path.join(HERE, OUT));
