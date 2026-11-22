// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #86 (la levadura negra del lavavajillas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: progresión que cambia cada ~2.4 s (nunca el mismo acorde más de 2 compases), motivo que varía por sección,
// tapada y tensa mientras se suma lo extremo del lavado, se abre con el estudio, juguetona en la selva y tranquila al cerrar.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lavavajillas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 86);
const K = m.K;
const G = K.Gancho, Em = K.Empaque, Mi = K.Microscopio, Me = K.Melanina, Ci = K.Ciclo, P = K.Pregunta, Es = K.Estudio, Re = K.Resultado,
  Ri = K.Riesgo, La = K.Lavadora, Or = K.Origen, C = K.Cierre, Ou = K.Outro;

// ---- cama: acordes (la menor) con su "tapa" según el estado de la historia ----
const AC = { Am: [45, 52, 57], F: [41, 48, 53], C: [48, 55, 60], G: [43, 50, 55], Dm: [38, 45, 50], E: [40, 47, 52], Am7: [45, 52, 55, 60], Fmaj: [41, 48, 52, 57], Esus: [40, 47, 52, 57] };
const secc = [
  [G, Em, ['Am', 'F', 'C'], 0.25],          // gancho: curiosidad
  [Em, Mi, ['Am7', 'Dm'], 0.35],            // el hule: misterio
  [Mi, Me, ['Am', 'G', 'F'], 0.45],         // al microscopio: oscuro
  [Me, Ci, ['Dm', 'E'], 0.55],              // la pared: tensión
  [Ci, P, ['Dm', 'Esus', 'E'], 0.75],       // lo extremo del lavado: lo más tapado
  [P, Es, ['E'], 0.6],                      // la pregunta: suspenso
  [Es, Re, ['C', 'G', 'Am'], 0.15],         // el estudio: se abre
  [Re, Ri, ['F', 'C', 'G'], 0.1],
  [Ri, La, ['Am', 'Fmaj', 'Dm'], 0.3],      // riesgo: serio pero tranquilo
  [La, Or, ['C', 'Am7', 'G'], 0.15],
  [Or, C, ['F', 'G', 'C'], 0.05],           // la selva: luminoso
  [C, Ou + 3.5, ['Am7', 'Fmaj', 'C'], 0.2],  // cierre: tranquilo
];
for (const [a, b, acordes, tapa] of secc) {
  const paso = (b - a) / acordes.length;
  acordes.forEach((ac, i) => m.pad(a + i * paso - 0.15, a + (i + 1) * paso + 0.25, 0.05, AC[ac], tapa));
}
// bajo suave que marca cada cambio de acorde (sin golpe marcado: ataque lento)
for (const [a, b, acordes] of secc) { const paso = (b - a) / acordes.length; acordes.forEach((ac, i) => m.bajo(a + i * paso, AC[ac][0] - 12, 0.05, Math.min(2.2, paso))); }

// ---- motivo: 4 notas que cambian de forma en cada sección (respuesta, secuencia, cadencia) ----
const motivo = [[69, 72, 76, 74], [72, 69, 67, 69], [64, 67, 69, 72], [76, 74, 72, 69]];
const frases = [[G + 0.5, 0, 0], [Em + 1.0, 1, -12], [Mi + 3.4, 2, -12], [Es + 2.6, 0, 0], [Re + 2.9, 3, 0], [La + 1.6, 2, 0], [Or + 3.8, 0, 12], [C + 3.4, 1, 0]];
for (const [t0, k, tr] of frases) motivo[k].forEach((n, i) => m.nota(t0 + i * 0.32, n + tr, 0.028, 0.9));

