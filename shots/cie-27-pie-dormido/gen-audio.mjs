// gen-audio.mjs — cama grave + efectos del Shot Científico #27 (pie dormido). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pie Dormido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 127);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
// gancho: ronquidito (zzz) que se tacha y chispas revueltas
for (let i = 0; i < 3; i++) m.nota(K.Gancho + 0.1 + i * 0.3, [64, 62, 60][i], 0.04, 0.4);
m.whoosh(K.Gancho + 1.0, 0.4, 0.16);
for (let i = 0; i < 10; i++) m.tic(K.Gancho + 2.6 + i * 0.13 + (i % 3) * 0.04, 0.12, 2200 + (i * 370) % 1800);
// posición: el peso baja y aprieta
m.whoosh(K.Posicion + 0.3, 0.6, 0.14); m.golpe(K.Posicion + 0.9, 0.3, 70);
m.sube(K.Posicion + 1.6, 0.8, 52, 47, 0.05);
m.whoosh(K.Posicion + 2.4, 0.5, 0.12); m.golpe(K.Posicion + 3.2, 0.22, 60);
// señal: mensajes que salen del pie y se atoran
for (let i = 0; i < 9; i++) m.nota(K.Senal + 0.6 + i * 0.4, 72 + (i % 3) * 2, 0.035, 0.3);
m.golpe(K.Senal + 0.5, 0.2, 75);
m.zumbido(K.Senal + 2.4, 3, 0.04, 98);
// entumido: pie gris y pesado
m.sube(K.Entumido + 0.2, 0.9, 57, 50, 0.05); m.golpe(K.Entumido + 1.6, 0.35, 60);
// hormigueo: descruza la pierna, señales revueltas
m.whoosh(K.Hormigueo + 0.3, 1.0, 0.16);
for (let i = 0; i < 18; i++) m.tic(K.Hormigueo + 1.6 + i * 0.2 + (i % 4) * 0.05, 0.1, 1800 + (i * 530) % 2400);
m.whoosh(K.Hormigueo + 2.3, 0.5, 0.1);
// agujitas que pican… y ¡puf!
for (let i = 0; i < 14; i++) m.tic(K.Agujas + 0.4 + i * 0.1, 0.13, 3200);
m.whoosh(K.Agujas + 2.6, 0.5, 0.2); m.burbuja(K.Agujas + 2.65, 0.15, 400);
m.zumbido(K.Agujas + 3.4, 2.0, 0.04, 140);
// parestesia
m.golpe(K.Nombre + 0.6, 0.35, 80); m.nota(K.Nombre + 0.7, 76, 0.06, 0.8);
// pregunta
m.sube(K.Pregunta + 0.05, 1.1, 52, 64, 0.05);
// normal: reloj y el pie vuelve a su color
for (let i = 0; i < 12; i++) m.tic(K.Normal + 0.6 + i * 0.3, 0.1, 1500);
m.sube(K.Normal + 1.2, 2.5, 57, 64, 0.04);
// médico
m.golpe(K.Medico + 0.15, 0.3, 80); m.nota(K.Medico + 0.6, 69, 0.05, 0.4); m.nota(K.Medico + 1.7, 67, 0.05, 0.4);
m.nota(K.Medico + 2.9, 72, 0.06, 0.6); m.nota(K.Medico + 3.0, 76, 0.05, 0.6);
// codo: golpe contra la mesa y rayito a los dedos
m.golpe(K.Codo + 0.9, 0.5, 90); m.metal(K.Codo + 0.92, 0.12, 600);
m.zumbido(K.Codo + 0.95, 1.2, 0.07, 330); m.nota(K.Codo + 1.9, 84, 0.05, 0.5); m.nota(K.Codo + 2.0, 81, 0.05, 0.5);
m.whoosh(K.Codo + 3.9, 0.5, 0.12); m.zumbido(K.Codo + 5.0, 0.6, 0.05, 330);
// codo 2: toque eléctrico, tachón y «es el nervio»
m.zumbido(K.Codo2 + 0.6, 1.2, 0.07, 330); m.nota(K.Codo2 + 1.6, 84, 0.05, 0.4);
m.golpe(K.Codo2 + 2.2, 0.2, 90); m.whoosh(K.Codo2 + 3.0, 0.35, 0.16); m.nota(K.Codo2 + 3.5, 76, 0.06, 0.7);
// cierre: el pie se mueve
for (let i = 0; i < 7; i++) m.tic(K.Cierre + 0.2 + i * 0.45, 0.12, 900);
m.nota(K.Cierre + 1.0, 72, 0.05, 0.6);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
