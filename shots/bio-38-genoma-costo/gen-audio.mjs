// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #38 (tu genoma y lo que cuesta leerlo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Genoma base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 38);
const K = m.K;
const NOTA = { A: 69, T: 72, C: 76, G: 79 };            // una nota por letra
const LET = ['A', 'T', 'C', 'G'];

m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 26; i++) m.nota(K.Gancho + 0.15 + i * 0.16, NOTA[LET[(i * 7) % 4]], 0.03, 0.3);   // la pantalla se llena
LET.forEach((L, i) => m.nota(K.Letras + i * 0.25 + 0.1, NOTA[L], 0.08, 0.6));                          // A, T, C, G
for (let i = 0; i < 24; i++) m.tic(K.Leer + 0.2 + i * 0.15, 0.08, 2200);                                // el reloj corre
for (let i = 0; i < 13; i++) m.tic(K.Proyecto + 0.4 + i * 0.21, 0.12, 1500);                          // el calendario 1990 → 2003
for (let i = 0; i < 56; i += 2) m.tic(K.Costo + 0.2 + i * 0.045 + 0.3, 0.07, 900);                    // billetes que caen
m.golpe(K.Precio2001 + 0.3, 0.3, 80);                                                                   // el primer punto: 2001
m.sube(K.Pregunta + 0.1, 1.6, 52, 64, 0.05);                                                            // ¿y el tuyo?
for (let i = 0; i < 12; i++) m.gota(K.Antes + 0.4 + i * 0.25, 0.1, 900 + (i % 4) * 120);              // tubito por tubito
m.whoosh(K.Paralelo + 0.6, 0.6, 0.14);                                                                  // se abre la Lupa
for (let i = 0; i < 10; i++) { const t = K.Paralelo + 1.2 + i / 2.2; LET.forEach((L) => m.nota(t, NOTA[L], 0.025, 0.25)); } // todos destellan a la vez
for (let i = 0; i < 28; i++) m.tic(K.Hoy + 0.3 + i * 0.09, 0.06, 1800);                               // cada punto de la gráfica
m.sube(K.Hoy + 1.0, 1.0, 64, 45, 0.07);                                                                 // la caída de 2008
m.golpe(K.Hoy + 2.8, 0.3, 90);                                                                          // ≈ $525
m.golpe(K.Estudio + 0.2, 0.35, 80); m.metal(K.Estudio + 2.0, 0.12, 900); m.metal(K.Estudio + 2.2, 0.12, 1100); // tarjeta y telómeros
for (let i = 0; i < 10; i++) m.pop ? m.pop(K.Faltaba + 1.0 + i * 0.23) : m.tic(K.Faltaba + 1.0 + i * 0.23, 0.12, 1300); // cada hueco que se llena
for (let i = 0; i < 14; i++) m.nota(K.Repetidos + 0.2 + i * 0.25, NOTA[['A', 'A', 'T', 'G', 'G', 'C', 'T'][i % 7]], 0.03, 0.25); // el bloque que se repite
m.whoosh(K.Repetidos + 1.0, 1.6, 0.1);                                                                  // la lectura larguísima
m.cruje(K.Cierre + 2.2, 0.4);                                                                           // se tacha "100 millones"
m.golpe(K.Cierre + 2.6, 0.3, 90);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
