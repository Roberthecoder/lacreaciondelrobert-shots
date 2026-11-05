// Shot Fungi Mati #83 · Esto no es polvo: son semillas de orquídea — NARRADO (N1 Por dentro, gancho 1 «Esto no es X: es Y»).
// Viaje: cápsula en una rama del bosque de niebla → semilla al microscopio → hifa → pelotones → protocormo → la misma rama, en flor.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

// ---------- TEXTOS EN PANTALLA (todo aquí, para corregir fácil tras la verificación) ----------
const TX = {
  mito: 'polvo',
  semillas: 'SEMILLAS DE ORQUÍDEA',
  sinHongo: 'en el bosque, sin hongo: no germinan',
  numMx: 1200, numMxPre: '+', etqMx1: 'especies de orquídeas', etqMx2: 'en México',
  bosque1: 'bosque de niebla', bosque2: 'bosque mesófilo de montaña',
  epifita: 'orquídea pegada a la rama',
  numCap: 4000000, etqCap: 'semillas en una cápsula', etqCap2: 'récord registrado (Arditti y Ghani, 2000)',
  porDentro: 'AL MICROSCOPIO · LA SEMILLA',
  testa: 'testa (cubierta)', embrion: 'embrión', sinReservas: 'sin endospermo = sin reservas',
  hifa: 'hifa del hongo', micorriza: 'hongo micorrízico', hongo1: 'Tulasnella', hongo2: 'Ceratobasidium',
  peloton: 'pelotón (ovillo de hifas)', celula: 'célula del embrión',
  quien: '¿quién se come a quién?',
  mico: 'come del hongo: micoheterotrofia',
  protocormo: 'protocormo', hoja: 'primera hoja', raiz: 'raíz',
  anio: '2007', estQuien: 'UNAM · Pedregal de San Ángel', estRevista: 'Lankesteriana, 2007 · CDMX',
  bletia: 'Bletia urbana', peligro: 'orquídea en peligro', frasco: 'plántulas + su hongo, en frasco',
  anios: '6 años', sobrevive: 'sobrevivió', pct: 50, pctPre: '≈ ', pctSuf: ' %', florecen: '¡y florecen!',
  vainilla: 'Vanilla planifolia', vainilla2: 'vainilla · también orquídea', nativa: 'nativa de México y Centroamérica',
  mapa: 'mapa esquemático',
  cierre: 'no es polvo',
};

const OQ = { corteza:'#7a5a3a', corteza2:'#5a3f27', musgo:'#4fae3c', musgo2:'#7fd05a', hoja:'#2f9e44', hoja2:'#5fcf6a',
  petalo:'#ff7fb8', petalo2:'#ff4f9a', labelo:'#ffd23f', capsula:'#9b7a3e', capsula2:'#6e5326', polvo:'#f2d58c',
  testa:'#cfe9ff', embrion:'#f7e7a8', hifa:'#fff4d6', verde:'#46c25a', roca:'#3b3a40', roca2:'#57565e', bletia:'#d9409a' };

