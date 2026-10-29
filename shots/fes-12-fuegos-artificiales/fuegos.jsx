// Shot Festivo #12 · Año Nuevo · Químico: cada color de los fuegos artificiales es un metal distinto — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md (verificacion.md: APROBADO). El dibujo es esquemático: corte del cohete, átomos, escalones de energía y líneas del espectro simplificados.
const ROJO = '#ff3348', VERDE = '#3dff7a', AZUL = '#3d6bff', AMARI = '#ffd21a', NARAN = '#ff8a1f', DESLAVA = '#a9b8cc';
const COBRE = '#c8693a', CLORO = '#b8e04a', ESTRON = '#ff6b7d';

// Cielo de noche (violeta de marca) con estrellas que titilan
function Cielo({ T, seed = 4 }) {
  const g = krng(seed);
  const est = Array.from({ length: 70 }, () => [g() * KW, g() * 1300, 1 + g() * 3, g() * 6]);
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0b0630 0%, #1e0b52 45%, #3d1670 78%, #5b2380 100%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {est.map(([x, y, r, f], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.35 + 0.35 * Math.sin(T * 2 + f)} />)}
    </svg>
  </>;
}
// Azoteas de una ciudad mexicana (con tinacos) en el tercio de abajo
function Ciudad({ T, y = 1520, luz = 0 }) {
  const g = krng(9); let x = -20; const ed = [];
  while (x < KW) { const w = 110 + g() * 120, h = 140 + g() * 300; ed.push([x, w, h, g()]); x += w + 6; }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {ed.map(([ex, w, h, r], i) => <g key={i}>
      <rect x={ex} y={y + 300 - h} width={w} height={h + 400} fill="#140c22" stroke="#000" strokeWidth={3} />
      {r > 0.35 && <g><rect x={ex + w * 0.55} y={y + 300 - h - 46} width={40} height={40} rx={8} fill="#0c0814" /><rect x={ex + w * 0.55 - 4} y={y + 300 - h - 52} width={48} height={10} rx={4} fill="#0c0814" /></g>}
      {Array.from({ length: 6 }, (_, k) => { const wx = ex + 16 + (k % 3) * (w - 40) / 3, wy = y + 330 - h + Math.floor(k / 3) * 80; const on = krng(i * 9 + k)() > 0.4;
        return on ? <rect key={k} x={wx} y={wy} width={22} height={30} rx={3} fill={KC.gold2} opacity={0.55 + 0.25 * luz} /> : null; })}
    </g>)}
  </svg>;
}

// Estallido tipo palmera. at = momento del estallido; queda = no se apaga (para escenas largas)
function Estallido({ T, at, x, y, color, r = 260, n = 38, vida = 2.6, seed = 1, queda = false, palido = 0 }) {
  const u = T - at; if (u < 0 || (!queda && u > vida)) return null;
  const g = krng(seed), e = 1 - Math.exp(-u * 4.2);
  const cae = queda ? 22 * Math.min(u, 2) : 30 * u * u;
  const o = queda ? 0.85 + 0.15 * Math.sin(T * 5 + seed) : 1 - kprog(u, vida * 0.5, vida);
  const col = palido ? mixHex(color, DESLAVA, palido) : color;
  return <g opacity={o}>
    {u < 0.35 && <circle cx={x} cy={y} r={30 + 200 * u} fill="#fff" opacity={1 - u / 0.35} />}
    <circle cx={x} cy={y + cae * 0.5} r={r * e * 0.9} fill={col} opacity={0.12} />
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + g() * 0.12, rr = r * (0.78 + 0.22 * g());
      const px = x + Math.cos(a) * rr * e, py = y + Math.sin(a) * rr * e + cae;
      const qx = x + Math.cos(a) * rr * e * 0.5, qy = y + Math.sin(a) * rr * e * 0.5 + cae * 0.45;
      const tw = 0.7 + 0.3 * Math.sin(T * 14 + i * 2.3);
      return <g key={i}>
        <line x1={qx} y1={qy} x2={px} y2={py} stroke={col} strokeWidth={7} strokeLinecap="round" opacity={0.75} />
        <circle cx={px} cy={py} r={15 * tw} fill={col} opacity={0.55} />
        <circle cx={px} cy={py} r={6} fill="#fff" />
      </g>; })}
  </g>;
}
// Cohete que sube dejando estela; llega a (x1,y1) en `at`
function Subida({ T, at, x0, y0, x1, y1, dur = 0.6 }) {
  const u = kprog(T, at - dur, at); if (T < at - dur || T > at) return null;
  const e = kEase.sale(u), cx = klerp(x0, x1, e), cy = klerp(y0, y1, e);
  return <g>
    <line x1={klerp(x0, x1, Math.max(0, e - 0.35))} y1={klerp(y0, y1, Math.max(0, e - 0.35))} x2={cx} y2={cy} stroke="#ffd9a0" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
    <circle cx={cx} cy={cy} r={10} fill="#fff" /><circle cx={cx} cy={cy} r={20} fill={KC.gold2} opacity={0.5} />
  </g>;
}

