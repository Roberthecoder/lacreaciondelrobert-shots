// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #60 (Portobello). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama cálida de cocina (madera) en fa mayor que avanza por una progresión con función (I–vi–IV–V, ii–V…),
// un acorde nuevo cada escena, y un motivo de 4 notas que regresa con otro timbre (pluck → campana) y otra respuesta.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = path.resolve(HERE, process.argv[2] || 'Shot Portobello base narrada.dc.html');
const OUT = path.resolve(HERE, process.argv[3] || path.join('assets', 'mezcla.wav'));
const m = crearMezcla(HTML, { seed: 60 });
const K = m.K;
const G = K.Gancho, Es = K.Especie, Cu = K.Cultivo, Cr = K.Cremini, Ab = K.Abre, La = K.Laminas, P = K.Pregunta, B = K.Basidio,
  N = K.Nucleos, E = K.Estudio, L = K.Lambert, D = K.Dato, C = K.Cierre, Ou = K.Outro;

// ---- cama: un acorde por escena (voz conducida: cada voz va a la nota más cercana) ----
const F = [41, 48, 53, 57], Dm = [38, 45, 50, 53], Bb = [34, 46, 50, 53], Cc = [36, 48, 52, 55], Am = [33, 45, 48, 52], Gm = [43, 46, 50, 55];
const PLAN = [[G, F], [Es, Dm], [Cu, Bb], [Cr, Cc], [Ab, F], [La, Am], [P, Gm, 340], [B, Dm, 380], [N, Bb, 380], [E, Gm], [L, Cc], [D, F], [C, Bb], [Ou, F]];
PLAN.forEach(([t0, notas, corte = 560], i) => { const t1 = i + 1 < PLAN.length ? PLAN[i + 1][0] + 0.35 : Ou + 3.6; m.pad(t0, t1, 0.05, notas, corte); });
// bajo suave que respira (no golpe): una nota larga por acorde, entrando un poco tarde
PLAN.slice(0, -1).forEach(([t0, notas], i) => m.nota(t0 + 0.15, notas[0] + 12, 0.035, 2.6));

// ---- motivo (4 notas) y sus respuestas: nunca igual dos veces ----
const motivo = (t, base, voz = 'pluck', g = 0.05, paso = 0.22, forma = [0, 2, 4, 7]) => forma.forEach((d, i) => m[voz](t + i * paso, base + d, g, 0.7));
motivo(G + 0.05, 65, 'pluck');                         // gancho: fa–sol–la–do
motivo(Es + 1.3, 64, 'pluck', 0.045, 0.24, [0, 1, 3, 5]); // respuesta, baja
motivo(Ab + 3.4, 65, 'campana', 0.05, 0.3, [0, 4, 7, 12]); // se abre el sombrero: sube a la octava
motivo(P + 0.1, 67, 'pluck', 0.05, 0.18, [0, 3, 1]);     // pregunta: queda en suspenso
motivo(E + 3.2, 72, 'campana', 0.06, 0.32, [0, 4, 7, 12]); // el blanco aparece: el tema en campana
motivo(D + 0.4, 65, 'pluck', 0.045, 0.16, [7, 5, 4, 0]);  // dato chistoso: el tema al revés
motivo(C + 0.5, 65, 'campana', 0.05, 0.3, [0, 2, 4, 7]);  // regreso del tema
m.campana(Ou + 0.3, 65, 0.06, 3); m.campana(Ou + 0.3, 69, 0.05, 3); m.campana(Ou + 0.3, 72, 0.04, 3);

// ---- efectos atados a lo que pasa en pantalla ----
m.whoosh(G - 0.3, 0.7, 0.12);                                   // entra la charola
m.ruido(G + 0.35, 0.45, 0.08, 600, 2400); m.pop(G + 1.05, 0.15); // se voltea el portobello
m.ruido(G + 1.6, 0.3, 0.07, 1200, 3500);                              // tachón «¿otro hongo?»
m.tic(G + 2.0, 0.15, 1500);
m.sube(Es + 0.4, 0.8, 55, 62, 0.03);                            // la llave une a los tres
for (let i = 0; i < 40; i++) m.tic(Cu + 0.2 + i * 0.012 + m.rnd() * 0.02, 0.03, 3000 + m.rnd() * 2000); // pajitas
m.ruido(Cu + 0.8, 2.2, 0.035, 2500, 5000);                      // micelio que crece (siseo suave)
m.ruido(Cu + 2.0, 0.6, 0.06, 200, 800);                         // cae la capa de cobertura
for (let i = 0; i < 6; i++) m.pop(Cu + 3.0 + i * 0.12, 0.1);    // brotan los primordios
m.metal(Cr + 0.85, 0.12, 1400); m.ruido(Cr + 0.9, 0.3, 0.08, 1500, 4000); // cuchillo que corta
m.sube(Ab + 0.3, 3.3, 48, 60, 0.035);                           // time-lapse: el sombrero se abre
m.ruido(Ab + 1.6, 0.25, 0.06, 900, 3000);                       // se rompe el velo
m.whoosh(La + 0.1, 0.8, 0.08);                                  // zoom a las láminas
m.sube(P + 0.1, 1.4, 55, 67, 0.04);                             // re-gancho
for (let i = 0; i < 9; i++) { m.pop(B + 0.3 + i * 0.08, 0.06); m.tic(B + 1.2 + i * 0.1, 0.08, 2200); m.tic(B + 1.3 + i * 0.1, 0.07, 2600); } // basidios y sus 2 esporas
m.campana(B + 3.0, 79, 0.03, 0.8);                              // la comparación de 4 esporas
[0, 1, 2, 3].forEach((i) => m.burbuja(N + 0.6 + i * 0.3, 0.07, 400 + i * 90)); // los núcleos se reparten
m.pop(N + 3.4, 0.2); m.nota(N + 3.42, 77, 0.03, 0.3);                                     // la espora cae
m.ruido(N + 3.5, 1.4, 0.03, 2500, 5000);                        // germina
m.golpe(E + 0.3, 0.25, 90);                                     // tarjeta 1925
for (let i = 0; i < 8; i++) m.pop(E + 1.6 + i * 0.08, 0.08);    // brota la cama
for (let i = 0; i < 8; i++) m.tic(L + 0.4 + i * 0.18, 0.05, 3200); // esporas que caen al frasco
m.burbuja(L + 1.4, 0.06, 500); m.burbuja(L + 1.9, 0.06, 620);
m.sube(L + 2.5, 1.7, 53, 65, 0.035);                            // la gráfica sube
for (let i = 0; i < 6; i++) m.pop(D + 0.1 + i * 0.1, 0.08);
m.whoosh(D + 2.6, 0.5, 0.08); m.golpe(D + 3.6, 0.35, 70);      // etiqueta y sello NOMBRE COMERCIAL
m.whoosh(C + 0.4, 0.5, 0.06); m.tic(C + 0.9, 0.08, 1600); m.tic(C + 1.4, 0.08, 1800);
m.guardar(OUT);
