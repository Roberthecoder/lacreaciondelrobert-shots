// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #94 (Cryomyces antarcticus). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Antartida base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 94);
const K = m.K;
const G = K.Gancho, V = K.Valles, A = K.Adentro, N = K.Nombre, Es = K.Escudo, P = K.Pregunta, E = K.Estudio, M = K.Marte, R = K.Resultado, Co = K.Colonias, Pa = K.Para, C = K.Cierre, Ou = K.Outro;

// frío y lento en la Antártida (tapado), se abre y se hace amplio en el espacio
m.pad(0, A, 0.05, [40, 47, 54], 0.45);             // Em(add9) fría
m.pad(A, P, 0.05, [36, 43, 52], 0.35);             // C/E: dentro de la roca
m.pad(P, R, 0.055, [41, 48, 55, 60, 64], 0.05);    // Fmaj7 amplio: el espacio
m.pad(R, Pa, 0.05, [38, 45, 53], 0.2);             // Dm: resultados
m.pad(Pa, Ou + 3.5, 0.05, [40, 47, 52, 59], 0.1);  // Em abierto
m.cruje(G + 0.3, 0.7); m.golpe(G + 0.35, 0.45, 60);                              // la piedra se parte
for (let i = 0; i < 4; i++) m.nota(G + 1.2 + i * 0.15, [64, 67, 71, 76][i], 0.04, 0.6); // franjas
for (let i = 0; i < 5; i++) m.whoosh(V + 0.3 + i * 1.0, 1.0, 0.07);              // viento de los Valles Secos
m.golpe(V + 0.7, 0.25, 120);
m.zumbido(A + 0.3, 0.9, 0.04, 170); for (let i = 0; i < 12; i++) m.tic(A + 0.9 + i * 0.2, 0.04, 800 + i * 40);
m.nota(N + 0.4, 57, 0.05, 1.2); m.nota(N + 2.6, 69, 0.04, 0.8);
for (let i = 0; i < 8; i++) m.tic(Es + 0.6 + i * 0.4, 0.05, 3400);              // rayos UV que se apagan en la pared
m.sube(P + 0.1, 1.6, 48, 67, 0.05); m.motor(P + 0.3, 1.4, 0.05);                // despegue suave
m.golpe(E + 0.2, 0.35, 80); m.whoosh(E + 2.0, 0.6, 0.06);
for (let i = 0; i < 18; i++) m.tic(M + 0.3 + i * 0.15, 0.04, 1500);             // 18 meses
m.nota(M + 1.8, 50, 0.05, 1.4);                                                  // «como en Marte»
for (let i = 0; i < 10; i++) m.tic(R + 0.5 + i * 0.2, 0.03, 1200 + i * 30);
m.cruje(R + 3.0, 0.25); m.nota(R + 2.7, 72, 0.05, 0.8);
[0, 1, 2].forEach((i) => m.burbuja(Co + 1.7 + i * 0.3, 0.07, 400 + i * 80));     // colonias que brotan
m.nota(Pa + 0.4, 62, 0.05, 1.2); m.nota(Pa + 1.6, 66, 0.04, 1.0); m.nota(Pa + 3.0, 69, 0.04, 1.0);
for (let i = 0; i < 4; i++) m.nota(C + 0.4 + i * 0.15, [64, 67, 71, 76][i], 0.05, 0.8);
m.nota(Ou + 0.3, 40, 0.08, 2.8); m.nota(Ou + 0.3, 47, 0.06, 2.8); m.nota(Ou + 0.3, 54, 0.05, 2.8);
m.guardar(OUT, 1);
