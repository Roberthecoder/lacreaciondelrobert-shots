// Shot Fungi Mati #52 · Esto no es una piedra: es una trufa — NARRADO (gancho 1 "Esto no es X: es Y" + N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const TR = { peridio:'#2b211d', verruga:'#4a3a32', brillo:'#6d5a4e', gleba:'#3a2630', vena:'#f3e9dc', tierra:'#6b4a2b', tierra2:'#4e3420', raiz:'#8a5a2e', manto:'#fff1cf', espora:'#b5732f', asca:'rgba(255,236,190,.16)' };

// Contorno irregular (papa) de la trufa, centrado en 0,0.
function trufaPath(r, seed) {
  const n = 44; let d = '';
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const rr = r * (1 + 0.07 * Math.sin(3 * a + seed) + 0.05 * Math.sin(5 * a + seed * 2) + 0.03 * Math.sin(9 * a));
    d += `${i ? 'L' : 'M'} ${(Math.cos(a) * rr * 1.08).toFixed(1)} ${(Math.sin(a) * rr * 0.92).toFixed(1)} `; }
  return d + 'Z';
}
// Trufa (Tuber): peridio negro con verrugas piramidales; corte 0..1 = se parte y muestra la gleba jaspeada (vetas blancas).
function Trufa({ x, y, s = 1, rot = 0, corte = 0, seed = 2, r = 110 }) {
  const d = trufaPath(r, seed), g = krng(seed * 7 + 1);
  const verrugas = [];
  for (let i = 0; i < 26; i++) { const a = (i / 26) * Math.PI * 2; const rr = r * (1 + 0.07 * Math.sin(3 * a + seed) + 0.05 * Math.sin(5 * a + seed * 2) + 0.03 * Math.sin(9 * a));
    const px = Math.cos(a) * rr * 1.08, py = Math.sin(a) * rr * 0.92; verrugas.push([px, py, a]); }
  const internas = Array.from({ length: 30 }, () => { const a = g() * Math.PI * 2, k = Math.sqrt(g()) * 0.82; return [Math.cos(a) * r * k * 1.05, Math.sin(a) * r * k * 0.88]; });
  const venas = Array.from({ length: 9 }, (_, i) => { const y0 = -r * 0.7 + i * r * 0.17; return `M ${-r * 0.9} ${y0} Q ${-r * 0.3} ${y0 + (g() - 0.5) * 70} ${r * 0.05} ${y0 + (g() - 0.5) * 40} T ${r * 0.95} ${y0 + (g() - 0.5) * 60}`; });
  const ext = (dx) => <g transform={`translate(${dx} 0)`}>
    {verrugas.map(([px, py, a], i) => <path key={i} d={`M ${px - Math.sin(a) * 13} ${py + Math.cos(a) * 13} L ${px + Math.cos(a) * 15} ${py + Math.sin(a) * 15} L ${px + Math.sin(a) * 13} ${py - Math.cos(a) * 13} Z`} fill={TR.peridio} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />)}
    <path d={d} fill={TR.peridio} stroke={KC.ink} strokeWidth={7} />
    {internas.map(([px, py], i) => <path key={i} d={`M ${px - 11} ${py} L ${px} ${py - 10} L ${px + 11} ${py} L ${px} ${py + 9} Z`} fill={TR.verruga} stroke="#17110e" strokeWidth={2.5} />)}
    <path d={`M ${-r * 0.6} ${-r * 0.45} Q ${-r * 0.2} ${-r * 0.75} ${r * 0.3} ${-r * 0.6}`} stroke={TR.brillo} strokeWidth={9} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {corte <= 0 ? ext(0) : <>
      <g opacity={1}>{ext(-95 * corte)}</g>
      <g transform={`translate(${95 * corte} 0)`} opacity={kclamp(corte * 2, 0, 1)}>
        <path d={d} fill={TR.gleba} stroke={TR.peridio} strokeWidth={16} />
        <clipPath id={`cg${seed}`}><path d={d} /></clipPath>
        <g clipPath={`url(#cg${seed})`}>{venas.map((v, i) => <path key={i} d={v} stroke={TR.vena} strokeWidth={i % 2 ? 5 : 8} fill="none" strokeLinecap="round" opacity=".9" />)}</g>
        <path d={d} fill="none" stroke={KC.ink} strokeWidth={5} />
      </g>
    </>}
  </g>;
}
// Mano (palma hacia arriba) que sostiene algo. Coordenadas: centro de la palma.
function Mano({ x, y, s = 1 }) {
  const piel = '#f2c29b';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 40 L -60 260 L 90 260 L 90 40 Z" fill="#3a6fd8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -10 Q -170 -60 -120 -70 L 150 -60 Q 190 -40 170 10 Q 130 70 20 70 Q -120 70 -150 -10 Z" fill={piel} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-150 + i * 72} y={-118} width={56} height={92} rx={28} fill={piel} stroke={KC.ink} strokeWidth={6} />)}
    <path d="M 150 -40 Q 220 -110 200 -150 Q 180 -170 150 -130 Q 130 -90 120 -60 Z" fill={piel} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tierra con superficie (y = nivel del suelo) y piedritas.
function Suelo({ y, color = TR.tierra, seed = 3 }) {
  const g = krng(seed);
  return <g><rect x={-40} y={y} width={KW + 80} height={KH - y + 40} fill={color} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 22 }, (_, i) => <ellipse key={i} cx={g() * KW} cy={y + 40 + g() * (KH - y - 60)} rx={8 + g() * 16} ry={5 + g() * 9} fill={TR.tierra2} opacity=".8" />)}</g>;
}
// Terrones que caen.
function Terrones({ T, x, y, at, n = 10 }) {
  if (T < at) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = T - at - i * 0.05; if (u < 0 || u > 1) return null; const vx = (i % 2 ? 1 : -1) * (40 + i * 12);
    return <circle key={i} cx={x + vx * u} cy={y + 420 * u * u - 90 * u} r={7 + (i % 3) * 4} fill={TR.tierra} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}
