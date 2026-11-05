// gen-audio.mjs — cama + efectos del Shot Fungi Mati #103 (Cepa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Cama de "taller": grave y continua, con un bajo pulsado suave que cambia de acorde cada frase (no se repite más de 4 compases)
// y se abre a mayor cuando las dos hifas se fusionan (dicarión). Un efecto por cada cosa que pasa en pantalla.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cepa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = crearMezcla(path.isAbsolute(HTML) ? HTML : path.join(HERE, HTML), { seed: 103 });
const K = m.K;
const G = K.Gancho, Co = K.Corte, A = K.Agar, H = K.Hifas, Pa = K.Pasar, P = K.Pregunta, E = K.Esporas, M = K.Monocarion, D = K.Dicarion,
  Es = K.Estudio, Gu = K.Guardar, R = K.Robert, C = K.Cierre, Ou = K.Outro;

// --- cama: progresión con función (la menor → fa → do → sol), voces cercanas; se abre a mayor en la fusión ---
const ACORDES = [[45, 52, 57, 60], [41, 48, 53, 57], [48, 52, 55, 60], [43, 50, 55, 59]];       // Am · F · C · G
const MAYOR = [[48, 52, 55, 60], [43, 50, 55, 59], [45, 52, 57, 60], [41, 48, 53, 57]];         // C · G · Am · F
const BPM = 100, comp = 4 * 60 / BPM;                                                          // un acorde por compás (2.4 s)
const fin = Ou + 3.5;
for (let t = 0, i = 0; t < fin; t += comp, i++) {
  const ac = (t >= D + 0.9 ? MAYOR : ACORDES)[i % 4];
  m.pad(t, Math.min(fin, t + comp + 0.15), 0.045, ac.slice(0, 3), t >= D + 0.9 ? 700 : 560);
  // bajo pulsado (pluck) en 1 y 3; variación cada 4 compases: en el 4.º compás de cada frase, una nota de paso
  m.pluck(t, ac[0] - 12, 0.06, 0.9);
  m.pluck(t + comp / 2, (i % 4 === 3) ? ac[0] - 10 : ac[0] - 12, 0.045, 0.7);
  if (i % 8 === 7) m.pluck(t + comp * 0.75, ac[1] - 12, 0.035, 0.4);
}

// --- efectos atados a la pantalla ---
m.whoosh(G + 0.05, 0.5, 0.08); m.golpe(G + 0.6, 0.35, 70); m.pop(G + 1.9, 0.2);                // seta gira · tache de la semilla · pedacito
m.ruido(Co + 0.2, 0.9, 0.08, 300, 1400);                                                         // se abre la seta (tela)
for (let i = 0; i < 7; i++) m.tic(Co + 1.6 + i * 0.06, 0.08, 2000 + i * 120);                    // polvo y microbios
m.metal(Co + 2.2, 0.12, 1400);                                                                   // pinzas
m.ruido(A + 0.1, 3.6, 0.025, 200, 600);                                                          // zumbido del flujo laminar
m.whoosh(A + 0.3, 0.8, 0.07);                                                                    // flama
m.tic(A + 1.0, 0.18, 1600); m.tic(A + 2.6, 0.18, 1400); m.pop(A + 2.4, 0.18);                    // tapa, cubito cae, tapa
for (let i = 0; i < 6; i++) m.campana(H + 0.2 + i * 0.68, m.ESC[4 + i], 0.035, 1.2);             // cada día que pasa
m.ruido(H + 0.4, 3.8, 0.03, 2000, 5000);                                                         // micelio que avanza (granulado)
m.golpe(Pa + 0.4, 0.35, 60); m.whoosh(Pa + 0.9, 0.6, 0.08); m.golpe(Pa + 1.6, 0.25, 90);        // tache, a la basura
m.metal(Pa + 1.6, 0.1, 1800); m.pop(Pa + 3.3, 0.18);                                             // bisturí corta · cae a la caja nueva
m.campana(Pa + 3.5, 76, 0.05, 1.4);                                                              // «un clon»
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                                              // re-gancho
m.tic(E + 0.3, 0.15, 1200); m.whoosh(E + 1.2, 0.7, 0.07);                                        // tazón se levanta
for (let i = 0; i < 14; i++) m.tic(E + 1.9 + i * 0.03, 0.04, 3200 + i * 50);                     // polvillo de esporas
m.campana(E + 2.4, 79, 0.04, 1.2);
for (let i = 0; i < 6; i++) m.pluck(M + 0.6 + i * 0.45, m.ESC[2 + (i % 3)] + 12, 0.04, 0.4);     // núcleos azules / dorados
m.ruido(D + 0.3, 0.7, 0.05, 400, 2400); m.campana(D + 0.95, 72, 0.07, 2.0); m.campana(D + 1.0, 76, 0.05, 2.0); // fusión
for (let i = 0; i < 4; i++) m.tic(D + 1.4 + i * 0.6, 0.12, 1700);                                // cada fíbula
m.campana(D + 3.6, 79, 0.05, 1.6);                                                               // da setas
m.golpe(Es + 0.1, 0.3, 80); m.pop(Es + 2.0, 0.2);                                                // tarjeta · punto en Oaxaca
m.pop(Es + 2.4, 0.15); m.pop(Es + 2.7, 0.15);                                                    // dos cepas
for (let i = 0; i < 56; i++) m.nota(Es + 3.2 + i * 0.03, m.MAY[3 + (i % 9)] + 12, 0.025, 0.25); // 56 híbridas, una nota cada una
m.tic(Gu + 0.4, 0.15, 1300);                                                                     // etiqueta
m.golpe(Gu + 1.2, 0.2, 110); m.pop(Gu + 1.9, 0.15); m.metal(Gu + 2.6, 0.08, 2400);               // refri · tubo · vial
m.tic(R + 0.6, 0.14, 1100); m.pop(R + 1.2, 0.15);                                                // tapa del tupper
m.whoosh(C + 0.4, 0.6, 0.06); m.tic(C + 0.6, 0.15, 1500);                                        // etiqueta colgante
m.campana(Ou + 0.3, 60, 0.06, 3.0); m.campana(Ou + 0.3, 64, 0.05, 3.0); m.campana(Ou + 0.3, 67, 0.04, 3.0);
m.guardar(path.isAbsolute(OUT) ? OUT : path.join(HERE, OUT));
