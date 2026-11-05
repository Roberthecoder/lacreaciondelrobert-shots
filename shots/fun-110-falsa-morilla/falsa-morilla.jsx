// Shot Fungi Mati #110 · Esto no es una morilla — NARRADO (gancho 1 "Esto no es X: es Y" + mitos peligrosos tachados).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. NO es guía de identificación.

const FM = { tierra:'#6b4426', tierra2:'#4a2d18', hoja:'#b8742e', hoja2:'#8f5a22',
  mRidge:'#dcc08a', mPit:'#7a5226', mPie:'#f1e6c8', mCarne:'#f6eedb',
  gCap:'#8a2f1c', gCap2:'#5a1a10', gArr:'#3a0d06', gLuz:'#b9573c', gPie:'#efe2d6', gCarne:'#f3e9df', hueco:'#2a1d14' };

// Suelo de bosque con hojarasca. Desde y hasta abajo.
function SueloBosque({ y = 1150, seed = 4 }) {
  const g = krng(seed);
  const hojas = Array.from({ length: 26 }, () => ({ x: g() * 1080, y: y + 10 + g() * 120, r: g() * 180, c: g() > 0.5 ? FM.hoja : FM.hoja2, s: 0.7 + g() * 0.6 }));
  return <g>
    <rect x={-20} y={y} width={1120} height={1920 - y + 20} fill={FM.tierra} />
    <path d={`M -20 ${y} Q 270 ${y - 18} 540 ${y} Q 810 ${y + 16} 1100 ${y - 4}`} fill={FM.tierra} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={y + 150} width={1120} height={1920} fill={FM.tierra2} />
    {hojas.map((h, i) => <g key={i} transform={`translate(${h.x} ${h.y}) rotate(${h.r}) scale(${h.s})`}>
      <path d="M -34 0 Q 0 -18 34 0 Q 0 18 -34 0 Z" fill={h.c} stroke={KC.ink} strokeWidth={4} />
      <line x1={-30} y1={0} x2={30} y2={0} stroke={KC.ink} strokeWidth={2} opacity=".5" />
    </g>)}
  </g>;
}

// MORILLA verdadera (Morchella): sombrero cónico con hoyos tipo panal (alvéolos) y costillas, PEGADO al pie por su borde de abajo.
// corte = vista partida a lo largo: por dentro es hueca (un solo hueco del sombrero al pie). Base del pie en (x, y).
const M_CAP = 'M -64 -140 Q -82 -262 -30 -362 Q 0 -404 30 -362 Q 82 -262 64 -140 Q 0 -130 -64 -140 Z';
const M_PIE = 'M -40 -2 Q -48 -70 -36 -146 L 36 -146 Q 48 -70 42 -2 Q 0 10 -40 -2 Z';
const M_PITS = (() => { const g = krng(11), out = [];
  for (let r = 0; r < 10; r++) { const yy = -158 - r * 24, n = 6; for (let c = 0; c < n; c++) out.push({ x: -66 + c * 26 + (r % 2) * 13 + (g() - 0.5) * 6, y: yy + (g() - 0.5) * 6, rx: 9 + g() * 3, ry: 12 + g() * 4 }); }
  return out; })();
function Morilla({ x, y, s = 1, crece = 1, corte = false, id = 'm' }) {
  if (crece <= 0) return null;
  const k = kEase.rebote(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k} ${s * k})`}>
    <defs><clipPath id={`${id}cap`}><path d={M_CAP} /></clipPath></defs>
    {!corte && <>
      <path d={M_PIE} fill={FM.mPie} stroke={KC.ink} strokeWidth={6} />
      {[-18, 4, 22].map((dx, i) => <path key={i} d={`M ${dx} -20 Q ${dx + 4} -80 ${dx} -136`} stroke="#d8c7a0" strokeWidth={4} fill="none" />)}
      <path d={M_CAP} fill={FM.mRidge} />
      <g clipPath={`url(#${id}cap)`}>{M_PITS.map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={FM.mPit} stroke="#5a3a18" strokeWidth={2} />)}</g>
      <path d={M_CAP} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </>}
    {corte && <>
      {/* corte a lo largo: pared delgada, un solo hueco continuo del sombrero al pie */}
      <path d={M_PIE} fill={FM.mCarne} stroke={KC.ink} strokeWidth={6} />
      <path d={M_CAP} fill={FM.mCarne} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <g clipPath={`url(#${id}cap)`}>{M_PITS.filter((p) => Math.abs(p.x) > 46 - (p.y + 140) * -0.05 || p.y < -350).map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={FM.mPit} />)}</g>
      <path d="M -22 -14 L -21 -150 Q -48 -152 -46 -236 Q -40 -320 0 -362 Q 40 -320 46 -236 Q 48 -152 21 -150 L 22 -14 Q 0 -8 -22 -14 Z" fill={FM.hueco} stroke={KC.ink} strokeWidth={4} />
      <path d={M_CAP} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </>}
  </g>;
}

