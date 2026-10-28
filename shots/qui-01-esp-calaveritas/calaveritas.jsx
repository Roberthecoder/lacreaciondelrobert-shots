// Shot Químico #01 · Especial Día de Muertos: las calaveritas de azúcar se arman solas — NARRADO (N3 capítulos y medidores + N5 experimento).
// Guion y fuentes: guion.md. El dibujo es esquemático (la molécula de sacarosa y la red del cristal están simplificadas).
const ROSA = '#ff4f9a', AMBAR = '#f2b84b', MIEL = '#d98a1e', BARRO = '#b4643a', BARRO2 = '#8f4a26', AZUCAR = '#fbf8f1', COBRE = '#c8693a';
const PAPEL = [KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink];

// Contorno de la calavera (centro 0,0; ~460 de ancho)
const CRANEO = 'M -230 -30 C -236 -270 236 -270 230 -30 C 228 60 196 108 156 128 L 154 196 C 150 238 -150 238 -154 196 L -156 128 C -196 108 -228 60 -230 -30 Z';

// Papel picado que se mece arriba de la pantalla
function PapelPicado({ T, y = 0, n = 7, alto = 150 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={PAPEL[i % 6]} opacity=".93" />
        <circle cx={0} cy={alto * 0.36} r={16} fill={ROSA} opacity=".9" /><path d={`M -24 ${alto * 0.62} l 12 -14 l 12 14 l 12 -14 l 12 14`} stroke={ROSA} strokeWidth={7} fill="none" opacity=".9" />
        <rect x={-30} y={alto * 0.12} width={12} height={12} fill={ROSA} transform={`rotate(45 -24 ${alto * 0.12 + 6})`} /><rect x={18} y={alto * 0.12} width={12} height={12} fill={ROSA} transform={`rotate(45 24 ${alto * 0.12 + 6})`} />
      </g>; })}
  </svg>;
}

