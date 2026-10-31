// Shot Científico #40 · Tus pupilas se agrandan cuando piensas fuerte — NARRADO (N5 "El experimento": Kahneman y Beatty 1966 + N1 el ojo).
// Datos: Kahneman y Beatty 1966 (Science), Joshi et al. 2016 (Neuron), Mathôt 2018 (J. Cognition), Nobel de Economía 2002. Ver guion.md y verificacion.md.
// El cambio real de la pupila es pequeño: en el dibujo está EXAGERADO (chip «dibujo exagerado»). La zona del tallo cerebral va con chip «se cree».
const IRIS = KC.teal;

// Ojo de frente (almendra). pup = radio de la pupila como fracción del iris (0.2 cerrada … 0.85 muy abierta). parp 0..1 cierra los párpados.
function OjoPupila({ x, y, s = 1, pup = 0.4, parp = 0, iris = IRIS, id = 'op', mira = 0, piel = CPIEL }) {
  const w = 250 * s, h = 150 * s, alm = `M ${x - w} ${y} Q ${x} ${y - 1.6 * h} ${x + w} ${y} Q ${x} ${y + 1.6 * h} ${x - w} ${y} Z`;
  const ix = x + mira * 0.3 * w, ri = 0.62 * h, c = parp * h * 0.85;
  return <g>
    <defs><clipPath id={`alm-${id}`}><path d={alm} /></clipPath></defs>
    <path d={alm} fill="#fff" />
    <g clipPath={`url(#alm-${id})`}>
      <circle cx={ix} cy={y} r={ri} fill={iris} stroke={KC.ink} strokeWidth={7 * s + 2} />
      {Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return <line key={i} x1={ix + Math.cos(a) * ri * 0.5} y1={y + Math.sin(a) * ri * 0.5} x2={ix + Math.cos(a) * ri * 0.92} y2={y + Math.sin(a) * ri * 0.92} stroke="rgba(0,0,0,.18)" strokeWidth={4 * s + 1} />; })}
      <circle cx={ix} cy={y} r={ri * pup} fill={KC.ink} />
      <circle cx={ix + 0.2 * h} cy={y - 0.22 * h} r={0.11 * h} fill="#fff" />
      <rect x={x - w} y={y - h} width={2 * w} height={c + 2} fill={piel} />
      <rect x={x - w} y={y + h - c} width={2 * w} height={c + 2} fill={piel} />
    </g>
    <path d={alm} fill="none" stroke={KC.ink} strokeWidth={10 * s + 4} />
    {Array.from({ length: 7 }, (_, i) => { const f = 0.2 + i * 0.1, bx = (1 - f) * (1 - f) * (x - w) + 2 * f * (1 - f) * x + f * f * (x + w), by = (1 - f) * (1 - f) * y + 2 * f * (1 - f) * (y - 1.6 * h) + f * f * y;
      return <line key={i} x1={bx} y1={by} x2={bx + (f - 0.5) * 50 * s} y2={by - 40 * s} stroke={KC.ink} strokeWidth={8 * s + 2} strokeLinecap="round" />; })}
  </g>;
}
const parpadeo = (T, t0, d = 0.26) => Math.max(0, 1 - Math.abs(T - t0) / (d / 2));

