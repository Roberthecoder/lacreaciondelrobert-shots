// Shot Fungi Mati #155 · El iceberg de los hongos — NARRADO (gancho 1 «Esto no es X: es Y» + formato iceberg, N3 capítulos).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// UN solo mundo vertical: cielo, mar y un iceberg cuya punta es un champiñón. La cámara baja nivel por nivel
// y en el cierre se aleja hasta ver el iceberg completo (macro → profundo → macro).

/* ---------- TEXTOS Y CIFRAS (cámbialos aquí si la verificación los ajusta) ---------- */
const TX = {
  punta: 'LA PUNTA',
  niveles: [
    ['1', 'LO QUE TODOS SABEN'], ['2', 'LO QUE POCOS SABEN'], ['3', 'PROFUNDO'], ['4', 'EL ABISMO'], ['5', 'EL FONDO'],
  ],
  micelio: 'el hongo: micelio',
  agaricus: 'Agaricus bisporus',
  noPlantas: 'no son plantas',
  levadura: 'levadura del pan',
  sacch: 'Saccharomyces cerevisiae',
  penicillium: 'Penicillium',
  sinBact: 'halo sin bacterias',
  bacterias: 'bacterias',
  quitina: 'QUITINA',
  pared: 'pared de la hifa',
  caparazon: 'caparazón',
  brillanN: 100, brillanPre: '+', brillanChip: 'especies que brillan', brillanNota: '132 conocidas (2024)',
  mycena: 'p. ej. Mycena',
  armAnio: '2003', armQuien: 'Oregón, EE. UU.', armRevista: 'un solo individuo de Armillaria',
  armArea: '≈ 9.65 km² (965 ha)', armillaria: 'Armillaria', raiz: 'de raíz en raíz',
  ophio: 'Ophiocordyceps', hormiga: 'hormiga', nuca: 'brota de la nuca',
  microscopio: 'AL MICROSCOPIO', nematodo: 'nematodo', anillo: 'anillo de 3 células',
  sexosN: 23000, sexosPre: '≈ ', sexosChip: 'tipos de apareamiento (estimados)', schizo: 'Schizophyllum commune', laminas: 'láminas partidas',
  radAnio: '2007', radQuien: 'en laboratorio', radRevista: 'hongos negros, con melanina',
  negros: 'hongos negros · melanina', sinRad: 'sin radiación', conRad: 'con radiación', hipotesis: '¿la usan como energía? · hipótesis',
};
// subtítulos (idx = línea de narracion.json); palabra clave entre *asteriscos*
const SUBT = [
  'Ese champiñón es solo *la punta del iceberg.*',
  'No son plantas. La levadura *es un hongo.*',
  'La penicilina salió *de un moho.*',
  'Paredes con *quitina,* como un escarabajo.',
  'Más de *100 especies* brillan en la oscuridad.',
  'Un solo *Armillaria:* casi 10 km² de bosque.',
  '¿Ya es raro? *Falta lo oscuro.*',
  'Ya muerta, *le brota de la nuca.*',
  'Lazos que se inflan y *atrapan nematodos.*',
  '*Más de 23,000* tipos de apareamiento.',
  'Crecieron más *con radiación.*',
  'Todo empezó con *ese champiñón.*',
];

/* ---------- MUNDO ---------- */
const SEA = 1400;
const BANDAS = [1400, 2700, 4000, 5300, 6600, 7950];
const AGUA = ['#46d8df', '#1f93dc', '#1d4fa3', '#13204c', '#0E0F12'];
const HIELO = ['#e8f8ff', '#c4e6f6', '#6f97cf', '#33477f', '#1f2436'];
// paradas de la cámara (centro del mundo que queda al centro de la pantalla)
const P = {
  g: { x: 1350, y: 2300, z: 0.36 }, n1: { x: 1000, y: 2060, z: 1 }, pe: { x: 650, y: 3330, z: 1 }, qu: { x: 1760, y: 3420, z: 1 },
  br: { x: 650, y: 4620, z: 1 }, ar: { x: 1760, y: 4800, z: 1 }, pr: { x: 1150, y: 5450, z: 1 }, ho: { x: 650, y: 5980, z: 1 },
  la: { x: 1760, y: 6100, z: 1 }, se: { x: 650, y: 7180, z: 1 }, ra: { x: 1760, y: 7330, z: 1 }, ov: { x: 1120, y: 4150, z: 0.236 },
};
const CIMA = { x: 980, y: 1085 };   // donde nace el champiñón
// contorno del iceberg (facetado, trazo grueso)
const ICE = [[780, 1400], [835, 1300], [870, 1245], [905, 1170], [945, 1110], [1000, 1080], [1060, 1120], [1100, 1175], [1160, 1205], [1215, 1290], [1300, 1400],
  [1480, 1500], [1720, 1680], [1930, 1980], [2080, 2380], [2210, 2860], [2290, 3420], [2345, 4080], [2320, 4760], [2290, 5450], [2200, 6080], [2090, 6640],
  [1930, 7120], [1700, 7520], [1420, 7820], [1180, 7880], [930, 7760], [690, 7420], [460, 6960], [300, 6400], [170, 5760], [90, 5100], [60, 4400],
  [90, 3700], [170, 3060], [300, 2480], [450, 2000], [600, 1660], [700, 1500]];
const ICE_D = 'M ' + ICE.map((p) => p.join(' ')).join(' L ') + ' Z';
// facetas claras (brillo del hielo)
const FACETAS = [
  'M 870 1245 L 945 1110 L 1000 1080 L 960 1200 L 900 1320 Z',
  'M 1300 1400 L 1480 1500 L 1720 1680 L 1500 1640 Z',
  'M 450 2000 L 600 1660 L 700 1500 L 640 1800 L 520 2150 Z',
  'M 2080 2380 L 2210 2860 L 2120 2780 Z',
  'M 90 3700 L 170 3060 L 230 3400 Z',
  'M 2345 4080 L 2320 4760 L 2250 4400 Z',
];
const GRIETAS = ['M 1200 1700 L 1260 1900 L 1230 2050', 'M 400 3200 L 470 3350', 'M 2100 4300 L 2030 4500 L 2060 4620', 'M 300 5800 L 380 5950', 'M 1900 6900 L 1830 7050', 'M 1000 7500 L 1080 7650'];
// micelio dentro del hielo: [x, y, escala, semilla, rot]
const MICELIO = [[1050, 2000, 0.55, 3, 0], [1500, 2350, 0.42, 5, 40], [520, 2900, 0.4, 7, -30], [1300, 3900, 0.45, 9, 10], [600, 4900, 0.4, 11, 60],
  [1700, 5600, 0.45, 13, -20], [900, 6500, 0.42, 15, 30], [1500, 7300, 0.38, 17, 0]];

/* ---------- UTILIDADES DE ESTE SHOT ---------- */
// grupo dibujado en coordenadas de pantalla para una parada de cámara (z = 1 → 1:1)
const enParada = (pp) => `translate(${pp.x} ${pp.y}) scale(${1 / pp.z}) translate(-540 -960)`;
const txt = (tam, peso = 700, fam = KF.mono, it = false) => ({ font: `${it ? 'italic ' : ''}${peso} ${tam}px ${fam}` });
// etiqueta del mundo: punto en el objeto, línea y texto (cursiva con it). Se apaga cuando la cámara se aleja (zc).
function EtqW({ T, at, x, y, texto, it = false, lado = 'der', color = KC.texto, tam = 30, linea = 56, zc = 1, ang = 0, zmax, hasta }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.sale), o = kprog(T, at, at + 0.25) * (zmax ? 1 - kprog(zc, zmax, zmax + 0.08) : kprog(zc, 0.45, 0.75)) * (hasta != null ? 1 - kprog(T, hasta, hasta + 0.3) : 1);
  if (o <= 0.01) return null;
  const d = lado === 'der' ? 1 : -1, lx = Math.cos(ang * Math.PI / 180) * linea * d, ly = Math.sin(ang * Math.PI / 180) * linea;
  return <g opacity={o}>
    <circle cx={x} cy={y} r={7} fill={color} stroke={KC.ink} strokeWidth={3} />
    <line x1={x} y1={y} x2={x + lx * e} y2={y + ly * e} stroke={color} strokeWidth={4} />
    <text x={x + lx + d * 10} y={y + ly + tam * 0.35} textAnchor={d > 0 ? 'start' : 'end'} style={txt(tam, 700, KF.mono, it)} fill={color}
      stroke="rgba(8,9,12,.9)" strokeWidth={8} paintOrder="stroke" strokeLinejoin="round">{texto}</text>
  </g>;
}
// texto suelto con contorno (para rótulos centrados)
function Rotulo({ T, at, x, y, texto, tam = 30, color = KC.texto, it = false, peso = 700, fam = KF.mono, zc = 1, anchor = 'middle' }) {
  if (T < at) return null;
  const o = kprog(T, at, at + 0.35) * kprog(zc, 0.45, 0.75); if (o <= 0.01) return null;
  return <text x={x} y={y} textAnchor={anchor} opacity={o} style={txt(tam, peso, fam, it)} fill={color} stroke="rgba(8,9,12,.9)" strokeWidth={8} paintOrder="stroke" strokeLinejoin="round"
    transform={`translate(0 ${(1 - kprog(T, at, at + 0.4, kEase.sale)) * 20})`}>{texto}</text>;
}
// barra de escala pegada al dibujo
function BarraW({ T, at, x, y, largo, texto, zc = 1, color = KC.texto }) {
  if (T < at) return null;
  const o = kprog(T, at, at + 0.4) * kprog(zc, 0.45, 0.75); if (o <= 0.01) return null;
  return <g opacity={o}>
    <rect x={x} y={y} width={largo} height={8} rx={4} fill={color} stroke={KC.ink} strokeWidth={2} />
    <line x1={x} y1={y - 8} x2={x} y2={y + 16} stroke={color} strokeWidth={4} /><line x1={x + largo} y1={y - 8} x2={x + largo} y2={y + 16} stroke={color} strokeWidth={4} />
    <text x={x} y={y - 16} style={txt(24)} fill={color} stroke="rgba(8,9,12,.9)" strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}
