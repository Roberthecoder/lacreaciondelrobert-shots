// gen-audio.mjs — cama grave + motivo que evoluciona + efectos del Shot Fungi Mati #108 (moho verde). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): tema propio de 4 notas en la menor que se va "contaminando" (le crecen segundas
// menores y se ahoga con el filtro) mientras el moho gana; se limpia y pasa a la mayor en el cierre. Nunca el mismo
// patrón más de 4 compases: cada escena cambia de acorde, registro, ritmo o respuesta.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Verde base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 108);
const K = m.K;
const G = K.Gancho, Q = K.Quien, PD = K.PorDentro, L = K.Lab, P = K.Pregunta, E = K.Entra, Er = K.Errores, V = K.Vacio,
  Es = K.Estudio, Gr = K.Gramo, Ch = K.Chiste, Ci = K.Cierre, Ou = K.Outro;
const B = 0.6;                                     // 100 BPM: una negra = 0.6 s

// --- cama: acordes con función (i – VI – iv – V … y al final I mayor), ahogada (tapa) mientras gana el moho
const camas = [[G, PD, [45, 52, 57], 0.1], [PD, P, [41, 48, 57], 0.35], [P, E, [38, 50, 53], 0.45], [E, V, [40, 52, 56], 0.3],
  [V, Es, [41, 48, 53], 0.5], [Es, Gr, [38, 45, 53], 0.35], [Gr, Ch, [40, 47, 56], 0.55], [Ch, Ci, [43, 50, 55], 0.15], [Ci, Ou + 3.5, [45, 52, 61], 0]];
camas.forEach(([a, b, n, tapa]) => m.pad(a, b, 0.05, n, tapa));

// --- tema (4 notas) y sus variaciones: motivo → respuesta → secuencia → cadencia
const TEMA = [69, 72, 76, 74];
const frase = (t0, notas, ritmo, g = 0.045, tapa = 0) => { let t = t0; notas.forEach((n, i) => { m.nota(t, n, g, ritmo[i % ritmo.length] * 1.6, tapa); t += ritmo[i % ritmo.length]; }); };
frase(G + 0.2, TEMA, [B, B, B, 2 * B], 0.05);                                         // tema limpio
frase(Q + 0.3, [69, 72, 76, 77, 76], [B / 2, B / 2, B, B / 2, 1.5 * B], 0.045, 0.2);    // respuesta: aparece la 2.ª menor (77)
frase(PD + 0.2, [65, 69, 72, 73, 72], [B, B / 2, B / 2, B, B], 0.04, 0.4);             // secuencia abajo, más "sucia"
frase(L + 0.4, [64, 65, 64, 65, 67, 68], [B / 2, B / 2, B / 2, B / 2, B, 2 * B], 0.04, 0.5); // trino que se atasca (la placa se cubre)
m.sube(P + 0.05, 1.3, 57, 70, 0.05);                                                  // re-gancho: pregunta que sube
frase(E + 0.3, [64, 68, 71, 68], [B, B, B, B], 0.04, 0.3);                            // dominante: algo viene de fuera
frase(Er + 0.5, [65, 69, 72, 74, 72], [B, B, B / 2, B / 2, 2 * B], 0.04, 0.2);          // pasteurizar: se aclara un poco
frase(Er + 3.6, [74, 75, 74, 75], [B / 2, B / 2, B / 2, 1.5 * B], 0.04, 0.6);          // salvado: tensión
frase(V + 0.5, [77, 76, 74, 73], [B, B, B, 2 * B], 0.035, 0.5);                       // vacío: línea que baja, hueca
frase(Es + 0.4, [62, 65, 69, 70, 69], [B, B, B, B / 2, 1.5 * B], 0.04, 0.35);           // la historia: tema en re menor
frase(Es + 4.4, [62, 63, 62, 60, 58], [B / 2, B / 2, B, B, 2 * B], 0.04, 0.5);          // las pérdidas: cae
frase(Gr + 2.4, [64, 65, 64], [B / 2, B / 2, 2 * B], 0.045, 0.7);                       // 68–100 %: golpe tapado
frase(Ch + 0.3, [67, 71, 74, 72, 71, 67], [B / 2, B / 2, B / 2, B / 2, B, B], 0.04, 0.1); // lo chistoso: pizzicato juguetón en sol
frase(Ch + 4.0, [72, 74, 76, 79], [B / 2, B / 2, B / 2, 1.5 * B], 0.04, 0);            // enzimas: sube, se limpia
frase(Ci + 0.3, [69, 73, 76, 74, 73, 69], [B, B, B, B / 2, B / 2, 2 * B], 0.05, 0);       // cierre: el tema en LA MAYOR
m.nota(Ou + 0.3, 57, 0.07, 3.0); m.nota(Ou + 0.3, 64, 0.05, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0); m.nota(Ou + 0.35, 73, 0.04, 3.0);

