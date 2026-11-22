// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #134 (polvo = mapa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama «de detective» en La menor con progresión que cambia por sección (nunca el mismo acorde más de ~4 s),
// un motivo de 4 notas en pizzicato que pregunta (sube) y luego responde (baja), y la cama se abre a mayor en «venían de afuera» y en el mapa.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Polvo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 134);
const K = m.K;
const G = K.Gancho, Ma = K.Marco, En = K.Entrada, Es = K.Esporas, R = K.Regiones, P = K.Pregunta, H = K.Hisopo, A = K.ADN, Af = K.Afuera,
  B = K.Bacterias, M = K.Mapa, F = K.Forense, C = K.Cierre, Ou = K.Outro;

// cama: acordes con conducción de voces (cada voz se mueve a la nota más cercana)
const acordes = [
  [G, Ma, [45, 52, 57], 0.2], [Ma, En, [41, 52, 57], 0.2], [En, Es, [43, 50, 55], 0.15], [Es, R, [40, 52, 55], 0.35], // Am · F · G · Em (oscuro, micro)
  [R, P, [41, 53, 57], 0.15], [P, H, [40, 50, 56], 0.25],                                                            // F · E (pregunta, suspenso)
  [H, A, [45, 52, 57], 0.1], [A, Af, [41, 52, 57], 0.3],                                                            // Am · F (ADN)
  [Af, B, [48, 52, 55], 0], [B, M, [43, 50, 55], 0], [M, F, [41, 53, 57], 0], [F, C, [40, 52, 56], 0.1],          // C · G · F · E (se abre)
  [C, Ou, [45, 52, 57], 0.1], [Ou, Ou + 3.5, [45, 52, 57, 60], 0]];                                                // Am → Am(add C) final
acordes.forEach(([a, b, n, tapa]) => m.pad(a, b + 0.3, 0.05, n, tapa));
// bajo suave en cada cambio de acorde
acordes.forEach(([a, , n]) => m.bajo(a + 0.02, n[0] - 12, 0.08, 1.6));

// motivo de 4 notas (pregunta ↑ / respuesta ↓), variado en cada aparición
const motivo = (t, notas, paso = 0.28, g = 0.045) => notas.forEach((mm, i) => m.nota(t + i * paso, mm, g, 0.5));
motivo(G + 0.2, [69, 72, 76, 74]);            // pregunta
motivo(En + 0.4, [67, 71, 74, 72]);           // secuencia un tono abajo
motivo(R + 0.5, [65, 69, 72, 76]);            // sube más
motivo(P + 0.1, [64, 68, 71, 76], 0.22);      // tensión (sensible)
motivo(H + 0.3, [76, 74, 72, 69]);            // respuesta, baja
motivo(Af + 0.2, [72, 76, 79, 84], 0.24, 0.05); // se abre a mayor: «venían de afuera»
motivo(M + 2.0, [79, 76, 74, 72], 0.3);       // el mapa
motivo(C + 0.3, [69, 72, 76, 74]);            // regresa el tema del inicio
motivo(C + 3.0, [72, 71, 69], 0.4);           // cadencia a la raíz

// efectos en el mismo cuadro que la imagen
m.whoosh(G + 0.1, 1.2, 0.08);                                                     // el dedo raspa el marco
for (let i = 0; i < 24; i++) m.tic(G + 0.9 + i * 0.09, 0.05, 2200 + (i % 5) * 250); // motas que forman el mapa
m.tic(Ma + 0.3, 0.2, 900); m.whoosh(Ma + 0.6, 1.6, 0.04);                          // flecha, se junta el polvo
m.whoosh(En + 0.4, 1.0, 0.08); m.whoosh(En + 1.2, 1.0, 0.07);                      // entran esporas (ventana, puerta)
m.tic(En + 3.0, 0.15, 1200);                                                       // esporas en la persona
for (let i = 0; i < 7; i++) m.burbuja(Es + 0.15 + i * 0.13, 0.06, 500 + i * 60);   // aparecen las esporas
for (let i = 0; i < 6; i++) m.nota(R + 0.3 + i * 0.36, 60 + [0, 4, 7, 2, 5, 9][i], 0.03, 0.6); // se pintan las regiones
m.sube(P + 0.1, 1.5, 52, 64, 0.04);                                                // re-gancho
m.golpe(H + 0.75, 0.3, 80);                                                        // tarjeta 2012–13
for (let i = 0; i < 10; i++) m.whoosh(H + 2.0 + i * 0.25, 0.18, 0.05);             // talle del hisopo
for (let i = 0; i < 30; i++) m.tic(H + 4.8 + i * 0.06, 0.04, 1600 + (i % 3) * 400);  // se encienden ~1,200 casas
m.gota(A + 0.2, 0.2, 800);                                                         // el hisopo entra al tubo
for (let i = 0; i < 26; i++) m.tic(A + 0.6 + i * 0.09, 0.04, 2600 + (i % 4) * 300); // lectura de ADN y contador
m.golpe(A + 1.8, 0.25, 80);                                                        // tarjeta 2015
for (let i = 0; i < 5; i++) m.tic(Af + 0.6 + i * 0.2, 0.12, 1400);                  // líneas adentro–afuera
for (let i = 0; i < 8; i++) m.burbuja(B + 0.5 + i * 0.12, 0.05, 700 + i * 40);       // bacterias
m.golpe(B + 2.4, 0.3, 110); m.nota(B + 2.45, 79, 0.05, 0.5);                      // 92 %
m.golpe(M + 0.2, 0.25, 80);                                                        // tarjeta 2020
m.tic(M + 1.0, 0.25, 1000); m.nota(M + 1.6, 84, 0.05, 1.2);                        // punto y «ping» del círculo
m.whoosh(F + 0.2, 1.2, 0.06);                                                      // la lupa
m.whoosh(C + 0.8, 3.0, 0.07);                                                      // el trapo borra
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
