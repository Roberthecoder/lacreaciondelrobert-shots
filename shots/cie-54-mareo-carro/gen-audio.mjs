// gen-audio.mjs — cama grave + efectos del Shot Científico #54 (mareo en el carro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mareo Carro base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 96);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.motor(K.Gancho, K.Oido - K.Gancho, 0.05);                                                             // el carro en curvas
m.whoosh(K.Gancho + 0.2, 0.8, 0.12);
m.golpe(K.Gancho + 2.5, 0.25, 90); m.cruje(K.Gancho + 3.0, 0.5);                                         // «tu estómago» tachado
m.zumbido(K.Gancho + 4.6, 1.6, 0.05, 220);                                                              // chispas en el cerebro
m.whoosh(K.Oido + 0.4, 0.6, 0.12);
for (let i = 0; i < 6; i++) m.burbuja(K.Oido + 1.0 + i * 0.55, 0.1, 380 + (i % 3) * 60);                // líquido del oído interno
m.nota(K.Oido + 2.0, 72, 0.05, 0.6);
m.golpe(K.Ojos + 0.4, 0.2, 120);                                            // sube el libro
for (let i = 0; i < 4; i++) m.whoosh(K.Ojos + 0.8 + i * 0.7, 0.4, 0.05);                                // paisaje que pasa
m.tic(K.Ojos + 1.0, 0.15, 2000);
m.nota(K.Choque + 0.2, 76, 0.07, 0.4); m.nota(K.Choque + 1.3, 64, 0.07, 0.4);                             // los dos globos
m.zumbido(K.Choque + 2.2, 1.4, 0.07, 180);
m.golpe(K.Teoria + 0.3, 0.3, 80);
m.whoosh(K.Teoria + 0.6, 0.4, 0.08); m.whoosh(K.Teoria + 0.9, 0.4, 0.08);
m.metal(K.Teoria + 2.2, 0.12, 620);
m.zumbido(K.Teoria + 3.6, 1.6, 0.06, 200);
m.sube(K.Pregunta + 0.1, 1.3, 52, 64, 0.05);
for (let i = 0; i < 6; i++) m.nota(K.Veneno + 2.4 + i * 0.5, i % 2 ? 74 : 79, 0.045, 0.22);             // alarma ¿veneno?
m.sube(K.Veneno + 4.4, 0.5, 64, 52, 0.05); m.burbuja(K.Veneno + 5.1, 0.18, 260); m.burbuja(K.Veneno + 5.3, 0.18, 220);
m.motor(K.Conductor, K.Consejo - K.Conductor, 0.04);
m.metal(K.Conductor + 2.6, 0.1, 900);                                                                    // señal de curva
m.golpe(K.Conductor + 4.7, 0.35, 70); m.whoosh(K.Conductor + 4.7, 0.5, 0.15);                             // ¡frenón!
for (let i = 0; i < 3; i++) { m.whoosh(K.Consejo + 0.3 + i * 1.5, 0.5, 0.09); m.nota(K.Consejo + 0.95 + i * 1.5, [72, 76, 79][i], 0.07, 0.5); }
m.whoosh(K.Barco + 0.2, 1.0, 0.1); m.whoosh(K.Barco + 1.3, 0.8, 0.14); m.golpe(K.Barco + 2.7, 0.25, 100);   // barco, avión, lentes
for (let i = 0; i < 3; i++) m.golpe(K.Ninos + 0.3 + i * 0.25, 0.18, 120);
m.tic(K.Ninos + 1.2, 0.18, 2200);
m.motor(K.Cierre, K.Outro - K.Cierre, 0.03);
m.nota(K.Cierre + 0.6, 69, 0.06, 0.8); m.nota(K.Cierre + 0.8, 76, 0.05, 0.8);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
