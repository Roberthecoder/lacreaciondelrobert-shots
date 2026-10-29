// Shot IA #27 · La IA que le devolvió la voz a Ann — NARRADO (N1 "Por dentro" + N3 medidor de palabras por minuto).
// Datos: Metzger et al., Nature 620:1037 (2023, UCSF) · Willett et al., Nature 620:1031 (2023, Stanford) · Card et al., NEJM 391:609 (2024, UC Davis).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const PIEL = '#f2c39b', PELO_ANN = '#6b3b1f', AZUL = '#2f6dff';

// Cara del avatar (esquemática). habla 0..1 = qué tanto abre la boca; sonrie 0..1.
function CaraAvatar({ x, y, s = 1, T = 0, habla = 0, sonrie = 0.3 }) {
  const parp = (T % 3.7) < 0.12, ab = habla * (0.35 + 0.65 * Math.abs(Math.sin(T * 11) * Math.sin(T * 4.3 + 1)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -40 Q -170 140 -120 190 L 120 190 Q 170 140 150 -40 Z" fill={PELO_ANN} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={10} rx={120} ry={150} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -128 -30 Q -110 -170 0 -160 Q 120 -170 130 -30 Q 70 -110 -20 -90 Q -90 -80 -128 -30 Z" fill={PELO_ANN} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {parp ? <><line x1={-62} y1={-5} x2={-28} y2={-5} stroke={KC.ink} strokeWidth={7} /><line x1={28} y1={-5} x2={62} y2={-5} stroke={KC.ink} strokeWidth={7} /></>
      : <><ellipse cx={-45} cy={-5} rx={14} ry={18} fill={KC.ink} /><ellipse cx={45} cy={-5} rx={14} ry={18} fill={KC.ink} /><circle cx={-40} cy={-11} r={5} fill="#fff" /><circle cx={50} cy={-11} r={5} fill="#fff" /></>}
    <path d={`M -70 -42 Q -45 ${-56 - habla * 6} -20 -44`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M 20 -44 Q 45 ${-56 - habla * 6} 70 -42`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 0 10 Q -12 45 6 50" stroke="rgba(0,0,0,.45)" strokeWidth={5} fill="none" strokeLinecap="round" />
    <circle cx={-78} cy={40} r={18} fill={KC.pink} opacity=".25" /><circle cx={78} cy={40} r={18} fill={KC.pink} opacity=".25" />
    <path d={`M -38 ${82 - sonrie * 6} Q 0 ${92 + sonrie * 14 + ab * 34} 38 ${82 - sonrie * 6} Q 0 ${86 + ab * 6} -38 ${82 - sonrie * 6} Z`} fill="#8a1f2b" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Monitor con el avatar. onda 0..1 = onda de voz en la parte baja; globo = texto del globo de diálogo.
function Monitor({ x, y, s = 1, T = 0, habla = 0, onda = 0, sonrie = 0.3, globo = null, encendido = 1 }) {
  const pts = Array.from({ length: 41 }, (_, i) => { const xx = -220 + i * 11; const a = onda * (0.3 + 0.7 * Math.abs(Math.sin(i * 0.7 + T * 9))) * 34 * Math.sin(Math.PI * i / 40); return `${xx},${(i % 2 ? -a : a).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={200} width={100} height={90} fill="#3a3f4d" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={280} width={300} height={36} rx={14} fill="#3a3f4d" stroke={KC.ink} strokeWidth={8} />
    <rect x={-280} y={-230} width={560} height={440} rx={34} fill="#2b3445" stroke={KC.ink} strokeWidth={10} />
    <clipPath id={`mon-${x}-${y}`}><rect x={-250} y={-200} width={500} height={380} rx={18} /></clipPath>
    <g clipPath={`url(#mon-${x}-${y})`}>
      <rect x={-250} y={-200} width={500} height={380} fill={mixHex('#0d1424', '#7fe3ff', 0.85 * encendido)} />
      <g opacity={encendido}><CaraAvatar x={0} y={30} s={0.95} T={T} habla={habla} sonrie={sonrie} /></g>
      {onda > 0 && <g transform="translate(0 150)"><rect x={-240} y={-36} width={480} height={72} rx={14} fill="rgba(13,20,36,.75)" /><polyline points={pts} fill="none" stroke={KC.yellow} strokeWidth={6} strokeLinejoin="round" /></g>}
      <rect x={-250} y={-200 + ((T * 140) % 380)} width={500} height={5} fill="#fff" opacity=".15" />
    </g>
    {globo && <g transform="translate(150 -300)">
      <path d="M -150 -70 H 150 Q 180 -70 180 -40 V 30 Q 180 60 150 60 H -40 L -90 110 L -80 60 H -150 Q -180 60 -180 30 V -40 Q -180 -70 -150 -70 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <text x={0} y={14} textAnchor="middle" style={{ font:`900 52px ${KF.texto}` }} fill={KC.ink}>{globo}</text>
    </g>}
  </g>;
}
// Persona esquemática en silla de ruedas, con conector dorado en la cabeza (puerto).
function Persona({ x, y, s = 1, T = 0, pelo = PELO_ANN, corto = false, puerto = true, camisa = KC.lilac, cara = 'neutra' }) {
  const b = Math.sin(T * 1.6 + x) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-20} cy={190} r={110} fill="none" stroke={KC.ink} strokeWidth={14} /><circle cx={-20} cy={190} r={110} fill="none" stroke="#9aa3b5" strokeWidth={6} />
    {[0, 45, 90, 135].map((a) => <line key={a} x1={-20} y1={190} x2={-20 + 110 * Math.cos(a * Math.PI / 180)} y2={190 + 110 * Math.sin(a * Math.PI / 180)} stroke="#9aa3b5" strokeWidth={4} transform={`rotate(${a} -20 190) translate(0 0)`} />)}
    <path d="M -120 20 L -120 140 L 110 140" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g transform={`translate(0 ${b})`}>
      <path d="M -95 130 Q -100 -10 0 -20 Q 100 -10 95 130 Z" fill={camisa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {!corto && <path d="M -78 -60 Q -95 40 -60 70 L 60 70 Q 95 40 78 -60 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />}
      <ellipse cx={0} cy={-90} rx={70} ry={82} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
      <path d={corto ? 'M -70 -100 Q -66 -178 0 -176 Q 66 -178 70 -100 Q 40 -140 -10 -134 Q -50 -132 -70 -100 Z' : 'M -74 -90 Q -70 -182 0 -178 Q 72 -182 76 -90 Q 40 -150 -10 -138 Q -54 -128 -74 -90 Z'} fill={pelo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-26} cy={-92} r={8} fill={KC.ink} /><circle cx={26} cy={-92} r={8} fill={KC.ink} />
      {cara === 'neutra' && <line x1={-18} y1={-46} x2={18} y2={-46} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
      {cara === 'feliz' && <path d="M -26 -52 Q 0 -26 26 -52" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {puerto && <g transform="translate(36 -168)"><rect x={-20} y={-24} width={40} height={30} rx={6} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={-10} r={6} fill={KC.ink} /></g>}
    </g>
  </g>;
}
// Cable del puerto al monitor con pulsos que viajan.
function Cable({ x1, y1, x2, y2, T, p = 1, curva = -160, color = KC.yellow }) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + curva, d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const pt = (u) => [(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2];
  return <g opacity={p}>
    <path d={d} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" /><path d={d} stroke="#4a5266" strokeWidth={8} fill="none" strokeLinecap="round" />
    {[0, 0.33, 0.66].map((k) => { const [px, py] = pt((T * 0.6 + k) % 1); return <circle key={k} cx={px} cy={py} r={11} fill={color} stroke={KC.ink} strokeWidth={4} />; })}
  </g>;
}
// Cerebro de perfil (esquemático) con circunvoluciones. lamina 0..1 = aparece la lámina de electrodos sobre la zona del habla.
function Cerebro({ x, y, s = 1, T = 0, lamina = 0, brilla = 0, oscuro = false }) {
  const gir = ['M -200 -40 Q -150 -110 -60 -80 Q 0 -150 80 -100', 'M -230 40 Q -160 -10 -90 30 Q -20 -30 60 10 Q 130 -60 210 -10', 'M -180 110 Q -110 70 -40 110 Q 40 60 120 90',
    'M -120 -150 Q -60 -120 -20 -170', 'M 40 -170 Q 100 -130 160 -150', 'M 150 -60 Q 200 -30 240 40', 'M -60 160 Q 20 140 80 170'];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -250 30 Q -270 -120 -140 -190 Q 0 -260 150 -190 Q 280 -120 260 20 Q 250 110 170 150 Q 160 210 90 200 Q 20 230 -60 200 Q -200 200 -240 120 Q -262 80 -250 30 Z"
      fill={oscuro ? '#3a1f3f' : '#ffb3c7'} stroke={oscuro ? KC.pink : KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 90 200 Q 120 240 110 300" stroke={oscuro ? KC.pink : KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 90 200 Q 120 240 110 300" stroke={oscuro ? '#3a1f3f' : '#ffb3c7'} strokeWidth={10} fill="none" strokeLinecap="round" />
    {gir.map((d, i) => <path key={i} d={d} stroke={oscuro ? 'rgba(255,45,120,.55)' : 'rgba(150,40,80,.55)'} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    {brilla > 0 && <ellipse cx={-110} cy={50} rx={95} ry={70} fill={KC.yellow} opacity={brilla * (0.35 + 0.25 * Math.sin(T * 8))} />}
    {lamina > 0 && <g transform={`translate(-110 50) rotate(-12) scale(${klerp(1.6, 1, kEase.sale(lamina))})`} opacity={Math.min(1, lamina * 2)}>
      <rect x={-92} y={-58} width={184} height={116} rx={12} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 6 * 10 }, (_, i) => <circle key={i} cx={-78 + (i % 10) * 17.3} cy={-44 + Math.floor(i / 10) * 17.6} r={4.5} fill={KC.gold} stroke={KC.ink} strokeWidth={1.5} />)}
      <path d="M 92 0 Q 160 10 190 -60" stroke={KC.ink} strokeWidth={10} fill="none" />
    </g>}
  </g>;
}
// Lámina grande: 23 × 11 = 253 electrodos que se encienden uno por uno.
function LaminaGrande({ x, y, n, T }) {
  const out = [];
  for (let i = 0; i < 253; i++) { const c = i % 23, r = Math.floor(i / 23), on = i < n;
    out.push(<circle key={i} cx={x + 34 + c * 36} cy={y + 34 + r * 36} r={12} fill={on ? KC.gold : '#d9d2c4'} stroke={KC.ink} strokeWidth={3} />); }
  return <g>
    <rect x={x + 6} y={y + 6} width={36 * 23 + 32} height={36 * 11 + 32} rx={22} fill={KC.ink} />
    <rect x={x} y={y} width={36 * 23 + 32} height={36 * 11 + 32} rx={22} fill="#fbf7ee" stroke={KC.ink} strokeWidth={7} />
    {out}
  </g>;
}
// Íconos esquemáticos de la boca.
function Labios({ x, y, s = 1, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={84} fill={on ? '#ffe3ea' : '#2a2f3d'} stroke={on ? KC.yellow : '#596178'} strokeWidth={7} />
    <path d="M -54 0 Q -30 -34 0 -16 Q 30 -34 54 0 Q 30 34 0 30 Q -30 34 -54 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><path d="M -50 0 Q 0 10 50 0" stroke={KC.ink} strokeWidth={5} fill="none" /></g>;
}
function Lengua({ x, y, s = 1, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={84} fill={on ? '#ffe3ea' : '#2a2f3d'} stroke={on ? KC.yellow : '#596178'} strokeWidth={7} />
    <path d="M -40 -40 L 40 -40 L 40 10 Q 40 56 0 56 Q -40 56 -40 10 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" /><line x1={0} y1={-30} x2={0} y2={30} stroke={KC.ink} strokeWidth={5} /></g>;
}
function Mandibula({ x, y, s = 1, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={84} fill={on ? '#ffe3ea' : '#2a2f3d'} stroke={on ? KC.yellow : '#596178'} strokeWidth={7} />
    <path d="M -56 -40 L -50 10 Q -40 50 0 54 Q 40 50 50 10 L 56 -40 L 36 -40 L 32 6 Q 24 30 0 32 Q -24 30 -32 6 L -36 -40 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-20, -7, 7, 20].map((tx) => <rect key={tx} x={tx - 5} y={14} width={10} height={14} rx={3} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}</g>;
}
// Chispa (orden del cerebro) que viaja por una curva; se detiene en `tope` (0..1) si hay barrera.
function Chispas({ T, x1, y1, x2, y2, curva = 0, tope = 1, n = 3, color = KC.yellow, vel = 0.7, desde = 0 }) {
  const mx = (x1 + x2) / 2 + curva, my = (y1 + y2) / 2;
  const pt = (u) => [(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2];
  return <g>
    <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} stroke={color} strokeOpacity=".25" strokeWidth={6} strokeDasharray="12 12" fill="none" />
    {Array.from({ length: n }, (_, k) => { if (T < desde) return null; const u = ((T - desde) * vel + k / n) % 1, uu = Math.min(u, tope), [px, py] = pt(uu), f = u > tope ? Math.max(0, 1 - (u - tope) * 6) : 1;
      return <g key={k} opacity={f}><circle cx={px} cy={py} r={16} fill={color} opacity=".35" /><circle cx={px} cy={py} r={9} fill="#fff" /></g>; })}
  </g>;
}
// Velocímetro de palabras por minuto (0–180).
function Velocimetro({ T, x, y, r = 300, valor, o = 1 }) {
  const ang = (v) => Math.PI * (1 - v / 180), P = (v, rr) => [x + rr * Math.cos(ang(v)), y - rr * Math.sin(ang(v))];
  const arco = (a, b, col) => { const [x1, y1] = P(a, r), [x2, y2] = P(b, r); return <path d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`} stroke={col} strokeWidth={46} fill="none" />; };
  const [nx, ny] = P(valor, r - 60);
  return <g opacity={o}>
    <path d={`M ${x - r - 40} ${y + 30} A ${r + 40} ${r + 40} 0 0 1 ${x + r + 40} ${y + 30} Z`} fill="#fbf7ee" stroke={KC.ink} strokeWidth={9} />
    {arco(0, 40, KC.red)}{arco(40, 100, KC.yellow)}{arco(100, 180, KC.mint)}
    <path d={`M ${P(0, r + 23)[0]} ${P(0, r + 23)[1]} A ${r + 23} ${r + 23} 0 0 1 ${P(180, r + 23)[0]} ${P(180, r + 23)[1]}`} stroke={KC.ink} strokeWidth={6} fill="none" />
    {Array.from({ length: 10 }, (_, i) => { const v = i * 20, [a1, b1] = P(v, r - 30), [a2, b2] = P(v, r - 60), [tx, ty] = P(v, r - 95);
      return <g key={i}><line x1={a1} y1={b1} x2={a2} y2={b2} stroke={KC.ink} strokeWidth={6} /><text x={tx} y={ty + 12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>; })}
    <line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" /><line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />
    <circle cx={x} cy={y} r={30} fill={KC.ink} /><circle cx={x} cy={y} r={14} fill={KC.gold} />
    <text x={x} y={y - 120} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{Math.round(valor)}</text>
    <text x={x} y={y + 80} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>palabras por minuto</text>
  </g>;
}
// Tele vieja con un video de boda (esquemático: velo y saco), con estática.
function TeleVieja({ x, y, s = 1, T = 0 }) {
  const r = krng(Math.floor(T * 12));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-40} y1={-200} x2={-120} y2={-300} stroke={KC.ink} strokeWidth={8} /><line x1={40} y1={-200} x2={120} y2={-300} stroke={KC.ink} strokeWidth={8} />
    <rect x={-260} y={-200} width={520} height={380} rx={40} fill="#a0643a" stroke={KC.ink} strokeWidth={10} />
    <rect x={-230} y={-170} width={370} height={300} rx={50} fill="#f6e7c8" stroke={KC.ink} strokeWidth={8} />
    <circle cx={200} cy={-100} r={22} fill="#d9b07a" stroke={KC.ink} strokeWidth={6} /><circle cx={200} cy={-30} r={22} fill="#d9b07a" stroke={KC.ink} strokeWidth={6} />
    {[30, 60, 90].map((yy) => <line key={yy} x1={176} y1={yy} x2={224} y2={yy} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-140} y={180} width={40} height={40} fill={KC.ink} /><rect x={100} y={180} width={40} height={40} fill={KC.ink} />
    <g transform="translate(-45 -20)">
      <path d="M -80 -60 Q -120 60 -130 120 L 0 120 Q -10 40 -40 -60 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} opacity=".9" />
      <circle cx={-60} cy={-50} r={34} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
      <path d="M -94 -60 Q -60 -100 -26 -60 Q -10 20 -20 60" stroke="#fff" strokeWidth={10} fill="none" opacity=".85" />
      <path d="M 30 -10 L 20 120 L 110 120 L 100 -10 Q 65 -30 30 -10 Z" fill="#2b2b33" stroke={KC.ink} strokeWidth={5} />
      <circle cx={65} cy={-40} r={32} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
      <path d="M -40 -80 Q 0 -110 40 -80" stroke={KC.pink} strokeWidth={6} fill="none" />
      <text x={-130} y={-90} style={{ font:`700 26px ${KF.mono}` }} fill={KC.red}>● REC</text>
    </g>
    {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-230 + r() * 340} y={-170 + r() * 290} width={20 + r() * 40} height={3} fill="#000" opacity=".25" />)}
  </g>;
}
// Onda de voz que viaja de A a B (p 0..1).
function OndaViaja({ T, x1, y1, x2, y2, p, color = KC.yellow }) {
  if (p <= 0) return null;
  const n = 60, pts = [];
  for (let i = 0; i <= n; i++) { const u = (i / n) * p, xx = klerp(x1, x2, u), yy = klerp(y1, y2, u) - Math.sin(Math.PI * u) * 120;
    const a = 26 * Math.sin(i * 1.3 + T * 14) * Math.sin(Math.PI * i / n); pts.push(`${xx.toFixed(1)},${(yy + a).toFixed(1)}`); }
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" style={{ filter:`drop-shadow(0 0 10px ${color})` }} />;
}
// Barras de palabras por minuto (máximo 160).
function BarrasPPM({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.1, kEase.sale);
      return <div key={i} style={{ marginBottom:22, opacity: kprog(T, a0, a0 + 0.25) }}>
        <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 700 * f.valor / 160 * g), height:70, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 66px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{f.pre || ''}{Math.round(f.valor * g)}</div>
        </div>
      </div>; })}
  </div>;
}
// 100 palabras: verdes las acertadas, rojas las falladas.
function CienPalabras({ T, x, y, verdes, rojas = 0 }) {
  const out = [];
  for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), v = i < verdes, ro = i >= 97 && i < 97 + rojas;
    out.push(<g key={i} transform={`translate(${x + c * 60} ${y + r * 60})`}>
      <rect width={50} height={50} rx={10} fill={v ? KC.mint : ro ? KC.red : 'rgba(255,255,255,.55)'} stroke={KC.ink} strokeWidth={4} />
      {v && <path d="M 13 26 L 22 35 L 38 16" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {ro && <path d="M 16 16 L 34 34 M 34 16 L 16 34" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />}
    </g>); }
  return <g>{out}</g>;
}
// Cara feliz con lágrima de alegría.
function CaraLagrima({ x, y, s = 1, T = 0 }) {
  const u = (T * 0.8) % 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={110} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -40 Q -90 -130 0 -120 Q 90 -130 100 -40 Q 60 -80 0 -80 Q -60 -80 -100 -40 Z" fill="#4a3424" stroke={KC.ink} strokeWidth={6} />
    <path d="M -55 -10 Q -38 -26 -21 -10" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 21 -10 Q 38 -26 55 -10" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -50 30 Q 0 85 50 30 Z" fill="#8a1f2b" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -42 ${2 + u * 90} q -12 18 0 26 q 12 -8 0 -26 Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} opacity={1 - u * 0.6} />
  </g>;
}
// Cita en tarjeta.
function Cita({ T, at, until, texto, quien, y = 1000 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:90, right:90, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'20px 34px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ font:`900 50px/1.15 ${KF.texto}`, color:KC.ink }}>{texto}</div>
    <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:10 }}>{quien}</div>
  </div>;
}
// Sello "EN INVESTIGACIÓN".
function Sello({ x, y, p, texto, color = KC.red }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(-8) scale(${klerp(2, 1, kEase.sale(p))})`} opacity={Math.min(1, p * 2)}>
    <rect x={-330} y={-62} width={660} height={124} rx={18} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={10} />
    <text y={26} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}

function VozDevuelta() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, I: CUES.Implante, O: CUES.Ordenes, IA: CUES.IA, R: CUES.Rapidez, P: CUES.Pregunta, B: CUES.Boda, E: CUES.Estudio, L: CUES.Lagrimas, Oj: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const habla0 = kprog(T, K.G + 0.1, K.G + 0.5);
  const electrodos = Math.round(253 * kprog(T, K.I + 1.2, K.I + 4.0, kEase.suave));
  const vel = T < K.R + 2.6 ? 14 * kprog(T, K.R + 0.4, K.R + 1.4, kEase.sale) : klerp(14, 78, kprog(T, K.R + 2.6, K.R + 3.8, kEase.rebote));
  const verdes = Math.round(97 * kprog(T, K.L + 0.8, K.L + 3.2, kEase.suave)), rojas = T > K.L + 3.3 ? 3 : 0;
  const ESplit = K.E + 5.8;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cara en la pantalla la mueve el cerebro de Ann */}
      <Escena T={T} a={K.G} b={K.I}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cable x1={836} y1={872} x2={470} y2={1000} T={T} curva={-150} />
          <Monitor x={330} y={760} s={0.92} T={T} habla={habla0} encendido={kprog(T, 0, 0.3)} />
          <Persona x={820} y={1050} s={0.95} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 3.0} until={K.I - 0.2} texto="Ann · infarto cerebral (2005)" x={540} y={1450} tam={36} borde={KC.ink} />
      {/* 2 · la lámina de 253 electrodos */}
      <Escena T={T} a={K.I} b={K.O}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Cerebro x={540} y={620} s={1.25} T={T} lamina={kprog(T, K.I + 0.3, K.I + 1.0)} />
          <g opacity={kprog(T, K.I + 1.0, K.I + 1.4)}><LaminaGrande x={115} y={900} n={electrodos} T={T} /></g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.I + 1.2} until={K.O - 0.2} valor={253} dur={2.8} etiqueta="" x={540} y={1440} tam={110} color={KC.gold} sufijo=" electrodos" />
      <Etq T={T} at={K.I + 0.8} until={K.O - 0.3} x={600} y={420} texto="zona del habla" />
      {/* 3 · las órdenes a la boca (por dentro, fondo oscuro) */}
      <Escena T={T} a={K.O} b={K.IA}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(255,45,120,.25)" />
        {svg(<>
          <Cerebro x={330} y={560} s={0.9} T={T} oscuro brilla={kprog(T, K.O + 0.3, K.O + 0.8)} />
          {[[230, 1010], [540, 1010], [850, 1010]].map(([tx, ty], i) => <Chispas key={i} T={T} x1={230} y1={610} x2={tx} y2={ty - 90} curva={i * 60} tope={0.62} n={3} vel={0.55} desde={K.O + 0.6 + i * 0.25} />)}
          <g opacity={kprog(T, K.O + 2.2, K.O + 2.6)}>
            <rect x={110} y={820} width={860} height={26} rx={13} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            {[0, 1, 2, 3, 4, 5, 6].map((k) => <line key={k} x1={150 + k * 120} y1={820} x2={180 + k * 120} y2={846} stroke={KC.ink} strokeWidth={6} />)}
          </g>
          <Labios x={230} y={1010} s={0.95} /><Lengua x={540} y={1010} s={0.95} /><Mandibula x={850} y={1010} s={0.95} />
        </>)}
      </Escena>
      <Etq T={T} at={K.O + 2.4} until={K.IA - 0.2} x={560} y={790} texto="el infarto corta el camino" color={KC.coral} tam={30} />
      <Chip T={T} at={K.O + 1.2} until={K.IA - 0.2} texto="labios · lengua · mandíbula" x={540} y={1140} tam={34} borde={KC.pink} />
      {/* 4 · la IA traduce */}
      <Escena T={T} a={K.IA} b={K.R}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={170} y={470} ancho={740} alto={460} onda={(T - K.IA) * 0.45 % 1} />
        {svg(<Chispas T={T} x1={40} y1={700} x2={170} y2={700} n={3} vel={1.2} />)}
      </Escena>
      <Chip T={T} at={K.IA + 1.2} until={K.R - 0.2} texto="texto" x={230} y={1070} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.IA + 1.6} until={K.R - 0.2} texto="voz" x={540} y={1070} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.IA + 2.0} until={K.R - 0.2} texto="gestos" x={850} y={1070} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.IA + 0.3} until={K.R - 0.2} texto="inteligencia artificial" x={540} y={410} tam={36} borde={KC.cyan} mono />
      {/* 5 · rapidez: velocímetro */}
      <Escena T={T} a={K.R} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<Velocimetro T={T} x={540} y={1000} r={330} valor={vel} />)}
      </Escena>
      <Chip T={T} at={K.R + 0.6} until={K.R + 2.5} texto="su aparato para escribir: 14" x={540} y={1150} tam={36} borde={KC.red} />
      <Chip T={T} at={K.R + 2.7} until={K.P - 0.2} texto="implante + IA: unas 78" x={540} y={1150} tam={40} borde={KC.leaf} />
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      {/* 7 · la boda */}
      <Escena T={T} a={K.B} b={K.E}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <TeleVieja x={330} y={600} s={0.9} T={T} />
          <OndaViaja T={T} x1={430} y1={640} x2={760} y2={980} p={kprog(T, K.B + 0.6, K.B + 1.8, kEase.sale)} />
          <g opacity={kprog(T, K.B + 1.0, K.B + 1.4)}><Monitor x={790} y={1000} s={0.55} T={T} habla={kprog(T, K.B + 1.8, K.B + 2.0)} onda={kprog(T, K.B + 1.8, K.B + 2.2)} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.B + 0.4} until={K.E - 0.2} texto="un video de su boda" x={330} y={330} tam={36} borde={KC.ink} />
      <Cita T={T} at={K.B + 2.2} until={K.E - 0.2} y={1470} texto="«Es como oír a una vieja amiga.»" quien="Ann, al oír su voz sintetizada (UCSF, 2023)" />
      {/* 8 · el estudio: el mismo día, Stanford */}
      <Escena T={T} a={K.E} b={K.L}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2023" quien="Stanford y UCSF · el mismo día" revista="Willett et al. y Metzger et al. · Nature · 23 ago 2023" y={760} />
      <BarrasPPM T={T} at={K.E + 3.0} until={K.L - 0.2} top={680} filas={[
        { valor: 78, etiqueta: 'Ann (UCSF) · tras un infarto', color: KC.pink },
        { valor: 62, etiqueta: 'Pat (Stanford) · con ELA', color: KC.yellow, at: K.E + 3.6 },
        { valor: 160, pre: '≈', etiqueta: 'una plática normal', color: KC.mint, at: ESplit + 0.2 }]} />
      <Chip T={T} at={K.E + 3.2} until={K.L - 0.2} texto="palabras por minuto" x={540} y={600} tam={34} borde={KC.ink} />
      {/* 9 · Casey: 97 de 100, lágrimas de alegría */}
      <Escena T={T} a={K.L} b={K.Oj}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <CienPalabras T={T} x={70} y={560} verdes={verdes} rojas={rojas} />
          <g opacity={kprog(T, K.L + 3.6, K.L + 4.0)}><CaraLagrima x={860} y={1000} s={0.85} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.L + 0.3} until={K.Oj - 0.2} texto="2024 · UC Davis · NEJM" x={390} y={470} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.L + 0.9} until={K.Oj - 0.2} valor={verdes} dur={0.01} etiqueta="" x={860} y={720} tam={130} color={KC.mint} sufijo="/100" />
      <Chip T={T} at={K.L + 3.8} until={K.Oj - 0.2} texto="lloró de alegría" x={860} y={1170} tam={32} borde={KC.cyan} />
      {/* 10 · ojo: una sola persona por estudio */}
      <Escena T={T} a={K.Oj} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {[[200, PELO_ANN, false, KC.lilac], [540, '#c9c3bb', false, KC.cyan], [880, '#4a3424', true, KC.orange]].map(([px, pel, cor, cam], i) =>
            <g key={i} opacity={kprog(T, K.Oj + 0.2 + i * 0.3, K.Oj + 0.5 + i * 0.3)}><Persona x={px} y={850} s={0.62} T={T} pelo={pel} corto={cor} camisa={cam} /></g>)}
          <Sello x={540} y={1110} p={kprog(T, K.Oj + 2.4, K.Oj + 2.8)} texto="EN INVESTIGACIÓN" />
        </>)}
      </Escena>
      {[['Ann', 200], ['Pat', 540], ['Casey', 880]].map(([n, px], i) => <Chip key={n} T={T} at={K.Oj + 0.4 + i * 0.3} until={K.C - 0.2} texto={`${n} · 1 persona`} x={px} y={1000} tam={28} borde={KC.ink} />)}
      <Chip T={T} at={K.Oj + 3.0} until={K.C - 0.2} texto="todavía no se puede pedir" x={540} y={1450} tam={36} borde={KC.red} />
      {/* 11 · cierre: la misma cara, ya con su voz */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cable x1={836} y1={872} x2={470} y2={1000} T={T} curva={-150} />
          <Monitor x={330} y={760} s={0.92} T={T} habla={1} sonrie={0.8} onda={1} globo={T > K.C + 1.2 ? '¡Hola!' : null} />
          <Persona x={820} y={1050} s={0.95} T={T} cara="feliz" />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="el implante se retiró en 2024" x={540} y={1450} tam={32} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.I - 0.1} texto="Esa cara *la mueve su cerebro.*" />
      <Subtitulo T={T} idx={1} at={K.I + 0.1} until={K.O - 0.1} texto="Una lámina con *253 electrodos.*" />
      <Subtitulo T={T} idx={2} at={K.O + 0.1} until={K.IA - 0.1} texto="Su cerebro aún mandaba *órdenes.*" />
      <Subtitulo T={T} idx={3} at={K.IA + 0.1} until={K.R - 0.1} texto="La IA: *palabras, voz y gestos.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="*78 por minuto.* Antes, 14." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.B - 0.1} texto="¿De dónde sacaron *su voz?*" />
      <Subtitulo T={T} idx={6} at={K.B + 0.1} until={K.E - 0.1} texto="De *un video de su boda.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={ESplit} texto="Stanford: *Pat, 62 por minuto.*" />
      <Subtitulo T={T} idx={8} at={ESplit + 0.1} until={K.L - 0.1} texto="Una plática normal: *unas 160.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.Oj - 0.1} texto="Casey: *97 de cada 100.*" />
      <Subtitulo T={T} idx={10} at={K.Oj + 0.1} until={K.C - 0.1} texto="*Una sola persona* por estudio." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Con una voz *que sonaba a ella.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Ordenes + 1.0, CUES.IA - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Rapidez + 2.9, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Boda + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 5.9, CUES.Lagrimas - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Lagrimas + 3.6, CUES.Ojo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Ojo + 0.5, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="27" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VozDevueltaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VozDevuelta /></CompositionStage></div>;
}
window.VozDevueltaApp = VozDevueltaApp;
