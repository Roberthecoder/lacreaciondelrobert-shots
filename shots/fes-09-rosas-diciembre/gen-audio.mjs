// gen-audio.mjs — cama grave + efectos del Shot Festivo #09 · Virgen de Guadalupe · Científico (rosas en diciembre). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Rosas Diciembre base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 12);
const K = m.K, E = m.ESC;
const G = K.Gancho, Te = K.Tepeyac, Si = K.Silvestre, Fr = K.Freno, Ho = K.Hojas, Pr = K.Primavera, P = K.Pregunta, Sa = K.Saltarin,
  Ap = K.Apagado, Es = K.Estudio, Ch = K.China, In = K.Invernadero, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
// gancho: la rosa se abre de golpe y llega la hoja de diciembre
m.whoosh(G + 0.05, 0.6, 0.14); m.sube(G + 0.05, 0.7, 57, 69, 0.05);
for (let i = 0; i < 5; i++) m.nota(G + 0.8 + i * 0.08, E[7 + i], 0.03, 0.5);    // destellos
m.whoosh(G + 0.25, 0.5, 0.12); m.golpe(G + 0.9, 0.22, 110);                     // la hoja del calendario cae y aterriza
// Tepeyac: viento frío, escarcha y las rosas que aparecen en la cumbre
m.whoosh(Te + 0.1, 2.4, 0.06); m.whoosh(Te + 2.8, 2.4, 0.05);
for (let i = 0; i < 8; i++) m.tic(Te + 0.4 + i * 0.35, 0.03, 4200);              // escarcha
for (let i = 0; i < 5; i++) m.nota(Te + 1.4 + i * 0.44, E[4 + i], 0.05, 0.9);    // una nota por rosa
// la silvestre: los meses de primavera se encienden, flores
for (let i = 0; i < 3; i++) m.nota(Si + 0.8 + i * 0.25, E[5 + i], 0.05, 0.6);
for (let i = 0; i < 7; i++) m.tic(Si + 0.8 + i * 0.17, 0.06, 1800);            // cada flor que se abre
// el freno: el gen se ilumina y cae la señal de ALTO
m.zumbido(Fr + 0.4, 0.8, 0.03, 220);
m.golpe(Fr + 1.35, 0.3, 90); m.metal(Fr + 1.4, 0.08, 900);
// hojas: el brote crece, una nota que sube por hoja; "¿flor?" se tacha
for (let i = 0; i < 4; i++) m.nota(Ho + 0.6 + i * 0.7, E[2 + i], 0.04, 0.5);
m.tic(Ho + 2.0, 0.2, 900);
// primavera: el cursor recorre los meses, el freno se va, florece y caen los pétalos
for (let i = 0; i < 5; i++) m.tic(Pr + 0.1 + i * 0.22, 0.06, 2600);
m.whoosh(Pr + 1.2, 0.7, 0.12);
for (let i = 0; i < 7; i++) m.nota(Pr + 1.4 + i * 0.2, E[5 + (i % 5)], 0.04, 0.6);
for (let i = 0; i < 6; i++) m.whoosh(Pr + 3.6 + i * 0.18, 0.3, 0.03);
// pregunta: la señal se agrieta
m.sube(P + 0.1, 1.4, 52, 64, 0.05); m.cruje(P + 0.5, 0.4);
// ADN saltarín: brinca (sube y baja) y se mete en el gen
m.sube(Sa + 0.3, 0.85, 60, 76, 0.06); m.sube(Sa + 1.15, 0.85, 76, 60, 0.06);
m.whoosh(Sa + 1.5, 0.6, 0.1); m.golpe(Sa + 2.0, 0.3, 120); m.metal(Sa + 2.05, 0.06, 1300);
// el gen ya no se lee: zumbido de lectura que se atora; luego flores en cadena
m.zumbido(Ap + 0.2, 1.1, 0.04, 260); m.cruje(Ap + 1.3, 0.3); m.golpe(Ap + 1.35, 0.25, 70);
m.whoosh(Ap + 1.6, 0.5, 0.08);
m.sube(Ap + 2.6, 0.8, 57, 69, 0.05); for (let i = 0; i < 4; i++) m.nota(Ap + 2.7 + i * 0.18, E[6 + i], 0.04, 0.6);
for (let i = 0; i < 4; i++) m.nota(Ap + 4.0 + i * 0.18, E[7 + i], 0.04, 0.6);
// estudio: tarjeta 2012 y seis pares que aparecen uno por uno; el pedazo se señala
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);
for (let i = 0; i < 6; i++) { m.tic(Es + 0.7 + i * 0.32, 0.08, 1600); m.tic(Es + 0.75 + i * 0.32, 0.06, 2400); }
for (let i = 0; i < 6; i++) m.nota(Es + 3.4 + i * 0.06, 76, 0.03, 0.4);
// China → Europa: olas y el barco; el cruce; las rosas modernas se abren
for (let i = 0; i < 6; i++) m.whoosh(Ch + 0.3 + i * 0.35, 0.5, 0.05);
m.golpe(Ch + 2.5, 0.25, 100); m.nota(Ch + 2.6, 64, 0.06, 0.9); m.nota(Ch + 2.6, 69, 0.05, 0.9);
for (let i = 0; i < 3; i++) m.nota(Ch + 4.2 + i * 0.3, E[6 + i * 2], 0.05, 0.8);
// invernadero: se tacha "horas de luz", tijeretazo, el tallo cae, el nuevo brota, las semanas avanzan
m.tic(In + 1.2, 0.2, 900);
m.metal(In + 2.0, 0.12, 2600); m.tic(In + 2.25, 0.4, 3600);
m.whoosh(In + 2.3, 0.6, 0.1); m.golpe(In + 3.1, 0.15, 90);
for (let i = 0; i < 10; i++) m.tic(In + 2.8 + i * 0.24, 0.07, 1400 + i * 60);    // una semana por cuadro
m.sube(In + 2.8, 2.4, 57, 69, 0.04); m.nota(In + 4.8, 69, 0.06, 1.0); m.nota(In + 4.8, 76, 0.04, 1.0);
// dato: el punto en el Estado de México y 8 de 10 rosas que se encienden
m.golpe(Da + 0.6, 0.25, 100);
for (let i = 0; i < 8; i++) m.nota(Da + 1.6 + i * 0.2, E[3 + i], 0.045, 0.5);
// cierre: el ramo se abre; la lupa muestra el gen
m.whoosh(Ci + 0.2, 0.6, 0.12); for (let i = 0; i < 4; i++) m.nota(Ci + 0.3 + i * 0.2, E[5 + i], 0.04, 0.6);
m.sube(Ci + 1.0, 0.8, 57, 69, 0.05); m.zumbido(Ci + 1.2, 1.4, 0.02, 300);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
