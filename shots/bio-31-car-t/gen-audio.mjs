// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #31 (CAR-T). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot CarT base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const { Gancho: G, Saca: Sa, Virus: Vi, Receptor: Re, Bandera: Ba, Multiplica: Mu, Pregunta: Pr, Caza: Ca, Emily: Em, Tormenta: To, Artritis: Ar, FDA: Fd, Hoy: Ho, Cierre: Ci, Outro: Ou } = K;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let t = G; t < Sa; t += 0.5) m.gota(t + 0.4, 0.12, 1000);                       // goteo de la bolsa
m.zumbido(Sa + 0.1, Vi - Sa - 0.2, 0.05, 160);                                       // la centrífuga
m.burbuja(Sa + 1.3, 0.12, 500); m.burbuja(Sa + 1.7, 0.1, 600); m.burbuja(Sa + 2.0, 0.1, 650); // aparecen los linfocitos
m.whoosh(Vi + 0.2, 1.1, 0.12); m.burbuja(Vi + 1.4, 0.2, 300);                        // el virus llega y se pega
m.sube(Vi + 1.5, 1.3, 57, 69, 0.04);                                                  // entra el ARN
for (let i = 0; i < 12; i++) m.tic(Re + 0.4 + i * 0.18, 0.08, 1800 + i * 60);        // brotan los CAR (12)
m.whoosh(Ba, 0.8, 0.1); for (let i = 0; i < 10; i++) m.tic(Ba + 0.6 + i * 0.12, 0.07, 1200); // banderas CD19
for (let d = 0; d < 6; d++) m.nota(Mu + 0.2 + d * (2.6 / 6), 57 + d * 12 / 6 * 2, 0.06, 0.5); // cada duplicación, una nota que sube
m.whoosh(Mu + 3.0, 0.7, 0.12);                                                         // la bolsa regresa
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                   // re-gancho
for (let t = Pr; t < Em; t += 0.85) m.latido(t, 0.16);                                // dentro de la vena: latido
m.metal(Ca + 1.1, 0.2, 900); m.tic(Ca + 1.1, 0.3, 2600);                               // ¡clic! CAR en CD19
m.cruje(Ca + 1.3, 0.7);                                                                // la célula se rompe
m.burbuja(Ca + 2.4, 0.15, 450); m.burbuja(Ca + 3.3, 0.15, 520);                        // se divide
m.golpe(Em + 0.2, 0.3, 80);                                                            // tarjeta 2012
m.sube(To + 0.3, 2.7, 50, 74, 0.05);                                                   // fiebre que sube
for (let i = 0; i < 18; i++) m.tic(To + 0.3 + i * 0.22, 0.05, 900 + (i % 5) * 120);   // lluvia de citocinas
m.sube(To + 1.2, 1.8, 64, 48, 0.04);                                                    // la presión cae
for (let i = 0; i < 5; i++) m.tic(Ar + 0.8 + i * 0.15, 0.12, 700);                     // tapones de tocilizumab
m.nota(Ar + 1.6, 69, 0.05, 1.0); m.nota(Ar + 2.0, 72, 0.05, 1.0);                      // alivio
for (let i = 0; i < 3; i++) m.burbuja(Fd + 0.6 + i * 0.25, 0.12, 700);                 // las últimas células se van
m.golpe(Fd + 1.6, 0.45, 70);                                                           // sello FDA
for (let i = 0; i < 14; i++) m.nota(Ho + 0.3 + i * 0.15, 57 + [0, 3, 5, 7, 10][i % 5] + (i > 9 ? 12 : 0), 0.035, 0.4); // 14 puntos de la línea de tiempo
for (let t = Ci; t < Ou; t += 0.6) m.gota(t + 0.3, 0.1, 950);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
