// Shot Fungi Mati #72 · Ese bosque quemado no está muerto: las morillas que salen después del fuego — NARRADO
// (gancho 1 "Esto no es X: es Y" + N1 por dentro del suelo + N2 de cifras). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No comas hongos silvestres sin la identificación de un experto.

const MO = { cresta:'#3b2a1e', alveolo:'#b98f5e', alveolo2:'#d9b27e', pie:'#efe6d2', pie2:'#d8cbb0', hueco:'#2a1a10',
  ceniza:'#3d3a38', ceniza2:'#5a5552', carbon:'#1c1916', brasa:'#ff6a1f', gyro:'#8e3b22', gyro2:'#b5562f', algodon:'#f4ead8', verde:'#3fbf4a' };

// Morilla (Morchella) de perfil: sombrero cónico con crestas y alvéolos (panal) pegado al pie blanquecino.
// Base del pie en (x, y). crece 0..1. corte = true → mitad cortada: hueca por dentro (cavidad continua sombrero + pie).
function Morilla({ x, y, s = 1, crece = 1, rot = 0, corte = false, oscura = 0, id = 'm' }) {
  if (crece <= 0) return null;
  const p = kEase.sale(kclamp(crece * 1.25, 0, 1)), c = kEase.rebote(kclamp(crece * 1.5 - 0.35, 0, 1));
  const hp = 70 * p;                         // alto del pie
  const W = 62, H = 120;                     // sombrero
  const cap = `M ${-W} 0 Q ${-W - 4} ${-H * 0.55} ${-W * 0.45} ${-H * 0.9} Q 0 ${-H * 1.08} ${W * 0.45} ${-H * 0.9} Q ${W + 4} ${-H * 0.55} ${W} 0 Q 0 10 ${-W} 0 Z`;
  const cresta = mixHex(MO.cresta, '#141010', oscura), alv = mixHex(MO.alveolo, '#5d4a3a', oscura);
  // alvéolos: celdas en filas escalonadas dentro del sombrero
  const celdas = [], gr = krng(id.length * 31 + 7);
  for (let r = 0; r < 7; r++) for (let k = -4; k <= 4; k++) {
    const yy = -8 - r * 17 + gr() * 4, xx = k * 21 + (r % 2) * 10 + (gr() - 0.5) * 6, w = 12 + gr() * 7, h = 10 + gr() * 9;
    celdas.push(<ellipse key={r + '_' + k} cx={xx} cy={yy - h / 2} rx={w / 2} ry={h / 2} transform={`rotate(${(gr() - 0.5) * 30} ${xx} ${yy - h / 2})`} fill={gr() < 0.5 ? alv : mixHex(MO.alveolo2, '#6d5a48', oscura)} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {/* pie */}
    <path d={`M -30 0 Q -34 ${-hp * 0.5} -26 ${-hp} L 26 ${-hp} Q 34 ${-hp * 0.5} 30 0 Q 0 8 -30 0 Z`} fill={MO.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {!corte && <path d={`M -14 -8 Q -18 ${-hp * 0.5} -12 ${-hp + 6}`} stroke={MO.pie2} strokeWidth={6} fill="none" strokeLinecap="round" />}
    {c > 0 && <g transform={`translate(0 ${-hp + 4}) scale(${c})`}>
      <defs><clipPath id={'cp' + id}><path d={cap} /></clipPath></defs>
      <path d={cap} fill={corte ? MO.pie : cresta} />
      {!corte && <g clipPath={`url(#cp${id})`}>{celdas}</g>}
      {corte && <g>
        {/* hueca: pared delgada y una sola cavidad que baja al pie */}
        <path d={`M ${-W + 12} -2 Q ${-W + 10} ${-H * 0.52} ${-W * 0.4} ${-H * 0.8} Q 0 ${-H * 0.96} ${W * 0.4} ${-H * 0.8} Q ${W - 10} ${-H * 0.52} ${W - 12} -2 Z`} fill={MO.hueco} />
      </g>}
      <path d={cap} fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>}
    {corte && <path d={`M -16 -6 L -14 ${-hp + 6} L 14 ${-hp + 6} L 16 -6 Z`} fill={MO.hueco} />}
  </g>;
}

// Falsa morilla (Gyromitra esculenta): sombrero rojizo arrugado como cerebro. corte = cámaras irregulares con relleno algodonoso.
function FalsaMorilla({ x, y, s = 1, corte = false }) {
  const cap = 'M -78 -40 Q -96 -100 -60 -130 Q -30 -160 0 -140 Q 30 -165 62 -132 Q 98 -104 80 -44 Q 60 -18 30 -30 Q 0 -10 -30 -28 Q -60 -16 -78 -40 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -24 0 Q -30 -20 -22 -40 L 22 -40 Q 30 -20 24 0 Q 0 6 -24 0 Z" fill={MO.pie} stroke={KC.ink} strokeWidth={6} />
    <path d={cap} fill={corte ? MO.algodon : MO.gyro} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {!corte && ['M -60 -60 Q -40 -90 -50 -115 Q -30 -100 -20 -125', 'M -10 -45 Q 10 -80 -5 -110 Q 15 -95 25 -128', 'M 30 -50 Q 55 -75 45 -110 Q 60 -95 70 -110', 'M -70 -80 Q -45 -70 -35 -50', 'M 10 -130 Q 35 -110 60 -120'].map((d, i) =>
      <path key={i} d={d} stroke={MO.gyro2} strokeWidth={9} fill="none" strokeLinecap="round" />)}
    {!corte && ['M -55 -70 Q -35 -95 -45 -118', 'M 0 -55 Q 20 -85 5 -112'].map((d, i) => <path key={i} d={d} stroke="#5c2412" strokeWidth={4} fill="none" />)}
    {corte && <g>
      {[[-50, -70, 22, 16], [-15, -95, 18, 22], [25, -70, 24, 15], [52, -105, 14, 18], [-45, -115, 14, 12], [5, -45, 16, 9]].map(([cx, cy, rx, ry], i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#d8c7ad" stroke="#9c8a70" strokeWidth={3} transform={`rotate(${i * 23} ${cx} ${cy})`} />)}
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={-70 + (i * 37) % 140} cy={-30 - ((i * 53) % 110)} r={3} fill="#ffffff" opacity=".8" />)}
      <path d={cap} fill="none" stroke={MO.gyro} strokeWidth={12} strokeLinejoin="round" />
      <path d={cap} fill="none" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    </g>}
  </g>;
}

// Tronco quemado (tocón negro con ramas cortas). verde 0..1 = brotes nuevos al pie.
function TroncoQuemado({ x, y, h = 520, s = 1, seed = 1, T = 0, brasas = 0 }) {
  const g = krng(seed * 13);
  const ramas = Array.from({ length: 4 }, (_, i) => ({ y: -h * (0.4 + i * 0.13), lado: i % 2 ? 1 : -1, l: 40 + g() * 50 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -26 0 L -18 ${-h} L 18 ${-h} L 26 0 Z`} fill={MO.carbon} stroke={KC.ink} strokeWidth={5} />
    {ramas.map((r, i) => <line key={i} x1={0} y1={r.y} x2={r.lado * r.l} y2={r.y - 30} stroke={MO.carbon} strokeWidth={12} strokeLinecap="round" />)}
    {[0.2, 0.45, 0.7].map((k, i) => <path key={i} d={`M -16 ${-h * k} l 12 -8 l 10 6`} stroke="#3a3430" strokeWidth={3} fill="none" />)}
    {brasas > 0 && [0.1, 0.3, 0.55].map((k, i) => <circle key={i} cx={(i - 1) * 8} cy={-h * k} r={5} fill={MO.brasa} opacity={brasas * (0.5 + 0.5 * Math.sin(T * 7 + i * 2))} />)}
  </g>;
}
// Humo que sube (columnas de círculos grises).
function Humo({ T, x, y, o = 1, seed = 1 }) {
  return <g opacity={o}>{Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.25 + i / 6 + seed * 0.13) % 1);
    return <circle key={i} cx={x + Math.sin(u * 6 + seed) * 26} cy={y - u * 300} r={18 + u * 40} fill="#8a8582" opacity={(1 - u) * 0.45} />; })}</g>;
}
// Suelo quemado: banda de ceniza con brasas. verde 0..1 = se pinta de brotes.
function SueloQuemado({ T, y = 1150, verde = 0, brasas = 1 }) {
  return <g>
    <rect x={0} y={y} width={KW} height={KH - y} fill={mixHex(MO.ceniza, '#4c3a2a', verde * 0.6)} />
    <path d={`M 0 ${y} Q 270 ${y - 18} 540 ${y} T 1080 ${y}`} fill={mixHex(MO.ceniza2, '#5b4632', verde * 0.6)} stroke={KC.ink} strokeWidth={6} />
    {brasas > 0 && Array.from({ length: 14 }, (_, i) => <circle key={i} cx={40 + i * 75} cy={y + 30 + (i % 3) * 22} r={6} fill={MO.brasa} opacity={brasas * (0.4 + 0.6 * Math.abs(Math.sin(T * 3 + i)))} />)}
    {verde > 0 && Array.from({ length: 18 }, (_, i) => { const v = kclamp(verde * 1.6 - (i % 6) * 0.1, 0, 1); const bx = 30 + i * 60;
      return <path key={'v' + i} d={`M ${bx} ${y + 4} q -8 ${-24 * v} -14 ${-34 * v} M ${bx} ${y + 4} q 8 ${-22 * v} 16 ${-30 * v}`} stroke={MO.verde} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Bosque quemado de fondo + morillas que brotan. brota 0..1.
const POS_MOR = [[120, 1060, 0.9], [270, 1080, 1.05], [410, 1055, 0.8], [530, 1090, 1.1], [670, 1062, 0.85], [800, 1085, 1.0], [940, 1058, 0.9], [190, 1120, 0.75], [610, 1125, 0.8], [870, 1122, 0.75], [350, 1118, 0.8], [1010, 1112, 0.7]];
function BosqueQuemado({ T, brota = 0, verde = 0, humo = 1, brasas = 1 }) {
  return <g>
    {[[90, 1035, 520, 1], [300, 1035, 640, 2], [470, 1035, 440, 3], [700, 1035, 600, 4], [880, 1035, 500, 5], [1010, 1035, 400, 6]].map(([x, y, h, sd]) =>
      <TroncoQuemado key={sd} x={x} y={y} h={h} seed={sd} T={T} brasas={brasas} />)}
    {humo > 0 && <><Humo T={T} x={300} y={990} o={humo} seed={1} /><Humo T={T} x={760} y={1000} o={humo} seed={4} /></>}
    <SueloQuemado T={T} y={1025} verde={verde} brasas={brasas} />
    {POS_MOR.map(([x, y, k], i) => <Morilla key={i} id={'b' + i} x={x} y={y} s={k * 0.85} crece={kclamp(brota * 2.2 - i * 0.1, 0, 1)} rot={mece(T, i + 2, 0.4) * 2} oscura={0.5} />)}
  </g>;
}
// Calendario chiquito con hojas que pasan.
function Calendario({ T, x, y, at, textos }) {
  const k = Math.min(textos.length - 1, Math.max(0, Math.floor((T - at) / 0.9)));
  const flip = kprog(T, at + k * 0.9, at + k * 0.9 + 0.25);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-90} width={300} height={190} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-90} width={300} height={50} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[-90, -30, 30, 90].map((dx) => <rect key={dx} x={dx - 6} y={-110} width={12} height={36} rx={6} fill={KC.ink} />)}
    <text x={0} y={50} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={flip}>{textos[k]}</text>
  </g>;
}
// Silueta esquemática del oeste de Norteamérica (costa del Pacífico) con zonas de incendio.
function MapaOeste({ x, y, s = 1, p = 1, T = 0 }) {
  const tierra = 'M 60 0 L 520 0 L 540 120 L 500 260 L 520 420 L 470 560 L 360 600 L 300 560 L 240 600 L 150 520 L 120 420 L 80 330 L 40 200 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-40} width={660} height={700} rx={24} fill="#9fd8ff" stroke={KC.ink} strokeWidth={6} />
    <path d={tierra} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[180, 120], [260, 260], [150, 330], [330, 160], [230, 430], [380, 330]].map(([a, b], i) => { const q = kEase.rebote(kclamp(p * 1.8 - i * 0.15, 0, 1));
      return <g key={i} transform={`translate(${a} ${b}) scale(${q})`}>
        <path d="M 0 -34 Q 22 -6 12 16 Q 0 28 -12 16 Q -22 -6 0 -34 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
        <path d="M 0 -10 Q 9 4 4 14 Q 0 18 -4 14 Q -9 4 0 -10 Z" fill={KC.yellow} opacity={0.6 + 0.4 * Math.sin(T * 8 + i)} />
      </g>; })}
  </g>;
}
// Microbio esquemático (bolita con colita) que se apaga con el calor.
function Microbio({ x, y, vida = 1, T = 0, seed = 1, color = KC.lilac }) {
  return <g transform={`translate(${x + mece(T, seed, 0.6) * 6} ${y}) scale(${0.6 + 0.4 * vida})`} opacity={0.25 + 0.75 * vida}>
    <ellipse rx={20} ry={13} fill={mixHex('#6b6b6b', color, vida)} stroke={KC.ink} strokeWidth={3} />
    <path d={`M 20 0 q 14 ${Math.sin(T * 6 + seed) * 8} 26 0`} stroke={mixHex('#6b6b6b', color, vida)} strokeWidth={3} fill="none" />
  </g>;
}
// Hoja seca de la hojarasca. quema 0..1 → se ennegrece y se encoge.
function Hoja({ x, y, rot = 0, quema = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 - quema * 0.55)})`} opacity={1 - quema * 0.6}>
    <path d="M -40 0 Q 0 -26 40 0 Q 0 26 -40 0 Z" fill={mixHex('#c98b2b', '#1c1916', quema)} stroke={KC.ink} strokeWidth={3} />
    <line x1={-36} y1={0} x2={36} y2={0} stroke={mixHex('#7a4a22', '#000000', quema)} strokeWidth={3} />
  </g>;
}
// Llamita.
function Llama({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  const f = 1 + 0.12 * Math.sin(T * 13 + x);
  return <g transform={`translate(${x} ${y}) scale(${s} ${s * f})`} opacity={o}>
    <path d="M 0 -60 Q 30 -20 20 6 Q 0 20 -20 6 Q -30 -20 0 -60 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 -26 Q 12 -6 8 6 Q 0 12 -8 6 Q -12 -6 0 -26 Z" fill={KC.yellow} />
  </g>;
}
// Oyamel (abeto) verde, sin fuego.
function Oyamel({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 3, 0.3) * 1.2})`}>
    <rect x={-16} y={-60} width={32} height={60} fill="#6b3f1e" stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((k) => { const w = 120 - k * 22, yy = -50 - k * 70; return <path key={k} d={`M ${-w} ${yy} L 0 ${yy - 110} L ${w} ${yy} Z`} fill={k % 2 ? '#2f8f44' : '#226e36'} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />; })}
  </g>;
}
// Cohetito con estela.
function Cohete({ T, at, x, y }) {
  if (T < at) return null;
  const u = kprog(T, at, at + 2.6, (p) => p * p);
  return <g transform={`translate(${x} ${y - u * 520})`}>
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={Math.sin(T * 20 + i) * 6} cy={60 + i * 26} r={16 - i * 3} fill={i % 2 ? KC.yellow : KC.orange} opacity={0.9 - i * 0.2} />)}
    <path d="M 0 -70 Q 26 -40 24 30 L -24 30 Q -26 -40 0 -70 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-18} r={11} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    <path d="M -24 10 L -42 46 L -24 36 Z M 24 10 L 42 46 L 24 36 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Nudo de micelio (esclerocio, esquemático).
function Esclerocio({ x, y, k = 1 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(k)})`}>
    <path d="M -34 0 Q -38 -26 -10 -30 Q 20 -40 34 -14 Q 44 14 16 24 Q -14 34 -30 18 Z" fill="#c8a978" stroke={KC.ink} strokeWidth={4} />
    {[[-14, -10], [8, -16], [14, 6], [-8, 10]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill="#9c7c4c" />)}
  </g>;
}

// 1 ha: cuadro 100 × 100 m (esquemático) con puntitos de morillas. n = cuántas se ven.
const PUNTOS_HA = (() => { const g = krng(72); return Array.from({ length: 260 }, () => [g(), g()]); })();
function Hectarea({ x, y, lado = 560, n = 0, color = KC.yellow }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={lado} height={lado} fill="rgba(0,0,0,.25)" stroke={KC.paper} strokeWidth={6} strokeDasharray="22 12" />
    {PUNTOS_HA.slice(0, Math.round(n)).map(([u, v], i) => <circle key={i} cx={14 + u * (lado - 28)} cy={14 + v * (lado - 28)} r={8} fill={color} stroke={KC.ink} strokeWidth={2.5} />)}
  </g>;
}

function MorillasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Morilla, Es: CUES.Especies, Ci: CUES.Cifra, Se: CUES.Segundo, P: CUES.Pregunta, Mi: CUES.Misterio,
    U: CUES.Ultimo, E: CUES.Estudio, Mx: CUES.Mexico, F: CUES.Falsa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: bosque quemado → calendario → brotan morillas */}
      <Escena T={T} a={K.G} b={K.Mo} zoom={0.06} origen="50% 70%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <BosqueQuemado T={T} brota={kprog(T, K.G + 2.4, K.G + 4.4)} humo={1 - kprog(T, K.G + 1.8, K.G + 2.6)} brasas={1 - kprog(T, K.G + 1.8, K.G + 2.6)} />
          {T < K.G + 2.5 && <g opacity={1 - kprog(T, K.G + 2.1, K.G + 2.5)}><Calendario T={T} x={250} y={560} at={K.G + 0.4} textos={['INCENDIO', '…', 'PRIMAVERA']} /></g>}
        </>)}
      </Escena>
      {/* 2 · la morilla: panal por fuera, hueca por dentro */}
      <Escena T={T} a={K.Mo} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={360} cy={1125} rx={300} ry={26} fill="rgba(0,0,0,.18)" />
          <defs><clipPath id="mitIzq"><rect x={0} y={0} width={360} height={1920} /></clipPath><clipPath id="mitDer"><rect x={360} y={0} width={720} height={1920} /></clipPath></defs>
          {(() => { const cort = kprog(T, K.Mo + 2.2, K.Mo + 2.9, kEase.sale), cr = kprog(T, K.Mo + 0.1, K.Mo + 1.1); return cort <= 0 ?
            <Morilla id="g1" x={360} y={1120} s={3.2} crece={cr} /> : <>
            <g transform={`translate(${-cort * 90} 0) rotate(${-cort * 4} 360 1120)`}><g clipPath="url(#mitIzq)"><Morilla id="g2" x={360} y={1120} s={3.2} /></g></g>
            <g transform={`translate(${cort * 90} 0) rotate(${cort * 4} 360 1120)`}><g clipPath="url(#mitDer)"><Morilla id="g3" x={360} y={1120} s={3.2} corte /></g></g>
            {cort < 1 && <line x1={360} y1={600} x2={360} y2={1140} stroke="#fff" strokeWidth={8} strokeDasharray="20 12" opacity={1 - cort} />}
          </>; })()}
        </>)}
      </Escena>
      {/* 3 · cinco especies del fuego, oeste de Norteamérica */}
      <Escena T={T} a={K.Es} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaOeste T={T} x={100} y={420} s={0.7} p={kprog(T, K.Es + 0.3, K.Es + 2.2)} />
          {[0, 1, 2, 3, 4].map((i) => <Morilla key={i} id={'e' + i} x={170 + i * 185} y={1130} s={0.95} crece={kprog(T, K.Es + 2.6 + i * 0.35, K.Es + 3.3 + i * 0.35)} rot={mece(T, i, 0.5) * 3} oscura={0.6} />)}
          {[0, 1, 2, 3, 4].map((i) => T > K.Es + 3.1 + i * 0.35 && <text key={'n' + i} x={170 + i * 185} y={1180} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>)}
        </>)}
      </Escena>
      {/* 4–5 · ≈ 2,500 por hectárea el primer año → casi nada el segundo */}
      <Escena T={T} a={K.Ci} b={K.P} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:MO.ceniza }}></div>
        {fsvg(<>
          <Hectarea x={290} y={630} lado={500} n={T < K.Se ? kprog(T, K.Ci + 0.3, K.Ci + 2.6) * 260 : klerp(260, 12, kprog(T, K.Se, K.Se + 0.9, kEase.sale))} />
          <text x={540} y={1172} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.paper}>1 hectárea = 100 m × 100 m (esquemático)</text>
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Mi} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Morilla id="p" x={260} y={1130} s={2.4} rot={Math.sin(T * 4) * 5} /><Interrogacion T={T} x={300} y={700} tam={340} /></>)}
      </Escena>
      {/* 7 · por debajo del suelo: hipótesis 1 */}
      <Escena T={T} a={K.Mi} b={K.U} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        <div style={{ position:'absolute', left:0, right:0, top:0, height:470, background:`linear-gradient(${MO.ceniza2}, #2a1d14)` }}></div>
        <Ambiente T={T} n={16} color="rgba(255,200,140,.25)" />
        {fsvg(<>
          {Array.from({ length: 12 }, (_, i) => { const calor = kprog(T, K.Mi + 2.2 + (i % 4) * 0.2, K.Mi + 3.2 + (i % 4) * 0.2);
            return <Microbio key={i} T={T} seed={i} x={120 + (i % 6) * 160} y={600 + Math.floor(i / 6) * 330 + (i % 2) * 60} vida={1 - calor} />; })}
          <RedHifas T={T} x={540} y={830} g={kprog(T, K.Mi + 0.6, K.Mi + 6)} seed={7} n={260} escala={0.42} color={MO.alveolo2} ancho={4} />
          {Array.from({ length: 14 }, (_, i) => { const q = kprog(T, K.Mi + 3.6 + i * 0.08, K.Mi + 4.0 + i * 0.08, kEase.rebote);
            return q > 0 ? <circle key={'c' + i} cx={150 + (i * 61) % 800} cy={620 + (i * 97) % 440} r={10 * q} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} /> : null; })}
          <path d="M 0 470 L 1080 470" stroke={MO.brasa} strokeWidth={10} opacity={0.6 + 0.4 * Math.sin(T * 6)} />
        </>)}
      </Escena>
      {/* 8 · hipótesis 2: el fuego quemó su comida → último esfuerzo */}
      <Escena T={T} a={K.U} b={K.E} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        <div style={{ position:'absolute', left:0, right:0, top:0, height:620, background:KC.orange, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        {fsvg(<>
          <rect x={0} y={600} width={KW} height={40} fill="#4a3220" />
          {Array.from({ length: 11 }, (_, i) => { const q = kprog(T, K.U + 0.3 + i * 0.1, K.U + 1.6 + i * 0.1);
            return <g key={i}><Hoja x={60 + i * 96} y={592 - (i % 3) * 14} rot={(i * 37) % 60 - 30} quema={q} /><Llama T={T} x={60 + i * 96} y={592} s={0.8} o={Math.sin(Math.PI * kclamp(q, 0, 1))} /></g>; })}
          <RedHifas T={T} x={540} y={900} g={1} seed={7} n={260} escala={0.42} color={MO.alveolo2} ancho={4} />
          <Esclerocio x={430} y={820} k={kprog(T, K.U + 1.2, K.U + 1.8)} />
          <Esclerocio x={650} y={850} k={kprog(T, K.U + 1.5, K.U + 2.1)} />
          {(() => { const v = kprog(T, K.U + 1.8, K.U + 3.0); return v > 0 ? <>
            <path d={`M 540 860 L 540 ${860 - 240 * v}`} stroke={MO.alveolo2} strokeWidth={10} strokeLinecap="round" />
            <Morilla id="u" x={540} y={612} s={1.15} crece={kprog(T, K.U + 2.4, K.U + 3.6)} oscura={0.5} /></> : null; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio del incendio Rim: parcelitas de muestreo */}
      <Escena T={T} a={K.E} b={K.Mx} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:MO.ceniza }}></div>
        {fsvg(<>
          {Array.from({ length: 28 }, (_, i) => { const cx = 110 + (i % 7) * 145, cy = 760 + Math.floor(i / 7) * 92, on = kprog(T, K.E + 2.2 + i * 0.04, K.E + 2.4 + i * 0.04);
            const con = [2, 9, 13, 18, 25].includes(i);   // ~18 % de las parcelitas con morillas (esquemático)
            return on > 0 ? <g key={i}><circle cx={cx} cy={cy} r={38 * on} fill="none" stroke={KC.paper} strokeWidth={4} strokeDasharray="8 6" />
              {con && <Morilla id={'r' + i} x={cx} y={cy + 22} s={0.42} crece={kprog(T, K.E + 3.4 + i * 0.03, K.E + 3.9 + i * 0.03)} oscura={0.5} />}</g> : null; })}
        </>)}
      </Escena>
      {/* 10 · México: oyamel, sin fuego */}
      <Escena T={T} a={K.Mx} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaMexico x={10} y={600} ancho={720} conCA={false}>
            {[[-99.13, 19.43], [-99.6, 19.3], [-98.8, 20.1], [-101.7, 19.6], [-98.2, 19.35], [-97.0, 19.5]].map(([lo, la], i) => { const [px, py] = mxProy(lo, la); const q = kEase.rebote(kprog(T, K.Mx + 0.5 + i * 0.15, K.Mx + 0.9 + i * 0.15));
              return <circle key={i} cx={px} cy={py} r={15 * q} fill={KC.red} stroke={KC.ink} strokeWidth={4} />; })}
          </MapaMexico>
          <Oyamel T={T} x={900} y={1130} s={0.85} />
          <Morilla id="x1" x={790} y={1140} s={0.85} crece={kprog(T, K.Mx + 1.2, K.Mx + 2)} />
          <Morilla id="x2" x={1010} y={1145} s={0.7} crece={kprog(T, K.Mx + 1.4, K.Mx + 2.2)} />
          <rect x={720} y={1135} width={360} height={30} fill="#3b6b2c" />
        </>)}
      </Escena>
      {/* 11 · falsa morilla y combustible de cohete */}
      <Escena T={T} a={K.F} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Morilla id="f1" x={250} y={1080} s={1.9} corte />
          <FalsaMorilla x={760} y={1080} s={1.9} corte={T > K.F + 1.0} />
          <Sello T={T} at={K.F + 0.6} x={95} y={1100} texto="SÍ" color="#118a3a" r={60} rot={-8} />
          <Sello T={T} at={K.F + 1.1} x={555} y={1100} texto="NO" color={KC.red} r={60} rot={10} />
          <Cohete T={T} at={K.F + 2.6} x={1000} y={1060} />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo bosque del inicio, lleno de morillas y brotes */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.orange} />
        {fsvg(<BosqueQuemado T={T} brota={1} verde={kprog(T, K.C + 0.5, K.C + 2.5)} humo={0} brasas={0} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.G + 2.2} texto="incendio → primavera" x={300} y={760} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.Mo - 0.3} texto="no está muerto" x={300} y={760} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Mo + 0.6} until={K.Es - 0.3} x={60} y={430} texto="morilla" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.0} until={K.Es - 0.3} x={60} y={490} texto="Morchella" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Mo + 1.3} until={K.Mo + 1.9} texto="hoyitos como panal" x={800} y={800} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Mo + 2.8} until={K.Es - 0.3} texto="hueca por dentro" x={800} y={800} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.2} until={K.Ci - 0.3} texto="OESTE DE NORTEAMÉRICA" x={340} y={360} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.Es + 2.6} until={K.Ci - 0.3} texto="5 especies del fuego · 1.er año" x={760} y={880} tam={30} borde={KC.orange} />
      <NumeroGigante T={T} at={K.Ci + 0.3} until={K.Se - 0.6} valor={2500} dur={1.6} prefijo="≈ " sufijo="+" etiqueta="por hectárea · 1.er año" x={540} y={470} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.Ci + 1.4} until={K.Se - 0.6} x={290} y={598} texto="«1,000 o más por acre» (dato de 2007)" tam={26} color={KC.paper} />
      <NumeroGigante T={T} at={K.Se + 0.15} until={K.P - 0.6} valor={2} dur={0.01} prefijo="AÑO " x={330} y={500} tam={150} color={KC.paper} />
      <Etq T={T} at={K.Se + 0.3} until={K.P - 0.6} x={150} y={605} texto="casi desaparecen" tam={32} color={KC.paper} />
      <Chip T={T} at={K.Mi + 0.2} until={K.U - 0.3} texto="TODAVÍA UN MISTERIO" x={540} y={330} tam={32} borde={KC.cyan} mono />
      <Chip T={T} at={K.Mi + 1.4} until={K.U - 0.3} texto="HIPÓTESIS" x={300} y={420} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Mi + 2.4} until={K.U - 0.3} x={60} y={560} texto="microbios que compiten" tam={28} color={KC.lilac} />
      <Etq T={T} at={K.Mi + 3.8} until={K.U - 0.3} x={60} y={1040} texto="comida fácil" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Mi + 1.0} until={K.U - 0.3} x={60} y={1100} texto="micelio de morilla" tam={26} color={MO.alveolo2} />
      <Chip T={T} at={K.U + 0.3} until={K.E - 0.3} texto="otra hipótesis: último esfuerzo" x={400} y={340} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.U + 0.8} until={K.E - 0.3} x={60} y={470} texto="hojarasca: su comida" tam={28} color={KC.ink} />
      <Etq T={T} at={K.U + 2.2} until={K.E - 0.3} x={630} y={960} texto="esclerocios (esquema)" tam={24} color={KC.paper} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2014" quien="incendio Rim (2013) · Yosemite, EE. UU." revista="U. de Montana · For. Ecol. Manage., 2016" x={540} y={600} />
      <NumeroGigante T={T} at={K.E + 2.8} until={K.Mx - 0.2} valor={1693} dur={1.4} etiqueta="por hectárea (estimado)" x={400} y={560} tam={140} color={KC.yellow} />
      <Etq T={T} at={K.Mx + 0.3} until={K.F - 0.3} x={60} y={420} texto="bosques de oyamel" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mx + 1.8} until={K.F - 0.3} texto="pancitas · elotitos" x={330} y={540} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.F + 0.4} until={K.C - 0.3} x={60} y={360} texto="morilla: hueca" tam={30} color={KC.ink} />
      <Etq T={T} at={K.F + 0.9} until={K.C - 0.3} x={60} y={410} texto="falsa morilla ·" tam={30} color={KC.ink} />
      <Etq T={T} at={K.F + 0.9} until={K.C - 0.3} x={365} y={410} texto="Gyromitra" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 1.4} until={K.C - 0.3} texto="no del todo hueca · tóxica" x={470} y={640} tam={28} borde={KC.red} />
      <Chip T={T} at={K.F + 2.8} until={K.C - 0.3} texto="monometilhidrazina 🚀" x={400} y={520} tam={32} borde={KC.red} mono />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="el hongo ya estaba ahí (quizá)" x={420} y={760} tam={34} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Mo} texto="5 m" largo={160} />
      <BarraEscala T={T} at={K.Mo} until={K.Es} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.Es} until={K.Ci} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ci} until={K.P} texto="100 m" largo={500} x={290} y={1430} />
      <BarraEscala T={T} at={K.P} until={K.Mi} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Mi} until={K.E} texto="esquemático · 1 mm" largo={60} />
      <BarraEscala T={T} at={K.E} until={K.Mx} texto="parcelas de 3.14 m² (esquemático)" largo={0} />
      <BarraEscala T={T} at={K.Mx} until={K.F} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.F} until={K.C} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 m" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="Ese bosque quemado *no está muerto.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.Es - 0.1} texto="Hoyitos como panal y *hueca por dentro.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.Ci - 0.1} texto="*5 especies* salen tras el incendio." />
      <Subtitulo T={T} idx={3} at={K.Ci + 0.1} until={K.Se - 0.1} texto="El 1.er año: *2,500 o más* por hectárea." />
      <Subtitulo T={T} idx={4} at={K.Se + 0.1} until={K.P - 0.1} texto="Al 2.º año, *casi desaparecen.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Mi - 0.1} texto="¿Por qué el fuego *las despierta?*" />
      <Subtitulo T={T} idx={6} at={K.Mi + 0.1} until={K.U - 0.1} texto="Hipótesis: *menos competencia,* comida fácil." />
      <Subtitulo T={T} idx={7} at={K.U + 0.1} until={K.E - 0.1} texto="Sin comida, *un último esfuerzo.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Mx - 0.1} texto="Yosemite: *≈ 1,700* por hectárea." />
      <Subtitulo T={T} idx={9} at={K.Mx + 0.1} until={K.F - 0.1} texto="En México: *pancitas* o *elotitos.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.C - 0.1} texto="La falsa morilla: *combustible de cohete.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Quizá el hongo *ya estaba esperando.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Mo + 0.4, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 3.0, K.Ci - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Se + 0.1, K.P - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Mi - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mi + 2.2, K.U - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.U + 0.6, K.E - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.E + 2.8, K.Mx - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Mx + 0.4, K.F - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.F + 0.4, K.C - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="72" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MorillasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MorillasShot /></CompositionStage></div>;
}
window.MorillasApp = MorillasApp;