// placa del nivel (bloque de color con el número + nombre)
function Placa({ T, at, x, y, n, nombre, color, zc = 1, w = 600 }) {
  const e = kprog(T, at, at + 0.5, kEase.rebote); if (e <= 0) return null;
  const o = kprog(T, at, at + 0.2) * kprog(zc, 0.45, 0.75); if (o <= 0.01) return null;
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${e}) rotate(${-2 + mece(T, (parseInt(n) || 7) * 3, 0.2) * 0.6})`}>
    <rect x={10} y={12} width={w} height={130} rx={22} fill={KC.ink} />
    <rect x={0} y={0} width={w} height={130} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d={`M 22 0 L 170 0 L 170 130 L 22 130 Q 0 130 0 108 L 0 22 Q 0 0 22 0 Z`} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={85} y={38} textAnchor="middle" style={txt(24, 900, KF.texto)} fill={KC.ink}>NIVEL</text>
    <text x={85} y={118} textAnchor="middle" style={txt(84, 400, KF.titulo)} fill={KC.ink}>{n}</text>
    <text x={194} y={84} style={txt(nombre.length > 14 ? 40 : 52, 400, KF.titulo)} fill={KC.ink}>{nombre}</text>
  </g>;
}

// letrero sencillo con flecha (LA PUNTA)
function Letrero({ T, at, hasta, x, y, texto, zc = 1, w = 240 }) {
  const e = kprog(T, at, at + 0.5, kEase.rebote); if (e <= 0) return null;
  const o = kprog(T, at, at + 0.2) * (1 - kprog(zc, 0.38, 0.46)) * (1 - kprog(T, hasta, hasta + 0.3));
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${e}) rotate(${-3 + mece(T, 5, 0.25) * 1.5})`}>
    <rect x={8} y={10} width={w} height={96} rx={20} fill={KC.ink} />
    <rect x={0} y={0} width={w} height={96} rx={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <text x={w / 2} y={70} textAnchor="middle" style={txt(56, 400, KF.titulo)} fill={KC.ink}>{texto}</text>
    <path d={`M ${w + 6} 48 L ${w + 90} 48`} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <path d={`M ${w + 70} 26 L ${w + 100} 48 L ${w + 70} 70`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

/* ---------- DIBUJOS ---------- */
function Planta({ x, y, s = 1, T = 0 }) {
  const m = mece(T, 4, 0.3) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 40 Q 0 0 80 40 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M 0 30 Q ${m} -40 0 -110`} stroke="#2f9e44" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d={`M 0 -40 Q -70 -70 -90 -20 Q -40 -10 0 -40 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 0 -80 Q 70 -120 95 -70 Q 40 -55 0 -80 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
function Tache({ x, y, p, r = 90 }) {
  if (p <= 0) return null;
  const s = klerp(1.8, 1, kEase.rebote(p));
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 3, 0, 1)}>
    <path d={`M ${-r} ${-r} L ${r} ${r} M ${r} ${-r} L ${-r} ${r}`} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
    <path d={`M ${-r} ${-r} L ${r} ${r} M ${r} ${-r} L ${-r} ${r}`} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
  </g>;
}
// hogaza que se infla (infla 0..1) con burbujas de CO₂ que suben
function Hogaza({ T, x, y, infla = 1, burbujas = 0 }) {
  const sy = klerp(0.62, 1, infla);
  return <g transform={`translate(${x} ${y})`}>
    {burbujas > 0 && Array.from({ length: 7 }, (_, i) => { const ph = ((T * 0.7 + i * 0.37) % 1); return <circle key={i} cx={-100 + i * 34 + Math.sin(T * 3 + i) * 8} cy={-110 * sy - ph * 120} r={8 + (i % 3) * 4} fill="rgba(255,255,255,.55)" stroke="rgba(14,15,18,.5)" strokeWidth={3} opacity={burbujas * (1 - ph)} />; })}
    <g transform={`scale(1 ${sy})`}>
      <path d="M -150 0 Q -160 -120 -40 -140 Q 60 -155 140 -100 Q 175 -60 150 0 Z" fill="#d9a35a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -120 -40 Q -110 -110 -30 -122 Q 40 -130 110 -90" fill="none" stroke="#f2c983" strokeWidth={14} strokeLinecap="round" opacity=".8" />
      {[-70, -10, 50].map((dx, i) => <path key={i} d={`M ${dx - 30} -95 Q ${dx} -125 ${dx + 30} -100`} fill="none" stroke="#8a5a2b" strokeWidth={7} strokeLinecap="round" />)}
    </g>
    <line x1={-160} y1={0} x2={165} y2={0} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// lupa circular con contenido (fondo claro) y su escala
function LupaW({ x, y, r, p = 1, children, fondo = '#fff7e0', id }) {
  if (p <= 0) return null;
  const s = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
    <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.25} y2={r * 1.25} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.22} y2={r * 1.22} stroke="#b05a2a" strokeWidth={18} strokeLinecap="round" />
    <circle r={r} fill={fondo} />
    <g clipPath={`url(#${id})`}>{children}</g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={14} />
    <circle r={r - 10} fill="none" stroke="#fff" strokeWidth={4} opacity=".6" />
  </g>;
}
// colonia de Penicillium: verde-azulada, borde blanco y surcos radiales
function ColPenicillium({ cx, cy, r }) {
  if (r <= 2) return null;
  return <g>
    <Colonia cx={cx} cy={cy} r={r * 1.08} color="#f7fbf4" seed={4} />
    <Colonia cx={cx} cy={cy} r={r * 0.92} color="#3e9c8a" seed={5} />
    <circle cx={cx} cy={cy} r={r * 0.55} fill="#2f7f74" />
    {Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return <line key={i} x1={cx + Math.cos(a) * r * 0.2} y1={cy + Math.sin(a) * r * 0.2} x2={cx + Math.cos(a) * r * 0.85} y2={cy + Math.sin(a) * r * 0.85} stroke="#1f5e56" strokeWidth={3} opacity=".7" />; })}
    <circle cx={cx} cy={cy} r={r * 0.18} fill="#e9f3d0" opacity=".8" />
  </g>;
}
const BACT = (() => { const g = krng(21), out = []; while (out.length < 90) { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 240; const x = Math.cos(a) * d, y = Math.sin(a) * d; out.push([x, y, 5 + g() * 7, g()]); } return out; })();

