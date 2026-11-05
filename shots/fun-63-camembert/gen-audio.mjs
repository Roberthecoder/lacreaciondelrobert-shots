// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #63 (Camembert). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama cálida de cocina en re menor → re mayor. Un acorde nuevo por escena con voces conducidas (i–VI–III–VII…),
// se oscurece en «se está desgastando» y el clon (36–48 s), y se abre a mayor con P. biforme y el cierre.
// Un motivo de 4 notas que vuelve con otro timbre y otra respuesta (nunca igual dos veces).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = path.resolve(HERE, process.argv[2] || 'Shot Camembert base narrada.dc.html');
const OUT = path.resolve(HERE, process.argv[3] || path.join('assets', 'mezcla.wav'));
const m = crearMezcla(HTML, { seed: 63 });
const K = m.K;
const G = K.Gancho, N = K.Nombre, S = K.Siembra, Pi = K.Pinceles, A = K.Acido, E = K.Enzimas, AA = K.AfueraAdentro, P = K.Pregunta,
  Es = K.Estudio, M = K.Mutante, Ep = K.Esporas, B = K.Biforme, C = K.Cierre, Ou = K.Outro;

// ---- cama: un acorde por escena (cada voz a la nota más cercana) ----
const Dm = [38, 45, 50, 53], Bb = [34, 46, 50, 53], F = [41, 45, 48, 53], C7 = [36, 46, 48, 52], Gm = [43, 46, 50, 55],
  A7 = [33, 43, 49, 52], Dm9 = [38, 45, 52, 53], Eb = [39, 46, 51, 55], D = [38, 45, 50, 54], G7 = [43, 47, 50, 53], Bm = [35, 47, 50, 54];
const PLAN = [[G, Dm], [N, Bb], [S, F], [Pi, C7, 420], [A, Gm, 420], [E, A7, 420], [AA, Dm9], [P, Eb, 330], [Es, Gm, 400], [M, A7, 380],
  [Ep, Bb, 320], [B, D, 620], [C, G7, 620], [Ou, D, 640]];
PLAN.forEach(([t0, notas, corte = 540], i) => { const t1 = i + 1 < PLAN.length ? PLAN[i + 1][0] + 0.35 : Ou + 3.6; m.pad(t0, t1, 0.05, notas, corte); });
PLAN.slice(0, -1).forEach(([t0, notas]) => m.nota(t0 + 0.2, notas[0] + 12, 0.032, 2.8));     // bajo que respira

// ---- motivo y respuestas ----
const motivo = (t, base, voz = 'pluck', g = 0.05, paso = 0.22, forma = [0, 3, 7, 5]) => forma.forEach((d, i) => m[voz](t + i * paso, base + d, g, 0.7));
motivo(G + 0.05, 62, 'pluck');                               // gancho: re–fa–la–sol
motivo(N + 1.0, 65, 'pluck', 0.045, 0.24, [0, 2, 3, 0]);      // nombre: respuesta corta
motivo(S + 3.0, 65, 'campana', 0.045, 0.32, [0, 4, 7, 12]);   // la pelusa cubre el queso
motivo(AA + 3.2, 62, 'pluck', 0.045, 0.2, [0, 3, 5, 7]);      // la crema avanza: secuencia que sube
motivo(P + 0.1, 63, 'pluck', 0.05, 0.2, [0, 3, 2]);           // pregunta: queda colgada
motivo(M + 0.9, 69, 'campana', 0.04, 0.4, [0, -2, -4]);       // 1898… 1902… baja
motivo(Ep + 0.6, 62, 'pluck', 0.035, 0.34, [7, 5, 3, 0]);     // las esporas se apagan: el tema al revés
motivo(B + 0.7, 66, 'campana', 0.05, 0.25, [0, 4, 7, 9]);     // P. biforme: el tema en mayor
motivo(C + 0.5, 62, 'campana', 0.05, 0.3, [0, 4, 7, 12]);     // regreso del tema
m.campana(Ou + 0.3, 62, 0.06, 3); m.campana(Ou + 0.3, 66, 0.05, 3); m.campana(Ou + 0.3, 69, 0.04, 3);

