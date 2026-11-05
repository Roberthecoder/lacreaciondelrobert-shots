// Shot Fungi Mati #135 · Ese polvo blanco no es cal: es un hongo — NARRADO (gancho 1 «Esto no es X: es Y»; formato N1 Por dentro + N5 El experimento).
// Agostino Bassi (1835) y la muscardina del gusano de seda (Beauveria bassiana). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático.

const BS = { vivo:'#ece3cf', vivo2:'#d8ccb2', cabeza:'#b8a383', marca:'#7d7468', muerto:'#f1ebe0', moho:'#ffffff', hoja:'#56b544', hoja2:'#3d8f35', nervio:'#a6dd8a',
  cuti1:'#e9c66a', cuti2:'#b88a40', cuti3:'#d8b877', epid:'#f0a4a0', hemo:'#14213f', blasto:'#f3f7e6', hemoc:'#c58fd6', mesa:'#8a5a2c', laton:'#d6a740', azulB:'#23304f' };

// ---------- Gusano de seda (Bombyx mori), último estadio, de perfil; cola a la izquierda, cabeza a la derecha ----------
// (x, y) = punto de apoyo bajo el centro del cuerpo. come 0..1 (mueve la cabeza), anda 0..1 (onda), flacido 0..1, duro 0..1 (blanco y rígido),
// moho 0..1 (micelio blanco que brota entre segmentos), polvo 0..1 (lo cubre de conidios).
const GS_N = 12;
function GusanoSeda({ T = 0, x, y, s = 1, largo = 560, come = 0, anda = 0, flacido = 0, duro = 0, moho = 0, polvo = 0, seed = 1, voltea = false }) {
  const R = 46, pts = [];
  for (let i = 0; i < GS_N; i++) {
    const u = i / (GS_N - 1);
    let k = i === GS_N - 1 ? 0.66 : i >= GS_N - 4 ? 0.9 : i <= 1 ? 0.74 + i * 0.1 : 1;
    const r = R * k * (1 - flacido * 0.06);
    const onda = Math.max(0, Math.sin(u * Math.PI * 2 - T * 5)) * 10 * anda;
    const caida = flacido * 14 * Math.sin(Math.PI * u) * (1 - duro);
    let px = -largo / 2 + u * largo, py = -r - onda + caida;
    if (i === GS_N - 1) { px += Math.sin(T * 9) * 6 * come; py += -6 + Math.abs(Math.sin(T * 9)) * 8 * come; }
    pts.push({ x: px, y: py, r });
  }
  const cuerpo = mixHex(mixHex(BS.vivo, BS.muerto, duro), '#ffffff', polvo * 0.7);
  const cab = mixHex(BS.cabeza, '#efe9de', Math.max(duro * 0.6, polvo * 0.9));
  const g = krng(seed * 13 + 1);
  const pelos = [];
  if (moho > 0) for (let i = 0; i < GS_N; i++) { const p = pts[i]; for (let j = 0; j < 9; j++) { const a = -Math.PI * (0.05 + g() * 0.9), L = (8 + g() * 22) * moho;
    pelos.push(<line key={i + '-' + j} x1={p.x + Math.cos(a) * p.r} y1={p.y + Math.sin(a) * p.r} x2={p.x + Math.cos(a) * (p.r + L)} y2={p.y + Math.sin(a) * (p.r + L)} stroke="#ffffff" strokeWidth={4} strokeLinecap="round" opacity={0.9} />); } }
  return <g transform={`translate(${x} ${y}) scale(${voltea ? -s : s} ${s})`}>
    {/* patas: 3 pares torácicas (puntiagudas) y falsas patas abdominales + anales (romas) */}
    {[GS_N - 2, GS_N - 3, GS_N - 4].map((i) => <path key={'t' + i} d={`M ${pts[i].x - 8} ${pts[i].y + pts[i].r - 6} L ${pts[i].x + 2} ${pts[i].y + pts[i].r + 16} L ${pts[i].x + 10} ${pts[i].y + pts[i].r - 6} Z`} fill={mixHex('#6d6255', '#eee', duro)} stroke={KC.ink} strokeWidth={3} />)}
    {[0, 4, 5, 6, 7].map((i) => <rect key={'p' + i} x={pts[i].x - 13} y={pts[i].y + pts[i].r - 12} width={26} height={22} rx={9} fill={cuerpo} stroke={KC.ink} strokeWidth={4} />)}
    {pts.map((p, i) => <circle key={'o' + i} cx={p.x} cy={p.y} r={p.r + 5} fill={KC.ink} />)}
    {pts.map((p, i) => <circle key={'f' + i} cx={p.x} cy={p.y} r={p.r} fill={i === GS_N - 1 ? cab : cuerpo} />)}
    {pts.slice(1, GS_N - 1).map((p, i) => <path key={'s' + i} d={`M ${p.x - p.r * 0.55} ${p.y - p.r * 0.82} Q ${p.x - p.r * 0.75} ${p.y} ${p.x - p.r * 0.55} ${p.y + p.r * 0.82}`} stroke={mixHex(BS.vivo2, '#e2dbcf', duro)} strokeWidth={4} fill="none" />)}
    {/* marcas: medialuna del tórax y las dos lunas del abdomen (se borran al morir) */}
    <g opacity={1 - Math.max(duro, polvo)}>
      <path d={`M ${pts[GS_N - 3].x - 14} ${pts[GS_N - 3].y - 22} Q ${pts[GS_N - 3].x} ${pts[GS_N - 3].y - 4} ${pts[GS_N - 3].x + 14} ${pts[GS_N - 3].y - 22}`} stroke={BS.marca} strokeWidth={6} fill="none" strokeLinecap="round" />
      {[3, 6].map((i) => <ellipse key={i} cx={pts[i].x} cy={pts[i].y - 18} rx={9} ry={6} fill={BS.marca} opacity=".7" />)}
    </g>
    {/* cuernito caudal */}
    <path d={`M ${pts[1].x - 6} ${pts[1].y - pts[1].r + 4} L ${pts[1].x - 22} ${pts[1].y - pts[1].r - 26} L ${pts[1].x + 8} ${pts[1].y - pts[1].r + 2} Z`} fill={mixHex('#9b8a70', '#efe9de', duro)} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    {/* cabeza: ocelos y mandíbula */}
    <circle cx={pts[GS_N - 1].x + 12} cy={pts[GS_N - 1].y + 4} r={4} fill={KC.ink} opacity={1 - polvo} />
    <path d={`M ${pts[GS_N - 1].x + 22} ${pts[GS_N - 1].y + 14} l 10 6`} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" opacity={1 - polvo} />
    {/* micelio blanco: primero entre segmentos, luego todo el cuerpo */}
    {pelos}
    {moho > 0 && pts.slice(0, GS_N - 1).map((p, i) => <circle key={'m' + i} cx={p.x + p.r * 0.75} cy={p.y - p.r * 0.2} r={p.r * 0.42 * kclamp(moho * 1.6 - i * 0.04, 0, 1)} fill="#ffffff" stroke="rgba(0,0,0,.18)" strokeWidth={2} />)}
    {polvo > 0 && <path d={'M ' + pts.slice(1, GS_N - 1).map((p) => p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' L ')} stroke="#ffffff" strokeWidth={(R + 4) * 2 * (0.6 + 0.4 * polvo)} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.7 * polvo} />}
    {polvo > 0.2 && Array.from({ length: 26 }, (_, j) => { const p = pts[j % GS_N]; return <circle key={'d' + j} cx={p.x + (g() - 0.5) * p.r * 2.2} cy={p.y - p.r * (0.6 + g() * 0.8)} r={2 + g() * 3} fill="#ffffff" opacity={polvo} />; })}
  </g>;
}

