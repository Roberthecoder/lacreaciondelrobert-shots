// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #30 (hongos negros de Chernóbil). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chernobil base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 30);
const K = m.K;
const G = K.Gancho, R = K.Reactor, E = K.Especies, O = K.Oscuros, Pi = K.Piel, Pa = K.Pared, P = K.Pregunta, Es = K.Estudio, Cr = K.Crecen, Co = K.Colonias, H = K.Hipotesis, Sp = K.Espacio, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [38, 45, 50], 0.2);                                   // cama grave, tensa
m.whoosh(G + 0.1, 0.7, 0.1);                                                    // entra la lupa
m.cruje(G + 2.2, 0.25);                                                         // ¿hollín? tachado
m.golpe(G + 2.5, 0.5, 70);                                                      // ¡HONGO!
for (let i = 0; i < 6; i++) m.tic(G + 3.2 + i * 0.13, 0.05, 3200);              // contador Geiger junto al letrero
for (let i = 0; i < 8; i++) m.golpe(R + 0.4 + i * 0.4, 0.08, 120);              // pasos de los trajes
m.zumbido(R + 0.3, 3.0, 0.02, 70);                                              // respiración del traje (filtro)
for (let i = 0; i < 37; i++) m.tic(E + 0.1 + i * 0.045, 0.06, 1200 + (i % 7) * 120); // 37 cajas de Petri
m.sube(O + 0.2, 0.8, 48, 55, 0.04);                                             // sube el calor de radiación
for (let i = 0; i < 24; i++) m.tic(O + 0.6 + i * 0.12 + (i % 3) * 0.03, 0.06, 3400); // Geiger en la zona roja
for (let i = 0; i < 4; i++) m.burbuja(O + 1.0 + i * 0.25, 0.07, 220 + i * 30);  // aparecen las colonias negras
m.whoosh(Pi + 0.8, 0.8, 0.08); m.nota(Pi + 1.4, 64, 0.06, 1.0);                 // línea piel ↔ hongo, "melanina"
m.sube(Pa, 1.0, 55, 43, 0.05); m.latido(Pa + 0.3, 0.2); m.latido(Pa + 1.1, 0.2); // bajamos al microscopio
for (let i = 0; i < 6; i++) m.metal(Pa + 2.2 + i * 0.45, 0.1, 2200);             // rayos frenados en la pared
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                             // pregunta
m.golpe(Es + 0.2, 0.35, 80);                                                    // tarjeta 2007
for (let i = 0; i < 30; i++) m.tic(Es + 3.0 + i * 0.1, 0.05, 3000);             // fuente radiactiva ×500
for (let i = 0; i < 8; i++) m.burbuja(Cr + 0.2 + i * 0.28, 0.07, 200 + i * 25);  // la colonia con melanina crece
m.nota(Co + 0.4, 55, 0.06, 0.6); m.nota(Co + 0.9, 62, 0.06, 0.6); m.nota(Co + 1.3, 67, 0.07, 1.0); // barras 1× y 2.5×
m.nota(H + 0.4, 72, 0.05, 0.8); m.nota(H + 1.3, 60, 0.05, 0.8);                 // luz → energía / ¿radiación?
m.golpe(H + 3.6, 0.5, 65);                                                      // sello HIPÓTESIS
m.whoosh(Sp + 0.2, 1.5, 0.08); m.nota(Sp + 0.5, 69, 0.04, 1.6);                 // la estación espacial
for (let i = 0; i < 10; i++) m.tic(Sp + 2.4 + i * 0.3, 0.06, 2800);             // rayos sobre la caja
m.nota(Sp + 3.0, 76, 0.05, 0.3); m.nota(Sp + 3.3, 76, 0.05, 0.3);                // pitido de los sensores
m.cruje(C + 0.3, 0.2); m.sube(C + 0.6, 1.0, 52, 64, 0.05); m.nota(C + 1.4, 69, 0.06, 1.2); // la armadura brilla
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
