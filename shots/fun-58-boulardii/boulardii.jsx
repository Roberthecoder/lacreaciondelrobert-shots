// Shot Fungi Mati #58 · Este sobrecito no trae bacterias: la levadura probiótica Saccharomyces boulardii — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const BC = { piel:'#eab48c', piel2:'#c98a62', levadura:'#f6e3a4', levadura2:'#e2c46e', pan:'#df9c4f', pan2:'#f7d59a', sobre:'#ffffff' };

// Célula de levadura (ovalada, con núcleo, vacuola y una yema que brota). Largo ≈ 2·rx px.
function Levadura({ x, y, s = 1, rot = 0, yema = 0, rx = 75, ry = 60, apagada = 0, brillo = 0 }) {
  const f = mixHex(BC.levadura, '#7b7f88', apagada);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${KC.gold2})` } : null} opacity={1 - apagada * 0.4}>
    {yema > 0 && <ellipse cx={rx * 0.92 + ry * 0.38 * yema} cy={-ry * 0.25} rx={ry * 0.55 * yema} ry={ry * 0.48 * yema} fill={f} stroke={KC.ink} strokeWidth={5} />}
    <ellipse rx={rx} ry={ry} fill={f} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={rx * 0.18} cy={ry * 0.1} rx={rx * 0.34} ry={ry * 0.36} fill="#cfe6f2" stroke="rgba(0,0,0,.35)" strokeWidth={3} />
    <circle cx={-rx * 0.38} cy={-ry * 0.18} r={ry * 0.2} fill={mixHex('#b07a3a', '#5a5e66', apagada)} />
    <circle cx={-rx * 0.62} cy={ry * 0.45} r={ry * 0.08} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth={3} />
    <ellipse cx={-rx * 0.3} cy={-ry * 0.62} rx={rx * 0.3} ry={ry * 0.1} fill="#fff" opacity=".45" />
  </g>;
}
// Bolillo (pan) de perfil.
function Bolillo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 10 Q -140 -70 0 -74 Q 140 -70 150 10 Q 120 50 0 52 Q -120 50 -150 10 Z" fill={BC.pan} stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -50 Q 0 -30 60 -50" stroke={BC.pan2} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -60 -50 Q 0 -30 60 -50" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}
// Mano que sostiene algo (palma detrás, pulgar delante).
function ManoAtras({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 40 Q -150 220 -60 330 L 90 330 Q 160 220 140 40 Z" fill={BC.piel} stroke={KC.ink} strokeWidth={8} />
    {[-90, -30, 30, 90].map((dx, i) => <rect key={i} x={dx - 28} y={-60 + Math.abs(dx) * 0.25} width={56} height={150} rx={28} fill={BC.piel} stroke={KC.ink} strokeWidth={7} />)}
  </g>;
}
function PulgarDelante({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 160 Q -200 60 -150 10 Q -110 -10 -100 40 Q -95 110 -60 170 Z" fill={BC.piel} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Sobrecito rotulado «Saccharomyces boulardii». abre 0..1 = se arranca la tira de arriba. extra 0..1 = el cierre (pan + 37 °C).
function Sobre({ T, x, y, s = 1, abre = 0, extra = 0, rot = 0 }) {
  const zig = Array.from({ length: 11 }, (_, i) => `${-150 + i * 30} ${i % 2 ? -196 : -210}`).join(' L ');
  const tira = abre > 0;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -150 -190 L 150 -190 L 150 210 L -150 210 Z`} fill={BC.sobre} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-150} y={-150} width={300} height={70} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-104} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>PROBIÓTICO</text>
    <text x={0} y={-30} textAnchor="middle" style={{ font:`italic 900 31px ${KF.texto}` }} fill={KC.ink}>Saccharomyces</text>
    <text x={0} y={14} textAnchor="middle" style={{ font:`italic 900 40px ${KF.texto}` }} fill={KC.ink}>boulardii</text>
    <Levadura x={-40} y={110} s={0.55} yema={1} />
    <Levadura x={70} y={140} s={0.4} rot={30} />
    {extra > 0 && <g opacity={extra}>
      <Bolillo x={-60} y={150} s={0.42 * extra} rot={-8} />
      <g transform={`translate(80 120) scale(${extra})`}><circle r={52} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><text y={12} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">37 °C</text></g>
    </g>}
    {!tira ? <path d={`M -150 -190 L ${zig} L 150 -190 Z`} fill={BC.sobre} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      : <g transform={`translate(${abre * 260} ${-abre * 260}) rotate(${abre * 70})`} opacity={1 - kprog(abre, 0.7, 1)}><path d={`M -150 -190 L ${zig} L 150 -190 Z`} fill={BC.sobre} stroke={KC.ink} strokeWidth={6} /></g>}
  </g>;
}
// Polvito que cae del sobre abierto hacia (x, y1).
function Polvo({ T, x, y0, y1, desde, n = 26, ancho = 120, color = BC.levadura2, hasta = Infinity }) {
  if (T < desde) return null;
  const g = krng(11);
  return <g>{Array.from({ length: n }, (_, i) => { const d = g() * 1.2, xx = x + (g() - 0.5) * ancho, r = 4 + g() * 6; const u = ((T - desde - d) / 0.9);
    if (u < 0) return null; const yy = klerp(y0, y1, Math.min(1, u * u)); return <circle key={i} cx={xx + (g() - 0.5) * 40 * Math.min(1, u)} cy={yy} r={r} fill={color} stroke={KC.ink} strokeWidth={1.5} opacity={T > hasta ? 0 : 1} />; })}</g>;
}
// Montoncito de polvo.
function Monton({ x, y, k = 1 }) {
  if (k <= 0) return null;
  return <path d={`M ${x - 110 * k} ${y} Q ${x} ${y - 70 * k} ${x + 110 * k} ${y} Z`} fill={BC.levadura2} stroke={KC.ink} strokeWidth={5} />;
}
// Interior de la lupa: levaduras al microscopio.
function interiorLevaduras(T, r) {
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill={KC.noche} />
    {[[0.35, 0.4, 0.8, 20], [0.68, 0.62, 0.7, -30], [0.42, 0.78, 0.6, 60], [0.72, 0.28, 0.55, 10]].map(([u, v, k, rt], i) =>
      <Levadura key={i} x={u * r * 2 + Math.sin(T * 1.5 + i) * 6} y={v * r * 2} s={k} rot={rt} yema={i === 0 ? 0.6 + 0.4 * Math.sin(T * 2) : (i === 2 ? 0.7 : 0)} />)}
  </svg>;
}
// Lichi (rojo, cáscara rugosa) y mangostán (morado, con cáliz verde).
function Lichi({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill="#d8344a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 16 }, (_, i) => { const a = i * 2.4, rr = 22 + (i % 4) * 12; return <path key={i} d="M -7 0 L 0 -8 L 7 0 L 0 8 Z" transform={`translate(${Math.cos(a) * rr} ${Math.sin(a) * rr})`} fill="#a8203a" />; })}
    <path d="M 0 -70 Q 8 -95 22 -104" stroke="#6b4a2b" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
function Mangostan({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={78} fill="#4a1f3d" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-26} cy={-30} rx={26} ry={12} fill="#fff" opacity=".18" transform="rotate(-30 -26 -30)" />
    {[-50, -15, 15, 50].map((dx, i) => <ellipse key={i} cx={dx * 0.7} cy={-72} rx={22} ry={12} fill="#4f8a3a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${dx * 0.5} ${dx * 0.7} -72)`} />)}
    <rect x={-6} y={-112} width={12} height={34} rx={5} fill="#6b4a2b" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Tetera({ T, x, y, s = 1, vapor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.5 + i / 4) % 1); return <circle key={i} cx={-40 + i * 26 + Math.sin(T * 2 + i) * 12} cy={-170 - u * 200} r={20 + u * 26} fill="#fff" opacity={(1 - u) * 0.6 * vapor} />; })}
    <path d="M 150 -20 Q 230 -60 250 -130 L 270 -120 Q 250 -20 160 40 Z" fill="#c75b3a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -40 Q -250 -30 -230 50 Q -210 110 -140 80" stroke={KC.ink} strokeWidth={22} fill="none" />
    <path d="M -150 -40 Q -250 -30 -230 50 Q -210 110 -140 80" stroke="#c75b3a" strokeWidth={12} fill="none" />
    <path d="M -170 -60 Q -190 150 0 160 Q 190 150 170 -60 Z" fill="#e2734d" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-90} width={300} height={40} rx={18} fill="#c75b3a" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-104} r={22} fill="#c75b3a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Termómetro vertical: valor 0..1 de llenado.
