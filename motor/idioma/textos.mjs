// textos.mjs — saca TODOS los textos que aparecen en pantalla en un shot (para traducirlo a otro idioma).
// Uso: node motor/idioma/textos.mjs <carpeta-del-shot> <archivo.dc.html> <salida.json> [--paso 0.1]
// Recorre el video entero cuadro por cuadro (sin grabar) y anota cada texto visible y en qué componente salió.
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NM = path.join(HERE, '..', 'node_modules');
const args = process.argv.slice(2);
const [dir, page, out] = args;
const PASO = +(args[args.indexOf('--paso') + 1] || 0) || 0.1;
if (!out) { console.error('Uso: node textos.mjs <carpeta> <archivo.dc.html> <salida.json>'); process.exit(1); }

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.jsx': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(path.resolve(dir), decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(path.resolve(dir)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined });
const p = await (await browser.newContext({ viewport: { width: 1080, height: 1990 } })).newPage();
await p.route(/unpkg\.com/, (r) => {
  const u = r.request().url();
  const f = u.includes('react-dom') ? 'react-dom/umd/react-dom.production.min.js' : u.includes('babel') ? '@babel/standalone/babel.min.js' : 'react/umd/react.production.min.js';
  r.fulfill({ path: path.join(NM, f), contentType: 'application/javascript' });
});
await p.addInitScript({ content: `window.__IDIOMA_MODO='recolectar';\n` + fs.readFileSync(path.join(HERE, 'gancho.js'), 'utf8') });
p.on('pageerror', (e) => console.error('[página]', e.message));
await p.goto(`http://localhost:${server.address().port}/${encodeURIComponent(page)}`);
const SEL = '[data-om-exportable-video-with-duration-secs]';
await p.waitForSelector(SEL, { timeout: 60000 });
await p.waitForTimeout(1500);
const dur = await p.evaluate((SEL) => +document.querySelector(SEL).getAttribute('data-om-exportable-video-with-duration-secs'), SEL);
for (let t = 0; t <= dur; t += PASO) {
  await p.evaluate(({ SEL, t }) => document.querySelector(SEL).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } })), { SEL, t });
}
const textos = await p.evaluate(() => Object.fromEntries(Object.entries(window.__TEXTOS).map(([k, v]) => [k, [...v]])));
fs.writeFileSync(out, JSON.stringify(textos, null, 1));
console.log(`${Object.keys(textos).length} textos distintos en ${dur.toFixed(1)} s → ${out}`);
await browser.close(); server.close();
