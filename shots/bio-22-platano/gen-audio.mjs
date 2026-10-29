// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #22 (el plátano clon). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: los clones suenan con LA MISMA nota repetida (son copias); 3 notas iguales por los 3 juegos de cromosomas;
// cuando cae cada mata, su nota se desafina; un "blip" por cada país con TR4; 3 golpes = 3 años de prueba de campo.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Platano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 22);
const K = m.K;
const G = K.Gancho, Cv = K.Cavendish, Se = K.Semillas, Hi = K.Hijuelo, Pr = K.Pregunta, Ho = K.Hongo, Ra = K.Raiz, GM = K.GrosMichel,
  Am = K.America, Es = K.Estudio, Ap = K.Aprobado, Cu = K.Curioso, Ci = K.Cierre, Ou = K.Outro;
const EsB = Es + 3.1, mitadSe = Se + 1.7;

m.pad(0, Pr, 0.05, [45, 52, 57]);
m.pad(Pr, EsB, 0.05, [45, 51, 56], 0.5);                                   // tapada mientras dura el problema
m.pad(EsB, Ou + 3.5, 0.05, [45, 52, 57]);                                  // libre cuando llega la solución
m.whoosh(G, 0.5, 0.12); m.whoosh(G + 0.1, 0.5, 0.1);                       // suben los dos brazos
m.tic(G + 0.75, 0.25, 2600); m.tic(G + 0.9, 0.25, 2600);                   // "copiar" (clic doble)
m.nota(G + 1.5, 69, 0.08, 0.8); m.nota(G + 1.5, 69, 0.06, 0.8);            // = el mismo clon
m.zumbido(Cv + 0.2, 1.4, 0.05, 110);                                       // bocina del barco
for (let i = 0; i < 10; i++) m.nota(Cv + 0.3 + i * 0.27, 64, 0.04, 0.3);  // cajas idénticas: la misma nota
m.cruje(Se + 0.15, 0.4);                                                   // corte del plátano (se abre la lupa)
m.whoosh(mitadSe - 0.2, 0.5, 0.08);
for (let k = 0; k < 3; k++) m.nota(mitadSe + 0.3 + k * 0.45, 62, 0.07, 0.5); // 3 juegos iguales
m.sube(Hi + 0.1, 1.3, 50, 62, 0.05);                                       // el brote crece
m.whoosh(Hi + 1.5, 1.4, 0.07);                                             // se separa y crece otra mata
m.metal(Hi + 2.2, 0.12, 900);                                              // frasco de laboratorio
for (let i = 0; i < 5; i++) { const t = Pr + 1.0 + (4 - i) * 0.3; m.nota(t, 67 - i * 0.5, 0.06, 0.5); m.golpe(t + 0.2, 0.12, 70); } // dominó
for (let i = 0; i < 4; i++) m.cruje(Ho - 0.3 + i * 0.35, 0.15);            // hifas que avanzan
for (let i = 0; i < 4; i++) m.burbuja(Ho + 1.1 + i * 0.25, 0.08, 900);   // esporas que aparecen
for (let i = 0; i < 8; i++) m.gota(Ra + 0.4 + i * 0.35, 0.12 * (1 - i / 9), 900 - i * 60); // el agua deja de subir
m.sube(Ra + 1.4, 2.6, 60, 48, 0.05);                                       // se marchita
m.golpe(GM + 0.3, 0.3, 80);
m.golpe(GM + 2.0, 0.4, 70); m.cruje(GM + 2.05, 0.3);                       // caja tachada
[0.8, 2.0, 2.6, 3.1].forEach((d, i) => m.nota(Am + d, 76 - i, 0.07, 0.4)); // un blip por país con TR4
m.nota(Am + 3.9, 72, 0.06, 0.6); m.nota(Am + 4.05, 76, 0.06, 0.7);         // México: palomita verde
m.golpe(Es + 0.2, 0.35, 80);                                               // tarjeta del estudio
m.sube(Es + 0.8, 1.7, 57, 69, 0.05);                                       // el gen viaja a la célula
for (let k = 0; k < 3; k++) m.golpe(EsB + 0.6 + k * 1.0, 0.22, 95);       // 3 años
for (let i = 0; i < 4; i++) m.nota(EsB + 0.9 + i * 0.4, 64 - i, 0.04, 0.5, 0.6); // las comunes se marchitan
m.nota(EsB + 2.2, 69, 0.07, 1.2); m.nota(EsB + 2.2, 76, 0.05, 1.2);       // la mejor línea, sana
m.whoosh(Ap, 0.8, 0.1);                                                    // entra la caja QCAV-4
m.golpe(Ap + 1.4, 0.4, 75); m.golpe(Ap + 2.2, 0.4, 75);                    // dos sellos
m.nota(Cu + 0.3, 57, 0.05, 1.2, 0.8); m.nota(Cu + 0.6, 64, 0.04, 1.2, 0.8); // genes casi apagados (sonido ahogado)
m.tic(Cu + 0.8, 0.15, 1800);
m.nota(Ci + 1.2, 69, 0.06, 1.0); m.nota(Ci + 1.5, 76, 0.06, 1.2); m.metal(Ci + 1.3, 0.1, 1200); // "clin" del escudo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
