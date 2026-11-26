// gen-audio.mjs — música y efectos del Shot Fungi Mati #155 (Iceberg de los hongos), MODO CINE. Sin costo: todo se calcula.
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: la «cama luminosa» del modo cine (motor/kit/cama-luminosa.mjs, la llama pad(): do mayor, 100 BPM, acordes que se
// mueven, arpegio y tema escrito a mano; maestro/recetas/composicion-musical.md). Encima, solo efectos suaves en el mismo
// cuadro de cada cosa que pasa en pantalla, y unas pocas notas de do mayor que acompañan los momentos de luz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Iceberg base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 155);
const K = m.K;
const G = K.Gancho, N1 = K.Nivel1, N1b = N1 + 3.3, Pe = K.Penicilina, Qu = K.Quitina, Br = K.Brillan, Ar = K.Armillaria, Pr = K.Pregunta, Ho = K.Hormiga,
  La = K.Lazos, Se = K.Sexos, Ra = K.Radiacion, Ci = K.Cierre, Ou = K.Outro;
const DO = [72, 74, 76, 79, 81, 84, 86, 88];                   // do mayor pentatónico agudo (para chispas de luz)

m.pad(0, Ou + 3.5, 0.05);                                       // cama luminosa, todo el video

/* gancho: olas, espuma y salpicaduras; la cámara se aleja y se hunde */
for (let k = 0; k < 3; k++) { m.whoosh(G + k * 1.3, 0.8, 0.05); for (let i = 0; i < 5; i++) m.gota(G + k * 1.3 + 0.12 + i * 0.06, 0.035, 1400 + i * 140); }
m.whoosh(G + 1.5, 1.6, 0.07);                                   // la cámara se aleja
for (let i = 0; i < 10; i++) m.burbuja(G + 2.2 + i * 0.16, 0.035, 420 + i * 25); // bajo el agua
for (let i = 0; i < 6; i++) m.nota(G + 1.9 + i * 0.28, DO[i], 0.018, 0.6);       // el micelio se enciende hacia abajo
m.whoosh(N1 - 0.5, 1.0, 0.06);                                  // entramos al hielo

/* nivel 1 */
m.tic(N1 + 1.85, 0.06, 1800);                                   // se traza la línea que separa
m.nota(N1 + 2.3, 84, 0.016, 0.8);                               // el micelio del champiñón brilla
m.whoosh(N1b - 0.5, 0.9, 0.05);                                 // bajamos al pan
for (let i = 0; i < 10; i++) m.burbuja(N1b + 0.1 + i * 0.12, 0.03, 520 + i * 30);  // la miga se infla
m.whoosh(N1b + 1.0, 0.9, 0.05);                                 // zoom a la levadura
for (let i = 0; i < 12; i++) m.burbuja(N1b + 1.9 + i * 0.13, 0.03, 650 + (i % 4) * 60); // burbujitas de CO2

/* nivel 2 */
m.whoosh(Pe - 0.5, 0.9, 0.05); m.metal(Pe + 0.1, 0.03, 1250);  // placa de vidrio
m.sube(Pe + 0.3, 1.6, 67, 72, 0.012);                           // crece la colonia
m.nota(Pe + 1.4, 79, 0.016, 0.9);                               // halo limpio
for (let i = 0; i < 8; i++) m.tic(Qu + 0.9 + i * 0.13, 0.035, 1500 + i * 90);   // se encienden los anillos de quitina
m.whoosh(Qu + 2.0, 1.2, 0.05);                                  // los anillos viajan al caparazón
m.nota(Qu + 2.8, 76, 0.016, 1.0); m.nota(Qu + 3.1, 81, 0.014, 1.0); // brillo tornasol del escarabajo
for (let i = 0; i < 6; i++) m.tic(Qu + 3.2 + i * 0.09, 0.02, 2600); // patitas

/* nivel 3 */
m.whoosh(Br - 0.5, 0.9, 0.05);
for (let i = 0; i < 10; i++) m.nota(Br + 0.6 + i * 0.2, DO[i % 8], 0.016, 0.9); // cada Mycena que se enciende (luz verde)
for (let i = 0; i <= 10; i++) m.tic(Br + 1.0 + cruce(i / 10) * 1.2, 0.025, 1700); // contador +100
m.whoosh(Ar - 0.5, 0.9, 0.05); m.tic(Ar + 0.15, 0.05, 1200);   // tarjeta 2003
for (let i = 0; i < 6; i++) m.sube(Ar + 2.0 + i * 0.62, 0.6, 64 + (i % 3) * 2, 69 + (i % 3) * 2, 0.012); // el micelio pasa de raíz en raíz
m.nota(Ar + 3.75, 79, 0.016, 1.2);                             // ≈ 9.65 km²

/* re-gancho: la cámara se hunde y el micelio late */
m.whoosh(Pr, 1.8, 0.07);
for (let i = 0; i < 3; i++) m.latido(Pr + 0.4 + i * 0.84, 0.1);

/* nivel 4 */
for (let i = 0; i < 8; i++) m.tic(Ho + 0.3 + i * 0.15, 0.018, 2800); // pasitos
m.cruje(Ho + 1.4, 0.18);                                       // mordida en la vena
m.sube(Ho + 2.5, 0.8, 64, 57, 0.012);                          // se queda quieta
m.sube(Ho + 3.5, 2.0, 60, 72, 0.012); m.cruje(Ho + 3.6, 0.08); // brota el tallo
m.whoosh(La - 0.5, 0.9, 0.05);
for (let i = 0; i < 6; i++) m.burbuja(La + 0.4 + i * 0.22, 0.02, 380);  // el nematodo serpentea
m.golpe(La + 1.78, 0.1, 140); m.burbuja(La + 1.8, 0.05, 260); m.burbuja(La + 1.9, 0.05, 230); // ¡el anillo se infla!

/* nivel 5 */
m.whoosh(Se - 0.5, 0.9, 0.05);
for (let i = 0; i < 4; i++) m.tic(Se + 0.2 + i * 0.2, 0.025, 1100);   // aparecen los abanicos
for (let i = 0; i <= 14; i++) m.tic(Se + 3.7 + cruce(i / 14) * 1.4, 0.022, 1500 + i * 30); // contador 23,000
m.whoosh(Ra - 0.5, 0.9, 0.05); m.tic(Ra + 0.15, 0.05, 1200);   // tarjeta 2007
for (let i = 0; i < 24; i++) m.tic(Ra + 1.0 + i * 0.27 + m.rnd() * 0.12, 0.02, 3400); // chasquido Geiger suave
m.nota(Ra + 5.6, 74, 0.014, 1.2);                               // hipótesis

/* cierre: la cámara se aleja y todo se enciende */
m.whoosh(Ci, 2.0, 0.06);
for (let i = 0; i < 11; i++) m.nota(Ci + 0.2 + i * 0.15, DO[(i + 2) % 8], 0.014, 0.9); // cada escena brilla a su profundidad
m.guardar(OUT, 1);
