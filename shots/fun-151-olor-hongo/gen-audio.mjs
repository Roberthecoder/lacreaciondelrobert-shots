// gen-audio.mjs — música y efectos del Shot Fungi Mati #151 (el olor a champiñón: 1-octen-3-ol). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama cálida y un poco misteriosa ("cocina de noche") a 96 BPM, en re dórico,
// armonía con función (i–IV–VII–i, luego ii–V hacia fa mayor en el estudio, y regreso), voces cercanas, y un motivo propio
// de 4 notas (re–fa–mi–la, "como un olor que sube") que se contesta, se transpone y cierra en cadencia; cada parte cambia de
// textura (pad solo → pizzicato grave en la célula → arpegio en la gráfica → motivo arriba en el cierre). Siempre bajo la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Olor Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 151);
const K = m.K;
const G = K.Gancho, Ge = K.Geosmina, Co = K.Corte, E1 = K.Enzima1, E2 = K.Enzima2, N = K.Nariz, P = K.Pregunta, Es = K.Estudio,
  S = K.Segundos, D = K.Defensa, Ep = K.Espejo, V = K.Vacas, C = K.Cierre, Ou = K.Outro;
const BAR = 2.5; // 96 BPM, 4/4

// ---------- armonía: un acorde por compás, voces cercanas (MIDI) ----------
const AC = {
  Dm: [50, 53, 57, 60], G: [43, 50, 55, 59], C: [48, 52, 55, 60], Am: [45, 52, 57, 60], Bb: [46, 53, 58, 62], F: [41, 53, 57, 60],
  Gm: [43, 50, 55, 58], A: [45, 52, 57, 61], Dm9: [50, 57, 60, 64], Fmaj7: [41, 52, 57, 60], Csus: [48, 53, 55, 60], Dsus: [50, 55, 57, 62],
};
const PARTES = [
  [G, Co, ['Dm', 'G', 'C', 'Dm'], 0.05, 0.25],       // gancho y geosmina: dórico, curioso, un poco tapado
  [Co, E1, ['Bb', 'C', 'Dm'], 0.05, 0.1],            // el corte: sube
  [E1, N, ['Dm', 'Am', 'Bb', 'A'], 0.045, 0.35],     // por dentro: menor con dominante, más oscuro
  [N, P, ['F', 'C', 'Dm'], 0.05, 0],                 // la nariz: se aclara
  [P, Es, ['Gm', 'A'], 0.05, 0.3],                   // re-gancho: suspenso
  [Es, D, ['F', 'Csus', 'Dm', 'Bb', 'F', 'C'], 0.055, 0], // el estudio y la gráfica: se abre a mayor
  [D, Ep, ['Dm', 'Gm', 'A'], 0.045, 0.2],            // defensa: serio
  [Ep, V, ['Bb', 'Fmaj7', 'Gm', 'A'], 0.05, 0],      // espejo
  [V, C, ['F', 'C', 'Bb', 'C'], 0.055, 0],           // vacas: más ligero
  [C, Ou + 3.5, ['Bb', 'C', 'Dsus', 'Dm9'], 0.05, 0], // regreso al inicio, cadencia abierta
];
for (const [t0, t1, prog, g, tapa] of PARTES) {
  for (let t = t0, k = 0; t < t1 - 0.05; t += BAR, k++) {
    const ac = AC[prog[k % prog.length]], fin = Math.min(t + BAR + 0.15, t1);
    m.pad(t, fin, g, ac.slice(0, 3), tapa);
    m.bajo(t, ac[0] - 12, 0.05, 1.6);
    if (k % 2 === 1) m.bajo(t + BAR * 0.5, ac[0] - 12 + 7, 0.03, 1.0);
  }
}

// ---------- melodía: motivo → respuesta → secuencia → cadencia; respira entre frases ----------
const B = BAR / 4;
const frase = (t0, notas, g = 0.026, tapa = 0) => notas.forEach(([b, mm, d]) => m.nota(t0 + b * B, mm, g, d * B * 1.4, tapa));
const MOTIVO = [[0, 74, 1], [1, 77, 0.5], [1.5, 76, 0.5], [2, 81, 2]];       // re–fa–mi–la: sube como el olor
const RESPUESTA = [[0, 79, 1], [1, 77, 0.5], [1.5, 76, 0.5], [2, 74, 2]];    // sol–fa–mi–re: baja y descansa
const SECUENCIA = [[0, 76, 1], [1, 79, 0.5], [1.5, 77, 0.5], [2, 83, 2]];    // el motivo un tono arriba (dórico: si natural)
const CADENCIA = [[0, 76, 1], [1, 73, 1], [2, 74, 2]];                        // mi–do#–re
frase(G + 0.2, MOTIVO, 0.024, 0.3); frase(G + BAR + 0.3, RESPUESTA, 0.022, 0.3);
frase(Co + 0.6, SECUENCIA, 0.024);
frase(E1 + 0.4, MOTIVO.map(([b, mm, d]) => [b, mm - 12, d]), 0.028, 0.2);   // célula: una octava abajo, como pizzicato
frase(E2 + 0.4, SECUENCIA.map(([b, mm, d]) => [b, mm - 12, d]), 0.026, 0.2);
frase(N + 0.3, RESPUESTA.map(([b, mm, d]) => [b, mm - 2, d]), 0.024);
frase(P + 0.1, [[0, 76, 1], [1, 77, 1], [2, 79, 1.5]], 0.024, 0.2);         // pregunta que queda abierta
frase(Es + 0.4, MOTIVO.map(([b, mm, d]) => [b, mm + 3, d]), 0.024);          // el tema en fa mayor
frase(Es + BAR * 1.5, RESPUESTA.map(([b, mm, d]) => [b, mm + 3, d]), 0.022);
for (let i = 0; i < 12; i++) m.nota(S + 0.4 + i * 0.32, [65, 69, 72, 77][i % 4] + (i > 7 ? 2 : 0), 0.016, 0.5); // arpegio mientras se dibuja la curva
frase(D + 0.5, CADENCIA.map(([b, mm, d]) => [b, mm - 12, d]), 0.026, 0.2);
frase(Ep + 0.3, MOTIVO, 0.022); frase(Ep + BAR + 0.3, MOTIVO.map(([b, mm, d]) => [b, 148 - mm, d]), 0.02); // el motivo y su espejo (invertido)
frase(V + 0.5, RESPUESTA.map(([b, mm, d]) => [b, mm + 5, d]), 0.022);
frase(C + 0.4, MOTIVO, 0.024); frase(C + BAR + 0.4, CADENCIA, 0.024);        // el motivo del inicio, ahora resuelve

