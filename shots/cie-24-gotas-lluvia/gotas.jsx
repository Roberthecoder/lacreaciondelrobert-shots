// Shot Científico #24 · Las gotas de lluvia no tienen forma de lágrima — NARRADO (N3 "Capítulos y medidores").
// Datos: USGS Water Science School (forma de la gota), NASA GPM, Gunn y Kinzer 1949 (≈ 9 m/s), NWS (llovizna). Ver guion.md y verificacion.md.
// Dibujo esquemático y exagerado: las formas y los tamaños no van a escala.
const GT_AGUA = '#8fdcff', GT_AGUA2 = '#4fb6f0', GT_PAN = '#e39a45', GT_PAN2 = '#f6c47c';

// Gota de lluvia. (x, y) = centro; r = radio; a 0..1 = cuánto se aplana abajo (pan); h 0..1 = cuánto se hunde por debajo (paracaídas).
function Gota({ x, y, r, a = 0, h = 0, o = 1, color = GT_AGUA, borde = KC.ink, grosor = 8, brillo = true, rot = 0 }) {
  if (o <= 0.01 || r <= 0.5) return null;
  const N = 72, W = 1 + 0.18 * a + 0.32 * h, pts = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2, c = Math.cos(th), s = Math.sin(th);
    const yy = s < 0 ? r * s * (1 - 0.05 * a) : r * s * (1 - 0.72 * a) - h * r * 0.8 * s * s * (0.25 + 0.75 * Math.abs(s));
    pts.push(`${(c * r * W).toFixed(1)},${yy.toFixed(1)}`);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <polygon points={pts.join(' ')} fill={color} stroke={borde} strokeWidth={grosor} strokeLinejoin="round" />
    {brillo && <ellipse cx={-r * 0.38 * W} cy={-r * 0.45} rx={r * 0.2} ry={r * 0.12} transform={`rotate(-35 ${-r * 0.38 * W} ${-r * 0.45})`} fill="#fff" opacity=".85" />}
  </g>;
}
// Gota en forma de lágrima clásica (punta arriba). L = distancia de la punta al centro (L = r → casi redonda).
function Lagrima({ x, y, r, L, o = 1, color = GT_AGUA, grosor = 8, brillo = true }) {
  if (o <= 0.01) return null;
  L = L == null ? r * 2.2 : L;
  const d = `M 0 ${-L} C ${r * 0.3} ${-L * 0.6}, ${r} ${-r * 0.75}, ${r} 0 A ${r} ${r} 0 0 1 ${-r} 0 C ${-r} ${-r * 0.75}, ${-r * 0.3} ${-L * 0.6}, 0 ${-L} Z`;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={d} fill={color} stroke={KC.ink} strokeWidth={grosor} strokeLinejoin="round" />
    {brillo && <ellipse cx={-r * 0.4} cy={-r * 0.2} rx={r * 0.18} ry={r * 0.3} transform={`rotate(20 ${-r * 0.4} ${-r * 0.2})`} fill="#fff" opacity=".85" />}
  </g>;
}
// Pan de hamburguesa de verdad (la tapa con ajonjolí). w = medio ancho.
function PanHamburguesa({ x, y, w = 150, s = 1, rot = 0, cara = false }) {
  const h = w * 0.72;
  const sem = [[-0.55, -0.45], [-0.2, -0.72], [0.18, -0.6], [0.5, -0.38], [-0.05, -0.32], [0.35, -0.78], [-0.42, -0.2], [0.6, -0.12]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={h * 0.08} rx={w * 1.02} ry={h * 0.16} fill="rgba(0,0,0,.18)" />
    <path d={`M ${-w} 0 C ${-w} ${-h * 1.35}, ${w} ${-h * 1.35}, ${w} 0 Q ${w} ${h * 0.12} ${w * 0.85} ${h * 0.12} L ${-w * 0.85} ${h * 0.12} Q ${-w} ${h * 0.12} ${-w} 0 Z`} fill={GT_PAN} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w * 0.96} ${h * 0.02} L ${w * 0.96} ${h * 0.02}`} stroke={GT_PAN2} strokeWidth={h * 0.12} strokeLinecap="round" />
    <path d={`M ${-w * 0.6} ${-h * 0.75} Q ${-w * 0.2} ${-h * 1.02} ${w * 0.15} ${-h * 0.98}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" fill="none" opacity=".45" />
    {sem.map(([sx, sy], i) => <ellipse key={i} cx={sx * w} cy={sy * h} rx={w * 0.05} ry={w * 0.028} transform={`rotate(${(i * 37) % 80 - 40} ${sx * w} ${sy * h})`} fill="#fff8e6" stroke={KC.ink} strokeWidth={2.5} />)}
    {cara && <g><circle cx={-w * 0.25} cy={-h * 0.35} r={w * 0.05} fill={KC.ink} /><circle cx={w * 0.25} cy={-h * 0.35} r={w * 0.05} fill={KC.ink} />
      <path d={`M ${-w * 0.16} ${-h * 0.2} Q 0 ${-h * 0.05} ${w * 0.16} ${-h * 0.2}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
  </g>;
}
// Flecha corta que empuja (dentro de svg): de (x1,y1) a (x2,y2) con una pulsación.
function Empuje({ x1, y1, x2, y2, p = 1, color = KC.yellow, grosor = 12 }) {
  return p > 0.02 ? <FlechaRecta x1={x1} y1={y1} x2={klerp(x1, x2, p)} y2={klerp(y1, y2, p)} color={color} grosor={grosor} punta={28} /> : null;
}
// Cielo de lluvia del gancho y del cierre. modo 'inicio' (lágrimas que se vuelven bolitas y panes) | 'final' (ya bolitas y panes).
function CieloLluvia({ T, t0 = 0, modo = 'inicio' }) {
  const g = krng(24), drops = Array.from({ length: 24 }, (_, i) => ({ x: 60 + ((i * 197) % 960) + g() * 30, y0: g() * 1700, v: 260 + g() * 120, grande: i % 3 === 0, r: 16 + g() * 8 }));
  const bol = modo === 'final' ? 1 : kprog(T, 3.2, 3.9, kEase.suave), pan = modo === 'final' ? 1 : kprog(T, 4.9, 5.6, kEase.suave);
  return <g>
    {[[160, 150, 1.25], [520, 110, 1.5], [900, 170, 1.2]].map(([x, y, s], i) => <Nube key={i} x={x + Math.sin(T * 0.4 + i) * 16} y={y} s={s} color="#fff" />)}
    {drops.map((d, i) => { const y = ((d.y0 + (T - t0) * d.v) % 1700) + 230, x = d.x + Math.sin(T + i) * 4;
      const rr = d.grande ? d.r * 1.6 : d.r;
      return <g key={i}>
        <Lagrima x={x} y={y} r={rr * 0.8} o={1 - bol} grosor={5} brillo={false} />
        <Gota x={x} y={y} r={rr * (0.6 + 0.4 * bol)} a={d.grande ? pan : 0} o={bol} grosor={5} brillo={false} />
      </g>; })}
  </g>;
}
// Llave del agua (sale de la derecha). La boca queda en (bx, by).
function Llave({ bx = 540, by = 900 }) {
  return <g>
    <rect x={bx + 20} y={by - 210} width={620} height={80} rx={14} fill="#c9d2dc" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${bx + 60} ${by - 210} Q ${bx - 40} ${by - 210} ${bx - 40} ${by - 100} L ${bx - 40} ${by} L ${bx + 40} ${by} L ${bx + 40} ${by - 100} Q ${bx + 40} ${by - 130} ${bx + 70} ${by - 130} Z`} fill="#c9d2dc" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={bx - 52} y={by - 18} width={104} height={30} rx={8} fill="#a9b4c0" stroke={KC.ink} strokeWidth={8} />
    <rect x={bx + 263} y={by - 270} width={34} height={64} fill="#a9b4c0" stroke={KC.ink} strokeWidth={8} />
    <rect x={bx + 180} y={by - 300} width={200} height={42} rx={21} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={bx + 70} y={by - 196} width={520} height={14} rx={7} fill="#fff" opacity=".5" />
  </g>;
}
// Gota que se forma en la llave, se estira (lágrima) y se despega. Ciclo de `per` s desde t0.
function GoteoLlave({ T, t0, bx = 540, by = 900, per = 2.6, suelo = 1170 }) {
  if (T < t0) return null;
  const f = ((T - t0) % per) / per;
  const crece = kprog(f, 0, 0.5, kEase.suave), estira = kprog(f, 0.45, 0.68, kEase.suave), cae = kprog(f, 0.68, 0.95);
  const r = 22 + 36 * crece;
  if (f < 0.68) {
    const L = r * (1.05 + 1.6 * estira), cy = by + 12 + L;
    return <Lagrima x={bx} y={cy} r={r} L={L} grosor={7} />;
  }
  const y0 = by + 12 + r * 2.65, y = klerp(y0, suelo - 40, cae * cae), L = r * klerp(2.2, 1.0, kprog(cae, 0, 0.35));
  return L > r * 1.08 ? <Lagrima x={bx} y={y} r={r} L={L} grosor={7} /> : <Gota x={bx} y={y} r={r} grosor={7} />;
}
// Signo «=» dibujado (dentro de svg).
function Igual({ x, y, s = 1, color = KC.yellow }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{[-26, 26].map((dy) => <rect key={dy} x={-60} y={dy - 15} width={120} height={30} rx={10} fill={color} stroke={KC.ink} strokeWidth={8} />)}</g>;
}
// Rótulo con línea (dentro de svg): la línea va de (px,py) al texto en (x,y).
function Rotulo({ T, at, until, x, y, px, py, texto, tam = 44, ancla = 'start', color = KC.texto }) {
  if (T < at || T > until + 0.3) return null;
  const o = kprog(T, at, at + 0.3) * (1 - kprog(T, until, until + 0.3)), l = kprog(T, at, at + 0.4, kEase.sale);
  const lx = ancla === 'start' ? x - 14 : x + 14;
  return <g opacity={o}>
    {px != null && <line x1={px} y1={py} x2={klerp(px, lx, l)} y2={klerp(py, y - tam * 0.35, l)} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
    {px != null && <circle cx={px} cy={py} r={9} fill={KC.ink} />}
    <TextoSvg x={x} y={y} tam={tam} fuente="texto" ancla={ancla} color={color}>{texto}</TextoSvg>
  </g>;
}
// Velocímetro (dentro de svg): de 0 a 10 m/s. v en m/s.
function Velocimetro({ x, y, r = 230, v = 0 }) {
  const ang = (u) => Math.PI + (u / 10) * Math.PI, px = (u, k) => x + Math.cos(ang(u)) * r * k, py = (u, k) => y + Math.sin(ang(u)) * r * k;
  return <g>
    <path d={`M ${x - r - 24} ${y} A ${r + 24} ${r + 24} 0 0 1 ${x + r + 24} ${y} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    <path d={`M ${px(8, 0.86)} ${py(8, 0.86)} A ${r * 0.86} ${r * 0.86} 0 0 1 ${px(10, 0.86)} ${py(10, 0.86)}`} stroke={KC.red} strokeWidth={26} fill="none" />
    {Array.from({ length: 11 }, (_, u) => <line key={u} x1={px(u, 0.98)} y1={py(u, 0.98)} x2={px(u, u % 5 ? 0.88 : 0.8)} y2={py(u, u % 5 ? 0.88 : 0.8)} stroke={KC.ink} strokeWidth={u % 5 ? 5 : 9} />)}
    {[0, 5, 10].map((u) => <text key={u} x={px(u, 0.64)} y={py(u, 0.64) + 14} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>{u}</text>)}
    <line x1={x} y1={y} x2={px(v, 0.84)} y2={py(v, 0.84)} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <circle cx={x} cy={y} r={26} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={x} y={y + 70} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>m/s</text>
  </g>;
}
// Rayas de velocidad que suben (la gota cae).
function Rayas({ T, x, ancho = 240, n = 9, vel = 2200, color = 'rgba(255,255,255,.75)', seed = 4, y0 = 380, y1 = 1220 }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const xx = x - ancho / 2 + g() * ancho, l = 80 + g() * 120, ph = g() * 2000, alto = y1 - y0;
    const y = y1 - (((T * vel + ph) % (alto + l)));
    return <line key={i} x1={xx} y1={Math.max(y0, y)} x2={xx} y2={Math.min(y1, y + l)} stroke={color} strokeWidth={8} strokeLinecap="round" />; })}</g>;
}

function Gotas() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: la lágrima se tacha (1.0 s), las gotas se vuelven bolitas (3.2 s) y las grandes, panes (4.9 s)
  const TACHA = 0.9, BOL = 3.2, PAN = 4.9;
  // paracaídas: crece y luego se hunde
  const PC = K.Paracaidas, rPC = klerp(130, 225, kprog(T, PC + 0.2, PC + 2.4, kEase.suave)), hPC = kprog(T, PC + 2.8, PC + 4.8, kEase.suave);
  // rompe
  const RB = K.Rompe + 0.35;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.cyan }}>
      {/* 0 · gancho: la lluvia que todos dibujamos… no es así */}
      <Escena T={T} a={K.Gancho} b={K.Pequenas} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CieloLluvia T={T} modo="inicio" />
          {/* la lágrima grande que se tacha y se vuelve bolita */}
          {(() => { const m = kprog(T, BOL, BOL + 0.6, kEase.suave), p = kprog(T, PAN, PAN + 0.7, kEase.suave), yb = 860 + Math.sin(T * 2) * 10;
            return <g>
              <Lagrima x={330} y={yb} r={150} L={150 * klerp(2.2, 1, m)} o={1 - kprog(m, 0.6, 1)} />
              <Gota x={330} y={yb} r={klerp(110, 170, p)} a={p} o={kprog(m, 0.5, 1)} />
              {T > TACHA && <g opacity={1 - kprog(T, BOL, BOL + 0.4)}>
                <line x1={150} y1={540} x2={150 + 360 * kprog(T, TACHA, TACHA + 0.2)} y2={540 + 500 * kprog(T, TACHA, TACHA + 0.2)} stroke={KC.red} strokeWidth={34} strokeLinecap="round" />
                <line x1={510} y1={540} x2={510 - 360 * kprog(T, TACHA + 0.2, TACHA + 0.4)} y2={540 + 500 * kprog(T, TACHA + 0.2, TACHA + 0.4)} stroke={KC.red} strokeWidth={34} strokeLinecap="round" opacity={T > TACHA + 0.2 ? 1 : 0} />
              </g>}
            </g>; })()}
          {T > PAN + 0.5 && <g transform={`translate(800 1000) scale(${klerp(0.3, 1, kprog(T, PAN + 0.5, PAN + 0.9, kEase.rebote))})`}>
            <PanHamburguesa x={0} y={0} w={170} />
          </g>}
          {T > PAN + 0.7 && <Igual x={575} y={930} color={KC.yellow} s={klerp(0.3, 1, kprog(T, PAN + 0.7, PAN + 1.0, kEase.rebote))} />}
        </Lienzo>
        <Chip T={T} at={TACHA + 0.3} until={BOL - 0.1} texto="no es lágrima" x={330} y={460} tam={42} borde={KC.red} />
        <Chip T={T} at={BOL + 0.3} until={PAN - 0.1} texto="chiquitas: bolitas" x={330} y={460} tam={42} borde={KC.mint} />
        <Chip T={T} at={PAN + 0.3} until={K.Pequenas - 0.1} texto="grandes: pan" x={330} y={460} tam={42} borde={GT_PAN} />
      </Escena>
      {/* 1 · gota chiquita: la tensión superficial la jala hacia adentro */}
      <Escena T={T} a={K.Pequenas} b={K.Caen} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          {(() => { const asienta = kprog(T, K.Pequenas + 0.4, K.Pequenas + 2.6, kEase.sale), wob = (1 - asienta) * 0.16 * Math.sin(T * 9);
            return <g transform={`translate(540 780) scale(${1 + wob} ${1 - wob}) translate(-540 -780)`}><Gota x={540} y={780} r={200} grosor={10} /></g>; })()}
          {Array.from({ length: 10 }, (_, i) => { const an = i * Math.PI / 5, at = K.Pequenas + 0.6 + i * 0.08, pul = 0.5 + 0.5 * Math.sin(T * 5 - i);
            const r1 = 340 + 14 * pul, r2 = 230;
            return <Empuje key={i} x1={540 + Math.cos(an) * r1} y1={780 + Math.sin(an) * r1} x2={540 + Math.cos(an) * r2} y2={780 + Math.sin(an) * r2} p={kprog(T, at, at + 0.4, kEase.sale)} color={KC.yellow} />; })}
          {/* regla en milímetros: 1 mm = 500 px (dibujo ampliado) */}
          {T > K.Pequenas + 2.4 && <g opacity={kprog(T, K.Pequenas + 2.4, K.Pequenas + 2.8)}>
            <rect x={290} y={1080} width={500} height={44} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 11 }, (_, i) => <line key={i} x1={290 + i * 50} y1={1080} x2={290 + i * 50} y2={1080 + (i % 5 ? 16 : 30)} stroke={KC.ink} strokeWidth={4} />)}
            <text x={290} y={1170} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto}>0</text>
            <text x={790} y={1170} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto}>1 mm</text>
            <line x1={340} y1={1050} x2={340} y2={990} stroke={KC.texto} strokeWidth={4} strokeDasharray="8 8" />
            <line x1={740} y1={1050} x2={740} y2={990} stroke={KC.texto} strokeWidth={4} strokeDasharray="8 8" />
          </g>}
          <Rotulo T={T} at={K.Pequenas + 3.0} until={K.Caen - 0.1} x={800} y={600} px={700} py={660} texto="redonda" color={KC.cyan} />
        </Lienzo>
        <Chip T={T} at={K.Pequenas + 0.7} until={K.Caen - 0.1} texto="tensión superficial" x={540} y={420} tam={44} borde={KC.yellow} />
      </Escena>
      {/* 2 · al caer, el aire la empuja desde abajo y la aplana */}
      <Escena T={T} a={K.Caen} b={K.Pan} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Rayas T={T} x={540} ancho={700} n={12} vel={1400} />
          <Gota x={540} y={760 + Math.sin(T * 6) * 6} r={190} a={kprog(T, K.Caen + 0.6, K.Caen + 3.2, kEase.suave) * 0.6} grosor={10} />
          {[-160, -60, 60, 160].map((dx, i) => { const pul = (T * 1.6 + i * 0.25) % 1, at = K.Caen + 0.3 + i * 0.1;
            return T > at && <Empuje key={i} x1={540 + dx} y1={1180 - pul * 40} x2={540 + dx} y2={960 - pul * 40} p={kprog(T, at, at + 0.35)} color={KC.paper} grosor={14} />; })}
        </Lienzo>
        <Chip T={T} at={K.Caen + 0.2} until={K.Pan - 0.1} texto="cae ↓" x={300} y={440} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Caen + 0.6} until={K.Pan - 0.1} texto="aire ↑" x={780} y={440} tam={44} borde={KC.white} />
      </Escena>
      {/* 3 · las grandes: planas abajo, redondas arriba = pan de hamburguesa */}
      <Escena T={T} a={K.Pan} b={K.Pregunta} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Gota x={310} y={760 + Math.sin(T * 3) * 6} r={200} a={1} grosor={10} />
          {T > K.Pan + 2.6 && <Igual x={560} y={950} color={KC.cyan} s={klerp(0.3, 1, kprog(T, K.Pan + 2.6, K.Pan + 2.9, kEase.rebote))} />}
          <Rotulo T={T} at={K.Pan + 0.6} until={K.Pregunta - 0.1} x={560} y={600} px={420} py={600} texto="redonda arriba" />
          <Rotulo T={T} at={K.Pan + 1.4} until={K.Pregunta - 0.1} x={600} y={830} px={480} py={815} texto="plana abajo" />
          {T > K.Pan + 2.9 && <g transform={`translate(810 1060) scale(${klerp(0.3, 1, kprog(T, K.Pan + 2.9, K.Pan + 3.3, kEase.rebote))})`}><PanHamburguesa x={0} y={0} w={180} rot={Math.sin(T * 2) * 3} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Pan + 3.3} until={K.Pregunta - 0.1} texto="pan de hamburguesa" x={540} y={430} tam={44} borde={GT_PAN} />
      </Escena>
      {/* 4 · ¿y si siguen creciendo? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Paracaidas} color={KC.lilac} />
      {/* 5 · ≈ 8 mm de ancho: el aire la hunde por debajo → paracaídas */}
      <Escena T={T} a={K.Paracaidas} b={K.Rompe} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Rayas T={T} x={540} ancho={760} n={10} vel={1500} />
          <Gota x={540} y={800} r={rPC} a={1} h={hPC} grosor={10} />
          {(() => { const W = rPC * (1.18 + 0.32 * hPC), yl = 800 - rPC - 50, o = kprog(T, PC + 1.6, PC + 2.0);
            return o > 0 && <g opacity={o}>
              <line x1={540 - W} y1={yl - 40} x2={540 - W} y2={yl + 20} stroke={KC.ink} strokeWidth={6} />
              <line x1={540 + W} y1={yl - 40} x2={540 + W} y2={yl + 20} stroke={KC.ink} strokeWidth={6} />
              <FlechaRecta x1={540} y1={yl} x2={540 - W + 6} y2={yl} color={KC.ink} grosor={8} punta={24} />
              <FlechaRecta x1={540} y1={yl} x2={540 + W - 6} y2={yl} color={KC.ink} grosor={8} punta={24} />
            </g>; })()}
          {[-70, 0, 70].map((dx, i) => { const at = PC + 2.8 + i * 0.12, pul = (T * 1.8 + i * 0.3) % 1;
            return T > at && <Empuje key={i} x1={540 + dx} y1={1160 - pul * 30} x2={540 + dx} y2={900 - pul * 30} p={kprog(T, at, at + 0.4)} color={KC.paper} grosor={16} />; })}
          <Rotulo T={T} at={PC + 4.6} until={K.Rompe - 0.1} x={720} y={1020} texto="paracaídas" />
        </Lienzo>
        <Chip T={T} at={PC + 1.6} until={K.Rompe - 0.1} texto="≈ 8 mm de ancho" x={540} y={430} tam={50} borde={KC.yellow} />
      </Escena>
      {/* 6 · ¡plop!: se rompe en gotitas que vuelven a caer */}
      <Escena T={T} a={K.Rompe} b={K.Lagrima} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          {T < RB && <Gota x={540} y={800} r={225 + 30 * kprog(T, K.Rompe - 0.4, RB)} a={1} h={1} grosor={10} />}
          {T >= RB && Array.from({ length: 26 }, (_, i) => { const g = krng(300 + i), an = -Math.PI * (0.05 + 0.9 * g()) + (i % 2 ? 0 : Math.PI * 0.15), sp = 380 + g() * 420, dt = T - RB;
            const r0 = i < 10 ? 34 + g() * 14 : 14 + g() * 14, x0 = 540 + Math.cos(an) * 260, y0 = 800 + Math.sin(an) * 120;
            const x = x0 + Math.cos(an) * sp * Math.min(dt, 1.2) * 0.8, y = y0 + Math.sin(an) * sp * Math.min(dt, 1.2) * 0.8 + 260 * dt * dt;
            const yy = ((y - 300) % 1000 + 1000) % 1000 + 300;
            return <Gota key={i} x={x} y={dt < 1.4 ? y : yy} r={r0 * klerp(1.4, 1, kprog(dt, 0, 0.3))} grosor={6} brillo={r0 > 26} />; })}
          <Onomato T={T} at={RB} dur={1.3} x={760} y={600} texto="¡PLOP!" tam={170} color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={RB + 2.0} until={K.Lagrima - 0.1} texto="gotitas: a caer otra vez" x={620} y={430} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 7 · ¿y la lágrima? en la llave, cuando se despega */}
      <Escena T={T} a={K.Lagrima} b={K.Velocidad} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={160} y={1100} width={760} height={56} rx={28} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
          <Llave bx={540} by={760} />
          <GoteoLlave T={T} t0={K.Lagrima + 0.3} bx={540} by={760} per={2.7} suelo={1110} />
          <Rotulo T={T} at={K.Lagrima + 2.7} until={K.Velocidad - 0.1} x={330} y={860} px={500} py={870} texto="se despega" ancla="end" tam={40} />
          {[0.3 + 2.7 * 0.95, 0.3 + 2.7 * 1.95].map((t, i) => <Onomato key={i} T={T} at={K.Lagrima + t} dur={0.5} x={700} y={1060} texto="plic" tam={70} color={KC.cyan} rot={6} />)}
          {T < K.Lagrima + 2.6 && <TextoSvg x={400} y={470} tam={80} color={KC.yellow} o={1 - kprog(T, K.Lagrima + 2.3, K.Lagrima + 2.6)} s={klerp(0.4, 1, kprog(T, K.Lagrima, K.Lagrima + 0.35, kEase.rebote))}>¿Y LA LÁGRIMA?</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Lagrima + 2.7} until={K.Velocidad - 0.1} texto="aquí sí, por un instante" x={380} y={430} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 8 · la gota grande cae a ≈ 9 m/s · más de 30 km/h */}
      <Escena T={T} a={K.Velocidad} b={K.Chica} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Rayas T={T} x={250} ancho={260} n={9} vel={2600} />
          <Rotulo T={T} at={K.Velocidad + 0.4} until={K.Chica - 0.1} x={250} y={1010} texto="gota grande" ancla="middle" tam={42} />
          <Gota x={250 + Math.sin(T * 20) * 3} y={820} r={120} a={0.9} grosor={9} />
          {(() => { const v = 9 * kprog(T, K.Velocidad + 0.5, K.Velocidad + 2.2, kEase.sale) + (T > K.Velocidad + 2.2 ? Math.sin(T * 14) * 0.08 : 0);
            return <g>
              <Velocimetro x={740} y={880} r={230} v={v} />
              {T > K.Velocidad + 1.4 && <TextoSvg x={740} y={1080} tam={110} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Velocidad + 1.4, K.Velocidad + 1.8, kEase.rebote))}>≈ 9 m/s</TextoSvg>}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Velocidad + 3.1} until={K.Chica - 0.1} texto="≈ 9 m/s · más de 30 km/h" x={540} y={430} tam={44} borde={KC.red} />
      </Escena>
      {/* 9 · la llovizna cae mucho más despacio */}
      <Escena T={T} a={K.Chica} b={K.Cierre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <line x1={540} y1={520} x2={540} y2={1070} stroke="rgba(14,15,18,.35)" strokeWidth={6} strokeDasharray="16 14" />
          {[0, 1].map((k) => { const y = 480 + (((T - K.Chica) * 1100 + k * 290) % 580); return <Gota key={k} x={280} y={y} r={60} a={0.6} grosor={7} />; })}
          <Rayas T={T} x={280} ancho={160} n={5} vel={2400} y0={480} y1={1060} />
          {Array.from({ length: 22 }, (_, i) => { const g = krng(500 + i), x = 610 + g() * 380, y = 480 + (((T - K.Chica) * (45 + g() * 25) + g() * 580) % 580);
            return <Gota key={i} x={x + Math.sin(T * 1.5 + i) * 10} y={y} r={8 + g() * 5} grosor={4} brillo={false} />; })}
          <TextoSvg x={280} y={1130} tam={52} fuente="texto" color={KC.texto}>grande</TextoSvg>
          <TextoSvg x={800} y={1130} tam={52} fuente="texto" color={KC.texto}>llovizna</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Chica + 1.6} until={K.Cierre - 0.1} texto="mucho más despacio" x={760} y={430} tam={40} borde={KC.mint} />
      </Escena>
      {/* 10 · cierre: la misma lluvia del inicio, ahora bien dibujada */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CieloLluvia T={T} modo="final" />
          <Gota x={330} y={860 + Math.sin(T * 2) * 10} r={170} a={1} grosor={10} />
          {T > K.Cierre + 0.3 && <g opacity={kprog(T, K.Cierre + 0.3, K.Cierre + 0.6)}>
            <Lagrima x={560} y={1110} r={34} />
            <line x1={510} y1={1020} x2={610} y2={1130} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
            <line x1={610} y1={1020} x2={510} y2={1130} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
          </g>}
          <Igual x={575} y={930} color={KC.yellow} />
          <g transform={`translate(800 1000) scale(${1 + 0.04 * Math.sin(T * 4)})`}><PanHamburguesa x={0} y={0} w={170} cara={T > K.Cierre + 3} /></g>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 3.2} until={K.Outro - 0.1} texto="dibuja panes" x={330} y={460} tam={46} borde={GT_PAN} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Pequenas - 0.1} texto="No son lágrimas: *bolitas y panes.*" />
      <Subtitulo T={T} idx={1} at={K.Pequenas + 0.1} until={K.Caen - 0.1} texto="La *tensión superficial* la deja redonda." />
      <Subtitulo T={T} idx={2} at={K.Caen + 0.1} until={K.Pan - 0.1} texto="El aire la *aplana* desde abajo." />
      <Subtitulo T={T} idx={3} at={K.Pan + 0.1} until={K.Pregunta - 0.1} texto="Plana abajo, redonda arriba: *pan.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Paracaidas - 0.1} texto="¿Y si *siguen creciendo?*" />
      <Subtitulo T={T} idx={5} at={K.Paracaidas + 0.1} until={K.Rompe - 0.1} texto="≈ 8 mm: se infla como *paracaídas.*" />
      <Subtitulo T={T} idx={6} at={K.Rompe + 0.1} until={K.Lagrima - 0.1} texto="Se rompe en *gotitas.*" />
      <Subtitulo T={T} idx={7} at={K.Lagrima + 0.1} until={K.Velocidad - 0.1} texto="La lágrima: en la *llave que gotea.*" />
      <Subtitulo T={T} idx={8} at={K.Velocidad + 0.1} until={K.Chica - 0.1} texto="Una gota grande: *≈ 9 m/s.*" />
      <Subtitulo T={T} idx={9} at={K.Chica + 0.1} until={K.Cierre - 0.1} texto="La llovizna cae *más despacio.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Dibuja lluvia con *panes.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Pequenas - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Pequenas + 2.5, K.Caen - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Pan + 3.0, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Paracaidas - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Paracaidas + 2.6, K.Rompe - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Rompe + 0.3, K.Lagrima - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Lagrima + 0.2, K.Velocidad - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Velocidad + 2.4, K.Chica - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Chica + 0.5, K.Cierre - 0.1, 'avatar_03_aburrido_manos_mejillas', 'bajo-der'],
        [K.Cierre + 1.0, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="fisica" num="24" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function GotasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gotas /></CompositionStage></div>;
}
window.GotasApp = GotasApp;
