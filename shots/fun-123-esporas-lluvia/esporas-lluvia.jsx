// Shot Fungi Mati #123 · Esa seta no es solo un hongo: es una fábrica de viento… y quizá de lluvia — NARRADO
// (N3 capítulos + N1 por dentro). Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Escala del jardín: 44 px = 1 cm (la seta mide ~12 cm; la regla de 10 cm = 440 px).

const EL = { somb:'#c99a6a', somb2:'#a8764a', pie:'#f3e6c4', lam:'#6e4a2e', frio:'#2f7bff', frio2:'#8fc3ff', tibio:'#ff8a1f',
  espora:'#b9824e', espora2:'#7a4d26', gota:'#bfe9ff', gota2:'#5ab8f0', hielo:'#e9f8ff', roya:'#e0701c', roya2:'#a8460c',
  nube:'#e9eef5', nube2:'#b8c4d4', pasto:'#3fbf4a', pasto2:'#2a9a3a', tierra:'#6b4a2e', mar:'#9fd8f5', tierraMapa:'#ffe9a8' };
const ESC_CM = 44;
const dPts = (pts) => 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
const frac = (v) => v - Math.floor(v);

// Seta de jardín de perfil (sombrero café claro, laminillas cafés, sin anillo). Base del pie en (x, y).
function SetaJardin({ T = 0, x, y, s = 1, crece = 1, vapor = 0, frio = 0 }) {
  const h = 150, a = 150;
  return <g>
    {frio > 0 && <ellipse cx={x} cy={y - h * s * 0.45} rx={a * s * 0.62} ry={h * s * 0.55} fill={EL.frio2} opacity={0.45 * frio} style={{ filter:'blur(18px)' }} />}
    <Seta x={x} y={y} s={s} crece={crece} sombrero={EL.somb} pie={EL.pie} escamas={false} anillo={false} laminas={EL.lam} />
    {crece >= 1 && <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* laminillas: rayas radiales bajo el sombrero */}
      <ellipse cx={0} cy={-h + 7} rx={a / 2 - 8} ry={11} fill="#8a6040" />
      {Array.from({ length: 11 }, (_, i) => { const u = (i + 0.5) / 11; const px = -a / 2 + 8 + u * (a - 16);
        return <line key={i} x1={px} y1={-h + 3} x2={px * 0.3} y2={-h + a * 0.12} stroke={EL.lam} strokeWidth={3.2} />; })}
      {/* brillo del sombrero */}
      <path d={`M ${-a * 0.3} ${-h - a * 0.42} Q 0 ${-h - a * 0.56} ${a * 0.25} ${-h - a * 0.44}`} stroke="#fff" strokeWidth={6} fill="none" opacity=".35" strokeLinecap="round" />
    </g>}
    {/* vapor de agua que sale del sombrero */}
    {vapor > 0 && Array.from({ length: 14 }, (_, k) => { const u = frac(T * 0.45 + k / 14); const px = x + (-0.4 + (k % 7) / 7 * 0.8) * a * s + Math.sin(T * 2 + k) * 8;
      return <circle key={k} cx={px} cy={y - (h + a * 0.5) * s - u * 160} r={6 + (k % 3) * 2} fill={EL.frio2} stroke="#fff" strokeWidth={2} opacity={vapor * (1 - u) * 0.9} />; })}
  </g>;
}