// hifa en corte (tubo con la pared resaltada). pared 0..1 = la pared brilla en dorado
function HifaCorte({ T, x, y, largo = 360, alto = 76, pared = 0 }) {
  const col = mixHex('#fff4d6', '#F4C25A', pared);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 ${-alto / 2} L ${largo} ${-alto / 2} L ${largo} ${alto / 2} L 0 ${alto / 2} Q -40 0 0 ${-alto / 2} Z`} fill="#d9f2e6" stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={-alto / 2 + 7} x2={largo} y2={-alto / 2 + 7} stroke={col} strokeWidth={10 + pared * 4} style={pared > 0.2 ? { filter: `drop-shadow(0 0 ${10 * pared}px ${KC.gold})` } : null} />
    <line x1={0} y1={alto / 2 - 7} x2={largo} y2={alto / 2 - 7} stroke={col} strokeWidth={10 + pared * 4} style={pared > 0.2 ? { filter: `drop-shadow(0 0 ${10 * pared}px ${KC.gold})` } : null} />
    {[0.25, 0.6].map((u, i) => <line key={i} x1={largo * u} y1={-alto / 2 + 12} x2={largo * u} y2={alto / 2 - 12} stroke="#9cc9b5" strokeWidth={5} />)}
    {[0.12, 0.42, 0.78].map((u, i) => <ellipse key={i} cx={largo * u + Math.sin(T * 1.5 + i) * 6} cy={0} rx={13} ry={9} fill="#b18cff" stroke="#6b4fb5" strokeWidth={3} />)}
    {/* cara del corte: anillo de pared */}
    <ellipse cx={largo} cy={0} rx={22} ry={alto / 2} fill="#d9f2e6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={largo} cy={0} rx={16} ry={alto / 2 - 6} fill="none" stroke={col} strokeWidth={10} style={pared > 0.2 ? { filter: `drop-shadow(0 0 ${12 * pared}px ${KC.gold})` } : null} />
  </g>;
}
// escarabajo visto desde arriba; brillo 0..1 recorre el caparazón
function Escarabajo({ T, x, y, s = 1, brillo = 0, rot = 0 }) {
  const pata = (sx, y0, a1, a2) => { const k = Math.sin(T * 6 + y0) * 3; return <path d={`M ${sx * 40} ${y0} L ${sx * (95 + a1)} ${y0 + a2 + k} L ${sx * (130 + a1)} ${y0 + a2 * 2 + 30}`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />; };
  const bx = klerp(-90, 90, brillo);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id="escClip"><ellipse cx={0} cy={30} rx={72} ry={108} /></clipPath>
      <radialGradient id="escG" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#3fbf8a" /><stop offset=".6" stopColor="#14684a" /><stop offset="1" stopColor="#0b3a2a" /></radialGradient></defs>
    {[-1, 1].map((sx) => <g key={sx}>{pata(sx, -80, 0, -30)}{pata(sx, -40, 10, 10)}{pata(sx, 10, 0, 40)}</g>)}
    <path d="M -14 -150 Q -40 -190 -60 -200 M 14 -150 Q 40 -190 60 -200" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={-136} rx={30} ry={24} fill="#1b2a24" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-92} rx={54} ry={36} fill="url(#escG)" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={30} rx={72} ry={108} fill="url(#escG)" stroke={KC.ink} strokeWidth={8} />
    <line x1={0} y1={-76} x2={0} y2={136} stroke={KC.ink} strokeWidth={6} />
    <g clipPath="url(#escClip)">{brillo > 0 && brillo < 1 && <rect x={bx - 22} y={-90} width={44} height={260} fill="#fff" opacity=".55" transform={`rotate(20 ${bx} 30)`} />}
      <ellipse cx={-30} cy={-20} rx={14} ry={40} fill="#fff" opacity=".35" /><ellipse cx={34} cy={-14} rx={10} ry={30} fill="#fff" opacity=".25" /></g>
  </g>;
}
// tronco de lado (para los hongos que brillan)
function Tronco({ x, y, w = 820, h = 120 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={26} fill="#5e3a1c" stroke={KC.ink} strokeWidth={8} />
    {[28, 60, 92].map((yy, i) => <path key={i} d={`M 50 ${yy} Q ${w * 0.4} ${yy - 12} ${w - 20} ${yy + 5}`} stroke="#40250f" strokeWidth={6} fill="none" />)}
    <ellipse cx={w} cy={h / 2} rx={40} ry={h / 2} fill="#b8864a" stroke={KC.ink} strokeWidth={8} />
    {[0.66, 0.36].map((k, i) => <ellipse key={i} cx={w} cy={h / 2} rx={40 * k} ry={h / 2 * k} fill="none" stroke="#8a5a2b" strokeWidth={4} />)}
    {[[120, 6], [330, 4], [560, 8], [700, 3]].map(([mx, r], i) => <circle key={i} cx={mx} cy={h - 20} r={r + 6} fill="#3d6b2a" opacity=".8" />)}
  </g>;
}
// Mycena: sombrerito en campana sobre pie fino. luz 0..1 = bioluminiscencia verde
function Mycena({ T, x, y, s = 1, rot = 0, luz = 0, crece = 1, alto = 90 }) {
  if (crece <= 0) return null;
  const h = alto * kEase.sale(kclamp(crece, 0, 1)), c = kclamp(crece * 1.4 - 0.3, 0, 1), r = 26 * c;
  const cap = mixHex('#c9b9a0', '#b9ff8a', luz), pie = mixHex('#e6dccb', '#9dffa0', luz * 0.7);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, x, 0.25) * 3}) scale(${s})`} style={luz > 0.05 ? { filter: `drop-shadow(0 0 ${14 * luz}px #5dff6a) drop-shadow(0 0 ${30 * luz}px #2bd94a)` } : null}>
    <path d={`M -3 0 Q -6 ${-h / 2} -2 ${-h} L 3 ${-h} Q 4 ${-h / 2} 3 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={3} />
    {c > 0 && <g transform={`translate(0 ${-h})`}>
      <path d={`M ${-r} 0 Q ${-r * 1.02} ${-r * 1.2} 0 ${-r * 1.35} Q ${r * 1.02} ${-r * 1.2} ${r} 0 Q 0 ${r * 0.18} ${-r} 0 Z`} fill={cap} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      {[-0.5, 0, 0.5].map((u, i) => <line key={i} x1={u * r * 0.95} y1={-1} x2={u * r * 0.3} y2={-r * 1.15} stroke={mixHex('#8a7a62', '#4fe05a', luz)} strokeWidth={2} />)}
    </g>}
  </g>;
}
// árbol de perfil con raíces (para Armillaria). Base del tronco en (x, y). raices = [[dx, dy], ...]
function ArbolRaiz({ x, y, s = 1, T, seed }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><Conifera x={0} y={0} s={0.42} T={T} seed={seed} /></g>;
}
const RAICES = (() => {   // raíces de 5 árboles en el corte del bosque (coordenadas del panel); las puntas de árboles vecinos se tocan
  const arb = [120, 320, 520, 720, 900], out = [];
  arb.forEach((ax, i) => {
    const g = krng(40 + i);
    [[-1, 0.5], [-0.6, 1], [0, 1.25], [0.6, 1], [1, 0.5]].forEach(([dx, dy], k) => {
      const L = 100 + g() * 30;
      const x2 = ax + dx * L * (k === 0 || k === 4 ? 1 : 0.7), y2 = 800 + dy * 90 + g() * 30;
      out.push({ i, d: `M ${ax} 790 Q ${ax + dx * L * 0.3} ${790 + dy * 60} ${x2} ${y2}`, x2, y2 });
    });
  });
  return out;
})();
const ARB_X = [120, 320, 520, 720, 900];
// hormiga de perfil colgada de la hoja (cabeza arriba). muerta 0..1 apaga el color y detiene las patas
function Hormiga({ T, x, y, s = 1, muerta = 0, muerde = 1 }) {
  const viva = 1 - muerta, k = (i) => Math.sin(T * 9 + i) * 5 * viva;
  const cuerpo = mixHex('#2a1a12', '#5a4a3e', muerta);
  const pata = (x0, y0, x1, y1, x2, y2, i, lejos) => <path key={i + (lejos ? 'l' : '')} d={`M ${x0} ${y0} L ${x1 + k(i)} ${y1} L ${x2 + k(i) * 1.5} ${y2 + k(i + 1)}`} stroke={lejos ? '#5a4033' : KC.ink} strokeWidth={lejos ? 6 : 8} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={lejos ? 0.7 : 1} />;
  const patas = [[-10, 70, -80, 60, -110, 120], [-30, 82, -70, 140, -60, 210], [-48, 92, -10, 160, 30, 220]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {patas.map(([a, b, c, d, e, f], i) => pata(a + 8, b - 4, c + 20, d - 8, e + 20, f - 6, i, true))}
    {/* mandíbulas cerradas sobre la vena */}
    <path d={`M -6 -32 L ${-10 + (1 - muerde) * -8} -58 L 4 -50`} stroke={KC.ink} strokeWidth={7} fill="#6a3a1a" strokeLinejoin="round" />
    <path d={`M 14 -30 L ${20 + (1 - muerde) * 8} -58 L 6 -50`} stroke={KC.ink} strokeWidth={7} fill="#6a3a1a" strokeLinejoin="round" />
    {/* antenas acodadas */}
    <path d={`M 18 -22 L 60 -48 L 92 ${-10 + k(5)}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinejoin="round" />
    <ellipse cx={4} cy={-6} rx={34} ry={30} fill={cuerpo} stroke={KC.ink} strokeWidth={6} />
    <circle cx={18} cy={-12} r={6} fill="#fff" opacity={0.6 * viva} />
    <ellipse cx={-26} cy={70} rx={22} ry={52} transform="rotate(28 -26 70)" fill={cuerpo} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-56} cy={128} r={13} fill={cuerpo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-92} cy={190} rx={46} ry={66} transform="rotate(30 -92 190)" fill={cuerpo} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-128 + i * 12} ${160 + i * 26} Q ${-92 + i * 10} ${150 + i * 30} ${-64 + i * 8} ${172 + i * 26}`} stroke="#5a4033" strokeWidth={3} fill="none" opacity=".7" />)}
    {patas.map(([a, b, c, d, e, f], i) => pata(a, b, c, d, e, f, i, false))}
  </g>;
}
// tallo (estroma) de Ophiocordyceps que brota de la nuca. p 0..1
function Estroma({ x, y, p, s = 1 }) {
  if (p <= 0) return null;
  const pts = Array.from({ length: 21 }, (_, i) => { const u = i / 20; return [u * 190 + Math.sin(u * 4) * 14, u * 230 - Math.sin(u * 3) * 30]; });
  const n = Math.max(2, Math.round(20 * p) + 1), q = pts.slice(0, n);
  const d = 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  const asc = kprog(p, 0.6, 1, kEase.rebote), m = pts[13];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#a8743c" strokeWidth={9} fill="none" strokeLinecap="round" />
    {asc > 0 && <ellipse cx={m[0]} cy={m[1]} rx={14 * asc} ry={24 * asc} transform={`rotate(-40 ${m[0]} ${m[1]})`} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />}
    {asc > 0 && [0, 1, 2, 3].map((i) => <circle key={i} cx={m[0] - 6 + i * 4} cy={m[1] - 12 + i * 8} r={2.5 * asc} fill="#e2b25a" />)}
  </g>;
}
// anillo constrictor: 3 células alrededor del nematodo (elipse vista de lado). inf 0..1 = se inflan hacia adentro
function AnilloCelulas({ cx, cy, inf = 0, mitad = 'atras' }) {
  const rx = klerp(52, 40, inf), ry = klerp(104, 58, inf), w = klerp(24, 40, inf);
  const arco = (a0, a1) => { const N = 16; return 'M ' + Array.from({ length: N + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / N) * Math.PI / 180; return `${(cx + Math.cos(a) * rx).toFixed(1)} ${(cy + Math.sin(a) * ry).toFixed(1)}`; }).join(' L '); };
  const segs = mitad === 'atras' ? [[90, 270]] : [[-90, 90]];
  const septos = mitad === 'atras' ? [150, 210] : [-30, 30];
  const col = mixHex('#fff4d6', '#ffd98a', inf);
  return <g>
    {segs.map(([a, b], i) => <g key={i}><path d={arco(a, b)} stroke={KC.ink} strokeWidth={w + 10} fill="none" strokeLinecap="round" /><path d={arco(a, b)} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" /></g>)}
    {septos.map((a, i) => { const r = a * Math.PI / 180; const x = cx + Math.cos(r) * rx, y = cy + Math.sin(r) * ry; return <line key={i} x1={x - Math.cos(r) * w * 0.5} y1={y - Math.sin(r) * w * 0.5} x2={x + Math.cos(r) * w * 0.5} y2={y + Math.sin(r) * w * 0.5} stroke={KC.ink} strokeWidth={4} />; })}
  </g>;
}
// Schizophyllum commune: abanico blanco peludo (vista de arriba) o de abajo con láminas partidas
function Abanico({ T, x, y, s = 1, rot = 0, crece = 1, abajo = false }) {
  if (crece <= 0) return null;
  const c = kEase.rebote(kclamp(crece, 0, 1));
  const borde = 'M -14 0 C -110 -10 -160 -110 -120 -170 Q -100 -200 -70 -185 Q -55 -215 -20 -200 Q 0 -222 22 -200 Q 55 -215 72 -186 Q 102 -200 122 -170 C 160 -110 110 -10 14 0 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, x, 0.2) * 1.5}) scale(${s * c})`}>
    <path d={borde} fill={abajo ? '#d9cbb6' : '#f1ece4'} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {!abajo && Array.from({ length: 34 }, (_, i) => { const a = Math.PI * (0.08 + 0.84 * i / 33); const r1 = 60 + (i % 3) * 30; return <line key={i} x1={-Math.cos(a) * r1} y1={-Math.sin(a) * r1} x2={-Math.cos(a) * (r1 + 18)} y2={-Math.sin(a) * (r1 + 18)} stroke="#b9ad9a" strokeWidth={3} strokeLinecap="round" />; })}
    {!abajo && [0.4, 0.7].map((k, i) => <path key={i} d={`M ${-120 * k} ${-60 * k} Q 0 ${-210 * k} ${120 * k} ${-60 * k}`} stroke="#d8cdbb" strokeWidth={5} fill="none" />)}
    {abajo && Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * i / 12); const ex = -Math.cos(a) * 165, ey = -Math.sin(a) * 175;
      // lámina partida: se abre en dos al llegar a la orilla
      const mx = ex * 0.6, my = ey * 0.6, nx = Math.sin(a) * 7, ny = -Math.cos(a) * 7;
      return <g key={i}><line x1={0} y1={-6} x2={mx} y2={my} stroke="#8a7458" strokeWidth={4} />
        <line x1={mx} y1={my} x2={ex * 0.95 + nx} y2={ey * 0.95 + ny} stroke="#8a7458" strokeWidth={3.5} /><line x1={mx} y1={my} x2={ex * 0.95 - nx} y2={ey * 0.95 - ny} stroke="#8a7458" strokeWidth={3.5} /></g>; })}
    <ellipse cx={0} cy={-4} rx={16} ry={10} fill="#e6dccb" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function SimboloRad({ x, y, r = 46, T = 0, p = 1 }) {
  if (p <= 0) return null;
  const pul = 1 + Math.sin(T * 6) * 0.05;
  const hoja = (a) => { const a0 = (a - 30) * Math.PI / 180, a1 = (a + 30) * Math.PI / 180, r0 = r * 0.24, r1 = r * 0.86;
    return `M ${Math.cos(a0) * r0} ${Math.sin(a0) * r0} L ${Math.cos(a0) * r1} ${Math.sin(a0) * r1} A ${r1} ${r1} 0 0 1 ${Math.cos(a1) * r1} ${Math.sin(a1) * r1} L ${Math.cos(a1) * r0} ${Math.sin(a1) * r0} A ${r0} ${r0} 0 0 0 ${Math.cos(a0) * r0} ${Math.sin(a0) * r0} Z`; };
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1)) * pul})`}>
    <circle r={r + 6} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    {[-90, 30, 150].map((a) => <path key={a} d={hoja(a)} fill={KC.ink} />)}
    <circle r={r * 0.15} fill={KC.ink} />
  </g>;
}

/* ---------- PARADAS (cada una dibujada en coordenadas de pantalla de su cámara) ---------- */
function ParadaGancho({ T, K, zc }) {
  return <g transform={enParada(P.g)}>
    <Letrero T={T} at={K.G + 0.4} hasta={K.N1} x={50} y={440} texto={TX.punta} zc={zc} />
    <EtqW T={T} at={K.G + 1.4} x={480} y={950} texto={TX.micelio} lado="izq" linea={70} ang={-50} tam={32} zc={zc} zmax={0.38} hasta={K.N1} color={KC.gold2} />
  </g>;
}
function ParadaN1({ T, K, zc }) {
  const t0 = K.N1, infla = kprog(T, t0 + 3.4, t0 + 5.2, kEase.suave);
  return <g transform={enParada(P.n1)}>
    <Placa T={T} at={t0 + 0.2} x={50} y={420} n="1" nombre={TX.niveles[0][1]} color={KC.mint} zc={zc} />
    <Aparecer T={T} at={t0 + 1.7}><Planta x={170} y={830} s={1.05} T={T} /></Aparecer>
    <Tache x={170} y={760} p={kprog(T, t0 + 2.5, t0 + 2.9)} r={70} />
    <Rotulo T={T} at={t0 + 2.6} x={170} y={930} texto={TX.noPlantas} tam={28} color={KC.texto} zc={zc} />
    <Aparecer T={T} at={t0 + 3.3}><Hogaza T={T} x={480} y={880} infla={infla} burbujas={infla} /></Aparecer>
    {T > t0 + 4.0 && <path d={`M 600 870 Q 680 880 ${klerp(600, 720, kprog(T, t0 + 4.0, t0 + 4.4))} 930`} stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" fill="none" opacity={kprog(zc, 0.45, 0.75)} />}
    <LupaW id="lupaLev" x={830} y={985} r={130} p={kprog(T, t0 + 4.1, t0 + 4.6)}>
      <Levadura x={-20} y={10} r={56} brote={kprog(T, t0 + 4.6, t0 + 5.6)} T={T} />
      <Levadura x={70} y={-70} r={34} brote={0.6} T={T} seed={3} />
      <BarraW T={T} at={t0 + 4.8} x={-60} y={95} largo={90} texto="5 µm" />
    </LupaW>
    <Rotulo T={T} at={t0 + 4.6} x={680} y={1030} texto={TX.levadura} tam={28} anchor="end" zc={zc} />
    <Rotulo T={T} at={t0 + 4.8} x={680} y={1070} texto={TX.sacch} tam={28} it anchor="end" color={KC.gold2} zc={zc} />
  </g>;
}
function Aparecer({ T, at, children, dur = 0.5 }) {
  if (T < at) return null;
  const e = kprog(T, at, at + dur, kEase.rebote);
  return <g opacity={kprog(T, at, at + 0.2)} transform={`translate(0 ${(1 - e) * 40})`}>{children}</g>;
}
function ParadaPe({ T, K, zc }) {
  const t0 = K.Pe, rc = 95 * kprog(T, t0 + 0.4, t0 + 1.6, kEase.sale), halo = kprog(T, t0 + 1.0, t0 + 1.8);
  const cx = -50, cy = -20;
  return <g transform={enParada(P.pe)}>
    <Placa T={T} at={t0 + 0.1} x={50} y={420} n="2" nombre={TX.niveles[1][1]} color={KC.cyan} zc={zc} />
    <Aparecer T={T} at={t0 + 0.2}>
      <Petri x={540} y={870} r={262} medio="#e8c56a">
        {halo > 0 && <circle cx={cx} cy={cy} r={185 * halo} fill="#fffbea" stroke="#c9a94a" strokeWidth={4} strokeDasharray="14 10" />}
        {BACT.map(([bx, by, r, q], i) => { const dd = Math.hypot(bx - cx, by - cy); if (dd < 200) return null; const a = kprog(T, t0 + 0.6 + q * 1.2, t0 + 0.9 + q * 1.2);
          return a > 0 ? <circle key={i} cx={bx} cy={by} r={r * a} fill="#fffef4" stroke="#8a6a1a" strokeWidth={3} /> : null; })}
        <ColPenicillium cx={cx} cy={cy} r={rc} />
      </Petri>
    </Aparecer>
    <EtqW T={T} at={t0 + 1.2} x={540 + cx + 70} y={870 + cy - 60} texto={TX.penicillium} it lado="der" linea={200} ang={-28} tam={32} zc={zc} color={KC.gold2} />
    <EtqW T={T} at={t0 + 1.7} x={540 + cx - 160} y={870 + cy + 40} texto={TX.sinBact} lado="der" linea={150} ang={112} tam={26} zc={zc} />
    <EtqW T={T} at={t0 + 2.0} x={540 + 170} y={870 + 150} texto={TX.bacterias} lado="der" linea={70} ang={35} tam={26} zc={zc} />
    <BarraW T={T} at={t0 + 0.6} x={90} y={1110} largo={58} texto="1 cm" zc={zc} />
  </g>;
}
function ParadaQu({ T, K, zc }) {
  const t0 = K.Qu, pared = kprog(T, t0 + 1.0, t0 + 1.6), cad = kprog(T, t0 + 1.4, t0 + 2.6), bri = kprog(T, t0 + 3.0, t0 + 3.9);
  return <g transform={enParada(P.qu)}>
    <Aparecer T={T} at={t0 + 0.2}><HifaCorte T={T} x={80} y={800} largo={380} alto={96} pared={pared} /></Aparecer>
    <Rotulo T={T} at={t0 + 0.9} x={70} y={720} texto={TX.pared} tam={28} anchor="start" zc={zc} />
    <BarraW T={T} at={t0 + 0.6} x={70} y={900} largo={96} texto="≈ 5 µm" zc={zc} />
    <Aparecer T={T} at={t0 + 2.6}><Escarabajo T={T} x={810} y={860} s={0.85} brillo={bri} rot={-8} /></Aparecer>
    <Rotulo T={T} at={t0 + 2.9} x={810} y={1080} texto={TX.caparazon} tam={28} zc={zc} />
    <BarraW T={T} at={t0 + 2.9} x={600} y={1120} largo={110} texto="1 cm" zc={zc} />
    <CadenaAnillos x={150} y={1010} n={4} p={cad} s={0.8} T={T} ondula={0.3} color="#b8761a" />
    <Rotulo T={T} at={t0 + 1.8} x={270} y={950} texto={TX.quitina} tam={60} peso={400} fam={KF.titulo} color={KC.gold2} zc={zc} />
    {cad > 0.5 && <g opacity={kprog(cad, 0.5, 1) * kprog(zc, 0.45, 0.75)} stroke={KC.gold2} strokeWidth={5} strokeDasharray="10 10" fill="none">
      <path d="M 240 990 Q 300 900 380 840" /><path d="M 470 1010 Q 600 1000 700 920" /></g>}
  </g>;
}
function ParadaBr({ T, K, zc }) {
  const t0 = K.Br;
  const HONGOS = [[170, 0, 1.0, -10], [240, 0, 0.75, 8], [330, 0, 1.15, -4], [420, 0, 0.8, 14], [520, 0, 1.05, -12], [600, 0, 0.7, 6], [690, 0, 0.95, 10], [770, 0, 0.8, -6]];
  const osc = kprog(T, t0 + 1.3, t0 + 2.2);
  return <g transform={enParada(P.br)}>
    <rect x={-1400} y={-400} width={3880} height={2800} fill="#050816" opacity={osc * 0.5} />
    <Placa T={T} at={t0 + 0.1} x={50} y={420} n="3" nombre={TX.niveles[2][1]} color={KC.lilac} zc={zc} />
    <Aparecer T={T} at={t0 + 0.5}><Tronco x={110} y={980} w={800} h={120} /></Aparecer>
    {HONGOS.map(([hx, hy, k, r], i) => <Mycena key={i} T={T} x={110 + hx} y={984 + hy} s={k} rot={r} crece={kprog(T, t0 + 0.6 + i * 0.08, t0 + 1.3 + i * 0.08)} luz={kprog(T, t0 + 1.6 + i * 0.2, t0 + 2.1 + i * 0.2) * (0.85 + 0.15 * Math.sin(T * 2.4 + i))} />)}
    <EtqW T={T} at={t0 + 2.6} x={444} y={870} texto={TX.mycena} it lado="izq" linea={70} ang={-60} tam={28} zc={zc} color="#b9ff8a" />
    <BarraW T={T} at={t0 + 2.0} x={120} y={1140} largo={60} texto="≈ 1 cm" zc={zc} />
  </g>;
}
function ParadaAr({ T, K, zc }) {
  const t0 = K.Ar, red = kprog(T, t0 + 1.2, t0 + 5.2);
  // orden en que el micelio llega a cada árbol (empieza en el del centro)
  const llega = [0.55, 0.25, 0, 0.25, 0.55];
  return <g transform={enParada(P.ar)}>
    <defs><clipPath id="panelArm"><rect x={60} y={660} width={960} height={500} rx={30} /></clipPath></defs>
    <Aparecer T={T} at={t0 + 0.3}>
      <rect x={60} y={660} width={960} height={500} rx={30} fill="#9fe3ff" />
      <g clipPath="url(#panelArm)">
        <rect x={60} y={790} width={960} height={380} fill="#4a2f1c" />
        {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={90 + (i * 137) % 900} cy={850 + (i * 71) % 280} r={6 + (i % 3) * 3} fill="#3a2414" />)}
        <rect x={60} y={782} width={960} height={14} fill="#3fbf4a" />
        {ARB_X.map((ax, i) => <ArbolRaiz key={i} x={60 + ax} y={792} T={T} seed={i + 2} />)}
        {/* raíces */}
        {RAICES.map((r, i) => <path key={i} d={r.d} transform="translate(60 0)" stroke="#8a5a2b" strokeWidth={9} fill="none" strokeLinecap="round" />)}
        {/* micelio que viaja de raíz en raíz (blanco crema) */}
        {RAICES.map((r, i) => { const q = kprog(red, llega[r.i], llega[r.i] + 0.35); return q > 0 ? <path key={'m' + i} d={r.d} transform="translate(60 0)" stroke="#fff4d6" strokeWidth={5} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${q} 1`} style={{ filter: 'drop-shadow(0 0 6px #fff4d6)' }} /> : null; })}
        {/* cordones negros cortos (secundarios) */}
        <Cordon x1={60 + 520} y1={1040} x2={60 + 610} y2={1110} p={kprog(red, 0.2, 0.5)} onda={8} ancho={8} />
        <Cordon x1={60 + 330} y1={1000} x2={60 + 250} y2={1090} p={kprog(red, 0.45, 0.75)} onda={8} ancho={8} />
        <Cordon x1={60 + 760} y1={990} x2={60 + 840} y2={1080} p={kprog(red, 0.6, 0.9)} onda={8} ancho={8} />
      </g>
      <rect x={60} y={660} width={960} height={500} rx={30} fill="none" stroke={KC.ink} strokeWidth={9} />
    </Aparecer>
    <EtqW T={T} at={t0 + 2.4} x={60 + 360} y={930} texto={TX.raiz} lado="der" linea={40} ang={0} tam={24} zc={zc} color="#fff4d6" />
    <EtqW T={T} at={t0 + 3.0} x={60 + 610} y={1110} texto={TX.armillaria} it lado="der" linea={36} ang={-40} tam={30} zc={zc} color={KC.gold2} />
    <BarraW T={T} at={t0 + 1.0} x={90} y={1125} largo={240} texto="≈ 1 km" zc={zc} color="#fff4d6" />
  </g>;
}
function ParadaHo({ T, K, zc }) {
  const t0 = K.Ho, entra = kprog(T, t0 + 0.8, t0 + 2.2, kEase.suave), muerde = kprog(T, t0 + 2.3, t0 + 2.6), muerta = kprog(T, t0 + 3.2, t0 + 3.8);
  const tallo = kprog(T, t0 + 4.0, t0 + 5.4, kEase.sale);
  const S = 1.3, hx = klerp(620, 500, entra), hy = klerp(880, 742, entra);
  // nuca: unión dorsal de la cabeza con el tórax (coordenadas de la hormiga × S)
  const nx = hx + (-14) * S, ny = hy + 40 + 28 * S;
  return <g transform={enParada(P.ho)}>
    <Placa T={T} at={t0 + 0.1} x={50} y={420} n="4" nombre={TX.niveles[3][1]} color={KC.pink} zc={zc} />
    <Aparecer T={T} at={t0 + 0.3}>
      {/* hoja vista de lado, un poco inclinada: la vena principal corre por abajo */}
      <path d="M 30 690 Q 400 610 980 660 Q 1000 676 975 692 Q 520 760 50 742 Q 15 720 30 690 Z" fill="#3fbf4a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 40 712 Q 400 650 970 672" fill="none" stroke="#6fdc6a" strokeWidth={8} opacity=".6" />
      <path d="M 50 736 Q 500 754 972 690" stroke="#256b2c" strokeWidth={14} fill="none" />
      {[200, 380, 560, 740].map((vx, i) => <path key={i} d={`M ${vx} ${742 - i * 6} Q ${vx + 40} 700 ${vx + 100} ${676 - i * 2}`} stroke="#256b2c" strokeWidth={5} fill="none" />)}
    </Aparecer>
    {T > t0 + 0.8 && <g opacity={kprog(T, t0 + 0.8, t0 + 1.1)}><Hormiga T={T} x={hx} y={hy + 40} s={S} muerta={muerta} muerde={muerde} /></g>}
    <Estroma x={nx} y={ny} p={tallo} s={1} />
    <EtqW T={T} at={t0 + 1.6} x={hx - 150 * S} y={hy + 40 + 200 * S} texto={TX.hormiga} lado="izq" linea={40} ang={0} tam={28} zc={zc} />
    <EtqW T={T} at={t0 + 4.6} x={nx + 190} y={ny + 230} texto={TX.ophio} it lado="der" linea={40} ang={10} tam={32} zc={zc} color={KC.gold2} />
    <EtqW T={T} at={t0 + 4.1} x={nx + 4} y={ny + 4} texto={TX.nuca} lado="der" linea={130} ang={12} tam={24} zc={zc} />
    <BarraW T={T} at={t0 + 1.4} x={60} y={1125} largo={300} texto="≈ 1 cm" zc={zc} />
  </g>;
}
function ParadaLa({ T, K, zc }) {
  const t0 = K.La, p0 = kprog(T, t0 + 0.2, t0 + 0.6, kEase.rebote), cam = kprog(T, t0 + 0.8, t0 + 2.2, kEase.suave), inf = kprog(T, t0 + 2.2, t0 + 2.7, kEase.rebote);
  const cx = 580, cy = 870, hx = klerp(160, 660, cam);
  return <g transform={enParada(P.la)}>
    <defs><clipPath id="microC"><circle cx={540} cy={870} r={318} /></clipPath></defs>
    {p0 > 0 && <g transform={`translate(540 870) scale(${p0}) translate(-540 -870)`}>
      <circle cx={540} cy={870} r={340} fill={KC.ink} />
      <circle cx={540} cy={870} r={318} fill="#0E0F12" />
      <g clipPath="url(#microC)">
        {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={260 + (i * 97) % 560} cy={600 + (i * 131) % 540} r={3 + (i % 3)} fill="#2a3a5a" opacity=".8" />)}
        {/* hifa horizontal con el anillo colgando */}
        <path d="M 200 720 Q 540 700 900 730" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d="M 200 720 Q 540 700 900 730" stroke="#fff4d6" strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d={`M ${cx} 716 L ${cx} ${cy - klerp(92, 50, inf) - 10}`} stroke={KC.ink} strokeWidth={22} /><path d={`M ${cx} 716 L ${cx} ${cy - klerp(92, 50, inf) - 10}`} stroke="#fff4d6" strokeWidth={12} />
        <AnilloCelulas cx={cx} cy={cy} inf={inf} mitad="atras" />
        <Gusano T={T} x={hx} y={cy} largo={520} ancho={38} ang={0} ondula={1 - inf * 0.85} />
        <AnilloCelulas cx={cx} cy={cy} inf={inf} mitad="frente" />
      </g>
      <circle cx={540} cy={870} r={318} fill="none" stroke="#fff" strokeWidth={4} opacity=".25" />
    </g>}
    <Rotulo T={T} at={t0 + 0.1} x={540} y={510} texto={TX.microscopio} tam={44} peso={400} fam={KF.titulo} color={KC.cyan} zc={zc} />
    <EtqW T={T} at={t0 + 1.4} x={300} y={cy + 20} texto={TX.nematodo} lado="izq" linea={40} ang={60} tam={26} zc={zc} />
    <EtqW T={T} at={t0 + 2.6} x={cx + 40} y={cy + 50} texto={TX.anillo} lado="der" linea={70} ang={50} tam={26} zc={zc} color={KC.gold2} />
    <BarraW T={T} at={t0 + 0.6} x={300} y={1100} largo={56} texto="20 µm" zc={zc} />
  </g>;
}
function ParadaSe({ T, K, zc }) {
  const t0 = K.Se, Y = 930;
  return <g transform={enParada(P.se)}>
    <Placa T={T} at={t0 + 0.1} x={50} y={420} n="5" nombre={TX.niveles[4][1]} color={KC.orange} zc={zc} />
    <Aparecer T={T} at={t0 + 0.8}>
      <path d={`M -40 ${Y} Q 300 ${Y - 30} 560 ${Y - 5} Q 800 ${Y + 15} 1120 ${Y - 15} L 1120 ${Y + 50} Q 800 ${Y + 75} 560 ${Y + 55} Q 300 ${Y + 35} -40 ${Y + 65} Z`} fill="#6b4320" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {[120, 380, 640, 900].map((bx, i) => <path key={i} d={`M ${bx} ${Y + 12} Q ${bx + 40} ${Y + 24} ${bx + 90} ${Y + 16}`} stroke="#4a2c12" strokeWidth={5} fill="none" />)}
    </Aparecer>
    <Abanico T={T} x={250} y={Y} s={0.55} rot={-14} crece={kprog(T, t0 + 1.0, t0 + 1.6)} />
    <Abanico T={T} x={440} y={Y - 5} s={0.46} rot={6} crece={kprog(T, t0 + 1.2, t0 + 1.8)} />
    <Abanico T={T} x={860} y={Y - 5} s={0.5} rot={12} crece={kprog(T, t0 + 1.4, t0 + 2.0)} />
    <Abanico T={T} x={640} y={Y + 50} s={0.5} rot={180} abajo crece={kprog(T, t0 + 1.6, t0 + 2.2)} />
    <Rotulo T={T} at={t0 + 2.4} x={50} y={808} texto={TX.schizo} tam={28} it anchor="start" color={KC.gold2} zc={zc} />
    <EtqW T={T} at={t0 + 3.0} x={700} y={1080} texto={TX.laminas} lado="der" linea={50} ang={10} tam={24} zc={zc} />
    <BarraW T={T} at={t0 + 1.4} x={60} y={1070} largo={53} texto="1 cm" zc={zc} />
  </g>;
}
function ParadaRa({ T, K, zc }) {
  const t0 = K.Ra, cre = kprog(T, t0 + 2.0, t0 + 5.6, kEase.suave);
  const COL = [[-70, -40, 1], [60, 30, 2], [-20, 80, 3], [80, -70, 4], [-100, 50, 5], [10, -100, 6], [110, 90, 7]];
  return <g transform={enParada(P.ra)}>
    <Aparecer T={T} at={t0 + 0.5}>
      <Petri x={280} y={860} r={190} medio="#f3e2a6">
        {COL.slice(0, 4).map(([cx, cy, sd], i) => <Colonia key={i} cx={cx} cy={cy} r={klerp(6, 26, cre)} color="#1b1410" seed={sd} />)}
      </Petri>
      <Petri x={790} y={860} r={190} medio="#f3e2a6">
        {COL.map(([cx, cy, sd], i) => <Colonia key={i} cx={cx} cy={cy} r={klerp(6, 50, kprog(cre, i * 0.06, 1))} color="#1b1410" seed={sd} />)}
      </Petri>
    </Aparecer>
    <SimboloRad x={960} y={680} r={42} T={T} p={kprog(T, t0 + 1.0, t0 + 1.4)} />
    {T > t0 + 1.2 && [0, 1, 2].map((i) => { const ph = ((T - t0) * 1.2 + i / 3) % 1; return <path key={i} d={`M ${930 - ph * 90} ${700 + ph * 60} q 12 -14 24 0 q 12 14 24 0`} stroke={KC.yellow} strokeWidth={5} fill="none" opacity={(1 - ph) * kprog(zc, 0.45, 0.75)} />; })}
    <Rotulo T={T} at={t0 + 0.8} x={280} y={1100} texto={TX.sinRad} tam={28} zc={zc} />
    <Rotulo T={T} at={t0 + 1.0} x={790} y={1100} texto={TX.conRad} tam={28} zc={zc} color={KC.yellow} />
    <BarraW T={T} at={t0 + 1.0} x={514} y={1080} largo={42} texto="1 cm" zc={zc} />
  </g>;
}

