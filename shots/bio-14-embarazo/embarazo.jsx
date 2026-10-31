// Shot Biotecnológico #14 · La prueba de embarazo por dentro — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos y no están a escala.
// Flujo de la tira (de abajo hacia arriba en pantalla): pozo → anticuerpos con oro → línea T (prueba) → línea C (control).

const ORO = '#e0a419', ORO2 = '#ffd76a', ROSA_T = '#d6336c', PIEL = '#e9a983', PIEL2 = '#c98563';
const ALFA = '#4dd4ff', BETA = '#ff5fa2', CABRA = '#b18cff', RATON = '#9fb3c8', MEMB = '#fffdf6';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- la prueba casera (cassette) ----------
   t, c: 0..1 intensidad de la línea T (prueba) y C (control) · brilla: halo en la línea T · humedo: 0..1 frente de orina */
function Prueba({ T = 0, x, y, s = 1, rot = 0, t = 0, c = 0, brilla = 0, letras = true, humedo = 0 }) {
  const lin = (yy, v, col) => v > 0 && <rect x={-58} y={yy - 10} width={116} height={20} rx={6} fill={col} opacity={v} />;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-128} y={-418} width={256} height={836} rx={118} fill="rgba(0,0,0,.18)" transform="translate(14 16)" />
    <rect x={-128} y={-418} width={256} height={836} rx={118} fill="#f7f4ee" stroke={KC.ink} strokeWidth={10} />
    <rect x={-100} y={-380} width={200} height={40} rx={20} fill="#e9e4da" />
    {/* ventana de resultado */}
    <rect x={-72} y={-310} width={144} height={290} rx={18} fill="#d9d2c4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-298} width={120} height={266} rx={10} fill={MEMB} />
    {humedo > 0 && <rect x={-60} y={-32 - 266 * humedo} width={120} height={266 * humedo} rx={10} fill="rgba(255,230,140,.28)" />}
    {brilla > 0 && <rect x={-80} y={-128} width={160} height={36} rx={18} fill={ROSA_T} opacity={0.35 * brilla} style={{ filter:'blur(8px)' }} />}
    {lin(-230, c, ROSA_T)}
    {lin(-110, t, ROSA_T)}
    {letras && <g style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>
      <text x={-104} y={-216} textAnchor="middle">C</text><text x={-104} y={-96} textAnchor="middle">T</text></g>}
    {/* pozo de la muestra */}
    <ellipse cx={0} cy={250} rx={62} ry={74} fill="#d9d2c4" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={256} rx={44} ry={54} fill="#bfb6a6" />
    <path d="M -22 128 L 0 100 L 22 128" stroke="#b9b1a2" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
