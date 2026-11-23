// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Biotecnológico #17 · La vacuna que hizo una levadura (hepatitis B) — NARRADO (N1 por dentro + medidores N3).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos.
// Morfología: virión de hepatitis B ~42 nm (envoltura con HBsAg + núcleo con ADN circular);
// partícula de HBsAg 22 nm, esférica y SIN genoma (Bucci, Nature Milestones 2020). Escala real en la escena "Vacias" (10 px = 1 nm).

const PIEL = '#f1b48f', PIEL2 = '#d98f6b', HBS = '#ff8a1f', HBS2 = '#c85f0a', NUCLEO = '#b18cff', ADNC = '#2fe0a8', GEN = '#ffd43b';
const PLASMA = '#f4cf55', SANGRE = '#c81d33';

function SvgCapa({ children }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{children}</svg>;
}

/* ---------- bebé recién nacido envuelto, de frente; pierna izquierda (su izquierda = derecha de la pantalla) ---------- */
function Bebe({ T, x = 450, y = 640, s = 1, curita = 0 }) {
  const resp = 1 + Math.sin(T * 2.2) * 0.012, pat = mece(T, 3, 0.8) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* belleza: degradados de volumen (luz arriba a la izquierda); la cobija pasa de menta chillona a un verde agua apagado */}
    <defs>
      <linearGradient id="hbCobija" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fd3b4" /><stop offset=".5" stopColor="#36a587" /><stop offset="1" stopColor="#1d6b58" /></linearGradient>
      <linearGradient id="hbPanal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4f1ea" /><stop offset="1" stopColor="#b9b4aa" /></linearGradient>
      <radialGradient id="hbCara" cx=".38" cy=".3" r=".8"><stop offset="0" stopColor="#ffd3b4" /><stop offset=".55" stopColor={PIEL} /><stop offset="1" stopColor="#c4805e" /></radialGradient>
    </defs>
    <ellipse cx={10} cy={668} rx={190} ry={24} fill="#000" opacity=".35" />
    {/* piernas */}
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * 10 + (k > 0 ? pat * 0.3 : -pat * 0.3)} ${k * 70} 430)`}>
      <path d={`M ${k * 70 - 50} 420 Q ${k * 90} 560 ${k * 80 - 20} 620 L ${k * 80 + 40} 620 Q ${k * 120 + 10} 540 ${k * 70 + 60} 420 Z`} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
      <ellipse cx={k * 80 + 12} cy={636} rx={52} ry={26} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    </g>)}
    {curita > 0 && <g opacity={curita} transform="translate(98 500) rotate(-20)"><rect x={-40} y={-16} width={80} height={32} rx={14} fill="#f7d9b0" stroke={KC.ink} strokeWidth={5} /><rect x={-14} y={-10} width={28} height={20} rx={4} fill="#e9bf8a" /></g>}
    {/* pañal */}
    <path d="M -150 330 Q 0 300 150 330 L 130 450 Q 0 500 -130 450 Z" fill="url(#hbPanal)" stroke={KC.ink} strokeWidth={9} />
    {/* cobija */}
    <g transform={`scale(${resp})`}>
      <path d="M -210 40 Q -240 220 -150 350 Q 0 400 150 350 Q 240 220 210 40 Q 0 -10 -210 40 Z" fill="url(#hbCobija)" stroke={KC.ink} strokeWidth={10} />
      <path d="M -200 60 Q 0 150 200 60" fill="none" stroke="#165a4a" strokeWidth={9} />
      <path d="M -150 200 Q -40 250 60 330 M 40 120 Q 120 200 150 300" stroke="#165a4a" strokeWidth={6} fill="none" strokeLinecap="round" opacity=".45" />
      {[[-120, 220], [0, 260], [110, 200], [-50, 160], [70, 300]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={13} fill="#e8fff6" opacity=".55" />)}
    </g>
    {/* cabeza */}
    <circle cx={0} cy={-80} r={150} fill="url(#hbCara)" stroke={KC.ink} strokeWidth={10} />
    <path d="M -20 -226 q 30 -40 50 -6" fill="none" stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <path d="M -70 -90 q 22 16 44 0 M 26 -90 q 22 16 44 0" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <ellipse cx={-90} cy={-40} rx={26} ry={16} fill="#f08a8a" opacity=".55" /><ellipse cx={90} cy={-40} rx={26} ry={16} fill="#f08a8a" opacity=".55" />
    <ellipse cx={0} cy={-18} rx={18} ry={12 + Math.sin(T * 2.2) * 3} fill="#b0484f" />
  </g>;
}

/* ---------- jeringa: punta en (x, y), cuerpo hacia arriba-derecha. p = émbolo 0..1 ---------- */
function Jeringa({ x, y, ang = -35, s = 1, p = 0, etiqueta, liquido = '#fff3c4' }) {
  const L = 300, emb = klerp(0, 220, kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <line x1={0} y1={0} x2={90} y2={0} stroke="#9aa3b5" strokeWidth={6} strokeLinecap="round" />
    <rect x={90} y={-16} width={20} height={32} rx={4} fill="#d8dee4" stroke={KC.ink} strokeWidth={5} />
    <rect x={110} y={-34} width={L} height={68} rx={10} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={116 + 0} y={-26} width={Math.max(0, L - 12 - emb)} height={52} rx={6} fill={liquido} opacity=".9" />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={150 + i * 40} y1={-34} x2={150 + i * 40} y2={-14} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={110 + L - 12 - emb} y={-30} width={16} height={60} fill="#3a3a3a" />
    <rect x={110 + L - emb} y={-8} width={200} height={16} fill="#e6e9ee" stroke={KC.ink} strokeWidth={5} />
    <rect x={310 + L - emb} y={-40} width={18} height={80} rx={6} fill="#e6e9ee" stroke={KC.ink} strokeWidth={6} />
    <rect x={110 + L} y={-56} width={18} height={112} rx={6} fill="#e6e9ee" stroke={KC.ink} strokeWidth={6} />
    {etiqueta && <g transform={`translate(${110 + L / 2} 0) rotate(${-ang})`}>
      <rect x={-150} y={70} width={300} height={56} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text y={110} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}

/* ---------- reloj de 24 h ---------- */
function Reloj24({ x, y, r = 130, p = 1 }) {
  const a = -90 + 360 * p, ar = a * Math.PI / 180;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 14} fill={KC.ink} /><circle r={r} fill={KC.paper} />
    <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${r * Math.cos(ar)} ${r * Math.sin(ar)} Z`} fill={KC.cyan} opacity=".55" />
    {Array.from({ length: 24 }, (_, i) => { const b = i / 24 * Math.PI * 2; return <line key={i} x1={Math.sin(b) * r * 0.86} y1={-Math.cos(b) * r * 0.86} x2={Math.sin(b) * r * 0.97} y2={-Math.cos(b) * r * 0.97} stroke={KC.ink} strokeWidth={i % 6 ? 3 : 7} />; })}
    <line x1={0} y1={0} x2={Math.cos(ar) * r * 0.78} y2={Math.sin(ar) * r * 0.78} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
    <text y={r * 0.45} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{Math.round(24 * p)} h</text>
  </g>;
}

