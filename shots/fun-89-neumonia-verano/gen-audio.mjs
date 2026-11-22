// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #89 (la neumonía de verano que te da tu casa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Neumonia Verano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 89);
const K = m.K;
const G = K.Gancho, Le = K.Levadura, Cu = K.Cubitos, Al = K.Alergia, Pi = K.Pista, P = K.Pregunta, Ca = K.Calor, Es = K.Estudio, Cs = K.Casas, Li = K.Limpiar, Pd = K.Piedra, C = K.Cierre, Ou = K.Outro;
const CsB = Cs + 3.4;

// Cama: el problema suena pesado y tapado (verano húmedo, aire quieto), con un acorde distinto por tramo;
// se abre y se aclara (acordes mayores, menos tapa) cuando entra «lo que sirve» y la ventana se abre.
const tramos = [
  [G, Le, [45, 52, 57], 0.45],       // la menor: la tos
  [Le, Cu, [41, 48, 57], 0.45],      // fa: la madera húmeda
  [Cu, Al, [38, 45, 53], 0.35],      // re menor: al microscopio
  [Al, Pi, [40, 47, 56], 0.4],       // mi (tensión): el pulmón reacciona
  [Pi, P, [45, 52, 60], 0.4],        // la menor con tercera arriba: la pista
  [P, Ca, [40, 47, 52], 0.3],        // suspendido: la pregunta
  [Ca, Es, [41, 48, 53], 0.5],       // fa sus, aplastado: calor y lluvia
  [Es, Cs, [43, 50, 55], 0.3],       // sol: el estudio crece
  [Cs, Li, [45, 52, 57], 0.35],      // la menor otra vez: cuartos sombríos
  [Li, Pd, [48, 55, 60], 0.05],      // do mayor: se abre la ventana
  [Pd, C, [43, 50, 59], 0],          // sol mayor: el dato chistoso
  [C, Ou + 3.5, [48, 55, 64], 0],    // do mayor abierto: más aire
];
for (const [a, b, notas, tapa] of tramos) m.pad(a, b + 0.2, 0.05, notas, tapa);

// Melodía lenta que cambia cada tramo (motivo → respuesta → secuencia → cadencia), nunca el mismo patrón más de 4 veces.
const motivos = [
  [G + 0.2, [69, 67, 64], 0.9, 0.6], [Le + 0.3, [65, 64, 60, 62], 0.9, 0.55], [Cu + 0.2, [62, 65, 69, 67], 0.7, 0.45],
  [Al + 0.3, [64, 68, 71, 68], 0.8, 0.5], [Pi + 0.3, [69, 72, 71, 69], 0.8, 0.45], [P + 0.1, [71, 74], 0.6, 0.3],
  [Ca + 0.3, [65, 64, 65, 67], 0.9, 0.6], [Es + 0.3, [67, 71, 74, 72, 71], 0.85, 0.35], [Cs + 0.3, [69, 67, 65, 64], 1.0, 0.45],
  [Li + 0.4, [72, 76, 79, 76, 74, 72], 0.7, 0], [Pd + 0.3, [79, 78, 74, 71], 0.6, 0], [C + 0.3, [72, 76, 79, 84], 0.8, 0],
];
for (const [t0, notas, paso, tapa] of motivos) notas.forEach((n, i) => m.nota(t0 + i * paso, n, 0.035, paso * 1.6, tapa));

