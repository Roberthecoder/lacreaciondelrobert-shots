// gen-audio.mjs — cama y efectos del Shot Fungi Mati #122 (necromasa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave en re menor que cambia de acorde con la historia (i → VI → III → VII → i → IV → V → I),
// con voces que se mueven a la nota más cercana, y un motivo propio de 4 notas (re–fa–mi–la) que se presenta en el gancho,
// regresa transpuesto (secuencia) al bajar al microscopio, se pregunta en el re-gancho y se resuelve en mayor en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Necromasa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 122);
const K = m.K;
const G = K.Gancho, Co = K.Comida, Hi = K.Hifas, M = K.Muere, A = K.Arcilla, P = K.Pregunta, Hu = K.Huella,
  E19 = K.Estudio2019, E26 = K.Estudio2026, D = K.Doble, V = K.Vivos, C = K.Cierre, Ou = K.Outro;

// ---- cama: acordes con conducción de voces (MIDI) ----
m.pad(0, Co, 0.05, [38, 50, 53, 57]);              // Dm (tierra, de día)
m.pad(Co, Hi, 0.05, [34, 50, 53, 58], 0.2);        // B♭ (bajamos: más oscuro)
m.pad(Hi, M, 0.05, [41, 48, 53, 57], 0.25);        // F (la hifa viva)
m.pad(M, A, 0.05, [36, 48, 52, 55], 0.35);         // C (muere: se apaga)
m.pad(A, P, 0.045, [38, 50, 53, 57], 0.3);         // Dm (décadas o siglos)
m.pad(P, Hu, 0.05, [43, 50, 55, 58], 0.1);         // Gm (pregunta)
m.pad(Hu, E19, 0.045, [45, 49, 52, 57], 0.15);     // A (laboratorio: tensión)
m.pad(E19, E26, 0.05, [38, 50, 53, 57], 0.05);     // Dm
m.pad(E26, D, 0.05, [34, 50, 53, 58], 0);          // B♭ → se abre
m.pad(D, V, 0.05, [45, 49, 52, 57], 0);            // A (dominante)
m.pad(V, C, 0.045, [43, 50, 55, 59], 0.1);         // G (vivos: chiquito)
m.pad(C, Ou + 3.5, 0.055, [38, 50, 54, 57], 0);    // D mayor: el mismo puño, resuelto

// ---- motivo de 4 notas (marimba suave = nota con decaimiento corto) ----
const motivo = (t, base, paso = 0.32, g = 0.05, final) => { [0, 3, 2, final ?? 7].forEach((iv, i) => m.nota(t + i * paso, base + iv, g, 0.9)); };
motivo(G + 0.9, 62);                 // presentación (re–fa–mi–la)
motivo(Hi + 0.4, 65, 0.3, 0.04);     // secuencia una 3.ª arriba (al microscopio)
motivo(P + 0.2, 67, 0.28, 0.045, 5); // pregunta: no resuelve (queda en la 6.ª)
motivo(E26 + 0.4, 62, 0.34, 0.04);   // regresa en el estudio
[62, 66, 64, 69, 74].forEach((n, i) => m.nota(C + 2.6 + i * 0.36, n, 0.05, 1.2)); // cierre en mayor (fa♯), sube a la octava

// ---- efectos atados a la pantalla ----
m.whoosh(G + 0.05, 0.5, 0.12); m.golpe(G + 0.6, 0.45, 55);                      // cae el puño de tierra
for (let i = 0; i < 10; i++) m.tic(G + 0.65 + i * 0.07, 0.08, 500 + i * 40);       // terroncitos
m.cruje(G + 1.6, 0.25);                                                            // se tacha "solo planta podrida"
m.tic(G + 2.3, 0.15, 1300);                                                        // chip "cementerio de microbios"
for (let i = 0; i < 6; i++) m.cruje(Co + 0.2 + i * 0.4, 0.06);                     // las hifas crecen
for (let i = 0; i < 8; i++) m.burbuja(Co + 1.7 + i * 0.25, 0.06, 420 + (i % 4) * 80); // carbono que pasa a los microbios
m.whoosh(Hi - 0.3, 0.7, 0.1);                                                      // entra la hifa
for (let i = 0; i < 7; i++) m.tic(Hi + 1.6 + i * 0.17, 0.07, 1500 + i * 60);      // anillos de quitina
m.sube(M + 0.1, 1.3, 50, 43, 0.04);                                                // la hifa se vacía
for (let i = 0; i < 6; i++) m.cruje(M + 1.4 + i * 0.3, 0.08);                      // la pared se parte
for (let i = 0; i < 5; i++) m.tic(M + 3.0 + i * 0.25, 0.18, 700);                  // cada resto se pega a la arcilla
for (let i = 0; i < 30; i++) m.tic(A + 0.3 + i * 0.11, 0.03, 3200 + (i % 3) * 400); // arena del reloj
m.sube(P + 0.05, 1.2, 50, 62, 0.045);                                              // re-gancho
m.tic(Hu + 0.9, 0.12, 900); m.burbuja(Hu + 1.0, 0.08, 520);                        // sale la glucosamina
m.cruje(Hu + 2.4, 0.2); m.burbuja(Hu + 3.0, 0.08, 700);                            // se rompe la bacteria, ácido murámico
m.golpe(E19 + 0.1, 0.3, 80); m.sube(E19 + 2.0, 1.2, 50, 57, 0.035);               // tarjeta 2019, barras
m.golpe(E26 + 0.1, 0.3, 80);
for (let i = 0; i < 40; i++) m.tic(E26 + 0.3 + i * 0.047, 0.035, 2600 + (i % 5) * 200); // 486 puntitos (granizo suave)
for (let i = 0; i < 50; i++) { const t = E26 + 4.2 + (i / 50) * 4.0; m.tic(t, 0.07, i < 34 ? 700 : 1500); } // cuadritos: dorados graves, morados agudos
m.golpe(D + 0.1, 0.5, 60); m.metal(D + 0.5, 0.08, 600);                            // la balanza cae
m.latido(V + 0.6, 0.18); m.latido(V + 1.4, 0.15); m.latido(V + 2.2, 0.12);        // los 2 cuadritos vivos
m.whoosh(C - 0.3, 0.7, 0.08);
for (let i = 0; i < 12; i++) m.tic(C + 0.4 + i * 0.16, 0.05, 1800 + (i % 3) * 300); // brillitos en la tierra
m.nota(Ou + 0.3, 50, 0.07, 2.8); m.nota(Ou + 0.3, 57, 0.05, 2.8); m.nota(Ou + 0.3, 66, 0.04, 2.8);
m.guardar(OUT, 1);
