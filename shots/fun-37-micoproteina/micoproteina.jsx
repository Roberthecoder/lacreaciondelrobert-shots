// Shot Fungi Mati #37 · Esa milanesa no es de pollo: la "carne" de hongo (micoproteína de Fusarium venenatum) — NARRADO.
// Formato N1 "Por dentro": milanesa en el plato → tanque → hifas al microscopio → fibras → la misma milanesa, por dentro.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const MI = { pan:'#e39a32', pan2:'#a8641c', miga:'#f1e2c0', hifa:'#fff1c9', hifaO:'#e7c46a', leche:'#9ccfff', musc:'#e8706a' };

// Contorno de milanesa (irregular, empanizada). Centro en (0,0), ~ 520 × 300 px.
const MILA_D = 'M -250 -20 Q -262 -110 -170 -138 Q -90 -170 0 -150 Q 90 -168 175 -132 Q 262 -100 252 -10 Q 268 80 190 122 Q 100 160 0 142 Q -110 165 -190 118 Q -268 70 -250 -20 Z';
function Milanesa({ T, x, y, s = 1, corte = 0, dentro = 0 }) {
  const g = krng(37), migas = Array.from({ length: 34 }, () => [klerp(-220, 220, g()), klerp(-120, 115, g()), 3 + g() * 5]);
  const sep = 46 * corte;
  const fibras = (w) => Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-w} ${-110 + i * 27} Q 0 ${-118 + i * 27 + (i % 2 ? 6 : -6)} ${w} ${-110 + i * 27}`} stroke="#d6bf8f" strokeWidth={4} fill="none" />);
  const mitad = (lado) => <g clipPath={`url(#mila-${lado})`}>
    <path d={MILA_D} fill={MI.pan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {migas.map(([mx, my, r], i) => <circle key={i} cx={mx} cy={my} r={r} fill={i % 3 ? MI.pan2 : '#f0c46a'} />)}
    {dentro > 0 && <g opacity={dentro}>
      <path d={MILA_D} fill="rgba(255,244,214,.82)" />
      {Array.from({ length: 16 }, (_, i) => { const yy = -125 + i * 16.5; return <g key={i}>
        <path d={`M -250 ${yy} Q -60 ${yy + Math.sin(i * 1.7) * 14} 250 ${yy + Math.sin(i) * 8}`} stroke={KC.ink} strokeWidth={9} fill="none" />
        <path d={`M -250 ${yy} Q -60 ${yy + Math.sin(i * 1.7) * 14} 250 ${yy + Math.sin(i) * 8}`} stroke={MI.hifaO} strokeWidth={5} fill="none" strokeDasharray={`${70 + (i % 3) * 25} 6`} />
      </g>; })}
    </g>}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <clipPath id="mila-i"><rect x={-300} y={-200} width={340} height={400} /></clipPath>
      <clipPath id="mila-d"><rect x={40} y={-200} width={300} height={400} /></clipPath>
    </defs>
    {mitad('i')}
    <g transform={`translate(${sep} 0)`}>{mitad('d')}</g>
    {corte > 0.05 && <g>
      <rect x={40} y={-150} width={sep} height={292} fill={MI.miga} stroke={KC.ink} strokeWidth={5} />
      <g transform={`translate(${40 + sep / 2} 0) scale(${sep / 300} 1)`}>{fibras(150)}</g>
    </g>}
  </g>;
}
function Plato({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={420} ry={170} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={0} rx={420} ry={165} fill="#ffffff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={0} rx={320} ry={118} fill="#f3f1ec" stroke="#cfcac0" strokeWidth={5} />
  </g>;
}
function Tenedor({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-16} y={-470} width={32} height={300} rx={14} fill="#d7dce3" stroke={KC.ink} strokeWidth={7} />
    <path d="M -46 -180 L 46 -180 L 40 -110 L -40 -110 Z" fill="#e6e9ee" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-36, -12, 12, 36].map((dx, i) => <rect key={i} x={dx - 7} y={-112} width={14} height={112} rx={6} fill="#eef1f5" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Puntos a lo largo de una curva cuadrática.
function qpt(x1, y1, cx, cy, x2, y2, u) { const a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u; return [a * x1 + b * cx + c * x2, a * y1 + b * cy + c * y2]; }
// Hifa al microscopio: tubo largo, poco ramificado, con tabiques (septos). crece 0..1.
function Hifa({ x1, y1, x2, y2, curva = 0, w = 40, crece = 1, septo = 110, color = MI.hifa }) {
  if (crece <= 0) return null;
  const mx = (x1 + x2) / 2 - (y2 - y1) * curva, my = (y1 + y2) / 2 + (x2 - x1) * curva;
  const N = 40, n = Math.max(2, Math.round(N * crece));
  const pts = Array.from({ length: n + 1 }, (_, i) => qpt(x1, y1, mx, my, x2, y2, (i / N)));
  const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const L = Math.hypot(x2 - x1, y2 - y1), ns = Math.floor(L * crece / septo);
  const sep = Array.from({ length: ns }, (_, k) => { const u = ((k + 0.6) * septo) / L; const [px, py] = qpt(x1, y1, mx, my, x2, y2, u); const [qx, qy] = qpt(x1, y1, mx, my, x2, y2, Math.min(1, u + 0.01));
    const ang = Math.atan2(qy - py, qx - px) + Math.PI / 2, h = w * 0.42; return <line key={k} x1={px - Math.cos(ang) * h} y1={py - Math.sin(ang) * h} x2={px + Math.cos(ang) * h} y2={py + Math.sin(ang) * h} stroke="#b9975a" strokeWidth={Math.max(2, w * 0.12)} strokeLinecap="round" />; });
  const [ex, ey] = pts[pts.length - 1];
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={w + Math.max(4, w * 0.2)} fill="none" strokeLinecap="round" />
    <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" />
    <path d={d} stroke="rgba(255,255,255,.55)" strokeWidth={w * 0.18} fill="none" strokeLinecap="round" transform={`translate(0 ${-w * 0.2})`} />
    {sep}
    {crece < 1 && <circle cx={ex} cy={ey} r={w * 0.52} fill="#fffbe9" />}
  </g>;
}
// Madeja de hifas (para el tanque y el calor).
function Madeja({ T, x, y, s = 1, seed = 1, n = 7, color = MI.hifa }) {
  const g = krng(seed);
  const hs = Array.from({ length: n }, () => { const a = g() * Math.PI, L = 70 + g() * 60; return [Math.cos(a) * L, Math.sin(a) * L, g() * 0.4 - 0.2, g() * 6]; });
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8 + seed) * 8})`}>
    {hs.map(([dx, dy, c, f], i) => <Hifa key={i} x1={-dx} y1={-dy} x2={dx} y2={dy} curva={c + Math.sin(T * 1.5 + f) * 0.05} w={12} septo={46} color={color} />)}
  </g>;
}
// Tanque de fermentación (esquema de un fermentador de circulación por aire): columna con tubo interior y burbujas.
function Tanque({ T, x, y, s = 1, hifas = 1 }) {
  const bur = Array.from({ length: 16 }, (_, i) => { const u = ((T * 0.45 + i / 16) % 1); return <circle key={i} cx={-40 + (i % 4) * 26 + Math.sin(T * 5 + i) * 6} cy={430 - u * 760} r={9 + (i % 3) * 3} fill="#ffffff" opacity={0.75 * (1 - u * 0.6)} stroke="rgba(0,0,0,.25)" strokeWidth={2} />; });
  const frag = Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.18 + i / 10) % 1); const ang = u * Math.PI * 2;
    const px = Math.cos(ang) * 180, py = Math.sin(ang) * 300; return <g key={i} transform={`translate(${px} ${py}) rotate(${ang * 57 + i * 40})`} opacity={hifas}><path d="M -26 0 Q 0 -12 26 0" stroke={KC.ink} strokeWidth={11} fill="none" strokeLinecap="round" /><path d="M -26 0 Q 0 -12 26 0" stroke={MI.hifa} strokeWidth={6} fill="none" strokeLinecap="round" /></g>; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -360 Q -230 -470 0 -480 Q 230 -470 230 -360 L 230 420 Q 230 500 0 505 Q -230 500 -230 420 Z" fill="#cfd6de" stroke={KC.ink} strokeWidth={10} />
    <path d="M -205 -340 Q -205 -440 0 -452 Q 205 -440 205 -340 L 205 410 Q 205 476 0 480 Q -205 476 -205 410 Z" fill="#f2e3a6" opacity=".95" />
    <rect x={-70} y={-300} width={140} height={680} rx={10} fill="rgba(255,255,255,.25)" stroke="#8a929c" strokeWidth={8} />
    {frag}{bur}
    <rect x={-250} y={-150} width={500} height={14} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
    <rect x={-250} y={150} width={500} height={14} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
    <path d="M -60 505 L -60 560 L 60 560 L 60 505" fill="#9aa3ad" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Tubo de entrada con gotitas que avanzan.
function Tubo({ T, x1, y1, x2, y2, color, on = 1 }) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  return <g opacity={on}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e9eef3" strokeWidth={22} strokeLinecap="round" />
    {Array.from({ length: Math.floor(L / 60) }, (_, i) => { const u = ((T * 0.8 + i * 60 / L) % 1); return <circle key={i} cx={klerp(x1, x2, u)} cy={klerp(y1, y2, u)} r={8} fill={color} />; })}
  </g>;
}
// Termómetro.
function Termometro({ x, y, nivel = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-420} width={60} height={440} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={40} r={56} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-14} y={20 - 400 * nivel} width={28} height={400 * nivel + 20} rx={14} fill={KC.red} />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={30} y1={-60 - k * 80} x2={56} y2={-60 - k * 80} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Persona con pesas (ícono).
function Pesista({ x, y, s = 1, color = '#8fb6ff', on = 1 }) {
  if (on <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * on})`}>
    <line x1={-46} y1={-30} x2={46} y2={-30} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <rect x={-58} y={-46} width={14} height={32} rx={4} fill="#55606c" stroke={KC.ink} strokeWidth={4} />
    <rect x={44} y={-46} width={14} height={32} rx={4} fill="#55606c" stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-62} r={24} fill="#f2c29b" stroke={KC.ink} strokeWidth={5} />
    <path d="M -34 30 Q -36 -22 0 -24 Q 36 -22 34 30 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Vaso con bebida.
