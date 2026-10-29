// Shot Científico #58 · Tus venas no son azules — NARRADO (N1 "Por dentro": la luz que entra en la piel).
// Datos: Kienle et al. 1996 (Applied Optics 35(7)); C. Baird (WTAMU). Ver guion.md y verificacion.md.
// La sangre SIEMPRE se pinta roja (oscura en la vena). Lo único azulado es cómo se ve la vena desde afuera.
const SANGRE = '#6e0d1b', SANGRE2 = '#8f1626', SANGRE_O2 = '#e3232f';
const VENA_VISTA = '#7f93b5';               // el tono con el que se VE la vena sobre la piel (no es el color de la sangre)
const LUZ_ROJA = '#ff3b2f', LUZ_AZUL = '#4d86ff';
const DERMIS = '#e7937f', GRASA = '#f2cd7c';

// Glóbulo rojo (disco con el centro hundido).
function Globulo({ x, y, r = 26, color = SANGRE, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={r} ry={r * 0.82} fill={color} stroke={KC.ink} strokeWidth={4} />
    <ellipse rx={r * 0.45} ry={r * 0.36} fill="rgba(0,0,0,.28)" />
  </g>;
}
// Rayo de luz que se dibuja (p 0..1). Termina en una punta si fin = true.
function Rayo({ d, color, p = 1, grosor = 12, o = 1 }) {
  if (p <= 0) return null;
  return <g opacity={o}>
    <path d={d} pathLength="1" fill="none" stroke={color} strokeWidth={grosor * 2.6} strokeOpacity=".25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - p} />
    <path d={d} pathLength="1" fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - p} />
  </g>;
}
// Antebrazo visto por la palma (muñeca en el origen, mano a la derecha).
function Antebrazo({ x, y, s = 1, venas = 1, T = 0 }) {
  const late = 0.85 + 0.15 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -760 -140 L -20 -112 C 0 -110 0 110 -20 112 L -760 150 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 60 -150 C 110 -210 160 -250 200 -240 C 235 -230 225 -195 195 -160 L 150 -110 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-118, -58, 2, 62].map((fy, i) => <rect key={i} x={200} y={fy} width={[170, 205, 195, 160][i]} height={54} rx={27} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />)}
    <rect x={-20} y={-140} width={270} height={280} rx={80} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M 20 -60 Q 110 -20 150 70 M 30 40 Q 110 50 210 20" fill="none" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
    <path d="M -40 -90 Q -30 0 -40 90 M -70 -80 Q -60 0 -70 80" fill="none" stroke={CPIEL2} strokeWidth={5} strokeLinecap="round" />
    <g opacity={venas * late} strokeLinecap="round" fill="none">
      <path d="M -760 -40 C -560 -62 -340 -12 -150 -30 C -80 -38 -40 -52 -10 -60" stroke={VENA_VISTA} strokeWidth={17} />
      <path d="M -720 55 C -520 35 -300 66 -120 34 C -60 24 -30 30 -8 38" stroke={VENA_VISTA} strokeWidth={14} />
      <path d="M -400 -26 C -350 8 -300 30 -240 52" stroke={VENA_VISTA} strokeWidth={11} />
    </g>
  </g>;
}
// Interior de la vena para la Lupa: sangre ROJA oscura que corre.
function VenaDentro({ t, r, texto = 'roja oscura' }) {
  const g = krng(7);
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#1a0b10" />
    <rect x={0} y={r * 0.45} width={r * 2} height={r * 1.1} fill={SANGRE} stroke="#3a0810" strokeWidth={10} />
    {Array.from({ length: 9 }, (_, i) => { const x = ((g() * r * 2 + t * 70) % (r * 2 + 60)) - 30, y = r * 0.6 + g() * r * 0.8;
      return <Globulo key={i} x={x} y={y} r={r * 0.15} color={SANGRE2} rot={g() * 60 + t * 20} />; })}
    <text x={r} y={r * 0.34} textAnchor="middle" style={{ font:`900 ${r * 0.2}px ${KF.texto}` }} fill={KC.texto}>{texto}</text>
  </svg>;
}
// Corte de piel (por dentro): superficie en y0, capas hasta y1. x de 40 a 1040.
function CortePiel({ y0 = 640, y1 = 1190, T = 0, children }) {
  const ep = 50, de = Math.round((y1 - y0) * 0.62);
  const g = krng(21);
  return <g>
    <rect x={40} y={y0} width={1000} height={y1 - y0} rx={18} fill={GRASA} stroke={KC.ink} strokeWidth={8} />
    <rect x={40} y={y0} width={1000} height={ep + de} rx={18} fill={DERMIS} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={80 + g() * 920} cy={y0 + ep + de + 25 + g() * (y1 - y0 - ep - de - 50)} r={18 + g() * 16} fill="rgba(255,255,255,.28)" stroke="rgba(0,0,0,.15)" strokeWidth={3} />)}
    {Array.from({ length: 30 }, (_, i) => <path key={'f' + i} d={`M ${70 + g() * 900} ${y0 + ep + 20 + g() * (de - 40)} q 30 ${-10 + g() * 20} 60 0`} stroke="rgba(120,40,30,.25)" strokeWidth={4} fill="none" />)}
    <path d={`M 40 ${y0 + 18} Q 40 ${y0} 58 ${y0} L 1022 ${y0} Q 1040 ${y0} 1040 ${y0 + 18} L 1040 ${y0 + ep} L 40 ${y0 + ep} Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => { const x = 120 + i * 170; return <path key={'v' + i} d={`M ${x} ${y0} q ${8 + 6 * Math.sin(T * 2 + i)} -40 ${-4} -80`} stroke={CPELO} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
    {children}
  </g>;
}
// Vena en corte: tubo de sangre roja oscura. vis = qué tan bien se marca.
function VenaCorte({ x, y, rx = 120, ry = 78, T = 0 }) {
  return <g>
    <ellipse cx={x} cy={y} rx={rx + 10} ry={ry + 10} fill="#c9706a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={SANGRE} stroke={KC.ink} strokeWidth={5} />
    {[[-60, -20], [-10, 25], [45, -15], [70, 30], [-55, 35], [10, -40]].map(([dx, dy], i) => <Globulo key={i} x={x + dx * rx / 120 + Math.sin(T * 2 + i) * 6} y={y + dy * ry / 78} r={20 * rx / 120} color={SANGRE2} rot={i * 40 + T * 15} />)}
  </g>;
}
// Mano vista por el dorso (muñeca en el origen, dedos hacia arriba).
function ManoDorso({ x, y, s = 1, T = 0, venas = 1 }) {
  const late = 0.85 + 0.15 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 0 L -140 170 L 140 170 L 130 0 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-170} y={150} width={340} height={60} rx={16} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -150 C -200 -200 -250 -250 -260 -300 C -268 -335 -230 -350 -205 -320 L -120 -220 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-115, -40, 35, 105].map((fx, i) => <rect key={i} x={fx - 34} y={-330 - [40, 90, 70, 10][i]} width={68} height={200 + [40, 90, 70, 10][i]} rx={34} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -165 -170 C -170 -80 -150 -10 -130 10 L 130 10 C 160 -40 165 -120 150 -190 L -165 -190 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g opacity={venas * late} fill="none" strokeLinecap="round">
      <path d="M -60 160 C -70 90 -50 30 -90 -40 C -110 -80 -100 -120 -115 -170" stroke={VENA_VISTA} strokeWidth={14} />
      <path d="M 50 160 C 45 100 70 40 40 -20 C 25 -60 40 -110 35 -170" stroke={VENA_VISTA} strokeWidth={14} />
      <path d="M -90 -40 C -40 -60 0 -40 40 -20 C 70 -10 90 -60 105 -170" stroke={VENA_VISTA} strokeWidth={11} />
      <path d="M -40 -50 C -45 -100 -38 -140 -40 -170" stroke={VENA_VISTA} strokeWidth={9} />
    </g>
  </g>;
}
// Tubo de laboratorio con tapa, que se llena de sangre roja oscura (llen 0..1).
function TuboSangre({ x, y, llen = 1, T = 0 }) {
  const H = 640, W = 170, nivel = H - 40 - (H - 90) * llen;
  return <g transform={`translate(${x} ${y})`}>
    <clipPath id="tubo-clip"><path d={`M ${-W / 2} 0 L ${-W / 2} ${H - W / 2} A ${W / 2} ${W / 2} 0 0 0 ${W / 2} ${H - W / 2} L ${W / 2} 0 Z`} /></clipPath>
    <path d={`M ${-W / 2} 0 L ${-W / 2} ${H - W / 2} A ${W / 2} ${W / 2} 0 0 0 ${W / 2} ${H - W / 2} L ${W / 2} 0 Z`} fill="rgba(255,255,255,.55)" />
    <g clipPath="url(#tubo-clip)">
      <path d={`M ${-W} ${nivel + Math.sin(T * 4) * 5} Q 0 ${nivel - 14} ${W} ${nivel + Math.cos(T * 4) * 5} L ${W} ${H + 10} L ${-W} ${H + 10} Z`} fill={SANGRE} />
      <rect x={-W / 2 + 22} y={30} width={20} height={H - 120} rx={10} fill="rgba(255,255,255,.45)" />
    </g>
    <path d={`M ${-W / 2} 0 L ${-W / 2} ${H - W / 2} A ${W / 2} ${W / 2} 0 0 0 ${W / 2} ${H - W / 2} L ${W / 2} 0`} fill="none" stroke={KC.ink} strokeWidth={10} />
    <rect x={-W / 2 - 22} y={-90} width={W + 44} height={110} rx={22} fill={KC.lilac} stroke={KC.ink} strokeWidth={10} />
    <rect x={-W / 2 + 6} y={160} width={W - 12} height={170} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2].map((i) => <line key={i} x1={-W / 2 + 26} y1={200 + i * 40} x2={W / 2 - 26 - i * 22} y2={200 + i * 40} stroke="#999" strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// Fotones (puntitos) que vagan dentro de un bloque de piel: así se mide "cómo viaja la luz".
function FotonesPiel({ T, x0, y0, w, h, p = 1, n = 26 }) {
  const g = krng(31);
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const roja = i % 2 === 0, ph = g() * 6, prof = roja ? 0.75 : 0.3;
    const f = (T * 0.35 + g()) % 1, dx = (g() - 0.5) * w * 0.8, yy = y0 + Math.sin(f * Math.PI) * h * prof + Math.sin(T * 3 + ph) * 12, xx = x0 + w / 2 + dx * f + Math.cos(T * 2.5 + ph) * 14;
    return <circle key={i} cx={xx} cy={yy} r={10} fill={roja ? LUZ_ROJA : LUZ_AZUL} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}

function VenasAzules() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const pr = (a, d = 0.8, e = kEase.sale) => kprog(T, a, a + d, e);
  // rayos del corte (superficie en y 640)
  const AZUL_D = 'M 190 470 L 300 640 L 340 668 L 300 690 L 360 680 L 420 640 L 520 470';
  const ROJO_D = 'M 560 470 L 640 640 L 700 720 L 620 830 L 740 920 L 820 820 L 760 700 L 840 640 L 940 470';
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu muñeca con venas "azules"; por dentro, sangre roja oscura */}
      <Escena T={T} a={K.Gancho} b={K.Oscura}>
        <FondoLunares color={KC.pink} />
        <Lienzo><g transform={`translate(${(1 - pr(K.Gancho, 0.6)) * -300} 0)`}><Antebrazo x={620} y={1000} T={T} /></g></Lienzo>
        <Lupa T={T} at={K.Gancho + 0.25} until={K.Oscura - 0.2} x={300} y={500} r={175} fx={420} fy={975} tinte={KC.red} etiqueta="POR DENTRO · TU VENA"
          interior={(t, r) => <VenaDentro t={t} r={r} />} />
      </Escena>
      {/* 1 · menos oxígeno: rojo más oscuro, pero roja */}
      <Escena T={T} a={K.Oscura} b={K.Truco}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,90,90,.18)" />
        <Lienzo>
          <rect x={-20} y={700} width={1120} height={320} fill="#2a0a12" stroke="#c9706a" strokeWidth={14} />
          <defs><linearGradient id="o2" x1="0" x2="1"><stop offset="0" stopColor={SANGRE_O2} /><stop offset="1" stopColor={SANGRE} /></linearGradient></defs>
          <rect x={-20} y={714} width={1120} height={292} fill="url(#o2)" opacity={pr(K.Oscura + 0.2, 1)} />
          {Array.from({ length: 16 }, (_, i) => { const f = ((T * 0.12 + i / 16) % 1), x = -60 + f * 1200, y = 760 + ((i * 53) % 220);
            const c = f < 0.45 ? SANGRE_O2 : f < 0.65 ? '#b81b29' : SANGRE2;
            return <Globulo key={i} x={x} y={y} r={38} color={c} rot={i * 30 + T * 25} />; })}
          {Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.12 + i / 6 + 0.05) % 1); if (f > 0.5) return null;
            return <g key={'o' + i} opacity={1 - f * 2}><circle cx={-40 + f * 1200} cy={735 + (i % 3) * 110} r={13} fill="#bfe8ff" stroke={KC.ink} strokeWidth={3} />
              <text x={-40 + f * 1200} y={741 + (i % 3) * 110} textAnchor="middle" style={{ font:`900 16px ${KF.texto}` }} fill={KC.ink}>O₂</text></g>; })}
        </Lienzo>
        <Etq T={T} at={K.Oscura + 0.6} until={K.Truco - 0.2} x={60} y={650} texto="con más oxígeno" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Oscura + 1.4} until={K.Truco - 0.2} x={1020} y={1075} texto="con menos oxígeno" lado="izq" color={KC.gold2} />
        <Chip T={T} at={K.Oscura + 3.0} until={K.Truco - 0.1} texto="más oscura… pero ROJA" x={340} y={470} tam={44} borde={KC.red} />
      </Escena>
      {/* 2 · el truco: la luz llega a tu piel */}
      <Escena T={T} a={K.Truco} b={K.Profundo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <SolDibujo x={170} y={560} r={70} T={T} />
          {[0, 1, 2, 3, 4].map((i) => <Rayo key={i} d={`M ${230 + i * 12} ${600 + i * 6} L ${330 + i * 95} ${880 - i * 6}`} color={i % 2 ? LUZ_AZUL : LUZ_ROJA} grosor={10} p={pr(K.Truco + 0.15 + i * 0.12, 0.6)} />)}
          <Antebrazo x={620} y={1000} T={T} />
          <TextoSvg x={760} y={700} tam={120} color={KC.pink} rot={-6} s={klerp(0.4, 1, pr(K.Truco + 0.9, 0.4, kEase.rebote))} o={pr(K.Truco + 0.9, 0.2)}>¡TRUCO!</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Truco + 0.4} until={K.Profundo - 0.1} texto="truco de la luz y de tu piel" x={540} y={420} tam={42} borde={KC.ink} />
      </Escena>
      {/* 3 · corte de piel: la roja entra hondo, la azul rebota cerca de la superficie */}
      <Escena T={T} a={K.Profundo} b={K.Traga} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <CortePiel T={T} />
          <Rayo d={ROJO_D} color={LUZ_ROJA} p={pr(K.Profundo + 0.3, 2.2, kEase.suave)} />
          <Rayo d={AZUL_D} color={LUZ_AZUL} p={pr(K.Profundo + 2.5, 1.4, kEase.suave)} />
        </Lienzo>
        <Chip T={T} at={K.Profundo + 0.5} until={K.Traga - 0.1} texto="luz roja: entra más profundo" x={540} y={360} tam={38} borde={LUZ_ROJA} />
        <Chip T={T} at={K.Profundo + 2.6} until={K.Traga - 0.1} texto="luz azul: rebota cerca" x={540} y={1130} tam={38} borde={LUZ_AZUL} />
        <Etq T={T} at={K.Profundo + 1.0} until={K.Traga - 0.1} x={1030} y={610} texto="tu piel por dentro" lado="izq" color={KC.texto} tam={28} />
      </Escena>
      {/* 4 · la vena se traga la luz roja */}
      <Escena T={T} a={K.Traga} b={K.Menos} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <CortePiel T={T}><VenaCorte x={700} y={860} T={T} /></CortePiel>
          <Rayo d="M 520 470 L 620 640 L 700 860" color={LUZ_ROJA} p={pr(K.Traga + 0.3, 1.2, kEase.suave)} o={1 - kprog(T, K.Traga + 2.2, K.Traga + 3.0)} />
          <circle cx={700} cy={860} r={60 + 40 * pr(K.Traga + 1.5, 0.6)} fill={LUZ_ROJA} opacity={0.5 * kprog(T, K.Traga + 1.4, K.Traga + 1.7) * (1 - kprog(T, K.Traga + 1.9, K.Traga + 2.8))} />
          <Onomato T={T} at={K.Traga + 1.5} dur={1.6} x={360} y={950} texto="¡GLUP!" color={KC.yellow} tam={120} />
        </Lienzo>
        <Etq T={T} at={K.Traga + 0.6} until={K.Menos - 0.1} x={830} y={980} texto="vena" lado="der" color={KC.gold2} />
        <Chip T={T} at={K.Traga + 1.0} until={K.Menos - 0.1} texto="la sangre se traga la luz roja" x={650} y={420} tam={38} borde={LUZ_ROJA} />
      </Escena>
      {/* 5 · de la vena regresa menos rojo que de la piel de al lado */}
      <Escena T={T} a={K.Menos} b={K.Pregunta} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <CortePiel T={T}><VenaCorte x={760} y={860} T={T} /></CortePiel>
          <Rayo d="M 230 640 L 300 760 L 250 860 L 330 800 L 300 640" color={LUZ_ROJA} p={pr(K.Menos + 0.2, 0.9, kEase.suave)} grosor={10} />
          <FlechaRecta x1={300} y1={630} x2={300} y2={420} p={pr(K.Menos + 1.0, 0.6)} color={LUZ_ROJA} grosor={34} punta={60} />
          <Rayo d="M 700 640 L 740 760" color={LUZ_ROJA} p={pr(K.Menos + 0.4, 0.6, kEase.suave)} grosor={10} />
          <FlechaRecta x1={790} y1={630} x2={790} y2={480} p={pr(K.Menos + 1.6, 0.6)} color={LUZ_ROJA} grosor={9} punta={28} />
        </Lienzo>
        <Etq T={T} at={K.Menos + 1.3} until={K.Pregunta - 0.1} x={350} y={480} texto="piel de al lado" lado="der" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Menos + 2.0} until={K.Pregunta - 0.1} x={760} y={600} texto="sobre la vena" lado="izq" color={KC.gold2} tam={30} />
        <Chip T={T} at={K.Menos + 2.0} until={K.Pregunta - 0.1} texto="de la vena regresa MENOS rojo" x={540} y={1130} tam={38} borde={LUZ_ROJA} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Compara} />
      {/* 7 · tu cerebro compara con la piel de alrededor */}
      <Escena T={T} a={K.Compara} b={K.Estudio} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={120} y={500} width={840} height={400} rx={30} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
          <rect x={120} y={660} width={840} height={80} fill="#938fa3" opacity={pr(K.Compara + 0.3, 0.6)} />
          <rect x={120} y={500} width={840} height={400} rx={30} fill="none" stroke={KC.ink} strokeWidth={10} />
          {(() => { const s = pr(K.Compara + 2.6, 0.9, kEase.suave); return <g opacity={s}>
            <rect x={300} y={940} width={480} height={230} rx={24} fill="#8a8a8a" stroke={KC.ink} strokeWidth={9} />
            <text x={540} y={1000} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto}>sola: no es azul</text>
            <rect x={360} y={1030} width={360} height={80} fill="#938fa3" stroke={KC.ink} strokeWidth={5} transform={`translate(0 ${(1 - s) * -300})`} />
          </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Compara + 0.6} until={K.Estudio - 0.1} texto="junto a la piel: se ve azulado" x={540} y={420} tam={40} borde={VENA_VISTA} />
        <Etq T={T} at={K.Compara + 1.2} until={K.Estudio - 0.1} x={990} y={700} texto="la vena" lado="izq" color={KC.ink} tam={30} />
      </Escena>
      {/* 8 · el estudio de 1996 */}
      <Escena T={T} a={K.Estudio} b={K.Hondo} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g opacity={pr(K.Estudio + 2.6, 0.5)}>
            <rect x={120} y={600} width={840} height={520} rx={28} fill={DERMIS} stroke={KC.ink} strokeWidth={10} />
            <rect x={120} y={600} width={840} height={60} rx={20} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
            <path d="M 470 420 L 610 420 L 580 600 L 500 600 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
            <rect x={460} y={380} width={160} height={60} rx={14} fill={KC.ink} />
            <FotonesPiel T={T} x0={120} y0={620} w={840} h={500} p={pr(K.Estudio + 3.0, 0.6)} />
          </g>
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.6} anio="1996" quien="Alwin Kienle · Alemania y Canadá" revista="Applied Optics" x={540} y={760} />
        <Chip T={T} at={K.Estudio + 3.2} until={K.Hondo - 0.1} texto="cómo viaja la luz en la piel" x={540} y={1180} tam={38} borde={KC.ink} />
      </Escena>
      {/* 9 · la profundidad: si la vena está muy honda, casi no se distingue */}
      <Escena T={T} a={K.Hondo} b={K.Muneca} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        {(() => { const h = pr(K.Hondo + 0.8, 2.6, kEase.suave), vy = klerp(760, 1060, h), vis = klerp(1, 0.12, h);
          return <Lienzo>
            <rect x={140} y={400} width={800} height={150} rx={22} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
            <rect x={140} y={448} width={800} height={54} fill={VENA_VISTA} opacity={vis} />
            <rect x={140} y={400} width={800} height={150} rx={22} fill="none" stroke={KC.ink} strokeWidth={8} />
            <CortePiel T={T}><VenaCorte x={540} y={vy} rx={110} ry={70} T={T} /></CortePiel>
            <path d={`M 540 ${vy - 80} L 540 560`} stroke={KC.texto} strokeWidth={4} strokeDasharray="10 10" opacity={0.6} />
          </Lienzo>; })()}
        <Etq T={T} at={K.Hondo + 0.4} until={K.Muneca - 0.1} x={950} y={380} texto="lo que ves" lado="izq" color={KC.texto} tam={28} />
        <Chip T={T} at={K.Hondo + 2.6} until={K.Muneca - 0.1} texto="muy honda: casi no se distingue" x={540} y={595} tam={38} borde={KC.gold} />
      </Escena>
      {/* 10 · las que mejor ves: muñeca y dorso de la mano */}
      <Escena T={T} a={K.Muneca} b={K.Sangre} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo><g transform={`translate(0 ${(1 - pr(K.Muneca, 0.6, kEase.rebote)) * 500})`}><ManoDorso x={560} y={1010} s={1.05} T={T} /></g></Lienzo>
        <Chip T={T} at={K.Muneca + 0.5} until={K.Sangre - 0.1} texto="cerca de la superficie" x={540} y={400} tam={42} borde={VENA_VISTA} />
        <Etq T={T} at={K.Muneca + 2.6} until={K.Sangre - 0.1} x={400} y={1100} texto="muñeca" lado="izq" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Muneca + 3.4} until={K.Sangre - 0.1} x={700} y={860} texto="dorso de la mano" lado="der" color={KC.ink} tam={26} />
      </Escena>
      {/* 11 · cuando te sacan sangre: roja oscura */}
      <Escena T={T} a={K.Sangre} b={K.Cierre} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><g transform={`rotate(${Math.sin(T * 2) * 2} 560 800)`}><TuboSangre x={560} y={480} llen={pr(K.Sangre + 0.3, 1.6, kEase.suave) * 0.8} T={T} /></g></Lienzo>
        <Chip T={T} at={K.Sangre + 1.2} until={K.Cierre - 0.1} texto="roja oscura" x={250} y={760} tam={42} borde={SANGRE} />
        <MitoTachado T={T} at={K.Sangre + 2.0} tacharEn={K.Sangre + 2.7} until={K.Cierre - 0.1} texto="sangre azul" x={250} y={900} tam={42} />
      </Escena>
      {/* 12 · cierre: la misma muñeca, ahora con la luz explicada */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Antebrazo x={620} y={1000} T={T} />
          <Rayo d="M 1000 360 L 470 960" color={LUZ_ROJA} grosor={10} p={pr(K.Cierre + 0.3, 0.6)} />
          <Rayo d="M 1040 420 L 560 950 L 700 760" color={LUZ_AZUL} grosor={10} p={pr(K.Cierre + 0.5, 0.8)} />
        </Lienzo>
        <Lupa T={T} at={K.Cierre + 0.4} until={K.Outro + 0.6} x={300} y={500} r={175} fx={420} fy={975} tinte={KC.red} etiqueta="POR DENTRO · TU VENA"
          interior={(t, r) => <VenaDentro t={t} r={r} texto="sigue roja" />} />
        <Chip T={T} at={K.Cierre + 1.0} until={K.Outro - 0.1} texto="no son azules" x={760} y={330} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Oscura - 0.1} texto="No es azul: *es roja oscura.*" />
      <Subtitulo T={T} idx={1} at={K.Oscura + 0.1} until={K.Truco - 0.1} texto="Menos oxígeno: *más oscura.*" />
      <Subtitulo T={T} idx={2} at={K.Truco + 0.1} until={K.Profundo - 0.1} texto="Lo azul: *un truco.*" />
      <Subtitulo T={T} idx={3} at={K.Profundo + 0.1} until={K.Traga - 0.1} texto="La roja entra *más hondo.*" />
      <Subtitulo T={T} idx={4} at={K.Traga + 0.1} until={K.Menos - 0.1} texto="La sangre *se traga la roja.*" />
      <Subtitulo T={T} idx={5} at={K.Menos + 0.1} until={K.Pregunta - 0.1} texto="Regresa *menos rojo.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Compara - 0.1} texto="¿Por qué *la ves azul?*" />
      <Subtitulo T={T} idx={7} at={K.Compara + 0.1} until={K.Estudio - 0.1} texto="Tu cerebro *compara.*" />
      <Subtitulo T={T} idx={8} at={K.Estudio + 0.1} until={K.Hondo - 0.1} texto="1996: *Alwin Kienle.*" />
      <Subtitulo T={T} idx={9} at={K.Hondo + 0.1} until={K.Muneca - 0.1} texto="Muy honda: *casi no se ve.*" />
      <Subtitulo T={T} idx={10} at={K.Muneca + 0.1} until={K.Sangre - 0.1} texto="Muñeca y mano: *cerca.*" />
      <Subtitulo T={T} idx={11} at={K.Sangre + 0.1} until={K.Cierre - 0.1} texto="Sale *roja oscura.*" />
      <Subtitulo T={T} idx={12} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Es tu piel *con la luz.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Oscura + 0.8, K.Truco - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Profundo + 1.0, K.Traga - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Traga + 1.4, K.Menos - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Compara + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Compara + 1.8, K.Estudio - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Estudio + 3.0, K.Hondo - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Hondo + 1.0, K.Muneca - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Muneca + 1.2, K.Sangre - 0.2, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Sangre + 0.6, K.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Cierre + 0.8, K.Outro - 0.1, 'avatar_11_sorprendido', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="58" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function VenasAzulesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VenasAzules /></CompositionStage></div>;
}
window.VenasAzulesApp = VenasAzulesApp;
