// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #144 (Recalentar hongos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): 100 BPM, re menor → fa mayor. Cama de acordes con función (i–VI–III–VII y luego I–V–vi–IV),
// un tema propio de 4 compases (motivo → respuesta → secuencia → cadencia) que cambia cada 2 compases, tapado en el microscopio
// (el problema) y abierto y cálido desde «enfriar rápido» (la solución). Siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Recalentar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 144);
const K = m.K;
const G = K.Gancho, Ab = K.Abuela, Or = K.Origen, Bq = K.Banquete, Tb = K.Tibio, P = K.Pregunta, To = K.Toxina, Ca = K.Calor,
  En = K.Enfriar, Rf = K.Refri, Rc = K.Recalentar, Ar = K.Arroz, C = K.Cierre, Ou = K.Outro;

// ---- música ----
const BAR = 2.4, BEAT = 0.6;
const MENOR = [[38, 45, 50, 53], [34, 41, 46, 50], [41, 48, 53, 57], [36, 43, 48, 52]];   // Dm · B♭ · F · C
const MAYOR = [[41, 48, 53, 57], [36, 43, 48, 52], [38, 45, 50, 53], [34, 41, 46, 50]];   // F · C · Dm · B♭
// tema (en negras; null = respiración). 4 frases distintas para no repetir más de 2 compases seguidos.
const TEMA_MENOR = [
  [62, 65, 69, null, 67, 65, 64, null],          // motivo → respuesta
  [60, 64, 67, null, 65, 64, 62, null],          // secuencia un tono abajo
  [62, 65, 69, 72, 70, 69, 67, 65],              // crece
  [64, 62, 61, null, 62, null, null, null],      // cadencia a la raíz
];
const TEMA_MAYOR = [
  [69, 72, 77, null, 76, 74, 72, null],
  [67, 71, 74, null, 72, 71, 69, null],
  [69, 72, 74, 77, 76, 74, 72, 74],
  [72, 69, 67, null, 69, null, null, null],
];
const abre = En;                                  // la solución abre la música
const finMus = Ou + 3.4;
for (let b = 0, t = 0; t < finMus; b++, t = b * BAR) {
  const mayor = t >= abre - 0.01, prog = mayor ? MAYOR : MENOR, ch = prog[b % 4];
  const tapa = t >= Tb - 0.3 && t < En ? 0.55 : 0;
  m.pad(t, Math.min(finMus, t + BAR + 0.3), 0.045, ch.slice(0, 3), tapa);
  // bajo suave en 1 y 3 (sin golpe marcado)
  m.nota(t, ch[0] + 12, 0.035, 1.1, 0.6); m.nota(t + 2 * BEAT, ch[1] + 12, 0.025, 0.9, 0.6);
  // arpegio muy suave de cuerdas pulsadas (contestación), cambia la figura cada compás
  const fig = [[1, 2, 3, 2], [2, 3, 1, 3], [3, 2, 1, 2], [1, 3, 2, 3]][b % 4];
  fig.forEach((k, j) => m.nota(t + (j + 0.5) * BEAT, ch[k] + 24, 0.014 + 0.004 * (j % 2), 0.5, tapa));
  // tema: entra en el compás 2 y descansa cada 4 compases medio compás; la melodía cambia con cada frase
  if (b >= 1 && t < Ou) {
    const fr = (mayor ? TEMA_MAYOR : TEMA_MENOR)[Math.floor((b - 1) / 2) % 4], mitad = (b - 1) % 2;
    fr.slice(mitad * 4, mitad * 4 + 4).forEach((nn, j) => { if (nn != null) m.nota(t + j * BEAT + 0.012 * ((b + j) % 3), nn, 0.028 + 0.006 * (j === 0), j === 3 ? 1.0 : 0.62, tapa * 0.8); });
  }
}
m.nota(Ou + 0.3, 53, 0.06, 3.0); m.nota(Ou + 0.3, 57, 0.05, 3.0); m.nota(Ou + 0.3, 60, 0.05, 3.0); m.nota(Ou + 0.3, 65, 0.04, 3.0); // acorde final que se queda

