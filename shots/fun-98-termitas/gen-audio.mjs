// gen-audio.mjs — cama + efectos del Shot Fungi Mati #98 (termitas que cultivan Termitomyces). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): la cama cambia de acorde por sección con función armónica
// (la menor: i – VI – VII – V – i – iv – VI – III – VII – i), cálida y grave, debajo de la voz; un motivo corto
// "la–do–mi–re" abre el gancho, regresa transpuesto en el estudio y vuelve completo al cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Termitas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 98);
const K = m.K;
const G = K.Gancho, N = K.Nombre, F = K.Forraje, Pa = K.Panal, H = K.Hongo, B = K.Bolitas, V = K.Viejas, P = K.Pregunta,
  Es = K.Esporas, E = K.Estudio, O = K.Origen, Ti = K.Titanicus, M = K.Mercado, C = K.Cierre, Ou = K.Outro;

// --- cama: progresión por secciones (se enciman 0.4 s para que nunca quede hueco) ---
const ACORDES = [
  [G, N, [45, 52, 57, 60]],        // i   (la menor)  · el montículo
  [N, F, [41, 48, 53, 57]],        // VI  (fa)        · el mapa
  [F, Pa, [43, 50, 55, 59]],       // VII (sol)       · las obreras salen
  [Pa, H, [45, 52, 57, 60]],       // i               · por dentro
  [H, B, [38, 45, 50, 53]],        // iv  (re menor)  · al microscopio
  [B, V, [41, 48, 53, 57]],        // VI              · nódulos
  [V, P, [43, 50, 55, 59]],        // VII             · las viejas
  [P, Es, [40, 47, 52, 56]],       // V   (mi mayor)  · la pregunta: tensión
  [Es, E, [45, 52, 57, 60]],       // i               · respuesta
  [E, O, [41, 48, 53, 57]],        // VI              · el fósil
  [O, Ti, [48, 55, 60, 64]],       // III (do mayor)  · origen
  [Ti, M, [43, 50, 55, 59, 62]],   // VII → luz       · la seta gigante
  [M, C, [41, 48, 53, 60]],        // VI              · el mercado
  [C, Ou + 3.6, [45, 52, 57, 60, 64]], // i            · cierre
];
for (const [a, b, notas] of ACORDES) m.pad(Math.max(0, a - 0.4), b + 0.4, 0.05, notas, 0.1);
// bajo suave que marca cada cambio de acorde (sin golpe), para que se sienta la progresión
for (const [a, , notas] of ACORDES) m.bajo(a + 0.02, notas[0], 0.07, 1.6);
// motivo la–do–mi–re (57 60 64 62): gancho, estudio (una cuarta arriba: re–fa–la–sol) y cierre
const motivo = (t, base = 0, g = 0.06) => [57, 60, 64, 62].forEach((n, i) => m.nota(t + i * 0.32, n + base, g, 0.9));
motivo(G + 0.15); motivo(E + 0.4, 5, 0.05); motivo(C + 0.5); m.nota(C + 1.9, 57, 0.06, 2.2);

// --- efectos, en el mismo cuadro de lo que pasa ---
m.whoosh(G + 0.05, 0.9, 0.1);                                                   // la cámara se acerca
for (let i = 0; i < 10; i++) m.tic(G + 0.2 + i * 0.18, 0.05, 2600 + (i % 3) * 300); // pasitos de obreras
m.cruje(G + 1.9, 0.35); m.golpe(G + 2.0, 0.3, 85);                              // se tacha "casa de termitas"
m.nota(G + 2.3, 64, 0.05, 0.7);                                                 // aparece "granja de hongos"
m.whoosh(N - 0.2, 0.8, 0.08); [0.3, 0.6, 2.4].forEach((d, i) => m.nota(N + d, [64, 67, 69][i], 0.04, 0.6)); // etiquetas
for (let i = 0; i < 4; i++) m.tic(N + 0.3 + i * 0.25, 0.05, 1600);             // se pinta el mapa
for (let i = 0; i < 14; i++) m.tic(F + i * 0.2, 0.05, 2400 + (i % 4) * 250);   // fila de obreras cargando
m.cruje(F + 0.5, 0.15);                                                         // pasto seco
m.whoosh(Pa - 0.2, 0.7, 0.1); m.golpe(Pa + 0.1, 0.2, 70);                       // entramos al montículo
for (let i = 0; i < 8; i++) m.burbuja(Pa + 0.5 + i * 0.32 + 0.45, 0.06, 260 + (i % 3) * 40); // "plop" de cada bolita de popó
for (let i = 0; i < 12; i++) m.tic(H + 0.2 + i * 0.18, 0.06, 1200 + i * 70);    // crecen las hifas
m.cruje(H + 1.0, 0.2);                                                          // la fibra se deshace
for (let i = 0; i < 12; i++) m.gota(B + 0.2 + i * 0.12, 0.05, 1500 + (i % 4) * 150); // salen los nódulos
m.sube(B + 0.8, 0.5, 64, 72, 0.04);                                             // la lupa
for (let i = 0; i < 6; i++) m.tic(B + 3.2 + i * 0.1, 0.06, 900);               // la obrera mastica
m.nota(B + 3.4, 69, 0.04, 0.6);                                                 // flecha: panal nuevo
for (let i = 0; i < 10; i++) m.tic(V + 0.6 + i * 0.18, 0.06, 800 + (i % 2) * 120); // las viejas comen
m.zumbido(P + 0.1, 1.2, 0.04, 210);                                             // aleteo de los alados
m.golpe(P + 1.25, 0.18, 90); m.sube(P + 0.2, 1.8, 52, 59, 0.04);               // aterrizan · pregunta
m.whoosh(Es + 0.2, 2.5, 0.05);                                                  // viento con esporas
m.nota(Es + 3.2, 69, 0.05, 0.8); m.burbuja(Es + 3.2, 0.06, 400);               // la bolita de hongo del rey
m.golpe(E + 0.25, 0.32, 75);                                                    // tarjeta del estudio
m.golpe(E + 2.3, 0.4, 55); m.cruje(E + 2.35, 0.4);                              // la roca fósil
[0.1, 0.6, 1.1].forEach((d) => m.tic(O + d, 0.1, 1800));                        // puntos de la línea del tiempo
m.sube(O + 1.6, 1.0, 55, 60, 0.03);                                             // se enciende África
for (let i = 0; i < 26; i++) m.gota(Ti + i * 0.1, 0.04, 700 + (i % 5) * 140); // lluvia
m.sube(Ti + 1.6, 2.4, 48, 62, 0.05);                                            // crece la seta
m.cruje(Ti + 1.7, 0.3);                                                         // rompe la tierra
m.metal(Ti + 3.5, 0.1, 1200);                                                   // la regla
m.motor(M + 0.1, 1.8, 0.04);                                                    // pasa un carro en la carretera
[0, 1, 2, 3, 4].forEach((i) => m.nota(M + 1.45 + i * 0.15, [57, 60, 64, 67, 69][i], 0.035, 0.5)); // llega la familia
m.whoosh(C + 0.1, 0.8, 0.08);
m.nota(Ou + 0.3, 45, 0.07, 3.0); m.nota(Ou + 0.3, 52, 0.05, 3.0); m.nota(Ou + 0.3, 57, 0.05, 3.0); m.nota(Ou + 0.3, 60, 0.04, 3.0);
m.guardar(OUT, 1);
