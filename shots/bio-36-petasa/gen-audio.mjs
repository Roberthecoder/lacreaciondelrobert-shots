// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #36 (la bacteria que come PET). Sin costo: todo se calcula (audio-kit.mjs).
// Datos hechos sonido: un clic agudo por cada corte de la PETasa (5) y uno grave por cada pedacito que parte la MHETasa (6);
// 42 tics lentos = los 42 días (6 semanas) de 2016 y 10 tics rápidos = las 10 horas de 2020.
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Petasa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 36);
const K = m.K;
const G = K.Gancho, Lo = K.Lodo, No = K.Nombre, Pe = K.Petasa, Mh = K.Mhetasa, Pz = K.Piezas, Pr = K.Pregunta, Le = K.Lenta,
  Fr = K.Francia, Di = K.Diez, Cu = K.Curioso, Pl = K.Planta, Re = K.Recoger, Ci = K.Cierre, Ou = K.Outro;
// mismos tiempos que petasa.jsx
const corte = (k) => Pe + 1.0 + k * Math.min(0.62, (Mh - Pe - 1.6) / 5);
const parte = (i) => Mh + 0.4 + i * Math.min(0.5, (Pz - Mh - 0.9) / 6);

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.4, 0.12); m.golpe(G + 0.4, 0.35, 140); m.golpe(G + 0.75, 0.15, 160);   // la botella cae y rebota
m.metal(G + 1.3, 0.08, 500);                                                          // se tacha "basura"
for (let i = 0; i < 6; i++) m.tic(Lo + i * 0.12, 0.06, 900);                          // las pacas aparecen
m.whoosh(Lo + 1.3, 0.7, 0.1); m.golpe(Lo + 2.0, 0.2, 70);                             // la pala entra al lodo
for (let i = 0; i < 5; i++) m.burbuja(Lo + 2.2 + i * 0.25, 0.08, 300);
m.sube(No + 0.15, 0.6, 50, 62, 0.04);                                                  // la Lupa se abre
m.whoosh(Pe - 0.2, 0.6, 0.08);                                                         // entramos al microscopio
for (let k = 0; k < 5; k++) m.tic(corte(k), 0.12, 2600);                               // cortes de la PETasa
for (let i = 0; i < 6; i++) { m.tic(parte(i), 0.12, 1100); m.nota(parte(i) + 0.05, m.ESC[2 + i], 0.04, 0.4); } // la MHETasa parte cada pedacito
for (let i = 0; i < 6; i++) m.pop ? m.pop(Pz + 1.1 + i * 0.22 + 0.5, 0.08) : m.burbuja(Pz + 1.1 + i * 0.22 + 0.5, 0.08, 700); // se las come
m.sube(Pr + 0.1, 1.4, 52, 60, 0.04); m.golpe(Pr + 1.8, 0.25, 90);                      // re-gancho y "tachado"
m.golpe(Le + 0.1, 0.3, 80);                                                            // sello del estudio 2016
for (let d = 0; d < 42; d++) m.tic(Le + 2.3 + d * (2.9 / 42), 0.05, 700);              // 42 días
m.golpe(Fr + 0.4, 0.2, 110); m.nota(Fr + 0.5, 69, 0.05, 0.6);                          // sale la enzima de la composta
for (let i = 0; i < 4; i++) m.nota(Fr + 2.0 + i * 0.12, 76 + i * 3, 0.03, 0.3);        // chispas: la mejoran
m.golpe(Fr + 1.4, 0.25, 85);                                                           // sello del estudio 2020
m.sube(Di + 0.3, 2.9, 52, 69, 0.05);                                                   // el medidor sube a 90 %
for (let h = 0; h < 10; h++) m.tic(Di + 0.3 + h * 0.29, 0.1, 1800);                     // 10 horas
for (let i = 0; i < 5; i++) m.nota(Di + 3.3 + i * 0.25, m.ESC[5 + i], 0.05, 0.5);       // salen botellas nuevas
m.golpe(Cu + 0.2, 0.25, 120); m.golpe(Cu + 0.5, 0.15, 100);                            // al podio
m.metal(Pl + 0.4, 0.1, 380); m.zumbido(Pl + 0.6, 0.8, 0.03, 120);                       // grúa detenida
m.whoosh(Re + 0.2, 0.6, 0.08); m.tic(Re + 1.0, 0.15, 600);                              // la mano la toma
m.whoosh(Re + 1.5, 1.1, 0.07); m.golpe(Re + 2.9, 0.35, 75);                             // al contenedor (clonc)
m.nota(Ci + 0.6, 69, 0.05, 1.2); m.nota(Ci + 0.9, 76, 0.04, 1.2);                       // botella nueva
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
