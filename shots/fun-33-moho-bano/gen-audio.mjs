// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #33 (el moho del baño). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Bano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 33);
const K = m.K;
const G = K.Gancho, E = K.Esporas, Cl = K.Cladosporium, R = K.Rosa, P = K.Pregunta, St = K.Stachybotrys, Mi = K.Mito, Al = K.Alergia, Es = K.Estudio, S = K.Sirve, Ta = K.Tallar, C = K.Cierre, Ou = K.Outro;

m.pad(0, S, 0.05, [43, 50, 55], 0.35);                                        // húmedo y tapado mientras dura la mancha
m.pad(S, Ou + 3.5, 0.05, [45, 52, 57], 0);                                    // se abre cuando entra el aire seco
for (let t = 0.6; t < S; t += 1.9) m.gota(t, 0.06, 1100);                     // goteo lento de fondo
for (let i = 0; i < 6; i++) m.whoosh(G + 0.15 + i * 0.3, 0.28, 0.07);          // la esponja talla
m.cruje(G + 1.6, 0.3);                                                         // ¿mugre? tachado
m.golpe(G + 2.4, 0.45, 75);                                                    // sello MOHO
for (let i = 0; i < 7; i++) m.burbuja(G + 2.6 + i * 0.15, 0.08, 520 + i * 30); // burbujas de jabón
m.whoosh(E, 1.2, 0.06);                                                        // esporas en el aire
for (let i = 0; i < 4; i++) { m.gota(E + 1.6 + i * 0.25, 0.14, 900); m.nota(E + 1.8 + i * 0.25, 57 + i * 3, 0.04, 0.5); } // germinan en el agua
m.tic(E + 2.4, 0.15, 700); m.tic(E + 2.6, 0.15, 700);                           // las que caen en seco
m.sube(Cl, 1.2, 50, 62, 0.04);                                                 // al microscopio
for (let i = 0; i < 12; i++) m.tic(Cl + 0.3 + i * 0.1, 0.07, 1800 + i * 40);   // contador 113
for (let i = 0; i < 8; i++) m.nota(Cl + 1.0 + i * 0.35, m.ESC[i % 6], 0.03, 0.4); // crecen las cadenas de conidios
m.metal(R + 0.2, 0.12, 1700); m.whoosh(R + 1.2, 0.5, 0.08);                    // mancha rosa · lupa
m.golpe(P, 0.5, 55); m.sube(P + 0.1, 1.5, 52, 40, 0.05);                       // ¡moho negro tóxico!
m.nota(St + 0.6, 50, 0.05, 1.4, 0.5);                                          // crece Stachybotrys
for (let i = 0; i < 9; i++) m.gota(St + i * 0.45, 0.12, 800);                  // la fuga gotea
m.cruje(Mi + 1.6, 0.4);                                                         // mito tachado
for (let i = 0; i < 3; i++) m.golpe(Mi + 2.6 + i * 0.25, 0.25, 90 + i * 10);   // tres manchas
m.nota(Mi + 3.5, 64, 0.05, 0.6); m.nota(Mi + 3.7, 64, 0.05, 0.6);               // "="
m.whoosh(Al + 0.3, 1.0, 0.05); m.whoosh(Al + 1.6, 0.5, 0.25);                  // esporas a la nariz · ¡achú!
m.metal(Al + 3.0, 0.1, 900);                                                   // inhalador
m.golpe(Es + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 6; i++) m.burbuja(Es + 2.4 + i * 0.2, 0.06, 450);          // con jabón: crecen
m.cruje(Es + 2.8, 0.15);                                                        // en seco
m.motor(S + 0.2, 4.2, 0.05);                                                   // extractor
m.whoosh(S + 1.2, 0.8, 0.12);                                                  // ventana abierta
m.sube(S + 2.8, 1.2, 64, 57, 0.05);                                            // la humedad baja a 50 %
m.nota(S + 4.0, 69, 0.06, 0.8);
for (let i = 0; i < 10; i++) m.whoosh(Ta + 0.2 + i * 0.36, 0.3, 0.09);          // el cepillo talla
m.nota(C + 0.8, 72, 0.06, 1.0); m.golpe(C + 0.8, 0.3, 100);                    // sello SECO
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
