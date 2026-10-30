// render.mjs — convierte un shot (.dc.html de Claude Design) en MP4 vertical 1080×1920
// (u horizontal 1920×1080 si el .dc.html define window.K_ANCHO = 1920; window.K_ALTO = 1080, como los largos).
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
const [dir, page, out] = args;
if (!out) { console.error('Uso: node render.mjs <carpeta> <archivo.dc.html> <salida.mp4> [--fps 30] [--audio x.wav] [--outro x.mp4] [--hasta seg]'); process.exit(1); }
const FPS = +opt('fps', 30);

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.jsx': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.mp4': 'video/mp4', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(path.resolve(dir), decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(path.resolve(dir)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined, args: ['--autoplay-policy=no-user-gesture-required'] });
let W = 1080, H = 1920;
const ctx = await browser.newContext({ viewport: { width: W, height: H + 70 } });
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
// Ocultar todo lo que no es parte del video (aviso de audio, paneles, barra).
await p.addStyleTag({ content: '[style*="z-index: 9999"]{display:none!important}' });
await p.waitForTimeout(1500);
// Tamaño del video: lo define el .dc.html (window.K_ANCHO / K_ALTO); si no, vertical 1080×1920.
[W, H] = await p.evaluate(() => [+window.K_ANCHO || 1080, +window.K_ALTO || 1920]);
if (W !== 1080 || H !== 1920) { await p.setViewportSize({ width: W, height: H + 70 }); await p.waitForTimeout(1000); }

const info = await p.evaluate((SEL) => {
  const e = document.querySelector(SEL), r = e.getBoundingClientRect();
  let outro = NaN;
  try { let acc = 0; for (const s of JSON.parse(window.OM_SCENES)) { if (s.name === 'Outro') { outro = acc; break; } acc += s.dur; } } catch {}
  return { dur: +e.getAttribute('data-om-exportable-video-with-duration-secs'), x: r.x, y: r.y, w: r.width, h: r.height, outro };
}, SEL);
const outroFile = opt('outro');
let end = +opt('hasta', 0) || (outroFile && info.outro ? info.outro : info.dur);
const N = Math.round(end * FPS);
console.log(`Duración ${info.dur}s · render hasta ${end.toFixed(2)}s · ${N} cuadros · ${W}×${H} · escala ${(info.w / W).toFixed(3)}`);

// Ajustar escala para que el escenario salga exactamente a W×H.
const dpr = W / info.w;
const clip = { x: info.x, y: info.y, width: info.w, height: info.h };
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setDeviceMetricsOverride', { width: W, height: H + 70, deviceScaleFactor: dpr, mobile: false });

const tmp = out.replace(/\.mp4$/, '') + '.video.mp4';
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });

const t0 = Date.now();
for (let i = 0; i < N; i++) {
  const t = i / FPS;
  await p.evaluate(({ SEL, t }) => {
    document.querySelector(SEL).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } }));
  }, { SEL, t });
  const buf = await p.screenshot({ type: 'jpeg', quality: 93, clip });
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
  filters.push(`[1:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,fps=${FPS},format=yuv420p,setsar=1[o]`, `[0:v]setsar=1[m]`, `[m][o]concat=n=2:v=1:a=0[v]`);
  v = '[v]';
}
if (audio) inputs.push('-i', audio);
const map = ['-map', v.startsWith('[0') ? '0:v' : v];
// Volumen final (sonido oficial elegido por Robert, 30 oct 2026, motor/mezcla.json): narrado a −7.1 LUFS (nivel TikTok,
// suena fuerte con el cel al 50 %) y la versión de revisión sin voz a −11. Se sube la ganancia hasta llegar al objetivo
// con un limitador transparente (pico −1.5 dB); los graves ya vienen domados desde la mezcla, así que no distorsiona.
let master = [];
if (audio) {
  const { spawnSync } = await import('node:child_process');
  const MZ = JSON.parse(fs.readFileSync(new URL('./mezcla.json', import.meta.url), 'utf8'));
  const meta = /narrad/.test(path.basename(audio)) ? MZ.final_lufs_narrado : MZ.final_lufs_sin_voz;
  const lim = 'alimiter=limit=0.84:attack=3:release=80:asc=1:level=false';
  const medirI = (af) => { const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', audio, '-af', `${af}ebur128`, '-f', 'null', '-'], { encoding: 'utf8' });
    const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1); return m ? +m[1] : -23; };
  const i0 = medirI('');
  let g = meta - i0;
  for (let k = 0; k < 4; k++) g += meta - medirI(`volume=${g.toFixed(2)}dB,${lim},`);
  master = ['-af', `volume=${g.toFixed(2)}dB,${lim},aresample=48000`];
  console.log(`Volumen: ${i0} LUFS → ${meta} LUFS (ganancia ${g.toFixed(1)} dB)`);
}
if (audio) map.push('-map', `${outroFile ? 2 : 1}:a`, ...master, '-c:a', 'aac', '-b:a', '192k', '-shortest');
await run([...inputs, ...(filters.length ? ['-filter_complex', filters.join(';')] : []), ...map, '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
fs.unlinkSync(tmp);
console.log(`Listo: ${out}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
