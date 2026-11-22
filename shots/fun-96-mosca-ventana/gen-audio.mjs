// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #96 (Entomophthora muscae, la mosca de la ventana). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: progresión en la menor que cambia por sección (i → VI → iv → V | III → VII → i → VI → iv → V → i), con un motivo corto
// (la–do–si–mi) que suena en el gancho, regresa transformado en el re-gancho y cierra completo en el final. Cama grave, sin golpe marcado.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mosca Ventana base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 96);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Es = K.Espora, A = K.Adentro, Su = K.Subida, Po = K.Pose, P = K.Pregunta, E = K.Estudio,
  Sa = K.Sangre, B = K.Bandas, H = K.Halo, M = K.Machos, C = K.Cierre, Ou = K.Outro, FIN = Ou + 3.5;

// cama: un acorde por sección (se encadenan con fundido), más oscura (tapa) en las escenas por dentro
const Am = [45, 52, 57, 60], F = [41, 48, 53, 57], Dm = [38, 45, 50, 53], Ee = [40, 47, 52, 56], Cc = [36, 43, 48, 52], Gg = [43, 47, 50, 55];
[[0, Es, Am, 0], [Es, Su, F, 0.45], [Su, Po, Dm, 0.1], [Po, P, Ee, 0.2], [P, E, Ee, 0.3], [E, Sa, Cc, 0], [Sa, B, Gg, 0], [B, H, Am, 0.4],
  [H, M, F, 0.1], [M, M + 3.4, Dm, 0], [M + 3.4, C, Ee, 0], [C, FIN, Am, 0]].forEach(([a, b, acorde, tapa]) => m.pad(Math.max(0, a - 0.4), b + 0.4, 0.05, acorde, tapa));
// bajo suave en la raíz de cada acorde (respira, sin golpe)
[[0, 45], [Es, 41], [Su, 38], [Po, 40], [E, 36], [Sa, 43], [B, 45], [H, 41], [M, 38], [M + 3.4, 40], [C, 45]].forEach(([t, n]) => m.bajo(t + 0.05, n - 12, 0.07, 2.2));
// motivo la–do–si–mi
const motivo = (t, g = 0.05, tr = 0) => [69, 72, 71, 64].forEach((n, i) => m.nota(t + i * 0.32, n + tr, g, i === 3 ? 1.4 : 0.5));
motivo(G + 0.3, 0.045);
motivo(P + 0.2, 0.04, -5);                                                      // re-gancho: el mismo motivo, más grave

m.zumbido(G, 1.6, 0.05, 210);                                                   // una mosca viva cruza el vidrio
m.cruje(G + 2.0, 0.35); m.golpe(G + 2.1, 0.3, 80);                              // se tacha "murió de vieja"
m.nota(G + 2.5, 57, 0.05, 0.8); m.nota(G + 3.0, 64, 0.04, 0.8);                 // "la mató un hongo", bandas
m.nota(N + 0.2, 60, 0.05, 0.8); m.nota(N + 0.7, 67, 0.04, 0.6); m.nota(N + 1.3, 64, 0.04, 0.6); m.nota(N + 1.7, 69, 0.04, 0.6);
m.whoosh(Es - 0.3, 0.8, 0.1); m.gota(Es + 0.85, 0.2, 700);                      // bajamos al microscopio; la espora cae y se pega
m.sube(Es + 1.2, 1.8, 50, 43, 0.04); m.cruje(Es + 1.6, 0.25);                   // el tubito perfora la cutícula
m.burbuja(Es + 2.9, 0.12, 400);                                                  // entra a la hemolinfa
for (let i = 0; i < 12; i++) m.burbuja(A + 0.3 + i * 0.27, 0.05, 300 + (i % 4) * 60); // las células del hongo se multiplican
m.latido(A + 0.4, 0.14); m.latido(A + 1.4, 0.12);
m.nota(A + 2.0, 76, 0.04, 1.2, 0.5); m.nota(A + 2.2, 81, 0.03, 1.2, 0.5);       // brilla el sistema nervioso
m.whoosh(Su - 0.3, 0.8, 0.08);
for (let i = 0; i < 12; i++) m.tic(Su + 0.6 + i * 0.25, 0.05, 900 + (i % 2) * 300); // pasitos por el vidrio
m.sube(Su + 0.6, 3.0, 45, 52, 0.03);
m.gota(Po + 0.8, 0.22, 600);                                                     // la trompa se pega
for (let i = 0; i < 4; i++) m.whoosh(Po + 1.2 + i * 0.32, 0.18, 0.06);          // las alas suben en saltitos
m.golpe(Po + 2.7, 0.25, 60);                                                     // muere
for (let i = 0; i < 8; i++) m.tic(P + 0.2 + i * 0.4, 0.06, 1700);                // tic-tac del reloj
m.golpe(E + 0.2, 0.3, 80);                                                       // tarjeta del estudio
[0, 1, 2, 3].forEach((i) => m.nota(E + 2.8 + i * 0.15, 72 + [0, 4, 7, 12][i], 0.03, 0.5)); // se encienden las neuronas del reloj
m.sube(E + 3.5, 1.1, 55, 64, 0.04);                                             // la actividad sube antes de morir
m.whoosh(Sa + 0.5, 1.1, 0.06); m.burbuja(Sa + 1.2, 0.1, 500);                    // transfusión
for (let i = 0; i < 10; i++) m.tic(Sa + 1.8 + i * 0.26, 0.05, 1100 + (i % 2) * 400); // pasos de la mosca que camina más
m.whoosh(B - 0.3, 0.8, 0.08);
for (let i = 0; i < 7; i++) m.cruje(B + 0.3 + i * 0.22, 0.12);                   // salen los conidióforos
for (let i = 0; i < 14; i++) { m.tic(B + 2.4 + i * 0.2, 0.12, 3000); m.gota(B + 2.42 + i * 0.2, 0.05, 1800); } // disparos de conidios
for (let i = 0; i < 16; i++) m.gota(H + 0.1 + i * 0.14, 0.05, 1500 + (i % 5) * 120); // lluvia suave del halo
m.golpe(M + 0.2, 0.3, 80);
m.sube(M + 2.4, 1.6, 57, 64, 0.03); m.sube(M + 3.4, 1.4, 59, 66, 0.025);         // ondas de olor
m.zumbido(M + 2.6, 1.8, 0.05, 230);                                              // llega el macho
m.nota(M + 4.4, 64, 0.04, 0.8);
m.whoosh(C - 0.3, 0.8, 0.07);
m.nota(C + 1.0, 57, 0.04, 0.6); m.nota(C + 1.6, 60, 0.04, 0.6); m.nota(C + 2.2, 64, 0.04, 0.6); // la hora, el lugar, la pose
motivo(C + 3.0, 0.05);                                                           // el motivo completo, de regreso
m.nota(Ou + 0.3, 45, 0.08, 2.8); m.nota(Ou + 0.3, 52, 0.06, 2.8); m.nota(Ou + 0.3, 57, 0.05, 2.8); m.nota(Ou + 0.3, 64, 0.04, 2.8);
m.guardar(OUT, 1);
