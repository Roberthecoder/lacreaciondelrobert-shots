// Shot Ambiental #58 · La «isla de basura» del Pacífico no se puede pisar: es una sopa — NARRADO (N2 el número + N1 por dentro).
// Datos: Lebreton et al. 2018 y 2022 (Scientific Reports), NOAA. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (mapa, corrientes, isla imaginaria, redes).

const MP_COL = ['#ffffff', '#2346ff', '#ff3b2f', '#3fbf4a', '#ffe11a', '#e9eef5', '#ff8a1f', '#b18cff'];
// Proyección simple del Pacífico Norte (esquema): lon -165..-115 → x 0..1080.
function mpProy(lon, lat) { return [(lon + 165) * 21.6, 300 + (48 - lat) * 23.76]; }
const MP_COSTA = [[-100, 49], [-123, 49], [-124.7, 48.4], [-124, 46.2], [-124.1, 43.5], [-124.4, 42], [-124.2, 40.4], [-123.8, 39.5], [-122.5, 37.8], [-121.9, 36.6], [-120.6, 34.6], [-118.5, 34], [-117.1, 32.5], [-116.6, 31.7], [-115.8, 30.4], [-114.2, 28], [-112.1, 24.8], [-110, 22.9], [-105, 20], [-100, 20]];
const MP_HAWAII = [[-155.5, 19.6, 15], [-156.3, 20.8, 8], [-157.9, 21.45, 7], [-159.5, 22.05, 6]];
const MP_C = mpProy(-143, 32);   // centro de la mancha (≈ entre Hawái y California)

// Piezas de la "isla" imaginaria: cada una tiene un lugar en la isla y un lugar disperso en el mar.
const MP_PIEZAS = (() => { const r = krng(58); return Array.from({ length: 46 }, (_, i) => ({
  hx: (r() - 0.5) * 380, hy: (r() - 0.5) * 120 - r() * 50, rot: r() * 360, tipo: i % 4, c: MP_COL[i % MP_COL.length],
  dx: 40 + r() * 1000, dy: 380 + r() * 800, s: 4 + r() * 6, f: r() * 6 })); })();
