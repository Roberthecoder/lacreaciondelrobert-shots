// Shot Biotecnológico #30 · La hormona de crecimiento que dejó de salir de cadáveres — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Tono serio: sin sustos ni chistes en la parte de CJD.
const HGH = '#ff8a1f', PRION = '#ff3b2f', NORMAL = '#5fd3ff', VIDRIO = 'rgba(255,255,255,.22)';

/* ---------- frasquito de hormona (nuevo) o frasco viejo de vidrio con etiqueta de papel ---------- */
function Frasquito({ T, x, y, s = 1, viejo = false, bact = 0, rot = 0, etiqueta, punto = 0 }) {
  const w = 150, h = 250;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={h + 16} rx={w * 0.7} ry={16} fill="rgba(0,0,0,.2)" />
    <rect x={-w / 2} y={h * 0.32} width={w} height={h * 0.68} rx={16} fill={viejo ? '#e9d9a6' : '#fff3df'} opacity={0.9} />
    <rect x={-w / 2} y={0} width={w} height={h} rx={20} fill={VIDRIO} stroke={KC.ink} strokeWidth={9} />
    <rect x={-w / 2 + 14} y={16} width={16} height={h - 40} rx={8} fill="rgba(255,255,255,.55)" />
    {viejo
      ? <g><rect x={-w / 2 - 6} y={-40} width={w + 12} height={44} rx={6} fill="#8a6a45" stroke={KC.ink} strokeWidth={8} />
          <rect x={-w / 2 + 8} y={80} width={w - 16} height={110} fill="#efe2c2" stroke={KC.ink} strokeWidth={5} transform="rotate(-3)" />
          {(etiqueta || []).map((t, i) => <text key={i} x={0} y={120 + i * 34} textAnchor="middle" transform="rotate(-3)" style={{ font:`700 ${t.length > 9 ? 22 : 26}px ${KF.mono}` }} fill="#4a3a28">{t}</text>)}
          {punto > 0 && <g><circle cx={30} cy={210} r={16 + 6 * Math.sin(T * 6)} fill="none" stroke={PRION} strokeWidth={5} opacity={punto} /><circle cx={30} cy={210} r={9} fill={PRION} opacity={punto} /></g>}
        </g>
      : <g><rect x={-w / 2 - 10} y={-48} width={w + 20} height={50} rx={12} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
          <rect x={-w / 2 - 2} y={-74} width={w + 4} height={32} rx={8} fill="#c3cbd3" stroke={KC.ink} strokeWidth={7} />
          <rect x={-w / 2 + 10} y={78} width={w - 20} height={120} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
          <text x={0} y={120} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>hGH</text>
          {bact > 0 && <g opacity={bact} transform={`translate(0 160) scale(${0.6 + 0.4 * bact})`}>
            <rect x={-38} y={-15} width={76} height={30} rx={15} fill="#7fd88a" stroke={KC.ink} strokeWidth={5} />
            <path d={`M 38 0 q 12 ${-8 + Math.sin(T * 8) * 5} 24 0`} stroke={KC.ink} strokeWidth={4} fill="none" />
          </g>}
        </g>}
  </g>;
}

/* ---------- regla de estatura con una marca que sube ---------- */
function Regla({ T, x, y0 = 480, y1 = 1180, marca = 0.5 }) {
  const ym = klerp(y1, y0, marca);
  return <g>
    <rect x={x - 40} y={y0} width={80} height={y1 - y0} rx={10} fill="#fff6d8" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 15 }, (_, i) => { const yy = y1 - (i + 1) * (y1 - y0) / 16; return <line key={i} x1={x - 40} x2={x - 40 + (i % 2 ? 22 : 40)} y1={yy} y2={yy} stroke={KC.ink} strokeWidth={4} />; })}
    <path d={`M ${x + 46} ${ym} l 44 -26 l 0 52 Z`} fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

