// Shot IA #56 · La IA que "descubrió" 2.2 millones de cristales — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Merchant et al., Nature 624:80 (2023) · Szymanski et al., Nature 624:86 (2023) y su Author Correction, Nature 650:E1 (2026)
// · Cheetham y Seshadri, Chem. Mater. 36:3490 (2024). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const GCOL = [KC.pink, KC.yellow, KC.mint, KC.lilac, KC.orange, KC.cyan, KC.coral];

// Cristal isométrico (cubo facetado con átomos en la cara de arriba). gris = gemelo "estructura conocida".
function Cristal({ x, y, s = 40, color = KC.pink, gris = false, o = 1, rot = 0, trazo = 5 }) {
  const c = gris ? '#cfd3da' : color, a = 0.87 * s;
  const top = `M 0 ${-s} L ${a} ${-s / 2} L 0 0 L ${-a} ${-s / 2} Z`;
  const izq = `M ${-a} ${-s / 2} L 0 0 L 0 ${s} L ${-a} ${s / 2} Z`;
  const der = `M ${a} ${-s / 2} L 0 0 L 0 ${s} L ${a} ${s / 2} Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={top} fill={mixHex(c, '#ffffff', 0.45)} stroke={KC.ink} strokeWidth={trazo} strokeLinejoin="round" strokeDasharray={gris ? '10 7' : 'none'} />
    <path d={izq} fill={c} stroke={KC.ink} strokeWidth={trazo} strokeLinejoin="round" strokeDasharray={gris ? '10 7' : 'none'} />
    <path d={der} fill={mixHex(c, '#000000', 0.25)} stroke={KC.ink} strokeWidth={trazo} strokeLinejoin="round" strokeDasharray={gris ? '10 7' : 'none'} />
    {[[0, -s / 2], [a / 2, -s * 0.75], [-a / 2, -s * 0.75], [a / 2, -s / 4], [-a / 2, -s / 4]].map(([px, py], i) =>
      <circle key={i} cx={px} cy={py} r={s * 0.09} fill={gris ? '#8a8f99' : KC.ink} opacity=".7" />)}
  </g>;
}

// Lluvia de cristales que se acumulan (posiciones fijas por semilla).
const LLUVIA = (() => { const r = krng(56), out = [];
  for (let i = 0; i < 64; i++) out.push({ x: 70 + r() * 940, y: 640 + r() * 520, s: 26 + r() * 22, c: GCOL[i % GCOL.length], rot: (r() - 0.5) * 30, d: r() * 2.6 });
  return out; })();
function Lluvia({ T, t0, atenua = 0, marca = null }) {
  return <>{LLUVIA.map((p, i) => { const k = kprog(T, t0 + p.d, t0 + p.d + 0.55, kEase.sale); if (k <= 0) return null;
    const y = klerp(-120, p.y, k), m = marca ? marca(i, T) : null;
    return <g key={i}><Cristal x={p.x} y={y} s={p.s} color={p.c} rot={p.rot * (1 - k) + p.rot * 0.2} o={1 - atenua} />
      {m}</g>; })}</>;
}

// Lupa dibujada (aro + mango).
function LupaDib({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={70} width={28} height={130} rx={12} fill="#3b2a1a" stroke={KC.ink} strokeWidth={6} />
    <circle r={80} fill="rgba(200,240,255,.35)" stroke={KC.ink} strokeWidth={22} />
    <circle r={80} fill="none" stroke={KC.gold} strokeWidth={10} />
    <path d="M -45 -30 Q -30 -55 0 -60" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".8" />
  </g>;
}

// Celular con ventana "por dentro": chip y batería con su rejilla de átomos.
function CelularPorDentro({ T, x, y, abre = 1 }) {
  const rej = (x0, y0, w, h, c) => { const out = []; for (let i = 0; i < Math.floor(w / 26); i++) for (let j = 0; j < Math.floor(h / 26); j++)
    out.push(<circle key={`${i}-${j}`} cx={x0 + 13 + i * 26} cy={y0 + 13 + j * 26} r={6 + 1.5 * Math.sin(T * 5 + i + j)} fill={(i + j) % 2 ? c : KC.white} stroke={KC.ink} strokeWidth={2} />); return out; };
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-380} width={400} height={760} rx={60} fill="#1d2230" stroke={KC.ink} strokeWidth={12} />
    <rect x={-172} y={-340} width={344} height={680} rx={34} fill={mixHex('#2a3550', KC.noche, abre)} />
    <rect x={-60} y={-368} width={120} height={20} rx={10} fill={KC.ink} />
    <g opacity={abre}>
      {/* chip */}
      <rect x={-120} y={-290} width={240} height={200} rx={14} fill="#3a4766" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 8 }, (_, i) => <g key={i}><rect x={-112 + i * 30} y={-306} width={14} height={16} fill={KC.gold} /><rect x={-112 + i * 30} y={-90} width={14} height={16} fill={KC.gold} /></g>)}
      {rej(-104, -274, 208, 168, KC.cyan)}
      {/* batería */}
      <rect x={-130} y={-20} width={260} height={320} rx={20} fill="#2e5d46" stroke={KC.ink} strokeWidth={6} />
      <rect x={-40} y={-36} width={80} height={18} rx={6} fill={KC.ink} />
      {rej(-114, -4, 228, 288, KC.mint)}
    </g>
  </g>;
}

// Brazo robot de laboratorio con crisol; p 0..1 = vaivén del estante al horno.
function BrazoRobot({ T, x, y, p = 0 }) {
  const a1 = klerp(-70, -20, p), a2 = klerp(80, 40, p);
  const L1 = 260, L2 = 230;
  const j1x = x + L1 * Math.cos(a1 * Math.PI / 180), j1y = y + L1 * Math.sin(a1 * Math.PI / 180);
  const a12 = a1 + a2, hx = j1x + L2 * Math.cos(a12 * Math.PI / 180), hy = j1y + L2 * Math.sin(a12 * Math.PI / 180);
  return <g>
    <rect x={x - 90} y={y + 10} width={180} height={60} rx={14} fill="#596579" stroke={KC.ink} strokeWidth={8} />
    <line x1={x} y1={y} x2={j1x} y2={j1y} stroke={KC.ink} strokeWidth={56} strokeLinecap="round" />
    <line x1={x} y1={y} x2={j1x} y2={j1y} stroke={KC.orange} strokeWidth={40} strokeLinecap="round" />
    <line x1={j1x} y1={j1y} x2={hx} y2={hy} stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
    <line x1={j1x} y1={j1y} x2={hx} y2={hy} stroke={KC.orange} strokeWidth={30} strokeLinecap="round" />
    <circle cx={x} cy={y} r={34} fill="#d9dde4" stroke={KC.ink} strokeWidth={8} />
    <circle cx={j1x} cy={j1y} r={28} fill="#d9dde4" stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(${hx} ${hy})`}>
      <path d="M -40 0 L -40 50 M 40 0 L 40 50" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
      <path d="M -32 30 L 32 30 L 24 90 L -24 90 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-24} y={60} width={48} height={22} fill={KC.pink} />
    </g>
  </g>;
}
function Horno({ x, y, T, brillo = 1 }) {
  const g = 0.6 + 0.4 * Math.sin(T * 7);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={24} fill="#c9ced8" stroke={KC.ink} strokeWidth={9} />
    <rect x={-105} y={-120} width={210} height={170} rx={14} fill={mixHex('#3a1206', KC.orange, brillo * g)} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-80} cy={110} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <rect x={-40} y={98} width={140} height={26} rx={8} fill={KC.noche} />
    <text x={30} y={119} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.mint}>°C</text>
  </g>;
}

