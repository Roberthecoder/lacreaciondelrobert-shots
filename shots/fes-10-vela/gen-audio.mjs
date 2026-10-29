// gen-audio.mjs — cama grave + efectos del Shot Festivo #10 · Posadas · Científico (la velita: cera hecha gas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vela base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 61);
const K = m.K, E = m.ESC;
const G = K.Gancho, Co = K.Copita, Pa = K.Pabilo, Va = K.Vapor, Az = K.Azul, P = K.Pregunta, Ho = K.Hollin, Go = K.Gota, Es = K.Espacio, Et = K.Estudio, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Es, 0.05, [45, 52, 57]);                                            // cama grave y cálida
m.pad(Es, Et, 0.035, [45, 52, 57], 0.6);                                       // en el espacio: más ahogada y flotante
m.pad(Et, Ou + 3.0, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.14);                                                       // la velita entra
m.tic(G + 0.25, 0.5, 3400); m.cruje(G + 0.27, 0.3); m.whoosh(G + 0.3, 0.45, 0.18); // chispazo: la flama se aviva
m.nota(G + 2.6, 69, 0.05, 0.8); m.nota(G + 2.6, 76, 0.04, 0.8);              // "cera hecha gas"
for (let i = 0; i < 6; i++) m.gota(Co + 0.5 + i * 0.35, 0.1, 500 + i * 25);  // la cera se derrite
for (let i = 0; i < 3; i++) m.whoosh(Co + 2.4 + i * 0.5, 0.6, 0.07);          // el aire que sube por los lados
m.nota(Co + 3.2, 64, 0.05, 0.8);                                              // la copita
for (let i = 0; i < 10; i++) m.nota(Pa + 0.4 + i * 0.28, E[2 + i], 0.03, 0.35); // el agua y la cera trepan (notas que suben)
m.nota(Pa + 1.6, 72, 0.05, 0.9);                                              // "capilaridad"
m.zumbido(Va + 0.2, 3.4, 0.025, 110);                                         // siseo del vapor
for (let i = 0; i < 8; i++) m.tic(Va + 2.2 + i * 0.16, 0.05, 1400 + i * 60);  // llega el oxígeno
m.whoosh(Va + 3.6, 0.7, 0.2); m.golpe(Va + 3.7, 0.2, 70);                     // ¡arde! la capa de fuego
for (let i = 0; i < 12; i++) m.nota(Az + 0.7 + i * 0.32, E[8 + (i % 5)], 0.035, 0.3); // destellos azules (uno por fragmento)
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                           // la pregunta
m.cruje(Ho + 0.3, 0.25);                                                      // se forman los granitos
for (let i = 0; i < 10; i++) m.tic(Ho + 1.8 + i * 0.22, 0.06, 900 + i * 120); // se calientan y empiezan a brillar
m.nota(Ho + 2.8, 69, 0.05, 1.0); m.nota(Ho + 2.8, 76, 0.04, 1.0);
m.sube(Go + 0.4, 1.4, 45, 57, 0.06); m.whoosh(Go + 0.4, 1.4, 0.14);          // el aire caliente estira la flama
for (let i = 0; i < 6; i++) m.tic(Go + 2.0 + i * 0.25, 0.04, 2600);           // el hollín sube a la punta
m.whoosh(Es, 0.8, 0.1); m.sube(Es + 1.4, 2.0, 57, 69, 0.04);                  // al espacio: la flama se redondea
for (let i = 0; i < 4; i++) m.nota(Es + 3.6 + i * 0.4, E[9 - i], 0.025, 0.9); // azul tenue
m.golpe(Et + 0.2, 0.3, 80); m.metal(Et + 0.25, 0.08, 1500);                   // tarjeta 1860
for (let i = 0; i < 40; i++) m.tic(Et + 2.4 + m.rnd() * 1.6, 0.05, 900 + m.rnd() * 900); // aplausos de los niños
m.whoosh(Da + 0.2, 0.6, 0.22);                                                // el soplido
m.zumbido(Da + 0.8, 2.2, 0.02, 170);                                          // sube el humo blanco
m.whoosh(Da + 2.0, 1.0, 0.08);                                                // se acerca el cerillo
m.sube(Da + 3.5, 0.8, 76, 57, 0.08); m.whoosh(Da + 3.5, 0.8, 0.2);            // el fuego baja por el humo
m.golpe(Da + 4.3, 0.3, 90); m.nota(Da + 4.4, 69, 0.07, 1.0); m.nota(Da + 4.4, 76, 0.05, 1.0); // ¡se vuelve a prender!
m.whoosh(Ci + 0.2, 0.6, 0.12); m.sube(Ci + 1.0, 0.8, 57, 69, 0.05);          // regreso a la velita y la lupa
for (let i = 0; i < 6; i++) m.nota(Ci + 1.4 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
