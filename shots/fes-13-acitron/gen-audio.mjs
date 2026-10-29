// gen-audio.mjs — cama grave + efectos del Shot Festivo #13 · Día de Reyes · Ambiental (acitrón y biznaga). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Acitron base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 113);
const K = m.K, E = m.ESC;
const G = K.Gancho, Bi = K.Biznaga, De = K.Desierto, Pu = K.Pulpa, Co = K.Corte, Al = K.Almibar, Os = K.Osmosis, P = K.Pregunta, Mu = K.Muere, Es = K.Estudio, Le = K.Ley, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, P, 0.05, [45, 52, 57]);                                              // cama grave mientras se cuenta la receta
m.pad(P, Le, 0.05, [41, 48, 53], 0.5);                                        // más grave y tapada: la planta muere, tarda en crecer
m.pad(Le, Ou + 3.0, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.12);                                                       // la rosca llega
m.whoosh(G + 0.25, 0.6, 0.16); m.sube(G + 0.3, 0.6, 57, 69, 0.05);            // el cuadrito salta
for (let i = 0; i < 6; i++) m.nota(G + 0.85 + i * 0.1, E[6 + i], 0.03, 0.4);  // brilla
m.tic(G + 1.6, 0.4, 900); m.golpe(G + 1.62, 0.2, 140);                        // se tacha «¿fruta?»
m.nota(G + 2.4, 64, 0.06, 0.8); m.nota(G + 2.4, 69, 0.05, 0.8);               // «es un cactus»
m.whoosh(Bi - 0.2, 0.6, 0.14); m.golpe(Bi + 0.4, 0.3, 70);                    // crece la biznaga
m.cruje(Bi + 0.5, 0.35);                                                      // espinas
for (let i = 0; i < 3; i++) m.nota(Bi + 1.7 + i * 0.3, E[5 + i * 2], 0.05, 0.7); // abren las flores
for (let i = 0; i < 8; i++) m.nota(De + 0.6 + i * 0.12, E[3 + (i % 5)], 0.035, 0.35); // pings del norte
for (let i = 0; i < 2; i++) m.nota(De + 2.4 + i * 0.15, E[8 + i], 0.05, 0.6);  // pings del sur
m.whoosh(Pu + 0.1, 0.5, 0.12); m.golpe(Pu + 0.3, 0.2, 110);                   // el corte del tallo
m.sube(Pu + 1.0, 0.6, 60, 72, 0.04);                                          // abre la lupa
for (let i = 0; i < 10; i++) m.gota(Pu + 1.4 + i * 0.28, 0.07, 700 + (i % 4) * 90); // agua en las células
for (let i = 0; i < 10; i++) m.tic(Co + 0.4 + i * 0.05, 0.05, 1600 + i * 60);  // la regla
m.whoosh(Co + 2.0, 0.8, 0.16); m.cruje(Co + 2.0, 0.4);                        // salen las costillas con espinas
for (let i = 0; i < 4; i++) m.metal(Co + 3.3 + i * 0.28, 0.05, 1900);          // cuchillo: cubos
for (let i = 0; i < 6; i++) m.gota(Al + 0.3 + i * 0.13, 0.12, 500 + i * 20);   // los cubos caen al almíbar
for (let i = 0; i < 22; i++) m.burbuja(Al + 1.0 + i * 0.17, 0.07, 280 + (i % 5) * 50); // hierve
for (let i = 0; i < 7; i++) m.tic(Al + 1.2 + i * 0.5, 0.06, 1400);            // días del calendario
for (let i = 0; i < 18; i++) m.gota(Os + 0.6 + i * 0.28, 0.05, 1100 - (i % 6) * 60); // sale agua
for (let i = 0; i < 16; i++) m.tic(Os + 0.8 + i * 0.3, 0.04, 2600);           // entra azúcar
m.sube(Os + 1.2, 4.2, 52, 64, 0.03);                                          // el medidor sube
m.sube(P + 0.1, 1.4, 52, 60, 0.05);                                           // pregunta
m.whoosh(Mu + 0.5, 1.0, 0.16); m.cruje(Mu + 0.6, 0.5);                        // tirón de las raíces
m.golpe(Mu + 1.6, 0.35, 60);                                                  // golpe sordo
for (let i = 0; i < 4; i++) m.nota(Mu + 1.8 + i * 0.35, E[5 - i], 0.04, 0.8, 0.5); // se apaga
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                   // tarjeta 2008
for (let i = 0; i < 25; i++) m.tic(Es + 0.6 + i * 0.19, 0.04, 1200 + i * 30); // un tic por año
m.nota(Es + 5.4, 69, 0.06, 1.0); m.nota(Es + 5.4, 76, 0.04, 1.0);             // «≈ 25 años»
m.whoosh(Le + 0.1, 0.5, 0.1); m.tic(Le + 0.5, 0.2, 900);                      // el documento
m.sube(Le + 1.4, 0.8, 57, 69, 0.05); m.golpe(Le + 2.2, 0.25, 100);            // sube de escalón
for (const d of [0.7, 1.3, 1.9]) { m.whoosh(Da + d - 0.35, 0.35, 0.08); m.golpe(Da + d, 0.3, 120); m.metal(Da + d + 0.02, 0.05, 900); } // bolsas de azúcar a la báscula
m.nota(Da + 2.4, 64, 0.05, 0.8); m.nota(Da + 2.4, 72, 0.04, 0.8);
m.whoosh(Ci + 0.1, 0.6, 0.12);
for (let i = 0; i < 6; i++) m.nota(Ci + 0.4 + i * 0.12, E[7 + i], 0.03, 0.4); // brilla el cuadrito
m.sube(Ci + 0.8, 0.6, 60, 72, 0.04);                                          // abre la lupa
m.whoosh(Ci + 3.7, 0.7, 0.12);                                                // cambia por ate
for (let i = 0; i < 4; i++) m.nota(Ci + 4.0 + i * 0.2, E[4 + i], 0.05, 0.7);  // la biznaga sigue en el desierto
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
