// Shot Científico #50 · No bostezas por falta de oxígeno — NARRADO (N5 "El experimento" + N6 mito).
// Datos: Provine, Tate y Geldmacher 1987 (Behav Neural Biol); Gallup y Gallup 2007 (hipótesis del enfriamiento); Provine 2005
// (American Scientist: cambio de estado, contagio al leer). Ver guion.md y verificacion.md. Conteos y barras: ilustrativos.
const BO2 = KC.cyan, BCO2 = '#9aa3ad', BBOCA = '#5a1f22';

// Curva de un bostezo: abre ~0.7 s, se sostiene y cierra. Devuelve 0..1.
const bz = (T, t0, d = 2.4) => kprog(T, t0, t0 + 0.7, kEase.suave) * (1 - kprog(T, t0 + d - 0.6, t0 + d, kEase.suave));
// Punto a lo largo de una polilínea (f 0..1).
function bAlong(pts, f) {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let r = kclamp(f, 0, 1) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const k = r / L[i]; return [klerp(pts[i][0], pts[i + 1][0], k), klerp(pts[i][1], pts[i + 1][1], k)]; } r -= L[i]; }
  return pts[pts.length - 1];
}

// Cara de frente que bosteza. b 0..1 = qué tan abierto; dormido = ojos cerrados; mascara = color del cubrebocas de gas.
function CaraBostezo({ x = 0, y = 0, s = 1, b = 0, dormido = 0, mascara, ropa = KC.yellow, pelo = CPELO, T = 0 }) {
  const ojo = dormido ? 0 : 1 - kclamp((b - 0.25) / 0.3, 0, 1), st = 1 + 0.07 * b;
  const OJO = (sx) => ojo > 0.2
    ? <g><ellipse cx={sx * 70} cy={-30} rx={22} ry={26 * ojo} fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle cx={sx * 70 + 3} cy={-28} r={10 * Math.min(1, ojo * 1.4)} fill={KC.ink} /></g>
    : <path d={`M ${sx * 70 - 26} -30 Q ${sx * 70} ${-14 - b * 6} ${sx * 70 + 26} -30`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 330 C -230 250 -150 205 -70 200 L 70 200 C 150 205 230 250 230 330 Z" fill={ropa} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-45} y={150} width={90} height={70} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 -200) scale(1 ${st}) translate(0 200)`}>
      <circle cx={-185} cy={15} r={38} fill={CPIEL} stroke={KC.ink} strokeWidth={8} /><circle cx={185} cy={15} r={38} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
      <ellipse cx={0} cy={0} rx={185} ry={205} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
      <path d="M -186 -20 C -200 -170 -90 -225 0 -222 C 100 -225 205 -160 186 -20 C 150 -95 60 -130 -10 -118 C -80 -112 -150 -80 -186 -20 Z" fill={pelo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {OJO(-1)}{OJO(1)}
      <path d={`M -100 ${-82 - b * 18} Q -70 ${-98 - b * 22} -42 ${-84 - b * 14}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M 42 ${-84 - b * 14} Q 70 ${-98 - b * 22} 100 ${-82 - b * 18}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={-110} cy={45} rx={28} ry={16} fill={KC.pink} opacity=".35" /><ellipse cx={110} cy={45} rx={28} ry={16} fill={KC.pink} opacity=".35" />
      <path d="M 0 0 Q -14 40 2 50" stroke={CPIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />
      {b > 0.06
        ? <g><ellipse cx={0} cy={100 + b * 18} rx={36 + 26 * b} ry={8 + 78 * b} fill={BBOCA} stroke={KC.ink} strokeWidth={7} />
            {b > 0.3 && <ellipse cx={0} cy={100 + b * 18 + (8 + 78 * b) * 0.55} rx={24 + 14 * b} ry={14 * b} fill="#f07a8f" />}</g>
        : <path d={dormido ? 'M -30 104 Q 0 116 30 104' : 'M -34 100 Q 0 120 34 100'} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
      {b > 0.75 && <path d={`M 118 ${-6 + (b - 0.75) * 60} q 10 18 0 26 q -10 -8 0 -26 Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} opacity={(b - 0.75) * 4} />}
      {mascara && <g>
        <line x1={-170} y1={10} x2={-80} y2={60} stroke={KC.ink} strokeWidth={6} /><line x1={170} y1={10} x2={80} y2={60} stroke={KC.ink} strokeWidth={6} />
        <path d={`M -90 ${40} Q 0 ${10} 90 ${40} Q ${100 + b * 12} ${130 + b * 50} 0 ${160 + b * 60} Q ${-100 - b * 12} ${130 + b * 50} -90 40 Z`} fill={mascara} fillOpacity=".72" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      </g>}
    </g>
  </g>;
}
// Tanque de gas con etiqueta (O₂ / CO₂).
function Tanque({ x, y, s = 1, color = BO2, etq = 'O₂' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-170} width={140} height={340} rx={60} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-22} y={-215} width={44} height={50} rx={8} fill="#777" stroke={KC.ink} strokeWidth={7} />
    <rect x={-40} y={-235} width={80} height={26} rx={10} fill="#555" stroke={KC.ink} strokeWidth={6} />
    <rect x={-58} y={-40} width={116} height={80} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={24} textAnchor="middle" style={{ font:`400 ${etq.length > 3 ? 46 : 58}px ${KF.titulo}` }} fill={KC.ink}>{etq}</text>
  </g>;
}
// Manguera curva de (x1,y1) a (x2,y2).
function Manguera({ x1, y1, x2, y2, p = 1, color = '#e9eef3' }) {
  if (p <= 0.01) return null;
  const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2 + 120} ${x2} ${(y1 + y2) / 2 + 160} ${x2} ${y2}`;
  return <g><path d={d} fill="none" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
    <path d={d} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} /></g>;
}
// Pulmones esquemáticos con tráquea.
function PulmonesB({ x, y, s = 1, T = 0, resp = 0 }) {
  const lob = 'M -20 -150 C -90 -160 -170 -60 -170 70 C -170 160 -110 190 -40 170 C -15 160 -15 120 -15 60 Z', k = 1 + 0.04 * Math.sin(T * 3) * resp;
  return <g transform={`translate(${x} ${y}) scale(${s * k} ${s})`}>
    <rect x={-18} y={-330} width={36} height={200} rx={14} fill="#f7b7c8" stroke={KC.ink} strokeWidth={7} />
    <path d={lob} fill="#f7b7c8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={lob} fill="#f7b7c8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" transform="scale(-1 1)" />
    {[-1, 1].map((sx) => <path key={sx} d={`M 0 -140 Q ${sx * 50} -110 ${sx * 70} -50 M ${sx * 70} -50 Q ${sx * 110} 0 ${sx * 100} 60 M ${sx * 70} -50 Q ${sx * 60} 20 ${sx * 50} 90`} stroke="#c45a86" strokeWidth={8} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Partícula de gas con su fórmula.
function Gas({ x, y, tipo = 'O₂', o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}><circle r={34} fill={tipo === 'O₂' ? BO2 : BCO2} stroke={KC.ink} strokeWidth={6} />
    <text y={12} textAnchor="middle" style={{ font:`900 ${tipo === 'O₂' ? 30 : 24}px ${KF.texto}` }} fill={KC.ink}>{tipo}</text></g>;
}
// Rayitas de conteo (de 5 en 5), con etiqueta.
function Rayitas({ x, y, n = 0, etq, color = KC.ink, tam = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${tam})`}>
    {etq && <text x={0} y={-80} style={{ font:`900 40px ${KF.texto}` }} fill={color}>{etq}</text>}
    {Array.from({ length: n }, (_, i) => { const g = Math.floor(i / 5), j = i % 5;
      return j < 4 ? <line key={i} x1={g * 150 + j * 28} y1={-60} x2={g * 150 + j * 28} y2={10} stroke={color} strokeWidth={10} strokeLinecap="round" />
        : <line key={i} x1={g * 150 - 14} y1={-8} x2={g * 150 + 100} y2={-50} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />; })}
  </g>;
}
// Portapapeles del experimento con casillas que se palomean.
function Portapapeles({ x, y, T, at, filas }) {
  const e = kprog(T, at, at + 0.5, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${e}) rotate(-3)`}>
    <rect x={-290} y={-300} width={580} height={600} rx={30} fill="#a8743f" stroke={KC.ink} strokeWidth={9} />
    <rect x={-250} y={-250} width={500} height={520} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-90} y={-325} width={180} height={60} rx={16} fill="#bfc6cf" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-175} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>CONTAR BOSTEZOS</text>
    {filas.map(([txt, t], i) => { const ok = kprog(T, t, t + 0.3, kEase.rebote);
      return <g key={i} transform={`translate(-200 ${-60 + i * 120})`}>
        <rect x={0} y={-40} width={70} height={70} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
        {ok > 0 && <path d="M 10 -8 L 32 18 L 66 -36" stroke={KC.leaf} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${ok})`} />}
        <text x={100} y={14} style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>{txt}</text></g>; })}
  </g>;
}
// Interruptor despierto ⇄ dormido. pos 0 = despierto, 1 = dormido.
function Interruptor({ x, y, pos = 0, T = 0 }) {
  const kx = klerp(-150, 150, pos);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-260} y={-100} width={520} height={200} rx={100} fill={klerp(0, 1, pos) > 0.5 ? '#2b3a67' : KC.yellow} stroke={KC.ink} strokeWidth={10} />
    <circle cx={kx} cy={0} r={86} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <g transform={`translate(-200 -200) rotate(${T * 20})`} opacity={1 - pos * 0.6}>{Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-48} x2={0} y2={-70} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}<circle r={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /></g>
    <g transform="translate(200 -200)" opacity={0.4 + pos * 0.6}><path d="M 20 -45 A 48 48 0 1 0 30 40 A 38 38 0 1 1 20 -45 Z" fill="#fff3b0" stroke={KC.ink} strokeWidth={7} /></g>
    <text x={-200} y={175} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>despierto</text>
    <text x={200} y={175} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>dormido</text>
    <text x={0} y={-150} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>⇄</text>
  </g>;
}
// Libro abierto que dice «bostezo».
function Libro({ x, y, s = 1, abre = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -120 L -260 -150 L -260 110 L 0 140 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g transform={`scale(${klerp(-0.1, 1, abre)} 1)`}><path d="M 0 -120 L 260 -150 L 260 110 L 0 140 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
    <path d="M 0 -120 L 0 140" stroke={KC.ink} strokeWidth={8} />
    <text x={-130} y={-50} textAnchor="middle" transform="skewY(6)" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>bostezo</text>
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-220} y1={0 + i * 30} x2={-40} y2={18 + i * 30} stroke="#9a9a9a" strokeWidth={8} strokeLinecap="round" />)}
    {abre > 0.6 && [0, 1, 2, 3, 4].map((i) => <line key={i} x1={40} y1={-80 + i * 34} x2={220} y2={-100 + i * 34} stroke="#9a9a9a" strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// Gotas de sudor.
function Sudor({ x, y, T }) {
  return <g>{[0, 1].map((i) => { const f = (T * 0.9 + i * 0.5) % 1;
    return <path key={i} d={`M ${x + i * 70} ${y + f * 120} q 14 24 0 34 q -14 -10 0 -34 Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} opacity={1 - f} />; })}</g>;
}

function Bostezo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const CX = 330, CY = 820, CS = 1.1;          // la persona del inicio (y del cierre)
  // gancho: bosteza desde el cuadro 0; con la mascarilla de oxígeno, vuelve a bostezar
  const bGancho = Math.max(bz(T, K.Gancho - 0.5, 3.2), bz(T, K.Gancho + 4.4, 2.4));
  const masc = kprog(T, K.Gancho + 3.6, K.Gancho + 4.1, kEase.sale);
  // gases: dos voluntarios con mascarilla
  const yI = [K.Gases + 1.6, K.Gases + 3.9], yD = [K.Gases + 2.2, K.Gases + 4.4];
  const cuenta = (lst) => lst.filter((t) => T > t + 0.5).length;
  // ejercicio: un ciclo de escalón cada 2 s (dato del estudio)
  const fase = ((T - K.Ejercicio) / 2) % 1, sube = fase < 0.5 ? kEase.suave(kclamp(fase * 2.2, 0, 1)) : 1 - kEase.suave(kclamp((fase - 0.5) * 2.2, 0, 1));
  // otra hipótesis: el interruptor va a dormido y regresa a despierto
  const pos = kprog(T, K.Otra + 2.4, K.Otra + 2.9, kEase.rebote) * (1 - kprog(T, K.Otra + 4.0, K.Otra + 4.5, kEase.rebote));
  // contagio: fila de 4 que bostezan en cadena
  const fila = [0, 1, 2, 3].map((i) => bz(T, K.Contagio + 0.5 + i * 0.6, 2.0));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: alguien bosteza; ¿falta de oxígeno? → con mascarilla de oxígeno bosteza igual */}
      <Escena T={T} a={K.Gancho} b={K.Creencia}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g opacity={masc}><Tanque x={760 + (1 - masc) * 400} y={1000} s={0.85} color={BO2} etq="O₂" />
            <Manguera x1={760} y1={830} x2={CX + 10} y2={CY + 150 * CS} p={kprog(T, K.Gancho + 3.8, K.Gancho + 4.3)} /></g>
          <CaraBostezo x={CX} y={CY} s={CS} b={bGancho} mascara={masc > 0.5 ? 'rgba(160,240,220,1)' : null} T={T} />
          <Onomato T={T} at={K.Gancho + 0.1} dur={1.8} x={CX + 10} y={470} texto="¡AAAAUH!" color={KC.yellow} tam={120} rot={-6} />
          <Onomato T={T} at={K.Gancho + 4.8} dur={1.6} x={780} y={560} texto="¡AAAAUH!" color={KC.yellow} tam={120} rot={5} />
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 0.5} tacharEn={K.Gancho + 2.2} until={K.Gancho + 3.4} texto="¿falta de oxígeno?" x={CX + 20} y={1165} tam={48} />
        <Chip T={T} at={K.Gancho + 3.6} until={K.Creencia - 0.1} texto="más oxígeno…" x={780} y={720} tam={42} borde={BO2} />
        <Chip T={T} at={K.Gancho + 5.0} until={K.Creencia - 0.1} texto="…y siguen bostezando" x={540} y={330} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 1 · la creencia: meter oxígeno, sacar dióxido de carbono */}
      <Escena T={T} a={K.Creencia} b={K.Estudio} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <PulmonesB x={560} y={940} s={1.25} T={T} resp={1} />
          <CaraBostezo x={560} y={430} s={0.5} b={bz(T, K.Creencia + 0.2, 4.6)} />
          {Array.from({ length: 6 }, (_, i) => { const f = ((T - K.Creencia) * 0.35 + i / 6) % 1, p = kprog(T, K.Creencia + 0.6, K.Creencia + 1.2);
            const [px, py] = bAlong([[90, 760], [380, 520], [560, 480], [560, 760], [470, 960]], f); return <Gas key={'o' + i} x={px} y={py} tipo="O₂" o={p * Math.min(1, (1 - f) * 5)} />; })}
          {Array.from({ length: 5 }, (_, i) => { const f = ((T - K.Creencia) * 0.35 + i / 5) % 1, p = kprog(T, K.Creencia + 2.4, K.Creencia + 3.0);
            const [px, py] = bAlong([[660, 960], [560, 760], [560, 490], [760, 480], [1000, 680]], f); return <Gas key={'c' + i} x={px} y={py} tipo="CO₂" o={p * Math.min(1, (1 - f) * 5)} />; })}
        </Lienzo>
        <Chip T={T} at={K.Creencia + 0.3} until={K.Estudio - 0.1} texto="la idea vieja" x={780} y={330} tam={40} borde={KC.gold} />
        <Etq T={T} at={K.Creencia + 1.0} until={K.Estudio - 0.1} x={330} y={780} texto="meter O₂" lado="izq" color={KC.texto} tam={38} />
        <Etq T={T} at={K.Creencia + 2.6} until={K.Estudio - 0.1} x={1050} y={780} texto="sacar CO₂" lado="izq" color={KC.texto} tam={38} />
      </Escena>
      {/* 2 · el estudio de 1987 */}
      <Escena T={T} a={K.Estudio} b={K.Gases} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {T > K.Estudio + 3.2 && <Portapapeles x={400} y={800} T={T} at={K.Estudio + 3.2}
            filas={[['más O₂', K.Estudio + 4.0], ['más CO₂', K.Estudio + 4.6], ['ejercicio', K.Estudio + 5.2]]} />}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 3.1} anio="1987" quien="Robert Provine · UMBC, Maryland" revista="psicólogo · Behavioral and Neural Biology" x={540} y={760} />
      </Escena>
      {/* 3 · los gases: voluntarios con mascarilla */}
      <Escena T={T} a={K.Gases} b={K.Resultado} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Tanque x={110} y={930} s={0.6} color={BO2} etq="O₂" /><Tanque x={970} y={930} s={0.6} color={BCO2} etq="CO₂" />
          <Manguera x1={110} y1={860} x2={290} y2={830} p={kprog(T, K.Gases + 0.4, K.Gases + 0.9)} />
          <Manguera x1={970} y1={860} x2={790} y2={830} p={kprog(T, K.Gases + 0.6, K.Gases + 1.1)} />
          <CaraBostezo x={290} y={700} s={0.62} b={Math.max(...yI.map((t) => bz(T, t, 1.9)))} mascara={BO2} ropa={KC.pink} />
          <CaraBostezo x={790} y={700} s={0.62} b={Math.max(...yD.map((t) => bz(T, t, 1.9)))} mascara={BCO2} ropa={KC.orange} pelo="#6b3b1f" />
          <g opacity={kprog(T, K.Gases + 3.2, K.Gases + 3.6)}><Rayitas x={200} y={1140} n={cuenta(yI)} etq="bostezos" /><Rayitas x={700} y={1140} n={cuenta(yD)} etq="bostezos" /></g>
        </Lienzo>
        <Chip T={T} at={K.Gases + 0.3} until={K.Resultado - 0.1} texto="más O₂" x={290} y={400} tam={44} borde={BO2} />
        <Chip T={T} at={K.Gases + 1.0} until={K.Resultado - 0.1} texto="más CO₂" x={790} y={400} tam={44} borde={BCO2} />
      </Escena>
      {/* 4 · resultado: igual en las dos condiciones */}
      <Escena T={T} a={K.Resultado} b={K.Ejercicio} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {[[300, BO2, 'más O₂', 0.3], [780, BCO2, 'más CO₂', 1.0]].map(([bx, c, et, d]) => { const h = 420 * kprog(T, K.Resultado + d, K.Resultado + d + 1.2, kEase.sale);
            return <g key={et}><rect x={bx - 120} y={1020 - h} width={240} height={h} rx={18} fill={c} stroke={KC.ink} strokeWidth={8} />
              <line x1={bx - 160} y1={1020} x2={bx + 160} y2={1020} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
              <text x={bx} y={1085} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{et}</text>
              {h > 300 && <CaraBostezo x={bx} y={1020 - h - 110} s={0.36} b={bz(T, K.Resultado + d + 1.4, 2.6)} ropa={c} />}</g>; })}
          <TextoSvg x={540} y={860} tam={170} color={KC.yellow} s={klerp(0.3, 1, kprog(T, K.Resultado + 3.0, K.Resultado + 3.4, kEase.rebote))} o={kprog(T, K.Resultado + 3.0, K.Resultado + 3.2)}>=</TextoSvg>
          <text x={540} y={1135} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Resultado + 1.5, K.Resultado + 2)}>(barras ilustrativas)</text>
        </Lienzo>
        <Chip T={T} at={K.Resultado + 0.3} until={K.Resultado + 2.5} texto="más O₂: no quitó los bostezos" x={540} y={400} tam={40} borde={BO2} />
        <Chip T={T} at={K.Resultado + 3.0} until={K.Ejercicio - 0.1} texto="más CO₂: no dio más bostezos" x={540} y={400} tam={40} borde={BCO2} />
      </Escena>
      {/* 5 · ejercicio: subir y bajar un escalón */}
      <Escena T={T} a={K.Ejercicio} b={K.Pregunta} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <rect x={60} y={1070} width={960} height={30} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
          <rect x={170} y={940} width={400} height={130} rx={10} fill="#c9a06a" stroke={KC.ink} strokeWidth={9} />
          <g transform={`translate(0 ${-sube * 130})`}>
            <PersonaSimple x={370} yPies={1080} alto={560} color={KC.cyan} brazos={0.1 + 0.1 * sube} cara={T > K.Ejercicio + 2.6 && T < K.Ejercicio + 4.2 ? 'o' : 'normal'} />
            <OndasArco x={440} y={570} ang={-20} T={T * 1.6} color="#fff" largo={110} n={3} grosor={8} />
            <Sudor x={290} y={520} T={T} />
          </g>
          <Onomato T={T} at={K.Ejercicio + 0.8} dur={1.4} x={760} y={600} texto="¡UF, UF!" color={KC.yellow} tam={100} rot={-6} />
          <g opacity={kprog(T, K.Ejercicio + 2.0, K.Ejercicio + 2.4)}>
            <rect x={640} y={500} width={400} height={330} rx={26} fill="rgba(255,255,255,.88)" stroke={KC.ink} strokeWidth={7} />
            <Rayitas x={680} y={640} n={2} etq="sin ejercicio" tam={0.8} />
            <Rayitas x={680} y={790} n={T > K.Ejercicio + 3.0 ? 2 : 1} etq="con ejercicio" tam={0.8} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Ejercicio + 0.3} until={K.Ejercicio + 2.8} texto="respira más rápido" x={760} y={400} tam={42} borde={KC.cyan} />
        <Chip T={T} at={K.Ejercicio + 3.3} until={K.Pregunta - 0.1} texto="bostezos: igual" x={760} y={400} tam={44} borde={KC.yellow} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Hipotesis} />
      {/* 7 · hipótesis 1: enfriar el cerebro (por dentro) */}
      <Escena T={T} a={K.Hipotesis} b={K.Otra} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <CabezaPerfil x={420} y={830} s={1.35} boca={bz(T, K.Hipotesis + 1.8, 2.6)} corte={1} />
          <g opacity={kprog(T, K.Hipotesis + 2.6, K.Hipotesis + 3.2)}>
            <ellipse cx={420 + 0} cy={830 - 70 * 1.35} rx={130} ry={95} fill={KC.cyan} opacity={0.25 + 0.1 * Math.sin(T * 5)} />
          </g>
          <OndasArco x={760} y={1000} ang={190} T={T} color={KC.cyan} largo={200} o={kprog(T, K.Hipotesis + 2.0, K.Hipotesis + 2.5) * (1 - kprog(T, K.Otra - 0.6, K.Otra - 0.2))} />
        </Lienzo>
        <div style={{ opacity:kprog(T, K.Hipotesis + 2.4, K.Hipotesis + 2.9) }}>
          <Termometro x={930} y={560} alto={420} valor={klerp(80, 35, kprog(T, K.Hipotesis + 2.8, K.Hipotesis + 4.2, kEase.sale))} marcas={[]} color={klerp(0, 1, kprog(T, K.Hipotesis + 2.8, K.Hipotesis + 4.2)) > 0.5 ? KC.cyan : KC.red} />
        </div>
        <Chip T={T} at={K.Hipotesis + 0.2} until={K.Hipotesis + 2.1} texto="nadie lo sabe con certeza" x={540} y={400} tam={42} borde={KC.gold} />
        <Chip T={T} at={K.Hipotesis + 2.2} until={K.Otra - 0.1} texto="hipótesis" x={540} y={400} tam={44} borde={KC.lilac} />
        <Etq T={T} at={K.Hipotesis + 3.0} until={K.Otra - 0.2} x={130} y={470} texto="¿enfriar el cerebro?" lado="der" color={KC.cyan} tam={34} />
      </Escena>
      {/* 8 · hipótesis 2: cambiar de estado */}
      <Escena T={T} a={K.Otra} b={K.Contagio} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Interruptor x={620} y={760} pos={pos} T={T} />
          <CaraBostezo x={620} y={1060} s={0.42} b={Math.max(bz(T, K.Otra + 1.6, 1.6), bz(T, K.Otra + 3.4, 1.4))} dormido={pos > 0.5 ? 1 : 0} ropa={KC.lilac} />
          {pos > 0.5 && <TextoSvg x={760} y={1010} tam={64} color="#fff" rot={-8} o={pos}>Zzz</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Otra + 0.3} until={K.Contagio - 0.1} texto="hipótesis" x={720} y={400} tam={44} borde={KC.lilac} />
      </Escena>
      {/* 9 · el bostezo se contagia */}
      <Escena T={T} a={K.Contagio} b={K.Cierre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {fila.map((b, i) => <CaraBostezo key={i} x={150 + i * 260} y={770} s={0.46} b={b} ropa={[KC.yellow, KC.cyan, KC.mint, KC.orange][i]} pelo={i % 2 ? '#6b3b1f' : CPELO} />)}
          {[0, 1, 2].map((i) => <FlechaRecta key={i} x1={215 + i * 260} y1={640} x2={330 + i * 260} y2={640} p={kprog(T, K.Contagio + 0.8 + i * 0.6, K.Contagio + 1.1 + i * 0.6, kEase.sale)} color={KC.yellow} grosor={10} punta={24} />)}
          <g opacity={kprog(T, K.Contagio + 3.0, K.Contagio + 3.4)}>
            <Libro x={330} y={1050} s={0.62} abre={kprog(T, K.Contagio + 3.0, K.Contagio + 3.7, kEase.sale)} />
            <CaraBostezo x={800} y={1000} s={0.42} b={bz(T, K.Contagio + 4.4, 1.5)} ropa={KC.pink} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Contagio + 0.3} until={K.Cierre - 0.1} texto="se contagia" x={300} y={400} tam={46} borde={KC.yellow} />
      </Escena>
      {/* 10 · cierre: la misma persona; ¿contagio o sueño? oxígeno no */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CaraBostezo x={CX} y={CY} s={CS} b={bz(T, K.Cierre + 0.2, 2.6)} T={T} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.2} until={K.Outro - 0.1} texto="¿ya bostezaste?" x={540} y={400} tam={46} borde={KC.gold} />
        <Chip T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} texto="¿el contagio?" x={830} y={640} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Cierre + 2.0} until={K.Outro - 0.1} texto="¿el sueño?" x={830} y={780} tam={40} borde={KC.lilac} />
        <MitoTachado T={T} at={K.Cierre + 2.8} tacharEn={K.Cierre + 3.5} until={K.Outro - 0.1} texto="falta de oxígeno" x={790} y={950} tam={38} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Creencia - 0.1} texto="No es falta de *oxígeno.*" />
      <Subtitulo T={T} idx={1} at={K.Creencia + 0.1} until={K.Estudio - 0.1} texto="Idea vieja: *meter oxígeno.*" />
      <Subtitulo T={T} idx={2} at={K.Estudio + 0.1} until={K.Gases - 0.1} texto="1987: *Provine* lo probó." />
      <Subtitulo T={T} idx={3} at={K.Gases + 0.1} until={K.Resultado - 0.1} texto="Más O₂ o más CO₂: *a contar.*" />
      <Subtitulo T={T} idx={4} at={K.Resultado + 0.1} until={K.Ejercicio - 0.1} texto="Resultado: *bostezaron igual.*" />
      <Subtitulo T={T} idx={5} at={K.Ejercicio + 0.1} until={K.Pregunta - 0.1} texto="Ejercicio: *tampoco cambió.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Hipotesis - 0.1} texto="¿Entonces *para qué?*" />
      <Subtitulo T={T} idx={7} at={K.Hipotesis + 0.1} until={K.Otra - 0.1} texto="Hipótesis: *enfriar el cerebro.*" />
      <Subtitulo T={T} idx={8} at={K.Otra + 0.1} until={K.Contagio - 0.1} texto="Otra: *cambiar de estado.*" />
      <Subtitulo T={T} idx={9} at={K.Contagio + 0.1} until={K.Cierre - 0.1} texto="El bostezo *se contagia.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Contagio o sueño, *no oxígeno.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Creencia + 1.0, K.Estudio - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Estudio + 3.4, K.Gases - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Resultado + 0.5, K.Ejercicio - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Hipotesis - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Otra + 0.5, K.Contagio - 0.2, 'avatar_03_aburrido_manos_mejillas', 'izq-alto'],
        [K.Contagio + 3.4, K.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="50" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function BostezoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Bostezo /></CompositionStage></div>;
}
window.BostezoApp = BostezoApp;
