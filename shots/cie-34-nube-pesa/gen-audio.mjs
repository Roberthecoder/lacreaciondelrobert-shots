// gen-audio.mjs — cama grave + efectos del Shot Científico #34 (una nube pesa como cien elefantes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nube Pesa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 340);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
// gancho: la báscula marca (aguja + pantalla) y la nube flota
m.whoosh(0.1, 0.7, 0.12); m.sube(0.2, 1.2, 48, 67, 0.06);
for (let i = 0; i < 8; i++) m.tic(0.45 + i * 0.12, 0.12, 2600);
m.metal(1.4, 0.12, 900); m.nota(1.6, 72, 0.05, 0.8);
// agua: se abre la lupa y aparecen las gotitas
m.whoosh(K.Agua + 0.3, 0.6, 0.14);
for (let i = 0; i < 10; i++) m.burbuja(K.Agua + 0.8 + i * 0.25, 0.08, 500 + i * 60);
m.nota(K.Agua + 1.4, 76, 0.05, 0.6); m.nota(K.Agua + 4.4, 69, 0.05, 0.6);
// cuenta: tarjeta del estudio y ≈ 500 t
m.golpe(K.Cuenta + 0.25, 0.3, 110); m.metal(K.Cuenta + 0.35, 0.08, 1200);
for (let i = 0; i < 6; i++) m.gota(K.Cuenta + 3.9 + i * 0.2, 0.12, 800 + i * 50);
m.golpe(K.Cuenta + 5.1, 0.45, 60); m.bajo(K.Cuenta + 5.1, 33, 0.12, 1.2);
// elefantes: cien que aparecen uno tras otro
for (let i = 0; i < 100; i += 4) m.tic(K.Elefantes + 0.3 + i * 0.02, 0.1, 1400 + i * 10);
m.nota(K.Elefantes + 2.4, 79, 0.06, 0.7); m.golpe(K.Elefantes + 2.4, 0.3, 70);
// pregunta
m.whoosh(K.Pregunta, 0.4, 0.14); m.nota(K.Pregunta + 0.2, 74, 0.05, 0.5); m.nota(K.Pregunta + 0.5, 71, 0.05, 0.8);
// gotitas: cae lentísimo, el aire sube
m.gota(K.Gotitas + 0.3, 0.15, 700); m.sube(K.Gotitas + 0.4, 2.4, 64, 60, 0.04);
m.whoosh(K.Gotitas + 2.8, 1.2, 0.12); m.whoosh(K.Gotitas + 4.2, 1.2, 0.08);
// repartida: el cubo se dibuja arista por arista, 1 km por lado
for (let i = 0; i < 12; i++) m.tic(K.Repartida + 0.4 + i * 0.15, 0.12, 1800 + i * 40);
m.golpe(K.Repartida + 2.2, 0.3, 120); m.nota(K.Repartida + 2.2, 76, 0.05, 0.7);
// aire: la balanza se inclina hacia el aire
m.metal(K.Aire + 0.8, 0.12, 600); m.golpe(K.Aire + 1.3, 0.45, 70); m.nota(K.Aire + 2.0, 67, 0.05, 0.7);
// lluvia: ¡plop! ×3, la gota cae, y llueve sobre la ciudad
for (const t of [0.9, 1.9, 2.9]) { m.gota(K.Lluvia + t, 0.25, 600 - t * 80); m.burbuja(K.Lluvia + t + 0.05, 0.1, 300); }
m.whoosh(K.Lluvia + 3.3, 0.9, 0.16);
m.motor(K.Lluvia + 4.4, 3.6, 0.05);
for (let i = 0; i < 30; i++) m.tic(K.Lluvia + 4.6 + i * 0.11, 0.06, 3000 + (i % 5) * 300);
// cierre: la nube del inicio, los elefantes se vuelven pedacitos
m.nota(K.Cierre + 0.6, 72, 0.05, 0.6);
for (let i = 0; i < 12; i++) m.burbuja(K.Cierre + 2.4 + i * 0.15, 0.06, 600 + i * 40);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
