// Shot Fungi Mati #115 · Esa mancha en tu arroz no es una mordida: empezó con un agujero hecho a presión — NARRADO (N1 "Por dentro").
// Magnaporthe oryzae (= Pyricularia oryzae): espora → apresorio con melanina y glicerol → clavija a presión → mancha en rombo.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const AC = { hoja:'#4fb84a', hoja2:'#3a9a3a', vena:'#2f7f2f', lesion:'#8b5a2b', lesion2:'#c9c2b0', halo:'#d9d36a',
  grano:'#fffaf0', grano2:'#efe6d2', espiga:'#e8c45a', espiga2:'#c99b2e', conidio:'#ecdcbf', conidioB:'#a88a5c',
  mel:'#21160f', mel2:'#5a3d26', glic:'#ffd43b', agua:'#5fd0ff', cuti:'#e9d36a', pared:'#5f9e46', pared2:'#3f7a30',
  celula:'#16301f', celula2:'#1e3d28', plastico:'#cfe3ee', trigo:'#e2b94e', trigoB:'#f4efdc', mar:'#123a5a', tierra:'#d9c48a' };

// Hoja de arroz recta y angosta: base en (x, y), apunta hacia ang (grados). mancha 0..1 = lesión en rombo en la fracción u.
function HojaArroz({ T = 0, x, y, largo = 900, ancho = 110, ang = 0, mancha = 0, u = 0.5, seed = 1, otras = [] }) {
  const L = largo, w = ancho / 2;
  const d = `M 0 ${-w} C ${L * 0.5} ${-w} ${L * 0.82} ${-w * 0.55} ${L} 0 C ${L * 0.82} ${w * 0.55} ${L * 0.5} ${w} 0 ${w} Z`;
  const lesion = (cx, k, key) => { if (k <= 0) return null; const l = ancho * 2.2 * k, h = w * 0.78 * Math.min(1, k * 1.2);
    return <g key={key}>
      <path d={`M ${cx - l * 0.62} 0 Q ${cx} ${-h * 1.25} ${cx + l * 0.62} 0 Q ${cx} ${h * 1.25} ${cx - l * 0.62} 0 Z`} fill={AC.halo} opacity={0.55} />
      <path d={`M ${cx - l / 2} 0 Q ${cx} ${-h} ${cx + l / 2} 0 Q ${cx} ${h} ${cx - l / 2} 0 Z`} fill={AC.lesion} stroke={KC.ink} strokeWidth={2.5} />
      <path d={`M ${cx - l * 0.36} 0 Q ${cx} ${-h * 0.62} ${cx + l * 0.36} 0 Q ${cx} ${h * 0.62} ${cx - l * 0.36} 0 Z`} fill={AC.lesion2} />
    </g>; };
  return <g transform={`translate(${x} ${y}) rotate(${ang + mece(T, seed, 0.25) * 1.2})`}>
    <path d={d} fill={AC.hoja} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-0.55, -0.3, 0, 0.3, 0.55].map((f, i) => <path key={i} d={`M 6 ${f * w * 1.6} Q ${L * 0.6} ${f * w * 1.2} ${L * 0.97} 0`} stroke={i === 2 ? AC.vena : AC.hoja2} strokeWidth={i === 2 ? 4 : 2} fill="none" opacity={0.8} />)}
    {lesion(L * u, mancha, 'm')}
    {otras.map(([uu, k], i) => lesion(L * uu, k, i))}
  </g>;
}

