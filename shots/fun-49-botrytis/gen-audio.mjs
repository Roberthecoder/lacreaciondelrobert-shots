// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #49 (Botrytis cinerea). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Botrytis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 49);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Es = K.Esporas, Et = K.Estambres, Sp = K.Espera, P = K.Pregunta, Ma = K.Madura, Pe = K.Pelusa,
  V = K.Vecinas, E = K.Estudio, E2 = K.Estambres2, N = K.Noble, C = K.Cierre, Ou = K.Outro;
const micro = Pe + 1.3;

m.pad(0, Sp, 0.05, [45, 52, 57], 0.15);                                       // misterio: el hongo entra
m.pad(Sp, Ma + 2.6, 0.045, [43, 50, 55], 0.35);                               // duerme (tapado)
m.pad(Ma + 2.6, E, 0.055, [45, 52, 56], 0.1);                                 // despierta y pudre (tenso)
m.pad(E, Ou + 3.5, 0.05, [45, 52, 57], 0.05);
m.whoosh(G + 0.1, 2.2, 0.06);                                                 // la pelusa crece
for (let i = 0; i < 6; i++) m.tic(G + 0.3 + i * 0.35, 0.06, 3200 + i * 150);
m.cruje(G + 2.1, 0.25);                                                       // ¿llegó anoche? tachado
m.whoosh(G + 2.9, 0.5, 0.1); m.nota(G + 3.5, 69, 0.06, 0.8);                   // aparece la flor
m.golpe(H + 0.4, 0.3, 80);
for (let i = 0; i < 4; i++) m.nota(H + 1.4 + i * 0.35, 60 + i * 2, 0.04, 0.4); // cientos de plantas
m.whoosh(Es + 0.2, 1.6, 0.14);                                                // viento
m.gota(Es + 1.8, 0.3, 700);                                                   // la gota salpica
for (let i = 0; i < 8; i++) m.burbuja(Es + 1.9 + i * 0.12, 0.05, 700 + i * 40); // esporas que caen
for (let i = 0; i < 5; i++) m.tic(Es + 2.6 + i * 0.15, 0.08, 1800);           // germinan
m.zumbido(Et + 0.9, 2.5, 0.025, 120);                                         // la hifa baja por el estambre
m.sube(Et + 0.9, 2.5, 50, 43, 0.04);
for (let i = 0; i < 3; i++) m.nota(Sp + 0.3 + i * 0.35, 72 - i * 3, 0.03, 0.5); // caen los pétalos
m.sube(Sp + 1.8, 2.0, 45, 41, 0.03);                                          // "zzz"
m.sube(P + 0.1, 1.3, 52, 64, 0.05);
m.sube(Ma + 0.4, 2.2, 55, 67, 0.04);                                          // sube el azúcar
m.metal(Ma + 2.2, 0.08, 600);                                                 // cambian las defensas
m.latido(Ma + 2.9, 0.18); m.latido(Ma + 3.6, 0.2);                             // el hongo despierta
m.cruje(Pe + 0.1, 0.4); m.whoosh(Pe + 0.2, 1.0, 0.08);                        // la fresa se pudre
m.golpe(micro, 0.25, 60);
for (let i = 0; i < 9; i++) m.tic(micro + 0.6 + i * 0.12, 0.07, 2600 + (i % 3) * 300); // racimitos de esporas
m.cruje(V + 0.6, 0.3);                                                        // los hilos pasan por contacto
m.whoosh(V + 2.2, 1.2, 0.12); for (let i = 0; i < 6; i++) m.burbuja(V + 2.3 + i * 0.1, 0.05, 900); // ¡puf! esporas al aire
m.golpe(E + 0.2, 0.35, 80); m.metal(E + 0.25, 0.08, 2200);                   // tarjeta del estudio
m.nota(E + 2.4, 64, 0.05, 0.6); m.nota(E + 3.0, 69, 0.05, 0.6);
for (let i = 0; i < 4; i++) m.tic(E2 + 0.9 + i * 0.18, 0.15, 1500);           // tijeritas
m.sube(E2 + 2.2, 0.8, 48, 55, 0.04); m.sube(E2 + 2.6, 0.8, 48, 51, 0.04);    // barras
m.zumbido(N + 0.2, 1.6, 0.02, 80); m.whoosh(N + 0.3, 1.4, 0.05);             // noche húmeda, neblina
m.nota(N + 1.8, 76, 0.05, 1.0);                                               // sale el sol
m.sube(N + 2.4, 1.6, 60, 55, 0.03);                                           // las uvas se arrugan
m.metal(N + 4.1, 0.1, 1800); m.metal(N + 4.5, 0.1, 1500);                     // botellas
m.nota(C + 0.8, 69, 0.06, 1.0); m.nota(C + 1.6, 72, 0.05, 1.0);              // la flor fantasma
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
