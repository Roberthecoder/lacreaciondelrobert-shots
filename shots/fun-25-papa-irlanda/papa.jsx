// Shot Fungi Mati #25 · Ese hongo de la papa no es un hongo: Phytophthora infestans — NARRADO (N1 Por dentro, gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PI_C = { papa:'#c99a5b', papa2:'#a87a40', podrido:'#5a3424', hoja:'#4caf50', hoja2:'#2e7d32', enves:'#8fcf8a', mancha:'#6b4226', halo:'#d8e27a',
  jito:'#e8342a', jito2:'#b8231c', vidrio:'rgba(215,240,255,.28)', vidrioB:'#cfeaff', zoo:'#f3e6c4', alga:'#8a6a2a', alga2:'#b58d3c', diato:'#e0b84a' };

/* ---------- cocina ---------- */
function Tabla({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-420} y={-40} width={840} height={150} rx={40} fill="#d9a066" stroke={KC.ink} strokeWidth={8} />
    {[-300, -120, 60, 240].map((dx, i) => <path key={i} d={`M ${dx} -10 Q ${dx + 60} 30 ${dx + 130} 0`} stroke="#b97d45" strokeWidth={5} fill="none" />)}
    <circle cx={360} cy={35} r={18} fill="#b97d45" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Papa (tubérculo) con ojos; mancha 0..1 = pudrición café rojiza del tizón.
function Papa({ x, y, s = 1, rot = 0, mancha = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 -10 Q -160 -95 -60 -105 Q 40 -125 120 -85 Q 175 -50 160 20 Q 150 95 40 100 Q -60 112 -125 70 Q -148 45 -150 -10 Z" fill={PI_C.papa} stroke={KC.ink} strokeWidth={8} />
    <path d="M -95 -70 Q -40 -92 30 -88" stroke="#e2bb80" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[[-90, 10], [-20, -40], [60, 20], [110, -40], [10, 60]].map(([a, b], i) => <path key={i} d={`M ${a - 9} ${b} Q ${a} ${b - 7} ${a + 9} ${b}`} stroke={PI_C.papa2} strokeWidth={5} fill="none" />)}
    {mancha > 0 && <path d="M 20 -60 Q 90 -80 125 -30 Q 150 20 105 60 Q 60 85 30 40 Q -5 0 20 -60 Z" fill={PI_C.podrido} stroke={KC.ink} strokeWidth={4} opacity={0.85} transform={`translate(80 -10) scale(${mancha}) translate(-80 10)`} />}
  </g>;
}
// Jitomate con cáliz verde; mancha 0..1 = mancha café grasosa.
function Jitomate({ x, y, s = 1, rot = 0, mancha = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={120} ry={105} fill={PI_C.jito} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-50} cy={-45} rx={30} ry={18} fill="#ff8a7a" transform="rotate(-30 -50 -45)" />
    {mancha > 0 && <path d="M -20 10 Q 40 -20 80 20 Q 95 70 40 85 Q -20 90 -35 55 Q -45 25 -20 10 Z" fill="#7a3b1c" stroke={KC.ink} strokeWidth={4} opacity={0.9} transform={`translate(30 50) scale(${mancha}) translate(-30 -50)`} />}
    {[0, 72, 144, 216, 288].map((a) => <path key={a} d="M 0 -100 Q 14 -128 0 -150 Q -10 -128 0 -100 Z" transform={`rotate(${a} 0 -100)`} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-6} y={-130} width={12} height={30} rx={5} fill={PI_C.hoja2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Hoja compuesta de papa (foliolos en pares + terminal). giro 0..1: se voltea y deja ver el envés con la pelusa blanca.
function HojaPapa({ T, x, y, s = 1, giro = 0, manchas = 1, pelusa = 0 }) {
  const sx = Math.cos(Math.PI * giro), enves = giro > 0.5;
  const FOL = [[0, -560, 0, 1.25], [-120, -420, -55, 1], [120, -420, 55, 1], [-130, -250, -60, 1.05], [130, -250, 60, 1.05], [-70, -335, -40, 0.42], [70, -335, 40, 0.42], [-110, -90, -70, 0.85], [110, -90, 70, 0.85]];
  const SP = [[-130, -250, 1], [120, -420, 0.8], [0, -560, 0.7]];
  return <g transform={`translate(${x} ${y}) scale(${s * Math.max(0.04, Math.abs(sx))} ${s}) rotate(${mece(T, 3) * 2})`}>
    <path d="M 0 60 L 0 -540" stroke={PI_C.hoja2} strokeWidth={16} strokeLinecap="round" />
    {FOL.map(([fx, fy, a, k], i) => <g key={i} transform={`translate(${fx * 0.55} ${fy}) rotate(${a}) scale(${k})`}>
      <path d="M 0 0 Q 70 -40 0 -150 Q -70 -40 0 0 Z" transform="translate(0 12)" fill={enves ? PI_C.enves : PI_C.hoja} stroke={KC.ink} strokeWidth={6 / k} />
      <path d="M 0 8 L 0 -120" stroke={enves ? '#5f9f5a' : PI_C.hoja2} strokeWidth={4 / k} />
    </g>)}
    {manchas > 0 && SP.map(([fx, fy, k], i) => <g key={i} transform={`translate(${fx * 0.55 + (fx < 0 ? -30 : fx > 0 ? 30 : 0)} ${fy - 60}) scale(${k * manchas})`}>
      <circle r={62} fill={PI_C.halo} opacity={0.75} />
      <path d="M -40 -20 Q -20 -50 20 -40 Q 50 -20 42 18 Q 30 48 -8 44 Q -48 34 -40 -20 Z" fill={PI_C.mancha} stroke={KC.ink} strokeWidth={4} />
      {enves && pelusa > 0 && Array.from({ length: 22 }, (_, j) => { const an = j / 22 * Math.PI * 2, r = 50 + (j % 3) * 7; return <path key={j} d={`M ${Math.cos(an) * r} ${Math.sin(an) * r} l ${Math.cos(an) * 14 * pelusa} ${Math.sin(an) * 14 * pelusa - 6}`} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={pelusa} />; })}
      {enves && pelusa > 0 && <circle r={54} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="3 9" opacity={pelusa * 0.9} />}
    </g>)}
  </g>;
}

/* ---------- microscopio ---------- */
// Esporangio en forma de limón: papila arriba, pedicelo abajo. (x, y) = centro; h = largo en px.
function Limon({ x, y, h = 120, rot = 0, s = 1, abre = 0 }) {
  if (s <= 0) return null;
  const w = h * 0.64;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 ${-h / 2 - h * 0.09} Q ${w * 0.22} ${-h / 2} ${w / 2} ${-h * 0.08} Q ${w / 2} ${h * 0.33} 0 ${h / 2} Q ${-w / 2} ${h * 0.33} ${-w / 2} ${-h * 0.08} Q ${-w * 0.22} ${-h / 2} 0 ${-h / 2 - h * 0.09} Z`}
      fill={PI_C.vidrio} stroke={PI_C.vidrioB} strokeWidth={Math.max(3, h * 0.035)} />
    {abre > 0 && <circle cx={0} cy={-h / 2 - h * 0.06} r={h * 0.1 * abre} fill={KC.noche} stroke={PI_C.vidrioB} strokeWidth={3} />}
    {abre < 0.5 && [[-0.12, -0.1], [0.12, 0.02], [-0.05, 0.16], [0.1, -0.22], [-0.16, 0.08]].map(([a, b], i) => <circle key={i} cx={a * h} cy={b * h} r={h * 0.05} fill="#f6e7b0" opacity={0.75} />)}
    <path d={`M 0 ${h / 2} L 0 ${h / 2 + h * 0.08}`} stroke={PI_C.vidrioB} strokeWidth={Math.max(3, h * 0.04)} strokeLinecap="round" />
  </g>;
}
// Esporangióforo ramificado que sale del envés; hinchazones donde hubo esporangios. g 0..1 = crecimiento.
function Esporangioforo({ x, y, s = 1, g = 1, T = 0 }) {
  const RAM = [['M 0 0 L 0 -540', 0], ['M 0 -210 Q -60 -260 -130 -330', 0.35], ['M 0 -340 Q 60 -390 120 -460', 0.55], ['M 0 -120 Q 50 -160 95 -230', 0.2]];
  const PUNTAS = [[0, -600, 0, 0.75], [-150, -385, -35, 0.6], [140, -515, 35, 0.8], [110, -285, 30, 0.45]];
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8) * 1.5})`}>
    {RAM.map(([d, a], i) => { const p = kclamp((g - a) / 0.4, 0, 1); return p > 0 && <path key={i} d={d} stroke={PI_C.vidrioB} strokeWidth={13} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />; })}
    {[[0, -210], [0, -340], [0, -120]].map(([a, b], i) => g > 0.3 + i * 0.1 && <ellipse key={i} cx={a} cy={b} rx={14} ry={10} fill={PI_C.vidrioB} />)}
    {PUNTAS.map(([px, py, r, a], i) => <Limon key={i} x={px} y={py} rot={r} h={115} s={kclamp((g - a) / 0.2, 0, 1)} />)}
  </g>;
}
// Zoospora en forma de frijol con dos flagelos que salen del costado: uno con pelitos y uno liso (no se indica cuál va adelante).
function Zoospora({ T, x, y, s = 1, rot = 0, enquista = 0, seed = 1 }) {
  const fl = 1 - enquista, ond = (k) => Math.sin(T * 9 + seed + k) * 14;
  const flag = (dir) => `M 0 6 C ${dir * 50} ${20 + ond(0)} ${dir * 95} ${-10 + ond(1)} ${dir * 150 * fl} ${12 + ond(2) * fl}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {fl > 0.05 && <>
      <path d={flag(-1)} stroke="#ffffff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={fl} />
      <path d={flag(1)} stroke="#ffffff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={fl} />
      {Array.from({ length: 7 }, (_, i) => { const u = (i + 1) / 8; const px = -150 * fl * u, py = 6 + (20 + ond(0)) * 3 * u * (1 - u) * (1 - u) + (-10 + ond(1)) * 3 * u * u * (1 - u) + (12 + ond(2) * fl) * u * u * u;
        return <path key={i} d={`M ${px} ${py - 10} L ${px} ${py + 10}`} stroke="#ffffff" strokeWidth={3} opacity={fl} />; })}
    </>}
    <path d={enquista > 0.5 ? 'M -34 0 A 34 34 0 1 0 34 0 A 34 34 0 1 0 -34 0 Z' : 'M -46 -6 Q -44 -40 0 -38 Q 44 -40 46 -6 Q 44 28 12 26 Q 0 12 -12 26 Q -44 28 -46 -6 Z'} fill={PI_C.zoo} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={-12} r={11} fill="#c9a24a" />
  </g>;
}
// Corte de la hoja: epidermis con un estoma, células de abajo. tubo 0..1 = el tubo germinal entra por el estoma.
function CorteHoja({ T, y = 880, tubo = 0, hifas = 0 }) {
  return <g>
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={i * 160 - 40} y={y} width={150} height={80} rx={20} fill="#9bd48e" stroke={KC.ink} strokeWidth={5} opacity={i === 3 ? 0 : 1} />)}
    <path d={`M 452 ${y} Q 480 ${y + 40} 452 ${y + 80} Q 500 ${y + 82} 532 ${y + 40} Q 500 ${y - 2} 452 ${y} Z`} fill="#6fbf62" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 628 ${y} Q 600 ${y + 40} 628 ${y + 80} Q 580 ${y + 82} 548 ${y + 40} Q 580 ${y - 2} 628 ${y} Z`} fill="#6fbf62" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={(i % 6) * 190 + 40 + (Math.floor(i / 6) % 2) * 90} cy={y + 190 + Math.floor(i / 6) * 150} rx={80} ry={60} fill="#7ec46f" stroke={KC.ink} strokeWidth={5} />)}
    {tubo > 0 && <path d={`M 540 ${y - 40} L 540 ${y + 60} Q 545 ${y + 120} 600 ${y + 140}`} stroke={PI_C.zoo} strokeWidth={16} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${tubo} 1`} />}
    {hifas > 0 && ['M 600 1020 Q 700 1080 820 1050 Q 930 1020 1100 1090', 'M 600 1020 Q 520 1110 380 1100 Q 240 1090 120 1160', 'M 700 1070 Q 760 1150 720 1260'].map((d, i) =>
      <g key={i}><path d={d} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${kclamp(hifas * 1.2 - i * 0.15, 0, 1)} 1`} />
        <path d={d} stroke={PI_C.zoo} strokeWidth={14} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${kclamp(hifas * 1.2 - i * 0.15, 0, 1)} 1`} /></g>)}
  </g>;
}

/* ---------- parientes ---------- */
function AlgaParda({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 0 Q 0 -20 30 0 Z" fill={PI_C.alga} stroke={KC.ink} strokeWidth={5} />
    <path d={`M 0 -8 Q ${8 + mece(T, 2) * 10} -90 0 -170`} stroke={PI_C.alga} strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-1, 1].map((d) => [0, 1, 2].map((k) => <path key={d + '' + k} d={`M 0 ${-60 - k * 45} Q ${d * 70} ${-90 - k * 45 + mece(T, k + 4) * 10} ${d * 110} ${-140 - k * 45}`} stroke={PI_C.alga2} strokeWidth={22} fill="none" strokeLinecap="round" />))}
    <path d="M 0 -160 Q 20 -220 0 -260 Q -20 -220 0 -160 Z" fill={PI_C.alga2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Diatomea({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-90} y={-46} width={180} height={92} rx={46} fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-38} width={160} height={76} rx={38} fill="none" stroke="#9fc7e0" strokeWidth={4} />
    <ellipse rx={50} ry={22} fill={PI_C.diato} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-64 + i * 16} y1={-40} x2={-64 + i * 16} y2={-30} stroke="#6f9fbf" strokeWidth={3} />)}
    {Array.from({ length: 9 }, (_, i) => <line key={'b' + i} x1={-64 + i * 16} y1={30} x2={-64 + i * 16} y2={40} stroke="#6f9fbf" strokeWidth={3} />)}
  </g>;
}

/* ---------- mapas ---------- */
const PMX_CONT = [[-117.1,32.5],[-115,32.7],[-114.8,32.5],[-111,31.3],[-108.2,31.3],[-108.2,31.8],[-106.5,31.8],[-104.5,29.6],[-103,29],[-102.4,29.8],[-101,29.4],[-99.5,27.5],[-99.1,26.4],[-97.5,25.9],[-97.7,24],[-97.8,22.3],[-97.2,20.6],[-96.1,19.2],[-94.5,18.2],[-92.6,18.6],[-91.8,18.6],[-90.7,19.6],[-90.4,21],[-89.6,21.3],[-87,21.5],[-86.8,20.6],[-87.5,19],[-88.3,18.5],[-89.1,17.95],[-91,17.8],[-91,17.25],[-91.4,17.25],[-90.4,16.1],[-91.7,16.1],[-92.2,15.3],[-92.2,14.5],[-93.9,16],[-94.8,16.2],[-96.5,15.7],[-98.5,16.3],[-99.9,16.85],[-101.5,17.6],[-103.5,18.3],[-104.3,19.1],[-105.3,20.4],[-105.7,22],[-106.4,23.2],[-107.4,24.5],[-108.9,25.6],[-109.4,26.6],[-110.6,27.9],[-112.2,29],[-113.1,30.8],[-114.8,31.8],[-114.8,32.5]];
const PMX_BAJA = [[-117.1,32.5],[-116.6,31.7],[-116,30.4],[-115,29.5],[-114.2,28],[-114.1,27.6],[-112.1,24.8],[-111.6,24.3],[-110,22.9],[-109.4,23.2],[-110.3,24.2],[-111.4,25.8],[-112.4,27.2],[-112.9,28.5],[-114.6,30.2],[-114.8,31.6],[-114.8,32.5]];
const PCA_CONT = [[-88.3,18.5],[-89.1,17.95],[-91,17.8],[-91,17.25],[-91.4,17.25],[-90.4,16.1],[-91.7,16.1],[-92.2,15.3],[-92.2,14.5],[-91.4,13.9],[-89.5,13.4],[-87.8,13.2],[-86.8,12.2],[-85.7,11],[-85.8,10],[-84.8,9.6],[-83.6,8.5],[-82.9,8.2],[-81.5,7.7],[-80.4,7.3],[-80,7.6],[-79.6,8.9],[-78.4,8.3],[-77.4,7.6],[-77.2,8.6],[-77.9,9.2],[-79,9.6],[-79.9,9.4],[-81.2,8.8],[-82.6,9.5],[-83.6,10.9],[-83.7,11.9],[-83.4,14],[-83.2,15],[-84.5,15.9],[-86,16],[-87.6,15.8],[-88.6,15.9],[-88.3,16.5],[-88.3,18.5]];
const AM_K = 7.4, AM_X0 = 150, AM_Y0 = 520;
const amProy = (lon, lat) => [AM_X0 + (lon + 118) * AM_K, AM_Y0 + (33 - lat) * AM_K];
const SA_CONT = [[-77.2,8.6],[-75,10.8],[-72,11.8],[-71,12.4],[-68,10.6],[-64,10.6],[-61,10.5],[-60,8.5],[-57,6],[-53,5.5],[-51,4],[-50,1.5],[-48,-1],[-44,-2.5],[-40,-3],[-35,-5.5],[-35,-9],[-37,-12],[-39,-15],[-39.5,-19],[-41,-22],[-44,-23],[-48,-26],[-49,-29],[-51,-31.5],[-53,-34],[-56,-34.8],[-57.5,-36.5],[-57.5,-38.5],[-62,-39],[-62.5,-41],[-65,-42.5],[-64.5,-45],[-67.5,-46.5],[-66,-48],[-68.5,-50.5],[-68.5,-52.3],[-69,-55],[-71,-54.5],[-74,-52],[-75.5,-48],[-73.5,-43],[-73.5,-38],[-71.5,-33],[-71.5,-28],[-70.3,-18.5],[-75,-15.5],[-77,-12],[-79.5,-7.5],[-81.2,-5.5],[-80.3,-3.5],[-80,-1],[-80,1],[-78.8,1.5],[-77.5,4],[-77.4,7.6]];
const amPath = (pts) => 'M ' + pts.map(([a, b]) => amProy(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
// Andes: línea de montañas (esquemática) sobre la costa del Pacífico.
const ANDES = [[-73.5,8],[-76.5,3],[-78.3,-1],[-79,-5],[-76.5,-10],[-73,-14],[-69.5,-18],[-68.5,-24],[-69.8,-30],[-70.2,-36]];
function MapaAmerica({ T, brilloMx = 0, brilloAn = 0, andes = 1 }) {
  return <g>
    <path d={amPath(PMX_CONT)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={amPath(PMX_BAJA)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={amPath(PCA_CONT)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={amPath(SA_CONT)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {andes > 0 && ANDES.map(([a, b], i) => { const [px, py] = amProy(a, b); return <path key={i} d={`M ${px - 16} ${py + 12} L ${px} ${py - 14} L ${px + 16} ${py + 12} Z`} fill="#b08a5a" stroke={KC.ink} strokeWidth={3} opacity={andes} />; })}
    {brilloMx > 0 && (() => { const [px, py] = amProy(-99.2, 19.3); return <circle cx={px} cy={py} r={40 + 14 * Math.sin(T * 5)} fill={KC.gold2} opacity={0.45 * brilloMx} />; })()}
    {brilloAn > 0 && (() => { const [px, py] = amProy(-76, -9); return <circle cx={px} cy={py} r={60 + 16 * Math.sin(T * 5 + 1)} fill={KC.gold2} opacity={0.45 * brilloAn} />; })()}
  </g>;
}
const IR = [[-6.0,55.2],[-7.3,55.4],[-8.3,55.2],[-8.6,54.6],[-10.0,54.2],[-9.9,53.4],[-9.4,53.1],[-9.9,52.6],[-10.3,52.1],[-9.8,51.6],[-8.5,51.6],[-7.6,51.95],[-6.4,52.2],[-6.0,53.0],[-6.2,53.9],[-5.6,54.5]];
const irProy = (lon, lat) => [470 + (lon + 8) * 118 * 0.6, 520 + (55.6 - lat) * 118];
function MapaIrlanda({ T, cafe = 0 }) {
  const d = 'M ' + IR.map(([a, b]) => irProy(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const PTS = Array.from({ length: 26 }, (_, i) => { const r = krng(40 + i); return [-9.6 + r() * 3.6, 51.9 + r() * 3.0, r()]; }).filter(([a, b]) => !(a > -6.6 && b > 54.6));
  return <g>
    <path d={d} fill="#7ccf6a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {PTS.map(([a, b, r], i) => { const [px, py] = irProy(a, b); const c = kclamp(cafe * 1.6 - r * 0.6, 0, 1); return <g key={i} transform={`translate(${px} ${py})`}>
      <path d="M 0 0 L 0 -26 M 0 -12 L -12 -24 M 0 -16 L 12 -28" stroke={mixHex('#2e7d32', '#3a2416', c)} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={-30} rx={10} ry={8} fill={mixHex('#4caf50', '#4a2c1a', c)} /></g>; })}
  </g>;
}
function Barco({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 3 + x) * 6}) scale(${s})`}>
    <path d="M -70 0 L 70 0 L 50 34 L -50 34 Z" fill="#6b4a2b" stroke={KC.ink} strokeWidth={5} />
    <line x1={0} y1={0} x2={0} y2={-100} stroke={KC.ink} strokeWidth={6} />
    <path d="M 4 -96 L 60 -20 L 4 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <path d="M -4 -86 L -50 -20 L -4 -20 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

