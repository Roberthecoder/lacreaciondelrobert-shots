// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #111 (Cortinarius). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave y continua en la menor, con armonía que cambia cada frase (nunca el mismo acorde más de ~4 s):
// tensa mientras el veneno "espera" (i – VI – iv – V), más oscura en los datos de Suecia y sin antídoto, y se abre
// (VI – VII – I mayor) en el consejo final. Arriba, un motivo de 4 notas que responde en otro registro cada sección.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cortinarius base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 111);
const K = m.K;
const G = K.Gancho, Co = K.Cortina, Es = K.Esporas, To = K.Toxina, Tu = K.Tubulos, P = K.Pregunta, R = K.Revision,
  Su = K.Suecia, Fa = K.Falla, An = K.Antidoto, Ev = K.Evans, Ci = K.Cierre, Ou = K.Outro;

// ---- cama: acordes (MIDI) por tramo; tapa = qué tan ahogada suena ----
const AM = [45, 52, 57], F = [41, 48, 57], DM = [38, 50, 57], E = [40, 52, 56], C = [36, 48, 55], GM = [43, 50, 55], AMAY = [45, 52, 61];
const tramos = [
  [G, G + 3.4, AM, 0.2], [G + 3.4, Co, F, 0.25], [Co, Es, AM, 0.15], [Es, To, DM, 0.2],
  [To, Tu, E, 0.35], [Tu, P, AM, 0.45], [P, R, E, 0.3], [R, R + 3.2, DM, 0.25], [R + 3.2, Su, E, 0.3],
  [Su, Fa, F, 0.4], [Fa, An, DM, 0.5], [An, Ev, E, 0.5], [Ev, Ev + 4, AM, 0.3], [Ev + 4, Ci, F, 0.3],
  [Ci, Ci + 3, C, 0.15], [Ci + 3, Ci + 6.2, GM, 0.1], [Ci + 6.2, Ou, AMAY, 0.05], [Ou, Ou + 3.4, AMAY, 0],
];
tramos.forEach(([a, b, ac, tapa]) => m.pad(a, b + 0.3, 0.05, ac, tapa));
// bajo que respira (una nota por frase, con ligadura a la siguiente)
tramos.forEach(([a, b, ac], i) => { m.bajo(a + 0.05, ac[0], 0.07, Math.min(2.2, b - a)); if (i % 2) m.bajo(a + (b - a) / 2, ac[1] - 12, 0.04, 1.2); });
// motivo de 4 notas (pregunta), y su respuesta en otro registro en cada sección
const motivo = (t, base, g = 0.035, tapa = 0.2) => [0, 3, 2, -2].forEach((d, i) => m.nota(t + i * 0.42, base + d, g, 0.9, tapa));
motivo(G + 0.4, 69); motivo(Co + 0.6, 64, 0.03, 0.1); motivo(Tu + 0.5, 62, 0.03, 0.4); motivo(R + 0.3, 69, 0.03, 0.25);
motivo(Su + 0.5, 65, 0.028, 0.4); motivo(Ev + 0.4, 64, 0.03, 0.2); [0, 2, 4, 7].forEach((d, i) => m.nota(Ci + 6.3 + i * 0.4, 69 + d, 0.035, 1.2, 0));

