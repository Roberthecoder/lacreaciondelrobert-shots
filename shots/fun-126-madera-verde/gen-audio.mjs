// gen-audio.mjs — música y efectos del Shot Fungi Mati #126 (madera verde). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua (la voz manda) con armonía que avanza por escena (la menor, tono de madera y bosque),
// y un tema de 4 notas tipo marimba que se presenta, se contesta, baja a lo oscuro en el microscopio y regresa
// en mayor en «obras de quinientos años». Cada frase varía: nunca el mismo patrón más de 4 veces.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Madera Verde base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 126);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Hi = K.Hifas, Pi = K.Pigmento, Co = K.Comun, P = K.Pregunta, E = K.Estudio, M = K.Met,
  Pa = K.Patron, Tu = K.Tunbridge, R = K.Raro, L = K.Luz, S = K.Silicio, C = K.Cierre, Ou = K.Outro;

/* ---------- cama: armonía por escena (acordes graves, con conducción de voces cercana) ---------- */
const cama = [
  [G, H, [45, 52, 57, 60], 0],         // Am
  [H, Hi, [41, 48, 53, 57], 0],        // F
  [Hi, Pi, [38, 45, 50, 53], 0.35],    // Dm, más oscuro: entramos a la madera
  [Pi, Co, [34, 46, 50, 53], 0.25],    // Bb: aparece el pigmento
  [Co, P, [43, 50, 55, 59], 0],        // G: de vuelta al bosque
  [P, E, [40, 47, 52, 56], 0.1],       // E (dominante): la pregunta queda abierta
  [E, M, [45, 52, 57, 60], 0],         // Am: el estudio
  [M, Pa, [41, 48, 53, 57], 0.3],      // F, oscuro: al microscopio
  [Pa, Tu, [45, 52, 57, 61], 0],       // A mayor: «obras de quinientos años» (se abre)
  [Tu, R, [38, 45, 50, 54], 0],        // D mayor: Inglaterra
  [R, L, [43, 50, 55, 59], 0],         // G
  [L, S, [48, 52, 55, 60], 0],         // C
  [S, C, [40, 47, 52, 56], 0],         // E
  [C, Ou + 3.5, [45, 52, 57, 60], 0],  // Am: regreso a la imagen del inicio
];
cama.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.3, 0.05, notas, tapa));

/* ---------- tema de 4 notas (marimba suave), con variaciones ---------- */
const frase = (t0, notas, paso = 0.32, g = 0.035, d = 0.9) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n, g * (i === 0 ? 1.15 : 1 - i * 0.04), d));
frase(G + 0.2, [69, 72, 76, 74]);                       // presentación
frase(H + 0.4, [69, 72, 77, 76], 0.3);                   // respuesta sobre F
frase(Hi + 0.3, [62, 65, 69, 67], 0.4, 0.028, 1.2);      // abajo y lento: dentro de la madera
frase(Pi + 0.3, [65, 70, 74], 0.36, 0.03, 1.3);          // el pigmento (Bb)
frase(Co + 0.3, [71, 74, 79, 77, 74], 0.26);             // secuencia en G
frase(P + 0.1, [76, 80, 83], 0.22, 0.032, 1.2);          // pregunta: sube y queda abierta
frase(E + 0.5, [69, 72, 76, 74, 72, 71, 69], 0.3);       // tema completo con cadencia
frase(M + 0.6, [65, 69, 72], 0.5, 0.025, 1.4);           // microscopio, quieto
frase(Pa + 1.9, [69, 73, 76, 81], 0.24, 0.04, 1.6);      // en mayor: 500 años
frase(Tu + 0.5, [66, 69, 74, 73, 71], 0.28);             // Tunbridge (D)
frase(R + 0.3, [71, 74, 79], 0.2, 0.03, 0.7);            // lo raro
frase(L + 0.6, [72, null, 76, null, 79, 76], 0.3, 0.028); // semanas que pasan
frase(S + 0.2, [76, 80, 83, 81], 0.24);                  // silicio
frase(C + 0.4, [69, 72, 76, 74, 72, 69], 0.34, 0.035, 1.1); // el tema regresa y cierra en la raíz
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.6, 72, 0.035, 2.4);

/* ---------- efectos en el mismo cuadro ---------- */
m.whoosh(G + 0.05, 0.8, 0.12);                            // entra la brocha
m.golpe(G + 0.9, 0.3, 70); m.tic(G + 0.95, 0.25, 900);    // se tacha
m.cruje(G + 1.7, 0.25);                                   // la tabla gira, madera
for (let i = 0; i < 7; i++) m.burbuja(H + 0.4 + i * 0.18, 0.06, 520 + i * 40); // brotan 7 copitas
m.sube(Hi, 0.9, 50, 38, 0.04);                            // bajamos al microscopio
for (let i = 0; i < 18; i++) m.tic(Hi + 0.3 + i * 0.16, 0.05, 2400 + (i % 3) * 400); // las hifas avanzan
for (let i = 0; i < 6; i++) m.gota(Pi + 0.2 + i * 0.25, 0.1, 600 + i * 50); // se tiñen las células
m.burbuja(Pi + 0.5, 0.08, 400);                           // la molécula
m.sube(Co, 0.8, 40, 52, 0.035);                           // regreso al bosque
for (let i = 0; i < 5; i++) m.cruje(Co + 0.1 + i * 0.15, 0.08); // ramas
m.sube(P + 0.1, 1.4, 52, 64, 0.04);                       // re-gancho
for (let i = 0; i < 8; i++) m.tic(P + 0.1 + i * 0.2, 0.05, 3000); // arena
m.golpe(E + 0.2, 0.35, 80);                               // tarjeta 1992
m.whoosh(E + 2.4, 0.5, 0.08); m.metal(E + 3.5, 0.08, 1200); // entra el panel, clic del microscopio
m.zumbido(M + 0.2, 1.2, 0.03, 220);                       // al microscopio
for (let i = 0; i < 12; i++) m.tic(M + 3.4 + i * 0.07, 0.04, 3200); // microanálisis de rayos X
m.golpe(M + 4.1, 0.25, 110);
m.golpe(Pa + 1.2, 0.3, 70); m.sube(Pa + 1.9, 1.2, 57, 69, 0.03);
for (let i = 0; i < 40; i++) m.tic(Tu + 0.6 + i * 0.07, 0.035, 1500 + (i % 5) * 160); // teselas que caen
m.whoosh(R + 1.0, 0.8, 0.08); m.gota(R + 1.8, 0.15, 800);  // el pigmento al chip
m.zumbido(R + 2.5, 1.2, 0.04, 330);                        // corriente
m.golpe(L + 0.45, 0.2, 140);                               // se apaga el primero (3 días)
for (let i = 0; i < 25; i++) m.tic(L + 0.4 + i * 0.12, 0.04, 1900); // 25 semanas
m.metal(S + 0.3, 0.12, 900); m.golpe(S + 0.6, 0.25, 90);    // la báscula se inclina
m.whoosh(C + 0.2, 0.6, 0.06); m.burbuja(C + 0.6, 0.08, 560); // regresa la tabla, aparece la copita
m.guardar(OUT, 1);
