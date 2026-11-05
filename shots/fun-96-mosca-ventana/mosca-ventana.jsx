// Shot Fungi Mati #96 · Esa mosca en tu ventana no murió de vieja: Entomophthora muscae — NARRADO.
// Formato N1 "Por dentro" + N5 "El experimento". Gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md.
// Morfología (Elya et al. 2018, eLife): la mosca muere pegada por la trompa, con las alas levantadas "up and away from its dorsal
// abdomen"; los conidióforos salen por las membranas entre los segmentos del abdomen ("banding pattern"); los conidios primarios
// tienen forma de campana ("campanulate") y salen a ~10 m/s. El halo del vidrio: UW–Madison Extension. Todo es esquemático.

const MC = { cuerpo:'#5d6168', cuerpo2:'#3a3d43', raya:'#202227', ojo:'#b8362b', ojo2:'#7d2019', ala:'rgba(225,240,255,.55)', venas:'rgba(40,50,70,.55)',
  pata:'#25272c', banda:'#fbf6e6', banda2:'#e9dfc2', vidrio:'#bfe9ff', marco:'#f4efe4', marco2:'#d8cfbd', hemo:'#3a1d22', grasa:'#f1cf6a',
  celula:'#f6efd8', cuti:'#b0793a', cuti2:'#7c4f22', nervio:'#7ad8ff' };

