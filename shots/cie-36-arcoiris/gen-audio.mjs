// gen-audio.mjs — cama grave + efectos del Shot Científico #36 (nadie ve el mismo arcoíris). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Arcoiris base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 360);
const K = m.K;
const AV = K.Circulo + 3.9;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 8; i++) m.gota(0.05 + i * 0.11 + (i % 2) * 0.04, 0.08, 900 + i * 70);              // lluvia
m.whoosh(0.35, 0.9, 0.14); [67, 71, 74].forEach((n, i) => m.nota(0.4 + i * 0.15, n, 0.05, 0.7));       // el arcoíris se parte en dos
m.tic(1.2, 0.2, 2200); m.sube(1.5, 0.6, 60, 67, 0.04); m.sube(1.9, 0.6, 62, 69, 0.04);                  // sombras · conos
m.nota(2.5, 72, 0.05, 0.6);                                                                             // chip
m.nota(K.Gotas + 0.3, 76, 0.05, 0.6);                                                                   // Sol detrás
for (let i = 0; i < 3; i++) m.whoosh(K.Gotas + 0.9 + i * 0.15, 0.8, 0.08);                               // rayos de sol
m.nota(K.Gotas + 2.5, 69, 0.05, 0.6); for (let i = 0; i < 8; i++) m.gota(K.Gotas + 2.5 + i * 0.18, 0.1, 800 + (i * 131) % 600); // lluvia enfrente
m.zumbido(K.Rebote + 0.15, 0.7, 0.03, 180); m.burbuja(K.Rebote + 0.2, 0.14, 420);                        // se abre la lupa
m.sube(K.Rebote + 0.8, 0.7, 64, 71, 0.04);                                                              // entra
m.tic(K.Rebote + 1.5, 0.22, 1800);                                                                      // se dobla
m.golpe(K.Rebote + 2.4, 0.3, 160); m.tic(K.Rebote + 2.4, 0.2, 2400);                                    // rebota en el fondo
[60, 64, 67, 71, 74, 79].forEach((n, i) => m.nota(K.Rebote + 3.6 + i * 0.09, n, 0.04, 0.9));           // sale en colores
m.whoosh(K.Angulo + 0.2, 1.0, 0.1);                                                                     // línea de la sombra
m.tic(K.Angulo + 1.1, 0.25, 2000);                                                                      // sombra de tu cabeza
for (let i = 0; i < 6; i++) m.nota(K.Angulo + 1.4 + i * 0.12, 79 - i * 2, 0.035, 0.4);                  // abanico de colores
m.golpe(K.Angulo + 3.3, 0.3, 120); m.nota(K.Angulo + 3.3, 72, 0.06, 0.9);                                // ≈ 42°
m.tic(K.Cono + 0.3, 0.2, 2000);                                                                         // tu sombra
for (let i = 0; i < 10; i++) m.nota(K.Cono + 1.0 + i * 0.24, 72 + (i % 3) * 3, 0.03, 0.3);            // las gotas se encienden en rojo
m.sube(K.Cono + 3.6, 0.6, 60, 67, 0.04); m.nota(K.Cono + 3.6, 76, 0.05, 0.6);                            // el cono
m.nota(K.Pregunta + 0.05, 81, 0.06, 0.9); m.nota(K.Pregunta + 0.05, 74, 0.05, 0.9);                      // ¿?
m.whoosh(K.Otras + 0.2, 0.8, 0.14);                                                                     // llega la otra persona
m.tic(K.Otras + 1.4, 0.2, 2200);                                                                        // su sombra
for (let i = 0; i < 8; i++) m.nota(K.Otras + 2.0 + i * 0.22, 69 + (i % 3) * 3, 0.03, 0.3);             // otras gotas
m.nota(K.Otras + 3.4, 74, 0.05, 0.6);
[67, 71, 74, 79].forEach((n, i) => m.nota(K.Propio + 0.1 + i * 0.12, n, 0.04, 1.0));                    // arcoíris tuyo
[69, 72, 76, 81].forEach((n, i) => m.nota(K.Propio + 0.5 + i * 0.12, n, 0.04, 1.0));                    // arcoíris suyo
m.nota(K.Propio + 1.6, 72, 0.05, 0.6);
m.sube(K.Circulo + 1.2, 1.4, 55, 62, 0.04);                                                             // la mitad que tapa el suelo
m.whoosh(AV - 0.3, 1.0, 0.16); m.motor(AV, 3.3, 0.03);                                                   // subimos al avión
[60, 64, 67, 72, 76, 79].forEach((n, i) => m.nota(AV + 0.4 + i * 0.2, n, 0.04, 1.0));                   // el círculo completo
m.zumbido(K.Doble + 0.1, 0.7, 0.03, 180); m.burbuja(K.Doble + 0.15, 0.14, 420);                          // lupa
m.tic(K.Doble + 0.2 + 0.8, 0.22, 2200); m.tic(K.Doble + 0.2 + 1.3, 0.22, 2600); [60, 64, 67, 71, 74, 79].forEach((n, i) => m.nota(K.Doble + 2.5 + i * 0.08, n, 0.03, 0.6));                          // rebote 1 · rebote 2
[79, 76, 72, 67, 64, 60].forEach((n, i) => m.nota(K.Doble + 3.6 + i * 0.12, n, 0.04, 0.9));             // segundo arcoíris, al revés
m.nota(K.Doble + 4.7, 74, 0.05, 0.6);
for (let i = 0; i < 6; i++) m.gota(K.Cierre + 0.1 + i * 0.15, 0.08, 900 + i * 70);                      // la lluvia del inicio
m.nota(K.Cierre + 1.0, 79, 0.04, 1.0); m.nota(K.Cierre + 1.2, 84, 0.035, 1.0);                           // destellos
m.nota(K.Cierre + 2.4, 72, 0.05, 0.8);                                                                   // hecho para tus ojos
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