// ---------- efectos en el mismo cuadro ----------
m.whoosh(G, 0.45, 0.08); m.golpe(G + 0.45, 0.35, 120); m.cruje(G + 0.45, 0.15); // el cuchillo baja y corta (golpe en la tabla)
m.whoosh(G + 0.5, 1.0, 0.05);                                                    // "fsss" del olor que sube
m.cruje(G + 1.6, 0.2); m.tic(G + 2.0, 0.2, 1500);                               // tachón «¿tierra?» y chip
for (let i = 0; i < 3; i++) m.gota(Ge + 0.4 + i * 0.35, 0.08, 800 + i * 60);    // gotas sobre la maceta
m.golpe(Ge + 1.6, 0.25, 70); m.nota(Ge + 3.0, 81, 0.05, 0.6);                    // ✗ geosmina · ✓ alcohol de hongo
m.whoosh(Co + 0.1, 0.45, 0.08); m.golpe(Co + 0.55, 0.3, 120); m.sube(Co + 0.6, 1.0, 55, 67, 0.04); // corta; el medidor sube
m.whoosh(E1 - 0.3, 0.8, 0.1); m.cruje(E1 + 0.3, 0.3);                           // entramos; células que se rompen
for (let i = 0; i < 6; i++) m.burbuja(E1 + 0.9 + i * 0.12, 0.05, 420 + i * 40); // sale la grasa
m.tic(E1 + 2.2, 0.25, 1800); m.burbuja(E1 + 2.35, 0.08, 700); m.burbuja(E1 + 2.55, 0.08, 820); // la enzima 1 pega el oxígeno
m.tic(E2 + 1.0, 0.35, 2600); m.tic(E2 + 1.08, 0.25, 3100);                      // la enzima 2 corta
m.sube(E2 + 1.4, 1.8, 62, 74, 0.035); m.nota(E2 + 3.1, 86, 0.03, 1.0);          // el pedazo de 8 carbonos sale volando y brilla
m.whoosh(N + 0.5, 0.9, 0.09); m.whoosh(N + 2.3, 0.9, 0.08);                     // aspira la nariz
m.sube(P + 0.1, 1.5, 50, 62, 0.04);                                              // re-gancho
m.golpe(Es + 0.2, 0.3, 80);                                                      // tarjeta 2026
m.metal(Es + 4.4, 0.05, 1400); for (let i = 0; i < 8; i++) m.tic(Es + 4.6 + i * 0.25, 0.08, 2200); // el medidor registra
m.tic(Es + 5.6, 0.3, 2800);                                                      // tijeritas dentro del frasco
m.tic(S + 0.3, 0.3, 2800);
for (let i = 0; i < 16; i++) m.tic(S + 0.4 + i * 0.25, 0.05, 1200);             // tic-tac del reloj de la gráfica
for (let i = 0; i < 10; i++) m.tic(D + 0.2 + i * 0.2, 0.04, 3400 + (i % 2) * 400); // pasitos del ácaro
m.whoosh(D + 1.2, 1.0, 0.05); m.tic(D + 2.3, 0.15, 900);                         // la nube; media vuelta
for (let i = 0; i < 8; i++) m.tic(D + 2.6 + i * 0.2, 0.04, 3600);               // se va
m.whoosh(Ep + 0.2, 0.6, 0.06); m.metal(Ep + 0.9, 0.05, 1600);                    // el espejo
m.bajo(V + 0.4, 38, 0.06, 1.2); m.sube(V + 0.4, 0.9, 41, 38, 0.03);              // mugido corto y lejano
m.zumbido(V + 2.2, 2.6, 0.035, 520); m.zumbido(V + 2.6, 2.2, 0.03, 610);         // mosquitos que llegan a la trampa
m.motor(V + 1.0, 4.0, 0.025);                                                    // ventilador de la trampa
m.cruje(C + 0.7, 0.15); m.whoosh(C + 0.4, 1.0, 0.05);                            // tachón y olor que sube
m.nota(Ou + 0.3, 50, 0.06, 3.0); m.nota(Ou + 0.3, 57, 0.05, 3.0); m.nota(Ou + 0.3, 64, 0.04, 3.0); m.nota(Ou + 0.3, 69, 0.035, 3.0);
m.guardar(OUT, 1);
