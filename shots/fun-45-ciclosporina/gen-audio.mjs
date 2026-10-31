// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #45 (ciclosporina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ciclosporina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 45);
const K = m.K;
const G = K.Gancho, N = K.Noruega, S = K.Sandoz, R = K.Rechazo, P = K.Pregunta, Ca = K.Calcineurina, Al = K.Alarma, Ra = K.Ratones, Cn = K.Canada, Es = K.Escarabajo, H = K.Hipotesis, C = K.Cierre, Ou = K.Outro;
const NM = N + 2.0;

m.pad(0, Cn, 0.05, [45, 52, 55], 0.25);                                       // misterio (tapado) hasta los resultados
m.pad(Cn, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);                               // se abre
m.whoosh(G + 0.2, 0.5, 0.08); for (let i = 0; i < 12; i++) m.tic(G + 0.3 + i * 0.07, 0.07, 500 + (i % 4) * 90); // la tierra cae
m.nota(G + 2.2, 76, 0.06, 1.2); m.nota(G + 2.35, 81, 0.05, 1.2); m.golpe(G + 2.3, 0.25, 110);              // brilla el frasco
m.whoosh(N + 0.1, 0.6, 0.08); m.gota(N + 0.6, 0.2, 700);                       // el pin cae sobre Noruega
m.whoosh(NM - 0.2, 0.9, 0.1);                                                  // entramos al microscopio
for (let i = 0; i < 8; i++) m.nota(NM + 0.3 + i * 0.3, m.ESC[3 + (i % 5)], 0.03, 0.5, 0.4); // brotan las fiálides
for (let i = 0; i < 8; i++) m.burbuja(S + 0.1 + i * 0.25, 0.07, 280 + i * 20); // caldo del matraz
for (let i = 0; i < 11; i++) m.tic(S + 1.2 + i * 0.11, 0.1, 1400 + i * 60);    // las 11 piezas del anillo
m.metal(S + 2.4, 0.12, 1200);                                                  // el anillo se cierra
m.zumbido(R + 0.6, 2.8, 0.03, 120);                                            // se acercan los linfocitos
m.sube(R + 2.2, 1.6, 57, 64, 0.04); m.golpe(R + 2.6, 0.3, 75);                 // alarma: rechazo
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // ¿?
m.whoosh(Ca + 0.4, 1.0, 0.08); m.gota(Ca + 1.4, 0.18, 1100);                   // entra y se une a la ciclofilina
m.tic(Ca + 3.1, 0.35, 900); m.golpe(Ca + 3.15, 0.25, 60);                      // ¡clic! interruptor a OFF
for (let i = 0; i < 5; i++) m.tic(Al + 0.2 + i * 0.4, 0.05, 2200);             // señales que se apagan
m.golpe(Al + 0.8, 0.3, 80);
m.metal(Ra + 0.2, 0.08, 600); m.whoosh(Ra + 0.2, 0.4, 0.06);                   // tarjeta 1976
m.nota(Ra + 2.4, 69, 0.05, 0.8);                                               // el injerto
m.metal(Cn + 0.2, 0.08, 600); m.whoosh(Cn + 0.2, 0.4, 0.06);                   // tarjeta 1983
for (let i = 0; i < 16; i++) m.tic(Cn + 2.8 + i * 0.13, 0.06, 1800 + i * 40);  // se llenan las cuadrículas
m.nota(Cn + 5.0, 72, 0.06, 1.0); m.nota(Cn + 5.0, 76, 0.05, 1.0);
m.cruje(Es + 0.2, 0.3); m.motor(Es + 0.4, 1.4, 0.04);                          // tierra que se remueve, la larva
m.zumbido(Es + 1.8, 2.4, 0.025, 260);                                          // el moho la cubre
for (let i = 0; i < 5; i++) { m.gota(H + 1.6 + i * 0.3, 0.12, 800); m.sube(H + 1.7 + i * 0.3, 0.6, 60, 52, 0.02); } // las defensas se apagan
m.whoosh(C + 0.3, 0.6, 0.08);
for (let i = 0; i < 5; i++) m.nota(C + 0.6 + i * 0.85, 64 + (i % 2) * 5, 0.035, 0.7); // el riñón brilla (sigue funcionando)
m.nota(C + 1.6, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
