// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #51 (el hongo del queroseno). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Queroseno base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 51);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Cr = K.Creosota, Ag = K.Agua, Fr = K.Frontera, Ta = K.Tapetes, P = K.Pregunta, D = K.Dano, E = K.Estudio, R = K.Remedio, Ga = K.Gatwick, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.25);                                 // cama grave (hangar)
m.whoosh(G, 0.8, 0.12); m.metal(G + 0.75, 0.15, 700);                         // sale el filtro (clic)
for (let i = 0; i < 6; i++) m.tic(G + 0.4 + i * 0.3, 0.07, 700 + i * 60);    // aparecen las manchas
m.nota(G + 2.4, 57, 0.05, 0.9);                                               // ¿o un hongo?
m.whoosh(N, 0.7, 0.1); m.sube(N + 0.6, 0.9, 45, 52, 0.04);                    // el avión, el tanque se llena
m.golpe(Cr + 0.2, 0.25, 70);                                                  // poste
for (let i = 0; i < 6; i++) m.tic(Cr + 0.6 + i * 0.32, 0.06, 1100);          // manchas en la creosota
for (let i = 0; i < 12; i++) m.gota(Ag + 0.4 + i * 0.36, 0.12, 700 + (i % 4) * 80); // gotas que se condensan y caen
m.sube(Fr - 0.2, 1.0, 52, 40, 0.04);                                          // bajamos al microscopio
for (let i = 0; i < 6; i++) m.burbuja(Fr + 0.3 + i * 0.5, 0.05, 260 + i * 20); // la frontera burbujea
m.cruje(Fr + 0.8, 0.25); m.cruje(Ta, 0.3);                                    // hifas creciendo
for (let i = 0; i < 8; i++) m.tic(Ta + 1.9 + i * 0.22, 0.06, 1800 + i * 90); // cadenas de esporas
m.sube(P + 0.05, 1.4, 52, 64, 0.05);                                          // ¿y qué le hace al avión?
m.golpe(D + 1.2, 0.4, 60);                                                    // el flujo se frena
m.zumbido(D + 2.4, 1.5, 0.03, 300); for (let i = 0; i < 5; i++) m.burbuja(D + 2.5 + i * 0.25, 0.06, 900); // siseo del ácido
m.tic(D + 4.6, 0.3, 500); m.golpe(D + 4.6, 0.3, 90);                         // el agujerito
m.golpe(E + 0.2, 0.3, 80);                                                    // tarjeta del estudio
for (let i = 0; i < 6; i++) m.metal(E + 2.5 + i * 0.15, 0.06, 1400);         // 6 frascos
for (let i = 0; i < 6; i++) m.nota(E + 3.6 + i * 0.12, m.ESC[4 + i], 0.04, 0.4); // ADN
m.nota(E + 5.0, 64, 0.05, 1.0);
for (let i = 0; i < 9; i++) m.gota(R + 0.4 + i * 0.25, 0.1, 600);            // drenaje
m.metal(R + 1.9, 0.12, 1800); m.gota(R + 2.7, 0.12, 1300);                    // frasco y gotero
m.golpe(Ga + 0.2, 0.5, 65);                                                   // ≈38×
m.motor(Ga + 2.4, 2.6, 0.08);                                                 // despegue
m.golpe(Ga + 3.6, 0.45, 55); m.cruje(Ga + 3.6, 0.35);                         // motor izquierdo: tirón con llamas
m.tic(Ga + 4.8, 0.2, 2200); m.tic(Ga + 5.0, 0.2, 2200);                       // aviso del motor derecho
m.motor(Ga + 5.2, 2.2, 0.05); m.golpe(C - 0.6, 0.3, 90);                      // vuelve y aterriza
m.whoosh(C + 0.4, 0.8, 0.1); m.nota(C + 1.6, 69, 0.06, 1.2);                  // la lupa sobre el filtro
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
