// Shot Científico #27 · Tu pie no se duerme: tus nervios hacen corto — NARRADO (N1 "Por dentro": la pierna con su nervio).
// Datos: NHS y Cleveland Clinic (pins and needles / parestesia), Cleveland Clinic y McGill (nervio cubital, "funny bone").
// Ver guion.md y verificacion.md. El dibujo es esquemático (nervio, pierna y codo). Sin cifras en pantalla.
const NERV = KC.yellow, SANG = KC.red, GRIS = '#a7acb6', PANT = '#3a3f5c', PANT2 = '#2b2f4a';

// ---------- utilidades ----------
const hex2 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mezclaC = (a, b, u) => { const A = hex2(a), B = hex2(b); return `rgb(${A.map((v, i) => Math.round(klerp(v, B[i], Math.max(0, Math.min(1, u))))).join(',')})`; };
const lerp2 = (a, b, u) => [klerp(a[0], b[0], u), klerp(a[1], b[1], u)];
const bz = (p0, p1, p2, p3, u) => { const v = 1 - u; return [0, 1].map((k) => v * v * v * p0[k] + 3 * v * v * u * p1[k] + 3 * v * u * u * p2[k] + u * u * u * p3[k]); };
// Puntos de una ruta hecha de curvas cúbicas [[p0,p1,p2,p3], …]
function rutaPts(segs, n = 24) { const out = []; segs.forEach((s, j) => { for (let i = j ? 1 : 0; i <= n; i++) out.push(bz(s[0], s[1], s[2], s[3], i / n)); }); return out; }
// Punto a la fracción u (por longitud) de una polilínea.
function enRuta(pts, u) {
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = Math.max(0, Math.min(1, u)) * L[L.length - 1];
  for (let i = 1; i < pts.length; i++) if (L[i] >= d) { const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return lerp2(pts[i - 1], pts[i], f); }
  return pts[pts.length - 1];
}
const tramo = (pts, u) => { const n = Math.max(2, Math.round(pts.length * Math.max(0, Math.min(1, u)))); return pts.slice(0, n); };
const dPol = (pts) => 'M ' + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ');

// Trazo grueso con contorno (pierna, brazo).
function Extremidad({ pts, ancho = 80, color = PANT }) {
  const d = dPol(pts);
  return <g><path d={d} stroke={KC.ink} strokeWidth={ancho + 16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
}
// Línea de nervio (amarilla con contorno) o de vaso (roja).
function Linea({ pts, color = NERV, ancho = 12, o = 1, brillo = 0 }) {
  const d = dPol(pts);
  return <g opacity={o}>
    {brillo > 0 && <path d={d} stroke={color} strokeWidth={ancho + 30} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.35 * brillo} />}
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
}
// Chispas revueltas: zigzags que parpadean alrededor de (x, y).
function Chispas({ T, x, y, n = 9, radio = 120, o = 1, seed = 3, tam = 46 }) {
  if (o <= 0.01) return null;
  const g = krng(seed), cols = [KC.yellow, KC.cyan, '#fff', KC.gold2];
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => {
    const a = g() * Math.PI * 2, r = radio * (0.35 + 0.65 * g()), fase = g() * 10, vel = 5 + g() * 6;
    const on = Math.sin(T * vel + fase) > -0.2; if (!on) return null;
    const cx = x + Math.cos(a + Math.sin(T * 2 + i) * 0.3) * r, cy = y + Math.sin(a + Math.sin(T * 2 + i) * 0.3) * r, rot = (g() * 360 + T * 200 * (i % 2 ? 1 : -1)) % 360;
    const s = tam / 46 * (0.7 + 0.5 * Math.abs(Math.sin(T * 9 + fase)));
    return <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
      <path d="M -24 -8 L -6 -14 L -2 2 L 14 -4 L 24 10" fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -24 -8 L -6 -14 L -2 2 L 14 -4 L 24 10" fill="none" stroke={cols[i % 4]} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></g>;
  })}</g>;
}

