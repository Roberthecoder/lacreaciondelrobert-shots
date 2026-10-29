// Shot Químico #32 · Ese cerillo no trae el fuego en la cabeza (el fósforo está en la caja) — NARRADO (N1 por dentro + N5 histórico).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const P_ROJO = '#c0392b', CAB = '#d7263d', MADERA = '#e8c48a', TIRA = '#6b3a1e', P_BLANCO = '#fbf6dc', VERDOSO = '#b6ff9e';

// Llama de cerillo (gota naranja con centro amarillo y base azul). f = 0..1 tamaño.
function Flama({ T, x, y, s = 1, f = 1 }) {
  if (f <= 0) return null;
  const w = Math.sin(T * 17) * 0.06 + Math.sin(T * 7.3) * 0.04, k = s * f;
  return <g transform={`translate(${x} ${y}) scale(${k * (1 + w)} ${k * (1 - w)})`}>
    <path d="M 0 -170 Q 70 -60 50 0 Q 30 50 0 52 Q -30 50 -50 0 Q -70 -60 0 -170 Z" fill="#ff8a1f" stroke={KC.ink} strokeWidth={6} opacity={0.95} />
    <path d="M 0 -105 Q 38 -40 26 4 Q 14 32 0 32 Q -14 32 -26 4 Q -38 -40 0 -105 Z" fill="#ffe11a" />
    <ellipse cx={0} cy={30} rx={20} ry={14} fill="#5fc6ff" opacity={0.9} />
  </g>;
}
// Cerillo con el origen en la cabeza; el palito sale hacia +y (rot en grados). quema = 0..1 (madera que se oscurece).
function Cerillo({ T, x, y, rot = 0, s = 1, cabeza = CAB, flama = 0, quema = 0, mano = true }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-13} y={0} width={26} height={330} rx={6} fill={MADERA} stroke={KC.ink} strokeWidth={6} />
    {quema > 0 && <rect x={-13} y={0} width={26} height={90 * quema} rx={6} fill="#3a2414" />}
    <ellipse cx={0} cy={-6} rx={28} ry={38} fill={quema > 0.3 ? '#2b1d14' : cabeza} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-9} cy={-20} rx={8} ry={12} fill="#fff" opacity={0.35} />
    {mano && <g transform="translate(0 300)">
      <path d="M -60 -30 Q -70 40 -20 70 Q 40 90 70 40 Q 85 0 60 -40 Q 30 -60 -10 -55 Q -50 -52 -60 -30 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
      <path d="M -20 -50 Q -60 -40 -50 -5" fill="none" stroke={KC.ink} strokeWidth={5} />
      {[-20, 5, 30].map((d, i) => <path key={i} d={`M ${-40} ${d} Q 10 ${d + 6} 55 ${d - 4}`} fill="none" stroke="#c97f5c" strokeWidth={5} />)}
    </g>}
    {flama > 0 && <Flama T={T} x={0} y={-20} s={1} f={flama} />}
  </g>;
}
// Caja de cerillos: cara de arriba con etiqueta y la tira café de raspar al frente.
function Caja({ x, y, s = 1 }) {
  const R = krng(11);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -130 L 300 -130 L 300 130 L -300 130 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={9} />
    <rect x={-250} y={-95} width={500} height={190} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 78px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={3} paintOrder="stroke">CERILLOS</text>
    <text x={0} y={52} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.paper}>de seguridad</text>
    <path d="M -300 130 L 300 130 L 300 225 L -300 225 Z" fill={TIRA} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={-290 + R() * 580} cy={140 + R() * 76} r={2 + R() * 4} fill={i % 3 ? '#8e4a2a' : '#c0392b'} />)}
  </g>;
}
// Chispazo (estrella amarilla).
function Chispazo({ x, y, f = 1, r = 60 }) {
  if (f <= 0 || f >= 1) return null;
  const k = Math.sin(Math.PI * f), pts = Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.4 : r; return `${x + Math.cos(a) * rr * (0.6 + f)} ${y + Math.sin(a) * rr * (0.6 + f)}`; }).join(' L ');
  return <path d={`M ${pts} Z`} fill={KC.yellow} stroke={KC.orange} strokeWidth={5} opacity={k} />;
}
// Fósforo blanco P4: tetraedro de 4 átomos.
function P4({ x, y, s = 1, o = 1, brillo = 0 }) {
  if (o <= 0) return null;
  const A = [[0, -34], [-32, 18], [32, 18], [6, -2]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle r={70} fill={VERDOSO} opacity={0.25 * brillo} />}
    {[[0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3]].map(([i, j], k) => <line key={k} x1={A[i][0]} y1={A[i][1]} x2={A[j][0]} y2={A[j][1]} stroke={KC.ink} strokeWidth={6} />)}
    {A.map(([ax, ay], i) => <circle key={i} cx={ax} cy={ay} r={i === 3 ? 14 : 18} fill={P_BLANCO} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Barra de escala simple.
function BarraEscala({ x = 70, y = 1440, px = 120, texto = '1 cm', color = KC.ink }) {
  return <g><line x1={x} y1={y} x2={x + px} y2={y} stroke={color} strokeWidth={8} /><line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={color} strokeWidth={6} /><line x1={x + px} y1={y - 14} x2={x + px} y2={y + 14} stroke={color} strokeWidth={6} />
    <text x={x + px / 2} y={y - 22} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}
// Fábrica de ladrillo con chimeneas.
function Fabrica({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-200, 60].map((cx, i) => <g key={i}><rect x={cx} y={-330} width={60} height={200} fill="#8e3b2a" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2].map((k) => <circle key={k} cx={cx + 30 + Math.sin(T * 1.3 + k + i) * 14} cy={-360 - k * 55 - (T * 20 % 55)} r={26 + k * 8} fill="rgba(90,90,90,.55)" />)}</g>)}
    <rect x={-300} y={-140} width={560} height={300} fill="#b5523b" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={-300} x2={260} y1={-110 + i * 34} y2={-110 + i * 34} stroke="#8e3b2a" strokeWidth={3} />)}
    {[-250, -150, -50].map((wx, i) => <rect key={i} x={wx} y={-100} width={60} height={80} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={150} y={20} width={90} height={140} fill="#3b2a25" stroke={KC.ink} strokeWidth={6} />
    <rect x={-290} y={-200} width={420} height={56} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={-80} y={-160} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>FÁBRICA DE CERILLOS</text>
  </g>;
}
// Cabeza de perfil (esquemática) con el hueso de la mandíbula visible; mal = 0..1 (zona del hueso que se apaga, sin nada gráfico).
function Perfil({ x, y, s = 1, mal = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -260 Q 40 -330 150 -200 Q 190 -140 175 -80 L 215 -10 Q 222 8 196 14 L 186 40 Q 196 60 180 72 Q 192 96 170 116 Q 150 170 70 180 L 20 180 L 0 290 L -170 290 L -150 120 Q -230 0 -210 -140 Q -200 -220 -150 -260 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={110} cy={-120} r={12} fill={KC.ink} />
    <path d="M -110 10 Q -60 160 60 160 Q 130 158 160 100" fill="none" stroke="#fffaf0" strokeWidth={30} strokeLinecap="round" opacity={0.95} />
    <path d="M -110 10 Q -60 160 60 160 Q 130 158 160 100" fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
    {mal > 0 && <ellipse cx={20} cy={150} rx={70 * mal} ry={22 * mal} fill="#6d6d6d" opacity={0.85} />}
  </g>;
}
// Documento de la convención.
function Documento({ x, y, s = 1, sello = 0, T }) {
  return <g transform={`translate(${x} ${y}) rotate(-3) scale(${s})`}>
    <rect x={-260} y={-300} width={520} height={600} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-230} y={-272} width={70} height={70} fill="#e1251b" stroke={KC.ink} strokeWidth={4} />
    <path d="M -205 -258 h 20 v 18 h 18 v 20 h -18 v 18 h -20 v -18 h -18 v -20 h 18 Z" fill="#fff" />
    <text x={30} y={-240} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>CONVENCIÓN</text>
    <text x={30} y={-192} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>DE BERNA</text>
    <text x={0} y={-130} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#5a524a">26 sep 1906</text>
    {[-80, -45, -10].map((ly, i) => <line key={i} x1={-210} x2={210} y1={ly} y2={ly} stroke="#b9ae9c" strokeWidth={8} strokeLinecap="round" />)}
    <Cerillo T={T} x={0} y={60} rot={-90} s={0.55} cabeza={P_BLANCO} mano={false} />
    {sello > 0 && <g transform={`translate(0 170) rotate(-12) scale(${klerp(2.2, 1, sello)})`} opacity={sello}>
      <rect x={-210} y={-56} width={420} height={112} rx={14} fill="none" stroke={KC.red} strokeWidth={12} />
      <text x={0} y={22} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.red}>PROHIBIDO</text></g>}
  </g>;
}
// Boca esquemática con encías que brillan (verde) en la oscuridad.
function BocaBrillo({ T, x, y, s = 1, brillo = 0 }) {
  const g = brillo * (0.75 + 0.25 * Math.sin(T * 3));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-58} rx={230 * 1.05} ry={60} fill={VERDOSO} opacity={0.28 * g} />
    <path d="M -220 -40 Q 0 -150 220 -40 L 200 -20 Q 0 -110 -200 -20 Z" fill={mixHex('#3a3a3a', VERDOSO, g)} stroke="rgba(255,255,255,.35)" strokeWidth={4} />
    {Array.from({ length: 8 }, (_, i) => { const tx = -175 + i * 50; return <rect key={i} x={tx} y={-40 + Math.abs(i - 3.5) * 6} width={44} height={56} rx={10} fill="#2a2d33" stroke="rgba(255,255,255,.25)" strokeWidth={3} />; })}
    <path d="M -240 -40 Q 0 -190 240 -40 Q 0 170 -240 -40 Z" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth={6} />
  </g>;
}

