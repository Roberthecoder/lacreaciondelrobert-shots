// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #154 (antifúngicos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Cama de laboratorio con pulso interno (~104 BPM): la armonía cambia cada 2–4 compases y nunca repite el mismo patrón más de 4 compases.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Antifungicos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 154);
const K = m.K;
const G = K.Gancho, Ar = K.Arbol, Ce = K.Celula, Po = K.Pocos, Fa = K.Familias, Pr = K.Pregunta, Me = K.Membrana, Az = K.Azoles, Pa = K.Pared, Es = K.Estudio, Ri = K.Rinon, Di = K.Diez, Ci = K.Cierre, Ou = K.Outro;

// cama: progresión con función (i – VI – III – VII en la menor y vuelta), un acorde por sección
m.pad(0, Po, 0.05, [45, 52, 57], 0.1);                 // Am
m.pad(Po, Pr + 1.7, 0.05, [41, 48, 57], 0.3);          // F (tensa: "pocos blancos")
m.pad(Pr + 1.7, Pa, 0.05, [48, 55, 60], 0);            // C (se abre: "atacan lo distinto")
m.pad(Pa, Es, 0.05, [43, 50, 59], 0);                  // G
m.pad(Es, Ri, 0.05, [45, 52, 60], 0);                  // Am (historia)
m.pad(Ri, Di, 0.05, [40, 47, 55], 0.25);               // Em (alerta del riñón)
m.pad(Di, Ou + 3.7, 0.05, [45, 52, 57], 0);            // Am (regreso)
// pulso interno: bajo suave a 104 BPM con variación de frase cada 4 compases (nota de llegada distinta)
const BEAT = 60 / 104, RAIZ = [[0, 45], [Po, 41], [Pr + 1.7, 48], [Pa, 43], [Es, 45], [Ri, 40], [Di, 45]];
for (let t = 0, b = 0; t < Ou; t += BEAT, b++) {
  const r = RAIZ.filter(([a]) => t >= a).pop()[1], comp = Math.floor(b / 4) % 4, tiempo = b % 4;
  const nota = tiempo === 0 ? r : tiempo === 2 ? r + 7 : tiempo === 3 && comp === 3 ? r + 10 : r + 12;
  m.bajo(t, nota - 12, tiempo === 0 ? 0.07 : 0.04, 0.45);
}
// motivo de marimba (4 notas) que vuelve en otra altura en cada parte, con respuesta
const motivo = (t, base, g = 0.045) => [0, 3, 7, 5].forEach((d, i) => m.nota(t + i * BEAT / 2, base + d, g, 0.5));
motivo(G + 0.6, 69); motivo(Ce + 0.2, 72); motivo(Me + 0.4, 72); motivo(Pa + 0.3, 74); motivo(Es + 0.2, 69); motivo(Di + 0.2, 76); motivo(Ci + 0.4, 69);

// efectos en el mismo cuadro
m.whoosh(G + 0.1, 0.5, 0.1); m.tic(G + 0.75, 0.35, 900); m.golpe(G + 0.4, 0.3, 90); // cápsula cae · "≈"
m.sube(G, 2.4, 40, 47, 0.03);                                                   // crece el moho
for (let i = 0; i < 5; i++) m.tic(Ar + 0.15 + i * 0.4, 0.12, 1200 + i * 150);   // se dibuja el árbol
m.nota(Ar + 3.0, 76, 0.05, 0.8); m.nota(Ar + 3.1, 81, 0.04, 0.8);               // "grupos hermanos"
m.tic(Ce + 0.6, 0.3, 2000); m.tic(Ce + 0.65, 0.3, 2600);                        // los dos núcleos se encienden
for (let i = 0; i < 3; i++) { m.golpe(Po + 0.75 + i, 0.25, 70); m.cruje(Po + 0.8 + i, 0.15); } // ✗ también tú (3)
for (let i = 0; i < 5; i++) m.tic(Fa + 0.6 + i * 0.25, 0.25, 1500);            // 5 familias
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);                                            // re-gancho
for (let i = 0; i < 7; i++) m.burbuja(Me + 0.3 + i * 0.12, 0.06, 420 + i * 30); // lípidos (tu membrana)
for (let i = 0; i < 7; i++) m.burbuja(Me + 1.9 + i * 0.12, 0.06, 620 + i * 30); // lípidos (la del hongo)
m.metal(Az + 1.3, 0.2, 520); m.golpe(Az + 1.3, 0.35, 60);                        // el azol atora la máquina
for (let i = 0; i < 3; i++) m.burbuja(Az + 2.5 + i * 0.3, 0.12, 700);           // la esponja arranca ergosteroles
m.whoosh(Pa + 0.2, 1.1, 0.08);                                                  // aparece la pared
m.golpe(Pa + 2.4, 0.3, 80);                                                     // equinocandina tapa la sintasa
m.sube(Pa + 2.6, 1.2, 60, 50, 0.04);                                            // la pared se adelgaza
for (let i = 0; i < 7; i++) m.tic(Es + 0.6 + i * 0.12, 0.12, 900 + i * 60);     // 7 tubos de tierra
for (let i = 0; i < 4; i++) m.metal(Es + 2.4 + i * 0.3, 0.06, 1500 + i * 120);  // frasco de vidrio por correo
m.sube(Es + 4.3, 1.3, 55, 64, 0.04);                                            // crece la bacteria
m.golpe(Es + 7.0, 0.25, 110);                                                   // la nistatina se pega
for (let i = 0; i < 3; i++) m.burbuja(Ri + 0.8 + i * 0.4, 0.12, 380);          // jala colesterol
m.zumbido(Ri + 1.6, 1.0, 0.05, 150);                                            // alerta en el riñón
m.golpe(Ri + 2.2, 0.3, 80);                                                     // tarjeta 2023
m.nota(Ri + 4.8, 79, 0.05, 0.8);                                                // AM-2-19
for (let i = 0; i < 3; i++) m.burbuja(Ri + 5.5 + i * 0.35, 0.1, 720);          // solo ergosterol
for (let i = 0; i < 4; i++) m.tic(Di + 0.75 + i * 0.35, 0.3, 1000);            // 4 cápsulas en la línea
for (let i = 0; i < 3; i++) m.nota(Ci + 0.8 + i * 0.3, [72, 76, 79][i], 0.05, 0.6); // 3 dianas
m.nota(Ou + 0.3, 57, 0.08, 3.0); m.nota(Ou + 0.3, 64, 0.06, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0);
m.guardar(OUT, 1);
