// doc-largo.jsx — motor de "documental" horizontal (1920×1080) para los videos largos.
// Lee window.CAPS (escenas.js): capítulos → líneas de narración → visual de cada bloque.
// Todo se dibuja en función del tiempo T, igual que los shots (render determinista).
// Usa colores, letras y utilidades de kit-robert.jsx (KC, KF, kprog, klerp, kEase, krng, mece) y el estilo de cine de cine-kit.jsx.
// Acabado de cine: cámara lenta con profundidad en las ilustraciones, grano de película, viñeta, corrección de color,
// subtítulos y rótulos de documental.

const W = 1920, H = 1080;
const KSOMBRA = '0 2px 4px rgba(0,0,0,.6), 0 0 28px rgba(0,0,0,.7)';
const VEL = 15;          // caracteres por segundo de la voz (estimado; con la voz real se usan sus tiempos)
const PAUSA = 0.45;      // respiro entre frases
const TARJETA = 3.2;     // duración de la tarjeta de capítulo
const FUNDIDO = 0.55;    // cruce entre escenas
const fotoSrc = (p) => 'video/img/' + p + '.jpg';
const fotoDim = (src) => (window.FOTOS || {})[src] || [1600, 1200];
const SERIF = "'Fraunces', Georgia, serif";
const BLANCO = '#F6F3EC';

// Color de cada capítulo: tono (luz y fondos oscuros teñidos) y acento (rótulos, líneas, números).
const PALETA = [
  { fondo: '#1b2c52', tinta: BLANCO, acento: KC.gold2 },
  { fondo: '#2f8a3a', tinta: BLANCO, acento: '#ffd64a' },
  { fondo: '#c9a015', tinta: BLANCO, acento: '#ffd64a' },
  { fondo: '#4b2a9a', tinta: BLANCO, acento: '#c8a8ff' },
  { fondo: '#0f8fb0', tinta: BLANCO, acento: '#7fe6ff' },
  { fondo: '#c2205f', tinta: BLANCO, acento: '#ff9cc4' },
  { fondo: '#14a37c', tinta: BLANCO, acento: '#7ff0c8' },
  { fondo: '#d0661a', tinta: BLANCO, acento: '#ffbe7a' },
  { fondo: '#3a2a12', tinta: BLANCO, acento: KC.gold2 },
];

/* ---------------- línea de tiempo ---------------- */
function armarLinea(caps, tiempos) {
  let t = 0, n = 0;
  const lineas = [], bloques = [];
  caps.forEach((c, ci) => {
    const pal = PALETA[c.num % PALETA.length];
    if (c.tarjeta !== false) { bloques.push({ at: t, dur: TARJETA, v: { tipo: 'capitulo' }, c, pal }); t += TARJETA; }
    c.lineas.forEach((l) => {
      const d = (tiempos && tiempos[n]) || l.d || Math.max(2.2, l.t.length / VEL + PAUSA);
      lineas.push({ at: t, dur: d, t: l.t, c, robert: l.robert, n });
      const ult = bloques[bloques.length - 1];
      if (l.v || !ult || ult.v.tipo === 'capitulo' || ult.c !== c) bloques.push({ at: t, dur: d, v: l.v || { tipo: 'texto', grande: '' }, c, pal });
      else ult.dur += d;
      t += d; n++;
    });
  });
  return { lineas, bloques, total: t + 1 };
}
const LINEA = armarLinea(window.CAPS || [], window.TIEMPOS_VOZ);
window.DURACION_LARGO = LINEA.total;
// Precarga: fotos, texturas, logos y stickers se descargan y decodifican antes del primer cuadro (render.mjs y preview.mjs esperan esta promesa).
const TEXTURAS = ['papel', 'papel_a', 'tierra', 'aserrin', 'madera_clara', 'madera_media', 'madera_oscura', 'madera_pino'].concat([0, 1, 2, 3, 4, 5, 6, 7].map((i) => 'grano_' + i)).map((n) => 'video/tex/' + n + '.png');
window.__imgsLargo = [];
window.__precarga = Promise.all([...new Set(LINEA.bloques.flatMap((b) => (b.v.foto ? [b.v.foto] : b.v.fotos || [])).map(fotoSrc).concat(['video/logo_color.svg'], TEXTURAS, Object.keys(window.FOTOS || {}).filter((k) => k.includes('/extra/')), LINEA.bloques.filter((b) => b.v.logo).map((b) => b.v.logo), LINEA.lineas.filter((l) => l.robert).map((l) => 'video/stickers/' + l.robert[0] + '.png')))]
  .map((src) => { const im = new Image(); im.src = src; window.__imgsLargo.push(im); return im.decode().catch(() => null); }))
  .then(() => (document.fonts && document.fonts.ready) || null).then(() => window.__imgsLargo.length);

