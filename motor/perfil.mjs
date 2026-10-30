// perfil.mjs — mide cuánto tarda cada cuadro (seek + captura) y qué efecto lo hace lento.
// Uso: NAVEGADOR=chrome node perfil.mjs <carpeta> <archivo.dc.html> t1,t2,... --horizontal
// Prueba varias "recetas" de CSS que apagan efectos (desenfoque, mezclas, grano, texturas) y compara.
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NM = path.join(HERE, 'node_modules');
const args = process.argv.slice(2);
const HOR = args.includes('--horizontal');
const VW = HOR ? 1920 : 1080, VH = HOR ? 1080 : 1920;
const [dir, page, ts] = args;
const times = ts.split(',').map(Number);
const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.jsx': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const root = path.resolve(dir);
const server = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined, args: (process.env.CHROME_ARGS || '').split(' ').filter(Boolean) });
const p = await browser.newPage({ viewport: { width: VW, height: VH + 70 } });
await p.route(/unpkg\.com/, (r) => {
  const u = r.request().url();
  const f = u.includes('react-dom') ? 'react-dom/umd/react-dom.production.min.js' : u.includes('babel') ? '@babel/standalone/babel.min.js' : 'react/umd/react.production.min.js';
  r.fulfill({ path: path.join(NM, f), contentType: 'application/javascript' });
});
await p.goto(`http://localhost:${server.address().port}/${encodeURIComponent(page)}`);
const SEL = '[data-om-exportable-video-with-duration-secs]';
await p.waitForSelector(SEL, { timeout: 120000 });
await p.evaluate(() => window.__precarga || null);
await p.waitForTimeout(800);
const clip = await p.evaluate((SEL) => { const r = document.querySelector(SEL).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, SEL);
const recetas = {
  base: '',
  base2: '',
  sin_desenfoque: '[filter]{filter:none !important}',
  sin_halos: '[fill^="url(#c-ha"],[fill^="url(#c-bk"]{display:none !important}',
  sin_papel: '[fill="url(#c-papel-a)"]{display:none !important}',
  sin_texturas: '[fill^="url(#c-madera"],[fill="url(#c-tierra)"],[fill="url(#c-aserrin)"]{fill:#8a6a4a !important}',
  sin_css: '*{filter:none !important; box-shadow:none !important; text-shadow:none !important}',
};
for (const [nom, css] of Object.entries(recetas)) {
  await p.evaluate((css) => { let s = document.getElementById('perfil-css'); if (!s) { s = document.createElement('style'); s.id = 'perfil-css'; document.head.appendChild(s); } s.textContent = css; }, css);
  const res = [];
  for (const t of times) {
    const t0 = Date.now();
    await p.evaluate(({ SEL, t }) => document.querySelector(SEL).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } })), { SEL, t });
    const t1 = Date.now();
    await p.screenshot({ type: 'jpeg', quality: 93, clip });
    res.push([t1 - t0, Date.now() - t1]);
  }
  console.log(nom.padEnd(16), res.map(([a, b]) => `${a}+${b}`).join('  '), ' total ms:', res.reduce((s, [a, b]) => s + a + b, 0));
}
await browser.close(); server.close();
