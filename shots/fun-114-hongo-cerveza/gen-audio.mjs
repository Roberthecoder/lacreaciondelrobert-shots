// gen-audio.mjs — cama + efectos del Shot Fungi Mati #114 (Coprinopsis atramentaria y la coprina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama grave continua en re menor que cambia de acorde cada ~2.2 s
// (i–VI–III–VII y variantes, nunca el mismo giro más de 4 veces), un motivo de 4 notas que pregunta, responde, se
// transpone y cadencia; "latido" grave que se acelera en los síntomas y se calma al final; el motivo regresa en mayor
// (re mayor) en el cierre. Todo bajo la voz (la voz manda).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Coprina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 114);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Ti = K.Tinta, Co = K.Comestible, Cp = K.Coprina, E = K.Enzima, P = K.Pregunta, A = K.Alcohol,
  S = K.Sintomas, V = K.Ventana, Es = K.Estudio, D = K.Dato, C = K.Cierre, Ou = K.Outro;
const LOCK = A + 4.0, FIN = Ou + 3.5;

// ---- armonía: acordes (MIDI) por tramo; cada tramo ~2.2 s, con variaciones para no repetir el giro ----
const Dm = [38, 45, 50, 53], Bb = [34, 46, 50, 53], F = [41, 48, 53, 57], C7 = [36, 48, 52, 55], Gm = [43, 46, 50, 55], A7 = [33, 45, 49, 52], DM = [38, 45, 50, 54], G7 = [43, 47, 50, 55];
const prog = [Dm, Bb, F, C7, Dm, Gm, A7, Dm, Bb, F, Gm, A7, Dm, Bb, C7, A7, Dm, Gm, Bb, A7, Dm, F, Gm, A7, DM, G7, DM, DM];
const PASO = (C - G) / (prog.length - 4);
for (let i = 0; i < prog.length; i++) {
  const t0 = G + i * PASO, t1 = i === prog.length - 1 ? FIN : t0 + PASO + 0.25;
  const tapa = t0 >= LOCK && t0 < V ? 0.35 : 0.1;                                  // más ahogada mientras se acumula el acetaldehído
  if (t0 < FIN) m.pad(t0, Math.min(t1, FIN), 0.045, prog[i], tapa);
}

// ---- motivo (re menor): pregunta (62 65 64 60) · respuesta (62 65 67 69) · secuencia una cuarta abajo · cadencia ----
const frase = (t, notas, g = 0.035, d = 0.55, paso = 0.42) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, d + (i === notas.length - 1 ? 0.9 : 0), 0.3));
frase(G + 0.6, [62, 65, 64, 60]);
frase(N + 0.4, [62, 65, 67, 69]);
frase(Co + 0.3, [57, 60, 59, 55]);
frase(E + 0.5, [58, 57, 55, 57], 0.03);
frase(V + 0.3, [62, 65, 64, 61], 0.03);                                            // la sensible (61) deja la pregunta abierta
frase(Es + 3.6, [57, 60, 62, 64], 0.03, 0.5, 0.5);
frase(D + 0.5, [65, 64, 62, 61], 0.03, 0.6, 0.55);
frase(C + 1.2, [62, 66, 64, 69], 0.035, 0.6, 0.45);                                // el tema regresa en mayor
m.nota(Ou + 0.3, 50, 0.07, 3.0); m.nota(Ou + 0.3, 57, 0.05, 3.0); m.nota(Ou + 0.3, 62, 0.05, 3.0); m.nota(Ou + 0.35, 66, 0.04, 2.8);

// ---- latido: tranquilo → se acelera con los síntomas → se calma ----
for (let t = A + 0.5; t < S; t += 0.95) m.latido(t, 0.09);
for (let t = S, k = 0; t < V; k++) { const per = Math.max(0.36, 0.9 - k * 0.07); m.latido(t, 0.13); m.latido(t + 0.16, 0.07); t += per; }
for (let t = V; t < Es; t += 0.8) m.latido(t, 0.07);

