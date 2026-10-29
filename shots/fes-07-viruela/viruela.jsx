// Shot Festivo #07 · Día Mundial de la Ciencia para la Paz y el Desarrollo · Biotecnológico: la viruela — NARRADO (N1 "Por dentro" + N3 capítulos).
// Guion, fuentes y verificación: guion.md y verificacion.md. El dibujo es esquemático (virus, células, piel, mapas y personajes simplificados).
const PIEL = '#e9b48f', PIEL2 = '#d3966f', PIEL3 = '#f4cfb4', BLUSA = '#7b5ea7', BLUSA2 = '#5f4688';
const VARIOLA = '#ff5a4e', VACCINIA = '#2fe0a8', OCEANO = '#3aa0ff', TIERRA = '#7ed36b';
const ROJO_URSS = '#d7262e', AZUL_EU = '#2b3f8f';

/* ---------- el brazo de la abuela (hombro y brazo, de frente) ----------
   centro local (0,0) a media altura; la marquita vive en (0,-190). manga 0..1: 0 tapa la marca, 1 arremangada. */
const MARCA = { x: 0, y: -190 };
function Brazo({ T, x, y, s = 1, manga = 1, cicatriz = 1, dorado = 0, children }) {
  const yManga = klerp(40, -360, manga);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* torso con blusa detrás */}
    <path d="M 150 -470 C 260 -520 520 -520 640 -470 L 700 700 L 150 700 Z" fill={BLUSA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 330 -500 Q 400 -430 470 -500" stroke={KC.ink} strokeWidth={8} fill={PIEL} />
    {/* brazo */}
    <path d="M -200 -360 C -230 -520 120 -580 190 -420 C 220 -300 200 -100 180 120 C 170 300 150 450 130 640 L -150 640 C -170 420 -190 220 -205 40 C -215 -120 -215 -260 -200 -360 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -150 -300 C -170 -120 -170 120 -140 420" stroke={PIEL3} strokeWidth={26} fill="none" strokeLinecap="round" opacity=".55" />
    {/* arruguitas de abuela */}
    {[[-120, 260], [-60, 300], [40, 230], [90, 330]].map(([ax, ay], i) => <path key={i} d={`M ${ax} ${ay} q 26 -10 52 0`} stroke={PIEL2} strokeWidth={5} fill="none" strokeLinecap="round" opacity=".7" />)}
    {/* la marquita: redonda, hundida y más clara que la piel */}
    <g transform={`translate(${MARCA.x} ${MARCA.y})`} opacity={cicatriz}>
      {dorado > 0 && <circle r={58 + 6 * Math.sin(T * 5)} fill="none" stroke={KC.gold2} strokeWidth={9} opacity={dorado} />}
      <ellipse rx={36} ry={32} fill={PIEL3} stroke={PIEL2} strokeWidth={5} />
      <path d="M -26 -10 A 30 26 0 0 1 26 -10" stroke={PIEL2} strokeWidth={5} fill="none" opacity=".8" />
      {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 18} cy={Math.sin(a) * 15 + 4} r={3.2} fill={PIEL2} opacity=".7" />; })}
    </g>
    {children}
    {/* manga de la blusa con dobleces (se arremanga) */}
    <path d={`M -215 -380 C -235 -540 140 -600 205 -430 L 200 ${yManga} L -212 ${yManga + 20} Z`} fill={BLUSA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-222} y={yManga - 18} width={428} height={52} rx={22} fill={BLUSA2} stroke={KC.ink} strokeWidth={8} transform={`rotate(2 0 ${yManga})`} />
    {[0, 1].map((k) => <path key={k} d={`M -200 ${yManga - 70 - k * 60} q 200 ${-20 + k * 8} 400 0`} stroke={BLUSA2} strokeWidth={6} fill="none" opacity={manga} />)}
  </g>;
}

