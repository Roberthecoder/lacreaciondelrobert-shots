// gen-audio.mjs — música y efectos del Biotecnológico #03 (CRISPR lo inventaron las bacterias). Sin costo.
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (cama de la narrada base)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>
// · Narrada: cama grave continua sin golpe + efectos en el mismo cuadro.
// · Muda: la fila CRISPR ES la partitura. Cada repetición (todas iguales) suena con la misma nota y cada
//   espaciador con la nota de "su" virus (rosa = do, cian = sol). Cada vez que la fila crece se toca de izquierda
//   a derecha. Durante el ataque la cama suena tapada; cuando Cas corta, se abre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Crispr base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML));
const K = M.K;
const NOTA = { lider: 48, rep: 76, rosa: 72, cian: 79, amarillo: 74 };
// toca la fila: líder, R, (S, R)… (cada paso dura "paso" s)
const fila = (t, esp, paso = 0.22, g = 0.06) => { M.nota(t, NOTA.lider, g * 0.8, 0.5); let k = 1; M.nota(t + paso * k++, NOTA.rep, g * 0.6, 0.3);
  for (const e of esp) { M.campana(t + paso * k++, NOTA[e], g, 0.9); M.nota(t + paso * k++, NOTA.rep, g * 0.6, 0.3); } };
const corte = (t) => { M.tic(t, 0.35, 3800); M.tic(t + 0.03, 0.25, 2600); M.golpe(t + 0.02, 0.22, 140); };
const inyecta = (t) => { M.whoosh(t - 0.6, 0.7, 0.12); M.golpe(t, 0.2, 110); M.ruido(t + 0.1, 0.9, 0.08, 300, 2500); };

