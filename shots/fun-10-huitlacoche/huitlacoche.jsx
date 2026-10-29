// Shot Fungi Mati #10 · Ese elote no está podrido: el huitlacoche (Ustilago maydis) — NARRADO (gancho 1 "Esto no es X: es Y" + N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Viaje: elote en la milpa (macro) → pelos, hifas, células del grano y esporas (micro, fondo oscuro) → el mismo elote junto a la quesadilla.

const HC = { grano:'#ffd23f', grano2:'#f2b705', hoja:'#5cbf4a', hoja2:'#3f9a35', pelo:'#e9c46a', pelo2:'#b5652b', tortilla:'#f3d18e', comal:'#2c2b30', espora:'#4a2f1d' };

// Agallas: [dx, dy, radio] (coordenadas locales del elote).
const AGALLAS = [[-30, -70, 78], [42, -30, 84], [-42, 30, 80], [36, 80, 70], [-28, 130, 62], [70, -110, 52], [-82, -10, 58], [6, 10, 66]];
function Agalla({ x, y, r, oscuro = 0, seed = 1 }) {
  if (r <= 1) return null;
  const g = krng(seed), base = mixHex('#d9dce0', '#3b3537', oscuro), sombra = mixHex('#a9adb4', '#231e1f', oscuro);
  const d = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2, rr = r * (0.9 + g() * 0.14); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g>
    <path d={d} fill={base} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${x - r * 0.5} ${y + r * 0.55} Q ${x + r * 0.3} ${y + r * 0.85} ${x + r * 0.7} ${y + r * 0.3}`} stroke={sombra} strokeWidth={r * 0.18} fill="none" strokeLinecap="round" opacity=".7" />
    <ellipse cx={x - r * 0.3} cy={y - r * 0.35} rx={r * 0.28} ry={r * 0.16} fill="#fff" opacity={0.75 * (1 - oscuro * 0.7)} transform={`rotate(-30 ${x - r * 0.3} ${y - r * 0.35})`} />
  </g>;
}
// Hoja del totomoxtle (base en 0,0, apunta hacia arriba).
const HOJA = 'M -72 0 Q -128 -330 -8 -700 Q 28 -380 72 0 Z';
// Elote de frente. abre 0..1 (hojas se abren), agalla 0..1 (las agallas crecen), oscuro 0..1 (gris → negro), pelos 0..1.
function Elote({ T, x, y, s = 1, abre = 1, agalla = 1, oscuro = 0, pelos = 1, herida = 0 }) {
  const filas = 18, granos = [];
  for (let r = 0; r < filas; r++) {
    const yy = -300 + r * 36, hw = 104 * (1 - Math.pow((r - 8.5) / 10, 2) * 0.55);
    for (let c = -2; c <= 2; c++) {
      const xx = c * hw * 0.4, enAgalla = agalla > 0.25 && AGALLAS.some(([ax, ay, ar]) => Math.hypot(xx - ax, yy - ay) < ar * 0.85 * agalla);
      if (!enAgalla) granos.push(<ellipse key={r * 10 + c} cx={xx} cy={yy} rx={hw * 0.19} ry={16} fill={(r + c) % 3 ? HC.grano : HC.grano2} stroke={KC.ink} strokeWidth={3.5} />);
    }
  }
  const ang = (k) => klerp(k, k * 12, kEase.sale(abre));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-26} y={300} width={52} height={130} rx={12} fill={HC.hoja2} stroke={KC.ink} strokeWidth={6} />
    {[-6, 6, -3.5, 3.5].map((k, i) => <path key={i} d={HOJA} transform={`translate(0 330) rotate(${ang(k)}) scale(${i < 2 ? 1 : 0.92})`} fill={i < 2 ? HC.hoja2 : HC.hoja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {/* pelos (estigmas) */}
    {pelos > 0 && Array.from({ length: 16 }, (_, i) => { const u = i / 15 - 0.5, L = 220 * pelos, sw = mece(T, i + 2, 0.6) * 18;
      return <path key={i} d={`M ${u * 50} -350 Q ${u * 140 + sw} ${-350 - L * 0.55} ${u * 260 + sw * 2} ${-350 - L}`} stroke={i % 3 ? HC.pelo : HC.pelo2} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
    <path d="M -110 -20 Q -112 -330 0 -372 Q 112 -330 110 -20 Q 108 300 0 330 Q -108 300 -110 -20 Z" fill="#f7e7a1" stroke={KC.ink} strokeWidth={7} />
    {granos}
    {agalla > 0 && AGALLAS.map(([ax, ay, ar], i) => <Agalla key={i} x={ax} y={ay} r={ar * kEase.rebote(kclamp(agalla * 1.25 - i * 0.04, 0, 1))} oscuro={oscuro} seed={i + 3} />)}
    {/* hojas de enfrente: tapan el elote cerrado y se abren */}
    {[-1, 1].map((sg) => <path key={sg} d={HOJA} transform={`translate(${sg * 10} 330) rotate(${sg * klerp(2, 62, kEase.sale(abre))}) scale(${klerp(1, 0.85, abre)})`} fill={HC.hoja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {herida > 0 && <path d="M 60 -60 L 84 -20 L 64 10 L 92 50 L 70 90" stroke="#7a3b1c" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${herida * 220} 400`} />}
  </g>;
}
// Comal con quesadilla. relleno 0..1 = cuánto huitlacoche se asoma.
function Quesadilla({ T, x, y, s = 1, relleno = 1, vapor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={290} ry={74} fill={HC.comal} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={30} rx={250} ry={52} fill="#45444b" />
    <path d="M -210 30 Q -200 -170 0 -180 Q 200 -170 210 30 Z" fill={HC.tortilla} stroke={KC.ink} strokeWidth={7} />
    {[[-110, -90, 18], [40, -130, 14], [120, -50, 20], [-30, -40, 12], [-150, -20, 10]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#c98a3c" opacity=".7" />)}
    {relleno > 0 && <path d={`M -200 30 Q -150 ${30 + 34 * relleno} -90 ${30 + 18 * relleno} Q -30 ${30 + 40 * relleno} 30 ${30 + 20 * relleno} Q 100 ${30 + 38 * relleno} 200 30 Z`} fill="#2a2224" stroke={KC.ink} strokeWidth={5} />}
    {relleno > 0.4 && [-120, -20, 80].map((a, i) => <path key={i} d={`M ${a} 34 q 10 ${24 * relleno} 22 0`} stroke="#fffbe8" strokeWidth={7} fill="none" strokeLinecap="round" />)}
    {vapor > 0 && [-90, 10, 110].map((a, i) => { const u = (T * 0.5 + i / 3) % 1; return <path key={i} d={`M ${a} ${-200 - u * 120} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.6 * vapor} />; })}
  </g>;
}
// Teliospora: esfera café oscura con espinitas.
function Espora({ x, y, r = 30, rot = 0, s = 1 }) {
  if (s <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * r * 0.92} y1={Math.sin(a) * r * 0.92} x2={Math.cos(a) * r * 1.16} y2={Math.sin(a) * r * 1.16} stroke="#2a1a10" strokeWidth={Math.max(2, r * 0.07)} strokeLinecap="round" />; })}
    <circle r={r} fill={HC.espora} stroke="#1a100a" strokeWidth={Math.max(2, r * 0.08)} />
    {Array.from({ length: 10 }, (_, i) => { const a = i * 2.4, q = 0.35 + (i % 3) * 0.2; return <circle key={i} cx={Math.cos(a) * r * q} cy={Math.sin(a) * r * q} r={r * 0.06} fill="#7a5236" />; })}
    <ellipse cx={-r * 0.35} cy={-r * 0.38} rx={r * 0.26} ry={r * 0.14} fill="#c9a07a" opacity=".55" transform={`rotate(-35 ${-r * 0.35} ${-r * 0.38})`} />
  </g>;
}
// Jeringa que apunta hacia abajo; (x, y) = punta de la aguja.
function Jeringa({ x, y, empuje = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-4} y={-90} width={8} height={90} fill="#cfd6dd" stroke={KC.ink} strokeWidth={3} />
    <rect x={-34} y={-330} width={68} height={240} rx={10} fill="rgba(220,240,255,.85)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-28} y={-300 + empuje * 150} width={56} height={200 - empuje * 150} fill="#b9b2a8" opacity=".85" />
    <rect x={-10} y={-430 + empuje * 150} width={20} height={110} fill="#e8eef3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-46} y={-440 + empuje * 150} width={92} height={18} rx={8} fill="#e8eef3" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Báscula de cocina con plato.
function Bascula({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={0} width={400} height={170} rx={30} fill="#ff6b5a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={40} width={240} height={80} rx={14} fill="#1b2a22" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={102} textAnchor="middle" style={{ font:`700 54px ${KF.mono}` }} fill="#7dffb0">131 g</text>
    <ellipse cx={0} cy={-6} rx={250} ry={40} fill="#e9edf2" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Plántula de maíz con agallitas en las hojas.
function Plantula({ T, x, y, s = 1, tumores = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={0} width={260} height={150} rx={20} fill="#c0702a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-20} width={300} height={40} rx={14} fill="#d98a3c" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -20 L 0 -330" stroke={HC.hoja2} strokeWidth={18} strokeLinecap="round" />
    {[[-1, -120], [1, -200], [-1, -270]].map(([sg, yy], i) => <path key={i} d={`M 0 ${yy} Q ${sg * 120} ${yy - 120 + mece(T, i + 1, 0.5) * 6} ${sg * 230} ${yy - 40}`} stroke={HC.hoja} strokeWidth={26} fill="none" strokeLinecap="round" />)}
    {tumores > 0 && [[-120, -195, 22], [140, -275, 26], [-170, -330, 18], [0, -300, 20]].map(([a, b, r], i) => <Agalla key={i} x={a} y={b} r={r * kEase.rebote(kclamp(tumores * 1.4 - i * 0.12, 0, 1))} oscuro={0.15} seed={i + 20} />)}
  </g>;
}
// Contador de días.
function Dias({ T, at, until, hasta = 14, x, y }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), d = Math.round(klerp(1, hasta, kprog(T, at, at + 1.6, kEase.suave)));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`700 26px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, letterSpacing:'.1em' }}>DÍAS DESPUÉS DE INOCULAR</div>
    <div style={{ display:'inline-block', marginTop:8, font:`400 120px/1 ${KF.titulo}`, color:KC.ink, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:20, padding:'6px 34px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
      {d >= 12 ? `12–14` : d}</div>
  </div>;
}

function HuitlacocheShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, En: CUES.Entra, H: CUES.Hifas, A: CUES.Agalla, P: CUES.Pregunta, Es: CUES.Esporas, E: CUES.Estudio, Co: CUES.Cosecha, Sa: CUES.Sabor, Ef: CUES.Enfermedad, Mo: CUES.Modelo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre = kprog(T, K.G + 0.25, K.G + 1.3);
  const hifa = kprog(T, K.H + 0.3, K.H + 2.8, kEase.suave);
  const celulas = kprog(T, K.A + 0.3, K.A + 2.4, kEase.suave);
  const MICRO = K.A + 2.6;
  const infla = kprog(T, MICRO + 0.2, MICRO + 1.8, kEase.rebote);
  const SILK = 'M 940 260 C 760 520 700 700 600 860 S 470 1000 430 1040';
  const MXK = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [60 + a * 0.96, 640 + b * 0.96]; };
  const NOMBRES = [['cuitlacoche', 'náhuatl', -98.2, 19.3, 250, 900], ['ta’ chak', 'maya', -89.0, 20.7, 820, 880], ['bia’huí’', 'zapoteco', -96.7, 17.0, 430, 1150]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: el elote se abre y salen bolas grises; va a tu quesadilla */}
      <Escena T={T} a={K.G} b={K.En} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Elote T={T} x={380} y={880} s={0.8} abre={abre} agalla={kprog(T, K.G + 0.6, K.G + 1.8)} oscuro={0.1} />
          {T > K.G + 3.9 && <g opacity={kprog(T, K.G + 3.9, K.G + 4.3)}><Quesadilla T={T} x={800} y={1080} s={0.78} relleno={kprog(T, K.G + 4.4, K.G + 5.2)} /></g>}
        </>)}
      </Escena>
      {/* 3 · entra por los pelos sin polinizar, o por heridas de granizo o viento */}
      <Escena T={T} a={K.En} b={K.H} zoom={0.06} origen="50% 30%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Elote T={T} x={470} y={1340} s={1.45} abre={0} agalla={0} herida={kprog(T, K.En + 3.0, K.En + 3.6)} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.En + 0.2 + i * 0.12, u = kprog(T, t0, t0 + 1.4, kEase.sale); const g = krng(i + 7); const xx = 300 + g() * 380, yy = klerp(260, 560 + g() * 200, u);
            return u > 0 ? <ellipse key={i} cx={xx + Math.sin(T * 2 + i) * 8} cy={yy} rx={11} ry={7} fill="#f6f1e6" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 40} ${xx} ${yy})`} /> : null; })}
          {T > K.En + 2.5 && Array.from({ length: 16 }, (_, i) => { const t0 = K.En + 2.5 + (i % 8) * 0.15 + Math.floor(i / 8) * 0.6; const u = (T - t0) / 0.7; if (u < 0 || u > 1) return null; const xx = 640 + (i * 53) % 360;
            return <circle key={i} cx={xx - u * 80} cy={klerp(200, 1200, u)} r={13} fill="#ffffff" stroke={KC.ink} strokeWidth={3} />; })}
          {T > K.En + 2.4 && [0, 1, 2].map((i) => { const u = ((T - K.En - 2.4) * 1.3 + i / 3) % 1; return <path key={i} d={`M ${1080 - u * 700} ${700 + i * 90} q -60 -20 -120 0`} stroke="#ffffff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.8} />; })}
        </>)}
      </Escena>
      {/* 4 · micro: las hifas entran al pelo y bajan al grano */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <ellipse cx={400} cy={1080} rx={230} ry={190} fill={mixHex(HC.grano, '#b8b0a0', kprog(T, K.H + 2.6, K.H + 3.4))} stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={340} cy={1030} rx={70} ry={40} fill="#fff" opacity=".35" />
          <path d={SILK} stroke={KC.ink} strokeWidth={128} fill="none" strokeLinecap="round" />
          <path d={SILK} stroke={HC.pelo} strokeWidth={116} fill="none" strokeLinecap="round" />
          <path d={SILK} stroke="#f6dc94" strokeWidth={60} fill="none" strokeLinecap="round" opacity=".6" />
          <path d={SILK} stroke="#c99a3a" strokeWidth={112} fill="none" strokeDasharray="4 70" opacity=".7" />
          {[[-14, 0], [16, 0.12]].map(([dx, d0], i) => { const p = kclamp((hifa - d0) / (1 - d0), 0, 1); return p > 0 ? <g key={i}><path d={SILK} transform={`translate(${dx} ${dx * 0.6})`} pathLength={1} stroke={KC.ink} strokeWidth={21} fill="none" strokeLinecap="round" strokeDasharray={`${p} 2`} /><path d={SILK} transform={`translate(${dx} ${dx * 0.6})`} pathLength={1} stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={`${p} 2`} style={{ filter:'drop-shadow(0 0 8px #fff4d6)' }} /></g> : null; })}
          {[[960, 230], [905, 240], [985, 280]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={22} ry={12} fill="#f6f1e6" stroke={KC.ink} strokeWidth={3} transform={`rotate(${30 + i * 50} ${a} ${b})`} />)}
        </>)}
      </Escena>
      {/* 5a · micro: las células del grano crecen y se dividen de más */}
      <Escena T={T} a={K.A} b={MICRO} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <defs><clipPath id="hgrano"><circle cx={540} cy={870} r={320} /></clipPath></defs>
          <circle cx={540} cy={870} r={330} fill="#3a3320" stroke={HC.grano} strokeWidth={10} />
          <g clipPath="url(#hgrano)">
            {Array.from({ length: 64 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8), g = krng(i + 40); const tipo = (c + r * 3) % 3; const k = tipo === 0 ? 1 + 0.55 * celulas : 1;
              const cx = 225 + c * 90 + (r % 2) * 20, cy = 555 + r * 90, w = 80 * k, h = 80 * k * (0.9 + g() * 0.15);
              return <g key={i}>
                <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={18} fill={tipo === 0 ? mixHex('#f2d36b', '#f6e39a', celulas) : '#e9c24f'} stroke={KC.ink} strokeWidth={5} />
                {tipo === 1 && celulas > 0.2 && <line x1={cx} y1={cy - h / 2 + 6} x2={cx} y2={cy + h / 2 - 6} stroke={KC.ink} strokeWidth={5} opacity={kprog(celulas, 0.2, 0.5)} />}
                {tipo === 1 && celulas > 0.6 && <line x1={cx - w / 2 + 6} y1={cy} x2={cx + w / 2 - 6} y2={cy} stroke={KC.ink} strokeWidth={4} opacity={kprog(celulas, 0.6, 0.9)} />}
                <circle cx={cx + 8} cy={cy - 6} r={9 * k} fill="#b07a2a" opacity=".8" />
              </g>; })}
            <path d="M 160 600 C 300 640 330 760 470 800 S 700 900 900 860" stroke="#fff4d6" strokeWidth={9} fill="none" strokeLinecap="round" opacity=".9" />
            <path d="M 250 1080 C 360 980 520 1000 620 900 S 800 700 920 660" stroke="#fff4d6" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".8" />
          </g>
        </>)}
      </Escena>
      {/* 5b · macro: el grano se hincha como globo */}
      <Escena T={T} a={MICRO} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={60} y={940} width={960} height={190} rx={60} fill="#f7e7a1" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 8 }, (_, i) => i === 3 ? null : <ellipse key={i} cx={130 + i * 117} cy={1035} rx={52} ry={66} fill={i % 2 ? HC.grano : HC.grano2} stroke={KC.ink} strokeWidth={6} />)}
          <Agalla x={481} y={klerp(1035, 900, infla)} r={klerp(58, 200, infla)} oscuro={0.08} seed={5} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y por qué se pone negro? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Agalla x={300} y={560} r={130} oscuro={kprog(T, K.P + 0.2, K.P + 1.6)} seed={5} />
          <Interrogacion T={T} x={300} y={1170} tam={480} />
        </>)}
      </Escena>
      {/* 7 · micro: la agalla se llena de esporas oscuras, redondas y con espinitas */}
      <Escena T={T} a={K.Es} b={K.E} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <circle cx={430} cy={820} r={320} fill={mixHex('#cfd2d6', '#2a2224', kprog(T, K.Es + 0.4, K.Es + 3.0))} stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 46 }, (_, i) => { const g = krng(i + 90); const a = g() * Math.PI * 2, rr = Math.sqrt(g()) * 280; const s = kprog(T, K.Es + 0.3 + i * 0.05, K.Es + 0.6 + i * 0.05, kEase.rebote);
            return <Espora key={i} x={430 + Math.cos(a) * rr} y={820 + Math.sin(a) * rr} r={20} rot={i * 23} s={s} />; })}
          {[[830, 640, 70], [870, 860, 62], [790, 1060, 66]].map(([a, b, r], i) => <Espora key={i} x={a + Math.sin(T * 1.3 + i) * 6} y={b} r={r} rot={T * 8 + i * 40} s={kprog(T, K.Es + 1.6 + i * 0.25, K.Es + 2.0 + i * 0.25, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 8 · el estudio: inoculan a propósito los pelos de elotes */}
      <Escena T={T} a={K.E} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={800} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
          {[170, 400, 630, 860].map((x, i) => <Elote key={i} T={T} x={x} y={1160} s={0.5} abre={0} agalla={0} />)}
          {(() => { const u = kprog(T, K.E + 0.8, K.E + 5.4); const k = Math.min(3, Math.floor(u * 4)), f = (u * 4) % 1; const xs = [170, 400, 630, 860];
            const sx = klerp(xs[k], xs[Math.min(3, k + 1)], kEase.suave(kprog(f, 0.6, 1))); const baja = Math.sin(Math.PI * kprog(f, 0, 0.6)) * 50;
            return u > 0 && u < 1 ? <Jeringa x={sx} y={930 + baja} empuje={u} /> : null; })()}
          {[170, 400, 630, 860].map((x, i) => { const on = kprog(T, K.E + 0.8 + i * 1.15 + 0.35, K.E + 0.8 + i * 1.15 + 0.6, kEase.rebote); return on > 0 ? <circle key={i} cx={x} cy={960} r={16 * on} fill="#fff4d6" stroke={KC.ink} strokeWidth={3} /> : null; })}
        </>)}
      </Escena>
      {/* 9 · la cosecha: hasta 131 g por mazorca */}
      <Escena T={T} a={K.Co} b={K.Sa} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bascula x={540} y={1010} />
          {[[-120, -40, 60], [-30, -60, 72], [70, -46, 64], [150, -30, 50], [20, -120, 58], [-90, -110, 46]].map(([a, b, r], i) => <Agalla key={i} x={540 + a} y={1010 + b - (1 - kprog(T, K.Co + 0.2 + i * 0.1, K.Co + 0.6 + i * 0.1, kEase.sale)) * 500} r={r} oscuro={0.2} seed={i + 30} />)}
        </>)}
      </Escena>
      {/* 10 · a los 12–14 días no servía: sin esporas, sin color ni sabor */}
      <Escena T={T} a={K.Sa} b={K.Ef} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Agalla x={430} y={950} r={190} oscuro={0} seed={9} />
          <circle cx={430} cy={950} r={110} fill="#f4f1ea" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Sa + 1.6, K.Sa + 2.0)} />
          <Sello T={T} at={K.Sa + 2.4} x={640} y={800} texto="NO" color={KC.red} r={100} />
        </>)}
      </Escena>
      {/* 11 · en casi todo el mundo una enfermedad; en México, un manjar con nombre en muchas lenguas */}
      <Escena T={T} a={K.Ef} b={K.Mo} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {T < K.Ef + 2.9 && <g opacity={1 - kprog(T, K.Ef + 2.4, K.Ef + 2.9)}>
            <circle cx={480} cy={880} r={300} fill="#4aa8ff" stroke={KC.ink} strokeWidth={9} />
            <path d="M 260 720 Q 330 640 420 700 Q 470 780 400 840 Q 330 900 280 840 Z M 520 640 Q 640 600 700 690 Q 720 800 620 820 Q 540 760 520 640 Z M 470 930 Q 560 900 640 980 Q 650 1080 560 1120 Q 480 1060 470 930 Z" fill={HC.hoja} stroke={KC.ink} strokeWidth={6} />
            {[[340, 760], [620, 720], [560, 1010], [300, 960]].map(([a, b], i) => <g key={i} transform={`translate(${a} ${b}) scale(${kprog(T, K.Ef + 0.3 + i * 0.15, K.Ef + 0.6 + i * 0.15, kEase.rebote)})`}>
              <circle r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><text y={14} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill="#fff">!</text></g>)}
          </g>}
          {T > K.Ef + 2.4 && <g opacity={kprog(T, K.Ef + 2.4, K.Ef + 2.9)}>
            <MapaMexico x={60} y={640} ancho={960} />
            {NOMBRES.map(([n, l, lon, lat, tx, ty], i) => { const [px, py] = MXK(lon, lat); const on = kprog(T, K.Ef + 2.9 + i * 0.45, K.Ef + 3.3 + i * 0.45, kEase.rebote); return on > 0 ? <g key={i}>
              <line x1={px} y1={py} x2={tx} y2={ty} stroke={KC.ink} strokeWidth={5} opacity={on > 0.5 ? 1 : 0} />
              <circle cx={px} cy={py} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
              <g transform={`translate(${tx} ${ty}) scale(${on})`}>
                <rect x={-150} y={-50} width={300} height={100} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
                <text y={-4} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{n}</text>
                <text y={34} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#6a5f55">{l}</text>
              </g></g> : null; })}
          </g>}
        </>)}
      </Escena>
      {/* 12 · modelo de laboratorio */}
      <Escena T={T} a={K.Mo} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Petri x={330} y={900} r={240}>
            {[[-90, -60, 1], [60, -90, 2], [80, 60, 3], [-60, 90, 4], [0, 0, 5]].map(([a, b, sd], i) => <Colonia key={i} cx={a} cy={b} r={52 * kprog(T, K.Mo + 0.3 + i * 0.15, K.Mo + 1.6 + i * 0.15)} color="#f6eedb" seed={sd} />)}
          </Petri>
          <Plantula T={T} x={810} y={1030} s={0.75} tumores={kprog(T, K.Mo + 1.4, K.Mo + 2.6)} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo elote del inicio, ahora junto a la quesadilla */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Elote T={T} x={380} y={880} s={0.8} abre={1} agalla={1} oscuro={0.1} />
          <Quesadilla T={T} x={800} y={1080} s={0.78} relleno={1} />
          {(() => { const u = kprog(T, K.C + 0.6, K.C + 1.6, kEase.suave); return u > 0 && u < 1 ? <Agalla x={klerp(380, 800, u)} y={klerp(860, 1060, u) - Math.sin(Math.PI * u) * 220} r={klerp(50, 30, u)} oscuro={0.1} seed={4} /> : null; })()}
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 1.9} until={K.G + 2.5} texto="¿podrido?" x={380} y={400} tam={52} />
      <Chip T={T} at={K.G + 2.7} until={K.En - 0.3} texto="✓ un manjar" x={380} y={400} tam={46} borde={KC.leaf} />
      <Etq T={T} at={K.G + 3.0} until={K.G + 4.2} x={530} y={800} texto="grano + hongo" tam={32} />
      <Etq T={T} at={K.G + 4.6} until={K.N} x={640} y={890} texto="quesadilla" tam={32} />
      <Etq T={T} at={K.N + 0.2} until={K.En - 0.3} x={540} y={760} texto="huitlacoche" tam={40} />
      <Etq T={T} at={K.N + 0.7} until={K.En - 0.3} x={540} y={820} texto="Ustilago maydis" it tam={36} />
      <Etq T={T} at={K.N + 1.2} until={K.En - 0.3} x={540} y={880} texto="maíz: Zea mays" tam={28} />
      <Chip T={T} at={K.En + 0.8} until={K.En + 2.5} texto="pelos sin polinizar" x={400} y={460} tam={42} borde={HC.pelo} />
      <Etq T={T} at={K.En + 1.2} until={K.En + 2.5} x={420} y={640} texto="pelos (estigmas)" tam={30} lado="izq" />
      <Chip T={T} at={K.En + 2.7} until={K.H - 0.3} texto="o heridas: granizo, viento" x={400} y={460} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.En + 3.4} until={K.H - 0.3} x={640} y={1180} texto="herida" tam={32} lado="izq" />
      <Etq T={T} at={K.H + 0.4} until={K.A - 0.3} x={820} y={420} texto="pelo (estigma)" tam={30} color={HC.pelo} lado="izq" />
      <Etq T={T} at={K.H + 1.2} until={K.A - 0.3} x={500} y={760} texto="hifas" tam={36} color="#fff4d6" lado="izq" />
      <Etq T={T} at={K.H + 2.2} until={K.A - 0.3} x={660} y={1100} texto="grano (ovario)" tam={30} color={HC.grano} />
      <Chip T={T} at={K.A + 0.2} until={MICRO - 0.2} texto="AL MICROSCOPIO · dentro del grano" x={540} y={410} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.A + 0.9} until={MICRO - 0.2} x={60} y={490} texto="células más grandes" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.A + 1.5} until={MICRO - 0.2} x={1020} y={490} texto="y más divisiones" tam={28} color={KC.gold2} lado="izq" />
      <Etq T={T} at={MICRO + 0.4} until={K.P - 0.3} x={700} y={850} texto="agalla" tam={36} />
      <Etq T={T} at={MICRO + 0.4} until={K.P - 0.3} x={330} y={900} texto="granos" tam={30} lado="izq" />
      <Chip T={T} at={K.Es + 0.2} until={K.E - 0.3} texto="AL MICROSCOPIO · dentro de la agalla" x={500} y={410} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.Es + 2.4} until={K.E - 0.3} x={730} y={1140} texto="teliosporas" tam={34} color={KC.texto} lado="izq" />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.1} anio="2003" quien="Universidad de Illinois" revista="Pataky y Chandler · Mycologia, 2003" x={420} y={480} />
      <Chip T={T} at={K.E + 3.4} until={K.Co - 0.3} texto="inoculan a propósito los pelos" x={400} y={470} tam={36} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Co + 0.3} until={K.Sa - 0.3} valor={131} dur={0.9} sufijo=" g" etiqueta="hasta" x={380} y={560} tam={200} color={KC.gold2} />
      <Chip T={T} at={K.Co + 1.0} until={K.Sa - 0.3} texto="de huitlacoche por mazorca" x={400} y={760} tam={36} borde={KC.ink} />
      <Dias T={T} at={K.Sa + 0.2} until={K.Ef - 0.3} hasta={14} x={400} y={500} />
      <Chip T={T} at={K.Sa + 3.0} until={K.Ef - 0.3} texto="sin esporas: le falta color y sabor" x={430} y={680} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ef + 0.2} until={K.Ef + 2.5} texto="en casi todo el mundo: enfermedad" x={460} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ef + 2.6} until={K.Mo - 0.3} texto="en México: un manjar" x={400} y={470} tam={42} borde={KC.leaf} />
      <Chip T={T} at={K.Mo + 0.3} until={K.C - 0.3} texto="organismo modelo de laboratorio" x={420} y={470} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Mo + 1.0} until={K.C - 0.3} x={330} y={640} texto="colonias del hongo" tam={30} />
      <Etq T={T} at={K.Mo + 2.0} until={K.C - 0.3} x={960} y={1150} texto="agallas en la planta" tam={30} lado="izq" />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no está podrido: es huitlacoche" x={400} y={420} tam={36} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.En} texto="10 cm" largo={270} />
      <BarraEscala T={T} at={K.En} until={K.H} texto="5 cm" largo={250} />
      <BarraEscala T={T} at={K.H} until={K.A} texto="20 µm" largo={80} />
      <BarraEscala T={T} at={K.A} until={MICRO} texto="100 µm" largo={180} />
      <BarraEscala T={T} at={MICRO} until={K.P} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Es} until={K.E} texto="10 µm" largo={155} />
      <BarraEscala T={T} at={K.E} until={K.Co} texto="10 cm" largo={190} />
      <BarraEscala T={T} at={K.Co} until={K.Sa} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Sa} until={K.Ef} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Ef} until={K.Ef + 2.6} texto="5,000 km" largo={235} />
      <BarraEscala T={T} at={K.Ef + 2.6} until={K.Mo} texto="500 km" largo={110} />
      <BarraEscala T={T} at={K.Mo} until={K.C} texto="5 cm" largo={260} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={270} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No está podrido: *es un manjar.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.En - 0.1} texto="Huitlacoche: *Ustilago maydis.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.H - 0.1} texto="Entra por los *pelos del elote.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.A - 0.1} texto="Las hifas *infectan el grano.*" />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="El grano *se hincha como globo.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Por qué *se pone negro?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.E - 0.1} texto="Se llena de *esporas oscuras.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Co - 0.1} texto="2003, Illinois: *a propósito.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.Sa - 0.1} texto="Hasta *131 gramos* por mazorca." />
      <Subtitulo T={T} idx={9} at={K.Sa + 0.1} until={K.Ef - 0.1} texto="Sin esporas, *sin color ni sabor.*" />
      <Subtitulo T={T} idx={10} at={K.Ef + 0.1} until={K.Mo - 0.1} texto="En México: *un manjar.*" />
      <Subtitulo T={T} idx={11} at={K.Mo + 0.1} until={K.C - 0.1} texto="Un *modelo* de laboratorio." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No está podrido: *es huitlacoche.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.3, K.En + 2.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A + 2.8, K.P - 0.05, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 2.6, K.E + 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.E + 3.2, K.Co + 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Sa + 0.4, K.Sa + 4.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ef + 2.8, K.Mo - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Mo + 0.3, K.Mo + 4.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuitlacocheApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HuitlacocheShot /></CompositionStage></div>;
}
window.HuitlacocheApp = HuitlacocheApp;
