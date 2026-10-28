// gen-audio.mjs — cama grave + efectos del Shot Químico #04 (col morada). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Col base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K, E = m.ESC;
const G = K.Gancho, Pi = K.Pigmento, Li = K.Limon, Bi = K.Bicarbonato, Fo = K.Forma, Es = K.Escala, Pr = K.Pregunta, Et = K.Estudio, Pe = K.Pescado, Ja = K.Jamaica, Ca = K.Casa, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.7, 0.18); for (let i = 0; i < 3; i++) m.metal(G + 0.5 + i * 0.12, 0.06, 1800 + i * 300);   // vaso con hielos
m.golpe(G + 1.5, 0.3, 90);                                                          // se tacha "jamaica"
m.whoosh(G + 2.2, 0.7, 0.12); m.nota(G + 2.9, 69, 0.06, 0.8);                       // llega la col
m.whoosh(Pi + 0.4, 0.6, 0.1); m.nota(Pi + 1.6, 72, 0.06, 0.6); m.nota(Pi + 1.9, 76, 0.05, 0.6);
for (let i = 0; i < 8; i++) m.gota(Li + 0.3 + i * 0.25, 0.18, 1000);                // gotas de limón
m.sube(Li + 1.0, 1.4, 64, 72, 0.05); m.metal(Li + 1.8, 0.1, 1400);                 // morado → rojo
for (let i = 0; i < 10; i++) m.tic(Bi + 0.5 + i * 0.08, 0.04, 3000);                 // polvo
for (let i = 0; i < 10; i++) m.burbuja(Bi + 1.0 + i * 0.15, 0.08, 500);
m.sube(Bi + 1.0, 1.4, 64, 57, 0.05); m.metal(Bi + 1.8, 0.1, 1000);                 // morado → azul
m.tic(Fo + 1.2, 0.08, 2000); m.tic(Fo + 3.8, 0.08, 2000);                          // entra y sale el H+
m.sube(Fo + 0.6, 1.8, 57, 64, 0.03); m.sube(Fo + 3.2, 2.4, 64, 76, 0.03);
[1.5, 4, 6.5, 8, 10.5, 13.5].forEach((ph, i) => m.nota(Es + 0.3 + ((ph - 1.4) / 12.5) * 5, E[i + 2], 0.07, 0.7));  // una nota por tubo
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Et + 0.2, 0.35, 80); m.whoosh(Et + 1.5, 1.0, 0.08);                         // se envuelve el pescado
for (let i = 0; i < 6; i++) m.tic(Pe + 0.3 + i * 0.92, 0.06, 1500);                 // días
m.sube(Pe + 0.3, 5.5, 69, 57, 0.025);
m.nota(Ja + 0.4, 74, 0.06, 0.8); m.sube(Ja + 2.2, 3.0, 69, 60, 0.03);
m.motor(Ca + 0.3, 1.4, 0.1);                                                        // licuadora
m.metal(Ca + 2.6, 0.08, 1400); m.metal(Ca + 3.2, 0.08, 1000);
for (let i = 0; i < 6; i++) m.nota(Ci + 0.8 + i * 0.12, E[i + 4], 0.05, 0.7);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
