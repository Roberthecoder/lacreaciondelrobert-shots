// Shot Festivo #09 · Virgen de Guadalupe · Científico: Rosas en diciembre: el freno roto en su ADN — NARRADO (N1 "Por dentro" + un poco de N3).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (ADN, gen KSN, retrotransposón y su "lectura" simplificados).
const ROJO = '#d8173c', ROJO2 = '#9e0b28', TALLO = '#2f8f3a', TALLO2 = '#1f6a2a', HOJA = '#3fae4a', HOJA2 = '#2a8a38';
const SILV = '#ff9cc2', CHINA = '#ffc2d6', GALICA = '#c2186b', INSERTO = '#ff4fd8', KSNC = '#F4C25A';

// ---------- plantas ----------
// Foliolo con borde aserrado (la hoja de rosa es compuesta: 5 foliolos dentados)
function folioloPath(L = 60, W = 26) {
  const pts = [];
  for (let i = 0; i <= 28; i++) { const a = (i / 28) * Math.PI * 2, r = i % 2 ? 1 : 0.9; pts.push([Math.sin(a) * W * r, -L / 2 - Math.cos(a) * (L / 2) * r]); }
  return 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
}
const FOL = folioloPath();
function Foliolo({ x, y, rot, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={FOL} fill={HOJA} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <line x1={0} y1={-4} x2={0} y2={-54} stroke={HOJA2} strokeWidth={3} />
  </g>;
}
// Hoja compuesta: raquis + 2 pares de foliolos + el de la punta. e 0..1 (crece)
function Hoja({ x, y, rot = 0, s = 1, e = 1 }) {
  if (e <= 0) return null;
  const k = s * kEase.sale(kclamp(e, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
    <line x1={0} y1={0} x2={0} y2={-130} stroke={TALLO2} strokeWidth={6} strokeLinecap="round" />
    {[[-40, 0.85], [-82, 0.95]].map(([py, sc], i) => <g key={i}><Foliolo x={-4} y={py} rot={-62} s={sc} /><Foliolo x={4} y={py} rot={62} s={sc} /></g>)}
    <Foliolo x={0} y={-126} rot={0} s={1.05} />
  </g>;
}
// Rosa moderna vista de 3/4 (centro x,y). abre 0 = botón cerrado · 1 = flor abierta
function RosaFlor({ x, y, s = 1, abre = 1, color = ROJO, color2 = ROJO2, rot = 0, T = 0 }) {
  const a = kclamp(abre, 0, 1);
  const capa = (k) => kEase.sale(kclamp(a * 3 - k, 0, 1));
  const petalo = (R, w) => `M 0 0 C ${-w} ${-R * 0.25} ${-w * 1.05} ${-R * 0.95} 0 ${-R} C ${w * 1.05} ${-R * 0.95} ${w} ${-R * 0.25} 0 0 Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {/* sépalos */}
    {[-50, 0, 50].map((r, i) => <path key={i} d="M 0 30 C -10 60 -6 90 0 104 C 6 90 10 60 0 30 Z" fill={HOJA} stroke={KC.ink} strokeWidth={3.5} transform={`rotate(${180 + r * (0.4 + a * 0.9)} 0 30)`} />)}
    {a < 0.45 && <g opacity={1 - kprog(a, 0.3, 0.45)}>
      <path d="M 0 40 C -46 26 -44 -44 0 -78 C 44 -44 46 26 0 40 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
      <path d="M -6 30 C -30 6 -24 -40 0 -66" stroke={color2} strokeWidth={4} fill="none" />
      <path d="M -40 6 C -30 30 -10 38 0 40 C 10 38 30 30 40 6 C 30 22 -30 22 -40 6 Z" fill={HOJA} stroke={KC.ink} strokeWidth={3.5} />
    </g>}
    {a >= 0.3 && <g opacity={kprog(a, 0.3, 0.45)} transform="scale(1 0.86)">
      {[2, 1, 0].map((k) => { const R = [62, 92, 122][k], w = [44, 60, 74][k], n = 5, off = k * 36 + 18, c = capa(2 - k);
        return <g key={k} transform={`scale(${0.35 + 0.65 * c})`}>{Array.from({ length: n }, (_, i) =>
          <path key={i} d={petalo(R, w)} fill={k === 2 ? color : k === 1 ? mixHex(color, color2, 0.25) : mixHex(color, color2, 0.5)} stroke={KC.ink} strokeWidth={4.5} strokeLinejoin="round" transform={`rotate(${off + i * 72})`} />)}</g>; })}
      {/* centro en espiral (pétalos aún enrollados) */}
      <path d="M 0 0 m -30 0 a 30 28 0 1 1 30 28 a 22 20 0 1 1 -18 -26 a 13 12 0 1 1 14 14" fill={color2} stroke={KC.ink} strokeWidth={4} />
      <path d="M -40 -18 q 30 -26 64 -6" stroke="rgba(255,255,255,.45)" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>}
  </g>;
}
// Rosa silvestre: 5 pétalos sencillos con muesca y estambres amarillos
function RosaSilvestre({ x, y, s = 1, e = 1, color = SILV }) {
  if (e <= 0) return null;
  const k = s * kEase.rebote(kclamp(e, 0, 1));
  const pet = 'M 0 -8 C -44 -30 -50 -92 -14 -100 Q 0 -86 14 -100 C 50 -92 44 -30 0 -8 Z';
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={pet} fill={color} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 72})`} />)}
    <circle r={30} fill="#ffd23a" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 36} cy={Math.sin(a) * 36} r={5} fill="#e8a300" stroke={KC.ink} strokeWidth={2} />; })}
  </g>;
}
// Tallo con espinas, de (x,y) hacia arriba
function Tallo({ x, y, alto, ancho = 16, curva = 0, espinas = 4 }) {
  const top = y - alto;
  return <g>
    <path d={`M ${x} ${y} Q ${x + curva} ${(y + top) / 2} ${x} ${top}`} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" />
    <path d={`M ${x} ${y} Q ${x + curva} ${(y + top) / 2} ${x} ${top}`} stroke={TALLO} strokeWidth={ancho} fill="none" strokeLinecap="round" />
    {Array.from({ length: espinas }, (_, i) => { const u = (i + 0.6) / (espinas + 0.4), py = klerp(y, top, u), px = x + curva * 2 * u * (1 - u), d = i % 2 ? 1 : -1;
      return <path key={i} d={`M ${px + d * ancho * 0.45} ${py + 10} L ${px + d * (ancho * 0.45 + 18)} ${py - 6} L ${px + d * ancho * 0.45} ${py - 6} Z`} fill="#c9733a" stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Rosal silvestre: matita de varias ramas. flor 0..1 (cuántas flores abiertas), caen 0..1 (pétalos que caen)
function RosalSilvestre({ T, x, y, s = 1, flor = 0, caen = 0 }) {
  const ramas = [[-150, 330, -40], [-60, 400, 20], [40, 380, -10], [140, 320, 40]];
  const flores = [[-170, -320], [-70, -400], [30, -385], [140, -320], [-120, -230], [90, -240], [-20, -300]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([dx, h, c], i) => <Tallo key={i} x={dx * 0.3} y={0} alto={h} ancho={11} curva={c + dx * 0.4} espinas={3} />)}
    {[[-140, -150, -60], [-60, -260, -40], [60, -250, 40], [150, -160, 60], [-10, -120, 10], [120, -300, 30], [-160, -280, -30]].map(([hx, hy, r], i) =>
      <Hoja key={i} x={hx} y={hy} rot={r} s={0.75} e={1} />)}
    {flores.map(([fx, fy], i) => { const e = kclamp(flor * flores.length - i, 0, 1), cae = kclamp(caen * 1.4 - i * 0.06, 0, 1);
      return <g key={i} transform={`translate(0 ${cae * cae * 500})`} opacity={1 - cae}><RosaSilvestre x={fx} y={fy + Math.sin(T * 2 + i) * 4} s={0.62} e={e} /></g>; })}
    <ellipse cx={0} cy={6} rx={240} ry={22} fill="rgba(0,0,0,.2)" />
  </g>;
}
// Florero de vidrio con agua
function Florero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={232} rx={150} ry={22} fill="rgba(0,0,0,.25)" />
    <path d="M -80 -10 L 80 -10 L 110 210 Q 0 240 -110 210 Z" fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -86 60 L 86 60 L 108 210 Q 0 238 -108 210 Z" fill="rgba(120,210,255,.6)" />
    <path d="M -56 20 L -70 190" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
  </g>;
}
// Hoja de calendario
function HojaCalendario({ x, y, s = 1, rot = 0, mes = 'DICIEMBRE', dia = '12' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-160} width={300} height={320} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -100 L -150 -138 Q -150 -160 -128 -160 L 128 -160 Q 150 -160 150 -138 L 150 -100 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-116} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff">{mes}</text>
    <text x={0} y={110} textAnchor="middle" style={{ font:`400 190px ${KF.titulo}` }} fill={KC.ink}>{dia}</text>
    {[-90, 90].map((cx) => <rect key={cx} x={cx - 10} y={-182} width={20} height={44} rx={8} fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Señal de ALTO = el freno (gen KSN). roto 0..1 (grieta), o opacidad
function Alto({ x, y, s = 1, roto = 0, o = 1, rot = 0 }) {
  if (o <= 0) return null;
  const oct = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i / 8) * Math.PI * 2; return `${(Math.cos(a) * 100).toFixed(1)},${(Math.sin(a) * 100).toFixed(1)}`; }).join(' ');
  const oct2 = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i / 8) * Math.PI * 2; return `${(Math.cos(a) * 86).toFixed(1)},${(Math.sin(a) * 86).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-9} y={80} width={18} height={130} fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />
    <polygon points={oct} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <polygon points={oct2} fill={KC.red} />
    <text x={0} y={22} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill="#fff">ALTO</text>
    {roto > 0 && <path d={`M -20 -96 L 6 -40 L -14 -6 L 18 30 L ${klerp(2, -6, roto)} ${klerp(30, 96, roto)}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinejoin="round" strokeDasharray="300" strokeDashoffset={300 * (1 - roto)} />}
  </g>;
}