function Vaso({ x, y, color, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -70 L 40 -70 L 30 60 L -30 60 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -36 -30 L 36 -30 L 30 56 L -30 56 Z" fill={color} />
  </g>;
}
// Camarón de perfil, con el caparazón resaltado.
function Camaron({ T, x, y, s = 1, brillo = 0 }) {
  const segs = [0, 1, 2, 3, 4, 5];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1].map((k) => <path key={k} d={`M 150 -40 Q 260 ${-140 - k * 30 + Math.sin(T * 3 + k) * 10} 320 ${-60 - k * 50}`} stroke={KC.ink} strokeWidth={5} fill="none" />)}
    {segs.map((i) => { const a = -0.2 + i * 0.36, r = 150, cx = Math.cos(a) * r * 0.9 - 20, cy = Math.sin(a) * r * 0.75;
      return <ellipse key={i} cx={cx} cy={cy} rx={66 - i * 6} ry={52 - i * 5} transform={`rotate(${a * 57 + 90} ${cx} ${cy})`} fill={mixHex('#ff9a7a', '#ffd166', brillo)} stroke={KC.ink} strokeWidth={6} />; })}
    <ellipse cx={130} cy={-20} rx={80} ry={56} fill={mixHex('#ff8a66', '#ffd166', brillo)} stroke={KC.ink} strokeWidth={6} />
    <circle cx={170} cy={-38} r={10} fill={KC.ink} />
    <path d="M -40 150 L -120 200 L -100 120 Z" fill="#ff8a66" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={60 - k * 30} y1={40 + k * 10} x2={40 - k * 30} y2={80 + k * 10} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Fibra de músculo (esquema): cilindro con estrías.
