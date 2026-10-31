// gen-audio.mjs — cama grave + efectos del Shot Ambiental #50 (incendios del Bosque La Primavera). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Primavera base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
const G = K.Gancho, B = K.Bosque, A = K.Agua, F = K.Fuego, Ba = K.Basura, P = K.Pregunta, E = K.Estudio, At = K.Atorado, H = K.Hoy, C = K.Cierre, Ou = K.Outro;

// cama grave: tapada (tensa) mientras crece el fuego; libre en el cierre, cuando las flamas se apagan
m.pad(0, F, 0.05, [45, 52, 57], 0.2);
m.pad(F, C + 3.4, 0.05, [43, 50, 55], 0.6);
m.pad(C + 3.4, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
// gancho: 1,000 flamas que se encienden (cerillos) y las 2 naturales (rayo y volcán)
m.cruje(G + 0.05, 0.7); m.whoosh(G + 0.1, 0.8, 0.12);
m.golpe(G + 1.0, 0.3, 70); m.metal(G + 1.0, 0.08); m.golpe(G + 1.3, 0.35, 45);
m.nota(G + 3.0, 52, 0.06, 0.8);
// el mapa: bosque y ciudad
m.whoosh(B + 0.1, 0.8, 0.1); m.nota(B + 2.4, 64, 0.06, 0.9);
// agua: lluvia que se filtra
for (let i = 0; i < 16; i++) m.gota(A + 0.3 + i * 0.32, 0.07, 800 + (i % 4) * 110);
m.burbuja(A + 2.5, 0.05, 300); m.burbuja(A + 3.4, 0.05, 260);
// 2005: se seca y arde
m.cruje(F + 0.2, 0.3); for (let i = 0; i < 6; i++) m.cruje(F + 1.2 + i * 0.45, 0.35); m.sube(F + 1.2, 2.8, 52, 40, 0.05); m.golpe(F + 1.0, 0.3, 60);
// 2012: la quema de basura
m.golpe(Ba + 0.25, 0.25, 110); m.cruje(Ba + 0.3, 0.5); for (let i = 0; i < 6; i++) m.cruje(Ba + 1.0 + i * 0.45, 0.35); m.sube(Ba + 1.0, 2.8, 52, 40, 0.05);
// pregunta
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
// estudio: parcela y brotes que salen de la raíz
m.whoosh(E + 0.2, 0.7, 0.08); m.golpe(E + 1.6, 0.25, 90);
for (let i = 0; i < 8; i++) m.nota(E + 2.0 + i * 0.25, 60 + (i % 4) * 2, 0.05, 0.4);
m.nota(E + 4.6, 69, 0.05, 1.0);
// atorado: el pinito no sube y el cono tachado
m.sube(At + 0.3, 0.8, 57, 59, 0.04); m.sube(At + 1.0, 0.6, 59, 55, 0.04); m.golpe(At + 1.2, 0.3, 80);
// 2025: ~50 chispitas
for (let i = 0; i < 50; i++) m.tic(H + 0.4 + i * 0.064, 0.05, 1500 + (i % 5) * 200);
m.golpe(H + 0.6, 0.3, 60);
// cierre: tachas, el 911 y las flamas que se apagan
m.golpe(C + 0.9, 0.25, 120); m.golpe(C + 1.3, 0.25, 120);
for (let i = 0; i < 3; i++) { m.nota(C + 1.7 + i * 0.4, 81, 0.05, 0.25); m.nota(C + 1.75 + i * 0.4, 76, 0.04, 0.25); }
m.whoosh(C + 3.6, 3.4, 0.06);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