// Trébol de radiactividad.
function Trebol({ x, y, r = 40 }) {
  const aspa = (a) => { const a0 = (a - 30) * Math.PI / 180, a1 = (a + 30) * Math.PI / 180, ri = r * 0.28;
    return `M ${ri * Math.cos(a0)} ${ri * Math.sin(a0)} L ${r * Math.cos(a0)} ${r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} L ${ri * Math.cos(a1)} ${ri * Math.sin(a1)} A ${ri} ${ri} 0 0 0 ${ri * Math.cos(a0)} ${ri * Math.sin(a0)} Z`; };
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.18} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    {[-90, 30, 150].map((a) => <path key={a} d={aspa(a)} fill={KC.ink} />)}
    <circle r={r * 0.18} fill={KC.ink} />
  </g>;
}

// Rejilla de átomos: ordenados como tablero → revueltos (rev 0..1).
function Rejilla({ T, x, y, cols = 10, filas = 6, paso = 68, rev = 0 }) {
  const r = krng(9), perm = Array.from({ length: cols * filas }, (_, i) => r() > 0.5);
  const out = [];
  for (let j = 0; j < filas; j++) for (let i = 0; i < cols; i++) { const k = j * cols + i, orden = (i + j) % 2 === 0, azar = perm[k];
    const cambia = orden !== azar, u = cambia ? rev : 0;
    const jit = rev * 5 * Math.sin(T * 9 + k);
    out.push(<circle key={k} cx={x + i * paso + jit} cy={y + j * paso + jit * 0.6} r={paso * 0.34 * (1 - 0.5 * Math.sin(Math.PI * u))}
      fill={(u > 0.5 ? azar : orden) ? KC.pink : KC.cyan} stroke={KC.ink} strokeWidth={5} />); }
  return <>
    {Array.from({ length: filas }, (_, j) => <line key={`h${j}`} x1={x} y1={y + j * paso} x2={x + (cols - 1) * paso} y2={y + j * paso} stroke={KC.texto} strokeOpacity=".18" strokeWidth={4} />)}
    {Array.from({ length: cols }, (_, i) => <line key={`v${i}`} x1={x + i * paso} y1={y} x2={x + i * paso} y2={y + (filas - 1) * paso} stroke={KC.texto} strokeOpacity=".18" strokeWidth={4} />)}
    {out}
  </>;
}

