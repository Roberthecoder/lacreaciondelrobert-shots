// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #113 (parasol de esporas verdes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua debajo de la voz, con armonía que avanza por escena (re menor; nunca el mismo acorde más de una escena),
// un motivo de 4 notas que pregunta (gancho), responde (esporas) y regresa transformado en mayor al cierre (picardía en Re mayor).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esporada Verde base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 113);
const K = m.K;
const G = K.Gancho, Ja = K.Jardin, Co = K.Confusion, Re = K.Registro, Si = K.Sintomas, P = K.Pregunta, Es = K.Esporas, Et = K.Esteril,
  Jo = K.Joven, Ra = K.Rasgos, Cn = K.Consejo, Ci = K.Cierre, Ou = K.Outro;

// armonía (cama): i – VI – III – v – V7sus (tensión de síntomas) – subida – VI add9 (esporas, se abre) – iv – bVII – VI – III – i → I
const CAMA = [
  [G, Ja, [38, 45, 50, 53], 0.15], [Ja, Co, [34, 46, 50, 53], 0.1], [Co, Re, [41, 48, 53, 57], 0.1], [Re, Si, [45, 52, 55, 60], 0.2],
  [Si, P, [45, 52, 55, 62], 0.3], [P, Es, [43, 50, 55, 58], 0.2], [Es, Et, [34, 46, 53, 60], 0], [Et, Jo, [43, 50, 55, 58], 0.15],
  [Jo, Ra, [36, 48, 55, 60], 0.1], [Ra, Cn, [34, 46, 53, 58], 0.1], [Cn, Ci, [41, 48, 53, 57], 0.05], [Ci, Ou, [38, 45, 50, 53], 0], [Ou, Ou + 3.5, [38, 45, 50, 54], 0],
];
CAMA.forEach(([a, b, notas, tapa]) => m.pad(a, b + 0.25, 0.05, notas, tapa));

// motivo (pregunta): la–do–re–mi, y respuestas variadas; siempre suave, debajo de la voz
const motivo = (t, base, g = 0.035, paso = 0.32, notas = [0, 3, 5, 7]) => notas.forEach((n, i) => m.nota(t + i * paso, base + n, g, 1.1));
motivo(G + 0.9, 69);                                   // gancho: pregunta
motivo(Co + 0.5, 65, 0.03, 0.36, [0, 2, 3, 0]);        // confusión: se enreda
motivo(P + 0.2, 69, 0.04, 0.22, [0, 3, 5, 10]);        // re-gancho: sube
motivo(Es + 2.5, 72, 0.035, 0.3, [0, 4, 7, 11]);       // esporas: se abre (mayor)
motivo(Et + 2.6, 67, 0.03, 0.34, [7, 5, 3, 2]);        // estériles: baja
motivo(Ci + 0.4, 69, 0.035, 0.34, [0, 4, 5, 7]);       // cierre: regresa en mayor

// efectos en el mismo cuadro
m.cruje(G + 0.05, 0.35); m.whoosh(G + 0.1, 0.8, 0.12);                          // el hongo rompe la tierra y sale
m.tic(G + 1.2, 0.25, 1200); m.cruje(G + 2.0, 0.25);                             // «¿champiñón?» y tachón
m.golpe(G + 4.3, 0.5, 60);                                                       // sello TÓXICO
for (let i = 0; i < 26; i++) m.gota(Ja + 0.1 + i * 0.16, 0.06, 1200 + (i % 5) * 140); // lluvia
for (let i = 0; i < 13; i++) m.tic(Ja + 0.4 + i * 0.12, 0.12, 900 + i * 40);    // salen los hongos del círculo
m.golpe(Ja + 2.6, 0.25, 110);                                                    // mapa de México
m.tic(Co + 0.2, 0.2, 1500); m.whoosh(Co + 2.6, 0.6, 0.08); m.tic(Co + 3.6, 0.15, 1300); m.tic(Co + 3.8, 0.15, 1300); // champiñón y parasol
for (let i = 0; i < 9; i++) m.whoosh(Re + 0.3 + i * 0.12, 0.25, 0.05);          // reportes que se apilan
m.golpe(Re + 3.0, 0.3, 80); m.tic(Re + 2.2, 0.2, 1600);                          // tarjeta NAMA
for (let i = 0; i < 14; i++) m.tic(Si + 0.3 + i * 0.12, 0.1, 2600);              // reloj que avanza
m.latido(Si + 2.0, 0.18); m.latido(Si + 2.5, 0.18); m.latido(Si + 3.0, 0.16);    // cólicos
m.sube(P + 0.1, 1.6, 50, 62, 0.04);                                              // re-gancho
m.whoosh(Es + 2.4, 1.0, 0.1);                                                    // entramos al microscopio
for (let i = 0; i < 11; i++) m.burbuja(Es + 2.6 + i * 0.06, 0.07, 500 + i * 30); // esporas
m.golpe(Et + 0.2, 0.3, 80);                                                      // tarjeta 1992
m.whoosh(Et + 2.6, 0.7, 0.06); m.cruje(Et + 3.4, 0.25);                          // se pone gris; tachón a la espora
m.sube(Jo, 0.6, 55, 60, 0.03);                                                   // botón joven
[0.2, 0.5, 0.8, 1.1].forEach((d, i) => m.nota(Ra + d, 74 + i * 2, 0.04, 0.4));   // ✓ de cada rasgo
m.golpe(Ra + 1.5, 0.3, 70);                                                      // «no basta»
m.burbuja(Ra + 3.0, 0.08, 300); m.burbuja(Ra + 3.2, 0.08, 340); m.burbuja(Ra + 3.4, 0.08, 280); m.cruje(Ra + 3.6, 0.3); // olla y tachón
m.cruje(Cn + 0.6, 0.3); m.golpe(Cn + 3.0, 0.35, 90); m.metal(Cn + 3.1, 0.1, 900); // plato tachado, urgencias
m.golpe(Ci + 0.8, 0.3, 75); m.tic(Ci + 1.2, 0.15, 1400);                         // letrero clavado
m.nota(Ou + 0.3, 62, 0.07, 2.8); m.nota(Ou + 0.3, 66, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
