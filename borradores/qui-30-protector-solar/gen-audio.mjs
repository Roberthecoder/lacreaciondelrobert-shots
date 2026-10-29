// gen-audio.mjs — cama grave + efectos del Shot Químico #30 (protector solar). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Protector base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 30);
const K = m.K;
const G = K.Gancho, Fi = K.Filtros, Ab = K.Absorbe, Ca = K.Calor, Pr = K.Pregunta, Es = K.Esfera, Fp = K.FPS, La = K.Lab, Pl = K.Playa, Me = K.Menos, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 2.2, 0.07);                                                   // el dedo unta la crema
for (let i = 0; i < 7; i++) m.tic(G + 0.95 + i * 0.75, 0.08, 1800);              // rayos que llegan a la crema
m.metal(G + 1.0, 0.1, 900); m.golpe(G + 2.4, 0.25, 90);                           // espejo… tachado
m.burbuja(G + 3.4, 0.14, 420); m.sube(G + 3.6, 0.8, 57, 64, 0.04);                // la esponja
m.whoosh(Fi - 0.2, 0.6, 0.08);                                                    // bajamos a la capa
m.nota(Fi + 0.4, 64, 0.06, 0.5); m.nota(Fi + 1.5, 67, 0.06, 0.5);                 // aparecen los filtros
m.tic(Ab + 0.9, 0.18, 2600); m.zumbido(Ab + 0.9, 1.6, 0.05, 220);                 // rayo → octocrileno se carga
m.tic(Ab + 2.3, 0.18, 2400); m.zumbido(Ab + 2.3, 1.2, 0.05, 260);                 // rayo → avobenzona
m.whoosh(Ca + 0.1, 1.6, 0.06); m.bajo(Ca + 0.3, 52, 0.08, 1.2);                   // se suelta como calor
m.tic(Ca + 2.6, 0.15, 2600);                                                      // el siguiente rayo
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05); m.metal(Pr + 1.7, 0.1, 900);                 // ¿espejitos?
m.golpe(Es + 0.2, 0.35, 80);                                                       // tarjeta 2016
for (let i = 0; i < 20; i++) { const t = Es + 3.6 + i * 0.17 + 0.45; if (i === 6) m.metal(t, 0.14, 1200); else if (i === 11 || i === 17) m.tic(t + 0.4, 0.06, 900); else m.tic(t, 0.07, 1900); }
m.golpe(Es + 5.0, 0.25, 90);                                                       // se tacha el espejito
m.nota(Fp + 0.3, 60, 0.05, 0.6);
for (let i = 0; i < 97; i += 6) m.tic(Fp + 1.4 + i * 0.018, 0.05, 1500 + i * 6);   // se apagan 97
m.nota(Fp + 3.3, 55, 0.07, 0.8);                                                   // pasan 3
m.golpe(Fp + 2.2, 0.3, 85);
for (let i = 0; i < 6; i++) m.tic(La + 0.8 + i * 0.2, 0.05, 2200);                 // báscula
m.gota(La + 2.9, 0.22, 700);                                                       // cae la crema
m.golpe(Pl + 0.2, 0.35, 80);                                                       // tarjeta 1992
for (let i = 0; i < 42; i += 2) m.tic(Pl + 0.8 + i * 0.05, 0.05, 1600 + i * 10);  // 42 personas
m.sube(Pl + 4.3, 0.9, 64, 57, 0.05);                                               // ¼
for (let i = 0; i < 8; i++) m.tic(Me + 0.6 + i * 0.4, 0.06, i % 2 ? 1900 : 700);   // rayos: unos se apagan, otros pasan
m.bajo(Me + 1.5, 45, 0.1, 1.0);
for (let i = 0; i < 6; i++) m.tic(Ci + 0.9 + i * 0.6, 0.07, 1900);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
