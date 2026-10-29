// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #47 (empaques y ladrillos de micelio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Micelio Ladrillo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, R = K.Receta, Mo = K.Molde, H = K.Hifas, B = K.Bloque, O = K.Horno, P = K.Pregunta, To = K.Torre, Cp = K.Composta, D = K.Debil, A = K.Agua, U = K.Usos, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0);
m.cruje(G + 0.05, 0.4); m.whoosh(G + 0.25, 0.7, 0.12);                        // la caja se abre y sale la pieza
m.cruje(G + 1.6, 0.5);                                                         // se tacha "¿unicel?"
for (let i = 0; i < 14; i++) m.tic(R + 0.4 + i * 0.13 + 0.45, 0.1, 700 + (i % 4) * 120); // caen rastrojo y cascarilla
for (let i = 0; i < 12; i++) m.tic(R + 2.5 + i * 0.1 + 0.4, 0.06, 2200);      // cae el micelio
m.golpe(Mo + 0.3, 0.25, 90); m.golpe(Mo + 0.5, 0.25, 95); m.golpe(Mo + 0.7, 0.25, 100); // se llenan los moldes
m.golpe(Mo + 1.5, 0.4, 70); m.golpe(Mo + 1.7, 0.4, 72); m.golpe(Mo + 1.9, 0.4, 74);    // la prensa
m.zumbido(H + 0.3, 4.5, 0.02, 320); for (let i = 0; i < 8; i++) m.nota(H + 0.5 + i * 0.55, m.ESC[(i * 3) % 10] + 12, 0.035, 0.6); // crecen las hifas
for (let i = 0; i < 5; i++) m.tic(B + 0.2 + i * 0.4, 0.15, 1500);            // día 1…5
m.whoosh(B + 2.3, 0.6, 0.1); m.nota(B + 2.6, 69, 0.06, 0.8);                  // sale la pieza sólida
m.metal(O + 0.1, 0.15, 900); m.motor(O + 0.3, 2.4, 0.05);                      // puerta y calor del horno
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(To + 0.2, 0.35, 80);
for (let i = 0; i < 20; i++) m.tic(To + 2.4 + i * 0.2, 0.08, 1100 + (i % 5) * 90); // se apilan los ladrillos
m.cruje(Cp + 0.3, 0.6); m.golpe(Cp + 0.9, 0.3, 60); m.cruje(Cp + 1.4, 0.4);    // se desmorona en composta
for (let i = 0; i < 5; i++) m.nota(Cp + 2.0 + i * 0.2, 72 + i * 2, 0.04, 0.5); // brotan las plantas
m.sube(D + 0.6, 1.0, 50, 52, 0.03); m.sube(D + 1.0, 1.0, 50, 64, 0.04);       // las barras
m.cruje(D + 2.4, 0.7); m.golpe(D + 2.6, 0.3, 70);                              // la viga se rompe
for (let i = 0; i < 6; i++) m.gota(A + 0.3 + i * 0.5, 0.15, 800 + i * 60);    // el agua entra
m.sube(A + 1.0, 1.2, 52, 64, 0.04);
for (let i = 0; i < 3; i++) m.nota(U + 0.5 + i * 0.7, [72, 76, 79][i], 0.06, 0.6); // ✓ ✓ ✓
m.tic(U + 2.8, 0.25, 500); m.tic(U + 3.3, 0.25, 450);                          // ✗ ✗
m.whoosh(C + 1.2, 0.6, 0.1); m.cruje(C + 3.0, 0.4); m.nota(C + 3.7, 69, 0.06, 1.2); // a la maceta, tierra, brote
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
