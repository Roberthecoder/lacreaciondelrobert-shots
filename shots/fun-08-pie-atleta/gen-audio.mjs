// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #08 (pie de atleta). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pie de Atleta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 8);
const K = m.K, E = m.ESC;
const G = K.Gancho, N = K.Nombre, Q = K.Queratina, En = K.Enzimas, L = K.Lugar, P = K.Pregunta, Es = K.Estudio, Hu = K.Humedad, R = K.Resultado, Co = K.Contagio, S = K.Sirve, D = K.Dato, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 4; i++) m.tic(G + 0.3 + i * 0.18, 0.12, 3000);           // la piel se pela
m.cruje(G + 2.2, 0.3);                                                       // se tacha "¿solo humedad?"
m.zumbido(G + 2.4, 1.5, 0.04, 200);                                          // lupa de rayos X
m.nota(N + 1.2, 64, 0.05, 0.6); m.nota(N + 1.8, 67, 0.05, 0.6);
m.sube(Q, 1.0, 45, 57, 0.04);                                                // bajamos al corte de piel
m.motor(En - 0.4, 3.5, 0.04);                                                // avanzan las hifas
for (let i = 0; i < 10; i++) m.burbuja(En + 0.8 + i * 0.3, 0.06, 400 + i * 30); // enzimas
m.nota(L + 0.4, 69, 0.07, 0.9);
m.sube(P + 0.1, 1.3, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 12; i++) m.tic(Es + 2.6 + i * 0.1, 0.05, 1600);          // 420 pacientes
m.sube(Hu + 0.4, 1.6, 50, 66, 0.05);
for (let i = 0; i < 8; i++) m.gota(Hu + 0.6 + i * 0.5, 0.12, 900 + (i % 3) * 120); // humedad
for (let i = 0; i < 7; i++) m.burbuja(R + 0.8 + i * 0.15, 0.06, 500);        // brota más hongo
for (let i = 0; i < 4; i++) m.golpe(Co + 0.2 + i * 0.5, 0.2, 120);           // íconos de contagio
m.whoosh(S + 0.2, 0.8, 0.1); for (let i = 0; i < 6; i++) m.tic(S + 1.1 + i * 0.12, 0.08, 1400); // la toalla seca
m.nota(S + 0.3, 72, 0.05, 0.6); m.nota(S + 1.8, 76, 0.05, 0.6);
m.sube(D + 0.3, 1.4, 50, 69, 0.05);
for (let i = 0; i < 20; i++) m.tic(D + 1.0 + i * 0.1, 0.04, 2000 + (i % 4) * 150); // se llena la cuadrícula
m.zumbido(C + 1.0, 1.5, 0.04, 200); m.nota(C + 2.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
