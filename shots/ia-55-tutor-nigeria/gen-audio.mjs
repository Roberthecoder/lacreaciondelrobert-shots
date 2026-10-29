// gen-audio.mjs — cama grave + efectos del Shot IA #55 (tutor con IA en Nigeria). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot TutorNigeria base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, L = K.Lugar, S = K.Sesiones, M = K.Maestros, So = K.Sorteo, P = K.Pregunta, R = K.Resultado, E = K.Equivalencia, Pe = K.Peros, Ch = K.Chicas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 30; i++) m.tic(G + 0.05 + 3.55 * (i / 30) ** 1.2, 0.06, 1800 + (i % 5) * 110);  // tachones del calendario
m.sube(G + 5.0, 0.8, 52, 74, 0.04);                                                              // ≈ 2 años*
m.whoosh(L, 0.5, 0.12); m.golpe(L + 0.6, 0.35, 90);                                              // cae el pin
for (let i = 0; i < 9; i++) m.nota(L + 3.0 + i * 0.12, 64 + (i % 3) * 3, 0.03, 0.25);              // 9 escuelas
m.whoosh(S, 0.5, 0.12);
for (let i = 0; i < 24; i++) m.tic(S + 0.6 + i * 0.13, 0.04, 2400 + (i % 4) * 150);               // tecleo
m.burbuja(S + 0.8, 0.12, 700); m.burbuja(S + 2.2, 0.12, 520); m.burbuja(S + 3.8, 0.12, 700);       // mensajes del chat
m.whoosh(M, 0.5, 0.12);
for (let i = 0; i < 16; i++) m.tic(M + 0.2 + i * 0.15, 0.05, 900 + (i % 3) * 80);                 // tiza en el pizarrón
m.whoosh(So, 0.5, 0.12); m.zumbido(So + 0.2, 2.4, 0.02, 140);                                       // la tómbola gira
for (let i = 0; i < 12; i++) m.pop(So + 0.5 + i * 0.16 + 0.45, 0.06);                              // bolitas que caen
m.golpe(So + 2.6, 0.3, 80);                                                                       // el mismo examen
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(R + 0.2, 0.4, 70); m.sube(R + 0.2, 0.9, 52, 76, 0.04);                                     // +0.31
for (let i = 0; i < 10; i++) m.nota(R + 1.6 + i * 0.08, 55 + i, 0.025, 0.2);                       // barras
m.nota(R + 2.9, 72, 0.06, 0.6); m.nota(R + 2.95, 76, 0.05, 0.6);                                    // línea del piloto
m.cruje(E + 1.2, 0.3);                                                                            // se tacha el mito
m.sube(E + 2.0, 1.2, 52, 64, 0.04); m.sube(E + 3.2, 1.6, 52, 76, 0.04);                             // barras de tiempo
m.pop(Pe + 1.0, 0.12); m.pop(Pe + 2.1, 0.12); m.pop(Pe + 3.5, 0.12);                               // notas adhesivas
m.sube(Ch + 1.0, 1.6, 52, 72, 0.04);
m.nota(C + 1.6, 67, 0.05, 0.6); m.nota(C + 2.4, 71, 0.05, 0.6); m.nota(C + 3.0, 74, 0.06, 0.9);     // IA + maestro
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
