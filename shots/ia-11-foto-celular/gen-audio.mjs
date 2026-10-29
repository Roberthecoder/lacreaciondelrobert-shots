// gen-audio.mjs — cama grave + efectos del Shot IA #11 (la foto de noche son muchas fotos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot FotoCelular base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const G = K.Gancho, S = K.Sensor, Pu = K.Pulso, R = K.Rafaga, A = K.Alinear, P = K.Pregunta, Cl = K.Clasico, Co = K.Color, E = K.Estudio, Te = K.Temblor, H = K.Hoy, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                            // cama nocturna grave
m.tic(G + 0.02, 0.4, 3200); m.golpe(G + 0.05, 0.3, 90);                           // clic de la cámara (cuadro 0)
for (let i = 0; i < 13; i++) m.tic(G + 0.2 + i * 0.1, 0.12, 1600 + i * 60);         // las 13 fotos del abanico
m.sube(G + 1.4, 1.0, 52, 72, 0.04);                                               // ×13
m.whoosh(S - 0.3, 0.6, 0.12);
for (let i = 0; i < 26; i++) m.gota(S + 0.6 + (i * 0.146) % 3.8 + 0.7, 0.05, 1400 + (i % 6) * 120); // fotones que llegan
m.zumbido(S + 2.6, 2.2, 0.015, 900);                                              // siseo del ruido
m.whoosh(Pu + 0.4, 1.2, 0.1);                                                     // foto barrida
for (let i = 0; i < 13; i++) m.tic(R + 0.3 + i * 0.2, 0.18, 2600);                // ráfaga: un obturador por foto
for (let i = 0; i < 8; i++) m.tic(A + 0.4 + i * 0.22, 0.08, 1200 + i * 80);        // los pedacitos se acomodan
m.sube(A + 2.4, 1.8, 48, 60, 0.03);                                               // juntar: baja el ruido
m.nota(A + 4.0, 64, 0.06, 1.0); m.nota(A + 4.05, 69, 0.05, 1.0);                  // foto limpia
m.sube(P + 0.05, 1.4, 50, 62, 0.05);                                              // pregunta
m.golpe(Cl + 0.9, 0.3, 80); m.cruje(Cl + 2.0, 0.3);                               // tarjeta · tache a la red
m.burbuja(Co + 0.8, 0.12, 500); m.burbuja(Co + 1.4, 0.12, 650); m.nota(Co + 1.7, 72, 0.05, 0.6); // color corregido
for (let i = 0; i < 12; i++) m.tic(Co + 3.0 + i * 0.06, 0.04, 2200);               // miniaturas
m.golpe(E + 0.15, 0.35, 80); m.sube(E + 2.4, 0.8, 72, 52, 0.04);                   // estudio · la luz baja
m.zumbido(Te + 0.2, 6.0, 0.025, 120);                                             // temblor de la mano
for (let i = 0; i < 6; i++) m.nota(Te + 1.2 + i * 0.12, 67 + (i % 3) * 2, 0.03, 0.3); // la rejilla se llena
m.whoosh(H, 0.5, 0.1); m.sube(H + 0.6, 1.4, 55, 67, 0.035);                       // onda de la red
m.whoosh(C + 1.0, 1.5, 0.1); m.tic(C + 2.55, 0.4, 3200); m.golpe(C + 2.6, 0.3, 90); // el abanico se cierra · clic
m.nota(C + 2.8, 69, 0.05, 1.0); m.nota(C + 2.85, 76, 0.04, 1.0);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
