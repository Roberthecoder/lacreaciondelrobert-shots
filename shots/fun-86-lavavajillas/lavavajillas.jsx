// Shot Fungi Mati #86 · Tu lavavajillas lava hasta a 80 grados… y ahí vive un hongo (la levadura negra Exophiala) — NARRADO.
// Formato N1 Por dentro + N2 El número. Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const LV = { acero:'#d5dce0', acero2:'#a9b3b9', acero3:'#7f8a91', tina:'#59626a', tina2:'#454c53', hule:'#6c7176', hule2:'#4d5155', negro:'#15110f', negro2:'#2e2620',
  pardo:'#4a3020', pardo2:'#6e4a2e', pardo3:'#8d6440', melan:'#24160d', madera:'#c98b5a', madera2:'#a8703f', gabinete:'#fff4dc', gab2:'#e9d9b6', azul:'#2f7bff', sal:'#ffffff', agua:'#9ad7ff' };

// ---------- cocina con el lavavajillas (coordenadas del mundo = pantalla a zoom 1) ----------
const LVD = { x0: 200, x1: 880, top: 610, panel: 680, y1: 1220, gx0: 222, gx1: 858, gy0: 690, gy1: 1206 };

// Línea negra del empaque: tramo de abajo y subida por las esquinas (puntos con grosor).
const LINEA = (() => {
  const g = krng(86), pts = [];
  for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push({ x: klerp(LVD.gx0 + 20, LVD.gx1 - 20, u), y: LVD.gy1 + (g() - 0.5) * 4, r: 7 + g() * 7, u: g() }); }
  for (let i = 0; i <= 14; i++) { const u = i / 14; pts.push({ x: LVD.gx0 + (g() - 0.5) * 4, y: klerp(LVD.gy1 - 10, LVD.gy1 - 150, u), r: 6 + g() * 6 * (1 - u), u: g() }); pts.push({ x: LVD.gx1 + (g() - 0.5) * 4, y: klerp(LVD.gy1 - 10, LVD.gy1 - 130, u), r: 6 + g() * 5 * (1 - u), u: g() }); }
  return pts;
})();

function Plato({ x, y, r = 70, color = '#ffffff' }) {
  return <g><ellipse cx={x} cy={y} rx={r * 0.24} ry={r} fill={color} stroke={KC.ink} strokeWidth={4} /><ellipse cx={x} cy={y} rx={r * 0.12} ry={r * 0.6} fill="none" stroke="#c7d3db" strokeWidth={3} /></g>;
}

function Cocina({ T, abre = 0, vapor = 0, linea = 1, ojos = 0, aspersor = 0, chorros = 0, display = '80°' }) {
  const { x0, x1, top, panel, y1, gx0, gx1, gy0, gy1 } = LVD;
  const th = kclamp(abre, 0, 1) * Math.PI / 2, hPuerta = (y1 - panel) * Math.cos(th), ens = 40 * Math.sin(th);
  const ang = T * 400 * aspersor;
  return <g transform="translate(0 -130)">
    {/* cubierta y gabinetes */}
    <rect x={-20} y={y1 - 10} width={1120} height={600} fill="#e7c896" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 135} y1={y1 + 80} x2={i * 135 - 90} y2={y1 + 590} stroke="#d2ae74" strokeWidth={6} />)}
    <line x1={-20} y1={y1 + 80} x2={1100} y2={y1 + 80} stroke="#d2ae74" strokeWidth={6} />
    <rect x={-20} y={top + 50} width={240} height={y1 - top - 50} fill={LV.gabinete} stroke={KC.ink} strokeWidth={7} />
    <rect x={860} y={top + 50} width={240} height={y1 - top - 50} fill={LV.gabinete} stroke={KC.ink} strokeWidth={7} />
    <rect x={150} y={top + 120} width={14} height={110} rx={7} fill={LV.acero3} stroke={KC.ink} strokeWidth={3} />
    <rect x={916} y={top + 120} width={14} height={110} rx={7} fill={LV.acero3} stroke={KC.ink} strokeWidth={3} />
    <rect x={-20} y={top - 50} width={1120} height={60} fill={LV.madera} stroke={KC.ink} strokeWidth={7} />
    <rect x={-20} y={top + 4} width={1120} height={14} fill={LV.madera2} />
    {/* cuerpo */}
    <rect x={x0} y={top} width={x1 - x0} height={y1 - top} fill={LV.acero2} stroke={KC.ink} strokeWidth={7} />
    {/* interior de la tina */}
    <rect x={gx0 + 8} y={gy0 + 8} width={gx1 - gx0 - 16} height={gy1 - gy0 - 16} fill={LV.tina} />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={gx0 + 30 + i * 80} y1={gy0 + 12} x2={gx0 + 10 + i * 80} y2={gy1 - 12} stroke={LV.tina2} strokeWidth={6} opacity=".6" />)}
    {/* canasta de arriba con tazas */}
    <rect x={gx0 + 30} y={790} width={gx1 - gx0 - 60} height={14} rx={7} fill={LV.acero} stroke={KC.ink} strokeWidth={4} />
    {[300, 400, 500, 600, 700].map((x, i) => <g key={i}><path d={`M ${x - 32} 790 L ${x - 26} 730 L ${x + 26} 730 L ${x + 32} 790 Z`} fill={[KC.pink, KC.cyan, KC.yellow, KC.mint, KC.orange][i]} stroke={KC.ink} strokeWidth={4} /></g>)}
    {/* canasta de abajo con platos */}
    <rect x={gx0 + 30} y={1110} width={gx1 - gx0 - 60} height={14} rx={7} fill={LV.acero} stroke={KC.ink} strokeWidth={4} />
    {[290, 360, 430, 500, 570, 640, 710, 780].map((x, i) => <Plato key={i} x={x} y={1030} r={74} color={i % 3 === 1 ? '#ffe9b0' : '#ffffff'} />)}
    {/* aspersor que gira (visto de frente: se acorta y se alarga) */}
    <g transform={`translate(540 1165)`}>
      <rect x={-260 * Math.abs(Math.cos(ang * Math.PI / 180)) - 10} y={-10} width={520 * Math.abs(Math.cos(ang * Math.PI / 180)) + 20} height={20} rx={10} fill={LV.acero3} stroke={KC.ink} strokeWidth={4} />
      <circle r={20} fill={LV.acero2} stroke={KC.ink} strokeWidth={4} />
    </g>
    {chorros > 0 && Array.from({ length: 10 }, (_, i) => { const x = 280 + i * 58, u = ((T * 2.2 + i * 0.37) % 1); return <g key={i} opacity={chorros * 0.85}>
      <line x1={x} y1={1150} x2={x + (i % 2 ? 18 : -18)} y2={klerp(1150, 830, u)} stroke={LV.agua} strokeWidth={7} strokeLinecap="round" strokeDasharray="22 16" strokeDashoffset={-T * 300} />
    </g>; })}
    {/* empaque de hule de la puerta */}
    <rect x={gx0} y={gy0} width={gx1 - gx0} height={gy1 - gy0} rx={26} fill="none" stroke={LV.hule} strokeWidth={18} />
    <rect x={gx0} y={gy0} width={gx1 - gx0} height={gy1 - gy0} rx={26} fill="none" stroke={LV.hule2} strokeWidth={4} />
    {/* la línea negra (levadura negra) */}
    {linea > 0 && <g>
      {LINEA.map((p, i) => { const o = kclamp(linea * 1.5 - p.u * 0.5, 0, 1); return o > 0.02 ? <circle key={i} cx={p.x} cy={p.y} r={p.r * (0.6 + 0.4 * o)} fill={i % 4 ? LV.negro : LV.negro2} opacity={0.95 * o} /> : null; })}
      {[300, 450, 610, 760].map((x, i) => <ellipse key={i} cx={x} cy={gy1 - 4} rx={16} ry={3} fill="#fff" opacity={0.55 * linea} />)}
    </g>}
    {ojos > 0 && [430, 500].map((x, i) => { const parp = (T % 2.6) < 0.12 ? 0.15 : 1; return <g key={i} opacity={ojos} transform={`translate(${x} ${gy1 - 3})`}>
      <ellipse rx={13} ry={13 * parp * ojos} fill="#fff" stroke={KC.ink} strokeWidth={3} />
      {parp > 0.5 && <circle cx={2} cy={2} r={5} fill={KC.ink} />}
    </g>; })}
    {/* puerta: gira hacia ti sobre la bisagra de abajo */}
    {abre < 0.999 && <g>
      <path d={`M ${x0 - ens} ${y1 - hPuerta} L ${x1 + ens} ${y1 - hPuerta} L ${x1} ${y1} L ${x0} ${y1} Z`} fill={LV.acero} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={klerp(x0 + 40, x0 + 10, Math.sin(th))} y={y1 - hPuerta + hPuerta * 0.08} width={klerp(x1 - x0 - 80, x1 - x0 - 20, Math.sin(th))} height={Math.max(4, hPuerta * 0.05)} rx={6} fill={LV.acero3} stroke={KC.ink} strokeWidth={3} />
    </g>}
    {abre > 0.001 && <path d={`M ${x0} ${y1} L ${x1} ${y1} L ${x1 + 50 * Math.sin(th)} ${y1 + 90 * Math.sin(th)} L ${x0 - 50 * Math.sin(th)} ${y1 + 90 * Math.sin(th)} Z`} fill={LV.acero2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
    {/* tablero de control */}
    <rect x={x0} y={top} width={x1 - x0} height={panel - top} fill={LV.acero3} stroke={KC.ink} strokeWidth={7} />
    <rect x={x0 + 40} y={top + 14} width={130} height={42} rx={8} fill="#10161a" stroke={KC.ink} strokeWidth={4} />
    <text x={x0 + 105} y={top + 47} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.mint}>{display}</text>
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={x0 + 260 + i * 70} cy={top + 35} r={15} fill={i === 1 ? KC.mint : LV.acero} stroke={KC.ink} strokeWidth={4} />)}
    {/* vapor */}
    {vapor > 0 && Array.from({ length: 12 }, (_, i) => { const u = ((T * 0.45 + i / 12) % 1); const x = 280 + (i * 53) % 560 + Math.sin(T * 2 + i) * 20; return <circle key={i} cx={x} cy={klerp(gy0 + 260, gy0 - 260, u)} r={klerp(40, 110, u)} fill="rgba(255,255,255,.75)" opacity={vapor * Math.sin(u * Math.PI) * 0.8} />; })}
  </g>;
}

