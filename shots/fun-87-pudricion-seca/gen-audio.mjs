// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #87 (la pudrición seca, Serpula lacrymans). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// La música cuenta el estado: tapada, grave y húmeda mientras el hongo avanza (la menor), tensión que sube con los cordones y las esporas,
// un respiro de viaje en el origen y los barcos, y se abre (do mayor, sin tapa) cuando entra "lo que sí sirve" y la madera se seca.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pudricion Seca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 87);
const K = m.K;
const G = K.Gancho, H = K.Humedad, Cu = K.Cubos, Co = K.Cordones, Go = K.Gotas, F = K.Fruto, P = K.Pregunta, Es = K.Estudio, B = K.Barcos, Te = K.Templado, S = K.Sirve, C = K.Cierre, Ou = K.Outro;

// --- cama armónica: progresión con función, cambia cada 2–4 s (nunca el mismo acorde más de un tramo) ---
const camas = [
  [G, H, [45, 52, 57], 0.55],        // Am (tapado, húmedo)
  [H, Cu, [41, 48, 57], 0.55],       // F
  [Cu, Cu + 2.7, [43, 50, 55], 0.4], // G (al microscopio, un poco más claro)
  [Cu + 2.7, Co, [40, 47, 55], 0.45],// Em (se parte en cubos)
  [Co, Co + 3.2, [45, 52, 57], 0.5], // Am
  [Co + 3.2, Go, [41, 48, 53], 0.45],// F (sube la tensión con los cordones)
  [Go, F, [38, 45, 53], 0.4],        // Dm (las gotas: tristeza, "que llora")
  [F, P, [40, 47, 56], 0.5],         // E (dominante: el polvo de esporas, tensión)
  [P, Es, [45, 52, 57], 0.6],        // Am (la pregunta, ahogada)
  [Es, Es + 4.0, [41, 48, 57], 0.3], // F (viaje: más abierto)
  [Es + 4.0, B, [43, 50, 59], 0.25], // G (el Himalaya)
  [B, Te, [48, 55, 60], 0.2],        // C (barcos)
  [Te, S, [40, 47, 55], 0.3],        // Em
  [S, S + 2.4, [41, 48, 57], 0.1],   // F (se arregla: se destapa)
  [S + 2.4, C, [43, 50, 59], 0],     // G (dominante que resuelve)
  [C, Ou + 3.5, [48, 55, 64], 0],    // C mayor: seca, libre
];
camas.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.15, 0.05, notas, tapa));

// --- tema compuesto (motivo → respuesta → secuencia → cadencia), en registro medio, debajo de la voz ---
// motivo "que llora": 3 notas que bajan (E–D–C) y una que sube; cada aparición cambia de final o de altura.
const frase = (t0, notas, paso = 0.42, g = 0.035, tapa = 0) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n, g * (i === notas.length - 1 ? 1.2 : 1), paso * 2.2, tapa));
frase(G + 0.6, [64, 62, 60, 64], 0.45, 0.03, 0.6);            // motivo (tapado)
frase(H + 0.5, [64, 62, 60, 57], 0.45, 0.03, 0.6);            // respuesta (cae a la raíz)
frase(Cu + 0.4, [67, 65, 64, 67], 0.4, 0.028, 0.35);          // secuencia arriba (microscopio)
frase(Cu + 3.0, [64, 62, 59, 0, 64], 0.36, 0.03, 0.4);        // cadencia rota (se agrieta)
frase(Co + 0.8, [57, 60, 62, 64, 65], 0.5, 0.028, 0.5);       // sube como los cordones
frase(Co + 3.8, [64, 65, 67, 69], 0.42, 0.03, 0.45);          // y sigue subiendo
frase(Go + 0.3, [74, 72, 69, 0, 72, 69, 65], 0.32, 0.026, 0.3); // las gotas: el motivo arriba, como lágrimas
frase(F + 0.6, [64, 63, 64, 68], 0.5, 0.03, 0.45);            // dominante con sol# (tensión)
frase(Es + 0.4, [60, 64, 67, 72], 0.5, 0.03, 0.2);            // viaje: arpegio abierto
frase(Es + 4.4, [67, 69, 71, 74, 71], 0.45, 0.028, 0.15);     // Himalaya: la quinta arriba
frase(B + 0.3, [72, 67, 69, 64], 0.55, 0.03, 0.1);            // barcos: balanceo
frase(Te + 0.5, [64, 62, 59, 64], 0.5, 0.028, 0.25);          // templado
frase(S + 0.8, [60, 62, 64, 65, 67], 0.42, 0.034, 0);         // se arregla: escala que sube
frase(C + 0.4, [64, 62, 60, 67, 72], 0.45, 0.036, 0);         // el motivo regresa resuelto en do mayor
// bajo que camina en los cambios de acorde (respira, no golpea)
camas.forEach(([a, , notas], i) => i % 2 === 0 && m.bajo(a + 0.05, notas[0], 0.05, 0.9));

