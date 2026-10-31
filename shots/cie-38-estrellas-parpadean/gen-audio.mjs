// gen-audio.mjs — cama grave + efectos del Shot Científico #38 (las estrellas no parpadean: es el aire). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estrellas Parpadean base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 138);
const K = m.K;
const pop = (t, mm = 76, g = 0.06) => { m.burbuja(t, 0.12, 600); m.nota(t, mm, g, 0.4); };
const brillo = (t, mm) => { m.metal(t, 0.05, 2400); m.nota(t, mm, 0.035, 0.5); };   // destellito de estrella
m.pad(0, K.Outro + 3.5, 0.05, [41, 48, 53]);
[0.1, 0.6, 1.1, 1.7, 2.3, 3.0, 3.8, 4.5].forEach((t, i) => brillo(t, [88, 84, 91, 86, 93, 84, 89, 86][i]));   // el cielo titila
m.whoosh(K.Gancho + 1.4, 1.4, 0.12);                                                                   // aparecen las capas de aire
pop(K.Gancho + 2.0, 79); m.whoosh(K.Gancho + 2.4, 0.5, 0.08);                                          // «EL AIRE» · flecha
m.sube(K.Lejos - 0.2, 2.2, 79, 60, 0.05);                                                              // la estrella se aleja
pop(K.Lejos + 0.3, 70); pop(K.Lejos + 1.2, 74);                                                        // esquema · tú
m.sube(K.Lejos + 1.9, 0.9, 55, 67, 0.04); m.golpe(K.Lejos + 2.7, 0.3, 90);                             // la regla · muy, muy lejos
brillo(K.Lejos + 3.3, 91);                                                                             // puntito de luz
m.zumbido(K.Aire + 0.3, 6.6, 0.025, 90);                                                               // el aire que se mueve
m.whoosh(K.Aire + 0.3, 2.3, 0.12); pop(K.Aire + 0.8, 76);                                              // baja el rayo · kilómetros de aire
pop(K.Aire + 2.6, 81); pop(K.Aire + 3.1, 69);                                                          // más caliente · más fría
for (let k = 0; k < 4; k++) m.whoosh(K.Aire + 3.6 + k * 0.8, 0.6, 0.07);                              // ráfagas de viento
pop(K.Dobla + 0.2, 74); m.sube(K.Dobla + 0.3, 1.2, 60, 72, 0.05);                                      // la luz se dobla
for (let i = 0; i < 14; i++) m.tic(K.Dobla + 1.6 + i * 0.37, 0.12, 2600 + (i % 3) * 500);              // el puntito brinca
pop(K.Dobla + 3.0, 81); pop(K.Dobla + 4.6, 77);                                                        // brinca · cambia de brillo
m.golpe(K.Nombre - 0.1, 0.3, 100); brillo(K.Nombre + 0.1, 93); m.nota(K.Nombre + 0.3, 76, 0.07, 1.0); m.nota(K.Nombre + 0.3, 83, 0.05, 1.0); // ¡centelleo!
pop(K.Nombre + 0.9, 79);
m.golpe(K.Pregunta + 0.05, 0.35, 70); m.nota(K.Pregunta + 0.2, 69, 0.06, 1.2, 0.5);                   // ¿?
pop(K.Pregunta + 0.5, 72);
pop(K.Disco + 0.2, 79); pop(K.Disco + 0.3, 74); pop(K.Disco + 0.5, 76); pop(K.Disco + 0.8, 72);       // estrella · planeta · más cerca
m.sube(K.Disco + 2.2, 0.7, 60, 76, 0.05); m.golpe(K.Disco + 2.5, 0.25, 110); pop(K.Disco + 3.1, 81); // lupa: disco chiquito
for (let k = 0; k < 5; k++) m.nota(K.Promedio + 0.2 + k * 0.15, [72, 76, 79, 83, 86][k], 0.04, 0.5);  // cinco rayos
for (let i = 0; i < 10; i++) m.tic(K.Promedio + 1.6 + i * 0.2, 0.1, 2200 + (i % 5) * 300);            // cada parte tiembla
m.nota(K.Promedio + 3.6, 67, 0.07, 1.4); m.nota(K.Promedio + 3.6, 74, 0.05, 1.4);                     // todo el disco: estable
pop(K.Promedio + 4.3, 79);
pop(K.Truco + 0.1, 84); pop(K.Truco + 1.0, 79);                                                        // truco · parpadea
for (let i = 0; i < 6; i++) brillo(K.Truco + 1.2 + i * 0.25, 86 + (i % 3) * 3);
pop(K.Truco + 2.2, 72); m.nota(K.Truco + 2.4, 72, 0.05, 1.2);                                          // no parpadea: tono quieto
pop(K.Truco + 3.6, 76);
m.whoosh(K.Telescopios - 0.3, 1.0, 0.14); m.golpe(K.Telescopios + 0.5, 0.3, 70);                     // sube la montaña
m.metal(K.Telescopios + 0.7, 0.08, 900); pop(K.Telescopios + 1.0, 76);                                // cúpula · montaña alta y seca
m.whoosh(K.Telescopios + 1.8, 0.5, 0.08); pop(K.Telescopios + 2.1, 72);                               // menos aire encima
m.sube(K.Telescopios + 2.6, 0.8, 67, 84, 0.05); pop(K.Telescopios + 3.4, 81);                         // telescopio en el espacio
m.whoosh(K.Cierre, 1.2, 0.1); pop(K.Cierre + 0.8, 76);                                                 // regreso al cielo del inicio
[0.4, 1.0, 1.6, 2.4, 3.2, 4.0].forEach((t, i) => brillo(K.Cierre + t, [86, 91, 84, 93, 88, 84][i]));
m.nota(K.Cierre + 2.0, 67, 0.06, 1.4); m.nota(K.Cierre + 2.0, 74, 0.05, 1.4);                         // es tu cielo
m.nota(K.Outro + 0.3, 53, 0.08, 2.8); m.nota(K.Outro + 0.3, 60, 0.06, 2.8); m.nota(K.Outro + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
