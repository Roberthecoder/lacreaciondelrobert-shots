// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #47 (toxina botulínica). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Botox base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, Ba = K.Bacteria, Do = K.Dosis, Ne = K.Nervio, Co = K.Corte, Si = K.Silencio, Pr = K.Pregunta, Es = K.Estudio,
  Ap = K.Aprobacion, Us = K.Usos, Fa = K.Fabrica, Cl = K.Clave, Ke = K.Kerner, Ci = K.Cierre, Ou = K.Outro;

// cama grave continua: se ahoga cuando el nervio se queda callado y vuelve cálida con la medicina
m.pad(0, Co + 1.5, 0.05, [45, 52, 57]);
m.pad(Co + 1.5, Pr, 0.035, [45, 52], 0.85);
m.pad(Pr, Ou + 3.5, 0.05, [45, 52, 57, 60]);
// gancho: vidrio del frasquito y la etiqueta que se voltea
m.metal(G + 0.1, 0.12, 1500); m.whoosh(G + 1.6, 0.6, 0.14); m.golpe(G + 2.3, 0.25, 70);
// bacteria: la lata abultada y la lupa
for (let i = 0; i < 6; i++) m.burbuja(Ba + 0.1 + i * 0.3, 0.06, 380 + i * 30);
m.whoosh(Ba + 0.25, 0.55, 0.12);
// dosis: un punto que late
for (let i = 0; i < 6; i++) m.tic(Do + 0.4 + i * 1.26, 0.06, 2600);
m.golpe(Do + 0.3, 0.3, 75);
// nervio: la lupa y un "pop" por cada vesícula que suelta acetilcolina (mismos tiempos que el dibujo)
m.whoosh(Ne + 0.2, 0.55, 0.12);
const cortes = [Co + 1.5, Co + 2.0, Co + 2.5];
for (let i = 0; i < 3; i++) for (let k = 0; k < 10; k++) { const t0 = Ne + 0.5 + i * 0.42 + k * 1.3; if (t0 > cortes[i] - 0.4) break; m.burbuja(t0 + 0.25, 0.08, 900 + i * 120); }
// corte: un clic seco por cada SNAP-25 que se corta
for (const c of cortes) { m.tic(c, 0.25, 3200); m.tic(c + 0.04, 0.18, 2200); }
// silencio: el músculo se afloja
m.sube(Si + 0.2, 1.4, 57, 45, 0.04);
// pregunta
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
// estudio: tarjeta, inyecciones y el ojo que se alinea
m.golpe(Es + 0.6, 0.3, 80); m.tic(Es + 2.0, 0.15, 3000); m.tic(Es + 3.6, 0.15, 3000);
m.nota(Es + 3.8, 64, 0.05, 0.8); m.nota(Es + 4.6, 69, 0.06, 1.0);
// aprobación: sello
m.golpe(Ap + 0.45, 0.45, 70); m.metal(Ap + 0.5, 0.08, 600);
// usos: rayos de la migraña y gotas de sudor
m.zumbido(Us + 0.2, 1.0, 0.04, 220);
for (let i = 0; i < 6; i++) m.gota(Us + 1.4 + i * 0.28, 0.12, 1000);
// fábrica: motor del tanque y goteo del filtro
m.motor(Fa, 3.4, 0.06);
for (let i = 0; i < 8; i++) m.gota(Fa + 0.8 + i * 0.35, 0.1, 850);
// clave: la gotita y las hojas del calendario
m.tic(Cl + 1.0, 0.2, 3000); m.nota(Cl + 1.1, 69, 0.05, 0.9);
for (let i = 0; i < 3; i++) m.whoosh(Cl + 2.1 + 0.8 * (i + 1), 0.3, 0.08);
// Kerner: libro y la idea
m.golpe(Ke + 0.3, 0.2, 90); m.nota(Ke + 2.2, 72, 0.06, 1.0); m.nota(Ke + 2.4, 76, 0.05, 1.0);
// cierre
m.metal(Ci + 0.2, 0.1, 1500);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
