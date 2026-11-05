// gen-audio.mjs — cama + efectos del Shot Fungi Mati #123 (esporas, viento y nubes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Forma (composicion-musical.md): tema propio de 4 compases (motivo → respuesta → secuencia → cadencia) en el jardín;
// sube de registro con la espora al cielo; en la nube la armonía se abre y entra un timbre de cristal; en el estudio, un pulso
// grave de laboratorio; en la hipótesis queda suspendida (sin resolver); en el cierre el tema regresa, más alto, y resuelve.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esporas Lluvia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 123);
const K = m.K;
const G = K.Gancho, V = K.Viento, Su = K.Sube, Ci = K.Cielo, R = K.Respiras, P = K.Pregunta, N = K.Nube, Se = K.Semilla,
  E = K.Estudio, Ro = K.Royas, H = K.Hipotesis, C = K.Cierre, Ou = K.Outro;
const micro = Ci + 2.9, congela = Se + 0.9, mohoHielo = E + 6.3, royaHielo = Ro + 2.0;

// ---------- armonía: un acorde por tramo (con conducción de voces: cada voz se mueve a la nota más cercana) ----------
const AM = [45, 52, 57, 60], F = [41, 48, 57, 60], CM = [48, 52, 55, 60], GM = [43, 50, 55, 59], EM = [40, 47, 55, 59],
  DM9 = [50, 57, 62, 65], FM7 = [41, 52, 57, 64], ASUS = [45, 52, 57, 62], CM_ALTO = [48, 55, 60, 64];
const tramos = [
  [G, V, AM], [V, V + 2.6, F], [V + 2.6, Su, CM], [Su, Ci, GM],                       // jardín: i–VI–III–VII
  [Ci, micro, AM], [micro, R, FM7], [R, P, CM],                                        // al cielo: se abre
  [P, N, ASUS],                                                                         // re-gancho suspendido
  [N, Se, DM9], [Se, Se + 3, AM], [Se + 3, E, EM],                                      // la nube: fría y abierta
  [E, E + 3, DM9], [E + 3, Ro, FM7], [Ro, H, GM],                                       // estudios: pulso de laboratorio
  [H, C, ASUS],                                                                         // hipótesis: sin resolver
  [C, C + 2.2, F], [C + 2.2, Ou, GM], [Ou, Ou + 3.5, CM_ALTO]];                         // cierre: IV–V–I (resuelve)
tramos.forEach(([a, b, acorde], i) => m.pad(a - (i ? 0.25 : 0), b + 0.25, i >= 8 && i <= 10 ? 0.045 : 0.05, acorde, 0));

// ---------- tema (4 compases) y sus regresos; notas cortas y suaves, siempre debajo de la voz ----------
const frase = (t0, notas, paso = 0.42, g = 0.035, trans = 0) => notas.forEach((n, i) => n && m.nota(t0 + i * paso, n + trans, g * (i % 4 === 0 ? 1.15 : 0.9), paso * 1.6));
const MOTIVO = [69, 72, 76, 74], RESPUESTA = [72, 69, 67, 69], SECUENCIA = [67, 71, 74, 72], CADENCIA = [71, 69, 0, 69];
frase(G + 0.6, MOTIVO); frase(G + 2.4, RESPUESTA);                      // gancho: el tema entero, apenas audible
frase(V + 0.4, SECUENCIA, 0.46); frase(V + 2.7, CADENCIA, 0.46);
frase(Su + 0.3, MOTIVO, 0.4, 0.03, -5);                                  // el tema en el remolino, una cuarta abajo
frase(micro + 0.2, MOTIVO, 0.36, 0.035, 7);                              // al cielo: el tema una quinta arriba
frase(R + 0.5, RESPUESTA, 0.5, 0.03, 7);
// ---------- la nube: timbre de cristal (campanitas agudas, espaciadas) ----------
[0.4, 1.3, 2.1, 2.9].forEach((d, i) => m.nota(N + d, [86, 81, 88, 84][i], 0.03, 1.4));
frase(Se + 1.6, [81, 0, 79, 76], 0.5, 0.028);
// ---------- estudios: pulso grave (de laboratorio), que cambia cada 2 compases ----------
for (let i = 0; i < 14; i++) m.bajo(E + 0.2 + i * 0.6, i % 4 === 3 ? 38 : 33, 0.06, 0.4);
for (let i = 0; i < 6; i++) m.bajo(Ro + 0.2 + i * 0.6, i % 2 ? 43 : 31, 0.06, 0.4);
frase(E + 4.8, SECUENCIA, 0.42, 0.028, -12);
// ---------- hipótesis: la frase pregunta y no contesta ----------
frase(H + 0.4, [69, 72, 74, 0, 74, 76], 0.42, 0.028);
// ---------- cierre: el tema regresa completo, una octava arriba, y resuelve ----------
frase(C + 0.3, MOTIVO, 0.4, 0.032); frase(C + 2.0, [72, 74, 76, 79], 0.4, 0.032); m.nota(Ou + 0.2, 84, 0.04, 2.6);