// ---------- piezas ----------
// Rama horizontal con musgo. (x, y) = extremo izquierdo; w = largo.
function Rama({ x, y, w = 1200, grosor = 90, T = 0 }) {
  const g = krng(11);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -40 ${-grosor / 2} Q ${w * 0.5} ${-grosor / 2 - 30} ${w + 40} ${-grosor / 2 + 10} L ${w + 40} ${grosor / 2 + 14} Q ${w * 0.5} ${grosor / 2 - 10} -40 ${grosor / 2} Z`} fill={OQ.corteza} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${i * 140 + 20} ${-10 + (i % 2) * 18} q 40 -8 80 0`} stroke={OQ.corteza2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {Array.from({ length: 16 }, (_, i) => { const mx = i * 78 + g() * 30, r = 22 + g() * 18;
      return <g key={'m' + i} transform={`translate(${mx} ${-grosor / 2 - 4 + Math.sin(i) * 6})`}>
        <ellipse rx={r * 1.4} ry={r * 0.7} fill={i % 3 ? OQ.musgo : OQ.musgo2} stroke={KC.ink} strokeWidth={4} />
        {[...Array(4)].map((_, k) => <line key={k} x1={-r + k * r * 0.6} y1={-r * 0.4} x2={-r + k * r * 0.6 + mece(T, i + k, 0.4) * 3} y2={-r * 0.9} stroke={OQ.musgo2} strokeWidth={4} strokeLinecap="round" />)}
      </g>; })}
    {/* musgo colgante */}
    {[160, 520, 880].map((mx, i) => <path key={'c' + i} d={`M ${mx} ${grosor / 2} q ${8 + mece(T, i, 0.3) * 8} 60 ${-4} 130 q 10 30 -2 60`} stroke={OQ.musgo} strokeWidth={9} fill="none" strokeLinecap="round" opacity=".9" />)}
  </g>;
}
// Orquídea epífita (esquemática): raíces blancas abrazando la rama, pseudobulbo, 2 hojas y vara con flores.
// (x, y) = punto de la rama. flor 0..1 abre las flores. vara 0..1 crece la vara.
function Orquidea({ x, y, s = 1, flor = 1, vara = 1, T = 0, capsula = null }) {
  const fl = (fx, fy, k, i) => <g key={i} transform={`translate(${fx} ${fy}) scale(${k}) rotate(${mece(T, i, 0.3) * 4})`}>
    {[0, 72, 144, 216, 288].map((a, j) => <ellipse key={j} cx={0} cy={-34} rx={14} ry={34} transform={`rotate(${a})`} fill={j % 2 ? OQ.petalo : OQ.petalo2} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -16 6 Q 0 46 16 6 Q 0 14 -16 6 Z" fill={OQ.labelo} stroke={KC.ink} strokeWidth={4} />
    <circle r={7} fill="#fff" stroke={KC.ink} strokeWidth={3} />
  </g>;
  const v = kEase.sale(kclamp(vara, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* raíces con velamen (blancas) */}
    {[[-60, 40], [-20, 55], [30, 50], [70, 35]].map(([rx, ry], i) => <path key={i} d={`M 0 -20 Q ${rx * 0.6} ${ry * 0.2} ${rx} ${ry}`} stroke="#e9efe6" strokeWidth={10} fill="none" strokeLinecap="round" />)}
    {/* pseudobulbo */}
    <ellipse cx={0} cy={-60} rx={30} ry={50} fill={OQ.hoja2} stroke={KC.ink} strokeWidth={6} />
    {/* hojas */}
    <path d={`M -6 -100 Q ${-120} ${-210} ${-170 + mece(T, 1, 0.3) * 6} ${-180} Q ${-100} ${-150} -6 -100 Z`} fill={OQ.hoja} stroke={KC.ink} strokeWidth={6} />
    <path d={`M 6 -100 Q ${110} ${-230} ${160 + mece(T, 2, 0.3) * 6} ${-200} Q ${100} ${-160} 6 -100 Z`} fill={OQ.hoja} stroke={KC.ink} strokeWidth={6} />
    {/* vara floral que se arquea */}
    {v > 0 && <path d={`M 10 -100 Q ${60} ${-200 * v} ${150 * v} ${-230 * v}`} stroke="#3c7d2a" strokeWidth={7} fill="none" strokeLinecap="round" />}
    {flor > 0 && v > 0.6 && [[95, -215, 0], [150, -230, 1], [55, -175, 2]].map(([fx, fy, i]) => fl(fx * v, fy * v, kEase.rebote(kclamp(flor * 1.4 - i * 0.2, 0, 1)) * 0.95, i))}
    {capsula}
  </g>;
}
// Cápsula de orquídea colgando: fruto alargado con costillas que se abre en tiras. (x, y) = donde cuelga. abre 0..1.
function Capsula({ x, y, s = 1, abre = 0, T = 0 }) {
  const L = 210, W = 66, a = abre * 14;
  const tira = (dx, rot, fill) => <g transform={`rotate(${rot} 0 18)`}>
    <path d={`M ${dx * 0.3} 18 Q ${dx - 4} ${L * 0.5} ${dx * 0.5} ${L} Q ${dx * 0.1} ${L + 8} ${dx * 0.05} ${L} Q ${dx * 0.55} ${L * 0.5} ${dx * 0.05} 18 Z`} fill={fill} stroke={KC.ink} strokeWidth={5} />
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 7, 0.25) * 3})`}>
    <line x1={0} y1={-60} x2={0} y2={20} stroke="#3c7d2a" strokeWidth={9} strokeLinecap="round" />
    {/* polvo adentro (se ve en las rendijas al abrir) */}
    {abre > 0 && <ellipse cx={0} cy={L * 0.55} rx={W * 0.36} ry={L * 0.4} fill={OQ.polvo} stroke={KC.ink} strokeWidth={3} />}
    {tira(-W, -a, OQ.capsula)}
    {tira(W, a, OQ.capsula)}
    {abre < 0.2 && <path d={`M 0 18 Q ${-W * 0.5} ${L * 0.5} 0 ${L + 4} Q ${W * 0.5} ${L * 0.5} 0 18 Z`} fill={OQ.capsula2} stroke={KC.ink} strokeWidth={4} opacity={1 - abre * 5} />}
    <path d={`M -10 ${L + 2} l 10 22 l 10 -22`} fill="#6b4b22" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Nube de semillas-polvo que sale de (x, y) desde t0 y se va con el viento. vx, vy en px/s.
function Polvo({ T, t0, x, y, n = 120, vx = 260, vy = -60, seed = 3, hasta = Infinity, tam = 1, hilos = 0 }) {
  if (T < t0) return null;
  const g = krng(seed), out = [];
  for (let i = 0; i < n; i++) {
    const d = g() * 2.2, sx = (g() - 0.5) * 40, sy = g() * 120, v = 0.6 + g() * 0.8, r = (2.5 + g() * 4) * tam, ang = g() * 180, ph = g() * 6;
    const age = T - t0 - d; if (age < 0 || T > hasta) continue;
    const px = x + sx + age * vx * v + Math.sin(age * 1.7 + ph) * 26, py = y + sy + age * vy * v + Math.cos(age * 1.3 + ph) * 20;
    if (px > KW + 40 || py < -40) continue;
    const o = Math.min(1, age * 3) * 0.95;
    out.push(<g key={i} transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${ang + age * 40})`} opacity={o}>
      <ellipse rx={r * 1.9} ry={r * 0.7} fill={OQ.polvo} stroke="rgba(22,18,15,.55)" strokeWidth={1.5} />
      {hilos > 0 && i % 3 === 0 && <path d={`M ${r * 1.9} 0 q 18 ${8 + (i % 5) * 3} ${36 * hilos} ${14 * hilos}`} stroke={OQ.hifa} strokeWidth={2.5} fill="none" />}
    </g>);
  }
  return <g>{out}</g>;
}
// Neblina que pasa (bandas blancas semitransparentes).
function Neblina({ T, y0 = 400, n = 5, o = 0.35 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const w = 700 + i * 90, xx = ((T * (22 + i * 7) + i * 330) % (KW + w)) - w * 0.6;
    return <ellipse key={i} cx={xx} cy={y0 + i * 230} rx={w * 0.6} ry={70 + (i % 2) * 30} fill="#ffffff" opacity={o} />; })}</g>;
}
// Árbol de bosque de niebla: tronco con musgo, ramas, orquídeas y bromelias.
function ArbolNiebla({ x, y, h = 1300, s = 1, T = 0, seed = 1 }) {
  const g = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -60 0 Q -40 ${-h * 0.5} -30 ${-h} L 30 ${-h} Q 40 ${-h * 0.5} 60 0 Z`} fill={OQ.corteza2} stroke={KC.ink} strokeWidth={8} />
    {[0.35, 0.6, 0.82].map((u, i) => { const dir = i % 2 ? 1 : -1, yy = -h * u, L = 260 + g() * 120;
      return <g key={i}>
        <path d={`M 0 ${yy} Q ${dir * L * 0.5} ${yy - 70} ${dir * L} ${yy - 40}`} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d={`M 0 ${yy} Q ${dir * L * 0.5} ${yy - 70} ${dir * L} ${yy - 40}`} stroke={OQ.corteza} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d={`M ${dir * 20} ${yy - 14} Q ${dir * L * 0.5} ${yy - 86} ${dir * (L - 10)} ${yy - 56}`} stroke={OQ.musgo} strokeWidth={14} fill="none" strokeLinecap="round" />
        {/* orquídea chiquita en la rama */}
        <g transform={`translate(${dir * L * 0.7} ${yy - 66})`}>
          <path d={`M 0 0 Q ${dir * -30} -50 ${dir * -50} -40`} stroke={OQ.hoja} strokeWidth={12} fill="none" strokeLinecap="round" />
          <path d={`M 0 0 Q ${dir * 30} -60 ${dir * 55} -50`} stroke={OQ.hoja} strokeWidth={12} fill="none" strokeLinecap="round" />
          {[0, 1, 2].map((k) => <circle key={k} cx={dir * (20 + k * 16)} cy={-70 - k * 10 + mece(T, k + seed, 0.3) * 3} r={11} fill={k % 2 ? OQ.petalo : OQ.petalo2} stroke={KC.ink} strokeWidth={3} />)}
        </g>
        {/* bromelia */}
        {i === 1 && <g transform={`translate(${dir * L * 0.3} ${yy - 52})`}>{[-40, -15, 15, 40].map((a, k) => <path key={k} d={`M 0 0 L ${Math.sin(a * Math.PI / 180) * 70} ${-Math.cos(a * Math.PI / 180) * 70}`} stroke="#c6d94a" strokeWidth={14} strokeLinecap="round" />)}</g>}
      </g>; })}
    {/* musgo en el tronco */}
    {Array.from({ length: 7 }, (_, i) => <ellipse key={'t' + i} cx={(i % 2 ? 1 : -1) * 34} cy={-h * (0.1 + i * 0.12)} rx={22} ry={34} fill={OQ.musgo} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Forma de huso de la semilla (centro en 0,0; L = largo total; W = ancho).
const husoD = (L, W) => `M ${-L / 2} 0 Q ${-L * 0.22} ${-W * 0.62} 0 ${-W / 2} Q ${L * 0.22} ${-W * 0.62} ${L / 2} 0 Q ${L * 0.22} ${W * 0.62} 0 ${W / 2} Q ${-L * 0.22} ${W * 0.62} ${-L / 2} 0 Z`;
// Semilla de orquídea al microscopio: testa transparente con red de células alargadas y embrión pequeño sin endospermo.
// (x, y) = centro. abre 0..1 = la testa se rompe (protocormo).
function SemillaMicro({ x, y, L = 760, W = 250, emb = 1, abre = 0, T = 0, embrionColor = OQ.embrion, children, sinEmbrion = false }) {
  const id = 'testa' + Math.round(x) + Math.round(y);
  const nx = 11, ny = 4;
  const half = (lado) => <g transform={`translate(${lado * abre * 120} ${abre * 60 * (lado < 0 ? 1 : -1)}) rotate(${lado * abre * 18})`} opacity={1 - abre * 0.6}>
    <clipPath id={id + lado}><rect x={lado < 0 ? -L / 2 - 5 : 0} y={-W} width={L / 2 + 5} height={W * 2} /></clipPath>
    <g clipPath={`url(#${id + lado})`}>
      <path d={husoD(L, W)} fill="rgba(207,233,255,.18)" stroke={OQ.testa} strokeWidth={6} />
      <clipPath id={id + 'c' + lado}><path d={husoD(L, W)} /></clipPath>
      <g clipPath={`url(#${id + 'c' + lado})`} stroke="rgba(207,233,255,.55)" strokeWidth={3} fill="none">
        {Array.from({ length: ny + 1 }, (_, j) => { const v = (j / ny - 0.5) * W; return <path key={'h' + j} d={`M ${-L / 2} 0 Q 0 ${v * 1.25} ${L / 2} 0`} />; })}
        {Array.from({ length: nx }, (_, i) => { const u = -L / 2 + (i + 0.5) * L / nx; return <line key={'v' + i} x1={u + (i % 2) * 10} y1={-W} x2={u - (i % 2) * 10} y2={W} />; })}
      </g>
    </g>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    {half(-1)}{half(1)}
    {!sinEmbrion && <g transform={`scale(${emb})`}>
      <ellipse cx={0} cy={0} rx={W * 0.62} ry={W * 0.36} fill={embrionColor} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-W * 0.45 + (i % 5) * W * 0.22 + (i > 4 ? W * 0.11 : 0)} cy={i > 4 ? W * 0.1 : -W * 0.1} r={W * 0.085} fill="none" stroke="rgba(22,18,15,.25)" strokeWidth={3} />)}
    </g>}
    {children}
  </g>;
}
// Hifa que avanza por una lista de puntos; p 0..1. Con septos.
function HifaCamino({ pts, p = 1, ancho = 12, color = OQ.hifa, brillo = 0 }) {
  if (p <= 0) return null;
  const segL = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  const tot = segL.reduce((a, b) => a + b, 0); let rest = tot * p; const out = [pts[0]];
  for (let i = 0; i < segL.length && rest > 0; i++) { const u = Math.min(1, rest / segL[i]); out.push([klerp(pts[i][0], pts[i + 1][0], u), klerp(pts[i][1], pts[i + 1][1], u)]); rest -= segL[i]; }
  const d = 'M ' + out.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g style={brillo ? { filter:`drop-shadow(0 0 ${10 * brillo}px ${color})` } : null}>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="rgba(120,100,60,.6)" strokeWidth={ancho} fill="none" strokeDasharray={`3 ${ancho * 5}`} />
  </g>;
}
// Ovillo de hifa (pelotón) dentro de una célula. p 0..1 se enrolla; dig 0..1 se digiere (se encoge en grumo).
function Ovillo({ cx, cy, r = 40, p = 1, dig = 0, seed = 1, ancho = 6 }) {
  if (p <= 0) return null;
  const N = 90, pts = [], g = krng(seed), f1 = 2.3 + g(), f2 = 3.1 + g(), ph = g() * 6;
  const rr = r * (1 - dig * 0.7);
  for (let i = 0; i <= N * p; i++) { const t = (i / N) * Math.PI * 7 + ph;
    pts.push([cx + Math.cos(t) * rr * (0.55 + 0.45 * Math.sin(f1 * t * 0.3)), cy + Math.sin(t) * rr * (0.55 + 0.45 * Math.cos(f2 * t * 0.3))]); }
  if (pts.length < 2) return null;
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const col = mixHex(OQ.hifa, '#b89a5a', dig);
  return <g opacity={1 - dig * 0.35}><path d={d} stroke={KC.ink} strokeWidth={ancho + 4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={col} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
}
// Embrión grande con células (vista de cerca para pelotones). (cx, cy) centro; rx, ry semiejes.
const EMB_CEL = (() => { const out = [], g = krng(5); const rx = 380, ry = 230, paso = 92;
  for (let j = -3; j <= 3; j++) for (let i = -5; i <= 5; i++) { const x = i * paso + (j % 2 ? paso / 2 : 0) + (g() - 0.5) * 14, y = j * paso * 0.82 + (g() - 0.5) * 12;
    if ((x * x) / ((rx - 40) * (rx - 40)) + (y * y) / ((ry - 34) * (ry - 34)) < 1) out.push([x, y]); }
  return out; })();
function EmbrionCelulas({ x, y, T, pel = 0, dig = 0, comida = 0 }) {
  const rx = 380, ry = 230, id = 'embc';
  return <g transform={`translate(${x} ${y})`}>
    <clipPath id={id}><ellipse rx={rx} ry={ry} /></clipPath>
    <ellipse rx={rx} ry={ry} fill={OQ.embrion} stroke={KC.ink} strokeWidth={7} />
    <g clipPath={`url(#${id})`}>
      {EMB_CEL.map(([cx, cy], i) => <g key={i}>
        <rect x={cx - 44} y={cy - 36} width={88} height={72} rx={24} fill={cx < -60 ? '#f3dc8e' : '#fbefc0'} stroke="rgba(120,90,30,.55)" strokeWidth={4} />
        <circle cx={cx + 12} cy={cy - 6} r={11} fill="rgba(140,100,40,.45)" />
      </g>)}
      {/* pelotones en las células basales (lado izquierdo, por donde entró el hongo) */}
      {EMB_CEL.map(([cx, cy], i) => cx < -60 ? <Ovillo key={'o' + i} cx={cx} cy={cy} r={36} p={kclamp(pel * 1.6 - ((cx + 380) / 320) * 0.6, 0, 1)} dig={dig} seed={i + 2} ancho={5} /> : null)}
      {/* comida que pasa a las células de arriba (puntitos dorados) */}
      {comida > 0 && Array.from({ length: 26 }, (_, k) => { const g = krng(k + 40); const x0 = -280 + g() * 200, y0 = (g() - 0.5) * 300, x1 = 40 + g() * 280, y1 = (g() - 0.5) * 300;
        const u = kclamp(comida * 1.5 - g() * 0.5, 0, 1); return <circle key={'f' + k} cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u) + Math.sin(T * 3 + k) * 4} r={8} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} opacity={u > 0 ? 1 : 0} />; })}
    </g>
  </g>;
}
// Protocormo: bolita que se hincha y se pone verde; luego hoja y raíz. crece 0..1, verde 0..1, hoja 0..1, raiz 0..1.
function Protocormo({ x, y, s = 1, crece = 1, verde = 1, hoja = 0, raiz = 0, T = 0 }) {
  const r = klerp(60, 150, kEase.sale(kclamp(crece, 0, 1)));
  const col = mixHex(OQ.embrion, OQ.verde, verde), col2 = mixHex('#fbefc0', '#8fe08a', verde);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* rizoides (pelitos de absorción) */}
    {crece > 0.5 && Array.from({ length: 14 }, (_, i) => { const a = Math.PI * (0.15 + i * 0.05); const L = 40 * kclamp(crece * 2 - 1, 0, 1);
      return <line key={i} x1={Math.cos(a) * r * 0.95} y1={Math.sin(a) * r * 0.95} x2={Math.cos(a) * (r + L)} y2={Math.sin(a) * (r + L)} stroke="#f4f1e0" strokeWidth={3} />; })}
    {raiz > 0 && <path d={`M ${-r * 0.3} ${r * 0.8} Q ${-r * 0.5} ${r * 1.6 * raiz} ${-r * 0.2} ${r * 2.4 * raiz}`} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />}
    {raiz > 0 && <path d={`M ${-r * 0.3} ${r * 0.8} Q ${-r * 0.5} ${r * 1.6 * raiz} ${-r * 0.2} ${r * 2.4 * raiz}`} stroke="#eef3e8" strokeWidth={18} fill="none" strokeLinecap="round" />}
    <ellipse rx={r} ry={r * 0.88} fill={col} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-r * 0.35} cy={-r * 0.35} rx={r * 0.3} ry={r * 0.18} fill={col2} opacity=".7" />
    {hoja > 0 && <path d={`M 0 ${-r * 0.8} Q ${-r * 0.4} ${-r * 0.8 - 200 * hoja} ${-r * 0.1 + mece(T, 3, 0.4) * 6} ${-r * 0.8 - 260 * hoja} Q ${r * 0.5} ${-r * 0.8 - 150 * hoja} 0 ${-r * 0.8} Z`} fill={OQ.hoja2} stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Frasco de laboratorio con plántula y su hongo sobre el medio.
function FrascoLab({ x, y, s = 1, planta = 1, T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-250} width={160} height={250} rx={26} fill="rgba(220,245,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-64} y={-290} width={128} height={46} rx={10} fill="#e8e1d2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-74} y={-80} width={148} height={74} rx={14} fill="#f1df9a" stroke={KC.ink} strokeWidth={4} />
    {/* micelio blanco sobre el medio */}
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${-60 + i * 22} -70 q 8 -14 18 -4`} stroke="#ffffff" strokeWidth={4} fill="none" />)}
    {planta > 0 && <g transform={`translate(0 -78) scale(${planta})`}>
      <path d={`M 0 0 Q -40 -70 ${-50 + mece(T, seed, 0.3) * 4} -120 Q -10 -80 0 0 Z`} fill={OQ.hoja2} stroke={KC.ink} strokeWidth={5} />
      <path d={`M 0 0 Q 40 -60 ${44 + mece(T, seed + 2, 0.3) * 4} -110 Q 8 -70 0 0 Z`} fill={OQ.hoja} stroke={KC.ink} strokeWidth={5} />
      <circle r={14} fill={OQ.verde} stroke={KC.ink} strokeWidth={4} />
    </g>}
    <rect x={-60} y={-236} width={20} height={150} rx={10} fill="#fff" opacity=".45" />
  </g>;
}
// Bletia (orquídea terrestre): hojas plegadas desde el suelo y vara con flores rosa-magenta. vida 0..1 (0 = se secó). flor 0..1.
function Bletia({ x, y, s = 1, vida = 1, flor = 0, T = 0, seed = 1 }) {
  const c1 = mixHex('#9a8a6a', OQ.hoja, vida), c2 = mixHex('#b5a67f', OQ.hoja2, vida);
  return <g transform={`translate(${x} ${y}) scale(${s * (0.75 + 0.25 * vida)})`} opacity={0.35 + 0.65 * vida}>
    {[-1, 1, -0.3].map((d, i) => <g key={i}>
      <path d={`M 0 0 Q ${d * 40} -90 ${d * 70 + mece(T, seed + i, 0.3) * 5} ${-190 + i * 30} Q ${d * 10} -100 0 0 Z`} fill={i === 2 ? c2 : c1} stroke={KC.ink} strokeWidth={5} />
      <path d={`M 0 -6 Q ${d * 32} -90 ${d * 62} ${-170 + i * 30}`} stroke="rgba(0,0,0,.25)" strokeWidth={3} fill="none" />
    </g>)}
    {flor > 0 && <g>
      <path d={`M 6 0 L ${10} ${-260 * flor}`} stroke="#5b7d2a" strokeWidth={6} />
      {[0, 1, 2].map((k) => { const fk = kEase.rebote(kclamp(flor * 1.6 - k * 0.25, 0, 1)); return fk > 0 ? <g key={k} transform={`translate(${10 + (k % 2 ? 22 : -22)} ${-260 * flor + k * 60}) scale(${fk})`}>
        {[0, 72, 144, 216, 288].map((a, j) => <ellipse key={j} cy={-20} rx={10} ry={22} transform={`rotate(${a})`} fill={j % 2 ? '#f07cc0' : OQ.bletia} stroke={KC.ink} strokeWidth={3} />)}
        <circle r={8} fill="#7a1a5a" stroke={KC.ink} strokeWidth={2} />
      </g> : null; })}
    </g>}
  </g>;
}
// Roca volcánica del Pedregal.
function Roca({ x, y, w = 300, h = 150, seed = 1 }) {
  const g = krng(seed), n = 9;
  const d = Array.from({ length: n }, (_, i) => { const a = Math.PI + (i / (n - 1)) * Math.PI, rr = 0.8 + g() * 0.25; return `${i ? 'L' : 'M'} ${(Math.cos(a) * w / 2 * rr).toFixed(1)} ${(Math.sin(a) * h * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}><path d={d} fill={OQ.roca} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0, 1, 2, 3].map((k) => <circle key={k} cx={(g() - 0.5) * w * 0.6} cy={-g() * h * 0.6} r={6 + g() * 6} fill={OQ.roca2} />)}</g>;
}
// Vainilla: enredadera trepando un tronco, hojas carnosas, flor amarillo verdosa y vainas verdes largas.
function Vainilla({ x, y, h = 900, p = 1, flor = 1, vainas = 1, T = 0 }) {
  const pts = Array.from({ length: 13 }, (_, i) => [Math.sin(i * 1.1) * 70, -i * h / 12]);
  const n = Math.max(2, Math.ceil(pts.length * p));
  const d = 'M ' + pts.slice(0, n).map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-h - 60} width={140} height={h + 80} rx={20} fill={OQ.corteza2} stroke={KC.ink} strokeWidth={8} />
    <path d={d} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinejoin="round" />
    <path d={d} stroke="#4f9a2f" strokeWidth={11} fill="none" strokeLinejoin="round" />
    {pts.slice(1, n).map(([px, py], i) => { const dir = i % 2 ? 1 : -1;
      return <g key={i}>
        <path d={`M ${px} ${py} q ${dir * 50} -20 ${dir * 120} ${-6 + mece(T, i, 0.3) * 4} q ${-dir * 60} 40 ${-dir * 120} 6 Z`} fill={OQ.hoja2} stroke={KC.ink} strokeWidth={5} />
        {i % 3 === 1 && <path d={`M ${px} ${py} q ${-dir * 20} 10 ${-dir * 46} 4`} stroke="#e9efe6" strokeWidth={6} fill="none" strokeLinecap="round" />}
      </g>; })}
    {flor > 0 && <g transform={`translate(${pts[8][0] + 110} ${pts[8][1] - 10}) scale(${kEase.rebote(kclamp(flor, 0, 1))})`}>
      {[-60, -20, 20, 60, 180].map((a, j) => <ellipse key={j} cy={-34} rx={12} ry={36} transform={`rotate(${a})`} fill="#e6eb8a" stroke={KC.ink} strokeWidth={4} />)}
      <path d="M -18 0 Q 0 46 18 0 Q 0 10 -18 0 Z" fill="#f6f2a0" stroke={KC.ink} strokeWidth={4} />
    </g>}
    {vainas > 0 && [0, 1, 2, 3].map((k) => <path key={k} d={`M ${pts[5][0] - 20 + k * 14} ${pts[5][1]} q ${-30 + k * 6} ${160 * vainas} ${-10 + k * 10} ${300 * vainas}`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />)}
    {vainas > 0 && [0, 1, 2, 3].map((k) => <path key={'v' + k} d={`M ${pts[5][0] - 20 + k * 14} ${pts[5][1]} q ${-30 + k * 6} ${160 * vainas} ${-10 + k * 10} ${300 * vainas}`} stroke="#6fb33a" strokeWidth={14} fill="none" strokeLinecap="round" />)}
  </g>;
}

