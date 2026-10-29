// gen-audio.mjs — cama grave + efectos del Shot Científico #18 (GPS y relatividad). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot GPS Relatividad base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 180);
const K = m.K;
const ping = (t, n = 84, g = 0.05) => m.nota(t, n, g, 0.35);
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(0, 0.4, 0.1); for (let i = 0; i < 5; i++) ping(0.1 + i * 1.0, 81, 0.035);                    // el puntito del mapa
m.whoosh(1.1, 1.8, 0.08);                                                                             // pasa un satélite
m.golpe(3.05, 0.3, 110); m.nota(3.1, 76, 0.06, 0.6);                                                   // la silueta y el reloj «t»
m.sube(K.Satelites - 0.4, 1.8, 45, 69, 0.06); m.whoosh(K.Satelites, 1.2, 0.12);                        // la cámara sube a la órbita
for (let i = 0; i < 9; i++) ping(K.Satelites + 0.5 + i * 0.12, 72 + (i % 4) * 3, 0.03);               // aparecen los satélites
m.golpe(K.Satelites + 2.0, 0.25, 100);                                                                 // ≈ 20,000 km
m.golpe(K.Relojes + 0.4, 0.25, 120);                                                                   // por dentro: reloj atómico
for (let i = 0; i < 16; i++) m.tic(K.Relojes + 0.6 + i * 0.25, 0.12, 3000);
for (let k = 0; k < 3; k++) ping(K.Relojes + 2.0 + k * 0.9, 88, 0.04);                                // hora de salida
for (let i = 0; i < 3; i++) { m.whoosh(K.Distancia + 0.3 + i * 0.45, 1.2, 0.07); ping(K.Distancia + 1.5 + i * 0.45, 79 + i * 3, 0.05); } // señales llegan
for (let i = 0; i < 3; i++) m.sube(K.Distancia + 3.3 + i * 0.35, 1.0, 55 + i * 4, 62 + i * 4, 0.035); // círculos de distancia
m.nota(K.Distancia + 4.9, 84, 0.06, 0.8); m.nota(K.Distancia + 4.9, 88, 0.04, 0.8);                    // aquí estás
m.golpe(K.Pregunta, 0.4, 70); m.nota(K.Pregunta + 0.1, 62, 0.05, 1.2);                                  // ¿y Einstein?
m.zumbido(K.Gravedad + 0.6, 3, 0.04, 60);                                                              // la gravedad
for (let i = 0; i < 20; i++) m.tic(K.Gravedad + 1.0 + i * (i < 8 ? 0.4 : 0.26), 0.12, 2600);           // el reloj de arriba acelera
m.golpe(K.Gravedad + 4.6, 0.35, 90); m.nota(K.Gravedad + 4.6, 79, 0.06, 0.8);                          // +45
m.whoosh(K.Velocidad + 0.2, 1.4, 0.14); m.motor(K.Velocidad + 0.2, 3.0, 0.04);                         // el satélite corre
m.sube(K.Velocidad + 3.4, 0.7, 64, 52, 0.06); m.golpe(K.Velocidad + 3.4, 0.25, 80);                    // −7: se atrasa
m.nota(K.Neto + 0.3, 67, 0.05, 0.5); m.nota(K.Neto + 1.0, 60, 0.05, 0.4); m.nota(K.Neto + 1.7, 64, 0.05, 0.5);
m.golpe(K.Neto + 2.0, 0.5, 70); m.nota(K.Neto + 2.0, 76, 0.07, 1.2); m.nota(K.Neto + 2.0, 83, 0.05, 1.2); // +38
for (let i = 0; i < 6; i++) m.whoosh(K.Error + 0.4 + i * 0.62, 0.3, 0.05);                              // la señal a la velocidad de la luz
m.sube(K.Error + 3.4, 3.0, 57, 45, 0.06);                                                              // el puntito se desvía
m.metal(K.Error + 5.2, 0.12, 700); m.golpe(K.Error + 5.0, 0.4, 70);                                    // > 10 km por día
for (let i = 0; i < 6; i++) m.metal(K.Correccion + 0.8 + i * 0.33, 0.05, 1200 + (i % 2) * 300);         // la llave ajusta
m.whoosh(K.Correccion + 3.0, 0.9, 0.12);                                                               // al espacio
for (let i = 0; i < 10; i++) m.tic(K.Correccion + 3.4 + i * 0.28, 0.14, 2400);                         // marcan igual
for (let i = 0; i < 4; i++) ping(K.Cierre + 0.3 + i * 0.7, 81, 0.035);                                 // el puntito avanza
m.nota(K.Cierre + 3.0, 72, 0.07, 1.2); m.nota(K.Cierre + 3.0, 79, 0.05, 1.2); m.golpe(K.Cierre + 3.0, 0.25, 120); // llegaste
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
