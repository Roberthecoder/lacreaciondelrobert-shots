// ficha.mjs: lee narracion.json de un shot y deja sus datos listos para los workflows.
// Uso: node ficha.mjs <carpeta-del-shot> [--salidas archivo]   (si se da --salidas, escribe clave=valor en ese archivo, p. ej. $GITHUB_OUTPUT)
// Campos que lee de narracion.json (los dos primeros ya existían; los demás los agrega el procedimiento de AUTONOMO.md):
//   dcHtml      .dc.html base de la versión narrada (escenas con duración estimada)
//   salida      .dc.html narrado que genera narrar.mjs
//   sinVoz      .dc.html de la versión sin voz (si falta, se usa dcHtml)
//   sinVozAudio pista de audio de la sin voz, relativa a la carpeta (si falta: assets/mezcla.wav)
//   titulo      título del shot para Telegram y el Release (si falta: nombre de la carpeta)
//   numero      número de serie (si falta: los dígitos iniciales de la carpeta)
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dir = path.resolve(args[0] || '.');
const i = args.indexOf('--salidas');
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'narracion.json'), 'utf8'));
const carpeta = path.basename(dir);
const ficha = {
  carpeta,
  numero: String(cfg.numero || (carpeta.match(/^\d+/) || ['000'])[0]).padStart(3, '0'),
  titulo: cfg.titulo || carpeta,
  narradaBase: cfg.dcHtml,
  narradaSalida: cfg.salida,
  sinVoz: cfg.sinVoz || cfg.dcHtml,
  sinVozAudio: cfg.sinVozAudio || 'assets/mezcla.wav',
  // guion resumido: primeras tres líneas y la última, en texto plano
  guion: (() => { const l = (cfg.lineas || []).map((x) => x.texto.trim()); return l.length <= 4 ? l.join(' ') : `${l.slice(0, 3).join(' ')} (...) ${l.at(-1)}`; })(),
  caracteres: (cfg.lineas || []).map((x) => x.texto.trim()).join(' ').length,
  palabras: (cfg.lineas || []).map((x) => x.texto.trim()).join(' ').split(/\s+/).filter(Boolean).length,
};
for (const f of ['narradaBase', 'sinVoz']) if (!fs.existsSync(path.join(dir, ficha[f]))) console.error(`Aviso: no existe ${ficha[f]} en ${carpeta}`);
if (i >= 0) {
  const out = Object.entries(ficha).map(([k, v]) => `${k}=${String(v).replace(/\r?\n/g, ' ')}`).join('\n') + '\n';
  fs.appendFileSync(args[i + 1], out);
}
console.log(JSON.stringify(ficha, null, 2));