// Hoja de morera: ovada, con borde aserrado y nervaduras. Base del pecíolo a la izquierda. (x, y) = centro.
function HojaMorera({ x, y, w = 820, h = 260, rot = 0, mordida = 0 }) {
  const N = 40, sup = [], inf = [];
  for (let i = 0; i <= N; i++) { const u = i / N, hw = h / 2 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.05)), 0.75) * (1 - 0.25 * u), d = i % 2 ? 7 : 0;
    sup.push([-w / 2 + u * w, -hw - d]); inf.push([-w / 2 + u * w, hw + d]); }
  const dd = 'M ' + sup.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' L ' + inf.reverse().map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 0.5)`}>
    <path d={`M ${-w / 2 - 90} 30 Q ${-w / 2 - 40} 10 ${-w / 2 + 6} 0`} stroke={BS.hoja2} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={dd} fill={BS.hoja} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${-w / 2 + 10} 0 L ${w / 2 - 20} 0`} stroke={BS.nervio} strokeWidth={9} />
    {[0.15, 0.3, 0.45, 0.6, 0.75].map((u, i) => <g key={i}>
      <path d={`M ${-w / 2 + u * w} 0 Q ${-w / 2 + (u + 0.08) * w} ${-h * 0.25} ${-w / 2 + (u + 0.14) * w} ${-h * 0.4}`} stroke={BS.nervio} strokeWidth={6} fill="none" />
      <path d={`M ${-w / 2 + u * w} 0 Q ${-w / 2 + (u + 0.08) * w} ${h * 0.25} ${-w / 2 + (u + 0.14) * w} ${h * 0.4}`} stroke={BS.nervio} strokeWidth={6} fill="none" />
    </g>)}
    {mordida > 0 && <ellipse cx={w * 0.36} cy={-h * 0.32} rx={60 * mordida} ry={70 * mordida} fill="rgba(0,0,0,0)" stroke="none" />}
  </g>;
}

