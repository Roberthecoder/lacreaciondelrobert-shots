// Shot Químico #56 · Ese merengue no es solo azúcar (la espuma de proteínas de la clara) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (proteínas, listones, ganchitos, gotas de grasa).
const MER = '#fffdf6', MER_SOMBRA = '#e9e1cf', CLARA = '#f4f1d6', YEMA = '#ffc21a', NAR = '#ff8a1f', AZU = '#4fb3ff', ORO = '#F4C25A', GRASA = '#ffd23f';
const TAZON = '#2346ff';

// ---------- piezas de cocina ----------
// Tazón visto de lado. x,y = centro del borde. contenido: 'nada' | 'clara' | 'espuma'.
function Tazon({ T, x, y, s = 1, contenido = 'espuma', pico = 0, color = TAZON, espumaSube = 1, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={300} ry={60} fill="#1a1f4a" stroke={KC.ink} strokeWidth={10} />
    {contenido === 'clara' && <ellipse cx={0} cy={8} rx={270} ry={46} fill={CLARA} opacity={0.9} />}
    {contenido === 'clara' && gota > 0 && <circle cx={40} cy={10} r={22 * gota} fill={YEMA} stroke={KC.ink} strokeWidth={5} />}
    {contenido === 'espuma' && <g>
      <path d={`M -280 10 ${Array.from({ length: 8 }, (_, i) => { const x0 = -280 + i * 70; return `Q ${x0 + 35} ${-40 * espumaSube - 20 - (i % 3) * 14} ${x0 + 70} 6`; }).join(' ')} Q 0 70 -280 10 Z`}
        fill={MER} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {pico > 0 && <Pico x={10} y={-30 * espumaSube} h={170 * pico} />}
    </g>}
    <path d="M -300 0 Q -290 260 0 270 Q 290 260 300 0 Q 0 70 -300 0 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -240 70 Q -220 200 -90 236" stroke="rgba(255,255,255,.35)" strokeWidth={16} fill="none" strokeLinecap="round" />
  </g>;
}
// Pico de merengue con la puntita doblada.
function Pico({ x, y, h }) {
  if (h <= 2) return null;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -80 4 Q -46 ${-h * 0.45} -10 ${-h} Q 4 ${-h - 26} 34 ${-h + 6} Q 10 ${-h + 4} 6 ${-h * 0.72} Q 30 ${-h * 0.3} 80 4 Z`} fill={MER} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -40 -10 Q -20 ${-h * 0.4} -6 ${-h * 0.8}`} stroke={MER_SOMBRA} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Batidor de globo. gira = fase del giro.
function Batidor({ x, y, s = 1, gira = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2, 3].map((k) => { const rx = Math.abs(Math.cos(gira + k * Math.PI / 4)) * 70 + 6; return <ellipse key={k} cx={0} cy={20} rx={rx} ry={130} fill="none" stroke="#c9ced8" strokeWidth={7} />; })}
    <rect x={-22} y={-330} width={44} height={210} rx={20} fill={KC.coral} stroke={KC.ink} strokeWidth={8} />
    <rect x={-16} y={-130} width={32} height={30} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Huevo que se parte: abre 0..1.
function Huevo({ x, y, s = 1, abre = 0 }) {
  const d = abre * 90, r = abre * 30;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${-d} ${-abre * 20}) rotate(${-r})`}><path d="M -90 0 Q -90 -170 0 -170 Q 90 -170 90 0 L 50 -16 L 20 6 L -14 -18 L -50 4 Z" fill="#fbf3e2" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
    <g transform={`translate(${d} ${-abre * 20}) rotate(${r})`}><path d="M -90 0 L -50 4 L -14 -18 L 20 6 L 50 -16 L 90 0 Q 90 110 0 110 Q -90 110 -90 0 Z" fill="#fbf3e2" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
  </g>;
}
// Horno con charola de suspiros. dora 0..1.
function Horno({ T, x, y, s = 1, dora = 0 }) {
  const brillo = 0.5 + 0.2 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-300} width={660} height={560} rx={36} fill="#e8e3da" stroke={KC.ink} strokeWidth={10} />
    {[-220, -110, 0, 110, 220].map((dx) => <circle key={dx} cx={dx} cy={-250} r={20} fill="#3a3a3a" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-270} y={-190} width={540} height={380} rx={24} fill={`rgba(255,150,40,${brillo})`} stroke={KC.ink} strokeWidth={9} />
    <line x1={-250} y1={110} x2={250} y2={110} stroke="#5a524a" strokeWidth={10} />
    {[-170, -60, 50, 160].map((dx, i) => <g key={i} transform={`translate(${dx} 104) scale(0.55)`}>
      <path d="M -80 4 Q -46 -80 -10 -150 Q 4 -176 34 -144 Q 10 -146 6 -110 Q 30 -50 80 4 Z" fill={mixHex('#fffdf6', '#f1d9a8', dora)} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" /></g>)}
    <rect x={-170} y={210} width={340} height={26} rx={13} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Probeta con líquido y espuma encima (esquemática).
function Probeta({ T, x, y, h = 0, liq = CLARA, seed = 3 }) {
  const R = krng(seed);
  const bs = Array.from({ length: 40 }, () => [R() * 140 - 70, R(), 10 + R() * 14, R() * 6]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-120} width={160} height={120} fill={liq} opacity={0.9} />
    {bs.map(([bx, by, r, p], i) => (by * 520 < h ? <circle key={i} cx={bx} cy={-130 - by * 520 + Math.sin(T * 3 + p) * 2} r={r} fill={MER} stroke="#b9c3cf" strokeWidth={3} /> : null))}
    {h > 0 && <rect x={-80} y={-120 - h} width={160} height={h} fill="rgba(255,255,255,.55)" />}
    <path d="M -100 -680 L -80 -660 L -80 -10 Q -80 0 -70 0 L 70 0 Q 80 0 80 -10 L 80 -660 L 100 -680" fill="rgba(255,255,255,.12)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[1, 2, 3, 4, 5, 6].map((k) => <line key={k} x1={-80} x2={-50} y1={-k * 100} y2={-k * 100} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-130} y={0} width={260} height={30} rx={10} fill="#5a524a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Olla con garbanzos hirviendo.
function Olla({ T, x, y, s = 1 }) {
  const R = krng(11);
  const gs = Array.from({ length: 22 }, () => [R() * 380 - 190, R() * 120, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-250} y={-180} width={500} height={260} rx={30} fill="#9aa3b5" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-180} rx={250} ry={50} fill="#e9d9a8" stroke={KC.ink} strokeWidth={10} />
    {gs.map(([gx, gy, p], i) => <circle key={i} cx={gx * (1 - gy / 400)} cy={-200 + gy * 0.25 + Math.sin(T * 6 + p) * 4} r={22} fill="#e2b866" stroke={KC.ink} strokeWidth={4} />)}
    {[0, 1, 2].map((k) => { const ph = (T * 0.8 + k / 3) % 1; return <path key={k} d={`M ${-120 + k * 120} ${-250 - ph * 180} q 30 -30 0 -60 q -30 -30 0 -60`} stroke="rgba(255,255,255,.75)" strokeWidth={12} fill="none" strokeLinecap="round" opacity={1 - ph} />; })}
    <rect x={-310} y={-150} width={70} height={30} rx={14} fill="#5a524a" stroke={KC.ink} strokeWidth={6} />
    <rect x={240} y={-150} width={70} height={30} rx={14} fill="#5a524a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Suspiro (merengue horneado) en su plato con estrellitas de calificación.
function Suspiro({ T, x, y, s = 1, estrellas = 0, etiqueta, color = KC.mint }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={190} ry={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(0 20) scale(1.2)"><path d="M -80 4 Q -46 -80 -10 -150 Q 4 -176 34 -144 Q 10 -146 6 -110 Q 30 -50 80 4 Z" fill={MER} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /><path d="M -44 0 Q -24 -70 -8 -128 M 10 -4 Q 22 -50 4 -104" stroke={MER_SOMBRA} strokeWidth={9} fill="none" strokeLinecap="round" /></g>
    {[0, 1, 2, 3].map((k) => { const e = kclamp(estrellas * 4 - k, 0, 1); return e > 0 ? <path key={k} transform={`translate(${-105 + k * 70} 120) scale(${e})`} d="M 0 -28 L 8 -9 L 28 -9 L 12 4 L 18 24 L 0 12 L -18 24 L -12 4 L -28 -9 L -8 -9 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /> : null; })}
    {etiqueta && <g><rect x={-170} y={-280} width={340} height={64} rx={32} fill={color} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={-236} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}

// ---------- piezas microscópicas (esquemáticas) ----------
// Proteína enrollada como bolita de estambre.
function ProtBola({ T, x, y, r = 30, color = '#9fd8ff', seed = 1, o = 1 }) {
  if (r <= 1) return null;
  const a = T * 0.8 + seed;
  return <g transform={`translate(${x} ${y}) rotate(${(a * 40) % 360})`} opacity={o}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={Math.max(2, r / 8)} />
    <path d={`M ${-r * 0.7} ${-r * 0.2} Q 0 ${-r * 0.9} ${r * 0.7} ${-r * 0.2} M ${-r * 0.8} ${r * 0.2} Q 0 ${-r * 0.3} ${r * 0.8} ${r * 0.25} M ${-r * 0.5} ${r * 0.6} Q 0 ${r * 0.1} ${r * 0.5} ${r * 0.65}`} stroke="rgba(0,0,0,.45)" strokeWidth={Math.max(2, r / 10)} fill="none" />
  </g>;
}
// Listón (proteína desdoblada) sobre la orilla. P = punto en la orilla, u = dirección hacia el agua. p = 0..1 cuánto se desdobló.
function Liston({ T, px, py, ux, uy, L = 110, p = 1, seed = 0, grasa = 0 }) {
  if (p <= 0.02) return null;
  const vx = -uy, vy = ux, n = 9;
  const pts = (signo, color, ancho) => {
    let d = '';
    for (let i = 0; i <= n; i++) { const t = (i / n) * L * p, w = Math.sin(i * 1.3 + T * 3 + seed) * 12 * p;
      const xx = px + ux * t * signo + vx * w, yy = py + uy * t * signo + vy * w; d += (i ? ' L ' : 'M ') + xx.toFixed(1) + ' ' + yy.toFixed(1); }
    return <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  };
  return <g>
    {pts(-1, KC.ink, 18)}{pts(1, KC.ink, 18)}
    {pts(-1, NAR, 10)}{pts(1, AZU, 10)}
    {grasa > 0 && <circle cx={px - ux * L * 0.6} cy={py - uy * L * 0.6} r={26 * grasa} fill={GRASA} stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Ganchito entre dos puntos (unión entre proteínas). p = 0..1 (aparece), suelta = 0..1 (se separa).
function GanchoProt({ x1, y1, x2, y2, p = 1, suelta = 0 }) {
  if (p <= 0) return null;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, gap = suelta * 26;
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ex = dx / d, ey = dy / d;
  return <g opacity={p * (1 - suelta * 0.6)}>
    <path d={`M ${x1} ${y1} Q ${mx - ey * 24 - ex * gap} ${my + ex * 24 - ey * gap} ${mx - ex * gap} ${my - ey * gap}`} stroke={ORO} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M ${x2} ${y2} Q ${mx + ey * 24 + ex * gap} ${my - ex * 24 + ey * gap} ${mx + ex * gap} ${my + ey * gap}`} stroke={ORO} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Burbuja entera con listones alrededor (malla). red 0..1 = ganchitos; rompe 0..1.
