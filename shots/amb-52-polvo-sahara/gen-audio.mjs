// gen-audio.mjs — cama grave + efectos del Shot Ambiental #52 (polvo del Sahara). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Polvo Sahara base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
const G = K.Gancho, O = K.Origen, V = K.Viaje, P = K.Pregunta, S = K.Satelite, D = K.PorDia, A = K.Amazonas, F = K.Fosforo, H = K.Huracanes, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                                // cama grave, como viento
m.sube(G, 2.4, 64, 52, 0.05); m.whoosh(G + 0.3, 1.2, 0.08);                            // el sol baja, el cielo se enrojece
m.cruje(G + 2.4, 0.3); m.golpe(G + 3.2, 0.25, 110);                                    // se tacha "humo" · aparece "polvo del Sahara"
for (let i = 0; i < 4; i++) m.whoosh(O + 0.2 + i * 1.1, 0.9, 0.12);                   // ráfagas que levantan el polvo
m.sube(O + 1.2, 1.4, 52, 64, 0.05);                                                    // "muy alto"
m.whoosh(V + 0.2, 4.0, 0.06); m.zumbido(V + 0.2, 4.0, 0.03, 140);                      // la nube cruza el Atlántico
m.metal(V + 5.6, 0.18, 1200); m.metal(V + 6.4, 0.14, 1200);                            // aviso del SMN, pulso en Yucatán
m.sube(P + 0.05, 1.2, 52, 64, 0.05); m.motor(P + 0.4, 1.6, 0.06);                      // pregunta y el camioncito
for (let i = 0; i < 14; i++) m.tic(S + 0.3 + i * 0.45, 0.06, 3200);                    // pulsos de láser del satélite
m.golpe(S + 4.4, 0.4, 70); m.nota(S + 4.6, 62, 0.06, 1.2);                             // 182 millones
for (let i = 0; i < 16; i++) m.tic(D + 0.2 + i * 0.19, 0.05, 1500 + (i % 4) * 150);     // días que pasan
m.golpe(D + 0.3, 0.3, 90);
m.whoosh(A - 0.4, 1.4, 0.1); for (let i = 0; i < 10; i++) m.gota(A + 1.2 + i * 0.3, 0.05, 600); // zoom al Amazonas y el polvo que cae
for (let i = 0; i < 12; i++) m.burbuja(F + 0.4 + i * 0.5, 0.05, 420);                  // granos con fósforo entran al suelo
for (let i = 0; i < 14; i++) m.gota(F + 2.1 + i * 0.27, 0.06, 900 + (i % 3) * 120);    // lluvia que se lleva fósforo
m.nota(F + 3.5, 67, 0.05, 0.8);                                                        // entra ≈ sale
m.zumbido(H + 0.2, 1.6, 0.04, 110); m.whoosh(H + 1.6, 3.0, 0.1); m.sube(H + 1.6, 3.0, 60, 48, 0.04); // el ciclón se deshilacha
m.sube(C + 0.4, 2.2, 50, 62, 0.04); m.whoosh(C + 0.4, 2.2, 0.06); m.nota(C + 2.8, 64, 0.05, 1.0);    // el hilo de polvo y el mini mapa
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
