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

/* ---------- LUPA: ventana circular hacia lo que no se ve ----------
   Dos modos:
   · Amplificar (como antes): render(Tl) dibuja la escena en coordenadas de pantalla y (fx, fy) es el punto a ampliar.
   · Rayos X (formato @justincase): interior(Tl, r) dibuja lo de ADENTRO en un cuadro de 2r × 2r (centro = r, r).
     El círculo se abre como iris desde el punto (fx, fy), queda unido a él con una línea, lleva una
     cuadrícula de radiografía, una franja de escaneo y una etiqueta opcional.
   x, y, fx, fy también aceptan funciones del tiempo (para seguir algo que se mueve). */
function Lupa({ T, at, until, x, y, r = 200, zoom = 3, fx, fy, borde = KC.white, render, interior, tinte = KC.cyan, etiqueta, linea = true }) {
  if (!kvisible(T, at, until)) return null;
  const v = (q) => (typeof q === 'function' ? q(T) : q);
  const X = v(x), Y = v(y), FX = v(fx), FY = v(fy);
  const rx = !!interior;
  const e = kentrada(T, at, until, rx ? 'fundido' : 'pop');
  const abre = rx ? kprog(T, at, at + 0.55, kEase.sale) : 1;              // iris que se abre
  const sale = until == null ? 0 : kprog(T, until, until + 0.35, kEase.suave);
  const k = rx ? abre * (1 - sale) : 1;
  // el círculo viaja desde el punto señalado hasta su lugar mientras se abre
  const cx = rx ? klerp(FX, X, abre) : X, cy = rx ? klerp(FY, Y, abre) : Y;
  const rr = r * (rx ? Math.max(k, 0.001) : 1);
  const dx = cx - FX, dy = cy - FY, d = Math.hypot(dx, dy) || 1;
  const ex = cx - (dx / d) * rr, ey = cy - (dy / d) * rr;                  // punto del borde que mira al objetivo
  const late = 1 + 0.25 * Math.max(0, Math.sin(T * 6.2));                  // pulso del aro en el objetivo
  const scan = ((T - at) * 0.7) % 1;                                        // franja de escaneo (0 → 1)
  return (
    <>
      {rx && linea && (
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:34, pointerEvents:'none', opacity:e.o * (1 - sale) }}>
          <circle cx={FX} cy={FY} r={22 * late} fill="none" stroke={tinte} strokeWidth="5" opacity=".9" />
          <circle cx={FX} cy={FY} r={7} fill={tinte} />
          {d > rr + 30 && <line x1={FX} y1={FY} x2={ex} y2={ey} stroke={tinte} strokeWidth="5" strokeDasharray="14 10" strokeDashoffset={-T * 40} strokeLinecap="round" />}
        </svg>
      )}
      <div style={{ position:'absolute', left:cx - r, top:cy - r, width:r * 2, height:r * 2, zIndex:35, opacity:e.o, transform:`scale(${rx ? Math.max(k, 0.001) : e.s})` }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', overflow:'hidden', background: rx ? '#06121c' : KC.dark,
          boxShadow: rx ? `0 0 0 8px ${tinte}, 0 0 40px 10px ${tinte}88, 0 0 0 16px rgba(0,0,0,.55), 0 20px 50px rgba(0,0,0,.6)` : `0 0 0 8px ${borde}, 0 0 0 14px rgba(0,0,0,.6), 0 20px 50px rgba(0,0,0,.6)` }}>
          {rx ? (
            <>
              <div style={{ position:'absolute', inset:0 }}>{interior(T, r)}</div>
              <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${tinte}22 2px, transparent 2px), linear-gradient(90deg, ${tinte}22 2px, transparent 2px)`, backgroundSize:'40px 40px', mixBlendMode:'screen' }}></div>
              <div style={{ position:'absolute', left:0, right:0, top:`${scan * 120 - 20}%`, height:'16%', background:`linear-gradient(transparent, ${tinte}40, transparent)` }}></div>
              <div style={{ position:'absolute', inset:0, borderRadius:'50%', boxShadow:'inset 0 0 60px 20px rgba(0,0,0,.65)' }}></div>
            </>
          ) : (
            <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transformOrigin:'0 0', transform:`translate(${r - FX * zoom}px, ${r - FY * zoom}px) scale(${zoom})` }}>{render(T)}</div>
          )}
        </div>
        {rx && etiqueta && (
          <div style={{ position:'absolute', left:'50%', top:r * 2 + 26, transform:'translateX(-50%)', whiteSpace:'nowrap', padding:'8px 22px', borderRadius:40,
            background:'rgba(14,15,18,.85)', border:`4px solid ${tinte}`, color:KC.texto, font:`700 34px ${KF.mono}`, letterSpacing:2, opacity:kprog(T, at + 0.4, at + 0.7) }}>{etiqueta}</div>
        )}
      </div>
    </>
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
// Red de hifas RADIAL: crece desde el punto de germinación hacia todos lados (abanico bajo la superficie;
// círculo completo con circ = true), con hifas que se curvan poco y se ramifican a 25–50°. Crece por frente:
// cada segmento "nace" según su distancia de recorrido desde la espora. Una rejilla de densidad evita grumos.
function kArbolRadial(seed, n = 420, circ = false) {
  const key = 'rad' + seed + '_' + n + (circ ? 'c' : ''); if (kArbolRadial[key]) return kArbolRadial[key];
  const g = krng(seed), segs = [], cola = [], celda = {};
  const R0 = circ ? 9 : 7;
  for (let i = 0; i < R0; i++) {
    const a = circ ? (i / R0) * Math.PI * 2 + g() * 0.3 : Math.PI * (0.05 + 0.9 * i / (R0 - 1)) + (g() - 0.5) * 0.12;
    cola.push({ x: 0, y: circ ? 0 : 8, a, d: 0 });
  }
  while (cola.length && segs.length < n) {
    cola.sort((p, q) => p.d - q.d);
    const p = cola.shift(), L = 120 + g() * 70;
    let a = p.a + (g() - 0.5) * 0.4, x2 = p.x + Math.cos(a) * L, y2 = p.y + Math.sin(a) * L;
    if (!circ && y2 < 24) { a = Math.cos(a) > 0 ? 0.06 : Math.PI - 0.06; x2 = p.x + Math.cos(a) * L; y2 = 24 + g() * 26; } // corre justo bajo la superficie
    if (Math.hypot(x2, y2) > 3300 || (!circ && y2 > 3500)) continue;
    const ck = Math.floor(x2 / 170) + ',' + Math.floor(y2 / 170); if ((celda[ck] || 0) >= 2) continue; celda[ck] = (celda[ck] || 0) + 1;
    segs.push({ x1: p.x, y1: p.y, x2, y2, d: p.d, L, c: (g() - 0.5) * 0.22 * L });
    cola.push({ x: x2, y: y2, a, d: p.d + L });
    if (g() < 0.5) cola.push({ x: x2, y: y2, a: a + (g() < 0.5 ? -1 : 1) * (0.45 + g() * 0.42), d: p.d + L + 25 });
  }
  const mx = Math.max(...segs.map((s) => s.d + s.L));
  segs.forEach((s) => { s.b = s.d / mx; s.e = (s.d + s.L) / mx; });
  return (kArbolRadial[key] = segs);
}
// Nodos de la colonia: SOLO donde la red ya llegó a la superficie. Nodo 0 = donde germinó la espora.
// b = momento (en g) en que la red alcanza ese punto · p = nodo del que sale su estolón · anillo = orden de aparición.
function nodosPan(seed = 3) {
  const key = 'nod' + seed; if (nodosPan[key]) return nodosPan[key];
  const arb = kArbolRadial(seed);
  // puntos donde una hifa ya está pegada a la superficie, del centro hacia afuera, separados ≥ 450 px
  const cand = arb.filter((s) => s.y2 <= 110).map((s) => ({ x: Math.round(s.x2), b: s.e })).sort((a, b) => Math.abs(a.x) - Math.abs(b.x));
  const ns = [{ x: 0, b: 0 }];
  for (const c of cand) { if (ns.length >= 7) break; if (ns.every((n) => Math.abs(n.x - c.x) >= 450)) ns.push(c); }
  const H = [950, 1050, 880, 1180, 1000, 900, 1100];
  ns.forEach((n, i) => {
    n.h = H[i % H.length];
    // su estolón sale del punto más cercano que esté más hacia el centro (del mismo lado o el nodo 0)
    const dentro = ns.filter((m) => m !== n && Math.abs(m.x) < Math.abs(n.x) && (m.x === 0 || Math.sign(m.x) === Math.sign(n.x)));
    n.p = i === 0 ? -1 : ns.indexOf(dentro.sort((a, b) => Math.abs(n.x - a.x) - Math.abs(n.x - b.x))[0]);
  });
  ns.forEach((n) => { let k = 0, m = n; while (m.p >= 0) { k++; m = ns[m.p]; } n.anillo = k; });
  return (nodosPan[key] = ns);
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
  const red = kArbolRadial(5, 380, true);
  const Reb = ({ ox, mh, rx }) => (
    <g transform={`translate(${ox},0)`}>
      <path d="M190 1240 L190 640 C150 470 260 360 420 380 C470 330 610 330 660 380 C820 360 930 470 890 640 L890 1240 Z" fill="#c9782f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <path d="M222 1212 L222 650 C190 500 285 410 425 425 C480 380 600 380 655 425 C795 410 890 500 858 650 L858 1212 Z" fill="#f4dfb2" />
      {hoyos.map((h, i) => <ellipse key={i} cx={h.x} cy={h.y} rx={h.rx} ry={h.ry} transform={`rotate(${h.r} ${h.x} ${h.y})`} fill="#e3c68e" />)}
      {rx > 0 && <g opacity={rx}>{red.map((s, i) => <line key={i} x1={M.x + s.x1 * 0.07} y1={M.y + s.y1 * 0.07} x2={M.x + s.x2 * 0.07} y2={M.y + s.y2 * 0.07} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.9 * kprog(rx, s.b * 0.8, s.b * 0.8 + 0.2)} />)}</g>}
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
// g = cuánto ha crecido la red de hifas (radial, desde donde germinó la espora)
// colonia = 0..1, lo que pasa DESPUÉS, siempre sobre la red que ya existe:
//   1) en los puntos donde la red llegó a la superficie salen rizoides (café, finos, como raicitas)
//   2) estolones: arcos aéreos que conectan esos puntos · 3) en cada punto sube un tallito con su cápsula.
// capsulas = cápsulas formadas · revientan = [T0, T1, …] por nodo · espora = { y, germina } · pelo = opacidad.
// (tallos = nombre viejo de colonia; se acepta igual.)
const PAN_TALLOS = nodosPan(3);
function MundoPanMicro({ T, g = 0, colonia, tallos = 0, capsulas = 0, revientan = [], espora, pelo = 0, seed = 3 }) {
  if (colonia == null) colonia = tallos;
  const arb = kArbolRadial(seed), miga = kMiga(seed + 1), nodos = nodosPan(seed);
  const hifas = [];
  arb.forEach((s, i) => { const p = kclamp((g - s.b) / (s.e - s.b), 0, 1); if (p <= 0) return;
    const nx = -(s.y2 - s.y1) / s.L, ny = (s.x2 - s.x1) / s.L;               // normal, para curvar la hifa
    const cx = (s.x1 + s.x2) / 2 + nx * s.c, cy = (s.y1 + s.y2) / 2 + ny * s.c;
    // punto final parcial sobre la curva (Bézier cuadrática)
    const q = (t) => [(1 - t) * (1 - t) * s.x1 + 2 * (1 - t) * t * cx + t * t * s.x2, (1 - t) * (1 - t) * s.y1 + 2 * (1 - t) * t * cy + t * t * s.y2];
    const [ex, ey] = q(p), [mx2, my2] = [(1 - p) * s.x1 + p * cx, (1 - p) * s.y1 + p * cy];
    const d = `M${s.x1} ${s.y1} Q ${mx2} ${my2} ${ex} ${ey}`;
    hifas.push(<path key={'h' + i} d={d} fill="none" stroke="rgba(47,224,168,.26)" strokeWidth={30} strokeLinecap="round" />);
    hifas.push(<path key={'c' + i} d={d} fill="none" stroke="#eafff7" strokeWidth={12} strokeLinecap="round" />); });
  const fases = nodos.map((t) => {
    const hay = kprog(g, t.b, t.b + 0.04);                                     // sin micelio ahí, no hay nada
    const rs = 0.06 * t.anillo, ss = 0.3 + 0.07 * (t.anillo - 1), ts = 0.55 + 0.06 * t.anillo;
    return { riz: kprog(colonia, rs, rs + 0.14) * hay, est: t.p < 0 ? 0 : kprog(colonia, ss, ss + 0.14) * hay, sub: kprog(colonia, ts, ts + 0.22) * hay };
  });
  const tal = nodos.map((t, i) => {
    const { riz, sub } = fases[i], h = t.h * sub, cy = -h;
    const tb = revientan[i], u = tb != null && T >= tb ? T - tb : -1;
    const r = sub > 0.95 ? (55 + (i % 3) * 14) * kEase.sale(kclamp(capsulas * 1.3 - i * 0.04, 0, 1)) : 0;
    const neg = kclamp(capsulas * 2 - 0.3 - i * 0.03, 0, 1), col = mixHex('#e8e6dc', '#141414', neg);
    // al madurar, la pared de la cápsula se seca y se rompe en pedazos; las esporas salen y se las lleva el aire
    // (no es una explosión). Queda la columela, pequeña y colapsada.
    const esp = u >= 0 ? <g>
      {Array.from({ length: 7 }, (_, j) => { const a0 = j * 0.9, o = Math.max(0, 1 - u / 1.4);
        return <path key={'w' + j} d={`M${t.x + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${t.x + Math.cos(a0 + 0.7) * r} ${cy + Math.sin(a0 + 0.7) * r}`}
          fill="none" stroke="#1c1b18" strokeWidth={7} strokeLinecap="round" opacity={o}
          transform={`translate(${Math.cos(a0 + 0.35) * 40 * u} ${Math.sin(a0 + 0.35) * 30 * u + 90 * u * u})`} />; })}
      {Array.from({ length: 40 }, (_, j) => { const a0 = j * 2.39, d0 = Math.sqrt(j / 40) * r * 0.9;
        const x = t.x + Math.cos(a0) * d0 + u * (70 + (j % 5) * 30) + Math.sin(u * 1.3 + j) * 18, y = cy + Math.sin(a0) * d0 - u * (18 + (j % 4) * 10);
        return <ellipse key={'s' + j} cx={x} cy={y} rx={7.5} ry={5.5} fill="#3b342c" opacity={Math.max(0, Math.min(1, 1.6 - u / 2.5))} />; })}
    </g> : null;
    // rizoides: raicitas café que se abren hacia abajo, dentro de la miga, desde el punto de la red
    const raices = riz > 0 ? Array.from({ length: 5 }, (_, j) => { const ang = Math.PI / 2 + (j - 2) * 0.42, L = riz * (130 + (j % 2) * 70);
      const x2 = t.x + Math.cos(ang) * L, y2 = 6 + Math.sin(ang) * L, bx = t.x + Math.cos(ang) * L * 0.55, by = 6 + Math.sin(ang) * L * 0.55;
      return <g key={j}><path d={`M${t.x} 6 Q ${t.x + Math.cos(ang) * L * 0.3 + 10} ${6 + Math.sin(ang) * L * 0.5} ${x2} ${y2}`} fill="none" stroke="#d6b183" strokeWidth={6} strokeLinecap="round" />
        <path d={`M${bx} ${by} l ${(j % 2 ? 1 : -1) * 34 * riz} ${42 * riz}`} fill="none" stroke="#d6b183" strokeWidth={4} strokeLinecap="round" /></g>; }) : null;
    return <g key={'t' + i}>
      {raices}
      {sub > 0 && <path d={`M${t.x} 0 C ${t.x + 30} ${cy * 0.4} ${t.x - 25} ${cy * 0.7} ${t.x} ${cy}`} fill="none" stroke="#eafff7" strokeWidth={14} strokeLinecap="round" />}
      {r > 1 && (u < 0 ? <g><circle cx={t.x} cy={cy} r={r} fill={col} stroke={KC.ink} strokeWidth={4} />
          {Array.from({ length: 10 }, (_, j) => <circle key={j} cx={t.x + Math.cos(j * 2.4) * r * 0.55 * Math.sqrt(j / 10)} cy={cy + Math.sin(j * 2.4) * r * 0.55 * Math.sqrt(j / 10)} r={5} fill={neg > 0.5 ? '#2c2a26' : '#cfcbbd'} />)}</g>
        : <path d={`M${t.x - r * 0.32} ${cy + 4} Q ${t.x - r * 0.18} ${cy - r * 0.2} ${t.x} ${cy - r * 0.16} Q ${t.x + r * 0.2} ${cy - r * 0.22} ${t.x + r * 0.32} ${cy + 6}`} fill="#4a463e" stroke={KC.ink} strokeWidth={3} />)}
      {esp}
    </g>;
  });
  // estolones: hifas aéreas que salen de un punto de la colonia, corren bajas e irregulares sobre el pan
  // y bajan a tocarlo en el punto siguiente (ahí ya hay micelio y salen rizoides). Nada de arcos perfectos.
  const estolones = nodos.map((t, i) => { const p = fases[i].est; if (!p) return null; const o = nodos[t.p];
    const pts = []; for (let k = 0; k <= 32; k++) { const u = (k / 32) * p, x = klerp(o.x, t.x, u);
      const alto = 55 * Math.pow(Math.sin(Math.PI * u), 0.7) + 16 * Math.sin(u * 11 + i * 1.7) * Math.sin(Math.PI * u);
      pts.push(x.toFixed(1) + ' ' + (-6 - Math.max(0, alto)).toFixed(1)); }
    return <path key={'e' + i} d={'M' + pts.join(' L ')} fill="none" stroke="#eafff7" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />; });
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
// tema: 'biologia' (ADN) · 'quimica' (matraz) · 'bioquimica' (los dos) · 'fisica' (átomo) · 'ia' (brillitos)
// Los SVG se generan con motor/kit/logo.mjs y se copian a assets/ del shot.
const klogo = (tema) => 'assets/logo_' + (tema || 'biologia') + '.svg';
function MarcaAgua({ T, num, hasta, tema, logo }) {
  logo = logo || klogo(tema);
  if (hasta != null && T >= hasta) return null;
  return <div style={{ position:'absolute', left:38, top:180, zIndex:50 }}>
    <div style={{ background:'#fff', borderRadius:20, padding:8, boxShadow:'0 12px 30px rgba(0,0,0,.45)' }}>
      <img src={logo} alt="La Creación del Robert" style={{ width:92, height:92, display:'block' }} />
    </div>
    <div style={{ position:'absolute', top:-14, right:-20, font:`900 26px ${KF.texto}`, color:KC.dark, background:KC.gold, padding:'3px 12px', borderRadius:11, boxShadow:'0 6px 16px rgba(0,0,0,.4)' }}>#{num}</div>
  </div>;
}
// Sticker de Robert. lado: 'arriba-der' (zona libre de la guía), 'abajo-der', 'abajo-izq',
// 'gancho' (grande arriba a la derecha, para el cuadro 0) y 'presentador' (medio cuerpo grande abajo a la derecha).
const KLADOS = { 'arriba-der': { left:690, top:300, width:330 }, 'abajo-der': { left:640, top:1180, width:420 }, 'abajo-izq': { left:-20, top:1180, width:420 },
  'gancho': { left:600, top:230, width:460 }, 'presentador': { left:500, top:1000, width:620 } };
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
// Robert presentador: todas sus apariciones del shot en una lista.
// apariciones: [[at, until, 'avatar_11_sorprendido', 'gancho'], ...]  ·  base: carpeta de los PNG.
function Robert({ T, apariciones = [], base = 'assets/stickers/' }) {
  return <>{apariciones.map(([at, until, pose, lado], i) =>
    <Sticker key={i} T={T} src={`${base}${pose}.png`} at={at} until={until} lado={lado} />)}</>;
}
// Tarjeta de cierre. robert: ruta de un sticker de Robert que sale junto al logo (obligatorio en los shots nuevos).
function CierreMarca({ T, at, frase = 'Sígueme para más ciencia', usuario = '@lacreaciondelrobert', tema, logo, robert }) {
  logo = logo || klogo(tema);
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
    {robert && <img src={robert} alt="" style={{ position:'absolute', right:-10, bottom:-40, width:470, opacity:osc,
      transform:`translateY(${(1 - kprog(T, at + 0.3, at + 0.9, kEase.rebote)) * 600}px)`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />}
  </div>;
}

/* ---------- ESTRUCTURA DE UN SHOT (añadido en el lote D, 27 oct 2026) ---------- */
// Escena con fundido cruzado (nunca corte seco) y un empujoncito de cámara. a..b = tiempo de autor.
function Escena({ T, a, b, fondo, children, zoom = 0.05, origen = '50% 45%' }) {
  if (T < a - 0.45 || T > b + 0.45) return null;
  const o = kprog(T, a - 0.45, a + 0.05) * (1 - kprog(T, b - 0.05, b + 0.45));
  const s = 1 + zoom * kprog(T, a - 0.45, b + 0.45, kEase.suave);
  return <div style={{ position:'absolute', inset:0, opacity:o, background:fondo, overflow:'hidden' }}>
    <div style={{ position:'absolute', inset:0, transform:`scale(${s})`, transformOrigin:origen }}>{children}</div>
  </div>;
}
// Etiqueta con línea (nombre común o *científico* con it). lado: 'der' | 'izq'.
function Etq({ T, at, until, x, y, texto, it = false, lado = 'der', color = KC.texto, tam = 34 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:70 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>
    <div style={{ font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}
// Audio sincronizado al tiempo de reproducción (en el render se usa --audio; esto es para verlo en el navegador).
function AudioPista({ src }) {
  const { time, playing } = useComposition();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a || !src) return;
    if (playing) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(a.currentTime - time) > 0.25) a.currentTime = time; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - time) > 0.05) a.currentTime = time; }
  });
  return src ? <audio ref={ref} src={src} preload="auto" style={{ display:'none' }} /> : null;
}
// Envuelve un componente de shot en el escenario 1080×1920: window.MiApp = kApp(MiShot)
function kApp(Comp) {
  return function () {
    return <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Comp /></CompositionStage>
    </div>;
  };
}
// Foto real recortada como tarjeta (polaroid) que entra girando y "respira". src en assets/. w×h = tamaño de la foto.
function FotoRecorte({ T, at, until, src, x, y, w = 520, h = 520, rot = -3, pie, seed = 1, borde = KC.paper, zoom = 0.06 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), k = kprog(T, at, at + 6), r = rot + mece(T, seed, 0.12) * 1.5;
  return <div style={{ position:'absolute', left:x - w / 2 - 18, top:y - h / 2 - 18, zIndex:38, opacity:e.o, transform:`translateY(${e.y}px) scale(${e.s}) rotate(${r}deg)`,
    background:borde, padding:'18px 18px ' + (pie ? 70 : 18) + 'px', borderRadius:18, boxShadow:`12px 14px 0 ${KC.ink}, 0 20px 50px rgba(0,0,0,.5)`, border:`5px solid ${KC.ink}` }}>
    <div style={{ width:w, height:h, overflow:'hidden', borderRadius:8, border:`4px solid ${KC.ink}` }}>
      <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transform:`scale(${1 + zoom * k})` }} />
    </div>
    {pie && <div style={{ position:'absolute', left:0, right:0, bottom:14, textAlign:'center', font:`700 32px ${KF.mono}`, color:KC.ink }}>{pie}</div>}
  </div>;
}

// Precarga: deja montadas (invisibles) todas las fotos desde el cuadro 0, para que nunca salga una tarjeta en blanco
// mientras el navegador decodifica la imagen (el render toma cada cuadro en cuanto se pide).
function Precarga({ srcs }) {
  return <div style={{ position:'absolute', left:0, top:0, width:2, height:2, overflow:'hidden', opacity:0.01, pointerEvents:'none' }}>
    {srcs.map((s) => <img key={s} src={s} alt="" style={{ width:2, height:2 }} />)}
  </div>;
}

/* ---------- HONGOS: champiñón, suelo con micelio, hifas de cerca, levadura ---------- */
// Champiñón (Agaricus): base del pie en (x, y). crece 0..1 (primordio → adulto), abre 0..1 (botón cerrado → sombrero
// abierto con laminillas y anillo). corte = true dibuja el corte longitudinal (carne y laminillas en sección).
function Champinon({ x = 0, y = 0, s = 1, crece = 1, abre = 1, rot = 0, sombrero = '#efe2cc', sombra = '#cdb795', lam = '#7a4a3a', pie = '#f6eedf', borde = 7 }) {
  if (crece <= 0) return null;
  const c = kclamp(crece, 0, 1), a = kclamp(abre, 0, 1);
  const hPie = klerp(18, 150, c), wPie = klerp(16, 54, c);
  const rC = klerp(16, 150, c) * klerp(0.72, 1, a), alto = rC * klerp(0.95, 0.56, a);
  const yC = -hPie;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${-wPie * 0.62} 0 C ${-wPie * 0.5} ${-hPie * 0.5}, ${-wPie * 0.45} ${-hPie * 0.8}, ${-wPie * 0.42} ${yC} L ${wPie * 0.42} ${yC} C ${wPie * 0.45} ${-hPie * 0.8}, ${wPie * 0.5} ${-hPie * 0.5}, ${wPie * 0.62} 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    {a > 0.35 && <path d={`M ${-wPie * 0.5} ${yC + hPie * 0.22} q ${wPie * 0.5} ${12 * a} ${wPie} 0 l ${4} ${16 * a} q ${-wPie * 0.55} ${10 * a} ${-wPie - 8} 0 Z`} fill="#fbf6ec" stroke={KC.ink} strokeWidth={borde * 0.6} opacity={kprog(a, 0.35, 0.6)} />}
    {a > 0.15 && <g opacity={kprog(a, 0.15, 0.45)}>
      <path d={`M ${-rC * 0.96} ${yC - 2} Q 0 ${yC + alto * 0.28} ${rC * 0.96} ${yC - 2}`} fill={lam} stroke={KC.ink} strokeWidth={borde * 0.7} />
      {Array.from({ length: 13 }, (_, i) => { const u = (i + 0.5) / 13 * 2 - 1; return <line key={i} x1={u * rC * 0.9} y1={yC - 2} x2={u * wPie * 0.45} y2={yC + alto * 0.1} stroke="#4d2c22" strokeWidth={2.5} />; })}
    </g>}
    <path d={`M ${-rC} ${yC} C ${-rC} ${yC - alto * 1.25}, ${rC} ${yC - alto * 1.25}, ${rC} ${yC} Q 0 ${yC + alto * 0.12} ${-rC} ${yC} Z`} fill={sombrero} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    <path d={`M ${-rC * 0.55} ${yC - alto * 0.75} Q ${-rC * 0.1} ${yC - alto * 0.95} ${rC * 0.25} ${yC - alto * 0.8}`} fill="none" stroke="#fff" strokeWidth={borde * 1.2} strokeLinecap="round" opacity=".55" />
    {[[-0.4, -0.45], [0.3, -0.55], [0.05, -0.3]].map(([u, v], i) => <ellipse key={i} cx={u * rC} cy={yC + v * alto} rx={rC * 0.07} ry={alto * 0.05} fill={sombra} opacity=".7" />)}
  </g>;
}
// Suelo en corte con hojarasca y la red de micelio (vista lateral). Superficie en y = sup.
// red 0..1 = cuánto ha crecido el micelio (desde ox), brillo 0..1 = el micelio se ilumina (rayos X).
const MUNDO_SUELO = { sup: 1180 };
function MundoSuelo({ T, red = 1, brillo = 0, ox = 540, sup = MUNDO_SUELO.sup, cielo = KC.mint, seed = 8, escala = 0.15, hojas = true, children }) {
  const g = krng(seed), arb = kArbolRadial(seed, 320);
  const piedras = Array.from({ length: 26 }, () => ({ x: g() * KW, y: sup + 40 + g() * 700, r: 8 + g() * 26, c: g() < 0.5 ? '#7a5a40' : '#8f6d4f' }));
  const hoja = Array.from({ length: 16 }, () => ({ x: g() * KW, r: g() * 360, s: 0.7 + g() * 0.6, c: ['#d9822b', '#b5651d', '#e0a43a', '#8a5a2b'][Math.floor(g() * 4)] }));
  const H = arb.map((sg, i) => { const p = kclamp((red - sg.b) / (sg.e - sg.b), 0, 1); if (p <= 0) return null;
    const x1 = ox + sg.x1 * escala, y1 = sup + 8 + sg.y1 * escala, x2 = ox + (sg.x1 + (sg.x2 - sg.x1) * p) * escala, y2 = sup + 8 + (sg.y1 + (sg.y2 - sg.y1) * p) * escala;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={brillo > 0 ? mixHex('#f4ecd8', '#eafff7', brillo) : '#f4ecd8'} strokeWidth={2.6 + brillo * 1.4} strokeLinecap="round" opacity={0.7 + 0.3 * brillo} />; });
  return <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH }}>
    <div style={{ position:'absolute', left:-2000, top:-2000, width:KW + 4000, height:sup + 2000, background:cielo, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
    <div style={{ position:'absolute', left:-2000, top:sup, width:KW + 4000, height:KH + 2000 - sup, background:'linear-gradient(#6b4a32, #3e2a1c 60%)', borderTop:`10px solid ${KC.ink}` }}></div>
    <svg style={{ position:'absolute', left:0, top:0, overflow:'visible' }} width={KW} height={KH}>
      {piedras.map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx={p.r} ry={p.r * 0.7} fill={p.c} opacity=".8" />)}
      {brillo > 0 && <rect x={-2000} y={sup + 6} width={KW + 4000} height={KH} fill="#0E0F12" opacity={0.55 * brillo} />}
      <g style={{ filter: brillo > 0 ? `drop-shadow(0 0 ${6 * brillo}px #2fe0a8)` : 'none' }}>{H}</g>
      {hojas && hoja.map((h, i) => <ellipse key={i} cx={h.x} cy={sup - 4} rx={34 * h.s} ry={11 * h.s} transform={`rotate(${(h.r % 30) - 15} ${h.x} ${sup - 4})`} fill={h.c} stroke={KC.ink} strokeWidth={4} />)}
      {children}
    </svg>
  </div>;
}
// Hifas de cerca (fondo oscuro): tubos con septos y núcleos que crecen por la punta. En pantalla (no en mundo).
// g 0..1 = crecimiento. enzimas 0..1 = la punta suelta enzimas (puntitos) que deshacen un pedazo de hoja (comida).
function HifasMicro({ T, g = 1, enzimas = 0, comida = { x: 820, y: 760 }, ancho = 34, seed = 6, color = '#eafff7' }) {
  const rutas = [
    [[60, 1250], [300, 1120], [520, 980], [700, 860], [790, 790]],
    [[300, 1120], [330, 900], [280, 700], [300, 520]],
    [[520, 980], [640, 1080], [860, 1120], [1020, 1060]],
    [[60, 1250], [160, 1450], [420, 1560], [640, 1520]],
  ];
  const tramo = (pts, p) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let rest = tot * p; const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { if (rest >= L[i - 1]) { out.push(pts[i]); rest -= L[i - 1]; } else { const u = rest / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } } return out; };
  const comidaQ = 1 - 0.75 * kprog(enzimas, 0.15, 1);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <g transform={`translate(${comida.x} ${comida.y}) rotate(${mece(T, 2, 0.1) * 4})`} opacity={0.4 + 0.6 * comidaQ}>
      <path d={`M ${-140 * comidaQ} 0 C ${-80 * comidaQ} ${-90 * comidaQ}, ${90 * comidaQ} ${-90 * comidaQ}, ${150 * comidaQ} 0 C ${90 * comidaQ} ${80 * comidaQ}, ${-80 * comidaQ} ${80 * comidaQ}, ${-140 * comidaQ} 0 Z`} fill="#c9822f" stroke="#5a3a1c" strokeWidth={6} />
      <path d={`M ${-120 * comidaQ} 0 L ${130 * comidaQ} 0`} stroke="#8a5a2b" strokeWidth={5} />
    </g>
    {rutas.map((r, i) => { const p = kclamp(g * 1.25 - i * 0.12, 0, 1); if (p <= 0) return null; const pts = tramo(r, p), d = 'M' + pts.map((q) => q.join(' ')).join(' L ');
      const tip = pts[pts.length - 1];
      return <g key={i}>
        <path d={d} fill="none" stroke="rgba(47,224,168,.22)" strokeWidth={ancho * 2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={KC.ink} strokeWidth={ancho + 8} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" />
        {pts.slice(1).map((q, k) => { const a = pts[k], mx = (a[0] + q[0]) / 2, my = (a[1] + q[1]) / 2, an = Math.atan2(q[1] - a[1], q[0] - a[0]);
          return <g key={k}><line x1={mx - Math.sin(an) * ancho * 0.5} y1={my + Math.cos(an) * ancho * 0.5} x2={mx + Math.sin(an) * ancho * 0.5} y2={my - Math.cos(an) * ancho * 0.5} stroke="#8fbfb0" strokeWidth={4} />
            <circle cx={klerp(a[0], q[0], 0.25)} cy={klerp(a[1], q[1], 0.25) + mece(T, i * 7 + k, 0.3) * 3} r={6} fill="#b18cff" /></g>; })}
        {p < 1 && <circle cx={tip[0]} cy={tip[1]} r={ancho * 0.62} fill="#fff" opacity={0.5 + 0.5 * Math.sin(T * 5 + i)} />}
      </g>; })}
    {enzimas > 0 && Array.from({ length: 60 }, (_, k) => { const u = ((T * 0.45 + k / 60) % 1), ida = k % 2 === 0;
      const sx = 790, sy = 790, x = ida ? klerp(sx, comida.x + Math.cos(k) * 90, u) : klerp(comida.x + Math.cos(k) * 70, sx, u), y = ida ? klerp(sy, comida.y + Math.sin(k) * 50, u) : klerp(comida.y + Math.sin(k) * 50, sy, u);
      return <circle key={k} cx={x + mece(T, k, 0.4) * 10} cy={y + mece(T, k + 9, 0.4) * 10} r={ida ? 11 : 8} fill={ida ? KC.yellow : KC.mint} opacity={enzimas * Math.sin(Math.PI * u)} />; })}
  </svg>;
}
// Levadura (Saccharomyces): célula ovalada con núcleo y vacuola; brote 0..1 = la yema que crece a un lado.
function Levadura({ x = 0, y = 0, r = 60, brote = 0, rot = 0, T = 0, seed = 1 }) {
  const b = kclamp(brote, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.15) * 5})`}>
    {b > 0 && <g><ellipse cx={r * 0.95 + r * 0.32 * b} cy={-r * 0.35} rx={r * 0.55 * b} ry={r * 0.48 * b} fill="#f4dc9a" stroke={KC.ink} strokeWidth={5} />
      <circle cx={r * 0.95 + r * 0.36 * b} cy={-r * 0.35} r={r * 0.15 * b} fill="#b18cff" /></g>}
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.82} fill="#f4dc9a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-r * 0.2} cy={r * 0.1} rx={r * 0.34} ry={r * 0.3} fill="#9fd8f0" opacity=".85" />
    <circle cx={r * 0.32} cy={-r * 0.18} r={r * 0.2} fill="#b18cff" stroke="#6b4fb5" strokeWidth={3} />
    <circle cx={-r * 0.55} cy={-r * 0.4} r={r * 0.08} fill="#d9b26a" /><circle cx={r * 0.5} cy={r * 0.45} r={r * 0.07} fill="#d9b26a" />
  </g>;
}

/* ---------- LABORATORIO: placa de Petri, estriado, asa y mechero ---------- */
// Placa de Petri vista desde arriba (svg). agar = color del medio. children se dibujan dentro del círculo (recortados).
function PlacaPetri({ x, y, r = 380, agar = '#f1d27a', tapa = 0, id = 'pp', children, gota = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id + 'c'}><circle r={r - 14} /></clipPath>
      <radialGradient id={id + 'g'} cx="40%" cy="35%" r="75%"><stop offset="0" stopColor={mixHex(agar, '#ffffff', 0.35)} /><stop offset="1" stopColor={agar} /></radialGradient></defs>
    <circle r={r + 10} fill="rgba(0,0,0,.25)" transform="translate(16 18)" />
    <circle r={r} fill="#dfeef2" stroke={KC.ink} strokeWidth={9} />
    <circle r={r - 14} fill={`url(#${id}g)`} />
    <g clipPath={`url(#${id}c)`}>{children}</g>
    <circle r={r - 14} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth={6} />
    <path d={`M ${-r * 0.62} ${-r * 0.55} A ${r * 0.85} ${r * 0.85} 0 0 1 ${r * 0.1} ${-r * 0.82}`} fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity=".55" />
    {tapa > 0 && <g opacity={tapa}><circle r={r + 6} fill="rgba(220,240,246,.35)" stroke={KC.ink} strokeWidth={7} />
      {gota > 0 && Array.from({ length: 22 }, (_, i) => { const a = i * 2.4, d = Math.sqrt((i + 1) / 22) * r * 0.85; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={(6 + (i % 4) * 4) * gota} fill="rgba(255,255,255,.75)" stroke="rgba(0,80,120,.35)" strokeWidth={2} />; })}</g>}
  </g>;
}
// Trazo del estriado por agotamiento en 4 cuadrantes (coordenadas de la placa, radio R).
// Devuelve { trazos: [[x,y]...] × 4, colonias: [{ x, y, r, q }] } — muchas colonias juntas en el 1, pocas y sueltas en el 4.
function kEstriado(R = 360, seed = 4) {
  const key = 'est' + R + '_' + seed; if (kEstriado[key]) return kEstriado[key];
  const g = krng(seed), trazos = [], colonias = [];
  const base = [-135, -45, 45, 135].map((a) => a * Math.PI / 180);       // cuadrante 1 arriba-izq, luego gira 90°
  base.forEach((th, q) => {
    const pts = [], n = [9, 7, 6, 6][q], ux = Math.cos(th), uy = Math.sin(th), vx = -uy, vy = ux;
    // entra cruzando el final del trazo anterior (salvo el 1) y zigzaguea hacia afuera
    if (q > 0) { const prev = trazos[q - 1].at(-1); pts.push([prev[0] * 0.92, prev[1] * 0.92]); }
    // zigzag dentro de su cuadrante: |v| ≤ 0.78·u (no invade la zona vecina) y dentro del círculo
    for (let i = 0; i < n; i++) { const u = (0.3 + 0.56 * (i / (n - 1))) * R, w = Math.min(0.78 * u, Math.sqrt(Math.max(0, R * R * 0.9 - u * u))) * (i % 2 ? 1 : -1);
      pts.push([ux * u + vx * w + (g() - 0.5) * 10, uy * u + vy * w + (g() - 0.5) * 10]); }
    trazos.push(pts);
    const cuantas = [260, 70, 22, 7][q];
    for (let k = 0; k < cuantas; k++) { const s = Math.floor(g() * (pts.length - 1)), u = g(), a = pts[s], b = pts[s + 1];
      const j = (g() - 0.5) * [26, 18, 12, 8][q];
      colonias.push({ x: klerp(a[0], b[0], u) + j, y: klerp(a[1], b[1], u) + j * 0.7, r: [9, 11, 15, 22][q] * (0.75 + g() * 0.5), q, o: g() }); }
  });
  return (kEstriado[key] = { trazos, colonias });
}
// Polilínea parcial: los primeros p (0..1) de un trazo, para "dibujarlo" en vivo.
function kParcial(pts, p) {
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const meta = L.at(-1) * kclamp(p, 0, 1), out = [pts[0]];
  for (let i = 1; i < pts.length; i++) { if (L[i] <= meta) out.push(pts[i]); else { const u = (meta - L[i - 1]) / (L[i] - L[i - 1] || 1); out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } }
  return out;
}
// Asa de siembra (vista de lado): punta del aro en (x, y). caliente 0..1 = rojo vivo.
function Asa({ x, y, ang = -35, caliente = 0, s = 1 }) {
  const rojo = mixHex('#c9ccd2', '#ff5a1f', kclamp(caliente, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    {caliente > 0.05 && <circle cx={0} cy={0} r={34} fill="#ff8a1f" opacity={0.35 * caliente} />}
    <circle cx={0} cy={0} r={16} fill="none" stroke={KC.ink} strokeWidth={10} /><circle cx={0} cy={0} r={16} fill="none" stroke={rojo} strokeWidth={5} />
    <line x1={16} y1={0} x2={330} y2={0} stroke={KC.ink} strokeWidth={10} /><line x1={16} y1={0} x2={330} y2={0} stroke={rojo} strokeWidth={5} />
    <rect x={330} y={-17} width={260} height={34} rx={14} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={350} y={-9} width={200} height={8} rx={4} fill="#7f95ff" />
  </g>;
}
// Mechero con llama que tiembla. Base en (x, y).
function Mechero({ T, x, y, s = 1, llama = 1 }) {
  const f = 1 + 0.08 * Math.sin(T * 23) + 0.05 * Math.sin(T * 37);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-26} width={160} height={30} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-22} y={-210} width={44} height={190} rx={8} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
    {llama > 0 && <g transform={`translate(0 -210) scale(${llama} ${llama * f})`}>
      <path d="M 0 -170 C 40 -110, 44 -40, 0 0 C -44 -40, -40 -110, 0 -170 Z" fill="#5aa8ff" opacity=".55" />
      <path d="M 0 -110 C 22 -70, 24 -26, 0 0 C -24 -26, -22 -70, 0 -110 Z" fill="#2346ff" opacity=".9" />
    </g>}
  </g>;
}

/* ---------- SETAS OSTRA (Pleurotus) y BOLSA DE CULTIVO ---------- */
// Seta ostra vista de lado: sombrero en abanico con laminillas que bajan por el pie corto y lateral.
// Base del pie en (x, y). abre 0..1 (primordio → abanico abierto). pie: factor de largo del pie (con CO₂ alto, pie largo y sombrero chico).
function SetaOstra({ x = 0, y = 0, s = 1, abre = 1, rot = 0, color = '#f59ab0', oscuro = '#d9668a', pie = 1, borde = 6 }) {
  const a = kclamp(abre, 0, 1), w = klerp(18, 150, a), h = klerp(16, 60, a), L = 40 * pie + 10;
  const cx = L * 0.9, cy = -L * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -10 4 Q ${L * 0.4} ${-L * 0.1} ${cx} ${cy + 10} L ${cx + 10} ${cy + 22} Q ${L * 0.45} ${L * 0.1} 10 8 Z`} fill={mixHex(color, '#ffffff', 0.35)} stroke={KC.ink} strokeWidth={borde * 0.8} strokeLinejoin="round" />
    <path d={`M ${cx - w * 0.15} ${cy + 8} Q ${cx + w * 0.45} ${cy + h * 1.15} ${cx + w} ${cy + h * 0.25} L ${cx + w * 0.92} ${cy - h * 0.1} Q ${cx + w * 0.4} ${cy + h * 0.2} ${cx - w * 0.15} ${cy + 8} Z`} fill={oscuro} stroke={KC.ink} strokeWidth={borde * 0.7} />
    {a > 0.2 && Array.from({ length: 9 }, (_, i) => { const u = (i + 1) / 10; return <line key={i} x1={cx + 4} y1={cy + 12} x2={cx + w * (0.1 + u * 0.85)} y2={cy + h * (0.95 - u * 0.65)} stroke={mixHex(oscuro, KC.ink, 0.35)} strokeWidth={2.5} opacity={kprog(a, 0.2, 0.5)} />; })}
    <path d={`M ${cx - w * 0.2} ${cy + 6} C ${cx - w * 0.1} ${cy - h * 1.2}, ${cx + w * 0.9} ${cy - h * 1.3}, ${cx + w * 1.05} ${cy + h * 0.22} Q ${cx + w * 0.5} ${cy - h * 0.05} ${cx - w * 0.2} ${cy + 6} Z`} fill={color} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    <path d={`M ${cx + w * 0.1} ${cy - h * 0.55} Q ${cx + w * 0.45} ${cy - h * 0.85} ${cx + w * 0.8} ${cy - h * 0.4}`} fill="none" stroke="#fff" strokeWidth={borde} strokeLinecap="round" opacity=".45" />
  </g>;
}
// Racimo de setas ostra que sale de un punto (x, y), en abanico hacia la derecha y la izquierda.
function RacimoOstra({ T = 0, x, y, s = 1, abre = 1, n = 7, color, oscuro, pie = 1, seed = 3 }) {
  const g = krng(seed), hs = Array.from({ length: n }, (_, i) => ({ r: -70 + (i / (n - 1)) * 120 + (g() - 0.5) * 14, k: 0.7 + g() * 0.45, d: (i % 3) * 0.08, lado: i % 2 ? 1 : -1 }));
  return <g transform={`translate(${x} ${y})`}>{hs.map((h, i) => <g key={i} transform={`scale(${h.lado} 1)`}>
    <SetaOstra s={s * h.k} rot={h.r * h.lado * 0.5 - 20 + mece(T, seed + i, 0.2) * 3} abre={kclamp(abre * 1.2 - h.d, 0, 1)} color={color} oscuro={oscuro} pie={pie} /></g>)}</g>;
}
// Bolsa de cultivo (vista de frente): plástico translúcido con sustrato y micelio blanco. col 0..1 = colonizado.
function BolsaCultivo({ T = 0, x, y, w = 420, h = 620, col = 1, seed = 5, rayos = 0 }) {
  const g = krng(seed), trozos = Array.from({ length: 90 }, () => ({ x: (g() - 0.5) * w * 0.86, y: -h * 0.4 + g() * h * 0.82, r: 6 + g() * 14, a: g() * 180, c: g() < 0.5 ? '#c98a3e' : '#a86d2c' }));
  const blanco = Array.from({ length: 70 }, () => ({ x: (g() - 0.5) * w * 0.86, y: -h * 0.4 + g() * h * 0.82, r: 16 + g() * 34, u: g() }));
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, seed, 0.1) * 1.2})`}>
    <path d={`M ${-w / 2} ${-h * 0.42} Q ${-w / 2 - 10} ${h * 0.45} ${-w * 0.42} ${h / 2} L ${w * 0.42} ${h / 2} Q ${w / 2 + 10} ${h * 0.45} ${w / 2} ${-h * 0.42} Z`} fill="#8a5a2b" />
    {trozos.map((t, i) => <rect key={i} x={t.x - t.r} y={t.y - t.r * 0.4} width={t.r * 2} height={t.r * 0.8} rx={3} transform={`rotate(${t.a} ${t.x} ${t.y})`} fill={t.c} />)}
    {blanco.map((b, i) => b.u < col ? <circle key={i} cx={b.x} cy={b.y} r={b.r * kclamp((col - b.u) * 4, 0, 1)} fill="#fbf7ee" opacity={0.85} /> : null)}
    {rayos > 0 && <rect x={-w / 2} y={-h * 0.42} width={w} height={h * 0.92} fill="#0E0F12" opacity={0.5 * rayos} />}
    <path d={`M ${-w / 2 - 6} ${-h / 2} L ${w / 2 + 6} ${-h / 2} Q ${w / 2 + 22} ${h * 0.45} ${w * 0.44} ${h / 2 + 6} L ${-w * 0.44} ${h / 2 + 6} Q ${-w / 2 - 22} ${h * 0.45} ${-w / 2 - 6} ${-h / 2} Z`} fill="rgba(230,245,255,.22)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w * 0.36} ${-h * 0.4} L ${-w * 0.3} ${h * 0.36}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".35" />
    <rect x={-w * 0.2} y={-h / 2 - 50} width={w * 0.4} height={56} rx={14} fill="rgba(230,245,255,.4)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

/* ---------- QUÍMICA: termómetro y cadena de anillos ---------- */
// Termómetro vertical (svg a pantalla completa). valor en °C, max = tope de la escala, rango = [a, b] franja resaltada.
function Termometro({ x, y, valor = 20, max = 100, alto = 620, rango, marcas = [0, 25, 50, 75, 100], color = KC.red }) {
  const t2y = (c) => y + alto - (kclamp(c, 0, max) / max) * alto;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>
    <rect x={x - 40} y={y} width={80} height={alto} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {rango && <rect x={x - 70} y={t2y(rango[1])} width={140} height={t2y(rango[0]) - t2y(rango[1])} rx={12} fill={KC.yellow} opacity=".55" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />}
    <rect x={x - 20} y={t2y(valor)} width={40} height={y + alto - t2y(valor)} rx={20} fill={color} />
    <circle cx={x} cy={y + alto + 40} r={70} fill={color} stroke={KC.ink} strokeWidth={8} />
    {marcas.map((c) => <g key={c}><line x1={x + 40} y1={t2y(c)} x2={x + 70} y2={t2y(c)} stroke={KC.ink} strokeWidth={5} /><text x={x + 82} y={t2y(c) + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{c}°</text></g>)}
  </svg>;
}
// Cadena de anillos de azúcar (hexágonos unidos), para polisacáridos: agarosa, quitina, almidón, celulosa…
// p 0..1 = cuántos anillos ya se armaron (de izquierda a derecha). marca(i) opcional = color de un anillo (p. ej. sulfato).
function CadenaAnillos({ x, y, n = 7, p = 1, s = 1, color = KC.gold2, paso = 118, marca, ondula = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const q = kclamp(p * n - i, 0, 1); if (q <= 0) return null; const cx = i * paso, cy = (i % 2 ? 18 : -18) + ondula * Math.sin(T * 2 + i * 0.8) * 30;
      const col = (marca && marca(i)) || color;
      const hex = [0, 60, 120, 180, 240, 300].map((a) => `${cx + 44 * Math.cos((a + 30) * Math.PI / 180)},${cy + 44 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ');
      const py = (i - 1) % 2 ? 18 : -18, pcy = py + ondula * Math.sin(T * 2 + (i - 1) * 0.8) * 30;
      return <g key={i} opacity={q} transform={`translate(0 ${(1 - q) * 30})`}>
        {i > 0 && <line x1={cx - paso + 40} y1={pcy} x2={cx - 40} y2={cy} stroke={color} strokeWidth={8} />}
        <polygon points={hex} fill={col + '33'} stroke={col} strokeWidth={8} strokeLinejoin="round" />
        <circle cx={cx + 20} cy={cy - 8} r={7} fill={col} />
      </g>; })}
  </g>;
}

Object.assign(window, {
  KC, KF, KW, KH, KSOMBRA, kclamp, klerp, kprog, kEase, krng, mece, kentrada, kvisible, kformato, camaraEn,
  Camara, Escala, Ambiente, Brillo, Aparece, Lupa,
  Subtitulo, Chip, MitoTachado, NumeroGigante, Contador, TarjetaEstudio,
  Capitulo, Pasos, Medidor, Cronometro, Cuadricula, Comparativa,
  MarcaAgua, Sticker, Robert, CierreMarca, klogo, MundoPiel, MUNDO_PIEL, mixHex,
  CamaraAnidada, MundoPanMacro, MundoPanMicro, MUNDO_PAN, PAN_TALLOS, kArbol, kArbolRadial, nodosPan,
  Escena, Etq, AudioPista, kApp, FotoRecorte, Precarga, Champinon, MundoSuelo, MUNDO_SUELO, HifasMicro, Levadura,
  PlacaPetri, kEstriado, kParcial, Asa, Mechero, SetaOstra, RacimoOstra, BolsaCultivo, Termometro, CadenaAnillos,
});
