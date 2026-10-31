// Shot Biotecnológico #31 · CAR-T: tus propias células, entrenadas para cazar cáncer — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y los virus no están a escala.
const LT = '#8f6bff', LT_NUC = '#4b2aa8', LEU = '#ff8fb1', LEU_NUC = '#c23a6e', CD19C = KC.yellow, CARC = KC.mint, CITO = '#ffb347', SANG = '#d7263d';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Bolsa de infusión colgada de su poste, con manguera hacia abajo.
function Bolsa({ T, x, y, s = 1, nivel = 0.8, color = '#ffd6e4', etiqueta = 'PACIENTE: TÚ', etq2 = '' }) {
  const h = 360, w = 240, top = -h / 2;
  const liq = h * 0.86 * nivel;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.3) * 1.5})`}>
    <rect x={-10} y={top - 70} width={20} height={70} fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={top - 78} r={18} fill="none" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-w / 2} ${top} Q 0 ${top - 30} ${w / 2} ${top} L ${w / 2 - 10} ${h / 2 - 30} Q 0 ${h / 2 + 30} ${-w / 2 + 10} ${h / 2 - 30} Z`} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <clipPath id="clipBolsa"><path d={`M ${-w / 2} ${top} Q 0 ${top - 30} ${w / 2} ${top} L ${w / 2 - 10} ${h / 2 - 30} Q 0 ${h / 2 + 30} ${-w / 2 + 10} ${h / 2 - 30} Z`} /></clipPath>
    <g clipPath="url(#clipBolsa)">
      <rect x={-w / 2} y={h / 2 - liq} width={w} height={liq + 20} fill={color} />
      {nivel > 0.05 && Array.from({ length: 14 }, (_, i) => <circle key={i} cx={-90 + (i * 47) % 180} cy={h / 2 - 20 - ((i * 53 + T * 30) % Math.max(liq - 20, 1))} r={9} fill={LT} stroke={LT_NUC} strokeWidth={3} opacity={0.75} />)}
    </g>
    <rect x={-92} y={top + 40} width={184} height={92} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={top + 80} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>
    {etq2 && <text x={0} y={top + 114} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.pink}>{etq2}</text>}
    <path d={`M -20 ${h / 2 - 8} L 20 ${h / 2 - 8} L 12 ${h / 2 + 30} L -12 ${h / 2 + 30} Z`} fill="#dfe6ef" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Brazo horizontal con la vena y el catéter.
