// Shot Libre 01 · Bacterias calientes — CHISTE MUDO (sin voz: efectos y música generada en gen-audio.mjs). Formato M4 · Ciclo (loop).
// Guion, letreros y fuentes: guion.md / narracion.json / verificacion.md. El dibujo es esquemático (caritas, bufandas y corazones).
// v2 (4 nov 2026, corrección de Robert «más directo»): chiste de 20.5 s, solo 4 letreros, sin contador, reloj ni barra de escala.
// Regla de dibujo (verificacion.md): cada bacteria se parte SOLA por la mitad (se alarga, se estrecha al centro y se separa en dos
// bacilos iguales); nunca se dibujan dos bacterias unidas o juntándose antes de partirse.
const AGAR = '#f1d27a', BAC = '#7fd88a', BAC_FRIO = '#a6dcef', BAC_CAL = '#ffb3a8', TINTA = KC.ink, GUANTE = '#8b6cff', GUANTE2 = '#6a4fe0';
const CAL_VIVO = '#ff5c8a';

/* ---------- BACTERIA CON CARITA (E. coli esquemática, bacilo) ---------- */
// Cara centrada en (cx, 0) dentro del sistema local de la bacteria. W = ancho del bacilo.
function Cara({ T, cx = 0, W, frio = 0, calor = 0, guino = 0, sorpresa = 0, mira = 0, seed = 1, o = 1 }) {
  if (o <= 0.01) return null;
  const ex = W * 0.22, ey = -W * 0.07, er = W * 0.15 * (1 + 0.25 * sorpresa);
  const parpadeo = ((T * 0.37 + seed * 0.23) % 1) < 0.035 ? 0.15 : 1;      // parpadea de vez en cuando
  const ceja = frio > 0.5 ? 1 : 0;
  const sube = calor * (W * 0.05 + Math.sin(T * 9 + seed) * W * 0.05);    // cejas que suben y bajan (pícaras)
  const ojo = (lado) => {
    const x = cx + lado * ex;
    if (lado > 0 && guino > 0.5) return <path d={`M ${x - er} ${ey} Q ${x} ${ey - er * 0.9} ${x + er} ${ey}`} stroke={TINTA} strokeWidth={W * 0.05} fill="none" strokeLinecap="round" />;
    return <g>
      <ellipse cx={x} cy={ey} rx={er} ry={er * parpadeo} fill="#fff" stroke={TINTA} strokeWidth={W * 0.035} />
      {parpadeo > 0.5 && <circle cx={x + mira * er * 0.35} cy={ey + er * 0.12} r={er * 0.5} fill={TINTA} />}
      {parpadeo > 0.5 && <circle cx={x + mira * er * 0.35 - er * 0.18} cy={ey - er * 0.1} r={er * 0.16} fill="#fff" />}
    </g>;
  };
  const castanea = Math.abs(Math.sin(T * 38 + seed * 2));
  const my = W * 0.24;
  return <g opacity={o}>
    {/* cachetes (sonrojo) */}
    <ellipse cx={cx - W * 0.4} cy={W * 0.13} rx={W * 0.13} ry={W * 0.075} fill={CAL_VIVO} opacity={0.85 * calor} />
    <ellipse cx={cx + W * 0.4} cy={W * 0.13} rx={W * 0.13} ry={W * 0.075} fill={CAL_VIVO} opacity={0.85 * calor} />
    {ojo(-1)}{ojo(1)}
    {/* cejas: preocupadas con frío, pícaras con calor */}
    {[-1, 1].map((l) => <line key={l} x1={cx + l * (ex - er * 0.9)} y1={ey - er * 1.35 - sube + (ceja ? -l * 0 : 0) + (ceja ? W * 0.02 : 0)} x2={cx + l * (ex + er * 0.8)} y2={ey - er * 1.45 - sube + (ceja ? W * 0.06 : 0) - (sorpresa * W * 0.06)}
      stroke={TINTA} strokeWidth={W * 0.045} strokeLinecap="round" opacity={Math.max(frio, calor, sorpresa)} />)}
    {/* boca */}
    {sorpresa > 0.5 ? <ellipse cx={cx} cy={my} rx={W * 0.08} ry={W * 0.1} fill="#7a1f2b" stroke={TINTA} strokeWidth={W * 0.03} />
      : frio > 0.5 ? <g>
        <rect x={cx - W * 0.2} y={my - W * 0.05 - castanea * W * 0.04} width={W * 0.4} height={W * 0.1 + castanea * W * 0.08} rx={W * 0.03} fill="#fff" stroke={TINTA} strokeWidth={W * 0.03} />
        <line x1={cx - W * 0.2} y1={my} x2={cx + W * 0.2} y2={my} stroke={TINTA} strokeWidth={W * 0.02} />
        {[-0.1, 0, 0.1].map((k) => <line key={k} x1={cx + k * W} y1={my - W * 0.05 - castanea * W * 0.04} x2={cx + k * W} y2={my + W * 0.05 + castanea * W * 0.04} stroke={TINTA} strokeWidth={W * 0.018} />)}
      </g>
      : <path d={`M ${cx - W * 0.2} ${my - W * 0.03} Q ${cx} ${my + W * (0.12 + 0.12 * calor)} ${cx + W * 0.2} ${my - W * 0.03}`} stroke={TINTA} strokeWidth={W * 0.045} fill={calor > 0.4 ? '#c2304a' : 'none'} strokeLinecap="round" />}
  </g>;
}
// Flagelos alrededor del cuerpo (E. coli: peritricos), en el sistema local; d = centro de la cápsula.
function Flagelos({ T, d = 0, L, W, seed = 1, o = 0.75 }) {
  const pts = [[-0.32, -1, -110], [0.18, -1, -70], [-0.12, 1, 110], [0.34, 1, 70], [-0.5, 0, 180]];
  return <g opacity={o}>{pts.map(([fx, lado, ang], i) => {
    const x0 = d + fx * L + (lado === 0 ? W * 0.05 : 0), y0 = lado * W * 0.48;
    const a = (ang * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux, len = L * 0.42;
    const w = (k) => Math.sin(T * 7 + seed * 3 + i * 1.7 + k * 2.2) * W * 0.16;
    const P = (k) => [x0 + ux * len * k + px * w(k) * k, y0 + uy * len * k + py * w(k) * k];
    const [a1, a2] = P(0.33), [b1, b2] = P(0.66), [c1, c2] = P(1);
    return <path key={i} d={`M ${x0} ${y0} C ${a1} ${a2}, ${b1} ${b2}, ${c1} ${c2}`} stroke={TINTA} strokeWidth={W * 0.04} fill="none" strokeLinecap="round" />;
  })}</g>;
}
// Bufanda tejida alrededor del bacilo (a la derecha de la cara). quita 0..1 = sale volando; pon 0..1 = aparece.
function Bufanda({ T, W, x, quita = 0, pon = 1, seed = 1 }) {
  if (pon <= 0.01 || quita >= 0.99) return null;
  const s = kEase.rebote(kclamp(pon, 0, 1));
  const sway = Math.sin(T * 3 + seed) * 8;
  return <g transform={`translate(${x + quita * W * 1.2} ${-quita * W * 2.2}) rotate(${quita * 70}) scale(${s})`} opacity={1 - quita}>
    <path d={`M ${W * 0.06} ${W * 0.45} q ${sway * 0.4} ${W * 0.35} ${W * 0.1 + sway} ${W * 0.72} l ${W * 0.2} 0 q ${-W * 0.04} ${-W * 0.36} ${-W * 0.02} ${-W * 0.72} Z`} fill={KC.red} stroke={TINTA} strokeWidth={W * 0.035} />
    <rect x={-W * 0.15} y={-W * 0.56} width={W * 0.32} height={W * 1.12} rx={W * 0.08} fill={KC.red} stroke={TINTA} strokeWidth={W * 0.035} />
    {[-0.32, -0.08, 0.16, 0.4].map((k) => <rect key={k} x={-W * 0.15} y={k * W - W * 0.05} width={W * 0.32} height={W * 0.09} fill="#fff" opacity=".9" />)}
    {[0, 1, 2].map((k) => <line key={k} x1={W * 0.1 + k * W * 0.08 + sway} y1={W * 1.17} x2={W * 0.1 + k * W * 0.08 + sway} y2={W * 1.3} stroke={TINTA} strokeWidth={W * 0.03} strokeLinecap="round" />)}
  </g>;
}
// Corazones que suben de UNA sola bacteria (cada una se siente "caliente" por su cuenta, no en pareja).
function Corazones({ T, W, o = 1, seed = 1 }) {
  if (o <= 0.01) return null;
  return <g opacity={o}>{[0, 1, 2].map((k) => {
    const u = (T * 0.62 + k / 3 + seed * 0.17) % 1, x = (k - 1) * W * 0.45 + Math.sin(T * 3 + k) * W * 0.12, y = -W * 0.62 - u * W * 1.3, s = W * 0.0042 * (0.6 + u * 0.6);
    return <path key={k} d="M 0 18 C -40 -10 -28 -42 0 -22 C 28 -42 40 -10 0 18 Z" transform={`translate(${x} ${y}) scale(${s * 3})`} fill={CAL_VIVO} stroke={TINTA} strokeWidth={4} opacity={Math.sin(Math.PI * u)} />;
  })}</g>;
}
// Gotas de sudor
function Sudor({ T, W, o = 1, seed = 1 }) {
  if (o <= 0.01) return null;
  return <g opacity={o}>{[0, 1].map((k) => {
    const u = (T * 0.8 + k * 0.5 + seed * 0.3) % 1, x = (k ? -1 : 1) * W * 0.62, y = -W * 0.42 + u * W * 0.7;
    return <path key={k} d={`M ${x} ${y - W * 0.12} Q ${x + W * 0.08} ${y} ${x} ${y + W * 0.05} Q ${x - W * 0.08} ${y} ${x} ${y - W * 0.12} Z`} fill="#bfefff" stroke={TINTA} strokeWidth={W * 0.025} opacity={1 - u * 0.6} />;
  })}</g>;
}
/* Bacteria completa. split 0..1 = fisión binaria: se alarga (0–0.5), se estrecha al centro (0.5–0.8) y se separa (0.8–1).
   Truco de contorno: primero se dibujan los dos contornos y luego los dos rellenos encima (se ve UN solo cuerpo hasta que se parte). */
function BacCara({ T, x, y, L, W, rot = 0, seed = 1, frio = 0, calor = 0, guino = 0, sorpresa = 0, mira = 0, split = 0, quita = 0, bufanda = 0, corazones = 0, sudor = 0, o = 1 }) {
  const sp = kclamp(split, 0, 1);
  const d0 = (L - W) / 2, d1 = L / 2;
  const d = sp < 0.5 ? d0 * kEase.suave(sp / 0.5) : sp < 0.8 ? klerp(d0, d1, kEase.suave((sp - 0.5) / 0.3)) : d1 + W * 0.35 * kEase.sale((sp - 0.8) / 0.2);
  const jx = Math.sin(T * 71 + seed * 3) * 3.2 * frio, jy = Math.cos(T * 63 + seed) * 2.2 * frio;   // tiritar
  const color = mixHex(mixHex(BAC, BAC_FRIO, kclamp(frio, 0, 1)), BAC_CAL, kclamp(calor, 0, 1) * 0.45);
  const caps = d > 0.5 ? [-d, d] : [0];
  const unaCara = 1 - kprog(sp, 0.6, 0.72), dosCaras = kprog(sp, 0.82, 0.92);   // una sola cara hasta que se separan
  const r = W / 2;
  // altura de la cintura (para la línea del tabique que se forma al centro)
  const e = d - (L / 2 - r), cint = e > 0 ? Math.sqrt(Math.max(0, r * r - e * e)) : r;
  return <g transform={`translate(${x + jx} ${y + jy}) rotate(${rot})`} opacity={o}>
    {caps.map((c, i) => <Flagelos key={'f' + i} T={T} d={c} L={L} W={W} seed={seed + i * 7} />)}
    {caps.map((c, i) => <rect key={'b' + i} x={c - L / 2} y={-r} width={L} height={W} rx={r} fill={TINTA} stroke={TINTA} strokeWidth={W * 0.13} />)}
    {caps.map((c, i) => <rect key={'r' + i} x={c - L / 2} y={-r} width={L} height={W} rx={r} fill={color} />)}
    {caps.map((c, i) => <rect key={'h' + i} x={c - L / 2 + r * 0.6} y={-r + W * 0.12} width={L - r * 1.2} height={W * 0.16} rx={W * 0.08} fill="#fff" opacity=".3" />)}
    {sp > 0.45 && sp < 0.82 && <line x1={0} y1={-cint} x2={0} y2={cint} stroke={TINTA} strokeWidth={W * 0.05} opacity={kprog(sp, 0.45, 0.6) * 0.8} />}
    {/* escarcha */}
    {frio > 0.05 && [-0.3, -0.1, 0.12, 0.3].map((k, i) => <path key={i} d={`M ${k * L - 7} ${r - 2} L ${k * L} ${r + W * 0.16 * frio * (0.6 + 0.4 * (i % 2))} L ${k * L + 7} ${r - 2} Z`} fill="#eaffff" stroke={TINTA} strokeWidth={3} />)}
    {frio > 0.05 && [-1, 1].map((l) => <path key={l} d={`M ${l * (L / 2 + 16)} ${-r * 0.6} q ${l * 14} ${r * 0.6} 0 ${r * 1.2}`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={frio * (0.4 + 0.6 * Math.abs(Math.sin(T * 17 + seed)))} />)}
    <Cara T={T} cx={0} W={W} frio={frio} calor={calor} guino={guino} sorpresa={sp > 0.15 ? 1 : sorpresa} mira={mira} seed={seed} o={unaCara} />
    {dosCaras > 0 && [-1, 1].map((l) => <Cara key={l} T={T} cx={l * d} W={W} calor={calor} sorpresa={1} mira={-l} seed={seed + l} o={dosCaras} />)}
    <Bufanda T={T} W={W} x={W * 0.62} quita={quita} pon={bufanda} seed={seed} />
    <Sudor T={T} W={W} o={sudor * (sp > 0.1 ? 0 : 1)} seed={seed} />
    <Corazones T={T} W={W} o={corazones * (1 - kprog(sp, 0, 0.15))} seed={seed} />
  </g>;
}
// Una bacteria que se parte en [a, b]; después de b quedan dos hijas iguales que se alejan un poquito.
function Divide({ T, a, b, x, y, L, W, rot = 0, seed = 1, cara = {}, hijas = {} }) {
  if (T < b) return <BacCara T={T} x={x} y={y} L={L} W={W} rot={rot} seed={seed} {...cara} split={kprog(T, a, b)} />;
  const off = L / 2 + W * 0.35 + 12 * kprog(T, b, b + 1.5, kEase.sale), rr = (rot * Math.PI) / 180;
  const sorp = 1 - kprog(T, b + 0.9, b + 1.3);
  return <>{[-1, 1].map((l) => <BacCara key={l} T={T} x={x + l * Math.cos(rr) * off} y={y + l * Math.sin(rr) * off} L={L} W={W} rot={rot + l * 4 * kprog(T, b, b + 1)} seed={seed + l * 5}
    sorpresa={sorp} mira={-l * sorp} {...hijas} />)}</>;
}
// Tiempo en que una fisión de [a, b] se separa (para el "plop"): split = 0.8
const kSepara = (a, b) => a + 0.8 * (b - a);

/* ---------- PLACA (macro, en perspectiva) ---------- */
function PlacaMacro({ x, y, rx = 70, colonias = 0, seed = 3, s = 1 }) {
  const ry = rx * 0.32, g = krng(seed);
  const cols = Array.from({ length: 46 }, () => { const a = g() * 6.283, d = Math.sqrt(g()) * 0.82; return [Math.cos(a) * d * rx, Math.sin(a) * d * ry, 0.5 + g()]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={ry * 0.5} rx={rx * 1.04} ry={ry * 1.1} fill="rgba(0,0,0,.18)" />
    <path d={`M ${-rx} 0 L ${-rx} ${ry * 0.45} A ${rx} ${ry} 0 0 0 ${rx} ${ry * 0.45} L ${rx} 0 Z`} fill="#cfe7ee" stroke={TINTA} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={AGAR} stroke={TINTA} strokeWidth={4} />
    {colonias > 0 && cols.slice(0, Math.round(46 * kclamp(colonias, 0, 1))).map(([cx, cy, k], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx * 0.05 * k} ry={rx * 0.05 * k * 0.4} fill="#fff6dc" stroke="#a88a3a" strokeWidth={1.2} />)}
    <ellipse cx={-rx * 0.3} cy={-ry * 0.35} rx={rx * 0.35} ry={ry * 0.18} fill="#fff" opacity=".45" />
  </g>;
}

/* ---------- MANO CON GUANTE (lleva la placa) ---------- */
function ManoPlaca({ x, y, colonias = 0 }) {
  return <g>
    {/* brazo con bata, desde abajo */}
    <path d={`M ${x + 34} ${y + 30} L ${x + 150} ${KH + 60} L ${x + 330} ${KH + 60} L ${x + 120} ${y + 10} Z`} fill="#f7f7f2" stroke={TINTA} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M ${x + 30} ${y + 20} L ${x + 124} ${y - 2} L ${x + 140} ${y + 40} L ${x + 46} ${y + 64} Z`} fill={GUANTE2} stroke={TINTA} strokeWidth={6} />
    <ellipse cx={x + 10} cy={y + 26} rx={62} ry={32} fill={GUANTE} stroke={TINTA} strokeWidth={6} />
    <PlacaMacro x={x} y={y} rx={78} colonias={colonias} seed={9} />
    {/* pulgar y dedos sobre el borde */}
    <ellipse cx={x - 70} cy={y + 6} rx={16} ry={26} fill={GUANTE} stroke={TINTA} strokeWidth={5} transform={`rotate(-20 ${x - 70} ${y + 6})`} />
    {[0, 1, 2].map((k) => <ellipse key={k} cx={x + 56 + k * 18} cy={y + 20 + k * 6} rx={13} ry={22} fill={GUANTE} stroke={TINTA} strokeWidth={5} transform={`rotate(25 ${x + 56 + k * 18} ${y + 20 + k * 6})`} />)}
  </g>;
}

/* ---------- LABORATORIO (refri + incubadora sobre la mesa) ---------- */
const REFRI = { x: 210, y: 770, w: 240, h: 410 }, INCU = { x: 520, y: 640, w: 520, h: 540 }, MESA = 1180;
const PLACA_REFRI = { x: 330, y: 1000 }, PLACA_INCU = { x: 760, y: 1035 };
function Ventana({ T, dia }) {
  const x = 230, y = 520, w = 230, h = 190;
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={dia ? '#9fe3ff' : '#1d2a5c'} stroke={TINTA} strokeWidth={8} />
    {dia ? <g><circle cx={x + 150} cy={y + 120} r={44} fill={KC.yellow} stroke={TINTA} strokeWidth={5} />
      {Array.from({ length: 8 }, (_, i) => { const a = i * 0.785 + T * 0.4; return <line key={i} x1={x + 150 + Math.cos(a) * 56} y1={y + 120 + Math.sin(a) * 56} x2={x + 150 + Math.cos(a) * 74} y2={y + 120 + Math.sin(a) * 74} stroke={KC.orange} strokeWidth={6} strokeLinecap="round" />; })}
      <ellipse cx={x + 70} cy={y + 60} rx={44} ry={18} fill="#fff" /></g>
      : <g><path d={`M ${x + 160} ${y + 40} a 34 34 0 1 0 22 60 a 26 26 0 1 1 -22 -60 Z`} fill="#fff6c9" stroke={TINTA} strokeWidth={4} />
        {[[40, 40], [90, 120], [60, 150], [190, 150], [120, 30]].map(([a, b], i) => <circle key={i} cx={x + a} cy={y + b} r={4 + (i % 2) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(T * 4 + i)} />)}</g>}
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={TINTA} strokeWidth={7} />
    <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={TINTA} strokeWidth={7} />
  </g>;
}
function Laboratorio({ T, dia = false, refriAbre = 0, incuAbre = 0, placaEn = 'refri', colonias = 0, temp = 4, calienta = 0 }) {
  const R = REFRI, I = INCU;
  const puerta = (x0, y0, w, h, abre, vidrio, hacia) => {   // puerta con bisagra a la izquierda que gira hacia nosotros
    const a = abre * 1.9, k = Math.cos(a), ancho = w * k;
    return <g>
      <path d={`M ${x0} ${y0} L ${x0 + ancho} ${y0 - 18 * Math.sin(a)} L ${x0 + ancho} ${y0 + h + 18 * Math.sin(a)} L ${x0} ${y0 + h} Z`}
        fill={k > 0 ? vidrio : '#d5dde2'} stroke={TINTA} strokeWidth={7} strokeLinejoin="round" opacity={k > 0 ? 1 : 1} />
      {k > 0.2 && <line x1={x0 + ancho - 26 * k} y1={y0 + h * 0.35} x2={x0 + ancho - 26 * k} y2={y0 + h * 0.6} stroke={TINTA} strokeWidth={9} strokeLinecap="round" />}
    </g>;
  };
  const glow = calienta;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <Ventana T={T} dia={dia} />
    {/* mesa */}
    <rect x={-20} y={MESA} width={KW + 40} height={60} fill="#f4efe4" stroke={TINTA} strokeWidth={8} />
    <rect x={-20} y={MESA + 60} width={KW + 40} height={KH} fill="#5b7c99" stroke={TINTA} strokeWidth={8} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={30 + k * 265} y={MESA + 100} width={235} height={420} rx={14} fill="#6d8fae" stroke={TINTA} strokeWidth={6} />)}
    {/* refri de laboratorio (puerta de vidrio) */}
    <rect x={R.x} y={R.y} width={R.w} height={R.h} rx={22} fill="#f2f7fa" stroke={TINTA} strokeWidth={8} />
    <rect x={R.x + 16} y={R.y + 20} width={R.w - 32} height={R.h - 40} rx={12} fill="#bfefff" stroke={TINTA} strokeWidth={5} />
    {[R.y + 140, R.y + 260].map((yy) => <line key={yy} x1={R.x + 18} y1={yy} x2={R.x + R.w - 18} y2={yy} stroke="#7fb6c9" strokeWidth={6} />)}
    {placaEn === 'refri' && <PlacaMacro x={PLACA_REFRI.x} y={PLACA_REFRI.y} rx={70} colonias={colonias} seed={9} />}
    {puerta(R.x + 16, R.y + 20, R.w - 32, R.h - 40, refriAbre, 'rgba(190,240,255,.55)')}
    <text x={R.x + R.w / 2} y={R.y + 70} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#1f6f8b">4 °C</text>
    {/* incubadora */}
    <rect x={I.x} y={I.y} width={I.w} height={I.h} rx={26} fill="#eef1f3" stroke={TINTA} strokeWidth={8} />
    <rect x={I.x + 24} y={I.y + 18} width={I.w - 48} height={80} rx={14} fill="#1b2230" stroke={TINTA} strokeWidth={5} />
    <text x={I.x + I.w / 2} y={I.y + 76} textAnchor="middle" style={{ font:`700 50px ${KF.mono}` }} fill={temp >= 36.95 ? KC.mint : '#ff7a59'}>{temp.toFixed(1)} °C</text>
    <rect x={I.x + 24} y={I.y + 116} width={I.w - 48} height={I.h - 140} rx={16} fill={mixHex('#fff0d6', '#ffb36b', glow)} stroke={TINTA} strokeWidth={5} />
    {[I.y + 300, I.y + 430].map((yy) => <line key={yy} x1={I.x + 30} y1={yy} x2={I.x + I.w - 30} y2={yy} stroke="#b9a68a" strokeWidth={6} />)}
    {/* resistencia que se pone al rojo */}
    <path d={`M ${I.x + 60} ${I.y + 150} ${Array.from({ length: 10 }, (_, k) => `L ${I.x + 90 + k * 40} ${I.y + 150 + (k % 2 ? 26 : 0)}`).join(' ')}`} stroke={mixHex('#8a8f96', '#ff3b2f', glow)} strokeWidth={8} fill="none" strokeLinejoin="round" />
    {placaEn === 'incu' && <PlacaMacro x={PLACA_INCU.x} y={PLACA_INCU.y} rx={70} colonias={colonias} seed={9} />}
    {puerta(I.x + 24, I.y + 116, I.w - 48, I.h - 140, incuAbre, `rgba(255,236,205,${0.55 - 0.2 * glow})`)}
    {/* ondas de calor */}
    {glow > 0.05 && [0, 1, 2, 3].map((k) => { const u = (T * 0.7 + k * 0.25) % 1; return <path key={k} d={`M ${I.x + 110 + k * 110} ${I.y - 10 - u * 120} q 18 -22 0 -44 q -18 -22 0 -44`} stroke={KC.orange} strokeWidth={8} fill="none" strokeLinecap="round" opacity={glow * Math.sin(Math.PI * u)} />; })}
  </svg>;
}

/* ---------- INTERIOR DEL REFRI (escena de cerca) ---------- */
function RefriDentro({ T, placa = true, colonias = 0 }) {
  return <>
    <FondoMarca color={KC.cyan} patron="puntos" T={T} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 8%, rgba(255,255,255,.75), rgba(255,255,255,0) 40%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.7), rgba(255,255,255,0) 30%), radial-gradient(circle at 100% 0%, rgba(255,255,255,.6), rgba(255,255,255,0) 28%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {/* carámbanos arriba */}
      {Array.from({ length: 14 }, (_, i) => { const x = 30 + i * 76, h = 40 + ((i * 37) % 5) * 18; return <path key={i} d={`M ${x} 0 L ${x + 30} 0 L ${x + 15} ${h} Z`} fill="#effdff" stroke="#7fc6dc" strokeWidth={3} />; })}
      {/* repisa de rejilla */}
      <rect x={-10} y={1400} width={KW + 20} height={26} rx={10} fill="#f6fbff" stroke={TINTA} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={20 + i * 92} y1={1426} x2={20 + i * 92} y2={1480} stroke="#9cc9da" strokeWidth={5} />)}
      {placa && <PlacaMacro x={300} y={1372} rx={170} colonias={colonias} seed={4} />}
      {/* tubitos en una gradilla */}
      {[0, 1, 2].map((k) => <g key={k}><rect x={60 + k * 0} y={0} width={0} height={0} /></g>)}
    </svg>
    <Ambiente T={T} n={34} seed={12} color="rgba(255,255,255,.85)" tam={[3, 9]} vel={-26} />
  </>;
}

/* ---------- VISTA AL MICROSCOPIO (círculo oscuro que puede crecer a toda la pantalla) ---------- */
function FondoMicro({ T, id = 'fm' }) {
  return <>
    <defs><radialGradient id={id} cx="50%" cy="45%" r="60%"><stop offset="0" stopColor="#1d2b45" /><stop offset="1" stopColor="#0b1220" stopOpacity="0" /></radialGradient></defs>
    <rect x={0} y={0} width={KW} height={KH} fill="#0b1220" />
    <rect x={0} y={0} width={KW} height={KH} fill={`url(#${id})`} />
    {Array.from({ length: 28 }, (_, i) => <line key={'v' + i} x1={i * 40} y1={0} x2={i * 40} y2={KH} stroke="rgba(0,210,255,.07)" strokeWidth={2} />)}
    {Array.from({ length: 49 }, (_, i) => <line key={'h' + i} x1={0} y1={i * 40} x2={KW} y2={i * 40} stroke="rgba(0,210,255,.07)" strokeWidth={2} />)}
    {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 40); const x = g() * KW, y = ((g() * KH - T * 14 * (0.5 + g())) % KH + KH) % KH; return <circle key={i} cx={x} cy={y} r={2 + g() * 4} fill="rgba(180,230,255,.25)" />; })}
  </>;
}
function MicroVista({ T, cx, cy, r, fx, fy, etiqueta = true, children, o = 1, id = 'mv' }) {
  if (r <= 1 || o <= 0.01) return null;
  const dx = cx - fx, dy = cy - fy, dd = Math.hypot(dx, dy) || 1, ex = cx - (dx / dd) * r, ey = cy - (dy / dd) * r;
  const full = r > 1000;
  return <div style={{ position:'absolute', inset:0, zIndex:20, opacity:o }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <defs>
        <clipPath id={id + "Clip"}><circle cx={cx} cy={cy} r={r} /></clipPath>
      </defs>
      {!full && fx != null && dd > r + 20 && <g>
        <line x1={fx} y1={fy} x2={ex} y2={ey} stroke={KC.cyan} strokeWidth={6} strokeDasharray="16 10" strokeDashoffset={-T * 40} strokeLinecap="round" />
        <circle cx={fx} cy={fy} r={20 + 4 * Math.sin(T * 6)} fill="none" stroke={KC.cyan} strokeWidth={6} />
      </g>}
      {!full && <circle cx={cx} cy={cy} r={r + 10} fill="rgba(0,0,0,.35)" />}
      <g clipPath={`url(#${id}Clip)`}>
        <FondoMicro T={T} id={id + 'Fm'} />
        {children}
      </g>
      {!full && <circle cx={cx} cy={cy} r={r} fill="none" stroke={KC.cyan} strokeWidth={10} />}
      {!full && <circle cx={cx} cy={cy} r={r - 30} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={60} />}
    </svg>
    {etiqueta && !full && <div style={{ position:'absolute', left:cx, top:cy - r - 4, transform:'translate(-50%,-50%)', whiteSpace:'nowrap', padding:'6px 20px', borderRadius:40,
      background:'rgba(14,15,18,.9)', border:`4px solid ${KC.cyan}`, color:KC.texto, font:`700 28px ${KF.mono}`, letterSpacing:1 }}>AL MICROSCOPIO · <i>E. coli</i></div>}
  </div>;
}
// Barra de escala sencilla (1 µm = pxUm píxeles)
function BarraUm({ x, y, pxUm, texto = '1 µm', o = 1 }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, opacity:o, color:KC.texto, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
    <div style={{ marginBottom:6 }}>{texto}</div>
    <div style={{ width:pxUm, height:8, background:KC.texto, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}

/* ---------- TERMÓMETRO (escala real de 0 a 40 °C) ---------- */
function Termo({ T, valor, o = 1, ideal = 0, simple = false }) {
  if (o <= 0.01) return null;
  const x = 92, y0 = 660, alto = 470, max = 40, t2y = (c) => y0 + alto - (kclamp(c, 0, max) / max) * alto;
  const col = mixHex('#3fa9ff', '#ff3b2f', kclamp((valor - 4) / 33, 0, 1));
  return <div style={{ position:'absolute', inset:0, zIndex:30, opacity:o, pointerEvents:'none' }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {ideal > 0 && <g opacity={ideal}><path d={`M ${x + 36} ${t2y(37)} l 24 -16 l 0 32 Z`} fill={KC.gold2} stroke={TINTA} strokeWidth={3} />
        <text x={x + 64} y={t2y(37) + 10} style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2} stroke={TINTA} strokeWidth={6} paintOrder="stroke" opacity={0.7 + 0.3 * Math.sin(T * 6)}>37°</text></g>}
      <rect x={x - 32} y={y0 - 20} width={64} height={alto + 40} rx={32} fill="#fff" stroke={TINTA} strokeWidth={7} />
      <rect x={x - 15} y={t2y(valor)} width={30} height={y0 + alto + 20 - t2y(valor)} rx={15} fill={col} />
      <circle cx={x} cy={y0 + alto + 52} r={52} fill={col} stroke={TINTA} strokeWidth={7} />
      <circle cx={x - 16} cy={y0 + alto + 36} r={12} fill="#fff" opacity=".5" />
      {!simple && [0, 10, 20, 30, 40].filter((c) => !(ideal > 0.1 && c === 40)).map((c) => <g key={c}><line x1={x + 32} y1={t2y(c)} x2={x + 52} y2={t2y(c)} stroke={TINTA} strokeWidth={5} />
        <text x={x + 58} y={t2y(c) + 9} style={{ font:`700 26px ${KF.mono}` }} fill={TINTA} stroke="#fff" strokeWidth={5} paintOrder="stroke">{c}°</text></g>)}
    </svg>
    {!simple && <div style={{ position:'absolute', left:x, top:y0 - 62, transform:'translate(-50%,-50%)', background:'rgba(14,15,18,.88)', border:`4px solid ${col}`, borderRadius:16,
      padding:'4px 14px', font:`700 34px ${KF.mono}`, color:KC.texto, whiteSpace:'nowrap' }}>{Math.round(valor)} °C</div>}
  </div>;
}

/* ---------- LETRERO (píldora que admite dos renglones) ---------- */
function Letrero({ T, at, until, children, y = 400, tam = 52, borde = KC.gold, ancho = 940 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:KW / 2, top:y, zIndex:42, transform:`translate(-50%,-50%) translateY(${e.y * 0.4}px) scale(${e.s})`, opacity:e.o,
    background:'rgba(14,15,18,.86)', color:KC.texto, border:`5px solid ${borde}`, borderRadius:36, padding:'16px 34px', maxWidth:ancho, width:'max-content',
    font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{children}</div>;
}
function Llama({ T, s = 1 }) {
  const f = 1 + 0.08 * Math.sin(T * 14);
  return <svg width={54 * s} height={66 * s} viewBox="-27 -60 54 66" style={{ display:'inline-block', verticalAlign:'-0.12em', marginLeft:10 }}>
    <path d={`M 0 4 C -24 4 -26 -16 -16 -30 C -12 -18 -6 -20 -6 -26 C -6 -40 4 -50 2 ${-58 * f} C 14 -44 26 -30 22 -14 C 20 -2 12 4 0 4 Z`} fill={KC.orange} stroke={TINTA} strokeWidth={4} />
    <path d="M 0 2 C -10 2 -12 -8 -6 -16 C -2 -10 2 -14 2 -22 C 10 -14 12 -4 0 2 Z" fill={KC.yellow} />
  </svg>;
}

/* ---------- EXPLOSIÓN: microcolonia que se duplica (rejilla por generación) ---------- */
const EL = 200, EW = 88, CAJA = [1000, 600];
function gridPos(g, idx) {
  const horiz = g % 2 === 0;
  const cols = 2 ** Math.ceil(g / 2), rows = 2 ** Math.floor(g / 2);
  let col = 0, row = 0;
  for (let k = 1; k <= g; k++) { const bit = (idx >> (g - k)) & 1; if (k % 2 === 1) col = col * 2 + bit; else row = row * 2 + bit; }
  const sx = horiz ? EL * 1.15 : EW * 1.45, sy = horiz ? EW * 1.45 : EL * 1.15;
  return { x: (col - (cols - 1) / 2) * sx, y: (row - (rows - 1) / 2) * sy, rot: horiz ? 0 : 90 };
}
function zGen(g) {
  const horiz = g % 2 === 0, cols = 2 ** Math.ceil(g / 2), rows = 2 ** Math.floor(g / 2);
  const sx = horiz ? EL * 1.15 : EW * 1.45, sy = horiz ? EW * 1.45 : EL * 1.15;
  const W = (cols - 1) * sx + (horiz ? EL : EW), H = (rows - 1) * sy + (horiz ? EW : EL);
  return Math.min(1, CAJA[0] / W, CAJA[1] / H);
}
// Tiempos del remate (relativos al inicio de la escena Remate). Los copia gen-audio.mjs.
const EXP = { t0: 0.9, paso: 0.42, D: 0.4, gens: 6 };
const tGen = (E, g) => E + EXP.t0 + g * EXP.paso;                 // empieza la división g → g+1
const tSepGen = (E, g) => tGen(E, g) + EXP.D * 0.5;               // se separan (plop)
function Microcolonia({ T, E }) {
  // generación actual o transición
  let cells = [], z = 1;
  if (T < tGen(E, 0)) {   // pausa cómica: se queda sola, mira a los lados… ¿eh?
    const mira = Math.sin((T - E) * 7) * kprog(T, E + 0.1, E + 0.3) * (1 - kprog(T, E + 0.55, E + 0.65));
    cells = [<BacCara key="0" T={T} x={0} y={0} L={EL} W={EW} seed={2} calor={0.7} corazones={1 - kprog(T, E - 0.2, E + 0.2)} mira={mira} sorpresa={kprog(T, E + 0.55, E + 0.6)} />];
    if (T > E + 0.45) cells.push(<text key="q" x={0} y={-EW * 1.0} textAnchor="middle" style={{ font:`400 ${150 * kEase.rebote(kprog(T, E + 0.45, E + 0.7))}px ${KF.titulo}` }} fill={KC.yellow} stroke={TINTA} strokeWidth={8} paintOrder="stroke">?</text>);
    z = zGen(0); }
  else {
    let g = 0; while (g < EXP.gens - 1 && T >= tGen(E, g + 1)) g++;
    const a = tGen(E, g), u = kprog(T, a, a + EXP.D);
    const zA = zGen(g), zB = zGen(g + 1); z = Math.exp(klerp(Math.log(zA), Math.log(zB), kEase.suave(u)));
    const n = 2 ** g;
    for (let i = 0; i < n; i++) {
      const P = gridPos(g, i);
      if (u < 0.62) { cells.push(<BacCara key={i} T={T} x={P.x} y={P.y} L={EL} W={EW} rot={P.rot} seed={i + 3} calor={0.7} split={u / 0.62} />); continue; }
      const v = kEase.suave(kprog(u, 0.62, 1)), rr = (P.rot * Math.PI) / 180, off = EL / 2 + EW * 0.35;
      for (const b of [0, 1]) {
        const l = b ? 1 : -1, Q = gridPos(g + 1, 2 * i + b);
        const sx = P.x + l * Math.cos(rr) * off, sy = P.y + l * Math.sin(rr) * off;
        cells.push(<BacCara key={i + '-' + b} T={T} x={klerp(sx, Q.x, v)} y={klerp(sy, Q.y, v)} L={EL} W={EW} rot={klerp(P.rot, Q.rot, v)} seed={2 * i + b + 11} calor={0.7} sorpresa={1 - v} />);
      }
    }
  }
  return { cells, z };
}

