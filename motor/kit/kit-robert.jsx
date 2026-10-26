// Kit de piezas de La Creación del Robert (v1, 25 oct 2026).
// Se carga DESPUÉS de animations-v3.jsx y ANTES del jsx del shot:
//   <x-import ... from="./animations-v3.jsx ./kit-robert.jsx ./shot-xxx.jsx">
// Copia este archivo a la carpeta del shot (el servidor de render solo sirve esa carpeta).
// Todas las piezas son funciones puras del tiempo T (tiempo de autor), como el resto del motor.
// Catálogo y uso: motor/kit/LEEME.md · formatos: referencias-externas/RECETARIO.md

const KW = 1080, KH = 1920;
const KC = {
  ink:'#16120f', paper:'#f4efe4', pink:'#ff2d78', yellow:'#ffe11a', cyan:'#00d2ff', red:'#ff3b2f',
  blue:'#2346ff', mint:'#2fe0a8', violet:'#2b0f63', orange:'#ff8a1f', lilac:'#b18cff', teal:'#11a39a',
  magenta:'#e8336d', gold:'#E8A62A', gold2:'#F4C25A', coral:'#ff6b5a', white:'#ffffff', leaf:'#3fbf4a',
  dark:'#0E0F12', noche:'#0d1424', texto:'#F6F3EC',
};
const KF = { titulo:"'Anton', Impact, sans-serif", texto:"'Archivo', 'Arial Black', sans-serif", mono:"'Space Mono', ui-monospace, monospace" };
const KSOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';

/* ---------- utilidades ---------- */
function kclamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function klerp(a, b, t) { return a + (b - a) * t; }
function kprog(T, a, b, ease) { if (b <= a) return T >= a ? 1 : 0; const p = kclamp((T - a) / (b - a), 0, 1); return ease ? ease(p) : p; }
const kEase = {
  sale: (p) => 1 - Math.pow(1 - p, 4),
  suave: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  rebote: (p) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
};
function krng(seed) { return function () { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
// Movimiento orgánico: suma de senos con fase por semilla. Devuelve -1..1 aprox.
function mece(T, seed = 1, frec = 0.5) {
  const a = seed * 1.618, b = seed * 2.414;
  return (Math.sin(T * frec * 6.283 + a) * 0.6 + Math.sin(T * frec * 2.71 * 6.283 + b) * 0.3 + Math.sin(T * frec * 0.37 * 6.283 + a * b) * 0.1);
}
function kvisible(T, at, until, colchon = 0.6) { return T >= at - 0.001 && T <= (until == null ? Infinity : until + colchon); }
// Entrada/salida estándar: devuelve {o, s, y} (opacidad, escala, desplazamiento).
function kentrada(T, at, until, modo = 'pop') {
  const i = kprog(T, at, at + 0.45, modo === 'pop' ? kEase.rebote : kEase.sale);
  const o = until == null ? 1 : 1 - kprog(T, until, until + 0.35, kEase.suave);
  return { o: Math.min(kprog(T, at, at + 0.2), o), s: modo === 'pop' ? klerp(0.6, 1, i) : 1, y: (1 - i) * 60 + (1 - o) * -30 };
}
function kformato(n, dec = 0) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }

/* ---------- CÁMARA: viaje macro → micro → macro ----------
   keys: [{ t, x, y, z }] en tiempo de autor. (x, y) = punto del mundo que queda al centro; z = zoom.
   El zoom se interpola en escala logarítmica para que el acercamiento se sienta parejo. */
function camaraEn(T, keys) {
  if (!keys || !keys.length) return { x: KW / 2, y: KH / 2, z: 1 };
  if (T <= keys[0].t) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T < b.t) {
      const p = (b.ease || kEase.suave)(kclamp((T - a.t) / (b.t - a.t), 0, 1));
      const z = Math.exp(klerp(Math.log(a.z), Math.log(b.z), p));
      // con zoom fuerte, la posición avanza al ritmo del zoom (1/z) para que el destino no se "escape"
      const w = Math.abs(b.z / a.z - 1) > 0.05 ? (1 / z - 1 / a.z) / (1 / b.z - 1 / a.z) : p;
      return { x: klerp(a.x, b.x, w), y: klerp(a.y, b.y, w), z };
    }
  }
  return keys[keys.length - 1];
}
function Camara({ T, keys, respira = 1, children }) {
  const c = camaraEn(T, keys);
  // "respira": deriva mínima para que la imagen nunca quede quieta
  const dx = mece(T, 3, 0.07) * 6 * respira, dy = mece(T, 7, 0.06) * 6 * respira, r = mece(T, 11, 0.05) * 0.25 * respira;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, top:0, transformOrigin:'0 0',
        transform:`translate(${KW / 2 + dx}px, ${KH / 2 + dy}px) rotate(${r}deg) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)` }}>
        {children}
      </div>
    </div>
  );
}

/* ---------- ESCALA: barra con la medida real según el zoom ----------
   pxPorMm: cuántos píxeles del mundo mide 1 mm cuando z = 1. */
