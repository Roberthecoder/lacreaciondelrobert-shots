// Shot Biotecnológico #49 · Cápsulas hechas a partir de caca (trasplante de microbiota fecal contra C. difficile) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const CAFE = '#8a5a2b', CAFE_OSC = '#5e3b1a', CDIF = '#b18cff', TOX = '#9b2fd6', BILIS = '#7bd35a';

// Capa SVG de pantalla completa.
function CapaF({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Cápsula de dos colores (la de Vowst se dibuja genérica, sin marca).
function Capsula({ x, y, rot = 0, s = 1, c1 = '#f6f3ec', c2 = CAFE, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 -26 L -38 -26 A 26 26 0 0 0 -38 26 L 0 26 Z" fill={c1} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -26 L 38 -26 A 26 26 0 0 1 38 26 L 0 26 Z" fill={c2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-46} y={-16} width={30} height={8} rx={4} fill="#fff" opacity=".6" />
  </g>;
}
// Frasco de cápsulas. sacude: 0..1 (vibra), abierto: 0..1 (la tapa se va).
function FrascoCapsulas({ T, x, y, s = 1, sacude = 0, abierto = 0, etiqueta = 'cápsulas' }) {
  const rot = Math.sin(T * 26) * 7 * sacude;
  const R = krng(4);
  const caps = Array.from({ length: 11 }, (_, i) => [-110 + (i % 4) * 72 + R() * 20, 60 + Math.floor(i / 4) * 62 + R() * 10, R() * 180]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-170} y={-60} width={340} height={300} rx={46} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={10} />
    {caps.map(([cx, cy, r], i) => <Capsula key={i} x={cx + Math.sin(T * 30 + i) * 6 * sacude} y={cy + Math.cos(T * 28 + i) * 6 * sacude} rot={r} s={0.8} />)}
    <rect x={-150} y={-20} width={300} height={70} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={28} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
    <g transform={`translate(${-abierto * 60} ${-abierto * 200}) rotate(${-abierto * 25})`} opacity={1 - abierto * 0.2}>
      <rect x={-130} y={-120} width={260} height={66} rx={14} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
      {[-90, -45, 0, 45, 90].map((dx) => <line key={dx} x1={dx} y1={-112} x2={dx} y2={-62} stroke="rgba(0,0,0,.35)" strokeWidth={5} />)}
    </g>
  </g>;
}
// Silueta de una persona con el intestino dibujado (macro).
function CuerpoIntestino({ T, x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={92} fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
    <circle cx={-30} cy={-340} r={9} fill={KC.ink} /><circle cx={30} cy={-340} r={9} fill={KC.ink} />
    <path d="M -30 -300 Q 0 -280 30 -300" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -190 -200 Q 0 -250 190 -200 L 210 260 Q 0 300 -210 260 Z" fill={KC.white} stroke={KC.ink} strokeWidth={10} />
    {/* colon (marco) e intestino delgado (enredo) */}
    <path d="M -120 220 L -120 20 Q -120 -20 -80 -20 L 80 -20 Q 120 -20 120 20 L 120 200 Q 100 240 40 230" fill="none" stroke={mixHex('#d98a6a', KC.gold2, brillo)} strokeWidth={36} strokeLinecap="round" />
    <path d="M -70 40 q 40 -30 70 0 t 70 0 q 10 40 -30 50 t -80 0 q -40 20 -20 60 t 80 10 q 40 0 40 40" fill="none" stroke={mixHex('#f0a6a0', KC.gold2, brillo)} strokeWidth={22} strokeLinecap="round" transform={`translate(0 ${Math.sin(T * 2) * 3})`} />
  </g>;
}
// Bacterias del "bosque" intestinal: bastones, cocos y espirales de colores.
const BOSQUE = (() => {
  const R = krng(49), cols = [KC.mint, KC.cyan, KC.yellow, KC.orange, KC.pink, '#7fd88a', KC.lilac];
  const out = [];
  for (let i = 0; i < 30; i++) {
    const x = 90 + (i % 6) * 180 + (R() - 0.5) * 70, y = 400 + Math.floor(i / 6) * 160 + (R() - 0.5) * 60;
    const centro = Math.hypot(x - 540, y - 790) < 230;
    out.push({ x, y, tipo: ['baston', 'coco', 'espiral', 'baston'][i % 4], color: cols[i % cols.length], rot: R() * 180, seed: i + 1, muere: R(), centro });
  }
  return out;
})();
function BichoBosque({ T, b, vida = 1 }) {
  const col = vida > 0.5 ? b.color : '#5b6170', o = 0.25 + 0.75 * vida, dx = mece(T, b.seed, 0.35) * 10, dy = mece(T, b.seed + 9, 0.3) * 10;
  if (b.tipo === 'baston') return <Bacteria T={T} x={b.x + dx} y={b.y + dy} largo={130} ancho={52} rot={b.rot} color={col} seed={b.seed} flagelo={false} opacidad={o} />;
  if (b.tipo === 'coco') return <g transform={`translate(${b.x + dx} ${b.y + dy}) rotate(${b.rot})`} opacity={o}>
    {[-28, 28].map((k) => <circle key={k} cx={k} cy={0} r={28} fill={col} stroke={KC.ink} strokeWidth={6} />)}</g>;
  return <g transform={`translate(${b.x + dx} ${b.y + dy}) rotate(${b.rot})`} opacity={o}>
    <path d={`M -70 0 q 17.5 ${-26 + Math.sin(T * 4 + b.seed) * 4} 35 0 t 35 0 t 35 0 t 35 0`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M -70 0 q 17.5 ${-26 + Math.sin(T * 4 + b.seed) * 4} 35 0 t 35 0 t 35 0 t 35 0`} stroke={col} strokeWidth={12} fill="none" strokeLinecap="round" /></g>;
}
// Clostridioides difficile: bastón con espora ovalada cerca de un extremo (subterminal), sin abultar la célula.
function CDiff({ T, x, y, rot = 0, s = 1, espora = 0, o = 1, seed = 3 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Bacteria T={T} x={0} y={0} largo={200} ancho={62} rot={rot} color={CDIF} seed={seed} flagelo={true}
      adentro={espora > 0 ? (L, W) => <ellipse cx={L / 2 - W * 0.8} cy={0} rx={W * 0.42 * espora} ry={W * 0.3 * espora} fill="#fff7dc" stroke={KC.ink} strokeWidth={5} /> : undefined} />
  </g>;
}
function Espora({ x, y, s = 1, rot = 0, o = 1, dormida = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + Math.sin(T * 2.5 + x) * 0.03)})`} opacity={o}>
    <ellipse rx={30} ry={21} fill="#fff7dc" stroke={KC.ink} strokeWidth={6} />
    <ellipse rx={19} ry={12} fill={CDIF} opacity=".55" />
    {dormida > 0 && <text x={30} y={-24} style={{ font:`900 30px ${KF.texto}` }} fill={KC.texto} opacity={dormida * (0.5 + 0.5 * Math.sin(T * 3 + x))}>z</text>}
  </g>;
}
// Nubecita de toxina.
function Toxina({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[0, 0, 22], [20, -10, 16], [-18, -8, 15], [6, 16, 14]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={TOX} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Pastilla de antibiótico.
function Pastilla({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-34} width={160} height={68} rx={34} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={-34} width={80} height={68} rx={0} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={40} y={-34} width={40} height={68} rx={34} fill={KC.red} />
    <path d="M 80 -34 A 34 34 0 0 1 80 34" fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Árbol pequeño (el bosque nuevo). crece 0..1. Las hojas son bacterias de colores.
function Arbolito({ T, x, y, s = 1, crece = 1 }) {
  const c = kEase.sale(kclamp(crece, 0, 1));
  const hojas = [[0, -230, KC.mint], [-70, -190, KC.cyan], [70, -190, KC.yellow], [-40, -260, KC.pink], [45, -265, KC.orange], [0, -170, '#7fd88a'], [-95, -240, KC.lilac], [95, -245, KC.mint]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 0 ${-180 * c}`} stroke={CAFE_OSC} strokeWidth={22} strokeLinecap="round" />
    <path d={`M 0 ${-110 * c} L ${-60 * c} ${-170 * c} M 0 ${-130 * c} L ${60 * c} ${-180 * c}`} stroke={CAFE_OSC} strokeWidth={14} strokeLinecap="round" />
    {hojas.map(([hx, hy, col], i) => { const k = kclamp(crece * 1.6 - 0.6 - i * 0.04, 0, 1); if (k <= 0) return null;
      return <g key={i} transform={`translate(${hx * c} ${hy * c + Math.sin(T * 2 + i) * 4}) scale(${kEase.rebote(k)}) rotate(${i * 40})`}>
        {i % 2 ? <circle r={30} fill={col} stroke={KC.ink} strokeWidth={6} /> : <rect x={-42} y={-20} width={84} height={40} rx={20} fill={col} stroke={KC.ink} strokeWidth={6} />}</g>; })}
  </g>;
}
// Cabeza de perfil en una cama, con la sonda que entra por la nariz y baja al intestino delgado (esquemático).
function PacienteSonda({ T, x, y, s = 1, sonda = 1, flujo = 0 }) {
  const largo = 1200, dash = largo * (1 - sonda);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-420} y={150} width={840} height={70} rx={20} fill="#e8f0ff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-440} y={210} width={30} height={140} fill={KC.ink} /><rect x={410} y={210} width={30} height={140} fill={KC.ink} />
    <rect x={-400} y={90} width={150} height={70} rx={30} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    {/* cuerpo acostado */}
    <path d="M -250 150 Q -230 40 -100 40 L 360 50 Q 400 60 400 150 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    {/* cabeza de perfil mirando arriba */}
    <circle cx={-300} cy={60} r={78} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -300 -18 q 18 -26 32 -6" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-320} cy={40} r={7} fill={KC.ink} />
    {/* intestino delgado (dentro del cuerpo, esquemático) */}
    <path d="M 60 110 q 30 -40 60 0 t 60 0 t 60 0" stroke="#f0a6a0" strokeWidth={18} fill="none" strokeLinecap="round" opacity=".9" />
    {/* sonda: nariz → por dentro → duodeno */}
    <path d="M -288 -14 C -260 -120 -120 -110 -100 0 L -60 80 Q -20 120 60 110" fill="none" stroke={CAFE} strokeWidth={9} strokeDasharray={`${largo} ${largo}`} strokeDashoffset={dash} strokeLinecap="round" />
    {flujo > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.6 + i / 6) % 1);
      const px = klerp(-288, 60, u), py = u < 0.4 ? klerp(-14, -100, Math.sin(u / 0.4 * Math.PI)) : klerp(0, 110, (u - 0.4) / 0.6);
      return <circle key={i} cx={px} cy={py} r={9} fill={CAFE_OSC} opacity={flujo} />; })}
  </g>;
}
// Frasco de laboratorio con muestra café (heces del donante, esquemático).
function FrascoDonante({ x, y, s = 1, etiqueta = 'donante sano', nivel = 0.6 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-110} width={160} height={210} rx={22} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-72} y={100 - 200 * nivel} width={144} height={200 * nivel - 8} rx={16} fill={CAFE} />
    <rect x={-92} y={-140} width={184} height={42} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    {etiqueta && <g><rect x={-100} y={-30} width={200} height={52} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={6} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Sello de goma.
function Sello({ T, at, until = Infinity, x, y, texto, color = KC.red, rot = -12, tam = 90 }) {
  if (T < at || T > until + 0.4) return null;
  const k = kprog(T, at, at + 0.3, kEase.sale), sc = klerp(2.2, 1, k), sal = 1 - kprog(T, until, until + 0.35);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity:k * sal,
    border:`10px solid ${color}`, color, borderRadius:20, padding:'4px 30px', font:`400 ${tam}px/1 ${KF.titulo}`, letterSpacing:'.06em', background:'rgba(255,255,255,.75)' }}>{texto}</div>;
}

function Fecal() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bo: CUES.Bosque, An: CUES.Antibiotico, Di: CUES.Difficile, Re: CUES.Regresa, Pr: CUES.Pregunta, Es: CUES.Estudio,
    Pa: CUES.Parado, Bi: CUES.Bilis, Rb: CUES.Rebyota, Vo: CUES.Vowst, Do: CUES.Dosis, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const es2 = K.Es + (K.Pa - K.Es) * 0.5;            // segunda línea del estudio (81 % vs 31 %)
  const sacude = 1 - kprog(T, K.G + 1.2, K.G + 1.8);
  // micro: cuándo se apaga cada bacteria (onda que baja con la pastilla)
  const pildoraY = klerp(-120, 1300, kprog(T, K.An + 0.3, K.An + 3.0, kEase.suave));
  const vidaDe = (b) => {
    if (T >= K.Bi - 0.5) return 1;                                               // bosque repoblado
    const pasa = kprog(T, K.An + 0.4 + (b.y - 380) / 900 * 2.4, K.An + 0.9 + (b.y - 380) / 900 * 2.4);
    const muere = b.centro || b.muere < 0.62 ? pasa : 0;
    return 1 - muere * (b.centro ? 1 : 0.85);
  };
  const huecoO = (b) => (b.centro && T > K.Di - 0.2 && T < K.Bi - 0.5 ? 1 - kprog(T, K.Di - 0.2, K.Di + 0.4) : 1);
  const crece = kprog(T, K.Di + 0.2, K.Di + 1.4, kEase.rebote);
  const divide = kprog(T, K.Di + 1.6, K.Di + 2.4, kEase.sale);
  const esporaK = kprog(T, K.Re + 0.2, K.Re + 1.0, kEase.sale);
  const recaida = T < K.Re + 1.2 ? 1 : T < K.Re + 2.1 ? 2 : 3;
  const ciclo = (T > K.Re + 1.2 ? Math.sin((T - K.Re - 1.2) / 0.9 * Math.PI) : 0);
  const cdiffs = [[540, 790, 20], [540 - 210 * divide, 700 - 40 * divide, 70], [540 + 200 * divide, 880 + 30 * divide, -30]];
  const microVisible = T > K.An - 0.5 && T < K.Pr + 0.5;
  const Micro = ({ bilis = 0 }) => <CapaF>
    {BOSQUE.map((b, i) => <g key={i} opacity={huecoO(b)}><BichoBosque T={T} b={b} vida={vidaDe(b)} /></g>)}
    {bilis === 0 && T > K.Di && T < K.Pr + 0.5 && cdiffs.map(([x, y, r], i) => (i === 0 || divide > 0) &&
      <CDiff key={i} T={T} x={x} y={y} rot={r + Math.sin(T + i) * 6} s={1.35 * crece * (i === 0 ? 1 : divide) * (1 - 0.25 * Math.max(0, ciclo))} espora={esporaK} o={1 - kprog(T, K.Re + 0.9, K.Re + 1.2) * 0.6 + 0.6 * Math.max(0, ciclo)} seed={i + 2} />)}
    {bilis === 0 && T > K.Di + 0.8 && T < K.Re + 0.6 && Array.from({ length: 8 }, (_, i) => { const u = ((T - K.Di - 0.8) * 0.35 + i / 8) % 1, a = i * 0.8;
      return <Toxina key={i} x={540 + Math.cos(a) * (120 + 380 * u)} y={790 + Math.sin(a) * (100 + 300 * u)} s={0.7 + u * 0.4} o={1 - u} />; })}
    {T > K.Re + 0.9 && cdiffs.map(([x, y, r], i) => <Espora key={'e' + i} T={T} x={x + 90 * Math.cos(r * Math.PI / 180)} y={y + 90 * Math.sin(r * Math.PI / 180)} rot={r} s={1.3} dormida={bilis} o={1} />)}
    {T > K.An && T < K.Di + 0.3 && <Pastilla x={540} y={pildoraY} s={1.1} rot={T * 60} />}
    {bilis > 0 && Array.from({ length: 10 }, (_, i) => { const u = ((T - K.Bi) * 0.28 + i / 10) % 1, x = 120 + (i * 97) % 860, y = 380 + u * 820;
      return <path key={'b' + i} d="M 0 -26 Q 18 0 0 18 Q -18 0 0 -26 Z" transform={`translate(${x} ${y})`} fill={mixHex(BILIS, KC.gold2, kprog(u, 0.35, 0.6))} stroke={KC.ink} strokeWidth={4} opacity={bilis} />; })}
  </CapaF>;

  // pasos de Vowst
  const pasosVo = [['donante', 0], ['alcohol', 1], ['filtro', 2], ['esporas', 3], ['cápsulas', 4]];
  const pasoOn = (i) => kprog(T, K.Vo + 0.3 + i * 0.7, K.Vo + 0.6 + i * 0.7, kEase.rebote);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco de cápsulas */}
      <Escena T={T} a={K.G} b={K.Bo} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <CapaF><FrascoCapsulas T={T} x={340} y={860} s={1.15} sacude={sacude} />
          {T > K.G + 2.4 && <g opacity={kprog(T, K.G + 2.4, K.G + 2.8)}><Capsula x={620} y={1080} rot={-10} s={1.5} /><Capsula x={760} y={1110} rot={18} s={1.2} /></g>}
        </CapaF>
      </Escena>
      {/* 1 · el cuerpo y la Lupa al intestino */}
      <Escena T={T} a={K.Bo} b={K.An} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <CapaF><CuerpoIntestino T={T} x={300} y={900} s={0.95} brillo={kprog(T, K.Bo + 0.2, K.Bo + 0.8)} /></CapaF>
      </Escena>
      <Lupa T={T} at={K.Bo + 0.5} until={K.An - 0.2} x={700} y={760} r={270} fx={300} fy={940} tinte={KC.mint} etiqueta="AL MICROSCOPIO · COLON"
        interior={(T2, r) => <svg width={r * 2} height={r * 2} viewBox="200 500 680 680">{BOSQUE.map((b, i) => <BichoBosque key={i} T={T2} b={b} vida={1} />)}</svg>} />
      {/* 2–4 · dentro: antibiótico, C. difficile, esporas */}
      <Escena T={T} a={K.An} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(180,220,255,.18)" />
        {microVisible && <Micro />}
      </Escena>
      {/* 5 · pregunta: ¿otra pastilla o devolver el bosque? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <CapaF>
          <Pastilla x={250} y={1000} s={1.5} rot={Math.sin(T * 3) * 8} />
          <g transform="translate(820 1100)"><path d="M -110 0 L 110 0 L 80 120 L -80 120 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={9} /><Arbolito T={T} x={0} y={0} s={1.1} crece={kprog(T, K.Pr + 0.6, K.Pr + 2.2)} /></g>
          <text x={520} y={880} textAnchor="middle" style={{ font:`400 240px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} transform={`rotate(${Math.sin(T * 3) * 8} 520 800)`}>?</text>
        </CapaF>
      </Escena>
      {/* 6–7 · el ensayo de Ámsterdam, 2013 */}
      <Escena T={T} a={K.Es} b={K.Pa} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <CapaF>
          <g opacity={1 - kprog(T, es2 - 0.4, es2)}>
            <PacienteSonda T={T} x={560} y={900} s={1.05} sonda={kprog(T, K.Es + 1.4, K.Es + 2.6, kEase.suave)} flujo={kprog(T, K.Es + 2.6, K.Es + 3.0)} />
            <FrascoDonante x={180} y={720} s={0.9} />
          </g>
          {T > es2 - 0.3 && [['trasplante', 81, '13 de 16', KC.mint, 330], ['solo vancomicina', 31, '4 de 13', KC.coral, 750]].map(([et, v, n, col, cx], i) => {
            const g = kprog(T, es2 + 0.1 + i * 0.25, es2 + 1.2 + i * 0.25, kEase.sale), h = 420 * v / 100 * g, base = 1180;
            return <g key={i} opacity={kprog(T, es2 - 0.3, es2)}>
              <rect x={cx - 120} y={base - h} width={240} height={h} rx={14} fill={col} stroke={KC.ink} strokeWidth={8} />
              <text x={cx} y={base - h - 20} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={5}>{Math.round(v * g)} %</text>
              <text x={cx} y={base - h - 120} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={g}>{n}</text>
              <text x={cx} y={base + 54} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{et}</text>
            </g>; })}
          {T > es2 - 0.3 && <line x1={150} y1={1180} x2={930} y2={1180} stroke={KC.ink} strokeWidth={8} />}
        </CapaF>
      </Escena>
      {/* 8 · lo pararon antes de tiempo */}
      <Escena T={T} a={K.Pa} b={K.Bi} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaF>
          <g transform={`translate(300 940) rotate(-4)`}>
            <rect x={-220} y={-260} width={440} height={520} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={-170} y={-190 + i * 62} width={i % 3 === 2 ? 220 : 340} height={22} rx={11} fill="#cfc6b4" />)}
            <text x={0} y={-215} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>ensayo · 2013</text>
          </g>
        </CapaF>
        <Sello T={T} at={K.Pa + 0.9} until={K.Bi - 0.2} x={300} y={940} texto="ALTO" />
        <Medidor T={T} at={K.Pa + 0.1} until={K.Bi - 0.2} valor={(t) => klerp(0, 43 / 120, kprog(t, K.Pa + 0.2, K.Pa + 0.9, kEase.sale))} etiqueta="pacientes" texto={(v) => `${Math.round(v * 120)} de 120 planeados`} x={70} y={430} ancho={940} color={KC.orange} />
      </Escena>
      {/* 9 · la bilis (hipótesis): el bosque repoblado frena las esporas */}
      <Escena T={T} a={K.Bi} b={K.Rb} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(180,255,200,.18)" />
        {T > K.Bi - 0.5 && T < K.Rb + 0.5 && <Micro bilis={kprog(T, K.Bi + 0.3, K.Bi + 1.0)} />}
      </Escena>
      {/* 10 · Rebyota, 2022 */}
      <Escena T={T} a={K.Rb} b={K.Vo} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <Ambiente T={T} n={24} color="rgba(255,255,255,.45)" />
      </Escena>
      <Sello T={T} at={K.Rb + 2.2} until={K.Vo - 0.3} x={540} y={1060} texto="APROBADO" color={KC.blue} rot={-8} tam={84} />
      {/* 11 · Vowst, 2023: de la muestra a la cápsula */}
      <Escena T={T} a={K.Vo} b={K.Do} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <CapaF>
          {pasosVo.map(([t, i]) => { const cx = 120 + i * 210, cy = 1020, k = pasoOn(i);
            return <g key={i} opacity={0.25 + 0.75 * k}>
              <g transform={`translate(${cx} ${cy}) scale(${0.85 + 0.15 * k})`}>
                <circle r={92} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
                {i === 0 && <FrascoDonante x={0} y={10} s={0.5} etiqueta="" />}
                {i === 1 && <g><path d="M -26 -60 L 26 -60 L 26 -20 L 60 50 Q 64 64 50 64 L -50 64 Q -64 64 -60 50 L -26 -20 Z" fill="#dff3ff" stroke={KC.ink} strokeWidth={6} />
                  <text x={0} y={46} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>EtOH</text>
                  {k > 0.5 && [[-24, 10], [14, 22]].map(([a, b], j) => <g key={j} transform={`translate(${a} ${b})`}><path d="M -10 -10 L 10 10 M 10 -10 L -10 10" stroke={KC.red} strokeWidth={6} strokeLinecap="round" /></g>)}</g>}
                {i === 2 && <g><path d="M -64 -50 L 64 -50 L 12 20 L 12 64 L -12 64 L -12 20 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
                  {[-30, 0, 30].map((dx) => <circle key={dx} cx={dx} cy={-34} r={8} fill={CAFE} />)}</g>}
                {i === 3 && [[-30, -20], [24, -26], [0, 18], [-32, 30], [34, 22]].map(([a, b], j) => <Espora key={j} T={T} x={a} y={b} s={0.65} rot={j * 40} />)}
                {i === 4 && <Capsula x={0} y={0} s={1.2} rot={-20} />}
              </g>
              <text x={cx} y={cy + 140} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{t}</text>
              {i < 4 && <path d={`M ${cx + 96} ${cy} l 18 0`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={pasoOn(i + 1)} />}
            </g>; })}
        </CapaF>
      </Escena>
      {/* 12 · la dosis: 4 cápsulas al día, 3 días */}
      <Escena T={T} a={K.Do} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaF>
          {[0, 1, 2].map((d) => <g key={d} transform={`translate(${70 + d * 175} ${680})`}>
            <rect x={0} y={0} width={160} height={440} rx={20} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
            <rect x={0} y={0} width={160} height={70} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
            <text x={80} y={50} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.white}>día {d + 1}</text>
            {[0, 1, 2, 3].map((c) => { const k = kprog(T, K.Do + 0.15 + (d * 4 + c) * 0.13, K.Do + 0.4 + (d * 4 + c) * 0.13, kEase.rebote);
              return k > 0 ? <Capsula key={c} x={80} y={130 + c * 82} s={0.9 * k} rot={-15} /> : null; })}
          </g>)}
        </CapaF>
      </Escena>
      {/* 13 · cierre: el frasco del inicio, abierto, y el bosque que brota */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <CapaF>
          <FrascoCapsulas T={T} x={290} y={860} s={0.95} abierto={kprog(T, K.Ci + 0.2, K.Ci + 0.9, kEase.sale)} />
          <Capsula x={640} y={1170} rot={-8} s={1.4} />
          <Arbolito T={T} x={640} y={1150} s={1.25} crece={kprog(T, K.Ci + 0.8, K.Ci + 3.0)} />
        </CapaF>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.3} until={K.Bo - 0.3} texto="¿vitaminas?" x={300} y={470} tam={52} />
      <Chip T={T} at={K.G + 1.9} until={K.Bo - 0.3} texto="hechas a partir de caca humana" y={1490} tam={42} borde={CAFE} />
      <NumeroGigante T={T} at={K.Bo + 0.9} until={K.An - 0.2} valor={38} dur={1.0} sufijo=" billones" etiqueta="bacterias en el colon (estimación 2016)" y={1560} tam={120} color={KC.mint} />
      {((T > K.Bo + 0.5 && T < K.Pr) || (T > K.Bi && T < K.Rb)) && <Escala T={T} z={1} pxPorMm={40000} x={60} y={1720} />}
      <Chip T={T} at={K.An + 0.5} until={K.Di - 0.3} texto="antibiótico: el bosque se desordena" y={1490} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Di + 1.0} until={K.Re - 0.2} x={120} y={1110} texto="Clostridioides difficile" it tam={36} color={CDIF} />
      <Chip T={T} at={K.Di + 1.4} until={K.Re - 0.3} texto="toxinas → diarrea" y={1490} tam={42} borde={TOX} />
      <Etq T={T} at={K.Re + 0.8} until={K.Pr - 0.2} x={330} y={980} texto="espora" lado="izq" tam={36} color="#fff7dc" />
      <Chip T={T} at={K.Re + 0.9} until={K.Pr - 0.2} texto={`recaída ${recaida}`} y={1490} tam={46} borde={CDIF} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 1.6} anio="2013" quien="Ámsterdam · van Nood et al." revista="New England Journal of Medicine" y={560} />
      <Chip T={T} at={K.Es + 1.9} until={es2 - 0.4} texto="sonda: nariz → intestino delgado" y={1490} tam={38} borde={CAFE} />
      <Chip T={T} at={es2 + 0.4} until={K.Pa - 0.2} texto="curados sin recaída a las 10 semanas" y={1490} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Pa + 1.4} until={K.Bi - 0.3} texto="se detuvo: el trasplante iba muy por delante" y={1490} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Bi + 0.4} until={K.Rb - 0.3} texto="hipótesis: se cree que…" y={1490} tam={40} borde={BILIS} />
      <Etq T={T} at={K.Bi + 1.2} until={K.Rb - 0.3} x={60} y={1110} texto="ácidos biliares (hipótesis)" tam={36} color={BILIS} />
      <TarjetaEstudio T={T} at={K.Rb + 0.2} until={K.Vo - 0.3} anio="2022" quien="FDA · Rebyota" revista="1.er producto de microbiota fecal aprobado" y={700} />
      <Chip T={T} at={K.Rb + 1.2} until={K.Vo - 0.3} texto="una sola dosis, por vía rectal" y={1490} tam={40} borde={KC.blue} />
      <Chip T={T} at={K.Vo + 0.1} until={K.Do - 0.2} texto="2023 · FDA · Vowst" x={640} y={640} tam={48} borde={KC.blue} />
      <Chip T={T} at={K.Vo + 1.5} until={K.Do - 0.2} texto="el alcohol mata lo que no es espora" y={1490} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Do + 0.4} until={K.Ci - 0.2} texto="4 × 3 = 12 cápsulas" y={1490} tam={44} borde={CAFE} />
      <MitoTachado T={T} at={K.Do + 0.8} tacharEn={K.Do + 1.5} until={K.Ci - 0.2} texto="sonda" x={300} y={500} tam={48} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="bacterias que vuelven a poblar" y={1490} tam={40} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bo - 0.1} texto="No son vitaminas: *vienen de caca.*" />
      <Subtitulo T={T} idx={1} at={K.Bo + 0.1} until={K.An - 0.1} texto="Un *bosque* de bacterias." />
      <Subtitulo T={T} idx={2} at={K.An + 0.1} until={K.Di - 0.1} texto="El antibiótico *lo desordena.*" />
      <Subtitulo T={T} idx={3} at={K.Di + 0.1} until={K.Re - 0.1} texto="En el hueco: *C. difficile.*" />
      <Subtitulo T={T} idx={4} at={K.Re + 0.1} until={K.Pr - 0.1} texto="Sus esporas *se quedan.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y si *devuelves el bosque?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={es2 - 0.1} texto="2013: caca de donante, *por la nariz.*" />
      <Subtitulo T={T} idx={7} at={es2 + 0.1} until={K.Pa - 0.1} texto="*81 %* contra 31 %." />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.Bi - 0.1} texto="Lo pararon *por bueno.*" />
      <Subtitulo T={T} idx={9} at={K.Bi + 0.1} until={K.Rb - 0.1} texto="Se cree: *la bilis* frena esporas." />
      <Subtitulo T={T} idx={10} at={K.Rb + 0.1} until={K.Vo - 0.1} texto="2022: *Rebyota*, aprobada." />
      <Subtitulo T={T} idx={11} at={K.Vo + 0.1} until={K.Do - 0.1} texto="2023: *Vowst*, en cápsulas." />
      <Subtitulo T={T} idx={12} at={K.Do + 0.1} until={K.Ci - 0.1} texto="4 al día, 3 días. *Sin sonda.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Semillas de *un bosque nuevo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.An + 0.5, K.Di - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Di + 1.0, K.Re + 3.0, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Pr + 0.1, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [es2 + 0.3, K.Pa - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pa + 0.2, K.Bi - 0.2, 'avatar_11_sorprendido', 'grande'],
        [K.Bi + 1.2, K.Rb - 0.2, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.Rb + 0.8, K.Vo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Vo + 0.4, K.Do - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Do + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="49" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FecalApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Fecal /></CompositionStage></div>;
}
window.FecalApp = FecalApp;
