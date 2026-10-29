// Shot Festivo #08 · Revolución Mexicana · Químico: las películas de la Revolución eran de algodón con ácido nítrico — NARRADO (N3 capítulos y medidores + N5 experimento).
// Guion, fuentes y verificación: guion.md y verificacion.md. El dibujo es esquemático (cadena de celulosa, grupos nitrato y gases simplificados).
const VERDE = '#1f9e4a', ROJO = '#e0302a', BLANCO = '#fbf8f1', SEPIA = '#c79a5a', SEPIA2 = '#8a6236', AMBAR = '#e9a43a', CAFE = '#7a4a22', NO2 = '#b8571b', PLATA = '#c9ced8', PLATA2 = '#8d95a3';
const TRICOLOR = [VERDE, BLANCO, ROJO];

// Papel picado tricolor que se mece arriba
function PapelPicado({ T, y = 0, n = 7, alto = 150 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4, c = TRICOLOR[i % 3], hueco = c === BLANCO ? ROJO : BLANCO;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={c} stroke={KC.ink} strokeWidth={2} opacity=".95" />
        {/* estrella y rombos calados */}
        <path d={`M 0 ${alto * 0.2} L 7 ${alto * 0.33} L 20 ${alto * 0.35} L 10 ${alto * 0.44} L 13 ${alto * 0.57} L 0 ${alto * 0.5} L -13 ${alto * 0.57} L -10 ${alto * 0.44} L -20 ${alto * 0.35} L -7 ${alto * 0.33} Z`} fill={hueco} opacity=".9" />
        <path d={`M -24 ${alto * 0.7} l 12 -12 l 12 12 l 12 -12 l 12 12`} stroke={hueco} strokeWidth={6} fill="none" opacity=".9" />
      </g>; })}
  </svg>;
}

// Jinete revolucionario (silueta): caballo al galope + jinete con sombrero y carrillera. fase = galope.
function Jinete({ x, y, s = 1, fase = 0, color = '#2a1d12' }) {
  const p = Math.sin(fase), q = Math.cos(fase);
  const pata = (bx, k) => { const a = (k ? p : -p) * 24; return <path d={`M ${bx} 8 l ${Math.sin(a * Math.PI / 180) * 22} 22 l ${Math.sin((a + 20) * Math.PI / 180) * 4} 16`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />; };
  return <g transform={`translate(${x} ${y + q * 2}) scale(${s})`}>
    {pata(-26, 0)}{pata(-14, 1)}{pata(22, 1)}{pata(32, 0)}
    <ellipse cx={0} cy={0} rx={40} ry={17} fill={color} />
    <path d="M 28 -8 L 44 -30 L 58 -28 L 62 -20 L 48 -18 L 38 2 Z" fill={color} />
    <path d="M 48 -30 l 3 -8 l 4 7" fill={color} />
    <path d={`M -38 -6 q -18 ${6 + p * 6} -16 26`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* jinete */}
    <path d="M -6 -14 L 8 -14 L 10 -44 L -4 -44 Z" fill={color} />
    <path d="M -2 -14 l -4 18" stroke={color} strokeWidth={6} strokeLinecap="round" />
    <path d="M 8 -40 l 16 -4" stroke={color} strokeWidth={5} strokeLinecap="round" />
    <circle cx={3} cy={-52} r={8} fill={color} />
    <ellipse cx={3} cy={-56} rx={22} ry={4.5} fill={color} />
    <path d="M -5 -57 Q 3 -76 11 -57 Z" fill={color} />
  </g>;
}

// Tira de película (horizontal, origen a la izquierda). corre = desplazamiento de los cuadros; largo en px.
function Tira({ T, x, y, largo, rot = 0, corre = 0, alto = 150, base = '#d9b77a', escena = 'jinete', oscura = 0 }) {
  const cuadro = alto * 1.05, n = Math.ceil(largo / cuadro) + 2, off = ((corre % cuadro) + cuadro) % cuadro;
  const id = `tira${Math.round(x)}${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <clipPath id={id}><rect x={0} y={-alto / 2} width={largo} height={alto} /></clipPath>
    <g clipPath={`url(#${id})`}>
      <rect x={0} y={-alto / 2} width={largo} height={alto} fill={mixHex(base, CAFE, oscura)} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: n }, (_, i) => { const cx = i * cuadro - off; return <g key={i}>
        <rect x={cx + 8} y={-alto / 2 + 26} width={cuadro - 16} height={alto - 52} rx={6} fill={mixHex('#f3e2bd', '#9b6b3a', oscura)} stroke="#6b4a26" strokeWidth={3} />
        {escena === 'jinete' && <Jinete x={cx + cuadro / 2} y={6} s={alto / 210} fase={T * 9 + i} />}
        {[0.12, 0.37, 0.62, 0.87].map((f) => <g key={f}>
          <rect x={cx + f * cuadro - 7} y={-alto / 2 + 7} width={14} height={12} rx={3} fill={KC.ink} />
          <rect x={cx + f * cuadro - 7} y={alto / 2 - 19} width={14} height={12} rx={3} fill={KC.ink} />
        </g>)}
      </g>; })}
    </g>
  </g>;
}