// FALSA MORILLA (Gyromitra esculenta): sombrero lobulado y arrugado como cerebro, café rojizo; pie corto, grueso, blancuzco,
// con pliegues. corte = partida: por dentro con cámaras (no un solo hueco). Base del pie en (x, y).
const G_CAP = (() => { const pts = []; for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2;
  const r = 1 + 0.1 * Math.sin(3 * a + 0.6) + 0.07 * Math.sin(5 * a + 2.1) + 0.05 * Math.sin(8 * a);
  pts.push([Math.cos(a) * 128 * r, -205 + Math.sin(a) * 98 * r + (Math.sin(a) > 0.55 ? 14 : 0)]); }
  return 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + ' Z'; })();
const G_PIE = 'M -50 -2 Q -60 -60 -44 -132 L 48 -132 Q 62 -60 52 -2 Q 0 10 -50 -2 Z';
const G_ARR = (() => { const g = krng(23), out = [];
  for (let i = 0; i < 16; i++) { let px = -120 + g() * 240, py = -290 + g() * 170, d = `M ${px.toFixed(0)} ${py.toFixed(0)}`;
    for (let j = 0; j < 3; j++) { const qx = px + (g() - 0.5) * 70, qy = py + (g() - 0.5) * 60; px += (g() - 0.5) * 90; py += (g() - 0.5) * 50; d += ` Q ${qx.toFixed(0)} ${qy.toFixed(0)} ${px.toFixed(0)} ${py.toFixed(0)}`; }
    out.push(d); }
  return out; })();