/* ---------------- piezas comunes ---------------- */
const abs = (x, y, extra) => ({ position: 'absolute', left: x, top: y, ...extra });
// Fondo oscuro de cine teñido con el color del capítulo, con luces fuera de foco y polvo.
function Fondo({ color, T, seed = 3, particulas = true }) {
  const c1 = mixHex(color, '#000000', 0.5), c2 = mixHex(color, '#000000', 0.9);
  return <div style={abs(0, 0, { width: W, height: H, background: `radial-gradient(ellipse at 50% 42%, ${c1} 0%, ${c2} 72%, #050506 100%)`, overflow: 'hidden' })}>
    {particulas && <svg width={W} height={H} style={abs(0, 0)}>
      <Bokeh n={16} t={T} seed={seed} colores={[mixHex(color, '#ffffff', 0.45), mixHex(color, '#ffffff', 0.7), '#fff1d0']} o={0.35} r0={30} r1={110} />
      <Polvo n={50} t={T} seed={seed + 7} o={0.5} color={mixHex(color, '#ffffff', 0.8)} />
    </svg>}
    <div style={abs(0, 0, { width: W, height: H, background: 'linear-gradient(115deg, rgba(255,235,200,.10) 0%, rgba(255,235,200,0) 40%)' })} />
  </div>;
}
// Foto difuminada que llena la pantalla detrás de la foto principal.
function FondoFoto({ src, T }) {
  return <div style={abs(0, 0, { width: W, height: H, overflow: 'hidden', background: '#0b0b0d' })}>
    <img src={src} style={abs(-W * 0.1, -H * 0.1, { width: W * 1.2, height: H * 1.2, objectFit: 'cover', filter: 'blur(42px) saturate(1.15) brightness(.8)', transform: `scale(${1.02 + 0.03 * Math.sin(T * 0.12)})` })} />
    <div style={abs(0, 0, { width: W, height: H, background: 'radial-gradient(ellipse at 50% 45%, rgba(8,9,12,.35) 0%, rgba(8,9,12,.78) 80%)' })} />
  </div>;
}
// Foto impresa con movimiento de cámara lento (Ken Burns), entrada suave y sombra realista.
function Marco({ foto, p, tl, x = W / 2, y = H / 2 - 50, maxW = 1240, maxH = 720, rot = -1.5, z0 = 1.02, z1 = 1.12, foco = [0.5, 0.45], borde = 12, retraso = 0, etiqueta, pal }) {
  const src = fotoSrc(foto);
  const [fw, fh] = fotoDim(src);
  const k = Math.min(maxW / fw, maxH / fh);
  const w = fw * k, h = fh * k;
  const e = kprog(tl, retraso, retraso + 0.9, kEase.sale);
  const z = klerp(z0, z1, 0.4 * p + 0.6 * kEase.suave(p));
  const r = rot * 0.6 + 0.5 * Math.sin(tl * 0.25);
  return <div style={abs(x - w / 2 - borde, y - h / 2 - borde, { width: w + 2 * borde, height: h + 2 * borde, background: '#f3efe6', borderRadius: 3,
    boxShadow: '0 50px 90px rgba(0,0,0,.55), 0 14px 30px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.08)', opacity: kclamp(e * 1.3, 0, 1),
    transform: `translateY(${(1 - e) * 40}px) rotate(${r}deg) scale(${0.94 + 0.06 * e})` })}>
    <div style={abs(borde, borde, { width: w, height: h, overflow: 'hidden', borderRadius: 1, background: '#111' })}>
      <img src={src} style={{ width: w, height: h, display: 'block', transformOrigin: `${foco[0] * 100}% ${foco[1] * 100}%`, transform: `scale(${z})`, filter: 'contrast(1.06) saturate(1.06)' }} />
      <div style={abs(0, 0, { width: w, height: h, background: 'radial-gradient(ellipse at 45% 40%, rgba(255,240,215,.08), rgba(0,0,0,.28) 100%)' })} />
      <div style={abs(-w, 0, { width: w * 0.6, height: h, background: 'linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,.14), rgba(255,255,255,0))', transform: `translateX(${kprog(tl, retraso + 0.4, retraso + 2.4, kEase.suave) * w * 2.4}px)` })} />
    </div>
    {etiqueta && <Etiqueta texto={etiqueta} x={0} y={h + borde * 2 + 22} tl={tl - retraso - 0.6} pal={pal} />}
  </div>;
}
// Rótulo de documental: barra de acento + texto en mayúsculas espaciadas.
function Etiqueta({ texto, x, y, tl, pal, tam = 30, rel = false }) {
  const e = kprog(tl, 0, 0.7, kEase.sale);
  const pos = rel ? (o) => ({ position: 'relative', display: 'inline-block', ...o }) : (o) => abs(x, y, o);
  return <div style={pos({ display: 'inline-flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap', opacity: e, transform: `translateY(${(1 - e) * 14}px)` })}>
    <div style={{ width: 6, height: tam * 1.5, background: (pal && pal.acento) || KC.gold2, borderRadius: 2, transform: `scaleY(${e})` }} />
    <div style={{ fontFamily: KF.mono, fontWeight: 700, fontSize: tam * 0.86, letterSpacing: 4, color: BLANCO, textShadow: KSOMBRA, background: 'rgba(8,9,12,.55)', padding: '8px 16px', borderRadius: 4 }}>{texto}</div>
  </div>;
}