// Calavera de azúcar. deco 0..1 (betún y papel brillante), brilla 0..1 (destellos de cristal), nombre en la frente.
function Calavera({ T, x, y, s = 1, deco = 1, brilla = 0, nombre = 'LUPITA', rot = 0 }) {
  const d = (k) => kclamp(deco * 5 - k, 0, 1); // aparece por partes
  const g = krng(7), destellos = Array.from({ length: 14 }, () => [g() * 360 - 180, g() * 380 - 230, g() * 6]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={250} rx={230} ry={26} fill="rgba(0,0,0,.22)" />
    <path d={CRANEO} fill={AZUCAR} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {/* textura de azúcar */}
    {Array.from({ length: 40 }, (_, i) => { const a = krng(i + 3); return <circle key={i} cx={a() * 380 - 190} cy={a() * 360 - 220} r={2 + a() * 2} fill="#e9e1d0" />; })}
    {/* ojos de papel brillante con aro de betún */}
    {[-92, 92].map((ex, k) => <g key={k}>
      <circle cx={ex} cy={14} r={66} fill={AZUCAR} stroke={KC.ink} strokeWidth={6} />
      <g opacity={d(1)}>
        <circle cx={ex} cy={14} r={54} fill={k ? KC.cyan : KC.lilac} stroke={KC.ink} strokeWidth={5} />
        <path d={`M ${ex - 40} ${14 - 6} A 46 46 0 0 1 ${ex + 10} ${14 - 44}`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(T * 3 + k)} />
        {Array.from({ length: 14 }, (_, j) => { const a = (j / 14) * Math.PI * 2; return <circle key={j} cx={ex + Math.cos(a) * 64} cy={14 + Math.sin(a) * 64} r={9} fill={PAPEL[(j + k) % 6]} stroke={KC.ink} strokeWidth={3} />; })}
      </g>
    </g>)}
    {/* nariz */}
    <path d="M 0 74 C -26 110 -30 128 -12 132 L 0 120 L 12 132 C 30 128 26 110 0 74 Z" fill={d(2) > 0.5 ? KC.pink : '#e6dccb'} stroke={KC.ink} strokeWidth={5} />
    {/* dientes */}
    <rect x={-110} y={156} width={220} height={52} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[-66, -22, 22, 66].map((tx) => <line key={tx} x1={tx} y1={156} x2={tx} y2={208} stroke={KC.ink} strokeWidth={4} />)}
    <line x1={-110} y1={182} x2={110} y2={182} stroke={KC.ink} strokeWidth={4} />
    {/* flor de betún y nombre en la frente */}
    <g opacity={d(3)}>
      {Array.from({ length: 6 }, (_, j) => { const a = (j / 6) * Math.PI * 2; return <ellipse key={j} cx={Math.cos(a) * 28} cy={-188 + Math.sin(a) * 28} rx={22} ry={14} transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * 28} ${-188 + Math.sin(a) * 28})`} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />; })}
      <circle cx={0} cy={-188} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    </g>
    <g opacity={d(4)}>
      <text x={0} y={-100} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.mint} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">{nombre}</text>
      {/* rizos de betún en las mejillas */}
      <path d="M -200 70 q 20 -30 40 0 t 40 0" stroke={KC.pink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 120 70 q 20 -30 40 0 t 40 0" stroke={KC.pink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M -150 -150 q 30 -40 70 -30" stroke={KC.cyan} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M 150 -150 q -30 -40 -70 -30" stroke={KC.cyan} strokeWidth={9} fill="none" strokeLinecap="round" />
    </g>
    {brilla > 0 && destellos.map(([px, py, f], i) => { const o = brilla * Math.max(0, Math.sin(T * 4 + f)); return <path key={i} d={`M ${px} ${py - 16} L ${px + 4} ${py - 4} L ${px + 16} ${py} L ${px + 4} ${py + 4} L ${px} ${py + 16} L ${px - 4} ${py + 4} L ${px - 16} ${py} L ${px - 4} ${py - 4} Z`} fill="#fff" opacity={o} />; })}
  </g>;
}

// Martillito de laboratorio que da un golpecito (golpe = momento del toque)
function Martillo({ T, x, y, golpe, s = 1 }) {
  const ang = T < golpe ? klerp(-55, 0, kprog(T, golpe - 0.45, golpe, (p) => p * p)) : -Math.exp(-(T - golpe) * 5) * Math.abs(Math.sin((T - golpe) * 9)) * 30;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${ang})`}>
    <rect x={-8} y={-250} width={16} height={250} rx={6} fill="#8a5a33" stroke={KC.ink} strokeWidth={5} />
    <rect x={-50} y={-290} width={100} height={52} rx={12} fill="#9aa4b2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Migajas de azúcar que brincan al golpe
function Migajas({ T, x, y, at }) {
  if (T < at || T > at + 1.2) return null;
  const u = T - at, g = krng(11);
  return <g>{Array.from({ length: 12 }, (_, i) => { const vx = (g() - 0.5) * 520, vy = -200 - g() * 260; return <rect key={i} x={x + vx * u} y={y + vy * u + 900 * u * u} width={10} height={10} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={1 - u / 1.2} transform={`rotate(${i * 40 + u * 400} ${x + vx * u} ${y + vy * u + 900 * u * u})`} />; })}</g>;
}

// Cazo de cobre con jarabe que hierve sobre la flama
function Cazo({ T, x, y, s = 1, hierve = 1, nivel = 1 }) {
  const g = krng(5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* flama */}
    {[-90, -30, 30, 90].map((fx, i) => <path key={i} d={`M ${fx - 24} 190 Q ${fx} ${110 - 20 * Math.sin(T * 12 + i)} ${fx + 24} 190 Z`} fill={i % 2 ? KC.orange : '#4aa3ff'} opacity={0.9} />)}
    <rect x={-170} y={186} width={340} height={26} rx={10} fill="#3b3f4a" stroke={KC.ink} strokeWidth={6} />
    {/* mango */}
    <rect x={190} y={-30} width={210} height={30} rx={14} fill="#6b4226" stroke={KC.ink} strokeWidth={6} />
    {/* cuerpo */}
    <path d="M -210 -60 L 210 -60 L 180 150 Q 0 190 -180 150 Z" fill={COBRE} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -180 -20 L 170 -20" stroke="#e08b57" strokeWidth={8} opacity=".7" />
    <ellipse cx={0} cy={-60} rx={210} ry={40} fill={AMBAR} stroke={KC.ink} strokeWidth={8} opacity={nivel} />
    {hierve > 0 && Array.from({ length: 10 }, (_, i) => { const ph = (T * 1.6 + g()) % 1, bx = (g() - 0.5) * 340; return <circle key={i} cx={bx} cy={-60 + (g() - 0.5) * 40} r={6 + 16 * ph} fill="none" stroke="#fff" strokeWidth={4} opacity={hierve * (1 - ph)} />; })}
    {hierve > 0 && [-80, 0, 80].map((vx, i) => <path key={'v' + i} d={`M ${vx} -110 q 18 -30 0 -60 q -18 -30 0 -60`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={hierve * 0.5 * (0.5 + 0.5 * Math.sin(T * 3 + i))} transform={`translate(0 ${-((T * 40 + i * 20) % 40)})`} />)}
  </g>;
}

// Vaso con agua y un montón de azúcar disuelta (para comparar solubilidad)
function Vaso({ T, x, y, caliente, lleno = 0, etiqueta }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -130 -200 L 130 -200 L 110 170 Q 0 190 -110 170 Z" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -122 -120 L 122 -120 L 110 170 Q 0 190 -110 170 Z" fill={caliente ? 'rgba(255,170,90,.55)' : 'rgba(120,210,255,.55)'} />
    {Array.from({ length: Math.round(lleno * 26) }, (_, i) => { const g = krng(i + (caliente ? 50 : 9)); return <rect key={i} x={g() * 190 - 95} y={-100 + g() * 250} width={14} height={14} rx={3} fill="#fff" opacity={0.55} transform={`rotate(${T * 60 + i * 30} ${g() * 190 - 95} ${-100 + g() * 250})`} />; })}
    {caliente && [-50, 0, 50].map((vx, i) => <path key={i} d={`M ${vx} -230 q 16 -26 0 -52 q -16 -26 0 -52`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.4 + 0.3 * Math.sin(T * 3 + i)} />)}
    <text x={0} y={250} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}

// Molde de barro de dos piezas unido con liga (silueta de calavera). abre 0..1 separa las mitades.
function Molde({ x, y, s = 1, abre = 0 }) {
  const sep = abre * 130;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`translate(${k * sep} 0)`}>
      <clipPath id={`mitad${k}`}><rect x={k < 0 ? -300 : 0} y={-320} width={300} height={640} /></clipPath>
      <g clipPath={`url(#mitad${k})`}>
        <path d="M -270 -60 C -280 -310 280 -310 270 -60 C 268 70 230 130 190 150 L 188 236 C 184 282 -184 282 -188 236 L -190 150 C -230 130 -268 70 -270 -60 Z" fill={BARRO} stroke={KC.ink} strokeWidth={10} />
        {[0, 1, 2, 3].map((j) => <path key={j} d={`M -220 ${-120 + j * 90} q 220 -30 440 0`} stroke={BARRO2} strokeWidth={6} fill="none" opacity=".6" />)}
      </g>
    </g>)}
    {abre < 0.1 && <rect x={-280} y={-24} width={560} height={30} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} opacity={1 - abre * 10} />}
  </g>;
}

