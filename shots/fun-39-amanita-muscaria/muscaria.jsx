// Shot Fungi Mati #39 · Los puntos del hongo de los cuentos son un cascarón roto: Amanita muscaria — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico: no se come.

// Unidades del dibujo: 32 u = 1 cm (sombrero adulto 320 u ≈ 10 cm; Kuo: 5–25 cm).
const MU_CM = 32;
const MU_ROJO = '#e3262b', MU_GUESS = '#f3a22b', MU_PIE = '#f6f2e6', MU_VELO = '#fbfaf3';
// Verrugas (restos del velo universal): posición fija sobre el sombrero; su tamaño NO crece con el sombrero (el velo no crece).
const MU_VERRUGAS = (() => { const r = krng(39); return Array.from({ length: 34 }, () => ({ u: (r() * 2 - 1) * 0.86, v: 0.22 + Math.sqrt(r()) * 0.7, k: 0.75 + r() * 0.5 })); })();
function muBez(p0, c, p1, s) { const q = 1 - s; return [q * q * p0[0] + 2 * q * s * c[0] + s * s * p1[0], q * q * p0[1] + 2 * q * s * c[1] + s * s * p1[1]]; }
// punto (u, v) sobre la cara del sombrero: u = -1..1 de lado a lado, v = 0 (borde de abajo) .. 1 (contorno de arriba).
function muPunto(a, hc, u, v) {
  const P = muBez(u < 0 ? [-a / 2, 0] : [0, -hc], u < 0 ? [-a / 2, -hc * 1.15] : [a / 2, -hc * 1.15], u < 0 ? [0, -hc] : [a / 2, 0], u < 0 ? 1 + u : u);
  const ytop = P[1] + 8;
  return [P[0] * 0.92, klerp(-hc * 0.08, ytop, v)];
}

