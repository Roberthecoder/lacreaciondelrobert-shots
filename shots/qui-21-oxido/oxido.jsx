// Shot Químico #21 · Esa reja no se está ensuciando: está regresando a ser óxido — NARRADO (N1 por dentro + N5 estudio).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const OXI = '#c4561c', OXI2 = '#e07a2e', OXI3 = '#8a3a12', FE = '#9aa3b5', FE2 = '#5f6778', AL = '#dfe6ee', ALOX = '#3aa0ff', HEM = '#8e3b2a', PCOL = '#ffe11a';

// ---------- reja de la casa ----------
const RX = [160, 340, 520, 700, 880];
function rejaManchas(seed = 11, n = 70) {
  const R = krng(seed);
  return Array.from({ length: n }, (_, i) => {
    const enBarra = R() < 0.72;
    const x = enBarra ? RX[Math.floor(R() * RX.length)] + (R() - 0.5) * 26 : 110 + R() * 860;
    const y = enBarra ? 580 + R() * 600 : (R() < 0.5 ? 630 : 1150) + (R() - 0.5) * 24;
    return { x, y, r: 10 + R() * 26, th: R(), c: [OXI, OXI2, OXI3][Math.floor(R() * 3)], k: R() * 6 };
  });
}
const MANCHAS = rejaManchas();
function Reja({ T, oxido = 0, x = 0, y = 0, s = 1 }) {
  const barra = (k, d) => <path key={k} d={d} stroke={KC.ink} strokeWidth={44} strokeLinecap="round" fill="none" />;
  const barraIn = (k, d) => <path key={k} d={d} stroke="#2f3440" strokeWidth={30} strokeLinecap="round" fill="none" />;
  const ds = [...RX.map((rx) => `M ${rx} 560 L ${rx} 1200`), 'M 100 630 L 980 630', 'M 100 1150 L 980 1150'];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ds.map((d, i) => barra('b' + i, d))}
    {ds.map((d, i) => barraIn('i' + i, d))}
    {RX.map((rx, i) => <path key={'p' + i} d={`M ${rx - 22} 560 L ${rx} 510 L ${rx + 22} 560 Z`} fill="#2f3440" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />)}
    {MANCHAS.map((m, i) => { const f = kclamp((oxido - m.th * 0.85) / 0.15, 0, 1); if (f <= 0) return null;
      const rr = m.r * f * (0.9 + 0.1 * Math.sin(T * 0.8 + m.k));
      return <path key={i} d={`M ${m.x - rr} ${m.y} Q ${m.x - rr * 0.6} ${m.y - rr * 1.1} ${m.x + rr * 0.2} ${m.y - rr * 0.8} Q ${m.x + rr * 1.2} ${m.y - rr * 0.3} ${m.x + rr * 0.8} ${m.y + rr * 0.6} Q ${m.x} ${m.y + rr * 1.2} ${m.x - rr} ${m.y} Z`} fill={m.c} opacity={0.95} />; })}
  </g>;
}
// Dedo que pasa por el barrote y se lleva polvo naranja.
function Dedo({ x, y, polvo = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(-20)`}>
    <rect x={-40} y={-10} width={80} height={260} rx={40} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -24 20 Q 0 4 24 20 L 24 60 Q 0 72 -24 60 Z" fill="#ffe0d0" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={6} rx={36} ry={20} fill={OXI2} opacity={polvo} />
  </g>;
}
// Roca de hematita.
function Roca({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -130 40 L -100 -70 L -20 -110 L 80 -90 L 140 -10 L 110 80 L -10 110 L -110 90 Z" fill={HEM} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -60 -40 L 0 -70 L 50 -30 M 20 20 L 80 10 M -80 40 L -30 60" stroke="#b9573f" strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={-40} cy={10} r={10} fill="#6d2a1e" /><circle cx={60} cy={50} r={8} fill="#6d2a1e" />
  </g>;
}
// Alto horno esquemático.
function AltoHorno({ T, x, y, fuego = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 -380 L 110 -380 L 150 60 L 120 200 L -120 200 L -150 60 Z" fill="#6b6f7a" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-60} y={-470} width={120} height={95} fill="#555963" stroke={KC.ink} strokeWidth={9} />
    {[-300, -200, -100, 0, 100].map((yy, i) => <line key={i} x1={-120 - i * 6} x2={120 + i * 6} y1={yy} y2={yy} stroke="#4a4e57" strokeWidth={6} />)}
    <rect x={-80} y={70} width={160} height={110} rx={14} fill={KC.ink} />
    {fuego > 0 && <g opacity={fuego}>{[-50, -20, 10, 40].map((dx, i) => { const h = 70 + Math.sin(T * 13 + i) * 18; return <path key={i} d={`M ${dx - 22} 180 Q ${dx} ${180 - h * 1.3} ${dx + 22} 180 Z`} fill={i % 2 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={4} />; })}</g>}
  </g>;
}
// Átomo de hierro (red cristalina).
function RedFe({ T, x0 = 150, y0 = 880, cols = 8, filas = 4, paso = 110, color = (c, f) => FE, letra = 'Fe' }) {
  const out = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * paso + (f % 2) * paso / 2, y = y0 + f * paso * 0.9;
    out.push(<Atomo key={f * 100 + c} x={x + Math.sin(T * 2 + c + f) * 2} y={y} r={46} color={color(c, f)} letra={letra} tam={34} />);
  }
  return <g>{out}</g>;
}
function Gota({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -110 Q 70 -10 70 30 Q 70 100 0 100 Q -70 100 -70 30 Q -70 -10 0 -110 Z" fill="rgba(127,200,255,.55)" stroke="#bfe8ff" strokeWidth={6} />
    <Mol tipo="agua" x={0} y={30} s={0.8} />
  </g>;
}
function Cubito({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-26} y={-26} width={52} height={52} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={8} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>NaCl</text>
  </g>;
}
// Bloque en corte (para hierro vs aluminio y el barrote).
function Globo({ T, x, y, r }) {
  return <g>
    <circle cx={x} cy={y} r={r} fill="#3aa0ff" stroke={KC.ink} strokeWidth={10} />
    <g transform={`translate(${x} ${y}) rotate(${T * 6})`}>
      <path d={`M ${-r * 0.6} ${-r * 0.3} q 40 -60 110 -30 q 30 50 -20 90 q -70 10 -90 -60 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
      <path d={`M ${r * 0.1} ${r * 0.1} q 60 -20 90 30 q -10 70 -60 80 q -50 -40 -30 -110 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}
function Pilar({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -560 L 50 -560 L 62 0 L -62 0 Z" fill="#4b3a30" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -36 -540 L -30 -20" stroke="#7a6252" strokeWidth={10} strokeLinecap="round" />
    {[-620, -660, -700].map((yy, i) => <rect key={i} x={-70 + i * 10} y={yy} width={140 - i * 20} height={40} rx={10} fill="#5a463a" stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -40 -720 Q 0 -780 40 -720 Z" fill="#5a463a" stroke={KC.ink} strokeWidth={8} />
    {[-170, -110, -50, 10, 70, 130, 190].map((dx, i) => <line key={i} x1={dx} x2={dx} y1={-130} y2={20} stroke={KC.ink} strokeWidth={10} />)}
    <line x1={-190} x2={210} y1={-110} y2={-110} stroke={KC.ink} strokeWidth={10} />
    <rect x={-260} y={10} width={520} height={40} fill="#c9b58e" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Flecha({ x1, y1, x2, y2, color = KC.ink, w = 10 }) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 30;
  return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
    <path d={`M ${x2} ${y2} L ${x2 - L * Math.cos(a - 0.5)} ${y2 - L * Math.sin(a - 0.5)} L ${x2 - L * Math.cos(a + 0.5)} ${y2 - L * Math.sin(a + 0.5)} Z`} fill={color} /></g>;
}
function TextoMas({ T, at, until, texto, x = KW / 2, y = 1520, tam = 130, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, font:`400 ${tam}px/0.95 ${KF.titulo}`, color,
    WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>;
}

function Oxido() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Mina, Re: CUES.Receta, Sa: CUES.Sal, Po: CUES.Poroso, Al: CUES.Aluminio, Pr: CUES.Pregunta, Pi: CUES.Pilar, Es: CUES.Estudio, Co: CUES.Costo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const oxG = klerp(0.08, 0.55, kprog(T, K.G, K.Mi, kEase.suave));
  const dedo = kprog(T, K.G + 0.05, K.G + 0.9, kEase.sale);
  const mar = K.Sa + 3.6;
  // mina
  const entra = kprog(T, K.Mi + 2.6, K.Mi + 3.4, kEase.suave), sale = kprog(T, K.Mi + 4.2, K.Mi + 5.2, kEase.sale);
  // receta
  const o2x = klerp(-80, 470, kprog(T, K.Re + 0.4, K.Re + 1.6, kEase.sale)), gotaY = klerp(300, 640, kprog(T, K.Re + 1.2, K.Re + 2.2, kEase.sale));
  const reac = kprog(T, K.Re + 2.4, K.Re + 4.2);
  const crece = kprog(T, K.Sa + 1.0, K.Sa + 2.4, kEase.sale);
  // poroso
  const capa = kprog(T, K.Po + 0.3, K.Al - 0.3, kEase.suave);
  const R = krng(9);
  const grietas = Array.from({ length: 9 }, () => [R(), R()]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la reja de la casa */}
      <Escena T={T} a={K.G} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Reja T={T} oxido={oxG} />
          {dedo < 1 || T < K.G + 2.2 ? <Dedo x={klerp(420, 362, dedo)} y={klerp(700, 930, dedo)} polvo={kprog(T, K.G + 0.2, K.G + 0.8)} /> : null}
        </SvgCapa>
        <Escala T={T} pxPorMm={2} x={60} y={1640} color={KC.ink} />
      </Escena>
      {/* 1 · la mina y el alto horno */}
      <Escena T={T} a={K.Mi} b={K.Re} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <AltoHorno T={T} x={600} y={1000} fuego={kprog(T, K.Mi + 3.0, K.Mi + 3.4)} />
          {entra < 1 && <Roca x={klerp(220, 600, entra)} y={klerp(1060, 700, entra)} s={klerp(1.1, 0.5, entra)} o={1 - kprog(T, K.Mi + 3.2, K.Mi + 3.4)} />}
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.Mi + 3.6 + i * 0.35, p = kprog(T, t0, t0 + 1.6, kEase.suave); if (T < t0) return null;
            return <g key={i} opacity={1 - kprog(T, t0 + 1.3, t0 + 1.6)}><Atomo x={600 + Math.sin(i * 2.3) * 40 + p * (i % 2 ? 60 : -60)} y={klerp(520, 380, p)} r={30} color={QA.O} letra="O" tam={28} /></g>; })}
          {sale > 0 && <g transform={`translate(${klerp(600, 860, sale)} ${1150})`}>
            <rect x={-160} y={-26} width={320} height={52} rx={26} fill={FE} stroke={KC.ink} strokeWidth={8} />
            <rect x={-130} y={-16} width={200} height={10} rx={5} fill="#fff" opacity={0.6} />
            <text x={0} y={14} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>Fe</text></g>}
        </SvgCapa>
      </Escena>
      {/* 2–3 · por dentro: hierro + oxígeno + agua; la sal */}
      <Escena T={T} a={K.Re} b={mar} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <RedFe T={T} x0={150} y0={760} color={(c, f) => (f === 0 && Math.abs(c - 3.5) < 1 + reac * 3 && reac > 0) ? mixHex(FE, OXI, kclamp(reac * 1.4 - Math.abs(c - 3.5) * 0.25, 0, 1)) : FE} />
          {reac < 1 && <g opacity={1 - reac}><Mol tipo="o2" x={o2x} y={640} s={1.3} rot={T * 40} /></g>}
          <Gota x={600} y={gotaY} s={klerp(1, 1.6, crece)} o={1 - reac * 0.4} />
          {reac > 0.2 && <text x={540} y={1160} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={OXI2} opacity={kprog(T, K.Re + 3, K.Re + 3.5)}>Fe₂O₃·nH₂O</text>}
          {/* mini-tabla: solo aire · solo agua · los dos */}
          {T < K.Sa && [['solo aire', false], ['solo agua', false], ['aire + agua', true]].map(([t, ok], i) => { const o = kprog(T, K.Re + 2.6 + i * 0.4, K.Re + 3.0 + i * 0.4); if (o <= 0) return null;
            return <g key={i} opacity={o}><text x={200 + i * 340} y={470} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>{t}</text><Marca x={200 + i * 340} y={570} ok={ok} s={0.75} o={o} /></g>; })}
          {/* la sal */}
          {T > K.Sa && [[480, 0], [580, 0.2], [680, 0.4], [540, 0.6]].map(([x, d], i) => { const p = kprog(T, K.Sa + 0.2 + d, K.Sa + 1.0 + d, kEase.entra || undefined);
            return <g key={i} opacity={1 - kprog(T, K.Sa + 1.2 + d, K.Sa + 1.6 + d)}><Cubito x={x} y={klerp(260, 600, p)} rot={T * 90 + i * 40} /></g>; })}
          {T > K.Sa + 2.0 && Array.from({ length: 6 }, (_, i) => { const ph = ((T - K.Sa) * 1.6 + i / 6) % 1; const x = klerp(420, 780, ph), y = 720 - Math.sin(ph * Math.PI) * 120;
            return <path key={i} d={`M ${x - 16} ${y} l 10 -18 l 4 14 l 14 -20`} stroke={KC.yellow} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
        </SvgCapa>
        <Escala T={T} pxPorMm={4.4e8} objetivo={500} x={60} y={1640} />
      </Escena>
      {/* 3b · junto al mar */}
      <Escena T={T} a={mar} b={K.Po} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Reja T={T} oxido={0.85} y={-60} />
          {[0, 1, 2].map((i) => <path key={i} d={`M -20 ${1200 + i * 50} ${Array.from({ length: 12 }, (_, k) => `Q ${k * 100 + 50} ${1200 + i * 50 + Math.sin(T * 3 + k + i) * 24 - 30} ${k * 100 + 100} ${1200 + i * 50}`).join(' ')} L 1100 1920 L -20 1920 Z`} fill={['#2b8fd6', '#1f6fb0', '#185a91'][i]} stroke={KC.ink} strokeWidth={6} />)}
        </SvgCapa>
      </Escena>
      {/* 4 · el óxido es poroso: corte del barrote */}
      <Escena T={T} a={K.Po} b={K.Al} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <SvgCapa>
          {(() => { const cx = 540, cy = 830, Rm = 280, nucleo = Rm * klerp(0.92, 0.55, capa), ox = Rm * klerp(0.98, 1.12, capa);
            return <g>
              <circle cx={cx} cy={cy} r={ox} fill={OXI} stroke={KC.ink} strokeWidth={10} />
              {Array.from({ length: 26 }, (_, i) => { const a = i * 2.4, rr = klerp(nucleo + 20, ox - 14, (i * 0.37) % 1); return <circle key={i} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} r={7 + (i % 4) * 4} fill={OXI3} />; })}
              {grietas.map(([a, l], i) => { const ang = a * Math.PI * 2; return <path key={i} d={`M ${cx + Math.cos(ang) * ox} ${cy + Math.sin(ang) * ox} L ${cx + Math.cos(ang + 0.05) * klerp(ox, nucleo, 0.5 + l * 0.5)} ${cy + Math.sin(ang + 0.05) * klerp(ox, nucleo, 0.5 + l * 0.5)}`} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Po + 0.4 + i * 0.15, K.Po + 0.8 + i * 0.15)} />; })}
              <circle cx={cx} cy={cy} r={nucleo} fill={FE} stroke={KC.ink} strokeWidth={10} />
              <circle cx={cx - nucleo * 0.3} cy={cy - nucleo * 0.3} r={nucleo * 0.25} fill="#fff" opacity={0.25} />
              <text x={cx} y={cy + 16} textAnchor="middle" style={{ font:`700 48px ${KF.mono}` }} fill={KC.ink}>Fe</text>
              {/* escamas que se desprenden */}
              {[0, 1, 2].map((i) => { const t0 = K.Po + 1.6 + i * 1.1, p = kprog(T, t0, t0 + 1.6, kEase.suave); if (T < t0) return null;
                const ang = -0.4 + i * 0.9; return <path key={i} transform={`translate(${cx + Math.cos(ang) * ox + p * 140 * Math.cos(ang)} ${cy + Math.sin(ang) * ox + p * p * 500}) rotate(${p * 200})`} d="M -40 -14 L 30 -22 L 46 10 L -20 22 Z" fill={OXI2} stroke={KC.ink} strokeWidth={5} opacity={1 - kprog(T, t0 + 1.2, t0 + 1.6)} />; })}
              {/* O₂ que se cuela por los poros */}
              {[0, 1, 2, 3].map((i) => { const t0 = K.Po + 0.6 + i * 1.2, p = kprog(T, t0, t0 + 1.2, kEase.suave); if (T < t0 || p >= 1) return null; const ang = 2.2 + i * 0.5;
                return <Mol key={i} tipo="o2" x={cx + Math.cos(ang) * klerp(ox + 120, nucleo + 10, p)} y={cy + Math.sin(ang) * klerp(ox + 120, nucleo + 10, p)} s={0.6} rot={T * 60} />; })}
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 5 · hierro vs aluminio */}
      <Escena T={T} a={K.Al} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <rect x={60} y={700} width={440} height={300} fill={FE} stroke={KC.ink} strokeWidth={10} />
          <path d={`M 60 700 L 60 640 Q 140 610 200 650 L 230 620 Q 320 600 380 650 L 420 625 Q 470 620 500 650 L 500 700 Z`} fill={OXI} stroke={KC.ink} strokeWidth={8} />
          {[120, 230, 330, 440].map((x, i) => <path key={i} d={`M ${x} 625 L ${x + 12} 680 L ${x - 6} 710`} stroke={KC.ink} strokeWidth={6} fill="none" />)}
          <rect x={580} y={700} width={440} height={300} fill={AL} stroke={KC.ink} strokeWidth={10} />
          <rect x={580} y={686} width={440} height={14} fill={ALOX} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Al + 1.6, K.Al + 2.2)} />
          {[0, 1, 2].map((i) => { const t0 = K.Al + 0.4 + i * 0.9; const p = kprog(T, t0, t0 + 1.2); if (T < t0) return null; return <Mol key={'f' + i} tipo="o2" x={150 + i * 120} y={klerp(440, 760, p)} s={0.55} rot={T * 50} o={1 - kprog(T, t0 + 1.0, t0 + 1.2)} />; })}
          {[0, 1, 2].map((i) => { const t0 = K.Al + 2.0 + i * 0.7; const p = kprog(T, t0, t0 + 1.4); if (T < t0) return null; const yy = p < 0.5 ? klerp(440, 650, p * 2) : klerp(650, 440, (p - 0.5) * 2);
            return <Mol key={'a' + i} tipo="o2" x={680 + i * 120 + p * 40} y={yy} s={0.55} rot={T * 50} />; })}
          <text x={280} y={1090} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>HIERRO</text>
          <text x={800} y={1090} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>ALUMINIO</text>
        </SvgCapa>
        <Etq T={T} at={K.Al + 2.0} until={K.Pr - 0.2} x={1020} y={580} texto="Al₂O₃ (capa delgadísima)" lado="izq" tam={30} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Pi} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <path d="M 120 1180 L 120 620" stroke={KC.ink} strokeWidth={44} strokeLinecap="round" /><path d="M 120 1180 L 120 620" stroke={OXI} strokeWidth={30} strokeLinecap="round" />
          <text x={320} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.orange} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 320 900)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · el pilar de Delhi */}
      <Escena T={T} a={K.Pi} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Pilar x={360} y={1150} s={kprog(T, K.Pi - 0.2, K.Pi + 0.5, kEase.sale)} /></SvgCapa>
      </Escena>
      {/* 8 · el estudio: fósforo y capa compacta */}
      <Escena T={T} a={K.Es} b={K.Co}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <RedFe T={T} x0={150} y0={880} filas={3} color={() => '#6d625a'} />
          {Array.from({ length: 7 }, (_, i) => { const o = kprog(T, K.Es + 2.4 + i * 0.12, K.Es + 2.8 + i * 0.12); return <g key={i} opacity={o}><Atomo x={205 + i * 110} y={800} r={26} color={PCOL} letra="P" tam={24} /></g>; })}
          {(() => { const w = 900 * kprog(T, K.Es + 3.2, K.Es + 4.6, kEase.suave); return w > 0 && <g>
            <rect x={90} y={700} width={w} height={60} rx={14} fill="#4c6a8c" stroke="#bfe8ff" strokeWidth={5} />
            {w > 600 && <text x={540} y={742} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">δ-FeOOH + fosfatos</text>}</g>; })()}
          {[0, 1, 2].map((i) => { const t0 = K.Es + 4.4 + i * 0.5; const p = kprog(T, t0, t0 + 1.2); if (T < t0) return null; const yy = p < 0.5 ? klerp(470, 630, p * 2) : klerp(630, 470, (p - 0.5) * 2);
            return <Mol key={i} tipo="o2" x={460 + i * 200} y={yy} s={0.6} rot={T * 50} />; })}
        </SvgCapa>
      </Escena>
      {/* 9 · el costo */}
      <Escena T={T} a={K.Co} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        <SvgCapa>
          <Globo T={T} x={470} y={900} r={230} />
          {Array.from({ length: 16 }, (_, i) => { const ph = ((T - K.Co) * 0.5 + i / 16) % 1, x = 120 + ((i * 197) % 840); return T > K.Co + 0.3 ? <path key={i} transform={`translate(${x} ${klerp(420, 1250, ph)}) rotate(${ph * 300 + i * 30})`} d="M -22 -8 L 18 -12 L 26 6 L -12 12 Z" fill={[OXI, OXI2, OXI3][i % 3]} stroke={KC.ink} strokeWidth={4} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la reja del inicio, ya muy oxidada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Reja T={T} oxido={klerp(0.6, 1, kprog(T, K.Ci, K.Ci + 3))} />
          <g opacity={kprog(T, K.Ci + 1.2, K.Ci + 2.0)}>
            <Roca x={250} y={1060} s={0.9} o={0.92} />
            <Flecha x1={380} y1={1050} x2={560} y2={980} />
          </g>
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿mugre?" x={300} y={440} tam={52} />
      <Chip T={T} at={K.G + 2.4} until={K.Mi - 0.3} texto="óxido de hierro" y={1500} tam={50} borde={OXI2} />
      <Chip T={T} at={K.Mi + 0.3} until={K.Mi + 3.0} texto="en las rocas: óxido de hierro" y={1500} tam={40} borde={HEM} />
      <Etq T={T} at={K.Mi + 0.5} until={K.Mi + 2.6} x={30} y={870} texto="hematita · Fe₂O₃" tam={27} color={KC.ink} />
      <Chip T={T} at={K.Mi + 3.4} until={K.Re - 0.3} texto="alto horno: le quita el oxígeno" y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.Re + 0.3} until={K.Re + 2.4} texto="hierro + O₂ + H₂O" y={1500} tam={44} borde={ALOX} />
      <Chip T={T} at={K.Re + 3.0} until={K.Sa - 0.2} texto="los dos juntos → óxido" y={1500} tam={42} borde={OXI2} />
      <Chip T={T} at={K.Sa + 0.3} until={mar - 0.2} texto="sal: atrapa humedad y conduce" y={1480} tam={36} borde="#fff" />
      <Medidor T={T} at={K.Sa + 1.2} until={mar - 0.2} valor={(t) => klerp(0.25, 0.9, kprog(t, K.Sa + 1.6, K.Sa + 3.2))} etiqueta="velocidad de oxidación" texto={(v) => v > 0.6 ? 'más rápida' : 'lenta'} y={1570} color={KC.orange} />
      <Chip T={T} at={mar + 0.3} until={K.Po - 0.2} texto="junto al mar: más óxido" y={1500} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.Po + 0.6} until={K.Al - 0.3} x={60} y={1190} texto="óxido: grietas y poros" tam={34} color={OXI2} />
      <Chip T={T} at={K.Po + 2.4} until={K.Al - 0.3} texto="se descarapela → hierro nuevo al aire" y={1500} tam={34} borde={OXI2} />
      <Chip T={T} at={K.Al + 2.6} until={K.Pr - 0.2} texto="pasivación: la capa protege" y={1500} tam={40} borde={ALOX} />
      <Chip T={T} at={K.Pi + 0.3} until={K.Es - 0.3} texto="📍 Delhi, India" x={760} y={440} tam={44} borde={KC.leaf} />
      <TextoMas T={T} at={K.Pi + 1.2} until={K.Es - 0.3} texto="+1600 años" x={720} y={1500} tam={120} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.4} anio="2002" quien="R. Balasubramaniam · IIT Kanpur" revista="Current Science · pilar de hierro de Delhi" y={620} />
      <Chip T={T} at={K.Es + 2.6} until={K.Co - 0.3} texto="fósforo → capa compacta" y={1500} tam={44} borde={PCOL} />
      <TextoMas T={T} at={K.Co + 0.4} until={K.Ci - 0.3} texto="2.5 billones USD" y={1480} tam={110} />
      <Chip T={T} at={K.Co + 1.0} until={K.Ci - 0.3} texto="al año · estimación NACE IMPACT, 2016" y={1610} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="Fe → óxido de hierro, otra vez" y={1500} tam={40} borde={OXI2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="No es mugre: *es óxido.*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.Re - 0.1} texto="Le quitan *el oxígeno.*" />
      <Subtitulo T={T} idx={2} at={K.Re + 0.1} until={K.Sa - 0.1} texto="Necesita *oxígeno y agua.*" />
      <Subtitulo T={T} idx={3} at={K.Sa + 0.1} until={K.Po - 0.1} texto="La sal *lo acelera.*" />
      <Subtitulo T={T} idx={4} at={K.Po + 0.1} until={K.Al - 0.1} texto="El óxido *se descarapela.*" />
      <Subtitulo T={T} idx={5} at={K.Al + 0.1} until={K.Pr - 0.1} texto="Aluminio: *capa que protege.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Pi - 0.1} texto="¿Y el hierro *no puede?*" />
      <Subtitulo T={T} idx={7} at={K.Pi + 0.1} until={K.Es - 0.1} texto="+1600 años *resistiendo.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Co - 0.1} texto="El fósforo *forma una capa.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="*2.5 billones* de dólares al año." />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Regresa a ser *óxido.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mina + 1.0, CUES.Receta - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Sal + 0.8, CUES.Poroso - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Poroso + 1.0, CUES.Aluminio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Pilar + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.6, CUES.Costo - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Costo + 0.8, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="21" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OxidoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Oxido /></CompositionStage></div>;
}
window.OxidoApp = OxidoApp;
