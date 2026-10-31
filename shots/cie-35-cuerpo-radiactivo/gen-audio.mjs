// gen-audio.mjs — cama grave + efectos del Shot Científico #35 (tu cuerpo es un poquito radiactivo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cuerpo Radiactivo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 14; i++) m.tic(K.Gancho + 0.05 + i * 0.42, 0.08, 3200 + (i % 3) * 400);              // chispitas
m.nota(K.Gancho + 0.1, 81, 0.04, 0.5);
m.golpe(K.Potasio + 0.4, 0.3, 90);                                                                       // cae la tarjeta K
m.burbuja(K.Potasio + 1.0, 0.12, 500); m.burbuja(K.Potasio + 1.5, 0.12, 420);                            // plátano, aguacate
for (let i = 0; i < 6; i++) m.nota(K.Potasio + 1.7 + i * 0.22, [69, 72, 74, 76, 79, 81][i], 0.04, 0.3);   // átomos que viajan
m.zumbido(K.Potasio + 3.3, 0.7, 0.05, 220);                                                              // nervio
m.golpe(K.Potasio + 4.1, 0.2, 110);                                                                       // músculo
for (let i = 0; i < 10; i++) m.tic(K.Isotopo + 0.05 + i * 0.07, 0.1, 1800 + i * 80);                     // aparecen los átomos
m.nota(K.Isotopo + 1.7, 84, 0.06, 1.2);                                                                   // brilla el K-40
m.whoosh(K.Decae + 0.2, 0.6, 0.14);                                                                       // se abre la lupa
m.sube(K.Decae + 1.2, 0.9, 60, 72, 0.04);
m.metal(K.Decae + 2.1, 0.18, 900); m.nota(K.Decae + 2.15, 88, 0.06, 1.0);                                 // K → Ca + destello
m.golpe(K.Cuenta + 0.25, 0.35, 80);
for (let i = 0; i < 8; i++) m.tic(K.Cuenta + 0.25 + i * 0.11, 0.1, 2400 + i * 120);                       // el número cuenta
m.sube(K.Pregunta + 0.1, 1.2, 52, 64, 0.05);
m.nota(K.Normal + 0.2, 69, 0.05, 1.2); m.nota(K.Normal + 0.2, 76, 0.04, 1.2);                             // "no": calma
for (let i = 0; i < 3; i++) m.burbuja(K.Normal + 0.6 + i * 0.6, 0.1, 400 + i * 100);                       // creces
m.whoosh(K.Normal + 3.4, 1.1, 0.1);                                                                       // se dibuja el pastel
m.golpe(K.Normal + 4.65, 0.2, 120);                                                                       // sale la rebanada
m.golpe(K.Platano + 0.3, 0.3, 85);
for (let i = 0; i < 8; i++) m.tic(K.Platano + 0.7 + i * 0.3, 0.07, 3400);
m.whoosh(K.Platano + 2.6, 0.6, 0.12);
for (let i = 0; i < 3; i++) m.whoosh(K.Igual + 0.4 + i * 0.9, 0.5, 0.08);                                  // plátanos que vuelan
for (let i = 0; i < 3; i++) m.nota(K.Igual + 1.1 + i * 0.9, 64, 0.04, 0.4);                                // ñam (medidor igual)
m.gota(K.Igual + 3.0, 0.18, 700);                                                                         // sale lo que sobra
m.sube(K.Viejo, 0.5, 45, 57, 0.05);
m.golpe(K.Viejo + 0.5, 0.55, 60); m.whoosh(K.Viejo + 0.5, 1.4, 0.2);                                       // supernova
m.sube(K.Viejo + 2.6, 2.0, 64, 52, 0.04);                                                                 // el polvo se junta
m.golpe(K.Viejo + 4.1, 0.25, 70);                                                                         // nace la Tierra
m.pad(K.Cierre + 0.3, K.Outro + 0.3, 0.03, [69, 76]);                                                     // brillo tenue
for (let i = 0; i < 6; i++) m.nota(K.Cierre + 2.0 + i * 0.18, [81, 84, 86, 88, 91, 93][i], 0.035, 0.5);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
