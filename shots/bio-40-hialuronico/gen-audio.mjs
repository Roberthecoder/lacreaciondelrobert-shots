// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #40 (ácido hialurónico). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Dato hecho sonido: cada azúcar que la enzima pega suena; ácido glucurónico = nota aguda, N-acetilglucosamina = nota grave (el patrón alterno del polímero).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hialuronico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 40);
const K = m.K;
const G = K.Gancho, Tu = K.Tuyo, Ga = K.Gallo, Ta = K.Tanque, En = K.Enzima, Hi = K.Hilo, Ag = K.Agua, Pr = K.Pregunta,
  Ca = K.Capa, Ri = K.Riesgo, Es = K.Estudio, Cr = K.Crema, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ag, 0.05, [45, 52, 57]);
m.pad(Ag, Ag + 3.9, 0.055, [45, 52, 57, 64]);                                        // el gel: la cama se abre
m.pad(Ag + 3.9, Ou + 3.5, 0.05, [45, 52, 57]);
m.gota(G + 0.8, 0.3, 700);                                                            // la gota cae en la mano
m.sube(G + 0.6, 0.5, 60, 64, 0.04);                                                   // el gallo con "?"
for (let i = 0; i < 3; i++) m.burbuja(G + 1.7 + i * 0.12, 0.08, 600 + i * 80);         // aparece la bacteria
[1.6, 2.3, 2.9].forEach((d, i) => m.nota(Tu + d, [69, 72, 76][i], 0.07, 0.6));       // piel, articulación, ojo
m.tic(Ga + 0.6, 0.12, 1800); m.whoosh(Ga + 1.0, 0.8, 0.14);                          // la cresta brilla; flecha al frasco
m.motor(Ta, 3.0, 0.06);                                                               // agitador del tanque
for (let i = 0; i < 10; i++) m.burbuja(Ta + 0.2 + i * 0.28, 0.06, 500 + (i % 4) * 70);
m.whoosh(En + 0.1, 0.6, 0.2);                                                         // se abre la lupa
// la enzima pega 14 azúcares alternados entre En+0.6 y Hi+2.8
const t0 = En + 0.6, t1 = Hi + 2.8;
for (let i = 1; i <= 14; i++) m.nota(t0 + (t1 - t0) * i / 14, i % 2 ? 76 : 64, 0.06, 0.35);
for (let i = 0; i < 16; i++) m.gota(Ag + 1.0 + (i % 8) * 0.12 + Math.floor(i / 8) * 0.6, 0.08, 1100 + (i % 5) * 60); // el agua queda atrapada
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                  // la pregunta
m.zumbido(Ca + 0.2, 1.8, 0.05, 160);                                                  // el glóbulo blanco se acerca
m.whoosh(Ca + 2.2, 0.9, 0.18);                                                        // y se resbala
m.golpe(Ri + 2.2, 0.3, 80);                                                           // alerta
m.golpe(Es + 0.2, 0.35, 85);                                                          // tarjeta 2005
m.whoosh(Es + 3.4, 1.2, 0.14); m.tic(Es + 4.6, 0.2, 2200);                            // el gen salta y entra
for (let i = 0; i < 8; i++) m.nota(Es + 4.8 + i * 0.2, i % 2 ? 64 : 76, 0.05, 0.3);  // B. subtilis suelta hialurónico
m.nota(Es + 5.6, 81, 0.07, 1.0); m.nota(Es + 5.6, 76, 0.05, 1.0);                    // palomita
m.whoosh(Cr + 0.4, 0.6, 0.2);                                                         // lupa sobre la piel
for (let i = 0; i < 5; i++) m.tic(Cr + 1.4 + i * 0.25, 0.08, 1500);                    // las cadenas cortas bajan
m.gota(Ci + 0.3, 0.2, 700); m.burbuja(Ci + 1.6, 0.1, 650);                            // regreso al gotero; la bacteria se asoma
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
