// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #42 (carne cultivada). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: una nota que sube un escalón por cada duplicación de células (1→2→4→8→16→32), igual que el contador.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Carne base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 42);
const K = m.K;
const G = K.Gancho, Bi = K.Biopsia, Ce = K.Celulas, Br = K.Biorreactor, Fi = K.Fibras, Pr = K.Pregunta, Su = K.Suero, SS = K.SinSuero,
  Ha = K.Hamburguesa, Co = K.Costo, Le = K.Leyes, Re = K.Reto, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.4, 0.12); m.golpe(G + 0.4, 0.4, 70);                                   // el filete cae en la tabla
m.zumbido(G + 0.9, 3.2, 0.04, 150);                                                   // el tanque se enciende
for (let i = 0; i < 8; i++) m.burbuja(G + 1.2 + i * 0.35, 0.06, 600 + (i % 3) * 120);
m.whoosh(Bi + 0.9, 0.6, 0.1); m.tic(Bi + 1.6, 0.3, 3200);                             // la aguja de la biopsia
m.whoosh(Bi + 2.2, 0.7, 0.08);
m.whoosh(Ce - 0.3, 0.8, 0.12);                                                        // al microscopio
for (let i = 0; i < 5; i++) m.nota(Ce + 0.6 + i * 0.25, 69 + (i % 3) * 3, 0.05, 0.4);  // aparecen las células satélite
m.motor(Br, Fi - Br, 0.04);                                                           // el agitador
m.whoosh(Br + 0.4, 0.55, 0.1);                                                        // la Lupa se abre
for (let k = 0; k < 6; k++) { const t = Br + 0.9 - 0.55 + k * 0.55;                  // cada duplicación: un pop y una nota más alta
  if (k > 0) { m.pop ? m.pop(t, 0.2) : m.burbuja(t, 0.12, 900); m.nota(t, m.ESC[2 + k], 0.07, 0.5); } }
m.sube(Fi + 0.1, 0.8, 50, 57, 0.04);                                                  // cambia el caldo
m.whoosh(Fi + 2.0, 1.2, 0.1);                                                         // las células se fusionan
for (let i = 0; i < 4; i++) m.gota(Fi + 3.6 + i * 0.4, 0.12, 700 + i * 60);           // las gotitas de grasa
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                  // re-gancho
m.metal(Su + 0.3, 0.12, 700);                                                         // el tubo de suero
m.pad(Su + 1.5, SS, 0.02, [44, 51], 0.6);                                             // momento serio
m.cruje(SS + 1.0, 0.25);                                                              // tachón del suero
m.whoosh(SS + 1.4, 0.6, 0.12); m.nota(SS + 2.0, 72, 0.07, 0.8);                       // entra el caldo sin suero
m.golpe(Ha + 0.2, 0.35, 80);                                                          // tarjeta 2013
for (let i = 0; i < 70; i += 2) m.tic(Ha + 1.0 + i * 0.055 + 0.45, 0.06, 1500 + (i % 5) * 200); // lluvia de tiritas
m.golpe(Co, 0.45, 70);                                                                // número gigante
[0.4, 1.8].forEach((d, i) => m.nota(Le + d, 76 + i * 3, 0.08, 0.7));                 // palomitas
[3.6, 4.6].forEach((d) => m.golpe(Le + d, 0.3, 60));                                 // tachas
for (let i = 0; i < 9; i++) m.metal(Re + 0.3 + i * 0.16 + 0.6, 0.06, 1400 + i * 40); // monedas
m.sube(Re + 1.6, 1.8, 45, 52, 0.05);                                                  // el tanque crece
m.whoosh(Ci + 0.4, 1.0, 0.08);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
