// Shot Químico #34 · Esas estrellitas no son radiactivas (fosforescencia: luz guardada en trampas) — NARRADO (N1 por dentro + N5 Matsuzawa 1996).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VERDE = '#7dff9a', VERDE2 = '#2fe07a', PLASTICO = '#eef6cf', EU = '#39e07a', DY = KC.orange, CARGA = '#ffffff', RA = '#c04bff';

// Estrella de 5 picos (path centrado en 0,0).
function estrellaD(r1, r2 = r1 * 0.48) {
  return Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? r2 : r1;
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }).join(' ') + ' Z';
}
// Estrellita de plástico. luz 0..1 = cuánto brilla (0 = de día, color plástico).
function Estrellita({ x, y, r = 60, rot = 0, luz = 0, o = 1 }) {
  const c = mixHex(PLASTICO, VERDE, luz);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {luz > 0.02 && <path d={estrellaD(r * 1.25)} fill={VERDE} opacity={0.45 * luz} filter="url(#brillo)" />}
    <path d={estrellaD(r)} fill={c} stroke={luz > 0.5 ? '#1c6b3a' : KC.ink} strokeWidth={Math.max(4, r / 10)} strokeLinejoin="round" />
    <path d={estrellaD(r * 0.45)} fill="#fff" opacity={0.25 + 0.2 * luz} />
  </g>;
}
function Luna({ x, y, r = 80, luz = 0 }) {
  const c = mixHex(PLASTICO, VERDE, luz);
  return <g transform={`translate(${x} ${y})`}>
    {luz > 0.02 && <circle r={r * 1.2} fill={VERDE} opacity={0.35 * luz} filter="url(#brillo)" />}
    <path d={`M ${r * 0.2} ${-r} A ${r} ${r} 0 1 0 ${r * 0.2} ${r} A ${r * 0.75} ${r * 0.75} 0 1 1 ${r * 0.2} ${-r} Z`} fill={c} stroke={luz > 0.5 ? '#1c6b3a' : KC.ink} strokeWidth={8} />
  </g>;
}
function Defs() {
  return <defs>
    <filter id="brillo" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="14" /></filter>
    <filter id="brillo2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>;
}
// Símbolo de radiactividad.
function Trebol({ x, y, r = 70, o = 1 }) {
  const aspa = (a) => { const a0 = (a - 30) * Math.PI / 180, a1 = (a + 30) * Math.PI / 180, ri = r * 0.28, re = r;
    return `M ${Math.cos(a0) * ri} ${Math.sin(a0) * ri} L ${Math.cos(a0) * re} ${Math.sin(a0) * re} A ${re} ${re} 0 0 1 ${Math.cos(a1) * re} ${Math.sin(a1) * re} L ${Math.cos(a1) * ri} ${Math.sin(a1) * ri} A ${ri} ${ri} 0 0 0 ${Math.cos(a0) * ri} ${Math.sin(a0) * ri} Z`; };
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r * 1.18} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    {[-90, 30, 150].map((a) => <path key={a} d={aspa(a)} fill={KC.ink} />)}
    <circle r={r * 0.18} fill={KC.ink} />
  </g>;
}
function Tache({ x, y, r = 90, p = 1 }) {
  if (p <= 0) return null;
  return <g stroke={KC.red} strokeWidth={22} strokeLinecap="round">
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * Math.min(1, p * 2)} y2={y - r + 2 * r * Math.min(1, p * 2)} />
    {p > 0.5 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * (p - 0.5) * 2} y2={y - r + 2 * r * (p - 0.5) * 2} />}
  </g>;
}
// Apagador en la pared.
function Apagador({ x, y, on }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-55} y={-85} width={110} height={170} rx={16} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <rect x={-22} y={-45} width={44} height={90} rx={10} fill="#ddd6c8" stroke={KC.ink} strokeWidth={6} />
    <rect x={-18} y={on ? -42 : 4} width={36} height={38} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Foco que cuelga del techo. on 0..1.