/* ---------- virus de la familia orthopox: ladrillo redondeado (~250 × 200 nm), núcleo en forma de pesa y cuerpos laterales ---------- */
function Virion({ T = 0, x, y, s = 1, color = VACCINIA, rot = 0, seed = 1, brillo = 0 }) {
  const g = krng(seed), resp = 1 + 0.02 * Math.sin(T * 3 + seed);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * resp})`}>
    {brillo > 0 && <rect x={-160} y={-134} width={320} height={268} rx={110} fill={color} opacity={0.18 * brillo} />}
    <rect x={-130} y={-104} width={260} height={208} rx={70} fill={mixHex(color, '#ffffff', 0.35)} stroke={KC.ink} strokeWidth={8} />
    {/* túbulos de la superficie */}
    {Array.from({ length: 26 }, (_, i) => { const px = -100 + g() * 200, py = -80 + g() * 160; return <path key={i} d={`M ${px} ${py} q 8 -8 16 0 t 16 0`} stroke={mixHex(color, '#000000', 0.25)} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".55" />; })}
    {/* núcleo en pesa (bicóncavo) */}
    <path d="M -80 -50 C -30 -26 30 -26 80 -50 C 96 -20 96 20 80 50 C 30 26 -30 26 -80 50 C -96 20 -96 -20 -80 -50 Z" fill={mixHex(color, '#000000', 0.35)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -60 -6 Q 0 10 60 -6" stroke={mixHex(color, '#ffffff', 0.5)} strokeWidth={6} fill="none" opacity=".7" />
    {/* cuerpos laterales */}
    <ellipse cx={0} cy={-62} rx={44} ry={13} fill={mixHex(color, '#000000', 0.2)} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={62} rx={44} ry={13} fill={mixHex(color, '#000000', 0.2)} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// virus en miniatura (escala celular): puntito con forma de ladrillo
function Virito({ x, y, color = VACCINIA, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-9} y={-7} width={18} height={14} rx={5} fill={color} stroke={KC.ink} strokeWidth={2.5} /><circle r={11} fill={color} opacity=".25" /></g>;
}
// linfocito (célula de defensa): núcleo grande; anticuerpos en la superficie si es B
function Linfocito({ T, x, y, r = 46, color = '#b18cff', on = 0, dormido = 0, seed = 1 }) {
  const w = Math.sin(T * 2 + seed) * 3;
  return <g transform={`translate(${x} ${y})`}>
    {on > 0 && <circle r={r + 26} fill={KC.gold2} opacity={0.25 * on} />}
    {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + seed; return <path key={i} d={`M ${Math.cos(a) * r} ${Math.sin(a) * r} L ${Math.cos(a) * (r + 12)} ${Math.sin(a) * (r + 12)} M ${Math.cos(a) * (r + 12)} ${Math.sin(a) * (r + 12)} l ${Math.cos(a + 0.6) * 8} ${Math.sin(a + 0.6) * 8} M ${Math.cos(a) * (r + 12)} ${Math.sin(a) * (r + 12)} l ${Math.cos(a - 0.6) * 8} ${Math.sin(a - 0.6) * 8}`} stroke={on > 0.5 ? KC.gold2 : '#e4dcff'} strokeWidth={3.5} strokeLinecap="round" fill="none" />; })}
    <circle r={r + w * 0.3} fill={mixHex(color, KC.gold2, on)} stroke={KC.ink} strokeWidth={5} opacity={1 - dormido * 0.45} />
    <circle cx={4} cy={-3} r={r * 0.68} fill={mixHex('#5b3fa0', '#a8741a', on)} opacity={0.9 - dormido * 0.4} />
    <circle cx={-r * 0.35} cy={-r * 0.4} r={r * 0.16} fill="#fff" opacity=".45" />
  </g>;
}
// anticuerpo (Y)
function Anticuerpo({ x, y, rot = 0, s = 1, color = KC.yellow }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><path d="M 0 18 L 0 0 L -12 -16 M 0 0 L 12 -16" stroke={KC.ink} strokeWidth={9} strokeLinecap="round" fill="none" /><path d="M 0 18 L 0 0 L -12 -16 M 0 0 L 12 -16" stroke={color} strokeWidth={5} strokeLinecap="round" fill="none" /></g>;
}

/* ---------- personitas, globo, banderas ---------- */
function Persona({ x, y, s = 1, apaga = 0, color = KC.ink }) {
  const c = mixHex(color, '#9a9a9a', apaga);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - apaga * 0.55}>
    <circle cx={0} cy={-92} r={34} fill={c} />
    <path d="M -52 60 L -52 -16 Q -52 -50 -18 -50 L 18 -50 Q 52 -50 52 -16 L 52 60 Z" fill={c} />
  </g>;
}
const CONTINENTES = [[-0.55, -0.35, 0.32, 0.22], [-0.35, 0.25, 0.18, 0.34], [0.15, -0.2, 0.2, 0.3], [0.32, 0.2, 0.16, 0.2], [0.55, -0.3, 0.3, 0.2], [0.85, 0.3, 0.14, 0.1]];
function Globo({ T, x, y, r = 240, puntos = 1, id = 'g', limpia = 0 }) {
  const gira = (T * 0.06) % 2;
  const g = krng(41), dots = Array.from({ length: 22 }, (_, i) => [g() * 2 - 1, g() * 1.4 - 0.7, g()]);
  const pos = (u) => { let v = ((u + gira + 1) % 2) - 1; return v; };
  return <g transform={`translate(${x} ${y})`}>
    <clipPath id={`clip-${id}`}><circle r={r} /></clipPath>
    <circle r={r + 10} fill={KC.ink} />
    <circle r={r} fill={OCEANO} />
    <g clipPath={`url(#clip-${id})`}>
      {[0, 2].map((off) => CONTINENTES.map(([cx, cy, rx, ry], i) => { const px = pos(cx + off) * r * 1.3; return <ellipse key={off + '-' + i} cx={px} cy={cy * r} rx={rx * r} ry={ry * r} fill={TIERRA} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 23} ${px} ${cy * r})`} />; }))}
      {dots.map(([dx, dy, ph], i) => { const px = pos(dx) * r * 1.3, o = kclamp(puntos * 1.4 - ph * 0.8 * (1 - puntos), 0, 1) * (Math.abs(px) < r ? 1 : 0);
        return <g key={i} opacity={o}><circle cx={px} cy={dy * r} r={13 + 3 * Math.sin(T * 6 + i)} fill={VARIOLA} stroke={KC.ink} strokeWidth={3} /></g>; })}
      <circle cx={-r * 0.35} cy={-r * 0.4} r={r * 0.5} fill="#fff" opacity={0.12} />
    </g>
    {limpia > 0 && <circle r={r + 24} fill="none" stroke={KC.gold2} strokeWidth={10} opacity={limpia} strokeDasharray={`${limpia * 6.3 * (r + 24)} 9999`} transform="rotate(-90)" />}
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
function BanderaURSS({ x, y, s = 1, ond = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-10} width={12} height={300} rx={6} fill="#6b4226" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 6 0 Q 80 ${-14 + ond} 170 0 L 170 120 Q 80 ${106 + ond} 6 120 Z`} fill={ROJO_URSS} stroke={KC.ink} strokeWidth={6} />
    <path d="M 40 22 l 6 14 l 15 1 l -12 9 l 4 15 l -13 -8 l -13 8 l 4 -15 l -12 -9 l 15 -1 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />
  </g>;
}
function BanderaEU({ x, y, s = 1, ond = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-10} width={12} height={300} rx={6} fill="#6b4226" stroke={KC.ink} strokeWidth={5} />
    <clipPath id={`eu-${x}`}><path d={`M 6 0 Q 80 ${-14 + ond} 170 0 L 170 120 Q 80 ${106 + ond} 6 120 Z`} /></clipPath>
    <g clipPath={`url(#eu-${x})`}>
      <rect x={6} y={-20} width={170} height={150} fill="#fff" />
      {[0, 2, 4, 6].map((k) => <rect key={k} x={6} y={-20 + k * 21} width={170} height={17} fill={KC.red} />)}
      <rect x={6} y={-20} width={72} height={74} fill={AZUL_EU} />
      {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={20 + (k % 3) * 22} cy={4 + Math.floor(k / 3) * 22} r={4} fill="#fff" />)}
    </g>
    <path d={`M 6 0 Q 80 ${-14 + ond} 170 0 L 170 120 Q 80 ${106 + ond} 6 120 Z`} fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// dos manos que se saludan (manga roja y manga azul)
function Saludo({ T, x, y, p = 1, s = 1 }) {
  const d = klerp(380, 0, p);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${-d} 0)`}>
      <rect x={-470} y={-50} width={330} height={100} rx={30} fill={ROJO_URSS} stroke={KC.ink} strokeWidth={8} />
      <rect x={-170} y={-60} width={40} height={120} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <path d="M -135 -46 C -60 -66 10 -50 40 -22 C 52 -10 40 6 22 0 L -20 -10 L -20 40 Q -60 60 -135 46 Z" fill={PIEL} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </g>
    <g transform={`translate(${d} 0) scale(-1 1)`}>
      <rect x={-470} y={-50} width={330} height={100} rx={30} fill={AZUL_EU} stroke={KC.ink} strokeWidth={8} />
      <rect x={-170} y={-60} width={40} height={120} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <path d="M -135 -46 C -60 -66 10 -50 40 -22 C 52 -10 40 6 22 0 L -20 -10 L -20 40 Q -60 60 -135 46 Z" fill="#c98f68" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[0, 1, 2].map((k) => <path key={k} d={`M ${-10 + k * 14} 26 q 14 6 26 -2`} stroke={KC.ink} strokeWidth={5} fill="none" opacity={p} />)}
    </g>
    {p > 0.95 && Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2, u = ((T * 1.5) % 1); return <line key={i} x1={Math.cos(a) * (90 + u * 40)} y1={Math.sin(a) * (90 + u * 40)} x2={Math.cos(a) * (120 + u * 60)} y2={Math.sin(a) * (120 + u * 60)} stroke={KC.gold2} strokeWidth={8} strokeLinecap="round" opacity={1 - u} />; })}
  </g>;
}

/* ---------- laboratorio ---------- */
// frasco de vacuna liofilizada (polvo) con tapa
function Frasco({ x, y, s = 1, tapa = KC.red, estrella = false, polvo = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-34} y={-70} width={68} height={130} rx={14} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-28} y={10} width={56} height={44} rx={8} fill="#f3e6c4" opacity={polvo} />
    <rect x={-22} y={-96} width={44} height={30} rx={6} fill={tapa} stroke={KC.ink} strokeWidth={5} />
    <rect x={-34} y={-36} width={68} height={30} fill="#fff" stroke={KC.ink} strokeWidth={3} />
    {estrella && <path d="M 0 -32 l 4 8 l 9 1 l -7 6 l 2 9 l -8 -5 l -8 5 l 2 -9 l -7 -6 l 9 -1 Z" fill={ROJO_URSS} />}
  </g>;
}
function Maletin({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -90 L -50 -120 Q -50 -134 -36 -134 L 36 -134 Q 50 -134 50 -120 L 50 -90" stroke={KC.ink} strokeWidth={12} fill="none" />
    <rect x={-150} y={-92} width={300} height={190} rx={22} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-20} width={300} height={14} fill="#5c3517" />
    <text x={0} y={70} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={3} paintOrder="stroke">CDC</text>
  </g>;
}
// aguja bifurcada (horquilla de 2 puntas) vertical; punta en (0,0). gota 0..1
function AgujaBif({ x, y, s = 1, rot = 0, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-9} y={-560} width={18} height={480} rx={8} fill="#c9ced8" stroke={KC.ink} strokeWidth={5} />
    <path d="M -9 -90 C -9 -60 -30 -50 -30 -20 L -26 0 L -18 -24 C -16 -44 -6 -54 0 -60 C 6 -54 16 -44 18 -24 L 26 0 L 30 -20 C 30 -50 9 -60 9 -90 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {gota > 0 && <ellipse cx={0} cy={-26} rx={16 * gota} ry={20 * gota} fill="#8fd8ff" stroke={KC.ink} strokeWidth={3} opacity=".95" />}
  </g>;
}
// casita vista desde arriba
function Casa({ x, y, s = 1, estado = 0, caso = 0, T }) {
  const techo = caso > 0 ? mixHex('#c4815a', VARIOLA, caso) : mixHex('#c4815a', VACCINIA, estado);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {caso > 0 && <circle r={70 + 10 * Math.sin(T * 7)} fill={VARIOLA} opacity={0.25 * caso} />}
    {estado > 0 && <circle r={64} fill="none" stroke={VACCINIA} strokeWidth={6} opacity={estado} />}
    <rect x={-44} y={-44} width={88} height={88} rx={6} fill={techo} stroke={KC.ink} strokeWidth={6} />
    <path d="M -44 -44 L 44 44 M 44 -44 L -44 44" stroke="rgba(0,0,0,.25)" strokeWidth={4} />
  </g>;
}

/* ---------- mapa esquemático de África (contorno simplificado a mano) ---------- */
const AF_K = 9, afP = (lon, lat) => [(lon + 18) * AF_K, (38 - lat) * AF_K];
const AFRICA = [[-17,21],[-16,28],[-10,30],[-6,35.8],[10,37],[11,33.5],[20,31],[25,31.5],[32,31.2],[34,28],[37,22],[39,16],[43,12.5],[51,11.8],[51,10],[48,5],[44,0],[40,-3],[39,-7],[40,-11],[40.5,-15],[35,-20],[35,-24],[32.5,-26],[31,-29.5],[27,-33.5],[20,-34.8],[18,-32],[16,-28.5],[14.5,-23],[12,-17],[13.5,-11],[12,-6],[9,-1],[9.5,3.5],[6,4.3],[2,6.3],[-4,5.2],[-7.5,4.4],[-11,6.8],[-13.5,9.5],[-17,14.5]];
const SOMALIA = [[41,-1.6],[41,2.8],[42,4],[44,4.9],[45.9,5.5],[48,8],[48.9,11.3],[51.2,11.8],[51,10.4],[50.5,9],[48.9,5.5],[47.9,4.3],[46,2],[43.5,0],[42,-1]];
const afPath = (pts) => 'M ' + pts.map(([a, b]) => afP(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function MapaAfrica({ T, x, y, s = 1, somalia = 1, merca = 1 }) {
  const [mx, my] = afP(44.77, 1.71);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={afPath(AFRICA)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={afPath(SOMALIA)} fill={mixHex('#ffe9a8', KC.coral, somalia)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {merca > 0 && <g transform={`translate(${mx} ${my})`} opacity={merca}>
      <circle r={22 + 10 * Math.abs(Math.sin(T * 4))} fill="none" stroke={VARIOLA} strokeWidth={6} />
      <circle r={11} fill={VARIOLA} stroke={KC.ink} strokeWidth={3} />
    </g>}
  </g>;
}

/* ---------- piel en corte (escala de células) ---------- */
function CortePiel({ T, a, vesicula = 0, virus = 0, linfos = 0, foto = 0 }) {
  const cel = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) {
    const cx = 60 + c * 108 + (r % 2) * 54, cy = 690 + r * 62, d = Math.hypot(cx - 640, cy - 700);
    const inf = virus * kclamp(1.6 - d / 260, 0, 1);
    cel.push(<g key={r + '-' + c}><ellipse cx={cx} cy={cy - (d < 200 ? vesicula * (200 - d) * 0.35 : 0)} rx={50} ry={28} fill={mixHex('#f2a7a1', '#bff5df', inf)} stroke={KC.ink} strokeWidth={4} />
      <circle cx={cx + 6} cy={cy - (d < 200 ? vesicula * (200 - d) * 0.35 : 0)} r={9} fill={mixHex('#a84a63', '#1d8f6c', inf)} /></g>);
  }
  const lx = (i) => klerp(300 + i * 220, 520 + i * 110, linfos), ly = (i) => klerp(1080, 820 + (i % 2) * 40, linfos);
  return <g>
    {/* dermis */}
    <rect x={0} y={860} width={KW} height={360} fill="#4a2a3a" />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-40 + i * 130} ${900 + (i % 3) * 40} q 60 30 120 0 t 120 0`} stroke="#6f4258" strokeWidth={6} fill="none" />)}
    {/* capilar con glóbulos rojos */}
    <rect x={0} y={1060} width={KW} height={60} rx={30} fill="#7a2030" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const gx = ((i * 140 + T * 160) % (KW + 140)) - 70; return <ellipse key={i} cx={gx} cy={1090} rx={26} ry={16} fill={KC.red} stroke={KC.ink} strokeWidth={3} />; })}
    {/* epidermis */}
    <path d={`M 0 640 L 470 640 Q 640 ${640 - vesicula * 120} 810 640 L ${KW} 640 L ${KW} 880 L 0 880 Z`} fill="#c97a7a" />
    {cel}
    <path d={`M 0 640 L 470 640 Q 640 ${640 - vesicula * 120} 810 640 L ${KW} 640`} stroke="#f7d9c6" strokeWidth={18} fill="none" />
    {/* virus de la vacuna dentro de la piel */}
    {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 5); const vx = 640 + (g() - 0.5) * 380, vy = 660 + g() * 170; return <Virito key={i} x={vx + Math.sin(T * 2 + i) * 6} y={vy} o={kclamp(virus * 3 - i * 0.12, 0, 1)} s={1.1} />; })}
    {/* linfocitos que llegan del capilar */}
    {linfos > 0 && [0, 1, 2].map((i) => <Linfocito key={i} T={T} x={lx(i)} y={ly(i)} r={40} seed={i} on={foto} color={i === 1 ? '#7fb8ff' : '#b18cff'} />)}
    {foto > 0 && [0, 1, 2].map((i) => <circle key={'f' + i} cx={lx(i)} cy={ly(i)} r={40 + foto * 70} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - foto} />)}
  </g>;
}

