// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #25 (Phytophthora infestans). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Papa Irlanda base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 25);
const K = m.K;
const G = K.Gancho, H = K.Hoja, L = K.Limones, N = K.Nadadores, E = K.Entrada, Pa = K.Pared, P = K.Pregunta, Pr = K.Parientes, I = K.Irlanda, He = K.Herbario, H1 = K.Herb1, M = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, I, 0.05, [45, 52, 57], 0.15);                                        // cama fresca y húmeda
m.pad(I, He, 0.055, [41, 48, 53], 0.45);                                      // Irlanda: se oscurece
m.pad(He, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                 // herbario y México: se abre
m.sube(G + 0.1, 1.1, 57, 50, 0.04);                                           // la papa se pudre
m.golpe(G + 1.4, 0.5, 75); m.cruje(G + 2.5, 0.3);                             // sello HONGO y tache
m.nota(G + 2.9, 69, 0.05, 0.8); m.whoosh(G + 3.4, 0.8, 0.12); m.golpe(G + 4.2, 0.2, 120); // moho de agua; rueda el jitomate
m.whoosh(H + 1.4, 0.9, 0.12);                                                 // la hoja se voltea
for (let i = 0; i < 6; i++) m.tic(H + 2.3 + i * 0.12, 0.05, 3200);            // pelusa
for (let i = 0; i < 8; i++) m.burbuja(L + 0.2 + i * 0.25, 0.08, 500 + i * 30); // brotan los limones
m.gota(N + 0.2, 0.2, 800); m.gota(N + 0.5, 0.15, 1000);                       // agua
m.golpe(N + 1.0, 0.25, 160);                                                  // se abre la papila
for (let i = 0; i < 10; i++) m.burbuja(N + 1.3 + i * 0.12, 0.08, 700 + i * 40); // salen los nadadores
m.nota(E + 0.6, 64, 0.05, 0.4); m.sube(E + 0.9, 1.1, 52, 59, 0.05);          // se enquista y entra el tubo
for (let i = 0; i < 20; i++) m.tic(E + 2.1 + i * 0.07, 0.07, 1800 + i * 40);  // conteo hasta 300 000
m.sube(Pa, 1.8, 48, 55, 0.04); m.golpe(Pa + 1.8, 0.25, 110); m.golpe(Pa + 2.3, 0.25, 90); // hifas y tarjetas de pared
m.sube(P + 0.1, 1.0, 52, 64, 0.05); m.golpe(P + 0.1, 0.35, 70);               // ¿entonces qué es?
m.nota(Pr + 0.4, 60, 0.05, 0.6); m.nota(Pr + 0.8, 64, 0.05, 0.6); m.nota(Pr + 1.1, 67, 0.05, 0.6); m.nota(Pr + 1.4, 72, 0.05, 0.6); m.nota(Pr + 2.2, 55, 0.05, 0.8); // árbol que se ramifica
for (let i = 0; i < 6; i++) m.cruje(I + 0.4 + i * 0.35, 0.12);                // el campo se pudre
m.golpe(I + 2.4, 0.4, 60);                                                    // ≈ 1 millón de muertos
m.whoosh(I + 3.6, 2.5, 0.08); m.whoosh(I + 4.6, 2.0, 0.06);                  // viento y mar con los barcos
for (let i = 0; i < 3; i++) m.whoosh(He + 0.3 + i * 0.2, 0.3, 0.07);          // hojas de herbario
for (let i = 0; i < 8; i++) m.nota(He + 1.4 + i * 0.17, 72 + (i % 4) * 2, 0.03, 0.3); // la doble hélice
m.golpe(H1 + 0.2, 0.3, 80); m.nota(H1 + 0.8, 52, 0.05, 1.0, 0.5);           // HERB-1, se creyó extinto
for (let i = 0; i < 3; i++) m.nota(H1 + 2.6 + i * 0.25, 76 + i * 3, 0.05, 0.8); // rastro hallado
m.whoosh(M + 0.6, 0.7, 0.08); m.whoosh(M + 1.4, 0.7, 0.08);                  // dos flechas
m.golpe(M + 1.2, 0.2, 120); m.golpe(M + 2.0, 0.2, 120); m.nota(M + 3.0, 62, 0.05, 1.0, 0.4); // tarjetas; sin resolver
m.golpe(C + 0.8, 0.5, 75); m.burbuja(C + 1.6, 0.1, 600); m.nota(C + 1.8, 69, 0.06, 1.2);  // OOMICETO
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
