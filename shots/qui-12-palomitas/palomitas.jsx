// Shot Químico #12 · Tu palomita no revienta por quemarse (por qué revientan las palomitas) — NARRADO
// (N3 capítulos y medidores + viaje macro → micro → macro). Guion: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const ORO = '#f4b73a', ORO_OSC = '#c98a1a', ALMIDON = '#fbecc0', ALM_OSC = '#efd58e', AGUA = '#4db8ff', CREMA = '#fffaf0', OLLA = '#9aa3b5';

// Grano de maíz palomero (forma de gota con la punta clara).
const KP = 'M 0 -62 C 40 -62 58 -20 54 12 C 50 46 24 70 0 74 C -24 70 -50 46 -54 12 C -58 -20 -40 -62 0 -62 Z';
function Grano({ x, y, s = 1, rot = 0, o = 1, color = ORO, grietas = 0 }) {
  if (o <= 0) return null;
  const sw = Math.max(2.5, 8 / s);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={KP} fill={color} stroke={KC.ink} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M -16 64 Q 0 92 16 64 Z" fill="#f5e6b8" stroke={KC.ink} strokeWidth={sw * 0.7} />
    <ellipse cx={-18} cy={-28} rx={12} ry={20} fill="#fff" opacity={0.45} transform="rotate(20 -18 -28)" />
    {grietas > 0 && <path d="M 30 -50 L 18 -30 L 32 -14 L 20 6" fill="none" stroke={KC.ink} strokeWidth={sw * 0.8} strokeLinecap="round" opacity={grietas} />}
    {grietas > 0.5 && <path d="M -40 10 L -26 22 L -38 38" fill="none" stroke={KC.ink} strokeWidth={sw * 0.8} strokeLinecap="round" opacity={(grietas - 0.5) * 2} />}
  </g>;
}
// Palomita reventada: lóbulos de espuma de almidón con un pedacito de cáscara.
const LOB = [[0, 0, 1], [-0.85, -0.25, 0.75], [0.85, -0.2, 0.8], [-0.4, -0.95, 0.72], [0.45, -0.9, 0.7], [0.05, 0.75, 0.62], [-0.75, 0.55, 0.55], [0.8, 0.55, 0.6]];
function Palomita({ x, y, r = 40, rot = 0, o = 1, cascara = true }) {
  if (o <= 0 || r <= 0) return null;
  const sw = Math.max(4, r * 0.12);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {LOB.map(([u, v, k], i) => <circle key={'a' + i} cx={u * r} cy={v * r} r={k * r + sw} fill={KC.ink} />)}
    {LOB.map(([u, v, k], i) => <circle key={'b' + i} cx={u * r} cy={v * r} r={k * r} fill={CREMA} />)}
    {LOB.map(([u, v, k], i) => <circle key={'c' + i} cx={u * r - k * r * 0.25} cy={v * r - k * r * 0.3} r={k * r * 0.35} fill="#fff" />)}
    {LOB.map(([u, v, k], i) => <circle key={'d' + i} cx={u * r + k * r * 0.3} cy={v * r + k * r * 0.35} r={k * r * 0.22} fill="#f3e7c8" />)}
    {cascara && <path d={`M ${-r * 0.35} ${r * 1.05} Q 0 ${r * 1.55} ${r * 0.35} ${r * 1.05} Q 0 ${r * 1.2} ${-r * 0.35} ${r * 1.05} Z`} fill={ORO} stroke={KC.ink} strokeWidth={sw * 0.6} />}
  </g>;
}
// Nubecita de vapor (suave, sin chorro).
function Vapor({ T, x, y, f = 1, r = 70, seed = 4 }) {
  if (f <= 0) return null;
  return <g opacity={Math.min(1, f * 1.4) * (1 - Math.max(0, f - 0.7) / 0.3 * 0.6)}>
    <Nube T={T} x={x} y={y - f * r * 0.8} f={0.4 + f * 0.6} r={r} color="rgba(255,255,255,.92)" seed={seed} n={7} />
  </g>;
}
// Voluta de vapor (línea curva que sube).
function Voluta({ T, x, y, h = 120, o = 1, fase = 0, color = 'rgba(255,255,255,.85)', ancho = 8 }) {
  if (o <= 0) return null;
  const w = Math.sin(T * 5 + fase) * 14;
  return <path d={`M ${x} ${y} C ${x + 30 + w} ${y - h * 0.3} ${x - 30 - w} ${y - h * 0.6} ${x + w} ${y - h}`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" opacity={o} />;
}
// Palomera (olla) con su lumbre; llena 0..1 = montaña de palomitas sobre el borde.
const PILA = (() => { const R = krng(31), out = []; for (let i = 0; i < 46; i++) { const a = R(), b = R(); out.push([(a - 0.5) * 2, b, 26 + R() * 14, R() * 360]); } return out.sort((p, q) => p[1] - q[1]); })();
function Palomera({ T, x, y, s = 1, llena = 0, lumbre = 1 }) {
  const n = Math.floor(PILA.length * llena);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Llama T={T} x={0} y={175} s={1.6} o={lumbre} />
    <rect x={-150} y={150} width={300} height={26} rx={8} fill="#3a3a3a" stroke={KC.ink} strokeWidth={6} />
    {PILA.slice(0, n).map(([u, v, r, rot], i) => { const ancho = 250 - v * 120; return <Palomita key={i} x={u * ancho} y={-118 - v * 250 * llena} r={r} rot={rot} cascara={i % 3 === 0} />; })}
    <path d="M -300 -60 Q -350 -60 -350 -20 Q -350 10 -300 10" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M 300 -60 Q 350 -60 350 -20 Q 350 10 300 10" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M -290 -120 L 290 -120 L 260 120 Q 255 150 225 150 L -225 150 Q -255 150 -260 120 Z" fill={OLLA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-305} y={-140} width={610} height={34} rx={14} fill="#c3c9d6" stroke={KC.ink} strokeWidth={9} />
    <path d="M -230 -80 L -215 100" stroke="#fff" strokeWidth={14} opacity={0.35} strokeLinecap="round" />
  </g>;
}
// Termómetro vertical: valor en °C (0..max).
function Termometro({ x, y, alto = 600, valor, max = 200, etiqueta = true }) {
  const h = alto * kclamp(valor / max, 0, 1);
  return <g>
    <rect x={x - 34} y={y - 10} width={68} height={alto + 40} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={x} cy={y + alto + 60} r={62} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 16} y={y + alto - h} width={32} height={h + 40} fill={KC.red} />
    {[0, 50, 100, 150, 200].filter((v) => v <= max).map((v) => { const yy = y + alto - alto * v / max; return <g key={v}>
      <line x1={x + 34} y1={yy} x2={x + 56} y2={yy} stroke={KC.ink} strokeWidth={5} />
      <text x={x - 46} y={yy + 10} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{v}</text></g>; })}
    {etiqueta && <text x={x} y={y - 34} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} paintOrder="stroke">{Math.round(valor)} °C</text>}
  </g>;
}
// Manómetro: valor en "veces la presión del aire" (0..max).
function Manometro({ x, y, r = 110, valor, max = 12, o = 1 }) {
  if (o <= 0) return null;
  const ang = (v) => -225 + 270 * kclamp(v / max, 0, 1), rad = (a) => a * Math.PI / 180;
  const a = ang(valor);
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, o)})`}>
    <circle r={r + 14} fill="#c3c9d6" stroke={KC.ink} strokeWidth={8} />
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${Math.cos(rad(ang(8))) * r * 0.8} ${Math.sin(rad(ang(8))) * r * 0.8} A ${r * 0.8} ${r * 0.8} 0 0 1 ${Math.cos(rad(ang(12))) * r * 0.8} ${Math.sin(rad(ang(12))) * r * 0.8}`} stroke={KC.red} strokeWidth={16} fill="none" />
    {[0, 2, 4, 6, 8, 10, 12].map((v) => { const t = rad(ang(v)); return <line key={v} x1={Math.cos(t) * r * 0.9} y1={Math.sin(t) * r * 0.9} x2={Math.cos(t) * r * 0.7} y2={Math.sin(t) * r * 0.7} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={0} y1={0} x2={Math.cos(rad(a)) * r * 0.78} y2={Math.sin(rad(a)) * r * 0.78} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <circle r={14} fill={KC.ink} />
    <text x={0} y={r * 0.62} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{kformato(valor, 0)}×</text>
    <text x={0} y={r + 54} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">presión (× aire)</text>
  </g>;
}
// Corte del grano: cáscara (pericarpio) + almidón con gotitas de agua; vapor 0..1 y presión 0..1.
const GOTAS = (() => { const R = krng(12), out = []; for (let i = 0; i < 26; i++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * 0.75; out.push([Math.cos(a) * 44 * d, Math.sin(a) * 56 * d + 6, R() * 6]); } return out; })();
const CELDAS = (() => { const out = []; for (let r = -6; r <= 6; r++) for (let c = -5; c <= 5; c++) out.push([c * 12 + (r % 2 ? 6 : 0), r * 11]); return out; })();
function GranoCorte({ T, x, y, s = 4, vapor = 0, presion = 0, id = 'gc' }) {
  const est = 1 + presion * 0.035 * (0.6 + 0.4 * Math.sin(T * 14));
  return <g transform={`translate(${x} ${y}) scale(${s * est})`}>
    <path d={KP} fill={ORO} stroke={presion > 0 ? mixHex('#16120f', '#ff3b2f', presion) : KC.ink} strokeWidth={2.4} />
    <clipPath id={id}><path d={KP} transform="scale(0.86) translate(0 4)" /></clipPath>
    <g clipPath={`url(#${id})`}>
      <rect x={-60} y={-70} width={120} height={150} fill={ALMIDON} />
      {CELDAS.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={5.2} fill={ALM_OSC} />)}
      {GOTAS.map(([gx, gy, ph], i) => { const vi = kclamp(vapor * 1.6 - (i / GOTAS.length) * 0.6, 0, 1), j = 0.6 + vapor * 2.4;
        return <g key={i}>
          <circle cx={gx + Math.sin(T * 9 + ph) * j} cy={gy + Math.cos(T * 8 + ph) * j} r={3.4 * (1 - vi)} fill={AGUA} stroke="#1c5f8f" strokeWidth={0.6} />
          {vi > 0 && <path d={`M ${gx} ${gy + 4} q 4 -4 0 -8 q -4 -4 0 -8`} stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={vi * 0.9} transform={`translate(${Math.sin(T * 7 + ph) * 3} ${Math.cos(T * 6 + ph) * 3})`} />}
        </g>; })}
    </g>
    {presion > 0 && [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const t = a * Math.PI / 180, d = 30 + Math.sin(T * 10 + a) * 3;
      return <g key={a} opacity={presion} transform={`translate(${Math.cos(t) * d} ${Math.sin(t) * d * 1.2}) rotate(${a})`}>
        <path d="M -8 0 L 8 0 M 3 -5 L 9 0 L 3 5" stroke={KC.red} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
  </g>;
}
// Olla exprés chiquita silbando.
function OllaExpres({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Voluta T={T} x={0} y={-130} h={110} fase={1} />
    <rect x={-12} y={-140} width={24} height={30} rx={6} fill={KC.ink} />
    <path d="M -130 -110 Q 0 -150 130 -110 L 130 -90 L -130 -90 Z" fill="#c3c9d6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-210} y={-104} width={90} height={22} rx={10} fill={KC.ink} />
    <path d="M -130 -90 L 130 -90 L 120 60 Q 118 80 98 80 L -98 80 Q -118 80 -120 60 Z" fill={OLLA} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Horno con charola de granos.
function Horno({ T, x, y, s = 1, f = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-170} width={400} height={330} rx={26} fill="#e9e4da" stroke={KC.ink} strokeWidth={9} />
    <rect x={-160} y={-120} width={320} height={210} rx={18} fill={mixHex('#3a2a20', '#ff8a1f', 0.35 + 0.15 * Math.sin(T * 3))} stroke={KC.ink} strokeWidth={7} />
    <rect x={-130} y={30} width={260} height={14} rx={5} fill="#777" />
    {[-90, -45, 0, 45, 90].map((dx, i) => kprog(T, f + i * 0.25, f + i * 0.25 + 0.2) > 0
      ? <Palomita key={i} x={dx} y={8} r={16} rot={i * 50} cascara={false} /> : <Grano key={i} x={dx} y={18} s={0.22} rot={i * 30} />)}
    {[-120, -60, 0].map((dx, i) => <circle key={i} cx={dx + 120} cy={130} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-110} y={-155} width={220} height={20} rx={8} fill="#c3c9d6" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Placa caliente.
function Placa({ x, y, ancho = 700 }) {
  return <g>
    <rect x={x - ancho / 2} y={y} width={ancho} height={70} rx={14} fill="#3a3a3a" stroke={KC.ink} strokeWidth={8} />
    {[-0.3, 0, 0.3].map((u, i) => <rect key={i} x={x + u * ancho - 90} y={y + 8} width={180} height={14} rx={7} fill="#ff5a2a" opacity={0.85} />)}
  </g>;
}
// Cámara rápida en tripié.
function CamaraRapida({ x, y, s = 1, rec = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 60 L -70 260 M 0 60 L 70 260 M 0 60 L 0 260" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <rect x={-90} y={-50} width={180} height={110} rx={16} fill="#2b2f3a" stroke={KC.ink} strokeWidth={8} />
    <rect x={90} y={-30} width={60} height={70} rx={10} fill="#4a5060" stroke={KC.ink} strokeWidth={7} />
    <circle cx={150} cy={5} r={22} fill="#7fd0ff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-60} cy={-24} r={11} fill={rec > 0.5 ? KC.red : '#5a1a1a'} />
  </g>;
}
function Bocina({ x, y, s = 1, mudo = true, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -24 -12 L -10 -12 L 8 -28 L 8 28 L -10 12 L -24 12 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {mudo ? <path d="M 18 -12 L 38 12 M 38 -12 L 18 12" stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
      : <path d="M 18 -14 Q 30 0 18 14 M 28 -24 Q 46 0 28 24" stroke={KC.yellow} strokeWidth={6} fill="none" strokeLinecap="round" />}
  </g>;
}
function Pop({ T, at, x, y, tam = 120, color = KC.yellow, rot = -8, dura = 1.2 }) {
  if (T < at || T > at + dura) return null;
  const e = kprog(T, at, at + 0.3, kEase.rebote), o = 1 - kprog(T, at + dura - 0.3, at + dura);
  return <text x={0} y={0} textAnchor="middle" transform={`translate(${x} ${y}) rotate(${rot}) scale(${Math.max(0.01, e)})`} opacity={o}
    style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{'¡POP!'}</text>;
}

function Palomitas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Gr: CUES.Grano, Ca: CUES.Calor, Pe: CUES.Presion, Es: CUES.Espuma, Pr: CUES.Pregunta, Et: CUES.Estudio, Te: CUES.Termometro, Br: CUES.Brinco, So: CUES.Sonido, Vi: CUES.Viejitas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el grano del frente revienta en el 0.35 s
  const popG = K.G + 0.35;
  // temperatura (°C) y presión (× aire) a lo largo del viaje por dentro
  const temp = T < K.Pe ? klerp(25, 150, kprog(T, K.Ca + 0.2, K.Pe, kEase.suave)) : klerp(150, 180, kprog(T, K.Pe, K.Es, kEase.suave));
  const pres = T < K.Pe ? klerp(1, 3, kprog(T, K.Ca + 2.0, K.Pe)) : klerp(3, 10, kprog(T, K.Pe + 0.3, K.Pe + 3.4, kEase.suave));
  // espuma
  const rompe = K.Es + 0.4, crece = kprog(T, rompe, rompe + 1.1, kEase.sale);
  // termómetro: 50 granos (17 a 170 °C, 48 a 180 °C)
  const ordenG = (() => { const R = krng(77), a = Array.from({ length: 50 }, (_, i) => i); for (let i = 49; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
  const t170 = K.Te + 0.5, t180 = K.Te + 1.8;
  const tempTe = T < t170 ? klerp(160, 170, kprog(T, K.Te, t170)) : klerp(170, 180, kprog(T, t180 - 0.5, t180));
  const nPop = (i) => { const k = ordenG.indexOf(i); return k < 17 ? t170 + k * 0.035 : k < 48 ? t180 + (k - 17) * 0.025 : Infinity; };
  const pctTe = T < t180 ? 0.34 * kprog(T, t170, t170 + 0.6) : klerp(0.34, 0.96, kprog(T, t180, t180 + 0.8));
  // brinco
  const bCrack = K.Br + 1.1, bPata = K.Br + 1.5, bAplasta = K.Br + 2.1, bSalta = K.Br + 2.6;
  const pata = kprog(T, bPata, bAplasta, kEase.sale), aplasta = kprog(T, bAplasta, bSalta) * (1 - kprog(T, bSalta, bSalta + 0.15));
  const salto = kprog(T, bSalta, bSalta + 0.7, kEase.sale) - 0.25 * kprog(T, bSalta + 1.2, bSalta + 2.2, kEase.suave);
  // sonido: cabezal que recorre la pista
  const soA = K.So + 0.4, soB = K.So + 4.4, cab = kprog(T, soA, soB), soPop = 0.78;
  // viejitas
  const R = krng(9);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la palomera y el grano del frente que revienta */}
      <Escena T={T} a={K.G} b={K.Gr} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Palomera T={T} x={560} y={1010} s={0.95} llena={0.12 + 0.1 * kprog(T, K.G, K.Gr)} />
          {T < popG ? <Grano x={270 + Math.sin(T * 60) * 4} y={780} s={2.2} rot={-12} />
            : <g><Palomita x={270} y={770 - 40 * kprog(T, popG, popG + 0.4, kEase.sale)} r={klerp(40, 95, kprog(T, popG, popG + 0.3, kEase.sale))} rot={-10} />
              <Vapor T={T} x={270} y={720} f={kprog(T, popG, popG + 1.4)} r={90} seed={3} /></g>}
          <Pop T={T} at={popG} x={290} y={620} tam={110} />
          {[0, 1, 2].map((i) => { const t0 = K.G + 1.4 + i * 1.0; return T > t0 && T < t0 + 1.0 ? <Palomita key={i} x={420 + i * 120} y={850 - 260 * Math.sin(Math.PI * kprog(T, t0, t0 + 1.0))} r={34} rot={T * 200} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 1 · el grano por dentro (rayos X) */}
      <Escena T={T} a={K.Gr} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T < K.Gr + 0.9 ? <Grano x={600} y={890} s={klerp(1.2, 4.2, kprog(T, K.Gr - 0.4, K.Gr + 0.9, kEase.suave))} />
            : <g>
              <GranoCorte T={T} x={600} y={890} s={4.2} id="gc1" />
              <circle cx={600} cy={890} r={330} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="18 16" opacity={0.6 * kprog(T, K.Gr + 0.9, K.Gr + 1.3)} transform={`rotate(${T * 12} 600 890)`} />
            </g>}
        </SvgCapa>
        <Escala T={T} pxPorMm={68} x={60} y={1395} color={KC.ink} />
      </Escena>
      {/* 2–3 · calor y presión (por dentro, fondo noche) */}
      <Escena T={T} a={K.Ca} b={K.Es} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Ambiente T={T} />
          <circle cx={560} cy={880} r={250 + 30 * Math.sin(T * 6) * kprog(T, K.Ca, K.Pe)} fill="rgba(255,138,31,.10)" />
          <GranoCorte T={T} x={560} y={890} s={klerp(3.4, 3.9, kprog(T, K.Ca, K.Es))} vapor={kprog(T, K.Ca + 0.6, K.Pe + 0.6)} presion={kprog(T, K.Pe, K.Pe + 1.2)} id="gc2" />
          <Termometro x={985} y={T < K.Pe ? 560 : klerp(560, 760, kprog(T, K.Pe, K.Pe + 0.5, kEase.suave))} alto={T < K.Pe ? 560 : klerp(560, 380, kprog(T, K.Pe, K.Pe + 0.5, kEase.suave))} valor={temp} />
          <Manometro x={200} y={1010} valor={pres} o={kprog(T, K.Ca + 1.8, K.Ca + 2.3)} />
          <OllaExpres T={T} x={230} y={640} s={0.62} o={kprog(T, K.Pe + 0.6, K.Pe + 1.1)} />
        </SvgCapa>
      </Escena>
      {/* 4 · revienta: la espuma de almidón */}
      <Escena T={T} a={K.Es} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {T < rompe ? <Grano x={600 + Math.sin(T * 70) * 5} y={900} s={2.4} grietas={kprog(T, K.Es, rompe)} />
            : <g>
              <Grano x={600 - 220 * crece} y={900 + 200 * crece} s={2.4} rot={-60 * crece} o={1 - kprog(T, rompe + 0.8, rompe + 1.2)} />
              {Array.from({ length: 10 }, (_, i) => { const a = i * 36 * Math.PI / 180, d = klerp(140, 360, crece); return <line key={i} x1={600 + Math.cos(a) * d * 0.7} y1={900 + Math.sin(a) * d * 0.7} x2={600 + Math.cos(a) * d} y2={900 + Math.sin(a) * d} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" opacity={1 - crece} />; })}
              <Palomita x={600} y={880} r={klerp(60, 125, crece) * (1 + 0.02 * Math.sin(T * 4))} rot={Math.sin(T) * 4} />
              <Vapor T={T} x={600} y={720} f={kprog(T, rompe, rompe + 1.6)} r={110} seed={6} />
              <g opacity={kprog(T, rompe + 1.4, rompe + 1.8)}>
                <line x1={600 - 135} y1={600} x2={600 + 135} y2={600} stroke={KC.ink} strokeWidth={8} />
                <line x1={600 - 270} y1={1170} x2={600 + 270} y2={1170} stroke={KC.ink} strokeWidth={8} />
                {[-1, 1].map((k) => <path key={k} d={`M ${600 + k * 270} 1150 L ${600 + k * 270} 1190 M ${600 + k * 135} 580 L ${600 + k * 135} 620`} stroke={KC.ink} strokeWidth={8} />)}
                <text x={600} y={575} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>grano</text>
                <text x={600} y={1155} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>palomita: ×2 de ancho</text>
              </g>
            </g>}
        </SvgCapa>
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.Pr} b={K.Et} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Palomita x={290} y={960 + Math.sin(T * 3) * 20} r={80} rot={Math.sin(T * 2) * 20} />
          {[0, 1, 2].map((i) => <line key={i} x1={230 + i * 60} y1={1100 + Math.sin(T * 3) * 20} x2={230 + i * 60} y2={1180} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={0.5} />)}
          <text x={290} y={790} textAnchor="middle" style={{ font:`400 330px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 6} 290 680)`}>?</text>
          <text x={290} y={480} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={10} paintOrder="stroke">¿°C?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · el laboratorio: horno + placa caliente con cámara rápida */}
      <Escena T={T} a={K.Et} b={K.Te} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Horno T={T} x={270} y={940} s={0.95} f={K.Et + 3.0} />
          <Placa x={790} y={1100} ancho={420} />
          <Grano x={790} y={1060} s={0.6} />
          <CamaraRapida x={830} y={800} s={0.9} rec={Math.sin(T * 8) > 0 ? 1 : 0} />
          <path d="M 940 810 L 820 1030" stroke="#fff" strokeWidth={5} strokeDasharray="14 12" opacity={0.8} />
        </SvgCapa>
      </Escena>
      {/* 7 · el termómetro: 50 granos */}
      <Escena T={T} a={K.Te} b={K.Br} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <rect x={80} y={735} width={650} height={350} rx={30} fill="#fff8e0" stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 50 }, (_, i) => { const cx = 140 + (i % 10) * 59, cy = 790 + Math.floor(i / 10) * 62, tp = nPop(i);
            return T >= tp ? <Palomita key={i} x={cx} y={cy} r={klerp(12, 21, kprog(T, tp, tp + 0.2, kEase.rebote))} rot={i * 40} cascara={false} /> : <Grano key={i} x={cx} y={cy} s={0.46} rot={(i * 23) % 40 - 20} />; })}
          <Termometro x={920} y={560} alto={560} valor={tempTe} />
          <text x={405} y={1130} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>50 granos por temperatura</text>
        </SvgCapa>
        <Medidor T={T} at={t170} until={K.Br - 0.2} valor={pctTe} etiqueta="reventaron" x={90} y={1430} ancho={900} color={KC.yellow} />
      </Escena>
      {/* 8 · el brinco: la patita de almidón */}
      <Escena T={T} a={K.Br} b={K.So} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Placa x={540} y={1090} ancho={720} />
          {T < bCrack ? <Grano x={540 + Math.sin(T * 50) * 3} y={1035} s={1.5} rot={80} grietas={kprog(T, K.Br + 0.4, bCrack)} />
            : (() => { const yy = 1000 - 420 * salto, pl = 70 * pata * (1 - aplasta * 0.45);
              return <g transform={`translate(540 ${yy})`}>
                {pata > 0 && <g>
                  <ellipse cx={0} cy={50 + pl / 2} rx={26 + aplasta * 14} ry={Math.max(8, pl / 2 + 6)} fill={KC.ink} />
                  <ellipse cx={0} cy={50 + pl / 2} rx={20 + aplasta * 14} ry={Math.max(4, pl / 2)} fill={CREMA} />
                </g>}
                <Palomita x={0} y={0} r={klerp(40, 62, kprog(T, bCrack, bCrack + 0.4, kEase.sale))} rot={0} />
              </g>; })()}
          <g opacity={kprog(T, bSalta + 0.2, bSalta + 0.5)}>
            <path d="M 300 1060 L 300 520" stroke={KC.ink} strokeWidth={12} strokeDasharray="26 18" />
            <path d="M 270 560 L 300 500 L 330 560" fill="none" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
          </g>
          <text x={540} y={1215} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>placa caliente</text>
        </SvgCapa>
        {T > K.Br + 0.2 && T < K.So + 0.2 && <div style={{ position:'absolute', left:540, top:470, zIndex:42, transform:'translate(-50%,-50%)', textAlign:'center', opacity:kprog(T, K.Br + 0.2, K.Br + 0.5) * (1 - kprog(T, K.So - 0.3, K.So + 0.1)) }}>
          <div style={{ font:`700 24px ${KF.mono}`, color:KC.ink, letterSpacing:'.12em', marginBottom:4 }}>CÁMARA LENTA</div>
          <div style={{ font:`700 64px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.7)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'4px 22px' }}>{kformato(T < bAplasta ? 13.8 * kprog(T, bCrack, bAplasta) : klerp(13.8, 20.7, kprog(T, bAplasta, bSalta)), 1)} ms</div>
        </div>}
      </Escena>
      {/* 9 · el sonido: grietas en silencio, pop con el vapor (hipótesis) */}
      <Escena T={T} a={K.So} b={K.Vi} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={70} y={730} width={940} height={250} rx={24} fill={KC.dark} stroke={KC.ink} strokeWidth={8} />
          <text x={100} y={772} style={{ font:`700 28px ${KF.mono}` }} fill={KC.gold2}>VIDEO</text>
          {[0, 1, 2, 3].map((k) => { const fx = 190 + k * 230, vis = cab >= k * 0.24 + 0.02;
            return <g key={k} opacity={vis ? 1 : 0.25}>
              <rect x={fx - 95} y={790} width={190} height={170} rx={14} fill="#1d2230" stroke="#3a4256" strokeWidth={4} />
              {k < 3 ? <Grano x={fx} y={880} s={0.85} rot={80} grietas={(k + 1) / 3} /> : <g><Palomita x={fx} y={890} r={34} /><Vapor T={T} x={fx} y={860} f={kprog(T, soA + soPop * 4, soA + soPop * 4 + 1.2)} r={46} seed={2} /></g>}
              {k < 3 && <Bocina x={fx + 60} y={815} s={0.8} mudo />}
            </g>; })}
          <rect x={70} y={1000} width={940} height={190} rx={24} fill={KC.dark} stroke={KC.ink} strokeWidth={8} />
          <text x={100} y={1040} style={{ font:`700 28px ${KF.mono}` }} fill={KC.gold2}>SONIDO</text>
          {(() => { const pts = [], R2 = krng(3); for (let i = 0; i <= 160; i++) { const u = i / 160; if (u > cab) break; const pico = Math.exp(-Math.pow((u - soPop) / 0.012, 2)) * 70 + Math.exp(-Math.pow((u - soPop - 0.02) / 0.03, 2)) * 30 * Math.sin(i * 2.4);
              pts.push(`${100 + u * 880},${1110 + (R2() - 0.5) * 6 + pico * (i % 2 ? 1 : -1)}`); }
            return <polyline points={pts.join(' ')} fill="none" stroke={KC.mint} strokeWidth={5} strokeLinejoin="round" />; })()}
          {cab > 0 && cab < 1 && <line x1={100 + cab * 880} y1={1015} x2={100 + cab * 880} y2={1180} stroke={KC.red} strokeWidth={5} />}
          {cab > soPop && <Bocina x={100 + soPop * 880 + 70} y={1050} s={0.9} mudo={false} />}
        </SvgCapa>
      </Escena>
      {/* 10 · las que no revientan */}
      <Escena T={T} a={K.Vi} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <path d="M 330 840 L 870 840 L 845 1120 Q 840 1150 810 1150 L 390 1150 Q 360 1150 355 1120 Z" fill="#d7dce6" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          {Array.from({ length: 16 }, (_, i) => <Palomita key={i} x={390 + (i % 8) * 60 + (Math.floor(i / 8) % 2) * 28} y={1000 - Math.floor(i / 8) * 70} r={30} rot={i * 47} cascara={false} />)}
          {[[450, 1110, 20], [560, 1118, -30], [700, 1112, 60], [770, 1120, 10]].map(([x, y, r], i) => <Grano key={i} x={x} y={y} s={0.42} rot={r} color={mixHex(ORO, '#8a5a12', 0.3)} />)}
          <g opacity={kprog(T, K.Vi + 1.0, K.Vi + 1.5)}>
            <line x1={560} y1={1100} x2={330} y2={760} stroke={KC.ink} strokeWidth={6} />
            <circle cx={260} cy={640} r={180} fill="#fff8e0" stroke={KC.ink} strokeWidth={9} />
            <Grano x={260} y={650} s={1.7} rot={-20} grietas={1} color={mixHex(ORO, '#8a5a12', 0.3)} />
            {[0, 1, 2].map((i) => <Voluta key={i} T={T} x={300 + i * 22} y={580 + i * 30} h={90} fase={i * 2} color="rgba(77,184,255,.9)" ancho={6} o={kprog(T, K.Vi + 1.6 + i * 0.3, K.Vi + 2.0 + i * 0.3)} />)}
          </g>
        </SvgCapa>
      </Escena>
      {/* 11 · cierre: la palomera del inicio, ya llena */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Palomera T={T} x={560} y={1030} s={0.95} llena={klerp(0.6, 1, kprog(T, K.Ci, K.Ci + 2.5, kEase.sale))} />
          {T < K.Ci + 0.6 ? <Grano x={250 + Math.sin(T * 60) * 4} y={800} s={2.0} rot={-12} />
            : <g><Palomita x={250} y={790} r={klerp(36, 85, kprog(T, K.Ci + 0.6, K.Ci + 0.9, kEase.sale))} rot={-10} /><Vapor T={T} x={250} y={740} f={kprog(T, K.Ci + 0.6, K.Ci + 2.0)} r={80} seed={5} /></g>}
          <Pop T={T} at={K.Ci + 0.6} x={270} y={640} tam={100} />
        </SvgCapa>
      </Escena>

      {/* capítulos (N3) */}
      <Capitulo T={T} x={175} y={205} hasta={K.Vi} caps={[{ at: K.Gr + 0.2, titulo: 'El grano' }, { at: K.Pe + 0.1, titulo: 'La olla exprés' }, { at: K.Es + 0.1, titulo: 'El estallido' }, { at: K.Et + 0.1, titulo: 'El laboratorio' }]} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.9} until={K.Gr - 0.3} texto="¿se quemó?" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.1} until={K.Gr - 0.3} texto="trae agua adentro" y={1500} tam={46} borde={AGUA} />
      <Etq T={T} at={K.Gr + 1.1} until={K.Ca - 0.3} x={790} y={760} texto="pericarpio" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Gr + 1.6} until={K.Ca - 0.3} x={600} y={930} texto="almidón" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Gr + 1.1} until={K.Gr + 3.0} texto="pericarpio = la cáscara · ~0.16 mm" y={1500} tam={36} borde={ORO} />
      <Chip T={T} at={K.Gr + 3.1} until={K.Ca - 0.3} texto="≈ 20 mg de agua por grano" y={1500} tam={42} borde={AGUA} />
      <Chip T={T} at={K.Ca + 0.8} until={K.Pe - 0.3} texto="agua → vapor" y={1500} tam={46} borde="#fff" />
      <Chip T={T} at={K.Pe + 1.0} until={K.Es - 0.3} texto="≈ 10 veces la presión del aire (estimación)" y={1500} tam={32} borde={KC.red} />
      <Chip T={T} at={rompe + 1.3} until={K.Pr - 0.2} texto="ancho ×2" x={290} y={1500} tam={46} borde={KC.yellow} />
      <Chip T={T} at={rompe + 1.9} until={K.Pr - 0.2} texto="densidad ÷8" x={780} y={1500} tam={46} borde={KC.cyan} />
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.Et + 2.7} anio="2015" quien="Virot y Ponomarenko · Francia" revista="J. R. Soc. Interface" x={540} y={770} />
      <Etq T={T} at={K.Et + 3.0} until={K.Te - 0.3} x={110} y={740} texto="horno" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Et + 3.2} until={K.Te - 0.3} texto="cámara: 2900 cuadros por segundo" y={1500} tam={36} borde={KC.ink} fondo="rgba(14,15,18,.85)" />
      <Chip T={T} at={t180 + 0.4} until={K.Br - 0.3} texto="temperatura crítica ≈ 180 °C" x={600} y={650} tam={32} borde={KC.red} />
      <Chip T={T} at={bPata} until={bSalta - 0.1} texto="la patita se aplasta · 13.8 ms" y={1500} tam={38} borde={CREMA} />
      <Chip T={T} at={bSalta} until={K.So - 0.3} texto="rebota y brinca · 20.7 ms" y={1500} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.So + 0.6} until={soA + soPop * 4 - 0.1} texto="grietas: sin ruido" y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={soA + soPop * 4} until={K.Vi - 0.3} texto="POP · vapor (hipótesis)" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Vi + 0.5} until={K.Vi + 1.9} texto="las que no reventaron" y={1500} tam={42} borde={ORO} />
      <TarjetaEstudio T={T} at={K.Vi + 2.0} until={K.Ci - 0.3} anio="2005" quien="Tandjung et al." revista="Biomacromolecules · la cáscara y el agua" y={1580} />
      <MitoTachado T={T} at={K.Ci + 0.2} tacharEn={K.Ci + 0.9} until={K.Ou - 0.2} texto="¿se quemó?" x={300} y={470} tam={50} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="agua → vapor → presión → ¡revienta!" y={1500} tam={34} borde={AGUA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Gr - 0.1} texto="No se quema: *trae agua adentro.*" />
      <Subtitulo T={T} idx={1} at={K.Gr + 0.1} until={K.Ca - 0.1} texto="Unos *20 mg de agua.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Pe - 0.1} texto="El agua *se vuelve vapor.*" />
      <Subtitulo T={T} idx={3} at={K.Pe + 0.1} until={K.Es - 0.1} texto="Aguanta como *olla exprés.*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.Pr - 0.1} texto="Revienta *en espuma.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Et - 0.1} texto="¿Cuándo revienta *y por qué brinca?*" />
      <Subtitulo T={T} idx={6} at={K.Et + 0.1} until={K.Te - 0.1} texto="2015: *cámara superrápida.*" />
      <Subtitulo T={T} idx={7} at={K.Te + 0.1} until={K.Br - 0.1} texto="A 180 °C: *el 96 %.*" />
      <Subtitulo T={T} idx={8} at={K.Br + 0.1} until={K.So - 0.1} texto="Una *patita de almidón.*" />
      <Subtitulo T={T} idx={9} at={K.So + 0.1} until={K.Vi - 0.1} texto="Proponen: *el pop es vapor.*" />
      <Subtitulo T={T} idx={10} at={K.Vi + 0.1} until={K.Ci - 0.1} texto="Cáscara que *retiene peor el agua.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Revienta por *el agua de adentro.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Grano + 1.2, CUES.Calor + 1.0, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Presion + 0.3, CUES.Espuma - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Espuma + 1.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Termometro - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Termometro + 0.3, CUES.Brinco - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Brinco + 1.0, CUES.Sonido - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Sonido + 0.5, CUES.Viejitas - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Viejitas + 0.5, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PalomitasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Palomitas /></CompositionStage></div>;
}
window.PalomitasApp = PalomitasApp;
