// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #81 (Matsutake). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Armonía por secciones: México (re dórico, cálido) → Japón (pentatónica, se tensa en la caída) → bajo tierra (oscuro)
// → salón del Cofre (se aclara) → regreso (vuelve el acorde del inicio, resuelto).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Matsutake base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 81);
const K = m.K;
const G = K.Gancho, B = K.Bosque, Es = K.Especie, J = K.Japon, Ec = K.Escasez, Ex = K.Exporta, P = K.Pregunta, M = K.Micorriza,
  S = K.SinArbol, E = K.Estudio, Tk = K.Takechi, Cu = K.Cuidado, C = K.Cierre, Ou = K.Outro;

// cama grave continua: un acorde por sección, con bajo que camina
m.pad(0, B + 2.4, 0.05, [38, 45, 50]);                 // re (bosque)
m.pad(B + 2.4, J, 0.05, [41, 48, 53]);                 // fa
m.pad(J, Ec, 0.05, [43, 50, 55, 57]);                  // sol sus (Japón)
m.pad(Ec, Ex, 0.05, [40, 46, 52], 0.25);               // mi dism, ahogado (los pinos se secan)
m.pad(Ex, P, 0.05, [45, 52, 57]);                      // la (viaje)
m.pad(P, M, 0.05, [46, 53, 58], 0.1);                  // si bemol (pregunta)
m.pad(M, S, 0.055, [34, 41, 46], 0.2);                 // bajo tierra: grave y oscuro
m.pad(S, E, 0.05, [36, 43, 48], 0.15);                 // do
m.pad(E, Cu, 0.05, [41, 48, 53, 57]);                  // fa maj7 (salón, se aclara)
m.pad(Cu, C, 0.05, [43, 50, 55], 0.1);                 // sol
m.pad(C, Ou + 3.5, 0.05, [38, 45, 50, 54]);            // re con la tercera mayor: resuelto
const melodia = [[G + 0.6, 62], [G + 2.2, 65], [B + 1.0, 69], [B + 3.0, 67], [J + 0.6, 67], [J + 2.6, 69], [J + 4.4, 74],
  [Ex + 0.4, 69], [Ex + 2.0, 72], [S + 0.6, 60], [E + 0.6, 65], [E + 3.0, 69], [Tk + 3.0, 72], [C + 0.8, 66], [C + 2.6, 69]];
melodia.forEach(([t, n]) => m.nota(t, n, 0.035, 1.6, 0.3));

// efectos en el mismo cuadro que cada evento
m.whoosh(G + 0.05, 0.9, 0.12); m.cruje(G + 0.1, 0.25);                     // el viento se lleva las acículas
m.sube(G, 0.6, 50, 57, 0.05);                                               // el botón asoma
m.cruje(G + 1.6, 0.25); m.golpe(G + 1.6, 0.3, 70);                         // tachón del champiñón
m.whoosh(G + 3.3, 1.4, 0.1);                                                // avioncito
[0.6, 1.5, 2.4].forEach((d, i) => m.tic(B + d, 0.14, 1300 + i * 200));     // nombres comunes
m.sube(B, 2.2, 45, 57, 0.035);                                              // el hongo abre
m.nota(Es + 0.1, 69, 0.05, 1.0); m.tic(Es + 0.6, 0.14, 1500);              // nombre científico
for (let i = 0; i < 14; i++) m.tic(J + 1.4 + i * 0.1, 0.06, 1500 + i * 60); // cuenta hasta 12 000
m.golpe(J + 2.8, 0.25, 90);                                                  // tazón
for (let i = 0; i < 12; i++) m.tic(Ec + i * 0.1, 0.06, 2200 - i * 120);     // cae a < 100
m.cruje(Ec + 0.8, 0.35); m.cruje(Ec + 1.8, 0.3);                           // pinos que se secan
m.golpe(Ec + 2.6, 0.2, 75);
for (let i = 0; i < 6; i++) m.tic(Ex + 0.3 + i * 0.12, 0.1, 1700);          // estados en el mapa
m.whoosh(Ex + 0.6, 2.0, 0.08);                                               // ruta a Japón
[0, 1, 2].forEach((i) => m.golpe(Ex + 1.6 + i * 0.4, 0.2, 100));           // cajas
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                          // re-gancho
for (let i = 0; i < 12; i++) m.burbuja(M + 0.4 + i * 0.22, 0.05, 260 + i * 25); // hifas que crecen
for (let i = 0; i < 8; i++) { m.nota(M + 3.2 + i * 0.35, 74, 0.025, 0.3); m.nota(M + 3.37 + i * 0.35, 67, 0.025, 0.3); } // intercambio
m.gota(S + 0.4, 0.15, 800); m.sube(S + 0.2, 2.2, 40, 47, 0.03);              // micelio en el frasco
m.golpe(E + 0.2, 0.35, 80); m.metal(E + 3.6, 0.1, 900);                      // tarjeta y foto
for (let i = 0; i < 9; i++) m.tic(Tk + i * 0.03, 0.22, 900 + i * 140);       // ¡takechi! (coro de golpecitos)
m.golpe(Tk, 0.4, 120); m.nota(Tk + 0.05, 76, 0.06, 0.8); m.nota(Tk + 0.05, 72, 0.05, 0.8);
m.zumbido(Tk + 2.4, 2.8, 0.03, 220);                                         // tele vieja
m.motor(Cu + 0.3, 1.3, 0.05); m.cruje(Cu + 0.4, 0.35);                      // rastrillo
m.golpe(Cu + 1.6, 0.35, 60);                                                 // ✗
m.whoosh(C + 0.4, 0.6, 0.06);                                                // abre la lupa
m.whoosh(C + 2.6, 1.6, 0.08);                                                // regresa el avioncito
m.nota(Ou + 0.3, 50, 0.08, 2.8); m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 62, 0.05, 2.8); m.nota(Ou + 0.3, 66, 0.04, 2.8);
m.guardar(OUT, 1);
