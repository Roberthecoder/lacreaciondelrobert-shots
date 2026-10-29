// gen-audio.mjs — cama grave + efectos del Shot Científico #39 (los niños moken). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moken base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.whoosh(K.Gancho + 0.05, 0.9, 0.16);                                                                   // el niño entra nadando
for (let i = 0; i < 6; i++) m.burbuja(K.Gancho + 0.6 + i * 0.22, 0.12, 420 + i * 60);
m.golpe(K.Gancho + 2.5, 0.22, 90);                                                                       // aparece «tu vista»
m.whoosh(K.Borroso - 0.2, 0.8, 0.14);                                                                    // abres los ojos
for (let i = 0; i < 8; i++) m.burbuja(K.Borroso + 0.4 + i * 0.35, 0.1, 380 + (i % 3) * 90);
m.golpe(K.Cornea + 0.1, 0.3, 80);                                                                        // aparece el ojo
m.nota(K.Cornea + 1.3, 76, 0.06, 0.6);                                                                   // brilla la córnea
for (let i = 0; i < 4; i++) m.nota(K.Cornea + 2.2 + i * 0.14, [69, 72, 76, 81][i], 0.05, 0.4);          // los rayos se juntan
m.metal(K.Cornea + 3.1, 0.1, 900);
m.whoosh(K.Agua - 0.2, 1.1, 0.2);                                                                        // sube el agua
for (let i = 0; i < 6; i++) m.burbuja(K.Agua + 0.3 + i * 0.25, 0.12, 360 + i * 50);
m.sube(K.Agua + 0.5, 1.9, 64, 52, 0.05);                                                                 // la córnea pierde su poder
m.golpe(K.Agua + 2.5, 0.25, 70);
m.whoosh(K.Pueblo - 0.2, 0.7, 0.12); m.tic(K.Pueblo + 1.0, 0.18, 2200);                                 // el mapa y la zona moken
m.golpe(K.Pueblo + 2.3, 0.22, 95); m.golpe(K.Pueblo + 2.8, 0.22, 105);                                   // Birmania, Tailandia
m.whoosh(K.Pueblo + 3.6, 1.0, 0.14);                                                                     // zoom al barco
m.gota(K.Pueblo + 5.3, 0.3, 700); for (let i = 0; i < 5; i++) m.burbuja(K.Pueblo + 5.5 + i * 0.25, 0.1, 400 + i * 70); // se echa al agua
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                                     // tarjeta 2003
m.whoosh(K.Estudio + 2.3, 0.6, 0.12);
m.tic(K.Doble + 0.3, 0.2, 2000); m.tic(K.Doble + 0.6, 0.2, 1500);
m.sube(K.Doble + 1.2, 0.8, 60, 72, 0.05); m.nota(K.Doble + 1.7, 79, 0.07, 0.7);
m.sube(K.Pregunta + 0.1, 1.1, 52, 64, 0.05);
for (let i = 0; i < 5; i++) m.tic(K.Pupila + 0.4 + i * 0.3, 0.12, 2600 - i * 200);                     // la pupila se cierra
m.sube(K.Pupila + 2.3, 1.2, 57, 64, 0.04);                                                               // el cristalino se abomba
for (let i = 0; i < 6; i++) m.tic(K.Pupila + 4.0 + i * 0.22, 0.16, 1400);                               // el diafragma se cierra
m.metal(K.Pupila + 5.4, 0.12, 1200);
m.golpe(K.Entrenar + 0.1, 0.3, 85);
for (let i = 0; i < 11; i++) m.tic(K.Entrenar + 0.7 + i * 0.227, 0.15, 1800 + i * 60);                 // un día de entrenamiento por marca
m.sube(K.Entrenar + 3.3, 1.5, 60, 72, 0.05); m.nota(K.Entrenar + 4.8, 81, 0.07, 0.8);
for (let i = 0; i < 6; i++) m.burbuja(K.Cierre + 0.4 + i * 0.25, 0.1, 420 + i * 60);
for (let i = 0; i < 4; i++) m.nota(K.Cierre + 1.6 + i * 0.18, [69, 72, 76, 81][i], 0.05, 0.5);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
