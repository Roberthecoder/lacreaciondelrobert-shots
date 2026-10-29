// gen-audio.mjs — cama grave + efectos del Shot Científico #16 (la Luna se aleja). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Luna Se Aleja base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 160);
const K = m.K;
const laser = (t, g = 0.08) => m.sube(t, 0.35, 84, 96, g);
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.sube(K.Gancho + 0.3, 3.0, 64, 52, 0.05);                                                               // la Luna se aleja
m.golpe(K.Gancho + 0.6, 0.3, 90); m.nota(K.Gancho + 0.65, 76, 0.06, 0.6);                                 // «+3.8 cm»
for (let i = 0; i < 6; i++) m.tic(K.Espejos + 0.2 + i * 0.32, 0.12, 900);                                // pasos del astronauta
m.golpe(K.Espejos + 2.45, 0.3, 60); m.whoosh(K.Espejos + 2.45, 0.6, 0.1);                               // deja el panel: polvo
for (let i = 0; i < 4; i++) m.nota(K.Espejos + 2.9 + i * 0.25, [79, 83, 86, 91][i], 0.04, 0.5);          // brillan los espejitos
laser(K.Laser + 0.4); m.metal(K.Laser + 1.1, 0.12, 1400); m.sube(K.Laser + 1.5, 0.6, 96, 84, 0.06);       // disparo, rebote, regreso
for (let i = 0; i < 3; i++) { const t = K.Tiempo + 0.4 + i * 2.5; laser(t, 0.05); m.metal(t + 1.25, 0.08, 1400); m.tic(t + 2.5, 0.2, 2400); } // ida y vuelta ≈ 2.5 s
m.nota(K.Tiempo + 2.9, 81, 0.06, 0.8);
m.nota(K.Tiempo + 4.6, 76, 0.05, 0.6);
for (let i = 0; i < 8; i++) m.tic(K.Resultado + 0.2 + i * 0.33, 0.12, 2000 + i * 80);                     // muchos años de disparos
m.golpe(K.Resultado + 2.9, 0.35, 80); m.sube(K.Resultado + 2.9, 1.0, 60, 72, 0.05);                      // 3.8 cm / año
m.whoosh(K.Resultado + 3.0, 2.0, 0.08);                                                                  // la Luna se aleja
m.sube(K.Pregunta + 0.05, 1.2, 52, 64, 0.05);
m.zumbido(K.Mareas + 0.5, 1.6, 0.04, 70); m.burbuja(K.Mareas + 1.6, 0.12, 400); m.burbuja(K.Mareas + 2.1, 0.12, 360); // bultos de agua
m.whoosh(K.Giro + 0.3, 1.2, 0.08);                                                                       // la Tierra gira
m.nota(K.Giro + 2.7, 74, 0.05, 0.6); m.whoosh(K.Giro + 4.8, 0.7, 0.12); m.nota(K.Giro + 4.9, 79, 0.05, 0.6); // se adelantan · jalan
m.sube(K.Empuje + 0.4, 3.0, 57, 69, 0.05);                                                               // sube a una órbita más lejana
m.sube(K.Empuje + 3.4, 2.4, 50, 45, 0.05);                                                               // el giro se frena
m.golpe(K.Unas + 0.15, 0.3, 90);
m.sube(K.Unas + 2.2, 2.8, 64, 71, 0.04);                                                                 // crecen la uña y la distancia
m.nota(K.Unas + 4.6, 81, 0.06, 0.8);
m.metal(K.Cierre + 0.6, 0.18, 2600); m.tic(K.Cierre + 0.6, 0.3, 3200);                                   // ¡clic!
m.metal(K.Cierre + 1.3, 0.18, 2600); m.tic(K.Cierre + 1.3, 0.3, 3200);
m.sube(K.Cierre + 1.6, 3.0, 64, 52, 0.04); m.nota(K.Cierre + 2.2, 76, 0.05, 0.6);                         // la Luna se aleja otro poquito
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
