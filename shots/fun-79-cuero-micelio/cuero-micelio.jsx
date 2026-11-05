// Shot Fungi Mati #79 · Esa cartera no es de piel de vaca: es de hongo — NARRADO (gancho 1 "Esto no es X: es Y", formato N1 + N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Sin logos de marcas reales.

const CM = { cuero:'#8a5634', cuero2:'#6b3f24', cuero3:'#a8703f', costura:'#f0cf9a', micelio:'#f3ecd9', micelio2:'#fffaf0', hifaBorde:'#8f846c',
  aserrin:'#c99a5b', aserrin2:'#a8763c', pu:'#5aa8ff', pu2:'#bfe0ff', colageno:'#ff7a6b', colageno2:'#ffb3a6', tanino:'#7a4a1c', acero:'#5b6470' };

// Etiqueta con línea y contenido libre (para mezclar texto normal y *cursiva*).
function EtqR({ T, at, until, x, y, children, color = KC.texto, tam = 30 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, transform:'translate(0, -50%)' }}>
    <div style={{ width:60 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>
    <div style={{ font:`700 ${tam}px ${KF.mono}`, color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{children}</div>
  </div>;
}
// Título grande (Anton) con contorno.
function Titulo({ T, at, until, texto, x = 60, y = 420, tam = 104, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translateY(-50%) scale(${e.s})`, transformOrigin:'0 50%', opacity:e.o,
    font:`400 ${tam}px/1 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 28}px ${KC.ink}`, textShadow:`${tam / 22}px ${tam / 22}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>;
}
// Tarjeta de texto plano (sin logos): año, nombre y frase.
function TarjetaTexto({ T, at, until, anio, nombre, texto, x, y, ancho = 600, color = KC.gold, children }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-1.5deg)`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'16px 30px 22px', boxShadow:`12px 12px 0 ${KC.ink}`, boxSizing:'border-box' }}>
    <div style={{ display:'flex', alignItems:'baseline', gap:18 }}>
      <div style={{ font:`400 96px/1 ${KF.titulo}`, color, WebkitTextStroke:`4px ${KC.ink}` }}>{anio}</div>
      <div style={{ font:`900 40px/1.1 ${KF.texto}`, color:KC.ink }}>{nombre}</div>
    </div>
    <div style={{ font:`700 30px/1.3 ${KF.mono}`, color:'#3a332c', marginTop:10 }}>{texto}</div>
    {children}
  </div>;
}

// Cartera café genérica (sin marca) de frente. Centro en (x, y). abre 0..1 = la solapa se levanta.
function Cartera({ x, y, s = 1, rot = 0, abre = 0, plastico = 0 }) {
  const r = krng(79), manchas = Array.from({ length: 26 }, () => [klerp(-250, 250, r()), klerp(-150, 150, r()), klerp(10, 34, r()), r()]);
  const sol = Math.cos(abre * Math.PI * 0.42);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <linearGradient id="cmCuero" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CM.cuero3} /><stop offset="100%" stopColor={CM.cuero2} /></linearGradient>
      <clipPath id="cmClip"><rect x={-280} y={-170} width={560} height={340} rx={40} /></clipPath>
    </defs>
    <rect x={-280} y={-170} width={560} height={340} rx={40} fill="url(#cmCuero)" stroke={KC.ink} strokeWidth={9} />
    <g clipPath="url(#cmClip)" opacity=".35">{manchas.map(([a, b, rr, k], i) => <ellipse key={i} cx={a} cy={b} rx={rr * 1.6} ry={rr} fill={k > 0.5 ? '#c08a55' : '#5a321b'} transform={`rotate(${k * 180} ${a} ${b})`} />)}</g>
    <rect x={-252} y={-142} width={504} height={284} rx={26} fill="none" stroke={CM.costura} strokeWidth={5} strokeDasharray="16 12" />
    {plastico > 0 && <rect x={-280} y={-170} width={560} height={340} rx={40} fill={CM.pu2} opacity={0.28 * plastico} />}
    {plastico > 0 && <path d="M -230 -150 Q -60 -175 120 -150" stroke="#ffffff" strokeWidth={16} fill="none" opacity={0.55 * plastico} strokeLinecap="round" />}
    <g transform={`translate(0 -170) scale(1 ${sol})`}>
      <path d="M -280 0 L 280 0 L 280 120 Q 0 230 -280 120 Z" fill={CM.cuero} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      <path d="M -252 22 L 252 22 L 252 104 Q 0 200 -252 104 Z" fill="none" stroke={CM.costura} strokeWidth={5} strokeDasharray="16 12" />
      <circle cx={0} cy={150} r={26} fill="#d8b46a" stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={150} r={10} fill="#a8823a" />
    </g>
  </g>;
}
// Vaca esquemática (cabeza).
function Vaca({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -70 Q -120 -100 -130 -60 M 80 -70 Q 120 -100 130 -60" stroke="#e8dcc0" strokeWidth={16} fill="none" strokeLinecap="round" />
    <ellipse cx={-105} cy={-30} rx={38} ry={20} fill="#fff" stroke={KC.ink} strokeWidth={6} transform="rotate(-20 -105 -30)" />
    <ellipse cx={105} cy={-30} rx={38} ry={20} fill="#fff" stroke={KC.ink} strokeWidth={6} transform="rotate(20 105 -30)" />
    <rect x={-80} y={-80} width={160} height={170} rx={70} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -10 Q -40 -60 -10 -80 L -60 -80 Q -80 -60 -80 -10 Z" fill={KC.ink} />
    <ellipse cx={45} cy={-10} rx={26} ry={34} fill={KC.ink} />
    <circle cx={-34} cy={-10} r={9} fill={KC.ink} /><circle cx={30} cy={-10} r={9} fill="#fff" /><circle cx={30} cy={-10} r={6} fill={KC.ink} />
    <ellipse cx={0} cy={60} rx={70} ry={42} fill="#ffb3c1" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-24} cy={60} r={9} fill="#a8506a" /><circle cx={24} cy={60} r={9} fill="#a8506a" />
  </g>;
}
// Marca ✓ / ✗ redonda.
function Marca({ x, y, ok, p = 1, r = 46 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle r={r} fill={ok ? '#2fbf5a' : KC.red} stroke={KC.ink} strokeWidth={7} />
    {ok ? <path d={`M ${-r * 0.45} 0 L ${-r * 0.1} ${r * 0.35} L ${r * 0.5} ${-r * 0.35}`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d={`M ${-r * 0.38} ${-r * 0.38} L ${r * 0.38} ${r * 0.38} M ${r * 0.38} ${-r * 0.38} L ${-r * 0.38} ${r * 0.38}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" />}
  </g>;
}
// Ganoderma de repisa (sombrero en riñón, rojizo y lacado, pie lateral) saliendo de un tronco. Base del pie en (x, y).
function Ganoderma({ T = 0, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={0} width={340} height={90} rx={22} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
    {[24, 50, 70].map((yy, i) => <path key={i} d={`M -150 ${yy} Q 0 ${yy - 10} 150 ${yy + 4}`} stroke="#5a3416" strokeWidth={5} fill="none" />)}
    <path d="M -20 4 Q -24 -50 6 -84 L 34 -72 Q 8 -40 20 4 Z" fill="#6a1c0e" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <g transform="translate(20 -84) scale(.62 .46)">
      <path d="M -10 10 Q -60 -10 -40 -80 Q -10 -170 140 -175 Q 300 -170 330 -70 Q 345 20 240 50 Q 120 75 40 45 Q 10 35 -10 10 Z" fill="#a82a14" stroke={KC.ink} strokeWidth={11} strokeLinejoin="round" />
      {[0.72, 0.45].map((k, i) => <path key={i} d={`M ${-40 * k} ${-80 * k} Q ${-10 * k} ${-170 * k} ${140 * k} ${-175 * k} Q ${300 * k} ${-170 * k} ${330 * k} ${-70 * k}`} stroke="#4a0c06" strokeWidth={7} fill="none" opacity=".5" />)}
      <path d="M 40 -140 Q 140 -165 250 -140" stroke="#ffffff" strokeWidth={18} fill="none" opacity={0.35 + 0.15 * Math.sin(T * 2)} strokeLinecap="round" />
    </g>
  </g>;
}
// Bolso de viaje genérico (sin logo) sobre un pedestal. Centro en (x, y).
function BolsoViaje({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -110 Q -150 -260 0 -260 Q 150 -260 150 -110" stroke={CM.cuero2} strokeWidth={30} fill="none" strokeLinecap="round" />
    <rect x={-290} y={-130} width={580} height={320} rx={130} fill="#d8c9a8" stroke={KC.ink} strokeWidth={9} />
    <rect x={-290} y={-130} width={580} height={110} rx={60} fill={CM.cuero} stroke={KC.ink} strokeWidth={8} />
    <rect x={-290} y={110} width={580} height={80} rx={40} fill={CM.cuero} stroke={KC.ink} strokeWidth={8} />
    <line x1={-240} y1={-75} x2={240} y2={-75} stroke="#e8d08a" strokeWidth={6} strokeDasharray="10 6" />
    <rect x={-40} y={-90} width={80} height={30} rx={8} fill="#d8b46a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -230 20 Q 0 40 230 20" stroke="#bfae8a" strokeWidth={5} fill="none" />
  </g>;
}
// Charola de cultivo vista desde arriba-frente, con aserrín. Centro en (x, y).
function Charola({ x, y, s = 1, children }) {
  const r = krng(7), puntos = Array.from({ length: 140 }, () => { const v = r(), u = r(); return [klerp(-370 - 40 * v, 370 + 40 * v, u), klerp(-105, 110, v), r()]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -420 120 L 420 120 L 420 175 L -420 175 Z" fill={CM.acero} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -380 -120 L 380 -120 L 420 120 L -420 120 Z" fill={CM.aserrin} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {puntos.map(([a, b, k], i) => <rect key={i} x={a} y={b} width={10 + k * 12} height={5 + k * 4} rx={2} fill={k > 0.5 ? CM.aserrin2 : '#e2b878'} transform={`rotate(${k * 180} ${a} ${b})`} />)}
    {children}
  </g>;
}
// Hifas esquemáticas (tubos con septos y ramas). Se generan una vez.
function genHifas(seed, n, area, paso = 18, largo = [36, 64]) {
  const r = krng(seed), out = [];
  const crece = (x, y, a, L, prof) => {
    const pts = [[x, y]]; let ang = a;
    for (let i = 0; i < L; i++) { ang += (r() - 0.5) * 0.32; x += Math.cos(ang) * paso; y += Math.sin(ang) * paso; pts.push([x, y]);
      if (prof < 2 && i > 6 && r() < 0.06) crece(x, y, ang + (r() < 0.5 ? -1 : 1) * (0.6 + r() * 0.5), Math.floor(L * 0.45), prof + 1); }
    out.push({ pts, prof });
  };
  for (let k = 0; k < n; k++) { const lado = r(); const x = area.x + r() * area.w, y = area.y + r() * area.h; crece(x, y, r() * Math.PI * 2, Math.floor(klerp(largo[0], largo[1], r())), 0); }
  return out;
}
function Hifas({ hifas, p = 1, w = 24, color = CM.micelio, borde = CM.hifaBorde, septo = 7 }) {
  return <g>{hifas.map((h, j) => { const k = Math.max(0, Math.floor(h.pts.length * kclamp(p * 1.3 - h.prof * 0.15, 0, 1))); if (k < 2) return null;
    const q = h.pts.slice(0, k), d = 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
    const ww = w * (h.prof ? 0.85 : 1);
    return <g key={j}>
      <path d={d} stroke={borde} strokeWidth={ww + 7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={color} strokeWidth={ww} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#ffffff" strokeWidth={ww * 0.25} fill="none" strokeLinecap="round" opacity=".55" transform={`translate(${-ww * 0.18} ${-ww * 0.18})`} />
      {q.map((z, i) => { if (i === 0 || i % septo || i >= q.length - 1) return null; const n = q[i + 1], a = Math.atan2(n[1] - z[1], n[0] - z[0]) + Math.PI / 2;
        return <line key={i} x1={z[0] + Math.cos(a) * ww * 0.45} y1={z[1] + Math.sin(a) * ww * 0.45} x2={z[0] - Math.cos(a) * ww * 0.45} y2={z[1] - Math.sin(a) * ww * 0.45} stroke={borde} strokeWidth={4} />; })}
    </g>; })}</g>;
}
const HIFAS_GRANDES = genHifas(11, 9, { x: 60, y: 520, w: 960, h: 640 }, 20, [30, 52]);
const HIFAS_IZQ = genHifas(5, 6, { x: 50, y: 640, w: 420, h: 480 }, 14, [22, 36]);
const HIFAS_CAPA = genHifas(23, 22, { x: 60, y: 900, w: 960, h: 220 }, 14, [16, 30]);
const HIFAS_LUPA = genHifas(31, 7, { x: 20, y: 140, w: 340, h: 220 }, 12, [16, 26]);

// Haces de colágeno: fibrillas onduladas (crimp) agrupadas en haces trenzados. Región x0..x1.
function Colageno({ T, x0, x1, y0, y1, p = 1 }) {
  const haces = [[0.12, 0.9], [0.32, -0.6], [0.55, 0.4], [0.78, -0.8], [0.95, 0.5]];
  return <g opacity={p}>{haces.map(([v, inc], hI) => {
    const cy = klerp(y0, y1, v);
    return <g key={hI} transform={`rotate(${inc * 8} ${(x0 + x1) / 2} ${cy})`}>
      {Array.from({ length: 7 }, (_, f) => { const off = (f - 3) * 10;
        const pts = Array.from({ length: 41 }, (_, i) => { const x = klerp(x0 - 30, x1 + 30, i / 40); return [x, cy + off + Math.sin(i / 40 * Math.PI * 7 + hI + T * 0.6) * 16]; });
        return <path key={f} d={'M ' + pts.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ')} stroke={f % 2 ? CM.colageno : CM.colageno2} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
    </g>; })}</g>;
}
// Corte de la pared de una hifa: capas de glucanos (afuera) y quitina (fibritas).
function ParedHifa({ T, x, y, r = 140, p = 1 }) {
  if (p <= 0) return null;
  const k = kEase.sale(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle r={r} fill="#1a2234" stroke={KC.white} strokeWidth={6} />
    <circle r={r * 0.86} fill="rgba(47,224,168,.35)" stroke={KC.mint} strokeWidth={8} />
    <circle r={r * 0.62} fill="#2a1f12" stroke={KC.gold2} strokeWidth={6} />
    {Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2 + T * 0.1; return <line key={i} x1={Math.cos(a) * r * 0.64} y1={Math.sin(a) * r * 0.64} x2={Math.cos(a + 0.22) * r * 0.82} y2={Math.sin(a + 0.22) * r * 0.82} stroke={KC.gold2} strokeWidth={5} strokeLinecap="round" />; })}
    <circle r={r * 0.5} fill="#3a2e1c" />
    {[[-20, -10], [25, 18], [-5, 30]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9} fill="#6a5a3a" />)}
  </g>;
}
// Gotero de glicerina.
function Gotero({ T, x, y, gota = 0, on = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={0.35 + 0.65 * on}>
    <rect x={-22} y={-150} width={44} height={60} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <path d="M -18 -92 L 18 -92 L 8 20 L -8 20 Z" fill="#e8f4ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -10 -60 L 10 -60 L 6 10 L -6 10 Z" fill="#cfe8ff" />
    {gota > 0 && gota < 1 && <ellipse cx={0} cy={30 + gota * 110} rx={11} ry={15} fill="#cfe8ff" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Tina de curtido con líquido café y burbujas.
function Tina({ T, x, y, on = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={0.35 + 0.65 * on}>
    <path d="M -110 -60 L 110 -60 L 90 70 L -90 70 Z" fill="#c9ced6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -102 -36 L 102 -36 L 92 50 L -92 50 Z" fill={CM.tanino} />
    {on > 0.5 && [0, 1, 2, 3].map((i) => { const u = ((T * 0.9 + i * 0.27) % 1); return <circle key={i} cx={-60 + i * 40} cy={-30 - u * 70} r={8 + i * 2} fill="none" stroke="#d9a86a" strokeWidth={4} opacity={1 - u} />; })}
    <rect x={-120} y={-72} width={240} height={20} rx={8} fill="#e3e7ee" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Prensa caliente: dos placas que se cierran, líneas rojas de calor y vapor.
function Prensa({ T, x, y, cierra = 0, on = 1 }) {
  const g = (1 - cierra) * 40;
  return <g transform={`translate(${x} ${y})`} opacity={0.35 + 0.65 * on}>
    <rect x={-14} y={-150} width={28} height={70} fill={CM.acero} stroke={KC.ink} strokeWidth={6} />
    <rect x={-110} y={-90 - g} width={220} height={50} rx={10} fill="#3b414a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={10} width={220} height={50} rx={10} fill="#3b414a" stroke={KC.ink} strokeWidth={7} />
    {[-70, -20, 30, 80].map((a, i) => <line key={i} x1={a - 15} y1={-48 - g} x2={a + 15} y2={-48 - g} stroke={KC.orange} strokeWidth={6} />)}
    <rect x={-96} y={-40} width={192} height={44} fill={CM.cuero} stroke={KC.ink} strokeWidth={4} />
    {on > 0.5 && [0, 1, 2].map((i) => { const u = ((T * 0.8 + i * 0.33) % 1); return <path key={i} d={`M ${120 + i * 14} ${-20 - u * 60} q 12 -12 0 -24 q -12 -12 0 -24`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={1 - u} />; })}
  </g>;
}
// Tira de material que se dobla y truena (sin ablandador). dobla 0..1, rompe 0..1.
function TiraQuebradiza({ T, x, y, dobla = 0, rompe = 0 }) {
  const a = 22 * dobla, sep = rompe * 30, caida = rompe * 40;
  const grieta = 'L 0 -30 L -10 -16 L 8 -2 L -6 14 L 6 30';
  if (rompe <= 0) return <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${-a})`}><path d="M -300 -30 L 0 -30 L 0 30 L -300 30 Z" fill="#efe7d2" stroke={KC.ink} strokeWidth={7} /><rect x={-330} y={-50} width={60} height={100} rx={12} fill={CM.acero} stroke={KC.ink} strokeWidth={6} /></g>
    <g transform={`rotate(${a})`}><path d="M 300 -30 L 0 -30 L 0 30 L 300 30 Z" fill="#efe7d2" stroke={KC.ink} strokeWidth={7} /><rect x={270} y={-50} width={60} height={100} rx={12} fill={CM.acero} stroke={KC.ink} strokeWidth={6} /></g>
    <rect x={-8} y={-30} width={16} height={60} fill="#efe7d2" transform={`rotate(0)`} />
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`translate(${-sep} ${caida}) rotate(${-a - rompe * 12})`}>
      <path d={`M -300 -30 L 0 -30 L -10 -16 L 8 -2 L -6 14 L 6 30 L -300 30 Z`} fill="#efe7d2" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-330} y={-50} width={60} height={100} rx={12} fill={CM.acero} stroke={KC.ink} strokeWidth={6} />
    </g>
    <g transform={`translate(${sep} ${caida}) rotate(${a + rompe * 12})`}>
      <path d={`M 300 -30 L 0 -30 L -10 -16 L 8 -2 L -6 14 L 6 30 L 300 30 Z`} fill="#efe7d2" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={270} y={-50} width={60} height={100} rx={12} fill={CM.acero} stroke={KC.ink} strokeWidth={6} />
    </g>
    {rompe > 0 && [[-20, 10, 20], [25, -10, -30], [5, 40, 60], [-35, 50, 140]].map(([dx, dy, r], i) => <path key={i} d="M 0 0 L 14 4 L 4 14 Z" fill="#efe7d2" stroke={KC.ink} strokeWidth={3}
      transform={`translate(${dx * (1 + rompe * 3)} ${dy + rompe * rompe * 160}) rotate(${r + rompe * 200})`} opacity={1 - kprog(rompe, 0.7, 1)} />)}
    {rompe > 0 && rompe < 0.6 && <text x={0} y={-80} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4}>¡CRAC!</text>}
  </g>;
}
// Muestras de la comparación (colores genéricos, sin marcas). La 7 es la de hongo.
const MUESTRAS = ['#3f8f4a', '#c9a46a', '#e3d39a', '#6b5a8a', '#b33a3a', '#5a2a4a', '#d9cbb0', '#9a6a3a', '#a8b0a0'];
function Muestra({ x, y, s = 1, color, hongo = false, cuero = false, grietas = 0 }) {
  const r = krng(hongo ? 5 : 9);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-60} width={120} height={120} rx={14} fill={color} stroke={KC.ink} strokeWidth={6} />
    {hongo && Array.from({ length: 14 }, (_, i) => <line key={i} x1={-50 + r() * 100} y1={-50 + r() * 100} x2={-50 + r() * 100} y2={-50 + r() * 100} stroke="#c9a070" strokeWidth={3} opacity=".7" />)}
    {cuero && Array.from({ length: 30 }, (_, i) => <circle key={i} cx={-50 + r() * 100} cy={-50 + r() * 100} r={2.5} fill="#3a1f0e" opacity=".6" />)}
    {grietas > 0 && <path d="M -40 -10 L -15 0 L 0 -14 L 22 2 L 44 -6 M -10 20 L 8 30 L 30 22" stroke={KC.ink} strokeWidth={5} fill="none" opacity={grietas} />}
  </g>;
}
// Flexómetro esquemático: tira de hongo sujeta, un brazo la dobla una y otra vez; aparecen grietas.
function Flexometro({ T, x, y, on = 1, grietas = 0 }) {
  const ang = on * 40 * Math.sin(T * 7);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-380} y={90} width={760} height={50} rx={12} fill={CM.acero} stroke={KC.ink} strokeWidth={7} />
    <rect x={-340} y={-70} width={90} height={160} rx={12} fill="#3b414a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -250 -26 L 0 -26 L 0 26 L -250 26 Z" fill="#9a6a3a" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${ang})`}>
      <path d="M 0 -26 L 250 -26 L 250 26 L 0 26 Z" fill="#9a6a3a" stroke={KC.ink} strokeWidth={6} />
      <rect x={250} y={-70} width={90} height={140} rx={12} fill="#3b414a" stroke={KC.ink} strokeWidth={7} />
    </g>
    <circle cx={0} cy={0} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    {grietas > 0 && <path d="M -40 -26 L -32 -8 L -44 6 L -36 26 M -100 -26 L -92 -10 M -150 26 L -142 8 L -152 -6" stroke={KC.ink} strokeWidth={5} fill="none" opacity={grietas} />}
    <path d={`M 140 -150 A 120 120 0 0 1 260 -60`} stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="12 8" opacity={on} />
    <path d="M 250 -76 L 262 -52 L 238 -56 Z" fill={KC.ink} opacity={on} />
  </g>;
}
// Candado.
function Candado({ x, y, s = 1, cierra = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -34 ${-10 - (1 - cierra) * 30} L -34 -50 Q -34 -90 0 -90 Q 34 -90 34 -50 L 34 -10`} stroke={KC.ink} strokeWidth={14} fill="none" />
    <rect x={-54} y={-14} width={108} height={86} rx={14} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={22} r={10} fill={KC.ink} /><rect x={-4} y={22} width={8} height={26} fill={KC.ink} />
  </g>;
}
// Cortina metálica que baja (fábrica que cierra).
function Cortina({ x, y, w = 200, h = 150, baja = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#2a2f36" stroke={KC.ink} strokeWidth={6} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h * baja} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor(8 * baja) }, (_, i) => <line key={i} x1={-w / 2} y1={-h / 2 + (i + 1) * h / 8} x2={w / 2} y2={-h / 2 + (i + 1) * h / 8} stroke="#6b737d" strokeWidth={4} />)}
    <path d={`M ${-w / 2 - 20} ${-h / 2} L 0 ${-h / 2 - 50} L ${w / 2 + 20} ${-h / 2} Z`} fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function CueroShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, He: CUES.Hermes, Cu: CUES.Cultivo, Ta: CUES.Tapete, Hi: CUES.Hifas, Co: CUES.Colageno, Pr: CUES.Proceso, Qu: CUES.Quebradizo,
    Pe: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Resultado, Pl: CUES.Plastico, Ne: CUES.Negocio, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G, K.G + 0.55, kEase.rebote);
  const abreG = Math.sin(Math.PI * kprog(T, K.G + 0.8, K.G + 1.9));
  const crec = kprog(T, K.Cu + 1.0, K.Ta + 1.8);                         // el micelio coloniza la charola
  const capa = kprog(T, K.Ta + 0.1, K.Ta + 1.8);                         // el tapete se engruesa
  const despega = kprog(T, K.Ta + 2.0, K.Ta + 3.3, kEase.suave);         // se cosecha como hoja
  const sem = T < K.Ta + 1.0 ? 'semana 1' : 'semana 2';
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cartera cae; no es de vaca, es de hongo */}
      <Escena T={T} a={K.G} b={K.He} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Cartera x={330} y={klerp(380, 790, caida)} s={0.88} rot={(1 - caida) * -10} abre={abreG} />
          <Vaca x={230} y={1100} s={0.75} />
          <Marca x={330} y={1040} ok={false} p={kprog(T, K.G + 1.0, K.G + 1.4)} />
          <Ganoderma T={T} x={720} y={1110} s={1.05} />
          <Marca x={870} y={1010} ok p={kprog(T, K.G + 1.6, K.G + 2.0)} />
        </>)}
      </Escena>
      {/* 1 · Hermès 2021: un bolso de viaje genérico con material de micelio */}
      <Escena T={T} a={K.He} b={K.Cu} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<BolsoViaje T={T} x={400} y={700 + Math.sin(T * 2) * 6} s={0.95 * kEase.rebote(kprog(T, K.He - 0.2, K.He + 0.5))} />)}
      </Escena>
      {/* 2–3 · cultivo en charola y tapete que se cosecha */}
      <Escena T={T} a={K.Cu} b={K.Hi} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Charola x={540} y={900} s={1}>
          <defs><clipPath id="cmBandeja"><path d="M -380 -120 L 380 -120 L 420 120 L -420 120 Z" /></clipPath></defs>
          {/* aserrín que cae al inicio */}
          {T < K.Cu + 1.2 && Array.from({ length: 18 }, (_, i) => { const u = kprog(T, K.Cu + i * 0.04, K.Cu + 0.6 + i * 0.04); return u > 0 && u < 1 ? <rect key={i} x={-300 + i * 34} y={-400 + u * 380} width={14} height={7} fill={CM.aserrin2} /> : null; })}
          {/* siembra y colonización: redes de hifas blancas que crecen desde 6 puntos */}
          <g clipPath="url(#cmBandeja)">{[[-260, -40], [-90, 50], [80, -60], [240, 40], [-180, 80], [320, -70]].map(([a, b], i) => <g key={i}>
            <circle cx={a} cy={b} r={klerp(8, 110, crec)} fill={CM.micelio2} opacity={kprog(T, K.Cu + 0.6 + i * 0.1, K.Cu + 1.0 + i * 0.1) * 0.55} />
            <RedHifas T={T} x={a} y={b} g={crec} seed={3 + i} n={160} escala={0.22} color={CM.micelio2} ancho={3} />
          </g>)}</g>
          {/* el tapete: capa blanca que se engruesa y luego se despega como hoja */}
          {capa > 0 && <g transform={`translate(${-420 + despega * 30} ${-despega * 230}) rotate(${-despega * 9}) translate(420 0)`}>
            <path d="M -380 -120 L 380 -120 L 420 120 L -420 120 Z" fill={CM.micelio} opacity={0.15 + 0.85 * capa} stroke={despega > 0 ? KC.ink : 'none'} strokeWidth={6} strokeLinejoin="round" />
            {despega > 0 && <path d="M -420 120 L 420 120 L 420 140 L -420 140 Z" fill="#e6dcc2" stroke={KC.ink} strokeWidth={5} />}
            {capa > 0.4 && Array.from({ length: 40 }, (_, i) => { const r = krng(100 + i); return <circle key={i} cx={klerp(-360, 360, r())} cy={klerp(-100, 100, r())} r={6 + r() * 8} fill="#ffffff" opacity={0.5 * capa} />; })}
          </g>}
          {/* pinzas que jalan la esquina */}
          {despega > 0 && <g transform={`translate(${400 + despega * 20} ${120 - despega * 300})`}>
            <path d="M 0 0 L 80 -120 M 18 6 L 104 -110" stroke={CM.acero} strokeWidth={14} strokeLinecap="round" />
          </g>}
        </Charola>)}
      </Escena>
      {/* 4 · al microscopio: hifas de quitina y glucanos */}
      <Escena T={T} a={K.Hi} b={K.Co} zoom={0.07}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Hifas hifas={HIFAS_GRANDES} p={kprog(T, K.Hi - 0.3, K.Hi + 1.6)} w={24} />
          <ParedHifa T={T} x={250} y={1000} r={140} p={kprog(T, K.Hi + 1.4, K.Hi + 1.9)} />
        </>)}
      </Escena>
      {/* 5 · comparación: hifas (hongo) contra colágeno (vaca) */}
      <Escena T={T} a={K.Co} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <defs><clipPath id="cmIzq"><rect x={0} y={560} width={535} height={620} /></clipPath><clipPath id="cmDer"><rect x={545} y={560} width={535} height={620} /></clipPath></defs>
          <g clipPath="url(#cmIzq)"><Hifas hifas={HIFAS_IZQ} p={1} w={18} /></g>
          <g clipPath="url(#cmDer)"><Colageno T={T} x0={560} x1={1070} y0={640} y1={1110} p={kprog(T, K.Co + 0.6, K.Co + 1.2)} /></g>
          <line x1={540} y1={560} x2={540} y2={1180} stroke={KC.white} strokeWidth={6} strokeDasharray="16 12" />
        </>)}
      </Escena>
      {/* 6 · el taller: glicerina, curtido, prensa con calor */}
      <Escena T={T} a={K.Pr} b={K.Qu} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg((() => { const g1 = kprog(T, K.Pr + 0.1, K.Pr + 0.5), g2 = kprog(T, K.Pr + 1.3, K.Pr + 1.7), g3 = kprog(T, K.Pr + 2.4, K.Pr + 2.8);
          const flex = kprog(T, K.Pr + 0.6, K.Pr + 1.2), tan = kprog(T, K.Pr + 1.7, K.Pr + 2.3), pre = kprog(T, K.Pr + 2.8, K.Pr + 3.3);
          const onda = (1 - pre) * flex * 24;
          const col = tan > 0 ? mixHex('#f3ecd9', '#8a5634', tan) : '#f3ecd9';
          const pts = Array.from({ length: 31 }, (_, i) => [klerp(-340, 340, i / 30), Math.sin(i / 30 * Math.PI * 3 + T * 3) * onda]);
          return <>
            <Gotero T={T} x={220} y={720} gota={kprog(T, K.Pr + 0.3, K.Pr + 0.8)} on={g1} />
            <Tina T={T} x={540} y={720} on={g2} />
            <Prensa T={T} x={860} y={720} cierra={kprog(T, K.Pr + 2.7, K.Pr + 3.0)} on={g3} />
            {[[330, 720], [700, 720]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} l 40 0 m -14 -14 l 14 14 l -14 14`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />)}
            <g transform="translate(540 1040)">
              <path d={'M ' + pts.map((z) => `${z[0].toFixed(1)} ${(z[1] - 50).toFixed(1)}`).join(' L ') + ' L ' + pts.slice().reverse().map((z) => `${z[0].toFixed(1)} ${(z[1] + 50).toFixed(1)}`).join(' L ') + ' Z'}
                fill={col} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
              {tan > 0.5 && Array.from({ length: 26 }, (_, i) => { const r = krng(300 + i); const xx = klerp(-320, 320, r()); return <circle key={i} cx={xx} cy={-36 + r() * 72 + Math.sin((xx + 340) / 680 * Math.PI * 3 + T * 3) * onda} r={3} fill="#4a2a14" opacity=".6" />; })}
            </g>
          </>; })())}
      </Escena>
      {/* 7 · sin ablandador: tieso y quebradizo */}
      <Escena T={T} a={K.Qu} b={K.Pe} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<TiraQuebradiza T={T} x={500} y={760} dobla={kprog(T, K.Qu + 0.2, K.Qu + 1.3, kEase.suave)} rompe={kprog(T, K.Qu + 1.3, K.Qu + 2.4)} />)}
      </Escena>
      {/* 8 · re-gancho: ¿aguanta como el cuero de verdad? */}
      <Escena T={T} a={K.Pe} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Cartera x={270} y={1000} s={0.72} rot={Math.sin(T * 4) * 4} /><Interrogacion T={T} x={290} y={820} tam={340} /></>)}
      </Escena>
      {/* 9–10 · el estudio de Freiberg (2021): 9 alternativas contra cuero de zapato; prueba de doblado */}
      <Escena T={T} a={K.Es} b={K.Pl} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {T < K.Re + 0.2 && <g opacity={1 - kprog(T, K.Re - 0.2, K.Re + 0.2)}>
            {MUESTRAS.map((c, i) => { const on = kprog(T, K.Es + 1.6 + i * 0.12, K.Es + 1.9 + i * 0.12, kEase.rebote); if (on <= 0) return null;
              return <Muestra key={i} x={140 + (i % 3) * 140} y={800 + Math.floor(i / 3) * 125} s={on * 0.85} color={c} hongo={i === 7} />; })}
            {kprog(T, K.Es + 3.0, K.Es + 3.3) > 0 && <><text x={665} y={950} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>VS</text>
              <Muestra x={850} y={925} s={1.4 * kEase.rebote(kprog(T, K.Es + 3.0, K.Es + 3.4))} color="#6b3b1f" cuero /></>}
          </g>}
          {T > K.Re - 0.2 && <g opacity={kprog(T, K.Re - 0.2, K.Re + 0.3)}>
            <Flexometro T={T} x={540} y={860} on={1} grietas={kprog(T, K.Re + 1.2, K.Re + 2.6)} />
            <Marca x={880} y={1080} ok={false} p={kprog(T, K.Re + 2.7, K.Re + 3.0)} r={60} />
          </g>}
        </>)}
      </Escena>
      {/* 11 · corte de una hoja comercial: micelio abajo, capa de poliuretano encima; los microbios rebotan */}
      <Escena T={T} a={K.Pl} b={K.Ne} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg((() => { const pu = kprog(T, K.Pl + 0.5, K.Pl + 1.4, kEase.sale);
          return <>
            <defs><clipPath id="cmCapa"><rect x={60} y={890} width={960} height={230} /></clipPath>
              <linearGradient id="cmPU" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CM.pu2} /><stop offset="100%" stopColor={CM.pu} /></linearGradient></defs>
            <rect x={60} y={890} width={960} height={230} fill="#2a2216" stroke={KC.white} strokeWidth={4} />
            <g clipPath="url(#cmCapa)"><Hifas hifas={HIFAS_CAPA} p={1} w={13} septo={6} /></g>
            <rect x={60} y={890 - 70 * pu} width={960} height={70 * pu} fill="url(#cmPU)" stroke={KC.white} strokeWidth={4} opacity={pu > 0 ? 1 : 0} />
            {pu > 0.5 && <path d="M 100 838 L 980 838" stroke="#ffffff" strokeWidth={8} opacity={0.5 + 0.2 * Math.sin(T * 3)} strokeLinecap="round" />}
            {(() => { const u = kprog(T, K.Pl + 3.0, K.Pl + 3.8, kEase.sale); if (u <= 0) return null; const y2 = klerp(600, 800, u);
              return <g>
                <line x1={760} y1={600} x2={760} y2={y2} stroke={KC.mint} strokeWidth={10} strokeDasharray="18 10" strokeLinecap="round" />
                <path d={`M 736 ${y2 - 16} L 760 ${y2 + 10} L 784 ${y2 - 16}`} stroke={KC.mint} strokeWidth={10} fill="none" strokeLinecap="round" />
                {u >= 1 && <Marca x={850} y={790} ok={false} p={kprog(T, K.Pl + 3.8, K.Pl + 4.1)} r={34} />}
              </g>; })()}
          </>; })())}
      </Escena>
      {/* 12 · el negocio cuesta: dos tarjetas de texto plano */}
      <Escena T={T} a={K.Ne} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.pink} />
      </Escena>
      {/* 13 · cierre: la misma cartera del inicio, ahora "leída" por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Cartera x={330} y={790} s={0.88} plastico={kprog(T, K.Ci + 1.8, K.Ci + 2.6)} />)}
      </Escena>
      <Lupa T={T} at={K.Ci + 0.5} until={K.Ou - 0.1} x={790} y={890} r={165} fx={430} fy={760} tinte={KC.cyan} etiqueta="POR DENTRO"
        interior={(TT, r) => <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={0} width={r * 2} height={r * 2} fill="#2a2216" />
          <Hifas hifas={HIFAS_LUPA} p={kprog(TT, K.Ci + 0.6, K.Ci + 1.6)} w={14} septo={5} />
          <rect x={0} y={60} width={r * 2} height={64 * kprog(TT, K.Ci + 1.8, K.Ci + 2.6)} fill={CM.pu} opacity=".9" />
          <line x1={20} y1={72} x2={r * 2 - 20} y2={72} stroke="#fff" strokeWidth={6} opacity={0.6 * kprog(TT, K.Ci + 2.2, K.Ci + 2.6)} />
        </svg>} />

      {/* textos */}
      <Titulo T={T} at={K.G + 0.3} until={K.He - 0.3} texto="ES DE HONGO" x={60} y={420} tam={104} />
      <TarjetaTexto T={T} at={K.He + 0.3} until={K.Cu - 0.3} anio="2021" nombre="Hermès + MycoWorks" x={540} y={1030} ancho={920}
        texto="bolso con micelio «Sylvania», curtido en Francia">
        <div style={{ font:`900 26px ${KF.texto}`, color:KC.red, marginTop:8, opacity:kprog(T, K.He + 1.6, K.He + 1.9) }}>también lleva lona y piel de becerro</div>
      </TarjetaTexto>
      <EtqR T={T} at={K.Cu + 0.4} until={K.Ta - 0.2} x={80} y={1110} color={KC.ink} tam={30}>aserrín · restos del campo</EtqR>
      <EtqR T={T} at={K.Cu + 1.4} until={K.Ta + 1.8} x={80} y={700} color={KC.ink} tam={34}>micelio de <i>Ganoderma</i></EtqR>
      <Chip T={T} at={K.Ta + 0.1} until={K.Hi - 0.3} texto={sem} x={220} y={560} tam={38} borde={KC.ink} mono />
      <EtqR T={T} at={K.Ta + 2.2} until={K.Hi - 0.3} x={80} y={1110} color={KC.ink} tam={32}>tapete de micelio</EtqR>
      <Chip T={T} at={K.Hi + 0.1} until={K.Co - 0.3} texto="AL MICROSCOPIO · hifas" x={360} y={430} tam={32} borde={KC.cyan} mono />
      <EtqR T={T} at={K.Hi + 1.8} until={K.Co - 0.3} x={395} y={950} color={KC.mint} tam={30}>glucanos</EtqR>
      <EtqR T={T} at={K.Hi + 2.1} until={K.Co - 0.3} x={395} y={1030} color={KC.gold2} tam={30}>quitina</EtqR>
      <EtqR T={T} at={K.Co + 0.2} until={K.Pr - 0.3} x={30} y={470} color={KC.texto} tam={30}>hongo: hifas</EtqR>
      <EtqR T={T} at={K.Co + 0.2} until={K.Pr - 0.3} x={30} y={515} color={KC.mint} tam={24}>(quitina + glucanos)</EtqR>
      <EtqR T={T} at={K.Co + 0.7} until={K.Pr - 0.3} x={560} y={470} color={KC.texto} tam={30}>vaca: colágeno</EtqR>
      <EtqR T={T} at={K.Co + 0.7} until={K.Pr - 0.3} x={560} y={515} color={CM.colageno2} tam={24}>(una proteína)</EtqR>
      <EtqR T={T} at={K.Pr + 0.3} until={K.Qu - 0.3} x={90} y={880} color={KC.ink} tam={26}>glicerina</EtqR>
      <EtqR T={T} at={K.Pr + 1.4} until={K.Qu - 0.3} x={400} y={880} color={KC.ink} tam={26}>curtido</EtqR>
      <EtqR T={T} at={K.Pr + 2.5} until={K.Qu - 0.3} x={700} y={880} color={KC.ink} tam={26}>prensa caliente</EtqR>
      <Chip T={T} at={K.Pr + 0.1} until={K.Qu - 0.3} texto="EL TALLER" x={540} y={470} tam={36} borde={KC.ink} mono />
      <Chip T={T} at={K.Qu + 1.4} until={K.Pe - 0.2} texto="sin ablandador: tieso y quebradizo" x={500} y={1090} tam={34} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Re - 0.3} anio="2021" quien="Instituto FILK · Freiberg, Alemania" revista="Coatings, 2021" x={540} y={500} />
      <EtqR T={T} at={K.Es + 2.6} until={K.Re - 0.3} x={70} y={705} color={KC.ink} tam={26}>9 alternativas</EtqR>
      <EtqR T={T} at={K.Es + 3.4} until={K.Re - 0.3} x={700} y={1040} color={KC.ink} tam={26}>cuero de zapato</EtqR>
      <Chip T={T} at={K.Re + 0.3} until={K.Pl - 0.3} texto="ninguna igualó al cuero en todo" x={370} y={450} tam={32} borde={KC.red} />
      <EtqR T={T} at={K.Re + 0.8} until={K.Pl - 0.3} x={110} y={700} color={KC.ink} tam={28}>muestra de hongo</EtqR>
      <Chip T={T} at={K.Re + 2.8} until={K.Pl - 0.3} texto="prueba de doblado: insuficiente" x={480} y={1120} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Pl + 0.2} until={K.Ne - 0.3} texto="CORTE DE UNA HOJA" x={300} y={430} tam={30} borde={KC.cyan} mono />
      <EtqR T={T} at={K.Pl + 1.2} until={K.Ne - 0.3} x={60} y={760} color={CM.pu2} tam={28}>capa de poliuretano (plástico)</EtqR>
      <EtqR T={T} at={K.Pl + 0.6} until={K.Ne - 0.3} x={60} y={1160} color={KC.texto} tam={28}>micelio (hifas)</EtqR>
      <Chip T={T} at={K.Pl + 2.4} until={K.Ne - 0.3} texto="la mayoría en venta · revisión de 2023" x={370} y={520} tam={26} borde={CM.pu} />
      <EtqR T={T} at={K.Pl + 3.2} until={K.Ne - 0.3} x={300} y={640} color={KC.mint} tam={24}>degradarse: más difícil</EtqR>
      <TarjetaTexto T={T} at={K.Ne + 0.3} until={K.Ci - 0.3} anio="2023" nombre="Bolt Threads" x={370} y={640} ancho={640}
        texto="pausa Mylo: sin financiamiento para crecer" />
      {fsvg(<>
        {kvisible(T, K.Ne + 0.6, K.Ci - 0.3) && <Candado x={860} y={850} s={1.1 * kEase.rebote(kprog(T, K.Ne + 0.6, K.Ne + 1.0))} cierra={kprog(T, K.Ne + 1.2, K.Ne + 1.6)} />}
        {kvisible(T, K.Ne + 3.6, K.Ci - 0.3) && <Cortina x={870} y={1080} w={190} h={140} baja={kprog(T, K.Ne + 4.4, K.Ne + 5.6)} />}
      </>, 44)}
      <TarjetaTexto T={T} at={K.Ne + 3.4} until={K.Ci - 0.3} anio="2025" nombre="MycoWorks" x={370} y={980} ancho={640}
        texto="anuncia que cierra su fábrica (Carolina del Sur): costo de capital demasiado alto" />
      <Titulo T={T} at={K.Ci + 0.2} until={K.Ou} texto="SÍ ES DE HONGO" x={60} y={420} tam={96} />
      <EtqR T={T} at={K.Ci + 1.4} until={K.Ou} x={60} y={1040} color={KC.ink} tam={28}>hifas de hongo ✓</EtqR>
      <EtqR T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1090} color={KC.ink} tam={26}>capita de plástico</EtqR>
      <EtqR T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1130} color={KC.ink} tam={22}>(muchas veces)</EtqR>

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.He} texto="10 cm" largo={250} />
      <BarraEscala T={T} at={K.He} until={K.Cu} texto="dibujo esquemático" largo={0} />
      <BarraEscala T={T} at={K.Cu} until={K.Hi} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Hi} until={K.Co} texto="50 µm (esquemático)" largo={260} />
      <BarraEscala T={T} at={K.Co} until={K.Pr} texto="50 µm (esquemático)" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.Pe} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Pe} until={K.Es} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.Es} until={K.Pl} texto="muestras esquemáticas" largo={0} />
      <BarraEscala T={T} at={K.Pl} until={K.Ne} texto="500 µm (esquemático)" largo={300} />
      <BarraEscala T={T} at={K.Ne} until={K.Ci} texto="dibujo esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="10 cm" largo={250} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.He - 0.1} texto="No es piel de vaca: *es de hongo.*" />
      <Subtitulo T={T} idx={1} at={K.He + 0.1} until={K.Cu - 0.1} texto="Hermès, 2021: *bolso con micelio.*" />
      <Subtitulo T={T} idx={2} at={K.Cu + 0.1} until={K.Ta - 0.1} texto="Micelio de _Ganoderma_ sobre *aserrín.*" />
      <Subtitulo T={T} idx={3} at={K.Ta + 0.1} until={K.Hi - 0.1} texto="En un par de semanas: *un tapete.*" />
      <Subtitulo T={T} idx={4} at={K.Hi + 0.1} until={K.Co - 0.1} texto="Hifas de *quitina y glucanos.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.Pr - 0.1} texto="El cuero de vaca: *colágeno.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Qu - 0.1} texto="Glicerina, curtido y *calor.*" />
      <Subtitulo T={T} idx={7} at={K.Qu + 0.1} until={K.Pe - 0.1} texto="Sin ablandador: *quebradizo.*" />
      <Subtitulo T={T} idx={8} at={K.Pe + 0.1} until={K.Es - 0.1} texto="¿Aguanta como *el de verdad?*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Re - 0.1} texto="2021: *9 alternativas* vs. cuero." />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Pl - 0.1} texto="Ninguna lo igualó *en todo.*" />
      <Subtitulo T={T} idx={11} at={K.Pl + 0.1} until={K.Ne - 0.1} texto="Para protegerlo: *plástico.*" />
      <Subtitulo T={T} idx={12} at={K.Ne + 0.1} until={K.Ci - 0.1} texto="El negocio *cuesta.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Sí es de hongo… *con su capita.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.He + 0.5, K.Cu - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Hi + 0.4, K.Co - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Qu + 0.2, K.Pe - 0.15, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pe + 0.05, K.Es + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Re + 0.3, K.Pl - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pl + 0.5, K.Ne - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ne + 0.4, K.Ci - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="79" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CueroMicelioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CueroShot /></CompositionStage></div>;
}
window.CueroMicelioApp = CueroMicelioApp;
