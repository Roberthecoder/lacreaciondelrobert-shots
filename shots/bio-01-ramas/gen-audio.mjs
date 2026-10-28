// gen-audio.mjs — música y efectos del Biotecnológico #01 (ramas por colores). Sin costo: todo se sintetiza aquí.
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (cama de la narrada base, para revisar)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// · Narrada (escenas con "Gancho"): cama grave continua SIN golpe (la voz manda) + un efecto por cosa que pasa
//   + una nota por banda del arcoíris (10 ramas = 10 notas de la escala, de afuera hacia adentro).
// · Muda (M1 "La música son los datos"): cada rama suma su capa. El pulso es un latido a 72 por minuto (rama roja);
//   la gris suena "tapada" mientras el agua está sucia y se abre cuando los microbios la limpian; el final
//   borra las bandas con las mismas 10 notas al revés y queda como el primer cuadro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ramas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML));
const K = M.K, NOTA_RAMA = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81]; // una nota por banda

if (K.Gancho != null) {
  /* ---------- NARRADA ---------- */
  const G = K.Gancho, D = K.Def, Ou = K.Outro;
  M.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  // gancho: las 10 bandas se pintan (10 notas) y saltan los mini medallones (10 tics)
  for (let i = 0; i < 10; i++) { M.nota(G + 0.05 + i * 0.07, NOTA_RAMA[i], 0.05, 0.5); M.pop(G + 2.0 + i * 0.12, 0.12); }
  M.whoosh(G + 0.05, 0.9, 0.14);
  // qué es: bacteria, célula, enzima, flechas y el frasco
  M.pop(D + 0.35, 0.2); M.pop(D + 1.35, 0.2); M.pop(D + 2.15, 0.2); M.whoosh(D + 2.8, 0.7, 0.12); M.golpe(D + 3.35, 0.3, 90);
  // cada rama: su nota al llenar la banda + el efecto de lo que pasa en el medallón
  const ini = { Rojo: 0, Verde: 1, Blanco: 2, Amarillo: 3, Azul: 4, Pregunta: 5, Cafe: 6, Dorado: 7, Morado: 8 };
  for (const [n, i] of Object.entries(ini)) { M.nota(K[n] + 0.05, NOTA_RAMA[i], 0.07, 0.9); M.whoosh(K[n] - 0.1, 0.5, 0.1); }
  const negro = K.Morado + 0.45 * (K.Estudio - K.Morado); M.nota(negro + 0.05, NOTA_RAMA[9], 0.07, 0.9); M.whoosh(negro - 0.1, 0.5, 0.1);
  for (let t = K.Rojo + 0.3; t < K.Verde - 0.2; t += 60 / 72) M.latido(t, 0.12);                  // latido
  M.sube(K.Verde + 0.1, 1.5, 50, 62, 0.05);                                                        // la planta crece
  for (let i = 0; i < 5; i++) M.tic(K.Blanco + 0.6 + i * 0.52, 0.12, 1400);                        // las enzimas se comen 5 manchas
  for (let i = 0; i < 8; i++) M.burbuja(K.Amarillo + 0.4 + i * 0.4, 0.06, 400 + (i % 3) * 120);    // fermenta
  M.ruido(K.Azul, 2.6, 0.08, 300, 900);                                                            // ola
  for (let i = 0; i < 5; i++) M.tic(K.Gris + 0.5 + i * 0.55, 0.1, 2200);                           // microbios que limpian
  M.sube(K.Gris + 0.4, 3.0, 52, 64, 0.04);
  M.burbuja(K.Cafe + 0.6, 0.12, 700);                                                              // la gota
  for (let t = K.Dorado + 0.2; t < K.Morado - 0.2; t += 1 / 6) M.tic(t, 0.035, 3200);               // letras del ADN (6 por segundo)
  M.golpe(K.Morado + 0.5, 0.25, 140); M.golpe(K.Morado + 1.5, 0.25, 140);                            // mazo
  // estudio: tarjeta y los tres círculos que se juntan
  M.golpe(K.Estudio + 0.25, 0.35, 80); [0, 1, 2].forEach((i) => M.pop(K.Estudio + 2.7 + i * 0.15, 0.15));
  M.nota(K.Estudio + 4.2, 57, 0.06, 1.2); M.nota(K.Estudio + 4.2, 64, 0.05, 1.2); M.nota(K.Estudio + 4.2, 69, 0.05, 1.2);
  // naranja: la banda 11
  M.nota(K.Naranja + 0.6, NOTA_RAMA[10], 0.08, 1.2); M.pop(K.Naranja + 0.9, 0.2);
  // cierre: las 11 notas juntas y acorde final
  M.whoosh(K.Cierre, 0.8, 0.16); for (let i = 0; i < 11; i++) M.nota(K.Cierre + 0.1 + i * 0.12, NOTA_RAMA[i], 0.04, 0.6);
  M.nota(Ou + 0.3, 57, 0.08, 2.8); M.nota(Ou + 0.3, 64, 0.06, 2.8); M.nota(Ou + 0.3, 69, 0.05, 2.8);
} else {
  /* ---------- MUDA ---------- */
  const NOMBRES = ['Rojo', 'Verde', 'Blanco', 'Amarillo', 'Azul', 'Gris', 'Cafe', 'Dorado', 'Morado', 'Negro'];
  const B = 60 / 72, FIN = K.Todo + 2.4;                       // pulso de 72 por minuto; las capas suenan hasta que se borran
  const beats = (t0, t1, fn) => { for (let t = Math.ceil(t0 / B) * B; t < t1; t += B) fn(t, Math.round(t / B)); };
  // inicio: solo una nota suave que pregunta (y es la misma con la que termina el loop)
  M.pad(0, K.Rojo, 0.03, [45, 57]);
  M.nota(0.05, 69, 0.05, 1.6); M.nota(K.Todo + 4.0, 69, 0.05, 1.0);
  NOMBRES.forEach((n, i) => { M.campana(K[n], NOTA_RAMA[i], 0.09, 1.6); M.whoosh(K[n] - 0.2, 0.4, 0.1); });
  // capa ROJA: latido a 72/min
  beats(K.Rojo, FIN, (t) => M.latido(t, 0.2));
  // capa VERDE: bajo que sube en cada compás (crecer)
  beats(K.Verde, FIN, (t, k) => { if (k % 4 === 0) M.pluck(t, [45, 47, 48, 50][(k / 4) % 4 | 0], 0.12, 1.2); });
  // capa BLANCA: 5 manchas = 5 mordidas, luego burbujas en contratiempo
  for (let i = 0; i < 5; i++) M.tic(K.Blanco + 0.6 + i * 0.52, 0.18, 1400);
  beats(K.Blanco + 3, FIN, (t) => M.burbuja(t + B / 2, 0.05, 900));
  // capa AMARILLA: levadura (burbujas de fermentación, irregulares)
  beats(K.Amarillo, FIN, (t, k) => { if (k % 2) M.burbuja(t + 0.1, 0.06, 380); });
  // capa AZUL: olas lentas (una cada 4 latidos)
  beats(K.Azul, FIN, (t, k) => { if (k % 4 === 1) M.ruido(t, 3.2, 0.06, 250, 800); });
  // capa GRIS: todo suena tapado mientras el agua está sucia; 5 microbios la limpian y se abre el filtro
  M.pad(K.Gris, K.Gris + 1.2, 0.05, [40, 47], 180); for (let i = 0; i < 5; i++) M.tic(K.Gris + 1.3 + i * 0.6, 0.14, 2200); M.sube(K.Gris + 1.2, 3, 52, 64, 0.05);
  // capa CAFÉ: viento seco y una sola gota
  M.ruido(K.Cafe, 4.5, 0.05, 600, 1400); M.burbuja(K.Cafe + 0.9, 0.15, 700);
  // capa DORADA: datos (6 letras de ADN por segundo, como en pantalla)
  for (let t = K.Dorado; t < FIN; t += 1 / 6) M.tic(t, 0.03, 3200);
  // capa MORADA: mazo en el tiempo 1 de cada compás
  beats(K.Morado, FIN, (t, k) => { if (k % 4 === 0) M.golpe(t, 0.25, 140); });
  // capa OSCURA: alarma grave
  M.pad(K.Negro, FIN, 0.035, [38, 45], 300);
  // melodía: la nota de cada rama en cada compás, en orden, cuando ya está su capa (la canción se arma sola)
  beats(K.Rojo, FIN, (t, k) => { const activas = NOMBRES.filter((n) => K[n] <= t).length; if (k % 2 === 0) M.nota(t, NOTA_RAMA[(k / 2) % activas | 0], 0.04, 0.4); });
  // final: acorde de todo y borrado banda por banda con las 10 notas al revés
  [57, 64, 69, 76].forEach((m) => M.campana(K.Todo + 0.1, m, 0.06, 2.4));
  for (let i = 9; i >= 0; i--) M.nota(K.Todo + 2.4 + (9 - i) * 0.17, NOTA_RAMA[i], 0.06, 0.5);
  M.nota(K.Outro + 0.3, 57, 0.07, 2.8); M.nota(K.Outro + 0.3, 64, 0.05, 2.8);
}
M.guardar(path.join(HERE, OUT));
