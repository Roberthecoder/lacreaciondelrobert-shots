// gen-audio.mjs — cama grave + efectos del Shot Científico #56 (en el espacio nadie oye las explosiones). Sin costo: todo se calcula (audio-kit.mjs).
// La explosión de película (gancho) sí suena; las del espacio (cierre) van en silencio: es el punto del shot.
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Espacio Silencio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
m.whoosh(K.Gancho, 0.6, 0.12);                                                                           // la nave de película cruza
m.golpe(K.Gancho + 0.6, 0.55, 60); m.cruje(K.Gancho + 0.62, 0.7); m.golpe(K.Gancho + 0.75, 0.35, 45);   // ¡BOOM! de película
m.whoosh(K.Gancho + 2.5, 0.4, 0.12);                                                                     // se tacha
m.pad(K.Gancho + 3.2, K.Cierre + 0.2, 0.05, [45, 52, 57]);                                               // cama grave (entra tras el silencio)
for (let i = 0; i < 6; i++) m.tic(K.Sonido + 0.5 + i * 0.35, 0.12, 900);                                  // la bocina empuja
[0, 1, 2].forEach((i) => m.burbuja(K.Sonido + 3.0 + i * 0.6, 0.12, 400 + i * 150));                      // aire, agua, sólido
for (let i = 0; i < 8; i++) m.tic(K.Cadena + 0.4 + i * 0.4, 0.13, 1400 + i * 120);                        // empujón en cadena
m.nota(K.Cadena + 3.4, 76, 0.06, 0.8);                                                                   // llega al oído
m.whoosh(K.Vacio + 0.4, 0.8, 0.08);
for (let i = 0; i < 3; i++) m.gota(K.Vacio + 1.2 + i * 0.3, 0.1, 1200);                                   // poquísimas partículas
for (let i = 0; i < 4; i++) m.nota(K.Nada + 0.3 + i * 0.5, 69, 0.06 * (1 - i / 4), 0.5, 0.3 + i * 0.2);    // el sonido se apaga
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.zumbido(K.Radio + 0.4, 1.4, 0.04, 330);                                                                // radio
for (let i = 0; i < 3; i++) m.nota(K.Radio + 2.2 + i * 0.15, [81, 84, 88][i], 0.04, 0.3);
m.motor(K.Estacion + 0.3, 3.6, 0.04);                                                                    // dentro de la Estación hay aire
m.golpe(K.Boyle + 0.25, 0.3, 80);
for (let i = 0; i < 9; i++) m.metal(K.Boyle + 2.6 + i * 0.62, 0.05, 220);                                 // la bomba
for (let i = 0; i < 18; i++) m.tic(K.Boyle + 2.2 + i * 0.5, 0.22 * Math.max(0.03, 1 - Math.max(0, i * 0.5 - 0.8) / 3.8), 2600); // tic tac que se apaga
m.golpe(K.Galaxias + 0.3, 0.25, 70);
m.zumbido(K.Galaxias + 1.0, 3, 0.03, 60);                                                                // ondas del gas
m.sube(K.Galaxias + 4.6, 2.8, 33, 93, 0.06);                                                             // subidas muchísimas octavas
// Cierre: la explosión enorme… sin ningún sonido (ni la cama).
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
