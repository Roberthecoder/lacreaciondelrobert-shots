// gen-audio.mjs — cama grave + efectos del Shot Científico #13 (el agua hierve antes en la CDMX). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hervir Altura base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
const borbotea = (a, b, cada = 0.23, g = 0.06, f0 = 380) => { for (let t = a; t < b; t += cada) m.burbuja(t + m.rnd() * 0.1, g, f0 + m.rnd() * 300); };
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
borbotea(0, K.Cien, 0.2, 0.07);                                                                          // la olla hierve a borbotones
m.sube(K.Gancho + 0.3, 2.3, 64, 57, 0.05);                                                               // el termómetro baja de 100 a 92
m.golpe(K.Gancho + 1.6, 0.35, 85);                                                                       // «92 °C»
m.whoosh(K.Cien - 0.3, 0.6, 0.12);
borbotea(K.Cien, K.Burbujas, 0.35, 0.04);
for (let i = 0; i < 3; i++) m.nota(K.Cien + 0.2 + i * 0.12, [69, 72, 76][i], 0.05, 0.4);                  // chip 100 °C
m.tic(K.Cien + 0.6, 0.2, 1800); m.whoosh(K.Cien + 1.6, 0.35, 0.16);                                      // tachado
m.zumbido(K.Burbujas, 1.2, 0.04, 70);
borbotea(K.Burbujas + 0.3, K.Columna, 0.3, 0.06, 300);                                                   // burbujas en el fondo
for (let i = 0; i < 5; i++) m.whoosh(K.Burbujas + 2.0 + i * 0.08, 0.4, 0.05);                            // flechas de aire
m.metal(K.Burbujas + 3.0, 0.1, 620);                                                                     // lupa
m.whoosh(K.Columna - 0.3, 0.6, 0.12);
m.sube(K.Columna + 0.3, 1.2, 52, 64, 0.05);                                                              // crecen las columnas de aire
m.golpe(K.Columna + 2.6, 0.3, 65);                                                                       // playa: pesa más
m.tic(K.Columna + 4.0, 0.2, 2200);                                                                       // montaña: pesa menos
m.whoosh(K.Facil - 0.3, 0.6, 0.12);
borbotea(K.Facil + 0.8, K.Pregunta, 0.12, 0.06, 450);                                                    // salen más rápido
m.sube(K.Facil + 1.4, 1.8, 64, 57, 0.04);
m.sube(K.Pregunta + 0.05, 1.1, 52, 64, 0.05);
m.whoosh(K.Guadalajara - 0.4, 0.8, 0.14);                                                                // entra el mapa
m.gota(K.Guadalajara + 0.1, 0.2, 700); m.gota(K.Guadalajara + 0.9, 0.2, 800);                           // pines
m.nota(K.Guadalajara + 1.2, 74, 0.05, 0.6);
m.gota(K.Mar + 0.2, 0.2, 900); m.gota(K.Mar + 0.8, 0.2, 1000);
m.nota(K.Mar + 0.4, 76, 0.05, 0.6); m.nota(K.Mar + 1.0, 79, 0.05, 0.6);
m.whoosh(K.Frijoles - 0.3, 0.6, 0.12);
for (let t = K.Frijoles + 0.6; t < K.Frijoles + 4.8; t += 0.25) m.tic(t, 0.12, 2600);                    // relojes
m.golpe(K.Frijoles + 2.0, 0.2, 140);                                                                     // el huevo
m.nota(K.Frijoles + 3.2, 76, 0.07, 0.7); m.nota(K.Frijoles + 4.8, 72, 0.07, 0.9);                        // listo playa · listo montaña (después)
m.whoosh(K.Olla - 0.3, 0.6, 0.12);
m.metal(K.Olla + 0.6, 0.25, 420);                                                                        // cierra la tapa
m.zumbido(K.Olla + 1.4, 3.2, 0.03, 1900);                                                                // la válvula silba
for (let i = 0; i < 4; i++) m.whoosh(K.Olla + 1.5 + i * 0.4, 0.5, 0.1);
m.sube(K.Olla + 3.0, 2.0, 57, 69, 0.05);                                                                 // sube a 120
m.golpe(K.Olla + 4.2, 0.35, 85);
m.whoosh(K.Everest - 0.3, 0.8, 0.16);                                                                    // viento en la cima
m.sube(K.Everest + 0.6, 1.6, 64, 52, 0.04);                                                              // baja a 70
for (let t = K.Everest + 1.0; t < K.Cierre; t += 0.18) m.tic(t, 0.08, 2000);                            // reloj que no para
m.whoosh(K.Cierre - 0.3, 0.6, 0.12);
borbotea(K.Cierre, K.Outro, 0.22, 0.06);
m.nota(K.Cierre + 0.4, 72, 0.06, 0.8);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
