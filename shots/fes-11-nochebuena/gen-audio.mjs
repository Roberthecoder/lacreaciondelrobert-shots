// gen-audio.mjs — cama grave + efectos del Shot Festivo #11 · Navidad · Biotecnológico (nochebuena y fitoplasma). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nochebuena base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 24);
const K = m.K, E = m.ESC;
const G = K.Gancho, Br = K.Bracteas, Ct = K.Ciatios, No = K.Noches, Fo = K.Foco, Si = K.Silvestre, P = K.Pregunta, Fi = K.Fitoplasma, Ho = K.Hormonas, Es = K.Estudio, In = K.Injerto, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const campanita = (t, mm, g = 0.035) => { m.nota(t, mm, g, 1.2); m.nota(t, mm + 19, g * 0.4, 0.8); }; // brillo navideño muy suave

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.16); m.golpe(G + 0.45, 0.22, 110);                        // la maceta llega rebotando
m.whoosh(G + 0.35, 0.9, 0.12);                                               // la bráctea se desprende y gira
m.metal(G + 1.5, 0.05, 1800); m.tic(G + 1.5, 0.3, 1200);                     // tachón de «¿pétalo?»
campanita(G + 2.0, 69); campanita(G + 2.25, 76);                             // «hoja»
for (let i = 0; i < 10; i++) m.tic(Br + 0.6 + i * 0.1, 0.05, 2600 + i * 60); // se dibujan las nervaduras
m.nota(Br + 1.6, 64, 0.06, 0.9); m.nota(Br + 1.6, 76, 0.04, 0.9);            // «=»
m.whoosh(Ct, 0.7, 0.1);                                                      // acercamiento al centro
for (let i = 0; i < 8; i++) m.nota(Ct + 0.6 + i * 0.1, E[5 + (i % 5)], 0.03, 0.4); // los ciatios brillan
m.sube(Ct + 1.7, 0.5, 60, 72, 0.05);                                         // se abre la lupa
for (let i = 0; i < 13; i++) m.tic(No + 0.2 + i * 0.1, 0.06, 1500);           // el reloj se llena de noche
for (let i = 0; i < 10; i++) { m.whoosh(No + 1.6 + i * 0.36, 0.18, 0.05); m.nota(No + 1.6 + i * 0.36, E[i], 0.03, 0.5); } // pasan las semanas; se pinta de rojo
m.tic(Fo + 0.6, 0.6, 3400); m.metal(Fo + 0.62, 0.06, 2800); m.zumbido(Fo + 0.7, 2.6, 0.03, 120); // ¡clic! el foco (zumbido eléctrico)
for (let i = 0; i < 4; i++) m.nota(Fo + 0.9 + i * 0.3, E[6 - i], 0.035, 0.5, 0.6); // se queda verde (notas que bajan, tapadas)
m.golpe(Fo + 2.2, 0.2, 90);                                                  // calendario 24 dic
m.whoosh(Si, 1.4, 0.06);                                                     // viento del monte
for (let i = 0; i < 6; i++) m.nota(Si + 0.2 + i * 0.32, E[2 + i], 0.035, 0.6); // la silvestre crece
for (let i = 0; i < 4; i++) m.tic(Si + 2.2 + i * 0.1, 0.1, 900);              // la regla de metros
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                          // re-gancho
m.whoosh(Fi - 0.3, 0.8, 0.1);
for (let i = 0; i < 24; i++) m.burbuja(Fi + 0.3 + i * 0.22, 0.05, 220 + (i % 4) * 40); // la savia que fluye
for (let i = 0; i < 18; i++) m.gota(Fi + 1.4 + i * 0.14, 0.05, 700 + (i % 6) * 60); // aparecen los fitoplasmas
m.golpe(Ho + 0.3, 0.2, 120); m.metal(Ho + 0.35, 0.05, 900);                  // la balanza se ladea
for (let i = 0; i < 6; i++) { const t = Ho + 1.0 + (i + 0.55) * (3.4 / 6); m.tic(t, 0.3, 2000 + i * 200); m.nota(t, E[4 + i], 0.04, 0.5); } // pop: brota cada rama
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                  // tarjeta 1997
m.whoosh(Es + 1.8, 1.0, 0.08);                                               // la cuscuta se tiende como puente
for (let i = 0; i < 6; i++) m.sube(Es + 2.6 + i * 0.5, 0.25, 72, 79, 0.03);   // los puntitos viajan por el puente
for (let i = 0; i < 6; i++) m.tic(Es + 5.0 + (i + 0.55) * 0.3, 0.25, 2200 + i * 150); // la sana se ramifica
m.whoosh(In + 0.3, 1.0, 0.1); m.golpe(In + 1.3, 0.18, 140);                  // llega la rama y se une
for (let i = 0; i < 6; i++) m.tic(In + 1.4 + i * 0.08, 0.08, 900);            // la cinta del injerto
for (let i = 0; i < 6; i++) { const t = In + 2.4 + (i + 0.55) * (2.8 / 6); m.tic(t, 0.25, 2200 + i * 150); m.nota(t, E[5 + i], 0.035, 0.5); } // se vuelve frondosa
m.sube(Da + 0.2, 1.4, 50, 74, 0.05);                                         // el termómetro sube
for (let i = 0; i < 8; i++) m.tic(Da + 1.2 + i * 0.08, 0.15, 3000);           // los puntitos desaparecen
m.whoosh(Da + 1.7, 0.6, 0.08);
for (let i = 0; i < 2; i++) m.tic(Da + 2.5 + (i + 0.55) * 0.85, 0.25, 1800);  // pocas ramas
m.whoosh(Ci + 0.2, 0.6, 0.12);
for (let i = 0; i < 6; i++) campanita(Ci + 0.4 + i * 0.15, E[6 + i], 0.025);  // destellos navideños
m.sube(Ci + 1.2, 0.6, 60, 72, 0.04);                                         // la lupa de rayos X
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
