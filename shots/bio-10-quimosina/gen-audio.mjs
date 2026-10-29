// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #10 (quimosina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Quimosina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 10);
const K = m.K;
const G = K.Gancho, Le = K.Leche, Be = K.Becerro, Es = K.Escasez, En = K.Enzima, Mi = K.Micelas, Pe = K.Pelitos, Ti = K.Tijera,
  Cu = K.Cuajada, Pr = K.Pregunta, Ge = K.Gen, St = K.Estudio, Ho = K.Hoy, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                                 // cama grave continua
for (let t = G; t < Le; t += 0.5) m.gota(t + 0.55, 0.2, 850);                            // cada gota de cuajo (Goteo: cada 0.5 s, cae en 0.6 s)
m.whoosh(G + 1.0, 0.35, 0.18); m.whoosh(G + 1.35, 0.35, 0.18);                           // el tache (dos rayas)
m.burbuja(G + 2.1, 0.25, 420);                                                                                // aparece la bacteria
m.sube(Le + 0.2, 1.1, 57, 64, 0.04);                                                     // la leche se cuaja
for (let i = 0; i < 6; i++) m.tic(Le + 1.2 + i * 0.13, 0.12, 1100);                      // la cuchara corta
for (let i = 0; i < 6; i++) m.burbuja(Be + 0.3 + i * 0.5, 0.06, 380);                    // el becerro mama
m.whoosh(Be + 1.1, 0.55, 0.15);                                                          // la Lupa se abre
for (let i = 0; i < 12; i++) m.tic(Es + 0.1 + i * 0.16, 0.1, 1500 + i * 40);             // cada olla que aparece
for (let i = 0; i < 3; i++) m.nota(Es + 1.6 + i * 0.3, 57 - i * 3, 0.05, 0.5);           // los estómagos se apagan
m.nota(En + 0.6, 69, 0.06, 1.0); m.nota(En + 0.6, 76, 0.04, 1.0);                        // brilla la quimosina
m.whoosh(Mi + 0.1, 0.55, 0.15);                                                          // Lupa al microscopio
for (let c = 0; c < 2; c++) m.burbuja(Pe + 0.95 + c * 2, 0.2, 300);                      // ¡boing! de las micelas
for (let i = 0; i < 169; i++) m.tic(Ti + i * 0.004 + 0.1, 0.035, 2600);                  // 169 eslabones de la κ-caseína
m.tic(Ti + 1.9, 0.4, 3200); m.metal(Ti + 1.9, 0.12, 1200);                               // ✂ corte entre el 105 y el 106
m.sube(Ti + 2.1, 1.6, 64, 57, 0.03);                                                     // el pedazo 106–169 se aleja
for (let i = 0; i < 9; i++) m.nota(Cu + 0.6 + i * 0.25, m.ESC[i + 2], 0.04, 0.5);        // las micelas se van pegando (red)
m.golpe(Cu + 2.8, 0.18, 90);                                                             // la red queda armada
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                     // re-gancho
m.whoosh(Ge + 0.6, 1.4, 0.12);                                                           // el gen viaja
m.metal(Ge + 2.0, 0.1, 700);                                                             // entra al plásmido
for (let i = 0; i < 9; i++) m.burbuja(Ge + 2.6 + i * 0.2, 0.08, 600 + i * 30);           // cada enzima que se acumula adentro
m.golpe(St + 0.2, 0.3, 80); m.golpe(St + 2.2, 0.4, 70);                                  // tarjeta · sello de la FDA
for (let i = 0; i < 3; i++) m.tic(Ho + 0.2 + i * 0.6, 0.2, 1300);                        // aparece cada tanque
for (let i = 0; i < 16; i++) m.burbuja(Ho + 0.4 + i * 0.25, 0.05, 500 + (i % 4) * 80);   // burbujas de los tanques
for (let i = 0; i < 8; i++) m.tic(Ci + 0.5 + i * 0.25, 0.06, 900);                       // migas del queso
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