// Carrete de película: rueda de metal con su rollo de película enrollada. r = radio. lleno 0..1 (cuánta película tiene).
function Rollo({ x, y, r = 200, rot = 0, lleno = 1, pelicula = '#c9954f', polvo = 0 }) {
  const rp = klerp(r * 0.32, r * 0.9, lleno);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={PLATA} stroke={KC.ink} strokeWidth={9} />
    <circle r={rp} fill={mixHex(pelicula, '#5a3a1c', polvo)} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, i) => <circle key={i} r={rp * (0.45 + i * 0.09)} fill="none" stroke={mixHex('#a8783c', '#3d2610', polvo)} strokeWidth={2} opacity=".7" />)}
    <g transform={`rotate(${rot})`}>
      {[0, 120, 240].map((a) => <path key={a} transform={`rotate(${a})`} d={`M ${-r * 0.18} ${-r * 0.36} Q 0 ${-r * 0.62} ${r * 0.18} ${-r * 0.36} L ${r * 0.1} ${-r * 0.24} L ${-r * 0.1} ${-r * 0.24} Z`} fill={KC.dark} opacity={lleno > 0.6 ? 0 : 0.8} />)}
      {[0, 120, 240].map((a) => <rect key={'h' + a} transform={`rotate(${a})`} x={-6} y={-r * 0.3} width={12} height={r * 0.14} rx={4} fill={PLATA2} />)}
    </g>
    <circle r={r * 0.2} fill={PLATA2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-r * 0.06} y={-r * 0.06} width={r * 0.12} height={r * 0.12} fill={KC.dark} transform={`rotate(${rot})`} />
    {polvo > 0 && Array.from({ length: 22 }, (_, i) => { const g = krng(i + 40), a = g() * 6.28, d = rp * (0.4 + g() * 0.55); return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={4 + g() * 7} fill="#d8b98a" opacity={polvo * 0.85} />; })}
  </g>;
}

// Flama que parpadea (base en 0,0)
function Flama({ T, x, y, s = 1, seed = 1 }) {
  const a = Math.sin(T * 13 + seed) * 6, b = Math.sin(T * 9 + seed * 2) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -42 0 C -52 -40 ${-14 + a} -70 ${a} ${-130 + b} C ${18 + a} -78 52 -46 42 0 Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <path d={`M -22 0 C -26 -26 ${-6 + a} -46 ${a * 0.6} ${-80 + b * 0.6} C ${10 + a} -46 26 -26 22 0 Z`} fill={KC.yellow} />
  </g>;
}
function Humo({ T, x, y, desde, n = 6, color = 'rgba(80,70,60,.55)' }) {
  if (T < desde) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = ((T - desde) * 0.45 + i / n) % 1; return <circle key={i} cx={x + Math.sin(u * 6 + i) * 30} cy={y - u * 320} r={24 + u * 50} fill={color} opacity={(1 - u) * kprog(T, desde, desde + 0.5)} />; })}</g>;
}

