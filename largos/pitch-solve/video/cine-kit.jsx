// cine-kit.jsx — piezas del estilo "documental de cine" para las ilustraciones del largo.
// Todo es SVG en coordenadas 1920×1080, dibujado en función del tiempo (t en segundos, p de 0 a 1).
// Estilo: sin contornos gruesos; volumen con degradados, luz de ventana, sombras suaves, texturas reales
// (madera, tierra, papel), profundidad de campo (desenfoque al frente y al fondo) y polvo en la luz.
// Las definiciones compartidas (degradados, filtros, texturas) viven en <CineDefs/>, que doc-largo.jsx monta una sola vez.

const CW = 1920, CH = 1080;
const TEX = (n) => 'video/tex/' + n + '.png';
const FUENTE = { serif: "'Fraunces', Georgia, serif", mano: "'Caveat', 'Comic Sans MS', cursive", mono: "'Space Mono', ui-monospace, monospace", texto: "'Archivo', 'Arial', sans-serif" };
const suave3 = (x) => 1 - Math.pow(1 - x, 3);
const cpr = (v, a, b, e) => kprog(v, a, b, e);
const cpop = (v, a, b = a + 0.08) => suave3(kprog(v, a, b));
const lerp = klerp;
const R = (seed) => krng(seed);
// Mezcla de color en hex y oscurecer/aclarar.
const mix = (a, b, t) => mixHex(a, b, kclamp(t, 0, 1));
const osc = (c, t) => mix(c, '#000000', t);
const cla = (c, t) => mix(c, '#ffffff', t);

/* ============ definiciones compartidas ============ */
function CineDefs() {
  const blur = (id, s) => <filter id={id} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation={s} /></filter>;
  const tex = (id, src, w, h) => <pattern id={id} patternUnits="userSpaceOnUse" width={w} height={h}><image href={TEX(src)} width={w} height={h} preserveAspectRatio="none" /></pattern>;
  return <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
    <defs>
      {blur('c-b1', 1)}{blur('c-b2', 2)}{blur('c-b4', 4)}{blur('c-b8', 8)}{blur('c-b14', 14)}{blur('c-b24', 24)}{blur('c-b40', 40)}
      {tex('c-madera-clara', 'madera_clara', 2048, 640)}{tex('c-madera-media', 'madera_media', 2048, 640)}
      {tex('c-madera-oscura', 'madera_oscura', 2048, 640)}{tex('c-madera-pino', 'madera_pino', 1536, 512)}
      {tex('c-tierra', 'tierra', 1024, 512)}{tex('c-papel-a', 'papel_a', 1920, 1080)}{tex('c-aserrin', 'aserrin', 1024, 512)}{tex('c-papel', 'papel', 1920, 1080)}
      {/* vidrio: brillo en los bordes, casi transparente al centro */}
      <linearGradient id="c-vidrio" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity=".42" /><stop offset=".07" stopColor="#fff" stopOpacity=".08" />
        <stop offset=".5" stopColor="#dff3ef" stopOpacity=".03" /><stop offset=".9" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity=".45" />
      </linearGradient>
      <linearGradient id="c-vidrio-sombra" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#1d3a36" stopOpacity=".35" /><stop offset=".18" stopColor="#1d3a36" stopOpacity="0" />
        <stop offset=".82" stopColor="#1d3a36" stopOpacity="0" /><stop offset="1" stopColor="#1d3a36" stopOpacity=".4" />
      </linearGradient>
      <linearGradient id="c-brillo-v" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <linearGradient id="c-brillo-h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      {/* metales */}
      <linearGradient id="c-oro" x1="0" x2="1"><stop offset="0" stopColor="#7a5a1c" /><stop offset=".22" stopColor="#f3d27a" /><stop offset=".4" stopColor="#c99a3a" /><stop offset=".7" stopColor="#8f6a24" /><stop offset=".86" stopColor="#e7c46a" /><stop offset="1" stopColor="#6a4c16" /></linearGradient>
      <linearGradient id="c-acero" x1="0" x2="1"><stop offset="0" stopColor="#5d646d" /><stop offset=".2" stopColor="#e9eef3" /><stop offset=".45" stopColor="#9aa3ad" /><stop offset=".75" stopColor="#6c737c" /><stop offset=".9" stopColor="#d6dde4" /><stop offset="1" stopColor="#4c535b" /></linearGradient>
      <linearGradient id="c-laton" x1="0" x2="1"><stop offset="0" stopColor="#6b4a14" /><stop offset=".3" stopColor="#e8c068" /><stop offset=".6" stopColor="#a87a2a" /><stop offset="1" stopColor="#5a3c10" /></linearGradient>
      {/* barro y terracota */}
      <linearGradient id="c-barro" x1="0" x2="1"><stop offset="0" stopColor="#8a3f22" /><stop offset=".3" stopColor="#d8814f" /><stop offset=".55" stopColor="#c56b3c" /><stop offset="1" stopColor="#7a3519" /></linearGradient>
      <linearGradient id="c-barro-borde" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#e9a070" /><stop offset=".5" stopColor="#c86e3f" /><stop offset="1" stopColor="#8d4223" /></linearGradient>
      {/* volumen genérico: luz arriba-izquierda */}
      <radialGradient id="c-esfera" cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".35" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="#000" stopOpacity=".38" /></radialGradient>
      <linearGradient id="c-cilindro" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".38" /><stop offset=".28" stopColor="#fff" stopOpacity=".22" /><stop offset=".45" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#000" stopOpacity=".42" /></linearGradient>
      <linearGradient id="c-arriba" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".32" /></linearGradient>
      <linearGradient id="c-rayo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff6dc" stopOpacity=".55" /><stop offset="1" stopColor="#fff6dc" stopOpacity="0" /></linearGradient>
      <radialGradient id="c-halo" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".4" stopColor="#fff" stopOpacity=".25" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <radialGradient id="c-sombra-r" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset=".6" stopColor="#000" stopOpacity=".2" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      {/* semillas */}
      <radialGradient id="c-sem" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset=".25" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#000" stopOpacity=".45" /></radialGradient>
      {/* hojas */}
      <linearGradient id="c-hoja" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".3" /></linearGradient>
      {/* piel y tela */}
      <radialGradient id="c-cara" cx=".38" cy=".35" r=".75"><stop offset="0" stopColor="#fff" stopOpacity=".18" /><stop offset=".55" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#3a1a08" stopOpacity=".38" /></radialGradient>
      <linearGradient id="c-tela" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".25" /><stop offset=".35" stopColor="#fff" stopOpacity=".12" /><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".35" /></linearGradient>
    </defs>
  </svg>;
}

/* ============ luz, aire y profundidad ============ */
function Sombra({ x, y, rx, ry, o = 0.5 }) {
  return <ellipse cx={x} cy={y} rx={rx * 1.45} ry={ry * 2.1} fill="url(#c-sombra-r)" opacity={Math.min(1, o * 1.2)} />;
}

function Rayos({ x, y, ang = 60, abre = 30, largo = 1400, n = 6, ancho = 90, color = '#fff3d6', o = 0.5, t = 0, seed = 3 }) {
  const r = R(seed);
  return <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const a = ((ang - abre / 2 + (abre * i) / Math.max(1, n - 1)) * Math.PI) / 180;
      const w = ancho * (0.5 + r()), L = largo * (0.7 + 0.3 * r()), fl = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * (0.4 + r() * 0.5) + i * 1.7));
      const ox = x + (r() - 0.5) * 120, oy = y + (r() - 0.5) * 60;
      const ex = ox + Math.cos(a) * L, ey = oy + Math.sin(a) * L, nx = -Math.sin(a), ny = Math.cos(a);
      const poli = (k) => `${ox + nx * w * 0.25 * k},${oy + ny * w * 0.25 * k} ${ox - nx * w * 0.25 * k},${oy - ny * w * 0.25 * k} ${ex - nx * w * k},${ey - ny * w * k} ${ex + nx * w * k},${ey + ny * w * k}`;
      return <g key={i}>{[1.7, 1.15, 0.6].map((k, j) => <polygon key={j} points={poli(k)} fill={color} opacity={0.055 * fl} />)}</g>;
    })}
  </g>;
}

function Polvo({ x = 0, y = 0, w = CW, h = CH, n = 60, t = 0, seed = 9, color = '#fff6e0', o = 0.8, tam = 1 }) {
  const r = R(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => {
    const bx = r() * w, by = r() * h, vx = (r() - 0.5) * 14, vy = -4 - r() * 10, fase = r() * 6.28, rr = (0.8 + r() * 2.4) * tam, desen = r() < 0.25;
    const px = x + ((bx + vx * t + 18 * Math.sin(t * 0.3 + fase)) % w + w) % w;
    const py = y + ((by + vy * t + 10 * Math.cos(t * 0.25 + fase)) % h + h) % h;
    const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.5 + r()) + fase));
    return desen ? <circle key={i} cx={px} cy={py} r={rr * 6} fill="url(#c-halo)" opacity={0.28 * tw} /> : <circle key={i} cx={px} cy={py} r={rr} fill={color} opacity={0.75 * tw} />;
  })}</g>;
}