// Balanza con dos platillos (inc = inclinación en grados).
function Balanza({ x, y, inc = 0 }) {
  const a = inc * Math.PI / 180, L = 300, lx = x - L * Math.cos(a), ly = y - L * Math.sin(a), rx = x + L * Math.cos(a), ry = y + L * Math.sin(a);
  const plato = (px, py, c) => <g>
    <line x1={px} y1={py} x2={px - 90} y2={py + 150} stroke={KC.ink} strokeWidth={5} /><line x1={px} y1={py} x2={px + 90} y2={py + 150} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${px - 120} ${py + 150} Q ${px} ${py + 220} ${px + 120} ${py + 150} Z`} fill={c} stroke={KC.ink} strokeWidth={7} />
  </g>;
  return <g>
    <rect x={x - 22} y={y} width={44} height={330} fill="#8a6a3a" stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 120} y={y + 320} width={240} height={36} rx={14} fill="#6b5030" stroke={KC.ink} strokeWidth={7} />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={KC.gold} strokeWidth={12} strokeLinecap="round" />
    <circle cx={x} cy={y} r={22} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    {plato(lx, ly, KC.mint)}{plato(rx, ry, KC.orange)}
  </g>;
}

// Química con bata y lupa (cierre).
function Quimica({ x, y, T }) {
  const b = Math.sin(T * 2.5) * 4;
  return <g transform={`translate(${x} ${y + b})`}>
    <path d="M -110 260 L -90 40 Q 0 -10 90 40 L 110 260 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -20 30 L 0 120 L 20 30" fill="#2346ff" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={120} x2={0} y2={250} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={-40} r={62} fill="#c98b5e" stroke={KC.ink} strokeWidth={8} />
    <path d="M -64 -50 Q -60 -118 0 -112 Q 62 -118 66 -50 Q 40 -86 0 -84 Q -40 -86 -64 -50 Z" fill="#2b1a10" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={-42} r={16} fill="none" stroke={KC.ink} strokeWidth={5} /><circle cx={22} cy={-42} r={16} fill="none" stroke={KC.ink} strokeWidth={5} />
    <line x1={-6} y1={-42} x2={6} y2={-42} stroke={KC.ink} strokeWidth={5} />
    <path d="M -16 -6 Q 0 4 16 -6" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -90 60 Q -170 100 -190 20" stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M -90 60 Q -170 100 -190 20" stroke="#ffffff" strokeWidth={18} fill="none" strokeLinecap="round" />
    <LupaDib x={-215} y={-50} s={0.7} rot={20} />
  </g>;
}

// Marcador grande "41 / 58" que se tacha y cambia a "36 / 57".
function Marcador({ T, at, until, tacha, y = 780 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), r = tacha == null ? 0 : kprog(T, tacha, tacha + 0.4, kEase.sale), n = tacha == null ? 0 : kprog(T, tacha + 0.6, tacha + 1.0, kEase.rebote);
  const est = (tam, c) => ({ font:`400 ${tam}px/1 ${KF.titulo}`, color:c, WebkitTextStroke:`${tam / 32}px ${KC.ink}`, textShadow:`${tam / 26}px ${tam / 26}px 0 ${KC.ink}`, whiteSpace:'nowrap' });
  return <div style={{ position:'absolute', left:KW / 2, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ position:'relative', display:'inline-block', ...est(tacha == null ? 230 : klerp(230, 140, n), KC.yellow), opacity: 1 - 0.45 * n }}>
      41 / 58
      <div style={{ position:'absolute', left:-14, top:'48%', height:18, width:`calc(${r * 100}% + 28px)`, background:KC.red, borderRadius:8, transform:'rotate(-6deg)', boxShadow:'0 4px 0 rgba(0,0,0,.6)' }}></div>
    </div>
    {n > 0 && <div style={{ ...est(230, KC.mint), transform:`scale(${n})`, marginTop:6 }}>36 / 57</div>}
  </div>;
}

// Título del artículo con "novel" tachado.
function TituloArticulo({ T, at, until, tacha, y = 470 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), r = kprog(T, tacha, tacha + 0.4, kEase.sale), n = kprog(T, tacha + 0.4, tacha + 0.8, kEase.sale);
  return <div style={{ position:'absolute', left:70, right:70, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y}px) rotate(-1.5deg)`,
    background:'#ffffff', border:`6px solid ${KC.ink}`, borderRadius:18, padding:'18px 26px', boxShadow:`10px 10px 0 ${KC.ink}`, textAlign:'left' }}>
    <div style={{ font:`700 24px ${KF.mono}`, color:'#7a6f62', marginBottom:8 }}>Nature · título del artículo</div>
    <div style={{ font:`700 34px/1.3 ${KF.mono}`, color:KC.ink }}>An autonomous laboratory for the accelerated synthesis of{' '}
      <span style={{ position:'relative', color: r > 0.5 ? '#9a9088' : KC.ink }}>novel
        <span style={{ position:'absolute', left:-6, top:'52%', height:7, width:`calc(${r * 100}% + 12px)`, background:KC.red, borderRadius:4 }}></span></span>
      {n > 0 && <span style={{ background:KC.mint, padding:'0 8px', borderRadius:6, marginLeft:10, opacity:n }}>inorganic</span>} materials</div>
  </div>;
}

