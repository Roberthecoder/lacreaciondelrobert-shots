// Shot Científico #52 · Las luces que ves al tallarte los ojos (fosfenos) — NARRADO (N1 "Por dentro": la retina estimulada sin luz).
// Datos: Grüsser et al. 1989 (Vision Research), Science Norway 2022, NEI, AAO, NASA 2012 (Apolo). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.
const FCOL = [KC.yellow, KC.cyan, KC.pink, KC.mint, KC.orange, KC.lilac, KC.gold2];
const SENAL = KC.yellow, RETINA = KC.coral;

// ---------- patrones de fosfenos (estrellas, zigzags, espirales, anillos) ----------
const FOSF = (() => { const g = krng(52); return Array.from({ length: 16 }, (_, i) => ({ x: g() * 2 - 1, y: g() * 2 - 1, tipo: i % 4, c: FCOL[i % FCOL.length], s: 0.5 + g() * 0.6, f: g() * 6, d: g() * 0.6 })); })();
function Espiral({ s = 1, c, T, f }) {
  const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 5, r = 4 + i * 1.1; pts.push(`${(Math.cos(a) * r * s).toFixed(1)},${(Math.sin(a) * r * s).toFixed(1)}`); }
  return <polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={7} strokeLinecap="round" transform={`rotate(${T * 90 + f * 50})`} />;
}
function Zigzag({ s = 1, c, T, f }) {
  const pts = []; for (let i = 0; i <= 8; i++) pts.push(`${(-80 + i * 20) * s},${(i % 2 ? -22 : 22) * s * (0.8 + 0.3 * Math.sin(T * 6 + f))}`);
  return <polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${f * 40})`} />;
}
function Destello({ s = 1, c = '#fff', T = 0, f = 0 }) {
  const k = s * (0.8 + 0.25 * Math.sin(T * 8 + f));
  return <path d={`M 0 ${-60 * k} Q ${8 * k} ${-8 * k} ${60 * k} 0 Q ${8 * k} ${8 * k} 0 ${60 * k} Q ${-8 * k} ${8 * k} ${-60 * k} 0 Q ${-8 * k} ${-8 * k} 0 ${-60 * k} Z`} fill={c} stroke={KC.ink} strokeWidth={3} />;
}
function Fosfenos({ x, y, rx = 240, ry = 200, T, p = 1, n = 16 }) {
  return <g transform={`translate(${x} ${y})`}>
    {FOSF.slice(0, n).map((e, i) => { const q = kprog(p, e.d * 0.6, e.d * 0.6 + 0.4, kEase.rebote);
      if (q <= 0.01) return null;
      const px = e.x * rx * 0.78 + Math.sin(T * 0.9 + e.f) * 10, py = e.y * ry * 0.72 + Math.cos(T * 0.8 + e.f) * 10;
      return <g key={i} transform={`translate(${px} ${py}) scale(${q * e.s})`} opacity={0.65 + 0.35 * Math.sin(T * 3 + e.f)}>
        {e.tipo === 0 ? <Espiral c={e.c} T={T} f={e.f} /> : e.tipo === 1 ? <Zigzag c={e.c} T={T} f={e.f} /> : e.tipo === 2 ? <Destello c={e.c} T={T} f={e.f} />
          : <circle r={36 + 10 * Math.sin(T * 4 + e.f)} fill="none" stroke={e.c} strokeWidth={8} strokeDasharray="14 10" />}
      </g>; })}
  </g>;
}
// Burbuja oscura de "lo que ves con los ojos cerrados", con su colita de puntos hacia la cabeza.
function BurbujaVision({ x, y, rx = 260, ry = 200, T, p = 1, cola = [0, 0], o = 1 }) {
  const e = kEase.rebote(kclamp(p, 0, 1));
  if (e <= 0.01) return null;
  return <g opacity={o}>
    {[0.25, 0.5, 0.75].map((f, i) => <circle key={i} cx={klerp(cola[0], x, f * 0.7)} cy={klerp(cola[1], y + ry, f * 0.9)} r={(8 + i * 8) * e} fill="#120a24" stroke={KC.ink} strokeWidth={5} />)}
    <g transform={`translate(${x} ${y}) scale(${e})`}>
      <ellipse rx={rx} ry={ry} fill="#120a24" stroke={KC.ink} strokeWidth={10} />
      <clipPath id="clipBurb"><ellipse rx={rx - 8} ry={ry - 8} /></clipPath>
      <g clipPath="url(#clipBurb)"><Fosfenos x={0} y={0} rx={rx} ry={ry} T={T} p={p} /></g>
    </g>
  </g>;
}

// ---------- cara de frente con los ojos cerrados; puños que tallan ----------
function CaraFrente({ x, y, s = 1, T = 0, manos = 0, frota = 0, gesto = 'normal', color = KC.cyan }) {
  const dx = frota * 14 * Math.cos(T * 13), dy = frota * 10 * Math.sin(T * 13);
  const Puno = ({ px, py, lado }) => <g transform={`translate(${px + dx * lado} ${py + dy}) `}>
    <path d={`M ${lado * 10} 40 L ${lado * 150} 470`} stroke={KC.ink} strokeWidth={104} strokeLinecap="round" />
    <path d={`M ${lado * 10} 40 L ${lado * 150} 470`} stroke={color} strokeWidth={86} strokeLinecap="round" />
    <rect x={-58} y={-52} width={116} height={112} rx={44} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {[-30, -2, 26].map((k) => <path key={k} d={`M ${k} -50 L ${k} -16`} stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />)}
    <rect x={lado > 0 ? 30 : -62} y={-10} width={32} height={50} rx={14} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 400 Q -230 250 -70 230 L 70 230 Q 230 250 230 400 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-48} y={150} width={96} height={110} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-178} cy={10} rx={34} ry={50} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={178} cy={10} rx={34} ry={50} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={0} rx={175} ry={205} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -178 -20 C -190 -190 -60 -235 20 -222 C 130 -210 196 -140 178 -20 C 150 -110 60 -150 -30 -140 C -100 -130 -150 -90 -178 -20 Z" fill={CPELO} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* ojos cerrados con pestañas */}
    {[-1, 1].map((k) => <g key={k} transform={`translate(${k * 72} 10)`}>
      <path d="M -40 0 Q 0 26 40 0" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
      {[-24, 0, 24].map((q) => <line key={q} x1={q} y1={14} x2={q * 1.2} y2={30} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />)}
      <path d={gesto === 'mueca' ? 'M -44 -40 L 40 -26' : 'M -40 -38 Q 0 -54 40 -38'} transform={gesto === 'mueca' ? `scale(${k} 1)` : ''} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    </g>)}
    <path d="M -6 30 Q -22 80 0 92" fill="none" stroke={CPIEL2} strokeWidth={7} strokeLinecap="round" />
    <path d={gesto === 'sonrie' ? 'M -55 125 Q 0 172 55 125' : gesto === 'mueca' ? 'M -45 140 Q 0 115 45 140' : 'M -40 132 Q 0 148 40 132'} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    {gesto === 'sonrie' && [-1, 1].map((k) => <ellipse key={k} cx={k * 110} cy={80} rx={30} ry={16} fill={KC.pink} opacity=".45" />)}
    {manos > 0.01 && <g opacity={manos} transform={`translate(0 ${(1 - manos) * 500})`}><Puno px={-78} py={10} lado={-1} /><Puno px={78} py={10} lado={1} /></g>}
  </g>;
}

// ---------- ojo en corte (de perfil, mirando a la derecha) ----------
function OjoSimple({ cx, cy, R = 250, T = 0, rayos = 0, brillo = 0, aplasta = 0, id = 'oj' }) {
  const Rr = R - 22, sx = 1 - 0.07 * aplasta;
  const arco = `M ${Rr * Math.cos(1.0)} ${-Rr * Math.sin(1.0)} A ${Rr} ${Rr} 0 1 0 ${Rr * Math.cos(1.0)} ${Rr * Math.sin(1.0)}`;
  return <g transform={`translate(${cx} ${cy}) scale(${sx} ${1 + 0.04 * aplasta})`}>
    <path d={`M ${0.74 * R} ${-0.64 * R} Q ${1.3 * R} 0 ${0.74 * R} ${0.64 * R}`} fill="rgba(210,245,255,.7)" stroke={KC.ink} strokeWidth={9} />
    <circle r={R} fill="#fffaf3" stroke={KC.ink} strokeWidth={11} />
    <circle r={R - 30} fill="rgba(175,228,255,.35)" />
    <path d={arco} fill="none" stroke={RETINA} strokeWidth={24} strokeLinecap="round" />
    {brillo > 0 && <path d={arco} fill="none" stroke={SENAL} strokeWidth={24} strokeLinecap="round" opacity={brillo} style={{ filter:`drop-shadow(0 0 ${18 * brillo}px ${SENAL})` }} />}
    {[-1, 1].map((sg) => <line key={sg} x1={0.8 * R} y1={sg * 0.17 * R} x2={0.8 * R} y2={sg * 0.6 * R} stroke={KC.teal} strokeWidth={20} strokeLinecap="round" />)}
    <ellipse cx={0.62 * R} cy={0} rx={0.14 * R} ry={0.33 * R} fill="rgba(255,236,190,.95)" stroke={KC.ink} strokeWidth={8} />
    {rayos > 0 && <g opacity={rayos}>{[-2, -1, 0, 1, 2].map((j) => { const pts = `${2.4 * R},${j * 0.14 * R} ${0.62 * R},${j * 0.09 * R} ${-Rr},${j * 0.02 * R}`;
      return <g key={j}><polyline points={pts} fill="none" stroke={KC.ink} strokeWidth={16} strokeLinejoin="round" opacity=".3" />
        <polyline points={pts} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="34 18" strokeDashoffset={T * 120} strokeLinejoin="round" /></g>; })}</g>}
  </g>;
}
// Nervio (curva) con pulsos eléctricos que viajan de (x0,y0) a (x1,y1).
function Nervio({ x0, y0, x1, y1, cxq, cyq, T, pulsos = 0, grosor = 70 }) {
  const d = `M ${x0} ${y0} Q ${cxq} ${cyq} ${x1} ${y1}`;
  const pt = (f) => [(1 - f) * (1 - f) * x0 + 2 * f * (1 - f) * cxq + f * f * x1, (1 - f) * (1 - f) * y0 + 2 * f * (1 - f) * cyq + f * f * y1];
  return <g>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={grosor + 18} strokeLinecap="round" />
    <path d={d} fill="none" stroke="#f4c99c" strokeWidth={grosor} strokeLinecap="round" />
    {pulsos > 0 && Array.from({ length: 5 }, (_, i) => { const f = (T * 0.9 + i / 5) % 1, [x, y] = pt(f);
      return <g key={i} transform={`translate(${x} ${y})`} opacity={pulsos * Math.min(1, f * 6, (1 - f) * 6)}>
        <circle r={grosor * 0.32} fill={SENAL} stroke={KC.ink} strokeWidth={5} style={{ filter:`drop-shadow(0 0 12px ${SENAL})` }} />
        <path d="M -6 -16 L 6 -2 L -3 2 L 7 16" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" /></g>; })}
  </g>;
}
// Dedo que empuja desde la derecha; p 0..1 = cuánto aprieta.
function Dedo({ x, y, p = 0, rot = -20 }) {
  const ent = 380 * (1 - p);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) translate(${ent} 0)`}>
    <rect x={0} y={-58} width={700} height={116} rx={58} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
    <rect x={14} y={-40} width={70} height={80} rx={22} fill="#ffe0d0" stroke={KC.ink} strokeWidth={6} />
    <path d="M 170 -58 Q 182 0 170 58 M 300 -58 Q 312 0 300 58" stroke={CPIEL2} strokeWidth={6} fill="none" />
  </g>;
}
// Interior de la Lupa: células de la retina (bastones y conos) que se encienden.
function CelulasRetina({ t, r, enc = 1 }) {
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#140a1c" />
    {Array.from({ length: 9 }, (_, i) => { const x = 30 + i * (r * 2 - 60) / 8, cono = i % 3 === 1, on = enc * (0.5 + 0.5 * Math.sin(t * 9 + i * 1.7));
      return <g key={i}>
        {cono ? <path d={`M ${x - 16} ${r - 10} L ${x} ${r - 80} L ${x + 16} ${r - 10} Z`} fill={on > 0.5 ? SENAL : '#c56b8a'} stroke={KC.ink} strokeWidth={4} />
          : <rect x={x - 11} y={r - 120} width={22} height={110} rx={10} fill={on > 0.5 ? SENAL : '#b45d7a'} stroke={KC.ink} strokeWidth={4} />}
        <circle cx={x} cy={r + 20} r={13} fill="#7a4a8a" stroke={KC.ink} strokeWidth={4} />
        <line x1={x} y1={r - 8} x2={x} y2={r + 8} stroke="#7a4a8a" strokeWidth={6} />
        {on > 0.6 && <path d={`M ${x - 6} ${r + 40} L ${x + 6} ${r + 58} L ${x - 4} ${r + 62} L ${x + 8} ${r + 82}`} stroke={SENAL} strokeWidth={5} fill="none" strokeLinecap="round" />}
      </g>; })}
  </svg>;
}
// Cerebro de perfil (mirando a la derecha). brillo 0..1 enciende la parte de atrás (donde llega la vista).
function CerebroSimple({ x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -220 20 C -260 -120 -150 -220 -20 -215 C 120 -215 230 -140 225 -20 C 222 60 170 110 90 105 C 40 140 -40 140 -90 115 C -170 120 -230 90 -220 20 Z" fill="#f7b7c8" stroke={KC.ink} strokeWidth={10} />
    {brillo > 0 && <ellipse cx={-170} cy={20} rx={80} ry={95} fill={SENAL} opacity={0.75 * brillo} style={{ filter:`blur(8px)` }} />}
    {['M -160 -60 Q -110 -120 -40 -90', 'M -30 -170 Q 0 -110 60 -140', 'M 80 -170 Q 110 -100 170 -90', 'M -120 40 Q -60 0 0 40', 'M 30 -40 Q 90 -60 140 0', 'M 40 70 Q 100 40 170 50', 'M -190 -20 Q -150 10 -170 60']
      .map((d, i) => <path key={i} d={d} fill="none" stroke="#c9718d" strokeWidth={9} strokeLinecap="round" />)}
    <path d="M 20 105 Q 30 170 0 230" fill="none" stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
    <path d="M 20 105 Q 30 170 0 230" fill="none" stroke="#f0a2b8" strokeWidth={30} strokeLinecap="round" />
  </g>;
}
// Estrella de 5 picos (caricatura).
function Estrella({ x, y, r = 34, c = KC.yellow, rot = 0 }) {
  const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <polygon points={pts} transform={`translate(${x} ${y}) rotate(${rot})`} fill={c} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />;
}
// Astronauta: casco con la cara adentro (ojos cerrados).
function Astronauta({ x, y, s = 1, T = 0, destello = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.6) * 4})`}>
    <rect x={-230} y={180} width={460} height={420} rx={120} fill="#e9edf3" stroke={KC.ink} strokeWidth={11} />
    <rect x={-110} y={260} width={220} height={120} rx={20} fill="#c8d0dc" stroke={KC.ink} strokeWidth={8} />
    {[KC.red, KC.cyan, KC.yellow].map((c, i) => <circle key={i} cx={-60 + i * 60} cy={320} r={18} fill={c} stroke={KC.ink} strokeWidth={5} />)}
    <circle r={250} fill="#e9edf3" stroke={KC.ink} strokeWidth={12} />
    <ellipse cx={0} cy={10} rx={200} ry={185} fill="#1a2440" stroke={KC.ink} strokeWidth={10} />
    <g transform="translate(0 30) scale(0.78)">
      <ellipse cx={0} cy={0} rx={175} ry={200} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <path d="M -175 -30 C -170 -180 -40 -225 30 -210 C 140 -195 185 -120 172 -30 C 120 -110 40 -130 -40 -122 C -110 -110 -150 -80 -175 -30 Z" fill={CPELO} />
      {[-1, 1].map((k) => <path key={k} d={`M ${k * 72 - 40} 10 Q ${k * 72} 36 ${k * 72 + 40} 10`} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />)}
      <path d="M -40 132 Q 0 146 40 132" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    </g>
    <path d="M -150 -100 Q -100 -160 -20 -168" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={16} strokeLinecap="round" />
    {destello > 0 && [-1, 1].map((k) => <g key={k} transform={`translate(${k * 56} 30)`} opacity={destello}><Destello s={0.9} c="#fff" T={T} f={k} /></g>)}
  </g>;
}
// Partículas del espacio que cruzan la pantalla en diagonal.
function Particulas({ T, p = 1, n = 6, seed = 3 }) {
  const g = krng(seed), L = Array.from({ length: n }, () => ({ y0: g() * 1400 + 300, v: 0.35 + g() * 0.25, f: g(), c: g() > 0.5 ? KC.cyan : KC.pink }));
  return <g opacity={p}>{L.map((q, i) => { const f = (T * q.v + q.f) % 1, x = -200 + f * 1500, y = q.y0 - f * 700;
    return <g key={i}><line x1={x - 220} y1={y + 103} x2={x} y2={y} stroke={q.c} strokeWidth={6} strokeLinecap="round" opacity=".55" />
      <circle cx={x} cy={y} r={11} fill="#fff" stroke={q.c} strokeWidth={5} style={{ filter:`drop-shadow(0 0 10px ${q.c})` }} /></g>; })}</g>;
}
// Carta para medir la vista (consultorio del oftalmólogo).
function CartaVista({ x, y, s = 1, p = 1 }) {
  const filas = [['E'], ['F', 'P'], ['T', 'O', 'Z'], ['L', 'P', 'E', 'D'], ['P', 'E', 'C', 'F', 'D']];
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <rect x={-180} y={-260} width={360} height={520} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    {filas.map((f, i) => { const tam = 120 - i * 22, yy = -150 + i * 92 + i * i * -4;
      return <text key={i} x={0} y={yy} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing: 6 }} fill={KC.ink}>{f.join(' ')}</text>; })}
  </g>;
}
// Ojo de frente, abierto (para la escena de los destellos).
function OjoFrenteA({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 Q 0 -260 300 0 Q 0 260 -300 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={12} />
    <circle cx={Math.sin(T * 0.7) * 18} cy={0} r={110} fill={KC.teal} stroke={KC.ink} strokeWidth={9} />
    <circle cx={Math.sin(T * 0.7) * 18} cy={0} r={50} fill={KC.ink} />
    <circle cx={Math.sin(T * 0.7) * 18 + 30} cy={-34} r={18} fill="#fff" />
    <path d="M -300 0 Q 0 -260 300 0" fill="none" stroke={KC.ink} strokeWidth={16} />
  </g>;
}

function Fosfenos52() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // ojo en corte de las escenas por dentro
  const OJ = { cx: 560, cy: 930, R: 240 };
  const aprieta = kprog(T, K.Presion + 0.6, K.Presion + 1.3, kEase.sale) * (1 - kprog(T, K.Cerebro - 0.6, K.Cerebro - 0.1));
  // zoom al ojo al final de la escena de la cara
  const zEntra = kprog(T, K.Retina - 0.9, K.Retina + 0.3, kEase.suave);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho y nombre: alguien se talla los ojos y aparecen luces de colores */}
      <Escena T={T} a={K.Gancho} b={K.Retina} zoom={0.02}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform={`translate(466 869) scale(${1 + zEntra * 2.2}) translate(-466 -869)`}>
            <CaraFrente x={400} y={860} s={0.92} T={T} manos={1 - kprog(T, K.Nombre + 2.2, K.Nombre + 2.8)} frota={T < K.Nombre + 2.2 ? 1 : 0} gesto={T < K.Nombre ? 'mueca' : 'normal'} />
          </g>
          <BurbujaVision x={340} y={470} rx={250} ry={165} T={T} p={kprog(T, K.Gancho + 0.25, K.Gancho + 1.6)} cola={[380, 650]} o={1 - zEntra} />
          <TextoSvg x={540} y={720} tam={92} color={KC.yellow} rot={-3} o={kprog(T, K.Gancho + 4.4, K.Gancho + 4.8) * (1 - kprog(T, K.Nombre - 0.3, K.Nombre))}
            s={klerp(0.5, 1, kprog(T, K.Gancho + 4.4, K.Gancho + 4.9, kEase.rebote))}>LAS FABRICA TU OJO</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Nombre + 0.2} until={K.Retina - 1} texto="fosfenos" x={800} y={560} tam={64} borde={KC.yellow} />
        <Chip T={T} at={K.Nombre + 2.2} until={K.Retina - 1} texto="los más comunes:" x={800} y={690} tam={36} borde={KC.pink} />
        <Chip T={T} at={K.Nombre + 2.5} until={K.Retina - 1} texto="apretando el ojo" x={800} y={775} tam={36} borde={KC.pink} />
      </Escena>

      {/* 2–3 · por dentro: la retina con luz, luego sin luz y con presión */}
      <Escena T={T} a={K.Retina} b={K.Cerebro} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={22} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Nervio x0={OJ.cx - OJ.R + 10} y0={OJ.cy} cxq={180} cyq={OJ.cy + 40} x1={-60} y1={OJ.cy - 60} T={T}
            pulsos={T < K.Presion ? kprog(T, K.Retina + 1.2, K.Retina + 1.8) * (1 - kprog(T, K.Presion - 0.6, K.Presion)) : kprog(T, K.Presion + 1.2, K.Presion + 1.8)} />
          <OjoSimple cx={OJ.cx} cy={OJ.cy} R={OJ.R} T={T} aplasta={aprieta}
            rayos={kprog(T, K.Retina + 0.2, K.Retina + 0.8) * (1 - kprog(T, K.Presion - 0.5, K.Presion))}
            brillo={T < K.Presion ? kprog(T, K.Retina + 0.8, K.Retina + 1.2) * (1 - kprog(T, K.Presion - 0.5, K.Presion)) : kprog(T, K.Presion + 1.0, K.Presion + 1.4) * (0.75 + 0.25 * Math.sin(T * 8))} />
          {T > K.Presion - 0.2 && <Dedo x={OJ.cx + OJ.R * 0.95} y={OJ.cy - OJ.R * 0.25} p={aprieta} rot={-12} />}
        </Lienzo>
        <Etq T={T} at={K.Retina + 0.6} until={K.Presion + 4.0} x={OJ.cx - OJ.R - 10} y={OJ.cy + 230} texto="retina" lado="izq" color={RETINA} />
        <Etq T={T} at={K.Retina + 1.6} until={K.Presion - 0.2} x={170} y={OJ.cy - 120} texto="al cerebro" lado="der" color={SENAL} />
        <Chip T={T} at={K.Retina + 1.0} until={K.Presion - 0.2} texto="luz → señales eléctricas" x={540} y={430} tam={44} borde={SENAL} />
        <Chip T={T} at={K.Presion + 0.1} until={K.Cerebro - 0.2} texto="sin luz" x={220} y={430} tam={50} borde={KC.cyan} />
        <Lupa T={T} at={K.Presion + 1.6} until={K.Cerebro - 0.3} x={760} y={450} r={160} fx={OJ.cx - OJ.R + 22} fy={OJ.cy} tinte={SENAL} etiqueta="AL MICROSCOPIO · RETINA"
          interior={(t, r) => <CelulasRetina t={t} r={r} enc={1} />} />
      </Escena>

      {/* 4 · el cerebro recibe la señal y la pinta como luz */}
      <Escena T={T} a={K.Cerebro} b={K.Pregunta} fondo={KC.noche}>
        <Ambiente T={T} n={22} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Nervio x0={830} y0={1020} cxq={600} cyq={1120} x1={320} y1={1020} T={T} grosor={44} pulsos={kprog(T, K.Cerebro + 0.4, K.Cerebro + 1)} />
          <CerebroSimple x={400} y={960} s={1.05} brillo={kprog(T, K.Cerebro + 1.4, K.Cerebro + 2.0) * (0.8 + 0.2 * Math.sin(T * 7))} />
          <OjoSimple cx={880} cy={1020} R={110} T={T} brillo={0.8 + 0.2 * Math.sin(T * 8)} />
          <BurbujaVision x={560} y={590} rx={340} ry={125} T={T} p={kprog(T, K.Cerebro + 2.2, K.Cerebro + 3.4)} cola={[260, 780]} />
        </Lienzo>
        <Etq T={T} at={K.Cerebro + 0.3} until={K.Pregunta - 0.2} x={880} y={1170} texto="ojo" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Cerebro + 0.6} until={K.Cerebro + 2.2} x={630} y={870} texto="cerebro" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Cerebro + 2.4} until={K.Pregunta - 0.1} texto="señal de la retina = luz" x={540} y={400} tam={40} borde={SENAL} />
      </Escena>

      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Golpe} color={KC.pink} />

      {/* 6 · un golpe en la cabeza: las estrellitas de las caricaturas */}
      <Escena T={T} a={K.Golpe} b={K.Astronautas} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {(() => { const golpe = K.Golpe + 0.55, tb = kprog(T, K.Golpe, golpe), sale = kprog(T, golpe, golpe + 0.8, kEase.sale);
            const bx = T < golpe ? klerp(1150, 520, tb) : klerp(520, 1250, sale), by = T < golpe ? klerp(420, 700, tb) : klerp(700, 250, sale) - Math.sin(sale * Math.PI) * 120;
            const sacude = T > golpe && T < golpe + 0.5 ? Math.sin(T * 60) * 10 * (1 - (T - golpe) / 0.5) : 0;
            return <g>
              <g transform={`translate(${sacude} 0)`}><CabezaPerfil x={360} y={930} s={1.3} gesto={T > golpe ? 'mueca' : 'normal'} /></g>
              {T > golpe && <g opacity={kprog(T, golpe, golpe + 0.3)}>{Array.from({ length: 6 }, (_, i) => { const a = T * 2.6 + i * Math.PI / 3;
                return <Estrella key={i} x={360 + Math.cos(a) * 250} y={650 + Math.sin(a) * 60} r={i % 2 ? 30 : 42} c={i % 3 === 1 ? KC.cyan : KC.yellow} rot={T * 120 + i * 20} />; })}</g>}
              <g transform={`translate(${bx} ${by}) rotate(${T * 400})`}><circle r={70} fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
                <path d="M -70 0 Q 0 -40 70 0 M 0 -70 Q 30 0 0 70" fill="none" stroke="#fff" strokeWidth={8} /></g>
              <Onomato T={T} at={golpe} dur={1.0} x={500} y={560} texto="¡PUM!" tam={140} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Golpe + 2.2} until={K.Astronautas - 0.1} texto="las estrellitas de las caricaturas" x={540} y={430} tam={40} borde={KC.yellow} />
      </Escena>

      {/* 7 · astronautas: destellos con los ojos cerrados */}
      <Escena T={T} a={K.Astronautas} b={K.Ojo} fondo="#05070f">
        <Lienzo>
          <EstrellasFondo T={T} n={90} />
          <circle cx={540} cy={2350} r={900} fill="#2f7df6" stroke="#9fd2ff" strokeWidth={14} />
          <path d="M 120 1640 Q 300 1520 470 1580 Q 560 1610 640 1540 L 700 1700 L 160 1760 Z" fill="#7bd36b" opacity=".85" />
          <Astronauta x={560} y={880} s={1.05} T={T} destello={T > K.Astronautas + 2.4 ? Math.max(0, Math.sin(T * 5)) : 0} />
          <Particulas T={T} p={kprog(T, K.Astronautas + 2.0, K.Astronautas + 2.6)} />
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Astronautas + 0.2} until={K.Astronautas + 2.4} anio="1969–1972" quien="astronautas de las misiones Apolo" revista="NASA (artículo de 2012)" x={540} y={760} />
        <Chip T={T} at={K.Astronautas + 2.6} until={K.Ojo - 0.1} texto="destellos con los ojos cerrados" x={540} y={430} tam={40} borde={KC.cyan} />
        <Etq T={T} at={K.Astronautas + 3.6} until={K.Ojo - 0.2} x={820} y={1190} texto="partículas del espacio" lado="izq" color={KC.cyan} />
      </Escena>

      {/* 8 · aviso: no te talles fuerte ni seguido */}
      <Escena T={T} a={K.Ojo} b={K.Destellos} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <CaraFrente x={320} y={900} s={0.85} T={T} manos={1} frota={1} gesto="mueca" color={KC.pink} />
          <g transform={`translate(320 560) scale(${klerp(0.3, 1.2, kprog(T, K.Ojo + 0.3, K.Ojo + 0.7, kEase.rebote))})`}><Alerta x={0} y={0} s={1} color={KC.orange} /></g>
          {T > K.Ojo + 1.2 && <g opacity={kprog(T, K.Ojo + 1.2, K.Ojo + 1.5)} transform="translate(320 900)">
            <line x1={-200} y1={-150} x2={200} y2={150} stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
            <line x1={-200} y1={-150} x2={200} y2={150} stroke={KC.red} strokeWidth={30} strokeLinecap="round" />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Ojo + 0.9} until={K.Destellos - 0.1} texto="ni fuerte ni seguido" x={540} y={430} tam={48} borde={KC.red} />
      </Escena>

      {/* 9 · señal de alarma: destellos sin tocarte + manchas nuevas → oftalmólogo */}
      <Escena T={T} a={K.Destellos} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const mueve = kprog(T, K.Destellos + 3.6, K.Destellos + 4.4, kEase.suave);
            return <g>
              <g transform={`translate(${klerp(540, 300, mueve)} ${klerp(820, 920, mueve)}) scale(${klerp(1, 0.62, mueve)})`}>
                <OjoFrenteA x={0} y={0} s={1.25} T={T} />
                {[[-260, -150, 0], [250, -120, 1.3], [-200, 170, 2.1]].map(([dx, dy, f], i) => { const on = T > K.Destellos + 0.5 && Math.sin(T * 6 + f * 3) > 0.2;
                  return on ? <g key={i} transform={`translate(${dx} ${dy})`}><path d="M -40 -50 L 10 -10 L -14 4 L 40 50" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" style={{ filter:'drop-shadow(0 0 14px #fff)' }} /></g> : null; })}
                {T > K.Destellos + 1.8 && [[-120, -40, 22], [60, 70, 16], [150, -60, 12], [-40, 110, 14]].map(([dx, dy, r], i) =>
                  <circle key={i} cx={dx + Math.sin(T * 0.9 + i) * 20} cy={dy + Math.cos(T * 0.7 + i) * 14} r={r * kprog(T, K.Destellos + 1.8 + i * 0.15, K.Destellos + 2.2 + i * 0.15)} fill="rgba(20,22,40,.75)" />)}
              </g>
              {mueve > 0 && <CartaVista x={790} y={920} s={0.95} p={kprog(T, K.Destellos + 4.0, K.Destellos + 4.6)} />}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Destellos + 0.5} until={K.Cierre - 0.1} texto="destellos sin tocarte" x={540} y={420} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Destellos + 1.9} until={K.Cierre - 0.1} texto="+ manchas nuevas" x={540} y={510} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Destellos + 4.2} until={K.Cierre - 0.1} texto="→ ve al oftalmólogo" x={540} y={600} tam={44} borde={KC.red} />
      </Escena>

      {/* 10 · cierre: la misma cara del inicio, ahora tranquila, y su ojo hablándole al cerebro */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <CaraFrente x={400} y={860} s={0.92} T={T} manos={0} gesto="sonrie" />
          {(() => { const p = kprog(T, K.Cierre + 0.8, K.Cierre + 1.6, kEase.sale);
            return <g opacity={p}>
              <path d="M 466 869 Q 560 760 490 720 Q 430 690 380 720" fill="none" stroke={SENAL} strokeWidth={12} strokeDasharray="22 14" strokeDashoffset={-T * 80} strokeLinecap="round" style={{ filter:`drop-shadow(0 0 10px ${SENAL})` }} />
              <circle cx={466} cy={869} r={18} fill={SENAL} stroke={KC.ink} strokeWidth={5} />
            </g>; })()}
          <BurbujaVision x={770} y={680} rx={250} ry={170} T={T} p={kprog(T, K.Cierre + 0.3, K.Cierre + 1.4)} cola={[560, 760]} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} texto="tu ojo hablando sin luz" x={540} y={420} tam={48} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Nombre - 0.1} texto="No vienen de afuera: *las fabrica tu ojo.*" />
      <Subtitulo T={T} idx={1} at={K.Nombre + 0.1} until={K.Retina - 0.1} texto="Se llaman *fosfenos.*" />
      <Subtitulo T={T} idx={2} at={K.Retina + 0.1} until={K.Presion - 0.1} texto="La retina: luz → *señales eléctricas.*" />
      <Subtitulo T={T} idx={3} at={K.Presion + 0.1} until={K.Cerebro - 0.1} texto="La presión *también la estimula.*" />
      <Subtitulo T={T} idx={4} at={K.Cerebro + 0.1} until={K.Pregunta - 0.1} texto="Tu cerebro lo *interpreta como luz.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Golpe - 0.1} texto="¿Hay *otras formas?*" />
      <Subtitulo T={T} idx={6} at={K.Golpe + 0.1} until={K.Astronautas - 0.1} texto="Un golpe: *las estrellitas.*" />
      <Subtitulo T={T} idx={7} at={K.Astronautas + 0.1} until={K.Ojo - 0.1} texto="Astronautas: *destellos con ojos cerrados.*" />
      <Subtitulo T={T} idx={8} at={K.Ojo + 0.1} until={K.Destellos - 0.1} texto="No te talles *fuerte ni seguido.*" />
      <Subtitulo T={T} idx={9} at={K.Destellos + 0.1} until={K.Cierre - 0.1} texto="Destellos + manchas: *oftalmólogo.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu ojo hablándole *a tu cerebro.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.Nombre + 0.5, K.Retina - 0.3, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Presion + 1.8, K.Cerebro - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cerebro + 2.0, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Golpe + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Golpe + 1.2, K.Astronautas - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Astronautas + 2.6, K.Ojo - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Ojo + 0.4, K.Destellos - 0.1, 'avatar_10_serio_molesto', 'grande'],
        [K.Destellos + 2.0, K.Cierre - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="52" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function FosfenosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Fosfenos52 /></CompositionStage></div>;
}
window.FosfenosApp = FosfenosApp;
