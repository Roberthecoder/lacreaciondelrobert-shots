// Shot Fungi Mati #47 · Esto no es unicel: es un hongo — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const ML = { crema:'#f3ead6', crema2:'#e2d5b8', fibra:'#b98a45', fibra2:'#8a6330', carton:'#c9965a', carton2:'#a87640', molde:'#5d6672', tierra:'#4a2f1b', agua:'#58c8ff' };

// Puntitos de fibra (rastrojo) dentro de la pieza blanca, fijos por semilla.
function kFibras(seed, n, w, h) { const g = krng(seed); return Array.from({ length: n }, () => [g() * w, g() * h, g() * 180, 6 + g() * 14]); }
const FIB_ESQ = kFibras(7, 46, 360, 300);

// Esquinera de empaque (pieza en L) en 3/4. blanco 0..1 (0 = revoltijo café, 1 = micelio blanco); moja 0..1 (se oscurece).
function Esquinera({ x, y, s = 1, rot = 0, blanco = 1, moja = 0, op = 1 }) {
  const cara = mixHex(mixHex('#c79a5a', ML.crema, blanco), '#8f8064', moja), lado = mixHex(mixHex('#a87a40', ML.crema2, blanco), '#6f634c', moja);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <path d="M -180 -150 L -120 -190 L 0 -190 L -60 -150 Z" fill={lado} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -150 L 0 -190 L 0 50 L 180 50 L 120 90 L -60 90 Z" fill={lado} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -180 -150 L -60 -150 L -60 90 L 120 90 L 120 150 L -180 150 Z" fill={cara} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {FIB_ESQ.map(([fx, fy, r, l], i) => { const px = -175 + fx * 0.8, py = -140 + fy * 0.95; if (px > -65 && py < 85) return null;
      return <line key={i} x1={px} y1={py} x2={px + Math.cos(r) * l} y2={py + Math.sin(r) * l} stroke={ML.fibra} strokeWidth={4} strokeLinecap="round" opacity={0.35 + 0.4 * (1 - blanco)} />; })}
  </g>;
}
// Caja de cartón con solapas que se abren (abre 0..1).
function Caja({ x, y, s = 1, abre = 0 }) {
  const a = kEase.sale(abre);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -230 -120 L ${-230 - 120 * a} ${-120 - 150 * (1 - a) * 0 - 110 * a} L ${-30 - 60 * a} ${-120 - 110 * a} L -30 -120 Z`} fill={ML.carton2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M 230 -120 L ${230 + 120 * a} ${-120 - 110 * a} L ${30 + 60 * a} ${-120 - 110 * a} L 30 -120 Z`} fill={ML.carton2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-230} y={-120} width={460} height={240} fill={ML.carton} stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-120} width={120} height={240} fill="rgba(255,255,255,.18)" />
    <text x={0} y={40} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="rgba(22,18,15,.55)">FRÁGIL</text>
  </g>;
}
// Pedazo de rastrojo (tallo seco picado) y cascarilla.
function Rastrojo({ x, y, rot = 0, l = 90, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-l / 2} y={-13} width={l} height={26} rx={8} fill="#d9b56a" stroke={KC.ink} strokeWidth={5} />
    <line x1={-l / 2 + 10} y1={-3} x2={l / 2 - 10} y2={-3} stroke="#a8823e" strokeWidth={3} /><line x1={-l / 2 + 14} y1={6} x2={l / 2 - 14} y2={6} stroke="#a8823e" strokeWidth={3} />
  </g>;
}
function Cascarilla({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><ellipse rx={24} ry={11} fill="#c99a4a" stroke={KC.ink} strokeWidth={4} /><line x1={-16} y1={0} x2={16} y2={0} stroke="#8a6330" strokeWidth={3} /></g>;
}
function Grano({ x, y, s = 1, T = 0, i = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse rx={15} ry={10} fill="#e9d9a8" stroke={KC.ink} strokeWidth={3} />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={0} y1={0} x2={Math.cos(k * 1.3 + i) * 26} y2={Math.sin(k * 1.3 + i) * 22 + Math.sin(T * 3 + k) * 2} stroke="#fffaf0" strokeWidth={3} strokeLinecap="round" />)}</g>;
}
// Mata de maíz seca (rastrojo en la milpa).
function MataSeca({ x, y, s = 1, T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.3) * 2})`}>
    <path d="M -10 0 L -6 -360 L 6 -360 L 10 0 Z" fill="#d9b56a" stroke={KC.ink} strokeWidth={6} />
    {[-90, -170, -250].map((yy, k) => <path key={k} d={`M 0 ${yy} Q ${k % 2 ? -90 : 90} ${yy - 60} ${k % 2 ? -150 : 150} ${yy + 10}`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />)}
    {[-90, -170, -250].map((yy, k) => <path key={'h' + k} d={`M 0 ${yy} Q ${k % 2 ? -90 : 90} ${yy - 60} ${k % 2 ? -150 : 150} ${yy + 10}`} stroke="#e6c57e" strokeWidth={9} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Tazón (vista lateral). nivel 0..1 = cuánto revoltijo tiene.
function Tazon({ x, y, s = 1, nivel = 0, blanco = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {nivel > 0 && <ellipse cx={0} cy={-6 - nivel * 40} rx={250} ry={40} fill={mixHex('#c79a5a', ML.crema, blanco)} stroke={KC.ink} strokeWidth={5} />}
    <path d="M -280 0 Q -270 200 0 210 Q 270 200 280 0 Z" fill="#ff8a6b" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={280} ry={34} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Moldes: 'L' (esquinera), 'ladrillo', 'charola'. lleno 0..1, blanco 0..1, prensa 0..1.
function Molde({ x, y, tipo = 'ladrillo', lleno = 0, blanco = 0, prensa = 0 }) {
  const relleno = mixHex('#c79a5a', ML.crema, blanco);
  const w = tipo === 'charola' ? 220 : 200, h = tipo === 'charola' ? 90 : 160;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 18} y={-h - 10} width={w + 36} height={h + 28} rx={10} fill={ML.molde} stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2} y={-h} width={w} height={h} fill="#2b2f36" />
    {lleno > 0 && <rect x={-w / 2} y={-h * lleno + prensa * 10} width={w} height={h * lleno - prensa * 10} fill={relleno} />}
    {lleno > 0 && Array.from({ length: 10 }, (_, k) => <line key={k} x1={-w / 2 + 14 + (k * 37) % (w - 28)} y1={-h * lleno * (0.2 + (k % 4) * 0.2) + 6} x2={-w / 2 + 34 + (k * 37) % (w - 28)} y2={-h * lleno * (0.2 + (k % 4) * 0.2)} stroke={ML.fibra} strokeWidth={4} opacity={0.3 + 0.5 * (1 - blanco)} />)}
    {tipo === 'L' && <rect x={-w / 2 + 70} y={-h} width={w - 70} height={h - 60} fill={ML.molde} stroke={KC.ink} strokeWidth={5} />}
    {prensa > 0 && <g transform={`translate(0 ${-h - 160 + 150 * prensa})`}><rect x={-w / 2 - 6} y={-30} width={w + 12} height={30} rx={6} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} /><rect x={-14} y={-150} width={28} height={120} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} /></g>}
  </g>;
}
// Pedazo de rastrojo visto al microscopio: bloque con paredes de células (fibras).
function Particula({ pts, color = '#8a6330' }) {
  const d = 'M ' + pts.map((p) => p.join(' ')).join(' L ') + ' Z';
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  return <g>
    <path d={d} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <clipPath id={'cp' + x0 + y0}><path d={d} /></clipPath>
    <g clipPath={`url(#cp${x0}${y0})`}>{Array.from({ length: Math.ceil((y1 - y0) / 34) }, (_, k) => <line key={k} x1={x0 - 40} y1={y0 + k * 34} x2={x1 + 40} y2={y0 + k * 34 + 30} stroke="rgba(255,220,160,.25)" strokeWidth={5} />)}</g>
  </g>;
}
// Hifa que avanza de (x1,y1) a (x2,y2), ondulada. p 0..1.
function Hifa({ x1, y1, x2, y2, p = 1, onda = 14, seed = 1, ancho = 4 }) {
  if (p <= 0) return null;
  const N = 22, nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny) || 1, pts = [];
  for (let i = 0; i <= Math.ceil(N * p); i++) { const u = Math.min(i / N, p); const w = Math.sin(u * Math.PI * 2.5 + seed) * onda; pts.push([klerp(x1, x2, u) + nx / L * w, klerp(y1, y2, u) + ny / L * w]); }
  if (pts.length < 2) return null;
  const [ux, uy] = pts[pts.length - 1];
  return <g><path d={'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={FK.hifa} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {p < 1 && <circle cx={ux} cy={uy} r={ancho * 0.9} fill="#ffffff" />}</g>;
}
const PARTS = [
  [[-60, 420], [380, 380], [430, 640], [-60, 700]],
  [[560, 330], [1140, 300], [1140, 640], [600, 600]],
  [[-60, 860], [330, 820], [400, 1180], [-60, 1220]],
  [[520, 800], [1140, 760], [1140, 1180], [480, 1150]],
];
// Puentes de hifas entre partículas (x1,y1,x2,y2) y cuándo empiezan (fracción de la escena).
const PUENTES = (() => { const g = krng(47), out = [];
  const pares = [[[420, 520], [590, 480]], [[400, 640], [520, 820]], [[350, 900], [500, 960]], [[220, 700], [200, 840]], [[800, 610], [760, 770]], [[420, 600], [580, 580]], [[380, 1060], [500, 1050]], [[100, 700], [130, 850]], [[960, 630], [990, 770]], [[600, 600], [450, 880]]];
  pares.forEach(([a, b], i) => { for (let k = 0; k < 3; k++) out.push({ x1: a[0] + (g() - 0.5) * 60, y1: a[1] + (g() - 0.5) * 40, x2: b[0] + (g() - 0.5) * 60, y2: b[1] + (g() - 0.5) * 40, t0: 0.05 + (i * 3 + k) / 30 * 0.6, seed: i * 3 + k }); });
  return out; })();

