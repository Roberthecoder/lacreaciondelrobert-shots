// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #59 (Reishi). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Reishi base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Co = K.Contiene, MC = K.MitoCancer, DC = K.DatoCancer, J = K.Junto, P = K.Pregunta, E = K.Estudio, A = K.Almidon, B = K.Betaglucano, ME = K.MitoEspecie, L = K.Lingzhi, C = K.Cierre, Ou = K.Outro;
const ALM13 = 13, SI5 = [1, 4, 8, 12, 16];

m.pad(0, L + 3.5, 0.05, [45, 52, 55], 0.15);                                  // cama grave, un poco tensa (investigación)
m.pad(L + 3.5, Ou + 3.5, 0.05, [45, 52, 57], 0);                              // se abre en «falla el nombre, no el hongo»
m.metal(G + 0.1, 0.15, 700); m.whoosh(G + 0.3, 0.7, 0.1); m.tic(G + 1.1, 0.3, 900); // se abre la tapa, cae la cápsula
for (let i = 0; i < 19; i++) m.tic(G + 1.2 + i * 0.05, 0.06, 1800);              // aparecen 19 frascos
for (let i = 0; i < 5; i++) m.nota(G + 2.8 + i * 0.08, 72 + i * 2, 0.05, 0.4);    // 5 se encienden
m.sube(H, 1.6, 43, 52, 0.04); m.nota(H + 1.2, 57, 0.05, 1.0);                    // crece el reishi
m.burbuja(Co + 0.3, 0.08, 400); m.burbuja(Co + 0.7, 0.08, 480); m.burbuja(Co + 1.2, 0.08, 560); m.burbuja(Co + 1.6, 0.08, 640); // moléculas
m.cruje(MC + 0.9, 0.3); m.golpe(MC + 0.9, 0.5, 60);                              // MITO (grave) y tachón
m.golpe(MC + 1.8, 0.3, 80);                                                       // tarjeta Cochrane
m.golpe(DC + 0.1, 0.3, 110); m.nota(DC + 0.15, 76, 0.06, 0.6);                    // DATO (brillante)
[0.5, 1.2, 2.4, 3.0].forEach((d) => m.tic(DC + d, 0.15, 1400));                  // chips
m.sube(J + 0.3, 1.3, 50, 57, 0.04); m.whoosh(J + 2.0, 0.8, 0.08);                 // suben las barras, entra la lupa
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                               // re-gancho
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 19; i++) m.tic(E + 1.4 + i * 0.07, 0.07, 1600);              // 19 suplementos
for (let i = 0; i < ALM13; i++) m.gota(A + 0.3 + i * 0.12, 0.12, 700 + i * 20);  // 13 gotas de yodo
for (let i = 0; i < 5; i++) m.nota(B + 0.4 + i * 0.1, 69 + i * 3, 0.05, 0.5);     // 5 betaglucanos
for (let i = 0; i < 30; i++) m.tic(ME + 0.5 + i * 0.1, 0.05, 2600 + (i % 4) * 300); // se lee el ADN
m.cruje(ME + 1.2, 0.2); m.golpe(ME + 1.2, 0.5, 60);                               // MITO
for (let i = 0; i < 20; i++) m.tic(ME + 4.6 + i * 0.07, 0.1, 1100);              // 20 tachones
m.golpe(L + 0.3, 0.3, 110); m.nota(L + 0.35, 76, 0.06, 0.6);                      // DATO
for (let i = 0; i < 6; i++) m.tic(L + 2.0 + i * 0.12, 0.08, 1300);               // puntos lucidum
for (let i = 0; i < 7; i++) m.nota(L + 3.0 + i * 0.1, 64 + (i % 3) * 3, 0.04, 0.4); // puntos lingzhi
m.nota(L + 4.2, 69, 0.06, 1.2);
m.whoosh(C + 0.6, 0.6, 0.06); m.golpe(C + 2.0, 0.35, 60); m.golpe(C + 2.4, 0.3, 110); // etiqueta corregida y sellos
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
