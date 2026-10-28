// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #01 · Especial Día de Muertos (pan de muerto). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot PanDeMuerto base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K, E = m.ESC;
const G = K.Gancho, L = K.Levadura, Co = K.Come, S = K.Suelta, Gl = K.Gluten, P = K.Pregunta, H = K.Horno, Mi = K.Miga, Es = K.Estudio, Ge = K.Genoma, D = K.Dato, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.9, 0.05, [45, 52, 57]);
m.sube(G, 1.0, 50, 62, 0.07); m.golpe(G + 0.7, 0.25, 110);                     // el pan se infla
for (let k = 0; k < 5; k++) m.burbuja(G + 0.2 + k * 0.18, 0.12, 500 + k * 80);   // burbujitas
m.whoosh(L - 0.4, 1.4, 0.18);                                                    // zoom a la masa
for (let i = 0; i < 9; i++) m.nota(L + 0.8 + i * 0.12, E[i % 6 + 2], 0.04, 0.4); // aparecen las levaduras
for (let i = 0; i < 4; i++) m.burbuja(L + 2.2 + i * 0.5, 0.1, 380);              // brotan
for (let i = 0; i < 14; i++) m.tic(Co + 1.3 + i * 0.32, 0.06, 2200 + (i % 5) * 120); // se come cada cubito
for (let i = 0; i < 8; i++) (i % 3 === 2 ? m.gota(S + 0.3 + i * 0.3, 0.12, 700) : m.burbuja(S + 0.3 + i * 0.3, 0.16, 420)); // CO2 y alcohol
m.sube(Gl + 0.4, 3.4, 45, 57, 0.05);                                             // la masa se infla como globo
for (let i = 0; i < 5; i++) m.burbuja(Gl + 0.4 + i * 0.25, 0.14, 300);
m.nota(P + 0.1, 64, 0.06, 0.8); m.nota(P + 0.5, 67, 0.05, 0.8);
m.zumbido(H + 0.3, 4.2, 0.04, 110);                                              // horno
for (let i = 0; i < 7; i++) m.whoosh(H + 0.8 + i * 0.4, 0.5, 0.05);              // vapor
m.nota(H + 2.6, 57, 0.05, 1.0); m.nota(H + 3.0, 52, 0.05, 1.2);                  // se apagan las levaduras
m.cruje(Mi - 0.1, 0.4);                                                          // se parte el pan
for (let i = 0; i < 4; i++) m.nota(Mi + 1.4 + i * 0.2, E[6 + i], 0.04, 0.6);      // brillan los hoyitos
m.golpe(Es + 0.3, 0.35, 80);
for (let i = 0; i < 60; i++) m.tic(Es + 0.2 + i * 0.06, 0.025, 1800 + (i % 10) * 90); // los 600 puntitos
for (let i = 0; i < 8; i++) m.nota(Ge + 0.4 + i * 0.15, E[i + 3], 0.04, 0.5);    // cromosomas
m.sube(Ge + 1.6, 1.6, 52, 76, 0.04); m.nota(Ge + 3.2, 76, 0.07, 1.0);            // 6,000
m.sube(D + 0.3, 1.0, 52, 64, 0.04); m.sube(D + 0.3, 1.2, 52, 72, 0.04);          // barras
m.whoosh(D + 3.2, 0.9, 0.14); m.golpe(D + 4.3, 0.3, 90); m.metal(D + 4.35, 0.1, 1200); // entra el gen humano
m.nota(D + 4.5, 69, 0.07, 0.6); m.nota(D + 4.7, 76, 0.07, 0.9);                  // ¡funciona!
m.cruje(C + 1.2, 0.35); for (let i = 0; i < 5; i++) m.nota(C + 2.2 + i * 0.15, E[5 + i], 0.05, 0.7);
m.nota(Ou + 0.3, 57, 0.08, 3.0); m.nota(Ou + 0.3, 64, 0.06, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0);
m.guardar(OUT, 1);
