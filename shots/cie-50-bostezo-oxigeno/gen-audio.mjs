// gen-audio.mjs — cama grave + efectos del Shot Científico #50 (bostezo y oxígeno). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bostezo Oxigeno base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
const bostezo = (t, g = 0.06) => m.sube(t, 1.4, 64, 52, g);                                            // un bostezo: tono que baja
bostezo(K.Gancho + 0.05, 0.07); m.golpe(K.Gancho + 0.3, 0.3, 90);
m.metal(K.Gancho + 2.2, 0.12, 700);                                                                    // se tacha el mito
m.whoosh(K.Gancho + 3.6, 0.6, 0.14); m.zumbido(K.Gancho + 3.9, 1.2, 0.04, 300);                         // llega el oxígeno
bostezo(K.Gancho + 4.5, 0.07); m.golpe(K.Gancho + 4.8, 0.25, 80);
for (let i = 0; i < 6; i++) m.burbuja(K.Creencia + 0.8 + i * 0.35, 0.12, 500 + i * 40);                // entra O₂
for (let i = 0; i < 5; i++) m.burbuja(K.Creencia + 2.6 + i * 0.35, 0.1, 300 + i * 30);                 // sale CO₂
m.golpe(K.Estudio + 0.25, 0.35, 80);
m.whoosh(K.Estudio + 3.2, 0.5, 0.12);
[4.0, 4.6, 5.2].forEach((d) => m.tic(K.Estudio + d, 0.2, 2200));                                       // palomitas
m.zumbido(K.Gases + 0.4, 1.0, 0.03, 260); m.zumbido(K.Gases + 0.6, 1.0, 0.03, 220);                    // gas por las mangueras
[1.6, 3.9].forEach((d) => bostezo(K.Gases + d, 0.05)); [2.2, 4.4].forEach((d) => bostezo(K.Gases + d, 0.045));
[2.1, 2.7, 4.4, 4.9].forEach((d) => m.tic(K.Gases + d, 0.18, 1900));                                   // rayitas
m.sube(K.Resultado + 0.3, 1.2, 57, 64, 0.04); m.sube(K.Resultado + 1.0, 1.2, 57, 64, 0.04);           // barras suben igual
m.nota(K.Resultado + 3.0, 69, 0.07, 0.6); m.nota(K.Resultado + 3.05, 69, 0.05, 0.6);
for (let i = 0; i < 3; i++) { m.golpe(K.Ejercicio + i * 2 + 0.3, 0.22, 70); m.golpe(K.Ejercicio + i * 2 + 1.3, 0.18, 65); }  // escalón cada 2 s
m.whoosh(K.Ejercicio + 0.8, 0.4, 0.1); m.whoosh(K.Ejercicio + 1.4, 0.4, 0.1);
m.tic(K.Ejercicio + 3.0, 0.18, 1900);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.zumbido(K.Hipotesis + 0.3, 1.2, 0.03, 140);
bostezo(K.Hipotesis + 1.8, 0.05); m.whoosh(K.Hipotesis + 2.0, 1.2, 0.12);                               // aire fresco
m.sube(K.Hipotesis + 2.8, 1.4, 72, 60, 0.04);                                                          // baja el termómetro
m.tic(K.Otra + 2.4, 0.3, 1400); m.golpe(K.Otra + 2.45, 0.2, 90);                                       // clic: dormido
m.tic(K.Otra + 4.0, 0.3, 1600); m.golpe(K.Otra + 4.05, 0.2, 100);                                      // clic: despierto
bostezo(K.Otra + 1.6, 0.045); bostezo(K.Otra + 3.4, 0.045);
for (let i = 0; i < 4; i++) m.sube(K.Contagio + 0.5 + i * 0.6, 1.0, 66 - i, 54 - i, 0.04);             // bostezos en cadena
m.whoosh(K.Contagio + 3.0, 0.5, 0.12); bostezo(K.Contagio + 4.4, 0.05);
bostezo(K.Cierre + 0.2, 0.06);
m.nota(K.Cierre + 1.4, 72, 0.05, 0.5); m.nota(K.Cierre + 2.0, 76, 0.05, 0.5); m.metal(K.Cierre + 3.5, 0.12, 700);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
