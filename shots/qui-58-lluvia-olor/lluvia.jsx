// Shot Químico #58 · Ese olor no es la lluvia (geosmina y petricor) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const TIERRA_SECA = '#c9a273', TIERRA_MOJADA = '#5b3a1e', BARRO = '#d9673b', AGUA = '#9fdcff', GEO = '#ffd166', PIEL = '#f1b48f';

// Jardinera de barro con tierra. manchas = [[dx, t]]: cada gota que cae en t deja una mancha oscura en dx.
function Jardinera({ T, x, y, s = 1, moja = 0, manchas = [] }) {
  const suelo = mixHex(TIERRA_SECA, TIERRA_MOJADA, moja);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* brotecito */}
    <path d="M 120 -40 Q 110 -140 150 -200" stroke="#2f8f3a" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 150 -200 Q 210 -230 230 -180 Q 190 -160 150 -200 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M 135 -130 Q 70 -160 60 -110 Q 100 -100 135 -130 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M -380 -40 L 380 -40 L 330 220 L -330 220 Z" fill={BARRO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-400} y={-70} width={800} height={50} rx={12} fill="#e47a4c" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-62} rx={370} ry={26} fill={suelo} stroke={KC.ink} strokeWidth={6} />
    {[[-250, -66], [-120, -58], [40, -70], [190, -60], [300, -64], [-30, -54]].map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r={6} fill={mixHex('#a88356', '#3e2712', moja)} />)}
    {manchas.map(([dx, t], i) => { const k = kprog(T, t, t + 0.35, kEase.sale); return k > 0 ? <ellipse key={i} cx={dx} cy={-62 + (i % 3 - 1) * 6} rx={34 * k} ry={10 * k} fill={TIERRA_MOJADA} opacity={0.9} /> : null; })}
  </g>;
}
// Gotas de lluvia que caen en columnas pseudoaleatorias. xs = lista de x, una gota cada `cada` s.
function Lluvia({ T, xs, y0, y1, desde, hasta = Infinity, cada = 0.35, caida = 0.45, r = 16 }) {
  const out = [];
  for (let i = 0; ; i++) { const t0 = desde + i * cada; if (t0 > T || t0 > hasta) break; const u = (T - t0) / caida; const x = xs[i % xs.length];
    if (u <= 1) out.push(<path key={i} d={`M 0 ${-r * 1.7} Q ${r} 0 0 ${r} Q ${-r} 0 0 ${-r * 1.7} Z`} transform={`translate(${x} ${klerp(y0, y1, u * u)})`} fill={AGUA} stroke={KC.ink} strokeWidth={4} />);
    else if (u < 1.8) { const k = (u - 1) / 0.8; out.push(<ellipse key={i} cx={x} cy={y1 + r} rx={10 + 40 * k} ry={4 + 10 * k} fill="none" stroke={AGUA} strokeWidth={5} opacity={1 - k} />); } }
  return <g>{out}</g>;
}
// Nariz de perfil (mira a la izquierda). aspira 0..1 abre la fosa.
function Nariz({ x, y, s = 1, aspira = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 260 -330 Q 120 -320 90 -200 Q 60 -90 -60 40 Q -110 100 -50 130 Q 10 150 60 120 Q 90 160 150 150 L 260 150 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={30} cy={105} rx={28 + aspira * 6} ry={12 + aspira * 6} fill="#8a4a3a" />
    <path d="M 70 40 Q 110 70 90 120" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Rayitas de olor que viajan de (x0,y0) a (x1,y1).
function Olor({ T, x0, y0, x1, y1, o = 1, color = KC.ink, n = 3 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const dx = (i - (n - 1) / 2) * 50, mx = (x0 + x1) / 2 + dx, my = (y0 + y1) / 2 - 60;
    return <path key={i} d={`M ${x0 + dx} ${y0} Q ${mx - 60} ${my} ${mx} ${my} T ${x1 + dx * 0.4} ${y1}`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="30 26" strokeDashoffset={-T * 90 - i * 20} />; })}</g>;
}
// Geosmina esquemática: dos anillos de 6 unidos (decalina) con un –OH y dos metilos.
function Geosmina({ x, y, s = 1, rot = 0, o = 1, brillo = 0 }) {
  const r = 50, w = r * Math.sqrt(3) / 2;
  const hex = (cx) => [-90, -30, 30, 90, 150, 210].map((a) => `${cx + r * Math.cos(a * Math.PI / 180)},${r * Math.sin(a * Math.PI / 180)}`).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle r={150} fill={GEO} opacity={0.18 * brillo} />}
    <polygon points={hex(-w)} fill="#fff3d1" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <polygon points={hex(w)} fill="#fff3d1" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <line x1={0} y1={-25} x2={0} y2={-80} stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-100} r={26} fill={QA.O} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-91} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#fff">OH</text>
    <line x1={0} y1={25} x2={0} y2={75} stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={85} r={14} fill="#555" stroke={KC.ink} strokeWidth={5} />
    <line x1={-2 * w} y1={25} x2={-2 * w - 40} y2={55} stroke={KC.ink} strokeWidth={9} />
    <circle cx={-2 * w - 48} cy={62} r={14} fill="#555" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Hifas de Streptomyces con cadenas de esporas en las puntas. crece / esporas 0..1.
