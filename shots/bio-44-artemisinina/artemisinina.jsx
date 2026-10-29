// Shot Biotecnológico #44 · La medicina contra la malaria que también empieza en una levadura — NARRADO (N1 por dentro + remate N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (la molécula, la planta y las células no están a escala).
const VERDE = '#3d9a4a', VERDE2 = '#2c7a38', SECO = '#b58a4a', SANGRE = '#d7263d', PARASITO = '#7b4fd0', CALDO = '#f2d58a';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Artemisia annua: tallo recto con ramas alternas; hojas muy divididas (pinnadas, de lóbulos finos) y cabezuelas amarillas diminutas arriba.
function Artemisia({ T, x, y, s = 1, seco = 0, crece = 1, seed = 3, flores = true }) {
  const R = krng(seed), alto = 620 * crece, c = mixHex(VERDE, SECO, seco), c2 = mixHex(VERDE2, '#8a6a36', seco);
  const ramas = [];
  for (let i = 0; i < 11; i++) {
    const u = (i + 1) / 12, yy = -alto * u, lado = i % 2 ? 1 : -1, largo = (230 - 150 * u) * crece * (0.85 + R() * 0.3);
    const ang = lado * (58 - 25 * u) + mece(T, seed + i, 0.35) * 6;
    ramas.push({ yy, lado, largo, ang, i });
  }
  const hoja = (L, k) => { const lob = []; for (let j = 1; j <= 6; j++) { const t = j / 7, l = (1 - t * 0.6) * L * 0.32;
      lob.push(<g key={j} transform={`translate(${t * L} 0)`}>
        <path d={`M 0 0 q ${l * 0.4} ${-l * 0.6} ${l * 0.9} ${-l}`} stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d={`M 0 0 q ${l * 0.4} ${l * 0.6} ${l * 0.9} ${l}`} stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d={`M ${l * 0.45} ${-l * 0.55} l ${l * 0.35} ${-l * 0.05} M ${l * 0.45} ${l * 0.55} l ${l * 0.35} ${l * 0.05}`} stroke={c} strokeWidth={4} strokeLinecap="round" />
      </g>); }
    return <g key={k}><path d={`M 0 0 L ${L} 0`} stroke={c2} strokeWidth={6} strokeLinecap="round" />{lob}</g>; };
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.25) * 2})`}>
    <path d={`M 0 0 Q ${8 + mece(T, seed, 0.3) * 6} ${-alto / 2} 0 ${-alto}`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q ${8 + mece(T, seed, 0.3) * 6} ${-alto / 2} 0 ${-alto}`} stroke={c2} strokeWidth={9} fill="none" strokeLinecap="round" />
    {ramas.map((r) => <g key={r.i} transform={`translate(0 ${r.yy}) rotate(${-90 + r.ang})`}>{hoja(r.largo, r.i)}</g>)}
    {flores && crece > 0.7 && Array.from({ length: 16 }, (_, i) => { const g = krng(seed * 7 + i); const fx = (g() - 0.5) * 160, fy = -alto * (0.82 + g() * 0.2);
      return <circle key={i} cx={fx} cy={fy} r={7} fill={mixHex('#ffd43b', '#c9a25a', seco)} stroke={KC.ink} strokeWidth={2.5} />; })}
  </g>;
}