/* mano que sostiene la prueba (detrás y por delante: dedos y pulgar) */
function ManoAtras({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 60 120 Q 260 140 300 330 Q 330 520 160 640 L -40 760 L -240 760 Q -200 560 -170 420 Q -140 260 60 120 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
  </g>;
}
function ManoDelante({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[60, 150, 240].map((dy, i) => <rect key={i} x={96} y={dy} width={110 - i * 6} height={74} rx={37} fill={PIEL} stroke={KC.ink} strokeWidth={9} />)}
    <path d="M -230 330 Q -150 250 -96 240 Q -60 236 -70 276 Q -90 320 -170 400 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -96 250 Q -78 252 -80 270" stroke={PIEL2} strokeWidth={6} fill="none" />
  </g>;
}
function PruebaEnMano({ T, x, y, s = 1, t, c, brilla, rot = -8 }) {
  const b = Math.sin(T * 1.3) * 6;
  return <g transform={`translate(0 ${b})`}>
    <ManoAtras x={x} y={y} s={s} />
    <Prueba T={T} x={x} y={y} s={s} rot={rot} t={t} c={c} brilla={brilla} />
    <ManoDelante x={x} y={y} s={s} />
  </g>;
}

/* ---------- hCG: dos piezas, α (cian) y β (rosa, más larga) ---------- */
function HCG({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -34 -6 Q -40 -30 -16 -32 Q 4 -36 4 -14 Q 8 8 -12 16 Q -36 20 -34 -6 Z" fill={ALFA} stroke={KC.ink} strokeWidth={4} />
    <path d="M 2 -18 Q 10 -38 30 -30 Q 48 -20 40 0 Q 34 16 40 28 Q 30 40 14 30 Q -2 18 2 -18 Z" fill={BETA} stroke={KC.ink} strokeWidth={4} />
    <path d="M 40 28 q 10 8 6 18" stroke={BETA} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

/* ---------- anticuerpo en Y ----------
   Origen = la bisagra. Brazos hacia arriba (-y), tallo hacia abajo. oro: partícula de oro en la punta del tallo.
   orejas: 'raton' | 'cabra' (solo para el dato chistoso). */
function Anti({ x, y, s = 1, rot = 0, color = '#f6f3ec', oro = false, orejas, o = 1 }) {
  const seg = (x1, y1, x2, y2) => <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={15} strokeLinecap="round" /></g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {orejas === 'raton' && <g><circle cx={-30} cy={8} r={20} fill="#c9d4e0" stroke={KC.ink} strokeWidth={5} /><circle cx={-30} cy={8} r={10} fill="#ff9fb8" />
      <circle cx={30} cy={8} r={20} fill="#c9d4e0" stroke={KC.ink} strokeWidth={5} /><circle cx={30} cy={8} r={10} fill="#ff9fb8" /></g>}
    {orejas === 'cabra' && <g>
      <path d="M -12 -4 Q -40 -40 -20 -62" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -12 -4 Q -40 -40 -20 -62" stroke="#e8dcc0" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 12 -4 Q 40 -40 20 -62" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M 12 -4 Q 40 -40 20 -62" stroke="#e8dcc0" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M -16 10 Q -54 10 -60 30 Q -36 32 -14 20 Z" fill="#d8c8a8" stroke={KC.ink} strokeWidth={5} />
      <path d="M 16 10 Q 54 10 60 30 Q 36 32 14 20 Z" fill="#d8c8a8" stroke={KC.ink} strokeWidth={5} />
      <path d="M -8 84 Q 0 112 8 84" fill="#e8dcc0" stroke={KC.ink} strokeWidth={5} /></g>}
    {seg(0, 0, 0, 62)}{seg(0, 0, -42, -52)}{seg(0, 0, 42, -52)}
    {oro && <g><circle cx={0} cy={92} r={30} fill={ORO} stroke={KC.ink} strokeWidth={6} /><circle cx={-9} cy={82} r={9} fill={ORO2} /></g>}
  </g>;
}
/* fibras de la membrana (fondo micro) */
function Fibras({ T, seed = 3, n = 26, o = 0.22 }) {
  const R = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = R() * KW, y = R() * KH, l = 160 + R() * 300, a = R() * 180;
    return <line key={i} x1={x} y1={y} x2={x + Math.cos(a) * l} y2={y + Math.sin(a) * l + Math.sin(T * 0.5 + i) * 6} stroke="#9fd8ff" strokeWidth={6} strokeLinecap="round" />; })}</g>;
}
/* corriente de líquido que sube (rayitas que se mueven) */
function Corriente({ T, x = 0, w = KW, seed = 9, n = 22, vel = 260 }) {
  const R = krng(seed);
  return <g opacity={0.35}>{Array.from({ length: n }, (_, i) => { const xx = x + R() * w, ph = R() * KH, yy = KH - ((T * vel + ph) % (KH + 200));
    return <line key={i} x1={xx} y1={yy} x2={xx} y2={yy + 70} stroke="#bfe8ff" strokeWidth={5} strokeLinecap="round" />; })}</g>;
}
/* línea de membrana con anticuerpos fijos (boca abajo, esperando lo que sube) */
function LineaFija({ y, xs, color, s = 1.5, orejas, etiqueta }) {
  return <g>
    <rect x={0} y={y - 22} width={KW} height={44} fill="rgba(255,255,255,.10)" />
    <line x1={0} y1={y} x2={KW} y2={y} stroke="rgba(255,255,255,.35)" strokeWidth={10} strokeDasharray="4 18" strokeLinecap="round" />
    {xs.map((xx, i) => <Anti key={i} x={xx} y={y + 62 * s} s={s} rot={180} color={color} orejas={orejas} />)}
    {etiqueta && <text x={KW - 40} y={y - 40} textAnchor="end" style={{ font:`700 38px ${KF.mono}` }} fill="#ffffff">{etiqueta}</text>}
  </g>;
}