function Escala({ T, z = 1, pxPorMm, x = 60, y = 1430, color = KC.texto, objetivo = 200 }) {
  const mmPorPx = 1 / (pxPorMm * z);
  const crudo = objetivo * mmPorPx;
  const pot = Math.pow(10, Math.floor(Math.log10(crudo)));
  const pasos = [1, 2, 5, 10];
  let nice = pot; for (const s of pasos) if (s * pot <= crudo) nice = s * pot;
  const largo = nice / mmPorPx;
  let txt;
  if (nice >= 10) txt = kformato(nice / 10, nice % 10 ? 1 : 0) + ' cm';
  else if (nice >= 1) txt = kformato(nice) + ' mm';
  else if (nice >= 0.001) txt = kformato(nice * 1000) + ' µm';
  else txt = kformato(nice * 1e6) + ' nm';
  return (
    <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
      <div style={{ marginBottom:8 }}>{txt}</div>
      <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
    </div>
  );
}

/* ---------- AMBIENTE: partículas que flotan (todo respira) ---------- */
function Ambiente({ T, n = 40, seed = 5, color = 'rgba(255,255,255,.35)', tam = [4, 14], vel = 18, area = { x: 0, y: 0, w: KW, h: KH }, o = 1 }) {
  const g = krng(seed);
  const ps = Array.from({ length: n }, () => ({ x: g(), y: g(), r: klerp(tam[0], tam[1], g()), s: 0.4 + g(), f: g() * 9 }));
  return (
    <div style={{ position:'absolute', left:area.x, top:area.y, width:area.w, height:area.h, overflow:'hidden', pointerEvents:'none', opacity:o }}>
      {ps.map((p, i) => {
        const yy = ((p.y * area.h - T * vel * p.s) % area.h + area.h) % area.h;
        const xx = p.x * area.w + mece(T, p.f, 0.12) * 30;
        return <div key={i} style={{ position:'absolute', left:xx - p.r, top:yy - p.r, width:p.r * 2, height:p.r * 2, borderRadius:'50%', background:color, opacity:0.4 + 0.6 * (0.5 + 0.5 * Math.sin(T * 1.3 + p.f)) }}></div>;
      })}
    </div>
  );
}

/* ---------- BRILLO: resplandor alrededor de lo importante ---------- */
function Brillo({ color = KC.mint, fuerza = 1, children, style }) {
  return <div style={{ filter:`drop-shadow(0 0 ${10 * fuerza}px ${color}) drop-shadow(0 0 ${26 * fuerza}px ${color})`, ...style }}>{children}</div>;
}

/* ---------- APARECE: envoltorio genérico de entrada/salida ---------- */
function Aparece({ T, at, until, modo = 'pop', x, y, origen = '50% 50%', children, style }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, modo);
  return <div style={{ position:'absolute', left:x, top:y, opacity:e.o, transform:`translateY(${modo === 'fundido' ? 0 : e.y}px) scale(${e.s})`, transformOrigin:origen, ...style }}>{children}</div>;
}

/* ---------- LUPA: círculo que acerca un punto de la escena ----------
   render(Tl) dibuja la escena en coordenadas de pantalla; (fx, fy) es el punto a ampliar. */
function Lupa({ T, at, until, x, y, r = 200, zoom = 3, fx, fy, borde = KC.white, render }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return (
    <div style={{ position:'absolute', left:x - r, top:y - r, width:r * 2, height:r * 2, zIndex:35, opacity:e.o, transform:`scale(${e.s})` }}>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', overflow:'hidden', background:KC.dark, boxShadow:`0 0 0 8px ${borde}, 0 0 0 14px rgba(0,0,0,.6), 0 20px 50px rgba(0,0,0,.6)` }}>
        <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transformOrigin:'0 0', transform:`translate(${r - fx * zoom}px, ${r - fy * zoom}px) scale(${zoom})` }}>{render(T)}</div>
      </div>
    </div>
  );
}

