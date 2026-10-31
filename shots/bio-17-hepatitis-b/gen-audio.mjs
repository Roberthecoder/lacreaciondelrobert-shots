// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #17 (vacuna de hepatitis B hecha en levadura). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot HepatitisB base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K;
const G = K.Gancho, Be = K.Bebe, Vi = K.Virus, Pl = K.Plasma, Mi = K.Miedo, Pr = K.Pregunta, Ge = K.Gen, Pa = K.Particulas, Va = K.Vacias, Es = K.Estudio, Re = K.Recombivax, Pn = K.Pan, Ci = K.Cierre, Ou = K.Outro;

// cama grave continua; se ahoga mientras dura el problema (plasma y miedo) y se abre cuando entra la levadura
m.pad(0, Pl, 0.05, [45, 52, 57]);
m.pad(Pl, Ge, 0.05, [45, 52, 56], 0.7);
m.pad(Ge, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.1, 3.4, 0.05);                                                         // el émbolo baja
m.nota(G + 2.3, 69, 0.07, 0.6);                                                       // aparece la levadura
for (let i = 0; i < 24; i++) m.tic(Be + 0.2 + i * (2.2 / 24), 0.05, 2000);            // 24 tics = 24 horas del reloj
m.gota(Be + 1.6, 0.12, 700);                                                          // la curita
m.latido(Vi + 0.6, 0.18); m.latido(Vi + 1.2, 0.14);                                   // el hígado se enciende
m.whoosh(Vi + 0.9, 0.6, 0.12);                                                        // la Lupa se abre
m.zumbido(Pl + 0.9, 1.5, 0.06, 160); m.sube(Pl + 0.9, 1.5, 40, 55, 0.04);             // la centrífuga
for (let i = 0; i < 5; i++) m.nota(Mi + 0.6 + i * 0.25, 60 - i, 0.04, 0.5, 0.6);      // los "?" en el tubo
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05); m.golpe(Pr + 1.0, 0.2, 90);                       // pregunta y tachón
m.metal(Ge + 1.4, 0.12, 900); m.metal(Ge + 1.55, 0.1, 1100);                           // se corta el gen
m.tic(Ge + 3.2, 0.2, 2600);                                                            // el plásmido se cierra
m.whoosh(Ge + 3.5, 1.0, 0.1); m.burbuja(Ge + 4.5, 0.12, 500);                          // entra a la levadura
m.whoosh(Pa + 0.3, 0.6, 0.12);                                                        // la Lupa se abre
for (let k = 0; k < 3; k++) {                                                          // cada partícula que se arma: una nota
  m.nota(Pa + 0.3 + 0.4 + k * 0.7 + 1.5, [69, 72, 76][k], 0.08, 0.9);
  for (let j = 0; j < 4; j++) m.tic(Pa + 0.3 + 0.4 + k * 0.7 + 0.6 + j * 0.2, 0.04, 1800);
}
m.whoosh(Va + 1.6, 0.6, 0.08); m.tic(Va + 2.7, 0.25, 2200);                            // se abre el virus · candado
m.golpe(Es + 0.2, 0.3, 80);
for (let i = 0; i < 26; i++) m.tic(Es + 1.2 + i * (2 / 26), 0.035, 3000);             // aparecen las partículas al microscopio
m.golpe(Re + 0.6, 0.45, 70);                                                          // el sello de 1986
m.nota(Re + 1.2, 64, 0.06, 1.2); m.nota(Re + 1.2, 69, 0.05, 1.2);
m.burbuja(Pn + 0.6, 0.1, 420); m.burbuja(Pn + 0.9, 0.1, 480);
m.golpe(Pn + 3.4, 0.25, 110);                                                          // advertencia de alergia grave
m.nota(Ci + 1.0, 69, 0.06, 0.8); m.nota(Ci + 1.3, 72, 0.06, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
