// gen-audio.mjs — cama grave + efectos del Shot Químico #24 (hielo seco). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot HieloSeco base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 124);
const K = m.K;
const G = K.Gancho, Q = K.Que, Su = K.Sublima, In = K.Invisible, Nu = K.Nube, Pr = K.Pregunta, Ri = K.Riesgo, Es = K.Estudio, Th = K.Thilorier, Re = K.Regla, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                               // cama grave y fría
for (let i = 0; i < 3; i++) m.tic(G + 0.6 + i * 0.06, 0.25, 1600 + i * 300);          // ¡tac! los trozos caen en el vaso vacío
m.whoosh(G + 0.6, 2.4, 0.07);                                                         // la niebla rebosa
m.golpe(G + 1.8, 0.25, 90);                                                           // se tacha "¿humo?"
m.sube(Q + 1.0, 2.0, 72, 55, 0.05);                                                   // el termómetro se desploma
for (let i = 0; i < 4; i++) m.tic(Q + 2.2 + i * 0.1, 0.1, 3200);                      // escarcha
m.whoosh(Su + 0.4, 3.6, 0.05);                                                        // siseo de la sublimación
for (let i = 0; i < 11; i++) m.burbuja(Su + 1.2 + i * 0.25, 0.06, 900 + (i % 4) * 120); // cada molécula que se suelta
m.golpe(Su + 2.0, 0.2, 100);                                                          // se tacha "líquido"
m.nota(In + 0.3, 76, 0.04, 0.8); m.nota(In + 0.9, 79, 0.04, 0.8);                    // se vuelve invisible
for (let i = 0; i < 3; i++) m.gota(Nu + 2.6 + i * 0.15, 0.18, 1100 + i * 150);        // se forman las gotitas
m.whoosh(Nu + 4.0, 1.4, 0.06);                                                        // la cámara se aleja
m.sube(Pr + 0.1, 1.5, 52, 64, 0.05);                                                  // ¿es inofensivo?
m.golpe(Ri + 0.1, 0.3, 80);
m.sube(Ri + 0.6, 1.7, 48, 67, 0.05);                                                  // el globo se infla
m.zumbido(Ri + 2.8, 2.2, 0.04, 140);                                                  // el CO₂ llena el cuarto
m.metal(Ri + 5.8, 0.12, 700); m.tic(Ri + 5.6, 0.12, 2800);                            // quemadura por frío ✗
m.golpe(Es + 0.2, 0.35, 80);
m.motor(Es + 0.3, 5.8, 0.07);                                                         // la camioneta
m.pad(Es + 5.8, Es + 7.6, 0.02, [50, 55], 0.6);                                       // se desmaya: todo se apaga
m.metal(Es + 7.6, 0.18, 520); m.whoosh(Es + 7.7, 1.0, 0.1);                           // abre la puerta, entra aire
m.golpe(Th + 0.2, 0.35, 80);
m.whoosh(Th + 2.6, 1.0, 0.04);                                                        // vapor espeso
for (let i = 0; i < 10; i++) m.tic(Th + 3.6 + i * 0.11, 0.08, 1300);                  // el tapón tiembla
m.golpe(Th + 4.7, 0.5, 70); m.whoosh(Th + 4.7, 0.6, 0.12);                            // ¡PUM!
m.metal(Re + 0.5, 0.12, 700); m.metal(Re + 1.4, 0.12, 700);                           // ✗ ✗
m.nota(Re + 2.2, 67, 0.05, 0.5); m.nota(Re + 2.4, 72, 0.05, 0.6);                     // ✓ ✓
m.whoosh(Ci + 0.3, 3.0, 0.06);                                                        // la misma niebla del inicio
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
