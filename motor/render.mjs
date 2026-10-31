// render.mjs — convierte un shot (.dc.html de Claude Design) en MP4 vertical 1080×1920 (o 16:9 con --horizontal).
// Uso: node render.mjs <carpeta-del-shot> <archivo.dc.html> <salida.mp4> [--fps 30] [--audio mezcla.wav] [--outro cierre.mp4] [--hasta 12.5]
// - React/Babel se sirven en local (no depende de unpkg).
// - Cada cuadro se renderiza por "seek" determinista del motor animations-v3 (como el exportador de Claude Design).
// - El video de cierre se pega con ffmpeg (Chromium headless no decodifica H.264).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NM = path.join(HERE, 'node_modules');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
// --horizontal: video largo 16:9 (1920×1080); sin la bandera, shot vertical 1080×1920.
const HOR = args.includes('--horizontal');
const VW = HOR ? 1920 : 1080, VH = HOR ? 1080 : 1920;
const [dir, page, out] = args;
if (!out) { console.error('Uso: node render.mjs <carpeta> <archivo.dc.html> <salida.mp4> [--fps 30] [--audio x.wav] [--outro x.mp4] [--hasta seg]'); process.exit(1); }
const FPS = +opt('fps', 30);
// --escala 2: dibuja cada cuadro al doble de resolución (p. ej. 3840×2160 en horizontal) para máxima nitidez.
const ESC = +opt('escala', 1);
const OW = VW * ESC, OH = VH * ESC;

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.jsx': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.mp4': 'video/mp4', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(path.resolve(dir), decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(path.resolve(dir)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const port = server.address().port;

// --gpu: usa la tarjeta de video para dibujar (más rápido con desenfoques y degradados grandes).
const GPU = args.includes('--gpu') ? ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--use-angle=d3d11'] : [];
const browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined, args: ['--autoplay-policy=no-user-gesture-required', ...GPU] });
const ctx = await browser.newContext({ viewport: { width: VW, height: VH + 70 } });
const p = await ctx.newPage();
await p.route(/unpkg\.com/, (r) => {
  const u = r.request().url();
  const f = u.includes('react-dom') ? 'react-dom/umd/react-dom.production.min.js'
    : u.includes('babel') ? '@babel/standalone/babel.min.js' : 'react/umd/react.production.min.js';
  r.fulfill({ path: path.join(NM, f), contentType: 'application/javascript' });
});
p.on('pageerror', (e) => console.error('[página]', e.message));
await p.goto(`http://localhost:${port}/${encodeURIComponent(page)}`);
const SEL = '[data-om-exportable-video-with-duration-secs]';
await p.waitForSelector(SEL, { timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
// Videos largos: esperar a que todas las fotos estén descargadas y decodificadas.
await p.evaluate(() => window.__precarga || null);
// Ocultar todo lo que no es parte del video (aviso de audio, paneles, barra).
await p.addStyleTag({ content: '[style*="z-index: 9999"]{display:none!important}' });
await p.waitForTimeout(1500);

const info = await p.evaluate((SEL) => {
  const e = document.querySelector(SEL), r = e.getBoundingClientRect();
  let outro = NaN;
  try { let acc = 0; for (const s of JSON.parse(window.OM_SCENES)) { if (s.name === 'Outro') { outro = acc; break; } acc += s.dur; } } catch {}
  return { dur: +e.getAttribute('data-om-exportable-video-with-duration-secs'), x: r.x, y: r.y, w: r.width, h: r.height, outro };
}, SEL);
const outroFile = opt('outro');
let end = +opt('hasta', 0) || (outroFile && info.outro ? info.outro : info.dur);
const N = Math.round(end * FPS);
// --desde: empezar a mitad del video (para renderizar por tramos).
const I0 = Math.round(+opt('desde', 0) * FPS);
console.log(`Duración ${info.dur}s · render hasta ${end.toFixed(2)}s · ${N} cuadros · escala ${(info.w / VW).toFixed(3)}`);

// Ajustar escala para que el escenario salga exactamente a 1080×1920.
const dpr = VW / info.w;
const clip = { x: info.x, y: info.y, width: info.w, height: info.h };
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setDeviceMetricsOverride', { width: VW, height: VH + 70, deviceScaleFactor: dpr * ESC, mobile: false });

const tmp = out.replace(/\.mp4$/, '') + '.video.mp4';
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-vf', `scale=${OW}:${OH}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', ESC > 1 ? 'veryfast' : 'medium', '-crf', ESC > 1 ? '12' : '18', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });

const t0 = Date.now();
for (let i = I0; i < N; i++) {
  const t = i / FPS;
  await p.evaluate(({ SEL, t }) => {
    document.querySelector(SEL).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } }));
  }, { SEL, t });
  // Si un cuadro se atora, reintentar en vez de perder todo el render.
  let buf;
  for (let k = 0; ; k++) {
    try { buf = await p.screenshot({ type: 'jpeg', quality: 93, clip, timeout: 90000 }); break; }
    catch (e) { if (k >= 3) throw e; console.log(`  cuadro ${i}: reintento ${k + 1}`); await p.waitForTimeout(2000); }
  }
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % (FPS * 5) === 0) console.log(`  ${t.toFixed(1)}s / ${end.toFixed(1)}s  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close(); server.close();

// Ensamblar: video + cierre + audio.
const run = (a) => new Promise((res, rej) => spawn('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: 'inherit' }).on('close', (c) => (c ? rej(new Error('ffmpeg ' + c)) : res())));
const audio = opt('audio');
const inputs = ['-i', tmp], filters = [];
let v = '[0:v]';
if (outroFile) {
  inputs.push('-i', outroFile);
  filters.push(`[1:v]scale=${VW}:${VH}:force_original_aspect_ratio=decrease,pad=${VW}:${VH}:(ow-iw)/2:(oh-ih)/2,fps=${FPS},format=yuv420p,setsar=1[o]`, `[0:v]setsar=1[m]`, `[m][o]concat=n=2:v=1:a=0[v]`);
  v = '[v]';
}
if (audio) inputs.push('-i', audio);
const map = ['-map', v.startsWith('[0') ? '0:v' : v];
if (audio) map.push('-map', `${outroFile ? 2 : 1}:a`, '-c:a', 'aac', '-b:a', '192k', '-shortest');
// sin audio ni cierre: el video ya está listo (no se vuelve a comprimir)
if (!audio && !outroFile && ESC > 1) fs.renameSync(tmp, out);
else await run([...inputs, ...(filters.length ? ['-filter_complex', filters.join(';')] : []), ...map, '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
console.log(`Listo: ${out}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
