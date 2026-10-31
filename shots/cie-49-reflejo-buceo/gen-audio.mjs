// gen-audio.mjs — cama grave + efectos del Shot Científico #49 (reflejo de buceo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Reflejo Buceo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 100);
const K = m.K;
// latidos que se frenan (mismo ritmo que el monitor del jsx)
const latidos = (t0, t1, r0, r1, desde, hasta, g = 0.16) => { let t = desde; while (t < hasta) { m.latido(t, g); const r = t < t0 ? r0 : t > t1 ? r1 : r0 + (r1 - r0) * (t - t0) / (t1 - t0); t += 1 / r; } };
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(0.02, 0.6, 0.25); for (let i = 0; i < 8; i++) m.gota(0.05 + i * 0.09, 0.18, 700 + i * 90);  // ¡splash!
latidos(K.Gancho + 1.4, K.Gancho + 4.2, 1.55, 0.95, 0.4, K.Reflejo - 0.2);                             // el corazón se frena
m.golpe(K.Gancho + 4.3, 0.3, 90); m.nota(K.Gancho + 5.0, 72, 0.06, 0.6);                                // aparece la foca
m.whoosh(K.Gancho + 5.4, 0.7, 0.12);
for (let i = 0; i < 6; i++) m.burbuja(K.Reflejo + 1.2 + i * 0.22, 0.14, 380 + i * 60);                  // la cara entra al agua
m.golpe(K.Reflejo + 0.25, 0.25, 80);
for (let i = 0; i < 6; i++) m.gota(K.Cara + 0.2 + i * 0.15, 0.14, 900 + i * 70);
m.nota(K.Cara + 1.4, 76, 0.05, 0.5); m.nota(K.Cara + 2.2, 79, 0.05, 0.5); m.nota(K.Cara + 3.0, 83, 0.05, 0.5); // frente, ojos, nariz
m.sube(K.Cara + 4.4, 0.8, 60, 67, 0.05);                                                                    // aguanta la respiración
latidos(K.Corazon + 0.4, K.Corazon + 3.4, 1.5, 0.85, K.Corazon + 0.2, K.Ahorra - 0.1, 0.18);
m.zumbido(K.Corazon + 2.0, 3, 0.05, 140);                                                                  // los vasos se angostan
for (let i = 0; i < 6; i++) m.burbuja(K.Ahorra + 0.5 + i * 0.6, 0.1, 600 + (i % 3) * 120);                // oxígeno a cerebro y corazón
m.nota(K.Ahorra + 1.8, 74, 0.05, 0.6); m.nota(K.Ahorra + 2.6, 79, 0.05, 0.6);
m.sube(K.Pregunta + 0.1, 1.4, 52, 64, 0.05);
m.whoosh(K.Focas + 0.2, 1.0, 0.16); m.sube(K.Focas + 0.5, 3, 55, 43, 0.05);                              // la foca baja
latidos(K.Focas + 1.0, K.Focas + 3.5, 1.5, 0.3, K.Focas + 1.0, K.Bebes - 0.2, 0.14);
for (let i = 0; i < 8; i++) m.burbuja(K.Focas + 0.8 + i * 0.8, 0.1, 420 + i * 30);
m.golpe(K.Focas + 3.6, 0.28, 75);
m.golpe(K.Bebes + 0.1, 0.25, 110); m.nota(K.Bebes + 0.2, 79, 0.06, 0.4); m.nota(K.Bebes + 0.4, 84, 0.06, 0.6);
m.golpe(K.Ojo + 0.05, 0.4, 70); m.metal(K.Ojo + 0.1, 0.15, 620);                                          // alerta
m.tic(K.Ojo + 0.45, 0.2, 1500); m.tic(K.Ojo + 0.75, 0.2, 1500);
m.golpe(K.Ojo + 1.45, 0.35, 65); m.golpe(K.Ojo + 3.25, 0.35, 60);
latidos(K.Medico + 2.6, K.Medico + 5.0, 2.9, 1.4, K.Medico + 0.2, K.Cierre - 0.2, 0.12);                  // latidos acelerados que se calman
m.nota(K.Medico + 3.6, 72, 0.06, 0.8);
for (let i = 0; i < 6; i++) m.gota(K.Cierre + 0.1 + i * 0.12, 0.12, 900 + i * 60);
m.golpe(K.Cierre + 0.7, 0.25, 100); m.nota(K.Cierre + 1.3, 76, 0.05, 0.4); m.nota(K.Cierre + 1.7, 81, 0.06, 0.8);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