// --- efectos en el mismo cuadro de cada evento visual ---
for (let t = 0.5; t < S; t += 2.3) m.gota(t, 0.04, 950);                  // goteo lento de fondo mientras hay humedad
m.whoosh(G + 0.1, 0.4, 0.08); m.golpe(G + 0.55, 0.4, 70); m.cruje(G + 0.6, 0.55); // la bota pisa y la duela podrida cruje y se hunde
m.cruje(G + 1.5, 0.3);                                                    // ¿vieja? tachado
m.golpe(G + 2.3, 0.45, 75);                                               // sello HONGO
m.gota(G + 1.4, 0.12, 1300); m.gota(G + 2.0, 0.1, 1500);                  // gotitas en el micelio
for (let i = 0; i < 9; i++) m.gota(H + i * 0.42, 0.14, 800);              // la fuga gotea sobre la viga
for (let i = 0; i < 6; i++) m.tic(H + 1.6 + i * 0.22, 0.08, 1500 + i * 120); // el medidor sube
m.metal(H + 3.0, 0.08, 1500);                                             // "MUY HÚMEDA"
m.sube(Cu, 1.0, 50, 62, 0.035);                                           // al microscopio
for (let i = 0; i < 14; i++) m.whoosh(Cu + 0.2 + i * 0.18, 0.16, 0.025);  // las hifas avanzan (roce)
for (let i = 0; i < 12; i++) m.tic(Cu + 3.5 + i * 0.12, 0.12, 900 + (i % 4) * 200); // grietas en cubo
m.cruje(Cu + 3.6, 0.35);
for (let i = 0; i < 4; i++) m.whoosh(Co + 0.3 + i * 1.0, 0.9, 0.04);      // los cordones trepan
m.metal(Co + 1.6, 0.06, 1200);                                            // cinta métrica
for (let i = 0; i < 8; i++) m.burbuja(Co + 3.0 + i * 0.3, 0.05, 420 + i * 25); // flujo de agua y nutrientes
[0.4, 0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5].forEach((t0, i) => m.nota(Go + t0 + 0.2, [86, 84, 81, 79, 84, 81, 76, 79][i], 0.025, 0.5)); // cada gota brilla
m.gota(Go + 2.1, 0.16, 700); m.gota(Go + 2.8, 0.16, 650); m.gota(Go + 3.5, 0.14, 700); // las que escurren
m.nota(F + 0.3, 45, 0.05, 1.6, 0.5);                                      // crece el cuerpo fructífero
m.whoosh(F + 2.4, 2.4, 0.07); m.whoosh(F + 3.4, 1.8, 0.05);               // nube de esporas
for (let i = 0; i < 10; i++) m.tic(F + 3.0 + i * 0.16, 0.04, 3000);       // el polvo se asienta
m.golpe(P, 0.5, 55); m.sube(P + 0.1, 1.4, 52, 45, 0.04);                  // ¿de dónde salió?
m.golpe(Es + 0.2, 0.35, 80);                                              // tarjeta del estudio
m.sube(Es + 2.6, 0.7, 60, 72, 0.03);                                      // la flecha del ADN viaja
m.metal(Es + 3.6, 0.07, 1100);                                            // el pin en el Himalaya
m.whoosh(Es + 4.6, 0.9, 0.06);                                            // viento de montaña
for (let i = 0; i < 4; i++) m.whoosh(B + i * 0.9, 0.9, 0.05);             // oleaje
m.cruje(B + 0.8, 0.15); m.cruje(B + 2.4, 0.12);                           // cruje la madera del barco
m.golpe(Te + 2.0, 0.3, 90); m.cruje(Te + 2.05, 0.2);                      // ✗ en el trópico
m.metal(S + 0.3, 0.12, 700);                                              // la abrazadera cierra la fuga
m.motor(S + 1.0, 1.4, 0.04);                                              // aire por la rejilla
for (let i = 0; i < 8; i++) m.whoosh(S + 1.6 + i * 0.11, 0.1, 0.06);      // el serrucho
m.golpe(S + 2.5, 0.3, 95);                                                // entra la viga nueva
m.sube(S + 3.2, 1.2, 64, 57, 0.03);                                       // la humedad baja
m.golpe(C + 0.55, 0.3, 90);                                               // la bota pisa firme
m.nota(C + 0.9, 72, 0.05, 1.0); m.golpe(C + 0.9, 0.3, 100);               // sello SECA
m.nota(Ou + 0.3, 48, 0.06, 3.0); m.nota(Ou + 0.3, 55, 0.05, 3.0); m.nota(Ou + 0.3, 64, 0.05, 3.0); m.nota(Ou + 0.3, 72, 0.04, 3.0); // acorde final que se queda
m.guardar(OUT, 1);
