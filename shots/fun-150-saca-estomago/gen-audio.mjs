// gen-audio.mjs — música y efectos del Shot Fungi Mati #150 (digestión externa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama de laboratorio curiosa a 100 BPM, armonía con función
// (i–VI–III–VII en la menor, luego se abre a mayor en el estudio y regresa), conducción de voces cercana, y un motivo
// propio de 4 notas que se contesta, se transpone y cierra en cadencia; cambia de textura en cada parte. Siempre bajo la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estomago base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 150);
const K = m.K;
const G = K.Gancho, S = K.SinEstomago, H = K.Hifa, E = K.Enzimas, Ti = K.Tijeras, A = K.Absorbe, P = K.Pregunta, Es = K.Estudio, O = K.Oro, Pu = K.Punta, Sa = K.Saliva, C = K.Cierre, Ou = K.Outro;
const BAR = 2.4; // 100 BPM, 4/4

// ---------- armonía: un acorde por compás, voces cercanas (MIDI) ----------
const AC = {
  Am: [45, 52, 57, 60], F: [41, 53, 57, 60], C: [48, 52, 55, 60], G: [43, 50, 55, 59], Dm: [50, 53, 57, 62], E: [40, 52, 56, 59],
  Fmaj7: [41, 52, 57, 60], Cmaj: [48, 55, 60, 64], Gsus: [43, 50, 55, 60], Am9: [45, 55, 59, 60],
};
// progresión por partes (cada parte su color): misterio → mecanismo → pregunta → estudio (se abre) → regreso
const PARTES = [
  [G, H, ['Am', 'F', 'C', 'G'], 0.05, 0.25],         // gancho y "sin estómago": tapada, curiosa
  [H, Ti, ['Am', 'Dm', 'F', 'E'], 0.05, 0.1],        // la hifa entra: menor con dominante
  [Ti, P, ['F', 'G', 'Am', 'C', 'Dm', 'E'], 0.055, 0], // las tijeras: más movimiento
  [P, Es, ['Dm', 'E'], 0.05, 0.35],                  // re-gancho: suspenso
  [Es, Pu, ['C', 'G', 'Am', 'Fmaj7'], 0.055, 0],     // el estudio: se abre a mayor
  [Pu, C, ['F', 'Gsus', 'C', 'Am'], 0.055, 0],       // el oro en las puntas y la saliva
  [C, Ou + 3.5, ['F', 'G', 'Am9'], 0.05, 0],         // regreso al inicio, cadencia abierta
];
for (const [t0, t1, prog, g, tapa] of PARTES) {
  for (let t = t0, k = 0; t < t1 - 0.05; t += BAR, k++) {
    const ac = AC[prog[k % prog.length]], fin = Math.min(t + BAR + 0.15, t1);
    m.pad(t, fin, g, ac.slice(0, 3), tapa);
    m.bajo(t, ac[0] - 12, 0.05, 1.6);               // raíz grave suave, sin golpe marcado
    if (k % 2 === 1) m.bajo(t + BAR * 0.5, ac[0] - 12 + 7, 0.03, 1.0); // quinta de paso cada 2 compases
  }
}