// Trayectoria del aire frío (Dressaire et al. 2016): sale de debajo del sombrero hacia abajo, corre pegado al suelo
// y al chocar con una piedrita sube en un remolino. sd = lado (+1 der, −1 izq). Devuelve puntos.
function flujoPts(x, yc, yg, sd, alto = 440, N = 90) {
  const out = [];
  for (let i = 0; i <= N; i++) { const u = i / N; let px, py;
    if (u < 0.15) { const t = u / 0.15; const ax = x + sd * 25, ay = yc, cx = x + sd * 30, cy = yg - 30, bx = x + sd * 90, by = yg - 22;
      px = (1 - t) * (1 - t) * ax + 2 * t * (1 - t) * cx + t * t * bx; py = (1 - t) * (1 - t) * ay + 2 * t * (1 - t) * cy + t * t * by; }
    else if (u < 0.45) { const t = (u - 0.15) / 0.3; px = klerp(x + sd * 90, x + sd * 300, t); py = yg - 22; }
    else if (u < 0.78) { const t = (u - 0.45) / 0.33; const th = Math.PI / 2 - t * Math.PI; px = x + sd * (300 + 78 * Math.cos(th)); py = yg - 100 + 78 * Math.sin(th); }
    else { const t = (u - 0.78) / 0.22; const ax = x + sd * 300, ay = yg - 178, cx = x + sd * 230, cy = yg - 230, bx = x + sd * 250, by = yg - alto;
      px = (1 - t) * (1 - t) * ax + 2 * t * (1 - t) * cx + t * t * bx; py = (1 - t) * (1 - t) * ay + 2 * t * (1 - t) * cy + t * t * by; }
    out.push([px, py]); }
  return out;
}
// Dibujo del flujo: aire frío (azul) + aire tibio que entra por arriba (naranja) + esporas que viajan. p 0..1 = cuánto se ve.
function Flujo({ T, x, yc, yg, p = 1, esporas = 1, alto = 440, tibio = 1 }) {
  if (p <= 0) return null;
  return <g opacity={p}>
    {[1, -1].map((sd) => { const pts = flujoPts(x, yc, yg, sd, alto); const n = Math.max(2, Math.ceil(pts.length * kclamp(p * 1.4, 0, 1)));
      const vis = pts.slice(0, n), fin = vis[vis.length - 1], pre = vis[vis.length - 3] || vis[0];
      const ang = Math.atan2(fin[1] - pre[1], fin[0] - pre[0]) * 180 / Math.PI;
      return <g key={sd}>
        <path d={dPts(vis)} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".35" />
        <path d={dPts(vis)} stroke={EL.frio} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="26 16" strokeDashoffset={-T * 70} />
        <path d="M 0 0 L -26 -16 L -26 16 Z" fill={EL.frio} stroke={KC.ink} strokeWidth={4} transform={`translate(${fin[0]} ${fin[1]}) rotate(${ang})`} />
        {/* piedrita contra la que choca el aire */}
        <ellipse cx={x + sd * 360} cy={yg - 14} rx={34} ry={20} fill="#9a8f84" stroke={KC.ink} strokeWidth={5} />
        {tibio > 0 && <g opacity={tibio}>
          <path d={`M ${x + sd * 210} ${yc - 360} Q ${x + sd * 230} ${yc - 180} ${x + sd * 120} ${yc - 70}`} stroke={EL.tibio} strokeWidth={8} fill="none" strokeDasharray="18 14" strokeDashoffset={-T * 50} strokeLinecap="round" />
          <path d="M 0 0 L -22 -13 L -22 13 Z" fill={EL.tibio} stroke={KC.ink} strokeWidth={3} transform={`translate(${x + sd * 120} ${yc - 70}) rotate(${sd > 0 ? 140 : 40})`} />
        </g>}
        {esporas > 0 && Array.from({ length: 10 }, (_, k) => { const u = frac(T * 0.22 + k / 10 + (sd > 0 ? 0 : 0.05)); if (u > p * 1.3) return null;
          const q = pts[Math.min(pts.length - 1, Math.floor(u * (pts.length - 1)))];
          return <ellipse key={k} cx={q[0]} cy={q[1]} rx={6} ry={4.5} fill={EL.espora2} stroke="#fff" strokeWidth={1.5} opacity={esporas * kclamp((1 - u) * 5, 0, 1)} />; })}
      </g>; })}
  </g>;
}
// Pasto mojado (acaba de llover): franja verde con hojitas y gotas de rocío. yg = línea del suelo.
function PastoMojado({ T, yg }) {
  return <g>
    <rect x={-20} y={yg} width={KW + 40} height={KH - yg + 20} fill={EL.pasto2} />
    <rect x={-20} y={yg} width={KW + 40} height={30} fill={EL.pasto} />
    {Array.from({ length: 46 }, (_, i) => { const bx = i * 24 + (i % 3) * 5, hh = 34 + (i * 37) % 30, m = mece(T, i, 0.4) * 4;
      return <path key={i} d={`M ${bx} ${yg + 12} Q ${bx + 3 + m} ${yg - hh * 0.5} ${bx + 8 + m} ${yg - hh}`} stroke={i % 2 ? EL.pasto : '#57d062'} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={40 + i * 88} cy={yg - 14 - (i % 3) * 8} r={6} fill={EL.gota} stroke="#fff" strokeWidth={2} opacity=".9" />)}
  </g>;
}
// Basidiospora: asimétrica, elipsoide, con el apículo (apéndice hilar) de lado cerca de la base. (x, y) = centro.
function Basidiospora({ x, y, s = 1, rot = 0, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 4 -150 C 96 -148 122 -40 104 58 C 90 128 46 166 2 166 C -30 166 -52 152 -60 126 C -66 116 -80 112 -104 126 C -106 106 -92 94 -74 84 C -96 22 -92 -150 4 -150 Z"
      fill={EL.espora} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={-6} cy={-30} rx={54} ry={86} fill="#d6a273" opacity=".55" />
    <path d="M -30 -110 Q 10 -130 50 -105" stroke="#fff" strokeWidth={9} fill="none" opacity=".4" strokeLinecap="round" />
    {gota > 0 && <circle cx={-92} cy={120} r={36 * gota} fill={EL.gota} stroke={EL.gota2} strokeWidth={4} opacity=".85" />}
  </g>;
}
// Nube de algodón (círculos que se juntan). oscura 0..1 = se pone gris de lluvia.
function Nube({ x, y, s = 1, oscura = 0, T = 0 }) {
  const c = mixHex(EL.nube, '#7b8798', oscura), c2 = mixHex(EL.nube2, '#5a6576', oscura);
  const bolas = [[-150, 20, 80], [-70, -30, 100], [40, -50, 115], [140, 0, 90], [-10, 30, 95], [90, 40, 75]];
  return <g transform={`translate(${x + Math.sin(T * 0.6) * 6} ${y}) scale(${s})`}>
    {bolas.map(([bx, by, r], i) => <circle key={'b' + i} cx={bx} cy={by} r={r + 7} fill={KC.ink} />)}
    {bolas.map(([bx, by, r], i) => <circle key={i} cx={bx} cy={by} r={r} fill={c} />)}
    <ellipse cx={0} cy={70} rx={210} ry={30} fill={c2} opacity=".7" />
  </g>;
}
// Gotita de nube (líquida). hielo 0..1 = se vuelve cristal.
function Gotita({ x, y, r = 50, hielo = 0, T = 0, seed = 1 }) {
  const w = 1 + Math.sin(T * 3 + seed) * 0.04;
  return <g>
    {hielo < 1 && <g opacity={1 - hielo}>
      <ellipse cx={x} cy={y} rx={r * w} ry={r / w} fill={EL.gota} stroke={EL.gota2} strokeWidth={5} opacity=".9" />
      <ellipse cx={x - r * 0.35} cy={y - r * 0.35} rx={r * 0.22} ry={r * 0.14} fill="#fff" opacity=".8" transform={`rotate(-35 ${x - r * 0.35} ${y - r * 0.35})`} />
    </g>}
    {hielo > 0 && <Cristal x={x} y={y} r={r * klerp(0.6, 1.25, hielo)} o={hielo} rot={seed * 13} />}
  </g>;
}
// Cristal de hielo hexagonal (estrella de 6 brazos con ramitas).
function Cristal({ x, y, r = 60, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o} style={{ filter:'drop-shadow(0 0 10px rgba(180,230,255,.9))' }}>
    <polygon points={Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${(r * 0.32 * Math.cos(a)).toFixed(1)},${(r * 0.32 * Math.sin(a)).toFixed(1)}`; }).join(' ')} fill={EL.hielo} stroke={EL.gota2} strokeWidth={3} />
    {Array.from({ length: 6 }, (_, i) => <g key={i} transform={`rotate(${i * 60})`}>
      <line x1={0} y1={0} x2={r} y2={0} stroke={EL.hielo} strokeWidth={7} strokeLinecap="round" />
      <line x1={r * 0.5} y1={0} x2={r * 0.72} y2={-r * 0.2} stroke={EL.hielo} strokeWidth={5} strokeLinecap="round" />
      <line x1={r * 0.5} y1={0} x2={r * 0.72} y2={r * 0.2} stroke={EL.hielo} strokeWidth={5} strokeLinecap="round" />
    </g>)}
  </g>;
}
// Mapa del mundo esquemático (siluetas simples). Caja de 1000 × 500. humo 0..1 = esporas que suben de los continentes.
const MUNDO = [
  'M 60 80 Q 150 30 260 60 Q 330 80 300 150 Q 260 200 220 230 Q 200 260 180 250 Q 140 200 100 170 Q 50 130 60 80 Z',
  'M 220 250 Q 260 260 300 300 Q 340 340 320 400 Q 290 460 270 470 Q 250 420 250 360 Q 230 300 220 250 Z',
  'M 470 80 Q 530 60 580 90 Q 560 140 540 160 Q 600 200 600 260 Q 590 340 540 400 Q 510 420 500 380 Q 480 300 450 260 Q 430 200 470 170 Q 450 120 470 80 Z',
  'M 580 90 Q 700 40 850 70 Q 940 100 920 160 Q 880 200 820 230 Q 780 260 740 240 Q 700 230 660 200 Q 610 170 580 140 Z',
  'M 800 340 Q 860 320 900 350 Q 910 400 860 410 Q 810 400 800 340 Z'];
const FUENTES_HUMO = [[150, 110], [250, 100], [190, 200], [280, 340], [270, 420], [510, 130], [540, 260], [520, 360], [650, 120], [760, 110], [850, 140], [740, 210], [860, 370]];
function MapaMundo({ T, x, y, s = 1, p = 1, humo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <rect x={0} y={0} width={1000} height={500} rx={40} fill={EL.mar} stroke={KC.ink} strokeWidth={7} />
    {MUNDO.map((d, i) => <path key={i} d={d} fill={EL.tierraMapa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {humo > 0 && FUENTES_HUMO.map(([fx, fy], i) => Array.from({ length: 5 }, (_, k) => { const u = frac(T * 0.5 + k / 5 + i * 0.13);
      return <circle key={i + '-' + k} cx={fx + Math.sin(T * 2 + i + k) * 10 * u} cy={fy - u * 70} r={5 + u * 7} fill={EL.espora2} opacity={humo * (1 - u) * 0.75} />; }))}
  </g>;
}
// Persona de perfil (mira a la derecha) de 1.7 m a escala del cubo: 300 px = 1 m. Pies en (x, y).
function Persona({ T, x, y, inhala = 0 }) {
  const H = 510, cab = 44;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-45} y={-H + cab * 2 + 10} width={90} height={H * 0.42} rx={40} fill="#3b4f8a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-36} y={-H * 0.47} width={30} height={H * 0.47} rx={14} fill="#2a2f45" stroke={KC.ink} strokeWidth={6} />
    <rect x={6} y={-H * 0.47} width={30} height={H * 0.47} rx={14} fill="#2a2f45" stroke={KC.ink} strokeWidth={6} />
    <rect x={-12} y={-H + cab * 2 - 6} width={26} height={24} fill="#d9a77c" stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={-H + cab} r={cab} fill="#e2b38a" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${cab - 4} ${-H + cab - 6} L ${cab + 16} ${-H + cab + 8} L ${cab - 2} ${-H + cab + 12}`} fill="#e2b38a" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={14} cy={-H + cab - 10} r={5} fill={KC.ink} />
    <path d={`M ${-cab} ${-H + cab - 6} Q ${-cab + 4} ${-H - 6} ${cab - 6} ${-H + 8}`} stroke="#3a2a1e" strokeWidth={16} fill="none" strokeLinecap="round" />
    {inhala > 0 && <circle cx={0} cy={-H + cab * 2 + 90} r={30 + Math.sin(T * 3) * 6} fill="#ffb3c7" opacity={0.35 * inhala} />}
  </g>;
}
// Cubo de 1 m (vista en perspectiva) con esporas dentro.
function CuboAire({ T, x, y, lado = 300, p = 1, puntos = 1 }) {
  const dx = 70, dy = -50, g = krng(31);
  const pts = Array.from({ length: 34 }, () => [g() * lado + g() * dx * 0.8, g() * lado + g() * dy * 0.8, g()]);
  return <g opacity={p}>
    <path d={`M ${x} ${y} L ${x + dx} ${y + dy} L ${x + lado + dx} ${y + dy} L ${x + lado} ${y} Z`} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${x + lado} ${y} L ${x + lado + dx} ${y + dy} L ${x + lado + dx} ${y + lado + dy} L ${x + lado} ${y + lado} Z`} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={x} y={y} width={lado} height={lado} fill="rgba(255,255,255,.28)" stroke={KC.ink} strokeWidth={7} />
    {pts.map(([px, py, k], i) => i / pts.length <= puntos ? <ellipse key={i} cx={x + px + Math.sin(T * 1.3 + i) * 6} cy={y + py + Math.cos(T * 1.1 + i) * 6}
      rx={5 + k * 3} ry={4 + k * 2} fill={EL.espora2} stroke="#fff" strokeWidth={1.5} /> : null)}
  </g>;
}
// Fusarium: hifas tabicadas y macroconidias en media luna (con tabiques).
function Fusarium({ T, x, y, s = 1, p = 1 }) {
  const hif = [[0, 0, 260, -40], [260, -40, 420, 10], [120, -18, 200, -140], [300, -26, 380, -150]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    {hif.map(([a, b, c, d], i) => { const q = kclamp(p * 1.6 - i * 0.2, 0, 1); const ex = klerp(a, c, q), ey = klerp(b, d, q);
      return <g key={i}><line x1={a} y1={b} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" />
        <line x1={a} y1={b} x2={ex} y2={ey} stroke="#ffd6e6" strokeWidth={13} strokeLinecap="round" />
        {[0.3, 0.6].map((t) => t < q ? <line key={t} x1={klerp(a, c, t) - 6} y1={klerp(b, d, t) - 6} x2={klerp(a, c, t) + 6} y2={klerp(b, d, t) + 6} stroke={KC.ink} strokeWidth={3} /> : null)}</g>; })}
    {[[200, -190, -20], [400, -200, 25], [470, -60, 70]].map(([cx, cy, r], i) => <g key={i} transform={`translate(${cx} ${cy + Math.sin(T * 1.5 + i) * 4}) rotate(${r})`} opacity={kprog(p, 0.5 + i * 0.1, 0.8 + i * 0.1)}>
      <path d="M -70 0 Q 0 -46 70 0 Q 0 -20 -70 0 Z" fill="#ffc2da" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      {[-35, -12, 12, 35].map((sx) => <line key={sx} x1={sx} y1={-8 - (35 - Math.abs(sx)) * 0.35} x2={sx} y2={-22 - (35 - Math.abs(sx)) * 0.35} stroke={KC.ink} strokeWidth={3} />)}
    </g>)}
  </g>;
}
// Urediniospora de roya: redondeada, anaranjada, con espinitas finas.
function Urediniospora({ x, y, r = 34, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * r} y1={Math.sin(a) * r * 0.9} x2={Math.cos(a) * (r + 7)} y2={Math.sin(a) * (r * 0.9 + 7)} stroke={KC.ink} strokeWidth={3} />; })}
    <ellipse rx={r} ry={r * 0.9} fill={EL.roya} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-r * 0.3} cy={-r * 0.3} rx={r * 0.3} ry={r * 0.18} fill="#ffd2a0" opacity=".7" />
  </g>;
}
// Hoja de trigo con pústulas de roya (color óxido).
function HojaTrigo({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${-24 + mece(T, 2, 0.3) * 2}) scale(${s})`}>
    <path d="M 0 0 Q 260 -60 620 -10 Q 300 30 0 20 Z" fill="#7cc24a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 10 10 Q 300 -20 600 -10" stroke="#5a9a30" strokeWidth={4} fill="none" />
    {[[90, 2], [160, -10], [230, 6], [300, -14], [370, 0], [430, -10], [500, -6], [200, 14]].map(([px, py], i) =>
      <ellipse key={i} cx={px} cy={py} rx={14} ry={7} fill={EL.roya} stroke={EL.roya2} strokeWidth={3} />)}
  </g>;
}
// Balanza: izquierda vs derecha. incl -1..1.
function Balanza({ x, y, incl = 0 }) {
  const a = incl * 10;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-14} y={0} width={28} height={300} fill="#8a6a3a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={290} width={240} height={30} rx={10} fill="#8a6a3a" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${a})`}>
      <rect x={-330} y={-12} width={660} height={24} rx={12} fill="#c9a24a" stroke={KC.ink} strokeWidth={6} />
      {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 300} 0) rotate(${-a})`}>
        <line x1={-80} y1={150} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={80} y1={150} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
        <path d="M -110 150 Q 0 210 110 150 Z" fill="#c9a24a" stroke={KC.ink} strokeWidth={6} />
      </g>)}
    </g>
    <circle r={20} fill="#c9a24a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Sello rectangular (palabras largas).
function SelloRect({ T, at, x, y, texto, color = KC.red, rot = -8, tam = 96 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), w = texto.length * tam * 0.5 + 70;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-tam * 0.8} width={w} height={tam * 1.5} rx={18} fill="rgba(255,255,255,.75)" stroke={color} strokeWidth={14} />
    <text y={tam * 0.32} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}
// Texto libre con JSX (para nombres científicos en cursiva dentro de una frase).
function Nota({ T, at, until, x, y, children, tam = 30, color = KC.texto, fondo = 'rgba(14,15,18,.8)', borde = KC.gold, ancho = 620 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, width:ancho, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:fondo, color,
    border:`4px solid ${borde}`, borderRadius:26, padding:'14px 26px', font:`700 ${tam}px/1.25 ${KF.texto}`, textAlign:'center', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{children}</div>;
}
// Termómetro chico en píldora (−10 °C, −2.5 °C…).
function TermoChip({ T, at, until, x, y, texto, color = EL.frio }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, display:'flex', alignItems:'center', gap:14,
    background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:999, padding:'8px 26px 8px 14px', boxShadow:`6px 6px 0 ${KC.ink}` }}>
    <svg width={34} height={80}><rect x={11} y={4} width={12} height={56} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={3} /><rect x={14} y={30} width={6} height={32} fill={color} /><circle cx={17} cy={64} r={13} fill={color} stroke={KC.ink} strokeWidth={3} /></svg>
    <span style={{ font:`400 64px ${KF.titulo}`, color:KC.ink }}>{texto}</span>
  </div>;
}

function EsporasLluviaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Viento, Su: CUES.Sube, Ci: CUES.Cielo, R: CUES.Respiras, P: CUES.Pregunta, N: CUES.Nube, Se: CUES.Semilla,
    E: CUES.Estudio, Ro: CUES.Royas, H: CUES.Hipotesis, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const YG = 1180, SX = 540, SS = 2.3, YC = YG - 150 * SS;  // suelo, seta (x, escala) y bajo del sombrero
  const micro = K.Ci + 2.9;                                 // en «al cielo»: de la espora al mapa
  const congela = K.Se + 0.9, mohoHielo = K.E + 6.3, royaHielo = K.Ro + 2.0;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la seta en el pasto mojado; el aire empieza a moverse en el cuadro 0.3 */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Nube x={300} y={520} s={0.75} T={T} oscura={0.15} />
          <text x={300} y={545} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.G + 1.2, K.G + 1.6)}>?</text>
          <PastoMojado T={T} yg={YG} />
          <Flujo T={T} x={SX} yc={YC} yg={YG} p={kprog(T, K.G + 0.25, K.G + 2.2, kEase.sale)} esporas={kprog(T, K.G + 1.0, K.G + 1.6)} tibio={kprog(T, K.G + 2.2, K.G + 2.8)} />
          <SetaJardin T={T} x={SX} y={YG} s={SS} frio={kprog(T, K.G + 0.25, K.G + 1.2)} />
        </>)}
      </Escena>
      {/* 1 · capítulo 1: el viento. Evapora agua y enfría el aire bajo el sombrero */}
      <Escena T={T} a={K.V} b={K.Su} zoom={0.06} origen="50% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PastoMojado T={T} yg={YG} />
          <Flujo T={T} x={SX} yc={YC} yg={YG} p={0.35 + 0.65 * kprog(T, K.V + 2.5, K.V + 4.5)} esporas={0} tibio={0} />
          <SetaJardin T={T} x={SX} y={YG} s={SS} vapor={kprog(T, K.V + 0.4, K.V + 1.2)} frio={0.6 + 0.4 * kprog(T, K.V + 1.8, K.V + 2.6)} />
        </>)}
      </Escena>
      {/* 2 · el aire frío corre por el suelo, choca, gira y sube las esporas 10 cm o más */}
      <Escena T={T} a={K.Su} b={K.Ci} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PastoMojado T={T} yg={YG} />
          <Flujo T={T} x={SX} yc={YC} yg={YG} p={1} esporas={1} tibio={1} />
          <SetaJardin T={T} x={SX} y={YG} s={SS} frio={1} />
          {/* regla de 10 cm junto al remolino izquierdo */}
          <g opacity={kprog(T, K.Su + 1.2, K.Su + 1.6)}>
            <rect x={40} y={YG - 10 * ESC_CM} width={30} height={10 * ESC_CM} fill="#fff8d6" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 11 }, (_, i) => <line key={i} x1={40} y1={YG - i * ESC_CM} x2={i % 5 ? 56 : 70} y2={YG - i * ESC_CM} stroke={KC.ink} strokeWidth={3} />)}
          </g>
        </>)}
      </Escena>
      {/* 3 · capítulo 2: al cielo. Primero la espora al microscopio, luego el mundo */}
      <Escena T={T} a={K.Ci} b={micro} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<Basidiospora x={500} y={860} s={1.25} rot={-14 + Math.sin(T) * 4} />)}
      </Escena>
      <Escena T={T} a={micro} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<MapaMundo T={T} x={140} y={800} s={0.8} humo={kprog(T, micro + 0.3, micro + 1.2)} />)}
      </Escena>
      {/* 4 · el aire que respiras: un cubo de 1 m con miles de esporas */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={-20} y={1180} width={KW + 40} height={800} fill="#7fd8a0" />
          <Persona T={T} x={200} y={1180} inhala={kprog(T, K.R + 1.0, K.R + 1.6)} />
          <CuboAire T={T} x={520} y={860} lado={300} p={kprog(T, K.R + 0.1, K.R + 0.5)} puntos={kprog(T, K.R + 0.4, K.R + 2.0)} />
          {[0, 1, 2].map((k) => { const u = frac(T * 0.6 + k / 3); return <path key={k} d={`M ${500 - u * 210} ${760 + k * 14} l -16 -10 m 16 10 l -16 10`} stroke={KC.ink} strokeWidth={5} fill="none" opacity={(1 - u) * kprog(T, K.R + 1.0, K.R + 1.4)} />; })}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿y si una llega a una nube? */}
      <Escena T={T} a={K.P} b={K.N} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Nube x={300} y={640} s={1.0} T={T} />
          <Interrogacion T={T} x={280} y={1160} tam={380} />
          <ellipse cx={120 + kprog(T, K.P, K.P + 1.6) * 120} cy={1000 - kprog(T, K.P, K.P + 1.6) * 230} rx={12} ry={9} fill={EL.espora2} stroke="#fff" strokeWidth={3} />
        </>)}
      </Escena>
      {/* 6–7 · capítulo 3: la nube por dentro. Gotitas líquidas bajo cero; una semilla las congela; el hielo cae y se vuelve lluvia */}
      <Escena T={T} a={K.N} b={K.E} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, #26344d 0%, ${KC.noche} 75%)` }}></div>
        <Ambiente T={T} n={30} color="rgba(220,235,255,.25)" />
        {fsvg(<>
          {[[200, 700, 46, 1], [420, 640, 58, 2], [640, 760, 40, 3], [300, 920, 52, 4], [560, 980, 44, 5], [820, 900, 50, 6], [930, 720, 40, 7]].map(([gx, gy, r, sd]) => {
            const yo = gy + Math.sin(T * 0.8 + sd) * 10;
            if (sd === 2) { // la que recibe la semilla
              const h = kprog(T, congela, congela + 0.7), cae = kprog(T, K.Se + 2.6, K.Se + 4.6, kEase.suave), lluvia = kprog(T, K.Se + 4.0, K.Se + 4.6);
              return <g key={sd}>
                {T < congela + 0.2 && <circle cx={gx - 160 + kprog(T, K.Se, congela) * 110} cy={yo - 80 + kprog(T, K.Se, congela) * 50} r={12} fill="#5a4a3a" stroke="#fff" strokeWidth={2} />}
                {lluvia < 1 && <Gotita x={gx} y={yo + cae * 360} r={r * (1 + 0.5 * cae)} hielo={h} T={T} seed={sd} />}
                {lluvia > 0 && <path d={`M ${gx} ${yo + 360 - 70} Q ${gx + 50} ${yo + 360 + 10} ${gx} ${yo + 360 + 40} Q ${gx - 50} ${yo + 360 + 10} ${gx} ${yo + 360 - 70} Z`} fill={EL.gota2} stroke="#fff" strokeWidth={4} opacity={lluvia} />}
              </g>;
            }
            return <Gotita key={sd} x={gx} y={yo} r={r} T={T} seed={sd} />;
          })}
        </>)}
      </Escena>
      {/* 8 · las esporas de seta son malas semillas; el moho Fusarium avenaceum congela a −2.5 °C (1992, Canadá) */}
      <Escena T={T} a={K.E} b={K.Ro} zoom={0.04}>
        <FondoLunares color={T < K.E + 2.8 ? KC.orange : KC.lilac} />
        {fsvg(<>
          {T < K.E + 3.0 && <g opacity={1 - kprog(T, K.E + 2.6, K.E + 3.0)}>
            <Basidiospora x={360} y={900} s={0.9} rot={-10} />
            {T > K.E + 1.4 && <Sello T={T} at={K.E + 1.4} x={640} y={880} texto="NO" color={KC.red} r={110} />}
          </g>}
          {T > K.E + 4.6 && <>
            <Fusarium T={T} x={110} y={1010} s={1.05} p={kprog(T, K.E + 4.6, K.E + 5.8)} />
            <Gotita x={760} y={830} r={70} hielo={kprog(T, mohoHielo, mohoHielo + 0.6)} T={T} seed={8} />
          </>}
        </>)}
      </Escena>
      {/* 9 · royas: hongos de plantas; sus esporas congelan desde −4 °C (2013) */}
      <Escena T={T} a={K.Ro} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaTrigo x={70} y={1120} s={1.0} T={T} />
          {Array.from({ length: 7 }, (_, i) => { const u = kprog(T, K.Ro + 0.3 + i * 0.12, K.Ro + 1.8 + i * 0.12, kEase.suave);
            return <Urediniospora key={i} x={klerp(180 + i * 50, 640 + (i % 3) * 30, u)} y={klerp(1030 - i * 20, 830 + (i % 2) * 40, u) - Math.sin(u * Math.PI) * 140} r={22} rot={T * 40 + i * 30} />; })}
          <Gotita x={720} y={760} r={80} hielo={kprog(T, royaHielo, royaHielo + 0.6)} T={T} seed={9} />
        </>)}
      </Escena>
      {/* 10 · hipótesis: laboratorio ✓ vs nubes reales ? */}
      <Escena T={T} a={K.H} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Basidiospora x={250} y={720} s={0.5} rot={-12} gota={kprog(T, K.H + 0.6, K.H + 1.6)} />
          <Balanza x={540} y={900} incl={Math.sin(T * 2.2) * 0.4 * kprog(T, K.H + 1.6, K.H + 2.2)} />
          <SelloRect T={T} at={K.H + 2.8} x={560} y={800} texto="HIPÓTESIS" color={KC.red} />
        </>)}
      </Escena>
      {/* 11 · cierre: la misma seta del inicio; su aire sube hasta la nube, que se oscurece y suelta llovizna */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Nube x={300} y={520} s={0.75} T={T} oscura={0.15 + 0.6 * kprog(T, K.C + 1.0, K.C + 2.4)} />
          {T > K.C + 2.2 && Array.from({ length: 16 }, (_, k) => { const u = frac(T * 0.9 + k / 16); return <line key={k} x1={180 + (k * 53) % 240} y1={600 + u * 520} x2={174 + (k * 53) % 240} y2={620 + u * 520} stroke={EL.gota2} strokeWidth={4} strokeLinecap="round" opacity={(1 - u) * 0.8} />; })}
          <text x={470} y={470} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.C + 2.4, K.C + 2.8)}>¿?</text>
          <PastoMojado T={T} yg={YG} />
          <Flujo T={T} x={SX} yc={YC} yg={YG} p={1} esporas={1} tibio={0} alto={560} />
          <SetaJardin T={T} x={SX} y={YG} s={SS} frio={0.8} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.0} until={K.V - 0.3} texto="seta del jardín · tras la lluvia" x={330} y={700} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.3} until={K.V - 0.3} x={60} y={790} texto="aire frío" tam={30} color={EL.frio} />
      <Etq T={T} at={K.G + 2.6} until={K.V - 0.3} x={60} y={840} texto="aire tibio" tam={30} color={KC.ink} />
      <Capitulo T={T} caps={[{ at: K.V, titulo:'EL VIENTO' }, { at: K.Ci, titulo:'AL CIELO' }, { at: K.N, titulo:'LA NUBE' }]} hasta={K.H - 0.2} />
      <Etq T={T} at={K.V + 0.6} until={K.Su - 0.3} x={60} y={480} texto="vapor de agua" tam={32} color={KC.ink} />
      <Chip T={T} at={K.V + 1.6} until={K.Su - 0.3} texto="bajo el sombrero: 1–2 °C más frío" x={360} y={570} tam={32} borde={EL.frio} />
      <Chip T={T} at={K.V + 3.0} until={K.Su - 0.3} texto="la superficie del sombrero: hasta 4 °C" x={340} y={650} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Su + 0.3} until={K.Ci - 0.3} x={40} y={YG - 10 * ESC_CM - 40} texto="10 cm o más" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Su + 0.8} until={K.Ci - 0.3} texto="corre por el suelo, choca y gira" x={350} y={480} tam={30} borde={EL.frio} />
      <Nota T={T} at={K.Su + 1.8} until={K.Ci - 0.3} x={350} y={570} tam={24} ancho={560}>medido en setas ostra (<i>Pleurotus ostreatus</i>) y shiitake (<i>Lentinula edodes</i>), 2016</Nota>
      <Chip T={T} at={K.Ci + 0.3} until={micro - 0.3} texto="AL MICROSCOPIO · una espora" x={390} y={450} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ci + 0.7} until={micro - 0.3} x={640} y={760} texto="basidiospora" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ci + 1.3} until={micro - 0.3} x={370} y={1040} texto="apículo" tam={32} color={KC.yellow} lado="izq" />
      <NumeroGigante T={T} at={micro + 0.4} until={K.R - 0.3} valor={50} dur={1.2} prefijo="3 a " etiqueta="millones de toneladas" x={360} y={500} tam={180} color={KC.yellow} />
      <Etq T={T} at={micro + 1.0} until={K.R - 0.3} x={60} y={650} texto="de esporas de hongos al año" tam={32} color={KC.ink} />
      <Chip T={T} at={micro + 1.8} until={K.R - 0.3} texto="cálculos de 2007, 2009 y 2021: no se ponen de acuerdo" x={540} y={735} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.R + 0.6} until={K.P - 0.3} texto="miles de esporas / m³" x={360} y={470} tam={44} borde={EL.espora2} />
      <Etq T={T} at={K.R + 1.2} until={K.P - 0.3} x={60} y={560} texto="aire de afuera" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 0.6} until={K.P - 0.3} x={520} y={1215} texto="1 m³ de aire" tam={28} color={KC.ink} />
      <Chip T={T} at={K.N + 0.6} until={K.Se - 0.2} texto="POR DENTRO · una nube" x={330} y={450} tam={30} borde={KC.cyan} mono />
      <TermoChip T={T} at={K.N + 1.0} until={K.Se + 0.6} x={330} y={560} texto="−10 °C" />
      <Etq T={T} at={K.N + 1.6} until={K.Se - 0.2} x={500} y={640} texto="¡siguen líquidas!" tam={34} color={KC.texto} />
      <Nota T={T} at={K.N + 2.2} until={K.Se - 0.2} x={480} y={1115} tam={24} ancho={720} borde={EL.gota2}>el agua pura de nube se congela sola hasta unos −38 °C</Nota>
      <Etq T={T} at={K.Se + 0.3} until={K.Se + 2.6} x={240} y={500} texto="semilla de hielo" tam={34} color={KC.yellow} />
      <Etq T={T} at={congela + 0.7} until={K.E - 0.3} x={500} y={640} texto="cristal de hielo" tam={32} color={EL.hielo} />
      <Etq T={T} at={K.Se + 4.2} until={K.E - 0.3} x={470} y={1050} texto="se derrite: gota de lluvia" tam={28} color={EL.gota} />
      <Nota T={T} at={K.Se + 2.0} until={K.E - 0.3} x={480} y={1115} tam={24} ancho={760} borde={EL.gota2}>sobre tierra, la lluvia casi siempre nace en nubes con hielo (satélites, 2006–2011)</Nota>
      <Etq T={T} at={K.E + 0.3} until={K.E + 2.6} x={60} y={520} texto="espora de seta" tam={34} color={KC.ink} />
      <Nota T={T} at={K.E + 1.0} until={K.E + 2.6} x={400} y={620} tam={26} ancho={640} borde={KC.red}>mala semilla de hielo: casi nunca congela arriba de −19 °C (2014)</Nota>
      <TarjetaEstudio T={T} at={K.E + 2.8} until={K.E + 4.4} anio="1992" quien="Pouleur y colegas · Quebec, Canadá" revista="Appl. Environ. Microbiol., 1992" x={480} y={820} />
      <Etq T={T} at={K.E + 4.8} until={K.Ro - 0.3} x={60} y={520} texto="Fusarium avenaceum" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.E + 5.2} until={K.Ro - 0.3} x={60} y={580} texto="un moho, no una seta" tam={30} color={KC.ink} />
      <TermoChip T={T} at={mohoHielo - 0.6} until={K.Ro - 0.3} x={760} y={1000} texto="−2.5 °C" />
      <Nota T={T} at={K.E + 5.6} until={K.Ro - 0.3} x={380} y={680} tam={24} ancho={600} borde={KC.ink}>de 20 géneros de hongos probados, solo 2 especies de <i>Fusarium</i> lo hicieron</Nota>
      <Chip T={T} at={K.Ro + 0.2} until={K.H - 0.3} texto="2013 · Morris y colegas" x={330} y={460} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ro + 0.6} until={K.H - 0.3} x={60} y={550} texto="royas: hongos de plantas, no setas" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ro + 1.2} until={K.H - 0.3} x={60} y={600} texto="urediniosporas (en trigo)" tam={28} color={EL.roya2} />
      <TermoChip T={T} at={royaHielo - 0.5} until={K.H - 0.3} x={720} y={960} texto="−4 °C" />
      <Nota T={T} at={K.H + 0.6} until={K.C - 0.3} x={330} y={500} tam={24} ancho={520} borde={KC.ink}>esporas de seta: en laboratorio juntan gotas de agua (2015)</Nota>
      <Etq T={T} at={K.H + 1.6} until={K.C - 0.3} x={60} y={1150} texto="laboratorio ✓" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.9} until={K.C - 0.3} x={600} y={1150} texto="nubes reales ?" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 3.2} until={K.C - 0.3} x={60} y={600} texto="bioprecipitación: en estudio" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="viento ✓ · lluvia: quizá" x={400} y={345} tam={36} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ci} texto="5 cm" largo={5 * ESC_CM} />
      <BarraEscala T={T} at={K.Ci} until={micro} texto="5 µm" largo={190} />
      <BarraEscala T={T} at={micro} until={K.R} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="1 m" largo={300} />
      <BarraEscala T={T} at={K.N} until={K.E} texto="10 µm (esquemático)" largo={60} />
      <BarraEscala T={T} at={K.E} until={K.H} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={5 * ESC_CM} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="Una *fábrica de viento…* ¿y de lluvia?" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Su - 0.1} texto="Enfría el aire *1–2 °C.*" />
      <Subtitulo T={T} idx={2} at={K.Su + 0.1} until={K.Ci - 0.1} texto="Sube sus esporas *10 cm o más.*" />
      <Subtitulo T={T} idx={3} at={K.Ci + 0.1} until={K.R - 0.1} texto="*3 a 50 millones* de toneladas al año." />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="*Miles de esporas* por metro cúbico." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.N - 0.1} texto="¿Y si llega *a una nube?*" />
      <Subtitulo T={T} idx={6} at={K.N + 0.1} until={K.Se - 0.1} texto="Gotitas líquidas *bajo cero.*" />
      <Subtitulo T={T} idx={7} at={K.Se + 0.1} until={K.E - 0.1} texto="Necesitan *una semilla* de hielo." />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ro - 0.1} texto="Seta: mala semilla. *Un moho, no.*" />
      <Subtitulo T={T} idx={9} at={K.Ro + 0.1} until={K.H - 0.1} texto="Royas: hielo desde *−4 °C.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.C - 0.1} texto="¿Cuánta lluvia? *Aún es hipótesis.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Hace viento… y *quizá ayuda a llover.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 2.2, K.Su - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Su + 2.0, K.Ci - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [micro + 1.5, K.R - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.R + 1.4, K.P - 0.1, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.P + 0.05, K.N + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Se + 3.0, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 6.1, K.Ro - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.H + 2.0, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="123" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsporasLluviaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsporasLluviaShot /></CompositionStage></div>;
}
window.EsporasLluviaApp = EsporasLluviaApp;
