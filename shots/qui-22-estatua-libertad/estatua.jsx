// Shot Químico #22 · Esa estatua no nació verde (la pátina de la Estatua de la Libertad) — NARRADO (N1 por dentro + toque N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (silueta respetuosa, sin rostro detallado).
const COBRE = '#e48a5a', CAFE = '#8f5631', VERDE = '#6cc3a8', VERDE_OSC = '#3f8f78', CUPRITA = '#5b2a1e', PIEDRA = '#e3d7bf';

// Color de la piel de cobre según el avance f: 0 = cobre nuevo (salmón) → 0.35 = café → 1 = verde pátina.
function colorEst(f) {
  if (f <= 0.35) return mixHex(COBRE, CAFE, f / 0.35);
  return mixHex(CAFE, VERDE, (f - 0.35) / 0.65);
}
function sombraEst(f) { return mixHex(colorEst(f), '#1d1410', 0.28); }

// Figura (sin pedestal), en coordenadas locales: base en y = -320, antorcha arriba (~ -1130).
function FiguraEst({ f, sinLlama = false }) {
  const c = colorEst(f), sh = sombraEst(f), ink = KC.ink;
  const rayos = [-160, -135, -112, -90, -68, -45, -20];
  return <g>
    {/* brazo alzado (a la izquierda de quien mira) */}
    <path d="M -62 -672 Q -118 -790 -128 -930" stroke={ink} strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d="M -62 -672 Q -118 -790 -128 -930" stroke={c} strokeWidth={40} fill="none" strokeLinecap="round" />
    {/* antorcha */}
    <path d="M -142 -935 L -116 -935 L -120 -985 L -138 -985 Z" fill={c} stroke={ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -172 -1030 L -86 -1030 L -108 -985 L -150 -985 Z" fill={c} stroke={ink} strokeWidth={8} strokeLinejoin="round" />
    {!sinLlama && <path d="M -158 -1030 Q -156 -1095 -129 -1135 Q -100 -1090 -100 -1030 Z" fill={KC.gold2} stroke={ink} strokeWidth={8} strokeLinejoin="round" />}
    {/* túnica */}
    <path d="M -108 -320 Q -128 -470 -96 -600 L -76 -690 Q 0 -716 72 -690 L 96 -600 Q 128 -470 114 -320 Z" fill={c} stroke={ink} strokeWidth={10} strokeLinejoin="round" />
    {[['M -62 -330 Q -74 -480 -50 -640'], ['M 0 -330 Q 6 -480 -6 -660'], ['M 58 -330 Q 72 -480 46 -640']].map(([d], i) => <path key={i} d={d} stroke={sh} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <path d="M -76 -688 Q 0 -610 98 -572" stroke={sh} strokeWidth={14} fill="none" strokeLinecap="round" />
    {/* tablilla y brazo */}
    <g transform="rotate(-10 92 -560)"><rect x={58} y={-650} width={74} height={160} rx={6} fill={c} stroke={ink} strokeWidth={9} />
      <line x1={70} y1={-610} x2={120} y2={-610} stroke={sh} strokeWidth={6} /></g>
    <path d="M 66 -676 Q 104 -630 92 -560" stroke={ink} strokeWidth={42} fill="none" strokeLinecap="round" />
    <path d="M 66 -676 Q 104 -630 92 -560" stroke={c} strokeWidth={28} fill="none" strokeLinecap="round" />
    {/* cuello, cabeza y corona */}
    <rect x={-17} y={-738} width={34} height={44} fill={c} stroke={ink} strokeWidth={8} />
    {rayos.map((a, i) => { const r = a * Math.PI / 180, cx = 0, cy = -800; const p = (rr, da) => [cx + Math.cos(r + da) * rr, cy + Math.sin(r + da) * rr];
      const [x1, y1] = p(44, -0.13), [x2, y2] = p(44, 0.13), [x3, y3] = p(112, 0);
      return <path key={i} d={`M ${x1} ${y1} L ${x3} ${y3} L ${x2} ${y2} Z`} fill={c} stroke={ink} strokeWidth={7} strokeLinejoin="round" />; })}
    <circle cx={0} cy={-772} r={44} fill={c} stroke={ink} strokeWidth={9} />
    <path d="M -46 -790 Q 0 -820 46 -790 L 44 -800 Q 0 -834 -44 -800 Z" fill={sh} stroke={ink} strokeWidth={6} />
  </g>;
}
// Pedestal de piedra (no es de cobre: no cambia de color).
function Pedestal() {
  return <g>
    <rect x={-190} y={-120} width={380} height={120} fill="#cfc2a6" stroke={KC.ink} strokeWidth={10} />
    <rect x={-150} y={-300} width={300} height={182} fill={PIEDRA} stroke={KC.ink} strokeWidth={10} />
    {[-90, 0, 90].map((dx) => <rect key={dx} x={dx - 18} y={-262} width={36} height={70} rx={6} fill="#bfb194" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-172} y={-324} width={344} height={26} fill="#d8cbb0" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Estatua completa. f = color (0 cobre … 1 verde). barrido: 0..1 revela el cobre desde arriba sobre la versión verde.
let _clipId = 0;
function Estatua({ x, y, s = 1, f = 0, barrido = null, brillo = 0, T = 0 }) {
  const id = 'est' + Math.round(x) + '_' + Math.round(y);
  const yl = barrido == null ? null : klerp(-1160, -300, barrido);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Pedestal />
    <FiguraEst f={f} />
    {barrido != null && <g>
      <clipPath id={id}><rect x={-400} y={-1200} width={800} height={yl + 1200} /></clipPath>
      <g clipPath={`url(#${id})`}><FiguraEst f={0} /></g>
      {barrido > 0 && barrido < 1 && <rect x={-260} y={yl - 8} width={520} height={16} rx={8} fill="#fffbe0" opacity={0.9} />}
    </g>}
    {brillo > 0 && [[-60, -560], [40, -450], [-130, -880], [10, -770]].map(([bx, by], i) => { const k = Math.max(0, Math.sin(T * 4 + i * 1.7)); return <path key={i}
      d={`M ${bx} ${by - 26 * k} L ${bx + 7} ${by - 7} L ${bx + 26 * k} ${by} L ${bx + 7} ${by + 7} L ${bx} ${by + 26 * k} L ${bx - 7} ${by + 7} L ${bx - 26 * k} ${by} L ${bx - 7} ${by - 7} Z`} fill="#fff" opacity={brillo * k} />; })}
  </g>;
}
function Escudo({ x, y, s = 1, o = 1, color = VERDE }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.6, 1, o)})`} opacity={o}>
    <path d="M 0 -78 L 66 -52 Q 66 32 0 82 Q -66 32 -66 -52 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -26 0 L -6 22 L 30 -22" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Centavo de dólar: de frente (giro = cos del ángulo) o de canto (lado=true).
function Centavo({ x, y, r = 80, giro = 1, color = '#c47a46' }) {
  const sx = Math.max(0.06, Math.abs(giro));
  return <g transform={`translate(${x} ${y}) scale(${sx} 1)`}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle r={r * 0.8} fill="none" stroke={mixHex(color, '#000000', 0.3)} strokeWidth={5} />
    {giro > 0 && <text y={r * 0.22} textAnchor="middle" style={{ font:`400 ${r * 0.7}px ${KF.titulo}` }} fill={mixHex(color, '#000000', 0.45)}>1¢</text>}
  </g>;
}
function MonedaCanto({ x, y, w = 190, h = 60, color = '#c47a46' }) {
  return <g><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={x - w / 2 + 16 + i * (w - 32) / 8} x2={x - w / 2 + 16 + i * (w - 32) / 8} y1={y - h / 2 + 10} y2={y + h / 2 - 10} stroke={mixHex(color, '#000000', 0.3)} strokeWidth={4} />)}</g>;
}
// SO₂: azufre amarillo con dos oxígenos.
function SO2({ x, y, s = 1, rot = 0, o = 1 }) {
  return <Molecula x={x} y={y} s={s} rot={rot} o={o} atomos={[[0, 0, 34, QA.S, 'S'], [-48, 26, 26, QA.O, 'O'], [48, 26, 26, QA.O, 'O']]} enlaces={[[0, 1], [0, 2]]} />;
}
function Gota({ x, y, r = 16, color = '#7fc8ff', o = 1 }) {
  return <path d={`M ${x} ${y - r * 1.7} Q ${x + r} ${y - r * 0.2} ${x + r} ${y + r * 0.2} A ${r} ${r} 0 1 1 ${x - r} ${y + r * 0.2} Q ${x - r} ${y - r * 0.2} ${x} ${y - r * 1.7} Z`} fill={color} stroke={KC.ink} strokeWidth={4} opacity={o} />;
}
// Cristales de brochantita (prismas verdes) sobre una línea base y0. h = 0..1 crecimiento.
function Cristales({ x0 = 60, x1 = 1020, y0, h = 1, alto = 150, seed = 4 }) {
  if (h <= 0) return null;
  const R = krng(seed), out = [];
  for (let x = x0, i = 0; x < x1; i++) { const w = 46 + R() * 34, a = alto * (0.55 + R() * 0.45) * kclamp(h * 1.6 - (i % 5) * 0.12, 0, 1), inc = (R() - 0.5) * 18;
    if (a > 4) out.push(<g key={i}><path d={`M ${x} ${y0} L ${x + inc} ${y0 - a} L ${x + w / 2 + inc} ${y0 - a - 16} L ${x + w + inc} ${y0 - a} L ${x + w} ${y0} Z`} fill={i % 2 ? VERDE : '#55b394'} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M ${x + 10 + inc * 0.6} ${y0 - a * 0.85} L ${x + 10 + inc * 0.1} ${y0 - 10}`} stroke="#c6f2e2" strokeWidth={5} strokeLinecap="round" opacity={0.7} /></g>);
    x += w - 6; }
  return <g>{out}</g>;
}
// Bloque de cobre (corte) con red de átomos esquemática. Superficie en y0.
function BloqueCobre({ y0, y1 = 1180, T }) {
  const atom = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++) { const x = 92 + c * 70 + (r % 2) * 35, y = y0 + 40 + r * 62; if (y < y1 - 20) atom.push(<circle key={r * 20 + c} cx={x} cy={y + Math.sin(T * 3 + c + r) * 2} r={24} fill="#f0a27a" stroke="#7a3c22" strokeWidth={4} />); }
  return <g><rect x={50} y={y0} width={980} height={y1 - y0} rx={10} fill={COBRE} stroke={KC.ink} strokeWidth={8} />{atom}
    <text x={990} y={y1 - 26} textAnchor="end" style={{ font:`700 40px ${KF.mono}` }} fill="#5a2a18">Cu · cobre</text></g>;
}
// Brocha gigante (apunta a la izquierda).
function Brocha({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(-18) scale(${s})`}>
    <rect x={150} y={-22} width={300} height={44} rx={20} fill="#c98a4a" stroke={KC.ink} strokeWidth={8} />
    <rect x={90} y={-46} width={70} height={92} rx={8} fill="#b9c0c9" stroke={KC.ink} strokeWidth={8} />
    <path d="M 92 -50 L 0 -56 Q -24 0 0 56 L 92 50 Z" fill={COBRE} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
function Globo({ T, at, until, x, y, texto = '¡No!', rot = 0 }) {
  if (T < at || T > until + 0.4) return null;
  const e = kprog(T, at, at + 0.35, kEase.rebote), o = 1 - kprog(T, until, until + 0.35);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${e})`} opacity={o}>
    <path d="M -95 -55 Q -95 -85 -65 -85 L 65 -85 Q 95 -85 95 -55 L 95 15 Q 95 45 65 45 L 0 45 L -30 85 L -25 45 L -65 45 Q -95 45 -95 15 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <text y={-5} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red}>{texto}</text>
  </g>;
}
// Corte de la piel vista en la lupa: cobre, cuprita y brochantita.
function CorteLupa(T, r) {
  const w = r * 2;
  return <svg width={w} height={w} style={{ position:'absolute', inset:0 }}>
    <rect x={0} y={w * 0.62} width={w} height={w * 0.38} fill={COBRE} />
    {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={20 + i * 52} cy={w * 0.8} r={16} fill="#f0a27a" stroke="#7a3c22" strokeWidth={3} />)}
    <rect x={0} y={w * 0.57} width={w} height={w * 0.05} fill={CUPRITA} />
    <g transform={`translate(0 ${w * 0.57})`}><Cristales x0={-10} x1={w + 10} y0={0} h={1} alto={w * 0.2} seed={9} /></g>
    {[0, 1, 2].map((i) => { const p = ((T * 0.9 + i * 0.33) % 1); const yy = p < 0.6 ? klerp(-10, w * 0.32, p / 0.6) : w * 0.32 - Math.sin((p - 0.6) / 0.4 * Math.PI) * 50;
      return <Gota key={i} x={80 + i * 110} y={yy} r={12} o={p < 0.6 ? 1 : 1 - (p - 0.6) / 0.4} />; })}
  </svg>;
}