/* ---------- silueta de cuerpo con hígado ---------- */
function CuerpoHigado({ T, x, y, s = 1, brilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* belleza: silueta gris azulada con volumen (antes: blanco plano que deslumbraba); el hígado rojo es el punto de atención */}
    <defs>
      <linearGradient id="hbSil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9c6de" /><stop offset=".5" stopColor="#8796b3" /><stop offset="1" stopColor="#4c5876" /></linearGradient>
    </defs>
    <ellipse cx={0} cy={530} rx={220} ry={26} fill="#000" opacity=".3" />
    <path d="M -150 -200 L -250 120 M 150 -200 L 250 120" stroke={KC.ink} strokeWidth={60} strokeLinecap="round" />
    <path d="M -150 -200 L -250 120 M 150 -200 L 250 120" stroke="#7f8eab" strokeWidth={42} strokeLinecap="round" />
    <circle cx={0} cy={-330} r={96} fill="url(#hbSil)" stroke={KC.ink} strokeWidth={10} />
    <path d="M -150 -220 Q 0 -250 150 -220 Q 200 -40 170 220 L 120 520 L 30 520 L 0 260 L -30 520 L -120 520 L -170 220 Q -200 -40 -150 -220 Z" fill="url(#hbSil)" stroke={KC.ink} strokeWidth={10} />
    {brilla > 0 && <ellipse cx={-40} cy={-30} rx={170} ry={100} fill={KC.red} opacity={0.25 * brilla * (0.7 + 0.3 * Math.sin(T * 5))} />}
    {/* hígado: lóbulo derecho grande (a la izquierda de la pantalla) */}
    <path d="M -130 -80 Q -40 -120 90 -70 Q 70 0 -10 20 Q -100 40 -130 -10 Z" fill="#8b2232" stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -60 Q -60 -80 -20 -64" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={8} strokeLinecap="round" />
  </g>;
}

/* ---------- virión de hepatitis B (partícula de Dane, ~42 nm): envoltura con HBsAg + núcleo con ADN circular ----------
   r = radio en px. corte 0..1: abre la envoltura para ver el núcleo. */
