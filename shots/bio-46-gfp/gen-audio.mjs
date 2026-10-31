// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #46 (GFP, la luz verde de la medusa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: cada puntito de la orilla que se enciende = una nota que baja (azul → verde: menos energía);
// 6 notas = las 6 neuronas del tacto del gusano; 3 notas = los 3 aminoácidos de la pieza que brilla.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gfp base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 46);
const K = m.K;
const G = K.Gancho, Me = K.Medusa, Pr = K.Proteinas, Fl = K.Fluorescencia, Di = K.Diferencia, Pd = K.PorDentro, Pg = K.Pregunta,
  Tr = K.Truco, Es = K.Estudio, Vi = K.Vivas, Co = K.Colores, No = K.Nobel, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Me, 0.05, [45, 52, 57], 0.5);                 // mar de noche: cama ahogada
m.pad(Me, Ci, 0.045, [45, 52, 57]);
m.pad(Ci, Ou + 3.5, 0.05, [45, 52, 57], 0.4);
for (let i = 0; i < 30; i += 3) { const t = G + 0.1 + i * 0.04; m.nota(t, 81, 0.035, 0.2); m.nota(t + 0.12, 76, 0.05, 0.6); } // orilla: azul → verde
m.sube(G + 1.4, 0.6, 64, 69, 0.04);                    // la energía pasa a la GFP
for (let i = 0; i < 16; i++) m.tic(Me + 0.5 + i * 0.09, 0.05, 2200);   // contador de medusas
m.whoosh(Me + 0.3, 1.6, 0.1);                          // la red en el agua
for (let i = 0; i < 6; i++) m.tic(Me + 2.8 + i * 0.33, 0.12, 3200);   // tijeras
m.gota(Pr + 1.0, 0.25, 900); m.nota(Pr + 1.05, 74, 0.08, 1.2);        // gota de calcio → destello azul
m.tic(Fl + 0.4, 0.2, 1500);                            // la lámpara se prende
m.sube(Fl + 0.7, 1.1, 72, 76, 0.04); m.nota(Fl + 2.3, 69, 0.07, 1.4); // entra azul, sale verde
m.tic(Di + 1.6, 0.22, 1300); m.sube(Di + 1.65, 0.5, 64, 57, 0.04);    // se apaga la lámpara: se apaga el verde
m.whoosh(Pd + 0.2, 0.6, 0.12);                         // la Lupa se abre
[0, 1, 2].forEach((i) => m.nota(Pd + 1.3 + i * 0.35, [64, 67, 69][i], 0.07, 0.5)); // 3 aminoácidos
m.burbuja(Pd + 2.4, 0.16, 520); m.nota(Pd + 3.0, 76, 0.07, 1.4);      // oxígeno → se enciende
m.sube(Pg + 0.1, 1.5, 57, 64, 0.05);
m.metal(Tr + 1.1, 0.12, 900);                          // los genes se pegan
m.whoosh(Tr + 1.5, 0.8, 0.1);
for (let i = 0; i < 10; i++) m.nota(Tr + 2.6 + i * 0.18, 72 + (i % 3) * 2, 0.025, 0.4); // la proteína se prende verde
m.golpe(Es + 0.15, 0.3, 80);                           // tarjeta del estudio
[0, 1, 2, 3, 4, 5].forEach((i) => m.nota(Es + 2.6 + i * 0.42, [64, 67, 69, 72, 74, 76][i], 0.08, 0.7)); // 6 neuronas
for (let i = 0; i < 8; i++) m.tic(Vi + 0.4 + i * 0.5, 0.06, 1800);   // el reloj
[0, 1, 2].forEach((i) => { m.pop ? m.pop(Co + 0.5 + (i + 1) * 0.55, 0.12) : m.burbuja(Co + 0.5 + (i + 1) * 0.55, 0.14, 700); m.nota(Co + 0.5 + (i + 1) * 0.55, [79, 76, 72][i], 0.06, 0.6); }); // colores
m.golpe(No + 0.1, 0.32, 70); m.metal(No + 0.3, 0.1, 1200);
for (let i = 0; i < 12; i += 2) m.nota(Ci + 0.3 + i * 0.12, 76, 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
