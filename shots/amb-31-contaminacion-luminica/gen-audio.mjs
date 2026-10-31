// gen-audio.mjs — cama grave + efectos del Shot Ambiental #31 (contaminación lumínica). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Luz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 131);
const K = m.K;
const G = K.Gancho, R = K.Resplandor, A = K.Atlas, M = K.Mexico, P = K.Pregunta, C = K.Conteo, N = K.Nino, Tt = K.Tortugas, Av = K.Aves, S = K.Solucion, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                                  // cama grave de noche
for (let i = 0; i < 6; i++) m.nota(G + 0.1 + i * 0.4, m.ESC[8 + (i % 4)], 0.03, 0.8);  // estrellas que titilan
m.tic(G + 0.5, 0.25, 2600); m.zumbido(G + 0.55, 1.2, 0.04, 120);                        // se prende el farol
m.sube(G + 3.0, 3.0, 69, 57, 0.04);                                                     // la Vía Láctea se apaga
m.zumbido(R + 0.1, 3.5, 0.05, 110);                                                     // resplandor de la ciudad
for (let i = 0; i < 8; i++) m.nota(R + 0.5 + i * 0.38, m.ESC[12 - i], 0.025, 0.4);      // estrellas débiles que se apagan
m.whoosh(A + 0.1, 1.2, 0.12); m.tic(A + 0.6, 0.12, 3200); m.tic(A + 1.2, 0.12, 3200);  // satélite
m.golpe(A + 2.7, 0.3, 70);                                                              // 1 de cada 3
for (let i = 0; i < 12; i++) m.tic(M + 0.5 + i * 0.14, 0.08, 1400);                     // personitas que se colorean
m.nota(M + 2.3, 52, 0.06, 0.9);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 8; i++) m.tic(C + 0.3 + i * 0.2, 0.06, 2000 + i * 100);             // contador de conteos
for (let i = 0; i < 12; i++) m.nota(C + 1.4 + i * 0.32, 45 + i, 0.04, 0.35);            // barras que suben
for (let i = 0; i < 15; i++) m.nota(N + 1.0 + i * 0.29, m.ESC[14 - (i % 10)], 0.02, 0.3); // estrellas que se apagan (250 → 100)
for (let i = 0; i < 6; i++) m.whoosh(Tt + i * 0.9, 0.9, 0.06);                          // olas
for (let i = 0; i < 12; i++) m.tic(Tt + 0.4 + i * 0.35, 0.04, 900);                    // aletas en la arena
m.golpe(Tt + 2.4, 0.28, 65);                                                            // voltean hacia las luces
for (let i = 0; i < 20; i++) m.tic(Av + 0.5 + i * 0.25, 0.03, 3000 + (i % 3) * 400);  // aleteos
m.golpe(Av + 5.4, 0.4, 60); m.whoosh(Av + 5.5, 1.0, 0.12);                              // se apagan las columnas
m.metal(S + 0.8, 0.12, 900); m.nota(S + 1.3, 64, 0.05, 0.6);                            // tapa del farol
m.sube(S + 1.9, 0.8, 69, 62, 0.04); m.nota(S + 2.8, 67, 0.05, 0.6);                     // foco a cálido
m.tic(S + 3.5, 0.35, 1800); m.nota(S + 4.1, 69, 0.05, 0.6);                             // apagador
m.nota(Ci + 0.6, 57, 0.05, 2.5); m.nota(Ci + 0.6, 64, 0.04, 2.5); m.nota(Ci + 1.0, 72, 0.03, 2.2); // vuelve la Vía Láctea
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
