// gen-audio.mjs — cama grave + efectos del Shot Científico #05 (cosquillas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cosquillas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Pd = K.Prediccion, V = K.Volumen, M = K.Menos, Q = K.Pregunta, E = K.Estudio, R = K.Robots, Co = K.Copia, Re = K.Retraso, Ce = K.Cerebelo, Ra = K.Ratas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 10; i++) m.tic(G + 0.1 + i * 0.45, 0.06, 3000 + (i % 3) * 300);   // deditos que se menean (bajito: no da cosquillas)
m.nota(Pd + 0.7, 72, 0.06, 0.6); m.nota(Pd + 0.9, 76, 0.05, 0.6);                      // aparece la predicción
m.nota(V + 0.6, 76, 0.07, 0.5); m.nota(V + 1.2, 72, 0.05, 0.5); m.nota(V + 1.8, 69, 0.035, 0.6);   // baja el volumen
for (let i = 0; i < 3; i++) m.golpe(M + 0.4 + i, 0.18 - i * 0.04, 70);                  // menos, menos, menos
m.sube(Q + 0.1, 1.4, 52, 64, 0.05);
m.golpe(E + 0.25, 0.35, 80);
m.motor(R + 0.3, 4.4, 0.05);                                                          // los robots se mueven
m.motor(Co + 0.1, 4.4, 0.04);
for (let i = 0; i < 8; i++) m.tic(Re + 0.4 + i * 0.6, 0.06 + i * 0.02, 2600 + i * 120);  // las cosquillas regresan (suben)
m.sube(Re + 0.3, 4.0, 57, 69, 0.04);
m.whoosh(Ce - 0.2, 0.6, 0.12); m.nota(Ce + 1.0, 64, 0.07, 1.2); m.nota(Ce + 1.0, 69, 0.05, 1.2);   // se ilumina el cerebelo
for (let i = 0; i < 6; i++) m.nota(Ra + 0.4 + i * 0.45, 88 + (i % 2) * 3, 0.03, 0.15);   // chillidos (agudos)
m.golpe(Ra + 3.3, 0.25, 70);                                                         // silencio cuando se toca sola
for (let i = 0; i < 6; i++) m.tic(C + 3.1 + i * 0.3, 0.12, 2800 + (i % 2) * 400);    // la otra mano: ahora sí
m.sube(C + 3.0, 0.8, 57, 69, 0.05);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
