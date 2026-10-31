// gen-audio.mjs — cama grave + efectos del Shot Ambiental #24 (chicle). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chicle base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 24);
const K = m.K;
const G = K.Gancho, Ma = K.Mascar, Re = K.Receta, Pe = K.Petroleo, P = K.Pregunta, Cz = K.Chicozapote, Si = K.Sinteticos,
  Es = K.Estudio, B = K.Banqueta, Ch = K.Chicleros, C = K.Cierre, Ou = K.Outro;

// cama grave: "pegajosa" (ahogada) mientras se habla de la goma sintética; abierta en la selva y con los chicleros
m.pad(0, Cz, 0.05, [45, 52, 57], 0.5);
m.pad(Cz, Si + 3, 0.05, [45, 52, 59], 0);
m.pad(Si + 3, Ch, 0.05, [45, 52, 57], 0.45);
m.pad(Ch, Ou + 3.5, 0.05, [45, 52, 59], 0);
m.sube(G + 0.05, 1.1, 50, 62, 0.07); m.golpe(G + 1.2, 0.25, 110);                     // el tenis despega el chicle (hilos)
for (let i = 0; i < 6; i++) m.golpe(Ma + 0.3 + i * 1.2, 0.18, 140);                      // mordidas
for (let i = 0; i < 10; i++) m.burbuja(Ma + 0.4 + i * 0.25, 0.06, 420 + i * 30);        // azúcar y sabor que se van
m.whoosh(Re - 0.1, 0.7, 0.12); for (let i = 0; i < 6; i++) m.tic(Re + 0.2 + i * 0.25, 0.08, 1300 + i * 120);  // lupa y cadenas
m.nota(Re + 1.4, 62, 0.05, 0.8, 0.3); m.nota(Re + 2.6, 65, 0.05, 0.8, 0.3);
m.gota(Pe + 0.2, 0.18, 300); m.gota(Pe + 0.9, 0.14, 320); m.whoosh(Pe + 1.2, 0.5, 0.12);   // gota de petróleo y la patente
m.sube(Pe + 2.2, 1.2, 60, 67, 0.04);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 9; i++) m.tic(Cz + 1.6 + i * 0.22, 0.12, 900 + (i % 2) * 400);      // machetazos en zigzag
for (let i = 0; i < 6; i++) m.gota(Cz + 3.7 + i * 0.45, 0.1, 800);                       // látex que escurre
for (let i = 0; i < 8; i++) m.burbuja(Cz + 5.1 + i * 0.25, 0.06, 300);                   // la paila hierve
m.motor(Si + 0.3, 2.8, 0.05); m.nota(Si + 0.5, 64, 0.05, 1.2); m.nota(Si + 2.2, 67, 0.05, 1.2);   // barco 1880s → 1950s
m.golpe(Si + 2.9, 0.3, 70); m.zumbido(Si + 3.0, 2.4, 0.03, 120);                          // la fábrica de sintéticos
m.whoosh(Es + 0.05, 0.5, 0.1); m.golpe(Es + 0.2, 0.2, 120);                              // tarjeta del estudio
for (let i = 0; i < 9; i++) m.tic(Es + 2.2 + i * 0.5, 0.06, 2000);                       // contador de semanas
for (let i = 0; i < 14; i++) m.burbuja(Es + 2.5 + i * 0.26, 0.04, 700);   // llegan bacterias
m.nota(B + 1.6, 57, 0.06, 1.0); m.golpe(B + 1.7, 0.3, 60);                               // ≈ £7 millones
m.motor(B + 2.3, 3.2, 0.06); for (let i = 0; i < 10; i++) m.gota(B + 2.4 + i * 0.3, 0.06, 1200);   // hidrolavadora
for (let i = 0; i < 6; i++) m.nota(Ch + 0.5 + i * 0.3, [57, 60, 64, 67, 64, 69][i], 0.04, 0.6);     // arbolitos en el mapa
m.sube(C + 0.05, 1.1, 50, 62, 0.07); m.golpe(C + 1.5, 0.2, 100);                         // el tenis otra vez y la marqueta
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
