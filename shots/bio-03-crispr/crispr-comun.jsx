// Biotecnológico #03 · CRISPR lo inventaron las bacterias — dibujos compartidos (narrada y muda).
// Streptococcus thermophilus (cocos en cadena, bacteria del yogur), sus fagos (sifovirus: cola larga y flexible, no contráctil),
// el arreglo CRISPR (repeticiones iguales + espaciadores robados a cada virus) y las tijeras Cas.
// Dibujo esquemático: los fagos van agrandados respecto a la bacteria.

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const VIRUS = [KC.pink, KC.cyan, KC.yellow, KC.orange, KC.lilac];   // color de cada virus = color de su recuerdo
const REP = KC.gold2;                                                  // las repeticiones (todas iguales)
const COCO = '#9fe6b8';

// Vaso de yogur (frente). cuchara: 0..1 (entra y sale).
function Yogur({ T = 0, x = 540, y = 860, s = 1, cuchara = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${60} ${-260 + 180 * Math.sin(Math.PI * kclamp(cuchara, 0, 1))}) rotate(18)`}>
      <rect x={-14} y={-260} width={28} height={250} rx={12} fill="#cfd6dd" stroke={KC.ink} strokeWidth={7} /><ellipse cx={0} cy={10} rx={46} ry={62} fill="#cfd6dd" stroke={KC.ink} strokeWidth={7} />
    </g>
    <path d="M -220 -180 L 220 -180 L 180 220 Q 0 250 -180 220 Z" fill="#fff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={0} cy={-180} rx={220} ry={46} fill="#fffaf0" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-176} rx={196} ry={36} fill="#fff6e6" />
    <rect x={-190} y={-60} width={380} height={130} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 78px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke">YOGUR</text>
    {[[-120, -175], [40, -185], [130, -170], [-40, -168]].map(([a, b], i) => <circle key={i} cx={a + Math.sin(T * 2 + i) * 4} cy={b} r={7} fill="#ffe3ec" />)}
  </g>;
}

// Fago de S. thermophilus (sifovirus): cabeza de icosaedro y cola larga, flexible, con anillos.
// Origen = punta de la cola. inyecta: 0..1 (el ADN baja por la cola).
function FagoSifo({ T = 0, x = 0, y = 0, s = 1, rot = 0, color = KC.pink, seed = 1, inyecta = 0 }) {
  const curva = mece(T, seed, 0.5) * 10;
  const pts = Array.from({ length: 9 }, (_, i) => { const u = i / 8; return [Math.sin(u * 3 + T * 2 + seed) * curva * u * (1 - u) * 4, -u * 170]; });
  const d = pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((l) => <path key={l} d={`M 0 0 l ${l * 18} 10 M 0 0 l ${l * 8} 16`} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />)}
    <path d={d} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#e8eef6" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="4 6" />
    {inyecta > 0 && <path d={d} stroke={color} strokeWidth={5} fill="none" strokeDasharray={`${170 * kclamp(inyecta, 0, 1)} 400`} strokeDashoffset={-170 * (1 - kclamp(inyecta, 0, 1))} />}
    <g transform="translate(0 -205)">
      <path d="M 0 -44 L 38 -22 L 38 22 L 0 44 L -38 22 L -38 -22 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 0 -44 L 0 0 L 38 22 M 0 0 L -38 22" stroke={KC.ink} strokeWidth={3} opacity=".3" fill="none" />
      <path d="M -24 -24 L -8 -34" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity=".6" />
    </g>
  </g>;
}

// Cadena de cocos (S. thermophilus). (x, y) = centro de la cadena. revienta: { i, p } (célula i, progreso 0..1).
// arreglo: dibuja una tirita dorada (el CRISPR) dentro de cada célula, que brilla con "brillo".
function Cadena({ T = 0, x = 540, y = 820, n = 5, r = 80, rot = 0, revienta, brillo = 0, color = COCO }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, 3, 0.1) * 3})`}>
    {Array.from({ length: n }, (_, i) => {
      const cx = (i - (n - 1) / 2) * r * 1.8, cy = Math.sin(i * 1.3 + T * 0.8) * 10;
      const rv = revienta && revienta.i === i ? revienta.p : 0;
      if (rv > 0) return <Bacteria key={i} x={cx} y={cy} largo={r * 2} ancho={r * 2} reventar={rv} color={color} />;
      return <g key={i}>
        <circle cx={cx} cy={cy} r={r} fill={color} stroke={KC.ink} strokeWidth={7} />
        <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.3} ry={r * 0.16} fill="#fff" opacity=".35" />
        {brillo > 0 && <g opacity={brillo}><rect x={cx - r * 0.55} y={cy - 8} width={r * 1.1} height={16} rx={6} fill={REP} stroke={KC.ink} strokeWidth={3} />
          {[0, 1, 2].map((k) => <rect key={k} x={cx - r * 0.45 + k * r * 0.33} y={cy - 6} width={r * 0.18} height={12} fill={VIRUS[k]} />)}</g>}
      </g>;
    })}
  </g>;
}

