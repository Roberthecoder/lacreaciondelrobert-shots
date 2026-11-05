// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #78 (DDT y pudrición blanca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Arco: bosque húmedo y misterio → tensión (DDT en el suelo) → por dentro, oscuro y con pulso → se abre con brillo en 1985 →
// se apaga en «pero ojo» y Suecia → cierre cálido pero contenido. Los acordes cambian cada 2–4 s; nada se repite igual.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot DDT base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 78);
const K = m.K;
const G = K.Gancho, D = K.DDT, Li = K.Lignina, En = K.Enzimas, R = K.Radicales, P = K.Pregunta, E = K.Estudio, Ls = K.Lista, S = K.Seta, Lm = K.Limite, Su = K.Suecia, C = K.Cierre, Ou = K.Outro;

// --- cama: progresión que avanza (re menor → misterio → tensión → se abre → suspenso → cierre) ---
const CAMA = [
  [G, G + 2.8, [38, 45, 53]], [G + 2.8, D, [41, 48, 57]],                 // Dm, F: bosque húmedo
  [D, D + 2.7, [36, 43, 51], 0.25], [D + 2.7, Li, [37, 44, 52], 0.35],    // Cm(add), C#: tensión del veneno
  [Li, Li + 2.6, [33, 40, 48]], [Li + 2.6, En, [34, 41, 50]],             // por dentro: oscuro
  [En, En + 2.4, [36, 43, 50]], [En + 2.4, R, [38, 45, 52]],
  [R, P, [39, 46, 54], 0.2], [P, E, [40, 47, 55], 0.1],                   // sube hacia la pregunta
  [E, E + 2.5, [41, 48, 57]], [E + 2.5, Ls, [43, 50, 59]],                // 1985: se abre (F → G)
  [Ls, Ls + 2.6, [45, 52, 60]], [Ls + 2.6, S, [41, 48, 57, 64]],          // Am → Fmaj7
  [S, S + 2.4, [43, 50, 59]], [S + 2.4, Lm, [45, 52, 57]],
  [Lm, Lm + 2.8, [38, 45, 53], 0.35], [Lm + 2.8, Su, [36, 43, 50], 0.4],  // pero ojo: se apaga
  [Su, Su + 2.7, [34, 41, 48], 0.45], [Su + 2.7, C, [33, 40, 47], 0.4],   // Suecia: suspenso, sin resolver
  [C, C + 2.5, [38, 45, 53]], [C + 2.5, Ou + 3.5, [41, 48, 57, 62]],      // cierre cálido pero contenido (Dm → F add6)
];
for (const [a, b, notas, tapa = 0] of CAMA) m.pad(a, b + 0.15, 0.05, notas, tapa);

// --- melodía escasa (motivo → respuesta → secuencia → cadencia), siempre debajo de la voz ---
const frase = (t0, notas, g = 0.035, paso = 0.55, tapa = 0) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n, g, 0.9, tapa));
frase(G + 1.2, [62, 65, 64, 60]);                 // motivo
frase(D + 0.6, [60, 63, 62, null, 58], 0.03, 0.6, 0.4); // respuesta, ahogada (veneno)
frase(Li + 0.8, [57, 60, 62, 65], 0.028, 0.7);     // secuencia, por dentro
frase(En + 2.6, [59, 62, 64], 0.028, 0.5);
frase(E + 0.6, [65, 69, 72, 71, 69], 0.035, 0.45); // 1985: el tema sube
frase(Ls + 2.8, [72, 71, 69, 67], 0.03, 0.5);
frase(S + 1.0, [67, 69, 71, 74], 0.03, 0.45);
frase(Lm + 1.6, [65, 64, null, 62], 0.03, 0.7, 0.5);   // se apaga
frase(Su + 2.2, [60, 58, null, 57], 0.028, 0.75, 0.6); // sin resolver
frase(C + 1.0, [62, 65, 64, 62], 0.035, 0.55);      // regresa el motivo
m.nota(Ou + 0.3, 50, 0.06, 3); m.nota(Ou + 0.3, 57, 0.05, 3); m.nota(Ou + 0.3, 62, 0.045, 3); m.nota(Ou + 0.6, 69, 0.035, 2.6);

