// gen-audio.mjs — cama grave + efectos del Shot IA #49 (ELIZA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Eliza base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 49);
const K = m.K;
const G = K.Gancho, D = K.Dialogo, R = K.Reglas, E = K.Estudio, P = K.Pregunta, S = K.Secretaria, Es = K.Espiar, Ef = K.Efecto, C = K.Codigo, H = K.Hoy, Ci = K.Cierre, Ou = K.Outro;
const teclea = (t, d, cada = 0.07) => { for (let x = 0; x < d; x += cada) m.tic(t + x + m.rnd() * 0.02, 0.07, 1500 + m.rnd() * 900); };
const campana = (t) => m.metal(t, 0.12, 1900);   // retorno de carro del teletipo

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G, 4.8, 0.015, 120);                                   // motor del teletipo
teclea(G + 0.1, 0.8); m.whoosh(G + 1.5, 0.4, 0.1); m.nota(G + 1.7, 69, 0.05, 0.5);   // rayos X
[2.0, 2.35, 2.7].forEach((x) => m.tic(G + x, 0.12, 2600));       // aparecen las reglas
for (let k = 0; k < 4; k++) m.burbuja(G + 0.6 + k * 0.8, 0.08, 700); // secretos que viajan
m.whoosh(D - 0.2, 0.5, 0.1);
[[0.2, 0.9], [0.9, 0.4], [1.4, 0.7], [2.1, 0.6], [2.6, 0.9], [3.8, 0.8]].forEach(([a, d]) => { teclea(D + a, d); campana(D + a + d); });
m.zumbido(R, 8.0, 0.02, 180);                                    // por dentro de la máquina
m.golpe(R + 0.2, 0.3, 90); m.nota(R + 0.6, 72, 0.05, 0.4);       // paso 1: palabras clave
m.golpe(R + 1.7, 0.3, 90); m.tic(R + 2.1, 0.2, 3000); m.tic(R + 2.3, 0.2, 3200);   // paso 2: mi→tu, me→te
m.golpe(R + 3.1, 0.3, 90); m.whoosh(R + 3.3, 0.7, 0.1);          // paso 3: regresa la frase
m.golpe(R + 4.4, 0.3, 80); m.gota(R + 5.8, 0.2, 700); m.nota(R + 6.0, 64, 0.05, 0.6);  // "deprimida" cae
teclea(R + 6.7, 0.7); teclea(R + 7.4, 0.5);
m.golpe(E + 0.2, 0.35, 80); m.nota(E + 3.3, 67, 0.04, 0.6); m.nota(E + 4.1, 72, 0.04, 0.6);  // barco
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
teclea(S + 0.2, 2.0, 0.09); for (let k = 0; k < 8; k++) m.tic(S + 0.3 + k * 0.31, 0.08, 900);  // hojas del calendario
m.nota(S + 2.9, 60, 0.05, 0.5); m.golpe(S + 5.2, 0.45, 70);      // la puerta se cierra
m.golpe(Es + 0.2, 0.25, 90);
for (let k = 0; k < 8; k++) m.nota(Es + 1.5 + k * 0.16, 76 + (k % 3), 0.035, 0.15);   // "¡espía!"
m.metal(Es + 2.9, 0.18, 600);                                    // candado
m.whoosh(Ef, 0.5, 0.1); m.sube(Ef + 0.6, 1.6, 55, 67, 0.04); m.nota(Ef + 2.2, 72, 0.05, 0.9); m.nota(Ef + 2.25, 76, 0.04, 0.9);  // corazón
m.cruje(C + 0.4, 0.3); m.sube(C + 0.6, 1.2, 52, 70, 0.04);       // papel continuo + 50+
m.golpe(C + 3.3, 0.55, 60);                                      // sello 2021
m.whoosh(H - 0.2, 0.5, 0.1); m.burbuja(H + 0.3, 0.14, 900); m.burbuja(H + 1.3, 0.14, 650);  // notificaciones del chat
m.whoosh(Ci + 1.6, 0.6, 0.12); [2.0, 2.2, 2.4].forEach((x) => m.tic(Ci + x, 0.14, 2600)); m.nota(Ci + 3.0, 72, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
