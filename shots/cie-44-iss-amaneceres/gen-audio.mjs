// gen-audio.mjs — cama grave + efectos del Shot Científico #44 (16 amaneceres al día en la Estación Espacial). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot ISS Amaneceres base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 344);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [41, 48, 53]);
// gancho: cada amanecer de la estación (cada 1.7 s) y cada solecito que se cuenta (16 en 3.7 s)
for (let t = 0.31; t < K.Velocidad; t += 1.7) { m.sube(t - 0.2, 0.5, 64, 76, 0.05); m.nota(t, 79, 0.05, 0.5); }
for (let i = 0; i < 16; i++) m.nota(0.3 + (i + 0.4) * 3.7 / 16, [72, 76, 79, 84][i % 4], 0.035, 0.25);
m.golpe(K.Gancho + 3.8, 0.25, 100);                                                                      // ≈ 16
m.whoosh(K.Velocidad - 0.3, 1.0, 0.2); m.motor(K.Velocidad, 3.4, 0.05);                                  // pasa la estación
m.sube(K.Velocidad + 0.2, 1.2, 45, 69, 0.06); m.golpe(K.Velocidad + 1.4, 0.3, 90);                        // ≈ 28,000 km/h
m.nota(K.Velocidad + 1.6, 74, 0.05, 0.5);                                                                // etiqueta
m.whoosh(K.Vuelta - 0.3, 0.9, 0.14);                                                                     // vista desde el polo
for (let i = 0; i < 16; i++) m.tic(K.Vuelta + 0.3 + i * 0.25, 0.1, 2200);                                // el cronómetro corre
m.nota(K.Dia - 1.0, 72, 0.06, 0.8); m.golpe(K.Dia - 1.0, 0.25, 110);                                     // ≈ 90 min
m.zumbido(K.Dia - 0.3, 1.0, 0.03, 70);                                                                   // cae la noche
m.sube(K.Dia + 0.6, 0.6, 60, 72, 0.06); m.nota(K.Dia + 0.78, 79, 0.06, 0.6);                              // amanecer
m.sube(K.Dia + 4.0, 0.6, 67, 55, 0.05); m.nota(K.Dia + 4.2, 60, 0.05, 0.6);                               // atardecer
m.golpe(K.Cuenta + 0.1, 0.22, 120); m.golpe(K.Cuenta + 0.9, 0.22, 120);                                  // 24 h · ÷ 90 min
m.golpe(K.Cuenta + 2.0, 0.32, 90); m.nota(K.Cuenta + 2.0, 76, 0.06, 0.7);                                // ≈ 16
for (let i = 0; i < 16; i++) m.nota(K.Cuenta + 1.4 + (i + 0.5) * 0.2, [67, 71, 74, 79][i % 4], 0.03, 0.18); // cada cuadro de 90 min
m.whoosh(K.Altura - 0.3, 0.9, 0.14); m.sube(K.Altura + 0.4, 0.8, 50, 66, 0.05);                           // la regla sube
m.golpe(K.Altura + 1.0, 0.22, 110);                                                                      // ≈ 400 km
m.whoosh(K.Altura + 2.4, 0.7, 0.1); m.nota(K.Altura + 2.6, 72, 0.05, 0.6);                                // bastante cerca
m.sube(K.Pregunta + 0.05, 1.4, 52, 64, 0.05);                                                            // ¿?
m.whoosh(K.Horario - 0.3, 0.8, 0.12);
for (let i = 0; i < 18; i++) m.tic(K.Horario + 0.2 + i * 0.3, 0.09, 1600);                              // tic-tac del reloj
for (let t = K.Horario + 1.2; t < K.Ventanas - 0.3; t += 1.5) m.nota(t + 0.05, 81, 0.035, 0.35);          // afuera amanece cada ciclo
m.zumbido(K.Ventanas + 0.4, 1.2, 0.04, 120);                                                             // baja la persiana
m.golpe(K.Ventanas + 1.6, 0.15, 140);
m.sube(K.Ventanas + 2.4, 2.2, 64, 57, 0.04);                                                             // la luz se vuelve cálida
for (let i = 0; i < 18; i++) m.tic(K.Ejercicio + 0.2 + i * 0.286, 0.08, 900);                            // pasos en la caminadora
m.nota(K.Ejercicio + 0.4, 72, 0.05, 0.5);                                                                // ≈ 2 h al día
m.whoosh(K.Ejercicio + 3.4, 0.7, 0.1); m.zumbido(K.Ejercicio + 3.6, 3.6, 0.03, 160);                      // la bici
m.nota(K.Ejercicio + 4.0, 64, 0.05, 0.5);                                                                // huesos y músculos
m.burbuja(K.Ejercicio + 5.3, 0.1, 400); m.burbuja(K.Ejercicio + 5.7, 0.08, 520);                          // microgravedad: todo flota
m.whoosh(K.Rapido - 0.3, 0.9, 0.12);
for (let i = 0; i < 5; i++) m.tic(K.Rapido + 0.6 + i, 0.1, 2000);                                        // segundos
m.sube(K.Rapido + 0.8, 3.0, 48, 72, 0.06);                                                               // la línea de colores
m.nota(K.Rapido + 3.5, 76, 0.06, 1.0); m.nota(K.Rapido + 3.5, 83, 0.04, 1.0);                             // asoma el Sol
m.whoosh(K.Cierre - 0.3, 0.9, 0.12);
m.golpe(K.Cierre + 0.3, 0.2, 110); m.nota(K.Cierre + 0.4, 72, 0.05, 0.5);                                 // tú: 1
for (let i = 0; i < 16; i++) m.nota(K.Cierre + 1.4 + (i + 0.4) * 1.4 / 16, [72, 76, 79, 84][i % 4], 0.03, 0.2); // ellos: 16
m.nota(K.Outro + 0.3, 53, 0.08, 2.8); m.nota(K.Outro + 0.3, 60, 0.06, 2.8); m.nota(K.Outro + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