// ---- efectos en el mismo cuadro de cada evento ----
// gancho: la puerta, el vapor, el termómetro, el detergente, la sal y el acercamiento al hule
for (const t of [G, C]) {
  m.golpe(t + 0.15, 0.3, 120); m.metal(t + 0.16, 0.06, 1300);                    // clac de la puerta
  m.whoosh(t + 0.3, 1.4, 0.12);                                                  // vapor
  m.sube(t + 0.5, 1.0, 55, 67, 0.035);                                           // el termómetro sube a 80
}
for (let i = 0; i < 7; i++) m.gota(G + 1.7 + i * 0.12 + 0.6, 0.1, 700 + i * 30);  // gotas de detergente al caer
for (let i = 0; i < 8; i++) m.tic(G + 2.6 + i * 0.12 + 0.55, 0.1, 2600 + i * 90); // cubitos de sal
m.whoosh(G + 3.5, 1.3, 0.09);                                                   // la cámara baja al hule
m.golpe(G + 4.8, 0.25, 70); m.nota(G + 4.8, 57, 0.05, 1.2);                       // ¡ahí vive un hongo!
// el hule de cerca y la lupa
for (let i = 0; i < 4; i++) m.gota(Em + 0.4 + i * 0.9, 0.06, 1000 + i * 60);     // gotas en el canal
m.tic(Em + 0.8, 0.08, 1500); m.tic(Em + 1.2, 0.08, 1700);                       // etiquetas
m.sube(Em + 3.0, 1.4, 50, 64, 0.04); m.whoosh(Em + 3.0, 1.4, 0.07);             // la lupa se abre
// al microscopio: cada célula que brota hace "blup"; la hifa cruje al crecer
for (let k = 0; k < 7; k++) m.burbuja(Mi + 0.1 + k * 0.3, 0.07, 420 + k * 25);
for (let k = 0; k < 6; k++) m.burbuja(Mi + 0.3 + k * 0.3, 0.06, 520 + k * 25);
for (let k = 0; k < 4; k++) m.burbuja(Mi + 1.3 + k * 0.3, 0.06, 640 + k * 30);
for (let k = 0; k < 4; k++) { m.tic(Mi + 2.4 + k * 0.25, 0.08, 900 + k * 80); m.nota(Mi + 2.45 + k * 0.25, m.ESC[k + 2] - 12, 0.025, 0.4); }
m.golpe(Mi + 3.3, 0.18, 110);                                                   // la caja con la colonia
// la pared con melanina: UV, oxidación y sequedad rebotan
m.zumbido(Me + 0.6, 0.7, 0.05, 520); m.metal(Me + 1.3, 0.1, 1500);
for (let i = 0; i < 3; i++) m.burbuja(Me + 1.2 + i * 0.12, 0.06, 800); m.metal(Me + 1.9, 0.09, 1250);
m.whoosh(Me + 1.8, 0.7, 0.08); m.metal(Me + 2.5, 0.09, 1100);
m.golpe(Me + 2.3, 0.15, 95);                                                    // escudo
// cada lavado es extremo: el motor, los chorros, el detergente, la sal y la tira de pH
m.motor(Ci, P - Ci + 0.2, 0.06);
for (let i = 0; i < 12; i++) m.gota(Ci + 0.2 + i * 0.38, 0.05, 600 + (i % 4) * 120);
m.sube(Ci + 0.3, 0.8, 57, 64, 0.03);
for (let i = 0; i < 7; i++) m.gota(Ci + 1.2 + i * 0.12 + 0.5, 0.08, 750);
for (let i = 0; i < 8; i++) m.tic(Ci + 2.2 + i * 0.12 + 0.55, 0.08, 2700);
m.sube(Ci + 3.3, 0.7, 60, 72, 0.035);                                           // la tira se pone azul
// la pregunta
m.golpe(P, 0.35, 60); for (let i = 0; i < 8; i++) m.tic(P + 0.1 + i * 0.12, 0.08, 1400 + i * 120);
// el estudio: tarjeta, hisopo, contador 189 y los puntos del mapa
m.golpe(Es + 0.2, 0.3, 80);
for (let i = 0; i < 6; i++) m.whoosh(Es + 0.4 + i * 0.3, 0.25, 0.05);
for (let i = 0; i < 14; i++) m.tic(Es + 2.3 + i * 0.1, 0.06, 1800 + i * 40);
for (let i = 0; i < 10; i++) m.nota(Es + 2.6 + i * 0.13, m.ESC[(i * 3) % 8 + 4], 0.018, 0.25);
// resultado: 62 %, los verdes y los negros
for (let i = 0; i < 10; i++) m.tic(Re + 0.2 + i * 0.1, 0.06, 1900 + i * 50);
m.golpe(Re + 1.0, 0.2, 90);
for (let i = 0; i < 12; i++) m.tic(Re + 1.0 + i * 0.07, 0.05, 2200);
for (let i = 0; i < 9; i++) m.tic(Re + 2.6 + i * 0.08, 0.06, 700);
// riesgo: palomita tranquila, pulmones que respiran
m.nota(Ri + 1.3, 72, 0.05, 0.6); m.nota(Ri + 1.45, 76, 0.05, 0.8);
m.whoosh(Ri + 3.1, 1.6, 0.05); m.whoosh(Ri + 4.8, 1.4, 0.04);
// lavadora: centrifugado, contador 79 y el cajón
m.motor(La + 0.2, 4.3, 0.05);
for (let i = 0; i < 8; i++) m.tic(La + 0.7 + i * 0.12, 0.06, 1800 + i * 50);
m.whoosh(La + 2.4, 0.5, 0.12); m.tic(La + 2.9, 0.12, 900);
// origen: ?, HIPÓTESIS, frutas que caen y el ave
m.nota(Or + 0.4, 64, 0.04, 1.0); m.nota(Or + 0.9, 62, 0.04, 1.0);
m.golpe(Or + 2.4, 0.3, 85);
for (let i = 0; i < 3; i++) m.burbuja(Or + 2.5 + i * 0.2, 0.08, 300 + i * 70);
for (let i = 0; i < 4; i++) m.nota(Or + 3.3 + i * 0.09, 88 + (i % 2) * 3, 0.03, 0.15); // pío
for (let i = 0; i < 6; i++) m.tic(Or + 3.6 + i * 0.22, 0.04, 3000);
// cierre: vuelve la puerta (arriba), el acercamiento y los ojitos tranquilos
m.whoosh(C + 2.0, 1.2, 0.08);
m.nota(C + 2.9, 79, 0.04, 0.3); m.nota(C + 3.05, 76, 0.04, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.5, 76, 0.03, 2.4);
m.guardar(OUT, 1);
