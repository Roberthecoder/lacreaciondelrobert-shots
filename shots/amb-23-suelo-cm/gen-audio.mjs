// gen-audio.mjs — cama grave + efectos del Shot Ambiental #23 (el suelo está vivo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Suelo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 123);
const K = m.K;
const G = K.Gancho, Mi = K.Microbios, Ac = K.Acaros, Lo = K.Lombrices, P = K.Pregunta, Si = K.Siglos, Es = K.Estudio,
  De = K.Degradado, Ep = K.Especies, Mil = K.Milpa, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                                 // cama grave (tierra)
m.golpe(G + 0.3, 0.35, 70); m.cruje(G + 0.4, 0.25); m.whoosh(G + 0.5, 0.6, 0.08);      // la pala se clava y levanta
m.golpe(G + 1.0, 0.2, 140);                                                             // tierra en la cuchara
for (let i = 0; i < 8; i++) m.burbuja(G + 2.1 + i * 0.3, 0.04, 500 + i * 60);           // lupa: algo se mueve adentro
m.whoosh(Mi - 0.2, 0.9, 0.08);                                                          // bajamos al microscopio
for (let i = 0; i < 14; i++) m.tic(Mi + 0.4 + i * 0.3, 0.035, 1800 + (i % 4) * 200);   // bacterias
m.cruje(Mi + 1.2, 0.2); m.cruje(Mi + 2.6, 0.2);                                         // la hoja se deshace
for (let i = 0; i < 6; i++) m.nota(Mi + 1.8 + i * 0.4, 64 + (i % 3) * 3, 0.03, 0.4);    // nutrientes que salen
for (let i = 0; i < 8; i++) m.tic(Ac + 0.2 + i * 0.18, 0.03, 2600);                    // pasitos del ácaro
m.sube(Ac + 1.5, 0.3, 64, 76, 0.05); m.tic(Ac + 1.55, 0.06, 3000);                   // salto del colémbolo
m.sube(Lo, 2.2, 45, 50, 0.04);                                                          // la lombriz avanza
for (let i = 0; i < 7; i++) m.golpe(Lo + 0.3 + i * 0.35, 0.12, 160 + i * 10);          // grumos
for (let i = 0; i < 8; i++) m.gota(Lo + 1.7 + i * 0.3, 0.06, 900 + (i % 3) * 120);     // gotas sobre los grumos
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                                    // pregunta
for (let i = 0; i < 12; i++) m.tic(Si + 0.2 + i * 0.2, 0.04, 1200);                    // contador de años
for (let i = 0; i < 14; i++) m.gota(Si + 2.9 + i * 0.07, 0.07, 800 + (i % 4) * 100);   // aguacero que barre el centímetro
m.whoosh(Si + 3.0, 0.8, 0.1);
m.golpe(Es + 0.2, 0.3, 90);                                                             // tarjeta del estudio
for (let i = 0; i < 10; i++) m.gota(Es + 2.9 + i * 0.12, 0.05, 900);                  // lluvia sobre la Tierra
m.golpe(Es + 3.6, 0.45, 50); m.nota(Es + 3.7, 45, 0.06, 1.4);                           // 35.9 mil millones de t
m.golpe(De + 0.3, 0.3, 70); m.cruje(De + 1.2, 0.35); m.sube(De + 1.0, 1.4, 57, 48, 0.04); // el tercio que se agrieta
m.golpe(Ep + 0.2, 0.3, 90);
for (let i = 0; i < 6; i++) m.burbuja(Ep + 2.6 + i * 0.22, 0.06, 300 - i * 20);         // 6 especies que se hunden
m.sube(Mil - 0.3, 1.9, 52, 64, 0.05); m.nota(Mil + 0.4, 64, 0.05, 0.8); m.nota(Mil + 0.9, 69, 0.05, 0.8); // crece la milpa
m.golpe(Mil + 0.3, 0.25, 100);
for (let i = 0; i < 6; i++) m.burbuja(Mil + 3.7 + i * 0.3, 0.04, 600);                 // lupa: nódulos
m.golpe(C - 0.3, 0.3, 70); m.cruje(C - 0.2, 0.2);                                       // la pala otra vez
for (let i = 0; i < 12; i++) m.gota(C + 2.4 + i * 0.25, 0.05, 900 + (i % 3) * 120);    // lluvia al final
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
