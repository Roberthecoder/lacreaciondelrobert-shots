// Shot IA #59 · El robot que cosió un intestino (y quién lo vigilaba) — NARRADO (N3 "Capítulos y medidores").
// Datos: Saeidi et al., Science Robotics 7(62): eabj2908 (2022) · Kim et al., SRT-H, Science Robotics (2025). Ver guion.md y verificacion.md.
// Todo es esquemático.
const ROSA = '#ff9fb5', ROSA2 = '#e86a8a', HILO = '#2346ff', ACERO = '#c9d2e3', PIEL = '#f1c7a0', BATA = '#11a39a';

// Intestino: dos extremos de tubo que se juntan en x = 0. gap = separación (px), puntadas = cuántas van (puede ser fraccional),
// paso = separación entre puntadas (px), desv = desviaciones por puntada (para puntadas disparejas), corregidas = índices en rojo.
function Intestino({ x, y, s = 1, gap = 0, puntadas = 0, n = 7, paso = 30, T = 0, respira = 0, desv = null, color = HILO }) {
  const b = 1 + respira * 0.04 * Math.sin(T * 1.7);
  const L = 380, H = 160;
  const tramo = (lado) => { const x0 = lado < 0 ? -gap / 2 - L : gap / 2, x1 = x0 + L;
    return <g>
      <path d={`M ${x0} ${-H / 2} L ${x1} ${-H / 2} Q ${x1 + (lado < 0 ? 26 : -26) * 0} ${0} ${x1} ${H / 2} L ${x0} ${H / 2} Z`} fill={ROSA} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {[0.22, 0.45, 0.68].map((f) => <path key={f} d={`M ${x0 + L * f} ${-H / 2 + 10} q 26 ${H / 2 - 10} 0 ${H - 20}`} stroke={ROSA2} strokeWidth={5} fill="none" opacity=".7" />)}
      <path d={`M ${x0 + 30} ${-H / 2 + 26} L ${x1 - 30} ${-H / 2 + 26}`} stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity=".45" />
      <ellipse cx={lado < 0 ? x1 : x0} cy={0} rx={gap > 6 ? 30 : 6} ry={H / 2} fill={gap > 6 ? '#b83b5e' : ROSA} stroke={KC.ink} strokeWidth={8} />
    </g>; };
  const pts = [];
  for (let i = 0; i < n; i++) {
    const k = kclamp(puntadas - i, 0, 1); if (k <= 0) continue;
    const yy = (i - (n - 1) / 2) * paso + (desv ? desv[i] : 0);
    pts.push(<path key={i} d={`M ${-22} ${yy - 8} C ${-6} ${yy - 22} ${6} ${yy + 22} ${22} ${yy + 8}`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round"
      strokeDasharray="60" strokeDashoffset={60 * (1 - k)} />);
  }
  return <g transform={`translate(${x} ${y}) scale(${s * b} ${s})`}>{tramo(-1)}{tramo(1)}{pts}</g>;
}

// Brazo robótico (STAR) que llega desde la izquierda; punta en (tx, ty) con aguja curva y cámara.
function Brazo({ tx, ty, s = 1, T = 0, luz = true }) {
  const P = [[-560, -620], [-330, -500], [-120, -210], [0, 0]];
  const seg = (a, b, w) => <><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={w + 12} strokeLinecap="round" />
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={ACERO} strokeWidth={w} strokeLinecap="round" /></>;
  return <g transform={`translate(${tx} ${ty}) scale(${s})`}>
    {seg(P[0], P[1], 58)}{seg(P[1], P[2], 46)}
    <line x1={P[2][0]} y1={P[2][1]} x2={-8} y2={-14} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={P[2][0]} y1={P[2][1]} x2={-8} y2={-14} stroke="#8f9bb3" strokeWidth={12} strokeLinecap="round" />
    {P.slice(0, 3).map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={[40, 32, 24][i]} fill="#7f8ba3" stroke={KC.ink} strokeWidth={8} />)}
    <rect x={-300} y={-560} width={130} height={52} rx={14} fill={KC.ink} transform="rotate(28 -235 -534)" />
    <text x={-235} y={-522} textAnchor="middle" transform="rotate(28 -235 -534)" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.yellow}>STAR</text>
    <path d="M -6 -10 C 30 -10 34 30 6 36" stroke="#e8edf6" strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -6 -10 C 30 -10 34 30 6 36" stroke={KC.ink} strokeWidth={2} fill="none" />
    {luz && <circle cx={P[2][0] + 6} cy={P[2][1] - 30} r={10 + 3 * Math.sin(T * 6)} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />}
  </g>;
}

