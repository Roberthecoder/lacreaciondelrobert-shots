// Shot IA #55 · Seis semanas con un tutor de IA que valieron como hasta dos años de escuela — NARRADO (N2 "El número" + N5).
// Datos: De Simone et al., "From Chalkboards to Chatbots", World Bank Policy Research Working Paper 11125 (2025; piloto de 2024
// en Benin City, Nigeria) y blog del Banco Mundial (9 ene 2025). Ver guion.md y verificacion.md. Dibujos esquemáticos.
const AZUL = '#2f6dff';
const svgT = (c, z = 30) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

// Calendario de 6 semanas (filas) × 5 tardes (lun–vie). tachados = cuántas casillas tachadas (0..30).
function Calendario({ x, y, s = 1, tachados = 0, titulo = '6 SEMANAS' }) {
  const out = [];
  for (let i = 0; i < 30; i++) { const c = i % 5, f = Math.floor(i / 5), px = -200 + c * 80, py = -150 + f * 62;
    const k = kclamp(tachados - i, 0, 1);
    out.push(<g key={i} transform={`translate(${px} ${py})`}>
      <rect width={68} height={52} rx={8} fill="#fffdf6" stroke={KC.ink} strokeWidth={4} />
      {k > 0 && <path d={`M 10 10 L ${10 + 48 * Math.min(1, k * 2)} ${10 + 32 * Math.min(1, k * 2)}`} stroke={KC.red} strokeWidth={7} strokeLinecap="round" />}
      {k > 0.5 && <path d={`M 58 10 L ${58 - 48 * (k - 0.5) * 2} ${10 + 32 * (k - 0.5) * 2}`} stroke={KC.red} strokeWidth={7} strokeLinecap="round" />}
    </g>); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-235} y={-290} width={470} height={540} rx={26} fill={KC.white} stroke={KC.ink} strokeWidth={9} />
    <rect x={-235} y={-290} width={470} height={110} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <rect x={-226} y={-200} width={452} height={20} fill={KC.red} />
    {[-150, -50, 50, 150].map((rx) => <rect key={rx} x={rx - 10} y={-318} width={20} height={56} rx={10} fill="#c9c2b4" stroke={KC.ink} strokeWidth={5} />)}
    <text y={-212} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.white}>{titulo}</text>
    {['L', 'M', 'M', 'J', 'V'].map((d, i) => <text key={i} x={-166 + i * 80} y={-160} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{d}</text>)}
    {out}
  </g>;
}

// Mapa esquemático de África con Nigeria y un pin en Benin City (lon/lat → px).
const AFRICA = [[-17,21],[-16,14.7],[-15,11],[-13,8.5],[-11,6.9],[-7.5,4.4],[-2,4.8],[1,6],[4.5,6.3],[7,4.4],[9.5,3.9],[9.5,1],[9,-1],[12,-5],[13,-9],[12,-17],[15,-27],[18.5,-34.5],[20,-34.8],[25,-34],[28,-32.5],[32,-28.5],[32.5,-26],[35.5,-24],[35.3,-22],[34.8,-20],[36.8,-18],[40.5,-15],[40.5,-10.5],[39.5,-6],[40,-3],[42,-0.5],[43.5,1.5],[46,2.5],[48,5],[51,10.5],[51.3,11.8],[48,11.2],[44,10.5],[43.3,12.5],[42.5,14],[40,16],[38.5,18],[37.3,21],[35.7,23.9],[34,27],[32.5,29.9],[32,31.2],[29,30.9],[25,31.7],[20,30.9],[19,30.3],[15.5,31.5],[11.5,33.2],[10,34.2],[11,37],[9.8,37.3],[3,36.8],[-2,35.1],[-5.9,35.8],[-9.5,32],[-9.8,29.5],[-13,27.7],[-15,24.5]];
const NIGERIA = [[2.7,6.4],[4.5,6.3],[5.5,4.4],[7,4.4],[8.5,4.6],[9.6,6.5],[11.2,6.8],[12.2,8.3],[13.5,10.5],[14.6,12],[14.2,13.1],[13.6,13.7],[12.5,13.1],[10.6,13.3],[9,12.8],[7,13],[5.4,13.8],[4,13.5],[3.6,11.7],[2.8,9.5]];
function MapaAfrica({ T, x, y, k = 8, resalta = 1, pin = 1 }) {
  const P = ([lo, la]) => `${x + (lo - 17) * k},${y - (la - 1) * k}`;
  const [bx, by] = [x + (5.63 - 17) * k, y - (6.34 - 1) * k];
  const late = 1 + 0.25 * Math.sin(T * 6);
  return <g>
    <polygon points={AFRICA.map(P).join(' ')} fill="#f3e2b3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <polygon points={NIGERIA.map(P).join(' ')} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" opacity={resalta} />
    {pin > 0 && <g transform={`translate(${bx} ${by - (1 - pin) * 80})`} opacity={pin}>
      <circle r={26 * late} fill="none" stroke={KC.red} strokeWidth={4} opacity={0.6} />
      <path d="M 0 0 C -22 -30 -26 -44 -26 -58 A 26 26 0 1 1 26 -58 C 26 -44 22 -30 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <circle cy={-58} r={9} fill={KC.white} />
    </g>}
  </g>;
}

