// gen-audio.mjs — cama grave + efectos del Shot Científico #01 · Especial Día de Muertos (esqueleto). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esqueleto base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K, E = m.ESC;
const G = K.Gancho, V = K.Vivo, Cl = K.Clastos, Bl = K.Blastos, O = K.Obra, P = K.Pregunta, Es = K.Estudio, D = K.Diez, Ca = K.Calcio, Ej = K.Ejercicio, Da = K.Dato, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.4, 0.05, [45, 52, 57]);
m.whoosh(G, 0.7, 0.2); m.golpe(G + 0.55, 0.3, 110);                           // la calavera llega girando
m.zumbido(G + 2.0, 1.6, 0.04, 150); m.sube(G + 2.0, 0.6, 57, 69, 0.05);         // rayos X: hueso vivo
m.whoosh(V - 0.2, 1.4, 0.16); m.sube(V - 0.2, 1.5, 52, 76, 0.04);              // zoom al microscopio
for (let i = 0; i < 8; i++) m.latido(V + 1.4 + i * 0.6, 0.12);                  // pulso en los vasos
for (let i = 0; i < 18; i++) m.burbuja(Cl + 0.5 + i * 0.17, 0.08, 400 + (i % 5) * 90); // el osteoclasto disuelve (ácido)
m.cruje(Cl + 1.0, 0.25);
for (let i = 0; i < 9; i++) m.tic(Bl + 0.5 + i * 0.08, 0.12, 1600 + i * 80);  // llegan los osteoblastos
for (let i = 0; i < 5; i++) m.nota(Bl + 0.9 + i * 0.55, E[3 + i], 0.06, 0.5);  // capa por capa
for (let i = 0; i < 3; i++) m.golpe(O + 0.3 + i * 0.25, 0.2, 140);             // conos de obra
m.metal(O + 0.9, 0.1, 700);                                                    // cinta de obra
for (let i = 0; i < 10; i++) m.tic(O + 1.5 + i * 0.15, 0.1, 2400);             // 10 % que se ilumina
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 10; i++) m.nota(D + 0.4 + i * 0.28, E[i % 8], 0.05, 0.35); // los 10 años se tachan
m.nota(D + 3.2, 76, 0.07, 1.0);
for (let i = 0; i < 26; i++) m.gota(Ca + 1.0 + i * 0.12, 0.08, 800 + (i % 6) * 120); // calcio que entra al hueso
m.nota(Ca + 0.3 + cruce(0.99) * 1.4, 69, 0.07, 1.0);
for (let i = 0; i < 6; i++) m.golpe(Ej + 0.6 + i * 1.2, 0.25, 70);               // la pesa sube y baja
m.sube(Ej + 1.2, 2.8, 50, 62, 0.03);                                           // el hueso se refuerza
for (let i = 0; i < 16; i++) m.tic(Da + 1.6 + i * 0.1, 0.08, 2000 - i * 40);    // los huesos se sueldan (300 → 206)
m.nota(Da + 3.2, 64, 0.07, 0.9);
m.whoosh(C + 0.2, 0.6, 0.12); m.sube(C + 1.0, 1.0, 57, 69, 0.05); m.zumbido(C + 2.2, 2.5, 0.03, 150);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