/* ---------- cabeza de perfil en corte con cerebro e hipófisis ---------- */
function Cabeza({ T, x = 540, y = 960 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 60 -430 C -170 -440 -320 -300 -330 -110 C -335 -20 -310 30 -350 90 C -380 140 -340 160 -310 170 C -300 210 -330 250 -300 270 C -280 290 -290 330 -260 350 C -220 380 -150 360 -100 380 L -80 470 L 220 470 C 210 400 250 340 290 280 C 360 170 380 40 360 -100 C 340 -300 230 -425 60 -430 Z"
      fill="#f1b48f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {/* cerebro */}
    <path d="M 40 -380 C -120 -385 -240 -290 -250 -160 C -255 -80 -200 -20 -120 -10 C -60 0 -20 -30 30 -20 C 90 -5 160 10 230 -30 C 300 -80 310 -200 260 -280 C 210 -350 130 -378 40 -380 Z" fill="#ff9fb8" stroke={KC.ink} strokeWidth={7} />
    {[[-150, -250, 60], [-40, -300, 50], [80, -290, 70], [170, -200, 60], [-170, -120, 50], [-20, -170, 80], [120, -110, 60]].map(([cx, cy, r], i) =>
      <path key={i} d={`M ${cx - r} ${cy} q ${r / 2} ${-r / 1.6} ${r} 0 t ${r} 0`} stroke="#d1607e" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {/* tallo e hipófisis */}
    <path d="M -10 -14 C -14 10 -20 22 -24 34" stroke={KC.ink} strokeWidth={8} fill="none" />
    <ellipse cx={-26} cy={48} rx={22} ry={18} fill="#ff6b5a" stroke={KC.ink} strokeWidth={6} style={{ filter:`drop-shadow(0 0 ${8 + 6 * Math.sin(T * 4)}px ${KC.yellow})` }} />
  </g>;
}

/* ---------- niña de silueta (sin rasgos) ---------- */
function Nina({ x, y, s = 1, color = '#5a4b7a' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={6}>
    <circle cx={0} cy={-300} r={56} />
    <path d="M -70 -230 Q 0 -250 70 -230 L 100 -40 L 50 -40 L 40 0 L -40 0 L -50 -40 L -100 -40 Z" />
    <rect x={-36} y={0} width={28} height={90} rx={10} /><rect x={8} y={0} width={28} height={90} rx={10} />
  </g>;
}
function Jeringa({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-160} y={-26} width={240} height={52} rx={10} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-18} width={130} height={36} fill="#fff3df" />
    <rect x={-230} y={-8} width={70} height={16} fill="#c3cbd3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-250} y={-34} width={20} height={68} rx={6} fill="#c3cbd3" stroke={KC.ink} strokeWidth={5} />
    <path d="M 80 -10 L 110 -10 L 110 10 L 80 10 Z" fill="#c3cbd3" stroke={KC.ink} strokeWidth={5} />
    <line x1={110} y1={0} x2={220} y2={0} stroke="#7a838c" strokeWidth={6} />
  </g>;
}

/* ---------- proteína normal (espiral) o mal doblada (láminas en zigzag) ---------- */
function Proteina({ T, x, y, mal = 0, s = 1, seed = 1 }) {
  const b = mece(T, seed, 0.4) * 4;
  const hel = Array.from({ length: 41 }, (_, i) => { const u = i / 40; return `${i ? 'L' : 'M'} ${klerp(-90, 90, u)} ${Math.sin(u * Math.PI * 8) * 34}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${b}) scale(${s})`}>
    {mal < 1 && <g opacity={1 - mal}>
      <path d={hel} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={hel} stroke={NORMAL} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {mal > 0 && <g opacity={mal} transform={`rotate(${(1 - mal) * 40})`}>
      {[-36, 0, 36].map((dy, i) => <path key={i} d={`M -80 ${dy} L 50 ${dy} L 50 ${dy - 14} L 86 ${dy + 8} L 50 ${dy + 30} L 50 ${dy + 16} L -80 ${dy + 16} Z`} fill={PRION} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    </g>}
  </g>;
}

/* ---------- virus esquemático (para tachar) ---------- */
function Virus({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 20}) scale(${s})`}>
    {Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return <g key={i}><line x1={Math.cos(a) * 70} y1={Math.sin(a) * 70} x2={Math.cos(a) * 105} y2={Math.sin(a) * 105} stroke={KC.ink} strokeWidth={8} /><circle cx={Math.cos(a) * 108} cy={Math.sin(a) * 108} r={13} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} /></g>; })}
    <circle r={74} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Tache({ x, y, p, r = 120 }) {
  if (p <= 0) return null;
  const a = kclamp(p * 2, 0, 1), b = kclamp(p * 2 - 1, 0, 1);
  return <g stroke={PRION} strokeWidth={22} strokeLinecap="round">
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} />
    {b > 0 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} />}
  </g>;
}

/* ---------- cerebro de perfil, se llena de huequitos (aspecto esponjoso) ---------- */
function CerebroEsponja({ T, x, y, s = 1, huecos = 0 }) {
  const R = krng(30);
  const hs = Array.from({ length: 60 }, () => [(R() - 0.5) * 560, (R() - 0.6) * 320, 8 + R() * 16]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -230 C -200 -235 -330 -120 -330 10 C -330 120 -250 190 -120 190 C -40 190 20 160 90 180 C 180 200 300 150 330 40 C 360 -80 270 -200 150 -225 C 100 -232 50 -230 0 -230 Z" fill="#f2a6b8" stroke={KC.ink} strokeWidth={9} />
    {[[-200, -100, 70], [-60, -160, 60], [90, -150, 70], [220, -60, 60], [-220, 60, 60], [-50, 0, 80], [120, 40, 70]].map(([cx, cy, r], i) =>
      <path key={i} d={`M ${cx - r} ${cy} q ${r / 2} ${-r / 1.6} ${r} 0 t ${r} 0`} stroke="#c4607a" strokeWidth={7} fill="none" strokeLinecap="round" />)}
    {hs.map(([hx, hy, r], i) => { const on = kprog(huecos, i / 60, i / 60 + 0.15); return on > 0 ? <ellipse key={i} cx={hx} cy={hy} rx={r * on} ry={r * 0.75 * on} fill="#5a2a3a" opacity={0.85} /> : null; })}
  </g>;
}

/* ---------- vela (por cada paciente de 1985) ---------- */
function Vela({ T, x, y, seed = 1, enciende = 1 }) {
  const f = mece(T, seed, 1.4);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={0} width={68} height={190} rx={10} fill="#f6f0e2" stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={0} x2={0} y2={-22} stroke={KC.ink} strokeWidth={5} />
    {enciende > 0 && <g opacity={enciende} transform={`translate(0 -26) scale(${0.9 + 0.08 * f}, ${1 + 0.12 * f})`}>
      <ellipse cx={0} cy={-20} rx={30} ry={46} fill={KC.gold2} opacity={0.35} />
      <path d="M 0 -60 C 18 -30 18 -6 0 0 C -18 -6 -18 -30 0 -60 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}

/* ---------- hormona de crecimiento esquemática: haz de 4 hélices ---------- */
function HormonaMol({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[[-27, -10], [-9, 8], [9, -8], [27, 10]].map(([dx, dy], i) => <rect key={i} x={dx - 9} y={dy - 34} width={18} height={68} rx={9} fill={HGH} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

function Hormona() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hipofisis, A: CUES.Antes, L: CUES.Lote, E: CUES.Escondido, P: CUES.Pregunta, Pr: CUES.Prion, C: CUES.Cerebro,
    Al: CUES.Alerta, B: CUES.Bacteria, S: CUES.SinTejido, La: CUES.Latencia, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // grilla del lote: 40 × 25 = 1000 cuadritos (≈ 16 glándulas cada uno)
  const COLS = 40, FILAS = 25, GX = 90, GY = 600, GW = 900, GH = 560, cw = GW / COLS, ch = GH / FILAS;
  const llena = kprog(T, K.L + 0.3, K.L + 3.0, kEase.suave), N = COLS * FILAS;
  const ROJO = 12 * COLS + 9;                                          // el cuadrito "escondido"
  const conv = (i) => K.Pr + 0.8 + i * 0.55;                           // cuándo se dobla mal cada proteína
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasquito de hoy y la regla de estatura */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Regla T={T} x={130} marca={klerp(0.35, 0.6, kprog(T, K.G, K.H, kEase.suave))} />
          <Frasquito T={T} x={420} y={760} s={1.7} rot={Math.sin(T * 2.4) * 7} bact={kprog(T, K.G + 2.2, K.G + 2.8, kEase.rebote)} />
        </SvgCapa>
      </Escena>
      {/* 1 · la hipófisis, del tamaño de un chícharo */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><Cabeza T={T} x={500} y={940} /></SvgCapa>
        <Escala T={T} z={1} pxPorMm={3.8} y={1460} color={KC.ink} />
      </Escena>
      {/* 2 · desde 1958: hormona de hipófisis de personas fallecidas */}
      <Escena T={T} a={K.A} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Regla T={T} x={930} y0={600} y1={1180} marca={0.35} />
          <Nina x={760} y={1090} s={1.05} />
          <Frasquito T={T} x={300} y={720} s={1.5} viejo etiqueta={['hormona de', 'hipófisis', 'humana']} rot={Math.sin(T * 1.6) * 3} />
          <g opacity={kprog(T, K.A + 2.0, K.A + 2.6)}><Jeringa x={430} y={1160} rot={-12 + Math.sin(T * 2) * 2} s={0.9} /></g>
        </SvgCapa>
      </Escena>
      {/* 3–4 · ≈16,000 glándulas por lote · y en alguna, algo escondido */}
      <Escena T={T} a={K.L} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.coral} />
        <SvgCapa>
          {Array.from({ length: N }, (_, i) => { const c = i % COLS, r = Math.floor(i / COLS), on = i / N < llena;
            const apaga = i === ROJO ? 0 : kprog(T, K.E + 0.2, K.E + 1.0) * 0.55;
            return <rect key={i} x={GX + c * cw + 2} y={GY + r * ch + 2} width={cw - 4} height={ch - 4} rx={4} fill={on ? (i === ROJO && T > K.E + 0.4 ? PRION : '#ffd6c9') : 'rgba(255,255,255,.18)'} opacity={1 - apaga} />; })}
          {T > K.E + 0.4 && (() => { const cx = GX + (ROJO % COLS) * cw + cw / 2, cy = GY + Math.floor(ROJO / COLS) * ch + ch / 2, pu = (T * 1.4) % 1;
            return <g><circle cx={cx} cy={cy} r={14 + pu * 60} fill="none" stroke={PRION} strokeWidth={6} opacity={1 - pu} /><circle cx={cx} cy={cy} r={18} fill="none" stroke={KC.ink} strokeWidth={5} /></g>; })()}
        </SvgCapa>
        <Chip T={T} at={K.L + 3.0} until={K.P - 0.2} texto="cada cuadrito ≈ 16 glándulas" y={1480} tam={34} borde={KC.ink} />
      </Escena>
      {/* 5 · ¿ni virus ni bacteria? */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Virus T={T} x={260} y={600} s={0.9} /><Tache x={260} y={600} p={kprog(T, K.P + 0.6, K.P + 1.2)} r={110} />
          <Bacteria T={T} x={260} y={960} largo={300} ancho={120} rot={-8} /><Tache x={260} y={960} p={kprog(T, K.P + 1.4, K.P + 2.0)} r={110} />
          <text x={260} y={760} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.texto}>virus</text>
          <text x={260} y={1100} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.texto}>bacteria</text>
        </SvgCapa>

      </Escena>
      {/* 6 · el prión: una proteína mal doblada que dobla a las demás */}
      <Escena T={T} a={K.Pr} b={K.C} zoom={0.06}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(95,211,255,.25)" />
        <SvgCapa>
          {[[200, 760], [460, 720], [720, 780], [300, 1040], [560, 1000], [820, 1060]].map(([px, py], i) => {
            const mal = i === 0 ? 1 : kprog(T, conv(i - 1), conv(i - 1) + 0.45, kEase.suave);
            return <Proteina key={i} T={T} x={px} y={py} mal={mal} s={1.05} seed={i + 2} />; })}
          {[0, 1, 2, 3, 4].map((i) => { const a = [[200, 760], [460, 720], [720, 780], [300, 1040], [560, 1000], [820, 1060]], p = kprog(T, conv(i) - 0.5, conv(i)), q = 1 - kprog(T, conv(i), conv(i) + 0.4);
            return p > 0 && q > 0 ? <line key={i} x1={a[i][0]} y1={a[i][1]} x2={klerp(a[i][0], a[i + 1][0], p)} y2={klerp(a[i][1], a[i + 1][1], p)} stroke={KC.gold2} strokeWidth={6} strokeDasharray="12 10" opacity={q} /> : null; })}
        </SvgCapa>
        <Chip T={T} at={K.Pr + 0.2} until={K.C - 0.2} texto="AL MICROSCOPIO · PRIÓN" x={380} y={430} tam={32} mono borde={NORMAL} />
        <Etq T={T} at={K.Pr + 0.5} until={K.C - 0.3} x={120} y={640} texto="mal doblada" tam={32} color={PRION} />
        <Etq T={T} at={K.Pr + 0.9} until={K.Pr + 3.2} x={900} y={1170} texto="normal" lado="izq" tam={32} color={NORMAL} />
        <Chip T={T} at={K.Pr + 2.4} until={K.C - 0.2} texto="una proteína del propio cuerpo" y={1500} tam={36} borde={PRION} />
      </Escena>
      {/* 7 · el cerebro: aspecto de esponja */}
      <Escena T={T} a={K.C} b={K.Al} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgCapa><CerebroEsponja T={T} x={540} y={780} s={1.35} huecos={kprog(T, K.C + 0.4, K.Al - 0.3)} /></SvgCapa>
        <Etq T={T} at={K.C + 0.6} until={K.Al - 0.2} x={120} y={1110} texto="enfermedad de Creutzfeldt-Jakob" tam={34} color={KC.gold2} />
        <Chip T={T} at={K.C + 1.8} until={K.Al - 0.2} texto="huequitos: aspecto de esponja" y={1500} tam={34} borde="#f2a6b8" />
      </Escena>
      {/* 8 · 1985: la alerta y la suspensión */}
      <Escena T={T} a={K.Al} b={K.B} zoom={0.03}>
        <FondoLunares color="#d9cfc0" punto="rgba(255,255,255,.25)" />
        <SvgCapa>
          {[0, 1, 2].map((i) => <Vela key={i} T={T} x={200 + i * 170} y={980} seed={i + 4} enciende={kprog(T, K.Al + 1.6 + i * 0.4, K.Al + 2.0 + i * 0.4)} />)}
          <Frasquito T={T} x={820} y={880} s={1.15} viejo etiqueta={['hipófisis', 'humana']} />
          {T > K.Al + 3.4 && (() => { const p = kprog(T, K.Al + 3.4, K.Al + 3.8, kEase.rebote); return <g transform={`translate(820 1010) rotate(-14) scale(${klerp(2, 1, p)})`} opacity={kprog(T, K.Al + 3.4, K.Al + 3.6)}>
            <rect x={-170} y={-50} width={340} height={100} rx={14} fill="rgba(255,255,255,.75)" stroke={PRION} strokeWidth={9} />
            <text x={0} y={-2} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={PRION}>SUSPENDIDA</text>
            <text x={0} y={34} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={PRION}>abril de 1985</text></g>; })()}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Al + 0.2} until={K.B - 0.2} anio="1985" quien="Estados Unidos · 3 pacientes" revista="NIH · CDC" x={640} y={560} />
      </Escena>
      {/* 9 · octubre de 1985: hormona hecha por bacterias */}
      <Escena T={T} a={K.B} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <Ambiente T={T} n={24} />
        <SvgCapa>
          {[[150, 1470, 20, 2], [900, 1480, -25, 3], [130, 620, 70, 4]].map(([bx, by, r, sd], i) => <Bacteria key={i} T={T} x={bx} y={by} largo={170} ancho={70} rot={r + mece(T, sd, 0.3) * 6} seed={sd} />)}
          <Bacteria T={T} x={500} y={900} largo={560} ancho={220} rot={-6} seed={1} adentro={(L, W) => <g transform={`translate(${L * 0.18} ${-W * 0.05}) rotate(${T * 25})`}>
            <circle r={52} fill="none" stroke="#9aa4ae" strokeWidth={12} />
            <path d="M 52 0 A 52 52 0 0 1 0 52" fill="none" stroke={KC.gold} strokeWidth={16} strokeLinecap="round" style={{ filter:`drop-shadow(0 0 8px ${KC.gold})` }} /></g>} />
          {Array.from({ length: 6 }, (_, i) => { const p = ((T - K.B - 1.0) * 0.32 + i / 6) % 1; if (T < K.B + 1.0 + i * 0.3) return null;
            return <HormonaMol key={i} x={klerp(640, 900 - i * 30, p)} y={klerp(860, 560 + i * 40, p)} s={1.1} rot={p * 120 + i * 30} o={Math.min(1, (1 - p) * 3)} />; })}
        </SvgCapa>
        <Chip T={T} at={K.B + 0.3} until={K.S - 0.2} texto="octubre 1985 · FDA · Protropin" x={420} y={440} tam={36} borde={HGH} />
        <Etq T={T} at={K.B + 0.8} until={K.S - 0.2} x={200} y={760} texto="Escherichia coli" it tam={34} color={KC.ink} />
        <Etq T={T} at={K.B + 1.8} until={K.S - 0.2} x={640} y={1075} texto="gen de la hormona humana" lado="izq" tam={28} color={KC.ink} />
      </Escena>
      {/* 10 · sin glándulas humanas, ya no hay de dónde llegue el prión */}
      <Escena T={T} a={K.S} b={K.La} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Frasquito T={T} x={290} y={720} s={1.35} viejo etiqueta={['hipófisis', 'humana']} punto={kprog(T, K.S + 0.6, K.S + 1.0)} />
          <Frasquito T={T} x={790} y={720} s={1.35} bact={1} rot={Math.sin(T * 2) * 3} />
          {T > K.S + 1.6 && <path d="M 720 1180 l 40 40 l 90 -90" stroke="#147a4c" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.S + 1.6, K.S + 2.0)} />}
          <text x={290} y={1140} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>glándulas</text>
          <text x={790} y={1140} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>bacterias</text>
        </SvgCapa>
        <Chip T={T} at={K.S + 1.6} until={K.La - 0.2} texto="sin tejido humano" y={1500} tam={42} borde="#147a4c" />
      </Escena>
      {/* 11 · 36 casos (2026); en uno, más de 50 años de espera */}
      <Escena T={T} a={K.La} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {(() => { const x = 840, y0 = 1080, y1 = 610, p = kprog(T, K.La + 1.2, K.La + 4.6, kEase.suave), yb = klerp(y0, y1, p);
            return <g>
              <rect x={x - 46} y={y1} width={92} height={y0 - y1} rx={46} fill="rgba(0,0,0,.35)" stroke={KC.ink} strokeWidth={7} />
              <rect x={x - 34} y={yb} width={68} height={Math.max(0, y0 - yb - 12)} rx={34} fill={KC.gold2} />
              {[0, 10, 20, 30, 40, 50].map((a) => { const yy = klerp(y0, y1, a / 51.5); return <g key={a}><line x1={x - 70} x2={x - 50} y1={yy} y2={yy} stroke={KC.ink} strokeWidth={5} />
                <text x={x - 80} y={yy + 10} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{a}</text></g>; })}
              <text x={x} y={y0 + 60} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>años</text>
              <text x={x} y={y1 - 26} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.La + 4.4, K.La + 4.8)}>≈ 51.5</text>
            </g>; })()}
        </SvgCapa>
        <NumeroGigante T={T} at={K.La + 0.1} until={K.Ci - 0.2} valor={36} dur={1.0} etiqueta="casos en EE. UU. (2026)" x={600} y={430} tam={190} color={KC.yellow} />
      </Escena>
      {/* 12 · cierre: el frasquito del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Regla T={T} x={130} marca={klerp(0.6, 0.82, kprog(T, K.Ci, K.Ou, kEase.suave))} />
          <Frasquito T={T} x={420} y={760} s={1.7} rot={Math.sin(T * 2.4) * 7} bact={1} />
        </SvgCapa>
        <Chip T={T} at={K.Ci + 0.8} until={K.Ou - 0.1} texto="hecha por bacterias · sin tejido humano" y={1500} tam={34} borde="#147a4c" />
      </Escena>

      {/* Lupa de la hipófisis (fuera de la escena para que la escala no la deforme) */}
      <Lupa T={T} at={K.H + 1.2} until={K.A - 0.3} x={790} y={560} r={210} fx={474} fy={988} tinte={KC.pink} etiqueta="POR DENTRO · HIPÓFISIS"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <ellipse cx={r * 0.72} cy={r * 0.95} rx={88} ry={72} fill="#ff6b5a" stroke={KC.ink} strokeWidth={6} />
          <ellipse cx={r * 0.62} cy={r * 0.86} rx={26} ry={18} fill="rgba(255,255,255,.45)" />
          <path d={`M ${r * 0.72} ${r * 0.95 - 72} C ${r * 0.74} ${r * 0.4}, ${r * 0.8} ${r * 0.25}, ${r * 0.86} 0`} stroke={KC.ink} strokeWidth={10} fill="none" />
          <circle cx={r * 1.42} cy={r * 0.95} r={74} fill="#7bc043" stroke={KC.ink} strokeWidth={6} /><ellipse cx={r * 1.34} cy={r * 0.86} rx={22} ry={14} fill="rgba(255,255,255,.45)" />
          {Array.from({ length: 4 }, (_, i) => { const p = ((t * 0.6 + i / 4) % 1); return <g key={i} opacity={1 - p}><HormonaMol x={r * 0.72 + Math.sin(i * 2) * 40} y={r * 0.95 + 70 + p * 130} s={0.55} rot={p * 90} /></g>; })}
          <text x={r * 0.72} y={r * 1.72} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>hipófisis</text>
          <text x={r * 1.42} y={r * 1.72} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>chícharo</text>
          <text x={r} y={r * 0.42} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.gold2}>como un chícharo</text>
        </svg>} />

      {/* textos */}
      <Chip T={T} at={K.G + 2.4} until={K.H - 0.3} texto="hecha por bacterias" y={1500} tam={42} borde="#147a4c" />
      <Etq T={T} at={K.H + 0.6} until={K.A - 0.3} x={440} y={1070} texto="hipófisis" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.A + 0.3} until={K.L - 0.3} texto="desde 1958" x={300} y={440} tam={44} borde={KC.ink} />
      <NumeroGigante T={T} at={K.L + 0.3} until={K.E + 0.3} valor={16000} dur={2.6} etiqueta="glándulas por lote (CDC, 1985)" x={640} y={420} tam={180} color={KC.yellow} />
      <Chip T={T} at={K.E + 0.4} until={K.P - 0.2} texto="¿y si una venía enferma?" y={440} tam={40} borde={PRION} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No salió de un cadáver: *de una bacteria.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.A - 0.1} texto="Tu *hipófisis* te hace crecer." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.L - 0.1} texto="Desde 1958: *de personas fallecidas.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.E - 0.1} texto="*16,000 glándulas* por lote." />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.P - 0.1} texto="Algo *escondido.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Ni virus *ni bacteria?*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.C - 0.1} texto="Un *prión:* proteína mal doblada." />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.Al - 0.1} texto="*Creutzfeldt-Jakob:* siempre mortal." />
      <Subtitulo T={T} idx={8} at={K.Al + 0.1} until={K.B - 0.1} texto="1985: *se suspendió.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.S - 0.1} texto="Octubre de 1985: *hecha por bacterias.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.La - 0.1} texto="Sin glándulas, *sin prión.*" />
      <Subtitulo T={T} idx={11} at={K.La + 0.1} until={K.Ci - 0.1} texto="*Más de 50 años* después." />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Crecer *sin ese riesgo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Hipofisis - 0.25, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Antes + 0.6, CUES.Lote - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Lote + 0.4, CUES.Escondido + 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta - 0.2, CUES.Prion - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Prion + 1.6, CUES.Cerebro - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Alerta + 0.5, CUES.Bacteria - 0.4, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Bacteria + 1.0, CUES.SinTejido - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Latencia + 0.7, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'grande-izq'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="30" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Capa SVG de pantalla completa.
function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

function HormonaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hormona /></CompositionStage></div>;
}
window.HormonaApp = HormonaApp;
