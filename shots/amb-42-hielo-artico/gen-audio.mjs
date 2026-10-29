// gen-audio.mjs — cama grave y fría + efectos del Shot Ambiental #42 (hielo del Ártico). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hielo Artico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 42);
const K = m.K;
const G = K.Gancho, Ma = K.Mapa, A = K.Antes, H = K.Hoy, Hu = K.Hueco, P = K.Pregunta, E = K.Espejo, C = K.Circulo, Es = K.Estudio, R = K.Record, Ci = K.Cierre, Ou = K.Outro;
const RS = R + 2.7;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);
m.cruje(G + 0.2, 0.5); m.sube(G + 0.2, 2.4, 64, 52, 0.05);                         // el hielo se encoge en time-lapse
for (let i = 0; i < 6; i++) m.tic(G + 0.2 + i * 0.45, 0.05, 1500);                     // la barra de "tu vida"
m.whoosh(Ma + 0.3, 0.6, 0.12); m.golpe(Ma + 0.9, 0.3, 90);                             // cae México sobre el hielo
for (let i = 0; i < 4; i++) m.nota(A + 0.6 + i * 0.8, [57, 60, 64, 67][i], 0.06, 0.7); // se llenan los 3 Méxicos y un pedacito
m.cruje(H + 0.3, 0.45); m.sube(H + 0.3, 2.1, 64, 55, 0.05); m.nota(H + 2.4, 60, 0.05, 0.8);   // el borde retrocede
m.nota(Hu + 1.0, 72, 0.05, 0.9); m.sube(Hu + 1.6, 1.4, 55, 60, 0.04);                   // el hueco
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 6; i++) m.nota(E + 0.5 + i * 0.28, 81, 0.035, 0.25);                 // rayos que rebotan en el hielo
for (let i = 0; i < 4; i++) m.golpe(E + 2.2 + i * 0.6, 0.18, 60);                         // rayos que se hunden en el mar
m.sube(E + 2.4, 3.0, 45, 50, 0.04);
for (let i = 0; i < 4; i++) m.tic(C + 0.2 + i * 0.4, 0.08, 1100);                         // el círculo
m.whoosh(C + 0.4, 2.0, 0.08);
for (let i = 0; i < 6; i++) m.tic(Es + 0.3 + i * 0.4, 0.04, 2600);                        // bip del satélite
for (let i = 0; i < 20; i++) m.tic(Es + 3.4 + i * 0.06, 0.06, 900);                       // los 20 años en rojo
m.golpe(R + 0.8, 0.35, 55); m.cruje(R + 0.2, 0.4);                                       // récord de 2012
m.gota(RS + 0.3, 0.2, 800); m.burbuja(RS + 1.0, 0.08, 420); m.gota(RS + 1.8, 0.12, 700);   // el hielo del vaso
for (let i = 0; i < 4; i++) m.nota(Ci + 0.5 + i * 0.4, [57, 60, 64, 67][i], 0.05, 0.7);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