// Cámara de manivela sobre tripié (de las de 1910): caja de madera, dos carretes arriba, lente y manivela que gira.
function CamaraManivela({ T, x, y, s = 1, gira = 1 }) {
  const a = T * 360 * 1.6 * gira;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 0, 1].map((k) => <line key={k} x1={0} y1={120} x2={k * 110} y2={420} stroke="#6b4226" strokeWidth={16} strokeLinecap="round" />)}
    <rect x={-40} y={100} width={80} height={30} rx={6} fill="#3b3f4a" stroke={KC.ink} strokeWidth={5} />
    {[-70, 70].map((cx, i) => <g key={i} transform={`translate(${cx} -150)`}><circle r={78} fill="#4a3424" stroke={KC.ink} strokeWidth={7} />
      <g transform={`rotate(${a * (i ? 1 : 0.8)})`}>{[0, 120, 240].map((r) => <circle key={r} cx={0} cy={-40} r={14} fill="#2a1d12" transform={`rotate(${r})`} />)}</g>
      <circle r={14} fill={PLATA} stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-130} y={-80} width={260} height={190} rx={14} fill="#a0663a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-112} y={-62} width={224} height={154} rx={8} fill="none" stroke="#7a4a26" strokeWidth={5} />
    <rect x={-210} y={-20} width={84} height={70} rx={8} fill="#3b3f4a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-214} cy={15} r={30} fill="#26303f" stroke={KC.ink} strokeWidth={6} /><circle cx={-222} cy={6} r={9} fill="#9fd8ff" opacity=".8" />
    <g transform={`translate(146 10) rotate(${a})`}><rect x={-6} y={-6} width={12} height={60} rx={5} fill={PLATA2} stroke={KC.ink} strokeWidth={4} /><circle cx={0} cy={56} r={11} fill="#6b4226" stroke={KC.ink} strokeWidth={4} /></g>
    <circle cx={140} cy={10} r={12} fill={PLATA} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Hoja de contrato con firma que se dibuja (firma 0..1)
function Contrato({ x, y, firma = 0, rot = -4 }) {
  const largo = 520;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-200} y={-260} width={400} height={520} rx={10} fill="#f4ead2" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-196} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>CONTRATO</text>
    <text x={0} y={-150} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a4a36">1914</text>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={-160} y1={-110 + i * 30} x2={i % 3 === 2 ? 60 : 160} y2={-110 + i * 30} stroke="#a89878" strokeWidth={6} strokeLinecap="round" />)}
    <line x1={-160} y1={190} x2={160} y2={190} stroke={KC.ink} strokeWidth={3} />
    <path d="M -150 180 C -120 120 -100 210 -70 160 S -20 120 0 170 S 40 200 60 150 S 110 140 150 175" stroke="#1d2f8a" strokeWidth={6} fill="none" strokeLinecap="round"
      strokeDasharray={largo} strokeDashoffset={largo * (1 - firma)} />
  </g>;
}
function Pluma({ x, y, rot = 30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M 0 0 L -10 -30 L 10 -30 Z" fill={KC.ink} />
    <rect x={-10} y={-200} width={20} height={172} rx={8} fill="#2b2b33" stroke={KC.ink} strokeWidth={4} />
    <rect x={-10} y={-200} width={20} height={36} rx={6} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Lata redonda de película (vista de frente, un poco inclinada). texto en la etiqueta.
function Lata({ x, y, r = 210, abre = 0, texto = 'NITRATE FILM', frio = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={26} rx={r} ry={r * 0.36} fill={PLATA2} stroke={KC.ink} strokeWidth={7} />
    <rect x={-r} y={-10} width={r * 2} height={36} fill={PLATA2} />
    <line x1={-r} y1={-10} x2={-r} y2={26} stroke={KC.ink} strokeWidth={7} /><line x1={r} y1={-10} x2={r} y2={26} stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(${abre * 70} ${-abre * 200}) rotate(${abre * 14})`}>
      <ellipse cx={0} cy={-10} rx={r} ry={r * 0.36} fill={PLATA} stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={0} cy={-10} rx={r * 0.8} ry={r * 0.27} fill="none" stroke={PLATA2} strokeWidth={5} />
      <rect x={-r * 0.55} y={-38} width={r * 1.1} height={56} rx={6} fill="#f4ead2" stroke={KC.ink} strokeWidth={4} transform="skewX(-8)" />
      <text x={0} y={2} textAnchor="middle" style={{ font:`400 ${r * 0.2}px ${KF.titulo}` }} fill={ROJO}>{texto}</text>
      {frio > 0 && Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-r * 0.9 + i * r * 0.2} cy={-10 - r * 0.3 * Math.sin((i / 9) * Math.PI)} r={6} fill="#e8f6ff" opacity={frio} />)}
    </g>
  </g>;
}

// Algodón: mota esponjosa (fibras cortas, "linters")
function Algodon({ x, y, s = 1 }) {
  const g = krng(9);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 44} cy={Math.sin(a) * 34} r={34 + g() * 10} fill="#fff" stroke="#c8c1b4" strokeWidth={3} />; })}
    <circle r={46} fill="#fff" />
    {Array.from({ length: 14 }, (_, i) => { const a = g() * 6.28, d = 60 + g() * 20; return <path key={'f' + i} d={`M ${Math.cos(a) * d * 0.7} ${Math.sin(a) * d * 0.6} q ${g() * 20 - 10} ${g() * 20 - 10} ${Math.cos(a) * 26} ${Math.sin(a) * 22}`} stroke="#d8d1c4" strokeWidth={3} fill="none" />; })}
  </g>;
}

// Vaso de precipitado con la mezcla de ácidos
function VasoAcido({ T, x, y, burbujas = 0, color = 'rgba(255,236,150,.75)' }) {
  const g = krng(3);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -210 -250 L 210 -250 L 200 220 Q 200 250 170 250 L -170 250 Q -200 250 -200 220 Z" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -204 -90 L 204 -90 L 200 220 Q 200 246 170 246 L -170 246 Q -200 246 -200 220 Z" fill={color} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={150} y1={-40 + i * 60} x2={196} y2={-40 + i * 60} stroke={KC.ink} strokeWidth={5} />)}
    {burbujas > 0 && Array.from({ length: 14 }, (_, i) => { const ph = (T * 0.9 + g()) % 1, bx = (g() - 0.5) * 330; return <circle key={i} cx={bx} cy={230 - ph * 300} r={6 + g() * 10} fill="none" stroke="#fff" strokeWidth={4} opacity={burbujas * (1 - ph)} />; })}
  </g>;
}

// Unidad de glucosa (anillo de 6 con su O) + 3 sustituyentes. nitro 0..1 por sustituyente → –OH se vuelve –ONO₂.
// En la celulosa cada glucosa va volteada respecto a la anterior (k impar → espejo vertical).
function Anillo({ x, y, nitros = [0, 0, 0], brillaO = 0, T = 0, k = 0 }) {
  const vol = k % 2 ? -1 : 1, R = 46;
  const pts = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a) * R, Math.sin(a) * R * vol]; });
  const sus = [[0, -1, 0], [-0.55, 1, 4], [0.55, 1, 2]]; // dirección (x, y) y vértice
  return <g transform={`translate(${x} ${y + Math.sin(T * 2 + k) * 4})`}>
    <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="rgba(255,255,255,.06)" stroke={KC.texto} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={pts[1][0]} cy={pts[1][1]} r={11} fill={KC.red} stroke={KC.ink} strokeWidth={2} />
    {sus.map(([dx, dy0, v], i) => {
      const dy = dy0 * vol, n = nitros[i], px = pts[v][0], py = pts[v][1], ex = px + dx * 40, ey = py + dy * 46, ty = ey + (dy < 0 ? -12 : 34);
      return <g key={i}>
        <line x1={px} y1={py} x2={ex} y2={ey} stroke={KC.texto} strokeWidth={5} />
        {n < 0.5
          ? <text x={ex} y={ty} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#cfd6e4" opacity={1 - n * 2}>OH</text>
          : <g opacity={(n - 0.5) * 2}>
              <circle cx={ex} cy={ty - 10} r={30} fill={KC.orange} opacity={0.15 + 0.3 * brillaO * (0.6 + 0.4 * Math.sin(T * 6 + i + k))} />
              <text x={ex} y={ty} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.orange}>ONO₂</text>
            </g>}
      </g>;
    })}
  </g>;
}
// Cadena de celulosa: n anillos unidos por puentes de oxígeno. nitro(i, j) → 0..1. rompe(i) → separa el puente i.
function Cadena({ T, x0 = 110, y = 860, n = 5, paso = 215, nitro = () => 0, brillaO = 0, rompe = () => 0 }) {
  return <g>
    {Array.from({ length: n - 1 }, (_, i) => { const r = rompe(i), xa = x0 + i * paso + 46, xb = x0 + (i + 1) * paso - 46, xm = (xa + xb) / 2;
      return <g key={'p' + i}>
        <line x1={xa} y1={y} x2={xm - 10 - r * 26} y2={y + 14} stroke={KC.texto} strokeWidth={6} />
        <line x1={xm + 10 + r * 26} y1={y + 14} x2={xb} y2={y} stroke={KC.texto} strokeWidth={6} />
        <circle cx={xm} cy={y + 14} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={2} opacity={1 - r} />
        {r > 0.05 && <path d={`M ${xm - 22} ${y - 10} l 10 12 l -8 8 l 12 14`} stroke={KC.yellow} strokeWidth={5} fill="none" opacity={r} />}
      </g>; })}
    {Array.from({ length: n }, (_, i) => <Anillo key={i} T={T} k={i} x={x0 + i * paso} y={y} nitros={[nitro(i, 0), nitro(i, 1), nitro(i, 2)]} brillaO={brillaO} />)}
  </g>;
}

// Frasco tapado (sin aire) con una tira encendida adentro
function Frasco({ T, x, y, arde = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-330} width={300} height={56} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 -276 L 130 -276 L 130 -240 Q 190 -220 190 -150 L 190 230 Q 190 280 140 280 L -140 280 Q -190 280 -190 230 L -190 -150 Q -190 -220 -130 -240 Z" fill="rgba(170,220,255,.18)" stroke={KC.texto} strokeWidth={8} />
    <path d="M -150 -120 L -150 200" stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".35" />
    <rect x={-22} y={-40} width={44} height={300} rx={4} fill={mixHex('#d9b77a', '#3a2414', kprog(arde, 0, 1) * 0.6)} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-16} y={-20 + i * 46} width={8} height={10} fill={KC.ink} />)}
    {arde > 0 && <g opacity={arde}><Flama T={T} x={0} y={-36} s={0.9} seed={2} /><Humo T={T} x={0} y={-150} desde={0} n={4} color="rgba(200,190,170,.25)" /></g>}
  </g>;
}

// Termómetro con escala 0..160 °C
function TermoAlto({ x, y, temp, marcas = [] }) {
  const H = 640, h = (t) => klerp(30, H, kclamp(t / 160, 0, 1));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-40} y={-H - 40} width={80} height={H + 80} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={60} r={66} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={40 - h(temp)} width={40} height={h(temp) + 20} rx={20} fill={KC.red} />
    {[0, 40, 80, 120, 160].map((t) => <g key={t}><line x1={40} y1={40 - h(t)} x2={64} y2={40 - h(t)} stroke={KC.ink} strokeWidth={5} /><text x={72} y={40 - h(t) + 10} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{t}°</text></g>)}
    {marcas.map(([t, o, col], i) => <g key={'m' + i} opacity={o}><line x1={-70} y1={40 - h(t)} x2={-40} y2={40 - h(t)} stroke={col} strokeWidth={10} strokeLinecap="round" /></g>)}
  </g>;
}

// Edificio esquemático con su bóveda de latas (corte)
function Cineteca({ T, x, y, fuego = 0 }) {
  const latas = []; for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) latas.push([c, f]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-440} y={-260} width={880} height={500} rx={10} fill="#e7dfcf" stroke={KC.ink} strokeWidth={9} />
    <rect x={-440} y={-330} width={880} height={76} fill="#3b3f4a" stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-278} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.texto} letterSpacing="4">CINETECA NACIONAL</text>
    <rect x={-400} y={-220} width={800} height={420} fill="#2a2f3a" stroke={KC.ink} strokeWidth={6} />
    <text x={-380} y={-186} style={{ font:`700 24px ${KF.mono}` }} fill="#aab3c2">BÓVEDA · NITRATO</text>
    {[0, 1, 2, 3].map((f) => <rect key={f} x={-390} y={-140 + f * 88 + 34} width={780} height={10} fill="#6b7180" />)}
    {latas.map(([c, f], i) => { const quema = kclamp(fuego * 7 - (5 - c) - f * 0.3, 0, 1);
      return <g key={i} transform={`translate(${-320 + c * 128} ${-140 + f * 88 + 14})`}>
        <ellipse cx={0} cy={0} rx={54} ry={20} fill={mixHex(PLATA, '#3a2414', quema)} stroke={KC.ink} strokeWidth={4} />
        <ellipse cx={0} cy={-6} rx={54} ry={20} fill={mixHex(PLATA, '#2a1a0e', quema)} stroke={KC.ink} strokeWidth={4} />
        {quema > 0.3 && <Flama T={T} x={0} y={-8} s={0.45 * quema} seed={i} />}
      </g>; })}
  </g>;
}

// Moviola esquemática: mesa con dos platos que giran y una pantallita
function Moviola({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={20} width={600} height={60} rx={10} fill="#3b3f4a" stroke={KC.ink} strokeWidth={7} />
    {[-1, 1].map((k) => <line key={k} x1={k * 240} y1={80} x2={k * 260} y2={260} stroke="#3b3f4a" strokeWidth={22} strokeLinecap="round" />)}
    {[-180, 180].map((cx, i) => <g key={i} transform={`translate(${cx} -10)`}><ellipse rx={130} ry={34} fill={PLATA2} stroke={KC.ink} strokeWidth={6} /><ellipse rx={92} ry={24} fill="#c9954f" stroke={KC.ink} strokeWidth={3} />
      <line x1={0} y1={0} x2={Math.cos(T * 4 + i) * 90} y2={Math.sin(T * 4 + i) * 22} stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-70} y={-170} width={140} height={110} rx={10} fill="#26303f" stroke={KC.ink} strokeWidth={6} />
    <rect x={-56} y={-156} width={112} height={82} rx={4} fill="#f3e2bd" />
    <Jinete x={0} y={-112} s={0.55} fase={T * 9} />
    <rect x={-14} y={-60} width={28} height={70} fill="#3b3f4a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Cartel de la película
function Cartel({ x, y, rot = 3 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-170} y={-230} width={340} height={460} rx={8} fill="#f4ead2" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-210} width={300} height={250} fill={SEPIA} stroke={KC.ink} strokeWidth={4} />
    <Jinete x={-50} y={-60} s={1.1} fase={1} color="#3a2414" />
    <Jinete x={70} y={-40} s={0.8} fase={2.5} color="#3a2414" />
    <text x={0} y={100} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>MEMORIAS</text>
    <text x={0} y={150} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>DE UN MEXICANO</text>
    <text x={0} y={200} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={ROJO}>1950</text>
  </g>;
}

// Ciclo: gas → daño → más gas (flechas que giran)
function Ciclo({ T, x, y, p = 1 }) {
  const R = 170, nodos = [['gas NO₂', -90], ['se rompe', 30], ['más gas', 150]];
  return <g transform={`translate(${x} ${y})`} opacity={p}>
    <g transform={`rotate(${T * 60})`}>
      {[0, 120, 240].map((a) => <path key={a} transform={`rotate(${a})`} d={`M ${R} 0 A ${R} ${R} 0 0 1 ${Math.cos(1.4) * R} ${Math.sin(1.4) * R}`} stroke={NO2} strokeWidth={14} fill="none" strokeLinecap="round" />)}
      {[0, 120, 240].map((a) => <path key={'p' + a} transform={`rotate(${a + 80})`} d={`M ${R - 26} -6 L ${R} 22 L ${R + 26} -6 Z`} fill={NO2} />)}
    </g>
    {nodos.map(([t, a], i) => { const r = (a * Math.PI) / 180; return <g key={i} transform={`translate(${Math.cos(r) * R} ${Math.sin(r) * R})`}>
      <rect x={-104} y={-34} width={208} height={64} rx={32} fill={KC.dark} stroke={NO2} strokeWidth={5} />
      <text x={0} y={10} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.texto}>{t}</text>
    </g>; })}
  </g>;
}

// Burbujas de gas NO₂ que salen de la cadena
function GasNO2({ T, x0, x1, y, desde, n = 14 }) {
  if (T < desde) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const g = krng(i + 17), u = ((T - desde) * 0.5 + g()) % 1, bx = klerp(x0, x1, g());
    return <g key={i} opacity={(1 - u) * kprog(T, desde, desde + 0.4)} transform={`translate(${bx + Math.sin(u * 8 + i) * 20} ${y - u * 330})`}>
      <circle r={30} fill={NO2} opacity=".75" stroke={KC.ink} strokeWidth={2} />
      <text y={8} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">NO₂</text>
    </g>; })}</g>;
}

function PeliculaNitrato() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Villa, N: CUES.Nitrato, R: CUES.Receta, M: CUES.Molecula, P: CUES.Prima, O: CUES.Oxigeno, Q: CUES.Pregunta, Ga: CUES.Gases, C: CUES.Calor, E: CUES.Estudio, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: la tira se desenrolla desde el cuadro 0
  const desenrolla = kprog(T, K.G, K.G + 0.9, kEase.sale);
  const nitroM = (i, j) => kprog(T, K.M + 0.5 + i * 0.35 + j * 0.12, K.M + 0.8 + i * 0.35 + j * 0.12);
  const temp = T < K.C + 2.8 ? klerp(20, 150, kprog(T, K.C + 0.4, K.C + 2.2, kEase.suave)) : klerp(150, 50, kprog(T, K.C + 2.8, K.C + 3.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un rollo de la Revolución que se desenrolla */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <PapelPicado T={T} />
        {svg(<>
          <Tira T={T} x={300} y={820} largo={900 * desenrolla} rot={16} corre={-T * 220} alto={170} />
          <Rollo x={300} y={760} r={250} rot={T * 220} lleno={0.95 - desenrolla * 0.08} />
          {/* lupa sutil sobre la fibra: ¿de qué está hecha? */}
          <g opacity={kprog(T, K.G + 2.4, K.G + 3.0)}><Algodon x={880} y={1100} s={0.7} /></g>
        </>)}
      </Escena>
      {/* 2 · Villa firma con una empresa de cine estadounidense para que filme sus batallas */}
      <Escena T={T} a={K.V} b={K.N}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Contrato x={300} y={900} firma={kprog(T, K.V + 0.6, K.V + 2.0, kEase.suave)} />
          {T < K.V + 2.3 && (() => { const u = kprog(T, K.V + 0.6, K.V + 2.0); return <Pluma x={150 + u * 300} y={1080 - Math.sin(u * 20) * 20} />; })()}
          <g opacity={kprog(T, K.V + 2.2, K.V + 2.8)}>
            <CamaraManivela T={T} x={790} y={800} s={0.78} gira={kprog(T, K.V + 2.6, K.V + 3.0)} />
            {[0, 1, 2].map((i) => <Jinete key={i} x={((T - K.V) * 160 + i * 230) % 900 + 100} y={1110 + i * 14} s={1.1} fase={T * 10 + i} />)}
          </g>
        </>)}
      </Escena>
      {/* 3 · el cine de entonces se grababa en nitrato */}
      <Escena T={T} a={K.N} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Lata x={540} y={960} r={300} abre={kprog(T, K.N + 0.4, K.N + 1.2, kEase.sale)} />
          <g opacity={kprog(T, K.N + 0.9, K.N + 1.4)}><Tira T={T} x={300} y={1000} largo={600} corre={-T * 180} alto={130} /></g>
        </>)}
      </Escena>
      {/* 4 · la receta: fibras de algodón en ácido nítrico y sulfúrico */}
      <Escena T={T} a={K.R} b={K.M}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <VasoAcido T={T} x={540} y={960} burbujas={kprog(T, K.R + 1.2, K.R + 1.8)} />
          {(() => { const u = kprog(T, K.R + 0.2, K.R + 1.2, (p) => p * p); return <g opacity={1 - kprog(T, K.R + 1.3, K.R + 2.0)}><Algodon x={540} y={klerp(560, 980, u)} s={1.1} /></g>; })()}
          <g opacity={kprog(T, K.R + 2.2, K.R + 2.8)}>
            <rect x={380} y={klerp(900, 760, kprog(T, K.R + 2.2, K.R + 3.4, kEase.sale))} width={320} height={190} rx={10} fill="rgba(240,220,170,.75)" stroke={KC.ink} strokeWidth={5} transform="rotate(-6 540 850)" />
          </g>
        </>)}
      </Escena>
      {/* 5 · por dentro: el ácido pega grupos nitrato a la cadena de celulosa (oscuro: escala molecular) */}
      <Escena T={T} a={K.M} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(255,190,120,.2)" />
        {svg(<Cadena T={T} y={900} nitro={nitroM} />)}
      </Escena>
      {/* 6 · prima del algodón pólvora, con menos nitrógeno */}
      <Escena T={T} a={K.P} b={K.O}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g transform="translate(290 860)"><Tira T={T} x={-170} y={0} largo={340} rot={-90} corre={-T * 60} alto={150} /></g>
          <text x={290} y={1130} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>película</text>
          <Algodon x={790} y={850} s={1.25} />
          {(() => { const u = (T * 1.4) % 1; return <path d={`M 700 760 l 30 -40 l 10 30 l 30 -50`} stroke={KC.red} strokeWidth={8} fill="none" opacity={kprog(T, K.P + 1.4, K.P + 1.8) * (0.5 + 0.5 * Math.sin(T * 12))} />; })()}
          <text x={790} y={1130} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>algodón pólvora</text>
        </>)}
      </Escena>
      {/* 7 · trae su propio oxígeno: arde en un frasco tapado */}
      <Escena T={T} a={K.O} b={K.Q} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} color="rgba(255,170,90,.18)" />
        {svg(<>
          <Frasco T={T} x={540} y={960} arde={kprog(T, K.O + 0.3, K.O + 0.7)} />
          {/* el aire de afuera rebota en la tapa */}
          {[0, 1, 2].map((i) => { const u = ((T - K.O) * 0.8 + i / 3) % 1; return <g key={i} opacity={kprog(T, K.O + 1.0, K.O + 1.4) * (1 - u)}>
            <text x={250 + i * 290} y={klerp(470, 590, u < 0.5 ? u * 2 : 2 - u * 2)} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#9fd8ff">O₂</text></g>; })}
          <g opacity={kprog(T, K.O + 1.0, K.O + 1.4)}><line x1={180} y1={610} x2={900} y2={610} stroke={KC.red} strokeWidth={6} strokeDasharray="18 14" /></g>
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿se puede prender sola? */}
      <Escena T={T} a={K.Q} b={K.Ga} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={270} y={1120} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 900)`}>?</text>
          <g transform={`translate(300 1190) rotate(${-20 + Math.sin(T * 2) * 4})`}>
            <rect x={-8} y={-10} width={16} height={180} rx={5} fill="#e9c88f" stroke={KC.ink} strokeWidth={4} />
            <ellipse cx={0} cy={-18} rx={16} ry={22} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>
        </>)}
      </Escena>
      {/* 9 · al envejecer suelta gases que la deshacen cada vez más rápido */}
      <Escena T={T} a={K.Ga} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <GasNO2 T={T} x0={120} x1={960} y={700} desde={K.Ga + 0.3} n={10} />
          <Cadena T={T} y={700} nitro={() => 1} rompe={(i) => kprog(T, K.Ga + 1.0 + [1.6, 0.4, 2.4, 1.0][i] * 0.6, K.Ga + 1.4 + [1.6, 0.4, 2.4, 1.0][i] * 0.6)} />
          <Ciclo T={T} x={540} y={1060} p={kprog(T, K.Ga + 1.6, K.Ga + 2.2)} />
        </>)}
      </Escena>
      {/* 10 · se prende sola: nueva a 150 °C; muy descompuesta, con 50 °C o menos */}
      <Escena T={T} a={K.C} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <TermoAlto x={860} y={1130} temp={temp} marcas={[[150, kprog(T, K.C + 2.0, K.C + 2.3), KC.orange], [50, kprog(T, K.C + 3.4, K.C + 3.7), NO2]]} />
          <Rollo x={470} y={700} r={150} rot={T * 30} />
          {T > K.C + 2.2 && <Flama T={T} x={470} y={560} s={kprog(T, K.C + 2.2, K.C + 2.6) * 0.9} seed={1} />}
          <Rollo x={470} y={1060} r={150} rot={0} polvo={1} />
          <Humo T={T} x={470} y={950} desde={K.C + 0.6} n={5} />
          {T > K.C + 3.8 && <Flama T={T} x={470} y={920} s={kprog(T, K.C + 3.8, K.C + 4.2) * 0.9} seed={4} />}
        </>)}
      </Escena>
      {/* 11 · el estudio: el incendio de la Cineteca Nacional, 1982 */}
      <Escena T={T} a={K.E} b={K.D}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Cineteca T={T} x={540} y={1000} fuego={kprog(T, K.E + 2.0, K.E + 5.5)} />
          <Humo T={T} x={760} y={760} desde={K.E + 2.6} n={6} />
          <Humo T={T} x={380} y={760} desde={K.E + 4.0} n={5} />
        </>)}
      </Escena>
      {/* 12 · mucho cine de la Revolución sí sobrevivió: Toscano y «Memorias de un mexicano» (1950) */}
      <Escena T={T} a={K.D} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <PapelPicado T={T} />
        {svg(<>
          <g opacity={1 - kprog(T, K.D + 3.6, K.D + 4.2)}>
            {[0, 1, 2].map((i) => <Lata key={i} x={250 + i * 290} y={klerp(1150, 980, kprog(T, K.D + i * 0.3, K.D + 0.6 + i * 0.3, kEase.rebote))} r={130} texto="TOSCANO" frio={0.8} />)}
            {[0, 1].map((i) => <Lata key={'b' + i} x={395 + i * 290} y={klerp(900, 760, kprog(T, K.D + 1.0 + i * 0.3, K.D + 1.6 + i * 0.3, kEase.rebote))} r={130} texto="TOSCANO" frio={0.8} />)}
          </g>
          <g opacity={kprog(T, K.D + 3.6, K.D + 4.2)}>
            <Moviola T={T} x={330} y={1020} />
            <Cartel x={800} y={900} />
          </g>
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo rollo del inicio, ahora guardado en frío; por dentro, nitrato de celulosa */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <PapelPicado T={T} />
        {svg(<>
          <Tira T={T} x={300} y={820} largo={900 * (1 - kprog(T, K.Ci + 0.6, K.Ci + 1.6, kEase.suave) * 0.7)} rot={16} corre={-T * 60} alto={170} />
          <Rollo x={300} y={760} r={250} rot={T * 40} />
          {Array.from({ length: 12 }, (_, i) => { const g = krng(i + 90); return <path key={i} transform={`translate(${g() * 1000 + 40} ${520 + g() * 700}) scale(${0.6 + g() * 0.6})`} d="M 0 -18 L 0 18 M -16 -9 L 16 9 M -16 9 L 16 -9" stroke="#e8f6ff" strokeWidth={4} strokeLinecap="round" opacity={kprog(T, K.Ci + 1.4, K.Ci + 2.0) * (0.5 + 0.5 * Math.sin(T * 3 + i))} />; })}
        </>)}
        <Lupa T={T} at={K.Ci + 1.2} until={K.Ou - 0.2} x={800} y={1530} r={190} fx={300} fy={760} tinte={KC.orange} etiqueta="POR DENTRO · nitrato de celulosa"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={KC.noche} /><g transform={`translate(${r} ${r}) scale(.5) translate(-540 -900)`}><Cadena T={Tl} y={900} nitro={() => 1} brillaO={1} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.G + 0.3, titulo: 'El rollo' }, { at: K.R, titulo: 'La receta' }, { at: K.M, titulo: 'La molécula' }, { at: K.O, titulo: 'El fuego' }, { at: K.D, titulo: 'Lo que quedó' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.V - 0.2} texto="Especial Revolución Mexicana" x={540} y={1500} tam={40} borde={VERDE} />
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.8} until={K.G + 2.6} texto="¿solo cine?" x={300} y={500} tam={50} />
      <Chip T={T} at={K.G + 2.6} until={K.V - 0.3} texto="algodón + ácido nítrico" x={330} y={500} tam={42} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.V + 0.2} until={K.V + 2.4} anio="1914" quien="Pancho Villa firma" revista="con la Mutual Film (EE. UU.)" x={720} y={560} />
      <Chip T={T} at={K.V + 2.8} until={K.N - 0.3} texto="filmar sus batallas" x={540} y={1520} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.N + 0.6} until={K.R - 0.3} x={120} y={1460} texto="nitrato de celulosa" tam={40} color={KC.ink} />
      <Etq T={T} at={K.R + 0.3} until={K.R + 1.4} x={640} y={560} texto="fibras de algodón" tam={32} color={KC.ink} />
      <Chip T={T} at={K.R + 1.0} until={K.M - 0.3} texto="HNO₃ + H₂SO₄" x={540} y={1500} tam={44} borde={KC.ink} mono />
      <Etq T={T} at={K.R + 1.2} until={K.M - 0.3} x={120} y={1590} texto="ácido nítrico + ácido sulfúrico" tam={30} color={KC.ink} />
      {T > K.M - 0.3 && T < K.P + 0.2 && <Escala T={T} z={1} pxPorMm={3.4e8} x={60} y={1440} />}
      <Etq T={T} at={K.M + 0.3} until={K.P - 0.3} x={80} y={560} texto="celulosa = cadena de glucosas" tam={30} />
      <Chip T={T} at={K.M + 1.8} until={K.P - 0.3} texto="–OH → –ONO₂ (nitrato)" x={540} y={1560} tam={40} borde={KC.orange} />
      <Medidor T={T} at={K.P + 0.6} until={K.O - 0.3} y={1440} ancho={900} etiqueta="película de nitrato" valor={(t) => (12 / 14) * kprog(t, K.P + 0.7, K.P + 1.5)} texto={() => '≈ 12 % N'} color={KC.yellow} />
      <Medidor T={T} at={K.P + 1.2} until={K.O - 0.3} y={1560} ancho={900} etiqueta="algodón pólvora" valor={(t) => (13.4 / 14) * kprog(t, K.P + 1.3, K.P + 2.1)} texto={() => '> 13 % N'} color={KC.red} />
      <Chip T={T} at={K.P + 2.4} until={K.O - 0.3} texto="primas, no gemelas" x={540} y={520} tam={46} borde={KC.yellow} />
      <Etq T={T} at={K.O + 1.2} until={K.Q - 0.3} x={280} y={680} texto="tapado: sin aire" tam={32} color="#9fd8ff" />
      <Chip T={T} at={K.O + 1.8} until={K.Q - 0.3} texto="el oxígeno ya viene adentro" x={540} y={1520} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Ga + 2.4} until={K.C - 0.3} texto="círculo vicioso" x={540} y={1540} tam={48} borde={NO2} />
      <Etq T={T} at={K.C + 0.8} until={K.E - 0.3} x={640} y={700} lado="izq" texto="nueva" tam={34} color={KC.ink} />
      <Chip T={T} at={K.C + 2.2} until={K.E - 0.3} texto="150 °C" x={250} y={560} tam={48} borde={KC.orange} />
      <Etq T={T} at={K.C + 2.9} until={K.E - 0.3} x={640} y={1060} lado="izq" texto="muy descompuesta" tam={34} color={KC.ink} />
      <Chip T={T} at={K.C + 3.6} until={K.E - 0.3} texto="50 °C o menos" x={540} y={1540} tam={48} borde={NO2} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="1982" quien="Cineteca Nacional · CDMX" revista="24 de marzo" x={540} y={560} />
      <NumeroGigante T={T} at={K.E + 3.8} until={K.D - 0.3} valor={6000} prefijo="+" etiqueta="películas perdidas" x={540} y={540} tam={190} color={KC.red} />
      <Chip T={T} at={K.E + 4.6} until={K.D - 0.3} texto="cifra oficial: 6,506" x={540} y={1540} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.D + 1.6} until={K.D + 3.6} x={80} y={1460} texto="acervo de Salvador Toscano" tam={34} color={KC.ink} />
      <Chip T={T} at={K.D + 4.4} until={K.Ci - 0.3} texto="de Carmen Toscano, su hija" x={540} y={1540} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 2.4} until={K.Ou} texto="no es solo cine: es química" x={360} y={500} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Ci + 2.0} until={K.Ou - 0.2} x={80} y={1300} texto="guardar en frío" tam={32} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es solo cine: *es algodón con ácido nítrico.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.N - 0.1} texto="1914: Villa firma *para que filmen sus batallas.*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.R - 0.1} texto="Se grababa *en nitrato.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.M - 0.1} texto="Algodón en *ácido nítrico y sulfúrico.*" />
      <Subtitulo T={T} idx={4} at={K.M + 0.1} until={K.P - 0.1} texto="Grupos nitrato *en la celulosa.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.O - 0.1} texto="Prima del algodón pólvora, *con menos nitrógeno.*" />
      <Subtitulo T={T} idx={6} at={K.O + 0.1} until={K.Q - 0.1} texto="Trae su oxígeno: *arde sin aire.*" />
      <Subtitulo T={T} idx={7} at={K.Q + 0.1} until={K.Ga - 0.1} texto="¿Se puede *prender sola?*" />
      <Subtitulo T={T} idx={8} at={K.Ga + 0.1} until={K.C - 0.1} texto="Sus gases *la deshacen más rápido.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.E - 0.1} texto="Nueva: 150 °C. Muy descompuesta: *50 o menos.*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.D - 0.1} texto="1982: el fuego llegó *a las bóvedas de nitrato.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.Ci - 0.1} texto="Mucho cine de la Revolución *sí sobrevivió.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Algodón con ácido nítrico: *cuídalo del calor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Nitrato + 0.3, CUES.Receta + 1.0, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Molecula + 1.4, CUES.Prima + 2.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Oxigeno + 0.6, CUES.Pregunta - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Gases + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Calor + 0.4, CUES.Calor + 4.4, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 3.6, CUES.Dato - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Dato + 0.6, CUES.Dato + 3.8, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" serie="Festivo" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PeliculaNitratoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PeliculaNitrato /></CompositionStage></div>;
}
window.PeliculaNitratoApp = PeliculaNitratoApp;