// Cámara del mundo: (cx, cy) queda en el centro de la pantalla (540, 900) con zoom z.
const camara = (cx, cy, z) => `translate(540 900) scale(${z}) translate(${-cx} ${-cy})`;

// Termómetro chico (svg, coordenadas de pantalla).
function TermoMini({ x, y, h = 300, valor = 0, max = 100, marca = 80 }) {
  const lleno = h * kclamp(valor / max, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={0} width={44} height={h} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-11} y={h - lleno} width={22} height={lleno + 10} rx={11} fill={KC.red} />
    <circle cx={0} cy={h + 30} r={40} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {[0, 0.5, 1].map((f, i) => <line key={i} x1={22} y1={h * (1 - f)} x2={40} y2={h * (1 - f)} stroke={KC.ink} strokeWidth={4} />)}
    <line x1={-40} y1={h * (1 - marca / max)} x2={46} y2={h * (1 - marca / max)} stroke={KC.ink} strokeWidth={5} strokeDasharray="8 6" />
  </g>;
}

// Gotas de detergente (azul) o cubitos de sal que caen.
function Caen({ T, at, x, y0, y1, n = 6, tipo = 'det' }) {
  if (T < at) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = kprog(T, at + i * 0.12, at + i * 0.12 + 0.7, (p) => p * p); if (u <= 0 || u >= 1) return null; const xx = x + ((i * 37) % 60) - 30, yy = klerp(y0, y1, u);
    return tipo === 'det' ? <path key={i} d={`M ${xx} ${yy - 22} Q ${xx + 14} ${yy} ${xx} ${yy + 8} Q ${xx - 14} ${yy} ${xx} ${yy - 22} Z`} fill={LV.azul} stroke={KC.ink} strokeWidth={3} />
      : <rect key={i} x={xx - 9} y={yy - 9} width={18} height={18} transform={`rotate(${i * 33 + u * 200} ${xx} ${yy})`} fill={LV.sal} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}

