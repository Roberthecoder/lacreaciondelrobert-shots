// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #07 (Pilobolus). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pilobolus base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 7);
const K = m.K;
const G = K.Gancho, H = K.Hongo, A = K.Apunta, Ca = K.Carga, D = K.Dispara, P = K.Pregunta, Es = K.Estudio, V = K.Velocidad, Gr = K.Gravedad, Di = K.Distancia, Va = K.Vaca, Po = K.Polizon, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.gota(G + 0.5, 0.35, 1500); m.whoosh(G + 0.5, 0.5, 0.15);                 // ¡pum! una gotita dispara
m.cruje(G + 2.4, 0.3);                                                       // se tacha "rocío"
m.sube(H, 2.5, 50, 57, 0.03);                                                // acercamiento
m.nota(A + 0.1, 64, 0.06, 0.5); m.sube(A + 0.8, 2.4, 57, 69, 0.04);         // cap. 1: gira hacia la luz
m.nota(Ca + 0.1, 67, 0.06, 0.5); m.sube(Ca + 0.3, 3.3, 40, 64, 0.05);       // cap. 2: sube la presión
for (let i = 0; i < 8; i++) m.burbuja(Ca + 0.4 + i * 0.4, 0.06, 300 + i * 50);
m.nota(D + 0.1, 72, 0.06, 0.5);
m.golpe(D + 1.6, 0.6, 140); m.gota(D + 1.6, 0.4, 2000); m.whoosh(D + 1.6, 0.7, 0.25); // ¡dispara!
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) m.tic(Es + 1.0 + i * 0.25, 0.15, 2400);          // cuadros de la película
m.sube(V + 0.3, 1.3, 45, 76, 0.06); m.nota(V + 2.0, 76, 0.06, 0.8);         // la aguja del velocímetro
m.sube(Gr + 0.2, 1.2, 40, 81, 0.06); m.golpe(Gr + 1.4, 0.3, 60);
m.whoosh(Di + 0.3, 1.9, 0.12); m.gota(Di + 2.2, 0.25, 900);                  // vuela y cae en el pasto
m.whoosh(Va, 1.2, 0.08); for (let i = 0; i < 6; i++) m.tic(Va + 1.5 + i * 0.35, 0.1, 500); // la vaca mastica
for (let i = 0; i < 7; i++) m.nota(Va + 3.0 + i * 0.12, 67 + (i % 3) * 3, 0.04, 0.4); // las esporas despiertan
for (let i = 0; i < 5; i++) m.burbuja(Po + 0.6 + i * 0.25, 0.08, 600);       // suben los polizones
m.sube(C + 0.4, 1.2, 57, 69, 0.04); m.nota(C + 1.4, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
