// cine-pitch.jsx — escenas animadas del pitch de Fungi Mati (MIT Solve 2027), estilo documental de cine.
// Cada escena: ILUSC.<id> = { cam, dibuja({ p, tl, T, capa, dur }) }. p = avance 0..1 del bloque, tl = segundos del bloque.
// Morfología: Pleurotus = repisas en abanico con láminas; bagazo = haces de fibra larga color paja; hifas = filamentos ramificados.
const ILUSC = window.ILUSC;
window.ILUS = window.ILUS || {};
window.ICONOS = window.ICONOS || {};
const IMG = (n) => 'video/img/' + n + '.jpg';
// Fotos que se dibujan dentro de las escenas (se precargan antes del primer cuadro).
window.PITCH_IMGS = ['web/paisaje_agavero_2', 'web/pinas_agave', 'web/horno_destileria', 'web/paisaje_agavero_1', 'web/agave_campo', 'web/jimador',
  'robert/granja_prepa_antes', 'robert/granja_prepa_despues', 'robert/curso_ruta_azul_1', 'robert/granja_prepa_cosecha', 'robert/curso_ruta_azul_2',
  'robert/rise_equitech_spotlight', 'robert/micelio_en_grano_frascos_2023', 'robert/djamor_3_primordios', 'robert/setas_3'].map(IMG).concat(['video/img/rise_logo_claro.svg']);

const ORO = '#F4C25A', CREMA = '#F6F3EC', PAJA = '#d8b77a', PAJA2 = '#b98d4e', SETA = '#e9e2d3', SETA_OSC = '#b9ad98';
const ease = suave3;

