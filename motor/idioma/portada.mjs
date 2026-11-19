// portada.mjs — portada 3:4 (1080×1440 JPG) para RedNote/Xiaohongshu a partir del video en chino.
// Uso: node motor/idioma/portada.mjs <video_zh.mp4> <clave> <salida.jpg> [--texto "标题"] [--t 12.5]
// - Elige el cuadro (cada 0.25 s del 4 % al 78 % del video, a 270×480): gana el de más color, detalle y Robert (piel + bata blanca);
//   se castiga lo que aún se mueve (contadores a medias, transiciones) y las escenas oscuras (tarjeta final).
// - Texto: el «标题» de shots/<clave>/zh/publicacion.md sin emojis, en 1–2 renglones; la cifra (o el 2.º renglón) va
//   resaltada en el amarillo de la marca. El dato no se cambia: solo se quitan emojis.
// - Logo del shot (shots/<clave>/assets/logo_*.svg) o el isotipo a color, con «La Creación del Robert».
// - ffmpeg: usa la variable FFMPEG o «ffmpeg» del PATH. Navegador: NAVEGADOR=chrome (GitHub) o el Chromium de Playwright.
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(HERE, '..', '..');
const FF = process.env.FFMPEG || 'ffmpeg';
const FP = process.env.FFPROBE || 'ffprobe';

// ---------- texto ----------
export function tituloDe(clave) {
  const f = path.join(RAIZ, 'shots', clave, 'zh', 'publicacion.md');
  const md = fs.readFileSync(f, 'utf8');
  const m = md.match(/^\s*(?:\*\*)?标题(?:\*\*)?\s*[:：]\s*(?:\*\*)?\s*(.+)$/m);
  if (!m) throw new Error(`Sin 标题 en ${f}`);
  return m[1].replace(/\*\*/g, '').trim();
}

export function limpiar(t) {
  return t
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}️︎‍⃣]/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s，,。]+|[\s，,。]+$/g, '')
    .trim();
}

const largo = (s) => [...s].reduce((n, c) => n + (/[\x00-\x7F]/.test(c) ? 0.55 : 1), 0); // ancho aprox. en «caracteres chinos»