// Átomo esquemático: núcleo + electrones en órbitas. salto 0..1 = un electrón brinca a la órbita de afuera
function Atomo({ T, x, y, r = 120, color = ESTRON, simbolo = 'Sr', salto = 0, brillo = 0, vel = 1 }) {
  const orb = [r * 0.45, r * 0.78];
  return <g transform={`translate(${x} ${y})`}>
    {brillo > 0 && <circle r={r * 1.5} fill={color} opacity={0.25 * brillo} />}
    <circle r={r} fill={color} opacity={0.22} stroke={color} strokeWidth={4} />
    {orb.map((o, i) => <circle key={i} r={o} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} strokeDasharray="8 8" />)}
    <circle r={r * 0.2} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text y={r * 0.08} textAnchor="middle" dominantBaseline="middle" style={{ font:`400 ${r * 0.26}px ${KF.titulo}` }} fill="#fff">{simbolo}</text>
    {[0, 1, 2].map((k) => { const a = T * 2.2 * vel + k * 2.1; return <circle key={k} cx={Math.cos(a) * orb[0]} cy={Math.sin(a) * orb[0]} r={10} fill={KC.cyan} />; })}
    {(() => { const rr = klerp(orb[0], orb[1], salto), a = T * 1.6 * vel + 0.9; return <g>
      {salto > 0.05 && <circle cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={26 * salto} fill={KC.yellow} opacity={0.45} />}
      <circle cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={12} fill={salto > 0.05 ? KC.yellow : KC.cyan} /></g>; })()}
  </g>;
}
// Flamas que lamen desde abajo
function Flamas({ T, x, y, ancho = 600, fuerza = 1, n = 7 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const fx = x - ancho / 2 + (i + 0.5) * ancho / n, h = (90 + 70 * Math.sin(T * 9 + i * 1.7)) * fuerza;
    return <g key={i}><path d={`M ${fx - 40} ${y} Q ${fx - 10} ${y - h * 0.6} ${fx} ${y - h} Q ${fx + 10} ${y - h * 0.6} ${fx + 40} ${y} Z`} fill={i % 2 ? KC.orange : KC.yellow} opacity={0.85} />
      <path d={`M ${fx - 18} ${y} Q ${fx} ${y - h * 0.5} ${fx + 18} ${y} Z`} fill="#fff" opacity={0.6} /></g>; })}</g>;
}
// Fotón: onda que viaja de (x0,y0) en dirección ang, empezando en `at`
function Foton({ T, at, x0, y0, ang = 0, color = ROJO, largo = 420, onda = 30 }) {
  const u = T - at; if (u < 0 || u > 1.4) return null;
  const d = u * 520, pts = [];
  for (let s = 0; s <= 160; s += 4) { const t = d - s; if (t < 0) continue; pts.push([t, Math.sin(t / onda * Math.PI) * 22]); }
  const c = Math.cos(ang), sn = Math.sin(ang);
  const path = pts.map(([a, b], i) => `${i ? 'L' : 'M'} ${x0 + a * c - b * sn} ${y0 + a * sn + b * c}`).join(' ');
  return <g opacity={1 - kprog(u, 1.0, 1.4)}><path d={path} stroke={color} strokeWidth={14} fill="none" opacity={0.35} strokeLinecap="round" /><path d={path} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
}
// Escalera de energía: base yb, nivel alto yt. Electrón sube en `sube` y baja en `baja` (soltando un fotón del color)
function Escalon({ T, x, yb, yt, ancho = 240, color, sube, baja, simbolo, etiqueta }) {
  const up = kprog(T, sube, sube + 0.6, kEase.suave), dn = kprog(T, baja, baja + 0.25, (p) => p * p);
  const ey = klerp(yb, klerp(yt, yb, dn), up), arriba = up > 0.95 && dn < 0.05;
  return <g>
    <line x1={x - ancho / 2} y1={yb} x2={x + ancho / 2} y2={yb} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
    <line x1={x - ancho / 2} y1={yt} x2={x + ancho / 2} y2={yt} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" opacity={0.85} />
    <line x1={x - ancho / 2 - 20} y1={yb} x2={x - ancho / 2 - 20} y2={yt} stroke={color} strokeWidth={4} strokeDasharray="10 8" />
    {arriba && <circle cx={x} cy={ey - 16} r={34} fill={KC.yellow} opacity={0.35 + 0.15 * Math.sin(T * 12)} />}
    <circle cx={x} cy={ey - 16} r={16} fill={arriba ? KC.yellow : KC.cyan} stroke={KC.ink} strokeWidth={3} />
    {T > baja + 0.2 && T < baja + 0.9 && <circle cx={x} cy={yb - 16} r={60 * kprog(T, baja + 0.2, baja + 0.9)} fill="none" stroke={color} strokeWidth={8} opacity={1 - kprog(T, baja + 0.2, baja + 0.9)} />}
    <Foton T={T} at={baja + 0.22} x0={x + 20} y0={yb - 40} ang={-Math.PI / 2.6} color={color} />
    {simbolo && <text x={x} y={yb + 62} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={3} paintOrder="stroke">{simbolo}</text>}
    {etiqueta && <text x={x} y={yb + 104} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>{etiqueta}</text>}
  </g>;
}