function Cerillo32() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Cabeza, Ti: CUES.Tira, Fr: CUES.Friccion, Ch: CUES.Chispa, Ll: CUES.Llama, Pr: CUES.Pregunta, Hu: CUES.Huelga, Qu: CUES.Quijada, Be: CUES.Berna, Br: CUES.Brillo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: raspón y levanta
  const ras = kprog(T, K.G + 0.02, K.G + 0.6, kEase.suave), lev = kprog(T, K.G + 0.65, K.G + 1.3, kEase.sale);
  const hx = klerp(klerp(230, 760, ras), 470, lev), hy = klerp(1132, 780, lev), hr = klerp(72, 12, lev);
  // micro: la cabeza que raspa
  const fr0 = K.Fr + 0.3, fr1 = K.Fr + 4.2, frota = T > fr0 && T < fr1 ? Math.sin((T - fr0) * 3.2) : 0;
  const cabX = klerp(1300, 520, kprog(T, K.Fr - 0.2, fr0, kEase.sale)) + frota * 160 + kprog(T, fr1, fr1 + 0.8, kEase.suave) * 700;
  const calor = kprog(T, fr0, fr1);
  const R = krng(23);
  const granos = Array.from({ length: 26 }, (_, i) => [60 + i * 37 + R() * 18, 1030 + R() * 150, 16 + R() * 14, R() * 6]);
  const vidrios = Array.from({ length: 12 }, () => [60 + R() * 960, 1040 + R() * 140, R() * 180, 20 + R() * 18]);
  const conv = [3, 9, 15, 21];
  const R2 = krng(31);
  const cristales = Array.from({ length: 10 }, () => [(R2() - 0.5) * 300, (R2() - 0.5) * 380, R2() * 40]);
  const azufres = Array.from({ length: 9 }, () => [(R2() - 0.5) * 300, (R2() - 0.5) * 380]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: raspar el cerillo en la tira */}
      <Escena T={T} a={K.G} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Caja x={500} y={950} />
          <Cerillo T={T} x={hx} y={hy} rot={klerp(78, 12, lev)} s={1} flama={kprog(T, K.G + 0.5, K.G + 1.1, kEase.sale)} />
          <Chispazo x={760} y={1132} f={kprog(T, K.G + 0.45, K.G + 0.9)} r={80} />
          <BarraEscala x={70} y={1450} px={120} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 1 · la cabeza por dentro */}
      <Escena T={T} a={K.Ca} b={K.Ti} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={480} y={1060} width={120} height={500} rx={20} fill={MADERA} stroke={KC.ink} strokeWidth={9} />
          <ellipse cx={540} cy={820} rx={230} ry={300} fill={CAB} stroke={KC.ink} strokeWidth={12} />
          <clipPath id="cabclip"><ellipse cx={540} cy={820} rx={222} ry={292} /></clipPath>
          <g clipPath="url(#cabclip)" opacity={kprog(T, K.Ca + 0.3, K.Ca + 1.0)}>
            <rect x={300} y={500} width={480} height={640} fill="#7a1420" />
            {cristales.map(([dx, dy, r], i) => { const e = kprog(T, K.Ca + 0.4 + i * 0.08, K.Ca + 0.8 + i * 0.08, kEase.rebote);
              return <rect key={i} x={540 + dx - 26} y={820 + dy - 26} width={52 * e} height={52 * e} rx={6} transform={`rotate(${r} ${540 + dx} ${820 + dy})`} fill="#f4f8ff" stroke={KC.ink} strokeWidth={4} />; })}
            {azufres.map(([dx, dy], i) => { const e = kprog(T, K.Ca + 2.4 + i * 0.08, K.Ca + 2.8 + i * 0.08, kEase.rebote);
              return <circle key={i} cx={540 + dx} cy={820 + dy} r={22 * e} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />; })}
          </g>
          <BarraEscala x={70} y={1450} px={160} texto="1 mm" />
        </SvgCapa>
      </Escena>
      {/* 2–4 · la tira al microscopio: fricción, fósforo blanco y chispa */}
      <Escena T={T} a={K.Ti} b={K.Ll} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={1010} width={KW} height={210} fill="#a8692c" opacity={0.9} />
          <rect x={0} y={1010} width={KW} height={12} fill="#d39a55" />
          {vidrios.map(([x, y, r, k], i) => <path key={i} d={`M ${-k} ${k * 0.6} L ${k * 0.2} ${-k} L ${k} ${k * 0.4} Z`} transform={`translate(${x} ${y}) rotate(${r})`} fill="rgba(200,240,255,.75)" stroke="#e8fbff" strokeWidth={3} />)}
          {granos.map(([x, y, r, ph], i) => { const ci = conv.indexOf(i); const c = ci >= 0 ? kprog(T, K.Fr + 2.2 + ci * 0.45, K.Fr + 2.8 + ci * 0.45) : 0;
            return <g key={i}>{c < 1 && <path d={`M ${x - r} ${y} Q ${x - r} ${y - r} ${x} ${y - r} Q ${x + r * 1.1} ${y - r * 0.8} ${x + r} ${y} Q ${x + r * 0.8} ${y + r} ${x} ${y + r} Q ${x - r * 1.1} ${y + r * 0.7} ${x - r} ${y} Z`} fill={P_ROJO} stroke={KC.ink} strokeWidth={4} opacity={1 - c} />}</g>; })}
          {conv.map((gi, ci) => { const [x] = granos[gi]; const c = kprog(T, K.Fr + 2.2 + ci * 0.45, K.Fr + 2.8 + ci * 0.45, kEase.rebote); const quema = kprog(T, K.Ch + 1.0 + ci * 0.25, K.Ch + 1.3 + ci * 0.25);
            return <g key={gi}><P4 x={x} y={985} s={1.1 * c} o={c * (1 - quema)} brillo={1} /><Chispazo x={x} y={975} f={kprog(T, K.Ch + 1.0 + ci * 0.25, K.Ch + 1.8 + ci * 0.25)} r={70} /></g>; })}
          {T > K.Ch - 0.2 && Array.from({ length: 8 }, (_, i) => { const t0 = K.Ch + i * 0.12, p = kprog(T, t0, t0 + 1.1, kEase.suave), tx = granos[conv[i % 4]][0];
            return <Mol key={i} tipo="o2" x={klerp(tx + (i % 2 ? 160 : -160), tx + (i % 2 ? 40 : -40), p)} y={klerp(560 + i * 30, 930, p)} s={0.6} rot={T * 40 + i * 30} o={1 - kprog(T, K.Ch + 1.4, K.Ch + 1.8)} />; })}
          {T > K.Fr - 0.3 && <g transform={`translate(${cabX} 760)`}>
            <ellipse cx={0} cy={0} rx={260} ry={250} fill={CAB} stroke={KC.ink} strokeWidth={10} />
            {cristales.slice(0, 7).map(([dx, dy, r], i) => <rect key={i} x={dx * 0.7 - 20} y={dy * 0.5 - 20} width={40} height={40} rx={5} transform={`rotate(${r} ${dx * 0.7} ${dy * 0.5})`} fill="#f4f8ff" stroke={KC.ink} strokeWidth={3} />)}
            {azufres.slice(0, 6).map(([dx, dy], i) => <circle key={i} cx={dx * 0.7} cy={dy * 0.5 + 30} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
            <rect x={-260} y={200} width={520} height={60} fill={`rgba(255,${klerp(200, 90, calor)},40,${0.6 * calor})`} />
          </g>}
          {T > K.Fr && T < K.Ll + 0.4 && <g transform="translate(990 880)" opacity={kprog(T, K.Fr, K.Fr + 0.4)}>
            <rect x={-26} y={-260} width={52} height={300} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-12} y={20 - 240 * calor} width={24} height={240 * calor + 10} rx={10} fill={KC.red} />
            <circle cx={0} cy={50} r={40} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 5 · la llama: clorato → oxígeno, azufre, madera */}
      <Escena T={T} a={K.Ll} b={K.Pr} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Cerillo T={T} x={600} y={820} rot={0} s={2.4} mano={false} flama={kprog(T, K.Ll + 2.3, K.Ll + 3.2, kEase.sale)} quema={kprog(T, K.Ll + 3.2, K.Ll + 4.8)} />
          <g opacity={1 - kprog(T, K.Ll + 2.6, K.Ll + 3.2)}>
            {cristales.slice(0, 6).map(([dx, dy, r], i) => <rect key={i} x={600 + dx * 0.18 - 9} y={800 + dy * 0.16 - 9} width={18} height={18} rx={3} fill="#f4f8ff" stroke={KC.ink} strokeWidth={2} />)}
            {azufres.slice(0, 6).map(([dx, dy], i) => <circle key={i} cx={600 + dx * 0.18} cy={810 + dy * 0.16} r={8} fill={mixHex('#ffe11a', '#2346ff', kprog(T, K.Ll + 1.7, K.Ll + 2.4))} stroke={KC.ink} strokeWidth={2} />)}
          </g>
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.Ll + 0.4 + i * 0.2, p = kprog(T, t0, t0 + 1.4, kEase.suave);
            return T > t0 && p < 1 ? <Mol key={i} tipo="o2" x={600 + (i - 2.5) * 70 + Math.sin(T * 3 + i) * 10} y={klerp(800, 520, p)} s={0.5} o={1 - p} /> : null; })}
          <BarraEscala x={70} y={1450} px={150} texto="1 mm" />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta: el cerillo de antes */}
      <Escena T={T} a={K.Pr} b={K.Hu} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Cerillo T={T} x={250} y={850} rot={Math.sin(T * 2) * 5} s={1.15} cabeza={P_BLANCO} mano={false} />
          <text x={250} y={700} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 560)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · 1888: la huelga de Londres */}
      <Escena T={T} a={K.Hu} b={K.Qu} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Fabrica x={430} y={1000} s={1} T={T} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.Hu + 2.6 + i * 0.32, p = kprog(T, t0, t0 + 2.4); if (T < t0) return null;
            const fila = i % 2; return <Personita key={i} x={klerp(630, 1110, p)} y={1110 + fila * 60 + Math.abs(Math.sin(T * 8 + i)) * -6} s={1.5} color={i % 3 ? KC.yellow : KC.coral} />; })}
        </SvgCapa>
        <Contador T={T} at={K.Hu + 2.8} desde={0} hasta={1400} dur={2.8} x={KW / 2} y={1480} tam={120} color={KC.yellow} />
      </Escena>
      {/* 8 · la quijada de fósforo */}
      <Escena T={T} a={K.Qu} b={K.Be} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#d9c7a0' }}></div>
        <SvgCapa>
          <Cubeta x={330} y={1080} s={0.8} liquido="#f3eccc" color="#8a8f99" nivel={0.7} />
          <Nube T={T} x={330} y={900} f={kprog(T, K.Qu + 0.2, K.Qu + 1.6)} r={150} color="#d8f5b8" seed={4} />
          <Perfil x={780} y={850} s={0.95} mal={kprog(T, K.Qu + 1.4, K.Qu + 2.8)} />
          {T > K.Qu + 3.0 && [0, 1, 2, 3, 4].map((i) => <Personita key={i} x={340 + i * 100} y={1490} s={1.7 * kprog(T, K.Qu + 3.0 + i * 0.1, K.Qu + 3.3 + i * 0.1, kEase.rebote)} color={i === 4 ? mixHex('#ffe11a', '#8a8f99', kprog(T, K.Qu + 4.0, K.Qu + 4.6)) : KC.yellow} o={i === 4 ? 1 - 0.6 * kprog(T, K.Qu + 4.0, K.Qu + 4.6) : 1} />)}
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.12)" />
        </SvgCapa>
      </Escena>
      {/* 9 · Berna 1906 */}
      <Escena T={T} a={K.Be} b={K.Br} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Documento T={T} x={640} y={900} s={1} sello={kprog(T, K.Be + 1.6, K.Be + 2.0, kEase.sale)} /></SvgCapa>
      </Escena>
      {/* 10 · brillo en la oscuridad */}
      <Escena T={T} a={K.Br} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#050608' }}></div>
        <SvgCapa>
          <g opacity={1 - kprog(T, K.Br + 2.8, K.Br + 3.3)}>
            <circle cx={790} cy={860} r={170 + Math.sin(T * 3) * 12} fill={VERDOSO} opacity={0.18 * kprog(T, K.Br + 0.4, K.Br + 1.2)} />
            <circle cx={790} cy={860} r={110} fill={VERDOSO} opacity={0.22 * kprog(T, K.Br + 0.4, K.Br + 1.2)} />
            <path d="M 700 860 Q 690 790 760 780 Q 840 760 880 820 Q 900 900 830 930 Q 740 950 700 860 Z" fill={mixHex('#3a3a3a', '#f5f7d8', kprog(T, K.Br + 0.4, K.Br + 1.2))} stroke="rgba(255,255,255,.4)" strokeWidth={5} />
          </g>
          {T > K.Br + 2.8 && <g opacity={kprog(T, K.Br + 2.8, K.Br + 3.4)}><BocaBrillo T={T} x={790} y={900} s={0.95} brillo={kprog(T, K.Br + 3.2, K.Br + 4.2)} /></g>}
        </SvgCapa>
      </Escena>
      {/* 11 · cierre: la misma caja, ya con el cerillo encendido */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Caja x={500} y={950} />
          <Cerillo T={T} x={470} y={780} rot={12} s={1} flama={1} />
          <BarraEscala x={70} y={1450} px={120} texto="1 cm" />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.9} until={K.G + 3.0} texto="¿fuego en la cabeza?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 3.1} until={K.Ca - 0.3} texto="fósforo: en la tira" x={330} y={470} tam={44} borde={P_ROJO} />
      <Etq T={T} at={K.G + 3.3} until={K.Ca - 0.3} x={820} y={1270 - 80} texto="tira" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Ti - 0.3} texto="clorato de potasio · KClO₃" x={540} y={1500} tam={40} borde="#f4f8ff" />
      <Chip T={T} at={K.Ca + 2.5} until={K.Ti - 0.3} texto="azufre · S" x={540} y={1610} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ti + 0.2} until={K.Fr - 0.2} texto="fósforo rojo + pegamento + vidrio" x={540} y={1500} tam={36} borde={P_ROJO} />
      <Etq T={T} at={K.Ti + 0.5} until={K.Fr - 0.2} x={520} y={900} texto="AL MICROSCOPIO · la tira" lado="der" tam={32} color={KC.texto} />
      <Chip T={T} at={K.Fr + 0.6} until={K.Ch - 0.2} texto="fricción = calor" x={540} y={1500} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Fr + 2.4} until={K.Ch - 0.2} texto="una pizca: rojo → blanco (P₄)" x={540} y={1610} tam={36} borde={P_BLANCO} />
      <Chip T={T} at={K.Ch + 0.3} until={K.Ll - 0.2} texto="fósforo blanco + aire = chispa" x={540} y={1500} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Ll + 0.3} until={K.Ll + 2.1} texto="clorato → oxígeno" x={540} y={1500} tam={44} borde="#bfe8ff" />
      <Chip T={T} at={K.Ll + 2.2} until={K.Pr - 0.2} texto="arde el azufre → la madera" x={540} y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Pr + 0.4} until={K.Hu - 0.2} texto="antes: fósforo blanco en la cabeza" x={540} y={1500} tam={34} borde={P_BLANCO} />
      <TarjetaEstudio T={T} at={K.Hu + 0.2} until={K.Hu + 2.6} anio="1888" quien="Londres · Bryant & May" revista="The National Archives (Reino Unido)" x={540} y={600} />
      <Chip T={T} at={K.Hu + 5.4} until={K.Qu - 0.3} texto="huelga por despidos y multas" x={540} y={1610} tam={38} borde={KC.coral} />
      <Etq T={T} at={K.Hu + 3.2} until={K.Qu - 0.3} x={60} y={1385} texto="mujeres en huelga" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Qu + 0.6} until={K.Qu + 3.0} x={420} y={760} texto="humo de fósforo blanco" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Qu + 1.6} until={K.Be - 0.3} x={600} y={1110} texto="hueso de la quijada" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Qu + 3.4} until={K.Be - 0.3} texto="1882–1897 · murió el 19 % de los casos" x={540} y={1610} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Be + 2.1} until={K.Br - 0.2} texto="sin fósforo blanco en los cerillos" x={540} y={1500} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Br + 0.8} until={K.Br + 2.8} x={680} y={760} texto="fósforo blanco" lado="izq" tam={34} color={VERDOSO} />
      <Chip T={T} at={K.Br + 3.6} until={K.Ci - 0.2} texto="encías que brillaban" x={540} y={1500} tam={42} borde={VERDOSO} />
      <Chip T={T} at={K.Ci + 0.5} until={K.Ou} texto="caja: fósforo rojo + vidrio" x={540} y={1500} tam={38} borde={P_ROJO} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="cabeza: clorato + azufre" x={540} y={1610} tam={38} borde={CAB} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="El fósforo está *en la caja.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.Ti - 0.1} texto="Cabeza: *clorato y azufre.*" />
      <Subtitulo T={T} idx={2} at={K.Ti + 0.1} until={K.Fr - 0.1} texto="Tira: *fósforo rojo y vidrio.*" />
      <Subtitulo T={T} idx={3} at={K.Fr + 0.1} until={K.Ch - 0.1} texto="La fricción: *rojo → blanco.*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={K.Ll - 0.1} texto="Se prende *solo en el aire.*" />
      <Subtitulo T={T} idx={5} at={K.Ll + 0.1} until={K.Pr - 0.1} texto="Oxígeno, azufre… *y la madera.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Hu - 0.1} texto="¿Por qué *no en la cabeza?*" />
      <Subtitulo T={T} idx={7} at={K.Hu + 0.1} until={K.Qu - 0.1} texto="1888: *1400 mujeres en huelga.*" />
      <Subtitulo T={T} idx={8} at={K.Qu + 0.1} until={K.Be - 0.1} texto="Su humo *dañaba la quijada.*" />
      <Subtitulo T={T} idx={9} at={K.Be + 0.1} until={K.Br - 0.1} texto="1906: *prohibidos en Berna.*" />
      <Subtitulo T={T} idx={10} at={K.Br + 0.1} until={K.Ci - 0.1} texto="Les brillaban *las encías.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El fuego *lo trae la caja.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cabeza + 0.6, CUES.Tira - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Friccion + 0.6, CUES.Chispa - 0.4, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Llama + 0.5, CUES.Pregunta - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Huelga + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Huelga + 3.0, CUES.Quijada - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Quijada + 0.8, CUES.Berna - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Berna + 0.6, CUES.Brillo - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Brillo + 0.8, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="32" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CerilloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cerillo32 /></CompositionStage></div>;
}
window.CerilloApp = CerilloApp;