export function partir(t) {
  const cs = [...t];
  if (largo(t) <= 8) return [t];
  const medio = largo(t) / 2;
  let mejor = null;
  // 1) cortar después de un signo de puntuación
  cs.forEach((c, i) => {
    if (i === 0 || i >= cs.length - 1) return;
    if (/[，,：:？?！!、；; ]/.test(c)) {
      const a = cs.slice(0, i + 1).join(''), b = cs.slice(i + 1).join('');
      const d = Math.abs(largo(a) - medio);
      if (largo(a) >= 3 && largo(b) >= 3 && largo(a) <= 13 && largo(b) <= 13 && (!mejor || d < mejor.d)) mejor = { a, b, d };
    }
  });
  if (mejor) return [mejor.a.replace(/[，,；;、：:\s]+$/, ''), mejor.b.trim()];
  // 2) cortar cerca del medio, solo entre palabras (Intl.Segmenter de chino), sin partir cifras, palabras latinas ni comillas
  const cortes = new Set();
  let n = 0;
  for (const s of new Intl.Segmenter('zh', { granularity: 'word' }).segment(t)) { n += [...s.segment].length; cortes.add(n); }
  let best = null, dentro = 0;
  for (let i = 1; i < cs.length; i++) {
    const L = cs[i - 1], R = cs[i];
    if (/[“「《（(]/.test(L)) dentro++;
    if (/[”」》）)]/.test(L)) dentro = Math.max(0, dentro - 1);
    if (i < 2 || i > cs.length - 2) continue;
    if (/[A-Za-z0-9.%°]/.test(L) && /[A-Za-z0-9.%°]/.test(R)) continue;
    if (/[0-9]/.test(L) && /[万亿千百个只升克吨年天秒倍张种次岁颗块杯度米斤℃多例]/.test(R)) continue;
    if (/[”"」》）)，。？！、…了的着吗呢吧]/.test(R)) continue;
    if (/[几多余]/.test(L) && /[滴升个只颗块条根张次天年米倍吨]/.test(R)) continue;
    let pena = cortes.has(i) ? 0 : 3; // partir una palabra: último recurso
    if (dentro > 0 || L === '"') pena += 2;
    // preferir cortar antes de 是/不是/其实/就/也/但/会/在
    const bonus = /[是就也其但却才会]/.test(R) || (R === '不' && cs[i + 1] === '是') ? 0.8 : 0;
    const d = Math.abs(largo(cs.slice(0, i).join('')) - medio) - bonus + pena;
    if (!best || d < best.d) best = { i, d };
  }
  return [cs.slice(0, best.i).join(''), cs.slice(best.i).join('')];
}

const UNIDAD = '(?:多|余)?(?:厘米|毫米|微米|纳米|公里|千米|千克|公斤|小时|分钟|万亿|亿年|万年|个月|摄氏度|°C|℃|%|％|万|亿|千|百|个|只|升|克|吨|年|天|秒|倍|张|种|次|岁|颗|块|杯|度|米|斤|分|周|岁|厘|层|根|颗|滴|条|株|粒|位|名|人)*';
const reNum = new RegExp(`[0-9][0-9.,，:：]*(?:[0-9])?${UNIDAD}`, 'u');

// Devuelve renglones como [[{t, hl}], ...]
export function maquetar(texto) {
  const lineas = partir(texto);
  const reG = new RegExp(reNum.source, 'gu');
  const nums = (texto.match(reG) || []).map((n) => n.replace(/[,，:：.]+$/, '')).filter((n) => /[0-9]/.test(n));
  if (nums.length) {
    // resaltar cada cifra, renglón por renglón
    const r = lineas.map((l) => {
      const re = new RegExp(reNum.source, 'gu');
      const out = []; let k = 0, m;
      while ((m = re.exec(l))) {
        const num = m[0].replace(/[,，:：.]+$/, '');
        // «B12», «COVID-19», «GPT4»: es un nombre, no una cifra (salvo que lleve unidad, como «AI58分»)
        if (m.index > 0 && /[A-Za-z-]/.test(l[m.index - 1]) && /^[0-9.,]+$/.test(num)) { re.lastIndex = m.index + num.length; continue; }
        if (m.index > k) out.push({ t: l.slice(k, m.index), hl: false });
        out.push({ t: num, hl: true }); k = m.index + num.length; re.lastIndex = k;
      }
      if (k < l.length) out.push({ t: l.slice(k), hl: false });
      return out;
    });
    if (r.some((l) => l.some((x) => x.hl))) return r;
  }
  if (lineas.length === 1) return [[{ t: lineas[0], hl: true }]];
  return [[{ t: lineas[0], hl: false }], [{ t: lineas[1], hl: true }]];
}

// ---------- elección del cuadro ----------
const SW = 90, SH = 160; // muestra chica
function puntuar(buf, buf2) {
  // Solo la zona que queda visible arriba de la banda de texto (0–1080 px de 1920 → filas 0–90 de 160)
  const filas = Math.round(SH * 1080 / 1920);
  let piel = 0, blanco = 0, sat = 0, luz = 0, borde = 0, dif = 0, n = 0;
  const hist = new Map();
  for (let y = 0; y < filas; y++) for (let x = 0; x < SW; x++) {
    const i = (y * SW + x) * 3, r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), s = mx ? (mx - mn) / mx : 0;
    // tono de piel: rojo > verde > azul, saturación media, no demasiado oscuro
    if (r > 95 && g > 40 && b > 20 && r > g && g > b && r - b > 25 && s > 0.18 && s < 0.6 && mx < 245 && r - g > 10 && r - g < 90) piel++;
    if (mn > 215 && mx - mn < 18) blanco++;
    sat += s; luz += mx; n++;
    if (x > 0) { const j = i - 3; borde += Math.abs(r - buf[j]) + Math.abs(g - buf[j + 1]) + Math.abs(b - buf[j + 2]) > 60 ? 1 : 0; }
    if (buf2) dif += Math.abs(r - buf2[i]) + Math.abs(g - buf2[i + 1]) + Math.abs(b - buf2[i + 2]);
    const k = (r >> 5) * 64 + (g >> 5) * 8 + (b >> 5); hist.set(k, (hist.get(k) || 0) + 1);
  }
  const fp = piel / n, fb = blanco / n, fs_ = sat / n, fl = luz / n / 255, fe = borde / n, fd = buf2 ? dif / n / 3 / 255 : 0;
  const colores = [...hist.values()].filter((v) => v > n * 0.004).length;
  const robert = fp > 0.35 ? 0.3 : Math.min(fp / 0.025, 1) * 0.7 + Math.min(fb / 0.03, 1) * 0.3; // cara + bata (si la «piel» llena el cuadro, es otra cosa)
  let s = 1.4 * robert + 1.4 * Math.min(fe / 0.14, 1) + 0.8 * Math.min(colores / 18, 1) + 0.6 * Math.min(fs_ / 0.45, 1);
  if (fl < 0.6) s -= (0.6 - fl) * 5; // escena oscura (tarjeta final, fundidos): preferir los fondos brillantes de la marca
  if (fd > 0.06) s -= Math.min((fd - 0.06) * 12, 2); // transición o movimiento fuerte
  return { s, fp, fb, fe, colores, fd, fl };
}

// Cuántos píxeles cambian fuerte entre dos cuadros (un contador que sigue contando, algo que entra o sale).
function cambio(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i += 3) if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 90) n++;
  return n;
}

