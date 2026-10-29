// gen-audio.mjs — cama grave + efectos del Shot Químico #55 (polvo para hornear de doble acción). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Polvo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Q = K.Que, A = K.Agua, Bu = K.Burbujas, Pr = K.Pregunta, H = K.Horno, Es = K.Estudio, Cu = K.Cuaja, No = K.Norma, Ci = K.Cierre, Ou = K.Outro;
const mitadEs = Es + 4.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.7, 0.12);                                                         // la cuchara vuelca
for (let i = 0; i < 10; i++) m.tic(G + 0.2 + i * 0.05, 0.05, 3000 + i * 120);         // el polvo cae
m.whoosh(G + 0.6, 0.9, 0.1);                                                           // "puf" de la nube
m.nota(G + 2.2, 64, 0.06, 0.6); m.nota(G + 3.4, 69, 0.07, 0.8);                        // chips 1 y 2
for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) m.tic(Q + 0.3 + i * 0.55 + k * 0.08, 0.05, 1800 + i * 300); // aparecen los granitos
for (let k = 0; k < 3; k++) m.gota(Q + 4.3 + k * 0.4, 0.12, 1100);                     // la fécula atrapa la humedad
m.gota(A + 0.8, 0.25, 850);                                                            // la gota de leche
m.sube(A + 0.9, 1.1, 60, 67, 0.04);                                                    // se disuelve
for (let i = 0; i < 4; i++) m.burbuja(A + 2.0 + i * 0.35, 0.1, 500 + i * 60);          // sale CO₂
for (let i = 0; i < 10; i++) m.burbuja(Bu + i * 0.2, 0.07, 650 + (i % 4) * 80);        // las burbujas crecen
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                   // pregunta
m.golpe(H + 0.3, 0.3, 70);                                                             // puerta del horno
m.zumbido(H + 0.6, 5.5, 0.03, 120);                                                    // calor
for (let i = 0; i < 5; i++) m.burbuja(H + 3.0 + i * 0.5, 0.1, 450 + i * 50);           // segunda ola de gas
m.golpe(Es + 0.2, 0.35, 80);                                                           // tarjeta
m.motor(Es + 2.8, 1.7, 0.07);                                                          // batidora
for (let i = 0; i < 8; i++) m.burbuja(Es + 2.8 + i * 0.2, 0.06, 900);                  // el gas se va
m.nota(mitadEs + 0.6, 69, 0.07, 0.8); m.nota(mitadEs + 0.9, 57, 0.07, 0.9);            // pastel alto / bajito
m.sube(Cu + 0.3, 2.9, 52, 60, 0.035);                                                  // termómetro
m.golpe(Cu + 3.0, 0.25, 95);                                                           // cuaja
for (let i = 0; i < 6; i++) m.whoosh(Cu + 4.4 + i * 0.35, 0.5, 0.05);                  // el gas se escapa por los poros
m.metal(No + 0.3, 0.12, 900);                                                          // clic de la báscula
m.whoosh(No + 0.8, 1.2, 0.08);                                                         // nube de CO₂
m.nota(No + 1.6, 64, 0.07, 0.7); m.nota(No + 2.2, 71, 0.07, 0.9);                      // 12 %
m.golpe(No + 0.3, 0.2, 90);
for (let i = 0; i < 6; i++) m.burbuja(Ci + 0.2 + i * 0.18, 0.06, 600);                 // el pastel se esponja
m.nota(Ci + 1.4, 64, 0.06, 0.6); m.nota(Ci + 2.2, 69, 0.07, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
