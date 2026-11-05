// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #71 (hongo nido de pájaro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 71);
const K = m.K;
const G = K.Gancho, H = K.Hongo, D = K.Donde, Hu = K.Huevito, P = K.Pregunta, Go = K.Gota, V = K.Vuelo, E = K.Estudio, En = K.Energia, F = K.Freno, He = K.Herbivoro, C = K.Cierre, Ou = K.Outro;

// Cama grave y continua, húmeda; la armonía camina por secciones (nunca el mismo acorde todo el shot).
m.pad(0, D, 0.05, [45, 52, 57]);            // la menor: la copa bajo la lluvia
m.pad(D, P, 0.05, [41, 48, 57]);            // fa: dónde vive, por dentro
m.pad(P, Go, 0.05, [43, 50, 55], 0.2);      // sol, un poco tapado: la pregunta
m.pad(Go, E, 0.055, [48, 52, 55]);          // do: el disparo se abre
m.pad(E, F, 0.05, [41, 48, 53]);            // fa: el estudio
m.pad(F, C, 0.05, [43, 50, 59]);            // sol: el cordón y el venado
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57]);     // regresa al inicio
// Motivo de cuatro notas (gota que cae) que vuelve cambiado en cada parte.
const motivo = (t, base, g = 0.045) => [0, 3, 7, 5].forEach((d, i) => m.nota(t + i * 0.22, base + d, g, 0.5));
motivo(H + 0.2, 69); motivo(Hu + 0.3, 65); motivo(E + 0.4, 65, 0.04); motivo(C + 0.3, 69, 0.05);

// Gancho: gota que cae junto a la copa y salpica; lluvia ligera.
m.whoosh(G + 0.1, 0.6, 0.06); m.gota(G + 0.75, 0.3, 700); for (let i = 0; i < 4; i++) m.gota(G + 0.8 + i * 0.05, 0.08, 1300 + i * 200);
for (let i = 0; i < 10; i++) m.gota(G + 1.4 + i * 0.37, 0.05, 900 + (i % 4) * 160);
m.tic(G + 2.4, 0.15, 1400);                                                     // chip
m.tic(H + 0.3, 0.12, 1500); m.tic(H + 0.9, 0.12, 1700); m.tic(H + 1.6, 0.1, 1900); // etiquetas
// Dónde: tres tarjetas y siete puntos en el mapa.
for (let i = 0; i < 3; i++) m.golpe(D + 0.2 + i * 0.8, 0.18, 120);
m.whoosh(D + 3.1, 0.5, 0.06);
for (let i = 0; i < 7; i++) m.nota(D + 3.7 + i * 0.18, 62 + [0, 2, 4, 5, 7, 9, 12][i], 0.04, 0.4);
// Por dentro: esporas que aparecen y el resorte del cordón.
for (let i = 0; i < 12; i++) m.burbuja(Hu + 0.4 + i * 0.1, 0.04, 500 + i * 40);
m.sube(Hu + 2.0, 1.0, 55, 67, 0.04); m.nota(Hu + 3.3, 76, 0.05, 0.6);           // cordón y punta pegajosa
m.sube(P + 0.1, 1.5, 52, 62, 0.05);                                             // re-gancho
// La gota pega en el borde y el huevito sale disparado.
const golpe = Go + 1.25;
m.whoosh(Go + 0.2, 1.0, 0.07); m.gota(golpe, 0.4, 600); m.golpe(golpe, 0.25, 140);
for (let i = 0; i < 9; i++) m.gota(golpe + 0.03 + i * 0.03, 0.07, 1500 + i * 120);
m.whoosh(golpe + 0.1, 0.7, 0.12); m.tic(Go + 2.0, 0.14, 1400);
// Vuelo: velocímetro, arco y regla.
m.sube(V + 0.5, 1.0, 60, 72, 0.04); m.whoosh(V + 0.4, 2.2, 0.06); m.tic(V + 2.6, 0.2, 900);
for (let i = 0; i <= 10; i++) m.tic(V + 2.4 + i * 0.06, 0.06, 2200);
// Estudio: cámara (clics de cuadro) y película.
m.golpe(E + 0.2, 0.3, 80); for (let i = 0; i < 16; i++) m.tic(E + 2.4 + i * 0.12, 0.05, 3000);
// Energía: la barra se llena y una rebanadita se va con el huevito.
m.sube(En + 0.3, 0.9, 48, 60, 0.04); m.nota(En + 1.6, 79, 0.05, 0.5); m.tic(En + 1.65, 0.2, 2600);
// Freno: vuelo, se pega (clic pegajoso), resorte que se desenrolla, columpio.
m.whoosh(F + 0.1, 1.4, 0.08); m.tic(F + 1.5, 0.3, 700); m.burbuja(F + 1.5, 0.08, 300);
m.sube(F + 1.5, 0.7, 70, 58, 0.04); for (let i = 0; i < 3; i++) m.nota(F + 2.2 + i * 0.95, 64 - i * 2, 0.03, 0.6);
// Venado: entra, mastica (crujiditos) y se come el huevito.
m.whoosh(He + 0.6, 1.0, 0.07); for (let i = 0; i < 6; i++) m.cruje(He + 1.9 + i * 0.27, 0.25);
m.tic(He + 2.4, 0.14, 1400);
// Cierre: lluvia otra vez y acorde final.
for (let i = 0; i < 6; i++) m.gota(C + 0.2 + i * 0.55, 0.06, 900 + (i % 3) * 200);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
