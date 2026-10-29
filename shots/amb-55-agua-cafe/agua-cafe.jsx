// Shot Ambiental #55 · Tu taza de café esconde unos 130 litros de agua (y casi todos son lluvia) — NARRADO (N2 el número + N4 la imagen que se llena).
// Datos: Mekonnen y Hoekstra (HESS 2011; Report 47, 2010; datos 1996–2005), Chapagain y Hoekstra (Ecol. Econ. 2007; datos 1995–99),
// SADER (2022; promedio 2017–2021). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const CAFE = '#5a3418', VERDE = '#3fbf4a', AZUL = '#2f8fd8', GRIS = '#9aa3ad', HOJA = '#2e8b3e', CEREZA = '#d7263d';

// Taza de café con plato y vapor. s = escala (taza ≈ 220 px de ancho a s = 1).
function Taza({ T, x, y, s = 1, vapor = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={10} cy={8} rx={170} ry={30} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M 90 -150 C 170 -150 170 -60 85 -60" stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M 90 -150 C 170 -150 170 -60 85 -60" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M -110 -190 L 110 -190 L 95 -40 Q 90 0 50 0 L -50 0 Q -90 0 -95 -40 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-190} rx={110} ry={22} fill={CAFE} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-30} cy={-194} rx={36} ry={7} fill="#8a5a33" />
    {vapor && [-45, 0, 45].map((dx, i) => { const u = ((T * 0.6 + i / 3) % 1);
      return <path key={i} d={`M ${dx} ${-220 - u * 120} q 18 -25 0 -50 q -18 -25 0 -50`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u) * 0.9} />; })}
  </g>;
}
// Garrafón con capas de agua. capas: [{ f (fracción del alto), color }] de abajo hacia arriba; lleno 0..1 la animación de llenado.
function Garrafon({ x, y, w = 300, h = 560, capas = [], lleno = 1, id = 'g' }) {
  const top = -h, cuerpo = `M ${-w / 2} -30 Q ${-w / 2} 0 ${-w / 2 + 30} 0 L ${w / 2 - 30} 0 Q ${w / 2} 0 ${w / 2} -30 L ${w / 2} ${top + 120} Q ${w / 2} ${top + 60} ${w / 4} ${top + 50} L ${w / 4} ${top + 50} L ${-w / 4} ${top + 50} Q ${-w / 2} ${top + 60} ${-w / 2} ${top + 120} Z`;
  let acc = 0;
  const bandas = capas.map((c, i) => { const hh = Math.max(c.min || 0, h * c.f * lleno); const yb = -acc; acc += hh; return <rect key={i} x={-w / 2} y={yb - hh} width={w} height={hh} fill={c.color} />; });
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><path d={cuerpo} /></clipPath></defs>
    <path d={cuerpo} fill="rgba(255,255,255,.55)" />
    <g clipPath={`url(#${id})`}>{bandas}{acc > 0 && <path d={`M ${-w / 2} ${-acc} q ${w / 8} -8 ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0`} stroke="rgba(255,255,255,.6)" strokeWidth={5} fill="none" />}</g>
    <path d={cuerpo} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-w / 4 + 10} y={top + 10} width={w / 2 - 20} height={44} rx={8} fill="#e9eef5" stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={w / 2 - 34} y1={-h * q * 0.85} x2={w / 2} y2={-h * q * 0.85} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Grano de café tostado: elipse con la ranura en "S".
