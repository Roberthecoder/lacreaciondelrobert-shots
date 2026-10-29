// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #28 (la gota de Buller). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gota Buller base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 28);
const K = m.K;
const G = K.Gancho, B = K.Basidio, Go = K.Gota, Bu = K.Buller, F = K.Fusion, D = K.Disparo, P = K.Pregunta, E = K.Estudio, Fz = K.Fuerza, Ca = K.Caida, Fr = K.Frena, Es = K.Especies, C = K.Cierre, Ou = K.Outro;

m.pad(0, F + 1.8, 0.05, [45, 52, 57], 0.15);                                  // cama curiosa, un poco tapada mientras crece la gota
m.pad(F + 1.8, Ou + 3.5, 0.05, [45, 52, 60], 0);                              // se suelta después de la fusión
for (let i = 0; i < 10; i++) m.tic(G + 0.15 + i * 0.12, 0.1, 3000 + (i % 3) * 400); // chispitas bajo el sombrero
m.cruje(G + 1.3, 0.25);                                                        // se tacha "¿quieto?"
m.golpe(G + 2.25, 0.3, 90);                                                    // ¡está disparando!
m.whoosh(B - 0.8, 1.0, 0.12);                                                  // zoom al microscopio
for (let i = 0; i < 8; i++) m.nota(B + 0.9 + i * 0.22, m.ESC[4 + (i % 5)], 0.04, 0.4); // aparecen las esporas
for (let i = 0; i < 6; i++) m.tic(Go + 1.2 + i * 0.18, 0.1, 1800);           // salen los azúcares
for (let i = 0; i < 22; i++) m.burbuja(Go + 3.6 + i * 0.32, 0.05, 700 + (i % 4) * 60); // el vapor se condensa
m.sube(Go + 2.4, F + 1.8 - (Go + 2.4), 52, 64, 0.03);                         // la gota crece (tono que sube)
m.nota(Bu + 1.6, 69, 0.05, 1.0);                                               // aparece la capa de agua
m.gota(F + 1.8, 0.35, 700); m.golpe(F + 1.8, 0.25, 110);                       // ¡plop! fusión
m.tic(F + 2.6, 0.1, 2600);
m.nota(D + 1.0, 74, 0.05, 0.6);                                                // centro de masa
m.metal(D + 2.6, 0.18, 1200); m.whoosh(D + 2.6, 0.7, 0.16);                    // ¡catapulta!
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // pregunta
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 4; i++) m.tic(E + 2.0 + i * 0.35, 0.12, 2200);           // cuadros de la película
m.tic(E + 3.0, 0.08, 1500); m.tic(E + 3.3, 0.08, 1500);
m.golpe(Fz + 0.3, 0.5, 60); m.whoosh(Fz + 0.2, 0.6, 0.12);                     // +10,000 g
const LAN = [Ca + 1.2, Ca + 2.4, Ca + 3.2, Ca + 4.0, Ca + 4.6, Fr + 0.2, Fr + 0.8, Fr + 1.4];
for (const t of LAN) { m.tic(t, 0.12, 2800); m.sube(t + 0.9, 0.6, 72, 64, 0.02); } // disparo corto y caída suave
m.cruje(Ca + 2.2, 0.15);                                                       // la X de la laminilla de enfrente
for (let i = 0; i < 6; i++) m.nota(Es + 0.4 + i * 0.22, m.ESC[3 + i], 0.05, 0.5); // las especies
for (let i = 0; i < 12; i++) m.tic(C + 0.4 + i * 0.3, 0.05, 3200);            // lluvia de esporas
m.nota(C + 1.4, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
