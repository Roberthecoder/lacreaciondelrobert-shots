// gen-audio.mjs — cama grave + efectos del Shot Científico #30 (pájaros en los cables). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pajaros Cables base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 330);
const K = m.K;
const aleteo = (t, n = 5) => { for (let i = 0; i < n; i++) m.whoosh(t + i * 0.16, 0.12, 0.06); };
const chispa = (t, g = 0.4) => { m.cruje(t, g); m.zumbido(t, 0.6, 0.05, 120); };
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.zumbido(0, 6, 0.025, 60);                                                                          // zumbido de la línea
aleteo(0); m.tic(0.9, 0.35, 1500); m.nota(0.95, 76, 0.05, 0.4);                                      // aterriza: ¡TAC!
m.nota(1.6, 69, 0.05, 0.5); m.whoosh(3.0, 0.3, 0.12); m.golpe(3.05, 0.25, 110);                       // ¿magia? tachado
m.burbuja(K.Corriente + 0.3, 0.08, 400);                                                             // bolitas atrapadas
m.sube(K.Corriente + 1.4, 0.8, 55, 67, 0.06); m.nota(K.Corriente + 2.3, 79, 0.06, 0.5);                // se abre el camino
m.tic(K.Corriente + 2.4, 0.25, 2600);
m.tic(K.Patas + 1.2, 0.3, 2000); m.tic(K.Patas + 1.7, 0.3, 2000);                                     // pata 1, pata 2
m.nota(K.Patas + 2.4, 72, 0.05, 0.4); m.nota(K.Patas + 2.6, 72, 0.05, 0.6);                           // ≈ casi el mismo
m.whoosh(K.Nada + 0.3, 0.9, 0.14);                                                                   // sigue de largo
m.sube(K.Nada + 1.8, 0.5, 60, 72, 0.05); m.zumbido(K.Nada + 2.0, 4, 0.04, 220);                         // la lupa: por dentro
m.nota(K.Nada + 3.4, 76, 0.05, 0.6);
m.golpe(K.Pregunta + 0.05, 0.35, 90); m.nota(K.Pregunta + 0.1, 64, 0.06, 1.2);                         // ¿?
m.whoosh(K.Dos + 0.6, 0.7, 0.1); chispa(K.Dos + 1.4, 0.6); m.metal(K.Dos + 1.5, 0.12, 700);            // toca el otro cable
m.whoosh(K.Dos + 4.3, 0.6, 0.08); chispa(K.Dos + 5.0, 0.5); m.golpe(K.Dos + 5.6, 0.25, 70);            // toca el poste → tierra
aleteo(K.Aguilas, 6); m.whoosh(K.Aguilas + 1.4, 1.0, 0.14);                                            // el águila baja y abre las alas
m.nota(K.Aguilas + 3.2, 74, 0.05, 0.4); m.nota(K.Aguilas + 3.5, 79, 0.05, 0.5);                         // dos cosas a la vez
m.tic(K.Aguilas + 4.4, 0.25, 1800);
m.sube(K.Postes + 0.6, 1.4, 52, 59, 0.05);                                                           // se separan
m.golpe(K.Postes + 2.9, 0.25, 140); m.golpe(K.Postes + 3.2, 0.2, 150); m.golpe(K.Postes + 3.4, 0.2, 160); // fundas
aleteo(K.Postes + 4.0, 6); m.nota(K.Postes + 5.2, 76, 0.05, 0.6);                                      // el águila se posa segura
chispa(K.Tu + 0.1, 0.5); m.zumbido(K.Tu, 6, 0.05, 110); m.metal(K.Tu + 0.6, 0.12, 640);                 // cable caído, alerta
for (let i = 0; i < 14; i++) m.tic(K.Tu + 1.6 + i * 0.32, 0.12, 700);                                  // pasitos arrastrados
m.nota(K.Cierre + 0.2, 64, 0.05, 1.2); aleteo(K.Cierre + 0.8, 5); m.tic(K.Cierre + 1.8, 0.25, 1500);   // atardecer, llega otro pájaro
m.nota(K.Cierre + 1.2, 69, 0.05, 1.0);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
