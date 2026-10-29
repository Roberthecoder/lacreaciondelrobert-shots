// Shot IA #19 · ¿La IA puede predecir sismos? Lo que sí y lo que no — NARRADO (N3 "Capítulos y medidores" + toque N2).
// Datos: USGS (FAQ), CENAPRED 2019 y gob.mx (SASMEX), Mousavi et al. 2020 (Nat. Commun.), Rouet-Leduc et al. 2017 (GRL),
// DeVries et al. 2018 (Nature), Mignan y Broccardo 2019 (Nature). Ver guion.md y verificacion.md. El dibujo es esquemático.

// ---------- piezas propias ----------
// Celular con la cadena falsa de "mañana tiembla". vibra: 0..1 (sacudida). tachado: 0..1.
function CelularCadena({ T, x, y, s = 1, rot = -6, vibra = 0, o = 1 }) {
  const dx = vibra * Math.sin(T * 70) * 10, dr = vibra * Math.sin(T * 55) * 2.5;
  return <div style={{ position:'absolute', left:x, top:y, width:520, height:900, zIndex:20, opacity:o,
    transform:`translate(-50%,-50%) translateX(${dx}px) rotate(${rot + dr}deg) scale(${s})`,
    background:'#10131a', border:`12px solid ${KC.ink}`, borderRadius:70, boxShadow:'18px 22px 0 rgba(0,0,0,.35)', overflow:'hidden' }}>
    <div style={{ position:'absolute', left:160, top:16, width:200, height:36, borderRadius:20, background:KC.ink }}></div>
    <div style={{ position:'absolute', left:30, right:30, top:70, font:`700 30px ${KF.mono}`, color:'#9aa3b5', textAlign:'center' }}>3:14</div>
    <div style={{ position:'absolute', left:26, right:26, top:150, background:'#262c3a', borderRadius:30, padding:'22px 24px', color:KC.texto }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:12 }}>
        <svg width="54" height="48"><path d="M27 4 L51 44 L3 44 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth="4" strokeLinejoin="round" /><rect x="24" y="16" width="6" height="16" rx="2" fill={KC.ink} /><circle cx="27" cy="38" r="3.5" fill={KC.ink} /></svg>
        <div style={{ font:`700 22px ${KF.mono}`, color:'#9aa3b5' }}>Reenviado muchas veces</div>
      </div>
      <div style={{ font:`900 46px/1.1 ${KF.texto}`, color:KC.yellow }}>¡MAÑANA A LAS 3:14 TIEMBLA FUERTE!</div>
      <div style={{ font:`800 30px/1.25 ${KF.texto}`, marginTop:14 }}>Lo predijo una inteligencia artificial. ¡¡Compártelo!!</div>
    </div>
  </div>;
}
// Bola de cristal (la "predicción").
function BolaCristal({ x, y, s = 1, T = 0, rota = 0 }) {
  const b = 0.5 + 0.5 * Math.sin(T * 4);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 70 L 80 70 L 60 30 L -60 30 Z" fill={KC.violet} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={0} cy={-40} r={84} fill={mixHex('#b18cff', '#e8d9ff', b * 0.5)} stroke={KC.ink} strokeWidth={8} opacity=".95" />
    <path d="M -46 -80 Q -30 -100 -6 -104" stroke="#fff" strokeWidth={10} strokeLinecap="round" fill="none" opacity=".8" />
    <text x={0} y={-22} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.violet} opacity={0.4 + 0.5 * b}>?</text>
    {rota > 0 && <g opacity={rota}><line x1={-90} y1={-130} x2={90} y2={50} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /><line x1={90} y1={-130} x2={-90} y2={50} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>}
  </g>;
}
// Sello de goma (texto en dos líneas).
function Sello({ x, y, t, l1, l2, color = KC.red, rot = -12 }) {
  if (t <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, t)})`} opacity={Math.min(1, t * 2)}>
    <rect x={-250} y={-90} width={500} height={180} rx={22} fill="rgba(255,255,255,.88)" stroke={color} strokeWidth={12} />
    <text y={-14} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={color}>{l1}</text>
    <text y={62} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={color}>{l2}</text>
  </g>;
}
// Casilla de "predicción" con su ícono y una X roja.
function Casilla({ T, at, x, y, icono, texto, tacha }) {
  const e = kprog(T, at, at + 0.4, kEase.rebote), xx = kprog(T, tacha, tacha + 0.3, kEase.sale);
  if (T < at) return null;
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <rect x={-270} y={-90} width={540} height={180} rx={28} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(-180 0)">{icono}</g>
    <text x={-90} y={22} style={{ font:`400 74px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    {xx > 0 && <g transform="translate(200 0)" opacity={xx}><circle r={56} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <path d={`M -24 -24 L ${-24 + 48 * xx} ${-24 + 48 * xx} M 24 -24 L ${24 - 48 * xx} ${-24 + 48 * xx}`} stroke="#fff" strokeWidth={13} strokeLinecap="round" /></g>}
  </g>;
}
const IcoFecha = <g><rect x={-50} y={-44} width={100} height={92} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={6} /><rect x={-50} y={-44} width={100} height={28} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><text y={36} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>?</text></g>;
const IcoLugar = <g><path d="M 0 52 C -20 20 -46 -2 -46 -22 A 46 46 0 0 1 46 -22 C 46 -2 20 20 0 52 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><circle cy={-22} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} /></g>;
const IcoMagnitud = <g><rect x={-50} y={-48} width={100} height={96} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={6} /><path d="M -40 10 L -26 10 L -18 -30 L -6 34 L 6 -18 L 14 22 L 22 0 L 40 0" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinejoin="round" /></g>;

