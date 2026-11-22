// Shot Ambiental #35 · El regalito de tu gato es solo una parte — NARRADO (N2 "El número").
// Datos: Loss, Will y Marra 2013 (Nature Communications); Loyd et al. 2013 (Biological Conservation, KittyCam, Athens, Georgia);
// UICN-GISD "100 of the World's Worst Invasive Alien Species"; Jensen, Willson y Powell 2022 (collar Birdsbesafe®). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

const GT_NARANJA = '#f2a54a', GT_RAYA = '#b8662a', GT_GRIS = '#9aa1ab', GT_SOMBRA = 'rgba(22,18,15,.28)';
const GT_ARCOIRIS = ['#ff2d78', '#ffe11a', '#2fe0a8', '#00d2ff', '#b18cff', '#ff8a1f'];

// Gato doméstico sentado, de lado (mira a la derecha; mira=-1 lo voltea). Origen = suelo, entre las patas.
// collar: color del collar · camara: KittyCam bajo la barbilla · funda: funda de colores (tipo Birdsbesafe®) · callejero: flaco y gris con oreja mordida.
function Gato({ x, y, s = 1, T = 0, mira = 1, color = GT_NARANJA, raya = GT_RAYA, collar, camara = false, funda = false, callejero = false, cola = 1, ojos = 1 }) {
  const sw = 6;
  const c = callejero ? '#8d8f96' : color, r = callejero ? '#5d6068' : raya;
  const a = Math.sin(T * 2.2) * 14 * cola;
  const parp = (Math.sin(T * 1.3) > 0.985) ? 0.15 : ojos;
  return <g transform={`translate(${x} ${y}) scale(${s * mira} ${s})`}>
    {/* cola */}
    <g transform={`rotate(${a} -70 -30)`}>
      <path d="M -70 -30 C -150 -30 -175 -110 -150 -170 C -140 -195 -118 -192 -122 -168 C -138 -110 -120 -62 -62 -52 Z" fill={c} stroke={KC.ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M -148 -120 l 22 6 M -150 -150 l 22 4" stroke={r} strokeWidth={7} strokeLinecap="round" />
    </g>
    {/* cuerpo y anca */}
    <ellipse cx={-20} cy={-95} rx={callejero ? 82 : 95} ry={88} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <ellipse cx={-55} cy={-50} rx={70} ry={52} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <path d="M -60 -150 q 14 22 4 44 M -95 -130 q 14 22 4 44 M -30 -165 q 12 20 4 40" stroke={r} strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={-95} cy={-6} rx={36} ry={12} fill={c} stroke={KC.ink} strokeWidth={sw} />
    {/* patas delanteras */}
    <rect x={22} y={-110} width={30} height={110} rx={14} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <rect x={58} y={-110} width={30} height={110} rx={14} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <ellipse cx={40} cy={-6} rx={22} ry={11} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <ellipse cx={76} cy={-6} rx={22} ry={11} fill={c} stroke={KC.ink} strokeWidth={sw} />
    {/* pecho */}
    <ellipse cx={50} cy={-130} rx={52} ry={66} fill={callejero ? '#a7a9af' : '#fbe3c4'} stroke={KC.ink} strokeWidth={sw} />
    {/* cabeza */}
    <path d="M 30 -255 L 26 -322 L 72 -278 Z" fill={c} stroke={KC.ink} strokeWidth={sw} strokeLinejoin="round" />
    <path d={callejero ? 'M 88 -278 L 108 -300 L 112 -312 L 122 -306 L 128 -258 Z' : 'M 88 -278 L 122 -320 L 128 -258 Z'} fill={c} stroke={KC.ink} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 36 -268 L 34 -304 L 58 -280 Z" fill="#ff9fb5" />
    {!callejero && <path d="M 96 -280 L 116 -306 L 118 -268 Z" fill="#ff9fb5" />}
    <ellipse cx={74} cy={-215} rx={66} ry={58} fill={c} stroke={KC.ink} strokeWidth={sw} />
    <path d="M 62 -268 l 2 18 M 76 -270 l 0 18 M 90 -268 l -2 18" stroke={r} strokeWidth={6} strokeLinecap="round" />
    <ellipse cx={74} cy={-190} rx={34} ry={22} fill={callejero ? '#b9bbc0' : '#fbe3c4'} />
    {/* ojos */}
    <ellipse cx={50} cy={-222} rx={12} ry={15 * parp} fill="#c9e86a" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={98} cy={-222} rx={12} ry={15 * parp} fill="#c9e86a" stroke={KC.ink} strokeWidth={4} />
    {parp > 0.5 && <><ellipse cx={52} cy={-222} rx={3.5} ry={11} fill={KC.ink} /><ellipse cx={100} cy={-222} rx={3.5} ry={11} fill={KC.ink} /></>}
    {/* nariz, boca y bigotes */}
    <path d="M 66 -200 L 82 -200 L 74 -190 Z" fill="#ff7f9d" stroke={KC.ink} strokeWidth={3} />
    <path d="M 74 -190 q -6 10 -14 6 M 74 -190 q 6 10 14 6" stroke={KC.ink} strokeWidth={3.5} fill="none" strokeLinecap="round" />
    <path d="M 44 -196 l -50 -8 M 44 -188 l -48 6 M 104 -196 l 50 -8 M 104 -188 l 48 6" stroke={KC.ink} strokeWidth={3} strokeLinecap="round" />
    {/* collar */}
    {collar && !funda && <rect x={14} y={-168} width={110} height={18} rx={9} fill={collar} stroke={KC.ink} strokeWidth={4} />}
    {funda && <g>
      <rect x={6} y={-176} width={126} height={34} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      {GT_ARCOIRIS.map((k, i) => <rect key={i} x={12 + i * 19.5} y={-172} width={16} height={26} rx={6} fill={k} />)}
      {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={10 + i * 17} cy={-176} r={6} fill={GT_ARCOIRIS[i % 6]} stroke={KC.ink} strokeWidth={3} />)}
      {Array.from({ length: 8 }, (_, i) => <circle key={'b' + i} cx={10 + i * 17} cy={-142} r={6} fill={GT_ARCOIRIS[(i + 3) % 6]} stroke={KC.ink} strokeWidth={3} />)}
    </g>}
    {camara && <g transform="translate(70 -150)">
      <rect x={-26} y={-4} width={52} height={36} rx={8} fill="#2c2f36" stroke={KC.ink} strokeWidth={4} />
      <circle cx={6} cy={14} r={10} fill="#5b7bd6" stroke="#0b0c10" strokeWidth={4} />
      <circle cx={6} cy={14} r={3.5} fill="#d8e4ff" />
      <circle cx={-16} cy={4} r={4.5} fill={Math.sin(T * 6) > 0 ? '#ff3b2f' : '#5a1a16'} />
    </g>}
  </g>;
}
// Pajarito cantor de lado (gorrión/cardenal esquemático). caido = en el suelo, de lado y con el ojo cerrado. gris = silueta.
function Pajaro({ x, y, s = 1, color = '#e2483d', pecho = '#ffd6a0', gris = false, caido = false, rot = 0, aleteo = 0, T = 0, o = 1 }) {
  const f = gris ? GT_GRIS : color, st = gris ? 'none' : KC.ink, sw = 4;
  const ala = aleteo ? Math.sin(T * 22) * 30 * aleteo : 0;
  return <g transform={`translate(${x} ${y}) rotate(${caido ? -100 : rot}) scale(${s})`} opacity={o}>
    {!caido && <path d="M -6 18 l -4 16 M 8 18 l 2 16" stroke={gris ? GT_GRIS : '#7a4a22'} strokeWidth={4} strokeLinecap="round" />}
    <path d="M -30 0 L -62 -10 L -58 8 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={34} ry={24} fill={f} stroke={st} strokeWidth={sw} />
    {!gris && <ellipse cx={10} cy={8} rx={20} ry={13} fill={pecho} />}
    <circle cx={28} cy={-18} r={17} fill={f} stroke={st} strokeWidth={sw} />
    <path d="M 42 -22 L 58 -16 L 42 -11 Z" fill={gris ? GT_GRIS : '#ffb43a'} stroke={st} strokeWidth={3} strokeLinejoin="round" />
    {!gris && (caido ? <path d="M 26 -22 l 8 0" stroke={KC.ink} strokeWidth={3} /> : <circle cx={32} cy={-21} r={3.5} fill={KC.ink} />)}
    <path d={`M -14 -6 q 18 ${-20 - ala} 34 ${-2 - ala * 0.3} q -12 18 -34 6 Z`} fill={gris ? '#878e98' : mixHex(color, '#000000', 0.25)} stroke={st} strokeWidth={3} />
  </g>;
}
// Ratón de lado (mira a la derecha). gris = silueta.
function Raton({ x, y, s = 1, gris = false, T = 0, corre = 0, o = 1 }) {
  const f = gris ? GT_GRIS : '#a58d7a', st = gris ? 'none' : KC.ink;
  const b = corre ? Math.abs(Math.sin(T * 14)) * 6 * corre : 0;
  return <g transform={`translate(${x} ${y - b}) scale(${s})`} opacity={o}>
    <path d="M -36 4 C -70 6 -80 -20 -100 -10" stroke={gris ? GT_GRIS : '#d79a9a'} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -40 6 C -44 -30 6 -36 30 -12 L 50 0 C 30 10 -10 12 -40 6 Z" fill={f} stroke={st} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={18} cy={-26} r={11} fill={gris ? GT_GRIS : '#d9b9ad'} stroke={st} strokeWidth={4} />
    {!gris && <><circle cx={34} cy={-8} r={3} fill={KC.ink} /><circle cx={51} cy={0} r={3.5} fill="#ff8aa5" /></>}
  </g>;
}
// Anolis verde (Anolis carolinensis) de lado, sobre una rama: cuerpo esbelto, cola larga, dedos con almohadillas y papada rosa.
function Anolis({ x, y, s = 1, T = 0, papada = 0, gris = false, o = 1 }) {
  const f = gris ? GT_GRIS : '#58c04a', st = gris ? 'none' : KC.ink, sw = 4.5;
  const pd = papada * (0.7 + 0.3 * Math.abs(Math.sin(T * 5)));
  const pata = (px, py, dir) => <g transform={`translate(${px} ${py})`}>
    <path d={`M 0 0 L ${8 * dir} 18 L ${2 * dir} 30`} stroke={f} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {!gris && [-8, 0, 8].map((k) => <circle key={k} cx={2 * dir + k} cy={33} r={3.5} fill={f} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -70 2 C -150 6 -220 -2 -300 16" stroke={f} strokeWidth={10} fill="none" strokeLinecap="round" />
    {!gris && <path d="M -70 2 C -150 6 -220 -2 -300 16" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.0} />}
    {pata(-50, 8, -1)}{pata(30, 8, 1)}
    {pd > 0 && <path d={`M 70 2 Q ${86} ${10 + 40 * pd} ${108} 2 Z`} fill="#ff4f8b" stroke={KC.ink} strokeWidth={3.5} />}
    <path d="M -80 0 C -60 -24 20 -26 60 -12 L 128 -6 C 120 6 96 12 60 10 C 20 16 -50 18 -80 0 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
    {!gris && <><circle cx={86} cy={-10} r={6} fill="#fff8d6" stroke={KC.ink} strokeWidth={2.5} /><circle cx={87} cy={-10} r={2.8} fill={KC.ink} />
      <path d="M 100 2 L 126 -4" stroke={KC.ink} strokeWidth={2.5} /><path d="M -40 -14 C 0 -22 30 -18 56 -12" stroke="#8fe07d" strokeWidth={4} fill="none" /></>}
  </g>;
}
// Frente de la casa: muro, puerta, ventana y tapete. Coordenadas de pantalla (suelo en y = 1180).
function Casa({ T, gato = 'fuera', tapeteVacio = false }) {
  return <g>
    <rect x={0} y={1180} width={KW} height={60} fill="#79c95a" stroke={KC.ink} strokeWidth={6} />
    <rect x={40} y={620} width={600} height={560} fill="#ffd9a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M 20 630 L 340 470 L 660 630 Z" fill="#d8573f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={90} y={840} width={200} height={340} rx={10} fill="#8a5a3a" stroke={KC.ink} strokeWidth={7} />
    <rect x={112} y={866} width={156} height={130} rx={8} fill="#a8734d" stroke={KC.ink} strokeWidth={4} />
    <circle cx={262} cy={1030} r={11} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    <rect x={380} y={760} width={220} height={200} rx={8} fill="#bfe8ff" stroke={KC.ink} strokeWidth={7} />
    <path d="M 490 760 V 960 M 380 860 H 600" stroke={KC.ink} strokeWidth={5} />
    <rect x={366} y={950} width={248} height={22} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    {gato === 'ventana' && <g><rect x={384} y={764} width={212} height={186} fill="#ffe9c8" /><Gato x={500} y={950} s={0.52} T={T} mira={-1} funda /></g>}
    {gato === 'ventana' && <path d="M 490 760 V 960 M 380 860 H 600" stroke={KC.ink} strokeWidth={5} opacity={0.35} />}
    <path d="M 70 1186 L 310 1186 L 296 1150 L 84 1150 Z" fill={tapeteVacio ? '#c6a15c' : '#c6a15c'} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}
// Mapa esquemático de los 48 estados contiguos de EE. UU. (lon/lat aproximados).
const US_PTS = [[-124.7,48.4],[-123.9,46.2],[-124.2,42],[-124.4,40.4],[-122.4,37.2],[-120.6,34.6],[-117.1,32.5],[-114.7,32.7],[-111,31.3],[-108.2,31.3],[-106.5,31.8],[-104.5,29.6],[-103,29],[-101.4,29.8],[-99.5,27.5],[-97.4,25.9],[-97.4,27.8],[-94.7,29.4],[-91,29.2],[-89.4,29],[-89.6,30.2],[-87.5,30.3],[-85,29.7],[-83.6,29],[-82.6,27.5],[-81.8,26],[-80.4,25.2],[-80,26.8],[-81,29.7],[-81.4,31],[-80.4,32.6],[-78.5,33.9],[-76,35.2],[-75.5,35.9],[-76.3,37.9],[-75,38.6],[-74,40.5],[-72,41],[-70,41.6],[-70.6,42.6],[-70.7,43.1],[-69,44],[-67,44.8],[-67.8,47.1],[-69.2,47.4],[-71.5,45],[-74.9,45],[-76.5,44.2],[-79.2,43.3],[-79,42.8],[-82.5,41.7],[-83.1,42],[-82.4,43],[-82.7,45.3],[-84.7,45.9],[-88,48.1],[-89.6,48],[-95.2,49],[-123.3,49]];
function MapaUSA({ x, y, ancho = 600 }) {
  const k = ancho / 58, d = US_PTS.map(([lo, la], i) => `${i ? 'L' : 'M'} ${((lo + 125) * k).toFixed(1)} ${((50 - la) * k * 1.2).toFixed(1)}`).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}><path d={d} fill="#fff1c9" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" /></g>;
}
// Rango de números gigante que cuenta: "1,300 – 4,000".
function Rango({ T, at, until, a, b, etiqueta, abajo, x = KW / 2, y = 860, tam = 130, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), va = klerp(0, a, kprog(T, at, at + 0.9, kEase.sale)), vb = klerp(a, b, kprog(T, at + 1.0, at + 2.0, kEase.sale)), sb = kprog(T, at + 0.9, at + 1.1);
  const est = { font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' };
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:8 }}>{etiqueta}</div>}
    <div style={est}>{kformato(va)}<span style={{ opacity:sb }}> – {kformato(vb)}</span></div>
    {abajo && <div style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:10 }}>{abajo}</div>}
  </div>;
}
// Globo terráqueo esquemático con islas marcadas.
function Globo({ T, x, y, r = 270, pins = 1 }) {
  const giro = (T * 12) % 360;
  const islas = [[-0.55, -0.35], [0.35, -0.5], [0.6, 0.15], [-0.2, 0.45], [0.1, -0.05], [-0.65, 0.2]];
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#3aa0e8" stroke={KC.ink} strokeWidth={8} />
    <g clipPath="url(#gtClip)">
      <path d={`M ${-r * 0.7} ${-r * 0.55} q ${r * 0.3} ${-r * 0.25} ${r * 0.6} ${-r * 0.05} q ${r * 0.1} ${r * 0.3} ${-r * 0.2} ${r * 0.5} q ${-r * 0.3} ${r * 0.1} ${-r * 0.4} ${-r * 0.45} Z`} fill="#7cc46a" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${r * 0.05} ${-r * 0.2} q ${r * 0.35} ${-r * 0.2} ${r * 0.55} ${r * 0.1} q ${-r * 0.05} ${r * 0.5} ${-r * 0.3} ${r * 0.75} q ${-r * 0.25} ${-r * 0.3} ${-r * 0.25} ${-r * 0.85} Z`} fill="#7cc46a" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${-r * 0.55} ${r * 0.15} q ${r * 0.25} ${0} ${r * 0.3} ${r * 0.3} q ${-r * 0.1} ${r * 0.3} ${-r * 0.3} ${r * 0.2} Z`} fill="#7cc46a" stroke={KC.ink} strokeWidth={5} />
    </g>
    <defs><clipPath id="gtClip"><circle r={r - 4} /></clipPath></defs>
    {islas.map(([u, v], i) => { const p = kprog(pins, i / 6, (i + 1) / 6); return p > 0 && <g key={i} transform={`translate(${u * r} ${v * r}) scale(${klerp(0.3, 1, p)})`} opacity={p}>
      <circle r={9} fill="#f6e3a1" stroke={KC.ink} strokeWidth={3} />
      <path d="M 0 -6 L 0 -46" stroke={KC.ink} strokeWidth={4} />
      <circle cx={0} cy={-56} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <path d="M -8 -62 l -3 -9 l 7 5 M 8 -62 l 3 -9 l -7 5" stroke="#fff" strokeWidth={2.5} fill="none" />
    </g>; })}
    <circle r={r} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={14} strokeDasharray={`${r * 0.6} ${r * 6}`} transform={`rotate(${-130 + giro * 0})`} />
  </g>;
}
// Gatera: puerta para gatos en un muro, con la tapa que se mece.
function Gatera({ T, x, y, abre = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-170} width={180} height={170} rx={20} fill="#6b4a33" stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(0 -160) scale(1 ${Math.cos(abre * 1.2)})`}><rect x={-74} y={0} width={148} height={146} rx={14} fill="rgba(200,230,255,.7)" stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}
// Palomita verde.
function Paloma({ x, y, p = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, p)})`} opacity={p}>
    <circle r={60} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
    <path d="M -28 2 L -8 24 L 30 -20" stroke="#fff" strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

