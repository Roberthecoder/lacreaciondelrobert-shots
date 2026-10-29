// Shot IA #58 · El vaso que se llena cinco veces más cada año: el cómputo de la IA — NARRADO (N4 "La imagen que se llena" + N2 "El número").
// Datos: Epoch AI, "Trends in AI" (feb 2026) y "Frontier Data Centers" (oct 2026); Sevilla et al., IJCNN 2022; Intel (ley de Moore); EIA (2022). Ver guion.md y verificacion.md.
// Todo es esquemático: el vaso no está a escala.

// Vaso de vidrio con "cómputo" adentro. nivel 0..1 · pix 0..1 (agua → cuadritos de chip) · desborde 0..1.
function Vaso({ id, x, y, w = 300, h = 420, nivel = 0, pix = 1, desborde = 0, T = 0, seed = 3 }) {
  const wb = w * 0.78, x0 = -w / 2, x1 = w / 2, b0 = -wb / 2, b1 = wb / 2;
  const cuerpo = `M ${x0} ${-h} L ${b0} 0 Q ${b0} 14 ${b0 + 16} 14 L ${b1 - 16} 14 Q ${b1} 14 ${b1} 0 L ${x1} ${-h} Z`;
  const top = -h * nivel, r = krng(seed), cel = w / 9, cubos = [];
  for (let j = 0; j < 11; j++) for (let i = 0; i < 9; i++) {
    const cy = -cel * (j + 1), v = r(), on = 0.55 + 0.45 * Math.sin(T * (2 + v * 4) + v * 20);
    if (cy + cel > top - 2) cubos.push(<rect key={`${i}-${j}`} x={x0 + i * cel + 3} y={cy + 3} width={cel - 6} height={cel - 6} rx={5}
      fill={v > 0.82 ? KC.yellow : v > 0.5 ? KC.mint : KC.cyan} opacity={pix * on} />);
  }
  let ola = `M ${x0 - 20} ${top}`; for (let k = 0; k <= 12; k++) ola += ` L ${x0 - 20 + k * (w + 40) / 12} ${top + Math.sin(T * 5 + k) * 7 * (1 - pix)}`;
  ola += ` L ${x1 + 20} 20 L ${x0 - 20} 20 Z`;
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><path d={cuerpo} /></clipPath></defs>
    <path d={cuerpo} fill="rgba(255,255,255,.35)" />
    <g clipPath={`url(#${id})`}>
      {nivel > 0 && <path d={ola} fill={mixHex('#3d8bff', '#10213f', pix)} />}
      {nivel > 0 && cubos}
    </g>
    {desborde > 0 && [x0 + 14, x1 - 14, x0 + 60, x1 - 70].map((dx, k) => { const lado = dx < 0 ? -1 : 1, u = ((T * 0.9 + k * 0.27) % 1);
      return <g key={k} opacity={desborde}>
        <rect x={dx + lado * 10 - 14} y={-h - 26} width={28} height={28} rx={5} fill={[KC.cyan, KC.mint, KC.yellow, KC.cyan][k]} stroke={KC.ink} strokeWidth={3} />
        <rect x={dx + lado * (24 + u * 50) - 11} y={-h + u * (h + 10)} width={22} height={22} rx={4} fill={[KC.mint, KC.yellow, KC.cyan, KC.mint][k]} stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.6} />
      </g>; })}
    <path d={cuerpo} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${x0 + 26} ${-h + 30} L ${b0 + 22} -30`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".7" />
    <ellipse cx={0} cy={-h} rx={w / 2} ry={16} fill="none" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Chip de silicio con transistores que se duplican (n cuadritos encendidos de 64).
function ChipMoore({ x, y, s = 1, n = 1, T = 0 }) {
  const out = [];
  for (let k = 0; k < 64; k++) { const i = k % 8, j = Math.floor(k / 8), on = k < n;
    out.push(<rect key={k} x={-176 + i * 44} y={-176 + j * 44} width={36} height={36} rx={5} fill={on ? KC.gold2 : '#2b3445'} stroke={on ? KC.ink : '#3a4559'} strokeWidth={3} />); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 8 }, (_, i) => <g key={i}>
      {[-1, 1].map((sd) => <rect key={sd} x={-170 + i * 44} y={sd < 0 ? -250 : 210} width={24} height={40} fill="#c9ced8" stroke={KC.ink} strokeWidth={4} />)}
      {[-1, 1].map((sd) => <rect key={'h' + sd} x={sd < 0 ? -250 : 210} y={-170 + i * 44} width={40} height={24} fill="#c9ced8" stroke={KC.ink} strokeWidth={4} />)}
    </g>)}
    <rect x={-212} y={-212} width={424} height={424} rx={26} fill="#1b2130" stroke={KC.ink} strokeWidth={10} />
    {out}
  </g>;
}
// Carril de la carrera: barra de meses y marquitas en cada duplicación.
function Carril({ T, at, until, y, color, titulo, cada, meses = 24, etiqueta }) {
  if (T < at - 0.3 || T > until + 0.45) return null;
  const o = kprog(T, at - 0.3, at + 0.1) * (1 - kprog(T, until - 0.05, until + 0.45)), m = meses * kprog(T, at + 0.4, at + 3.4), X0 = 90, W = 900;
  const dup = []; for (let k = cada; k <= meses + 0.01; k += cada) dup.push(k);
  return <div style={{ position:'absolute', left:0, top:y, width:KW, opacity:o, zIndex:40 }}>
    <div style={{ marginLeft:X0, font:`900 40px ${KF.texto}`, color:KC.ink }}>{titulo}</div>
    <div style={{ position:'relative', marginLeft:X0, marginTop:12, width:W, height:80, background:'rgba(255,255,255,.7)', border:`6px solid ${KC.ink}`, borderRadius:20, overflow:'hidden' }}>
      <div style={{ width:`${(m / meses) * 100}%`, height:'100%', background:color }}></div>
      {dup.map((d, i) => m >= d && <div key={i} style={{ position:'absolute', left:`${Math.min(94, (d / meses) * 100)}%`, top:0, transform:'translateX(-50%)', height:'100%', display:'flex', alignItems:'center' }}>
        <div style={{ font:`400 46px ${KF.titulo}`, color:KC.paper, WebkitTextStroke:`2px ${KC.ink}`, transform:`scale(${klerp(1.6, 1, kprog(T, at + 0.4 + d / meses * 3, at + 0.7 + d / meses * 3, kEase.sale))})` }}>×2</div></div>)}
    </div>
    <div style={{ marginLeft:X0, marginTop:8, font:`700 30px ${KF.mono}`, color:KC.ink }}>{etiqueta} · mes {Math.floor(m)}</div>
  </div>;
}
// Gráfica esquemática (escala logarítmica) del cómputo de entrenamiento: suave hasta 2010 y luego empinada.
function Grafica({ T, at, until, x = 110, y = 700, w = 860, h = 420 }) {
  if (T < at - 0.4 || T > until + 0.45) return null;
  const o = kprog(T, at - 0.4, at + 0.1) * (1 - kprog(T, until - 0.05, until + 0.45)), p = kprog(T, at + 0.3, at + 3.0, kEase.suave);
  const xr = (a) => x + ((a - 1960) / (2022 - 1960)) * w, yr = (v) => y + h - v * h;
  const pts = []; for (let a = 1960; a <= 2022; a += 1) { const v = a < 2010 ? (a - 1960) / 50 * 0.32 : 0.32 + (a - 2010) / 12 * 0.66; pts.push([xr(a), yr(v)]); }
  const n = Math.max(2, Math.round(pts.length * p)), d = pts.slice(0, n).map((q, i) => `${i ? 'L' : 'M'} ${q[0]} ${q[1]}`).join(' ');
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o, zIndex:39 }}>
    <rect x={x - 30} y={y - 60} width={w + 60} height={h + 140} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke={KC.ink} strokeWidth={5} /><line x1={x} y1={y - 20} x2={x} y2={y + h} stroke={KC.ink} strokeWidth={5} />
    {[1960, 1990, 2010, 2022].map((a) => <text key={a} x={xr(a)} y={y + h + 44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{a}</text>)}
    <line x1={xr(2010)} y1={y - 20} x2={xr(2010)} y2={y + h} stroke={KC.ink} strokeWidth={3} strokeDasharray="10 10" opacity=".5" />
    <text x={x + 14} y={y - 24} style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">cómputo (escala log.)</text>
    <path d={d} stroke={p > 0.78 ? KC.red : KC.blue} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
// Una de las tres llaves que llenan el vaso: ícono + etiqueta + tubo.
function Llave({ T, at, x, icono, texto, y = 600 }) {
  if (T < at - 0.1) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), flujo = kprog(T, at + 0.3, at + 0.9);
  return <>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>
      <path d={`M ${x} ${y + 150} C ${x} ${y + 260} 540 ${y + 220} 540 ${y + 340}`} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d={`M ${x} ${y + 150} C ${x} ${y + 260} 540 ${y + 220} 540 ${y + 340}`} stroke={KC.mint} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray="30 22" strokeDashoffset={-T * 140} opacity={flujo} />
      <g transform={`translate(${x} ${y}) scale(${e})`}>
        <circle r={95} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
        {icono}
      </g>
    </svg>
    <div style={{ position:'absolute', left:x, top:y + 118, transform:`translate(-50%,0) scale(${e})`, zIndex:41, font:`900 30px/1.1 ${KF.texto}`, color:KC.ink, textAlign:'center', width:300, background:KC.yellow, border:`4px solid ${KC.ink}`, borderRadius:16, padding:'6px 8px' }}>{texto}</div>
  </>;
}
const IcoChips = <g>{[-46, 0, 46].map((dx) => <g key={dx}><rect x={dx - 20} y={-26} width={40} height={52} rx={6} fill="#2b3445" stroke={KC.ink} strokeWidth={4} /><rect x={dx - 10} y={-14} width={20} height={20} fill={KC.cyan} /></g>)}</g>;
const IcoReloj = (T) => <g><circle r={52} fill="#fff" stroke={KC.ink} strokeWidth={7} /><line x1={0} y1={0} x2={0} y2={-36} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${T * 240})`} /><line x1={0} y1={0} x2={26} y2={0} stroke={KC.red} strokeWidth={7} strokeLinecap="round" transform={`rotate(${T * 20})`} /></g>;
const IcoRayo = <g><rect x={-46} y={-46} width={92} height={92} rx={12} fill="#2b3445" stroke={KC.ink} strokeWidth={5} /><path d="M 8 -40 L -22 6 L 0 6 L -10 40 L 24 -8 L 2 -8 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /></g>;
// Moneda.
function Moneda({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={46} ry={46} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} /><ellipse rx={32} ry={32} fill="none" stroke={KC.gold} strokeWidth={5} />
    <text y={18} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>$</text>
  </g>;
}
// Centro de datos (edificio con racks y luces).
function CentroDatos({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-260} width={340} height={260} rx={14} fill="#c9ced8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-170} y={-290} width={340} height={40} rx={10} fill="#8892a6" stroke={KC.ink} strokeWidth={7} />
    {[-110, -40, 30, 100].map((rx, i) => <g key={rx}><rect x={rx - 26} y={-220} width={52} height={190} rx={6} fill="#1b2130" stroke={KC.ink} strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={rx - 10 + (k % 2) * 20} cy={-200 + Math.floor(k / 2) * 60 + 10} r={6} fill={Math.sin(T * 7 + i * 3 + k) > 0 ? KC.mint : KC.cyan} />)}</g>)}
    {[-100, 0, 100].map((vx, i) => <g key={i} transform={`translate(${vx} -310)`}><circle r={26} fill="#5b6478" stroke={KC.ink} strokeWidth={5} /><g transform={`rotate(${T * 400 + i * 30})`}><path d="M 0 0 L 0 -20 M 0 0 L 17 10 M 0 0 L -17 10" stroke={KC.paper} strokeWidth={6} strokeLinecap="round" /></g></g>)}
  </g>;
}
// Casita que se enciende (luz 0..1).
function Casita({ x, y, luz = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -6 L 0 -34 L 30 -6 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-24} y={-8} width={48} height={36} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <rect x={-14} y={0} width={14} height={14} fill={luz > 0.5 ? KC.yellow : '#5b6478'} stroke={KC.ink} strokeWidth={3} />
    {luz > 0.5 && <circle cx={-7} cy={7} r={18} fill={KC.yellow} opacity=".35" />}
  </g>;
}
// Recibo de luz.
function Recibo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 -120 L 90 -120 L 90 110 L 70 124 L 50 110 L 30 124 L 10 110 L -10 124 L -30 110 L -50 124 L -70 110 L -90 124 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <text x={0} y={-80} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>RECIBO</text>
    <path d="M 0 -60 L -18 -22 L -2 -22 L -10 10 L 18 -32 L 2 -32 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform="translate(-40 20)" />
    {[0, 1, 2].map((k) => <line key={k} x1={-10} y1={-30 + k * 26} x2={64} y2={-30 + k * 26} stroke="#9aa" strokeWidth={6} />)}
    <text x={0} y={90} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>$$$</text>
  </g>;
}