function Viruela() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Viruela, Va: CUES.Vaccinia, Gr: CUES.Granito, Me: CUES.Memoria, Co: CUES.Costra, P: CUES.Pregunta, Pr: CUES.Propuesta, Ri: CUES.Rivales, Ag: CUES.Aguja, An: CUES.Anillo, Ul: CUES.Ultimo, Li: CUES.Libre, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const BX = 360, BY = 1010; // brazo en el gancho y en el cierre
  const MX = BX + MARCA.x, MY = BY + MARCA.y;
  const brazoGancho = (Tl) => <svg width={KW} height={KH}><Brazo T={Tl} x={BX} y={BY} manga={kprog(Tl, K.G, K.G + 0.6, kEase.sale)} /></svg>;
  // apagado de las personitas (3 de 10)
  const apaga = (i) => kprog(T, K.V + 0.6 + [0, 0.5, 1.0][i], K.V + 0.9 + [0, 0.5, 1.0][i]);
  // etapas de la marca (escena Costra): día 3–5 granito → ampolla → pústula → costra → se cae → marquita
  const dia = klerp(3, 21, kprog(T, K.Co + 0.1, K.Co + 2.9));
  const casas = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + 0.2; return [560 + Math.cos(a) * 210, 930 + Math.sin(a) * 210]; });
  const lejos = Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * Math.PI * 2 + 0.55; return [560 + Math.cos(a) * 400, 930 + Math.sin(a) * 360]; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la manga se arremanga y aparece la marquita */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.05} origen="35% 45%">
        <FondoLunares color={KC.pink} />
        {svg(<Brazo T={T} x={BX} y={BY} manga={kprog(T, K.G, K.G + 0.6, kEase.sale)} />)}
        <Lupa T={T} at={K.G + 0.9} until={K.V - 0.3} x={790} y={1060} r={165} zoom={2.6} fx={MX} fy={MY} render={brazoGancho} />
      </Escena>
      {/* 1 · la viruela mataba a 3 de cada 10 enfermos */}
      <Escena T={T} a={K.V} b={K.Va}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{Array.from({ length: 10 }, (_, i) => { const k = [2, 5, 9].indexOf(i); return <Persona key={i} x={150 + (i % 5) * 195} y={i < 5 ? 830 : 1110} s={0.95} apaga={k >= 0 ? apaga(k) : 0} />; })}</>)}
      </Escena>
      {/* 2 · al microscopio electrónico: variola y vaccinia, parientes (~250 × 200 nm) */}
      <Escena T={T} a={K.Va} b={K.Gr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(120,200,255,.22)" />
        {svg(<>
          <g opacity={kprog(T, K.Va + 0.1, K.Va + 0.5)}><Virion T={T} x={290} y={880} color={VARIOLA} rot={-6} seed={3} /></g>
          <g opacity={kprog(T, K.Va + 0.9, K.Va + 1.3)}><Virion T={T} x={790} y={880} color={VACCINIA} rot={5} seed={8} brillo={kprog(T, K.Va + 1.3, K.Va + 2)} /></g>
          <path d="M 290 740 C 330 560 750 560 790 740" stroke={KC.gold2} strokeWidth={7} fill="none" strokeDasharray="1400" strokeDashoffset={1400 * (1 - kprog(T, K.Va + 2.2, K.Va + 3.0))} strokeLinecap="round" />
        </>)}
      </Escena>
      {/* 3 · la vacuna en la piel: granito y defensas que aprenden su forma */}
      <Escena T={T} a={K.Gr} b={K.Me} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<CortePiel T={T} virus={kprog(T, K.Gr + 0.1, K.Gr + 0.9)} vesicula={kprog(T, K.Gr + 0.8, K.Gr + 1.8, kEase.suave)} linfos={kprog(T, K.Gr + 1.5, K.Gr + 2.6, kEase.suave)} foto={kprog(T, K.Gr + 2.6, K.Gr + 3.3)} />)}
      </Escena>
      {/* 4 · memoria: si llega la viruela, la reconocen y la atacan rápido */}
      <Escena T={T} a={K.Me} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} color="rgba(177,140,255,.2)" />
        {svg((() => {
          const llega = kprog(T, K.Me + 0.2, K.Me + 1.2, kEase.sale), on = kprog(T, K.Me + 1.0, K.Me + 1.5), dispara = kprog(T, K.Me + 1.5, K.Me + 2.5, kEase.suave), apag = kprog(T, K.Me + 2.4, K.Me + 3.2);
          const memo = [[330, 760], [520, 700], [700, 790], [420, 950], [640, 980], [800, 1010], [280, 1060]];
          const vir = Array.from({ length: 7 }, (_, i) => [klerp(-60, 260 + (i % 4) * 150, llega), 760 + (i % 3) * 140 + Math.sin(T * 2 + i) * 10]);
          return <>
            <path d="M 120 880 C 120 560 520 560 560 640 C 600 560 980 580 980 880 C 980 1180 600 1240 540 1150 C 480 1240 120 1200 120 880 Z" fill="rgba(177,140,255,.10)" stroke="#b18cff" strokeWidth={6} strokeDasharray="18 12" />
            {memo.map(([mx, my], i) => <g key={i}><Linfocito T={T} x={mx} y={my} r={44} seed={i} on={on} dormido={1 - on} />
              {on < 0.5 && <text x={mx + 40} y={my - 50} style={{ font:`700 30px ${KF.mono}` }} fill="#cfc2ff" opacity={0.8 * (1 - on * 2)}>z</text>}</g>)}
            {vir.map(([vx, vy], i) => <Virito key={i} x={vx} y={vy} color={mixHex(VARIOLA, '#777777', apag)} s={1.6} o={1 - apag * 0.6} />)}
            {dispara > 0 && vir.map(([vx, vy], i) => { const [mx, my] = memo[i % memo.length]; return [0, 1].map((k) => { const u = kclamp(dispara * 1.3 - k * 0.25, 0, 1); return <Anticuerpo key={i + '-' + k} x={klerp(mx, vx + (k ? 16 : -16), u)} y={klerp(my, vy - 14, u)} rot={u * 180 + k * 40} s={1.3} />; }); })}
          </>;
        })())}
      </Escena>
      {/* 5 · de regreso al brazo: granito → ampolla → costra → se cae → marquita */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {svg((() => {
          const e1 = kprog(T, K.Co + 0.1, K.Co + 0.6), e2 = kprog(T, K.Co + 0.7, K.Co + 1.1), e3 = kprog(T, K.Co + 1.2, K.Co + 1.6), e4 = kprog(T, K.Co + 1.7, K.Co + 2.1), cae = kprog(T, K.Co + 2.3, K.Co + 2.9, (p) => p * p);
          const cx = 540, cy = 860;
          return <>
            <g transform={`translate(${cx} ${cy}) scale(2.3) translate(${-MARCA.x} ${-MARCA.y})`}><Brazo T={T} x={0} y={0} manga={1} cicatriz={cae} /></g>
            {/* granito y ampolla (esquemáticos, sin detalles crudos) */}
            <g transform={`translate(${cx} ${cy})`} opacity={1 - e4}>
              <circle r={60 + 40 * e2} fill="#f39a9a" opacity={0.45 * e1} />
              <circle r={22 + 34 * e2} fill={mixHex('#ef8f8f', mixHex('#fff6e8', '#f6e3a8', e3), e2)} stroke={PIEL2} strokeWidth={5} opacity={e1} />
              <ellipse cx={-14} cy={-18} rx={14 * e2} ry={9 * e2} fill="#fff" opacity={0.7 * e2} />
            </g>
            {/* costra que se cae */}
            {e4 > 0 && <g transform={`translate(${cx + cae * 120} ${cy + cae * 700}) rotate(${cae * 220})`} opacity={1 - kprog(T, K.Co + 2.7, K.Co + 3.0)}>
              <ellipse rx={58} ry={50} fill="#8a5a3c" stroke={KC.ink} strokeWidth={5} opacity={e4} />
              <path d="M -30 -10 q 20 -16 40 0 M -20 18 q 16 -10 34 0" stroke="#5e3a24" strokeWidth={5} fill="none" opacity={e4} />
            </g>}
          </>;
        })())}
      </Escena>
      {/* 6 · re-gancho: ¿cómo se borra del planeta en plena Guerra Fría? */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Globo T={T} x={330} y={860} r={230} id="p" />
          <text x={600} y={760} textAnchor="middle" style={{ font:`400 330px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 600 660)`} opacity={kprog(T, K.P + 0.1, K.P + 0.4)}>?</text>
          <g opacity={kprog(T, K.P + 0.8, K.P + 1.3)}><BanderaURSS x={110} y={1420} s={1.05} ond={Math.sin(T * 3) * 10} /></g>
          <g opacity={kprog(T, K.P + 1.1, K.P + 1.6)}><g transform="translate(980 0) scale(-1 1)"><BanderaEU x={0} y={1420} s={1.05} ond={Math.sin(T * 3 + 1) * 10} /></g></g>
        </>)}
      </Escena>
      {/* 7 · 1958: propuesta soviética en la Asamblea Mundial de la Salud (Minneapolis) */}
      <Escena T={T} a={K.Pr} b={K.Ri}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform={`translate(0 ${klerp(60, 0, kprog(T, K.Pr, K.Pr + 0.6, kEase.sale))})`}>
          {/* delegado (silueta, sin retrato) */}
          <circle cx={540} cy={860} r={70} fill="#3b2f2a" />
          <path d="M 420 1100 L 420 1000 Q 420 940 480 940 L 600 940 Q 660 940 660 1000 L 660 1100 Z" fill="#2b2f3a" />
          <path d="M 520 940 L 540 1010 L 560 940 Z" fill="#fff" /><path d="M 534 950 L 540 1000 L 546 950 Z" fill={ROJO_URSS} />
          <rect x={565} y={985} width={70} height={40} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={3} />
          {/* atril */}
          <path d="M 360 1060 L 720 1060 L 680 1240 L 400 1240 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <rect x={430} y={1110} width={220} height={70} rx={10} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
          <text x={540} y={1158} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Asamblea</text>
          <path d="M 600 1060 Q 610 990 590 960" stroke={KC.ink} strokeWidth={7} fill="none" /><ellipse cx={588} cy={952} rx={14} ry={20} fill="#3b3f4a" stroke={KC.ink} strokeWidth={4} />
        </g>)}
      </Escena>
      {/* 8 · rivales: dosis soviéticas y expertos de EE.UU.; se dan la mano */}
      <Escena T={T} a={K.Ri} b={K.Ag}>
        <FondoLunares color={KC.mint} />
        {svg((() => {
          const sale = kprog(T, K.Ri + 3.3, K.Ri + 3.8), salu = kprog(T, K.Ri + 3.6, K.Ri + 4.6, kEase.suave);
          const n = Math.round(kprog(T, K.Ri + 0.3, K.Ri + 2.6) * 15);
          return <>
            <g opacity={1 - sale}>
              {Array.from({ length: n }, (_, i) => <Frasco key={i} x={110 + (i % 5) * 86} y={1100 - Math.floor(i / 5) * 150} s={0.95} estrella={true} />)}
              <g opacity={kprog(T, K.Ri + 1.6, K.Ri + 2.1)}><Maletin x={780} y={960} s={0.9} /><Maletin x={850} y={1120} s={0.75} /></g>
            </g>
            {salu > 0 && <Saludo T={T} x={540} y={900} p={salu} s={0.95} />}
          </>;
        })())}
      </Escena>
      {/* 9 · la aguja bifurcada: una gotita entre las puntas, 15 piquetitos, rinde 4 veces más */}
      <Escena T={T} a={K.Ag} b={K.An}>
        <FondoLunares color={KC.yellow} />
        {svg((() => {
          const baja = kprog(T, K.Ag + 0.1, K.Ag + 0.7, kEase.suave), sube = kprog(T, K.Ag + 0.9, K.Ag + 1.5, kEase.suave);
          const ay = klerp(560, 980, baja) - klerp(0, 420, sube);
          const piq = Math.floor(kprog(T, K.Ag + 2.3, K.Ag + 3.4) * 15);
          const enPiel = kprog(T, K.Ag + 1.9, K.Ag + 2.3);
          return <>
            <Frasco x={300} y={1060} s={2.4} tapa={KC.red} polvo={0} />
            <ellipse cx={300} cy={1150} rx={64} ry={14} fill="#8fd8ff" opacity=".8" />
            <g opacity={1 - enPiel}><AgujaBif x={300} y={ay} s={1.15} gota={sube > 0.2 ? 1 : 0} /></g>
            {/* parche de piel del brazo: 15 piquetitos en un círculo de ~5 mm */}
            <g opacity={enPiel}>
              <circle cx={760} cy={880} r={200} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
              <circle cx={760} cy={880} r={70} fill="none" stroke={PIEL2} strokeWidth={4} strokeDasharray="10 10" />
              {Array.from({ length: piq }, (_, i) => { const g = krng(i + 31), a = g() * Math.PI * 2, rr = Math.sqrt(g()) * 58; return <circle key={i} cx={760 + Math.cos(a) * rr} cy={880 + Math.sin(a) * rr} r={6} fill="#c0504d" />; })}
              <AgujaBif x={760 + (piq % 3) * 12 - 12} y={880 - 10 - 40 * Math.abs(Math.sin(T * 14))} s={0.75} rot={0} />
            </g>
          </>;
        })())}
      </Escena>
      {/* 10 · vigilancia y contención: se vacuna a los contactos, como un anillo */}
      <Escena T={T} a={K.An} b={K.Ul}>
        <FondoLunares color={KC.lilac} />
        {svg((() => {
          const anillo = kprog(T, K.An + 0.9, K.An + 2.6), apag = kprog(T, K.An + 2.8, K.An + 3.6);
          return <>
            {lejos.map(([hx, hy], i) => <Casa key={'l' + i} T={T} x={hx} y={hy} s={0.8} />)}
            <circle cx={560} cy={930} r={210} fill="none" stroke={VACCINIA} strokeWidth={10} strokeDasharray={`${anillo * 1320} 9999`} transform="rotate(-90 560 930)" opacity=".9" />
            {casas.map(([hx, hy], i) => <Casa key={i} T={T} x={hx} y={hy} s={0.85} estado={kclamp(anillo * 8 - i, 0, 1)} />)}
            <Casa T={T} x={560} y={930} s={1.05} caso={1 - apag} estado={apag} />
          </>;
        })())}
      </Escena>
      {/* 11 · el último caso natural: Merca, Somalia, octubre de 1977 */}
      <Escena T={T} a={K.Ul} b={K.Li}>
        <FondoLunares color="#f3d9a4" punto="rgba(255,255,255,.4)" />
        {svg(<MapaAfrica T={T} x={190} y={430} s={1.06} somalia={kprog(T, K.Ul + 0.6, K.Ul + 1.1)} merca={kprog(T, K.Ul + 1.0, K.Ul + 1.4)} />)}
      </Escena>
      {/* 12 · 1980: el mundo, libre de viruela */}
      <Escena T={T} a={K.Li} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<Globo T={T} x={460} y={900} r={250} id="l" puntos={1 - kprog(T, K.Li + 0.3, K.Li + 2.4)} limpia={kprog(T, K.Li + 2.4, K.Li + 3.2)} />)}
      </Escena>
      {/* 13 · cierre: la misma marquita del inicio, ahora como recuerdo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="35% 45%">
        <FondoLunares color={KC.pink} />
        {svg(<Brazo T={T} x={BX} y={BY} manga={1} dorado={kprog(T, K.Ci + 0.3, K.Ci + 1.0)} />)}
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={790} y={1060} r={175} fx={MX} fy={MY} tinte={KC.gold2} etiqueta="un mundo sin viruela"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><Globo T={Tl} x={r} y={r * 0.9} r={r * 0.55} id="c" puntos={0} limpia={1} />
            <g transform={`translate(${r} ${r * 1.62}) scale(0.32)`}><Saludo T={Tl} x={0} y={0} p={1} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.G + 0.3, titulo: 'La marca' }, { at: K.Va, titulo: 'La vacuna' }, { at: K.P, titulo: 'Dos rivales' }, { at: K.An, titulo: 'Cero casos' }]} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.5} texto="¿lunar?" x={300} y={440} tam={52} />
      <Etq T={T} at={K.G + 1.8} until={K.V - 0.3} x={60} y={440} texto="cicatriz de vacuna" tam={40} color={KC.yellow} />
      <Etq T={T} at={K.G + 2.4} until={K.V - 0.3} x={60} y={1440} texto="si se vacunó antes de ~1975" tam={32} color={KC.texto} />
      <Chip T={T} at={K.G + 0.2} until={K.V - 0.2} texto="Especial · Día de la Ciencia para la Paz" x={540} y={1560} tam={36} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.V + 0.3} until={K.Va - 0.2} valor={3} desde={0} dur={0.6} sufijo=" de 10" x={350} y={520} tam={170} color={KC.red} />
      <Etq T={T} at={K.V + 0.6} until={K.Va - 0.2} x={140} y={650} texto="en promedio, morían" tam={34} color={KC.ink} />
      <Etq T={T} at={K.V + 1.2} until={K.Va - 0.3} x={60} y={1440} texto="viruela · virus variola" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Va + 0.4} until={K.Gr - 0.3} x={290} y={1040} texto="variola" it lado="izq" tam={36} color={VARIOLA} />
      <Etq T={T} at={K.Va + 0.4} until={K.Gr - 0.3} x={290} y={1080} texto="peligroso" lado="izq" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Va + 1.2} until={K.Gr - 0.3} x={790} y={1040} texto="vaccinia" it tam={36} color={VACCINIA} />
      <Etq T={T} at={K.Va + 1.2} until={K.Gr - 0.3} x={790} y={1080} texto="leve" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Va + 2.6} until={K.Gr - 0.3} texto="parientes · orthopoxvirus" x={540} y={560} tam={38} borde={KC.gold2} />
      {T > K.Va - 0.3 && T < K.Gr + 0.2 && <Escala T={T} z={1} pxPorMm={1.04e6} x={60} y={1600} objetivo={240} />}
      <Etq T={T} at={K.Gr + 0.3} until={K.Me - 0.3} x={720} y={520} texto="piel por dentro" tam={32} />
      <Etq T={T} at={K.Gr + 1.6} until={K.Me - 0.3} x={60} y={1440} texto="linfocitos T y B (defensas)" tam={30} color="#cfc2ff" />
      <Chip T={T} at={K.Gr + 2.7} until={K.Me - 0.3} texto="aprenden su forma" x={540} y={1560} tam={42} borde={KC.gold2} />
      {T > K.Gr - 0.3 && T < K.Co + 0.2 && <Escala T={T} z={1} pxPorMm={9000} x={60} y={1640} objetivo={200} />}
      <Etq T={T} at={K.Me + 0.4} until={K.Co - 0.3} x={60} y={520} texto="ganglio · células de memoria" tam={30} color="#cfc2ff" />
      <Chip T={T} at={K.Me + 1.6} until={K.Co - 0.3} texto="memoria inmune" x={540} y={1500} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.Me + 1.8} until={K.Co - 0.3} x={60} y={1600} texto="anticuerpos" tam={30} color={KC.yellow} />
      <Medidor T={T} at={K.Co + 0.1} until={K.P - 0.2} y={1440} ancho={900} etiqueta="días después de vacunar" valor={(t) => (klerp(3, 21, kprog(t, K.Co + 0.1, K.Co + 2.9)) / 21)} texto={() => 'día ' + Math.round(dia)} color={KC.ink} />
      <Etq T={T} at={K.Co + 0.2} until={K.Co + 1.6} x={60} y={480} texto={dia < 6 ? 'granito' : 'ampolla'} tam={40} color={KC.ink} />
      <Etq T={T} at={K.Co + 1.7} until={K.Co + 2.6} x={60} y={480} texto="costra" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Co + 2.7} until={K.P - 0.2} x={60} y={480} texto="la marquita" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Pr + 0.9} until={K.Ri - 0.3} x={640} y={1005} texto="V. Zhdánov · URSS" tam={32} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Pr + 0.4} until={K.Ri - 0.3} anio="1958" quien="Asamblea Mundial de la Salud" revista="Minneapolis, EE.UU. · propuesta de la URSS" x={540} y={560} />
      <Chip T={T} at={K.Pr + 1.6} until={K.Ri - 0.3} texto="erradicar la viruela del mundo" x={540} y={1520} tam={40} borde={ROJO_URSS} />
      <Medidor T={T} at={K.Ri + 0.3} until={K.Ag - 0.3} y={1440} ancho={900} etiqueta="dosis de la URSS · 1958–1979" valor={(t) => kprog(t, K.Ri + 0.3, K.Ri + 2.6, kEase.suave)} texto={(v) => '+' + kformato(Math.round(v * 1400)) + ' millones'} color={ROJO_URSS} />
      <Etq T={T} at={K.Ri + 0.6} until={K.Ri + 3.3} x={60} y={520} texto="vacuna en polvo (liofilizada)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ri + 1.9} until={K.Ri + 3.3} x={600} y={800} texto="expertos de EE.UU." tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ri + 1.9} until={K.Ag - 0.3} texto="D. A. Henderson (CDC): jefe del programa de la OMS, 1966–1977" x={540} y={1610} tam={26} borde={AZUL_EU} />
      <Etq T={T} at={K.Ag + 1.1} until={K.Ag + 2.2} x={340} y={560} texto="una gotita entre las 2 puntas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ag + 2.4} until={K.An - 0.3} x={560} y={600} texto="15 piquetitos · ~5 mm" tam={30} color={KC.ink} />
      <Medidor T={T} at={K.Ag + 1.3} until={K.An - 0.3} y={1440} ancho={900} etiqueta="0.0025 mL en vez de 0.01 mL" valor={(t) => kprog(t, K.Ag + 1.5, K.Ag + 2.8)} texto={(v) => '×' + Math.max(1, Math.round(v * 4)) + ' vacunas'} color={KC.blue} />
      <Chip T={T} at={K.Ag + 3.2} until={K.An - 0.3} texto="vacuna en polvo: sin refrigerador" x={540} y={1610} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.An + 0.3} until={K.Ul - 0.3} x={680} y={930} texto="caso" tam={30} color={KC.ink} />
      <Chip T={T} at={K.An + 1.4} until={K.Ul - 0.3} texto="vigilancia y contención" x={540} y={1500} tam={42} borde={VACCINIA} />
      <Etq T={T} at={K.An + 1.8} until={K.Ul - 0.3} x={60} y={1600} texto="vacunan a sus contactos" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ul + 1.3} until={K.Li - 0.3} x={812} y={776} texto="Merca" tam={34} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ul + 1.6} until={K.Ul + 4.0} anio="1977" quien="Ali Maow Maalin · cocinero" revista="Merca, Somalia · último caso natural" x={540} y={1560} />
      <Chip T={T} at={K.Ul + 4.2} until={K.Li - 0.3} texto="sobrevivió · después luchó contra la polio" x={540} y={1500} tam={34} borde={KC.coral} />
      <TarjetaEstudio T={T} at={K.Li + 0.4} until={K.Li + 2.9} anio="1980" quien="8 de mayo · Asamblea Mundial de la Salud" revista="el mundo, libre de viruela" x={540} y={1560} />
      <Etq T={T} at={K.Li + 1.2} until={K.Ci - 0.3} x={60} y={500} texto="México: último caso en 1951" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Li + 3.0} until={K.Ci - 0.3} texto="la única enfermedad humana erradicada" x={540} y={1520} tam={36} borde={KC.gold2} />
      <Chip T={T} at={K.Ci + 2.4} until={K.Ou} texto="ciencia para la paz" x={360} y={480} tam={46} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es un lunar: *es la cicatriz de la vacuna.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Va - 0.1} texto="Mataba a *3 de cada 10* enfermos." />
      <Subtitulo T={T} idx={2} at={K.Va + 0.1} until={K.Gr - 0.1} texto="La vacuna traía *vaccinia,* un pariente leve." />
      <Subtitulo T={T} idx={3} at={K.Gr + 0.1} until={K.Me - 0.1} texto="Tus defensas *aprenden su forma.*" />
      <Subtitulo T={T} idx={4} at={K.Me + 0.1} until={K.Co - 0.1} texto="Si llega la viruela, *la atacan rápido.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.P - 0.1} texto="Costra, se cae… *y queda la marquita.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Cómo se borra *en plena Guerra Fría?*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.Ri - 0.1} texto="1958: la URSS propone *erradicarla.*" />
      <Subtitulo T={T} idx={8} at={K.Ri + 0.1} until={K.Ag - 0.1} texto="URSS, vacunas; EE.UU., *expertos.*" />
      <Subtitulo T={T} idx={9} at={K.Ag + 0.1} until={K.An - 0.1} texto="Una gotita *rinde 4 veces más.*" />
      <Subtitulo T={T} idx={10} at={K.An + 0.1} until={K.Ul - 0.1} texto="Vacunar a los contactos: *un anillo.*" />
      <Subtitulo T={T} idx={11} at={K.Ul + 0.1} until={K.Li - 0.1} texto="1977, Somalia: *el último caso natural.*" />
      <Subtitulo T={T} idx={12} at={K.Li + 0.1} until={K.Ci - 0.1} texto="1980: *el mundo, libre de viruela.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Dos rivales, *con ciencia, juntos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Viruela + 0.4, CUES.Vaccinia - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Granito + 0.5, CUES.Memoria - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Propuesta + 0.3, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Rivales + 0.6, CUES.Aguja - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Anillo + 0.4, CUES.Ultimo - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Ultimo + 4.2, CUES.Libre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Libre + 0.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" serie="Festivo" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ViruelaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Viruela /></CompositionStage></div>;
}
window.ViruelaApp = ViruelaApp;