// Persona (cirujana) con gorro y cubrebocas frente a un monitor. ok = 0..1 enciende el botón "aprobar".
function Persona({ x, y, s = 1, T = 0, ok = 0, pantalla = 'plan' }) {
  const mira = Math.sin(T * 1.3) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 230 Q -150 110 -60 90 L 60 90 Q 150 110 150 230 Z" fill={BATA} stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 92 L 0 140 L 30 92" fill="none" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={10 + mira} r={78} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -80 ${-6 + mira} Q -82 -86 0 ${-92 + mira} Q 82 -86 80 ${-6 + mira} Z`} fill={BATA} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -62 ${20 + mira} Q 0 ${10 + mira} 62 ${20 + mira} L 54 ${70 + mira} Q 0 ${92 + mira} -54 ${70 + mira} Z`} fill="#bfe6ff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-28} cy={-6 + mira} r={8} fill={KC.ink} /><circle cx={28} cy={-6 + mira} r={8} fill={KC.ink} />
    <g transform="translate(250 60)">
      <rect x={-130} y={-110} width={260} height={190} rx={16} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
      <rect x={-108} y={-90} width={216} height={150} rx={8} fill={KC.noche} />
      {pantalla === 'plan' && <><line x1={-60} y1={-70} x2={-60} y2={40} stroke={ROSA} strokeWidth={18} opacity=".8" />
        {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-60} cy={-58 + i * 24} r={6} fill={KC.yellow} />)}
        <rect x={0} y={-30} width={92} height={46} rx={12} fill={ok > 0.5 ? KC.mint : '#3a4560'} stroke={KC.texto} strokeWidth={3} />
        <text x={46} y={2} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={ok > 0.5 ? KC.ink : KC.texto}>{ok > 0.5 ? '✔ OK' : 'aprobar'}</text></>}
      {pantalla === 'vigila' && <><path d={`M -100 0 ${Array.from({ length: 20 }, (_, i) => `L ${-100 + i * 10.5} ${(i % 5 === 2) ? -40 : 0}`).join(' ')}`} transform={`translate(${-((T * 40) % 52)} 0)`} stroke={KC.mint} strokeWidth={5} fill="none" />
        <text x={0} y={46} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.mint}>vigilando</text></>}
      <rect x={-20} y={80} width={40} height={40} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}

// Cerdito esquemático.
function Cerdito({ x, y, s = 1, T = 0, fase = 0 }) {
  const b = Math.abs(Math.sin(T * 3 + fase)) * -8;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    {[-55, -20, 25, 60].map((lx) => <rect key={lx} x={lx - 11} y={40} width={22} height={50} rx={8} fill="#ff8fb0" stroke={KC.ink} strokeWidth={6} />)}
    <ellipse cx={0} cy={10} rx={100} ry={68} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    <path d="M -100 0 q -26 -14 -16 -30 q 10 -10 6 6" stroke={KC.ink} strokeWidth={5} fill="none" />
    <circle cx={86} cy={-18} r={52} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    <path d="M 52 -58 L 62 -92 L 82 -64 Z" fill="#ff8fb0" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 100 -66 L 120 -94 L 124 -60 Z" fill="#ff8fb0" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={130} cy={-6} rx={24} ry={18} fill="#ff8fb0" stroke={KC.ink} strokeWidth={5} />
    <circle cx={124} cy={-6} r={4} fill={KC.ink} /><circle cx={137} cy={-6} r={4} fill={KC.ink} />
    <circle cx={92} cy={-30} r={6} fill={KC.ink} />
  </g>;
}