/* ---------- TEXTO EN PANTALLA ---------- */
// Subtítulo de una línea, palabra clave entre *asteriscos* resaltada en dorado. Zona segura: bottom 560.
// idx: si existe window.SUBS[idx] (versión narrada), toma de ahí los tiempos de la voz.
function Subtitulo({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); }
    const acc = on; if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0,
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:45, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Chip / píldora: encabezado de sección, pregunta fija o regla escrita.
function Chip({ T, at, until, texto, x = KW / 2, y = 420, fondo = 'rgba(14,15,18,.82)', color = KC.texto, borde = KC.gold, tam = 40, mono = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) translateY(${e.y * 0.4}px) scale(${e.s})`, opacity:e.o,
    background:fondo, color, border:`4px solid ${borde}`, borderRadius:999, padding:'14px 34px', font:`${mono ? 700 : 900} ${tam}px/1.1 ${mono ? KF.mono : KF.texto}`, whiteSpace:'nowrap', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{texto}</div>;
}
// Mito tachado: chip que a los `tacharEn` s recibe una raya roja y se apaga.
function MitoTachado({ T, at, tacharEn, until, texto, x = KW / 2, y = 760, tam = 46 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), raya = kprog(T, tacharEn, tacharEn + 0.35, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s}) rotate(${raya * -3}deg)`, opacity:e.o }}>
    <div style={{ position:'relative', background:KC.paper, color:KC.ink, border:`5px solid ${KC.ink}`, borderRadius:18, padding:'12px 30px', font:`900 ${tam}px ${KF.texto}`, whiteSpace:'nowrap', filter:`grayscale(${raya * 0.8})`, opacity:1 - raya * 0.25 }}>
      {texto}
      <div style={{ position:'absolute', left:-12, top:'50%', height:12, width:`calc(${raya * 100}% + 24px)`, background:KC.red, borderRadius:6, transform:'translateY(-50%) rotate(-4deg)', boxShadow:'0 3px 0 rgba(0,0,0,.5)' }}></div>
    </div>
  </div>;
}
// Número gigante con conteo: "100×", "9.6 km²"…
function NumeroGigante({ T, at, until, valor, desde = 0, dur = 0.9, dec = 0, prefijo = '', sufijo = '', etiqueta, x = KW / 2, y = 560, tam = 300, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = klerp(desde, valor, kprog(T, at, at + dur, kEase.sale));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`900 44px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:6 }}>{etiqueta}</div>}
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{prefijo}{kformato(v, dec)}{sufijo}</div>
  </div>;
}
// Contador simple (para pantallas que se llenan, carreras, conteos).
function Contador({ T, at, desde = 0, hasta, dur = 2, dec = 0, sufijo = '', x, y, tam = 72, color = KC.texto }) {
  if (T < at) return null;
  const v = klerp(desde, hasta, kprog(T, at, at + dur, kEase.suave));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:'translate(-50%,-50%)', font:`700 ${tam}px ${KF.mono}`, color, textShadow:KSOMBRA, whiteSpace:'nowrap' }}>{kformato(v, dec)}{sufijo}</div>;
}
// Tarjeta del estudio: año grande + quién/dónde + revista.
function TarjetaEstudio({ T, at, until, anio, quien, revista, x = KW / 2, y = 600 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-2deg)`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'18px 40px 22px', textAlign:'center', boxShadow:`14px 14px 0 ${KC.ink}` }}>
    <div style={{ font:`400 150px/1 ${KF.titulo}`, color:KC.gold, WebkitTextStroke:`5px ${KC.ink}` }}>{anio}</div>
    {quien && <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, marginTop:6 }}>{quien}</div>}
    {revista && <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:8, fontStyle:'italic' }}>{revista}</div>}
  </div>;
}

/* ---------- SERIE Y ESTRUCTURA ---------- */
// Capítulos numerados bajo el logo: caps = [{ at, titulo }]
function Capitulo({ T, caps, hasta, x = 40, y = 330 }) {
  let i = -1; caps.forEach((c, k) => { if (T >= c.at) i = k; });
  if (i < 0 || (hasta != null && T > hasta)) return null;
  const c = caps[i], e = kprog(T, c.at, c.at + 0.4, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, display:'flex', alignItems:'center', gap:14, opacity:e, transform:`translateX(${(1 - e) * -40}px)` }}>
    <div style={{ width:56, height:56, borderRadius:14, background:KC.gold, color:KC.dark, display:'flex', alignItems:'center', justifyContent:'center', font:`400 40px ${KF.titulo}`, boxShadow:'0 6px 0 rgba(0,0,0,.6)' }}>{i + 1}</div>
    <div style={{ font:`900 34px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{c.titulo}</div>
  </div>;
}
// Pasos de la guía irónica: pasos = [{ at, texto }]
function Pasos({ T, pasos, total, hasta, y = 470 }) {
  let i = -1; pasos.forEach((p, k) => { if (T >= p.at) i = k; });
  if (i < 0 || (hasta != null && T > hasta)) return null;
  const p = pasos[i], s = klerp(1.4, 1, kprog(T, p.at, p.at + 0.4, kEase.rebote)), o = kprog(T, p.at, p.at + 0.2);
  return <div style={{ position:'absolute', left:0, right:0, top:y, zIndex:44, textAlign:'center', opacity:o }}>
    <div style={{ display:'inline-block', transform:`scale(${s})`, background:KC.red, color:KC.paper, borderRadius:20, padding:'6px 28px 10px', font:`400 92px/1 ${KF.titulo}`, boxShadow:`10px 10px 0 ${KC.ink}` }}>PASO {i + 1}{total ? <span style={{ fontSize:50, opacity:.75 }}> / {total}</span> : null}</div>
    <div style={{ font:`900 54px/1.1 ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:22, padding:'0 70px' }}>{p.texto}</div>
  </div>;
}