if (K.Gancho != null) {
  /* ---------- NARRADA ---------- */
  M.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
  M.whoosh(K.Gancho + 0.1, 0.6, 0.12); M.burbuja(K.Gancho + 0.7, 0.1, 500);                // cuchara
  M.sube(K.Gancho + 1.2, 0.6, 64, 79, 0.05); fila(K.Gancho + 2.3, ['cian', 'amarillo'], 0.15, 0.04);
  [0.3, 0.0, 0.5].forEach((d) => inyecta(K.Ataque + 1.3 + d));
  for (let i = 0; i < 8; i++) M.tic(K.Ataque + 3.6 + i * 0.04, 0.12, 1800 + i * 200); M.golpe(K.Ataque + 3.6, 0.35, 70);
  for (let i = 0; i < 9; i++) M.pop(K.Ataque + 3.8 + i * 0.07, 0.08);
  const L2 = K.Captura + 3.9, L3 = K.Captura + 8.1, C2 = K.Corte + 4.6;
  for (let i = 0; i < 6; i++) M.tic(K.Captura + 0.9 + i * 0.25, 0.1, 1500);                 // recortan el pedazo
  M.whoosh(K.Captura + 2.0, 1.0, 0.1); fila(L2 + 1.5, ['rosa', 'cian', 'amarillo']);        // entra el recuerdo nuevo
  for (let i = 0; i < 3; i++) M.pop(L3 + 0.3 + i * 0.45, 0.12);                               // la galería de virus
  inyecta(K.Pregunta); M.sube(K.Pregunta, 1.4, 55, 67, 0.05);
  M.campana(K.Corte + 0.2, NOTA.rosa, 0.08, 1.2); M.sube(K.Corte + 2.4, C2 - K.Corte - 2.1, 60, 72, 0.04);
  corte(C2 + 0.5);
  M.golpe(K.Estudio + 0.25, 0.35, 80); for (let i = 0; i < 6; i++) M.pop(K.Estudio + 3.6 + i * 0.1, 0.07);
  for (let i = 0; i < 6; i++) M.tic(K.Estudio + 4.5 + i * 0.25, 0.06, 1200);                 // el tubo sin recuerdo se aclara
  M.nota(K.Estudio + 6.2, 72, 0.07, 1.0); M.nota(K.Estudio + 6.2, 79, 0.05, 1.0);
  M.golpe(K.Nobel + 0.25, 0.35, 80); M.campana(K.Nobel + 2.7, 84, 0.07, 2.0); M.campana(K.Nobel + 2.7, 76, 0.05, 2.0);
  M.pop(K.Extra + 0.2, 0.1); M.pop(K.Extra + 0.35, 0.1); M.pop(K.Extra + 0.5, 0.1); M.nota(K.Extra + 1.2, 72, 0.07, 0.8);
  for (let i = 0; i < 4; i++) M.pop(K.Extra + 1.6 + i * 0.12, 0.1); [72, 76, 79].forEach((m, i) => M.nota(K.Extra + 2.8 + i * 0.1, m, 0.05, 0.8));
  M.whoosh(K.Cierre, 0.8, 0.15); fila(K.Cierre + 0.8, ['rosa', 'cian', 'amarillo'], 0.18, 0.05);
  M.nota(K.Outro + 0.3, 57, 0.08, 2.8); M.nota(K.Outro + 0.3, 64, 0.06, 2.8); M.nota(K.Outro + 0.3, 69, 0.05, 2.8);
} else {
  /* ---------- MUDA ---------- */
  const tensa = (a, b) => M.pad(a, b, 0.05, [44, 51], 180), libre = (a, b) => M.pad(a, b, 0.05, [45, 52, 57], 750);
  tensa(0, K.Vuelve + 4.6); libre(K.Vuelve + 4.6, K.Llega2 + 0.4); tensa(K.Llega2 + 0.4, K.Vuelve2 + 3.8); libre(K.Vuelve2 + 3.8, K.Vecina + 3); tensa(K.Vecina + 3, K.Outro + 3.5);
  // ataque 1 (rosa) — el primer cuadro: el fago ya viene bajando
  M.whoosh(0, 0.6, 0.1); inyecta(0.6);
  fila(1.6, [], 0.3, 0.05);                                                                   // la fila vacía: líder + 1 repetición
  // captura 1: recortan y entra el espaciador rosa → se toca la fila
  for (let i = 0; i < 8; i++) M.tic(K.Captura + 0.4 + i * 0.25, 0.1, 1500);
  M.whoosh(K.Captura + 1.6, 1.4, 0.1); fila(K.Captura + 3.8, ['rosa'], 0.3);
  // vuelve el rosa: se ilumina su recuerdo (su nota), Cas busca (nota que sube) y corta
  inyecta(K.Vuelve + 0.2); M.campana(K.Vuelve + 1.2, NOTA.rosa, 0.09, 1.4);
  M.sube(K.Vuelve + 1.6, 3.0, 60, NOTA.rosa, 0.05); corte(K.Vuelve + 4.6);
  // ataque 2 (cian)
  M.whoosh(K.Llega2 - 0.6, 0.6, 0.1); inyecta(K.Llega2 + 0.6);
  for (let i = 0; i < 8; i++) M.tic(K.Captura2 - 0.2 + i * 0.25, 0.1, 1500);
  M.whoosh(K.Captura2 + 0.9, 1.4, 0.1); fila(K.Captura2 + 3.0, ['cian', 'rosa'], 0.3);
  inyecta(K.Vuelve2 + 0.2); M.campana(K.Vuelve2 + 1.0, NOTA.cian, 0.09, 1.4);
  M.sube(K.Vuelve2 + 1.2, 2.6, 67, NOTA.cian, 0.05); corte(K.Vuelve2 + 3.8);
  // memoria: la fila como melodía, dos veces, y acorde
  [K.Memoria + 1.0].forEach((t) => { M.campana(t, NOTA.cian, 0.1, 1.2); M.campana(t + 0.9, NOTA.rosa, 0.1, 1.2); });
  fila(K.Memoria + 3.0, ['cian', 'rosa'], 0.35, 0.07); fila(K.Memoria + 5.2, ['cian', 'rosa'], 0.22, 0.06);
  // la vecina: "esta todavía no" (nota que pregunta) y vuelve a empezar
  M.whoosh(K.Vecina - 0.2, 1.2, 0.12); M.nota(K.Vecina + 1.0, 72, 0.06, 1.0); M.nota(K.Vecina + 3.0, 66, 0.06, 1.2);
  M.whoosh(K.Vecina + 4.2, 1.2, 0.12); M.whoosh(K.Vecina + 9.4, 0.6, 0.1);
  M.nota(K.Outro + 0.3, 57, 0.07, 2.8); M.nota(K.Outro + 0.3, 64, 0.05, 2.8);
}
M.guardar(path.join(HERE, OUT));