// Escuelita (para las 9 escuelas públicas).
function Escuela({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-30} width={80} height={60} fill="#fffdf6" stroke={KC.ink} strokeWidth={5} />
    <path d="M -50 -28 L 0 -62 L 50 -28 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-10} y={4} width={20} height={26} fill={AZUL} stroke={KC.ink} strokeWidth={4} />
    <rect x={-32} y={-16} width={16} height={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><rect x={16} y={-16} width={16} height={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />
    <line x1={0} y1={-62} x2={0} y2={-88} stroke={KC.ink} strokeWidth={4} /><path d="M 0 -88 L 22 -81 L 0 -74 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Estudiante esquemático (de espaldas o de frente). piel y playera cambian por semilla.
const PIELES = ['#5a3a26', '#6e4630', '#4a2f20', '#7b5136'];
const PLAYERAS = [KC.white, '#d8e8ff', KC.white, '#fff3c4'];
function Alumno({ x, y, s = 1, seed = 0, chica = false, espalda = true, T = 0 }) {
  const piel = PIELES[seed % 4], ropa = PLAYERAS[seed % 4], b = Math.sin(T * 2.4 + seed) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -70 120 Q -70 30 0 30 Q 70 30 70 120 Z" fill={ropa} stroke={KC.ink} strokeWidth={6} />
    <circle cy={-20} r={48} fill={piel} stroke={KC.ink} strokeWidth={6} />
    {espalda ? <path d={chica ? 'M -50 -30 Q -48 -76 0 -72 Q 48 -76 50 -30 Q 52 10 30 26 L -30 26 Q -52 10 -50 -30 Z' : 'M -46 -34 Q -40 -72 0 -70 Q 40 -72 46 -34 Q 30 -50 0 -48 Q -30 -50 -46 -34 Z'} fill="#1d1612" />
      : <>{chica && <path d="M -50 -20 Q -52 -76 0 -72 Q 52 -76 50 -20 Q 40 -50 0 -52 Q -40 -50 -50 -20 Z" fill="#1d1612" />}
        {!chica && <path d="M -46 -34 Q -40 -72 0 -70 Q 40 -72 46 -34 Q 30 -50 0 -48 Q -30 -50 -46 -34 Z" fill="#1d1612" />}
        <circle cx={-16} cy={-20} r={6} fill={KC.ink} /><circle cx={16} cy={-20} r={6} fill={KC.ink} />
        <path d="M -14 4 Q 0 14 14 4" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" /></>}
  </g>;
}

// Maestra de pie (de frente), con un papel/guía en la mano.
function Maestra({ x, y, s = 1, T = 0, camina = 0 }) {
  const paso = Math.sin(T * 7) * 10 * camina;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-18} y1={150} x2={-18 - paso} y2={250} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <line x1={18} y1={150} x2={18 + paso} y2={250} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <path d="M -70 160 L -50 20 Q 0 0 50 20 L 70 160 Z" fill={KC.magenta} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 46 40 L 92 100" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <rect x={80} y={70} width={56} height={70} rx={6} fill={KC.white} stroke={KC.ink} strokeWidth={5} transform="rotate(-12 108 105)" />
    <circle cy={-40} r={50} fill="#5a3a26" stroke={KC.ink} strokeWidth={7} />
    <path d="M -54 -40 Q -60 -100 0 -96 Q 60 -100 54 -40 Q 46 -70 0 -72 Q -46 -70 -54 -40 Z" fill="#1d1612" />
    <circle cx={0} cy={-104} r={26} fill="#1d1612" />
    <circle cx={-18} cy={-38} r={6} fill={KC.ink} /><circle cx={18} cy={-38} r={6} fill={KC.ink} />
    <path d="M -16 -12 Q 0 0 16 -12" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

// Monitor con un chat (Copilot). mensajes: [{at, yo, texto}]
function Monitor({ T, x, y, s = 1, mensajes = [], titulo = 'Copilot · GPT-4' }) {
  const vis = mensajes.filter((m) => T >= m.at);
  return <div style={{ position:'absolute', left:x, top:y, width:600, height:440, transform:`translate(-50%,-50%) scale(${s})`, zIndex:20 }}>
    <div style={{ position:'absolute', left:0, top:0, width:600, height:400, background:'#10131a', border:`12px solid ${KC.ink}`, borderRadius:26, overflow:'hidden', boxSizing:'border-box' }}>
      <div style={{ background:'#262c3a', color:KC.texto, font:`700 26px ${KF.mono}`, padding:'10px 18px', display:'flex', gap:10, alignItems:'center' }}>
        <div style={{ width:18, height:18, borderRadius:9, background:KC.cyan }}></div>{titulo}</div>
      <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:12 }}>
        {vis.map((m, i) => { const e = kprog(T, m.at, m.at + 0.35, kEase.sale);
          return <div key={i} style={{ alignSelf: m.yo ? 'flex-end' : 'flex-start', maxWidth:430, opacity:e, transform:`translateY(${(1 - e) * 20}px)`,
            background: m.yo ? KC.cyan : '#2f3647', color: m.yo ? KC.ink : KC.texto, borderRadius: m.yo ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
            padding:'10px 18px', font:`800 25px/1.25 ${KF.texto}` }}>{m.texto}</div>; })}
      </div>
    </div>
    <div style={{ position:'absolute', left:260, top:388, width:80, height:40, background:'#3a4152', border:`6px solid ${KC.ink}` }}></div>
  </div>;
}

// Tómbola que gira con bolitas.
function Tombola({ x, y, T, gira = 1 }) {
  const a = T * 200 * gira;
  return <g transform={`translate(${x} ${y})`}>
    <line x1={-110} y1={150} x2={0} y2={0} stroke={KC.ink} strokeWidth={14} /><line x1={110} y1={150} x2={0} y2={0} stroke={KC.ink} strokeWidth={14} />
    <g transform={`rotate(${a})`}>
      <polygon points="0,-130 113,-65 113,65 0,130 -113,65 -113,-65" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} />
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.1) * 60} cy={Math.sin(i * 2.1) * 60} r={20} fill={i % 2 ? KC.cyan : KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
    </g>
    <circle r={16} fill={KC.ink} />
  </g>;
}
// Hoja de examen chiquita.
function Examen({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-34} y={-44} width={68} height={88} rx={6} fill="#fffdf6" stroke={KC.ink} strokeWidth={4} />
    <text x={-22} y={-20} style={{ font:`700 16px ${KF.mono}` }} fill={KC.red}>TEST</text>
    {[-2, 14, 30].map((ly) => <line key={ly} x1={-22} y1={ly} x2={22} y2={ly} stroke="#2b3a8a" strokeWidth={3} />)}
  </g>;
}
// Nota adhesiva que cae y se pega.
function Nota({ T, at, until, texto, x, y, rot = -3, color = KC.yellow, ancho = 640 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote) * (until != null ? 1 - kprog(T, until, until + 0.4) : 1);
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:40, transform:`translate(-50%,-50%) translateY(${(1 - e) * -260}px) rotate(${rot * e + (1 - e) * 14}deg)`, opacity:Math.min(1, e * 2),
    background:color, border:`6px solid ${KC.ink}`, borderRadius:10, padding:'24px 32px', boxShadow:`10px 12px 0 ${KC.ink}`, font:`900 44px/1.15 ${KF.texto}`, color:KC.ink }}>{texto}</div>;
}
// Barra horizontal de tiempo con etiqueta.
function BarraTiempo({ T, at, until, x, y, ancho, color, etiqueta, valor, dur = 1.2 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const g = kprog(T, at, at + dur, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, opacity:kprog(T, at, at + 0.2) * (until != null ? 1 - kprog(T, until, until + 0.4) : 1) }}>
    <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink, marginBottom:8 }}>{etiqueta}</div>
    <div style={{ display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ width:Math.max(16, ancho * g), height:80, background:color, border:`6px solid ${KC.ink}`, borderRadius:14 }}></div>
      <div style={{ font:`400 62px ${KF.titulo}`, color:KC.ink, opacity:g }}>{valor}</div>
    </div>
  </div>;
}