function BurbujaRed({ T, cx, cy, r, n = 14, desd = 1, red = 1, rompe = 0, aprieta = 0, grasa = 0 }) {
  const enc = 1 - 0.45 * kprog(rompe, 0.5, 1), sx = (1 + aprieta * 0.16) * enc, sy = (1 - aprieta * 0.12) * enc;
  const ps = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r * sy, Math.cos(a), Math.sin(a)]; });
  return <g opacity={1 - 0.7 * kprog(rompe, 0.6, 1)}>
    <ellipse cx={cx} cy={cy} rx={r * sx} ry={r * sy} fill="rgba(190,232,255,.16)" stroke="#bfe8ff" strokeWidth={5} />
    <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.18} ry={r * 0.1} fill="rgba(255,255,255,.4)" transform={`rotate(-30 ${cx - r * 0.35} ${cy - r * 0.4})`} />
    {ps.map(([x, y, ux, uy], i) => <Liston key={i} T={T} px={x} py={y} ux={ux} uy={uy} L={r * 0.32} p={desd} seed={i} grasa={grasa} />)}
    {ps.map(([x, y], i) => { const [x2, y2] = ps[(i + 1) % n]; return <GanchoProt key={'g' + i} x1={x} y1={y} x2={x2} y2={y2} p={kprog(red, i / n * 0.6, i / n * 0.6 + 0.4)} suelta={rompe} />; })}
  </g>;
}
// Barra de escala esquemática (sin número: no hay fuente del tamaño).
function EscalaEsq({ x = 60, y = 1600, txt = 'escala esquemática', color = KC.texto }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, display:'flex', alignItems:'center', gap:14 }}>
    <div style={{ width:150, height:10, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.6)' }}></div>
    <div style={{ font:`700 28px ${KF.mono}`, color, textShadow:'0 2px 0 rgba(0,0,0,.8)' }}>{txt}</div>
  </div>;
}
// Fondo de agua oscura con puntitos (moléculas de agua) que se mecen.
function AguaMicro({ T, n = 60, seed = 4, color = 'rgba(120,190,255,.35)' }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x = R() * KW, y = R() * KH, p = R() * 6; return <circle key={i} cx={x + Math.sin(T * 1.4 + p) * 10} cy={y + Math.cos(T * 1.1 + p) * 10} r={6} fill={color} />; })}</g>;
}

