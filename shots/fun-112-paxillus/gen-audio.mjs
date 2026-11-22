// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #112 (Paxillus). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): re menor a 96 BPM (compás = 2.5 s), cama grave continua SIN golpe, debajo de la voz.
// Forma: A (bosque/historia, i–VI–iv–V) → B (por dentro de la sangre: pulso de bajo y latido, i–VII–VI–V, tensión que sube)
// → C (el caso de 1944: se vacía, solo la cama) → D (cierre: se abre a re mayor). Nunca el mismo patrón más de 4 compases;
// un motivo de 4 notas (re–fa–mi–la) con respuesta, y su secuencia una cuarta arriba en B.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Paxillus base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 112);
const K = m.K;
const G = K.Gancho, H = K.Hongo, La = K.Laminas, Hi = K.Historia, Cr = K.Crudo, S = K.Sensibiliza, P = K.Pregunta, He = K.Hemolisis,
  R = K.Rinon, E = K.Estudio, M = K.Murio, Ra = K.Raro, C = K.Cierre, Ou = K.Outro;
const FIN = Ou + 3.6;

// acordes (graves, voces cercanas)
const AC = { i: [38, 45, 53], VI: [34, 46, 50], iv: [31, 43, 50], V: [33, 45, 49], VII: [36, 43, 52], I: [38, 45, 54], IV: [31, 43, 47] };
const compas = 2.5;
// A: 0 → S  ·  B: S → E  ·  C: E → C  ·  D: C → fin
const forma = [
  [0, S, ['i', 'VI', 'iv', 'V', 'i', 'VI', 'VII', 'V'], 0.15],
  [S, E, ['i', 'VII', 'VI', 'V', 'iv', 'VI', 'V', 'V'], 0.0],
  [E, C, ['i', 'iv', 'VI', 'V'], 0.35],
  [C, FIN, ['iv', 'V', 'I', 'IV', 'I'], 0.0],
];
for (const [a, b, prog, tapa] of forma) {
  for (let t = a, k = 0; t < b; t += compas, k++) {
    const ac = AC[prog[k % prog.length]];
    m.pad(t - 0.15, Math.min(b, t + compas) + 0.3, 0.05, ac, tapa);
  }
}
// pulso de bajo (sin golpe): solo en B, con patrón que cambia cada 2 compases
for (let t = S, k = 0; t < E - 0.5; t += compas, k++) {
  const raiz = [38, 36, 34, 33, 31, 34, 33, 33][k % 8];
  const pat = [[0, 1.25], [0, 0.94, 1.56], [0, 1.25, 1.88], [0, 0.63, 1.25, 1.88]][Math.floor(k / 2) % 4];
  pat.forEach((d, j) => m.bajo(t + d, raiz + (j === pat.length - 1 && k % 2 ? 7 : 0), 0.07 + 0.01 * k, 0.5));
}
// motivo (re–fa–mi–la) y respuesta (sol–fa–mi–re), suave, en los huecos de la voz
const motivo = (t, base, g = 0.035) => [[0, 0], [0.31, 3], [0.62, 2], [1.25, 7]].forEach(([d, s]) => m.nota(t + d, base + s, g, 0.9));
const respuesta = (t, base, g = 0.03) => [[0, 5], [0.31, 3], [0.62, 2], [1.25, 0]].forEach(([d, s]) => m.nota(t + d, base + s, g, 1.1));
motivo(H + 0.2, 62); respuesta(La + 1.8, 62); motivo(Hi + 0.5, 62, 0.03);
motivo(S + 0.3, 67, 0.03); respuesta(He + 3.6, 67, 0.03);                         // secuencia una cuarta arriba (B)
m.nota(E + 0.4, 62, 0.025, 2.4);                                                    // C: una sola nota que se queda
motivo(C + 2.0, 66, 0.035); m.nota(Ou + 0.3, 62, 0.07, 3.0); m.nota(Ou + 0.3, 66, 0.05, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0); // D mayor