function VirusHB({ T, x, y, r = 120, corte = 0, rot = 0 }) {
  const n = 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2 + T * 0.15; const c = Math.cos(a), si = Math.sin(a);
      return <g key={i}><line x1={c * r * 0.92} y1={si * r * 0.92} x2={c * r * 1.13} y2={si * r * 1.13} stroke={KC.ink} strokeWidth={r * 0.07} />
        <circle cx={c * r * 1.15} cy={si * r * 1.15} r={r * 0.085} fill={HBS} stroke={KC.ink} strokeWidth={r * 0.025} /></g>; })}
    <circle r={r} fill="#ffd7a8" stroke={KC.ink} strokeWidth={r * 0.06} opacity={1 - corte * 0.75} />
    <circle r={r * 0.62} fill={NUCLEO} stroke={KC.ink} strokeWidth={r * 0.05} />
    {/* núcleo (cápside) en hexágono */}
    <path d={Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2 + Math.PI / 6; return `${i ? 'L' : 'M'} ${Math.cos(a) * r * 0.55} ${Math.sin(a) * r * 0.55}`; }).join(' ') + ' Z'} fill="#9a74ea" stroke={KC.ink} strokeWidth={r * 0.035} />
    <path d={Array.from({ length: 33 }, (_, i) => { const a = i / 32 * Math.PI * 2; const rr = r * (0.3 + 0.05 * Math.sin(a * 7 + T * 2)); return `${i ? 'L' : 'M'} ${Math.cos(a) * rr} ${Math.sin(a) * rr}`; }).join(' ')} fill="none" stroke={ADNC} strokeWidth={r * 0.06} strokeLinecap="round" />
  </g>;
}