// ---- efectos, en el mismo cuadro que la imagen ----
m.cruje(G + 0.1, 0.45); m.whoosh(G + 0.1, 1.2, 0.08);                               // la sartén chisporrotea
for (let i = 0; i < 7; i++) m.tic(G + 0.15 + i * 0.13, 0.12, 700 + i * 40);          // rebanadas que brincan
for (let h = 0; h <= 6; h++) m.tic(G + 1.6 + h * 0.3, 0.22, 1500);                   // el reloj avanza 6 horas
m.nota(G + 1.9, 76, 0.05, 0.5);                                                       // "nada ✓"
m.cruje(G + 4.1, 0.3); m.golpe(G + 4.1, 0.35, 70);                                    // se tacha el mito
for (let d = 0; d < 13; d++) m.tic(G + 4.6 + d * 0.146, 0.16, 1100 + d * 25);         // el calendario pasa los días
m.sube(Co, 1.0, 43, 50, 0.04); m.sube(Co + 0.3, 1.0, 45, 52, 0.035);                  // brotan los dos hongos
m.whoosh(Co + 1.0, 1.0, 0.06); for (let i = 0; i < 6; i++) m.nota(Co + 1.05 + i * 0.12, 81 + (i % 3) * 2, 0.018, 0.3); // la cortina se teje
m.whoosh(Es + 0.3, 0.6, 0.1);                                                          // se levanta el sombrero
for (let i = 0; i < 8; i++) m.burbuja(Es + 0.6 + i * 0.16, 0.06, 300 + i * 40);       // cae la esporada
for (let i = 0; i < 8; i++) m.nota(To + 0.1 + i * 0.08, 74 + (i % 4) * 3, 0.03, 0.4, 0.2); // aparecen los átomos
for (let i = 0; i < 8; i++) m.gota(To + 1.0 + i * 0.12, 0.08, 500 + i * 30);          // la toxina viaja al riñón
m.latido(To + 1.9, 0.16); m.latido(To + 2.7, 0.14);
for (let i = 0; i < 14; i++) m.gota(Tu + 0.45 + i * 0.09, 0.06, 900);                  // entra a las células
for (let i = 0; i < 9; i++) m.cruje(Tu + 1.7 + i * 0.3, 0.12);                         // células que se dañan, en silencio
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                                    // re-gancho
m.golpe(R + 0.2, 0.3, 80);                                                             // tarjeta 2001
for (let d = 0; d <= 14; d++) m.tic(R + 1.2 + d * 0.257, 0.14, 1300);                  // la línea de los días
m.golpe(R + 2.0, 0.3, 100); m.nota(R + 2.0, 72, 0.04, 0.6);                            // día 3: estómago
m.golpe(R + 3.6, 0.45, 55); m.nota(R + 3.6, 57, 0.06, 1.4, 0.3);                       // 8.5 días: riñón
for (let i = 0; i < 28; i++) m.tic(Su + 0.3 + i * 0.03, 0.07, 1700);                   // 28 personas
for (let i = 0; i < 22; i++) m.gota(Su + 1.6 + i * 0.06, 0.07, 650);                   // 22 diálisis
for (let i = 0; i < 21; i++) m.nota(Fa + 0.4 + i * 0.06, 45 + (i % 3) * 3, 0.03, 0.4, 0.5); // 21 en falla grave
m.cruje(An + 0.6, 0.3); m.golpe(An + 0.6, 0.4, 60);                                     // "antídoto" tachado
m.motor(An + 0.9, 2.2, 0.05);                                                          // máquina de diálisis
m.golpe(Ev + 0.3, 0.3, 80);                                                            // tarjeta 2008
m.sube(Ev + 3.4, 0.6, 40, 47, 0.05); m.sube(Ev + 3.8, 0.8, 45, 52, 0.04);              // porcini y Cortinarius
m.golpe(Ev + 4.6, 0.45, 70); m.metal(Ev + 4.6, 0.12, 600);                             // ≠
m.nota(Ev + 6.3, 69, 0.05, 1.2); m.nota(Ev + 6.45, 73, 0.04, 1.2);                     // el riñón de su hija
m.golpe(Ci + 1.4, 0.5, 60); m.cruje(Ci + 1.4, 0.2);                                    // sello NO
for (let d = 0; d < 8; d++) m.tic(Ci + 4.0 + d * 0.3, 0.16, 1100 + d * 25);            // días que pasan
m.metal(Ci + 6.2, 0.2, 880); m.golpe(Ci + 6.2, 0.3, 110);                              // URGENCIAS
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 61, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.5, 69, 0.04, 2.6);
m.guardar(OUT, 1);
