// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #38 (kombucha). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Kombucha base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 38);
const K = m.K;
const G = K.Gancho, Te = K.Te, Le = K.Levaduras, Ac = K.Acido, Hi = K.Hilos, Ce = K.Celulosa, Ca = K.Capa, P = K.Pregunta, An = K.Animales, Es = K.Estudio, Re = K.Resultado, Al = K.Alcohol, C = K.Cierre, Ou = K.Outro;
const MALLA = Ca + 2.2;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                  // cama grave, cálida
for (let i = 0; i < 6; i++) m.burbuja(G + 0.1 + i * 0.5, 0.05, 420 + (i % 3) * 70); // burbujeo de fermentación
m.whoosh(G + 0.2, 1.0, 0.1); m.metal(G + 0.2, 0.1, 1800);                    // las pinzas levantan la madre
for (let i = 0; i < 4; i++) m.gota(G + 1.4 + i * 0.35, 0.18, 800 + i * 90);  // gotea
m.cruje(G + 1.8, 0.25);                                                      // "¿un hongo?" tachado
m.gota(Te + 0.5, 0.25, 600);                                                 // cae la bolsita de té
for (let i = 0; i < 3; i++) m.gota(Te + 0.8 + i * 0.25, 0.2, 1000 + i * 120); // caen los cubos de azúcar
m.whoosh(Le - 0.3, 0.7, 0.1);                                                // al microscopio
for (let i = 0; i < 3; i++) m.nota(Le + i * 0.25, 64 + i * 3, 0.04, 0.5);   // aparecen las levaduras
for (let i = 0; i < 3; i++) m.tic(Le + 2.0 + i * 0.3, 0.15, 1400);          // se parte el azúcar
for (let i = 0; i < 7; i++) m.burbuja(Le + 2.6 + i * 0.22, 0.09, 380 + i * 30); // alcohol y CO2
for (let i = 0; i < 6; i++) m.tic(Ac + 1.3 + i * 0.25, 0.1, 2200);          // las bacterias sueltan ácido
m.sube(Ac + 1.9, 1.7, 60, 50, 0.04);                                         // el pH baja
m.sube(Hi + 1.2, 3.0, 50, 62, 0.04);                                         // se estira la fibra
m.nota(Hi + 0.4, 69, 0.05, 0.8);
for (let i = 0; i < 7; i++) m.nota(Ce + i * 0.14, 72 + (i % 3) * 2, 0.035, 0.3); // anillos de glucosa
m.nota(Ce + 0.8, 76, 0.04, 0.6); m.nota(Ce + 1.2, 79, 0.04, 0.6);          // papel, algodón
for (let i = 0; i < 8; i++) m.tic(Ca + i * 0.2, 0.07, 1100 + i * 60);       // las fibras se enredan
m.whoosh(MALLA - 0.2, 0.8, 0.1);                                             // regreso al frasco
m.sube(MALLA + 0.2, 1.5, 45, 50, 0.04);                                      // la capa crece
m.golpe(P + 0.05, 0.4, 75); m.sube(P + 0.1, 1.5, 52, 64, 0.05);              // ¿te cura?
m.nota(An + 0.4, 67, 0.05, 0.4); m.nota(An + 1.0, 69, 0.05, 0.4);          // ratón, tubo
m.nota(An + 1.8, 60, 0.05, 0.6, 0.6); m.golpe(An + 2.4, 0.25, 90);           // persona: ¿?
m.golpe(Es + 0.2, 0.35, 80);                                                 // tarjeta del estudio
m.gota(Es + 1.8, 0.2, 700); m.gota(Es + 2.3, 0.2, 650);                      // vaso de kombucha y de placebo
m.sube(Re + 0.9, 1.3, 57, 50, 0.04);                                         // las barras bajan
m.zumbido(Re + 2.4, 0.5, 0.03, 160);                                         // diferencia no significativa
for (let i = 0; i < 7; i++) m.tic(Re + 2.6 + i * 0.12, 0.09, 1500);         // 7 personas
m.golpe(Re + 4.4, 0.45, 70);                                                 // sello PISTA, NO PRUEBA
m.golpe(Al + 0.0, 0.3, 90); m.metal(Al + 0.3, 0.12, 1300);                  // la botella y el 1.5 %
m.whoosh(C + 0.1, 0.9, 0.1); for (let i = 0; i < 3; i++) m.gota(C + 0.6 + i * 0.3, 0.15, 850);
m.nota(C + 1.0, 69, 0.06, 1.2); m.nota(C + 1.6, 72, 0.05, 1.0);            // la lupa: tela viva
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
