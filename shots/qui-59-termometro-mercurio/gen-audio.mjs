// gen-audio.mjs — cama grave + efectos del Shot Químico #59 (termómetro de mercurio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mercurio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
const G = K.Gancho, Q = K.Que, P = K.Pulmon, E = K.Escoba, A = K.Aspiradora, Pr = K.Pregunta, Es = K.Estudio, H = K.QueHacer, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const GAR = Es + 4.2, PS = [H + 1.9, H + 3.6, H + 4.6, H + 5.6, H + 7.5];

m.pad(0, H + 3.6, 0.05, [45, 52, 57], 0.35);                                          // tensa mientras hay vapor
m.pad(H + 3.6, Ou + 3.5, 0.05, [45, 52, 57, 64]);                                    // se abre con la ventana
m.whoosh(G - 0.2, 0.5, 0.12);                                                         // cae el termómetro
m.cruje(G + 0.32, 0.8);                                                               // se rompe el vidrio
for (let i = 0; i < 9; i++) m.tic(G + 0.45 + i * 0.09, 0.12, 2600 + i * 120);         // bolitas rodando
m.golpe(G + 2.4, 0.25, 110); m.golpe(G + 3.4, 0.25, 100);                             // los dos NO
m.nota(Q + 0.5, 64, 0.05, 0.8); for (let i = 0; i < 6; i++) m.burbuja(Q + 1.7 + i * 0.25, 0.04, 1200); // átomos que se sueltan
m.whoosh(P + 0.2, 1.8, 0.07);                                                          // inhalación
for (let i = 0; i < 4; i++) m.nota(P + 2.2 + i * 0.35, 57 + i * 3, 0.05, 0.4);         // medidor sube
m.whoosh(E + 0.4, 1.2, 0.14); for (let i = 0; i < 12; i++) m.tic(E + 1.0 + i * 0.06, 0.08, 3000); // barrido y gotitas
m.motor(A + 0.2, 3.8, 0.1); m.whoosh(A + 1.8, 0.8, 0.12);                             // aspiradora y escape
m.sube(Pr + 0.1, 1.8, 52, 64, 0.05); for (let i = 0; i < 8; i++) m.tic(Pr + 0.2 + i * 0.25, 0.08, 1800); // reloj
m.golpe(Es + 0.2, 0.35, 80); m.motor(Es + 1.4, 2.0, 0.07);                            // tarjeta · aspiran
m.whoosh(GAR - 0.2, 0.5, 0.1); m.golpe(GAR + 0.3, 0.2, 90); m.tic(GAR + 1.3, 0.12, 2000);
m.nota(Es + 6.6, 76, 0.06, 0.2); m.nota(Es + 6.8, 76, 0.06, 0.2);                    // bip del medidor
m.golpe(Es + 9.8, 0.3, 70); m.whoosh(Es + 10.2, 1.2, 0.12); m.golpe(Es + 11.5, 0.35, 60); // ✕ y a la basura
m.nota(H + 0.2, 69, 0.05, 0.8);
PS.forEach((t, i) => { m.nota(t, 69 + [0, 3, 5, 7, 10][i], 0.07, 0.5); m.tic(t, 0.1, 2200); });
m.whoosh(PS[1] + 0.1, 0.9, 0.1);                                                      // ventana
for (let i = 0; i < 5; i++) m.gota(PS[3] + 1.1 + i * 0.25, 0.12, 900);              // gotero
for (let i = 0; i < 8; i++) m.tic(PS[4] + i * 0.2, 0.08, 1600);                      // reloj 24 h
m.sube(D + 0.3, 1.8, 64, 52, 0.05);                                                   // el vapor baja
m.whoosh(Ci + 0.2, 1.4, 0.08);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