/* ---------------- piezas ---------------- */
// Foto dentro del SVG, recortada al rectángulo, con acercamiento lento hacia (fx, fy).
function FotoS({ src, x = 0, y = 0, w = CW, h = CH, z = 1, fx = 0.5, fy = 0.5, o = 1, id, filtro }) {
  const cx = x + w * fx, cy = y + h * fy;
  return <g opacity={o}>
    <clipPath id={`fs-${id}`}><rect x={x} y={y} width={w} height={h} /></clipPath>
    <g clipPath={`url(#fs-${id})`}>
      <image href={IMG(src)} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice"
        transform={`translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`} style={filtro ? { filter: filtro } : undefined} />
    </g>
  </g>;
}
// Velo oscuro en degradado para que el texto se lea sobre la foto.
function Velo({ lado = 'izq', o = 0.85, color = '#07080b' }) {
  const id = 'velo-' + lado + '-' + Math.round(o * 100);
  const [x1, x2, y1, y2] = lado === 'izq' ? [0, 1, 0, 0] : lado === 'der' ? [1, 0, 0, 0] : lado === 'abajo' ? [0, 0, 1, 0] : [0, 0, 0, 1];
  return <g><linearGradient id={id} x1={x1} x2={x2} y1={y1} y2={y2}><stop offset="0" stopColor={color} stopOpacity={o} /><stop offset=".55" stopColor={color} stopOpacity={o * 0.35} /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient>
    <rect x={0} y={0} width={CW} height={CH} fill={`url(#${id})`} /></g>;
}
// Viñeta propia de cada escena (además de la de ffmpeg).
function Vineta({ o = 0.55 }) {
  const id = 'pv-vin-' + Math.round(o * 100);
  return <g><radialGradient id={id} cx=".5" cy=".48" r=".72"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity={o} /></radialGradient>
    <rect x={0} y={0} width={CW} height={CH} fill={`url(#${id})`} /></g>;
}
// Fondo oscuro de estudio con luz cálida.
function Estudio({ color = '#1a1712', luz = [0.5, 0.35], halo = '#ffd9a0', o = 0.5 }) {
  return <g><rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill={color} />
    <Halo x={CW * luz[0]} y={CH * luz[1]} r={900} color={halo} o={o} /></g>;
}
// Un haz de bagazo: fibras largas que se abren en las puntas.
function Fibra({ x, y, len = 260, ang = 0, w = 10, color = PAJA, seed = 1, o = 1, g = 1 }) {
  const r = R(seed), L = len * g;
  const hilos = Array.from({ length: 5 }, (_, i) => { const d = (i - 2) * w * 0.22, c1 = (r() - 0.5) * 30, c2 = (r() - 0.5) * 40, ab = (r() - 0.5) * 18;
    return `M ${-L / 2} ${d} C ${-L / 6} ${d + c1} ${L / 6} ${d + c2} ${L / 2} ${d + ab}`; });
  return <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    {hilos.map((d, i) => <path key={i} d={d} stroke={i % 2 ? color : osc(color, 0.18)} strokeWidth={w * (0.32 + 0.08 * (i % 3))} fill="none" strokeLinecap="round" />)}
    <path d={hilos[2]} stroke={cla(color, 0.45)} strokeWidth={w * 0.12} fill="none" opacity={0.7} strokeLinecap="round" />
  </g>;
}
// Montón de bagazo: muchas fibras apiladas en forma de loma.
function MontonBagazo({ x, y, w = 900, h = 300, n = 160, seed = 3, nivel = 1, oscuro = 0 }) {
  const r = R(seed);
  const items = Array.from({ length: n }, (_, i) => { const u = r(), v = r(); const xx = (u - 0.5) * w, alto = h * Math.sqrt(Math.max(0, 1 - Math.pow(2 * (u - 0.5), 2)));
    return { x: xx, y: -v * alto * nivel, ang: (r() - 0.5) * 160, len: 90 + r() * 180, w: 6 + r() * 8, c: [PAJA, PAJA2, '#cfa66a', '#e2c690', '#a87d45'][i % 5], s: seed * 100 + i }; });
  items.sort((a, b) => a.y - b.y);
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={0} y={6} rx={w * 0.55} ry={30} o={0.7} />
    <path d={`M ${-w / 2} 0 Q 0 ${-h * 2 * nivel} ${w / 2} 0 Z`} fill={mix('#8a6534', '#2a1d10', oscuro)} />
    {items.map((it, i) => <Fibra key={i} x={it.x} y={it.y} ang={it.ang} len={it.len} w={it.w} color={mix(it.c, '#3a2a18', oscuro)} seed={it.s} />)}
    <path d={`M ${-w / 2} 0 Q 0 ${-h * 2 * nivel} ${w / 2} 0 Z`} fill="url(#c-arriba)" opacity={0.5} />
  </g>;
}
// Humo con degradados radiales (sin filtros de desenfoque: rápido en el navegador).
function Humo({ x, y, t, n = 14, seed = 5, color = '#8d8a86', o = 0.55, alto = 700, ancho = 260 }) {
  const r = R(seed);
  return <g opacity={o}>
    <radialGradient id={`hu-${seed}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={color} stopOpacity=".55" /><stop offset=".6" stopColor={color} stopOpacity=".2" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient>
    {Array.from({ length: n }, (_, i) => { const fase = r(), vel = 0.07 + r() * 0.05, k = ((t * vel + fase) % 1), rr = 60 + k * 220 + r() * 60;
      return <circle key={i} cx={x + (r() - 0.5) * ancho + k * 120 * Math.sin(i + t * 0.2)} cy={y - k * alto} r={rr} fill={`url(#hu-${seed})`} opacity={Math.sin(k * Math.PI)} />; })}
  </g>;
}
// Brasas que suben.
function Brasas({ x, y, t, n = 40, seed = 8, ancho = 700 }) {
  const r = R(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const f = r(), k = (t * (0.18 + r() * 0.2) + f) % 1;
    return <circle key={i} cx={x + (r() - 0.5) * ancho + Math.sin(t * 2 + i) * 14} cy={y - k * 420} r={1.5 + r() * 2.5} fill={i % 3 ? '#ff9a3c' : '#ffd27a'} opacity={(1 - k) * 0.9} />; })}</g>;
}
// Átomo con brillo (para CO₂ y CH₄).
function Atomo({ x, y, r, c }) { return <g><circle cx={x} cy={y} r={r} fill={c} /><circle cx={x} cy={y} r={r} fill="url(#c-esfera)" /><circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#fff" opacity={0.6} /></g>; }
function CO2({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -46 0 L 46 0" stroke="#d9d4cc" strokeWidth={8} /><Atomo x={-50} y={0} r={24} c="#d63a2e" /><Atomo x={50} y={0} r={24} c="#d63a2e" /><Atomo x={0} y={0} r={28} c="#2b2b2e" />
  </g>;
}
function CH4({ x, y, s = 1, rot = 0 }) {
  const H = [[-40, -30], [40, -30], [-36, 36], [38, 34]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {H.map(([a, b], i) => <path key={i} d={`M 0 0 L ${a} ${b}`} stroke="#d9d4cc" strokeWidth={7} />)}
    <Atomo x={0} y={0} r={28} c="#2b2b2e" />{H.map(([a, b], i) => <Atomo key={i} x={a} y={b} r={15} c="#f2f0ea" />)}
  </g>;
}
// Texto SVG con sombra suave.
function Txt({ x, y, children, tam = 48, peso = 600, fam = FUENTE.serif, color = CREMA, ancla = 'start', o = 1, esp = 0, ital = false }) {
  return <text x={x} y={y} textAnchor={ancla} fontFamily={fam} fontWeight={peso} fontSize={tam} fill={color} opacity={o} letterSpacing={esp} fontStyle={ital ? 'italic' : 'normal'}
    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.6))', fontVariationSettings: fam === FUENTE.serif ? "'opsz' 96" : undefined }}>{children}</text>;
}
// Número que cuenta.
function Cuenta({ x, y, desde = 0, hasta, tl, at = 0.2, dura = 1.6, tam = 180, prefijo = '', sufijo = '', dec = 0, color = CREMA, ancla = 'start' }) {
  const v = lerp(desde, hasta, cpr(tl, at, at + dura, (q) => 1 - Math.pow(1 - q, 3)));
  return <Txt x={x} y={y} tam={tam} peso={700} color={color} ancla={ancla} o={cpr(tl, at - 0.2, at + 0.3)}>{prefijo + Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + sufijo}</Txt>;
}
// Una seta Pleurotus vista de frente-lado, en repisa (para racimos grandes en primer plano).
function SetasRepisa({ x, y, g = 1, t = 0, color = SETA, seed = 2, tam = 150, n = 8 }) {
  return <Racimo x={x} y={y} n={n} tam={tam} color={color} g={g} t={t} seed={seed} />;
}
// Bolsa de cultivo con setas saliendo por las rajadas.
function BolsaSetas({ x, y, colonizado = 1, setas = 1, t = 0, w = 220, h = 330, seed = 4, color = SETA }) {
  return <BolsaCultivo x={x} y={y} w={w} h={h} sustrato={PAJA} colonizado={colonizado} tex="aserrin">
    {setas > 0 && <g><SetasRepisa x={-w * 0.32} y={-h * 0.62} g={setas} t={t} seed={seed} tam={w * 0.42} n={6} color={color} />
      <SetasRepisa x={w * 0.3} y={-h * 0.36} g={kclamp(setas * 1.2 - 0.2, 0, 1)} t={t} seed={seed + 3} tam={w * 0.38} n={5} color={color} /></g>}
  </BolsaCultivo>;
}
// Pellet: cilindro corto de bagazo prensado.
function Pellet({ x, y, ang = 0, s = 1, c = '#c49a5c' }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <rect x={-22} y={-8} width={44} height={16} rx={6} fill={c} /><rect x={-22} y={-8} width={44} height={16} rx={6} fill="url(#c-cilindro)" opacity={0.6} />
    <ellipse cx={22} cy={0} rx={4} ry={8} fill={osc(c, 0.25)} /><path d="M -14 -3 L 10 -4 M -10 3 L 14 2" stroke={osc(c, 0.3)} strokeWidth={1.4} opacity={0.6} />
  </g>;
}
// Tarjeta de vidrio oscuro con borde de acento.
function Tarjeta({ x, y, w, h, e = 1, acento = ORO, children }) {
  return <g opacity={e} transform={`translate(${x} ${y + (1 - e) * 30})`}>
    <rect x={0} y={0} width={w} height={h} rx={22} fill="#0c0d10" opacity={0.78} /><rect x={0} y={0} width={w} height={h} rx={22} fill="none" stroke={acento} strokeOpacity={0.7} strokeWidth={2} />
    <rect x={0} y={0} width={w} height={h} rx={22} fill="url(#c-arriba)" opacity={0.35} />
    {children}
  </g>;
}
// Medidor circular.
function Medidor({ x = 0, y = 0, r = 150, v = 1, color = ORO, grosor = 22 }) {
  const C = 2 * Math.PI * r;
  return <g transform={`translate(${x} ${y}) rotate(-90)`}>
    <circle r={r} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={grosor} />
    <circle r={r} fill="none" stroke={color} strokeWidth={grosor} strokeDasharray={`${C * v} ${C}`} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 12px ${color})` }} />
  </g>;
}
// Mesa de madera en perspectiva (cubierta y canto).
function Mesa({ y = 760, capa, madera = 'media', o = 1 }) {
  return <g transform={capa(0.9)} opacity={o}>
    <rect x={-300} y={y} width={CW + 600} height={CH - y + 300} fill={`url(#c-madera-${madera})`} /><rect x={-300} y={y} width={CW + 600} height={CH - y + 300} fill="#000" opacity={0.25} />
    <rect x={-300} y={y - 3} width={CW + 600} height={6} fill="#fff" opacity={0.18} />
    <linearGradient id="pm-mesa" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".22" /><stop offset="1" stopColor="#000" stopOpacity=".5" /></linearGradient>
    <rect x={-300} y={y} width={CW + 600} height={CH - y + 300} fill="url(#pm-mesa)" />
  </g>;
}
// Número de paso en círculo dorado.
function Paso({ x, y, n, e }) {
  return <g opacity={e} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * e})`}>
    <circle r={34} fill="#0c0d10" opacity={0.8} /><circle r={34} fill="none" stroke={ORO} strokeWidth={3} />
    <text y={12} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={32} fill={ORO}>{n}</text>
  </g>;
}

/* ================= 1. EL RESIDUO ================= */
ILUSC.agave_intro = {
  cam: { z0: 1.0, z1: 1.0 },
  dibuja: ({ p, tl, T, capa }) => {
    const B = cpr(p, 0.58, 0.68, ease); // cambio a las piñas
    return <g>
      <g transform={capa(0.3)}><FotoS id="ai1" src="web/paisaje_agavero_2" z={1.06 + 0.12 * p} fx={0.5} fy={0.62} /></g>
      <Halo x={1300} y={420} r={700} color="#ffb877" o={0.35 * (1 - B)} />
      <g opacity={B}><FotoS id="ai2" src="web/pinas_agave" z={1.15 - 0.08 * B + 0.06 * p} fx={0.5} fy={0.6} />
        <Velo lado="abajo" o={0.8} />
        {Array.from({ length: 26 }, (_, i) => { const r = R(500 + i); const g = cpr(p, 0.68 + r() * 0.12, 0.86 + r() * 0.1, ease);
          return <Fibra key={i} x={200 + r() * 1520} y={900 + r() * 150} ang={(r() - 0.5) * 30} len={180 + r() * 240} w={8 + r() * 8} g={g} seed={600 + i} color={[PAJA, PAJA2, '#e2c690'][i % 3]} />; })}
      </g>
      <Velo lado="izq" o={0.85} />
      <Polvo n={45} t={T} seed={11} o={0.45} />
      <g opacity={1 - cpr(p, 0.5, 0.58)}>
        <Rotulo x={130} y={300} arriba="TEQUILA, JALISCO · MEXICO" tl={tl} at={0.5} tam={10} />
        <Cuenta x={124} y={520} hasta={900000} tl={tl} at={1.6} dura={3.2} tam={176} prefijo="≈ " />
        <Txt x={132} y={600} tam={52} ital o={cpr(tl, 2.6, 3.4)}>tonnes of agave bagasse, every year</Txt>
      </g>
      <g opacity={B}>
        <Txt x={130} y={300} tam={22} fam={FUENTE.mono} peso={700} esp={5} color={ORO}>AGAVE BAGASSE</Txt>
        <Txt x={128} y={380} tam={64} o={cpr(p, 0.66, 0.74)}>the fibre left after</Txt>
        <Txt x={128} y={452} tam={64} o={cpr(p, 0.68, 0.76)}>the sugars are extracted</Txt>
      </g>
      <Vineta />
    </g>;
  },
};
ILUSC.bagazo_pila = {
  cam: { z0: 1.0, z1: 1.1, fx: 960, fy: 620 },
  dibuja: ({ p, tl, T, capa }) => <g>
    <g transform={capa(0.25)}>
      <linearGradient id="bp-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1d2233" /><stop offset=".6" stopColor="#5a3a2a" /><stop offset="1" stopColor="#b8643a" /></linearGradient>
      <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill="url(#bp-cielo)" />
      <Halo x={1450} y={640} r={500} color="#ff9a55" o={0.55} />
      {/* cerros lejanos con surcos de agave */}
      <path d="M -200 700 Q 300 560 700 640 T 1500 600 T 2200 650 L 2200 1300 L -200 1300 Z" fill="#2a2a26" />
      {Array.from({ length: 60 }, (_, i) => { const r = R(900 + i); return <path key={i} d={`M ${-100 + i * 36} ${700 + r() * 30} l -8 -22 m 8 22 l 8 -24 m -8 24 l 0 -28`} stroke="#3d4a3e" strokeWidth={4} opacity={0.8} />; })}
    </g>
    <g transform={capa(0.7)}>
      <rect x={-300} y={800} width={CW + 600} height={500} fill="url(#c-tierra)" /><rect x={-300} y={800} width={CW + 600} height={500} fill="#1a120b" opacity={0.55} />
    </g>
    <g transform={capa(1)}>
      <Humo x={980} y={700} t={T} n={18} seed={21} alto={800} ancho={500} o={0.7} />
      <MontonBagazo x={960} y={900} w={1250} h={300} n={210} seed={7} oscuro={0.25} />
      <Halo x={1180} y={860} r={220} color="#ff7a2a" o={0.75 + 0.2 * Math.sin(T * 7)} />
      <Brasas x={1150} y={860} t={T} n={50} ancho={500} />
    </g>
    <Polvo n={30} t={T} seed={5} o={0.35} color="#ffd9b0" />
    <Rotulo x={120} y={200} arriba="MOST OF IT" texto="burned, dumped, left to rot" tl={tl} at={0.3} tam={66} />
    <Vineta o={0.6} />
  </g>,
};
ILUSC.costo = {
  cam: { z0: 1.0, z1: 1.0 },
  dibuja: ({ p, tl, T, capa, dur }) => {
    const camion = lerp(-700, 2300, cpr(p, 0.12, 0.62, (q) => q));
    const campo = cpr(p, 0.6, 0.7, ease);
    return <g>
      <g opacity={1 - campo}>
        <FotoS id="co1" src="web/horno_destileria" z={1.08 + 0.1 * p} fx={0.45} fy={0.55} />
        <Velo lado="der" o={0.9} />
        <Tarjeta x={1140} y={250} w={660} h={380} e={cpr(tl, 0.4, 1.1, ease)}>
          <text x={50} y={80} fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={5} fill={ORO}>DISTILLERIES PAY</text>
          <text x={46} y={220} fontFamily={FUENTE.serif} fontWeight={700} fontSize={128} fill={CREMA}>$200–500</text>
          <text x={50} y={290} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={40} fill={CREMA} opacity={0.9}>Mexican pesos per tonne,</text>
          <text x={50} y={340} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={40} fill={CREMA} opacity={0.9}>just to haul it away</text>
        </Tarjeta>
        {/* camión de volteo cargado de bagazo */}
        <g transform={`translate(${camion} 905)`}>
          <Sombra x={0} y={40} rx={300} ry={16} o={0.7} />
          <rect x={-300} y={-150} width={420} height={140} rx={8} fill="#c9682a" /><rect x={-300} y={-150} width={420} height={140} rx={8} fill="url(#c-arriba)" opacity={0.5} />
          <path d="M -290 -150 Q -90 -280 110 -150 Z" fill={PAJA2} />
          {Array.from({ length: 30 }, (_, i) => { const r = R(1200 + i); return <Fibra key={i} x={-280 + r() * 380} y={-160 - r() * 70} ang={(r() - 0.5) * 120} len={70 + r() * 60} w={6} seed={1300 + i} />; })}
          <path d="M 130 -10 L 130 -120 L 240 -120 L 300 -60 L 300 -10 Z" fill="#e8e2d6" /><path d="M 150 -110 L 230 -110 L 278 -64 L 150 -64 Z" fill="#7fa3b8" opacity={0.8} />
          {[-220, -80, 220].map((cx, i) => <g key={i}><circle cx={cx} cy={0} r={42} fill="#16161a" /><circle cx={cx} cy={0} r={18} fill="#8a8a90" /></g>)}
        </g>
      </g>
      <g opacity={campo}>
        <FotoS id="co2" src="web/agave_campo" z={1.1 + 0.08 * p} fx={0.5} fy={0.5} />
        <rect x={0} y={0} width={CW} height={CH} fill="#1a0c05" opacity={0.35} />
        <Humo x={1300} y={820} t={T} n={16} seed={31} alto={700} o={0.8} />
        <Halo x={1300} y={820} r={260} color="#ff8a3a" o={0.8} />
        <Brasas x={1300} y={830} t={T} n={40} ancho={360} />
        <Velo lado="izq" o={0.85} />
        <Rotulo x={120} y={260} arriba="SMALL AGAVE GROWERS" texto="often burn it in the field" tl={tl - 0.62 * dur} at={0.1} tam={66} />
      </g>
      <Vineta />
    </g>;
  },
};
ILUSC.gases = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 600 },
  dibuja: ({ p, tl, T, capa }) => {
    const mols = [['co2', 380, 0.05], ['ch4', 760, 0.15], ['co2', 1180, 0.25], ['pm', 1500, 0.1], ['ch4', 1620, 0.35], ['co2', 600, 0.45], ['pm', 980, 0.3]];
    return <g>
      <g transform={capa(0.3)}>
        <linearGradient id="ga-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2a2b33" /><stop offset=".7" stopColor="#6a5a50" /><stop offset="1" stopColor="#9a7a62" /></linearGradient>
        <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill="url(#ga-cielo)" />
        <Humo x={960} y={900} t={T} n={22} seed={41} alto={900} ancho={1600} o={0.55} color="#7a746e" />
      </g>
      {/* pueblo: casas con techos y una torre de iglesia */}
      <g transform={capa(0.8)}>
        {Array.from({ length: 16 }, (_, i) => { const r = R(1400 + i), x = -60 + i * 128, h = 90 + r() * 70, w = 110 + r() * 30;
          return <g key={i}><rect x={x} y={900 - h} width={w} height={h + 200} fill={['#3a3330', '#463c36', '#2f2a28'][i % 3]} />
            <path d={`M ${x - 8} ${900 - h} L ${x + w / 2} ${900 - h - 40} L ${x + w + 8} ${900 - h} Z`} fill="#5a2e22" />
            {r() > 0.4 && <rect x={x + w * 0.3} y={900 - h + 24} width={22} height={28} fill="#ffcf7a" opacity={0.55} />}</g>; })}
        <rect x={880} y={620} width={90} height={300} fill="#3e3632" /><path d="M 870 620 L 925 540 L 980 620 Z" fill="#4e3a30" /><rect x={912} y={500} width={6} height={50} fill="#4e3a30" /><rect x={900} y={514} width={30} height={6} fill="#4e3a30" />
        <rect x={-200} y={895} width={CW + 400} height={400} fill="#1e1a18" />
      </g>
      <g transform={capa(1.1)}>
        {mols.map(([k, x, at], i) => { const sube = cpr(p, at, at + 0.7, (q) => q), e = cpr(p, at, at + 0.08, ease) * (1 - cpr(p, 0.92, 1));
          const y = 880 - sube * 370, rot = Math.sin(T * 0.8 + i) * 25, s = 1.25;
          return <g key={i} opacity={e}>
            {k === 'co2' && <CO2 x={x} y={y} s={s} rot={rot} />}{k === 'ch4' && <CH4 x={x} y={y} s={s} rot={rot} />}
            {k === 'pm' && Array.from({ length: 14 }, (_, j) => { const r = R(1500 + i * 20 + j); return <circle key={j} cx={x + (r() - 0.5) * 120} cy={y + (r() - 0.5) * 90} r={3 + r() * 5} fill="#2a2522" opacity={0.85} />; })}
            <text x={x} y={y + 84} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} fill={CREMA} letterSpacing={2}>{k === 'co2' ? 'CO₂' : k === 'ch4' ? 'CH₄' : 'PARTICULATES'}</text>
          </g>; })}
      </g>
      <Rotulo x={120} y={170} arriba="EITHER WAY" texto="it ends up in rural communities" tl={tl} at={0.3} tam={60} />
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 2. FUNGI MATI ================= */
// Marca de Fungi Mati (tipográfica) con una seta como punto de la "i".
function MarcaFM({ x, y, tam = 200, e = 1, color = CREMA, t = 0 }) {
  return <g transform={`translate(${x} ${y})`} opacity={e}>
    <text x={0} y={0} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={tam} fill={color} letterSpacing={tam * 0.02}
      style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,.6))', fontVariationSettings: "'opsz' 144" }}>Fungi <tspan fill={ORO} fontStyle="italic">Mati</tspan></text>
  </g>;
}
ILUSC.titulo = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const g = cpr(p, 0.25, 0.85, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#14110d" luz={[0.3, 0.55]} o={0.55} /><Bokeh n={14} t={T} seed={61} o={0.35} /></g>
      <Mesa y={820} capa={capa} madera="oscura" />
      <g transform={capa(1)}>
        <MontonBagazo x={560} y={850} w={700} h={160} n={110} seed={62} nivel={1 - 0.4 * g} />
        <SetasRepisa x={470} y={800} g={g} t={T} seed={63} tam={190} n={8} />
        <SetasRepisa x={690} y={820} g={kclamp(g * 1.1 - 0.1, 0, 1)} t={T} seed={64} tam={150} n={6} color="#efe8da" />
      </g>
      <MarcaFM x={1330} y={460} tam={190} e={cpr(tl, 0.2, 1.0, ease)} />
      <Txt x={1330} y={560} tam={46} ancla="middle" ital o={cpr(tl, 0.8, 1.6)}>agave bagasse  →  gourmet mushrooms</Txt>
      <g opacity={cpr(p, 0.55, 0.7, ease)} transform="translate(1330 680)">
        <rect x={-190} y={-52} width={380} height={84} rx={42} fill={ORO} /><text x={0} y={6} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={36} fill="#1a1308" letterSpacing={3}>4–6 WEEKS</text>
      </g>
      <Polvo n={40} t={T} seed={65} o={0.45} />
      <Vineta />
    </g>;
  },
};

/* ================= 3. CÓMO FUNCIONA ================= */
ILUSC.pellets = {
  cam: { z0: 1.02, z1: 1.1, fx: 900, fy: 700 },
  dibuja: ({ p, tl, T, capa }) => {
    const r = R(71);
    const ps = Array.from({ length: 150 }, (_, i) => ({ x: 560 + (r() - 0.5) * 380 * (0.4 + r()), at: r() * 0.7, ang: r() * 180, fin: 820 - Math.max(0, 1 - Math.pow((r() - 0.5) * 2, 2)) * 170 * r(), dx: (r() - 0.5) * 300 }));
    return <g>
      <g transform={capa(0.3)}><Estudio color="#17130e" luz={[0.4, 0.3]} o={0.6} /></g>
      <Mesa y={820} capa={capa} madera="media" />
      <g transform={capa(1)}>
        {/* costal con pellets */}
        <g transform="translate(560 160) rotate(-18)"><path d="M -150 -60 L 150 -60 L 120 160 L -120 160 Z" fill="#c7b48e" /><path d="M -150 -60 L 150 -60 L 120 160 L -120 160 Z" fill="url(#c-cilindro)" opacity={0.6} />
          {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M ${-140 + i * 14} -55 L ${-112 + i * 11.5} 155`} stroke="#a8946c" strokeWidth={2} opacity={0.5} />)}</g>
        <Sombra x={600} y={826} rx={300} ry={18} o={0.7} />
        {ps.map((q, i) => { const k = cpr(p, q.at * 0.6, q.at * 0.6 + 0.18, (z) => z * z);
          if (k <= 0) return null;
          const yy = lerp(250, q.fin, k), xx = q.x + q.dx * k * 0.3;
          return <Pellet key={i} x={xx} y={yy} ang={q.ang + k * 200} s={1.1} c={['#c49a5c', '#b88a4c', '#d2aa6c'][i % 3]} />; })}
      </g>
      <g transform={capa(1)}>
        {/* frascos de pellets guardados (meses) */}
        {[0, 1, 2].map((i) => <g key={i} opacity={cpr(p, 0.45 + i * 0.08, 0.55 + i * 0.08, ease)}>
          <rect x={1220 + i * 190} y={560} width={150} height={260} rx={18} fill="#cfe3e0" opacity={0.18} />
          {Array.from({ length: 34 }, (_, j) => { const r2 = R(800 + i * 50 + j); return <Pellet key={j} x={1240 + i * 190 + r2() * 110} y={640 + r2() * 170} ang={r2() * 180} s={0.9} />; })}
          <rect x={1220 + i * 190} y={560} width={150} height={260} rx={18} fill="url(#c-vidrio)" /><rect x={1215 + i * 190} y={540} width={160} height={30} rx={6} fill="url(#c-oro)" />
        </g>)}
      </g>
      <Rotulo x={1220} y={250} arriba="PELLETIZED BAGASSE" texto="stores for months" tl={tl} at={0.6} tam={66} />
      <Polvo n={40} t={T} seed={72} o={0.45} />
      <Vineta />
    </g>;
  },
};
ILUSC.proceso = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 600 },
  dibuja: ({ p, tl, T, capa }) => {
    const e = [0.02, 0.24, 0.46, 0.66].map((a) => cpr(p, a, a + 0.08, ease));
    const X = [300, 740, 1180, 1620];
    return <g>
      <g transform={capa(0.3)}><Estudio color="#141210" luz={[0.5, 0.25]} o={0.55} /><Bokeh n={10} t={T} seed={81} o={0.3} /></g>
      <Mesa y={780} capa={capa} madera="clara" />
      <g transform={capa(1)}>
        {/* 1 hidratar: cubeta con agua y pellets que se esponjan */}
        <g opacity={e[0]} transform={`translate(${X[0]} 780)`}>
          <Sombra x={0} y={4} rx={160} ry={14} o={0.6} />
          <path d="M -150 -230 L 150 -230 L 125 0 L -125 0 Z" fill="#3f7fb3" opacity={0.85} /><path d="M -150 -230 L 150 -230 L 125 0 L -125 0 Z" fill="url(#c-cilindro)" />
          <ellipse cx={0} cy={-230} rx={150} ry={26} fill="#8fc4e8" />
          {Array.from({ length: 22 }, (_, i) => { const r = R(820 + i); return <Pellet key={i} x={(r() - 0.5) * 230} y={-228 + (r() - 0.5) * 20} ang={r() * 180} s={0.8 + 0.5 * cpr(p, 0.05, 0.2)} c="#a8804a" />; })}
          {[0, 1, 2].map((i) => { const k = (T * 0.9 + i * 0.33) % 1; return <path key={i} d={`M ${-20 + i * 20} ${-360 + k * 100} q 10 18 0 26 q -10 -8 0 -26`} fill="#8fc4e8" opacity={(1 - k) * 0.9} />; })}
        </g>
        {/* 2 pasteurizar: olla con vapor */}
        <g opacity={e[1]} transform={`translate(${X[1]} 780)`}>
          <Sombra x={0} y={4} rx={170} ry={14} o={0.6} />
          <rect x={-150} y={-220} width={300} height={220} rx={14} fill="url(#c-acero)" /><rect x={-170} y={-236} width={340} height={26} rx={10} fill="url(#c-acero)" />
          <rect x={-200} y={-180} width={50} height={18} rx={8} fill="#2a2a2e" /><rect x={150} y={-180} width={50} height={18} rx={8} fill="#2a2a2e" />
          <ellipse cx={0} cy={16} rx={140} ry={20} fill="#ff7a2a" opacity={0.5 + 0.3 * Math.sin(T * 9)} />
          <Humo x={0} y={-250} t={T} n={9} seed={83} alto={300} ancho={180} o={0.6} color="#e8e8ea" />
        </g>
        {/* 3 +20 % cascarilla de soya */}
        <g opacity={e[2]} transform={`translate(${X[2]} 780)`}>
          <Sombra x={0} y={4} rx={170} ry={14} o={0.6} />
          <path d="M -170 0 Q -170 -120 0 -130 Q 170 -120 170 0 Z" fill="#c49a5c" />
          {Array.from({ length: 50 }, (_, i) => { const r = R(840 + i); return <Pellet key={i} x={(r() - 0.5) * 280} y={-r() * 100} ang={r() * 180} s={0.7} />; })}
          {Array.from({ length: 36 }, (_, i) => { const r = R(860 + i), k = cpr(p, 0.48 + r() * 0.1, 0.56 + r() * 0.1, (z) => z * z);
            return <ellipse key={i} cx={(r() - 0.5) * 200} cy={lerp(-250, -60 - r() * 60, k)} rx={9} ry={6} fill="#e8c77e" transform={`rotate(${r() * 180} ${(r() - 0.5) * 200} ${lerp(-380, -60, k)})`} opacity={k > 0 ? 1 : 0} />; })}
          <g transform={`translate(150 ${-250 + 14 * Math.sin(T * 2)}) rotate(-25)`}><ellipse cx={0} cy={0} rx={70} ry={30} fill="url(#c-acero)" /><rect x={60} y={-8} width={160} height={16} rx={8} fill="url(#c-acero)" /></g>
        </g>
        {/* 4 inocular: frasco de grano colonizado y bolsa */}
        <g opacity={e[3]} transform={`translate(${X[3]} 780)`}>
          <Sombra x={0} y={4} rx={170} ry={14} o={0.6} />
          <g transform="translate(-70 0)">
            <rect x={-70} y={-250} width={140} height={250} rx={18} fill="#f2eee4" opacity={0.92} />
            {Array.from({ length: 80 }, (_, i) => { const r = R(880 + i); return <ellipse key={i} cx={-60 + r() * 120} cy={-240 + r() * 230} rx={6} ry={4.5} fill={r() < 0.5 ? '#f8f6f0' : '#d7c49a'} />; })}
            <Micelio x={0} y={-120} r={120} g={0.9} seed={88} n={22} o={0.8} />
            <rect x={-70} y={-250} width={140} height={250} rx={18} fill="url(#c-vidrio)" /><rect x={-76} y={-276} width={152} height={30} rx={6} fill="url(#c-oro)" />
          </g>
          <BolsaSetas x={90} y={0} w={150} h={240} colonizado={cpr(p, 0.75, 1)} setas={0} seed={89} />
        </g>
        {X.map((x, i) => <Paso key={i} x={x} y={300} n={i + 1} e={e[i]} />)}
        {['HYDRATE', 'PASTEURIZE', '+20% SOYBEAN HULL', 'INOCULATE'].map((s, i) => <text key={i} x={X[i]} y={390} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={3} fill={CREMA} opacity={e[i]}>{s}</text>)}
        <text x={X[3]} y={430} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill={CREMA} opacity={e[3] * 0.85}>oyster mushroom mycelium</text>
      </g>
      <Polvo n={36} t={T} seed={84} o={0.4} />
      <Vineta />
    </g>;
  },
};
// Cadena de celulosa / lignina: haz de fibra a escala de microscopio, con eslabones.
function HazMicro({ x, y, len, ang, w = 44, color = '#c9a66a', seed, corte = 0, t = 0 }) {
  const r = R(seed), n = Math.round(len / 34);
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <rect x={-len / 2} y={-w / 2} width={len} height={w} rx={w / 2} fill={color} opacity={0.9} />
    <rect x={-len / 2} y={-w / 2} width={len} height={w} rx={w / 2} fill="url(#c-cilindro)" transform="rotate(90) translate(0 0)" opacity={0} />
    {Array.from({ length: n }, (_, i) => { const xx = -len / 2 + 16 + i * 34, roto = corte > (i / n) && r() < 0.55;
      return <g key={i} opacity={roto ? 0.15 : 1}><ellipse cx={xx} cy={-w * 0.15} rx={12} ry={7} fill="none" stroke={osc(color, 0.35)} strokeWidth={3} /><ellipse cx={xx + 12} cy={w * 0.15} rx={12} ry={7} fill="none" stroke={cla(color, 0.3)} strokeWidth={3} /></g>; })}
    <rect x={-len / 2} y={-w / 2} width={len} height={w * 0.3} rx={w * 0.15} fill="#fff" opacity={0.18} />
  </g>;
}
// Enzima: forma de "boca" que muerde la fibra.
function Enzima({ x, y, s = 1, t = 0, color = '#b18cff' }) {
  const a = 18 + 16 * Math.abs(Math.sin(t * 6));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${30 * Math.cos(a * Math.PI / 180)} ${-30 * Math.sin(a * Math.PI / 180)} A 30 30 0 1 0 ${30 * Math.cos(a * Math.PI / 180)} ${30 * Math.sin(a * Math.PI / 180)} Z`} fill={color} />
    <path d={`M 0 0 L ${30 * Math.cos(a * Math.PI / 180)} ${-30 * Math.sin(a * Math.PI / 180)} A 30 30 0 1 0 ${30 * Math.cos(a * Math.PI / 180)} ${30 * Math.sin(a * Math.PI / 180)} Z`} fill="url(#c-esfera)" />
    <circle cx={-8} cy={-14} r={4} fill="#1a1030" />
  </g>;
}
ILUSC.micro = {
  cam: { z0: 1.0, z1: 1.18, fx: 980, fy: 520 },
  dibuja: ({ p, tl, T, capa }) => {
    const g = cpr(p, 0.05, 0.85, (q) => q), corte = cpr(p, 0.3, 0.95);
    const haces = [[700, 380, 1300, -12, '#c9a66a', 'CELLULOSE'], [1100, 620, 1400, 8, '#8a6a3a', 'LIGNIN'], [600, 820, 1200, -4, '#c9a66a', '']];
    return <g>
      <g transform={capa(0.3)}>
        <radialGradient id="mi-fondo" cx=".5" cy=".5" r=".7"><stop offset="0" stopColor="#123a3a" /><stop offset="1" stopColor="#040b0d" /></radialGradient>
        <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill="url(#mi-fondo)" />
        <Bokeh n={20} t={T} seed={91} o={0.3} colores={['#7ff0c8', '#cfe9ff', '#ffe2b8']} />
      </g>
      <g transform={capa(1)}>
        {haces.map(([x, y, len, ang, c], i) => <HazMicro key={i} x={x} y={y} len={len} ang={ang} color={c} seed={92 + i} corte={corte} t={T} />)}
        <Micelio x={300} y={560} r={1500} g={g} seed={93} n={26} o={0.95} ang0={-50} abre={100} />
        <Micelio x={1700} y={300} r={900} g={kclamp(g * 1.2 - 0.2, 0, 1)} seed={94} n={16} o={0.85} ang0={120} abre={110} />
        {[[820, 395], [1240, 360], [1000, 600], [1420, 640], [760, 815], [1150, 840]].map(([x, y], i) => { const e = cpr(p, 0.25 + i * 0.06, 0.32 + i * 0.06, ease);
          return <g key={i} opacity={e}><Enzima x={x + Math.sin(T * 1.3 + i) * 12} y={y - 34} s={1.1} t={T + i} /></g>; })}
        {haces.map(([x, y, len, ang, c, nom], i) => nom && <text key={i} x={x - len / 2 + (i === 1 ? 420 : 160)} y={y - 46} fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={4} fill={CREMA} opacity={cpr(p, 0.08 + i * 0.08, 0.16 + i * 0.08)} transform={`rotate(${ang} ${x} ${y})`}>{nom}</text>)}
        <text x={150} y={700} fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={4} fill="#ffffff" opacity={cpr(p, 0.2, 0.3)}>HYPHAE</text>
        <text x={1360} y={300} fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={4} fill="#d8c2ff" opacity={cpr(p, 0.35, 0.45)}>ENZYMES</text>
      </g>
      {/* barra de escala */}
      <g transform="translate(1580 990)"><rect x={0} y={0} width={200} height={6} fill={CREMA} /><text x={100} y={-14} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} fill={CREMA}>20 µm</text></g>
      <text x={120} y={1010} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={26} fill={CREMA} opacity={0.6}>schematic</text>
      <Vineta o={0.7} />
    </g>;
  },
};
ILUSC.composta = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 700 },
  dibuja: ({ p, tl, T, capa }) => {
    const des = cpr(p, 0.15, 0.6, ease), brote = cpr(p, 0.45, 0.95, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#141a10" luz={[0.5, 0.3]} halo="#fff0c0" o={0.5} /></g>
      <g transform={capa(0.8)}><rect x={-300} y={760} width={CW + 600} height={600} fill="url(#c-tierra)" /><rect x={-300} y={760} width={CW + 600} height={600} fill="#000" opacity={0.25} /></g>
      <g transform={capa(1)}>
        <g opacity={1 - des}><BolsaSetas x={960} y={800} w={260} h={360} colonizado={1} setas={0} seed={101} /></g>
        <g opacity={des}><path d="M 700 800 Q 960 560 1220 800 Z" fill="#4a3220" />
          {Array.from({ length: 70 }, (_, i) => { const r = R(1010 + i); return <circle key={i} cx={720 + r() * 480} cy={800 - r() * 180 * (1 - Math.abs(r() - 0.5))} r={4 + r() * 8} fill={['#5a3e26', '#3e2a18', '#7a5a3a', '#efe8da'][i % 4]} />; })}</g>
        <g transform={`translate(960 ${720 - 60 * brote})`} opacity={brote}>
          <path d={`M 0 80 C -6 40 6 10 0 ${-40 * brote}`} stroke="#4f8a35" strokeWidth={8} fill="none" />
          <Hoja x={0} y={-40 * brote} len={90 * brote} ang={-150} color="#4f9a3a" /><Hoja x={0} y={-40 * brote} len={80 * brote} ang={-30} color="#5aaa42" />
        </g>
      </g>
      <Rotulo x={120} y={220} arriba="WHAT IS LEFT" texto="goes back to the soil" sub="as compost" tl={tl} at={0.2} tam={66} />
      <Polvo n={30} t={T} seed={102} o={0.4} />
      <Vineta />
    </g>;
  },
};
ILUSC.carrera = {
  cam: { z0: 1.0, z1: 1.03, fx: 960, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const sem = cpr(p, 0.05, 0.7, (q) => q) * 6;
    const comp = Math.min(0.5, sem / 6 * 0.5), seta = cpr(sem, 2.2, 5.0, ease);
    const precio = cpr(p, 0.72, 0.82, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#11100e" luz={[0.5, 0.2]} o={0.45} /></g>
      <rect x={958} y={160} width={4} height={680} fill={CREMA} opacity={0.25} />
      <text x={960} y={120} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={34} letterSpacing={6} fill={ORO}>WEEK {Math.max(1, Math.ceil(sem))}</text>
      <g transform={capa(1)}>
        {/* izquierda: montón de composta que apenas se deshace */}
        <text x={480} y={240} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={5} fill={CREMA}>COMPOST PILE</text>
        <MontonBagazo x={480} y={690} w={640} h={200} n={120} seed={111} nivel={1 - comp * 0.5} oscuro={comp} />
        <g transform="translate(220 750)"><rect x={0} y={0} width={520} height={22} rx={11} fill="#ffffff" opacity={0.12} /><rect x={0} y={0} width={520 * comp} height={22} rx={11} fill="#8a6a3a" />
          <text x={0} y={64} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={32} fill={CREMA} opacity={0.85}>still half-broken down</text></g>
        {/* derecha: bolsa de Fungi Mati con setas */}
        <text x={1440} y={240} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={5} fill={ORO}>FUNGI MATI</text>
        <BolsaSetas x={1440} y={690} w={250} h={360} colonizado={cpr(sem, 0.3, 2.4)} setas={seta} t={T} seed={112} />
        <g transform="translate(1180 750)"><rect x={0} y={0} width={520} height={22} rx={11} fill="#ffffff" opacity={0.12} /><rect x={0} y={0} width={520 * cpr(sem, 0, 5)} height={22} rx={11} fill={ORO} />
          <text x={0} y={64} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={32} fill={CREMA} opacity={0.85}>food, in four to six weeks</text></g>
        <g opacity={precio} transform={`translate(1660 ${380 - 10 * precio}) rotate(8)`}>
          <path d="M -90 -50 L 70 -50 L 110 0 L 70 50 L -90 50 Z" fill={ORO} /><circle cx={-60} cy={0} r={10} fill="#11100e" />
          <text x={20} y={14} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={36} fill="#1a1308">$ / kg</text>
        </g>
      </g>
      <Polvo n={30} t={T} seed={113} o={0.35} />
      <Vineta />
    </g>;
  },
};
ILUSC.mitad = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 600 },
  dibuja: ({ p, tl, T, capa }) => {
    const a = cpr(tl, 0.3, 1.2, ease), b = cpr(tl, 0.9, 1.8, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#12110e" luz={[0.5, 0.3]} o={0.45} /></g>
      <g transform={capa(1)}>
        <text x={960} y={190} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={6} fill={ORO}>SUBSTRATE COST PER TONNE</text>
        <rect x={560} y={760 - 480 * a} width={300} height={480 * a} rx={10} fill="#6d6a64" /><rect x={560} y={760 - 480 * a} width={300} height={480 * a} rx={10} fill="url(#c-cilindro)" opacity={0.6} />
        <rect x={1060} y={760 - 240 * b} width={300} height={240 * b} rx={10} fill={ORO} /><rect x={1060} y={760 - 240 * b} width={300} height={240 * b} rx={10} fill="url(#c-cilindro)" opacity={0.6} />
        <rect x={420} y={758} width={1080} height={4} fill={CREMA} opacity={0.5} />
        <text x={710} y={815} textAnchor="middle" fontFamily={FUENTE.serif} fontSize={38} fill={CREMA}>conventional</text>
        <text x={1210} y={815} textAnchor="middle" fontFamily={FUENTE.serif} fontSize={38} fill={CREMA}>pelletized bagasse</text>
        <text x={1210} y={480} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={110} fill={CREMA} opacity={b}>≈ ½</text>
      </g>
      <Vineta />
    </g>;
  },
};

/* ================= 4. EL PILOTO ================= */
ILUSC.antes_despues = {
  cam: { z0: 1.0, z1: 1.0 },
  dibuja: ({ p, tl, T }) => {
    const wipe = cpr(p, 0.35, 0.62, ease);
    const xw = lerp(CW, 0, wipe);
    return <g>
      <FotoS id="ad1" src="robert/granja_prepa_antes" z={1.04 + 0.06 * p} fy={0.4} />
      <clipPath id="ad-clip"><rect x={xw} y={0} width={CW} height={CH} /></clipPath>
      <g clipPath="url(#ad-clip)"><FotoS id="ad2" src="robert/granja_prepa_despues" z={1.08 - 0.04 * p} fy={0.35} /></g>
      <rect x={xw - 3} y={0} width={6} height={CH} fill={ORO} opacity={wipe > 0 && wipe < 1 ? 1 : 0} />
      <Velo lado="arriba" o={0.75} />
      <g transform="translate(80 120)" opacity={1 - wipe}><rect x={0} y={-50} width={220} height={66} rx={8} fill="#0c0d10" opacity={0.75} /><text x={110} y={-5} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={30} letterSpacing={6} fill={CREMA}>BEFORE</text></g>
      <g transform="translate(80 120)" opacity={wipe}><rect x={0} y={-50} width={220} height={66} rx={8} fill={ORO} /><text x={110} y={-5} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={30} letterSpacing={6} fill="#1a1308">AFTER</text></g>
      <Rotulo x={1800} y={110} alinear="end" arriba="PREPATEC GUADALAJARA · 2026" texto="a permanent mushroom farm" sub="grant from Tec de Monterrey (Ruta Azul)" tl={tl} at={0.4} tam={54} />
      <Vineta o={0.5} />
    </g>;
  },
};
ILUSC.pilot_numeros = {
  cam: { z0: 1.0, z1: 1.0 },
  dibuja: ({ p, tl, T, dur }) => {
    const B = cpr(p, 0.45, 0.55, ease);
    return <g>
      <g opacity={1 - B}><FotoS id="pn1" src="robert/curso_ruta_azul_1" z={1.04 + 0.08 * p} fx={0.5} fy={0.4} /></g>
      <g opacity={B}><FotoS id="pn2" src="robert/granja_prepa_cosecha" z={1.1 + 0.06 * p} fx={0.55} fy={0.45} /></g>
      <Velo lado="der" o={0.92} />
      <g transform="translate(1250 300)">
        <Cuenta x={0} y={130} hasta={50} tl={tl} at={0.4} dura={1.2} tam={170} color={CREMA} />
        <Txt x={6} y={190} tam={40} ital o={cpr(tl, 0.8, 1.4)}>students in the course</Txt>
        <g opacity={B}><Cuenta x={0} y={420} hasta={85} tl={tl - dur * 0.47} at={0.1} dura={1.2} tam={170} color={ORO} />
          <Txt x={6} y={480} tam={40} ital>people reached; every harvest</Txt><Txt x={6} y={528} tam={40} ital>went back to the community</Txt></g>
      </g>
      <Vineta o={0.5} />
    </g>;
  },
};

/* ================= 5. TUTOR DE IA ================= */
function Alumno({ x, y, s = 1, c = '#3a4a6a', piel = '#b7835a', luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 40 Q -34 0 0 -4 Q 34 0 34 40 Z" fill={c} /><circle cx={0} cy={-26} r={22} fill={piel} /><path d="M -22 -32 Q 0 -56 22 -32 Q 12 -42 0 -42 Q -14 -42 -22 -32 Z" fill="#1d1612" />
    {luz > 0 && <ellipse cx={0} cy={-20} rx={30} ry={34} fill="#8fd0ff" opacity={0.25 * luz} />}
  </g>;
}
ILUSC.tutor = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 560 },
  dibuja: ({ p, tl, T, capa }) => {
    const a = cpr(p, 0.05, 0.25, ease), b = cpr(p, 0.3, 0.5, ease);
    const burb = ['How wet should the substrate be?', 'When do I open the bag?', 'Is this green spot contamination?'];
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0f1218" luz={[0.3, 0.4]} halo="#9fd3ff" o={0.4} /><Halo x={1500} y={420} r={600} color="#ffe2b8" o={0.3} /></g>
      <rect x={958} y={150} width={4} height={800} fill={CREMA} opacity={0.2} />
      <g transform={capa(1)}>
        <text x={480} y={200} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={5} fill="#9fd3ff" opacity={a}>WITH THE AI TUTOR · 25</text>
        <text x={1440} y={200} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={5} fill={ORO} opacity={b}>TRADITIONAL · 25</text>
        {/* pantalla con diapositivas y chat */}
        <g opacity={a} transform="translate(480 400)">
          <rect x={-300} y={-150} width={600} height={300} rx={16} fill="#18202c" /><rect x={-300} y={-150} width={600} height={300} rx={16} fill="none" stroke="#9fd3ff" strokeOpacity={0.6} strokeWidth={3} />
          <rect x={-270} y={-120} width={250} height={150} rx={8} fill="#f3efe6" /><rect x={-250} y={-100} width={140} height={14} rx={4} fill="#2a2a2e" /><rect x={-250} y={-72} width={190} height={10} rx={4} fill="#8a8680" /><rect x={-250} y={-52} width={170} height={10} rx={4} fill="#8a8680" />
          <text x={-145} y={65} textAnchor="middle" fontFamily={FUENTE.mono} fontSize={18} fill="#cfe0ff">Google Slides</text>
          {burb.map((s, i) => { const e = cpr(p, 0.08 + i * 0.1, 0.14 + i * 0.1, ease); return <g key={i} opacity={e} transform={`translate(0 ${-110 + i * 80})`}>
            <rect x={0} y={0} width={280} height={56} rx={16} fill={i % 2 ? '#2c3b52' : '#3a5a86'} /><text x={14} y={35} fontFamily={FUENTE.texto} fontSize={17} fill="#fff">{s}</text></g>; })}
        </g>
        {Array.from({ length: 25 }, (_, i) => <Alumno key={i} x={200 + (i % 9) * 70 + (Math.floor(i / 9) % 2) * 35} y={680 + Math.floor(i / 9) * 74} s={0.9} c={['#3a4a6a', '#6a3a4a', '#3a6a5a', '#6a5a3a'][i % 4]} luz={a} />).map((el, i) => <g key={i} opacity={cpr(p, 0.05 + i * 0.006, 0.1 + i * 0.006)}>{el}</g>)}
        {/* pizarrón */}
        <g opacity={b} transform="translate(1440 400)">
          <rect x={-300} y={-150} width={600} height={300} rx={8} fill="#24402e" /><rect x={-300} y={-150} width={600} height={300} rx={8} fill="none" stroke="#8a6a3a" strokeWidth={14} />
          <text x={-250} y={-70} fontFamily={FUENTE.mano} fontSize={54} fill="#f2efe6">Pleurotus</text>
          <path d="M -250 -10 L 200 -10 M -250 50 L 120 50" stroke="#f2efe6" strokeWidth={4} opacity={0.6} />
        </g>
        {Array.from({ length: 25 }, (_, i) => <g key={i} opacity={cpr(p, 0.3 + i * 0.006, 0.35 + i * 0.006)}><Alumno x={1160 + (i % 9) * 70 + (Math.floor(i / 9) % 2) * 35} y={680 + Math.floor(i / 9) * 74} s={0.9} c={['#4a4a6a', '#6a4a3a', '#3a5a6a', '#5a6a3a'][i % 4]} /></g>)}
        <text x={480} y={596} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill={CREMA} opacity={a * 0.85}>built on ChatGPT with my own materials</text>
      </g>
      <Vineta o={0.6} />
    </g>;
  },
};
ILUSC.chatbot = {
  cam: { z0: 1.0, z1: 1.05, fx: 760, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const msgs = [['How long until my first harvest?', 0], ['¿Cuánto tarda en fructificar?', 1], ['Combien de temps avant la récolte ?', 0], ['Quanto tempo até a colheita?', 1]];
    const hora = lerp(9, 33, p);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0e1016" luz={[0.4, 0.45]} halo="#d9c2ff" o={0.4} /><Bokeh n={14} t={T} seed={151} o={0.3} colores={['#d9c2ff', '#9fd3ff', '#ffe2b8']} /></g>
      <g transform={capa(1)}>
        <g transform="translate(760 470) scale(0.86)">
          <rect x={-230} y={-430} width={460} height={860} rx={60} fill="#101114" /><rect x={-214} y={-414} width={428} height={828} rx={48} fill="#f6f3ec" />
          <rect x={-60} y={-400} width={120} height={22} rx={11} fill="#101114" />
          <text x={0} y={-330} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} fill="#3a3530">FUNGI MATI GROWER</text>
          {msgs.map(([s, lado], i) => { const e = cpr(p, 0.08 + i * 0.18, 0.14 + i * 0.18, ease); const y = -280 + i * 150;
            return <g key={i} opacity={e} transform={`translate(0 ${y + (1 - e) * 20})`}>
              <rect x={-190} y={0} width={340} height={64} rx={20} fill="#e3ddd1" /><text x={-172} y={40} fontFamily={FUENTE.texto} fontSize={19} fill="#1d1a17">{s}</text>
              <g opacity={cpr(p, 0.14 + i * 0.18, 0.2 + i * 0.18)}><rect x={-140} y={74} width={330} height={52} rx={20} fill="#c9a44a" /><rect x={-120} y={94} width={220} height={10} rx={5} fill="#1a1308" opacity={0.5} /><rect x={-120} y={110} width={150} height={8} rx={4} fill="#1a1308" opacity={0.35} /></g>
            </g>; })}
        </g>
        {/* reloj de 24 horas */}
        <g transform="translate(1420 420)">
          <circle r={170} fill="#0c0d10" opacity={0.8} /><circle r={170} fill="none" stroke={ORO} strokeWidth={4} />
          {Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * 2 * Math.PI; return <line key={i} x1={Math.sin(a) * 150} y1={-Math.cos(a) * 150} x2={Math.sin(a) * (i % 6 ? 140 : 126)} y2={-Math.cos(a) * (i % 6 ? 140 : 126)} stroke={CREMA} strokeWidth={i % 6 ? 2 : 5} />; })}
          <line x1={0} y1={0} x2={Math.sin(hora / 24 * 2 * Math.PI) * 110} y2={-Math.cos(hora / 24 * 2 * Math.PI) * 110} stroke={ORO} strokeWidth={8} strokeLinecap="round" />
          <circle r={10} fill={ORO} />
          <text x={0} y={240} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={30} letterSpacing={6} fill={CREMA}>ANY LANGUAGE · ANY HOUR</text>
        </g>
        <Rotulo x={1150} y={760} arriba="NEXT VERSION" texto="a chatbot built on Claude" tl={tl} at={0.4} tam={54} />
      </g>
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 6. INVESTIGACIÓN ================= */
ILUSC.cruza = {
  cam: { z0: 1.0, z1: 1.12, fx: 960, fy: 560 },
  dibuja: ({ p, tl, T, capa }) => {
    const g = cpr(p, 0.05, 0.6, (q) => q), enc = cpr(p, 0.55, 0.7, ease), lupa = cpr(p, 0.62, 0.78, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0d1114" luz={[0.5, 0.2]} halo="#e8f4ff" o={0.45} /></g>
      <g transform={capa(1)}>
        <rect x={-300} y={820} width={CW + 600} height={500} fill="#1d2226" />
        <Petri x={960} y={600} r={460} medio="#e7d6a2" inclina={0.5} id="cz">
          <Micelio x={-230} y={0} r={420} g={g * 0.6} seed={161} n={40} o={1} />
          <Micelio x={230} y={0} r={420} g={g * 0.6} seed={162} n={40} o={1} color="#fff8ee" />
          <ellipse cx={0} cy={0} rx={50 * enc} ry={200 * enc} fill={ORO} opacity={0.35 * enc} />
        </Petri>
        <text x={560} y={300} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={3} fill={CREMA} opacity={cpr(p, 0.08, 0.16)}>STRAIN A</text>
        <text x={560} y={332} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill={CREMA} opacity={cpr(p, 0.1, 0.18)}>Pleurotus ostreatus</text>
        <text x={1360} y={300} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={3} fill={CREMA} opacity={cpr(p, 0.12, 0.2)}>STRAIN B</text>
        <text x={1360} y={332} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill={CREMA} opacity={cpr(p, 0.14, 0.22)}>P. ostreatus var. columbinus</text>
        {/* lupa: hifa con fíbula (clamp connection) */}
        <g opacity={lupa} transform={`translate(1600 560) scale(${0.68 + 0.14 * lupa})`}>
          <circle r={190} fill="#0c1a1c" /><circle r={190} fill="none" stroke="url(#c-laton)" strokeWidth={16} />
          <path d="M -170 10 L 170 -10" stroke="#f6f3ea" strokeWidth={22} strokeLinecap="round" />
          <path d="M -20 0 Q -10 -50 30 -46 Q 54 -40 44 -6" stroke="#f6f3ea" strokeWidth={12} fill="none" strokeLinecap="round" />
          <line x1={10} y1={-20} x2={10} y2={22} stroke="#9a907c" strokeWidth={4} />
          <circle cx={-80} cy={6} r={7} fill="#b18cff" /><circle cx={-56} cy={4} r={7} fill="#7fe6ff" /><circle cx={90} cy={-5} r={7} fill="#b18cff" /><circle cx={114} cy={-7} r={7} fill="#7fe6ff" />
          <text x={0} y={250} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={3} fill={CREMA}>CLAMP CONNECTION</text>
          <text x={0} y={282} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={26} fill={CREMA} opacity={0.85}>= a successful cross</text>
        </g>
      </g>
      <Rotulo x={120} y={150} arriba="APPROVED PROJECT" texto="breeding a strain for bagasse" tl={tl} at={0.3} tam={54} />
      <Vineta o={0.6} />
    </g>;
  },
};
function IconoResiduo({ tipo, x, y, e, t }) {
  return <g opacity={e} transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * e})`}>
    <circle r={130} fill="#0c0d10" opacity={0.85} /><circle r={130} fill="none" stroke={ORO} strokeWidth={3} />
    {tipo === 'cafe' && Array.from({ length: 9 }, (_, i) => { const a = i * 0.7, rr = 22 + (i % 3) * 18; return <g key={i}><ellipse cx={Math.cos(a) * rr} cy={Math.sin(a) * rr - 10} rx={22} ry={20} fill={i % 2 ? '#a3202a' : '#c8343a'} /><ellipse cx={Math.cos(a) * rr} cy={Math.sin(a) * rr - 10} rx={22} ry={20} fill="url(#c-esfera)" /></g>; })}
    {tipo === 'maiz' && <g><path d="M -10 90 Q -4 0 10 -90" stroke="#c9a85a" strokeWidth={14} fill="none" /><path d="M 0 30 Q -70 0 -90 -50" stroke="#b89848" strokeWidth={10} fill="none" /><path d="M 4 -10 Q 70 -30 84 -84" stroke="#b89848" strokeWidth={10} fill="none" /><path d="M -4 70 Q 60 50 80 10" stroke="#a88838" strokeWidth={9} fill="none" /></g>}
    {tipo === 'cana' && [-40, 0, 40].map((dx, i) => <g key={i}><rect x={dx - 12} y={-90} width={24} height={180} rx={10} fill={['#8aa84a', '#a0b85a', '#7a9a3a'][i]} />{[-50, 0, 50].map((dy, j) => <rect key={j} x={dx - 14} y={dy} width={28} height={6} fill="#5a6a2a" />)}</g>)}
    {tipo === 'agave' && Array.from({ length: 9 }, (_, i) => { const a = (-160 + i * 17.5) * Math.PI / 180; return <path key={i} d={`M 0 60 L ${Math.cos(a) * 110} ${Math.sin(a) * 110 + 40}`} stroke="#6a9a9a" strokeWidth={16} strokeLinecap="round" />; })}
  </g>;
}
ILUSC.residuos = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const items = [['agave', 'agave bagasse', 480, 260, 0.02], ['cafe', 'coffee pulp', 1440, 260, 0.25], ['maiz', 'corn stover', 480, 690, 0.4], ['cana', 'sugarcane bagasse', 1440, 690, 0.55]];
    return <g>
      <g transform={capa(0.3)}><Estudio color="#10120f" luz={[0.5, 0.5]} o={0.5} /><Bokeh n={16} t={T} seed={171} o={0.3} /></g>
      <g transform={capa(1)}>
        {items.map(([k, , x, y, at], i) => { const e = cpr(p, at + 0.05, at + 0.15, ease); return <path key={i} d={`M 960 480 L ${x} ${y}`} stroke={ORO} strokeWidth={4} strokeDasharray="12 10" opacity={e * 0.8} strokeDashoffset={-T * 40} />; })}
        <g transform="translate(960 480)"><circle r={150} fill="#0c0d10" opacity={0.9} /><circle r={150} fill="none" stroke={ORO} strokeWidth={5} style={{ filter: `drop-shadow(0 0 18px ${ORO})` }} />
          <SetasRepisa x={0} y={50} g={1} t={T} seed={172} tam={90} n={6} /></g>
        {items.map(([k, nom, x, y, at], i) => { const e = cpr(p, at, at + 0.1, ease); return <g key={i}><IconoResiduo tipo={k} x={x} y={y} e={e} t={T} />
          <text x={x} y={y + 175} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={40} fill={CREMA} opacity={e}>{nom}</text></g>; })}
      </g>
      <g opacity={cpr(p, 0.65, 0.75)} transform="translate(960 800)"><rect x={-190} y={-42} width={380} height={64} rx={32} fill="none" stroke={CREMA} strokeOpacity={0.6} strokeWidth={2} />
        <text x={0} y={2} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={6} fill={CREMA}>EXPLORATORY</text></g>
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 7. LA GRANJA EN CASA ================= */
ILUSC.premio = {
  cam: { z0: 1.0, z1: 1.04, fx: 760, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => <g>
    <g transform={capa(0.3)}><Estudio color="#0e1120" luz={[0.3, 0.4]} halo="#ffe2a0" o={0.45} /><Bokeh n={18} t={T} seed={181} o={0.35} /></g>
    <g transform={capa(1)}>
      <Cuenta x={140} y={560} hasta={5000} tl={tl} at={0.25} dura={1.4} tam={220} prefijo="$" color={CREMA} />
      <Txt x={150} y={640} tam={40} fam={FUENTE.mono} peso={700} esp={6} color={ORO} o={cpr(tl, 0.6, 1.1)}>USD AWARD</Txt>
      <Txt x={150} y={710} tam={40} ital o={cpr(tl, 0.9, 1.5)}>Rise Innovation Fund Challenge 2026</Txt>
      <Txt x={150} y={760} tam={40} ital o={cpr(tl, 1.0, 1.6)}>Equitech Futures</Txt>
      <g opacity={cpr(tl, 0.3, 1.0, ease)} transform={`translate(1380 ${540 + (1 - cpr(tl, 0.3, 1.0, ease)) * 30}) rotate(2.5)`}>
        <rect x={-300} y={-380} width={600} height={760} rx={6} fill="#f3efe6" style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,.6))' }} />
        <FotoS id="pr1" src="robert/rise_equitech_spotlight" x={-288} y={-368} w={576} h={736} z={1.0 + 0.04 * p} fy={0.4} />
      </g>
    </g>
    <Vineta o={0.6} />
  </g>,
};
ILUSC.cuarto = {
  cam: { z0: 1.0, z1: 1.06, fx: 900, fy: 560 },
  dibuja: ({ p, tl, T, capa }) => {
    const tarima = lerp(2400, 1480, cpr(p, 0.2, 0.65, ease));
    return <g>
      <g transform={capa(0.4)}>
        <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill="#151a1d" />
        <rect x={200} y={170} width={1060} height={700} fill="#d7dcd8" /><rect x={200} y={170} width={1060} height={700} fill="url(#c-arriba)" opacity={0.5} />
        <Halo x={730} y={300} r={600} color="#ffffff" o={0.3} />
      </g>
      <g transform={capa(0.85)}>
        {/* repisas con bolsas fructificando */}
        {[0, 1, 2].map((f) => <g key={f}><rect x={260} y={380 + f * 170} width={720} height={10} fill="url(#c-acero)" />
          {[0, 1, 2, 3, 4].map((c) => <BolsaSetas key={c} x={330 + c * 140} y={378 + f * 170} w={90} h={140} colonizado={1} setas={0.6 + 0.4 * Math.sin(c + f)} t={T} seed={190 + f * 5 + c} />)}</g>)}
        {/* humidificador ultrasónico: niebla */}
        <rect x={1050} y={720} width={140} height={130} rx={14} fill="#eef2f4" /><rect x={1095} y={700} width={50} height={24} rx={6} fill="#c9d3d8" />
        <Humo x={1120} y={700} t={T} n={12} seed={191} alto={360} ancho={120} o={0.8} color="#ffffff" />
        {/* toma de aire con filtro y extractor: presión negativa */}
        <rect x={1180} y={230} width={70} height={110} rx={6} fill="#f6f1e4" /><rect x={1180} y={230} width={70} height={110} rx={6} fill="none" stroke="#9aa3ad" strokeWidth={3} />
        {[0, 1, 2].map((i) => { const k = (T * 0.8 + i / 3) % 1; return <path key={i} d={`M ${1420 - k * 180} ${285} l -30 -18 m 30 18 l -30 18`} stroke="#9fd3ff" strokeWidth={6} fill="none" opacity={Math.sin(k * Math.PI)} strokeLinecap="round" />; })}
        <g transform={`translate(240 230) rotate(${T * 360})`}>{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={0} cy={-24} rx={12} ry={24} fill="#5a646d" transform={`rotate(${i * 90})`} />)}</g>
        <circle cx={240} cy={230} r={44} fill="none" stroke="#5a646d" strokeWidth={5} />
        {[0, 1, 2].map((i) => { const k = (T * 0.8 + i / 3) % 1; return <path key={i} d={`M ${190 - k * 180} 230 l -30 -18 m 30 18 l -30 18`} stroke="#ffb36b" strokeWidth={6} fill="none" opacity={Math.sin(k * Math.PI)} strokeLinecap="round" />; })}
        <text x={1215} y={380} textAnchor="middle" fontFamily={FUENTE.mono} fontSize={18} fill="#2a3036">FILTERED AIR IN</text>
        <text x={240} y={310} textAnchor="middle" fontFamily={FUENTE.mono} fontSize={18} fill="#2a3036">EXTRACTOR</text>
      </g>
      <g transform={capa(1)}>
        <rect x={-300} y={870} width={CW + 600} height={400} fill="#2a2e31" />
        {/* tarima con costales de pellets */}
        <g transform={`translate(${tarima} 870)`}>
          <Sombra x={0} y={6} rx={260} ry={16} o={0.7} />
          <rect x={-250} y={-36} width={500} height={36} fill="url(#c-madera-pino)" />
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <g key={r + '-' + c}><rect x={-235 + c * 160 + (r % 2) * 20} y={-36 - (r + 1) * 92} width={150} height={88} rx={14} fill="#d8c8a2" /><rect x={-235 + c * 160 + (r % 2) * 20} y={-36 - (r + 1) * 92} width={150} height={88} rx={14} fill="url(#c-cilindro)" opacity={0.5} /></g>))}
          <rect x={-120} y={-200} width={240} height={70} rx={10} fill={ORO} /><text x={0} y={-152} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={36} fill="#1a1308">1 t PELLETS</text>
        </g>
      </g>
      <Rotulo x={1300} y={170} arriba="FRUITING ROOM" texto="negative pressure" sub="ultrasonic humidity" tl={tl} at={0.2} tam={54} />
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 8. AÑO UNO ================= */
ILUSC.metas = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const m1 = cpr(p, 0.05, 0.3, ease), m2 = cpr(p, 0.3, 0.55, ease), red = cpr(p, 0.55, 0.9, (q) => q);
    const rest = [[1520, 300], [1700, 420], [1640, 620], [1460, 760], [1760, 760], [1300, 560]];
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0e1012" luz={[0.3, 0.45]} o={0.4} />
        {/* mapa abstracto: anillos viales y cuadrícula */}
        <g opacity={0.35}>{Array.from({ length: 24 }, (_, i) => <line key={i} x1={1000 + i * 40} y1={120} x2={1000 + i * 40} y2={960} stroke="#2e3640" strokeWidth={1} />)}
          {Array.from({ length: 22 }, (_, i) => <line key={i} x1={1000} y1={120 + i * 40} x2={1920} y2={120 + i * 40} stroke="#2e3640" strokeWidth={1} />)}
          <ellipse cx={1520} cy={540} rx={330} ry={300} fill="none" stroke="#5a6470" strokeWidth={6} /><ellipse cx={1520} cy={540} rx={190} ry={170} fill="none" stroke="#5a6470" strokeWidth={4} /></g>
      </g>
      <g transform={capa(1)}>
        <text x={120} y={170} fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} letterSpacing={6} fill={ORO}>YEAR ONE</text>
        <g transform="translate(300 470)"><Medidor r={150} v={m1} /><text y={30} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={96} fill={CREMA}>{(m1).toFixed(m1 < 1 ? 1 : 0)} t</text></g>
        <text x={300} y={700} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill={CREMA} opacity={m1}>bagasse diverted</text>
        <text x={300} y={742} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill={CREMA} opacity={m1}>from burning</text>
        <g transform="translate(720 470)"><Medidor r={150} v={m2} color="#efe8da" /><text y={30} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={88} fill={CREMA}>{Math.round(600 * m2)}</text><text y={84} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={28} fill={CREMA}>kg</text></g>
        <text x={720} y={700} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill={CREMA} opacity={m2}>mushrooms sold</text>
        <text x={720} y={742} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill={CREMA} opacity={m2}>(at least)</text>
        {/* red: granja → distribuidor → restaurantes */}
        <path d={`M 1180 800 L ${lerp(1180, 1520, kclamp(red * 3, 0, 1))} ${lerp(800, 540, kclamp(red * 3, 0, 1))}`} stroke={ORO} strokeWidth={5} />
        {rest.map(([x, y], i) => { const k = cpr(red, 0.33 + i * 0.09, 0.45 + i * 0.09); return <g key={i}><path d={`M 1520 540 L ${lerp(1520, x, k)} ${lerp(540, y, k)}`} stroke="#efe8da" strokeWidth={3} opacity={0.8} />
          <g opacity={k} transform={`translate(${x} ${y})`}><circle r={26} fill="#0c0d10" /><circle r={26} fill="none" stroke="#efe8da" strokeWidth={3} /><path d="M -9 -10 L -9 10 M 8 -10 Q 14 0 8 4 L 8 10" stroke="#efe8da" strokeWidth={3} fill="none" /></g></g>; })}
        <g transform="translate(1180 800)"><circle r={36} fill={ORO} /><text y={70} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} fill={CREMA}>FARM · ZAPOPAN</text></g>
        <g transform="translate(1520 540)" opacity={cpr(red, 0.25, 0.35)}><circle r={40} fill="#0c0d10" /><circle r={40} fill="none" stroke={ORO} strokeWidth={4} /><text y={-56} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} fill={CREMA}>DISTRIBUTOR</text></g>
        <text x={1520} y={170} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={4} fill={CREMA} opacity={cpr(red, 0.4, 0.6) * 0.8}>GUADALAJARA METRO AREA · RESTAURANTS</text>
      </g>
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 9. POR QUÉ SOLVE ================= */
ILUSC.pedidos = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 540 },
  dibuja: ({ p, tl, T, capa }) => {
    const at = [0.12, 0.33, 0.66];
    const cards = [['01', 'Offtake agreements', 'with restaurants'], ['02', 'Tequila-industry', 'connections'], ['03', 'Mentors', 'from one pilot to many']];
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0f0f12" luz={[0.5, 0.3]} o={0.45} /><Bokeh n={16} t={T} seed={211} o={0.3} /></g>
      <g transform={capa(1)}>
        <text x={960} y={190} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={30} letterSpacing={8} fill={ORO} opacity={cpr(tl, 0.1, 0.6)}>WHAT I NEED FROM SOLVE</text>
        {cards.map(([n, a, b], i) => { const e = cpr(p, at[i], at[i] + 0.06, ease), act = cpr(p, at[i], at[i] + 0.04) * (1 - (i < 2 ? cpr(p, at[i + 1], at[i + 1] + 0.04) : 0));
          const x = 180 + i * 540;
          return <Tarjeta key={i} x={x} y={300} w={480} h={560} e={e} acento={act > 0.5 ? ORO : '#8a8680'}>
            <text x={40} y={90} fontFamily={FUENTE.mono} fontWeight={700} fontSize={40} fill={ORO}>{n}</text>
            <g transform="translate(240 250)">
              {i === 0 && <g><rect x={-90} y={-110} width={180} height={220} rx={10} fill="#f3efe6" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-64} y={-80 + k * 30} width={k === 4 ? 70 : 128} height={10} rx={5} fill="#8a8680" />)}<path d="M -60 80 q 20 -24 40 0 t 40 0" stroke="#2346ff" strokeWidth={4} fill="none" /></g>}
              {i === 1 && <g><rect x={-120} y={-40} width={110} height={120} fill="#8a5a3a" /><path d="M -130 -40 L -65 -100 L 0 -40 Z" fill="#6a3a22" /><rect x={-40} y={-140} width={24} height={100} fill="#6a3a22" />
                <path d="M 0 30 L 60 30" stroke={ORO} strokeWidth={6} strokeDasharray="10 8" strokeDashoffset={-T * 30} /><circle cx={100} cy={30} r={40} fill="#efe8da" /><SetasRepisa x={100} y={50} g={1} t={T} seed={212} tam={40} n={4} /></g>}
              {i === 2 && <g><circle cx={-100} cy={0} r={26} fill={ORO} />{Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI - Math.PI / 2, e2 = cpr(p, at[2] + 0.05 + k * 0.015, at[2] + 0.09 + k * 0.015);
                return <g key={k} opacity={e2}><path d={`M -100 0 L ${40 + Math.cos(a) * 70} ${Math.sin(a) * 110}`} stroke="#efe8da" strokeWidth={2} opacity={0.6} /><circle cx={40 + Math.cos(a) * 70} cy={Math.sin(a) * 110} r={14} fill="#efe8da" /></g>; })}</g>}
            </g>
            <text x={40} y={450} fontFamily={FUENTE.serif} fontWeight={600} fontSize={44} fill={CREMA}>{a}</text>
            <text x={40} y={504} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={36} fill={CREMA} opacity={0.85}>{b}</text>
          </Tarjeta>; })}
      </g>
      <Vineta o={0.6} />
    </g>;
  },
};

