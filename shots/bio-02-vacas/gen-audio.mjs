// gen-audio.mjs — música y efectos del Biotecnológico #02 (las vacas viven de microbios). Sin costo.
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (cama de la narrada base)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// · Narrada: cama grave continua sin golpe + efectos en el mismo cuadro.
// · Muda (M4 "Ciclo"): la música sale de los datos:
//   - masticar: 1 golpe por segundo al pastar; al rumiar, 60 masticadas por bolo en time-lapse ×10 (10 por segundo);
//   - cada tipo de microbio que llega suma su capa (bacterias, hongos, protozoarios, arqueas);
//   - cada ácido graso que cruza la pared toca una nota según sus carbonos: 2 (acetato), 3 (propionato), 4 (butirato);
//   - la cama suena tapada mientras el pasto está sin digerir y se abre cuando los microbios lo fermentan.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vacas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML));
const K = M.K;
const masca = (t, g = 0.12) => { M.golpe(t, g, 120); M.tic(t + 0.02, g * 0.5, 900); };
const NOTA_C = { 2: 60, 3: 64, 4: 67 };            // carbonos → nota

if (K.Gancho != null) {
  /* ---------- NARRADA ---------- */
  M.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
  M.ruido(K.Gancho + 0.25, 0.3, 0.12, 1500, 4000);                                  // arranca el pasto
  for (let t = K.Gancho + 1; t < K.Enzimas; t += 1) masca(t, 0.08);                   // ~1 masticada por segundo
  M.whoosh(K.Enzimas + 0.15, 0.6, 0.15); M.sube(K.Enzimas + 0.2, 0.6, 64, 79, 0.06); M.golpe(K.Enzimas + 2.6, 0.3, 70);
  M.whoosh(K.Rumen + 0.1, 0.6, 0.15); for (let i = 0; i < 10; i++) M.burbuja(K.Rumen + 0.6 + i * 0.3, 0.06, 300 + (i % 4) * 60);
  M.whoosh(K.Micro, 1.0, 0.18); [60, 64, 67, 71].forEach((m, i) => M.nota(K.Micro + 0.8 + i * 0.6, m, 0.08, 0.9));
  for (let i = 0; i < 6; i++) M.tic(K.Micro + 5.3 + i * 0.4, 0.14, 1600);             // la fibra se rompe
  for (let i = 0; i < 12; i++) M.burbuja(K.Micro + 6.6 + i * 0.22, 0.05, 420 + (i % 3) * 140);
  M.sube(K.Pregunta, 1.4, 55, 67, 0.05);
  for (let i = 0; i < 14; i++) M.nota(K.Acidos + 0.5 + i * 0.32, NOTA_C[2 + (i % 3)], 0.035, 0.4);   // ácidos que cruzan
  M.sube(K.Acidos + 2.6, 2.0, 55, 67, 0.05);
  for (let i = 0; i < 8; i++) M.pop(K.Proteina + 0.6 + i * 0.6, 0.1);
  M.golpe(K.Estudio + 0.25, 0.35, 80); M.nota(K.Estudio + 3.3, 55, 0.08, 1.0); M.nota(K.Estudio + 3.6, 76, 0.05, 0.6);
  M.eructo(K.Metano + 1.6, 1.1, 0.35); M.golpe(K.Metano + 3.3, 0.2, 140);
  M.metal(K.Biorreactor + 0.3, 0.18, 600); M.whoosh(K.Biorreactor + 0.4, 0.6, 0.1);
  M.whoosh(K.Cierre, 0.8, 0.15); M.sube(K.Cierre + 0.1, 0.6, 64, 79, 0.05);
  M.nota(K.Outro + 0.3, 55, 0.08, 2.8); M.nota(K.Outro + 0.3, 62, 0.06, 2.8); M.nota(K.Outro + 0.3, 67, 0.05, 2.8);
} else {
  /* ---------- MUDA ---------- */
  // cama: tapada mientras el pasto no se digiere; se abre cuando fermenta
  M.pad(0, K.Rumen + 3, 0.05, [43, 50], 200);
  M.pad(K.Rumen + 3, K.Outro + 3.5, 0.05, [43, 50, 55], 700);
  // pastar: 1 masticada por segundo (inicio y final iguales: loop)
  for (let t = K.Pasto + 0.3; t < K.Bocado - 0.2; t += 1) masca(t, 0.14);
  for (let t = K.Suelo + 6.5; t < K.Outro - 0.1; t += 1) masca(t, 0.14);
  // rumiar: el bolo sube (nota que sube) y 60 masticadas en 6 s (time-lapse ×10)
  M.sube(K.Bocado + 0.3, 0.9, 48, 60, 0.07);
  for (let i = 0; i < 60; i++) M.tic(K.Bocado + 1.2 + i * ((K.Rumen - 0.4 - K.Bocado - 1.2) / 60), 0.09, 700 + (i % 4) * 90);
  // rumen: rayos X y luego cada microbio suma su capa
  M.whoosh(K.Rumen + 0.2, 0.6, 0.15); M.whoosh(K.Rumen + 2.2, 0.8, 0.12);
  const capa = [K.Rumen + 3.0, K.Rumen + 4.4, K.Rumen + 5.8, K.Rumen + 7.2], finCapas = K.Proteina + 2;
  for (let t = capa[0]; t < finCapas; t += 0.25) M.tic(t, 0.04, 2600);                                 // bacterias: rápidas
  for (let t = capa[1]; t < finCapas; t += 1) M.pluck(t, 43, 0.1, 0.9);                                // hongos: bajo lento
  for (let t = capa[2]; t < finCapas; t += 0.5) M.nota(t, [62, 64, 67, 64][Math.round(t * 2) % 4], 0.035, 0.35); // protozoarios: cilios
  for (let t = capa[3]; t < finCapas; t += 0.75) M.burbuja(t, 0.06, 350);                              // arqueas: burbujitas de metano
  [60, 64, 67, 71].forEach((m, i) => M.campana(capa[i], m, 0.07, 1.4));
  for (let i = 0; i < 6; i++) M.tic(K.Rumen + 6.6 + i * 0.4, 0.14, 1600);                              // la fibra se rompe
  // energía: cada ácido que cruza la pared, una nota según sus carbonos
  for (let i = 0; i < 18; i++) M.nota(K.Energia + 0.6 + i * 0.42, NOTA_C[2 + ((i * 7) % 3)], 0.05, 0.45);
  M.sube(K.Energia + 1.2, K.Proteina - 1.5 - K.Energia - 1.2, 48, 60, 0.05);
  // proteína: los microbios se digieren en aminoácidos (5 por microbio)
  for (let i = 0; i < 10; i++) for (let j = 0; j < 5; j++) M.pluck(K.Proteina + 0.8 + i * 0.7 + j * 0.06, [72, 74, 76, 79, 81][j], 0.03, 0.3);
  // metano: el eructo
  M.eructo(K.Eructo + 1.2, 1.3, 0.4);
  // abono → pasto: plop y notas que suben mientras crece
  M.golpe(K.Suelo + 0.4, 0.3, 60); for (let i = 0; i < 6; i++) M.nota(K.Suelo + 2.7 + i * 0.3, [57, 60, 62, 64, 67, 69][i], 0.06, 0.8);
  M.nota(K.Outro + 0.3, 55, 0.07, 2.8); M.nota(K.Outro + 0.3, 62, 0.05, 2.8);
}
M.guardar(path.join(HERE, OUT));