function Bokeh({ x = 0, y = 0, w = CW, h = CH, n = 18, t = 0, seed = 4, colores = ['#ffd38a', '#fff1c9', '#ffb36b'], r0 = 18, r1 = 70, o = 0.5 }) {
  const r = R(seed);
  return <g opacity={o}>
    {colores.map((c) => <radialGradient key={c} id={`c-bk-${c.slice(1)}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={c} stopOpacity=".5" /><stop offset=".78" stopColor={c} stopOpacity=".42" /><stop offset=".92" stopColor={c} stopOpacity=".55" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>)}
    {Array.from({ length: n }, (_, i) => {
      const cx = x + r() * w + 20 * Math.sin(t * 0.2 + i), cy = y + r() * h + 12 * Math.cos(t * 0.17 + i), rr = lerp(r0, r1, r()), c = colores[i % colores.length];
      return <circle key={i} cx={cx} cy={cy} r={rr} fill={`url(#c-bk-${c.slice(1)})`} opacity={0.6 + 0.3 * Math.sin(t * 0.6 + i * 2)} />;
    })}
  </g>;
}

function Desenfoque({ b = 8, o = 1, children }) { return <g filter={`url(#c-b${b})`} opacity={o}>{children}</g>; }
// Textura de papel encima de la ilustración (se ve pintada a mano).
function Papel({ o = 0.32 }) { return <rect x={0} y={0} width={CW} height={CH} fill="url(#c-papel-a)" opacity={o * 2} />; }

function Tinte({ color = '#ffb35a', o = 0.12 }) { return <rect x={0} y={0} width={CW} height={CH} fill={color} opacity={o * 0.45} />; }

function Halo({ x, y, r, color = '#fff2cf', o = 0.6 }) {
  const id = 'c-ha-' + color.replace('#', '');
  return <g><radialGradient id={id} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={color} stopOpacity="1" /><stop offset=".3" stopColor={color} stopOpacity=".72" /><stop offset=".6" stopColor={color} stopOpacity=".3" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient>
    <circle cx={x} cy={y} r={r * 1.25} fill={`url(#${id})`} opacity={o} /></g>;
}

/* ============ superficies ============ */
// Tablón de madera (cubierta de mesa o repisa). y = borde superior; grosor = canto frontal.
function Tablon({ x, y, w, prof = 40, grosor = 26, madera = 'media', o = 1 }) {
  return <g opacity={o}>
    <rect x={x} y={y} width={w} height={prof} fill={`url(#c-madera-${madera})`} />
    <rect x={x} y={y} width={w} height={prof} fill="url(#c-arriba)" opacity={0.6} />
    <rect x={x} y={y + prof} width={w} height={grosor} fill={`url(#c-madera-${madera})`} />
    <rect x={x} y={y + prof} width={w} height={grosor} fill="#000" opacity={0.28} />
    <rect x={x} y={y + prof} width={w} height={2.5} fill="#fff" opacity={0.35} />
    <rect x={x} y={y + prof + grosor} width={w} height={14} fill="#000" opacity={0.35} filter="url(#c-b8)" />
  </g>;
}
// Puerta de alacena con tablero, bisel y jaladera de latón.
function Puerta({ x, y, w, h, madera = 'media', jal = 'der' }) {
  const m = 26;
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={`url(#c-madera-${madera})`} />
    <rect x={x} y={y} width={w} height={h} fill="#000" opacity={0.12} />
    <rect x={x + m} y={y + m} width={w - 2 * m} height={h - 2 * m} fill={`url(#c-madera-${madera})`} />
    <path d={`M ${x + m} ${y + h - m} L ${x + m} ${y + m} L ${x + w - m} ${y + m}`} fill="none" stroke="#000" strokeOpacity={0.35} strokeWidth={4} />
    <path d={`M ${x + m} ${y + h - m} L ${x + w - m} ${y + h - m} L ${x + w - m} ${y + m}`} fill="none" stroke="#fff" strokeOpacity={0.22} strokeWidth={4} />
    <rect x={x} y={y} width={w} height={h} fill="none" stroke="#000" strokeOpacity={0.4} strokeWidth={3} />
    <circle cx={jal === 'der' ? x + w - 44 : x + 44} cy={y + 60} r={11} fill="url(#c-laton)" />
    <circle cx={(jal === 'der' ? x + w - 44 : x + 44) - 3} cy={y + 57} r={3.5} fill="#fff" opacity={0.7} />
  </g>;
}
// Pared de azulejo (tipo metro) con algunos de talavera.
function Azulejo({ x, y, w, h, tw = 120, th = 60, color = '#f3eee4', talavera = 0.12, seed = 5 }) {
  const r = R(seed), filas = Math.ceil(h / th), cols = Math.ceil(w / tw) + 1;
  const items = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
    const tx = x + c * tw - (f % 2 ? tw / 2 : 0), ty = y + f * th, v = r(), tal = r() < talavera;
    if (tx + tw < x || tx > x + w) continue;
    items.push(<g key={f * 100 + c}>
      <rect x={tx + 2} y={ty + 2} width={tw - 4} height={th - 4} rx={3} fill={tal ? '#f7f3ea' : mix(color, '#d8cdb9', v * 0.35)} />
      {tal && <g transform={`translate(${tx + tw / 2} ${ty + th / 2})`}>
        <circle r={th * 0.32} fill="none" stroke="#1f3f9e" strokeWidth={3.5} />
        {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={0} cy={-th * 0.2} rx={th * 0.09} ry={th * 0.2} fill="#2a52c2" transform={`rotate(${k * 90 + 45})`} />)}
        <circle r={th * 0.09} fill="#e8a22a" />
        <path d={`M ${-tw / 2 + 8} ${-th / 2 + 8} l 10 0 l -10 10 Z M ${tw / 2 - 8} ${-th / 2 + 8} l -10 0 l 10 10 Z M ${-tw / 2 + 8} ${th / 2 - 8} l 10 0 l -10 -10 Z M ${tw / 2 - 8} ${th / 2 - 8} l -10 0 l 10 -10 Z`} fill="#1f3f9e" />
      </g>}
      <rect x={tx + 4} y={ty + 4} width={tw - 8} height={5} rx={2} fill="#fff" opacity={0.5} />
    </g>);
  }
  return <g>
    <rect x={x} y={y} width={w} height={h} fill="#b9ad98" />
    <svg x={x} y={y} width={w} height={h} viewBox={`${x} ${y} ${w} ${h}`} overflow="hidden">{items}</svg>
  </g>;
}
// Pared lisa de yeso con textura y degradado de luz.
function Pared({ color = '#efe2c9', luz = [0.25, 0.3], o = 1 }) {
  return <g opacity={o}>
    <rect x={0} y={0} width={CW} height={CH} fill={color} />
    <rect x={0} y={0} width={CW} height={CH} fill="url(#c-papel-a)" opacity={0.9} />
    <radialGradient id={`c-pared-${color.slice(1)}`} cx={luz[0]} cy={luz[1]} r=".9"><stop offset="0" stopColor="#fff7e6" stopOpacity=".45" /><stop offset="1" stopColor="#2a1a0c" stopOpacity=".45" /></radialGradient>
    <rect x={0} y={0} width={CW} height={CH} fill={`url(#c-pared-${color.slice(1)})`} />
  </g>;
}