// Termómetro vertical. temp en °C (20..105)
function Termometro({ x, y, temp }) {
  const h = klerp(40, 520, kclamp((temp - 15) / 90, 0, 1));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-40} y={-560} width={80} height={600} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={60} r={66} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={40 - h} width={40} height={h + 20} rx={20} fill={KC.red} />
    {[20, 40, 60, 80, 100].map((t) => { const yy = 40 - klerp(40, 520, (t - 15) / 90); return <g key={t}><line x1={40} y1={yy} x2={70} y2={yy} stroke={KC.ink} strokeWidth={5} /><text x={80} y={yy + 12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{t}°</text></g>; })}
  </g>;
}

// Molécula de sacarosa esquemática: glucosa (hexágono) + fructosa (pentágono) unidas por un oxígeno
function Sacarosa({ x, y, s = 1, rot = 0, color = AZUCAR, brillo = 0 }) {
  const hexa = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; return `${-34 + Math.cos(a) * 26},${Math.sin(a) * 26}`; }).join(' ');
  const penta = Array.from({ length: 5 }, (_, i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return `${34 + Math.cos(a) * 22},${Math.sin(a) * 22}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle r={70} fill={KC.cyan} opacity={0.18 * brillo} />}
    <line x1={-8} y1={0} x2={12} y2={0} stroke={color} strokeWidth={6} />
    <circle cx={2} cy={0} r={7} fill={KC.red} />
    <polygon points={hexa} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <polygon points={penta} fill="none" stroke={KC.cyan} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Muchas moléculas: orden 0 (sueltas, flotando) → 1 (filas de un cristal)
function RedCristal({ T, cx = 540, cy = 860, orden = 0, n = 48, cols = 8, paso = 100, brillo = 0 }) {
  const g = krng(21);
  return <g>{Array.from({ length: n }, (_, i) => {
    const sx = g() * 960 + 60, sy = g() * 760 + 480, ph = g() * 6, r0 = g() * 360;
    const c = i % cols, r = Math.floor(i / cols), gx = cx + (c - (cols - 1) / 2) * paso, gy = cy + (r - (n / cols - 1) / 2) * paso * 0.72;
    const e = kEase.suave(kclamp(orden * 1.5 - (i / n) * 0.5, 0, 1));
    const fx = sx + Math.sin(T * 1.3 + ph) * 30, fy = sy + Math.cos(T * 1.1 + ph) * 30;
    return <Sacarosa key={i} x={klerp(fx, gx, e)} y={klerp(fy, gy, e)} s={0.8} rot={klerp(r0 + T * 40, 0, e)} brillo={brillo} />;
  })}</g>;
}

// Corte del molde: costra blanca que crece desde la orilla; luego se voltea y escurre la miel → calavera hueca
function CorteMolde({ T, x, y, costra, voltea, escurre }) {
  const inner = 1 - costra * 0.28;
  return <g transform={`translate(${x} ${y}) rotate(${voltea * 180})`}>
    <path d="M -270 -60 C -280 -310 280 -310 270 -60 C 268 70 230 130 190 150 L 188 236 C 184 282 -184 282 -188 236 L -190 150 C -230 130 -268 70 -270 -60 Z" fill={BARRO} stroke={KC.ink} strokeWidth={10} />
    <path d={CRANEO} fill={AZUCAR} stroke={KC.ink} strokeWidth={4} />
    <g transform={`scale(${inner})`}>
      <path d={CRANEO} fill={escurre > 0 ? mixHex(MIEL, '#3a2414', escurre) : MIEL} stroke={KC.ink} strokeWidth={4} opacity={1} />
      {escurre < 0.5 && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={Math.sin(i * 2.1) * 120} cy={Math.cos(i * 1.7) * 110} r={8} fill="#ffd27a" opacity={0.6 + 0.4 * Math.sin(T * 5 + i)} />)}
    </g>
    {/* cristalitos en el frente de la costra */}
    {Array.from({ length: 22 }, (_, i) => { const a = (i / 22) * Math.PI * 2; const rx = 205 * inner, ry = 190 * inner; return <rect key={i} x={Math.cos(a) * rx - 7} y={-40 + Math.sin(a) * ry - 7} width={14} height={14} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={costra > 0.05 && escurre < 0.6 ? 0.9 : 0} transform={`rotate(45 ${Math.cos(a) * rx} ${-40 + Math.sin(a) * ry})`} />; })}
  </g>;
}

// Microscopio esquemático
function Microscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={170} width={240} height={40} rx={12} fill="#3b3f4a" stroke={KC.ink} strokeWidth={7} />
    <path d="M 60 170 L 60 -40 Q 60 -90 10 -110" stroke="#3b3f4a" strokeWidth={34} fill="none" strokeLinecap="round" />
    <rect x={-70} y={-210} width={56} height={170} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} transform="rotate(-18 -42 -125)" />
    <rect x={-90} y={60} width={150} height={20} rx={6} fill="#6b7180" stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-30} width={30} height={70} rx={6} fill="#9aa4b2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Vista al microscopio: cristales de azúcar (prismas). planta: 'remolacha' | 'cana'
function VistaCristales({ T, x, y, r = 170, seed = 3, etiqueta }) {
  const g = krng(seed);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#0b1830" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 9 }, (_, i) => { const px = (g() - 0.5) * r * 1.2, py = (g() - 0.5) * r * 1.2, a = g() * 180, k = 0.7 + g() * 0.6;
      return <g key={i} transform={`translate(${px} ${py}) rotate(${a}) scale(${k})`}>
        <path d="M -30 -18 L 18 -18 L 32 0 L 18 18 L -30 18 L -40 0 Z" fill="#e8f6ff" stroke={KC.cyan} strokeWidth={4} opacity={0.8 + 0.2 * Math.sin(T * 3 + i)} />
        <path d="M -30 -18 L -18 0 L -30 18 M 18 -18 L 6 0 L 18 18 M -18 0 L 6 0" stroke={KC.cyan} strokeWidth={3} fill="none" />
      </g>; })}
    <text x={0} y={r + 60} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{etiqueta}</text>
  </g>;
}
function Remolacha({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    {[-20, 0, 20].map((a, i) => <path key={i} d="M 0 -40 Q -20 -110 0 -140 Q 20 -110 0 -40" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a} 0 -40)`} />)}
    <path d="M 0 -50 C 70 -50 70 40 0 90 C -70 40 -70 -50 0 -50 Z" fill="#a51d55" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Cana({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    {[-28, 0, 28].map((dx, i) => <g key={i}><rect x={dx - 10} y={-130} width={20} height={220} rx={8} fill="#b9c96a" stroke={KC.ink} strokeWidth={4} />
      {[-80, -20, 40].map((yy) => <line key={yy} x1={dx - 10} y1={yy} x2={dx + 10} y2={yy} stroke={KC.ink} strokeWidth={4} />)}</g>)}
    <path d="M -28 -130 Q -70 -170 -90 -150 M 28 -130 Q 70 -180 96 -150" stroke={KC.leaf} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Cuchara que revuelve
function Cuchara({ T, x, y, gira = 1 }) {
  const a = Math.sin(T * 7) * 30 * gira;
  return <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <rect x={-10} y={-260} width={20} height={240} rx={8} fill="#c9ced8" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={34} ry={48} fill="#c9ced8" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Cristales: finos y lisos (k = 0) o grandes e irregulares (k = 1)
function Grano({ x, y, k, T, crece = 1 }) {
  const g = krng(k ? 31 : 13), n = k ? 9 : 60;
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => { const px = (g() - 0.5) * 330, py = (g() - 0.5) * 300, sz = (k ? 40 + g() * 50 : 8 + g() * 6) * crece, a = g() * 90;
    return <rect key={i} x={px - sz / 2} y={py - sz / 2} width={sz} height={sz * (k ? 0.6 + g() * 0.8 : 1)} fill="#fff" stroke={k ? KC.ink : '#d8d0c0'} strokeWidth={k ? 4 : 1.5} transform={`rotate(${a} ${px} ${py})`} />; })}</g>;
}

function Calaveritas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Hi: CUES.Hierve, Ca: CUES.Caliente, Mo: CUES.Molde, So: CUES.Sobra, P: CUES.Pregunta, Cr: CUES.Cristal, Co: CUES.Costra, E: CUES.Estudio, Gr: CUES.Grumos, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const GOLPE = K.G + 0.55, GOLPE2 = K.G + 1.6;
  // vertido del cazo al molde (escena Molde)
  const vierte = kprog(T, K.Mo + 0.3, K.Mo + 1.0, kEase.suave);
  const temp = klerp(100, 25, kprog(T, K.So + 0.3, K.So + 3.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un martillito toca la calavera y suena a azúcar */}
      <Escena T={T} a={K.G} b={K.Hi} zoom={0.06}>
        <FondoLunares color={ROSA} />
        <PapelPicado T={T} />
        {svg(<>
          <Calavera T={T} x={400} y={960} s={klerp(0.82, 1.12, kprog(T, K.G, K.G + 0.6, kEase.rebote))} brilla={kprog(T, K.G + 2.2, K.G + 3.0)} rot={T > GOLPE ? Math.sin((T - GOLPE) * 30) * 3 * Math.exp(-(T - GOLPE) * 4) : 0} />
          <Martillo T={T} x={720} y={1000} golpe={T < GOLPE + 0.6 ? GOLPE : GOLPE2} s={0.9} />
          <Migajas T={T} x={560} y={780} at={GOLPE} /><Migajas T={T} x={560} y={780} at={GOLPE2} />
        </>)}
      </Escena>
      {/* 2 · se hierve azúcar con agua */}
      <Escena T={T} a={K.Hi} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Cazo T={T} x={600} y={930} s={1.15} hierve={kprog(T, K.Hi + 0.3, K.Hi + 1.2)} />
          {Array.from({ length: 14 }, (_, i) => { const at = K.Hi + 0.1 + i * 0.07, u = kprog(T, at, at + 0.6, (p) => p * p); return u > 0 && u < 1 ? <rect key={i} x={560 + (i % 5) * 18} y={klerp(500, 860, u)} width={14} height={14} fill="#fff" stroke={KC.ink} strokeWidth={2} /> : null; })}
          {(() => { const u = kprog(T, K.Hi + 0.6, K.Hi + 1.4); return u > 0 && u < 1 ? <path d={`M 470 ${560} L 470 ${klerp(560, 860, u)}`} stroke="#7fd3ff" strokeWidth={22} strokeLinecap="round" /> : null; })()}
        </>)}
      </Escena>
      {/* 3 · solubilidad: agua fría vs agua hirviendo (datos de manual) */}
      <Escena T={T} a={K.Ca} b={K.Mo}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Vaso T={T} x={280} y={860} caliente={false} lleno={kprog(T, K.Ca + 0.4, K.Ca + 1.4) * 0.42} etiqueta="20 °C" />
          <Vaso T={T} x={800} y={860} caliente={true} lleno={kprog(T, K.Ca + 1.0, K.Ca + 2.6)} etiqueta="100 °C" />
        </>)}
      </Escena>
      {/* 4 · se vacía en moldes de barro fríos */}
      <Escena T={T} a={K.Mo} b={K.So}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Molde x={540} y={1000} s={0.85} />
          <g transform={`translate(${klerp(860, 760, vierte)} ${klerp(560, 520, vierte)}) rotate(${klerp(0, -38, vierte)})`}><Cazo T={T} x={0} y={0} s={0.6} hierve={0.6} nivel={1 - vierte * 0.5} /></g>
          {vierte > 0.6 && <path d={`M 610 560 Q 580 ${700} 560 ${klerp(620, 840, kprog(T, K.Mo + 0.8, K.Mo + 1.3))}`} stroke={AMBAR} strokeWidth={26} fill="none" strokeLinecap="round" opacity={1 - kprog(T, K.So - 0.6, K.So - 0.2)} />}
        </>)}
      </Escena>
      {/* 5 · al enfriarse: sobresaturado (termómetro baja, el azúcar "sobra") */}
      <Escena T={T} a={K.So} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Termometro x={170} y={1080} temp={temp} />
          <g transform="translate(600 900)">
            <path d="M -230 -260 L 230 -260 L 200 240 Q 0 270 -200 240 Z" fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
            <path d="M -222 -180 L 222 -180 L 200 240 Q 0 270 -200 240 Z" fill={AMBAR} opacity=".85" />
            {Array.from({ length: 30 }, (_, i) => { const g = krng(i + 70), sobra = i >= 30 * (temp - 20) / 80 * 0.9 + 3; const px = g() * 360 - 180, py = -150 + g() * 360;
              return <g key={i} transform={`translate(${px + Math.sin(T * 2 + i) * 8} ${py})`}><rect x={-10} y={-10} width={20} height={20} rx={3} fill={sobra ? '#fff' : '#ffe2a6'} stroke={sobra ? KC.red : 'none'} strokeWidth={4} opacity={sobra ? 0.95 : 0.6} transform={`rotate(${i * 25 + T * 30})`} /></g>; })}
          </g>
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cr} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={260} y={1100} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 900)`}>?</text>
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={120 + (i % 4) * 90 + Math.sin(T * 2 + i) * 14} y={1150 - ((T * 60 + i * 40) % 400)} width={22} height={22} fill="#fff" stroke={KC.ink} strokeWidth={3} transform={`rotate(${T * 90 + i * 20} ${131 + (i % 4) * 90} ${1161 - ((T * 60 + i * 40) % 400)})`} />)}
        </>)}
      </Escena>
      {/* 7 · por dentro: las moléculas de sacarosa se acomodan en filas (oscuro: escala molecular) */}
      <Escena T={T} a={K.Cr} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(120,200,255,.25)" />
        {svg(<RedCristal T={T} cx={540} cy={880} orden={kprog(T, K.Cr + 1.4, K.Cr + 4.2)} brillo={kprog(T, K.Cr + 3.8, K.Cr + 4.6)} />)}
      </Escena>
      {/* 8 · la costra cuaja en la orilla; se voltea el molde y escurre la miel: queda hueca */}
      <Escena T={T} a={K.Co} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <CorteMolde T={T} x={540} y={900} costra={kprog(T, K.Co + 0.3, K.Co + 2.4, kEase.suave)} voltea={kprog(T, K.Co + 2.8, K.Co + 3.4, kEase.suave)} escurre={kprog(T, K.Co + 3.4, K.Co + 5.2)} />
          <Goteo T={T} x={540} y0={1180} y1={1500} cada={0.22} color={MIEL} desde={K.Co + 3.4} hasta={K.Co + 5.6} r={14} />
        </>)}
      </Escena>
      {/* 9 · el estudio: Marggraf, 1747, Berlín */}
      <Escena T={T} a={K.E} b={K.Gr}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <VistaCristales T={T} x={270} y={1010} seed={3} etiqueta="remolacha" />
          <VistaCristales T={T} x={810} y={1010} seed={8} etiqueta="caña" />
          <text x={540} y={1040} textAnchor="middle" style={{ font:`400 140px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.E + 3.0, K.E + 3.4)}>=</text>
          <g opacity={kprog(T, K.E + 1.6, K.E + 2.2)}><Remolacha x={110} y={1500} /><Cana x={970} y={1520} /></g>
          <g opacity={1 - kprog(T, K.E + 1.4, K.E + 2.0)}><Microscopio x={540} y={1000} s={1.4} /></g>
        </>)}
      </Escena>
      {/* 10 · espumado: el artesano bate la miel en su punto para que cristalice y la vacía al molde (México Desconocido) */}
      <Escena T={T} a={K.Gr} b={K.Da}>
        <FondoLunares color={KC.cyan} />
        {svg((() => {
          const bate = 1 - kprog(T, K.Gr + 2.8, K.Gr + 3.2), vac = kprog(T, K.Gr + 3.0, K.Gr + 3.8, kEase.suave);
          const cristaliza = kprog(T, K.Gr + 1.0, K.Gr + 3.0), espuma = kprog(T, K.Gr + 0.5, K.Gr + 1.3) * bate, g = krng(21);
          return <>
            <g opacity={kprog(T, K.Gr + 2.9, K.Gr + 3.3)}><Molde x={280} y={900} s={0.5} /></g>
            {vac > 0.6 && <path d={`M 420 690 Q 360 700 ${klerp(330, 300, vac)} ${klerp(730, 790, kprog(T, K.Gr + 3.4, K.Gr + 3.9))}`} stroke="#f6e3b8" strokeWidth={22} fill="none" strokeLinecap="round" />}
            <g transform={`translate(${klerp(620, 640, vac)} ${klerp(820, 700, vac)}) rotate(${klerp(0, -35, vac)}) scale(0.9)`}>
              <rect x={190} y={-30} width={210} height={30} rx={14} fill="#6b4226" stroke={KC.ink} strokeWidth={6} />
              <path d="M -210 -60 L 210 -60 L 180 150 Q 0 190 -180 150 Z" fill={COBRE} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
              <path d="M -180 -20 L 170 -20" stroke="#e08b57" strokeWidth={8} opacity=".7" />
              <ellipse cx={0} cy={-60} rx={210} ry={40} fill={AMBAR} stroke={KC.ink} strokeWidth={8} />
              {/* al batirla, la miel se pone opaca y blanquecina: empieza a cristalizar */}
              <ellipse cx={0} cy={-60} rx={204} ry={36} fill={AZUCAR} opacity={0.75 * cristaliza} />
              {Array.from({ length: 16 }, (_, i) => { const bx = (g() - 0.5) * 360, by = -60 + (g() - 0.5) * 44, r0 = 8 + g() * 12;
                return <circle key={i} cx={bx + Math.sin(T * 9 + i) * 6} cy={by} r={r0 * (0.8 + 0.2 * Math.sin(T * 7 + i))} fill="#fffaf0" stroke={KC.ink} strokeWidth={2} opacity={espuma} />; })}
              {bate > 0 && <g opacity={bate}><Cuchara T={T} x={0} y={-50} gira={1.6 * bate} /></g>}
            </g>
          </>;
        })())}
      </Escena>
      {/* 11 · reposa un día y se decora */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        <PapelPicado T={T} />
        {svg(<Calavera T={T} x={540} y={960} s={1.05} deco={kprog(T, K.Da + 2.6, K.Da + 5.6)} nombre="LUPITA" />)}
      </Escena>
      {/* 12 · cierre: la misma calavera del inicio, ahora con sus cristales por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={ROSA} />
        <PapelPicado T={T} />
        {svg(<Calavera T={T} x={400} y={960} s={1.12} brilla={kprog(T, K.Ci + 0.4, K.Ci + 1.2)} />)}
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={800} y={1520} r={190} fx={430} fy={900} tinte={KC.cyan} etiqueta="cristales de sacarosa"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(.55) translate(-540 -860)`}><RedCristal T={Tl} cx={540} cy={860} orden={1} n={40} brillo={0.6 + 0.4 * Math.sin(Tl * 3)} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Hi, titulo: 'El jarabe' }, { at: K.Mo, titulo: 'El molde' }, { at: K.Cr, titulo: 'El cristal' }, { at: K.Gr, titulo: 'La calavera' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Hi - 0.2} texto="Especial Día de Muertos" x={540} y={1500} tam={40} borde={KC.yellow} />
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.7} until={K.G + 2.6} texto="¿yeso?" x={250} y={560} tam={52} />
      <Etq T={T} at={K.G + 2.4} until={K.Hi - 0.3} x={60} y={560} texto="azúcar (sacarosa)" tam={40} color={KC.yellow} />
      <Etq T={T} at={K.Hi + 0.4} until={K.Ca - 0.3} x={560} y={480} texto="azúcar + agua" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Hi + 1.4} until={K.Ca - 0.3} texto="hasta que espesa" x={600} y={1500} tam={40} borde={KC.orange} />
      <Medidor T={T} at={K.Ca + 0.3} until={K.Mo - 0.3} y={1440} ancho={900} etiqueta="20 °C · agua fría" valor={(t) => 0.42 * kprog(t, K.Ca + 0.4, K.Ca + 1.4)} texto={(v) => Math.round(v * 487) + ' g'} color={KC.cyan} />
      <Medidor T={T} at={K.Ca + 0.9} until={K.Mo - 0.3} y={1560} ancho={900} etiqueta="100 °C · hirviendo" valor={(t) => kprog(t, K.Ca + 1.0, K.Ca + 2.6)} texto={(v) => Math.round(v * 487) + ' g'} color={KC.orange} />
      <Etq T={T} at={K.Ca + 2.6} until={K.Mo - 0.3} x={90} y={1700} texto="por cada 100 mL de agua · datos de manual" tam={26} />
      <Chip T={T} at={K.Ca + 2.8} until={K.Mo - 0.3} texto="más del doble" x={540} y={520} tam={52} borde={KC.yellow} />
      <Etq T={T} at={K.Mo + 0.5} until={K.So - 0.3} x={180} y={1440} texto="molde de barro frío" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.9} until={K.So - 0.3} x={180} y={1500} texto="dos piezas + liga" tam={30} color={KC.ink} />
      <Chip T={T} at={K.So + 2.4} until={K.P - 0.2} texto="sobresaturado" x={600} y={1560} tam={50} borde={KC.red} />
      <Etq T={T} at={K.So + 0.6} until={K.P - 0.3} x={340} y={1440} texto="el azúcar que ya no cabe" tam={32} color={KC.ink} />
      {T > K.Cr - 0.3 && T < K.Co + 0.2 && <Escala T={T} z={1} pxPorMm={1e8} x={60} y={1440} />}
      <Etq T={T} at={K.Cr + 0.4} until={K.Co - 0.3} x={80} y={480} texto="sacarosa = glucosa + fructosa" tam={30} />
      <Chip T={T} at={K.Cr + 3.6} until={K.Co - 0.3} texto="filas ordenadas = cristal" x={540} y={1560} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.Co + 0.8} until={K.Co + 2.8} x={600} y={500} texto="la costra cuaja en la orilla" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Co + 4.0} until={K.E - 0.3} texto="queda hueca" x={540} y={1600} tam={48} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="1747" quien="Andreas Marggraf · Berlín" revista="azúcar de remolacha al microscopio" x={360} y={560} />
      <Chip T={T} at={K.E + 3.2} until={K.Gr - 0.3} texto="los mismos cristales" x={400} y={560} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.Gr + 3.2} until={K.Da - 0.3} x={60} y={680} texto="al molde" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Gr + 0.8} until={K.Da - 0.3} texto="espumado: se bate para que cristalice" x={540} y={1520} tam={38} borde={KC.ink} />
      <Cronometro T={T} at={K.Da + 0.2} until={K.Da + 2.7} factor={86400 / 2.3} x={360} y={500} etiqueta="REPOSO" />
      <Chip T={T} at={K.Da + 2.8} until={K.Ci - 0.3} texto="betún + papel brillante" x={540} y={1540} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.Ci + 3.0} until={K.Ou} texto="no es yeso: es cristal" x={400} y={500} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Hi - 0.1} texto="No es yeso: *es azúcar acomodada en cristales.*" />
      <Subtitulo T={T} idx={1} at={K.Hi + 0.1} until={K.Ca - 0.1} texto="Azúcar y agua *hasta que espesa.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Mo - 0.1} texto="Hirviendo se disuelve *más del doble.*" />
      <Subtitulo T={T} idx={3} at={K.Mo + 0.1} until={K.So - 0.1} texto="A moldes de *barro fríos.*" />
      <Subtitulo T={T} idx={4} at={K.So + 0.1} until={K.P - 0.1} texto="Se enfría: *sobra azúcar.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Cr - 0.1} texto="¿A dónde se va *lo que sobra?*" />
      <Subtitulo T={T} idx={6} at={K.Cr + 0.1} until={K.Co - 0.1} texto="Se acomoda en filas: *un cristal.*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.E - 0.1} texto="Cuaja en la orilla: *queda hueca.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Gr - 0.1} texto="1747: remolacha y caña, *el mismo cristal.*" />
      <Subtitulo T={T} idx={9} at={K.Gr + 0.1} until={K.Da - 0.1} texto="La bate en su punto: *cristaliza.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Reposa un día *y se decora.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Azúcar ordenada, *molécula por molécula.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Hierve + 0.6, CUES.Caliente - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Sobra + 0.5, CUES.Pregunta - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Cristal + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Costra + 3.2, CUES.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Estudio + 0.8, CUES.Grumos - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Grumos + 0.5, CUES.Dato - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Dato + 0.4, CUES.Dato + 3.6, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CalaveritasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Calaveritas /></CompositionStage></div>;
}
window.CalaveritasApp = CalaveritasApp;
