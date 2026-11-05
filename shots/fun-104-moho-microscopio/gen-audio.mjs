// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #104 (Moho Microscopio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua, curiosa (de laboratorio), que cambia de acorde con cada capítulo del viaje
// (naranja → cinta → microscopio → Micheli → regreso) y se abre (más armónicos) al ver el pincel y al llegar al rociador.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Microscopio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 104);
const K = m.K;
const G = K.Gancho, Mo = K.Moho, Ci = K.Cinta, Ti = K.Tincion, Pi = K.Pincel, Ca = K.Cadenas, P = K.Pregunta, A = K.Aspergillus, Mi = K.Micheli, S = K.Sembro, Mil = K.Miles, Se = K.Seguridad, C = K.Cierre, Ou = K.Outro;
const Mi2 = Mi + 4.6;

// cama: progresión con función (i – VI – III – VII en la menor, luego regreso), notas graves que se mueven a la más cercana
m.pad(0, Ci, 0.05, [45, 52, 57], 0.1);                 // la menor: la naranja
m.pad(Ci, Pi, 0.05, [41, 48, 57], 0.15);               // fa: laboratorio
m.pad(Pi, P, 0.05, [43, 50, 55, 59], 0);               // sol (se abre: el pincel al microscopio)
m.pad(P, A, 0.05, [44, 52, 56], 0.2);                  // tensión: la pregunta
m.pad(A, Mi, 0.05, [45, 52, 57, 60], 0);               // la menor con color
m.pad(Mi, Mi2, 0.045, [41, 48, 53, 57], 0.1);          // fa (historia)
m.pad(Mi2, Mil, 0.05, [48, 52, 55, 60], 0);            // do mayor: el rociador del agua bendita
m.pad(Mil, Se, 0.05, [43, 50, 55, 59], 0);             // sol
m.pad(Se, C, 0.05, [40, 47, 52, 55], 0.25);            // mi: seguridad (más oscuro)
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);         // regreso a la menor, abierta
// motivo propio (4 notas) que regresa transpuesto: gancho, pincel, Aspergillus, cierre
const motivo = (t, base, g = 0.045) => [0, 3, 7, 5].forEach((d, i) => m.nota(t + i * 0.28, base + d, g, 0.9));
motivo(G + 0.6, 69); motivo(Pi + 2.2, 67); motivo(A + 1.7, 69, 0.04); motivo(C + 1.0, 72, 0.04);

// efectos atados a la imagen
m.whoosh(G + 0.05, 0.6, 0.12);                                                   // zoom a la pelusa
m.nota(G + 0.3, 76, 0.05, 0.8); m.golpe(G + 0.5, 0.35, 70);                       // se abre la lupa · sello NO ES UNA MANCHA
for (let i = 0; i < 10; i++) m.burbuja(Mo + 0.6 + i * 0.09, 0.05, 900 + i * 60);    // puff de esporas azules
m.whoosh(Ci + 0.2, 0.9, 0.06); m.tic(Ci + 1.15, 0.25, 600);                       // baja la cinta, presiona
m.cruje(Ci + 1.6, 0.35);                                                          // se despega la cinta
m.gota(Ti + 0.7, 0.3, 700); m.tic(Ti + 2.0, 0.15, 900); m.tic(Ti + 2.8, 0.2, 1500); // gota azul, cinta, cubreobjetos
m.metal(Ti + 3.8, 0.12, 640);                                                     // clic del objetivo
m.sube(Pi + 0.1, 1.9, 55, 67, 0.035);                                             // crece el conidióforo
for (let i = 0; i < 4; i++) m.tic(Pi + 0.75 + i * 0.25, 0.08, 1300 + i * 200);     // ramas, métulas, fiálides
for (let i = 0; i < 12; i++) m.burbuja(Ca + 0.4 + i * 0.37, 0.05, 520 + (i % 4) * 80); // cada conidio que brota
m.sube(P + 0.1, 1.4, 52, 64, 0.045);                                              // re-gancho
m.sube(A + 0.1, 1.5, 50, 62, 0.035);
for (let i = 0; i < 13; i++) m.tic(A + 1.0 + i * 0.04, 0.06, 1700 + i * 40);       // la fila de fiálides
for (let i = 0; i < 9; i++) m.burbuja(A + 1.8 + i * 0.3, 0.04, 600 + i * 30);      // cadenas
m.golpe(Mi + 0.2, 0.3, 80);                                                       // tarjeta 1729
for (let i = 0; i < 8; i++) m.gota(Mi2 + 0.2 + i * 0.18, 0.08, 1100 + (i % 3) * 150); // gotitas del rociador
m.nota(Mi2 + 1.4, 76, 0.04, 1.4); m.nota(Mi2 + 1.4, 81, 0.03, 1.4);              // campanita
m.golpe(S + 1.6, 0.25, 60); m.cruje(S + 1.6, 0.2);                                // se tacha «nace de la nada»
for (let i = 0; i < 8; i++) m.tic(S + 0.4 + i * 0.12, 0.06, 2200);                // caen esporas
m.sube(S + 1.4, 2.0, 57, 64, 0.03);                                               // crece la colonia
m.whoosh(Mil + 0.5, 2.0, 0.08);                                                   // nube de esporas
m.nota(Mil + 2.5, 79, 0.05, 1.0);                                                 // aparece el conidio
m.whoosh(Se + 0.4, 0.6, 0.06); m.golpe(Se + 1.3, 0.45, 55);                       // nariz · sello NO
m.cruje(Se + 2.9, 0.3); m.whoosh(Se + 3.6, 0.7, 0.08); m.golpe(Se + 4.3, 0.3, 120); m.metal(Se + 4.35, 0.12, 500); // bolsa, al bote, tapa
m.whoosh(C + 0.3, 0.6, 0.06); m.nota(C + 0.6, 76, 0.05, 1.0);                     // se abre otra vez la lupa
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