// Arreglo CRISPR: líder + (repetición, espaciador)… de izquierda a derecha. espaciadores = [{ c, entra }]:
// entra = 0..1 (los nuevos entran junto al líder y empujan a los viejos). brilla(i) → 0..1 resalta un espaciador.
function Arreglo({ x = 540, y = 600, espaciadores = [], ancho = 70, alto = 60, brilla, galeria = 0, T = 0, etiqueta = true }) {
  const W = ancho, R = 30;
  let pos = 0; const items = [];
  espaciadores.forEach((e, i) => { const k = kEase.suave(kclamp(e.entra == null ? 1 : e.entra, 0, 1)); items.push({ ...e, k, x0: pos }); pos += (W + R) * k; });
  const total = 80 + pos + R;
  const x0 = x - total / 2;
  return <g>
    <rect x={x0} y={y - alto / 2} width={70} height={alto} rx={12} fill="#8a93a0" stroke={KC.ink} strokeWidth={6} />
    {etiqueta && <text x={x0 + 35} y={y + alto / 2 + 34} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#c9d0d8">líder</text>}
    <path d={`M ${x0 + 80} ${y - alto / 2 + 6} l ${R / 2} ${alto / 2 - 6} l ${-R / 2} ${alto / 2 - 6}`} fill={REP} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {items.map((e, i) => { const sx = x0 + 80 + R + e.x0, b = brilla ? brilla(i) : 0;
      return <g key={i} opacity={e.k}>
        {b > 0 && <rect x={sx - 10} y={y - alto / 2 - 10} width={W * e.k + 20} height={alto + 20} rx={16} fill={e.c} opacity={0.45 * b} />}
        <rect x={sx} y={y - alto / 2} width={W * e.k} height={alto} rx={10} fill={e.c} stroke={KC.ink} strokeWidth={6} />
        <path d={`M ${sx + W * e.k + 4} ${y - alto / 2 + 6} l ${R / 2} ${alto / 2 - 6} l ${-R / 2} ${alto / 2 - 6}`} fill={REP} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        {galeria > 0 && <g opacity={kclamp(galeria * espaciadores.length - i, 0, 1)} transform={`translate(${sx + W * e.k / 2} ${y - alto / 2 - 30})`}><FagoSifo T={T} s={0.32} color={e.c} seed={i} /></g>}
      </g>; })}
  </g>;
}

// Tijeras Cas (Cas9): proteína grande que lleva una guía de ARN del color del recuerdo. corta: 0..1 (cierra la "boca").
function Cas({ x = 0, y = 0, s = 1, guia = KC.pink, corta = 0, T = 0 }) {
  const a = klerp(34, 4, kclamp(corta, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 7, 0.3) * 4})`}>
    <path d={`M 0 0 L ${120 * Math.cos(a * Math.PI / 180)} ${-120 * Math.sin(a * Math.PI / 180)} A 120 120 0 1 0 ${120 * Math.cos(a * Math.PI / 180)} ${120 * Math.sin(a * Math.PI / 180)} Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={-30} cy={-50} rx={34} ry={18} fill="#fff" opacity=".35" />
    <path d="M -80 30 C -50 10, -20 50, 10 30 S 50 10, 70 26" stroke={guia} strokeWidth={10} fill="none" strokeLinecap="round" />
    <text x={-46} y={-4} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>Cas</text>
  </g>;
}

// ADN del virus (una hebra que ondula) con un tramo del color del virus en "en" (0..1 a lo largo). corte: 0..1 se separa.
function ADNVirus({ T = 0, x1 = 80, x2 = 1000, y = 1000, color = KC.pink, en = 0.55, corte = 0, largoTramo = 0.12 }) {
  const N = 40, sep = kEase.sale(kclamp(corte, 0, 1));
  const pt = (u) => { const xx = klerp(x1, x2, u), yy = y + Math.sin(u * 12 + T * 2) * 18; const off = u < en ? -sep * 60 : sep * 60; return [xx + off, yy + (u < en ? sep * 30 : -sep * 30)]; };
  const tramo = (a, b, col, w) => { const pts = Array.from({ length: N + 1 }, (_, i) => pt(klerp(a, b, i / N))); return <path d={pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" opacity={1 - sep * 0.6} />; };
  return <g>
    {tramo(0, en - 0.002, KC.ink, 18)}{tramo(en + 0.002, 1, KC.ink, 18)}
    {tramo(0, en - 0.002, '#e8eef6', 9)}{tramo(en + 0.002, 1, '#e8eef6', 9)}
    {tramo(en - largoTramo / 2, en - 0.002, color, 9)}{tramo(en + 0.002, en + largoTramo / 2, color, 9)}
  </g>;
}

Object.assign(window, { AVS, SOMBRA, VIRUS, REP, COCO, Yogur, FagoSifo, Cadena, Arreglo, Cas, ADNVirus });