// ---------- efectos en el mismo cuadro ----------
m.whoosh(G - 0.2, 0.55, 0.12); m.golpe(G + 0.35, 0.22, 90);                         // el plato se desliza y asienta
m.zumbido(G + 0.3, 1.2, 0.02, 220);                                                 // vapor
[0, 1, 2].forEach((i) => m.nota(G + 0.6 + i * 0.45 + 0.2, 69 + i * 3, 0.05, 0.4));  // 1ª ✓ 2ª ✓ 3ª ✓
m.golpe(G + 0.6 + 1.35 + 0.15, 0.4, 55); m.latido(G + 2.3, 0.15); m.latido(G + 3.2, 0.12); // la 4ª: "!"
m.sube(H, 1.6, 40, 50, 0.04); m.nota(H + 1.2, 57, 0.04, 1.0);                       // crece el paxilo
m.tic(H + 2.4, 0.12, 1200);                                                         // flecha al borde
m.whoosh(La - 0.3, 0.8, 0.08);                                                       // la cámara se acerca
m.whoosh(La + 0.9, 0.5, 0.06); m.tic(La + 1.5, 0.25, 700);                           // el dedo toca
for (let i = 0; i < 5; i++) m.gota(La + 1.4 + i * 0.22, 0.06, 420 - i * 30);         // se extienden las manchas
m.tic(Hi + 0.6, 0.2, 1500);                                                          // punto en el mapa
for (let i = 0; i < 10; i++) m.burbuja(Hi + 0.4 + i * 0.3, 0.06, 300 + (i % 4) * 60); // la olla hierve
m.zumbido(Cr + 0.3, 1.0, 0.04, 90);                                                  // el estómago tiembla
m.golpe(Cr + 2.1, 0.5, 50);                                                          // "!" lo grave
m.whoosh(S - 0.3, 0.9, 0.08);                                                        // entramos a la sangre
m.latido(S + 1.4, 0.16);                                                             // el linfocito se activa
for (let i = 0; i < 12; i++) m.tic(S + 2.0 + i * 0.16, 0.08, 2200 + (i % 3) * 300);  // salen los anticuerpos
m.sube(P, 1.8, 50, 62, 0.05);                                                        // re-gancho
for (let i = 0; i < 6; i++) m.tic(He + 1.1 + i * 0.1, 0.07, 1700);                   // grumos que se forman
for (let i = 0; i < 8; i++) m.tic(He + 2.2 + i * 0.12, 0.06, 900);                   // se pegan a los glóbulos
for (let i = 0; i < 8; i++) m.burbuja(He + 3.15 + i * 0.14, 0.12, 700 - i * 30);     // revientan
[0, 0.8, 1.6, 2.4, 3.2].forEach((d) => m.latido(He + d, 0.1));
m.golpe(R + 0.6, 0.45, 48); m.zumbido(R + 0.6, 1.0, 0.03, 70);                       // el riñón se apaga
m.golpe(R + 1.6, 0.3, 80); m.tic(R + 1.7, 0.2, 900);                                 // tache a la olla
m.golpe(E + 0.3, 0.25, 70);                                                          // tarjeta 1944
m.metal(E + 1.2, 0.05, 520); m.metal(E + 1.6, 0.04, 560);                            // cubiertos
m.nota(M + 0.2, 74, 0.04, 0.8);                                                      // ella ✓
for (let i = 0; i < 17; i++) m.tic(M + 1.6 + i * 0.094, 0.06, 1300);                  // 17 días
m.golpe(M + 3.2, 0.35, 45);
for (let i = 0; i < 8; i++) m.nota(Ra + 0.6 + i * 0.27, [69, 72, 74, 76, 74, 72, 69, 67][i], 0.025, 0.3); // el foco recorre
m.nota(Ra + 2.7, 64, 0.04, 1.0);
m.golpe(C + 0.8, 0.25, 70); m.cruje(C + 0.85, 0.15);                                  // tachón a las palomitas
m.golpe(C + 1.0, 0.45, 60);                                                          // sello NO TE PROTEGE
m.tic(C + 2.0, 0.15, 1400); m.tic(C + 3.6, 0.15, 1400);                              // consejos
m.guardar(OUT, 1);
