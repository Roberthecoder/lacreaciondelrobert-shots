// gen-audio.mjs — cama grave + efectos del Shot Científico #14 (cuenta los segundos del trueno). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Contar Trueno base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 140);
const K = m.K;
const rayo = (t, g = 0.5) => { m.cruje(t, g); m.whoosh(t, 0.25, 0.12); };
const retumbo = (t, d = 2.2, g = 0.09) => { m.golpe(t, 0.3, 55); m.motor(t, d, g); m.zumbido(t, d, 0.04, 48); };
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
rayo(0.2);                                                                                               // cae el rayo
for (let i = 0; i < 5; i++) m.tic(0.6 + i, 0.25, 2200);                                                 // 1, 2, 3, 4, 5
retumbo(5.1, 1.6, 0.1);                                                                                  // ¡BRRUM!
m.zumbido(K.Calor + 0.1, 6, 0.04, 140);                                                                  // el canal zumba
m.sube(K.Calor + 0.6, 2.0, 50, 74, 0.06);                                                                // sube el termómetro
m.nota(K.Calor + 3.4, 76, 0.07, 0.6); m.golpe(K.Calor + 4.0, 0.3, 120);                                  // el Sol · ×5
m.whoosh(K.Onda + 0.2, 0.8, 0.16);                                                                       // el aire se expande
m.golpe(K.Onda + 2.4, 0.55, 60); m.motor(K.Onda + 2.4, 1.4, 0.08);                                       // ¡BUM!
rayo(K.Luz + 0.1, 0.35); m.nota(K.Luz + 0.3, 88, 0.06, 0.3);                                             // la luz llega ya
for (let i = 0; i < 8; i++) m.nota(K.Sonido + 0.8 + i * 0.5, [57, 60, 62, 64, 67, 69, 72, 74][i], 0.04, 0.45); // el sonido avanza lento
m.golpe(K.Sonido + 1.6, 0.2, 100); m.tic(K.Sonido + 4.4, 0.3, 2600);
for (let k = 1; k <= 3; k++) m.tic(K.Tres + 0.3 + k * 0.85, 0.3, 2000 + k * 300);                         // 1 s, 2 s, 3 s
for (let i = 0; i < 9; i++) m.tic(K.Pregunta + 0.2 + i * 0.22, 0.22, 1800 + i * 80);                       // cuenta rápida a 9
m.golpe(K.Pregunta + 2.5, 0.35, 80); m.nota(K.Pregunta + 2.5, 81, 0.06, 0.7);                            // ≈ 3 km
m.cruje(K.Retumbo + 0.4, 0.7);                                                                           // crujido seco
retumbo(K.Retumbo + 2.3, 2.4, 0.08);                                                                     // retumbo largo
m.sube(K.Cuidado + 0.5, 0.9, 52, 60, 0.05);                                                              // el círculo crece
for (const t of [1.9, 2.6, 3.2]) rayo(K.Cuidado + t, 0.3);                                               // rayos lejos de la nube
m.nota(K.Cuidado + 3.6, 64, 0.06, 0.9); m.nota(K.Cuidado + 3.6, 70, 0.04, 0.9);
rayo(K.Regla + 0.2, 0.4); m.metal(K.Regla + 0.8, 0.1, 700);                                              // alerta
for (let i = 0; i < 8; i++) m.tic(K.Regla + 2.7 + i * 0.28, 0.16, 900);                                  // pasos corriendo
m.golpe(K.Regla + 4.95, 0.35, 90);                                                                       // la puerta
for (let i = 0; i < 6; i++) m.tic(K.Espera + 0.9 + i * 0.5, 0.18, 3200);                                 // el reloj
m.nota(K.Espera + 3.9, 69, 0.06, 0.8);
rayo(K.Cierre + 0.2, 0.3); m.motor(K.Cierre + 1.2, 1.4, 0.04);                                           // el rayo por la ventana
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
