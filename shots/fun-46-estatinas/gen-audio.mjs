// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #46 (estatinas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estatinas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 46);
const K = m.K;
const G = K.Gancho, H = K.Higado, E = K.Enzima, I = K.Idea, B = K.Busqueda, A = K.Arroz, P = K.Pregunta, F = K.Freno, R = K.Receptores, S = K.Estudio, M = K.Monascus, Ig = K.Igual, C = K.Cierre, Ou = K.Outro;
const AM = A + 2.3;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);                                 // cama grave, curiosa
m.whoosh(G, 0.5, 0.1); m.golpe(G + 0.45, 0.35, 110); m.tic(G + 0.6, 0.15, 1800); // cae y rebota la pastilla
m.cruje(G + 2.4, 0.3);                                                        // se tacha "químico"
m.sube(G + 1.6, 2.4, 48, 60, 0.04); m.nota(G + 3.0, 64, 0.06, 0.8);           // brota el moho
m.latido(H + 0.2); m.latido(H + 0.9);                                         // el hígado trabaja
for (let i = 0; i < 12; i++) m.burbuja(H + 0.5 + i * 0.12, 0.06, 420 + i * 20); // bolitas de colesterol
m.golpe(H + 1.5, 0.25, 90);                                                   // ">"
for (let i = 0; i < 30; i++) m.tic(E + 0.2 + i * 0.07, 0.07, 1400 + (i % 6) * 120); // 30 pasos
m.golpe(E + 2.4, 0.35, 70); m.nota(E + 2.5, 57, 0.06, 1.0);                   // la enzima que marca el ritmo
m.nota(I + 1.6, 72, 0.06, 0.6); m.nota(I + 1.8, 76, 0.05, 0.6);               // el foco de la idea
m.sube(I + 2.4, 1.2, 50, 58, 0.04);                                           // brotan los hongos
for (let i = 0; i < 48; i++) m.metal(B + 0.1 + i * 0.035, 0.03, 2200 + (i % 5) * 150); // pared de cajas Petri
for (let i = 0; i < 16; i++) m.tic(B + 0.4 + i * 0.1, 0.06, 2600);            // el contador corre
m.nota(B + 2.0, 69, 0.06, 0.6); m.golpe(B + 3.1, 0.45, 60); m.cruje(B + 3.15, 0.25); // citrinina… pero el riñón
m.whoosh(A + 0.1, 0.6, 0.08); m.burbuja(A + 0.4, 0.1, 380);                   // la bolsa y el grano
m.sube(A + 0.8, 1.2, 52, 59, 0.04);                                           // crece la colonia
m.whoosh(AM - 0.2, 0.6, 0.1);                                                 // al microscopio
for (let i = 0; i < 9; i++) m.gota(AM + 1.2 + i * 0.09, 0.07, 1300 + i * 60); // brotan las esporas
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.zumbido(F, 1.5, 0.03, 120);
m.golpe(F + 1.8, 0.4, 80); m.metal(F + 1.85, 0.1, 1400);                      // la molécula encaja
m.whoosh(F + 1.7, 0.6, 0.08);                                                 // la pieza amarilla rebota
m.sube(F + 2.2, 1.2, 60, 50, 0.04);                                           // el hígado hace menos
for (let i = 0; i < 9; i++) m.gota(R + 0.3 + i * 0.2, 0.06, 700 + i * 30);     // salen receptores
m.whoosh(R + 1.2, 1.8, 0.07);                                                 // jalan colesterol de la sangre
m.golpe(S + 0.2, 0.35, 80);                                                   // tarjeta 1973
m.sube(S + 2.8, 1.0, 55, 62, 0.04); m.sube(S + 3.6, 1.2, 57, 64, 0.04);       // crecen los dos mohos
m.nota(S + 4.6, 67, 0.05, 0.7);                                               // "primas"
for (let i = 0; i < 6; i++) m.gota(M + 0.3 + i * 0.25, 0.06, 520 + i * 25);   // el arroz se tiñe
m.golpe(M + 2.5, 0.25, 100);                                                  // monacolina K
m.whoosh(Ig + 0.3, 1.1, 0.08); m.metal(Ig + 1.4, 0.15, 1600); m.nota(Ig + 1.45, 76, 0.06, 1.0); // se enciman: misma molécula
m.sube(C + 0.3, 1.7, 48, 57, 0.04); m.sube(C + 2.6, 1.8, 52, 60, 0.04);       // el moho sale del arroz
m.nota(C + 2.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