// Corte del cohete: pólvora que lo sube, pólvora que lo revienta y bolitas de color con sales de metales
function CorteCohete({ T, x, y, abre = 1 }) {
  const bol = [[ROJO, 'Sr'], [VERDE, 'Ba'], [AZUL, 'Cu'], [AMARI, 'Na'], [NARAN, 'Ca']];
  const g = krng(31);
  return <g transform={`translate(${x} ${y})`}>
    {/* palito guía */}
    <rect x={150} y={-40} width={18} height={560} rx={8} fill="#a8743f" stroke={KC.ink} strokeWidth={5} />
    {/* cono */}
    <path d="M -140 -300 L 0 -470 L 140 -300 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* tubo */}
    <rect x={-140} y={-300} width={280} height={600} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {[-220, -120, 120, 220].map((yy) => <line key={yy} x1={-140} y1={yy} x2={140} y2={yy} stroke="#d8cfbf" strokeWidth={5} />)}
    {/* corte (ventana interior) */}
    <g opacity={abre}>
      <rect x={-112} y={-280} width={224} height={560} rx={12} fill="#2a2230" stroke={KC.ink} strokeWidth={5} />
      {/* carga que lo revienta + bolitas */}
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={-100 + g() * 200} cy={-260 + g() * 250} r={3 + g() * 3} fill="#555" />)}
      {Array.from({ length: 10 }, (_, i) => { const [c, s] = bol[i % 5], bx = -70 + (i % 3) * 70 + (Math.floor(i / 3) % 2) * 35, by = -240 + Math.floor(i / 3) * 62; const pop = kprog(T, 0, 1) * kclamp(abre * 12 - i, 0, 1);
        return <g key={i} transform={`translate(${bx} ${by}) scale(${pop})`}><circle r={28} fill={c} stroke={KC.ink} strokeWidth={4} /><text y={9} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>{s}</text></g>; })}
      <line x1={-112} y1={0} x2={112} y2={0} stroke={KC.paper} strokeWidth={8} />
      {/* carga que lo sube */}
      {Array.from({ length: 120 }, (_, i) => <circle key={'b' + i} cx={-100 + g() * 200} cy={20 + g() * 250} r={3 + g() * 3} fill="#111" />)}
    </g>
    {/* mecha */}
    <path d={`M 0 300 q 30 40 0 80 q -30 40 0 70`} stroke="#6b4226" strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={450} r={12 + 6 * Math.sin(T * 20)} fill={KC.yellow} /><circle cx={0} cy={450} r={24} fill={KC.orange} opacity={0.4} />
  </g>;
}