// Plato de arroz blanco (tu arroz), visto de lado.
function PlatoArroz({ x, y, s = 1 }) {
  const g = krng(5);
  const granos = Array.from({ length: 46 }, () => { const a = g() * Math.PI, r = g(); return [Math.cos(a) * 150 * r * 1.05, -Math.sin(a) * 70 * r - 8, g() * 180]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -160 -6 Q -160 -95 0 -100 Q 160 -95 160 -6 Z" fill={AC.grano} stroke={KC.ink} strokeWidth={6} />
    {granos.map(([gx, gy, r], i) => <ellipse key={i} cx={gx} cy={gy} rx={13} ry={5.5} fill={i % 3 ? AC.grano : AC.grano2} stroke="#b9ad94" strokeWidth={1.5} transform={`rotate(${r} ${gx} ${gy})`} />)}
    <path d="M -185 -8 L 185 -8 Q 170 110 0 118 Q -170 110 -185 -8 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -150 20 Q 0 40 150 20" stroke="#fff" strokeWidth={8} fill="none" opacity=".5" strokeLinecap="round" />
    <path d="M -60 118 L -70 140 L 70 140 L 60 118 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Mata de arroz con espigas que cuelgan; algunas hojas con manchas en rombo.
function MataArroz({ T, x, y, s = 1, manchas = 1 }) {
  const hojas = [[-62, 560, 1, [[0.55, 0.9 * manchas]]], [-80, 470, 2, []], [-100, 520, 3, [[0.5, 0.8 * manchas], [0.75, 0.5 * manchas]]], [-118, 430, 4, []],
    [-50, 480, 5, []], [-130, 380, 6, [[0.6, 0.7 * manchas]]], [-90, 600, 7, []]];
  const espiga = (dx, dir, k) => { const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([dx + dir * u * 150, -640 + u * u * 230 + mece(T, k, 0.25) * 6 * u]); }
    return <g key={k}>
      <path d={`M ${dx * 0.3} 0 Q ${dx * 0.6} -400 ${dx} -640`} stroke={AC.hoja2} strokeWidth={8} fill="none" />
      <path d={'M ' + pts.map((p) => p.join(' ')).join(' L ')} stroke={AC.espiga2} strokeWidth={5} fill="none" />
      {pts.slice(1).map(([px, py], i) => [-1, 1].map((sd) => <ellipse key={i + '' + sd} cx={px + sd * 9} cy={py + 6} rx={7} ry={14} fill={AC.espiga} stroke={KC.ink} strokeWidth={2} transform={`rotate(${sd * 25 + dir * 20} ${px + sd * 9} ${py + 6})`} />))}
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {espiga(-30, -1, 11)}{espiga(40, 1, 12)}{espiga(5, 1, 13)}
    {hojas.map(([a, L, sd, ot], i) => <HojaArroz key={i} T={T} x={(i - 3) * 6} y={0} largo={L} ancho={38} ang={a + (i % 2 ? 1 : -1) * (i * 6)} seed={sd} otras={ot} />)}
    <path d="M -40 0 Q 0 30 40 0" stroke="#7a5a3a" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}

// Conidio de M. oryzae: en forma de pera, translúcido café muy pálido, 2 tabiques (3 células). Base ancha a la izq., punta a la der.
// Mide 280 px de largo (28 µm a 10 px/µm). muci 0..1 = gotita de pegamento en la punta.
function Conidio({ x, y, s = 1, rot = 0, muci = 0, T = 0 }) {
  const d = 'M -140 0 C -142 -52 -70 -48 -10 -40 C 50 -32 118 -16 140 0 C 118 16 50 32 -10 40 C -70 48 -142 52 -140 0 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {muci > 0 && <circle cx={146} cy={4} r={10 + 18 * muci} fill="#bff4ff" opacity={0.55 * muci} style={{ filter:'drop-shadow(0 0 10px #9be8ff)' }} />}
    <path d={d} fill={AC.conidio} fillOpacity={0.62} stroke={AC.conidioB} strokeWidth={5} />
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={1.5} opacity={0.6} />
    <path d="M -46 -44 Q -36 0 -46 44" stroke={AC.conidioB} strokeWidth={5} fill="none" />
    <path d="M 46 -30 Q 54 0 46 30" stroke={AC.conidioB} strokeWidth={5} fill="none" />
    <ellipse cx={-96} cy={-16} rx={22} ry={9} fill="#fff" opacity={0.28} />
  </g>;
}

// Superficie de la hoja al microscopio (de lado): cutícula + células de la epidermis. y0 = línea de la cutícula.
function SuperficieHoja({ y0 = 1010, alto = 220, celW = 230 }) {
  return <g>
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-60 + i * celW} y={y0 + 14} width={celW - 12} height={alto} rx={26} fill={AC.celula2} stroke={AC.pared} strokeWidth={6} />)}
    <rect x={0} y={y0 - 4} width={KW} height={16} fill={AC.cuti} opacity={0.9} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={20 + i * 36} cy={y0 - 6} r={5} fill="#f6ea9a" opacity={0.7} />)}
  </g>;
}

// Apresorio visto de lado (domo) en (x, y = base). r = radio. mel 0..1 = melanina; glic 0..1 = puntitos de glicerol.
function Apresorio({ x, y, r = 55, mel = 0, glic = 0, T = 0, n = 14, seed = 3, interior = false }) {
  if (r <= 0.5) return null;
  const col = mixHex(AC.conidio, AC.mel, mel), g = krng(seed);
  const pts = Array.from({ length: n }, () => [(g() - 0.5) * 1.5 * r * 0.8, -g() * r * 0.75 - r * 0.1, g()]);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r} 0 A ${r} ${r * 0.95} 0 0 1 ${r} 0 Z`} fill={col} fillOpacity={0.7 + 0.3 * mel} stroke={mel > 0.5 ? AC.mel2 : AC.conidioB} strokeWidth={4 + 6 * mel} />
    {glic > 0 && pts.map(([px, py, k], i) => i / n < glic && <circle key={i} cx={px + Math.sin(T * 5 + i) * r * 0.04} cy={py + Math.cos(T * 4 + i) * r * 0.04} r={Math.max(2.5, r * 0.07)} fill={AC.glic} style={{ filter:`drop-shadow(0 0 4px ${AC.glic})` }} />)}
  </g>;
}

// Llanta de coche esquemática.
function Llanta({ x, y, r = 70, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 30})`}>
    <circle r={r} fill="#2b2b2b" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-5} y={-r} width={10} height={14} fill="#555" transform={`rotate(${i * 30})`} />)}
    <circle r={r * 0.55} fill="#c9ced6" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 5 }, (_, i) => <line key={i} x1={0} y1={0} x2={0} y2={-r * 0.45} stroke="#7d848e" strokeWidth={8} transform={`rotate(${i * 72})`} />)}
    <circle r={r * 0.14} fill="#7d848e" stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Espiga de trigo: tallo + espiguillas con aristas. blanca 0..1 = se blanquea de arriba hacia el punto de infección (u = 0.55).