// Amanita muscaria de perfil. g 0..1: botón envuelto en el velo universal (huevo) → adulto.
// Morfología (Kuo; Morrow): sombrero rojo con verrugas blancas, láminas blancas, pie blanco con anillo alto tipo faldita
// (velo parcial) y bulbo en la base con bandas del velo universal.
// lava = { t0, t1, frac }: la lluvia tumba verrugas entre t0 y t1 (frac = fracción que se cae).
function Muscaria({ T = 0, x, y, s = 1, g = 1, color = MU_ROJO, mece: m = 0, lava, brillo = 0, grietas = 0, cascaron = 1 }) {
  const e = kEase.sale(kclamp(g, 0, 1));
  const a = klerp(118, 320, e);
  const hc = klerp(104, 98, e);
  const gs = kclamp((g - 0.3) / 0.7, 0, 1);
  const H = klerp(72, 330, kEase.sale(gs));
  const bR = klerp(60, 56, e);
  const conCasc = cascaron * (1 - kprog(g, 0.16, 0.36));
  const rot = m * mece(T, 39, 0.4) * 2.5;
  const N = MU_VERRUGAS.length;
  const verr = MU_VERRUGAS.map((v, i) => {
    let caeT = null;
    if (lava) { const ti = lava.t0 + (i / N) / lava.frac * (lava.t1 - lava.t0); if (i / N < lava.frac && T >= ti) caeT = T - ti; }
    const [px, py] = muPunto(a, hc, v.u, v.v);
    const r = 11 * v.k * klerp(1.7, 1, e);
    if (caeT != null) {
      if (caeT > 0.8) return null;
      return <g key={i} transform={`translate(${px + caeT * 60 * v.u} ${py + 1400 * caeT * caeT})`} opacity={1 - caeT / 0.8}><circle r={r} fill={MU_VELO} stroke={KC.ink} strokeWidth={3} /></g>;
    }
    return <g key={i} transform={`translate(${px} ${py})`}>
      {brillo > 0 && <circle r={r + 7} fill="none" stroke={KC.gold2} strokeWidth={5} opacity={brillo} />}
      <path d={`M ${-r} ${r * 0.55} L ${-r * 0.35} ${-r * 0.8} L ${r * 0.35} ${-r * 0.8} L ${r} ${r * 0.55} Z`} fill={MU_VELO} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${r * 0.1} ${-r * 0.7} L ${r * 0.85} ${r * 0.45}`} stroke="#d9d3c2" strokeWidth={3} />
    </g>;
  });
  const yr = -H * 0.84, an = kprog(gs, 0.45, 0.75);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    {/* bulbo con bandas del velo universal */}
    <ellipse cx={0} cy={-bR * 0.62} rx={bR} ry={bR * 0.68} fill={MU_PIE} stroke={KC.ink} strokeWidth={6} />
    {g > 0.25 && [0, 1, 2].map((k) => <path key={k} d={`M ${-bR * 0.92 + k * 6} ${-bR * 0.78 - k * 13} Q 0 ${-bR * 0.55 - k * 13} ${bR * 0.92 - k * 6} ${-bR * 0.78 - k * 13}`} stroke={KC.ink} strokeWidth={4} fill="none" opacity={kprog(g, 0.25, 0.5)} />)}
    {/* pie */}
    <path d={`M -24 ${-bR * 1.05} L -17 ${-H} L 17 ${-H} L 24 ${-bR * 1.05} Z`} fill={MU_PIE} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* anillo alto, tipo faldita (velo parcial) */}
    {an > 0 && <g opacity={an}>
      <path d={`M -18 ${yr} Q -50 ${yr + 26} -46 ${yr + 50} Q -24 ${yr + 42} 0 ${yr + 48} Q 24 ${yr + 42} 46 ${yr + 50} Q 50 ${yr + 26} 18 ${yr} Z`} fill={MU_PIE} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      {[-26, -10, 8, 26].map((dx, i) => <line key={i} x1={dx * 0.6} y1={yr + 10} x2={dx} y2={yr + 42} stroke="#cfc7b2" strokeWidth={3} />)}
    </g>}
    {/* láminas blancas y sombrero */}
    <g transform={`translate(0 ${-H})`}>
      <path d={`M ${-a / 2 + 6} 2 Q 0 ${a * 0.1} ${a / 2 - 6} 2`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={`M ${-a / 2 + 6} 2 Q 0 ${a * 0.1} ${a / 2 - 6} 2`} stroke="#fffdf6" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d={`M ${-a / 2} 0 Q ${-a / 2} ${-hc * 1.15} 0 ${-hc} Q ${a / 2} ${-hc * 1.15} ${a / 2} 0 Q 0 ${a * 0.07} ${-a / 2} 0 Z`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${-a * 0.32} ${-hc * 0.72} Q ${-a * 0.1} ${-hc * 0.98} ${a * 0.12} ${-hc * 0.92}`} stroke="rgba(255,255,255,.35)" strokeWidth={10} fill="none" strokeLinecap="round" />
      {verr}
    </g>
    {/* cascarón: el velo universal entero que envuelve al botón */}
    {conCasc > 0 && <g opacity={conCasc}>
      <ellipse cx={0} cy={-(H + hc) / 2 - 6} rx={a * 0.62} ry={(H + hc) / 2 + 12} fill={MU_VELO} stroke={KC.ink} strokeWidth={6} />
      <path d={`M ${-a * 0.3} ${-(H + hc) * 0.85} Q ${-a * 0.45} ${-(H + hc) * 0.6} ${-a * 0.36} ${-(H + hc) * 0.4}`} stroke="#e4ddca" strokeWidth={8} fill="none" strokeLinecap="round" />
      {grietas > 0 && [[-0.35, 0.95, 0.1, 0.7], [0.3, 0.98, -0.05, 0.62], [-0.55, 0.62, -0.1, 0.48], [0.5, 0.55, 0.15, 0.4]].map(([x0, y0, x1, y1], i) =>
        <path key={i} d={`M ${a * x0} ${-(H + hc) * y0} L ${a * klerp(x0, x1, 0.5) + 10} ${-(H + hc) * klerp(y0, y1, 0.5)} L ${a * x1} ${-(H + hc) * y1}`} stroke={KC.ink} strokeWidth={5} fill="none"
          strokeDasharray={`${300 * kclamp(grietas * 1.4 - i * 0.12, 0, 1)} 400`} strokeLinecap="round" />)}
    </g>}
  </g>;
}
// Hongo gris genérico (el que el señor conocía de su país): silueta sin detalles.
function HongoSilueta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -22 0 L -16 -300 L 16 -300 L 22 0 Z" fill="#c9c4bb" stroke={KC.ink} strokeWidth={6} />
    <path d="M -150 -300 Q -150 -410 0 -420 Q 150 -410 150 -300 Q 0 -280 -150 -300 Z" fill="#a9a39a" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-330} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>?</text>
  </g>;
}
function Pasto({ T, y = 1180, color = '#3fae4a' }) {
  return <>
    <rect x={-20} y={y} width={KW + 40} height={KH - y + 20} fill="#5b3a22" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 26 }, (_, i) => { const x = 10 + i * 42, h = 36 + (i * 37) % 30, b = mece(T, i + 3, 0.6) * 6;
      return <path key={i} d={`M ${x - 10} ${y + 4} Q ${x + b} ${y - h} ${x + 4 + b * 1.5} ${y - h - 6} Q ${x + 2} ${y - h * 0.5} ${x + 12} ${y + 4} Z`} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />; })}
  </>;
}
// Árbol de encino esquemático.
function Encino({ x, y, s = 1, T = 0 }) {
  const b = mece(T, 7, 0.3) * 2;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${b})`}>
    <path d="M -18 0 L -12 -170 L 12 -170 L 18 0 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    {[[-70, -220, 80], [60, -230, 85], [0, -300, 95], [-10, -200, 70]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? '#4fb34a' : '#3a9a3e'} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Molécula esquemática (anillo de 5 + cola): iboténico (dorado) o muscimol (cian).
function Mol({ x, y, s = 1, rot = 0, color = KC.gold2 }) {
  const pts = Array.from({ length: 5 }, (_, i) => { const t = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${Math.cos(t) * 22},${Math.sin(t) * 22}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <polygon points={pts} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 20 8 L 46 18 L 60 4" stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Olla con caldo (sin cuchara).
function OllaM({ T, x, y, s = 1, fuego = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fuego > 0 && [-120, -40, 40, 120].map((dx, i) => <path key={i} d={`M ${dx - 30} 150 Q ${dx} ${80 - 30 * Math.abs(Math.sin(T * 7 + i))} ${dx + 30} 150 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={fuego} />)}
    <path d="M -260 -60 L 260 -60 L 230 140 Q 0 170 -230 140 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={9} />
    <rect x={-290} y={-80} width={580} height={36} rx={14} fill="#b8c0c8" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-60} rx={250} ry={34} fill="#e8d3a8" stroke={KC.ink} strokeWidth={6} />
    {[[-120, -64], [-10, -58], [100, -64]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy + Math.sin(T * 3 + i) * 4} rx={44} ry={16} fill={MU_ROJO} stroke={KC.ink} strokeWidth={5} />)}
    {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.6 + i / 6) % 1); return <circle key={i} cx={-200 + i * 80} cy={-100 - u * 160} r={18 + u * 20} fill="#fff" opacity={(1 - u) * 0.6} />; })}
  </g>;
}
// Sello largo (una palabra) que cae con golpe.
function SelloLargo({ T, at, x, y, texto, color = KC.red, rot = -10 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-250} y={-70} width={500} height={140} rx={30} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={14} />
    <text y={34} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}
