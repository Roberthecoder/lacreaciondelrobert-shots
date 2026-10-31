// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #48 (células iPS). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: 4 notas = los 4 genes (Oct4, Sox2, Klf4, c-Myc); 24 tics que se van callando = los 24 genes candidatos → 4.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ips base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
const G = K.Gancho, Pi = K.Piel, Ge = K.Genes, Ol = K.Olvida, In = K.Interruptores, Hu = K.Humana, Pr = K.Pregunta, De = K.Destino,
  Re = K.Retina, Pa = K.Parkinson, Pl = K.Plato, Ve = K.Veinticuatro, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.02, 0.6, 0.12);                                                        // la Lupa se abre
for (let i = 0; i < 3; i++) m.nota(G + 1.6 + i * 0.45, [64, 67, 71][i], 0.06, 0.7);   // neurona · retina · corazón
for (let i = 0; i < 3; i++) m.latido(G + 2.6 + i * 0.9, 0.12);                         // la célula de corazón late
for (let i = 0; i < 3; i++) m.whoosh(Pi + 0.2 + i * 0.35, 0.35, 0.06);                 // entran los tres ADN
for (let i = 0; i < 3; i++) m.nota(Pi + 1.6 + i * 0.3, 69 + i * 2, 0.05, 0.5);         // cada una prende su parte
m.golpe(Ge + 0.3, 0.3, 85);
for (let i = 0; i < 4; i++) m.nota(Ge + 2.2 + i * 0.55, [60, 64, 67, 72][i], 0.09, 0.8); // los 4 genes (uno por nota)
m.whoosh(Ge + 5.0, 0.8, 0.08);                                                        // entran a la caja
m.tic(Ol + 1.6, 0.2, 1800);                                                           // se tacha «piel»
for (let i = 0; i < 6; i++) m.burbuja(Ol + 0.4 + i * 0.25, 0.07, 500 + i * 60);        // se redondean
for (let i = 0; i < 12; i++) m.burbuja(Ol + 2.3 + i * 0.1, 0.06, 650);                 // la colonia crece
m.whoosh(In, 0.6, 0.1);                                                               // Lupa por dentro
for (let i = 0; i < 4; i++) m.tic(In + 1.1 + i * 0.3, 0.12, 1500);                     // los factores se pegan
for (let i = 0; i < 3; i++) m.tic(In + 1.3 + [0, 2, 4][i] * 0.3, 0.1, 2400);           // se prenden los focos de embrión
m.golpe(Hu + 0.05, 0.3, 90);                                                          // «iPS»
m.sube(Pr + 0.1, 1.8, 52, 64, 0.05);                                                  // re-gancho
for (let i = 0; i < 3; i++) m.nota(De + 0.1 + i * 0.45, [64, 67, 71][i], 0.06, 0.7);  // los tres caminos (como en el gancho)
m.golpe(Re + 0.2, 0.35, 80); m.whoosh(Re + 2.6, 1.6, 0.07);                           // tarjeta · la lámina entra al ojo
m.golpe(Pa + 0.2, 0.35, 80);
for (let i = 0; i < 7; i++) m.tic(Pa + 0.4 + i * 0.15, 0.08, 1200); // 7 pacientes
for (let i = 0; i < 14; i++) m.gota(Pa + 3.2 + i * 0.22, 0.08, 1100);                  // dopamina
m.gota(Pl + 0.6, 0.15, 900); for (let i = 0; i < 6; i++) m.gota(Pl + 0.7 + i * 0.45, 0.14, 950); // el gotero
for (let i = 0; i < 24; i++) m.tic(Ve + 0.4 + i * 0.05, 0.05, 1600 + (i % 6) * 120);   // 24 genes
for (let i = 0; i < 14; i++) m.tic(Ve + 0.9 + i * 0.08, 0.1, 900);                     // se tachan 14 (quedan 10)
for (let i = 0; i < 6; i++) m.tic(Ve + 2.6 + i * 0.12, 0.12, 800);                     // se tachan 6 (quedan 4)
for (let i = 0; i < 4; i++) m.nota(Ve + 3.6 + i * 0.12, [60, 64, 67, 72][i], 0.08, 0.6); // los 4 de nuevo
m.whoosh(Ci + 0.2, 0.6, 0.1);
for (let i = 0; i < 4; i++) m.nota(Ci + 1.0 + i * 0.3, [60, 64, 67, 72][i], 0.07, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