// Caja de medicina (esquemática) con blíster que sale.
function Caja({ x, y, s = 1, abre = 1, etiqueta = 'artemisinina' }) {
  const fl = abre * 70;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(0 ${-110 * abre})`}>
      <rect x={-130} y={-200} width={260} height={150} rx={14} fill="#e9eef3" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2, 3].map((k) => <g key={k}><ellipse cx={-80 + k * 54} cy={-150} rx={20} ry={14} fill="#fff" stroke="#9aa4ae" strokeWidth={4} />
        <ellipse cx={-80 + k * 54} cy={-150} rx={12} ry={8} fill={KC.yellow} /></g>)}
      {[0, 1, 2, 3].map((k) => <g key={'b' + k}><ellipse cx={-80 + k * 54} cy={-98} rx={20} ry={14} fill="#fff" stroke="#9aa4ae" strokeWidth={4} />
        <ellipse cx={-80 + k * 54} cy={-98} rx={12} ry={8} fill={KC.yellow} /></g>)}
    </g>
    <rect x={-160} y={-80} width={320} height={210} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={9} />
    <path d={`M -160 -80 L -160 ${-80 - fl} L 160 ${-80 - fl * 0.4} L 160 -80`} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-160} y={-20} width={320} height={56} fill={KC.mint} />
    <text x={0} y={18} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
    <text x={0} y={90} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">contra la malaria</text>
  </g>;
}

// Mosquito Anopheles: en reposo inclina el cuerpo (cabeza abajo, abdomen arriba); alas con manchas.
function Mosquito({ T, x, y, s = 1, pica = 0 }) {
  const ala = Math.sin(T * 60) * (1 - pica) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-38})`}>
    {[[-30, 1], [0, 1], [30, 1]].map(([dx], i) => <g key={i}>
      <path d={`M ${dx} 6 l ${-30 - i * 10} 60 l -20 60`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M ${dx} 6 l ${30 + i * 8} 60 l 18 62`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>)}
    <g transform={`rotate(${-20 + ala} -10 -6)`}><ellipse cx={-50} cy={-46} rx={95} ry={26} fill="rgba(220,235,255,.75)" stroke={KC.ink} strokeWidth={4} transform="rotate(-25 -50 -46)" />
      {[0, 1, 2].map((k) => <circle key={k} cx={-90 + k * 36} cy={-30 - k * 16} r={7} fill="#3a3a3a" />)}</g>
    <ellipse cx={-120} cy={0} rx={110} ry={20} fill="#6b5a46" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={-190 + k * 38} y1={-16} x2={-196 + k * 38} y2={16} stroke="#3d3226" strokeWidth={5} />)}
    <ellipse cx={20} cy={0} rx={42} ry={30} fill="#7a6650" stroke={KC.ink} strokeWidth={6} />
    <circle cx={74} cy={4} r={22} fill="#5a4a3a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={82} cy={-4} r={8} fill="#1b1b1b" />
    <path d={`M 94 10 L ${190 + pica * 20} 30`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <path d="M 92 -4 L 160 -26 M 92 6 L 162 14" stroke={KC.ink} strokeWidth={3} strokeLinecap="round" />
  </g>;
}

// Glóbulo rojo bicóncavo; con parásito en etapa de anillo (anillito con su punto de cromatina).
function Globulo({ x, y, s = 1, rot = 0, parasito = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={78} ry={74} fill={SANGRE} stroke={KC.ink} strokeWidth={5} />
    <ellipse rx={38} ry={34} fill="#a81a2e" opacity=".75" />
    {parasito > 0 && <g opacity={parasito} transform={`translate(18 -14) scale(${0.4 + 0.6 * parasito})`}>
      <circle r={22} fill="none" stroke={PARASITO} strokeWidth={7} /><circle cx={16} cy={-14} r={8} fill="#2a1060" /></g>}
  </g>;
}

// Artemisinina (esquema): tres anillos fusionados y el puente O–O (endoperóxido) resaltado. puente 0..1.
function Artemisinina({ x, y, s = 1, rot = 0, puente = 1, brillo = 0, color = KC.yellow }) {
  const hex = (cx, cy) => [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(cx + 52 * Math.cos(a)).toFixed(1)},${(cy + 52 * Math.sin(a)).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle r={190} fill={KC.gold2} opacity={0.35 * brillo} />}
    <polygon points={hex(-90, 0)} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <polygon points={hex(0, 0)} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <polygon points={hex(45, 78)} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 90 78 l 40 22" stroke={KC.ink} strokeWidth={7} /><circle cx={140} cy={104} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    {puente > 0 && <g opacity={puente}>
      <path d={`M -10 -52 Q 10 ${-130 - 10 * puente} 40 -28`} stroke={KC.red} strokeWidth={10} fill="none" />
      <circle cx={-4} cy={-104} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cx={34} cy={-98} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <text x={-4} y={-96} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill="#fff">O</text>
      <text x={34} y={-90} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill="#fff">O</text>
    </g>}
  </g>;
}

// Libro antiguo cosido (encuadernación de hilo), con columnas verticales de texto esquemáticas.
function LibroAntiguo({ x, y, s = 1, abre = 1 }) {
  const w = 240 * abre;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-w - 6} y={-170} width={w + 6} height={340} fill="#e8d6a8" stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={-170} width={246} height={340} fill="#efdfb4" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 6 }, (_, i) => <g key={i}>
      {Array.from({ length: 9 }, (_, j) => <rect key={j} x={200 - i * 36} y={-140 + j * 32} width={18} height={20} rx={3} fill="#3a2a1a" opacity={0.75} />)}
      {abre > 0.6 && Array.from({ length: 9 }, (_, j) => <rect key={'L' + j} x={-40 - i * 36} y={-140 + j * 32} width={18} height={20} rx={3} fill="#3a2a1a" opacity={0.75 * kclamp((abre - 0.6) / 0.4, 0, 1)} />)}
    </g>)}
    <rect x={-46} y={-140} width={24} height={110} fill={KC.red} opacity={abre > 0.6 ? 0.85 : 0} />
    {[-130, -40, 50, 140].map((yy) => <line key={yy} x1={0} y1={yy} x2={0} y2={yy} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />)}
  </g>;
}

function Olla({ T, x, y, hierve = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hierve > 0 && [-50, 0, 50].map((dx, i) => <path key={i} d={`M ${dx} 150 q -18 -40 0 -70 q 18 30 0 70`} fill={i === 1 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={4} transform={`scale(1 ${1 + Math.sin(T * 14 + i) * 0.12})`} style={{ transformOrigin:`${dx}px 150px` }} />)}
    <path d="M -150 -40 L -130 90 Q 0 120 130 90 L 150 -40 Z" fill="#7d8791" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-40} rx={150} ry={34} fill={hierve ? '#bfe8ff' : '#9fd8f0'} stroke={KC.ink} strokeWidth={7} />
    {hierve > 0 && Array.from({ length: 8 }, (_, i) => { const ph = (T * 1.6 + i * 0.13) % 1; return <circle key={i} cx={-110 + i * 30} cy={-44 - ph * 90} r={6 + ph * 10} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - ph} />; })}
    {!hierve && Array.from({ length: 5 }, (_, i) => <ellipse key={i} cx={-90 + i * 45} cy={-40 + Math.sin(T * 1.5 + i) * 4} rx={26} ry={9} fill={VERDE} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 30 - 50} ${-90 + i * 45} -40)`} />)}
    <path d="M -150 -20 l -40 -10 M 150 -20 l 40 -10" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
  </g>;
}