// ---------- empaque de cerca (corte en U con la línea negra) ----------
function EmpaqueCerca({ T, linea = 1 }) {
  const g = krng(7);
  const borde = Array.from({ length: 40 }, (_, i) => ({ x: i * 28, a: 10 + g() * 14, b: 8 + g() * 12 }));
  const brillos = Array.from({ length: 9 }, () => ({ x: 60 + g() * 960, w: 20 + g() * 40 }));
  return <g>
    {/* pared de acero de la tina */}
    <rect x={-20} y={300} width={1120} height={470} fill={LV.acero2} />
    {Array.from({ length: 14 }, (_, i) => <line key={i} x1={i * 85} y1={300} x2={i * 85 - 40} y2={770} stroke={LV.acero} strokeWidth={10} opacity=".5" />)}
    {/* labio de arriba, canal, labio de abajo */}
    <path d="M -20 760 L 1100 760 L 1100 840 Q 540 860 -20 840 Z" fill={LV.hule} stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 840 Q 540 860 1100 840 L 1100 960 Q 540 985 -20 960 Z" fill={LV.hule2} stroke={KC.ink} strokeWidth={6} />
    <path d="M -20 960 Q 540 985 1100 960 L 1100 1050 L -20 1050 Z" fill={LV.hule} stroke={KC.ink} strokeWidth={7} />
    <rect x={-20} y={1050} width={1120} height={200} fill={LV.acero} stroke={KC.ink} strokeWidth={7} />
    {/* la línea negra: viscosa, brillante, en el fondo del canal */}
    {linea > 0 && <g opacity={kclamp(linea * 1.4, 0, 1)}>
      <path d={'M -20 ' + 900 + ' ' + borde.map((p) => `L ${p.x} ${878 - p.a * linea}`).join(' ') + ' L 1100 880 L 1100 935 ' + borde.slice().reverse().map((p) => `L ${p.x} ${938 + p.b * linea}`).join(' ') + ' L -20 935 Z'} fill={LV.negro} />
      {brillos.map((b, i) => <ellipse key={i} cx={b.x} cy={898 + (i % 3) * 8} rx={b.w} ry={5} fill="#fff" opacity=".45" />)}
    </g>}
    {/* gotas atrapadas en el canal */}
    {[[160, 870], [470, 880], [700, 872], [930, 884]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y + Math.sin(T * 2 + i) * 2} rx={20} ry={14} fill={LV.agua} stroke={KC.ink} strokeWidth={3} opacity=".9" />)}
  </g>;
}

// ---------- al microscopio ----------
// Célula de levadura negra (blastoconidio): redonda, parda oscura, con brillo. c 0..1 crece.
function Celula({ x, y, r = 26, c = 1, tono = 0 }) {
  if (c <= 0) return null;
  const rr = r * kEase.sale(kclamp(c, 0, 1));
  return <g><circle cx={x} cy={y} r={rr} fill={tono ? LV.pardo2 : LV.pardo} stroke="#100a06" strokeWidth={4} />
    <circle cx={x} cy={y} r={rr * 0.62} fill="none" stroke={LV.melan} strokeWidth={3} opacity=".7" />
    <ellipse cx={x - rr * 0.35} cy={y - rr * 0.38} rx={rr * 0.28} ry={rr * 0.16} fill="#fff" opacity=".35" transform={`rotate(-30 ${x - rr * 0.35} ${y - rr * 0.38})`} /></g>;
}
// Cadena de células que brotan una tras otra: desde (x, y) en dirección ang (grados).
function cadenaPts(x, y, ang, n, paso = 50, curva = 0) {
  const out = []; let a = ang * Math.PI / 180, px = x, py = y;
  for (let k = 0; k < n; k++) { out.push([px, py]); px += Math.cos(a) * paso; py += Math.sin(a) * paso; a += curva; }
  return out;
}
const CAD_A = cadenaPts(170, 1040, -78, 7, 70, 0.04);
const CAD_B = cadenaPts(410, 1050, -86, 6, 70, -0.03);
const CAD_R = cadenaPts(CAD_B[2][0] + 50, CAD_B[2][1] - 30, -36, 4, 70, 0.08);
const HIFA0 = CAD_R[3];
function Cadena({ T, at, pts, cada = 0.3, tono = 0, r = 36 }) {
  return <g>{pts.map(([x, y], k) => <Celula key={k} x={x} y={y} r={r} c={kprog(T, at + k * cada, at + k * cada + 0.35)} tono={(k + tono) % 2} />)}</g>;
}
// Hifa parda con septos: células en forma de barril una tras otra.
function Hifa({ T, at, x, y, n = 5, ang = -8, paso = 72 }) {
  const out = []; let a = ang * Math.PI / 180, px = x, py = y;
  for (let k = 0; k < n; k++) {
    const c = kprog(T, at + k * 0.25, at + k * 0.25 + 0.35); if (c <= 0) break;
    const L = paso * c, cx = px + Math.cos(a) * L / 2, cy = py + Math.sin(a) * L / 2;
    out.push(<g key={k}><ellipse cx={cx} cy={cy} rx={L / 2 + 5} ry={25} transform={`rotate(${a * 180 / Math.PI} ${cx} ${cy})`} fill={k % 2 ? LV.pardo3 : LV.pardo2} stroke="#100a06" strokeWidth={4} />
      {c >= 1 && <line x1={px + Math.cos(a) * L - Math.sin(a) * 24} y1={py + Math.sin(a) * L + Math.cos(a) * 24} x2={px + Math.cos(a) * L + Math.sin(a) * 24} y2={py + Math.sin(a) * L - Math.cos(a) * 24} stroke="#100a06" strokeWidth={5} />}</g>);
    px += Math.cos(a) * L; py += Math.sin(a) * L; a += (k % 2 ? 0.1 : -0.06);
  }
  return <g>{out}</g>;
}

