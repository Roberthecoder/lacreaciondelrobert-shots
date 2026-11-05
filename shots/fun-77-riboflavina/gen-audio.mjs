// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #77 (Riboflavina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama continua a 108 BPM (compás ≈ 2.22 s) que cambia de acorde cada compás y de textura cada sección
// (receta maestro/recetas/composicion-musical.md): curiosa en el gancho → oscura en el algodón → tensa en la pregunta →
// se abre brillante en «bloqueador solar» y en el ahorro → resuelve en el cierre. Nunca el mismo patrón más de 4 compases.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Riboflavina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 77);
const K = m.K;
const G = K.Gancho, O = K.Orina, M = K.Molecula, Mi = K.Microbios, A = K.Algodon, H = K.Hilos, V = K.Vacuolas, P = K.Pregunta,
  E = K.Esporas, Ta = K.Tanques, Ge = K.Genes, Ah = K.Ahorro, Ir = K.Ironia, C = K.Cierre, Ou = K.Outro;

// --- cama: un acorde por compás; cada sección con su propia progresión (en midi, voz grave).
const BAR = 60 / 108 * 4;
const SECC = [
  [G, Mi, 0.00, [[45, 52, 57], [41, 48, 57], [43, 50, 55], [40, 47, 55]]],          // curiosa: Am – F – G – Em
  [Mi, A, 0.05, [[45, 52, 60], [48, 55, 60]]],                                     // se ilumina un poco
  [A, H, 0.45, [[45, 51, 57], [44, 51, 56]]],                                      // algodón enfermo: oscura y tapada
  [H, P, 0.15, [[43, 50, 57], [41, 48, 55], [45, 52, 57], [40, 47, 54]]],          // hilos: avanza
  [P, E, 0.35, [[44, 50, 56]]],                                                    // pregunta: tensa (disminuido)
  [E, Ta, 0.10, [[45, 52, 57], [41, 48, 57], [48, 55, 64], [43, 50, 59]]],         // estudio → «bloqueador»: se abre
  [Ta, Ah, 0.0, [[48, 55, 60], [43, 50, 55], [45, 52, 57], [41, 48, 53]]],         // industria: C – G – Am – F
  [Ah, C, 0.0, [[41, 48, 57], [43, 50, 59], [48, 55, 64], [45, 52, 60]]],           // ahorro e ironía: brillante
  [C, Ou + 3.5, 0.0, [[41, 48, 57], [43, 50, 55], [45, 52, 57]]],                  // cierre: resuelve en Am
];
for (const [a, b, tapa, acordes] of SECC) {
  let t = a, i = 0;
  while (t < b - 0.01) { const t1 = Math.min(b, t + BAR); m.pad(t, t1 + 0.05, 0.05, acordes[i % acordes.length], tapa); t = t1; i++; }
}
// --- motivo suave (celesta) entre frases: tema de 4 notas que cambia de forma por sección (motivo → respuesta → secuencia → cadencia).
const MOTIVOS = { [G]: [69, 72, 76, 74], [O]: [69, 71, 72, 76], [M]: [76, 79, 81, 79], [Mi]: [72, 74, 76, 72], [H]: [67, 69, 72, 71], [V]: [71, 72, 74, 76],
  [E]: [69, 72, 76, 81], [Ta]: [72, 76, 79, 76], [Ge]: [74, 76, 79, 81], [Ah]: [76, 79, 81, 84], [Ir]: [79, 76, 74, 79], [C]: [76, 74, 72, 69] };
Object.entries(MOTIVOS).forEach(([t0, ns]) => ns.forEach((n, i) => m.nota(+t0 + 0.6 + i * 0.28, n, 0.028, 0.9)));

