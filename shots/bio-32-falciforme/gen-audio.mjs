// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #32 (anemia falciforme y Casgevy). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Falciforme base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 32);
const K = m.K;
const G = K.Gancho, Di = K.Disco, Ca = K.Cambio, Cr = K.Crisis, Fe = K.Fetal, In = K.Interruptor, Pr = K.Pregunta,
  Me = K.Medula, Rg = K.Regreso, Vi = K.Victoria, En = K.Ensayo, Li = K.Limites, Dl = K.Diluye, Ci = K.Cierre, Ou = K.Outro;
const liB = Li + 2.8, liC = Li + 5.2, meB = Me + 1.9;

// cama grave continua: tapada mientras dura el problema (gancho → crisis), libre cuando vuelve la fetal
m.pad(0, Fe, 0.05, [45, 52, 57], 0.5);
m.pad(Fe, Rg, 0.05, [45, 52, 57], 0.2);
m.pad(Rg, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
// el pulso del corazón empuja la sangre; se ahoga en la crisis y regresa limpio con la fetal
for (let t = 0.2; t < Cr; t += 0.9) m.latido(t, 0.14);
for (let t = Cr; t < Cr + 2.6; t += 1.4) m.latido(t, 0.08);
for (let t = Rg + 0.2; t < Vi; t += 0.85) m.latido(t, 0.12);
for (let t = Ci + 0.1; t < Ou; t += 0.8) m.latido(t, 0.14);
m.golpe(G + 0.2, 0.3, 70);                                              // la hoz atorada
for (let k = 0; k < 3; k++) m.whoosh(Di - 0.4 + k * 1.1, 0.8, 0.12);   // los discos pasan por el vaso angosto
m.whoosh(Ca + 0.2, 0.6, 0.15);                                          // la Lupa se abre
for (let i = 0; i < 40; i++) m.tic(Ca + 0.8 + i * 0.06, 0.06, 1600 + (i % 4) * 200); // cada molécula se pega en la varilla
m.golpe(Cr + 0.4, 0.35, 60); m.golpe(Cr + 1.2, 0.4, 55);              // se tapa el vaso
m.nota(Fe + 1.0, 69, 0.07, 1.2); m.nota(Fe + 1.0, 76, 0.05, 1.2);      // aparece la fetal
m.tic(In + 0.95, 0.4, 900); m.golpe(In + 1.0, 0.2, 120);              // el interruptor se apaga
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05); m.tic(Pr + 1.95, 0.35, 1100);     // pregunta y el interruptor que se prende
m.whoosh(Me + 0.2, 0.6, 0.15);                                          // Lupa a la médula
m.metal(meB + 0.95, 0.2, 1300); m.metal(meB + 1.15, 0.18, 1500);       // la tijera de CRISPR: dos clics metálicos
for (let i = 0; i < 9; i++) m.gota(Rg + i * 0.45, 0.14, 950);          // las gotas de la infusión
for (let i = 0; i < 5; i++) m.nota(Rg + 0.8 + i * 0.45, 64 + i * 2, 0.05, 0.6); // salen glóbulos con fetal
m.golpe(Vi + 0.2, 0.35, 80);                                            // la tarjeta del estudio
for (let i = 0; i < 29; i++) m.nota(En + 0.8 + i * (2.6 / 29), 69 + (i % 5) * 2, 0.04, 0.35); // 29 notas brillantes
m.nota(En + 3.5, 45, 0.08, 0.8);                                        // y 1 grave: el paciente que no
m.golpe(Li + 0.4, 0.4, 70); m.golpe(Li + 1.1, 0.4, 70);                 // los dos sellos de aprobación
for (let i = 0; i < 6; i++) m.gota(liB + i * 0.35, 0.12, 700);          // goteo del busulfán
m.golpe(liC, 0.3, 90); m.tic(liC + 1.0, 0.3, 2000);                     // el precio
for (let i = 0; i < 12; i++) m.burbuja(Dl + 0.3 + i * 0.22, 0.06, 600 + (i % 3) * 120); // la fetal diluye
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
