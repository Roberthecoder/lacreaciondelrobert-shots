// preview.mjs — hoja de contactos de un shot: capturas en varios segundos, unidas en una sola imagen.
// Uso: node preview.mjs <carpeta> <archivo.dc.html> <salida.png> <t1,t2,...> [--cols 4] [--ancho 270]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NM = path.join(HERE, 'node_modules');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const [dir, page, out, ts] = args;
const times = ts.split(',').map(Number);
const COLS = +opt('cols', 4), TW = +opt('ancho', 270);

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.jsx': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.mp4': 'video/mp4' };
const root = path.resolve(dir);
const server = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);

const browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined });
const p = await browser.newPage({ viewport: { width: 1080, height: 1990 } });
await p.route(/unpkg\.com/, (r) => {
  const u = r.request().url();
  const f = u.includes('react-dom') ? 'react-dom/umd/react-dom.production.min.js' : u.includes('babel') ? '@babel/standalone/babel.min.js' : 'react/umd/react.production.min.js';
  r.fulfill({ path: path.join(NM, f), contentType: 'application/javascript' });
});
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => { if (m.type() === 'error' || /FAIL|rror/.test(m.text())) errs.push(m.text().slice(0, 600)); });
await p.goto(`http://localhost:${server.address().port}/${encodeURIComponent(page)}`);
const SEL = '[data-om-exportable-video-with-duration-secs]';
try { await p.waitForSelector(SEL, { timeout: 30000 }); } catch { console.error('No cargó el escenario. Errores:\n' + errs.join('\n')); process.exit(1); }
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);
// Largos horizontales: el .dc.html define window.K_ANCHO / K_ALTO.
const [W, H] = await p.evaluate(() => [+window.K_ANCHO || 1080, +window.K_ALTO || 1920]);
if (W !== 1080 || H !== 1920) { await p.setViewportSize({ width: W, height: H + 70 }); await p.waitForTimeout(800); }
const clip = await p.evaluate((SEL) => { const r = document.querySelector(SEL).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, SEL);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'prev-'));
for (const [i, t] of times.entries()) {
  await p.evaluate(({ SEL, t }) => document.querySelector(SEL).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } })), { SEL, t });
  await p.waitForTimeout(60);
  await p.screenshot({ path: path.join(tmp, `f${String(i).padStart(3, '0')}.png`), clip });
}
await browser.close(); server.close();
if (errs.length) console.error('Errores de página:\n' + [...new Set(errs)].join('\n'));
const rows = Math.ceil(times.length / COLS);
// En Windows ffmpeg no trae configuración de fuentes: se le indica Arial directamente.
const FUENTE = process.platform === 'win32' ? "fontfile='C\\:/Windows/Fonts/arial.ttf':" : '';
await new Promise((res) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(tmp, 'f%03d.png'),
  '-vf', `scale=${TW}:-1,drawtext=${FUENTE}text='%{eif\\:n\\:d}':x=8:y=8:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.6,tile=${COLS}x${rows}:padding=4`, '-frames:v', '1', out], { stdio: 'inherit' }).on('close', res));
console.log('Listo:', out, '· tiempos:', times.join(', '));