/* ---------- MEDIDORES Y DATOS ---------- */
// Medidor de barra. valor: número 0..1 o función (T) => 0..1. texto: función (v) => string.
function Medidor({ T, at, until, valor, etiqueta, texto, x = 90, y = 450, ancho = 900, color = KC.mint }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const v = kclamp(typeof valor === 'function' ? valor(T) : valor, 0, 1);
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', font:`700 30px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:10 }}>
      <span>{etiqueta}</span><span style={{ color }}>{texto ? texto(v) : Math.round(v * 100) + ' %'}</span>
    </div>
    <div style={{ height:34, borderRadius:17, background:'rgba(0,0,0,.55)', border:`4px solid ${KC.texto}`, overflow:'hidden' }}>
      <div style={{ width:`${v * 100}%`, height:'100%', background:color, boxShadow:`0 0 24px ${color}` }}></div>
    </div>
  </div>;
}
// Cronómetro de laboratorio (time-lapse): factor = segundos simulados por segundo real.
function Cronometro({ T, at, until, inicio = 0, factor = 1, x = KW / 2, y = 300, etiqueta }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'fundido'), s = Math.max(0, inicio + (T - at) * factor);
  const hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = Math.floor(s) % 60, f2 = (n) => String(n).padStart(2, '0');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:'translate(-50%,-50%)', opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`700 24px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, marginBottom:4, letterSpacing:'.12em' }}>{etiqueta}</div>}
    <div style={{ font:`700 64px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.6)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'4px 22px' }}>{f2(hh)}:{f2(mm)}:{f2(ss)}</div>
  </div>;
}
// Cuadrícula que se llena. llenado: 0..1 (o función de T). tramos: [{ desde, hasta, color }] en fracción 0..1.
function Cuadricula({ T, cols = 52, filas = 80, llenado, tramos = [], x = 90, y = 330, ancho = 900, alto = 1150, vacio = 'rgba(255,255,255,.12)', lleno = KC.mint }) {
  const N = cols * filas, f = kclamp(typeof llenado === 'function' ? llenado(T) : llenado, 0, 1), k = Math.floor(f * N);
  const cw = ancho / cols, ch = alto / filas, g = 0.18;
  const colorDe = (i) => { const fr = i / N; for (const t of tramos) if (fr >= t.desde && fr < t.hasta) return t.color; return lleno; };
  const rects = [];
  for (let i = 0; i < N; i++) { const c = i % cols, r = Math.floor(i / cols);
    rects.push(<rect key={i} x={c * cw + cw * g / 2} y={r * ch + ch * g / 2} width={cw * (1 - g)} height={ch * (1 - g)} rx={cw * 0.12} fill={i < k ? colorDe(i) : vacio} />); }
  return <svg style={{ position:'absolute', left:x, top:y, zIndex:30 }} width={ancho} height={alto}>{rects}</svg>;
}
// Comparativa de dos barras (Tú vs. el de al lado).
function Comparativa({ T, at, until, izq, der, max, y = 1000, alto = 360 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.2, at + 1.2, kEase.sale);
  const Barra = ({ d, cx }) => { const h = alto * (d.valor / max) * g; return <div style={{ position:'absolute', left:cx - 120, bottom:0, width:240, textAlign:'center' }}>
    <div style={{ font:`400 64px ${KF.titulo}`, color:d.color || KC.yellow, WebkitTextStroke:`3px ${KC.ink}`, marginBottom:8 }}>{d.texto || kformato(d.valor * g)}</div>
    <div style={{ height:h, background:d.color || KC.yellow, border:`6px solid ${KC.ink}`, borderRadius:'18px 18px 0 0' }}></div>
    <div style={{ marginTop:12, font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{d.etiqueta}</div>
  </div>; };
  return <div style={{ position:'absolute', left:0, top:y, width:KW, height:alto + 140, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ position:'absolute', left:0, right:0, bottom:70 }}><Barra d={izq} cx={340} /><Barra d={der} cx={740} /></div>
  </div>;
}

/* ---------- MUNDOS REUTILIZABLES ----------
   Se dibujan en coordenadas del mundo (1080×1920 a z = 1) y se meten dentro de <Camara>.
   El detalle microscópico está dibujado chiquito y aparece al acercar la cámara. */

// Piel en corte (vista lateral). Superficie en y = sup. Escala real: 1 mm ≈ pxPorMm px a z = 1.
// Zonas para acercar: epidermis (x 380–700, y sup…sup+10) y capilar (y ≈ sup+22).
const MUNDO_PIEL = { sup: 1100, pxPorMm: 60, capilarY: 1122 };
function MundoPiel({ T, fondo = KC.cyan, piel = '#f1b48f', pielOscura = '#d98f6b', sangre = '#e23b3b', seed = 4 }) {
  const { sup, capilarY } = MUNDO_PIEL;
  const g = krng(seed);
  // vellos (macro)
  const vellos = Array.from({ length: 26 }, (_, i) => ({ x: 40 + i * 40 + g() * 20, h: 140 + g() * 160, s: g() * 9 }));
  // células de la epidermis (micro): 4 capas, más planas arriba
  const celdas = [];
  for (let fila = 0; fila < 4; fila++) {
    const alto = fila === 0 ? 1.4 : 2.4, y0 = sup + [0, 1.6, 4.2, 6.8][fila], ancho = fila === 0 ? 4.2 : 2.6;
    for (let x = 380 + (fila % 2) * 1.3; x < 700; x += ancho + 0.25) {
      const col = fila === 0 ? '#f6d9c4' : mixHex('#f4c3a6', '#e79b7c', fila / 3);
      celdas.push(<rect key={fila + '_' + x.toFixed(1)} x={x} y={y0} width={ancho} height={alto} rx={0.8} fill={col} stroke={KC.ink} strokeWidth={0.18} />);
      if (fila > 0) celdas.push(<circle key={'n' + fila + '_' + x.toFixed(1)} cx={x + ancho / 2} cy={y0 + alto / 2} r={0.45} fill="#9b4f6b" />);
    }
  }
  // fibras de la dermis
  const fibras = Array.from({ length: 22 }, (_, i) => { const y = sup + 11 + i * 1.2, a = g() * 6; return <path key={'f' + i} d={`M380 ${y} C 460 ${y + Math.sin(a) * 1.5} 560 ${y - Math.cos(a) * 1.5} 700 ${y}`} fill="none" stroke="rgba(150,70,60,.35)" strokeWidth={0.3} />; });
  // glóbulos rojos que fluyen por el capilar
  const glob = Array.from({ length: 34 }, (_, i) => { const x = 380 + ((i * 9.7 + T * 14) % 320); return <ellipse key={'g' + i} cx={x} cy={capilarY + Math.sin(i * 2.1) * 0.6} rx={1.1} ry={0.75} fill={sangre} stroke="#7a1414" strokeWidth={0.15} />; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH }}>
      <div style={{ position:'absolute', left:-2000, top:-2000, width:KW + 4000, height:sup + 2000, background:fondo }}></div>
      <div style={{ position:'absolute', left:-2000, top:sup, width:KW + 4000, height:KH + 2000 - sup, background:`linear-gradient(${piel}, ${pielOscura})`, borderTop:`10px solid ${KC.ink}` }}></div>
      <svg style={{ position:'absolute', left:0, top:0, overflow:'visible' }} width={KW} height={KH}>
        {vellos.map((v, i) => { const b = mece(T, v.s, 0.35) * 18; return <path key={'v' + i} d={`M${v.x} ${sup} Q ${v.x + b * 0.5} ${sup - v.h * 0.5} ${v.x + b} ${sup - v.h}`} fill="none" stroke="#3b2418" strokeWidth={5} strokeLinecap="round" />; })}
        {fibras}
        <rect x={378} y={capilarY - 1.7} width={324} height={3.4} rx={1.7} fill="#f7c9c0" stroke="#b5463c" strokeWidth={0.3} />
        {glob}
        {celdas}
      </svg>
    </div>
  );
}
/* ---------- CÁMARA ANIDADA: zoom de ×1 a ×1000 sin perder nitidez ----------
   Dos mundos: macro (escala de cm) y micro (escala de micras). Las keys van SIEMPRE en coordenadas del
   mundo macro y Z es el zoom respecto al macro. Cuando Z pasa por `cambio`, se funde al mundo micro,
   que está dibujado a su propia escala y anclado al punto `origen` del macro.
   k = pxPorMm(micro) / pxPorMm(macro). Para la Escala usa Z y pxPorMm del macro. */
function CamaraAnidada({ T, keys, origen, k, cambio = [28, 45], macro, micro, respira = 1 }) {
  const c = camaraEn(T, keys);
  const f = kprog(Math.log(c.z), Math.log(cambio[0]), Math.log(cambio[1]));
  const dx = mece(T, 3, 0.07) * 6 * respira, dy = mece(T, 7, 0.06) * 6 * respira;
  const capa = (x, y, z, hijos, o) => (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', opacity:o }}>
      <div style={{ position:'absolute', left:0, top:0, transformOrigin:'0 0', transform:`translate(${KW / 2 + dx}px, ${KH / 2 + dy}px) scale(${z}) translate(${-x}px, ${-y}px)` }}>{hijos}</div>
    </div>
  );
  // al acercarse al microscopio el mundo macro se oscurece (como entrar a un lente) y el cambio no destella
  const osc = 0.92 * kprog(Math.log(c.z), Math.log(cambio[0] / 5), Math.log(cambio[0]));
  return (
    <div style={{ position:'absolute', inset:0 }}>
      {f < 1 && capa(c.x, c.y, c.z, macro(T, c), 1)}
      {f < 1 && osc > 0 && <div style={{ position:'absolute', inset:0, background:KC.dark, opacity:osc }}></div>}
      {f > 0 && capa((c.x - origen.x) * k, (c.y - origen.y) * k, c.z / k, micro(T, c), f)}
    </div>
  );
}

/* ---------- MUNDO PAN (moho del pan, levadura, almidón) ----------
   Macro: rebanada de frente, 1 mm = 7.5 px. Micro: corte lateral bajo un punto de la miga, 1 mm = 1500 px
   (espora ≈ 10 µm = 15 px; pelo ≈ 70 µm = 105 px; cápsula de esporas ≈ 100–170 µm). Superficie en y = 0. */
const MUNDO_PAN = { pxPorMm: 7.5, pxPorMmMicro: 1500, k: 200, mancha: { x: 620, y: 760 } };

function kArbol(seed, n = 230) {
  const key = 'arb' + seed + '_' + n; if (kArbol[key]) return kArbol[key];
  const g = krng(seed), segs = [], cola = [{ x: 0, y: 6, a: Math.PI / 2, b: 0, d: 0 }];
  while (cola.length && segs.length < n) {
    const p = cola.shift(); const L = 130 + g() * 140;
    let a = p.a + (g() - 0.5) * 0.7; const x2 = p.x + Math.cos(a) * L; let y2 = p.y + Math.sin(a) * L;
    if (y2 < 40) { a = Math.PI / 2 - (a - Math.PI / 2) * 0.3; y2 = 40 + g() * 60; }
    if (Math.abs(x2) > 3000 || y2 > 4600) continue;
    const s = { x1: p.x, y1: p.y, x2, y2, b: p.b, d: p.d }; segs.push(s);
    const nb = p.b + L / 260;
    cola.push({ x: x2, y: y2, a, b: nb, d: p.d + 1 });
    if (g() < 0.55) cola.push({ x: x2, y: y2, a: a + (g() < 0.5 ? -1 : 1) * (0.6 + g() * 0.6), b: nb + 0.2, d: p.d + 1 });
  }
  const mx = Math.max(...segs.map((s) => s.b)) + 0.4; segs.forEach((s) => { s.b /= mx; s.e = s.b + 0.4 / mx * 2; });
  return (kArbol[key] = segs);
}
function kMiga(seed) {
  const key = 'miga' + seed; if (kMiga[key]) return kMiga[key];
  const g = krng(seed);
  const alv = Array.from({ length: 70 }, () => ({ x: (g() - 0.5) * 6400, y: 250 + g() * 4800, rx: 120 + g() * 520, ry: 90 + g() * 380, r: g() * 180 }));
  const alm = Array.from({ length: 420 }, () => { const x = (g() - 0.5) * 5200, y = 40 + Math.pow(g(), 1.3) * 3600; return { x, y, rx: 10 + g() * 18, ry: 8 + g() * 12, r: g() * 180, u: Math.min(1, Math.hypot(x / 2600, y / 3200)) }; });
  return (kMiga[key] = { alv, alm });
}

// Mundo macro: fondo de la marca, tabla y rebanada de frente.
// moho 0..1 = tamaño de la mancha · rayosX 0..1 = se ve la red de hifas dentro de la miga · soplo = T del "puf" de esporas
// otra = { dx, moho } dibuja una segunda rebanada a la derecha.
function MundoPanMacro({ T, moho = 1, rayosX = 0, soplo, fondo = KC.yellow, otra, seed = 21, zCam = 1 }) {
  const M = MUNDO_PAN.mancha, g = krng(seed);
  moho = moho * (1 - kprog(zCam, 6, 16));          // muy de cerca, la mancha macro cede el lugar al mundo micro
  const hoyos = Array.from({ length: 60 }, () => ({ x: 230 + g() * 620, y: 470 + g() * 720, rx: 6 + g() * 22, ry: 4 + g() * 12, r: g() * 180 }));
  const red = kArbol(5, 230);
  const Reb = ({ ox, mh, rx }) => (
    <g transform={`translate(${ox},0)`}>
      <path d="M190 1240 L190 640 C150 470 260 360 420 380 C470 330 610 330 660 380 C820 360 930 470 890 640 L890 1240 Z" fill="#c9782f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <path d="M222 1212 L222 650 C190 500 285 410 425 425 C480 380 600 380 655 425 C795 410 890 500 858 650 L858 1212 Z" fill="#f4dfb2" />
      {hoyos.map((h, i) => <ellipse key={i} cx={h.x} cy={h.y} rx={h.rx} ry={h.ry} transform={`rotate(${h.r} ${h.x} ${h.y})`} fill="#e3c68e" />)}
      {rx > 0 && <g opacity={rx}>{red.map((s, i) => <line key={i} x1={M.x + s.x1 * 0.09} y1={M.y + s.y1 * 0.1} x2={M.x + s.x2 * 0.09} y2={M.y + s.y2 * 0.1} stroke="#ffffff" strokeWidth={3.6} strokeLinecap="round" opacity={0.9} />)}</g>}
      {mh > 0 && <g>
        <circle cx={M.x} cy={M.y} r={112 * mh} fill="#9a9a92" opacity={0.55} />
        <circle cx={M.x} cy={M.y} r={90 * mh} fill="#d8d8cf" opacity={0.75} />
        {Array.from({ length: Math.round(150 * mh) }, (_, i) => { const a = i * 2.4, d = Math.sqrt(i / 150) * 96 * mh; return <circle key={i} cx={M.x + Math.cos(a) * d} cy={M.y + Math.sin(a) * d} r={1.4 + (i % 3) * 0.5} fill="#1a1a1a" />; })}
      </g>}
    </g>
  );
  const puf = soplo != null && T >= soplo && T < soplo + 2.5 ? Array.from({ length: 40 }, (_, i) => { const u = T - soplo, a = i * 2.39, v = 60 + (i % 7) * 25; return <circle key={i} cx={M.x + Math.cos(a) * v * u} cy={M.y + Math.sin(a) * v * u - 30 * u * u} r={2.2} fill="#3a3a36" opacity={Math.max(0, 1 - u / 2.5)} />; }) : null;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH }}>
      <div style={{ position:'absolute', left:-3000, top:-3000, width:KW + 6000, height:KH + 6000, background:fondo, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.35) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
      <div style={{ position:'absolute', left:-3000, top:1235, width:KW + 6000, height:300, background:'#a8693a', borderTop:`10px solid ${KC.ink}` }}></div>
      <svg style={{ position:'absolute', left:0, top:0, overflow:'visible' }} width={KW} height={KH}>
        <Reb ox={0} mh={moho} rx={rayosX} />
        {otra && <Reb ox={otra.dx} mh={otra.moho || 0} rx={0} />}
        {puf}
      </svg>
    </div>
  );
}

