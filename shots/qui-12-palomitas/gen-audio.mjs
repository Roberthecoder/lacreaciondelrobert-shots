// gen-audio.mjs — cama grave + efectos del Shot Químico #12 (palomitas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Palomitas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 112);
const K = m.K;
const G = K.Gancho, Gr = K.Grano, Ca = K.Calor, Pe = K.Presion, Es = K.Espuma, Pr = K.Pregunta, Et = K.Estudio, Te = K.Termometro, Br = K.Brinco, So = K.Sonido, Vi = K.Viejitas, Ci = K.Cierre, Ou = K.Outro;
const pop = (t, g = 0.3) => { m.golpe(t, g, 140); m.whoosh(t, 0.35, 0.06); };

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.motor(0, Gr, 0.03);                                                                  // lumbre
pop(G + 0.35, 0.35);                                                                   // el grano del frente
for (let i = 0; i < 3; i++) pop(G + 1.4 + i * 1.0, 0.15);                              // palomitas que saltan
m.golpe(G + 1.9, 0.2, 90);                                                             // se tacha "¿se quemó?"
m.whoosh(Gr - 0.3, 1.0, 0.07);                                                         // zoom al grano
m.nota(Gr + 1.1, 64, 0.05, 0.6); m.nota(Gr + 3.1, 69, 0.06, 0.7);                      // pericarpio · 20 mg de agua
for (let i = 0; i < 10; i++) m.gota(Gr + 1.3 + i * 0.35, 0.06, 900 + (i % 4) * 80);   // gotitas
for (let i = 0; i < 18; i++) m.burbuja(Ca + 0.6 + i * 0.18, 0.06, 500 + i * 25);       // hierve
m.sube(Ca + 0.2, Pe - Ca + 2.5, 45, 57, 0.04);                                         // termómetro y manómetro suben
m.pad(Pe, Es, 0.03, [57, 58], 0.5);                                                    // tensión
m.zumbido(Pe + 0.6, 2.8, 0.04, 1100);                                                  // olla exprés silbando
for (let i = 0; i < 8; i++) m.latido(Pe + 0.3 + i * 0.5, 0.08 + i * 0.01);             // la cáscara aguanta
m.cruje(Es + 0.05, 0.4); pop(Es + 0.4, 0.45);                                          // revienta
m.nota(Es + 1.7, 72, 0.06, 0.5); m.nota(Es + 2.3, 67, 0.06, 0.5);                      // ×2 · ÷8
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Et + 0.2, 0.35, 80);                                                           // tarjeta 2015
for (let i = 0; i < 5; i++) pop(Et + 3.0 + i * 0.25, 0.08);                            // horno
for (let i = 0; i < 6; i++) m.tic(Et + 3.2 + i * 0.4, 0.08, 2600);                     // cámara rápida
for (let i = 0; i < 17; i++) pop(Te + 0.5 + i * 0.035, 0.04);                          // 17 de 50 a 170 °C
for (let i = 0; i < 31; i++) pop(Te + 1.8 + i * 0.025, 0.035);                         // 48 de 50 a 180 °C
m.nota(Te + 2.2, 69, 0.06, 0.8);
m.motor(Br, So, 0.02);                                                                 // placa caliente
m.cruje(Br + 0.8, 0.25);                                                               // grietas
m.bajo(Br + 2.1, 40, 0.12, 0.4);                                                       // la patita se aplasta
m.sube(Br + 2.6, 0.7, 60, 76, 0.07); m.whoosh(Br + 2.6, 0.7, 0.08);                    // ¡brinca!
for (let i = 0; i < 6; i++) m.tic(So + 0.6 + i * 0.5, 0.05, 1800);                     // grietas sin ruido (apenas tic)
pop(So + 0.4 + 0.78 * 4, 0.4);                                                         // el pop con el vapor
m.nota(Vi + 0.5, 57, 0.05, 0.9); m.nota(Vi + 1.0, 55, 0.05, 0.9);                      // las que no revientan
m.whoosh(Vi + 1.6, 1.2, 0.04);                                                         // se escapa el vapor
m.golpe(Vi + 2.0, 0.3, 80);                                                            // tarjeta 2005
pop(Ci + 0.6, 0.35); m.golpe(Ci + 0.9, 0.2, 90);
for (let i = 0; i < 8; i++) pop(Ci + 1.2 + i * 0.3, 0.08);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
