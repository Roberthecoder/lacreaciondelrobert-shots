// Shot Químico #19 · La sal no hace que tu agua hierva antes (5 centésimas de grado) — NARRADO (N2 el número + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const AGUA = '#7fc8ff', AGUA_OSC = '#3d8fd6', SAL = '#ffffff', NA = '#b18cff', CL = '#7ee36b', ACERO = '#c9d2dc';

// Olla de cocina en la estufa. hierve 0..1 = burbujas; vapor 0..1.
function Olla({ T, x, y, s = 1, hierve = 0, vapor = 0, fuego = 1, seed = 4 }) {
  const R = krng(seed);
  const bur = Array.from({ length: 22 }, () => [(R() - 0.5) * 300, R() * 10, 6 + R() * 14]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* estufa */}
    <rect x={-260} y={190} width={520} height={34} rx={10} fill="#3a3f4a" stroke={KC.ink} strokeWidth={8} />
    <Llama T={T} x={0} y={190} s={1.5} o={fuego} />
    {/* olla */}
    <rect x={-250} y={-60} width={36} height={30} rx={8} fill="#444" stroke={KC.ink} strokeWidth={7} transform="translate(-30 0)" />
    <rect x={244} y={-60} width={36} height={30} rx={8} fill="#444" stroke={KC.ink} strokeWidth={7} />
    <path d="M -220 -80 L 220 -80 L 205 170 Q 200 190 180 190 L -180 190 Q -200 190 -205 170 Z" fill={ACERO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -190 -60 L -180 160" stroke="#fff" strokeWidth={14} opacity={0.5} strokeLinecap="round" />
    <ellipse cx={0} cy={-80} rx={220} ry={46} fill="#7b8794" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-72} rx={200} ry={36} fill={AGUA} />
    {/* burbujas en la superficie */}
    {hierve > 0 && bur.map(([bx, ph, r], i) => i / bur.length < hierve ? <circle key={i} cx={bx * 0.6} cy={-72 + Math.sin(T * 7 + ph) * 8} r={r * (0.6 + 0.4 * Math.abs(Math.sin(T * 5 + ph)))} fill="rgba(255,255,255,.85)" stroke={AGUA_OSC} strokeWidth={3} /> : null)}
    {/* vapor */}
    {vapor > 0 && [-120, 0, 120].map((dx, i) => { const u = (T * 0.6 + i * 0.33) % 1; return <path key={i} d={`M ${dx} ${-110 - u * 220} q 30 -40 0 -80 q -30 -40 0 -80`} stroke="rgba(255,255,255,.85)" strokeWidth={16} fill="none" strokeLinecap="round" opacity={vapor * (1 - u)} />; })}
  </g>;
}
// Termómetro de cocina digital (sonda + pantalla). texto = lo que marca.
function TermoCocina({ x, y, s = 1, texto = '100.00 °C', color = KC.yellow, rot = 18 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-8} y={0} width={16} height={260} rx={8} fill="#dfe6ee" stroke={KC.ink} strokeWidth={6} />
    <rect x={-150} y={-150} width={300} height={160} rx={28} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <rect x={-125} y={-128} width={250} height={92} rx={12} fill="#d9f5c8" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-65} textAnchor="middle" style={{ font:`700 ${texto.length > 7 ? 40 : 54}px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
    <circle cx={-60} cy={-12} r={10} fill={color} stroke={KC.ink} strokeWidth={4} /><circle cx={60} cy={-12} r={10} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Cucharadita que se voltea (gira = 0..1).
function Cucharadita({ x, y, s = 1, gira = 0, sal = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${klerp(-10, 75, gira)}) scale(${s})`}>
    <rect x={-260} y={-14} width={210} height={28} rx={14} fill={ACERO} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={70} ry={44} fill={ACERO} stroke={KC.ink} strokeWidth={8} />
    {sal > 0 && <ellipse cx={0} cy={-8} rx={56 * sal} ry={24 * sal} fill={SAL} stroke="#c9ccd2" strokeWidth={4} />}
  </g>;
}
// Granitos de sal que caen de (x, y0) a y1 entre t0 y t1.
function LluviaSal({ T, x, y0, y1, t0, t1, n = 26, ancho = 90, seed = 11 }) {
  if (T < t0 || T > t1 + 0.8) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const d = R() * (t1 - t0), dx = (R() - 0.5) * ancho, p = kprog(T, t0 + d, t0 + d + 0.55);
    if (p <= 0 || p >= 1) return null;
    const yy = klerp(y0, y1, p * p), sz = 9 + R() * 7;
    return <rect key={i} x={x + dx + p * 30 - sz / 2} y={yy} width={sz} height={sz} fill={SAL} stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${i * 37} ${x + dx} ${yy})`} />; })}</g>;
}
// Cristal de sal (red de Na⁺ y Cl⁻). separa 0..1 = se desarma.
function Cristal({ T, x, y, s = 1, separa = 0, n = 3, paso = 70 }) {
  const out = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const na = (i + j) % 2 === 0, k = i * n + j;
    const cx = (i - (n - 1) / 2) * paso, cy = (j - (n - 1) / 2) * paso;
    const ang = k * 2.4, d = separa * (180 + (k % 4) * 60);
    const px = cx * (1 + separa * 1.6) + Math.cos(ang) * d + Math.sin(T * 2 + k) * 6 * separa;
    const py = cy * (1 + separa * 1.6) + Math.sin(ang) * d * 0.7 + Math.cos(T * 2.3 + k) * 6 * separa;
    out.push(<g key={k}>
      {separa > 0.5 && [0, 1, 2, 3].map((w) => { const a = w * Math.PI / 2 + T * 0.8 + k; return <Mol key={w} tipo="agua" x={px + Math.cos(a) * 62} y={py + Math.sin(a) * 62} s={0.42} rot={a * 57 + (na ? 180 : 0)} o={kprog(separa, 0.5, 0.9)} />; })}
      <Atomo x={px} y={py} r={na ? 26 : 34} color={na ? NA : CL} letra={na ? 'Na⁺' : 'Cl⁻'} tam={na ? 17 : 20} />
    </g>);
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{out}</g>;
}
// Flecha vertical gruesa (arriba si dir = -1). largo en px.
function Flecha({ x, y, largo, dir = -1, color = KC.yellow, ancho = 46, texto, o = 1 }) {
  if (o <= 0 || largo <= 2) return null;
  const y2 = y + dir * largo;
  return <g opacity={o}>
    <line x1={x} y1={y} x2={x} y2={y2 - dir * 40} stroke={KC.ink} strokeWidth={ancho + 14} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x} y2={y2 - dir * 40} stroke={color} strokeWidth={ancho} strokeLinecap="round" />
    <path d={`M ${x - 52} ${y2 - dir * 50} L ${x} ${y2 + dir * 10} L ${x + 52} ${y2 - dir * 50} Z`} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {texto && <text x={x} y={y + dir * largo * 0.5 + 12} textAnchor="middle" transform={`rotate(-90 ${x} ${y + dir * largo * 0.5})`} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Granito de sal grande en el agua con burbujas que nacen en sus esquinas.
function GranoNucleacion({ T, x, y, s = 1, t0, seed = 3, roca = false }) {
  const R = krng(seed);
  const pts = roca ? [[-80, -60], [70, -70], [90, 40], [-60, 70], [0, -85], [-95, 5]] : [[-90, -90], [90, -90], [90, 90], [-90, 90], [0, -90], [90, 0]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {roca ? <path d="M -100 -40 Q -80 -100 0 -95 Q 90 -90 100 -20 Q 110 60 40 90 Q -60 100 -95 50 Z" fill="#8d8f96" stroke={KC.ink} strokeWidth={8} />
      : <g><rect x={-90} y={-90} width={180} height={180} fill="#f4f7fb" stroke={KC.ink} strokeWidth={8} transform="rotate(8)" />
        <path d="M -60 -50 L 40 -60 M -40 20 L 50 30" stroke="#c4ccd6" strokeWidth={6} transform="rotate(8)" /></g>}
    {roca && [[-40, -30], [20, 10], [-10, 50], [50, -40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={10} fill="#5d6068" />)}
    {pts.map(([px, py], i) => Array.from({ length: 3 }, (_, k) => { const per = 1.1 + R() * 0.5, ph = R() * per;
      if (T < t0 + i * 0.12) return null;
      const u = ((T - t0 + ph) % per) / per;
      return <circle key={`${i}-${k}`} cx={px + Math.sin(T * 5 + i + k) * 6} cy={py - u * 560 - k * 40} r={6 + u * 18} fill="rgba(255,255,255,.12)" stroke="#d8f1ff" strokeWidth={4} opacity={1 - u * 0.6} />; }))}
  </g>;
}
// Montaña con olla arriba.
function Montana({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -420 300 L -120 -260 L -40 -170 L 60 -320 L 420 300 Z" fill="#5c9e5a" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 60 -320 L 10 -230 L 60 -250 L 110 -225 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -120 -260 L -150 -200 L -110 -215 L -85 -205 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
function Pasta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={170} ry={46} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {[-70, -35, 0, 35, 70].map((dx, i) => <path key={i} d={`M ${dx - 60} 20 Q ${dx} ${-50 - (i % 2) * 20} ${dx + 60} 20`} stroke="#ffd36b" strokeWidth={14} fill="none" strokeLinecap="round" />)}
    <path d="M -90 20 Q 0 -70 90 20" stroke="#ffcf4a" strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}

function Hervir() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, I: CUES.Iones, Cu: CUES.Cuenta, O: CUES.Olla, P: CUES.Pregunta, B: CUES.Burbujas, E: CUES.Estudio, A: CUES.Altura, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const gira = kprog(T, K.G, K.G + 0.4, kEase.sale);
  const avisa = K.B + 5.0;           // "Si el agua está muy caliente…"
  const R = krng(9);
  const molsAgua = Array.from({ length: 16 }, () => [120 + R() * 840, 1010 + R() * 300, R() * 6]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cucharadita cae en la olla */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Olla T={T} x={430} y={880} s={1.05} hierve={0.25} vapor={0.6} />
          <LluviaSal T={T} x={400} y0={600} y1={785} t0={K.G + 0.15} t1={K.G + 1.4} />
          <g opacity={1 - kprog(T, K.G + 3.8, K.G + 4.6)}><Cucharadita x={360} y={570} s={1.1} gira={gira} sal={1 - kprog(T, K.G + 0.2, K.G + 1.2)} /></g>
          <TermoCocina x={700} y={890} s={0.85} texto={T < K.G + 2.0 ? '100.00 °C' : '100.05 °C'} />
        </SvgCapa>
      </Escena>
      {/* 1 · qué es hervir: vapor contra aire */}
      <Escena T={T} a={K.Q} b={K.I} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#cfefff' }}></div>
        <SvgCapa>
          <rect x={0} y={980} width={KW} height={KH - 980} fill={AGUA} />
          <path d={`M 0 980 ${Array.from({ length: 13 }, (_, i) => `Q ${i * 90 + 45} ${980 + Math.sin(T * 3 + i) * 12} ${(i + 1) * 90} 980`).join(' ')}`} stroke={AGUA_OSC} strokeWidth={10} fill="none" />
          {molsAgua.map(([mx, my, ph], i) => { const salta = i % 4 === 0, u = ((T - K.Q) * 0.7 + ph) % 1;
            return <Mol key={i} tipo="agua" x={mx + Math.sin(T * 3 + ph) * 14} y={salta ? klerp(1000, 760, u) : my + Math.cos(T * 2.6 + ph) * 12} s={0.9} rot={T * 60 + ph * 50} o={salta ? 1 - u * 0.7 : 1} />; })}
          <Flecha x={300} y={960} largo={klerp(40, 320, kprog(T, K.Q + 0.5, K.Q + 2.6, kEase.sale))} dir={-1} color={KC.cyan} texto="vapor" />
          <Flecha x={780} y={640} largo={320} dir={1} color="#c3c8d2" texto="aire" o={kprog(T, K.Q + 0.2, K.Q + 0.8)} />
          <text x={540} y={830} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Q + 2.6, K.Q + 3.0)}>=</text>
        </SvgCapa>
      </Escena>
      {/* 2 · los iones (micro) */}
      <Escena T={T} a={K.I} b={K.Cu} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Ambiente T={T} n={30} color="rgba(127,200,255,.25)" />
          <Cristal T={T} x={540} y={900} s={1.05} separa={kprog(T, K.I + 0.6, K.I + 3.0, kEase.suave)} n={4} />
          <Flecha x={120} y={1180} largo={klerp(320, 190, kprog(T, K.I + 3.0, K.I + 4.4, kEase.suave))} dir={-1} color={KC.cyan} texto="vapor" />
          <line x1={760} y1={1170} x2={900} y2={1170} stroke={KC.texto} strokeWidth={8} />
          <text x={830} y={1215} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>≈ 1 nm</text>
        </SvgCapa>
      </Escena>
      {/* 3 · la cuenta: K_b */}
      <Escena T={T} a={K.Cu} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={kprog(T, K.Cu + 0.2, K.Cu + 0.6)}>
            <rect x={150} y={720} width={780} height={190} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
            <text x={540} y={845} textAnchor="middle" style={{ font:`700 86px ${KF.mono}` }} fill={KC.ink}>ΔT = i·K<tspan fontSize={54} dy={14}>b</tspan><tspan dy={-14}>·m</tspan></text>
          </g>
          <g opacity={kprog(T, K.Cu + 2.0, K.Cu + 2.5)}>
            <rect x={170} y={950} width={260} height={200} rx={16} fill={AGUA} stroke={KC.ink} strokeWidth={8} />
            <text x={300} y={1065} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>1 kg</text>
            <text x={490} y={1075} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>+</text>
            {[[580, 1000], [640, 1050], [600, 1110], [690, 990], [700, 1110], [760, 1050]].map(([ax, ay], i) => <Atomo key={i} x={ax} y={ay} r={i % 2 ? 30 : 24} color={i % 2 ? CL : NA} />)}
            <text x={670} y={1190} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>1 mol de partículas</text>
          </g>
          <TermoCocina x={880} y={1010} s={0.6} rot={0} texto={T < K.Cu + 3.2 ? '+0.0 °C' : '+0.5 °C'} />
        </SvgCapa>
        <Chip T={T} at={K.Cu + 0.8} until={K.Cu + 3.0} texto="K_b del agua = 0.512 °C·kg/mol" y={1500} tam={38} borde={KC.gold} mono />
      </Escena>
      {/* 4 · la olla: 6 g en 2 L */}
      <Escena T={T} a={K.O} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Olla T={T} x={430} y={880} s={1.05} hierve={0.3} vapor={0.6} />
          <Cucharadita x={250} y={560} s={0.9} gira={0} sal={1} />
          <TermoCocina x={700} y={890} s={0.85} texto={'100.0' + Math.round(klerp(0, 5, kprog(T, K.O + 1.6, K.O + 2.6))) + ' °C'} />
        </SvgCapa>
        <Etq T={T} at={K.O + 0.3} until={K.P - 0.3} x={370} y={560} texto="≈ 6 g de sal" tam={36} />
        <Etq T={T} at={K.O + 0.8} until={K.P - 0.3} x={200} y={850} texto="2 L" lado="izq" tam={40} />
        <Medidor T={T} at={K.O + 1.6} until={K.P - 0.3} valor={(t) => 0.05 * kprog(t, K.O + 1.6, K.O + 2.6)} etiqueta="sube el hervor (0 a 1 °C)" texto={(v) => '+' + v.toFixed(2) + ' °C'} y={1440} color={KC.red} />
      </Escena>
      {/* 5 · pregunta: ¿por qué burbujea? */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Olla T={T} x={300} y={930} s={0.8} hierve={kprog(T, K.P + 0.4, K.P + 0.9)} vapor={0.8} />
          <LluviaSal T={T} x={300} y0={640} y1={860} t0={K.P} t1={K.P + 0.7} n={20} />
          <text x={250} y={700} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 600)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · nucleación (micro) y aviso */}
      <Escena T={T} a={K.B} b={avisa} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#0f2a44' }}></div>
        <SvgCapa>
          <Ambiente T={T} n={24} color="rgba(127,200,255,.25)" />
          <rect x={0} y={0} width={KW} height={430} fill="#1d4a72" />
          <path d={`M 0 430 ${Array.from({ length: 13 }, (_, i) => `Q ${i * 90 + 45} ${430 + Math.sin(T * 3 + i) * 10} ${(i + 1) * 90} 430`).join(' ')}`} stroke="#7fc8ff" strokeWidth={8} fill="none" />
          <GranoNucleacion T={T} x={360} y={1000} s={1.1} t0={K.B + 0.4} />
          {[[150, 1100, 0.35], [560, 1120, 0.3], [260, 860, 0.25]].map(([gx, gy, gs], i) => <GranoNucleacion key={i} T={T} x={gx} y={gy} s={gs} t0={K.B + 0.8 + i * 0.3} seed={20 + i} />)}
          <g opacity={kprog(T, K.B + 2.6, K.B + 3.1)}><GranoNucleacion T={T} x={820} y={1020} s={0.8} t0={K.B + 2.8} roca seed={7} /></g>
        </SvgCapa>
        <Etq T={T} at={K.B + 0.8} until={avisa - 0.3} x={480} y={1150} texto="grano de sal" tam={32} />
        <Etq T={T} at={K.B + 3.0} until={avisa - 0.3} x={1040} y={1150} texto="piedra de ebullición" lado="izq" tam={30} />
      </Escena>
      <Escena T={T} a={avisa} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Olla T={T} x={540} y={900} s={1.0} hierve={1} vapor={1} />
          <LluviaSal T={T} x={540} y0={620} y1={800} t0={avisa} t1={avisa + 0.6} n={16} />
          {Array.from({ length: 8 }, (_, i) => { const u = kprog(T, avisa + 0.6 + (i % 4) * 0.25, avisa + 1.4 + (i % 4) * 0.25); if (u <= 0 || u >= 1) return null;
            const dx = (i - 3.5) * 50; return <circle key={i} cx={540 + dx * (1 + u * 2)} cy={810 - Math.sin(u * Math.PI) * 240} r={14} fill={AGUA} stroke={KC.ink} strokeWidth={4} />; })}
        </SvgCapa>
        <Onomato T={T} at={avisa + 0.5} until={K.E - 0.2} x={540} y={560} texto="¡fsssh!" tam={110} />
      </Escena>
      {/* 7 · el estudio de 1974 */}
      <Escena T={T} a={K.E} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, K.E + 2.8, K.E + 3.4)}>
            {[[330, 'agua', '#e8f6ff', '100.000'], [750, 'agua + sal', '#d6ecff', '100.151']].map(([cx, et, liq, val], i) => <g key={i}>
              <path d={`M ${cx - 110} 760 L ${cx - 110} 1120 Q ${cx - 110} 1180 ${cx - 50} 1180 L ${cx + 50} 1180 Q ${cx + 110} 1180 ${cx + 110} 1120 L ${cx + 110} 760`} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={9} />
              <rect x={cx - 100} y={950} width={200} height={222} rx={30} fill={liq} />
              <Burbujas T={T} x={cx - 90} y={960} w={180} h={200} n={10} color="#7fb4e0" />
              {i === 1 && [0, 1, 2, 3, 4].map((k) => <rect key={k} x={cx - 70 + k * 30} y={1080 + (k % 2) * 40} width={12} height={12} fill="#fff" stroke={KC.ink} strokeWidth={2} />)}
              <rect x={cx - 10} y={690} width={20} height={330} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <circle cx={cx} cy={1030} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
              <text x={cx} y={1240} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{et}</text>
              <rect x={cx - 130} y={1380} width={260} height={70} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <text x={cx} y={1428} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={i ? KC.red : KC.ink}>{val} °C</text>
            </g>)}
            <path d="M 440 1150 L 640 1150" stroke={KC.ink} strokeWidth={8} />
          </g>
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="1974" quien="Hakuta, Goto e Ishizaka · Japón" revista="ebullómetro doble · Bull Soc Sea Water Sci Jpn" y={860} />
      </Escena>
      {/* 8 · la altura */}
      <Escena T={T} a={K.A} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Montana x={720} y={1000} s={1.0} />
          <rect x={0} y={1290} width={KW} height={KH - 1290} fill="#2a7fd0" />
          <Olla T={T} x={200} y={1070} s={0.42} hierve={1} vapor={0.8} />
          <Olla T={T} x={780} y={590} s={0.42} hierve={1} vapor={0.8} />
          <g opacity={kprog(T, K.A + 1.6, K.A + 2.1)}>
            <rect x={70} y={860} width={260} height={84} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <text x={200} y={918} textAnchor="middle" style={{ font:`700 50px ${KF.mono}` }} fill={KC.ink}>100 °C</text>
            <text x={200} y={840} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>nivel del mar</text>
          </g>
          <g opacity={kprog(T, K.A + 2.6, K.A + 3.1)}>
            <rect x={420} y={420} width={270} height={84} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <text x={555} y={478} textAnchor="middle" style={{ font:`700 50px ${KF.mono}` }} fill={KC.red}>≈ 92 °C</text>
          </g>
        </SvgCapa>
        <Etq T={T} at={K.A + 0.6} until={K.Ci - 0.3} x={1060} y={720} texto="CDMX · 2 240 m" lado="izq" tam={32} />
      </Escena>
      {/* 9 · cierre: la olla del inicio, ya hirviendo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Olla T={T} x={430} y={880} s={1.05} hierve={1} vapor={1} />
          <Cucharadita x={250} y={560} s={0.9} gira={0} sal={0} />
          <TermoCocina x={700} y={890} s={0.85} texto="100.05 °C" />
          <g opacity={kprog(T, K.Ci + 1.8, K.Ci + 2.3)}><Pasta x={800} y={1640} s={0.9} /></g>
        </SvgCapa>
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 1.0} until={K.G + 5.0} valor={0.05} dec={2} dur={1.2} prefijo="+" sufijo=" °C" x={330} y={430} tam={150} color={KC.red} />
      <Chip T={T} at={K.G + 1.8} until={K.G + 5.0} texto="≈ · 6 g en 2 L" x={330} y={560} tam={36} borde={KC.red} />
      <MitoTachado T={T} at={K.G + 5.2} tacharEn={K.G + 6.3} until={K.Q - 0.2} texto="hierve más rápido" x={330} y={340} tam={40} />
      <Chip T={T} at={K.Q + 2.8} until={K.I - 0.3} texto="hierve: empuje del vapor = aire" y={1500} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.I + 0.6} until={K.Cu - 0.3} texto="Na⁺ sodio · Cl⁻ cloruro" y={1500} tam={40} borde={CL} />
      <Chip T={T} at={K.I + 3.2} until={K.Cu - 0.3} texto="menos vapor" y={420} x={540} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 3.2} until={K.O - 0.3} texto="≈ medio grado por mol" y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.B + 1.0} until={avisa - 0.3} texto="nucleación: el vapor se forma ahí" y={1500} tam={36} borde="#d8f1ff" />
      <Chip T={T} at={avisa + 0.4} until={K.E - 0.3} texto="⚠️ agua muy caliente: puede saltar" y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={K.E + 3.4} until={K.A - 0.3} texto="0.96 % de sal en peso" y={1560} tam={40} borde={KC.gold} />
      <NumeroGigante T={T} at={K.E + 4.6} until={K.A - 0.3} valor={0.151} dec={3} dur={1.0} prefijo="+" sufijo=" °C" x={400} y={430} tam={130} color={KC.red} />
      <Chip T={T} at={K.A + 3.4} until={K.Ci - 0.3} texto="sal: 0.05 °C · altura: ~8 °C" y={1500} tam={38} borde={KC.blue} />
      <MitoTachado T={T} at={K.Ci + 0.3} tacharEn={K.Ci + 0.9} until={K.Ou - 0.2} texto="hierve más rápido" x={330} y={340} tam={40} />
      <Chip T={T} at={K.Ci + 2.0} until={K.Ou - 0.1} texto="sal = sabor ✓" x={430} y={1500} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Sube el hervor *5 centésimas.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.I - 0.1} texto="Vapor contra *el aire.*" />
      <Subtitulo T={T} idx={2} at={K.I + 0.1} until={K.Cu - 0.1} texto="Iones: *menos vapor.*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.O - 0.1} texto="Medio grado *por mol.*" />
      <Subtitulo T={T} idx={4} at={K.O + 0.1} until={K.P - 0.1} texto="6 gramos: *5 centésimas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.B - 0.1} texto="¿Y por qué *burbujea?*" />
      <Subtitulo T={T} idx={6} at={K.B + 0.1} until={K.E - 0.1} texto="Granitos = *puntos de burbuja.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.A - 0.1} texto="1974: *15 centésimas más.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.Ci - 0.1} texto="La altura: *unos 92 grados.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La sal es *para el sabor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 0.8, CUES.Iones - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Iones + 1.2, CUES.Cuenta - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cuenta + 1.0, CUES.Olla - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Olla + 0.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Burbujas + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Burbujas + 5.0, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 4.4, CUES.Altura - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Altura + 0.8, CUES.Cierre - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="19" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HervirApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hervir /></CompositionStage></div>;
}
window.HervirApp = HervirApp;
