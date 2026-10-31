// gen-audio.mjs — cama grave + efectos del Shot Científico #33 (la Tierra gira y tú con ella). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tierra Gira base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 330);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.sube(0.05, 0.75, 45, 69, 0.07); m.motor(0.1, 4.5, 0.04);                                              // la aguja del velocímetro se dispara
m.golpe(K.Gancho + 0.6, 0.3, 90);                                                                        // > 1,500 km/h
m.nota(K.Gancho + 4.2, 72, 0.05, 0.6);                                                                   // …y no lo sientes
m.whoosh(K.Giro - 0.4, 1.4, 0.2);                                                                        // la cámara se aleja
m.zumbido(K.Giro + 1.0, 4.0, 0.04, 70);                                                                  // la Tierra gira
for (let i = 0; i < 8; i++) m.tic(K.Giro + 2.3 + i * 0.25, 0.12, 2200);                                  // el reloj: 1 vuelta ≈ 1 día
m.sube(K.Ecuador + 0.2, 0.9, 57, 69, 0.05); m.whoosh(K.Ecuador + 0.6, 0.8, 0.14);                         // el ecuador se ilumina y el punto corre
m.nota(K.Ecuador + 1.0, 76, 0.06, 0.7);
m.whoosh(K.Mexico - 0.3, 0.9, 0.16);                                                                     // entra el mapa
m.nota(K.Mexico + 0.5, 74, 0.06, 0.5); m.sube(K.Mexico + 0.8, 1.0, 55, 62, 0.04);                       // Guadalajara, más lejos
m.golpe(K.Mexico + 1.4, 0.18, 120);
m.nota(K.Mexico + 4.3, 76, 0.06, 0.5); m.golpe(K.Mexico + 4.5, 0.18, 130);                               // CDMX
for (let i = 0; i < 5; i++) m.nota(K.Polos + 0.3 + i * 0.4, [79, 76, 79, 76, 79][i], 0.04, 0.3);          // vueltas en tu lugar
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.zumbido(K.Constante + 0.3, 2.2, 0.03, 140);                                                            // la línea plana
m.golpe(K.Constante + 2.6, 0.4, 70); m.cruje(K.Constante + 2.6, 0.4);                                    // ¡frenón!
m.motor(K.Avion, 5.5, 0.06); m.whoosh(K.Avion + 0.4, 1.2, 0.08);                                         // dentro del avión
m.gota(K.Avion + 2.0, 0.08, 1200);                                                                       // el vaso quieto
m.sube(K.Lento + 0.3, 4.0, 50, 57, 0.03);                                                                // la flecha gira despacio
for (let i = 0; i < 6; i++) m.tic(K.Lento + 0.4 + i * 0.7, 0.1, 1900);
m.golpe(K.Pendulo + 0.25, 0.35, 80);                                                                     // tarjeta 1851
for (let i = 0; i < 4; i++) m.whoosh(K.Pendulo + 2.6 + i * 1.31, 0.8, 0.07);                              // el péndulo va y viene
m.metal(K.Pendulo + 2.9, 0.08, 520);
m.whoosh(K.Cierre + 0.4, 1.2, 0.14);                                                                     // el piso se vuelve la Tierra
m.nota(K.Cierre + 2.4, 72, 0.06, 0.8); m.golpe(K.Cierre + 2.4, 0.3, 100);                                // > 37,000 km
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