// Mechero de Bunsen con flama de color
function Mechero({ T, x, y, color = '#7fb4ff', s = 1 }) {
  const h = 150 + 14 * Math.sin(T * 11);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -36 -150 Q -30 ${-150 - h * 0.6} 0 ${-150 - h} Q 30 ${-150 - h * 0.6} 36 -150 Z`} fill={color} opacity={0.9} />
    <path d={`M -16 -150 Q 0 ${-150 - h * 0.45} 16 -150 Z`} fill="#fff" opacity={0.6} />
    <rect x={-22} y={-150} width={44} height={140} rx={6} fill="#9aa4b2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-14} width={160} height={30} rx={10} fill="#3b3f4a" stroke={KC.ink} strokeWidth={6} />
    <path d="M 22 -40 L 90 -40" stroke="#ff7a59" strokeWidth={12} strokeLinecap="round" />
  </g>;
}
// Prisma triangular
function Prisma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -110 L 100 70 L -100 70 Z" fill="rgba(200,240,255,.55)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -40 -30 L 0 -100" stroke="#fff" strokeWidth={6} opacity=".7" strokeLinecap="round" />
  </g>;
}
// Franja de espectro: fondo negro con arcoíris tenue y líneas brillantes (nm). Líneas ilustrativas.
const nm2x = (nm, w) => ((nm - 400) / 300) * w;
const nmColor = (nm) => nm < 440 ? '#7a5cff' : nm < 490 ? '#3d8bff' : nm < 530 ? '#2fe0a8' : nm < 570 ? '#9cff3d' : nm < 595 ? '#ffd21a' : nm < 620 ? '#ff8a1f' : '#ff3348';
function Espectro({ T, x, y, w = 420, h = 74, lineas = [], at = 0, etiqueta }) {
  const e = kprog(T, at, at + 0.6, kEase.sale);
  return <g transform={`translate(${x} ${y})`} opacity={kprog(T, at - 0.1, at + 0.2)}>
    <defs><linearGradient id={'arc' + x + y} x1="0" x2="1"><stop offset="0" stopColor="#7a5cff" /><stop offset=".3" stopColor="#3d8bff" /><stop offset=".45" stopColor="#2fe0a8" /><stop offset=".6" stopColor="#9cff3d" /><stop offset=".7" stopColor="#ffd21a" /><stop offset=".8" stopColor="#ff8a1f" /><stop offset="1" stopColor="#ff3348" /></linearGradient></defs>
    <rect x={0} y={0} width={w} height={h} rx={10} fill="#05060a" stroke={KC.ink} strokeWidth={6} />
    <rect x={6} y={h - 12} width={w - 12} height={6} rx={3} fill={`url(#arc${x}${y})`} opacity={0.6} />
    {lineas.map((nm, i) => <g key={i} opacity={kclamp(e * lineas.length - i, 0, 1)}>
      <rect x={nm2x(nm, w) - 7} y={6} width={14} height={h - 22} fill={nmColor(nm)} opacity={0.35} />
      <rect x={nm2x(nm, w) - 3} y={6} width={6} height={h - 22} fill={nmColor(nm)} /></g>)}
    {etiqueta && <text x={-18} y={h / 2 + 14} textAnchor="end" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Botella de agua mineral
function Botella({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -24 -230 L 24 -230 L 24 -170 Q 80 -140 80 -80 L 80 170 Q 80 200 50 200 L -50 200 Q -80 200 -80 170 L -80 -80 Q -80 -140 -24 -170 Z" fill="rgba(150,220,255,.55)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-28} y={-256} width={56} height={30} rx={6} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-20} width={160} height={110} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={22} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>AGUA</text>
    <text x={0} y={52} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>MINERAL</text>
    <text x={0} y={78} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill="#5a524a">Dürkheim</text>
  </g>;
}
// Molécula Cu–Cl: rompe 0..1 separa los átomos y apaga el azul
function CuCl({ T, x, y, rompe = 0, brillo = 1 }) {
  const sep = rompe * 230, sh = rompe > 0 ? Math.sin(T * 40) * 6 * (1 - rompe) : Math.sin(T * 30) * 2;
  const azul = brillo * (1 - rompe);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={260} fill={AZUL} opacity={0.28 * azul} /><circle r={170} fill={AZUL} opacity={0.3 * azul} />
    {rompe < 0.25 && <line x1={-70} y1={0} x2={80} y2={0} stroke="#fff" strokeWidth={16} opacity={1 - rompe * 4} />}
    <g transform={`translate(${-75 - sep + sh} ${sh})`}><circle r={100} fill={COBRE} stroke={KC.ink} strokeWidth={7} /><text y={20} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={3} paintOrder="stroke">Cu</text></g>
    <g transform={`translate(${90 + sep - sh} ${-sh})`}><circle r={72} fill={CLORO} stroke={KC.ink} strokeWidth={7} /><text y={18} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>Cl</text></g>
    {rompe > 0.05 && rompe < 0.9 && Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2, d = 40 + rompe * 200; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={8} fill={KC.yellow} opacity={1 - rompe} />; })}
  </g>;
}
// Termómetro sin cifras (solo «caliente» → «de más»)
function Termo({ x, y, nivel }) {
  const h = 380;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-h} width={68} height={h + 20} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={40} r={56} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={-16} y={20 - (h - 30) * nivel} width={32} height={(h - 30) * nivel + 30} rx={16} fill={KC.red} />
  </g>;
}