/* ================= 10. CIERRE ================= */
ILUSC.nombre = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 520 },
  dibuja: ({ p, tl, T, capa }) => {
    const a = cpr(tl, 0.2, 1.0, ease), b = cpr(tl, 1.0, 1.8, ease);
    return <g>
      <g transform={capa(0.3)}><Estudio color="#14110d" luz={[0.5, 0.4]} o={0.55} /><Bokeh n={18} t={T} seed={221} o={0.35} /></g>
      <g transform={capa(1)}>
        <text x={700} y={500} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={220} fill={CREMA} opacity={a} style={{ fontVariationSettings: "'opsz' 144" }}>Fungi</text>
        <text x={700} y={590} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={46} fill={CREMA} opacity={a * 0.85}>fungi</text>
        <text x={1290} y={500} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontStyle="italic" fontSize={220} fill={ORO} opacity={b} style={{ fontVariationSettings: "'opsz' 144" }}>Mati</text>
        <text x={1290} y={590} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={46} fill={CREMA} opacity={b * 0.85}>Nahuatl: “knowing”</text>
        <rect x={960 - 300 * b} y={650} width={600 * b} height={3} fill={ORO} />
      </g>
      <Polvo n={40} t={T} seed={222} o={0.45} />
      <Vineta />
    </g>;
  },
};
ILUSC.cierre = {
  cam: { z0: 1.0, z1: 1.0 },
  dibuja: ({ p, tl, T, capa }) => {
    const g = cpr(p, 0.1, 0.8, ease);
    return <g>
      <g transform={capa(0.3)}><FotoS id="ci1" src="web/paisaje_agavero_2" z={1.2 - 0.12 * p} fx={0.5} fy={0.62} /></g>
      <Halo x={1300} y={420} r={700} color="#ffb877" o={0.35} />
      <Velo lado="abajo" o={0.85} />
      <g transform={capa(1.15)}>
        <MontonBagazo x={960} y={1120} w={1700} h={200} n={180} seed={231} oscuro={0.15} />
        <SetasRepisa x={560} y={1000} g={g} t={T} seed={232} tam={210} n={8} />
        <SetasRepisa x={1000} y={1030} g={kclamp(g * 1.15 - 0.1, 0, 1)} t={T} seed={233} tam={240} n={9} color="#efe8da" />
        <SetasRepisa x={1420} y={1010} g={kclamp(g * 1.3 - 0.25, 0, 1)} t={T} seed={234} tam={200} n={7} />
      </g>
      <Polvo n={45} t={T} seed={235} o={0.5} />
      <Txt x={960} y={220} tam={64} ancla="middle" o={cpr(tl, 0.4, 1.2)}>the residue Jalisco has too much of</Txt>
      <Txt x={960} y={300} tam={64} ancla="middle" ital color={ORO} o={cpr(tl, 1.2, 2.0)}>becomes food, in weeks</Txt>
      <Vineta o={0.6} />
    </g>;
  },
};
ILUSC.final = {
  cam: { z0: 1.0, z1: 1.03 },
  dibuja: ({ p, tl, T, capa }) => {
    const a = cpr(tl, 0.1, 0.9, ease), b = cpr(tl, 0.6, 1.4, ease);
    const creditos = 'Photos: Juan Carlos Fonseca Mata (CC BY-SA 4.0), Tomascastelazo (CC BY-SA 4.0), Tobias Hesse (CC BY 2.5), Gzzz (CC BY-SA 4.0), via Wikimedia Commons. Other photos: Roberto Carlos Navarro Félix.';
    return <g>
      <g transform={capa(0.3)}><Estudio color="#0d0c0a" luz={[0.5, 0.4]} o={0.45} /><Bokeh n={16} t={T} seed={241} o={0.3} /></g>
      <g transform={capa(1)}>
        <MarcaFM x={960} y={430} tam={200} e={a} />
        <rect x={960 - 260 * a} y={480} width={520 * a} height={3} fill={ORO} />
        <text x={960} y={560} textAnchor="middle" fontFamily={FUENTE.serif} fontSize={44} fill={CREMA} opacity={b}>Roberto Carlos Navarro Félix</text>
        <text x={960} y={615} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill={CREMA} opacity={b * 0.85}>Zapopan, Jalisco, Mexico · MIT Solve 2027 Global Climate Challenge</text>
        <g opacity={b} transform="translate(960 720)"><image href="video/logo_color.svg" x={-260} y={-40} width={80} height={80} />
          <text x={-160} y={12} fontFamily={FUENTE.mono} fontWeight={700} fontSize={30} fill={CREMA}>@lacreaciondelrobert</text></g>
        <text x={960} y={1010} textAnchor="middle" fontFamily={FUENTE.texto} fontSize={17} fill={CREMA} opacity={b * 0.6}>{creditos}</text>
      </g>
      <rect x={0} y={0} width={CW} height={CH} fill="#000" opacity={cpr(p, 0.85, 1)} />
    </g>;
  },
};
