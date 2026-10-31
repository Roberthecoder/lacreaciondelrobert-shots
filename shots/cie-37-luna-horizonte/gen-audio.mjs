// gen-audio.mjs — cama grave + efectos del Shot Científico #37 (la Luna en el horizonte). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Luna Horizonte base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 160);
const K = m.K;
const pop = (t, n = 76) => { m.golpe(t, 0.25, 90); m.nota(t + 0.03, n, 0.05, 0.5); };
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.sube(K.Gancho, 5.0, 48, 55, 0.04);                                                                     // la Luna gigante sale
pop(K.Gancho + 0.3, 76);                                                                                  // «¿gigante?»
m.whoosh(K.Gancho + 2.3, 0.5, 0.08); m.tic(K.Gancho + 2.6, 0.15, 1800);                                  // aparece la regla
m.golpe(K.Gancho + 3.4, 0.35, 70); m.nota(K.Gancho + 3.45, 69, 0.06, 0.7);                               // «ENGAÑO»
m.whoosh(K.Medida + 0.4, 0.5, 0.07); m.tic(K.Medida + 0.8, 0.15, 1800);                                  // regla abajo
m.sube(K.Medida + 2.6, 1.4, 60, 72, 0.05);                                                               // la Luna sube
m.tic(K.Medida + 4.0, 0.15, 1800); m.nota(K.Medida + 4.3, 79, 0.05, 0.6);                                // «casi el mismo tamaño»
for (let i = 0; i < 6; i++) { const t = K.Foto + 0.4 + i * 0.7; m.metal(t, 0.06, 3000); m.tic(t, 0.25, 2600); } // clic de cámara
m.nota(K.Foto + 4.4, 76, 0.05, 0.5); m.golpe(K.Foto + 4.9, 0.3, 90); m.nota(K.Foto + 4.95, 81, 0.05, 0.6); // mismo ancho · «=»
m.whoosh(K.Dedo + 0.3, 0.8, 0.08); pop(K.Dedo + 1.5, 79);                                                // el brazo · tapada
m.whoosh(K.Dedo + 2.3, 0.6, 0.06); m.sube(K.Dedo + 2.9, 0.9, 60, 72, 0.04);                             // baja la mano, sube la Luna
m.whoosh(K.Dedo + 3.9, 0.7, 0.08); pop(K.Dedo + 4.8, 83);                                                // otra vez tapada
m.sube(K.Pregunta + 0.05, 1.2, 52, 64, 0.05);
for (let i = 0; i < 4; i++) m.nota(K.Nadie + 0.4 + i * 0.25, [64, 67, 62, 69][i], 0.04, 0.4);           // signos de interrogación
m.cruje(K.Nadie + 1.9, 0.3); m.golpe(K.Nadie + 3.1, 0.35, 70); m.nota(K.Nadie + 3.15, 57, 0.06, 1.2); // pergamino · «más de 2,000 años»
m.whoosh(K.Hipotesis + 0.8, 1.4, 0.06); m.sube(K.Hipotesis + 0.8, 1.4, 55, 62, 0.04);                    // se dibuja el techo aplanado
m.nota(K.Hipotesis + 2.6, 76, 0.04, 0.5); m.nota(K.Hipotesis + 3.0, 72, 0.04, 0.5);                      // aparecen las dos lunas
m.tic(K.Hipotesis + 3.6, 0.15, 2000); m.whoosh(K.Hipotesis + 4.6, 0.8, 0.07); m.nota(K.Hipotesis + 5.4, 69, 0.05, 0.6); // flechas
m.whoosh(K.Lejos + 0.2, 0.8, 0.07);                                                                      // rieles
m.nota(K.Lejos + 1.0, 74, 0.04, 0.5); m.nota(K.Lejos + 1.4, 74, 0.04, 0.5);                              // dos lunas iguales
m.sube(K.Lejos + 2.4, 0.8, 64, 76, 0.05);                                                                // el cerebro la agranda
m.tic(K.Lejos + 3.8, 0.15, 1800); m.nota(K.Lejos + 4.2, 79, 0.05, 0.6);                                  // mismo tamaño
m.tic(K.Cerca + 0.3, 0.12, 1500); m.tic(K.Cerca + 0.6, 0.12, 1500);                                      // dos ventanas
pop(K.Cerca + 3.2, 81);                                                                                   // «¡ENORME!»
m.whoosh(K.Real + 0.8, 0.7, 0.07); m.whoosh(K.Real + 1.8, 0.8, 0.07);                                    // las dos distancias
m.tic(K.Real + 3.0, 0.15, 1800); m.golpe(K.Real + 3.4, 0.3, 80); m.nota(K.Real + 3.45, 76, 0.05, 0.7);   // un poquito más lejos
m.burbuja(K.Cierre + 0.9, 0.15, 500); m.sube(K.Cierre + 1.0, 1.2, 64, 52, 0.04);                         // pensamiento · la Luna del cielo a su tamaño
m.tic(K.Cierre + 2.4, 0.15, 1800);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