// Vesícula (fuera del cuerpo) con sus dos tubos: clips 0..3 por tubo y corte 0..1.
function Vesicula({ x, y, s = 1, clips = 0, corte = 0, ok = 0 }) {
  const tubo = (tx) => <g>
    <path d={`M ${tx} 20 L ${tx} -150`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M ${tx} 20 L ${tx} -150`} stroke={tx < 0 ? '#e6d27a' : '#e8556a'} strokeWidth={12} strokeLinecap="round" />
    {[0, 1, 2].map((k) => k < clips && <rect key={k} x={tx - 18} y={[-20, -44, -118][k]} width={36} height={11} rx={4} fill="#dfe5ef" stroke={KC.ink} strokeWidth={3} />)}
    {corte > 0 && <rect x={tx - 16} y={-90} width={32} height={18 * corte} fill={KC.paper} />}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {tubo(-22)}{tubo(22)}
    <path d="M 0 0 C 70 0 80 80 60 150 C 40 220 -40 220 -60 150 C -80 80 -70 0 0 0 Z" fill="#7cc36b" stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 60 Q -40 120 -20 170" stroke="#b6e8a6" strokeWidth={8} fill="none" strokeLinecap="round" />
    {ok > 0 && <g opacity={ok} transform={`translate(70 190) scale(${klerp(1.6, 1, ok)})`}><circle r={30} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
      <path d="M -13 0 L -3 11 L 15 -11" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /></g>}
  </g>;
}

// Puntadas en fila sobre tejido de práctica (para comparar separación).
function FilaPuntadas({ x, y, ancho = 760, gaps, p = 1, color = HILO, etiqueta, tinta = KC.ink }) {
  let acc = 0; const xs = [0, ...gaps.map((g) => (acc += g))];
  const k = Math.ceil(xs.length * p);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-70} width={ancho + 60} height={140} rx={30} fill="#f7c9d4" stroke={KC.ink} strokeWidth={7} />
    <line x1={-20} y1={0} x2={ancho + 20} y2={0} stroke={ROSA2} strokeWidth={6} />
    {xs.slice(0, k).map((xx, i) => <path key={i} d={`M ${xx - 10} -34 C ${xx + 14} -12 ${xx - 14} 12 ${xx + 10} 34`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <text x={-20} y={-88} style={{ font:`900 40px ${KF.texto}` }} fill={tinta}>{etiqueta}</text>
  </g>;
}

// Rejilla de 86 puntadas; las "rojas" (corregidas por una persona) se encienden con p.
function RejillaPuntadas({ x = 120, y = 560, p = 0 }) {
  const r = krng(59), idx = Array.from({ length: 86 }, (_, i) => i).sort(() => r() - 0.5).slice(0, 29);
  const rojas = new Set(idx.slice(0, Math.round(29 * p)));
  const out = [];
  for (let i = 0; i < 86; i++) { const c = i % 11, f = Math.floor(i / 11), px = x + c * 76, py = y + f * 76, roja = rojas.has(i);
    out.push(<g key={i} transform={`translate(${px} ${py})`}>
      <rect x={-30} y={-30} width={60} height={60} rx={12} fill={roja ? '#ffd6d2' : '#fff4f6'} stroke={KC.ink} strokeWidth={4} />
      <path d="M -12 -18 C 14 -6 -14 6 12 18" stroke={roja ? KC.red : HILO} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}

// Barras de tiempo (minutos).
function BarrasTiempo({ T, at, until, top = 640 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const filas = [{ et: 'STAR (robot)', v: 62, c: KC.cyan, a: at }, { et: 'un cirujano', v: 26, c: KC.yellow, a: at + 0.9 }];
  return <div style={{ position:'absolute', left:80, top, width:920, zIndex:40, opacity:e.o }}>
    <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink, marginBottom:18 }}>tiempo de la operación · en los cerdos</div>
    {filas.map((f, i) => { const g = kprog(T, f.a + 0.1, f.a + 1.3, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= f.a ? 1 : 0 }}>
        <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.et}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 600 * f.v / 62 * g), height:80, background:f.c, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 76px ${KF.titulo}`, color:f.c, WebkitTextStroke:`3px ${KC.ink}` }}>{Math.round(f.v * g)} min</div>
        </div>
      </div>; })}
  </div>;
}

// Lámpara de quirófano con signo de pregunta.
function Lampara({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={-400} x2={0} y2={-150} stroke={KC.ink} strokeWidth={16} />
    <path d="M -230 -40 Q 0 -230 230 -40 Z" fill="#e8edf6" stroke={KC.ink} strokeWidth={9} />
    {[-120, 0, 120].map((lx) => <circle key={lx} cx={lx} cy={-70} r={34} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} opacity={0.75 + 0.25 * Math.sin(T * 4 + lx)} />)}
    <path d="M -200 -30 L -330 420 L 330 420 L 200 -30 Z" fill={KC.yellow} opacity=".18" />
  </g>;
}