// Célula grande en corte: pared gruesa con gránulos de melanina.
function CelulaCorte({ T, x, y, r = 250 }) {
  const g = krng(31), gran = Array.from({ length: 70 }, () => ({ a: g() * Math.PI * 2, d: r - 12 - g() * 26, s: 5 + g() * 7 }));
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.1) * 4})`}>
    <circle r={r} fill={LV.melan} stroke="#000" strokeWidth={6} />
    <circle r={r - 44} fill="#b98a5c" stroke="#3a2414" strokeWidth={5} />
    {gran.map((p, i) => <circle key={i} cx={Math.cos(p.a) * p.d} cy={Math.sin(p.a) * p.d} r={p.s} fill={i % 3 ? '#0c0705' : '#3b2616'} />)}
    <circle cx={-40} cy={20} r={70} fill="#8f6440" stroke="#3a2414" strokeWidth={4} />
    <circle cx={-40} cy={20} r={22} fill="#5a3a22" />
    {[[80, -80, 30], [90, 80, 22], [-110, -90, 18], [10, 130, 16]].map(([a, b, rr], i) => <ellipse key={i} cx={a} cy={b} rx={rr} ry={rr * 0.7} fill="#a77a4e" stroke="#3a2414" strokeWidth={3} />)}
  </g>;
}
// Flecha de estrés que llega a la pared y rebota. tipo: 'uv' | 'ox' | 'seco'.
function Estres({ T, at, x0, y0, x1, y1, tipo, texto }) {
  if (T < at) return null;
  const u = kprog(T, at, at + 0.7), v = kprog(T, at + 0.7, at + 1.4, kEase.sale);
  const px = u < 1 ? klerp(x0, x1, u) : klerp(x1, x0, v * 0.45), py = u < 1 ? klerp(y0, y1, u) : klerp(y1, y0, v * 0.45);
  const ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI + (u < 1 ? 0 : 180);
  const col = tipo === 'uv' ? '#b18cff' : tipo === 'ox' ? KC.red : KC.orange;
  const o = 1 - kprog(T, at + 2.4, at + 2.8);
  return <g opacity={o}>
    <g transform={`translate(${px} ${py}) rotate(${ang})`}>
      {tipo === 'uv' && <path d="M -120 0 L -100 -14 L -80 14 L -60 -14 L -40 14 L -20 -14 L 0 0" stroke={col} strokeWidth={9} fill="none" strokeLinejoin="round" />}
      {tipo === 'ox' && [-90, -55, -20].map((d, i) => <circle key={i} cx={d} cy={i % 2 ? 8 : -8} r={13} fill={col} stroke={KC.ink} strokeWidth={3} />)}
      {tipo === 'seco' && <path d="M -110 0 L -10 0" stroke={col} strokeWidth={12} strokeLinecap="round" strokeDasharray="20 12" />}
      <path d="M 0 0 L -26 -18 L -26 18 Z" fill={col} stroke={KC.ink} strokeWidth={3} />
    </g>
    {u >= 1 && v < 1 && <circle cx={x1} cy={y1} r={20 + v * 50} fill="none" stroke={col} strokeWidth={6} opacity={1 - v} />}
    <text x={x0} y={y0 - 34} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={col} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}

// ---------- mapa del mundo esquemático (para el estudio) ----------
const MUNDO = {
  na: [[-168,66],[-140,70],[-110,72],[-80,70],[-62,58],[-55,50],[-66,44],[-75,35],[-81,25],[-97,26],[-97,18],[-88,15],[-83,9],[-80,8],[-92,15],[-105,20],[-112,29],[-118,34],[-124,40],[-124,48],[-135,58],[-150,60],[-165,62]],
  gr: [[-50,82],[-25,80],[-20,70],[-42,60],[-55,68],[-60,76]],
  sa: [[-80,8],[-72,12],[-60,10],[-50,0],[-35,-6],[-40,-22],[-48,-28],[-58,-38],[-65,-42],[-68,-55],[-74,-50],[-72,-35],[-71,-18],[-81,-5]],
  eu: [[-10,36],[-9,43],[-2,44],[-5,48],[3,51],[8,54],[10,58],[5,62],[15,69],[28,71],[45,68],[60,70],[80,73],[105,77],[140,72],[170,70],[180,66],[160,60],[142,53],[135,44],[128,38],[122,31],[121,24],[109,21],[106,10],[100,13],[98,8],[100,3],[94,16],[90,22],[80,15],[77,8],[72,20],[67,25],[57,25],[52,27],[48,30],[44,13],[36,24],[34,28],[35,32],[30,37],[26,40],[23,36],[19,42],[12,44],[14,41],[9,44],[3,43],[-4,36]],
  af: [[-17,21],[-10,30],[-6,36],[10,37],[20,32],[32,31],[34,28],[43,12],[51,12],[40,-2],[39,-15],[35,-24],[27,-34],[18,-34],[12,-17],[13,-5],[9,4],[-8,4],[-17,14]],
  au: [[114,-22],[122,-18],[131,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[141,-38],[131,-31],[115,-34]],
};
const MAPA = { x: 45, y: 740, k: 2.75 };
const mp = (lon, lat) => [MAPA.x + (lon + 180) * MAPA.k, MAPA.y + (80 - lat) * MAPA.k];
// Puntos de muestreo (esquemáticos, proporcionales a cada región del estudio).
const PUNTOS = (() => {
  const g = krng(189), out = [];
  const zona = (n, lon0, lon1, lat0, lat1, ord) => { for (let i = 0; i < n; i++) out.push({ p: mp(klerp(lon0, lon1, g()), klerp(lat0, lat1, g())), o: ord + g() * 0.6 }); };
  zona(26, 13.5, 16, 45.5, 46.8, 0.0);    // Eslovenia (102)
  zona(11, -5, 25, 41, 58, 0.5);          // resto de Europa (42)
  zona(3, -122, -74, 33, 45, 0.9);        // Norteamérica (13)
  zona(1, -58, -46, -30, -22, 1.1);       // Sudamérica (3)
  zona(1, 34.6, 35.2, 31, 32.5, 1.1);     // Israel (5)
  zona(3, 18, 31, -34, -26, 1.2);         // Sudáfrica (10)
  zona(2, 118, 140, 25, 38, 1.3);         // Lejano Oriente (7)
  zona(2, 140, 153, -37, -28, 1.4);       // Australia (7)
  return out;
})();
function MapaMundo({ T, at }) {
  const o = kprog(T, at, at + 0.4);
  return <g opacity={o}>
    <rect x={MAPA.x - 20} y={MAPA.y - 20} width={990 + 40} height={136 * MAPA.k + 40} rx={30} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={5} />
    {Object.values(MUNDO).map((pts, i) => <path key={i} d={'M ' + pts.map(([a, b]) => mp(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z'} fill="#ffe9a8" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />)}
    {PUNTOS.map((q, i) => { const s = kprog(T, at + 0.3 + q.o * 1.2, at + 0.6 + q.o * 1.2, kEase.rebote); return s > 0 ? <circle key={i} cx={q.p[0]} cy={q.p[1]} r={8 * s} fill={KC.red} stroke={KC.ink} strokeWidth={2.5} /> : null; })}
  </g>;
}
// Hisopo que frota un empaque (muestreo).
function Hisopo({ x, y, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}><rect x={-6} y={-160} width={12} height={170} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={4} /><ellipse cx={0} cy={-170} rx={20} ry={30} fill="#f4efe4" stroke={KC.ink} strokeWidth={4} /></g>;
}

// Ícono chico de lavavajillas (para la gráfica de 100 y el re-gancho).
function MiniLava({ x, y, s = 1, color = LV.acero2, linea = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-30} width={60} height={60} rx={6} fill={color} stroke={KC.ink} strokeWidth={4} />
    <rect x={-30} y={-30} width={60} height={14} rx={4} fill={LV.acero3} stroke={KC.ink} strokeWidth={3} />
    <rect x={-16} y={-8} width={32} height={6} rx={3} fill={KC.ink} opacity=".5" />
    {linea && <rect x={-26} y={20} width={52} height={6} rx={3} fill={LV.negro} />}
  </g>;
}

// ---------- persona y pulmones (riesgo) ----------
function Persona({ T, x, y }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 4})`}>
    <path d="M -150 300 Q -150 120 0 110 Q 150 120 150 300 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={0} r={110} fill="#e7b48b" stroke={KC.ink} strokeWidth={7} />
    <path d="M -110 -20 Q -100 -130 0 -120 Q 110 -125 110 -20 Q 60 -80 -110 -20 Z" fill="#3a2a1e" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-38} cy={0} r={9} fill={KC.ink} /><circle cx={38} cy={0} r={9} fill={KC.ink} />
    <path d="M -45 40 Q 0 80 45 40" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
