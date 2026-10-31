// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #18 (el glucómetro por dentro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Glucometro base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 18);
const K = m.K;
const G = K.Gancho, Go = K.Gota, En = K.Enzima, Pr = K.Prima, El = K.Electrones, Me = K.Mediador, Pq = K.Pregunta,
  Co = K.Corriente, Nu = K.Numero, Cl = K.Clark, Mx = K.Mexico, Ab = K.Abejas, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                                  // cama grave continua
for (let i = 0; i < 8; i++) m.tic(G + 0.2 + i * 0.5, 0.05, 2600);                        // chispitas en la tira
m.nota(G + 0.4, 69, 0.03, 0.3); m.nota(G + 0.9, 69, 0.03, 0.3);                           // la pantalla parpadea
m.golpe(G + 1.8, 0.25, 90);                                                               // se tacha el mito
m.whoosh(G + 2.6, 0.7, 0.08);                                                             // entra el dedo
m.tic(Go + 0.4, 0.3, 1800);                                                               // clic de la lanceta
m.gota(Go + 0.9, 0.22, 700);                                                              // brota la gota
m.gota(Go + 2.3, 0.2, 1100); m.burbuja(Go + 2.4, 0.08, 500);                              // la tira la absorbe
m.whoosh(En + 0.15, 0.6, 0.1);                                                            // se abre la Lupa
for (let i = 0; i < 6; i++) m.nota(En + 1.8 + i * 0.2, 57 + i * 2, 0.025, 0.4);          // crece el moho
m.metal(Pr + 0.6, 0.08, 900);                                                             // entra la otra enzima
m.whoosh(El - 0.2, 0.6, 0.1);                                                             // al microscopio
for (let i = 0; i < 5; i++) { const c = El + 0.4 + i * 0.75;                              // cada glucosa: un tintineo y 2 notas (= 2 electrones)
  m.burbuja(c + 0.55, 0.06, 900); m.nota(c + 0.62, 76, 0.04, 0.3); m.nota(c + 0.74, 81, 0.04, 0.3); }
for (let i = 0; i < 5; i++) m.tic(Me + 1.2 + i * 0.45, 0.07, 3200);                       // el mediador entrega al electrodo
m.sube(Pq + 0.1, 1.8, 52, 64, 0.04);                                                      // re-gancho
m.zumbido(Pq + 0.3, 3.4, 0.03, 180);                                                      // la corriente
m.zumbido(Co + 1.0, 2.6, 0.04, 220);                                                      // sube el medidor
for (let i = 0; i < 6; i++) m.tic(Nu + 0.4 + i * 0.3, 0.05, 2000);                        // cuenta la pantalla
m.nota(Nu + 2.25, 81, 0.07, 0.25); m.nota(Nu + 2.5, 81, 0.07, 0.35);                      // bip-bip del glucómetro
m.golpe(Cl + 0.2, 0.35, 80);                                                              // tarjeta del estudio
m.metal(Cl + 1.4, 0.07, 700);                                                             // se pone la capa de enzima
for (let i = 0; i < 17; i++) m.nota(Mx + 0.6 + i * 0.09, 64 - (i % 5), 0.025, 0.3);       // 17 personas, una nota cada una
m.pad(Mx + 3.0, Ab, 0.015, [50, 57], 0.6);                                                // los que no lo saben: sonido tapado
m.zumbido(Ab, 1.4, 0.05, 240);                                                            // la abeja
m.gota(Ab + 1.9, 0.18, 800);                                                              // deja la gotita
for (let i = 0; i < 10; i++) m.burbuja(Ab + 2.4 + i * 0.2, 0.06, 700);                    // agua oxigenada
m.sube(Ab + 3.6, 1.8, 64, 52, 0.03);                                                      // la bacteria se encoge
for (let i = 0; i < 6; i++) m.tic(Ci + 0.3 + i * 0.5, 0.05, 2600);
m.nota(Ci + 0.4, 81, 0.05, 0.3);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
