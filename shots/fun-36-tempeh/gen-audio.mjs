// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #36 (tempeh). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tempeh base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 36);
const K = m.K;
const G = K.Gancho, J = K.Java, Es = K.Esporas, H = K.Hilos, A = K.Amarra, P = K.Pregunta, En = K.Enzimas, F = K.Fitico, Et = K.Estudio, B = K.Bacteria, Bl = K.Blanco, C = K.Cierre, Ou = K.Outro;
const amA = A + (P - A) * 0.56, baA = B + 2.3, blA = Bl + 3.0;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                   // cama grave cálida, continua
m.whoosh(G + 0.2, 0.5, 0.12); m.cruje(G + 0.6, 0.35); m.golpe(G + 0.9, 0.3, 120); // el cuchillo baja y corta
m.cruje(G + 1.6, 0.4);                                                         // se tacha "¿soya prensada?"
m.nota(G + 2.5, 69, 0.06, 0.9);                                                // "soya + hongo vivo"
m.whoosh(J, 0.7, 0.1); m.nota(J + 1.7, 72, 0.06, 1.0); m.gota(J + 2.5, 0.2, 700); // Java se ilumina, cae el pin
for (let i = 0; i < 9; i++) m.burbuja(Es + i * 0.16, 0.08, 280 + (i % 3) * 50);  // hierve la soya
m.whoosh(Es + 1.7, 0.6, 0.08);                                                  // pasa a la charola
for (let i = 0; i < 12; i++) m.tic(Es + 2.9 + i * 0.12, 0.05, 3200 + (i % 4) * 300); // lluvia de esporas
for (let i = 0; i < 9; i++) m.tic(H + 0.3 + i * 0.47, 0.07, 1800);              // reloj de horas
for (let i = 0; i < 3; i++) { m.gota(H + 0.7 + i * 0.35, 0.12, 600 + i * 120); m.sube(H + 1.1 + i * 0.35, 2.4, 52 + i * 3, 64 + i * 3, 0.025); } // germinan y crecen las hifas
m.whoosh(A - 0.3, 0.6, 0.1); m.sube(A + 0.4, 2.0, 50, 57, 0.03);                // entramos al grano; las hifas entran
for (let i = 0; i < 6; i++) m.tic(A + 0.6 + i * 0.12, 0.05, 2200);              // hifas que cruzan de grano a grano
m.whoosh(amA - 0.2, 0.6, 0.1); m.nota(amA + 1.0, 64, 0.06, 1.0);               // de vuelta: un solo bloque
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // pregunta
for (let k = 0; k < 3; k++) { m.metal(En + 1.0 + k * 0.45, 0.08, 2600); m.tic(En + 1.05 + k * 0.45, 0.15, 3000); } // tijeretazos a la proteína
for (let k = 0; k < 6; k++) m.tic(En + 2.4 + k * 0.22, 0.1, 2400);              // la lipasa suelta cadenas
for (let i = 0; i < 6; i++) m.gota(F + 0.9 + i * 0.32, 0.14, 500 + i * 60);    // se sueltan los fosfatos
m.sube(F + 0.9, 2.2, 57, 52, 0.03); m.nota(F + 2.6, 76, 0.05, 0.8);           // baja el ácido fítico; minerales libres
m.golpe(Et + 0.2, 0.35, 80); m.gota(Et + 2.7, 0.2, 800);                       // tarjeta del estudio; frasco "B12 ?"
m.nota(B + 1.2, 57, 0.06, 0.6); m.nota(B + 1.6, 69, 0.07, 0.9);                // "no" / "sí"
m.whoosh(baA - 0.2, 0.6, 0.1); for (let i = 0; i < 8; i++) m.gota(baA + 0.2 + i * 0.08, 0.08, 1200 + i * 80); // aparecen las bacterias
m.zumbido(Bl + 0.2, 1.0, 0.025, 140); m.cruje(Bl + 1.5, 0.25);                 // bolsa con poco aire; salen las manchas
m.whoosh(blA - 0.2, 0.6, 0.1); for (let i = 0; i < 3; i++) m.gota(blA + 1.0 + i * 0.3, 0.18, 450); // esporangios que se inflan
m.cruje(C + 0.3, 0.3); m.nota(C + 1.2, 69, 0.06, 1.0); m.nota(C + 1.5, 76, 0.05, 1.0); // rebanadas; brillan los hilos
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