function Pulmones({ T, x, y, s = 1, manchas = 0 }) {
  const resp = 1 + Math.sin(T * 2.4) * 0.025;
  const lob = (sx) => `M ${sx * 20} -150 Q ${sx * 150} -170 ${sx * 160} 40 Q ${sx * 160} 170 ${sx * 40} 150 Q ${sx * 15} 60 ${sx * 20} -150 Z`;
  return <g transform={`translate(${x} ${y}) scale(${s * resp})`}>
    <path d="M 0 -230 L 0 -150 M 0 -150 Q -10 -120 -30 -100 M 0 -150 Q 10 -120 30 -100" stroke="#f3c6c6" strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 0 -230 L 0 -150 M 0 -150 Q -10 -120 -30 -100 M 0 -150 Q 10 -120 30 -100" stroke={KC.ink} strokeWidth={4} fill="none" />
    <path d={lob(-1)} fill="#ff9aa8" stroke={KC.ink} strokeWidth={6} />
    <path d={lob(1)} fill="#ff9aa8" stroke={KC.ink} strokeWidth={6} />
    {[[-90, 20], [-70, 90], [100, 60], [80, -30], [-110, -40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={12 * kclamp(manchas * 2 - i * 0.2, 0, 1)} fill={LV.negro} opacity=".85" />)}
  </g>;
}
// Palomita / tache dentro de un círculo.
function Marca({ x, y, ok = true, s = 1 }) {
  if (s <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={46} fill={ok ? KC.leaf : KC.red} stroke={KC.ink} strokeWidth={6} />
    <path d={ok ? 'M -20 0 L -5 16 L 22 -16' : 'M -16 -16 L 16 16 M 16 -16 L -16 16'} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
}

// ---------- lavadora de carga frontal ----------
function Lavadora({ T, x, y, gira = 1, cajon = 0, manchas = 1 }) {
  const a = T * 240 * gira, g = krng(15);
  const spots = Array.from({ length: 16 }, () => ({ a: klerp(0.15, 0.85, g()) * Math.PI, r: 4 + g() * 7 }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={450} height={470} rx={22} fill="#f4f7f8" stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={0} width={450} height={80} rx={22} fill="#e2e8eb" stroke={KC.ink} strokeWidth={6} />
    {/* cajón del detergente */}
    <g transform={`translate(${-40 * cajon} 0)`}>
      <rect x={24} y={16} width={160} height={50} rx={8} fill="#d3dadd" stroke={KC.ink} strokeWidth={5} />
      {manchas > 0 && [[50, 54], [80, 58], [130, 56], [160, 52]].map(([p, q], i) => <circle key={i} cx={p} cy={q} r={6} fill={LV.negro} opacity={0.8 * manchas} />)}
    </g>
    <circle cx={370} cy={40} r={22} fill="#c9d1d6" stroke={KC.ink} strokeWidth={5} />
    {/* puerta */}
    <circle cx={225} cy={280} r={165} fill="#c9d1d6" stroke={KC.ink} strokeWidth={7} />
    <circle cx={225} cy={280} r={140} fill={LV.hule} stroke={KC.ink} strokeWidth={5} />
    <circle cx={225} cy={280} r={112} fill="#8fd3ff" stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(225 280) rotate(${a})`}>
      {[[0, -50, KC.pink], [45, 30, KC.yellow], [-48, 26, KC.mint]].map(([p, q, c], i) => <path key={i} d={`M ${p - 36} ${q - 20} Q ${p} ${q - 46} ${p + 36} ${q - 20} Q ${p + 30} ${q + 24} ${p} ${q + 20} Q ${p - 30} ${q + 24} ${p - 36} ${q - 20} Z`} fill={c} stroke={KC.ink} strokeWidth={4} />)}
    </g>
    <ellipse cx={180} cy={225} rx={40} ry={16} fill="#fff" opacity=".5" transform="rotate(-30 180 225)" />
    {manchas > 0 && spots.map((s, i) => <circle key={i} cx={225 + Math.cos(s.a) * 126} cy={280 + Math.sin(s.a) * 126} r={s.r} fill={LV.negro} opacity={0.85 * manchas} />)}
  </g>;
}

// ---------- selva (origen, hipótesis) ----------
function Hoja({ x, y, s = 1, rot = 0, color = '#1f8a3a', T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.3) * 4}) scale(${s})`}>
    <path d="M 0 0 Q 90 -60 220 0 Q 90 60 0 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 0 L 210 0" stroke="#0e4d1f" strokeWidth={4} />
  </g>;
}
function Papaya({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={70} ry={120} fill="#ffa53a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={10} rx={36} ry={78} fill="#ff6a3a" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={(i % 3 - 1) * 14} cy={-30 + Math.floor(i / 3) * 30} r={7} fill={KC.ink} />)}
  </g>;
}
function Mango({ x, y, s = 1, rot = 20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><path d="M -60 0 Q -70 -80 10 -80 Q 80 -70 70 10 Q 50 80 -10 70 Q -55 60 -60 0 Z" fill="#ffcc33" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 0 Q -40 -60 10 -78" stroke="#ff7a2f" strokeWidth={18} fill="none" opacity=".6" /><path d="M 10 -80 Q 20 -110 40 -118" stroke="#3a7d2c" strokeWidth={7} fill="none" /></g>;
}
function Pina({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-40, -15, 10, 35].map((d, i) => <path key={i} d={`M ${d * 0.5} -80 Q ${d} -170 ${d * 1.6} -190 Q ${d * 0.6} -140 ${d * 0.5 + 10} -80 Z`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} />)}
    <ellipse cx={0} cy={0} rx={65} ry={95} fill="#f2b632" stroke={KC.ink} strokeWidth={6} />
    {[-40, -10, 20, 50].map((d, i) => <path key={i} d={`M -60 ${d - 40} L 60 ${d + 20}`} stroke="#b07a1a" strokeWidth={4} />)}
    {[-40, -10, 20, 50].map((d, i) => <path key={'b' + i} d={`M 60 ${d - 40} L -60 ${d + 20}`} stroke="#b07a1a" strokeWidth={4} />)}
  </g>;
}
// Ave que come fruta (esquemática, tipo tucán).
function Ave({ T, x, y, s = 1 }) {
  const pico = Math.sin(T * 6) * 3;
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.6) * 6}) scale(${s})`}>
    <path d="M -10 120 L -30 190 L 10 190 Z" fill={KC.ink} />
    <ellipse cx={0} cy={60} rx={70} ry={95} fill="#1b1b22" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={14} cy={10} rx={40} ry={34} fill="#fff7d6" />
    <circle cx={22} cy={-30} r={48} fill="#1b1b22" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 52 -50 Q 170 ${-40 + pico} 190 ${-5 + pico} Q 120 ${-6 + pico} 56 -14 Z`} fill="#ff8a1f" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={34} cy={-38} r={14} fill="#7fe3ff" stroke={KC.ink} strokeWidth={3} /><circle cx={36} cy={-38} r={6} fill={KC.ink} />
  </g>;
}