/* ---------- útero e implantación (esquema) ---------- */
function Utero({ T, x, y, s = 1, hunde = 1, sale = 0 }) {
  const R = krng(12);
  const molecs = Array.from({ length: 9 }, () => [R(), R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* pared del útero (endometrio) */}
    <path d="M -560 40 Q -280 -10 0 30 Q 280 70 560 20 L 560 520 L -560 520 Z" fill="#f59ab0" stroke={KC.ink} strokeWidth={10} />
    <path d="M -560 120 Q -280 80 0 120 Q 280 160 560 110" stroke="#e46a8a" strokeWidth={8} fill="none" />
    {/* vaso sanguíneo de la madre */}
    <path d="M -560 330 Q -200 260 0 330 Q 220 400 560 320" stroke={KC.ink} strokeWidth={84} fill="none" />
    <path d="M -560 330 Q -200 260 0 330 Q 220 400 560 320" stroke="#d7263d" strokeWidth={68} fill="none" />
    {[0, 1, 2, 3, 4, 5].map((i) => { const u = ((T * 0.18 + i / 6) % 1); const px = -560 + u * 1120, py = 330 + Math.sin(u * Math.PI * 2) * -30;
      return <ellipse key={i} cx={px} cy={py} rx={22} ry={13} fill="#ff6b7a" stroke="#8a1020" strokeWidth={3} />; })}
    {/* blastocisto que se hunde en la pared */}
    <g transform={`translate(0 ${klerp(-150, 40, hunde)})`}>
      <circle r={120} fill="#fff1d6" stroke={KC.ink} strokeWidth={9} />
      <circle r={96} fill="#fde7b8" stroke="#e0b46a" strokeWidth={5} />
      <path d="M -60 -50 Q 0 -100 60 -50 Q 40 -10 0 -6 Q -40 -10 -60 -50 Z" fill="#ffc46b" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 108} cy={Math.sin(a) * 108} r={11} fill="#ffd9a0" stroke="#d29a4a" strokeWidth={3} />; })}
    </g>
    {/* hCG que pasa a la sangre de la madre */}
    {molecs.map(([u, ph], i) => { const p = kclamp(sale * 1.6 - u * 0.6, 0, 1); if (p <= 0) return null;
      const bx = (u - 0.5) * 240, by = klerp(120, 320, p), dx = (T * 50 + u * 400) % 900 * kprog(p, 0.95, 1);
      return <HCG key={i} x={bx + dx} y={by + Math.sin(T * 3 + ph) * 8} s={0.9} rot={T * 40 + ph * 50} />; })}
  </g>;
}

