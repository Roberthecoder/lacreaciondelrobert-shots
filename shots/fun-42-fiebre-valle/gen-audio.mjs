// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #42 (fiebre del valle, Coccidioides). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fiebre Valle base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 42);
const K = m.K;
const G = K.Gancho, Su = K.Suelo, Es = K.Esporas, V = K.Viento, P = K.Pregunta, Ef = K.Esferula, En = K.Endosporas, D = K.Dimorfo, Et = K.Estudio, Ca = K.Casos, Cl = K.Calma, Si = K.Sintomas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.25);                                  // cama grave y seca, como viento del desierto
m.whoosh(G + 0.1, 1.4, 0.18); m.whoosh(G + 1.4, 1.2, 0.12);                    // ráfaga: se levanta el remolino
m.sube(G + 1.2, 0.6, 64, 76, 0.04);                                            // se abre la lupa
for (let i = 0; i < 3; i++) m.tic(G + 1.8 + i * 0.25, 0.14, 2200);              // aparecen las esporas
m.nota(Su + 0.8, 57, 0.05, 1.4); m.nota(Su + 1.4, 60, 0.04, 1.2);               // se pinta la zona seca
m.golpe(Su + 1.8, 0.3, 110);                                                   // cae el pin en Sonora
for (let i = 0; i < 4; i++) m.gota(Es + 0.6 + i * 0.4, 0.12, 700 - i * 60);     // se evapora el agua
for (let i = 0; i < 10; i++) m.tic(Es + 1.0 + i * 0.16, 0.1, 1600 + (i % 3) * 300); // los hilos se parten
m.cruje(Es + 2.9, 0.4);                                                        // los barrilitos se sueltan
m.motor(V, 3.2, 0.07); m.whoosh(V + 0.3, 1.6, 0.14);                           // retroexcavadora y viento
m.whoosh(V + 1.9, 0.9, 0.1);                                                   // inhalación
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // re-gancho
m.sube(Ef + 0.4, 2.8, 40, 52, 0.05);                                           // la espora se hincha
for (let i = 0; i < 12; i++) m.burbuja(En + 0.2 + i * 0.17, 0.06, 420 + i * 25); // se llena de endosporas
m.golpe(En + 2.5, 0.45, 90); m.cruje(En + 2.55, 0.35);                          // ¡revienta!
for (let i = 0; i < 5; i++) m.gota(En + 3.2 + i * 0.15, 0.1, 1100 + i * 80);    // nuevas esferas
m.nota(D + 0.3, 55, 0.05, 1.0); m.nota(D + 0.8, 62, 0.05, 1.0);                // dos vidas
m.golpe(Et + 0.1, 0.5, 50); m.zumbido(Et + 0.1, 1.9, 0.05, 45);                 // terremoto
m.cruje(Et + 1.0, 0.6); m.whoosh(Et + 1.6, 2.0, 0.16);                          // deslave y nube de polvo
for (let i = 0; i < 24; i++) m.tic(Ca + 0.5 + i * 0.1, 0.06, 2400);             // los 203 casos se encienden
m.golpe(Ca + 2.6, 0.25, 120);
for (let i = 0; i < 10; i++) m.nota(Cl + 0.3 + i * 0.1, i < 6 ? 69 : 64, 0.035, 0.3); // 6 tranquilos, 4 con síntomas
m.whoosh(Si + 0.4, 0.4, 0.12); m.nota(Si + 0.8, 76, 0.04, 0.8); m.tic(Si + 1.2, 0.1, 900); // tos, fiebre, batería baja
m.golpe(Si + 3.0, 0.3, 80);                                                    // tache: no se contagia
for (let i = 0; i < 2; i++) m.golpe(Si + 4.4 + i * 0.18, 0.18, 260);            // guau corto del perro
m.whoosh(C + 0.3, 1.8, 0.14); m.nota(C + 1.4, 69, 0.05, 1.2);                   // el mismo remolino, ahora con esporas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