// Reduce un cuadro de (SW·F)×(SH·F) a SW×SH promediando bloques F×F.
function reducir(buf, F) {
  const W = SW * F, out = Buffer.alloc(SW * SH * 3);
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) for (let c = 0; c < 3; c++) {
    let s = 0;
    for (let dy = 0; dy < F; dy++) for (let dx = 0; dx < F; dx++) s += buf[((y * F + dy) * W + x * F + dx) * 3 + c];
    out[(y * SW + x) * 3 + c] = s / (F * F);
  }
  return out;
}

// Una sola pasada: cuadros de 270×480 cada 0.25 s entre el 4 % y el 78 % del video. Gana el de más Robert, detalle y
// color; se castiga lo que todavía se mueve (así no sale un contador a medias ni una transición).
export function elegirCuadro(video, verbose = false) {
  const dur = parseFloat(spawnSync(FP, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).stdout.toString()) || 60;
  const PASO = 0.25, F = 3, TAM = SW * F * SH * F * 3;
  const ini = Math.max(1.6, dur * 0.04), fin = Math.min(dur * 0.78, dur - 6);
  const r = spawnSync(FF, ['-v', 'error', '-i', video, '-t', String(fin + 1), '-vf', `fps=${1 / PASO},scale=${SW * F}:${SH * F}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { maxBuffer: 1 << 30 });
  const fr = [];
  for (let o = 0; o + TAM <= r.stdout.length; o += TAM) fr.push(r.stdout.subarray(o, o + TAM));
  if (fr.length < 8) return dur * 0.35;
  const c = fr.map((f, i) => (i + 1 < fr.length ? cambio(f, fr[i + 1]) : 0));
  let mejor = null;
  for (let i = Math.ceil(ini / PASO); i <= Math.floor(fin / PASO) && i < fr.length - 1; i++) {
    const t = i * PASO, p = puntuar(reducir(fr[i], F), reducir(fr[i - 1], F));
    const mov = Math.max(c[i - 1], c[i]);
    p.mov = mov;
    if (mov <= 3) p.s += 0.3; // quieto: nada a medio animar
    else p.s -= Math.min(mov / 150, 1) * 1.0;
    // el cuadro del gancho suele contar la misma idea que el título (si ya terminó de animarse)
    if (t < Math.max(6, dur * 0.1)) p.s += mov <= 3 ? 0.5 : 0.1;
    if (verbose) console.log(t.toFixed(2).padStart(6), p.s.toFixed(2), JSON.stringify(Object.fromEntries(Object.entries(p).map(([k, v]) => [k, +(+v).toFixed(4)]))));
    if (!mejor || p.s > mejor.s + 0.02) mejor = { t, s: p.s };
  }
  return mejor ? mejor.t : dur * 0.35;
}

// ---------- composición ----------
function logoDe(clave) {
  const a = path.join(RAIZ, 'shots', clave, 'assets');
  const f = fs.existsSync(a) && fs.readdirSync(a).find((x) => /^logo_.*\.svg$/.test(x));
  return fs.readFileSync(f ? path.join(a, f) : path.join(RAIZ, 'motor', 'kit', 'logos', 'logo_color.svg'), 'utf8');
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html({ img, renglones, logo }) {
  const maxL = Math.max(...renglones.map((r) => largo(r.map((s) => s.t).join(''))));
  const fs1 = Math.round(Math.min(136, 930 / Math.max(maxL, 1)));
  const lin = renglones.map((r) => `<div class="l">${r.map((s) => s.hl ? `<span class="hl">${esc(s.t)}</span>` : `<span class="n">${esc(s.t)}</span>`).join('')}</div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1440px;overflow:hidden;background:#0E0F12}
  body{position:relative;font-family:"Noto Sans CJK SC","Noto Sans SC","Source Han Sans SC","WenQuanYi Zen Hei",sans-serif}
  .foto{position:absolute;left:0;top:0;width:1080px;height:1920px;background:url(${img}) 0 0/1080px 1920px no-repeat}
  .sombra{position:absolute;left:0;right:0;bottom:0;height:600px;
    background:linear-gradient(to bottom,rgba(14,15,18,0) 0%,rgba(14,15,18,.82) 26%,rgba(14,15,18,.96) 40%,rgba(14,15,18,.98) 100%)}
  .txt{position:absolute;left:44px;right:44px;bottom:128px;display:flex;flex-direction:column;align-items:center;gap:${Math.round(fs1 * 0.16)}px}
  .l{font-weight:900;font-size:${fs1}px;line-height:1.12;white-space:nowrap;letter-spacing:.01em;text-align:center}
  .n{color:#fff;-webkit-text-stroke:${Math.round(fs1 * 0.1)}px #0E0F12;paint-order:stroke fill;text-shadow:0 6px 0 rgba(0,0,0,.35)}
  .hl{color:#16120A;background:#FFC83D;border-radius:${Math.round(fs1 * 0.16)}px;padding:0 ${Math.round(fs1 * 0.14)}px;margin:0 ${Math.round(fs1 * 0.04)}px;
    box-shadow:0 ${Math.round(fs1 * 0.07)}px 0 #B8860B, 0 0 0 ${Math.round(fs1 * 0.045)}px #0E0F12;-webkit-box-decoration-break:clone;box-decoration-break:clone}
  .marca{position:absolute;left:0;right:0;bottom:34px;display:flex;justify-content:center;align-items:center;gap:14px;
    color:#fff;font:700 30px/1 "Noto Sans CJK SC","WenQuanYi Zen Hei",sans-serif;opacity:.92;letter-spacing:.02em}
  .logo{width:54px;height:54px;border-radius:13px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.4)}
  .logo svg{width:44px;height:44px}
  .logo svg path[fill="#ffffff"],.logo svg path[fill="#fff"]{fill:#fff}
  </style></head><body>
  <div class="foto"></div><div class="sombra"></div>
  <div class="txt">${lin}</div>
  <div class="marca"><div class="logo">${logo}</div><span>La Creación del Robert</span></div>
  </body></html>`;
}

export async function portada({ video, clave, salida, texto, t, browser, verbose }) {
  texto = limpiar(texto || tituloDe(clave));
  if (t == null) t = elegirCuadro(video, verbose);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'portada-'));
  const png = path.join(tmp, 'cuadro.png');
  const r = spawnSync(FF, ['-v', 'error', '-y', '-ss', String(t), '-i', video, '-frames:v', '1', '-vf', 'scale=1080:1920', png]);
  if (r.status !== 0) throw new Error('ffmpeg: ' + r.stderr);
  const renglones = maquetar(texto);
  const pagina = path.join(tmp, 'p.html');
  fs.writeFileSync(pagina, html({ img: 'cuadro.png', renglones, logo: logoDe(clave) }));
  const propio = !browser;
  if (propio) browser = await chromium.launch({ channel: process.env.NAVEGADOR || undefined });
  const p = await browser.newPage({ viewport: { width: 1080, height: 1440 } });
  await p.goto('file://' + pagina);
  await p.evaluate(() => document.fonts.ready);
  // Si un renglón no cabe (latinas anchas), achicar la letra
  await p.evaluate(() => {
    for (const l of document.querySelectorAll('.l')) {
      let fs = parseFloat(getComputedStyle(l).fontSize);
      while (l.scrollWidth > 1000 && fs > 50) { fs -= 4; l.style.fontSize = fs + 'px'; }
    }
  });
  fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
  await p.screenshot({ path: salida, type: 'jpeg', quality: 90 });
  await p.close();
  if (propio) await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  return { t, texto, renglones };
}

// ---------- línea de comandos ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (k) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined; };
  const [video, clave, salida] = a;
  if (!salida) { console.error('Uso: node motor/idioma/portada.mjs <video_zh.mp4> <clave> <salida.jpg> [--texto "标题"] [--t seg] [--ver]'); process.exit(1); }
  const r = await portada({ video, clave, salida, texto: opt('texto'), t: opt('t') != null ? +opt('t') : undefined, verbose: a.includes('--ver') });
  console.log(`${clave}: t=${r.t}s «${r.renglones.map((l) => l.map((s) => s.hl ? `[${s.t}]` : s.t).join('')).join(' / ')}» → ${salida}`);
}
