// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #53 (¿quieres revivir un mamut?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mamut base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
const G = K.Gancho, P1 = K.Paso1, Ro = K.Roto, P2 = K.Paso2, P3 = K.Paso3, P4 = K.Paso4, Pr = K.Pregunta, Ra = K.Raton, Oj = K.Ojo, P5 = K.Paso5, Bu = K.Bucardo, Pu = K.Pulmones, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Pu, 0.05, [40, 47, 52]);                                     // cama grave y fría, sin golpe
m.whoosh(0, 3.6, 0.03);                                                 // viento de tundra muy bajo
m.pad(Pu, Ci, 0.03, [40, 45], 0.5);                                     // el bucardo: más baja y tapada
m.pad(Ci, Ou + 3.5, 0.05, [40, 47, 52]);
// gancho: el manual cae y el hielo se agrieta
m.whoosh(G + 0.05, 0.5, 0.08); m.golpe(G + 0.55, 0.3, 90);
for (let i = 0; i < 6; i++) m.cruje(G + 0.3 + i * 0.18, 0.12);
// un clic por paso: palomita (agudo y alegre), tache (grave), reloj de arena (sordo)
const paso = (t) => { m.tic(t, 0.1, 1600); m.nota(t, 69, 0.06, 0.3); };
paso(P1); paso(P2); paso(P3); paso(P4); paso(P5);
m.nota(P1 + 2.6, 45, 0.09, 0.6); m.metal(P1 + 2.6, 0.08, 300);          // ❌ no hay célula viva
m.metal(P1 + 0.6, 0.06, 2400);                                           // la pinza toca el hielo
m.whoosh(P1 + 1.1, 0.5, 0.05);                                           // se abre la Lupa
// el ADN se rompe: cristalitos de hielo
for (let i = 0; i < 12; i++) m.nota(Ro + 0.6 + i * 0.08, 84 + (i % 5) * 2, 0.025, 0.25);
// las piezas encajan (12) y la palomita
for (let i = 0; i < 12; i++) m.tic(P2 + 1.2 + i * 0.18, 0.06, 1100);
m.nota(P2 + 3.0, 76, 0.07, 0.6); m.nota(P2 + 3.1, 81, 0.06, 0.6);
// comparar: las diferencias brillan
for (let i = 0; i < 3; i++) m.nota(P3 + 3.0 + i * 0.15, 79 + i * 2, 0.05, 0.4);
m.nota(P3 + 3.6, 76, 0.07, 0.6); m.nota(P3 + 3.7, 81, 0.06, 0.6);
// CRISPR: chasquido de tijeras y chips
for (let i = 0; i < 3; i++) m.metal(P4 + 1.0 + i * 0.2, 0.07, 2000);
for (let i = 0; i < 3; i++) m.tic(P4 + 1.8 + i * 0.4, 0.07, 900);
m.gota(P4 + 3.4, 0.1, 500);                                              // ⏳
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                     // pregunta
m.golpe(Ra + 0.9, 0.3, 80);                                              // sello de la tarjeta
m.whoosh(Ra + 2.4, 1.8, 0.06); for (let i = 0; i < 8; i++) m.burbuja(Ra + 2.5 + i * 0.2, 0.05, 900); // ¡puf! crece el pelo
m.metal(Oj + 1.4, 0.06, 500);                                            // se tacha el mito
for (let i = 0; i < 22; i++) m.tic(P5 + 0.8 + i * 0.11, 0.04, 2200);     // 22 hojas = 22 meses
m.golpe(P5 + 2.6, 0.25, 70); m.gota(P5 + 3.6, 0.1, 500);
m.golpe(Bu + 1.0, 0.3, 80);                                              // tarjeta 2003
m.latido(Pu + 0.2, 0.12); m.latido(Pu + 1.0, 0.08); m.latido(Pu + 1.9, 0.04); // el corazón que se apaga
m.whoosh(Pu + 0.4, 0.5, 0.04);
for (let i = 0; i < 5; i++) m.tic(Ci + 0.6 + i * 0.35, 0.07, i === 0 ? 700 : i < 3 ? 1600 : 1000); // casillas del cierre
m.burbuja(Ci + 2.3, 0.08, 700);                                          // el ratón cae en el hielo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