// Mundo micro (corte lateral bajo la mancha). Props (todas 0..1 salvo indicadas):
// g = cuánto ha crecido la red de hifas · tallos = estolones y tallitos · capsulas = cápsulas formadas
// revientan = [T0, T1, …] momento en que revienta cada cápsula · espora = { y, germina } (y en px; null = no se dibuja)
// pelo = opacidad del pelo de comparación.
const PAN_TALLOS = [{ x: -1500, h: 900 }, { x: -950, h: 1150 }, { x: -380, h: 820 }, { x: 300, h: 1050 }, { x: 820, h: 900 }, { x: 1400, h: 1180 }, { x: 1950, h: 860 }];
function MundoPanMicro({ T, g = 0, tallos = 0, capsulas = 0, revientan = [], espora, pelo = 0, seed = 3 }) {
  const arb = kArbol(seed), miga = kMiga(seed + 1);
  const hifas = [];
  arb.forEach((s, i) => { const p = kclamp((g - s.b) / (s.e - s.b), 0, 1); if (p <= 0) return;
    const x2 = klerp(s.x1, s.x2, p), y2 = klerp(s.y1, s.y2, p);
    hifas.push(<line key={'h' + i} x1={s.x1} y1={s.y1} x2={x2} y2={y2} stroke="rgba(47,224,168,.28)" strokeWidth={34} strokeLinecap="round" />);
    hifas.push(<line key={'c' + i} x1={s.x1} y1={s.y1} x2={x2} y2={y2} stroke="#eafff7" strokeWidth={13} strokeLinecap="round" />); });
  const tal = PAN_TALLOS.map((t, i) => {
    const sub = kprog(tallos, i * 0.08, 0.45 + i * 0.08), h = t.h * sub, cy = -h;
    const tb = revientan[i], u = tb != null && T >= tb ? T - tb : -1;
    const r = (55 + (i % 3) * 14) * kEase.sale(kclamp(capsulas * 1.3 - i * 0.04, 0, 1));
    const neg = kclamp(capsulas * 2 - 0.3 - i * 0.03, 0, 1), col = mixHex('#e8e6dc', '#141414', neg);
    const esp = u >= 0 ? Array.from({ length: 26 }, (_, j) => { const a = j * 2.4, v = 220 + (j % 5) * 90; return <ellipse key={j} cx={t.x + Math.cos(a) * v * u} cy={cy + Math.sin(a) * v * u - 60 * u} rx={8} ry={6} fill="#3b342c" opacity={Math.max(0, 1 - u / 3)} />; }) : null;
    return <g key={'t' + i}>
      {sub > 0 && <path d={`M${t.x} 0 C ${t.x + 30} ${cy * 0.4} ${t.x - 25} ${cy * 0.7} ${t.x} ${cy}`} fill="none" stroke="#eafff7" strokeWidth={14} strokeLinecap="round" />}
      {sub > 0.3 && Array.from({ length: 5 }, (_, j) => <path key={j} d={`M${t.x} 6 q ${(j - 2) * 40} 90 ${(j - 2) * 70} ${140 + (j % 2) * 60}`} fill="none" stroke="#eafff7" strokeWidth={8} strokeLinecap="round" opacity={kprog(sub, 0.3, 0.7)} />)}
      {r > 1 && (u < 0 ? <g><circle cx={t.x} cy={cy} r={r} fill={col} stroke={KC.ink} strokeWidth={4} />
          {Array.from({ length: 10 }, (_, j) => <circle key={j} cx={t.x + Math.cos(j * 2.4) * r * 0.55 * Math.sqrt(j / 10)} cy={cy + Math.sin(j * 2.4) * r * 0.55 * Math.sqrt(j / 10)} r={5} fill={neg > 0.5 ? '#2c2a26' : '#cfcbbd'} />)}</g>
        : <path d={`M${t.x - r * 0.7} ${cy} A ${r * 0.7} ${r * 0.8} 0 0 1 ${t.x + r * 0.7} ${cy}`} fill="#cfcbbd" stroke={KC.ink} strokeWidth={4} />)}
      {esp}
    </g>;
  });
  const estolones = tallos > 0 ? PAN_TALLOS.slice(0, -1).map((t, i) => { const n = PAN_TALLOS[i + 1], p = kprog(tallos, 0.05 + i * 0.07, 0.3 + i * 0.07); if (!p) return null;
    const xe = klerp(t.x, n.x, p); return <path key={'e' + i} d={`M${t.x} -4 Q ${(t.x + xe) / 2} -90 ${xe} -4`} fill="none" stroke="#eafff7" strokeWidth={11} strokeLinecap="round" />; }) : null;
  let sp = null;
  if (espora && espora.y != null) {
    const gm = espora.germina || 0, s = 1 + 0.35 * kprog(gm, 0, 0.4), tubo = kprog(gm, 0.3, 1) * 120;
    sp = <g transform={`translate(0 ${espora.y})`}>
      {tubo > 0 && <line x1={0} y1={6} x2={0} y2={6 + tubo} stroke="#eafff7" strokeWidth={9} strokeLinecap="round" />}
      <ellipse cx={0} cy={0} rx={9 * s} ry={7 * s} fill="#5b4c3c" stroke={KC.ink} strokeWidth={1.6} />
      <ellipse cx={-2.5} cy={-2} rx={3} ry={2} fill="rgba(255,255,255,.35)" />
    </g>;
  }
  return (
    <div style={{ position:'absolute', left:0, top:0 }}>
      <svg style={{ position:'absolute', left:-4000, top:-6000, overflow:'visible' }} width={8000} height={12000} viewBox="-4000 -6000 8000 12000">
        <defs><linearGradient id="kpAire" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b16" /><stop offset="1" stopColor={KC.noche} /></linearGradient></defs>
        <rect x={-4000} y={-6000} width={8000} height={6000} fill="url(#kpAire)" />
        <rect x={-4000} y={0} width={8000} height={6000} fill="#2b2017" />
        {miga.alv.map((a, i) => <ellipse key={'a' + i} cx={a.x} cy={a.y} rx={a.rx} ry={a.ry} transform={`rotate(${a.r} ${a.x} ${a.y})`} fill="#150f0a" stroke="#3d2e21" strokeWidth={10} />)}
        {miga.alm.map((a, i) => { const q = 1 - kprog(g, a.u * 0.85, a.u * 0.85 + 0.25); return q > 0.02 ? <ellipse key={'s' + i} cx={a.x} cy={a.y} rx={a.rx * q} ry={a.ry * q} transform={`rotate(${a.r} ${a.x} ${a.y})`} fill="#d9b26a" opacity={0.75} /> : null; })}
        <rect x={-4000} y={-8} width={8000} height={16} fill="#6b5038" />
        {hifas}
        {estolones}
        {tal}
        {pelo > 0 && <g opacity={pelo}><rect x={60} y={-170} width={2600} height={105} rx={52} fill="#3b2418" stroke={KC.ink} strokeWidth={4} />
          {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${120 + i * 180} -168 l 60 50 l -60 52`} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth={6} />)}</g>}
        {sp}
      </svg>
    </div>
  );
}

function mixHex(a, b, t) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(klerp(v, B[i], t)).toString(16).padStart(2, '0')).join(''); }

/* ---------- MARCA ---------- */
function MarcaAgua({ T, num, hasta, logo = 'assets/logo_iso_dna_gold.svg' }) {
  if (hasta != null && T >= hasta) return null;
  return <div style={{ position:'absolute', left:38, top:180, zIndex:50 }}>
    <div style={{ background:'#fff', borderRadius:20, padding:8, boxShadow:'0 12px 30px rgba(0,0,0,.45)' }}>
      <img src={logo} alt="La Creación del Robert" style={{ width:92, height:92, display:'block' }} />
    </div>
    <div style={{ position:'absolute', top:-14, right:-20, font:`900 26px ${KF.texto}`, color:KC.dark, background:KC.gold, padding:'3px 12px', borderRadius:11, boxShadow:'0 6px 16px rgba(0,0,0,.4)' }}>#{num}</div>
  </div>;
}
// Sticker de reacción. lado: 'arriba-der' (zona libre de la guía), 'abajo-der', 'abajo-izq'.
const KLADOS = { 'arriba-der': { left:690, top:300, width:330 }, 'abajo-der': { left:640, top:1180, width:420 }, 'abajo-izq': { left:-20, top:1180, width:420 } };
function Sticker({ T, src, at, until, lado = 'arriba-der' }) {
  if (T < at || T > until + 0.45) return null;
  const L = KLADOS[lado] || KLADOS['arriba-der'];
  const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
  const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
  const desdeAbajo = lado !== 'arriba-der';
  const ty = desdeAbajo ? (1 - i) * 800 + o * 800 : 0, tx = desdeAbajo ? 0 : (1 - i) * 420 + o * 420;
  return <img src={src} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%',
    transform:`translate(${tx}px, ${ty}px) scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
}
// Tarjeta de cierre: oscurece la última imagen y muestra la marca. Dura 3–4 s (hasta llegar a 61–62 s).
function CierreMarca({ T, at, frase = 'Sígueme para más ciencia', usuario = '@lacreaciondelrobert', logo = 'assets/logo_iso_dna_gold.svg' }) {
  if (T < at) return null;
  const osc = kprog(T, at, at + 0.7, kEase.suave), s = klerp(0.5, 1, kprog(T, at + 0.2, at + 0.8, kEase.rebote)), t2 = kprog(T, at + 0.6, at + 1.1, kEase.sale);
  return <div style={{ position:'absolute', inset:0, zIndex:60, background:`rgba(8,9,12,${0.78 * osc})`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:26 }}>
    <div style={{ background:'#fff', borderRadius:44, padding:22, transform:`scale(${s})`, opacity:osc, boxShadow:'0 30px 70px rgba(0,0,0,.6)' }}>
      <img src={logo} alt="" style={{ width:260, height:260, display:'block' }} />
    </div>
    <div style={{ opacity:t2, transform:`translateY(${(1 - t2) * 30}px)`, textAlign:'center' }}>
      <div style={{ font:`400 84px/1 ${KF.titulo}`, color:KC.texto, letterSpacing:'.01em' }}>La Creación del Robert</div>
      <div style={{ font:`900 44px ${KF.texto}`, color:KC.gold2, marginTop:16 }}>{frase}</div>
      <div style={{ font:`700 32px ${KF.mono}`, color:'rgba(246,243,236,.75)', marginTop:12 }}>{usuario}</div>
    </div>
  </div>;
}

Object.assign(window, {
  KC, KF, KW, KH, kclamp, klerp, kprog, kEase, krng, mece, kentrada, kvisible, kformato, camaraEn,
  Camara, Escala, Ambiente, Brillo, Aparece, Lupa,
  Subtitulo, Chip, MitoTachado, NumeroGigante, Contador, TarjetaEstudio,
  Capitulo, Pasos, Medidor, Cronometro, Cuadricula, Comparativa,
  MarcaAgua, Sticker, CierreMarca, MundoPiel, MUNDO_PIEL, mixHex,
  CamaraAnidada, MundoPanMacro, MundoPanMicro, MUNDO_PAN, PAN_TALLOS, kArbol,
});