// --- efectos, cada uno en el mismo cuadro que su evento
m.whoosh(G + 0.1, 0.7, 0.08); m.tic(G + 0.85, 0.35, 700); m.gota(G + 0.9, 0.22, 500); m.gota(G + 1.05, 0.15, 650);   // pastilla cae, rebota, chapoteo
m.golpe(G + 2.1, 0.3, 70); m.cruje(G + 2.1, 0.2); m.nota(G + 2.65, 76, 0.06, 0.6);                                      // se tacha «colorante», sale «vitamina B2»
m.tic(O + 0.1, 0.12, 900);                                                                                              // pastilla baja
for (let i = 0; i < 6; i++) m.gota(O + 0.95 + i * 0.12, 0.08, 1100 + i * 60);                                            // gotitas a los riñones
for (let i = 0; i < 6; i++) m.gota(O + 1.95 + i * 0.13, 0.08, 800 - i * 40);                                             // bajan a la vejiga
for (let i = 0; i < 8; i++) m.tic(O + 1.8 + i * 0.22, 0.05, 2200);                                                      // reloj de 24 h
m.burbuja(M + 0.2, 0.08, 400); m.burbuja(M + 0.5, 0.08, 480); m.burbuja(M + 0.8, 0.08, 560);                              // se arman los anillos
m.metal(M + 1.7, 0.12, 1200); m.zumbido(M + 1.75, 2.0, 0.04, 240); m.sube(M + 1.9, 0.8, 64, 76, 0.03);                   // clic de la lámpara UV y brillo
m.golpe(Mi + 0.25, 0.2, 120); m.golpe(Mi + 1.45, 0.2, 100); m.sube(Mi + 1.5, 1.0, 55, 67, 0.03);    // tarjetas; crece la red
for (let i = 0; i < 6; i++) m.tic(A + 0.25 + i * 0.17, 0.05, 1500);                                                      // patitas de la chinche
m.tic(A + 1.4, 0.3, 500); m.whoosh(A + 1.7, 0.9, 0.04);                                                                  // pica; se mancha la fibra
for (let i = 0; i < 5; i++) m.burbuja(H + 0.1 + i * 0.08, 0.05, 700);                                                    // levaduras
for (let i = 0; i < 5; i++) m.nota(H + 0.5 + i * 0.56, 64 + i * 3, 0.035, 0.4);                                           // cada nivel de puntas que se parten
m.sube(V + 0.1, 1.1, 60, 48, 0.03);                                                                                       // se acaba la comida
[0, 0.15, 0.3, 0.1, 0.4, 0.25, 0.5].forEach((t0, i) => m.burbuja(V + 1.2 + t0 * 4, 0.06, 500 + i * 60)); // vacuolas se llenan
m.sube(P + 0.1, 1.6, 52, 64, 0.045);                                                                                      // re-gancho
m.whoosh(E + 0.1, 1.0, 0.05); m.golpe(E + 1.2, 0.3, 80);                                                                  // esporas salen; tarjeta 2001
m.metal(E + 4.2, 0.12, 1200); m.zumbido(E + 4.2, 2.6, 0.04, 240);                                                        // lámpara UV sobre las placas
for (let i = 0; i < 13; i++) m.tic(E + 4.5 + i * 0.08, 0.05, 1700 + (i % 3) * 300);                                       // colonias que crecen
m.nota(E + 5.6, 76, 0.05, 1.0); m.nota(E + 5.65, 81, 0.04, 1.0);                                                         // «bloqueador solar»
m.motor(Ta + 0.2, 4.4, 0.04); for (let i = 0; i < 6; i++) m.burbuja(Ta + 0.5 + i * 0.5, 0.05, 350 + i * 30);             // biorreactor
m.tic(Ta + 1.45, 0.2, 900); m.golpe(Ta + 3.0, 0.35, 55); m.cruje(Ta + 3.05, 0.15);                                        // fábrica química aparece y se apaga
m.whoosh(Ge + 0.2, 0.6, 0.05); m.golpe(Ge + 1.4, 0.3, 90); m.metal(Ge + 1.4, 0.1, 900);                                    // ADN se abre; «clac» del paquete
m.sube(Ge + 1.8, 1.2, 60, 72, 0.03);                                                                                       // la hifa se pone más amarilla
m.sube(Ah + 0.3, 0.8, 50, 57, 0.03); m.sube(Ah + 1.2, 0.8, 62, 55, 0.035); m.sube(Ah + 2.4, 0.8, 62, 57, 0.035);         // barras suben y bajan
m.golpe(Ir + 0.1, 0.25, 140); m.nota(Ir + 0.35, 79, 0.05, 0.3); m.nota(Ir + 0.5, 84, 0.04, 0.3);                          // pastelito: guiño
m.metal(C + 0.7, 0.12, 1200); m.zumbido(C + 0.75, 2.6, 0.04, 240); m.burbuja(C + 1.8, 0.08, 600);                         // lámpara UV; asoma la hifa
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