function Estatua22() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Piel, Ca: CUES.Cafe, Cu: CUES.Cuprita, Br: CUES.Brochantita, Es: CUES.Escudo, Pr: CUES.Pregunta, St: CUES.Estudio, Pi: CUES.Pintura, Tu: CUES.Tu, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // micro: superficie del cobre
  const Y0 = 900, cup = kprog(T, K.Cu + 2.2, K.Cu + 3.8, kEase.sale), yCup = Y0 - 40 * cup;
  const cris = kprog(T, K.Br + 2.6, K.Br + 5.2, kEase.suave);
  const R = krng(11);
  const o2s = Array.from({ length: 8 }, (_, i) => [90 + i * 120 + R() * 40, R() * 6]);
  const lluviaBr = Array.from({ length: 9 }, (_, i) => [110 + i * 105, R()]);
  // estudio
  const haz1 = kprog(T, K.St + 3.8, K.St + 4.2) * (1 - kprog(T, K.St + 5.8, K.St + 6.0));
  const haz2 = kprog(T, K.St + 6.0, K.St + 6.4) * (1 - kprog(T, K.St + 8.2, K.St + 8.4));
  const emisor = kprog(T, K.St + 3.4, K.St + 3.8) * (1 - kprog(T, K.St + 8.3, K.St + 8.7));
  // pintura
  const brIn = kprog(T, K.Pi + 0.5, K.Pi + 1.6, kEase.sale), brOut = kprog(T, K.Pi + 3.0, K.Pi + 3.9, kEase.suave);
  // azotea
  const anios = kprog(T, K.Tu + 1.4, K.Tu + 5.4, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la estatua verde se barre y aparece el cobre */}
      <Escena T={T} a={K.G} b={K.P} zoom={0.08} origen="32% 45%">
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Estatua T={T} x={330} y={1200} s={0.85} f={1} barrido={kprog(T, K.G + 0.1, K.G + 1.7, kEase.suave) * (1 - kprog(T, K.G + 3.4, K.G + 4.6))} brillo={kprog(T, K.G + 1.0, K.G + 1.6) * (1 - kprog(T, K.G + 3.3, K.G + 3.6))} />
          <Escudo x={330} y={720} s={1.3} o={kprog(T, K.G + 3.6, K.G + 4.2) * 0.92} />
        </SvgCapa>
      </Escena>
      {/* 1 · la piel: lámina de 2.4 mm y dos centavos */}
      <Escena T={T} a={K.P} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={140} y={760} width={600} height={120} fill={COBRE} stroke={KC.ink} strokeWidth={8} />
          <path d="M 140 760 L 200 700 L 800 700 L 740 760 Z" fill="#f0a27a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <path d="M 740 760 L 800 700 L 800 820 L 740 880 Z" fill="#b8683e" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          {[300, 480, 640].map((rx) => <circle key={rx} cx={rx} cy={730} r={9} fill="#b8683e" stroke={KC.ink} strokeWidth={4} />)}
          <MonedaCanto x={920} y={klerp(380, 850, kprog(T, K.P + 1.4, K.P + 1.9, kEase.rebote))} />
          <MonedaCanto x={920} y={klerp(380, 790, kprog(T, K.P + 2.0, K.P + 2.5, kEase.rebote))} />
          <g opacity={kprog(T, K.P + 0.6, K.P + 1.0)}>
            <line x1={100} y1={760} x2={100} y2={880} stroke={KC.ink} strokeWidth={8} />
            <line x1={84} y1={760} x2={116} y2={760} stroke={KC.ink} strokeWidth={8} />
            <line x1={84} y1={880} x2={116} y2={880} stroke={KC.ink} strokeWidth={8} />
            <text x={440} y={990} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>2.4 mm</text>
          </g>
          <line x1={820} y1={760} x2={1020} y2={760} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" opacity={kprog(T, K.P + 2.6, K.P + 3.0)} />
        </SvgCapa>
        <Escala T={T} pxPorMm={50} x={140} y={1080} color={KC.ink} />
      </Escena>
      {/* 2 · en 1886: color centavo */}
      <Escena T={T} a={K.Ca} b={K.Cu} zoom={0.04} origen="35% 50%">
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Estatua T={T} x={330} y={1200} s={0.85} f={0.3} brillo={1} />
          <Centavo x={800} y={880} r={110} giro={Math.cos((T - K.Ca) * 2.4)} color={colorEst(0.3)} />
        </SvgCapa>
      </Escena>
      {/* 3–5 · micro: cuprita, brochantita y escudo */}
      <Escena T={T} a={K.Cu} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <BloqueCobre y0={Y0} T={T} />
          {/* O₂ y agua que bajan y oxidan */}
          {o2s.map(([x, ph], i) => { const t0 = K.Cu + 0.1 + i * 0.22, p = kprog(T, t0, t0 + 1.6, kEase.suave), o = 1 - kprog(T, K.Cu + 2.6, K.Cu + 3.2);
            return o > 0 && <g key={i}><Mol tipo={i % 3 === 2 ? 'agua' : 'o2'} x={x} y={klerp(330, Y0 - 50, p)} s={0.62} rot={T * 40 + ph * 50} o={o} /></g>; })}
          {cup > 0 && <rect x={50} y={yCup} width={980} height={Y0 - yCup + 4} fill={CUPRITA} stroke={KC.ink} strokeWidth={5} />}
          {/* fábrica con SO₂ */}
          <g opacity={kprog(T, K.Br - 0.2, K.Br + 0.4) * (1 - kprog(T, K.Es - 0.2, K.Es + 0.4))}>
            <rect x={860} y={380} width={80} height={230} fill="#6b6f7a" stroke={KC.ink} strokeWidth={8} />
            <rect x={850} y={370} width={100} height={26} fill="#4d515b" stroke={KC.ink} strokeWidth={6} />
            <Nube T={T} x={760} y={300} f={kprog(T, K.Br, K.Br + 1.2)} r={130} color="#b9b48a" seed={4} />
            {[0, 1, 2].map((i) => { const p = kprog(T, K.Br + 0.6 + i * 0.4, K.Br + 2.4 + i * 0.4, kEase.suave);
              return p > 0 && p < 1 && <SO2 key={i} x={klerp(760, 300 + i * 220, p)} y={klerp(320, 560, p)} s={0.6} rot={T * 50} />; })}
          </g>
          {/* lluvia ácida sobre la cuprita → cristales verdes */}
          {T > K.Br + 1.4 && T < K.Pr && lluviaBr.map(([x, ph], i) => { const per = 1.1, p = ((T - K.Br - 1.4) / per + ph) % 1, top = Y0 - 40 - 150 * cris;
            const escudo = T > K.Es;
            const yy = escudo && p > 0.7 ? top - Math.sin((p - 0.7) / 0.3 * Math.PI) * 90 : klerp(380, top, Math.min(1, p / 0.7));
            return <Gota key={i} x={x} y={yy} r={15} o={p > 0.7 ? 1 - (p - 0.7) / 0.3 : 1} />; })}
          <Cristales y0={yCup} h={cris} alto={150} />
          <Escudo x={540} y={480} s={1.5} o={kprog(T, K.Es + 0.6, K.Es + 1.2)} />
        </SvgCapa>
        <Escala T={T} pxPorMm={8000} x={60} y={1400} />
      </Escena>
      {/* 6 · pregunta: ¿cuánto tardó? */}
      <Escena T={T} a={K.Pr} b={K.St} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={270} y={520} textAnchor="middle" style={{ font:`400 380px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 270 380)`}>?</text>
          <Estatua T={T} x={800} y={1190} s={0.62} f={kprog(T, K.Pr + 0.3, K.Pr + 2.3, kEase.suave)} />
        </SvgCapa>
        {T > K.Pr + 0.3 && <Contador T={T} at={K.Pr + 0.3} hasta={30} dur={2.0} sufijo=" años" x={800} y={420} tam={84} />}
      </Escena>
      {/* 7 · 1986: rayos X a la piel de 1905 y de 1980 */}
      <Escena T={T} a={K.St} b={K.Pi}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={emisor}>
            <rect x={470} y={640} width={180} height={90} rx={14} fill="#dfe6ee" stroke={KC.ink} strokeWidth={8} />
            <rect x={530} y={730} width={60} height={30} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
            <text x={560} y={700} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>rayos X</text>
          </g>
          {haz1 > 0 && <path d="M 560 760 L 300 930 L 400 960 Z" fill={KC.cyan} opacity={0.55 * haz1} />}
          {haz2 > 0 && <path d="M 560 760 L 720 960 L 820 930 Z" fill={KC.cyan} opacity={0.55 * haz2} />}
          {[[350, '1905', VERDE, false], [770, '1980', '#7fb59a', true]].map(([x, an, col, manchas], i) => <g key={i} opacity={kprog(T, K.St + 3.2 + i * 0.3, K.St + 3.6 + i * 0.3)}>
            <path d={`M ${x - 130} ${960} L ${x - 60} ${925} L ${x + 40} ${945} L ${x + 130} ${920} L ${x + 120} ${1050} L ${x + 20} ${1070} L ${x - 110} ${1055} Z`} fill={col} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            {manchas && [[-50, 990], [30, 1010], [80, 965]].map(([dx, dy], k) => <ellipse key={k} cx={x + dx} cy={dy} rx={28} ry={16} fill="#3e6f5d" opacity={kprog(T, K.St + 7.0, K.St + 7.6)} />)}
            <text x={x} y={1140} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{an}</text>
          </g>)}
          <Marca x={350} y={850} ok={true} s={0.7} o={kprog(T, K.St + 5.0, K.St + 5.4)} />
          <g opacity={kprog(T, K.St + 7.2, K.St + 7.6)} transform="translate(770 850)">
            <path d="M 0 -62 L 62 50 L -62 50 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <text y={38} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>!</text>
          </g>
          <Nube T={T} x={770} y={560} f={kprog(T, K.St + 8.5, K.St + 9.2)} r={140} color="#8e93a0" seed={6} />
          {T > K.St + 9.0 && [0, 1, 2, 3].map((i) => { const p = ((T - K.St - 9) * 1.6 + i * 0.25) % 1; return <Gota key={i} x={690 + i * 55} y={klerp(620, 900, p)} r={11} color="#a9d8ff" o={1 - p * 0.6} />; })}
        </SvgCapa>
      </Escena>
      {/* 8 · 1906: planearon pintarla */}
      <Escena T={T} a={K.Pi} b={K.Tu} zoom={0.04} origen="40% 50%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Estatua T={T} x={400} y={1200} s={0.85} f={1} />
          <Brocha x={klerp(1250, 600, brIn * (1 - brOut))} y={klerp(1000, 800, brIn * (1 - brOut))} s={1.1} />
          <Globo T={T} at={K.Pi + 1.8} until={K.Pi + 3.4} x={150} y={640} rot={-8} />
          <Globo T={T} at={K.Pi + 2.1} until={K.Pi + 3.6} x={880} y={1040} rot={6} />
          <Globo T={T} at={K.Pi + 2.4} until={K.Pi + 3.8} x={140} y={1010} rot={4} />
        </SvgCapa>
      </Escena>
      {/* 9 · tu azotea: un tubo de cobre que, con los años, se pone verde */}
      <Escena T={T} a={K.Tu} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <circle cx={230} cy={470} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={0.5 + 0.5 * Math.abs(Math.sin(T * 1.6))} />
          <rect x={0} y={1010} width={KW} height={200} fill="#efe2c8" stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={970} width={KW} height={44} fill="#d9c7a3" stroke={KC.ink} strokeWidth={8} />
          {/* tinaco */}
          <rect x={740} y={660} width={180} height={250} rx={30} fill="#2b2f36" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={830} cy={662} rx={90} ry={22} fill="#3d424b" stroke={KC.ink} strokeWidth={6} />
          <rect x={770} y={910} width={120} height={60} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
          {/* tubo de cobre */}
          <path d="M 760 880 L 640 880 L 640 930 L 130 930 L 130 975" stroke={KC.ink} strokeWidth={42} fill="none" strokeLinejoin="round" />
          <path d="M 760 880 L 640 880 L 640 930 L 130 930 L 130 975" stroke={colorEst(0.15 + anios * 0.2)} strokeWidth={28} fill="none" strokeLinejoin="round" />
          {[[600, 930], [470, 930], [330, 930], [200, 930], [700, 880], [130, 960], [560, 930], [400, 930], [260, 930]].map(([x, y], i) => { const a = kprog(anios, i / 12, i / 12 + 0.3);
            return a > 0 && <ellipse key={i} cx={x} cy={y} rx={34 * a + 4} ry={11} fill={VERDE} opacity={0.95} />; })}
          {anios > 0.05 && anios < 1 && [0, 1, 2, 3, 4].map((i) => { const p = ((T - K.Tu) * 1.4 + i * 0.2) % 1; return <Gota key={i} x={180 + i * 130} y={klerp(560, 900, p)} r={11} o={0.8} />; })}
        </SvgCapa>
        {T > K.Tu + 1.4 && <Contador T={T} at={K.Tu + 1.4} hasta={20} dur={4.0} sufijo=" años" x={420} y={760} tam={72} color={KC.ink} />}
      </Escena>
      {/* 10 · cierre: la misma estatua, verde, con la pátina como escudo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="32% 45%">
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Estatua T={T} x={330} y={1200} s={0.85} f={1} />
          <Escudo x={330} y={720} s={1.1} o={kprog(T, K.Ci + 0.4, K.Ci + 0.9) * 0.9} />
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.9} until={K.Ou - 0.1} x={800} y={930} r={170} fx={360} fy={820} interior={CorteLupa} tinte={KC.mint} etiqueta="cobre intacto debajo" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 3.2} texto="siempre fue verde" x={540} y={1130} tam={44} />
      <Chip T={T} at={K.G + 3.6} until={K.P - 0.3} texto="la costra verde la protege" x={540} y={1130} tam={38} borde={VERDE} />
      <Chip T={T} at={K.P + 0.4} until={K.Ca - 0.3} texto="piel de cobre" x={440} y={580} tam={44} borde={COBRE} />
      <Etq T={T} at={K.P + 2.6} until={K.Ca - 0.3} x={1000} y={640} texto="2 centavos de dólar" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Cu - 0.3} texto="1886: color centavo" x={540} y={1130} tam={44} borde={CAFE} />
      <Chip T={T} at={K.Cu + 0.4} until={K.Cu + 2.4} texto="oxígeno + agua" x={540} y={250} tam={40} borde={QA.O} />
      <Etq T={T} at={K.Cu + 3.4} until={K.Br + 2.4} x={60} y={1215} texto="cuprita · Cu₂O (oscura)" tam={34} />
      <Chip T={T} at={K.Br + 0.4} until={K.Br + 2.4} texto="azufre de la contaminación" x={500} y={700} tam={36} borde={QA.S} />
      <Chip T={T} at={K.Br + 3.0} until={K.Es - 0.2} texto="brochantita · CuSO₄·3Cu(OH)₂" x={540} y={640} tam={34} borde={VERDE} mono />
      <Chip T={T} at={K.Es + 0.4} until={K.Pr - 0.2} texto="casi no se disuelve" x={540} y={640} tam={42} borde={VERDE} />
      <TarjetaEstudio T={T} at={K.St + 0.2} until={K.St + 3.3} anio="1986" quien="Matyi y Baboian" revista="Powder Diffraction · para la restauración" y={760} />
      <Chip T={T} at={K.St + 5.2} until={K.Pi - 0.3} texto="1905: brochantita estable" x={350} y={1200} tam={30} borde={VERDE} />
      <Chip T={T} at={K.St + 7.4} until={K.Pi - 0.3} texto="1980: antlerita, menos estable" x={720} y={1200} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.St + 9.0} until={K.Pi - 0.3} texto="¿lluvia ácida?" x={770} y={430} tam={40} borde="#8e93a0" />
      <Chip T={T} at={K.Pi + 0.3} until={K.Pi + 2.6} texto="1906: ¿pintarla?" x={600} y={220} tam={44} borde={COBRE} />
      <Chip T={T} at={K.Pi + 3.6} until={K.Tu - 0.3} texto="se quedó verde ✓" x={600} y={220} tam={44} borde={VERDE} />
      <Chip T={T} at={K.Tu + 0.4} until={K.Ci - 0.3} texto="tubo de cobre a la intemperie" x={540} y={1130} tam={36} borde={COBRE} />
      <Chip T={T} at={K.Ci + 0.4} until={K.Ou} texto="pátina = escudo" x={640} y={215} tam={44} borde={VERDE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="No nació verde: *es cobre.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.Ca - 0.1} texto="Cobre de *2.4 milímetros.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Cu - 0.1} texto="1886: color *centavo.*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.Br - 0.1} texto="Primero: *cuprita oscura.*" />
      <Subtitulo T={T} idx={4} at={K.Br + 0.1} until={K.Es - 0.1} texto="Luego: *brochantita verde.*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Pr - 0.1} texto="La pátina *protege al cobre.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.St - 0.1} texto="¿Cuánto tardó? *Unos 30 años.*" />
      <Subtitulo T={T} idx={7} at={K.St + 0.1} until={K.Pi - 0.1} texto="1980: *antlerita, menos estable.*" />
      <Subtitulo T={T} idx={8} at={K.Pi + 0.1} until={K.Tu - 0.1} texto="1906: *planearon pintarla.*" />
      <Subtitulo T={T} idx={9} at={K.Tu + 0.1} until={K.Ci - 0.1} texto="Tu cobre *también se pone verde.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No es mugre: *es escudo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Piel + 0.8, CUES.Cafe - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cafe + 0.4, CUES.Cuprita + 3.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Brochantita + 1.0, CUES.Brochantita + 5.6, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Escudo + 1.4, CUES.Pregunta - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Estudio + 3.6, CUES.Estudio + 10.4, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pintura + 0.4, CUES.Pintura + 4.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Tu + 0.6, CUES.Tu + 6.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="22" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EstatuaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Estatua22 /></CompositionStage></div>;
}
window.EstatuaApp = EstatuaApp;
