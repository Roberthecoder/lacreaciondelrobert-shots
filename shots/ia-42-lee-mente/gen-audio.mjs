// gen-audio.mjs — cama grave + efectos del Shot IA #42 (¿una IA puede leer tu mente?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot LeeMente base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 42);
const K = m.K;
const G = K.Gancho, Es = K.Escaner, A = K.Aprende, Ej = K.Ejemplo, P = K.Pregunta, Aj = K.Ajeno, Sa = K.Sabotaje, Ex = K.Extra, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 56]);                                            // cama grave, un poco misteriosa
m.zumbido(G + 0.15, 1.1, 0.05, 240);                                                // el rayo viaja
m.metal(G + 1.25, 0.3, 700); m.golpe(G + 1.25, 0.35, 70);                          // choca con el candado
m.sube(G + 1.3, 0.9, 64, 52, 0.04);                                                // rebota
m.whoosh(Es - 0.2, 0.5, 0.12);
for (let i = 0; i < 12; i++) m.tic(Es + 0.3 + i * 0.4, 0.08, 900);                  // golpeteo de la resonancia
for (let i = 0; i < 3; i++) m.burbuja(Es + 0.85 + i * 0.35, 0.14, 420 + i * 80);   // 3 personas
m.sube(Es + 3.0, 1.6, 50, 70, 0.04);                                               // 16 h
m.whoosh(A - 0.2, 0.5, 0.12);
[0.4, 0.9, 1.4, 1.9].forEach((d, i) => m.nota(A + d, m.ESC[5 + i], 0.05, 0.5));    // zonas que se prenden
for (let i = 0; i < 18; i++) m.tic(A + 4.6 + i * 0.11, 0.05, 2200 + (i % 4) * 150); // la pantalla escribe
m.whoosh(Ej, 0.5, 0.12); m.nota(Ej + 0.3, 64, 0.05, 0.5);
for (let i = 0; i < 26; i++) m.tic(Ej + 3.6 + i * 0.11, 0.05, 2200 + (i % 4) * 150); // escribe la frase de la máquina
m.cruje(Ej + 7.9, 0.3); m.nota(Ej + 8.3, 72, 0.06, 0.7); m.nota(Ej + 8.35, 76, 0.05, 0.7);  // tachado y "misma idea ✔"
m.sube(P + 0.05, 1.4, 50, 62, 0.05); m.golpe(P + 2.8, 0.3, 80);
m.whoosh(Aj, 0.5, 0.12);
for (let i = 0; i < 10; i++) m.nota(Aj + 1.0 + i * 0.2, m.ESC[Math.floor(m.rnd() * 6)] - 1, 0.03, 0.15);   // letras revueltas, desafinadas
m.sube(Aj + 1.8, 0.8, 52, 54, 0.04);
m.whoosh(Sa, 0.5, 0.12);
[1.0, 1.6, 2.2, 2.8].forEach((d, i) => m.burbuja(Sa + d, 0.18, 380 + i * 90));     // un pop por animal
m.sube(Sa + 2.9, 1.4, 70, 48, 0.05);                                               // los aciertos se desploman
m.whoosh(Ex, 0.5, 0.12); m.nota(Ex + 0.4, 69, 0.04, 1.2); m.nota(Ex + 1.0, 72, 0.04, 1.2);
m.whoosh(C, 0.5, 0.12); m.metal(C + 0.9, 0.3, 900); m.tic(C + 0.95, 0.3, 1500);     // clic del candado
m.nota(C + 1.4, 72, 0.06, 0.9); m.nota(C + 1.45, 76, 0.05, 0.9);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
