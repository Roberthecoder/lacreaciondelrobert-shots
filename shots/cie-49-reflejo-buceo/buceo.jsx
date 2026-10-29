// Shot Científico #49 · El reflejo de buceo: tu corazón se frena con agua fría — NARRADO (N1 "Por dentro" + N2 comparación con la foca).
// Datos: Arnold 1999, Panneton 2013 y 2020, Schagatay, Goksör et al. 2002, CDC 2015. Ver guion.md y verificacion.md.
// Sin cifras de latidos en pantalla (los monitores son esquemáticos: solo muestran "más lento").
const AGUA = '#7fe3ff', AGUA2 = '#1b8fd6', SANGRE = '#ff3b4a', OXI = '#7fd3ff';

// Ritmo que cambia: de r0 a r1 latidos/s entre t0 y t1 (solo visual). Devuelve la fase acumulada en latidos.
function ritmo(t0, t1, r0, r1) {
  return (t) => {
    if (t <= t0) return r0 * t;
    const d = Math.min(t, t1) - t0, L = t1 - t0 || 1;
    let f = r0 * t0 + r0 * d + (r1 - r0) * d * d / (2 * L);
    if (t > t1) f += r1 * (t - t1);
    return f;
  };
}
// Segundos desde el último latido (para que la forma del latido no se estire).
function desdeLatido(fase, t) { const f = fase(t), fr = f - Math.floor(f); let dt = 0, k = 0; while (k < 80 && fase(t - dt) > Math.floor(f)) { dt += 0.01; k++; } return fr >= 0 ? dt : 0; }
function ecg(dt) {
  if (dt < 0.04) return 0.12 * Math.sin(dt / 0.04 * Math.PI);
  if (dt < 0.08) return 0;
  if (dt < 0.1) return -0.25 * (dt - 0.08) / 0.02;
  if (dt < 0.13) return klerp(-0.25, 1, (dt - 0.1) / 0.03);
  if (dt < 0.17) return klerp(1, -0.35, (dt - 0.13) / 0.04);
  if (dt < 0.2) return klerp(-0.35, 0, (dt - 0.17) / 0.03);
  if (dt < 0.42 && dt > 0.28) return 0.22 * Math.sin((dt - 0.28) / 0.14 * Math.PI);
  return 0;
}
function Corazoncito({ x, y, s = 1, late = 0, color = SANGRE }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.18 * late)})`}>
    <path d="M 0 30 C -60 -10 -50 -60 -22 -60 C -8 -60 0 -48 0 -38 C 0 -48 8 -60 22 -60 C 50 -60 60 -10 0 30 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -24 -44 Q -34 -36 -32 -24" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
}
// Monitor de latidos (dentro de svg). fase(t) en latidos; ventana de 3 s que corre.
function Monitor({ x, y, w = 460, h = 180, T, fase, color = KC.mint, etiqueta, o = 1 }) {
  const N = 90, D = 3, pts = [];
  for (let i = 0; i <= N; i++) { const t = T - D * (1 - i / N); pts.push(`${(70 + (w - 90) * i / N).toFixed(1)},${(h * 0.6 - ecg(desdeLatido(fase, t)) * h * 0.42).toFixed(1)}`); }
  const late = Math.exp(-desdeLatido(fase, T) * 9);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={0} y={0} width={w} height={h} rx={26} fill="#0b1620" stroke={KC.ink} strokeWidth={9} />
    {[1, 2, 3].map((i) => <line key={i} x1={60} y1={h * i / 4} x2={w - 14} y2={h * i / 4} stroke="rgba(47,224,168,.13)" strokeWidth={2} />)}
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={70 + (w - 90)} cy={h * 0.6 - ecg(desdeLatido(fase, T)) * h * 0.42} r={8} fill="#fff" />
    <Corazoncito x={36} y={h / 2 + 8} s={0.48} late={late} />
    {etiqueta && <text x={w / 2 + 20} y={-16} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{etiqueta}</text>}
  </g>;
}
// Cara de frente. zona 0..1 resalta frente, ojos y nariz. moja 0..1: gotas sobre la cara. bebe: cara de bebé. visor 0..1: goggles de buceo.
function CaraFrente({ x, y, s = 1, T = 0, zona = 0, moja = 0, ojosCerrados = 0, infla = 0, bebe = false, visor = 0, sonrie = 0 }) {
  const rx = bebe ? 220 : 205, ry = bebe ? 230 : 255;
  const pulso = 0.6 + 0.4 * Math.sin(T * 7);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {!bebe && <rect x={-70} y={200} width={140} height={110} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />}
    {!bebe && <path d="M -230 330 Q -200 250 -70 280 L 70 280 Q 200 250 230 330 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />}
    <ellipse cx={-rx + 4} cy={-10} rx={34} ry={52} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={rx - 4} cy={-10} rx={34} ry={52} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
    {bebe ? <path d="M -20 -225 C -40 -275 10 -290 20 -260 C 26 -245 10 -238 0 -246" fill="none" stroke={CPELO} strokeWidth={12} strokeLinecap="round" />
      : <path d="M -205 -40 C -230 -200 -110 -290 0 -285 C 120 -290 235 -200 205 -40 C 190 -120 140 -170 60 -175 C 10 -150 -80 -150 -140 -170 C -180 -140 -195 -100 -205 -40 Z" fill={CPELO} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />}
    {/* zona sensible: frente, ojos y nariz */}
    {zona > 0 && <g opacity={zona}>
      <ellipse cx={0} cy={-122} rx={150} ry={48} fill={KC.cyan} opacity={0.35 + 0.2 * pulso} stroke={KC.cyan} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-T * 30} />
      <rect x={-165} y={-78} width={330} height={84} rx={42} fill={KC.cyan} opacity={0.35 + 0.2 * pulso} stroke={KC.cyan} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-T * 30} />
      <path d="M -40 0 L 0 -70 L 40 0 L 46 74 L -46 74 Z" fill={KC.cyan} opacity={0.35 + 0.2 * pulso} stroke={KC.cyan} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-T * 30} strokeLinejoin="round" />
      {[[-90, -125], [0, -140], [90, -125], [-90, -36], [90, -36], [0, 40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={10 + 6 * Math.sin(T * 8 + i)} fill="#fff" opacity=".85" />)}
    </g>}
    {/* ojos */}
    {[-80, 80].map((ex) => ojosCerrados > 0.5
      ? <path key={ex} d={`M ${ex - 34} -36 Q ${ex} -18 ${ex + 34} -36`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      : <g key={ex}><ellipse cx={ex} cy={-36} rx={bebe ? 32 : 28} ry={bebe ? 34 : 24} fill="#fff" stroke={KC.ink} strokeWidth={7} /><circle cx={ex + 4} cy={-34} r={bebe ? 17 : 13} fill={KC.ink} /><circle cx={ex + 9} cy={-40} r={5} fill="#fff" /></g>)}
    {!bebe && [-80, 80].map((ex) => <path key={ex} d={`M ${ex - 40} -86 Q ${ex} -100 ${ex + 40} -84`} stroke={CPELO} strokeWidth={11} fill="none" strokeLinecap="round" />)}
    {/* nariz */}
    <path d={bebe ? 'M -14 44 Q 0 56 14 44' : 'M 0 -10 L -22 60 Q 0 74 24 60'} stroke={CPIEL2} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* mejillas (infladas = aguanta la respiración) y boca cerrada */}
    <circle cx={-120} cy={80} r={34 + 18 * infla} fill="#ff8fa3" opacity={0.45 + 0.3 * infla} />
    <circle cx={120} cy={80} r={34 + 18 * infla} fill="#ff8fa3" opacity={0.45 + 0.3 * infla} />
    {sonrie > 0.5 ? <path d="M -60 120 Q 0 175 60 120" stroke={KC.ink} strokeWidth={9} fill="#5a1f22" strokeLinecap="round" />
      : <path d={infla > 0.3 ? 'M -34 130 Q 0 140 34 130' : 'M -40 130 Q 0 148 40 130'} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />}
    {/* visor de buceo */}
    {visor > 0 && <g opacity={visor} transform={`translate(0 ${(1 - visor) * -120})`}>
      <path d="M -210 -40 L -175 -40 M 175 -40 L 210 -40" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
      <rect x={-178} y={-96} width={356} height={120} rx={50} fill="rgba(127,227,255,.45)" stroke={KC.ink} strokeWidth={11} />
      <rect x={-178} y={-96} width={356} height={120} rx={50} fill="none" stroke={KC.yellow} strokeWidth={5} />
      <path d="M -130 -74 L -90 -74" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity=".8" />
      <path d="M 205 -10 L 205 -260 Q 205 -290 235 -290" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
      <path d="M 205 -10 L 205 -260 Q 205 -290 235 -290" fill="none" stroke={KC.orange} strokeWidth={18} strokeLinecap="round" />
    </g>}
    {/* gotas de agua fría que resbalan */}
    {moja > 0 && Array.from({ length: 14 }, (_, i) => { const g = krng(i + 3); const gx = (g() - 0.5) * 360, f = ((T * (0.7 + g() * 0.5) + g()) % 1), gy = klerp(-300, 220, f);
      return <g key={i} opacity={moja * (1 - f * 0.6)} transform={`translate(${gx} ${gy})`}><path d="M 0 -22 C 10 -6 14 4 0 14 C -14 4 -10 -6 0 -22 Z" fill={AGUA} stroke={AGUA2} strokeWidth={4} /><circle cx={-3} cy={0} r={3} fill="#fff" /></g>; })}
  </g>;
}
// Foca de perfil mirando a la derecha.
function Foca({ x, y, s = 1, rot = 0, T = 0, sonrie = false, visor = 0 }) {
  const cola = Math.sin(T * 5) * 10;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${cola} -190 0)`}><path d="M -190 0 L -270 -50 Q -280 -10 -262 0 Q -280 10 -270 50 Z" fill="#7d8b99" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
    <path d="M -200 0 C -180 -80 20 -110 130 -80 C 200 -60 230 -10 220 30 C 200 80 60 90 -40 70 C -120 55 -200 40 -200 0 Z" fill="#8f9eac" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 30 C -60 70 80 80 190 40 C 150 70 40 85 -40 72 C -100 62 -140 48 -150 30 Z" fill="#c9d3dc" />
    {[[-80, -40], [-20, -60], [40, -30], [-120, -10], [90, -55]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9} fill="#6d7a88" />)}
    <path d={`M 30 50 Q 40 ${110 + Math.sin(T * 5 + 1) * 10} -10 110 Q 0 80 10 50 Z`} fill="#7d8b99" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={150} cy={-40} r={22} fill={KC.ink} /><circle cx={157} cy={-47} r={7} fill="#fff" />
    <ellipse cx={212} cy={-2} rx={14} ry={10} fill={KC.ink} />
    {[-14, 0, 14].map((d) => <path key={d} d={`M 200 ${12 + d * 0.3} Q 240 ${16 + d} 268 ${8 + d * 1.6}`} stroke={KC.ink} strokeWidth={3} fill="none" />)}
    {sonrie ? <path d="M 178 22 Q 196 36 214 22" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /> : <path d="M 182 26 L 210 24" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
    {visor > 0 && <g opacity={visor}><rect x={118} y={-74} width={80} height={60} rx={24} fill="rgba(127,227,255,.5)" stroke={KC.ink} strokeWidth={8} /><path d="M 118 -44 L 60 -54" stroke={KC.ink} strokeWidth={10} /></g>}
  </g>;
}
function Ballena({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity=".5">
    <path d={`M -240 0 C -200 -90 120 -100 220 -20 C 250 0 240 40 200 50 C 80 80 -120 70 -190 30 L -280 ${-60 + Math.sin(T * 2) * 15} L -260 0 L -290 ${50 + Math.sin(T * 2) * 15} Z`} fill="#0f3d6e" />
    <circle cx={150} cy={-10} r={8} fill="#7fd3ff" />
  </g>;
}
// Burbujas que suben desde (x, y).
function Burbujas({ T, x, y, n = 6, alto = 300, seed = 2, o = 1 }) {
  const g = krng(seed); const b = Array.from({ length: n }, () => [g(), g()]);
  return <g opacity={o}>{b.map(([a, c], i) => { const f = ((T * (0.5 + c * 0.4) + a) % 1); return <circle key={i} cx={x + Math.sin(T * 3 + i) * 14 + (c - 0.5) * 40} cy={y - f * alto} r={6 + c * 12} fill="rgba(255,255,255,.25)" stroke="#fff" strokeWidth={3} opacity={1 - f} />; })}</g>;
}
// Cuerpo por dentro (de frente). angosto 0..1: vasos de manos y pies se adelgazan (nunca se cierran). oxi 0..1: el oxígeno va a cerebro y corazón.
function CuerpoDentro({ x, y, s = 1, T = 0, fase, angosto = 0, oxi = 0 }) {
  const late = fase ? Math.exp(-desdeLatido(fase, T) * 8) : 0;
  const ext = 'rgba(127,211,255,.10)', borde = 'rgba(127,211,255,.75)';
  const gV = klerp(12, 5, angosto);                     // grosor de los vasos de manos y pies
  const dimo = 1 - 0.45 * oxi;
  const ramas = (cx, cy, dir, rot) => <g transform={`translate(${cx} ${cy}) rotate(${rot})`} opacity={dimo}>
    {[-30, -10, 10, 30].map((a, i) => <line key={i} x1={0} y1={0} x2={Math.sin(a * Math.PI / 180) * 70} y2={dir * Math.cos(a * Math.PI / 180) * 70} stroke={SANGRE} strokeWidth={gV} strokeLinecap="round" />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* silueta */}
    <circle cx={0} cy={-330} r={80} fill={ext} stroke={borde} strokeWidth={6} />
    <rect x={-32} y={-260} width={64} height={40} fill={ext} stroke="none" />
    <path d="M -120 -230 Q 0 -250 120 -230 L 125 70 Q 0 95 -125 70 Z" fill={ext} stroke={borde} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -120 -225 L -240 20" stroke={borde} strokeWidth={58} strokeLinecap="round" opacity=".25" />
    <path d="M 120 -225 L 240 20" stroke={borde} strokeWidth={58} strokeLinecap="round" opacity=".25" />
    <path d="M -60 70 L -70 330 M 60 70 L 70 330" stroke={borde} strokeWidth={66} strokeLinecap="round" opacity=".25" />
    <ellipse cx={-255} cy={70} rx={46} ry={56} fill={ext} stroke={borde} strokeWidth={5} />
    <ellipse cx={255} cy={70} rx={46} ry={56} fill={ext} stroke={borde} strokeWidth={5} />
    <ellipse cx={-90} cy={362} rx={60} ry={30} fill={ext} stroke={borde} strokeWidth={5} />
    <ellipse cx={90} cy={362} rx={60} ry={30} fill={ext} stroke={borde} strokeWidth={5} />
    {/* vasos principales */}
    <path d="M 30 -160 L -10 -200 L -110 -210 L -235 30 M 30 -160 L 10 -200 L 110 -210 L 235 30 M 20 -140 L 0 60 L -65 90 L -80 330 M 0 60 L 65 90 L 80 330 M 0 -200 L 0 -290" stroke={SANGRE} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
    {/* vasos de manos y pies: se adelgazan */}
    {ramas(-242, 40, 1, 12)}{ramas(242, 40, 1, -12)}{ramas(-82, 335, 1, 70)}{ramas(82, 335, 1, -70)}
    {/* cerebro */}
    <g opacity={0.8 + 0.2 * oxi}>
      <ellipse cx={0} cy={-345} rx={60} ry={46} fill={oxi > 0 ? KC.gold2 : '#f7b7c8'} stroke={KC.ink} strokeWidth={5} />
      <path d="M -40 -360 Q -20 -330 0 -360 Q 20 -330 40 -360 M -45 -335 Q -20 -315 0 -335 Q 20 -315 45 -335" stroke={KC.ink} strokeWidth={4} fill="none" opacity=".6" />
      {oxi > 0 && <circle cx={0} cy={-345} r={70 + 8 * Math.sin(T * 6)} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={oxi * 0.7} />}
    </g>
    {/* corazón */}
    <Corazoncito x={30} y={-150} s={0.9} late={late} color={oxi > 0.5 ? '#ff5a6a' : SANGRE} />
    {oxi > 0 && <circle cx={30} cy={-165} r={66 + 8 * Math.sin(T * 6 + 1)} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={oxi * 0.7} />}
    {/* oxígeno que viaja hacia cerebro y corazón */}
    {oxi > 0 && Array.from({ length: 10 }, (_, i) => { const dst = i % 2 ? [0, -345] : [30, -165]; const org = [[-240, 60], [240, 60], [-80, 330], [80, 330], [-150, -100]][i % 5];
      const f = ((T * 0.45 + i / 10) % 1); return <g key={i} transform={`translate(${klerp(org[0], dst[0], f)} ${klerp(org[1], dst[1], f)})`} opacity={oxi * Math.sin(f * Math.PI)}>
        <circle r={24} fill={OXI} stroke={KC.ink} strokeWidth={4} /><text y={8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>O₂</text></g>; })}
  </g>;
}
// Tubo de un vaso visto de cerca, con glóbulos que pasan. angosto 0..1 (se adelgaza, nunca se cierra).
function VasoCerca({ r, T, angosto = 0 }) {
  const ancho = klerp(110, 58, angosto), cy = r;
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#2a0f18" />
    <rect x={-10} y={cy - ancho / 2 - 22} width={r * 2 + 20} height={ancho + 44} fill="#ff9aa8" stroke={KC.ink} strokeWidth={5} />
    <rect x={-10} y={cy - ancho / 2} width={r * 2 + 20} height={ancho} fill="#7a0f1e" />
    {Array.from({ length: 7 }, (_, i) => { const f = ((T * 0.5 + i / 7) % 1); return <ellipse key={i} cx={-30 + f * (r * 2 + 60)} cy={cy + Math.sin(i * 2.1) * ancho * 0.18} rx={20} ry={Math.min(14, ancho * 0.22)} fill={SANGRE} stroke={KC.ink} strokeWidth={3} />; })}
    {angosto > 0.05 && [-1, 1].map((d) => <path key={d} d={`M ${r} ${cy + d * (ancho / 2 + 80)} l 0 ${-d * 36} m -16 ${d * 14} l 16 ${-d * 16} l 16 ${d * 16}`} stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={angosto} />)}
  </svg>;
}
// Bebé de cuerpo entero (esquema): cara grande y pañal.
function Bebe({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={330} rx={150} ry={130} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -140 360 Q 0 470 140 360 Q 120 440 0 460 Q -120 440 -140 360 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-160} cy={290} rx={40} ry={70} fill={CPIEL} stroke={KC.ink} strokeWidth={8} transform={`rotate(${30 + Math.sin(T * 4) * 10} -160 290)`} />
    <ellipse cx={160} cy={290} rx={40} ry={70} fill={CPIEL} stroke={KC.ink} strokeWidth={8} transform={`rotate(${-30 - Math.sin(T * 4) * 10} 160 290)`} />
    <CaraFrente x={0} y={0} s={0.85} T={T} bebe sonrie={1} />
  </g>;
}
function Estetoscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M -50 0 Q -60 120 0 150 Q 60 120 50 0" fill="none" stroke="#333" strokeWidth={10} strokeLinecap="round" />
    <path d="M 0 150 L 0 200" stroke="#333" strokeWidth={10} /><circle cx={0} cy={215} r={22} fill="#bfc6cf" stroke={KC.ink} strokeWidth={6} /></g>;
}
// Nadador bajo el agua (de lado) con burbujas.
function Nadador({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform="rotate(-90)"><PersonaSimple x={0} yPies={260} alto={520} color={KC.orange} /></g>
    <Burbujas T={T} x={-190} y={-40} n={5} alto={220} seed={7} />
  </g>;
}

function ReflejoBuceo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const faseTu = ritmo(K.Gancho + 1.4, K.Gancho + 4.2, 1.55, 0.95);
  const faseCuerpo = ritmo(K.Corazon + 0.4, K.Corazon + 3.4, 1.5, 0.85);
  const faseYo = ritmo(K.Focas + 1.0, K.Focas + 3.5, 1.5, 1.15), faseFoca = ritmo(K.Focas + 1.0, K.Focas + 3.5, 1.5, 0.3);
  const faseMed = ritmo(K.Medico + 2.6, K.Medico + 5.0, 2.9, 1.4);
  const faseFin = ritmo(-1, 0, 0.9, 0.9);
  const zonaP = kprog(T, K.Cara + 0.6, K.Cara + 1.4, kEase.sale);
  const angosto = kprog(T, K.Corazon + 2.3, K.Corazon + 4.2, kEase.suave);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: agua fría en la cara, el monitor baja, aparece la foca */}
      <Escena T={T} a={K.Gancho} b={K.Reflejo} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CaraFrente x={340} y={930} s={1.1} T={T} moja={kprog(T, 0, 0.3)} ojosCerrados={1} infla={kprog(T, K.Gancho + 1.0, K.Gancho + 1.6)} />
          <Onomato T={T} at={0.05} dur={1.1} x={330} y={640} texto="¡SPLASH!" color={KC.white} tam={120} />
          <Monitor x={50} y={340} w={470} h={170} T={T} fase={faseTu} etiqueta="" o={kprog(T, 0.3, 0.7)} />
          {T > K.Gancho + 1.6 && <TextoSvg x={285} y={572} tam={44} color={KC.yellow} fuente="texto" o={kprog(T, K.Gancho + 1.6, K.Gancho + 2.0)}>más lento…</TextoSvg>}
          {T > K.Gancho + 4.2 && <g transform={`translate(0 ${(1 - kprog(T, K.Gancho + 4.2, K.Gancho + 4.8, kEase.rebote)) * 500})`}>
            <Foca x={830} y={1060} s={0.85} rot={-8} T={T} />
          </g>}
          {T > K.Gancho + 5.4 && <FlechaCurva x1={560} y1={820} x2={760} y2={950} p={kprog(T, K.Gancho + 5.4, K.Gancho + 6.1, kEase.sale)} curva={-80} color={KC.yellow} T={T} />}
        </Lienzo>
        <Etq T={T} at={K.Gancho + 5.0} until={K.Reflejo - 0.2} x={950} y={920} texto="foca" lado="izq" color={KC.ink} />
        <Chip T={T} at={K.Gancho + 5.8} until={K.Reflejo - 0.1} texto="el mismo reflejo" x={740} y={740} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 1 · el nombre: la cara entra al agua */}
      <Escena T={T} a={K.Reflejo} b={K.Cara} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(520 ${klerp(560, 720, kprog(T, K.Reflejo, K.Reflejo + 1.6, kEase.suave))}) rotate(72)`}>
            <CabezaPerfil x={0} y={0} s={1.15} ojo={0} />
          </g>
          <path d={`M 120 860 Q 540 ${880 + Math.sin(T * 4) * 8} 960 860 L 900 1150 Q 540 1190 180 1150 Z`} fill="rgba(0,160,230,.72)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          <path d={`M 140 870 Q 340 ${850 + Math.sin(T * 5) * 10} 540 870 T 940 870`} stroke="#fff" strokeWidth={7} fill="none" opacity=".8" />
          <Burbujas T={T} x={540} y={1100} n={7} alto={220} seed={4} o={kprog(T, K.Reflejo + 1.2, K.Reflejo + 1.6)} />
        </Lienzo>
        <Chip T={T} at={K.Reflejo + 0.2} until={K.Cara - 0.1} texto="reflejo de inmersión" x={540} y={430} tam={52} borde={KC.cyan} />
        <Chip T={T} at={K.Reflejo + 1.5} until={K.Cara - 0.1} texto="= reflejo de buceo" x={540} y={530} tam={40} borde={KC.ink} />
      </Escena>
      {/* 2 · qué lo dispara: frente, ojos y nariz + aguantar la respiración */}
      <Escena T={T} a={K.Cara} b={K.Corazon} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CaraFrente x={440} y={830} s={1.35} T={T} zona={zonaP} moja={kprog(T, K.Cara + 0.2, K.Cara + 0.8)} ojosCerrados={T > K.Cara + 3.4 ? 1 : 0} infla={kprog(T, K.Cara + 4.4, K.Cara + 5.0)} />
        </Lienzo>
        <Etq T={T} at={K.Cara + 1.4} until={K.Corazon - 0.2} x={740} y={830 - 122 * 1.35} texto="frente" lado="der" color={KC.texto} tam={40} />
        <Etq T={T} at={K.Cara + 2.2} until={K.Corazon - 0.2} x={760} y={830 - 36 * 1.35} texto="ojos" lado="der" color={KC.texto} tam={40} />
        <Etq T={T} at={K.Cara + 3.0} until={K.Corazon - 0.2} x={500} y={830 + 40 * 1.35} texto="nariz" lado="der" color={KC.texto} tam={40} />
        <Chip T={T} at={K.Cara + 0.3} until={K.Corazon - 0.1} texto="agua fría en la cara" x={540} y={420} tam={44} borde={KC.cyan} />
        <Chip T={T} at={K.Cara + 4.4} until={K.Corazon - 0.1} texto="+ aguantar la respiración" x={540} y={515} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 3–4 · por dentro: el corazón se frena, los vasos de manos y pies se angostan; el oxígeno va a cerebro y corazón */}
      <Escena T={T} a={K.Corazon} b={K.Pregunta} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={22} color="rgba(127,211,255,.14)" />
        <Lienzo>
          <CuerpoDentro x={540} y={840} s={1.12} T={T} fase={faseCuerpo} angosto={angosto} oxi={kprog(T, K.Ahorra + 0.4, K.Ahorra + 1.2)} />
          {T < K.Ahorra + 0.2 && <Monitor x={40} y={350} w={380} h={150} T={T} fase={faseCuerpo} o={kprog(T, K.Corazon + 0.1, K.Corazon + 0.5) * (1 - kprog(T, K.Ahorra - 0.2, K.Ahorra + 0.2))} />}
        </Lienzo>
        <Chip T={T} at={K.Corazon + 0.6} until={K.Corazon + 2.2} texto="late más despacio" x={250} y={560} tam={36} borde={KC.mint} />
        <Lupa T={T} at={K.Corazon + 2.0} until={K.Ahorra - 0.1} x={840} y={480} r={150} fx={540 + 242 * 1.12} fy={840 + 60 * 1.12} tinte={SANGRE} etiqueta="POR DENTRO · MANO"
          interior={(t, r) => <VasoCerca r={r} T={t} angosto={angosto} />} />
        <Etq T={T} at={K.Corazon + 2.6} until={K.Ahorra - 0.1} x={540 - 290 * 1.12} y={840 + 150 * 1.12} texto="vasos más angostos" lado="der" color={KC.yellow} tam={34} />
        <Chip T={T} at={K.Ahorra + 0.3} until={K.Pregunta - 0.1} texto="ahorra oxígeno" x={820} y={470} tam={48} borde={OXI} />
        <Etq T={T} at={K.Ahorra + 1.8} until={K.Pregunta - 0.2} x={540 + 90 * 1.12} y={840 - 345 * 1.12} texto="cerebro" lado="der" color={KC.gold2} tam={36} />
        <Etq T={T} at={K.Ahorra + 2.6} until={K.Pregunta - 0.2} x={540 + 110 * 1.12} y={840 - 160 * 1.12} texto="corazón" lado="der" color={KC.gold2} tam={36} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Focas} />
      {/* 6 · focas: el reflejo es muchísimo más fuerte */}
      <Escena T={T} a={K.Focas} b={K.Bebes}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#00d2ff 0%, #0a8fd8 45%, #0a3f86 100%)' }}></div>
        <Lienzo>
          <path d={`M 0 300 Q 270 ${280 + Math.sin(T * 2) * 12} 540 300 T 1080 300 L 1080 0 L 0 0 Z`} fill="#bff3ff" />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${i * 200 - ((T * 40) % 200)} ${560 + i * 110} l 260 140`} stroke="rgba(255,255,255,.12)" strokeWidth={30} />)}
          <Ballena x={klerp(1250, -250, kprog(T, K.Focas, K.Bebes))} y={1150} s={0.9} T={T} />
          {(() => { const p = kprog(T, K.Focas, K.Bebes - 0.2, kEase.suave); const fx = klerp(800, 420, p), fy = klerp(840, 1060, p);
            return <g><Foca x={fx} y={fy} s={0.95} rot={148} T={T} /><Burbujas T={T} x={fx + 120} y={fy - 60} n={6} alto={260} seed={9} /></g>; })()}
          <Monitor x={560} y={360} w={460} h={120} T={T} fase={faseYo} color={KC.mint} o={kprog(T, K.Focas + 0.4, K.Focas + 0.8)} />
          <Monitor x={560} y={540} w={460} h={120} T={T} fase={faseFoca} color={KC.yellow} o={kprog(T, K.Focas + 0.7, K.Focas + 1.1)} />
          <TextoSvg x={540} y={420} tam={32} color={KC.texto} fuente="texto" ancla="end" o={kprog(T, K.Focas + 0.4, K.Focas + 0.8)}>tú</TextoSvg>
          <TextoSvg x={540} y={600} tam={32} color={KC.yellow} fuente="texto" ancla="end" o={kprog(T, K.Focas + 0.7, K.Focas + 1.1)}>foca</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Focas + 3.6} until={K.Bebes - 0.1} texto="muchísimo más fuerte" x={760} y={720} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Focas + 5.0} until={K.Bebes - 0.2} x={420} y={1150} texto="otros mamíferos que bucean" lado="der" color={KC.texto} tam={30} />
      </Escena>
      {/* 7 · los bebés también */}
      <Escena T={T} a={K.Bebes} b={K.Ojo} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Bebes - 0.2, K.Bebes + 0.4, kEase.rebote)) * 600})`}><Bebe x={540} y={720} s={1.05} T={T} /></g>
          <Corazoncito x={830} y={700} s={1.1} late={Math.exp(-((T * 0.9) % 1) * 8)} />
        </Lienzo>
        <Chip T={T} at={K.Bebes + 0.2} until={K.Ojo - 0.1} texto="también lo tienen" x={540} y={430} tam={50} borde={KC.pink} />
      </Escena>
      {/* 8 · ojo: no hagas pruebas */}
      <Escena T={T} a={K.Ojo} b={K.Medico} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform={`translate(540 455) scale(${klerp(0.4, 1.25, kprog(T, K.Ojo, K.Ojo + 0.4, kEase.rebote)) * (1 + 0.04 * Math.sin(T * 9))})`}><Alerta x={0} y={0} /></g>
          <TextoSvg x={540} y={640} tam={78} color={KC.yellow} s={klerp(0.5, 1, kprog(T, K.Ojo + 0.4, K.Ojo + 0.8, kEase.rebote))} o={kprog(T, K.Ojo + 0.4, K.Ojo + 0.6)}>NO HAGAS PRUEBAS</TextoSvg>
          <TextoSvg x={540} y={730} tam={78} color={KC.yellow} s={klerp(0.5, 1, kprog(T, K.Ojo + 0.7, K.Ojo + 1.1, kEase.rebote))} o={kprog(T, K.Ojo + 0.7, K.Ojo + 0.9)}>BAJO EL AGUA</TextoSvg>
          <rect x={150} y={780} width={780} height={300} rx={30} fill="#1aa3e0" stroke={KC.ink} strokeWidth={10} />
          <path d={`M 160 800 Q 350 ${790 + Math.sin(T * 4) * 8} 540 800 T 920 800`} stroke="#fff" strokeWidth={6} fill="none" opacity=".8" />
          <Nadador x={540} y={960} s={0.5} T={T} />
          {T > K.Ojo + 1.4 && <g opacity={kprog(T, K.Ojo + 1.4, K.Ojo + 1.8)} transform={`translate(540 930) scale(${klerp(1.4, 1, kprog(T, K.Ojo + 1.4, K.Ojo + 1.8, kEase.sale))})`}>
            <circle r={135} fill="none" stroke={KC.ink} strokeWidth={34} /><circle r={135} fill="none" stroke={KC.red} strokeWidth={22} />
            <line x1={-95} y1={95} x2={95} y2={-95} stroke={KC.ink} strokeWidth={34} /><line x1={-95} y1={95} x2={95} y2={-95} stroke={KC.red} strokeWidth={22} /></g>}
          <TextoSvg x={540} y={1160} tam={90} color={KC.white} s={klerp(0.5, 1, kprog(T, K.Ojo + 3.2, K.Ojo + 3.6, kEase.rebote))} o={kprog(T, K.Ojo + 3.2, K.Ojo + 3.4)}>¡NUNCA A SOLAS!</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 9 · médico: solo con indicación médica */}
      <Escena T={T} a={K.Medico} b={K.Cierre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <PersonaSimple x={270} yPies={1170} alto={640} color="#ffffff" brazos={kprog(T, K.Medico + 2.4, K.Medico + 3.0) * 0.25} />
          <Estetoscopio x={270} y={1170 - 640 + 150} s={0.9} />
          <rect x={232} y={1170 - 640 + 230} width={22} height={70} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><rect x={208} y={1170 - 640 + 254} width={70} height={22} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          <Monitor x={510} y={640} w={520} h={200} T={T} fase={faseMed} color={KC.mint} />
          <TextoSvg x={770} y={900} tam={36} color={KC.texto} fuente="texto" o={kprog(T, K.Medico + 0.8, K.Medico + 1.2)}>{T < K.Medico + 3.2 ? 'latidos acelerados' : 'más calmados'}</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Medico + 3.6} until={K.Cierre - 0.1} texto="solo con indicación médica" x={540} y={460} tam={50} borde={KC.yellow} />
      </Escena>
      {/* 10 · cierre: la misma cara del inicio, ahora en modo submarino */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CaraFrente x={340} y={930} s={1.1} T={T} moja={1} visor={kprog(T, K.Cierre + 0.6, K.Cierre + 1.2, kEase.rebote)} sonrie={1} />
          <Monitor x={50} y={340} w={470} h={170} T={T} fase={faseFin} />
          <Foca x={830} y={1060} s={0.85} rot={-8} T={T} sonrie visor={kprog(T, K.Cierre + 1.2, K.Cierre + 1.8, kEase.rebote)} />
          <Burbujas T={T} x={560} y={900} n={6} alto={300} seed={12} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.6} until={K.Outro - 0.1} texto="modo submarino de fábrica" x={540} y={620} tam={46} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Reflejo - 0.1} texto="Agua fría en la cara: *tu corazón se frena.*" />
      <Subtitulo T={T} idx={1} at={K.Reflejo + 0.1} until={K.Cara - 0.1} texto="Reflejo de inmersión, *o de buceo.*" />
      <Subtitulo T={T} idx={2} at={K.Cara + 0.1} until={K.Corazon - 0.1} texto="Frente, ojos y nariz *+ no respirar.*" />
      <Subtitulo T={T} idx={3} at={K.Corazon + 0.1} until={K.Ahorra - 0.1} texto="Latido lento, *vasos más angostos.*" />
      <Subtitulo T={T} idx={4} at={K.Ahorra + 0.1} until={K.Pregunta - 0.1} texto="Oxígeno para *cerebro y corazón.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Focas - 0.1} texto="¿Y por qué *lo tenemos?*" />
      <Subtitulo T={T} idx={6} at={K.Focas + 0.1} until={K.Bebes - 0.1} texto="En las focas: *muchísimo más fuerte.*" />
      <Subtitulo T={T} idx={7} at={K.Bebes + 0.1} until={K.Ojo - 0.1} texto="Los bebés *también lo tienen.*" />
      <Subtitulo T={T} idx={8} at={K.Ojo + 0.1} until={K.Medico - 0.1} texto="Sin pruebas bajo el agua, *nunca a solas.*" />
      <Subtitulo T={T} idx={9} at={K.Medico + 0.1} until={K.Cierre - 0.1} texto="Solo con *indicación médica.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu *modo submarino* de fábrica." />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Reflejo + 0.3, K.Cara + 1.0, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Corazon + 0.4, K.Ahorra + 2.0, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Pregunta + 0.05, K.Focas - 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Focas + 3.4, K.Bebes - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Bebes + 0.2, K.Ojo - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Ojo + 0.4, K.Medico - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Medico + 1.0, K.Cierre - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="49" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function ReflejoBuceoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ReflejoBuceo /></CompositionStage></div>;
}
window.ReflejoBuceoApp = ReflejoBuceoApp;