/* ============ semillas ============ */
// Una semilla vista de cerca. tipo: frijol, maiz, lenteja, garbanzo, pepita, arroz, papaya, jitomate.
function Semilla({ tipo = 'frijol', x = 0, y = 0, s = 1, rot = 0, var: vv = 0.5, sombra = true }) {
  const g = (body) => <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{sombra && <ellipse cx={2} cy={7} rx={15} ry={6} fill="#000" opacity={0.25} filter="url(#c-b2)" />}{body}</g>;
  if (tipo === 'frijol') {
    const base = mix('#c69a6c', '#a8724a', vv), manch = mix('#6b3a22', '#8a4e2c', vv);
    return g(<>
      <path d="M -17 -2 C -18 -12 -6 -13 0 -8 C 6 -13 18 -12 17 -1 C 16 10 6 12 0 11 C -8 12 -16 9 -17 -2 Z" fill={base} />
      {[[-9, -3, 4, 2.4, 20], [3, 2, 5, 2.6, -15], [9, -5, 3, 1.8, 40], [-4, 6, 3.4, 2, 0], [12, 4, 2.6, 1.6, 10]].map(([a, b, c, d, e], i) =>
        <ellipse key={i} cx={a} cy={b} rx={c} ry={d} transform={`rotate(${e} ${a} ${b})`} fill={manch} opacity={0.75} />)}
      <path d="M -17 -2 C -18 -12 -6 -13 0 -8 C 6 -13 18 -12 17 -1 C 16 10 6 12 0 11 C -8 12 -16 9 -17 -2 Z" fill="url(#c-sem)" />
      <path d="M -4 -8.2 Q 0 -6.4 4 -8.2" stroke="#f6eedc" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <ellipse cx={-8} cy={-6} rx={4} ry={1.6} fill="#fff" opacity={0.55} transform="rotate(-20 -8 -6)" />
    </>);
  }
  if (tipo === 'frijol_negro') {
    return g(<>
      <path d="M -16 -2 C -17 -11 -6 -12 0 -7 C 6 -12 17 -11 16 -1 C 15 9 6 11 0 10 C -8 11 -15 8 -16 -2 Z" fill="#1b1416" />
      <path d="M -16 -2 C -17 -11 -6 -12 0 -7 C 6 -12 17 -11 16 -1 C 15 9 6 11 0 10 C -8 11 -15 8 -16 -2 Z" fill="url(#c-sem)" />
      <path d="M -3.5 -7.4 Q 0 -5.8 3.5 -7.4" stroke="#e9e2d6" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <ellipse cx={-7} cy={-5} rx={4.5} ry={1.5} fill="#fff" opacity={0.6} transform="rotate(-18 -7 -5)" />
    </>);
  }
  if (tipo === 'maiz') {
    const c = mix('#f2b51e', '#e48a12', vv);
    return g(<>
      <path d="M -11 -12 Q 0 -16 11 -12 Q 13 0 7 12 Q 0 15 -7 12 Q -13 0 -11 -12 Z" fill={c} />
      <path d="M -9 -11 Q 0 -14 9 -11 Q 9 -5 0 -3 Q -9 -5 -9 -11 Z" fill="#fde9a6" opacity={0.85} />
      <ellipse cx={0} cy={4} rx={4} ry={6} fill="#fff4cf" opacity={0.55} />
      <path d="M -11 -12 Q 0 -16 11 -12 Q 13 0 7 12 Q 0 15 -7 12 Q -13 0 -11 -12 Z" fill="url(#c-sem)" />
      <ellipse cx={-5} cy={-8} rx={3.5} ry={1.6} fill="#fff" opacity={0.7} />
    </>);
  }
  if (tipo === 'lenteja') {
    const c = mix('#9a8549', '#6f6a35', vv);
    return g(<>
      <ellipse cx={0} cy={0} rx={10} ry={7.5} fill={c} />
      <ellipse cx={0} cy={0} rx={10} ry={7.5} fill="url(#c-sem)" />
      <ellipse cx={0} cy={0} rx={7} ry={5} fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={1.2} />
      <ellipse cx={-4} cy={-3} rx={2.6} ry={1.2} fill="#fff" opacity={0.6} />
    </>);
  }
  if (tipo === 'garbanzo') {
    const c = mix('#e2c08a', '#cfa66a', vv);
    return g(<>
      <path d="M -11 2 C -12 -8 -2 -13 6 -10 C 10 -12 13 -8 11 -5 C 14 2 9 11 0 11 C -7 11 -11 7 -11 2 Z" fill={c} />
      <path d="M 1 -10 Q -2 0 3 9" stroke="#a87e45" strokeWidth={1.4} fill="none" opacity={0.6} />
      <path d="M -11 2 C -12 -8 -2 -13 6 -10 C 10 -12 13 -8 11 -5 C 14 2 9 11 0 11 C -7 11 -11 7 -11 2 Z" fill="url(#c-sem)" />
      <ellipse cx={-4} cy={-5} rx={3} ry={1.6} fill="#fff" opacity={0.55} />
    </>);
  }
  if (tipo === 'pepita') {
    return g(<>
      <path d="M 0 -14 C 9 -12 11 6 0 14 C -11 6 -9 -12 0 -14 Z" fill="#eae0c2" />
      <path d="M 0 -11 C 6 -9 8 5 0 11 C -8 5 -6 -9 0 -11 Z" fill="#f6f0db" />
      <path d="M 0 -14 C 9 -12 11 6 0 14 C -11 6 -9 -12 0 -14 Z" fill="url(#c-sem)" />
    </>);
  }
  if (tipo === 'papaya') {
    return g(<><circle r={6} fill="#151112" /><circle r={6} fill="url(#c-sem)" /><circle cx={-2} cy={-2} r={1.6} fill="#fff" opacity={0.7} /></>);
  }
  return g(<><ellipse rx={12} ry={5} fill="#efe8d6" /><ellipse rx={12} ry={5} fill="url(#c-sem)" /></>);
}
// Muchas semillas acomodadas por gravedad dentro de un rectángulo (de abajo hacia arriba).
function Monton({ tipo, x, y, w, h, n, seed = 1, s = 1, nivel = 1 }) {
  const r = R(seed), items = [];
  const tam = { frijol: 30, frijol_negro: 28, maiz: 22, lenteja: 18, garbanzo: 21, pepita: 20, papaya: 12 }[tipo] || 20;
  const cols = Math.max(1, Math.floor(w / (tam * 0.8 * s))), filas = Math.ceil((h * nivel) / (tam * 0.55 * s));
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
    const px = x + (c + 0.5 + (f % 2) * 0.5 + (r() - 0.5) * 0.7) * (w / (cols + 0.5)), py = y + h - (f + 0.5 + (r() - 0.5) * 0.5) * tam * 0.55 * s;
    if (py < y + h * (1 - nivel) - 4) continue;
    items.push(<Semilla key={f * 1000 + c} tipo={tipo} x={px} y={py} s={s * (0.85 + r() * 0.3)} rot={(r() - 0.5) * 200} var={r()} sombra={false} />);
  }
  return <g>{items.slice(0, n || items.length)}</g>;
}

/* ============ frasco de vidrio ============ */
// Frasco de cocina con tapa de rosca (o trapito de cuadros), contenido, etiqueta escrita a mano y reflejos.
// (x, y) = centro de la base. id único por frasco (para el recorte del contenido).
function Frasco({ id, x, y, w = 200, h = 300, tapa = 'oro', contenido = 'frijol', nivel = 0.72, etiqueta, seed = 1, abierto = false, luz = 'izq', ventana = true, interior, sombra = true }) {
  const cuello = w * 0.78, hc = h * 0.1, hom = h * 0.12; // ancho de cuello, alto de cuello, hombro
  const x0 = x - w / 2, x1 = x + w / 2, top = y - h;
  const body = `M ${x0 + 14} ${y} Q ${x0} ${y} ${x0} ${y - 16} L ${x0} ${top + hc + hom} Q ${x0} ${top + hc} ${x - cuello / 2} ${top + hc} L ${x - cuello / 2} ${top} L ${x + cuello / 2} ${top} L ${x + cuello / 2} ${top + hc} Q ${x1} ${top + hc} ${x1} ${top + hc + hom} L ${x1} ${y - 16} Q ${x1} ${y} ${x1 - 14} ${y} Z`;
  const izq = luz === 'izq';
  return <g>
    {/* sombra y luz que atraviesa el vidrio */}
    {sombra && <Sombra x={x + (izq ? 40 : -40)} y={y + 4} rx={w * 0.62} ry={14} o={0.55} b="c-b8" />}
    {sombra && <ellipse cx={x + (izq ? w * 0.55 : -w * 0.55)} cy={y + 6} rx={w * 0.4} ry={10} fill={contenido === 'maiz' ? '#ffd76a' : '#ffe9c4'} opacity={0.35} filter="url(#c-b8)" />}
    <clipPath id={`c-fr-${id}`}><path d={body} /></clipPath>
    {/* pared trasera */}
    <path d={body} fill="#cfe3dc" opacity={0.16} />
    <g clipPath={`url(#c-fr-${id})`}>
      {interior}
      {contenido && <Monton tipo={contenido} x={x0 + 4} y={top + hc + 6} w={w - 8} h={h - hc - 12} seed={seed} nivel={nivel} s={w / 200} />}
      {/* sombra interior del vidrio */}
      <rect x={x0} y={top} width={w} height={h} fill="url(#c-vidrio-sombra)" />
    </g>
    {/* vidrio al frente */}
    <path d={body} fill="url(#c-vidrio)" />
    {/* reflejo de la ventana */}
    {ventana && <g opacity={0.5} clipPath={`url(#c-fr-${id})`}>
      <rect x={x0 + w * (izq ? 0.14 : 0.66)} y={top + hc + hom + 6} width={w * 0.1} height={h * 0.22} fill="#fff" opacity={0.5} filter="url(#c-b2)" />
      <rect x={x0 + w * (izq ? 0.26 : 0.78)} y={top + hc + hom + 6} width={w * 0.06} height={h * 0.22} fill="#fff" opacity={0.35} filter="url(#c-b2)" />
      <rect x={x0 + w * (izq ? 0.14 : 0.66)} y={top + hc + hom + h * 0.25} width={w * 0.1} height={h * 0.18} fill="#fff" opacity={0.3} filter="url(#c-b2)" />
    </g>}
    <rect x={x0 + w * (izq ? 0.06 : 0.86)} y={top + hc + hom} width={w * 0.06} height={h - hc - hom - 24} rx={w * 0.03} fill="url(#c-brillo-v)" opacity={0.9} />
    <rect x={x0 + w * (izq ? 0.88 : 0.08)} y={top + hc + hom + 20} width={w * 0.025} height={h * 0.55} rx={2} fill="#fff" opacity={0.35} />
    {/* hombro y cuerdas de la rosca */}
    <path d={`M ${x0 + 6} ${top + hc + hom} Q ${x0 + 6} ${top + hc + 6} ${x - cuello / 2 + 6} ${top + hc + 6}`} stroke="#fff" strokeOpacity={0.55} strokeWidth={4} fill="none" strokeLinecap="round" />
    {[0.25, 0.55, 0.85].map((k, i) => <path key={i} d={`M ${x - cuello / 2} ${top + hc * k} Q ${x} ${top + hc * k + 5} ${x + cuello / 2} ${top + hc * k}`} stroke="#fff" strokeOpacity={0.4} strokeWidth={2.5} fill="none" />)}
    {/* fondo grueso del vidrio */}
    <path d={`M ${x0 + 8} ${y - 12} Q ${x} ${y - 2} ${x1 - 8} ${y - 12}`} stroke="#d9efe9" strokeOpacity={0.7} strokeWidth={6} fill="none" />
    <path d={body} fill="none" stroke="#24433f" strokeOpacity={0.45} strokeWidth={2} />
    <path d={body} fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={1} />
    {/* etiqueta de papel con cinta, escrita a mano */}
    {etiqueta && <g transform={`translate(${x} ${y - h * 0.38}) rotate(${(R(seed + 9)() - 0.5) * 6})`}>
      <rect x={-w * 0.36} y={-h * 0.1} width={w * 0.72} height={h * 0.2} rx={3} fill="#f1e6cc" />
      <rect x={-w * 0.36} y={-h * 0.1} width={w * 0.72} height={h * 0.2} rx={3} fill="url(#c-papel-a)" opacity={0.8} />
      <rect x={-w * 0.36} y={-h * 0.1} width={w * 0.72} height={h * 0.2} rx={3} fill="url(#c-cilindro)" opacity={0.7} />
      <rect x={-w * 0.12} y={-h * 0.1 - 9} width={w * 0.24} height={18} fill="#efe1a8" opacity={0.75} transform="rotate(-3)" />
      <text x={0} y={h * 0.04} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={Math.min(w * 0.22, h * 0.14)} fill="#2a2522">{etiqueta}</text>
    </g>}
    {/* tapa */}
    {!abierto && tapa === 'oro' && <Tapa x={x} y={top} w={cuello + 14} />}
    {!abierto && tapa === 'roja' && <Tapa x={x} y={top} w={cuello + 14} color="#b3261e" />}
    {!abierto && tapa === 'trapo' && <Trapito x={x} y={top + hc * 0.5} w={cuello + 30} seed={seed} />}
  </g>;
}
function Tapa({ x, y, w, h = 34, color }) {
  return <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={6} fill={color || 'url(#c-oro)'} />
    {color && <rect x={x - w / 2} y={y - h} width={w} height={h} rx={6} fill="url(#c-cilindro)" />}
    {Array.from({ length: Math.floor(w / 7) }, (_, i) => <rect key={i} x={x - w / 2 + 4 + i * 7} y={y - h + 6} width={2} height={h - 10} fill="#000" opacity={0.18} />)}
    <rect x={x - w / 2} y={y - h} width={w} height={6} rx={3} fill="#fff" opacity={0.45} />
    <rect x={x - w / 2} y={y - 4} width={w} height={4} fill="#000" opacity={0.35} />
  </g>;
}
// Trapito de cuadros amarrado con hilo de yute (tapa de frasco de cocina mexicana).
function Trapito({ x, y, w, color = '#c0392b', seed = 3 }) {
  const r = R(seed), c = 14, items = [];
  for (let i = 0; i < Math.ceil(w / c) + 2; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) items.push(<rect key={i * 10 + j} x={x - w / 2 - c + i * c} y={y - 50 + j * c} width={c} height={c} fill={color} opacity={0.85} />);
  const borde = `M ${x - w / 2 - 6} ${y + 26} Q ${x - w / 2 + 10} ${y + 4} ${x - w / 2 + 8} ${y - 18} Q ${x} ${y - 66} ${x + w / 2 - 8} ${y - 18} Q ${x + w / 2 - 10} ${y + 4} ${x + w / 2 + 6} ${y + 26}`;
  return <g>
    <clipPath id={`c-trapo-${seed}`}><path d={`${borde} Q ${x + w / 4} ${y + 34} ${x} ${y + 22} Q ${x - w / 4} ${y + 34} ${x - w / 2 - 6} ${y + 26} Z`} /></clipPath>
    <g clipPath={`url(#c-trapo-${seed})`}>
      <rect x={x - w / 2 - 20} y={y - 70} width={w + 40} height={110} fill="#f6efe2" />
      {items}
      {Array.from({ length: Math.ceil(w / c) + 2 }, (_, i) => <rect key={'v' + i} x={x - w / 2 - c + i * c} y={y - 70} width={c} height={110} fill={color} opacity={i % 2 ? 0.25 : 0} />)}
      <rect x={x - w / 2 - 20} y={y - 70} width={w + 40} height={110} fill="url(#c-cilindro)" />
      {[0.3, 0.55, 0.78].map((k, i) => <path key={i} d={`M ${x - w / 2 + w * k} ${y - 6} q 4 18 -2 34`} stroke="#000" strokeOpacity={0.25} strokeWidth={5} fill="none" filter="url(#c-b2)" />)}
    </g>
    <path d={`M ${x - w / 2 + 6} ${y - 2} Q ${x} ${y + 8} ${x + w / 2 - 6} ${y - 2}`} stroke="#b08a52" strokeWidth={5} fill="none" />
    <path d={`M ${x + w * 0.2} ${y + 2} q 10 22 -4 40 M ${x + w * 0.2} ${y + 2} q 22 14 26 34`} stroke="#b08a52" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}

