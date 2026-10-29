// Shot Festivo #16 · San Valentín · Fungi Mati: Sin levaduras no hay chocolate — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md (verificado: verificacion.md). El dibujo es esquemático (levaduras, bacterias, enzimas y piezas del sabor simplificadas).
const ROSA = '#ff4f9a', CHOCO = '#5a2f1b', CHOCO2 = '#7a4428', CHOCO3 = '#3a1d10', PULPA = '#fbf6ea', MAZ = '#f2a531', MAZ2 = '#d9781f';
const MORADO = '#6b2d6e', MORADO2 = '#8e4a8f', HOJA = '#2f9e44', HOJA2 = '#1f7a33', LEV = '#f6dca0', LEV2 = '#e3b866';
const CORAZON = 'M 0 150 C -270 -10 -210 -250 0 -110 C 210 -250 270 -10 0 150 Z';

// Corazoncitos que suben por el fondo
function Corazones({ T, n = 14, seed = 4, color = 'rgba(255,255,255,.5)' }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x0 = g() * KW, v = 40 + g() * 50, s = 0.08 + g() * 0.1, ph = g() * 2000;
    const y = KH + 100 - ((T * v + ph) % (KH + 200));
    return <path key={i} d={CORAZON} transform={`translate(${x0 + Math.sin(T + i) * 20} ${y}) scale(${s})`} fill={color} />; })}</g>;
}
// Bombón de chocolate (trufa con espiral)
function Bombon({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={58} rx={78} ry={14} fill="rgba(0,0,0,.25)" />
    <path d="M -80 30 C -86 -60 86 -60 80 30 C 76 62 -76 62 -80 30 Z" fill={CHOCO} stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -12 q 25 -22 50 0 t 50 0" stroke={CHOCO2} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M -58 10 q 29 -18 58 0 t 58 0" stroke={CHOCO2} strokeWidth={7} fill="none" strokeLinecap="round" opacity=".7" />
    <ellipse cx={-30} cy={-26} rx={18} ry={8} fill="#fff" opacity=".25" />
  </g>;
}
// Caja de chocolates en forma de corazón. abre 0..1 (la tapa se levanta)
function CajaCorazon({ x, y, s = 1, abre = 0, conBombon = [true, true, true] }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={CORAZON} transform="translate(0 30) scale(1.06)" fill="rgba(0,0,0,.25)" />
    <path d={CORAZON} fill="#b3122e" stroke={KC.ink} strokeWidth={9} />
    <path d={CORAZON} transform="scale(.82) translate(0 6)" fill="#3a0d14" />
    {[[-90, -40], [90, -40], [0, 50]].map(([bx, by], i) => conBombon[i] ? <Bombon key={i} x={bx} y={by} s={0.62} /> : <ellipse key={i} cx={bx} cy={by + 20} rx={52} ry={20} fill="#5a1a22" />)}
    <g transform={`translate(${-abre * 230} ${-abre * 260}) rotate(${-abre * 28})`} opacity={abre > 0.98 ? 0 : 1}>
      <path d={CORAZON} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
      <path d="M -40 -60 q 40 -40 80 0" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".45" />
      <path d={CORAZON} transform="scale(.3) translate(0 -40)" fill={KC.yellow} stroke={KC.ink} strokeWidth={14} />
    </g>
  </g>;
}
// Levadura (Saccharomyces esquemática): célula ovalada con yema, núcleo y vacuola. brote 0..1 · mono = moñito de San Valentín
function Levadura({ x, y, s = 1, rot = 0, brote = 0.5, T = 0, seed = 1, mono = false, color = LEV, cara = false, gris = 0 }) {
  const b = Math.sin(T * 3 + seed) * 3, c = gris ? mixHex(color, '#8a8f99', gris) : color;
  return <g transform={`translate(${x} ${y}) rotate(${rot + b}) scale(${s})`}>
    {brote > 0.05 && <ellipse cx={64 + 30 * brote} cy={-30 - 16 * brote} rx={32 * brote + 6} ry={26 * brote + 5} fill={c} stroke={KC.ink} strokeWidth={6} />}
    <ellipse cx={0} cy={0} rx={70} ry={56} fill={c} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-22} cy={-18} rx={20} ry={10} fill="#fff" opacity=".5" />
    <circle cx={18} cy={10} r={16} fill={LEV2} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={-20} cy={18} rx={18} ry={13} fill="#cfe9ff" opacity=".7" stroke={KC.ink} strokeWidth={2} />
    {cara && <g><circle cx={-24} cy={-4} r={6} fill={KC.ink} /><circle cx={12} cy={-6} r={6} fill={KC.ink} /><path d="M -18 14 q 12 12 24 0" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" /></g>}
    {mono && <g transform="translate(-10 -62) rotate(-12)">
      <path d="M 0 0 C -40 -34 -60 10 0 0 C 60 10 40 -34 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={0} r={9} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
// Mazorca de cacao entera (vertical, con surcos)
const MAZORCA = 'M 0 -330 C 175 -260 185 250 0 330 C -185 250 -175 -260 0 -330 Z';
function Mazorca({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={MAZORCA} fill={MAZ} stroke={KC.ink} strokeWidth={9} />
    {[-110, -60, 0, 60, 110].map((k, i) => <path key={i} d={`M 0 -320 C ${k * 1.5} -200 ${k * 1.5} 200 0 320`} stroke={MAZ2} strokeWidth={8} fill="none" opacity=".9" />)}
    <path d="M -70 -200 C -100 -80 -100 60 -70 160" stroke="#ffd67a" strokeWidth={14} fill="none" strokeLinecap="round" opacity=".6" />
    <rect x={-14} y={-380} width={28} height={60} rx={8} fill="#6b4226" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Media mazorca abierta: cáscara, pulpa blanca y semillas en hileras
function MitadMazorca({ x, y, s = 1, rot = 0, brilla = 0, T = 0 }) {
  const sem = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 2; c++) sem.push([(c - 0.5) * 92, -210 + r * 70]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={MAZORCA} fill={MAZ2} stroke={KC.ink} strokeWidth={9} />
    <path d={MAZORCA} transform="scale(.84)" fill={PULPA} stroke={KC.ink} strokeWidth={5} />
    {sem.map(([sx, sy], i) => <g key={i} transform={`translate(${sx} ${sy}) rotate(${(i % 2 ? 1 : -1) * 12})`}>
      <ellipse rx={42} ry={30} fill="#fff" stroke="#d8cbb2" strokeWidth={4} />
      <ellipse rx={30} ry={20} fill="#f0dfe6" opacity=".55" />
      <ellipse cx={-14} cy={-10} rx={12} ry={5} fill="#fff" />
    </g>)}
    {brilla > 0 && sem.map(([sx, sy], i) => { const o = brilla * Math.max(0, Math.sin(T * 5 + i * 1.7)); return <rect key={'b' + i} x={sx + 30} y={sy - 30} width={14} height={14} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={o} transform={`rotate(45 ${sx + 37} ${sy - 23})`} />; })}
  </g>;
}
// Machete que baja
function Machete({ x, y, ang }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <rect x={-20} y={-40} width={40} height={130} rx={12} fill="#6b4226" stroke={KC.ink} strokeWidth={6} />
    <path d="M -24 -40 L -40 -420 Q 10 -470 34 -420 L 24 -40 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -28 -100 L -38 -400" stroke="#fff" strokeWidth={6} opacity=".6" />
  </g>;
}
// Semilla de cacao (forma de almendra). corte = vista por dentro: cotiledón de color + germen
function Semilla({ x, y, s = 1, rot = 0, color = MORADO, pulpa = 0, corte = true, germen = 0, germenVivo = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {pulpa > 0 && <ellipse rx={140} ry={96} fill={PULPA} stroke="#d8cbb2" strokeWidth={5} opacity={pulpa} />}
    <path d="M -118 0 C -110 -80 110 -80 118 0 C 110 80 -110 80 -118 0 Z" fill={corte ? '#c9a27a' : '#b07a52'} stroke={KC.ink} strokeWidth={7} />
    {corte && <g>
      <path d="M -104 0 C -96 -66 96 -66 104 0 C 96 66 -96 66 -104 0 Z" fill={color} />
      {[-50, 0, 50].map((k) => <path key={k} d={`M ${k - 20} -46 q 20 46 0 92`} stroke="rgba(0,0,0,.25)" strokeWidth={5} fill="none" />)}
      {germen > 0 && <g opacity={germen}>
        <ellipse cx={-80} cy={0} rx={22} ry={13} fill={germenVivo > 0.5 ? '#9be36a' : '#8a8f99'} stroke={KC.ink} strokeWidth={4} />
        {germenVivo > 0.5 && <circle cx={-80} cy={0} r={34} fill="#9be36a" opacity={0.25 * germenVivo} />}
      </g>}
    </g>}
    {!corte && <path d="M -90 -10 C -40 -40 40 -40 90 -10" stroke="#e0b48c" strokeWidth={6} fill="none" opacity=".7" />}
  </g>;
}
// Hoja de plátano (larga, con nervadura central y venas paralelas)
function HojaPlatano({ x, y, rot = 0, s = 1, largo = 900 }) {
  const L = largo / 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${-L} 0 C ${-L * 0.6} -130 ${L * 0.6} -130 ${L} 0 C ${L * 0.6} 120 ${-L * 0.6} 120 ${-L} 0 Z`} fill={HOJA} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-L} 0 L ${L} 0`} stroke="#a6e07a" strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => { const px = -L * 0.85 + (i / 15) * L * 1.7; return <g key={i}><path d={`M ${px} 0 l 40 -80`} stroke={HOJA2} strokeWidth={4} /><path d={`M ${px} 0 l 40 76`} stroke={HOJA2} strokeWidth={4} /></g>; })}
  </g>;
}
// Montón de semillas con pulpa sobre hojas. cubre 0..1 (hojas que lo tapan) · vapor 0..1
function Monton({ T, x, y, s = 1, cubre = 0, vapor = 0, lleno = 1 }) {
  const g = krng(9), n = Math.round(34 * lleno);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <HojaPlatano x={-150} y={70} rot={-4} largo={700} />
    <HojaPlatano x={170} y={80} rot={5} largo={700} />
    {Array.from({ length: n }, (_, i) => { const row = Math.floor(Math.sqrt(i * 2)); const a = g() * Math.PI, rr = 330 * Math.sqrt(g());
      const px = Math.cos(a) * rr, py = 40 - Math.sin(a) * rr * 0.62;
      return <ellipse key={i} cx={px} cy={py} rx={40} ry={28} fill={PULPA} stroke="#cdbf9f" strokeWidth={4} transform={`rotate(${(g() - 0.5) * 60} ${px} ${py})`} />; })}
    {cubre > 0 && [[-200, -120, -28], [200, -120, 28], [0, -190, 0]].map(([hx, hy, hr], i) => { const u = kclamp(cubre * 3 - i, 0, 1);
      return <g key={i} opacity={u} transform={`translate(${(1 - u) * (i === 1 ? 500 : i === 0 ? -500 : 0)} ${(1 - u) * (i === 2 ? -400 : 0)})`}><HojaPlatano x={hx} y={hy} rot={hr} largo={620} /></g>; })}
    {vapor > 0 && [-160, -40, 80, 200].map((vx, i) => <path key={'v' + i} d={`M ${vx} -230 q 22 -36 0 -72 q -22 -36 0 -72`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * (0.35 + 0.3 * Math.sin(T * 3 + i))} transform={`translate(0 ${-((T * 40 + i * 25) % 50)})`} />)}
  </g>;
}
// Calendario de días
function Calendario({ T, x, y, dia }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-130} y={-120} width={260} height={240} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-130} y={-120} width={260} height={70} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-70} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff">DÍA</text>
    <text x={0} y={90} textAnchor="middle" style={{ font:`400 140px ${KF.titulo}` }} fill={KC.ink}>{dia}</text>
  </g>;
}
// Cubito de azúcar
function Cubo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <rect x={x - 14 * s} y={y - 14 * s} width={28 * s} height={28 * s} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity={o} transform={`rotate(${rot} ${x} ${y})`} />;
}
// Gotita con etiqueta (alcohol, ácidos)
function GotaQ({ x, y, s = 1, color = '#9fe0ff', o = 1 }) {
  return <path d="M 0 -26 Q 18 0 0 16 Q -18 0 0 -26 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={3} opacity={o} />;
}
// Termómetro 15..55 °C
function Termo({ x, y, temp }) {
  const h = klerp(30, 520, kclamp((temp - 15) / 40, 0, 1));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-40} y={-560} width={80} height={600} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={60} r={66} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={40 - h} width={40} height={h + 20} rx={20} fill={KC.red} />
    {[20, 30, 40, 50].map((t) => { const yy = 40 - klerp(30, 520, (t - 15) / 40); return <g key={t}><line x1={40} y1={yy} x2={70} y2={yy} stroke={KC.ink} strokeWidth={5} /><text x={80} y={yy + 12} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>{t}°</text></g>; })}
  </g>;
}
// Botellita de vinagre
function Vinagre({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-200} width={44} height={60} rx={8} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
    <path d="M -70 -140 L 70 -140 L 80 120 Q 0 150 -80 120 Z" fill="rgba(255,240,200,.85)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -74 -20 L 76 -20 L 80 120 Q 0 150 -80 120 Z" fill="#f2c46a" opacity=".85" />
    <rect x={-58} y={-100} width={116} height={60} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-58} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>VINAGRE</text>
  </g>;
}
// Collar de cuentas = proteína; corte 0..1 la separa en aminoácidos sueltos
const AMINO = [KC.mint, KC.yellow, KC.pink, KC.cyan, KC.orange, KC.lilac];
function Proteina({ T, cx, cy, n = 12, corte = 0, une = 0, paso = 64 }) {
  const g = krng(31);
  return <g>{Array.from({ length: n }, (_, i) => {
    const bx = cx + (i - (n - 1) / 2) * paso, by = cy + Math.sin(i * 0.9 + T * 1.2) * 26;
    const fx = bx + (g() - 0.5) * 260 * corte + Math.sin(T * 1.7 + i) * 18 * corte, fy = by + (g() - 0.5) * 300 * corte;
    const ux = klerp(fx, cx - 120 + (i % 4) * 80, une), uy = klerp(fy, cy + 260 + Math.floor(i / 4) * 70, une);
    const nx = i < n - 1 ? cx + (i + 1 - (n - 1) / 2) * paso : null, ny = i < n - 1 ? cy + Math.sin((i + 1) * 0.9 + T * 1.2) * 26 : null;
    return <g key={i}>
      {nx != null && corte < 0.05 && <line x1={bx} y1={by} x2={nx} y2={ny} stroke="#fff" strokeWidth={6} />}
      <circle cx={ux} cy={uy} r={24} fill={AMINO[i % 6]} stroke={KC.ink} strokeWidth={4} />
    </g>;
  })}</g>;
}
// Azúcar doble (sacarosa: hexágono + pentágono) que la enzima parte en dos
function AzucarDoble({ x, y, s = 1, parte = 0 }) {
  const hexa = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; return `${Math.cos(a) * 40},${Math.sin(a) * 40}`; }).join(' ');
  const penta = Array.from({ length: 5 }, (_, i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return `${Math.cos(a) * 34},${Math.sin(a) * 34}`; }).join(' ');
  const d = parte * 90;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {parte < 0.2 && <line x1={-12} y1={0} x2={22} y2={0} stroke="#fff" strokeWidth={7} />}
    <polygon points={hexa} transform={`translate(${-52 - d} 0)`} fill="rgba(255,255,255,.12)" stroke="#fff" strokeWidth={7} strokeLinejoin="round" />
    <polygon points={penta} transform={`translate(${50 + d} 0)`} fill="rgba(0,210,255,.12)" stroke={KC.cyan} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Tijeritas (la enzima que corta)