function Brazo({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -560 -110 Q -100 -150 300 -120 Q 420 -110 470 -60 Q 520 0 470 60 Q 420 110 300 110 Q -100 140 -560 110 Z" fill="#e9a57f" stroke={KC.ink} strokeWidth={10} />
    <path d="M -560 10 Q -200 -20 100 10 Q 300 30 440 0" fill="none" stroke="#6d7fd6" strokeWidth={18} strokeLinecap="round" opacity={0.75} />
    <rect x={-60} y={-30} width={150} height={60} rx={10} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={5} transform="rotate(-6)" />
    <circle cx={10} cy={6} r={10 + Math.sin(T * 6) * 2} fill={SANG} opacity={0.6} />
  </g>;
}
// Linfocito T: núcleo grande y redondo, borde delgado de citoplasma, microvellosidades. car (0..1) = cuántos receptores CAR tiene.
function LinfocitoT({ T, x, y, r = 110, car = 0, seed = 1, rot = 0, brillo = 0, o = 1 }) {
  const n = 12, bumps = 26;
  const borde = Array.from({ length: bumps }, (_, i) => { const a = (i / bumps) * Math.PI * 2, rr = r * (1 + 0.04 * Math.sin(i * 3 + T * 2 + seed)); return `${i ? 'L' : 'M'} ${Math.cos(a) * rr} ${Math.sin(a) * rr}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {brillo > 0 && <circle r={r * 1.5} fill={CARC} opacity={0.18 * brillo} />}
    {Array.from({ length: Math.round(n * car) }, (_, i) => { const a = (i / n) * Math.PI * 2 + seed; const c = Math.cos(a), sn = Math.sin(a);
      return <g key={i} transform={`translate(${c * r} ${sn * r}) rotate(${a * 180 / Math.PI + 90})`}>
        <path d={`M 0 6 L 0 -30 M 0 -30 L -16 -52 M 0 -30 L 16 -52`} stroke={KC.ink} strokeWidth={11} strokeLinecap="round" fill="none" />
        <path d={`M 0 6 L 0 -30 M 0 -30 L -16 -52 M 0 -30 L 16 -52`} stroke={CARC} strokeWidth={6} strokeLinecap="round" fill="none" />
      </g>; })}
    <path d={borde} fill={LT} stroke={KC.ink} strokeWidth={7} />
    <circle cx={r * 0.06} cy={-r * 0.04} r={r * 0.74} fill={LT_NUC} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-r * 0.25} cy={-r * 0.25} r={r * 0.12} fill="rgba(255,255,255,.35)" />
  </g>;
}
// Célula de leucemia B (linfoblasto): redonda, núcleo enorme, banderitas CD19 en la superficie. rompe 0..1.
function CelulaLeucemia({ T, x, y, r = 130, cd19 = 1, rompe = 0, seed = 2, o = 1, sanas = false }) {
  if (rompe >= 1) return null;
  const n = 10;
  const R = krng(seed);
  if (rompe > 0) {
    return <g transform={`translate(${x} ${y})`} opacity={o * (1 - rompe)}>
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2, d = rompe * r * 1.4; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={r * 0.22 * (1 - rompe * 0.5)} fill={i % 2 ? LEU : LEU_NUC} stroke={KC.ink} strokeWidth={4} />; })}
    </g>;
  }
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.round(n * cd19) }, (_, i) => { const a = (i / n) * Math.PI * 2 + seed * 0.3; const c = Math.cos(a), sn = Math.sin(a), ond = Math.sin(T * 5 + i) * 4;
      return <g key={i} transform={`translate(${c * r} ${sn * r}) rotate(${a * 180 / Math.PI + 90})`}>
        <line x1={0} y1={0} x2={0} y2={-40} stroke={KC.ink} strokeWidth={6} />
        <path d={`M 0 -40 L 26 ${-34 + ond} L 0 -24 Z`} fill={sanas ? '#ffe9a6' : CD19C} stroke={KC.ink} strokeWidth={4} />
      </g>; })}
    <circle r={r} fill={sanas ? '#9ad7ff' : LEU} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-r * 0.7} 0 Q ${-r * 0.6} ${-r * 0.75} ${r * 0.1} ${-r * 0.7} Q ${r * 0.8} ${-r * 0.5} ${r * 0.7} ${r * 0.15} Q ${r * 0.55} ${r * 0.75} 0 ${r * 0.7} Q ${-r * 0.75} ${r * 0.6} ${-r * 0.7} 0 Z`} fill={sanas ? '#3a7fc2' : LEU_NUC} stroke={KC.ink} strokeWidth={4} />
    <circle cx={r * 0.2} cy={-r * 0.1} r={r * 0.12} fill="rgba(255,255,255,.3)" />
  </g>;
}
// Lentivirus (esquemático, NO a escala): envoltura esférica con espículas y cápside en forma de cono con su ARN.
function Lentivirus({ T, x, y, r = 60, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <g key={i} transform={`rotate(${a * 180 / Math.PI})`}><line x1={r} y1={0} x2={r + 16} y2={0} stroke={KC.ink} strokeWidth={5} /><circle cx={r + 18} cy={0} r={7} fill={KC.orange} stroke={KC.ink} strokeWidth={3} /></g>; })}
    <circle r={r} fill="#ffe7c2" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-r * 0.55} ${-r * 0.22} L ${r * 0.5} ${-r * 0.42} L ${r * 0.5} ${r * 0.42} L ${-r * 0.55} ${r * 0.22} Z`} fill="#ffb347" stroke={KC.ink} strokeWidth={4} transform={`rotate(${Math.sin(T * 2) * 4})`} />
    <path d={`M ${-r * 0.4} 0 q ${r * 0.15} -10 ${r * 0.3} 0 t ${r * 0.3} 0 t ${r * 0.25} 0`} stroke={KC.red} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Tira de ARN que entra (dibujada parcial).
function TiraARN({ x0, y0, x1, y1, p = 1 }) {
  const n = 18, pts = [];
  for (let i = 0; i <= n * p; i++) { const u = i / n; pts.push(`${i ? 'L' : 'M'} ${klerp(x0, x1, u)} ${klerp(y0, y1, u) + Math.sin(u * 18) * 12}`); }
  return <path d={pts.join(' ')} stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" />;
}
// Máquina de aféresis esquemática: disco que gira y separa capas.
function Aferesis({ T, x, y, s = 1, gira = 1 }) {
  const a = T * 360 * gira;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-190} width={340} height={380} rx={30} fill="#eef2f7" stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-30} r={120} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(0 -30) rotate(${a})`}>
      <circle r={100} fill={SANG} stroke={KC.ink} strokeWidth={5} />
      <circle r={66} fill="#fff4c8" stroke={KC.ink} strokeWidth={4} />
      <circle r={40} fill="#ffe08a" />
      {[0, 120, 240].map((d) => <circle key={d} cx={Math.cos(d * Math.PI / 180) * 52} cy={Math.sin(d * Math.PI / 180) * 52} r={12} fill={LT} stroke={KC.ink} strokeWidth={3} />)}
    </g>
    <rect x={-120} y={120} width={240} height={40} rx={10} fill={KC.ink} />
    <circle cx={-80} cy={140} r={9} fill={KC.mint} /><circle cx={-50} cy={140} r={9} fill={KC.yellow} />
  </g>;
}
// Frasco de cultivo con células que se multiplican (n).
function Frasco({ T, x, y, s = 1, n = 4, seed = 4 }) {
  const R = krng(seed);
  const cel = Array.from({ length: 70 }, () => [-180 + R() * 360, -40 + R() * 160]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -100 L 150 -100 L 230 -170 L 270 -130 L 210 -70 L 210 200 L -230 200 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-222} y={-40} width={426} height={232} fill="#ffb3c7" opacity={0.6} />
    {cel.slice(0, Math.min(70, Math.round(n))).map(([cx, cy], i) => <circle key={i} cx={cx + Math.sin(T * 2 + i) * 3} cy={cy} r={14} fill={LT} stroke={LT_NUC} strokeWidth={4} />)}
    <rect x={238} y={-178} width={46} height={46} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={5} transform="rotate(45 261 -155)" />
  </g>;
}
// Silueta esquemática (no es un retrato).
function Nina({ x, y, s = 1, color = KC.violet }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-170} r={70} fill={color} />
    <circle cx={-82} cy={-196} r={30} fill={color} /><circle cx={82} cy={-196} r={30} fill={color} />
    <path d="M -90 -80 Q 0 -110 90 -80 L 130 160 L -130 160 Z" fill={color} />
  </g>;
}
function TermometroT({ x, y, v = 0.3 }) {
  const h = 420;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-h} width={68} height={h} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-16} y={-h * v} width={32} height={h * v} fill={mixHex('#ff8a1f', '#ff2d2d', v)} />
    <circle cx={0} cy={30} r={56} fill={mixHex('#ff8a1f', '#ff2d2d', v)} stroke={KC.ink} strokeWidth={8} />
    {[0.25, 0.5, 0.75].map((m) => <line key={m} x1={34} y1={-h * m} x2={62} y2={-h * m} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Flecha de presión que cae.
function FlechaPresion({ x, y, p = 0 }) {
  const yy = y + p * 260;
  return <g>
    <line x1={x} y1={y} x2={x} y2={yy} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x} y2={yy} stroke={KC.cyan} strokeWidth={12} strokeLinecap="round" />
    <path d={`M ${x - 50} ${yy - 10} L ${x} ${yy + 60} L ${x + 50} ${yy - 10} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <text x={x} y={y - 26} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>presión</text>
  </g>;
}
// Citocinas: puntitos que llueven en la vena.
function Citocinas({ T, n = 40, f = 1, seed = 9, y0 = 560, y1 = 1400, bloqueadas = 0 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: Math.round(n * f) }, (_, i) => { const x = 60 + R() * 960, v = 60 + R() * 120, ph = R() * 900;
    const y = y0 + ((ph + T * v) % (y1 - y0));
    return <g key={i} transform={`translate(${x + Math.sin(T * 2 + i) * 12} ${y})`}><circle r={13} fill={CITO} stroke={KC.ink} strokeWidth={3} opacity={1 - bloqueadas * 0.4} /><circle r={5} cx={-3} cy={-3} fill="#fff" opacity={0.6} /></g>; })}</g>;
}
// Receptor de IL-6 en la superficie (cerradura) y el tapón de tocilizumab.
function ReceptorIL6({ x, y, tapon = 0, il6 = 0, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -30 0 L -30 -60 Q -30 -80 -14 -80 L -14 -40 L 14 -40 L 14 -80 Q 30 -80 30 -60 L 30 0 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={5} />
    {il6 > 0 && tapon < 0.5 && <circle cx={0} cy={-56 - (1 - il6) * 80} r={13} fill={CITO} stroke={KC.ink} strokeWidth={3} />}
    {tapon > 0 && <g transform={`translate(0 ${-70 - (1 - tapon) * 160})`}>
      <path d="M -26 -30 L 26 -30 L 14 22 L -14 22 Z" fill="#7ad7ff" stroke={KC.ink} strokeWidth={5} />
      <path d="M -26 -30 L -42 -58 M 26 -30 L 42 -58" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    </g>}
  </g>;
}
function Sello({ x, y, p = 1, T }) {
  const s = klerp(2.2, 1, kEase.rebote(p));
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-10)`} opacity={kprog(p, 0, 0.3)}>
    <circle r={170} fill="none" stroke={KC.red} strokeWidth={14} />
    <circle r={140} fill="rgba(255,59,47,.08)" stroke={KC.red} strokeWidth={5} strokeDasharray="12 9" />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={KC.red}>FDA</text>
    <text x={0} y={30} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.red}>APROBADA</text>
    <text x={0} y={76} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>30 AGO 2017</text>
  </g>;
}

