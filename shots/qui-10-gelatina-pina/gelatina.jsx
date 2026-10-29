// Shot Químico #10 · Esta gelatina no se echó a perder (la piña fresca y la bromelina) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const GEL = '#e8336d', GEL2 = '#ff7aa2', PINA = '#ffd84a', PINA_OSC = '#c98a12', HOJA = '#2e9e4f', AGUA = '#7fc8ff', TIJ = '#ffe11a';

/* ---------- piezas de este shot ---------- */
// Trozo de piña fresca (cuña con "ojos") o de lata (pedazo de rodaja, liso).
function TrozoPina({ x, y, s = 1, rot = 0, lata = false }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {lata ? <path d="M -34 -14 A 40 40 0 0 1 34 -14 L 20 10 A 22 22 0 0 0 -20 10 Z" fill="#ffe680" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      : <g><path d="M -30 18 L 0 -30 L 30 18 Z" fill={PINA} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={-8} cy={6} r={4} fill={PINA_OSC} /><circle cx={9} cy={2} r={4} fill={PINA_OSC} /><circle cx={0} cy={-10} r={3.5} fill={PINA_OSC} /></g>}
  </g>;
}
// Gelatina en su plato. firme: 0 = charco líquido, 1 = molde firme que tiembla. pina: 'fresca' | 'lata' | null.
function Gelatina({ T, x, y, s = 1, firme = 1, pina = 'fresca', boing = 0 }) {
  const H = klerp(16, 250, firme), W = klerp(280, 190, firme), Wt = klerp(262, 130, firme);
  const tb = firme > 0.5 ? Math.sin(T * 9) * 0.025 * firme + boing * Math.sin(T * 26) * 0.08 : 0;
  const R = krng(firme > 0.5 ? 11 : 12);
  const trozos = Array.from({ length: 7 }, (_, i) => [(R() - 0.5) * (firme > 0.5 ? 2 * Wt : 2 * W - 80), firme > 0.5 ? -H * (0.2 + R() * 0.6) : -6 - R() * 10, R() * 360]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={320} ry={64} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={4} rx={250} ry={40} fill="#eef3f6" />
    <g transform={`skewX(${tb * 40}) scale(${1 - tb} ${1 + tb})`}>
      <path d={`M ${-W} 0 Q ${-W - 10} ${-H * 0.35} ${-Wt} ${-H} Q 0 ${-H - 30 * firme} ${Wt} ${-H} Q ${W + 10} ${-H * 0.35} ${W} 0 Q 0 ${26} ${-W} 0 Z`}
        fill={GEL} fillOpacity={0.85} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {firme > 0.5 && [-0.5, 0, 0.5].map((k) => <path key={k} d={`M ${k * W * 0.9} -8 Q ${k * Wt * 1.05} ${-H * 0.5} ${k * Wt * 0.9} ${-H + 8}`} stroke="rgba(120,0,40,.35)" strokeWidth={6} fill="none" />)}
      <path d={`M ${-Wt * 0.6} ${-H + 18} Q ${-Wt * 0.2} ${-H - 4} ${Wt * 0.2} ${-H + 14}`} stroke="rgba(255,255,255,.6)" strokeWidth={10} fill="none" strokeLinecap="round" />
      {pina && trozos.map(([tx, ty, r], i) => <TrozoPina key={i} x={tx} y={ty} rot={r} s={firme > 0.5 ? 0.9 : 0.8} lata={pina === 'lata'} />)}
      {firme < 0.3 && [0, 1, 2].map((i) => { const f = ((T * 0.7 + i / 3) % 1); return <ellipse key={i} cx={-40 + i * 60} cy={-8} rx={30 + f * 120} ry={(30 + f * 120) * 0.18} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={4} opacity={1 - f} />; })}
    </g>
  </g>;
}
// Cuchara que se mete al charco.
function Cuchara({ x, y, rot = -30, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-330} width={28} height={280} rx={14} fill="#c9d3dc" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={56} ry={74} fill="#dfe6ec" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-12} cy={-14} rx={18} ry={30} fill="#fff" opacity={0.7} />
  </g>;
}
// Piña entera con corona.
function PinaEntera({ x, y, s = 1, rot = 0 }) {
  const ojos = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) ojos.push([-75 + c * 50 + (r % 2) * 25, -120 + r * 48]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-50, -25, 0, 25, 50].map((a, i) => <path key={i} d={`M 0 -150 Q ${a * 2.2} ${-260 - (i % 2) * 40} ${a * 3.2} ${-330 + Math.abs(a) * 1.5} Q ${a * 0.6} -230 0 -150 Z`} fill={i % 2 ? HOJA : '#47c46a'} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    <ellipse cx={0} cy={0} rx={120} ry={165} fill="#f2b632" stroke={KC.ink} strokeWidth={8} />
    <clipPath id="clipPina"><ellipse cx={0} cy={0} rx={116} ry={161} /></clipPath>
    <g clipPath="url(#clipPina)">{ojos.map(([ox, oy], i) => <path key={i} d={`M ${ox} ${oy - 22} L ${ox + 24} ${oy} L ${ox} ${oy + 22} L ${ox - 24} ${oy} Z`} fill="#e39b1f" stroke="#8a5a10" strokeWidth={4} />)}</g>
  </g>;
}
// Rodaja de piña (corte) vista de frente.
function RodajaPina({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={190} fill="#c9a227" stroke={KC.ink} strokeWidth={8} />
    <circle r={168} fill={PINA} />
    {Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 50} y1={Math.sin(a) * 50} x2={Math.cos(a) * 160} y2={Math.sin(a) * 160} stroke="#f0bf2a" strokeWidth={5} />; })}
    <circle r={44} fill="#fff3b0" stroke="#e0b73a" strokeWidth={5} />
  </g>;
}
// Tijera (la bromelina, esquemática). abre 0..1; apagada = hojas sueltas y grises (enzima desnaturalizada).
function Tijera({ x, y, s = 1, rot = 0, abre = 0.5, apagada = 0 }) {
  const ang = 4 + abre * 24, sep = apagada * 40, c = mixHex(TIJ, '#8a8f99', apagada), mango = mixHex(KC.pink, '#6b7078', apagada);
  const hoja = (sg) => <g transform={`translate(${sep * sg * 0.6} ${sep * sg}) rotate(${sg * ang + apagada * sg * 50})`}>
    <path d={`M -10 0 L 110 ${sg * -4} Q 120 0 110 ${sg * 6} L -10 ${sg * 10} Z`} fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M -10 ${sg * 4} L -50 ${sg * 14}`} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-70} cy={sg * 22} rx={26} ry={18} fill="none" stroke={mango} strokeWidth={12} />
    <ellipse cx={-70} cy={sg * 22} rx={26} ry={18} fill="none" stroke={KC.ink} strokeWidth={3} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={1 - apagada * 0.25}>
    {hoja(1)}{hoja(-1)}
    <circle r={8} fill={KC.ink} opacity={1 - apagada} />
  </g>;
}
// Triple hélice corta (zona de amarre de la red).
function Helice({ T, x, y, largo = 70, rot = 0, s = 1, o = 1 }) {
  const cols = [KC.gold2, GEL2, '#fff'];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {cols.map((c, k) => { let d = ''; for (let i = 0; i <= 16; i++) { const u = i / 16, xx = -largo / 2 + u * largo, yy = Math.sin(u * Math.PI * 4 + k * 2.1 + T * 2) * 12; d += (i ? ' L ' : 'M ') + xx.toFixed(1) + ' ' + yy.toFixed(1); }
      return <path key={k} d={d} stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Red de gelatina: nodos en cuadrícula; cada borde es una cadena. forma 0..1 (cadenas sueltas → red); cortes: tiempos de corte por borde.
const RED_X0 = 150, RED_Y0 = 730, RED_DX = 195, RED_DY = 145, RED_C = 5, RED_F = 4;
const RED_NODOS = []; for (let f = 0; f < RED_F; f++) for (let c = 0; c < RED_C; c++) RED_NODOS.push([RED_X0 + c * RED_DX, RED_Y0 + f * RED_DY]);
const RED_BORDES = []; for (let f = 0; f < RED_F; f++) for (let c = 0; c < RED_C; c++) { const i = f * RED_C + c; if (c < RED_C - 1) RED_BORDES.push([i, i + 1]); if (f < RED_F - 1) RED_BORDES.push([i, i + RED_C]); }
const RED_RND = (() => { const R = krng(21); return RED_BORDES.map(() => [[100 + R() * 880, 680 + R() * 560], [100 + R() * 880, 680 + R() * 560], R() * 6]); })();
const RED_ORDEN = (() => { const R = krng(33); return RED_BORDES.map((_, i) => [R(), i]).sort((a, b) => a[0] - b[0]).map((p) => p[1]); })();
function cadenaPath(ax, ay, bx, by, onda, T, fase) {
  const n = 10, dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  let d = '';
  for (let i = 0; i <= n; i++) { const u = i / n, w = Math.sin(u * Math.PI * 3 + fase + T * 2) * onda * Math.sin(u * Math.PI);
    d += (i ? ' L ' : 'M ') + (ax + dx * u + nx * w).toFixed(1) + ' ' + (ay + dy * u + ny * w).toFixed(1); }
  return d;
}
function RedGelatina({ T, forma = 1, corteDe, agua = 0, fuga = 0 }) {
  const hel = kprog(forma, 0.55, 1);
  return <g>
    {/* agua atrapada en los huecos */}
    {agua > 0 && RED_NODOS.map(([x, y], i) => { if (i % RED_C === RED_C - 1 || i >= RED_C * (RED_F - 1)) return null;
      const cx = x + RED_DX / 2 + Math.sin(T * 2 + i) * 6, cy = y + RED_DY / 2 + Math.cos(T * 2.4 + i) * 6 + fuga * (500 + (i % 3) * 140);
      return <g key={'w' + i} opacity={agua * (1 - fuga * 0.8)}><circle cx={cx} cy={cy} r={22} fill={AGUA} stroke="#cfe9ff" strokeWidth={3} />
        <text x={cx} y={cy + 6} textAnchor="middle" style={{ font:`700 15px ${KF.mono}` }} fill={KC.ink}>H₂O</text></g>; })}
    {RED_BORDES.map(([a, b], i) => {
      const [ra, rb, fase] = RED_RND[i];
      const ax = klerp(ra[0], RED_NODOS[a][0], forma), ay = klerp(ra[1], RED_NODOS[a][1], forma);
      const bx = klerp(rb[0], RED_NODOS[b][0], forma), by = klerp(rb[1], RED_NODOS[b][1], forma);
      const tc = corteDe ? corteDe(i) : Infinity;
      if (T < tc) return <path key={i} d={cadenaPath(ax, ay, bx, by, klerp(22, 10, forma), T, fase)} stroke={KC.gold2} strokeWidth={7} fill="none" strokeLinecap="round" />;
      const p = kprog(T, tc, tc + 2.2, kEase.sale), mx = (ax + bx) / 2, my = (ay + by) / 2;
      const trozo = (x0, y0, x1, y1, sg) => { const ox = sg * 50 * p + Math.sin(fase) * 40 * p, oy = 90 * p * (1 + (i % 3)) * 0.5;
        const cx = (x0 + x1) / 2 + ox, cy = (y0 + y1) / 2 + oy, r = (fase * 60 + T * 40 * sg) * p;
        return <g transform={`rotate(${r} ${cx} ${cy})`}><path d={cadenaPath(x0 + ox, y0 + oy, klerp(x1, x0, 0.25 * p) + ox, klerp(y1, y0, 0.25 * p) + oy, 6, T, fase)} stroke={mixHex(KC.gold2, '#d9b26a', p)} strokeWidth={7} fill="none" strokeLinecap="round" /></g>; };
      return <g key={i}>{trozo(ax, ay, mx, my, -1)}{trozo(mx, my, bx, by, 1)}</g>;
    })}
    {hel > 0 && RED_NODOS.map(([x, y], i) => { const cortado = corteDe && RED_BORDES.some(([a, b], k) => (a === i || b === i) && T >= corteDe(k));
      return cortado ? null : <Helice key={'h' + i} T={T} x={x} y={y} largo={70} rot={(i * 47) % 180} o={hel} />; })}
  </g>;
}
// Termómetro vertical. v 0..1 = altura del mercurio.
function TermoG({ x, y, s = 1, v = 0.5, texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-300} width={44} height={300} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={-290 + 270 * (1 - v)} width={20} height={270 * v + 10} rx={10} fill={KC.red} />
    <circle cx={0} cy={20} r={38} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[0.2, 0.4, 0.6, 0.8].map((m) => <line key={m} x1={22} x2={42} y1={-20 - 270 * m} y2={-20 - 270 * m} stroke={KC.ink} strokeWidth={4} />)}
    {texto && <text x={60} y={-290 + 270 * (1 - v) + 14} style={{ font:`700 56px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={2}>{texto}</text>}
  </g>;
}
// Lata de piña.
function LataPina({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-150} width={220} height={300} rx={18} fill="#c9d3dc" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-150} rx={110} ry={26} fill="#e6edf2" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={-100} width={220} height={190} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <TrozoPina x={-40} y={-20} s={1.3} lata /><TrozoPina x={40} y={-30} s={1.3} rot={30} lata />
    <text x={0} y={60} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>PIÑA</text>
  </g>;
}
// Olla con agua hirviendo.
function Olla({ T, x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-230} width={520} height={260} rx={30} fill="#9aa3b5" stroke={KC.ink} strokeWidth={9} />
    <rect x={-300} y={-200} width={50} height={26} rx={10} fill={KC.ink} /><rect x={250} y={-200} width={50} height={26} rx={10} fill={KC.ink} />
    <rect x={-240} y={-200} width={480} height={210} rx={20} fill={AGUA} opacity={0.7} />
    {children}
    <Burbujas T={T} x={-230} y={-210} w={460} h={200} n={22} color="rgba(255,255,255,.85)" vel={220} seed={4} rmax={12} />
    {[-140, 0, 140].map((dx, i) => { const f = (T * 0.6 + i * 0.33) % 1; return <path key={i} d={`M ${dx} ${-260 - f * 160} q 30 -30 0 -60 q -30 -30 0 -60`} stroke="rgba(255,255,255,.85)" strokeWidth={10} fill="none" strokeLinecap="round" opacity={1 - f} />; })}
  </g>;
}
// Kiwi partido por la mitad.
function KiwiMitad({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={78} ry={62} fill="#7a5a30" stroke={KC.ink} strokeWidth={6} />
    <ellipse rx={68} ry={53} fill="#8cc63f" />
    <ellipse rx={24} ry={18} fill="#f4f7d8" />
    {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <ellipse key={i} cx={Math.cos(a) * 34} cy={Math.sin(a) * 27} rx={4} ry={7} transform={`rotate(${a * 57.3 + 90} ${Math.cos(a) * 34} ${Math.sin(a) * 27})`} fill={KC.ink} />; })}
  </g>;
}
// Tubo de ensayo con jugo y tijeras dentro, en baño de agua.
function BanoTubo({ T, x, y, temp, apaga = 0, burbujas = false }) {
  return <g>
    <VasoLab x={x} y={y} s={1} liquido={AGUA} nivel={0.7} ancho={300} alto={380} marcas={false}>
      {burbujas && <Burbujas T={T} x={-140} y={-260} w={280} h={250} n={20} color="rgba(255,255,255,.9)" vel={240} seed={9} />}
    </VasoLab>
    <g transform={`translate(${x + 20} ${y - 420})`}>
      <rect x={-40} y={0} width={80} height={330} rx={40} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
      <rect x={-34} y={110} width={68} height={214} rx={34} fill={PINA} opacity={0.85} />
      <Tijera x={0} y={190} s={0.42} rot={-90 + Math.sin(T * 3) * 10} abre={apaga > 0.5 ? 0.2 : Math.abs(Math.sin(T * 7))} apagada={apaga} />
      <Tijera x={0} y={270} s={0.42} rot={90 + Math.sin(T * 2.4) * 10} abre={apaga > 0.5 ? 0.2 : Math.abs(Math.sin(T * 6 + 1))} apagada={apaga} />
    </g>
    <TermoG x={x - 110} y={y - 120} s={0.6} v={temp === 80 ? 0.85 : 0.45} />
    <text x={x} y={y - 470} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={temp === 80 ? KC.red : KC.ink} stroke={KC.ink} strokeWidth={temp === 80 ? 3 : 0}>{temp} °C</text>
  </g>;
}
// Barra de actividad (SVG).
function BarraAct({ x, y, v, texto }) {
  return <g>
    <rect x={x - 130} y={y} width={260} height={44} rx={22} fill="rgba(0,0,0,.55)" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 124} y={y + 6} width={Math.max(0, 248 * v)} height={32} rx={16} fill={v > 0.5 ? KC.mint : KC.red} />
    <text x={x} y={y + 90} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

