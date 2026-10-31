// gen-audio.mjs — cama grave + efectos del Shot Festivo #10 · Posadas · Científico (el tejocote del ponche). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ponche base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 1216);
const K = m.K, E = m.ESC;
const G = K.Gancho, Fi = K.Firme, Me = K.Membrana, Pg = K.Pegamento, P = K.Pregunta, De = K.Despega, Pc = K.Pectina, Na = K.Nativo, Es = K.Estudio, Se = K.Setas, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);                                       // cama grave y cálida
for (let i = 0; i < 14; i++) m.burbuja(G + i * 0.22, 0.07, 280 + (i % 5) * 50); // el ponche hierve
m.whoosh(G + 0.2, 0.9, 0.12); m.gota(G + 1.1, 0.15, 500);                     // el cucharón saca el tejocote
m.cruje(G + 1.9, 0.25); m.golpe(G + 2.0, 0.12, 120);                           // se aprieta y se abre en grumitos
m.nota(G + 2.7, 69, 0.05, 0.8); m.nota(G + 2.7, 76, 0.04, 0.8);               // "se despega"
m.whoosh(Fi, 0.5, 0.12); m.golpe(Fi + 0.45, 0.25, 110); m.golpe(Fi + 0.75, 0.1, 140); // el tejocote crudo cae y rebota
m.sube(Fi + 1.2, 0.6, 57, 69, 0.05);                                          // se abre la lupa
for (let i = 0; i < 8; i++) m.nota(Me + 0.2 + i * 0.18, E[2 + i], 0.03, 0.3); // el termómetro sube
for (let i = 0; i < 14; i++) m.burbuja(Me + 1.6 + i * 0.12, 0.08, 700 + (i % 4) * 120); // pop de cada membrana
for (let i = 0; i < 10; i++) m.gota(Me + 1.9 + i * 0.2, 0.07, 900 + (i % 3) * 100); // sale el agua
m.sube(Me + 2.6, 2.0, 64, 52, 0.04);                                          // se desinflan
m.zumbido(Pg + 1.0, 2.6, 0.025, 160);                                         // el pegamento brilla
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                           // la pregunta
for (let i = 0; i < 14; i++) m.tic(De + 0.4 + i * 0.13, 0.07, 2000 + (i % 4) * 300); // se cortan las cadenas
m.whoosh(De + 2.4, 1.6, 0.1); for (let i = 0; i < 5; i++) m.nota(De + 2.6 + i * 0.35, E[9 - i], 0.03, 0.5); // las células se separan
m.sube(Pc + 0.8, 1.4, 57, 72, 0.05);                                          // el medidor de pectina
for (let i = 0; i < 10; i++) m.gota(Pc + 2.1 + i * 0.08, 0.06, 1100);        // la pectina viaja a los frascos
m.golpe(Pc + 4.6, 0.2, 100); m.golpe(Pc + 4.75, 0.15, 120);                  // cuajan (toc)
m.whoosh(Na + 0.6, 1.0, 0.08); m.nota(Na + 2.0, 64, 0.05, 0.8);               // el Eje Neovolcánico y el árbol
for (let i = 0; i < 4; i++) m.metal(Na + 3.5 + i * 0.25, 0.05, 1800 + i * 200); // campanitas de la piñata
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                   // tarjeta 2016
for (let i = 0; i < 10; i++) m.tic(Es + 1.3 + i * 0.1, 0.05, 2600);           // caen la pectina y la cera
for (let i = 0; i < 14; i++) m.metal(Es + 2.6 + i * 0.09, 0.025, 700);        // se revuelve
m.whoosh(Es + 4.2, 2.0, 0.08);                                                // la brocha
for (let i = 0; i < 20; i++) m.tic(Se + 0.6 + i * 0.15, 0.04, 1500);          // los 20 días
m.nota(Se + 3.8, 69, 0.05, 0.9);                                              // "con capa: pierde menos"
m.nota(Da + 0.4, 45, 0.09, 1.2); m.nota(Da + 1.0, 44, 0.09, 1.2);            // alerta (dos notas graves)
m.whoosh(Da + 2.4, 0.8, 0.14); m.zumbido(Da + 3.0, 2.0, 0.03, 120);          // la etiqueta cae: adelfa
m.whoosh(Ci + 0.2, 0.6, 0.12); m.sube(Ci + 1.0, 0.8, 57, 69, 0.05);          // regreso a la olla y la lupa
for (let i = 0; i < 6; i++) m.nota(Ci + 1.4 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