function Tijera({ x, y, s = 1, abre = 0, rot = 0 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * a})`}>
      <path d={`M 0 0 L 90 ${k * -8} L 96 ${k * 4} Z`} fill="#dfe4ec" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-40} cy={k * 24} r={22} fill="none" stroke={KC.orange} strokeWidth={10} />
    </g>)}
    <circle r={7} fill={KC.ink} />
  </g>;
}
// Comal con granos que se tuestan (dorado 0..1) y aroma que sube
function Comal({ T, x, y, dorado = 0, aroma = 0 }) {
  const g = krng(17);
  return <g transform={`translate(${x} ${y})`}>
    {[-120, -40, 40, 120].map((fx, i) => <path key={i} d={`M ${fx - 30} 150 Q ${fx} ${60 - 20 * Math.sin(T * 12 + i)} ${fx + 30} 150 Z`} fill={i % 2 ? KC.orange : KC.yellow} opacity={0.9} />)}
    <ellipse cx={0} cy={60} rx={330} ry={70} fill="#3b3f4a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={44} rx={300} ry={52} fill="#525866" />
    {Array.from({ length: 16 }, (_, i) => { const px = (g() - 0.5) * 480, py = 40 + (g() - 0.5) * 50; return <ellipse key={i} cx={px} cy={py} rx={34} ry={22} fill={mixHex('#9a6a4a', CHOCO3, dorado)} stroke={KC.ink} strokeWidth={4} transform={`rotate(${g() * 60 - 30} ${px} ${py})`} />; })}
    {aroma > 0 && [-180, -60, 60, 180].map((ax, i) => <path key={'a' + i} d={`M ${ax} -20 q 30 -50 0 -100 q -30 -50 0 -100 q 30 -50 0 -100`} stroke={CHOCO2} strokeWidth={12} fill="none" strokeLinecap="round" opacity={aroma * (0.5 + 0.3 * Math.sin(T * 3 + i))} transform={`translate(0 ${-((T * 50 + i * 30) % 60)})`} />)}
  </g>;
}
// Barra de chocolate (agria = carita ácida)
function Barra({ x, y, s = 1, agria = false, color = CHOCO }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-230} width={340} height={460} rx={24} fill={color} stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={r + '-' + c} x={-150 + c * 155} y={-210 + r * 145} width={145} height={130} rx={12} fill={mixHex(color, '#ffffff', 0.12)} stroke={KC.ink} strokeWidth={4} />))}
    <g transform="translate(0 -10)">
      <circle cx={-45} cy={-20} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={45} cy={-20} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      {agria ? <path d="M -50 50 q 25 -24 50 0 t 50 0" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" /> : <path d="M -50 30 q 50 50 100 0" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" />}
      {agria && <><path d="M -70 -50 l 40 14" stroke="#fff" strokeWidth={8} strokeLinecap="round" /><path d="M 70 -50 l -40 14" stroke="#fff" strokeWidth={8} strokeLinecap="round" /></>}
    </g>
  </g>;
}
// Atomizador del antifúngico
function Atomizador({ T, x, y, rocia = 0 }) {
  const g = krng(41);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-50} y={-40} width={100} height={170} rx={20} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <rect x={-24} y={-90} width={48} height={50} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-86} width={60} height={22} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={60} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>ANTI</text>
    <text x={0} y={88} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>HONGOS</text>
    {rocia > 0 && Array.from({ length: 18 }, (_, i) => { const u = (T * 1.5 + g()) % 1; return <circle key={i} cx={-90 - u * 220} cy={-76 + (g() - 0.5) * 140 * u + u * 60} r={6} fill="#bfefff" opacity={rocia * (1 - u)} />; })}
  </g>;
}
// Caja de fermentación (vista de lado, como cajón de madera) con microbios adentro
function Cajon({ T, x, y, levaduras = 1, tachadas = 0, etiqueta }) {
  const g = krng(5);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-210} y={-150} width={420} height={260} rx={14} fill="#c8935a" stroke={KC.ink} strokeWidth={8} />
    {[-80, 0, 80].map((k) => <line key={k} x1={-210} y1={k - 20} x2={210} y2={k - 20} stroke="#9b6a3a" strokeWidth={5} />)}
    <rect x={-190} y={-130} width={380} height={220} rx={10} fill={PULPA} opacity=".9" />
    {Array.from({ length: 4 }, (_, i) => <Levadura key={i} T={T} seed={i} x={-130 + i * 86} y={-60 + (i % 2) * 70} s={0.42} brote={0.5} gris={tachadas} />)}
    {tachadas > 0 && Array.from({ length: 4 }, (_, i) => { const lx = -130 + i * 86, ly = -60 + (i % 2) * 70, k = kclamp(tachadas * 4 - i, 0, 1) * 30;
      return <g key={'x' + i}><line x1={lx - k} y1={ly - k} x2={lx + k} y2={ly + k} stroke={KC.red} strokeWidth={9} strokeLinecap="round" /><line x1={lx + k} y1={ly - k} x2={lx - k} y2={ly + k} stroke={KC.red} strokeWidth={9} strokeLinecap="round" /></g>; })}
    {[0, 1, 2].map((i) => <Bacteria key={'b' + i} T={T} seed={i + 3} x={-120 + i * 120 + Math.sin(T * 2 + i) * 10} y={50} rot={10 * i} s={0.38} color={i % 2 ? KC.lilac : KC.mint} />)}
    {etiqueta && <text x={0} y={-180} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

function Chocolate() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mz: CUES.Mazorca, Am: CUES.Amarga, Mo: CUES.Monton, Le: CUES.Levadura, Al: CUES.Alcohol, Ba: CUES.Bacterias, Ca: CUES.Calor, P: CUES.Pregunta, Pi: CUES.Piezas, E: CUES.Estudio, R: CUES.Resultado, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const CORTE = K.Mz + 0.7;            // el machete abre la mazorca
  const salta = kprog(T, K.G + 0.35, K.G + 0.95, kEase.sale);
  const temp = klerp(26, 45, kprog(T, K.Ca + 0.3, K.Ca + 2.6, kEase.suave));
  const levs = Array.from({ length: 7 }, (_, i) => { const g = krng(i + 50); return { x: 160 + g() * 760, y: 520 + g() * 640, r: g() * 360, b: g() }; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la caja de corazón se abre, un bombón brinca y aparece una levadura con moñito */}
      <Escena T={T} a={K.G} b={K.Mz} zoom={0.06}>
        <FondoLunares color={ROSA} />
        {svg(<>
          <Corazones T={T} />
          <CajaCorazon x={380} y={1010} s={klerp(0.85, 1.05, kprog(T, K.G, K.G + 0.5, kEase.rebote))} abre={kprog(T, K.G + 0.1, K.G + 0.5, kEase.sale)} conBombon={[true, salta < 0.05, true]} />
          {salta > 0.05 && <Bombon x={klerp(380, 400, salta)} y={klerp(1060, 690, salta) + Math.abs(Math.sin((T - K.G) * 4)) * -16 * salta} s={klerp(0.65, 1.15, salta)} rot={Math.sin(T * 3) * 6} />}
          <g opacity={kprog(T, K.G + 1.8, K.G + 2.2)}><Levadura T={T} x={820} y={1020} s={klerp(0.3, 1.25, kprog(T, K.G + 1.8, K.G + 2.3, kEase.rebote))} brote={0.6} mono cara /></g>
        </>)}
      </Escena>
      {/* 2 · la mazorca se abre: semillas en pulpa blanca llena de azúcares */}
      <Escena T={T} a={K.Mz} b={K.Am}>
        <FondoLunares color={KC.yellow} />
        {svg((() => {
          const ab = kprog(T, CORTE, CORTE + 0.6, kEase.sale);
          const ang = T < CORTE ? klerp(-70, 0, kprog(T, K.Mz + 0.2, CORTE, (p) => p * p)) : klerp(0, 30, kprog(T, CORTE, CORTE + 0.5));
          return <>
            {ab < 0.5 ? <Mazorca x={640} y={930} s={1} rot={8} /> : <>
              <MitadMazorca T={T} x={klerp(640, 430, ab)} y={950} s={0.95} rot={klerp(8, -8, ab)} brilla={kprog(T, K.Mz + 2.4, K.Mz + 3.0)} />
              <MitadMazorca T={T} x={klerp(640, 850, ab)} y={960} s={0.95} rot={klerp(8, 10, ab)} brilla={kprog(T, K.Mz + 2.4, K.Mz + 3.0)} />
            </>}
            {T < CORTE + 0.9 && <g opacity={1 - kprog(T, CORTE + 0.4, CORTE + 0.9)}><Machete x={900} y={600} ang={ang} /></g>}
            {T > CORTE - 0.05 && T < CORTE + 0.35 && <rect x={0} y={0} width={KW} height={KH} fill="#fff" opacity={0.5 * (1 - kprog(T, CORTE, CORTE + 0.35))} />}
          </>;
        })())}
      </Escena>
      {/* 3 · recién sacadas: amargas y ásperas, no saben a chocolate */}
      <Escena T={T} a={K.Am} b={K.Mo}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Semilla x={290} y={980} s={klerp(0.6, 1.5, kprog(T, K.Am, K.Am + 0.6, kEase.rebote))} rot={-10} color={MORADO2} />
          <text x={560} y={1030} textAnchor="middle" style={{ font:`400 160px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Am + 1.4, K.Am + 1.8)}>≠</text>
          <g opacity={kprog(T, K.Am + 1.6, K.Am + 2.1)}><Bombon x={810} y={990} s={1.3} rot={Math.sin(T * 2) * 4} /></g>
        </>)}
      </Escena>
      {/* 4 · se apilan con su pulpa sobre hojas de plátano y se tapan: 2 a 10 días */}
      <Escena T={T} a={K.Mo} b={K.Le}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Monton T={T} x={540} y={1060} s={1.1} lleno={kprog(T, K.Mo + 0.2, K.Mo + 1.6)} cubre={kprog(T, K.Mo + 1.7, K.Mo + 2.8)} />
          {Array.from({ length: 10 }, (_, i) => { const at = K.Mo + 0.1 + i * 0.13, u = kprog(T, at, at + 0.5, (p) => p * p); return u > 0 && u < 1 ? <ellipse key={i} cx={380 + (i * 37) % 320} cy={klerp(380, 980, u)} rx={40} ry={28} fill={PULPA} stroke="#cdbf9f" strokeWidth={4} /> : null; })}
          <g opacity={kprog(T, K.Mo + 2.8, K.Mo + 3.1)}><Calendario T={T} x={540} y={600} dia={Math.round(klerp(2, 10, kprog(T, K.Mo + 3.0, K.Mo + 4.6)))} /></g>
        </>)}
      </Escena>
      {/* 5 · al microscopio: las levaduras (hongos de una célula) se comen el azúcar */}
      <Escena T={T} a={K.Le} b={K.Al} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(255,230,170,.18)" />
        {svg(<>
          {Array.from({ length: 22 }, (_, i) => { const g = krng(i + 80), cx = 120 + g() * 840, cy = 560 + g() * 600, comido = kprog(T, K.Le + 1.6 + g() * 2.4, K.Le + 2.4 + g() * 2.4);
            return <Cubo key={i} x={cx + Math.sin(T + i) * 8} y={cy} s={1.2 * (1 - comido)} rot={T * 30 + i * 20} o={1 - comido} />; })}
          {levs.map((l, i) => { const e = kprog(T, K.Le + 0.2 + i * 0.12, K.Le + 1.2 + i * 0.12, kEase.sale); const ox = l.x < 540 ? -500 : 500;
            return <Levadura key={i} T={T} seed={i} x={l.x + ox * (1 - e) + Math.sin(T * 1.3 + i) * 14} y={l.y + Math.cos(T * 1.1 + i) * 12} s={0.9} rot={l.r} brote={0.3 + 0.5 * kprog(T, K.Le + 2.5, K.Le + 4.6) * l.b} />; })}
        </>)}
      </Escena>
      {/* 6a · hacen alcohol (burbujas de CO2 y gotitas) */}
      <Escena T={T} a={K.Al} b={K.Al + 1.8} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          {levs.map((l, i) => <Levadura key={i} T={T} seed={i} x={l.x + Math.sin(T * 1.3 + i) * 14} y={l.y + Math.cos(T * 1.1 + i) * 12} s={0.9} rot={l.r} brote={0.6} />)}
          {levs.map((l, i) => Array.from({ length: 3 }, (_, k) => { const u = ((T - K.Al) * 0.9 + k * 0.33 + i * 0.1) % 1;
            return <circle key={i + '-' + k} cx={l.x + 40 + Math.sin(T * 4 + k) * 10} cy={l.y - 60 - u * 220} r={8 + 6 * u} fill="none" stroke="#cfe9ff" strokeWidth={4} opacity={(1 - u) * kprog(T, K.Al, K.Al + 0.3)} />; }))}
          {levs.map((l, i) => <GotaQ key={'g' + i} x={l.x - 70} y={l.y + 40 + kprog(T, K.Al + 0.3, K.Al + 1.4) * 60} s={1.2} o={kprog(T, K.Al + 0.2, K.Al + 0.5)} />)}
        </>)}
      </Escena>
      {/* 6b · la pulpa se vuelve líquida y escurre del montón */}
      <Escena T={T} a={K.Al + 1.8} b={K.Ba}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Monton T={T} x={540} y={980} s={1.1} cubre={1} />
          <Goteo T={T} x={300} y0={1110} y1={1200} cada={0.28} color="#f6efd8" desde={K.Al + 1.8} hasta={K.Ba + 0.4} r={13} />
          <Goteo T={T} x={560} y0={1120} y1={1200} cada={0.33} color="#f6efd8" desde={K.Al + 1.95} hasta={K.Ba + 0.4} r={13} />
          <Goteo T={T} x={800} y0={1110} y1={1200} cada={0.3} color="#f6efd8" desde={K.Al + 2.1} hasta={K.Ba + 0.4} r={13} />
        </>)}
      </Escena>
      {/* 7 · entran bacterias: lácticas (ácido láctico) y acéticas (alcohol → ácido acético, el del vinagre) */}
      <Escena T={T} a={K.Ba} b={K.Ca} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(120,255,200,.15)" />
        {svg(<>
          {levs.map((l, i) => <Levadura key={i} T={T} seed={i} x={l.x} y={l.y} s={0.7} rot={l.r} brote={0.6} gris={0.6} />)}
          {Array.from({ length: 6 }, (_, i) => { const e = kprog(T, K.Ba + 0.2 + i * 0.1, K.Ba + 1.0 + i * 0.1, kEase.sale), bx = 160 + i * 150, by = 640 + (i % 2) * 120;
            return <g key={'l' + i}><Bacteria T={T} seed={i} x={bx - (1 - e) * 900} y={by} rot={-10 + i * 7} s={0.9} color={KC.mint} />
              <GotaQ x={bx + 30} y={by + 70 + kprog(T, K.Ba + 1.2, K.Ba + 2.0) * 40} color={KC.mint} s={1} o={kprog(T, K.Ba + 1.1, K.Ba + 1.4)} /></g>; })}
          {Array.from({ length: 5 }, (_, i) => { const e = kprog(T, K.Ba + 2.2 + i * 0.1, K.Ba + 3.0 + i * 0.1, kEase.sale), bx = 200 + i * 160, by = 1030 + (i % 2) * 90;
            const traga = kprog(T, K.Ba + 3.0, K.Ba + 3.6);
            return <g key={'a' + i}><GotaQ x={bx - 90 + traga * 70} y={by - 10} color="#9fe0ff" s={1.1} o={1 - traga} />
              <Bacteria T={T} seed={i + 9} x={bx + (1 - e) * 900} y={by} rot={8 - i * 6} s={0.9} color={KC.lilac} />
              <GotaQ x={bx + 70} y={by + 60 + kprog(T, K.Ba + 3.6, K.Ba + 4.4) * 30} color={KC.yellow} s={1.1} o={kprog(T, K.Ba + 3.5, K.Ba + 3.8)} /></g>; })}
          <g opacity={kprog(T, K.Ba + 3.9, K.Ba + 4.3)}><Vinagre x={900} y={560} s={0.75} /></g>
        </>)}
      </Escena>
      {/* 8 · el montón se calienta (>40 °C); el ácido y el calor matan la semilla */}
      <Escena T={T} a={K.Ca} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg((() => {
          const vs = kprog(T, K.Ca + 2.3, K.Ca + 2.9, kEase.suave), muere = kprog(T, K.Ca + 3.6, K.Ca + 4.2);
          return <>
            <Termo x={160} y={1060} temp={temp} />
            <g opacity={1 - vs}><Monton T={T} x={640} y={1010} s={0.85} cubre={1} vapor={kprog(T, K.Ca + 0.6, K.Ca + 1.6)} /></g>
            <g opacity={vs}>
              <Semilla x={650} y={900} s={klerp(0.8, 2.0, vs)} rot={0} color={MORADO2} germen={1} germenVivo={1 - muere} />
              {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2, u = kprog(T, K.Ca + 2.7 + i * 0.05, K.Ca + 3.7 + i * 0.05);
                return <GotaQ key={i} x={650 + Math.cos(a) * klerp(360, 150, u)} y={900 + Math.sin(a) * klerp(260, 90, u)} color={KC.yellow} s={1.1} o={(u > 0 ? 1 : 0) * (1 - kprog(T, K.Ca + 3.9, K.Ca + 4.3))} />; })}
            </g>
          </>;
        })())}
      </Escena>
      {/* 9 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pi} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <text x={260} y={1080} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 880)`}>?</text>
          <Semilla x={300} y={1150} s={0.7} rot={-12} color={MORADO2} germen={1} germenVivo={0} />
        </>)}
      </Escena>
      {/* 10a · dentro de la semilla: enzimas cortan proteínas y azúcares → piezas del sabor */}
      <Escena T={T} a={K.Pi} b={K.Pi + 4.3} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#1a0f14' }}></div>
        <Ambiente T={T} n={26} color="rgba(255,180,220,.15)" />
        {svg((() => {
          const corta = kprog(T, K.Pi + 1.0, K.Pi + 2.0, kEase.sale), parte = kprog(T, K.Pi + 2.4, K.Pi + 3.0, kEase.sale);
          const tx = klerp(140, 900, kprog(T, K.Pi + 0.6, K.Pi + 2.0));
          return <>
            <Proteina T={T} cx={540} cy={700} corte={corta} />
            {T < K.Pi + 2.2 && <Tijera x={tx} y={700} s={1.1} abre={Math.abs(Math.sin(T * 10))} />}
            <AzucarDoble x={540} y={1080} s={1.3} parte={parte} />
            {T > K.Pi + 2.0 && T < K.Pi + 3.0 && <Tijera x={540} y={1000} s={0.9} rot={90} abre={Math.abs(Math.sin(T * 10))} />}
          </>;
        })())}
      </Escena>
      {/* 10b · al tostar: Maillard (aroma a chocolate) */}
      <Escena T={T} a={K.Pi + 4.3} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<Comal T={T} x={540} y={1000} dorado={kprog(T, K.Pi + 4.4, K.Pi + 6.4)} aroma={kprog(T, K.Pi + 5.0, K.Pi + 5.8)} />)}
      </Escena>
      {/* 11 · el estudio: 2014, Sídney (UNSW): cacao fermentado con antifúngico */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.E + 0.3, K.E + 0.8)}>
            <Cajon T={T} x={290} y={1010} etiqueta={T > K.E + 2.9 ? 'normal' : ''} />
            <Cajon T={T} x={790} y={1010} tachadas={kprog(T, K.E + 3.6, K.E + 4.8)} etiqueta={T > K.E + 2.9 ? 'con antifúngico' : ''} />
          </g>
          <g opacity={kprog(T, K.E + 3.0, K.E + 3.3) * (1 - kprog(T, K.E + 5.2, K.E + 5.6))}><Atomizador T={T} x={990} y={830} rocia={kprog(T, K.E + 3.2, K.E + 3.5)} /></g>
        </>)}
      </Escena>
      {/* 12 · resultado: más ácido y sin su sabor característico */}
      <Escena T={T} a={K.R} b={K.Da}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={kprog(T, K.R + 0.1, K.R + 0.5)}><Barra x={290} y={940} s={0.85} /></g>
          <g opacity={kprog(T, K.R + 0.5, K.R + 0.9)} transform={`translate(${Math.sin(T * 30) * 4 * kprog(T, K.R + 0.9, K.R + 1.3)} 0)`}><Barra x={790} y={940} s={0.85} agria color="#6e4a33" /></g>
          <text x={290} y={680} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.R + 0.2, K.R + 0.5)}>con levaduras</text>
          <text x={790} y={680} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.R + 0.6, K.R + 0.9)}>sin levaduras</text>
        </>)}
      </Escena>
      {/* 13 · dato: las semillas sin levaduras quedaron morado violeta, no bien cafés */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={ROSA} />
        {svg(<>
          <g opacity={kprog(T, K.Da + 0.2, K.Da + 0.6)}><Semilla x={290} y={980} s={klerp(0.7, 1.35, kprog(T, K.Da + 0.2, K.Da + 0.8, kEase.rebote))} rot={-8} color="#6a3a22" /></g>
          <g opacity={kprog(T, K.Da + 1.4, K.Da + 1.8)}><Semilla x={790} y={980} s={klerp(0.7, 1.35, kprog(T, K.Da + 1.4, K.Da + 2.0, kEase.rebote))} rot={8} color={MORADO} /></g>
          <text x={290} y={1170} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Da + 0.5, K.Da + 0.8)}>con levaduras</text>
          <text x={790} y={1170} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Da + 1.7, K.Da + 2.0)}>sin levaduras</text>
        </>)}
      </Escena>
      {/* 14 · cierre: la misma caja del inicio; la levadura con moñito presenta el bombón; burbuja con el montón */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={ROSA} />
        {svg(<>
          <Corazones T={T} />
          <CajaCorazon x={380} y={1010} s={1.05} abre={1} conBombon={[true, false, true]} />
          <Bombon x={400} y={690 + Math.sin(T * 3) * 8} s={1.15} rot={Math.sin(T * 3) * 6} />
          <Levadura T={T} x={820} y={1020} s={1.25} brote={0.6} mono cara />
          <g opacity={kprog(T, K.Ci + 1.6, K.Ci + 2.2)} transform={`translate(0 ${(1 - kprog(T, K.Ci + 1.6, K.Ci + 2.2, kEase.sale)) * 40})`}>
            <circle cx={520} cy={575} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={500} cy={540} r={20} fill="#fff" stroke={KC.ink} strokeWidth={4} />
            <ellipse cx={330} cy={430} rx={230} ry={120} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <g transform="translate(330 450) scale(.28)"><Monton T={T} x={0} y={0} cubre={1} /></g>
            <Levadura T={T} x={460} y={380} s={0.35} brote={0.5} />
          </g>
        </>)}
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Mo, titulo: 'La fermentación' }, { at: K.Le, titulo: 'Las levaduras' }, { at: K.Ba, titulo: 'Las bacterias' }, { at: K.Pi, titulo: 'El sabor' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Mz - 0.2} texto="Especial San Valentín" x={540} y={1500} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.G + 2.3} until={K.Mz - 0.3} x={700} y={1600} texto="levadura (un hongo)" tam={34} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Mz + 1.4} until={K.Am - 0.3} x={60} y={1460} texto="cacao" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Mz + 1.6} until={K.Am - 0.3} x={60} y={1520} texto="Theobroma cacao" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mz + 2.4} until={K.Am - 0.3} texto="pulpa llena de azúcares" x={600} y={1600} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Am + 0.6} until={K.Mo - 0.3} x={90} y={720} texto="semilla fresca" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Am + 2.0} until={K.Mo - 0.3} texto="amarga y áspera" x={540} y={1500} tam={46} borde={KC.red} />
      <Etq T={T} at={K.Mo + 1.0} until={K.Le - 0.3} x={60} y={1460} texto="hojas de plátano" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mo + 3.0} until={K.Le - 0.3} texto="de 2 a 10 días" x={540} y={1580} tam={46} borde={KC.yellow} />
      {T > K.Le - 0.3 && T < K.Ba - 1.4 && <Escala T={T} z={1} pxPorMm={20000} x={60} y={1440} />}
      {T > K.Ba - 0.3 && T < K.Ca + 0.2 && <Escala T={T} z={1} pxPorMm={20000} x={60} y={1440} />}
      <Etq T={T} at={K.Le + 0.9} until={K.Al - 0.3} x={60} y={470} texto="Saccharomyces cerevisiae" it tam={30} />
      <Etq T={T} at={K.Le + 1.3} until={K.Al - 0.3} x={60} y={525} texto="Hanseniaspora" it tam={30} />
      <Etq T={T} at={K.Le + 1.7} until={K.Al - 0.3} x={60} y={580} texto="Pichia…" it tam={30} />
      <Chip T={T} at={K.Le + 2.0} until={K.Al - 0.3} texto="hongos de una sola célula" x={540} y={1580} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Al + 0.3} until={K.Al + 1.7} texto="azúcar → alcohol + CO₂" x={540} y={1580} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Al + 2.1} until={K.Ba - 0.3} texto="la pulpa escurre" x={540} y={1500} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.Ba + 1.1} until={K.Ca - 0.3} x={600} y={490} texto="ácido láctico" tam={32} color={KC.mint} lado="izq" />
      <Etq T={T} at={K.Ba + 3.6} until={K.Ca - 0.3} x={60} y={1470} texto="alcohol → ácido acético" tam={32} color={KC.yellow} />
      <Chip T={T} at={K.Ba + 4.0} until={K.Ca - 0.3} texto="el del vinagre" x={540} y={1590} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 1.4} until={K.Ca + 2.4} texto="más de 40 °C" x={640} y={560} tam={52} borde={KC.red} />
      <Etq T={T} at={K.Ca + 2.9} until={K.P - 0.3} x={600} y={560} texto="germen" tam={34} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Ca + 3.9} until={K.P - 0.2} texto="la semilla muere" x={600} y={1500} tam={46} borde={KC.ink} />
      {T > K.Pi - 0.3 && T < K.Pi + 4.4 && <Escala T={T} z={1} pxPorMm={1e8} x={60} y={1440} />}
      <Etq T={T} at={K.Pi + 0.4} until={K.Pi + 4.0} x={60} y={590} texto="proteína" tam={32} />
      <Etq T={T} at={K.Pi + 1.9} until={K.Pi + 4.0} x={60} y={470} texto="enzimas de la semilla" tam={30} color={KC.orange} />
      <Etq T={T} at={K.Pi + 2.6} until={K.Pi + 4.0} x={60} y={1170} texto="azúcar → glucosa + fructosa" tam={30} />
      <Chip T={T} at={K.Pi + 3.0} until={K.Pi + 4.1} texto="piezas del sabor" x={540} y={1560} tam={46} borde={KC.pink} />
      <Etq T={T} at={K.Pi + 4.6} until={K.E - 0.3} x={60} y={1460} texto="al tostar" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Pi + 5.0} until={K.E - 0.3} texto="reacción de Maillard" x={540} y={1580} tam={46} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.8} anio="2014" quien="Univ. de Nueva Gales del Sur" revista="Sídney, Australia · Int. J. Food Microbiology" x={380} y={560} />
      <Chip T={T} at={K.E + 3.3} until={K.R - 0.3} texto="frena a las levaduras" x={540} y={1500} tam={44} borde={KC.red} />
      <Etq T={T} at={K.E + 4.6} until={K.R - 0.3} x={540} y={1610} texto="las bacterias siguen" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 1.2} until={K.Da - 0.2} texto="más ácido · sin su sabor" x={540} y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Da + 2.2} until={K.Ci - 0.2} texto="morado violeta" x={540} y={1500} tam={50} borde={MORADO2} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou} texto="hecho con ayuda de levaduras" x={540} y={1520} tam={40} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mz - 0.1} texto="El chocolate también *lo hizo un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Mz + 0.1} until={K.Am - 0.1} texto="Semillas en pulpa *llena de azúcares.*" />
      <Subtitulo T={T} idx={2} at={K.Am + 0.1} until={K.Mo - 0.1} texto="Ásperas y amargas: *aún no es chocolate.*" />
      <Subtitulo T={T} idx={3} at={K.Mo + 0.1} until={K.Le - 0.1} texto="Tapadas con hojas, *de 2 a 10 días.*" />
      <Subtitulo T={T} idx={4} at={K.Le + 0.1} until={K.Al - 0.1} texto="Las levaduras *se comen el azúcar.*" />
      <Subtitulo T={T} idx={5} at={K.Al + 0.1} until={K.Ba - 0.1} texto="Alcohol, y la pulpa *escurre.*" />
      <Subtitulo T={T} idx={6} at={K.Ba + 0.1} until={K.Ca - 0.1} texto="Bacterias: *láctico y acético.*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.P - 0.1} texto="Calor y ácido: *la semilla muere.*" />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.Pi - 0.1} texto="¿De dónde *sale el sabor?*" />
      <Subtitulo T={T} idx={9} at={K.Pi + 0.1} until={K.E - 0.1} texto="Piezas del sabor *que el tostado une.*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.R - 0.1} texto="2014: cacao *sin levaduras.*" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.Da - 0.1} texto="Más ácido *y sin su sabor.*" />
      <Subtitulo T={T} idx={12} at={K.Da + 0.1} until={K.Ci - 0.1} texto="No bien cafés: *morado violeta.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Regalas *el trabajo de un hongo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mazorca + 0.6, CUES.Amarga - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Amarga + 0.5, CUES.Monton - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Levadura + 0.6, CUES.Alcohol - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Bacterias + 0.6, CUES.Calor - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Piezas + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 0.8, CUES.Resultado - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Resultado + 0.3, CUES.Dato - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Dato + 0.3, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="16" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChocolateApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Chocolate /></CompositionStage></div>;
}
window.ChocolateApp = ChocolateApp;