function Marca({ x, y, ok = true, o = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (0.6 + 0.4 * o)})`} opacity={o}>
    <circle r={56} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={7} />
    {ok ? <path d="M -26 2 L -6 24 L 30 -22" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />}
  </g>;
}

function Medalla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2) * 4})`}>
    <path d="M -60 -230 L -20 -90 L 20 -90 L 60 -230 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <circle r={110} fill={KC.gold} stroke={KC.ink} strokeWidth={8} /><circle r={84} fill="none" stroke={KC.gold2} strokeWidth={8} />
    <text y={-6} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={50} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>2015</text>
    <path d={`M ${-80 + ((T * 120) % 160)} -80 l 18 -18`} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".7" />
  </g>;
}

function Pan({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 60 Q -250 -110 -120 -140 Q 0 -190 120 -140 Q 250 -110 230 60 Z" fill="#d99a4e" stroke={KC.ink} strokeWidth={9} />
    {[-110, -10, 90].map((dx) => <path key={dx} d={`M ${dx - 40} -90 q 40 -30 80 0`} stroke="#a8682a" strokeWidth={10} fill="none" strokeLinecap="round" />)}
    <path d="M -230 60 L 230 60" stroke={KC.ink} strokeWidth={9} />
  </g>;
}

// Línea de montaje dentro de la levadura: azúcar → paso → paso → ácido artemisínico (esquema).
function Fabrica({ T, x, y, at, p = 1 }) {
  const pasos = [['azúcar', '#ffd43b'], ['FPP', '#ffb3c7'], ['amorfadieno', '#b18cff'], ['ácido artemisínico', KC.mint]];
  return <g transform={`translate(${x} ${y})`}>
    {pasos.map(([t, c], i) => { const on = kprog(T, at + i * 0.6, at + i * 0.6 + 0.4, kEase.sale) * p, yy = i * 120;
      return <g key={i} opacity={on} transform={`translate(0 ${yy})`}>
        {i > 0 && <path d={`M 0 -86 L 0 -34`} stroke="#eafff7" strokeWidth={6} markerEnd="" />}
        {i > 0 && <path d="M -12 -46 L 0 -30 L 12 -46" stroke="#eafff7" strokeWidth={6} fill="none" />}
        <rect x={-150} y={-28} width={300} height={56} rx={28} fill={c} stroke={KC.ink} strokeWidth={5} />
        <text y={12} textAnchor="middle" style={{ font:`900 ${i === 3 ? 26 : 30}px ${KF.texto}` }} fill={KC.ink}>{t}</text>
      </g>; })}
  </g>;
}

function Fabrica2({ T, x, y, on = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0 && [0, 1, 2].map((k) => { const ph = (T * 0.5 + k / 3) % 1; return <circle key={k} cx={150 + ph * 40} cy={-330 - ph * 220} r={30 + ph * 50} fill="#fff" opacity={(1 - ph) * 0.8 * on} stroke={KC.ink} strokeWidth={3} />; })}
    <rect x={120} y={-330} width={60} height={200} fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} />
    <path d="M -260 160 L -260 -60 L -150 -140 L -150 -60 L -40 -140 L -40 -60 L 70 -140 L 70 -130 L 260 -130 L 260 160 Z" fill="#cfd8e0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-200, -90, 20, 130].map((dx) => <rect key={dx} x={dx} y={-20} width={70} height={60} rx={6} fill={on > 0.5 ? KC.yellow : '#4a5560'} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-40} y={70} width={80} height={90} fill="#6f7a84" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function Balanza({ T, x, y, inclina = 0 }) {
  const a = inclina * 16 + Math.sin(T * 2) * 1.5;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -90 330 L 90 330 L 20 300 L 20 0 L -20 0 L -20 300 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${a})`}>
      <rect x={-330} y={-12} width={660} height={24} rx={12} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
      {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 300} 0) rotate(${-a})`}>
        <path d="M 0 0 L -90 150 M 0 0 L 90 150" stroke={KC.ink} strokeWidth={4} />
        <path d="M -110 150 Q 0 210 110 150 Z" fill="#cfd8e0" stroke={KC.ink} strokeWidth={6} />
        {sd < 0 ? <g transform="translate(0 140) scale(0.24)"><Artemisia T={T} x={0} y={0} seed={9} /></g>
          : <g transform="translate(0 100)"><rect x={-50} y={-60} width={100} height={110} rx={24} fill="#cfd8e0" stroke={KC.ink} strokeWidth={6} /><rect x={-40} y={-10} width={80} height={52} rx={16} fill={CALDO} /></g>}
        <text y={sd < 0 ? 250 : 250} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{sd < 0 ? 'planta' : 'levadura'}</text>
      </g>)}
    </g>
    <circle r={18} fill={KC.ink} />
  </g>;
}