// Conidio de Beauveria: bolita lisa e incolora (hialina). r en px.
function Conidio({ x, y, r = 18, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill="#f7fbff" stroke={KC.ink} strokeWidth={Math.max(2, r * 0.16)} /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.28} fill="#ffffff" /></g>;
}
// Racimo de conidios ("bolita de nieve").
function RacimoConidios({ x, y, r = 18, n = 7, seed = 2, o = 1 }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = g() * 6.28, d = i ? r * (1.4 + g() * 0.9) : 0; return <Conidio key={i} x={x + Math.cos(a) * d} y={y + Math.sin(a) * d} r={r} o={o} />; })}</g>;
}
// Blastospora / cuerpo hifal: célula suelta, corta y alargada.
function Blasto({ x, y, rot = 0, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-24} y={-11} width={48} height={22} rx={11} fill={BS.blasto} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-4} cy={0} r={4} fill="#9fb98a" />
  </g>;
}
// Hemocito (célula de defensa del insecto).
function Hemocito({ x, y, r = 46, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={`M ${-r} 0 Q ${-r} ${-r * 0.9} 0 ${-r} Q ${r * 1.05} ${-r * 0.95} ${r} 0 Q ${r * 0.9} ${r} 0 ${r * 0.95} Q ${-r * 1.1} ${r * 0.9} ${-r} 0 Z`} fill={BS.hemoc} stroke={KC.ink} strokeWidth={5} />
    <circle cx={r * 0.1} cy={-r * 0.05} r={r * 0.4} fill="#7b3f93" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Bandeja de crianza con hojas y gusanos chiquitos. blancos = cuántos (de izquierda a derecha) ya tienen muscardina (0..n, fraccional).
function Bandeja({ T, x, y, n = 3, blancos = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -190 -10 L 190 -10 L 170 40 L -170 40 Z" fill="#c99a5b" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-176} y={-22} width={352} height={18} rx={6} fill="#7cc35c" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: n }, (_, i) => { const b = kclamp(blancos - i, 0, 1); return <GusanoSeda key={i} T={T} x={-115 + i * (230 / Math.max(1, n - 1))} y={-18} s={0.21} largo={520} anda={1 - b} duro={b} moho={b} polvo={b} seed={i + 3} />; })}
  </g>;
}
// Microscopio de latón del siglo XIX (esquemático).
function Microscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-20} width={180} height={24} rx={8} fill={BS.laton} stroke={KC.ink} strokeWidth={6} />
    <path d="M -20 -20 L -10 -150 L 18 -150 L 30 -20 Z" fill="#b3862e" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-120} width={120} height={14} rx={5} fill={BS.laton} stroke={KC.ink} strokeWidth={5} />
    <g transform="rotate(-22 10 -150)"><rect x={-6} y={-300} width={40} height={160} rx={10} fill={BS.laton} stroke={KC.ink} strokeWidth={6} />
      <rect x={-12} y={-318} width={52} height={24} rx={6} fill="#3a2a14" stroke={KC.ink} strokeWidth={5} /></g>
    <ellipse cx={-40} cy={-60} rx={26} ry={12} fill="#e9eef2" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Silueta de un naturalista de 1830 (no es un retrato: es una figura genérica).
function Naturalista({ x, y, s = 1, mira = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 L -90 -260 Q -80 -330 0 -340 Q 80 -330 90 -260 L 110 0 Z" fill={BS.azulB} stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -330 L 0 -260 L 40 -330 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    <path d="M -22 -330 L 0 -300 L 22 -330" fill="#16120f" />
    <circle cx={0} cy={-400} r={62} fill="#e8c4a0" stroke={KC.ink} strokeWidth={7} />
    <path d="M -62 -410 Q -60 -470 0 -468 Q 60 -470 62 -410 Q 40 -440 0 -438 Q -40 -440 -62 -410 Z" fill="#cfcfcf" stroke={KC.ink} strokeWidth={5} />
    <circle cx={20 + mira * 6} cy={-404} r={6} fill={KC.ink} /><circle cx={-16 + mira * 6} cy={-404} r={6} fill={KC.ink} />
    <path d="M -10 -372 Q 4 -364 18 -372" stroke={KC.ink} strokeWidth={4} fill="none" />
  </g>;
}
// Libro de 1835 (portada esquemática con el título real).
function Libro({ x, y, s = 1, rot = -4 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-200} y={-250} width={400} height={500} rx={10} fill="#e9dcb8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-176} y={-226} width={352} height={452} fill="none" stroke="#8a6a3a" strokeWidth={4} />
    {['DEL MAL', 'DEL SEGNO,', 'CALCINACCIO', 'O MOSCARDINO'].map((t, i) => <text key={i} x={0} y={-140 + i * 62} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill="#3a2a14">{t}</text>)}
    <line x1={-90} y1={110} x2={90} y2={110} stroke="#8a6a3a" strokeWidth={4} />
    <text x={0} y={170} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#3a2a14">Lodi · 1835</text>
  </g>;
}
// Costal genérico de insecticida biológico (sin marca real).
function Costal({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -220 Q -170 -230 -150 -250 L 150 -250 Q 170 -230 150 -220 L 170 160 Q 0 190 -170 160 Z" fill="#d9b98a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -140 -236 L 140 -236" stroke="#a8875a" strokeWidth={6} strokeDasharray="14 10" />
    <rect x={-120} y={-150} width={240} height={220} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-96} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>INSECTICIDA</text>
    <text x={0} y={-52} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.teal}>BIOLÓGICO</text>
    <RacimoConidios x={0} y={20} r={13} n={7} seed={9} />
  </g>;
}

function BassiShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Esporas, Cu: CUES.Cuticula, Ad: CUES.Adentro, Sa: CUES.Sale, P: CUES.Pregunta, B: CUES.Bassi, Pu: CUES.Publica,
    Pr: CUES.Prueba, Pm: CUES.Primera, Pa: CUES.Palabra, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: un palillo toca al gusano y suelta una nube de polvo
  const toque = kprog(T, K.G + 0.05, K.G + 0.35, kEase.sale), nube = kprog(T, K.G + 0.35, K.G + 2.2);
  // el gusano de la escena "Sale" (macro): deja de comer → flácido → muere → se endurece → micelio → polvo
  const S = { flac: kprog(T, K.Sa + 0.2, K.Sa + 1.2), duro: kprog(T, K.Sa + 1.5, K.Sa + 2.2), moho: kprog(T, K.Sa + 2.4, K.Sa + 3.6), polvo: kprog(T, K.Sa + 3.2, K.Sa + 4.4) };
  // cutícula: germina → apresorio → clavija que baja
  const germ = kprog(T, K.Cu + 0.2, K.Cu + 1.0, kEase.sale), apr = kprog(T, K.Cu + 0.9, K.Cu + 1.3, kEase.rebote), baja = kprog(T, K.Cu + 1.4, K.Cu + 3.4, kEase.suave);
  // hemolinfa: blastosporas que se multiplican
  const nBl = Math.floor(klerp(0, 22, kprog(T, K.Ad + 0.6, K.Ad + 3.6)));
  const gB = krng(77), BL = Array.from({ length: 22 }, () => ({ x: 140 + gB() * 800, y: 760 + gB() * 420, r: gB() * 180, v: 0.5 + gB() }));
  // experimento: la punta visita a 3 gusanos sanos
  const aguja = (t) => { const t0 = K.Pr + 0.2; const pts = [[230, 905], [470, 990], [600, 990], [730, 990]]; const u = kclamp((t - t0) / 1.8, 0, 0.999) * 3; const i = Math.floor(u), f = kEase.suave(u - i);
    return [klerp(pts[i][0], pts[i + 1][0], f), klerp(pts[i][1], pts[i + 1][1], f) - Math.sin(Math.PI * f) * 120]; };
  const [ax, ay] = aguja(T);
  const blancosPr = kprog(T, K.Pr + 2.3, K.Pr + 3.4) * 3;
  // línea de tiempo 1830–1880
  const TX = (a) => 90 + (a - 1830) * 18;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el gusano blanco y tieso; el palillo lo toca y sale polvo */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaMorera x={500} y={1070} w={1000} h={380} />
          <GusanoSeda T={T} x={480} y={1060} s={1.3} duro={1} moho={1} polvo={1} seed={1} />
          <g transform={`translate(${klerp(900, 640, toque)} ${klerp(720, 900, toque) - (T > K.G + 0.6 ? kprog(T, K.G + 0.6, K.G + 1.2) * 160 : 0)}) rotate(-35)`}>
            <rect x={-8} y={-260} width={16} height={260} rx={8} fill="#e2b46a" stroke={KC.ink} strokeWidth={5} />
          </g>
          {nube > 0 && Array.from({ length: 30 }, (_, i) => { const g = krng(i + 40), a = -Math.PI * (0.1 + g() * 0.8), d = 40 + nube * (120 + g() * 220);
            return <circle key={i} cx={640 + Math.cos(a) * d} cy={920 + Math.sin(a) * d * 0.8 - nube * 30} r={(6 + g() * 14) * (1 - nube * 0.4)} fill="#ffffff" opacity={(1 - nube) * 0.9} />; })}
        </>)}
      </Escena>
      {/* 2 · conidios que se pegan a la piel (lupa con barra de 10 µm: cada conidio ≈ 2.4 µm) */}
      <Escena T={T} a={K.E} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <HojaMorera x={540} y={1110} w={900} h={330} />
          <GusanoSeda T={T} x={540} y={1100} s={1} come={1} anda={0.6} seed={2} />
          {Array.from({ length: 24 }, (_, i) => { const g = krng(i + 7), t0 = K.E + g() * 1.6, u = kprog(T, t0, t0 + 1.4); if (u <= 0) return null;
            return <circle key={i} cx={380 + g() * 380 + Math.sin(T * 2 + i) * 12} cy={klerp(560, 1010 + g() * 30, u)} r={4} fill="#ffffff" stroke="rgba(0,0,0,.3)" strokeWidth={1} opacity={0.9} />; })}
        </>)}
      </Escena>
      <Lupa T={T} at={K.E + 0.9} until={K.Cu - 0.35} x={330} y={700} r={220} fx={560} fy={1020} tinte={KC.cyan} etiqueta="conidios en la piel"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#e6d8bb" />
          {[0.22, 0.42, 0.62, 0.82].map((k, i) => <path key={i} d={`M 0 ${k * r * 2} Q ${r * 0.6} ${k * r * 2 - 16} ${r} ${k * r * 2 + 6} T ${r * 2} ${k * r * 2 - 4}`} stroke="#cbb994" strokeWidth={5} fill="none" />)}
          {[[0.32, 0.38, 1, 0.0], [0.62, 0.3, 2, 0.3], [0.5, 0.62, 3, 0.6], [0.3, 0.7, 4, 0.9]].map(([u, v, sd, d], i) => { const c = kprog(Tl, K.E + 1.2 + d, K.E + 1.8 + d, kEase.sale);
            return <g key={i} transform={`translate(0 ${(1 - c) * -r * 1.3})`}><RacimoConidios x={u * r * 2} y={v * r * 2} r={18} n={6} seed={sd} o={c} /></g>; })}
          <line x1={r * 0.62} y1={r * 1.7} x2={r * 0.62 + 150} y2={r * 1.7} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          <text x={r * 0.62 + 75} y={r * 1.7 - 14} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>10 µm</text>
        </svg>} />
      {/* 3 · corte de la cutícula: germina, apresorio, enzimas y presión */}
      <Escena T={T} a={K.Cu} b={K.Ad} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <rect x={0} y={700} width={KW} height={18} fill={BS.cuti1} />
          <rect x={0} y={718} width={KW} height={150} fill={BS.cuti2} />
          {[750, 785, 820, 850].map((yy) => <line key={yy} x1={0} y1={yy} x2={KW} y2={yy} stroke="#9a6f2e" strokeWidth={4} />)}
          <rect x={0} y={868} width={KW} height={140} fill={BS.cuti3} />
          {[900, 935, 970].map((yy) => <line key={yy} x1={0} y1={yy} x2={KW} y2={yy} stroke="#c09e5c" strokeWidth={4} />)}
          {Array.from({ length: 11 }, (_, i) => <g key={i}><rect x={i * 100 - 10} y={1008} width={100} height={70} fill={BS.epid} stroke={KC.ink} strokeWidth={4} /><circle cx={i * 100 + 40} cy={1043} r={12} fill="#b0566a" /></g>)}
          <rect x={0} y={1078} width={KW} height={170} fill={BS.hemo} />
          <line x1={0} y1={700} x2={KW} y2={700} stroke={KC.ink} strokeWidth={6} />
          {/* zona disuelta por las enzimas alrededor de la clavija */}
          {baja > 0 && <ellipse cx={640} cy={700 + baja * 340} rx={46} ry={40} fill="#fff1c7" opacity={0.45} />}
          {baja > 0 && Array.from({ length: 8 }, (_, i) => { const a = i * 0.785 + T * 2; return <circle key={i} cx={640 + Math.cos(a) * 60} cy={700 + baja * 340 + Math.sin(a) * 48} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />; })}
          {/* tubo germinativo sobre la superficie y apresorio */}
          {germ > 0 && <path d={`M 470 676 Q 540 ${692} ${470 + germ * 160} 688`} stroke="#f7fbff" strokeWidth={16} fill="none" strokeLinecap="round" />}
          {apr > 0 && <ellipse cx={640} cy={680} rx={34 * apr} ry={24 * apr} fill="#f7fbff" stroke={KC.ink} strokeWidth={5} />}
          {baja > 0 && <path d={`M 640 700 L ${640 + Math.sin(baja * 9) * 6} ${700 + baja * 360}`} stroke="#f7fbff" strokeWidth={14} strokeLinecap="round" />}
          <Conidio x={460} y={668} r={32} />
          {/* flecha de presión */}
          {apr > 0.5 && <g opacity={kprog(T, K.Cu + 1.3, K.Cu + 1.6)}><path d="M 760 560 L 760 650" stroke={KC.red} strokeWidth={12} strokeLinecap="round" /><path d="M 735 630 L 760 668 L 785 630 Z" fill={KC.red} /></g>}
        </>)}
      </Escena>
      {/* 4 · en la hemolinfa: células sueltas que esquivan a los hemocitos */}
      <Escena T={T} a={K.Ad} b={K.Sa} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:BS.hemo }}></div>
        <Ambiente T={T} n={30} color="rgba(160,200,255,.25)" />
        {fsvg(<>
          <rect x={0} y={440} width={KW} height={90} fill={BS.cuti2} stroke={KC.ink} strokeWidth={6} />
          <rect x={0} y={530} width={KW} height={46} fill={BS.epid} stroke={KC.ink} strokeWidth={4} />
          <path d={`M 660 470 Q 680 620 ${660 + Math.sin(T) * 10} ${klerp(580, 760, kprog(T, K.Ad, K.Ad + 0.8))}`} stroke="#f7fbff" strokeWidth={14} fill="none" strokeLinecap="round" />
          {[[230, 900, 1], [820, 1060, 2], [420, 1150, 3], [880, 790, 4]].map(([hx, hy, sd]) => <Hemocito key={sd} x={hx + Math.sin(T * 0.8 + sd) * 40} y={hy + Math.cos(T * 0.6 + sd) * 24} r={50} rot={T * 10 + sd * 40} />)}
          {BL.slice(0, nBl).map((b, i) => <Blasto key={i} x={b.x + Math.sin(T * b.v + i) * 18} y={b.y + Math.cos(T * b.v * 0.8 + i) * 12} rot={b.r + T * 20 * b.v} s={kprog(T, K.Ad + 0.6 + i * 0.136, K.Ad + 0.9 + i * 0.136, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 5 · muere, se pone duro y lo cubre el hongo */}
      <Escena T={T} a={K.Sa} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <HojaMorera x={540} y={1110} w={900} h={330} />
          <GusanoSeda T={T} x={540} y={1100} s={1} flacido={S.flac} duro={S.duro} moho={S.moho} polvo={S.polvo} seed={2} />
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><HojaMorera x={300} y={1120} w={520} h={200} /><GusanoSeda T={T} x={300} y={1112} s={0.62} duro={1} moho={1} polvo={1} seed={1} /><Interrogacion T={T} x={290} y={900} tam={340} /></>)}
      </Escena>
      {/* 7–9 · el laboratorio de Bassi: casi 30 años, el libro de 1835 y el experimento */}
      <Escena T={T} a={K.B} b={K.Pm} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={40} y={1080} width={1000} height={36} rx={8} fill={BS.mesa} stroke={KC.ink} strokeWidth={7} />
          <rect x={90} y={1116} width={30} height={120} fill={BS.mesa} stroke={KC.ink} strokeWidth={6} /><rect x={960} y={1116} width={30} height={120} fill={BS.mesa} stroke={KC.ink} strokeWidth={6} />
          {T < K.Pr && <g opacity={1 - kprog(T, K.Pr - 0.4, K.Pr)}>
            <Naturalista x={190} y={1080} s={0.9} mira={Math.sin(T)} />
            <Microscopio x={900} y={1080} s={0.95} />
            <Bandeja T={T} x={560} y={1062} n={3} blancos={T > K.Pu + 1.4 ? kprog(T, K.Pu + 1.6, K.Pu + 3.4) * 3 : 1} s={1.05} />
            {T > K.Pu + 1.2 && <g opacity={kprog(T, K.Pu + 1.2, K.Pu + 1.5)}>{Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Pu) * 0.6 + i / 6) % 1; return <circle key={i} cx={klerp(420, 700, u)} cy={1000 - Math.sin(Math.PI * u) * 120} r={7} fill="#ffffff" stroke={KC.ink} strokeWidth={2} />; })}</g>}
          </g>}
          {T > K.Pu && T < K.Pr && <g opacity={kprog(T, K.Pu, K.Pu + 0.3) * (1 - kprog(T, K.Pr - 0.4, K.Pr))} transform={`translate(0 ${(1 - kprog(T, K.Pu, K.Pu + 0.5, kEase.rebote)) * -500})`}><Libro x={500} y={640} s={0.95} /></g>}
          {T > K.Pr - 0.4 && <g opacity={kprog(T, K.Pr - 0.4, K.Pr)}>
            <GusanoSeda T={T} x={230} y={1070} s={0.45} duro={1} moho={1} polvo={1} seed={5} />
            <ellipse cx={600} cy={1050} rx={250} ry={50} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={6} />
            {[0, 1, 2].map((i) => { const b = kclamp(blancosPr - i, 0, 1); return <GusanoSeda key={i} T={T} x={470 + i * 130} y={1052} s={0.24} largo={520} anda={1 - b} duro={b} moho={b} polvo={b} seed={i + 8} />; })}
            <g transform={`translate(${ax} ${ay}) rotate(30)`}><line x1={0} y1={0} x2={0} y2={-210} stroke="#9aa3ad" strokeWidth={6} /><rect x={-12} y={-330} width={24} height={130} rx={10} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
              {T > K.Pr + 0.4 && <circle cx={0} cy={-4} r={9} fill="#ffffff" stroke={KC.ink} strokeWidth={2} />}</g>
          </g>}
        </>)}
      </Escena>
      {/* 10–11 · línea de tiempo: 1835 Bassi · 1876 Koch · 1878 «microbio» */}
      <Escena T={T} a={K.Pm} b={K.H} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <line x1={70} y1={1000} x2={1010} y2={1000} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          {[1830, 1840, 1850, 1860, 1870, 1880].map((a) => <g key={a}><line x1={TX(a)} y1={985} x2={TX(a)} y2={1015} stroke={KC.ink} strokeWidth={6} />
            <text x={TX(a)} y={1055} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{a}</text></g>)}
          {(() => { const k = kprog(T, K.Pm + 0.3, K.Pm + 0.8, kEase.rebote); return <g transform={`translate(${TX(1835)} 1000) scale(${k})`}>
            <circle r={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
            <line x1={0} y1={-26} x2={0} y2={-150} stroke={KC.ink} strokeWidth={6} />
            <GusanoSeda T={T} x={30} y={-160} s={0.32} duro={1} moho={1} polvo={1} seed={3} />
          </g>; })()}
          {(() => { const k = kprog(T, K.Pm + 2.6, K.Pm + 3.0, kEase.rebote); return <g transform={`translate(${TX(1876)} 1000) scale(${k})`}>
            <circle r={18} fill="#cfd6e0" stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={18} x2={0} y2={90} stroke={KC.ink} strokeWidth={5} /></g>; })()}
          {(() => { const k = kprog(T, K.Pa + 0.2, K.Pa + 0.6, kEase.rebote); return <g transform={`translate(${TX(1878)} 1000) scale(${k})`}>
            <circle r={18} fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-18} x2={0} y2={-270} stroke={KC.ink} strokeWidth={5} /></g>; })()}
          {T > K.Pa + 0.4 && (() => { const w = kprog(T, K.Pa + 0.5, K.Pa + 1.6); return <g>
            <clipPath id="clipMic"><rect x={540} y={600} width={460 * w} height={140} /></clipPath>
            <text x={1000} y={700} textAnchor="end" clipPath="url(#clipMic)" style={{ font:`italic 900 92px ${KF.texto}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">microbio</text></g>; })()}
        </>)}
      </Escena>
      {/* 12 · hoy: lleva su nombre y se vende como insecticida */}
      <Escena T={T} a={K.H} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Costal x={300} y={1010} s={kprog(T, K.H + 2.2, K.H + 2.7, kEase.rebote) * 0.95} />
          {T > K.H + 1.2 && <g opacity={kprog(T, K.H + 1.2, K.H + 1.5)}>
            <path d={`M 420 690 Q 640 700 ${klerp(420, 700, kprog(T, K.H + 1.2, K.H + 1.8))} ${klerp(690, 860, kprog(T, K.H + 1.2, K.H + 1.8))}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="18 12" />
            <Naturalista x={800} y={1150} s={kprog(T, K.H + 1.5, K.H + 1.9, kEase.rebote) * 0.55} />
          </g>}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma hoja y el mismo gusano del inicio, ya "leídos" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaMorera x={500} y={1070} w={1000} h={380} />
          <GusanoSeda T={T} x={480} y={1060} s={1.3} duro={1} moho={1} polvo={1} seed={1} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.0} until={K.E - 0.3} texto="¿cal?" x={270} y={610} tam={64} />
      {T < K.E && fsvg(<g opacity={1 - kprog(T, K.E - 0.3, K.E)}><Sello T={T} at={K.G + 2.6} x={300} y={790} texto="HONGO" color="#118a3a" r={110} rot={-10} /></g>, 43)}
      <Etq T={T} at={K.G + 3.2} until={K.E - 0.3} x={40} y={430} texto="gusano de seda" tam={32} color={KC.ink} />
      <Etq T={T} at={K.G + 3.5} until={K.E - 0.3} x={40} y={480} texto="Bombyx mori" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.E + 0.3} until={K.Cu - 0.3} x={40} y={420} texto="vivo, comiendo morera" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cu + 0.1} until={K.Ad - 0.3} texto="POR DENTRO · LA PIEL" x={540} y={420} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Cu + 0.3} until={K.Ad - 0.3} x={410} y={640} texto="conidio" tam={30} lado="izq" color={KC.texto} />
      <Etq T={T} at={K.Cu + 1.0} until={K.Ad - 0.3} x={700} y={600} texto="apresorio" tam={28} lado="izq" color={KC.texto} />
      <Etq T={T} at={K.Cu + 0.5} until={K.Ad - 0.3} x={40} y={790} texto="cutícula" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cu + 0.6} until={K.Ad - 0.3} x={40} y={1150} texto="hemolinfa · su “sangre”" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Cu + 1.6} until={K.Ad - 0.3} texto="enzimas" x={330} y={520} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Cu + 1.9} until={K.Ad - 0.3} texto="presión" x={880} y={520} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Ad + 0.4} until={K.Sa - 0.3} x={40} y={640} texto="hemolinfa · su “sangre”" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ad + 1.4} until={K.Sa - 0.3} x={40} y={700} texto="células sueltas (blastosporas)" tam={28} color={BS.blasto} />
      <Etq T={T} at={K.Ad + 2.2} until={K.Sa - 0.3} x={40} y={760} texto="hemocitos · sus defensas" tam={28} color={BS.hemoc} />
      {/* días después de infectarse */}
      {kvisible(T, K.Sa + 0.1, K.P - 0.3) && <div style={{ position:'absolute', left:60, top:470, zIndex:42, opacity:kprog(T, K.Sa + 0.1, K.Sa + 0.4) * (1 - kprog(T, K.P - 0.3, K.P)),
        font:`700 44px ${KF.mono}`, color:KC.ink, background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:16, padding:'6px 22px' }}>día {Math.min(4, 1 + Math.floor(kprog(T, K.Sa + 0.1, K.Sa + 1.4) * 3.99))}</div>}
      <Chip T={T} at={K.Sa + 1.3} until={K.P - 0.3} texto="muere" x={260} y={620} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Sa + 1.9} until={K.P - 0.3} texto="se pone duro" x={330} y={720} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Sa + 3.0} until={K.P - 0.3} texto="el hongo sale y lo cubre de esporas" x={540} y={850} tam={32} borde={KC.gold} />
      {kvisible(T, K.B + 0.3, K.Pu - 0.3) && (() => { const e = kentrada(T, K.B + 0.3, K.Pu - 0.3, 'pop'); const an = Math.round(klerp(1807, 1835, kprog(T, K.B + 0.8, K.B + 2.6, kEase.suave)));
        return <div style={{ position:'absolute', left:0, right:0, top:330, zIndex:43, display:'flex', justifyContent:'center', opacity:e.o }}>
          <div style={{ transform:`scale(${e.s}) rotate(-2deg)`, background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'14px 44px 20px', textAlign:'center', boxShadow:`14px 14px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>
            <div style={{ font:`400 120px/1 ${KF.titulo}`, color:KC.gold, WebkitTextStroke:`4px ${KC.ink}` }}>1807 → {an}</div>
            <div style={{ font:`900 44px ${KF.texto}`, color:KC.ink, marginTop:6 }}>Agostino Bassi</div>
            <div style={{ font:`700 28px ${KF.mono}`, color:'#5a524a', marginTop:6 }}>trabajó en Lodi, Italia</div>
            <div style={{ font:`700 28px ${KF.mono}`, color:'#5a524a' }}>casi 30 años de estudio</div>
          </div></div>; })()}
      <Chip T={T} at={K.Pr + 0.4} until={K.Pm - 0.3} texto="EXPERIMENTO" x={330} y={460} tam={36} borde={KC.ink} mono />
      <Etq T={T} at={K.Pr + 0.6} until={K.Pm - 0.3} x={60} y={560} texto="polvo de un gusano enfermo →" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pr + 1.0} until={K.Pm - 0.3} x={60} y={610} texto="gusanos sanos" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pr + 2.4} until={K.Pm - 0.3} texto="se enfermaron" x={330} y={720} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Pm + 0.5} until={K.H - 0.3} x={300} y={780} texto="1835 · Bassi" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Pm + 0.9} until={K.H - 0.3} x={300} y={830} texto="un hongo enferma al gusano de seda" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Pm + 1.4} until={K.Pa - 0.2} texto="prueba con experimentos · en un animal" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Pm + 1.8} until={K.Pa - 0.2} x={140} y={560} texto="(para muchos historiadores, la primera)" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pm + 2.8} until={K.H - 0.3} x={TX(1876) + 40} y={1120} texto="1876 · Koch: ántrax" tam={26} lado="izq" color={KC.ink} />
      <Etq T={T} at={K.Pa + 0.6} until={K.H - 0.3} x={1010} y={570} texto="1878 · la palabra" tam={28} lado="izq" color={KC.ink} />
      {kvisible(T, K.H + 0.3, K.C - 0.3) && <div style={{ position:'absolute', left:70, top:470, zIndex:42, opacity:kprog(T, K.H + 0.3, K.H + 0.7) * (1 - kprog(T, K.C - 0.3, K.C)),
        font:`italic 900 96px/1.02 ${KF.texto}`, color:KC.paper, textShadow:KSOMBRA }}>
        Beauveria<br /><span style={{ background:`linear-gradient(transparent 78%, ${KC.gold} 78%)`, backgroundSize:`${kprog(T, K.H + 0.8, K.H + 1.3) * 100}% 100%`, backgroundRepeat:'no-repeat' }}>bassiana</span></div>}
      <Etq T={T} at={K.H + 1.8} until={K.C - 0.3} x={1040} y={1150} texto="Agostino Bassi" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou} x={60} y={600} texto="conidios" tam={34} color={KC.ink} />
      <Etq T={T} at={K.C + 1.4} until={K.Ou} x={60} y={660} texto="Beauveria bassiana" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={720} texto="Bassi, 1835" tam={34} color={KC.ink} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="no es cal: es un hongo" x={330} y={830} tam={38} borde="#118a3a" />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.E} texto="1 cm" largo={104} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Cu} texto="1 cm" largo={80} color={KC.ink} />
      <BarraEscala T={T} at={K.Cu} until={K.Ad} texto="corte esquemático · conidio ≈ 2–3 µm" largo={0} />
      <BarraEscala T={T} at={K.Ad} until={K.Sa} texto="esquemático · dentro del gusano" largo={0} />
      <BarraEscala T={T} at={K.Sa} until={K.P} texto="1 cm" largo={80} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.B} texto="1 cm" largo={50} color={KC.ink} />
      <BarraEscala T={T} at={K.B} until={K.Pm} texto="escena recreada · no es un retrato" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Pm} until={K.H} texto="línea de tiempo 1830–1880" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={104} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No es cal: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.Cu - 0.1} texto="Empieza con *conidios:* esporas diminutas." />
      <Subtitulo T={T} idx={2} at={K.Cu + 0.1} until={K.Ad - 0.1} texto="Cruza la cutícula con *enzimas y presión.*" />
      <Subtitulo T={T} idx={3} at={K.Ad + 0.1} until={K.Sa - 0.1} texto="En su sangre, *esquiva sus defensas.*" />
      <Subtitulo T={T} idx={4} at={K.Sa + 0.1} until={K.P - 0.1} texto="Muere, *se pone duro* y lo cubren esporas." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.B - 0.1} texto="¿Cómo supimos que era *un ser vivo?*" />
      <Subtitulo T={T} idx={6} at={K.B + 0.1} until={K.Pu - 0.1} texto="Agostino Bassi: *casi 30 años* de estudio." />
      <Subtitulo T={T} idx={7} at={K.Pu + 0.1} until={K.Pr - 0.1} texto="1835: un hongo *que pasa de gusano a gusano.*" />
      <Subtitulo T={T} idx={8} at={K.Pr + 0.1} until={K.Pm - 0.1} texto="Polvo en gusanos sanos: *se enfermaron.*" />
      <Subtitulo T={T} idx={9} at={K.Pm + 0.1} until={K.Pa - 0.1} texto="Para muchos, *la primera prueba* en un animal." />
      <Subtitulo T={T} idx={10} at={K.Pa + 0.1} until={K.H - 0.1} texto="«Microbio»: *una palabra de 1878.*" />
      <Subtitulo T={T} idx={11} at={K.H + 0.1} until={K.C - 0.1} texto="Lleva su nombre y *se vende como insecticida.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ayudó a probar que *los microbios enferman.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.E + 0.5, K.E + 3.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ad + 0.8, K.Ad + 4.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Sa + 1.4, K.Sa + 4.5, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.B + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pr + 0.3, K.Pr + 3.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pa + 0.3, K.Pa + 3.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.H + 0.4, K.H + 4.6, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="135" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BassiApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BassiShot /></CompositionStage></div>;
}
window.BassiApp = BassiApp;
