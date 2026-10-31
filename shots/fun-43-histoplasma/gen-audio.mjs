// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #43 (Histoplasma capsulatum). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Histoplasma base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 43);
const K = m.K;
const G = K.Gancho, H = K.Hongo, A = K.Aire, Pu = K.Pulmon, Ca = K.Cambio, P = K.Pregunta, M = K.Macrofago, S = K.Sintomas,
  E = K.Estudio, En = K.Enfermos, Ce = K.Cenote, N = K.Nombre, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.35);                                // cama grave de cueva, algo tapada
for (let i = 0; i < 5; i++) m.whoosh(G + 0.05 + i * 0.12, 0.25, 0.05);       // aleteo de murciélagos
m.golpe(G + 0.35, 0.5, 60); m.whoosh(G + 0.4, 1.2, 0.12);                    // la bota pisa y sube el polvo
for (let i = 0; i < 6; i++) m.nota(G + 3.2 + i * 0.12, 81 + (i % 3) * 3, 0.03, 0.4); // brillan las esporas
m.sube(H, 1.6, 52, 60, 0.04);                                                 // crecen las hifas
for (let i = 0; i < 10; i++) m.burbuja(H + 0.5 + i * 0.16, 0.06, 700 + i * 40); // salen las conidias
m.golpe(A + 0.25, 0.45, 62); m.whoosh(A + 0.3, 1.4, 0.14);                   // otra pisada: esporas al aire
m.whoosh(Pu + 0.1, 1.2, 0.12); m.whoosh(Pu + 1.4, 1.0, 0.1);                 // respiración
m.sube(Ca + 0.9, 1.2, 55, 67, 0.05);                                          // el calor lo transforma
for (let i = 0; i < 5; i++) m.burbuja(Ca + 2.4 + i * 0.1, 0.07, 450);         // yemas de levadura
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                           // re-gancho
for (let i = 0; i < 5; i++) m.golpe(M + 0.8 + i * 0.25, 0.18, 120);          // el macrófago traga
for (let i = 0; i < 7; i++) m.burbuja(M + 2.2 + i * 0.25, 0.08, 520 + i * 30); // se multiplican
m.latido(M + 3.6, 0.18); m.latido(M + 4.4, 0.18); m.whoosh(M + 3.8, 1.4, 0.08); // viaja por el vaso
for (let i = 0; i < 20; i++) m.tic(S + 0.2 + i * 0.05, 0.06, 1800);          // 20 personas
for (let i = 0; i < 3; i++) m.nota(S + 1.6 + i * 0.4, 57, 0.05, 0.5, 0.4);   // los 3 con síntomas
m.golpe(E + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 4; i++) m.gota(E + 2.0 + i * 0.2, 0.2, 700 + i * 80);     // 4 nadadores entran al agua
for (let i = 0; i < 21; i++) m.tic(En + 0.3 + i * 0.07, 0.06, 2400);          // 21 días en el calendario
for (let i = 0; i < 4; i++) m.golpe(En + 3.0 + i * 0.3, 0.25, 95);            // sellos: 3 confirmados, 1 sospechoso
m.cruje(Ce + 0.6, 0.3); m.whoosh(Ce + 0.6, 0.8, 0.12); m.whoosh(Ce + 0.9, 0.8, 0.1); // la cinta de cerrado
m.nota(N + 0.4, 76, 0.05, 0.8); m.cruje(N + 1.7, 0.3);                       // el halo; se tacha "cápsula"
m.golpe(C + 0.3, 0.5, 60); m.whoosh(C + 0.35, 1.2, 0.12); m.whoosh(C + 1.6, 1.4, 0.1); // misma pisada; esporas a la nariz
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