// ---------- persona sentada de perfil (mira a la derecha). Origen = cadera; piso en y = 330 ----------
const PB = { cad: [0, 0], rod: [262, 10], tob: [272, 300], pun: [372, 318] };          // pierna de atrás
function piernaArriba(cruza) {                                                          // cruza 1 = pierna cruzada, 0 = pie en el piso
  return { cad: [0, -22], rod: lerp2([285, -2], [300, -52], cruza), tob: lerp2([292, 300], [392, 212], cruza), pun: lerp2([392, 318], [488, 236], cruza) };
}
function Pie({ tob, pun, color = CPIEL, tap = 0 }) {
  const a = tap * Math.PI / 180, dx = pun[0] - tob[0], dy = pun[1] - tob[1];
  const p2 = [tob[0] + dx * Math.cos(a) - dy * Math.sin(a), tob[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  return <g><line x1={tob[0]} y1={tob[1]} x2={p2[0]} y2={p2[1]} stroke={KC.ink} strokeWidth={70} strokeLinecap="round" />
    <line x1={tob[0]} y1={tob[1]} x2={p2[0]} y2={p2[1]} stroke={color} strokeWidth={54} strokeLinecap="round" /></g>;
}
function Persona({ x, y, s = 1, cruza = 1, corte = 0, gris = 0, tap = 0, gesto = 'normal', T = 0, aprieta = 0 }) {
  const P = piernaArriba(cruza), colPie = mezclaC(CPIEL, GRIS, gris);
  const nervio = [[P.cad[0] - 6, P.cad[1] - 10], [P.rod[0] - 8, P.rod[1] - 8], [P.tob[0] - 14, P.tob[1]], [P.pun[0], P.pun[1] - 4]];
  const vaso = [[P.cad[0] + 6, P.cad[1] + 10], [P.rod[0] + 2, P.rod[1] + 14], [P.tob[0] + 12, P.tob[1] + 4]];
  const presion = [P.rod[0] - 25, P.rod[1] + 22];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-95} y1={50} x2={-112} y2={330} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={85} y1={50} x2={102} y2={330} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <rect x={-135} y={16} width={255} height={46} rx={18} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <Extremidad pts={[PB.cad, PB.rod, PB.tob]} ancho={78} color={PANT2} />
    <Pie tob={PB.tob} pun={PB.pun} color={CPIEL2} />
    <rect x={-85} y={-335} width={155} height={370} rx={62} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} />
    <CabezaPerfil x={8} y={-468} s={0.7} gesto={gesto} />
    <Extremidad pts={[P.cad, P.rod, P.tob]} ancho={84} color={PANT} />
    <Pie tob={P.tob} pun={P.pun} color={colPie} tap={tap} />
    <Extremidad pts={[[-5, -285], [60, -130], [185, -80 + (1 - cruza) * 40]]} ancho={50} color={KC.cyan} />
    <circle cx={198} cy={-78 + (1 - cruza) * 40} r={28} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    {corte > 0 && <g opacity={corte}>
      <Linea pts={vaso} color={SANG} ancho={10} />
      <Linea pts={nervio} color={NERV} ancho={12} brillo={aprieta} />
      {aprieta > 0 && <circle cx={presion[0]} cy={presion[1]} r={30 + 10 * Math.sin(T * 8)} fill="none" stroke={KC.red} strokeWidth={8} opacity={aprieta} />}
    </g>}
  </g>;
}
// Posición en pantalla (para Lupa y efectos): punto local → pantalla.
const PER = { x: 230, y: 850, s: 1.1 };
const enPer = (p, pe = PER) => [pe.x + p[0] * pe.s, pe.y + p[1] * pe.s];

