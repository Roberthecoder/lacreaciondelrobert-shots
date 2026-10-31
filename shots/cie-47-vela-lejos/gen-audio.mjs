// gen-audio.mjs — cama grave + efectos del Shot Científico #47 (¿a qué distancia ves una vela?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vela Lejos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 147);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.campana = (t, mm, g) => { m.nota(t, mm, g, 1.6); m.nota(t, mm + 12, g * 0.4, 1.2); };
m.campana(K.Gancho + 0.05, 79, 0.06);                                                   // la llamita a lo lejos
m.whoosh(K.Gancho + 1.2, 1.3, 0.1);                                                     // la línea de distancia
m.nota(K.Gancho + 2.5, 74, 0.06, 0.5);                                                  // «?»
m.golpe(K.Gancho + 3.9, 0.3, 90);                                                       // aparece «¿casi 50 km?»
m.sube(K.Gancho + 7.4, 0.5, 70, 58, 0.06); m.tic(K.Gancho + 7.45, 0.2, 1500);          // se tacha
m.nota(K.Gancho + 8.6, 64, 0.05, 0.6);
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                    // tarjeta del estudio
m.campana(K.Estudio + 3.2, 76, 0.05);                                                   // se enciende la vela
for (let i = 0; i < 10; i++) m.tic(K.Vela + 0.4 + i * 0.12, 0.12, 2000 + i * 40);       // la regla de 338 m
m.nota(K.Vela + 1.4, 67, 0.06, 0.7);
m.campana(K.Vela + 3.1, 84, 0.06);                                                      // Vega
m.whoosh(K.Vela + 4.2, 0.6, 0.08);
m.golpe(K.Camara + 0.4, 0.3, 70);                                                       // llega la cámara
m.tic(K.Camara + 1.1, 0.25, 3200); m.tic(K.Camara + 1.18, 0.2, 2600);                   // obturador
for (let i = 0; i < 6; i++) m.nota(K.Camara + 2.3 + i * 0.13, 81 + (i % 3) * 2, 0.03, 0.25); // píxeles que se encienden
for (let i = 0; i < 7; i++) m.nota(K.Estrellas + 0.4 + i * 0.25, 88 - i * 2, 0.05 - i * 0.005, 0.7); // estrellas cada vez más débiles
m.whoosh(K.Estrellas + 2.2, 0.8, 0.08);
m.campana(K.Estrellas + 3.3, 76, 0.06);                                                 // magnitud 6
m.sube(K.Calculo + 0.4, 3.8, 72, 55, 0.05);                                             // la vela se aleja, el brillo baja
m.metal(K.Calculo + 4.2, 0.12, 660);                                                    // ¡igual que la estrella!
m.golpe(K.Resultado + 0.2, 0.4, 75); m.nota(K.Resultado + 0.3, 69, 0.07, 1.2);          // ≈ 2.6 km
m.tic(K.Resultado + 2.3, 0.2, 1800);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
for (let i = 0; i < 25; i++) m.tic(K.Real + 0.4 + i * 0.1, 0.1, 1400 + i * 50);         // 25 canchas
m.nota(K.Real + 3.0, 76, 0.06, 0.9);
m.sube(K.Ojo + 0.2, 1.4, 48, 60, 0.05);                                                 // la pupila se abre
for (let i = 0; i < 5; i++) m.nota(K.Ojo + 1.6 + i * 0.3, 91, 0.025, 0.3);              // fotones en los bastones
m.campana(K.Cierre + 0.1, 79, 0.06);
m.sube(K.Cierre + 0.5, 0.4, 70, 58, 0.05); m.tic(K.Cierre + 0.6, 0.2, 1500);
m.golpe(K.Cierre + 0.9, 0.3, 85);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