function EspigaTrigo({ T, x, y, s = 1, blanca = 0 }) {
  const n = 12;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 4, 0.3) * 2})`}>
    <path d="M 0 0 Q -8 -320 0 -620" stroke={AC.hoja2} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 0 -620 L 0 -950" stroke={mixHex(AC.trigo, AC.trigoB, blanca)} strokeWidth={8} />
    <path d="M 70 -260 Q 150 -360 190 -330 Q 120 -300 10 -240 Z" fill={AC.hoja} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: n }, (_, i) => { const u = i / (n - 1), yy = -630 - u * 300, sd = i % 2 ? 1 : -1;
      const b = kclamp((blanca * 1.0 - (1 - u) * 0.0) * (u >= 0.45 ? 1 : 0) * kclamp((blanca - (1 - u) * 0.8) * 3, 0, 1), 0, 1);
      const col = mixHex(AC.trigo, AC.trigoB, b);
      return <g key={i} transform={`translate(${sd * 18} ${yy}) rotate(${sd * 22})`}>
        <line x1={0} y1={-30} x2={sd * 12} y2={-140} stroke={mixHex('#c9a24a', '#e6e1cf', b)} strokeWidth={3} />
        <ellipse cx={0} cy={0} rx={22} ry={34} fill={col} stroke={KC.ink} strokeWidth={4} />
        <path d="M 0 -26 L 0 26" stroke={KC.ink} strokeWidth={2} opacity=".4" /></g>; })}
    {blanca > 0 && <circle cx={0} cy={-760} r={13} fill="#3a2a1a" stroke={KC.ink} strokeWidth={3} opacity={kclamp(blanca * 4, 0, 1)} />}
  </g>;
}

// Mapa del mundo muy esquemático (lon −90…150, lat 75…−58) en una caja.
const MAPA = { x: 440, y: 770, w: 600, h: 340, lon0: -90, lon1: 150, lat0: 75, lat1: -58 };
const mp = (lon, lat) => [MAPA.x + (lon - MAPA.lon0) / (MAPA.lon1 - MAPA.lon0) * MAPA.w, MAPA.y + (MAPA.lat0 - lat) / (MAPA.lat0 - MAPA.lat1) * MAPA.h];
const poly = (pts) => 'M ' + pts.map(([a, b]) => mp(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
const SUDAM = [[-80,10],[-75,11],[-62,10],[-50,0],[-35,-6],[-39,-15],[-48,-26],[-58,-38],[-65,-55],[-72,-50],[-71,-30],[-70,-18],[-81,-5],[-79,2]];
const NORAM = [[-90,30],[-82,30],[-80,25],[-80,32],[-76,38],[-70,42],[-66,45],[-60,47],[-62,55],[-75,62],[-90,64],[-90,30]];
const CENAM = [[-90,21],[-87,21],[-88,16],[-84,15],[-83,10],[-79,9],[-80,7],[-84,9],[-87,13],[-90,14]];
const AFRICA = [[-17,21],[-6,35],[10,37],[32,31],[43,12],[51,12],[40,-5],[40,-15],[33,-26],[20,-35],[13,-20],[9,-1],[-8,4],[-17,14]];
const EURASIA = [[-10,36],[-9,43],[0,50],[10,55],[30,60],[30,70],[70,73],[140,72],[150,68],[150,60],[140,50],[122,40],[122,30],[110,20],[105,10],[100,2],[98,15],[92,22],[88,22],[80,15],[77,8],[72,20],[60,25],[57,24],[55,17],[44,13],[35,30],[28,37],[20,40],[12,44],[3,43]];
function MapaMundo({ p = 1, T }) {
  const [ax, ay] = mp(-55, -12), [bx, by] = mp(90, 24), cx = (ax + bx) / 2, cy = Math.min(ay, by) - 120;
  const bez = (u) => [(1 - u) * (1 - u) * ax + 2 * (1 - u) * u * cx + u * u * bx, (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * cy + u * u * by];
  const pts = Array.from({ length: 31 }, (_, i) => bez(i / 30 * p));
  return <g>
    <rect x={MAPA.x - 10} y={MAPA.y - 10} width={MAPA.w + 20} height={MAPA.h + 20} rx={26} fill={AC.mar} stroke={KC.ink} strokeWidth={7} />
    {[NORAM, CENAM, SUDAM, AFRICA, EURASIA].map((q, i) => <path key={i} d={poly(q)} fill={i === 2 ? KC.yellow : AC.tierra} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />)}
    {p > 0 && <path d={'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke="#fff" strokeWidth={7} fill="none" strokeDasharray="16 10" strokeLinecap="round" />}
    {p >= 1 && <circle cx={bx} cy={by} r={13 + Math.sin(T * 6) * 3} fill={KC.red} stroke={KC.ink} strokeWidth={4} />}
  </g>;
}

// Subtítulo con cursivas: *dorado* (resaltado) y _cursiva_ (nombres científicos).
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 58 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('_')) { p = p.replace('_', ''); it = false; } if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Chip con un nombre científico en cursiva (el Chip del kit solo acepta texto plano).
function ChipIt({ T, at, until, children, x, y, tam = 34, borde = KC.gold }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:'rgba(14,15,18,.82)', color:KC.texto,
    border:`4px solid ${borde}`, borderRadius:999, padding:'12px 30px', font:`900 ${tam}px/1.1 ${KF.texto}`, whiteSpace:'nowrap', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{children}</div>;
}

function FondoMicro({ T }) {
  return <><FondoMarca patron="oscuro" /><Ambiente T={T} n={16} color="rgba(160,220,255,.18)" /></>;
}

// Lupa dibujada (círculo con mango) sobre la mancha; contenido = vista de cerca.
function LupaSVG({ x, y, r = 170, p = 1, fx, fy, children, id }) {
  if (p <= 0) return null;
  return <g opacity={kclamp(p * 2, 0, 1)}>
    <path d={`M ${fx} ${fy} L ${x} ${y}`} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" />
    <circle cx={fx} cy={fy} r={30} fill="none" stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, kEase.rebote(kclamp(p, 0, 1)))})`}>
      <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{children}</g>
      <circle r={r} fill="none" stroke={KC.ink} strokeWidth={16} /><circle r={r} fill="none" stroke="#fff" strokeWidth={5} opacity=".7" />
    </g>
  </g>;
}

