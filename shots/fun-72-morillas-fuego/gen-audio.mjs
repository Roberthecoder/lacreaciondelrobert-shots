// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #72 (morillas después del fuego). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Morillas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 72);
const K = m.K;
const G = K.Gancho, Mo = K.Morilla, Es = K.Especies, Ci = K.Cifra, Se = K.Segundo, P = K.Pregunta, Mi = K.Misterio, U = K.Ultimo, E = K.Estudio, Mx = K.Mexico, F = K.Falsa, C = K.Cierre, Ou = K.Outro;

m.pad(0, G + 2.4, 0.05, [40, 47, 52], 0.5);                                   // oscura y cálida (brasas), ahogada
m.pad(G + 2.4, Mi, 0.05, [45, 52, 57], 0.1);                                  // se abre al brotar las morillas
m.pad(Mi, E, 0.05, [43, 50, 55], 0.35);                                       // bajo el suelo: misterio
m.pad(E, Ou + 3.5, 0.05, [45, 52, 59], 0);                                    // estudio, México y cierre
for (let i = 0; i < 16; i++) m.cruje(G + i * 0.15, 0.12);                     // brasas que crepitan
[0.4, 1.3, 2.2].forEach((d) => m.tic(G + d, 0.25, 1200));                     // hojas del calendario
for (let i = 0; i < 12; i++) m.burbuja(G + 2.5 + i * 0.16, 0.08, 380 + i * 30); // pop de cada morilla
m.sube(Mo + 0.1, 1.0, 45, 57, 0.04);                                          // crece la morilla
m.whoosh(Mo + 2.2, 0.5, 0.12); m.metal(Mo + 2.3, 0.12, 1600);                 // cuchillo que corta
for (let i = 0; i < 6; i++) m.tic(Es + 0.3 + i * 0.3, 0.12, 900);             // zonas de incendio en el mapa
for (let i = 0; i < 5; i++) m.nota(Es + 2.6 + i * 0.35, 64 + i * 2, 0.05, 0.5); // 5 especies
for (let i = 0; i < 26; i++) m.tic(Ci + 0.3 + i * 0.09, 0.07, 2000 + (i % 4) * 200); // conteo por hectárea
m.golpe(Se + 0.15, 0.3, 60);                                                  // año 2: casi nada
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                           // re-gancho
m.zumbido(Mi + 2.2, 1.2, 0.04, 140);                                          // calor que apaga microbios
for (let i = 0; i < 14; i++) m.gota(Mi + 3.6 + i * 0.08, 0.08, 700 + i * 25); // migajas de comida
for (let i = 0; i < 11; i++) m.cruje(U + 0.3 + i * 0.1, 0.18);                // hojarasca que se quema
m.burbuja(U + 1.2, 0.1, 300); m.burbuja(U + 1.5, 0.1, 340);                   // esclerocios
m.sube(U + 1.8, 1.4, 50, 62, 0.05); m.burbuja(U + 2.6, 0.12, 420);            // la morilla sube
m.golpe(E + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 28; i++) m.tic(E + 2.2 + i * 0.04, 0.05, 1500);           // parcelitas
for (let i = 0; i < 5; i++) m.nota(E + 3.4 + i * 0.1, 69 + i * 2, 0.04, 0.4);  // morillas en algunas parcelas
for (let i = 0; i < 6; i++) m.tic(Mx + 0.5 + i * 0.15, 0.12, 1300);           // puntos en el mapa
m.nota(Mx + 1.8, 72, 0.05, 0.9); m.nota(Mx + 1.9, 76, 0.04, 0.9);             // pancitas · elotitos
m.golpe(F + 0.6, 0.3, 110); m.nota(F + 0.65, 76, 0.05, 0.5);                  // SÍ
m.golpe(F + 1.1, 0.4, 55);                                                    // NO
m.motor(F + 2.6, 2.4, 0.07); m.whoosh(F + 2.8, 1.6, 0.14);                    // cohete
for (let i = 0; i < 6; i++) m.burbuja(C + 0.5 + i * 0.3, 0.06, 450 + i * 40); // brotes verdes
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
