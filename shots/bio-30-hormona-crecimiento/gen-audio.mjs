// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #30 (hormona de crecimiento). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hormona base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 30);
const K = m.K;
const G = K.Gancho, H = K.Hipofisis, A = K.Antes, L = K.Lote, E = K.Escondido, P = K.Pregunta, Pr = K.Prion, C = K.Cerebro,
  Al = K.Alerta, B = K.Bacteria, S = K.SinTejido, La = K.Latencia, Ci = K.Cierre, Ou = K.Outro;

// cama: clara al inicio, tapada y grave mientras dura el riesgo (escondido → alerta), se abre con la bacteria
m.pad(0, E, 0.05, [45, 52, 57], 0.2);
m.pad(E, B, 0.05, [40, 47, 52], 0.75);
m.pad(B, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
m.tic(G + 0.05, 0.12, 2600); m.metal(G + 0.3, 0.06, 1500);                              // el frasquito de vidrio
m.pop?.(G + 2.3, 0.15); m.nota(G + 2.3, 69, 0.06, 0.6);                                 // aparece la bacteria en la etiqueta
m.whoosh(H + 1.2, 0.6, 0.12);                                                           // se abre la Lupa
for (let i = 0; i < 4; i++) m.gota(H + 1.8 + i * 0.6, 0.12, 900);                       // gotitas de hormona
m.metal(A + 0.4, 0.08, 520); m.tic(A + 2.0, 0.12, 1800);                                // frasco viejo · jeringa
for (let i = 0; i < 25; i++) m.tic(L + 0.3 + i * 0.108, 0.05, 1600 + (i % 5) * 120);    // una fila de glándulas por tic (25 filas)
m.nota(E + 0.4, 52, 0.07, 1.6, 0.4); m.latido(E + 0.5, 0.12); m.latido(E + 1.3, 0.1);   // el cuadrito rojo
m.golpe(P + 0.6, 0.18, 90); m.golpe(P + 1.4, 0.18, 90);                                 // los dos taches
for (let i = 0; i < 5; i++) m.tic(Pr + 0.8 + i * 0.55 + 0.45, 0.14, 900);               // cada proteína que se dobla mal
m.sube(C + 0.4, 3.4, 40, 38, 0.04);                                                     // el cerebro (grave, sin susto)
[0, 1, 2].forEach((i) => m.nota(Al + 1.6 + i * 0.4, [57, 55, 52][i], 0.06, 2.2, 0.3));  // tres velas: tres notas largas
m.golpe(Al + 3.4, 0.25, 70);                                                            // sello SUSPENDIDA (sordo)
for (let i = 0; i < 14; i++) m.burbuja(B + 0.4 + i * 0.35, 0.07, 600 + (i % 4) * 90);   // la bacteria trabaja
for (let i = 0; i < 6; i++) m.nota(B + 1.0 + i * 0.6, [64, 67, 69, 72, 69, 67][i], 0.04, 0.5);
m.nota(S + 0.6, 50, 0.05, 1.0, 0.5); m.nota(S + 1.6, 69, 0.06, 1.0); m.nota(S + 1.6, 76, 0.04, 1.0); // punto rojo · palomita
for (let i = 0; i < 10; i++) m.tic(La + 1.2 + i * 0.34, 0.06, 1100);                    // pulso lento: la barra de los años
m.nota(Ci + 0.3, 57, 0.06, 1.4); m.metal(Ci + 0.2, 0.05, 1500);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
