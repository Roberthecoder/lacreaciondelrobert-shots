// gen-audio.mjs — música y efectos del Shot Fungi Mati #109 (café → setas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave continua + un motivo de 4 notas ("la taza") a ~100 BPM que evoluciona:
// se presenta en menor, se apaga y se vuelve cristalino en lo microscópico, se suspende en la pregunta, pasa a mayor con el
// dato del espresso, baja de registro en la historia de Veracruz (otro "instrumento") y regresa arriba, resuelto, al cierre.
// Ningún compás se repite igual más de 2 veces seguidas.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cafe Setas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 109);
const K = m.K;
const G = K.Gancho, R = K.Robert, O = K.Ojo, D = K.Dato, M = K.Mezcla, H = K.Hifas, Ca = K.Cafeina, P = K.Pregunta,
  E = K.Espresso, Mx = K.Mexico, X = K.Xalapa, Mu = K.Mundo, C = K.Cierre, Ou = K.Outro;

// ---------- cama (acordes por sección, con conducción de voces) ----------
const camas = [
  [0, O, [45, 52, 57], 0.1],          // Am
  [O, D, [41, 48, 57], 0.15],         // F (el problema)
  [D, M, [43, 50, 55], 0.2],          // G, tensa
  [M, H, [48, 52, 55], 0],            // C: la mezcla sí funciona
  [H, Ca, [38, 45, 50], 0.35],        // Dm grave (micro)
  [Ca, P, [40, 47, 52], 0.3],         // Em
  [P, E, [45, 52, 59], 0.2],          // Asus2 (pregunta)
  [E, Mx, [48, 55, 64], 0],           // C mayor (el dato)
  [Mx, X, [41, 48, 57], 0.05],        // F
  [X, Mu, [43, 50, 59], 0],           // G
  [Mu, C, [38, 45, 53], 0.15],        // Dm (el tamaño del problema)
  [C, Ou + 3.5, [45, 52, 60], 0],     // Am → con la 3.ª arriba (resuelve)
];
camas.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.15, 0.045, notas, tapa));

// ---------- motivo ("la taza": la–do–mi–re) y sus variaciones ----------
const BEAT = 0.6, BAR = 4 * BEAT;
const MOTIVO = [[0, 69], [1, 72], [2, 76], [3, 74]];
const vars = {
  A: MOTIVO,                                                    // presentación
  A2: [[0, 69], [1, 72], [2, 76], [2.5, 77], [3, 76]],          // respuesta
  A3: [[0, 72], [1, 76], [2, 79], [3, 77]],                     // secuencia (una 3.ª arriba)
  cad: [[0, 76], [1, 74], [2, 72], [3, 69]],                    // cadencia que baja a la raíz
  F: [[0, 69], [1.5, 72], [3, 72]],                             // ahogado (problema)
  G: [[0, 71], [1, 74], [3, 71]],
  vidrio: [[0, 81], [1.5, 84], [3, 88]],                        // microscópico: alto y espaciado
  vidrio2: [[0, 86], [2, 84]],
  may: [[0, 72], [1, 76], [2, 79], [3, 84]],                    // mayor (espresso)
  may2: [[0, 84], [1, 83], [2, 79], [3, 76]],
  bajoA: [[0, 57], [1, 60], [2, 64], [3, 62]],                  // el tema una octava abajo (Veracruz)
  bajoB: [[0, 59], [1, 62], [2, 67], [3, 66]],
  bajoC: [[0, 64], [1, 62], [2, 60], [2.5, 59], [3, 57]],
  tenso: [[0, 74], [1, 72], [2, 69], [3, 68]],
  fin: [[0, 69], [1, 72], [2, 76], [3, 81]],
};
const frase = (t0, t1, lista, g = 0.032, tapa = 0) => { let t = t0, i = 0;
  while (t + BAR * 0.5 < t1) { const v = vars[lista[i % lista.length]]; v.forEach(([b, n]) => { if (t + b * BEAT < t1) m.nota(t + b * BEAT, n, g, 0.9, tapa); }); t += BAR; i++; } };
frase(G + 0.3, O, ['A', 'A2']);
frase(O, D, ['F'], 0.026, 0.5);
frase(D, M, ['G', 'F', 'G'], 0.026, 0.4);
frase(M, H, ['A', 'A3', 'cad']);
frase(H, P, ['vidrio', 'vidrio2', 'vidrio'], 0.022);
frase(E, Mx, ['may', 'may2', 'may']);
frase(Mx, X, ['bajoA', 'bajoB', 'bajoA'], 0.04);
frase(X, Mu, ['bajoB', 'bajoC', 'A3'], 0.036);
frase(Mu, C, ['tenso', 'F'], 0.028, 0.2);
frase(C, Ou, ['A2', 'fin'], 0.034);
for (let i = 0; i < Math.floor(Ou / BAR); i++) m.bajo(G + i * BAR, [45, 41, 43, 45, 38, 40][Math.floor(i / 2) % 6], 0.045, 1.2);  // pulso grave suave cada compás