function Artemisinina44() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Mosquito, Ci: CUES.Cifra, Pl: CUES.Planta, Li: CUES.Libro, No: CUES.Nobel, Co: CUES.Cosecha, Pr: CUES.Pregunta,
    Ge: CUES.Genes, Qu: CUES.Quimica, Es: CUES.Estudio, Sa: CUES.Sanofi, Gi: CUES.Giro, Cr: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre = kprog(T, K.G, K.G + 0.6, kEase.sale);
  // levadura del gancho y del cierre
  const levTanque = (xx, yy, ss) => <g transform={`translate(${xx} ${yy}) scale(${ss})`}>
    <rect x={-110} y={-170} width={220} height={320} rx={50} fill="#cfd8e0" stroke={KC.ink} strokeWidth={9} />
    <rect x={-96} y={-90} width={192} height={226} rx={40} fill={CALDO} />
    {[[-40, -20], [30, 30], [-20, 80], [50, -40]].map(([a, b], i) => <Levadura key={i} T={T} x={a} y={b} r={26} brote={0.6} seed={i + 2} />)}
    {Array.from({ length: 6 }, (_, i) => { const ph = (T * 0.8 + i / 6) % 1; return <circle key={'b' + i} cx={-70 + i * 28} cy={130 - ph * 210} r={7} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - ph} />; })}
  </g>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la caja, la planta y la levadura */}
      <Escena T={T} a={K.G} b={K.Mo} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Artemisia T={T} x={250} y={1150} s={0.95} />
          <Caja x={540} y={1000} s={1.0} abre={abre} />
          {levTanque(860, 920, 1.0)}
          <FlechaCurva T={T} x1={430} y1={820} x2={300} y2={560} p={kprog(T, K.G + 0.6, K.G + 1.4)} curva={-60} color={KC.white} />
          <FlechaCurva T={T} x1={660} y1={820} x2={800} y2={700} p={kprog(T, K.G + 2.6, K.G + 3.4)} curva={60} color={KC.yellow} />
        </Capa>
      </Escena>
      {/* 1 · el mosquito y la sangre */}
      <Escena T={T} a={K.Mo} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <path d="M -40 1180 Q 540 1080 1120 1150 L 1120 1500 L -40 1500 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
          <Mosquito T={T} x={klerp(900, 560, kprog(T, K.Mo, K.Mo + 1.0, kEase.sale))} y={klerp(560, 1010, kprog(T, K.Mo, K.Mo + 1.0, kEase.sale))} s={1.15} pica={kprog(T, K.Mo + 1.0, K.Mo + 1.3)} />
        </Capa>
        <Lupa T={T} at={K.Mo + 1.6} until={K.Ci - 0.2} x={540} y={560} r={230} fx={700} fy={1130} tinte={KC.red} etiqueta="AL MICROSCOPIO · sangre"
          interior={(T, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a0c12" />
            {[[120, 150, 0], [300, 120, 1], [200, 300, 1], [380, 300, 0], [100, 360, 0], [300, 430, 1], [420, 170, 0]].map(([gx, gy, p], i) =>
              <Globulo key={i} x={gx + Math.sin(T + i) * 6} y={gy + Math.cos(T * 0.8 + i) * 6} s={0.75} rot={i * 20} parasito={p * kprog(T, K.Mo + 2.4 + i * 0.15, K.Mo + 2.9 + i * 0.15)} />)}
          </svg>} />
      </Escena>
      {/* 2 · la cifra */}
      <Escena T={T} a={K.Ci} b={K.Pl} zoom={0.03}>
        <FondoMarca color={KC.coral} patron="rayas" />
        <Capa>{Array.from({ length: 10 }, (_, i) => <Globulo key={i} x={100 + (i % 5) * 220} y={1520 + Math.floor(i / 5) * 140 + Math.sin(T + i) * 8} s={0.7} rot={i * 33} parasito={i % 2} />)}</Capa>
      </Escena>
      {/* 3 · la planta y la molécula */}
      <Escena T={T} a={K.Pl} b={K.Li} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Artemisia T={T} x={300} y={1220} s={1.25} seed={5} />
          <FlechaCurva T={T} x1={380} y1={720} x2={640} y2={660} p={kprog(T, K.Pl + 1.4, K.Pl + 2.0)} curva={-50} color={KC.white} />
          <g opacity={kprog(T, K.Pl + 1.8, K.Pl + 2.3)}><Artemisinina x={790} y={720} s={1.1} rot={Math.sin(T) * 6} puente={kprog(T, K.Pl + 2.4, K.Pl + 3.0)} brillo={0.6 + 0.4 * Math.sin(T * 4)} /></g>
        </Capa>
      </Escena>
      {/* 4 · el libro antiguo y las dos ollas */}
      <Escena T={T} a={K.Li} b={K.No} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <LibroAntiguo x={370} y={640} s={1.1} abre={kprog(T, K.Li, K.Li + 0.8, kEase.sale)} />
          <g opacity={kprog(T, K.Li + 2.6, K.Li + 3.0)}><Olla T={T} x={280} y={1040} hierve={1} s={0.9} /></g>
          <g opacity={kprog(T, K.Li + 3.6, K.Li + 4.0)}><Olla T={T} x={800} y={1040} hierve={0} s={0.9} /></g>
          <Marca x={420} y={900} ok={false} o={kprog(T, K.Li + 4.6, K.Li + 5.0)} s={0.9} />
          <Marca x={940} y={900} ok={true} o={kprog(T, K.Li + 4.4, K.Li + 4.8)} s={0.9} />
        </Capa>
      </Escena>
      {/* 5 · 1972 y el Nobel */}
      <Escena T={T} a={K.No} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa><g opacity={kprog(T, K.No + 1.6, K.No + 2.0)}><Medalla T={T} x={760} y={1030} s={1.25} /></g>
          <g transform="translate(250 1150)"><Artemisinina x={0} y={0} s={0.7} rot={T * 10} /></g></Capa>
      </Escena>
      {/* 6 · cosechas y precio */}
      <Escena T={T} a={K.Co} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <rect x={0} y={1180} width={KW} height={300} fill="#a8743a" />
          {Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.Co, K.Co + 2.6), ciclo = Math.sin(u * Math.PI * 2 + i * 0.6);
            return <Artemisia key={i} T={T} x={110 + i * 172} y={1200} s={0.55} crece={0.45 + 0.55 * Math.max(0, ciclo)} seco={Math.max(0, -ciclo)} seed={i + 11} flores={false} />; })}
          {(() => { const p = kprog(T, K.Co + 0.2, K.Co + 2.4); const pts = [[120, 560], [260, 470], [380, 640], [520, 430], [660, 700], [800, 480], [960, 620]];
            const n = Math.max(2, Math.ceil(p * pts.length)); const d = pts.slice(0, n).map(([a, b], i) => `${i ? 'L' : 'M'} ${a} ${b}`).join(' ');
            return <g><rect x={90} y={380} width={900} height={360} rx={24} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
              <path d={d} stroke={KC.red} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
              <text x={120} y={430} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>precio (esquema)</text></g>; })()}
        </Capa>
      </Escena>
      {/* 7 · ¿y si la fabricara una levadura? */}
      <Escena T={T} a={K.Pr} b={K.Ge} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        <Capa><Pan x={300} y={1120} s={1.0} /><Levadura T={T} x={330} y={760} r={150} brote={kprog(T, K.Pr + 0.4, K.Pr + 2.2)} seed={4} /></Capa>
        <div style={{ position:'absolute', left:0, top:0 }}><Escala T={T} z={1} pxPorMm={60000} x={120} y={1430} color={KC.ink} objetivo={200} /></div>
      </Escena>
      {/* 8–9 · por dentro de la levadura y la química */}
      <Escena T={T} a={K.Ge} b={K.Es} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <ellipse cx={540} cy={820} rx={430} ry={360} fill="#3a3220" stroke={'#f4dc9a'} strokeWidth={14} opacity={0.95} />
          <ellipse cx={540} cy={820} rx={430} ry={360} fill="none" stroke={KC.ink} strokeWidth={4} />
          <circle cx={330} cy={700} r={120} fill="#4b3f7a" stroke="#b18cff" strokeWidth={8} />
          {[0, 1, 2].map((k) => { const p = kprog(T, K.Ge + 0.2 + k * 0.4, K.Ge + 1.4 + k * 0.4, kEase.suave);
            return <g key={k} transform={`translate(${klerp(-200, 260 + k * 10, p)} ${klerp(560 + k * 60, 650 + k * 45, p)})`}>
              <ADNHebra T={T} x={0} y={0} largo={130} alto={26} vueltas={1.5} grosor={4} colores={[KC.mint, KC.leaf, '#aef2c4']} />
              <path d="M 140 -6 q 18 -22 34 0 q -16 18 -34 0" fill={VERDE} stroke={KC.ink} strokeWidth={3} /></g>; })}
          {T < K.Qu + 0.3 && <Fabrica T={T} x={700} y={620} at={K.Ge + 1.2} />}
          {T >= K.Qu - 0.4 && (() => { const s = kprog(T, K.Qu, K.Qu + 1.6, kEase.suave);
            return <g>{Array.from({ length: 5 }, (_, i) => { const yy = 640 + i * 70, xx = klerp(640, 1040 + i * 15, kprog(T, K.Qu + i * 0.2, K.Qu + 1.4 + i * 0.2, kEase.suave));
              return <Molecula key={i} x={xx} y={yy} s={0.8} color={KC.mint} anillos={2} cola={1} rot={T * 30 + i * 40} />; })}</g>; })()}
        </Capa>
        {/* la química: matraz que cierra el puente O–O */}
        {T >= K.Qu + 1.0 && <Capa>
          <g opacity={kprog(T, K.Qu + 1.0, K.Qu + 1.4)}>
            <rect x={0} y={0} width={KW} height={KH} fill="rgba(14,15,18,.7)" />
            <path d="M 470 560 L 470 700 L 330 1040 Q 320 1080 360 1080 L 720 1080 Q 760 1080 750 1040 L 610 700 L 610 560 Z" fill="rgba(200,240,255,.25)" stroke={KC.white} strokeWidth={9} />
            <path d="M 395 900 L 685 900 L 740 1040 Q 745 1070 715 1070 L 365 1070 Q 335 1070 340 1040 Z" fill="rgba(47,224,168,.45)" />
            {Array.from({ length: 6 }, (_, i) => { const ph = (T * 0.9 + i / 6) % 1; return <circle key={i} cx={400 + i * 50} cy={1050 - ph * 150} r={8} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - ph} />; })}
            <Artemisinina x={540} y={830} s={0.9} puente={kprog(T, K.Qu + 1.8, K.Qu + 2.6, kEase.sale)} brillo={kprog(T, K.Qu + 2.4, K.Qu + 3.0)} />
          </g>
        </Capa>}
      </Escena>
      {/* 10 · el estudio: el tanque */}
      <Escena T={T} a={K.Es} b={K.Sa} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={klerp(0.2, 0.75, kprog(T, K.Es, K.Es + 4.5))} burbujas={1} fondo={KC.cyan} etiquetaTanque="tanque de levadura" />
      </Escena>
      {/* 11–12 · Sanofi en Italia y el apagón */}
      <Escena T={T} a={K.Sa} b={K.Cr} zoom={0.03}>
        <FondoLunares color={T < K.Gi ? KC.mint : KC.lilac} />
        <Capa>
          {T < K.Gi + 0.3 ? <g><Fabrica2 T={T} x={560} y={1020} on={1 - kprog(T, K.Gi - 0.1, K.Gi + 0.3)} s={1.2} /></g>
            : <Balanza T={T} x={600} y={900} inclina={kprog(T, K.Gi + 1.6, K.Gi + 2.6, kEase.sale)} />}
        </Capa>
      </Escena>
      {/* 13 · cierre: la misma caja, ahora con dos caminos */}
      <Escena T={T} a={K.Cr} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Artemisia T={T} x={250} y={1150} s={0.95} />
          <Caja x={540} y={1000} s={1.0} abre={1} />
          {levTanque(860, 920, 1.0)}
          <FlechaCurva T={T} x1={430} y1={820} x2={300} y2={560} p={kprog(T, K.Cr + 0.2, K.Cr + 0.9)} curva={-60} color={KC.white} />
          <FlechaCurva T={T} x1={660} y1={820} x2={800} y2={700} p={kprog(T, K.Cr + 1.2, K.Cr + 1.9)} curva={60} color={KC.yellow} />
        </Capa>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.0} until={K.Mo - 0.3} texto="¿de aquí?" x={260} y={500} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.G + 3.0} until={K.Mo - 0.3} texto="¿y de aquí?" x={860} y={1150} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.G + 1.4} until={K.Mo - 0.3} x={60} y={1470} texto="Artemisia annua" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.4} until={K.Mo - 0.3} x={1030} y={1470} texto="levadura" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.0} until={K.Mo + 3.0} x={60} y={1560} texto="mosquito Anopheles" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mo + 3.1} until={K.Ci - 0.3} x={60} y={1560} texto="parásito: Plasmodium falciparum" it tam={32} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ci + 0.3} until={K.Pl - 0.3} valor={282} dur={1.2} sufijo=" M" etiqueta="casos de malaria en 2024" y={810} tam={190} color={KC.yellow} />
      <NumeroGigante T={T} at={K.Ci + 1.8} until={K.Pl - 0.3} valor={610} dur={1.0} sufijo=" mil" etiqueta="muertes" y={1065} tam={110} color={KC.white} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Pl - 0.3} texto="OMS · Informe mundial 2025" x={540} y={1500} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pl + 0.5} until={K.Li - 0.3} x={60} y={1470} texto="ajenjo dulce · Artemisia annua" it tam={32} color={KC.ink} />
      <Etiqueta T={T} at={K.Pl + 2.8} until={K.Li - 0.3} x={740} y={590} texto="puente O–O" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Pl + 3.2} until={K.Li - 0.3} texto="artemisinina (esquema)" x={790} y={980} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Li + 0.8} until={K.Li + 2.6} texto="Ge Hong · siglo IV" x={540} y={440} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Li + 3.0} until={K.No - 0.3} texto="hervida" x={280} y={1180} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Li + 4.0} until={K.No - 0.3} texto="remojada en frío" x={800} y={1180} tam={36} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.No + 0.2} until={K.No + 1.7} anio="1972" quien="Tu Youyou y su equipo · Pekín" revista="artemisinina aislada" y={620} />
      <Chip T={T} at={K.No + 1.8} until={K.Co - 0.3} texto="Tu Youyou · Nobel de Medicina" x={540} y={500} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Pr + 0.4} until={K.Ge - 0.2} x={120} y={580} texto="Saccharomyces cerevisiae" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ge + 0.3} until={K.Qu - 0.2} texto="genes de la planta" x={540} y={1500} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Qu + 0.2} until={K.Qu + 1.1} texto="sale de la célula" x={540} y={1500} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Qu + 2.4} until={K.Es - 0.2} texto="química: se cierra el puente O–O" x={540} y={1500} tam={34} borde={KC.red} />
      <Etiqueta T={T} at={K.Ge + 0.2} until={K.Qu - 0.2} x={540} y={1640} texto="POR DENTRO · levadura" lado="der" tam={30} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="2013" quien="Amyris y Keasling · California" revista="Paddon et al., Nature" x={420} y={640} />
      <Medidor T={T} at={K.Es + 2.4} until={K.Sa - 0.2} x={90} y={1500} ancho={900} etiqueta="ácido artemisínico" valor={(T) => klerp(1.6 / 25, 1, kprog(T, K.Es + 2.6, K.Es + 4.6, kEase.suave))} texto={(v) => kformato(v * 25, 1) + ' g/L'} color={KC.yellow} />
      <Chip T={T} at={K.Sa + 0.2} until={K.Gi - 0.2} texto="Sanofi · Garessio, Italia · 2013" x={540} y={520} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Gi + 0.3} until={K.Cr - 0.2} texto="2015 · 0 toneladas" x={540} y={1530} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Gi + 2.0} until={K.Cr - 0.2} texto="planta: más barata" x={640} y={500} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Cr + 0.5} until={K.Ou} texto="del campo" x={260} y={500} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Cr + 1.4} until={K.Ou} texto="o de la levadura" x={800} y={1150} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="No solo planta: *también levadura.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.Ci - 0.1} texto="Un parásito en *tus glóbulos rojos.*" />
      <Subtitulo T={T} idx={2} at={K.Ci + 0.1} until={K.Pl - 0.1} texto="2024: *282 millones* de casos." />
      <Subtitulo T={T} idx={3} at={K.Pl + 0.1} until={K.Li - 0.1} texto="La base: *artemisinina.*" />
      <Subtitulo T={T} idx={4} at={K.Li + 0.1} until={K.No - 0.1} texto="Remojada, *no hervida.*" />
      <Subtitulo T={T} idx={5} at={K.No + 0.1} until={K.Co - 0.1} texto="1972 y *el Nobel.*" />
      <Subtitulo T={T} idx={6} at={K.Co + 0.1} until={K.Pr - 0.1} texto="Cosechas que *suben y bajan.*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.Ge - 0.1} texto="¿Y si la hace *una levadura?*" />
      <Subtitulo T={T} idx={8} at={K.Ge + 0.1} until={K.Qu - 0.1} texto="Genes de la planta *adentro.*" />
      <Subtitulo T={T} idx={9} at={K.Qu + 0.1} until={K.Es - 0.1} texto="La química *la termina.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Sa - 0.1} texto="*25 gramos* por litro." />
      <Subtitulo T={T} idx={11} at={K.Sa + 0.1} until={K.Gi - 0.1} texto="Sanofi: *Italia.*" />
      <Subtitulo T={T} idx={12} at={K.Gi + 0.1} until={K.Cr - 0.1} texto="2015: *nada.*" />
      <Subtitulo T={T} idx={13} at={K.Cr + 0.1} until={K.Ou - 0.1} texto="Campo… *o levadura.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Ci + 0.4, K.Pl - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Li + 0.9, K.No - 0.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pr + 0.05, K.Ge - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Qu + 0.4, K.Es - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Es + 2.6, K.Sa - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Gi + 0.4, K.Cr - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Cr + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="44" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArtemisininaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Artemisinina44 /></CompositionStage></div>;
}
window.ArtemisininaApp = ArtemisininaApp;