function CarT() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Sa: CUES.Saca, Vi: CUES.Virus, Re: CUES.Receptor, Ba: CUES.Bandera, Mu: CUES.Multiplica, Pr: CUES.Pregunta, Ca: CUES.Caza, Em: CUES.Emily, To: CUES.Tormenta, Ar: CUES.Artritis, Fd: CUES.FDA, Ho: CUES.Hoy, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const PXMM = 220 / 0.007;           // linfocito T de ~7 µm dibujado con 220 px de diámetro
  // Multiplica: duplicaciones en el frasco
  const dup = Math.floor(kprog(T, K.Mu + 0.2, K.Mu + 2.8) * 6);
  // Caza: tiempos
  const engancha = kprog(T, K.Ca + 0.3, K.Ca + 1.1, kEase.sale), rompe = kprog(T, K.Ca + 1.3, K.Ca + 2.1), divide = kprog(T, K.Ca + 2.2, K.Ca + 3.4, kEase.suave);
  const fiebre = kprog(T, K.To + 0.3, K.To + 3.0, kEase.suave), baja = kprog(T, K.Ar + 0.8, K.Ar + 2.4, kEase.suave);
  const R = krng(13);
  const fondoCelulas = Array.from({ length: 6 }, () => [120 + R() * 840, 640 + R() * 700]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la bolsa gotea hacia el brazo */}
      <Escena T={T} a={K.G} b={K.Sa} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <line x1={380} y1={470} x2={380} y2={1220} stroke="#9aa3b5" strokeWidth={18} />
          <line x1={300} y1={470} x2={460} y2={470} stroke="#9aa3b5" strokeWidth={14} strokeLinecap="round" />
          <Bolsa T={T} x={380} y={720} s={1.0} nivel={0.85} />
          <path d={`M 380 930 Q 380 1000 470 1010 Q 560 1020 570 1060`} stroke="#dfe6ef" strokeWidth={14} fill="none" />
          <Goteo T={T} x={380} y0={915} y1={965} cada={0.5} color="#ffd6e4" desde={K.G} hasta={K.Sa} r={10} />
          <Brazo x={640} y={1090} s={0.8} T={T} />
        </Capa>
      </Escena>
      {/* 1 · te sacan sangre y separan los linfocitos T */}
      <Escena T={T} a={K.Sa} b={K.Vi} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Aferesis T={T} x={330} y={920} s={1.05} gira={1.4} />
          <path d={`M 520 860 Q 640 820 700 900`} stroke={SANG} strokeWidth={14} fill="none" strokeDasharray="22 12" strokeDashoffset={-T * 80} />
          <LinfocitoT T={T} x={800} y={1040} r={110} seed={1} o={kprog(T, K.Sa + 1.2, K.Sa + 1.8)} />
          {[[640, 830], [880, 900]].map(([x, y], i) => <LinfocitoT key={i} T={T} x={x} y={y} r={60} seed={i + 3} o={kprog(T, K.Sa + 1.6 + i * 0.3, K.Sa + 2.2 + i * 0.3)} />)}
        </Capa>
      </Escena>
      {/* 2 · un virus modificado les mete un gen */}
      <Escena T={T} a={K.Vi} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <LinfocitoT T={T} x={560} y={1000} r={170} seed={1} />
          {(() => { const p = kprog(T, K.Vi + 0.2, K.Vi + 1.4, kEase.sale); const vx = klerp(1000, 780, p), vy = klerp(640, 840, p);
            return <g><Lentivirus T={T} x={vx} y={vy} r={58} rot={T * 30} o={1 - kprog(T, K.Vi + 2.6, K.Vi + 3.2)} />
              <TiraARN x0={vx - 30} y0={vy + 30} x1={600} y1={980} p={kprog(T, K.Vi + 1.5, K.Vi + 2.8)} /></g>; })()}
        </Capa>
      </Escena>
      {/* 3 · el receptor CAR · 4 · CD19, la bandera */}
      <Escena T={T} a={K.Re} b={K.Mu} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <LinfocitoT T={T} x={T < K.Ba ? 540 : klerp(540, 330, kprog(T, K.Ba, K.Ba + 0.8, kEase.suave))} y={1000} r={T < K.Ba ? 170 : klerp(170, 130, kprog(T, K.Ba, K.Ba + 0.8))} seed={1} car={kprog(T, K.Re + 0.4, K.Re + 2.6)} brillo={kprog(T, K.Re + 2.4, K.Re + 3)} />
          {T > K.Ba - 0.2 && <CelulaLeucemia T={T} x={klerp(1200, 790, kprog(T, K.Ba, K.Ba + 0.9, kEase.sale))} y={960} r={135} cd19={kprog(T, K.Ba + 0.6, K.Ba + 1.8)} />}
        </Capa>
        <Ambiente T={T} n={30} />
      </Escena>
      {/* 5 · los multiplican y regresan */}
      <Escena T={T} a={K.Mu} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          {T < K.Mu + 3.0 ? <Frasco T={T} x={520} y={980} s={1.25} n={2 * Math.pow(2, dup) + 2} />
            : <g transform={`translate(0 ${-kprog(T, K.Mu + 3.0, K.Mu + 3.8, kEase.suave) * 0})`}>
              <line x1={380} y1={470} x2={380} y2={1220} stroke="#9aa3b5" strokeWidth={18} />
              <Bolsa T={T} x={380} y={klerp(1300, 720, kprog(T, K.Mu + 3.0, K.Mu + 3.7, kEase.sale))} s={1.05} nivel={0.85} etiqueta="TUS CÉLULAS" etq2="CAR-T" />
              <Brazo x={700} y={1090} s={0.7} T={T} />
            </g>}
        </Capa>
      </Escena>
      {/* 6 · re-gancho: la Lupa entra a la vena */}
      <Escena T={T} a={K.Pr} b={K.Ca} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <Capa><Brazo x={560} y={1060} s={1.0} T={T} /></Capa>
      </Escena>
      <Lupa T={T} at={K.Pr + 0.1} until={K.Ca + 0.1} x={420} y={720} r={230} fx={500} fy={1070} tinte={KC.mint} etiqueta="POR DENTRO · TU VENA"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill={KC.noche} />
          {[[90, 120], [400, 380], [380, 90]].map(([x, y], i) => <ellipse key={i} cx={x + Math.sin(t + i) * 10} cy={y} rx={50} ry={30} fill={SANG} opacity={0.6} />)}
          <LinfocitoT T={t} x={klerp(80, 170, kprog(t, K.Pr, K.Pr + 2))} y={r} r={70} car={1} seed={1} />
          <CelulaLeucemia T={t} x={360} y={r + 10} r={80} />
        </svg>} />
      {/* 7 · la caza */}
      <Escena T={T} a={K.Ca} b={K.Em} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Capa>
          {fondoCelulas.map(([x, y], i) => <ellipse key={i} cx={x + Math.sin(T * 0.8 + i) * 20} cy={y} rx={70} ry={42} fill={SANG} opacity={0.35} />)}
          <CelulaLeucemia T={T} x={720} y={980} r={135} rompe={rompe} />
          {divide < 0.05 ? <LinfocitoT T={T} x={klerp(260, 450, engancha)} y={980} r={120} car={1} seed={1} brillo={engancha} />
            : <g>
              <LinfocitoT T={T} x={klerp(450, 330, divide)} y={klerp(980, 820, divide)} r={klerp(120, 100, divide)} car={1} seed={1} />
              <LinfocitoT T={T} x={klerp(450, 640, divide)} y={klerp(980, 1120, divide)} r={klerp(120, 100, divide)} car={1} seed={2} />
              {T > K.Ca + 3.2 && <LinfocitoT T={T} x={760} y={820} r={kprog(T, K.Ca + 3.2, K.Ca + 3.8) * 90} car={1} seed={3} />}
            </g>}
          {engancha > 0.95 && rompe < 0.2 && <text x={590} y={850} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={5}>¡CLIC!</text>}
        </Capa>
        <Ambiente T={T} n={26} />
      </Escena>
      {/* 8 · Emily, 2012 */}
      <Escena T={T} a={K.Em} b={K.To} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa><Nina x={540} y={1150} s={1.3} color={KC.violet} />
          <circle cx={540} cy={910} r={240 + Math.sin(T * 2) * 6} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="16 14" strokeDashoffset={T * 30} opacity={0.6} /></Capa>
      </Escena>
      {/* 9 · la tormenta de citocinas · 10 · el tocilizumab */}
      <Escena T={T} a={K.To} b={K.Fd} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <Citocinas T={T} n={46} f={kprog(T, K.To + 0.2, K.To + 2.0) * (1 - baja * 0.4)} />
          {T < K.Ar ? <g>
              <TermometroT x={220} y={1130} v={klerp(0.35, 0.95, fiebre)} />
              <FlechaPresion x={560} y={760} p={kprog(T, K.To + 1.2, K.To + 3.0, kEase.suave)} />
            </g>
            : <g>
              <rect x={60} y={1100} width={960} height={70} rx={30} fill={KC.lilac} opacity={0.35} stroke={KC.ink} strokeWidth={5} />
              {[160, 340, 520, 700, 880].map((x, i) => <ReceptorIL6 key={i} T={T} x={x} y={1100} tapon={kprog(T, K.Ar + 0.3 + i * 0.15, K.Ar + 0.8 + i * 0.15, kEase.sale)} il6={1} />)}
              <TermometroT x={900} y={960} v={klerp(0.95, 0.4, baja)} />
            </g>}
        </Capa>
      </Escena>
      {/* 11 · la leucemia desapareció · FDA 2017 */}
      <Escena T={T} a={K.Fd} b={K.Ho} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          {[[200, 1080, 1], [400, 1150, 2], [600, 1060, 3]].map(([x, y, s], i) => <CelulaLeucemia key={i} T={T} x={x} y={y} r={70} seed={s} rompe={kprog(T, K.Fd + 0.2 + i * 0.25, K.Fd + 1.0 + i * 0.25)} />)}
          <Sello T={T} x={300} y={800} p={kprog(T, K.Fd + 1.6, K.Fd + 2.2)} />
        </Capa>
      </Escena>
      {/* 12 · 2012 → 2025 */}
      <Escena T={T} a={K.Ho} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          {(() => { const p = kprog(T, K.Ho + 0.3, K.Ho + 2.4, kEase.suave); const x0 = 120, x1 = 960; return <g>
            <line x1={x0} y1={1060} x2={x1} y2={1060} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
            <line x1={x0} y1={1060} x2={klerp(x0, x1, p)} y2={1060} stroke={KC.mint} strokeWidth={10} strokeLinecap="round" />
            {Array.from({ length: 14 }, (_, i) => { const x = klerp(x0, x1, i / 13); return <circle key={i} cx={x} cy={1060} r={i / 13 <= p ? 16 : 10} fill={i / 13 <= p ? KC.mint : '#fff'} stroke={KC.ink} strokeWidth={4} />; })}
            <text x={x0} y={1150} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>2012</text>
            <text x={x1} y={1150} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(p, 0.9, 1)}>2025</text>
            <Nina x={klerp(x0, x1, p)} y={985} s={0.35} color={KC.violet} />
          </g>; })()}
        </Capa>
        <NumeroGigante T={T} at={K.Ho + 0.6} until={K.Ci - 0.2} valor={13} dur={1.8} sufijo=" años" etiqueta="sin cáncer (dato de 2025)" y={800} tam={190} color={KC.mint} />
      </Escena>
      {/* 13 · cierre: la bolsa del inicio, ya vacía */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <line x1={380} y1={470} x2={380} y2={1220} stroke="#9aa3b5" strokeWidth={18} />
          <line x1={300} y1={470} x2={460} y2={470} stroke="#9aa3b5" strokeWidth={14} strokeLinecap="round" />
          <Bolsa T={T} x={380} y={720} s={1.0} nivel={klerp(0.5, 0.04, kprog(T, K.Ci, K.Ci + 3))} etiqueta="TUS CÉLULAS" etq2="CAR-T" />
          <path d={`M 380 930 Q 380 1000 470 1010 Q 560 1020 570 1060`} stroke="#dfe6ef" strokeWidth={14} fill="none" />
          <Brazo x={640} y={1090} s={0.8} T={T} />
          <LinfocitoT T={T} x={760} y={860} r={70} car={1} seed={2} brillo={0.6} o={kprog(T, K.Ci + 0.8, K.Ci + 1.4)} />
        </Capa>
      </Escena>

      {/* textos y etiquetas */}
      <Chip T={T} at={K.G + 2.4} until={K.Sa - 0.3} texto="terapia CAR-T" x={380} y={420} tam={48} borde={KC.mint} />
      <Etq T={T} at={K.Sa + 1.4} until={K.Vi - 0.3} x={680} y={1180} texto="linfocito T" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Sa + 0.4} until={K.Vi - 0.3} texto="aféresis: separa la sangre" x={330} y={1500} tam={34} borde={SANG} />
      {T > K.Sa && T < K.Vi && <Escala T={T} z={1} pxPorMm={PXMM * 110 / 110} x={720} y={1440} color={KC.ink} />}
      {T > K.Ca && T < K.Em && <Escala T={T} z={1} pxPorMm={240 / 0.007} x={60} y={1440} />}
      <Etq T={T} at={K.Vi + 0.6} until={K.Re - 0.3} x={1040} y={560} texto="lentivirus (no a escala)" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Vi + 1.2} until={K.Re - 0.2} texto="virus modificado: ya no enferma" x={540} y={1500} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Vi + 1.2} until={K.Re - 0.2} texto="solo entrega el gen" x={540} y={1600} tam={36} borde={KC.orange} />
      <Etq T={T} at={K.Re + 1.4} until={K.Ba - 0.2} x={560} y={740} texto="CAR: receptor quimérico" lado="der" tam={26} color={CARC} />
      <Etq T={T} at={K.Ba + 1.2} until={K.Mu - 0.2} x={700} y={760} texto="CD19" lado="der" tam={40} color={CD19C} />
      <Etq T={T} at={K.Ba + 0.8} until={K.Mu - 0.2} x={60} y={800} texto="linfocito T con CAR" lado="der" tam={30} color={CARC} />
      <Chip T={T} at={K.Ba + 0.9} until={K.Mu - 0.2} texto="célula de leucemia B" x={540} y={1500} tam={38} borde={LEU} />
      <Chip T={T} at={K.Ba + 1.8} until={K.Mu - 0.2} texto="también la tienen los linfocitos B sanos" x={540} y={1610} tam={28} borde={CD19C} />
      {T > K.Mu + 0.2 && T < K.Mu + 3.0 && <div style={{ position:'absolute', left:540, top:1500, transform:'translate(-50%,-50%)', zIndex:41, textAlign:'center',
        font:`900 40px ${KF.texto}`, color:KC.ink, background:'rgba(255,255,255,.85)', border:`4px solid ${KC.ink}`, borderRadius:24, padding:'10px 28px', whiteSpace:'nowrap' }}>
        tus linfocitos T → {T < K.Mu + 2.6 ? '×2 ×2 ×2…' : 'cientos de millones'}</div>}
      <Chip T={T} at={K.Mu + 2.8} until={K.Pr - 0.2} texto="cientos de millones de células" x={540} y={1500} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Ca + 3.0} until={K.Em - 0.2} texto="fármaco vivo" x={540} y={1500} tam={54} borde={KC.mint} />
      <Etq T={T} at={K.Ca + 0.4} until={K.Ca + 1.4} x={720} y={760} texto="CD19" lado="der" tam={36} color={CD19C} />
      <TarjetaEstudio T={T} at={K.Em + 0.2} until={K.To - 0.3} anio="2012" quien="Hospital de Niños de Filadelfia" revista="ensayo clínico fase 1/2 · Emily, 6 años" y={560} />
      <Chip T={T} at={K.Em + 2.8} until={K.To - 0.3} texto="leucemia linfoblástica aguda que regresó" x={540} y={1500} tam={30} borde={LEU} />
      <Chip T={T} at={K.Em + 4.4} until={K.To - 0.3} texto="silueta esquemática" x={540} y={1600} tam={26} borde="#ffffff" mono />
      <Chip T={T} at={K.To + 0.6} until={K.Ar - 0.2} texto="síndrome de liberación de citocinas" x={540} y={1500} tam={32} borde={CITO} />
      <Etq T={T} at={K.To + 1.0} until={K.Ar - 0.2} x={300} y={620} texto="citocinas" lado="der" tam={34} color={CITO} />
      <Chip T={T} at={K.Ar + 0.4} until={K.Fd - 0.2} texto="tocilizumab · bloquea el receptor de la IL-6" x={540} y={1500} tam={28} borde="#7ad7ff" />
      <Chip T={T} at={K.Ar + 0.4} until={K.Fd - 0.2} texto="(un medicamento para la artritis)" x={540} y={1600} tam={28} borde="#7ad7ff" />
      <Etq T={T} at={K.Ar + 1.0} until={K.Fd - 0.2} x={130} y={880} texto="IL-6 sin dónde engancharse" lado="der" tam={28} color={CITO} />
      <Chip T={T} at={K.Fd + 2.2} until={K.Ho - 0.2} texto="Kymriah (tisagenlecleucel)" x={540} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="tus células, cazando" x={540} y={1500} tam={46} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Sa - 0.1} texto="No es un medicamento común: *son tus células.*" />
      <Subtitulo T={T} idx={1} at={K.Sa + 0.1} until={K.Vi - 0.1} texto="Separan tus *linfocitos T.*" />
      <Subtitulo T={T} idx={2} at={K.Vi + 0.1} until={K.Re - 0.1} texto="Un virus les mete *un gen.*" />
      <Subtitulo T={T} idx={3} at={K.Re + 0.1} until={K.Ba - 0.1} texto="Un receptor nuevo: *el CAR.*" />
      <Subtitulo T={T} idx={4} at={K.Ba + 0.1} until={K.Mu - 0.1} texto="CD19 está en *la leucemia B.*" />
      <Subtitulo T={T} idx={5} at={K.Mu + 0.1} until={K.Pr - 0.1} texto="*Cientos de millones,* de vuelta a la vena." />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="¿Y si encuentra *una célula así?*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.Em - 0.1} texto="La mata: *un fármaco vivo.*" />
      <Subtitulo T={T} idx={8} at={K.Em + 0.1} until={K.To - 0.1} texto="2012: *Emily Whitehead,* 6 años." />
      <Subtitulo T={T} idx={9} at={K.To + 0.1} until={K.Ar - 0.1} texto="Una *tormenta de citocinas.*" />
      <Subtitulo T={T} idx={10} at={K.Ar + 0.1} until={K.Fd - 0.1} texto="La salvó *un medicamento para la artritis.*" />
      <Subtitulo T={T} idx={11} at={K.Fd + 0.1} until={K.Ho - 0.1} texto="2017: *aprobada* en Estados Unidos." />
      <Subtitulo T={T} idx={12} at={K.Ho + 0.1} until={K.Ci - 0.1} texto="13 años después: *sin cáncer.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Son tus células, *cazando.*" />

      <Robert T={T} apariciones={ROBERT_CART(CUES)} />
      <MarcaAgua T={T} tema="bioquimica" num="31" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Apariciones de Robert: [entrada, salida, pose, lado].
function ROBERT_CART(C) {
  return [
    [C.Gancho - 0.45, C.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
    [C.Saca + 0.6, C.Virus - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
    [C.Receptor + 0.4, C.Bandera - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
    [C.Pregunta - 0.2, C.Caza + 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
    [C.Caza + 1.4, C.Emily - 0.2, 'avatar_02_apuntando_camara', 'izq-alto'],
    [C.Tormenta + 0.2, C.Artritis - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
    [C.Artritis + 0.1, C.FDA - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
    [C.FDA + 0.1, C.Hoy - 0.1, 'avatar_02_apuntando_camara', 'grande'],
    [C.Hoy + 0.4, C.Cierre - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
    [C.Cierre + 0.2, C.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
  ];
}

function CarTApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CarT /></CompositionStage></div>;
}
window.CarTApp = CarTApp;