/* ============ plantas ============ */
// Hoja con nervadura. (x,y) = base del pecíolo, ang en grados (0 = derecha, -90 = arriba).
function Hoja({ x, y, len = 80, w = 0.42, ang = -90, color = '#3f8f3a', venas = 5, borde = 'liso', o = 1 }) {
  const hw = len * w;
  const forma = borde === 'dentado'
    ? (() => { let d = 'M 0 0 '; const n = 7; for (let i = 1; i <= n; i++) { const k = i / n, ww = Math.sin(k * Math.PI) * hw * (1 - 0.2 * k); d += `L ${len * (k - 0.06)} ${-ww - 3} L ${len * k} ${-ww * 0.86} `; } for (let i = n; i >= 1; i--) { const k = i / n, ww = Math.sin(k * Math.PI) * hw * (1 - 0.2 * k); d += `L ${len * k} ${ww * 0.86} L ${len * (k - 0.06)} ${ww + 3} `; } return d + 'Z'; })()
    : `M 0 0 C ${len * 0.25} ${-hw * 1.1} ${len * 0.75} ${-hw * 0.9} ${len} 0 C ${len * 0.75} ${hw * 0.9} ${len * 0.25} ${hw * 1.1} 0 0 Z`;
  return <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    <path d={forma} fill={color} />
    <path d={`M 0 0 C ${len * 0.25} ${-hw * 1.1} ${len * 0.75} ${-hw * 0.9} ${len} 0 Z`} fill="#fff" opacity={0.1} />
    <path d={`M 0 0 C ${len * 0.25} ${hw * 1.1} ${len * 0.75} ${hw * 0.9} ${len} 0 Z`} fill="#000" opacity={0.14} />
    <path d={`M 0 0 Q ${len * 0.5} ${-hw * 0.06} ${len * 0.97} 0`} stroke={cla(color, 0.45)} strokeWidth={Math.max(1.2, len * 0.025)} fill="none" opacity={0.85} />
    {Array.from({ length: venas }, (_, i) => { const k = (i + 1) / (venas + 1), vx = len * k * 0.95, vw = Math.sin(k * Math.PI) * hw * 0.75;
      return <g key={i} stroke={cla(color, 0.35)} strokeWidth={Math.max(0.8, len * 0.012)} fill="none" opacity={0.6}>
        <path d={`M ${vx} 0 Q ${vx + len * 0.08} ${-vw * 0.5} ${vx + len * 0.14} ${-vw}`} /><path d={`M ${vx} 0 Q ${vx + len * 0.08} ${vw * 0.5} ${vx + len * 0.14} ${vw}`} /></g>; })}
  </g>;
}
// Tallo curvo con grosor.
function Tallo({ d, w = 8, color = '#4f8a35' }) {
  return <g><path d={d} stroke={osc(color, 0.35)} strokeWidth={w + 2} fill="none" strokeLinecap="round" /><path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" />
    <path d={d} stroke={cla(color, 0.4)} strokeWidth={w * 0.3} fill="none" strokeLinecap="round" opacity={0.6} transform={`translate(${-w * 0.2} 0)`} /></g>;
}
// Plántula de frijol: crece de semilla (g=0) a planta con hojas verdaderas (g=1). (x,y) = nivel de la tierra.
function PlantulaFrijol({ x, y, g = 1, t = 0, s = 1, seed = 2 }) {
  const m = mece(t, seed, 0.6) * 4 * g;
  const L = 170 * kclamp(g * 1.15, 0, 1) + 70 * kclamp((g - 0.6) / 0.4, 0, 1);
  const gancho = kclamp(1 - (g - 0.15) / 0.3, 0, 1); // al salir viene doblado en gancho
  const tx = m + 6, ty = -L;
  const cot = kclamp((g - 0.3) / 0.3, 0, 1), hv = kclamp((g - 0.5) / 0.5, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {g > 0.02 && <Tallo d={`M 0 0 C 0 ${-L * 0.4} ${m * 0.5 - 8} ${-L * 0.7} ${tx - gancho * 26} ${ty + gancho * 30}`} w={9} color="#8fb04a" />}
    {cot > 0 && [-1, 1].map((d) => <g key={d} transform={`translate(${tx} ${ty + L * 0.32}) rotate(${d * (70 - 20 * cot)})`}>
      <ellipse cx={0} cy={-18 * cot} rx={13 * cot} ry={22 * cot} fill="#c9b25c" /><ellipse cx={0} cy={-18 * cot} rx={13 * cot} ry={22 * cot} fill="url(#c-sem)" /></g>)}
    {hv > 0 && [-1, 1].map((d) => <Hoja key={d} x={tx} y={ty + 4} len={110 * hv} w={0.5} ang={-90 + d * 48 + m} color="#4c9a3c" venas={4} />)}
    {hv > 0.5 && <Hoja x={tx} y={ty - 2} len={70 * (hv - 0.5) * 2} w={0.45} ang={-92 + m} color="#5aa845" venas={3} />}
  </g>;
}
// Mata de jitomate (hojas compuestas y dentadas, flores amarillas y algún jitomate).
function MataJitomate({ x, y, s = 1, t = 0, seed = 5, frutos = 0, alto = 1 }) {
  const r = R(seed), m = mece(t, seed, 0.5) * 5;
  const ramas = Array.from({ length: 6 }, (_, i) => ({ h: (60 + i * 46) * alto, lado: i % 2 ? 1 : -1, len: 90 + r() * 50, a: 25 + r() * 25 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Tallo d={`M 0 0 Q ${m} ${-160 * alto} ${m * 1.6} ${-330 * alto}`} w={10} color="#5c8f3a" />
    {ramas.map((b, i) => { const bx = m * (b.h / (330 * alto)) * 1.4, ex = bx + b.lado * b.len * 0.7, ey = -b.h - b.len * 0.35;
      return <g key={i}>
        <Tallo d={`M ${bx} ${-b.h} Q ${bx + b.lado * 30} ${-b.h - 30} ${ex} ${ey}`} w={5} color="#5c8f3a" />
        {[0.35, 0.65, 1].map((k, j) => <Hoja key={j} x={lerp(bx, ex, k)} y={lerp(-b.h, ey, k)} len={44 + 14 * k} w={0.45} ang={b.lado > 0 ? -40 + j * 30 + m : -140 - j * 30 + m} color={mix('#3f7f34', '#558f3d', r())} borde="dentado" venas={3} />)}
        {[0.35, 0.65].map((k, j) => <Hoja key={'b' + j} x={lerp(bx, ex, k)} y={lerp(-b.h, ey, k)} len={36} w={0.45} ang={b.lado > 0 ? 40 + j * 20 + m : 140 - j * 20 + m} color="#3a7432" borde="dentado" venas={2} />)}
      </g>; })}
    {Array.from({ length: frutos }, (_, i) => { const fx = (i % 2 ? 40 : -46) + m, fy = -120 - i * 60; return <g key={i}>
      <path d={`M ${fx} ${fy - 30} l 0 14`} stroke="#5c8f3a" strokeWidth={3} />
      <circle cx={fx} cy={fy} r={19} fill={i % 3 === 2 ? '#7fb24a' : '#d8331f'} /><circle cx={fx} cy={fy} r={19} fill="url(#c-esfera)" />
      <path d={`M ${fx - 9} ${fy - 17} l 9 4 l 9 -4 l -5 6 l 5 4 l -9 -3 l -9 3 l 5 -4 Z`} fill="#3c7a2c" />
    </g>; })}
    {Array.from({ length: 3 }, (_, i) => <g key={'f' + i} transform={`translate(${(i - 1) * 36 + m} ${-250 - i * 20})`}>{[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={0} cy={-6} rx={3} ry={7} fill="#f6d02a" transform={`rotate(${k * 72})`} />)}<circle r={2.6} fill="#c08a10" /></g>)}
  </g>;
}
// Hierba de olor (albahaca, hierbabuena, romero): mata redonda de hojas.
function HierbaOlor({ x, y, s = 1, t = 0, seed = 7, tipo = 'albahaca' }) {
  const r = R(seed), m = mece(t, seed, 0.5) * 4;
  const col = tipo === 'romero' ? ['#5e7d52', '#6f8f5f'] : tipo === 'hierbabuena' ? ['#4f9a44', '#68b257'] : ['#3d8a3a', '#57a84a'];
  const n = tipo === 'romero' ? 40 : 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 7 }, (_, i) => { const a = -90 + (i - 3) * 16, L = 110 + r() * 50; const ex = Math.cos((a * Math.PI) / 180) * L + m, ey = Math.sin((a * Math.PI) / 180) * L;
      return <Tallo key={i} d={`M 0 0 Q ${ex * 0.3} ${ey * 0.6} ${ex} ${ey}`} w={4} color={tipo === 'romero' ? '#6c5a3a' : '#4f7f32'} />; })}
    {Array.from({ length: n }, (_, i) => { const a = (-90 + (r() - 0.5) * 110) * Math.PI / 180, L = 40 + r() * 110;
      return <Hoja key={'h' + i} x={Math.cos(a) * L * 0.9 + m} y={Math.sin(a) * L} len={tipo === 'romero' ? 34 : 40 + r() * 22} w={tipo === 'romero' ? 0.16 : 0.5} ang={(a * 180) / Math.PI + (r() - 0.5) * 70} color={col[i % 2]} venas={tipo === 'romero' ? 0 : 3} borde={tipo === 'hierbabuena' ? 'dentado' : 'liso'} />; })}
  </g>;
}

/* ============ macetas ============ */
// Maceta de barro (o de plástico, o bote reusado). (x,y) = base al centro. children = planta (origen en la tierra).
function Maceta({ x, y, w = 160, h = 140, tipo = 'barro', color = '#2b6fd6', s = 1, children, tierra = true, sombra = true }) {
  const bw = w * 0.72, borde = h * 0.18;
  const cuerpo = `M ${-w / 2 + 6} ${-h + borde} L ${w / 2 - 6} ${-h + borde} L ${bw / 2} 0 L ${-bw / 2} 0 Z`;
  const relleno = tipo === 'barro' ? 'url(#c-barro)' : color;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {sombra && <Sombra x={18} y={2} rx={w * 0.55} ry={12} o={0.5} b="c-b8" />}
    {/* tierra (atrás del borde) */}
    {tierra && <g><ellipse cx={0} cy={-h + borde * 0.55} rx={w / 2 - 8} ry={borde * 0.5} fill="url(#c-tierra)" /><ellipse cx={0} cy={-h + borde * 0.55} rx={w / 2 - 8} ry={borde * 0.5} fill="#000" opacity={0.25} /></g>}
    <g>{children}</g>
    <path d={cuerpo} fill={relleno} />
    {tipo !== 'barro' && <path d={cuerpo} fill="url(#c-cilindro)" />}
    {tipo === 'barro' && <path d={cuerpo} fill="url(#c-papel-a)" opacity={0.5} />}
    <path d={cuerpo} fill="url(#c-arriba)" opacity={0.6} />
    {/* borde superior */}
    <rect x={-w / 2} y={-h} width={w} height={borde} rx={4} fill={tipo === 'barro' ? 'url(#c-barro-borde)' : color} />
    {tipo !== 'barro' && <rect x={-w / 2} y={-h} width={w} height={borde} rx={4} fill="url(#c-cilindro)" />}
    <rect x={-w / 2} y={-h} width={w} height={3} rx={1.5} fill="#fff" opacity={0.4} />
    <rect x={-w / 2 + 6} y={-h + borde} width={w - 12} height={8} fill="#000" opacity={0.25} filter="url(#c-b2)" />
    {tipo === 'barro' && <path d={`M ${-w * 0.28} ${-h * 0.45} q 4 18 -2 32`} stroke="#fff" strokeOpacity={0.12} strokeWidth={3} fill="none" />}
  </g>;
}

/* ============ personas ============ */
// Robert de niño (y otros niños). (x,y) = pies. s = escala (1 ≈ 3 años, 360 px).
// cuerpo: 'completo' | 'busto' (solo de pecho para arriba). brazoD/brazoI en grados (0 = abajo, 90 = al frente/arriba).
function Nene({ x, y, s = 1, piel = '#b77a52', pelo = '#1a1311', playera = '#e8742a', pantalon = '#2e4d84', zapatos = '#3b2a22', brazoD = 10, brazoI = -10,
  boca = 'sonrisa', mira = [0, 0], cejas = 0, t = 0, lentes = false, edad = 3, detalle, cuerpo = 'completo', parpadeo = true, seed = 1, rayas = true, espalda = false, mochila = null, cuello = null }) {
  const k = edad <= 4 ? 1 : edad <= 8 ? 1.15 : 1.3; // cuerpo más largo con la edad
  const cab = edad <= 4 ? 78 : edad <= 8 ? 72 : 66;
  const hT = -150 * k, hC = hT - 40 - cab; // altura del torso y del centro de la cabeza
  const respira = Math.sin(t * 1.6) * 2, rot = mece(t, seed, 0.5) * 3;
  const ojo = parpadeo && (t % 3.7) < 0.12 ? 0.12 : 1;
  const brazo = (lado, a) => { const sx = lado * 52 * k, sy = hT + 18; return <g transform={`rotate(${-lado * a} ${sx} ${sy})`}>
    <path d={`M ${sx - 13} ${sy} L ${sx - 11} ${sy + 92 * k} L ${sx + 11} ${sy + 92 * k} L ${sx + 13} ${sy} Z`} fill={piel} />
    <path d={`M ${sx - 13} ${sy} L ${sx - 11} ${sy + 92 * k} L ${sx + 11} ${sy + 92 * k} L ${sx + 13} ${sy} Z`} fill="url(#c-cilindro)" />
    <path d={`M ${sx - 20} ${sy - 6} L ${sx - 18} ${sy + 38} L ${sx + 18} ${sy + 38} L ${sx + 20} ${sy - 6} Z`} fill={playera} /><path d={`M ${sx - 20} ${sy - 6} L ${sx - 18} ${sy + 38} L ${sx + 18} ${sy + 38} L ${sx + 20} ${sy - 6} Z`} fill="url(#c-tela)" />
    <ellipse cx={sx} cy={sy + 100 * k} rx={14} ry={16} fill={piel} /><ellipse cx={sx} cy={sy + 100 * k} rx={14} ry={16} fill="url(#c-esfera)" opacity={0.7} />
    <path d={`M ${sx - 10} ${sy + 104 * k} q 3 8 8 9 M ${sx - 2} ${sy + 106 * k} q 2 8 6 8`} stroke={osc(piel, 0.35)} strokeWidth={1.6} fill="none" />
  </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cuerpo === 'completo' && <Sombra x={0} y={0} rx={90} ry={14} o={0.45} b="c-b8" />}
    {cuerpo === 'completo' && <g>
      {/* piernas y zapatos */}
      {[-1, 1].map((d) => <g key={d}>
        <path d={`M ${d * 30 - 22} ${hT + 30} L ${d * 30 - 20} ${-22} L ${d * 30 + 20} ${-22} L ${d * 30 + 22} ${hT + 30} Z`} fill={pantalon} />
        <path d={`M ${d * 30 - 22} ${hT + 30} L ${d * 30 - 20} ${-22} L ${d * 30 + 20} ${-22} L ${d * 30 + 22} ${hT + 30} Z`} fill="url(#c-cilindro)" />
        <path d={`M ${d * 30 + d * 6} ${hT + 40} L ${d * 30 + d * 4} ${-30}`} stroke="#fff" strokeOpacity={0.15} strokeWidth={2} />
        <path d={`M ${d * 30 - 26} 0 Q ${d * 30 - 26} -30 ${d * 30} -30 Q ${d * 30 + 30 + d * 8} -28 ${d * 30 + 30 + d * 8} -6 L ${d * 30 + 30 + d * 8} 0 Z`} fill={zapatos} />
        <rect x={d * 30 - 27} y={-7} width={58 + d * 8} height={7} rx={3} fill="#efe7da" />
      </g>)}
    </g>}
    {/* torso */}
    <g transform={`translate(0 ${respira * 0.5})`}>
      {brazo(-1, brazoI)}
      <path d={`M ${-58 * k} ${hT + 6} Q ${-60 * k} ${hT + 90 * k} ${-50 * k} ${hT + 150 * k} L ${50 * k} ${hT + 150 * k} Q ${60 * k} ${hT + 90 * k} ${58 * k} ${hT + 6} Q 0 ${hT - 18} ${-58 * k} ${hT + 6} Z`} fill={playera} />
      {rayas && [0.35, 0.55].map((q, i) => <rect key={i} x={-58 * k} y={hT + 150 * k * q} width={116 * k} height={10} fill="#fff" opacity={0.75} />)}
      <path d={`M ${-58 * k} ${hT + 6} Q ${-60 * k} ${hT + 90 * k} ${-50 * k} ${hT + 150 * k} L ${50 * k} ${hT + 150 * k} Q ${60 * k} ${hT + 90 * k} ${58 * k} ${hT + 6} Q 0 ${hT - 18} ${-58 * k} ${hT + 6} Z`} fill="url(#c-tela)" />
      <path d={`M -22 ${hT - 2} Q 0 ${hT + 18} 22 ${hT - 2}`} stroke={osc(playera, 0.35)} strokeWidth={6} fill="none" />
      <path d={`M ${-30 * k} ${hT + 70 * k} q 14 10 10 34 M ${26 * k} ${hT + 90 * k} q -10 10 -6 30`} stroke="#000" strokeOpacity={0.12} strokeWidth={3} fill="none" />
      {cuello && <path d={`M -26 ${hT - 4} L -6 ${hT + 26} L 0 ${hT + 8} L 6 ${hT + 26} L 26 ${hT - 4}`} fill={cuello} stroke="#000" strokeOpacity={0.15} strokeWidth={2} />}
      {mochila && !espalda && [-1, 1].map((d) => <path key={d} d={`M ${d * 40 * k} ${hT - 2} L ${d * 46 * k} ${hT + 110 * k}`} stroke={osc(mochila, 0.2)} strokeWidth={14} strokeLinecap="round" />)}
      {mochila && espalda && <g><rect x={-46 * k} y={hT + 14} width={92 * k} height={120 * k} rx={22} fill={mochila} /><rect x={-46 * k} y={hT + 14} width={92 * k} height={120 * k} rx={22} fill="url(#c-tela)" />
        <rect x={-34 * k} y={hT + 70 * k} width={68 * k} height={46 * k} rx={12} fill={osc(mochila, 0.15)} /><path d={`M ${-30 * k} ${hT + 74 * k} L ${30 * k} ${hT + 74 * k}`} stroke="url(#c-acero)" strokeWidth={4} /></g>}
      {detalle}
      {brazo(1, brazoD)}
    </g>
    {/* cabeza */}
    <g transform={`rotate(${rot} 0 ${hC + cab})`}>
      <rect x={-16} y={hC + cab - 16} width={32} height={40} fill={osc(piel, 0.15)} />
      {[-1, 1].map((d) => <g key={d}><ellipse cx={d * cab * 0.98} cy={hC + 6} rx={14} ry={20} fill={piel} /><ellipse cx={d * cab * 0.98} cy={hC + 6} rx={7} ry={11} fill={osc(piel, 0.25)} /></g>)}
      <ellipse cx={0} cy={hC} rx={cab * 0.95} ry={cab} fill={piel} />
      <ellipse cx={0} cy={hC} rx={cab * 0.95} ry={cab} fill="url(#c-cara)" />
      {/* pelo: casco con volumen, fleco en mechones y brillo */}
      <path d={`M ${-cab * 1.0} ${hC + cab * 0.1} Q ${-cab * 1.12} ${hC - cab * 0.9} ${-cab * 0.35} ${hC - cab * 1.12} Q ${cab * 0.3} ${hC - cab * 1.22} ${cab * 0.85} ${hC - cab * 0.82} Q ${cab * 1.12} ${hC - cab * 0.45} ${cab * 1.0} ${hC + cab * 0.1}
        Q ${cab * 0.92} ${hC - cab * 0.2} ${cab * 0.8} ${hC - cab * 0.3} L ${-cab * 0.8} ${hC - cab * 0.3} Q ${-cab * 0.92} ${hC - cab * 0.2} ${-cab * 1.0} ${hC + cab * 0.1} Z`} fill={pelo} />
      {Array.from({ length: 8 }, (_, i) => { const k = i / 7, bx = lerp(-cab * 0.82, cab * 0.82, k), largo = cab * (0.22 + 0.06 * Math.sin(i * 2.3 + seed)), lado = k < 0.5 ? -1 : 1;
        return <path key={i} d={`M ${bx - cab * 0.16} ${hC - cab * 0.5} Q ${bx - cab * 0.02} ${hC - cab * 0.5 + largo * 0.4} ${bx + lado * cab * 0.06} ${hC - cab * 0.5 + largo} Q ${bx + cab * 0.1} ${hC - cab * 0.5 + largo * 0.3} ${bx + cab * 0.2} ${hC - cab * 0.5} Z`} fill={pelo} />; })}
      {Array.from({ length: 6 }, (_, i) => <path key={'m' + i} d={`M ${-cab * 0.7 + i * cab * 0.26} ${hC - cab * 0.98 + Math.abs(i - 2.5) * cab * 0.06} q ${cab * 0.12} ${cab * 0.2} ${cab * 0.06} ${cab * 0.42}`} stroke={cla(pelo, 0.18)} strokeWidth={3} fill="none" opacity={0.7} strokeLinecap="round" />)}
      <path d={`M ${-cab * 0.62} ${hC - cab * 0.82} Q ${-cab * 0.15} ${hC - cab * 1.08} ${cab * 0.4} ${hC - cab * 0.9}`} stroke="#fff" strokeOpacity={0.25} strokeWidth={8} fill="none" strokeLinecap="round" filter="url(#c-b2)" />
      <path d={`M ${-cab * 0.8} ${hC - cab * 0.32} Q 0 ${hC - cab * 0.12} ${cab * 0.8} ${hC - cab * 0.32}`} stroke="#000" strokeOpacity={0.18} strokeWidth={8} fill="none" filter="url(#c-b4)" />
      {espalda && <g><ellipse cx={0} cy={hC + 2} rx={cab * 0.98} ry={cab * 1.02} fill={pelo} />
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-cab * 0.6 + i * cab * 0.2} ${hC - cab * 0.9} q ${cab * 0.1} ${cab * 0.8} ${-cab * 0.02} ${cab * 1.6}`} stroke={cla(pelo, 0.15)} strokeWidth={3} fill="none" opacity={0.6} />)}
        <path d={`M ${-cab * 0.5} ${hC - cab * 0.7} Q 0 ${hC - cab * 0.95} ${cab * 0.5} ${hC - cab * 0.7}`} stroke="#fff" strokeOpacity={0.22} strokeWidth={8} fill="none" filter="url(#c-b2)" /></g>}
      {!espalda && <g>
      {/* cejas, ojos, nariz, boca */}
      {[-1, 1].map((d) => <path key={d} d={`M ${d * cab * 0.18} ${hC - cab * 0.24 - cejas * d * 0} Q ${d * cab * 0.36} ${hC - cab * 0.34 - cejas * 6} ${d * cab * 0.52} ${hC - cab * 0.26}`} stroke={pelo} strokeWidth={6} strokeLinecap="round" fill="none" />)}
      {[-1, 1].map((d) => <g key={'o' + d} transform={`translate(${d * cab * 0.35} ${hC + 2}) scale(1 ${ojo})`}>
        <ellipse rx={cab * 0.16} ry={cab * 0.19} fill="#fbf7f0" />
        <circle cx={mira[0] * cab * 0.06} cy={mira[1] * cab * 0.06} r={cab * 0.115} fill="#3a2316" />
        <circle cx={mira[0] * cab * 0.06} cy={mira[1] * cab * 0.06} r={cab * 0.06} fill="#0d0806" />
        <circle cx={mira[0] * cab * 0.06 - cab * 0.04} cy={mira[1] * cab * 0.06 - cab * 0.05} r={cab * 0.04} fill="#fff" />
        <path d={`M ${-cab * 0.17} ${-cab * 0.06} Q 0 ${-cab * 0.24} ${cab * 0.17} ${-cab * 0.06}`} stroke="#2a1a12" strokeWidth={3} fill="none" />
      </g>)}
      {lentes && <g fill="none" stroke="#1a1a1a" strokeWidth={6}><rect x={-cab * 0.62} y={hC - cab * 0.2} width={cab * 0.52} height={cab * 0.42} rx={cab * 0.12} /><rect x={cab * 0.1} y={hC - cab * 0.2} width={cab * 0.52} height={cab * 0.42} rx={cab * 0.12} /><path d={`M ${-cab * 0.1} ${hC - cab * 0.05} q ${cab * 0.1} -8 ${cab * 0.2} 0`} />
        <path d={`M ${-cab * 0.52} ${hC - cab * 0.14} l ${cab * 0.14} ${cab * 0.24}`} stroke="#fff" strokeOpacity={0.5} strokeWidth={3} /></g>}
      <path d={`M ${-cab * 0.04} ${hC + cab * 0.18} Q ${cab * 0.06} ${hC + cab * 0.3} ${-cab * 0.08} ${hC + cab * 0.32}`} stroke={osc(piel, 0.35)} strokeWidth={4} fill="none" strokeLinecap="round" />
      {[-1, 1].map((d) => <ellipse key={'c' + d} cx={d * cab * 0.55} cy={hC + cab * 0.32} rx={cab * 0.16} ry={cab * 0.09} fill="#e0705a" opacity={0.28} />)}
      {boca === 'sonrisa' && <path d={`M ${-cab * 0.24} ${hC + cab * 0.48} Q 0 ${hC + cab * 0.7} ${cab * 0.24} ${hC + cab * 0.48}`} stroke="#5a2216" strokeWidth={5} fill="none" strokeLinecap="round" />}
      {boca === 'risa' && <g><path d={`M ${-cab * 0.28} ${hC + cab * 0.44} Q 0 ${hC + cab * 0.92} ${cab * 0.28} ${hC + cab * 0.44} Z`} fill="#5a1a14" /><path d={`M ${-cab * 0.2} ${hC + cab * 0.47} L ${cab * 0.2} ${hC + cab * 0.47} L ${cab * 0.16} ${hC + cab * 0.55} L ${-cab * 0.16} ${hC + cab * 0.55} Z`} fill="#fff" /></g>}
      {boca === 'o' && <ellipse cx={0} cy={hC + cab * 0.56} rx={cab * 0.12} ry={cab * 0.16} fill="#4a1610" />}
      {boca === 'ay' && <path d={`M ${-cab * 0.26} ${hC + cab * 0.6} L ${-cab * 0.1} ${hC + cab * 0.5} L ${cab * 0.06} ${hC + cab * 0.6} L ${cab * 0.24} ${hC + cab * 0.5}`} stroke="#4a1610" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {boca === 'seria' && <path d={`M ${-cab * 0.18} ${hC + cab * 0.56} L ${cab * 0.18} ${hC + cab * 0.56}`} stroke="#5a2216" strokeWidth={5} strokeLinecap="round" />}
      </g>}
    </g>
  </g>;
}
// Adulto genérico (papá, mamá, Don Joaquín, el señor que compró las plantas). (x,y) = pies; mide ~620 px con s=1.
function Adulto({ x, y, s = 1, piel = '#a86f48', pelo = '#241a14', canas = 0, camisa = '#6d4fa3', pantalon = '#3a3a40', brazoD = 8, brazoI = -8, t = 0, sombrero = null, bigote = false,
  boca = 'sonrisa', mira = [0, 0], delantal = null, mujer = false, seed = 3, carga, cruzados = false, cejas = 0 }) {
  const hT = -360, cab = 66, hC = hT - 36 - cab;
  const rot = mece(t, seed, 0.4) * 2;
  const pc = mix(pelo, '#d9d4cc', canas);
  const brazo = (lado, a) => { const sx = lado * 78, sy = hT + 22; return <g transform={`rotate(${-lado * a} ${sx} ${sy})`}>
    <path d={`M ${sx - 22} ${sy - 4} L ${sx - 17} ${sy + 170} L ${sx + 17} ${sy + 170} L ${sx + 22} ${sy - 4} Z`} fill={camisa} /><path d={`M ${sx - 22} ${sy - 4} L ${sx - 17} ${sy + 170} L ${sx + 17} ${sy + 170} L ${sx + 22} ${sy - 4} Z`} fill="url(#c-tela)" />
    <path d={`M ${sx - 15} ${sy + 160} L ${sx - 13} ${sy + 200} L ${sx + 13} ${sy + 200} L ${sx + 15} ${sy + 160} Z`} fill={piel} />
    <ellipse cx={sx} cy={sy + 212} rx={18} ry={21} fill={piel} /><ellipse cx={sx} cy={sy + 212} rx={18} ry={21} fill="url(#c-esfera)" opacity={0.6} />
  </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Sombra x={0} y={0} rx={120} ry={16} o={0.45} b="c-b8" />
    {[-1, 1].map((d) => <g key={d}>
      <path d={`M ${d * 38 - 30} ${hT + 200} L ${d * 38 - 26} ${-26} L ${d * 38 + 26} ${-26} L ${d * 38 + 30} ${hT + 200} Z`} fill={pantalon} />
      <path d={`M ${d * 38 - 30} ${hT + 200} L ${d * 38 - 26} ${-26} L ${d * 38 + 26} ${-26} L ${d * 38 + 30} ${hT + 200} Z`} fill="url(#c-cilindro)" />
      <path d={`M ${d * 38 - 32} 0 Q ${d * 38 - 32} -32 ${d * 38} -32 Q ${d * 38 + 44} -30 ${d * 38 + 44} -6 L ${d * 38 + 44} 0 Z`} fill="#2a1c14" />
      <rect x={d * 38 - 32} y={-5} width={76} height={5} rx={2} fill="#000" opacity={0.6} />
    </g>)}
    {brazo(-1, cruzados ? -4 : brazoI)}
    <path d={`M -84 ${hT + 8} Q -92 ${hT + 120} -78 ${hT + 230} L 78 ${hT + 230} Q 92 ${hT + 120} 84 ${hT + 8} Q 0 ${hT - 22} -84 ${hT + 8} Z`} fill={camisa} />
    <path d={`M -84 ${hT + 8} Q -92 ${hT + 120} -78 ${hT + 230} L 78 ${hT + 230} Q 92 ${hT + 120} 84 ${hT + 8} Q 0 ${hT - 22} -84 ${hT + 8} Z`} fill="url(#c-tela)" />
    {!mujer && <><path d={`M -26 ${hT - 4} L 0 ${hT + 34} L 26 ${hT - 4}`} fill={osc(camisa, 0.25)} />{[0, 1, 2, 3].map((i) => <circle key={i} cx={0} cy={hT + 60 + i * 42} r={4} fill={cla(camisa, 0.5)} />)}<path d={`M 0 ${hT + 34} L 0 ${hT + 230}`} stroke="#000" strokeOpacity={0.18} strokeWidth={2} /></>}
    {mujer && <path d={`M -30 ${hT - 2} Q 0 ${hT + 30} 30 ${hT - 2}`} stroke={osc(camisa, 0.3)} strokeWidth={6} fill="none" />}
    {delantal && <><path d={`M -60 ${hT + 90} L 60 ${hT + 90} L 70 ${hT + 300} L -70 ${hT + 300} Z`} fill={delantal} /><path d={`M -60 ${hT + 90} L 60 ${hT + 90} L 70 ${hT + 300} L -70 ${hT + 300} Z`} fill="url(#c-tela)" />
      <rect x={-40} y={hT + 170} width={80} height={56} rx={6} fill="#000" opacity={0.12} /></>}
    {carga}
    {cruzados ? <g>
      {brazo(1, 4)}
      <path d={`M -96 ${hT + 120} Q 0 ${hT + 170} 96 ${hT + 120} L 96 ${hT + 168} Q 0 ${hT + 214} -96 ${hT + 168} Z`} fill={camisa} />
      <path d={`M -96 ${hT + 120} Q 0 ${hT + 170} 96 ${hT + 120} L 96 ${hT + 168} Q 0 ${hT + 214} -96 ${hT + 168} Z`} fill="#000" opacity={0.18} />
      <path d={`M -90 ${hT + 126} Q 0 ${hT + 172} 90 ${hT + 126}`} stroke="#fff" strokeOpacity={0.15} strokeWidth={3} fill="none" />
      <ellipse cx={-92} cy={hT + 136} rx={20} ry={18} fill={piel} /><ellipse cx={92} cy={hT + 150} rx={20} ry={18} fill={piel} />
    </g> : brazo(1, brazoD)}
    <g transform={`rotate(${rot} 0 ${hC + cab})`}>
      <rect x={-20} y={hC + cab - 20} width={40} height={50} fill={osc(piel, 0.18)} />
      {[-1, 1].map((d) => <ellipse key={d} cx={d * cab * 0.92} cy={hC + 6} rx={12} ry={18} fill={osc(piel, 0.06)} />)}
      <ellipse cx={0} cy={hC} rx={cab * 0.86} ry={cab * 1.04} fill={piel} />
      <ellipse cx={0} cy={hC} rx={cab * 0.86} ry={cab * 1.04} fill="url(#c-cara)" />
      {mujer
        ? <path d={`M ${-cab * 0.95} ${hC + cab * 1.1} Q ${-cab * 1.12} ${hC - cab * 1.2} 0 ${hC - cab * 1.12} Q ${cab * 1.12} ${hC - cab * 1.2} ${cab * 0.95} ${hC + cab * 1.1} L ${cab * 0.74} ${hC + cab * 0.2} Q ${cab * 0.6} ${hC - cab * 0.7} ${-cab * 0.1} ${hC - cab * 0.6} Q ${-cab * 0.6} ${hC - cab * 0.5} ${-cab * 0.74} ${hC + cab * 0.2} Z`} fill={pc} />
        : <path d={`M ${-cab * 0.88} ${hC - 4} Q ${-cab * 0.95} ${hC - cab * 1.12} 0 ${hC - cab * 1.1} Q ${cab * 0.95} ${hC - cab * 1.12} ${cab * 0.88} ${hC - 4} Q ${cab * 0.76} ${hC - cab * 0.62} ${cab * 0.2} ${hC - cab * 0.66} Q ${-cab * 0.5} ${hC - cab * 0.7} ${-cab * 0.88} ${hC - 4} Z`} fill={pc} />}
      <path d={`M ${-cab * 0.5} ${hC - cab * 0.86} Q 0 ${hC - cab * 1.04} ${cab * 0.4} ${hC - cab * 0.9}`} stroke="#fff" strokeOpacity={0.2} strokeWidth={5} fill="none" />
      {[-1, 1].map((d) => <path key={d} d={`M ${d * cab * 0.14} ${hC - cab * 0.28 - (d > 0 ? cejas * 8 : 0)} Q ${d * cab * 0.32} ${hC - cab * 0.38 - (d > 0 ? cejas * 12 : 0)} ${d * cab * 0.5} ${hC - cab * 0.3 - (d > 0 ? cejas * 4 : 0)}`} stroke={pc} strokeWidth={6} strokeLinecap="round" fill="none" />)}
      {[-1, 1].map((d) => <g key={'o' + d} transform={`translate(${d * cab * 0.32} ${hC - cab * 0.06})`}>
        <ellipse rx={cab * 0.12} ry={cab * 0.1} fill="#f6f0e6" /><circle cx={mira[0] * 5} cy={mira[1] * 4} r={cab * 0.075} fill="#2a1a10" /><circle cx={mira[0] * 5 - 3} cy={mira[1] * 4 - 3} r={2.4} fill="#fff" />
        <path d={`M ${-cab * 0.13} ${-cab * 0.04} Q 0 ${-cab * 0.15} ${cab * 0.13} ${-cab * 0.04}`} stroke="#2a1a12" strokeWidth={3} fill="none" /></g>)}
      <path d={`M 0 ${hC + cab * 0.02} Q ${cab * 0.12} ${hC + cab * 0.3} ${-cab * 0.06} ${hC + cab * 0.34}`} stroke={osc(piel, 0.35)} strokeWidth={4} fill="none" strokeLinecap="round" />
      {bigote && <path d={`M ${-cab * 0.34} ${hC + cab * 0.52} Q ${-cab * 0.2} ${hC + cab * 0.36} 0 ${hC + cab * 0.44} Q ${cab * 0.2} ${hC + cab * 0.36} ${cab * 0.34} ${hC + cab * 0.52} Q ${cab * 0.16} ${hC + cab * 0.5} 0 ${hC + cab * 0.52} Q ${-cab * 0.16} ${hC + cab * 0.5} ${-cab * 0.34} ${hC + cab * 0.52} Z`} fill={pc} />}
      {boca === 'sonrisa' && <path d={`M ${-cab * 0.22} ${hC + cab * 0.6} Q 0 ${hC + cab * 0.76} ${cab * 0.22} ${hC + cab * 0.6}`} stroke="#5a2216" strokeWidth={5} fill="none" strokeLinecap="round" />}
      {boca === 'o' && <ellipse cx={0} cy={hC + cab * 0.66} rx={cab * 0.1} ry={cab * 0.13} fill="#4a1610" />}
      {boca === 'seria' && <path d={`M ${-cab * 0.2} ${hC + cab * 0.64} Q 0 ${hC + cab * 0.6} ${cab * 0.2} ${hC + cab * 0.66}`} stroke="#5a2216" strokeWidth={5} fill="none" strokeLinecap="round" />}
      {sombrero === 'palma' && <g><ellipse cx={0} cy={hC - cab * 0.62} rx={cab * 1.9} ry={cab * 0.34} fill="#d8b46a" /><ellipse cx={0} cy={hC - cab * 0.62} rx={cab * 1.9} ry={cab * 0.34} fill="url(#c-esfera)" opacity={0.5} />
        <path d={`M ${-cab * 0.86} ${hC - cab * 0.66} Q ${-cab * 0.8} ${hC - cab * 1.5} 0 ${hC - cab * 1.52} Q ${cab * 0.8} ${hC - cab * 1.5} ${cab * 0.86} ${hC - cab * 0.66} Z`} fill="#e3c27c" />
        <rect x={-cab * 0.86} y={hC - cab * 0.86} width={cab * 1.72} height={cab * 0.18} fill="#6b3a1e" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${-cab * 0.8 + i * cab * 0.14} ${hC - cab * 0.9} l ${cab * 0.06} ${-cab * 0.5}`} stroke="#a8843e" strokeWidth={1.5} opacity={0.6} />)}
        <path d={`M ${-cab * 0.86} ${hC - cab * 0.66} Q ${-cab * 0.8} ${hC - cab * 1.5} 0 ${hC - cab * 1.52} Q ${cab * 0.8} ${hC - cab * 1.5} ${cab * 0.86} ${hC - cab * 0.66} Z`} fill="url(#c-cilindro)" /></g>}
      {sombrero === 'gorra' && <g><path d={`M ${-cab * 0.9} ${hC - cab * 0.5} Q ${-cab * 0.9} ${hC - cab * 1.2} 0 ${hC - cab * 1.18} Q ${cab * 0.9} ${hC - cab * 1.2} ${cab * 0.9} ${hC - cab * 0.5} Z`} fill="#2b3f74" /><path d={`M ${cab * 0.2} ${hC - cab * 0.55} Q ${cab * 1.3} ${hC - cab * 0.6} ${cab * 1.4} ${hC - cab * 0.4} L ${cab * 0.3} ${hC - cab * 0.4} Z`} fill="#22335f" /></g>}
    </g>
  </g>;
}

