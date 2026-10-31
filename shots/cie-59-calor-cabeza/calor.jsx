// Shot Científico #59 · No pierdes casi todo tu calor por la cabeza — NARRADO (N6 mito + N5 "El experimento").
// Datos: Vreeman y Carroll 2008 (BMJ), Pretorius et al. 2006 (J Appl Physiol), manual del Ejército de EE. UU. Ver guion.md y verificacion.md.
const CFRIO = '#2d2370', CCAL = '#ffd23f', CCAL2 = '#ff4d1f';

// Persona de frente, de cuerpo completo. (x, yPies) = pies. ropa: 'chamarra' | 'traje' | 'bano'.
// termico 1 = vista de cámara térmica (lo tapado sale frío, lo destapado brilla). chimenea 0..1 = chimenea en la cabeza; humo 0..1.
function Persona({ x, yPies, s = 1, T = 0, ropa = 'chamarra', gorro = 0, bufanda = 0, guantes = 0, termico = 0, chimenea = 0, humo = 1,
  tiembla = 0, cara = 'normal', color = KC.pink, id = 'p' }) {
  const bano = ropa === 'bano', traje = ropa === 'traje';
  const desnudo = { cabeza: true, cuello: !traje && !bufanda, manos: !traje && !guantes, brazos: bano, torso: bano, piernas: bano, pies: bano };
  const base = {
    cabeza: CPIEL, cuello: CPIEL, manos: traje ? '#3a3f5c' : guantes ? KC.cyan : CPIEL,
    brazos: bano ? CPIEL : traje ? KC.orange : color, torso: bano ? CPIEL : traje ? KC.orange : color,
    piernas: bano ? CPIEL : traje ? KC.orange : '#3a3f5c', pies: bano ? CPIEL : '#3a2a20',
  };
  const col = (r) => (termico ? (desnudo[r] ? CCAL : CFRIO) : base[r]);
  const dx = tiembla * Math.sin(T * 63) * 5;
  const tr = termico ? '#ff8a3d' : KC.ink;
  // piezas del cuerpo como funciones de color, para dibujarlas dos veces en la vista térmica (resplandor + cuerpo)
  const piezas = [
    ['piernas', (f, st, w) => <g><rect x={-70} y={-215} width={58} height={205} rx={24} fill={f} stroke={st} strokeWidth={w} /><rect x={12} y={-215} width={58} height={205} rx={24} fill={f} stroke={st} strokeWidth={w} /></g>],
    ['pies', (f, st, w) => <g><ellipse cx={-46} cy={-8} rx={44} ry={20} fill={f} stroke={st} strokeWidth={w} /><ellipse cx={46} cy={-8} rx={44} ry={20} fill={f} stroke={st} strokeWidth={w} /></g>],
    ['brazos', (f, st, w) => <g><rect x={-138} y={-432} width={46} height={215} rx={23} fill={f} stroke={st} strokeWidth={w} transform="rotate(10 -115 -425)" />
      <rect x={92} y={-432} width={46} height={215} rx={23} fill={f} stroke={st} strokeWidth={w} transform="rotate(-10 115 -425)" /></g>],
    ['manos', (f, st, w) => <g><circle cx={-78} cy={-205} r={29} fill={f} stroke={st} strokeWidth={w} /><circle cx={78} cy={-205} r={29} fill={f} stroke={st} strokeWidth={w} /></g>],
    ['torso', (f, st, w) => <rect x={-96} y={-448} width={192} height={258} rx={50} fill={f} stroke={st} strokeWidth={w} />],
    ['cuello', (f, st, w) => <rect x={-24} y={-478} width={48} height={42} fill={f} stroke={st} strokeWidth={w} />],
    ['cabeza', (f, st, w) => <g><circle cx={-68} cy={-525} r={16} fill={f} stroke={st} strokeWidth={w} /><circle cx={68} cy={-525} r={16} fill={f} stroke={st} strokeWidth={w} />
      <ellipse cx={0} cy={-532} rx={68} ry={76} fill={f} stroke={st} strokeWidth={w} /></g>],
  ];
  return <g transform={`translate(${x + dx} ${yPies}) scale(${s})`}>
    {termico > 0 && <g opacity={termico}>
      <defs><filter id={`brilla-${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={22} /></filter></defs>
      <g filter={`url(#brilla-${id})`}>{piezas.filter(([r]) => desnudo[r]).map(([r, d]) => <g key={r}>{d(CCAL2, CCAL2, 50)}</g>)}</g>
    </g>}
    {piezas.map(([r, d]) => <g key={r}>{d(col(r), termico ? (desnudo[r] ? '#ff8a3d' : '#5a4bc0') : KC.ink, 8)}</g>)}
    {/* detalles de ropa */}
    {!termico && traje && <g>
      <line x1={0} y1={-440} x2={0} y2={-200} stroke={KC.ink} strokeWidth={5} />
      {[-41, 41].map((xx) => <rect key={xx} x={xx - 29} y={-120} width={58} height={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
      <rect x={-96} y={-330} width={192} height={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
      <rect x={-52} y={-482} width={104} height={40} rx={18} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
    </g>}
    {termico > 0 && traje && <rect x={-52} y={-482} width={104} height={40} rx={18} fill={CFRIO} stroke="#5a4bc0" strokeWidth={7} />}
    {!termico && ropa === 'chamarra' && <g>
      <line x1={0} y1={-440} x2={0} y2={-196} stroke={KC.ink} strokeWidth={5} />
      {[-380, -320, -260].map((yy) => <path key={yy} d={`M -94 ${yy} Q 0 ${yy + 14} 94 ${yy}`} fill="none" stroke={KC.ink} strokeWidth={4} opacity=".5" />)}
    </g>}
    {!termico && bano && <rect x={-98} y={-238} width={196} height={78} rx={22} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />}
    {termico > 0 && bano && <rect x={-98} y={-238} width={196} height={78} rx={22} fill={CFRIO} stroke="#5a4bc0" strokeWidth={7} />}
    {bufanda > 0 && <g opacity={bufanda} transform={`translate(0 ${(1 - bufanda) * -40})`}>
      <rect x={-56} y={-482} width={112} height={44} rx={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
      <rect x={24} y={-452} width={40} height={130} rx={12} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
      {[-410, -370].map((yy) => <line key={yy} x1={26} y1={yy} x2={62} y2={yy} stroke={KC.red} strokeWidth={8} />)}
    </g>}
    {/* pelo y cara */}
    {!termico && <path d="M -68 -540 C -74 -620 -20 -618 0 -612 C 30 -620 76 -610 68 -540 C 50 -578 20 -580 0 -575 C -30 -580 -55 -575 -68 -540 Z" fill={CPELO} stroke={KC.ink} strokeWidth={6} />}
    <g opacity={termico ? 0.45 : 1}>
      <circle cx={-24} cy={-530} r={7} fill={KC.ink} /><circle cx={24} cy={-530} r={7} fill={KC.ink} />
      {cara === 'frio' ? <path d={`M -24 -496 l 8 -6 l 8 6 l 8 -6 l 8 6 l 8 -6 l 8 6`} transform={`translate(0 ${Math.sin(T * 50) * 2})`} fill="none" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        : cara === 'sonrie' ? <path d="M -24 -502 Q 0 -480 24 -502" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
          : <path d="M -18 -496 L 18 -496" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
      {!termico && cara === 'frio' && <><ellipse cx={-40} cy={-508} rx={14} ry={8} fill="#8fd3ff" opacity=".8" /><ellipse cx={40} cy={-508} rx={14} ry={8} fill="#8fd3ff" opacity=".8" /></>}
    </g>
    {gorro > 0 && <g transform={`translate(0 ${(1 - gorro) * -420})`} opacity={Math.min(1, gorro * 3)}>
      <path d="M -74 -560 C -76 -650 76 -650 74 -560 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      <rect x={-80} y={-578} width={160} height={36} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-648} r={22} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    </g>}
    {chimenea > 0.01 && <Chimenea T={T} p={chimenea} humo={humo} />}
  </g>;
}
// Chimenea de ladrillo sobre la cabeza (dentro de Persona: coordenadas locales). humo 0..1.
function Chimenea({ T, p = 1, humo = 1 }) {
  const h = 110 * p, top = -598 - h;
  return <g>
    <rect x={-34} y={top} width={68} height={h} fill="#c8553d" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: Math.floor(h / 26) }, (_, i) => <line key={i} x1={-34} y1={top + 26 * (i + 1)} x2={34} y2={top + 26 * (i + 1)} stroke={KC.ink} strokeWidth={3} opacity=".6" />)}
    <rect x={-44} y={top - 18} width={88} height={22} rx={4} fill="#a8432f" stroke={KC.ink} strokeWidth={7} />
    {humo > 0.01 && Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.55 + i / 6) % 1);
      return <circle key={i} cx={Math.sin(f * 4 + i) * 26 + f * 70} cy={top - 30 - f * 330} r={22 + f * 62} fill="#eef0f6" stroke={KC.ink} strokeWidth={6} opacity={humo * (1 - f) * 0.95} />; })}
  </g>;
}
// Copos de nieve que caen (dentro de svg).
function Nieve({ T, n = 70, seed = 3, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x0 = g() * KW, y0 = g() * KH, v = 60 + g() * 90, r = 4 + g() * 7;
    return <circle key={i} cx={x0 + Math.sin(T * 0.9 + i) * 22} cy={((y0 + T * v) % (KH + 40)) - 20} r={r} fill="#fff" opacity=".9" />; })}</g>;
}
function SueloNieve({ y = 1470 }) {
  return <path d={`M -20 ${y} Q 260 ${y - 60} 540 ${y - 10} T 1100 ${y - 30} L 1100 1940 L -20 1940 Z`} fill="#f4f8ff" stroke={KC.ink} strokeWidth={9} />;
}
// Ondas de calor que suben (líneas onduladas).
function OndasCalor({ T, x, y, n = 3, ancho = 110, alto = 220, color = '#ff8a3d', o = 1, sep = 46 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = ((T * 0.8 + i / n) % 1), xx = x + (i - (n - 1) / 2) * sep;
    const d = `M ${xx} ${y - f * alto} q 14 -20 0 -40 q -14 -20 0 -40 q 14 -20 0 -40`;
    return <path key={i} d={d} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" opacity={Math.sin(f * Math.PI)} />; })}</g>;
}
// Sello que cae con golpe (dentro de svg).
function Sello({ T, at, x, y, texto, color = KC.red, rot = -12, tam = 120 }) {
  if (T < at) return null;
  const p = kprog(T, at, at + 0.25, kEase.sale), s = klerp(2.4, 1, p);
  const w = texto.length * tam * 0.48 + 70;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={p}>
    <rect x={-w / 2} y={-tam * 0.78} width={w} height={tam * 1.2} rx={18} fill="rgba(255,255,255,.88)" stroke={color} strokeWidth={12} />
    <text x={0} y={tam * 0.3} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}
// Carpeta de archivo (dentro de svg).
function Carpeta({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -360 -260 L -360 280 L 360 280 L 360 -230 L -60 -230 L -100 -290 L -330 -290 Q -360 -290 -360 -260 Z" fill="#c99a4b" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g transform={`rotate(${-abre * 8} -340 280)`}>
      <rect x={-330} y={-200} width={640} height={460} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-280} y={40 + i * 50} width={i === 3 ? 300 : 540} height={14} rx={7} fill="#cfc6b6" />)}
      <g transform="translate(-150 -60) scale(0.32)"><Persona x={0} yPies={240} ropa="traje" /></g>
      {[60, 150, 240].map((xx) => <rect key={xx} x={xx - 60} y={-170} width={120} height={14} rx={7} fill="#cfc6b6" />)}
    </g>
    <path d={`M -360 -120 L 360 -120 L 360 280 L -360 280 Z`} fill="#e0b25e" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round"
      transform={`translate(0 ${abre * 330}) `} opacity={1 - abre * 0.2} />
  </g>;
}
// Página del manual con la cifra del mito (dentro de svg). num 0..1 aparece la cifra; tacha 0..1 la raya roja.
function Manual({ x, y, s = 1, rot = -3, num = 1, tacha = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-330} y={-400} width={660} height={800} rx={14} fill="#a9b18a" stroke={KC.ink} strokeWidth={10} transform="translate(18 18)" />
    <rect x={-330} y={-400} width={660} height={800} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    <rect x={-330} y={-400} width={660} height={120} rx={14} fill="#6b7a3f" stroke={KC.ink} strokeWidth={10} />
    <text x={0} y={-322} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.paper}>MANUAL DEL EJÉRCITO</text>
    {[0, 1, 2].map((i) => <rect key={i} x={-270} y={-230 + i * 44} width={i === 2 ? 320 : 540} height={16} rx={8} fill="#cfc6b6" />)}
    <text x={0} y={-60} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>por la cabeza se va</text>
    <g transform={`translate(0 120) scale(${klerp(0.4, 1, num)})`} opacity={num}>
      <text x={0} y={0} textAnchor="middle" style={{ font:`400 128px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">40–45 %</text>
    </g>
    {[0, 1].map((i) => <rect key={i} x={-270} y={230 + i * 44} width={i === 1 ? 260 : 540} height={16} rx={8} fill="#cfc6b6" />)}
    {tacha > 0 && <line x1={-290} y1={110} x2={klerp(-290, 290, tacha)} y2={klerp(110, 30, tacha)} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" opacity=".9" />}
    {tacha > 0 && <line x1={-290} y1={110} x2={klerp(-290, 290, tacha)} y2={klerp(110, 30, tacha)} stroke={KC.red} strokeWidth={20} strokeLinecap="round" />}
  </g>;
}
// Lupa de mano (dibujo, dentro de svg).
function LupaMano({ x, y, s = 1, rot = 30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-22} y={110} width={44} height={170} rx={18} fill="#7a4a22" stroke={KC.ink} strokeWidth={9} />
    <circle r={120} fill="rgba(180,230,255,.35)" stroke={KC.ink} strokeWidth={26} /><circle r={120} fill="none" stroke="#cfd6e0" strokeWidth={12} />
    <path d="M -70 -40 Q -60 -80 -20 -90" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Tarjeta de prenda (Gorro, bufanda, guantes, chamarra) con palomita.
function Prenda({ T, at, x, y, tipo, texto }) {
  const e = kprog(T, at, at + 0.45, kEase.rebote), ok = kprog(T, at + 0.5, at + 0.8, kEase.rebote);
  if (T < at) return null;
  const dib = {
    gorro: <g transform="translate(0 40)"><path d="M -110 0 C -114 -150 114 -150 110 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} /><rect x={-120} y={-20} width={240} height={50} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={9} /><circle cx={0} cy={-120} r={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} /></g>,
    bufanda: <g><rect x={-130} y={-60} width={260} height={60} rx={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} /><rect x={30} y={-20} width={60} height={150} rx={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} />{[50, 95].map((yy) => <line key={yy} x1={34} y1={yy} x2={86} y2={yy} stroke={KC.red} strokeWidth={10} />)}</g>,
    guantes: <g>{[-70, 70].map((xx) => <g key={xx} transform={`translate(${xx} 0) scale(${xx < 0 ? -1 : 1} 1)`}><rect x={-45} y={-50} width={90} height={110} rx={40} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} /><rect x={30} y={-30} width={40} height={60} rx={20} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} transform="rotate(-30 40 0)" /><rect x={-45} y={50} width={90} height={40} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={8} /></g>)}</g>,
    chamarra: <g><rect x={-100} y={-100} width={200} height={210} rx={40} fill={KC.pink} stroke={KC.ink} strokeWidth={9} /><rect x={-160} y={-90} width={60} height={180} rx={28} fill={KC.pink} stroke={KC.ink} strokeWidth={9} transform="rotate(10 -130 -90)" /><rect x={100} y={-90} width={60} height={180} rx={28} fill={KC.pink} stroke={KC.ink} strokeWidth={9} transform="rotate(-10 130 -90)" /><line x1={0} y1={-100} x2={0} y2={110} stroke={KC.ink} strokeWidth={6} /></g>,
  }[tipo];
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, e)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-210} y={-170} width={420} height={330} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <g transform="translate(0 -20) scale(0.85)">{dib}</g>
    <text x={0} y={135} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    <g transform={`translate(170 -140) scale(${ok})`}><circle r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} /><path d="M -20 0 L -5 16 L 22 -16" fill="none" stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g>
  </g>;
}
// Barra de 10 bloques = tu piel; el primero se llena hasta 0.7 (≈ 7 %).
function BloquesPiel({ T, at, x, y }) {
  const lleno = kprog(T, at + 0.8, at + 2.0, kEase.sale);
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 10 }, (_, i) => { const e = kprog(T, at + i * 0.06, at + 0.3 + i * 0.06, kEase.rebote);
      return <g key={i} transform={`translate(0 ${i * 74}) scale(${e})`}><rect x={-80} y={0} width={160} height={64} rx={12} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
        {i === 0 && <rect x={-80} y={0} width={160 * 0.7 * lleno} height={64} rx={12} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />}</g>; })}
    <text x={0} y={-24} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>tu piel</text>
    <path d={`M 100 0 L 120 0 L 120 64 L 100 64`} fill="none" stroke={KC.ink} strokeWidth={6} opacity={lleno} />
    <text x={134} y={46} style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink} opacity={lleno}>1/10</text>
  </g>;
}

function CalorCabeza() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const nieve = <><Nieve T={T} /></>;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cabeza-chimenea en la nieve */}
      <Escena T={T} a={K.Gancho} b={K.Ejercito} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SueloNieve />
          <Persona x={320} yPies={1560} s={1.25} T={T} chimenea={kprog(T, 0, 0.5, kEase.rebote)} tiembla={0.6} cara="frio" id="g" />
          {nieve}
          <Sello T={T} at={K.Gancho + 0.7} x={330} y={470} texto="¿MITO?" tam={130} />
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 1.8} tacharEn={K.Gancho + 3.6} until={K.Ejercito - 0.2} texto="casi todo tu calor por la cabeza" x={540} y={1090} tam={38} />
      </Escena>
      {/* 1 · viejas pruebas militares (se cree) */}
      <Escena T={T} a={K.Ejercito} b={K.Trajes} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Ejercito - 0.2, K.Ejercito + 0.4, kEase.rebote)) * 900})`}>
            <Carpeta x={540} y={830} s={1.05} abre={kprog(T, K.Ejercito + 0.8, K.Ejercito + 1.5, kEase.sale)} />
          </g>
          <TextoSvg x={540} y={1110} tam={56} color={KC.paper} o={kprog(T, K.Ejercito + 0.5, K.Ejercito + 0.8)}>VIEJAS PRUEBAS MILITARES</TextoSvg>
          <Sello T={T} at={K.Ejercito + 1.7} x={790} y={600} texto="EE. UU." tam={90} rot={10} color={KC.blue} />
        </Lienzo>
        <Chip T={T} at={K.Ejercito + 0.3} until={K.Trajes - 0.1} texto="se cree" x={300} y={440} tam={46} borde={KC.pink} />
      </Escena>
      {/* 2 · voluntarios con traje y la cabeza destapada */}
      <Escena T={T} a={K.Trajes} b={K.Claro} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <SueloNieve y={1480} />
          {[200, 540, 880].map((xx, i) => <g key={xx} transform={`translate(0 ${(1 - kprog(T, K.Trajes + i * 0.25, K.Trajes + 0.5 + i * 0.25, kEase.rebote)) * 900})`}>
            <Persona x={xx} yPies={1540} s={0.95} T={T + i} ropa="traje" tiembla={0.5} cara="frio" id={'t' + i} /></g>)}
          {[200, 540, 880].map((xx, i) => <ellipse key={i} cx={xx} cy={1540 - 532 * 0.95} rx={88} ry={96} fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="18 12" strokeDashoffset={-T * 40} opacity={kprog(T, K.Trajes + 3.3 + i * 0.15, K.Trajes + 3.7 + i * 0.15)} />)}
          <Nieve T={T} n={90} seed={7} />
        </Lienzo>
        <Chip T={T} at={K.Trajes + 0.4} until={K.Claro - 0.1} texto="mucho frío" x={540} y={440} tam={46} borde={KC.cyan} />
        <Chip T={T} at={K.Trajes + 1.8} until={K.Claro - 0.1} texto="traje que cubre todo" x={540} y={540} tam={40} borde={KC.orange} />
        <Etq T={T} at={K.Trajes + 3.4} until={K.Claro - 0.2} x={612} y={905} texto="cabeza destapada" lado="der" color={KC.yellow} />
      </Escena>
      {/* 3 · cámara térmica: solo brilla la cabeza */}
      <Escena T={T} a={K.Claro} b={K.Manual} fondo={KC.noche} zoom={0.08}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <Persona x={400} yPies={1560} s={1.25} T={T} ropa="traje" termico={kprog(T, K.Claro + 0.2, K.Claro + 1.0)} id="c" />
          <OndasCalor T={T} x={400} y={1560 - 640 * 1.25} n={3} o={kprog(T, K.Claro + 1.0, K.Claro + 1.6)} />
          {/* visor */}
          {[[80, 380, 1, 1], [1000, 380, -1, 1], [80, 1480, 1, -1], [1000, 1480, -1, -1]].map(([x, y, sx, sy], i) =>
            <path key={i} d={`M ${x} ${y + sy * 90} L ${x} ${y} L ${x + sx * 90} ${y}`} fill="none" stroke="#fff" strokeWidth={8} opacity=".8" />)}
          <circle cx={130} cy={440} r={14} fill={KC.red} opacity={0.5 + 0.5 * Math.sin(T * 6)} />
          <text x={156} y={452} style={{ font:`700 34px ${KF.mono}` }} fill="#fff">CÁMARA TÉRMICA</text>
          <defs><linearGradient id="escTerm" x1="0" x2="1"><stop offset="0" stopColor={CFRIO} /><stop offset=".5" stopColor="#c0307a" /><stop offset=".8" stopColor={CCAL2} /><stop offset="1" stopColor={CCAL} /></linearGradient></defs>
          <rect x={190} y={1440} width={700} height={36} rx={18} fill="url(#escTerm)" stroke="#fff" strokeWidth={4} />
          <text x={170} y={1470} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">frío</text>
          <text x={910} y={1470} style={{ font:`700 30px ${KF.mono}` }} fill="#fff">calor</text>
        </Lienzo>
        <Etq T={T} at={K.Claro + 1.4} until={K.Manual - 0.2} x={510} y={890} texto="lo único descubierto" lado="der" color={CCAL} />
      </Escena>
      {/* 4 · el manual: la cifra del mito */}
      <Escena T={T} a={K.Manual} b={K.Pregunta} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g transform={`translate(${(1 - kprog(T, K.Manual - 0.2, K.Manual + 0.5, kEase.rebote)) * -900} 0)`}>
            <Manual x={540} y={810} s={1.05} num={kprog(T, K.Manual + 2.6, K.Manual + 3.1, kEase.rebote)} />
          </g>
          <Sello T={T} at={K.Manual + 4.2} x={880} y={1000} texto="¿?" tam={150} rot={14} />
        </Lienzo>
        <Chip T={T} at={K.Manual + 4.6} until={K.Pregunta - 0.1} texto="el dato del mito" x={540} y={300} tam={44} borde={KC.red} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Estudio} color={KC.orange} />
      {/* 6 · el estudio: BMJ 2008 */}
      <Escena T={T} a={K.Estudio} b={K.Proporcion} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g opacity={kprog(T, K.Estudio + 1.6, K.Estudio + 2.0)}>
            <Manual x={400} y={1030} s={0.42} rot={4} tacha={kprog(T, K.Estudio + 3.4, K.Estudio + 3.9, kEase.sale)} />
            <LupaMano x={klerp(560, 470, 0.5 + 0.5 * Math.sin(T * 1.8))} y={1000 + Math.sin(T * 2.3) * 20} s={0.8} rot={-30} />
          </g>
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Proporcion - 0.2} anio="2008" quien="Vreeman y Carroll" revista="BMJ" x={540} y={560} />
      </Escena>
      {/* 7 · la cabeza ≈ 7 % de la piel */}
      <Escena T={T} a={K.Proporcion} b={K.Bano} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Persona x={320} yPies={1500} s={1.2} T={T} ropa="bano" id="pr" />
          <g opacity={kprog(T, K.Proporcion + 0.8, K.Proporcion + 1.2)}>
            <ellipse cx={320} cy={1500 - 530 * 1.2} rx={110} ry={120} fill="none" stroke={KC.gold} strokeWidth={14} strokeDasharray="22 14" strokeDashoffset={-T * 40} />
          </g>
          <BloquesPiel T={T} at={K.Proporcion + 1.4} x={760} y={520} />
        </Lienzo>
        <Chip T={T} at={K.Proporcion + 0.8} until={K.Bano - 0.1} texto="≈ 7 % de la piel" x={330} y={440} tam={44} borde={KC.gold} />
      </Escena>
      {/* 8 · en traje de baño: por la cabeza ≤ 10 % */}
      <Escena T={T} a={K.Bano} b={K.Cara} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SueloNieve y={1490} />
          <g transform={`translate(0 ${(1 - kprog(T, K.Bano - 0.1, K.Bano + 0.5, kEase.rebote)) * 900})`}>
            <Persona x={760} yPies={1560} s={1.15} T={T} ropa="bano" tiembla={1} cara="frio" id="b" /></g>
          {[[-90, -330], [90, -330], [0, -250], [-40, -120], [40, -120]].map(([dx, dy], i) => <OndasCalor key={i} T={T + i * 0.3} x={760 + dx * 1.15} y={1560 + dy * 1.15} n={1} alto={160} o={kprog(T, K.Bano + 1.0, K.Bano + 1.6) * 0.9} />)}
          <OndasCalor T={T} x={760} y={1560 - 640 * 1.15} n={1} alto={160} color={KC.red} o={kprog(T, K.Bano + 1.0, K.Bano + 1.6)} />
          <Nieve T={T} n={60} seed={11} />
        </Lienzo>
        <Etq T={T} at={K.Bano + 0.8} until={K.Cara - 0.2} x={640} y={420} texto="traje de baño" lado="izq" color={KC.texto} />
        <NumeroGigante T={T} at={K.Bano + 3.4} until={K.Cara - 0.15} valor={10} desde={10} prefijo="≤ " sufijo=" %" etiqueta="por la cabeza" x={370} y={700} tam={190} />
      </Escena>
      {/* 9 · la cara siente mucho el frío */}
      <Escena T={T} a={K.Cara} b={K.Gorro} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform={`translate(${Math.sin(T * 60) * 4} 0)`}><CabezaPerfil x={560} y={820} s={1.5} gesto="mueca" boca={0.3 + 0.3 * Math.abs(Math.sin(T * 25))} /></g>
          <ellipse cx={560 + 150 * 1.5} cy={820 + 40 * 1.5} rx={30} ry={18} fill="#8fd3ff" opacity=".85" />
          {Array.from({ length: 4 }, (_, i) => { const f = ((T * 0.9 + i / 4) % 1); const xx = klerp(1120, 900, f), yy = 620 + i * 90;
            return <path key={i} d={`M ${xx} ${yy} q -60 -24 -120 0 q -60 24 -120 0`} fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={Math.sin(f * Math.PI)} />; })}
          <Onomato T={T} at={K.Cara + 0.4} dur={2.2} x={760} y={450} texto="¡BRRR!" color={KC.cyan} tam={120} />
        </Lienzo>
        <Chip T={T} at={K.Cara + 0.8} until={K.Gorro - 0.1} texto="la cara siente mucho el frío" x={540} y={1085} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 10 · todas las prendas ayudan */}
      <Escena T={T} a={K.Gorro} b={K.Cierre} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Prenda T={T} at={K.Gorro + 0.2} x={300} y={640} tipo="gorro" texto="gorro" />
          <Prenda T={T} at={K.Gorro + 1.6} x={780} y={640} tipo="bufanda" texto="bufanda" />
          <Prenda T={T} at={K.Gorro + 2.0} x={300} y={1010} tipo="guantes" texto="guantes" />
          <Prenda T={T} at={K.Gorro + 2.4} x={780} y={1010} tipo="chamarra" texto="chamarra" />
        </Lienzo>
        <Chip T={T} at={K.Gorro + 2.9} until={K.Cierre - 0.1} texto="todas ayudan" x={540} y={420} tam={46} borde={KC.leaf} />
      </Escena>
      {/* 11 · cierre: la misma persona; la chimenea se apaga */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SueloNieve />
          <Persona x={320} yPies={1560} s={1.25} T={T} chimenea={1 - kprog(T, K.Cierre + 1.2, K.Cierre + 2.0, kEase.suave)} humo={1 - kprog(T, K.Cierre + 0.3, K.Cierre + 1.2)}
            gorro={kprog(T, K.Cierre + 2.0, K.Cierre + 2.6, kEase.rebote)} bufanda={1} guantes={1} cara={T > K.Cierre + 2.6 ? 'sonrie' : 'frio'} tiembla={1 - kprog(T, K.Cierre + 2.4, K.Cierre + 2.8)} id="f" />
          <Nieve T={T} />
          <Sello T={T} at={K.Cierre + 3.0} x={760} y={1000} texto="MITO" tam={120} rot={-10} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.4} until={K.Outro - 0.1} texto="como cualquier parte destapada" x={540} y={440} tam={38} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Ejercito - 0.1} texto="Calor por la cabeza: *es un mito.*" />
      <Subtitulo T={T} idx={1} at={K.Ejercito + 0.1} until={K.Trajes - 0.1} texto="Se cree: *viejas pruebas militares.*" />
      <Subtitulo T={T} idx={2} at={K.Trajes + 0.1} until={K.Claro - 0.1} texto="Trajes completos, *cabeza destapada.*" />
      <Subtitulo T={T} idx={3} at={K.Claro + 0.1} until={K.Manual - 0.1} texto="Lo único descubierto: *la cabeza.*" />
      <Subtitulo T={T} idx={4} at={K.Manual + 0.1} until={K.Pregunta - 0.1} texto="El manual: *40–45 %* por la cabeza." />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Estudio - 0.1} texto="¿Cuánto se pierde *de verdad?*" />
      <Subtitulo T={T} idx={6} at={K.Estudio + 0.1} until={K.Proporcion - 0.1} texto="2008: *Vreeman y Carroll,* BMJ." />
      <Subtitulo T={T} idx={7} at={K.Proporcion + 0.1} until={K.Bano - 0.1} texto="Menos de *una décima* de tu piel." />
      <Subtitulo T={T} idx={8} at={K.Bano + 0.1} until={K.Cara - 0.1} texto="En traje de baño: *10 % cuando mucho.*" />
      <Subtitulo T={T} idx={9} at={K.Cara + 0.1} until={K.Gorro - 0.1} texto="La cara *siente mucho el frío.*" />
      <Subtitulo T={T} idx={10} at={K.Gorro + 0.1} until={K.Cierre - 0.1} texto="El gorro ayuda, *como cualquier prenda.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu cabeza *no es una chimenea.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Ejercito + 0.3, K.Trajes - 0.3, 'avatar_07_pensativo_puno', 'bajo-der'],
        [K.Claro + 0.4, K.Manual - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Manual + 1.6, K.Pregunta - 0.15, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Pregunta + 0.05, K.Estudio + 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [K.Estudio + 2.6, K.Proporcion - 0.15, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Bano + 1.0, K.Cara - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cara + 0.3, K.Gorro - 0.1, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_04_bajando_lentes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="59" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function CalorCabezaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CalorCabeza /></CompositionStage></div>;
}
window.CalorCabezaApp = CalorCabezaApp;
