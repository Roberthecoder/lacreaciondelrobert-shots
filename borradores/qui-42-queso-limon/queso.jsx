// Shot Químico #42 · Esa leche no se echó a perder: es queso (leche + limón + calor) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const LECHE = '#fbfaf2', SUERO = '#e3e6a6', LIMA = '#7cc943', LIMA_IN = '#e2f3a2', METAL = '#c9d2dc', BARRO = '#b8673b', AZUL_NEG = '#5fc6ff', PROT = '#3d7bff';

// Olla de 3/4 sobre la estufa. cuaja 0..1 = grumos blancos y leche que se vuelve suero; queso 0..1 = manta y bloque encima.
function Olla({ T, x, y, s = 1, cuaja = 0, vapor = 1, queso = 0, fuego = 1 }) {
  const R = krng(11);
  const grumos = Array.from({ length: 26 }, (_, i) => [(R() - 0.5) * 480, (R() - 0.5) * 80, 14 + R() * 20, R() * 6, i / 26]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* estufa */}
    <rect x={-380} y={130} width={760} height={40} rx={10} fill="#3a3f47" stroke={KC.ink} strokeWidth={8} />
    {[-250, -90, 90, 250].map((dx) => <rect key={dx} x={dx - 10} y={100} width={20} height={36} fill="#3a3f47" stroke={KC.ink} strokeWidth={5} />)}
    <Llama T={T} x={0} y={128} s={2.6} o={fuego} />
    {/* vapor */}
    {vapor > 0 && [-150, 0, 150].map((dx, i) => { const u = ((T * 0.5 + i * 0.33) % 1);
      return <path key={i} d={`M ${dx} ${-260 - u * 200} q 30 -40 0 -80 q -30 -40 0 -80`} stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={vapor * 0.55 * (1 - u)} />; })}
    {/* asas */}
    <rect x={-370} y={-200} width={80} height={34} rx={14} fill="#2d2f35" stroke={KC.ink} strokeWidth={7} />
    <rect x={290} y={-200} width={80} height={34} rx={14} fill="#2d2f35" stroke={KC.ink} strokeWidth={7} />
    {/* cuerpo */}
    <path d="M -300 -220 L -282 70 Q -280 110 -236 110 L 236 110 Q 280 110 282 70 L 300 -220 Z" fill={METAL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -250 -150 L -238 60" stroke="#fff" strokeWidth={14} opacity={0.5} strokeLinecap="round" />
    <ellipse cx={0} cy={-220} rx={300} ry={70} fill="#7d8894" />
    <ellipse cx={0} cy={-200} rx={284} ry={58} fill={mixHex(LECHE, SUERO, cuaja)} />
    {grumos.map(([gx, gy, r, p, f], i) => { const on = kclamp((cuaja - f * 0.7) / 0.3, 0, 1); if (on <= 0) return null;
      const yy = -200 + gy * 0.6 + Math.sin(T * 2 + p) * 3, xx = gx + Math.cos(T * 1.5 + p) * 5;
      return <g key={i} transform={`translate(${xx} ${yy}) scale(${on})`}>
        <circle r={r} fill="#fff" stroke="#c7c2a8" strokeWidth={4} /><circle cx={r * 0.7} cy={-r * 0.3} r={r * 0.6} fill="#fff" stroke="#c7c2a8" strokeWidth={3} /></g>; })}
    {queso > 0 && <g opacity={queso} transform={`translate(0 ${klerp(-60, 0, queso)})`}>
      <path d="M -330 -230 Q -200 -330 0 -320 Q 200 -330 330 -230 L 300 -150 Q 0 -120 -300 -150 Z" fill="#f2ead8" stroke={KC.ink} strokeWidth={7} />
      {[-200, -100, 0, 100, 200].map((dx) => <path key={dx} d={`M ${dx} -300 L ${dx + 10} -150`} stroke="#d8ccb0" strokeWidth={3} />)}
      <rect x={-170} y={-400} width={340} height={170} rx={40} fill="#fffdf4" stroke={KC.ink} strokeWidth={9} />
      <ellipse cx={-60} cy={-340} rx={40} ry={14} fill="#efe9d4" /><ellipse cx={70} cy={-300} rx={30} ry={10} fill="#efe9d4" />
    </g>}
    <ellipse cx={0} cy={-220} rx={300} ry={70} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
// Medio limón (limón mexicano) que se aprieta; aprieta 0..1.
function Limon({ x, y, s = 1, aprieta = 0, rot = 0 }) {
  const sy = 1 - aprieta * 0.25;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s} ${s * sy})`}>
    <path d="M -110 0 A 110 110 0 0 1 110 0 Z" fill={LIMA} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={110} ry={26} fill={LIMA_IN} stroke={KC.ink} strokeWidth={7} />
    {[-70, -35, 0, 35, 70].map((dx) => <line key={dx} x1={0} y1={0} x2={dx} y2={dx === 0 ? 22 : 16} stroke="#c3df6e" strokeWidth={4} />)}
    {/* dedos */}
    <ellipse cx={-80} cy={-110} rx={40} ry={56} fill="#e9a77e" stroke={KC.ink} strokeWidth={6} transform={`rotate(${-20 - aprieta * 10} -80 -110)`} />
    <ellipse cx={20} cy={-130} rx={42} ry={60} fill="#f1b48f" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={110} cy={-100} rx={36} ry={52} fill="#e9a77e" stroke={KC.ink} strokeWidth={6} transform={`rotate(${20 + aprieta * 10} 110 -100)`} />
  </g>;
}
// Micela de caseína: esfera de subunidades + "pelitos" de κ-caseína con carga negativa en la punta.
function Micela({ T, x, y, r = 60, carga = 1, pelo = 1, seed = 1, o = 1, signos = true }) {
  if (o <= 0) return null;
  const R = krng(seed), n = 18;
  const sub = Array.from({ length: 14 }, () => { const a = R() * 6.283, d = R() * r * 0.62; return [Math.cos(a) * d, Math.sin(a) * d, r * (0.22 + R() * 0.12)]; });
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * 6.283 + seed, L = r * klerp(0.12, 0.42, pelo), w = Math.sin(T * 3 + i) * 6 * pelo;
      const x0 = Math.cos(a) * r * 0.95, y0 = Math.sin(a) * r * 0.95, x1 = Math.cos(a) * (r + L) + Math.cos(a + 1.57) * w, y1 = Math.sin(a) * (r + L) + Math.sin(a + 1.57) * w;
      return <g key={i}>
        <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + Math.cos(a + 1.57) * 8} ${(y0 + y1) / 2 + Math.sin(a + 1.57) * 8} ${x1} ${y1}`} stroke="#ffe7a6" strokeWidth={Math.max(3, r * 0.05)} fill="none" strokeLinecap="round" />
        {signos && carga > 0.02 && <g transform={`translate(${x1} ${y1}) scale(${carga})`}>
          <circle r={Math.max(8, r * 0.1)} fill={AZUL_NEG} stroke={KC.ink} strokeWidth={2.5} />
          <line x1={-r * 0.055} x2={r * 0.055} y1={0} y2={0} stroke={KC.ink} strokeWidth={Math.max(2.5, r * 0.025)} strokeLinecap="round" /></g>}
      </g>; })}
    <circle r={r} fill="#f4efe4" stroke={KC.ink} strokeWidth={Math.max(3, r * 0.05)} />
    {sub.map(([sx, sy, sr], i) => <circle key={i} cx={sx} cy={sy} r={sr} fill="#e6dcc6" stroke="#c9bb9c" strokeWidth={2} />)}
  </g>;
}
// Ion H+ que cae.
function HMas({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={30} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={11} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>H⁺</text>
  </g>;
}
// Lactosa esquemática (dos anillos).
function Lactosa({ x, y, s = 1, o = 1, rot = 0 }) {
  const hex = (cx) => Array.from({ length: 6 }, (_, k) => { const a = k * Math.PI / 3; return `${cx + Math.cos(a) * 18},${Math.sin(a) * 18}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={hex(-22)} fill="#fff" stroke={KC.ink} strokeWidth={4} /><polygon points={hex(22)} fill="#ffd7ec" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Medidor de pH (tira de colores + número).
function MedidorPH({ T, at, until, valor, x = KW / 2, y = 1500, titulo = 'pH' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = typeof valor === 'function' ? valor(T) : valor;
  const u = kclamp((7 - v) / 3, 0, 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, display:'flex', alignItems:'center', gap:22,
    background:'rgba(14,15,18,.85)', border:`4px solid ${KC.gold}`, borderRadius:26, padding:'12px 28px' }}>
    <div style={{ font:`700 34px ${KF.mono}`, color:KC.texto }}>{titulo}</div>
    <div style={{ position:'relative', width:360, height:30, borderRadius:15, background:'linear-gradient(90deg,#2fe0a8,#ffe11a,#ff8a1f,#ff3b2f)', border:`3px solid ${KC.texto}` }}>
      <div style={{ position:'absolute', left:`calc(${u * 100}% - 9px)`, top:-12, width:18, height:54, borderRadius:9, background:KC.texto, border:`3px solid ${KC.ink}` }}></div>
    </div>
    <div style={{ font:`400 74px/1 ${KF.titulo}`, color:KC.yellow, minWidth:120, textAlign:'right' }}>{v.toFixed(1)}</div>
  </div>;
}
// Termómetro de cocina.
function TermoCocina({ x, y, s = 1, nivel = 0, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-34} y={-420} width={68} height={400} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-16} y={-400 + 360 * (1 - nivel)} width={32} height={360 * nivel + 10} rx={16} fill={KC.red} />
    <circle cx={0} cy={0} r={54} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {[0.25, 0.5, 0.75].map((m) => <line key={m} x1={34} x2={60} y1={-400 + 360 * (1 - m)} y2={-400 + 360 * (1 - m)} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Coladera con manta de cielo y tazón abajo (el suero escurre).
function Coladera({ T, x, y, s = 1, curd = 1, nivel = 0.5, desde = 0, hasta = Infinity, lact = true }) {
  const R = krng(4);
  const ls = Array.from({ length: 7 }, () => [(R() - 0.5) * 380, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* tazón */}
    <path d="M -300 160 Q -290 420 0 430 Q 290 420 300 160 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={160} rx={300} ry={56} fill="#0a8fb0" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={168} rx={270 * (0.6 + nivel * 0.4)} ry={44 * (0.6 + nivel * 0.4)} fill={SUERO} />
    {lact && ls.map(([lx, p], i) => <Lactosa key={i} x={lx * (0.5 + nivel * 0.4)} y={168 + Math.sin(T * 2 + p) * 10} s={0.6} rot={T * 30 + p * 40} o={nivel} />)}
    <Goteo T={T} x={-60} y0={70} y1={160} cada={0.35} color={SUERO} desde={desde} hasta={hasta} r={11} />
    <Goteo T={T} x={50} y0={70} y1={160} cada={0.45} color={SUERO} desde={desde + 0.2} hasta={hasta} r={11} />
    {/* coladera */}
    <path d="M -260 -60 Q -240 90 0 90 Q 240 90 260 -60 Z" fill={METAL} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={-180 + (i % 8) * 52} cy={-20 + Math.floor(i / 8) * 46} r={7} fill="#5d6772" />)}
    <rect x={260} y={-80} width={150} height={30} rx={12} fill="#2d2f35" stroke={KC.ink} strokeWidth={6} />
    {/* manta y cuajo */}
    <path d="M -300 -70 Q -280 -130 -200 -110 Q 0 -150 200 -110 Q 280 -130 300 -70 Q 0 -30 -300 -70 Z" fill="#f2ead8" stroke={KC.ink} strokeWidth={7} />
    {curd > 0 && <g transform={`scale(${curd})`}>{[[-120, -120, 70], [-30, -150, 80], [70, -125, 72], [150, -100, 50], [-180, -95, 46], [10, -95, 60]].map(([cx, cy, r], i) =>
      <circle key={i} cx={cx} cy={cy + Math.sin(T * 2 + i) * 2} r={r} fill="#fffdf4" stroke="#bdb79a" strokeWidth={4} />)}</g>}
  </g>;
}
// Vasija-coladera neolítica de barro.
function VasijaColadera({ T, x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={-20} rx={230} ry={200} fill="#ffe11a" opacity={0.25 * brillo + 0.1 * brillo * Math.sin(T * 6)} />}
    <path d="M -170 -160 Q -200 -40 -150 80 Q -90 150 0 150 Q 90 150 150 80 Q 200 -40 170 -160 Z" fill={BARRO} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-160} rx={170} ry={40} fill="#7a3d1e" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 30 }, (_, i) => { const c = i % 6, f = Math.floor(i / 6); return <circle key={i} cx={-110 + c * 44 + (f % 2) * 20} cy={-100 + f * 48} r={8} fill="#4a2410" />; })}
    <path d="M -120 -40 Q -80 0 -120 40" stroke="#e7a77a" strokeWidth={8} fill="none" opacity={0.6} />
  </g>;
}
// Polonia esquemática.
function Polonia({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -180 -120 L -60 -160 L 40 -150 L 120 -170 L 190 -120 L 200 -20 L 220 60 L 160 130 L 60 150 L -40 170 L -120 140 L -190 80 L -210 -20 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>POLONIA</text>
  </g>;
}
// Cartón de leche y cubito de queso.
function Carton({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -120 L -110 220 L 110 220 L 110 -120 L 60 -200 L -60 -200 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -110 -120 L 110 -120" stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-40} width={180} height={150} rx={14} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={40} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill="#fff">1 kg</text>
    <text x={0} y={92} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">LECHE</text>
  </g>;
}
function Cubito({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -30 L 0 -70 L 70 -30 L 0 10 Z" fill="#fffdf4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -70 -30 L -70 50 L 0 90 L 0 10 Z" fill="#efe7cf" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 70 -30 L 70 50 L 0 90 L 0 10 Z" fill="#e2d8bb" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
function BanderaIndia({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={0} x2={0} y2={160} stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={0} width={120} height={28} fill="#ff9933" stroke={KC.ink} strokeWidth={4} />
    <rect x={0} y={28} width={120} height={28} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <rect x={0} y={56} width={120} height={28} fill="#138808" stroke={KC.ink} strokeWidth={4} />
    <circle cx={60} cy={42} r={10} fill="none" stroke="#000080" strokeWidth={3} />
  </g>;
}

function Queso() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Ca: CUES.Carga, Ac: CUES.Acido, Cu: CUES.Cuajo, Su: CUES.Suero, Pr: CUES.Pregunta, Cl: CUES.Calor,
    Es: CUES.Estudio, Hi: CUES.Hipotesis, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const aprieta = kprog(T, K.G, K.G + 0.3, kEase.sale) * (1 - kprog(T, K.G + 2.4, K.G + 2.8));
  const cuajaG = kprog(T, K.G + 0.4, K.G + 3.0, kEase.sale);
  // pH: 6.6 → 4.6 durante Ácido y Cuajo
  const ph = (t) => klerp(6.6, 4.6, kprog(t, K.Ac + 0.4, K.Cu + 0.8, kEase.suave));
  const carga = 1 - kprog(T, K.Ac + 0.6, K.Cu + 0.8, kEase.suave);
  const pelo = 1 - 0.75 * kprog(T, K.Cu + 0.2, K.Cu + 1.2, kEase.suave);
  // rebote de dos micelas (se acercan y se repelen)
  const reb = (t0) => { const u = ((T - t0) % 2.2) / 2.2; return Math.abs(Math.sin(u * Math.PI)); };
  const cerca = T < K.Ac ? reb(K.Ca + 0.5) : reb(K.Ca + 0.5) * (1 - kprog(T, K.Ac + 2.5, K.Cu)) ;
  const R = krng(21);
  const muchas = Array.from({ length: 26 }, (_, i) => { const c = i % 3; const cx = [300, 700, 520][c], cy = [820, 900, 1120][c];
    return { x0: 80 + R() * 920, y0: 420 + R() * 900, x1: cx + (R() - 0.5) * 210, y1: cy + (R() - 0.5) * 170, r: 34 + R() * 18, seed: i + 3, p: R() * 6 }; });
  const junta = kprog(T, K.Cu + 1.0, K.Cu + 4.0, kEase.suave);
  const R2 = krng(8);
  const fondo = Array.from({ length: 30 }, () => [R2() * 1080, 380 + R2() * 1000, 30 + R2() * 30, R2() * 6]);
  const hs = Array.from({ length: 12 }, (_, i) => [140 + ((i * 263) % 800), K.Ac + 0.3 + i * 0.32]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: leche caliente + limón = grumos */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.12} origen="50% 52%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Olla T={T} x={540} y={1060} s={1.05} cuaja={cuajaG} />
          <Goteo T={T} x={330} y0={720} y1={850} cada={0.18} color={LIMA_IN} desde={K.G + 0.1} hasta={K.G + 2.6} r={13} />
          <Limon x={330} y={640} s={0.95} aprieta={aprieta} rot={-8} />
        </SvgCapa>
      </Escena>
      {/* 1 · micelas de caseína (por dentro de la leche) */}
      <Escena T={T} a={K.Q} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {fondo.map(([fx, fy, r, p], i) => <Micela key={i} T={T} x={fx + Math.sin(T * 0.6 + p) * 20} y={fy + Math.cos(T * 0.5 + p) * 16} r={r * kprog(T, K.Q + 0.1 + i * 0.03, K.Q + 0.6 + i * 0.03, kEase.rebote)} seed={i} signos={false} />)}
          <g opacity={kprog(T, K.Q + 1.0, K.Q + 1.4)}>
            <line x1={760} x2={880} y1={1180} y2={1180} stroke={KC.texto} strokeWidth={8} />
            <text x={820} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>≈ 200 nm</text>
          </g>
        </SvgCapa>
      </Escena>
      {/* 2–4 · carga, ácido y cuajo */}
      <Escena T={T} a={K.Ca} b={K.Su} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <g opacity={1 - kprog(T, K.Cu + 0.8, K.Cu + 1.5)}>
            <Micela T={T} x={500} y={860} r={160} carga={carga} pelo={pelo} seed={2} />
            <Micela T={T} x={klerp(150, 250, cerca)} y={1120} r={80} carga={carga} pelo={pelo} seed={5} />
            <Micela T={T} x={klerp(930, 830, cerca)} y={1120} r={80} carga={carga} pelo={pelo} seed={7} />
            {T < K.Ac + 2.5 && cerca > 0.85 && <g>
              <path d="M 400 1120 L 340 1120 M 352 1104 L 336 1120 L 352 1136" stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />
              <path d="M 680 1120 L 740 1120 M 728 1104 L 744 1120 L 728 1136" stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />
            </g>}
            {hs.map(([hx, t0], i) => { const u = kprog(T, t0, t0 + 1.4); if (u <= 0 || u >= 1) return null;
              return <HMas key={i} x={hx + Math.sin(T * 3 + i) * 10} y={klerp(380, 860 + (i % 3) * 120, u)} s={1} o={1 - kprog(u, 0.8, 1)} />; })}
          </g>
          {T > K.Cu + 0.6 && muchas.map((m, i) => <Micela key={i} T={T} x={klerp(m.x0, m.x1, junta) + Math.sin(T + m.p) * 8 * (1 - junta)} y={klerp(m.y0, m.y1, junta)} r={m.r} carga={0} pelo={0.25} seed={m.seed} o={kprog(T, K.Cu + 0.8, K.Cu + 1.5)} />)}
          {T > K.Cu + 3.6 && [[300, 820], [700, 900], [520, 1120]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={150 + Math.sin(T * 4 + i) * 6} fill="none" stroke={KC.gold2} strokeWidth={6} strokeDasharray="18 14" opacity={kprog(T, K.Cu + 3.6, K.Cu + 4.0)} />)}
        </SvgCapa>
      </Escena>
      {/* 5 · el suero escurre */}
      <Escena T={T} a={K.Su} b={K.Pr} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Coladera T={T} x={540} y={900} s={1.1} curd={kprog(T, K.Su - 0.2, K.Su + 0.5, kEase.rebote)} nivel={kprog(T, K.Su + 0.3, K.Su + 3.0)} desde={K.Su + 0.2} hasta={K.Pr + 0.4} />
        </SvgCapa>
      </Escena>
      {/* 6 · ¿para qué calentarla? */}
      <Escena T={T} a={K.Pr} b={K.Cl} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={280} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 820)`}>?</text>
          <rect x={60} y={1150} width={440} height={34} rx={10} fill="#3a3f47" stroke={KC.ink} strokeWidth={7} />
          <Llama T={T} x={280} y={1150} s={kprog(T, K.Pr + 0.1, K.Pr + 0.5, kEase.rebote) * 3} />
        </SvgCapa>
      </Escena>
      {/* 7 · el calor: 80 °C, pH 5.2 y proteínas del suero */}
      <Escena T={T} a={K.Cl} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Olla T={T} x={400} y={1080} s={0.85} cuaja={kprog(T, K.Cl + 2.4, K.Cl + 3.4)} />
          <TermoCocina x={800} y={1060} s={1} nivel={kprog(T, K.Cl + 1.4, K.Cl + 2.4, kEase.sale) * 0.8} o={kprog(T, K.Cl + 1.3, K.Cl + 1.6)} />
          {T > K.Cl + 2.0 && <text x={870} y={760} style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Cl + 2.0, K.Cl + 2.4)}>80 °C</text>}
          {T > K.Cl + 4.0 && <g opacity={kprog(T, K.Cl + 4.0, K.Cl + 4.4)}>
            <circle cx={700} cy={560} r={210} fill={KC.noche} stroke={KC.ink} strokeWidth={10} />
            <Micela T={T} x={660} y={580} r={80} carga={0.5} pelo={0.6} seed={9} />
            {Array.from({ length: 7 }, (_, i) => { const a = i * 0.9 + 0.3, u = kprog(T, K.Cl + 4.3 + i * 0.12, K.Cl + 5.3 + i * 0.12, kEase.suave);
              const px = klerp(700 + Math.cos(a) * 180, 660 + Math.cos(a) * 92, u), py = klerp(560 + Math.sin(a) * 170, 580 + Math.sin(a) * 92, u);
              return <g key={i}>{u < 0.5 ? <circle cx={px} cy={py} r={16} fill={PROT} stroke={KC.ink} strokeWidth={3} />
                : <path d={`M ${px - 22} ${py} q 11 -14 22 0 q 11 14 22 0`} stroke={PROT} strokeWidth={9} fill="none" strokeLinecap="round" />}</g>; })}
            <text x={700} y={735} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>AL MICROSCOPIO (esquema)</text>
          </g>}
          {T > K.Cl + 5.0 && <g opacity={kprog(T, K.Cl + 5.0, K.Cl + 5.4)}><Cubito x={880} y={1180} s={1.1} /><BanderaIndia x={940} y={960} s={0.8} /></g>}
        </SvgCapa>
      </Escena>
      {/* 8 · 2012, Bristol: coladeras de barro de Polonia */}
      <Escena T={T} a={K.Es} b={K.Hi} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Polonia x={300} y={1040} s={1.1} o={kprog(T, K.Es + 3.0, K.Es + 3.5)} />
          {T > K.Es + 3.3 && <circle cx={290} cy={980} r={18 + Math.sin(T * 6) * 5} fill={KC.red} stroke={KC.ink} strokeWidth={5} />}
          {T > K.Es + 2.2 && <g opacity={kprog(T, K.Es + 2.2, K.Es + 2.6)}><VasijaColadera T={T} x={790} y={1000} s={1} brillo={kprog(T, K.Es + 5.4, K.Es + 6.0)} /></g>}
        </SvgCapa>
      </Escena>
      {/* 9 · la interpretación: cuajo arriba, suero con lactosa abajo */}
      <Escena T={T} a={K.Hi} b={K.Da} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ellipse cx={540} cy={1230} rx={320} ry={70} fill={SUERO} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 5 }, (_, i) => <Lactosa key={i} x={330 + i * 105} y={1230 + Math.sin(T * 2 + i) * 10} s={0.8} rot={T * 30 + i * 40} o={kprog(T, K.Hi + 1.5 + i * 0.2, K.Hi + 2.0 + i * 0.2)} />)}
          {[-90, -30, 30, 90].map((dx, i) => <Goteo key={i} T={T} x={540 + dx} y0={1000} y1={1200} cada={0.5} color={SUERO} desde={K.Hi + 0.3 + i * 0.12} hasta={K.Da} r={11} />)}
          <VasijaColadera T={T} x={540} y={850} s={1.05} />
          {[[-80, -60, 60], [10, -80, 70], [90, -55, 55]].map(([dx, dy, r], i) => <circle key={i} cx={540 + dx} cy={850 - 160 + dy * 0.4 + Math.sin(T * 2 + i) * 2} r={r * kprog(T, K.Hi + 0.2, K.Hi + 0.8, kEase.rebote)} fill="#fffdf4" stroke="#bdb79a" strokeWidth={4} />)}
        </SvgCapa>
      </Escena>
      {/* 10 · 1 kg de leche → ≈ 170 g de paneer */}
      <Escena T={T} a={K.Da} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Carton x={820} y={760} s={kprog(T, K.Da, K.Da + 0.4, kEase.rebote) * 0.9} />
          {T > K.Da + 1.0 && <path d={`M 820 990 L 820 ${klerp(990, 1060, kprog(T, K.Da + 1.0, K.Da + 1.4))}`} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />}
          {T > K.Da + 1.4 && <g><path d="M 796 1040 L 820 1068 L 844 1040" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <Cubito x={820} y={1150} s={kprog(T, K.Da + 1.4, K.Da + 1.9, kEase.rebote) * 0.7} /></g>}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Da + 1.6} until={K.Ci - 0.3} valor={170} desde={0} dur={1.0} prefijo="≈ " sufijo=" g" x={540} y={420} tam={180} color={KC.yellow} />
      </Escena>
      {/* 11 · cierre: la misma olla, ya con su queso */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="50% 52%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Olla T={T} x={540} y={1060} s={1.05} cuaja={1} vapor={0.4} queso={kprog(T, K.Ci + 0.2, K.Ci + 1.0, kEase.sale)} fuego={1 - kprog(T, K.Ci, K.Ci + 0.6)} />
          <Limon x={330} y={640} s={0.95} aprieta={0} rot={-8} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.8} texto="¿se echó a perder?" x={330} y={430} tam={44} />
      <Chip T={T} at={K.G + 2.9} until={K.Q - 0.3} texto="¡es QUESO!" x={330} y={430} tam={56} borde={KC.mint} />
      <Cronometro T={T} at={K.G + 0.05} until={K.Q - 0.3} x={540} y={1500} etiqueta="EXPERIMENTO · LECHE + LIMÓN" />
      <Medidor T={T} at={K.Q + 1.6} until={K.Ca - 0.3} valor={(t) => 0.8 * kprog(t, K.Q + 1.8, K.Q + 3.0, kEase.sale)} etiqueta="proteínas de la leche de vaca" texto={(v) => 'caseína ' + Math.round(v * 100) + ' %'} x={90} y={1460} color={KC.gold2} />
      <Etq T={T} at={K.Q + 3.4} until={K.Ca - 0.3} x={600} y={740} texto="micelas de caseína" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ca + 0.4} until={K.Ac - 0.2} x={720} y={640} texto="κ-caseína («pelitos»)" tam={32} color="#ffe7a6" />
      <Chip T={T} at={K.Ca + 1.2} until={K.Ac - 0.2} texto="carga − · se repelen" y={1500} tam={44} borde={AZUL_NEG} />
      <Etq T={T} at={K.Ac + 0.4} until={K.Cu - 0.2} x={40} y={430} texto="ácido cítrico · limón" tam={32} color={KC.orange} />
      <Etq T={T} at={K.Ac + 2.2} until={K.Cu - 0.2} x={40} y={490} texto="ácido acético · vinagre" tam={32} color={KC.orange} />
      <MedidorPH T={T} at={K.Ac + 0.3} until={K.Su - 0.3} valor={ph} y={1500} />
      <Etq T={T} at={K.Cu + 3.8} until={K.Su - 0.3} x={680} y={1240} texto="cuajos" tam={40} color={KC.gold2} />
      <Etq T={T} at={K.Su + 0.6} until={K.Pr - 0.2} x={880} y={690} texto="cuajo" lado="izq" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Su + 1.4} until={K.Pr - 0.2} x={880} y={1130} texto="suero + lactosa" lado="izq" tam={36} color={KC.ink} />
      <Onomato T={T} at={K.Pr + 0.1} until={K.Cl - 0.2} x={300} y={1080} texto="¡fssh!" color={KC.cyan} tam={80} />
      <Chip T={T} at={K.Cl + 1.6} until={K.Cl + 3.0} texto="¡cuidado: quema!" x={400} y={680} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Cl + 2.4} until={K.Es - 0.3} texto="frío: pH ≈ 4.6 · caliente: desde 5.2" y={1500} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Cl + 4.6} until={K.Es - 0.3} x={480} y={400} texto="proteínas del suero" lado="der" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Cl + 5.2} until={K.Es - 0.3} x={820} y={1280} texto="paneer" lado="izq" tam={40} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2012" quien="Universidad de Bristol" revista="Nature · Salque et al." y={600} />
      <Chip T={T} at={K.Es + 3.2} until={K.Hi - 0.3} texto="coladeras de barro · ≈ 7 000 años" y={1500} tam={38} borde={BARRO} />
      <Etq T={T} at={K.Es + 5.6} until={K.Hi - 0.3} x={640} y={760} texto="grasa de leche" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.6} until={K.Da - 0.3} texto="hipótesis de los autores" y={1500} tam={40} borde={KC.lilac} />
      <Etq T={T} at={K.Hi + 0.9} until={K.Da - 0.3} x={680} y={560} texto="cuajo" tam={38} color={KC.ink} />
      <Etq T={T} at={K.Hi + 1.6} until={K.Da - 0.3} x={880} y={1150} texto="suero con lactosa" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Da + 2.0} until={K.Ci - 0.3} texto="1 kg de leche de vaca → ≈ 170 g de paneer" y={1500} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="caseína + ácido + calor → queso" y={1500} tam={40} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No se echó a perder: *es queso.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Ca - 0.1} texto="Caseína en *micelas.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Ac - 0.1} texto="Carga negativa: *se repelen.*" />
      <Subtitulo T={T} idx={3} at={K.Ac + 0.1} until={K.Cu - 0.1} texto="El ácido *les quita carga.*" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.Su - 0.1} texto="pH 4.6: *se pegan.*" />
      <Subtitulo T={T} idx={5} at={K.Su + 0.1} until={K.Pr - 0.1} texto="El suero *lleva lactosa.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Cl - 0.1} texto="¿Para qué *calentarla?*" />
      <Subtitulo T={T} idx={7} at={K.Cl + 0.1} until={K.Es - 0.1} texto="Caliente cuaja *desde pH 5.2.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Hi - 0.1} texto="Coladeras con *grasa de leche.*" />
      <Subtitulo T={T} idx={9} at={K.Hi + 0.1} until={K.Da - 0.1} texto="Quesos con *menos lactosa.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.Ci - 0.1} texto="1 kg → *170 gramos.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El limón *la hizo queso.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Carga - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Acido + 0.6, CUES.Cuajo - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cuajo + 1.5, CUES.Suero + 3.5, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Calor + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Calor + 2.0, CUES.Estudio - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Estudio + 3.4, CUES.Hipotesis - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Hipotesis + 0.4, CUES.Dato - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Dato + 0.2, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="42" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function QuesoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Queso /></CompositionStage></div>;
}
window.QuesoApp = QuesoApp;