/* ---------- partícula de HBsAg (22 nm): solo proteína de superficie, hueca (sin núcleo ni ADN) ---------- */
function ParticulaHBs({ T, x, y, r = 60, hueca = true, seed = 1, o = 1 }) {
  const n = 14;
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, seed, 0.3) * 20})`} opacity={o}>
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; const c = Math.cos(a), si = Math.sin(a);
      return <circle key={i} cx={c * r * 1.02} cy={si * r * 1.02} r={r * 0.17} fill={HBS} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.04)} />; })}
    <circle r={r * 0.9} fill="#ffd7a8" stroke={KC.ink} strokeWidth={Math.max(2.5, r * 0.06)} />
    {hueca && <circle r={r * 0.55} fill="rgba(13,20,36,.85)" stroke="rgba(255,255,255,.25)" strokeWidth={Math.max(1.5, r * 0.03)} strokeDasharray={`${r * 0.12} ${r * 0.1}`} />}
  </g>;
}
/* proteína suelta (un monómero de HBsAg, esquemático) */
function PiezaHBs({ x, y, r = 14, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}><circle r={r} fill={HBS} stroke={KC.ink} strokeWidth={3} /><rect x={-r * 0.25} y={r * 0.6} width={r * 0.5} height={r * 0.9} fill={HBS2} /></g>;
}

/* ---------- doble hélice horizontal con un tramo (gen S) en dorado; corte 0..1 lo saca ---------- */
function Helice({ T, x = 0, y = 0, largo = 900, alto = 60, n = 26, corte = 0, desde = 0.4, hasta = 0.6 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n, ph = u * Math.PI * 4 + T * 0.8, dentro = u >= desde && u <= hasta;
      const yy = Math.sin(ph) * alto, xx = u * largo;
      return <g key={i} opacity={dentro ? 1 - corte : 1} transform={dentro ? `translate(0 ${corte * 120})` : ''}>
        <line x1={xx} y1={yy} x2={xx} y2={-yy} stroke={dentro ? GEN : '#9aa4ae'} strokeWidth={dentro ? 9 : 6} strokeLinecap="round" />
        <circle cx={xx} cy={yy} r={11} fill="#2563a8" /><circle cx={xx} cy={-yy} r={11} fill="#d1477a" />
      </g>;
    })}
  </g>;
}

/* ---------- plásmido (anillo de ADN) con el gen; cierra 0..1 ---------- */
function PlasmidoG({ T, x = 0, y = 0, r = 110, gen = 1, cierra = 1, s = 1 }) {
  const hueco = klerp(50, 0, kclamp(cierra, 0, 1));
  const arco = (a0, a1, col, w) => {
    const p = (a) => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1), grande = (a1 - a0) % 360 > 180 ? 1 : 0;
    return <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${grande} 1 ${x1} ${y1}`} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" />;
  };
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 12})`}>
    {hueco < 3 ? <circle r={r} fill="none" stroke="#9aa4ae" strokeWidth={18} /> : arco(hueco - 60, 300 - hueco, '#9aa4ae', 18)}
    {gen > 0 && <g opacity={gen} style={{ filter:`drop-shadow(0 0 12px ${GEN})` }}>{arco(-60, 20, GEN, 24)}</g>}
  </g>;
}

/* ---------- levadura (Saccharomyces cerevisiae): ovalada, con yema; plas = plásmido adentro ---------- */
function LevaduraG({ T, x = 0, y = 0, s = 1, plas = 0, guino = 0, seed = 2 }) {
  const b = mece(T, seed, 0.3) * 4, yema = 0.3 + 0.1 * Math.sin(T * 0.8);
  return <g transform={`translate(${x} ${y}) rotate(${b}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={124} fill="#f6d06a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={120} cy={-84} rx={150 * yema} ry={124 * yema} fill="#f9dd92" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-40} cy={-14} rx={50} ry={42} fill="#e0a73c" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-52} cy={-26} rx={17} ry={13} fill="rgba(255,255,255,.5)" />
    {[[60, 44], [18, 70], [88, -4]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={15} fill="#e8bb57" />)}
    {plas > 0 && <g opacity={plas}><PlasmidoG T={T} x={60} y={30} r={38} /></g>}
    {guino > 0 && <g opacity={guino}><circle cx={-70} cy={-60} r={12} fill={KC.ink} /><path d="M -20 -60 q 14 -10 28 0" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M -70 -10 q 30 24 60 0" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /></g>}
  </g>;
}

/* ---------- bolsa de sangre y tubo centrifugado (plasma arriba) ---------- */
function BolsaSangre({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -180 Q -130 -200 -100 -200 L 100 -200 Q 130 -200 120 -180 L 130 160 Q 130 200 90 200 L -90 200 Q -130 200 -130 160 Z" fill={SANGRE} stroke={KC.ink} strokeWidth={9} />
    <rect x={-80} y={-130} width={160} height={110} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text y={-62} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>PLASMA</text>
    <path d="M 0 200 Q 0 260 40 300" fill="none" stroke={KC.ink} strokeWidth={10} />
    <rect x={-60} y={-250} width={120} height={50} rx={10} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Tubo({ x, y, s = 1, separa = 1, rot = 0, children }) {
  const rojo = 380 * (1 - 0.55 * separa);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id="tuboC"><path d="M -70 -260 L 70 -260 L 70 160 Q 70 240 0 240 Q -70 240 -70 160 Z" /></clipPath></defs>
    <g clipPath="url(#tuboC)">
      <rect x={-80} y={-200} width={160} height={460} fill={mixHex(SANGRE, PLASMA, separa)} />
      <rect x={-80} y={240 - rojo} width={160} height={rojo + 20} fill={SANGRE} />
      {children}
    </g>
    <path d="M -70 -260 L 70 -260 L 70 160 Q 70 240 0 240 Q -70 240 -70 160 Z" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-82} y={-300} width={164} height={50} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <rect x={-52} y={-230} width={18} height={360} rx={9} fill="rgba(255,255,255,.4)" />
  </g>;
}

/* ---------- frasquito de vacuna ---------- */
function FrascoVacuna({ x, y, s = 1, etiqueta = 'HB', tapa = KC.orange }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={250} rx={110} ry={18} fill="rgba(0,0,0,.2)" />
    <rect x={-80} y={70} width={160} height={170} rx={16} fill="#fff6e0" opacity=".95" />
    <rect x={-80} y={0} width={160} height={240} rx={20} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-50} y={-40} width={100} height={44} fill="#c3cbd3" stroke={KC.ink} strokeWidth={7} />
    <rect x={-66} y={-80} width={132} height={46} rx={12} fill={tapa} stroke={KC.ink} strokeWidth={8} />
    <rect x={-70} y={100} width={140} height={100} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text y={162} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
/* sello que cae */
function Sello({ T, at, x, y, texto, sub, color = KC.red }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.35, kEase.rebote), s = klerp(2.2, 1, e);
  return <g transform={`translate(${x} ${y}) rotate(-12) scale(${s})`} opacity={kclamp(e * 1.5, 0, 1)}>
    <circle r={150} fill="none" stroke={color} strokeWidth={14} /><circle r={124} fill="none" stroke={color} strokeWidth={5} />
    <text y={22} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={color}>{texto}</text>
    {sub && <text y={78} textAnchor="middle" style={{ font:`900 20px ${KF.texto}` }} fill={color}>{sub}</text>}
  </g>;
}

/* ---------- hogaza de pan ---------- */
function Pan({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 60 Q -250 -120 0 -140 Q 250 -120 230 60 Q 0 110 -230 60 Z" fill="#d9903a" stroke={KC.ink} strokeWidth={10} />
    {[-110, 0, 110].map((k) => <path key={k} d={`M ${k - 50} -60 Q ${k} -110 ${k + 50} -70`} fill="none" stroke="#f6d39a" strokeWidth={16} strokeLinecap="round" />)}
    <path d="M -200 50 Q 0 90 200 50" fill="none" stroke="#a8641e" strokeWidth={8} />
  </g>;
}

/* ---------- pantalla de microscopio electrónico (gris), con partículas redondas ---------- */
function PantallaME({ T, x, y, r = 230, n = 0 }) {
  const R = krng(11);
  const pts = Array.from({ length: 26 }, () => { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r * 0.82; return [Math.cos(a) * d, Math.sin(a) * d, 0.8 + R() * 0.4]; });
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 22} fill="#3a3f47" stroke={KC.ink} strokeWidth={10} />
    <circle r={r} fill="#8c9096" />
    {Array.from({ length: 60 }, (_, i) => <circle key={'g' + i} cx={(R() - 0.5) * r * 1.7} cy={(R() - 0.5) * r * 1.7} r={2 + R() * 3} fill="rgba(60,60,60,.25)" />)}
    {pts.slice(0, Math.floor(n * pts.length)).map(([a, b, k], i) => <g key={i}><circle cx={a} cy={b} r={13 * k} fill="#d9dbde" stroke="#4a4d52" strokeWidth={3} /><circle cx={a - 3} cy={b - 3} r={5 * k} fill="#f2f3f4" /></g>)}
    <circle r={r} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={30} />
  </g>;
}

/* ---------- interior de la Lupa: piezas de HBsAg que se juntan solas en partículas ---------- */
function interiorParticulas(T, r, t0) {
  const W = r * 2, cx = r, cy = r;
  const centros = [[cx - r * 0.42, cy - r * 0.2], [cx + r * 0.38, cy - r * 0.32], [cx + r * 0.05, cy + r * 0.42]];
  const R = krng(4);
  const piezas = Array.from({ length: 42 }, (_, i) => ({ c: i % 3, a: (i / 14) * Math.PI * 2, x0: R() * W, y0: R() * W, rot: R() * 360 }));
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill="#0d1424" />
    {piezas.map((p, i) => {
      const [ccx, ccy] = centros[p.c], t1 = t0 + 0.4 + p.c * 0.7 + (i % 14) * 0.04, u = kprog(T, t1, t1 + 1.1, kEase.suave);
      const tx = ccx + Math.cos(p.a) * r * 0.2, ty = ccy + Math.sin(p.a) * r * 0.2;
      return <PiezaHBs key={i} x={klerp(p.x0, tx, u) + Math.sin(T * 2 + i) * 6 * (1 - u)} y={klerp(p.y0, ty, u) + Math.cos(T * 2 + i) * 6 * (1 - u)} r={r * 0.045} rot={klerp(p.rot, (p.a * 180 / Math.PI) + 90, u)} />;
    })}
    {centros.map(([a, b], k) => { const t1 = t0 + 0.4 + k * 0.7 + 1.5; const o = kprog(T, t1, t1 + 0.4);
      return o > 0 ? <ParticulaHBs key={k} T={T} x={a} y={b} r={r * 0.2} seed={k} o={o} /> : null; })}
  </svg>;
}
function interiorVirus(T, r) {
  const W = r * 2;
  return <svg width={W} height={W}><rect width={W} height={W} fill="#0d1424" /><VirusHB T={T} x={r} y={r} r={r * 0.55} /></svg>;
}

function HepatitisB() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Be: CUES.Bebe, Vi: CUES.Virus, Pl: CUES.Plasma, Mi: CUES.Miedo, Pr: CUES.Pregunta, Ge: CUES.Gen, Pa: CUES.Particulas,
    Va: CUES.Vacias, Es: CUES.Estudio, Re: CUES.Recombivax, Pn: CUES.Pan, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const embolo = kprog(T, K.G + 0.1, K.G + 3.6, kEase.suave);
  const pinch = kprog(T, K.G, K.G + 0.3, kEase.sale);
  const R = krng(9);
  const flotan = Array.from({ length: 5 }, () => [-30 + R() * 60, -160 + R() * 160, R() * 6]);
  // gen: el tramo dorado baja al plásmido y el plásmido entra a la levadura
  const corte = kprog(T, K.Ge + 1.4, K.Ge + 2.2, kEase.sale);
  const alPlas = kprog(T, K.Ge + 2.0, K.Ge + 3.0, kEase.suave);
  const cierra = kprog(T, K.Ge + 2.9, K.Ge + 3.4, kEase.sale);
  const aLev = kprog(T, K.Ge + 3.5, K.Ge + 4.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el bebé llena el cuadro; la jeringa en su muslo y, enseguida, la levadura */}
      <Escena T={T} a={K.G} b={K.Be} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.pink} />
        <SvgCapa><g transform="translate(0 130)">
          <Bebe T={T} x={440} y={520} s={1.2} />
          <Jeringa x={klerp(680, 558, pinch)} y={klerp(1047, 1120, pinch)} ang={-52} s={1.2} p={embolo} etiqueta="anti hepatitis B" />
          {T > K.G + 2.2 && <g transform={`translate(165 1200) scale(${kprog(T, K.G + 2.2, K.G + 2.7, kEase.rebote)})`}><LevaduraG T={T} s={0.85} guino={1} /></g>}
        </g></SvgCapa>
      </Escena>
      {/* 1 · en México, primeras 24 horas, en el muslo */}
      <Escena T={T} a={K.Be} b={K.Vi} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa><g transform="translate(0 130)">
          <Bebe T={T} x={440} y={520} s={1.2} curita={kprog(T, K.Be + 1.6, K.Be + 2.0)} />
          <Reloj24 x={830} y={440} r={170} p={kprog(T, K.Be + 0.2, K.Be + 2.4, kEase.suave)} />
        </g></SvgCapa>
      </Escena>
      {/* 2 · la hepatitis B ataca el hígado */}
      <Escena T={T} a={K.Vi} b={K.Pl} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><CuerpoHigado T={T} x={360} y={840} s={1.2} brilla={kprog(T, K.Vi + 0.6, K.Vi + 1.2)} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Vi + 0.9} until={K.Pl - 0.25} x={800} y={1130} r={250} fx={330} fy={800} interior={interiorVirus} tinte={KC.orange} etiqueta="AL MICROSCOPIO · VIRUS" />
      {/* 3–4 · antes: del plasma de personas infectadas; el miedo */}
      <Escena T={T} a={K.Pl} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g opacity={1 - kprog(T, K.Mi - 0.3, K.Mi + 0.3)}><BolsaSangre x={280} y={900} s={1.5} />
            <FlechaG x0={505} y0={900} x1={625} y1={900} p={kprog(T, K.Pl + 0.6, K.Pl + 1.2)} /></g>
          <Tubo x={klerp(820, 540, kprog(T, K.Mi - 0.3, K.Mi + 0.4, kEase.suave))} y={klerp(930, 960, kprog(T, K.Mi - 0.3, K.Mi + 0.4, kEase.suave))} s={klerp(1.5, 2.0, kprog(T, K.Mi - 0.3, K.Mi + 0.4, kEase.suave))}
            separa={kprog(T, K.Pl + 2.2, K.Pl + 3.4)} rot={T > K.Pl + 0.9 && T < K.Pl + 2.4 ? Math.sin((T - K.Pl) * 30) * 6 : 0}>
            {T > K.Mi + 0.6 && flotan.map(([a, b, ph], i) => { const o = kprog(T, K.Mi + 0.6 + i * 0.25, K.Mi + 1.0 + i * 0.25);
              return <g key={i} opacity={o}><circle cx={a} cy={b + Math.sin(T * 2 + ph) * 10} r={22} fill="#7a7f88" stroke={KC.ink} strokeWidth={4} />
                <text x={a} y={b + 12 + Math.sin(T * 2 + ph) * 10} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#fff">?</text></g>; })}
          </Tubo>
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ge} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <VirusHB T={T} x={540} y={1150} r={200} />
          <text x={540} y={880} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 540 700)`}>?</text>
          <line x1={320} y1={1370} x2={760} y2={930} stroke={KC.red} strokeWidth={34} strokeLinecap="round" opacity={kprog(T, K.Pr + 1.0, K.Pr + 1.3)} />
        </SvgCapa>
      </Escena>
      {/* 6 · un solo gen → plásmido → levadura (fondo oscuro: ya es microscópico) */}
      <Escena T={T} a={K.Ge} b={K.Pa} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2333 0%, ${KC.noche} 75%)` }}></div>
        <SvgCapa>
          <g transform="translate(30 560) scale(1.7)"><Helice T={T} x={0} y={0} largo={600} alto={56} corte={corte} /></g>
          {corte > 0 && <g transform={`translate(${klerp(540, 260, alPlas)} ${klerp(560 + corte * 204, 1100, alPlas)}) scale(${klerp(1.6, 0.75, alPlas)})`} opacity={1 - cierra}>
            <rect x={-90} y={-22} width={180} height={44} rx={22} fill={GEN} stroke={KC.ink} strokeWidth={6} style={{ filter:`drop-shadow(0 0 14px ${GEN})` }} /></g>}
          {T > K.Ge + 1.8 && aLev < 1 && <PlasmidoG T={T} x={klerp(260, 822, aLev)} y={klerp(1100, 1251, aLev)} r={110} s={klerp(1.5, 0.59, aLev)} gen={cierra} cierra={0.4 + 0.6 * cierra} />}
          <LevaduraG T={T} x={720} y={1200} s={1.7} plas={kprog(T, K.Ge + 4.4, K.Ge + 4.8)} />
        </SvgCapa>
      </Escena>
      {/* 7 · la levadura arma las partículas (Lupa por dentro) */}
      <Escena T={T} a={K.Pa} b={K.Va} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2333 0%, ${KC.noche} 75%)` }}></div>
        <SvgCapa><LevaduraG T={T} x={330} y={1190} s={1.6} plas={1} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Pa + 0.3} until={K.Va - 0.25} x={700} y={640} r={300} fx={330} fy={1190} interior={(t, r) => interiorParticulas(t, r, K.Pa + 0.3)} tinte={HBS} etiqueta="POR DENTRO · LEVADURA" />
      {/* 8 · por fuera parecen el virus, por dentro vacías (escala real: 16 px = 1 nm; la barra se calcula con z = 1.6) */}
      <Escena T={T} a={K.Va} b={K.Es} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2333 0%, ${KC.noche} 75%)` }}></div>
        <SvgCapa>
          <VirusHB T={T} x={405} y={720} r={1.6 * 210 / 1.15} corte={kprog(T, K.Va + 1.6, K.Va + 2.2)} />
          <ParticulaHBs T={T} x={800} y={1240} r={1.6 * 110 / 1.02} seed={3} />
          {T > K.Va + 2.6 && <g opacity={kprog(T, K.Va + 2.6, K.Va + 3.0)} transform="translate(800 1240) scale(1.6)">
            <rect x={-34} y={-10} width={68} height={54} rx={10} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
            <path d="M -20 -10 v -18 a 20 20 0 0 1 40 0 v 18" fill="none" stroke={KC.ink} strokeWidth={8} /></g>}
        </SvgCapa>
      </Escena>
      {/* 9 · 1982: al microscopio electrónico */}
      <Escena T={T} a={K.Es} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><g transform="translate(540 1000) scale(1.9)"><PantallaME T={T} x={0} y={0} r={190} n={kprog(T, K.Es + 1.2, K.Es + 3.2)} /></g></SvgCapa>
      </Escena>
      {/* 10 · 1986: Recombivax HB */}
      <Escena T={T} a={K.Re} b={K.Pn} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <FrascoVacuna x={500} y={770} s={2.4} etiqueta="HB" />
          <g transform="translate(800 480) scale(1.4)"><Sello T={T} at={K.Re + 0.6} x={0} y={0} texto="1986" sub="RECOMBINANTE" /></g>
        </SvgCapa>
      </Escena>
      {/* 11 · la levadura del pan; rastros y alergia grave */}
      <Escena T={T} a={K.Pn} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Pan x={690} y={1130} s={1.35} />
          <text x={470} y={1010} textAnchor="middle" style={{ font:`400 260px ${KF.titulo}` }} fill="#fff6e0" stroke="#0b1020" strokeWidth={8}>=</text>
          <LevaduraG T={T} x={330} y={650} s={1.7} />
          {T > K.Pn + 2.6 && Array.from({ length: 6 }, (_, i) => <circle key={i} cx={190 + Math.cos(i * 1.1) * 130} cy={1400 + Math.sin(i * 1.7) * 40 + Math.sin(T * 2 + i) * 6} r={14} fill="#f6d06a" stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Pn + 2.6 + i * 0.1, K.Pn + 3.0 + i * 0.1)} />)}
          {T > K.Pn + 2.6 && <g opacity={kprog(T, K.Pn + 2.6, K.Pn + 3.0)}><FrascoVacuna x={190} y={1120} s={1.0} etiqueta="HB" /></g>}
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: el bebé y la jeringa del inicio, ya con su etiqueta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.pink} />
        <SvgCapa><g transform="translate(0 130)">
          <Bebe T={T} x={440} y={520} s={1.2} curita={1} />
          <Jeringa x={558} y={1120} ang={-52} s={1.2} p={1} etiqueta="hecha en levadura" />
          <g transform="translate(165 1200)"><LevaduraG T={T} s={0.85} guino={1} /></g>
        </g></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.Be - 0.2} texto="¿trae virus?" x={820} y={460} tam={48} />
      <Chip T={T} at={K.G + 2.4} until={K.Be - 0.2} texto="la fabricó una levadura" y={1530} tam={46} borde={KC.gold} />
      <Chip T={T} at={K.Be + 0.3} until={K.Vi - 0.2} texto="México · primeras 24 horas" y={1530} tam={46} borde={KC.cyan} />
      <Etiqueta T={T} at={K.Be + 1.0} until={K.Vi - 0.2} x={640} y={1255} texto="muslo izquierdo" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Vi + 0.4} until={K.Pl - 0.2} texto="hepatitis B: ataca el hígado" y={250} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Pl + 0.3} until={K.Mi - 0.2} texto="1981 · purificada del plasma" y={1460} tam={44} borde={PLASMA} />
      <Etiqueta T={T} at={K.Pl + 2.8} until={K.Mi - 0.2} x={690} y={700} texto="plasma" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mi + 0.5} until={K.Pr - 0.2} texto="un miedo (sin pruebas de contagio)" y={250} tam={38} borde={KC.lilac} />
      <Chip T={T} at={K.Pr + 0.3} until={K.Ge - 0.2} texto="¿vacuna sin virus?" y={1470} tam={50} borde={KC.yellow} />
      <Chip T={T} at={K.Ge + 0.3} until={K.Ge + 2.6} texto="1 gen: la proteína de superficie" y={340} tam={40} borde={GEN} />
      <Etiqueta T={T} at={K.Ge + 0.6} until={K.Ge + 2.6} x={670} y={770} texto="gen S (HBsAg)" tam={34} color={GEN} />
      <Etiqueta T={T} at={K.Ge + 2.4} until={K.Ge + 3.8} x={110} y={1320} texto="plásmido" tam={34} color={KC.texto} />
      <Etiqueta T={T} at={K.Ge + 3.8} until={K.Pa - 0.2} x={440} y={1470} texto="Saccharomyces cerevisiae" it tam={34} color={KC.texto} />
      <Chip T={T} at={K.Pa + 2.6} until={K.Va - 0.2} texto="se arman solas · 22 nm" x={790} y={1130} tam={42} borde={HBS} />
      <Etiqueta T={T} at={K.Va + 0.4} until={K.Es - 0.2} x={130} y={1125} texto="virus · ~42 nm" tam={36} color={KC.texto} />
      <Etiqueta T={T} at={K.Va + 0.8} until={K.Es - 0.2} x={585} y={1425} texto="partícula · 22 nm" lado="izq" tam={36} color={KC.texto} />
      {T >= K.Va && T < K.Es && <Escala T={T} z={1.6} pxPorMm={1e7} x={60} y={1430} />}
      <Chip T={T} at={K.Va + 2.2} until={K.Es - 0.2} texto="por dentro: sin ADN" x={300} y={1300} tam={42} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Re - 0.2} anio="1982" quien="UCSF + U. de Washington" revista="Valenzuela et al. · Nature" x={540} y={400} />
      <Etiqueta T={T} at={K.Es + 2.0} until={K.Re - 0.2} x={250} y={1480} texto="microscopio electrónico" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Re + 1.2} until={K.Pn - 0.2} texto="1.ª vacuna de ADN recombinante" y={1485} tam={42} borde={KC.red} />
      <Etiqueta T={T} at={K.Pn + 0.6} until={K.Pn + 2.6} x={60} y={385} texto="Saccharomyces cerevisiae" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Pn + 0.4} until={K.Pn + 2.6} texto="la misma especie del pan" y={1420} tam={44} borde={KC.gold} />
      <Etiqueta T={T} at={K.Pn + 3.0} until={K.Ci - 0.2} x={330} y={1330} texto="< 1 % proteína de levadura" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pn + 3.4} until={K.Ci - 0.2} texto="alergia grave a la levadura = no" y={1490} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="0 virus · 1 levadura" y={1530} tam={48} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Be - 0.1} texto="No trae virus: *la hizo una levadura.*" />
      <Subtitulo T={T} idx={1} at={K.Be + 0.1} until={K.Vi - 0.1} texto="En México: *primeras 24 horas.*" />
      <Subtitulo T={T} idx={2} at={K.Vi + 0.1} until={K.Pl - 0.1} texto="Hepatitis B: *ataca el hígado.*" />
      <Subtitulo T={T} idx={3} at={K.Pl + 0.1} until={K.Mi - 0.1} texto="1981: salía *del plasma.*" />
      <Subtitulo T={T} idx={4} at={K.Mi + 0.1} until={K.Pr - 0.1} texto="Miedo a *otros virus.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ge - 0.1} texto="¿Una vacuna *sin el virus?*" />
      <Subtitulo T={T} idx={6} at={K.Ge + 0.1} until={K.Pa - 0.1} texto="Un solo gen *a la levadura.*" />
      <Subtitulo T={T} idx={7} at={K.Pa + 0.1} until={K.Va - 0.1} texto="Se arman *bolitas de 22 nm.*" />
      <Subtitulo T={T} idx={8} at={K.Va + 0.1} until={K.Es - 0.1} texto="Por dentro, *vacías.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Re - 0.1} texto="1982: *al microscopio.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Pn - 0.1} texto="1986: *la primera recombinante.*" />
      <Subtitulo T={T} idx={11} at={K.Pn + 0.1} until={K.Ci - 0.1} texto="La del pan: *ojo con la alergia.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Sin virus: *trabajo de levadura.*" />

      <Robert T={T} apariciones={ROBERT_HB(CUES).slice(1)} />
      {/* modo cine: Robert solo en la tarjeta de cierre (se quitó el StickerFundido del gancho) */}
      <MarcaAgua T={T} tema="bioquimica" num="17" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// flecha recta que se dibuja (p 0..1)