function Tutor() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lugar, S: CUES.Sesiones, M: CUES.Maestros, So: CUES.Sorteo, P: CUES.Pregunta, R: CUES.Resultado,
    E: CUES.Equivalencia, Pe: CUES.Peros, Ch: CUES.Chicas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // bolitas del sorteo: caen alternando a cada lado
  const bolas = Array.from({ length: 12 }, (_, i) => ({ t: K.So + 0.5 + i * 0.16, izq: i % 2 === 0, i }));
  // 10 programas (barras grises, esquemáticas) y la línea del piloto por encima de 8
  const alturas = [60, 85, 105, 120, 140, 160, 185, 210, 300, 360];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: 6 semanas de tardes que se tachan */}
      <Escena T={T} a={K.G} b={K.L}>
        <FondoLunares color={KC.yellow} />
        {svgT(<Calendario x={330} y={720} s={1} tachados={30 * kprog(T, K.G + 0.05, K.G + 3.6, kEase.suave)} />)}
      </Escena>
      <Chip T={T} at={K.G + 4.7} until={K.L - 0.2} texto="6 semanas =" x={800} y={430} tam={44} borde={KC.ink} />
      <NumeroGigante T={T} at={K.G + 5.0} until={K.L - 0.2} valor={2} dur={0.6} prefijo="≈" sufijo=" años*" etiqueta="hasta" x={800} y={650} tam={130} color={KC.mint} />
      <Chip T={T} at={K.G + 5.6} until={K.L - 0.2} texto="*equivalencia estimada · investigadores del Banco Mundial" x={540} y={1070} tam={27} borde={KC.ink} />

      {/* 1 · lugar */}
      <Escena T={T} a={K.L} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svgT(<>
          <MapaAfrica T={T} x={330} y={740} k={8} pin={kprog(T, K.L + 0.4, K.L + 0.9, kEase.rebote)} />
          {Array.from({ length: 9 }, (_, i) => <Escuela key={i} x={120 + i * 105} y={1120} s={0.95} o={kprog(T, K.L + 3.0 + i * 0.12, K.L + 3.3 + i * 0.12)} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.L + 0.8} until={K.S - 0.2} texto="Benin City, Nigeria" x={800} y={770} tam={38} borde={KC.red} />
      <Chip T={T} at={K.L + 1.5} until={K.S - 0.2} texto="junio–julio 2024" x={800} y={870} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.L + 2.3} until={K.S - 0.2} texto="1.º de prepa · ~15 años" x={790} y={970} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.L + 3.6} until={K.S - 0.2} texto="9 escuelas públicas" x={540} y={1210} tam={36} borde={KC.leaf} />

      {/* 2 · sesiones en el laboratorio */}
      <Escena T={T} a={K.S} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svgT(<>
          <Alumno x={480} y={1060} s={0.9} seed={1} T={T} />
          <Alumno x={720} y={1060} s={0.9} seed={2} chica T={T} />
        </>, 25)}
      </Escena>
      {T > K.S - 0.45 && T < K.M + 0.45 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.S - 0.45, K.S + 0.05) * (1 - kprog(T, K.M - 0.05, K.M + 0.45)) }}>
        <Monitor T={T} x={630} y={750} mensajes={[
          { at: K.S + 0.8, yo: true, texto: 'Ayúdame a practicar el pasado en inglés' },
          { at: K.S + 2.2, yo: false, texto: '¡Claro! Completa: «Yesterday I ___ (go) to school».' },
          { at: K.S + 3.8, yo: true, texto: 'went' }]} />
      </div>}
      <Chip T={T} at={K.S + 0.3} until={K.M - 0.2} texto="hasta 12 sesiones × 90 min" x={600} y={410} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.S + 2.6} until={K.M - 0.2} texto="en parejas · 2 por semana" x={600} y={475} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.S + 4.0} until={K.M - 0.2} texto="diálogo ilustrativo" x={800} y={985} tam={24} borde={KC.texto} />

      {/* 3 · los maestros guían */}
      <Escena T={T} a={K.M} b={K.So}>
        <FondoLunares color={KC.orange} />
        {svgT(<>
          <rect x={90} y={360} width={900} height={300} rx={18} fill="#1f4d3a" stroke="#7a4a2a" strokeWidth={22} />
          <text x={130} y={450} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>{'Instrucción 1:'.slice(0, Math.round(14 * kprog(T, K.M + 0.2, K.M + 0.9)))}</text>
          <text x={130} y={510} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{'«Pídele a Copilot que te ponga'.slice(0, Math.round(30 * kprog(T, K.M + 0.8, K.M + 1.8)))}</text>
          <text x={130} y={560} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{'ejercicios de este tema.»'.slice(0, Math.round(25 * kprog(T, K.M + 1.8, K.M + 2.6)))}</text>
          {[0, 1, 2].map((i) => <g key={i}><rect x={110 + i * 310} y={1040} width={240} height={30} rx={6} fill="#9b6a3c" stroke={KC.ink} strokeWidth={5} />
            <rect x={160 + i * 310} y={960} width={140} height={84} rx={8} fill="#10131a" stroke={KC.ink} strokeWidth={5} /></g>)}
          <path d="M 200 900 Q 540 760 880 900" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" fill="none" opacity={kprog(T, K.M + 1.2, K.M + 1.6)} />
          <Maestra x={klerp(200, 860, kprog(T, K.M + 1.0, K.So + 0.2, kEase.suave))} y={790} s={0.62} T={T} camina={T > K.M + 1 ? 1 : 0} />
        </>)}
      </Escena>
      <Chip T={T} at={K.M + 2.4} until={K.So - 0.2} texto="la maestra guía, no da la clase" x={600} y={300} tam={36} borde={KC.ink} />

      {/* 4 · sorteo y mismo examen */}
      <Escena T={T} a={K.So} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svgT(<>
          <Tombola x={420} y={560} T={T} gira={T < K.So + 2.6 ? 1 : 0.2} />
          {bolas.map((b) => { if (T < b.t) return null; const u = kprog(T, b.t, b.t + 0.5, kEase.suave);
            const x0 = 420, y0 = 690, x1 = b.izq ? 220 + (b.i % 6) * 18 : 640 + (b.i % 6) * 18, y1 = 940;
            return <circle key={b.i} cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u) - Math.sin(u * Math.PI) * 60} r={18} fill={b.izq ? KC.cyan : KC.yellow} stroke={KC.ink} strokeWidth={4} />; })}
          <rect x={120} y={960} width={340} height={110} rx={18} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
          <rect x={560} y={960} width={340} height={110} rx={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
          <text x={290} y={1010} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>con tutor de IA</text>
          <text x={730} y={1010} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>clases normales</text>
          {[0, 1, 2].map((i) => <g key={i}>
            <Examen x={210 + i * 80} y={1050 + 0 * i} s={0.6} o={kprog(T, K.So + 2.6 + i * 0.1, K.So + 2.9 + i * 0.1)} />
            <Examen x={650 + i * 80} y={1050} s={0.6} o={kprog(T, K.So + 2.6 + i * 0.1, K.So + 2.9 + i * 0.1)} /></g>)}
        </>)}
      </Escena>
      <Chip T={T} at={K.So + 0.3} until={K.So + 2.5} texto="por sorteo" x={420} y={360} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.So + 2.7} until={K.P - 0.15} texto="el mismo examen" x={420} y={360} tam={40} borde={KC.ink} />

      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svgT(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>

      {/* 6 · resultado */}
      <Escena T={T} a={K.R} b={K.E}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svgT(<>
          <line x1={90} y1={1120} x2={990} y2={1120} stroke={KC.ink} strokeWidth={6} />
          {alturas.map((h, i) => { const g = kprog(T, K.R + 1.6 + i * 0.08, K.R + 2.2 + i * 0.08, kEase.sale), abajo = i < 8 && T > K.R + 3.4;
            return <rect key={i} x={110 + i * 88} y={1120 - h * g} width={64} height={h * g} rx={6} fill={abajo ? '#9aa0ab' : (i < 8 ? '#c9ccd3' : '#c9ccd3')} stroke={KC.ink} strokeWidth={4} />; })}
          {T > K.R + 2.8 && <g opacity={kprog(T, K.R + 2.8, K.R + 3.2)}>
            <line x1={90} y1={900} x2={90 + 900 * kprog(T, K.R + 2.8, K.R + 3.5, kEase.sale)} y2={900} stroke={KC.gold} strokeWidth={12} strokeLinecap="round" />
            <text x={980} y={880} textAnchor="end" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>el piloto</text>
          </g>}
          {T > K.R + 3.4 && <text x={380} y={870} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.R + 3.4, K.R + 3.8)}>8 de 10 quedan abajo</text>}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.R + 0.2} until={K.E - 0.2} valor={0.31} dec={2} prefijo="+" sufijo=" σ" etiqueta="" x={420} y={470} tam={170} color={KC.gold2} />
      <Chip T={T} at={K.R + 0.7} until={K.E - 0.2} texto="examen completo · inglés: +0.23 σ" x={420} y={630} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.R + 2.0} until={K.E - 0.2} texto="programas probados con sorteo · países de ingreso bajo y medio (esquemático)" x={540} y={740} tam={22} borde={KC.ink} />

      {/* 7 · la equivalencia */}
      <Escena T={T} a={K.E} b={K.Pe}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      <MitoTachado T={T} at={K.E + 0.2} tacharEn={K.E + 1.2} until={K.E + 3.0} texto="«aprendieron 2 años de temario»" y={430} tam={40} />
      <NumeroGigante T={T} at={K.E + 0.4} until={K.E + 1.8} valor={2} dur={0.5} sufijo=" años" etiqueta="¿de temario?" x={540} y={800} tam={200} color={KC.red} />
      <BarraTiempo T={T} at={K.E + 2.0} until={K.Pe - 0.2} x={90} y={570} ancho={70} color={KC.gold2} etiqueta="piloto con tutor de IA" valor="6 semanas" />
      <BarraTiempo T={T} at={K.E + 3.2} until={K.Pe - 0.2} x={90} y={770} ancho={760} color={KC.mint} etiqueta="mejora equivalente a…" valor="" dur={1.6} />
      <Chip T={T} at={K.E + 4.6} until={K.Pe - 0.2} texto="1.5 a 2 años de escuela normal en Nigeria" x={540} y={990} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.E + 5.2} until={K.Pe - 0.2} texto="equivalencia estimada (método EYOS)" x={540} y={1100} tam={28} borde={KC.ink} />

      {/* 8 · los peros */}
      <Escena T={T} a={K.Pe} b={K.Ch}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <Nota T={T} at={K.Pe + 0.9} texto="Piloto: 1 ciudad, 6 semanas" until={K.Ch - 0.2} x={400} y={500} rot={-3} color={KC.yellow} ancho={580} />
      <Nota T={T} at={K.Pe + 2.0} texto="El otro grupo: sin horas extra" until={K.Ch - 0.2} x={420} y={730} rot={2} color={KC.pink} ancho={600} />
      <Nota T={T} at={K.Pe + 3.4} texto="¿Dura? Aún no se sabe" until={K.Ch - 0.2} x={400} y={960} rot={-2} color={KC.mint} ancho={580} />

      {/* 9 · las chicas */}
      <Escena T={T} a={K.Ch} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svgT(<>
          <line x1={420} y1={1100} x2={1000} y2={1100} stroke={KC.ink} strokeWidth={6} />
          {[{ x: 500, a: 170, b: 400, c: KC.pink, t: 'chicas' }, { x: 780, a: 250, b: 360, c: AZUL, t: 'chicos' }].map((o, i) => {
            const h = klerp(o.a, o.b, kprog(T, K.Ch + 1.0, K.Ch + 2.6, kEase.sale));
            return <g key={i}><rect x={o.x} y={1100 - h} width={150} height={h} rx={10} fill={o.c} stroke={KC.ink} strokeWidth={6} />
              <line x1={o.x - 10} y1={1100 - o.a} x2={o.x + 160} y2={1100 - o.a} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
              <text x={o.x + 75} y={1150} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{o.t}</text></g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.Ch + 0.4} until={K.C - 0.2} texto="antes - - -  ·  después ▮" x={720} y={560} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ch + 1.8} until={K.C - 0.2} texto="con cautela · esquemático" x={720} y={640} tam={28} borde={KC.ink} />

      {/* 10 · cierre: el mismo calendario, ahora con la maestra al lado */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svgT(<>
          <Calendario x={330} y={720} s={1} tachados={30} />
          <g opacity={kprog(T, K.C + 1.6, K.C + 2.2)}><Robotito x={750} y={920} s={0.7} T={T} cara="feliz" /></g>
          <g opacity={kprog(T, K.C + 2.4, K.C + 3.0)}><Maestra x={950} y={850} s={0.6} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.4} until={K.Ou} texto="hasta 2 años*" x={330} y={1060} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="IA + maestro" x={830} y={1100} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="6 semanas de tardes… *¿como 2 años de escuela?*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.S - 0.1} texto="Benin City, Nigeria, *2024.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.M - 0.1} texto="Inglés con *Copilot (GPT-4)*, en parejas." />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.So - 0.1} texto="Los maestros *guiaban y vigilaban.*" />
      <Subtitulo T={T} idx={4} at={K.So + 0.1} until={K.P - 0.1} texto="Sorteo… *y el mismo examen.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.R - 0.1} texto="¿Cuánto *mejoraron?*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.E - 0.1} texto="Más que *8 de cada 10* programas." />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Pe - 0.1} texto="No es temario: *es una equivalencia.*" />
      <Subtitulo T={T} idx={8} at={K.Pe + 0.1} until={K.Ch - 0.1} texto="Y tiene *peros.*" />
      <Subtitulo T={T} idx={9} at={K.Ch + 0.1} until={K.C - 0.1} texto="Las chicas *parecen ganar más.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="IA *con un maestro al lado.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Lugar + 4.2, CUES.Sesiones + 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Sesiones + 2.4, CUES.Maestros - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Sorteo + 0.4, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Resultado + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Resultado + 3.6, CUES.Equivalencia - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Equivalencia + 3.2, CUES.Peros - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Peros + 0.3, CUES.Chicas - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Chicas + 0.3, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="55" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TutorNigeriaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Tutor /></CompositionStage></div>;
}
window.TutorNigeriaApp = TutorNigeriaApp;
