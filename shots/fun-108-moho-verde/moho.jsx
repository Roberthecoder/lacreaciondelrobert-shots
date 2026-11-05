// Shot Fungi Mati #108 · Esa pelusa blanca no es tu hongo: es el enemigo — NARRADO (N1 Por dentro + N6 errores de cultivo).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Ojo: el moho verde del cultivo (T. aggressivum, T. pleuroticola) COMPITE por espacio y comida; no se enrolla en las hifas.

const MV = { verde:'#2f6e3c', verde2:'#4d8a52', gris:'#5d7462', blanco:'#fbf8f0', crema:'#f3e6c4', paja:'#d9b25a', paja2:'#b88a35',
  ostra:'#cfc8bb', ostra2:'#9c9384', agua:'#5fb8ff', lona:'#b9a47a', lona2:'#8f7b52', acero:'#aab4bd' };

// Mancha de moho verde: borde blanco algodonoso que avanza y centro verde (esporas). Coordenadas de pantalla.
function Mancha({ x, y, r = 110, blanco = 1, verde = 0, seed = 9, T = 0 }) {
  if (blanco <= 0) return null;
  const g = krng(seed), bolas = Array.from({ length: 30 }, () => ({ a: g() * 6.283, d: Math.sqrt(g()), rr: 0.22 + g() * 0.22 }));
  const pelos = Array.from({ length: 40 }, () => ({ a: g() * 6.283, l: 0.1 + g() * 0.18 }));
  const R = r * blanco;
  return <g transform={`translate(${x} ${y})`}>
    {pelos.map((p, i) => <line key={'p' + i} x1={Math.cos(p.a) * R * 0.8} y1={Math.sin(p.a) * R * 0.8} x2={Math.cos(p.a + Math.sin(T * 2 + i) * 0.03) * R * (0.95 + p.l)} y2={Math.sin(p.a) * R * (0.95 + p.l)} stroke={MV.blanco} strokeWidth={3} opacity=".75" />)}
    {bolas.map((b, i) => <circle key={i} cx={Math.cos(b.a) * b.d * R * 0.72} cy={Math.sin(b.a) * b.d * R * 0.72} r={b.rr * R} fill={MV.blanco} opacity=".95" />)}
    {verde > 0 && bolas.map((b, i) => { const q = kclamp((verde * 0.95 - b.d) * 5, 0, 1); return q > 0 ? <circle key={'v' + i} cx={Math.cos(b.a) * b.d * R * 0.62} cy={Math.sin(b.a) * b.d * R * 0.62} r={b.rr * R * 0.8 * q} fill={i % 3 ? MV.verde : MV.verde2} /> : null; })}
    {verde > 0.2 && Array.from({ length: 16 }, (_, i) => { const a = i * 2.4, d = Math.sqrt((i + 1) / 16) * R * 0.45 * verde; return <circle key={'e' + i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={4} fill="#1f4a28" opacity={kprog(verde, 0.2, 0.6)} />; })}
  </g>;
}
// Varias setas ostra (Pleurotus, gris) saliendo de un agujero lateral de la bolsa, hacia la derecha.
function SetasHoyo({ T, x, y, abre = 1, s = 1, lado = 1 }) {
  if (abre <= 0) return null;
  const hs = [[0, -40, 1.0, -18], [6, 0, 1.15, 4], [0, 40, 0.9, 22], [-4, -78, 0.7, -32]];
  return <g transform={`translate(${x} ${y}) scale(${lado * s} ${s})`}>
    <ellipse cx={0} cy={0} rx={16} ry={44} fill="#5a3a1a" stroke={KC.ink} strokeWidth={5} />
    {hs.map(([dx, dy, k, r], i) => <SetaOstra key={i} x={dx} y={dy} s={k} rot={r + mece(T, i + 3, 0.2) * 3} abre={kclamp(abre * 1.3 - i * 0.12, 0, 1)} color={MV.ostra} oscuro={MV.ostra2} pie={0.7} />)}
  </g>;
}
// Hifa tabicada (con septos) que avanza por una polilínea. p 0..1.
function HifaTab({ pts, p = 1, color, ancho = 12, septo = 70, punta = true }) {
  if (p <= 0) return null;
  const par = kParcial(pts, p), d = 'M ' + par.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const marcas = []; let acc = 0;
  for (let i = 1; i < par.length; i++) { const [x0, y0] = par[i - 1], [x1, y1] = par[i], L = Math.hypot(x1 - x0, y1 - y0); let t = septo - (acc % septo);
    while (t < L) { const u = t / L, mx = klerp(x0, x1, u), my = klerp(y0, y1, u), nx = -(y1 - y0) / L, ny = (x1 - x0) / L; marcas.push([mx - nx * ancho * 0.55, my - ny * ancho * 0.55, mx + nx * ancho * 0.55, my + ny * ancho * 0.55]); t += septo; }
    acc += L; }
  const fin = par[par.length - 1];
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {marcas.map((m, i) => <line key={i} x1={m[0]} y1={m[1]} x2={m[2]} y2={m[3]} stroke={KC.ink} strokeWidth={3} opacity=".6" />)}
    {punta && p < 1 && <circle cx={fin[0]} cy={fin[1]} r={ancho * 0.7} fill="#ffffff" opacity=".8" />}
  </g>;
}
// Conidióforo esquemático de Trichoderma: tallo ramificado con racimos de conidios verdes en las puntas. p 0..1.
function Conidioforo({ x, y, s = 1, p = 1, rot = 0 }) {
  if (p <= 0) return null;
  const ram = [[0, -120, 0], [-40, -170, -0.5], [40, -170, 0.5], [-70, -95, -0.9], [70, -95, 0.9]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 L 0 -120 M 0 -120 L -40 -170 M 0 -120 L 40 -170 M 0 -60 L -70 -95 M 0 -60 L 70 -95" stroke="#a9e3a0" strokeWidth={9} fill="none" strokeLinecap="round" opacity={kprog(p, 0, 0.4)} />
    {ram.map(([cx, cy], i) => { const q = kclamp(p * 2 - 0.6 - i * 0.1, 0, 1); return q > 0 ? <g key={i}>{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={cx + Math.cos(k * 1.26) * 14 * q} cy={cy - 10 + Math.sin(k * 1.26) * 14 * q} r={9 * q} fill={k % 2 ? MV.verde2 : '#3f7f45'} stroke={KC.ink} strokeWidth={2} />)}</g> : null; })}
  </g>;
}
// Olla con agua (vista de lado) y paja adentro. hierve 0..1.
function Olla({ T, x, y, s = 1, paja = 1, hierve = 0, salvado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hierve > 0 && [0, 1, 2].map((i) => { const u = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${-80 + i * 80} ${-250 - u * 160} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#ffffff" strokeWidth={10} fill="none" opacity={(1 - u) * 0.7 * hierve} strokeLinecap="round" />; })}
    <rect x={-230} y={-250} width={460} height={290} rx={30} fill="#9aa4ae" stroke={KC.ink} strokeWidth={9} />
    <rect x={-280} y={-240} width={60} height={26} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <rect x={220} y={-240} width={60} height={26} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-210} y={-200} width={420} height={220} rx={18} fill={MV.agua} opacity=".75" />
    {paja > 0 && Array.from({ length: 26 }, (_, i) => { const g = krng(i + 40); const px = (g() - 0.5) * 360, py = -170 + g() * 170, a = (g() - 0.5) * 120; return <rect key={i} x={px - 50} y={py - 6} width={100} height={12} rx={6} fill={i % 2 ? MV.paja : MV.paja2} stroke={KC.ink} strokeWidth={2} transform={`rotate(${a} ${px} ${py})`} opacity={paja} />; })}
    {salvado > 0 && Array.from({ length: 40 }, (_, i) => { const g = krng(i + 90); const px = (g() - 0.5) * 300, py = -140 + g() * 140; return <circle key={'s' + i} cx={px} cy={py} r={7} fill="#c48a52" stroke={KC.ink} strokeWidth={1.5} opacity={kclamp(salvado * 3 - g() * 2, 0, 1)} />; })}
    {hierve > 0 && Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.9 + i * 0.13) % 1); return <circle key={'b' + i} cx={-180 + i * 40} cy={-10 - u * 180} r={6 + (i % 3) * 3} fill="#ffffff" opacity={0.6 * hierve * (1 - u)} />; })}
  </g>;
}
// Olla de presión (el autoclave casero).
function OllaPresion({ T, x, y, s = 1, vapor = 1 }) {
  const w = Math.sin(T * 18) * 6 * vapor;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && [0, 1].map((i) => { const u = ((T * 1.2 + i / 2) % 1); return <ellipse key={i} cx={10 + u * 30} cy={-330 - u * 130} rx={20 + u * 30} ry={14 + u * 18} fill="#ffffff" opacity={(1 - u) * 0.7 * vapor} />; })}
    <rect x={-170} y={-230} width={340} height={230} rx={34} fill={MV.acero} stroke={KC.ink} strokeWidth={9} />
    <path d="M -190 -230 Q 0 -300 190 -230 Z" fill="#c7d0d8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-14} y={-300} width={28} height={36} rx={6} fill="#5a5f6b" stroke={KC.ink} strokeWidth={5} transform={`rotate(${w} 0 -282)`} />
    <rect x={160} y={-262} width={170} height={34} rx={14} fill={KC.ink} />
    <rect x={-330} y={-150} width={160} height={30} rx={12} fill={KC.ink} />
    <rect x={-140} y={-200} width={36} height={170} rx={18} fill="#ffffff" opacity=".35" />
  </g>;
}
// Frasco de vidrio con grano estéril; verde 0..1 = moho que lo invade desde arriba.
function FrascoGrano({ x, y, s = 1, verde = 0, T = 0 }) {
  const g = krng(31), granos = Array.from({ length: 70 }, () => ({ x: (g() - 0.5) * 180, y: -20 - g() * 220, a: g() * 180 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-290} width={220} height={290} rx={30} fill="rgba(220,240,255,.35)" stroke={KC.ink} strokeWidth={8} />
    {granos.map((q, i) => { const alto = (-q.y - 20) / 220, v = kclamp((verde * 1.4 - (1 - alto)) * 3, 0, 1);
      return <ellipse key={i} cx={q.x} cy={q.y} rx={16} ry={9} transform={`rotate(${q.a} ${q.x} ${q.y})`} fill={mixHex('#e9d29a', MV.verde, v)} stroke={KC.ink} strokeWidth={2} />; })}
    <rect x={-96} y={-330} width={192} height={46} rx={10} fill="#d0d6dc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={-270} width={26} height={230} rx={13} fill="#ffffff" opacity=".35" />
  </g>;
}
// Mano (guante), bota y cuchillo esquemáticos, para "entra con personas y herramientas".
function Mano({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 60 L -44 -10 Q -60 -40 -52 -70 Q -44 -80 -36 -66 L -30 -30 L -30 -90 Q -24 -104 -14 -90 L -12 -40 L -6 -104 Q 4 -116 12 -102 L 10 -40 L 20 -94 Q 30 -104 36 -90 L 30 -30 L 44 -60 Q 54 -66 56 -54 L 40 20 L 36 60 Z" fill="#ffd8b8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
function Bota({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -110 L 30 -110 L 30 -20 L 90 -10 Q 110 0 104 30 L -40 30 Z" fill="#2c6e8f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-44} y={22} width={152} height={16} rx={6} fill={KC.ink} />
  </g>;
}
function Cuchillo({ x, y, s = 1, rot = -20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -12 L 130 -12 Q 170 -8 180 10 L 0 12 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-90} y={-14} width={92} height={28} rx={10} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Estante con bolsas chiquitas.
function Estante({ T, x, y, n = 3, verdes = [] }) {
  return <g>
    <rect x={x} y={y} width={420} height={18} rx={6} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: n }, (_, i) => <g key={i}><BolsaCultivo T={T} x={x + 70 + i * 140} y={y - 100} w={100} h={170} col={0.8} seed={10 + i} />
      {verdes[i] > 0 && <Mancha x={x + 70 + i * 140} y={y - 110} r={34} blanco={verdes[i]} verde={verdes[i]} seed={20 + i} T={T} />}</g>)}
  </g>;
}
// Mapa esquemático del Atlántico norte: Norteamérica (izq) y Europa con Irlanda (der).
function MapaAtlantico({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 40 Q 80 0 200 20 Q 300 10 360 60 Q 400 120 370 190 Q 330 240 300 300 Q 260 330 220 300 Q 180 320 150 280 Q 90 250 60 200 Q 10 150 0 40 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 720 60 Q 800 20 900 40 Q 980 70 1000 140 Q 990 220 930 260 Q 860 290 800 250 Q 760 200 770 140 Q 760 100 720 60 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 650 120 Q 680 100 700 125 Q 705 160 680 175 Q 650 170 645 145 Z" fill="#bfe3b4" stroke={KC.ink} strokeWidth={6} />
    <text x={500} y={200} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="rgba(14,15,18,.45)">océano Atlántico</text>
  </g>;
}
// Báscula con platillo.
function Bascula({ x, y, s = 1, peso = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={0} width={340} height={120} rx={20} fill="#e9eef2" stroke={KC.ink} strokeWidth={8} />
    <rect x={-100} y={30} width={200} height={60} rx={10} fill="#173b2a" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={76} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill="#7dff9b">{kformato(peso)} g</text>
    <rect x={-190} y={-20} width={380} height={24} rx={10} fill="#c7d0d8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tienda de lona (vista de frente-lado) con manchas que la pudren.
function Tienda({ x, y, s = 1, manchas = 0 }) {
  const g = krng(55), pts = Array.from({ length: 22 }, () => ({ x: -200 + g() * 380, y: -200 + g() * 190, r: 10 + g() * 26, u: g() }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -240 0 L 0 -260 L 240 0 Z" fill={MV.lona} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 0 -260 L 120 0 L -60 0 Z" fill={MV.lona2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -40 0 L 0 -120 L 40 0 Z" fill="#3a2c18" stroke={KC.ink} strokeWidth={5} />
    {pts.map((p, i) => { const q = kclamp((manchas - p.u * 0.7) * 3, 0, 1); return q > 0 && (Math.abs(p.x) < (p.y + 260) * 0.9) ? <circle key={i} cx={p.x} cy={p.y} r={p.r * q} fill={i % 2 ? '#4f6b3a' : '#6d7d3e'} opacity=".85" /> : null; })}
    <line x1={-240} y1={0} x2={-300} y2={30} stroke={KC.ink} strokeWidth={4} /><line x1={240} y1={0} x2={300} y2={30} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Palmera({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 Q 10 -120 30 -240" stroke="#8a5a2b" strokeWidth={22} fill="none" strokeLinecap="round" />
    {[-150, -100, -40, 20, 70].map((a, i) => <path key={i} d="M 30 -240 q 60 -20 120 20" stroke={KC.leaf} strokeWidth={18} fill="none" strokeLinecap="round" transform={`rotate(${a + Math.sin(T * 1.5 + i) * 4} 30 -240)`} />)}
  </g>;
}
// Tanque de fermentación industrial.
function Tanque({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-420} width={300} height={420} rx={60} fill="#c7d0d8" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-300} width={240} height={250} rx={30} fill="#d8c27a" opacity=".85" />
    {Array.from({ length: 8 }, (_, i) => { const u = ((T * 0.5 + i / 8) % 1); return <circle key={i} cx={-90 + (i * 26) % 180} cy={-60 - u * 230} r={7} fill="#fff" opacity={0.7 * (1 - u)} />; })}
    <rect x={-180} y={-20} width={360} height={30} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={-470} width={60} height={56} rx={10} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
    <rect x={-110} y={-400} width={30} height={330} rx={15} fill="#fff" opacity=".35" />
  </g>;
}
// Tijeritas (enzima que corta celulosa).
function Tijera({ x, y, s = 1, abre = 0 }) {
  const a = 18 * abre;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 90 -8 L 90 4 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={4} /><circle cx={-34} cy={10} r={18} fill="none" stroke={KC.pink} strokeWidth={8} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 90 8 L 90 -4 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={4} /><circle cx={-34} cy={-10} r={18} fill="none" stroke={KC.pink} strokeWidth={8} /></g>
    <circle r={6} fill={KC.ink} />
  </g>;
}

// fibras de paja del mundo microscópico (pantalla)
const PAJA_MICRO = Array.from({ length: 7 }, (_, i) => { const g = krng(70 + i); return { x: 80 + g() * 900, y: 560 + g() * 620, a: -30 + g() * 60, l: 300 + g() * 260 }; });
const COMIDA = Array.from({ length: 36 }, (_, i) => { const g = krng(120 + i); return { x: 120 + g() * 840, y: 560 + g() * 600 }; });
const H_SETA = [[[120, 900], [260, 860], [380, 900], [470, 840]], [[120, 980], [230, 1040], [340, 1010]], [[140, 760], [250, 700], [330, 740]]];
const H_TRICO = [[[980, 860], [840, 820], [700, 880], [560, 820], [430, 760], [300, 800]], [[980, 940], [850, 1010], [700, 960], [560, 1060], [420, 1000]],
  [[960, 700], [820, 640], [680, 690], [540, 620]], [[990, 1100], [860, 1140], [720, 1100], [600, 1160]], [[980, 600], [860, 560], [760, 600]]];

function MohoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Quien, PD: CUES.PorDentro, L: CUES.Lab, P: CUES.Pregunta, E: CUES.Entra, Er: CUES.Errores, V: CUES.Vacio,
    Es: CUES.Estudio, Gr: CUES.Gramo, Ch: CUES.Chiste, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const BX = 330, BY = 880, MX = 370, MY = 850;           // bolsa y mancha
  const blanco = kprog(T, K.G + 0.1, K.G + 2.2, kEase.sale), verde = kprog(T, K.G + 2.6, K.Q + 2.4, kEase.suave);
  const diaP = kprog(T, K.L + 0.4, K.L + 3.6);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y quién: la bolsa con la pelusa blanca que se vuelve verde */}
      <Escena T={T} a={K.G} b={K.PD} zoom={0.3} origen={`${MX}px ${MY}px`}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <BolsaCultivo T={T} x={BX} y={BY} w={400} h={580} col={0.28} seed={5} />
          <Mancha x={MX} y={MY} r={120} blanco={blanco} verde={verde} T={T} />
          {T < K.G + 2.4 && blanco > 0.3 && <path d={`M ${MX + 130} ${MY + 10} L 640 900`} stroke={KC.ink} strokeWidth={7} strokeDasharray="14 10" opacity={kprog(T, K.G + 0.5, K.G + 0.8)} />}
        </>)}
      </Escena>
      {/* lupa: por qué es verde (conidios) */}
      <Lupa T={T} at={K.Q + 1.6} until={K.PD - 0.2} x={790} y={840} r={180} fx={MX + 20} fy={MY} tinte={KC.mint} etiqueta="esporas verdes (conidios)"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" />
          <HifaTab pts={[[0, r * 1.6], [r * 0.8, r * 1.4], [r * 2, r * 1.55]]} p={1} color="#cfe9c8" ancho={10} septo={50} punta={false} />
          <Conidioforo x={r * 0.7} y={r * 1.42} s={0.9} p={kprog(t, K.Q + 1.9, K.Q + 3.2)} />
          <Conidioforo x={r * 1.35} y={r * 1.5} s={0.75} p={kprog(t, K.Q + 2.2, K.Q + 3.5)} rot={8} /></svg>} />
      {/* 3 · por dentro: compite por espacio y comida (no se enrolla) */}
      <Escena T={T} a={K.PD} b={K.L} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {PAJA_MICRO.map((f, i) => <rect key={i} x={f.x - f.l / 2} y={f.y - 22} width={f.l} height={44} rx={22} fill="#6b5326" opacity=".55" transform={`rotate(${f.a} ${f.x} ${f.y})`} />)}
          {COMIDA.map((c, i) => { const come = kprog(T, K.PD + 0.8 + (c.x > 560 ? (980 - c.x) / 900 : 0.6 + (560 - c.x) / 900) * 2.2, K.PD + 1.2 + (c.x > 560 ? (980 - c.x) / 900 : 0.6 + (560 - c.x) / 900) * 2.2);
            return <circle key={i} cx={c.x} cy={c.y} r={10 * (1 - come)} fill={KC.gold2} opacity={0.9} />; })}
          {H_SETA.map((p, i) => <HifaTab key={'s' + i} pts={p} p={0.35 + 0.25 * kprog(T, K.PD, K.L)} color={MV.crema} ancho={14} />)}
          {H_TRICO.map((p, i) => <HifaTab key={'t' + i} pts={p} p={kprog(T, K.PD + 0.2 + i * 0.15, K.PD + 2.8 + i * 0.15, kEase.sale)} color="#9fd59a" ancho={12} septo={60} />)}
          <Conidioforo x={900} y={850} s={0.6} p={kprog(T, K.PD + 2.2, K.PD + 3.2)} />
          <Conidioforo x={860} y={1100} s={0.55} p={kprog(T, K.PD + 2.5, K.PD + 3.4)} rot={10} />
        </>)}
      </Escena>
      {/* 4 · laboratorio: T. pleuroticola cubre la colonia de Pleurotus en 4–6 días */}
      <Escena T={T} a={K.L} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<PlacaPetri x={400} y={890} r={290} agar="#f1e2b0" id="pl">
          <Colonia cx={-120} cy={0} r={klerp(70, 120, diaP)} color={MV.blanco} seed={3} />
          <Colonia cx={150} cy={0} r={klerp(60, 470, diaP)} color={MV.blanco} seed={7} />
          <Colonia cx={150} cy={0} r={klerp(30, 430, kprog(T, K.L + 0.9, K.L + 3.9))} color="#5f7a62" seed={8} />
          <Colonia cx={150} cy={0} r={klerp(10, 260, kprog(T, K.L + 1.4, K.L + 3.9))} color="#3f5a45" seed={9} />
        </PlacaPetri>)}
      </Escena>
      {/* 5 · re-gancho: ¿por dónde se mete? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><BolsaCultivo T={T} x={330} y={900} w={400} h={580} col={0.28} seed={5} /><Mancha x={370} y={870} r={120} blanco={1} verde={1} T={T} />
          <Interrogacion T={T} x={330} y={760} tam={380} /></>)}
      </Escena>
      {/* 6 · cómo entra: personas, herramientas… y el agua */}
      <Escena T={T} a={K.E} b={K.Er}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Estante T={T} x={600} y={760} verdes={[0, kprog(T, K.E + 2.0, K.E + 3.0), 0]} />
          <Estante T={T} x={600} y={1060} verdes={[kprog(T, K.E + 3.4, K.E + 4.2), 0, 0]} />
          {(() => { const u = kprog(T, K.E + 0.1, K.E + 2.0, kEase.suave), xx = klerp(-120, 560, u);
            return <g>{Array.from({ length: 14 }, (_, i) => { const px = xx - 40 - i * 45; return px > -40 ? <circle key={i} cx={px} cy={890 + Math.sin(i) * 30} r={7} fill={MV.verde2} stroke={KC.ink} strokeWidth={2} /> : null; })}
              <Mano x={xx} y={720} s={1.1} rot={10} /><Bota x={xx - 170} y={960} s={1} /><Cuchillo x={xx - 30} y={850} s={1} rot={-10} /></g>; })()}
          {/* llave y gota con esporas */}
          {T > K.E + 2.2 && <g>
            <rect x={100} y={500} width={190} height={40} rx={12} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
            <rect x={250} y={530} width={40} height={50} rx={8} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
            {(() => { const u = ((T - K.E - 2.3) / 1.0) % 1, yy = 600 + u * 380; return <g transform={`translate(270 ${yy})`} opacity={1 - kprog(u, 0.9, 1)}>
              <path d="M 0 -50 Q 34 0 30 20 Q 22 50 0 50 Q -22 50 -30 20 Q -34 0 0 -50 Z" fill={MV.agua} stroke={KC.ink} strokeWidth={5} />
              {[[-8, 14], [10, 26], [2, 0]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill={MV.verde} />)}</g>; })()}
          </g>}
        </>)}
      </Escena>
      {/* 7 · pasteurizar la paja; el salvado (nitrógeno) sube el riesgo */}
      <Escena T={T} a={K.Er} b={K.V}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Olla T={T} x={330} y={1080} s={0.95} hierve={kprog(T, K.Er + 0.5, K.Er + 1.5)} salvado={kprog(T, K.Er + 3.4, K.Er + 4.4)} />
          {T > K.Er + 2.8 && (() => { const u = kprog(T, K.Er + 2.8, K.Er + 3.4, kEase.sale); return <g transform={`translate(${klerp(700, 380, u)} ${klerp(560, 760, u)}) rotate(${klerp(0, 60, kprog(T, K.Er + 3.3, K.Er + 3.7))})`}>
            <ellipse cx={0} cy={0} rx={70} ry={34} fill="#dfe6ec" stroke={KC.ink} strokeWidth={6} /><rect x={60} y={-10} width={200} height={20} rx={10} fill="#dfe6ec" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={-8} rx={56} ry={22} fill="#c48a52" /></g>; })()}
        </>)}
        {T < K.Er + 3.0 && <Termometro x={830} y={700} alto={360} max={100} valor={klerp(20, 71, kprog(T, K.Er + 0.4, K.Er + 2.0, kEase.sale))} marcas={[0, 50, 71, 100]} rango={[69, 73]} />}
      </Escena>
      {/* 8 · lo estéril es un vacío: si entra un moho, invade más fácil */}
      <Escena T={T} a={K.V} b={K.Es}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <OllaPresion T={T} x={280} y={1100} s={0.95} vapor={1 - kprog(T, K.V + 1.2, K.V + 1.8)} />
          <FrascoGrano x={760} y={1110} s={1} verde={kprog(T, K.V + 2.4, K.V + 4.4, kEase.suave)} T={T} />
          {T > K.V + 1.6 && T < K.V + 2.6 && (() => { const u = kprog(T, K.V + 1.6, K.V + 2.5, kEase.suave); return <circle cx={klerp(560, 760, u)} cy={klerp(700, 840, u)} r={12} fill={MV.verde} stroke={KC.ink} strokeWidth={3} />; })()}
        </>)}
      </Escena>
      {/* 9 · la historia: Irlanda (mediados de los 80) → Norteamérica; Pensilvania 1994–96 */}
      <Escena T={T} a={K.Es} b={K.Gr}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaAtlantico x={40} y={600} s={1} />
          {(() => { const r = 26 * kEase.rebote(kprog(T, K.Es + 0.3, K.Es + 0.8)); return r > 0 ? <circle cx={712} cy={745} r={r} fill={KC.red} stroke={KC.ink} strokeWidth={5} /> : null; })()}
          {(() => { const p = kprog(T, K.Es + 1.4, K.Es + 2.6, kEase.suave); const pts = Array.from({ length: 30 }, (_, i) => { const u = i / 29 * p; return [klerp(700, 330, u), 745 - Math.sin(u * Math.PI) * 140 * (u / Math.max(p, 0.001)) * p + (u * 40)]; });
            return p > 0 ? <path d={'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke={KC.red} strokeWidth={8} fill="none" strokeDasharray="18 12" strokeLinecap="round" /> : null; })()}
          {(() => { const r = 24 * kEase.rebote(kprog(T, K.Es + 2.5, K.Es + 3.0)); return r > 0 ? <circle cx={330} cy={785} r={r} fill={KC.red} stroke={KC.ink} strokeWidth={5} /> : null; })()}
        </>)}
      </Escena>
      {/* 10 · un gramo por kilo: la cosecha cae 68–100 % */}
      <Escena T={T} a={K.Gr} b={K.Ch}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bascula x={300} y={1040} s={1} peso={klerp(0, 1000, kprog(T, K.Gr + 0.2, K.Gr + 0.8)) + (T > K.Gr + 1.3 ? 1 : 0)} />
          <rect x={160} y={860} width={280} height={160} rx={18} fill="#5b3a22" stroke={KC.ink} strokeWidth={7} opacity={kprog(T, K.Gr + 0.1, K.Gr + 0.4)} />
          {Array.from({ length: 30 }, (_, i) => { const g = krng(200 + i); return <circle key={i} cx={180 + g() * 240} cy={880 + g() * 120} r={6} fill="#8a5a2b" opacity={kprog(T, K.Gr + 0.1, K.Gr + 0.4)} />; })}
          {(() => { const u = kprog(T, K.Gr + 0.8, K.Gr + 1.3, kEase.sale); return u > 0 ? <g transform={`translate(330 ${klerp(640, 850, u)})`}><circle r={16} fill={MV.verde} stroke={KC.ink} strokeWidth={4} /><circle cx={12} cy={-6} r={8} fill={MV.verde2} /></g> : null; })()}
          {/* barras de cosecha */}
          <line x1={600} y1={1100} x2={1020} y2={1100} stroke={KC.ink} strokeWidth={8} />
          {(() => { const u = kprog(T, K.Gr + 1.5, K.Gr + 2.2, kEase.sale), baja = kprog(T, K.Gr + 2.4, K.Gr + 3.4, kEase.suave); return <>
            <rect x={630} y={1100 - 360 * u} width={150} height={360 * u} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
            <rect x={830} y={1100 - 360 * u * klerp(1, 0.32, baja)} width={150} height={360 * u * klerp(1, 0.32, baja)} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            {baja > 0.9 && <rect x={830} y={1100 - 360 * 0.32} width={150} height={360 * 0.32} fill="url(#rayasGr)" />}
            <defs><pattern id="rayasGr" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="rgba(255,255,255,.45)" /></pattern></defs></>; })()}
          {[[705, 'sin moho'], [905, 'con 1 g/kg']].map(([xx, t]) => <text key={t} x={xx} y={1140} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
        </>)}
      </Escena>
      {/* 11 · lo chistoso: T. reesei y la tienda militar (1944); hoy, enzimas industriales */}
      <Escena T={T} a={K.Ch} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Ch + 3.4, K.Ch + 3.9)}>
            <rect x={0} y={1000} width={KW} height={260} fill="#3f8fd8" />
            <ellipse cx={420} cy={1000} rx={420} ry={70} fill="#f1d58f" stroke={KC.ink} strokeWidth={6} />
            <Palmera x={120} y={990} s={1.1} T={T} /><Palmera x={760} y={995} s={0.9} T={T} />
            <Tienda x={430} y={990} s={1.15} manchas={kprog(T, K.Ch + 0.6, K.Ch + 3.0)} />
          </g>
          <g opacity={kprog(T, K.Ch + 3.5, K.Ch + 4.0)}>
            <Tanque x={260} y={1150} s={1} T={T} />
            <CadenaAnillos x={520} y={860} n={5} s={0.85} p={1} color={KC.leaf} paso={110} />
            {(() => { const u = kprog(T, K.Ch + 4.4, K.Ch + 5.4); return <Tijera x={klerp(500, 760, u)} y={930} s={1.2} abre={Math.abs(Math.sin(T * 9))} />; })()}
          </g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma bolsa, limpia y con setas; la verde, a la basura */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <BolsaCultivo T={T} x={BX} y={BY} w={400} h={580} col={1} seed={5} />
          <SetasHoyo T={T} x={BX + 196} y={BY - 60} abre={kprog(T, K.Ci + 0.3, K.Ci + 2.0)} s={1.05} />
          <SetasHoyo T={T} x={BX - 196} y={BY + 120} abre={kprog(T, K.Ci + 0.8, K.Ci + 2.4)} s={0.85} lado={-1} />
          <g transform="translate(860 1080)" opacity={kprog(T, K.Ci + 1.2, K.Ci + 1.6)}>
            <BolsaCultivo T={T} x={0} y={0} w={130} h={190} col={0.3} seed={6} />
            <Mancha x={0} y={-10} r={50} blanco={1} verde={1} T={T} seed={4} />
            <path d="M -70 -90 L 70 70 M 70 -90 L -70 70" stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.2} until={K.G + 3.6} texto="¿tu hongo?" x={790} y={900} tam={44} />
      <Etq T={T} at={K.G + 2.4} until={K.Q + 1.4} x={600} y={1010} texto="Trichoderma" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.2} until={K.PD - 0.3} texto="1 · micelio blanco y denso" x={540} y={460} tam={36} borde={KC.white} />
      <Chip T={T} at={K.Q + 1.3} until={K.PD - 0.3} texto="2 · esporas verdes" x={540} y={560} tam={36} borde={MV.verde2} />
      <Chip T={T} at={K.PD + 0.1} until={K.L - 0.3} texto="POR DENTRO · EN LA PAJA" x={400} y={470} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.PD + 0.5} until={K.L - 0.3} x={60} y={590} texto="tu seta" tam={28} color={MV.crema} />
      <Etq T={T} at={K.PD + 0.6} until={K.L - 0.3} x={60} y={630} texto="Pleurotus" it tam={28} color={MV.crema} />
      <Etq T={T} at={K.PD + 0.9} until={K.L - 0.3} x={520} y={1150} texto="Trichoderma" it tam={28} color="#9fd59a" />
      <Chip T={T} at={K.PD + 1.4} until={K.L - 0.3} texto="compite por espacio y comida" x={420} y={1500} tam={30} borde="#9fd59a" />
      <Etq T={T} at={K.PD + 2.0} until={K.L - 0.3} x={60} y={1580} texto="otros Trichoderma sí se enrollan en hongos" tam={22} color={KC.texto} />
      <Etq T={T} at={K.PD + 1.4} until={K.L - 0.3} x={60} y={1625} texto="Innocenti et al., 2019 · Kosanovic et al., 2020" tam={20} color={KC.texto} />
      <Chip T={T} at={K.L + 0.4} until={K.P - 0.3} texto={'día ' + (1 + Math.floor(diaP * 5 + 0.0001))} x={220} y={520} tam={44} borde={KC.ink} mono />
      <Etq T={T} at={K.L + 0.3} until={K.P - 0.3} x={700} y={800} texto="seta" tam={30} color={KC.texto} />
      <Etq T={T} at={K.L + 0.5} until={K.P - 0.3} x={700} y={845} texto="Pleurotus" it tam={30} color={KC.texto} />
      <Etq T={T} at={K.L + 1.0} until={K.P - 0.3} x={700} y={950} texto="T. pleuroticola" it tam={30} color={KC.texto} />
      <Etq T={T} at={K.L + 1.4} until={K.P - 0.3} x={700} y={995} texto="verde oscuro grisáceo" tam={22} color={KC.texto} />
      <Etq T={T} at={K.L + 1.0} until={K.P - 0.3} x={60} y={1520} texto="Komoń-Zelazowska et al., 2007 · en laboratorio" tam={22} color={KC.ink} />
      <Chip T={T} at={K.E + 0.2} until={K.Er - 0.3} texto="personas y herramientas" x={330} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.E + 0.3} until={K.Er - 0.3} x={60} y={545} texto="Penn State Extension" tam={22} color={KC.ink} />
      <Chip T={T} at={K.E + 2.4} until={K.Er - 0.3} texto="Malasia, 2024: también en el agua" x={540} y={1110} tam={32} borde={MV.agua} />
      <Etq T={T} at={K.E + 2.8} until={K.Er - 0.3} x={60} y={1500} texto="y en el aire y las herramientas de limpieza · Ajis et al., 2024" tam={20} color={KC.ink} />
      <Chip T={T} at={K.Er + 0.3} until={K.Er + 3.0} texto="1 a 2 horas en agua a 71 °C" x={340} y={500} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Er + 0.6} until={K.Er + 3.0} x={60} y={580} texto="(160 °F) · pasteurizar la paja" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Er + 3.3} until={K.V - 0.3} texto="+ salvado = + nitrógeno" x={340} y={500} tam={32} borde={KC.ink} />
      <Medidor T={T} at={K.Er + 3.6} until={K.V - 0.3} valor={(t) => klerp(0.3, 0.85, kprog(t, K.Er + 3.8, K.Er + 5.0, kEase.sale))} etiqueta="riesgo de contaminación" texto={(v) => (v > 0.6 ? 'sube' : '')} x={90} y={1440} ancho={900} color={KC.red} />
      <Etq T={T} at={K.Er + 0.3} until={K.V - 0.3} x={60} y={1600} texto="de la Fuente, UC Cooperative Extension, 2011" tam={20} color={KC.ink} />
      <Etq T={T} at={K.V + 0.3} until={K.Es - 0.3} x={60} y={740} texto="olla de presión = autoclave casero" tam={24} color={KC.ink} />
      <Etq T={T} at={K.V + 1.0} until={K.Es - 0.3} x={600} y={720} texto="estéril" tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 1.4} until={K.Es - 0.3} texto="vacío biológico" x={400} y={460} tam={36} borde={KC.violet} />
      <Chip T={T} at={K.V + 3.0} until={K.Es - 0.3} texto="estéril ≠ protegido" x={540} y={1110} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Es + 0.4} until={K.Gr - 0.3} x={680} y={700} texto="Irlanda" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.6} until={K.Es + 3.2} texto="forma agresiva · mediados de los 80" x={540} y={480} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Es + 2.6} until={K.Gr - 0.3} x={60} y={560} texto="Norteamérica · inicios de los 90" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 3.4} until={K.Gr - 0.3} anio="1994–96" quien="Pensilvania: pérdidas de 30 a 100 %" revista="de las cosechas · Penn State Extension" x={480} y={990} />
      <Etq T={T} at={K.Es + 1.0} until={K.Gr - 0.3} x={60} y={1500} texto="en los 90: más de 30 millones de dólares en el mundo" tam={22} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.0} until={K.Gr - 0.3} x={60} y={1540} texto="Royse et al., 1999 · Plant Disease" tam={20} color={KC.ink} />
      <NumeroGigante T={T} at={K.Gr + 2.5} until={K.Gr + 4.6} valor={100} desde={100} dur={0.1} prefijo="−68 a −" sufijo=" %" etiqueta="cosecha de champiñón" x={540} y={560} tam={120} color={KC.red} />
      <Etq T={T} at={K.Gr + 0.4} until={K.Gr + 2.3} x={60} y={820} texto="1 kg de composta" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Gr + 1.0} until={K.Gr + 2.3} x={360} y={680} texto="+ 1 g infectada" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Gr + 4.8} until={K.Ch - 0.3} anio="2020" quien="Kosanovic, Grogan y Kavanagh" revista="Fungal Biology, 2020" x={540} y={560} />
      <Chip T={T} at={K.Gr + 3.0} until={K.Ch - 0.3} texto={<>nombre desde 2002: <i>T. aggressivum</i></>} x={540} y={1520} tam={28} borde={MV.verde2} />
      <Etq T={T} at={K.Ch + 0.5} until={K.Ch + 3.4} x={60} y={560} texto="Trichoderma reesei" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ch + 1.0} until={K.Ch + 3.4} x={60} y={605} texto="tienda de lona de algodón del ejército de EE. UU." tam={20} color={KC.ink} />
      <Chip T={T} at={K.Ch + 1.4} until={K.Ch + 3.4} texto="Isla de Bougainville (archipiélago de las Salomón) · 1944" x={540} y={1110} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Ch + 4.0} until={K.Ci - 0.3} x={60} y={560} texto="hoy: enzimas que cortan celulosa" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ch + 4.8} until={K.Ci - 0.3} texto={<>y algunos <i>Trichoderma</i> protegen plantas</>} x={540} y={1110} tam={30} borde={KC.leaf} />
      <Etq T={T} at={K.Ch + 1.0} until={K.Ci - 0.3} x={60} y={1500} texto="DSMZ (DSM 768) · Bischof et al., 2016 · Druzhinina et al., 2011" tam={20} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="pasteuriza · limpia manos y herramientas" x={540} y={1110} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.Ci + 1.6} until={K.Ou} x={780} y={1060} texto="a la basura" lado="izq" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.0} until={K.Ou} x={60} y={1500} texto="A Robert también se le llenó un frasco" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.0} until={K.Ou} x={60} y={1540} texto="de esporas que no eran las que quería." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.PD} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.PD} until={K.L} texto="10 µm" largo={120} y={1380} />
      <BarraEscala T={T} at={K.L} until={K.P} texto="2 cm" largo={110} y={1400} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.E} until={K.Er} texto="esquemático" largo={0} y={1400} />
      <BarraEscala T={T} at={K.Er} until={K.Er + 3.5} texto="10 cm" largo={150} y={1400} />
      <BarraEscala T={T} at={K.V} until={K.Es} texto="10 cm" largo={150} y={1400} />
      <BarraEscala T={T} at={K.Es} until={K.Gr} texto="mapa esquemático" largo={0} y={1420} />
      <BarraEscala T={T} at={K.Gr} until={K.Ch} texto="10 cm" largo={130} y={1400} />
      <BarraEscala T={T} at={K.Ch} until={K.Ci} texto="esquemático" largo={0} y={1420} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="10 cm" largo={160} y={1400} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Esa pelusa *no es tu hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.PD - 0.1} texto="Primero blanco… *luego verde.*" />
      <Subtitulo T={T} idx={2} at={K.PD + 0.1} until={K.L - 0.1} texto="Le gana *el espacio y la comida.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.P - 0.1} texto={"Cubrió la colonia *en 4 a 6\u00a0días.*"} />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por dónde *se mete?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Er - 0.1} texto="Con *personas y herramientas…* y el agua." />
      <Subtitulo T={T} idx={6} at={K.Er + 0.1} until={K.V - 0.1} texto={"Paja a *71\u00a0°C;* más nitrógeno, *más riesgo.*"} />
      <Subtitulo T={T} idx={7} at={K.V + 0.1} until={K.Es - 0.1} texto="Lo estéril es *un vacío.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Gr - 0.1} texto={"Pérdidas de *hasta 100\u00a0%.*"} />
      <Subtitulo T={T} idx={9} at={K.Gr + 0.1} until={K.Ch - 0.1} texto={"1\u00a0g por kilo: *−68\u00a0a\u00a0−100\u00a0%.*"} />
      <Subtitulo T={T} idx={10} at={K.Ch + 0.1} until={K.Ci - 0.1} texto="Pudría *una tienda militar.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Pasteuriza y *limpia manos y herramientas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.PD + 0.3, K.L - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.L + 0.7, K.L + 3.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.0, K.E + 0.3, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.Er + 0.4, K.Er + 5.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.V + 0.4, K.V + 4.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Es + 3.5, K.Es + 7.9, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ch + 0.4, K.Ch + 6.5, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ci + 0.3, K.Ci + 4.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="108" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MohoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MohoShot /></CompositionStage></div>;
}
window.MohoApp = MohoApp;
