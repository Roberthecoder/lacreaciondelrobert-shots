// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #25 (maíz Bt). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bt base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 25);
const K = m.K;
const G = K.Gancho, Ge = K.Gen, C = K.Cry, Mo = K.Mordida, Pr = K.Pregunta, Al = K.Alcalino, Re = K.Receptor, Tu = K.Tu, Or = K.Organico, Es = K.Estudio, Mx = K.Mexico, Ci = K.Cierre, Ou = K.Outro;
const PR = Es + 3.0, P2010 = Es + 6.0;

// cama: abierta en la milpa, más grave y cerrada dentro de la oruga, abierta otra vez al final
m.pad(0, Al, 0.05, [45, 52, 57]);
m.pad(Al, Or, 0.05, [40, 47, 52], 0.5);
m.pad(Or, Ou + 3.5, 0.05, [45, 52, 57]);

for (let i = 0; i < 4; i++) m.cruje(G + i * 0.9, 0.35);                      // mordiscos del gancho (uno por mordida dibujada)
m.metal(G + 1.6, 0.1, 600);                                                   // «¿fumigada?» se tacha
m.whoosh(Ge + 0.4, 0.6, 0.12);                                                // se abre la Lupa al suelo
m.nota(Ge + 1.6, 69, 0.06, 0.8);                                              // brilla el cristal
m.sube(Ge + 2.0, 1.8, 57, 69, 0.04);                                          // el gen sube a la planta
m.whoosh(C + 0.8, 0.6, 0.12);                                                 // Lupa a las células de la hoja
for (let i = 0; i < 11; i++) m.nota(C + 1.0 + i * 0.12, 72 + (i % 4) * 2, 0.025, 0.3); // se encienden las proteínas
for (let i = 0; i < 3; i++) m.cruje(Mo + i * 1.1, 0.4);                       // el cogollero muerde
for (let i = 0; i < 4; i++) m.tic(Mo + 0.6 + i * 0.45, 0.06, 1600);           // se las traga
m.sube(Pr + 0.1, 1.4, 52, 62, 0.05);                                          // pregunta
m.whoosh(Al + 0.2, 0.7, 0.12);                                                // Lupa al intestino
m.sube(Al + 1.0, 1.6, 48, 60, 0.04);                                          // el medidor sube a lo alcalino
for (let i = 0; i < 6; i++) m.burbuja(Al + 1.6 + i * 0.3, 0.06, 450);         // el cristal se disuelve y se activa
for (let i = 0; i < 4; i++) m.tic(Re + 1.5 + i * 0.35, 0.18, 2600);           // llave en cerradura: clic
for (let i = 0; i < 4; i++) m.gota(Re + 2.4 + i * 0.2, 0.12, 700);            // se abren los poros
m.zumbido(Re + 2.6, 1.8, 0.03, 160);                                          // se escapa el agua
for (let i = 0; i < 3; i++) m.cruje(Tu + 1.1 + i * 0.4, 0.25);                // la proteína se rompe en el ácido
m.tic(Tu + 2.7, 0.15, 900);                                                   // rebota: no hay receptor
m.whoosh(Or + 0.6, 1.4, 0.07);                                                // el aspersor
m.golpe(Es + 0.2, 0.32, 80);                                                  // tarjeta 1995
for (let i = 0; i < 6; i++) m.cruje(PR + 0.3 + i * 0.45, 0.25);               // en Puerto Rico siguen comiendo
m.golpe(P2010, 0.32, 80);                                                     // tarjeta 2010
for (let i = 0; i < 5; i++) m.pluck ? m.pluck(Mx + 0.4 + i * 0.2, 64 + i * 2, 0.05) : m.nota(Mx + 0.4 + i * 0.2, 64 + i * 2, 0.05, 0.4); // maíces nativos
m.golpe(Mx + 1.2, 0.3, 90);                                                   // la Constitución
m.metal(Mx + 2.4, 0.12, 500);                                                 // se tacha el costal
for (let i = 0; i < 6; i++) m.nota(Ci + 0.3 + i * 0.35, 69 + (i % 3) * 3, 0.03, 0.4); // la hoja brilla por dentro
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