/* ---------- herbario y ADN ---------- */
function HojaHerbario({ x, y, rot = 0, anio, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-200} width={300} height={400} fill="#f6efd8" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 150 L 0 -140" stroke="#6b5a2a" strokeWidth={8} />
    {[[-1, -100], [1, -100], [-1, -20], [1, -20], [-1, 60], [1, 60]].map(([d, b], i) => <path key={i} d={`M 0 ${b} Q ${d * 70} ${b - 30} ${d * 90} ${b - 70} Q ${d * 30} ${b - 50} 0 ${b} Z`} fill="#9a9a52" stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={-50} cy={-40} r={14} fill="#4a3220" /><circle cx={45} cy={-110} r={11} fill="#4a3220" />
    <rect x={20} y={140} width={120} height={50} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={80} y={176} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{anio}</text>
  </g>;
}
function ADN({ T, x, y, alto = 420, p = 1 }) {
  const n = 16, h = alto * p;
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }, (_, i) => { const yy = -i * alto / n; if (-yy > h) return null; const f = T * 2.5 + i * 0.6; const a = Math.sin(f) * 60;
      return <g key={i}><line x1={a} y1={yy} x2={-a} y2={yy} stroke={i % 2 ? KC.pink : KC.cyan} strokeWidth={8} />
        <circle cx={a} cy={yy} r={10} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} /><circle cx={-a} cy={yy} r={10} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} /></g>; })}
  </g>;
}
// Pared celular comparada (tarjeta HTML).
function TarjetaPared({ T, at, until, x, y, titulo, it = false, filas, borde }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, width:440, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:KC.paper, border:`6px solid ${borde}`, borderRadius:26, padding:'18px 22px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
    <div style={{ font:`900 40px ${KF.texto}`, fontStyle: it ? 'italic' : 'normal', color:KC.ink, textAlign:'center', marginBottom:10 }}>{titulo}</div>
    {filas.map(([t, ok], i) => <div key={i} style={{ font:`700 32px ${KF.mono}`, color: ok ? '#1d7a3a' : '#a3281f', margin:'6px 0', opacity:kprog(T, at + 0.4 + i * 0.4, at + 0.7 + i * 0.4) }}>{ok ? '✓ ' : '✗ '}{t}</div>)}
  </div>;
}
// Tarjeta de estudio chica (para dos estudios a la vez).
function MiniEstudio({ T, at, until, x, y, anio, quien, color = KC.gold }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-2deg)`, opacity:e.o, background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:20, padding:'8px 22px 12px', textAlign:'center', boxShadow:`8px 8px 0 ${KC.ink}` }}>
    <div style={{ font:`400 64px/1 ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}` }}>{anio}</div>
    <div style={{ font:`900 28px ${KF.texto}`, color:KC.ink, marginTop:4, whiteSpace:'nowrap' }}>{quien}</div>
  </div>;
}

// Sello rectangular con texto largo (OOMICETO), cae con golpe.
function SelloLargo({ T, at, x, y, texto, color = KC.red, rot = -10 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), w = texto.length * 46 + 70;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-70} width={w} height={140} rx={22} fill="rgba(255,255,255,.6)" stroke={color} strokeWidth={14} />
    <rect x={-w / 2 + 14} y={-56} width={w - 28} height={112} rx={14} fill="none" stroke={color} strokeWidth={4} />
    <text y={32} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}

function PapaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hoja, L: CUES.Limones, N: CUES.Nadadores, E: CUES.Entrada, Pa: CUES.Pared, P: CUES.Pregunta, Pr: CUES.Parientes, I: CUES.Irlanda, He: CUES.Herbario, H1: CUES.Herb1, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const ZOOS = Array.from({ length: 10 }, (_, i) => { const r = krng(70 + i); return { ang: -Math.PI + (i + 0.5) / 10 * Math.PI * 1.25 - 0.15, v: 300 + r() * 90, rot: r() * 360, d: i * 0.12 }; });
  const salen = (i, t0) => kprog(T, t0 + ZOOS[i].d, t0 + ZOOS[i].d + 1.6, kEase.sale);
  const [mxX, mxY] = amProy(-99.66, 19.29), [tlX, tlY] = amProy(-98.2, 19.3), [anX, anY] = amProy(-76, -9);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la papa y el jitomate en la cocina; el "hongo" no es hongo */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={460} y={960} />
          <Papa x={330} y={880} s={1.15} rot={-6} mancha={kprog(T, K.G + 0.1, K.G + 1.2, kEase.sale)} />
          <Jitomate x={klerp(1250, 720, kprog(T, K.G + 3.4, K.G + 4.2, kEase.sale))} y={855} s={0.95} rot={klerp(200, 0, kprog(T, K.G + 3.4, K.G + 4.2, kEase.sale))} mancha={kprog(T, K.G + 4.1, K.G + 4.8)} />
          <Sello T={T} at={K.G + 1.4} x={300} y={520} texto="HONGO" color={KC.ink} r={130} />
          {T > K.G + 2.5 && <path d="M 200 420 L 400 620 M 400 420 L 200 620" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={kprog(T, K.G + 2.5, K.G + 2.8)} />}
        </>)}
      </Escena>
      {/* 1 · la hoja se voltea: manchas cafés y pelusa blanca en el envés */}
      <Escena T={T} a={K.H} b={K.L} zoom={0.08} origen="40% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<HojaPapa T={T} x={470} y={1170} s={0.85} giro={kprog(T, K.H + 1.4, K.H + 2.3, kEase.suave)} manchas={kprog(T, K.H, K.H + 0.8, kEase.sale)} pelusa={kprog(T, K.H + 2.3, K.H + 3.2)} />)}
      </Escena>
      {/* 2 · al microscopio: esporangióforos con esporangios en forma de limón */}
      <Escena T={T} a={K.L} b={K.N} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <rect x={-20} y={1150} width={1120} height={120} fill="#2f5a3a" stroke={KC.ink} strokeWidth={6} />
          <Esporangioforo x={330} y={1160} s={1.15} g={kprog(T, K.L - 0.3, K.L + 1.6)} T={T} />
          <Esporangioforo x={760} y={1160} s={0.95} g={kprog(T, K.L + 0.2, K.L + 2.1)} T={T + 2} />
        </>)}
      </Escena>
      {/* 3 · un limón se abre y salen 8–12 nadadores con dos colas */}
      <Escena T={T} a={K.N} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#0f2236' }}></div>
        <Ambiente T={T} n={30} color="rgba(150,210,255,.35)" />
        {fsvg(<>
          <circle cx={540} cy={860} r={420} fill="rgba(120,190,255,.10)" stroke="rgba(160,215,255,.5)" strokeWidth={6} />
          <Limon x={540} y={880} h={460} abre={kprog(T, K.N + 1.0, K.N + 1.4)} />
          {T > K.N + 1.3 && ZOOS.map((z, i) => { const u = salen(i, K.N + 1.3); return <Zoospora key={i} T={T} seed={i} s={1.1 * Math.min(1, 0.4 + u)} rot={z.rot + T * 20}
            x={540 + Math.cos(z.ang + T * 0.15) * z.v * u * 1.25} y={760 + Math.sin(z.ang + T * 0.15) * z.v * u * 0.85} />; })}
          {T < K.N + 1.3 && <Zoospora T={T} x={540} y={880} s={0} />}
          <g transform="translate(110 700)"><rect x={-22} y={-110} width={44} height={200} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-10} y={klerp(40, -10, 0)} width={20} height={50} fill={KC.cyan} /><circle cx={0} cy={110} r={36} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} /></g>
        </>)}
      </Escena>
      {/* 4 · se enquistan y entran por un estoma; una mancha: hasta 300 000 esporangios */}
      <Escena T={T} a={K.E} b={K.Pa} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <CorteHoja T={T} y={880} tubo={kprog(T, K.E + 0.9, K.E + 2.0)} />
          <g opacity={1 - kprog(T, K.E + 1.9, K.E + 2.3)}><Zoospora T={T} x={klerp(260, 540, kprog(T, K.E, K.E + 0.8, kEase.sale))} y={klerp(560, 830, kprog(T, K.E, K.E + 0.8, kEase.sale))} enquista={kprog(T, K.E + 0.6, K.E + 0.9)} s={1.3} /></g>
          {T > K.E + 1.9 && <rect x={0} y={0} width={KW} height={KH} fill={KC.noche} opacity={0.85 * kprog(T, K.E + 1.9, K.E + 2.3)} />}
          {T > K.E + 2.1 && Array.from({ length: 60 }, (_, i) => { const r = krng(200 + i); const px = 60 + r() * 960, py = 760 + r() * 440; const u = kprog(T, K.E + 2.1 + r() * 1.4, K.E + 2.4 + r() * 1.4, kEase.rebote);
            return <Limon key={i} x={px} y={py} h={64} rot={(r() - 0.5) * 60} s={u} />; })}
        </>)}
      </Escena>
      {/* 5 · crece en hilos entre las células; su pared casi no tiene quitina: tiene celulosa */}
      <Escena T={T} a={K.Pa} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<g opacity={1 - 0.55 * kprog(T, K.Pa + 1.6, K.Pa + 2.2)}><CorteHoja T={T} y={880} tubo={1} hifas={kprog(T, K.Pa, K.Pa + 1.8)} /></g>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={300} y={1080} /><Zoospora T={T} x={170} y={620} s={1.2} rot={-15} /></>)}
      </Escena>
      {/* 7 · árbol de parientes: algas pardas, diatomeas, moho de agua | hongos lejos */}
      <Escena T={T} a={K.Pr} b={K.I} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const g = kprog(T, K.Pr, K.Pr + 1.4, kEase.sale); const L = (d, k) => <path d={d} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${kclamp(g * 1.5 - k * 0.25, 0, 1)} 1`} />;
            return <>{L('M 540 1180 L 540 1080', 0)}{L('M 540 1080 L 330 980', 0.4)}{L('M 540 1080 L 870 820', 0.4)}{L('M 330 980 L 150 880', 1)}{L('M 330 980 L 330 860', 1)}{L('M 330 980 L 510 880', 1)}</>; })()}
          {T > K.Pr + 0.8 && <AlgaParda T={T} x={150} y={870} s={kprog(T, K.Pr + 0.8, K.Pr + 1.3, kEase.rebote) * 0.7} />}
          {T > K.Pr + 1.1 && <Diatomea x={330} y={790} s={kprog(T, K.Pr + 1.1, K.Pr + 1.6, kEase.rebote) * 0.8} rot={-10} />}
          {T > K.Pr + 1.4 && <Zoospora T={T} x={520} y={820} s={kprog(T, K.Pr + 1.4, K.Pr + 1.9, kEase.rebote) * 1.1} />}
          {T > K.Pr + 2.2 && <Seta x={870} y={800} s={kprog(T, K.Pr + 2.2, K.Pr + 2.7, kEase.rebote) * 0.9} sombrero={KC.red} />}
          <rect x={40} y={650} width={600} height={275} rx={40} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="18 14" opacity={kprog(T, K.Pr + 2.0, K.Pr + 2.4)} />
        </>)}
      </Escena>
      {/* 8 · Irlanda: la gran hambruna */}
      <Escena T={T} a={K.I} b={K.He} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaIrlanda T={T} cafe={kprog(T, K.I + 0.4, K.I + 2.4)} />
          {[0, 1, 2].map((i) => { const u = kprog(T, K.I + 3.6 + i * 0.5, K.I + 6.8 + i * 0.3); return u > 0 && <Barco key={i} T={T} x={klerp(240, -140, u) + i * 20} y={720 + i * 150} s={0.8} />; })}
        </>)}
      </Escena>
      {/* 9 · herbario: su ADN en hojas guardadas desde 1845 */}
      <Escena T={T} a={K.He} b={K.H1} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaHerbario x={250} y={970} rot={-8} anio="1845" s={kprog(T, K.He + 0.3, K.He + 0.7, kEase.rebote)} />
          <HojaHerbario x={540} y={950} rot={2} anio="· · ·" s={kprog(T, K.He + 0.5, K.He + 0.9, kEase.rebote)} />
          <HojaHerbario x={830} y={980} rot={9} anio="1896" s={kprog(T, K.He + 0.7, K.He + 1.1, kEase.rebote)} />
          <ADN T={T} x={540} y={900} alto={210} p={kprog(T, K.He + 1.4, K.He + 2.8)} />
        </>)}
      </Escena>
      {/* 10–11 · HERB-1 y el origen: el mapa de América */}
      <Escena T={T} a={K.H1} b={K.C} zoom={0.03}>
        <FondoLunares color={mixHex(KC.mint, KC.lilac, kprog(T, K.M - 0.3, K.M + 0.3))} />
        {fsvg(<>
          <g opacity={kprog(T, K.H1 + 1.6, K.H1 + 2.2)}><MapaAmerica T={T} brilloMx={kprog(T, K.M + 1.2, K.M + 1.8)} brilloAn={kprog(T, K.M + 2.0, K.M + 2.6)} /></g>
          {T > K.H1 + 2.6 && T < K.M + 0.3 && [[mxX, mxY, 0], [anX - 20, anY - 60, 0.4], [anX + 30, anY + 40, 0.6]].map(([px, py, d], i) => { const u = kprog(T, K.H1 + 2.6 + d, K.H1 + 3.0 + d, kEase.rebote); return <g key={i} opacity={1 - kprog(T, K.M - 0.2, K.M + 0.3)}>
            <circle cx={px} cy={py} r={34 + 8 * Math.sin(T * 6 + i)} fill={KC.gold2} opacity={0.4} /><circle cx={px} cy={py} r={16 * u} fill={KC.gold} stroke={KC.ink} strokeWidth={4} /></g>; })}
          {T > K.M + 1.0 && <>
            <circle cx={mxX} cy={mxY} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
            <circle cx={tlX + 14} cy={tlY - 4} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </>}
          {T > K.M + 0.6 && (() => { const ox = 200, oy = 870, u1 = kprog(T, K.M + 0.6, K.M + 1.3, kEase.sale), u2 = kprog(T, K.M + 1.4, K.M + 2.1, kEase.sale);
            return <g>
              <text x={ox} y={oy + 40} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>?</text>
              <path d={`M ${ox - 40} ${oy} Q ${klerp(ox, mxX + 60, 0.5)} ${oy - 60} ${klerp(ox - 40, mxX + 40, u1)} ${klerp(oy, mxY - 10, u1)}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeDasharray="22 14" strokeLinecap="round" />
              <path d={`M ${ox} ${oy + 70} Q ${ox - 20} ${oy + 260} ${klerp(ox, anX + 50, u2)} ${klerp(oy + 70, anY - 20, u2)}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeDasharray="22 14" strokeLinecap="round" />
            </g>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma tabla, la misma papa y el mismo jitomate; ahora el sello dice OOMICETO */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={460} y={960} />
          <Papa x={330} y={880} s={1.15} rot={-6} mancha={1} />
          <Jitomate x={720} y={855} s={0.95} mancha={1} />
          <SelloLargo T={T} at={K.C + 0.8} x={330} y={650} texto="OOMICETO" color={KC.red} />
          <Zoospora T={T} x={klerp(-120, 820, kprog(T, K.C + 1.6, K.C + 2.6, kEase.sale))} y={1090} s={1.1} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.9} until={K.H - 0.3} texto="es un moho de agua" x={330} y={690} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.G + 1.0} until={K.H - 0.3} x={60} y={1110} texto="papa" tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 4.4} until={K.H - 0.3} x={1040} y={1110} lado="izq" texto="jitomate" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 0.5} until={K.L - 0.3} x={60} y={380} texto="tizón tardío" tam={36} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.L - 0.3} x={60} y={435} texto="Phytophthora infestans" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.H + 2.4} until={K.L - 0.3} x={60} y={1120} texto="envés (abajo): pelusa blanca" tam={30} color={KC.ink} />
      <Chip T={T} at={K.L + 0.2} until={K.N - 0.3} texto="AL MICROSCOPIO · envés de la hoja" x={540} y={470} tam={32} />
      <Etq T={T} at={K.L + 1.6} until={K.N - 0.3} x={350} y={460} texto="esporangio" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.L + 2.2} until={K.N - 0.3} x={700} y={1000} lado="izq" texto="esporangióforo" tam={30} color={KC.texto} />
      <Chip T={T} at={K.N + 1.6} until={K.E - 0.3} texto="8 a 12 nadadores por limón" x={380} y={470} tam={32} borde={KC.cyan} />
      <Etq T={T} at={K.N + 2.4} until={K.E - 0.3} x={60} y={1150} texto="zoospora · 2 flagelos" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.N + 0.3} until={K.E - 0.3} x={150} y={620} texto="agua y frío" tam={30} color={KC.cyan} />
      <Etq T={T} at={K.E + 1.0} until={K.E + 2.2} x={620} y={830} texto="estoma (poro)" tam={30} color={KC.gold2} />
      <NumeroGigante T={T} at={K.E + 2.0} until={K.Pa - 0.3} valor={300000} dur={1.2} etiqueta="hasta" x={460} y={520} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.E + 2.4} until={K.Pa - 0.3} texto="esporangios en una sola mancha" x={460} y={680} tam={32} />
      <Etq T={T} at={K.Pa + 0.6} until={K.Pa + 2.0} x={40} y={1180} texto="crece en hilos (micelio)" tam={30} color={KC.gold2} />
      <TarjetaPared T={T} at={K.Pa + 1.8} until={K.P - 0.2} x={290} y={760} titulo="hongo" borde={KC.ink} filas={[['quitina', true]]} />
      <TarjetaPared T={T} at={K.Pa + 2.3} until={K.P - 0.2} x={790} y={880} titulo="Phytophthora" it borde={KC.red} filas={[['quitina: casi nada', false], ['celulosa', true]]} />
      <Chip T={T} at={K.Pr + 0.3} until={K.I - 0.3} texto="oomiceto" x={540} y={470} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.Pr + 1.0} until={K.I - 0.3} x={20} y={945} texto="alga parda" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pr + 1.3} until={K.I - 0.3} x={230} y={715} texto="diatomea" tam={28} color={KC.ink} lado="der" />
      <Etq T={T} at={K.Pr + 1.6} until={K.I - 0.3} x={430} y={905} texto="moho de agua" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pr + 2.4} until={K.I - 0.3} x={1040} y={880} lado="izq" texto="hongos" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pr + 2.4} until={K.I - 0.3} x={40} y={615} texto="estramenopilos" tam={28} color={KC.ink} />
      <Chip T={T} at={K.I + 0.3} until={K.He - 0.3} texto="desde 1845 · Irlanda" x={400} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.I + 2.4} until={K.He - 0.3} texto="≈ 1 millón de muertos" x={540} y={1060} tam={40} borde={KC.red} />
      <Chip T={T} at={K.I + 3.6} until={K.He - 0.3} texto="más de 1 millón emigró" x={540} y={1150} tam={40} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.He + 0.1} until={K.H1 - 0.3} anio="2013" quien="Múnich y Kew (Londres)" revista="Yoshida et al., eLife" y={560} />
      <Chip T={T} at={K.H1 + 0.2} until={K.H1 + 1.9} texto="HERB-1 · un linaje distinto" x={540} y={820} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.H1 + 0.8} until={K.H1 + 1.9} texto="se creyó extinto (2013)" x={540} y={940} tam={38} borde={KC.red} />
      <Chip T={T} at={K.H1 + 2.8} until={K.M - 0.3} texto="rastro hallado en América (2014)" x={540} y={1130} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.H1 + 3.2} until={K.M - 0.3} x={mxX - 40} y={mxY + 70} texto="México" tam={28} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.H1 + 3.4} until={K.M - 0.3} x={anX + 60} y={anY - 60} texto="Sudamérica" tam={28} color={KC.ink} />
      <Chip T={T} at={K.H1 + 3.6} until={K.M - 0.3} texto="Martin et al., Mol Biol Evol, 2014" x={360} y={470} tam={24} borde={KC.ink} mono />
      <MiniEstudio T={T} at={K.M + 1.2} until={K.C - 0.3} x={505} y={590} anio="2014" quien="Goss, PNAS: México" />
      <MiniEstudio T={T} at={K.M + 2.0} until={K.C - 0.3} x={800} y={1060} anio="2025" quien="Coomber, PLoS ONE: Andes" color={KC.cyan} />
      <Etq T={T} at={K.M + 1.4} until={K.C - 0.3} x={mxX - 10} y={mxY + 48} texto="valle de Toluca" tam={24} color={KC.ink} />
      <Etq T={T} at={K.M + 1.6} until={K.C - 0.3} x={tlX + 20} y={tlY - 40} texto="Tlaxcala" tam={24} color={KC.ink} />
      <Etq T={T} at={K.M + 2.2} until={K.C - 0.3} x={anX - 40} y={anY + 70} texto="Andes" tam={28} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.M + 3.0} until={K.C - 0.3} texto="sin resolver" x={480} y={470} tam={40} borde={KC.red} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="moho de agua, no hongo" x={380} y={470} tam={40} borde={KC.cyan} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={175} />
      <BarraEscala T={T} at={K.H} until={K.L} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.L} until={K.N} texto="30 µm" largo={132} />
      <BarraEscala T={T} at={K.N} until={K.E} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.E} until={K.E + 2.0} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.E + 2.0} until={K.Pa} texto="30 µm" largo={70} />
      <BarraEscala T={T} at={K.Pa} until={K.P} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.P} until={K.Pr} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.Pr} until={K.I} texto="dibujos no a escala" largo={120} />
      <BarraEscala T={T} at={K.I} until={K.He} texto="100 km" largo={106} />
      <BarraEscala T={T} at={K.He} until={K.H1} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.H1} until={K.C} texto="1000 km" largo={67} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={175} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Ese hongo de la papa *no es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.L - 0.1} texto="Manchas cafés y *pelusa blanca.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.N - 0.1} texto="Esporas con *forma de limón.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.E - 0.1} texto="De 8 a 12 *nadadores con dos colas.*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.Pa - 0.1} texto="Una mancha: hasta *300 mil limones.*" />
      <Subtitulo T={T} idx={5} at={K.Pa + 0.1} until={K.P - 0.1} texto="Casi sin quitina: *tiene celulosa.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Entonces *qué es?*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.I - 0.1} texto="Pariente de *algas pardas y diatomeas.*" />
      <Subtitulo T={T} idx={8} at={K.I + 0.1} until={K.He - 0.1} texto="La Gran Hambruna *de Irlanda.*" />
      <Subtitulo T={T} idx={9} at={K.He + 0.1} until={K.H1 - 0.1} texto="Su ADN, *en hojas de herbario.*" />
      <Subtitulo T={T} idx={10} at={K.H1 + 0.1} until={K.M - 0.1} texto="¿Extinto? *Su rastro sigue en América.*" />
      <Subtitulo T={T} idx={11} at={K.M + 0.1} until={K.C - 0.1} texto="¿México o los Andes? *Aún se discute.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es un hongo, *y sigue atacando.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.6, K.L - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.N + 0.5, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pa + 0.6, K.P - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Pr + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.I + 0.8, K.He - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.H1 + 0.6, K.M - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.M + 0.4, K.C - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="25" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PapaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PapaShot /></CompositionStage></div>;
}
window.PapaApp = PapaApp;