function FalsaMorilla({ x, y, s = 1, crece = 1, corte = false, id = 'g', T = 0 }) {
  if (crece <= 0) return null;
  const k = kEase.rebote(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k} ${s * k})`}>
    <defs>
      <clipPath id={`${id}cap`}><path d={G_CAP} /></clipPath>
      <radialGradient id={`${id}grad`} cx="40%" cy="35%" r="75%"><stop offset="0%" stopColor={FM.gLuz} /><stop offset="55%" stopColor={FM.gCap} /><stop offset="100%" stopColor={FM.gCap2} /></radialGradient>
    </defs>
    {!corte && <>
      <path d={G_PIE} fill={FM.gPie} stroke={KC.ink} strokeWidth={6} />
      <path d="M -20 -10 Q -30 -60 -14 -126 M 14 -8 Q 26 -70 12 -126" stroke="#cdb9a6" strokeWidth={5} fill="none" />
      <path d={G_CAP} fill={`url(#${id}grad)`} />
      <g clipPath={`url(#${id}cap)`}>
        {G_ARR.map((d, i) => <path key={i} d={d} stroke={FM.gArr} strokeWidth={9} fill="none" strokeLinecap="round" opacity=".8" />)}
        {G_ARR.map((d, i) => <path key={'l' + i} d={d} stroke={FM.gLuz} strokeWidth={3} fill="none" strokeLinecap="round" transform="translate(-5 -6)" opacity=".7" />)}
      </g>
      <path d={G_CAP} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </>}
    {corte && <>
      {/* corte: carne blancuzca con varias cámaras irregulares (no un solo hueco) */}
      <path d={G_PIE} fill={FM.gCarne} stroke={KC.ink} strokeWidth={6} />
      <path d={G_CAP} fill={FM.gCap} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <g transform="translate(0 -205) scale(.88) translate(0 205)"><path d={G_CAP} fill={FM.gCarne} /></g>
      {[[-70, -230, 30, 22], [-20, -262, 26, 18], [34, -236, 32, 24], [80, -208, 22, 26], [-46, -186, 26, 18], [10, -190, 22, 16], [58, -168, 18, 14]].map(([cx, cy, rx, ry], i) =>
        <path key={i} d={`M ${cx - rx} ${cy} Q ${cx - rx} ${cy - ry * 1.2} ${cx} ${cy - ry} Q ${cx + rx * 1.1} ${cy - ry * 0.8} ${cx + rx} ${cy + 2} Q ${cx + rx * 0.6} ${cy + ry} ${cx - 2} ${cy + ry * 0.9} Q ${cx - rx * 1.1} ${cy + ry * 0.7} ${cx - rx} ${cy} Z`} fill={FM.hueco} stroke="#5a4636" strokeWidth={3} />)}
      {[[-18, -70, 12, 46], [20, -82, 10, 36]].map(([cx, cy, rx, ry], i) => <ellipse key={'p' + i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#5d4a3e" stroke="#3a2c22" strokeWidth={3} />)}
      {Array.from({ length: 10 }, (_, i) => <path key={'f' + i} d={`M ${-24 + (i % 5) * 9} ${-110 + Math.floor(i / 5) * 60} q 6 10 0 20 q -6 10 0 20`} stroke="#e8ddd2" strokeWidth={2} fill="none" opacity=".8" />)}
    </>}
  </g>;
}

// Sello redondo con texto (NO / MITO).
function SelloNo({ T, at, x, y, texto = 'NO', color = KC.red, r = 90, rot = -14 }) {
  if (T < at) return null;
  const p = kprog(T, at, at + 0.25, kEase.sale), s = klerp(2.2, 1, p);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={p}>
    <circle r={r} fill="rgba(255,255,255,.88)" stroke={color} strokeWidth={14} />
    <circle r={r - 20} fill="none" stroke={color} strokeWidth={4} />
    <text y={r * 0.3} textAnchor="middle" style={{ font:`400 ${r * 0.85}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}

// Átomo esquemático.
function Atomo({ x, y, el, r = 34, color = '#8fb6ff', brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`} style={brillo ? { filter:`drop-shadow(0 0 ${16 * brillo}px ${color})` } : null}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text y={r * 0.36} textAnchor="middle" style={{ font:`700 ${r}px ${KF.mono}` }} fill={KC.ink}>{el}</text>
  </g>;
}
const COL = { C:'#9aa3ad', N:'#6aa2ff', O:'#ff6b5a', H:'#f4efe4' };
// Giromitrina esquemática (CH3–CH=N–N(CH3)–CHO) que se parte (p 0..1) y deja monometilhidrazina (CH3–NH–NH2).
function Giromitrina({ T, x, y, parte = 0, brilloMMH = 0 }) {
  const sep = kEase.sale(parte) * 150;
  const izq = [['C', -330, 0], ['C', -230, 0]], der = [['O', 330, 40], ['C', 240, 0]];
  const nucleo = [['N', -120, 0], ['N', 0, 0], ['C', 0, 110]];
  const hs = [[-120, -64], [0, -64], [-50, 160], [50, 160]];
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`translate(${-sep} ${-sep * 0.2})`} opacity={1 - parte * 0.6}>
      <line x1={-330} y1={0} x2={-230} y2={0} stroke="#fff" strokeWidth={8} />
      {izq.map(([e, a, b], i) => <Atomo key={i} x={a} y={b} el={e} color={COL[e]} />)}
    </g>
    <g transform={`translate(${sep} ${-sep * 0.2})`} opacity={1 - parte * 0.6}>
      <line x1={240} y1={0} x2={330} y2={40} stroke="#fff" strokeWidth={8} />
      {der.map(([e, a, b], i) => <Atomo key={i} x={a} y={b} el={e} color={COL[e]} />)}
    </g>
    {parte < 0.3 && <><line x1={-196} y1={0} x2={-154} y2={0} stroke="#fff" strokeWidth={8} opacity={1 - parte / 0.3} /><line x1={34} y1={0} x2={206} y2={0} stroke="#fff" strokeWidth={8} opacity={1 - parte / 0.3} /></>}
    <g style={brilloMMH ? { filter:`drop-shadow(0 0 ${20 * brilloMMH}px ${KC.red})` } : null}>
      <line x1={-120} y1={0} x2={0} y2={0} stroke="#fff" strokeWidth={8} /><line x1={0} y1={0} x2={0} y2={110} stroke="#fff" strokeWidth={8} />
      {parte > 0.5 && hs.map(([a, b], i) => <g key={i} opacity={kprog(parte, 0.5 + i * 0.1, 0.7 + i * 0.1)}><line x1={i < 2 ? (i ? 0 : -120) : 0} y1={i < 2 ? 0 : 110} x2={a} y2={b} stroke="#fff" strokeWidth={5} /><Atomo x={a} y={b} el="H" r={20} color={COL.H} /></g>)}
      {nucleo.map(([e, a, b], i) => <Atomo key={i} x={a} y={b} el={e} color={COL[e]} r={38} />)}
    </g>
  </g>;
}

// Nave espacial genérica (cápsula + módulo de servicio) con propulsores de maniobra que echan bocanadas.
function Nave({ T, x, y, s = 1, rot = 0, pulso = 1 }) {
  const puf = (t0, dx, dy) => { const u = ((T - t0) % 0.9 + 0.9) % 0.9 / 0.9; return <circle cx={dx + dx * u * 1.6} cy={dy + dy * u * 0.4} r={8 + u * 26} fill="#fff" opacity={(1 - u) * 0.85 * pulso} />; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {puf(0, -80, -10)}{puf(0.45, 80, -10)}{puf(0.2, -80, 70)}{puf(0.65, 80, 70)}
    <path d="M -54 -40 L -22 -120 L 22 -120 L 54 -40 Z" fill="#d9dde3" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-26} y={-104} width={22} height={18} rx={4} fill="#5a7ab0" stroke={KC.ink} strokeWidth={3} />
    <rect x={-58} y={-40} width={116} height={120} rx={8} fill="#eef1f4" stroke={KC.ink} strokeWidth={6} />
    <rect x={-58} y={0} width={116} height={14} fill={KC.gold} stroke={KC.ink} strokeWidth={3} />
    {[[-58, -6], [58, -6], [-58, 64], [58, 64]].map(([a, b], i) => <rect key={i} x={a - 9} y={b - 9} width={18} height={18} fill="#8a8f96" stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -24 80 L -36 116 L 36 116 L 24 80 Z" fill="#8a8f96" stroke={KC.ink} strokeWidth={5} />
    <rect x={-240} y={-6} width={170} height={36} fill="#24406e" stroke={KC.ink} strokeWidth={4} />
    <rect x={70} y={-6} width={170} height={36} fill="#24406e" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Neurona esquemática (fondo oscuro). agita 0..1 = descargas (convulsiones).
function Neurona({ T, x, y, agita = 0 }) {
  const dend = [[-150, -130], [-190, 10], [-140, 150], [-20, -190], [30, 190]];
  const flick = agita > 0 ? 0.5 + 0.5 * Math.sin(T * 47) : 0;
  const col = mixHex('#ff8fbf', '#fff4a8', flick * agita);
  return <g transform={`translate(${x} ${y})`} style={{ filter:`drop-shadow(0 0 ${18 + 30 * agita * flick}px ${col})` }}>
    {dend.map(([a, b], i) => <g key={i}>
      <path d={`M 0 0 Q ${a * 0.5} ${b * 0.5 + 20} ${a} ${b}`} stroke={col} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${a} ${b} l ${a * 0.3} ${-30} M ${a} ${b} l ${a * 0.2} ${40}`} stroke={col} strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>)}
    <path d="M 60 0 Q 300 -40 600 30" stroke={col} strokeWidth={20} fill="none" strokeLinecap="round" />
    <circle r={100} fill={col} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-10} cy={-6} r={40} fill="#b0457a" stroke={KC.ink} strokeWidth={4} />
    {agita > 0 && [[-120, -150], [140, -120], [-160, 120], [170, 140], [320, -80]].map(([a, b], i) => {
      const on = Math.sin(T * 31 + i * 2.1) > 0.2; return on ? <path key={i} d={`M ${a} ${b} l 26 -40 l -14 4 l 22 -40`} stroke="#fff4a8" strokeWidth={9} fill="none" strokeLinejoin="round" opacity={agita} /> : null; })}
  </g>;
}
// Fichita de vitamina B6.
function FichaB6({ x, y, gris = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-26} width={80} height={52} rx={26} fill={mixHex(KC.yellow, '#555a60', gris)} stroke={KC.ink} strokeWidth={5} />
    <text y={12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>B6</text>
  </g>;
}
// Molécula MMH chiquita (roja) que atrapa la B6.
function MMHChica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter:`drop-shadow(0 0 10px ${KC.red})` }}>
    <line x1={-30} y1={0} x2={30} y2={0} stroke="#fff" strokeWidth={6} />
    <circle cx={-30} r={18} fill={COL.C} stroke={KC.ink} strokeWidth={4} /><circle r={18} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><circle cx={30} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Cuerpo de frente (esquemático) con estómago e hígado. higado 0..1 = se oscurece (daño). revuelto 0..1 = el estómago se agita.
function Cuerpo({ T, x, y, higado = 0, revuelto = 0 }) {
  const w = Math.sin(T * 14) * 6 * revuelto;
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={0} cy={-330} r={92} fill="#f2c9a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -190 -210 Q -200 -230 -150 -236 L 150 -236 Q 200 -230 190 -210 L 170 220 Q 0 250 -170 220 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {/* hígado: lado derecho de la persona (izquierda de la pantalla) */}
    <path d="M -150 -110 Q -60 -150 40 -120 Q 30 -60 -40 -40 Q -120 -30 -150 -60 Z" fill={mixHex('#b4543c', '#4a1c14', higado)} stroke={KC.ink} strokeWidth={6} />
    {/* estómago */}
    <g transform={`translate(${60 + w} ${-40}) rotate(${w})`}>
      <path d="M 10 -70 Q 90 -80 96 -10 Q 100 70 20 76 Q -40 80 -46 30 Q -20 40 0 20 Q 30 -10 10 -70 Z" fill="#ff9fb6" stroke={KC.ink} strokeWidth={6} />
    </g>
    <path d="M -30 80 Q 0 140 60 110 Q 110 160 40 190 Q -40 200 -60 150" stroke="#e0a9a0" strokeWidth={18} fill="none" strokeLinecap="round" />
  </g>;
}
// Reloj que corre (horas).
function Reloj({ T, x, y, r = 90, vel = 1 }) {
  const a = T * vel * 6, b = T * vel * 0.5;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 10} x2={0} y2={-r + 24} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.75} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a * 57.3})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={KC.red} strokeWidth={9} strokeLinecap="round" transform={`rotate(${b * 57.3})`} />
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Olla con falsas morillas hirviendo y vapor que sube. vapor 0..1.
function Olla({ T, x, y, vapor = 1, hacia = [0, -420] }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 5 }, (_, i) => { const d = -120 + i * 60, f = (T * 0.6 + i * 0.21) % 1;
      return <path key={i} d={`M ${d} -150 Q ${d + 40} -230 ${d + hacia[0] * 0.3} -300 Q ${d - 30 + hacia[0] * 0.5} -380 ${d + hacia[0]} ${hacia[1]}`} stroke="rgba(230,240,225,.85)" strokeWidth={22} fill="none" strokeLinecap="round"
        strokeDasharray="60 50" strokeDashoffset={-f * 220} opacity={vapor * 0.75} />; })}
    <rect x={-210} y={-150} width={420} height={210} rx={30} fill="#9aa3ad" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-130} width={50} height={26} rx={10} fill="#5a6068" stroke={KC.ink} strokeWidth={6} />
    <rect x={200} y={-130} width={50} height={26} rx={10} fill="#5a6068" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-150} rx={210} ry={30} fill="#c9dde0" stroke={KC.ink} strokeWidth={6} />
    {[-110, -10, 90].map((d, i) => <g key={i} transform={`translate(${d} ${-150 + Math.sin(T * 6 + i) * 6}) scale(.32)`}><path d={G_CAP} transform="translate(0 205)" fill={FM.gCap} stroke={KC.ink} strokeWidth={14} /></g>)}
    {Array.from({ length: 7 }, (_, i) => { const u = (T * 1.8 + i * 0.37) % 1; return <circle key={'b' + i} cx={-170 + i * 56} cy={-150 - u * 20} r={6 + u * 8} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - u} />; })}
    <rect x={-240} y={60} width={480} height={30} rx={8} fill="#2a2d33" stroke={KC.ink} strokeWidth={6} />
    {[-150, -50, 50, 150].map((d, i) => <path key={'l' + i} d={`M ${d - 18} 60 Q ${d} ${30 - 10 * Math.sin(T * 20 + i)} ${d + 18} 60 Z`} fill={KC.orange} />)}
  </g>;
}
// Persona que cocina (silueta simple) que se marea con el vapor. mareo 0..1.
function Cocinero({ T, x, y, mareo = 0 }) {
  const bal = Math.sin(T * 5) * 6 * mareo;
  return <g transform={`translate(${x} ${y}) rotate(${bal})`}>
    <path d="M -110 220 Q -120 60 0 50 Q 120 60 110 220 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-20} r={70} fill="#f2c9a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -70 Q -70 -150 -20 -140 Q 0 -190 30 -140 Q 80 -150 62 -70 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {mareo > 0.3 ? <><path d="M -36 -24 l 16 12 m 0 -12 l -16 12" stroke={KC.ink} strokeWidth={5} /><path d="M 18 -24 l 16 12 m 0 -12 l -16 12" stroke={KC.ink} strokeWidth={5} /></>
      : <><circle cx={-26} cy={-20} r={7} fill={KC.ink} /><circle cx={26} cy={-20} r={7} fill={KC.ink} /></>}
    <path d="M -20 22 Q 0 12 20 22" stroke={KC.ink} strokeWidth={5} fill="none" />
    {mareo > 0 && <g opacity={mareo} transform={`translate(0 -120) rotate(${T * 200})`}><path d="M 0 0 m -30 0 a 30 30 0 1 0 60 0 a 22 22 0 1 0 -44 0 a 14 14 0 1 0 28 0" stroke={KC.ink} strokeWidth={5} fill="none" /></g>}
  </g>;
}
// Caja de venta con letrero de advertencia en finlandés (esquemático).
function CajaVenta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 0 L -200 -150 L 200 -150 L 230 0 Z" fill="#c69a5c" stroke={KC.ink} strokeWidth={7} />
    {[-140, -50, 40, 130].map((d, i) => <g key={i} transform={`translate(${d} ${-150}) scale(.42)`}><path d={G_CAP} transform="translate(0 205)" fill={FM.gCap} stroke={KC.ink} strokeWidth={12} /></g>)}
    <rect x={-230} y={0} width={460} height={140} rx={10} fill="#a8783e" stroke={KC.ink} strokeWidth={7} />
    <g transform="translate(0 -330) rotate(-3)">
      <line x1={0} y1={60} x2={0} y2={180} stroke={KC.ink} strokeWidth={10} />
      <rect x={-250} y={-70} width={500} height={150} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      <path d="M -200 40 L -160 -40 L -120 40 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <text x={-160} y={30} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>!</text>
      <text x={50} y={-10} textAnchor="middle" style={{ font:`400 38px ${KF.titulo}` }} fill={KC.ink}>MYRKYLLINEN</text>
      <text x={50} y={40} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill={KC.ink}>KÄSITTELEMÄTTÖMÄNÄ</text>
    </g>
  </g>;
}
// Plato (para la línea de años de "en mi familia siempre la comimos"). estado: 'ok' | 'mal'.
function Plato({ x, y, s = 1, estado = 'ok', o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={70} ry={26} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-2} rx={44} ry={14} fill="#eee6d6" />
    <g transform="translate(0 -6) scale(.2)"><path d={G_CAP} transform="translate(0 205)" fill={FM.gCap} stroke={KC.ink} strokeWidth={16} /></g>
    {estado === 'ok' && <path d="M -20 -70 L -6 -56 L 22 -86" stroke="#118a3a" strokeWidth={10} fill="none" strokeLinecap="round" />}
    {estado === 'mal' && <g transform="translate(0 -78)"><rect x={-26} y={-26} width={52} height={52} rx={10} fill="#fff" stroke={KC.red} strokeWidth={5} /><rect x={-7} y={-18} width={14} height={36} fill={KC.red} /><rect x={-18} y={-7} width={36} height={14} fill={KC.red} /></g>}
  </g>;
}

function FalsaMorillaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Morilla, F: CUES.Falsa, Tx: CUES.Toxina, N: CUES.Neurona, S: CUES.Sintomas, H: CUES.Hervir, Fi: CUES.Finlandia, Fa: CUES.Familia, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cuantasB6 = (t) => 8 - Math.floor(8 * kprog(t, K.N + 1.0, K.N + 3.0));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la falsa morilla sale del suelo, sello NO, y una nave que maniobra */}
      <Escena T={T} a={K.G} b={K.Mo} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {T > K.G + 2.8 && <Nave T={T} x={820} y={klerp(1250, 900, kprog(T, K.G + 2.8, K.G + 4.2, kEase.sale))} s={0.8} rot={Math.sin(T * 2) * 6} />}
          <SueloBosque y={1080} />
          <FalsaMorilla T={T} x={310} y={1100} s={1.5} crece={kprog(T, K.G, K.G + 0.6)} id="g0" />
          <SelloNo T={T} at={K.G + 1.0} x={500} y={720} texto="NO" r={80} />
        </>)}
      </Escena>
      {/* 2 · la morilla verdadera: panal, pegada al pie, hueca */}
      <Escena T={T} a={K.Mo} b={K.F} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <SueloBosque y={1080} seed={7} />
          <Morilla x={290} y={1100} s={1.3} crece={kprog(T, K.Mo, K.Mo + 0.6)} id="m1" />
          <Morilla x={770} y={1100} s={1.3} crece={kprog(T, K.Mo + 2.5, K.Mo + 3.0)} corte id="m2" />
        </>)}
      </Escena>
      {/* 3 · la falsa morilla: cerebro, con cámaras */}
      <Escena T={T} a={K.F} b={K.Tx} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <SueloBosque y={1080} seed={9} />
          <FalsaMorilla T={T} x={290} y={1100} s={1.3} crece={kprog(T, K.F, K.F + 0.6)} id="g1" />
          <FalsaMorilla T={T} x={780} y={1100} s={1.3} crece={kprog(T, K.F + 2.6, K.F + 3.1)} corte id="g2" />
        </>)}
      </Escena>
      {/* 4 · por dentro: giromitrina → monometilhidrazina; la misma sustancia mueve naves */}
      <Escena T={T} a={K.Tx} b={K.N} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Giromitrina T={T} x={540} y={760} parte={kprog(T, K.Tx + 1.4, K.Tx + 2.4)} brilloMMH={kprog(T, K.Tx + 2.2, K.Tx + 2.8)} />
          <g opacity={kprog(T, K.Tx + 3.4, K.Tx + 3.9)}><Nave T={T} x={klerp(1250, 820, kprog(T, K.Tx + 3.4, K.Tx + 4.6, kEase.sale))} y={1100} s={0.7} rot={-8} pulso={kprog(T, K.Tx + 4.0, K.Tx + 4.4)} /></g>
        </>)}
      </Escena>
      {/* 5 · neurona: la MMH le quita la B6; sin freno (GABA) → convulsiones */}
      <Escena T={T} a={K.N} b={K.S} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Neurona T={T} x={360} y={930} agita={kprog(T, K.N + 3.4, K.N + 3.8)} />
          {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2 + T * 0.4, r0 = 190;
            const robada = i >= cuantasB6(T), u = robada ? kprog(T, K.N + 1.0 + (7 - i) * 0.25, K.N + 1.6 + (7 - i) * 0.25, kEase.sale) : 0;
            const bx = 360 + Math.cos(a) * r0, by = 930 + Math.sin(a) * r0 * 0.8;
            const ex = 720 + (i % 4) * 80, ey = 770 + Math.floor(i / 4) * 64;
            const X = klerp(bx, ex, u), Y = klerp(by, ey, u);
            return <g key={i}>{robada && <MMHChica x={X - 46} y={Y} s={0.8} />}<FichaB6 x={X} y={Y} gris={u} s={0.9} /></g>; })}
          {Array.from({ length: 5 }, (_, i) => { const at = K.N + 0.6 + i * 0.4, u = kprog(T, at, at + 0.6, kEase.sale); return u < 1 && u > 0 ? <MMHChica key={'m' + i} x={klerp(1100, 560, u)} y={klerp(560 + i * 60, 900, u)} s={0.8} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · síntomas: horas después, estómago; si es grave, hígado */}
      <Escena T={T} a={K.S} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cuerpo T={T} x={560} y={930} higado={kprog(T, K.S + 2.3, K.S + 3.0)} revuelto={kprog(T, K.S + 1.2, K.S + 1.6)} />
          <Reloj T={T} x={190} y={560} vel={kprog(T, K.S, K.S + 0.3) * (1 - kprog(T, K.S + 1.2, K.S + 1.5)) * 3 + 0.05} />
        </>)}
      </Escena>
      {/* 7 · mito: hervirla la vuelve segura; el vapor intoxica a quien cocina */}
      <Escena T={T} a={K.H} b={K.Fi} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Cocinero T={T} x={830} y={720} mareo={kprog(T, K.H + 2.9, K.H + 3.4)} />
          <Olla T={T} x={370} y={1020} vapor={kprog(T, K.H, K.H + 0.5)} hacia={[330, -400]} />
        </>)}
      </Escena>
      {/* 8 · Finlandia 2025: se vende con advertencia; tras dos hervores queda casi un quinto */}
      <Escena T={T} a={K.Fi} b={K.Fa} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Fi + 2.6, K.Fi + 2.9)}><CajaVenta x={540} y={1090} s={0.9} /></g>
          {T > K.Fi + 2.7 && (() => { const u = kprog(T, K.Fi + 2.8, K.Fi + 3.4, kEase.sale), v = kprog(T, K.Fi + 3.6, K.Fi + 4.4, kEase.sale); return <g>
            <line x1={120} y1={1120} x2={680} y2={1120} stroke={KC.ink} strokeWidth={8} />
            <rect x={160} y={1120 - 400 * u} width={200} height={400 * u} fill={FM.gCap} stroke={KC.ink} strokeWidth={7} />
            <rect x={400} y={1120 - klerp(400, 72, v) * u} width={200} height={klerp(400, 72, v) * u} fill={FM.gLuz} stroke={KC.ink} strokeWidth={7} />
            <text x={260} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>cruda</text>
            <text x={540} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>2 hervores</text>
            <text x={260} y={1120 - 400 * u - 18} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={u}>100 %</text>
            <text x={540} y={1120 - klerp(400, 72, v) * u - 18} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={v}>≈18 %</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 9 · mito: "en mi familia siempre la comimos" — años sin problema… y un día, intoxicación */}
      <Escena T={T} a={K.Fa} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <line x1={80} y1={920} x2={1000} y2={920} stroke={KC.ink} strokeWidth={6} strokeDasharray="18 12" />
          {Array.from({ length: 6 }, (_, i) => { const at = K.Fa + 2.6 + i * 0.35, u = kprog(T, at, at + 0.35, kEase.rebote); if (u <= 0) return null;
            const mal = i === 5 && T > K.Fa + 4.6;
            return <g key={i}><Plato x={140 + i * 160} y={900} s={u * 1.1} estado={i < 5 ? 'ok' : (mal ? 'mal' : 'ok')} />
              <text x={140 + i * 160} y={980} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={i === 5 && mal ? KC.red : KC.ink}>{i < 5 ? `año ${i + 1}` : (mal ? 'un día' : `año 6`)}</text></g>; })}
        </>)}
      </Escena>
      {/* 10 · cierre: la misma imagen del inicio, ya "leída" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <SueloBosque y={1080} />
          <FalsaMorilla T={T} x={310} y={1100} s={1.5} id="g9" />
          <SelloNo T={T} at={K.C + 0.2} x={500} y={900} texto="NO" r={80} rot={12} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.G + 2.6} texto="¿morilla?" x={310} y={560} tam={46} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.6} until={K.Mo - 0.3} x={60} y={430} texto="falsa morilla" tam={40} color={KC.ink} />
      <Etq T={T} at={K.G + 2.9} until={K.Mo - 0.3} x={60} y={485} texto="Gyromitra esculenta" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.G + 3.5} until={K.Mo - 0.3} texto="también: combustible de cohete" x={540} y={580} tam={34} borde={KC.red} />

      <Etq T={T} at={K.Mo + 0.6} until={K.F - 0.3} x={60} y={430} texto="morilla" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.9} until={K.F - 0.3} x={60} y={485} texto="Morchella" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.2} until={K.F - 0.3} x={60} y={545} texto="panal: hoyos y costillas" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.9} until={K.F - 0.3} x={385} y={915} texto="pegado al pie" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Mo + 2.0} until={K.F - 0.3} x={385} y={955} texto="(casi siempre)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Mo + 3.0} until={K.F - 0.3} texto="POR DENTRO · HUECA" x={770} y={600} tam={32} borde={KC.mint} mono />

      <Etq T={T} at={K.F + 0.5} until={K.Tx - 0.3} x={60} y={430} texto="falsa morilla" tam={44} color={KC.ink} />
      <Etq T={T} at={K.F + 0.8} until={K.Tx - 0.3} x={60} y={485} texto="Gyromitra esculenta" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.F + 1.3} until={K.Tx - 0.3} x={60} y={545} texto="arrugada, lobulada, como cerebro" tam={28} color={KC.ink} />
      <Chip T={T} at={K.F + 3.1} until={K.Tx - 0.3} texto="POR DENTRO · CÁMARAS" x={770} y={620} tam={32} borde={KC.red} mono />

      <Chip T={T} at={K.Tx + 0.1} until={K.N - 0.3} texto="POR DENTRO · LA TOXINA" x={400} y={420} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Tx + 0.4} until={K.Tx + 2.2} x={60} y={560} texto="giromitrina" tam={40} color={KC.yellow} />
      <Etq T={T} at={K.Tx + 2.3} until={K.N - 0.3} x={60} y={560} texto="monometilhidrazina (MMH)" tam={32} color={KC.red} />
      <Chip T={T} at={K.Tx + 4.0} until={K.N - 0.3} texto="combustible para maniobrar naves" x={380} y={1000} tam={32} borde={KC.gold} />

      <Chip T={T} at={K.N + 0.1} until={K.S - 0.3} texto="AL MICROSCOPIO · NEURONA" x={400} y={420} tam={32} borde={KC.pink} mono />
      <Medidor T={T} at={K.N + 0.5} until={K.S - 0.3} valor={(t) => 1 - 0.8 * kprog(t, K.N + 1.0, K.N + 3.0)} etiqueta="freno de la neurona (GABA)" texto={(v) => (v > 0.5 ? 'normal' : 'bajo')} x={60} y={500} ancho={600} color={KC.mint} />
      <Etq T={T} at={K.N + 1.2} until={K.S - 0.3} x={60} y={660} texto="vitamina B6 (se la llevan)" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.N + 3.6} until={K.S - 0.3} texto="convulsiones" x={720} y={1090} tam={40} borde={KC.yellow} />

      <Chip T={T} at={K.S + 0.3} until={K.H - 0.3} texto="horas después (≈ 5–12 h)" x={600} y={430} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.S + 1.3} until={K.H - 0.3} x={720} y={890} texto="vómito, diarrea" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 2.4} until={K.H - 0.3} x={60} y={1130} texto="si es grave: daño al hígado" tam={30} color={KC.ink} />

      <MitoTachado T={T} at={K.H + 0.6} tacharEn={K.H + 1.5} until={K.Fi - 0.3} texto="hervida = segura" x={300} y={460} tam={46} />
      <Chip T={T} at={K.H + 2.9} until={K.Fi - 0.3} texto="el vapor también puede intoxicar" x={540} y={560} tam={36} borde={KC.red} />

      <TarjetaEstudio T={T} at={K.Fi + 0.3} until={K.Fi + 2.7} anio="2025" quien="Agencia de Alimentos de Finlandia" revista="Ruokavirasto · riesgo de la giromitrina" x={540} y={470} />
      <Etq T={T} at={K.Fi + 1.0} until={K.Fi + 2.7} x={60} y={665} texto="«venenosa si no se trata»: aviso obligatorio al venderla" tam={24} color={KC.ink} />
      <NumeroGigante T={T} at={K.Fi + 3.6} until={K.Fa - 0.3} valor={18} dur={0.8} prefijo="≈" sufijo=" %" etiqueta="de la toxina sigue ahí" x={360} y={520} tam={140} color={KC.red} />

      <MitoTachado T={T} at={K.Fa + 0.2} tacharEn={K.Fa + 1.9} until={K.Fa + 2.6} texto="«en mi familia siempre la comimos»" x={540} y={600} tam={38} />
      <Etq T={T} at={K.Fa + 2.8} until={K.C - 0.3} x={60} y={760} texto="años sin problema…" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Fa + 4.7} until={K.C - 0.3} texto="…y un día, intoxicación" x={440} y={1090} tam={34} borde={KC.red} />

      <Chip T={T} at={K.C + 0.5} until={K.Ou} texto="Ante la duda: NO la comas" x={380} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="pregunta a un micólogo" x={330} y={560} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="¿te sientes mal? → urgencias" x={380} y={650} tam={34} borde={KC.red} />
      <Etq T={T} at={K.C + 3.4} until={K.Ou} x={60} y={1500} texto="Esto no es una guía para identificar hongos." tam={22} color={KC.texto} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Mo} texto="5 cm" largo={210} />
      <BarraEscala T={T} at={K.Mo} until={K.F} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.F} until={K.Tx} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Tx} until={K.N} texto="0.15 nm (esquemático)" largo={110} />
      <BarraEscala T={T} at={K.N} until={K.S} texto="20 µm · medidor esquemático" largo={160} />
      <BarraEscala T={T} at={K.S} until={K.H} texto="30 cm" largo={190} />
      <BarraEscala T={T} at={K.H} until={K.Fi} texto="20 cm" largo={190} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={210} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="Esto *no es una morilla.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.F - 0.1} texto="Morilla: *panal,* pegada al pie, *hueca.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.Tx - 0.1} texto="Falsa: *como cerebro,* con *cámaras.*" />
      <Subtitulo T={T} idx={3} at={K.Tx + 0.1} until={K.N - 0.1} texto="Giromitrina → *monometilhidrazina.*" />
      <Subtitulo T={T} idx={4} at={K.N + 0.1} until={K.S - 0.1} texto="Sin B6 no hay freno: *convulsiones.*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.H - 0.1} texto="Horas después: *vómito y diarrea.*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.Fi - 0.1} texto="Mito: *hervida ya es segura.*" />
      <Subtitulo T={T} idx={7} at={K.Fi + 0.1} until={K.Fa - 0.1} texto="Dos hervores: queda *casi un quinto.*" />
      <Subtitulo T={T} idx={8} at={K.Fa + 0.1} until={K.C - 0.1} texto="Años sin problema… *y un día no.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ante la duda, *no la comas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Mo + 0.5, K.Mo + 2.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.F + 0.4, K.F + 2.5, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Tx + 2.6, K.N - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.N + 3.5, K.S - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.H + 0.05, K.H + 2.7, 'avatar_07_pensativo_puno', 'grande'],
        [K.Fi + 3.5, K.Fa - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Fa + 2.7, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="110" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FalsaMorillaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FalsaMorillaShot /></CompositionStage></div>;
}
window.FalsaMorillaApp = FalsaMorillaApp;
