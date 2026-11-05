// gen-audio.mjs — cama + efectos del Shot Fungi Mati #64 (Hongos del mercado). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): nada se repite igual. La cama cambia de armonía con la historia:
// mercado al amanecer (re dórico, cálido) → bajo el suelo (grave, oscuro, notas sueltas como gotas) → trueque (diálogo
// de dos voces que se responden) → bosque (se abre) → estudio (melodía de madera, frase nueva) → aviso (tenso, seco,
// disonante) → cierre (vuelve el tema del mercado, ahora completo y con la quinta arriba).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hongos Mercado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 64);
const K = m.K;
const G = K.Gancho, Me = K.Mercado, F = K.Fruto, Mi = K.Micelio, R = K.Raiz, Tr = K.Trueque, P = K.Pregunta, B = K.Bosque,
  E = K.Estudio, S = K.Senas, A = K.Aviso, X = K.Experto, C = K.Cierre, Ou = K.Outro;

// --- cama: cada tramo con su armonía (sin golpe; siempre debajo de la voz) ---
m.pad(0, Me, 0.045, [50, 57, 62], 0.1);            // re: el número, abierto
m.pad(Me, F + 0.2, 0.05, [50, 57, 59, 64], 0);     // mercado: re dórico (la sexta mayor, cálida)
m.pad(F, Mi + 0.3, 0.045, [48, 55, 60, 64], 0.1);  // el fruto: do, se prepara para bajar
m.pad(Mi, Tr, 0.055, [41, 48, 53], 0.45);          // bajo el suelo: fa grave y tapado
m.pad(Tr, P + 0.2, 0.05, [43, 50, 55, 58], 0.3);   // trueque: sol menor
m.pad(P, B + 0.2, 0.045, [45, 52, 55, 60], 0.2);   // pregunta: la menor con séptima, suspendido
m.pad(B, E + 0.2, 0.05, [43, 50, 55, 59], 0);      // bosque: sol mayor, se abre
m.pad(E, A, 0.045, [45, 52, 57, 61], 0.05);        // estudio y señas: la mayor
m.pad(A, C, 0.05, [40, 46, 52], 0.55);             // aviso: tritono grave, seco
m.pad(C, Ou + 3.5, 0.05, [50, 57, 62, 66], 0);     // cierre: re mayor, el tema del mercado completo

// --- melodías (frases distintas; ninguna se repite tal cual) ---
const frase = (t0, notas, paso, g = 0.045, d = 0.7) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n, g, d));
frase(Me + 0.3, [62, 64, 65, 69, 67], 0.62, 0.04, 0.9);            // mercado: re dórico que sube
frase(F + 0.3, [72, 71, 67], 0.6, 0.035, 1.0);                     // el fruto
frase(Mi + 0.6, [53, 0, 56, 0, 60, 58], 0.45, 0.03, 1.2);          // gotas graves bajo el suelo
frase(Tr + 0.2, [67, 70, 0, 62, 65, 0, 69, 72], 0.38, 0.032, 0.6); // diálogo árbol ↔ hongo (pregunta y respuesta)
frase(B + 2.2, [67, 71, 74, 72, 79], 0.5, 0.04, 1.0);              // bosque abierto
frase(E + 2.8, [69, 73, 76, 74, 73, 71], 0.42, 0.032, 0.7);        // estudio: frase de madera
frase(S + 3.1, [76, 74, 73, 69], 0.55, 0.03, 1.0);                 // saber de las hongueras (desciende, cálido)
frase(C + 1.0, [62, 66, 69, 74, 73, 74, 78], 0.48, 0.04, 1.1);     // cierre: vuelve el tema, completo y arriba