// ---------- ADN ----------
// Doble hélice horizontal de x0 a x1 (centro y). tramo(u) → color del peldaño o null. fase para que gire.
function ADN({ x0, x1, y, alto = 70, fase = 0, paso = 150, tramo, base = '#7fb8ff', o = 1 }) {
  const n = Math.max(2, Math.round((x1 - x0) / 9));
  const pA = [], pB = [], rungs = [];
  for (let i = 0; i <= n; i++) { const u = i / n, X = klerp(x0, x1, u), ph = (X / paso) * Math.PI * 2 + fase;
    const ya = y + Math.sin(ph) * alto / 2, yb = y - Math.sin(ph) * alto / 2;
    pA.push(`${X.toFixed(1)},${ya.toFixed(1)}`); pB.push(`${X.toFixed(1)},${yb.toFixed(1)}`);
    if (i % 2 === 0) rungs.push(<line key={i} x1={X} y1={ya} x2={X} y2={yb} stroke={(tramo && tramo(X)) || 'rgba(190,220,255,.55)'} strokeWidth={6} strokeLinecap="round" />); }
  return <g opacity={o}>
    {rungs}
    <polyline points={pA.join(' ')} fill="none" stroke={base} strokeWidth={9} strokeLinecap="round" />
    <polyline points={pB.join(' ')} fill="none" stroke={mixHex(base, '#ffffff', 0.35)} strokeWidth={9} strokeLinecap="round" />
  </g>;
}
// Gen con o sin el pedazo insertado. hueco 0..1 abre el gen; inserto = posición del pedazo {x, y} (o null)
const GX0 = 60, GX1 = 1020, KS0 = 380, KS1 = 700, KMID = 540, LARGO_INS = 200;
function Gen({ T, y = 950, hueco = 0, inserto = null, o = 1, ksn = 1, fase }) {
  const g = (LARGO_INS / 2) * hueco, f = fase == null ? T * 1.4 : fase;
  const tr = (X) => (X > KS0 - g && X < KS1 + g ? mixHex('#bfdcff', KSNC, ksn) : null);
  return <g opacity={o}>
    <ADN x0={GX0} x1={KMID - g} y={y} fase={f} tramo={tr} />
    <g transform={`translate(${2 * g} 0)`}><ADN x0={KMID} x1={GX1} y={y} fase={f} tramo={(X) => tr(X)} /></g>
    {inserto && <Inserto x={inserto.x} y={inserto.y} fase={f} rot={inserto.rot || 0} />}
  </g>;
}
function Inserto({ x, y, fase = 0, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ADN x0={-LARGO_INS / 2} x1={LARGO_INS / 2} y={0} fase={fase} base={INSERTO} tramo={() => '#ffc2f3'} />
  </g>;
}
// "Lector" del gen (la maquinaria que copia el ADN a ARN) con su hebra de ARN detrás
function Lector({ T, x, y, atorado = 0 }) {
  const sh = atorado ? Math.sin(T * 40) * 6 * atorado : 0;
  return <g transform={`translate(${x + sh} ${y})`}>
    <path d={`M -10 0 ${Array.from({ length: 10 }, (_, i) => `q -14 ${i % 2 ? 22 : -22} -28 0`).join(' ')}`} stroke={KC.orange} strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - atorado * 0.5} />
    <ellipse cx={0} cy={0} rx={70} ry={58} fill="rgba(47,224,168,.85)" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-18} cy={-18} rx={22} ry={12} fill="#fff" opacity=".45" />
  </g>;
}
// Barra de gen pequeña (para el estudio): con o sin el pedazo extra
function GenMini({ x, y, w = 300, ins = false, e = 1 }) {
  if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.sale(kclamp(e, 0, 1))} 1)`}>
    <rect x={0} y={-12} width={w} height={24} rx={12} fill="#bfdcff" stroke={KC.ink} strokeWidth={4} />
    <rect x={w * 0.3} y={-12} width={w * 0.4} height={24} fill={KSNC} stroke={KC.ink} strokeWidth={4} />
    {ins && <rect x={w * 0.44} y={-20} width={w * 0.14} height={40} rx={8} fill={INSERTO} stroke={KC.ink} strokeWidth={4} />}
  </g>;
}

// ---------- paisajes ----------
function Tepeyac({ T, flor = 0, hielo = 1 }) {
  const g = krng(4);
  return <g>
    <path d="M -40 1260 C 120 1060 300 900 540 860 C 760 900 960 1040 1120 1220 L 1120 1920 L -40 1920 Z" fill="#c8a36a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 1330 C 200 1200 380 1150 600 1170 C 800 1190 980 1260 1120 1330 L 1120 1920 L -40 1920 Z" fill="#a9824e" />
    {/* rocas */}
    {[[180, 1150, 1], [330, 1010, 0.8], [760, 1000, 0.9], [900, 1120, 1.1], [520, 1110, 0.7]].map(([rx, ry, s], i) =>
      <path key={i} d="M -60 20 L -40 -30 L 10 -44 L 56 -14 L 64 20 Z" fill="#8d8a86" stroke={KC.ink} strokeWidth={5} transform={`translate(${rx} ${ry}) scale(${s})`} />)}
    {/* nopales */}
    {[[110, 1180], [960, 1170]].map(([nx, ny], i) => <g key={i} transform={`translate(${nx} ${ny})`}>
      <ellipse cx={0} cy={-60} rx={42} ry={70} fill="#4fa34a" stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={-46} cy={-150} rx={30} ry={50} fill="#4fa34a" stroke={KC.ink} strokeWidth={5} transform="rotate(-25 -46 -150)" />
      <ellipse cx={40} cy={-160} rx={28} ry={48} fill="#4fa34a" stroke={KC.ink} strokeWidth={5} transform="rotate(20 40 -160)" />
      {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={(k % 3 - 1) * 20} cy={-30 - k * 12} r={3} fill="#e8f0c0" />)}
    </g>)}
    {/* escarcha sobre el cerro */}
    {Array.from({ length: 26 }, (_, i) => { const px = g() * 1000 + 40, py = 900 + g() * 320; return <path key={i} d={`M ${px - 10} ${py} L ${px + 10} ${py} M ${px} ${py - 10} L ${px} ${py + 10}`} stroke="#fff" strokeWidth={4} opacity={hielo * (0.5 + 0.5 * Math.sin(T * 3 + i))} />; })}
    {/* rosas en la cumbre */}
    {[[440, 880, -8], [540, 850, 4], [640, 885, 10], [490, 930, -4], [600, 930, 6]].map(([fx, fy, r], i) => { const e = kclamp(flor * 5 - i, 0, 1);
      return e > 0 ? <g key={i}><Hoja x={fx - 10} y={fy + 70} rot={-50} s={0.5} e={e} /><RosaFlor x={fx} y={fy - 10 * e} s={0.55 * (0.5 + 0.5 * e)} abre={e} rot={r} /></g> : null; })}
  </g>;
}
// Copos de hielo que caen
function Copos({ T, n = 24, o = 1 }) {
  const g = krng(9);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const px = g() * 1080, sp = 60 + g() * 60, py = ((T * sp + g() * 1900) % 1300) + 380;
    return <circle key={i} cx={px + Math.sin(T + i) * 20} cy={py} r={4 + g() * 5} fill="#fff" opacity=".8" />; })}</g>;
}
const MESES = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
// Tira de 12 meses. luz(i) 0..1 = qué tanto se ilumina cada mes. cursor = índice que avanza (opcional)
function TiraMeses({ x = 90, y = 1480, ancho = 900, luz = () => 0, cursor = null, color = SILV, etiqueta = 'primavera' }) {
  const w = ancho / 12;
  return <g transform={`translate(${x} ${y})`}>
    {MESES.map((m, i) => { const l = luz(i), on = cursor != null && Math.floor(cursor) === i;
      return <g key={i}>
        <rect x={i * w + 4} y={0} width={w - 8} height={92} rx={14} fill={l > 0 ? mixHex('#ffffff', color, l) : '#fff'} stroke={on ? KC.red : KC.ink} strokeWidth={on ? 8 : 5} />
        <text x={i * w + w / 2} y={62} textAnchor="middle" style={{ font:`400 48px ${KF.titulo}` }} fill={KC.ink}>{m}</text>
      </g>; })}
    {etiqueta && <text x={w * 3.5} y={-18} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={kclamp(luz(3) * 2, 0, 1)}>{etiqueta}</text>}
  </g>;
}
// Barco de vela esquemático
function Barco({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2.4) * 6;
  return <g transform={`translate(${x} ${y + b}) rotate(${Math.sin(T * 2) * 3}) scale(${s})`}>
    <path d="M -130 0 L 130 0 L 96 60 L -100 60 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={0} x2={0} y2={-230} stroke={KC.ink} strokeWidth={8} />
    <path d="M 6 -220 Q 110 -140 6 -40 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -6 -200 Q -90 -130 -6 -60 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Invernadero (arcos y vidrios)
function Invernadero() {
  return <g>
    <path d="M 40 1250 L 40 760 Q 540 520 1040 760 L 1040 1250 Z" fill="rgba(255,255,255,.28)" stroke="#fff" strokeWidth={10} strokeLinejoin="round" />
    {[220, 400, 540, 680, 860].map((xx, i) => <line key={i} x1={xx} y1={1250} x2={xx} y2={760 - Math.sin(((xx - 40) / 1000) * Math.PI) * 210 + 30} stroke="#fff" strokeWidth={5} opacity=".7" />)}
    <path d="M 40 900 Q 540 680 1040 900" stroke="#fff" strokeWidth={5} fill="none" opacity=".7" />
    <rect x={20} y={1230} width={1040} height={60} rx={10} fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Sol({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 20})`}>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-8} y={-96} width={16} height={34} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 36})`} />)}
    <circle r={56} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tijeras de jardín
function Tijeras({ x, y, abre = 0, s = 1, rot = 0 }) {
  const a = 18 * abre;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 150 -10 L 150 8 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={5} /><rect x={-130} y={-14} width={120} height={26} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={5} transform="rotate(8)" /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 150 10 L 150 -8 Z" fill="#aeb4c0" stroke={KC.ink} strokeWidth={5} /><rect x={-130} y={-12} width={120} height={26} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={5} transform="rotate(-8)" /></g>
    <circle r={10} fill="#3b3f4a" />
  </g>;
}
// Rosa en tallo (rosa de corte): tallo + 2 hojas + flor
function RosaTallo({ x, y, alto = 420, abre = 1, s = 1, curva = 0, rot = 0, T = 0, color = ROJO }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Tallo x={0} y={0} alto={alto} curva={curva} />
    <Hoja x={curva * 0.4} y={-alto * 0.35} rot={-55} s={0.8} /><Hoja x={curva * 0.5} y={-alto * 0.6} rot={50} s={0.75} />
    <RosaFlor x={0} y={-alto - 30} s={0.9} abre={abre} color={color} rot={Math.sin(T * 1.5) * 3} />
  </g>;
}

function Rosas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Te: CUES.Tepeyac, Si: CUES.Silvestre, Fr: CUES.Freno, Ho: CUES.Hojas, Pr: CUES.Primavera, P: CUES.Pregunta, Sa: CUES.Saltarin,
    Ap: CUES.Apagado, E: CUES.Estudio, Ch: CUES.China, In: CUES.Invernadero, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const ramo = (abre, brillo) => <>
    {[[-120, 330, -16, 0.15], [120, 340, 14, 0.25], [-40, 390, -5, 0.05], [60, 380, 7, 0.1]].map(([dx, h, r, d], i) =>
      <RosaTallo key={i} T={T} x={400} y={940} alto={h} rot={r} s={0.85} abre={kclamp(abre - d, 0, 1)} color={i % 2 ? '#e8264f' : ROJO} />)}
  </>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la rosa del florero se abre; cae la hoja de diciembre */}
      <Escena T={T} a={K.G} b={K.Te} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Florero x={400} y={880} s={1.2} />
          <RosaTallo T={T} x={400} y={940} alto={330} s={1.25} abre={kprog(T, K.G + 0.05, K.G + 0.75, kEase.sale)} />
          <HojaCalendario x={klerp(1300, 800, kprog(T, K.G + 0.25, K.G + 0.9, kEase.rebote))} y={1590} rot={klerp(30, 6, kprog(T, K.G + 0.25, K.G + 1.0))} s={0.95} />
          {T > K.G + 0.8 && Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.G + 0.8, K.G + 1.6), a = (i / 10) * Math.PI * 2; return <circle key={i} cx={400 + Math.cos(a) * (80 + 220 * u)} cy={490 + Math.sin(a) * (80 + 220 * u)} r={12 * (1 - u)} fill="#fff" />; })}
        </>)}
      </Escena>
      {/* 1 · la tradición: rosas en el Tepeyac en diciembre (sin imágenes religiosas) */}
      <Escena T={T} a={K.Te} b={K.Si} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7db8f0, #cfe6ff 55%, #ffe6c8)' }}></div>
        {svg(<>
          <Copos T={T} o={1 - kprog(T, K.Te + 3.5, K.Te + 5.5) * 0.5} />
          <Tepeyac T={T} flor={kprog(T, K.Te + 1.4, K.Te + 3.6)} hielo={1} />
        </>)}
      </Escena>
      {/* 2 · la rosa silvestre florece solo en primavera */}
      <Escena T={T} a={K.Si} b={K.Fr}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <RosalSilvestre T={T} x={560} y={1120} s={1.1} flor={kprog(T, K.Si + 0.8, K.Si + 2.0)} />
          <TiraMeses y={1480} luz={(i) => (i >= 2 && i <= 4 ? kprog(T, K.Si + 0.8, K.Si + 1.6) : 0)} />
        </>)}
      </Escena>
      {/* 3 · por dentro: el gen KSN es un freno (fondo oscuro: escala molecular) */}
      <Escena T={T} a={K.Fr} b={K.Ho} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(120,200,255,.22)" />
        {svg(<>
          <Gen T={T} y={980} ksn={kprog(T, K.Fr + 0.4, K.Fr + 1.0)} o={kprog(T, K.Fr - 0.3, K.Fr + 0.3)} />
          <path d={`M ${KS0} 1060 L ${KS0} 1080 L ${KS1} 1080 L ${KS1} 1060`} stroke={KSNC} strokeWidth={6} fill="none" opacity={kprog(T, K.Fr + 0.5, K.Fr + 0.9)} />
          <text x={KMID} y={1135} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KSNC} opacity={kprog(T, K.Fr + 0.5, K.Fr + 0.9)}>GEN KSN</text>
          <Alto x={KMID} y={klerp(560, 720, kprog(T, K.Fr + 1.1, K.Fr + 1.6, kEase.rebote))} s={0.9} o={kprog(T, K.Fr + 1.1, K.Fr + 1.4)} />
        </>)}
      </Escena>
      {/* 4 · con el freno puesto: el brote echa hojas, pero no flor */}
      <Escena T={T} a={K.Ho} b={K.Pr}>
        <FondoLunares color={KC.yellow} />
        {svg((() => { const c = kprog(T, K.Ho + 0.1, K.Ho + 3.2), alto = klerp(220, 600, c);
          return <>
            <Tallo x={540} y={1240} alto={alto} curva={30} espinas={Math.round(2 + c * 3)} />
            {[[0.28, -55], [0.48, 52], [0.66, -50], [0.84, 48]].map(([u, r], i) => <Hoja key={i} x={540 + (r < 0 ? -6 : 6)} y={1240 - 600 * u} rot={r} s={0.85} e={kclamp((alto / 600 - u) * 6, 0, 1)} />)}
            {/* yema de la punta: sigue haciendo hojas */}
            <g transform={`translate(540 ${1240 - alto - 10})`}><path d="M 0 -40 C -22 -20 -22 10 0 16 C 22 10 22 -20 0 -40 Z" fill={HOJA} stroke={KC.ink} strokeWidth={4} /></g>
            <Alto x={250} y={900} s={0.7} rot={Math.sin(T * 3) * 4} />
          </>; })())}
      </Escena>
      {/* 5 · en primavera el freno se afloja: su única floración */}
      <Escena T={T} a={K.Pr} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <TiraMeses y={480} cursor={klerp(0, 4.99, kprog(T, K.Pr + 0.1, K.Pr + 1.2))} luz={(i) => (i >= 2 && i <= 4 ? kprog(T, K.Pr + 0.9, K.Pr + 1.4) : 0)} />
          <Alto x={klerp(870, 1250, kprog(T, K.Pr + 1.2, K.Pr + 1.9, kEase.suave))} y={850} s={0.75} rot={klerp(0, 40, kprog(T, K.Pr + 1.2, K.Pr + 1.9))} />
          <RosalSilvestre T={T} x={520} y={1130} s={1.1} flor={kprog(T, K.Pr + 1.4, K.Pr + 2.8)} caen={kprog(T, K.Pr + 3.6, K.Pr + 4.8)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si el freno se rompe? */}
      <Escena T={T} a={K.P} b={K.Sa} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={250} y={1060} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 250 860)`}>?</text>
          <Alto x={300} y={1060} s={0.6} roto={kprog(T, K.P + 0.5, K.P + 1.4)} rot={-8} />
        </>)}
      </Escena>
      {/* 7 · un pedazo de ADN saltarín se mete dentro del gen */}
      <Escena T={T} a={K.Sa} b={K.Ap} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(255,120,230,.2)" />
        {svg((() => { const v = kprog(T, K.Sa + 0.3, K.Sa + 2.0, kEase.suave), h = kprog(T, K.Sa + 1.5, K.Sa + 2.2, kEase.suave);
          const ix = klerp(150, KMID + LARGO_INS / 2 * h, v), iy = klerp(520, 950, v) - Math.sin(v * Math.PI) * 220, rot = (1 - v) * 360;
          return <>
            <Gen T={T} y={950} hueco={h} inserto={{ x: v >= 1 ? KMID + LARGO_INS / 2 : ix, y: v >= 1 ? 950 : iy, rot }} />
            <text x={KMID + 100 * h} y={1110} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KSNC}>GEN KSN</text>
          </>; })())}
      </Escena>
      {/* 8 · el gen ya no se lee → sin freno → flor en cada temporada buena */}
      <Escena T={T} a={K.Ap} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg((() => { const lx = klerp(80, KMID - 70, kprog(T, K.Ap + 0.2, K.Ap + 1.3, kEase.suave)), at = kprog(T, K.Ap + 1.3, K.Ap + 1.5);
          return <g opacity={1 - kprog(T, K.Ap + 2.2, K.Ap + 2.7)}>
            <Gen T={T} y={950} hueco={1} inserto={{ x: KMID + LARGO_INS / 2, y: 950 }} />
            <Lector T={T} x={lx} y={950} atorado={at} />
            {at > 0 && <g transform={`translate(${KMID - 70} 820) scale(${kEase.rebote(at)})`}><path d="M -34 -34 L 34 34 M 34 -34 L -34 34" stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>}
            <Alto x={KMID + 100} y={640} s={0.75} o={1 - kprog(T, K.Ap + 1.6, K.Ap + 2.1)} rot={kprog(T, K.Ap + 1.6, K.Ap + 2.1) * 30} />
          </g>; })())}
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.Ap + 2.2, K.Ap + 2.7) }}>
          <FondoLunares color={KC.yellow} />
          {svg(<>
            <Tallo x={460} y={1240} alto={520} curva={-20} />
            <Hoja x={454} y={1060} rot={-55} s={0.85} /><Hoja x={466} y={900} rot={50} s={0.8} />
            <RosaFlor x={460} y={690} s={0.95} abre={kprog(T, K.Ap + 2.6, K.Ap + 3.4, kEase.sale)} T={T} />
            {/* brota un tallo lateral y también termina en flor */}
            {(() => { const c = kprog(T, K.Ap + 3.2, K.Ap + 4.2, kEase.sale); return c > 0 ? <g>
              <path d={`M 462 980 Q ${klerp(470, 640, c)} ${klerp(970, 900, c)} ${klerp(470, 700, c)} ${klerp(970, 820, c)}`} stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" />
              <path d={`M 462 980 Q ${klerp(470, 640, c)} ${klerp(970, 900, c)} ${klerp(470, 700, c)} ${klerp(970, 820, c)}`} stroke={TALLO} strokeWidth={12} fill="none" strokeLinecap="round" />
              <RosaFlor x={klerp(470, 708, c)} y={klerp(960, 790, c)} s={0.7 * c} abre={kprog(T, K.Ap + 4.0, K.Ap + 4.8, kEase.sale)} rot={15} />
            </g> : null; })()}
          </>)}
        </div>
      </Escena>
      {/* 9 · el estudio: 2012, seis pares de rosas */}
      <Escena T={T} a={K.E} b={K.Ch}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity={kprog(T, K.E + 0.5, K.E + 0.9)}>
            <text x={270} y={740} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>1 vez al año</text>
            <text x={810} y={740} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>cada temporada buena</text>
          </g>
          {Array.from({ length: 6 }, (_, i) => { const e = kprog(T, K.E + 0.7 + i * 0.32, K.E + 1.1 + i * 0.32), yy = 795 + i * 62;
            return <g key={i}>
              <GenMini x={110} y={yy} w={260} e={e} />{e > 0 && <g opacity={e}><RosaFlor x={420} y={yy} s={0.17} abre={1} /></g>}
              <GenMini x={650} y={yy} w={260} ins e={e} />{e > 0 && <g opacity={e}>{[0, 1, 2].map((k) => <RosaFlor key={k} x={950 + k * 36} y={yy} s={0.17} abre={1} />)}</g>}
              <text x={540} y={yy + 12} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink} opacity={e}>vs</text>
            </g>; })}
          {T > K.E + 3.4 && <g>{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={650 + 260 * 0.51} cy={795 + i * 62} r={30 + 6 * Math.sin(T * 6 + i)} fill="none" stroke={KC.red} strokeWidth={5} opacity={kprog(T, K.E + 3.4, K.E + 3.8)} />)}</g>}
        </>)}
      </Escena>
      {/* 10 · rosas de China; a fines del siglo XVIII se cruzan en Europa */}
      <Escena T={T} a={K.Ch} b={K.In}>
        <FondoLunares color={KC.lilac} />
        {svg((() => { const viaje = kprog(T, K.Ch + 0.3, K.Ch + 2.4, kEase.suave), cruce = kprog(T, K.Ch + 2.5, K.Ch + 3.0), mapa = 1 - kprog(T, K.Ch + 2.4, K.Ch + 2.9);
          return <>
            <g opacity={mapa}>
              <rect x={0} y={960} width={1080} height={300} fill="#5fb7ff" opacity=".7" />
              <path d="M -20 700 C 80 640 260 660 330 720 C 360 820 300 920 240 960 L -20 960 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
              <path d="M 1100 680 C 960 640 780 680 760 760 C 740 860 820 930 900 960 L 1100 960 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
              <text x={140} y={830} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>EUROPA</text>
              <text x={930} y={830} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>CHINA</text>
              <path d={`M 860 1040 Q 540 1200 220 1040`} stroke="#fff" strokeWidth={6} strokeDasharray="16 14" fill="none" opacity=".8" />
              <g transform={`translate(${klerp(860, 230, viaje)} ${1060 + Math.sin(viaje * Math.PI) * 120})`}>
                <Barco x={0} y={0} s={0.8} T={T} />
                <RosaFlor x={-50} y={-40} s={0.35} abre={1} color={CHINA} color2="#e88aa8" />
              </g>
            </g>
            {cruce > 0 && <g opacity={cruce}>
              <RosaTallo T={T} x={300} y={1090} alto={260} s={0.9} color={CHINA} />
              <text x={300} y={1150} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>de China</text>
              <text x={540} y={920} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>×</text>
              <RosaTallo T={T} x={780} y={1090} alto={260} s={0.9} color={GALICA} />
              <text x={780} y={1150} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>de Europa</text>
            </g>}
            {(() => { const h = kprog(T, K.Ch + 3.8, K.Ch + 4.6); return h > 0 ? <g>
              <path d="M 540 960 L 540 1040" stroke={KC.ink} strokeWidth={8} opacity={h} />
              <g transform={`translate(540 ${1500}) scale(${1.0 * h})`}>{[-90, 0, 90].map((dx, k) => <RosaFlor key={k} x={dx} y={k === 1 ? -40 : 0} s={0.8} abre={kprog(T, K.Ch + 4.2 + k * 0.3, K.Ch + 4.9 + k * 0.3)} color={'#ff5c8a'} />)}</g>
            </g> : null; })()}
          </>; })())}
      </Escena>
      {/* 11 · la rosa no cuenta las horas de luz: cortas un tallo y en 6–10 semanas hay otra flor */}
      <Escena T={T} a={K.In} b={K.Da}>
        <FondoLunares color={KC.mint} />
        {svg((() => { const corte = kprog(T, K.In + 2.0, K.In + 2.3), cae = kprog(T, K.In + 2.3, K.In + 3.1, (p) => p * p), nuevo = kprog(T, K.In + 2.8, K.In + 5.2, kEase.suave);
          return <>
            <Invernadero />
            <RosaTallo T={T} x={230} y={1230} alto={380} s={0.8} curva={-10} />
            <RosaTallo T={T} x={850} y={1230} alto={400} s={0.8} curva={12} />
            {/* rosal del centro: se corta el tallo de arriba */}
            <Tallo x={540} y={1230} alto={300} curva={8} espinas={2} />
            <Hoja x={534} y={1110} rot={-55} s={0.8} />
            <g transform={`translate(${cae * 120} ${cae * 600}) rotate(${cae * 70} 540 930)`} opacity={1 - cae}>
              <Tallo x={540} y={930} alto={230} curva={-6} espinas={2} /><Hoja x={546} y={830} rot={50} s={0.75} />
              <RosaFlor x={540} y={670} s={0.85} abre={1} T={T} />
            </g>
            {T < K.In + 2.6 && T > K.In + 1.4 && <Tijeras x={420} y={930} abre={1 - corte} s={0.9} />}
            {/* de la yema de abajo del corte brota un tallo nuevo con su botón */}
            {nuevo > 0 && <g>
              <path d={`M 546 1000 Q ${klerp(560, 640, nuevo)} ${klerp(990, 860, nuevo)} ${klerp(560, 620, nuevo)} ${klerp(990, 700, nuevo)}`} stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" />
              <path d={`M 546 1000 Q ${klerp(560, 640, nuevo)} ${klerp(990, 860, nuevo)} ${klerp(560, 620, nuevo)} ${klerp(990, 700, nuevo)}`} stroke={TALLO} strokeWidth={12} fill="none" strokeLinecap="round" />
              <Hoja x={600} y={870} rot={60} s={0.65} e={kclamp(nuevo * 2 - 0.6, 0, 1)} />
              <RosaFlor x={klerp(560, 620, nuevo)} y={klerp(970, 670, nuevo)} s={0.8 * nuevo} abre={kprog(T, K.In + 4.6, K.In + 5.6, kEase.sale)} T={T} />
            </g>}
            <Sol x={170} y={700} s={0.8} T={T} />
            {/* semanas */}
            <g transform="translate(90 1440)">
              {Array.from({ length: 10 }, (_, i) => { const on = nuevo * 10 > i; return <g key={i}>
                <rect x={i * 90 + 4} y={0} width={82} height={70} rx={12} fill={on ? (i >= 6 ? KC.gold2 : '#fff') : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={4} strokeDasharray={i >= 6 ? '10 6' : 'none'} />
                <text x={i * 90 + 45} y={50} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text></g>; })}
            </g>
          </>; })())}
      </Escena>
      {/* 12 · dato: casi 8 de cada 10 rosas de México, del Estado de México (SADER, preliminar 2025) */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.pink} />
        {svg((() => { const [ex, ey] = mxProy(-99.7, 19.3), p = kprog(T, K.Da + 0.6, K.Da + 1.2);
          return <>
            <MapaMexico x={40} y={690} ancho={1000} conCA={false}>
              <circle cx={ex} cy={ey} r={22 + 40 * p + 8 * Math.sin(T * 5)} fill={KC.red} opacity={0.35 * p} />
              <circle cx={ex} cy={ey} r={20 * p} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            </MapaMexico>
            {Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.Da + 1.6 + i * 0.2, K.Da + 1.9 + i * 0.2) * (i < 8 ? 1 : 0), e = kprog(T, K.Da + 1.2 + i * 0.05, K.Da + 1.5 + i * 0.05);
              return <g key={i} opacity={e} transform={`translate(${115 + i * 94} 1490)`}>
                <circle r={44} fill={on > 0 ? '#fff' : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={4} />
                <RosaFlor x={0} y={4} s={0.28} abre={1} color={on > 0 ? ROJO : '#b9a8ae'} color2={on > 0 ? ROJO2 : '#8d7f84'} />
              </g>; })}
          </>; })())}
      </Escena>
      {/* 13 · cierre: la misma rosa del inicio, ahora un ramo; por dentro, el gen con su pedazo extra */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Florero x={400} y={880} s={1.2} />
          {ramo(kprog(T, K.Ci + 0.2, K.Ci + 1.2, kEase.sale))}
          <RosaTallo T={T} x={400} y={940} alto={330} s={1.25} abre={1} />
          {(() => { const m = kprog(T, K.Ci + 1.5, K.Ci + 2.1, kEase.suave); return <HojaCalendario x={klerp(800, 915, m)} y={klerp(1590, 1680, m)} rot={6} s={klerp(0.95, 0.62, m)} />; })()}
        </>)}
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={820} y={900} r={160} fx={400} fy={760} tinte={KC.yellow} etiqueta="POR DENTRO · KSN"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={KC.noche} /><g transform={`translate(${r} ${r}) scale(.62) translate(-640 -950)`}><Gen T={Tl} y={950} hueco={1} inserto={{ x: KMID + LARGO_INS / 2, y: 950 }} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Te, titulo: 'La tradición' }, { at: K.Fr, titulo: 'El freno' }, { at: K.Sa, titulo: 'El freno roto' }, { at: K.In, titulo: 'Diciembre' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Te - 0.2} texto="Especial Virgen de Guadalupe" x={335} y={1470} tam={33} borde={KC.yellow} />
      <Etq T={T} at={K.Te + 0.3} until={K.Si - 0.3} x={70} y={540} texto="según la tradición" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Te + 1.0} until={K.Si - 0.3} x={480} y={720} texto="cerro del Tepeyac" tam={34} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Te + 2.0} until={K.Si - 0.3} texto="diciembre: rosas de Castilla" x={540} y={1500} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.Si + 0.3} until={K.Fr - 0.3} x={420} y={540} texto="rosa silvestre" tam={38} color={KC.ink} />
      <Etq T={T} at={K.Fr + 1.4} until={K.Ho - 0.3} x={680} y={640} texto="= freno" tam={40} color={KC.texto} />
      {((T > K.Fr - 0.3 && T < K.Ho - 0.1) || (T > K.Sa - 0.3 && T < K.Ap + 2.4)) && <Escala T={T} z={1} pxPorMm={4e7} x={60} y={1430} />}
      <Etq T={T} at={K.Ho + 0.4} until={K.Pr - 0.3} x={330} y={700} texto="hoja, hoja, hoja…" tam={34} color={KC.ink} lado="izq" />
      <MitoTachado T={T} at={K.Ho + 1.2} tacharEn={K.Ho + 2.0} until={K.Pr - 0.3} texto="¿flor?" x={760} y={800} tam={50} />
      <Chip T={T} at={K.Pr + 2.4} until={K.P - 0.2} texto="una vez al año" x={540} y={1500} tam={46} borde={SILV} />
      <Etq T={T} at={K.Sa + 2.2} until={K.Ap - 0.3} x={90} y={560} texto="retrotransposón (ADN saltarín)" tam={34} color={INSERTO} />
      <Chip T={T} at={K.Sa + 2.4} until={K.Ap - 0.3} texto="se metió dentro del gen" x={540} y={1560} tam={42} borde={INSERTO} />
      <Etq T={T} at={K.Ap + 0.4} until={K.Ap + 2.1} x={90} y={1110} texto="la copia del gen se atora" tam={32} color={KC.orange} />
      <Chip T={T} at={K.Ap + 3.4} until={K.E - 0.3} texto="flor en cada temporada buena" x={540} y={1500} tam={42} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="2012" quien="Iwata et al. · Francia y Japón" revista="The Plant Journal" x={540} y={510} />
      <Chip T={T} at={K.E + 3.6} until={K.Ch - 0.3} texto="las de cada temporada traen el pedazo" x={540} y={1500} tam={40} borde={INSERTO} />
      <Chip T={T} at={K.Ch + 2.6} until={K.In - 0.3} texto="fines del siglo XVIII: cruces en Europa" x={540} y={560} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Ch + 4.6} until={K.In - 0.3} x={640} y={1460} texto="rosas modernas" tam={34} color={KC.ink} />
      <MitoTachado T={T} at={K.In + 0.3} tacharEn={K.In + 1.2} until={K.In + 3.0} texto="horas de luz" x={430} y={480} tam={46} />
      <Etq T={T} at={K.In + 3.0} until={K.Da - 0.3} x={60} y={560} texto="brota de la yema" tam={34} color={KC.ink} />
      <Chip T={T} at={K.In + 3.6} until={K.Da - 0.3} texto="6 a 10 semanas" x={540} y={1610} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.Da + 1.0} until={K.Ci - 0.3} x={520} y={1060} texto="Estado de México" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Da + 3.4} until={K.Ci - 0.3} texto="78.7 % · SADER, preliminar 2025" x={540} y={1620} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Ci + 2.2} until={K.Ou} texto="KSN apagado: flor en cada temporada buena" x={445} y={1450} tam={30} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Te - 0.1} texto="No sabe que es diciembre: *trae un freno roto.*" />
      <Subtitulo T={T} idx={1} at={K.Te + 0.1} until={K.Si - 0.1} texto="Según la tradición: *rosas en diciembre.*" />
      <Subtitulo T={T} idx={2} at={K.Si + 0.1} until={K.Fr - 0.1} texto="La silvestre florece *solo en primavera.*" />
      <Subtitulo T={T} idx={3} at={K.Fr + 0.1} until={K.Ho - 0.1} texto="El gen KSN: *un freno de la floración.*" />
      <Subtitulo T={T} idx={4} at={K.Ho + 0.1} until={K.Pr - 0.1} texto="Con el freno puesto: *hojas, no flor.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.P - 0.1} texto="En primavera se afloja: *su única floración.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Sa - 0.1} texto="¿Y si el freno *se rompe?*" />
      <Subtitulo T={T} idx={7} at={K.Sa + 0.1} until={K.Ap - 0.1} texto="Un pedazo de *ADN saltarín* se metió al gen." />
      <Subtitulo T={T} idx={8} at={K.Ap + 0.1} until={K.E - 0.1} texto="Sin freno: *flor en cada temporada buena.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Ch - 0.1} texto="2012: seis pares de rosas, *el mismo pedazo.*" />
      <Subtitulo T={T} idx={10} at={K.Ch + 0.1} until={K.In - 0.1} texto="Rosas de China, *cruzadas en Europa.*" />
      <Subtitulo T={T} idx={11} at={K.In + 0.1} until={K.Da - 0.1} texto="Cortas un tallo: *otra flor en 6 a 10 semanas.*" />
      <Subtitulo T={T} idx={12} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Casi *8 de cada 10* rosas: Estado de México." />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Su freno se rompió *hace siglos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Silvestre + 0.3, CUES.Freno - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Hojas + 0.4, CUES.Primavera - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Saltarin + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Apagado + 2.6, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.China - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Invernadero + 0.4, CUES.Dato - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 0.4, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RosasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Rosas /></CompositionStage></div>;
}
window.RosasApp = RosasApp;