function Computo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Moore, Du: CUES.Duplica, E: CUES.Estudio, D: CUES.DiezMil, P: CUES.Pregunta, F: CUES.Fuentes, C: CUES.Costo, En: CUES.Energia, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: agua que se vuelve cómputo; el vaso se llena y aparece uno 5 veces más grande (volumen ×5 → lado ×1.71)
  const pixG = kprog(T, K.G + 0.2, K.G + 1.4, kEase.suave);
  const llenoA = klerp(0.45, 1, kprog(T, K.G + 3.6, K.G + 4.6, kEase.sale));
  const mueveA = kprog(T, K.G + 4.4, K.G + 5.2, kEase.suave);
  const sB = 1.71, entraB = kprog(T, K.G + 4.7, K.G + 5.3, kEase.rebote), llenoB = kprog(T, K.G + 5.3, K.G + 6.8, kEase.suave);
  const nMoore = Math.pow(2, Math.floor(kprog(T, K.Mo + 0.8, K.Mo + 4.8) * 6));
  const casas = []; for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) casas.push([590 + i * 52 + (j % 2) * 26, 690 + j * 66, (i * 7 + j * 13) % 63]);
  const luces = Math.floor(63 * kprog(T, K.En + 1.4, K.En + 5.2, kEase.suave));
  const monedas = Array.from({ length: 14 }, (_, k) => { const t0 = K.C + 0.3 + k * 0.22, u = kprog(T, t0, t0 + 0.6, (p) => p * p);
    return T < t0 ? null : <Moneda key={k} x={360 + ((k * 53) % 140) - 70} y={klerp(380, 1050 - Math.floor(k / 3) * 40, u)} s={0.8} rot={k * 40 + u * 180} />; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el vaso de "agua" que es cómputo */}
      <Escena T={T} a={K.G} b={K.Mo}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Vaso id="vA" x={klerp(540, 300, mueveA)} y={1150} w={300 * klerp(1, 0.8, mueveA)} h={420 * klerp(1, 0.8, mueveA)} nivel={llenoA} pix={pixG} desborde={kprog(T, K.G + 4.4, K.G + 4.8)} T={T} />
          {entraB > 0 && <g transform={`translate(760 1150) scale(${entraB * 0.8})`}><Vaso id="vB" x={0} y={0} w={300 * sB * 0.62} h={420 * sB * 0.62} nivel={llenoB} pix={1} T={T} seed={7} /></g>}
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.3} until={K.G + 1.6} texto="¿agua?" x={330} y={620} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.G + 1.7} until={K.Mo - 0.2} texto="cómputo para entrenar IA" x={330} y={620} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.G + 5.0} until={K.Mo - 0.2} texto="1 año después" x={760} y={1210} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.G + 5.2} until={K.Mo - 0.2} valor={5} dur={0.6} prefijo="×" sufijo=" / año" x={760} y={470} tam={130} color={KC.yellow} />
      {/* 2 · ley de Moore */}
      <Escena T={T} a={K.Mo} b={K.Du}>
        <FondoLunares color={KC.yellow} />
        {svg(<ChipMoore x={420} y={800} s={0.95} n={nMoore} T={T} />)}
      </Escena>
      <Chip T={T} at={K.Mo + 0.3} until={K.Du - 0.2} texto="Ley de Moore (1975)" x={420} y={430} tam={40} borde={KC.ink} />
      {T < K.Du + 0.3 && <div style={{ opacity:1 - kprog(T, K.Du - 0.1, K.Du + 0.3) }}><Contador T={T} at={K.Mo + 0.8} hasta={10} dur={4.0} sufijo=" años" x={420} y={1110} tam={56} color={KC.ink} /></div>}
      {/* 3 · la carrera: Moore contra el cómputo de la IA */}
      <Escena T={T} a={K.Du} b={K.E}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Carril T={T} at={K.Du + 0.2} y={480} color={KC.gold2} until={K.E} titulo="Ley de Moore" cada={24} etiqueta="×2 cada ~24 meses" />
      <Carril T={T} at={K.Du + 0.6} y={760} color={KC.pink} until={K.E} titulo="Cómputo de las IA más grandes" cada={5.2} etiqueta="×2 cada ~5 meses (desde 2020)" />
      {/* 4 · el estudio de 2022 */}
      <Escena T={T} a={K.E} b={K.D}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2022" quien="Epoch AI · congreso IJCNN, Padua (Italia)" revista="Sevilla, Heim, Ho, Besiroglu, Hobbhahn y Villalobos" y={820} />
      <Grafica T={T} at={K.E + 3.4} until={K.D} />
      <Chip T={T} at={K.E + 4.6} until={K.D - 0.2} texto="~cada 20 meses (antes de 2010)" x={420} y={1020} tam={30} borde={KC.blue} />
      <Chip T={T} at={K.E + 5.8} until={K.D - 0.2} texto="~cada 6 meses (2010–2022)" x={640} y={640} tam={30} borde={KC.red} />
      {/* 5 · diez mil veces */}
      <Escena T={T} a={K.D} b={K.P}>
        <FondoCircuito T={T} />
      </Escena>
      {T > K.D - 0.45 && T < K.P + 0.45 && <div style={{ position:'absolute', inset:0, zIndex:30, opacity:kprog(T, K.D - 0.45, K.D + 0.05) * (1 - kprog(T, K.P - 0.05, K.P + 0.45)) }}>
        <Cuadricula T={T} cols={100} filas={100} x={60} y={420} ancho={640} alto={640} vacio="rgba(255,255,255,.10)" lleno={KC.mint}
          tramos={[{ desde: 0, hasta: 0.0001, color: KC.yellow }]} llenado={(t) => t < K.D + 1.0 ? 0.0001 : 0.0001 + 0.9999 * Math.pow(kprog(t, K.D + 1.0, K.D + 3.8), 2.2)} />
      </div>}
      <Chip T={T} at={K.D + 0.3} until={K.D + 2.4} texto="■ = cómputo de 2020" x={380} y={360} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.D + 2.5} until={K.P - 0.2} texto="tendencia · modelos de lenguaje más grandes" x={540} y={360} tam={28} borde={KC.mint} />
      <NumeroGigante T={T} at={K.D + 3.0} until={K.P - 0.2} valor={10000} desde={1} dur={0.8} prefijo="×" x={380} y={1150} tam={150} color={KC.yellow} />
      {/* 6 · la pregunta */}
      <Escena T={T} a={K.P} b={K.F} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.P + 1.6} until={K.F - 0.2} texto="chips de IA: +49 % por dólar al año" x={540} y={1180} tam={34} borde={KC.ink} />
      {/* 7 · de tres lados */}
      <Escena T={T} a={K.F} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Vaso id="vF" x={540} y={1190} w={300} h={260} nivel={klerp(0.15, 0.95, kprog(T, K.F + 1.0, K.F + 5.6))} pix={1} T={T} seed={5} />, 31)}
      </Escena>
      {T > K.F - 0.3 && T < K.C + 0.4 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.C - 0.05, K.C + 0.4) }}>
        <Llave T={T} at={K.F + 1.0} x={200} y={480} icono={IcoChips} texto="más chips a la vez" />
        <Llave T={T} at={K.F + 2.6} x={540} y={480} icono={IcoReloj(T)} texto="entrenar más tiempo" />
        <Llave T={T} at={K.F + 4.2} x={880} y={480} icono={IcoRayo} texto="chips más potentes" />
      </div>}
      {/* 8 · el costo */}
      <Escena T={T} a={K.C} b={K.En}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{monedas}<Vaso id="vC" x={360} y={1150} w={300} h={380} nivel={0.25 + 0.5 * kprog(T, K.C + 0.5, K.C + 3.6)} pix={1} T={T} seed={9} /></>)}
      </Escena>
      <NumeroGigante T={T} at={K.C + 0.6} until={K.En - 0.2} valor={3.5} dec={1} dur={0.7} prefijo="×" x={780} y={820} tam={170} color={KC.leaf} etiqueta="" />
      <Chip T={T} at={K.C + 1.0} until={K.En - 0.2} texto="costo por año (desde 2020)" x={760} y={1010} tam={30} borde={KC.ink} />
      {/* 9 · la luz */}
      <Escena T={T} a={K.En} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <CentroDatos x={270} y={1100} s={0.95} T={T} />
          <path d={`M 400 1060 C 480 1060 500 900 560 900`} stroke={KC.ink} strokeWidth={14} fill="none" />
          <path d={`M 400 1060 C 480 1060 500 900 560 900`} stroke={KC.yellow} strokeWidth={6} fill="none" strokeDasharray="18 16" strokeDashoffset={-T * 120} opacity={kprog(T, K.En + 1.0, K.En + 1.4)} />
          {casas.map(([cx, cy, ord], i) => <Casita key={i} x={cx} y={cy} s={0.8} luz={ord < luces ? 1 : 0} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.En + 0.6} until={K.Ci - 0.2} texto="≈ 1 GW (2026)" x={270} y={700} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.En + 4.0} until={K.Ci - 0.2} texto="≈ 800 000 casas (EE. UU.)" x={760} y={1190} tam={34} borde={KC.yellow} />
      {/* 10 · cierre: el mismo vaso, desbordado, con la cuenta pegada */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Vaso id="vZ" x={420} y={1150} w={300} h={420} nivel={1} pix={1} desborde={1} T={T} seed={3} />
          <g opacity={kprog(T, K.Ci + 1.6, K.Ci + 2.0)}><Recibo x={640} y={900} s={klerp(1.5, 1, kprog(T, K.Ci + 1.6, K.Ci + 2.1, kEase.rebote))} rot={10} /></g>
          <g opacity={kprog(T, K.Ci + 2.4, K.Ci + 2.8)}><Moneda x={250} y={880} s={klerp(1.6, 1.1, kprog(T, K.Ci + 2.4, K.Ci + 2.9, kEase.rebote))} rot={-12} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ci + 0.4} until={K.Ou} texto="no se llena solo" x={420} y={620} tam={42} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="No es agua: *es cómputo.* Cada año, *×5.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.Du - 0.1} texto="Ley de Moore: *×2 cada 2 años.*" />
      <Subtitulo T={T} idx={2} at={K.Du + 0.1} until={K.E - 0.1} texto="Cómputo de IA: *×2 cada ~5 meses.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.D - 0.1} texto="Antes de 2010, a ritmo de Moore. *Después, se disparó.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.P - 0.1} texto="Desde 2020: *unas 10 000 veces.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.F - 0.1} texto="¿De dónde *sale tanto?*" />
      <Subtitulo T={T} idx={6} at={K.F + 0.1} until={K.C - 0.1} texto="Más chips, *más tiempo,* chips más potentes." />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.En - 0.1} texto="Entrenarlas cuesta *×3.5 cada año.*" />
      <Subtitulo T={T} idx={8} at={K.En + 0.1} until={K.Ci - 0.1} texto="Ya rondan *un gigavatio.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Alguien paga *la cuenta y la luz.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Moore + 1.0, CUES.Duplica - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.DiezMil - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.DiezMil + 2.6, CUES.Pregunta - 0.15, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Fuentes + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Costo + 0.4, CUES.Energia - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Energia + 2.4, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="58" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ComputoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Computo /></CompositionStage></div>;
}
window.ComputoApp = ComputoApp;
