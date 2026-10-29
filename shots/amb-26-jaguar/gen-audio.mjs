// gen-audio.mjs — cama grave + efectos del Shot Ambiental #26 (jaguar y cámaras trampa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Jaguar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 26);
const K = m.K;
const G = K.Gancho, D = K.Disparo, R = K.Rosetas, Ce = K.Censo, P = K.Pregunta, N = K.Numero, M = K.Mapa, A = K.Antes, Am = K.Amenazas, L = K.Lados, C = K.Cierre, Ou = K.Outro;
// clic de obturador + destello
const clic = (t) => { m.tic(t, 0.35, 3200); m.tic(t + 0.05, 0.25, 1800); m.whoosh(t, 0.25, 0.08); };

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);
for (let i = 0; i < 8; i++) m.tic(G + 0.2 + i * 0.6, 0.04, 4200 + (i % 2) * 600);            // grillos de la selva de noche
m.zumbido(G, 2.2, 0.03, 140);                                                                 // la cámara en espera
clic(G + 2.3); m.nota(G + 3.6, 64, 0.06, 0.9);                                                // la foto · la credencial
m.whoosh(D + 0.05, 0.6, 0.1);
m.zumbido(D + 1.0, 1.4, 0.05, 520);                                                           // el sensor detecta movimiento
clic(D + 2.5); m.golpe(D + 2.8, 0.2, 140);                                                    // ¡clic! y sale la foto
m.sube(R + 0.3, 0.6, 57, 69, 0.05); m.nota(R + 1.2, 67, 0.05, 0.6);                           // lupa y huella
m.tic(R + 2.9, 0.2); m.tic(R + 3.3, 0.2); m.nota(R + 3.9, 72, 0.06, 0.7); m.nota(R + 4.4, 62, 0.06, 0.7);   // fotos A, B (✓) y C (nuevo)
m.whoosh(Ce + 0.1, 0.7, 0.1);
for (let i = 0; i < 23; i++) m.tic(Ce + 0.5 + i * 0.11, 0.08, 1500 + (i % 5) * 200);         // 23 sitios que se encienden
m.nota(Ce + 2.9, 64, 0.05, 0.8);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.sube(N + 0.3, 1.6, 52, 76, 0.05); m.golpe(N + 1.9, 0.3, 100);                               // 5,326
m.nota(N + 2.6, 60, 0.05, 0.8);                                                               // 2018
m.whoosh(M + 0.1, 0.6, 0.1);
for (let i = 0; i < 5; i++) m.golpe(M + 0.3 + i * 0.35, 0.18 - i * 0.02, 120 + i * 15);      // regiones que se llenan
m.gota(M + 2.6, 0.18, 800);                                                                   // pin en Jalisco
for (let i = 0; i < 25; i++) m.tic(A + 0.2 + i * 0.05, 0.05, 2200);                          // 25 mil (cabezas)
m.sube(A + 3.0, 1.4, 64, 45, 0.06);                                                           // se apagan hasta 5
for (let i = 0; i < 20; i++) m.tic(A + 3.0 + i * 0.06, 0.04, 900);
m.motor(Am + 0.4, 1.0, 0.05); m.golpe(Am + 1.6, 0.3, 70); m.metal(Am + 2.7, 0.12, 600); m.motor(Am + 4.4, 1.2, 0.06);   // amenazas
m.nota(L + 0.4, 67, 0.05, 0.6); m.nota(L + 1.6, 63, 0.05, 0.8);                               // derecho ≠ izquierdo
m.whoosh(L + 3.0, 0.5, 0.08); clic(L + 3.9);                                                  // dos cámaras disparan juntas
for (let i = 0; i < 6; i++) m.tic(C + 0.2 + i * 0.6, 0.04, 4200 + (i % 2) * 600);
clic(C + 2.0); m.nota(C + 2.6, 57, 0.05, 1.5);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