function Merengue() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cl: CUES.Clara, Ba: CUES.Batir, De: CUES.Desdoblar, Re: CUES.Red, Az: CUES.Azucar, Pr: CUES.Pregunta, Es: CUES.Estudio, Gr: CUES.Grasa, Ga: CUES.Garbanzo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el batidor sale del merengue y deja un pico parado
  const sube = kprog(T, K.G, K.G + 0.8, kEase.sale);
  const pico = kprog(T, K.G + 0.05, K.G + 0.9, kEase.rebote);
  // clara
  const abre = kprog(T, K.Cl + 0.2, K.Cl + 0.7, kEase.sale), cae = kprog(T, K.Cl + 0.6, K.Cl + 1.3);
  const micro1 = K.Cl + 2.2;
  // batir
  const batM = K.Ba + 1.5;
  const R1 = krng(21);
  const bolas = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2 + R1() * 0.2, d0 = 470 + R1() * 200; return [a, d0, R1()]; });
  // desdoblar: orilla curva de una burbuja enorme
  const CX = 540, CY = 120, RR = 760;
  const orilla = Array.from({ length: 9 }, (_, i) => { const a = Math.PI / 2 + (i - 4) * 0.11; return [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR, Math.cos(a), Math.sin(a)]; });
  const desd = (i) => kprog(T, K.De + 0.3 + i * 0.18, K.De + 1.4 + i * 0.18, kEase.suave);
  // red
  const redP = kprog(T, K.Re + 0.2, K.Re + 1.8);
  const apr = T > K.Re + 2.2 ? Math.max(0, Math.sin((T - K.Re - 2.2) * 6)) * Math.exp(-(T - K.Re - 2.2) * 1.5) : 0;
  // azúcar
  const hornoAt = K.Az + 2.4;
  // pregunta
  const gotaY = kprog(T, K.Pr + 0.2, K.Pr + 0.8, (p) => p * p);
  // estudio
  const probAt = K.Es + 2.8;
  const espA = 480 * kprog(T, probAt + 0.3, probAt + 2.8, kEase.sale), espB = 300 * kprog(T, probAt + 0.3, probAt + 3.6, kEase.sale);
  // grasa
  const grasaP = kprog(T, K.Gr + 0.8, K.Gr + 2.4), rompe = kprog(T, K.Gr + 3.0, K.Gr + 4.6);
  // garbanzo
  const chorro = kprog(T, K.Ga + 1.0, K.Ga + 1.4) * (1 - kprog(T, K.Ga + 2.3, K.Ga + 2.6));
  const espG = kprog(T, K.Ga + 2.5, K.Ga + 3.6, kEase.sale);
  const compAt = K.Ga + 5.9;
  const R2 = krng(9);
  const azucar = Array.from({ length: 18 }, () => [180 + R2() * 720, R2() * 0.9, R2() * 360]);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el pico de merengue */}
      <Escena T={T} a={K.G} b={K.Cl} zoom={0.06} origen="45% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Tazon T={T} x={440} y={900} s={1.15} contenido="espuma" pico={pico} />
          <Batidor x={450} y={klerp(880, 460, sube)} s={1} gira={T * 2} rot={klerp(0, 14, sube)} />
          {T > K.G + 2.4 && Array.from({ length: 9 }, (_, i) => { const e = kprog(T, K.G + 2.4 + i * 0.12, K.G + 2.8 + i * 0.12, kEase.rebote); return <circle key={i} cx={260 + (i % 5) * 80 + (i > 4 ? 40 : 0)} cy={(i > 4 ? 890 : 860) - (i % 2) * 12} r={16 * e} fill="none" stroke={AZU} strokeWidth={5} />; })}
        </SvgCapa>
        <EscalaEsq txt="1 cm · esquemático" color={KC.ink} />
      </Escena>
      {/* 1 · la clara: huevo que se parte, y adentro */}
      <Escena T={T} a={K.Cl} b={K.Ba + 0.2} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tazon T={T} x={540} y={960} s={1} contenido="clara" />
          <Huevo x={540} y={560} s={1.1} abre={abre} />
          {cae > 0 && cae < 1 && <ellipse cx={540} cy={klerp(580, 950, cae)} rx={90 - cae * 20} ry={60 + cae * 30} fill={CLARA} stroke="#c9c2a0" strokeWidth={5} opacity={0.9} />}
        </SvgCapa>
        <Lupa T={T} at={micro1} until={K.Ba - 0.2} x={540} y={700} r={240} fx={540} fy={960} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · la clara"
          interior={(T2, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill={KC.noche} />
            {Array.from({ length: 40 }, (_, i) => { const R = krng(30 + i); const x = R() * r * 2, y = R() * r * 2; return <circle key={i} cx={x + Math.sin(T2 + i) * 6} cy={y} r={5} fill="rgba(120,190,255,.5)" />; })}
            {Array.from({ length: 10 }, (_, i) => { const x = 90 + (i % 4) * 110 + (Math.floor(i / 4) % 2) * 50, y = 110 + Math.floor(i / 4) * 140; const oro = i % 2 === 0 && T2 > micro1 + 1.2;
              return <ProtBola key={i} T={T2} x={x + Math.sin(T2 + i) * 8} y={y + Math.cos(T2 * 0.8 + i) * 8} r={34} seed={i} color={oro ? ORO : '#9fd8ff'} />; })}
          </svg>} />
      </Escena>
      {/* 2a · batir (macro) */}
      <Escena T={T} a={K.Ba} b={batM} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Tazon T={T} x={540} y={960} s={1} contenido="espuma" espumaSube={kprog(T, K.Ba, batM)} />
          <Batidor x={540 + Math.sin(T * 9) * 60} y={860} s={1} gira={T * 14} rot={Math.sin(T * 9) * 10} />
        </SvgCapa>
      </Escena>
      {/* 2b–3–4 · micro: burbuja, proteínas que se pegan, se desdoblan, se enganchan */}
      <Escena T={T} a={batM} b={K.De} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} />
          <circle cx={540} cy={860} r={300} fill="rgba(190,232,255,.14)" stroke="#bfe8ff" strokeWidth={6} />
          <text x={540} y={875} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#bfe8ff" opacity={0.8}>AIRE</text>
          {bolas.map(([a, d0, q], i) => { const t0 = batM + 0.2 + q * 1.4, llega = kprog(T, t0, t0 + 1.0, kEase.sale), d = klerp(d0, 330, llega);
            return <ProtBola key={i} T={T} x={540 + Math.cos(a) * d} y={860 + Math.sin(a) * d} r={30} seed={i} color={i % 2 ? '#9fd8ff' : ORO} />; })}
        </SvgCapa>
        <EscalaEsq />
      </Escena>
      <Escena T={T} a={K.De} b={K.Re} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={6} />
          <circle cx={CX} cy={CY} r={RR} fill="rgba(190,232,255,.18)" stroke="#bfe8ff" strokeWidth={8} />
          <text x={560} y={430} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill="#bfe8ff" opacity={0.85}>AIRE</text>
          <text x={540} y={1180} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill="#7fc8ff" opacity={0.6}>AGUA</text>
          {orilla.map(([x, y, ux, uy], i) => { const p = desd(i); return <g key={i}>
            <ProtBola T={T} x={x} y={y} r={36 * (1 - p)} seed={i} color={i % 2 ? '#9fd8ff' : ORO} />
            <Liston T={T} px={x} py={y} ux={ux} uy={uy} L={150} p={p} seed={i} /></g>; })}
        </SvgCapa>
        <EscalaEsq />
      </Escena>
      <Escena T={T} a={K.Re} b={K.Az + 0.2} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={8} />
          <BurbujaRed T={T} cx={540} cy={880} r={300} n={16} desd={1} red={redP} aprieta={apr} />
        </SvgCapa>
        <EscalaEsq />
      </Escena>
      {/* 5 · azúcar y horno */}
      <Escena T={T} a={K.Az} b={hornoAt} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={12} />
          {[[300, 820, 170], [600, 860, 160], [470, 1080, 160], [800, 1080, 130], [180, 1100, 110]].map(([x, y, r], i) => <BurbujaRed key={i} T={T} cx={x} cy={y} r={r} n={10} desd={1} red={1} />)}
          {azucar.map(([x, q, rot], i) => { const t0 = K.Az + 0.1 + q * 1.2, u = kprog(T, t0, t0 + 0.8), dis = kprog(T, t0 + 0.8, t0 + 1.6);
            return u > 0 && dis < 1 ? <rect key={i} x={x - 14} y={klerp(300, 900, u) - 14} width={28} height={28} fill="#fff" stroke="#9aa3b5" strokeWidth={4} opacity={1 - dis} transform={`rotate(${rot + T * 90} ${x} ${klerp(300, 900, u)})`} /> : null; })}
        </SvgCapa>
      </Escena>
      <Escena T={T} a={hornoAt} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa><Horno T={T} x={540} y={900} s={1.2} dora={kprog(T, hornoAt + 0.4, K.Pr)} /></SvgCapa>
      </Escena>
      {/* 6 · pregunta: la gota de yema */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Tazon T={T} x={360} y={1080} s={0.85} contenido="clara" gota={kprog(T, K.Pr + 0.8, K.Pr + 1.0)} />
          {gotaY < 1 && T > K.Pr + 0.1 && <circle cx={394} cy={klerp(600, 1086, gotaY)} r={22} fill={YEMA} stroke={KC.ink} strokeWidth={5} />}
          <text x={300} y={860} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 700)`} opacity={kprog(T, K.Pr + 0.9, K.Pr + 1.2)}>?</text>
        </SvgCapa>
        <Onomato T={T} at={K.Pr + 0.8} until={K.Es - 0.1} x={560} y={1000} texto="¡plop!" />
      </Escena>
      {/* 7 · 2009 · Iowa: probetas */}
      <Escena T={T} a={K.Es} b={K.Gr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T > probAt - 0.4 && <g opacity={kprog(T, probAt - 0.4, probAt)}>
            <Probeta T={T} x={420} y={1180} h={espA} seed={3} />
            <Probeta T={T} x={800} y={1180} h={espB} seed={5} liq="#f6e7a6" />
            <text x={420} y={1145} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>limpia</text>
            <text x={800} y={1145} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>+ yema</text>
            {T > probAt + 0.2 && <circle cx={840} cy={1090} r={14} fill={YEMA} stroke={KC.ink} strokeWidth={4} />}
          </g>}
        </SvgCapa>
      </Escena>
      {/* 8 · la grasa (según los autores) */}
      <Escena T={T} a={K.Gr} b={K.Ga} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <AguaMicro T={T} seed={14} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.Gr + 0.3 + i * 0.12, u = kprog(T, t0, t0 + 0.9, kEase.sale); const a = (i / 8) * Math.PI * 2;
            return u < 1 && T > t0 ? <circle key={i} cx={540 + Math.cos(a) * klerp(520, 300, u)} cy={880 + Math.sin(a) * klerp(520, 300, u)} r={22} fill={GRASA} stroke={KC.ink} strokeWidth={4} /> : null; })}
          <BurbujaRed T={T} cx={540} cy={880} r={300} n={16} desd={1} red={1} rompe={rompe} grasa={grasaP} />
        </SvgCapa>
        <Onomato T={T} at={K.Gr + 4.4} until={K.Ga - 0.1} x={540} y={900} texto="¡pop!" color={GRASA} tam={130} />
        <EscalaEsq />
      </Escena>
      {/* 9 · agua de garbanzo */}
      <Escena T={T} a={K.Ga} b={compAt} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Olla T={T} x={760} y={680} s={0.8} />
          <Chorro T={T} x0={820} y0={740} x1={780} y1={1000} color="#efe2b4" o={chorro} ancho={20} />
          <Tazon T={T} x={760} y={1030} s={0.7} contenido={espG > 0 ? 'espuma' : 'clara'} espumaSube={espG} />
          {T > K.Ga + 2.4 && T < K.Ga + 3.8 && <Batidor x={760 + Math.sin(T * 9) * 40} y={950} s={0.7} gira={T * 14} rot={Math.sin(T * 9) * 10} />}
        </SvgCapa>
      </Escena>
      <Escena T={T} a={compAt} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Suspiro T={T} x={280} y={980} s={1.25} etiqueta="normal" color={KC.cyan} estrellas={kprog(T, compAt + 0.6, compAt + 1.4)} />
          <Suspiro T={T} x={800} y={980} s={1.25} etiqueta="½ clara → garbanzo" color={KC.mint} estrellas={kprog(T, compAt + 0.6, compAt + 1.4)} />
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el mismo pico, por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="45% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa><Tazon T={T} x={440} y={900} s={1.15} contenido="espuma" pico={1} /></SvgCapa>
        <Lupa T={T} at={K.Ci + 0.6} until={K.Ou - 0.1} x={420} y={520} r={220} fx={452} fy={740} tinte={KC.cyan} etiqueta="POR DENTRO · aire + proteínas"
          interior={(T2, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill={KC.noche} />
            {[[150, 160, 100], [330, 150, 80], [250, 330, 110], [90, 340, 60], [400, 320, 60]].map(([x, y, rr], i) => <BurbujaRed key={i} T={T2} cx={x} cy={y} r={rr} n={8} desd={1} red={1} />)}
          </svg>} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.9} until={K.G + 3.0} texto="¿solo azúcar?" x={330} y={470} tam={48} />
      <Chip T={T} at={K.G + 3.0} until={K.Cl - 0.3} texto="aire + proteínas de la clara" x={540} y={1500} tam={40} borde={AZU} />
      <Medidor T={T} at={K.Cl + 0.6} until={K.Ba - 0.3} valor={(t) => 0.88 * kprog(t, K.Cl + 0.7, K.Cl + 1.9, kEase.sale)} etiqueta="la clara: agua" x={90} y={1430} color={AZU} />
      <Etq T={T} at={micro1 + 1.3} until={K.Ba - 0.3} x={60} y={410} texto="½ = ovalbúmina" tam={34} color={ORO} />
      <Chip T={T} at={batM + 0.3} until={K.De - 0.2} texto="las proteínas se pegan a la burbuja" y={1500} tam={34} borde="#bfe8ff" />
      <Etq T={T} at={K.De + 1.2} until={K.Re - 0.2} x={1040} y={540} texto="odia el agua → aire" lado="izq" tam={32} color={NAR} />
      <Etq T={T} at={K.De + 1.6} until={K.Re - 0.2} x={1040} y={1080} texto="ama el agua → agua" lado="izq" tam={32} color={AZU} />
      <Chip T={T} at={K.Re + 0.8} until={K.Az - 0.2} texto="red de proteínas = piel elástica" y={1500} tam={36} borde={ORO} />
      <Medidor T={T} at={K.Az + 0.4} until={hornoAt - 0.2} valor={(t) => klerp(0.35, 0.95, kprog(t, K.Az + 0.6, K.Az + 2.0, kEase.sale))} etiqueta="estabilidad de la espuma" texto={() => '+ azúcar'} x={90} y={1430} color={KC.mint} />
      <Chip T={T} at={hornoAt + 0.5} until={K.Pr - 0.2} texto="horno → merengue firme" y={1500} tam={42} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Es + 0.5} until={probAt - 0.3} anio="2009" quien="Wang y Wang · Iowa State, EUA" revista="J Food Sci · yema en la clara" x={540} y={760} />
      <NumeroGigante T={T} at={probAt + 1.0} until={K.Gr - 0.3} valor={0.022} desde={0.022} dec={3} dur={0.1} sufijo=" %" etiqueta="de yema en la clara" y={1520} tam={120} color={YEMA} />
      <Chip T={T} at={K.Gr + 0.4} until={K.Gr + 3.0} texto="según los autores: la grasa estorba" y={1500} tam={34} borde={GRASA} />
      <Chip T={T} at={K.Gr + 3.2} until={K.Ga - 0.2} texto="sin ganchitos → la burbuja se escapa" y={1500} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Ga + 0.5} until={K.Ga + 3.6} texto="agua de cocer garbanzos" x={540} y={420} tam={40} borde="#e2b866" />
      <TarjetaEstudio T={T} at={K.Ga + 3.9} until={compAt - 0.3} anio="2025" quien="Universidad de Jahrom · Irán" revista="Food Chem X · merengue con aquafaba" x={540} y={760} />
      <Chip T={T} at={compAt + 1.4} until={K.Ci - 0.2} texto="sin diferencia en la cata" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="aire + red de proteínas desdobladas" y={1500} tam={34} borde={AZU} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cl - 0.1} texto="No es solo azúcar: *es aire.*" />
      <Subtitulo T={T} idx={1} at={K.Cl + 0.1} until={K.Ba - 0.1} texto="La clara: *88 % agua.*" />
      <Subtitulo T={T} idx={2} at={K.Ba + 0.1} until={K.De - 0.1} texto="Se pegan *a cada burbuja.*" />
      <Subtitulo T={T} idx={3} at={K.De + 0.1} until={K.Re - 0.1} texto="Ahí se *desdoblan.*" />
      <Subtitulo T={T} idx={4} at={K.Re + 0.1} until={K.Az - 0.1} texto="Forman una *piel elástica.*" />
      <Subtitulo T={T} idx={5} at={K.Az + 0.1} until={K.Pr - 0.1} texto="Azúcar + horno = *merengue.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y *la yema?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Gr - 0.1} texto="Una pizca: *menos espuma.*" />
      <Subtitulo T={T} idx={8} at={K.Gr + 0.1} until={K.Ga - 0.1} texto="Según ellos: *la grasa estorba.*" />
      <Subtitulo T={T} idx={9} at={K.Ga + 0.1} until={K.Ci - 0.1} texto="Agua de garbanzo: *igual de bueno.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Aire en *una red de proteínas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Clara + 1.0, CUES.Batir - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Desdoblar + 0.6, CUES.Red - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Azucar + 0.4, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Grasa - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Grasa + 1.0, CUES.Garbanzo - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Garbanzo + 0.3, CUES.Garbanzo + 3.6, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="56" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MerengueApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Merengue /></CompositionStage></div>;
}
window.MerengueApp = MerengueApp;