/* ---------- MUNDO COMPLETO ---------- */
function Mundo({ T, K, zc, cierre }) {
  const ola = (dx) => 'M -3200 ' + SEA + ' ' + Array.from({ length: 90 }, (_, i) => { const x = -3200 + i * 100; return `L ${x} ${(SEA + Math.sin(x / 90 + T * 2.2 + dx) * 10).toFixed(1)}`; }).join(' ');
  const red = kprog(T, K.G + 0.3, K.G + 3.0);
  const glow = cierre;
  return <svg width={2400} height={8400} viewBox="0 0 2400 8400" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
    <defs>
      <linearGradient id="cieloG" x1="0" y1="-3000" x2="0" y2={SEA} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#7fe8ff" /><stop offset=".7" stopColor="#38d3ff" /><stop offset="1" stopColor="#a6f1ff" /></linearGradient>
      <linearGradient id="aguaG" x1="0" y1={SEA} x2="0" y2="8400" gradientUnits="userSpaceOnUse">
        {AGUA.map((c, i) => <stop key={i} offset={((BANDAS[i] + (BANDAS[i + 1] - BANDAS[i]) * 0.5 - SEA) / (8400 - SEA)).toFixed(3)} stopColor={c} />)}
      </linearGradient>
      <linearGradient id="hieloG" x1="0" y1={SEA} x2="0" y2="7900" gradientUnits="userSpaceOnUse">
        {HIELO.map((c, i) => <stop key={i} offset={((BANDAS[i] + (BANDAS[i + 1] - BANDAS[i]) * 0.5 - SEA) / (7900 - SEA)).toFixed(3)} stopColor={c} />)}
      </linearGradient>
      <linearGradient id="hieloTop" x1="0" y1="1050" x2="0" y2={SEA} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e2f6ff" /></linearGradient>
      <clipPath id="bajoAgua"><rect x={-3200} y={SEA} width={9000} height={8000} /></clipPath>
      <clipPath id="sobreAgua"><rect x={-3200} y={-4000} width={9000} height={4000 + SEA} /></clipPath>
      <clipPath id="iceClip"><path d={ICE_D} /></clipPath>
    </defs>
    {/* cielo y mar */}
    <rect x={-3200} y={-4000} width={9000} height={4000 + SEA} fill="url(#cieloG)" />
    <circle cx={1900} cy={600} r={120} fill="#fff6a8" stroke={KC.ink} strokeWidth={8} />
    {[[420, 520, 1], [1700, 380, 0.8], [-300, 760, 1.1], [2700, 900, 1]].map(([nx, ny, k], i) => <g key={i} transform={`translate(${nx + Math.sin(T * 0.2 + i) * 20} ${ny}) scale(${k})`}>
      <path d="M -120 30 Q -130 -20 -70 -20 Q -50 -70 10 -55 Q 60 -90 100 -40 Q 150 -40 140 30 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /></g>)}
    <rect x={-3200} y={SEA} width={9000} height={8000} fill="url(#aguaG)" />
    {/* fondo del mar */}
    <path d="M -3200 8150 Q -1500 8020 0 8100 Q 1200 8180 2400 8080 Q 4000 8000 5800 8120 L 5800 9000 L -3200 9000 Z" fill="#07080b" stroke="#1b2030" strokeWidth={8} />
    {/* rayos de luz bajo el agua */}
    <g clipPath="url(#bajoAgua)" opacity=".18">{[-600, 300, 1300, 2300, 3200].map((rx, i) => <path key={i} d={`M ${rx} ${SEA} L ${rx + 200} ${SEA} L ${rx + 900 + Math.sin(T * 0.4 + i) * 60} 4200 L ${rx + 400 + Math.sin(T * 0.4 + i) * 60} 4200 Z`} fill="#ffffff" />)}</g>
    {/* iceberg */}
    <path d={ICE_D} fill="url(#hieloG)" />
    <g clipPath="url(#iceClip)">
      <rect x={-200} y={800} width={2800} height={SEA - 800} fill="url(#hieloTop)" />
      {FACETAS.map((d, i) => <path key={i} d={d} fill="#ffffff" opacity={i < 3 ? 0.55 : 0.18} />)}
      {GRIETAS.map((d, i) => <path key={i} d={d} stroke={i < 2 ? '#8fc3dc' : '#0b1222'} strokeWidth={6} fill="none" opacity=".6" strokeLinecap="round" />)}
      {/* micelio adentro del hielo */}
      {MICELIO.map(([mx, my, e, sd, r], i) => <g key={i} opacity={(i === 0 ? 0.45 + 0.4 * red : my < 4000 ? 0.18 : 0.3) + 0.5 * glow}>
        <RedHifas T={T} x={mx} y={my} g={i === 0 ? 0.35 + 0.65 * red : 1} seed={sd} n={i === 0 ? 240 : 160} escala={e} circ color={my > 2700 ? '#fff0b8' : '#b98a3c'} ancho={i === 0 ? 7 : 5} rot={r} brillo={(my > 4000 ? 0.8 : 0) + glow} />
      </g>)}
      {/* separación entre niveles */}
      {BANDAS.slice(1, 5).map((by, i) => <line key={i} x1={-200} y1={by} x2={2600} y2={by} stroke="#ffffff" strokeWidth={6} strokeDasharray="30 22" opacity=".45" />)}
    </g>
    <path d={ICE_D} fill="none" stroke={KC.ink} strokeWidth={16} strokeLinejoin="round" />
    {/* superficie del mar (por delante del hielo, transparente) */}
    <path d={ola(0)} stroke="#ffffff" strokeWidth={10} fill="none" opacity=".9" />
    <path d={ola(1.6) + ' L 5800 ' + (SEA + 90) + ' L -3200 ' + (SEA + 90) + ' Z'} fill="#46d8df" opacity=".28" />
    {/* salpicaduras junto al iceberg */}
    {[[790, -1], [1290, 1]].map(([sx, d], j) => Array.from({ length: 6 }, (_, i) => { const ph = ((T + 0.15 + i * 0.05 + j * 0.7) % 2.2) / 0.9; if (ph > 1) return null;
      const x = sx + d * (20 + i * 22) * ph, y = SEA - Math.sin(ph * Math.PI) * (70 + i * 18); return <circle key={j + '-' + i} cx={x} cy={y} r={10 - i} fill="#ffffff" stroke="#1b6f9a" strokeWidth={3} />; }))}
    {/* el champiñón en la punta */}
    <g transform={`rotate(${mece(T, 2, 0.35) * 3} ${CIMA.x} ${CIMA.y})`} style={glow > 0 ? { filter: `drop-shadow(0 0 ${30 * glow}px #fff1a8)` } : null}>
      <Champinon x={CIMA.x} y={CIMA.y + 8} s={3} crece={1} abre={1} borde={6} />
    </g>
    {/* placas del iceberg completo (cierre) */}
    {glow > 0 && <g opacity={glow}>
      {TX.niveles.map(([n, nom], i) => { const yy = (BANDAS[i] + BANDAS[i + 1]) / 2; return <g key={i}>
        <text x={-1000} y={yy} style={txt(210, 400, KF.titulo)} fill={KC.texto} stroke={KC.ink} strokeWidth={22} paintOrder="stroke">NIVEL {n}</text>
        <text x={-1000} y={yy + 130} style={txt(78, 900, KF.texto)} fill={KC.gold2} stroke={KC.ink} strokeWidth={16} paintOrder="stroke">{nom.toLowerCase()}</text>
      </g>; })}
      <text x={1530} y={620} style={txt(170, 400, KF.titulo)} fill={KC.yellow} stroke={KC.ink} strokeWidth={20} paintOrder="stroke">LA PUNTA</text>
      <path d="M 1500 560 L 1300 560 M 1350 500 L 1290 560 L 1350 620" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {/* luces detrás de cada dibujo al final (encendidos) */}
    {glow > 0 && [P.n1, P.pe, P.qu, P.br, P.ar, P.ho, P.la, P.se, P.ra].map((pp, i) => <circle key={i} cx={pp.x} cy={pp.y - 80} r={520} fill="#fff6c8" opacity={glow * 0.1 * (0.8 + 0.2 * Math.sin(T * 3 + i))} />)}
    <ParadaGancho T={T} K={K} zc={zc} />
    <ParadaN1 T={T} K={K} zc={zc} />
    <ParadaPe T={T} K={K} zc={zc} />
    <ParadaQu T={T} K={K} zc={zc} />
    <ParadaBr T={T} K={K} zc={zc} />
    <ParadaAr T={T} K={K} zc={zc} />
    <ParadaHo T={T} K={K} zc={zc} />
    <ParadaLa T={T} K={K} zc={zc} />
    <ParadaSe T={T} K={K} zc={zc} />
    <ParadaRa T={T} K={K} zc={zc} />
  </svg>;
}

function IcebergShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N1: CUES.Nivel1, Pe: CUES.Penicilina, Qu: CUES.Quitina, Br: CUES.Brillan, Ar: CUES.Armillaria, Pr: CUES.Pregunta, Ho: CUES.Hormiga,
    La: CUES.Lazos, Se: CUES.Sexos, Ra: CUES.Radiacion, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const empuja = (pp, dz = 0.03) => ({ ...pp, z: pp.z * (1 + dz) });
  const KEYS = [
    { t: 0, ...P.g }, { t: K.G + 2.6, x: P.g.x - 40, y: P.g.y + 120, z: 0.4 },
    { t: K.N1 + 0.5, ...P.n1 }, { t: K.Pe - 0.15, ...empuja(P.n1) },
    { t: K.Pe + 0.6, ...P.pe }, { t: K.Qu - 0.15, ...empuja(P.pe, 0.02) },
    { t: K.Qu + 0.7, ...P.qu }, { t: K.Br - 0.15, ...empuja(P.qu) },
    { t: K.Br + 0.75, ...P.br }, { t: K.Ar - 0.15, ...empuja(P.br) },
    { t: K.Ar + 0.75, ...P.ar }, { t: K.Pr - 0.1, ...empuja(P.ar) },
    { t: K.Pr + 1.0, ...P.pr }, { t: K.Ho - 0.1, ...empuja(P.pr, 0.04) },
    { t: K.Ho + 0.75, ...P.ho }, { t: K.La - 0.15, ...empuja(P.ho) },
    { t: K.La + 0.7, ...P.la }, { t: K.Se - 0.15, ...empuja(P.la) },
    { t: K.Se + 0.75, ...P.se }, { t: K.Ra - 0.15, ...empuja(P.se) },
    { t: K.Ra + 0.75, ...P.ra }, { t: K.Ci, ...empuja(P.ra) },
    { t: K.Ci + 2.3, ...P.ov }, { t: FIN, ...P.ov, z: P.ov.z * 1.02 },
  ];
  const zc = camaraEn(T, KEYS).z;
  const cierre = kprog(T, K.Ci + 1.2, K.Ci + 2.4);
  const bajo = kprog(T, K.G + 2.8, K.N1 + 0.4) * (1 - kprog(T, K.Ci + 0.5, K.Ci + 1.5));
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: KC.dark }}>
      <Camara T={T} keys={KEYS}><Mundo T={T} K={K} zc={zc} cierre={cierre} /></Camara>
      <Ambiente T={T} n={26} o={bajo * 0.7} color="rgba(220,245,255,.45)" vel={-26} />

      {/* re-gancho: la cámara se hunde */}
      {T > K.Pr + 0.5 && T < K.Ho + 0.6 && <div style={{ position: 'absolute', inset: 0, zIndex: 30, opacity: kprog(T, K.Pr + 0.5, K.Pr + 1.0) * (1 - kprog(T, K.Ho, K.Ho + 0.6)) }}>
        {fsvg(<Interrogacion T={T} x={290} y={1080} tam={460} color={KC.lilac} />, 30)}
      </div>}

      {/* textos en pantalla (la cámara está quieta en cada uno) */}
      <NumeroGigante T={T} at={K.Br + 2.0} until={K.Ar - 0.3} valor={TX.brillanN} dur={1.2} prefijo={TX.brillanPre} x={760} y={640} tam={150} color="#b9ff8a" />
      <Chip T={T} at={K.Br + 2.6} until={K.Ar - 0.3} texto={TX.brillanChip} x={740} y={760} tam={32} borde="#5dff6a" />
      <Chip T={T} at={K.Br + 3.4} until={K.Ar - 0.3} texto={TX.brillanNota} x={740} y={840} tam={24} borde={KC.lilac} mono />
      <TarjetaEstudio T={T} at={K.Ar + 0.2} until={K.Ar + 3.2} anio={TX.armAnio} quien={TX.armQuien} revista={TX.armRevista} x={340} y={480} />
      <Chip T={T} at={K.Ar + 3.4} until={K.Pr - 0.2} texto={TX.armArea} x={360} y={560} tam={38} borde={KC.gold} />
      <NumeroGigante T={T} at={K.Se + 4.0} until={K.Ra - 0.3} valor={TX.sexosN} dur={1.4} prefijo={TX.sexosPre} x={340} y={610} tam={120} color={KC.orange} />
      <Chip T={T} at={K.Se + 4.6} until={K.Ra - 0.3} texto={TX.sexosChip} x={360} y={712} tam={28} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Ra + 0.2} until={K.Ra + 2.2} anio={TX.radAnio} quien={TX.radQuien} revista={TX.radRevista} x={540} y={470} />
      <Chip T={T} at={K.Ra + 2.4} until={K.Ra + 5.3} texto={TX.negros} x={420} y={590} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ra + 5.6} until={K.Ci - 0.2} texto={TX.hipotesis} x={375} y={590} tam={28} borde={KC.yellow} />

      {/* barras de escala de pantalla (las demás van pegadas a cada dibujo) */}
      <BarraEscala T={T} at={K.G} until={K.G + 2.6} texto="champiñón · 5 cm" largo={150} y={1430} />
      <BarraEscala T={T} at={K.Ci + 1.8} until={K.Ou} texto="iceberg esquemático" largo={0} x={760} y={1810} />

      {SUBT.map((s, i) => { const a = [K.G, K.N1, K.Pe, K.Qu, K.Br, K.Ar, K.Pr, K.Ho, K.La, K.Se, K.Ra, K.Ci, K.Ou];
        return <Subtitulo key={i} T={T} idx={i} at={a[i] + 0.1} until={a[i + 1] - 0.1} texto={s} />; })}

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.N1 + 1.0, K.Pe - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Qu + 0.9, K.Br - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ar + 0.6, K.Pr - 0.5, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pr + 0.05, K.Ho + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ho + 0.7, K.La - 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Se + 0.8, K.Ra - 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ra + 3.3, K.Ci - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ci + 0.2, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="155" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function IcebergApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><IcebergShot /></CompositionStage></div>;
}
window.IcebergApp = IcebergApp;