// --- efectos, en el mismo cuadro que lo que pasa ---
m.whoosh(G + 0.05, 0.5, 0.08); m.golpe(G + 0.55, 0.32, 140); m.tic(G + 0.75, 0.25, 900); // cae el champiñón y rebota en el plato
for (let i = 0; i < 34; i++) m.tic(G + 0.4 + 2.8 * (i / 34) ** 0.8, 0.05, 2200 + (i % 5) * 180); // se llena la cuadrícula
m.nota(G + 3.4, 74, 0.06, 1.2); m.golpe(G + 3.4, 0.25, 90);                        // 425
for (let i = 0; i < 18; i++) m.gota(Me + i * 0.2 + (i % 3) * 0.05, 0.05, 1200 + (i % 4) * 160); // lluvia en el toldo
[0, 1, 2, 3].forEach((i) => { m.burbuja(Me + 0.3 + i * 0.7, 0.12, 380 + i * 60); m.tic(Me + 0.5 + i * 0.7, 0.12, 1300 + i * 200); }); // 4 canastas
m.sube(F - 0.3, 0.8, 50, 62, 0.04);                                                 // crece la yema
m.tic(F + 0.9, 0.15, 1500);                                                         // manzana
m.whoosh(Mi - 0.2, 0.8, 0.12); m.cruje(Mi + 0.1, 0.35);                             // bajamos por el suelo
m.zumbido(Mi + 0.2, 3.2, 0.03, 140);                                                // crecen las hifas
m.whoosh(R - 0.3, 0.6, 0.08); m.sube(R + 0.3, 1.5, 48, 60, 0.03);                   // zoom a la raíz, se forma el manto
for (let i = 0; i < 10; i++) m.tic(R + 1.8 + i * 0.14, 0.05, 2600 + (i % 3) * 300); // red de Hartig
for (let i = 0; i < 8; i++) { m.burbuja(Tr + 0.3 + i * 0.42, 0.06, 700 + (i % 3) * 90); m.gota(Tr + 0.5 + i * 0.42, 0.05, 600 + (i % 2) * 140); } // azúcares y agua
m.sube(P + 0.1, 1.3, 52, 64, 0.04); m.tic(P + 0.3, 0.15, 1100);                    // re-gancho
m.golpe(B + 0.3, 0.2, 70); m.tic(B + 0.35, 0.2, 500);                               // "tok" de la maceta
m.cruje(B + 0.9, 0.3); m.golpe(B + 0.9, 0.3, 60);                                   // ✗
for (let i = 0; i < 10; i++) m.tic(B + 1.7 + i * 0.32, 0.06, 420 + (i % 2) * 60);  // pasos de la honguera
for (let i = 0; i < 12; i++) m.gota(B + 1.5 + i * 0.27, 0.04, 1300 + (i % 4) * 120);// lluvia en el bosque
m.golpe(E + 0.2, 0.35, 80);                                                         // tarjeta del estudio
m.whoosh(E + 2.6, 0.5, 0.06); m.nota(E + 3.1, 81, 0.05, 0.4);                       // mapa y punto en Hidalgo
[0.3, 1.1, 1.9].forEach((d, i) => { m.tic(S + d, 0.25, 1700 + i * 300); m.nota(S + d + 0.05, 69 + i * 4, 0.04, 0.5); }); // 3 señas
m.golpe(A + 0.2, 0.3, 55);                                                          // aparece la mortal
[0.9, 1.33, 1.76].forEach((d) => m.tic(A + d, 0.25, 1500));                         // las mismas 3 señas
m.cruje(A + 2.3, 0.35); m.golpe(A + 2.3, 0.6, 45);                                  // sello MORTAL (grave)
for (let i = 0; i < 9; i++) m.burbuja(A + 3.2 + i * 0.22, 0.08, 300 + (i % 4) * 70);// la olla hierve
m.golpe(X + 0.05, 0.4, 70); m.metal(X + 0.1, 0.12, 600);                            // advertencia
m.whoosh(C + 0.5, 0.7, 0.06); [0, 1, 2, 3].forEach((i) => m.nota(C + 1.4 + i * 0.2, 74 + i * 2, 0.035, 0.8)); // se encienden las canastas
m.nota(Ou + 0.3, 50, 0.07, 3); m.nota(Ou + 0.3, 57, 0.06, 3); m.nota(Ou + 0.3, 66, 0.05, 3); m.nota(Ou + 0.5, 74, 0.04, 2.6);
m.guardar(OUT, 1);