/* ---------- el shot ---------- */
function Gelatina10() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Rd: CUES.Red, Br: CUES.Bromelina, Co: CUES.Corta, Pr: CUES.Pregunta, Es: CUES.Estudio, La: CUES.Lata, Ki: CUES.Kiwi, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const dCo = K.Pr - K.Co;
  const corteDe = (i) => K.Co + 0.5 + RED_ORDEN.indexOf(i) * ((dCo - 1.6) / RED_BORDES.length);
  const forma = kprog(T, K.Rd + 1.2, K.Rd + 4.2, kEase.suave);
  const cuchara = kprog(T, K.G, K.G + 0.6, kEase.sale);
  const tubos = K.Es + 2.6, tFin = K.Ou - 0.1;
  const dEs = Math.max(1, K.La - 0.3 - (tubos + 0.3));
  // tijeras que salen de la rodaja
  const tijerasBr = [[-260, -420], [-80, -470], [120, -440], [260, -330], [-220, -230], [200, -200]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la gelatina líquida con piña fresca */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Gelatina T={T} x={540} y={1080} s={1.35} firme={0} pina="fresca" />
          <Cuchara x={klerp(300, 420, cuchara)} y={klerp(700, 1040, cuchara) - Math.max(0, Math.sin((T - K.G - 0.6) * 2)) * 60 * kprog(T, K.G + 0.6, K.G + 1)} rot={-28} s={0.9} />
          {T < K.G + 1.4 && [0, 1, 2, 3, 4].map((i) => { const p = kprog(T, K.G + 0.5, K.G + 1.3); return <circle key={i} cx={430 + (i - 2) * 40 * p} cy={1060 - Math.sin(p * Math.PI) * (60 + i * 15)} r={10} fill={GEL} stroke={KC.ink} strokeWidth={3} opacity={1 - p} />; })}
        </SvgCapa>
        <Chip T={T} at={K.G + 0.2} until={K.Q - 0.3} texto="EN EL REFRI" x={260} y={735} tam={34} mono borde={KC.cyan} />
        <Cronometro T={T} at={K.G + 0.2} until={K.Q - 0.3} inicio={6900} factor={60} x={260} y={830} />
        <Escala T={T} pxPorMm={3.6 * 1.35} />
      </Escena>
      {/* 1 · de dónde sale: colágeno de piel y hueso → gelatina */}
      <Escena T={T} a={K.Q} b={K.Rd}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g transform={`translate(190 700) rotate(${Math.sin(T * 1.5) * 4})`} opacity={kprog(T, K.Q + 0.1, K.Q + 0.5)}>
            <rect x={-110} y={-80} width={220} height={160} rx={30} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
            {[[-50, -30], [20, -10], [60, 40], [-30, 40], [0, -50]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#c97c5d" />)}
            <text x={0} y={130} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>piel</text>
          </g>
          <g transform={`translate(190 1010) rotate(${-20 + Math.sin(T * 1.3) * 5})`} opacity={kprog(T, K.Q + 0.6, K.Q + 1.0)}>
            <path d="M -120 -14 L 120 -14 A 30 30 0 1 1 140 20 A 30 30 0 1 1 120 14 L -120 14 A 30 30 0 1 1 -140 20 A 30 30 0 1 1 -120 -14 Z" fill="#f6f0dc" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <text x={0} y={100} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>hueso</text>
          </g>
          {[700, 1010].map((yy, i) => { const p = kprog(T, K.Q + 1.1 + i * 0.2, K.Q + 1.6 + i * 0.2); return <path key={i} d={`M 330 ${yy} Q 420 ${(yy + 860) / 2} ${klerp(330, 470, p)} ${klerp(yy, 860, p)}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="18 12" opacity={p > 0 ? 1 : 0} />; })}
          <g transform={`translate(${600} ${860}) rotate(${-6 + Math.sin(T * 2) * 3}) scale(${klerp(0.5, 1, kprog(T, K.Q + 1.6, K.Q + 2.1, kEase.rebote))})`} opacity={kprog(T, K.Q + 1.6, K.Q + 1.9)}>
            <rect x={-130} y={-170} width={260} height={340} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <rect x={-130} y={-170} width={260} height={90} rx={16} fill={GEL} stroke={KC.ink} strokeWidth={8} />
            <text x={0} y={-108} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.paper}>GELATINA</text>
            <text x={0} y={0} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>en polvo</text>
            {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={-90 + (i % 8) * 26} cy={60 + Math.floor(i / 8) * 30} r={7} fill="#f2d8a8" stroke="#c9a26a" strokeWidth={2} />)}
          </g>
        </SvgCapa>
        <Lupa T={T} at={K.Q + 2.6} until={K.Rd - 0.2} x={560} y={1580} r={170} fx={600} fy={1000} tinte={KC.gold2} etiqueta="cadenas de proteína"
          interior={(t, r) => <svg width={r * 2} height={r * 2}>{Array.from({ length: 6 }, (_, i) => <path key={i} d={cadenaPath(20, 50 + i * 55, r * 2 - 20, 70 + i * 55, 16, t, i * 1.3)} stroke={KC.gold2} strokeWidth={7} fill="none" strokeLinecap="round" />)}</svg>} />
      </Escena>
      {/* 2 · al enfriarse: hélices y red que atrapa el agua (micro) */}
      <Escena T={T} a={K.Rd} b={K.Br} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <RedGelatina T={T} forma={forma} agua={kprog(T, K.Rd + 4.0, K.Rd + 4.8)} />
          <TermoG x={110} y={1700} s={0.8} v={klerp(0.8, 0.2, kprog(T, K.Rd + 0.3, K.Rd + 3.5))} texto={`${Math.round(klerp(60, 10, kprog(T, K.Rd + 0.3, K.Rd + 3.5)))} °C`} />
        </SvgCapa>
      </Escena>
      {/* 3 · la piña fresca trae bromelina (macro) */}
      <Escena T={T} a={K.Br} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <PinaEntera x={270} y={1050} s={1.05} rot={Math.sin(T * 1.6) * 3} />
          <RodajaPina x={740} y={1030} s={0.95} rot={T * 6} />
          {tijerasBr.map(([dx, dy], i) => { const p = kprog(T, K.Br + 1.4 + i * 0.25, K.Br + 2.2 + i * 0.25, kEase.sale);
            return p > 0 ? <Tijera key={i} x={740 + dx * p} y={1030 + dy * p + Math.sin(T * 3 + i) * 10} s={klerp(0.2, 0.75, p)} rot={-30 + i * 25 + Math.sin(T * 2 + i) * 8} abre={Math.abs(Math.sin(T * 8 + i))} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 4 · corta las cadenas: ya no se amarran y queda líquida (micro) */}
      <Escena T={T} a={K.Co} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <RedGelatina T={T} forma={1} corteDe={corteDe} agua={1} fuga={kprog(T, K.Co + 2.6, K.Pr)} />
          {[0, 1, 2, 3].map((k) => { // cada tijera va de corte en corte
            const lista = RED_ORDEN.filter((_, j) => j % 4 === k);
            let j = 0; while (j < lista.length - 1 && T > corteDe(lista[j])) j++;
            const [a, b] = RED_BORDES[lista[j]], [pa, pb] = RED_BORDES[lista[Math.max(0, j - 1)]];
            const m = [(RED_NODOS[a][0] + RED_NODOS[b][0]) / 2, (RED_NODOS[a][1] + RED_NODOS[b][1]) / 2], mp = [(RED_NODOS[pa][0] + RED_NODOS[pb][0]) / 2, (RED_NODOS[pa][1] + RED_NODOS[pb][1]) / 2];
            const t1 = corteDe(lista[j]), t0 = j ? corteDe(lista[j - 1]) : K.Co, u = kprog(T, t0, t1, kEase.suave);
            const ent = kprog(T, K.Co, K.Co + 0.5);
            return <Tijera key={k} x={klerp(mp[0], m[0], u)} y={klerp(mp[1], m[1], u) - 20} s={0.55 * ent} rot={-40 + k * 30} abre={Math.abs(Math.cos((T - t1) * 9))} />; })}
        </SvgCapa>
        <Medidor T={T} at={K.Co + 0.4} until={K.Pr - 0.2} valor={(t) => 1 - 0.85 * kprog(t, K.Co + 0.5, K.Pr - 1.1)} etiqueta="largo de las cadenas" texto={(v) => v > 0.5 ? 'largas' : 'cortitas'} y={1440} color={KC.gold2} />
      </Escena>
      {/* 5 · ¿y la de lata? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={260} y={860} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 700)`}>?</text>
          <LataPina x={250} y={1560} s={0.75} rot={-8} />
          <Gelatina T={T} x={270} y={1150} s={0.7} firme={1} pina="lata" boing={kprog(T, K.Pr + 0.3, K.Pr + 0.5) * (1 - kprog(T, K.Pr + 1.0, K.Pr + 2.0))} />
        </SvgCapa>
        <Escala T={T} pxPorMm={3.6 * 0.75} x={620} y={1500} />
      </Escena>
      {/* 6 · 2010, Tailandia: 40 °C vs 80 °C */}
      <Escena T={T} a={K.Es} b={K.La}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > tubos - 0.4 && <g opacity={kprog(T, tubos - 0.4, tubos)}>
            <BanoTubo T={T} x={290} y={1200} temp={40} apaga={0} />
            <BanoTubo T={T} x={790} y={1200} temp={80} apaga={kprog(T, tubos + 0.3, tubos + 0.3 + dEs * 0.9)} burbujas />
            <BarraAct x={290} y={1410} v={1} texto="actividad: 100 %" />
            <BarraAct x={790} y={1410} v={1 - 0.97 * kprog(T, tubos + 0.3, tubos + 0.3 + dEs * 0.9)} texto={T > tubos + 0.3 + dEs * 0.9 ? 'casi toda perdida' : 'actividad…'} />
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={tubos - 0.3} anio="2010" quien="Jutamongkon y Charoenrein" revista="Univ. Kasetsart · Bangkok, Tailandia" x={620} y={780} />
        <Cronometro T={T} at={tubos + 0.3} until={K.La - 0.3} inicio={0} factor={3600 / dEs} x={290} y={1640} etiqueta="40 °C · HASTA 1 H" />
        <Cronometro T={T} at={tubos + 0.3} until={K.La - 0.3} inicio={0} factor={480 / dEs} x={790} y={1640} etiqueta="80 °C · 8 MIN" />
      </Escena>
      {/* 7 · la lata se calienta: bromelina apagada */}
      <Escena T={T} a={K.La} b={K.Ki} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Olla T={T} x={560} y={1110} s={1.05}><LataPina x={0} y={-110} s={0.6} rot={Math.sin(T * 5) * 3} /></Olla>
          <Llama T={T} x={560} y={1180} s={1.8} />
          <rect x={300} y={1165} width={520} height={30} rx={10} fill={KC.ink} />
        </SvgCapa>
        <Lupa T={T} at={K.La + 1.6} until={K.Ki - 0.2} x={290} y={620} r={170} fx={560} fy={1060} tinte={KC.gold2} etiqueta="bromelina apagada"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a2a08" />
            <Tijera x={r * 0.8} y={r * 0.9} s={0.8} rot={-20} abre={0.3} apagada={kprog(t, K.La + 1.9, K.La + 3)} />
            <Tijera x={r * 1.25} y={r * 1.3} s={0.6} rot={50} abre={0.3} apagada={kprog(t, K.La + 2.1, K.La + 3.2)} /></svg>} />
      </Escena>
      {/* 8 · lo curioso: el kiwi (2002, Japón) */}
      <Escena T={T} a={K.Ki} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {T > K.Ki + 2.3 && <g opacity={kprog(T, K.Ki + 2.3, K.Ki + 2.7)}>
            {[200, 380, 560, 740, 920].map((x, i) => { const d = kprog(T, K.Ki + 2.6 + i * 0.15, K.Ki + 3.6 + i * 0.15); return <g key={i}>
              <KiwiMitad x={x} y={820} s={0.9} />
              <g transform={`translate(${x} 735) scale(0.28)`}><Gelatina T={T} x={0} y={0} firme={1 - d} pina={null} /></g></g>; })}
            {[380, 740].map((x, i) => { const e = kprog(T, K.Ki + 4.0 + i * 0.3, K.Ki + 4.4 + i * 0.3, kEase.rebote); return <g key={i} opacity={e}>
              <KiwiMitad x={x} y={1030} s={0.9} />
              <g transform={`translate(${x} 945) scale(0.28)`}><Gelatina T={T} x={0} y={0} firme={1} pina={null} /></g>
              <Marca x={x + 100} y={930} ok s={0.45} o={e} />
              <text x={x} y={1130} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>{i ? 'Kosui' : 'Hort16A'}</text></g>; })}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Ki + 0.2} until={K.Ki + 2.2} anio="2002" quien="Nishiyama · Japón" revista="13 variedades de kiwi · gelatina" x={600} y={800} />
        <Chip T={T} at={K.Ki + 2.8} until={K.Ci - 0.3} texto="la mayoría de 13: gelatina deshecha" x={540} y={1480} tam={36} borde={GEL} />
        <Etq T={T} at={K.Ki + 3.2} until={K.Ci - 0.3} x={1040} y={600} texto="actinidina" lado="izq" tam={32} color={KC.ink} />
      </Escena>
      {/* 9 · cierre: la gelatina del inicio, ya explicada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Gelatina T={T} x={klerp(540, 300, kprog(T, K.Ci + 2.6, K.Ci + 3.4, kEase.suave))} y={1080} s={klerp(1.35, 0.85, kprog(T, K.Ci + 2.6, K.Ci + 3.4, kEase.suave))} firme={0} pina="fresca" />
          {T > K.Ci + 3.2 && <g opacity={kprog(T, K.Ci + 3.2, K.Ci + 3.7)}>
            <Gelatina T={T} x={790} y={1080} s={0.75} firme={1} pina="lata" boing={kprog(T, K.Ci + 3.4, K.Ci + 3.6) * (1 - kprog(T, K.Ci + 4.2, K.Ci + 5.2))} />
            <Marca x={940} y={820} ok s={0.6} o={kprog(T, K.Ci + 3.6, K.Ci + 4)} />
            <g transform="translate(800 1720) scale(0.45)"><Olla T={T} x={0} y={0}><TrozoPina x={-60} y={-110} s={2} /><TrozoPina x={70} y={-90} s={2} rot={40} /></Olla></g>
          </g>}
        </SvgCapa>
        <Escala T={T} pxPorMm={3.6 * 1.35} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿echada a perder?" x={330} y={520} tam={46} />
      <Chip T={T} at={K.G + 3.1} until={K.Q - 0.3} texto="la piña fresca la corta" x={330} y={520} tam={40} borde={PINA} />
      <Etq T={T} at={K.Q + 0.8} until={K.Rd - 0.3} x={40} y={1170} texto="piel y hueso: colágeno" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Q + 3.2} until={K.Rd - 0.3} texto="cadenas largas de proteína" x={400} y={420} tam={36} borde={KC.gold2} />
      <Chip T={T} at={K.Rd + 1.4} until={K.Rd + 4.0} texto="al enfriarse: hélices" x={540} y={1480} tam={44} borde={KC.gold2} />
      <Chip T={T} at={K.Rd + 4.2} until={K.Br - 0.3} texto="red que atrapa el agua = cuajar" x={540} y={1480} tam={40} borde={AGUA} />
      <Etq T={T} at={K.Rd + 0.5} until={K.Br - 0.3} x={40} y={420} texto="esquema molecular" tam={28} />
      <Chip T={T} at={K.Br + 2.0} until={K.Co - 0.3} texto="bromelina (enzimas): cortan proteínas" x={540} y={1500} tam={36} borde={TIJ} />
      <Chip T={T} at={K.Co + 2.8} until={K.Pr - 0.3} texto="sin red: se queda líquida" x={540} y={1600} tam={40} borde={GEL} />
      <Chip T={T} at={K.Pr + 0.4} until={K.Es - 0.2} texto="piña de lata: sí cuaja" x={700} y={1640} tam={38} borde={KC.mint} />
      <Chip T={T} at={tubos + 0.6} until={K.La - 0.3} texto="extracto de bromelina de piña" x={540} y={1790} tam={34} borde={TIJ} />
      <Chip T={T} at={K.La + 0.4} until={K.La + 2.8} texto="la lata se procesa con calor" x={560} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.La + 3.0} until={K.Ki - 0.3} texto="calor = enzimas apagadas" x={560} y={1500} tam={42} borde={KC.gold2} />
      <Etq T={T} at={K.Ci + 3.6} until={K.Ou} x={70} y={800} texto="la bromelina cortó la red" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ci + 4.0} until={K.Ou} texto="de lata o cocida: sí cuaja" x={540} y={1470} tam={40} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="La piña fresca *la corta.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Rd - 0.1} texto="Gelatina = *colágeno.*" />
      <Subtitulo T={T} idx={2} at={K.Rd + 0.1} until={K.Br - 0.1} texto="Una red que *atrapa el agua.*" />
      <Subtitulo T={T} idx={3} at={K.Br + 0.1} until={K.Co - 0.1} texto="Bromelina: *tijeras de proteína.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.Pr - 0.1} texto="Cadenas cortas: *no cuaja.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y la piña *de lata?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.La - 0.1} texto="A 80 °C: *se apagó.*" />
      <Subtitulo T={T} idx={7} at={K.La + 0.1} until={K.Ki - 0.1} texto="La lata *ya se calentó.*" />
      <Subtitulo T={T} idx={8} at={K.Ki + 0.1} until={K.Ci - 0.1} texto="El kiwi *también la deshace.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="De lata *o cocida.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.2, CUES.Red - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Red + 1.5, CUES.Bromelina - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Bromelina + 0.8, CUES.Corta - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 0.7, CUES.Estudio + 2.5, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Lata + 0.6, CUES.Kiwi - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Kiwi + 2.6, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GelatinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gelatina10 /></CompositionStage></div>;
}
window.GelatinaApp = GelatinaApp;
