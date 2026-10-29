// gen-audio.mjs — cama grave + efectos del Shot Científico #55 (oídos en el avión). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Oidos Avion base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
m.pad(0, K.Trago + 3.3, 0.05, [45, 52, 57], 0.6);                                                       // tapada mientras el oído está tapado
m.pad(K.Trago + 3.3, K.Outro + 3.5, 0.05, [45, 52, 57]);                                                  // libre después del pop
m.motor(0, K.Oido + 0.3, 0.05);                                                                          // turbinas del avión
m.golpe(K.Gancho + 0.3, 0.3, 80);                                                                        // la mano tapa el oído
m.whoosh(K.Gancho + 2.0, 0.4, 0.12);                                                                     // ¿por el ruido? tachado
m.whoosh(K.Gancho + 3.0, 0.6, 0.12);                                                                     // flecha al oído
m.whoosh(K.Oido + 0.25, 0.7, 0.14); m.metal(K.Oido + 0.8, 0.08, 620);                                     // se abre la lupa
m.sube(K.Trompa + 0.6, 1.0, 52, 59, 0.05); m.tic(K.Trompa + 3.2, 0.15, 1800);                             // aparece la trompa · cerrado
m.motor(K.Cabina, 5, 0.04);
m.nota(K.Cabina + 1.6, 69, 0.05, 0.6); m.nota(K.Cabina + 2.6, 64, 0.05, 0.6);                              // las dos barras
m.whoosh(K.Bajada + 0.2, 1.2, 0.1); m.sube(K.Bajada + 0.3, 2.9, 57, 64, 0.04);                             // el avión baja y la presión sube
m.whoosh(K.Bajada + 1.6, 0.6, 0.12); m.golpe(K.Bajada + 2.4, 0.22, 60); m.golpe(K.Bajada + 2.9, 0.18, 60); // empuja el tímpano
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Trago + 1.0, 0.25, 70);                                                                        // trago
for (let i = 0; i < 6; i++) m.burbuja(K.Trago + 2.0 + i * 0.2, 0.14, 420 + i * 40);                         // pasa aire por el tubito
m.golpe(K.Trago + 3.3, 0.35, 120); m.gota(K.Trago + 3.32, 0.3, 700);                                      // ¡pop!
for (let i = 0; i < 3; i++) m.nota(K.Consejos + [0.6, 1.5, 2.3][i], [72, 76, 79][i], 0.06, 0.4);            // chicle, vaso, bostezo
m.whoosh(K.Consejos + 3.4, 0.6, 0.1);
for (let i = 0; i < 6; i++) m.gota(K.Bebes + 2.4 + i * 0.5, 0.12, 500);                                    // el bebé traga seguido
m.zumbido(K.Gripa + 0.6, 1.5, 0.05, 90); m.metal(K.Gripa + 0.3, 0.1, 400);                                // se inflama
for (let i = 0; i < 4; i++) m.burbuja(K.Gripa + 2.5 + i * 0.5, 0.06, 300);
m.motor(K.Montana - 0.3, 3.4, 0.05);                                                                     // el carro baja
m.golpe(K.Montana + 2.0, 0.3, 120); m.gota(K.Montana + 2.02, 0.25, 700);                                  // ¡pop! en la montaña
m.whoosh(K.Cierre + 0.6, 0.6, 0.12); m.golpe(K.Cierre + 1.3, 0.3, 120); m.gota(K.Cierre + 1.32, 0.25, 760);  // se destapa
m.nota(K.Cierre + 1.5, 76, 0.06, 0.8);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
