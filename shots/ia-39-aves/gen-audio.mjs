// gen-audio.mjs — cama grave + efectos del Shot IA #39 (el canto que se vuelve imagen). Sin costo: todo se calcula (audio-kit.mjs).
// Los cantos son sintetizados (no son grabaciones de aves reales). Uso: node gen-audio.mjs → assets/mezcla.wav
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Aves base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 39);
const K = m.K;
const G = K.Gancho, E = K.Espectro, F = K.Foto, P = K.Pregunta, V = K.Voluntarios, Es = K.Estudio, Cr = K.Crece, Ge = K.Gente, J = K.Jardin, C = K.Cierre, Ou = K.Outro;

// mismos eventos que avEventos() de aves.jsx: cada trazo del espectrograma tiene su sonido
const TIPOS = ['curva', 'rayitas', 'puntitos', 'curva'];
function canto(t0, t1, paso, g = 1) {
  let i = 0;
  for (let t = t0; t < t1; t += paso, i++) {
    const tipo = TIPOS[i % 4];
    if (tipo === 'curva') { m.sube(t, 0.4, 81 + (i % 3), 93 + (i % 2) * 2, 0.05 * g); }
    else if (tipo === 'rayitas') { for (let k = 0; k < 5; k++) m.tic(t + k * 0.05, 0.16 * g, 2600 + k * 150); }
    else { for (let k = 0; k < 6; k++) m.nota(t + k * 0.09, 91, 0.035 * g, 0.12); }
  }
}

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
canto(G + 0.25, E + 1.0, 0.7, 1);                                   // el zanate canta (y el celular escucha)
m.whoosh(E - 0.9, 1.2, 0.14);                                       // la cámara entra al celular
m.zumbido(E + 0.2, 1.6, 0.025, 160);                                // la onda
canto(E + 1.2, F + 0.6, 0.75, 0.8);                                 // espectrograma grande
m.zumbido(E + 1.4, 6.0, 0.015, 220);
[0.9, 1.4, 1.9].forEach((d, k) => m.burbuja(F + d, 0.16, 420 + k * 120));   // tres huellas
m.tic(F + 2.6, 0.3, 1800); m.tic(F + 2.75, 0.25, 2400);            // clic del visor
m.zumbido(F + 3.2, 1.8, 0.03, 300); m.sube(F + 3.2, 1.6, 60, 72, 0.03);       // la red "lee"
m.sube(P + 0.05, 1.4, 50, 62, 0.05);                                // ?
for (let i = 0; i < 26; i++) m.gota(V + 0.6 + i * 0.12, 0.08, 900 + (i % 6) * 120);   // puntitos del globo
m.golpe(Es + 0.2, 0.35, 80);                                        // tarjeta
for (let i = 0; i < 22; i++) m.tic(Es + 3.4 + i * 0.1, 0.06, 1200 + i * 40);          // capas que se apilan
m.sube(Es + 3.4, 2.2, 50, 74, 0.035);
m.sube(Cr + 0.3, 2.4, 52, 72, 0.035);                               // 984
m.golpe(Cr + 3.6, 0.45, 70); m.sube(Cr + 3.7, 1.9, 60, 79, 0.04);  // +3 000
for (let i = 0; i < 18; i++) m.burbuja(Ge + 0.5 + i * 0.09, 0.07, 700 + (i % 5) * 90); // celulares
m.whoosh(Ge + 3.6, 0.6, 0.12);
m.zumbido(Ge + 4.4, 3.0, 0.02, 140);                                // vuelo de la grulla
m.nota(Ge + 7.4, 69, 0.06, 0.8); m.nota(Ge + 7.45, 74, 0.05, 0.8);
m.sube(J + 0.3, 1.6, 55, 76, 0.035);                                // +6 000
[3.2, 3.8, 4.4].forEach((d, k) => { m.burbuja(J + d, 0.14, 500 + k * 100); m.sube(J + d + 0.1, 0.3, 84 + k * 2, 93, 0.035); });
canto(C + 0.3, Ou, 0.9, 0.8);                                       // cierre: el mismo canto
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
