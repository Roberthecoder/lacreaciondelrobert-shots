// gen-audio.mjs — cama grave + efectos del Shot Ambiental #29 (acidificación del mar). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Acidificacion base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, Ab = K.Absorbe, Ac = K.Acido, Es = K.Escala, Me = K.Medicion, P = K.Pregunta, Po = K.Porcentaje, Ca = K.Carbonato, Et = K.Estudio, Ex = K.Experimento, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                                    // cama grave "submarina"
m.whoosh(G + 0.0, 1.0, 0.12); m.tic(G + 0.3, 0.12, 1400); m.sube(G + 0.2, 2.4, 60, 58, 0.04);  // ola + aguja del pH que baja un poquito
for (let i = 0; i < 4; i++) m.burbuja(G + 3.0 + i * 0.4, 0.05, 420 + i * 40);
for (let i = 0; i < 4; i++) m.nota(Ab + 0.2 + i * 0.45, 57 + i * 2, 0.05, 0.5);              // 4 nubes de CO2
m.sube(Ab + 2.2, 1.2, 64, 52, 0.05); for (let i = 0; i < 5; i++) m.burbuja(Ab + 3.0 + i * 0.12, 0.07, 380);  // la cuarta se hunde
m.whoosh(Ac - 0.3, 0.8, 0.1); m.golpe(Ac + 1.5, 0.25, 140); m.metal(Ac + 1.55, 0.08, 900);  // choque: ácido carbónico
m.nota(Ac + 2.3, 76, 0.06, 0.8); m.nota(Ac + 2.5, 81, 0.04, 0.6);                           // brillito del H+
m.tic(Es + 0.4, 0.15, 1500); m.nota(Es + 2.5, 69, 0.06, 0.8);                               // 7 neutro · 8.2
m.tic(Me + 0.3, 0.15, 1600); m.sube(Me + 1.2, 1.4, 64, 60, 0.05); m.golpe(Me + 2.6, 0.2, 90); // 8.11 → 8.04
m.sube(P + 0.05, 1.2, 52, 62, 0.05);
[0, 1, 2].forEach((i) => m.nota(P + 1.6 + i * 0.5, 60 + i * 7, 0.07, 0.7));                // ×10, ×10
for (let i = 0; i < 14; i++) m.tic(Po + 0.1 + i * 0.08, 0.05, 2000 + (i % 3) * 200);        // se llenan los frascos
m.golpe(Po + 0.9, 0.3, 100); m.nota(Po + 1.0, 72, 0.06, 0.8);                               // +18 %
[0.2, 0.7, 1.7, 2.2].forEach((d) => { m.tic(Ca + d + 1.0, 0.12, 1200); m.sube(Ca + d + 1.0, 0.4, 62, 57, 0.03); });  // el H+ atrapa al carbonato
m.whoosh(Et + 0.1, 0.6, 0.1); m.golpe(Et + 0.25, 0.25, 120);                               // tarjeta del estudio
m.zumbido(Et + 2.4, 0.8, 0.04, 240); m.cruje(Et + 3.2, 0.25);                               // microscopio, concha picada
for (let i = 0; i < 12; i++) m.tic(Ex + 0.8 + i * 0.5, 0.06, 1800);                        // cronómetro de 45 días
m.cruje(Ex + 3.5, 0.2); m.cruje(Ex + 5.8, 0.25);
m.whoosh(C + 0.0, 1.0, 0.12); m.tic(C + 0.3, 0.12, 1400);                                   // regreso a la ola y la aguja
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