function Termometro({ x, y, alto = 420, valor = 0, color = KC.red, marca }) {
  const h = (alto - 60) * valor;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-28} y={-alto} width={56} height={alto} rx={28} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-14} y={-50 - h} width={28} height={h + 20} rx={14} fill={color} />
    <circle cx={0} cy={0} r={48} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={28} x2={46} y1={-80 - i * 55} y2={-80 - i * 55} stroke={KC.ink} strokeWidth={5} />)}
    {marca && <text x={60} y={-50 - h + 12} style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>{marca}</text>}
  </g>;
}
// Silueta humana simple.
function Silueta({ x, y, s = 1, color = '#ffd9b8' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={56} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 0 L -100 -170 Q -100 -230 0 -232 Q 100 -230 100 -170 L 90 0 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Tubo de ensayo con líquido ácido y levaduras (vivas = fracción que queda).
function Tubo({ T, x, y, vivas = 1, n = 12, seed = 2 }) {
  const g = krng(seed);
  const pts = Array.from({ length: n }, () => [(g() - 0.5) * 70, -40 - g() * 300, g() * 360]);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -60 -420 L -60 -40 Q -60 40 0 40 Q 60 40 60 -40 L 60 -420" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -54 -360 L -54 -40 Q -54 34 0 34 Q 54 34 54 -40 L 54 -360 Z" fill="#ffb347" opacity=".75" />
    {Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.4 + i / 5) % 1); return <circle key={i} cx={-30 + i * 15} cy={-40 - u * 310} r={6} fill="#fff" opacity={0.7 * (1 - u)} />; })}
    {pts.map(([px, py, r], i) => { const viva = i < Math.round(n * vivas); return <Levadura key={i} x={px} y={py} s={0.24} rot={r} apagada={viva ? 0 : 1} />; })}
    <rect x={-74} y={-440} width={148} height={30} rx={10} fill="#ddd" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cápsula de antibiótico.
