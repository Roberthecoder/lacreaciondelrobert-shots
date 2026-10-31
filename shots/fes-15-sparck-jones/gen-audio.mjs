// gen-audio.mjs — cama grave + efectos del Shot Festivo #15 · Mujer y Niña en la Ciencia · IA (Karen Spärck Jones). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot SparckJones base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 15);
const K = m.K, E = m.ESC;
const G = K.Gancho, Bu = K.Busqueda, De = K.De, Ra = K.Rajas, Rr = K.Rara, Re = K.Repite, P = K.Pregunta, Es = K.Estudio, Pr = K.Prueba, H = K.Herencia, IA = K.IA, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const BUSCA = 'receta de tamales de rajas';

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.14);                                                       // sube el celular
m.tic(G + 0.4, 0.5, 2600); for (let i = 0; i < 4; i++) m.nota(G + 0.45 + i * 0.08, E[8 + i], 0.035, 0.4); // toque de la lupa + chispitas
m.whoosh(G + 1.0, 0.5, 0.1); m.golpe(G + 1.4, 0.22, 110);                     // entra la foto de Karen
for (let i = 0; i < BUSCA.length; i++) m.tic(Bu + 0.1 + i * 1.8 / BUSCA.length, 0.18, 3000 + (i % 4) * 200); // tecleo
m.golpe(Bu + 1.6, 0.25, 140); m.nota(Bu + 1.7, 69, 0.05, 0.5);                // salta el tamal
// «de»: muchas páginas, blips bajitos y grises
const ORDEN = 26; for (let i = 0; i < ORDEN; i++) m.nota(De + 0.5 + i * 0.075, E[2 + (i % 3)], 0.022, 0.25);
for (let i = 0; i < 6; i++) m.nota(De + 1.5 + i * 0.12, E[5 - i] || 57, 0.03, 0.4);   // el medidor casi no sube
// «rajas»: pocas páginas, brillantes
for (let i = 0; i < 3; i++) { m.nota(Ra + 0.55 + i * 0.5, E[9 + i], 0.07, 0.9); m.nota(Ra + 0.55 + i * 0.5, E[9 + i] + 12, 0.03, 0.9); }
m.sube(Ra + 1.8, 1.0, 57, 76, 0.05);                                          // el medidor sube alto
m.tic(Rr + 0.7, 0.2, 1400); m.golpe(Rr + 1.3, 0.35, 70); m.metal(Rr + 1.35, 0.12, 900); // caen las pesas, la balanza se inclina
m.whoosh(Re + 1.2, 1.1, 0.12); for (let i = 0; i < 3; i++) m.tic(Re + 1.4 + i * 0.3, 0.12, 2000); m.nota(Re + 2.4, 72, 0.06, 0.7); // la lista se reacomoda
m.zumbido(P + 0.1, 0.5, 0.05, 220); m.motor(P + 0.7, 2.4, 0.06);             // se apaga el celular; zumba la computadora de 1972
for (let i = 0; i < 8; i++) m.tic(P + 0.9 + i * 0.25, 0.08, 1200 + (i % 2) * 600);   // foquitos
m.sube(P + 0.2, 1.4, 52, 64, 0.04);
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                   // tarjeta 1972
m.whoosh(Es + 2.8, 0.5, 0.1);
for (const [t, f] of [[3.85, 140], [4.45, 100], [5.05, 70]]) { m.golpe(Es + t, 0.3 + (140 - f) / 250, f); m.metal(Es + t, 0.06, 700); } // cada pesita cae en su ficha
for (let k = 0; k < 3; k++) { m.sube(Pr + 0.4 + k * 0.3, 0.5, 52, 57, 0.03); m.sube(Pr + 1.8 + k * 0.35, 0.8, 57, 69 + k * 2, 0.045); } // barras gris y dorada
m.golpe(H + 0.15, 0.3, 90); m.nota(H + 0.2, 57, 0.06, 1.4); m.nota(H + 0.2, 64, 0.04, 1.4); // se enciende IDF
for (let i = 0; i < 11; i++) m.nota(H + 1.7 + i * 0.22, E[4 + (i % 7)], 0.04, 0.5);       // cada fórmula que hereda
m.whoosh(IA + 0.1, 0.5, 0.1); for (let i = 0; i < 3; i++) m.nota(IA + 0.3 + i * 0.1, E[10 + i], 0.03, 0.4); // aparece el asistente
m.whoosh(IA + 0.9, 1.1, 0.12); m.metal(IA + 2.0, 0.1, 600); m.tic(IA + 2.2, 0.2, 1800); m.whoosh(IA + 2.5, 1.1, 0.12); // la lupita va al archivero y regresa
for (let i = 0; i < 3; i++) m.tic(IA + 3.8 + i * 0.3, 0.1, 2400);              // responde
m.whoosh(Da + 0.1, 0.5, 0.1); for (let i = 0; i < 3; i++) m.golpe(Da + 0.75 + i * 0.3, 0.16, 160 + i * 30); // entran las niñas
m.golpe(Da + 3.3, 0.3, 80); m.nota(Da + 3.4, 64, 0.06, 1.2); m.nota(Da + 3.4, 69, 0.05, 1.2); // el lema
for (let i = 0; i < 5; i++) m.nota(Ci + 0.5 + i * 0.25, E[5 + i], 0.04, 0.5);    // regresan las palabras con su peso
m.sube(Ci + 1.0, 0.9, 57, 69, 0.04); for (let i = 0; i < 6; i++) m.nota(Ci + 2.6 + i * 0.1, E[8 + i], 0.03, 0.5); // destellos
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