/* ---------- la mosca ---------- */
// Mosca casera vista desde arriba (cabeza hacia arriba). (x, y) = centro del tórax. alas 0 = dobladas sobre la panza, 1 = levantadas y abiertas.
// bandas 0..1 = bandas blancas del hongo entre los segmentos. paso = fase de la caminata (patas). zumba = alas que vibran (viva, volando).
function MoscaArriba({ x, y, s = 1, ang = 0, alas = 0, bandas = 0, paso = 0, camina = 0, zumba = 0, T = 0, panza = 0 }) {
  const aA = klerp(14, 62, alas) + (zumba ? Math.sin(T * 90) * 18 : 0), largoAla = klerp(150, 128, alas);
  const pata = (lado, i) => { const yb = -18 + i * 22, sw = camina * Math.sin(paso * 6.283 + i * 2.1 + (lado > 0 ? 3.14 : 0)) * 12;
    const ang0 = [-38, 0, 34][i] + sw; const r = (a) => a * Math.PI / 180;
    const x1 = lado * 34, y1 = yb, x2 = x1 + lado * 62 * Math.cos(r(ang0)), y2 = y1 + 62 * Math.sin(r(ang0)) - 6, x3 = x2 + lado * 44 * Math.cos(r(ang0 + 50 * (i - 1))), y3 = y2 + 44 * Math.sin(r(ang0 + 50 * (i - 1))) + 14;
    return <polyline key={lado + '' + i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="none" stroke={MC.pata} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />; };
  const ala = (lado) => <g transform={`translate(${lado * 14} -12) rotate(${-lado * aA})`}>
    <path d={`M 0 -6 Q ${lado * 26} ${-6 + largoAla * 0.45} ${lado * 8} ${-6 + largoAla} Q ${lado * -22} ${-6 + largoAla * 0.8} ${lado * -6} ${-6 + largoAla * 0.2} Z`} fill={MC.ala} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d={`M 0 -2 Q ${lado * 12} ${largoAla * 0.5} ${lado * 4} ${largoAla * 0.9} M 0 -2 Q ${lado * -6} ${largoAla * 0.4} ${lado * -8} ${largoAla * 0.7}`} stroke={MC.venas} strokeWidth={3} fill="none" />
  </g>;
  const hinchada = 1 + panza * 0.12;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    {[-1, 1].map((l) => [0, 1, 2].map((i) => pata(l, i)))}
    {/* panza: segmentos y bandas blancas del hongo entre ellos */}
    <g transform={`translate(0 92) scale(${hinchada} ${1 + panza * 0.05})`}>
      <ellipse cx={0} cy={0} rx={44} ry={64} fill={MC.cuerpo} stroke={KC.ink} strokeWidth={6} />
      {[-30, -6, 18, 40].map((yy, i) => <g key={i}>
        {bandas > 0 && <path d={`M ${-Math.sqrt(Math.max(0, 1 - (yy / 64) ** 2)) * 44 + 4} ${yy} L ${Math.sqrt(Math.max(0, 1 - (yy / 64) ** 2)) * 44 - 4} ${yy}`} stroke={MC.banda} strokeWidth={14 * bandas} strokeLinecap="round" />}
        {bandas > 0.3 && Array.from({ length: 5 }, (_, k) => <circle key={k} cx={(-0.6 + k * 0.3) * Math.sqrt(Math.max(0, 1 - (yy / 64) ** 2)) * 40} cy={yy - 4 * bandas} r={4.5 * bandas} fill={MC.banda} stroke={MC.banda2} strokeWidth={1.5} />)}
        <path d={`M ${-Math.sqrt(Math.max(0, 1 - (yy / 64) ** 2)) * 42} ${yy + 6} Q 0 ${yy + 14} ${Math.sqrt(Math.max(0, 1 - (yy / 64) ** 2)) * 42} ${yy + 6}`} stroke={MC.cuerpo2} strokeWidth={4} fill="none" />
      </g>)}
    </g>
    {/* tórax con sus 4 rayas oscuras (mosca casera) */}
    <ellipse cx={0} cy={0} rx={40} ry={44} fill={MC.cuerpo} stroke={KC.ink} strokeWidth={6} />
    {[-21, -7, 7, 21].map((xx) => <path key={xx} d={`M ${xx} -36 L ${xx * 0.9} 30`} stroke={MC.raya} strokeWidth={7} strokeLinecap="round" />)}
    {/* alas (encima de la panza cuando están dobladas) */}
    {ala(-1)}{ala(1)}
    {/* cabeza con los ojos grandes rojizos */}
    <ellipse cx={0} cy={-58} rx={42} ry={26} fill={MC.cuerpo2} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-24} cy={-60} rx={20} ry={24} fill={MC.ojo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={24} cy={-60} rx={20} ry={24} fill={MC.ojo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-28} cy={-68} rx={6} ry={5} fill="rgba(255,255,255,.55)" /><ellipse cx={20} cy={-68} rx={6} ry={5} fill="rgba(255,255,255,.55)" />
  </g>;
}

// Mosca de perfil, mirando a la izquierda, parada sobre una superficie en y = 0 (coordenadas locales; s escala).
// trompa 0..1 = la trompa baja hasta la superficie y se pega; alas 0..1 = de doblada (casi horizontal) a levantada ~85°; bandas 0..1.
function MoscaPerfil({ x, y, s = 1, trompa = 0, alas = 0, bandas = 0, pegada = 0, T = 0, camina = 0 }) {
  const aAla = klerp(-8, -85, alas);
  const piernas = [[-62, -58, -100, -26, -96, 0], [-36, -50, -40, -24, -50, 0], [-12, -52, 30, -30, 40, 0]];
  const tY = klerp(-44, 0, trompa);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {piernas.map(([a, b, c, d, e, f], i) => { const sw = camina * Math.sin(T * 10 + i * 2) * 8; return <polyline key={i} points={`${a},${b} ${c + sw},${d} ${e + sw},${f}`} fill="none" stroke={MC.pata} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />; })}
    {/* trompa (proboscis) que baja y se pega con una gotita */}
    <path d={`M -104 -50 Q -110 ${(-50 + tY) / 2} -112 ${tY - 4}`} stroke={MC.cuerpo2} strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={-112} cy={tY - 4} rx={13} ry={7} fill={MC.cuerpo2} stroke={KC.ink} strokeWidth={4} />
    {pegada > 0 && <ellipse cx={-112} cy={2} rx={24 * pegada} ry={8 * pegada} fill="rgba(255,250,220,.85)" stroke={KC.ink} strokeWidth={3} />}
    {/* panza con bandas */}
    <ellipse cx={58} cy={-56} rx={74} ry={44} fill={MC.cuerpo} stroke={KC.ink} strokeWidth={6} />
    {[20, 50, 80, 108].map((xx, i) => <g key={i}>
      {bandas > 0 && <path d={`M ${xx} ${-56 - 40 * Math.sqrt(Math.max(0, 1 - ((xx - 58) / 74) ** 2)) + 6} L ${xx} ${-56 + 40 * Math.sqrt(Math.max(0, 1 - ((xx - 58) / 74) ** 2)) - 6}`} stroke={MC.banda} strokeWidth={14 * bandas} strokeLinecap="round" />}
      <path d={`M ${xx + 6} ${-56 - 38 * Math.sqrt(Math.max(0, 1 - ((xx + 6 - 58) / 74) ** 2))} Q ${xx + 14} -56 ${xx + 6} ${-56 + 38 * Math.sqrt(Math.max(0, 1 - ((xx + 6 - 58) / 74) ** 2))}`} stroke={MC.cuerpo2} strokeWidth={4} fill="none" />
    </g>)}
    {/* tórax y cabeza */}
    <ellipse cx={-34} cy={-74} rx={50} ry={42} fill={MC.cuerpo} stroke={KC.ink} strokeWidth={6} />
    <path d="M -70 -104 Q -34 -118 4 -100" stroke={MC.raya} strokeWidth={7} fill="none" strokeLinecap="round" />
    <circle cx={-100} cy={-76} r={36} fill={MC.cuerpo2} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-104} cy={-82} rx={24} ry={28} fill={MC.ojo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-110} cy={-92} rx={7} ry={6} fill="rgba(255,255,255,.55)" />
    {/* ala: bisagra arriba del tórax; doblada = hacia atrás sobre la panza, levantada = hacia arriba */}
    <g transform={`translate(-22 -108) rotate(${aAla}) scale(0.74)`}>
      <path d="M 0 0 Q 90 -34 200 -8 Q 214 6 196 18 Q 90 30 0 10 Z" fill={MC.ala} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 6 4 Q 90 -12 186 2 M 10 8 Q 90 14 160 12" stroke={MC.venas} strokeWidth={3} fill="none" />
    </g>
  </g>;
}

