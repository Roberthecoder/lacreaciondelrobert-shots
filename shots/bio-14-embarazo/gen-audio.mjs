// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #14 (la prueba de embarazo por dentro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Embarazo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K;
const G = K.Gancho, Im = K.Implanta, Or = K.Orina, Su = K.Sube, Ox = K.Oro, Sa = K.Sandwich, Ra = K.Rayita, Pr = K.Pregunta,
  Co = K.Control, Es = K.Estudio, No = K.Nobel, Ca = K.Cabra, Ci = K.Cierre, Ou = K.Outro;
const mitadRa = Ra + 2.3;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.nota(G + 0.3, 69, 0.07, 0.9); m.nota(G + 0.6, 76, 0.06, 1.2);                        // se pinta la línea T
m.whoosh(Im + 0.1, 1.7, 0.06);                                                          // el embrión se implanta
for (let i = 0; i < 9; i++) m.burbuja(Im + 2.3 + i * 0.26, 0.06, 520 + (i % 3) * 80);   // la hCG pasa a la sangre
m.whoosh(Or + 0.3, 0.7, 0.07); m.gota(Or + 2.1, 0.22, 850);                             // flecha y gota al pozo
m.whoosh(Su + 0.2, Ox + 0.6 - Su - 0.2, 0.05);                                          // la orina sube por la tira
for (let i = 0; i < 4; i++) m.nota(Su + 0.4 + i * 0.8, 57 + i * 3, 0.03, 0.7);
m.whoosh(Ox, 0.6, 0.08);                                                                // se abre la lupa
[1.2, 1.6, 2.0].forEach((d, i) => { m.tic(Ox + d, 0.12, 1800); m.nota(Ox + d, 72 + i * 2, 0.04, 0.4); }); // el oro atrapa la hCG
for (let i = 0; i < 4; i++) { const t = Sa + 0.7 + i * 0.45; m.tic(t, 0.14, 1500); m.nota(t, 64 + i * 3, 0.05, 0.5); } // sándwiches en la línea T
for (let i = 0; i < 60; i += 2) m.tic(Ra + i * 0.03, 0.04, 2600);                      // se amontona el oro
m.sube(mitadRa + 0.2, 0.9, 64, 76, 0.05); m.nota(mitadRa + 1.1, 76, 0.06, 1.0);        // aparece la rayita
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);                                                    // la pregunta
for (let i = 0; i < 3; i++) { const t = Co + 2.27 + i * 0.6; m.tic(t, 0.14, 1300); m.nota(t, 69 + i * 3, 0.05, 0.5); } // la línea C atrapa
m.golpe(Es + 2.4, 0.3, 80);                                                             // tarjeta del estudio
m.latido(Es + 4.0, 0.2);                                                                // fusión: hibridoma
for (let i = 0; i < 8; i++) m.nota(Es + 4.2 + i * 0.35, 69, 0.035, 0.35);              // anticuerpos idénticos: la misma nota
m.metal(No + 0.15, 0.18, 880);                                                          // medalla
m.burbuja(Ca + 2.2, 0.12, 400); m.nota(Ca + 2.25, 72, 0.05, 0.4); m.nota(Ca + 2.4, 79, 0.05, 0.6); // cabra atrapa ratón
m.nota(Ci + 0.4, 69, 0.05, 0.8); m.nota(Ci + 0.8, 76, 0.05, 1.0);                      // C y T
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
