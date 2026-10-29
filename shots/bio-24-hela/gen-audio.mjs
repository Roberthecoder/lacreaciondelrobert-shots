// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #24 (células HeLa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hela base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 24);
const K = m.K;
const G = K.Gancho, H = K.Henrietta, B = K.Biopsia, Ge = K.Gey, L = K.Limite, V = K.Virus, F = K.Frenos, A = K.Apagar, P = K.Polio, N = K.Nobel, Ac = K.Acuerdo, D = K.Demanda, C = K.Cierre, O = K.Outro;

m.pad(0, H, 0.05, [45, 52, 57]);
m.pad(H, Ge, 0.045, [43, 50, 55]);                                                     // Henrietta y la biopsia: más sobrio
m.pad(Ge, P, 0.05, [45, 52, 57]);
m.pad(P, Ac, 0.05, [47, 54, 59]);
m.pad(Ac, O + 3.5, 0.045, [45, 52, 57]);
for (let t = G; t < G + 3.4; t += 0.45) m.gota(t + 0.2, 0.16, 820);                     // gotas de la pipeta
m.nota(H + 1.2, 69, 0.06, 0.8); m.nota(H + 2.0, 76, 0.06, 1.0);                        // He + La
m.metal(B + 0.6, 0.08, 600);                                                           // el tubito se cierra
m.golpe(B + 2.4, 0.3, 80);                                                             // tache en la hoja de permiso
for (let k = 0; k < 6; k++) m.nota(Ge + 0.4 + (k / 5.999) * 3.0, 57 + k * 3, 0.05, 0.5); // una nota por duplicación: 1, 2, 4, 8, 16, 32
for (let k = 0; k < 10; k++) m.tic(L + 0.2 + k * 0.14, 0.06, 1500);                    // el conteo de divisiones
m.nota(L + 1.8, 52, 0.06, 1.2, 0.8);                                                   // la célula normal se apaga
m.sube(L + 3.0, 1.6, 52, 64, 0.05);                                                    // ¿y estas?
m.whoosh(V + 0.1, 0.7, 0.18);                                                          // la Lupa se abre
m.tic(V + 1.4, 0.2, 2200);                                                             // el tramo del virus en el cromosoma
m.burbuja(F + 0.4, 0.12, 400); m.burbuja(F + 0.55, 0.12, 520);                          // salen E6 y E7
m.golpe(F + 1.1, 0.25, 110); m.golpe(F + 1.3, 0.25, 95);                                // los frenos se sueltan
for (let k = 0; k < 6; k++) m.nota(F + 2.2 + k * 0.2, 69 + (k % 3) * 2, 0.04, 0.3);    // la telomerasa trabaja en las puntas
m.tic(A + 0.6, 0.3, 900); m.nota(A + 0.7, 45, 0.07, 1.6, 0.9);                          // clic del interruptor: se detienen
m.golpe(P + 0.2, 0.35, 80);                                                            // tarjeta
for (let k = 0; k < 48; k++) m.metal(P + 1.2 + (k / 48) * 4.0, 0.025, 1500 + (k % 4) * 120); // tubos de vidrio
m.golpe(N + 0.2, 0.35, 80);
m.metal(N + 2.7, 0.18, 660); m.nota(N + 2.8, 72, 0.06, 1.4); m.nota(N + 2.8, 76, 0.05, 1.4); // medalla
m.metal(Ac + 0.9, 0.15, 500);                                                          // el candado se cierra
m.nota(Ac + 1.7, 64, 0.06, 0.8); m.nota(Ac + 2.0, 69, 0.06, 0.8);                      // dos integrantes de la familia
m.golpe(D + 0.3, 0.25, 90); m.metal(D + 2.4, 0.08, 420);                               // la balanza se equilibra
m.nota(C + 1.2, 69, 0.06, 1.2); m.nota(C + 1.5, 76, 0.05, 1.2);
m.nota(O + 0.3, 57, 0.08, 2.8); m.nota(O + 0.3, 64, 0.06, 2.8); m.nota(O + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