// Foco encendido con rayos FIJOS (la luz no cambia).
function Foco({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-78} x2={0} y2={-108} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${-90 + i * 26 - 1})`} />)}
    <path d="M -50 10 C -80 -30 -60 -90 0 -90 C 60 -90 80 -30 50 10 L 32 40 L -32 40 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -14 30 L -10 -20 L 0 -6 L 10 -20 L 14 30" fill="none" stroke={KC.orange} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-32} y={40} width={64} height={38} rx={8} fill="#9aa3ad" stroke={KC.ink} strokeWidth={7} />
    <line x1={-30} y1={58} x2={30} y2={58} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Engrane que gira.
function Engrane({ x, y, r = 60, n = 9, rot = 0, color = KC.gold2 }) {
  const pts = []; for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, rr = i % 2 ? r : r * 1.28; pts.push(`${(Math.cos(a - 0.12) * rr).toFixed(1)},${(Math.sin(a - 0.12) * rr).toFixed(1)}`, `${(Math.cos(a + 0.12) * rr).toFixed(1)},${(Math.sin(a + 0.12) * rr).toFixed(1)}`); }
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <polygon points={pts.join(' ')} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle r={r * 0.35} fill="#fff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cámara de video en tripié; la lente apunta a la derecha (dir = -1: a la izquierda). rec 0..1 = luz roja.
function CamaraVideo({ x, y, s = 1, dir = 1, T = 0, rec = 1, tripie = true }) {
  return <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
    {tripie && <g stroke={KC.ink} strokeWidth={12} strokeLinecap="round"><line x1={-20} y1={80} x2={-110} y2={320} /><line x1={-20} y1={80} x2={70} y2={320} /><line x1={-20} y1={80} x2={-20} y2={300} /></g>}
    <rect x={-150} y={-85} width={230} height={170} rx={26} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-118} width={80} height={40} rx={10} fill="#22252e" stroke={KC.ink} strokeWidth={7} />
    <path d="M 80 -50 L 150 -78 L 150 78 L 80 50 Z" fill="#22252e" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={150} cy={0} rx={18} ry={74} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={154} cy={-22} rx={6} ry={18} fill="#fff" opacity=".8" />
    <circle cx={-110} cy={-50} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} opacity={rec * (Math.floor(T * 2) % 2 ? 1 : 0.3)} />
    <circle cx={-35} cy={10} r={30} fill="#22252e" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Fila de números que aparecen uno por uno (dentro de svg).
function Digitos({ T, at, x, y, lista, paso = 0.42, tam = 96, sep = 100, color = KC.yellow, fuera = Infinity, dice = Infinity }) {
  const n = lista.length, x0 = x - (n - 1) * sep / 2;
  return <g>{lista.map((d, i) => { const t0 = at + i * paso, e = kprog(T, t0, t0 + 0.3, kEase.rebote);
    if (e <= 0 || T > fuera + 0.4) return null;
    const di = kprog(T, dice + i * paso, dice + i * paso + 0.25), o = 1 - kprog(T, fuera, fuera + 0.4);
    return <TextoSvg key={i} x={x0 + i * sep} y={y - di * 20} tam={tam} color={di > 0.5 ? KC.mint : color} s={klerp(0.3, 1, e)} o={o * (1 - di * 0.55)}>{d}</TextoSvg>; })}</g>;
}
// Pupila del gancho: crece un poquito con cada número que aparece.
const pupNumeros = (T, at, n, paso = 0.42, base = 0.32, dpaso = 0.055) => { let p = base; for (let i = 0; i < n; i++) p += dpaso * kprog(T, at + i * paso, at + i * paso + 0.35, kEase.suave); return p; };

// Curva de la pupila en el experimento: sube por escalones al oír cada número y baja al decirlos (forma esquemática).
const NDIG = 6;
function curvaPupila(f) {
  if (f < 0.55) { const k = f / 0.55 * NDIG, i = Math.floor(k), r = k - i; return (Math.min(i, NDIG) + Math.min(1, r * 2.2)) / NDIG; }
  const k = (f - 0.55) / 0.45 * NDIG, i = Math.floor(k), r = k - i; return 1 - (Math.min(i, NDIG) + Math.min(1, r * 2.2)) / NDIG;
}
// Medalla.
function Medalla({ x, y, r = 160, T = 0, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, p)}) rotate(${Math.sin(T * 2) * 4})`} opacity={Math.min(1, p * 2)}>
    <path d={`M ${-r * 0.7} ${-r * 1.7} L ${-r * 0.15} ${-r * 0.8} L ${r * 0.15} ${-r * 0.8} L ${r * 0.7} ${-r * 1.7} L ${r * 0.3} ${-r * 1.7} L 0 ${-r * 1.1} L ${-r * 0.3} ${-r * 1.7} Z`} fill={KC.blue} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle r={r} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={r * 0.8} fill="none" stroke={KC.gold2} strokeWidth={10} />
    <text y={-r * 0.06} textAnchor="middle" style={{ font:`400 ${r * 0.42}px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={r * 0.4} textAnchor="middle" style={{ font:`900 ${r * 0.19}px ${KF.texto}` }} fill={KC.ink}>ECONOMÍA</text>
    <path d={`M ${-r * 0.5} ${-r * 0.55} A ${r * 0.75} ${r * 0.75} 0 0 1 ${-r * 0.1} ${-r * 0.73}`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
}

function Pupila() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const DIG_G = ['7', '2', '9', '4', '1', '8'];
  // gancho
  const gEntra = kprog(T, K.Gancho - 0.3, K.Gancho + 0.35, kEase.rebote);
  const pupG = pupNumeros(T, K.Gancho + 0.4, 6, 0.42);
  // pupila: rayos de luz que entran
  const rayosP = kprog(T, K.Pupila + 1.8, K.Pupila + 2.4);
  // luz: se cierra con sol, se abre con oscuridad
  const sol = kprog(T, K.Luz + 0.2, K.Luz + 0.7, kEase.rebote), luna = kprog(T, K.Luz + 1.7, K.Luz + 2.2, kEase.rebote);
  const pupSol = klerp(0.5, 0.22, kprog(T, K.Luz + 0.6, K.Luz + 1.3, kEase.suave)), pupLuna = klerp(0.5, 0.82, kprog(T, K.Luz + 2.1, K.Luz + 2.9, kEase.suave));
  // mente
  const pupM = 0.32 + 0.3 * kprog(T, K.Mente + 1.0, K.Mente + 2.4, kEase.suave);
  // resultado
  const fR = kprog(T, K.Resultado + 0.4, K.Resultado + 6.3), vR = curvaPupila(fR);
  const G = { x0: 150, x1: 960, y0: 1040, y1: 740 };
  const ptsR = []; for (let i = 0; i <= 160; i++) { const f = i / 160; if (f > fR) break; ptsR.push(`${klerp(G.x0, G.x1, f).toFixed(1)},${klerp(G.y0 - 20, G.y1 + 10, curvaPupila(f) * 0.9 + 0.05).toFixed(1)}`); }
  const cxR = klerp(G.x0, G.x1, fR), cyR = klerp(G.y0 - 20, G.y1 + 10, vR * 0.9 + 0.05);
  // locus
  const CH = { x: 430, y: 840, s: 1.7 };
  const cp = (lx, ly) => [CH.x + lx * CH.s, CH.y + ly * CH.s];
  const SPOT = [0, 88], spotG = cp(...SPOT), ojoCab = cp(110, -30);
  const enciende = kprog(T, K.Locus + 1.4, K.Locus + 2.0), senal = kprog(T, K.Locus + 3.0, K.Locus + 3.6);
  const pupL = 0.3 + 0.32 * kprog(T, K.Locus + 3.6, K.Locus + 4.6, kEase.suave);
  // pequeño
  const pupP = 0.4 + 0.06 * (0.5 + 0.5 * Math.sin((T - K.Pequeno) * 2.4));
  // uso
  const esf = kprog(T, K.Uso + 2.2, K.Uso + 4.8, kEase.suave);
  // cierre
  const pupC = pupNumeros(T, K.Cierre + 1.4, 6, 0.42);
  const camC = kprog(T, K.Cierre + 0.2, K.Cierre + 0.8, kEase.rebote);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: aparecen números y la pupila se abre; el foco no cambia */}
      <Escena T={T} a={K.Gancho} b={K.Pupila} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Foco x={240} y={470} s={0.8} T={T} />
          <g transform={`translate(470 850) scale(${klerp(0.5, 1, gEntra)}) translate(-470 -850)`}>
            <OjoPupila x={470} y={850} s={1.3} pup={pupG} parp={parpadeo(T, K.Gancho + 0.15)} id="g" />
          </g>
          <Digitos T={T} at={K.Gancho + 0.4} x={540} y={1110} lista={DIG_G} sep={130} />
        </Lienzo>
        <Chip T={T} at={K.Gancho + 0.6} until={K.Pupila - 0.1} texto="misma luz" x={450} y={470} tam={36} borde={KC.ink} />
      </Escena>
      {/* 1 · la pupila: el hoyo por donde entra la luz */}
      <Escena T={T} a={K.Pupila} b={K.Luz} fondo={KC.mint} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <OjoPupila x={540} y={820} s={1.6} pup={0.42} parp={parpadeo(T, K.Pupila + 3.4)} id="p" />
          {rayosP > 0 && <g opacity={rayosP}>{[-1, 0, 1].map((j) => <line key={j} x1={540 + j * 300} y1={460} x2={540 + j * 20} y2={820} stroke={KC.yellow} strokeWidth={14} strokeDasharray="34 18" strokeDashoffset={-T * 120} strokeLinecap="round" />)}
            <circle cx={540} cy={820} r={0.62 * 150 * 1.6 * 0.42 + 10} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="14 10" transform={`rotate(${T * 50} 540 820)`} /></g>}
        </Lienzo>
        <Etq T={T} at={K.Pupila + 0.4} until={K.Luz - 0.2} x={590} y={1060} texto="pupila" lado="der" color={KC.texto} tam={44} />
        <Etq T={T} at={K.Pupila + 1.0} until={K.Luz - 0.2} x={830} y={640} texto="iris" lado="der" color={KC.texto} tam={40} />
        <Chip T={T} at={K.Pupila + 1.9} until={K.Luz - 0.1} texto="el hoyo por donde entra la luz" x={540} y={420} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 2 · luz: con sol se cierra, en la oscuridad se abre */}
      <Escena T={T} a={K.Luz} b={K.Mente} fondo={KC.yellow} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:540, top:0, width:540, height:KH, background:KC.noche, opacity:luna }}></div>
        <Lienzo>
          <g transform={`translate(270 580) scale(${sol})`}><SolDibujo x={0} y={0} r={80} T={T} /></g>
          <g transform={`translate(810 580) scale(${luna})`}>
            <path d="M 40 -90 A 95 95 0 1 0 60 80 A 75 75 0 1 1 40 -90 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
            {[[-160, -60], [-110, 80], [120, -40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill="#fff" opacity={0.4 + 0.6 * Math.abs(Math.sin(T * 2 + i))} />)}
          </g>
          <OjoPupila x={270} y={900} s={0.6} pup={pupSol} id="ls" />
          <g opacity={luna}><OjoPupila x={810} y={900} s={0.6} pup={pupLuna} id="ll" /></g>
          <TextoSvg x={270} y={1110} tam={66} color={KC.pink} o={kprog(T, K.Luz + 1.0, K.Luz + 1.3)} s={klerp(0.5, 1, kprog(T, K.Luz + 1.0, K.Luz + 1.4, kEase.rebote))}>SE CIERRA</TextoSvg>
          <TextoSvg x={810} y={1110} tam={66} color={KC.mint} o={kprog(T, K.Luz + 2.6, K.Luz + 2.9)} s={klerp(0.5, 1, kprog(T, K.Luz + 2.6, K.Luz + 3.0, kEase.rebote))}>SE ABRE</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 3 · mente: lo que pasa dentro de tu cabeza también la mueve */}
      <Escena T={T} a={K.Mente} b={K.Estudio} fondo={KC.lilac} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <CabezaPerfil x={360} y={960} s={1.2}>
            <g opacity={kprog(T, K.Mente + 0.3, K.Mente + 0.7)}>
              <circle cx={-10} cy={-70} r={120} fill="rgba(255,255,255,.35)" />
              <Engrane x={-40} y={-80} r={52} rot={T * 70} />
              <Engrane x={50} y={-40} r={34} n={7} rot={-T * 105 + 12} color={KC.pink} />
              <Engrane x={20} y={-140} r={26} n={6} rot={-T * 140} color={KC.cyan} />
            </g>
          </CabezaPerfil>
          <path d={`M ${360 + 130 * 1.2} ${960 - 36} Q 700 820 700 760`} fill="none" stroke={KC.ink} strokeWidth={7} strokeDasharray="16 12" opacity={kprog(T, K.Mente + 0.8, K.Mente + 1.1)} />
          <circle cx={810} cy={700} r={150} fill="#fff" stroke={KC.ink} strokeWidth={9} opacity={kprog(T, K.Mente + 0.6, K.Mente + 0.9)} />
          <g opacity={kprog(T, K.Mente + 0.6, K.Mente + 0.9)}><OjoPupila x={810} y={700} s={0.5} pup={pupM} id="m" /></g>
        </Lienzo>
        <Chip T={T} at={K.Mente + 1.2} until={K.Estudio - 0.1} texto="dentro de tu cabeza" x={540} y={420} tam={40} borde={KC.ink} />
      </Escena>
      {/* 4 · el estudio de 1966: listas de números cada vez más largas */}
      <Escena T={T} a={K.Estudio} b={K.Resultado} fondo={KC.orange} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {['4 9 1', '8 3 6 2', '5 0 7 2 9', '3 8 1 6 4 7'].map((fila, i) => { const t0 = K.Estudio + 2.4 + i * 0.9, e = kprog(T, t0, t0 + 0.35, kEase.rebote);
            return e > 0 && <g key={i} transform={`translate(540 ${860 + i * 92}) scale(${e})`}>
              <rect x={-(fila.length * 22 + 50)} y={-50} width={2 * (fila.length * 22 + 50)} height={80} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <text y={14} textAnchor="middle" style={{ font:`700 54px ${KF.mono}` }} fill={KC.ink}>{fila}</text></g>; })}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Resultado - 0.2} anio="1966" quien="Daniel Kahneman y Jackson Beatty" revista="psicólogos · memorizar números" x={540} y={600} />
      </Escena>
      {/* 5 · resultado: la pupila sube con cada número y baja al decirlos */}
      <Escena T={T} a={K.Resultado} b={K.Pregunta} fondo={KC.pink} zoom={0.02}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <rect x={100} y={690} width={900} height={420} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
          <line x1={G.x0} y1={G.y0} x2={G.x1} y2={G.y0} stroke={KC.texto} strokeWidth={5} />
          <line x1={G.x0} y1={G.y0} x2={G.x0} y2={G.y1 - 10} stroke={KC.texto} strokeWidth={5} />
          <line x1={klerp(G.x0, G.x1, 0.55)} y1={G.y1 - 10} x2={klerp(G.x0, G.x1, 0.55)} y2={G.y0} stroke="rgba(255,255,255,.35)" strokeWidth={4} strokeDasharray="12 10" />
          <text x={klerp(G.x0, G.x1, 0.27)} y={G.y0 + 38} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.yellow}>oye los números</text>
          <text x={klerp(G.x0, G.x1, 0.78)} y={G.y0 + 38} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.mint}>los dice</text>
          <text x={G.x0 + 14} y={G.y1 + 10} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>tamaño de la pupila</text>
          {ptsR.length > 1 && <polyline points={ptsR.join(' ')} fill="none" stroke={fR < 0.55 ? KC.yellow : KC.mint} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />}
          {fR > 0 && <circle cx={cxR} cy={cyR} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />}
          <circle cx={540} cy={510} r={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
          <OjoPupila x={540} y={510} s={0.52} pup={0.3 + 0.5 * vR} id="r" />
        </Lienzo>
        <Chip T={T} at={K.Resultado + 0.5} until={K.Pregunta - 0.1} texto="dibujo exagerado" x={850} y={420} tam={30} borde={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Locus} color={KC.cyan} />
      {/* 7 · por dentro: una zona pequeñita del tallo cerebral se enciende (se cree) */}
      <Escena T={T} a={K.Locus} b={K.Pequeno} fondo={KC.noche} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} corte={kprog(T, K.Locus - 0.2, K.Locus + 0.5)}>
            <path d="M -18 40 C -22 80 -14 130 -6 200 L 22 200 C 22 130 26 80 24 40 Z" fill="#f7b7c8" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Locus + 0.4, K.Locus + 0.9)} />
            {T > K.Locus + 4.4 && <g opacity={kprog(T, K.Locus + 4.4, K.Locus + 4.8)}>
              <Engrane x={-50} y={-70} r={30} rot={T * 90} /><Engrane x={10} y={-90} r={20} n={6} rot={-T * 130} color={KC.cyan} /></g>}
            <path d={`M ${SPOT[0]} ${SPOT[1]} C 60 70 90 20 110 -30`} fill="none" stroke={KC.yellow} strokeWidth={5} strokeDasharray="10 8" strokeDashoffset={-T * 50} opacity={senal} />
            <circle cx={SPOT[0]} cy={SPOT[1]} r={9 + 9 * enciende * (0.6 + 0.4 * Math.sin(T * 8))} fill={KC.cyan} opacity={enciende * 0.45} />
            <circle cx={SPOT[0]} cy={SPOT[1]} r={7} fill={enciende > 0.5 ? KC.cyan : '#c98aa0'} stroke={KC.ink} strokeWidth={3} />
          </CabezaPerfil>
          <path d={`M ${ojoCab[0] + 20} ${ojoCab[1] - 20} Q 820 720 840 650`} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="14 10" opacity={senal} />
          <g opacity={kprog(T, K.Locus + 3.2, K.Locus + 3.6)}>
            <circle cx={840} cy={520} r={130} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <OjoPupila x={840} y={520} s={0.42} pup={pupL} id="lo" />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Locus + 0.3} until={K.Pequeno - 0.1} texto="se cree" x={260} y={400} tam={44} borde={KC.gold} />
        <Etq T={T} at={K.Locus + 0.9} until={K.Pequeno - 0.2} x={spotG[0] + 40} y={1115} texto="tallo cerebral" lado="der" color="#f7b7c8" tam={36} />
        <Etq T={T} at={K.Locus + 1.6} until={K.Pequeno - 0.2} x={spotG[0] + 30} y={spotG[1]} texto="zona pequeñita" lado="der" color={KC.cyan} tam={34} />
        <Etq T={T} at={K.Locus + 4.5} until={K.Pequeno - 0.2} x={CH.x - 60} y={CH.y - 250} texto="esfuerzo mental" lado="der" color={KC.gold2} tam={34} />
      </Escena>
      {/* 8 · el cambio es pequeño, pero una cámara lo mide */}
      <Escena T={T} a={K.Pequeno} b={K.Uso} fondo={KC.mint} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <polygon points="420,800 640,700 640,940" fill="rgba(255,255,255,.45)" opacity={kprog(T, K.Pequeno + 1.6, K.Pequeno + 2.0)} />
          <CamaraVideo x={250} y={820} s={0.95} T={T} rec={kprog(T, K.Pequeno + 1.6, K.Pequeno + 1.8)} />
          <OjoPupila x={800} y={820} s={0.62} pup={pupP} id="pq" />
          {T > K.Pequeno + 2.0 && <circle cx={800} cy={820} r={0.62 * 150 * 0.62 * pupP + 8} fill="none" stroke={KC.red} strokeWidth={5} strokeDasharray="10 7" />}
          {T > K.Pequeno + 2.0 && <g stroke={KC.red} strokeWidth={4}><line x1={800} y1={720} x2={800} y2={760} /><line x1={800} y1={880} x2={800} y2={920} /><line x1={700} y1={820} x2={740} y2={820} /><line x1={860} y1={820} x2={900} y2={820} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Pequeno + 0.2} until={K.Pequeno + 1.6} texto="cambio pequeño" x={540} y={420} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Pequeno + 1.7} until={K.Uso - 0.1} texto="✓ una cámara lo mide" x={540} y={420} tam={44} borde={KC.red} />
        <Etq T={T} at={K.Pequeno + 1.8} until={K.Uso - 0.2} x={200} y={600} texto="cámara" lado="der" color={KC.ink} tam={36} />
      </Escena>
      {/* 9 · uso: científicos miden la pupila para saber cuánto esfuerzo cuesta una tarea */}
      <Escena T={T} a={K.Uso} b={K.Nobel} fondo={KC.cyan} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <BarraH x={140} y={560} ancho={800} alto={64} v={0.12 + 0.75 * esf} color={esf > 0.6 ? KC.pink : KC.yellow} etiqueta="esfuerzo" />
          <CabezaPerfil x={280} y={860} s={1.05} gesto={esf > 0.3 ? 'mueca' : 'normal'} />
          <rect x={600} y={640} width={400} height={260} rx={24} fill="#22252e" stroke={KC.ink} strokeWidth={9} />
          <rect x={620} y={660} width={360} height={220} rx={12} fill={KC.paper} />
          <text x={800} y={755} textAnchor="middle" style={{ font:`700 56px ${KF.mono}` }} fill={KC.ink}>17 × 24</text>
          <text x={800} y={835} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.pink}>= ?</text>
          <rect x={770} y={900} width={60} height={60} fill="#3a3f5c" stroke={KC.ink} strokeWidth={7} />
          <CamaraVideo x={830} y={1000} s={0.42} dir={-1} T={T} tripie={false} />
          <polygon points="755,1000 420,820 420,880" fill="rgba(255,255,255,.4)" opacity={kprog(T, K.Uso + 1.0, K.Uso + 1.4)} />
        </Lienzo>
        <Chip T={T} at={K.Uso + 0.3} until={K.Uso + 2.0} texto="científicos miden la pupila" x={540} y={420} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Uso + 1.2} until={K.Nobel - 0.2} x={740} y={1080} texto="cámara" lado="izq" color={KC.ink} tam={34} />
      </Escena>
      {/* 10 · por cierto: Kahneman, Nobel de Economía 2002 */}
      <Escena T={T} a={K.Nobel} b={K.Cierre} fondo={KC.yellow} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g opacity={kprog(T, K.Nobel + 1.0, K.Nobel + 1.4)}>
            <TextoSvg x={300} y={810} tam={72} color={KC.orange}>1966</TextoSvg>
            <FlechaRecta x1={410} y1={785} x2={650} y2={785} p={kprog(T, K.Nobel + 1.2, K.Nobel + 1.8)} color={KC.pink} />
            <TextoSvg x={780} y={810} tam={72} color={KC.gold} o={kprog(T, K.Nobel + 1.7, K.Nobel + 1.9)}>2002</TextoSvg>
          </g>
          <Medalla x={540} y={1050} r={115} T={T} p={kprog(T, K.Nobel + 1.6, K.Nobel + 2.2, kEase.rebote)} />
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Nobel + 0.2} until={K.Cierre - 0.2} anio="NOBEL" quien="Daniel Kahneman" revista="Premio Nobel de Economía 2002" x={540} y={500} />
      </Escena>
      {/* 11 · cierre: el ojo del inicio, con números; ahora una cámara lo mira */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Foco x={240} y={470} s={0.8} T={T} />
          <polygon points="290,830 560,720 560,940" fill="rgba(255,255,255,.45)" opacity={camC} />
          <g transform={`translate(${klerp(-300, 0, camC)} 0)`}><CamaraVideo x={150} y={830} s={0.8} T={T} /></g>
          <OjoPupila x={700} y={830} s={1.0} pup={pupC} parp={parpadeo(T, K.Cierre + 0.5)} id="c" />
          {T > K.Cierre + 1.0 && <circle cx={700} cy={830} r={0.62 * 150 * pupC + 10} fill="none" stroke={KC.red} strokeWidth={6} strokeDasharray="12 8" />}
          <Digitos T={T} at={K.Cierre + 1.4} x={540} y={1110} lista={DIG_G} sep={130} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 3.4} until={K.Outro - 0.1} texto="tu esfuerzo se puede medir" x={560} y={600} tam={46} borde={KC.red} />
        <Chip T={T} at={K.Cierre + 0.4} until={K.Cierre + 3.2} texto="dibujo exagerado" x={560} y={600} tam={30} borde={KC.ink} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Pupila - 0.1} texto="Piensas fuerte: tu *pupila se agranda.*" />
      <Subtitulo T={T} idx={1} at={K.Pupila + 0.1} until={K.Luz - 0.1} texto="La pupila: *por ahí entra la luz.*" />
      <Subtitulo T={T} idx={2} at={K.Luz + 0.1} until={K.Mente - 0.1} texto="Luz: se cierra. *Oscuridad: se abre.*" />
      <Subtitulo T={T} idx={3} at={K.Mente + 0.1} until={K.Estudio - 0.1} texto="También responde a *tu cabeza.*" />
      <Subtitulo T={T} idx={4} at={K.Estudio + 0.1} until={K.Resultado - 0.1} texto="1966: *memorizar números.*" />
      <Subtitulo T={T} idx={5} at={K.Resultado + 0.1} until={K.Pregunta - 0.1} texto="Más números, *más se abre.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Locus - 0.1} texto="¿Y *por qué* pasa?" />
      <Subtitulo T={T} idx={7} at={K.Locus + 0.1} until={K.Pequeno - 0.1} texto="Se cree: una zona del *tallo cerebral.*" />
      <Subtitulo T={T} idx={8} at={K.Pequeno + 0.1} until={K.Uso - 0.1} texto="Pequeño, pero *una cámara lo mide.*" />
      <Subtitulo T={T} idx={9} at={K.Uso + 0.1} until={K.Nobel - 0.1} texto="Miden la pupila para medir *el esfuerzo.*" />
      <Subtitulo T={T} idx={10} at={K.Nobel + 0.1} until={K.Cierre - 0.1} texto="Kahneman: *Nobel de Economía.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Una cámara puede *medir tu esfuerzo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Pupila - 0.3, 'avatar_11_sorprendido', 'gancho'],
        [K.Pupila + 1.0, K.Luz - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Mente + 0.3, K.Estudio - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Estudio + 3.0, K.Resultado - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Resultado + 3.2, K.Pregunta - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Locus + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Locus + 3.0, K.Pequeno - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Uso + 2.0, K.Nobel - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Nobel + 0.4, K.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.6, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="40" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function PupilaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pupila /></CompositionStage></div>;
}
window.PupilaApp = PupilaApp;
