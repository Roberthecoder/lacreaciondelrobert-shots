// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #12 (caspa y Malassezia). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Caspa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 12);
const K = m.K;
const G = K.Gancho, Ma = K.Malassezia, Se = K.Sebo, Li = K.Lipasas, Ol = K.Oleico, P = K.Pregunta, Tr = K.Tres, Es = K.Escamas, Est = K.Estudio, Re = K.Resultado, Ge = K.Genoma, Ch = K.Champu, C = K.Cierre, Ou = K.Outro;

// cama grave continua: algo "con comezón" (tapada) mientras dura el problema, más libre al final
m.pad(0, C, 0.05, [45, 52, 57], 0.35);
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
for (let i = 0; i < 7; i++) m.tic(G + 0.15 + i * 0.18, 0.1, 3200 + i * 120);       // escamas que caen
m.whoosh(G + 2.3, 0.5, 0.12);                                                      // chip: hay una levadura
m.whoosh(Ma + 0.1, 0.9, 0.18); m.zumbido(Ma + 0.4, 1.2, 0.03, 140);                 // la lupa se abre
for (let i = 0; i < 5; i++) m.burbuja(Ma + 0.5 + i * 0.15, 0.08, 600 + i * 40);     // aparecen las levaduras
m.whoosh(Se - 0.2, 0.6, 0.12);
for (let i = 0; i < 6; i++) m.gota(Se + 0.5 + i * 0.3, 0.12, 700 + i * 30);        // el sebo sube por el folículo
for (let i = 0; i < 3; i++) { m.metal(Li + 1.3 + i * 0.7, 0.12, 2600); m.tic(Li + 1.35 + i * 0.7, 0.2, 4200); } // cortes de la lipasa
m.nota(Ol + 0.6, 64, 0.06, 0.9); m.nota(Ol + 1.4, 69, 0.05, 0.9);                  // el ácido oleico y el aceite de oliva
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                                // pregunta
for (let i = 0; i < 3; i++) m.golpe(Tr + 0.6 + i * 0.75, 0.25, 110 + i * 15);       // grasa + levadura + piel
m.nota(Tr + 3.0, 57, 0.06, 1.0);                                                   // = caspa
m.latido(Es + 0.5, 0.12); m.latido(Es + 1.3, 0.12); m.latido(Es + 1.9, 0.12);       // la piel se renueva más rápido
for (let k = 0; k < 3; k++) m.cruje(Es + 1.2 + k * 0.9, 0.25);                      // escamas que se despegan
m.golpe(Est + 0.2, 0.3, 80);                                                       // tarjeta 2005
for (let i = 0; i < 6; i++) m.gota(Est + 3.0 + i * 0.35, 0.14, 1100);              // el gotero
for (let i = 0; i < 6; i++) m.tic(Re + 0.4 + i * 0.2, 0.1, 3000 + i * 150);        // se descama
m.nota(Re + 1.4, 69, 0.05, 0.6); m.nota(Re + 2.2, 57, 0.04, 0.8, 0.6);             // ✓ / nada visible
for (let i = 0; i < 8; i++) m.tic(Ge + 0.2 + i * 0.15, 0.07, 1800);                // la tira del genoma se arma
m.golpe(Ge + 1.6, 0.4, 60); m.nota(Ge + 1.7, 45, 0.06, 1.2);                       // falta el gen
m.sube(Ge + 3.4, 2.0, 60, 52, 0.04);                                               // se lleva tu grasa
for (let i = 0; i < 10; i++) m.burbuja(Ch + 0.3 + i * 0.35, 0.1, 380 + (i % 4) * 70); // champú
m.whoosh(Ch + 1.0, 0.8, 0.15);
m.whoosh(C + 0.6, 0.8, 0.15); m.nota(C + 1.6, 64, 0.06, 1.2); m.nota(C + 1.6, 69, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
