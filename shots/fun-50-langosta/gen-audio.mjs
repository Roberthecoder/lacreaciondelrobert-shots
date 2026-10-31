// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #50 (langosta con fiebre · Metarhizium acridum). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Langosta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Es = K.Espora, Pf = K.Perfora, Ad = K.Adentro, P = K.Pregunta, F = K.Fiebre, E = K.Estudio, R = K.Resultado, L = K.Lento, C = K.Cernicalos, M = K.Mexico, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53], 0.25);                                 // cama grave, algo tensa (la pelea)
m.sube(G + 0.2, 1.4, 50, 62, 0.04); m.zumbido(G + 0.2, 3.5, 0.02, 120);       // sube el termómetro, calor
for (let i = 0; i < 14; i++) m.tic(H + 0.3 + i * 0.12, 0.05, 2200 + (i % 3) * 200); // caen las esporas
m.nota(H + 2.0, 67, 0.06, 0.5); m.nota(H + 2.4, 71, 0.06, 0.6);              // ✓ langosta, ✓ chapulín
m.whoosh(Es - 0.3, 0.8, 0.08);                                                 // al microscopio
m.tic(Es + 1.3, 0.14, 1200);                                                    // la espora se pega
m.sube(Pf + 0.1, 1.1, 55, 60, 0.03); m.nota(Pf + 1.0, 64, 0.05, 0.4);          // tubo germinativo y apresorio
m.golpe(Pf + 1.6, 0.3, 70); m.cruje(Pf + 1.8, 0.6); m.cruje(Pf + 2.6, 0.5);   // presión y perforación
for (let i = 0; i < 8; i++) m.burbuja(Ad + 0.3 + i * 0.3, 0.06, 240 + i * 20); // sangre y levaduras
m.sube(P + 0.1, 1.3, 52, 64, 0.05);
for (let i = 0; i < 12; i++) m.tic(F + 0.3 + i * 0.4, 0.05, i % 2 ? 1800 : 1400); // relojes
m.sube(F + 3.0, 1.0, 55, 43, 0.04);                                            // la mayoría muere
m.golpe(E + 0.2, 0.35, 80); m.nota(E + 2.0, 69, 0.05, 0.5);                    // 2005 · Níger
m.zumbido(E + 3.0, 3.0, 0.04, 95); m.whoosh(E + 3.0, 2.5, 0.06);               // avioneta y rocío
for (let i = 0; i < 20; i++) m.tic(R + 0.2 + i * 0.2, 0.04, 2600);             // corren los días
for (let i = 0; i < 6; i++) m.golpe(R + 1.2 + i * 0.45, 0.12, 120);            // caen langostas
m.sube(R + 2.7, 1.5, 55, 67, 0.04);                                            // la barra llega al 80 %
m.cruje(L + 0.4, 0.2); m.tic(L + 1.3, 0.1, 900);
m.nota(L + 3.0, 72, 0.05, 0.5); m.nota(L + 3.3, 76, 0.05, 0.6);               // ✓ hormigas, ✓ aves
for (let i = 0; i < 7; i++) m.whoosh(C + 0.2 + i * 0.25, 0.4, 0.05);           // llegan las aves
m.golpe(C + 2.6, 0.2, 140);                                                    // el cernícalo atrapa una langosta
m.nota(M + 0.6, 64, 0.06, 0.5); m.whoosh(M + 3.2, 1.6, 0.07); m.nota(M + 4.8, 69, 0.06, 0.8); // Tecomán → Costa Rica
m.zumbido(Ci, 2.0, 0.02, 120); m.whoosh(Ci + 0.6, 0.6, 0.06); m.nota(Ci + 1.2, 57, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