// Efectos en el mismo cuadro que lo que pasa en pantalla.
const tos = (t) => { m.whoosh(t, 0.22, 0.32); m.golpe(t, 0.18, 140); };
for (let t = G + 0.15; t < G + 2.6; t += 0.7) tos(t);                          // ¡cof!
m.cruje(G + 1.5, 0.3);                                                          // ¿contagio? tachado
m.golpe(G + 2.2, 0.45, 70);                                                     // sello TU CASA
for (let i = 0; i < 6; i++) m.zumbido(G + i * 0.7, 0.6, 0.012, 3800 + i * 60);  // chicharra de verano
m.whoosh(Le, 0.8, 0.08);                                                        // acercamiento al rincón
for (let i = 0; i < 8; i++) m.nota(Le + 0.4 + i * 0.25, m.ESC[(i * 2) % 8] + 12, 0.02, 0.3, 0.3); // aparecen las motitas
m.metal(Le + 2.8, 0.1, 1400);                                                    // la caja Petri
m.sube(Le + 2.9, 1.3, 60, 67, 0.03);                                             // la colonia crece en cultivo
m.sube(Cu - 0.2, 1.0, 50, 62, 0.04);                                             // al microscopio
for (let i = 0; i < 10; i++) m.tic(Cu + 0.6 + i * 0.12, 0.09, 2200 + i * 80);    // la hifa se parte en cubitos
m.whoosh(Cu + 2.2, 1.4, 0.1);                                                    // los cubitos se van con el aire
m.whoosh(Al + 0.1, 0.9, 0.08);                                                   // respiras
m.metal(Al + 0.5, 0.08, 700);                                                    // se abre la lupa
for (let i = 0; i < 4; i++) m.latido(Al + 1.0 + i * 0.6, 0.12);                  // las defensas reaccionan
m.cruje(Al + 1.2, 0.35);                                                         // INFECCIÓN tachado
m.golpe(Al + 2.9, 0.25, 110); m.golpe(Al + 3.4, 0.25, 100); m.golpe(Al + 3.9, 0.25, 90); // tos · fiebre · falta de aire
tos(Al + 2.85);
m.metal(Pi + 0.9, 0.12, 1200);                                                   // hospital: mejora (campanita)
m.whoosh(Pi + 1.6, 1.0, 0.1);                                                    // de vuelta a casa
m.golpe(Pi + 2.7, 0.3, 75); tos(Pi + 2.9);                                       // regresa
m.golpe(P, 0.4, 60); m.sube(P + 0.1, 1.2, 55, 64, 0.04);                         // ¿por qué en verano?
for (let t = Ca; t < Es; t += 0.21) m.gota(t + (m.rnd() - 0.5) * 0.1, 0.03, 1500 + m.rnd() * 900); // lluvia
m.sube(Ca + 0.4, 1.6, 48, 60, 0.04);                                             // el termómetro sube
m.gota(Ca + 1.6, 0.2, 700);                                                      // gota de humedad
m.golpe(Es + 0.2, 0.35, 80);                                                     // tarjeta del estudio
for (let i = 0; i < 14; i++) m.tic(Es + 2.3 + i * 0.085, 0.07, 1900 + i * 40);   // contador 835
for (let i = 0; i < 4; i++) m.burbuja(Es + 4.0 + i * 0.15, 0.08, 400 + i * 60);  // aparecen las casitas
for (let i = 0; i < 3; i++) m.nota(Es + 4.8 + i * 0.25, 76 + i * 2, 0.05, 0.5);   // se pintan de verano
for (let i = 0; i < 4; i++) m.tic(Cs + 1.2 + i * 0.35, 0.14, 1300 + i * 120);    // junio a septiembre se encienden
m.golpe(Cs + 2.6, 0.25, 120);                                                    // pico en julio
m.whoosh(CsB - 0.2, 0.6, 0.08);                                                  // regreso al cuarto
m.sube(CsB + 1.2, 0.8, 52, 45, 0.03);                                            // se oscurece
for (let i = 0; i < 3; i++) m.golpe(CsB + 0.8 + i * 0.65, 0.18, 130 - i * 10);   // húmedo · sombrío · mal ventilado
for (let i = 0; i < 12; i++) m.whoosh(Li + 0.2 + i * 0.17, 0.16, 0.08);          // el cepillo talla
m.whoosh(Li + 1.4, 1.4, 0.14);                                                    // se abre la ventana: entra el aire
m.golpe(Li + 2.6, 0.35, 80);                                                     // tarjeta 1989
for (let i = 0; i < 6; i++) m.nota(Li + 3.3 + i * 0.12, 72 + [0, 4, 7, 12, 7, 4][i], 0.04, 0.4); // seis casas ✓
m.golpe(Li + 4.4, 0.2, 60); m.golpe(Li + 4.55, 0.2, 55);                         // las mal limpiadas ✗
for (let i = 0; i < 3; i++) m.burbuja(Pd + 0.7 + i * 0.5, 0.14, 650 + i * 120);  // pop de los nuditos del pelo
m.nota(C + 1.0, 72, 0.06, 1.0); m.golpe(C + 1.0, 0.3, 100);                      // sello MÁS AIRE
m.whoosh(C + 0.2, 2.0, 0.07);                                                    // brisa
m.nota(Ou + 0.3, 60, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
