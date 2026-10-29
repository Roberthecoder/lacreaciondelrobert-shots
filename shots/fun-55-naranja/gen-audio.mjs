// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #55 (moho verde de la naranja). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Naranja base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, H = K.Herida, A = K.Aceite, E = K.Enzimas, P = K.Pelusa, Az = K.Azul, Q = K.Pregunta, Em = K.Empacadora, Ce = K.Cera,
  Es = K.Estudio, B = K.Bano, Ai = K.Aire, C = K.Cierre, Ou = K.Outro;

m.pad(0, Em, 0.05, [45, 52, 57], 0.25);                                       // tensa mientras el hongo avanza
m.pad(Em, Ou + 3.5, 0.045, [45, 52, 57, 64], 0);                              // más ligera en la empacadora
m.tic(G + 0.4, 0.2, 1200); m.whoosh(G + 0.4, 0.9, 0.12);                      // el dedo toca: "puf" de esporas
m.whoosh(G + 1.4, 1.6, 0.06); m.nota(G + 2.4, 64, 0.05, 0.8);                 // zoom y lupa
m.whoosh(H, 0.5, 0.1); m.golpe(H + 0.6, 0.45, 80); m.cruje(H + 0.65, 0.25);   // cae y se raspa
m.sube(H + 1.6, 0.8, 52, 45, 0.04);                                           // se abre la herida en el corte
for (let i = 0; i < 6; i++) m.gota(A + 0.3 + i * 0.25, 0.14, 700 + i * 60);    // sale el aceite
for (let i = 0; i < 5; i++) m.tic(A + 1.0 + i * 0.12, 0.08, 3000);             // azúcares
m.whoosh(A + 1.2, 1.0, 0.08); m.burbuja(A + 2.2, 0.15, 400); m.sube(A + 2.2, 1.4, 57, 64, 0.04); // la espora cae y germina
m.sube(E + 0.4, 1.4, 57, 50, 0.04);                                           // baja el pH
for (let i = 0; i < 8; i++) m.tic(E + 1.0 + i * 0.4, 0.1, 2200 + (i % 3) * 300); // tijeritas
m.cruje(E + 1.6, 0.4); m.cruje(E + 3.0, 0.4);                                  // se deshacen las paredes
m.nota(P + 1.2, 69, 0.05, 1.0); m.nota(P + 2.2, 64, 0.05, 1.0);                // pelusa y polvo
m.whoosh(P + 2.4, 0.6, 0.08); for (let i = 0; i < 6; i++) m.tic(P + 2.8 + i * 0.2, 0.07, 2600); // cadenas de esporas
m.nota(Az + 0.3, 62, 0.05, 0.8); m.nota(Az + 0.6, 66, 0.05, 0.8);
m.metal(Az + 1.6, 0.12, 2400); m.zumbido(Az + 1.6, 1.4, 0.03, 90);             // frío del refri
m.sube(Az + 2.8, 2.0, 50, 57, 0.04);                                           // el azul brinca a la de junto
m.sube(Q + 0.1, 1.5, 52, 64, 0.05); m.metal(Q + 0.4, 0.1, 3200);              // ¿por qué brillan?
m.motor(Em, Ce - Em, 0.06);                                                   // la banda
for (let i = 0; i < 6; i++) m.burbuja(Em + 0.4 + i * 0.12, 0.08, 500);         // cepillos con espuma
m.whoosh(Em + 1.6, 0.8, 0.1);                                                 // la mano saca la podrida
for (let i = 0; i < 8; i++) m.gota(Em + 3.0 + i * 0.12, 0.1, 1100);            // regadera de fungicida
m.metal(Ce + 0.2, 0.1, 3600); for (let i = 0; i < 4; i++) m.gota(Ce + 0.4 + i * 0.4, 0.1, 900); // brillo y gotas que rebotan
m.golpe(Es + 0.2, 0.35, 80);                                                  // tarjeta del estudio
for (let i = 0; i < 5; i++) m.tic(Es + 1.4 + i * 0.15, 0.1, 1500);             // las naranjas
for (let i = 0; i < 5; i++) m.tic(Es + 2.4 + i * 0.1, 0.06, 3200);             // esporas encima
for (let i = 0; i < 8; i++) m.tic(B + 0.15 + i * 0.12, 0.06, 2600);            // cuentan las 24 h
m.gota(B + 1.3, 0.3, 500); m.burbuja(B + 1.4, 0.2, 300); m.burbuja(B + 1.6, 0.15, 350); // chapuzón
m.nota(B + 3.4, 72, 0.06, 0.9); m.nota(B + 3.6, 76, 0.05, 0.9);                // el moho bajó
m.whoosh(Ai + 0.3, 2.5, 0.1); m.whoosh(Ai + 1.0, 2.5, 0.07);                   // esporas en el aire
m.golpe(Ai + 2.6, 0.3, 90);                                                   // ¡sácala!
m.cruje(C + 0.3, 0.25); m.whoosh(C + 2.2, 1.2, 0.1); m.nota(C + 1.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