// Sismograma: ruido + eventos chicos (que se marcan cuando pasa el escáner) + uno grande.
function Sismograma({ T, x = 60, y = 900, ancho = 960, alto = 150, avance = 1, scan = -1, eventos = [], seed = 9, color = KC.mint }) {
  const r = krng(seed), N = 240, pts = [];
  const ruido = Array.from({ length: N }, () => r() * 2 - 1);
  for (let i = 0; i < N * avance; i++) {
    const u = i / N; let a = ruido[i] * 0.16;
    for (const ev of eventos) { const d = (u - ev.u) * 60; if (d > 0 && d < 6) a += Math.sin(i * 2.7) * ev.a * Math.exp(-d * 0.8); }
    pts.push(`${(x + u * ancho).toFixed(1)},${(y + a * alto / 2).toFixed(1)}`);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:12 }}>
    <rect x={x - 20} y={y - alto / 2 - 30} width={ancho + 40} height={alto + 60} rx={22} fill="rgba(13,20,36,.9)" stroke={KC.ink} strokeWidth={6} />
    {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />}
    {eventos.map((ev, i) => { const vis = scan >= ev.u; if (!vis) return null; const ex = x + ev.u * ancho;
      return <rect key={i} x={ex - 8} y={y - alto / 2 - 14} width={ev.w || 70} height={alto + 28} rx={10} fill="none" stroke={KC.yellow} strokeWidth={5} opacity={kclamp((scan - ev.u) * 20, 0, 1)} />; })}
    {scan >= 0 && scan <= 1 && <line x1={x + scan * ancho} y1={y - alto / 2 - 24} x2={x + scan * ancho} y2={y + alto / 2 + 24} stroke={KC.yellow} strokeWidth={6} opacity=".85" />}
  </svg>;
}
// Bocina de la alerta.
function Bocina({ x, y, s = 1, T = 0, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -22 L -12 -22 L 22 -50 L 22 50 L -12 22 L -40 22 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${38 + k * 20} -${26 + k * 14} Q ${54 + k * 26} 0 ${38 + k * 20} ${26 + k * 14}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round"
      opacity={on * (0.35 + 0.65 * Math.max(0, Math.sin(T * 9 - k)))} />)}
  </g>;
}
// Falla: dos bloques de roca con grieta en zigzag. tension 0..1 la hace temblar.
function Falla({ x, y, s = 1, T = 0, tension = 0 }) {
  const j = tension * Math.sin(T * 40) * 4;
  const grieta = 'M 0 -230 L 30 -170 L -10 -110 L 26 -40 L -14 30 L 22 100 L -8 170 L 14 230';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${-j} ${j * 0.5})`}><path d={`M -260 -230 L 0 -230 L 30 -170 L -10 -110 L 26 -40 L -14 30 L 22 100 L -8 170 L 14 230 L -260 230 Z`} fill="#c98a4b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {[-170, -60, 50, 150].map((yy, i) => <path key={i} d={`M -240 ${yy} q 60 -18 120 0 t 110 0`} stroke="rgba(0,0,0,.25)" strokeWidth={6} fill="none" />)}</g>
    <g transform={`translate(${j} ${-j * 0.5})`}><path d={`M 260 -230 L 0 -230 L 30 -170 L -10 -110 L 26 -40 L -14 30 L 22 100 L -8 170 L 14 230 L 260 230 Z`} fill="#a86d3a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {[-130, -20, 90, 190].map((yy, i) => <path key={i} d={`M 40 ${yy} q 60 -18 110 0 t 100 0`} stroke="rgba(0,0,0,.25)" strokeWidth={6} fill="none" />)}</g>
    <path d={grieta} stroke={KC.red} strokeWidth={6 + tension * 6} fill="none" opacity={tension} strokeLinejoin="round" />
  </g>;
}
// Máquina de laboratorio (cizalla doble): pistón empuja el bloque central entre dos bloques; micrófono en un costado.
// fase 0..1 dentro del ciclo de cada "sismo de laboratorio" (en 1 se desliza).
function MaquinaFalla({ x, y, s = 1, T = 0, fase = 0, desliz = 0 }) {
  const baja = fase * 14, salto = desliz * 22, sacude = desliz * Math.sin(T * 80) * 5;
  const amp = 0.3 + fase * 0.9;
  return <g transform={`translate(${x + sacude} ${y}) scale(${s})`}>
    <rect x={-300} y={-300} width={600} height={40} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={7} />
    <rect x={-300} y={-300} width={40} height={560} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={7} />
    <rect x={260} y={-300} width={40} height={560} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={7} />
    <rect x={-30} y={-260 + baja + salto} width={60} height={100} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
    <rect x={-220} y={-110} width={150} height={340} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
    <rect x={70} y={-110} width={150} height={340} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
    <rect x={-70} y={-160 + baja + salto} width={140} height={330} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
    {[-110, -40, 30, 100].map((yy) => <g key={yy}><line x1={-70} y1={yy + baja + salto} x2={-56} y2={yy + 14 + baja + salto} stroke={KC.ink} strokeWidth={4} /><line x1={56} y1={yy + baja + salto} x2={70} y2={yy + 14 + baja + salto} stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-300} y={230} width={600} height={40} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={7} />
    <g transform="translate(-220 40)"><rect x={-34} y={-22} width={34} height={44} rx={8} fill={KC.ink} /><circle cx={-48} r={22} fill="#2b3445" stroke={KC.ink} strokeWidth={5} /></g>
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${-290 - k * 26} ${40 - 30 - k * 18} Q ${-310 - k * 34} 40 ${-290 - k * 26} ${40 + 30 + k * 18}`} stroke={KC.cyan} strokeWidth={6} fill="none" strokeLinecap="round"
      opacity={kclamp(amp * (0.3 + 0.7 * Math.max(0, Math.sin(T * 10 - k * 0.9))), 0, 1)} />)}
  </g>;
}
// La Tierra (esquemática).
function Tierra({ x, y, r = 300, T = 0 }) {
  const g = (T * 12) % 360;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f6dff" stroke={KC.ink} strokeWidth={10} />
    <clipPath id="tierraClip"><circle r={r - 4} /></clipPath>
    <g clipPath="url(#tierraClip)"><g transform={`translate(${((g / 360) * r * 2) % (r * 2) - r} 0)`}>
      {[0, r * 2].map((ox) => <g key={ox} transform={`translate(${ox - r} 0)`}>
        <path d={`M ${-r * 0.2} ${-r * 0.7} q ${r * 0.4} ${-r * 0.1} ${r * 0.5} ${r * 0.3} q ${-r * 0.1} ${r * 0.3} ${-r * 0.4} ${r * 0.2} q ${-r * 0.3} ${-r * 0.2} ${-r * 0.1} ${-r * 0.5} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
        <path d={`M ${r * 0.4} ${r * 0.0} q ${r * 0.3} ${r * 0.1} ${r * 0.2} ${r * 0.5} q ${-r * 0.2} ${r * 0.2} ${-r * 0.3} ${-r * 0.1} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
        <path d={`M ${-r * 0.7} ${r * 0.1} q ${r * 0.3} ${-r * 0.1} ${r * 0.35} ${r * 0.25} q ${-r * 0.1} ${r * 0.35} ${-r * 0.3} ${r * 0.3} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
      </g>)}
    </g></g>
    <path d={`M ${-r * 0.6} ${-r * 0.55} A ${r} ${r} 0 0 1 ${-r * 0.1} ${-r * 0.85}`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".6" />
  </g>;
}
// Cuadrícula de réplicas alrededor de un sismo grande (estrella). on: 0..1 cuántas celdas se encienden.
function MapaReplicas({ T, x, y, n = 11, celda = 56, on = 0, seed = 5 }) {
  const r = krng(seed), c = (n - 1) / 2, cells = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const d = Math.hypot(i - c, (j - c) * 1.3), ang = Math.atan2(j - c, i - c);
    const p = Math.exp(-d / 2.6) * (0.55 + 0.45 * Math.abs(Math.cos(2 * ang))) + r() * 0.15;
    cells.push({ i, j, p, k: r() });
  }
  const orden = [...cells].sort((a, b) => b.p - a.p), lim = Math.floor(on * 34), acti = new Set(orden.slice(0, lim));
  const x0 = x - (n * celda) / 2, y0 = y - (n * celda) / 2;
  return <g>
    <rect x={x0 - 14} y={y0 - 14} width={n * celda + 28} height={n * celda + 28} rx={20} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
    {cells.map((q, k) => <rect key={k} x={x0 + q.i * celda + 3} y={y0 + q.j * celda + 3} width={celda - 6} height={celda - 6} rx={8}
      fill={acti.has(q) ? KC.orange : 'rgba(0,0,0,.06)'} stroke={acti.has(q) ? KC.ink : 'none'} strokeWidth={3} />)}
    <path d={Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 20 : 46; return `${k ? 'L' : 'M'} ${x + rr * Math.cos(a)} ${y + rr * Math.sin(a)}`; }).join(' ') + ' Z'}
      fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform={`rotate(${Math.sin(T * 2) * 6} ${x} ${y})`} />
  </g>;
}
// Bote de basura.
function Basura({ x, y, s = 1, tapa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -60 L 90 -60 L 70 130 L -70 130 Z" fill="#7f8ba3" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-40, 0, 40].map((xx) => <line key={xx} x1={xx} y1={-30} x2={xx * 0.85} y2={104} stroke={KC.ink} strokeWidth={6} opacity=".5" />)}
    <g transform={`rotate(${-tapa * 35} -100 -70)`}><rect x={-105} y={-86} width={210} height={26} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={7} /><rect x={-26} y={-104} width={52} height={20} rx={8} fill="#5b6475" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
// Audífonos para el robotito.
function Audifonos({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 Q -150 -190 0 -190 Q 150 -190 150 0" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M -150 0 Q -150 -190 0 -190 Q 150 -190 150 0" stroke={KC.pink} strokeWidth={10} fill="none" strokeLinecap="round" />
    <rect x={-178} y={-30} width={46} height={100} rx={20} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <rect x={132} y={-30} width={46} height={100} rx={20} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
  </g>;
}

// ---------- mapa del SASMEX (esquemático) ----------
const S_MAP = 2.2, OX_MAP = -428, OY_MAP = 36;
const pMapa = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [a * S_MAP + OX_MAP, b * S_MAP + OY_MAP]; };
const COSTA = [[-105.1, 20.4], [-104.2, 19.25], [-103.4, 18.45], [-102.4, 18.0], [-101.4, 17.75], [-100.6, 17.3], [-99.8, 17.0], [-99.0, 16.75], [-98.2, 16.55], [-97.3, 16.15], [-96.4, 15.95], [-95.5, 16.25], [-100.4, 18.0], [-98.9, 18.1], [-97.8, 17.6], [-96.8, 17.2]];

function Sismos() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Predecir, A: CUES.Alerta, E: CUES.Escuchar, Q: CUES.Pregunta, L: CUES.Laboratorio, R: CUES.Replicas, N: CUES.Neurona, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const L2 = K.L + (K.R - K.L) * 0.81;               // "Pero era una máquina, no la Tierra."
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // sismo del mapa (alerta)
  const tS = K.A + 2.0, [ex, ey] = pMapa(-100.1, 16.95), [cx, cy] = pMapa(-99.13, 19.43);
  const radio = kprog(T, tS + 0.4, tS + 1.1, kEase.sale);         // la señal de radio llega rápido
  const onda = Math.max(0, T - tS) * 34;                          // la onda sísmica avanza más lenta
  // laboratorio: ciclos de "sismos de laboratorio"
  const CIC = 2.3, tl = T - (K.L + 0.4), fase = tl > 0 ? (tl % CIC) / CIC : 0, desliz = tl > 0 && fase < 0.12 ? 1 - fase / 0.12 : 0;
  const zoomOut = kprog(T, L2, L2 + 1.0, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cadena de "mañana tiembla" */}
      <Escena T={T} a={K.G} b={K.P}>
        <FondoLunares color={KC.yellow} />
        <CelularCadena T={T} x={330} y={900} vibra={1 - kprog(T, K.G + 1.2, K.G + 2.0)} />
        {svg(<>
          <Sello x={340} y={1040} t={kprog(T, K.G + 3.1, K.G + 3.45, kEase.sale)} l1="NINGÚN CIENTÍFICO" l2="LO HA LOGRADO" />
          <g opacity={kprog(T, K.G + 5.4, K.G + 5.8)}><Robotito x={820} y={1000} s={0.8} T={T} cara="duda" /><BolaCristal x={820} y={790} s={0.75} T={T} rota={kprog(T, K.G + 6.2, K.G + 6.6, kEase.sale)} /></g>
        </>, 25)}
      </Escena>
      <Chip T={T} at={K.G + 3.6} until={K.P - 0.2} texto="USGS" x={340} y={1220 - 80} tam={34} borde={KC.ink} />
      {/* 2 · qué es predecir */}
      <Escena T={T} a={K.P} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Casilla T={T} at={K.P + 0.3} x={360} y={560} icono={IcoFecha} texto="FECHA" tacha={K.P + 2.2} />
          <Casilla T={T} at={K.P + 0.8} x={360} y={790} icono={IcoLugar} texto="LUGAR" tacha={K.P + 2.5} />
          <Casilla T={T} at={K.P + 1.3} x={360} y={1020} icono={IcoMagnitud} texto="MAGNITUD" tacha={K.P + 2.8} />
        </>)}
      </Escena>
      {/* 3 · la alerta sísmica: detecta, no predice */}
      <Escena T={T} a={K.A} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <MapaMexico x={OX_MAP} y={OY_MAP} ancho={1000 * S_MAP} color="#ffe9a8" />
          {COSTA.map(([lo, la], i) => { const [px, py] = pMapa(lo, la), e = kprog(T, K.A + 0.3 + i * 0.05, K.A + 0.6 + i * 0.05, kEase.rebote);
            return <g key={i} transform={`translate(${px} ${py}) scale(${e})`}><rect x={-11} y={-11} width={22} height={22} rx={5} fill={KC.blue} stroke={KC.ink} strokeWidth={4} /></g>; })}
          {T > tS && <g>
            {[0, 1, 2].map((k) => { const rr = Math.max(0, onda - k * 40); return rr > 0 && <circle key={k} cx={ex} cy={ey} r={rr} fill="none" stroke={KC.red} strokeWidth={8} opacity={Math.max(0, 0.9 - rr / 420)} />; })}
            <path d={Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 14 : 34; return `${k ? 'L' : 'M'} ${ex + rr * Math.cos(a)} ${ey + rr * Math.sin(a)}`; }).join(' ') + ' Z'} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <line x1={ex} y1={ey} x2={klerp(ex, cx, radio)} y2={klerp(ey, cy, radio)} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
            <line x1={ex} y1={ey} x2={klerp(ex, cx, radio)} y2={klerp(ey, cy, radio)} stroke={KC.yellow} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={-T * 80} strokeLinecap="round" />
          </g>}
          <circle cx={cx} cy={cy} r={18} fill={KC.ink} />
          <text x={cx + 30} y={cy - 22} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>CDMX</text>
          <Bocina x={cx - 10} y={cy - 110} s={1.1} T={T} on={radio >= 1 ? 1 : 0} />
        </>)}
      </Escena>
      <Chip T={T} at={K.A + 1.0} until={K.A + 3.6} texto="detecta ≠ predice" x={540} y={470} tam={46} borde={KC.red} />
      <Etq T={T} at={K.A + 0.8} until={K.E - 0.3} x={pMapa(-96.5, 15.3)[0]} y={pMapa(-96.5, 15.3)[1]} texto="sensores en la costa" lado="izq" color={KC.ink} tam={30} />
      <Chip T={T} at={tS + 0.6} until={K.E - 0.2} texto="onda sísmica: más lenta" x={290} y={860} tam={28} borde={KC.red} />
      <Chip T={T} at={K.A + 3.7} until={K.E - 0.2} texto="aviso: 20 a 120 s antes" x={700} y={470} tam={30} borde={KC.yellow} />
      {/* 4 · la IA escucha: catálogos */}
      <Escena T={T} a={K.E} b={K.Q}>
        <FondoCircuito T={T} />
        <Sismograma T={T} y={920} avance={kprog(T, K.E - 0.3, K.E + 1.2)} scan={klerp(-0.05, 1.05, kprog(T, K.E + 1.0, K.E + 3.3))}
          eventos={[{ u: 0.12, a: 0.5 }, { u: 0.27, a: 0.35 }, { u: 0.4, a: 0.6 }, { u: 0.55, a: 0.3 }, { u: 0.66, a: 0.45 }, { u: 0.8, a: 0.4 }, { u: 0.9, a: 0.55 }]} />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.E + 3.3, K.E + 3.7) }}></div>
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.E + 3.2} anio="2020" quien="Universidad de Stanford" revista="Mousavi et al. · EQTransformer · Nature Communications" y={560} />
      <Chip T={T} at={K.E + 1.2} until={K.E + 3.2} texto="sismos diminutos que se perdían" x={540} y={1090} tam={34} borde={KC.yellow} />
      {/* el sismograma se esconde y salen los números */}
      {kvisible(T, K.E + 3.4, K.Q - 0.2) && <div style={{ position:'absolute', left:0, top:780, width:KW, height:300, zIndex:13, background:KC.noche, opacity:kprog(T, K.E + 3.3, K.E + 3.7) * (1 - kprog(T, K.Q - 0.2, K.Q + 0.3)) }}></div>}
      <Comparativa T={T} at={K.E + 3.5} until={K.Q - 0.2} y={720} alto={260} max={21092}
        izq={{ valor: 8521, texto: '8 521', etiqueta: 'antes', color: '#9aa3b5' }}
        der={{ valor: 21092, texto: '21 092', etiqueta: 'con IA', color: KC.mint }} />
      <Chip T={T} at={K.E + 4.2} until={K.Q - 0.2} texto="Tottori, Japón · 5 semanas" x={400} y={470} tam={28} borde={KC.mint} />
      {/* 5 · pregunta: ¿oír que una falla va a romperse? */}
      <Escena T={T} a={K.Q} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Falla x={300} y={900} s={0.9} T={T} tension={kprog(T, K.Q + 0.5, K.Q + 2.5)} />
          <text x={290} y={760} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 640)`}>?</text>
        </>)}
      </Escena>
      {/* 6 · laboratorio de Los Álamos */}
      <Escena T={T} a={K.L} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g transform={`translate(${klerp(600, 280, zoomOut)} ${klerp(860, 800, zoomOut)}) scale(${klerp(1, 0.4, zoomOut)}) translate(-600 -860)`}>
            <MaquinaFalla x={600} y={790} s={0.95} T={T} fase={fase} desliz={desliz} />
          </g>
          {zoomOut > 0 && <g opacity={zoomOut} transform={`translate(${klerp(300, 0, zoomOut)} 0)`}><Tierra x={740} y={830} r={klerp(100, 290, zoomOut)} T={T} /></g>}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.L + 0.3} until={K.L + 3.6} anio="2017" quien="Laboratorio de Los Álamos, EE. UU." revista="Rouet-Leduc et al. · Geophysical Research Letters" y={520} />
      <Medidor T={T} at={K.L + 3.6} until={L2 - 0.2} y={1075} etiqueta="falta para el siguiente sismo" color={KC.yellow}
        valor={(t) => { const u = t - (K.L + 0.4); return u > 0 ? 1 - ((u % CIC) / CIC) : 1; }} texto={(v) => `${kformato(v * CIC, 1)} s`} />
      <Chip T={T} at={K.L + 4.0} until={K.L + 6.4} texto="la IA escucha el sonido de la falla" x={540} y={440} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.L + 6.6} until={L2 - 0.2} texto="«ruido inútil»… que no lo era" x={390} y={440} tam={38} borde={KC.yellow} />
      <Chip T={T} at={L2 + 0.6} until={K.R - 0.2} texto="laboratorio ≠ planeta" x={540} y={1110} tam={44} borde={KC.red} />
      {/* 7 · réplicas: Harvard y Google, 2018 */}
      <Escena T={T} a={K.R} b={K.N}>
        <FondoLunares color={KC.pink} />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.R + 2.4, K.R + 2.8) }}>
          {svg(<MapaReplicas T={T} x={540} y={830} on={kprog(T, K.R + 0.6, K.R + 2.4)} />)}
        </div>
      </Escena>
      <Chip T={T} at={K.R + 0.2} until={K.N - 0.2} texto="2018 · Harvard + Google · Nature" x={540} y={440} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.R + 1.0} until={K.R + 2.4} x={850} y={1040} texto="réplicas" lado="izq" color={KC.ink} tam={32} />
      <Comparativa T={T} at={K.R + 2.7} until={K.N - 0.2} y={700} alto={300} max={1}
        izq={{ valor: 0.849, texto: '0.85', etiqueta: 'red neuronal', color: KC.yellow }}
        der={{ valor: 0.583, texto: '0.58', etiqueta: 'método clásico', color: '#9aa3b5' }} />
      <Chip T={T} at={K.R + 3.4} until={K.N - 0.2} texto="qué tanto atina (AUC)" x={540} y={1110} tam={30} borde={KC.ink} />
      {/* 8 · una neurona contra 13 451 parámetros */}
      <Escena T={T} a={K.N} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <RedNeuronal T={T} x={620} y={800} ancho={360} alto={170} capas={[4, 7, 7, 7, 1]} onda={(T * 0.6) % 1} o={kprog(T, K.N + 3.2, K.N + 3.6)} />
        {svg(<g opacity={kprog(T, K.N + 1.8, K.N + 2.1)}>
          <circle cx={800} cy={540} r={52 * (1 + 0.06 * Math.sin(T * 5))} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
          <line x1={670} y1={515} x2={750} y2={530} stroke={KC.ink} strokeWidth={7} /><line x1={670} y1={570} x2={750} y2={552} stroke={KC.ink} strokeWidth={7} /><line x1={852} y1={540} x2={930} y2={540} stroke={KC.ink} strokeWidth={7} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.N + 0.2} until={K.N + 1.8} anio="2019" quien="Mignan y Broccardo" revista="Nature · «Una neurona contra el aprendizaje profundo»" y={760} />
      <NumeroGigante T={T} at={K.N + 1.9} until={K.C - 0.2} valor={2} etiqueta="parámetros" x={800} y={690} tam={110} color={KC.yellow} dur={0.3} />
      <NumeroGigante T={T} at={K.N + 3.4} until={K.C - 0.2} valor={13451} etiqueta="parámetros" x={800} y={1060} tam={100} color={KC.red} dur={0.9} />
      <Chip T={T} at={K.N + 4.6} until={K.C - 0.2} texto="mismo acierto: 0.85 = 0.85" x={790} y={430} tam={28} borde={KC.leaf} />
      {/* 9 · cierre: el mismo celular, a la basura */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {(() => { const v = kprog(T, K.C + 0.6, K.C + 1.6, kEase.suave);
          return <CelularCadena T={T} x={klerp(330, 270, v)} y={klerp(900, 1050, v)} s={klerp(1, 0.18, v)} rot={klerp(-6, -40, v)} o={1 - kprog(T, K.C + 1.45, K.C + 1.6)} />; })()}
        {svg(<>
          <Basura x={270} y={1040} s={1.1} tapa={kprog(T, K.C + 0.4, K.C + 0.8) * (1 - kprog(T, K.C + 1.6, K.C + 1.9))} />
          <g opacity={kprog(T, K.C + 1.8, K.C + 2.2)}><Robotito x={780} y={960} s={0.85} T={T} cara="feliz" /><Audifonos x={780} y={940} s={0.85} /></g>
        </>, 25)}
      </Escena>
      {kvisible(T, K.C + 2.2, K.Ou) && <div style={{ position:'absolute', inset:0, zIndex:26, opacity:kprog(T, K.C + 2.1, K.C + 2.4) }}><Sismograma T={T} x={110} y={700} ancho={360} alto={90} avance={kprog(T, K.C + 2.2, K.C + 3.2)} scan={-1} eventos={[{ u: 0.3, a: 0.6 }, { u: 0.7, a: 0.5 }]} /></div>}
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="escucha, no adivina" x={780} y={1110} tam={40} borde={KC.leaf} />

      <Capitulo T={T} hasta={K.C} caps={[{ at: K.G + 0.2, titulo: 'Lo que NO' }, { at: K.A, titulo: 'La alerta' }, { at: K.E, titulo: 'Lo que SÍ' }, { at: K.L, titulo: 'El laboratorio' }, { at: K.R, titulo: 'La polémica' }]} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="¿Mañana tiembla? *Nadie lo ha predicho.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.A - 0.1} texto="Fecha, lugar y magnitud: *nadie.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.E - 0.1} texto="La alerta *detecta,* no predice." />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Q - 0.1} texto="La IA escucha: *el doble de sismos.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.L - 0.1} texto="¿Y si oyera *a la falla?*" />
      <Subtitulo T={T} idx={5} at={K.L + 0.1} until={L2 - 0.1} texto="La IA calculó *cuánto faltaba.*" />
      <Subtitulo T={T} idx={6} at={L2 + 0.05} until={K.R - 0.1} texto="Pero era una máquina, *no la Tierra.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.N - 0.1} texto="Red neuronal: *mejor con las réplicas.*" />
      <Subtitulo T={T} idx={8} at={K.N + 0.1} until={K.C - 0.1} texto="Una fórmula de *2 números* la igualó." />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="La IA no adivina sismos: *los escucha.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Predecir + 0.6, CUES.Alerta - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Alerta + 3.5, CUES.Escuchar - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Escuchar + 3.6, CUES.Pregunta - 0.15, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Laboratorio + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Laboratorio + 6.6, L2 + 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Replicas + 3.0, CUES.Neurona - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Neurona + 1.9, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [CUES.Cierre + 2.0, CUES.Outro - 0.1, 'avatar_04_bajando_lentes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="19" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SismosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Sismos /></CompositionStage></div>;
}
window.SismosApp = SismosApp;