// --- efectos, en el mismo cuadro que lo que pasa en pantalla
for (let i = 0; i < 9; i++) m.burbuja(G + 0.15 + i * 0.22, 0.05, 260 + i * 25);       // la pelusa crece (suave, algodonosa)
m.cruje(G + 2.2, 0.25);                                                                // se tacha «¿tu hongo?»
for (let i = 0; i < 8; i++) m.tic(G + 2.6 + i * 0.25, 0.08, 3200 + (i % 3) * 400);    // empiezan las esporas verdes
m.tic(Q + 0.2, 0.15, 1400); m.tic(Q + 1.3, 0.15, 1600);                               // chips 1 y 2
m.whoosh(Q + 1.6, 0.6, 0.1);                                                           // entra la lupa
for (let i = 0; i < 6; i++) m.tic(Q + 2.0 + i * 0.18, 0.07, 3800);                     // conidios que brotan
m.whoosh(PD - 0.3, 0.8, 0.12);                                                         // bajamos al microscopio
for (let i = 0; i < 5; i++) m.sube(PD + 0.2 + i * 0.15, 1.6, 60 + i, 64 + i, 0.012);   // hifas que se amontonan (glissando suave)
for (let i = 0; i < 12; i++) m.tic(PD + 0.9 + i * 0.2, 0.06, 900);                     // la comida desaparece
for (let d = 0; d < 5; d++) m.tic(L + 0.4 + d * 0.64, 0.2, 2000);                      // contador de días
m.golpe(P, 0.3, 70);                                                                   // re-gancho
for (let i = 0; i < 8; i++) m.tic(E + 0.2 + i * 0.23, 0.06, 700 + (i % 2) * 300);      // pasos de la bota
m.metal(E + 1.2, 0.08, 1500);                                                          // cuchillo
for (let i = 0; i < 4; i++) m.gota(E + 2.3 + i * 1.0 + 0.9, 0.18, 800);                // gotas de agua
m.tic(E + 2.0, 0.1, 2600); m.tic(E + 3.4, 0.1, 2600);                                  // aparecen manchas en bolsas
for (let i = 0; i < 14; i++) m.burbuja(Er + 0.6 + i * 0.16, 0.05, 300 + (i % 4) * 60); // hierve el agua
m.sube(Er + 0.4, 1.6, 55, 67, 0.02);                                                   // sube el termómetro
m.whoosh(Er + 2.8, 0.5, 0.08); for (let i = 0; i < 10; i++) m.tic(Er + 3.4 + i * 0.06, 0.06, 1200); // cae el salvado
m.zumbido(Er + 3.8, 1.2, 0.04, 220);                                                   // medidor de riesgo
m.zumbido(V + 0.1, 1.1, 0.05, 520);                                                    // la olla de presión silba
m.gota(V + 2.5, 0.2, 600); m.cruje(V + 2.6, 0.2);                                      // entra el moho al frasco y se extiende
m.golpe(Es + 0.3, 0.25, 90); m.whoosh(Es + 1.4, 1.2, 0.08); m.golpe(Es + 2.6, 0.25, 90); // Irlanda → Norteamérica
m.golpe(Es + 3.4, 0.35, 80);                                                           // tarjeta 1994–96
m.metal(Gr + 0.2, 0.08, 600);                                                          // composta a la báscula
m.gota(Gr + 1.25, 0.15, 1400);                                                         // cae el gramo infectado
m.sube(Gr + 1.5, 0.7, 50, 57, 0.03); m.sube(Gr + 2.4, 1.0, 57, 47, 0.04);              // suben y caen las barras
m.golpe(Gr + 2.5, 0.4, 60); m.golpe(Gr + 4.8, 0.3, 80); m.tic(Gr + 3.0, 0.12, 1500);   // número, tarjeta 2020, chip
for (let i = 0; i < 10; i++) m.tic(Ch + 0.6 + i * 0.24, 0.06, 500 + (i % 3) * 150);    // la tienda se mancha
m.whoosh(Ch + 2.6, 0.7, 0.07);                                               // la lona se rasga
m.whoosh(Ch + 3.4, 0.6, 0.08); for (let i = 0; i < 6; i++) m.burbuja(Ch + 3.8 + i * 0.25, 0.06, 450); // tanque
for (let i = 0; i < 6; i++) m.metal(Ch + 4.4 + i * 0.17, 0.05, 2400);                 // tijeritas cortan celulosa
for (let i = 0; i < 6; i++) m.gota(Ci + 0.4 + i * 0.3, 0.12, 1200 + i * 120);                           // brotan las setas
m.cruje(Ci + 1.3, 0.15);                                                               // la bolsa verde, descartada
m.guardar(OUT, 1);