function Capsula({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-24} width={60} height={48} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <rect x={0} y={-24} width={60} height={48} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-44} y={-14} width={30} height={8} rx={4} fill="#fff" opacity=".5" />
  </g>;
}
// Clostridium difficile: bacilo con espora en un extremo (esquemático).
function Cdiff({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-36} width={300} height={72} rx={36} fill="#8ac06b" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={112} cy={0} rx={40} ry={30} fill="#f3f0d8" stroke={KC.ink} strokeWidth={5} />
    {[-110, -60, -10, 40].map((dx, i) => <path key={i} d={`M ${dx} -36 q -8 -30 6 -50`} stroke={KC.ink} strokeWidth={4} fill="none" />)}
  </g>;
}
// Gráfica de un efecto con su intervalo (RR y IC 95 %). Escala lineal 0..1.6.
function Intervalo({ T, at, x, y, ancho = 760, rr = 0.8, lo = 0.47, hi = 1.34 }) {
  if (T < at) return null;
  const px = (v) => x + (v / 1.6) * ancho, p = kprog(T, at, at + 0.8, kEase.sale);
  return <g opacity={kprog(T, at, at + 0.25)}>
    <rect x={x - 40} y={y - 150} width={ancho + 80} height={260} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <line x1={x} y1={y + 40} x2={x + ancho} y2={y + 40} stroke={KC.ink} strokeWidth={5} />
    {[0, 0.5, 1, 1.5].map((v) => <g key={v}><line x1={px(v)} y1={y + 32} x2={px(v)} y2={y + 48} stroke={KC.ink} strokeWidth={4} /><text x={px(v)} y={y + 86} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>)}
    <line x1={px(1)} y1={y - 110} x2={px(1)} y2={y + 40} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 8" />
    <text x={px(1) + 12} y={y - 90} style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>1 = sin efecto</text>
    <line x1={px(rr) - (px(rr) - px(lo)) * p} y1={y - 20} x2={px(rr) + (px(hi) - px(rr)) * p} y2={y - 20} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    <rect x={px(rr) - 16} y={y - 36} width={32} height={32} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={x} y={y - 100} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>adultos · 9 ensayos</text>
  </g>;
}
// Cama de hospital con paciente y catéter venoso central (esquemático).
function Hospital({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={380} y={-560} width={14} height={640} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
    <rect x={330} y={-560} width={110} height={150} rx={20} fill="rgba(220,240,255,.9)" stroke={KC.ink} strokeWidth={6} />
    <path d="M 385 -410 Q 380 -260 250 -230 Q 150 -210 60 -170" stroke="#5a7fa8" strokeWidth={7} fill="none" />
    <rect x={-420} y={-120} width={820} height={60} rx={14} fill="#c8d3de" stroke={KC.ink} strokeWidth={7} />
    <rect x={-420} y={-60} width={20} height={150} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} /><rect x={380} y={-60} width={20} height={150} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
    <rect x={-390} y={-200} width={170} height={80} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-250} cy={-210} r={60} fill={BC.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -190 -200 Q 0 -260 360 -190 L 360 -120 L -200 -120 Z" fill="#7fb8e6" stroke={KC.ink} strokeWidth={7} />
    <circle cx={60} cy={-170} r={10} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Calendario de días (los que pasan después de dejarla).
function Calendario({ T, at, x, y, dias = 5 }) {
  return <g>{Array.from({ length: dias }, (_, i) => { const on = kprog(T, at + i * 0.3, at + i * 0.3 + 0.35, kEase.rebote); if (on <= 0) return null; const quedan = Math.max(0, 4 - i);
    return <g key={i} transform={`translate(${x + i * 180} ${y}) scale(${on})`}>
      <rect x={-78} y={-110} width={156} height={220} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <rect x={-78} y={-110} width={156} height={50} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <text y={-72} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">día {i + 1}</text>
      {Array.from({ length: quedan }, (_, k) => <Levadura key={k} x={-36 + (k % 2) * 72} y={-6 + Math.floor(k / 2) * 66} s={0.33} rot={k * 40} />)}
    </g>; })}</g>;
}
// Cuadrícula de 100 personas (10×10); casos con decimal: el último se llena en parte.
function Cien({ T, at, x, y, casos, color = KC.red, paso = 40 }) {
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 100 }, (_, i) => {
    const c = i % 10, r = Math.floor(i / 10), u = kprog(T, at + i * 0.012, at + i * 0.012 + 0.3);
    const frac = kclamp(casos - i, 0, 1), on = kprog(T, at + 1.4 + i * 0.04, at + 1.6 + i * 0.04);
    return <g key={i} opacity={u}>
      <circle cx={c * paso} cy={r * paso} r={paso * 0.38} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={3} />
      {frac > 0 && on > 0 && <circle cx={c * paso} cy={r * paso} r={paso * 0.38 * Math.sqrt(frac) * on} fill={color} stroke={KC.ink} strokeWidth={frac < 1 ? 2 : 3} />}
    </g>; })}</g>;
}

function BoulardiiShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Especie, H: CUES.Historia, Ca: CUES.Calor, Ac: CUES.Acido, P: CUES.Pregunta, An: CUES.Antibioticos, L: CUES.Levadura, Es: CUES.Estudio, Li: CUES.Limite, R: CUES.Riesgo, N: CUES.NoSeQueda, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre = kprog(T, K.G + 0.25, K.G + 1.0, kEase.sale);
  const g = krng(7);
  const BACT = Array.from({ length: 34 }, (_, i) => ({ x: 80 + g() * 920, y: 560 + g() * 620, r: g() * 360, c: [KC.mint, KC.pink, KC.cyan, KC.orange, KC.lilac][i % 5], muere: g() < 0.62, d: g() }));
  const LEV = [[300, 760, 20], [700, 980, -25], [520, 1120, 50], [860, 700, 10]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el sobrecito rotulado se abre y cae polvo; la lupa muestra levaduras */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <ManoAtras x={330} y={960} />
          <Sobre T={T} x={330} y={820} s={1} abre={abre} rot={-4} />
          <PulgarDelante x={330} y={960} />
          <Polvo T={T} x={330} y0={640} y1={1170} desde={K.G + 0.6} />
          <Monton x={330} y={1190} k={kprog(T, K.G + 1.2, K.G + 2.6)} />
        </>)}
        <Lupa T={T} at={K.G + 2.2} x={760} y={930} r={160} fx={330} fy={1170} interior={interiorLevaduras} tinte={KC.gold2} etiqueta="AL MICROSCOPIO" />
      </Escena>
      {/* 2 · al microscopio: Saccharomyces boulardii, misma especie que la del pan */}
      <Escena T={T} a={K.E} b={K.H} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          {[[260, 820, 1.1, 15, 1], [520, 700, 0.9, -20, 0], [430, 1000, 1.0, 40, 0.8], [180, 1080, 0.8, -50, 0]].map(([x, y, k, r, ym], i) =>
            <Levadura key={i} x={x + Math.sin(T + i) * 8} y={y} s={k * kprog(T, K.E + i * 0.15, K.E + i * 0.15 + 0.4, kEase.rebote)} rot={r} yema={ym * kprog(T, K.E + 0.6, K.E + 2.4)} />)}
          {T > K.E + 1.6 && <g opacity={kprog(T, K.E + 1.6, K.E + 2.0)}>
            <circle cx={820} cy={1010} r={170} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
            <Bolillo x={820} y={1020} s={0.85} rot={-6} />
            <path d="M 560 900 Q 620 860 660 900" stroke={KC.gold2} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>}
        </>)}
      </Escena>
      {/* 3 · la historia: té de cáscara de lichi y mangostán */}
      <Escena T={T} a={K.H} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Lichi x={klerp(260, 430, kprog(T, K.H + 1.6, K.H + 2.6, kEase.suave))} y={klerp(700, 860, kprog(T, K.H + 1.6, K.H + 2.6, kEase.suave))} s={1.2 * kprog(T, K.H, K.H + 0.4, kEase.rebote) * (1 - 0.6 * kprog(T, K.H + 2.3, K.H + 2.7))} />
          <Mangostan x={klerp(800, 600, kprog(T, K.H + 1.8, K.H + 2.8, kEase.suave))} y={klerp(720, 860, kprog(T, K.H + 1.8, K.H + 2.8, kEase.suave))} s={1.1 * kprog(T, K.H + 0.5, K.H + 0.9, kEase.rebote) * (1 - 0.6 * kprog(T, K.H + 2.5, K.H + 2.9))} />
          <Tetera T={T} x={520} y={1080} s={1} vapor={kprog(T, K.H + 2.6, K.H + 3.2)} />
        </>)}
      </Escena>
      {/* 4 · 37 °C */}
      <Escena T={T} a={K.Ca} b={K.Ac}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Silueta x={240} y={1150} s={0.95} />
          <Termometro x={420} y={1120} valor={0.8 * kprog(T, K.Ca + 0.3, K.Ca + 1.6, kEase.sale)} marca={T > K.Ca + 1.4 ? '37 °C' : null} />
          <Bolillo x={790} y={1100} s={0.75} />
          <Termometro x={930} y={1120} alto={360} valor={0.6 * kprog(T, K.Ca + 1.4, K.Ca + 2.6, kEase.sale)} color={KC.orange} />
        </>)}
      </Escena>
      {/* 5 · pH 2: experimento de laboratorio */}
      <Escena T={T} a={K.Ac} b={K.P}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Tubo T={T} x={330} y={1150} vivas={1} />
          <Tubo T={T} x={750} y={1150} vivas={1 - 0.92 * kprog(T, K.Ac + 0.8, K.Ac + 1.8)} seed={5} />
          <text x={540} y={920} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6}>pH 2</text>
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.An} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={300} y={1080} />
          <Capsula x={200} y={1140} s={1.3} rot={-15 + Math.sin(T * 3) * 6} />
        </>)}
      </Escena>
      {/* 7–8 · en tu intestino: los antibióticos apagan bacterias; la levadura sigue */}
      <Escena T={T} a={K.An} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} color="rgba(255,200,220,.25)" />
        {fsvg(<>
          <path d="M 0 500 Q 540 440 1080 500 L 1080 520 Q 540 470 0 520 Z" fill="#c25b6a" opacity=".6" />
          <path d="M 0 1220 Q 540 1260 1080 1220 L 1080 1240 Q 540 1290 0 1240 Z" fill="#c25b6a" opacity=".6" />
          {BACT.map((b, i) => { const v = b.muere ? 1 - kprog(T, K.An + 1.8 + b.d * 1.6, K.An + 2.4 + b.d * 1.6) : 1;
            return <Bacteria key={i} T={T} seed={i} x={b.x + Math.sin(T * 0.8 + i) * 14} y={b.y + Math.cos(T * 0.7 + i) * 10} rot={b.r} s={0.35} color={b.c} vida={v} flagelo={false} />; })}
          {Array.from({ length: 5 }, (_, i) => { const u = kprog(T, K.An + 1.0 + i * 0.15, K.An + 2.4 + i * 0.15, kEase.suave); return u > 0 && u < 1 ? <Capsula key={i} x={klerp(-80, 300 + i * 160, u)} y={600 + i * 120} rot={u * 200} s={0.8} /> : null; })}
          {LEV.map(([x, y, r], i) => { const on = kprog(T, K.L + 0.2 + i * 0.2, K.L + 0.6 + i * 0.2, kEase.rebote); return on > 0 ? <Levadura key={i} x={x} y={y + Math.sin(T + i) * 8} s={1.33 * on} rx={75} ry={58} rot={r} brillo={0.8} yema={i === 1 ? 0.7 : 0} /> : null; })}
        </>)}
      </Escena>
      {/* 9 · el estudio: 21 ensayos, 18.7 → 8.5 de cada 100 */}
      <Escena T={T} a={K.Es} b={K.Li}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cien T={T} at={K.Es + 2.6} x={140} y={740} casos={18.7} color={KC.red} paso={34} />
          <Cien T={T} at={K.Es + 3.6} x={640} y={740} casos={8.5} color={KC.orange} paso={34} />
          {T > K.Es + 2.6 && <text x={293} y={695} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>sin S. boulardii</text>}
          {T > K.Es + 3.6 && <text x={793} y={695} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>con S. boulardii</text>}
          {T > K.Es + 4.4 && <text x={293} y={1130} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={3}>18.7 de 100</text>}
          {T > K.Es + 5.2 && <text x={793} y={1130} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.orange} stroke={KC.ink} strokeWidth={3}>8.5 de 100</text>}
        </>)}
      </Escena>
      {/* 10 · lo que no: C. difficile en adultos */}
      <Escena T={T} a={K.Li} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Cdiff x={400 + Math.sin(T) * 10} y={680} s={kprog(T, K.Li, K.Li + 0.5, kEase.rebote)} rot={-6} />
          <Intervalo T={T} at={K.Li + 1.4} x={160} y={950} />
        </>)}
      </Escena>
      {/* 11 · el riesgo raro: pacientes graves con catéter; abrir un sobre deja levadura en las manos */}
      <Escena T={T} a={K.R} b={K.N}>
        <FondoLunares color="#bfe9ff" />
        {fsvg(<>
          <Hospital T={T} x={560} y={1040} s={0.95} />
          {[[90, 700], [250, 700]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><ellipse rx={62} ry={44} fill={BC.piel} stroke={KC.ink} strokeWidth={6} />
            {T > K.R + 3.0 && [0, 1, 2, 3].map((k) => <circle key={k} cx={-26 + k * 17} cy={-10 + (k % 2) * 14} r={7} fill={BC.levadura2} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.R + 3.0 + k * 0.2, K.R + 3.3 + k * 0.2)} />)}</g>)}
          <g transform={`translate(170 540) rotate(-6)`}><Sobre T={T} x={0} y={0} s={0.55} abre={kprog(T, K.R + 2.2, K.R + 2.8, kEase.sale)} /></g>
          {T > K.R + 2.6 && Array.from({ length: 20 }, (_, i) => { const gg = krng(i + 40); const u = kprog(T, K.R + 2.6 + gg() * 0.8, K.R + 4.4 + gg() * 0.8, kEase.suave);
            const al = i % 4 === 0, tx = al ? 617 : 60 + gg() * 230, ty = al ? 878 : 670 + gg() * 30;
            return <circle key={i} cx={klerp(170, tx, u) + Math.sin(T * 3 + i) * 14 * (1 - u)} cy={klerp(430, ty, u) - Math.sin(u * Math.PI) * (al ? 200 : 60)} r={6} fill={BC.levadura2} stroke={KC.ink} strokeWidth={2} />; })}
        </>)}
      </Escena>
      {/* 12 · no se queda */}
      <Escena T={T} a={K.N} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Calendario T={T} at={K.N + 0.2} x={180} y={900} />)}
      </Escena>
      {/* 13 · cierre: la misma mano y el mismo sobrecito, ahora con el pan y los 37 °C */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <ManoAtras x={330} y={960} />
          <Sobre T={T} x={330} y={820} s={1} abre={1} extra={kprog(T, K.C + 0.8, K.C + 1.6, kEase.rebote)} rot={-4} />
          <PulgarDelante x={330} y={960} />
          <Monton x={330} y={1190} k={1} />
          <Levadura x={760} y={1000} s={1.4} yema={0.8} brillo={1} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.E - 0.3} texto="¿bacterias?" x={260} y={470} tam={46} />
      <Etq T={T} at={K.E + 0.6} until={K.H - 0.3} x={60} y={500} texto="levadura probiótica" tam={30} color={KC.texto} />
      <Etq T={T} at={K.E + 0.9} until={K.H - 0.3} x={60} y={550} texto="Saccharomyces boulardii" it tam={36} color={KC.gold2} />
      <Etq T={T} at={K.E + 2.0} until={K.H - 0.3} x={1040} y={1220} lado="izq" texto="misma especie: S. cerevisiae" it tam={30} color={KC.yellow} />
      <Chip T={T} at={K.H + 0.4} until={K.Ca - 0.3} texto="dicen que… (años 20, Indochina)" x={400} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.H + 0.6} until={K.H + 2.2} x={330} y={580} texto="lichi" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.0} until={K.H + 2.4} x={900} y={580} lado="izq" texto="mangostán" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 3.0} until={K.Ca - 0.3} x={60} y={1220} texto="té de cáscara" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.2} until={K.Ac - 0.3} x={60} y={560} texto="S. boulardii" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.2} until={K.Ac - 0.3} texto="otras cepas: 30–33 °C" x={760} y={1150} tam={30} borde={KC.orange} />
      <Chip T={T} at={K.Ac + 0.2} until={K.P - 0.3} texto="experimento de laboratorio, 1 h a 37 °C" x={540} y={1160} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Ac + 0.5} until={K.P - 0.3} x={60} y={560} texto="S. boulardii: casi igual" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ac + 1.2} until={K.P - 0.3} x={1040} y={1060} lado="izq" texto="otra cepa: < 4 %" tam={28} color={KC.ink} />
      <Etq T={T} at={K.An + 0.5} until={K.L - 0.3} x={60} y={460} texto="POR DENTRO · bacterias de tu intestino" tam={28} />
      <Chip T={T} at={K.An + 2.6} until={K.L - 0.3} texto="se desbalancean" x={400} y={1140} tam={36} borde={KC.red} />
      <Chip T={T} at={K.L + 0.8} until={K.Es - 0.3} texto="hongo ≠ bacteria" x={400} y={450} tam={40} borde={KC.gold2} />
      <Etq T={T} at={K.L + 1.4} until={K.Es - 0.3} x={60} y={1150} texto="levadura ≈ 5 µm · bacteria ≈ 1 µm" tam={28} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.4} anio="2015" quien="Szajewska y Kołodziej · Varsovia" revista="21 ensayos · 4,780 personas · Aliment Pharmacol Ther" y={760} />
      <Chip T={T} at={K.Es + 2.6} until={K.Li - 0.3} texto="en gente con antibióticos" x={400} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Li + 0.5} until={K.R - 0.3} x={60} y={520} texto="Clostridium difficile" it tam={34} color={KC.texto} />
      <Chip T={T} at={K.Li + 2.2} until={K.R - 0.3} texto="adultos: sin efecto claro" x={540} y={1130} tam={36} borde={KC.red} />
      <Chip T={T} at={K.R + 0.5} until={K.R + 3.0} texto="rara vez · pacientes graves" x={400} y={1150} tam={34} borde={KC.red} />
      <Etq T={T} at={K.R + 1.0} until={K.R + 3.0} x={640} y={830} texto="catéter en la vena" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.R + 3.3} until={K.N - 0.3} anio="2000" quien="París · 4 casos" revista="Hennequin et al. · Eur J Clin Microbiol Infect Dis" y={480} />
      <Chip T={T} at={K.N + 0.2} until={K.C - 0.3} texto="3–5 días después de dejarla" x={400} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no es consejo médico" x={330} y={470} tam={30} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.E} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.E} until={K.H} texto="10 µm" largo={300} />
      <BarraEscala T={T} at={K.H} until={K.Ca} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Ca} until={K.Ac} texto="50 cm" largo={160} />
      <BarraEscala T={T} at={K.Ac} until={K.P} texto="2 cm" largo={110} />
      <BarraEscala T={T} at={K.An} until={K.Es} texto="5 µm" largo={200} />
      <BarraEscala T={T} at={K.Li} until={K.R} texto="1 µm" largo={75} />
      <BarraEscala T={T} at={K.R} until={K.N} texto="50 cm" largo={190} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={180} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No trae bacterias: *trae una levadura.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.H - 0.1} texto="*Misma especie* que la del pan." />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Ca - 0.1} texto="Dicen que salió de un té de *lichi y mangostán.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Ac - 0.1} texto="Crece mejor a *37 °C, como tu cuerpo.*" />
      <Subtitulo T={T} idx={4} at={K.Ac + 0.1} until={K.P - 0.1} texto="A pH 2, *aguantó casi toda.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.An - 0.1} texto="¿Por qué *con antibióticos?*" />
      <Subtitulo T={T} idx={6} at={K.An + 0.1} until={K.L - 0.1} texto="Desbalancean *las bacterias de tu intestino.*" />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.Es - 0.1} texto="Una levadura *no es bacteria.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Li - 0.1} texto="Diarrea: de *18.7 a 8.5 de cada 100.*" />
      <Subtitulo T={T} idx={9} at={K.Li + 0.1} until={K.R - 0.1} texto="C. difficile en adultos: *sin efecto claro.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.N - 0.1} texto="Rara vez: *pacientes graves con catéter.*" />
      <Subtitulo T={T} idx={11} at={K.N + 0.1} until={K.C - 0.1} texto="Días después de dejarla, *se va.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Levadura del pan *que aguanta tu panza.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.E + 0.8, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ca + 0.3, K.Ac + 2.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.An + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.L + 0.3, K.Es - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Es + 2.6, K.Li - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Li + 0.3, K.R - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.R + 0.4, K.R + 3.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.N + 0.1, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="58" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BoulardiiApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BoulardiiShot /></CompositionStage></div>;
}
window.BoulardiiApp = BoulardiiApp;