/* ---------------- tipos de escena ---------------- */
function EscenaFoto({ v, p, tl, T, pal }) {
  const src = fotoSrc(v.foto);
  return <>
    <FondoFoto src={src} T={T} />
    <Marco foto={v.foto} p={p} tl={tl} rot={v.rot ?? -1.5} foco={v.foco} z0={v.z0} z1={v.z1} etiqueta={v.etiqueta} pal={pal}
      x={v.lado === 'izq' ? 640 : v.lado === 'der' ? 1280 : W / 2} maxW={v.lado ? 1000 : 1240} />
    {v.texto && <TextoLateral v={v} tl={tl} pal={pal} />}
  </>;
}
function TextoLateral({ v, tl, pal }) {
  const e = kprog(tl, 0.6, 1.4, kEase.sale);
  const x = v.lado === 'izq' ? 1200 : 120;
  return <div style={abs(x, 320, { width: 620, opacity: e, transform: `translateX(${(1 - e) * (v.lado === 'izq' ? 40 : -40)}px)` })}>
    <div style={{ width: 120 * e, height: 4, background: pal.acento, marginBottom: 26 }} />
    <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 104, lineHeight: 1, color: BLANCO, textShadow: KSOMBRA, fontVariationSettings: "'opsz' 144" }}>{v.texto}</div>
    {v.sub && <div style={{ marginTop: 18, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 42, color: BLANCO, opacity: 0.88, textShadow: KSOMBRA }}>{v.sub}</div>}
  </div>;
}
function EscenaFotos({ v, p, tl, T, pal }) {
  const n = v.fotos.length;
  const pos = n === 2 ? [[620, 430, -3], [1300, 455, 2.5]] : [[430, 440, -4], [960, 405, 1.5], [1490, 455, -2.5]];
  return <>
    <FondoFoto src={fotoSrc(v.fotos[0])} T={T} />
    {v.fotos.map((f, i) => <Marco key={i} foto={f} p={p} tl={tl} x={pos[i][0]} y={pos[i][1]} rot={pos[i][2]} maxW={n === 2 ? 760 : 560} maxH={n === 2 ? 600 : 560}
      retraso={i * (v.paso ?? 0.45)} z0={1} z1={1.07} borde={10} />)}
    {v.etiqueta && <div style={abs(0, 800, { width: W, textAlign: 'center' })}><Etiqueta texto={v.etiqueta} rel tl={tl - 0.9} pal={pal} tam={32} /></div>}
  </>;
}
function EscenaTexto({ v, p, tl, T, pal }) {
  const palabras = (v.grande || '').split(' ');
  return <>
    <Fondo color={v.fondo || pal.fondo} T={T} />
    {v.arriba && <div style={abs(0, 270, { width: W, textAlign: 'center', fontFamily: KF.mono, fontWeight: 700, fontSize: 30, letterSpacing: 8, color: pal.acento, opacity: kprog(tl, 0, 0.6) })}>{v.arriba}</div>}
    <div style={abs(160, 340, { width: W - 320, textAlign: 'center', fontFamily: SERIF, fontWeight: 600, fontSize: (v.tam || 150) * 0.92, lineHeight: 1.05, color: BLANCO, textShadow: KSOMBRA, fontVariationSettings: "'opsz' 144" })}>
      {palabras.map((w, i) => { const e = kprog(tl, 0.15 + i * 0.12, 0.75 + i * 0.12, kEase.sale); return <span key={i} style={{ display: 'inline-block', margin: '0 0.12em', opacity: e, transform: `translateY(${(1 - e) * 24}px)`, filter: `blur(${(1 - e) * 8}px)` }}>{w}</span>; })}
    </div>
    {v.sub && <div style={abs(160, 700, { width: W - 320, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 48, color: BLANCO, opacity: 0.88 * kprog(tl, 0.9, 1.6), textShadow: KSOMBRA })}>{v.sub}</div>}
  </>;
}
function EscenaNumero({ v, p, tl, T, pal }) {
  const val = klerp(v.desde || 0, v.valor, kprog(tl, 0.3, 1.8, (x) => 1 - Math.pow(1 - x, 3)));
  return <>
    <Fondo color={v.fondo || pal.fondo} T={T} />
    {v.arriba && <div style={abs(0, 210, { width: W, textAlign: 'center', fontFamily: KF.mono, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: pal.acento })}>{v.arriba}</div>}
    <div style={abs(0, 270, { width: W, textAlign: 'center', fontFamily: SERIF, fontWeight: 700, fontSize: 320, lineHeight: 1, color: BLANCO, textShadow: `0 0 80px ${pal.acento}66, ${KSOMBRA}`, fontVariationSettings: "'opsz' 144" })}>
      {(v.prefijo || '') + kformato(val, v.dec || 0)}{v.sufijo && (/^[ºª]$/.test(v.sufijo)
        ? <span style={{ fontSize: '0.42em', verticalAlign: '0.95em', textDecoration: 'underline', textUnderlineOffset: '0.12em', textDecorationThickness: '0.06em' }}>{v.sufijo === 'º' ? 'o' : 'a'}</span>
        : v.sufijo)}</div>
    {v.etiqueta && <div style={abs(160, 660, { width: W - 320, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 54, color: BLANCO, opacity: kprog(tl, 1, 1.7), textShadow: KSOMBRA })}>{v.etiqueta}</div>}
  </>;
}
function EscenaLogo({ v, tl, T, pal }) {
  const e = kprog(tl, 0.2, 1.1, (x) => 1 - Math.pow(1 - x, 3));
  return <>
    <div style={abs(0, 0, { width: W, height: H, background: v.fondo || 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #ece7dd 70%, #cfc8bb 100%)' })} />
    <img src={v.logo} style={abs(W / 2 - (v.ancho || 900) / 2, 170, { width: v.ancho || 900, height: 480, objectFit: 'contain', opacity: e, transform: `scale(${0.92 + 0.08 * e})`, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,.18))' })} />
    {v.etiqueta && <div style={abs(160, 700, { width: W - 320, textAlign: 'center', fontFamily: SERIF, fontWeight: 600, fontSize: 48, lineHeight: 1.2, color: '#1d1a17', opacity: kprog(tl, 0.9, 1.5) })}>{v.etiqueta}</div>}
  </>;
}
function EscenaMarca({ v = {}, tl, T }) {
  const e = kprog(tl, 0.1, 1.2, (x) => 1 - Math.pow(1 - x, 3));
  const t2 = kprog(tl, 1.0, 1.8, kEase.sale);
  return <>
    <Fondo color="#1b2c52" T={T} />
    <div style={abs(W / 2 - 300, 40, { width: 600, height: 600, borderRadius: 300, background: 'radial-gradient(circle, rgba(244,194,90,.35), rgba(244,194,90,0) 65%)', opacity: e })} />
    <div style={abs(W / 2 - 230, 90, { width: 460, height: 460, transform: `rotate(${(1 - e) * -40}deg) scale(${0.7 + 0.3 * e})`, opacity: e, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.5))' })}>
      <img src="video/logo_color.svg" style={{ width: 460, height: 460 }} />
    </div>
    <div style={abs(0, 600, { width: W, textAlign: 'center', fontFamily: SERIF, fontWeight: 600, fontSize: 130, color: BLANCO, opacity: t2, transform: `translateY(${(1 - t2) * 24}px)`, textShadow: KSOMBRA, fontVariationSettings: "'opsz' 144" })}>
      {v.texto || <>La Creación del <span style={{ color: KC.gold2, fontStyle: 'italic' }}>Robert</span></>}</div>
    {v.sub && <div style={abs(0, 790, { width: W, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 52, color: KC.gold2, opacity: kprog(tl, 2, 2.7) })}>{v.sub}</div>}
  </>;
}
// Tarjeta de capítulo: entra desde negro, título en serif, raya que se dibuja y luz que barre.
function EscenaCapitulo({ c, tl, T, pal }) {
  const e = kprog(tl, 0.15, 1.1, kEase.sale);
  const s = kprog(tl, TARJETA - 0.6, TARJETA);
  const negro = 1 - kprog(tl, 0, 0.5);
  return <>
    <Fondo color={pal.fondo} T={T} seed={c.num * 3 + 1} />
    <div style={abs(0, 0, { width: W, height: H, background: `linear-gradient(100deg, rgba(255,255,255,0) 30%, rgba(255,240,210,.10) 50%, rgba(255,255,255,0) 70%)`, transform: `translateX(${klerp(-W, W, kprog(tl, 0.3, 2.8, kEase.suave))}px)` })} />
    <div style={abs(0, 330, { width: W, textAlign: 'center', fontFamily: KF.mono, fontWeight: 700, fontSize: 30, letterSpacing: 14, color: pal.acento, opacity: e * (1 - s) })}>CAPÍTULO {c.num}</div>
    <div style={abs(120, 390, { width: W - 240, textAlign: 'center', fontFamily: SERIF, fontWeight: 600, fontSize: 170, lineHeight: 1, color: BLANCO, textShadow: KSOMBRA,
      transform: `scale(${0.96 + 0.04 * e + 0.02 * kprog(tl, 0, TARJETA)})`, opacity: e * (1 - s), filter: `blur(${(1 - e) * 10}px)`, fontVariationSettings: "'opsz' 144" })}>{c.titulo}</div>
    <div style={abs(W / 2 - 180 * e, 610, { width: 360 * e, height: 3, background: pal.acento, opacity: 1 - s })} />
    {c.sub && <div style={abs(0, 650, { width: W, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 46, color: BLANCO, opacity: 0.88 * kprog(tl, 0.8, 1.5) * (1 - s) })}>{c.sub}</div>}
    <div style={abs(0, 0, { width: W, height: H, background: '#000', opacity: negro })} />
  </>;
}
function EscenaIconos({ v, p, tl, T, pal }) {
  const n = v.items.length;
  const cols = Math.min(n, v.cols || 4), filas = Math.ceil(n / cols);
  const paso = Math.min(400, (W - 160) / cols);
  const tam = Math.min(filas > 1 ? 230 : 260, paso - 50);
  return <>
    <Fondo color={v.fondo || pal.fondo} T={T} />
    {v.items.map((it, i) => {
      const fila = Math.floor(i / cols), col = i % cols, enFila = Math.min(cols, n - fila * cols);
      const x = W / 2 + (col - (enFila - 1) / 2) * paso, y = (filas > 1 ? 300 : 430) + fila * (tam + 110);
      const at = v.tiempos ? v.tiempos[i] : (i / n) * 0.85;
      const e = kprog(p, at, at + 0.06, kEase.sale);
      const [id, etq] = Array.isArray(it) ? it : [it, ''];
      return <div key={i} style={abs(x - tam / 2, y - tam / 2, { width: tam, height: tam, opacity: e, transform: `translateY(${(1 - e) * 30}px) scale(${0.85 + 0.15 * e})` })}>
        <div style={{ width: tam, height: tam, borderRadius: tam / 2, background: 'radial-gradient(circle at 38% 32%, #ffffff 0%, #f1ece2 60%, #d9d1c2 100%)', boxShadow: `0 30px 50px rgba(0,0,0,.5), 0 0 0 4px ${pal.acento}, 0 0 40px ${pal.acento}55` }}>
          <svg viewBox="0 0 200 200" width={tam} height={tam}>{(ICONOS[id] || ICONOS.estrella)(tl + i)}</svg>
        </div>
        {etq && <div style={{ marginTop: 22, width: paso, marginLeft: (tam - paso) / 2, textAlign: 'center', fontFamily: SERIF, fontWeight: 600, fontSize: tam < 220 ? 30 : 36, color: BLANCO, textShadow: KSOMBRA }}>{etq}</div>}
      </div>;
    })}
  </>;
}
// Ilustración: las de cine (ILUSC) llenan el cuadro y tienen cámara con profundidad; las viejas (ILUS) se dibujan como antes.
function EscenaIlus({ v, p, tl, T, pal, dur }) {
  const C = (window.ILUSC || {})[v.id];
  if (C) {
    const c = C.cam || {};
    const k = 0.45 * p + 0.55 * kEase.suave(p);
    const z = klerp(c.z0 ?? 1, c.z1 ?? 1.06, k), dx = klerp(c.x0 ?? 0, c.x1 ?? 0, k), dy = klerp(c.y0 ?? 0, c.y1 ?? 0, k);
    const fx = c.fx ?? W / 2, fy = c.fy ?? H / 2;
    const sx = 1.4 * mece(T, 7, 0.32), sy = 1.1 * mece(T, 9, 0.27); // cámara en mano, casi imperceptible
    const capa = (prof = 1) => { const zz = 1 + (z - 1) * prof; return `translate(${fx} ${fy}) scale(${zz}) translate(${-fx - (dx + sx) * prof} ${-fy - (dy + sy) * prof})`; };
    return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={abs(0, 0, { background: c.fondo || '#0b0b0d' })} overflow="hidden">
      {C.dibuja({ p, tl, T, pal, v, capa, dur: dur || 1 })}
      <Papel o={0.28} />
    </svg>;
  }
  const D = ILUS[v.id];
  return <>
    <Fondo color={v.fondo || pal.fondo} T={T} />
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={abs(0, 0, { color: v.tinta || pal.tinta, transformOrigin: '50% 0', transform: 'translateY(6px) scale(0.86)' })}>{D ? D({ p, tl, T, pal, v }) : null}</svg>
  </>;
}

const ESCENAS_TIPO = { foto: EscenaFoto, fotos: EscenaFotos, texto: EscenaTexto, numero: EscenaNumero, logo: EscenaLogo, marca: EscenaMarca, iconos: EscenaIconos, ilus: EscenaIlus };

/* ---------------- capas fijas ---------------- */
function SubtituloLargo({ T }) {
  const l = LINEA.lineas.find((x) => T >= x.at && T < x.at + x.dur);
  if (!l) return null;
  // Partir frases largas en trozos de ~2 renglones, repartidos por número de caracteres.
  const max = 92;
  const trozos = []; let cur = '';
  l.t.split(' ').forEach((w) => { if ((cur + ' ' + w).trim().length > max) { trozos.push(cur.trim()); cur = w; } else cur += ' ' + w; });
  if (cur.trim()) trozos.push(cur.trim());
  const total = trozos.reduce((a, s) => a + s.length, 0);
  let acc = 0, idx = 0;
  const pr = (T - l.at) / l.dur;
  for (let i = 0; i < trozos.length; i++) { acc += trozos[i].length / total; if (pr < acc) { idx = i; break; } idx = i; }
  return <div style={abs(0, H - 160, { width: W, textAlign: 'center', zIndex: 40 })}>
    <span style={{ display: 'inline-block', maxWidth: 1480, padding: '6px 20px', color: '#fff', fontFamily: KF.texto, fontWeight: 600, fontSize: 40, lineHeight: 1.28,
      textShadow: '0 2px 3px rgba(0,0,0,.95), 0 0 18px rgba(0,0,0,.85), 0 0 4px rgba(0,0,0,.9)' }}>{trozos[idx]}</span>
  </div>;
}
function MarcaCapitulo({ T }) {
  const b = LINEA.bloques.find((x) => T >= x.at && T < x.at + x.dur);
  if (!b || b.v.tipo === 'capitulo' || b.v.tipo === 'marca' || b.c.num === 0) return null;
  return <div style={abs(40, 34, { display: 'flex', alignItems: 'center', gap: 14, zIndex: 41, opacity: 0.85 })}>
    <img src="video/logo_color.svg" style={{ width: 54, height: 54, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.6))' }} />
    <div style={{ fontFamily: KF.mono, fontWeight: 700, fontSize: 19, letterSpacing: 4, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,.9), 0 0 14px rgba(0,0,0,.7)' }}>
      <span style={{ color: b.pal.acento }}>{String(b.c.num).padStart(2, '0')}</span>&nbsp;&nbsp;{b.c.titulo.toUpperCase()}</div>
  </div>;
}
const LADOS_H = { 'abajo-der': { left: 1500, top: 560, width: 420 }, 'abajo-izq': { left: 0, top: 560, width: 420 }, 'arriba-der': { left: 1560, top: 90, width: 330 } };
function RobertLargo({ T }) {
  return <>{LINEA.lineas.filter((l) => l.robert).map((l) => {
    const [pose, lado = 'abajo-der'] = l.robert;
    const e = kprog(T, l.at, l.at + 0.45, (x) => 1 - Math.pow(1 - x, 3)) * (1 - kprog(T, l.at + l.dur - 0.35, l.at + l.dur));
    if (e <= 0) return null;
    const L = LADOS_H[lado];
    return <img key={l.n} src={'video/stickers/' + pose + '.png'} style={abs(L.left, L.top + (1 - e) * 160, { width: L.width, zIndex: 39, opacity: e,
      filter: 'drop-shadow(0 22px 28px rgba(0,0,0,.5)) drop-shadow(0 4px 6px rgba(0,0,0,.35))', transform: `rotate(${(lado.includes('izq') ? 1 : -1) * 2.5 * Math.sin(T * 0.8)}deg)` })} />;
  })}</>;
}
// Acabado de película: el grano, la viñeta y la corrección de color se agregan al final con ffmpeg (render_largo.mjs),
// porque en el navegador cuestan mucho tiempo por cuadro. Aquí solo queda la sombra baja que ayuda a leer los subtítulos.
function Pelicula() {
  return <div style={abs(0, H - 300, { width: W, height: 300, zIndex: 32, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.42))' })} />;
}
// Carga temprana de las letras que se usan más adelante (para que el primer cuadro con ellas no salga con otra letra).
function Letras() {
  return <div style={abs(0, 0, { opacity: 0, pointerEvents: 'none', fontSize: 20 })}>
    <span style={{ fontFamily: SERIF, fontWeight: 600 }}>Aa</span><span style={{ fontFamily: SERIF, fontWeight: 700 }}>Aa</span><span style={{ fontFamily: SERIF, fontStyle: 'italic' }}>Aa</span>
    <span style={{ fontFamily: SERIF, fontWeight: 400 }}>Aa</span><span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}>Aa</span><span style={{ fontFamily: "'Caveat', cursive", fontWeight: 500 }}>Aa</span>
    <span style={{ fontFamily: KF.mono, fontWeight: 700 }}>Aa</span><span style={{ fontFamily: KF.texto, fontWeight: 600 }}>Aa</span><span style={{ fontFamily: KF.titulo }}>Aa</span>
  </div>;
}

/* ---------------- composición ---------------- */
function DocLargo() {
  const { T } = useComposition();
  const vis = LINEA.bloques.map((b, i) => ({ b, i })).filter(({ b }) => T >= b.at - 0.01 && T < b.at + b.dur + FUNDIDO);
  return <div style={abs(0, 0, { width: W, height: H, overflow: 'hidden', background: '#000' })}>
    <CineDefs />
    <Letras />
    <div style={abs(0, 0, { width: W, height: H, zIndex: 0, isolation: 'isolate' })}>
    {vis.map(({ b, i }) => {
      const tl = T - b.at, p = kclamp(tl / b.dur, 0, 1);
      const o = kprog(tl, 0, FUNDIDO, kEase.suave);
      const Comp = b.v.tipo === 'capitulo' ? null : ESCENAS_TIPO[b.v.tipo] || EscenaTexto;
      return <div key={i} style={abs(0, 0, { width: W, height: H, opacity: i === 0 ? 1 : o, zIndex: i })}>
        {Comp ? <Comp v={b.v} p={p} tl={tl} T={T} pal={b.pal} dur={b.dur} /> : <EscenaCapitulo c={b.c} tl={tl} T={T} pal={b.pal} />}
      </div>;
    })}
    </div>
    <Pelicula T={T} />
    <MarcaCapitulo T={T} />
    <RobertLargo T={T} />
    <SubtituloLargo T={T} />
  </div>;
}
// El motor acepta escenas de hasta 300 s: se parte el largo en tramos iguales (el tiempo T sigue siendo continuo).
function partes(total) { const n = Math.ceil(total / 280); return Array.from({ length: n }, (_, i) => ({ name: 'Parte ' + (i + 1), dur: +(total / n).toFixed(3) })); }
function LargoApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
    <CompositionStage width={W} height={H} scenes={JSON.stringify(partes(LINEA.total))} playback={window.OM_PLAYBACK} bg="#000">
      <DocLargo />
    </CompositionStage>
  </div>;
}
window.LargoApp = LargoApp;
