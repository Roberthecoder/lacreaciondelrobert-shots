// gen-audio.mjs — música y efectos del Biotecnológico #04 (fagos). Sin costo.
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (cama de la narrada base)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// · Narrada: cama grave continua sin golpe + efectos en el mismo cuadro.
// · Muda (ciclo lítico): la música sale de los datos:
//   - un tic por cada minuto simulado de la infección (~25 tics hasta que revienta, como el cronómetro);
//   - cada fago armado adentro es una nota (~200 notas que suben) y la cama se va abriendo con la tensión;
//   - al reventar, acorde + un "pop" por fago que sale;
//   - en la placa, cada calva nueva es una nota grave; las generaciones 1 → 200 → 40 000 son golpes cada vez más fuertes.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fagos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML));
const K = M.K;
const aterriza = (t) => { M.golpe(t, 0.25, 120); M.tic(t + 0.03, 0.12, 1800); };
const inyecta = (t) => { M.golpe(t, 0.3, 90); M.ruido(t + 0.05, 1.2, 0.1, 2500, 300); };
const revienta = (t, n = 30) => { M.golpe(t, 0.45, 55); for (let i = 0; i < 10; i++) M.tic(t + i * 0.02, 0.14, 1500 + i * 150); for (let i = 0; i < n; i++) M.pop(t + 0.1 + i * 0.05, 0.07); };

if (K.Gancho != null) {
  /* ---------- NARRADA ---------- */
  M.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
  M.whoosh(K.Gancho, 0.5, 0.14); M.golpe(K.Gancho + 0.6, 0.35, 70); M.golpe(K.Gancho + 2.0, 0.2, 140);
  M.whoosh(K.Aterriza, 1.4, 0.1); aterriza(K.Aterriza + 1.6);
  inyecta(K.Inyecta + 0.3);
  for (let t = K.Inyecta + 0.4, k = 0; t < K.Revienta + 1.0; t += 0.4, k++) M.tic(t, 0.03, 2600);               // reloj del time-lapse
  for (let i = 0; i < 40; i++) M.nota(K.Fabrica + 0.8 + i * ((K.Revienta + 0.6 - K.Fabrica - 0.8) / 40), M.ESC[i % 12], 0.025, 0.25);
  revienta(K.Revienta + 0.9);
  M.sube(K.Pregunta, 1.6, 55, 67, 0.05); M.whoosh(K.Pregunta + 0.1, 0.6, 0.12);
  M.pop(K.Selectivo + 1.2, 0.2); M.tic(K.Selectivo + 1.4, 0.15, 900); aterriza(K.Selectivo + 2.3);
  const S2 = K.Selectivo + 4.6; M.metal(S2 + 0.2, 0.2, 700); [0, 1, 2].forEach((i) => M.metal(S2 + 1.4 + i * 0.4, 0.12, 1100));
  M.golpe(K.Estudio + 0.25, 0.35, 80);
  const E2 = K.Estudio + 6.3; for (let t = K.Estudio + 3; t < E2 + 3.6; t += 1.1) M.tic(t, 0.06, 1000);     // monitor lento
  M.burbuja(E2 + 0.5, 0.1, 500); [1.2, 2.0, 2.8].forEach((d, i) => M.nota(E2 + d, 60 + i * 4, 0.06, 0.6)); M.campana(E2 + 3.8, 76, 0.08, 1.6);
  M.golpe(K.Historia + 0.25, 0.3, 80); M.pop(K.Historia + 1.6, 0.15); M.pop(K.Historia + 3.2, 0.15);
  M.golpe(K.Extra + 0.3, 0.35, 60); for (let i = 0; i < 31; i++) M.tic(K.Extra + 2.4 + i * (2 / 31), 0.05, 2000 + i * 40);  // 31 ceros
  M.whoosh(K.Cierre, 0.8, 0.15); M.golpe(K.Cierre + 0.8, 0.2, 140); M.pop(K.Cierre + 1.6, 0.2);
  M.nota(K.Outro + 0.3, 57, 0.08, 2.8); M.nota(K.Outro + 0.3, 64, 0.06, 2.8); M.nota(K.Outro + 0.3, 69, 0.05, 2.8);
} else {
  /* ---------- MUDA ---------- */
  const fin = K.Revienta + 1.0, ini = K.Inyecta + 0.2;
  M.pad(0, ini, 0.05, [45, 52], 300);
  M.pad(ini, fin, 0.05, [44, 51, 56], 250);                                          // tensa mientras la bacteria es fábrica
  M.pad(fin, K.Outro + 3.5, 0.05, [45, 52, 57], 700);                                 // se abre al reventar
  M.whoosh(0, 0.8, 0.1); aterriza(1.0);
  M.whoosh(K.Vuelta + 11.5, 1.2, 0.08);
  inyecta(K.Inyecta + 0.3);
  for (let m = 0; m < 25; m++) M.tic(ini + m * (fin - ini) / 25, 0.06, 2200);         // un tic por minuto simulado
  for (let i = 0; i < 200; i++) M.nota(K.Copias + 0.6 + i * ((K.Revienta + 0.6 - K.Copias - 0.6) / 200), M.ESC[Math.floor(i / 200 * 15)], 0.018, 0.18);
  M.sube(K.Copias + 0.6, K.Revienta + 0.3 - K.Copias - 0.6, 48, 72, 0.04);
  revienta(K.Revienta + 0.9, 34); [57, 64, 69, 76].forEach((m) => M.campana(K.Revienta + 0.95, m, 0.06, 2.2));
  // placa: generaciones y calvas
  M.whoosh(K.Placa, 1.0, 0.12);
  [[K.Placa + 1.0, 0.25], [K.Placa + 3.0, 0.4], [K.Placa + 7.0, 0.55]].forEach(([t, g]) => M.golpe(t, g, 60));
  [1.0, 3.5, 4.5, 5.5, 6.5, 7.5].forEach((d, i) => M.pluck(K.Placa + d, [45, 48, 50, 52, 55, 57][i], 0.12, 1.4));
  M.whoosh(K.Vuelta + 3, 2.4, 0.12);
  M.nota(K.Outro + 0.3, 57, 0.07, 2.8); M.nota(K.Outro + 0.3, 64, 0.05, 2.8);
}
M.guardar(path.join(HERE, OUT));
