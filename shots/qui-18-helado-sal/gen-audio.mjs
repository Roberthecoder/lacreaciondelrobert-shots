// gen-audio.mjs — cama grave + efectos del Shot Químico #18 (helado casero con hielo y sal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Helado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 118);
const K = m.K;
const G = K.Gancho, Te = K.Termometro, Sa = K.Sal, Ca = K.Calor, Cr = K.Crema, Pr = K.Pregunta, Li = K.Limite, Es = K.Estudio, Car = K.Carretera, Fa = K.Fahrenheit, Ci = K.Cierre, Ou = K.Outro;
const salTe = Te + 2.4;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55], 0.3);                                         // cama grave y fría
for (let i = 0; i < 20; i++) m.tic(G + 0.1 + i * 0.12, 0.06, 3000 + (i % 4) * 300);   // lluvia de sal
m.cruje(G + 0.4, 0.5);                                                                  // hielo
m.whoosh(G + 2.6, 0.8, 0.08);                                                           // flecha de calor
m.nota(Te + 0.5, 60, 0.05, 0.8);                                                        // 0 °C
for (let i = 0; i < 14; i++) m.tic(salTe + i * 0.1, 0.05, 3200);                        // sal en el vaso
for (let i = 0; i < 9; i++) m.nota(salTe + 0.4 + i * 0.32, 60 - i, 0.04, 0.3);          // tic de cada grado que baja
for (let i = 0; i < 6; i++) m.burbuja(Sa + 0.3 + i * 0.15, 0.06, 500);                 // iones que aparecen
for (let i = 0; i < 6; i++) m.gota(Sa + 2.2 + i * 0.45, 0.12, 1100);                    // moléculas que se sueltan
for (let i = 0; i < 14; i++) m.nota(Ca + 0.6 + i * 0.3, 72 + (i % 3) * 2, 0.025, 0.25); // chispitas de calor
m.golpe(Cr + 2.6, 0.25, 90); m.cruje(Cr + 3.2, 0.4); m.nota(Cr + 4.2, 67, 0.07, 0.6);  // ✗ · cristales · ✓
m.sube(Pr + 0.1, 1.6, 55, 43, 0.05);
for (let i = 0; i < 12; i++) m.nota(Li + i * 0.13, 55 - i, 0.03, 0.25);                // el termómetro sigue bajando
m.golpe(Li + 1.6, 0.3, 70); m.metal(Li + 2.4, 0.12, 600);                              // −21 · congelador
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 4; i++) m.nota(Es + 3.4 + i * 0.6, 62 - i * 3, 0.06, 0.5);         // frascos en escalera
m.whoosh(Es + 6.0, 0.5, 0.06);
m.motor(Car + 0.2, 2.8, 0.08); for (let i = 0; i < 18; i++) m.tic(Car + 0.3 + i * 0.15, 0.04, 2800);
m.pad(Car + 3.0, Fa, 0.02, [43, 48], 0.7);                                              // frío: casi no derrite
m.golpe(Fa + 0.2, 0.35, 80); m.cruje(Fa + 2.4, 0.3);
for (let i = 0; i < 8; i++) m.nota(Fa + 2.6 + i * 0.25, 64 - i, 0.03, 0.3);
m.metal(Ci + 0.6, 0.14, 700); m.whoosh(Ci + 1.8, 0.6, 0.06);                            // se destapa el bote · cuchara
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
