// Shot Fungi Mati #130 · Esa espuma del río está llena de estrellas — NARRADO (gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. Arroyo, esporas, hifas, larva y mapas: DIBUJO ESQUEMÁTICO (estilo propio).
// Esporas (conidios) de Articulospora tetracladia: un brazo de base corto (16–25 µm) + tres brazos que divergen de un punto (20–50 µm), incoloras.

const ES = { agua:'#2aa7d6', agua2:'#1b7fb0', agua3:'#5fd0f2', espuma:'#f3ead2', espuma2:'#e2d3ac', roca:'#8d8a82', roca2:'#6e6b64',
  rama:'#6b4423', hoja:'#d98a2b', hoja2:'#b8641a', hojaV:'#7cbf3a', nervio:'#8a4a12', hialino:'rgba(235,250,255,.9)', hialBorde:'#bfe9ff',
  larva:'#f0d9a8', cielo:'#0f1a3a', galleta:'#e7b765', crema:'#a4682c', tronco:'#6b4a2e' };

// ---------- piezas ----------
// Espora tetrarradiada (Articulospora): brazo de base hacia abajo + 3 brazos que divergen del punto (0,0). L = largo de los 3 brazos.
function Estrella({ x, y, s = 1, rot = 0, L = 60, color = ES.hialino, borde = ES.hialBorde, o = 1, ancho = 7, septos = true }) {
  const brazos = [-150, -90, -30].map((a) => a * Math.PI / 180);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={0} y2={L * 0.45} stroke={borde} strokeWidth={ancho + 3} strokeLinecap="round" />
    <line x1={0} y1={0} x2={0} y2={L * 0.45} stroke={color} strokeWidth={ancho} strokeLinecap="round" />
    {brazos.map((a, i) => <g key={i}>
      <line x1={0} y1={0} x2={Math.cos(a) * L} y2={Math.sin(a) * L} stroke={borde} strokeWidth={ancho + 3} strokeLinecap="round" />
      <line x1={0} y1={0} x2={Math.cos(a) * L} y2={Math.sin(a) * L} stroke={color} strokeWidth={ancho} strokeLinecap="round" />
      {septos && <line x1={Math.cos(a) * L * 0.5 - Math.sin(a) * ancho * 0.5} y1={Math.sin(a) * L * 0.5 + Math.cos(a) * ancho * 0.5} x2={Math.cos(a) * L * 0.5 + Math.sin(a) * ancho * 0.5} y2={Math.sin(a) * L * 0.5 - Math.cos(a) * ancho * 0.5} stroke={borde} strokeWidth={2} />}
    </g>)}
    <circle r={ancho * 0.85} fill={color} stroke={borde} strokeWidth={2} />
  </g>;
}
// Espora sigmoide (en S), larga y delgada.
function Sigmoide({ x, y, s = 1, rot = 0, L = 120, color = ES.hialino, borde = ES.hialBorde, o = 1 }) {
  const d = `M ${-L / 2} 0 C ${-L / 4} ${-L / 4} ${-L / 6} ${L / 5} 0 0 S ${L / 4} ${-L / 5} ${L / 2} ${-L / 12}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={d} stroke={borde} strokeWidth={10} fill="none" strokeLinecap="round" /><path d={d} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Espora ovalada (para la comparación de Webster).
function Ovalada({ x, y, s = 1, rot = 0 }) {
  return <ellipse cx={x} cy={y} rx={16 * s} ry={24 * s} transform={`rotate(${rot} ${x} ${y})`} fill={ES.hialino} stroke={ES.hialBorde} strokeWidth={3} />;
}
// Hoja de aliso (redonda, con borde aserrado y nervios). (x, y) = centro.
function HojaAliso({ x, y, s = 1, rot = 0, color = ES.hoja, color2 = ES.hoja2, nervio = ES.nervio, children }) {
  const N = 28, pts = Array.from({ length: N }, (_, i) => { const a = i / N * Math.PI * 2; const r = (i % 2 ? 92 : 100) * (1 + 0.12 * Math.cos(a - Math.PI / 2)); return `${(Math.cos(a) * r * 0.86).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={'M ' + pts.join(' L ') + ' Z'} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 -96 L 0 120" stroke={nervio} strokeWidth={6} /><line x1={0} y1={100} x2={0} y2={140} stroke={KC.ink} strokeWidth={7} />
    {[-60, -25, 10, 45].map((yy, i) => <g key={i}><path d={`M 0 ${yy} Q 40 ${yy - 22} 70 ${yy - 30}`} stroke={nervio} strokeWidth={4} fill="none" /><path d={`M 0 ${yy} Q -40 ${yy - 22} -70 ${yy - 30}`} stroke={nervio} strokeWidth={4} fill="none" /></g>)}
    <ellipse cx={-30} cy={20} rx={22} ry={14} fill={color2} opacity=".6" />
    {children}
  </g>;
}
// Espuma: racimo de burbujas color crema (gira despacito). p = cuánto se ha juntado (0..1). estrellas = cuántas titilan.
function Espuma({ T, x, y, w = 420, h = 150, p = 1, estrellas = 0, noche = 0, seed = 4 }) {
  const g = krng(seed), B = Array.from({ length: 70 }, () => [(g() - 0.5) * w, (g() - 0.5) * h * (0.6 + g() * 0.4), 10 + g() * 26, g()]);
  const S = Array.from({ length: 26 }, () => [(g() - 0.5) * w * 0.9, (g() - 0.5) * h * 0.7, g() * 360, 0.5 + g() * 0.5, g() * 6]);
  const col = mixHex(ES.espuma, ES.cielo, noche), col2 = mixHex(ES.espuma2, '#1b2a5a', noche);
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 0.6) * 3})`}>
    {B.map(([bx, by, r, k], i) => i / B.length <= p ? <circle key={i} cx={bx + Math.sin(T * 0.8 + i) * 3} cy={by} r={r} fill={k > 0.5 ? col : col2} stroke={noche > 0.5 ? '#2a3a6a' : '#c9b98a'} strokeWidth={2} opacity={0.95} /> : null)}
    {B.map(([bx, by, r], i) => i % 3 === 0 && i / B.length <= p ? <circle key={'b' + i} cx={bx - r * 0.3} cy={by - r * 0.35} r={r * 0.22} fill="#fff" opacity={0.7 * (1 - noche)} /> : null)}
    {S.slice(0, Math.round(estrellas)).map(([sx, sy, rr, ss, f], i) => { const tw = 0.55 + 0.45 * Math.sin(T * 4 + f);
      return <Estrella key={'s' + i} x={sx} y={sy} rot={rr} s={ss * (0.32 + noche * 0.12)} L={60} o={tw} color={noche > 0.5 ? '#fff8d6' : ES.hialino} borde={noche > 0.5 ? KC.gold2 : '#9fd8f0'} septos={false} />; })}
  </g>;
}
// Arroyo de lado a lado con piedras, remanso y tapón de ramitas. Las cosas que se ponen encima van como children.
function Arroyo({ T, y = 620, h = 1400, children, noche = 0 }) {
  const agua = mixHex(ES.agua, '#0b1640', noche), agua2 = mixHex(ES.agua2, '#08102e', noche);
  return <g>
    <rect x={0} y={y - 80} width={KW} height={100} fill={mixHex('#6fb43c', '#14301a', noche)} />
    <rect x={0} y={y} width={KW} height={h} fill={agua} />
    {Array.from({ length: 9 }, (_, i) => { const yy = y + 40 + i * 64, dx = ((T * 90 + i * 140) % (KW + 300)) - 150;
      return <path key={i} d={`M ${dx} ${yy} q 40 -10 80 0 t 80 0`} stroke={mixHex(ES.agua3, '#3a5aa0', noche)} strokeWidth={5} fill="none" opacity=".7" strokeLinecap="round" />; })}
    <rect x={0} y={y + h - 40} width={KW} height={40} fill={agua2} />
    {[[90, y + 520, 80], [980, y + 120, 70], [860, y + 560, 95], [200, y + 30, 50]].map(([cx, cy, r], i) => <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.62} fill={mixHex(ES.roca, '#1e2440', noche)} stroke={KC.ink} strokeWidth={6} />)}
    {/* tapón de ramitas */}
    {[[300, y + 210, 640, y + 250, 10], [330, y + 260, 660, y + 210, 8], [280, y + 235, 600, y + 290, 7], [360, y + 200, 560, y + 300, 6]].map(([a, b, c, d, w], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={mixHex(ES.rama, '#2a1e14', noche)} strokeWidth={w * 1.6} strokeLinecap="round" />)}
    {children}
  </g>;
}
// Larva de tricóptero triturador dentro de su casita de trocitos de hoja y ramita. (x, y) = cabeza.
function Larva({ T, x, y, s = 1, dir = 1 }) {
  const piezas = Array.from({ length: 9 }, (_, i) => i);
  return <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
    {/* casita: trocitos de hoja (cafés y verdes) y ramitas */}
    {piezas.map((i) => <rect key={i} x={40 + i * 26} y={-34 + (i % 2) * 6} width={34} height={64} rx={6} transform={`rotate(${(i % 3 - 1) * 12} ${57 + i * 26} 0)`} fill={i % 3 === 0 ? ES.hoja : i % 3 === 1 ? '#a8763a' : '#8fb04a'} stroke={KC.ink} strokeWidth={4} />)}
    <line x1={50} y1={30} x2={270} y2={26} stroke={ES.rama} strokeWidth={8} strokeLinecap="round" />
    {/* cabeza, patas */}
    <ellipse cx={18} cy={0} rx={34} ry={24} fill={ES.larva} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-6} cy={-2} rx={16} ry={16} fill="#7a4a1a" stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${10 + i * 14} 18 l ${-10 + Math.sin(T * 8 + i) * 6} 26`} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />)}
    <path d={`M -20 4 l -14 ${4 + Math.sin(T * 10) * 4}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Galleta (redonda) con o sin crema de cacahuate.
function Galleta({ x, y, s = 1, crema = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={110} fill={ES.galleta} stroke={KC.ink} strokeWidth={7} />
    {[[-50, -40], [30, -60], [55, 20], [-20, 50], [-60, 20], [10, -5]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#b7853a" />)}
    {crema > 0 && <path d={`M -90 ${-10} Q -60 -70 0 -66 Q 70 -70 92 -12 Q 70 ${40 * crema} 0 ${30 * crema} Q -60 ${40 * crema} -90 -10 Z`} fill={ES.crema} stroke={KC.ink} strokeWidth={5} opacity={crema} />}
    {crema > 0 && <path d="M -40 -40 Q 0 -54 40 -40" stroke="#d29a5a" strokeWidth={8} fill="none" opacity={crema} strokeLinecap="round" />}
  </g>;
}
// Banquito de tres patas.
function Banquito({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={90} ry={22} fill="#c98a4a" stroke={KC.ink} strokeWidth={6} />
    {[[-70, 120], [0, 135], [70, 120]].map(([a, b], i) => <line key={i} x1={a * 0.7} y1={10} x2={a} y2={b} stroke="#8a5a2a" strokeWidth={14} strokeLinecap="round" />)}
  </g>;
}
// Casita inglesa sencilla.
function Casita({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-150} width={240} height={150} fill="#f1e2c8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -145 -145 L 0 -260 L 145 -145 Z" fill="#a8432a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={60} y={-250} width={34} height={70} fill="#7a3a24" stroke={KC.ink} strokeWidth={5} />
    <rect x={-30} y={-90} width={60} height={90} fill="#5a3a22" stroke={KC.ink} strokeWidth={5} />
    {[-85, 55].map((wx) => <rect key={wx} x={wx} y={-125} width={40} height={40} fill="#ffe9a8" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Gran Bretaña muy esquemática (silueta simple) con un punto.
function MapaGB({ x, y, s = 1, p = 1 }) {
  const d = 'M 60 0 Q 90 10 80 50 Q 110 70 100 110 Q 130 150 120 200 Q 160 240 150 290 Q 190 320 170 360 Q 120 380 70 370 Q 20 380 10 350 Q 40 320 30 290 Q 0 260 30 230 Q 10 190 40 160 Q 10 120 30 90 Q 10 50 40 30 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={110} cy={290} r={16 * kEase.rebote(kclamp(p, 0, 1))} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Árbol a la orilla con tronco por donde escurre la lluvia.
function ArbolLluvia({ T, x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 0 Q -40 -300 -30 -520 L 30 -520 Q 40 -300 50 0 Z" fill={ES.tronco} stroke={KC.ink} strokeWidth={7} />
    {[-250, -150, -60].map((yy, i) => <path key={i} d={`M -30 ${yy} q 20 -20 50 -10`} stroke="#4a3220" strokeWidth={5} fill="none" />)}
    {[[-150, -600, 170], [80, -640, 180], [-20, -760, 170], [180, -520, 120], [-210, -480, 120]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={i % 2 ? '#3fae4a' : '#4cc35a'} stroke={KC.ink} strokeWidth={7} />)}
    {/* agua que escurre por el tronco (stemflow) */}
    <path d={`M 8 -520 Q 22 -380 6 -260 Q -8 -140 10 0`} stroke="#9fe3ff" strokeWidth={12} fill="none" opacity={0.85 * p} strokeDasharray="40 22" strokeDashoffset={-T * 120} strokeLinecap="round" />
  </g>;
}

const ESTR_GRID = Array.from({ length: 18 }, (_, i) => [180 + (i % 6) * 145, 760 + Math.floor(i / 6) * 150]);

function EspumaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Na: CUES.Natural, Z: CUES.Zoom, M: CUES.Medida, H: CUES.Hongos, Ga: CUES.Galleta, P: CUES.Pregunta, W: CUES.Webster, B: CUES.Banquito, I: CUES.Ingold, R: CUES.Ramitas, L: CUES.Lluvia, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la espuma en el remanso; el jabón se tacha; titilan estrellas */}
      <Escena T={T} a={K.G} b={K.Na} zoom={0.06} origen="45% 50%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<Arroyo T={T} y={520}>
          <Espuma T={T} x={420} y={830} w={460} h={170} p={klerp(0.55, 1, kprog(T, K.G, K.G + 1.2))} estrellas={kprog(T, K.G + 1.2, K.G + 2.8) * 18} />
          <g transform={`translate(830 ${1000}) rotate(${-10 + Math.sin(T * 3) * 4})`} opacity={kprog(T, K.G + 0.2, K.G + 0.5)}>
            <rect x={-55} y={-150} width={110} height={170} rx={24} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            <rect x={-25} y={-190} width={50} height={44} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            <text x={0} y={-50} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">JABÓN</text>
            <path d="M -80 -170 L 80 30 M 80 -170 L -80 30" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.G + 1.0, K.G + 1.3)} />
          </g>
        </Arroyo>)}
      </Escena>
      {/* 2 · espuma natural: hojas que caen y se pudren sueltan sustancias que hacen burbujas */}
      <Escena T={T} a={K.Na} b={K.Z} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={760} width={KW} height={560} fill={ES.agua} stroke={KC.ink} strokeWidth={6} />
          {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.Na + i * 0.5, K.Na + 1.4 + i * 0.5, kEase.sale); const podr = kprog(T, K.Na + 1.5 + i * 0.4, K.Na + 3.2 + i * 0.4);
            return <g key={i} transform={`translate(${190 + i * 230} ${klerp(420, 820, u)}) rotate(${Math.sin(T * 2 + i) * 20 * (1 - u) + i * 30})`}><HojaAliso x={0} y={0} s={0.55} color={mixHex(i % 2 ? ES.hoja : ES.hojaV, '#6a4a2a', podr)} /></g>; })}
          {Array.from({ length: 22 }, (_, i) => { const t0 = K.Na + 1.6 + i * 0.09, u = kprog(T, t0, t0 + 1.0); if (u <= 0) return null;
            return <circle key={i} cx={150 + (i * 83) % 820} cy={klerp(900, 770, u)} r={10 + (i % 4) * 5} fill={ES.espuma} stroke="#c9b98a" strokeWidth={2} opacity={0.9} />; })}
        </>)}
      </Escena>
      {/* 3–4 · al microscopio: esporas de 4 brazos en las burbujas; medida de Articulospora */}
      <Escena T={T} a={K.Z} b={K.H} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {T < K.M + 0.3 && <g opacity={1 - kprog(T, K.M - 0.1, K.M + 0.3)}>
            {[[300, 760, 210], [650, 960, 170], [330, 1110, 120]].map(([cx, cy, r], i) => <g key={i} opacity={kprog(T, K.Z + i * 0.25, K.Z + 0.5 + i * 0.25)}>
              <circle cx={cx} cy={cy} r={r} fill="rgba(160,220,255,.08)" stroke="rgba(200,240,255,.7)" strokeWidth={5} />
              <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.2} ry={r * 0.1} fill="#fff" opacity=".5" transform={`rotate(-30 ${cx - r * 0.35} ${cy - r * 0.4})`} />
            </g>)}
            {[[300, 552, 0], [470, 650, 40], [150, 860, -60], [650, 790, 15], [800, 1020, 70], [420, 1180, -20]].map(([sx, sy, r], i) =>
              <Estrella key={i} x={sx} y={sy} rot={r + Math.sin(T + i) * 6} s={kEase.rebote(kprog(T, K.Z + 0.8 + i * 0.18, K.Z + 1.2 + i * 0.18)) * 1.0} L={70} />)}
            <Sigmoide x={540} y={1100} rot={-20} L={170} o={kprog(T, K.Z + 2.0, K.Z + 2.4)} />
            <Sigmoide x={200} y={1010} rot={30} L={140} o={kprog(T, K.Z + 2.2, K.Z + 2.6)} />
          </g>}
          {T > K.M - 0.3 && <g opacity={kprog(T, K.M - 0.3, K.M + 0.2)}>
            {(() => { const s = 3.2, L = 90, cx = 400, cy = 900, a = -30 * Math.PI / 180, ex = cx + Math.cos(a) * L * s, ey = cy + Math.sin(a) * L * s, m = kprog(T, K.M + 1.0, K.M + 2.0, kEase.sale);
              return <>
                <Estrella x={cx} y={cy} s={s} L={L} ancho={6} rot={0} />
                {/* medidor sobre uno de los tres brazos que divergen */}
                <g transform={`translate(${cx} ${cy}) rotate(-30) translate(0 -46)`} opacity={m}>
                  <line x1={0} y1={0} x2={L * s * m} y2={0} stroke={KC.gold2} strokeWidth={6} />
                  <line x1={0} y1={-16} x2={0} y2={16} stroke={KC.gold2} strokeWidth={6} />
                  {m > 0.98 && <line x1={L * s} y1={-16} x2={L * s} y2={16} stroke={KC.gold2} strokeWidth={6} />}
                </g>
                <text x={ex + 10} y={ey - 70} textAnchor="middle" style={{ font:`700 46px ${KF.mono}` }} fill={KC.gold2} opacity={kprog(T, K.M + 1.8, K.M + 2.2)}>20–50 µm</text>
              </>; })()}
          </g>}
        </>)}
      </Escena>
      {/* 5 · por dentro de la hoja: hifas que la ablandan; sube la proteína */}
      <Escena T={T} a={K.H} b={K.Ga} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#151a12' }}></div>
        {fsvg(<>
          {/* células de la hoja */}
          {Array.from({ length: 48 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8), bl = kprog(T, K.H + 1.5 + (c + r) * 0.12, K.H + 3.5 + (c + r) * 0.12);
            return <rect key={i} x={60 + c * 122 + (r % 2) * 30} y={560 + r * 108} width={110} height={96} rx={14 + bl * 26} fill={mixHex('#5a8a2a', '#8a6a3a', bl)} stroke={mixHex('#2f4a14', '#5a4020', bl)} strokeWidth={6 - bl * 3} opacity={1 - bl * 0.25} />; })}
          {/* hifas: crecen por la punta y se ramifican entre las células */}
          {[[[0, 610], [250, 666], [520, 662], [780, 776], [1080, 770]], [[250, 666], [270, 880], [400, 990], [380, 1180]], [[520, 662], [640, 880], [880, 990], [1080, 1100]], [[640, 880], [560, 1100], [700, 1200]]].map((ruta, k) => {
            const g = kprog(T, K.H + 0.2 + k * 0.4, K.H + 2.6 + k * 0.4); const n = ruta.length - 1, f = g * n, j = Math.min(n - 1, Math.floor(f)), u = f - j;
            const pts = ruta.slice(0, j + 1).concat([[klerp(ruta[j][0], ruta[j + 1][0], u), klerp(ruta[j][1], ruta[j + 1][1], u)]]);
            return g > 0 ? <polyline key={k} points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke="#eafff7" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" style={{ filter:'drop-shadow(0 0 8px rgba(160,255,220,.7))' }} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · la larva elige la hoja con hongo · galleta seca vs galleta con crema de cacahuate */}
      <Escena T={T} a={K.Ga} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaAliso x={250} y={640} s={0.95} color="#d9a46a" />
          <HojaAliso x={720} y={640} s={0.95} color="#b07a3a">
            {[[-40, -30], [20, 10], [-10, 50], [40, -50], [-50, 30]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={16} fill="none" stroke="#f6fff0" strokeWidth={4} strokeDasharray="6 6" />)}
          </HojaAliso>
          <Larva T={T} x={klerp(500, 600, kprog(T, K.Ga + 0.6, K.Ga + 2.0, kEase.suave))} y={840} s={1.1} />
          <g opacity={kprog(T, K.Ga + 2.6, K.Ga + 3.0)}>
            <Galleta x={250} y={1650} s={0.75} crema={0} />
            <text x={500} y={1675} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>VS</text>
            <Galleta x={740} y={1650} s={0.75} crema={kprog(T, K.Ga + 3.2, K.Ga + 3.8)} />
          </g>
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y por qué estrellas? */}
      <Escena T={T} a={K.P} b={K.W} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Estrella x={300} y={860} rot={T * 40} s={3.4} L={70} color="#ffffff" borde={KC.ink} ancho={8} /><Interrogacion T={T} x={300} y={1230} tam={300} /></>)}
      </Escena>
      {/* 8 · Webster 1959: caen a la misma velocidad; al chocar, las estrellas se quedan */}
      <Escena T={T} a={K.W} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={160} y={520} width={760} height={600} rx={30} fill="rgba(200,240,255,.55)" stroke={KC.ink} strokeWidth={8} />
          <rect x={160} y={1090} width={760} height={30} fill="#d6dde6" stroke={KC.ink} strokeWidth={6} />
          {(() => { const u = kprog(T, K.W + 1.6, K.W + 4.0), yy = klerp(560, 1070, u), reb = kprog(T, K.W + 4.0, K.W + 4.8, kEase.sale);
            return <>
              <Ovalada x={290 + reb * 90} y={yy - reb * 60 + reb * reb * 40} s={2.2} rot={reb * 120} />
              <Sigmoide x={540} y={yy - 10} rot={u * 30} L={120} s={1.6} borde={KC.ink} />
              <Estrella x={790} y={yy - 40} rot={180} s={1.7} L={50} borde={KC.ink} />
              <text x={290} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>ovalada</text>
              <text x={540} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>en S</text>
              <text x={790} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>estrella</text>
              {reb > 0.6 && <path d="M 760 1040 l 24 24 l 44 -54" stroke="#118a3a" strokeWidth={12} fill="none" strokeLinecap="round" opacity={kprog(T, K.W + 4.5, K.W + 4.8)} />}
            </>; })()}
        </>)}
      </Escena>
      {/* 9 · aterriza como banquito, en tres puntas (hipótesis; depende de la especie) */}
      <Escena T={T} a={K.B} b={K.I} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={60} y={1010} width={960} height={70} rx={20} fill={ES.hoja} stroke={KC.ink} strokeWidth={7} />
          <path d="M 80 1045 L 1000 1045" stroke={ES.nervio} strokeWidth={6} />
          {(() => { const u = kprog(T, K.B + 0.3, K.B + 1.5, kEase.rebote), s = 2.6, L = 70, a1 = 35 * Math.PI / 180, dy = Math.sin(a1) * L * s, dx = Math.cos(a1) * L * s;
            // vista de lado: el brazo de base apunta arriba y los tres brazos bajan; el del centro va hacia ti (se ve más corto), así las tres puntas tocan la hoja
            const cy = klerp(520, 1010 - dy, u), puntas = [[-dx, dy], [0, dy], [dx, dy]];
            return <g>
              <g transform={`translate(420 ${cy})`}>
                {[[0, 0, 0, -L * s * 0.45], ...puntas.map(([a, b]) => [0, 0, a, b])].map(([a, b, c, d], i) => <g key={i}>
                  <line x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
                  <line x1={a} y1={b} x2={c} y2={d} stroke={i === 2 ? '#d8f2ff' : ES.hialino} strokeWidth={17} strokeLinecap="round" /></g>)}
                <circle r={16} fill={ES.hialino} stroke={KC.ink} strokeWidth={4} />
              </g>
              {T > K.B + 1.4 && puntas.map(([a], k) => <circle key={k} cx={420 + a} cy={1010} r={20 * kprog(T, K.B + 1.4 + k * 0.1, K.B + 1.7 + k * 0.1, kEase.rebote)} fill="none" stroke={KC.gold2} strokeWidth={7} />)}
            </g>; })()}
          <g opacity={kprog(T, K.B + 1.8, K.B + 2.3)}><Banquito x={830} y={800} s={1} /></g>
        </>)}
      </Escena>
      {/* 10 · Ingold: arroyo detrás de su casa, Inglaterra; publica en 1942 */}
      <Escena T={T} a={K.I} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <path d="M 0 1110 Q 300 1060 540 1120 T 1080 1100 L 1080 1200 L 0 1200 Z" fill={ES.agua} stroke={KC.ink} strokeWidth={6} />
          <g opacity={kprog(T, K.I + 0.1, K.I + 0.6)}><Casita x={300} y={1070} s={1.15} /></g>
          <g opacity={kprog(T, K.I + 0.8, K.I + 1.3)}><MapaGB x={760} y={560} s={0.95} p={kprog(T, K.I + 1.3, K.I + 1.8)} /></g>
        </>)}
      </Escena>
      {/* 11 · espuma tras las ramitas; una lupa saca estrellas; cuadrícula de formas */}
      <Escena T={T} a={K.R} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.R + 2.6 && <g opacity={1 - kprog(T, K.R + 2.2, K.R + 2.6)}><Arroyo T={T} y={420}>
            <Espuma T={T} x={440} y={720} w={420} h={150} estrellas={0} />
          </Arroyo>
            <g transform={`translate(${klerp(1000, 470, kprog(T, K.R + 0.4, K.R + 1.2, kEase.sale))} 700)`}>
              <circle r={120} fill="rgba(14,20,36,.92)" stroke={KC.ink} strokeWidth={14} />
              <Estrella x={-30} y={10} s={0.8} L={60} /><Estrella x={40} y={-30} s={0.6} rot={50} L={60} /><Sigmoide x={20} y={50} s={0.6} L={120} rot={-10} />
              <line x1={85} y1={85} x2={170} y2={170} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
            </g></g>}
          {ESTR_GRID.map(([gx, gy], i) => { const on = kprog(T, K.R + 2.6 + i * 0.08, K.R + 2.9 + i * 0.08, kEase.rebote); if (on <= 1e-3) return null;
            return <g key={i}><circle cx={gx} cy={gy} r={62} fill="rgba(14,20,36,.85)" stroke={KC.ink} strokeWidth={5} />
              {i % 4 === 3 ? <Sigmoide x={gx} y={gy} s={on * 0.7} rot={i * 20} L={150} color="#fff8d6" borde={KC.gold2} /> : <Estrella x={gx} y={gy + 8} s={on * (0.75 + (i % 3) * 0.08)} rot={i * 37} L={60} color="#fff8d6" borde={KC.gold2} />}</g>; })}
        </>)}
      </Escena>
      {/* 12 · también en la lluvia que escurre por los troncos */}
      <Escena T={T} a={K.L} b={K.C} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fb3d9, #bfe0f2)' }}></div>
        {fsvg(<>
          {Array.from({ length: 40 }, (_, i) => { const x0 = (i * 97) % KW, y0 = ((T * 900 + i * 173) % 1500) + 300; return <line key={i} x1={x0} y1={y0} x2={x0 - 8} y2={y0 + 40} stroke="#e6f6ff" strokeWidth={4} opacity=".8" />; })}
          <rect x={0} y={1140} width={KW} height={80} fill={ES.agua} stroke={KC.ink} strokeWidth={6} />
          <ArbolLluvia T={T} x={300} y={1150} s={0.95} />
          {(() => { const g = kprog(T, K.L + 1.2, K.L + 2.0, kEase.rebote); return <g transform={`translate(720 ${820}) scale(${g})`}>
            <path d="M 0 -200 Q 150 0 140 70 Q 120 170 0 170 Q -120 170 -140 70 Q -150 0 0 -200 Z" fill="rgba(170,225,255,.85)" stroke={KC.ink} strokeWidth={8} />
            <Estrella x={0} y={70} s={1.3} L={60} borde={'#3a7aa0'} />
          </g>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo remanso del inicio; la espuma se vuelve un cielo de estrellas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 50%">
        <FondoLunares color={mixHex(KC.cyan, '#0b1a3a', kprog(T, K.C + 0.6, K.C + 2.2))} punto={`rgba(255,255,255,${0.33 * (1 - kprog(T, K.C + 0.6, K.C + 2.2))})`} />
        {fsvg(<Arroyo T={T} y={520} noche={kprog(T, K.C + 0.6, K.C + 2.2)}>
          <Espuma T={T} x={420} y={830} w={460} h={170} estrellas={klerp(18, 26, kprog(T, K.C + 0.8, K.C + 2.2))} noche={kprog(T, K.C + 0.6, K.C + 2.2)} />
        </Arroyo>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.4} until={K.Na - 0.3} x={60} y={470} texto="espuma del remanso" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Na + 1.8} until={K.Z - 0.3} x={60} y={470} texto="espuma natural" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Na + 2.2} until={K.Z - 0.3} x={60} y={525} texto="de hojas que se pudren" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Na + 2.6} until={K.Z - 0.3} texto="también existe espuma de contaminación: esa es otra" x={KW / 2} y={680} tam={26} borde={KC.red} />
      <Chip T={T} at={K.Z + 0.1} until={K.M - 0.3} texto="AL MICROSCOPIO · LA ESPUMA" x={420} y={460} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Z + 1.3} until={K.M - 0.3} x={60} y={1500} texto="esporas de 4 brazos" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Z + 2.2} until={K.M - 0.3} x={60} y={1550} texto="y en S (sigmoides)" tam={30} color={KC.texto} />
      <Etq T={T} at={K.M + 0.3} until={K.H - 0.3} x={60} y={470} texto="Articulospora tetracladia" it tam={40} color={KC.texto} />
      <Etq T={T} at={K.M + 0.7} until={K.H - 0.3} x={60} y={525} texto="espora (conidio), incolora" tam={28} color={KC.texto} />
      <Etq T={T} at={K.M + 2.4} until={K.H - 0.3} x={60} y={1500} texto="= hasta 0.05 mm por brazo" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.H + 0.1} until={K.Ga - 0.3} texto="POR DENTRO · UNA HOJA EN EL AGUA" x={360} y={460} tam={30} borde={KC.mint} mono />
      <Etq T={T} at={K.H + 0.8} until={K.Ga - 0.3} x={60} y={525} texto="hifas de hongos acuáticos" tam={30} color="#eafff7" />
      <Medidor T={T} at={K.H + 1.6} until={K.Ga - 0.3} etiqueta="dureza de la hoja" valor={(t) => klerp(0.9, 0.35, kprog(t, K.H + 1.8, K.H + 4.2))} texto={() => ''} x={90} y={1490} ancho={420} color={KC.orange} />
      <Medidor T={T} at={K.H + 2.4} until={K.Ga - 0.3} etiqueta="proteína" valor={(t) => klerp(0.2, 0.8, kprog(t, K.H + 2.6, K.H + 4.6))} texto={() => ''} x={570} y={1490} ancho={420} color={KC.mint} />
      <Etq T={T} at={K.Ga + 0.4} until={K.P - 0.3} x={60} y={480} texto="larva de tricóptero" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ga + 0.8} until={K.P - 0.3} x={60} y={530} texto="casita de trocitos de hoja" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Ga + 1.6} until={K.Ga + 2.6} texto="elige la hoja con hongo" x={720} y={1500} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.Ga + 0.3} until={K.Ga + 2.6} x={60} y={1500} texto="hoja sin hongo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ga + 2.8} until={K.P - 0.3} x={170} y={1530} texto="hoja sola" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ga + 3.4} until={K.P - 0.3} x={640} y={1530} texto="con hongo" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.W + 0.1} until={K.W + 1.5} anio="1959" quien="J. Webster · laboratorio" revista="Annals of Botany, 1959" x={540} y={820} />
      <Cronometro T={T} at={K.W + 1.6} until={K.B - 0.3} factor={1} x={540} y={470} etiqueta="CAEN A LA MISMA VELOCIDAD" />
      <Chip T={T} at={K.W + 4.3} until={K.B - 0.3} texto="la estrella se atora al chocar" x={540} y={1500} tam={30} borde={KC.ink} fondo="rgba(14,15,18,.85)" />
      <Chip T={T} at={K.B + 1.9} until={K.I - 0.3} texto="hipótesis: aterriza en 3 puntas" x={KW / 2} y={1500} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.B + 3.0} until={K.I - 0.3} texto="no en todas las especies" x={KW / 2} y={1590} tam={30} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.I + 2.4} until={K.R - 0.3} anio="1942" quien="C. T. Ingold publica · Inglaterra" revista="Trans. Br. Mycol. Soc., 1942" x={420} y={640} />
      <Etq T={T} at={K.I + 0.8} until={K.I + 2.3} x={60} y={520} texto="el arroyo detrás de su casa" tam={32} color={KC.ink} />
      <Etq T={T} at={K.I + 1.6} until={K.R - 0.3} x={640} y={980} texto="Inglaterra" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 0.3} until={K.R + 2.4} x={60} y={470} texto="espuma tras unas ramitas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.R + 2.8} until={K.L - 0.3} texto="más de 300 especies descritas · estudio de 2022" x={KW / 2} y={1500} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.L + 0.4} until={K.C - 0.3} x={60} y={1500} texto="agua que escurre" tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 0.8} until={K.C - 0.3} x={60} y={1550} texto="por troncos y hojas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no es jabón: es un cielo de estrellas de hongo" x={KW / 2} y={1500} tam={28} borde={KC.gold2} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Na} texto="10 cm" largo={160} color={KC.texto} />
      <BarraEscala T={T} at={K.Na} until={K.Z} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.Z} until={K.M} texto="50 µm" largo={170} />
      <BarraEscala T={T} at={K.M} until={K.H} texto="50 µm" largo={260} />
      <BarraEscala T={T} at={K.H} until={K.Ga} texto="20 µm" largo={110} y={1360} />
      <BarraEscala T={T} at={K.Ga} until={K.P} texto="1 cm · esquemático" largo={120} />
      <BarraEscala T={T} at={K.P} until={K.W} texto="50 µm" largo={240} />
      <BarraEscala T={T} at={K.W} until={K.B} texto="esquema del experimento" largo={0} />
      <BarraEscala T={T} at={K.B} until={K.I} texto="50 µm" largo={180} />
      <BarraEscala T={T} at={K.I} until={K.R} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.R} until={K.L} texto="esporas: 50 µm · esquemático" largo={90} />
      <BarraEscala T={T} at={K.L} until={K.C} texto="1 m · esquemático" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Na - 0.1} texto="No es jabón: *está llena de estrellas.*" />
      <Subtitulo T={T} idx={1} at={K.Na + 0.1} until={K.Z - 0.1} texto="Es natural: *sale de hojas que se pudren.*" />
      <Subtitulo T={T} idx={2} at={K.Z + 0.1} until={K.M - 0.1} texto="Esporas de *cuatro brazos.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.H - 0.1} texto="Cada brazo: *hasta 0.05 mm.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.Ga - 0.1} texto="Ablandan la hoja y *le suben la proteína.*" />
      <Subtitulo T={T} idx={5} at={K.Ga + 0.1} until={K.P - 0.1} texto="Galleta seca vs. *galleta con crema.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.W - 0.1} texto="¿Y por qué *estrellas?*" />
      <Subtitulo T={T} idx={7} at={K.W + 0.1} until={K.B - 0.1} texto="1959: caen igual, pero *se atoran mejor.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.I - 0.1} texto="Se cree: *aterrizan en tres puntas.*" />
      <Subtitulo T={T} idx={9} at={K.I + 0.1} until={K.R - 0.1} texto="Cecil Ingold: *publicó en 1942.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.L - 0.1} texto="Hoy, *más de 300 especies.*" />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.C - 0.1} texto="Hasta en *la lluvia de los troncos.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un cielo de *estrellas de hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Z + 0.4, K.Z + 3.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 1.5, K.H + 5.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ga + 1.8, K.Ga + 5.6, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.W + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.B + 0.5, K.B + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.R + 1.5, K.R + 5.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.L + 0.4, K.L + 4.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="130" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EspumaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EspumaShot /></CompositionStage></div>;
}
window.EspumaApp = EspumaApp;
