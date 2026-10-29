// Shot Biotecnológico #10 · El cuajo de tu queso lo hace un microbio (quimosina) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const QUI = '#9b5de5', LECHE = '#fbf8ef', CUAJ = '#f3e7c4', SUERO = '#e9df8a', CA = '#7fe0ff', KAPPA = '#ffb3c7';

// Capa SVG de pantalla completa.
function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Olla de leche vista de lado. cuaja 0..1 (la leche se vuelve gel), corta 0..1 (la cuchara corta en cubos), suero 0..1.
function Olla({ T, x, y, s = 1, cuaja = 0, corta = 0, suero = 0, vapor = 1 }) {
  const sup = mixHex(LECHE, CUAJ, cuaja);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && [-120, 0, 120].map((dx, i) => { const f = (T * 0.5 + i * 0.33) % 1;
      return <path key={i} d={`M ${dx} ${-200 - f * 120} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={(1 - f) * 0.7 * vapor} />; })}
    <rect x={-300} y={-150} width={40} height={30} rx={12} fill="#9aa3b5" stroke={KC.ink} strokeWidth={7} />
    <rect x={260} y={-150} width={40} height={30} rx={12} fill="#9aa3b5" stroke={KC.ink} strokeWidth={7} />
    <path d="M -270 -170 L 270 -170 L 240 150 Q 240 180 210 180 L -210 180 Q -240 180 -240 150 Z" fill="#c9d1de" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -230 -120 L -215 140" stroke="#fff" strokeWidth={14} opacity=".5" strokeLinecap="round" />
    <ellipse cx={0} cy={-170} rx={270} ry={48} fill="#8e97a8" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-162} rx={246} ry={36} fill={sup} />
    {cuaja > 0.2 && <ellipse cx={-60} cy={-170} rx={90} ry={10} fill="#fff" opacity={0.5 * cuaja} />}
    {corta > 0 && [-150, -60, 30, 120].map((dx, i) => <line key={i} x1={dx} y1={-190} x2={dx + 40} y2={-134} stroke="#c9b27a" strokeWidth={5} opacity={kprog(corta, i * 0.2, i * 0.2 + 0.25)} />)}
    {corta > 0 && [-176, -150].map((dy, i) => <line key={'h' + i} x1={-220} y1={dy} x2={220} y2={dy + 6} stroke="#c9b27a" strokeWidth={5} opacity={kprog(corta, 0.5 + i * 0.2, 0.75 + i * 0.2)} />)}
    {suero > 0 && [[-140, -172], [-20, -150], [90, -168], [170, -150]].map(([px, py], i) => <ellipse key={i} cx={px} cy={py} rx={34 * suero} ry={8 * suero} fill={SUERO} opacity=".9" />)}
  </g>;
}
// Frasco de cuajo con gotero. inclina en grados.
function FrascoCuajo({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <rect x={-70} y={-130} width={140} height={250} rx={30} fill="#d8f3e3" stroke={KC.ink} strokeWidth={9} />
    <rect x={-66} y={-40} width={132} height={156} rx={26} fill="#f0d98a" opacity=".85" />
    <rect x={-62} y={-20} width={124} height={92} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={18} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>CUAJO</text>
    <text x={0} y={52} textAnchor="middle" style={{ font:`700 15px ${KF.mono}` }} fill={QUI}>quimosina</text>
    <text x={0} y={66} textAnchor="middle" style={{ font:`700 12px ${KF.mono}` }} fill="#5a524a">por fermentación</text>
    <rect x={-40} y={-170} width={80} height={44} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Gotero (pipeta con perilla), vertical, punta en (x, y).
function Gotero({ x, y, s = 1, aprieta = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 0 L -16 -150 L 16 -150 L 10 0 Z" fill="#eaf6ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-12} y={-90} width={24} height={70} fill="#f0d98a" opacity=".8" />
    <ellipse cx={0} cy={-190} rx={30 - aprieta * 6} ry={44} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Becerro de lado (cabeza grande, patas largas, sin cuernos ni ubre). mama: 0..1 mueve la cabeza hacia la mamila.
function Becerro({ T = 0, x = 0, y = 0, s = 1, mama = 0, mamila = false, tache = 0, o = 1, silueta = false }) {
  const f = silueta ? '#5a4a40' : '#fff', mancha = silueta ? '#5a4a40' : '#7a4a2e';
  const chupa = mama * Math.sin(T * 9) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <g transform={`translate(-210 -80) rotate(${Math.sin(T * 2.2) * 14})`}><path d="M 0 0 C -30 40 -36 100 -30 150" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" /><ellipse cx={-30} cy={160} rx={12} ry={22} fill={KC.ink} /></g>
    {[[-160], [-100], [110], [170]].map(([px], i) => <g key={i}><rect x={px - 20} y={20} width={40} height={230} rx={16} fill={f} stroke={KC.ink} strokeWidth={8} /><rect x={px - 22} y={228} width={44} height={30} rx={9} fill="#3a2b22" stroke={KC.ink} strokeWidth={6} /></g>)}
    <rect x={-230} y={-150} width={440} height={230} rx={110} fill={f} stroke={KC.ink} strokeWidth={9} />
    {!silueta && <><path d="M -170 -140 C -120 -100 -80 -130 -70 -80 C -60 -30 -140 -20 -170 -60 C -200 -100 -210 -130 -170 -140 Z" fill={mancha} />
      <path d="M 40 -148 C 80 -110 140 -130 150 -90 C 160 -40 80 -40 60 -70 C 40 -100 20 -140 40 -148 Z" fill={mancha} /></>}
    <g transform={`translate(${220 + mama * 30 + chupa} ${-120 + mama * 30}) rotate(${mama * 18})`}>
      <path d="M -10 -40 L -70 -70 L -40 -10 Z" fill={f} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-30} y={-90} width={170} height={160} rx={70} fill={f} stroke={KC.ink} strokeWidth={9} />
      {!silueta && <path d="M 30 -90 C 70 -70 60 -20 30 -36 C 4 -50 6 -80 30 -90 Z" fill={mancha} />}
      {!silueta && <><circle cx={70} cy={-24} r={16} fill={KC.ink} /><circle cx={75} cy={-30} r={6} fill="#fff" /></>}
      <rect x={80} y={4} width={90} height={60} rx={28} fill={silueta ? f : '#ffb3c7'} stroke={KC.ink} strokeWidth={8} />
      {!silueta && <><circle cx={146} cy={28} r={6} fill={KC.ink} /><circle cx={118} cy={28} r={6} fill={KC.ink} /></>}
    </g>
    {mamila && <g transform={`translate(${430 + mama * 20} ${-60 + mama * 20}) rotate(-60)`}>
      <path d="M -14 -30 Q 0 -70 14 -30 Z" fill="#e8b36a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-34} y={-30} width={68} height={22} rx={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
      <rect x={-40} y={-8} width={80} height={170} rx={22} fill="#f4f7ff" stroke={KC.ink} strokeWidth={7} />
      <rect x={-36} y={40} width={72} height={118} rx={18} fill={LECHE} />
      {[30, 70, 110].map((yy) => <line key={yy} x1={20} y1={yy} x2={36} y2={yy} stroke={KC.ink} strokeWidth={4} />)}
    </g>}
    {tache > 0 && <g opacity={tache} stroke={KC.red} strokeWidth={34} strokeLinecap="round">
      <line x1={-260 * kprog(tache, 0, 0.5)} y1={-260 * kprog(tache, 0, 0.5)} x2={260 * kprog(tache, 0, 0.5)} y2={260 * kprog(tache, 0, 0.5)} />
      <line x1={260 * kprog(tache, 0.5, 1)} y1={-260 * kprog(tache, 0.5, 1)} x2={-260 * kprog(tache, 0.5, 1)} y2={260 * kprog(tache, 0.5, 1)} /></g>}
  </g>;
}
// Estómago de becerro en 4 cámaras (dentro de la Lupa). El abomaso (4.º) brilla.
function EstomagoBecerro({ T, r, brillo = 1 }) {
  const D = r * 2, p = 0.6 + 0.4 * Math.sin(T * 5);
  return <svg width={D} height={D}><g transform={`translate(${r} ${r}) scale(${r / 250})`}>
    <path d="M -40 -230 C -30 -190 -40 -170 -60 -150" stroke="#e39a9a" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M -200 -60 C -210 -150 -100 -170 -50 -130 C 0 -95 -20 -20 -70 0 C -130 25 -195 10 -200 -60 Z" fill="#c96a6a" stroke="#fff" strokeWidth={7} />
    <ellipse cx={20} cy={-120} rx={48} ry={40} fill="#b45c6a" stroke="#fff" strokeWidth={7} />
    <ellipse cx={-10} cy={30} rx={44} ry={38} fill="#a8506a" stroke="#fff" strokeWidth={7} />
    <path d="M 30 10 C 120 -60 230 0 200 100 C 175 180 60 190 30 120 C 10 80 10 40 30 10 Z" fill={mixHex('#e39a9a', '#ffd166', brillo * p)} stroke="#fff" strokeWidth={9} />
    <path d="M 190 120 C 210 170 170 220 110 230" stroke="#e39a9a" strokeWidth={20} fill="none" strokeLinecap="round" />
    {[['1', -120, -60], ['2', 20, -112], ['3', -10, 40], ['4', 110, 90]].map(([t, tx, ty]) => <text key={t} x={tx} y={ty + 14} textAnchor="middle" style={{ font:`400 ${t === '4' ? 80 : 48}px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={t === '4' ? 6 : 4}>{t}</text>)}
  </g></svg>;
}
// Estómago de becerro, chiquito y "doblado" (para la escena de la escasez).
function EstomaguitoMini({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -60 -10 C -60 -60 20 -70 40 -30 C 70 20 30 60 -10 55 C -50 50 -60 30 -60 -10 Z" fill="#e39a9a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 -10 q 20 -20 50 0" stroke="#b45c6a" strokeWidth={5} fill="none" />
  </g>;
}
// Quimosina: proteína de dos lóbulos con una hendidura (sitio activo). abre 0..1 = la "tijera" se abre.
function Quimosina({ x, y, s = 1, abre = 0.3, rot = 0, brillo = 0 }) {
  const a = 6 + abre * 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle r={110} fill={QUI} opacity={0.35 * brillo} />}
    <g transform={`rotate(${-a})`}><path d="M 0 -6 C -20 -80 -110 -80 -100 -10 C -95 20 -40 20 0 -6 Z" fill={QUI} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-62} cy={-34} r={7} fill="#fff" opacity=".6" /></g>
    <g transform={`rotate(${a})`}><path d="M 0 6 C -20 80 -110 80 -100 10 C -95 -20 -40 -20 0 6 Z" fill="#7d3fd0" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" /></g>
    <circle cx={6} cy={0} r={12} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Micela de caseína: esfera con subunidades y una capa de "pelitos" (κ-caseína). pelos 0..1 (1 = completos), cortados: fracción sin pelo.
function Micela({ T = 0, x, y, r = 60, pelos = 1, seed = 1, o = 1, gris = 0 }) {
  const R = krng(seed), n = Math.round(r * 0.55);
  const sub = Array.from({ length: 10 }, () => [(R() - 0.5) * r * 1.2, (R() - 0.5) * r * 1.2, r * (0.18 + R() * 0.12)]);
  const hs = Array.from({ length: n }, (_, i) => [i / n * Math.PI * 2 + R() * 0.1, R()]);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {hs.map(([a, k], i) => { if (k > pelos) return null; const w = mece(T, seed * 31 + i, 0.8) * 0.18, L = r * 0.42;
      const x0 = Math.cos(a) * r, y0 = Math.sin(a) * r, x1 = Math.cos(a + w) * (r + L), y1 = Math.sin(a + w) * (r + L);
      return <g key={i}><line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KAPPA} strokeWidth={Math.max(3, r / 18)} strokeLinecap="round" /><circle cx={x1} cy={y1} r={Math.max(3, r / 16)} fill={KAPPA} /></g>; })}
    <circle r={r} fill={mixHex('#f6e6b8', '#bfb7a0', gris)} stroke={KC.ink} strokeWidth={Math.max(3, r / 14)} />
    {sub.map(([sx, sy, sr], i) => Math.hypot(sx, sy) < r * 0.7 && <circle key={i} cx={sx} cy={sy} r={sr} fill="#e9d29a" stroke="#c8a860" strokeWidth={2} />)}
    {Array.from({ length: 6 }, (_, i) => <circle key={'c' + i} cx={Math.cos(i * 1.1) * r * 0.45} cy={Math.sin(i * 1.7) * r * 0.45} r={Math.max(2, r / 22)} fill={CA} />)}
  </g>;
}
// Fondo microscópico con partículas.
function FondoMicro({ T, seed = 3 }) {
  return <><div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2a44 0%, ${KC.noche} 75%)` }}></div>
    <Ambiente T={T} n={36} seed={seed} color="rgba(180,220,255,.22)" /></>;
}
// Tanque de fermentación chico.
function Tanque({ T, x, y, s = 1, caldo = '#f0d98a', children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-230} width={260} height={420} rx={60} fill="#c9d1de" stroke={KC.ink} strokeWidth={9} />
    <rect x={-100} y={-150} width={200} height={300} rx={40} fill={caldo} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => { const f = (T * 0.5 + i / 6) % 1; return <circle key={i} cx={-70 + i * 28} cy={130 - f * 260} r={6 + (i % 3) * 3} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - f} />; })}
    {children}
    <path d="M -60 -230 L -60 -270 L 60 -270 L 60 -230" fill="none" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={190} width={30} height={50} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} /><rect x={90} y={190} width={30} height={50} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Aspergillus: conidióforo (tallo, vesícula, fiálides y cadenas de conidios oscuros).
function Aspergillus({ T = 0, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 9, 0.2) * 4})`}>
    <path d="M -90 120 Q -20 100 0 90 Q 30 80 90 110" stroke="#eaf6ff" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 0 90 L 0 -40" stroke="#eaf6ff" strokeWidth={12} strokeLinecap="round" />
    <circle cx={0} cy={-60} r={30} fill="#eaf6ff" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 11 }, (_, i) => { const a = -Math.PI + (i / 10) * Math.PI;
      return <g key={i}>{Array.from({ length: 4 }, (_, k) => <circle key={k} cx={Math.cos(a) * (40 + k * 15)} cy={-60 + Math.sin(a) * (40 + k * 15)} r={7} fill="#2b2622" stroke={KC.ink} strokeWidth={2} />)}</g>; })}
  </g>;
}
// Queso fresco en su plato, desmoronándose (migas).
function QuesoFresco({ T, x, y, s = 1, migas = 1 }) {
  const R = krng(12);
  const ms = Array.from({ length: 14 }, () => [(R() - 0.5) * 420, 70 + R() * 40, 8 + R() * 14]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={110} rx={330} ry={70} fill="#ffffff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={104} rx={270} ry={46} fill="#e8eef5" />
    <path d="M -210 70 L -210 -40 Q 0 -90 210 -40 L 210 70 Q 0 120 -210 70 Z" fill="#fffdf4" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-40} rx={210} ry={52} fill="#fffaf0" stroke={KC.ink} strokeWidth={8} />
    {[[-120, -40], [-40, -60], [60, -30], [130, -50], [-80, 20], [40, 30], [140, 20]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#ece2c6" />)}
    <path d="M 150 -50 L 210 -40 L 210 40 L 140 30 Z" fill="#f6efdc" stroke={KC.ink} strokeWidth={6} />
    {ms.map(([mx, my, mr], i) => i / 14 < migas && <circle key={i} cx={mx + Math.sin(T + i) * 2} cy={my} r={mr} fill="#fffdf4" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Sello de aprobación.
function Sello({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  const k = klerp(2.2, 1, kEase.sale(kclamp(p, 0, 1)));
  return <g transform={`translate(${x} ${y}) scale(${s * k}) rotate(-12)`} opacity={kclamp(p * 2, 0, 1)}>
    <circle r={120} fill="none" stroke={KC.red} strokeWidth={12} />
    <circle r={96} fill="none" stroke={KC.red} strokeWidth={5} />
    <text y={-10} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red}>FDA</text>
    <text y={44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>1990</text>
  </g>;
}

function Quimosina10() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Le: CUES.Leche, Be: CUES.Becerro, Es: CUES.Escasez, En: CUES.Enzima, Mi: CUES.Micelas, Pe: CUES.Pelitos, Ti: CUES.Tijera,
    Cu: CUES.Cuajada, Pr: CUES.Pregunta, Ge: CUES.Gen, St: CUES.Estudio, Ho: CUES.Hoy, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gotas del gancho
  const gotas = (t0, t1) => <Goteo T={T} x={420} y0={790} y1={900} cada={0.5} color="#f0d98a" desde={t0} hasta={t1} r={13} />;
  // collar de κ-caseína (escena Tijera): 169 cuentas
  const corte = K.Ti + 1.9, vuela = kprog(T, corte + 0.2, K.Cu, kEase.suave);
  const cuenta = (i) => { const u = i / 168, cx = 250 + u * 760, cy = 860 + Math.sin(u * Math.PI * 4 + T * 1.5) * 50;
    if (i >= 105 && T > corte) return [cx + vuela * 260, cy + vuela * 330 + Math.sin(T * 2 + i * 0.1) * 10];
    return [cx, cy]; };
  // red de cuajada (escena Cuajada): micelas que se juntan
  const R = krng(44);
  const red = Array.from({ length: 16 }, (_, i) => { const gx = 220 + (i % 4) * 210, gy = 640 + Math.floor(i / 4) * 170;
    return { x0: gx + (R() - 0.5) * 380, y0: gy + (R() - 0.5) * 300, x1: gx + (Math.floor(i / 4) % 2) * 60, y1: gy, ph: R() * 6 }; });
  const junta = kprog(T, K.Cu + 0.5, K.Cu + 2.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco de cuajo gotea en la olla; el becerro se tacha y aparece el microbio */}
      <Escena T={T} a={K.G} b={K.Le} zoom={0.04}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa>
          <Olla T={T} x={420} y={1070} s={0.95} />
          <FrascoCuajo x={210} y={680} s={0.85} inclina={-8} />
          <Gotero x={420} y={790} s={0.9} aprieta={Math.max(0, Math.sin(T * 12.5))} />
          {gotas(K.G, K.Le)}
          <Becerro T={T} x={800} y={1010} s={0.42} tache={kprog(T, K.G + 1.0, K.G + 1.7)} o={1 - kprog(T, K.G + 2.0, K.G + 2.4)} silueta />
          {T > K.G + 2.1 && <g transform={`translate(810 1000) scale(${kEase.rebote(kprog(T, K.G + 2.1, K.G + 2.6))})`}>
            <Bacteria T={T} x={0} y={0} largo={260} ancho={100} rot={-12} color="#7fd88a" seed={3} /></g>}
        </Capa>
      </Escena>
      {/* 1 · la leche se cuaja (time-lapse) */}
      <Escena T={T} a={K.Le} b={K.Be} zoom={0.08} origen="40% 55%">
        <FondoMarca T={T} color={KC.yellow} />
        <Capa>
          <Olla T={T} x={500} y={1000} s={1.25} cuaja={kprog(T, K.Le + 0.2, K.Le + 1.3)} corta={kprog(T, K.Le + 1.2, K.Le + 2.0)} suero={kprog(T, K.Le + 1.7, K.Le + 2.3)} />
          {T > K.Le + 1.1 && <g transform={`translate(${klerp(240, 760, kprog(T, K.Le + 1.2, K.Le + 2.0))} 760) rotate(30)`}>
            <rect x={-12} y={-200} width={24} height={170} rx={10} fill="#c58b54" stroke={KC.ink} strokeWidth={6} />
            <path d="M -16 -40 L 16 -40 L 10 80 L -10 80 Z" fill="#dfe6ef" stroke={KC.ink} strokeWidth={6} /></g>}
        </Capa>
      </Escena>
      {/* 2 · el cuajo clásico: el cuarto estómago del becerro que aún mama */}
      <Escena T={T} a={K.Be} b={K.Es} zoom={0.04}>
        <FondoMarca T={T} color={KC.pink} />
        <Capa>
          <Becerro T={T} x={430} y={1010} s={0.85} mama={1} mamila />
        </Capa>
        <Lupa T={T} at={K.Be + 1.1} until={K.Es - 0.25} x={320} y={520} r={210} fx={480} fy={1030} tinte={KC.yellow} etiqueta="POR DENTRO · ESTÓMAGO"
          interior={(t, r) => <EstomagoBecerro T={t} r={r} />} />
      </Escena>
      {/* 3 · no alcanzaban */}
      <Escena T={T} a={K.Es} b={K.En} zoom={0.05}>
        <FondoMarca T={T} color={KC.mint} />
        <Capa>
          {Array.from({ length: 12 }, (_, i) => { const p = kprog(T, K.Es + 0.1 + i * 0.16, K.Es + 0.4 + i * 0.16, kEase.rebote);
            return p > 0 && <g key={i} transform={`translate(${150 + (i % 4) * 160} ${700 + Math.floor(i / 4) * 170}) scale(${0.26 * p})`}><Olla T={T} x={0} y={0} vapor={0} /></g>; })}
          <rect x={790} y={640} width={220} height={540} rx={30} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
          <text x={900} y={700} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>estómagos</text>
          {[0, 1, 2].map((i) => <EstomaguitoMini key={i} x={900} y={1100 - i * 120} s={1.1} o={1 - kprog(T, K.Es + 1.6 + i * 0.3, K.Es + 1.9 + i * 0.3) * 0.6} />)}
        </Capa>
        <Medidor T={T} at={K.Es + 0.4} until={K.En - 0.3} valor={(t) => 1 - 0.75 * kprog(t, K.Es + 0.6, K.Es + 2.4)} etiqueta="cuajo de becerro" texto={(v) => (v > 0.5 ? 'alcanza' : 'no alcanza')} color={KC.red} y={460} />
      </Escena>
      {/* 4 · la enzima: la quimosina dentro de la gota de cuajo */}
      <Escena T={T} a={K.En} b={K.Mi} zoom={0.06}>
        <FondoMarca T={T} color={KC.lilac} />
        <Capa>
          {(() => { const g = kprog(T, K.En, K.En + 0.8, kEase.sale);
            return <g transform={`translate(620 860) scale(${klerp(0.15, 1, g)})`}>
              <path d="M 0 -360 Q 250 -60 250 90 Q 250 300 0 300 Q -250 300 -250 90 Q -250 -60 0 -360 Z" fill="#fff4c8" stroke={KC.ink} strokeWidth={10} opacity=".95" />
              <Quimosina x={0} y={60} s={1.6} abre={Math.abs(Math.sin(T * 3))} brillo={kprog(T, K.En + 0.6, K.En + 1.2)} />
            </g>; })()}
        </Capa>
        <Etq T={T} at={K.En + 0.9} until={K.Mi - 0.3} x={900} y={1440} texto="quimosina (enzima)" lado="izq" color={KC.ink} tam={36} />
      </Escena>
      {/* 5 · al microscopio: las micelas de caseína */}
      <Escena T={T} a={K.Mi} b={K.Pe} zoom={0.04}>
        <FondoMarca T={T} color={KC.cyan} />
        <Capa><Olla T={T} x={540} y={1120} s={0.8} /></Capa>
        <Lupa T={T} at={K.Mi + 0.1} until={K.Pe + 0.2} x={540} y={720} r={340} fx={540} fy={990} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · LECHE"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={KC.noche} />
            {[[200, 220, 70, 1], [450, 190, 60, 2], [330, 400, 80, 3], [130, 470, 55, 4], [530, 450, 62, 5], [300, 590, 50, 6], [560, 640, 45, 7], [110, 260, 40, 8]].map(([mx, my, mr, sd]) =>
              <Micela key={sd} T={t} x={mx + mece(t, sd, 0.3) * 14} y={my + mece(t, sd + 9, 0.3) * 14} r={mr} seed={sd} />)}</svg>} />
        {T > K.Mi + 0.6 && T < K.Pe + 0.2 && <Escala T={T} z={1} pxPorMm={800000} x={60} y={1430} />}
      </Escena>
      {/* 6 · los pelitos de κ-caseína no dejan que se peguen */}
      <Escena T={T} a={K.Pe} b={K.Ti} zoom={0.03}>
        <FondoMicro T={T} seed={7} />
        <Capa>
          {(() => { const c = (T - K.Pe) % 2.0, d = c < 1 ? klerp(240, 168, kEase.suave(c)) : klerp(168, 240, kEase.suave(c - 1));
            const choque = c > 0.85 && c < 1.15;
            return <g>
              <Micela T={T} x={540 - d} y={850} r={130} seed={11} />
              <Micela T={T} x={540 + d} y={850} r={130} seed={12} />
              {choque && <text x={540} y={700} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KAPPA} stroke={KC.ink} strokeWidth={4}>¡boing!</text>}
            </g>; })()}
        </Capa>
        <Etq T={T} at={K.Pe + 0.6} until={K.Ti - 0.3} x={250} y={620} texto="κ-caseína" color={KAPPA} tam={40} />
        <Escala T={T} z={1} pxPorMm={1300000} x={60} y={1430} />
      </Escena>
      {/* 7 · la quimosina corta entre el aminoácido 105 y el 106 */}
      <Escena T={T} a={K.Ti} b={K.Cu} zoom={0.03}>
        <FondoMicro T={T} seed={9} />
        <Capa>
          <Micela T={T} x={140} y={860} r={150} seed={13} pelos={0.3} />
          {Array.from({ length: 168 }, (_, i) => { if (i === 104 && T > corte) return null; const [x1, y1] = cuenta(i), [x2, y2] = cuenta(i + 1);
            return <line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8f0ff" strokeWidth={4} opacity={i >= 105 ? 1 - vuela * 0.5 : 1} />; })}
          {Array.from({ length: 169 }, (_, i) => { const [cx, cy] = cuenta(i), esp = i === 104 || i === 105, on = kprog(T, K.Ti + i * 0.004, K.Ti + 0.2 + i * 0.004);
            return on > 0 && <circle key={i} cx={cx} cy={cy} r={esp ? 15 : 8} fill={i === 104 ? KC.gold2 : i === 105 ? KC.cyan : i < 105 ? KAPPA : '#ffd6e2'} stroke={KC.ink} strokeWidth={esp ? 4 : 1.5} opacity={(i > 105 ? 1 - vuela * 0.5 : 1) * on} />; })}
          {(() => { const [ax, ay] = cuenta(104), [bx, by] = cuenta(105), mx = (ax + bx) / 2, my = (ay + by) / 2;
            const llega = kprog(T, K.Ti + 0.6, K.Ti + 1.6, kEase.suave);
            return <Quimosina x={klerp(mx - 40, mx - 40, llega)} y={klerp(my - 420, my - 70, llega)} s={0.9} rot={90} abre={T < corte ? 0.4 + 0.6 * Math.abs(Math.sin(T * 4)) : 0} brillo={T > corte && T < corte + 0.5 ? 1 : 0} />; })()}
          {(() => { const [ax, ay] = cuenta(104); return <text x={ax - 30} y={ay + 80} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2} opacity={kprog(T, K.Ti + 1.2, K.Ti + 1.5)}>105</text>; })()}
          {(() => { const [bx, by] = cuenta(105); return <text x={bx + 30} y={by + 80} style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan} opacity={kprog(T, K.Ti + 1.2, K.Ti + 1.5)}>106</text>; })()}
        </Capa>
        <Chip T={T} at={K.Ti + 0.3} until={corte - 0.1} texto="κ-caseína: 169 eslabones" y={1500} tam={40} borde={KAPPA} />
        <Chip T={T} at={corte} until={K.Cu - 0.3} texto="✂ entre el 105 y el 106" y={1500} tam={48} borde={QUI} />
        <Etq T={T} at={corte + 0.9} until={K.Cu - 0.3} x={600} y={1200} texto="se va: 106–169" color="#ffd6e2" tam={32} />
      </Escena>
      {/* 8 · sin pelitos, con calcio, la cuajada */}
      <Escena T={T} a={K.Cu} b={K.Pr} zoom={0.06}>
        <FondoMicro T={T} seed={11} />
        <Capa>
          {red.map((m, i) => i % 4 !== 3 && <line key={'r' + i} x1={klerp(m.x0, m.x1, junta)} y1={klerp(m.y0, m.y1, junta)} x2={klerp(red[i + 1].x0, red[i + 1].x1, junta)} y2={klerp(red[i + 1].y0, red[i + 1].y1, junta)} stroke={CA} strokeWidth={6} opacity={kprog(junta, 0.7, 1)} />)}
          {red.map((m, i) => i < 12 && <line key={'v' + i} x1={klerp(m.x0, m.x1, junta)} y1={klerp(m.y0, m.y1, junta)} x2={klerp(red[i + 4].x0, red[i + 4].x1, junta)} y2={klerp(red[i + 4].y0, red[i + 4].y1, junta)} stroke={CA} strokeWidth={6} opacity={kprog(junta, 0.7, 1)} />)}
          {[[330, 760], [760, 900], [480, 1080]].map(([fx, fy], i) => <circle key={'g' + i} cx={fx} cy={fy} r={44} fill="#ffe08a" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Cu + 2.6, K.Cu + 3.2)} />)}
          {red.map((m, i) => <Micela key={i} T={T} x={klerp(m.x0, m.x1, junta) + Math.sin(T + m.ph) * 6 * (1 - junta)} y={klerp(m.y0, m.y1, junta) + Math.cos(T + m.ph) * 6 * (1 - junta)} r={62} seed={20 + i} pelos={0} gris={0.15} />)}
          {red.map((m, i) => i % 4 !== 3 && <g key={'ca' + i} opacity={kprog(junta, 0.8, 1)}><circle cx={(klerp(m.x0, m.x1, 1) + klerp(red[i + 1].x0, red[i + 1].x1, 1)) / 2} cy={(m.y1 + red[i + 1].y1) / 2} r={14 + Math.sin(T * 6 + i) * 3} fill={CA} stroke={KC.ink} strokeWidth={3} /></g>)}
        </Capa>
        <Chip T={T} at={K.Cu + 0.4} until={K.Pr - 0.3} texto="sin pelitos + calcio → cuajada" y={1500} tam={40} borde={CA} />
        <Etq T={T} at={K.Cu + 2.0} until={K.Pr - 0.3} x={150} y={560} texto="Ca²⁺" color={CA} tam={40} />
        <Etq T={T} at={K.Cu + 2.8} until={K.Pr - 0.3} x={820} y={560} texto="grasa atrapada" lado="izq" color="#ffe08a" tam={32} />
      </Escena>
      {/* 9 · re-gancho: ¿cómo hace un microbio una enzima de becerro? */}
      <Escena T={T} a={K.Pr} b={K.Ge} zoom={0.1}>
        <FondoMarca T={T} color={KC.cyan} />
        <Capa>
          <Bacteria T={T} x={790} y={900} largo={360} ancho={140} rot={-70 + Math.sin(T * 2) * 6} color="#7fd88a" seed={5} />
          <text x={810} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 8} 810 560)`}>?</text>
        </Capa>
      </Escena>
      {/* 10 · una copia del gen del becerro entra a E. coli; la enzima se queda ADENTRO */}
      <Escena T={T} a={K.Ge} b={K.St} zoom={0.04}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa>
          <Becerro T={T} x={230} y={640} s={0.38} />
          {(() => { const v = kprog(T, K.Ge + 0.6, K.Ge + 2.0, kEase.suave), x = klerp(260, 470, v), y = klerp(560, 980, v), o = 1 - kprog(T, K.Ge + 2.0, K.Ge + 2.3);
            return o > 0 && <g transform={`translate(${x} ${y}) rotate(${klerp(0, 30, v)}) scale(0.9)`} opacity={o}><ADNHebra T={T} x={-150} y={0} largo={300} alto={60} vueltas={2} resalta={() => true} /></g>; })()}
          {(() => { const [L, W] = [640, 250];
            return <Bacteria T={T} x={620} y={970} largo={L} ancho={W} rot={-8} color="#7fd88a" seed={7} adentro={() => <g>
              <circle cx={-150} cy={10} r={44} fill="none" stroke={KC.red} strokeWidth={10} opacity={kprog(T, K.Ge + 2.0, K.Ge + 2.4)} />
              <circle cx={-150} cy={10} r={44} fill="none" stroke={KC.gold2} strokeWidth={10} strokeDasharray="40 240" opacity={kprog(T, K.Ge + 2.0, K.Ge + 2.4)} />
              {Array.from({ length: 9 }, (_, i) => { const p = kprog(T, K.Ge + 2.6 + i * 0.2, K.Ge + 2.9 + i * 0.2);
                const gx = i < 5 ? 90 + (i % 3) * 30 : 180 + (i % 2) * 30, gy = i < 5 ? -30 + Math.floor(i / 3) * 40 : -10 + (i % 2) * 40;
                return p > 0 && <Quimosina key={i} x={gx} y={gy} s={0.26 * p} rot={i * 40} abre={0.2} />; })}
              <ellipse cx={120} cy={0} rx={70} ry={52} fill="none" stroke="#5b2c9a" strokeWidth={4} strokeDasharray="8 8" opacity={kprog(T, K.Ge + 3.8, K.Ge + 4.2)} />
            </g>} />; })()}
        </Capa>
        <Etq T={T} at={K.Ge + 0.8} until={K.St - 0.3} x={140} y={480} texto="gen de la quimosina (copia)" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Ge + 1.6} until={K.St - 0.3} x={900} y={1420} texto="Escherichia coli K-12" it lado="izq" color={KC.ink} tam={32} />
        <Chip T={T} at={K.Ge + 3.4} until={K.St - 0.3} texto="la guarda adentro, en grumos" y={1530} tam={38} borde={QUI} />
      </Escena>
      {/* 11 · marzo de 1990: la FDA aprueba la quimosina de bacterias */}
      <Escena T={T} a={K.St} b={K.Ho} zoom={0.04}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <Capa>
          <Bacteria T={T} x={300} y={1010} largo={300} ancho={120} rot={-15} color="#7fd88a" seed={9} />
          <QuesoFresco T={T} x={700} y={1020} s={0.75} migas={0} />
          <Sello x={760} y={860} s={0.9} p={kprog(T, K.St + 2.2, K.St + 2.6)} />
        </Capa>
        <TarjetaEstudio T={T} at={K.St + 0.2} until={K.Ho - 0.3} anio="1990" quien="marzo · FDA, EE. UU." revista="quimosina de E. coli K-12" y={600} />
        <Chip T={T} at={K.St + 1.0} until={K.St + 4.4} texto="1.ª aprobación de un ingrediente" y={1470} tam={36} borde={KC.gold} />
        <Chip T={T} at={K.St + 1.3} until={K.St + 4.4} texto="hecho con ADN recombinante" y={1560} tam={36} borde={KC.gold} />
      </Escena>
      {/* 12 · después: levaduras y mohos; hoy, muy común */}
      <Escena T={T} a={K.Ho} b={K.Ci} zoom={0.04}>
        <FondoMarca T={T} color={KC.mint} />
        <Capa>
          {[0, 1, 2].map((i) => { const p = kprog(T, K.Ho + 0.2 + i * 0.6, K.Ho + 0.7 + i * 0.6, kEase.rebote);
            return p > 0 && <g key={i} transform={`translate(${190 + i * 350} 820) scale(${0.8 * p})`}>
              <Tanque T={T} x={0} y={0} caldo={['#c8f0c8', '#f0d98a', '#e6e0d0'][i]}>
                {i === 0 && <Bacteria T={T} x={0} y={0} largo={150} ancho={60} rot={-20} color="#7fd88a" seed={2} />}
                {i === 1 && <><Levadura T={T} x={-10} y={10} r={52} brote={0.8} seed={3} />
                  {[0, 1, 2].map((k) => { const f = ((T - K.Ho) * 0.6 + k / 3) % 1; return <Quimosina key={k} x={40 + f * 40} y={-30 - f * 100} s={0.2} rot={k * 60} />; })}</>}
                {i === 2 && <><Aspergillus T={T} x={0} y={0} s={0.8} />
                  {[0, 1, 2].map((k) => { const f = ((T - K.Ho) * 0.6 + k / 3) % 1; return <Quimosina key={k} x={-60 + k * 50} y={60 + f * 70} s={0.2} rot={k * 70} />; })}</>}
              </Tanque></g>; })}
        </Capa>
        <Etq T={T} at={K.Ho + 0.5} until={K.Ci - 0.3} x={40} y={1090} texto="E. coli" it color={KC.ink} tam={28} />
        <Etq T={T} at={K.Ho + 1.1} until={K.Ci - 0.3} x={390} y={1090} texto="K. lactis" it color={KC.ink} tam={28} />
        <Etq T={T} at={K.Ho + 1.7} until={K.Ci - 0.3} x={740} y={1090} texto="A. niger" it color={KC.ink} tam={28} />
        <Chip T={T} at={K.Ho + 2.2} until={K.Ci - 0.3} texto="hoy: uso muy común" y={1500} tam={44} borde={KC.gold} />
      </Escena>
      {/* 13 · cierre: la misma olla, ya hecha queso fresco */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa>
          <QuesoFresco T={T} x={540} y={980} s={1.05} migas={kprog(T, K.Ci + 0.5, K.Ci + 2.5)} />
          <Becerro T={T} x={170} y={720} s={0.3} o={kprog(T, K.Ci + 1.2, K.Ci + 1.6)} />
          <g opacity={kprog(T, K.Ci + 1.8, K.Ci + 2.2)}><Bacteria T={T} x={860} y={760} largo={180} ancho={70} rot={-20} color="#7fd88a" seed={4} /></g>
          <FlechaCurva x1={290} y1={700} x2={760} y2={720} p={kprog(T, K.Ci + 2.0, K.Ci + 2.8)} curva={-90} color={QUI} T={T} />
        </Capa>
        <Chip T={T} at={K.Ci + 2.8} until={K.Ou} texto="enzima de becerro · hecha por microbios" y={1500} tam={34} borde={QUI} />
      </Escena>

      {/* textos globales */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.G + 3.6} texto="¿del estómago de un becerro?" x={330} y={470} tam={34} />
      <Chip T={T} at={K.Le + 0.3} until={K.Be - 0.3} texto="leche → cuajada" y={1500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Be + 1.6} until={K.Es - 0.3} texto="4.º estómago = abomaso" y={1500} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Mi + 0.8} until={K.Pe - 0.2} texto="caseína en micelas" y={1500} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Pe + 0.8} until={K.Ti - 0.3} texto="los pelitos las separan" y={1500} tam={40} borde={KAPPA} />
      <Chip T={T} at={K.Pr + 0.4} until={K.Ge - 0.2} texto="¿enzima de becerro en un microbio?" y={1500} tam={34} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Le - 0.1} texto="No fue un becerro: *fue un microbio.*" />
      <Subtitulo T={T} idx={1} at={K.Le + 0.1} until={K.Be - 0.1} texto="Unas gotas y *se cuaja.*" />
      <Subtitulo T={T} idx={2} at={K.Be + 0.1} until={K.Es - 0.1} texto="Del *cuarto estómago* del becerro." />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.En - 0.1} texto="Pero *no alcanzaban.*" />
      <Subtitulo T={T} idx={4} at={K.En + 0.1} until={K.Mi - 0.1} texto="Lo que cuaja: *la quimosina.*" />
      <Subtitulo T={T} idx={5} at={K.Mi + 0.1} until={K.Pe - 0.1} texto="Bolitas de caseína: *micelas.*" />
      <Subtitulo T={T} idx={6} at={K.Pe + 0.1} until={K.Ti - 0.1} texto="Los pelitos *las separan.*" />
      <Subtitulo T={T} idx={7} at={K.Ti + 0.1} until={K.Cu - 0.1} texto="Corta entre el *105 y el 106.*" />
      <Subtitulo T={T} idx={8} at={K.Cu + 0.1} until={K.Pr - 0.1} texto="Con calcio: *la cuajada.*" />
      <Subtitulo T={T} idx={9} at={K.Pr + 0.1} until={K.Ge - 0.1} texto="¿Cómo lo hace *un microbio?*" />
      <Subtitulo T={T} idx={10} at={K.Ge + 0.1} until={K.St - 0.1} texto="Una copia del *gen del becerro.*" />
      <Subtitulo T={T} idx={11} at={K.St + 0.1} until={K.Ho - 0.1} texto="1990: *primera aprobación.*" />
      <Subtitulo T={T} idx={12} at={K.Ho + 0.1} until={K.Ci - 0.1} texto="Levaduras y mohos: *muy común.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="De becerro, *hecha por microbios.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Becerro + 0.6, CUES.Escasez - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Enzima + 0.2, CUES.Micelas - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Tijera + 0.4, CUES.Cuajada - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Gen + 0.6, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Estudio + 4.6, CUES.Hoy - 0.2, 'avatar_02_apuntando_camara', 'presentador-bajo'],
        [CUES.Hoy + 0.5, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function QuimosinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Quimosina10 /></CompositionStage></div>;
}
window.QuimosinaApp = QuimosinaApp;