// Encino (Quercus): tronco grueso + copa de lóbulos. Avellano (Corylus avellana): varios tallos desde la base + copa redonda.
function Encino({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 2, 0.3)})`}>
    <path d="M -34 0 L -24 -230 L 24 -230 L 34 0 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
    {[[-110, -280, 90], [0, -340, 110], [110, -280, 90], [-60, -220, 80], [70, -215, 80], [0, -250, 90]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? '#2f9e44' : '#268a3a'} stroke={KC.ink} strokeWidth={7} />)}
  </g>;
}
function Avellano({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 5, 0.3)})`}>
    {[-30, -10, 12, 30].map((dx, i) => <path key={i} d={`M ${dx * 0.4} 0 Q ${dx} -100 ${dx * 1.6} -170`} stroke="#8a5a2e" strokeWidth={14} fill="none" strokeLinecap="round" />)}
    {[[-70, -190, 70], [0, -230, 80], [70, -190, 70], [0, -170, 70]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? '#56c96a' : '#46b85a'} stroke={KC.ink} strokeWidth={7} />)}
  </g>;
}
// Raíces que bajan desde (x, y). p 0..1 = crecen.
function Raices({ x, y, p = 1, s = 1, seed = 1 }) {
  const g = krng(seed); const ramas = [];
  const rama = (x0, y0, ang, L, w, nivel) => { if (nivel > 3) return; const x1 = x0 + Math.cos(ang) * L, y1 = y0 + Math.sin(ang) * L; ramas.push([x0, y0, x1, y1, w, nivel]);
    rama(x1, y1, ang - 0.4 - g() * 0.3, L * 0.65, w * 0.65, nivel + 1); rama(x1, y1, ang + 0.4 + g() * 0.3, L * 0.65, w * 0.65, nivel + 1); };
  rama(0, 0, Math.PI / 2 - 0.5, 160, 20, 0); rama(0, 0, Math.PI / 2 + 0.5, 160, 20, 0);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([x0, y0, x1, y1, w, n], i) => { const q = kprog(p, n * 0.22, n * 0.22 + 0.3); if (q <= 0) return null;
      return <line key={i} x1={x0} y1={y0} x2={klerp(x0, x1, q)} y2={klerp(y0, y1, q)} stroke={TR.raiz} strokeWidth={w} strokeLinecap="round" />; })}
  </g>;
}
// Punta de raíz con micorriza: la raíz (café) envuelta por un manto de hifas (crema) y hifas que salen al suelo.
function PuntaMicorriza({ T, x, y, s = 1, rot = 0, g = 1, seed = 4 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -260 -34 L 40 -34 Q 120 -34 120 0 Q 120 34 40 34 L -260 34 Z" fill={TR.raiz} stroke={KC.ink} strokeWidth={7} />
    <path d={`M -200 -46 L 40 -46 Q 138 -46 138 0 Q 138 46 40 46 L -200 46 Z`} fill={TR.manto} stroke={KC.ink} strokeWidth={5} opacity={0.85 * g} />
    <RedHifas T={T} x={60} y={0} g={g} seed={seed} n={160} escala={0.55} color={TR.manto} ancho={4} />
  </g>;
}
// Asca (saco) con esporas ornamentadas (espinas). n esporas (variable; no se rotula).
function Espora({ x, y, s = 1, rot = 0, erosion = 0, viva = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 24} y1={Math.sin(a) * 18} x2={Math.cos(a) * 33} y2={Math.sin(a) * 26} stroke="#e7b06a" strokeWidth={4} strokeLinecap="round" opacity={1 - erosion * 0.6} />; })}
    <ellipse rx={25} ry={19} fill={TR.espora} stroke={KC.ink} strokeWidth={4} strokeDasharray={erosion > 0.3 ? '10 6' : 'none'} />
    <ellipse cx={-7} cy={-6} rx={8} ry={5} fill="#f0c98e" opacity=".7" />
    {viva > 0 && <circle r={40} fill="none" stroke={KC.mint} strokeWidth={5} opacity={viva} />}
  </g>;
}
function Asca({ T, x, y, s = 1, n = 3, rot = 0, abre = 0, seed = 1 }) {
  const pos = [[[0, 0]], [[-24, 0], [24, 0]], [[-30, 12], [0, -16], [30, 12]], [[-26, -16], [26, -16], [-26, 18], [26, 18]]][n - 1];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={78} ry={62} fill={TR.asca} stroke="#efdcb0" strokeWidth={5} strokeDasharray={abre > 0 ? `${(1 - abre) * 40 + 4} ${abre * 30}` : 'none'} opacity={1 - abre * 0.8} />
    {pos.map(([px, py], i) => <Espora key={i} x={px * (1 + abre * 1.6)} y={py * (1 + abre * 1.6) + Math.sin(T * 2 + i + seed) * 2} s={0.8} rot={i * 40 + seed * 20} erosion={abre} />)}
  </g>;
}
// Ondas de olor que suben desde (x, y).
function Olor({ T, x, y, alto = 600, n = 3, color = '#ffe37a', o = 1, ancho = 70 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n * 3 }, (_, i) => { const k = i % n, u = ((T * 0.45 + i / (n * 3)) % 1); const yy = y - u * alto, xx = x + (k - (n - 1) / 2) * ancho;
    return <path key={i} d={`M ${xx - 26} ${yy} q 13 -18 26 0 t 26 0`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI)} />; })}</g>;
}
// Molécula de sulfuro de dimetilo (CH3)2S, esquemática.
function MoleculaDMS({ x, y, s = 1, rot = 0 }) {
  const c = [[-95, 70], [95, 70]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {c.map(([cx, cy], i) => <line key={i} x1={0} y1={0} x2={cx} y2={cy} stroke={KC.ink} strokeWidth={14} />)}
    <circle r={56} fill="#ffd21a" stroke={KC.ink} strokeWidth={7} />
    <text y={20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>S</text>
    {c.map(([cx, cy], i) => <g key={i}><circle cx={cx} cy={cy} r={46} fill="#cfd5dd" stroke={KC.ink} strokeWidth={6} />
      <text x={cx} y={cy + 12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>CH₃</text></g>)}
  </g>;
}
// Puerco de perfil (jabalí o cerdo), mirando a la derecha. paso = fase de caminar; hocico abajo 0..1.
function Puerco({ T, x, y, s = 1, flip = false, color = '#5a4030', jabali = true, paso = 0, baja = 0 }) {
  const piernas = [-90, -50, 60, 100];
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {piernas.map((px, i) => <rect key={i} x={px - 14} y={-30 + Math.sin(paso * 9 + i * 1.6) * 6 * (paso ? 1 : 0)} width={28} height={70} rx={8} fill={mixHex(color, '#000000', 0.25)} stroke={KC.ink} strokeWidth={5} transform={`rotate(${paso ? Math.sin(paso * 9 + i * Math.PI) * 12 : 0} ${px} -30)`} />)}
    <ellipse cx={0} cy={-80} rx={160} ry={82} fill={color} stroke={KC.ink} strokeWidth={7} />
    {jabali && <path d="M -120 -150 L -100 -168 L -80 -152 L -60 -170 L -40 -154 L -20 -172 L 0 -156 L 20 -170 L 40 -154 L 60 -166 L 80 -150" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinejoin="round" />}
    {jabali ? <path d="M -158 -90 l -26 -10" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" /> : <path d="M -158 -96 q -30 -10 -22 12 q 6 14 -14 6" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />}
    <g transform={`rotate(${baja * 28} 120 -100)`}>
      <path d="M 120 -150 Q 210 -140 250 -80 L 250 -40 Q 200 -30 130 -40 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={252} cy={-60} rx={18} ry={26} fill={jabali ? '#c98a7a' : '#f7b9c6'} stroke={KC.ink} strokeWidth={5} />
      <circle cx={248} cy={-66} r={4} fill={KC.ink} /><circle cx={256} cy={-52} r={4} fill={KC.ink} />
      <circle cx={180} cy={-108} r={8} fill={KC.ink} />
      <path d="M 140 -150 L 150 -196 L 176 -150 Z" fill={mixHex(color, '#000000', 0.2)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      {jabali && <path d="M 222 -40 q 6 -26 22 -30" stroke="#fff6e0" strokeWidth={8} fill="none" strokeLinecap="round" />}
    </g>
  </g>;
}
// Perro de perfil mirando a la derecha.
function Perro({ T, x, y, s = 1, flip = false, paso = 0, baja = 0 }) {
  const c = '#c98b2b';
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[-80, -50, 50, 80].map((px, i) => <rect key={i} x={px - 11} y={-40} width={22} height={80} rx={8} fill="#a8701f" stroke={KC.ink} strokeWidth={5} transform={`rotate(${paso ? Math.sin(paso * 10 + i * Math.PI) * 14 : 0} ${px} -40)`} />)}
    <rect x={-120} y={-120} width={240} height={96} rx={46} fill={c} stroke={KC.ink} strokeWidth={7} />
    <path d={`M -116 -96 Q -170 ${-150 + Math.sin(T * 12) * 14} -150 -170`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={`M -116 -96 Q -170 ${-150 + Math.sin(T * 12) * 14} -150 -170`} stroke={c} strokeWidth={9} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${baja * 32} 100 -110)`}>
      <path d="M 90 -110 Q 110 -190 170 -180 Q 200 -170 200 -140 L 250 -128 Q 262 -104 240 -96 L 160 -92 Q 110 -86 90 -110 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={250} cy={-116} r={11} fill={KC.ink} />
      <circle cx={176} cy={-150} r={7} fill={KC.ink} />
      <path d="M 140 -176 Q 120 -130 146 -108 Q 160 -140 158 -176 Z" fill="#7a4a12" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Popó con esporas.
function Popo({ x, y, s = 1, esporas = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 0 Q -64 -30 -30 -34 Q -40 -60 -6 -64 Q -6 -92 20 -84 Q 40 -60 28 -50 Q 60 -40 56 -12 Q 60 4 30 6 L -40 6 Q -62 6 -60 0 Z" fill="#6a4426" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {esporas > 0 && [[-30, -14], [0, -30], [24, -16], [-8, -50], [18, -62], [36, -28]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={6} fill="#e7b06a" stroke={KC.ink} strokeWidth={2} opacity={esporas} />)}
  </g>;
}
// Seta común (que sí lanza esporas al viento).
function SetaViento({ T, x, y, s = 1, o = 1 }) {
  return <g opacity={o}><Seta x={x} y={y} s={s} sombrero="#d9822b" escamas={false} />
    {Array.from({ length: 12 }, (_, i) => { const u = ((T * 0.5 + i / 12) % 1); return <circle key={i} cx={x + 40 + u * 520} cy={y - 150 * s + Math.sin(u * 7 + i) * 30 - u * 60} r={6} fill="#e7b06a" stroke={KC.ink} strokeWidth={2} opacity={Math.sin(u * Math.PI)} />; })}
    {[0, 1, 2].map((i) => { const u = ((T * 0.7 + i / 3) % 1); return <path key={'v' + i} d={`M ${x + 60 + u * 300} ${y - 260 - i * 50} q 60 -20 120 0 t 120 0`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI) * 0.9} />; })}
  </g>;
}
// Hoyo con banderita.
function Hoyo({ x, y, texto, o = 1, color = KC.white }) {
  return <g opacity={o}>
    <ellipse cx={x} cy={y} rx={90} ry={26} fill={TR.tierra2} stroke={KC.ink} strokeWidth={6} />
    <line x1={x + 70} y1={y} x2={x + 70} y2={y - 150} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${x + 70} ${y - 150} L ${x + 70 + 18 + texto.length * 14} ${y - 150} L ${x + 70 + 18 + texto.length * 14} ${y - 104} L ${x + 70} ${y - 104} Z`} fill={color} stroke={KC.ink} strokeWidth={5} transform={`translate(${-(18 + texto.length * 14) / 2 - 35} 0)`} />
    <text x={x} y={y - 117} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Sello rectangular con texto largo ("EN DUDA").
function SelloTexto({ T, at, x, y, texto, color = KC.orange, tam = 74, rot = -10 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), w = texto.length * tam * 0.52 + 60;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-tam * 0.85} width={w} height={tam * 1.5} rx={18} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={12} />
    <rect x={-w / 2 + 14} y={-tam * 0.85 + 14} width={w - 28} height={tam * 1.5 - 28} rx={10} fill="none" stroke={color} strokeWidth={4} />
    <text y={tam * 0.3} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:'.04em' }} fill={color}>{texto}</text>
  </g>;
}
// Tripa (esquemática): tubo ondulado en fondo oscuro.
function Tripa({ T, y = 900 }) {
  const d = `M -60 ${y} C 200 ${y - 140} 380 ${y + 140} 560 ${y} S 900 ${y - 140} 1140 ${y}`;
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={330} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#d9707e" strokeWidth={316} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#8a3448" strokeWidth={210} fill="none" strokeLinecap="round" />
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={i * 140 - 20 + ((T * 30) % 140)} cy={y + Math.sin((i * 140) / 180) * 30} rx={14} ry={150} fill="none" stroke="#c45a6c" strokeWidth={6} opacity=".55" />)}
  </g>;
}

function TrufasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Raices, Pb: CUES.Problema, O: CUES.Olor, P: CUES.Pregunta, A: CUES.Animales, H: CUES.Hipotesis, Pr: CUES.Prueba, E: CUES.Estudio, En: CUES.Encino, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sube = kprog(T, K.G + 0.15, K.G + 0.9, kEase.sale);
  const corte = kprog(T, K.G + 2.5, K.G + 3.1, kEase.sale);
  const zoomR = kprog(T, K.R + 3.2, K.R + 3.8, kEase.suave);
  const fasePb = kprog(T, K.Pb + 2.2, K.Pb + 2.7);
  // Animales: jabalí entra, olfatea, escarba, come, camina y deja popó
  const jx = T < K.A + 2.9 ? klerp(-260, 330, kprog(T, K.A, K.A + 1.2, kEase.sale)) : klerp(330, 700, kprog(T, K.A + 2.9, K.A + 4.2, kEase.suave));
  const caminando = (T < K.A + 1.2) || (T > K.A + 2.9 && T < K.A + 4.2);
  const comida = kprog(T, K.A + 2.3, K.A + 2.8);
  // Prueba: el cerdo pasa de largo la feromona; el perro va directo a la trufa
  const px = T < K.Pr + 2.4 ? klerp(-250, 470, kprog(T, K.Pr + 0.5, K.Pr + 2.4, kEase.suave)) : 470;
  const dx = klerp(1300, 900, kprog(T, K.Pr + 1.0, K.Pr + 2.4, kEase.sale));
  const MX = [[-101.6, 19.6], [-99.7, 19.3], [-100.3, 20.6], [-101.2, 21.0], [-98.2, 19.4], [-98.9, 20.1], [-99.8, 23.6], [-100.2, 25.4], [-99.4, 24.6], [-97.9, 22.9], [-96.9, 17.1], [-104.5, 23.8]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: una mano saca una "piedra" de la tierra… es una trufa, y se parte */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo y={1150} />
          <g transform={`translate(0 ${(1 - sube) * 420})`}>
            <Mano x={380} y={900} s={1.05} />
            <Trufa x={380} y={740} s={1.45} corte={corte} rot={-6} />
          </g>
          <Terrones T={T} x={380} y={740} at={K.G + 0.3} n={12} />
        </>)}
      </Escena>
      {/* 1 · raíces de encino y avellano, y la micorriza (zoom a una punta de raíz) */}
      <Escena T={T} a={K.R} b={K.Pb}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={1 - zoomR}>
            <Suelo y={760} />
            <Encino x={250} y={760} s={1.05} T={T} />
            <Avellano x={560} y={760} s={0.95} T={T} />
            <Raices x={250} y={760} p={kprog(T, K.R + 0.2, K.R + 1.6)} s={1.2} seed={3} />
            <Raices x={560} y={760} p={kprog(T, K.R + 0.4, K.R + 1.8)} s={1.0} seed={8} />
            {[[130, 1060], [330, 1100], [480, 1010], [650, 1060]].map(([tx, ty], i) => kprog(T, K.R + 1.6 + i * 0.15, K.R + 2.0 + i * 0.15) > 0 ? <Trufa key={i} x={tx} y={ty} s={0.22 * kprog(T, K.R + 1.6 + i * 0.15, K.R + 2.0 + i * 0.15, kEase.rebote)} seed={i + 3} /> : null)}
          </g>
          {zoomR > 0 && <g opacity={zoomR}>
            <rect x={0} y={0} width={KW} height={KH} fill={KC.noche} />
            <PuntaMicorriza T={T} x={520} y={880} s={1.5} rot={-8} g={kprog(T, K.R + 3.6, K.R + 5.2)} />
            {kprog(T, K.R + 4.4, K.R + 5.0) > 0 && <g opacity={kprog(T, K.R + 4.4, K.R + 5.0)}>
              <path d="M 820 1110 Q 760 1060 700 1000" stroke={KC.mint} strokeWidth={12} fill="none" markerEnd="" strokeLinecap="round" />
              <path d="M 690 990 l 40 6 l -18 34 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={3} />
              <path d="M 240 720 Q 300 680 380 700" stroke={KC.gold2} strokeWidth={12} fill="none" strokeLinecap="round" />
              <path d="M 392 704 l -38 -16 l 6 36 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />
            </g>}
          </g>}
        </>)}
      </Escena>
      {/* 2 · problema: esporas encerradas en ascas (micro) → sin viento bajo tierra */}
      <Escena T={T} a={K.Pb} b={K.O}>
        <div style={{ position:'absolute', inset:0, background: fasePb < 1 ? KC.noche : 'transparent' }}></div>
        {fasePb < 1 && fsvg(<g opacity={1 - fasePb}>
          <rect x={0} y={560} width={KW} height={660} fill={TR.gleba} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M -20 ${600 + i * 110} Q 300 ${560 + i * 120} 560 ${620 + i * 100} T 1100 ${600 + i * 110}`} stroke={TR.vena} strokeWidth={10} fill="none" opacity=".35" />)}
          {[[260, 760, 3, -20], [560, 700, 2, 15], [820, 820, 4, -5], [380, 1040, 1, 30], [700, 1060, 3, -30]].map(([ax, ay, n, r], i) => {
            const k = kprog(T, K.Pb + 0.2 + i * 0.15, K.Pb + 0.6 + i * 0.15, kEase.rebote); return k > 0 ? <Asca key={i} T={T} x={ax} y={ay} s={1.15 * k} n={n} rot={r} seed={i} /> : null; })}
        </g>)}
        {fasePb > 0 && <div style={{ position:'absolute', inset:0, opacity:fasePb }}><FondoLunares color={KC.mint} />
          {fsvg(<>
            <Suelo y={900} />
            <SetaViento T={T} x={200} y={900} s={1.6} />
            <Trufa x={560} y={1120} s={0.9} seed={5} />
            <path d="M 700 1040 L 800 1140 M 800 1040 L 700 1140" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.Pb + 3.4, K.Pb + 3.7)} />
          </>)}
        </div>}
      </Escena>
      {/* 3 · huele: ondas de olor y la molécula de sulfuro de dimetilo */}
      <Escena T={T} a={K.O} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Suelo y={880} />
          <Trufa x={520} y={1100} s={1.0} seed={5} />
          <Olor T={T} x={520} y={1040} alto={560} n={4} o={kprog(T, K.O + 0.2, K.O + 0.8)} />
          {kprog(T, K.O + 2.4, K.O + 2.9) > 0 && <MoleculaDMS x={300} y={620} s={1.1 * kprog(T, K.O + 2.4, K.O + 2.9, kEase.rebote)} rot={Math.sin(T * 1.5) * 8} />}
        </>)}
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.A} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Olor T={T} x={300} y={1180} alto={500} n={3} color="#fff4b0" /><Interrogacion T={T} x={300} y={1080} /></>)}
      </Escena>
      {/* 5 · el jabalí la desentierra, se la come y deja las esporas en su popó */}
      <Escena T={T} a={K.A} b={K.H}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Encino x={150} y={1000} s={0.8} T={T} />
          <Suelo y={1000} />
          {comida < 1 && <Trufa x={600} y={1060} s={0.38} seed={6} />}
          <Olor T={T} x={600} y={1030} alto={260} n={2} o={1 - comida} ancho={50} />
          <Terrones T={T} x={600} y={1000} at={K.A + 1.7} n={10} />
          <Puerco T={T} x={jx} y={1000} s={1.0} paso={caminando ? T : 0} baja={T > K.A + 1.2 && T < K.A + 2.9 ? 0.6 + 0.3 * Math.sin(T * 14) : 0} />
          {T > K.A + 2.9 && <path d={`M 420 1060 Q 600 1120 ${klerp(430, 760, kprog(T, K.A + 2.9, K.A + 4.2))} 1080`} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 14" fill="none" opacity=".6" />}
          {kprog(T, K.A + 4.1, K.A + 4.4) > 0 && <Popo x={560} y={1010} s={1.1 * kprog(T, K.A + 4.1, K.A + 4.4, kEase.rebote)} />}
        </>)}
      </Escena>
      {/* 6 · la vieja hipótesis: feromona del cerdo macho */}
      <Escena T={T} a={K.H} b={K.Pr}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={70} y={560} width={940} height={620} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={9} transform="rotate(-2 540 870)" />
          <text x={540} y={650} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>HIPÓTESIS · 1981</text>
          <Puerco T={T} x={260} y={1060} s={0.85} color="#f2a0b4" jabali={false} />
          {kprog(T, K.H + 1.2, K.H + 1.7) > 0 && <g opacity={kprog(T, K.H + 1.2, K.H + 1.7)}>
            <ellipse cx={330} cy={770} rx={180} ry={56} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            <text x={330} y={782} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>androstenol</text>
          </g>}
          {kprog(T, K.H + 2.0, K.H + 2.6) > 0 && <path d={`M 470 900 Q 600 820 ${klerp(470, 760, kprog(T, K.H + 2.0, K.H + 2.6))} 930`} stroke={KC.ink} strokeWidth={7} strokeDasharray="16 12" fill="none" />}
          <Trufa x={830} y={980} s={0.6} seed={7} />
          {kprog(T, K.H + 2.7, K.H + 3.0) > 0 && <text x={830} y={860} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.H + 2.7, K.H + 3.0)}>¿?</text>}
        </>)}
      </Escena>
      {/* 7 · la prueba de Francia: el cerdo pasa de largo la feromona; el perro va directo a la trufa */}
      <Escena T={T} a={K.Pr} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo y={1000} />
          <Hoyo x={200} y={1040} texto="feromona" o={kprog(T, K.Pr, K.Pr + 0.4)} />
          <Hoyo x={560} y={1040} texto="sulfuro de dimetilo" o={kprog(T, K.Pr + 0.15, K.Pr + 0.55)} color="#ffe37a" />
          <Hoyo x={890} y={1040} texto="trufa" o={kprog(T, K.Pr + 0.3, K.Pr + 0.7)} />
          <Olor T={T} x={560} y={1020} alto={220} n={2} ancho={40} o={kprog(T, K.Pr + 0.5, K.Pr + 1)} />
          <Olor T={T} x={890} y={1020} alto={220} n={2} ancho={40} o={kprog(T, K.Pr + 0.5, K.Pr + 1)} />
          <Terrones T={T} x={560} y={1010} at={K.Pr + 2.6} n={8} />
          <Terrones T={T} x={890} y={1010} at={K.Pr + 2.5} n={8} />
          <Perro T={T} x={dx} y={990} s={0.85} flip paso={T < K.Pr + 2.4 ? T : 0} baja={T > K.Pr + 2.4 ? 0.6 + 0.3 * Math.sin(T * 14) : 0} />
          <Puerco T={T} x={px} y={1000} s={0.75} color="#f2a0b4" jabali={false} paso={T < K.Pr + 2.4 ? T : 0} baja={T > K.Pr + 2.4 ? 0.6 + 0.3 * Math.sin(T * 14) : 0} />
          <SelloTexto T={T} at={K.Pr + 4.2} x={330} y={700} texto="EN DUDA" />
        </>)}
      </Escena>
      {/* 8–9 · Italia 2014: por dentro de la tripa del cerdo, las esporas salen vivas; luego se unen a raíces de encino */}
      <Escena T={T} a={K.E} b={K.M}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {T < K.En + 0.3 && <g opacity={kprog(T, K.E + 1.6, K.E + 2.2) * (1 - kprog(T, K.En - 0.2, K.En + 0.3))}>
            <Tripa T={T} y={900} />
            {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.E + 1.8 + i * 0.25, K.E + 4.8 + i * 0.1, kEase.suave); const xx = klerp(-80, 1000, u) - i * 120;
              return <g key={i}><Asca T={T} x={xx} y={900 + Math.sin(xx / 180) * 40} s={0.95} n={(i % 3) + 2} abre={kprog(u, 0.25, 0.6)} seed={i} rot={T * 20 + i * 30} />
</g>; })}
          </g>}
          {T > K.En - 0.3 && <g opacity={kprog(T, K.En - 0.3, K.En + 0.2)}>
            <PuntaMicorriza T={T} x={430} y={760} s={1.2} rot={12} g={kprog(T, K.En + 0.6, K.En + 2.4)} seed={9} />
            {[[620, 1030], [760, 980], [880, 1080]].map(([ex, ey], i) => <g key={i}>
              <Espora x={ex} y={ey} s={1.1} erosion={0.6} viva={0.8} />
              <path d={`M ${ex} ${ey - 20} Q ${ex - 60} ${ey - 140} ${klerp(ex, 560, kprog(T, K.En + 0.3, K.En + 1.8))} ${klerp(ey - 30, 820, kprog(T, K.En + 0.3, K.En + 1.8))}`} stroke={TR.manto} strokeWidth={5} fill="none" strokeLinecap="round" opacity={kprog(T, K.En + 0.2, K.En + 0.5)} />
            </g>)}
          </g>}
        </>)}
      </Escena>
      {/* 10 · México: unas veinte especies de trufas silvestres (conteo de 2018) */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<MapaMexico x={40} y={640} ancho={1000}>
          {MX.map(([lo, la], i) => { const [mx, my] = mxProy(lo, la); const k = kprog(T, K.M + 0.6 + i * 0.12, K.M + 0.9 + i * 0.12, kEase.rebote);
            return k > 0 ? <g key={i} transform={`translate(${mx} ${my}) scale(${k})`}><path d="M -14 0 Q -16 -14 0 -16 Q 16 -14 14 0 Q 12 12 0 12 Q -12 12 -14 0 Z" fill={TR.peridio} stroke={KC.ink} strokeWidth={3} /></g> : null; })}
        </MapaMexico>)}
      </Escena>
      {/* 11 · cierre: la misma mano con la misma "piedra"; ahora huele y llegan un hocico y una nariz */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo y={1150} />
          <Mano x={380} y={900} s={1.05} />
          <Trufa x={380} y={740} s={1.45} rot={-6} />
          <Olor T={T} x={380} y={630} alto={300} n={3} o={kprog(T, K.C + 0.3, K.C + 0.9)} color="#fff4b0" />
          <g transform={`translate(${klerp(-500, -60, kprog(T, K.C + 1.2, K.C + 2.0, kEase.sale))} 0)`}><Puerco T={T} x={0} y={1180} s={0.9} color="#f2a0b4" jabali={false} /></g>
          <g transform={`translate(${klerp(500, 40, kprog(T, K.C + 1.6, K.C + 2.4, kEase.sale))} 0)`}><Perro T={T} x={1000} y={1160} s={0.9} flip /></g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.4} until={K.G + 2.6} texto="¿una piedra?" x={300} y={500} tam={50} />
      <Etq T={T} at={K.G + 1.6} until={K.R - 0.3} x={60} y={600} texto="trufa" tam={44} color={KC.ink} />
      <Etq T={T} at={K.G + 2.0} until={K.R - 0.3} x={60} y={660} texto="Tuber" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.R - 0.3} texto="por dentro: vetas blancas" x={330} y={1080} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.R + 0.6} until={K.R + 3.2} x={60} y={420} texto="encino · Quercus" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 1.0} until={K.R + 3.2} x={60} y={470} texto="avellano · Corylus avellana" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 1.8} until={K.R + 3.2} x={760} y={1110} lado="izq" texto="trufas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 3.6} until={K.Pb - 0.3} texto="AL MICROSCOPIO · micorriza" x={380} y={470} tam={32} borde={KC.mint} />
      <Etq T={T} at={K.R + 3.9} until={K.Pb - 0.3} x={60} y={1170} texto="punta de raíz de encino" tam={28} />
      <Etq T={T} at={K.R + 4.2} until={K.Pb - 0.3} x={1040} y={640} lado="izq" texto="hifas de la trufa" tam={28} color={TR.manto} />
      <Etq T={T} at={K.R + 4.5} until={K.Pb - 0.3} x={760} y={1150} texto="minerales" tam={30} color={KC.mint} />
      <Etq T={T} at={K.R + 4.7} until={K.Pb - 0.3} x={60} y={640} texto="azúcar" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Pb + 0.2} until={K.Pb + 2.1} texto="AL MICROSCOPIO · por dentro de la trufa" x={430} y={470} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.Pb + 0.8} until={K.Pb + 2.1} x={60} y={600} texto="ascas (sacos)" tam={28} />
      <Etq T={T} at={K.Pb + 1.1} until={K.Pb + 2.1} x={1040} y={1180} lado="izq" texto="esporas" tam={28} color={'#e7b06a'} />
      <Etq T={T} at={K.Pb + 2.8} until={K.O - 0.3} x={60} y={560} texto="otros hongos: al viento" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pb + 3.4} until={K.O - 0.3} texto="bajo tierra: sin viento" x={360} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.O + 0.6} until={K.O + 2.3} texto="decenas de sustancias" x={360} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.O + 2.8} until={K.P - 0.3} x={60} y={800} texto="sulfuro de dimetilo · (CH₃)₂S" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 0.8} until={K.H - 0.3} x={60} y={600} texto="jabalí" tam={34} color={KC.ink} />
      <Etq T={T} at={K.A + 1.1} until={K.H - 0.3} x={60} y={650} texto="Sus scrofa" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.A + 4.3} until={K.H - 0.3} texto="esporas de viaje" x={360} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.H + 0.4} until={K.Pr - 0.3} texto="feromona del cerdo macho" x={360} y={470} tam={32} borde={KC.pink} />
      <Chip T={T} at={K.Pr + 0.2} until={K.E - 0.3} texto="Francia · publicado en 1990" x={360} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Pr + 1.3} until={K.Pr + 3.2} x={60} y={800} texto="la pasa de largo" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pr + 2.6} until={K.E - 0.3} x={1040} y={800} lado="izq" texto="directo a la trufa" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.2} anio="2014" quien="Italia · esporas de trufa" revista="Fungal Ecology, 2014" y={620} />
      <Chip T={T} at={K.E + 2.4} until={K.En - 0.3} texto="POR DENTRO · la tripa del cerdo" x={380} y={470} tam={30} borde={KC.pink} />
      <Chip T={T} at={K.E + 4.0} until={K.En - 0.3} texto="✓ siguen vivas" x={330} y={1150} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.En + 0.5} until={K.M - 0.3} texto="✓ más micorrizas con encino" x={380} y={470} tam={32} borde={KC.mint} />
      <NumeroGigante T={T} at={K.M + 0.3} until={K.C - 0.3} valor={20} prefijo="≈" dur={0.8} etiqueta="especies de Tuber (2018)" x={330} y={470} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.M + 2.2} until={K.C - 0.3} x={60} y={1170} texto="Tuber incognitum · bajo encinos" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="se deja encontrar" x={330} y={470} tam={40} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="5 cm" largo={260} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.R + 3.3} texto="1 m" largo={150} />
      <BarraEscala T={T} at={K.R + 3.4} until={K.Pb} texto="1 mm" largo={300} />
      <BarraEscala T={T} at={K.Pb} until={K.Pb + 2.3} texto="50 µm" largo={110} />
      <BarraEscala T={T} at={K.Pb + 2.4} until={K.O} texto="5 cm" largo={90} />
      <BarraEscala T={T} at={K.O} until={K.P} texto="5 cm" largo={140} />
      <BarraEscala T={T} at={K.A} until={K.H} texto="1 m" largo={260} />
      <BarraEscala T={T} at={K.Pr} until={K.E} texto="1 m" largo={200} />
      <BarraEscala T={T} at={K.E + 2.2} until={K.En} texto="50 µm" largo={110} />
      <BarraEscala T={T} at={K.En} until={K.M} texto="0.5 mm" largo={160} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="500 km" largo={210} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={260} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="No es una piedra: *es una trufa.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.Pb - 0.1} texto="Minerales por *azúcar.*" />
      <Subtitulo T={T} idx={2} at={K.Pb + 0.1} until={K.O - 0.1} texto="Bajo tierra *no hay viento.*" />
      <Subtitulo T={T} idx={3} at={K.O + 0.1} until={K.P - 0.1} texto="Su solución: *oler.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.A - 0.1} texto="¿Quién sigue *ese olor?*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.H - 0.1} texto="Esporas *en la popó.*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.Pr - 0.1} texto="¿Una *feromona* de cerdo?" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.E - 0.1} texto="Iban al *sulfuro de dimetilo.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.En - 0.1} texto="Las esporas *salen vivas.*" />
      <Subtitulo T={T} idx={9} at={K.En + 0.1} until={K.M - 0.1} texto="Se unen *a raíces de encino.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.C - 0.1} texto="México: *unas veinte especies.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Se deja encontrar *por el olfato.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.8, K.R + 3.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pb + 2.6, K.O - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.O + 0.6, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.A + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.A + 1.0, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 0.5, K.Pr + 2.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pr + 2.6, K.E - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.E + 2.6, K.M - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.6, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="52" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TrufasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TrufasShot /></CompositionStage></div>;
}
window.TrufasApp = TrufasApp;
