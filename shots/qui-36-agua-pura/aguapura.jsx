// Shot Químico #36 · El agua pura casi no conduce: lo que conduce son los iones — NARRADO (N2 el número + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (medidores en escala logarítmica).
const AGUA_PURA = '#e6f7ff', AGUA_MAR = '#5fb8e8', AGUA_LLAVE = '#a9dcf5', COBRE = '#d9822b';

// Medidor de conductividad con aguja. v = 0..1 (posición en escala log), lectura = texto bajo el dial.
function Conductimetro({ T, x, y, v = 0, s = 1, lectura, color = KC.mint, tiembla = 0, nombre }) {
  const ang = -80 + 160 * kclamp(v + Math.sin(T * 23) * tiembla, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-120} width={300} height={200} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 30 A 110 110 0 0 1 110 30" fill="none" stroke="#d8d0c0" strokeWidth={22} />
    <path d="M 60 -62 A 110 110 0 0 1 110 30" fill="none" stroke={KC.red} strokeWidth={22} opacity={0.8} />
    {[0, 0.25, 0.5, 0.75, 1].map((k) => { const a = (-80 + 160 * k - 90) * Math.PI / 180; return <line key={k} x1={Math.cos(a) * 82} y1={30 + Math.sin(a) * 82} x2={Math.cos(a) * 100} y2={30 + Math.sin(a) * 100} stroke={KC.ink} strokeWidth={5} />; })}
    <g transform={`translate(0 30) rotate(${ang})`}><path d="M -7 0 L 0 -100 L 7 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>
    <circle cx={0} cy={30} r={14} fill={KC.ink} />
    <text x={0} y={66} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#6b6255">µS/cm · escala log</text>
    {lectura && <g><rect x={-130} y={92} width={260} height={56} rx={14} fill={KC.dark} stroke={color} strokeWidth={5} />
      <text x={0} y={132} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{lectura}</text></g>}
    {nombre && <g><rect x={-130} y={lectura ? 160 : 92} width={260} height={52} rx={12} fill={KC.ink} />
      <text x={0} y={(lectura ? 160 : 92) + 36} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{nombre}</text></g>}
  </g>;
}
// Vaso con dos varillas (electrodos) y cables hacia el medidor de abajo. baja = 0..1 (las varillas entran al agua).
function VasoElectrodos({ x, y, s = 1, liquido, baja = 1, iones = 0, T, seed = 3, rotulo }) {
  const R = krng(seed);
  const dots = Array.from({ length: 22 }, () => [(R() - 0.5) * 190, -R() * 230 - 10, R() * 6, R() < 0.5]);
  const dy = klerp(-170, 0, baja);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <VasoLab x={0} y={0} s={1} liquido={liquido} nivel={0.82} ancho={240} alto={320} marcas={false}>
      {dots.map(([dx, yy, ph, pos], i) => i / dots.length < iones ? <circle key={i} cx={dx + Math.sin(T * 2 + ph) * 8} cy={yy + Math.cos(T * 2.4 + ph) * 8} r={9} fill={pos ? QA.Na : QA.Cl} stroke={KC.ink} strokeWidth={3} /> : null)}
    </VasoLab>
    {[-50, 50].map((ex, i) => <g key={i}>
      <rect x={ex - 9} y={-300 + dy} width={18} height={260} rx={6} fill="#b9c0cc" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${ex} ${-300 + dy} Q ${ex + (i ? 160 : -160)} ${-380 + dy} ${i ? 150 : -150} ${-120} L ${i ? 150 : -150} 60 Q ${i ? 140 : -140} 110 ${i ? 40 : -40} 120`} fill="none" stroke={i ? KC.red : KC.ink} strokeWidth={8} strokeLinecap="round" />
    </g>)}
    {rotulo && <g><rect x={-120} y={18} width={240} height={52} rx={12} fill={KC.ink} />
      <text x={0} y={54} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{rotulo}</text></g>}
  </g>;
}
function Barra() {
  return <g><rect x={0} y={1180} width={KW} height={60} fill="#f2e3c6" stroke={KC.ink} strokeWidth={8} /><rect x={0} y={1236} width={KW} height={700} fill="#c98f5a" /></g>;
}
// Ion con carga (Na⁺ morado / Cl⁻ verde)
function Ion({ x, y, pos = true, s = 1, o = 1 }) {
  return <g opacity={o}><Atomo x={x} y={y} r={32 * s} color={pos ? QA.Na : QA.Cl} letra={pos ? 'Na⁺' : 'Cl⁻'} tam={24 * s} /></g>;
}
function Placa({ x, y0, y1, pos, brillo = 0 }) {
  return <g>
    <rect x={x - 16} y={y0} width={32} height={y1 - y0} rx={8} fill="#b9c0cc" stroke={KC.ink} strokeWidth={6} />
    {brillo > 0 && <rect x={x - 26} y={y0 - 10} width={52} height={y1 - y0 + 20} rx={14} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={brillo} />}
    <circle cx={x} cy={y0 - 40} r={30} fill={pos ? KC.red : KC.blue} stroke={KC.ink} strokeWidth={5} />
    <text x={x} y={y0 - 28} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill="#fff">{pos ? '+' : '−'}</text>
  </g>;
}
function Llave({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -60 L 20 -60 Q 60 -60 60 -20 L 60 10" stroke="#9aa3b5" strokeWidth={34} fill="none" strokeLinecap="round" />
    <rect x={-40} y={-100} width={40} height={30} rx={8} fill="#7c8596" stroke={KC.ink} strokeWidth={5} />
    <circle cx={60} cy={30 + ((T * 140) % 90)} r={12} fill="#7fc8ff" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Alberca({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-50} width={220} height={110} rx={16} fill="#2fc6f0" stroke={KC.ink} strokeWidth={7} />
    {[0, 1].map((k) => <path key={k} d={`M -90 ${-10 + k * 40} q 22 ${-14 + Math.sin(T * 3) * 4} 45 0 t 45 0 t 45 0 t 45 0`} stroke="#fff" strokeWidth={5} fill="none" />)}
    <path d="M 70 -50 L 70 -110 M 100 -50 L 100 -110 M 70 -80 L 100 -80" stroke="#9aa3b5" strokeWidth={8} />
  </g>;
}
function Suelo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-30} width={220} height={100} rx={14} fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -30 L 0 -90 M 0 -60 Q 30 -90 40 -100 M 0 -70 Q -30 -90 -36 -105" stroke={KC.leaf} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 0 -30 Q -10 10 -30 40 M 0 -30 Q 15 5 35 30" stroke="#f2e3c6" strokeWidth={5} fill="none" />
  </g>;
}
function Persona({ x, y, s = 1, color = '#f1b48f' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={90} fill={color} stroke={KC.ink} strokeWidth={10} />
    <path d="M -150 300 L -150 -80 Q -150 -180 0 -180 Q 150 -180 150 -80 L 150 300 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={10} />
    <path d="M 130 -120 Q 260 -110 300 -230" stroke={color} strokeWidth={60} fill="none" strokeLinecap="round" />
    <path d="M 130 -120 Q 260 -110 300 -230" stroke={KC.ink} strokeWidth={70} fill="none" strokeLinecap="round" opacity={0.0} />
  </g>;
}
function Enchufe({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-110} width={160} height={220} rx={22} fill="#fffaf0" stroke={KC.ink} strokeWidth={8} />
    {[-45, 45].map((dy) => <g key={dy}><rect x={-30} y={dy - 22} width={12} height={36} rx={4} fill={KC.ink} /><rect x={18} y={dy - 22} width={12} height={36} rx={4} fill={KC.ink} /></g>)}
  </g>;
}
function Lavabo({ x, y, s = 1, T, gotea = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 0 L 200 0 Q 190 130 0 140 Q -190 130 -200 0 Z" fill="#fdfdfd" stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -150 L 40 -150 Q 70 -150 70 -110 L 70 -70" stroke="#9aa3b5" strokeWidth={28} fill="none" strokeLinecap="round" />
    {gotea && <circle cx={70} cy={-50 + ((T * 160) % 70)} r={10} fill="#7fc8ff" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
function Secadora({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -120 -50 L 80 -50 Q 120 -50 120 0 Q 120 50 80 50 L -120 50 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={40} width={60} height={150} rx={18} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <rect x={120} y={-36} width={30} height={72} rx={6} fill="#555" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 190 Q -40 260 -140 250" stroke={KC.ink} strokeWidth={8} fill="none" />
  </g>;
}
function Peligro({ x, y, s = 1, T }) {
  const p = 1 + 0.05 * Math.sin(T * 8);
  return <g transform={`translate(${x} ${y}) scale(${s * p})`}>
    <path d="M 0 -120 L 125 100 L -125 100 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <path d="M 12 -60 L -24 20 L 6 20 L -12 80 L 30 0 L 0 0 Z" fill={KC.ink} />
  </g>;
}
// Mundo molecular: moléculas de agua que se mecen (fondo noche)
function AguaMicro({ T, n = 26, seed = 11, w = KW, h = KH, y0 = 380, y1 = 1260, s = 0.62, o = 0.85 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x = R() * w, y = y0 + R() * (y1 - y0), ph = R() * 6;
    return <Mol key={i} tipo="agua" x={x + Math.sin(T * 0.8 + ph) * 14} y={y + Math.cos(T * 0.7 + ph) * 12} s={s} rot={(T * 25 + ph * 60) % 360} o={o} />; })}</g>;
}

function AguaPura() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Io: CUES.Iones, Pu: CUES.Pura, Pr: CUES.Pregunta, Re: CUES.Real, Es: CUES.Estudio, Cu: CUES.Cuerpo, Pe: CUES.Peligro, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: las varillas bajan y las agujas reaccionan desde el cuadro 0
  const baja = kprog(T, K.G, K.G + 0.5, kEase.sale);
  const vMar = 0.96 * kprog(T, K.G + 0.45, K.G + 0.9, kEase.rebote), vPura = 0.1 * kprog(T, K.G + 0.45, K.G + 1.2);
  // iones de la sal: de un cubito a todos lados, luego cada uno a su placa
  const R = krng(42);
  const iones = Array.from({ length: 16 }, (_, i) => ({ i, pos: (i + Math.floor(i / 4)) % 2 === 0, gx: 480 + (i % 4) * 40, gy: 840 + Math.floor(i / 4) * 40, fx: 200 + R() * 680, fy: 640 + R() * 480, ph: R() * 6 }));
  const disuelve = (i) => kprog(T, K.Io + 0.4 + i * 0.08, K.Io + 2.2 + i * 0.08, kEase.suave);
  const viaja = kprog(T, K.Io + 3.6, K.Io + 6.4, kEase.suave);
  // agua pura: autoionización rara
  const parte = (t0) => kprog(T, t0, t0 + 0.3) * (1 - kprog(T, t0 + 1.1, t0 + 1.5));
  // estudio: CO2 que entra
  const co2 = Array.from({ length: 6 }, (_, i) => ({ x: 420 + (i % 3) * 110, t0: K.Es + 3.8 + i * 0.5 }));
  const lecturaEs = klerp(0.055, 1.0, kprog(T, K.Es + 5.0, K.Es + 7.5, kEase.suave));
  const vEs = klerp(0.1, 0.29, kprog(T, K.Es + 5.0, K.Es + 7.5, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho: dos vasos con medidor; luego la lupa al agua de mar */}
      <Escena T={T} a={K.G} b={K.Io} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Barra />
          <VasoElectrodos T={T} x={290} y={1170} s={1.05} liquido={AGUA_PURA} baja={baja} seed={4} />
          <VasoElectrodos T={T} x={790} y={1170} s={1.05} liquido={AGUA_MAR} baja={baja} iones={1} seed={6} />
          <Conductimetro T={T} x={290} y={1440} s={1.1} v={vPura} tiembla={0.01} lectura="0.055" color={KC.cyan} nombre="agua ultrapura" />
          <Conductimetro T={T} x={790} y={1440} s={1.1} v={vMar} lectura="≈50,000" color={KC.yellow} nombre="agua de mar" />
          {T > K.G + 0.5 && T < K.G + 1.4 && [0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${790 + Math.cos(k * 1.26) * 60} ${1390 + Math.sin(k * 1.26) * 60} l ${Math.cos(k * 1.26) * 40} ${Math.sin(k * 1.26) * 40}`} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" opacity={1 - kprog(T, K.G + 0.9, K.G + 1.4)} />)}
        </SvgCapa>
      </Escena>
      {/* 2 · los iones de la sal y la corriente */}
      <Escena T={T} a={K.Io} b={K.Pu} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={11} />
          <Placa x={110} y0={760} y1={1180} pos={false} brillo={viaja * (0.5 + 0.5 * Math.sin(T * 9))} />
          <Placa x={970} y0={760} y1={1180} pos={true} brillo={viaja * (0.5 + 0.5 * Math.cos(T * 9))} />
          <path d="M 110 720 L 110 640 Q 110 600 150 600 L 470 600 M 610 600 L 930 600 Q 970 600 970 640 L 970 720" stroke={viaja > 0 ? KC.yellow : '#8a93a6'} strokeWidth={8} fill="none" strokeDasharray={viaja > 0 ? '24 14' : 'none'} strokeDashoffset={-T * 120} opacity={kprog(T, K.Io + 3.0, K.Io + 3.6)} />
          <g opacity={kprog(T, K.Io + 3.0, K.Io + 3.6)}><rect x={470} y={570} width={140} height={60} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={6} /><text x={540} y={612} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>pila</text></g>
          {iones.map((n) => { const d = disuelve(n.i);
            const tx = n.pos ? 170 + (n.i % 4) * 40 : 910 - (n.i % 4) * 40, ty = 820 + (n.i % 8) * 45;
            const x = klerp(klerp(n.gx, n.fx, d), tx, viaja) + Math.sin(T * 2 + n.ph) * 10 * d, y = klerp(klerp(n.gy, n.fy, d), ty, viaja) + Math.cos(T * 2.2 + n.ph) * 10 * d;
            return <Ion key={n.i} x={x} y={y} pos={n.pos} s={d < 0.05 ? 0.9 : 1} />; })}
          {disuelve(0) < 0.05 && <rect x={448} y={808} width={184} height={184} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="10 8" />}
        </SvgCapa>
      </Escena>
      {/* 3 · agua pura: casi sin iones */}
      <Escena T={T} a={K.Pu} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={23} n={30} />
          <Placa x={110} y0={760} y1={1180} pos={false} />
          <Placa x={970} y0={760} y1={1180} pos={true} />
          {[[540, 880, K.Pu + 0.9], [360, 1080, K.Pu + 2.6]].map(([x, y, t0], i) => { const p = parte(t0); return <g key={i}>
            {p < 0.02 ? <Mol tipo="agua" x={x} y={y} s={1.1} /> : <g>
              <circle cx={x} cy={y} r={120 * p} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={1 - p * 0.6} />
              <Atomo x={x - 70 * p} y={y} r={26} color={QA.H} letra="H⁺" tam={20} />
              <g transform={`translate(${x + 70 * p} ${y})`}><Molecula atomos={[[0, 0, 34, QA.O, 'O'], [40, 26, 22, QA.H, 'H']]} enlaces={[[0, 1]]} x={0} y={0} /><text x={10} y={-48} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>OH⁻</text></g>
            </g>}</g>; })}
        </SvgCapa>
      </Escena>
      {/* 4 · pregunta: el enchufe junto al fregadero */}
      <Escena T={T} a={K.Pr} b={K.Re} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <rect x={0} y={1100} width={KW} height={820} fill="#f2e3c6" stroke={KC.ink} strokeWidth={8} />
          <Enchufe x={250} y={820} s={1.1} />
          <Lavabo x={300} y={1150} s={1} T={T} gotea />
          <text x={540} y={560} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 540 460)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · el agua real nunca es pura */}
      <Escena T={T} a={K.Re} b={K.Es}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[['llave', 200, 0], ['alberca', 540, 1], ['suelo', 880, 2]].map(([t, x, k]) => { const at = K.Re + 0.3 + k * 1.7, e = kprog(T, at, at + 0.4, kEase.rebote);
            if (T < at) return null;
            return <g key={t} transform={`translate(${x} ${830}) scale(${e * 0.85})`}>
              <circle r={150} fill="#fff" stroke={KC.ink} strokeWidth={8} />
              {k === 0 && <Llave x={-20} y={0} s={1.2} T={T} />}
              {k === 1 && <Alberca x={0} y={20} s={1.1} T={T} />}
              {k === 2 && <Suelo x={0} y={10} s={1.1} />}
              <rect x={-95} y={160} width={190} height={50} rx={12} fill={KC.ink} />
              <text x={0} y={196} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto}>{t}</text>
              <g transform="translate(115 -115) scale(0.8)"><circle r={95} fill={KC.noche} stroke={KC.cyan} strokeWidth={8} />
                {[[-40, -30, 1], [30, -40, 0], [0, 20, 1], [-45, 40, 0], [45, 30, 1]].map(([dx, dy, p], j) => <Ion key={j} x={dx + Math.sin(T * 2 + j) * 6} y={dy + Math.cos(T * 2 + j) * 6} pos={!!p} s={0.62} />)}</g>
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 6 · 1995 · NIST: el CO2 del aire */}
      <Escena T={T} a={K.Es} b={K.Cu}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Barra />
          <VasoElectrodos T={T} x={560} y={1170} s={1.05} liquido={AGUA_PURA} baja={1} seed={9} />
          {co2.map((c, i) => { const p = kprog(T, c.t0, c.t0 + 1.2, kEase.suave), conv = kprog(T, c.t0 + 1.2, c.t0 + 1.6);
            if (T < c.t0) return null;
            const y = klerp(380, 1020, p);
            return conv < 1 ? <Mol key={i} tipo="co2" x={c.x} y={y} s={0.75} rot={T * 40 + i * 30} o={1 - conv} />
              : <g key={i}><Atomo x={c.x - 30} y={1030 - (i % 2) * 60 + Math.sin(T * 3 + i) * 6} r={24} color={QA.H} letra="H⁺" tam={18} />
                <g transform={`translate(${c.x + 40} ${1060 - (i % 2) * 60 + Math.cos(T * 3 + i) * 6})`}><rect x={-56} y={-24} width={112} height={48} rx={24} fill={KC.mint} stroke={KC.ink} strokeWidth={4} /><text x={0} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>HCO₃⁻</text></g></g>; })}
          <Conductimetro T={T} x={560} y={1440} s={1.1} v={vEs} lectura={`${lecturaEs < 0.1 ? lecturaEs.toFixed(3) : lecturaEs.toFixed(2)}`} color={KC.cyan} />
        </SvgCapa>
      </Escena>
      {/* 7 · tu cuerpo es salado */}
      <Escena T={T} a={K.Cu} b={K.Pe}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Persona x={800} y={1000} s={1} /></SvgCapa>
        <Lupa T={T} at={K.Cu + 0.8} until={K.Pe - 0.3} x={760} y={470} r={170} fx={1010} fy={790} tinte={KC.yellow} etiqueta="dentro de ti"
          interior={(TT, r) => <svg width={r * 2} height={r * 2}>{[[90, 110, 1], [200, 90, 0], [150, 190, 1], [250, 220, 0], [100, 240, 0], [230, 150, 1]].map(([x, y, p], j) => <Ion key={j} x={x + Math.sin(TT * 2 + j) * 8} y={y + Math.cos(TT * 2 + j) * 8} pos={!!p} s={0.8} />)}</svg>} />
      </Escena>
      {/* 8 · peligro */}
      <Escena T={T} a={K.Pe} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <rect x={0} y={1100} width={KW} height={820} fill="#f2e3c6" stroke={KC.ink} strokeWidth={8} />
          <Enchufe x={220} y={860} s={1} />
          <ellipse cx={240} cy={1130} rx={170} ry={34} fill="#7fc8ff" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Pe + 0.4, K.Pe + 1.0)} />
          <Lavabo x={720} y={1140} s={0.9} T={T} gotea />
          <Secadora x={720} y={880} s={0.85} rot={-10} />
          <Marca x={330} y={760} ok={false} s={0.9} o={kprog(T, K.Pe + 1.5, K.Pe + 1.9)} />
          <Marca x={880} y={760} ok={false} s={0.9} o={kprog(T, K.Pe + 2.1, K.Pe + 2.5)} />
          <Peligro x={540} y={560} s={0.9} T={T} />
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: los vasos del inicio y uno nuevo, el de tu llave */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Barra />
          <VasoElectrodos T={T} x={190} y={1170} s={0.78} liquido={AGUA_PURA} seed={4} />
          <VasoElectrodos T={T} x={540} y={1170} s={0.78} liquido={AGUA_LLAVE} iones={0.5} seed={8} />
          <VasoElectrodos T={T} x={890} y={1170} s={0.78} liquido={AGUA_MAR} iones={1} seed={6} />
          <Conductimetro T={T} x={190} y={1440} s={0.85} v={0.1} tiembla={0.01} color={KC.cyan} nombre="pura" />
          <Conductimetro T={T} x={540} y={1440} s={0.85} v={0.1 + 0.55 * kprog(T, K.Ci + 0.6, K.Ci + 1.2, kEase.rebote)} color={KC.mint} nombre="de tu llave" />
          <Conductimetro T={T} x={890} y={1440} s={0.85} v={0.96} color={KC.yellow} nombre="de mar" />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 0.15} until={K.G + 5.2} valor={900000} dur={1.1} prefijo="×" etiqueta="agua ultrapura · 25 °C" x={330} y={520} tam={130} />
      <Chip T={T} at={K.G + 1.6} until={K.G + 5.2} texto="peor que el agua de mar" x={330} y={700} tam={34} borde={KC.yellow} />
      <MitoTachado T={T} at={K.Q + 0.2} tacharEn={K.Q + 1.6} until={K.Q + 3.2} texto="el agua conduce" x={620} y={370} tam={44} />
      <Lupa T={T} at={K.Q + 1.8} until={K.Io - 0.2} x={600} y={640} r={210} fx={790} fy={1050} tinte={KC.yellow} etiqueta="iones disueltos"
        interior={(TT, r) => <svg width={r * 2} height={r * 2}>{[[110, 120, 1], [260, 100, 0], [180, 210, 1], [300, 250, 0], [120, 300, 0], [260, 330, 1], [200, 60, 0]].map(([x, y, p], j) => <Ion key={j} x={x + Math.sin(TT * 2 + j) * 8} y={y + Math.cos(TT * 2 + j) * 8} pos={!!p} s={0.85} />)}</svg>} />
      <Chip T={T} at={K.Io + 0.6} until={K.Io + 3.2} texto="sal → iones con carga" x={540} y={1500} tam={42} borde={KC.lilac} />
      <Chip T={T} at={K.Io + 3.6} until={K.Pu - 0.2} texto="iones en movimiento = corriente" x={540} y={1500} tam={38} borde={KC.yellow} />
      <Etq T={T} at={K.Io + 4.2} until={K.Pu - 0.2} x={150} y={1600} texto="+ al polo −" tam={32} color={QA.Na} />
      <Etq T={T} at={K.Io + 4.2} until={K.Pu - 0.2} x={930} y={1600} texto="− al polo +" lado="izq" tam={32} color={QA.Cl} />
      <Chip T={T} at={K.Pu + 0.4} until={K.Pr - 0.2} texto="agua pura: 0.055 µS/cm a 25 °C" x={540} y={1500} tam={36} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pu + 1.2} until={K.Pu + 2.4} x={620} y={760} texto="se parte sola (rara vez)" tam={30} color={KC.yellow} />
      <Chip T={T} at={K.Re + 5.5} until={K.Es - 0.2} texto="en la naturaleza no hay agua pura" x={540} y={1500} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.6} anio="1995" quien="NIST · Gaithersburg, Maryland" revista="J Res NIST · Wu y Berezansky" x={540} y={720} />
      <Etq T={T} at={K.Es + 3.9} until={K.Es + 5.0} x={300} y={400} texto="CO₂ del aire" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Es + 6.6} until={K.Cu - 0.2} texto="×10 a ×30 con el CO₂ del aire" x={540} y={1760} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 1.8} until={K.Pe - 0.2} texto="tu cuerpo es salado: conduces" x={540} y={1500} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Pe + 2.6} until={K.Ci - 0.2} texto="agua + electricidad = peligro" x={540} y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.3} until={K.Ou} texto="pura: casi no conduce" x={620} y={470} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="la que tocas: nunca es pura" x={620} y={570} tam={38} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="La más pura: *900 mil veces peor.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Io - 0.1} texto="No es el agua: *son iones.*" />
      <Subtitulo T={T} idx={2} at={K.Io + 0.1} until={K.Pu - 0.1} texto="Iones con carga: *la corriente.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.Pr - 0.1} texto="El agua pura *casi no tiene.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Re - 0.1} texto="¿Por qué *es peligrosa?*" />
      <Subtitulo T={T} idx={5} at={K.Re + 0.1} until={K.Es - 0.1} texto="El agua real *nunca es pura.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Cu - 0.1} texto="Con el aire: *conduce más.*" />
      <Subtitulo T={T} idx={7} at={K.Cu + 0.1} until={K.Pe - 0.1} texto="Tu cuerpo *es salado.*" />
      <Subtitulo T={T} idx={8} at={K.Pe + 0.1} until={K.Ci - 0.1} texto="Agua y electricidad: *peligro.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La que tocas *nunca es pura.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 0.8, CUES.Iones - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Iones + 1.5, CUES.Pura - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pura + 0.5, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Real + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Real + 2.0, CUES.Estudio - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Estudio + 3.8, CUES.Cuerpo - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cuerpo + 0.3, CUES.Peligro - 0.3, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Peligro + 0.3, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="36" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AguaPuraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AguaPura /></CompositionStage></div>;
}
window.AguaPuraApp = AguaPuraApp;