function Foco({ x, y, on = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={-400} x2={0} y2={-70} stroke={KC.ink} strokeWidth={7} />
    {on > 0.02 && <circle cy={20} r={120} fill="#fff6a8" opacity={0.6 * on} filter="url(#brillo)" />}
    <rect x={-26} y={-75} width={52} height={40} rx={6} fill="#8a94a6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -26 -36 Q -70 0 -50 40 Q -30 80 0 82 Q 30 80 50 40 Q 70 0 26 -36 Z" fill={mixHex('#d8d2c4', '#fff6a8', on)} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Sol chiquito.
function Sol({ x, y, r = 50, T = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 30})`} opacity={o}>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={r + 10} x2={0} y2={r + 34} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Techo con estrellitas (gancho y cierre).
const TECHO = [[140, 560, 46, 10], [330, 470, 30, -14], [470, 690, 58, 8], [700, 600, 40, 22], [900, 520, 34, -6], [960, 760, 52, 14], [180, 860, 38, -20],
  [380, 960, 64, 4], [640, 880, 34, -12], [820, 1010, 44, 18], [120, 1140, 30, 6], [560, 1160, 46, -8], [960, 1180, 32, 12], [300, 1240, 26, 30], [760, 1260, 28, -24]];
function Techo({ T, luz, s = 1 }) {
  return <g>
    {TECHO.map(([x, y, r, rot], i) => <Estrellita key={i} x={x} y={y} r={r * s} rot={rot} luz={luz * (0.85 + 0.15 * Math.sin(T * 2 + i))} />)}
    <Luna x={640} y={400} r={70} luz={luz} />
  </g>;
}

// Red del cristal (micro). Sitios de europio (verde) y trampas de disprosio (naranja).
const RED = (() => { const p = []; for (let f = 0; f < 6; f++) for (let c = 0; c < 8; c++) p.push([120 + c * 120 + (f % 2) * 60, 500 + f * 124]); return p; })();
const EUS = [[180, 624], [600, 500], [420, 996], [840, 872]];
const DYS = [[420, 624], [900, 624], [180, 872], [660, 996]];
// carga k: sale de EUS[k % 4], cae en DYS[k % 4] (con un pequeño desfase) y regresa a su europio.
const CARGAS = Array.from({ length: 8 }, (_, k) => ({ e: EUS[k % 4], d: DYS[(k + (k > 3 ? 1 : 0)) % 4], off: k > 3 ? 18 : -18, k }));
function Red({ T, K }) {
  const luzOn = kprog(T, K.Ca - 0.2, K.Ca + 0.4) * (1 - kprog(T, K.Su, K.Su + 0.6));
  const salir = (k) => K.Ca + 0.5 + k * 0.32, caer = (k) => K.Tr + 0.2 + k * 0.32, volver = (k) => K.Su + 1.0 + [0, 2.6, 0.7, 3.4, 1.5, 4.1, 2.1, 3.9][k];
  const trapped = CARGAS.filter((c) => T > caer(c.k) + 0.6 && T < volver(c.k) + 0.5).length;
  return <g>
    {RED.map(([x, y], i) => <g key={i}>
      {RED.slice(i + 1).filter(([x2, y2]) => Math.hypot(x2 - x, y2 - y) < 140).map(([x2, y2], j) => <line key={j} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(160,190,255,.22)" strokeWidth={4} />)}
    </g>)}
    {RED.map(([x, y], i) => <circle key={'a' + i} cx={x + Math.sin(T * 7 + i) * (K.Su < T ? 2.5 : 1)} cy={y} r={i % 3 ? 13 : 19} fill={i % 3 ? '#8d99b8' : '#d4dbec'} stroke={KC.ink} strokeWidth={3} />)}
    {/* trampas (pozos) junto al disprosio */}
    {DYS.map(([x, y], i) => { const o = kprog(T, K.Tr - 0.1 + i * 0.15, K.Tr + 0.4 + i * 0.15);
      return <g key={'d' + i}>
        <ellipse cx={x} cy={y + 8} rx={70 * o + 1} ry={30 * o + 1} fill="#05070d" stroke={DY} strokeWidth={6} opacity={o} />
        <Atomo x={x} y={y - 44} r={26} color={DY} letra="Dy" tam={20} />
      </g>; })}
    {/* europio, con su destello */}
    {EUS.map(([x, y], i) => { const fl = CARGAS.filter((c) => c.e === EUS[i]).reduce((m, c) => Math.max(m, Math.exp(-Math.max(0, T - volver(c.k) - 0.5) * 3) * (T > volver(c.k) + 0.5 ? 1 : 0)), 0);
      return <g key={'e' + i}>
        {fl > 0.02 && <circle cx={x} cy={y} r={70 + 60 * fl} fill={VERDE} opacity={0.8 * fl} filter="url(#brillo)" />}
        <Atomo x={x} y={y} r={30} color={EU} letra="Eu" tam={22} />
      </g>; })}
    {/* luz que entra */}
    {luzOn > 0.01 && [140, 380, 620, 860].map((x, i) => { const pts = Array.from({ length: 13 }, (_, j) => `${x + Math.sin(j * 1.3 - T * 8 + i) * 18} ${300 + j * 70}`).join(' L ');
      return <path key={'l' + i} d={`M ${pts}`} fill="none" stroke={i % 2 ? '#b18cff' : '#ffe11a'} strokeWidth={9} strokeLinecap="round" opacity={0.75 * luzOn} strokeDasharray="40 22" strokeDashoffset={-T * 260} />; })}
    {/* cargas */}
    {CARGAS.map((c) => { const t1 = salir(c.k), t2 = caer(c.k), t3 = volver(c.k);
      if (T < t1) return null;
      const [ex, ey] = c.e, dx = c.d[0] + c.off, dy = c.d[1] + 6;
      let x, y;
      const vaga = [(ex + dx) / 2 + Math.sin(c.k * 2.1) * 120, (ey + dy) / 2 - 70 + Math.cos(c.k) * 40];
      if (T < t2) { const p = kprog(T, t1, t1 + 0.8, kEase.sale); x = klerp(ex, vaga[0], p) + Math.sin(T * 5 + c.k) * 16 * p; y = klerp(ey, vaga[1], p) + Math.cos(T * 4 + c.k) * 16 * p; }
      else if (T < t3) { const p = kprog(T, t2, t2 + 0.55, kEase.suave), sac = kprog(T, K.Su, K.Su + 0.5) * 7;
        x = klerp(vaga[0], dx, p) + Math.sin(T * 26 + c.k) * sac; y = klerp(vaga[1], dy, p) - Math.sin(p * Math.PI) * 50 + Math.cos(T * 23 + c.k) * sac; }
      else { const p = kprog(T, t3, t3 + 0.5, kEase.suave); if (p >= 1) return null; x = klerp(dx, ex, p); y = klerp(dy, ey, p) - Math.sin(p * Math.PI) * 90; }
      return <g key={'c' + c.k}>
        <circle cx={x} cy={y} r={22} fill={CARGA} opacity={0.35} filter="url(#brillo2)" />
        <circle cx={x} cy={y} r={13} fill={CARGA} stroke={KC.ink} strokeWidth={3} />
      </g>; })}
    {/* contador de cargas atrapadas */}
    {T > K.Tr + 0.3 && <g opacity={kprog(T, K.Tr + 0.3, K.Tr + 0.6)}>
      <rect x={260} y={1150} width={560} height={70} rx={35} fill="rgba(0,0,0,.6)" stroke={DY} strokeWidth={4} />
      <text x={540} y={1197} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>cargas atrapadas: {trapped}</text>
    </g>}
    {/* escala */}
    <text x={70} y={440} style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.7)">átomos · esquema</text>
  </g>;
}
// Termómetro chico.
function Termo({ x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-20} y={-150} width={40} height={180} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cy={50} r={36} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <rect x={-9} y={-60} width={18} height={100} fill={KC.red} />
  </g>;
}
// Reloj de bolsillo antiguo con números que brillan.
function Reloj({ x, y, s = 1, T, luz = 1 }) {
  const num = [['12', 0, -150], ['3', 150, 0], ['6', 0, 150], ['9', -150, 0]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-250} r={34} fill="none" stroke={KC.gold} strokeWidth={14} />
    <rect x={-26} y={-240} width={52} height={40} rx={8} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <circle r={225} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={195} fill="#1d2233" stroke={KC.ink} strokeWidth={6} />
    {num.map(([t, nx, ny]) => <g key={t}>
      <text x={nx} y={ny + 22} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={VERDE} opacity={0.6 * luz} filter="url(#brillo2)">{t}</text>
      <text x={nx} y={ny + 22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={mixHex('#d8d2c4', VERDE, luz)}>{t}</text>
    </g>)}
    <line x1={0} y1={0} x2={Math.sin(T * 0.5) * 95} y2={-Math.cos(T * 0.5) * 95} stroke={VERDE} strokeWidth={14} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(T * 3) * 140} y2={-Math.cos(T * 3) * 140} stroke={VERDE} strokeWidth={8} strokeLinecap="round" />
    <circle r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Pintora esquemática de perfil (respetuosa, sin rasgos): mira a la izquierda.
function Pintora({ x, y, s = 1, brazo = 0, color = '#6d5a8a' }) {
  // brazo 0 = pincel en la carátula · 1 = pincel en los labios
  const hx = klerp(-150, -46, brazo), hy = klerp(70, -150, brazo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 260 Q -100 40 0 20 Q 110 30 110 260 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-150} r={80} fill="#e7c9a7" stroke={KC.ink} strokeWidth={8} />
    <path d="M -10 -232 Q 90 -240 86 -140 Q 80 -90 40 -80 Q 60 -150 -10 -232 Z" fill="#4a3426" stroke={KC.ink} strokeWidth={6} />
    <circle cx={88} cy={-170} r={30} fill="#4a3426" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 40 60 Q ${(40 + hx) / 2} ${(60 + hy) / 2 + 60} ${hx} ${hy}`} fill="none" stroke={color} strokeWidth={42} strokeLinecap="round" />
    <path d={`M 40 60 Q ${(40 + hx) / 2} ${(60 + hy) / 2 + 60} ${hx} ${hy}`} fill="none" stroke={KC.ink} strokeWidth={50} strokeLinecap="round" opacity={0} />
    <circle cx={hx} cy={hy} r={24} fill="#e7c9a7" stroke={KC.ink} strokeWidth={6} />
    <line x1={hx} y1={hy} x2={hx - 46} y2={hy + 14 - brazo * 10} stroke="#8a5a2b" strokeWidth={9} strokeLinecap="round" />
    <circle cx={hx - 50} cy={hy + 14 - brazo * 10} r={8} fill={VERDE2} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Frasco con polvo que brilla. luz 0..1.
function FrascoLuz({ x, y, luz = 1, etiqueta, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0.02 && <ellipse cx={0} cy={40} rx={150} ry={180} fill={VERDE} opacity={0.6 * luz} filter="url(#brillo)" />}
    <rect x={-70} y={-170} width={140} height={44} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <rect x={-105} y={-126} width={210} height={300} rx={34} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-95} y={10} width={190} height={154} rx={26} fill={mixHex('#3a4250', VERDE, luz)} />
  </g>;
}
// Horno al rojo con crisol.
function Horno({ x, y, T, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-200} width={420} height={400} rx={30} fill="#5a6070" stroke={KC.ink} strokeWidth={10} />
    <rect x={-160} y={-150} width={320} height={260} rx={18} fill="#ff6a1f" stroke={KC.ink} strokeWidth={8} />
    <rect x={-160} y={-150} width={320} height={260} rx={18} fill="#ffd21a" opacity={0.35 + 0.25 * Math.sin(T * 9)} />
    <path d="M -70 30 L 70 30 L 50 100 L -50 100 Z" fill="#e8e2d6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={32} rx={68} ry={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    {[-120, 0, 120].map((dx, i) => <path key={i} d={`M ${dx} -40 Q ${dx + 20} -80 ${dx} -120`} fill="none" stroke="#fff3a0" strokeWidth={8} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(T * 6 + i)} />)}
    <circle cx={150} cy={160} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Lámpara de buró.
function Lampara({ x, y, on = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0.02 && <path d="M -60 -60 L -200 260 L 200 260 L 60 -60 Z" fill="#fff6a8" opacity={0.35 * on} />}
    <rect x={-90} y={300} width={180} height={30} rx={12} fill="#8a94a6" stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={300} x2={60} y2={-120} stroke={KC.ink} strokeWidth={14} />
    <path d="M -100 -60 L 100 -60 L 60 -170 L -60 -170 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform="translate(40 0)" />
    <circle cx={40} cy={-50} r={26} fill={mixHex('#d8d2c4', '#fff6a8', on)} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Pila({ x, y, f = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-40} width={180} height={80} rx={14} fill="#1d2233" stroke={KC.ink} strokeWidth={7} />
    <rect x={90} y={-16} width={16} height={32} rx={4} fill={KC.ink} />
    <rect x={-80} y={-30} width={160 * f} height={60} rx={8} fill={VERDE2} />
  </g>;
}

function Estrellitas34() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Ca: CUES.Carga, Tr: CUES.Trampas, Su: CUES.Suelta, Pr: CUES.Pregunta, Ra: CUES.Radio, Pi: CUES.Pintoras, Es: CUES.Estudio, Cu: CUES.Curioso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: clic del apagador a 0.35 s
  const apaga = kprog(T, K.G + 0.35, K.G + 0.85, kEase.suave);
  const on = T < K.G + 0.35;
  // estudio: horas simuladas 0 → 24
  const hrs = 24 * kprog(T, K.Es + 4.6, K.Es + 8.6, kEase.suave);
  const luzSr = T < K.Es + 3.6 ? 0 : kprog(T, K.Es + 3.6, K.Es + 4.0) * (0.25 + 0.75 * Math.exp(-hrs / 6));
  const luzZn = T < K.Es + 3.6 ? 0 : kprog(T, K.Es + 3.6, K.Es + 4.0) * 0.32 * Math.exp(-hrs / 1.2);
  const brazo = kprog(T, K.Pi + 1.6, K.Pi + 2.4, kEase.suave) * (1 - kprog(T, K.Pi + 3.6, K.Pi + 4.3, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: se apaga la luz y brillan las estrellitas del techo */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:apaga * 0.95 }}></div>
        <SvgCapa>
          <Defs />
          <Techo T={T} luz={apaga} />
          <Foco x={840} y={380} on={1 - apaga} s={0.9} />
          <Apagador x={130} y={1480} on={on} />
          <g opacity={kprog(T, K.G + 1.0, K.G + 1.3) * (1 - kprog(T, K.G + 2.6, K.G + 2.9))}>
            <Trebol x={470} y={690} r={64} />
            <Tache x={470} y={690} r={86} p={kprog(T, K.G + 1.6, K.G + 2.1, kEase.sale)} />
          </g>
          <g opacity={kprog(T, K.G + 2.9, K.G + 3.3)}>
            <Sol x={250} y={1030} r={44} T={T} />
            <path d={`M 320 1020 Q 380 980 ${klerp(330, 430, kprog(T, K.G + 3.1, K.G + 3.7))} 975`} fill="none" stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" strokeDasharray="20 12" />
          </g>
        </SvgCapa>
        <div style={{ position:'absolute', inset:0 }}><SvgCapa><Onomato T={T} at={K.G + 0.35} until={K.G + 1.2} x={300} y={1340} texto="¡clic!" tam={84} /></SvgCapa></div>
      </Escena>
      {/* 1 · qué son: lupa de rayos X sobre una estrellita */}
      <Escena T={T} a={K.Q} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><Defs /><Estrellita x={540} y={1060} r={190} rot={-6} luz={0.15 + 0.1 * Math.sin(T * 3)} /></SvgCapa>
        <Lupa T={T} at={K.Q + 0.3} until={K.Ca - 0.3} x={620} y={640} r={240} fx={540} fy={1060} tinte={VERDE2} etiqueta="polvo de cristal · esquema" interior={(t, r) => {
          const R = krng(8);
          return <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r})`}>
            {Array.from({ length: 16 }, (_, i) => { const gx = (R() - 0.5) * 380, gy = (R() - 0.5) * 380, gr = 34 + R() * 26, rot = R() * 60;
              return <g key={i} transform={`translate(${gx} ${gy}) rotate(${rot})`}>
                <polygon points={Array.from({ length: 6 }, (_, j) => `${Math.cos(j * Math.PI / 3) * gr},${Math.sin(j * Math.PI / 3) * gr}`).join(' ')} fill="#e9f0f7" stroke="#9aa9bd" strokeWidth={4} />
                <circle cx={gr * 0.3} cy={-gr * 0.2} r={6} fill={EU} opacity={kprog(t, K.Q + 3.0, K.Q + 3.5)} />
                <circle cx={-gr * 0.3} cy={gr * 0.25} r={6} fill={DY} opacity={kprog(t, K.Q + 3.4, K.Q + 3.9)} />
              </g>; })}
          </g></svg>; }} />
      </Escena>
      {/* 2–4 · micro: la luz mueve cargas, caen en trampas, el calor las suelta */}
      <Escena T={T} a={K.Ca} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Defs />
          <Ambiente T={T} n={26} color="rgba(127,255,154,.18)" />
          <Red T={T} K={K} />
          <g opacity={kprog(T, K.Su + 0.3, K.Su + 0.8)}>
            <Termo x={960} y={1190} />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${880 - i * 40} 1100 Q ${870 - i * 40} ${1070 - (T * 60 + i * 20) % 60} ${880 - i * 40} 1040`} fill="none" stroke={KC.red} strokeWidth={6} strokeLinecap="round" opacity={0.7} />)}
          </g>
          {T > K.Su + 0.2 && <g opacity={kprog(T, K.Su + 0.2, K.Su + 0.6)} transform={`translate(950 380) rotate(${(T - K.Su) * 40})`}>
            <path d="M -30 -46 L 30 -46 L 0 0 Z M -30 46 L 30 46 L 0 0 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
          </g>}
        </SvgCapa>
        <Etq T={T} at={K.Ca + 0.6} until={K.Pr - 0.2} x={180 + 40} y={624} texto="europio" lado="der" tam={28} color={EU} />
        <Etq T={T} at={K.Tr + 0.4} until={K.Pr - 0.2} x={590} y={1075} texto="disprosio: trampa" lado="izq" tam={28} color={DY} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ra} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={260} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 900)`}>?</text>
          <Trebol x={260} y={1220} r={50} />
        </SvgCapa>
      </Escena>
      {/* 6 · el reloj de radio */}
      <Escena T={T} a={K.Ra} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Defs /><Reloj x={360} y={900} s={1.05} T={T} luz={1} /></SvgCapa>
        <Lupa T={T} at={K.Ra + 1.6} until={K.Pi - 0.3} x={760} y={620} r={220} fx={360} fy={757} tinte={VERDE2} etiqueta="pintura de radio · esquema" interior={(t, r) => {
          const R = krng(5), gr = Array.from({ length: 14 }, () => [(R() - 0.5) * 360, (R() - 0.5) * 360]);
          return <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r})`}>
            {gr.map(([gx, gy], i) => { const hit = Math.max(0, Math.sin(t * 5 + i * 1.7)) ** 8;
              return <g key={i}>
                {hit > 0.05 && <circle cx={gx} cy={gy} r={40} fill={VERDE} opacity={hit * 0.8} />}
                <circle cx={gx} cy={gy} r={26} fill={mixHex('#e9f0f7', VERDE, hit)} stroke="#9aa9bd" strokeWidth={4} />
              </g>; })}
            {Array.from({ length: 10 }, (_, i) => { const a = i * 0.63 + 0.3, d = ((t * 260 + i * 70) % 220);
              return <circle key={'p' + i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />; })}
            <Atomo x={0} y={0} r={42} color={RA} letra="Ra" tam={30} />
          </g></svg>; }} />
      </Escena>
      {/* 7 · las pintoras de carátulas (esquemático y respetuoso) */}
      <Escena T={T} a={K.Pi} b={K.Es} zoom={0.03}>
        <FondoLunares color="#b9b1a3" punto="rgba(255,255,255,.18)" />
        <SvgCapa>
          {[0, 1, 2, 3, 4].map((i) => <Personita key={i} x={130 + i * 70} y={720} s={1.6} color="#8f8577" o={0.55 * kprog(T, K.Pi + 0.4 + i * 0.12, K.Pi + 0.8 + i * 0.12)} />)}
          <rect x={60} y={1090} width={960} height={40} rx={10} fill="#8a6a46" stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2, 3].map((i) => <g key={i}><circle cx={150 + i * 120} cy={1060} r={40} fill="#1d2233" stroke={KC.gold} strokeWidth={8} />
            {[0, 1, 2, 3].map((j) => <circle key={j} cx={150 + i * 120 + Math.cos(j * Math.PI / 2) * 24} cy={1060 + Math.sin(j * Math.PI / 2) * 24} r={5} fill={VERDE} />)}</g>)}
          <Pintora x={760} y={850} s={1} brazo={brazo} />
          <g opacity={kprog(T, K.Pi + 2.6, K.Pi + 3.0)}>
            <path d="M 700 680 Q 600 600 520 640" fill="none" stroke={KC.red} strokeWidth={12} strokeLinecap="round" />
            <path d="M 540 610 L 510 645 L 555 660" fill="none" stroke={KC.red} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </SvgCapa>
        <Chip T={T} at={K.Pi + 2.8} until={K.Es - 0.2} texto="radio → al cuerpo" x={330} y={560} tam={38} borde={KC.red} />
      </Escena>
      {/* 8 · 1996, Japón: aluminato vs. sulfuro de zinc */}
      <Escena T={T} a={K.Es} b={K.Cu} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:0.75 * kprog(T, K.Es + 3.4, K.Es + 4.0) }}></div>
        <SvgCapa>
          <Defs />
          <g opacity={kprog(T, K.Es + 3.4, K.Es + 3.8)}>
            <FrascoLuz x={420} y={790} luz={luzZn} />
            <FrascoLuz x={820} y={790} luz={luzSr} />
          </g>
        </SvgCapa>
        {T > K.Es + 3.8 && <>
          <div style={{ position:'absolute', left:420, top:995, transform:'translate(-50%,0)', zIndex:41, font:`700 30px ${KF.mono}`, color:KC.texto, textAlign:'center', whiteSpace:'nowrap', textShadow:KSOMBRA, opacity:kprog(T, K.Es + 3.8, K.Es + 4.2) }}>ZnS:Cu,Co<br/>(sin radio)</div>
          <div style={{ position:'absolute', left:820, top:995, transform:'translate(-50%,0)', zIndex:41, font:`700 30px ${KF.mono}`, color:VERDE, textAlign:'center', whiteSpace:'nowrap', textShadow:KSOMBRA, opacity:kprog(T, K.Es + 3.8, K.Es + 4.2) }}>SrAl₂O₄:Eu,Dy<br/>(1996)</div>
          <div style={{ position:'absolute', left:620, top:470, transform:'translate(-50%,-50%)', zIndex:41, font:`400 110px ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`3px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}`, opacity:kprog(T, K.Es + 4.4, K.Es + 4.8) }}>{kformato(hrs, 0)} h</div>
        </>}
      </Escena>
      {/* 9 · lo chistoso: horno a 1300 °C y recarga con un foco */}
      <Escena T={T} a={K.Cu} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Defs />
          <Horno x={290} y={900} T={T} s={0.95} />
          <g opacity={kprog(T, K.Cu + 2.2, K.Cu + 2.6)}>
            <Lampara x={790} y={850} on={kprog(T, K.Cu + 2.6, K.Cu + 2.8)} s={0.9} />
            <Estrellita x={790} y={1100} r={70} luz={kprog(T, K.Cu + 2.8, K.Cu + 4.0)} />
            <Pila x={790} y={1220} f={kprog(T, K.Cu + 2.8, K.Cu + 4.2)} />
          </g>
        </SvgCapa>
        <div style={{ position:'absolute', left:290, top:620, transform:'translate(-50%,-50%)', zIndex:41, font:`400 100px ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`3px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}`, whiteSpace:'nowrap', opacity:kprog(T, K.Cu + 0.2, K.Cu + 0.5) }}>{Math.round(klerp(20, 1300, kprog(T, K.Cu + 0.2, K.Cu + 1.6, kEase.sale)) / 10) * 10} °C</div>
      </Escena>
      {/* 10 · cierre: el mismo techo, ahora visto por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><Defs /><Techo T={T} luz={1} /><Foco x={840} y={380} on={0} s={0.9} /></SvgCapa>
        <Lupa T={T} at={K.Ci + 0.4} until={K.Ou - 0.2} x={400} y={760} r={210} fx={470} fy={690} tinte={VERDE2} etiqueta="luz guardada" interior={(t, r) => {
          const p = ((t - K.Ci) % 1.6) / 1.6, sale = kprog(p, 0.3, 0.7, kEase.suave), fl = p > 0.7 ? Math.exp(-(p - 0.7) * 8) : 0;
          return <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r})`}>
            <filter id="b3"><feGaussianBlur stdDeviation="10" /></filter>
            <ellipse cx={-80} cy={70} rx={80} ry={32} fill="#05070d" stroke={DY} strokeWidth={6} />
            <Atomo x={-80} y={20} r={26} color={DY} letra="Dy" tam={20} />
            {fl > 0.02 && <circle cx={90} cy={-50} r={90} fill={VERDE} opacity={fl} filter="url(#b3)" />}
            <Atomo x={90} y={-50} r={34} color={EU} letra="Eu" tam={24} />
            {p < 0.7 && <circle cx={klerp(-80, 90, sale) + (p < 0.3 ? Math.sin(t * 30) * 6 : 0)} cy={klerp(76, -50, sale) - Math.sin(sale * Math.PI) * 70} r={14} fill="#fff" stroke={KC.ink} strokeWidth={3} />}
          </g></svg>; }} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 1.7} until={K.G + 2.8} texto="radiactivas" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.9} until={K.Q - 0.3} texto="luz guardada" x={300} y={470} tam={48} borde={VERDE2} />
      <Chip T={T} at={K.Q + 1.4} until={K.Ca - 0.2} texto="aluminato de estroncio · SrAl₂O₄" x={540} y={1500} tam={38} borde={KC.blue} />
      <Chip T={T} at={K.Q + 3.0} until={K.Ca - 0.2} texto="+ europio (Eu) · disprosio (Dy)" x={540} y={1610} tam={38} borde={EU} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Tr - 0.2} texto="la luz mueve cargas" x={540} y={1500} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Tr + 0.6} until={K.Su - 0.2} texto="atoradas en trampas" x={540} y={1500} tam={42} borde={DY} />
      <Chip T={T} at={K.Su + 0.6} until={K.Pr - 0.2} texto="calorcito del cuarto → las suelta" x={540} y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Su + 2.4} until={K.Pr - 0.2} texto="regresan al europio = luz verde" x={540} y={1610} tam={36} borde={EU} />
      <Chip T={T} at={K.Ra + 0.4} until={K.Pi - 0.2} texto="hace 100 años · relojes de radio" x={540} y={1500} tam={38} borde={RA} />
      <Chip T={T} at={K.Ra + 3.2} until={K.Pi - 0.2} texto="radio + sulfuro de zinc: brillo sin parar" x={540} y={1610} tam={32} borde={VERDE2} />
      <Chip T={T} at={K.Pi + 0.3} until={K.Es - 0.2} texto="Orange, Nueva Jersey, EE. UU. · 1917–1926" x={540} y={1720} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Pi + 1.2} until={K.Es - 0.2} texto="hasta 250 pintoras jóvenes" x={540} y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Pi + 2.6} until={K.Es - 0.2} texto="afinaban el pincel con los labios" x={540} y={1610} tam={36} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.3} anio="1996" quien="Nemoto & Co. · Tokio, Japón" revista="Matsuzawa et al. · J Electrochem Soc" x={540} y={850} />
      <Chip T={T} at={K.Es + 4.2} until={K.Cu - 0.2} texto="más de 10 veces más brillante" x={540} y={1500} tam={40} borde={EU} />
      <Chip T={T} at={K.Es + 7.6} until={K.Cu - 0.2} texto="a las 24 h aún se mide" x={540} y={1610} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Cu + 0.8} until={K.Ci - 0.2} texto="se hornea a 1300–1400 °C" x={540} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Cu + 2.8} until={K.Ci - 0.2} texto="tú lo recargas con un foco" x={540} y={1610} tam={40} borde={VERDE2} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="fosforescencia: luz guardada en trampas" x={540} y={1500} tam={34} borde={VERDE2} />
      <MitoTachado T={T} at={K.Ci + 0.2} tacharEn={K.Ci + 0.9} until={K.Ou} texto="radiactivas" x={300} y={470} tam={44} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No son radiactivas: *guardan luz.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Ca - 0.1} texto="*Aluminato de estroncio.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Tr - 0.1} texto="La luz *mueve cargas.*" />
      <Subtitulo T={T} idx={3} at={K.Tr + 0.1} until={K.Su - 0.1} texto="Atoradas *en trampas.*" />
      <Subtitulo T={T} idx={4} at={K.Su + 0.1} until={K.Pr - 0.1} texto="El calor *las suelta.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ra - 0.1} texto="¿Por qué *radiactivas?*" />
      <Subtitulo T={T} idx={6} at={K.Ra + 0.1} until={K.Pi - 0.1} texto="Relojes *con radio.*" />
      <Subtitulo T={T} idx={7} at={K.Pi + 0.1} until={K.Es - 0.1} texto="Y *tragaban radio.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Cu - 0.1} texto="1996: *más de 10 veces.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="1300 grados… *y un foco.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es *luz de tu día.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Carga - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Trampas + 0.3, CUES.Suelta - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Radio + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Radio + 3.0, CUES.Pintoras - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Pintoras + 0.8, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 4.0, CUES.Curioso - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Curioso + 0.3, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="34" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EstrellitasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Estrellitas34 /></CompositionStage></div>;
}
window.EstrellitasApp = EstrellitasApp;