/* ---------- la tira de lado y la servilleta ---------- */
function TiraLado({ x, y, h = 900, w = 170, frente = 0 }) {
  const zonas = [['absorbente', '#e8e0cf', 0, 0.16], ['membrana', MEMB, 0.16, 0.66], ['oro', '#e9b4c6', 0.66, 0.8], ['muestra', '#f2ead8', 0.8, 1]];
  const top = y - h / 2;
  return <g>
    {zonas.map(([n, c, a, b]) => <rect key={n} x={x - w / 2} y={top + a * h} width={w} height={(b - a) * h} fill={c} stroke={KC.ink} strokeWidth={6} />)}
    <rect x={x - w / 2 + 14} y={top + 0.24 * h} width={w - 28} height={18} fill={ROSA_T} opacity={0.18} />
    <rect x={x - w / 2 + 14} y={top + 0.44 * h} width={w - 28} height={18} fill={ROSA_T} opacity={0.18} />
    <rect x={x - w / 2 + 3} y={top + h * (1 - frente)} width={w - 6} height={h * frente} fill="rgba(255,214,80,.35)" />
    <line x1={x - w / 2} y1={top + h * (1 - frente)} x2={x + w / 2} y2={top + h * (1 - frente)} stroke="#e0a419" strokeWidth={6} opacity={frente > 0 && frente < 1 ? 1 : 0} />
    <rect x={x - w / 2} y={top} width={w} height={h} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
function Servilleta({ T, x, y, frente = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 -330 L 110 -330 L 110 250 L -110 250 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    {[-260, -170, -80, 10, 100, 190].map((yy) => <line key={yy} x1={-100} x2={100} y1={yy} y2={yy} stroke="#e7e2d8" strokeWidth={4} />)}
    <path d={`M -106 ${250 - 560 * frente + Math.sin(T * 4) * 6} Q 0 ${250 - 560 * frente - 20} 106 ${250 - 560 * frente + Math.cos(T * 4) * 6} L 106 246 L -106 246 Z`} fill="rgba(80,170,255,.45)" />
    <rect x={-170} y={190} width={340} height={210} rx={20} fill="rgba(170,220,255,.5)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-162} y={232} width={324} height={160} rx={14} fill="rgba(80,170,255,.55)" />
  </g>;
}

/* ---------- hibridoma (1975) ---------- */
function Celula({ x, y, r, color, nucleo, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={x - r * 0.1} cy={y + r * 0.05} r={r * 0.45} fill={nucleo} stroke={KC.ink} strokeWidth={5} /></g>;
}
function Raton({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 120 20 Q 220 30 230 -40" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={130} ry={74} fill="#d8dee6" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-110} cy={-50} r={38} fill="#d8dee6" stroke={KC.ink} strokeWidth={7} /><circle cx={-110} cy={-50} r={20} fill="#ff9fb8" />
    <circle cx={-150} cy={-6} r={8} fill={KC.ink} /><circle cx={-176} cy={16} r={9} fill="#ff6b8a" />
  </g>;
}
function Medalla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.6) * 5})`}>
    <path d="M -90 -330 L -20 -120 L 20 -120 L 90 -330 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -330 L 0 -160 L 40 -330 Z" fill={KC.red} />
    <circle r={190} fill={ORO} stroke={KC.ink} strokeWidth={10} />
    <circle r={150} fill="none" stroke="#b07c0c" strokeWidth={8} />
    <path d="M -120 -60 A 140 140 0 0 1 -40 -136" stroke="#fff6c8" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.7} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.ink}>1984</text>
  </g>;
}

function Embarazo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Im: CUES.Implanta, Or: CUES.Orina, Su: CUES.Sube, Ox: CUES.Oro, Sa: CUES.Sandwich, Ra: CUES.Rayita, Pr: CUES.Pregunta,
    Co: CUES.Control, Es: CUES.Estudio, No: CUES.Nobel, Ca: CUES.Cabra, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const tG = kprog(T, K.G + 0.15, K.G + 0.9, kEase.sale);
  const mitadRa = K.Ra + 2.3;

  /* micro: posiciones de los complejos que suben y se atrapan en la línea T (escena Sandwich) */
  const YT = 760, sFix = 1.5;
  const tipFijo = YT + 62 * sFix + 52 * sFix;          // puntas de los brazos del anticuerpo fijo
  const yStop = tipFijo + 26 + 52 * sFix;              // bisagra del anticuerpo con oro cuando queda atrapado
  const xsT = [270, 500, 730, 960];
  const complejo = (i, t0, conH = true, xx) => {
    const v = 420, yy = Math.max(conH ? yStop : -400, 1750 - (T - t0) * v);
    const atrapado = conH && yy <= yStop + 0.5;
    return <g key={i}>
      <Anti x={xx} y={yy} s={sFix} oro />
      {conH && <HCG x={xx} y={yy - 52 * sFix - 26} s={1.5} rot={atrapado ? 0 : Math.sin(T * 5 + i) * 20} />}
      {atrapado && <circle cx={xx} cy={yy - 52 * sFix - 26} r={60 + 30 * Math.max(0, 1 - (T - (t0 + (1750 - yStop) / v)) * 3)} fill="none" stroke={ORO2} strokeWidth={6} opacity={Math.max(0, 1 - (T - (t0 + (1750 - yStop) / v)) * 2)} />}
    </g>;
  };

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la prueba en la mano; se pinta la línea T */}
      <Escena T={T} a={K.G} b={K.Im} zoom={0.06} origen="38% 50%">
        <FondoLunares color={KC.pink} />
        <Ambiente T={T} n={24} />
        <Capa><PruebaEnMano T={T} x={400} y={900} s={0.95} t={tG} c={1} brilla={tG * (0.6 + 0.4 * Math.sin(T * 6))} /></Capa>
      </Escena>
      {/* 1 · implantación: la hCG entra a la sangre de la madre */}
      <Escena T={T} a={K.Im} b={K.Or}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Utero T={T} x={540} y={760} s={0.95} hunde={kprog(T, K.Im, K.Im + 1.8, kEase.suave)} sale={kprog(T, K.Im + 2.2, K.Im + 4.6)} />
        </Capa>
      </Escena>
      {/* 2 · de la sangre a la orina, y la gota al pozo */}
      <Escena T={T} a={K.Or} b={K.Su}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <path d="M -40 520 Q 300 460 520 560" stroke={KC.ink} strokeWidth={84} fill="none" /><path d="M -40 520 Q 300 460 520 560" stroke="#d7263d" strokeWidth={68} fill="none" />
          {[0, 1, 2, 3].map((i) => { const u = ((T - K.Or) * 0.5 + i / 4) % 1; return <HCG key={i} x={klerp(0, 500, u)} y={520 - Math.sin(u * Math.PI) * 50 + (u > 0.8 ? 0 : 0)} s={1.1} rot={T * 60 + i * 40} />; })}
          <FlechaCurva x1={540} y1={590} x2={710} y2={650} p={kprog(T, K.Or + 0.3, K.Or + 1.0)} curva={60} color={KC.ink} T={T} />
          <Prueba T={T} x={600} y={1050} s={0.6} rot={-90} t={0} c={0} letras={false} />
          <g transform={`translate(0 ${klerp(0, 250, kprog(T, K.Or + 1.2, K.Or + 2.1))})`} opacity={1 - kprog(T, K.Or + 2.05, K.Or + 2.25)}>
            <path d="M 750 600 Q 690 730 750 790 Q 810 730 750 600 Z" fill="#ffe27a" stroke={KC.ink} strokeWidth={7} />
            <HCG x={752} y={735} s={0.7} rot={T * 40} /></g>
        </Capa>
      </Escena>
      {/* 3 · la orina sube sola por la tira, como en una servilleta */}
      <Escena T={T} a={K.Su} b={K.Ox + 0.6} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <TiraLado x={420} y={860} h={760} frente={kprog(T, K.Su + 0.2, K.Ox + 0.6)} />
          <Servilleta T={T} x={830} y={800} frente={kprog(T, K.Su + 0.2, K.Ox + 0.6)} />
          <path d="M 300 1180 l 0 -60 m -26 26 l 26 -26 l 26 26" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={1 - kprog(T, K.Su + 2, K.Su + 2.5)} />
        </Capa>
      </Escena>
      {/* 4 · Lupa: los anticuerpos con oro se sueltan y atrapan la hCG */}
      <Lupa T={T} at={K.Ox} until={K.Sa - 0.2} x={540} y={820} r={330} fx={420} fy={1035} tinte={ORO2} etiqueta="AL MICROSCOPIO · LA TIRA"
        interior={(TT, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#0b1220" />
          {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 90 - 40} y1={0} x2={i * 90 + 60} y2={r * 2} stroke="#2a4466" strokeWidth={10} />)}
          {[[160, 0.0], [330, 0.5], [500, 0.25]].map(([xx, d], i) => { const yc = r * 2 + 120 - ((TT - K.Ox - d) * 150);
            const yh = 300 + i * 40, hy = Math.min(yh, yc - 52 * 1.1 - 22);
            return <g key={i}><Anti x={xx} y={yc} s={1.1} oro /><HCG x={xx + 6 * Math.sin(TT * 3 + i)} y={hy} s={1.2} rot={hy < yh ? 0 : TT * 50} /></g>; })}
        </svg>} />
      {/* 5 · sándwich en la línea T */}
      <Escena T={T} a={K.Sa} b={K.Ra + 0.1} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <Fibras T={T} /><Corriente T={T} />
          <LineaFija y={YT} xs={xsT} color={KC.mint} s={sFix} etiqueta="línea T" />
          {xsT.map((xx, i) => complejo(i, K.Sa - 1.0 + i * 0.45, true, xx))}
          {complejo(9, K.Sa + 1.2, false, 615)}
        </Capa>
      </Escena>
      {/* 6 · el oro amontonado pinta la rayita */}
      <Escena T={T} a={K.Ra} b={mitadRa}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <Fibras T={T} seed={5} />
          {Array.from({ length: 60 }, (_, i) => { const xx = 30 + (i % 30) * 35, row = Math.floor(i / 30), on = kprog(T, K.Ra + i * 0.03, K.Ra + i * 0.03 + 0.3);
            return on > 0 && <g key={i} transform={`translate(${xx} ${880 + row * 120}) scale(${0.45 * on})`}>
              <Anti x={0} y={-150} s={1} rot={180} color={KC.mint} /><HCG x={0} y={-30} s={1.2} /><Anti x={0} y={70} s={1} oro /></g>; })}
          <rect x={0} y={800} width={KW} height={260} fill={ROSA_T} opacity={0.35 * kprog(T, K.Ra + 1.2, mitadRa)} />
        </Capa>
      </Escena>
      <Escena T={T} a={mitadRa} b={K.Pr} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <Capa><Prueba T={T} x={540} y={900} s={1.25} t={kprog(T, mitadRa + 0.2, mitadRa + 1.1)} c={0} brilla={kprog(T, mitadRa + 0.6, mitadRa + 1.1)} /></Capa>
      </Escena>
      {/* 7 · ¿y cómo sabes que funcionó? */}
      <Escena T={T} a={K.Pr} b={K.Co} zoom={0.06} origen="30% 50%">
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Prueba T={T} x={330} y={900} s={1.1} t={1} c={0} />
          <text x={330} y={680} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={8} paintOrder="stroke"
            transform={`rotate(${Math.sin(T * 4) * 8} 330 640)`}>?</text>
        </Capa>
      </Escena>
      {/* 8 · línea de control: atrapa los que pasan de largo */}
      <Escena T={T} a={K.Co} b={K.Es} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <Fibras T={T} seed={7} /><Corriente T={T} seed={4} />
          <LineaFija y={1080} xs={[200, 880]} color={KC.mint} s={1.1} etiqueta="línea T" />
          <LineaFija y={500} xs={[240, 540, 840]} color={CABRA} s={1.3} etiqueta="línea C" />
          {[240, 540, 840].map((xx, i) => { const t0 = K.Co + 0.2 + i * 0.6, stop = 500 + 62 * 1.3 + 52 * 1.3 + 52 * 1.3 + 4;
            const yy = Math.max(stop, 1800 - (T - t0) * 520), ok = yy <= stop + 0.5;
            return <g key={i}><Anti x={xx} y={yy} s={1.3} oro />
              {ok && <circle cx={xx} cy={stop - 60} r={70} fill="none" stroke={ORO2} strokeWidth={6} opacity={Math.max(0, 1 - (T - t0 - (1800 - stop) / 520) * 2)} />}</g>; })}
        </Capa>
      </Escena>
      {/* 9 · 1975, Cambridge: hibridomas */}
      <Escena T={T} a={K.Es} b={K.No}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          {(() => {
            const junta = kprog(T, K.Es + 2.4, K.Es + 4.0, kEase.suave), sale = kprog(T, K.Es + 4.2, K.Es + 7.2);
            const xb = klerp(270, 540, junta), xm = klerp(810, 540, junta), yy = 900;
            return <g>
              <Raton x={200} y={1690} s={0.7} />
              {junta < 1 ? <g><Celula x={xb} y={yy} r={110} color="#9fe3ff" nucleo="#2b6a9e" /><Celula x={xm} y={yy} r={150} color="#ffb38a" nucleo="#a8452a" /></g>
                : <Celula x={540} y={yy} r={190 + Math.sin(T * 3) * 4} color="#ffd38a" nucleo="#7a3fa0" />}
              {junta >= 1 && Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + 0.3, d = klerp(200, 470, ((T - K.Es - 4.2) * 0.35 + i * 0.1) % 1);
                return <Anti key={i} x={540 + Math.cos(a) * d} y={yy + Math.sin(a) * d * 0.9} s={0.55} rot={a * 57 + 90} color={KC.pink} o={sale > 0 ? 1 : 0} />; })}
            </g>;
          })()}
        </Capa>
      </Escena>
      {/* 10 · Nobel 1984 */}
      <Escena T={T} a={K.No} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa><Medalla T={T} x={540} y={900} s={kprog(T, K.No, K.No + 0.5, kEase.rebote)} /></Capa>
      </Escena>
      {/* 11 · dato chistoso: anticuerpos de cabra que atrapan los de ratón */}
      <Escena T={T} a={K.Ca} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          {(() => { const ab = kprog(T, K.Ca + 1.0, K.Ca + 2.2, kEase.sale); const yr = klerp(1250, 1010, ab);
            return <g>
              <Anti x={540} y={700} s={2.6} rot={180} color={CABRA} orejas="cabra" />
              <Anti x={540} y={yr} s={2.2} oro orejas="raton" />
              {ab >= 1 && [0, 1, 2].map((i) => <path key={i} d="M 0 -20 C -20 -45 -50 -20 0 18 C 50 -20 20 -45 0 -20 Z" transform={`translate(${380 + i * 160} ${560 - ((T * 60 + i * 40) % 120)}) scale(1.4)`} fill={KC.pink} stroke={KC.ink} strokeWidth={4} opacity={0.9} />)}
            </g>; })()}
        </Capa>
      </Escena>
      {/* 12 · cierre: la misma prueba, con sus dos rayitas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="38% 50%">
        <FondoLunares color={KC.pink} />
        <Ambiente T={T} n={24} />
        <Capa><PruebaEnMano T={T} x={400} y={900} s={0.95} t={1} c={1} brilla={0.6 + 0.4 * Math.sin(T * 6)} /></Capa>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.9} until={K.Im - 0.3} texto="no es tinta: es oro + anticuerpos" y={1500} tam={40} borde={ORO} />
      <Etq T={T} at={K.G + 1.0} until={K.Im - 0.3} x={262} y={800} texto="prueba" lado="izq" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Im + 2.4} until={K.Or - 0.2} x={660} y={1000} texto="hCG" tam={46} color={KC.ink} />
      <Chip T={T} at={K.Im + 0.4} until={K.Im + 2.3} texto="el embrión se implanta" y={1500} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.Im + 2.6} until={K.Or - 0.2} texto="hCG → sangre de la madre" y={1500} tam={42} borde="#d7263d" />
      <Chip T={T} at={K.Or + 0.3} until={K.Su - 0.2} texto="sangre → orina → prueba" y={1500} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Su + 0.3} until={K.Ox - 0.1} texto="capilaridad: sube sola" y={1500} tam={42} borde={KC.blue} />
      <Etq T={T} at={K.Su + 0.5} until={K.Ox - 0.1} x={510} y={671} texto="línea C" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Su + 0.7} until={K.Ox - 0.1} x={510} y={823} texto="línea T" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Su + 0.9} until={K.Ox - 0.1} x={510} y={1035} texto="con oro" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ox + 0.8} until={K.Sa - 0.2} texto="anticuerpo + oro atrapa la hCG" y={1500} tam={38} borde={ORO} />
      <Chip T={T} at={K.Sa + 0.3} until={K.Ra - 0.1} texto="la agarran por los dos lados" y={1500} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Sa + 0.6} until={K.Ra - 0.1} x={10} y={931} texto="hCG" tam={32} color={BETA} />
      <Etq T={T} at={K.Sa + 0.8} until={K.Ra - 0.1} x={10} y={1173} texto="oro" tam={32} color={ORO2} />
      <Chip T={T} at={K.Ra + 0.3} until={K.Pr - 0.1} texto="miles de sándwiches = rayita" y={1500} tam={40} borde={ROSA_T} />
      <Chip T={T} at={K.Pr + 0.2} until={K.Co - 0.1} texto="¿y si la prueba falló?" y={1500} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.Co + 0.4} until={K.Es - 0.1} texto="control: sale haya hormona o no" y={1500} tam={38} borde={CABRA} />
      <Chip T={T} at={K.Es + 0.2} until={K.Es + 2.3} texto="monoclonales: todos idénticos" y={1500} tam={40} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.Es + 2.4} until={K.No - 0.2} anio="1975" quien="Köhler y Milstein · Cambridge" revista="Nature · células fusionadas: hibridoma" y={480} />
      <Etq T={T} at={K.Es + 0.6} until={K.Es + 4.0} x={150} y={740} texto="célula de bazo" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.8} until={K.Es + 4.0} x={930} y={1100} texto="célula de mieloma" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Es + 4.3} until={K.No - 0.2} x={760} y={1160} texto="hibridoma" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.4} until={K.No - 0.2} x={340} y={1690} texto="ratón" tam={32} color={KC.ink} />
      <Chip T={T} at={K.No + 0.4} until={K.Ca - 0.1} texto="Nobel de Fisiología o Medicina" y={1500} tam={40} borde={ORO} />
      <Chip T={T} at={K.No + 0.6} until={K.Ca - 0.1} texto="Jerne · Köhler · Milstein" y={1620} tam={34} borde={KC.ink} mono />
      <Etq T={T} at={K.Ca + 0.4} until={K.Ci - 0.1} x={430} y={600} texto="de cabra" lado="izq" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Ci - 0.1} x={740} y={1140} texto="de ratón" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.2} until={K.Ci - 0.1} texto="línea C: cabra atrapa ratón" y={1500} tam={40} borde={CABRA} />
      <Etq T={T} at={K.Ci + 0.4} until={K.Ou} x={262} y={680} texto="control" lado="izq" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Ci + 0.8} until={K.Ou} x={262} y={800} texto="hCG" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="oro + anticuerpos + hCG" y={1500} tam={40} borde={ORO} />
      {kvisible(T, K.Ox, K.Pr) && T > K.Ox + 0.6 && <div style={{ position:'absolute', right:30, top:1640, zIndex:41, font:`700 26px ${KF.mono}`, color:'rgba(246,243,236,.75)' }}>esquema · no a escala</div>}

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Im - 0.1} texto="No es tinta: *es oro con anticuerpos.*" />
      <Subtitulo T={T} idx={1} at={K.Im + 0.1} until={K.Or - 0.1} texto="La *hCG* entra a la sangre." />
      <Subtitulo T={T} idx={2} at={K.Or + 0.1} until={K.Su - 0.1} texto="Pasa a *la orina.*" />
      <Subtitulo T={T} idx={3} at={K.Su + 0.1} until={K.Ox - 0.1} texto="Sube sola, *como en una servilleta.*" />
      <Subtitulo T={T} idx={4} at={K.Ox + 0.1} until={K.Sa - 0.1} texto="Anticuerpos *con oro.*" />
      <Subtitulo T={T} idx={5} at={K.Sa + 0.1} until={K.Ra - 0.1} texto="Otros la agarran *del otro lado.*" />
      <Subtitulo T={T} idx={6} at={K.Ra + 0.1} until={K.Pr - 0.1} texto="Un *sándwich* que pinta la rayita." />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.Co - 0.1} texto="¿Cómo sabes *que funcionó?*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.Es - 0.1} texto="La *línea de control.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.No - 0.1} texto="1975: *anticuerpos monoclonales.*" />
      <Subtitulo T={T} idx={10} at={K.No + 0.1} until={K.Ca - 0.1} texto="Premio *Nobel* en 1984." />
      <Subtitulo T={T} idx={11} at={K.Ca + 0.1} until={K.Ci - 0.1} texto="*Cabra* atrapa ratón." />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Oro, anticuerpos *y una hormona.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Im + 0.8, K.Or - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Su + 0.4, K.Ox - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Sa + 0.4, K.Ra - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Pr - 0.05, K.Co + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 0.3, K.Es + 2.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.No + 0.1, K.Ca - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Ca + 1.0, K.Ci - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ci + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EmbarazoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Embarazo /></CompositionStage></div>;
}
window.EmbarazoApp = EmbarazoApp;