function FlechaG({ x0, y0, x1, y1, p = 1, color = KC.ink }) {
  if (p <= 0) return null;
  const x = klerp(x0, x1, p), y = klerp(y0, y1, p), a = Math.atan2(y1 - y0, x1 - x0);
  return <g><line x1={x0} y1={y0} x2={x} y2={y} stroke={color} strokeWidth={14} strokeLinecap="round" />
    <path d={`M ${x} ${y} l ${-34 * Math.cos(a - 0.5)} ${-34 * Math.sin(a - 0.5)} M ${x} ${y} l ${-34 * Math.cos(a + 0.5)} ${-34 * Math.sin(a + 0.5)}`} stroke={color} strokeWidth={14} strokeLinecap="round" /></g>;
}

// Primera aparición (lado gancho): igual que Sticker pero sale con fundido, sin bajar por encima del subtítulo.
function StickerFundido({ T, src, at, until, lado = 'gancho' }) {
  if (T < at || T > until + 0.4) return null;
  const L = { left:600, top:230, width:460 }, i = kprog(T, at, at + 0.5, kEase.rebote), o = 1 - kprog(T, until, until + 0.35, kEase.suave);
  return <img src={src} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%', opacity:o,
    transform:`translateY(${(1 - i) * 800}px) scale(${1 - 0.04 * (1 - o)})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
}
// Robert en pantalla (tabla en guion.md; la 1.ª aparición se dibuja con StickerFundido)
function ROBERT_HB(C) {
  return [
    [C.Gancho - 0.45, C.Gancho + 2.7, 'avatar_11_sorprendido', 'gancho'],
    [C.Gancho + 3.0, C.Bebe - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
    [C.Virus + 0.3, C.Plasma - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
    [C.Miedo + 0.5, C.Pregunta - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
    [C.Pregunta + 0.05, C.Gen - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
    [C.Particulas + 1.0, C.Vacias - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
    [C.Estudio + 0.4, C.Recombivax - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
    [C.Recombivax + 0.3, C.Pan - 0.2, 'avatar_11_sorprendido', 'grande'],
    [C.Pan + 0.8, C.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
    [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']];
}

function HepatitisBApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HepatitisB /></CompositionStage></div>;
}
window.HepatitisBApp = HepatitisBApp;