function Fuegos() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Cohete, Cl: CUES.Colores, Ca: CUES.Calor, Es: CUES.Escalon, H: CUES.Huella, P: CUES.Pregunta, A: CUES.Azul, E: CUES.Estudio, Cs: CUES.Cesio, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const GB = K.G + 0.6; // estallido rojo del gancho
  // tiempos de cada color en la línea 2 (por posición en la frase)
  const cl = [0.15, 1.15, 2.0, 2.8, 3.9].map((d) => K.Cl + d);
  const colores = [[ROJO, 'Sr', 'estroncio', 250, 520], [VERDE, 'Ba', 'bario', 830, 520], [AZUL, 'Cu', 'cobre', 540, 790], [AMARI, 'Na', 'sodio', 250, 1050], [NARAN, 'Ca', 'calcio', 830, 1050]];
  const romp = kprog(T, K.A + 4.9, K.A + 5.6, kEase.suave), lava = kprog(T, K.A + 5.3, K.A + 6.4);
  const calor = kprog(T, K.A + 2.6, K.A + 4.8, kEase.suave);
  const llamaE = T < K.E + 4.4 ? AMARI : T < K.E + 5.9 ? ROJO : VERDE;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un cohete sube desde el cuadro 0 y revienta en rojo */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.05}>
        <Cielo T={T} />
        {svg(<>
          <Subida T={T} at={GB} x0={380} y0={1560} x1={380} y1={700} dur={0.8} />
          <Estallido T={T} at={GB} x={380} y={700} color={ROJO} r={300} n={44} vida={5} seed={3} />
          <Subida T={T} at={K.G + 2.1} x0={200} y0={1560} x1={170} y1={420} dur={0.7} />
          <Estallido T={T} at={K.G + 2.1} x={170} y={420} color={ROJO} r={150} n={26} seed={8} />
        </>)}
        <Ciudad T={T} />
      </Escena>
      {/* 2 · dentro del cohete: sales de metales */}
      <Escena T={T} a={K.Co} b={K.Cl}>
        <FondoLunares color={KC.yellow} />
        {svg(<CorteCohete T={T} x={620} y={760} abre={kprog(T, K.Co + 0.3, K.Co + 1.6)} />)}
      </Escena>
      {/* 3 · cinco metales, cinco colores */}
      <Escena T={T} a={K.Cl} b={K.Ca} zoom={0.03}>
        <Cielo T={T} seed={6} />
        {svg(<>{colores.map(([c, s, nom, x, y], i) => <g key={i}>
          <Subida T={T} at={cl[i]} x0={x} y0={1600} x1={x} y1={y} dur={0.45} />
          <Estallido T={T} at={cl[i]} x={x} y={y} color={c} r={175} n={30} seed={i + 2} queda />
          {T > cl[i] + 0.15 && <g transform={`translate(${x} ${y + 10}) scale(${kprog(T, cl[i] + 0.15, cl[i] + 0.5, kEase.rebote)})`}>
            <rect x={-82} y={-62} width={164} height={110} rx={20} fill="rgba(10,10,20,.82)" stroke={c} strokeWidth={6} />
            <text y={4} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={c}>{s}</text>
            <text y={36} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.texto}>{nom}</text></g>}
        </g>)}</>)}
        <Ciudad T={T} y={1500} />
      </Escena>
      {/* 4 · por dentro: el calor empuja a los electrones (Sr–Cl, escala ~1 nm) */}
      <Escena T={T} a={K.Ca} b={K.Es} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(255,160,90,.25)" />
        {svg(<>
          <Flamas T={T} x={540} y={1150} ancho={900} fuerza={1.6 * kprog(T, K.Ca + 0.3, K.Ca + 1.5)} n={9} />
          <g transform={`translate(${Math.sin(T * 30) * 4 * kprog(T, K.Ca + 1.2, K.Ca + 2)} 0)`}>
            <circle cx={630} cy={780} r={60} fill={CLORO} stroke={KC.ink} strokeWidth={5} />
            <text x={630} y={798} textAnchor="middle" style={{ font:`400 48px ${KF.titulo}` }} fill={KC.ink}>Cl</text>
            <Atomo T={T} x={470} y={780} r={120} salto={kprog(T, K.Ca + 2.2, K.Ca + 3.0, kEase.rebote)} brillo={kprog(T, K.Ca + 1.0, K.Ca + 2.4)} vel={1 + kprog(T, K.Ca + 0.5, K.Ca + 2.5) * 2} />
          </g>
          {T > K.Ca + 1.6 && [0, 1, 2].map((k) => { const u = ((T - K.Ca - 1.6) * 0.9 + k / 3) % 1; return <path key={k} d={`M ${400 + k * 70} ${1060 - u * 120} l 0 -60 m -18 18 l 18 -18 l 18 18`} stroke={KC.orange} strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
        </>)}
      </Escena>
      {/* 5 · escalones de energía: sube, baja y suelta luz */}
      <Escena T={T} a={K.Es} b={K.H} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <line x1={150} y1={1090} x2={150} y2={600} stroke={KC.gold2} strokeWidth={8} /><path d="M 126 630 L 150 590 L 174 630" stroke={KC.gold2} strokeWidth={8} fill="none" strokeLinejoin="round" />
          <text x={120} y={880} textAnchor="middle" transform="rotate(-90 120 880)" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>energía</text>
          {T <= K.Es + 2.9 && <Escalon T={T} x={540} yb={1060} yt={700} ancho={520} color={ROJO} sube={K.Es + 0.4} baja={K.Es + 2.0} />}
          {T > K.Es + 2.9 && <Escalon T={T} x={540} yb={1060} yt={700} ancho={520} color={ROJO} sube={K.Es + 2.9} baja={K.Es + 3.9} />}
          <Flamas T={T} x={540} y={1170} ancho={500} fuerza={0.5 * (kprog(T, K.Es + 0.1, K.Es + 0.4) - kprog(T, K.Es + 1.0, K.Es + 1.4)) + 0.5 * (kprog(T, K.Es + 2.7, K.Es + 2.9) - kprog(T, K.Es + 3.5, K.Es + 3.8))} n={5} />
        </>)}
      </Escena>
      {/* 6 · cada metal, sus escalones, su color */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <Escalon T={T} x={200} yb={1020} yt={800} ancho={230} color={ROJO} sube={K.H - 0.6} baja={K.H + 0.7} simbolo="Sr" etiqueta="chico" />
          <Escalon T={T} x={540} yb={1020} yt={740} ancho={230} color={VERDE} sube={K.H - 0.6} baja={K.H + 1.7} simbolo="Ba" etiqueta="mediano" />
          <Escalon T={T} x={880} yb={1020} yt={680} ancho={230} color={AZUL} sube={K.H - 0.6} baja={K.H + 2.7} simbolo="Cu" etiqueta="grande" />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y el azul? */}
      <Escena T={T} a={K.P} b={K.A} zoom={0.08}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g transform="translate(0 0)"><rect x={60} y={360} width={440} height={400} rx={36} fill="#1e0b52" stroke={KC.ink} strokeWidth={8} /></g>
          <Estallido T={T} at={K.P + 0.2} x={280} y={540} color={AZUL} r={150} n={26} seed={12} queda palido={0.75} />
          <text x={280} y={1180} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 1000)`}>?</text>
        </>)}
      </Escena>
      {/* 8 · el azul: CuCl; si se calienta de más, se rompe */}
      <Escena T={T} a={K.A} b={K.E} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} color="rgba(90,130,255,.28)" />
        {svg(<>
          <Estallido T={T} at={K.A + 0.1} x={330} y={470} color={AZUL} r={140} n={26} seed={14} queda palido={lava * 0.85} />
          <CuCl T={T} x={480} y={900} rompe={romp} brillo={kprog(T, K.A + 0.2, K.A + 0.8)} />
          <g opacity={kprog(T, K.A + 2.3, K.A + 2.7)}><Termo x={930} y={1120} nivel={0.25 + 0.75 * calor} />
            <Flamas T={T} x={480} y={1200} ancho={700} fuerza={0.4 + calor * 0.9} n={7} /></g>
        </>)}
      </Escena>
      {/* 9 · el estudio: Bunsen y Kirchhoff, flama + prisma = huella de líneas */}
      <Escena T={T} a={K.E} b={K.Cs}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.E + 2.6, K.E + 3.1)}>
            <Mechero T={T} x={150} y={1150} color={llamaE} s={0.95} />
            <path d={`M 180 920 L 420 950`} stroke={llamaE} strokeWidth={14} opacity={0.7} strokeLinecap="round" />
            <Prisma x={470} y={960} s={0.85} />
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M 520 960 L 640 ${880 + k * 40}`} stroke={[ROJO, AMARI, VERDE, AZUL][k]} strokeWidth={8} opacity={0.75} strokeLinecap="round" />)}
          </g>
          <Espectro T={T} x={650} y={800} w={380} at={K.E + 3.1} lineas={[589]} etiqueta="Na" />
          <Espectro T={T} x={650} y={920} w={380} at={K.E + 4.5} lineas={[461, 606, 641, 662, 682]} etiqueta="Sr" />
          <Espectro T={T} x={650} y={1040} w={380} at={K.E + 6.0} lineas={[513, 524, 553, 578]} etiqueta="Ba" />
        </>)}
      </Escena>
      {/* 10 · el cesio: agua mineral de Dürkheim, dos líneas azules nuevas */}
      <Escena T={T} a={K.Cs} b={K.D}>
        <FondoLunares color={KC.lilac} />
        {svg((() => {
          const vac = kprog(T, K.Cs + 0.2, K.Cs + 0.9, kEase.suave), ev = kprog(T, K.Cs + 0.9, K.Cs + 2.4);
          return <>
            <Botella x={klerp(230, 330, vac)} y={klerp(1000, 820, vac)} rot={klerp(0, 70, vac)} s={0.85} />
            {vac > 0.8 && ev < 0.6 && <path d="M 470 860 Q 500 900 520 960" stroke="#9fdcff" strokeWidth={16} fill="none" strokeLinecap="round" />}
            <Mechero T={T} x={560} y={1200} color="#7fb4ff" s={0.7} />
            <path d="M 430 980 Q 560 1060 690 980 Z" fill="#e8ecf2" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={560} cy={985} rx={118 * (1 - ev * 0.7)} ry={12} fill="#9fdcff" />
            {ev > 0 && ev < 1 && [0, 1, 2].map((k) => <path key={k} d={`M ${520 + k * 40} 950 q 14 -24 0 -48 q -14 -24 0 -48`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.6} transform={`translate(0 ${-((T * 50 + k * 18) % 40)})`} />)}
            <Espectro T={T} x={250} y={700} w={600} h={90} at={K.Cs + 2.3} lineas={[455.5, 459.3]} etiqueta="Cs" />
          </>;
        })())}
      </Escena>
      {/* 11 · dato: destello → ¡pum! (cada 3 s ≈ 1 km) */}
      <Escena T={T} a={K.D} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {svg((() => {
          const viaja = kprog(T, K.D + 0.4, K.D + 3.3);
          return <>
            <rect x={40} y={400} width={1000} height={780} rx={40} fill="#1e0b52" stroke={KC.ink} strokeWidth={8} />
            <Subida T={T} at={K.D + 0.35} x0={470} y0={1100} x1={470} y1={620} dur={0.4} />
            <Estallido T={T} at={K.D + 0.35} x={470} y={620} color={AMARI} r={150} n={28} seed={21} vida={3.2} />
            {T > K.D + 0.4 && T < K.D + 3.6 && [0, 1, 2].map((k) => { const rr = klerp(30, 470, kclamp(viaja - k * 0.06, 0, 1)); return <circle key={k} cx={470} cy={620} r={rr} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="18 14" opacity={0.6 - k * 0.15} />; })}
            <rect x={40} y={1060} width={1000} height={120} fill="#140c22" />
            <rect x={780} y={1000} width={240} height={180} fill="#140c22" />
            {/* persona en la azotea */}
            <g transform="translate(900 1000)"><circle cx={0} cy={-120} r={30} fill={KC.paper} stroke={KC.ink} strokeWidth={5} /><path d="M -32 0 L -26 -82 Q 0 -96 26 -82 L 32 0 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
              {T > K.D + 3.3 && T < K.D + 4.4 && <text x={0} y={-180} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} paintOrder="stroke" transform={`scale(${klerp(0.6, 1, kprog(T, K.D + 3.3, K.D + 3.5, kEase.rebote))})`}>¡PUM!</text>}</g>
            {[1, 2, 3].map((n, k) => T > K.D + 0.6 + k * 0.9 && T < K.D + 3.4 + (k === 2 ? 0.8 : 0) && (k === 2 || T < K.D + 1.5 + k * 0.9) ? <text key={n} x={700} y={560} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{n} s</text> : null)}
            <g opacity={kprog(T, K.D + 3.6, K.D + 4.0)}>
              <line x1={470} y1={1130} x2={900} y2={1130} stroke={KC.yellow} strokeWidth={8} /><line x1={470} y1={1105} x2={470} y2={1155} stroke={KC.yellow} strokeWidth={8} /><line x1={900} y1={1105} x2={900} y2={1155} stroke={KC.yellow} strokeWidth={8} />
              <text x={685} y={1112} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.yellow}>≈ 1 km</text></g>
          </>;
        })())}
      </Escena>
      {/* 12 · cierre: el mismo cielo del inicio, ahora con todos los colores; rayos X al rojo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <Cielo T={T} />
        {svg(<>
          <Estallido T={T} at={K.Ci + 0.15} x={380} y={700} color={ROJO} r={300} n={44} seed={3} queda />
          {[[VERDE, 860, 520, 0.7], [AZUL, 160, 380, 1.2], [AMARI, 880, 900, 1.7], [NARAN, 170, 1020, 2.2]].map(([c, x, y, d], i) =>
            <Estallido key={i} T={T} at={K.Ci + d} x={x} y={y} color={c} r={140} n={24} seed={30 + i} queda />)}
        </>)}
        <Ciudad T={T} luz={1} />
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={800} y={1540} r={180} fx={380} fy={700} tinte={ROJO} etiqueta="átomos de estroncio"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#140616" />
            {[[r - 70, r - 50], [r + 70, r + 40], [r - 40, r + 90]].map(([ax, ay], i) => <g key={i}>
              <circle cx={ax + 62} cy={ay} r={28} fill={CLORO} opacity={0.9} />
              <Atomo T={Tl + i} x={ax} y={ay} r={58} salto={0.5 + 0.5 * Math.sin(Tl * 3 + i)} brillo={1} />
            </g>)}
          </svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Ca, titulo: 'El empujón' }, { at: K.H, titulo: 'La huella' }, { at: K.A, titulo: 'El azul' }, { at: K.E, titulo: 'El prisma' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.Co - 0.2} texto="Especial Año Nuevo" x={540} y={1500} tam={40} borde={KC.yellow} />
      <MitoTachado T={T} at={K.G + 0.7} tacharEn={K.G + 1.7} until={K.G + 2.6} texto="¿pintura?" x={300} y={1120} tam={52} />
      <Etq T={T} at={K.G + 2.4} until={K.Co - 0.3} x={60} y={1120} texto="Sr · estroncio" tam={44} color={KC.texto} />
      <Etq T={T} at={K.Co + 0.9} until={K.Cl - 0.3} x={470} y={580} texto="bolitas de color" tam={30} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Co + 1.3} until={K.Cl - 0.3} x={470} y={930} texto="pólvora" tam={30} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Co + 1.7} until={K.Cl - 0.3} x={660} y={1180} texto="mecha" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Co + 1.4} until={K.Cl - 0.2} texto="sales de metales" x={540} y={1520} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.Cl + 4.2} until={K.Ca - 0.3} x={70} y={1460} texto="a veces brilla el metal unido a un cloro:" tam={26} />
      <Etq T={T} at={K.Cl + 4.2} until={K.Ca - 0.3} x={70} y={1510} texto="SrCl · BaCl · CuCl" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Ca + 0.6} until={K.Es - 0.3} x={70} y={560} texto="estroncio + cloro (SrCl)" tam={30} />
      <Chip T={T} at={K.Ca + 2.4} until={K.Es - 0.2} texto="¡empujón!" x={540} y={1520} tam={46} borde={KC.orange} />
      {T > K.Ca - 0.3 && T < K.Es + 0.2 && <Escala T={T} z={1} pxPorMm={6e8} objetivo={600} x={60} y={1600} />}
      <Etq T={T} at={K.Es + 0.6} until={K.Es + 1.9} x={820} y={660} texto="sube" tam={38} color={KC.yellow} />
      <Chip T={T} at={K.Es + 2.2} until={K.H - 0.2} texto="baja = luz" x={540} y={1520} tam={50} borde={ROJO} />
      <Etq T={T} at={K.Es + 0.2} until={K.H - 0.3} x={70} y={480} texto="niveles de energía (esquema)" tam={26} />
      <Etq T={T} at={K.H + 0.6} until={K.P - 0.3} x={70} y={480} texto="escalón más grande → luz más azul" tam={26} />
      <Chip T={T} at={K.H + 2.8} until={K.P - 0.2} texto="cada metal, su color" x={540} y={1520} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.A + 0.6} until={K.A + 4.6} x={70} y={1460} texto="cobre + cloro = CuCl" tam={36} color={KC.cyan} />
      <Etq T={T} at={K.A + 2.8} until={K.A + 4.8} x={900} y={680} texto="más calor" tam={30} color={KC.red} lado="izq" />
      <Chip T={T} at={K.A + 5.1} until={K.E - 0.2} texto="se rompe: el azul se deslava" x={540} y={1520} tam={42} borde={DESLAVA} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="1859–1860" quien="Bunsen y Kirchhoff · Heidelberg" revista="la luz de flamas, por un prisma" x={540} y={760} />
      <Chip T={T} at={K.E + 6.4} until={K.Cs - 0.2} texto="cada elemento, su huella" x={540} y={1520} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.E + 3.3} until={K.Cs - 0.3} x={650} y={1170} texto="líneas ilustrativas" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Cs + 2.7} until={K.D - 0.2} texto="Cs · cesio (1860)" x={380} y={560} tam={52} borde={AZUL} />
      <Etq T={T} at={K.Cs + 3.4} until={K.D - 0.3} x={70} y={1480} texto="del latín caesius: «gris azulado»" tam={30} />
      <Etq T={T} at={K.Cs + 2.6} until={K.D - 0.3} x={560} y={830} texto="dos líneas azules" tam={28} color={KC.ink} />
      <Chip T={T} at={K.D + 3.8} until={K.Ci - 0.2} texto="segundos ÷ 3 = km" x={540} y={1520} tam={48} borde={KC.ink} />
      <Etq T={T} at={K.D + 0.6} until={K.D + 3.3} x={560} y={1480} texto="la luz llega casi al instante" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Ci + 3.0} until={K.Ou} texto="no es pintura: es estroncio" x={350} y={480} tam={36} borde={ROJO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No es pintura: *es estroncio.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Cl - 0.1} texto="Sales de metales: *cada una, un color.*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.Ca - 0.1} texto="Rojo, verde, azul, *amarillo y naranja.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Es - 0.1} texto="El calor *empuja a los electrones.*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.H - 0.1} texto="Suben, bajan *y sueltan luz.*" />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.P - 0.1} texto="Cada metal, *su propio color.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.A - 0.1} texto="¿Por qué casi nunca *un azul bonito?*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.E - 0.1} texto="Muy caliente: *el azul se rompe.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Cs - 0.1} texto="Cada elemento, *su huella de colores.*" />
      <Subtitulo T={T} idx={9} at={K.Cs + 0.1} until={K.D - 0.1} texto="Líneas azules nuevas: *el cesio.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.Ci - 0.1} texto="Cada 3 segundos, *como 1 kilómetro.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es estroncio. *¡Feliz Año Nuevo!*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cohete + 0.5, CUES.Colores - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Calor + 0.4, CUES.Escalon - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Huella + 0.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Azul + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Azul + 4.4, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Cesio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cesio + 1.5, CUES.Dato - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Dato + 0.4, CUES.Dato + 4.0, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" serie="Festivo" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FuegosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Fuegos /></CompositionStage></div>;
}
window.FuegosApp = FuegosApp;
