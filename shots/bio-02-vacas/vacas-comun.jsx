// Biotecnológico #02 · Las vacas viven de microbios — dibujos compartidos (narrada y muda).
// Mundo "rumen": vaca de perfil, estómago de 4 cámaras (rayos X) y el interior del rumen al microscopio.
// Fuentes y guion: guion.md. Dibujo esquemático (tamaños relativos aproximados).

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const PASTO = '#3fbf4a', PASTO2 = '#2a9a3c', FIBRA = '#9ccf5a';

// Vaca holstein de perfil, mirando a la derecha. Origen = centro del cuerpo. Mide ~760 px de ancho con s = 1.
// mastica: fase (radianes) de la mandíbula; cola: fase; brillo: 0..1 la panza brilla (por dentro).
function Vaca({ T = 0, x = 0, y = 0, s = 1, mastica = 0, cola, brillo = 0, eructo = 0, cabezaAbajo = 0 }) {
  const mand = Math.max(0, Math.sin(mastica)) * 10, c = cola == null ? Math.sin(T * 1.7) * 12 : cola;
  const ch = cabezaAbajo * 70;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* cola */}
    <g transform={`translate(-300 -90) rotate(${c})`}><path d="M 0 0 C -40 40 -50 120 -40 190" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" /><ellipse cx={-40} cy={200} rx={16} ry={28} fill={KC.ink} /></g>
    {/* patas */}
    {[[-230, 0], [-150, 1], [150, 0], [230, 1]].map(([px, k], i) => <g key={i} transform={`rotate(${Math.sin(T * 0.8 + i) * 1.2} ${px} 60)`}>
      <rect x={px - 26} y={40} width={52} height={210} rx={20} fill={i % 2 ? '#f4efe4' : '#fff'} stroke={KC.ink} strokeWidth={8} /><rect x={px - 28} y={226} width={56} height={34} rx={10} fill="#3a2b22" stroke={KC.ink} strokeWidth={6} />
    </g>)}
    {/* ubre */}
    <path d="M -60 120 Q 0 190 60 120 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    {/* cuerpo */}
    <rect x={-320} y={-170} width={600} height={320} rx={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    {brillo > 0 && <ellipse cx={-60} cy={10} rx={230} ry={130} fill={KC.yellow} opacity={0.35 * brillo} />}
    <path d="M -250 -150 C -200 -110 -150 -140 -130 -90 C -110 -40 -190 -20 -230 -60 C -270 -100 -290 -130 -250 -150 Z" fill={KC.ink} />
    <path d="M 20 -168 C 70 -120 140 -150 150 -100 C 160 -40 70 -40 40 -80 C 20 -110 0 -150 20 -168 Z" fill={KC.ink} />
    <path d="M -120 60 C -80 30 -20 50 -30 100 C -40 140 -110 130 -130 100 Z" fill={KC.ink} />
    <path d="M 160 40 C 200 20 250 40 240 90 C 220 120 170 110 160 80 Z" fill={KC.ink} />
    {/* cabeza */}
    <g transform={`translate(300 ${-110 + ch}) rotate(${cabezaAbajo * 28 + mece(T, 5, 0.25) * 2})`}>
      <path d="M -20 -40 L -60 -66 L -40 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 10 -76 q 10 -30 30 -36" stroke="#e8d9b0" strokeWidth={12} fill="none" strokeLinecap="round" />
      <rect x={-30} y={-80} width={170} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={9} />
      <path d="M 40 -80 C 70 -60 60 -20 30 -30 C 10 -40 10 -70 40 -80 Z" fill={KC.ink} />
      <circle cx={70} cy={-20} r={12} fill={KC.ink} /><circle cx={74} cy={-24} r={4} fill="#fff" />
      {/* hocico y mandíbula que mastica */}
      <rect x={70} y={10} width={110} height={60} rx={28} fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
      <circle cx={150} cy={34} r={6} fill={KC.ink} /><circle cx={124} cy={34} r={6} fill={KC.ink} />
      <g transform={`translate(0 ${mand})`}><rect x={84} y={62} width={90} height={26} rx={13} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} /></g>
      {eructo > 0 && <g opacity={1 - kprog(eructo, 0.7, 1)} transform={`translate(${200 + eructo * 120} ${30 - eructo * 140}) scale(${0.4 + eructo})`}>
        {[[0, 0, 50], [50, -20, 40], [30, 30, 36], [-30, 20, 34]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#d8f0c0" stroke={KC.ink} strokeWidth={5} />)}
        <text x={10} y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CH₄</text>
      </g>}
    </g>
  </g>;
}

// Pastizal brillante de fondo (cielo cian, sol, nubes y pasto que se mece).
function Pastizal({ T, horizonte = 1350 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff 0%, #00d2ff 65%, #7fe0c8 100%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={900} cy={420} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      {[[200, 470, 80], [430, 380, 56]].map(([x, y, r], i) => <g key={i} transform={`translate(${mece(T, i + 4, 0.05) * 30} 0)`}><ellipse cx={x} cy={y} rx={r * 1.5} ry={r * 0.6} fill="#fff" stroke={KC.ink} strokeWidth={6} /></g>)}
      <rect x={0} y={horizonte} width={KW} height={KH - horizonte} fill={PASTO} />
      <path d={`M0 ${horizonte} Q 270 ${horizonte - 30} 540 ${horizonte} T 1080 ${horizonte}`} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M ${20 + i * 50} ${horizonte + 120 + (i % 3) * 40} l ${8 + mece(T, i, 0.4) * 6} -34 l ${8 - mece(T, i, 0.4) * 6} 34`} stroke={PASTO2} strokeWidth={6} fill="none" />)}
    </svg>
  </>;
}

// Estómago de 4 cámaras (para la Lupa de rayos X). Cuadro de 2r × 2r. El rumen es la bolsa grande.
function Estomago({ T, r, fermenta = 1 }) {
  const D = r * 2, g = krng(77);
  const mic = Array.from({ length: 46 }, () => [g(), g(), g()]);
  return <svg width={D} height={D}>
    <g transform={`translate(${r} ${r}) scale(${r / 250})`}>
      {/* rumen */}
      <path d="M -210 -40 C -230 -170 -60 -200 30 -150 C 120 -110 100 20 40 80 C 0 150 -150 170 -200 90 C -230 50 -205 0 -210 -40 Z" fill="#d97a7a" stroke="#fff" strokeWidth={8} />
      <path d="M -190 -30 C -200 -140 -60 -170 20 -130 C 100 -95 85 15 30 70 C -5 130 -140 145 -180 80 Z" fill="#3b1d24" />
      {/* líquido con fibras y microbios */}
      {mic.map(([a, b, c], i) => { const x = -170 + a * 220 + Math.sin(T * 1.2 + i) * 8, y = -110 + b * 220 + Math.cos(T * 1.0 + i) * 8;
        return c < 0.35 ? <rect key={i} x={x} y={y} width={26} height={7} rx={3} fill={FIBRA} transform={`rotate(${i * 37} ${x} ${y})`} />
          : <circle key={i} cx={x} cy={y} r={c < 0.75 ? 4 : 6} fill={c < 0.75 ? KC.mint : KC.lilac} opacity={0.6 + 0.4 * fermenta} />; })}
      {/* burbujas */}
      {Array.from({ length: 8 }, (_, i) => { const f = ((T * 0.35 + i / 8) % 1); return <circle key={'b' + i} cx={-140 + i * 26} cy={60 - f * 170} r={5 + (i % 3) * 3} fill="none" stroke="#ffe7a8" strokeWidth={3} opacity={(1 - f) * fermenta} />; })}
      {/* retículo, omaso y abomaso */}
      <ellipse cx={110} cy={-40} rx={60} ry={52} fill="#c96a6a" stroke="#fff" strokeWidth={7} />
      <ellipse cx={150} cy={50} rx={52} ry={44} fill="#b45c6a" stroke="#fff" strokeWidth={7} />
      <path d="M 120 100 C 160 150 240 140 240 80 C 240 40 200 40 190 70" fill="#e39a9a" stroke="#fff" strokeWidth={7} />
      <path d="M 240 80 C 250 150 200 210 120 220" stroke="#e39a9a" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M 30 -210 C 40 -180 70 -140 100 -90" stroke="#e39a9a" strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>
  </svg>;
}

/* ---------- interior del rumen (microscopio, fondo oscuro) ---------- */
// Pedazo de pasto con fibras de celulosa (rayitas). romper: 0..1 se parte en trozos.
function Fibra({ x, y, rot = 0, largo = 300, romper = 0, T = 0, seed = 1 }) {
  const n = 4, w = largo / n;
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.15) * 3})`}>
    {Array.from({ length: n }, (_, i) => { const sep = romper * (i - 1.5) * 40, rr = romper * (i % 2 ? 14 : -14);
      return <g key={i} transform={`translate(${-largo / 2 + i * w + sep} ${romper * (i % 2 ? 18 : -10)}) rotate(${rr})`}>
        <rect x={0} y={-34} width={w - 4} height={68} rx={14} fill={FIBRA} stroke={KC.ink} strokeWidth={6} />
        {[0, 1, 2].map((k) => <line key={k} x1={8} x2={w - 12} y1={-16 + k * 16} y2={-16 + k * 16} stroke="#5d8f2a" strokeWidth={4} />)}
      </g>; })}
  </g>;
}
// Hongo del rumen (anaerobio): esporangio redondo con rizoides que se meten a la fibra.
function HongoRumen({ x, y, s = 1, crece = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -20, 10, 40].map((dx, i) => <path key={i} d={`M 0 0 C ${dx * 0.4} 30, ${dx} 50, ${dx * 1.2} ${70 * crece}`} stroke="#f4c25a" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <ellipse cx={0} cy={-34} rx={30} ry={38} fill="#f4c25a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-8} cy={-46} rx={9} ry={12} fill="#fff" opacity=".4" />
  </g>;
}
// Protozoario ciliado (grande): óvalo con cilios que se mueven y partículas comidas.
function Ciliado({ x, y, s = 1, T = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2, w = Math.sin(T * 9 + i * 0.8) * 6;
      return <line key={i} x1={Math.cos(a) * 92} y1={Math.sin(a) * 60} x2={Math.cos(a) * (108 + w)} y2={Math.sin(a) * (74 + w)} stroke="#c9a6ff" strokeWidth={4} strokeLinecap="round" />; })}
    <ellipse rx={95} ry={62} fill="#b18cff" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-20} cy={-6} rx={30} ry={16} fill="#7b52d6" />
    {[[30, 10], [50, -20], [10, 30]].map(([a, b], i) => <rect key={i} x={a} y={b} width={22} height={7} rx={3} fill={FIBRA} transform={`rotate(${i * 50} ${a} ${b})`} />)}
  </g>;
}
// Arquea metanógena: pequeña, morada, soltando burbujitas de metano.
function Arquea({ x, y, s = 1, T = 0, seed = 1, metano = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {metano > 0 && [0, 1, 2].map((i) => { const f = ((T * 0.6 + i / 3 + seed * 0.1) % 1); return <circle key={i} cx={20 + f * 30} cy={-20 - f * 90} r={6 + f * 6} fill="none" stroke="#d8f0c0" strokeWidth={3} opacity={(1 - f) * metano} />; })}
    <rect x={-28} y={-14} width={56} height={28} rx={14} fill="#8b4dff" stroke={KC.ink} strokeWidth={5} transform={`rotate(${mece(T, seed, 0.4) * 20})`} />
  </g>;
}
// Ácido graso volátil: bolita con una cadena corta (2, 3 o 4 carbonos = acetato, propionato, butirato).
function AGV({ x, y, tipo = 0, s = 1, rot = 0 }) {
  const n = 2 + tipo, col = [KC.yellow, KC.orange, KC.coral][tipo];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'} ${i * 22} ${i % 2 ? -12 : 0}`).join(' ')} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={i * 22} cy={i % 2 ? -12 : 0} r={9} fill={col} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={(n - 1) * 22 + 20} cy={(n - 1) % 2 ? -12 : 0} r={11} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Interior del rumen. fase: 0 sólo fibra · 1 llegan los microbios · romper (0..1) · agv (0..1) cuánto ácido sale.
function MundoRumen({ T, microbios = 1, romper = 0, agv = 0, conteo = true }) {
  const g = krng(12), bac = Array.from({ length: 16 }, () => [80 + g() * 920, 420 + g() * 760, g() * 360, g()]);
  const ag = Array.from({ length: 22 }, () => [g(), g(), Math.floor(g() * 3)]);
  return <>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #3b1d24 0%, #1a0d12 70%)' }}></div>
    <Ambiente T={T} n={30} seed={21} color="rgba(255,231,168,.25)" tam={[3, 9]} vel={14} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <Fibra x={540} y={780} rot={-12} largo={560} romper={romper} T={T} seed={1} />
      <Fibra x={330} y={1080} rot={18} largo={380} romper={romper * 0.8} T={T} seed={2} />
      <Fibra x={820} y={1120} rot={-30} largo={300} romper={romper * 0.9} T={T} seed={3} />
      {microbios > 0 && <g opacity={kclamp(microbios * 1.5, 0, 1)}>
        <HongoRumen x={500} y={740} s={1.1} crece={kclamp(microbios, 0, 1)} T={T} />
        <HongoRumen x={360} y={1050} s={0.8} crece={kclamp(microbios, 0, 1)} T={T} />
        {bac.map(([x, y, r, k], i) => kclamp(microbios * 16 - i, 0, 1) > 0 && (k < 0.7
          ? <Bacteria key={i} T={T} x={x + mece(T, i, 0.2) * 20} y={y + mece(T, i + 9, 0.2) * 14} largo={70} ancho={30} rot={r + T * 10} color={KC.mint} seed={i} flagelo={k < 0.3} nucleoide={false} opacidad={kclamp(microbios * 16 - i, 0, 1)} />
          : <circle key={i} cx={x + mece(T, i, 0.2) * 16} cy={y} r={16} fill="#7fd8ff" stroke={KC.ink} strokeWidth={5} opacity={kclamp(microbios * 16 - i, 0, 1)} />))}
        <Ciliado x={780} y={560} s={0.9} T={T} rot={mece(T, 2, 0.1) * 20} />
        <Arquea x={240} y={600} T={T} seed={1} /><Arquea x={880} y={900} T={T} seed={2} s={0.9} />
      </g>}
      {agv > 0 && ag.map(([a, b, tipo], i) => { const f = ((T * 0.18 + a) % 1); const vis = kclamp(agv * 22 - i, 0, 1);
        return vis > 0 && <AGV key={'a' + i} x={100 + b * 880} y={1250 - f * 850} tipo={tipo} s={0.9} rot={T * 30 + i * 40} />; })}
    </svg>
  </>;
}

Object.assign(window, { SOMBRA, AVS, PASTO, PASTO2, FIBRA, Vaca, Pastizal, Estomago, Fibra, HongoRumen, Ciliado, Arquea, AGV, MundoRumen });