// Torre Hy-Fi esquemática: cilindros de ladrillos. sube 0..1 (filas puestas), cae 0..1 (se desmorona en composta).
const TORRES = [{ cx: 290, w: 150, h: 600 }, { cx: 450, w: 175, h: 915 }, { cx: 600, w: 140, h: 720 }];
const FILA = 30; // px por fila de ladrillos (75 px = 1 m → ladrillo ≈ 0.4 m de alto, esquemático)
function Torre({ T, base = 1180, sube = 1, cae = 0 }) {
  return <g>{TORRES.map((t, i) => { const R = Math.round(t.h / FILA), n = Math.floor(R * kclamp(sube * 1.15 - i * 0.07, 0, 1));
    const hh = n * FILA * (1 - cae * 0.92), col = mixHex(ML.crema, '#6b4a2b', cae);
    return <g key={i}>
      {Array.from({ length: n }, (_, r) => { const y = base - (r + 1) * FILA * (1 - cae * 0.92); return <g key={r}>
        <rect x={t.cx - t.w / 2} y={y} width={t.w} height={FILA * (1 - cae * 0.92)} fill={r % 2 ? col : mixHex(col, '#d8c9a8', 0.4)} stroke={KC.ink} strokeWidth={3} />
        {cae < 0.5 && [0.25, 0.5, 0.75].map((u, k) => <line key={k} x1={t.cx - t.w / 2 + t.w * ((u + (r % 2) * 0.125) % 1)} y1={y} x2={t.cx - t.w / 2 + t.w * ((u + (r % 2) * 0.125) % 1)} y2={y + FILA} stroke={KC.ink} strokeWidth={2} opacity=".6" />)}
      </g>; })}
      {n > 0 && cae < 0.6 && <ellipse cx={t.cx} cy={base - hh} rx={t.w / 2} ry={16} fill="#2b2f36" stroke={KC.ink} strokeWidth={4} />}
    </g>; })}</g>;
}
// Persona de referencia (1.7 m ≈ 128 px a 75 px/m).
function Persona({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><circle cx={0} cy={-112} r={16} fill="#f2c29b" stroke={KC.ink} strokeWidth={4} />
    <path d="M -22 -94 L 22 -94 L 18 -40 L 10 0 L -10 0 L -18 -40 Z" fill="#2346ff" stroke={KC.ink} strokeWidth={4} /></g>;
}
// Brote (plantita).
function Brote({ x, y, p = 1, s = 1 }) {
  if (p <= 0) return null;
  const h = 90 * kEase.sale(p);
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d={`M 0 0 L 0 ${-h}`} stroke="#2f9e44" strokeWidth={8} strokeLinecap="round" />
    <path d={`M 0 ${-h * 0.7} Q -40 ${-h - 10} -50 ${-h * 0.6} Q -30 ${-h * 0.5} 0 ${-h * 0.7} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`scale(${p})`} />
    <path d={`M 0 ${-h} Q 40 ${-h - 30} 52 ${-h * 0.8} Q 30 ${-h * 0.7} 0 ${-h} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Maceta.
function Maceta({ x, y, s = 1, tierra = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -120 L 170 -120 L 130 120 L -130 120 Z" fill="#d9643a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-190} y={-150} width={380} height={46} rx={10} fill="#e8784d" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-150} rx={172} ry={22} fill={mixHex('#3a2414', ML.tierra, tierra)} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Horno (vista frontal) con ventana.
function Horno({ T, x, y, calor = 0, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-260} width={600} height={470} rx={26} fill="#e6e9ee" stroke={KC.ink} strokeWidth={9} />
    <rect x={-250} y={-200} width={500} height={330} rx={16} fill={mixHex('#2b2f36', '#ff8a1f', calor * (0.55 + 0.1 * Math.sin(T * 6)))} stroke={KC.ink} strokeWidth={7} />
    <g>{children}</g>
    {[-130, -20, 90].map((dx, i) => <path key={i} d={`M ${dx - 50} 110 Q ${dx} ${90 - 8 * Math.sin(T * 5 + i)} ${dx + 50} 110`} stroke={KC.red} strokeWidth={10} fill="none" opacity={calor} strokeLinecap="round" />)}
    {[-200, -140].map((dx, i) => <circle key={i} cx={dx} cy={170} r={18} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={40} y={158} width={210} height={26} rx={8} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tarjeta de uso con ✓ o ✗.
function Uso({ T, at, until, texto, ok = true, x, y }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(0,-50%) scale(${e.s})`, transformOrigin:'0 50%', opacity:e.o, display:'flex', alignItems:'center', gap:22,
    background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:22, padding:'14px 30px 14px 18px', boxShadow:`10px 10px 0 ${KC.ink}`, font:`900 48px ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>
    <span style={{ display:'inline-flex', width:64, height:64, borderRadius:32, alignItems:'center', justifyContent:'center', background: ok ? KC.leaf : KC.red, color:'#fff', border:`4px solid ${KC.ink}`, font:`900 42px ${KF.texto}` }}>{ok ? '✓' : '✗'}</span>{texto}
  </div>;
}
// Barra horizontal de rango (desde–hasta) sobre una escala 0..max. Para el % de agua.
function BarraRango({ T, at, until, desde, hasta, max, etiqueta, valor, color, y, x = 90, ancho = 900 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.2, at + 1.2, kEase.sale);
  const a = ancho * desde / max, b = ancho * hasta / max;
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', font:`900 38px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:8 }}><span>{etiqueta}</span><span style={{ color }}>{valor}</span></div>
    <div style={{ position:'relative', height:40, borderRadius:12, background:'rgba(0,0,0,.45)', border:`4px solid ${KC.ink}` }}>
      <div style={{ position:'absolute', left:a, top:0, bottom:0, width:Math.max(6, (b - a) * g), background:color, borderRadius:8 }}></div>
    </div>
  </div>;
}
// Barra vertical con rango (para MPa).
function BarraV({ T, at, until, cx, base, alto, desde, hasta, max, color, etiqueta, valor }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.2, at + 1.2, kEase.sale);
  const hH = alto * hasta / max * g, hD = alto * desde / max * g;
  return <div style={{ position:'absolute', left:cx - 110, top:base - alto - 90, width:220, height:alto + 160, zIndex:42, opacity:e.o }}>
    <div style={{ position:'absolute', left:0, right:0, top:alto + 90 - hH - 66, textAlign:'center', font:`400 54px ${KF.titulo}`, color, WebkitTextStroke:`2px ${KC.ink}` }}>{valor}</div>
    <div style={{ position:'absolute', left:40, width:140, top:alto + 90 - Math.max(8, hH), height:Math.max(8, hH), background:color, border:`6px solid ${KC.ink}`, borderRadius:'14px 14px 0 0', boxSizing:'border-box' }}>
      {hD > 0 && <div style={{ position:'absolute', left:0, right:0, bottom:0, height:hD, background:'rgba(255,255,255,.35)' }}></div>}
    </div>
    <div style={{ position:'absolute', left:-20, right:-20, top:alto + 102, textAlign:'center', font:`900 36px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{etiqueta}</div>
  </div>;
}
// Texto pequeño de fuente.
function Fuente({ T, at, until, texto, x = 60, y = 1170 }) {
  if (!kvisible(T, at, until)) return null;
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:kentrada(T, at, until, 'sube').o, font:`700 24px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>{texto}</div>;
}

function MicelioShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Receta, M: CUES.Molde, H: CUES.Hifas, B: CUES.Bloque, O: CUES.Horno, P: CUES.Pregunta, To: CUES.Torre, Cp: CUES.Composta, D: CUES.Debil, A: CUES.Agua, U: CUES.Usos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sale = kprog(T, K.G + 0.25, K.G + 1.1, kEase.sale);
  const gH = kprog(T, K.H + 0.3, K.B - 0.6);
  const blancoB = kprog(T, K.B + 0.2, K.B + 2.2, kEase.suave);
  const subeTorre = kprog(T, K.To + 2.4, K.To + 6.4);
  const cae = kprog(T, K.Cp + 0.3, K.Cp + 2.0, kEase.suave);
  const dia = Math.min(5, 1 + Math.floor(kprog(T, K.B + 0.2, K.B + 2.2) * 5));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: de la caja sale una pieza blanca que parece unicel */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Esquinera x={380} y={klerp(1060, 760, sale)} s={1.15} rot={klerp(0, -8, sale) + mece(T, 2, 0.4) * 2} />
          <Caja x={400} y={1100} s={1.1} abre={kprog(T, K.G, K.G + 0.5)} />
        </>)}
      </Escena>
      {/* 2 · la receta: rastrojo, cascarilla y micelio */}
      <Escena T={T} a={K.R} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1080} width={KW} height={900} fill="#c08a4a" stroke={KC.ink} strokeWidth={8} />
          <MataSeca x={130} y={1090} s={1.0} T={T} seed={1} />
          <MataSeca x={250} y={1095} s={0.8} T={T} seed={2} />
          <Tazon x={600} y={960} s={0.95} nivel={kprog(T, K.R + 0.5, K.R + 4.4)} blanco={kprog(T, K.R + 3.0, K.R + 4.8) * 0.35} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.R + 0.4 + i * 0.13, u = kprog(T, t0, t0 + 0.55); if (u <= 0 || u >= 1) return null;
            return i % 2 ? <Cascarilla key={i} x={480 + (i * 47) % 240} y={klerp(380, 930, u * u)} rot={i * 40 + T * 90} /> : <Rastrojo key={i} x={470 + (i * 53) % 260} y={klerp(360, 930, u * u)} rot={i * 33 + T * 120} l={80} />; })}
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.R + 2.5 + i * 0.1, u = kprog(T, t0, t0 + 0.5); if (u <= 0 || u >= 1) return null;
            return <Grano key={i} x={520 + (i * 41) % 180} y={klerp(380, 920, u * u)} T={T} i={i} />; })}
        </>)}
      </Escena>
      {/* 3 · al molde, y se aprieta */}
      <Escena T={T} a={K.M} b={K.H} zoom={0.12} origen="50% 55%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={900} fill="#7a5a3a" stroke={KC.ink} strokeWidth={8} />
          <Molde x={210} y={1100} tipo="L" lleno={kprog(T, K.M + 0.2, K.M + 1.0)} prensa={kprog(T, K.M + 1.2, K.M + 1.6) * (1 - kprog(T, K.M + 2.0, K.M + 2.4))} />
          <Molde x={540} y={1100} tipo="ladrillo" lleno={kprog(T, K.M + 0.4, K.M + 1.2)} prensa={kprog(T, K.M + 1.4, K.M + 1.8) * (1 - kprog(T, K.M + 2.1, K.M + 2.5))} />
          <Molde x={860} y={1100} tipo="charola" lleno={kprog(T, K.M + 0.6, K.M + 1.4)} prensa={kprog(T, K.M + 1.6, K.M + 2.0) * (1 - kprog(T, K.M + 2.2, K.M + 2.6))} />
        </>)}
      </Escena>
      {/* 4 · al microscopio: las hifas amarran los pedacitos */}
      <Escena T={T} a={K.H} b={K.B} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {PARTS.map((p, i) => <Particula key={i} pts={p} color={['#8a6330', '#9a7038', '#7d5a2c', '#94693a'][i]} />)}
          <g style={{ filter:`drop-shadow(0 0 6px ${FK.hifa})` }}>
            {PUENTES.map((h, i) => <Hifa key={i} {...h} p={kprog(gH, h.t0, h.t0 + 0.3)} />)}
            <RedHifas T={T} x={430} y={600} g={kprog(gH, 0, 0.8)} seed={5} n={160} escala={0.55} ancho={4} />
            <RedHifas T={T} x={520} y={900} g={kprog(gH, 0.15, 0.95)} seed={9} n={160} escala={0.55} ancho={4} />
          </g>
        </>)}
      </Escena>
      {/* 5 · en días, sólido · 6 · horno */}
      <Escena T={T} a={K.B} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={900} fill="#7a5a3a" stroke={KC.ink} strokeWidth={8} />
          <Molde x={540} y={1100} tipo="ladrillo" lleno={1} blanco={blancoB} />
          {kprog(T, K.B + 2.3, K.B + 3.0) > 0 && <g transform={`translate(540 ${1020 - 260 * kprog(T, K.B + 2.3, K.B + 3.0, kEase.sale)})`}>
            <rect x={-100} y={-80} width={200} height={160} rx={10} fill={ML.crema} stroke={KC.ink} strokeWidth={7} /></g>}
        </>)}
      </Escena>
      <Escena T={T} a={K.O} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Horno T={T} x={440} y={900} calor={kprog(T, K.O + 0.3, K.O + 1.0)}>
          <rect x={-100 + 0} y={-60} width={200} height={140} rx={10} fill={ML.crema} stroke={KC.ink} strokeWidth={7} transform={`translate(${klerp(-500, 0, kprog(T, K.O, K.O + 0.6, kEase.sale))} 0)`} />
        </Horno>)}
      </Escena>
      {/* 7 · pregunta: ¿y si hacemos ladrillos? */}
      <Escena T={T} a={K.P} b={K.To} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={260} y={1060} tam={460} />
          {(() => { const m = kprog(T, K.P + 0.4, K.P + 1.4, kEase.suave); return <g>
            <Esquinera x={300} y={560} s={0.6} op={1 - m} />
            <g opacity={m} transform={`translate(300 560) scale(${klerp(0.6, 1, m)})`}><rect x={-140} y={-70} width={280} height={140} rx={8} fill={ML.crema} stroke={KC.ink} strokeWidth={8} />
              <path d="M -140 -70 L -100 -110 L 180 -110 L 140 -70 Z" fill={ML.crema2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /><path d="M 140 -70 L 180 -110 L 180 30 L 140 70 Z" fill={ML.crema2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /></g>
          </g>; })()}
        </>)}
      </Escena>
      {/* 8 · Hy-Fi, MoMA PS1, 2014 · 9 · composta */}
      <Escena T={T} a={K.To} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={900} fill={mixHex('#9aa3ad', ML.tierra, cae * 0.6)} stroke={KC.ink} strokeWidth={8} />
          <Torre T={T} sube={subeTorre} cae={cae} />
          <Persona x={760} y={1180} />
          {cae < 0.2 && subeTorre > 0.9 && <g opacity={kprog(T, K.To + 6.0, K.To + 6.4) * (1 - cae * 5)}>
            <line x1={150} y1={1180} x2={150} y2={265} stroke={KC.ink} strokeWidth={6} /><line x1={130} y1={265} x2={170} y2={265} stroke={KC.ink} strokeWidth={6} /><line x1={130} y1={1180} x2={170} y2={1180} stroke={KC.ink} strokeWidth={6} />
            <text x={120} y={720} textAnchor="middle" transform="rotate(-90 120 720)" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>MÁS DE 12 m</text></g>}
          {cae > 0 && <ellipse cx={450} cy={1180} rx={340 * cae} ry={70 * cae} fill={ML.tierra} stroke={KC.ink} strokeWidth={6} />}
          {[[300, 1150, 0], [430, 1130, 0.2], [560, 1150, 0.4], [370, 1165, 0.6], [500, 1165, 0.8]].map(([x, y, d], i) => <Brote key={i} x={x} y={y} p={kprog(T, K.Cp + 2.0 + d, K.Cp + 2.8 + d)} />)}
        </>)}
      </Escena>
      {/* 10 · más débil que la madera */}
      <Escena T={T} a={K.D} b={K.A} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform="translate(820 1010)">
            <rect x={-130} y={-30} width={260} height={60} rx={6} fill={ML.crema} stroke={KC.ink} strokeWidth={6} transform={`rotate(${kprog(T, K.D + 2.4, K.D + 3.2, kEase.rebote) * 7})`} />
            {kprog(T, K.D + 2.4, K.D + 2.6) > 0 && <path d="M -10 -30 L 8 -6 L -6 8 L 10 30" stroke={KC.red} strokeWidth={8} fill="none" />}
            <g transform={`translate(0 ${-30 + kprog(T, K.D + 2.4, K.D + 3.2, kEase.sale) * 30}) rotate(${kprog(T, K.D + 2.4, K.D + 3.2) * 8})`}>
              <rect x={-90} y={-130} width={180} height={130} fill="#ffd36b" stroke={KC.ink} strokeWidth={6} /><path d="M -110 -130 L 0 -220 L 110 -130 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
              <rect x={-24} y={-70} width={48} height={70} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} /></g>
          </g>
        </>)}
      </Escena>
      {/* 11 · chupa agua */}
      <Escena T={T} a={K.A} b={K.U} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <path d="M 120 640 L 640 640 L 610 760 L 150 760 Z" fill="#e6e9ee" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <path d={`M 140 ${700 - 20 * kprog(T, K.A + 0.2, K.A + 0.8)} L 620 ${700 - 20 * kprog(T, K.A + 0.2, K.A + 0.8)} L 610 756 L 152 756 Z`} fill={ML.agua} opacity=".85" />
          {(() => { const w = kprog(T, K.A + 0.6, K.A + 3.5, kEase.suave), sw = 1 + 0.12 * w; return <g transform={`translate(380 650) scale(${sw})`}>
            <rect x={-140} y={-140} width={280} height={150} rx={10} fill={mixHex(ML.crema, '#8f8064', w)} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.8 + i / 6) % 1); return w > 0.1 ? <circle key={i} cx={-110 + i * 44} cy={10 - u * 140} r={7} fill={ML.agua} opacity={1 - u} /> : null; })}</g>; })()}
        </>)}
      </Escena>
      {/* 12 · dónde sí sirve */}
      <Escena T={T} a={K.U} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 13 · cierre: la misma caja y la misma pieza, que vuelve a la tierra */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg((() => { const baja = kprog(T, K.C + 1.8, K.C + 3.2, kEase.suave), maceta = kprog(T, K.C + 1.2, K.C + 1.9, kEase.sale), deshace = kprog(T, K.C + 3.0, K.C + 4.0);
          return <>
            <g opacity={1 - maceta}><Caja x={400} y={1100} s={1.1} abre={1} /></g>
            {maceta > 0 && <g transform={`translate(0 ${(1 - maceta) * 400})`}><Maceta x={400} y={1100} s={1.1} tierra={deshace} /></g>}
            <g clipPath={baja > 0 ? 'url(#cpMac)' : undefined}><Esquinera x={380} y={klerp(760, 1080, baja)} s={1.15 * (1 - deshace * 0.5)} rot={-8 + baja * 8} blanco={1 - deshace * 0.6} op={1 - deshace} /></g>
            <clipPath id="cpMac"><rect x={0} y={0} width={KW} height={1100 - 150 * 1.1 + 4} /></clipPath>
            {deshace > 0 && <ellipse cx={400} cy={1100 - 165} rx={185} ry={20 + 10 * deshace} fill={ML.tierra} opacity={deshace} />}
            <Brote x={400} y={1100 - 170} p={kprog(T, K.C + 3.6, K.C + 4.6)} s={1.3} />
          </>; })())}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.6} until={K.R - 0.3} texto="¿unicel?" x={330} y={470} tam={60} />
      <Etq T={T} at={K.G + 2.0} until={K.R - 0.3} x={600} y={940} texto="empaque de micelio" tam={32} color={KC.ink} />
      <Etq T={T} at={K.R + 0.8} until={K.M - 0.3} x={300} y={760} texto="rastrojo de maíz" tam={32} color={KC.ink} />
      <Etq T={T} at={K.R + 1.6} until={K.M - 0.3} x={60} y={1180} texto="cascarilla" tam={32} color={KC.ink} />
      <Etq T={T} at={K.R + 2.8} until={K.M - 0.3} x={60} y={1240 - 0} texto="micelio de hongo" tam={32} color={KC.ink} />
      <Chip T={T} at={K.R + 1.0} until={K.M - 0.3} texto="lo que sobra de la cosecha" x={420} y={480} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.3} until={K.H - 0.3} texto="la forma que quieras" x={420} y={520} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.H + 0.2} until={K.B - 0.3} texto="AL MICROSCOPIO · hifas" x={430} y={480} tam={36} borde={KC.gold} mono />
      <Etq T={T} at={K.H + 1.6} until={K.B - 0.3} x={600} y={760} texto="hifas" tam={34} color={FK.hifa} />
      <Etq T={T} at={K.H + 0.8} until={K.B - 0.3} x={60} y={1260 - 20} texto="pedacito de rastrojo" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.B + 0.2} until={K.O - 0.3} texto={`día ${dia}`} x={540} y={600} tam={56} borde={KC.ink} mono />
      <Chip T={T} at={K.B + 2.5} until={K.O - 0.3} texto="pieza sólida" x={300} y={480} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.O + 0.6} until={K.P - 0.3} texto="ya no crece" x={340} y={500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.O + 1.2} until={K.P - 0.3} texto="en un estudio de 2019: horno a 70 °C" x={480} y={1180} tam={28} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.To + 0.2} until={K.To + 2.5} anio="2014" quien="Hy-Fi · MoMA PS1, Nueva York" revista="The Living · Arup · Holcim Foundation" y={640} />
      <NumeroGigante T={T} at={K.To + 2.8} until={K.Cp - 0.3} valor={10000} dur={3.4} etiqueta="ladrillos" x={830} y={900} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.To + 4.0} until={K.Cp - 0.3} texto="hongo + tallos de maíz" x={800} y={1060} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Cp + 0.4} until={K.D - 0.3} texto="verano de 2014 → composta" x={540} y={480} tam={38} borde={KC.leaf} />
      <Etq T={T} at={K.Cp + 2.4} until={K.D - 0.3} x={690} y={1100} texto="jardines comunitarios" tam={30} color={KC.ink} />
      <Chip T={T} at={K.D + 0.2} until={K.A - 0.3} texto="aguante a la compresión (MPa)" x={420} y={470} tam={34} borde={KC.ink} />
      <BarraV T={T} at={K.D + 0.6} until={K.A - 0.3} cx={180} base={1100} alto={480} desde={0.03} hasta={4.44} max={43} color={KC.paper} etiqueta="micelio" valor="0.03–4.44" />
      <BarraV T={T} at={K.D + 1.0} until={K.A - 0.3} cx={460} base={1100} alto={480} desde={35} hasta={43} max={43} color="#c98b4a" etiqueta="madera blanda" valor="35–43" />
      <Chip T={T} at={K.D + 2.6} until={K.A - 0.3} texto="no estructural" x={820} y={760} tam={36} borde={KC.red} />
      <Fuente T={T} at={K.D + 1.2} until={K.A - 0.3} texto="Aiduang et al., 2022 (revisión)" x={60} y={1180} />
      <Chip T={T} at={K.A + 0.6} until={K.U - 0.3} texto="agua que absorbe (% de su peso)" x={480} y={850} tam={34} borde={KC.ink} />
      <BarraRango T={T} at={K.A + 1.0} until={K.U - 0.3} desde={24.45} hasta={560} max={560} etiqueta="micelio" valor="24–560 %" color={KC.paper} y={910} />
      <BarraRango T={T} at={K.A + 1.6} until={K.U - 0.3} desde={0.03} hasta={9} max={560} etiqueta="unicel" valor="0.03–9 %" color={KC.yellow} y={1030} />
      <Fuente T={T} at={K.A + 1.6} until={K.U - 0.3} texto="Aiduang et al., 2022 (revisión)" x={90} y={1160} />
      <Uso T={T} at={K.U + 0.5} until={K.C - 0.3} texto="empaques" x={110} y={480} />
      <Uso T={T} at={K.U + 1.2} until={K.C - 0.3} texto="aislantes" x={110} y={620} />
      <Uso T={T} at={K.U + 1.9} until={K.C - 0.3} texto="paneles de interior" x={110} y={760} />
      <Uso T={T} at={K.U + 2.8} until={K.C - 0.3} texto="a la lluvia" ok={false} x={110} y={930} />
      <Uso T={T} at={K.U + 3.3} until={K.C - 0.3} texto="cargar peso" ok={false} x={110} y={1070} />
      <Etq T={T} at={K.C + 0.6} until={K.C + 2.6} x={600} y={940} texto="hongo + rastrojo" tam={32} color={KC.ink} />
      <Chip T={T} at={K.C + 3.4} until={K.Ou} texto="vuelve a la tierra" x={400} y={480} tam={42} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.R} until={K.M} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.M} until={K.H} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.H} until={K.B} texto="50 µm" largo={150} />
      <BarraEscala T={T} at={K.B} until={K.P} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.P} until={K.To} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.To} until={K.D} texto="2 m" largo={150} />
      <BarraEscala T={T} at={K.D} until={K.A} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.A} until={K.U} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="No es unicel: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.M - 0.1} texto="Rastrojo o cascarilla *+ micelio.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.H - 0.1} texto="Todo va *a un molde.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.B - 0.1} texto="Las hifas *lo amarran.*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.O - 0.1} texto="En días: *una pieza sólida.*" />
      <Subtitulo T={T} idx={5} at={K.O + 0.1} until={K.P - 0.1} texto="Con calor, *deja de crecer.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.To - 0.1} texto="¿Y si hacemos *ladrillos?*" />
      <Subtitulo T={T} idx={7} at={K.To + 0.1} until={K.Cp - 0.1} texto="2014, Nueva York: *10,000 ladrillos.*" />
      <Subtitulo T={T} idx={8} at={K.Cp + 0.1} until={K.D - 0.1} texto="Al final: *composta.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.A - 0.1} texto="Más débil *que la madera.*" />
      <Subtitulo T={T} idx={10} at={K.A + 0.1} until={K.U - 0.1} texto="Chupa agua: *más de 5 veces su peso.*" />
      <Subtitulo T={T} idx={11} at={K.U + 0.1} until={K.C - 0.1} texto="Donde no se moja *ni carga peso.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No era unicel: *era un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 1.4, K.M - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 1.9, K.B - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.O + 0.4, K.P - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.To - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.To + 3.0, K.Cp - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.D + 0.4, K.A - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.A + 1.4, K.U - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="47" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MicelioLadrilloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MicelioShot /></CompositionStage></div>;
}
window.MicelioLadrilloApp = MicelioLadrilloApp;
