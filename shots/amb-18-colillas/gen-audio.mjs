// gen-audio.mjs — cama grave + efectos del Shot Ambiental #18 (colillas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Colillas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 18);
const K = m.K;
const G = K.Gancho, F = K.Fibras, Q = K.Quimicos, Ti = K.Tirada, P = K.Pregunta, Pl = K.Playa, M = K.Mexico, E = K.Estudio, X = K.Extra, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.cruje(G + 0.05, 0.35); m.golpe(G + 0.35, 0.3, 110);                                  // la colilla sale de la arena
m.tic(G + 0.2, 0.08, 1400); m.metal(G + 0.9, 0.12, 600);                               // algodón… tachado
m.whoosh(G + 1.6, 0.8, 0.12); m.nota(G + 2.3, 69, 0.06, 0.8);                         // se abre la boquilla: plástico
m.whoosh(F + 0.1, 0.6, 0.12); m.sube(F + 0.1, 1.2, 57, 69, 0.05);                      // la lupa
for (let i = 0; i < 13; i++) m.tic(F + 1.9 + i * 0.09, 0.05, 1800 + i * 60);           // el haz de fibras y el contador
m.nota(F + 3.2, 72, 0.05, 0.7);                                                         // una fibra: 20 µm
m.sube(Q + 0.2, 1.4, 60, 52, 0.05);                                                     // se tiñen de café
m.tic(Q + 1.0, 0.08, 1300); m.tic(Q + 1.5, 0.08, 1100); m.tic(Q + 2.0, 0.08, 900);
for (let i = 0; i < 8; i++) m.burbuja(Q + 3.2 + i * 0.22, 0.05, 420 + i * 30);          // las suelta
for (let i = 0; i < 12; i++) m.gota(Ti + 1.2 + i * 0.18, 0.07, 900 + (i % 3) * 140);    // humedad
m.cruje(Ti + 2.6, 0.4); for (let i = 0; i < 8; i++) m.tic(Ti + 3.4 + i * 0.1, 0.04, 2200); // se deshilacha
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.whoosh(Pl + 0.1, 0.7, 0.1); for (let i = 0; i < 16; i++) m.tic(Pl + 0.3 + i * 0.15, 0.04, 1500 + i * 40); // contador
m.golpe(Pl + 3.0, 0.3, 90); m.golpe(Pl + 3.2, 0.25, 100); m.golpe(Pl + 3.4, 0.3, 80); m.nota(Pl + 3.9, 64, 0.06, 0.8); // podio
m.sube(M + 1.0, 1.6, 52, 64, 0.05); m.sube(M + 1.5, 1.6, 52, 57, 0.04); m.golpe(M + 3.0, 0.3, 70);
m.golpe(E + 0.2, 0.25, 95);                                                              // tarjeta del estudio
for (let i = 0; i < 6; i++) m.burbuja(E + 3.4 + i * 0.25, 0.06, 360);                   // la colilla en el agua
for (let i = 0; i < 8; i++) m.tic(E + 4.6 + i * 0.47, 0.05, 1200);                      // reloj de 96 h
for (let i = 1; i < 6; i += 2) m.nota(E + 5.0 + i * 0.5, 57 - i, 0.05, 0.9, 0.6);        // se apagan los peces
m.metal(X + 0.2, 0.12, 900); m.nota(X + 0.4, 67, 0.05, 0.8);
m.whoosh(C + 0.1, 0.6, 0.1); m.nota(C + 0.6, 64, 0.06, 1.2); m.golpe(C + 0.6, 0.25, 90);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