function Cirugia() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pl: CUES.Planea, Co: CUES.Cose, E: CUES.Estudio, Pa: CUES.Parejas, P: CUES.Pregunta, F: CUES.Falla, V: CUES.Vesicula, Fa: CUES.Falta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const F2 = K.F + (K.V - K.F) * 0.57; // segunda línea de la escena Falla
  // movimiento de la aguja: cada puntada baja y sube
  const golpe = (t0, n, dt) => { const u = (T - t0) / dt; if (u < 0 || u > n) return 0; return Math.sin(Math.PI * (u % 1)); };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el intestino y la aguja desde el cuadro 0 */}
      <Escena T={T} a={K.G} b={K.Pl}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Intestino x={470} y={1000} s={1} gap={klerp(110, 0, kprog(T, K.G, K.G + 1.2, kEase.sale))} puntadas={kprog(T, K.G + 0.3, K.G + 5.0) * 7} T={T} />
          <g opacity={kprog(T, K.G + 1.6, K.G + 2.2)}><Brazo tx={klerp(240, 470, kprog(T, K.G + 1.6, K.G + 2.4, kEase.sale))} ty={910 + 30 * golpe(K.G + 2.4, 4, 0.7)} s={0.9} T={T} /></g>
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.5} until={K.G + 3.0} texto="lo cosió un cirujano" x={360} y={640} tam={46} />
      <Chip T={T} at={K.G + 2.6} until={K.Pl - 0.2} texto="cerdo vivo · Science Robotics 2022" x={470} y={1170} tam={32} borde={KC.ink} />

      {/* 1 · planea: por dentro de la máquina */}
      <Escena T={T} a={K.Pl} b={K.Co}>
        <FondoCircuito T={T} />
        {svg(<>
          <g opacity=".95">{Array.from({ length: 9 }, (_, i) => { const yy = 860 + (i - 4) * 26 * (1 + 0.06 * Math.sin(T * 1.7)), w = 360 * Math.sqrt(1 - Math.pow((i - 4) / 4.6, 2));
            return <path key={i} d={`M ${540 - 420} ${yy} Q 540 ${yy + (i - 4) * 6} ${540 + 420} ${yy}`} stroke={KC.cyan} strokeWidth={3} fill="none" opacity={0.25 + 0.5 * (w / 360)} />; })}
            {Array.from({ length: 13 }, (_, j) => { const xx = 120 + j * 70; return <path key={j} d={`M ${xx} ${860 - 105 * (1 + 0.06 * Math.sin(T * 1.7))} Q ${xx + 14} 860 ${xx} ${860 + 105 * (1 + 0.06 * Math.sin(T * 1.7))}`} stroke={KC.cyan} strokeWidth={3} fill="none" opacity=".45" />; })}
          </g>
          {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={540} cy={860 + (i - 3) * 30 * (1 + 0.06 * Math.sin(T * 1.7))} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3}
            opacity={kprog(T, K.Pl + 3.0 + i * 0.22, K.Pl + 3.2 + i * 0.22)} />)}
          <path d={`M 140 1110 ${Array.from({ length: 40 }, (_, i) => `L ${140 + i * 20} ${1110 - 30 * Math.sin(i * 0.45 - T * 3)}`).join(' ')}`} stroke={KC.mint} strokeWidth={5} fill="none" opacity={kprog(T, K.Pl + 1.6, K.Pl + 2.0)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Pl + 0.6} until={K.Co - 0.2} texto="cámara 3D" x={320} y={600} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Pl + 1.8} until={K.Co - 0.2} texto="sigue la respiración" x={540} y={1035} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.Pl + 3.2} until={K.Co - 0.2} texto="plan de puntadas" x={540} y={700} tam={32} borde={KC.yellow} />

      {/* 2 · cose: la persona aprueba, el robot cose cada 3 mm */}
      <Escena T={T} a={K.Co} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Persona x={250} y={560} s={0.85} T={T} ok={kprog(T, K.Co + 1.2, K.Co + 1.3)} />
          <Intestino x={540} y={1010} s={0.95} gap={0} puntadas={kprog(T, K.Co + 2.0, K.Co + 5.6) * 7} T={T} />
          <Brazo tx={540 + 18} ty={1010 - 100 + 26 * golpe(K.Co + 2.0, 7, 0.51)} s={0.75} T={T} />
          <g opacity={kprog(T, K.Co + 3.2, K.Co + 3.6)}>
            <line x1={640} y1={1010 - 45 * 0.95} x2={640} y2={1010 - 15 * 0.95} stroke={KC.ink} strokeWidth={0} />
            <path d={`M 610 ${1010 - 30 * 0.95} L 690 ${1010 - 30 * 0.95} M 610 ${1010} L 690 ${1010} M 680 ${1010 - 30 * 0.95} L 680 ${1010}`} stroke={KC.ink} strokeWidth={5} />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Co + 0.4} until={K.Co + 2.6} texto="una persona aprueba" x={540} y={820} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Co + 2.0} until={K.Co + 3.2} texto="y cada disparo de la aguja" x={540} y={820} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Co + 3.4} until={K.E - 0.2} texto="1 puntada cada 3 mm" x={540} y={1160} tam={40} borde={KC.yellow} />

      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Pa}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[0, 1, 2, 3].map((i) => <g key={i} opacity={kprog(T, K.E + 1.6 + i * 0.25, K.E + 1.9 + i * 0.25)}><Cerdito x={150 + i * 235} y={1010} s={0.68} T={T} fase={i} /></g>)}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Pa - 0.3} anio="2022" quien="Johns Hopkins y Children's National" revista="Saeidi, Krieger y col. · Science Robotics" y={640} />
      <Chip T={T} at={K.E + 2.9} until={K.Pa - 0.3} texto="4 cerdos · revisión a la semana" x={540} y={1160} tam={36} borde={KC.ink} />

      {/* 4 · la prueba: separación entre puntadas en intestino de práctica */}
      <Escena T={T} a={K.Pa} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <FilaPuntadas x={160} y={720} etiqueta="cirujanos expertos" gaps={[52, 96, 40, 118, 62, 34, 104, 70, 50, 88]} p={kprog(T, K.Pa + 0.5, K.Pa + 1.8)} color={KC.orange} />
          <FilaPuntadas x={160} y={1000} etiqueta="STAR" gaps={[71, 72, 71, 73, 71, 72, 72, 71, 72, 72]} p={kprog(T, K.Pa + 1.6, K.Pa + 2.9)} color={HILO} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Pa + 0.3} until={K.P - 0.2} texto="intestino de práctica (no es de animal)" x={540} y={520} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 3.0} until={K.P - 0.2} texto="variación de la separación: a mano 45 % · STAR 26 %" x={540} y={1160} tam={30} borde={KC.leaf} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.F} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<><Lampara x={300} y={560} s={0.9} T={T} />
          <text x={300} y={1150} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 980)`}>?</text></>)}
      </Escena>

      {/* 6 · todavía no: correcciones y tiempo */}
      <Escena T={T} a={K.F} b={K.V}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      {T < F2 + 0.5 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, F2 - 0.1, F2 + 0.3) }}><RejillaPuntadas p={kprog(T, K.F + 1.6, K.F + 4.2, kEase.suave)} /></div>}
      <Chip T={T} at={K.F + 0.2} until={F2 - 0.2} texto={`corregidas por una persona: ${Math.round(29 * kprog(T, K.F + 1.6, K.F + 4.2, kEase.suave))} de 86`} x={540} y={470} tam={34} borde={KC.red} />
      <BarrasTiempo T={T} at={F2 + 0.2} until={K.V - 0.2} top={620} />

      {/* 7 · 2025: el robot de las vesículas */}
      <Escena T={T} a={K.V} b={K.Fa}>
        <FondoLunares color={KC.pink} />
        {svg(<>{Array.from({ length: 8 }, (_, i) => { const t0 = K.V + 3.6 + i * 0.6, c = Math.floor(6 * kprog(T, t0, t0 + 0.4)) / 2;
          return <g key={i} opacity={kprog(T, K.V + 3.0 + i * 0.08, K.V + 3.3 + i * 0.08)}>
            <Vesicula x={150 + (i % 4) * 255} y={i < 4 ? 690 : 960} s={0.62} clips={Math.min(3, c * 2)} corte={kprog(T, t0 + 0.4, t0 + 0.55)} ok={kprog(T, t0 + 0.55, t0 + 0.8)} />
          </g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.V + 0.2} until={K.V + 2.9} anio="2025" quien="Johns Hopkins y Stanford · SRT-H" revista="Kim, Finn, Krieger y col. · Science Robotics" y={760} />
      <Chip T={T} at={K.V + 1.6} until={K.V + 2.9} texto="aprendió con ≈ 17 h de demostraciones" x={540} y={1060} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.V + 3.0} until={K.Fa - 0.2} texto="8 vesículas de cerdo · fuera del cuerpo" x={540} y={470} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.V + 4.0} until={K.V + 7.0} texto="clips + tijera, él solo" x={540} y={1160} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.V + 7.2} until={K.Fa - 0.2} texto="una persona solo recargaba los clips" x={540} y={1160} tam={32} borde={KC.yellow} />

      {/* 8 · lo que falta */}
      <Escena T={T} a={K.Fa} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <rect x={330} y={600} width={420} height={60} rx={20} fill="#c4ccd8" stroke={KC.ink} strokeWidth={7} />
          <Vesicula x={540} y={480} s={0.55} clips={3} corte={1} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Fa + 0.3} until={K.C - 0.2} texto="fuera del cuerpo (ex vivo)" x={540} y={720} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Fa + 1.8} until={K.C - 0.2} texto="falta: con sangrado ⏳" x={540} y={880} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Fa + 2.6} until={K.C - 0.2} texto="falta: tejido que se mueve ⏳" x={540} y={1010} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Fa + 3.2} until={K.C - 0.2} texto="en estos estudios: ninguna persona operada" x={540} y={1150} tam={28} borde={KC.ink} />

      {/* 9 · cierre: el mismo intestino, ahora con alguien vigilando */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Intestino x={470} y={1000} s={1} gap={0} puntadas={7} T={T} />
          <Brazo tx={470} ty={910} s={0.9} T={T} />
          <g opacity={kprog(T, K.C + 1.0, K.C + 1.6)} transform={`translate(${klerp(-200, 0, kprog(T, K.C + 1.0, K.C + 1.7, kEase.sale))} 0)`}><Persona x={180} y={500} s={0.75} T={T} pantalla="vigila" /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="robot + persona vigilando ✔" x={540} y={1160} tam={38} borde={KC.leaf} />

      <Capitulo T={T} hasta={K.C} caps={[{ at: K.Pl, titulo: 'planea' }, { at: K.Co, titulo: 'cose' }, { at: K.Pa, titulo: 'la prueba' }, { at: K.F, titulo: 'lo que falla' }, { at: K.Fa, titulo: 'lo que falta' }]} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pl - 0.1} texto="No lo cosió un cirujano: *lo cosió un robot.*" />
      <Subtitulo T={T} idx={1} at={K.Pl + 0.1} until={K.Co - 0.1} texto="Ve en 3D, sigue la respiración *y planea.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.E - 0.1} texto="Una persona aprueba; *el robot cose.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Pa - 0.1} texto="2022: *cuatro cerdos.*" />
      <Subtitulo T={T} idx={4} at={K.Pa + 0.1} until={K.P - 0.1} texto="Separación *más pareja.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.F - 0.1} texto="¿Ya te opera *un robot solo?*" />
      <Subtitulo T={T} idx={6} at={K.F + 0.1} until={F2 - 0.1} texto="Todavía no: *1 de cada 3* la corrigió una persona." />
      <Subtitulo T={T} idx={7} at={F2 + 0.1} until={K.V - 0.1} texto="Robot: *62 min.* Cirujano: *26.*" />
      <Subtitulo T={T} idx={8} at={K.V + 0.1} until={K.Fa - 0.1} texto="2025: *8 vesículas,* clips y corte él solo." />
      <Subtitulo T={T} idx={9} at={K.Fa + 0.1} until={K.C - 0.1} texto="Falta: *sangrado y movimiento.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un robot… *con alguien vigilando.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Planea + 2.2, CUES.Cose - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cose + 3.0, CUES.Estudio - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Estudio + 2.8, CUES.Parejas - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Parejas + 2.0, CUES.Pregunta - 0.15, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Falla + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Falla + 2.0, F2 - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [F2 + 1.4, CUES.Vesicula - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Vesicula + 5.5, CUES.Falta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Falta + 0.5, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="59" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CirugiaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cirugia /></CompositionStage></div>;
}
window.CirugiaApp = CirugiaApp;
