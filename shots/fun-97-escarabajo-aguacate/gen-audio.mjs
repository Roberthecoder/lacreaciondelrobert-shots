// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #97 (escarabajo ambrosial del laurel y el aguacate). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama grave en la menor que CAMBIA de acorde por sección con función
// (i → VI → iv → V → i … → V → i), y un motivo corto (la–do–mi–re) que abre el gancho, regresa en el estudio y cierra el video.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Escarabajo Aguacate base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 97);
const K = m.K;
const G = K.Gancho, N = K.Nombre, B = K.Bolsitas, Tu = K.Tuneles, D = K.Defensa, Ma = K.Marchita, P = K.Pregunta, E = K.Estudio,
  Mi = K.Millones, A = K.Aguacate, S = K.Salto, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

// --- cama: un acorde por sección, con traslape para que nunca se caiga el volumen ---
const Am = [45, 52, 57, 60], F = [41, 48, 53, 57], Dm = [38, 45, 50, 53], E7 = [40, 47, 52, 56], C_ = [36, 43, 48, 52], G_ = [43, 47, 50, 55], Esus = [40, 47, 52, 57];
const tramo = (t0, t1, notas, g = 0.05, tapa = 0) => m.pad(Math.max(0, t0 - 0.4), t1 + 0.4, g, notas, tapa);
tramo(G, N, Am); tramo(N, B, F);                        // el puntito · llegó de Asia
tramo(B, Tu, Dm, 0.05, 0.3); tramo(Tu, D, Am, 0.05, 0.3); // al microscopio (más tapado, oscuro)
tramo(D, Ma, Dm, 0.055, 0.5); tramo(Ma, P, E7, 0.055, 0.6); // los tubos se tapan: la música se ahoga
tramo(P, E, Esus, 0.05, 0.2);                           // la pregunta queda suspendida
tramo(E, Mi, Am); tramo(Mi, A, F, 0.055);               // el estudio · los millones
tramo(A, S, C_); tramo(S, Mx, G_);                      // el pariente · el salto
tramo(Mx, C, Dm); tramo(C - 0.2, C + 2.4, E7);          // México · tensión antes del cierre
tramo(C + 2.4, Ou + 3.5, Am, 0.05);                     // resolución
// motivo la–do–mi–re (y su respuesta mi–re–do–la al final)
const motivo = (t, base = 0, g = 0.05) => [69, 72, 76, 74].forEach((n, i) => m.nota(t + i * 0.32, n + base, g, 0.9));
motivo(G + 0.15); motivo(E + 0.25, 0, 0.04); motivo(C + 0.3, 0, 0.045);
[76, 74, 72, 69].forEach((n, i) => m.nota(Ou + 0.3 + i * 0.4, n, 0.05, 1.6));
m.nota(Ou + 2.0, 57, 0.06, 2.4); m.nota(Ou + 2.0, 64, 0.05, 2.4);

// --- efectos, en el mismo cuadro de lo que pasa ---
m.tic(G + 0.05, 0.18, 1600); m.cruje(G + 0.15, 0.3);                       // sale el palito de aserrín
m.cruje(G + 1.7, 0.35); m.golpe(G + 1.75, 0.3, 80);                        // se tacha "basura"
m.whoosh(G + 1.9, 0.6, 0.12); m.nota(G + 2.3, 64, 0.04, 0.6);              // se abre la lupa
for (let i = 0; i < 6; i++) m.burbuja(G + 4.1 + i * 0.2, 0.05, 420 + i * 30); // brota el jardín de hongo
m.whoosh(N + 0.5, 1.4, 0.1); m.motor(N + 0.6, 2.6, 0.05);                  // el barco cruza
m.golpe(N + 3.2, 0.3, 90); m.nota(N + 3.3, 67, 0.05, 0.7);                 // llega a Georgia
m.whoosh(B, 0.7, 0.1); for (let i = 0; i < 10; i++) m.tic(B + 0.6 + i * 0.18, 0.06, 2200 + i * 80); // se llenan las bolsitas
m.nota(B + 1.6, 72, 0.04, 0.6); m.nota(B + 2.4, 76, 0.04, 0.6);
for (let i = 0; i < 9; i++) m.cruje(Tu + 0.1 + i * 0.17, 0.12);            // cava el túnel
for (let i = 0; i < 6; i++) m.burbuja(Tu + 1.2 + i * 0.18, 0.05, 380 + i * 25); // crece el jardín
m.burbuja(Tu + 2.2, 0.08, 520); m.burbuja(Tu + 2.25, 0.08, 300);            // aparecen las crías
for (let i = 0; i < 6; i++) m.golpe(D + 0.5 + i * 0.3, 0.18, 60);          // cada tubo se tapa
m.sube(D + 0.1, 2.3, 40, 46, 0.03);                                        // el hongo sube
for (let i = 0; i < 6; i++) m.cruje(Ma + 0.2 + i * 0.25, 0.1);             // hojas secas
m.latido(Ma + 1.0, 0.12); m.latido(Ma + 1.8, 0.07);
m.sube(P + 0.1, 1.4, 52, 59, 0.04);
m.golpe(E + 0.2, 0.3, 80);                                                 // tarjeta del estudio
for (let i = 0; i < 20; i++) m.gota(E + 2.6 + i * 0.03, 0.05, 1200 + (i % 4) * 150); // una gota del hongo en cada plántula
for (let k = 1; k <= 8; k++) m.tic(E + 3.2 + k * 0.3, 0.08, 1500);         // corren las semanas
for (let i = 0; i < 5; i++) m.cruje(E + 3.8 + i * 0.4, 0.08);              // se marchitan
m.golpe(E + 5.0, 0.25, 70);                                                // 19 de 20
m.metal(Mi + 0.2, 0.15, 1100); for (let i = 0; i < 6; i++) m.tic(Mi + 0.2 + i * 0.15, 0.07, 2200); // cuenta el número
for (let i = 0; i < 30; i++) m.tic(Mi + 1.8 + i * 0.07, 0.04, 1300 + (i % 5) * 160); // puntitos del mapa
m.nota(A + 0.3, 60, 0.04, 0.6); m.nota(A + 0.8, 64, 0.04, 0.6);            // las dos tarjetas de la familia
m.whoosh(A + 2.0, 0.6, 0.1); for (let i = 0; i < 4; i++) m.cruje(A + 3.0 + i * 0.35, 0.08); // la huerta · se marchita un árbol
m.whoosh(S + 0.4, 1.4, 0.12); for (let i = 0; i < 10; i++) m.gota(S + 0.5 + i * 0.12, 0.05, 1600 + i * 60); // saltan las esporas
m.nota(S + 1.5, 69, 0.04, 0.5); m.nota(S + 1.6, 72, 0.04, 0.5);
m.nota(Mx + 0.3, 64, 0.04, 0.6);
m.golpe(Mx + 2.4, 0.45, 65);                                               // sello PLAGA AUSENTE
for (let i = 0; i < 4; i++) m.whoosh(Mx + 4.0 + i * 1.6, 1.0, 0.05);       // la vigilancia barre el mapa
m.whoosh(C + 0.4, 0.6, 0.1); m.burbuja(C + 1.3, 0.06, 360);
m.guardar(OUT, 1);
