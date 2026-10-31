// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #56 (mucormicosis). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mucormicosis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
const G = K.Gancho, Ap = K.Apodo, Mu = K.Mucorales, Es = K.Esporas, Hi = K.Hifas, V = K.Vasos, P = K.Pregunta, E = K.Estudio, Co = K.Cosmic, Fe = K.Hierro, Ma = K.Mal_uso, Cn = K.Contagio, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53], 0.25);                                  // cama grave, seria y quieta
m.whoosh(G + 0.2, 0.6, 0.12); m.golpe(G + 0.9, 0.3, 75);                         // aparece la mancha y la flecha
m.cruje(G + 1.4, 0.3);                                                            // se tacha "¿el hongo?"
m.whoosh(Ap, 0.5, 0.1); m.golpe(Ap + 1.0, 0.45, 70);                              // titular y sello APODO
m.sube(Ap + 2.0, 1.6, 57, 64, 0.03);                                              // la hifa transparente cruza el tejido
m.cruje(Mu + 0.1, 0.25);                                                          // hojas podridas
for (let i = 0; i < 6; i++) m.gota(Mu + 1.6 + i * 0.18, 0.12, 700 + i * 60); // brotan los esporangios
for (let i = 0; i < 8; i++) m.tic(Es + 0.2 + i * 0.2, 0.08, 3000 - i * 120);     // esporas que flotan
m.whoosh(Es + 1.8, 0.7, 0.1); m.burbuja(Es + 3.6, 0.15, 260);                     // lupa · el macrófago la traga
m.nota(Es + 2.6, 52, 0.05, 0.6); m.nota(Es + 3.4, 50, 0.05, 0.6);               // defensas bajas · diabetes
m.sube(Hi + 0.3, 2.4, 45, 52, 0.04); m.cruje(Hi + 1.4, 0.15); m.cruje(Hi + 1.9, 0.15); // la hifa crece y se ramifica
for (let i = 0; i < 4; i++) m.latido(V + 0.1 + i * 0.6, 0.18 - i * 0.03);        // la sangre corre…
m.golpe(V + 1.6, 0.4, 60);                                                        // …el coágulo la tapa
m.sube(V + 2.6, 2.2, 50, 41, 0.04);                                               // el tejido muere (baja)
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                               // re-gancho
m.golpe(E + 0.2, 0.3, 80); m.nota(E + 1.0, 55, 0.06, 0.9); m.nota(E + 1.7, 62, 0.07, 1.0); // barras 112 → 231
for (let i = 0; i < 16; i++) m.tic(Co + 0.8 + i * 0.11, 0.07, 1600);           // se pintan 78 personitas
for (let i = 0; i < 16; i++) m.tic(Co + 3.8 + i * 0.1, 0.07, 1300);            // se pintan 87
for (let i = 0; i < 10; i++) m.burbuja(Fe + 0.3 + i * 0.1, 0.06, 600);          // azúcar
m.metal(Fe + 1.7, 0.12, 1800); for (let i = 0; i < 5; i++) m.gota(Fe + 2.4 + i * 0.2, 0.12, 1200); // se suelta el hierro
m.whoosh(Ma + 0.3, 0.5, 0.08); m.nota(Ma + 1.0, 57, 0.05, 0.8);
m.whoosh(Cn + 0.3, 0.6, 0.1); m.golpe(Cn + 1.0, 0.35, 90);                         // la flecha y el tache
m.whoosh(C + 0.5, 0.7, 0.1); m.golpe(C + 1.0, 0.25, 60); m.nota(C + 1.4, 57, 0.06, 1.2);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
