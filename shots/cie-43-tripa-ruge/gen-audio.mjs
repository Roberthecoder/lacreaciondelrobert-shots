// gen-audio.mjs — cama grave + efectos del Shot Científico #43 (por qué te ruge la tripa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tripa Ruge base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 143);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
const gruñido = (t, d = 1.2, g = 0.09) => { m.zumbido(t, d, g, 70); m.zumbido(t + 0.1, d * 0.8, g * 0.6, 104); };   // «grrr» de la panza
gruñido(K.Gancho + 0.15); gruñido(K.Gancho + 2.3, 1.1);
m.tic(K.Gancho + 0.9, 0.2, 1500); m.tic(K.Gancho + 1.0, 0.2, 1700);                                          // los compañeros voltean
m.nota(K.Gancho + 2.7, 69, 0.05, 0.5); m.nota(K.Gancho + 4.0, 72, 0.05, 0.5);
m.whoosh(K.Musculos + 0.2, 0.6, 0.14);                                                                       // se abre la panza
for (let i = 0; i < 6; i++) m.latido(K.Musculos + 1.0 + i * 0.75, 0.12);                                      // ondas que aprietan
m.nota(K.Musculos + 1.0, 64, 0.04, 0.5); m.nota(K.Musculos + 3.2, 67, 0.04, 0.5);
for (let i = 0; i < 16; i++) m.burbuja(K.Ruido + 0.4 + i * 0.2 + (i % 3) * 0.04, 0.1, 300 + (i % 5) * 70);    // gas y líquido
[1.2, 2.0, 2.8].forEach((t) => m.burbuja(K.Ruido + t, 0.2, 260));
m.golpe(K.Ruido + 3.3, 0.3, 90); m.nota(K.Ruido + 3.35, 76, 0.06, 0.8);                                      // ¡borborigmo!
m.zumbido(K.Lleno + 0.3, 3.0, 0.035, 70);                                                                     // lleno: apagado
m.zumbido(K.Vacio + 1.2, 1.8, 0.09, 70);                                                                      // vacío: fuerte
[3.2, 3.7, 4.2, 4.7, 5.2].forEach((t) => m.golpe(K.Vacio + t, 0.45, 70));                                     // tambor hueco
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
for (let i = 0; i < 12; i++) m.tic(K.Limpieza + 0.2 + i * 0.17, 0.14, 2200);                                   // el reloj corre
m.whoosh(K.Limpieza + 1.8, 3.2, 0.12); m.sube(K.Limpieza + 1.8, 3.2, 45, 57, 0.04);                            // la onda de limpieza
m.whoosh(K.Barre + 0.5, 4.0, 0.16);                                                                           // barre los restos
for (let i = 0; i < 10; i++) m.tic(K.Barre + 0.9 + i * 0.32, 0.12, 900 + i * 40);
m.nota(K.Barre + 3.0, 72, 0.06, 0.7); m.nota(K.Barre + 3.2, 76, 0.05, 0.7);                                   // ≈ cada 1.5–2 h
for (let i = 0; i < 3; i++) m.nota(K.Hambre + 0.6 + i * 0.35, 79 + i * 2, 0.04, 0.4);                         // sale la motilina
m.metal(K.Hambre + 2.4, 0.12, 620); gruñido(K.Hambre + 2.6, 1.6, 0.08);                                       // enciende la onda
m.nota(K.Hambre + 3.7, 67, 0.06, 0.6); m.nota(K.Hambre + 3.9, 71, 0.05, 0.6);                                 // «hambre»
m.sube(K.Lugar + 1.2, 0.9, 57, 69, 0.04); gruñido(K.Lugar + 2.7, 0.9, 0.08); gruñido(K.Lugar + 3.8, 0.9, 0.08);  // intestino delgado
m.nota(K.Normal + 0.5, 72, 0.06, 0.6); m.nota(K.Normal + 0.65, 76, 0.06, 0.6); m.nota(K.Normal + 0.8, 79, 0.06, 0.9);  // palomita
gruñido(K.Cierre + 0.3, 1.1); gruñido(K.Cierre + 2.2, 1.0);
for (let i = 0; i < 5; i++) m.whoosh(K.Cierre + 1.0 + i * 0.5, 0.35, 0.06);                                   // la escoba barre
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