// Vista de cerca de la hoja (en la lupa): verde con la lesión gris y el poro (esquemático).
function CercaHoja({ T, r = 170, apresorio = 0 }) {
  return <g>
    <rect x={-r} y={-r} width={2 * r} height={2 * r} fill={AC.hoja} />
    {[-120, -70, -20, 30, 80, 130].map((yy, i) => <line key={i} x1={-r} y1={yy} x2={r} y2={yy - 10} stroke={AC.hoja2} strokeWidth={4} />)}
    <path d={`M ${-r} -20 Q 0 ${-r * 0.9} ${r} 10 Q 0 ${r * 0.9} ${-r} -20 Z`} fill={AC.lesion} opacity=".9" />
    <path d={`M ${-r * 0.7} -15 Q 0 ${-r * 0.55} ${r * 0.7} 5 Q 0 ${r * 0.55} ${-r * 0.7} -15 Z`} fill={AC.lesion2} />
    {apresorio > 0 ? <g opacity={apresorio}><Apresorio x={10} y={20} r={52} mel={1} /><circle cx={10} cy={26} r={7} fill={KC.ink} /></g>
      : <circle cx={10} cy={0} r={8 + Math.sin(T * 5) * 1.5} fill={KC.ink} stroke="#fff" strokeWidth={2} />}
  </g>;
}

function ArrozShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Es: CUES.Espora, Ap: CUES.Apresorio, Me: CUES.Melanina, Pr: CUES.Presion, P: CUES.Pregunta,
    Cl: CUES.Clavija, E: CUES.Estudio, I: CUES.Invade, Tr: CUES.Trigo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const macroI = K.I + 3.0;
  // posición de la espora y del apresorio en la escena micro
  const caida = kprog(T, K.Es + 0.1, K.Es + 1.1, kEase.sale);
  const cx = 360, cy = klerp(-160, 966, caida), crot = klerp(30, -3, caida);
  const tubo = [[497, 975], [560, 988], [630, 992], [690, 990], [728, 982], [748, 970]];
  const tuboP = kprog(T, K.Ap + 0.1, K.Ap + 1.5, kEase.suave);
  const domoR = 52 * kprog(T, K.Ap + 1.5, K.Ap + 2.6, kEase.sale);
  const mel = kprog(T, K.Me + 0.1, K.Me + 1.3, kEase.suave), glic = kprog(T, K.Me + 1.4, K.Me + 2.8);
  const zMicro = 1 + 1.3 * kprog(T, K.Me + 2.6, K.Pr + 0.4, kEase.suave);
  const presion = kprog(T, K.Pr + 0.6, K.Pr + 4.2, kEase.suave);
  const peg = kprog(T, K.Cl + 0.8, K.Cl + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la hoja de tu arroz con la mancha en rombo; «¿una mordida?» tachado; la lupa muestra el poro */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoArroz x={250} y={780} s={0.95} />
          <HojaArroz T={T} x={-80} y={1150} largo={1300} ancho={120} ang={-17} mancha={kprog(T, K.G, K.G + 1.6, kEase.sale) * 0.75 + 0.25} u={0.46} seed={2} />
          <LupaSVG x={720} y={560} r={170} p={kprog(T, K.G + 3.1, K.G + 3.6)} fx={505} fy={975} id="lupaG"><CercaHoja T={T} /></LupaSVG>
        </>)}
      </Escena>
      {/* 1 · Magnaporthe oryzae, el hongo del añublo del arroz */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<MataArroz T={T} x={340} y={1180} s={0.95} manchas={kprog(T, K.H + 0.3, K.H + 1.4)} />)}
      </Escena>
      {/* 2–4 · al microscopio: la espora cae y se pega, germina, infla el apresorio, melanina y glicerol */}
      <Escena T={T} a={K.Es} b={K.Pr} zoom={0.0}>
        <FondoMicro T={T} />
        {fsvg(<g transform={`translate(${790} ${960}) scale(${zMicro}) translate(${-790} ${-960})`}>
          <SuperficieHoja y0={1010} />
          {tuboP > 0 && (() => { const pts = kParcial(tubo, tuboP); const d = 'M ' + pts.map((q) => q.join(' ')).join(' L ');
            return <g><path d={d} stroke={AC.conidioB} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} stroke={AC.conidio} strokeOpacity={0.85} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })()}
          <Apresorio x={772} y={1004} r={domoR} mel={mel} glic={glic} T={T} />
          <Conidio x={cx} y={cy} rot={crot} muci={kprog(T, K.Es + 1.3, K.Es + 2.2)} T={T} />
        </g>)}
      </Escena>
      {/* 5 · por dentro del apresorio: entra agua, el glicerol no sale, la presión sube a 8 MPa */}
      <Escena T={T} a={K.Pr} b={K.P} zoom={0.04}>
        <FondoMicro T={T} />
        {fsvg((() => { const R = 290 * (0.94 + 0.06 * presion), bx = 520, by = 1120, g = krng(9);
          const dots = Array.from({ length: 34 }, () => [(g() - 0.5) * 1.5 * R * 0.85, -g() * R * 0.78 - 30, g() * 6]);
          return <g>
            <rect x={0} y={by} width={KW} height={18} fill={AC.cuti} />
            <rect x={0} y={by + 18} width={KW} height={140} fill={AC.celula2} />
            <path d={`M ${bx - R} ${by} A ${R} ${R * 0.95} 0 0 1 ${bx + R} ${by} Z`} fill="#2c4258" />
            {dots.map(([px, py, ph], i) => <circle key={i} cx={bx + px + Math.sin(T * (3 + presion * 4) + ph) * 10} cy={by + py + Math.cos(T * (3 + presion * 4) + ph) * 10} r={12} fill={AC.glic} style={{ filter:`drop-shadow(0 0 6px ${AC.glic})` }} />)}
            {Array.from({ length: 14 }, (_, i) => { const u = ((T - K.Pr - 0.4) * 0.55 + i / 14) % 1; if (T < K.Pr + 0.4) return null; const a = Math.PI * (0.12 + 0.76 * ((i * 0.37) % 1));
              const rr = klerp(R + 170, R - 60, u); return <path key={i} d={`M ${bx - Math.cos(a) * rr} ${by - Math.sin(a) * rr * 0.95} q -11 18 0 26 q 11 -8 0 -26 Z`} fill={AC.agua} stroke={KC.ink} strokeWidth={2} opacity={u < 0.85 ? 1 : (1 - u) / 0.15} />; })}
            <path d={`M ${bx - R} ${by} A ${R} ${R * 0.95} 0 0 1 ${bx + R} ${by}`} stroke={AC.mel} strokeWidth={34} fill="none" />
            <path d={`M ${bx - R} ${by} A ${R} ${R * 0.95} 0 0 1 ${bx + R} ${by}`} stroke={AC.mel2} strokeWidth={4} fill="none" transform={`translate(0 0)`} />
            {(() => { const u = kprog(T, K.Pr + 1.3, K.Pr + 2.3); const a = Math.PI * 0.72; const rr = R * 0.6 + Math.sin(u * Math.PI) * R * 0.32;
              return u > 0 && u < 1 ? <g><circle cx={bx + Math.cos(a) * rr} cy={by - Math.sin(a) * rr * 0.95} r={14} fill={AC.glic} />
                {u > 0.4 && <text x={bx + Math.cos(a) * (R + 40)} y={by - Math.sin(a) * (R + 40) * 0.95} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={3}>✕</text>}</g> : null; })()}
            {presion > 0.2 && [0.2, 0.35, 0.5, 0.65, 0.8].map((f, i) => { const a = Math.PI * f, k = presion * (0.8 + 0.2 * Math.sin(T * 8 + i));
              return <line key={i} x1={bx + Math.cos(a) * (R - 80)} y1={by - Math.sin(a) * (R - 80) * 0.95} x2={bx + Math.cos(a) * (R - 80 + 50 * k)} y2={by - Math.sin(a) * (R - 80 + 50 * k) * 0.95} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.85} />; })}
            {T > K.Pr + 4.4 && <g opacity={kprog(T, K.Pr + 4.4, K.Pr + 4.8)}><Llanta x={560} y={600} r={66 * kprog(T, K.Pr + 4.4, K.Pr + 4.9, kEase.rebote)} T={T} /></g>}
          </g>; })())}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Cl} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={280} y={1000} /><Apresorio x={290} y={1130} r={90} mel={1} glic={1} T={T} /></>)}
      </Escena>
      {/* 7 · corte de la hoja: la clavija perfora la cutícula y la pared celular */}
      <Escena T={T} a={K.Cl} b={K.E} zoom={0.05}>
        <FondoMicro T={T} />
        {fsvg((() => { const bx = 540, y0 = 820; const tip = y0 + 6 + peg * 230; const grieta1 = kprog(T, K.Cl + 1.0, K.Cl + 1.3), grieta2 = kprog(T, K.Cl + 1.8, K.Cl + 2.1);
          const bulbo = kprog(T, K.Cl + 3.1, K.Cl + 4.4, kEase.sale);
          return <g>
            <rect x={0} y={y0 + 70} width={KW} height={330} fill={AC.celula} />
            <ellipse cx={820} cy={1080} rx={70} ry={50} fill="#2e5a3c" stroke={AC.pared} strokeWidth={4} />
            <rect x={0} y={y0 + 18} width={KW} height={52} fill={AC.pared} />
            {Array.from({ length: 22 }, (_, i) => <line key={i} x1={i * 52} y1={y0 + 22} x2={i * 52 + 40} y2={y0 + 66} stroke={AC.pared2} strokeWidth={4} />)}
            <rect x={0} y={y0} width={KW} height={18} fill={AC.cuti} />
            {grieta1 > 0 && <path d={`M ${bx - 40 * grieta1} ${y0 + 4} L ${bx - 12} ${y0 + 10} L ${bx} ${y0 + 2} L ${bx + 14} ${y0 + 12} L ${bx + 44 * grieta1} ${y0 + 5}`} stroke={KC.ink} strokeWidth={4} fill="none" />}
            {grieta2 > 0 && <path d={`M ${bx - 60 * grieta2} ${y0 + 30} L ${bx - 20} ${y0 + 48} L ${bx - 30} ${y0 + 64} M ${bx + 60 * grieta2} ${y0 + 36} L ${bx + 22} ${y0 + 46} L ${bx + 34} ${y0 + 66}`} stroke={KC.ink} strokeWidth={4} fill="none" />}
            {peg > 0 && <><path d={`M ${bx} ${y0} L ${bx} ${tip}`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
              <path d={`M ${bx} ${y0} L ${bx} ${tip}`} stroke="#d8c7a4" strokeWidth={12} strokeLinecap="round" /></>}
            {bulbo > 0 && <g transform={`translate(${bx} ${tip + 30 * bulbo})`}><ellipse rx={30 + 40 * bulbo} ry={22 + 26 * bulbo} fill="#d8c7a4" stroke={KC.ink} strokeWidth={5} /></g>}
            <Apresorio x={bx} y={y0} r={180} mel={1} glic={1} T={T} n={22} />
            {[0, 1, 2].map((i) => { const k = kprog(T, K.Cl + 0.2 + i * 0.15, K.Cl + 0.6 + i * 0.15); return <path key={i} d={`M ${bx - 110 + i * 110} ${y0 - 250} l 0 ${60 * k}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.8 * k * (1 - peg)} />; })}
          </g>; })())}
      </Escena>
      {/* 8 · el estudio: 1991, DuPont, Delaware; plástico Mylar perforado */}
      <Escena T={T} a={K.E} b={K.I} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(T > K.E + 3.0 && <g opacity={kprog(T, K.E + 3.0, K.E + 3.4)}>
          <rect x={110} y={900} width={860} height={70} rx={12} fill={AC.plastico} fillOpacity={0.85} stroke={KC.ink} strokeWidth={6} />
          <path d="M 140 915 L 940 915" stroke="#fff" strokeWidth={6} opacity=".7" />
          {[[300, 3.5], [540, 4.0], [780, 4.5]].map(([px, t0], i) => { const k = kprog(T, K.E + t0, K.E + t0 + 0.9, kEase.suave); return <g key={i}>
            {k > 0 && <><path d={`M ${px} 900 L ${px} ${900 + k * 120}`} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" /><path d={`M ${px} 900 L ${px} ${900 + k * 120}`} stroke="#d8c7a4" strokeWidth={9} strokeLinecap="round" /></>}
            {k > 0.55 && <path d={`M ${px - 26} 968 L ${px - 8} 958 L ${px} 970 L ${px + 10} 958 L ${px + 28} 968`} stroke={KC.ink} strokeWidth={3} fill="none" />}
            <Apresorio x={px} y={900} r={80} mel={1} glic={1} T={T} n={10} seed={i + 4} /></g>; })}
        </g>)}
      </Escena>
      {/* 9a · al microscopio: hifas abultadas que pasan de célula en célula */}
      <Escena T={T} a={K.I} b={macroI} zoom={0.06}>
        <FondoMicro T={T} />
        {fsvg((() => { const W = 430, H = 140, x0 = 80, y0 = 640; const celdas = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) celdas.push([x0 + c * W - (r % 2) * W / 2, y0 + r * H, r, c]);
          const orden = { '1,1': 0, '1,2': 1, '0,1': 1.2, '2,1': 1.4, '1,0': 2.0, '2,2': 2.2 };
          return <g>
            {celdas.map(([x, y, r, c], i) => { const o = orden[r + ',' + c]; const inv = o != null ? kprog(T, K.I + 0.2 + o * 0.9, K.I + 0.9 + o * 0.9) : 0;
              return <g key={i}>
                <rect x={x + 6} y={y + 6} width={W - 12} height={H - 12} rx={30} fill={mixHex(AC.celula2, '#4a3a22', inv * 0.6)} stroke={AC.pared} strokeWidth={8} />
                {inv > 0 && Array.from({ length: 6 }, (_, k) => { const kk = kclamp(inv * 6 - k, 0, 1); if (kk <= 0) return null; const bx2 = x + 70 + k * 58, by2 = y + H / 2 + Math.sin(k * 1.7 + i) * 14;
                  return <ellipse key={k} cx={bx2} cy={by2} rx={30 * kk} ry={20 * kk} fill="#e8d9b5" stroke={KC.ink} strokeWidth={3} />; })}
              </g>; })}
          </g>; })())}
      </Escena>
      {/* 9b · se aleja: la mancha en rombo y sus esporas nuevas */}
      <Escena T={T} a={macroI} b={K.Tr} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaArroz T={T} x={-60} y={920} largo={1240} ancho={150} ang={-4} mancha={1} u={0.5} seed={6} />
          {Array.from({ length: 16 }, (_, i) => { const px = 400 + (i % 8) * 34, py = 870 + Math.floor(i / 8) * 30 + Math.abs((i % 8) - 3.5) * 3; const h = 26 * kprog(T, macroI + 0.3 + i * 0.03, macroI + 0.8 + i * 0.03);
            return h > 0 ? <line key={i} x1={px} y1={py} x2={px - 2} y2={py - h} stroke="#5a5145" strokeWidth={3} /> : null; })}
          {Array.from({ length: 12 }, (_, i) => { const u = kprog(T, macroI + 1.0 + i * 0.12, macroI + 2.8 + i * 0.12); if (u <= 0 || u >= 1) return null;
            return <Conidio key={i} x={460 + (i % 6) * 34 - u * (180 + i * 22)} y={840 - u * (260 + (i % 4) * 60)} s={0.16} rot={i * 40 + u * 120} />; })}
        </>)}
      </Escena>
      {/* 10 · el trigo: Bangladés 2016, primera vez en Asia */}
      <Escena T={T} a={K.Tr} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <EspigaTrigo T={T} x={240} y={1200} s={0.62} blanca={kprog(T, K.Tr + 0.5, K.Tr + 2.2, kEase.suave)} />
          <g opacity={kprog(T, K.Tr + 1.6, K.Tr + 2.0)}><MapaMundo T={T} p={kprog(T, K.Tr + 2.0, K.Tr + 3.4, kEase.suave)} /></g>
        </>)}
      </Escena>
      {/* 11 · cierre: la misma hoja y tu arroz; la lupa ya muestra el apresorio que empezó todo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoArroz x={250} y={780} s={0.95} />
          <HojaArroz T={T} x={-80} y={1150} largo={1300} ancho={120} ang={-17} mancha={1} u={0.46} seed={2} />
          <LupaSVG x={720} y={560} r={170} p={kprog(T, K.C + 0.4, K.C + 0.9)} fx={505} fy={975} id="lupaC"><CercaHoja T={T} apresorio={kprog(T, K.C + 0.9, K.C + 1.5)} /></LupaSVG>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 2.0} until={K.G + 2.9} texto="¿una mordida?" x={300} y={520} tam={50} />
      <Chip T={T} at={K.G + 3.3} until={K.H - 0.3} texto="entra a presión" x={300} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.G + 3.8} until={K.H - 0.3} texto="esquemático" x={720} y={760} tam={22} borde={KC.white} mono />
      <Etq T={T} at={K.H + 0.3} until={K.Es - 0.3} x={60} y={390} texto="añublo del arroz" tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 0.6} until={K.Es - 0.3} x={60} y={450} texto="Magnaporthe oryzae" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.Es - 0.3} x={60} y={505} texto="(= Pyricularia oryzae)" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 1.3} until={K.Es - 0.3} texto="se pierde del 10 al 30 % de la cosecha anual" x={540} y={1090} tam={30} borde={KC.red} />
      <Chip T={T} at={K.H + 1.6} until={K.Es - 0.3} texto="estimación de 2009" x={540} y={1170} tam={24} borde={KC.white} mono />
      <Chip T={T} at={K.Es + 0.2} until={K.Ap - 0.2} texto="AL MICROSCOPIO · superficie de la hoja" x={460} y={380} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.Es + 1.0} until={K.Ap + 0.6} x={200} y={830} texto="espora: 3 células" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Es + 1.6} until={K.Ap + 0.6} x={480} y={1080} texto="pegamento" tam={30} color="#9be8ff" />
      <Etq T={T} at={K.Es + 1.2} until={K.Me + 2.4} x={60} y={1100} texto="cutícula de la hoja" tam={28} color={AC.cuti} />
      <Etq T={T} at={K.Ap + 0.8} until={K.Me - 0.2} x={540} y={880} texto="tubo germinativo" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ap + 2.0} until={K.Me + 2.4} x={640} y={800} texto="apresorio" tam={36} color={KC.gold2} />
      <Etq T={T} at={K.Me + 0.6} until={K.Me + 2.4} x={160} y={700} texto="pared de melanina" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Me + 1.6} until={K.Me + 2.4} x={160} y={760} texto="glicerol" tam={32} color={AC.glic} />
      <Chip T={T} at={K.Pr + 0.2} until={K.Pr + 2.4} texto="POR DENTRO · apresorio" x={360} y={560} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pr + 0.6} until={K.P - 0.3} x={60} y={760} texto="agua: entra" tam={32} color={AC.agua} />
      <Etq T={T} at={K.Pr + 1.6} until={K.P - 0.3} x={60} y={1205} texto="glicerol: no sale" tam={30} color={AC.glic} />
      <Medidor T={T} at={K.Pr + 0.5} until={K.P - 0.3} valor={presion} etiqueta="presión" texto={(v) => (v * 8).toFixed(1) + ' MPa' + (v > 0.99 ? ' (hasta)' : '')} x={60} y={380} ancho={600} color={KC.pink} />
      <NumeroGigante T={T} at={K.Pr + 4.5} until={K.P - 0.3} valor={40} dur={0.8} prefijo="≈ " sufijo="×" x={290} y={600} tam={150} />
      <Chip T={T} at={K.Pr + 4.9} until={K.P - 0.3} texto="la presión de una llanta de coche" x={360} y={720} tam={28} borde={KC.white} />
      <Chip T={T} at={K.Cl + 0.2} until={K.E - 0.3} texto="AL MICROSCOPIO · corte de la hoja" x={440} y={380} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.Cl + 0.6} until={K.E - 0.3} x={1040} y={828} lado="izq" texto="cutícula" tam={28} color={AC.cuti} />
      <Etq T={T} at={K.Cl + 1.4} until={K.E - 0.3} x={1040} y={866} lado="izq" texto="pared celular" tam={28} color="#a8e08a" />
      <Etq T={T} at={K.Cl + 2.0} until={K.E - 0.3} x={600} y={1010} texto="clavija de penetración" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Cl + 3.2} until={K.E - 0.3} x={60} y={1170} texto="célula de la hoja" tam={28} color="#a8e08a" />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.7} anio="1991" quien="DuPont · Wilmington, Delaware" revista="Howard y cols. · PNAS, 1991 · EE. UU." y={780} />
      <Chip T={T} at={K.E + 3.2} until={K.I - 0.3} texto="plástico (Mylar) en vez de hoja" x={540} y={1110} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.E + 3.6} until={K.I - 0.3} texto="esquemático" x={540} y={760} tam={22} borde={KC.white} mono />
      <Chip T={T} at={K.I + 0.2} until={K.I + 2.4} texto="AL MICROSCOPIO · dentro de la hoja" x={440} y={460} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.I + 1.0} until={macroI - 0.2} x={60} y={1225} texto="hifas abultadas, de célula en célula" tam={28} color="#e8d9b5" />
      <Etq T={T} at={macroI + 0.6} until={K.Tr - 0.3} x={60} y={1080} texto="mancha en forma de rombo" tam={32} color={KC.ink} />
      <Etq T={T} at={macroI + 1.4} until={K.Tr - 0.3} x={60} y={560} texto="esporas nuevas" tam={32} color={KC.ink} />
      <Chip T={T} at={macroI + 1.8} until={K.Tr - 0.3} texto="esquemático" x={860} y={1110} tam={22} borde={KC.white} mono />
      <Etq T={T} at={K.Tr + 0.4} until={K.C - 0.3} x={60} y={420} texto="añublo del trigo" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Tr + 1.2} until={K.C - 0.3} x={300} y={760} texto="espiga blanqueada" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Tr + 2.6} until={K.C - 0.3} texto="2016 · Bangladés · primera vez en Asia" x={540} y={700} tam={32} borde={KC.red} />
      <Etq T={T} at={K.Tr + 3.0} until={K.C - 0.3} x={575} y={1150} texto="Sudamérica" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Tr + 3.4} until={K.C - 0.3} x={1040} y={1150} lado="izq" texto="Bangladés" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Tr + 3.2} until={K.C - 0.3} texto="origen probable" x={760} y={800} tam={22} borde={KC.white} mono />
      <Chip T={T} at={K.Tr + 3.6} until={K.C - 0.3} texto="mapa esquemático" x={740} y={1200} tam={20} borde={KC.white} mono />
      <ChipIt T={T} at={K.C + 1.2} until={K.Ou} x={540} y={1180} tam={34} borde={KC.red}>empezó con un agujero hecho a presión</ChipIt>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="esquemático" x={720} y={760} tam={22} borde={KC.white} mono />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="1 cm" largo={100} />
      <BarraEscala T={T} at={K.H} until={K.Es} texto="10 cm" largo={60} />
      <BarraEscala T={T} at={K.Es} until={K.Me + 2.5} texto="20 µm" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.P} texto="5 µm" largo={330} />
      <BarraEscala T={T} at={K.Cl} until={K.E} texto="5 µm" largo={200} />
      <BarraEscala T={T} at={K.I} until={macroI} texto="20 µm" largo={100} />
      <BarraEscala T={T} at={macroI} until={K.Tr} texto="1 cm" largo={300} />
      <BarraEscala T={T} at={K.Tr} until={K.C} texto="1 cm" largo={38} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={100} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es *una mordida.*" />
      <SubIt T={T} idx={1} at={K.H + 0.1} until={K.Es - 0.1} texto="*_Magnaporthe oryzae._*" />
      <SubIt T={T} idx={2} at={K.Es + 0.1} until={K.Ap - 0.1} texto="Espora en forma *de pera.*" />
      <SubIt T={T} idx={3} at={K.Ap + 0.1} until={K.Me - 0.1} texto="Un domo: *el apresorio.*" />
      <SubIt T={T} idx={4} at={K.Me + 0.1} until={K.Pr - 0.1} texto="Melanina y *glicerol.*" />
      <SubIt T={T} idx={5} at={K.Pr + 0.1} until={K.P - 0.1} texto="Hasta *8 megapascales.*" />
      <SubIt T={T} idx={6} at={K.P + 0.1} until={K.Cl - 0.1} texto="¿Para qué *tanta presión?*" />
      <SubIt T={T} idx={7} at={K.Cl + 0.1} until={K.E - 0.1} texto="Una clavija *que perfora.*" />
      <SubIt T={T} idx={8} at={K.E + 0.1} until={K.I - 0.1} texto="Plástico: *lo perforó.*" />
      <SubIt T={T} idx={9} at={K.I + 0.1} until={K.Tr - 0.1} texto="De célula *en célula.*" />
      <SubIt T={T} idx={10} at={K.Tr + 0.1} until={K.C - 0.1} texto="2016: *primera vez en Asia.*" />
      <SubIt T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Empezó con *un agujero.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.5, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.5, K.Es - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ap + 0.4, K.Pr - 0.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pr + 2.1, K.P - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.0, K.Cl + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.3, K.I - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.I + 2.8, K.Tr - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Tr + 1.2, K.C - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.3, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="115" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArrozApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArrozShot /></CompositionStage></div>;
}
window.ArrozApp = ArrozApp;