/* ============ rótulos de documental ============ */
// Rótulo tipo documental: línea pequeña en mayúsculas + texto en serif, con una raya que se dibuja.
function Rotulo({ x = 120, y = 150, arriba, texto, sub, tl, at = 0.3, color = '#fff', acento = '#F4C25A', alinear = 'start', tam = 64 }) {
  const e = cpr(tl, at, at + 0.7, suave3), e2 = cpr(tl, at + 0.25, at + 1.0, suave3);
  const dx = alinear === 'middle' ? -0.5 : alinear === 'end' ? -1 : 0;
  return <g opacity={e} style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,.55))' }}>
    {arriba && <text x={x} y={y} textAnchor={alinear} fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={5} fill={acento}>{arriba}</text>}
    <rect x={x + dx * 260 * e} y={y + 16} width={260 * e} height={2.5} fill={acento} />
    {texto && <text x={x} y={y + 16 + tam + 6} textAnchor={alinear} fontFamily={FUENTE.serif} fontWeight={600} fontSize={tam} fill={color} opacity={e2} style={{ fontVariationSettings: "'opsz' 96" }}>{texto}</text>}
    {sub && <text x={x} y={y + 16 + tam + 52} textAnchor={alinear} fontFamily={FUENTE.serif} fontStyle="italic" fontWeight={400} fontSize={34} fill={color} opacity={0.85 * e2}>{sub}</text>}
  </g>;
}
// Nota escrita a mano (con flecha opcional) sobre la escena.
function NotaMano({ x, y, texto, tl, at = 0, tam = 54, color = '#fff', rot = -4, flecha, o = 1 }) {
  const e = cpr(tl, at, at + 0.6, suave3);
  const chars = Math.floor(texto.length * e);
  return <g transform={`rotate(${rot} ${x} ${y})`} opacity={o} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.45))' }}>
    <text x={x} y={y} fontFamily={FUENTE.mano} fontWeight={700} fontSize={tam} fill={color}>{texto.slice(0, chars)}</text>
    {flecha && e > 0.6 && <path d={flecha} stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - cpr(tl, at + 0.4, at + 0.9))} />}
  </g>;
}

Object.assign(window, {
  CineDefs, CW, CH, FUENTE, cpr, cpop, suave3, mix, osc, cla, R, lerp, TEX,
  Sombra, Rayos, Polvo, Bokeh, Desenfoque, Papel, Tinte, Halo, Tablon, Puerta, Azulejo, Pared,
  Semilla, Monton, Frasco, Tapa, Trapito, Hoja, Tallo, PlantulaFrijol, MataJitomate, HierbaOlor, MacetaC: Maceta, Nene, Adulto, Rotulo, NotaMano,
  ILUSC: window.ILUSC || {},
});
