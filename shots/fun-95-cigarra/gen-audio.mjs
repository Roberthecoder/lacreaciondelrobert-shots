// gen-audio.mjs — cama + efectos del Shot Fungi Mati #95 (Massospora cicadina, la cigarra con tapón de esporas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): la cama cambia de acorde en cada sección con una progresión con función
// (la menor: i – VI – iv – V … ), se "tapa" bajo tierra y por dentro, se abre en el vuelo, sube en el re-gancho y resuelve al final;
// un motivo corto de 4 notas (la – do – mi – re, el "zumbido" de la cigarra) abre el video y regresa en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cigarra base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 95);
const K = m.K;
const G = K.Gancho, N = K.Nombre, S = K.Suelo, A = K.Adentro, Ta = K.Tapon, Sa = K.Salero, P = K.Pregunta, E = K.Estudio, Al = K.Aleteo,
  M = K.Machos, Ca = K.Catinona, Ps = K.Psilocibina, H = K.Hipotesis, C = K.Cierre, Ou = K.Outro, FIN = Ou + 3.5;

// ---- cama: un acorde por sección (se enciman 0.4 s para que no haya cortes) ----
const AC = { Am:[45, 52, 57, 60], F:[41, 48, 53, 57], Dm:[38, 45, 50, 53], E:[40, 47, 52, 56], C:[48, 52, 55, 60], G:[43, 50, 55, 59],
  E7:[40, 47, 50, 56], Bb:[46, 50, 53, 58], Fmaj7:[41, 48, 52, 57], Esus:[40, 47, 52, 57] };
const cama = [[G, N, 'Am', 0], [N, S, 'F', 0], [S, A, 'Dm', 0.45], [A, Ta, 'E', 0.55], [Ta, Sa, 'Am', 0.2], [Sa, P, 'C', 0], [P, E, 'E7', 0.1],
  [E, Al, 'Am', 0], [Al, M, 'G', 0], [M, Ca, 'F', 0], [Ca, Ps, 'Dm', 0.15], [Ps, H, 'Bb', 0.15], [H, C, 'Esus', 0.3], [C, Ou, 'Fmaj7', 0], [Ou, FIN, 'Am', 0]];
for (const [a, b, ac, tapa] of cama) m.pad(Math.max(0, a - 0.4), b + 0.4, 0.045, AC[ac], tapa);
// bajo que camina en los cambios (raíz del acorde, una octava abajo)
for (const [a, , ac] of cama) m.bajo(a, AC[ac][0] - 12, 0.08, 1.2);
// motivo de 4 notas (la – do – mi – re): abre el video y regresa en el cierre y en la tarjeta final
const motivo = (t, g = 0.05, tr = 0) => [69, 72, 76, 74].forEach((n, i) => m.nota(t + i * 0.32, n + tr, g, 0.7));
motivo(G + 0.3, 0.05); motivo(Sa + 0.3, 0.035, 7); motivo(C + 0.4, 0.05); m.nota(Ou + 1.6, 69, 0.06, 2.0); m.nota(Ou + 1.6, 76, 0.04, 2.0);

