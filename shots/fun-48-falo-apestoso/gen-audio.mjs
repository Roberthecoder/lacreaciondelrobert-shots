// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #48 (falo hediondo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Falo Apestoso base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
const G = K.Gancho, Hu = K.Huevo, So = K.SinOlor, B = K.Brota, Ba = K.Baba, Az = K.Azufre, P = K.Pregunta, En = K.Engano, E = K.Estudio,
  Si = K.Siembra, He = K.Hembras, L = K.Limpio, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53], 0.25);                                  // cama grave, misteriosa
m.zumbido(G, 4.2, 0.05, 210); m.zumbido(G + 0.2, 1.4, 0.04, 260);              // moscas zumbando
m.cruje(G + 2.0, 0.3);                                                        // se tacha el "animal muerto"
m.golpe(Hu + 0.1, 0.35, 90); m.sube(Hu + 0.8, 1.4, 40, 47, 0.04);             // aparece el huevo; crece el cordón
m.nota(Hu + 1.5, 64, 0.05, 0.5);                                              // regla de 6 cm
for (let i = 0; i < 3; i++) m.whoosh(So + 0.1 + i * 0.35, 0.25, 0.12);       // la nariz olfatea
m.nota(So + 0.5, 72, 0.06, 0.8);                                              // ✓ sin olor
m.cruje(B + 0.3, 0.45);                                                       // se raja el huevo
m.sube(B + 1.0, 3.6, 43, 62, 0.06);                                           // el tallo sube (cámara rápida)
for (let i = 0; i < 6; i++) m.tic(B + 1.2 + i * 0.6, 0.1, 1200);             // marcas de la regla
for (let i = 0; i < 8; i++) m.burbuja(Ba + 0.2 + i * 0.3, 0.07, 220 + i * 10); // la baba burbujea
m.whoosh(Ba + 0.6, 0.5, 0.12); m.nota(Ba + 0.9, 69, 0.05, 1.0, 0.4);          // se abre el microscopio
for (let i = 0; i < 3; i++) m.gota(Az + 0.3 + i * 0.7, 0.18, 500 + i * 120);  // salen las moléculas con azufre
m.sube(P + 0.1, 1.5, 50, 62, 0.05);                                           // re-gancho
m.zumbido(En + 0.3, 2.4, 0.06, 230); m.golpe(En + 2.6, 0.3, 120);             // la mosca llega y aterriza
m.nota(En + 2.9, 57, 0.06, 0.6); m.nota(En + 3.1, 53, 0.06, 0.8);             // ¡caíste!
m.golpe(E + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 9; i++) m.gota(E + 3.4 + i * 0.45, 0.12, 700);            // popó con la baba (rápido)
for (let i = 0; i < 3; i++) m.gota(E + 3.6 + i * 1.5, 0.1, 500);             // con estiércol
for (let i = 0; i < 3; i++) m.gota(E + 3.8 + i * 1.9, 0.1, 400);             // con azúcar
m.zumbido(Si, 4.0, 0.05, 220);
for (let i = 0; i < 9; i++) m.gota(Si + 0.9 + i * 0.42, 0.12, 650);           // gotitas que caen al suelo
m.whoosh(Si + 2.0, 0.5, 0.1);                                                 // lupa a la pata
m.golpe(He + 0.7, 0.35, 70); m.metal(He + 0.7, 0.12, 900);                    // la balanza se inclina
m.whoosh(L + 0.3, 1.5, 0.1); m.zumbido(L + 0.8, 1.4, 0.04, 260);              // la baba se va, las moscas se van
for (let i = 0; i < 3; i++) m.tic(Mx + 0.2 + i * 0.2, 0.1, 1600);             // aparece el mapa
m.sube(Mx + 0.8, 1.2, 48, 60, 0.04); m.nota(Mx + 2.0, 76, 0.05, 1.0);         // crece el pariente; se abre el velo
for (let i = 0; i < 4; i++) m.nota(C + 1.2 + i * 0.5, [64, 67, 69, 72][i], 0.06, 0.6); // huevos nuevos
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