// Subtítulo con cursiva: palabras con _guiones_ van en cursiva (nombres científicos); *asteriscos* = resaltado dorado.
function SubtituloIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

function LavavajillasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Em: CUES.Empaque, Mi: CUES.Microscopio, Me: CUES.Melanina, Ci: CUES.Ciclo, P: CUES.Pregunta, Es: CUES.Estudio,
    Re: CUES.Resultado, Ri: CUES.Riesgo, La: CUES.Lavadora, Or: CUES.Origen, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // cámara del gancho: de la cocina completa al empaque de abajo
  const zG = kprog(T, K.G + 3.5, K.G + 4.9, kEase.suave);
  const camG = camara(klerp(540, 420, zG), klerp(900, 1075, zG), klerp(1, 2.6, zG));
  const zC = kprog(T, K.C + 2.0, K.C + 3.2, kEase.suave);
  const camC = camara(klerp(540, 465, zC), klerp(900, 1075, zC), klerp(1, 2.6, zC));
  const lupa = kprog(T, K.Em + 3.0, K.Em + 4.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la puerta se abre, calor, detergente y sal… y la línea negra del hule */}
      <Escena T={T} a={K.G} b={K.Em} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={camG}>
            <Cocina T={T} abre={kprog(T, K.G + 0.15, K.G + 0.9, kEase.sale)} vapor={kprog(T, K.G + 0.3, K.G + 1.0) * (1 - 0.6 * zG)} linea={1} />
            <Caen T={T} at={K.G + 1.7} x={440} y0={510} y1={870} n={7} tipo="det" />
            <Caen T={T} at={K.G + 2.6} x={640} y0={510} y1={960} n={8} tipo="sal" />
          </g>
          <g opacity={1 - zG}><TermoMini x={110} y={600} h={300} valor={klerp(20, 80, kprog(T, K.G + 0.6, K.G + 1.6, kEase.sale))} /></g>
        </>)}
      </Escena>
      {/* 2 · el empaque de cerca: la línea negra puede ser una levadura negra */}
      <Escena T={T} a={K.Em} b={K.Mi} zoom={0.03} origen="40% 47%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <EmpaqueCerca T={T} linea={klerp(0.8, 1, kprog(T, K.Em, K.Em + 2))} />
          {lupa > 0 && <g>
            <circle cx={400} cy={900} r={300 * lupa + 14} fill="none" stroke={KC.white} strokeWidth={14} />
            <circle cx={400} cy={900} r={300 * lupa} fill={KC.noche} />
            <clipPath id="lupaLV"><circle cx={400} cy={900} r={300 * lupa} /></clipPath>
            <g clipPath="url(#lupaLV)">
              {cadenaPts(250, 1100, -70, 8, 50, 0.05).map(([x, y], k) => <Celula key={k} x={x} y={y} tono={k % 2} />)}
              {cadenaPts(420, 1120, -95, 8, 50, -0.04).map(([x, y], k) => <Celula key={'b' + k} x={x} y={y} tono={(k + 1) % 2} />)}
              {cadenaPts(560, 1040, -120, 6, 50, 0.03).map(([x, y], k) => <Celula key={'c' + k} x={x} y={y} tono={k % 2} />)}
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 3 · al microscopio: brotan en cadenas largas y luego hacen hilos pardos */}
      <Escena T={T} a={K.Mi} b={K.Me} zoom={0.05} origen="45% 55%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Cadena T={T} at={K.Mi + 0.1} pts={CAD_A} />
          <Cadena T={T} at={K.Mi + 0.3} pts={CAD_B} tono={1} />
          <Cadena T={T} at={K.Mi + 1.3} pts={CAD_R} />
          <Hifa T={T} at={K.Mi + 2.4} x={HIFA0[0] + 30} y={HIFA0[1]} n={4} ang={-12} />
          {/* colonia en la caja: negra, húmeda y brillante */}
          {T > K.Mi + 3.3 && <g transform={`translate(900 560) scale(${0.85 * kprog(T, K.Mi + 3.3, K.Mi + 3.7, kEase.rebote)})`}>
            <Petri x={0} y={0} r={100} medio="#f1e3b6">
              {[[-30, -20, 34], [35, 10, 28], [-10, 45, 22], [40, -45, 18]].map(([a, b, r], i) => <g key={i}><Colonia cx={a} cy={b} r={r} color="#16130f" seed={i + 2} /><ellipse cx={a - r * 0.3} cy={b - r * 0.35} rx={r * 0.35} ry={r * 0.15} fill="#fff" opacity=".6" /></g>)}
            </Petri>
          </g>}
        </>)}
      </Escena>
      {/* 4 · la pared con melanina (escudo contra UV, oxidación y sequedad) */}
      <Escena T={T} a={K.Me} b={K.Ci} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} seed={9} />
        {fsvg(<>
          <CelulaCorte T={T} x={520} y={830} r={240} />
          <Estres T={T} at={K.Me + 0.6} x0={150} y0={540} x1={355} y1={660} tipo="uv" texto="UV" />
          <Estres T={T} at={K.Me + 1.2} x0={120} y0={960} x1={290} y1={890} tipo="ox" texto="oxidación" />
          <Estres T={T} at={K.Me + 1.8} x0={930} y0={1040} x1={740} y1={940} tipo="seco" texto="sequedad" />
        </>)}
      </Escena>
      {/* 5 · cada lavado es extremo: calor, detergente, sal y agua alcalina */}
      <Escena T={T} a={K.Ci} b={K.P} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Cocina T={T} abre={1} vapor={0.7} aspersor={1} chorros={kprog(T, K.Ci, K.Ci + 0.4)} display="80°" />
          <TermoMini x={110} y={600} h={300} valor={klerp(60, 80, 0.5 + 0.5 * Math.sin((T - K.Ci) * 2.5))} />
          <Caen T={T} at={K.Ci + 1.2} x={440} y0={570} y1={870} n={7} tipo="det" />
          <Caen T={T} at={K.Ci + 2.2} x={640} y0={570} y1={960} n={8} tipo="sal" />
          {/* tira de pH que se pone azul (alcalina) */}
          <g transform="translate(965 640)" opacity={kprog(T, K.Ci + 3.0, K.Ci + 3.3)}>
            <rect x={-20} y={0} width={40} height={220} rx={6} fill="#fffbe6" stroke={KC.ink} strokeWidth={5} />
            <rect x={-20} y={130} width={40} height={90} rx={6} fill={mixHex('#f2d64b', '#2346ff', kprog(T, K.Ci + 3.3, K.Ci + 4.0))} stroke={KC.ink} strokeWidth={5} />
          </g>
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿cuántos lavavajillas la tienen? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={270} y={1150} />
          {Array.from({ length: 8 }, (_, i) => <MiniLava key={i} x={110 + i * 122} y={440} s={1.3 * kprog(T, K.P + 0.1 + i * 0.12, K.P + 0.4 + i * 0.12, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 7 · el estudio: 189 lavavajillas de casas de todo el mundo */}
      <Escena T={T} a={K.Es} b={K.Re} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMundo T={T} at={K.Es + 2.2} />
          {(() => { const u = kprog(T, K.Es + 0.4, K.Es + 2.2); return u > 0 && u < 1 ? <g transform="translate(840 960)"><MiniLava x={0} y={0} s={2.2} linea /><Hisopo x={-50 + Math.sin(u * Math.PI * 6) * 30} y={60} rot={-35} /></g> : null; })()}
        </>)}
      </Escena>
      {/* 8 · resultado: 62 % con hongos; en más de la mitad de esos, Exophiala */}
      <Escena T={T} a={K.Re} b={K.Ri} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 100 }, (_, i) => {
            const c = i % 20, f = Math.floor(i / 20), hongo = i < 62, exo = i < 35;
            const vg = kprog(T, K.Re + 1.0 + i * 0.012, K.Re + 1.2 + i * 0.012), vn = kprog(T, K.Re + 2.6 + i * 0.02, K.Re + 2.8 + i * 0.02);
            const col = exo && vn > 0.5 ? '#3a3a3a' : hongo && vg > 0.5 ? KC.leaf : LV.acero;
            return <MiniLava key={i} x={84 + c * 48} y={720 + f * 56} s={0.68 * kprog(T, K.Re + 0.2 + i * 0.006, K.Re + 0.5 + i * 0.006, kEase.rebote)} color={col} linea={exo && vn > 0.5} />;
          })}
        </>)}
      </Escena>
      {/* 9 · riesgo: en personas sanas casi nunca causa nada; puede colonizar pulmones con fibrosis quística */}
      <Escena T={T} a={K.Ri} b={K.La} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Persona T={T} x={290} y={720} />
          <Marca x={430} y={600} ok s={kprog(T, K.Ri + 1.3, K.Ri + 1.7, kEase.rebote)} />
          {T > K.Ri + 3.0 && <g opacity={kprog(T, K.Ri + 3.0, K.Ri + 3.4)}><Pulmones T={T} x={790} y={840} s={0.95} manchas={kprog(T, K.Ri + 3.6, K.Ri + 5.2)} /></g>}
        </>)}
      </Escena>
      {/* 10 · también en lavadoras: 79 % de 70 lavadoras de casa en Eslovenia, 2015 */}
      <Escena T={T} a={K.La} b={K.Or} zoom={0.04} origen="70% 55%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Lavadora T={T} x={560} y={690} gira={1} cajon={kprog(T, K.La + 2.4, K.La + 2.9, kEase.sale)} manchas={kprog(T, K.La + 0.8, K.La + 1.8)} />
        </>)}
      </Escena>
      {/* 11 · origen: nadie sabe; hipótesis, frutas de selva tropical */}
      <Escena T={T} a={K.Or} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.leaf} />
        {fsvg(<>
          {T < K.Or + 2.6 && <g opacity={1 - kprog(T, K.Or + 2.2, K.Or + 2.6)}><Interrogacion T={T} x={360} y={1120} color={KC.yellow} tam={560} /></g>}
          {T > K.Or + 2.2 && <g opacity={kprog(T, K.Or + 2.2, K.Or + 2.7)}>
            {[[-40, 520, 1.3, 10, '#1f8a3a'], [900, 640, 1.2, 170, '#2aa64a'], [-60, 1130, 1.4, -15, '#2aa64a'], [880, 1160, 1.3, 195, '#1f8a3a'], [640, 520, 0.9, 160, '#167a30']].map(([x, y, s, r, c], i) => <Hoja key={i} T={T} x={x} y={y} s={s} rot={r} color={c} seed={i} />)}
            <Papaya x={250} y={780} s={kprog(T, K.Or + 2.5, K.Or + 2.9, kEase.rebote)} />
            <Mango x={460} y={900} s={kprog(T, K.Or + 2.7, K.Or + 3.1, kEase.rebote)} />
            <Pina x={680} y={880} s={0.9 * kprog(T, K.Or + 2.9, K.Or + 3.3, kEase.rebote)} />
            <Ave T={T} x={890} y={760} s={0.85 * kprog(T, K.Or + 3.2, K.Or + 3.6, kEase.rebote)} />
          </g>}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo lavavajillas, la puerta se abre otra vez… y la línea negra sigue ahí, tranquila */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={camC}>
            <Cocina T={T} abre={kprog(T, K.C + 0.15, K.C + 0.9, kEase.sale)} vapor={kprog(T, K.C + 0.3, K.C + 1.0) * (1 - 0.6 * zC)} linea={1} ojos={kprog(T, K.C + 2.8, K.C + 3.2)} />
          </g>
          <g opacity={1 - zC}><TermoMini x={110} y={600} h={300} valor={klerp(20, 80, kprog(T, K.C + 0.4, K.C + 1.4, kEase.sale))} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.7} until={K.G + 3.4} texto="hasta 80 °C" x={260} y={400} tam={36} borde={KC.red} />
      <Chip T={T} at={K.G + 1.7} until={K.G + 3.4} texto="detergente" x={260} y={480} tam={36} borde={LV.azul} />
      <Chip T={T} at={K.G + 2.6} until={K.G + 3.4} texto="sal" x={260} y={560} tam={36} borde={KC.white} />
      <Chip T={T} at={K.G + 3.6} until={K.G + 4.7} texto="¿y aun así…?" x={300} y={560} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.G + 4.8} until={K.Em - 0.3} texto="¡ahí vive un hongo!" x={360} y={560} tam={46} borde={KC.mint} />
      <Etq T={T} at={K.Em + 0.8} until={K.Em + 2.9} x={600} y={862} texto="levadura negra" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Em + 1.2} until={K.Em + 2.9} x={600} y={918} texto="Exophiala" it tam={38} color={KC.gold2} />
      <Chip T={T} at={K.Em + 1.6} until={K.Em + 2.9} texto="en el hule de la puerta" x={330} y={560} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Em + 3.4} until={K.Mi - 0.2} texto="AL MICROSCOPIO" x={330} y={520} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Mi + 0.9} until={K.Me - 0.3} x={325} y={600} texto="blastoconidios (brotan)" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Mi + 1.6} until={K.Me - 0.3} texto="en cadenas largas" x={300} y={480} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Mi + 3.0} until={K.Me - 0.3} x={1040} y={660} lado="izq" texto="hifa parda con septos" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Mi + 3.5} until={K.Me - 0.3} texto="colonia: negra, húmeda y brillante" x={640} y={400} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Me + 0.4} until={K.Ci - 0.3} x={765} y={760} texto="melanina" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Me + 0.4} until={K.Ci - 0.3} x={765} y={808} texto="(en la pared)" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Me + 2.3} until={K.Ci - 0.3} texto="pigmento = escudo" x={330} y={420} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 0.3} until={K.P - 0.3} texto="60–80 °C, a ratos" x={290} y={400} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.2} until={K.P - 0.3} texto="detergente agresivo" x={780} y={400} tam={32} borde={LV.azul} />
      <Chip T={T} at={K.Ci + 2.2} until={K.P - 0.3} texto="mucha sal" x={290} y={490} tam={32} borde={KC.white} />
      <Chip T={T} at={K.Ci + 3.2} until={K.P - 0.3} texto="agua alcalina" x={780} y={490} tam={32} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.1} anio="2011" quien="Eslovenia · Zalar y colaboradores" revista="Fungal Biology" y={620} />
      <NumeroGigante T={T} at={K.Es + 2.3} until={K.Re - 0.3} valor={189} dur={1.4} etiqueta="lavavajillas de casas" x={540} y={470} tam={180} color={KC.gold2} />
      <Chip T={T} at={K.Es + 3.0} until={K.Re - 0.3} texto="101 ciudades y pueblos" x={540} y={650} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Re + 0.2} until={K.Ri - 0.3} valor={62} dur={1.0} sufijo=" %" etiqueta="tenía hongos en el hule" x={380} y={470} tam={170} color={KC.leaf} />
      <Chip T={T} at={K.Re + 2.7} until={K.Ri - 0.3} texto={<><i>Exophiala</i>: en el 56 % de los que tenían hongos</>} x={540} y={1010} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Ri + 0.4} until={K.La - 0.3} texto="¿es peligrosa?" x={300} y={420} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ri + 1.4} until={K.La - 0.3} texto="personas sanas: casi nunca causa nada" x={540} y={1105} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.Ri + 3.4} until={K.La - 0.3} texto="fibrosis quística: puede colonizar los pulmones" x={540} y={1105} tam={26} borde={KC.red} />
      <NumeroGigante T={T} at={K.La + 0.7} until={K.Or - 0.3} valor={79} dur={1.0} sufijo=" %" etiqueta="de 70 lavadoras de casa" x={330} y={480} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.La + 1.4} until={K.Or - 0.3} texto="Eslovenia, 2015" x={330} y={660} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.La + 2.6} until={K.Or - 0.3} x={575} y={735} lado="izq" texto="cajón del detergente" tam={30} color={KC.ink} />
      <Etq T={T} at={K.La + 3.0} until={K.Or - 0.3} x={655} y={1000} lado="izq" texto="hule de la puerta" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Or + 0.4} until={K.Or + 2.3} texto="origen: desconocido" x={360} y={460} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Or + 2.4} until={K.C - 0.3} texto="HIPÓTESIS" x={260} y={440} tam={48} borde={KC.yellow} fondo={KC.red} />
      <Chip T={T} at={K.Or + 3.4} until={K.C - 0.3} texto="la han hallado en frutas tropicales de Tailandia" x={540} y={1050} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.7} until={K.C + 2.0} texto="hasta 80 °C" x={260} y={420} tam={36} borde={KC.red} />
      <Chip T={T} at={K.C + 3.2} until={K.Ou} texto="tan tranquila" x={380} y={640} tam={48} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.G + 3.6} texto="10 cm" largo={113} />
      <BarraEscala T={T} at={K.G + 4.6} until={K.Em} texto="5 cm" largo={147} />
      <BarraEscala T={T} at={K.Em} until={K.Mi} texto="1 cm" largo={120} />
      <BarraEscala T={T} at={K.Mi} until={K.Me} texto="10 µm" largo={104} />
      <BarraEscala T={T} at={K.Me} until={K.Ci} texto="1 µm" largo={104} />
      <BarraEscala T={T} at={K.Ci} until={K.P} texto="10 cm" largo={113} />
      <BarraEscala T={T} at={K.La} until={K.Or} texto="10 cm" largo={75} />
      <BarraEscala T={T} at={K.Or + 2.4} until={K.C} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.C} until={K.C + 2.1} texto="10 cm" largo={113} />
      <BarraEscala T={T} at={K.C + 3.2} until={K.Ou} texto="5 cm" largo={147} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloIt T={T} idx={0} at={K.G + 0.1} until={K.Em - 0.1} texto="Hasta 80 °C, detergente y sal… *y ahí vive un hongo.*" />
      <SubtituloIt T={T} idx={1} at={K.Em + 0.1} until={K.Mi - 0.1} texto="Esa línea negra: *una levadura negra,* _Exophiala._" />
      <SubtituloIt T={T} idx={2} at={K.Mi + 0.1} until={K.Me - 0.1} texto="Bolitas en cadenas… *y luego hilos cafés.*" />
      <SubtituloIt T={T} idx={3} at={K.Me + 0.1} until={K.Ci - 0.1} texto="Melanina: *un pigmento que la protege.*" />
      <SubtituloIt T={T} idx={4} at={K.Ci + 0.1} until={K.P - 0.1} texto="Calor, detergente, sal y *agua alcalina.*" />
      <SubtituloIt T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Cuántos lavavajillas *la tienen?*" />
      <SubtituloIt T={T} idx={6} at={K.Es + 0.1} until={K.Re - 0.1} texto="189 lavavajillas *de casas de todo el mundo.*" />
      <SubtituloIt T={T} idx={7} at={K.Re + 0.1} until={K.Ri - 0.1} texto="62 % con hongos… y en *más de la mitad, _Exophiala._*" />
      <SubtituloIt T={T} idx={8} at={K.Ri + 0.1} until={K.La - 0.1} texto="Sanos: casi nada. *Fibrosis quística: pulmones.*" />
      <SubtituloIt T={T} idx={9} at={K.La + 0.1} until={K.Or - 0.1} texto="2015: *79 % de 70 lavadoras* con hongos." />
      <SubtituloIt T={T} idx={10} at={K.Or + 0.1} until={K.C - 0.1} texto="Hipótesis: *frutas de selva tropical.*" />
      <SubtituloIt T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Hasta 80 °C… *y ella, tan tranquila.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [K.Em + 0.8, K.Mi - 0.5, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Me + 0.1, K.Ci - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Es - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Re + 1.3, K.Ri - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ri + 1.0, K.La - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.La + 0.6, K.Or - 0.1, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Or + 0.9, K.C - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.9, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="86" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LavavajillasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LavavajillasShot /></CompositionStage></div>;
}
window.LavavajillasApp = LavavajillasApp;
