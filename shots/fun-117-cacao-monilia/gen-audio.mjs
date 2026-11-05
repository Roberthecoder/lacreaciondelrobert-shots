// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #117 (moniliasis del cacao). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua que cambia de acorde con cada idea (la menor → fa → do → mi, con las voces moviéndose a la nota
// más cercana), oscura mientras el hongo avanza escondido y más abierta en el manejo; un motivo de 4 notas tipo "copo" (la escarcha)
// que regresa transformado: en el gancho, en la escarcha, en el número y al final, siempre con otro final de frase.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cacao base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 117);
const K = m.K;
const G = K.Gancho, H = K.Hongo, En = K.Entra, Es = K.Escondido, Se = K.Semillas, M = K.Mancha, Ex = K.Escarcha,
  Q = K.Pregunta, N = K.Numero, St = K.Estudio, Ma = K.Manejo, C = K.Cierre, Ou = K.Outro;

// cama: acordes con conducción de voces (graves, sin golpe; siempre debajo de la voz)
m.pad(0, H + 0.3, 0.05, [45, 52, 57, 60]);                 // la menor: la mazorca "nevada"
m.pad(H, En + 0.3, 0.05, [41, 53, 57, 60]);                // fa: el hongo y su planta
m.pad(En, Se + 0.3, 0.045, [40, 52, 55, 59], 0.3);         // mi menor, tapado: entra y se esconde
m.pad(Se, M + 0.3, 0.05, [41, 53, 56, 60], 0.35);          // fa con la bemol: se pudren las semillas
m.pad(M, Q + 0.3, 0.05, [40, 52, 56, 59], 0.2);            // mi mayor: tensión, sale la mancha y la felpa
m.pad(Q, St + 0.3, 0.05, [45, 52, 57, 60]);                // regreso a la menor en la pregunta
m.pad(St, Ma + 0.3, 0.045, [38, 50, 57, 62]);              // re menor: el estudio
m.pad(Ma, C + 0.3, 0.05, [43, 50, 55, 59]);                // sol mayor: el manejo, más abierto
m.pad(C, Ou + 0.3, 0.05, [41, 48, 57, 60]);                // fa → 
m.pad(Ou, Ou + 3.6, 0.05, [45, 52, 57, 64]);               // la menor con quinta arriba: cierre

// motivo "copo" (4 notas) y sus variaciones
const copo = (t, notas, g = 0.045, paso = 0.32) => notas.forEach((n, i) => m.nota(t + i * paso, n, g * (1 - i * 0.12), 1.4));
copo(G + 0.15, [76, 72, 69, 71]);                         // pregunta: termina arriba
copo(Ex + 1.9, [76, 72, 69, 64], 0.04, 0.28);             // respuesta: baja a la tónica (al microscopio)
copo(N + 0.1, [81, 76, 72, 74], 0.04, 0.22);              // secuencia una cuarta arriba: "millones"
copo(Ou + 0.3, [76, 72, 69, 69 - 12], 0.05, 0.4);          // cadencia final

// efectos en el mismo cuadro
for (let i = 0; i < 10; i++) m.tic(G + 0.3 + i * 0.42, 0.05, 3400 + (i % 3) * 400);   // copos/esporas que caen
m.whoosh(G + 0.5, 2.5, 0.06);                                                     // la nube que suelta la mazorca
m.golpe(G + 2.0, 0.25, 90);                                                       // se tacha "¿nieve?"
for (let i = 0; i < 3; i++) m.metal(H + 2.6 + i * 0.2, 0.07, 1400 + i * 200);     // círculos en los frutos
m.whoosh(En + 0.2, 1.1, 0.07); m.gota(En + 1.3, 0.18, 800);                        // cae la espora y aterriza
m.sube(En + 1.4, 1.0, 52, 59, 0.035);                                             // el tubito entra
m.whoosh(Es + 0.4, 0.6, 0.07); m.nota(Es + 0.7, 64, 0.04, 0.9, 0.6);               // se abre la lupa
for (let i = 0; i < 6; i++) m.tic(Es + 1.0 + i * 0.5, 0.05, 1800);                  // hifas que avanzan
m.cruje(Se + 0.5, 0.35); m.cruje(Se + 1.6, 0.3);                                   // se pudren las semillas
m.sube(M + 0.3, 2.4, 52, 45, 0.03);                                               // la mancha se extiende
m.golpe(M + 1.2, 0.2, 70);                                                        // «chocolate»
for (let i = 0; i < 8; i++) m.tic(Ex + 0.2 + i * 0.18, 0.04, 4200);                  // brota la felpa
for (let i = 0; i < 12; i++) m.burbuja(Ex + 2.0 + i * 0.16, 0.05, 600 + (i % 4) * 120); // cada espora de la cadena
m.sube(Q + 0.1, 1.4, 57, 64, 0.04);                                               // ¿cuántas?
m.golpe(N + 0.05, 0.35, 75); m.whoosh(N + 0.6, 2.8, 0.14);                          // MILLONES y el viento
m.golpe(St + 0.4, 0.25, 85); m.golpe(St + 0.7, 0.22, 95);                          // puntos en el mapa
m.whoosh(St + 2.9, 0.5, 0.08); m.golpe(St + 3.0, 0.3, 80);                         // tarjeta del estudio
for (let i = 0; i < 12; i++) m.tic(St + 7.7 + i * 0.1, 0.05, 1500 + i * 60);         // sube el 75.8 %
m.metal(Ma + 0.85, 0.12, 2600); m.whoosh(Ma + 1.0, 0.7, 0.08); m.golpe(Ma + 1.6, 0.2, 70); // corte y cae la mazorca
for (let i = 0; i < 4; i++) m.metal(Ma + 0.8 + i * 0.45, 0.06, 3000);               // cada semana
m.nota(Ma + 4.4, 67, 0.04, 1.2); m.nota(Ma + 4.6, 71, 0.035, 1.2);                  // variedades tolerantes
m.whoosh(C + 0.4, 3.5, 0.08); m.golpe(C + 2.5, 0.15, 110);                          // esporas al viento; la tableta
m.guardar(OUT, 1);
