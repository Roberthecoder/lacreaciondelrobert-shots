// Shot Químico #31 · Ese negro en tu plata no es mugre (sulfuro de plata y el truco del aluminio) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PLATA = '#c9ced6', PLATA_B = '#f2f4f8', NEGRO_AG = '#26221f', AL = '#b9c7d6', AZUFRE = '#ffe11a';

// Arete de aro con colgante. sucio 0..1 (negro), brilla 0..1 (destellos).
function Arete({ T, x, y, s = 1, sucio = 1, brilla = 0, mece = 0 }) {
  const c = mixHex(PLATA, NEGRO_AG, sucio), c2 = mixHex(PLATA_B, '#3a3431', sucio);
  const rot = Math.sin(T * 2.2) * 7 * mece;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -250 Q 40 -250 40 -210" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 0 -250 Q 40 -250 40 -210" stroke={c} strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-60} r={150} fill="none" stroke={KC.ink} strokeWidth={50} />
    <circle cx={0} cy={-60} r={150} fill="none" stroke={c} strokeWidth={34} />
    <path d="M -110 -160 A 150 150 0 0 1 60 -200" stroke={c2} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.8} />
    <line x1={0} y1={90} x2={0} y2={150} stroke={KC.ink} strokeWidth={14} />
    <path d="M 0 140 Q 70 210 0 300 Q -70 210 0 140 Z" fill={c} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -10 175 Q -36 215 -14 260" stroke={c2} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.8} />
    {/* manchas negras irregulares */}
    {sucio > 0.05 && [[-120, -20], [100, -150], [130, 30], [-60, -190], [20, 240]].map(([dx, dy], i) =>
      <ellipse key={i} cx={dx} cy={dy} rx={22} ry={12} fill="#0f0d0c" opacity={sucio * 0.7} transform={`rotate(${i * 40} ${dx} ${dy})`} />)}
    {brilla > 0 && [[-110, -150], [120, -10], [10, 200]].map(([dx, dy], i) => { const k = brilla * (0.6 + 0.4 * Math.sin(T * 6 + i * 2));
      return <path key={i} d={`M ${dx} ${dy - 40 * k} L ${dx + 9 * k} ${dy - 9 * k} L ${dx + 40 * k} ${dy} L ${dx + 9 * k} ${dy + 9 * k} L ${dx} ${dy + 40 * k} L ${dx - 9 * k} ${dy + 9 * k} L ${dx - 40 * k} ${dy} L ${dx - 9 * k} ${dy - 9 * k} Z`} fill="#fff" stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Cuchara de plata (vista desde arriba). rot en grados.
function Cuchara({ x, y, s = 1, sucio = 0, rot = 0 }) {
  const c = mixHex(PLATA, NEGRO_AG, sucio);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -14 60 L -22 360 Q 0 380 22 360 L 14 60 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-30} rx={70} ry={100} fill={c} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-18} cy={-60} rx={20} ry={44} fill={mixHex(PLATA_B, '#3a3431', sucio)} opacity={0.75} />
  </g>;
}
// Cadena: eslabones.
function Cadena({ x, y, s = 1, sucio = 1, n = 9 }) {
  const c = mixHex(PLATA, NEGRO_AG, sucio);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: n }, (_, i) =>
    <ellipse key={i} cx={i * 34} cy={Math.sin(i * 0.7) * 26} rx={24} ry={14} fill="none" stroke={c} strokeWidth={9} transform={`rotate(${i % 2 ? 60 : -10} ${i * 34} ${Math.sin(i * 0.7) * 26})`} />)}</g>;
}
// Huevo duro partido a la mitad.
function HuevoDuro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={130} ry={95} fill="#fffaf0" stroke={KC.ink} strokeWidth={9} />
    <circle cx={6} cy={4} r={52} fill="#ffc83a" stroke="#d99a12" strokeWidth={5} />
  </g>;
}
// Molécula de H2S (S amarilla con dos H).
function H2S({ x, y, s = 1, rot = 0, o = 1 }) {
  return <Molecula x={x} y={y} s={s} rot={rot} o={o} atomos={[[0, 0, 36, QA.S, 'S'], [-42, 30, 22, QA.H, 'H'], [42, 30, 22, QA.H, 'H']]} enlaces={[[0, 1], [0, 2]]} />;
}
// Papel aluminio arrugado (polígono con brillos).
function PapelAl({ x, y, w = 520, h = 60 }) {
  const pts = Array.from({ length: 13 }, (_, i) => `${x - w / 2 + (i * w) / 12} ${y + (i % 2 ? -h / 2 : -h / 2 + 18)}`).join(' L ');
  return <g>
    <path d={`M ${pts} L ${x + w / 2} ${y + h / 2} L ${x - w / 2} ${y + h / 2} Z`} fill={AL} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.15, 0.4, 0.62, 0.85].map((u, i) => <path key={i} d={`M ${x - w / 2 + u * w} ${y - h / 2 + 10} l 30 ${h - 20}`} stroke="#eef3f9" strokeWidth={5} />)}
  </g>;
}
// Vapor que sube.
function Vapor({ T, x, y, n = 3, o = 1 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.6 + i / n) % 1);
    return <path key={i} d={`M ${x + (i - 1) * 90} ${y - u * 160} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.85} />; })}</g>;
}
// Báscula con cuchara encima.
function Bascula({ x, y, texto }) {
  return <g>
    <rect x={x - 130} y={y} width={260} height={90} rx={18} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 80} y={y + 22} width={160} height={46} rx={8} fill="#183028" />
    <text x={x} y={y + 57} textAnchor="middle" style={{ font:`700 25px ${KF.mono}` }} fill="#5dff9e">{texto}</text>
  </g>;
}

function Plata() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, A: CUES.Aire, H: CUES.Huevo, P: CUES.Pulir, Pr: CUES.Pregunta, Tr: CUES.Truco, E: CUES.Electrones, Es: CUES.Estudio, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // capa de sulfuro que crece (Que): grosor 0..1 → 0..~120 nm
  const capa = kprog(T, K.Q + 0.3, K.Q + 3.6, kEase.suave);
  const colorCapa = capa < 0.33 ? mixHex('#f6e27a', '#b5562f', capa / 0.33) : capa < 0.66 ? mixHex('#b5562f', '#3d5fbf', (capa - 0.33) / 0.33) : mixHex('#3d5fbf', '#141210', (capa - 0.66) / 0.34);
  const R = krng(31);
  const gas = Array.from({ length: 9 }, () => [140 + R() * 800, R() * 360, R() * 6]);
  const baja = kprog(T, K.Tr + 2.6, K.Tr + 3.8, kEase.sale);         // el arete baja al recipiente
  const limpia = kprog(T, K.E + 0.8, K.E + 4.4);                       // la capa negra vuelve a plata
  const mitadEs = K.Es + 3.9;
  const lista = [['huevo duro', 0.4], ['lana y fieltro', 1.0], ['guantes de hule', 1.6], ['personas: gases intestinales', 2.6]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el arete negro */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Cuchara x={190} y={980} s={0.85} sucio={0.85} rot={-18} />
          <Cadena x={640} y={1140} s={1.2} sucio={0.9} />
          <Arete T={T} x={540} y={900} s={1.05} sucio={0.92} mece={1} />
        </SvgCapa>
      </Escena>
      {/* 1 · qué es: la capa de sulfuro crece */}
      <Escena T={T} a={K.Q} b={K.A}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {Array.from({ length: 30 }, (_, i) => { const cx = 120 + (i % 10) * 94, cy = 960 + Math.floor(i / 10) * 90; return <Atomo key={i} x={cx} y={cy} r={42} color={PLATA} letra="Ag" tam={28} />; })}
          <rect x={60} y={970 - capa * 260} width={960} height={capa * 260} fill={colorCapa} stroke={KC.ink} strokeWidth={6} opacity={capa > 0.02 ? 1 : 0} />
          {capa > 0.15 && Array.from({ length: 9 }, (_, i) => <g key={i} opacity={kprog(capa, 0.15 + i * 0.05, 0.3 + i * 0.05)}>
            <Atomo x={110 + i * 108} y={970 - capa * 130} r={24} color={AZUFRE} letra="S" tam={22} /></g>)}
          {/* regla de grosor */}
          <line x1={1040} y1={970} x2={1040} y2={970 - 220} stroke={KC.texto} strokeWidth={5} />
          {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={1022} x2={1040} y1={970 - k * 55} y2={970 - k * 55} stroke={KC.texto} strokeWidth={4} />)}
          <text x={1010} y={970 - 220 - 18} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>100 nm</text>
          {[['amarillo', '#f6e27a', 0.1], ['café', '#b5562f', 0.33], ['azul', '#3d5fbf', 0.6], ['NEGRO', '#141210', 0.95]].map(([t, c, u], i) =>
            <g key={i} opacity={capa >= u ? 1 : 0.25}><rect x={120 + i * 220} y={560} width={70} height={70} rx={14} fill={c} stroke={KC.texto} strokeWidth={5} />
              <text x={155 + i * 220} y={680} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{t}</text></g>)}
        </SvgCapa>
      </Escena>
      {/* 2 · el azufre llega por el aire (H2S) */}
      <Escena T={T} a={K.A} b={K.H}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {Array.from({ length: 30 }, (_, i) => { const cx = 120 + (i % 10) * 94, cy = 960 + Math.floor(i / 10) * 90; return <Atomo key={i} x={cx} y={cy} r={42} color={PLATA} letra="Ag" tam={28} />; })}
          <rect x={60} y={710} width={960} height={260} fill="#141210" stroke={KC.ink} strokeWidth={6} />
          {gas.map(([gx, gy, ph], i) => { const t0 = K.A + 0.4 + i * 0.45, u = kprog(T, t0, t0 + 2.2, kEase.suave), pega = u >= 1;
            const yy = klerp(330 + gy * 0.6, 690, u);
            return <g key={i}>{!pega && T > t0 - 1.2 && <H2S x={gx + Math.sin(T * 1.5 + ph) * 20} y={T < t0 ? 330 + gy * 0.6 : yy} s={0.9} rot={T * 40 + ph * 60} />}
              {pega && <Atomo x={gx} y={705} r={26} color={AZUFRE} letra="S" tam={22} />}</g>; })}
        </SvgCapa>
      </Escena>
      {/* 3 · junto al huevo duro: en minutos */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <ellipse cx={540} cy={1060} rx={440} ry={150} fill="#ffffff" stroke={KC.ink} strokeWidth={10} />
          <ellipse cx={540} cy={1060} rx={330} ry={100} fill="none" stroke="#d6e3ea" strokeWidth={6} />
          <HuevoDuro x={380} y={1040} s={1} />
          <Cuchara x={760} y={930} s={0.85} rot={70} sucio={kprog(T, K.H + 0.8, K.H + 4.2)} />
          {[0, 1, 2].map((i) => { const u = (T * 0.7 + i / 3) % 1; return <path key={i} d={`M ${380 + (i - 1) * 60} ${960 - u * 180} q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#9bb34a" strokeWidth={9} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.9} />; })}
          <text x={380} y={780} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>H₂S</text>
        </SvgCapa>
      </Escena>
      {/* 4 · pulir raspa plata */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Cuchara x={540} y={980} s={1.6} rot={90} sucio={0.85 - 0.6 * kprog(T, K.P + 0.3, K.P + 3.2)} />
          <g transform={`translate(${430 + Math.sin(T * 14) * 90} ${900})`}><path d="M -130 -40 Q -90 -90 -30 -60 Q 20 -100 70 -60 Q 130 -80 130 -20 Q 150 40 100 60 Q 40 90 -20 60 Q -90 90 -130 40 Q -160 0 -130 -40 Z" fill="#7fc8ff" stroke={KC.ink} strokeWidth={8} /><path d="M -80 -30 Q -40 0 -70 40 M 10 -50 Q 40 0 10 50 M 80 -30 Q 110 10 80 40" stroke="#3d7fb8" strokeWidth={6} fill="none" strokeLinecap="round" /><text x={0} y={-80} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>trapo + pasta</text></g>
          {Array.from({ length: 18 }, (_, i) => { const t0 = K.P + 0.4 + i * 0.15, u = kprog(T, t0, t0 + 0.9), plata = i % 3 === 0;
            if (u <= 0 || u >= 1) return null;
            return <circle key={i} cx={430 + (i % 2 ? 1 : -1) * (40 + u * 260)} cy={880 - u * 260 + u * u * 200} r={plata ? 12 : 9} fill={plata ? PLATA : '#141210'} stroke={KC.ink} strokeWidth={3} />; })}
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Tr} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text>
          <Arete T={T} x={300} y={1560} s={0.45} sucio={0.92} mece={1} />
        </SvgCapa>
      </Escena>
      {/* 6 · el truco: aluminio + bicarbonato + agua caliente */}
      <Escena T={T} a={K.Tr} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <path d="M 170 820 L 910 820 L 850 1180 Q 540 1230 230 1180 Z" fill="#eaf7ff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          <path d={`M 190 ${klerp(1170, 880, kprog(T, K.Tr + 1.6, K.Tr + 2.6))} L 890 ${klerp(1170, 880, kprog(T, K.Tr + 1.6, K.Tr + 2.6))} L 850 1180 Q 540 1225 230 1180 Z`} fill="#9fd8ff" opacity={0.75} />
          <PapelAl x={540} y={1160} w={560} h={50} />
          {/* cuchara de bicarbonato */}
          {T < K.Tr + 2.2 && <g transform={`translate(780 ${klerp(560, 700, kprog(T, K.Tr + 0.6, K.Tr + 1.0))}) rotate(${klerp(0, 50, kprog(T, K.Tr + 1.0, K.Tr + 1.3))})`}>
            <rect x={-12} y={-180} width={24} height={150} rx={10} fill="#d9d2c5" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={0} rx={50} ry={34} fill="#d9d2c5" stroke={KC.ink} strokeWidth={7} /><ellipse cx={0} cy={-6} rx={36} ry={20} fill="#ffffff" /></g>}
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.Tr + 1.1 + i * 0.05, u = kprog(T, t0, t0 + 0.6); if (u <= 0 || u >= 1) return null;
            return <circle key={i} cx={800 + (i % 4) * 8 - 12} cy={klerp(720, 1100, u)} r={6} fill="#fff" stroke="#999" strokeWidth={2} />; })}
          {/* agua caliente que cae */}
          <Chorro T={T} x0={170} y0={700} x1={420} y1={1000} color="#9fd8ff" o={kprog(T, K.Tr + 1.5, K.Tr + 1.7) * (1 - kprog(T, K.Tr + 2.5, K.Tr + 2.7))} ancho={22} />
          <Vapor T={T} x={540} y={830} o={kprog(T, K.Tr + 1.8, K.Tr + 2.4)} />
          <Burbujas T={T} x={240} y={900} w={600} h={250} f={kprog(T, K.Tr + 1.9, K.Tr + 2.6) * 0.6} n={18} />
          <Arete T={T} x={540} y={klerp(560, 1010, baja)} s={0.5} sucio={0.92} />
        </SvgCapa>
      </Escena>
      {/* 7 · por dentro: los electrones */}
      <Escena T={T} a={K.E} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={480} width={KW} height={560} fill="rgba(80,150,220,.18)" />
          {/* bloque de aluminio (izq) y de plata (der) que se tocan */}
          <rect x={60} y={760} width={440} height={220} rx={10} fill={AL} stroke={KC.ink} strokeWidth={8} />
          <text x={280} y={890} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>Al</text>
          <rect x={500} y={760} width={520} height={220} rx={10} fill={PLATA} stroke={KC.ink} strokeWidth={8} />
          <text x={760} y={930} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>Ag</text>
          {/* capa negra que se vuelve plata, de izquierda a derecha */}
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.E + 0.9 + i * 0.4, u = kprog(T, t0, t0 + 0.5), cx = 535 + i * 62;
            const sube = kprog(T, t0 + 0.3, t0 + 2.6, kEase.suave);
            return <g key={i}>
              <rect x={cx - 30} y={710} width={60} height={50} fill={mixHex('#141210', PLATA, u)} stroke={KC.ink} strokeWidth={4} />
              {u > 0.3 && <g opacity={1 - kprog(sube, 0.85, 1)}><Atomo x={cx + Math.sin(T * 3 + i) * 10} y={klerp(685, 520, sube)} r={22} color={AZUFRE} letra="S" tam={20} /></g>}
            </g>; })}
          {/* electrones: viajan del aluminio a la plata */}
          {Array.from({ length: 10 }, (_, i) => { const u = ((T - K.E) * 0.7 + i / 10) % 1, on = T > K.E + 0.3;
            if (!on) return null;
            const px = klerp(140, 960, u), py = 1020 - Math.sin(u * Math.PI) * 30;
            return <g key={i}><circle cx={px} cy={py} r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /><text x={px} y={py + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>e⁻</text></g>; })}
          <path d="M 140 1050 L 960 1050" stroke={KC.yellow} strokeWidth={4} strokeDasharray="14 12" opacity={0.6} />
        </SvgCapa>
      </Escena>
      {/* 8 · 1916: las cucharas en la báscula */}
      <Escena T={T} a={K.Es} b={K.D}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {T >= mitadEs - 0.4 && <g>
            {[['pasta abrasiva', 25, 380, KC.red], ['metal + agua hirviendo', 1, 780, KC.mint]].map(([t, v, x, c], i) => {
              const h = 18 * v * kprog(T, mitadEs + 0.3 + i * 0.5, mitadEs + 1.6 + i * 0.5, kEase.sale);
              return <g key={i}>
                <rect x={x - 90} y={1000 - h} width={180} height={Math.max(h, 2)} fill={c} stroke={KC.ink} strokeWidth={7} />
                <text x={x} y={985 - h} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke" opacity={kprog(T, mitadEs + 1.2 + i * 0.5, mitadEs + 1.5 + i * 0.5)}>×{v}</text>
                <Bascula x={x} y={1010} texto={i ? '0.00006 g' : '0.0015 g'} />
                <text x={x} y={1150} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{t}</text>
              </g>; })}
          </g>}
          {T < mitadEs && <g><Cuchara x={360} y={930} s={0.75} rot={-15} sucio={0.8} /><Cuchara x={720} y={930} s={0.75} rot={15} sucio={0.8} /></g>}
        </SvgCapa>
      </Escena>
      {/* 9 · la lista de culpables (CCI, Canadá) */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <SvgCapa>
          <g transform="rotate(2 800 900)">
            <rect x={560} y={500} width={480} height={760} rx={18} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
            <text x={800} y={575} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Fuentes de gases</text>
            <text x={800} y={612} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>que ennegrecen la plata</text>
            <text x={800} y={650} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#7a7068">Conservación · Canadá</text>
            {lista.map(([t, dt], i) => { const o = kprog(T, K.D + dt, K.D + dt + 0.3), ult = i === lista.length - 1, yy = 740 + i * 130;
              const palabras = ult ? ['personas:', 'gases intestinales'] : [t];
              return <g key={i} opacity={o}>
                {ult && <rect x={580} y={yy - 50} width={440} height={palabras.length * 40 + 30} rx={12} fill={KC.yellow} opacity={kprog(T, K.D + 3.0, K.D + 3.4)} />}
                <text x={600} y={yy} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>• {palabras[0]}</text>
                {palabras[1] && <text x={630} y={yy + 40} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{palabras[1]}</text>}
              </g>; })}
          </g>
          <Nube T={T} x={850} y={1400} f={kprog(T, K.D + 3.0, K.D + 3.8)} r={110} color="#c8e65a" seed={4} n={7} />
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el arete del inicio, ya limpio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <PapelAl x={540} y={1520} w={700} h={60} />
          <Cuchara x={190} y={980} s={0.85} sucio={0} rot={-18} />
          <Cadena x={640} y={1140} s={1.2} sucio={0} />
          <Arete T={T} x={540} y={900} s={1.05} sucio={0.92 * (1 - kprog(T, K.Ci + 0.2, K.Ci + 1.6))} brilla={kprog(T, K.Ci + 1.2, K.Ci + 1.8)} mece={1} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.G + 2.6} texto="¿mugre?" x={260} y={470} tam={54} />
      <Chip T={T} at={K.G + 2.7} until={K.Q - 0.2} texto="plata + azufre" x={300} y={470} tam={44} borde={AZUFRE} />
      <Chip T={T} at={K.Q + 0.3} until={K.A - 0.2} texto="Ag₂S · sulfuro de plata" x={540} y={470} tam={42} borde={AZUFRE} />
      <Etq T={T} at={K.A + 0.5} until={K.H - 0.2} x={60} y={1440} texto="H₂S · sulfuro de hidrógeno" tam={34} color={AZUFRE} />
      <Etq T={T} at={K.A + 2.6} until={K.H - 0.2} x={60} y={1520} texto="la capa negra crece" tam={32} color={KC.texto} />
      <Cronometro T={T} at={K.H + 0.5} until={K.P - 0.2} factor={60} x={380} y={520} etiqueta="TIME-LAPSE" />
      <Chip T={T} at={K.H + 2.6} until={K.P - 0.2} texto="minutos, no meses" y={1500} tam={46} borde={KC.ink} />
      <Etq T={T} at={K.P + 0.6} until={K.Pr - 0.2} x={60} y={1480} texto="se va un poco de plata" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Tr + 0.6} until={K.E - 0.2} x={1040} y={480} texto="bicarbonato" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Tr + 1.6} until={K.E - 0.2} x={60} y={1480} texto="papel aluminio" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Tr + 1.8} until={K.E - 0.2} texto="¡cuidado: caliente!" x={540} y={1600} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Tr + 3.9} until={K.E - 0.2} texto="la plata toca el aluminio" y={1700} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.Es - 0.2} x={60} y={1440} texto="POR DENTRO · el punto de contacto" tam={28} color={KC.texto} />
      <Chip T={T} at={K.E + 2.4} until={K.Es - 0.2} texto="3 Ag₂S + 2 Al → 6 Ag + Al₂S₃" y={1560} tam={36} borde={AZUFRE} mono />
      <Etq T={T} at={K.E + 3.2} until={K.Es - 0.2} x={1030} y={440} texto="el azufre se suelta" lado="izq" tam={30} color={AZUFRE} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={mitadEs - 0.3} anio="1916" quien="Departamento de Agricultura de EE. UU." revista="Boletín 449 · cucharas de plata" y={620} />
      <Chip T={T} at={mitadEs + 0.2} until={K.D - 0.2} texto="plata perdida por limpieza" y={1500} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="Ag₂S → Ag" y={1660} tam={52} borde={AZUFRE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es mugre: *es azufre.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.A - 0.1} texto="Sulfuro de plata: *negro.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.H - 0.1} texto="Llega por el aire: *H₂S.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.P - 0.1} texto="Junto al huevo: *en minutos.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pr - 0.1} texto="Pulir *raspa plata.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Tr - 0.1} texto="¿Y si *la regresas?*" />
      <Subtitulo T={T} idx={6} at={K.Tr + 0.1} until={K.E - 0.1} texto="Que *toque el aluminio.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Es - 0.1} texto="Electrones: *vuelve a plata.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.D - 0.1} texto="1916: *25 veces más* pérdida" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Ci - 0.1} texto="Hasta *tus gases.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El aluminio *le quita el azufre.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Aire + 0.6, CUES.Huevo - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Huevo + 1.2, CUES.Pulir + 3.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Truco + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Electrones + 0.6, CUES.Estudio - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Estudio + 4.2, CUES.Dato - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Dato + 0.4, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="31" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlataApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Plata /></CompositionStage></div>;
}
window.PlataApp = PlataApp;