// --- efectos en el mismo cuadro de cada evento ---
m.cruje(G + 0.6, 0.35); m.golpe(G + 0.6, 0.2, 70);                         // el dedo hunde la madera blanda
m.zumbido(G + 0.2, 2.4, 0.025, 260);                                        // la molécula tiembla
m.whoosh(G + 1.6, 0.4, 0.06);                                               // chip «pudrición blanca»
m.zumbido(D, 3, 0.04, 420);                                                 // mosco
[0.2, 0.7, 1.2].forEach((d) => m.whoosh(D + d, 0.5, 0.12));                 // la bomba sopla
m.tic(D + 2.0, 0.2, 1200);                                                  // mapa y chip de México
for (let i = 0; i < 6; i++) m.golpe(D + 2.8 + i * 0.1, 0.12, 55);           // DDT que se queda en el suelo
m.sube(Li, 1.2, 40, 52, 0.04);                                              // entrar a la madera
for (let i = 0; i < 20; i++) m.tic(Li + 0.2 + i * 0.04, 0.05, 900 + (i % 5) * 120); // aparecen los anillos de lignina
m.whoosh(En - 0.1, 2.6, 0.05); m.whoosh(En + 0.4, 2.6, 0.04);               // crecen las hifas
for (let k = 0; k < 8; k++) { const h = En + 1.2 + k * 0.38; m.burbuja(h - 0.8, 0.06, 380); m.tic(h, 0.18, 3200); } // enzima sale y arranca un electrón
for (let k = 0; k < 8; k++) m.cruje(R + 0.25 + k * 0.32, 0.12);              // los anillos se parten
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                         // re-gancho
m.golpe(E + 0.2, 0.35, 80);                                                 // tarjeta 1985
for (let i = 0; i < 3; i++) m.gota(E + 0.8 + i * 0.3, 0.12, 600 + i * 90);  // el micelio cubre el líquido
for (let i = 0; i < 10; i++) m.nota(E + 2.4 + i * 0.06, 84 + (i % 4) * 2, 0.012, 0.3); // brillo de las moléculas marcadas
for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) m.burbuja(Ls + 1.0 + i * 0.35 + j * 0.5, 0.06, 500 + i * 60 + j * 30); // burbujas de CO2
m.golpe(Ls + 2.6, 0.2, 100);                                                // «parte, no todo»
m.sube(S + 0.1, 1.2, 55, 62, 0.03); m.tic(S + 0.4, 0.15, 1400);             // brotan las setas
for (let i = 0; i < 4; i++) m.burbuja(S + 2.4 + i * 0.3, 0.05, 620);
m.sube(Lm + 0.6, 1.0, 50, 53, 0.03); m.sube(Lm + 1.6, 0.8, 53, 55, 0.025);  // la barra solo llega a 9–23 %
m.golpe(Lm + 2.6, 0.3, 75);                                                 // tarjeta 1990
m.golpe(Su + 0.2, 0.2, 70);
for (let i = 0; i < 6; i++) m.tic(Su + 0.8 + i * 0.12, 0.08, 800);          // bloques de sustrato
m.zumbido(Su + 1.4, 3.5, 0.02, 110);                                        // el medidor se queda quieto (tono plano)
m.golpe(Su + 2.0, 0.3, 55);                                                 // «sin baja medible»
for (let i = 0; i < 5; i++) m.cruje(C + 0.3 + i * 0.2, 0.08);               // la molécula se parte
m.whoosh(C + 1.2, 0.5, 0.06);                                               // lupa
m.tic(C + 1.8, 0.15, 1500); m.golpe(C + 2.6, 0.2, 90);
m.guardar(OUT, 1);