// Conidio primario de E. muscae: forma de campana ("campanulate"), con una papila ancha en la base. (x, y) = centro; ang en grados.
function Conidio({ x, y, r = 20, ang = 0, halo = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    {halo > 0 && <ellipse cx={0} cy={0} rx={r * 1.55} ry={r * 1.45} fill="rgba(255,248,210,.22)" stroke="rgba(255,248,210,.7)" strokeWidth={3} strokeDasharray="6 6" opacity={halo} />}
    <path d={`M ${-r} ${r * 0.55} Q ${-r * 1.05} ${-r * 0.95} 0 ${-r} Q ${r * 1.05} ${-r * 0.95} ${r} ${r * 0.55} Q ${r * 0.55} ${r * 0.62} ${r * 0.38} ${r * 0.66} Q 0 ${r * 1.15} ${-r * 0.38} ${r * 0.66} Q ${-r * 0.55} ${r * 0.62} ${-r} ${r * 0.55} Z`}
      fill={MC.celula} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.14)} strokeLinejoin="round" />
    {[[-0.35, -0.3], [0.3, -0.35], [0, 0.1], [-0.4, 0.25], [0.38, 0.2]].map(([a, b], i) => <circle key={i} cx={a * r} cy={b * r} r={r * 0.11} fill="#c9b27a" />)}
  </g>;
}
// Conidióforo: tallito que se ensancha en forma de mazo y lleva un conidio encima. Base en (x, y), crece hacia `ang` (−90 = arriba).
function Conidioforo({ x, y, alto = 90, ancho = 22, ang = -90, crece = 1, conidio = 1 }) {
  if (crece <= 0) return null; const h = alto * crece;
  return <g transform={`translate(${x} ${y}) rotate(${ang + 90})`}>
    <path d={`M ${-ancho * 0.28} 0 L ${-ancho * 0.5} ${-h * 0.8} Q 0 ${-h * 1.08} ${ancho * 0.5} ${-h * 0.8} L ${ancho * 0.28} 0 Z`} fill={MC.banda} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    {conidio > 0 && crece >= 1 && <Conidio x={0} y={-h - ancho * 0.55 * conidio} r={ancho * 0.62 * conidio} />}
  </g>;
}