function Grano({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={30} ry={21} fill={CAFE} stroke={KC.ink} strokeWidth={5} />
    <path d="M -24 4 Q -8 -10 0 0 Q 8 10 24 -4" stroke="#2a160a" strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={-10} cy={-10} rx={9} ry={4} fill="#9b6a3f" opacity=".7" />
  </g>;
}
// Hoja de cafeto: elíptica, brillante, con nervio central. largo en px.
function HojaC({ x, y, rot = 0, largo = 150 }) {
  const k = largo / 150;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
    <path d="M 0 0 Q 50 -46 150 0 Q 50 46 0 0 Z" fill={HOJA} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 6 0 L 140 0" stroke="#bfe8b0" strokeWidth={3} />
    <path d="M 40 -12 Q 70 -24 100 -14" stroke="#7fd66f" strokeWidth={4} fill="none" opacity=".6" />
  </g>;
}
// Racimo de cerezas pegado a la rama (axila de las hojas).
function Racimo({ x, y, n = 5, r = 17, madura = 1 }) {
  const pos = [[-14, -6], [12, -10], [0, 8], [-24, 12], [24, 10], [-2, -22]].slice(0, n);
  return <g transform={`translate(${x} ${y})`}>{pos.map(([a, b], i) => <g key={i}>
    <circle cx={a} cy={b} r={r} fill={mixHex('#7cc46a', CEREZA, madura)} stroke={KC.ink} strokeWidth={4} />
    <circle cx={a} cy={b - r + 4} r={3.5} fill="#3a1d10" /><circle cx={a - 5} cy={b - 5} r={4} fill="#fff" opacity=".5" /></g>)}</g>;
}
// Rama de cafeto: tallo con pares de hojas opuestas y racimos en los nudos. crece 0..1.
function Rama({ T, x, y, largo = 900, rot = 0, crece = 1, nudos = 5, hoja = 150, cerezas = true }) {
  const L = largo * crece, paso = largo / (nudos + 0.5), m = mece(T, 3, 0.4);
  return <g transform={`translate(${x} ${y}) rotate(${rot + m * 1.5})`}>
    <path d={`M 0 0 L ${L} ${-L * 0.04}`} stroke="#6b4a2b" strokeWidth={14} strokeLinecap="round" />
    {Array.from({ length: nudos }, (_, i) => { const px = paso * (i + 0.7); if (px > L) return null; const py = -px * 0.04, sc = kclamp((L - px) / 120, 0, 1);
      return <g key={i} transform={`translate(${px} ${py}) scale(${sc})`}>
        <HojaC x={0} y={0} rot={-50} largo={hoja} /><HojaC x={0} y={0} rot={50} largo={hoja} />
        {cerezas && <Racimo x={0} y={0} n={5} />}
      </g>; })}
    <HojaC x={L} y={-L * 0.04} rot={-10} largo={hoja * 0.6} />
  </g>;
}
// Nube con lluvia (líneas que caen). llueve 0..1.
function Nube({ T, x, y, s = 1, llueve = 1, largo = 300, color = '#e9f1fa' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {llueve > 0 && Array.from({ length: 9 }, (_, i) => { const u = (T * 1.6 + i * 0.37) % 1;
      return <line key={i} x1={-110 + i * 28} y1={40 + u * largo} x2={-118 + i * 28} y2={70 + u * largo} stroke={AZUL} strokeWidth={7} strokeLinecap="round" opacity={llueve * (1 - u * 0.4)} />; })}
    <path d="M -150 40 Q -170 -10 -110 -20 Q -100 -80 -30 -70 Q 10 -120 70 -70 Q 140 -80 140 -10 Q 180 10 150 40 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Cafeto completo (arbusto) con raíces, para el ciclo del agua.
function Cafeto({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-60, 60, -150], [10, 90, -170], [70, 50, -140], [-20, 120, -200], [40, 130, -110]].map(([a, b, r], i) =>
      <path key={i} d={`M ${a * 0.3} 0 Q ${a} ${b * 0.6} ${a * 1.5} ${b}`} stroke="#8a5a33" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <path d="M 0 0 L 0 -330" stroke="#6b4a2b" strokeWidth={22} strokeLinecap="round" />
    <Rama T={T} x={0} y={-90} largo={230} rot={-20} nudos={3} hoja={90} />
    <Rama T={T} x={0} y={-90} largo={230} rot={200} nudos={3} hoja={90} />
    <Rama T={T} x={0} y={-200} largo={190} rot={-28} nudos={2} hoja={85} />
    <Rama T={T} x={0} y={-200} largo={190} rot={208} nudos={2} hoja={85} />
    <Rama T={T} x={0} y={-300} largo={130} rot={-70} nudos={2} hoja={70} cerezas={false} />
  </g>;
}
// Flechita de vapor que sube y se mece.
function Vapor({ T, x, y, fase = 0 }) {
  const u = (T * 0.7 + fase) % 1;
  return <g transform={`translate(${x} ${y - u * 140})`} opacity={Math.sin(Math.PI * u)}>
    <path d="M 0 0 q 14 -20 0 -40 q -14 -20 0 -40" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -12 -70 L 0 -88 L 12 -70" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Costal de café (más lleno = más grande).
function Costal({ x, y, s = 1, etiqueta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 0 Q -110 -120 -70 -190 L -40 -215 L 40 -215 L 70 -190 Q 110 -120 90 0 Z" fill="#d9b77e" stroke={KC.ink} strokeWidth={7 / s} strokeLinejoin="round" />
    <path d="M -45 -205 Q 0 -190 45 -205" stroke={KC.ink} strokeWidth={6 / s} fill="none" />
    {[-30, 0, 30].map((dx, i) => <Grano key={i} x={dx} y={-235 + (i % 2) * 8} rot={i * 40} s={0.55} />)}
    {etiqueta && <text x={0} y={-80} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Parcela vista de frente con filas de cafetos.
function Parcela({ x, y, w = 380 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} 0 L ${w / 2} 0 L ${w / 2 - 40} -90 L ${-w / 2 + 40} -90 Z`} fill="#a0703f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 1, 2].map((f) => Array.from({ length: 6 }, (_, i) => <circle key={f + '-' + i} cx={-w / 2 + 60 + i * (w - 120) / 5 + f * 6} cy={-20 - f * 28} r={18 - f * 3} fill={HOJA} stroke={KC.ink} strokeWidth={4} />))}
  </g>;
}
// Estados (contornos muy simplificados, esquema) en coordenadas lon/lat del MapaMexico.
const CHIAPAS = [[-94.1, 17.4], [-91.4, 17.25], [-90.4, 16.1], [-91.7, 16.1], [-92.2, 15.3], [-92.2, 14.5], [-93.9, 16], [-94.4, 16.6]];
const VERACRUZ = [[-98.2, 22.4], [-97.8, 22.3], [-97.2, 20.6], [-96.1, 19.2], [-94.5, 18.2], [-93.9, 18.0], [-94.2, 17.2], [-95.2, 17.5], [-96.6, 18.5], [-97.5, 19.6], [-98.3, 20.6], [-98.6, 21.9]];
// Mapa del mundo pixelado (esquema), 36 × 15 celdas.
const MUNDO = [
  '....######......####..#######.......',
  '..#########....###...##########.....',
  '...########.......#.############....',
  '....######.......####.##########....',
  '.....####.......######.########.....',
  '......###.......#######..#####......',
  '.......##........######...###.#.....',
  '........###.......####.....#..##....',
  '.........####.....###..........#....',
  '.........#####....###.......####....',
  '..........###.....##........#####...',
  '..........##..................##....',
  '..........#.........................',
  '....................................',
  '...........#######...#######........'];

function AguaCafeShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Gr: CUES.Granos, Ll: CUES.Lluvia, Ri: CUES.Riego, P: CUES.Pregunta, M: CUES.Mexico, Re: CUES.Rendimiento, E: CUES.Estudio, Go: CUES.Gotas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const fV = 127.1 / 132.5 * 0.9, fA = 0.97 / 132.5 * 0.9, fGr = 4.4 / 132.5 * 0.9;
  const llenoG = kprog(T, K.G + 0.6, K.G + 3.0, kEase.suave);
  const llenoV = kprog(T, K.Ll + 0.6, K.Ll + 3.0, kEase.suave);
  const azul = kprog(T, K.Ri + 0.3, K.Ri + 1.0, kEase.sale), gris = kprog(T, K.Ri + 2.4, K.Ri + 3.4, kEase.sale);
  const capasFin = [{ f: fV, color: VERDE }, { f: fA, color: AZUL, min: 8 }, { f: fGr, color: GRIS }];
  // Gotas: 30 × 34 = 1,020 gotitas que aparecen en 2 s
  const nGotas = Math.floor(1020 * kprog(T, K.Go + 0.2, K.Go + 2.2, kEase.suave));
  const mapaS = 0.64, mx = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [300 + a * mapaS, 340 + b * mapaS]; };
  const poli = (pts) => pts.map(([a, b]) => mx(a, b).map((v) => v.toFixed(1)).join(',')).join(' ');
  const lit = (l) => 380 * l / 200; // alto de garrafón por litros (Mexico)
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la taza de 125 mL y el garrafón de 130 L detrás */}
      <Escena T={T} a={K.G} b={K.Gr}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Garrafon x={430} y={1170} w={320} h={600} capas={[{ f: 0.9, color: AZUL }]} lleno={llenoG} id="gg" />
          <Taza T={T} x={170} y={1170} s={0.75} /></>)}
      </Escena>
      {/* 2 · los 7 g de café y la rama del cafeto */}
      <Escena T={T} a={K.Gr} b={K.Ll}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Gr + 0.2 + i * 0.12, u = kprog(T, t0, t0 + 0.5, (p) => p * p);
            return <Grano key={i} x={150 + (i % 3) * 40} y={klerp(380, 1000 - Math.floor(i / 3) * 26, u)} rot={i * 47 + T * 30 * (1 - u)} s={0.9} />; })}
          <Taza T={T} x={190} y={1170} s={0.6} vapor={false} />
          <Rama T={T} x={330} y={900} largo={720} crece={kprog(T, K.Gr + 2.0, K.Gr + 4.0, kEase.sale)} nudos={4} hoja={140} />
        </>)}
      </Escena>
      {/* 3 · la lluvia: el cafetal la toma del suelo y la devuelve al aire */}
      <Escena T={T} a={K.Ll} b={K.Ri}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={0} y={1060} width={KW} height={300} fill="#8a5a33" />
          <path d={`M 0 1060 Q 270 1040 540 1060 T 1080 1060`} fill="none" stroke={KC.ink} strokeWidth={8} />
          <Nube T={T} x={690} y={430} s={1} llueve={kprog(T, K.Ll + 0.2, K.Ll + 0.6)} largo={260} />
          <Cafeto T={T} x={700} y={1060} s={1.05} />
          {[0, 0.33, 0.66].map((f, i) => <Vapor key={i} T={T} x={560 + i * 140} y={720} fase={f} />)}
          <Garrafon x={200} y={1170} w={260} h={520} capas={[{ f: fV, color: VERDE }]} lleno={llenoV} id="gl" />
        </>)}
      </Escena>
      {/* 4 · menos de 1 L de riego y unos 4 L de agua gris */}
      <Escena T={T} a={K.Ri} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <path d="M 420 820 L 1080 980 L 1080 1200 L 420 1200 Z" fill="#a0703f" stroke={KC.ink} strokeWidth={7} />
          <path d="M 420 1150 Q 700 1120 1080 1160 L 1080 1200 L 420 1200 Z" fill={mixHex(AZUL, GRIS, gris * 0.6)} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, i) => { const u = kclamp((T - K.Ri - 2.4 - i * 0.12) / 1.4, 0, 1); const xx = 480 + i * 55 + u * 60;
            return <circle key={i} cx={xx} cy={klerp(830 + i * 14, 1140, u)} r={9} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity={T > K.Ri + 2.4 ? 1 : 0} />; })}
          <Garrafon x={220} y={1170} w={260} h={520} capas={[{ f: fV, color: VERDE }, { f: fA * azul, color: AZUL, min: 8 * azul }, { f: fGr * gris, color: GRIS }]} lleno={1} id="gr" />
          <path d={`M 560 700 L 560 ${700 + 110 * azul}`} stroke={AZUL} strokeWidth={14} strokeLinecap="round" opacity={azul} />
          <g opacity={azul}><rect x={500} y={660} width={120} height={46} rx={10} fill="#7d8792" stroke={KC.ink} strokeWidth={6} /></g>
        </>)}
        <EscalaFija texto="esquema (franjas aumentadas)" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta: ¿y el café de México? */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><MapaMexico x={40} y={760} ancho={560} conCA={false} />
          <text x={260} y={760} textAnchor="middle" style={{ font:`400 380px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 260 620)`}>?</text></>)}
      </Escena>
      {/* 6 · Chiapas y Veracruz: casi 200 litros por taza */}
      <Escena T={T} a={K.M} b={K.Re}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <MapaMexico x={300} y={340} ancho={640} conCA={false} />
          <polygon points={poli(VERACRUZ)} fill={KC.orange} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.M + 0.4, K.M + 0.9)} />
          <polygon points={poli(CHIAPAS)} fill={KC.pink} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.M + 0.2, K.M + 0.7)} />
          <Garrafon x={330} y={1180} w={200} h={lit(130) * kprog(T, K.M + 2.4, K.M + 3.0, kEase.sale) + 1} capas={[{ f: 0.92, color: VERDE }]} lleno={1} id="gm1" />
          <Garrafon x={720} y={1180} w={200} h={lit(197) * kprog(T, K.M + 3.4, K.M + 4.2, kEase.sale) + 1} capas={[{ f: 0.92, color: VERDE }]} lleno={1} id="gm2" />
        </>)}
      </Escena>
      {/* 7 · menos café por hectárea: la misma agua entre menos granos */}
      <Escena T={T} a={K.Re} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Nube T={T} x={280} y={720} s={0.7} largo={140} />
          <Nube T={T} x={780} y={720} s={0.7} largo={140} />
          <Parcela x={280} y={980} /><Parcela x={780} y={980} />
          <Costal x={280} y={1195} s={kprog(T, K.Re + 1.6, K.Re + 2.4, kEase.rebote) * 0.95 + 0.01} etiqueta="0.80 t/ha" />
          <Costal x={780} y={1195} s={kprog(T, K.Re + 2.4, K.Re + 3.2, kEase.rebote) * 0.95 * Math.sqrt(0.46 / 0.80) + 0.01} etiqueta="0.46 t/ha" />
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 8 · el estudio: el mundo en cuadritos, datos 1996–2005 */}
      <Escena T={T} a={K.E} b={K.Go}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform="translate(330 350) scale(0.8)">
          <rect x={-10} y={-10} width={920} height={395} rx={18} fill="#0d1424" stroke={KC.ink} strokeWidth={7} />
          {MUNDO.map((fila, r) => fila.split('').map((c, k) => { const on = c === '#'; const t0 = K.E + 0.3 + k * 0.05; const p = kprog(T, t0, t0 + 0.4);
            return <rect key={r + '-' + k} x={k * 25 + 1} y={r * 25 + 1} width={23} height={23} rx={3}
              fill={on ? mixHex('#3a4660', ['#3fbf4a', '#2fe0a8', '#7cc46a', '#2f8fd8'][(r * 7 + k * 3) % 4], p) : 'rgba(255,255,255,.05)'} />; }))}
        </g>)}
      </Escena>
      {/* 9 · más de mil gotas de agua por cada gota de café */}
      <Escena T={T} a={K.Go} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <path d="M 0 -70 Q 52 0 0 52 Q -52 0 0 -70 Z" transform="translate(190 820) scale(1.6)" fill={CAFE} stroke={KC.ink} strokeWidth={5} />
          {Array.from({ length: nGotas }, (_, i) => { const c = i % 30, r = Math.floor(i / 30);
            return <path key={i} d="M 0 -9 Q 7 0 0 7 Q -7 0 0 -9 Z" transform={`translate(${380 + c * 21} ${420 + r * 22})`} fill={AZUL} />; })}
        </>)}
      </Escena>
      {/* 10 · cierre: la misma taza, ahora con lluvia encima */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Garrafon x={430} y={1170} w={320} h={600} capas={capasFin} lleno={1} id="gc" />
          <Nube T={T} x={190} y={640} s={0.6} llueve={kprog(T, K.C + 0.5, K.C + 1.0)} largo={180} />
          <Taza T={T} x={170} y={1170} s={0.75} /></>)}
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.1} until={K.Gr - 0.2} texto="125 mL" x={170} y={1080} tam={36} borde={KC.ink} />
      <NumeroGigante T={T} at={K.G + 1.0} until={K.Gr - 0.2} valor={130} dur={2.0} prefijo="≈" sufijo=" L" etiqueta="agua detrás:" x={300} y={470} tam={150} color={KC.cyan} />
      <Chip T={T} at={K.Gr + 0.4} until={K.Ll - 0.2} texto="7 g de café tostado" x={330} y={470} tam={36} borde={CAFE} />
      <Etq T={T} at={K.Gr + 3.2} until={K.Ll - 0.2} x={600} y={720} texto="cafeto" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Gr + 3.6} until={K.Ll - 0.2} x={600} y={1060} texto="Coffea arabica" it lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ll + 2.4} until={K.Ri - 0.2} texto="127 L · agua de lluvia" x={330} y={470} tam={36} borde={VERDE} />
      <Etq T={T} at={K.Ri + 0.8} until={K.P - 0.2} x={630} y={683} texto="< 1 L · riego" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ri + 2.8} until={K.P - 0.2} x={600} y={605} texto="≈ 4 L · agua gris" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ri + 3.4} until={K.P - 0.2} texto="diluir el fertilizante" x={330} y={430} tam={30} borde={GRIS} />
      <Etq T={T} at={K.M + 0.8} until={K.Re - 0.2} x={mx(-96.4, 20.6)[0]} y={mx(-96.4, 20.6)[1] - 45} texto="Veracruz 24 %" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.2} until={K.Re - 0.2} x={mx(-93.2, 15.9)[0]} y={mx(-93.2, 15.9)[1] + 30} texto="Chiapas 41 %" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 1.4} until={K.Re - 0.2} texto="% del café del país (2017–2021)" x={600} y={712} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.M + 2.8} until={K.Re - 0.2} x={200} y={905} texto="mundo ≈ 130 L" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 4.0} until={K.Re - 0.2} x={590} y={785} texto="≈ 194–199 L" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 4.2} until={K.Re - 0.2} texto="Chiapas y Veracruz · datos 1996–2005" x={540} y={1460} tam={26} borde={KC.pink} />
      <Chip T={T} at={K.Re + 0.3} until={K.E - 0.2} texto="misma lluvia, menos granos" x={360} y={430} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Re + 2.2} until={K.E - 0.2} x={60} y={850} texto="promedio" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Re + 3.0} until={K.E - 0.2} x={560} y={850} texto="México" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Re + 3.6} until={K.E - 0.2} texto="café verde por hectárea · 1995–99" x={540} y={1460} tam={26} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.6} until={K.Go - 0.2} anio="2010–2011" quien="Mekonnen y Hoekstra" revista="U. de Twente, Países Bajos · datos 1996–2005" y={930} />
      <NumeroGigante T={T} at={K.Go + 0.2} until={K.C - 0.2} valor={1000} dur={2.0} prefijo="×" sufijo="+" x={680} y={1060} tam={150} color={KC.cyan} />
      <Etq T={T} at={K.Go + 0.4} until={K.C - 0.2} x={120} y={1000} texto="1 gota de café" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou - 0.1} texto="≈ 96 % lluvia" x={330} y={470} tam={40} borde={VERDE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Gr - 0.1} texto="125 mL en la taza… *130 litros detrás.*" />
      <Subtitulo T={T} idx={1} at={K.Gr + 0.1} until={K.Ll - 0.1} texto="Es el agua *del cafeto.*" />
      <Subtitulo T={T} idx={2} at={K.Ll + 0.1} until={K.Ri - 0.1} texto="127 litros: *lluvia.*" />
      <Subtitulo T={T} idx={3} at={K.Ri + 0.1} until={K.P - 0.1} texto="Menos de 1 L: *riego.* Unos 4: *agua gris.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.M - 0.1} texto="¿Y el café *de México?*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Re - 0.1} texto="Chiapas y Veracruz: *casi 200 litros.*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.E - 0.1} texto="Menos café por hectárea: *menos granos.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Go - 0.1} texto="Mekonnen y Hoekstra: *1996–2005.*" />
      <Subtitulo T={T} idx={8} at={K.Go + 0.1} until={K.C - 0.1} texto="*Más de 1,000 gotas* por gota de café." />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Casi toda es *lluvia de un cafetal.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Granos + 2.8, CUES.Lluvia + 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Riego + 1.5, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Mexico + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Mexico + 4.5, CUES.Rendimiento - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Rendimiento + 3.5, CUES.Estudio - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Gotas - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="55" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AguaCafeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AguaCafeShot /></CompositionStage></div>;
}
window.AguaCafeApp = AguaCafeApp;
