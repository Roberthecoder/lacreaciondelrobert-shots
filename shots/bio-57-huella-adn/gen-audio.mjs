// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #57 (la huella de ADN). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huella base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 57);
const K = m.K;
const G = K.Gancho, Cl = K.Clave, Pl = K.Placa, Ba = K.Bandas, Mi = K.Minisatelite, Re = K.Repeticiones, Pa = K.Patron, Pr = K.Pregunta,
  In = K.Inmigracion, Io = K.Inocente, Pi = K.Pitchfork, St = K.STR, Ge = K.Gemelos, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                           // cama grave continua
for (let i = 0; i < 10; i++) m.tic(G + i * 0.1, 0.06, 2200 + i * 80);              // el 99.6 % que cuenta
m.whoosh(G + 1.1, 1.8, 0.06);                                                      // la lupa pasa
for (let i = 0; i < 3; i++) m.nota(G + 3.0 + i * 0.22, 81, 0.06, 0.18);            // bip de alarma sobre "tú"
for (let i = 0; i < 4; i++) m.nota(Cl + 1.0 + i * 0.25, 76 + i * 2, 0.05, 0.4);    // los 4 cuadritos distintos
m.whoosh(Pl + 0.3, 1.2, 0.08);                                                     // la película baja
for (let i = 0; i < 4; i++) m.gota(Pl + 0.4 + i * 0.35, 0.12, 900);                 // gotas del revelador
m.zumbido(Pl + 1.4, 3.2, 0.03, 120);                                               // la caja de luz se enciende
for (let i = 0; i < 10; i++) m.tic(Pl + 2.0 + i * 0.22, 0.05, 1600);              // bandas que aparecen
for (let i = 0; i < 10; i++) m.nota(Ba + 1.2 + i * 0.18, m.ESC[3 + (i % 5)], 0.04, 0.3); // bandas heredadas
m.whoosh(Mi + 0.4, 0.6, 0.12);                                                     // la lupa se abre
for (let i = 0; i < 4; i++) m.tic(Mi + 2.4 + i * 0.25, 0.1, 1300);                 // un clic por bloque repetido
for (let i = 0; i < 4; i++) m.tic(Re + 0.3 + i * 0.32, 0.08, 1500);                // tú: 4 bloques
for (let i = 0; i < 7; i++) m.tic(Re + 0.6 + i * 0.26, 0.08, 1100);                // el de al lado: 7
m.metal(Pa + 0.4, 0.12, 1400); m.metal(Pa + 0.6, 0.12, 1500);                       // tijeras
m.sube(Pa + 1.4, 2.2, 64, 52, 0.04);                                               // los pedazos corren por el gel
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                               // re-gancho
m.golpe(In + 0.4, 0.35, 80);                                                       // sello de deportación
for (let i = 0; i < 6; i++) m.tic(In + 1.6 + i * 0.18, 0.05, 1700);
m.cruje(In + 3.0, 0.5);                                                            // se tacha
m.golpe(Io + 0.1, 0.3, 85);                                                        // tarjeta del estudio
m.nota(Io + 2.8, 50, 0.07, 0.8);                                                   // ≠
m.golpe(Io + 3.4, 0.4, 75);                                                        // sello INOCENTE
for (let i = 0; i < 10; i++) m.tic(Pi + 0.2 + i * 0.12, 0.06, 1900);               // un tic por cada tubo de sangre
m.nota(Pi + 1.7, 69, 0.05, 0.5); m.metal(Pi + 2.5, 0.1, 700);                      // el tubo raro · se tacha el nombre
m.nota(Pi + 4.9, 69, 0.06, 0.6); m.nota(Pi + 4.9, 76, 0.05, 0.6);                  // = coincide
for (let c = 0; c < 4; c++) for (let i = 0; i < Math.pow(2, c); i++) m.tic(St + 0.8 + c * 0.45 + i * 0.03, 0.04, 1800 + c * 200); // copias de la PCR
for (let i = 0; i < 16; i++) m.nota(St + 2.6 + i * 0.1, m.ESC[i % 8 + 2], 0.03, 0.25); // picos del perfil
m.nota(Ge + 1.8, 72, 0.06, 0.6); m.nota(Ge + 2.1, 72, 0.06, 0.6);                  // = dos notas iguales
for (let i = 0; i < 4; i++) m.whoosh(Ci + 1.8 + i * 0.12, 0.3, 0.04);              // los 4 cuadritos vuelan
m.nota(Ci + 2.7, 76, 0.06, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
