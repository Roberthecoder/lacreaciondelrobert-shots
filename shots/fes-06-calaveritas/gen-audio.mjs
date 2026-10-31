// gen-audio.mjs — cama grave + efectos del Shot Químico #01 · Especial Día de Muertos (calaveritas de azúcar). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Calaveritas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K, E = m.ESC;
const G = K.Gancho, Hi = K.Hierve, Ca = K.Caliente, Mo = K.Molde, So = K.Sobra, P = K.Pregunta, Cr = K.Cristal, Co = K.Costra, Es = K.Estudio, Gr = K.Grumos, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.16);                                                      // la calavera llega
for (const t of [G + 0.55, G + 1.6]) { m.tic(t, 0.5, 3200); m.cruje(t + 0.02, 0.35); m.metal(t, 0.06, 2400); } // toc toc: suena a azúcar (crujiente), no a yeso
m.sube(G + 2.2, 0.8, 57, 69, 0.05); for (let i = 0; i < 6; i++) m.nota(G + 2.4 + i * 0.12, E[6 + i], 0.03, 0.4); // destellos de cristal
for (let i = 0; i < 14; i++) m.tic(Hi + 0.1 + i * 0.07 + 0.4, 0.08, 2600 + i * 40); // el azúcar cae al cazo
m.whoosh(Hi + 0.6, 0.8, 0.1);                                                // el agua
for (let i = 0; i < 18; i++) m.burbuja(Hi + 1.2 + i * 0.13, 0.08, 300 + (i % 5) * 60); // hierve
for (let i = 0; i < 6; i++) m.tic(Ca + 0.5 + i * 0.16, 0.06, 2200);           // azúcar en agua fría (poquita)
for (let i = 0; i < 14; i++) m.tic(Ca + 1.1 + i * 0.11, 0.06, 2600);          // en agua hirviendo (mucha más)
m.nota(Ca + 2.8, 69, 0.07, 0.9); m.nota(Ca + 2.8, 76, 0.05, 0.9);            // "más del doble"
m.whoosh(Mo + 0.3, 0.7, 0.12);                                               // inclina el cazo
for (let i = 0; i < 6; i++) m.gota(Mo + 1.0 + i * 0.22, 0.12, 600 + i * 30);  // el jarabe cae al molde
for (let i = 0; i < 8; i++) m.nota(So + 0.4 + i * 0.4, E[9 - i], 0.035, 0.5); // el termómetro baja
m.zumbido(So + 2.4, 1.6, 0.03, 140);                                          // sobresaturado (tensión)
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 16; i++) m.tic(Cr + 1.4 + i * 0.17, 0.05, 1800 + (i % 8) * 200); // cada molécula encaja en su fila
m.nota(Cr + 4.0, 69, 0.07, 1.2); m.nota(Cr + 4.0, 76, 0.05, 1.2); m.nota(Cr + 4.0, 81, 0.04, 1.2); // cristal
for (let i = 0; i < 10; i++) m.tic(Co + 0.4 + i * 0.2, 0.05, 3000);           // la costra cuaja
m.whoosh(Co + 2.8, 0.6, 0.14); m.golpe(Co + 3.4, 0.25, 90);                  // se voltea el molde
for (let i = 0; i < 10; i++) m.gota(Co + 3.4 + i * 0.22, 0.1, 500);           // escurre la miel
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                  // tarjeta 1747
m.nota(Es + 3.1, 64, 0.06, 0.9); m.nota(Es + 3.1, 64 + 12, 0.04, 0.9);       // "=" mismo cristal
for (let i = 0; i < 6; i++) m.tic(Gr + 0.6 + i * 0.22, 0.05, 3400);           // lado liso: cristalitos finos
for (let i = 0; i < 22; i++) m.metal(Gr + 1.0 + i * 0.16, 0.03, 700 + (i % 3) * 80); // la cuchara revuelve
for (let i = 0; i < 9; i++) m.golpe(Gr + 1.6 + i * 0.26, 0.09, 120);          // cristales grandes
for (let i = 0; i < 12; i++) m.tic(Da + 0.2 + i * 0.2, 0.04, 1500);           // reloj del reposo
for (let i = 0; i < 5; i++) m.nota(Da + 2.8 + i * 0.6, E[4 + i], 0.05, 0.6); // se decora por partes
m.whoosh(Ci + 0.2, 0.6, 0.12); m.sube(Ci + 1.0, 0.8, 57, 69, 0.05);
for (let i = 0; i < 6; i++) m.nota(Ci + 1.4 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