// ---------- shot ----------
function OrquideaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bo: CUES.Bosque, Ca: CUES.Capsula, Se: CUES.Semilla, Hi: CUES.Hifa, Pe: CUES.Peloton, Pr: CUES.Pregunta, Di: CUES.Digiere, Pc: CUES.Protocormo, Es: CUES.Estudio, Re: CUES.Resultado, Va: CUES.Vainilla, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre0 = kprog(T, K.G + 0.15, K.G + 0.7, kEase.sale);
  const dedo = kprog(T, K.G, K.G + 0.25) * (1 - kprog(T, K.G + 0.6, K.G + 1.0));
  const RAMA_Y = 760, CAP_X = 330;
  const hifaPts = [[-40, 1260], [70, 1080], [140, 900], [175, 830], [270, 826], [372, 822]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cápsula se abre y suelta polvo */}
      <Escena T={T} a={K.G} b={K.Bo} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Neblina T={T} y0={300} n={4} o={0.25} />
          <Rama x={0} y={RAMA_Y} w={1080} T={T} />
          <Orquidea x={720} y={RAMA_Y - 40} s={1.0} flor={0} vara={0.0} T={T} />
          <Capsula x={CAP_X} y={RAMA_Y + 70} s={1.55} abre={abre0} T={T} />
          <Polvo T={T} t0={K.G + 0.35} x={CAP_X} y={RAMA_Y + 330} n={160} vx={210} vy={-50} seed={4} />
          {/* dedo que toca la cápsula */}
          {dedo > 0 && <g transform={`translate(${CAP_X - 230 + dedo * 120} ${RAMA_Y + 260})`} opacity={dedo}>
            <path d="M -260 30 L -40 0 Q 10 -6 14 22 Q 10 50 -40 46 L -260 60 Z" fill="#e7b58e" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={-8} cy={22} rx={16} ry={14} fill="#f6d9c2" stroke={KC.ink} strokeWidth={4} />
          </g>}
        </>)}
      </Escena>
      {/* 1 · bosque de niebla */}
      <Escena T={T} a={K.Bo} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#bff3e1, #6fd3b4)' }}></div>
        {fsvg(<>
          <ArbolNiebla x={170} y={1700} h={1400} s={0.9} T={T} seed={2} />
          <ArbolNiebla x={560} y={1760} h={1500} s={1.0} T={T} seed={5} />
          <ArbolNiebla x={930} y={1700} h={1400} s={0.85} T={T} seed={8} />
          <Neblina T={T} y0={420} n={5} o={0.35} />
        </>)}
      </Escena>
      {/* 2 · la cápsula suelta millones de semillas al viento */}
      <Escena T={T} a={K.Ca} b={K.Se} zoom={0.08} origen="30% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rama x={0} y={RAMA_Y} w={1080} T={T} />
          <Orquidea x={720} y={RAMA_Y - 40} s={1.0} flor={0} vara={0} T={T} />
          <Capsula x={CAP_X} y={RAMA_Y + 70} s={1.55} abre={1} T={T} />
          <Polvo T={T} t0={K.Ca - 1.2} x={CAP_X} y={RAMA_Y + 330} n={260} vx={300} vy={-70} seed={9} />
        </>)}
      </Escena>
      {/* 3 · al microscopio: la semilla */}
      <Escena T={T} a={K.Se} b={K.Hi + 0.2} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <SemillaMicro x={540} y={850} L={kprog(T, K.Se, K.Se + 0.8, kEase.sale) * 760 + 1} W={250} T={T} />
          {/* lonchera tachada */}
          {T > K.Se + 2.6 && <g transform={`translate(880 1110) scale(${kEase.rebote(kprog(T, K.Se + 2.6, K.Se + 3.0))})`}>
            <rect x={-70} y={-50} width={140} height={100} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <path d="M -36 -50 Q -36 -86 0 -86 Q 36 -86 36 -50" stroke={KC.ink} strokeWidth={10} fill="none" />
            <line x1={-90} y1={-80} x2={90} y2={70} stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={kprog(T, K.Se + 3.1, K.Se + 3.4)} />
          </g>}
        </>)}
      </Escena>
      {/* 4 · la hifa entra por la punta de la semilla hasta el embrión */}
      <Escena T={T} a={K.Hi} b={K.Pe} zoom={0.06} origen="40% 45%">
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <SemillaMicro x={540} y={850} L={760} W={250} T={T} />
          <g transform="translate(0 0)"><HifaCamino pts={hifaPts.map(([a, b]) => [a, b])} p={kprog(T, K.Hi + 0.2, K.Hi + 2.8, kEase.suave)} ancho={12} brillo={0.6} /></g>
          {/* ramita lateral de la hifa */}
          <HifaCamino pts={[[70, 1080], [10, 980], [-30, 940]]} p={kprog(T, K.Hi + 1.0, K.Hi + 2.4)} ancho={10} />
        </>)}
      </Escena>
      {/* 5 · pelotones dentro de las células del embrión */}
      <Escena T={T} a={K.Pe} b={K.Pr} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <HifaCamino pts={[[-40, 900], [80, 880], [170, 870]]} p={1} ancho={12} />
          <EmbrionCelulas x={540} y={880} T={T} pel={kprog(T, K.Pe + 0.3, K.Pe + 3.2)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿quién se come a quién? */}
      <Escena T={T} a={K.Pr} b={K.Di} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g transform="translate(260 900) scale(.55)"><SemillaMicro x={0} y={0} L={760} W={250} T={T} /></g>
          <HifaCamino pts={[[-30, 1180], [90, 1080], [150, 960], [160, 910]]} p={1} ancho={12} />
          <Interrogacion T={T} x={300} y={760} tam={340} />
        </>)}
      </Escena>
      {/* 7 · la semilla digiere los pelotones */}
      <Escena T={T} a={K.Di} b={K.Pc} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <HifaCamino pts={[[-40, 900], [80, 880], [170, 870]]} p={1} ancho={12} />
          <EmbrionCelulas x={540} y={880} T={T} pel={1} dig={kprog(T, K.Di + 1.0, K.Di + 3.0)} comida={kprog(T, K.Di + 1.4, K.Di + 3.8)} />
        </>)}
      </Escena>
      {/* 8 · protocormo (time-lapse) */}
      <Escena T={T} a={K.Pc} b={K.Es} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {(() => { const ab = kprog(T, K.Pc + 0.3, K.Pc + 1.2, kEase.sale); return <>
            {ab < 1 && <g opacity={1 - kprog(T, K.Pc + 1.6, K.Pc + 2.2)}><SemillaMicro x={540} y={900} L={760 * 0.6} W={250 * 0.6} abre={ab} sinEmbrion T={T} /></g>}
            <Protocormo x={540} y={900} crece={kprog(T, K.Pc + 0.2, K.Pc + 1.8)} verde={kprog(T, K.Pc + 1.0, K.Pc + 2.2)} hoja={kprog(T, K.Pc + 2.2, K.Pc + 3.4, kEase.sale)} raiz={kprog(T, K.Pc + 2.6, K.Pc + 3.7, kEase.sale)} T={T} />
          </>; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio: UNAM, frascos y regreso al Pedregal */}
      <Escena T={T} a={K.Es} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {(() => { const pase = kprog(T, K.Es + 4.6, K.Es + 5.6, kEase.suave); return <>
            <g transform={`translate(${-pase * 1100} 0)`}>
              {[[250, 1080], [540, 1080], [830, 1080]].map(([fx, fy], i) => <FrascoLab key={i} x={fx} y={fy} s={kEase.rebote(kprog(T, K.Es + 0.6 + i * 0.2, K.Es + 1.0 + i * 0.2))} planta={kprog(T, K.Es + 1.4 + i * 0.2, K.Es + 2.4 + i * 0.2)} T={T} seed={i} />)}
            </g>
            <g transform={`translate(${(1 - pase) * 1100} 0)`}>
              <Roca x={200} y={1090} w={380} h={170} seed={3} />
              <Roca x={560} y={1110} w={340} h={140} seed={6} />
              <Roca x={900} y={1090} w={360} h={160} seed={9} />
              {[[140, 1000], [330, 1010], [470, 1040], [640, 1040], [790, 1010], [960, 1000]].map(([bx, by], i) => <Bletia key={i} x={bx} y={by} s={0.6 * kprog(T, K.Es + 5.8 + i * 0.15, K.Es + 6.4 + i * 0.15, kEase.rebote)} T={T} seed={i} />)}
            </g>
          </>; })()}
        </>)}
      </Escena>
      {/* 10 · resultado: tras 6 años, cerca de la mitad sobrevive y florece */}
      <Escena T={T} a={K.Re} b={K.Va} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Roca x={200} y={1090} w={380} h={170} seed={3} />
          <Roca x={560} y={1110} w={340} h={140} seed={6} />
          <Roca x={900} y={1090} w={360} h={160} seed={9} />
          {[[140, 1000], [330, 1010], [470, 1040], [640, 1040], [790, 1010], [960, 1000]].map(([bx, by], i) => { const muere = [1, 3, 5].includes(i) ? kprog(T, K.Re + 0.8 + i * 0.1, K.Re + 1.8 + i * 0.1) : 0;
            const fl = i === 0 || i === 4 ? kprog(T, K.Re + 2.0 + i * 0.1, K.Re + 3.0 + i * 0.1) : 0;
            return <Bletia key={i} x={bx} y={by} s={0.6} vida={1 - muere} flor={fl} T={T} seed={i} />; })}
        </>)}
      </Escena>
      {/* 11 · la vainilla también es orquídea */}
      <Escena T={T} a={K.Va} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Vainilla x={230} y={1170} h={700} p={kprog(T, K.Va, K.Va + 1.5)} flor={kprog(T, K.Va + 1.2, K.Va + 1.7)} vainas={kprog(T, K.Va + 1.6, K.Va + 2.6)} T={T} />
          <g opacity={kprog(T, K.Va + 1.8, K.Va + 2.4)}>
            <MapaMexico x={560} y={790} ancho={480}>
              {(() => { const [px, py] = mxProy(-97.45, 20.45); return <><circle cx={px} cy={py} r={34} fill={KC.red} opacity=".35" /><circle cx={px} cy={py} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></>; })()}
            </MapaMexico>
          </g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma rama del inicio, ahora en flor, y el polvo encuentra su hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Neblina T={T} y0={300} n={4} o={0.25} />
          <Rama x={0} y={RAMA_Y} w={1080} T={T} />
          <Orquidea x={720} y={RAMA_Y - 40} s={1.0} flor={kprog(T, K.C + 0.3, K.C + 1.6)} vara={kprog(T, K.C, K.C + 1.0)} T={T} />
          <Capsula x={CAP_X} y={RAMA_Y + 70} s={1.55} abre={1} T={T} />
          {[[120, RAMA_Y - 50], [470, RAMA_Y - 56], [960, RAMA_Y - 46]].map(([px, py], i) => { const c = kprog(T, K.C + 1.2 + i * 0.3, K.C + 2.0 + i * 0.3, kEase.rebote);
            return c > 0 ? <g key={i} transform={`translate(${px} ${py}) scale(${c * 0.55})`}><path d="M 0 0 Q -30 -60 -60 -80 Q -10 -60 0 0 Z" fill={OQ.hoja2} stroke={KC.ink} strokeWidth={6} /><path d="M 0 0 Q 30 -50 56 -66 Q 10 -50 0 0 Z" fill={OQ.hoja} stroke={KC.ink} strokeWidth={6} /><circle r={16} fill={OQ.verde} stroke={KC.ink} strokeWidth={5} /></g> : null; })}
          <Polvo T={T} t0={K.C - 0.5} x={CAP_X} y={RAMA_Y + 330} n={120} vx={170} vy={-40} seed={21} hilos={kprog(T, K.C + 1.0, K.C + 2.5)} />
        </>)}
      </Escena>

      {/* ---------- textos ---------- */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.1} until={K.G + 2.4} texto={TX.mito} x={300} y={470} tam={64} />
      <Chip T={T} at={K.G + 1.5} until={K.Bo - 0.3} texto={TX.semillas} x={330} y={470} tam={42} borde={KC.gold} />
      <Chip T={T} at={K.G + 3.0} until={K.Bo - 0.3} texto={TX.sinHongo} x={540} y={1080} tam={34} borde={KC.red} />
      <NumeroGigante T={T} at={K.Bo + 0.4} until={K.Ca - 0.3} valor={TX.numMx} prefijo={TX.numMxPre} dur={1.0} x={330} y={560} tam={170} color={KC.yellow} />
      <Etq T={T} at={K.Bo + 0.9} until={K.Ca - 0.3} x={60} y={700} texto={TX.etqMx1} tam={34} color={KC.texto} />
      <Etq T={T} at={K.Bo + 1.1} until={K.Ca - 0.3} x={60} y={746} texto={TX.etqMx2} tam={34} color={KC.texto} />
      <Chip T={T} at={K.Bo + 2.6} until={K.Ca - 0.3} texto={TX.bosque1} x={540} y={1000} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Bo + 3.2} until={K.Ca - 0.3} texto={TX.bosque2} x={540} y={1085} tam={30} borde={KC.mint} mono />
      <NumeroGigante T={T} at={K.Ca + 0.2} until={K.Se - 0.3} valor={TX.numCap} dur={1.6} x={540} y={430} tam={130} color={KC.yellow} />
      <Etq T={T} at={K.Ca + 0.6} until={K.Se - 0.3} x={140} y={540} texto={TX.etqCap} tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ca + 1.0} until={K.Se - 0.3} x={140} y={590} texto={TX.etqCap2} tam={24} color={KC.texto} />
      <Chip T={T} at={K.Se + 0.2} until={K.Pe - 0.3} texto={TX.porDentro} x={400} y={430} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Se + 0.9} until={K.Hi - 0.2} x={250} y={650} texto={TX.testa} tam={32} color={OQ.testa} />
      <Etq T={T} at={K.Se + 1.4} until={K.Hi - 0.2} x={640} y={1010} texto={TX.embrion} tam={34} color={OQ.embrion} />
      <Chip T={T} at={K.Se + 2.0} until={K.Hi - 0.2} texto={TX.sinReservas} x={400} y={1120} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Hi + 1.2} until={K.Pe - 0.2} x={180} y={1170} texto={TX.hifa} tam={32} color={OQ.hifa} />
      <Chip T={T} at={K.Hi + 1.6} until={K.Pe - 0.2} texto={TX.micorriza} x={760} y={560} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Hi + 2.2} until={K.Pe - 0.2} texto={<i>{TX.hongo1}</i>} x={640} y={1100} tam={34} borde={KC.gold} mono />
      <Chip T={T} at={K.Hi + 2.6} until={K.Pe - 0.2} texto={<i>{TX.hongo2}</i>} x={760} y={650} tam={34} borde={KC.gold} mono />
      <Etq T={T} at={K.Pe + 1.4} until={K.Pr - 0.2} x={60} y={600} texto={TX.peloton} tam={32} color={OQ.hifa} />
      <Etq T={T} at={K.Pe + 2.0} until={K.Pr - 0.2} x={300} y={1160} texto={TX.celula} tam={28} color={OQ.embrion} />
      <Chip T={T} at={K.Di + 1.4} until={K.Pc - 0.2} texto={TX.mico} x={540} y={1160} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Pc + 1.4} until={K.Es - 0.2} x={700} y={900} texto={TX.protocormo} tam={36} color="#8fe08a" />
      <Etq T={T} at={K.Pc + 2.6} until={K.Es - 0.2} x={590} y={640} texto={TX.hoja} tam={30} color={OQ.hoja2} />
      <Etq T={T} at={K.Pc + 3.0} until={K.Es - 0.2} x={590} y={1180} texto={TX.raiz} tam={30} color="#eef3e8" />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 4.5} anio={TX.anio} quien={TX.estQuien} revista={TX.estRevista} x={640} y={600} />
      <Etq T={T} at={K.Es + 4.6} until={K.Re - 0.2} x={60} y={430} texto={TX.bletia} it tam={40} color={KC.texto} />
      <Etq T={T} at={K.Es + 4.9} until={K.Re - 0.2} x={60} y={480} texto={TX.peligro} tam={30} color={KC.red} />
      <Etq T={T} at={K.Es + 1.6} until={K.Es + 4.5} x={60} y={790} texto={TX.frasco} tam={28} color={KC.texto} />
      <Chip T={T} at={K.Re + 0.2} until={K.Va - 0.3} texto={TX.anios} x={250} y={470} tam={44} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Re + 0.8} until={K.Va - 0.3} valor={TX.pct} prefijo={TX.pctPre} sufijo={TX.pctSuf} dur={1.0} x={330} y={640} tam={150} color={KC.mint} />
      <Etq T={T} at={K.Re + 1.2} until={K.Va - 0.3} x={60} y={770} texto={TX.sobrevive} tam={34} color={KC.texto} />
      <Chip T={T} at={K.Re + 2.4} until={K.Va - 0.3} texto={TX.florecen} x={540} y={820} tam={40} borde={OQ.bletia} />
      <Etq T={T} at={K.Va + 0.6} until={K.C - 0.3} x={450} y={690} texto={TX.vainilla} it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Va + 1.0} until={K.C - 0.3} x={450} y={736} texto={TX.vainilla2} tam={28} color={KC.texto} />
      <Etq T={T} at={K.Va + 2.2} until={K.C - 0.3} x={560} y={1140} texto={TX.nativa} tam={24} color={KC.texto} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto={TX.cierre} x={300} y={470} tam={44} borde={KC.gold} />

      {/* ---------- barras de escala ---------- */}
      <BarraEscala T={T} at={K.G} until={K.Bo} texto="1 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.Bo} until={K.Ca} texto="1 m" largo={200} color={KC.ink} />
      <BarraEscala T={T} at={K.Ca} until={K.Se} texto="1 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.Se} until={K.Pe} texto="0.1 mm" largo={200} />
      <BarraEscala T={T} at={K.Pe} until={K.Pr} texto="20 µm" largo={160} />
      <BarraEscala T={T} at={K.Pr} until={K.Di} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Di} until={K.Pc} texto="20 µm" largo={160} />
      <BarraEscala T={T} at={K.Pc} until={K.Es} texto="1 mm" largo={250} />
      <BarraEscala T={T} at={K.Es + 0.3} until={K.Va} texto="10 cm" largo={130} color={KC.ink} y={1480} />
      <BarraEscala T={T} at={K.Va} until={K.C} texto="10 cm · mapa esquemático" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={60} color={KC.ink} />

      {/* ---------- subtítulos (idx = línea de narracion.json) ---------- */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bo - 0.1} texto="No es polvo: son *semillas de orquídea.*" />
      <Subtitulo T={T} idx={1} at={K.Bo + 0.1} until={K.Ca - 0.1} texto="Más de *1,200 especies* en México." />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Se - 0.1} texto="Una cápsula: *millones de semillas.*" />
      <Subtitulo T={T} idx={3} at={K.Se + 0.1} until={K.Hi - 0.1} texto="Sin reservas: *no trae lonchera.*" />
      <Subtitulo T={T} idx={4} at={K.Hi + 0.1} until={K.Pe - 0.1} texto="Deja entrar a *un hongo micorrízico.*" />
      <Subtitulo T={T} idx={5} at={K.Pe + 0.1} until={K.Pr - 0.1} texto="Ovillos de hifas: *los pelotones.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Di - 0.1} texto="¿Y quién se come *a quién?*" />
      <Subtitulo T={T} idx={7} at={K.Di + 0.1} until={K.Pc - 0.1} texto="La semilla *se come al hongo.*" />
      <Subtitulo T={T} idx={8} at={K.Pc + 0.1} until={K.Es - 0.1} texto="Una bolita: *el protocormo.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Re - 0.1} texto="UNAM: *de vuelta al Pedregal.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Va - 0.1} texto="Seis años: *cerca de la mitad.*" />
      <Subtitulo T={T} idx={11} at={K.Va + 0.1} until={K.C - 0.1} texto="La vainilla *también es orquídea.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un bosque *esperando a su hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Bo + 1.3, K.Bo + 4.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Se + 1.1, K.Hi - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pe + 0.4, K.Pr - 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pr + 0.05, K.Di + 1.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 0.9, K.Es + 4.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.Re + 0.2, K.Va - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Va + 0.8, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="83" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

window.OrquideaApp = kApp(OrquideaShot);