function FibraMusculo({ x, y, largo = 380, alto = 34 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-alto / 2} width={largo} height={alto} rx={alto / 2} fill={MI.musc} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor(largo / 16) }, (_, i) => <line key={i} x1={10 + i * 16} y1={-alto / 2 + 5} x2={10 + i * 16} y2={alto / 2 - 5} stroke="#b84a46" strokeWidth={4} />)}
  </g>;
}
// Nota en lugar de barra de escala.
function NotaEscala({ T, at, until, texto = 'esquemático, no a escala' }) {
  if (T < at || T > until) return null;
  const o = kprog(T, at, at + 0.3) * (1 - kprog(T, until - 0.3, until));
  return <div style={{ position:'absolute', left:60, top:1440, zIndex:40, opacity:o, font:`700 26px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>{texto}</div>;
}
// Texto libre (títulos de gráfica, letreros).
function Letrero({ T, at, until, x, y, texto, tam = 34, color = KC.texto, ancho = 900, align = 'center', it = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:41, transform:`translate(${align === 'center' ? '-50%' : '0'}, -50%) translateY(${e.y * 0.4}px)`, opacity:e.o, textAlign:align,
    font:`900 ${tam}px/1.15 ${KF.texto}`, fontStyle: it ? 'italic' : 'normal', color, textShadow:KSOMBRA }}>{texto}</div>;
}

function MicoproteinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, S: CUES.Suelo, Ta: CUES.Tanque, D: CUES.Duplica, Ca: CUES.Calor, P: CUES.Pregunta, Hi: CUES.Hifas, F: CUES.Fibras, E: CUES.Estudio, M: CUES.Musculo, Q: CUES.Quitina, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el tenedor baja y corta (0.3 → 0.9 s)
  const baja = kprog(T, K.G + 0.2, K.G + 0.75, kEase.sale), sube = kprog(T, K.G + 1.0, K.G + 1.6, kEase.suave);
  const corte = kprog(T, K.G + 0.6, K.G + 1.2, kEase.sale);
  // fibras: las hifas se alinean en haces
  const alinea = kprog(T, K.F + 0.2, K.F + 2.0, kEase.suave);
  const gF = krng(81), HF = Array.from({ length: 14 }, (_, i) => ({ y0: klerp(620, 1060, gF()), a0: klerp(-0.9, 0.9, gF()), x0: klerp(140, 900, gF()), L: klerp(420, 640, gF()) }));
  const PET = Array.from({ length: 21 }, (_, i) => [130 + (i % 7) * 82, 640 + Math.floor(i / 7) * 92]);
  const COL = [KC.pink, KC.mint, '#fff4d6', KC.lilac, KC.orange, '#9be37a', KC.cyan];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tenedor corta la "milanesa" y por dentro se ve fibrosa */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato x={500} y={1010} />
          <Milanesa T={T} x={480} y={990} s={1} corte={corte} />
          <Tenedor x={545 + 46 * corte * 0.5} y={klerp(380, 900, baja) - sube * 520} rot={8} s={1} />
          <Sello T={T} at={K.G + 2.4} x={290} y={740} texto="HONGO" color={KC.leaf} r={115} />
        </>)}
      </Escena>
      {/* 2 · es micoproteína: por dentro, hilos de hongo */}
      <Escena T={T} a={K.H} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<><Plato x={520} y={1110} s={0.85} /><Milanesa T={T} x={500} y={1095} s={0.85} corte={1} /></>)}
        <Lupa T={T} at={K.H + 0.4} until={K.S - 0.2} x={540} y={660} r={200} fx={560} fy={1090} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · hifas"
          interior={(Tl, r) => fsvg(<g>
            <rect x={0} y={0} width={2 * r} height={2 * r} fill={KC.noche} />
            {[[20, 120, 420, 90, 0.08], [0, 220, 440, 250, -0.06], [40, 330, 400, 300, 0.1], [90, 40, 360, 400, 0.12]].map(([a, b, c, d, cu], i) =>
              <Hifa key={i} x1={a} y1={b} x2={c} y2={d} curva={cu + Math.sin(Tl + i) * 0.02} w={26} septo={80} crece={kprog(Tl, K.H + 0.6 + i * 0.15, K.H + 1.6 + i * 0.15)} />)}
          </g>)} />
      </Escena>
      {/* 3 · salió de un campo inglés, tras probar más de 3,000 microbios del suelo */}
      <Escena T={T} a={K.S} b={K.Ta}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {PET.map(([px, py], i) => { const on = kprog(T, K.S + 0.4 + i * 0.09, K.S + 0.7 + i * 0.09, kEase.rebote); const elegida = i === 10, gl = elegida ? kprog(T, K.S + 2.8, K.S + 3.2) : 0;
            return on > 0 ? <g key={i} transform={`translate(${px} ${py}) scale(${on * (1 + gl * 0.35)})`} style={gl ? { filter:`drop-shadow(0 0 ${18 * gl}px ${KC.yellow})` } : null}>
              <circle r={36} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={5} /><circle r={30} fill="#f5e7b8" />
              <Colonia cx={0} cy={0} r={12 + (i % 4) * 4} color={elegida ? MI.hifa : COL[i % COL.length]} seed={i + 2} />
              {gl > 0 && <circle r={44} fill="none" stroke={KC.yellow} strokeWidth={7} />}
            </g> : null; })}
          <rect x={0} y={1000} width={KW} height={600} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={985} width={KW} height={30} fill={FK.pasto} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 24 }, (_, i) => <path key={i} d={`M ${i * 46} 990 l 10 -34 l 10 34`} fill={FK.pasto} stroke={KC.ink} strokeWidth={3} />)}
          {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={(i * 137) % 1040 + 20} cy={1060 + (i * 53) % 160} r={6 + (i % 3) * 3} fill={FK.tierra2} />)}
          <g transform={`translate(260 ${940 - 30 * (1 - kprog(T, K.S + 0.2, K.S + 0.6, kEase.rebote))})`} opacity={kprog(T, K.S + 0.2, K.S + 0.4)}>
            <path d="M 0 40 Q -40 -10 -40 -40 A 40 40 0 1 1 40 -40 Q 40 -10 0 40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={-40} r={14} fill="#fff" />
          </g>
        </>)}
      </Escena>
      {/* 4–5 · tanque de fermentación; duplica su masa */}
      <Escena T={T} a={K.Ta} b={K.Ca}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Tubo T={T} x1={-20} y1={700} x2={330} y2={700} color={KC.yellow} on={kprog(T, K.Ta + 1.2, K.Ta + 1.6)} />
          <Tubo T={T} x1={-20} y1={1000} x2={330} y2={1000} color={KC.lilac} on={kprog(T, K.Ta + 1.8, K.Ta + 2.2)} />
          <Tanque T={T} x={560} y={900} s={1} hifas={1 - kprog(T, K.D - 0.3, K.D)} />
          {T > K.D - 0.4 && <g opacity={kprog(T, K.D - 0.4, K.D)}>
            <circle cx={560} cy={860} r={200} fill={KC.noche} stroke={KC.ink} strokeWidth={10} />
            {(() => { const n = T < K.D + 0.8 ? 1 : T < K.D + 1.6 ? 2 : 4; const pos = { 1: [[560, 860]], 2: [[490, 860], [630, 860]], 4: [[490, 790], [630, 790], [490, 930], [630, 930]] }[n];
              const k = n === 1 ? 1 : n === 2 ? kprog(T, K.D + 0.8, K.D + 1.1, kEase.rebote) : kprog(T, K.D + 1.6, K.D + 1.9, kEase.rebote);
              return pos.map(([px, py], i) => <Madeja key={n + '-' + i} T={T} x={px} y={py} s={(n === 1 ? 0.9 : n === 2 ? 0.6 : 0.42) * (i === 0 ? 1 : k)} seed={i + 3} />); })()}
          </g>}
        </>)}
      </Escena>
      {/* 6 · lo calientan para bajarle el ARN */}
      <Escena T={T} a={K.Ca} b={K.P}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Termometro x={170} y={1060} nivel={kprog(T, K.Ca + 0.3, K.Ca + 2.0, kEase.sale) * 0.8} />
          <circle cx={560} cy={820} r={210} fill={KC.noche} stroke={KC.ink} strokeWidth={10} />
          <Madeja T={T} x={560} y={820} s={1.0} seed={9} color={mixHex(MI.hifa, '#ffe0a0', kprog(T, K.Ca + 1, K.Ca + 3))} />
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Ca + 1.2 + i * 0.32, u = kprog(T, t0, t0 + 2.2); if (u <= 0 || u >= 1) return null;
            return <text key={i} x={500 + (i % 3) * 60 + u * (i % 2 ? 90 : -60)} y={800 - u * 300} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.red} stroke={KC.ink} strokeWidth={2} opacity={1 - u}>ARN</text>; })}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.Hi} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Interrogacion T={T} x={290} y={1000} color={KC.yellow} /><g opacity={0.95}><Milanesa T={T} x={300} y={1130} s={0.5} /></g></>)}
      </Escena>
      {/* 8–9 · al microscopio: hifas largas, poco ramificadas, con tabiques; luego se alinean en haces */}
      <Escena T={T} a={K.Hi} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {T < K.F + 0.2 && <g opacity={1 - kprog(T, K.F - 0.1, K.F + 0.2)}>
            <Hifa x1={-40} y1={620} x2={1120} y2={690} curva={0.04} w={40} crece={kprog(T, K.Hi + 0.2, K.Hi + 1.6)} />
            <Hifa x1={-40} y1={860} x2={1120} y2={800} curva={-0.05} w={40} crece={kprog(T, K.Hi + 0.5, K.Hi + 1.9)} />
            <Hifa x1={-40} y1={1000} x2={1120} y2={1040} curva={0.03} w={40} crece={kprog(T, K.Hi + 0.8, K.Hi + 2.2)} />
            <Hifa x1={600} y1={705} x2={880} y2={540} curva={0.05} w={36} crece={kprog(T, K.Hi + 1.4, K.Hi + 2.4)} />
            {/* medida del grosor */}
            {T > K.Hi + 2.2 && <g opacity={kprog(T, K.Hi + 2.2, K.Hi + 2.5)}>
              <line x1={330} y1={580} x2={330} y2={750} stroke={KC.yellow} strokeWidth={5} />
              <line x1={300} y1={640} x2={360} y2={640} stroke={KC.yellow} strokeWidth={6} /><line x1={300} y1={684} x2={360} y2={684} stroke={KC.yellow} strokeWidth={6} />
            </g>}
          </g>}
          {T >= K.F - 0.1 && <g opacity={kprog(T, K.F - 0.1, K.F + 0.3)}>
            {HF.map((h, i) => { const a = klerp(h.a0, 0, alinea), yy = klerp(h.y0, 680 + (i % 7) * 22 + Math.floor(i / 7) * 175, alinea), xx = klerp(h.x0, 330 + (i % 3) * 30, alinea);
              const L = klerp(h.L, 640, alinea) / 2; return <Hifa key={i} x1={xx - Math.cos(a) * L} y1={yy - Math.sin(a) * L} x2={xx + Math.cos(a) * L} y2={yy + Math.sin(a) * L} curva={0.03 * (1 - alinea)} w={17} septo={52} />; })}
            {Array.from({ length: 16 }, (_, i) => { const on = kprog(T, K.F + 2.6 + i * 0.06, K.F + 2.9 + i * 0.06, kEase.rebote); return on > 0 ? <circle key={i} cx={110 + (i % 8) * 85} cy={712 + Math.floor(i / 8) * 175 + (i % 2) * 44} r={13 * on} fill="rgba(255,255,255,.85)" stroke="rgba(0,0,0,.4)" strokeWidth={2} /> : null; })}
            <g opacity={kprog(T, K.F + 1.6, K.F + 2.1)}>
              {[0, 1, 2].map((k) => <FibraMusculo key={k} x={130} y={1100 + k * 36} largo={720} alto={32} />)}
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 10–11 · el estudio de Exeter (2020) y su resultado */}
      <Escena T={T} a={K.E} b={K.Q}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.M + 0.2 && <g opacity={1 - kprog(T, K.M - 0.2, K.M + 0.2)}>
            {Array.from({ length: 20 }, (_, i) => { const on = kprog(T, K.E + 3.0 + i * 0.08, K.E + 3.3 + i * 0.08, kEase.rebote);
              return <Pesista key={i} x={110 + (i % 10) * 90} y={840 + Math.floor(i / 10) * 150} s={0.82} on={on} color="#ffffff" />; })}
            
          </g>}
          {T > K.M - 0.2 && <g opacity={kprog(T, K.M - 0.2, K.M + 0.3)}>
            <line x1={140} y1={1030} x2={640} y2={1030} stroke={KC.ink} strokeWidth={8} />
            {(() => { const u = kprog(T, K.M + 0.6, K.M + 2.4, kEase.sale); const hM = 400 * u, hL = (400 / 2.2) * u;
              return <><rect x={190} y={1030 - hM} width={150} height={hM} fill={KC.gold2} stroke={KC.ink} strokeWidth={7} />
                <rect x={430} y={1030 - hL} width={150} height={hL} fill={MI.leche} stroke={KC.ink} strokeWidth={7} /></>; })()}
          </g>}
        </>)}
      </Escena>
      {/* 12 · un tercio de su fibra es quitina, como en el caparazón del camarón */}
      <Escena T={T} a={K.Q} b={K.C}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.Q + 0.3, K.Q + 1.5, kEase.sale), cx = 300, cy = 800, r = 190; const a1 = -Math.PI / 2 + u * (2 * Math.PI / 3);
            return <g>
              <circle cx={cx} cy={cy} r={r} fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
              {u > 0 && <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />}
            </g>; })()}
          <Camaron T={T} x={640} y={900} s={kprog(T, K.Q + 2.0, K.Q + 2.5, kEase.rebote) * 1.15} brillo={kprog(T, K.Q + 2.8, K.Q + 3.3)} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma milanesa del inicio, ahora por dentro: hilos de hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato x={500} y={1010} />
          <Milanesa T={T} x={480} y={990} s={1} corte={1} dentro={kprog(T, K.C + 0.6, K.C + 1.8, kEase.suave)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.9} until={K.H - 0.3} texto="¿pollo?" x={290} y={560} tam={58} />
      <Etq T={T} at={K.H + 0.6} until={K.S - 0.3} x={1050} y={985} lado="izq" texto="micoproteína" tam={36} color={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.S - 0.3} x={60} y={405} texto="Fusarium venenatum" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.H + 1.8} until={K.S - 0.3} texto="no es un champiñón: es un hongo de filamentos" x={540} y={340} tam={28} borde={KC.ink} />
      <Letrero T={T} at={K.S + 0.4} until={K.Ta - 0.3} x={60} y={470} ancho={620} align="left" texto="más de" tam={36} color={KC.ink} />
      {T < K.Ta - 0.2 && <Contador T={T} at={K.S + 0.5} hasta={3000} dur={2.2} sufijo=" microbios" x={350} y={530} tam={56} color={KC.ink} />}
      <Etq T={T} at={K.S + 0.6} until={K.Ta - 0.3} x={320} y={880} texto="un campo · Buckinghamshire, Reino Unido" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 2.9} until={K.Ta - 0.3} x={40} y={1140} texto="Fusarium venenatum" it tam={34} color={KC.yellow} />
      <Chip T={T} at={K.Ta + 0.3} until={K.D - 0.3} texto="tanque de fermentación" x={540} y={330} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ta + 1.3} until={K.D - 0.3} x={30} y={650} texto="glucosa" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ta + 1.9} until={K.D - 0.3} x={30} y={950} texto="amonio" tam={34} color={KC.ink} />
      <Cronometro T={T} at={K.D} until={K.Ca - 0.3} factor={14400 / 2.25} etiqueta="≈3.5–4.1 h · DATO DE 2004" x={400} y={370} />
      <Etq T={T} at={K.D + 0.2} until={K.Ca - 0.3} x={40} y={1110} texto="dentro del tanque" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 0.6} until={K.P - 0.3} x={240} y={600} texto="~72 °C" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.4} until={K.P - 0.3} texto="menos ARN → seguro en las pruebas" x={540} y={1100} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Hi + 0.2} until={K.F - 0.3} texto="AL MICROSCOPIO · hifas" x={540} y={470} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.Hi + 2.3} until={K.F - 0.3} x={380} y={580} texto="3–5 µm de grueso" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.Hi + 1.0} until={K.F - 0.3} x={1040} y={900} lado="izq" texto="tabique (septo)" tam={30} />
      <Etq T={T} at={K.Hi + 1.6} until={K.F - 0.3} x={40} y={1100} texto="hifa de Fusarium venenatum" it tam={30} />
      <Etq T={T} at={K.F + 0.8} until={K.E - 0.3} x={40} y={630} texto="haz de hifas" tam={32} color={KC.yellow} />
      <Etq T={T} at={K.F + 1.9} until={K.E - 0.3} x={40} y={1052} texto="fibras de músculo (esquema)" tam={30} color={MI.musc} />
      <Etq T={T} at={K.F + 2.8} until={K.E - 0.3} x={1040} y={1052} lado="izq" texto="clara de huevo" tam={30} color="#ffffff" />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2020" quien="Universidad de Exeter, Reino Unido · 20 hombres jóvenes" revista="Am J Clin Nutr, 2020" y={560} />
      <Letrero T={T} at={K.E + 3.4} until={K.M - 0.3} x={60} y={1062} ancho={960} texto="20 pesistas · cada uno: micoproteína o leche" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 4.6} until={K.Q - 0.3} texto="una sola toma · igual leucina, más proteína en la de hongo" x={540} y={1160} tam={25} borde={KC.ink} />
      <Letrero T={T} at={K.M + 0.2} until={K.Q - 0.3} x={60} y={560} ancho={600} align="left" texto="Aumento en la fabricación de proteína del músculo" tam={36} color={KC.ink} />
      <Letrero T={T} at={K.M + 1.0} until={K.Q - 0.3} x={265} y={1068} ancho={260} texto="micoproteína" tam={28} color={KC.ink} />
      <Letrero T={T} at={K.M + 1.0} until={K.Q - 0.3} x={505} y={1068} ancho={200} texto="leche" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 2.4} until={K.Q - 0.3} texto="en ese estudio" x={840} y={880} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Q + 1.0} until={K.C - 0.3} x={330} y={560} texto="1/3 quitina" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Q + 1.3} until={K.C - 0.3} x={60} y={1030} texto="2/3 β-glucanos" tam={32} color={KC.ink} />
      <Letrero T={T} at={K.Q + 0.2} until={K.C - 0.3} x={60} y={470} ancho={600} align="left" texto="Fibra de la micoproteína" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Q + 2.8} until={K.C - 0.3} x={1040} y={1130} lado="izq" texto="caparazón: quitina" tam={32} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="hongo del suelo, hilo por hilo" x={360} y={560} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.C + 1.0} until={K.Ou} x={60} y={760} texto="POR DENTRO · hifas" tam={30} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={200} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.S} texto="5 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.Ta} texto="10 cm" largo={160} />
      <NotaEscala T={T} at={K.Ta} until={K.P} />
      <BarraEscala T={T} at={K.Hi} until={K.F} texto="5 µm" largo={50} />
      <BarraEscala T={T} at={K.F} until={K.E} texto="50 µm (hifas)" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={200} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es pollo: *es hongo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.S - 0.1} texto="Micoproteína, de *Fusarium venenatum.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.Ta - 0.1} texto="Más de *3,000 microbios* probados." />
      <Subtitulo T={T} idx={3} at={K.Ta + 0.1} until={K.D - 0.1} texto="Crece en *tanques de fermentación.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.Ca - 0.1} texto="Duplica su masa en *unas 4 horas.*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.P - 0.1} texto="Menos ARN: *seguro en las pruebas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Hi - 0.1} texto="¿Cómo se siente *como carne?*" />
      <Subtitulo T={T} idx={7} at={K.Hi + 0.1} until={K.F - 0.1} texto="Hifas de *unas 4 milésimas de mm.*" />
      <Subtitulo T={T} idx={8} at={K.F + 0.1} until={K.E - 0.1} texto="Fibras parecidas *a las del músculo.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.M - 0.1} texto="2020, Exeter: *20 hombres jóvenes.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.Q - 0.1} texto="En ese estudio: *más que con leche.*" />
      <Subtitulo T={T} idx={11} at={K.Q + 0.1} until={K.C - 0.1} texto="Un tercio de su fibra: *quitina.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo del suelo, *hilo por hilo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.S + 0.5, K.Ta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.D + 0.15, K.Ca - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ca + 0.4, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Hi + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.F + 0.5, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 3.0, K.M - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.M + 0.4, K.Q - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Q + 0.4, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="37" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MicoproteinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MicoproteinaShot /></CompositionStage></div>;
}
window.MicoproteinaApp = MicoproteinaApp;