/* ---------- la ventana ---------- */
// Ventana de casa vista desde adentro: marco claro, vidrio con cielo (tarde: 0 = de día, 1 = atardecer).
function Ventana({ T, tarde = 0, sol = 0 }) {
  const cielo1 = mixHex('#7fd8ff', '#ff9a4a', tarde), cielo2 = mixHex('#c9efff', '#ffd27a', tarde);
  return <g>
    <defs><linearGradient id="cieloV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={cielo1} /><stop offset="1" stopColor={cielo2} /></linearGradient>
      <clipPath id="vidrioV"><rect x={90} y={330} width={900} height={1040} /></clipPath></defs>
    <rect x={90} y={330} width={900} height={1040} fill="url(#cieloV)" />
    <g clipPath="url(#vidrioV)">
      <circle cx={760} cy={klerp(470, 1120, sol)} r={110} fill={mixHex('#fff6c0', '#ffb347', tarde)} opacity={0.9} />
      {[[200, 520, 1], [620, 640, 0.8], [380, 760, 0.7]].map(([cx, cy, k], i) => <g key={i} opacity={0.85 - tarde * 0.3} transform={`translate(${(cx + T * 6 * k) % 1100 - 60} ${cy}) scale(${k})`}>
        <ellipse cx={0} cy={0} rx={120} ry={40} fill="#fff" /><ellipse cx={-50} cy={-26} rx={60} ry={40} fill="#fff" /><ellipse cx={40} cy={-34} rx={70} ry={48} fill="#fff" /></g>)}
      <path d={`M 90 1220 Q 300 1150 520 1200 Q 760 1250 990 1170 L 990 1370 L 90 1370 Z`} fill={mixHex('#3fbf4a', '#7a4a3a', tarde * 0.6)} />
      {/* reflejo del vidrio */}
      <path d="M 180 330 L 330 330 L 140 900 L 90 900 L 90 600 Z" fill="rgba(255,255,255,.18)" />
    </g>
    <rect x={90} y={330} width={900} height={1040} fill="none" stroke={MC.marco} strokeWidth={56} />
    <rect x={62} y={302} width={956} height={1096} rx={10} fill="none" stroke={KC.ink} strokeWidth={8} />
    <rect x={118} y={358} width={844} height={984} fill="none" stroke={KC.ink} strokeWidth={6} />
    <rect x={30} y={1398} width={1020} height={60} rx={10} fill={MC.marco2} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Halo de esporas en el vidrio alrededor de la mosca muerta: puntitos que se acumulan (k 0..1).
function HaloVidrio({ x, y, k = 1, seed = 96, n = 220, r0 = 120, r1 = 300 }) {
  const g = krng(seed);
  const pts = Array.from({ length: n }, () => { const a = g() * 6.283, d = r0 + Math.pow(g(), 0.7) * (r1 - r0); return [x + Math.cos(a) * d, y + Math.sin(a) * d * 1.05, 2.5 + g() * 3.5, g()]; });
  return <g>{pts.map(([px, py, r, t], i) => t < k ? <circle key={i} cx={px} cy={py} r={r} fill="rgba(255,255,255,.92)" stroke="rgba(150,160,170,.6)" strokeWidth={1} /> : null)}</g>;
}

// Cajita clara (se lee encima del dibujo). it = cursiva.
function Caja({ T, at, until, x, y, texto, it = false, tam = 34, ancho }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.95)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px/1.25 ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color:KC.ink, whiteSpace: ancho ? 'normal' : 'nowrap', width:ancho, boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}
// Paso numerado (1, 2, 3) que se enciende.
function Paso({ T, at, until, x, y, n, texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'0 50%', display:'flex', alignItems:'center', gap:14 }}>
    <div style={{ width:64, height:64, borderRadius:32, background:KC.yellow, border:`5px solid ${KC.ink}`, font:`400 44px/54px ${KF.titulo}`, textAlign:'center', color:KC.ink }}>{n}</div>
    <div style={{ background:'rgba(14,15,18,.85)', color:KC.texto, borderRadius:14, padding:'8px 18px', font:`900 34px ${KF.texto}`, whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}

/* ---------- el shot ---------- */
function MoscaVentanaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Es: CUES.Espora, A: CUES.Adentro, Su: CUES.Subida, Po: CUES.Pose, P: CUES.Pregunta, E: CUES.Estudio,
    Sa: CUES.Sangre, B: CUES.Bandas, H: CUES.Halo, M: CUES.Machos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const pista = kprog(T, K.G, K.G + 1.4, kEase.sale);                 // la cámara se acerca desde el cuadro 0
  const vuela = kprog(T, K.G, K.G + 1.6);                             // una mosca viva cruza el vidrio
  // espora
  const cae = kprog(T, K.Es + 0.1, K.Es + 0.9, kEase.sale), tubo = kprog(T, K.Es + 1.2, K.Es + 3.0, kEase.suave);
  // por dentro
  const llena = kprog(T, K.A + 0.2, K.A + 3.6), nerv = kprog(T, K.A + 2.0, K.A + 3.0);
  // subida
  const tarde = kprog(T, K.Su, K.Su + 3.6), sube = kprog(T, K.Su + 0.6, K.Su + 3.6, kEase.suave);
  // pose: trompa → se pega → alas en saltitos
  const tr = kprog(T, K.Po + 0.1, K.Po + 0.8, kEase.sale), peg = kprog(T, K.Po + 0.8, K.Po + 1.1);
  const alasPose = [0, 1, 2, 3].reduce((a, i) => a + 0.25 * kprog(T, K.Po + 1.2 + i * 0.32, K.Po + 1.38 + i * 0.32, kEase.sale), 0);
  // estudio: gráfica de actividad
  const graf = kprog(T, K.E + 2.4, K.E + 4.6);
  // sangre
  const iny = kprog(T, K.Sa + 0.5, K.Sa + 1.6), rastro = kprog(T, K.Sa + 1.8, K.Sa + 4.4);
  // bandas
  const salen = kprog(T, K.B + 0.3, K.B + 2.0, kEase.sale);
  // halo
  const halo = kprog(T, K.H + 0.1, K.H + 2.6);
  // machos
  const llega = kprog(T, K.M + 2.6, K.M + 4.4, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y nombre: la mosca pegada al vidrio, alas arriba, panza con bandas y halo blanco */}
      <Escena T={T} a={K.G} b={K.Es} zoom={0.06} origen="45% 48%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Ventana T={T} tarde={0} sol={0} />
          <g transform={`translate(${470 - 470 * (1 + 0.14 * pista)} ${900 - 900 * (1 + 0.14 * pista)}) scale(${1 + 0.14 * pista})`}>
            <HaloVidrio x={470} y={930} k={1} r0={170} r1={330} />
            <MoscaArriba x={470} y={880} s={1.55} ang={-4} alas={1} bandas={1} panza={1} />
          </g>
          {vuela < 1 && <MoscaArriba T={T} x={klerp(120, 1180, vuela)} y={klerp(660, 600, vuela) + Math.sin(T * 9) * 24} s={0.55} ang={80} alas={0.6} zumba={1} />}
          {/* fichas de las dos moscas (Nombre) */}
        </>)}
      </Escena>
      {/* 3 · al microscopio: la espora pegajosa cae, perfora la cutícula y entra a la hemolinfa */}
      <Escena T={T} a={K.Es} b={K.A} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <rect x={-20} y={880} width={1120} height={26} fill={MC.cuti2} stroke={KC.ink} strokeWidth={5} />
          <rect x={-20} y={906} width={1120} height={150} fill={MC.cuti} stroke={KC.ink} strokeWidth={5} />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -20 ${930 + i * 14} L 1100 ${930 + i * 14}`} stroke={MC.cuti2} strokeWidth={2} opacity={0.5} />)}
          <rect x={-20} y={1056} width={1120} height={260} fill={MC.hemo} stroke={KC.ink} strokeWidth={5} />
          {Array.from({ length: 10 }, (_, i) => { const g = krng(i + 3); return <circle key={i} cx={60 + g() * 960} cy={1100 + g() * 160 + Math.sin(T * 2 + i) * 8} r={10 + g() * 10} fill={MC.grasa} opacity={0.75} stroke={KC.ink} strokeWidth={3} />; })}
          {/* tubito de germinación que atraviesa la cutícula */}
          {tubo > 0 && <path d={`M 540 878 L 540 ${878 + tubo * 260}`} stroke={MC.celula} strokeWidth={16} strokeLinecap="round" />}
          {tubo > 0.92 && <ellipse cx={540} cy={1146} rx={26 * kprog(T, K.Es + 2.8, K.Es + 3.2)} ry={20 * kprog(T, K.Es + 2.8, K.Es + 3.2)} fill={MC.celula} stroke={KC.ink} strokeWidth={4} />}
          <Conidio x={540} y={klerp(380, 822, cae)} r={62} ang={0} halo={1} />
        </>)}
      </Escena>
      {/* 4 · por dentro: células del hongo llenan la hemolinfa y comen la grasa; al día 2 llegan al sistema nervioso */}
      <Escena T={T} a={K.A} b={K.Su} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g opacity={0.95}>
            <MoscaPerfil x={560} y={1150} s={2.9} alas={0.1} />
          </g>
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(13,20,36,.55)" />
          {/* cerebro y cordón nervioso (brillan) */}
          <ellipse cx={270} cy={930} rx={52} ry={60} fill={MC.nervio} opacity={0.35 + 0.5 * nerv} stroke={KC.ink} strokeWidth={4} />
          <path d="M 300 960 Q 380 990 470 950" stroke={MC.nervio} strokeWidth={22} strokeLinecap="round" fill="none" opacity={0.35 + 0.5 * nerv} />
          {/* grasa que se acaba */}
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 40); const cx = 640 + g() * 300, cy = 880 + g() * 200; return <circle key={i} cx={cx} cy={cy} r={(14 + g() * 12) * (1 - 0.7 * llena)} fill={MC.grasa} stroke={KC.ink} strokeWidth={3} />; })}
          {/* células del hongo que se multiplican */}
          {Array.from({ length: 70 }, (_, i) => { const g = krng(i + 96); const enN = i % 9 === 0; const cx = enN ? 240 + g() * 230 : 380 + g() * 600, cy = enN ? 900 + g() * 70 : 820 + g() * 280;
            const t0 = enN ? 0.62 + g() * 0.3 : g() * 0.9; const k = kprog(llena, t0, t0 + 0.1);
            return k > 0 ? <ellipse key={i} cx={cx} cy={cy} rx={13 * k} ry={10 * k} transform={`rotate(${g() * 180} ${cx} ${cy})`} fill={MC.celula} stroke={KC.ink} strokeWidth={3} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · días después, antes del atardecer: se agita y sube por el vidrio */}
      <Escena T={T} a={K.Su} b={K.Po} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Ventana T={T} tarde={tarde} sol={tarde * 0.55} />
          <path d={`M 470 1240 L 470 ${klerp(1240, 640, sube) + 60}`} stroke="rgba(255,255,255,.7)" strokeWidth={6} strokeDasharray="10 16" />
          <path d="M 470 560 l -40 60 l 80 0 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Su + 1, K.Su + 1.4)} />
          <MoscaArriba T={T} x={470 + Math.sin(T * 7) * 10 * (1 - sube * 0.5)} y={klerp(1180, 720, sube)} s={0.95} ang={Math.sin(T * 5) * 8} alas={0} camina={1} paso={T * 2.4} />
        </>)}
      </Escena>
      {/* 6 · la pose: estira la trompa, se pega, levanta las alas y muere (de perfil) */}
      <Escena T={T} a={K.Po} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={-20} y={1150} width={1120} height={200} fill={MC.vidrio} stroke={KC.ink} strokeWidth={7} />
          <path d="M 120 1180 L 260 1180 M 640 1210 L 860 1210" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
          <MoscaPerfil T={T} x={480} y={1150} s={2.2} trompa={tr} pegada={peg} alas={alasPose} bandas={0} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿cómo le dice un hongo a una mosca cuándo moverse? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={290} y={1060} tam={460} />
          <g transform="translate(420 520)"><circle r={80} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <line x1={0} y1={0} x2={0} y2={-56} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${T * 120})`} />
            <line x1={0} y1={0} x2={38} y2={0} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${T * 12})`} /></g>
          <MoscaArriba T={T} x={140} y={760} s={0.5} ang={30} alas={0} />
        </>)}
      </Escena>
      {/* 8 · Harvard 2023: la subida necesita neuronas del reloj; la actividad empieza a subir ~2.5 h antes de morir */}
      <Escena T={T} a={K.E} b={K.Sa} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(T > K.E + 2.2 && <g opacity={kprog(T, K.E + 2.2, K.E + 2.6)}>
          {/* cerebro de mosca esquemático con las neuronas del reloj */}
          <g transform="translate(330 760)">
            <path d="M -230 0 Q -250 -110 -140 -120 Q -60 -126 0 -80 Q 60 -126 140 -120 Q 250 -110 230 0 Q 200 90 90 70 Q 0 110 -90 70 Q -200 90 -230 0 Z" fill="#ffe3ec" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={-150} cy={-10} rx={60} ry={70} fill="#ffc6d8" stroke={KC.ink} strokeWidth={5} /><ellipse cx={150} cy={-10} rx={60} ry={70} fill="#ffc6d8" stroke={KC.ink} strokeWidth={5} />
            {[[-40, -60], [-20, -72], [20, -72], [40, -60]].map(([nx, ny], i) => { const b = 0.5 + 0.5 * Math.sin(T * 6 + i); return <g key={i}>
              <circle cx={nx} cy={ny} r={16 + 6 * b} fill={KC.yellow} opacity={0.5} /><circle cx={nx} cy={ny} r={11} fill={KC.gold} stroke={KC.ink} strokeWidth={4} /></g>; })}
          </g>
          {/* gráfica: movimiento de la mosca vs. horas antes de morir */}
          <g transform="translate(110 1000)">
            <line x1={0} y1={170} x2={800} y2={170} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={170} x2={0} y2={0} stroke={KC.ink} strokeWidth={6} />
            <path d={(() => { let d = 'M 0 150'; const n = Math.floor(60 * graf); for (let i = 1; i <= n; i++) { const xx = i * (760 / 60), h = xx < 430 ? 150 - 6 * Math.sin(i * 1.7) : 150 - Math.min(130, (xx - 430) * 0.42) - 6 * Math.sin(i * 1.7); d += ` L ${xx} ${h}`; } return d; })()} stroke={KC.blue} strokeWidth={8} fill="none" strokeLinejoin="round" />
            {graf > 0.55 && <line x1={430} y1={176} x2={430} y2={10} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />}
            {graf > 0.98 && <line x1={760} y1={176} x2={760} y2={10} stroke={KC.red} strokeWidth={6} />}
            <text x={430} y={214} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>−2.5 h</text>
            <text x={760} y={214} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>muere</text>
            <text x={10} y={-12} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>cuánto se mueve (esquema)</text>
          </g>
        </g>)}
      </Escena>
      {/* 9 · algo en su sangre: hemolinfa pasada a otras moscas las hizo caminar más */}
      <Escena T={T} a={K.Sa} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MoscaArriba T={T} x={190} y={730} s={0.62} ang={0} alas={0} />
          <text x={190} y={880} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>la que sube</text>
          {/* jeringa esquemática */}
          <g transform="translate(300 640) rotate(12)">
            <rect x={0} y={-24} width={260} height={48} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={6} y={-18} width={248 * (1 - iny)} height={36} fill="#b8c95a" />
            <line x1={260} y1={0} x2={360} y2={0} stroke={KC.ink} strokeWidth={6} /><rect x={-40} y={-10} width={40} height={20} fill={KC.ink} />
          </g>
          {/* pistas: receptora (más larga) vs. control */}
          {[['con su hemolinfa', 1, 1000, KC.coral], ['control', 0.62, 1160, '#8a8f99']].map(([lab, L, yy, col], i) => { const k = rastro * L;
            return <g key={i}>
              <line x1={140} y1={yy} x2={140 + 760 * k} y2={yy} stroke={col} strokeWidth={10} strokeDasharray="4 22" strokeLinecap="round" />
              <MoscaArriba T={T} x={140 + 760 * k} y={yy} s={0.45} ang={90} alas={0} camina={rastro < 1 ? 1 : 0} paso={T * 3 + i} />
              <text x={140} y={yy - 50} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{lab}</text></g>; })}
        </>)}
      </Escena>
      {/* 10 · ya muerta: bandas blancas de conidióforos entre los segmentos; disparan conidios (campana) a ~10 m/s */}
      <Escena T={T} a={K.B} b={K.H} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {/* tres segmentos del abdomen (placas) con las membranas entre ellos */}
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-40 + i * 290} 1180 Q ${100 + i * 290} 1020 ${210 + i * 290} 1180 Z`} fill={MC.cuerpo} stroke={KC.ink} strokeWidth={6} />)}
          <rect x={-20} y={1176} width={1120} height={140} fill={MC.cuerpo2} stroke={KC.ink} strokeWidth={6} />
          {[1, 2, 3].map((i) => { const bx = -40 + i * 290 - 40; return <g key={i}>
            {Array.from({ length: 7 }, (_, k) => { const g = krng(i * 10 + k); const cx = bx - 30 + k * 12 + g() * 6; const t0 = 0.05 * k + g() * 0.2;
              return <Conidioforo key={k} x={cx} y={1190} alto={170 + g() * 90} ancho={22} ang={-90 + (k - 3) * 7} crece={kprog(salen, t0, t0 + 0.5, kEase.sale)} conidio={kprog(T, K.B + 1.6 + g() * 0.6, K.B + 2.0 + g() * 0.6)} />; })}
          </g>; })}
          {/* conidios disparados */}
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 300); const t0 = K.B + 2.4 + i * 0.2; const u = kprog(T, t0, t0 + 0.55, kEase.sale);
            const sx = 210 + (i % 3) * 290, sy = 940; const ex = sx + (g() - 0.3) * 500, ey = 420 + g() * 160;
            return u > 0 ? <g key={i}>
              <line x1={klerp(sx, ex, Math.max(0, u - 0.15))} y1={klerp(sy, ey, Math.max(0, u - 0.15))} x2={klerp(sx, ex, u)} y2={klerp(sy, ey, u)} stroke="rgba(255,250,220,.5)" strokeWidth={6} strokeLinecap="round" />
              <Conidio x={klerp(sx, ex, u)} y={klerp(sy, ey, u)} r={14} ang={Math.atan2(ey - sy, ex - sx) * 57.3 + 90} halo={1} /></g> : null; })}
        </>)}
      </Escena>
      {/* 11 · el halo blanco en el vidrio alrededor de la mosca */}
      <Escena T={T} a={K.H} b={K.M} zoom={0.05} origen="45% 48%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Ventana T={T} tarde={0.8} sol={0.6} />
          <HaloVidrio x={470} y={930} k={halo} r0={170} r1={330} />
          <MoscaArriba x={470} y={880} s={1.55} ang={-4} alas={1} bandas={1} panza={1} />
          {Array.from({ length: 16 }, (_, i) => { const t0 = K.H + 0.1 + i * 0.14; const u = kprog(T, t0, t0 + 0.4, kEase.sale); const a = i * 2.4;
            return u > 0 && u < 1 ? <circle key={i} cx={470 + Math.cos(a) * klerp(60, 280, u)} cy={980 + Math.sin(a) * klerp(60, 280, u)} r={6} fill="#fff" /> : null; })}
        </>)}
      </Escena>
      {/* 12 · Copenhague 2022: el olor de la hembra muerta atrae a machos sanos, que se contagian */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(T > K.M + 2.2 && <g opacity={kprog(T, K.M + 2.2, K.M + 2.6)}>
          <rect x={-20} y={1150} width={1120} height={200} fill={MC.vidrio} stroke={KC.ink} strokeWidth={7} />
          <MoscaPerfil x={360} y={1150} s={1.6} trompa={1} pegada={1} alas={1} bandas={1} />
          {Array.from({ length: 4 }, (_, i) => { const u = ((T - K.M) * 0.6 + i / 4) % 1; return <path key={i} d={`M ${420 + u * 380} ${980 - u * 300} q 30 -30 0 -60 q -30 -30 0 -60`} stroke={KC.violet} strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.8} />; })}
          <g transform={`translate(${klerp(1020, 600, llega)} ${klerp(820, 1085, llega)})`}>
            <MoscaPerfil x={0} y={0} s={1.3} alas={llega < 1 ? 0.35 + 0.25 * Math.sin(T * 80) : 0.1} camina={0} />
          </g>
        </g>)}
      </Escena>
      {/* 13 · cierre: la misma ventana del inicio, ya al atardecer, con la mosca, las bandas y el halo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 48%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Ventana T={T} tarde={0.9} sol={0.75} />
          <g transform={`translate(${470 - 470 * 1.14} ${900 - 900 * 1.14}) scale(1.14)`}>
            <HaloVidrio x={470} y={930} k={1} r0={170} r1={330} />
            <MoscaArriba x={470} y={880} s={1.55} ang={-4} alas={1} bandas={1} panza={1} />
          </g>
        </>)}
      </Escena>

      {/* textos en pantalla */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 2.0} until={K.G + 3.6} texto="murió de vieja" x={330} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.5} until={K.N - 0.2} texto="la mató un hongo" x={330} y={470} tam={42} borde={KC.red} />
      <Etq T={T} at={K.G + 3.0} until={K.N - 0.2} x={660} y={1060} texto="bandas del hongo" tam={32} color={KC.ink} />
      <Caja T={T} at={K.N + 0.2} until={K.Es - 0.3} x={50} y={410} texto="Entomophthora muscae" it tam={40} />
      <Caja T={T} at={K.N + 0.7} until={K.Es - 0.3} x={50} y={492} texto="hongo que mata moscas" tam={30} />
      <Caja T={T} at={K.N + 1.3} until={K.Es - 0.3} x={50} y={574} texto={<>mosca casera · <i>Musca domestica</i></>} tam={24} />
      <Caja T={T} at={K.N + 1.7} until={K.Es - 0.3} x={50} y={636} texto={<>mosca de la fruta · <i>Drosophila</i></>} tam={24} />
      <Chip T={T} at={K.Es + 0.1} until={K.A - 0.3} texto="AL MICROSCOPIO · esquemático" x={400} y={470} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Es + 0.9} until={K.A - 0.3} x={640} y={790} texto="espora (conidio)" tam={30} color={MC.celula} />
      <Etq T={T} at={K.Es + 1.0} until={K.A - 0.3} x={440} y={790} lado="izq" texto="capa pegajosa" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Es + 1.5} until={K.A - 0.3} x={60} y={980} texto="cutícula (su cubierta)" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Es + 2.4} until={K.A - 0.3} x={60} y={1110} texto="hemolinfa (su sangre)" tam={30} color={KC.texto} />
      <Chip T={T} at={K.A + 0.1} until={K.Su - 0.3} texto="POR DENTRO · esquemático" x={380} y={470} tam={30} borde={KC.gold} mono />
      {T < K.Su - 0.2 && T > K.A + 0.4 && <div style={{ position:'absolute', left:60, top:560, zIndex:41, font:`700 54px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>{T < K.A + 2.0 ? 'día 1' : 'día 2'}</div>}
      <Etq T={T} at={K.A + 0.9} until={K.Su - 0.3} x={1040} y={700} lado="izq" texto="células del hongo" tam={28} color={MC.celula} />
      <Etq T={T} at={K.A + 1.4} until={K.Su - 0.3} x={1040} y={770} lado="izq" texto="grasa (se acaba)" tam={28} color={MC.grasa} />
      <Etq T={T} at={K.A + 2.2} until={K.Su - 0.3} x={250} y={1040} texto="sistema nervioso" tam={30} color={MC.nervio} />
      <Chip T={T} at={K.Su + 0.2} until={K.Po - 0.3} texto="día 4 a 7" x={330} y={470} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Su + 1.0} until={K.Po - 0.3} texto="antes del atardecer" x={380} y={560} tam={34} borde={KC.orange} />
      <Paso T={T} at={K.Po + 0.2} until={K.P - 0.3} x={50} y={430} n="1" texto="estira la trompa" />
      <Paso T={T} at={K.Po + 0.85} until={K.P - 0.3} x={50} y={520} n="2" texto="se pega" />
      <Paso T={T} at={K.Po + 1.3} until={K.P - 0.3} x={50} y={610} n="3" texto="levanta las alas" />
      <BarraEscala T={T} at={K.Po} until={K.P} texto="esquemático" largo={160} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.2} anio="2023" quien="Harvard" revista="Elya y de Bivort · eLife" x={420} y={700} />
      <Etq T={T} at={K.E + 2.8} until={K.Sa - 0.3} x={330} y={885} texto="neuronas del reloj (DN1p)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.Sa - 0.3} texto="empieza ~2.5 h antes de morir" x={400} y={470} tam={30} borde={KC.blue} />
      <Chip T={T} at={K.Sa + 0.2} until={K.B - 0.3} texto="transfusión de hemolinfa" x={360} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Sa + 4.0} until={K.B - 0.3} x={890} y={935} lado="izq" texto="caminó más" tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 0.2} until={K.H - 0.3} texto="AL MICROSCOPIO · esquemático" x={400} y={470} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.B + 1.2} until={K.H - 0.3} x={60} y={1380} texto="conidióforos (bandas blancas)" tam={28} color={MC.banda} />
      <Chip T={T} at={K.B + 2.6} until={K.H - 0.3} texto="≈ 10 m/s" x={300} y={600} tam={56} borde={KC.yellow} />
      <Etq T={T} at={K.H + 1.2} until={K.M - 0.3} x={140} y={600} texto="halo de esporas en el vidrio" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.M + 0.2} until={K.M + 2.2} anio="2022" quien="Univ. de Copenhague" revista="Naundrup y De Fine Licht · ISME J." x={440} y={700} />
      <Etq T={T} at={K.M + 2.7} until={K.C - 0.3} x={30} y={900} texto="hembra muerta" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 3.0} until={K.C - 0.3} x={690} y={860} lado="izq" texto="olor" tam={30} color={KC.violet} />
      <Caja T={T} at={K.M + 4.4} until={K.C - 0.3} x={40} y={420} ancho={600} texto="73 % de los machos se infectaron (cadáveres de 25–30 h)" tam={28} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="la hora" x={200} y={470} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="el lugar" x={200} y={560} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="la pose" x={200} y={650} tam={36} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Es} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Es} until={K.A} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.A} until={K.Su} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Su} until={K.Po} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.E} until={K.Sa} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Sa} until={K.B} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.B} until={K.H} texto="50 µm · esquemático" largo={100} x={640} />
      <BarraEscala T={T} at={K.H} until={K.M} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="esquemático" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No murió de vieja: *la mató un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Es - 0.1} texto="Se llama *_Entomophthora muscae._*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.A - 0.1} texto="Una espora *perfora y entra.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Su - 0.1} texto="En dos días: *sistema nervioso.*" />
      <Subtitulo T={T} idx={4} at={K.Su + 0.1} until={K.Po - 0.1} texto="Antes del atardecer: *sube.*" />
      <Subtitulo T={T} idx={5} at={K.Po + 0.1} until={K.P - 0.1} texto="Se pega, alas arriba… *y muere.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo le dice *cuándo moverse?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Sa - 0.1} texto="2023: *neuronas del reloj.*" />
      <Subtitulo T={T} idx={8} at={K.Sa + 0.1} until={K.B - 0.1} texto="Algo en su *sangre.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.H - 0.1} texto="Bandas blancas: *dispara esporas.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.M - 0.1} texto="El *halo blanco.*" />
      <Subtitulo T={T} idx={11} at={K.M + 0.1} until={K.C - 0.1} texto="2022: el olor *atrae machos.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="La hora, el lugar *y la pose.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.Es - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.A + 0.6, K.Su - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Po + 0.3, K.P - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P - 0.1, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.6, K.Sa - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Sa + 1.0, K.B - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.B + 2.0, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 2.5, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="96" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MoscaVentanaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MoscaVentanaShot /></CompositionStage></div>;
}
window.MoscaVentanaApp = MoscaVentanaApp;