// Mosca esquemática. mareo 0..1 = espiral encima.
function Mosca({ T, x, y, s = 1, rot = 0, mareo = 0, aleteo = 1 }) {
  const w = aleteo ? Math.sin(T * 60) * 0.5 + 0.5 : 0.2;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={-6} cy={-24} rx={22} ry={12 + w * 6} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform="rotate(-30 -6 -24)" />
    <ellipse cx={10} cy={-24} rx={22} ry={12 + w * 6} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform="rotate(30 10 -24)" />
    <ellipse cx={0} cy={0} rx={26} ry={16} fill="#2a2a2e" stroke={KC.ink} strokeWidth={3} />
    <circle cx={26} cy={-2} r={12} fill="#2a2a2e" stroke={KC.ink} strokeWidth={3} />
    <circle cx={31} cy={-6} r={6} fill="#c0392b" />
    {mareo > 0 && <path d="M 0 -60 m -16 0 a 16 10 0 1 1 32 0 a 12 7 0 1 1 -24 0 a 8 4 0 1 1 16 0" stroke={KC.ink} strokeWidth={4} fill="none" opacity={mareo} transform={`rotate(${T * 200} 0 -60)`} />}
  </g>;
}
// Barra de escala que sigue la escala del dibujo (cm reales del hongo).
function EscalaHongo({ T, at, until, s, cm = 5 }) { return <BarraEscala T={T} at={at} until={until} texto={`${kformato(cm)} cm`} largo={MU_CM * cm * s} />; }

function MuscariaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Hu: CUES.Huevo, Gl: CUES.Globo, B: CUES.Base, L: CUES.Lluvia, Mx: CUES.Mexico, R: CUES.Raices, P: CUES.Pregunta, Tx: CUES.Toxinas, E: CUES.Estudio, Re: CUES.Respirador, Mo: CUES.Moscas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const S0 = 1.25;                                   // escala del hongo en el gancho y el cierre
  const gG = klerp(0.82, 1, kprog(T, K.G, K.G + 0.6, kEase.rebote));     // el hongo "brota" en el cuadro 0
  const gHu = 1 - kprog(T, K.Hu + 0.1, K.Hu + 1.3, kEase.suave);        // se rebobina hasta el botón
  const gGl = kprog(T, K.Gl + 0.3, K.Gl + 4.3, kEase.suave);             // el sombrero se infla y el velo se rompe
  const sGl = klerp(2.3, 1.35, kprog(T, K.Gl + 0.3, K.Gl + 4.3, kEase.suave));
  const lupaG = kprog(T, K.G + 1.3, K.G + 1.8, kEase.sale);
  const cocina = K.Tx + 3.6;
  // Oaxaca (Ixtlán de Juárez) en el mapa
  const MAPA = { x: 40, y: 430 }, [ox, oy] = mxProy(-96.49, 17.33);
  const OAX = [MAPA.x + ox, MAPA.y + oy];
  const MOSCAS = [[200, 420, 0], [820, 380, 1], [520, 330, 2], [300, 720, 3], [760, 680, 4]];
  const PLATO = [[380, 1040], [470, 1060], [560, 1035], [640, 1060], [450, 1020]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el hongo de los cuentos y la lupa sobre un punto */}
      <Escena T={T} a={K.G} b={K.Hu} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={440} y={1190} s={S0} g={gG} mece={1} />
          {lupaG > 0 && <g opacity={lupaG}>
            <line x1={360} y1={640} x2={250} y2={560} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            <circle cx={366} cy={648} r={22} fill="none" stroke={KC.ink} strokeWidth={6} />
            <g transform={`translate(200 470) scale(${lupaG})`}>
              <circle r={130} fill={MU_ROJO} stroke={KC.ink} strokeWidth={10} />
              <clipPath id="clupa"><circle r={124} /></clipPath>
              <g clipPath="url(#clupa)">
                <rect x={-140} y={30} width={280} height={120} fill="#b81d22" />
                <path d="M -70 34 L -32 -52 L 30 -58 L 74 34 Z" fill={MU_VELO} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
                <path d="M 26 -54 L 70 32" stroke="#d9d3c2" strokeWidth={8} />
                <path d="M -50 36 Q 0 50 60 36" stroke="rgba(0,0,0,.35)" strokeWidth={8} fill="none" />
              </g>
              <circle r={130} fill="none" stroke={KC.white} strokeWidth={6} opacity=".6" />
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 1 · se rebobina: de joven es un botón envuelto en el velo universal */}
      <Escena T={T} a={K.Hu} b={K.Gl} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={420} y={1190} s={klerp(S0, 2.3, kprog(T, K.Hu + 0.6, K.Hu + 1.8, kEase.suave))} g={gHu} cascaron={kprog(T, K.Hu + 0.7, K.Hu + 1.4)} />
        </>)}
      </Escena>
      {/* 2 · POR DENTRO: el sombrero se infla como globo y el velo, que no crece, se rompe */}
      <Escena T={T} a={K.Gl} b={K.B} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={440} y={1190} s={sGl} g={gGl} grietas={kprog(T, K.Gl, K.Gl + 0.9)} />
        </>)}
      </Escena>
      {/* 3 · arriba quedan las verrugas; abajo, las bandas en el bulbo */}
      <Escena T={T} a={K.B} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={440} y={1190} s={1.35} g={1} mece={1} />
          
        </>)}
      </Escena>
      {/* 4 · la lluvia lava las verrugas */}
      <Escena T={T} a={K.L} b={K.Mx} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {Array.from({ length: 40 }, (_, i) => { const u = ((T * 1.6 + i * 0.137) % 1); const x = (i * 97) % KW; return <line key={i} x1={x - 10} y1={-80 + u * 1400} x2={x - 22} y2={-20 + u * 1400} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity=".8" />; })}
          <Pasto T={T} />
          <Muscaria T={T} x={440} y={1190} s={1.35} g={1} lava={{ t0: K.L + 0.3, t1: K.L + 3.0, frac: 0.95 }} />
        </>)}
      </Escena>
      {/* 5 · México: bosques de pino y encino (Ixtlán de Juárez, Oaxaca) */}
      <Escena T={T} a={K.Mx} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <MapaMexico x={MAPA.x} y={MAPA.y} ancho={1000} conCA={false} />
          {(() => { const p = kprog(T, K.Mx + 0.6, K.Mx + 1.1, kEase.rebote); return p > 0 && <g transform={`translate(${OAX[0]} ${OAX[1]}) scale(${p})`}>
            <circle r={30 + 8 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={6} />
            <circle r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>; })()}
          {kprog(T, K.Mx + 1.4, K.Mx + 1.9) > 0 && <g opacity={kprog(T, K.Mx + 1.4, K.Mx + 1.9)}>
            <Conifera x={700} y={1200} s={0.26} T={T} seed={2} />
            <Encino x={850} y={1200} s={0.3} T={T} />
            <Conifera x={990} y={1200} s={0.22} T={T} seed={5} />
            <Muscaria T={T} x={780} y={1202} s={0.2} g={kprog(T, K.Mx + 1.8, K.Mx + 2.6)} />
            <Muscaria T={T} x={930} y={1202} s={0.17} g={kprog(T, K.Mx + 2.0, K.Mx + 2.8)} />
          </g>}
        </>)}
      </Escena>
      {/* 6 · bajo tierra (al microscopio): las hifas envuelven la raíz e intercambian */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <path d="M -40 640 Q 300 700 520 860 Q 700 990 760 1180" stroke="#8a5a2e" strokeWidth={250} fill="none" strokeLinecap="round" />
          <path d="M -40 640 Q 300 700 520 860 Q 700 990 760 1180" stroke="#b47a42" strokeWidth={170} fill="none" strokeLinecap="round" />
          <path d="M -40 640 Q 300 700 520 860 Q 700 990 760 1180" stroke={FK.hifa} strokeWidth={250} fill="none" strokeLinecap="round" strokeDasharray="6 14" opacity={kprog(T, K.R + 0.2, K.R + 1.2)} />
          <RedHifas T={T} x={760} y={1180} g={kprog(T, K.R, K.R + 2.2)} seed={8} n={260} escala={0.55} ancho={3} brillo={0.6} />
          <RedHifas T={T} x={230} y={680} g={kprog(T, K.R + 0.3, K.R + 2.5)} seed={4} n={200} escala={0.45} ancho={3} brillo={0.6} rot={180} />
          {Array.from({ length: 8 }, (_, i) => { const u = ((T - K.R - 1.4) * 0.5 + i / 8) % 1; if (T < K.R + 1.4) return null;
            return <g key={i}>
              <circle cx={klerp(980, 600, u)} cy={klerp(1250, 980, u) + Math.sin(i) * 40} r={12} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />
              <rect x={klerp(470, 820, u) - 11} y={klerp(840, 560, u) - 11 + Math.cos(i) * 30} width={22} height={22} rx={5} fill={KC.pink} stroke={KC.ink} strokeWidth={3} transform={`rotate(45 ${klerp(470, 820, u)} ${klerp(840, 560, u) + Math.cos(i) * 30})`} />
            </g>; })}
        </>)}
      </Escena>
      {/* 7 · ¿es venenoso? */}
      <Escena T={T} a={K.P} b={K.Tx} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={290} y={1060} /><SelloLargo T={T} at={K.P + 0.75} x={330} y={430} texto="VENENOSO" /></>)}
      </Escena>
      {/* 8 · en la sinapsis: iboténico (≈ glutamato) excita; muscimol (≈ GABA) frena. Luego, la olla. */}
      <Escena T={T} a={K.Tx} b={cocina} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <path d="M 220 520 L 220 600 Q 220 700 540 700 Q 860 700 860 600 L 860 520" fill="#5a3f8f" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={320 + i * 75} cy={620 + (i % 2) * 26} r={18} fill="#8f6fd0" stroke={KC.ink} strokeWidth={3} />)}
          {(() => { const exc = kprog(T, K.Tx + 0.9, K.Tx + 1.3) * (1 - kprog(T, K.Tx + 2.1, K.Tx + 2.5)), fr = kprog(T, K.Tx + 2.3, K.Tx + 2.8);
            const col = mixHex(mixHex('#3b4a6b', '#ffd34d', exc * (0.6 + 0.4 * Math.abs(Math.sin(T * 14)))), '#24304a', fr);
            return <>
              <path d="M 180 1040 L 180 900 Q 180 790 540 790 Q 900 790 900 900 L 900 1040 Z" fill={col} stroke={KC.ink} strokeWidth={8} />
              {[300, 420, 540, 660, 780].map((rx, i) => <path key={i} d={`M ${rx - 28} 792 L ${rx - 28} 770 Q ${rx} 800 ${rx + 28} 770 L ${rx + 28} 792`} fill="#c7d0e6" stroke={KC.ink} strokeWidth={4} />)}
              {exc > 0.2 && Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${300 + i * 95} 900 l 20 40 l -16 4 l 22 46`} stroke={KC.yellow} strokeWidth={6} fill="none" opacity={exc * (0.5 + 0.5 * Math.sin(T * 20 + i))} />)}
            </>; })()}
          {[300, 420, 540].map((rx, i) => { const p = kprog(T, K.Tx + 0.4 + i * 0.15, K.Tx + 1.0 + i * 0.15, kEase.sale); return p > 0 && <Mol key={'i' + i} x={klerp(100, rx, p)} y={klerp(720, 752, p)} rot={(1 - p) * 200} color={KC.gold2} />; })}
          {[660, 780].map((rx, i) => { const p = kprog(T, K.Tx + 2.0 + i * 0.15, K.Tx + 2.6 + i * 0.15, kEase.sale); return p > 0 && <Mol key={'m' + i} x={klerp(1000, rx, p)} y={klerp(720, 752, p)} rot={(1 - p) * -200} color={KC.cyan} />; })}
        </>)}
      </Escena>
      <Escena T={T} a={cocina} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <OllaM T={T} x={460} y={1000} s={1.0} />
          {[[320, 900], [560, 930], [430, 960]].map(([x, y], i) => { const p = kprog(T, cocina + 0.5 + i * 0.2, cocina + 0.8 + i * 0.2, kEase.rebote); return p > 0 && <Mol key={i} x={x} y={y + Math.sin(T * 2 + i) * 8} s={p * 1.3} rot={T * 30 + i * 50} color={i === 1 ? KC.cyan : KC.gold2} />; })}
        </>)}
      </Escena>
      {/* 9 · el caso de Minnesota, 2018: A. muscaria var. guessowii (amarillo-naranja) ≠ el hongo que él conocía */}
      <Escena T={T} a={K.E} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={300} y={1190} s={0.95} g={kprog(T, K.E + 0.8, K.E + 1.8)} color={MU_GUESS} mece={1} />
          {T > K.E + 2.0 && <g opacity={kprog(T, K.E + 2.0, K.E + 2.4)}>
            <HongoSilueta x={790} y={1190} s={0.95} />
            <text x={545} y={900} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={8}>≠</text>
          </g>}
        </>)}
      </Escena>
      {/* 10 · horas después: síntomas, 4 días con respirador, se recuperó */}
      <Escena T={T} a={K.Re} b={K.Mo} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={120} y={960} width={620} height={60} rx={20} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
          <rect x={140} y={1020} width={20} height={150} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} /><rect x={700} y={1020} width={20} height={150} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
          <rect x={150} y={910} width={150} height={60} rx={24} fill="#e6f3ff" stroke={KC.ink} strokeWidth={6} />
          <path d="M 260 960 Q 280 900 420 905 L 700 915 Q 720 935 700 960 Z" fill="#8fb6ff" stroke={KC.ink} strokeWidth={6} />
          <circle cx={240} cy={895} r={44} fill="#e8b48f" stroke={KC.ink} strokeWidth={6} />
          <rect x={800} y={760} width={190} height={260} rx={18} fill="#d7dde6" stroke={KC.ink} strokeWidth={7} />
          <rect x={820} y={785} width={150} height={100} rx={10} fill="#0d1424" stroke={KC.ink} strokeWidth={4} />
          <path d={`M 828 ${840} ${Array.from({ length: 14 }, (_, i) => `L ${830 + i * 10} ${840 - 28 * Math.max(0, Math.sin(T * 5 - i * 0.6))}`).join(' ')}`} stroke={KC.mint} strokeWidth={4} fill="none" />
          <path d="M 800 950 Q 600 1060 420 990 Q 300 950 262 905" stroke="#cfe8ff" strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M 800 950 Q 600 1060 420 990 Q 300 950 262 905" stroke={KC.ink} strokeWidth={3} fill="none" strokeDasharray="10 12" strokeDashoffset={-T * 30} />
        </>)}
      </Escena>
      {/* 11 · las moscas: hongo en leche para atontarlas */}
      <Escena T={T} a={K.Mo} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={500} cy={1070} rx={330} ry={90} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={500} cy={1055} rx={270} ry={62} fill="#fbf6e9" stroke="#d8cfba" strokeWidth={4} />
          {PLATO.map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}><path d="M -34 8 Q -30 -20 0 -22 Q 30 -20 34 8 Z" fill={MU_ROJO} stroke={KC.ink} strokeWidth={4} /><circle cx={-8} cy={-8} r={5} fill={MU_VELO} /><circle cx={12} cy={-4} r={4} fill={MU_VELO} /></g>)}
          {MOSCAS.map(([x0, y0, k], i) => { const p = kprog(T, K.Mo + 0.3 + k * 0.25, K.Mo + 1.6 + k * 0.25, kEase.suave); const [px, py] = PLATO[i];
            const x = klerp(x0, px + 10, p) + (1 - p) * 60 * Math.sin(T * 4 + k), y = klerp(y0, py - 26, p) + (1 - p) * 40 * Math.cos(T * 5 + k);
            const mar = kprog(T, K.Mo + 1.9 + k * 0.2, K.Mo + 2.4 + k * 0.2);
            return <Mosca key={i} T={T} x={x} y={y} s={1.1} rot={mar * (20 + 10 * Math.sin(T * 3 + k))} mareo={mar} aleteo={p < 1} />; })}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo hongo del inicio; los puntos ya son pedazos del velo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Muscaria T={T} x={440} y={1190} s={S0} g={1} mece={1} brillo={kprog(T, K.C + 0.5, K.C + 1.0) * (0.6 + 0.4 * Math.sin(T * 5))} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 2.6} until={K.G + 3.3} texto="¿manchas?" x={360} y={350} tam={48} />
      <Chip T={T} at={K.G + 3.0} until={K.Hu - 0.3} texto="pedazos de su velo" x={360} y={350} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Hu + 1.6} until={K.Gl - 0.3} x={60} y={430} texto="Amanita muscaria" it tam={42} color={KC.ink} />
      <Etq T={T} at={K.Hu + 2.2} until={K.Gl - 0.3} x={60} y={490} texto="botón: hongo joven" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Hu + 2.6} until={K.Gl - 0.3} x={640} y={900} texto="velo universal" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Gl + 0.2} until={K.B - 0.3} texto="POR DENTRO · el velo no crece" x={400} y={420} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.4} until={K.L - 0.3} x={60} y={510} texto="verrugas: pedazos del velo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.B + 1.6} until={K.L - 0.3} x={1030} y={1115} texto="bandas del velo en el bulbo" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.L + 1.2} until={K.Mx - 0.3} texto="ojo: sin puntos se confunde con otros hongos" x={540} y={420} tam={27} borde={KC.red} />
      <Etq T={T} at={K.Mx + 0.8} until={K.R - 0.3} x={OAX[0] - 40} y={OAX[1] - 60} texto="Ixtlán de Juárez, Oax." lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Mx + 1.4} until={K.R - 0.3} x={40} y={1010} texto="Amanita muscaria var. flavivolvata" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.Mx + 1.9} until={K.R - 0.3} texto="bosque de pino y encino" x={300} y={1110} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.R + 0.2} until={K.P - 0.3} texto="AL MICROSCOPIO · raíz de pino" x={420} y={420} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={K.R + 1.0} until={K.P - 0.3} x={40} y={520} texto="hifas del hongo" tam={34} color={FK.hifa} />
      <Etq T={T} at={K.R + 1.6} until={K.P - 0.3} x={1030} y={1170} texto="nutrientes → árbol" lado="izq" tam={34} color={KC.mint} />
      <Etq T={T} at={K.R + 2.0} until={K.P - 0.3} x={40} y={1110} texto="azúcares → hongo" tam={34} color={KC.pink} />
      <Chip T={T} at={K.Tx + 0.2} until={cocina - 0.3} texto="AL MICROSCOPIO · sinapsis" x={400} y={420} tam={32} borde={KC.lilac} mono />
      <Etq T={T} at={K.Tx + 0.8} until={K.Tx + 2.0} x={40} y={1110} texto="ácido iboténico ≈ glutamato → excita" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Tx + 2.2} until={cocina - 0.3} x={40} y={1110} texto="muscimol ≈ GABA → frena" tam={30} color={KC.cyan} />
      <Chip T={T} at={cocina + 0.6} until={K.E - 0.3} texto="cocinado ≠ seguro" x={400} y={460} tam={44} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="2018" quien="Minnesota, EUA" revista="MMWR (CDC), 2019" y={540} />
      <Etq T={T} at={K.E + 2.5} until={K.Re - 0.3} x={40} y={680} texto="A. muscaria var. guessowii" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 2.5} until={K.Re - 0.3} x={1040} y={760} texto="el que él conocía" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Re + 0.2} until={K.Mo - 0.3} texto="2–3 h después de comer" x={330} y={400} tam={32} borde={KC.ink} mono />
      {['vómito', 'sudor', 'confusión'].map((t, i) => <Chip key={i} T={T} at={K.Re + 0.6 + i * 0.35} until={K.Re + 2.3} texto={t} x={180 + i * 200} y={520} tam={34} borde={KC.red} />)}
      {T < K.Mo - 0.3 && <Contador T={T} at={K.Re + 2.4} desde={0} hasta={4} dur={1.2} sufijo=" días con respirador" x={350} y={570} tam={40} />}
      <Chip T={T} at={K.Re + 3.8} until={K.Mo - 0.3} texto="✓ se recuperó" x={330} y={660} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.Mo + 0.5} until={K.C - 0.3} x={60} y={930} texto="leche + hongo" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="míralo ✓" x={260} y={420} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="comerlo ✗" x={260} y={530} tam={40} borde={KC.red} />

      {/* barras de escala */}
      <EscalaHongo T={T} at={K.G} until={K.Hu + 0.6} s={S0} />
      <EscalaHongo T={T} at={K.Hu + 0.6} until={K.Gl} s={2.3} cm={2} />
      <EscalaHongo T={T} at={K.Gl} until={K.B} s={sGl} cm={2} />
      <EscalaHongo T={T} at={K.B} until={K.Mx} s={1.35} />
      <BarraEscala T={T} at={K.Mx} until={K.R} texto="500 km" largo={114} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="100 µm" largo={90} />
      <BarraEscala T={T} at={K.Tx} until={cocina} texto="0,5 µm" largo={200} />
      <BarraEscala T={T} at={cocina} until={K.E} texto="10 cm" largo={170} />
      <EscalaHongo T={T} at={K.E} until={K.Re} s={0.95} />
      <BarraEscala T={T} at={K.Re} until={K.Mo} texto="50 cm" largo={150} />
      <BarraEscala T={T} at={K.Mo} until={K.C} texto="5 cm" largo={125} />
      <EscalaHongo T={T} at={K.C} until={K.Ou} s={S0} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Hu - 0.1} texto="Esos puntos *no son manchas.*" />
      <Subtitulo T={T} idx={1} at={K.Hu + 0.1} until={K.Gl - 0.1} texto="De joven: *envuelto en un velo.*" />
      <Subtitulo T={T} idx={2} at={K.Gl + 0.1} until={K.B - 0.1} texto="El sombrero crece; *el velo se rompe.*" />
      <Subtitulo T={T} idx={3} at={K.B + 0.1} until={K.L - 0.1} texto="Arriba, puntos; *abajo, en la base.*" />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.Mx - 0.1} texto="La lluvia *los puede lavar.*" />
      <Subtitulo T={T} idx={5} at={K.Mx + 0.1} until={K.R - 0.1} texto="En México: *pino y encino.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.P - 0.1} texto="Nutrientes a cambio *de azúcares.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Tx - 0.1} texto="¿Es venenoso? *Sí.*" />
      <Subtitulo T={T} idx={8} at={K.Tx + 0.1} until={K.E - 0.1} texto="Altera las señales *de tu cerebro.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Re - 0.1} texto="2018, Minnesota: *lo confundió.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Mo - 0.1} texto="4 días *con respirador.*" />
      <Subtitulo T={T} idx={11} at={K.Mo + 0.1} until={K.C - 0.1} texto="En leche, para *atontar moscas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Admíralo, *no te lo comas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Hu + 0.8, K.Gl - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.B + 0.4, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mx + 0.6, K.R - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Tx + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tx + 3.0, K.E - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 2.6, K.Re - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Re + 3.0, K.Mo - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Mo + 0.6, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="39" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MuscariaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MuscariaShot /></CompositionStage></div>;
}
window.MuscariaApp = MuscariaApp;