function Pieza({ x, y, tipo, c, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {tipo === 0 && <><rect x={-12} y={-30} width={24} height={52} rx={9} fill={c} stroke={KC.ink} strokeWidth={4} /><rect x={-6} y={-40} width={12} height={12} rx={3} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></>}
    {tipo === 1 && <polygon points="-22,-10 4,-20 22,-4 12,16 -14,14" fill={c} stroke={KC.ink} strokeWidth={4} />}
    {tipo === 2 && <><rect x={-22} y={-14} width={44} height={28} rx={4} fill={c} stroke={KC.ink} strokeWidth={4} /><line x1={-12} y1={-14} x2={-12} y2={14} stroke={KC.ink} strokeWidth={3} /><line x1={6} y1={-14} x2={6} y2={14} stroke={KC.ink} strokeWidth={3} /></>}
    {tipo === 3 && <path d="M -26 -6 q 10 -16 22 0 q 10 16 22 0" fill="none" stroke={c === '#ffffff' ? KC.orange : c} strokeWidth={7} strokeLinecap="round" />}
  </g>;
}
// Fragmento chiquito (microplástico): polígono irregular.
function Frag({ x, y, r = 8, c = '#fff', rot = 0, o = 1 }) {
  return <polygon transform={`translate(${x} ${y}) rotate(${rot})`} points={`${-r},${-r * 0.4} ${r * 0.2},${-r} ${r},${-r * 0.1} ${r * 0.4},${r * 0.8} ${-r * 0.7},${r * 0.6}`} fill={c} stroke={KC.ink} strokeWidth={Math.max(1.5, r / 4)} opacity={o} />;
}
// Olitas que se mecen.
function Olas({ T, n = 14, seed = 3, area = [0, 360, 1080, 900], color = 'rgba(255,255,255,.7)' }) {
  const r = krng(seed);
  return <>{Array.from({ length: n }, (_, i) => { const x = area[0] + r() * area[2], y = area[1] + r() * area[3], p = r() * 6;
    return <path key={i} d={`M ${x} ${y + Math.sin(T * 2 + p) * 6} q 22 -14 44 0 q 22 14 44 0`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />; })}</>;
}
// La isla imaginaria que se deshace. deshace 0..1.
function IslaImaginaria({ T, x, y, deshace = 0 }) {
  const base = 1 - kclamp(deshace * 2.5, 0, 1);
  return <g>
    {base > 0 && <g transform={`translate(${x} ${y})`} opacity={base}>
      <ellipse rx={250} ry={78} fill="#c9b48a" stroke={KC.ink} strokeWidth={7} />
      <ellipse rx={265} ry={88} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="20 14" opacity={0.7} />
    </g>}
    {MP_PIEZAS.map((p, i) => { const k = kclamp(deshace * 1.3 - (i % 7) * 0.04, 0, 1), e = kEase.sale(k);
      const px = klerp(x + p.hx, p.dx, e) + Math.sin(T * 1.2 + p.f) * 6 * e, py = klerp(y + p.hy - 20, p.dy, e) + Math.cos(T * 1.5 + p.f) * 5 * e;
      return k < 0.95 ? <Pieza key={i} x={px} y={py} tipo={p.tipo} c={p.c} s={klerp(1.1, 0.25, e)} rot={p.rot + e * 90} /> : <Frag key={i} x={px} y={py} r={p.s} c={p.c} rot={p.rot} />; })}
  </g>;
}
// Tenis caricatura (suela abajo) que baja a "pisar".
function Tenis({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-260} width={90} height={190} rx={20} fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -90 L 50 -90 Q 70 -60 150 -40 Q 190 -30 190 0 L -70 0 Q -80 -50 -60 -90 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <rect x={-74} y={-6} width={268} height={24} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => <line key={i} x1={-10 + i * 30} y1={-82} x2={10 + i * 30} y2={-60} stroke="#fff" strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}
// Anillos de chapuzón.
function Chapuzon({ T, x, y, at }) {
  if (T < at || T > at + 1.6) return null;
  return <g>{[0, 0.3].map((d, i) => { const u = kprog(T, at + d, at + d + 1.2); return u > 0 && u < 1 ? <ellipse key={i} cx={x} cy={y} rx={80 + u * 320} ry={24 + u * 100} fill="none" stroke="#fff" strokeWidth={8 * (1 - u)} /> : null; })}</g>;
}
// Mapa esquemático del Pacífico Norte. mancha 0..1 aparece la zona; giro 0..1 aparecen las corrientes.
const MP_PUNTOS = (() => { const r = krng(7); return Array.from({ length: 170 }, () => { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * (0.35 + 0.65 * r());
  return { a, d, c: MP_COL[Math.floor(r() * MP_COL.length)], s: 2.5 + r() * 3, p: r() * 6 }; }); })();
function MapaPacifico({ T, mancha = 0, giro = 0, t0 = 0 }) {
  const costa = MP_COSTA.map(([lo, la]) => mpProy(lo, la).join(',')).join(' ');
  const [cx, cy] = MP_C, rx = 216, ry = 120;
  const gx = cx - 40, gy = cy + 20, grx = 400, gry = 300;
  return <g>
    <polygon points={costa} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {MP_HAWAII.map(([lo, la, r], i) => { const [x, y] = mpProy(lo, la); return <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.8} fill="#9fd67a" stroke={KC.ink} strokeWidth={4} />; })}
    {giro > 0 && <g opacity={giro}>
      {[1, 0.62].map((k, j) => <ellipse key={j} cx={gx} cy={gy} rx={grx * k} ry={gry * k} fill="none" stroke="#fff" strokeWidth={10 - j * 3} strokeDasharray="34 26" strokeDashoffset={-(T - t0) * 60 * (j ? 0.7 : 1)} opacity={0.85} />)}
      {Array.from({ length: 8 }, (_, i) => { const th = i / 8 * Math.PI * 2 + (T - t0) * 0.35, x = gx + grx * Math.cos(th), y = gy + gry * Math.sin(th);
        const ang = Math.atan2(gry * Math.cos(th), -grx * Math.sin(th)) * 180 / Math.PI;
        return <polygon key={i} transform={`translate(${x} ${y}) rotate(${ang})`} points="22,0 -16,-18 -8,0 -16,18" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />; })}
      {Array.from({ length: 18 }, (_, i) => { const u = ((T - t0) * 0.16 + i / 18) % 1, th = i * 2.1 + (T - t0) * 0.8, k = 1.05 - u * 0.75;
        return <Frag key={i} x={gx + grx * k * Math.cos(th)} y={gy + gry * k * Math.sin(th)} r={6} c={MP_COL[i % MP_COL.length]} rot={i * 40} />; })}
    </g>}
    {mancha > 0 && <g opacity={mancha}>
      <ellipse cx={cx} cy={cy} rx={rx * 1.1} ry={ry * 1.15} fill="rgba(255,255,255,.22)" stroke="#fff" strokeWidth={5} strokeDasharray="12 12" />
      {MP_PUNTOS.map((q, i) => <circle key={i} cx={cx + Math.cos(q.a) * q.d * rx + Math.sin(T + q.p) * 3} cy={cy + Math.sin(q.a) * q.d * ry + Math.cos(T * 0.8 + q.p) * 3} r={q.s} fill={q.c} stroke={KC.ink} strokeWidth={1.5} />)}
    </g>}
  </g>;
}
// Barco con red de muestreo (red manta) arrastrada por detrás.
function BarcoRed({ x, y, T, s = 1 }) {
  const b = Math.sin(T * 2.4 + x) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -150 18 Q -120 30 -60 30" stroke={KC.ink} strokeWidth={3} fill="none" />
    <g transform="translate(-190 22)"><rect x={-20} y={-14} width={40} height={22} rx={4} fill="#c0c7cf" stroke={KC.ink} strokeWidth={4} />
      <path d="M -20 -2 L -80 -10 L -80 14 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={3} />
      {[0, 1, 2].map((i) => <line key={i} x1={-30 - i * 16} y1={-6} x2={-30 - i * 16} y2={10} stroke={KC.ink} strokeWidth={2} />)}</g>
    <path d="M -70 0 L 80 0 L 60 34 L -55 34 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-30} y={-40} width={56} height={40} rx={6} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    <rect x={-20} y={-32} width={14} height={14} fill="#bfe7ff" stroke={KC.ink} strokeWidth={3} /><rect x={2} y={-32} width={14} height={14} fill="#bfe7ff" stroke={KC.ink} strokeWidth={3} />
    <line x1={50} y1={0} x2={50} y2={-60} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Avión de 4 motores visto desde un lado con su cono de cámara hacia el mar.
function Avion({ x, y, mar, foto = 0 }) {
  return <g>
    {foto > 0 && <polygon points={`${x - 10},${y + 20} ${x - 150},${mar} ${x + 130},${mar}`} fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth={3} strokeDasharray="10 8" opacity={foto} />}
    <g transform={`translate(${x} ${y})`}>
      <path d="M -170 0 Q -170 -26 -120 -26 L 120 -26 Q 175 -22 190 6 Q 150 22 -150 20 Q -170 16 -170 0 Z" fill="#d9dee6" stroke={KC.ink} strokeWidth={6} />
      <path d="M -150 -22 L -185 -80 L -150 -80 L -110 -24 Z" fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />
      <path d="M -40 -10 L 40 -10 L -10 70 L -50 70 Z" fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={80 - i * 50} y={-18} width={20} height={14} rx={4} fill="#bfe7ff" stroke={KC.ink} strokeWidth={3} />)}
    </g>
  </g>;
}
// Red de pesca enredada ("red fantasma") con flotadores.
function RedEnredada({ x, y, s = 1, T = 0, seed = 5 }) {
  const r = krng(seed), lineas = Array.from({ length: 22 }, () => [(r() - 0.5) * 320, (r() - 0.5) * 140, (r() - 0.5) * 320, (r() - 0.5) * 140, (r() - 0.5) * 200]);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8 + seed) * 3})`}>
    <ellipse rx={175} ry={80} fill="rgba(47,224,168,.35)" />
    {lineas.map(([a, b, c, d, q], i) => <path key={i} d={`M ${a} ${b} Q ${q} ${-q * 0.4} ${c} ${d}`} stroke={i % 3 ? '#1f8a5b' : KC.orange} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    {[[-120, -40], [60, -60], [140, 20], [-40, 50]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={20} ry={14} fill={i % 2 ? KC.yellow : KC.red} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Caja de pescado, trampa de anguila (cono) y separador de ostras: los objetos duros más comunes de la pesca.
function CajaPescado({ x, y, s = 1, rot = 0, c = '#2a6fd6' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -110 -50 L 110 -50 L 95 50 L -95 50 Z" fill={c} stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-36} width={40} height={16} rx={8} fill={KC.ink} /><rect x={40} y={-36} width={40} height={16} rx={8} fill={KC.ink} />
    {[-60, -20, 20, 60].map((a) => <line key={a} x1={a} y1={-6} x2={a} y2={38} stroke="rgba(0,0,0,.35)" strokeWidth={5} />)}
  </g>;
}
function TrampaAnguila({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -100 -40 L 90 -14 L 90 14 L -100 40 Z" fill="#333a44" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-100} cy={0} rx={14} ry={40} fill="#555d69" stroke={KC.ink} strokeWidth={5} />
    {[-60, -20, 20, 60].map((a) => <line key={a} x1={a} y1={-30 + (a + 100) * 0.13} x2={a} y2={30 - (a + 100) * 0.13} stroke="#77808c" strokeWidth={4} />)}
  </g>;
}
function Separador({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-12} width={120} height={24} rx={12} fill="#1d1d1f" stroke={KC.ink} strokeWidth={5} />
    {[-40, -15, 10, 35].map((a) => <rect key={a} x={a} y={-6} width={10} height={12} rx={3} fill="#555" />)}
  </g>;
}
// Boya alargada vieja (rayas despintadas, percebes) con el año grabado.
function BoyaVieja({ x, y, T, s = 1 }) {
  const b = Math.sin(T * 1.8) * 6;
  return <g transform={`translate(${x} ${y + b}) rotate(${Math.sin(T * 1.2) * 4}) scale(${s})`}>
    <line x1={0} y1={-210} x2={0} y2={-260} stroke={KC.ink} strokeWidth={8} /><circle cx={0} cy={-270} r={14} fill="none" stroke={KC.ink} strokeWidth={7} />
    <rect x={-115} y={-200} width={230} height={400} rx={110} fill="#f3e6d2" stroke={KC.ink} strokeWidth={8} />
    {[-110, 30].map((yy) => <rect key={yy} x={-113} y={yy} width={226} height={70} fill="#d4664f" opacity={0.75} />)}
    <rect x={-115} y={-200} width={230} height={400} rx={110} fill="none" stroke={KC.ink} strokeWidth={8} />
    {[[-70, 120], [-40, 150], [60, 140], [80, 100], [-85, 60]].map(([a, c], i) => <circle key={i} cx={a} cy={c} r={12} fill="#cfcabd" stroke={KC.ink} strokeWidth={3} />)}
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill="#6b5a48" stroke={KC.ink} strokeWidth={2}>1966</text>
  </g>;
}
// Báscula de plato.
function Bascula({ x, y, T, aguja = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-30} width={300} height={170} rx={24} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-40} rx={190} ry={26} fill="#c0c7cf" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={60} r={56} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={60} x2={46 * Math.sin(aguja)} y2={60 - 46 * Math.cos(aguja)} stroke={KC.red} strokeWidth={6} strokeLinecap="round" />
    {Array.from({ length: 7 }, (_, i) => <Frag key={i} x={-120 + i * 40} y={-46 + (i % 2) * 6} r={5} c={MP_COL[i]} rot={i * 50} />)}
  </g>;
}

function ManchaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Donde, Gi: CUES.Giro, S: CUES.Sopa, P: CUES.Pregunta, E: CUES.Estudio, R: CUES.Redes, O: CUES.Origen, B: CUES.Boya, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const ISX = 360, ISY = 880;
  const pieY = klerp(-120, ISY - 30, kprog(T, K.G, K.G + 1.35, kEase.suave)) + kprog(T, K.G + 1.35, K.G + 2.2, (p) => p * p) * 500;
  const deshace = kprog(T, K.G + 1.35, K.G + 3.6, kEase.sale);
  const fill46 = 0.46 * kprog(T, K.R + 2.4, K.R + 3.6, kEase.sale);
  const avX = klerp(-260, 470, kprog(T, K.E + 3.0, K.E + 5.4, kEase.sale));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la "isla" que se deshace cuando la pisas */}
      <Escena T={T} a={K.G} b={K.D}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Olas T={T} seed={3} />
          <IslaImaginaria T={T} x={ISX} y={ISY} deshace={deshace} />
          <Chapuzon T={T} x={ISX + 40} y={ISY} at={K.G + 1.35} />
          <Tenis x={ISX - 20} y={pieY} s={1} o={1 - kprog(T, K.G + 1.9, K.G + 2.3)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2–3 · el mapa: entre Hawái y California, y el giro que la junta */}
      <Escena T={T} a={K.D} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaPacifico T={T} t0={K.Gi} mancha={kprog(T, K.D + 0.6, K.D + 2.2)} giro={kprog(T, K.Gi + 0.1, K.Gi + 1.0)} />)}
        <EscalaFija texto="1,000 km · esquema" largo={214} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · la sopa: 1 m × 1 m de mar */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Olas T={T} seed={11} n={10} area={[0, 360, 1080, 820]} color="rgba(255,255,255,.5)" />
          <rect x={120} y={450} width={600} height={600} fill="rgba(255,255,255,.12)" stroke="#fff" strokeWidth={8} strokeDasharray="30 18" strokeDashoffset={-T * 30}
            opacity={kprog(T, K.S + 0.1, K.S + 0.6)} />
          <text x={420} y={1095} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.S + 0.3, K.S + 0.8)}>1 m</text>
          <text x={765} y={760} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.S + 0.3, K.S + 0.8)}>1 m</text>
          <circle cx={430} cy={760} r={34 + 8 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={kprog(T, K.S + 0.8, K.S + 1.2)} /><Frag x={430 + Math.sin(T * 1.3) * 4} y={760 + Math.cos(T) * 3} r={13} c="#fff" rot={T * 20} o={kprog(T, K.S + 0.8, K.S + 1.2)} /></>)}
        <EscalaFija texto="50 cm" largo={300} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.S + 3.6} until={K.P - 0.2} x={800} y={930} r={170} fx={430} fy={760} tinte={KC.yellow} etiqueta="AUMENTADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d3550" />
          <rect x={-10} y={70} width={150} height={150} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          <rect x={130} y={66} width={40} height={158} fill="#c0c7cf" stroke={KC.ink} strokeWidth={5} />
          <rect x={168} y={70} width={40} height={150} rx={14} fill="#ff8fb1" stroke={KC.ink} strokeWidth={5} />
          <text x={120} y={252} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">goma de lápiz</text>
          <Frag x={260} y={110} r={34} c="#fff" rot={20} /><Frag x={250} y={210} r={22} c={KC.blue} rot={80} /><Frag x={300} y={170} r={14} c={KC.red} rot={10} />
          <Frag x={210} y={270} r={12} c={KC.leaf} rot={50} /><Frag x={290} y={260} r={18} c={KC.yellow} rot={140} />
          <line x1={200} y1={310} x2={250} y2={310} stroke="#fff" strokeWidth={5} /><text x={225} y={300} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill="#fff">2 mm</text></svg>} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={280} y={860} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 700)`}>?</text>
          <Bascula x={290} y={1040} T={T} aguja={0.25 * Math.sin(T * 5)} /></>)}
      </Escena>
      {/* 6 · el estudio: 18 barcos en 2015 y un avión en 2016 */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<><rect x={0} y={990} width={KW} height={KH - 990} fill="#1b9fd6" />
          <Olas T={T} seed={21} n={10} area={[0, 1010, 1080, 360]} />
          {[0, 1, 2].map((i) => <BarcoRed key={i} T={T} x={230 + i * 330 + (T - K.E) * 22} y={960} s={0.85} />)}
          {T > K.E + 2.9 && <Avion x={avX} y={640} mar={995} foto={kprog(T, K.E + 4.6, K.E + 5.0)} />}
          {T > K.E + 5.0 && [0, 1].map((i) => <rect key={i} x={avX - 120 + i * 130} y={1000} width={120} height={60} fill="none" stroke="#fff" strokeWidth={5} opacity={0.5 + 0.5 * Math.sin(T * 8 + i)} />)}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · 79 mil toneladas, al menos 46 % redes */}
      <Escena T={T} a={K.R} b={K.O}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={90} y={760} width={900} height={90} rx={20} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
          {fill46 > 0 && <rect x={98} y={768} width={884 * fill46 / 1} height={74} rx={14} fill="#1f8a5b" />}
          {fill46 > 0 && Array.from({ length: Math.floor(fill46 * 30) }, (_, i) => <line key={i} x1={110 + i * 28} y1={772} x2={130 + i * 28} y2={838} stroke={KC.orange} strokeWidth={4} />)}
          <RedEnredada x={400} y={1060} s={0.95} T={T} seed={5} />
          <RedEnredada x={800} y={1080} s={0.6} T={T} seed={9} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · 2019: más de seis mil objetos duros; Japón y China */}
      <Escena T={T} a={K.O} b={K.B}>
        <FondoLunares color={KC.orange} />
        {svg(<><g opacity={kprog(T, K.O + 0.2, K.O + 0.7)} transform="translate(0 -50)">
            <CajaPescado x={260} y={760} rot={-8} /><CajaPescado x={480} y={820} rot={6} s={0.9} c="#e9eef5" />
            <TrampaAnguila x={720} y={760} rot={-12} /><Separador x={240} y={880} rot={20} /><Separador x={880} y={880} rot={-30} />
            <ellipse cx={650} cy={900} rx={60} ry={50} fill="#fff" stroke={KC.ink} strokeWidth={6} /><path d="M 590 900 Q 650 880 710 900" stroke={KC.red} strokeWidth={10} fill="none" />
          </g>
          {[['Japón', 0.34, '34 %'], ['China', 0.32, '32 %']].map(([n, v, t], i) => { const w = 560 * v / 0.34 * kprog(T, K.O + 2.4 + i * 0.4, K.O + 3.2 + i * 0.4, kEase.sale);
            return <g key={n}><text x={90} y={1040 + i * 90} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{n}</text>
              <rect x={270} y={1008 + i * 90} width={w} height={44} rx={12} fill={i ? KC.red : KC.white} stroke={KC.ink} strokeWidth={5} />
              {w > 40 && <text x={290 + w} y={1043 + i * 90} style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>{t}</text>}</g>; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · la boya de 1966 */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><rect x={0} y={1060} width={KW} height={KH - 1060} fill="#1b9fd6" opacity={0.9} /><Olas T={T} seed={31} n={6} area={[0, 1070, 1080, 150]} />
          <BoyaVieja x={790} y={860} T={T} s={kprog(T, K.B, K.B + 0.5, kEase.rebote) * 0.85} /></>)}
      </Escena>
      {/* 10 · cierre: el mismo mar del inicio, ya sin isla: sopa que gira y redes a la deriva */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Olas T={T} seed={3} />
          <ellipse cx={ISX} cy={ISY} rx={265} ry={88} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="20 14" opacity={0.6} />
          {MP_PIEZAS.map((p, i) => { const th = (T - K.C) * (0.25 + (i % 5) * 0.04) + i, rr = 120 + (i * 37) % 360;
            return <Frag key={i} x={ISX + 60 + Math.cos(th) * rr * 1.3} y={ISY - 80 + Math.sin(th) * rr * 0.9} r={p.s} c={p.c} rot={p.rot} />; })}
          <RedEnredada x={760 - (T - K.C) * 20} y={1080} s={0.55} T={T} seed={5} />
          <RedEnredada x={240 + (T - K.C) * 15} y={560} s={0.45} T={T} seed={9} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.1} tacharEn={K.G + 1.5} until={K.D - 0.2} texto="isla de basura" x={330} y={480} tam={46} />
      <Chip T={T} at={K.G + 2.4} until={K.D - 0.2} texto="sopa de plástico" x={360} y={1130} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.D + 1.2} until={K.Gi - 0.2} valor={1600000} dur={1.0} sufijo=" km²" etiqueta="en 2015:" x={560} y={470} tam={84} color={KC.yellow} />
      <Etq T={T} at={K.D + 0.6} until={K.S - 0.2} x={240} y={1010} texto="Hawái" tam={32} color={KC.ink} />
      <Etq T={T} at={K.D + 0.9} until={K.S - 0.2} x={1000} y={660} texto="California" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Gi + 0.3} until={K.S - 0.2} texto="giro oceánico: corrientes que dan vueltas" x={640} y={400} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.5} until={K.S + 3.9} texto="en promedio: < 1 pieza por m²" x={420} y={380} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.S + 4.1} until={K.P - 0.2} texto="94 de cada 100: < 5 mm" x={360} y={380} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.P + 0.3} until={K.E - 0.2} texto="¿qué pesa más?" x={300} y={420} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.3} until={K.E + 2.9} texto="2015 · 18 barcos" x={360} y={430} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.E + 3.1} until={K.R - 0.2} texto="2016 · fotos desde un avión" x={380} y={430} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.R + 0.3} until={K.O - 0.2} valor={79} dur={1.2} sufijo=" mil" etiqueta="toneladas de plástico:" x={660} y={470} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.R + 1.0} until={K.O - 0.2} texto="Lebreton et al. 2018 · Sci. Rep." x={660} y={660} tam={26} borde={KC.ink} mono />
      <Etq T={T} at={K.R + 3.0} until={K.O - 0.2} x={98} y={900} texto="≥ 46 % redes de pesca" tam={34} color={KC.ink} />
      <Chip T={T} at={K.O + 0.3} until={K.B - 0.2} texto="2019 · más de 6 mil objetos" x={380} y={400} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.O + 1.0} until={K.B - 0.2} x={150} y={630} texto="caja de pescado" tam={26} color={KC.ink} />
      <Etq T={T} at={K.O + 1.4} until={K.B - 0.2} x={760} y={640} texto="trampa" lado="izq" tam={26} color={KC.ink} />
      <Etq T={T} at={K.O + 2.4} until={K.B - 0.2} x={90} y={965} texto="objetos con origen identificado:" tam={24} color={KC.ink} />
      <Chip T={T} at={K.B + 0.4} until={K.C - 0.2} texto="el más viejo con fecha legible" x={660} y={420} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="no es isla: es sopa" x={380} y={430} tam={40} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="No es una isla: *es una sopa.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.Gi - 0.1} texto="Entre Hawái y California: *1.6 millones de km².*" />
      <Subtitulo T={T} idx={2} at={K.Gi + 0.1} until={K.S - 0.1} texto="Un *giro oceánico* junta lo que flota." />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.P - 0.1} texto="Menos de 1 pieza por m²: *casi todo diminuto.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué es lo que *más pesa?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="2015: barcos. *2016: un avión.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.O - 0.1} texto="79 mil toneladas: *46 % redes de pesca.*" />
      <Subtitulo T={T} idx={7} at={K.O + 0.1} until={K.B - 0.1} texto="2 de cada 3: *Japón o China.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.C - 0.1} texto="El más viejo: *una boya de 1966.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo que más pesa: *redes perdidas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Donde + 2.4, CUES.Donde + 6.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Giro + 2.8, CUES.Sopa - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Sopa + 4.0, CUES.Pregunta - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Redes - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Redes + 2.5, CUES.Origen - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Origen + 3.0, CUES.Boya - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Boya + 0.05, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_12_perfil_serio', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="58" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ManchaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ManchaShot /></CompositionStage></div>;
}
window.ManchaApp = ManchaApp;
