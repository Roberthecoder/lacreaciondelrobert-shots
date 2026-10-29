// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #41 (Laetiporus, "pollo del bosque"). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pollo Bosque base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, R = K.Repisa, Co = K.Corazon, Cu = K.Cubitos, P = K.Pregunta, Cr = K.Correoso, H = K.Hifas, E = K.Estudio, M = K.Monstruo,
  Re = K.Recupero, Cd = K.Crudo, Ex = K.Experto, N = K.Naranja, C = K.Cierre, Ou = K.Outro;

m.pad(0, M, 0.05, [45, 52, 57], 0.1);                                        // cama grave, curiosa
m.pad(M, Re + 0.3, 0.05, [44, 51, 56], 0.35);                                // tensa con el caso de la niña
m.pad(Re + 0.3, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);                       // más ligera al final
m.metal(G + 0.3, 0.15, 1800); m.whoosh(G + 0.3, 0.6, 0.08);                  // el tenedor levanta las tiras
m.golpe(G + 1.0, 0.5, 70);                                                   // sello "NO"
for (let i = 0; i < 8; i++) m.cruje(G + 1.9 + i * 0.18, 0.15);               // brotan las repisas del tronco
for (let i = 0; i < 8; i++) m.tic(R + 0.2 + i * 0.27, 0.12, 700 + i * 60);   // repisas en el encino, una tras otra
m.nota(R + 1.0, 64, 0.05, 0.8); m.nota(R + 1.6, 69, 0.05, 0.8);
m.whoosh(Co + 0.1, 0.7, 0.1); m.zumbido(Co + 0.3, 3.2, 0.025, 160);          // la lupa entra al tronco; las hifas avanzan
for (let i = 0; i < 5; i++) m.cruje(Co + 0.9 + i * 0.35, 0.18);              // se rompen las cadenas de celulosa
m.sube(Cu + 0.1, 1.9, 50, 43, 0.04);                                         // avanza la pudrición café
for (let i = 0; i < 6; i++) m.cruje(Cu + 1.0 + i * 0.25, 0.25);              // se agrieta en cubitos
m.golpe(Cu + 2.7, 0.3, 90); m.golpe(Cu + 3.2, 0.25, 100);                    // se desmorona
m.sube(P + 0.1, 1.5, 52, 64, 0.05); m.golpe(P + 1.5, 0.3, 80);              // "?" y la tache roja sobre el músculo
for (let i = 0; i < 18; i++) m.burbuja(Cr + 0.2 + i * 0.15, 0.06, 900 + (i % 4) * 200); // chisporrotea la sartén
m.zumbido(H, 4.6, 0.03, 120);                                                // microscopio
for (let i = 0; i < 6; i++) m.nota(H + 0.2 + i * 0.35, 57 + [0, 3, 5, 7, 10, 12][i], 0.035, 0.5); // crecen las hifas
m.nota(H + 2.6, 76, 0.05, 1.0);                                              // se resaltan las más gruesas
m.golpe(E + 0.2, 0.35, 80); m.tic(E + 0.4, 0.2, 1500);                       // tarjeta del caso
for (let i = 0; i < 5; i++) m.whoosh(M + 0.2 + i * 0.7, 0.5, 0.05);          // se tambalea
m.sube(M + 1.4, 1.6, 64, 76, 0.03); m.sube(M + 1.6, 1.6, 67, 60, 0.03);     // alucinaciones (glitch suave)
for (let i = 0; i < 10; i++) m.tic(Re + 0.1 + i * 0.16, 0.08, 2600);         // cronómetro
m.nota(Re + 1.2, 81, 0.05, 1.0); m.nota(Re + 1.4, 84, 0.04, 1.0);            // amanece
m.golpe(Cd + 0.8, 0.4, 75);                                                  // tache sobre lo crudo
m.sube(Cd + 1.6, 1.2, 40, 36, 0.06);                                         // estómago revuelto
m.whoosh(Ex + 0.3, 0.9, 0.1); m.nota(Ex + 1.0, 72, 0.06, 0.8); m.golpe(Ex + 1.8, 0.3, 90);
m.cruje(N + 1.1, 0.3);                                                       // se tacha "carotenos"
for (let i = 0; i < 10; i++) m.tic(N + 1.4 + i * 0.1, 0.08, 1800 + i * 80);  // se arma la molécula
m.gota(N + 3.0, 0.25, 800);                                                  // gota de colorante
m.cruje(C + 0.8, 0.5); m.cruje(C + 1.8, 0.4); m.golpe(C + 2.6, 0.3, 90);     // el tronco se desmorona en cubitos
m.nota(C + 1.6, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