// «zzz» que suben del pie.
function Zzz({ T, x, y, o = 1, tacha = 0 }) {
  return <g opacity={o}>
    {[0, 1, 2].map((i) => { const f = ((T * 0.45 + i / 3) % 1); return <text key={i} x={x + 20 + i * 52 + Math.sin(T * 2 + i) * 10} y={y - 40 - i * 80 - f * 20}
      style={{ font:`400 ${60 + i * 26}px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={9} paintOrder="stroke">Z</text>; })}
    {tacha > 0 && <line x1={x - 10} y1={y - 10} x2={klerp(x - 10, x + 210, tacha)} y2={klerp(y - 10, y - 300, tacha)} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />}
  </g>;
}

// ---------- corte del nervio y el vaso (para la Lupa) ----------
// apriete 0..1 = qué tanto los aplasta el peso · desorden 0..1 = señales revueltas · W = lado del cuadro.
function CorteNervio({ t, W, apriete = 0, desorden = 0 }) {
  const c = W / 2, g = (x) => Math.exp(-Math.pow((x - c) / 80, 2));
  const tubo = (cy, th, k) => { const top = [], bot = []; for (let x = -10; x <= W + 10; x += 10) { const e = th * (1 - k * g(x)); top.push(`${x},${cy - e}`); bot.unshift(`${x},${cy + e}`); } return `M ${top.join(' L ')} L ${bot.join(' L ')} Z`; };
  const yN = c - 55, yV = c + 75, ap = apriete * 0.72;
  const bloqueY = klerp(-140, yN - 46 + 0, apriete);
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill="#3a1d26" />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 97) % W} cy={(i * 53) % W} r={14} fill="#5a2c38" />)}
    {/* vaso sanguíneo con glóbulos */}
    <path d={tubo(yV, 34, ap)} fill="#7a1420" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const f = ((t * 0.35 + i / 9) % 1), x = f * (W + 60) - 30; const pasa = x < c - 70 || i % 3 === 0 || apriete < 0.3;
      if (!pasa) return null; const e = 1 - ap * g(x); return <ellipse key={i} cx={x} cy={yV} rx={18 * e} ry={12 * e} fill={SANG} stroke="#5a0d16" strokeWidth={3} />; })}
    {/* nervio con sus fibras */}
    <path d={tubo(yN, 40, ap)} fill="#e8c21a" stroke={KC.ink} strokeWidth={5} />
    {[-18, 0, 18].map((o) => { const pts = []; for (let x = 0; x <= W; x += 10) pts.push(`${x},${yN + o * (1 - ap * g(x))}`); return <polyline key={o} points={pts.join(' ')} fill="none" stroke="#b8920a" strokeWidth={4} />; })}
    {/* mensajes (bolitas de luz) */}
    {Array.from({ length: 7 }, (_, i) => {
      let x = ((t * 0.5 + i / 7) % 1) * (W + 40) - 20, y = yN;
      if (apriete > 0.5 && desorden < 0.5 && x > c - 90) { x = c - 90 - (i % 4) * 26; }
      if (desorden > 0) { x += Math.sin(t * 13 + i * 2.1) * 60 * desorden; y += Math.cos(t * 11 + i) * 22 * desorden; }
      return <circle key={i} cx={x} cy={y} r={11} fill="#fff" stroke={KC.cyan} strokeWidth={4} />;
    })}
    {desorden > 0 && <Chispas T={t} x={c} y={yN} n={7} radio={W * 0.42} o={desorden} seed={8} tam={40} />}
    {/* el peso que aprieta (la otra rodilla) */}
    <g transform={`translate(${c} ${bloqueY})`}>
      <rect x={-90} y={-160} width={180} height={160} rx={60} fill={PANT2} stroke={KC.ink} strokeWidth={8} />
      <path d="M -30 -110 L 0 -60 L 30 -110" fill="none" stroke={KC.white} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={apriete} />
    </g>
  </svg>;
}

// ---------- pie grande de perfil (mira a la derecha). (x, y) = tobillo ----------
const PIEPATH = 'M -78 -10 C -98 80 -66 118 -4 118 L 290 118 C 350 118 368 62 326 40 C 258 14 150 4 74 -34 Z';
function PieGrande({ x, y, s = 1, gris = 0, corte = 0, T = 0, chispas = 0, baja = 0 }) {
  const piel = mezclaC(CPIEL, GRIS, gris);
  const nerv = [[-6, -470], [-12, -260], [6, -40], [60, 50], [180, 80], [300, 82]];
  return <g transform={`translate(${x} ${y + baja}) scale(${s})`}>
    <ellipse cx={130} cy={150 - baja / s} rx={250} ry={22} fill="rgba(0,0,0,.18)" />
    <rect x={-78} y={-480} width={156} height={500} rx={60} fill={piel} stroke={KC.ink} strokeWidth={10} />
    <path d={PIEPATH} fill={piel} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle cx={330} cy={78} r={34} fill={piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -82 -480 L 82 -480 L 90 -330 L -90 -330 Z" fill={PANT} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {gris > 0.4 && <path d={PIEPATH} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="18 16" opacity={(gris - 0.4) * 1.6} />}
    {corte > 0 && <g opacity={corte}><Linea pts={nerv} ancho={14} brillo={chispas} />
      <Linea pts={[[180, 80], [260, 105]]} ancho={9} /><Linea pts={[[110, 70], [210, 30]]} ancho={9} /></g>}
    {chispas > 0 && <><Chispas T={T} x={150} y={60} n={10} radio={190} o={chispas} seed={4} /><Chispas T={T + 1} x={0} y={-200} n={5} radio={110} o={chispas} seed={6} /></>}
  </g>;
}
// Agujita que pica (la punta en (x, y), apunta según ang).
function Aguja({ x, y, ang, o = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={-150} y2={0} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <line x1={0} y1={0} x2={-150} y2={0} stroke="#dfe6ef" strokeWidth={8} strokeLinecap="round" />
    <ellipse cx={-136} cy={0} rx={9} ry={4} fill={KC.ink} />
  </g>;
}
// Cerebro esquemático.
function Cerebro({ x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle r={150} fill={KC.yellow} opacity={0.25 * brillo} />}
    <path d="M -110 20 C -140 -40 -100 -100 -40 -100 C -10 -130 60 -125 80 -90 C 130 -85 150 -20 120 20 C 130 70 70 100 30 85 C 0 110 -60 105 -70 75 C -120 80 -130 45 -110 20 Z" fill="#f7a8c0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -70 -50 C -40 -70 -20 -40 0 -60 M -80 10 C -50 -10 -30 20 0 0 C 20 -20 50 10 80 -20 M -30 60 C -10 40 20 70 50 40 M 30 -80 C 40 -50 70 -60 90 -40" fill="none" stroke="#c4607f" strokeWidth={7} strokeLinecap="round" />
  </g>;
}
// Reloj sin números: la manecilla corre (giro 0..1 = fracción de vuelta).
function Reloj({ x, y, r = 170, giro = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-r - 40} width={52} height={34} rx={8} fill={KC.ink} />
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={14} />
    <path d={`M 0 0 L 0 ${-r + 26} A ${r - 26} ${r - 26} 0 ${giro > 0.5 ? 1 : 0} 1 ${Math.sin(giro * 2 * Math.PI) * (r - 26)} ${-Math.cos(giro * 2 * Math.PI) * (r - 26)} Z`} fill={KC.mint} opacity={0.55} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 14} x2={0} y2={-r + (i % 3 ? 30 : 44)} stroke={KC.ink} strokeWidth={i % 3 ? 6 : 10} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" transform={`rotate(${giro * 30 + 60})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.75} stroke={KC.red} strokeWidth={10} strokeLinecap="round" transform={`rotate(${giro * 360})`} />
    <circle r={14} fill={KC.ink} />
  </g>;
}
// Cruz médica.
function CruzMedica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={110} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <path d="M -28 -75 H 28 V -28 H 75 V 28 H 28 V 75 H -28 V 28 H -75 V -28 H -28 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}

// ---------- brazo con el codo (vista del lado de la palma; pulgar arriba, meñique abajo) ----------
// El nervio cubital pasa por el lado INTERNO del codo (abajo, detrás del bulto del hueso) y llega al anular y al meñique.
const BR = { hom: [-40, 760], codo: [420, 900], mun: [790, 830] };
const DEDOS = [ // [base, punta] índice, medio, anular, meñique
  [[905, 770], [1030, 735]], [[912, 806], [1052, 790]], [[908, 842], [1040, 850]], [[892, 874], [990, 902]]];
const NCUB = rutaPts([[[60, 850], [220, 890], [330, 960], [420, 1010]], [[420, 1010], [520, 1050], [560, 900], [700, 880]], [[700, 880], [800, 868], [860, 870], [895, 860]]], 22);
const NANU = rutaPts([[[895, 860], [960, 855], [1000, 852], [1030, 852]]], 8), NMEN = rutaPts([[[895, 860], [930, 880], [960, 890], [982, 900]]], 8);
function Brazo({ T, corte = 0.5, dy = 0, rayo = -1, glow = 0 }) {
  const brillo = Math.max(0, Math.min(1, glow));
  return <g transform={`translate(0 ${dy})`}>
    {/* contornos */}
    <path d={dPol([BR.hom, BR.codo, BR.mun])} stroke={KC.ink} strokeWidth={166} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={418} cy={985} r={52} fill={KC.ink} />
    {DEDOS.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={50} strokeLinecap="round" />)}
    <line x1={850} y1={770} x2={905} y2={690} stroke={KC.ink} strokeWidth={54} strokeLinecap="round" />
    <rect x={800} y={745} width={140} height={160} rx={60} fill={KC.ink} transform="rotate(-6 870 825)" />
    {/* rellenos */}
    <path d={dPol([BR.hom, BR.codo, BR.mun])} stroke={CPIEL} strokeWidth={150} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={418} cy={985} r={44} fill={CPIEL} />
    <path d={dPol([BR.hom, [180, 800]])} stroke={KC.cyan} strokeWidth={150} fill="none" strokeLinecap="round" />
    <line x1={185} y1={720} x2={175} y2={880} stroke={KC.ink} strokeWidth={9} />
    {DEDOS.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={i >= 2 ? mezclaC(CPIEL, '#ffe14d', brillo) : CPIEL} strokeWidth={36} strokeLinecap="round" />)}
    <line x1={850} y1={770} x2={905} y2={690} stroke={CPIEL} strokeWidth={40} strokeLinecap="round" />
    <rect x={808} y={753} width={124} height={144} rx={54} fill={CPIEL} transform="rotate(-6 870 825)" />
    <path d="M 835 790 Q 870 830 850 875" fill="none" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
    {/* por dentro: huesos y nervio */}
    {corte > 0 && <g opacity={corte}>
      <path d={dPol([[40, 790], [400, 905]])} stroke="#fbf6ea" strokeWidth={40} strokeLinecap="round" fill="none" opacity={0.9} />
      <circle cx={415} cy={955} r={30} fill="#fbf6ea" opacity={0.9} />
      <path d={dPol([[430, 915], [770, 850]])} stroke="#fbf6ea" strokeWidth={26} strokeLinecap="round" fill="none" opacity={0.9} />
      <Linea pts={NCUB} ancho={12} /><Linea pts={NANU} ancho={8} /><Linea pts={NMEN} ancho={8} />
    </g>}
    {/* el rayito: corre por el nervio hasta el anular y el meñique */}
    {rayo > 0 && <g>
      <Linea pts={tramo(NCUB, Math.min(1, rayo * 1.25))} color="#fff6b0" ancho={16} brillo={1} />
      {rayo > 0.8 && <><Linea pts={tramo(NANU, (rayo - 0.8) * 5)} color="#fff6b0" ancho={12} brillo={1} /><Linea pts={tramo(NMEN, (rayo - 0.8) * 5)} color="#fff6b0" ancho={12} brillo={1} /></>}
      {rayo < 1 && (() => { const p = enRuta(NCUB, Math.min(1, rayo * 1.25)); return <Chispas T={T} x={p[0]} y={p[1]} n={5} radio={50} seed={11} tam={50} />; })()}
    </g>}
    {brillo > 0.05 && <><Chispas T={T} x={1035} y={852} n={4} radio={45} o={brillo} seed={12} tam={40} /><Chispas T={T + 2} x={990} y={905} n={4} radio={45} o={brillo} seed={13} tam={40} /></>}
  </g>;
}
// Mesa contra la que se pega el codo.
function Mesa() {
  return <g><rect x={250} y={1050} width={900} height={50} rx={10} fill="#a8672f" stroke={KC.ink} strokeWidth={9} /><rect x={270} y={1100} width={860} height={90} fill="#7e4a20" stroke={KC.ink} strokeWidth={9} /></g>;
}
// Corte del codo para la Lupa: piel delgada, nervio y hueso.
function CorteCodo({ t, W, rayo = 0 }) {
  const c = W / 2;
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill="#2a1820" />
    <path d={`M 0 ${c - 70} Q ${c} ${c - 120} ${W} ${c - 70} L ${W} ${-10} L 0 ${-10} Z`} fill="#16202e" />
    <path d={`M 0 ${c - 70} Q ${c} ${c - 120} ${W} ${c - 70} L ${W} ${c - 45} Q ${c} ${c - 95} 0 ${c - 45} Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={5} />
    <circle cx={c} cy={c - 40} r={30} fill={NERV} stroke={KC.ink} strokeWidth={6} />
    {[-12, 0, 12].map((o) => <circle key={o} cx={c + o} cy={c - 40 + (o ? 8 : -8)} r={6} fill="#b8920a" />)}
    <circle cx={c} cy={c + 90} r={95} fill="#fbf6ea" stroke={KC.ink} strokeWidth={7} />
    <circle cx={c - 20} cy={c + 80} r={50} fill="none" stroke="#e6dcc4" strokeWidth={10} />
    {rayo > 0 && <><circle cx={c} cy={c - 40} r={44 + 8 * Math.sin(t * 20)} fill="none" stroke="#fff6b0" strokeWidth={8} opacity={rayo} /><Chispas T={t} x={c} y={c - 40} n={6} radio={80} o={rayo} seed={21} tam={40} /></>}
    <text x={22} y={c - 98} style={{ font:`700 26px ${KF.mono}` }} fill="#fff">piel</text>
    <text x={c + 42} y={c - 30} style={{ font:`700 26px ${KF.mono}` }} fill={NERV}>nervio</text>
    <text x={c - 40} y={c + 205} style={{ font:`700 26px ${KF.mono}` }} fill="#fbf6ea">hueso</text>
  </svg>;
}

// ---------- ruta del nervio del pie al cerebro (escena Señal) ----------
const RUTA = rutaPts([[[175, 960], [170, 840], [250, 800], [260, 700]], [[260, 700], [270, 600], [330, 560], [430, 530]]], 30);
const UPINCH = 0.42;
const VASO = RUTA.map(([x, y]) => [x + 30, y + 14]);

function Pie_() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const PIEC = enPer(piernaArriba(1).pun), TOBC = enPer(piernaArriba(1).tob);
  const cruza4 = 1 - kprog(T, K.Hormigueo + 0.3, K.Hormigueo + 1.5, kEase.suave);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: pierna cruzada, pie «dormido»: los zzz se tachan y salen chispas revueltas */}
      <Escena T={T} a={K.Gancho} b={K.Posicion} fondo={KC.pink} origen="60% 60%">
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Persona x={PER.x} y={PER.y} s={PER.s} cruza={1} gris={0.5} T={T} />
          <Zzz T={T} x={PIEC[0] - 60} y={PIEC[1] - 40} o={1 - kprog(T, K.Gancho + 2.6, K.Gancho + 3.0)} tacha={kprog(T, K.Gancho + 1.0, K.Gancho + 1.4, kEase.sale)} />
          <Chispas T={T} x={PIEC[0] - 40} y={PIEC[1] - 20} n={12} radio={150} o={kprog(T, K.Gancho + 2.6, K.Gancho + 3.0)} seed={2} />
        </Lienzo>
        <Etq T={T} at={K.Gancho + 2.8} until={K.Posicion - 0.2} x={PIEC[0] - 230} y={PIEC[1] + 70} texto="mensajes revueltos" lado="izq" color={KC.texto} />
      </Escena>

      {/* 1 · la posición: por dentro, el nervio y el vaso aplastados por el peso */}
      <Escena T={T} a={K.Posicion} b={K.Senal} fondo={KC.cyan} origen="45% 55%">
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Persona x={PER.x} y={PER.y} s={PER.s} cruza={1} gris={0.5} T={T} corte={kprog(T, K.Posicion + 0.8, K.Posicion + 1.4)} aprieta={kprog(T, K.Posicion + 1.6, K.Posicion + 2.2)} />
          <FlechaRecta x1={enPer([262, -330])[0]} y1={enPer([262, -330])[1]} x2={enPer([262, -110])[0]} y2={enPer([262, -110])[1]} p={kprog(T, K.Posicion + 0.3, K.Posicion + 0.9, kEase.sale)} color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Posicion + 0.3} until={K.Posicion + 2.4} texto="peso" x={enPer([262, -360])[0] + 140} y={enPer([262, -360])[1]} tam={40} borde={KC.yellow} />
        <Lupa T={T} at={K.Posicion + 2.4} until={K.Senal - 0.25} x={640} y={470} r={210} fx={enPer([260, 10])[0]} fy={enPer([260, 10])[1]} tinte={NERV} etiqueta="POR DENTRO · PIERNA"
          interior={(t, r) => <CorteNervio t={t} W={r * 2} apriete={kprog(t, K.Posicion + 3.0, K.Posicion + 4.0, kEase.suave)} />} />
        <Etq T={T} at={K.Posicion + 3.2} until={K.Senal - 0.25} x={420} y={400} texto="nervio" lado="izq" color={KC.yellow} />
        <Etq T={T} at={K.Posicion + 3.6} until={K.Senal - 0.25} x={420} y={530} texto="sangre" lado="izq" color={KC.white} />
      </Escena>

      {/* 2 · la señal: los mensajes del pie al cerebro se atoran donde está aplastado */}
      <Escena T={T} a={K.Senal} b={K.Entumido} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <PieGrande x={170} y={1080} s={0.42} gris={0.5} />
          <Linea pts={VASO} color={SANG} ancho={9} o={0.9} />
          <Linea pts={RUTA} ancho={14} />
          {/* glóbulos: menos después del apretón */}
          {Array.from({ length: 12 }, (_, i) => { const u = ((T - K.Senal) * 0.22 + i / 12) % 1; if (u > UPINCH && i % 3) return null; const p = enRuta(VASO, u);
            return <circle key={i} cx={p[0]} cy={p[1]} r={9} fill={SANG} stroke="#5a0d16" strokeWidth={3} />; })}
          {/* mensajes que se atoran */}
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Senal + 0.6 + i * 0.4; if (T < t0) return null;
            const pasa = i === 4; let u = (T - t0) * 0.32; if (!pasa) u = Math.min(u, UPINCH - 0.02 - (i - (i > 4 ? 1 : 0)) * 0.022); else u = Math.min(1, u);
            const p = enRuta(RUTA, u), op = pasa && u > UPINCH ? 0.45 : 1;
            return <g key={i} opacity={op}><circle cx={p[0]} cy={p[1]} r={22} fill="#fff" opacity={0.25} /><circle cx={p[0]} cy={p[1]} r={12} fill="#fff" stroke={KC.cyan} strokeWidth={4} /></g>; })}
          {/* el apretón */}
          {(() => { const p = enRuta(RUTA, UPINCH), k = kprog(T, K.Senal + 0.2, K.Senal + 0.7, kEase.sale); return <g transform={`translate(${p[0]} ${p[1]}) rotate(-60)`}>
            <rect x={-110} y={-75 + (1 - k) * -60} width={220} height={52} rx={18} fill={PANT2} stroke={KC.ink} strokeWidth={8} />
            <rect x={-110} y={23 + (1 - k) * 60} width={220} height={52} rx={18} fill={PANT2} stroke={KC.ink} strokeWidth={8} /></g>; })()}
          <Cerebro x={560} y={470} s={0.9} brillo={0} />
        </Lienzo>
        <Etq T={T} at={K.Senal + 0.5} until={K.Entumido - 0.2} x={300} y={1120} texto="pie" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Senal + 0.8} until={K.Entumido - 0.2} x={420} y={340} texto="cerebro" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Senal + 1.0} until={K.Entumido - 0.2} texto="menos sangre" x={740} y={870} tam={40} borde={SANG} />
        <Chip T={T} at={K.Senal + 2.6} until={K.Entumido - 0.2} texto="mensajes atorados" x={740} y={980} tam={40} borde={NERV} />
      </Escena>

      {/* 3 · entumido: el pie gris y pesado, como de otro */}
      <Escena T={T} a={K.Entumido} b={K.Hormigueo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <PieGrande x={500} y={960} s={1} gris={kprog(T, K.Entumido + 0.2, K.Entumido + 1.0)} T={T}
            baja={kprog(T, K.Entumido + 1.6, K.Entumido + 1.9, kEase.rebote) * 40 - 40 + Math.sin(T * 1.5) * 4} />
        </Lienzo>
        <Chip T={T} at={K.Entumido + 0.4} until={K.Hormigueo - 0.1} texto="entumido" x={660} y={430} tam={48} borde={GRIS} />
        <Chip T={T} at={K.Entumido + 1.6} until={K.Hormigueo - 0.1} texto="pesado" x={660} y={530} tam={48} borde={KC.ink} />
        <Etq T={T} at={K.Entumido + 2.3} until={K.Hormigueo - 0.1} x={880} y={1010} texto="¿es tuyo?" lado="izq" color={KC.ink} tam={36} />
      </Escena>

      {/* 4 · hormigueo: descruzas la pierna, el nervio se destapa y las señales salen revueltas */}
      <Escena T={T} a={K.Hormigueo} b={K.Agujas} fondo={KC.orange} origen="55% 60%">
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Persona x={PER.x} y={PER.y} s={PER.s} cruza={cruza4} gris={0.5 * (1 - kprog(T, K.Hormigueo + 3, K.Agujas))} T={T} corte={kprog(T, K.Hormigueo + 1.4, K.Hormigueo + 1.9)} gesto="mueca" />
          {(() => { const P = piernaArriba(cruza4), a = enPer(P.tob), b = enPer(P.pun); return <Chispas T={T} x={(a[0] + b[0]) / 2} y={(a[1] + b[1]) / 2 - 20} n={14} radio={170} o={kprog(T, K.Hormigueo + 1.6, K.Hormigueo + 2.2)} seed={5} />; })()}
        </Lienzo>
        <Chip T={T} at={K.Hormigueo + 0.3} until={K.Hormigueo + 2.3} texto="se va la presión" x={540} y={430} tam={42} borde={KC.mint} />
        <Lupa T={T} at={K.Hormigueo + 2.3} until={K.Agujas - 0.25} x={640} y={470} r={200} fx={enPer([300, 30])[0]} fy={enPer([300, 30])[1]} tinte={NERV} etiqueta="POR DENTRO · NERVIO"
          interior={(t, r) => <CorteNervio t={t} W={r * 2} apriete={0} desorden={kprog(t, K.Hormigueo + 2.6, K.Hormigueo + 3.2)} />} />
        <Etq T={T} at={K.Hormigueo + 3.4} until={K.Agujas - 0.25} x={420} y={760} texto="señales desordenadas" lado="izq" color={KC.white} />
      </Escena>

      {/* 5 · agujas que no existen: pican… y desaparecen; es el nervio despertando */}
      <Escena T={T} a={K.Agujas} b={K.Nombre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <PieGrande x={330} y={900} s={1} gris={0.15} corte={kprog(T, K.Agujas + 3.4, K.Agujas + 3.9)} T={T} chispas={kprog(T, K.Agujas + 3.4, K.Agujas + 3.9)} />
          {[[300, 1018, -90], [420, 1018, -100], [540, 1018, -80], [180, 1018, -70], [560, 960, -150], [640, 950, -165], [460, 935, -140], [300, 870, 180], [280, 650, 180], [420, 720, 0], [420, 560, 10], [250, 780, 170],
            [130, 1000, -30], [380, 990, -110]].map(([x, y, a], i) => {
            const ent = kprog(T, K.Agujas + 0.15 + i * 0.1, K.Agujas + 0.4 + i * 0.1, kEase.sale), sal = kprog(T, K.Agujas + 2.6 + (i % 4) * 0.06, K.Agujas + 2.9 + (i % 4) * 0.06);
            const pica = Math.max(0, Math.sin(T * 14 + i * 1.7)) * 16, d = (1 - ent) * 220 + pica;
            const r = a * Math.PI / 180;
            return <Aguja key={i} x={x - Math.cos(r) * d} y={y - Math.sin(r) * d} ang={a} o={ent * (1 - sal)} s={1 - sal * 0.6} />; })}
          <Onomato T={T} at={K.Agujas + 2.6} dur={0.7} x={760} y={760} texto="¡PUF!" color={KC.white} tam={120} />
        </Lienzo>
        <Chip T={T} at={K.Agujas + 0.5} until={K.Agujas + 2.6} texto="miles de agujitas" x={540} y={430} tam={44} borde={KC.white} />
        <Chip T={T} at={K.Agujas + 2.8} until={K.Nombre - 0.1} texto="no hay ninguna" x={420} y={430} tam={44} borde={KC.red} />
        <Etq T={T} at={K.Agujas + 3.6} until={K.Nombre - 0.1} x={410} y={600} texto="tu nervio, despertando" lado="der" color={KC.ink} tam={34} />
      </Escena>

      {/* 6 · nombre: parestesia */}
      <Escena T={T} a={K.Nombre} b={K.Pregunta} fondo={KC.mint} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <TextoSvg x={540} y={860} tam={170} color={KC.yellow} rot={-4} s={klerp(0.4, 1, kprog(T, K.Nombre + 0.6, K.Nombre + 1.0, kEase.rebote))} o={kprog(T, K.Nombre + 0.6, K.Nombre + 0.8)}>PARESTESIA</TextoSvg>
          <Chispas T={T} x={540} y={790} n={10} radio={420} o={kprog(T, K.Nombre + 0.9, K.Nombre + 1.3)} seed={14} />
        </Lienzo>
        <Chip T={T} at={K.Nombre + 0.1} until={K.Pregunta - 0.05} texto="los médicos le llaman" x={540} y={600} tam={42} borde={KC.ink} />
      </Escena>

      {/* 7 · ¿y es peligroso? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Normal} color={KC.lilac} />

      {/* 8 · casi nunca: en minutos se quita solo, el pie vuelve a su color */}
      <Escena T={T} a={K.Normal} b={K.Medico} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Reloj x={290} y={640} r={170} giro={kprog(T, K.Normal + 0.6, K.Medico, kEase.suave) * 0.3} />
          <PieGrande x={520} y={1060} s={0.75} gris={1 - kprog(T, K.Normal + 1.2, K.Medico - 0.5)} T={T} corte={0.6} chispas={0.8 * (1 - kprog(T, K.Normal + 1.2, K.Medico - 0.6))} />
        </Lienzo>
        <Chip T={T} at={K.Normal + 0.2} until={K.Medico - 0.1} texto="casi nunca es peligroso" x={540} y={410} tam={40} borde={KC.mint} />
        <Chip T={T} at={K.Normal + 1.6} until={K.Medico - 0.1} texto="se quita solo" x={800} y={560} tam={42} borde={KC.gold} />
      </Escena>

      {/* 9 · cuándo ir al médico */}
      <Escena T={T} a={K.Medico} b={K.Codo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Alerta x={540} y={560} s={1.2 * klerp(0.5, 1, kprog(T, K.Medico + 0.1, K.Medico + 0.4, kEase.rebote))} color={KC.orange} />
          <FlechaRecta x1={540} y1={890} x2={540} y2={960} p={kprog(T, K.Medico + 2.6, K.Medico + 3.0, kEase.sale)} color={KC.mint} />
          {T > K.Medico + 2.9 && <CruzMedica x={540} y={1090} s={klerp(0.3, 0.9, kprog(T, K.Medico + 2.9, K.Medico + 3.3, kEase.rebote))} />}
        </Lienzo>
        <Chip T={T} at={K.Medico + 0.6} until={K.Codo - 0.1} texto="si pasa seguido sin razón" x={540} y={740} tam={40} borde={KC.ink} />
        <Chip T={T} at={K.Medico + 1.7} until={K.Codo - 0.1} texto="o no se quita" x={540} y={840} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Medico + 3.2} until={K.Codo - 0.1} x={660} y={1090} texto="médico" lado="der" color={KC.ink} tam={40} />
      </Escena>

      {/* 10 · el codo: golpe en el «hueso de la risa» → rayito al anular y al meñique */}
      <Escena T={T} a={K.Codo} b={K.Codo2} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Mesa />
          <Brazo T={T} corte={0.55} dy={-70 * (1 - kprog(T, K.Codo + 0.5, K.Codo + 0.9)) + 10 * Math.exp(-Math.max(0, T - K.Codo - 0.9) * 8) * (T > K.Codo + 0.9 ? 1 : 0)}
            rayo={T > K.Codo + 0.9 && T < K.Codo + 3.6 ? kprog(T, K.Codo + 0.95, K.Codo + 2.0) + (T > K.Codo + 2.0 ? 0.01 : 0) : -1}
            glow={kprog(T, K.Codo + 1.8, K.Codo + 2.1) * (1 - kprog(T, K.Codo + 3.4, K.Codo + 3.8))} />
          <Onomato T={T} at={K.Codo + 0.9} dur={0.8} x={300} y={1010} texto="¡TOC!" color={KC.yellow} tam={110} rot={-10} />
        </Lienzo>
        <Chip T={T} at={K.Codo + 0.2} until={K.Codo + 3.7} texto="el «hueso de la risa»" x={540} y={430} tam={44} borde={KC.yellow} />
        <Etq T={T} at={K.Codo + 2.0} until={K.Codo + 3.7} x={1010} y={960} texto="anular y meñique" lado="izq" color={KC.texto} tam={32} />
        <Etq T={T} at={K.Codo + 3.9} until={K.Codo2 - 0.2} x={470} y={1010} texto="lado interno del codo" lado="der" color={KC.texto} tam={32} />
        <Lupa T={T} at={K.Codo + 3.9} until={K.Codo2 - 0.25} x={330} y={470} r={190} fx={418} fy={1000} tinte={NERV} etiqueta="POR DENTRO · CODO"
          interior={(t, r) => <CorteCodo t={t} W={r * 2} rayo={kprog(t, K.Codo + 5.0, K.Codo + 5.3)} />} />
      </Escena>

      {/* 11 · no es el hueso: es el nervio */}
      <Escena T={T} a={K.Codo2} b={K.Cierre} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Brazo T={T} corte={1} rayo={T < K.Codo2 + 2.6 ? kprog(T, K.Codo2 + 0.6, K.Codo2 + 1.7) : -1} glow={kprog(T, K.Codo2 + 1.5, K.Codo2 + 1.8) * (1 - kprog(T, K.Codo2 + 2.6, K.Codo2 + 3.0))} />
        </Lienzo>
        <Etq T={T} at={K.Codo2 + 0.4} until={K.Cierre - 0.2} x={470} y={1030} texto="nervio cubital" lado="der" color={NERV} tam={32} />
        <Etq T={T} at={K.Codo2 + 0.6} until={K.Cierre - 0.2} x={250} y={720} texto="hueso" lado="der" color="#fbf6ea" tam={32} />
        <MitoTachado T={T} at={K.Codo2 + 2.2} tacharEn={K.Codo2 + 3.0} until={K.Cierre - 0.15} texto="«es el hueso»" x={600} y={440} />
        <Chip T={T} at={K.Codo2 + 3.5} until={K.Cierre - 0.1} texto="es el nervio" x={600} y={560} tam={48} borde={NERV} />
      </Escena>

      {/* 12 · cierre: la misma persona, ya derecha, mueve el pie */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.pink} origen="40% 60%">
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Persona x={PER.x} y={PER.y} s={PER.s} cruza={0} gris={0} T={T} gesto="sonrie" tap={-Math.max(0, Math.sin(T * 7)) * 14} />
          <Chispas T={T} x={enPer([392, 300])[0] + 40} y={enPer([392, 300])[1] - 40} n={6} radio={90} o={1 - kprog(T, K.Cierre + 0.4, K.Cierre + 1.6)} seed={9} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.0} until={K.Outro - 0.1} texto="un corto de un ratito" x={540} y={430} tam={44} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Posicion - 0.1} texto="No está dormido: *nervios aplastados.*" />
      <Subtitulo T={T} idx={1} at={K.Posicion + 0.1} until={K.Senal - 0.1} texto="Aprietas los *nervios del pie.*" />
      <Subtitulo T={T} idx={2} at={K.Senal + 0.1} until={K.Entumido - 0.1} texto="Menos sangre: *mensajes atorados.*" />
      <Subtitulo T={T} idx={3} at={K.Entumido + 0.1} until={K.Hormigueo - 0.1} texto="Lo sientes *entumido.*" />
      <Subtitulo T={T} idx={4} at={K.Hormigueo + 0.1} until={K.Agujas - 0.1} texto="Se va la presión: *hormigueo.*" />
      <Subtitulo T={T} idx={5} at={K.Agujas + 0.1} until={K.Nombre - 0.1} texto="Agujitas que *no existen.*" />
      <Subtitulo T={T} idx={6} at={K.Nombre + 0.1} until={K.Pregunta - 0.1} texto="Se llama *parestesia.*" />
      <Subtitulo T={T} idx={7} at={K.Pregunta + 0.1} until={K.Normal - 0.1} texto="¿Es *peligroso?*" />
      <Subtitulo T={T} idx={8} at={K.Normal + 0.1} until={K.Medico - 0.1} texto="Casi nunca: *se quita solo.*" />
      <Subtitulo T={T} idx={9} at={K.Medico + 0.1} until={K.Codo - 0.1} texto="Si sigue: *ve al médico.*" />
      <Subtitulo T={T} idx={10} at={K.Codo + 0.1} until={K.Codo2 - 0.1} texto="El *hueso de la risa:* un nervio." />
      <Subtitulo T={T} idx={11} at={K.Codo2 + 0.1} until={K.Cierre - 0.1} texto="No es el hueso: *es el nervio.*" />
      <Subtitulo T={T} idx={12} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tus nervios *hacen corto.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Senal + 0.4, K.Senal + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Entumido + 0.3, K.Entumido + 3.6, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Agujas + 2.6, K.Agujas + 5.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pregunta + 0.05, K.Normal + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.Medico + 0.3, K.Medico + 3.9, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Codo + 3.9, K.Codo + 6.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Codo2 + 0.8, K.Codo2 + 4.8, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="27" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function PieApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pie_ /></CompositionStage></div>;
}
window.PieApp = PieApp;