const HIFAS = ['M -300 200 Q -200 120 -80 140 Q 40 160 160 80 Q 260 20 320 -40', 'M -200 150 Q -220 40 -160 -60', 'M -40 140 Q 0 40 -20 -80',
  'M 120 100 Q 200 160 300 140', 'M 160 80 Q 150 -20 200 -120', 'M -120 145 Q -120 230 -60 300', 'M -260 175 Q -330 120 -320 20'];
const PUNTAS = [[320, -40, -50], [-160, -60, -80], [-20, -80, -95], [300, 140, 0], [200, -120, -75], [-320, 20, -100]];
function Hifas({ T, x, y, s = 1, crece = 1, esporas = 0, color = KC.mint, espora = '#f4f0e0' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {HIFAS.map((d, i) => <path key={i} d={d} pathLength={1} strokeDasharray={`${kclamp(crece * 1.4 - i * 0.06, 0, 1)} 1`} stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    {HIFAS.map((d, i) => <path key={'b' + i} d={d} pathLength={1} strokeDasharray={`${kclamp(crece * 1.4 - i * 0.06, 0, 1)} 1`} stroke="rgba(0,0,0,.35)" strokeWidth={4} fill="none" strokeLinecap="round" />)}
    {PUNTAS.map(([px, py, ang], i) => Array.from({ length: 6 }, (_, k) => { const on = esporas * 6 - k > 0; if (!on) return null; const a = (ang - 90 + Math.sin(k * 1.3 + i) * 18) * Math.PI / 180;
      const d = 22 + k * 22; return <ellipse key={i + '-' + k} cx={px + Math.cos(a) * d} cy={py + Math.sin(a) * d + Math.sin(T * 2 + k) * 2} rx={11} ry={9} fill={espora} stroke={KC.ink} strokeWidth={4} />; }))}
  </g>;
}
// Alberca olímpica vista desde arriba.
function Alberca({ x, y, w, h, o = 1 }) {
  return <g opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx={Math.min(w, h) * 0.08} fill="#3fb8f0" stroke={KC.ink} strokeWidth={Math.max(2, w / 60)} />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={x + w * 0.05} x2={x + w * 0.95} y1={y + h * (i + 1) / 8} y2={y + h * (i + 1) / 8} stroke="#fff" strokeWidth={Math.max(1, w / 160)} strokeDasharray={`${w / 30} ${w / 40}`} opacity={0.8} />)}
  </g>;
}
function Cucharita({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={20} y={-10} width={220} height={20} rx={10} fill="#d7dde6" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-30} cy={0} rx={60} ry={40} fill="#d7dde6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-30} cy={-4} rx={40} ry={22} fill={GEO} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Grano de tierra.
function Grano({ x, y, r = 60, color = '#a8743f', seed = 1 }) {
  const R = krng(seed), pts = Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2, rr = r * (0.8 + R() * 0.35); return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`; });
  return <polygon points={pts.join(' ')} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />;
}
// Cámara de alta velocidad.
function CamaraRapida({ x, y, s = 1, flash = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={130} width={20} height={200} fill="#555" stroke={KC.ink} strokeWidth={6} />
    <path d="M -110 330 L 10 330 M -50 330 L -50 300" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <rect x={-150} y={-80} width={230} height={170} rx={20} fill="#3a3f4b" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-110} width={70} height={34} rx={8} fill="#3a3f4b" stroke={KC.ink} strokeWidth={7} />
    <rect x={70} y={-50} width={90} height={110} rx={12} fill="#22252c" stroke={KC.ink} strokeWidth={8} />
    <circle cx={160} cy={5} r={46} fill="#11151c" stroke={KC.ink} strokeWidth={8} />
    <circle cx={160} cy={5} r={26} fill="#4aa8ff" opacity={0.7} /><circle cx={150} cy={-6} r={8} fill="#fff" opacity={0.8} />
    <circle cx={-110} cy={-50} r={12} fill={KC.red} opacity={0.4 + 0.6 * flash} />
    {flash > 0 && <path d="M 200 5 L 480 -90 L 480 120 Z" fill="#fff" opacity={0.15 * flash} />}
  </g>;
}
// Colémbolo (Folsomia candida: blanco, alargado, sin ojos), mira a la derecha. paso anima las patas; esporas = cuántas trae pegadas (0..1).
function Colembolo({ T, x, y, s = 1, paso = 0, esporas = 0, flip = false }) {
  const pata = (i) => Math.sin(paso * 14 + i * 2) * 10;
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M -150 20 Q -190 50 -120 50" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {[-30, 10, 50].map((lx, i) => <path key={i} d={`M ${lx} 30 L ${lx + pata(i)} 70`} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />)}
    <ellipse cx={-80} cy={0} rx={90} ry={40} fill="#f2eee2" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={20} cy={0} rx={55} ry={38} fill="#f2eee2" stroke={KC.ink} strokeWidth={7} />
    {[-130, -90, -50].map((sx, i) => <path key={i} d={`M ${sx} -36 Q ${sx + 6} 0 ${sx} 36`} stroke="rgba(0,0,0,.25)" strokeWidth={4} fill="none" />)}
    <circle cx={90} cy={-4} r={34} fill="#f2eee2" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 110 -30 Q 150 -90 ${200 + Math.sin(T * 5) * 8} -100`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M 100 -34 Q 120 -100 ${160 + Math.sin(T * 4 + 1) * 8} -120`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {[[-120, -20], [-60, -26], [-20, 10], [30, -20], [-150, 8], [60, 14], [-90, 18], [0, -30]].map(([ex, ey], i) => i / 8 < esporas ? <ellipse key={i} cx={ex} cy={ey} rx={9} ry={7} fill="#c9f2dd" stroke={KC.ink} strokeWidth={3} /> : null)}
  </g>;
}
function Popo({ x, y, o = 1 }) {
  return <g opacity={o}><ellipse cx={x} cy={y} rx={22} ry={15} fill="#6b4a2c" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={x - 6} cy={y - 3} rx={5} ry={4} fill="#c9f2dd" /><ellipse cx={x + 8} cy={y + 3} rx={5} ry={4} fill="#c9f2dd" /></g>;
}
// Panel de lluvia (llovizna o aguacero) con su suelo.
function PanelLluvia({ T, x, w, desde, hasta, rapido, color }) {
  const xs = [0.2, 0.55, 0.8, 0.35, 0.65, 0.12, 0.9, 0.45].map((f) => x + w * f);
  const R = krng(rapido ? 9 : 4);
  return <g>
    <rect x={x} y={520} width={w} height={640} rx={30} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={x + 6} y={1030} width={w - 12} height={124} rx={20} fill={TIERRA_MOJADA} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={x + 20 + (i * 37) % (w - 40)} cy={1060 + (i % 3) * 28} r={10} fill="#3e2712" />)}
    <Lluvia T={T} xs={xs} y0={560} y1={1015} desde={desde} hasta={hasta} cada={rapido ? 0.07 : 0.42} caida={rapido ? 0.18 : 0.55} r={rapido ? 24 : 16} />
    {!rapido && Array.from({ length: 30 }, (_, i) => { const t0 = desde + 0.5 + R() * 3.4, u = kprog(T, t0, t0 + 1.6); if (u <= 0 || u >= 1) return null;
      return <circle key={'a' + i} cx={x + 40 + R() * (w - 80) + Math.sin(T * 3 + i) * 8} cy={klerp(1010, 620, u)} r={9 + (i % 3) * 3} fill="#ffffff" stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.6} />; })}
  </g>;
}

function Lluvia58() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, N: CUES.Nariz, Cu: CUES.Cuchara, Pr: CUES.Pregunta, Es: CUES.Estudio, Bu: CUES.Burbujas, Ae: CUES.Aerosol, Ll: CUES.Llovizna, Co: CUES.Colembolos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const xsG = [260, 120, 420, 330, 180, 470, 380, 230];
  const manchasG = xsG.map((x, i) => [x - 300, K.G + 0.05 + i * 0.32 + 0.45]);
  const mojaG = kprog(T, K.G + 0.4, K.G + 4.5);
  // Burbujas (corte lateral): la gota cae, se aplasta, atrapa burbujas que revientan
  const caeB = kprog(T, K.Bu, K.Bu + 0.6, kEase.entra || ((p) => p * p));
  const aplasta = kprog(T, K.Bu + 0.6, K.Bu + 1.0, kEase.sale);
  const absorbe = kprog(T, K.Bu + 1.0, K.Bu + 5.5);
  const SUP = 1000;
  const gRx = klerp(110, 300, aplasta), gRy = klerp(110, 70, aplasta) * (1 - absorbe * 0.55);
  const gCy = aplasta > 0 ? SUP - gRy : klerp(240, SUP - 110, caeB);
  const burb = [[-200, 0], [-110, 1], [-20, 2], [70, 3], [160, 4], [230, 5]];
  const RA = krng(31);
  const aero = Array.from({ length: 34 }, () => [80 + RA() * 920, RA() * 6, 6 + RA() * 12, RA() < 0.4]);
  const xsC = [180, 320, 470, 620, 760, 880];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: primeras gotas sobre la jardinera seca, la nariz huele */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05} origen="35% 60%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Lluvia T={T} xs={xsG} y0={-40} y1={890} desde={K.G + 0.05} cada={0.32} caida={0.45} r={26} />
          <Lluvia T={T} xs={[150, 400, 280, 90, 460]} y0={-40} y1={890} desde={K.G + 2.8} cada={0.26} caida={0.4} r={20} />
          <Jardinera T={T} x={300} y={960} s={0.75} moja={mojaG} manchas={manchasG} />
          <Olor T={T} x0={300} y0={880} x1={760} y1={1010} o={kprog(T, K.G + 1.4, K.G + 2.2)} color="#7a5230" />
          <Nariz x={760} y={980} s={0.95} aspira={0.5 + 0.5 * Math.sin(T * 5)} />
          <line x1={60} y1={1185} x2={60 + 150} y2={1185} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          <text x={60} y={1170} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>10 cm</text>
        </SvgCapa>
      </Escena>
      {/* 1 · Streptomyces haciendo esporas y geosmina (lupa al suelo) */}
      <Escena T={T} a={K.Q} b={K.N} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {[[120, 1150, 80, 1], [930, 1100, 90, 2], [860, 560, 60, 3], [160, 520, 55, 4]].map(([gx, gy, r, sd]) => <Grano key={sd} x={gx} y={gy} r={r} color="#6b4a2c" seed={sd} />)}
          <Hifas T={T} x={540} y={900} s={1.25} crece={kprog(T, K.Q - 0.3, K.Q + 1.4)} esporas={kprog(T, K.Q + 1.2, K.Q + 2.6)} />
          {[[640, 620, 0], [380, 600, 1], [820, 760, 2], [260, 760, 3]].map(([gx, gy, i]) => { const t0 = K.Q + 2.4 + i * 0.3, u = kprog(T, t0, t0 + 0.6, kEase.sale);
            return u > 0 ? <Geosmina key={i} x={gx + Math.sin(T + i) * 12} y={gy - (T - t0) * 14} s={0.55 * u} rot={T * 15 + i * 40} brillo={1} /> : null; })}
          <line x1={60} y1={1185} x2={60 + 130} y2={1185} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
          <text x={60} y={1170} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>10 µm</text>
        </SvgCapa>
      </Escena>
      {/* 2 · la nariz y el umbral */}
      <Escena T={T} a={K.N} b={K.Cu} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Nariz x={740} y={760} s={1.05} aspira={kprog(T, K.N + 0.4, K.N + 1.0)} />
          <VasoLab x={300} y={1000} s={1.1} liquido="#bfe8ff" nivel={0.75}>
            {Array.from({ length: 60 }, (_, i) => { const R = krng(i + 3); return <circle key={i} cx={(R() - 0.5) * 190 + Math.sin(T + i) * 4} cy={-R() * 210 - 6} r={3} fill="#c58a16" opacity={0.35 * kprog(T, K.N + 1.4, K.N + 2.2)} />; })}
          </VasoLab>
          <Olor T={T} x0={330} y0={640} x1={640} y1={860} o={kprog(T, K.N + 1.8, K.N + 2.4) * 0.8} color="#c58a16" n={2} />
        </SvgCapa>
        <Medidor T={T} at={K.N + 0.5} until={K.Cu - 0.3} valor={(t) => kprog(t, K.N + 0.6, K.N + 2.2) * 0.12} etiqueta="umbral de olor (en agua)" texto={() => '4–10 ng/L'} y={1060} color={KC.violet} />
      </Escena>
      {/* 3 · una cucharadita en 200 albercas */}
      <Escena T={T} a={K.Cu} b={K.Pr} zoom={0.02}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {(() => { const lejos = kprog(T, K.Cu + 1.3, K.Cu + 2.3, kEase.suave); const big = 1 - lejos;
            const out = [];
            for (let i = 0; i < 200; i++) { const c = i % 10, r = Math.floor(i / 10), t0 = K.Cu + 1.6 + i * 0.008;
              const o = i === 0 ? 1 : kprog(T, t0, t0 + 0.15);
              const gx = 100 + c * 88, gy = 470 + r * 36;
              const X = i === 0 ? klerp(140, gx, lejos) : gx, Y = i === 0 ? klerp(500, gy, lejos) : gy, W = i === 0 ? klerp(800, 80, lejos) : 80, H = i === 0 ? klerp(420, 30, lejos) : 30;
              if (o > 0) out.push(<Alberca key={i} x={X} y={Y} w={W} h={H} o={o} />); }
            return <g>{out}
              {big > 0.05 && <g opacity={big}><Cucharita x={560} y={klerp(380, 640, kprog(T, K.Cu + 0.1, K.Cu + 0.6, kEase.sale))} s={1.1} rot={klerp(0, 35, kprog(T, K.Cu + 0.6, K.Cu + 0.9))} />
                {T > K.Cu + 0.9 && <circle cx={520} cy={klerp(660, 720, kprog(T, K.Cu + 0.9, K.Cu + 1.1))} r={klerp(12, 40, kprog(T, K.Cu + 1.1, K.Cu + 1.5))} fill="none" stroke="#fff" strokeWidth={5} opacity={1 - kprog(T, K.Cu + 1.1, K.Cu + 1.5)} />}</g>}
            </g>; })()}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Cu + 2.2} until={K.Pr - 0.2} valor={200} desde={1} dur={1.0} prefijo="×" y={1080} tam={150} color={KC.yellow} />
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Grano x={200} y={1080} r={90} color="#a8743f" seed={7} />
          <Geosmina x={200} y={1050} s={0.5} rot={Math.sin(T * 3) * 10} />
          <path d="M 260 990 Q 520 820 300 560" stroke={KC.ink} strokeWidth={9} fill="none" strokeDasharray="26 18" strokeDashoffset={-T * 60} strokeLinecap="round" />
          <Nariz x={240} y={420} s={0.5} />
          <text x={330} y={920} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 330 800)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · MIT 2015: cámara rápida y gotas sobre tierra */}
      <Escena T={T} a={K.Es} b={K.Bu} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <CamaraRapida x={230} y={760} s={1} flash={T > K.Es + 3 ? (Math.sin(T * 12) > 0 ? 1 : 0.3) : 0} />
          <ellipse cx={720} cy={1020} rx={230} ry={50} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={720} cy={1005} rx={185} ry={32} fill={TIERRA_SECA} stroke={KC.ink} strokeWidth={5} />
          <g transform="translate(720 560)"><rect x={-16} y={-200} width={32} height={170} rx={8} fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={-210} rx={34} ry={24} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>
          <Lluvia T={T} xs={[720]} y0={580} y1={970} desde={K.Es + 0.6} cada={0.8} caida={0.45} r={16} />
        </SvgCapa>
        <Contador T={T} at={K.Es + 3.2} desde={0} hasta={600} dur={2.2} sufijo=" experimentos" x={400} y={470} tam={50} color={KC.texto} />
      </Escena>
      {/* 6 · corte lateral: la gota, las burbujas y los chorritos */}
      <Escena T={T} a={K.Bu} b={K.Ae} zoom={0.03} origen="50% 55%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {Array.from({ length: 12 }, (_, i) => <Grano key={i} x={20 + i * 95} y={SUP + 70 + (i % 2) * 40} r={62} color="#7a5230" seed={i + 10} />)}
          {Array.from({ length: 11 }, (_, i) => <Grano key={'b' + i} x={65 + i * 95} y={SUP + 170 + (i % 2) * 30} r={58} color="#6b4a2c" seed={i + 40} />)}
          <ellipse cx={540} cy={gCy} rx={gRx} ry={gRy} fill="rgba(159,220,255,.55)" stroke={AGUA} strokeWidth={7} />
          {burb.map(([dx, i]) => { const tb = K.Bu + 1.1 + i * 0.12, sube = kprog(T, tb + 0.4, K.Bu + 2.6 + i * 0.25, kEase.suave), rev = K.Bu + 2.6 + i * 0.25;
            const r = klerp(10, 30, kprog(T, tb, tb + 1.2)), by = klerp(SUP - 10, gCy - gRy + r + 4, sube);
            const out = [];
            if (T > tb && T < rev) out.push(<circle key="b" cx={540 + dx * (gRx / 300)} cy={by} r={r} fill="rgba(255,255,255,.25)" stroke="#fff" strokeWidth={4} />);
            if (T >= rev) { const j = kprog(T, rev, rev + 0.3, kEase.sale), xx = 540 + dx * (gRx / 300), top = gCy - gRy;
              if (j < 1) out.push(<line key="j" x1={xx} y1={top} x2={xx} y2={top - 220 * j} stroke={AGUA} strokeWidth={10} strokeLinecap="round" />);
              for (let k = 0; k < 4; k++) { const u = T - rev - 0.25; if (u > 0) out.push(<circle key={'d' + k} cx={xx + (k - 1.5) * 14 + Math.sin(T * 2 + k) * 6} cy={top - 220 - u * 90 - k * 26} r={8 + (k % 2) * 4} fill="#e8f6ff" stroke={KC.ink} strokeWidth={2} />); } }
            return <g key={i}>{out}</g>; })}
          <line x1={60} y1={1185} x2={60 + 110} y2={1185} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
          <text x={60} y={1170} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>1 mm</text>
        </SvgCapa>
        <Onomato T={T} at={K.Bu + 2.6} until={K.Bu + 3.6} x={300} y={620} texto="¡pop!" tam={90} />
        <Onomato T={T} at={K.Bu + 3.4} until={K.Bu + 4.4} x={800} y={560} texto="¡pop!" tam={80} rot={8} color={KC.cyan} />
      </Escena>
      {/* 7 · aerosol: las gotitas suben con pedacitos de suelo */}
      <Escena T={T} a={K.Ae} b={K.Ll} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#10203a' }}></div>
        <SvgCapa>
          <rect x={0} y={1120} width={KW} height={100} fill={TIERRA_MOJADA} />
          {aero.map(([ax, ph, r, sucia], i) => { const y = 1110 - (((T - K.Ae) * 70 + ph * 150) % 700); return <g key={i}>
            <circle cx={ax + Math.sin(T * 1.5 + ph) * 16} cy={y} r={r} fill="rgba(232,246,255,.35)" stroke="#e8f6ff" strokeWidth={3} />
            {sucia && <circle cx={ax + Math.sin(T * 1.5 + ph) * 16} cy={y} r={r * 0.4} fill="#a8743f" />}</g>; })}
          {(() => { const z = kprog(T, K.Ae + 2.2, K.Ae + 2.9, kEase.rebote); return z > 0 ? <g transform={`translate(540 760) scale(${z})`}>
            <circle r={170} fill="rgba(232,246,255,.25)" stroke="#e8f6ff" strokeWidth={8} />
            <Geosmina x={10} y={20} s={0.75} rot={Math.sin(T) * 12} />
          </g> : null; })()}
        </SvgCapa>
      </Escena>
      {/* 8 · llovizna sí, aguacero no */}
      <Escena T={T} a={K.Ll} b={K.Co} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <PanelLluvia T={T} x={40} w={480} desde={K.Ll - 0.3} hasta={K.Co + 0.5} rapido={false} color="#bfe8ff" />
          <PanelLluvia T={T} x={560} w={480} desde={K.Ll - 0.3} hasta={K.Co + 0.5} rapido color="#8a9bb3" />
          <Marca x={280} y={1100} ok s={0.8} o={kprog(T, K.Ll + 0.6, K.Ll + 1.0)} />
          <Marca x={800} y={1100} ok={false} s={0.8} o={kprog(T, K.Ll + 2.0, K.Ll + 2.4)} />
        </SvgCapa>
        <Chip T={T} at={K.Ll + 0.1} until={K.Co - 0.2} texto="llovizna · < 4 m/s" x={280} y={470} tam={32} borde={KC.cyan} />
        <Chip T={T} at={K.Ll + 1.4} until={K.Co - 0.2} texto="aguacero · > 7 m/s" x={800} y={470} tam={32} borde={KC.red} />
      </Escena>
      {/* 9 · colémbolos: la geosmina los atrae y reparten esporas */}
      <Escena T={T} a={K.Co} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={1110} width={KW} height={120} fill="#2a1c10" />
          <Hifas T={T} x={820} y={980} s={0.62} crece={1} esporas={1} />
          {Array.from({ length: 5 }, (_, i) => { const u = ((T - K.Co) * 0.25 + i / 5) % 1; return <Geosmina key={i} x={klerp(760, 120, u)} y={760 + Math.sin(u * 8 + i) * 40} s={0.28} rot={T * 30 + i * 50} o={Math.sin(u * Math.PI)} brillo={0.6} />; })}
          {(() => { const llega = kprog(T, K.Co + 3.2, K.Co + 4.6, kEase.suave), come = kprog(T, K.Co + 4.6, K.Co + 5.6), va = kprog(T, K.Co + 5.6, K.Ci + 0.4);
            const cx = va > 0 ? klerp(610, 330, va) : klerp(-120, 610, llega);
            const caminando = (llega > 0 && llega < 1) || va > 0;
            return <g>
              {va > 0.2 && <Popo x={560} y={1095} o={kprog(T, K.Co + 6.0, K.Co + 6.3)} />}
              {va > 0.5 && <Popo x={470} y={1098} o={kprog(T, K.Ci - 0.3, K.Ci)} />}
              <Colembolo T={T} x={cx} y={1020 + (come > 0 && come < 1 ? Math.abs(Math.sin(T * 12)) * 8 : 0)} s={1.25} paso={caminando ? T : 0} esporas={come} flip={va > 0} />
            </g>; })()}
        </SvgCapa>
        <Etq T={T} at={K.Co + 4.0} until={K.Ci - 0.3} x={60} y={880} texto="colémbolo · ≈ 1–3 mm" tam={32} color={KC.texto} />
        <Etq T={T} at={K.Co + 0.8} until={K.Ci - 0.3} x={1040} y={720} texto="Streptomyces" it lado="izq" tam={32} color={KC.mint} />
      </Escena>
      {/* 10 · cierre: la misma jardinera, ya mojada, con el olor subiendo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="35% 60%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Lluvia T={T} xs={[150, 400, 280, 90, 460]} y0={-40} y1={890} desde={K.Ci - 0.5} cada={0.6} caida={0.45} r={13} />
          <Jardinera T={T} x={300} y={960} s={0.75} moja={1} manchas={[]} />
          <Olor T={T} x0={300} y0={880} x1={760} y1={1010} o={1} color="#7a5230" />
          <Nariz x={760} y={980} s={0.95} aspira={0.5 + 0.5 * Math.sin(T * 5)} />
          {(() => { const u = kprog(T, K.Ci + 1.2, K.Ou - 0.2); return <g>
            <Colembolo T={T} x={klerp(60, 380, u)} y={880} s={0.55} paso={T} esporas={1} />
            <g transform={`translate(${klerp(60, 380, u) + 10} 760) scale(1.4)`} opacity={kprog(T, K.Ci + 1.4, K.Ci + 1.8)}>
              <line x1={0} y1={0} x2={0} y2={70} stroke={KC.ink} strokeWidth={5} />
              <rect x={-80} y={-46} width={160} height={52} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <text x={0} y={-10} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>¿AVENTÓN?</text>
            </g></g>; })()}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.G + 3.3} texto="¿es la lluvia?" x={300} y={470} tam={46} />
      <Chip T={T} at={K.G + 3.4} until={K.Q - 0.3} texto="sobre todo: bacterias" x={300} y={470} tam={38} borde={KC.mint} />
      <Etq T={T} at={K.Q + 0.8} until={K.N - 0.3} x={60} y={1010} texto="Streptomyces" it tam={36} color={KC.mint} />
      <Etq T={T} at={K.Q + 1.6} until={K.N - 0.3} x={1030} y={470} texto="cadenas de esporas" lado="izq" tam={30} color="#f4f0e0" />
      <Chip T={T} at={K.Q + 2.6} until={K.N - 0.3} texto="geosmina · C₁₂H₂₂O" y={1500} tam={44} borde={GEO} />
      <Chip T={T} at={K.N + 1.6} until={K.Cu - 0.3} texto="1 ng = 0.000 000 001 g" y={1500} tam={40} borde={KC.violet} mono />
      <Chip T={T} at={K.Cu + 2.4} until={K.Pr - 0.2} texto="1 cucharadita · 200 albercas olímpicas" y={1500} tam={34} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2015" quien="Joung y Buie · MIT, EUA" revista="Nature Communications · cámara rápida" x={560} y={760} />
      <Chip T={T} at={K.Es + 3.3} until={K.Bu - 0.2} texto="gotas sobre 16 suelos y otros materiales" y={1500} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Bu + 1.4} until={K.Bu + 2.7} x={820} y={860} texto="burbujita de aire" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Bu + 1.2} until={K.Ae - 0.2} texto="burbuja → chorrito → gotitas" y={1500} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.Ae + 0.4} until={K.Ll - 0.3} x={60} y={470} texto="aerosol" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ae + 0.8} until={K.Ll - 0.3} x={60} y={1060} texto="pedacitos de suelo" tam={30} color="#e2b07a" />
      <Chip T={T} at={K.Ae + 2.6} until={K.Ll - 0.2} texto="hipótesis: ¿así viaja el olor?" y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.Ll + 2.6} until={K.Co - 0.2} texto="aerosoles: llovizna sí, aguacero no" y={1500} tam={34} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Co + 0.3} until={K.Co + 3.1} anio="2020" quien="Becher et al. · Nat. Microbiology" revista="Univ. de Lund y equipo internacional" x={760} y={430} />
      <Chip T={T} at={K.Co + 3.4} until={K.Ci - 0.2} texto="come la colonia → reparte esporas" y={1500} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.Ci + 0.6} until={K.Ou - 0.1} x={560} y={760} texto="geosmina" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="olor a lluvia = sobre todo geosmina" y={1500} tam={34} borde={GEO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Sobre todo, *una molécula bacteriana.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.N - 0.1} texto="Geosmina: *la hacen al esporular.*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.Cu - 0.1} texto="Tu nariz: *4 a 10 ng/L.*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.Pr - 0.1} texto="Una cucharadita, *200 albercas.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cómo llega *a tu nariz?*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Bu - 0.1} texto="MIT, 2015: *600 experimentos.*" />
      <Subtitulo T={T} idx={6} at={K.Bu + 0.1} until={K.Ae - 0.1} texto="Burbujas que *revientan en gotitas.*" />
      <Subtitulo T={T} idx={7} at={K.Ae + 0.1} until={K.Ll - 0.1} texto="¿Así viaja *el olor?*" />
      <Subtitulo T={T} idx={8} at={K.Ll + 0.1} until={K.Co - 0.1} texto="Llovizna sí, *aguacero no.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="Atrae a *los colémbolos.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Bacterias *pidiendo aventón.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Nariz - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Nariz + 0.6, CUES.Cuchara - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.2, CUES.Burbujas - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Burbujas + 3.0, CUES.Aerosol - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Aerosol + 1.0, CUES.Llovizna - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Colembolos + 0.2, CUES.Colembolos + 3.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="58" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LluviaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Lluvia58 /></CompositionStage></div>;
}
window.LluviaApp = LluviaApp;