// ---- efectos en el mismo cuadro ----
m.whoosh(G + 0.1, 0.6, 0.12); m.tic(G + 0.8, 0.25, 700);                           // el tarro se desliza y se asienta
for (let i = 0; i < 10; i++) m.burbuja(G + 0.9 + i * 0.28, 0.05, 700 + (i % 4) * 120); // burbujas de la cerveza
m.cruje(G + 1.6, 0.18); m.cruje(G + 1.9, 0.18);                                    // tachan «comestible» y «venenoso»
m.nota(G + 2.3, 69, 0.05, 0.8);                                                    // «depende»
for (let i = 0; i < 5; i++) m.sube(N + 0.1 + i * 0.14, 0.8, 45 + i, 52 + i, 0.025);  // brota el racimo
for (let i = 0; i < 7; i++) m.gota(Ti + 0.5 + i * 0.36, 0.16, 620 - (i % 3) * 60);   // gotas de tinta
m.whoosh(Ti + 0.6, 0.6, 0.08);                                                     // se abre la lupa
m.whoosh(Co + 1.0, 0.6, 0.08); for (let i = 0; i < 4; i++) m.tic(Co + 1.5 + i * 0.1, 0.06, 2600); // aparece la coprina
m.tic(Cp + 0.5, 0.3, 1500); m.metal(Cp + 0.55, 0.1, 900); m.whoosh(Cp + 0.6, 0.9, 0.06); // la molécula se parte
m.whoosh(E + 0.6, 1.6, 0.07); m.metal(E + 2.3, 0.22, 520); m.golpe(E + 2.35, 0.25, 70); // entra al sitio activo · candado
m.sube(P + 0.1, 1.4, 55, 64, 0.04);                                                // ¿y el alcohol?
for (let i = 0; i < 18; i++) m.burbuja(A + 0.3 + i * 0.2, 0.04, 500 + (i % 5) * 80);  // la línea de montaje
m.metal(LOCK - 0.2, 0.22, 520); m.golpe(LOCK - 0.15, 0.28, 65);                    // se cierra el candado
for (let i = 0; i < 12; i++) m.tic(LOCK + 0.2 + i * 0.15, 0.05, 1300 + i * 40);    // el medidor sube
for (let i = 0; i < 12; i++) m.tic(S + 0.3 + i * 0.25, 0.05, 3000);                // cronómetro
m.sube(S + 0.6, 1.6, 50, 57, 0.03);                                                // rubor
m.sube(S + 2.4, 0.9, 60, 55, 0.03); m.sube(S + 2.9, 0.9, 59, 54, 0.03);              // náusea (remolino)
m.tic(S + 3.6, 0.2, 900); m.tic(S + 3.7, 0.12, 1100);                              // caja de pastillas
for (let d = 1; d <= 3; d++) m.metal(V + 0.5 + d * 0.45, 0.1, 1400 + d * 120);     // cada día del calendario
m.golpe(Es + 0.2, 0.3, 80);                                                        // tarjeta del estudio
m.sube(Es + 2.6, 0.9, 47, 55, 0.03);                                               // brota la Lepiota
for (let i = 0; i < 3; i++) m.metal(Es + 4.0 + i * 0.7, 0.09, 1200 + i * 150);     // 0 h · 24 h · 48 h
m.tic(D + 0.4, 0.15, 1000);                                                        // pregunta de la medicina
m.whoosh(D + 2.4, 0.8, 0.08); for (let i = 0; i < 6; i++) m.tic(D + 2.5 + i * 0.12, 0.04, 4200); // llega la rata
m.golpe(D + 3.6, 0.4, 60); m.cruje(D + 3.62, 0.25);                                // sello DESCARTADA
for (let i = 0; i < 8; i++) m.burbuja(C + 0.2 + i * 0.3, 0.05, 700 + (i % 4) * 120); // el mismo burbujeo del inicio
m.metal(C + 1.0, 0.14, 620); m.cruje(C + 1.05, 0.15);                              // ✗ sobre el tarro
for (let i = 0; i < 4; i++) m.gota(C + 2.0 + i * 0.9, 0.12, 600);
m.tic(C + 3.6, 0.15, 900); m.tic(C + 4.6, 0.15, 900);
m.guardar(OUT, 1);