// Presas "que no llegaron": siluetas grises detrás de la casa (gancho y cierre).
const GT_SIL = [
  ['p', 720, 960, 0.9], ['r', 860, 1120, 0.9], ['l', 720, 1150, 0.55], ['p', 960, 1010, 0.8], ['r', 120, 420, 0.8],
  ['p', 300, 360, 0.75], ['l', 520, 430, 0.5], ['p', 900, 1160, 0.7], ['r', 1000, 900, 0.7], ['p', 780, 880, 0.6],
  ['l', 260, 540, 0.45], ['p', 560, 560, 0.7], ['r', 680, 1060, 0.7], ['p', 1020, 1090, 0.6]];
function Siluetas({ T, t0, o = 1 }) {
  return <g opacity={o}>{GT_SIL.map(([k, x, y, s], i) => { const p = kprog(T, t0 + i * 0.17, t0 + i * 0.17 + 0.35, kEase.rebote); if (p <= 0) return null;
    const sc = s * klerp(0.3, 1, p);
    return k === 'p' ? <Pajaro key={i} x={x} y={y} s={sc} gris caido={i % 3 === 0} o={p} /> : k === 'r' ? <Raton key={i} x={x} y={y} s={sc} gris o={p} /> : <Anolis key={i} x={x} y={y} s={sc * 0.8} gris o={p} />; })}</g>;
}

function GatosShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Numero, M: CUES.Mamiferos, S: CUES.SinDueno, P: CUES.Pregunta, Ca: CUES.Camaras, R: CUES.Regalos, L: CUES.Lagartijas, I: CUES.Invasor, Co: CUES.Collar, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;

  // gancho: el pajarito cae de la boca del gato al tapete y la cámara se aleja
  const cae = kprog(T, K.G + 0.05, K.G + 0.45, (p) => p * p);
  const pajX = klerp(285, 190, cae), pajY = klerp(945, 1150, cae);
  const aleja = klerp(1.32, 1, kprog(T, K.G + 1.1, K.G + 2.4, kEase.suave));
  // regalos: cuadrícula de 100 presas
  const n23 = Math.round(23 * kprog(T, K.R + 0.3, K.R + 1.6)), n49 = Math.round(49 * kprog(T, K.R + 2.9, K.R + 4.2)), n28 = Math.round(28 * kprog(T, K.R + 4.6, K.R + 5.6));
  const colorCelda = (i) => i < n23 ? KC.gold : (i >= 23 && i < 23 + n49) ? KC.leaf : (i >= 72 && i < 72 + n28) ? KC.coral : 'rgba(22,18,15,.18)';
  // collar: parte A (adentro) y parte B (funda de colores)
  const cB = kprog(T, K.Co + 2.5, K.Co + 3.0);
  // cierre: las siluetas se van y llegan pajaritos de color
  const vuelan = kprog(T, K.C + 1.2, K.C + 3.0, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el regalito en la puerta */}
      <Escena T={T} a={K.G} b={K.N} zoom={0}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform={`translate(0 -110) translate(190 1150) scale(${aleja}) translate(-190 -1150)`}>
          <Siluetas T={T} t0={K.G + 1.9} />
          <Casa T={T} />
          <Gato x={430} y={1186} s={0.85} T={T} mira={-1} collar={KC.red} />
          <Pajaro x={pajX} y={pajY} s={0.8} caido={cae >= 1} rot={cae * -60} />
        </g>)}
      </Escena>
      {/* 1 · el número: aves al año en EE. UU. */}
      <Escena T={T} a={K.N} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<><MapaUSA x={40} y={360} ancho={600} />
          {Array.from({ length: 18 }, (_, i) => { const u = ((T - K.N) * 0.22 + i / 18) % 1; return <Pajaro key={i} x={30 + u * 640} y={400 + (i * 53) % 260} s={0.42} color={i % 2 ? '#e2483d' : '#4a7fe0'} aleteo={1} T={T + i} />; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={700} x={60} color={KC.ink} />
      </Escena>
      {/* 2 · y los mamíferos */}
      <Escena T={T} a={K.M} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svg(Array.from({ length: 9 }, (_, i) => { const u = ((T - K.M) * 0.35 + i / 9) % 1; return <Raton key={i} x={-80 + u * 1240} y={960 + (i % 3) * 70} s={0.9} corre={1} T={T + i * 0.3} />; }))}
      </Escena>
      {/* 3 · siete de cada diez aves: gatos sin dueño */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.S + 0.6 + i * 0.12, K.S + 0.9 + i * 0.12);
            return <Pajaro key={i} x={430 + (i % 5) * 130} y={440 + Math.floor(i / 5) * 150} s={0.95} color={i < 7 ? mixHex('#e2483d', '#4a4a55', on) : '#e2483d'} pecho={i < 7 ? mixHex('#ffd6a0', '#7a7a85', on) : '#ffd6a0'} />; })}
          <Gato x={300} y={1090} s={0.8} T={T} callejero />
          <Gato x={800} y={1090} s={0.8} T={T} mira={-1} collar={KC.red} /></>)}
      </Escena>
      {/* 4 · pregunta: sale por la gatera */}
      <Escena T={T} a={K.P} b={K.Ca} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<><rect x={0} y={960} width={KW} height={230} fill="#ffd9a8" stroke={KC.ink} strokeWidth={6} />
          <text x={300} y={880} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 700)`}>?</text>
          <Gatera T={T} x={190} y={1180} abre={Math.sin((T - K.P) * 7) * Math.exp(-(T - K.P) * 1.2)} />
          <Gato x={klerp(200, 400, kprog(T, K.P + 0.1, K.P + 1.4, kEase.sale))} y={1186} s={0.55} T={T} collar={KC.red} /></>)}
      </Escena>
      {/* 5 · cámaras en el collar (KittyCam) */}
      <Escena T={T} a={K.Ca} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={0} y={1090} width={KW} height={200} fill="#79c95a" stroke={KC.ink} strokeWidth={6} />
          <Gato x={250} y={1096} s={1.45} T={T} collar={KC.red} camara /></>)}
      </Escena>
      {/* 6 · ¿a dónde fueron las presas? 23 / 49 / 28 */}
      <Escena T={T} a={K.R} b={K.L}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(Array.from({ length: 100 }, (_, i) => { const cx = 225 + (i % 10) * 70, cy = 430 + Math.floor(i / 10) * 46;
          return <circle key={i} cx={cx} cy={cy} r={17} fill={colorCelda(i)} stroke={KC.ink} strokeWidth={i < n23 || (i >= 23 && i < 23 + n49) || (i >= 72 && i < 72 + n28) ? 3.5 : 0} />; }))}
      </Escena>
      {/* 7 · la presa más común: una lagartija */}
      <Escena T={T} a={K.L} b={K.I}>
        <FondoLunares color={KC.mint} />
        {svg(<><path d="M -20 1000 C 300 980 600 1020 1100 980" stroke="#7a4a22" strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d="M 760 990 q 60 -60 140 -70" stroke="#7a4a22" strokeWidth={14} fill="none" strokeLinecap="round" />
          <Anolis x={klerp(420, 600, kprog(T, K.L + 0.1, K.L + 1.0, kEase.sale))} y={940} s={2.3} T={T} papada={kprog(T, K.L + 1.4, K.L + 1.8)} /></>)}
      </Escena>
      {/* 8 · UICN: entre las 100 peores especies invasoras */}
      <Escena T={T} a={K.I} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        {svg(<Globo T={T} x={640} y={700} r={240} pins={kprog(T, K.I + 0.3, K.I + 1.6)} />)}
        <EscalaFija texto="esquema" largo={0} y={400} x={880} color={KC.ink} />
      </Escena>
      {/* 9 · qué sí sirve: adentro, o collar de colores */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<><g opacity={1 - cB}>
            <rect x={110} y={420} width={540} height={500} rx={16} fill="#bfe8ff" stroke={KC.ink} strokeWidth={9} />
            <rect x={122} y={432} width={516} height={476} fill="#ffe9c8" />
            <Gato x={380} y={900} s={1.25} T={T} mira={-1} />
            <path d="M 380 420 V 920 M 110 670 H 650" stroke={KC.ink} strokeWidth={7} opacity={0.3} />
            <rect x={90} y={906} width={580} height={30} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <Paloma x={760} y={820} p={kprog(T, K.Co + 1.1, K.Co + 1.5, kEase.rebote)} s={1.1} />
          </g>
          <g opacity={cB}>
            <Gato x={300} y={800} s={1.2} T={T} funda />
            <line x1={80} y1={1080} x2={1000} y2={1080} stroke={KC.ink} strokeWidth={6} />
            {[['sin collar', 2.7, 220], ['con collar', 1, 640]].map(([t, v, cx], j) => { const h = 80 * v * kprog(T, K.Co + 3.4 + j * 0.3, K.Co + 4.2 + j * 0.3, kEase.sale);
              return <g key={j}><rect x={cx - 70} y={1080 - h} width={140} height={h} rx={10} fill={j ? KC.leaf : KC.coral} stroke={KC.ink} strokeWidth={6} />
                <Pajaro x={cx} y={1080 - h - 30} s={0.7} caido={!j} />
                <text x={cx + 90} y={1066} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>; })}
          </g></>)}
      </Escena>
      {/* 10 · cierre: regreso a la puerta, el gato en la ventana con su collar de colores */}
      <Escena T={T} a={K.C} b={FIN} zoom={0}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform="translate(0 -110)">
          <Siluetas T={T} t0={K.C - 5} o={1 - vuelan} />
          <Casa T={T} gato="ventana" tapeteVacio />
          {[[300, 460], [700, 990], [880, 1150], [180, 600], [960, 960]].map(([px, py], i) => { const p = kprog(T, K.C + 1.6 + i * 0.2, K.C + 2.2 + i * 0.2, kEase.sale);
            return p > 0 && <Pajaro key={i} x={px + (1 - p) * 300} y={py - (1 - p) * 200} s={0.75} color={['#e2483d', '#4a7fe0', '#f2b230', '#2fb39a', '#e2483d'][i]} aleteo={1 - p} T={T + i} o={p} />; })}
        </g>)}
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 3.0} until={K.N - 0.2} texto="solo una parte" x={330} y={420} tam={38} borde={KC.ink} />
      <Rango T={T} at={K.N + 0.3} until={K.M - 0.2} a={1300} b={4000} etiqueta="aves al año en EE. UU.:" abajo="millones" y={900} tam={128} />
      <Chip T={T} at={K.N + 3.4} until={K.M - 0.2} texto="Loss, Will y Marra · Nature Communications · 2013" y={1130} tam={24} borde={KC.ink} />
      <Rango T={T} at={K.M + 0.1} until={K.S - 0.2} a={6300} b={22300} etiqueta="mamíferos al año en EE. UU.:" abajo="millones" y={600} tam={118} color={KC.paper} />
      <Etq T={T} at={K.S + 1.9} until={K.P - 0.2} x={110} y={760} texto="sin dueño: ~69 %" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 2.3} until={K.P - 0.2} x={1000} y={760} texto="con dueño" tam={30} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Ca + 1.0} until={K.R - 0.2} x={400} y={880} texto="KittyCam" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 1.4} until={K.R - 0.2} texto="55 gatos · Athens, Georgia" x={760} y={700} tam={28} borde={KC.ink} />
      {kvisible(T, K.Ca + 2.4, K.R - 0.2) && (() => { const e = kentrada(T, K.Ca + 2.4, K.R - 0.2, 'pop'); const rec = Math.sin(T * 6) > 0;
        return <div style={{ position:'absolute', left:420, top:340, width:600, height:300, zIndex:40, opacity:e.o, transform:`scale(${e.s})`, borderRadius:24, overflow:'hidden', border:`7px solid ${KC.ink}`, boxShadow:`10px 10px 0 ${KC.ink}`, background:'linear-gradient(#9fdcff 0 55%, #6cbf4e 55% 100%)' }}>
          <svg width={600} height={300} style={{ position:'absolute', left:0, top:0 }}>
            <Anolis x={360 - ((T - K.Ca) * 30) % 60} y={220} s={0.9} T={T} />
            <Pajaro x={150} y={120} s={0.7} color="#4a7fe0" aleteo={1} T={T} />
            <path d="M 0 300 Q 300 230 600 300" fill="rgba(0,0,0,.25)" />
          </svg>
          <div style={{ position:'absolute', left:18, top:12, font:`700 28px ${KF.mono}`, color:'#fff', textShadow:'0 2px 0 #000' }}><span style={{ color: rec ? '#ff3b2f' : 'transparent' }}>●</span> REC · vista del gato</div>
          <div style={{ position:'absolute', right:18, bottom:12, font:`700 24px ${KF.mono}`, color:'#fff', textShadow:'0 2px 0 #000' }}>2010–2011</div>
        </div>; })()}
      <Chip T={T} at={K.R + 0.1} until={K.L - 0.2} texto="Loyd et al. · Biological Conservation · 2013" x={600} y={340} tam={24} borde={KC.ink} />
      {[['23 %', 'llegó a casa', KC.gold, 0.4], ['49 %', 'se quedó tirado', KC.leaf, 3.0], ['28 %', 'se lo comió', KC.coral, 4.7]].map(([n, t, col, d], i) =>
        kvisible(T, K.R + d, K.L - 0.2) && <div key={i} style={{ position:'absolute', left:150 + i * 270, top:930, width:250, zIndex:41, textAlign:'center', opacity:kentrada(T, K.R + d, K.L - 0.2).o }}>
          <div style={{ font:`400 92px/1 ${KF.titulo}`, color:col, WebkitTextStroke:`3px ${KC.ink}`, textShadow:`4px 4px 0 ${KC.ink}` }}>{n}</div>
          <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink, marginTop:6 }}>{t}</div></div>)}
      <MitoTachado T={T} at={K.L + 0.2} tacharEn={K.L + 1.1} until={K.I - 0.2} texto="¿un ave?" x={300} y={480} tam={56} />
      <Etq T={T} at={K.L + 1.3} until={K.I - 0.2} x={60} y={790} texto="anolis verde" tam={32} color={KC.ink} />
      <Etq T={T} at={K.L + 1.5} until={K.I - 0.2} x={60} y={840} texto="Anolis carolinensis" it tam={32} color={KC.ink} />
      {kvisible(T, K.I + 1.6, K.Co - 0.2) && (() => { const e = kentrada(T, K.I + 1.6, K.Co - 0.2, 'pop');
        return <div style={{ position:'absolute', left:600, top:1010, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-2deg)`, opacity:e.o, width:640, background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:24, padding:'20px 28px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
          <div style={{ font:`700 22px ${KF.mono}`, color:'#5a524a' }}>UICN · Base Global de Especies Invasoras</div>
          <div style={{ font:`900 38px/1.1 ${KF.texto}`, color:KC.ink, marginTop:6 }}>100 de las peores especies exóticas invasoras</div>
          <div style={{ font:`700 30px ${KF.mono}`, color:'#9a9188', marginTop:12 }}>…</div>
          <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, background:KC.yellow, borderRadius:10, padding:'4px 12px', marginTop:4, border:`3px solid ${KC.ink}` }}>38. <i>Felis catus</i> · gato doméstico</div>
          <div style={{ font:`700 30px ${KF.mono}`, color:'#9a9188', marginTop:4 }}>…</div>
        </div>; })()}
      <Chip T={T} at={K.Co + 0.3} until={K.Co + 2.4} texto="¿qué sí sirve? adentro" x={400} y={340} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Co + 3.0} until={K.C - 0.2} texto="2.7 veces menos aves · 94 gatos · 2022" x={400} y={340} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Co + 3.0} until={K.C - 0.2} x={470} y={770} texto="funda de colores" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="adentro o con collar de colores" x={360} y={400} tam={30} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Es *solo una parte.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.M - 0.1} texto="*1,300 a 4,000 millones* de aves." />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.S - 0.1} texto="Y *más de 6,000 millones* de mamíferos." />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.P - 0.1} texto="7 de cada 10: *gatos sin dueño.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ca - 0.1} texto="¿Y cuando *nadie lo ve?*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.R - 0.1} texto="55 gatos con *cámara en el collar.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.L - 0.1} texto="Solo el *23 %* llegó a casa." />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.I - 0.1} texto="Su presa más común: *una lagartija.*" />
      <Subtitulo T={T} idx={8} at={K.I + 0.1} until={K.Co - 0.1} texto="Entre las *100 peores invasoras.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.C - 0.1} texto="Adentro, o *collar de colores.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es malo: *es cazador.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Numero + 2.9, CUES.Numero + 7.6, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.SinDueno + 1.0, CUES.SinDueno + 3.9, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Pregunta + 3.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Camaras + 3.2, CUES.Regalos - 0.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Lagartijas + 0.15, CUES.Invasor - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Invasor + 2.8, CUES.Collar + 0.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Collar + 3.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="35" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GatosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GatosShot /></CompositionStage></div>;
}
window.GatosApp = GatosApp;