// ---- efectos (cada evento, en su cuadro) ----
m.zumbido(G, 3.0, 0.05, 120); m.tic(G + 0.05, 0.3, 2200);                        // se prende el microondas
m.whoosh(G + 0.4, 0.9, 0.06);                                                      // vapor
m.cruje(G + 1.6, 0.3);                                                             // se tacha «¿veneno?»
m.tic(G + 2.6, 0.18, 1400);                                                        // chip
m.metal(Ab - 0.3, 0.18, 1560);                                                     // «ding» del microondas
m.burbuja(Ab + 0.3, 0.1, 380); m.golpe(Ab + 2.2, 0.4, 60);                         // globo y sello MITO
m.motor(Or, 3.6, 0.03);                                                            // fogón de leña
m.cruje(Or + 1.4, 0.25);                                                           // ✗ en el refri que no había
for (let i = 0; i < 14; i++) m.gota(Bq + 0.2 + i * 0.08, 0.1, 800 + (i % 5) * 120); // gotas de agua
for (let i = 0; i < 6; i++) m.tic(Bq + 1.8 + i * 0.15, 0.12, 1700);
// microscopio: un «pop» por cada duplicación (1 → 2 → 4 → 8 → 16 → 32)
for (let k = 1; k <= 5; k++) m.burbuja(Tb + 0.3 + (k / 6) * 2.7, 0.08 + 0.02 * k, 300 + k * 70);
for (let i = 0; i < 10; i++) m.nota(Tb + 2.0 + i * 0.12, 81 + (i % 3) * 2, 0.02, 0.3, 0.4); // toxinas
m.sube(P + 0.1, 1.6, 50, 62, 0.04); m.motor(P, 2.6, 0.04);                         // re-gancho y fuego
m.golpe(To + 0.2, 0.3, 80);                                                        // tarjeta FDA
m.sube(To + 2.3, 2.0, 45, 69, 0.045);                                              // la temperatura sube a 121 °C
for (let i = 0; i < 12; i++) m.tic(To + 2.5 + i * 0.16, 0.06, 2600);               // cronómetro
m.tic(To + 4.4, 0.2, 1200);
for (let i = 0; i < 8; i++) m.cruje(Ca + 0.2 + i * 0.15, 0.05);                    // mueren las bacterias
m.nota(Ca + 1.4, 74, 0.04, 1.2, 0.3);                                              // la toxina se queda
m.golpe(En + 0.2, 0.3, 90);                                                        // «2 h»
for (let i = 0; i < 3; i++) m.tic(En + 1.0 + i * 0.25, 0.2, 900);                  // recipientes
for (let i = 0; i < 3; i++) m.tic(En + 2.0 + i * 0.15, 0.14, 1900);                // tapas
m.whoosh(En + 2.4, 0.5, 0.08); m.whoosh(En + 3.0, 1.0, 0.06); m.golpe(En + 4.6, 0.25, 70); // puerta del refri
m.zumbido(Rf, 5.0, 0.025, 60);                                                     // refri
m.nota(Rf + 0.3, 72, 0.04, 0.8); m.tic(Rf + 2.4, 0.18, 1400);
m.motor(Rc, 5.0, 0.03); for (let i = 0; i < 30; i++) m.tic(Rc + 0.1 + i * 0.17, 0.035, 3000 + (i % 5) * 400); // chisporroteo
m.sube(Rc + 0.4, 1.8, 52, 64, 0.03); m.tic(Rc + 3.3, 0.2, 1500);                   // termómetro y «1 sola vez»
for (let i = 0; i < 5; i++) m.tic(Ar + 0.3 + i * 0.3, 0.16, 900 + i * 120);       // aparecen las sobras
m.zumbido(C, 4.4, 0.04, 120); m.cruje(C + 0.5, 0.2);
for (let i = 0; i < 3; i++) m.tic(C + 1.0 + i * 0.5, 0.16, 1500 + i * 200);       // chips de las reglas
m.guardar(OUT, 1);
