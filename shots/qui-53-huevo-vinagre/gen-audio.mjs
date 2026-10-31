// gen-audio.mjs — cama grave + efectos del Shot Químico #53 (huevo en vinagre). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot HuevoVinagre base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
const G = K.Gancho, Ca = K.Cascaron, Bu = K.Burbujas, Di = K.Dias, Me = K.Membrana, Pr = K.Pregunta, Os = K.Osmosis, Es = K.Estudio, Ja = K.Jarabe, Re = K.Rebote, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.0, 0.7, 0.12);                                                          // la cuchara saca el huevo
for (let i = 0; i < 10; i++) m.gota(G + 0.6 + i * 0.35, 0.12, 950);                    // gotas de vinagre
m.nota(G + 1.6, 64, 0.06, 0.5);                                                        // tachón "¿pelado?"
m.whoosh(Ca + 0.2, 0.8, 0.1); m.gota(Ca + 1.0, 0.3, 500);                              // el huevo entra al vaso
for (let i = 0; i < 6; i++) m.tic(Ca + 0.6 + i * 0.2, 0.06, 1600);                     // el pastel se llena
m.nota(Ca + 1.8, 69, 0.07, 0.8);                                                       // 95 %
for (let i = 0; i < 5; i++) { const t0 = Bu + 0.6 + i * 0.7; m.tic(t0, 0.12, 1300); m.burbuja(t0 + 0.4, 0.12, 520); m.burbuja(t0 + 0.6, 0.08, 700); } // ácido + CO₂
for (let i = 0; i < 18; i++) m.burbuja(Di + i * 0.24, 0.07, 650 + (i % 5) * 80);       // burbujeo en el vaso
for (let i = 0; i < 4; i++) m.tic(Di + i * 1.05, 0.08, 2200);                          // reloj de días
m.cruje(Di + 2.6, 0.4);                                                                // se desprende el cascarón
m.zumbido(Me + 0.1, 1.6, 0.03, 160);                                                   // las fibras aparecen
m.nota(Me + 2.0, 72, 0.05, 0.6);                                                       // barra 50–70 µm
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05); m.golpe(Pr + 0.4, 0.25, 100);                      // re-gancho: huevo que crece
for (let i = 0; i < 12; i++) m.gota(Os + 0.8 + i * 0.25, 0.08, 1100 + (i % 3) * 120);   // moléculas de agua cruzando
m.golpe(Es + 0.2, 0.35, 80);                                                           // tarjeta del estudio
m.whoosh(Es + 3.4, 4.0, 0.05);                                                          // la jeringa empuja
for (let i = 0; i < 9; i++) m.gota(Es + 3.6 + i * 0.5, 0.12, 900);                      // goteo filtrado
m.sube(Ja + 0.3, 2.1, 60, 48, 0.05);                                                    // se desinfla en el jarabe
m.whoosh(Ja + 2.6, 0.6, 0.12); m.gota(Ja + 3.2, 0.3, 500);                              // salto al agua
m.sube(Ja + 3.3, 1.7, 52, 67, 0.05);                                                    // se vuelve a inflar
m.golpe(Re + 0.65, 0.4, 120); m.golpe(Re + 1.05, 0.25, 140); m.golpe(Re + 1.35, 0.15, 160); // boing
m.sube(Re + 0.65, 0.4, 60, 72, 0.06);
for (let i = 0; i < 10; i++) m.gota(Re + 2.6 + i * 0.22, 0.1, 1000);                   // la llave
for (let i = 0; i < 10; i++) m.burbuja(Ci + 0.3 + i * 0.2, 0.07, 700);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