// ---- efectos, cada uno en el cuadro de lo que pasa ----
m.whoosh(G + 0.05, 0.9, 0.12); m.zumbido(G + 0.1, 4.6, 0.03, 180);             // despega y aletea
for (let i = 0; i < 10; i++) m.gota(G + 0.6 + i * 0.4, 0.03, 2400 + (i % 3) * 300); // esporas que caen (salero)
m.golpe(G + 1.9, 0.3, 80); m.cruje(G + 1.95, 0.25);                             // se tacha "cigarra entera"
m.nota(G + 2.4, 64, 0.045, 0.6); m.nota(G + 2.9, 67, 0.045, 0.6);                // etiquetas
m.nota(N + 0.2, 72, 0.04, 0.6); m.nota(N + 0.6, 69, 0.04, 0.6);
m.metal(N + 0.8, 0.12, 1300); m.metal(N + 1.15, 0.12, 1500);                    // calendarios 13 y 17
m.golpe(S + 0.05, 0.25, 70); m.cruje(S + 0.2, 0.3);                             // bajamos a la tierra
for (let i = 0; i < 14; i++) m.tic(S + 0.3 + i * 0.25, 0.05, 900 + (i % 4) * 120); // las ninfas cavan
m.gota(S + 2.1, 0.12, 1100); m.gota(S + 2.8, 0.12, 1250);                       // se les pega una espora
for (let i = 0; i < 12; i++) m.tic(A + 0.1 + i * 0.22, 0.06, 1300 + i * 70);    // el hongo crece por dentro
m.latido(A + 0.4, 0.16); m.latido(A + 1.3, 0.16); m.latido(A + 2.2, 0.14);      // el abdomen se infla
for (let k = 0; k < 4; k++) { const t0 = Ta + 0.4 + k * 0.55; m.tic(t0, 0.22, 2600); m.cruje(t0 + 0.02, 0.15); m.golpe(t0 + 0.95, 0.12, 120); } // se sueltan los anillos
m.nota(Ta + 2.6, 76, 0.04, 0.8); m.sube(Ta + 3.0, 0.6, 72, 79, 0.03);            // tapón y lupa
m.whoosh(Sa + 0.1, 1.2, 0.1); m.zumbido(Sa, 3.8, 0.03, 185);                    // sigue volando
for (let i = 0; i < 8; i++) m.tic(Sa + 1.7 + i * 0.13, 0.07, 3400);             // el salero
m.sube(P + 0.05, 1.6, 52, 64, 0.05);                                            // re-gancho
m.golpe(E + 0.2, 0.3, 80);                                                       // tarjeta del estudio
m.zumbido(E + 2.0, 2.2, 0.06, 260); m.zumbido(Al - 0.1, 0.4, 0.04, 300);       // la bocina toca el canto de macho
for (const t0 of [0.5, 1.1, 2.2, 2.8, 3.9, 4.5]) { m.tic(Al + t0, 0.3, 3000); m.tic(Al + t0 + 0.04, 0.2, 2200); } // ¡clic! el aleteo
for (let i = 0; i < 25; i++) m.tic(Al + 1.2 + i * 0.06, i < 23 ? 0.06 : 0.12, i < 23 ? 1800 + (i % 5) * 120 : 600); // marcador 23 de 25
m.whoosh(M + 0.2, 1.4, 0.1); m.zumbido(M + 0.2, 1.6, 0.03, 200);               // llega el macho sano
for (let i = 0; i < 6; i++) m.gota(M + 1.7 + i * 0.35, 0.05, 1600);            // esporas que pasan
m.golpe(Ca + 0.2, 0.3, 80);
for (let i = 0; i < 11; i++) m.tic(Ca + 2.3 + i * 0.1, 0.07, 1700 + i * 60);   // se arma la molécula de catinona
m.nota(Ca + 2.6, 74, 0.045, 0.6); m.nota(Ca + 3.7, 69, 0.04, 0.8);             // etiqueta y hoja de khat
for (let i = 0; i < 14; i++) m.tic(Ps + 0.6 + i * 0.085, 0.07, 1500 + i * 60); // molécula de psilocibina
m.nota(Ps + 0.2, 70, 0.045, 0.6);
m.whoosh(H + 0.3, 0.7, 0.08); m.golpe(H + 1.2, 0.45, 65);                      // flecha y sello «HIPÓTESIS»
m.whoosh(C + 0.05, 0.9, 0.1); m.zumbido(C + 0.1, 3.4, 0.03, 180);              // la misma cigarra despega otra vez
for (let i = 0; i < 6; i++) m.gota(C + 0.6 + i * 0.45, 0.03, 2400 + (i % 3) * 300);
m.guardar(OUT, 1);
