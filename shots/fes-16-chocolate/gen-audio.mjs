// gen-audio.mjs — cama grave + efectos del Shot Festivo #16 · San Valentín · Fungi Mati (sin levaduras no hay chocolate). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chocolate base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 16);
const K = m.K, E = m.ESC;
const G = K.Gancho, Mz = K.Mazorca, Am = K.Amarga, Mo = K.Monton, Le = K.Levadura, Al = K.Alcohol, Ba = K.Bacterias, Ca = K.Calor, P = K.Pregunta, Pi = K.Piezas, Es = K.Estudio, R = K.Resultado, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);                                       // cama grave, cálida y continua
m.whoosh(G + 0.05, 0.4, 0.14); m.golpe(G + 0.1, 0.25, 140);                  // la caja de corazón se abre (pop)
m.sube(G + 0.35, 0.6, 57, 69, 0.05); m.golpe(G + 0.95, 0.18, 200);           // el bombón brinca
m.whoosh(G + 1.8, 0.4, 0.1); for (let i = 0; i < 3; i++) m.nota(G + 2.0 + i * 0.12, E[7 + i], 0.04, 0.5); // aparece la levadura con moñito
m.whoosh(Mz + 0.25, 0.45, 0.2); m.golpe(Mz + 0.7, 0.4, 70); m.cruje(Mz + 0.72, 0.4); // machetazo: se abre la mazorca
for (let i = 0; i < 6; i++) m.nota(Mz + 2.4 + i * 0.14, E[8 + (i % 3)], 0.03, 0.4); // brillitos de azúcar en la pulpa
m.golpe(Am + 0.1, 0.25, 110);                                                // la semilla aparece
m.nota(Am + 1.4, 50, 0.07, 0.9, 0.6); m.nota(Am + 1.45, 51, 0.06, 0.9, 0.6);  // "≠": acorde agrio (amargo)
m.golpe(Am + 1.7, 0.2, 160);                                                 // el bombón
for (let i = 0; i < 10; i++) m.gota(Mo + 0.5 + i * 0.13, 0.12, 350 + (i % 4) * 40); // semillas que caen (plaf húmedo)
for (let i = 0; i < 3; i++) m.whoosh(Mo + 1.7 + i * 0.35, 0.4, 0.12);         // las hojas tapan el montón
for (let i = 0; i < 9; i++) m.tic(Mo + 3.0 + i * 0.18, 0.08, 1500);           // un tic por cada día del calendario
m.sube(Le - 0.3, 0.6, 64, 52, 0.04);                                         // entramos al microscopio
for (let i = 0; i < 7; i++) m.whoosh(Le + 0.2 + i * 0.12, 0.3, 0.05);        // llegan las levaduras
for (let i = 0; i < 16; i++) m.tic(Le + 1.6 + i * 0.2, 0.06, 2600 + (i % 4) * 300); // mordisquitos al azúcar
for (let i = 0; i < 4; i++) m.burbuja(Le + 2.6 + i * 0.5, 0.06, 700);        // brotan las yemas
for (let i = 0; i < 20; i++) m.burbuja(Al + 0.1 + i * 0.08, 0.08, 400 + (i % 5) * 70); // burbujas de CO2
for (let i = 0; i < 7; i++) m.gota(Al + 0.3 + i * 0.1, 0.08, 1100);           // gotitas de alcohol
for (let i = 0; i < 12; i++) m.gota(Al + 1.9 + i * 0.12, 0.12, 600 + (i % 3) * 50); // la pulpa escurre
for (let i = 0; i < 6; i++) m.whoosh(Ba + 0.2 + i * 0.1, 0.25, 0.05);         // llegan las bacterias lácticas
m.nota(Ba + 1.2, 62, 0.05, 0.6); m.nota(Ba + 1.3, 66, 0.04, 0.6);             // ácido láctico
for (let i = 0; i < 5; i++) m.whoosh(Ba + 2.2 + i * 0.1, 0.25, 0.05);         // llegan las acéticas
for (let i = 0; i < 5; i++) m.burbuja(Ba + 3.0 + i * 0.12, 0.1, 300);        // se toman el alcohol
m.nota(Ba + 3.6, 59, 0.05, 0.6, 0.4); m.golpe(Ba + 3.95, 0.18, 180);          // ácido acético · aparece el vinagre
for (let i = 0; i < 10; i++) m.nota(Ca + 0.3 + i * 0.23, E[2 + i], 0.035, 0.5); // el termómetro sube
m.zumbido(Ca + 0.6, 1.8, 0.03, 110);                                          // el montón se calienta (vapor)
for (let i = 0; i < 10; i++) m.gota(Ca + 2.7 + i * 0.05, 0.06, 1400);         // el ácido entra a la semilla
m.sube(Ca + 3.6, 0.7, 60, 45, 0.06);                                          // el germen se apaga
m.sube(P + 0.1, 1.6, 52, 64, 0.05);                                           // re-gancho
for (let i = 0; i < 8; i++) m.metal(Pi + 1.0 + i * 0.13, 0.05, 2200);         // tijeritas: cortan la proteína
for (let i = 0; i < 12; i++) m.tic(Pi + 1.2 + i * 0.08, 0.05, 1800 + i * 80); // cuentas sueltas
m.metal(Pi + 2.4, 0.08, 2600); m.golpe(Pi + 2.45, 0.15, 220);                // el azúcar se parte en dos
m.whoosh(Pi + 4.1, 0.6, 0.12); m.cruje(Pi + 4.5, 0.5); m.zumbido(Pi + 4.5, 2.6, 0.02, 90); // al comal: chisporroteo del tostado
m.nota(Pi + 5.1, 57, 0.05, 1.2); m.nota(Pi + 5.1, 64, 0.04, 1.2);             // sale el aroma
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);                  // tarjeta 2014
m.whoosh(Es + 3.2, 1.2, 0.08);                                               // el atomizador rocía antifúngico
for (let i = 0; i < 4; i++) m.tic(Es + 3.6 + i * 0.3, 0.12, 900);              // las levaduras se tachan
m.golpe(R + 0.1, 0.2, 140); m.golpe(R + 0.5, 0.2, 120);                       // las dos barras
m.nota(R + 0.95, 49, 0.07, 1.0, 0.7); m.nota(R + 1.0, 50, 0.06, 1.0, 0.7);    // "bloop" agrio: más ácido
m.golpe(Da + 0.2, 0.2, 130); m.sube(Da + 1.4, 0.6, 55, 67, 0.05); m.golpe(Da + 1.5, 0.22, 150); // semilla café · semilla morada
m.nota(Da + 2.2, 64, 0.05, 0.8); m.nota(Da + 2.2, 68, 0.04, 0.8);
m.whoosh(Ci + 0.2, 0.6, 0.12); m.sube(Ci + 1.0, 0.8, 57, 69, 0.05);
for (let i = 0; i < 6; i++) m.nota(Ci + 1.6 + i * 0.15, E[7 + i], 0.03, 0.5); // destellos al final
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
