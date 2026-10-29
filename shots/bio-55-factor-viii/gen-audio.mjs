// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #55 (factor VIII y hemofilia A). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot FactorOcho base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Ca = K.Cascada, Fi = K.Fibrina, Fa = K.Falta, Cr = K.Cromosoma, P = K.Pregunta, Pl = K.Plasma, V = K.Virus,
  Ci = K.Cifra, Ge = K.Gen, H = K.Hamster, A = K.Aprobado, An = K.Anticuerpo, Cie = K.Cierre, O = K.Outro;
const cierreMicro = Cie + 2.3;

// cama: normal → tapada y más grave en el tramo de las infecciones (respeto) → se abre otra vez desde el gen
m.pad(0, Pl, 0.05, [45, 52, 57]);
m.pad(Pl, Ge, 0.045, [41, 48, 53], 0.7);
m.pad(Ge, O + 3.5, 0.05, [45, 52, 57]);

m.gota(G + 0.1, 0.25, 800);                                                   // brota la gota
m.golpe(G + 1.05, 0.25, 120); m.tic(G + 1.1, 0.2, 1800);                       // se pega la curita
m.tic(G + 2.0, 0.2, 2600);                                                    // se tacha «¿la curita?»
m.whoosh(G + 2.6, 0.6, 0.1);                                                  // se abre la Lupa
for (let i = 0; i < 3; i++) m.tic(G + 3.0 + i * 0.2, 0.15, 1400);             // plaquetas que se pegan
for (let i = 0; i < 6; i++) { m.tic(Ca + 0.9 + i * 0.5 + 0.3, 0.3, 1600 + i * 150); m.nota(Ca + 0.9 + i * 0.5 + 0.3, 57 + i * 3, 0.04, 0.4); } // cada ficha cae
m.sube(Fi + 0.9, 2.2, 52, 64, 0.04);                                          // se teje la red
for (let i = 0; i < 5; i++) m.cruje(Fi + 1.0 + i * 0.45, 0.2);                // hilos que se tensan
for (let i = 0; i < 3; i++) m.tic(Fa + 0.3 + i * 0.4 + 0.3, 0.3, 1600 + i * 150); // caen tres fichas…
m.golpe(Fa + 1.5, 0.3, 70);                                                   // …y la fila se detiene
m.nota(Cr + 0.8, 64, 0.06, 0.6); m.nota(Cr + 2.0, 69, 0.06, 0.6);             // se marcan las bandas Xq28
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                           // pregunta
for (let i = 0; i < 12; i++) m.burbuja(Pl + 0.1 + i * 0.22 + 0.6, 0.1, 400 + (i % 4) * 80); // bolsas que caen al tanque
for (let i = 0; i < 5; i++) m.zumbido(V + 0.5 + i * 0.25, 0.5, 0.025, 150 + i * 10);       // aparecen los virus
for (let i = 0; i < 10; i++) m.tic(Ci + 0.2 + i * 0.06, 0.1, 1200);            // aparecen las 10 personas
for (let i = 0; i < 7; i++) m.nota(Ci + 1.4 + i * 0.18, 45, 0.05, 0.5, 0.5);   // se tiñen 7, grave
m.golpe(Ci + 2.6, 0.22, 60);                                                  // «7 de 10»
m.golpe(Ge + 0.2, 0.3, 80);                                                   // tarjeta 1984
for (let i = 0; i < 22; i++) m.tic(Ge + 2.1 + i * 0.1, 0.06, 2000 + i * 40);   // contador de letras
for (let i = 0; i < 6; i++) m.burbuja(H + 1.8 + i * 0.4, 0.12, 600);          // caldo del cultivo
for (let i = 0; i < 4; i++) m.nota(H + 2.4 + i * 0.45, 69 + i * 2, 0.04, 0.4); // salen las fichas VIII
m.whoosh(A + 0.2, 0.6, 0.06); m.golpe(A + 1.3, 0.4, 70);                      // entra el frasco · sello FDA
m.whoosh(An + 0.4, 1.0, 0.06);                                                // llega el anticuerpo
m.metal(An + 2.4, 0.16, 900);                                                 // junta IXa y X
m.tic(An + 2.8, 0.3, 1800); m.sube(An + 2.9, 0.8, 57, 64, 0.04);              // la cadena sigue
m.metal(Cie + 0.8, 0.14, 1100);                                               // la VIII entra a su hueco
for (let i = 0; i < 6; i++) m.tic(Cie + 0.9 + i * 0.18 + 0.3, 0.25, 1600 + i * 150);
m.sube(Cie + 1.5, 0.8, 57, 69, 0.04);                                         // brilla la red
m.whoosh(cierreMicro, 0.6, 0.06); m.tic(cierreMicro + 0.5, 0.2, 2200);        // de vuelta al dedo · se despega la curita
m.nota(O + 0.3, 57, 0.08, 2.8); m.nota(O + 0.3, 64, 0.06, 2.8); m.nota(O + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
