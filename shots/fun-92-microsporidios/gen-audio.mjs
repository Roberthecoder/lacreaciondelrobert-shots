// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #92 (microsporidios). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Arpon base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 92);
const K = m.K;
const G = K.Gancho, Q = K.Quien, Pa = K.Pariente, R = K.Resorte, D = K.Dispara, V = K.Viaja, P = K.Pregunta, E = K.Estudio, Ve = K.Velocidad, Ps = K.Pasteur, Ge = K.Genoma, C = K.Cierre, Ou = K.Outro;

// la música está «cargada» (tapada y tensa) mientras el tubo está enrollado y se libera en cada disparo
m.pad(0, G + 0.4, 0.05, [40, 47, 52], 0.5);       // Em tenso
m.pad(G + 0.4, R, 0.05, [40, 47, 55], 0.15);      // se suelta con el disparo del gancho
m.pad(R, D + 0.8, 0.05, [41, 48, 53], 0.55);      // F tapado: el resorte cargado
m.pad(D + 0.8, P, 0.05, [43, 50, 59], 0.1);       // G: disparo y viaje
m.pad(P, Ps, 0.05, [45, 52, 57], 0.2);            // Am: el estudio
m.pad(Ps, Ge, 0.05, [38, 45, 53], 0.3);           // Dm: la seda que se hunde
m.pad(Ge, Ou + 3.5, 0.05, [40, 47, 52, 59], 0.15);// Em abierto: el arpón espera
const disparo = (t, d = 0.8) => { m.sube(t, d, 55, 84, 0.06); m.whoosh(t, d, 0.18); m.tic(t + d, 0.3, 2200); };
for (let i = 0; i < 4; i++) m.tic(G + 0.05 + i * 0.07, 0.08, 900 - i * 80);   // el resorte se tensa
disparo(G + 0.35, 0.85);
for (let i = 0; i < 8; i++) m.burbuja(Q + 0.6 + i * 0.3, 0.05, 380 + i * 30);  // esporas dentro de la célula
m.nota(Pa + 0.9, 67, 0.05, 0.8); m.nota(Pa + 1.1, 71, 0.05, 0.8);              // las dos ramas
m.golpe(Pa + 2.6, 0.2, 120);                                                  // entra el glóbulo rojo
for (let i = 0; i < 7; i++) m.nota(R + 0.6 + i * 0.12, 64 + i * 2, 0.035, 0.3, 0.5); // 7 vueltas del resorte
disparo(D + 0.8, 1.4); m.golpe(D + 2.2, 0.3, 90);                             // se clava
for (let i = 0; i < 10; i++) m.burbuja(V + 0.4 + i * 0.26, 0.06, 300 + i * 25); // el contenido se escurre
m.gota(V + 3.0, 0.3, 500);                                                   // llega a la célula
m.sube(P + 0.1, 1.2, 50, 62, 0.05); for (let i = 0; i < 4; i++) m.tic(P + 0.2 + i * 0.3, 0.06, 1400);
m.golpe(E + 0.2, 0.35, 80); for (let i = 0; i < 18; i++) m.tic(E + 0.6 + i * 0.28, 0.035, 3000); // carrete de película
disparo(Ve + 0.3, 0.83);
for (let i = 0; i < 21; i++) m.tic(Ve + 1.6 + i * 0.03, 0.04, 1800 + i * 40);  // la regla
for (let i = 0; i < 8; i++) m.tic(Ps + 0.5 + i * 0.14, 0.05, 500);             // manchitas negras
m.golpe(Ps + 2.0, 0.3, 110); m.golpe(Ps + 2.6, 0.4, 55);                       // 26,000 t → 6,500 t
[0, 1, 2].forEach((i) => m.nota(Ge + 0.3 + i * 0.6, [52, 64, 79][i], 0.05, 0.9)); // barras: grave → agudo diminuto
m.nota(Ou + 0.3, 40, 0.08, 2.8); m.nota(Ou + 0.3, 47, 0.06, 2.8); m.nota(Ou + 0.3, 52, 0.05, 2.8);
m.guardar(OUT, 1);