// ---------- efectos, en el mismo cuadro que la imagen ----------
m.whoosh(G + 0.05, 0.5, 0.12);                                                     // el filtro se voltea
for (let i = 0; i < 18; i++) m.tic(G + 0.35 + i * 0.045, 0.07, 500 + (i % 5) * 90); // caen los posos
m.golpe(G + 1.0, 0.18, 70);                                                         // se forma el montón
m.cruje(G + 1.3, 0.25);                                                             // "¿tierra?" tachado
m.tic(G + 1.9, 0.12, 1500);                                                         // chip "posos de café"
m.golpe(R + 1.2, 0.35, 60);                                                         // ✗ del intento de Robert
m.tic(R + 0.3, 0.1, 1400);
m.golpe(O + 0.15, 0.45, 55); m.cruje(O + 0.15, 0.15);                              // sello OJO
m.tic(O + 0.4, 0.1, 1400); m.burbuja(O + 0.7, 0.05, 380); m.burbuja(O + 1.0, 0.05, 420); // setitas que casi no salen
m.golpe(D + 0.15, 0.3, 110); m.nota(D + 0.2, 76, 0.05, 0.6);                        // sello DATO
m.golpe(D + 0.4, 0.3, 80);                                                          // tarjeta 2021
m.sube(D + 1.0, 3.2, 52, 64, 0.03);                                                 // sube el % de posos
m.metal(D + 2.6, 0.12, 900);                                                        // cruza el 30 %
m.tic(D + 3.6, 0.12, 1300);
[0.3, 0.7, 1.1].forEach((d) => m.tic(M + d, 0.12, 1500));                           // capas: olivo, paja, posos
m.sube(M + 1.2, 1.8, 55, 60, 0.025);                                                // el micelio blanco avanza
for (let i = 0; i < 5; i++) m.burbuja(M + 2.4 + i * 0.22, 0.06, 450 + i * 60);       // brotan las setas
m.metal(M + 3.0, 0.1, 620); m.tic(M + 3.4, 0.12, 1300);                              // balanza, chip
m.zumbido(H + 0.2, 3.0, 0.03, 160);                                                 // hifas que crecen
for (let i = 0; i < 8; i++) m.tic(H + 0.4 + i * 0.35, 0.05, 2600 + (i % 3) * 300);
m.tic(H + 0.1, 0.1, 1800);
[0.9, 1.5, 2.1].forEach((d, i) => { m.burbuja(Ca + d, 0.1, 600 + i * 120); m.gota(Ca + d + 0.05, 0.08, 1000 + i * 150); }); // se van los 3 metilos
m.tic(Ca + 1.0, 0.1, 1400); m.nota(Ca + 2.5, 81, 0.04, 1.0);                       // chip, "xantina"
m.sube(P + 0.1, 1.6, 52, 64, 0.04);                                                 // re-gancho
m.tic(E + 0.1, 0.12, 1400);
for (let i = 0; i < 20; i++) m.tic(E + 0.8 + i * 0.09, 0.08, 650 + (i % 4) * 40);   // 20 cajas de setas
m.golpe(E + 1.3, 0.3, 70); m.golpe(E + 4.3, 0.3, 80);                               // ≈ 250 kg · tarjeta 2019
m.golpe(Mx + 0.05, 0.25, 90); m.tic(Mx + 0.6, 0.1, 1500); m.tic(Mx + 0.9, 0.1, 1500); // cereza, pulpa, grano
m.whoosh(Mx + 1.5, 0.5, 0.08); m.tic(Mx + 2.0, 0.08, 1200);                          // flecha → bolsa, mapa
m.golpe(Mx + 2.6, 0.25, 100); m.nota(Mx + 2.65, 72, 0.04, 0.8);                     // punto: Xalapa
m.tic(Mx + 3.0, 0.1, 1400);
for (let i = 0; i < 4; i++) m.burbuja(Mx + 3.4 + i * 0.25, 0.05, 500 + i * 50);
m.tic(X + 0.2, 0.1, 1400); m.nota(X + 0.3, 88, 0.025, 1.6);                         // chip, brillo del sol
[0, 1, 2].forEach((i) => m.golpe(X + 2.0 + i * 0.2, 0.16, 65));                      // tres costales
m.metal(X + 3.0, 0.1, 620); m.golpe(X + 3.7, 0.2, 75);                              // balanza que se inclina
m.nota(X + 3.6, 76, 0.04, 0.8);                                                     // > 100 %
m.golpe(Mu + 0.3, 0.3, 60); m.cruje(Mu + 0.6, 0.3); m.tic(Mu + 1.6, 0.1, 1300);     // 6 millones, montón de posos
for (let i = 0; i < 6; i++) m.tic(C + 0.2 + i * 0.14, 0.07, 1700);                   // paja que se mezcla
for (let i = 0; i < 6; i++) m.burbuja(C + 0.8 + i * 0.3, 0.06, 420 + i * 50);         // brotan las setas
m.tic(C + 1.2, 0.1, 1400);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