// Sello rojo.
function Sello({ T, at, until, texto, sub, x, y, rot = -10 }) {
  if (!kvisible(T, at, until)) return null;
  const k = kprog(T, at, at + 0.3, kEase.sale), o = 1 - kprog(T, until, until + 0.4);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, opacity:Math.min(1, k * 2) * o, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2, 1, k)})`,
    border:`9px solid ${KC.red}`, borderRadius:20, padding:'10px 26px', background:'rgba(255,255,255,.88)', textAlign:'center' }}>
    <div style={{ font:`400 64px/1 ${KF.titulo}`, color:KC.red, letterSpacing:'.04em' }}>{texto}</div>
    {sub && <div style={{ font:`700 26px ${KF.mono}`, color:KC.red, marginTop:4 }}>{sub}</div>}
  </div>;
}

function Gnome() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cr: CUES.Cristales, Gn: CUES.Gnome, Ro: CUES.Robot, P: CUES.Pregunta, Ct: CUES.Critica, Rv: CUES.Revueltos, Co: CUES.Correccion, B: CUES.Balance, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // Gancho: los 10 "estables" elegidos al azar salen de la caja y van a una cuadrícula 5 × 2.
  const CAJA = { x: 70, y: 600, w: 470, h: 580 };
  const ESTABLES = LLUVIA.map((p, i) => i).filter((i) => LLUVIA[i].x < 500).slice(0, 10);
  const tSaca = K.G + 6.6, tGemelo = K.G + 7.8;
  const lupaX = klerp(180, 430, 0.5 + 0.5 * Math.sin((T - K.G) * 1.6)), lupaY = klerp(760, 1040, 0.5 + 0.5 * Math.cos((T - K.G) * 1.1));
  const cajaK = kprog(T, K.G + 4.0, K.G + 4.5, kEase.sale) * (1 - kprog(T, tSaca, tSaca + 0.6));
  const gancho = <>
    <Lluvia T={T} t0={K.G + 0.05} atenua={0.25 * cajaK + 0.8 * kprog(T, tSaca, tSaca + 0.8)}
      marca={(i) => null} />
    {cajaK > 0 && <g opacity={cajaK}>
      <rect x={CAJA.x} y={CAJA.y} width={CAJA.w} height={CAJA.h} rx={30} fill="rgba(255,255,255,.28)" stroke={KC.ink} strokeWidth={8} strokeDasharray="22 14" />
      <rect x={CAJA.x + 20} y={CAJA.y - 34} width={250} height={64} rx={20} fill={KC.ink} />
      <text x={CAJA.x + 145} y={CAJA.y + 10} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.mint}>estables</text>
    </g>}
    {T > K.G + 4.6 && T < tSaca + 0.6 && <g opacity={kprog(T, K.G + 4.6, K.G + 5.0) * (1 - kprog(T, tSaca, tSaca + 0.5))}><LupaDib x={lupaX} y={lupaY} s={0.85} /></g>}
    {ESTABLES.map((i, k) => { const p = LLUVIA[i], t0 = tSaca + k * 0.08, m = kprog(T, t0, t0 + 0.6, kEase.sale); if (m <= 0) return null;
      const gx = 160 + (k % 5) * 190, gy = 760 + Math.floor(k / 5) * 250;
      const X = klerp(p.x, gx, m), Y = klerp(p.y, gy, m), tg = tGemelo + k * 0.18, g = kprog(T, tg, tg + 0.35, kEase.rebote);
      return <g key={i}>
        {g > 0 && <Cristal x={X + 52} y={Y + 26} s={44 * g} gris />}
        <Cristal x={X} y={Y} s={klerp(p.s, 50, m)} color={p.c} />
        {g > 0 && <text x={X + 30} y={Y + 108} textAnchor="middle" style={{ font:`400 ${56 * g}px ${KF.titulo}` }} fill={KC.ink}>≈</text>}
      </g>; })}
  </>;

  // Cierre: la misma lluvia; la química revisa y marca uno por uno.
  const marcas = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33];
  const marcaCierre = (i, TT) => { const k = marcas.indexOf(i); if (k < 0) return null; const t0 = K.C + 1.6 + k * 0.28, e = kprog(TT, t0, t0 + 0.3, kEase.rebote); if (e <= 0) return null;
    const p = LLUVIA[i], ok = k % 3 !== 2;
    return <g transform={`translate(${p.x + 28} ${p.y - 40}) scale(${e})`}><circle r={24} fill={ok ? KC.mint : KC.white} stroke={KC.ink} strokeWidth={5} />
      <text y={12} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{ok ? '✓' : '?'}</text></g>; };

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 2.2 millones de cristales; diez estables al azar */}
      <Escena T={T} a={K.G} b={K.Cr}>
        <FondoLunares color={KC.cyan} />
        {svg(gancho)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 0.05} until={tSaca - 0.2} valor={2200000} dur={3.4} etiqueta="cristales «nuevos»" x={310} y={440} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.G + 4.3} until={tSaca - 0.2} texto="10 estables, al azar" x={770} y={540} tam={40} borde={KC.ink} />
      <Chip T={T} at={tGemelo - 0.2} until={K.Cr - 0.2} texto="estructura conocida ≈" x={540} y={600} tam={46} borde={KC.ink} />

      {/* 2 · de cristales son los chips y la batería */}
      <Escena T={T} a={K.Cr} b={K.Gn}>
        <FondoLunares color={KC.yellow} />
        {svg(<CelularPorDentro T={T} x={360} y={860} abre={kprog(T, K.Cr + 0.2, K.Cr + 0.9, kEase.sale)} />)}
      </Escena>
      <Etq T={T} at={K.Cr + 0.9} until={K.Gn - 0.2} x={500} y={670} texto="chip" color={KC.ink} tam={44} />
      <Etq T={T} at={K.Cr + 1.5} until={K.Gn - 0.2} x={500} y={1000} texto="batería" color={KC.ink} tam={44} />
      <Chip T={T} at={K.Cr + 2.0} until={K.Gn - 0.2} texto="por dentro: átomos en orden" x={740} y={830} tam={30} borde={KC.ink} />

      {/* 3 · GNoME (por dentro de la máquina) */}
      <Escena T={T} a={K.Gn} b={K.Ro}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={380} y={560} ancho={420} alto={380} capas={[4, 6, 6, 3]} onda={((T - K.Gn) * 0.7) % 1} />
        {svg(<>{Array.from({ length: 6 }, (_, i) => { const t0 = K.Gn + 0.8 + i * 0.6, u = ((T - t0) % 3.6) / 3.6; if (T < t0) return null;
          return <Cristal key={i} x={klerp(830, 1000, u) + (i % 2) * 20} y={600 + i * 60 + Math.sin(T * 2 + i) * 10} s={30} color={GCOL[i]} o={Math.sin(Math.PI * u)} />; })}</>)}
      </Escena>
      <Chip T={T} at={K.Gn + 0.3} until={K.Ro - 0.2} texto="GNoME · Google DeepMind" x={600} y={470} tam={42} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.Gn + 1.8} until={K.Ro - 0.2} valor={381000} desde={0} dur={1.2} prefijo="≈ " etiqueta="estables, según su cálculo (Nature, 2023)" x={540} y={1080} tam={120} color={KC.mint} />

      {/* 4 · el laboratorio robot A-Lab */}
      <Escena T={T} a={K.Ro} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Horno x={790} y={980} T={T} brillo={kprog(T, K.Ro + 1.2, K.Ro + 2.0)} />
          <BrazoRobot T={T} x={330} y={1060} p={0.5 + 0.5 * Math.sin((T - K.Ro) * 1.8)} />
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${70 + i * 60} 1110 L ${110 + i * 60} 1110 L ${104 + i * 60} 1160 L ${76 + i * 60} 1160 Z`} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />)}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Ro + 0.2} until={K.Ro + 2.6} anio="2023" quien="A-Lab · Berkeley" revista="Szymanski et al. · Nature" y={560} />
      <NumeroGigante T={T} at={K.Ro + 2.8} until={K.P - 0.2} valor={41} dur={0.8} sufijo=" / 58" etiqueta="cristales «nuevos» hechos" x={540} y={520} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.Ro + 4.0} until={K.P - 0.2} texto="en 17 días" x={540} y={700} tam={44} borde={KC.ink} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Ct} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1100} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>

      {/* 6 · la crítica de Santa Bárbara */}
      <Escena T={T} a={K.Ct} b={K.Rv}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          {[0, 1, 2].map((k) => { const t0 = K.Ct + 2.9 + k * 0.35, e = kprog(T, t0, t0 + 0.4, kEase.rebote), o = 1 - kprog(T, K.Ct + 5.3, K.Ct + 5.8); if (e <= 0 || o <= 0) return null;
            const cx = 200 + k * 340;
            return <g key={k} opacity={o} transform={`translate(${cx} 900) scale(${e})`}>
              <Cristal x={-80} y={0} s={58} color={GCOL[k * 2]} /><Cristal x={80} y={0} s={58} gris />
              <text x={0} y={22} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>≈</text>
              <text x={-80} y={112} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>«nuevo»</text>
              <text x={80} y={152} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>conocido</text>
            </g>; })}
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Ct + 5.7 + i * 0.12, e = kprog(T, t0, t0 + 0.4, kEase.rebote); if (e <= 0) return null;
            const x = 300 + (i % 3) * 150 + (Math.floor(i / 3) % 2) * 75, y = 1110 - Math.floor(i / 3) * 110;
            return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}><Cristal x={0} y={0} s={54} color={'#9be564'} /></g>; })}
          {T > K.Ct + 6.3 && <g transform={`scale(${kprog(T, K.Ct + 6.3, K.Ct + 6.7, kEase.rebote)})`} style={{ transformOrigin:'820px 900px' }}><Trebol x={820} y={900} r={80} /></g>}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Ct + 0.2} until={K.Ct + 2.7} anio="2024" quien="UC Santa Bárbara" revista="Cheetham y Seshadri · Chem. Mater." y={600} />
      <Chip T={T} at={K.Ct + 3.0} until={K.Ct + 5.4} texto="muchas: variaciones de lo conocido" x={540} y={720} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ct + 5.8} until={K.Rv - 0.2} valor={18000} dur={0.8} sufijo="+" etiqueta="con elementos radiactivos raros" x={420} y={730} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Ct + 6.6} until={K.Rv - 0.2} texto="prometio · actinio · protactinio" x={540} y={560} tam={34} mono borde={KC.ink} />

      {/* 7 · átomos ordenados vs. revueltos (por dentro) */}
      <Escena T={T} a={K.Rv} b={K.Co}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<Rejilla T={T} x={235} y={780} rev={kprog(T, K.Rv + 2.0, K.Rv + 3.0, kEase.suave)} />)}
      </Escena>
      <Chip T={T} at={K.Rv + 0.3} until={K.Rv + 2.0} texto="en la computadora: todo en su lugar" x={600} y={680} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Rv + 2.2} until={K.Co - 0.2} texto="en la vida real: revueltos" x={640} y={680} tam={40} borde={KC.pink} />

      {/* 8 · la corrección de 2026 */}
      <Escena T={T} a={K.Co} b={K.B}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      <TituloArticulo T={T} at={K.Co + 0.2} until={K.Co + 4.2} tacha={K.Co + 1.6} y={400} />
      <Sello T={T} at={K.Co + 0.9} until={K.Co + 4.2} texto="CORRECCIÓN" sub="Nature · enero 2026" x={760} y={1110} />
      <Marcador T={T} at={K.Co + 0.3} until={K.B - 0.2} tacha={K.Co + 2.2} y={840} />
      <Chip T={T} at={K.Co + 4.4} until={K.B - 0.2} texto="nuevos para su base de datos ✔" x={540} y={1075} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Co + 5.6} until={K.B - 0.2} texto="¿para la ciencia? no necesariamente" x={540} y={1170} tam={38} borde={KC.red} />

      {/* 9 · balance */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<Balanza x={540} y={760} inc={6 * Math.sin((T - K.B) * 1.5)} />)}
      </Escena>
      <Chip T={T} at={K.B + 0.4} until={K.C - 0.2} texto="el método promete" x={300} y={1150} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.B + 1.0} until={K.C - 0.2} texto="falta química" x={800} y={1150} tam={36} borde={KC.orange} />

      {/* 10 · cierre: la misma lluvia, revisada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Lluvia T={T} t0={K.C - 3} marca={marcaCierre} />
          <Quimica x={860} y={940} T={T} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.C + 0.1} until={K.Ou} valor={2200000} dur={0.01} etiqueta="2.2 millones de cristales…" x={310} y={440} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="≠ 2.2 millones de materiales" x={370} y={590} tam={34} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.G + 7.5} texto="2.2 millones de cristales *nuevos…*" />
      <Subtitulo T={T} idx={1} at={K.G + 7.6} until={K.Cr - 0.1} texto="…los 10 con *forma conocida*" />
      <Subtitulo T={T} idx={2} at={K.Cr + 0.1} until={K.Gn - 0.1} texto="Así son tu *chip* y tu *batería*" />
      <Subtitulo T={T} idx={3} at={K.Gn + 0.1} until={K.Ro - 0.1} texto="GNoME: *≈ 380 mil* estables" />
      <Subtitulo T={T} idx={4} at={K.Ro + 0.1} until={K.P - 0.1} texto="Robot de Berkeley: *41 de 58*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ct - 0.1} texto="¿Sí descubrieron *materiales?*" />
      <Subtitulo T={T} idx={6} at={K.Ct + 0.1} until={K.Rv - 0.1} texto="Variaciones… y *18 mil radiactivos*" />
      <Subtitulo T={T} idx={7} at={K.Rv + 0.1} until={K.Co - 0.1} texto="En la vida real *se revuelven*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.B - 0.1} texto="Corrección: *36 de 57*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.C - 0.1} texto="El método *promete*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Falta que *un químico* los revise" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cristales + 0.4, CUES.Gnome - 0.15, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Gnome + 3.0, CUES.Robot - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Critica + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Critica + 3.0, CUES.Critica + 5.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Revueltos + 0.6, CUES.Correccion - 0.15, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Correccion + 4.4, CUES.Balance - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Balance + 0.3, CUES.Cierre - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="56" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GnomeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gnome /></CompositionStage></div>;
}
window.GnomeApp = GnomeApp;