// ---------- melodía: motivo propio (4 notas) → respuesta → secuencia → cadencia; respira entre frases ----------
const B = BAR / 4;  // negra
const frase = (t0, notas, g = 0.028, tapa = 0) => notas.forEach(([b, mm, d]) => m.nota(t0 + b * B, mm, g, d * B * 1.4, tapa));
const MOTIVO = [[0, 76, 1], [1, 72, 0.5], [1.5, 74, 0.5], [2, 69, 2]];          // mi–do–re–la (cae a la raíz)
const RESPUESTA = [[0, 72, 1], [1, 74, 0.5], [1.5, 76, 0.5], [2, 79, 2]];       // sube: pregunta
const SECUENCIA = [[0, 77, 1], [1, 74, 0.5], [1.5, 76, 0.5], [2, 72, 2]];       // el motivo un tono arriba
const CADENCIA = [[0, 74, 1], [1, 71, 1], [2, 69, 2]];                           // re–si–la
frase(G + 0.2, MOTIVO, 0.026, 0.3); frase(G + BAR + 0.2, RESPUESTA, 0.024, 0.3);
frase(H + BAR, MOTIVO.map(([b, mm, d]) => [b, mm - 12, d]), 0.03);               // en la hifa: una octava abajo, como pizzicato
frase(H + BAR * 2, SECUENCIA.map(([b, mm, d]) => [b, mm - 12, d]), 0.028);
frase(Ti + BAR * 0.5, SECUENCIA, 0.022); frase(A + BAR * 0.5, CADENCIA, 0.024);
frase(P + 0.2, [[0, 74, 1], [1, 76, 1], [2, 77, 2]], 0.026, 0.2);               // pregunta que queda abierta
frase(Es + 0.4, MOTIVO.map(([b, mm, d]) => [b, mm + 4, d]), 0.026);              // el tema regresa en mayor (do)
frase(Es + BAR + 0.4, RESPUESTA.map(([b, mm, d]) => [b, mm + 4, d]), 0.024);
frase(Pu + 0.6, [[0, 84, 0.5], [0.5, 88, 0.5], [1, 91, 1], [2, 88, 2]], 0.02);  // brillo del oro
frase(Sa + 0.6, RESPUESTA.map(([b, mm, d]) => [b, mm - 3, d]), 0.024);
frase(C + 0.4, MOTIVO, 0.026); frase(C + BAR + 0.4, CADENCIA, 0.026);           // el motivo del inicio, ahora resuelve

// ---------- efectos en el mismo cuadro ----------
m.whoosh(G + 0.1, 1.4, 0.08); for (let i = 0; i < 8; i++) m.burbuja(G + 0.2 + i * 0.18, 0.05, 380 + i * 30); // la pelusa crece y la tortilla se ablanda
m.cruje(G + 1.4, 0.25); m.tic(G + 1.8, 0.2, 1500);                              // tachón «se la come» y chip
m.gota(S + 0.3, 0.12, 700); m.gota(S + 1.3, 0.1, 600);                          // la comida baja a tu estómago
m.whoosh(S + 1.4, 1.0, 0.07);                                                   // aparece el "estómago afuera"
m.whoosh(H - 0.3, 0.8, 0.1); m.sube(H + 0.2, 2.5, 40, 47, 0.03);                // entramos al microscopio; la hifa avanza
for (let i = 0; i < 12; i++) m.burbuja(E + 0.2 + i * 0.35, 0.05, 600 + (i % 4) * 90); // vesículas que salen por la punta
[[Ti + 0.85, 2600], [Ti + 1.95, 2000], [Ti + 3.05, 1500]].forEach(([t, f]) => { m.tic(t, 0.35, f); m.tic(t + 0.08, 0.25, f * 1.2); }); // tres cortes, tres timbres
for (let i = 0; i < 11; i++) m.gota(A + 2.2 + i * 0.28, 0.06, 500 + i * 25);    // las piezas entran a la hifa
m.sube(P + 0.1, 1.5, 50, 62, 0.04);                                              // re-gancho
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 3.0, 0.08, 1200);                      // tarjeta 1991; cae la membrana de arriba
for (let i = 0; i < 3; i++) m.metal(O + 0.6 + i * 0.25, 0.06, 1500 + i * 200);   // anticuerpos con oro
m.tic(O + 1.6, 0.3, 2300);                                                      // la glucoamilasa corta una glucosa
for (let i = 0; i < 12; i++) m.nota(Pu + 0.8 + i * 0.08, 84 + (i % 4) * 3, 0.015, 0.3); // destellos de oro en las puntas
m.golpe(Sa + 0.5, 0.25, 120); m.cruje(Sa + 0.5, 0.15);                          // mordida al taco
for (let i = 0; i < 6; i++) m.gota(Sa + 1.0 + i * 0.2, 0.07, 900);              // saliva
m.tic(Sa + 2.4, 0.3, 2600);                                                     // la amilasa corta
m.whoosh(C + 1.0, 0.8, 0.06); m.whoosh(C + 2.2, 0.6, 0.06);                     // círculo y lupa
m.nota(Ou + 0.3, 57, 0.06, 3.0); m.nota(Ou + 0.3, 64, 0.05, 3.0); m.nota(Ou + 0.3, 71, 0.04, 3.0); m.nota(Ou + 0.3, 72, 0.035, 3.0);
m.guardar(OUT, 1);
