// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #133 (Lascaux). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama de caverna en la menor con progresión con función y voces que se mueven
// a la nota más cercana (i – VI – iv – V), un tema propio de 4 notas (motivo → respuesta → secuencia → cadencia) que vuelve
// en el cierre una octava abajo; se oscurece con los hongos (V tenso) y se abre en las réplicas (VI – III). Siempre bajo la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lascaux base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 133);
const K = m.K;
const G = K.Gancho, Cu = K.Cueva, Vi = K.Visitas, Ve = K.Verde, P = K.Pregunta, B = K.Blanco, Hi = K.Hifas, Ne = K.Negro, Es = K.Estudio, Me = K.Melanina, Pa = K.Paredes, Re = K.Replica, C = K.Cierre, Ou = K.Outro;

// cama: acordes por sección (graves, conducción de voces cercana)
const Am = [45, 52, 57, 60], F = [41, 48, 57, 60], Dm = [38, 50, 57, 62], E = [40, 52, 56, 59], C_ = [36, 48, 55, 60], G_ = [43, 50, 55, 59];
const cama = [[G, Cu, Am, 0], [Cu, Vi, F, 0], [Vi, Ve, Am, 0.1], [Ve, P, Dm, 0.2], [P, B, E, 0.3], [B, Hi, Am, 0.35], [Hi, Ne, Dm, 0.5],
  [Ne, Es, E, 0.45], [Es, Me, F, 0.35], [Me, Pa, Dm, 0.4], [Pa, Re, E, 0.3], [Re, C, F, 0.05], [C, Ou, C_, 0.1], [Ou, Ou + 3.5, Am, 0]];
cama.forEach(([a, b, ch, tapa]) => m.pad(Math.max(0, a - 0.3), b + 0.3, 0.045, ch, tapa));

// tema (pocas notas, suaves, en los huecos de la voz): motivo A–C–E…D, respuesta C–B–G…A
const tema = (t, base = 0, g = 0.035) => [[0, 69], [0.45, 72], [0.9, 76], [1.6, 74]].forEach(([d, n]) => m.nota(t + d, n + base, g, 1.4));
const resp = (t, base = 0, g = 0.035) => [[0, 72], [0.45, 71], [0.9, 67], [1.6, 69]].forEach(([d, n]) => m.nota(t + d, n + base, g, 1.6));
tema(G + 0.3); resp(Cu + 0.4, -12);                    // presenta el tema y su respuesta
tema(Re + 0.6, -5, 0.03);                              // secuencia (transpuesto) cuando aparecen las copias
resp(Ou + 0.3, -12, 0.05); m.nota(Ou + 2.2, 57, 0.06, 1.3); m.nota(Ou + 2.2, 64, 0.04, 1.3); // cadencia final en la

// efectos en el mismo cuadro de cada evento
m.tic(G + 0.1, 0.3, 1600); m.whoosh(G + 0.1, 2.0, 0.07);                    // clic de linterna y barrido de luz
for (let i = 0; i < 5; i++) m.gota(G + 3.6 + i * 0.4, 0.12, 300 + i * 30);   // crece la manchita negra
m.nota(Cu + 0.6, 76, 0.05, 0.5);                                            // punto en el mapa
[1.3, 2.1, 2.8].forEach((d, i) => m.whoosh(Cu + d, 0.5, 0.06 + i * 0.01));  // toro, caballo, ciervo
for (let i = 0; i < 4; i++) m.tic(Vi + 0.3 + i * 0.25, 0.12, 900);          // pasos de los cuatro muchachos
for (let i = 0; i < 12; i++) m.tic(Vi + 2.9 + i * 0.22, 0.08, 700 + (i % 2) * 150); // fila de visitantes
m.sube(Vi + 3.8, 1.7, 52, 59, 0.03);                                        // sube el termómetro
for (let i = 0; i < 6; i++) m.burbuja(Ve + 0.2 + i * 0.3, 0.06, 260 + i * 25); // brotan las algas
m.metal(Ve + 2.4, 0.3, 300); m.golpe(Ve + 2.5, 0.5, 55);                    // la reja cae (1963)
m.sube(P + 0.1, 1.5, 52, 60, 0.04);                                         // re-gancho
m.zumbido(B + 0.3, 2.6, 0.05, 120);                                         // aire acondicionado nuevo
m.cruje(B + 1.7, 0.35); m.whoosh(B + 2.4, 1.6, 0.04);                       // pelusa blanca
for (let i = 0; i < 8; i++) m.tic(Hi + 0.6 + i * 0.15, 0.06, 2200 + i * 80); // esporas
m.whoosh(Hi + 2.2, 1.2, 0.07);                                              // cae la cal
for (let i = 0; i < 10; i++) m.gota(Hi + 2.3 + i * 0.08, 0.1, 900 + i * 40); // gotas de biocida
for (let i = 0; i < 10; i++) m.gota(Ne + 0.1 + i * 0.21, 0.13, 260 + (i % 3) * 40); // «plop» de cada mancha negra
m.golpe(Es + 0.2, 0.35, 80);                                                // tarjeta del estudio
m.cruje(Es + 2.5, 0.25);                                                    // crecen las hifas oscuras
for (let i = 0; i < 14; i++) m.tic(Me + 0.6 + i * 0.13, 0.05, 1200);        // gránulos de melanina
for (let i = 0; i < 8; i++) m.gota(Pa + 0.2 + i * 0.25, 0.12, 280);         // manchas junto al arte
m.golpe(Re + 1.0, 0.3, 90); m.golpe(Re + 2.8, 0.3, 100);                    // aparecen Lascaux II y IV
m.whoosh(C + 0.2, 1.8, 0.05); m.metal(C + 1.7, 0.25, 300); m.golpe(C + 1.8, 0.4, 55); // se apaga la luz, baja la reja
m.guardar(OUT, 1);