// ---- efectos atados a lo que pasa en pantalla ----
m.whoosh(G + 0.05, 0.5, 0.12); m.ruido(G + 0.45, 0.35, 0.09, 1200, 3800); m.golpe(G + 0.7, 0.18, 120); // el cuchillo corta y toca la tabla
m.ruido(G + 0.9, 0.6, 0.05, 400, 1200);                                                       // sale la rebanada
m.ruido(G + 1.5, 0.3, 0.07, 1200, 3500); m.pop(G + 1.95, 0.15);                                // tachón «¿queso?» → «hongo»
m.pop(N + 0.2, 0.1); m.pop(N + 0.5, 0.12); m.tic(N + 1.6, 0.12, 1500); m.tic(N + 2.2, 0.12, 1300);
for (let i = 0; i < 12; i++) m.tic(S + 0.3 + i * 0.05 + m.rnd() * 0.03, 0.04, 3200 + m.rnd() * 1500); // polvito de esporas
m.burbuja(S + 0.95, 0.18, 380);                                                                  // cae en la leche
m.ruido(S + 1.5, 1.3, 0.05, 2500, 6000);                                                        // rocío
m.ruido(S + 2.1, 2.5, 0.025, 3000, 5200);                                                       // la pelusa crece (siseo suave)
for (let d = 1; d <= 6; d++) m.tic(S + 2.0 + d * 0.43, 0.08, 1800 + d * 120);                   // día 1 → 7
m.whoosh(Pi - 0.2, 0.8, 0.08);                                                                  // zoom al microscopio
m.ruido(Pi + 0.2, 1.6, 0.03, 2500, 4500);                                                       // hifas
[0.9, 1.2, 1.5].forEach((d, i) => { for (let k = 0; k < 5; k++) m.tic(Pi + d + 0.6 + k * 0.08, 0.06, 2600 + i * 400 + k * 80); }); // brotan los pinceles
for (let i = 0; i < 10; i++) m.burbuja(A + 0.7 + i * 0.28 + m.rnd() * 0.1, 0.05, 520 + i * 25); // el ácido sube y se lo come
for (let i = 0; i < 8; i++) m.burbuja(A + 1.9 + i * 0.32, 0.04, 900 - i * 30);                   // sale amoniaco
m.sube(A + 1.6, 2.0, 50, 57, 0.03);                                                             // sube el pH
[0.6, 1.0, 1.4].forEach((d) => { m.metal(E + d, 0.07, 2200); m.tic(E + d + 0.05, 0.12, 3000); }); // tijeritas cortan
m.ruido(AA + 0.4, 3.2, 0.03, 300, 900);                                                         // la crema avanza
[0.5, 0.65, 0.8, 0.95].forEach((d) => m.tic(AA + d, 0.06, 1200));                               // flechas
m.sube(P + 0.1, 1.4, 55, 63, 0.04); m.golpe(P + 0.4, 0.2, 70);                                  // re-gancho
m.golpe(Es + 0.1, 0.25, 90);                                                                    // tarjeta 2020
for (let i = 0; i < 14; i++) m.tic(Es + 0.9 + i * 0.07, 0.05, 2600 + (i % 4) * 300);            // se lee el ADN
m.pop(Es + 2.0, 0.12); m.pop(Es + 2.5, 0.12); [0, 1, 2].forEach((k) => m.pop(Es + 3.0 + k * 0.2, 0.1)); // ramas y copias del clon
m.ruido(M + 0.2, 1.2, 0.03, 600, 1500);                                                         // línea de tiempo
m.golpe(M + 0.8, 0.2, 100); m.golpe(M + 2.0, 0.2, 90); m.golpe(M + 3.0, 0.2, 80);              // 1898 · 1902 · hoy
[0, 1, 2].forEach((k) => m.pop(M + 4.4 + k * 0.2, 0.1));                                         // los camembert de colores
for (let i = 0; i < 6; i++) m.nota(Ep + 0.4 + i * 0.3, 74 - i * 2, 0.02, 0.4);                 // esporas que se apagan
m.tic(Ep + 1.6, 0.12, 900); m.golpe(Ep + 1.6, 0.15, 60);                                        // CNRS 2024
m.ruido(B + 0.2, 0.25, 0.08, 2000, 5000); m.pop(B + 0.35, 0.15);                                // se destapa la botella
for (let i = 0; i < 5; i++) m.pop(B + 0.6 + i * 0.25, 0.1);                                      // colonias
m.ruido(C + 1.8, 1.4, 0.03, 300, 800);                                                          // la crema escurre
m.golpe(C + 2.6, 0.35, 60);                                                                     // sello CLON
m.guardar(OUT);
