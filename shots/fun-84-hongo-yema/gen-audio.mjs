// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #84 (Hongo Yema). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave de bosque de montaña que avanza por secciones (nunca el mismo acorde todo el shot):
// misterio (huevo) → se abre cálida (sale el hongo) → tensa (primas mortales) → luminosa (pueblos y tianguis)
// → oscura (la mortal también tiene los rasgos, no hay regla) → se resuelve tranquila (la regla y el cierre).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hongo Yema base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 84);
const K = m.K;
const G = K.Gancho, V = K.Volcan, D = K.Dentro, R = K.Revienta, S = K.Sale, P = K.Pregunta, E = K.Estudio, N = K.Nombres,
  Ra = K.Rasgos, Y = K.Yuyo, Si = K.Sin, Re = K.Regla, C = K.Cierre, Ou = K.Outro;

// ---- cama por secciones (acordes graves; cada tramo con su color) ----
const tramo = (a, b, notas, tapa = 0, g = 0.05) => m.pad(a, b, g, notas, tapa);
tramo(0, V, [45, 52, 57], 0.3);                 // la menor, tapada: misterio del huevo
tramo(V, D, [41, 48, 57], 0.15);                // fa: el volcán, amplio
tramo(D, R, [43, 50, 59], 0.35);                // sol (sus4 implícito por dentro), oscuro: por dentro
tramo(R, S, [48, 55, 60], 0.1);                 // do: se rasga el velo
tramo(S, P, [48, 55, 64], 0);                   // do mayor abierto: sale el hongo amarillo
tramo(P, E, [40, 47, 56], 0.25);                // mi (con sol#): tensión, primas mortales
tramo(E, N, [41, 48, 57], 0);                   // fa: los pueblos
tramo(N, Ra, [43, 50, 59], 0);                  // sol: los nombres
tramo(Ra, Ra + 2.6, [45, 52, 60], 0);           // la menor luminosa: tianguis
tramo(Ra + 2.6, Y, [44, 50, 59], 0.3);          // disminuido: «ojo: las mortales también…»
tramo(Y, Si, [38, 45, 53], 0.35);               // re menor: yuyo de veneno
tramo(Si, Re, [40, 46, 55], 0.4);               // mi semidisminuido: no hay regla
tramo(Re, C, [41, 48, 57], 0.1);                // fa: la regla
tramo(C, Ou, [43, 50, 59], 0.1);                // sol: ¿manjar o prima mortal?
tramo(Ou, Ou + 3.5, [45, 52, 57], 0);           // la menor resuelta: cierre

// bajo que camina en cada cambio (frases cortas, distintas)
[[V, 41], [D, 43], [R, 48], [S, 48], [P, 40], [E, 41], [N, 43], [Ra, 45], [Y, 38], [Si, 40], [Re, 41], [C, 43], [Ou, 45]]
  .forEach(([t, n], i) => { m.bajo(t + 0.05, n - 12, 0.1, 1.2); if (i % 2) m.bajo(t + 1.6, n - 5, 0.06, 0.8); });

// ---- efectos en el mismo cuadro que cada evento ----
m.cruje(G + 0.3, 0.35); for (let i = 0; i < 5; i++) m.tic(G + 0.3 + i * 0.22, 0.12, 1500 + i * 90);   // el huevo tiembla y se agrieta
m.golpe(G + 1.4, 0.25, 70);                                                                         // tachón «¿un huevo?»
m.whoosh(V - 0.2, 0.9, 0.12); m.whoosh(V + 0.4, 1.4, 0.06);                                         // viento entre pinos al alejar
m.sube(V + 0.6, 1.8, 45, 57, 0.035);                                                                // sube el medidor de altitud
m.zumbido(V + 2.2, 1.5, 0.025, 120);                                                                // nubes
m.whoosh(D + 0.15, 0.6, 0.1); m.cruje(D + 0.3, 0.2);                                                // se abre la lupa, «corte»
[1.0, 1.5, 2.0, 2.5].forEach((d, i) => m.nota(D + d, 69 + i * 2, 0.035, 0.4, 0.3));                  // etiquetas por dentro
for (let i = 0; i < 14; i++) m.gota(R + 0.1 + i * 0.22, 0.06, 900 + (i % 5) * 120);               // lluvia (ambiente)
m.cruje(R + 0.5, 0.45); m.whoosh(R + 0.6, 0.7, 0.12);                                               // se rasga el velo
m.sube(R + 1.4, 2.6, 48, 64, 0.04);                                                                 // el pie se estira
m.nota(S + 1.0, 72, 0.05, 1.0); m.nota(S + 1.0, 76, 0.04, 1.0);                                     // se abre el sombrero
[1.6, 2.0, 2.3, 2.6, 2.9].forEach((d, i) => m.tic(S + d, 0.12, 1300 + i * 100));                    // etiquetas
m.golpe(P + 0.6, 0.35, 55);                                                                         // brota la prima blanca
m.sube(P + 0.6, 1.6, 52, 46, 0.03);
m.golpe(E + 0.2, 0.3, 80);                                                                          // tarjeta del estudio
[1.5, 2.0, 2.5].forEach((d, i) => m.nota(E + d, 67 + i * 3, 0.05, 0.5));                            // tres pueblos
for (let i = 0; i < 12; i++) m.tic(E + 2.6 + i * 0.1, 0.07, 1800);                                  // cuenta 191
for (let i = 0; i < 40; i++) m.tic(N + 0.3 + i * 0.03, 0.04, 2000 + (i % 4) * 250);                // 40 hongos en la cuadrícula
for (let i = 0; i < 12; i++) m.tic(N + 0.15 + i * 0.1, 0.05, 1500);                                 // cuenta 121
[1.9, 2.2, 2.5, 2.8, 3.1].forEach((d, i) => m.nota(N + d, 64 + i * 2, 0.04, 0.35));                 // nombres del amarillo
m.whoosh(Ra, 2.0, 0.03);                                                                              // murmullo de tianguis
[1.0, 1.4, 1.8].forEach((d, i) => m.nota(Ra + d, 67 + i * 2, 0.05, 0.4));                          // rasgos en el comestible
m.golpe(Ra + 2.6, 0.3, 55);                                                                         // aparece la mortal
[3.3, 3.6, 3.9].forEach((d, i) => m.nota(Ra + d, 63 - i, 0.05, 0.5, 0.4));                          // los mismos rasgos en la mortal
m.golpe(Ra + 3.9, 0.3, 60);                                                                         // «un rasgo no basta»
m.golpe(Y + 0.2, 0.2, 90); m.sube(Y + 0.2, 1.0, 50, 57, 0.03);                                      // punto en el mapa, brota el yuyo
m.sube(Y + 0.8, 1.0, 50, 44, 0.03);                                                                 // brota la blanca
m.golpe(Y + 3.5, 0.25, 60);                                                                         // «no todas son blancas»
m.golpe(Si + 0.2, 0.3, 60); m.tic(Si + 0.6, 0.2, 900); m.tic(Si + 1.0, 0.15, 1200);                 // «=» y los «?»
[0.7, 1.2, 1.7].forEach((d) => { m.golpe(Re + d, 0.4, 70); m.cruje(Re + d, 0.15); });              // tres tachones
m.nota(Re + 2.4, 72, 0.06, 0.8); m.nota(Re + 2.4, 76, 0.05, 0.8);                                   // ✓ con un experto
m.golpe(C + 0.2, 0.2, 90); m.whoosh(C + 0.2, 0.6, 0.05);                                            // la canasta se asienta
m.nota(C + 1.2, 69, 0.04, 1.0, 0.2);                                                                // el «?» sobre el huevo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