// ---------- efectos atados a la imagen ----------
m.whoosh(G + 0.25, 1.4, 0.07);                                           // el aire frío empieza a correr (cuadro 0.3)
for (let i = 0; i < 6; i++) m.tic(G + 1.0 + i * 0.18, 0.05, 2600);       // salen las primeras esporas
m.whoosh(G + 2.2, 0.8, 0.05);                                            // entra el aire tibio
for (let i = 0; i < 8; i++) m.burbuja(V + 0.4 + i * 0.3, 0.04, 700 + i * 40); // vapor que sale del sombrero
m.sube(V + 1.8, 1.0, 64, 57, 0.03);                                      // el aire se enfría (baja)
m.whoosh(Su + 0.2, 1.6, 0.07); m.whoosh(Su + 1.6, 1.2, 0.05);            // corre por el suelo, gira y sube
m.sube(Su + 2.0, 1.4, 55, 67, 0.035);                                    // las esporas suben
m.tic(Ci + 0.3, 0.12, 1500); m.nota(Ci + 0.7, 79, 0.03, 0.8);           // al microscopio: la espora
m.whoosh(micro - 0.2, 0.7, 0.06);                                        // del micro al mapa
for (let i = 0; i < 12; i++) m.tic(micro + 0.4 + i * 0.1, 0.06, 1200 + i * 60); // el contador «3 a 50»
m.golpe(micro + 1.6, 0.25, 70);
m.whoosh(R + 1.0, 1.2, 0.05); m.whoosh(R + 2.6, 1.0, 0.04);              // respiración (inhala)
m.sube(P + 0.1, 1.6, 55, 67, 0.045);                                     // re-gancho: ¿y si llega a una nube?
for (let i = 0; i < 7; i++) m.gota(N + 0.3 + i * 0.25, 0.06, 1100 + i * 70); // gotitas de nube
m.gota(congela - 0.1, 0.1, 600); m.metal(congela, 0.12, 1900);           // la semilla toca la gota: «tin» de cristal
m.whoosh(Se + 2.6, 2.0, 0.05); m.gota(Se + 4.4, 0.14, 800);              // el hielo cae y se derrite en lluvia
m.golpe(E + 1.4, 0.35, 60);                                              // sello NO (espora de seta)
m.golpe(E + 2.8, 0.3, 80);                                               // tarjeta 1992
m.sube(mohoHielo - 0.6, 0.6, 60, 52, 0.03); m.metal(mohoHielo, 0.14, 2100); // −2.5 °C: se congela
for (let i = 0; i < 7; i++) m.whoosh(Ro + 0.3 + i * 0.12, 0.25, 0.025); // urediniosporas que vuelan
m.metal(royaHielo, 0.14, 2300);                                          // −4 °C: se congela
m.gota(H + 0.8, 0.1, 900);                                               // la espora junta una gota
m.cruje(H + 1.7, 0.15);                                                  // la balanza se mece
m.golpe(H + 2.8, 0.45, 55);                                              // sello HIPÓTESIS
for (let i = 0; i < 18; i++) m.gota(C + 2.3 + i * 0.12, 0.03 + (i % 3) * 0.01, 1300 + (i % 5) * 120); // llovizna final
m.nota(Ou + 0.3, 60, 0.06, 3); m.nota(Ou + 0.3, 64, 0.05, 3); m.nota(Ou + 0.3, 67, 0.045, 3);
m.guardar(OUT, 1);
