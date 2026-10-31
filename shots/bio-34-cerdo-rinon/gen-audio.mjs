// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #34 (riñón de cerdo editado). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: una nota por cada una de las 69 ediciones (3 graves = genes borrados, 7 medias = genes humanos, 59 clics = virus apagados).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Xeno base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 34);
const K = m.K;
const G = K.Gancho, E = K.Espera, R = K.Rechazo, Az = K.Azucares, B = K.Borrar, P = K.Pregunta, H = K.Humanos, V = K.Virus,
  S = K.Slayman, A = K.Andrews, D = K.Dias, Pu = K.Puente, C = K.Cierre, O = K.Outro;

// cama grave continua, sin golpe; más apagada mientras dura el problema (rechazo → virus) y libre con el puente
m.pad(0, R, 0.05, [45, 52, 57]);
m.pad(R, S, 0.05, [45, 52, 57], 0.6);
m.pad(S, O + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 5; i++) m.latido(G + 0.3 + i * 0.86, 0.16);                         // el riñón late en la charola
m.whoosh(G + 0.0, 0.6, 0.12);                                                            // sube a la charola
for (let i = 0; i < 160; i += 4) m.tic(E + 0.4 + (i / 160) * 3.0, 0.05, 1800 + (i % 8) * 60); // las figuras de la lista de espera
m.golpe(E + 0.2, 0.25, 80);
m.whoosh(R + 0.2, 1.0, 0.1);                                                             // entra el riñón sin editar
for (let i = 0; i < 8; i++) m.tic(R + 0.3 + i * 0.5, 0.06, 1100);                         // el reloj
m.sube(R + 1.4, 2.2, 57, 45, 0.05);                                                      // se pone morado
m.whoosh(Az + 0.3, 0.6, 0.12);                                                           // se abre la Lupa
for (let i = 0; i < 12; i++) m.tic(Az + 1.6 + i * 0.13, 0.07, 2600);                      // los anticuerpos se pegan
for (let i = 0; i < 3; i++) { m.metal(B + 0.8 + i * 0.5, 0.14, 900); m.nota(B + 0.8 + i * 0.5, 45 + i * 3, 0.1, 0.8); } // 3 cortes = 3 notas graves
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                                      // re-gancho
for (let i = 0; i < 7; i++) m.nota(H + 1.2 + i * (2.4 / 7), m.ESC[3 + i], 0.08, 0.6);     // 7 genes humanos = 7 notas medias
for (let i = 0; i < 7; i++) m.burbuja(H + 1.6 + i * 0.34, 0.08, 700);
for (let i = 0; i < 59; i++) m.tic(V + 0.4 + (i / 59) * 2.4, 0.06, 2000 + (i % 5) * 200); // 59 virus apagados = 59 clics
m.golpe(S + 0.3, 0.32, 80);                                                              // sello de la tarjeta
m.latido(S + 5.2, 0.2); m.latido(S + 5.9, 0.15);                                          // el corazón
m.golpe(A + 0.2, 0.3, 80); m.whoosh(A + 0.3, 0.6, 0.1);
for (let i = 0; i < 14; i++) m.tic(D + 0.3 + i * 0.19, 0.05, 1500);                       // el calendario pasa hojas
m.sube(D + 3.0, 0.8, 60, 52, 0.05);                                                      // empieza a fallar
m.sube(Pu + 0.6, 2.0, 52, 69, 0.06);                                                     // se tiende el puente
for (let i = 0; i < 5; i++) m.tic(Pu + 1.6 + i * 0.1, 0.07, 900);
for (let i = 0; i < 4; i++) m.latido(C + 0.3 + i * 0.86, 0.14);
m.nota(O + 0.3, 57, 0.08, 2.8); m.nota(O + 0.3, 64, 0.06, 2.8); m.nota(O + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
