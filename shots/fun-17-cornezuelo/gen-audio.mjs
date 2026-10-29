// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #17 (cornezuelo, Claviceps purpurea). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cornezuelo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K;
const G = K.Gancho, F = K.Flor, Po = K.Polen, Es = K.Esporas, Cu = K.Cuernito, P = K.Pregunta, V = K.Vasos, SA = K.SanAntonio,
  E = K.Estudio, Cul = K.Culpable, M = K.Medicina, H = K.Hofmann, Mo = K.Molino, C = K.Cierre, Ou = K.Outro;
const ES2 = Es + 1.7;

m.pad(0, M, 0.05, [43, 50, 55], 0.35);                                        // tenso y tapado mientras es veneno
m.pad(M, Ou + 3.5, 0.05, [45, 52, 57], 0);                                     // se abre con las medicinas
m.whoosh(G, 1.2, 0.08);                                                        // viento en la espiga
m.sube(G + 0.15, 0.8, 40, 47, 0.05); m.cruje(G + 0.6, 0.25);                   // sale el cuerno negro
m.cruje(G + 1.7, 0.3);                                                         // se tacha "centeno quemado"
m.golpe(G + 2.0, 0.5, 70);                                                     // ¡HONGO!
m.whoosh(F + 0.6, 1.4, 0.08); m.tic(F + 2.0, 0.2, 2600);                       // la espora vuela y cae en el estigma
m.nota(Po + 0.2, 64, 0.04, 0.6, 0.3);                                          // aparece el camino del polen
m.sube(Po + 0.6, Es - Po - 0.8, 50, 62, 0.04);                                 // la hifa baja por el estilo
m.zumbido(Es - 0.3, 1.8, 0.03, 120);                                           // invade el ovario
m.gota(ES2, 0.3, 700); m.burbuja(ES2 + 0.3, 0.1, 400);                         // la gota de mielecilla
m.zumbido(ES2 + 0.4, 2.0, 0.05, 230);                                          // la mosca
m.sube(Cu + 0.2, 1.4, 38, 45, 0.06); m.cruje(Cu + 1.2, 0.35);                  // crece y se endurece el cornezuelo
m.motor(P, 1.3, 0.06);                                                         // la piedra del molino
m.golpe(P + 0.6, 0.3, 110); m.sube(P + 1.2, 1.2, 52, 64, 0.05);                // el pan… ¿y si…?
for (let i = 0; i < 4; i++) m.latido(V + 0.5 + i * (0.6 + i * 0.15), 0.22 - i * 0.04); // los latidos se apagan: el vaso se cierra
m.golpe(V + 2.4, 0.35, 60);                                                    // gangrena
for (let i = 0; i < 6; i++) m.cruje(SA + 0.3 + i * 0.6, 0.18);                 // chisporroteo del "fuego"
m.golpe(E + 0.2, 0.35, 80);                                                    // la tarjeta del estudio
m.tic(E + 1.0, 0.25, 1200);                                                    // el punto en Arsi
for (let i = 0; i < 18; i++) m.tic(E + 1.6 + i * 0.08, 0.08, 1500);           // 18 personas
for (let i = 0; i < 3; i++) m.golpe(E + 4.0 + i * 0.25, 0.3, 55);             // 3 muertes
m.whoosh(Cul + 1.0, 1.0, 0.1); m.nota(Cul + 1.9, 57, 0.05, 0.8, 0.3);         // la lupa encuentra la avena
m.whoosh(M + 0.4, 0.9, 0.08); m.metal(M + 1.2, 0.15, 1800);                    // el cuerno se vuelve frasco
m.nota(M + 1.4, 69, 0.06, 0.8); m.nota(M + 2.4, 72, 0.06, 0.8);                // las dos medicinas
for (let i = 0; i < 5; i++) m.burbuja(H + 0.3 + i * 0.4, 0.08, 380 + i * 40);  // burbujas del matraz
for (let i = 0; i < 4; i++) m.tic(H + 0.5 + i * 0.22, 0.12, 900);              // anillos de la molécula
m.motor(Mo, 4.2, 0.05);                                                 // banda del molino
for (let i = 0; i < 4; i++) m.tic(Mo + 0.8 + i * 1.0, 0.18, 700);              // los cuernos caen fuera
m.whoosh(C + 0.2, 0.8, 0.06); m.nota(C + 1.0, 69, 0.06, 1.0); m.nota(C + 1.4, 76, 0.05, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
