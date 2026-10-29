// Shot Químico #14 · Esa sal no es un polvito inocente (sodio + cloro = sal) — NARRADO (N1 por dentro + escena N5 de Davy).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const NA = '#4f7bff', CL = '#b6e33a', CLGAS = '#c8e65a', PLATA = '#cfd6e0', SAL = '#ffffff';

// Salero de vidrio con tapa metálica. x, y = centro; inclina en grados.
function Salero({ x, y, s = 1, inclina = 0, nivel = 0.7 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d="M -95 -150 L 95 -150 L 115 190 Q 115 215 90 215 L -90 215 Q -115 215 -115 190 Z" fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${-106 + (1 - nivel) * 4} ${215 - 360 * nivel} L ${106 - (1 - nivel) * 4} ${215 - 360 * nivel} L 108 190 Q 108 208 88 208 L -88 208 Q -108 208 -108 190 Z`} fill={SAL} />
    {Array.from({ length: 18 }, (_, i) => <rect key={i} x={-90 + (i * 37) % 180} y={200 - ((i * 53) % Math.max(20, 340 * nivel))} width={10} height={10} fill="#dfe6ee" />)}
    <path d="M -60 -120 L -50 160" stroke="rgba(255,255,255,.8)" strokeWidth={14} strokeLinecap="round" />
    <path d="M -105 -150 L -105 -205 Q -105 -240 -70 -240 L 70 -240 Q 105 -240 105 -205 L 105 -150 Z" fill={PLATA} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-50, 0, 50, -25, 25].map((dx, i) => <circle key={i} cx={dx} cy={i < 3 ? -215 : -185} r={8} fill={KC.ink} />)}
  </g>;
}
function Plato({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={260} ry={70} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-6} rx={170} ry={38} fill="#e7e1d4" />
  </g>;
}
// Granitos que caen del salero al plato. f = 0..1 cantidad acumulada.
function Granos({ T, x0, y0, x1, y1, desde, hasta, n = 40 }) {
  const R = krng(11);
  const gs = Array.from({ length: n }, () => [R(), (R() - 0.5) * 140, (R() - 0.5) * 30, 7 + R() * 7]);
  return <g>{gs.map(([t, dx, dy, r], i) => {
    const t0 = desde + t * (hasta - desde - 0.6), p = kprog(T, t0, t0 + 0.55, (q) => q * q);
    if (T < t0) return null;
    const x = klerp(x0, x1 + dx, p), y = klerp(y0, y1 + dy, p);
    return <rect key={i} x={x - r / 2} y={y - r / 2} width={r} height={r} fill={SAL} stroke="#9aa6b2" strokeWidth={2} transform={`rotate(${(i * 37) % 90} ${x} ${y})`} />;
  })}</g>;
}
// Montoncito de sal en el plato.
function Monton({ x, y, f = 1 }) {
  if (f <= 0) return null;
  return <g>{Array.from({ length: Math.round(26 * f) }, (_, i) => { const a = (i * 2.4) % 6.28, rr = (i % 7) * 18; const gx = x + Math.cos(a) * rr * 1.6, gy = y - 8 + Math.sin(a) * rr * 0.35 - (6 - (i % 7)) * 4;
    return <rect key={i} x={gx - 7} y={gy - 7} width={14} height={14} fill={SAL} stroke="#9aa6b2" strokeWidth={2} transform={`rotate(${(i * 23) % 90} ${gx} ${gy})`} />; })}</g>;
}
// Barrita de sodio (metal blando). corte 0..1 = cuchillo que baja; opaco 0..1 = se pone gris.
function BarraSodio({ x, y, s = 1, corte = 0, opaco = 0, o = 1 }) {
  const brillo = mixHex('#e9eef5', '#9aa0a8', opaco);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -190 -60 L 150 -60 L 190 -20 L 190 70 L -150 70 L -190 30 Z" fill="#a9afb8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -190 -60 L 150 -60 L 190 -20 L -150 -20 Z" fill="#c4cad2" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {corte > 0.98 && <path d="M 40 -60 L 80 -20 L 80 70 L 40 30 Z" fill={brillo} stroke={KC.ink} strokeWidth={5} />}
    {corte > 0 && corte < 1 && <path d={`M 60 -60 L 60 ${-60 + 130 * corte}`} stroke="#fff" strokeWidth={6} />}
  </g>;
}
function Cuchillo({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -10 -240 L 10 -240 L 18 0 L -4 30 L -18 0 Z" fill="#e6ebf1" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-16} y={-370} width={32} height={130} rx={10} fill="#5a3216" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Recuadro de advertencia.
function Peligro({ x, y, w, h, o = 1, children }) {
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${klerp(0.85, 1, o)})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill="rgba(14,15,18,.86)" stroke={KC.yellow} strokeWidth={8} strokeDasharray="30 14" />
    <rect x={-w / 2 + 30} y={-h / 2 - 28} width={w - 60} height={56} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-h / 2 + 12} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>⚠ PELIGRO · SOLO EN LABORATORIO</text>
    {children}
  </g>;
}
// Pulmones con pared húmeda; rojo 0..1.
function Pulmones({ T, x, y, s = 1, rojo = 0 }) {
  const c = mixHex('#ff9fb3', '#e0283c', rojo), resp = 1 + Math.sin(T * 3) * 0.02;
  return <g transform={`translate(${x} ${y}) scale(${s * resp})`}>
    <path d="M -16 -260 L 16 -260 L 16 -80 L -16 -80 Z" fill="#f2c7cf" stroke={KC.ink} strokeWidth={7} />
    <path d="M -10 -90 Q -60 -60 -90 -40 M 10 -90 Q 60 -60 90 -40" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -30 -110 Q -200 -140 -220 40 Q -230 200 -60 190 Q -30 120 -30 -110 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 30 -110 Q 200 -140 220 40 Q 230 200 60 190 Q 30 120 30 -110 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-140, 0], [-100, 90], [-170, 110], [140, 10], [110, 100], [170, 120], [-80, -40], [90, -40]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy + Math.sin(T * 2 + i) * 3} rx={9} ry={12} fill="#bfe8ff" stroke="#5aa6d6" strokeWidth={3} />)}
  </g>;
}
// Átomo de Bohr esquemático. capas = electrones por capa; hueco = un lugar vacío punteado en la última capa.
function AtomoBohr({ T, x, y, s = 1, letra, color, capas, hueco = false, sinUltimo = 0, brilloUlt = 0, carga = '', rapido = 0.4, o = 1 }) {
  const R = [52, 92, 132];
  const n = capas.length;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {capas.map((ne, k) => {
      const ultima = k === n - 1, oc = ultima ? 1 - sinUltimo : 1;
      return <g key={k} opacity={oc}>
        <circle r={R[k]} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={4} />
        {Array.from({ length: ne }, (_, i) => { const a = (i / (ne + (ultima && hueco ? 1 : 0))) * 6.283 + T * rapido * (k + 1) * 0.5;
          const glow = ultima && ne === 1 ? brilloUlt : 0;
          return <circle key={i} cx={Math.cos(a) * R[k]} cy={Math.sin(a) * R[k]} r={11 + glow * 6} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} style={{ filter: glow ? `drop-shadow(0 0 ${14 * glow}px ${KC.yellow})` : 'none' }} />; })}
        {ultima && hueco && (() => { const a = (ne / (ne + 1)) * 6.283 + T * rapido * (k + 1) * 0.5; return <circle cx={Math.cos(a) * R[k]} cy={Math.sin(a) * R[k]} r={13 + brilloUlt * 4} fill="none" stroke={KC.yellow} strokeWidth={4} strokeDasharray="6 5" />; })()}
      </g>;
    })}
    <circle r={36} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={12} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{letra}</text>
    {carga && <text x={30} y={-26} style={{ font:`900 44px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={3} paintOrder="stroke">{carga}</text>}
  </g>;
}
// Ion como esfera (cristal).
function Ion({ x, y, r, tipo, o = 1, brillo = 0 }) {
  const c = tipo === 'Na' ? NA : CL;
  return <g opacity={o}>
    {brillo > 0 && <circle cx={x} cy={y} r={r * (1.35 + brillo * 0.2)} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={brillo} />}
    <circle cx={x} cy={y} r={r} fill={c} stroke={KC.ink} strokeWidth={Math.max(3, r / 8)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#fff" opacity={0.5} />
    {r > 26 && <text x={x} y={y + r * 0.22} textAnchor="middle" style={{ font:`700 ${Math.round(r * 0.6)}px ${KF.mono}` }} fill={KC.ink}>{tipo === 'Na' ? 'Na⁺' : 'Cl⁻'}</text>}
  </g>;
}
// Red cúbica 3×3×3 de iones (centro = Na⁺, sus 6 vecinos = Cl⁻). ang = giro en grados; f = cuántos iones han llegado (0..1).
function Cristal({ T, x, y, paso = 150, ang = 0, f = 1, vecinos = 0, lineas = 0 }) {
  const a = ang * Math.PI / 180, inc = -0.42;
  const pts = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
    const X = (i - 1) * paso, Y = (j - 1) * paso, Z = (k - 1) * paso;
    const x1 = X * Math.cos(a) + Z * Math.sin(a), z1 = -X * Math.sin(a) + Z * Math.cos(a);
    const y2 = Y * Math.cos(inc) - z1 * Math.sin(inc), z2 = Y * Math.sin(inc) + z1 * Math.cos(inc);
    const tipo = (i + j + k) % 2 === 1 ? 'Na' : 'Cl';
    const dist = Math.abs(i - 1) + Math.abs(j - 1) + Math.abs(k - 1);
    pts.push({ i, j, k, sx: x + x1, sy: y + y2, z: z2, tipo, dist, ord: (i * 9 + j * 3 + k) });
  }
  const vec = pts.filter((p) => p.dist === 1);
  pts.sort((p, q) => p.z - q.z);
  const lin = [];
  pts.forEach((p) => pts.forEach((q) => { if (p.ord < q.ord && Math.abs(p.i - q.i) + Math.abs(p.j - q.j) + Math.abs(p.k - q.k) === 1) lin.push([p, q]); }));
  return <g>
    {lin.map(([p, q], n) => <line key={n} x1={p.sx} y1={p.sy} x2={q.sx} y2={q.sy} stroke="rgba(255,255,255,.22)" strokeWidth={4} opacity={Math.min(1, f * 1.2)} />)}
    {lineas > 0 && vec.map((p, n) => <line key={'v' + n} x1={x} y1={y} x2={p.sx} y2={p.sy} stroke={KC.yellow} strokeWidth={8} opacity={lineas * (n < vecinos ? 1 : 0)} strokeLinecap="round" />)}
    {pts.map((p, n) => {
      const llega = kprog(f * 27, p.ord, p.ord + 1);
      if (llega <= 0) return null;
      const iv = vec.indexOf(p), on = (iv >= 0 && iv < vecinos) || (p.dist === 0 && vecinos > 0);
      const dim = vecinos > 0 && !on ? 0.45 : 1;
      const esc = 0.8 + 0.2 * Math.max(0, Math.min(1, (p.z + paso * 1.6) / (paso * 3.2)));
      return <Ion key={n} x={p.sx} y={klerp(p.sy - 200, p.sy, llega)} r={(p.tipo === 'Na' ? 30 : 46) * esc} tipo={p.tipo} o={llega * dim} brillo={on ? 1 : 0} />;
    })}
  </g>;
}
// Pila voltaica (discos alternados).
function Pila({ x, y, n = 12, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={30} width={240} height={30} rx={8} fill="#7a5a3a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => <g key={i}>
      <rect x={-90} y={10 - i * 36} width={180} height={14} rx={5} fill="#d07a3a" stroke={KC.ink} strokeWidth={4} />
      <rect x={-90} y={-2 - i * 36} width={180} height={12} rx={5} fill="#b9c2cc" stroke={KC.ink} strokeWidth={4} />
      <rect x={-86} y={-12 - i * 36} width={172} height={10} rx={4} fill="#c9a77a" />
    </g>)}
    {[-100, 100].map((dx) => <rect key={dx} x={dx - 8} y={-n * 36 - 30} width={16} height={n * 36 + 60} fill="#6b4a2a" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Mapa esquemático de Bélgica con Ypres.
function MapaBelgica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -420 -120 Q -300 -230 -120 -230 Q 40 -260 160 -200 Q 280 -140 330 -40 Q 400 60 320 160 Q 240 230 100 210 Q 0 260 -120 180 Q -240 140 -330 60 Q -430 -20 -420 -120 Z" fill="#f6efd8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -420 -120 Q -480 -220 -560 -240 L -560 -480 L 560 -480 L 560 -260 Q 260 -320 160 -200 Q 40 -260 -120 -230 Q -300 -230 -420 -120 Z" fill="#cfe9ff" opacity={0.9} />
    <text x={-20} y={40} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={0.75}>BÉLGICA</text>
    <text x={-150} y={330} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink} opacity={0.55}>FRANCIA</text>
    <text x={120} y={-330} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#2a5d8a">mar del Norte</text>
    <circle cx={-320} cy={-40} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <text x={-295} y={-60} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Ypres</text>
  </g>;
}
// Barra de escala simple.
function Escalita({ x, y, w = 120, texto, color = KC.ink, o = 1 }) {
  return <g opacity={o}><line x1={x} y1={y} x2={x + w} y2={y} stroke={color} strokeWidth={8} /><line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={color} strokeWidth={6} /><line x1={x + w} y1={y - 14} x2={x + w} y2={y + 14} stroke={color} strokeWidth={6} />
    <text x={x + w + 18} y={y + 12} style={{ font:`700 32px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}
// Rejilla 2D de iones para la Lupa del cierre.
function Rejilla({ T, r }) {
  const out = [], p = 64;
  for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) {
    const na = (i + j + 40) % 2 === 1, cx = r + i * p + Math.sin(T * 2 + i) * 2, cy = r + j * p + Math.cos(T * 2 + j) * 2;
    out.push(<circle key={`${i}_${j}`} cx={cx} cy={cy} r={na ? 16 : 26} fill={na ? NA : CL} stroke={KC.ink} strokeWidth={3} />);
  }
  return <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}

function Sal() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, So: CUES.Sodio, Cl: CUES.Cloro, El: CUES.Electron, Io: CUES.Iones, Pr: CUES.Pregunta, Cr: CUES.Cristal, Da: CUES.Davy, Yp: CUES.Ypres, Re: CUES.Reves, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const inclina = klerp(0, 125, kprog(T, K.G, K.G + 0.45, kEase.sale)) * (1 - kprog(T, K.G + 2.8, K.G + 3.3));
  const amenaza = kprog(T, K.G + 3.3, K.G + 3.8, kEase.rebote);
  // electrón que salta (escena Iones)
  const salta = kprog(T, K.Io + 0.3, K.Io + 1.3, kEase.suave);
  const junta = kprog(T, K.Io + 2.6, K.Io + 3.6, kEase.sale);
  const naX = klerp(300, 400, junta), clX = klerp(780, 680, junta);
  const ex = klerp(300 + 165, 780 - 165, salta), ey = 900 - Math.sin(salta * Math.PI) * 220;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el salero */}
      <Escena T={T} a={K.G} b={K.So} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Plato x={540} y={1040} s={1.1} />
          <Monton x={560} y={1030} f={kprog(T, K.G + 0.6, K.G + 3.0)} />
          <Granos T={T} x0={540} y0={700} x1={560} y1={1010} desde={K.G + 0.2} hasta={K.G + 3.0} />
          <Salero x={380} y={660} s={0.85} inclina={inclina} />
          <g opacity={amenaza}>
            <BarraSodio x={190} y={880} s={0.55 * amenaza} />
            <text x={190} y={980} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>Na ⚠</text>
            <Nube T={T} x={900} y={860} f={amenaza * 0.8} r={110} color={CLGAS} />
            <text x={900} y={980} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>Cl₂ ⚠</text>
            <path d="M 260 920 Q 360 960 420 1000" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="16 12" strokeDashoffset={-T * 40} />
            <path d="M 830 920 Q 740 960 690 1000" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="16 12" strokeDashoffset={-T * 40} />
          </g>
          <Escalita x={760} y={1660} w={100} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 1 · sodio */}
      <Escena T={T} a={K.So} b={K.Cl}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <BarraSodio x={540} y={klerp(640, 540, kprog(T, K.So + 2.3, K.So + 2.8, kEase.suave))} s={1.2} corte={kprog(T, K.So + 0.6, K.So + 1.4)} opaco={kprog(T, K.So + 1.8, K.So + 3.5)} />
          <Cuchillo x={612} y={klerp(260, 440, kprog(T, K.So + 0.3, K.So + 1.4, kEase.suave))} o={1 - kprog(T, K.So + 1.8, K.So + 2.2)} />
          <Peligro x={540} y={900} w={720} h={340} o={kprog(T, K.So + 2.4, K.So + 2.9)}>
            <VasoLab x={0} y={150} s={0.8} liquido="#9fd8ff" nivel={0.62} ancho={320} alto={280} />
            <g transform={`translate(${Math.sin(T * 5) * 20} ${-10})`}><rect x={-40} y={-30} width={80} height={36} rx={8} fill="#c4cad2" stroke={KC.ink} strokeWidth={5} /></g>
            <Burbujas T={T} x={-110} y={-130} w={220} h={130} n={18} f={kprog(T, K.So + 2.9, K.So + 3.5)} color="#ffffff" vel={220} />
            <Llama T={T} x={10} y={-48} s={0.45} o={kprog(T, K.So + 3.4, K.So + 3.7) * (0.6 + 0.4 * Math.abs(Math.sin(T * 9)))} />
            <text x={210} y={-60} style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto}>H₂</text>
          </Peligro>
        </SvgCapa>
      </Escena>
      {/* 2 · cloro */}
      <Escena T={T} a={K.Cl} b={K.El}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g transform="translate(250 720)">
            <rect x={-130} y={-200} width={260} height={360} rx={40} fill="rgba(220,240,255,.5)" stroke={KC.ink} strokeWidth={9} />
            <rect x={-50} y={-250} width={100} height={60} rx={10} fill={PLATA} stroke={KC.ink} strokeWidth={7} />
            <Nube T={T} x={0} y={-10} f={0.75} r={120} color={CLGAS} seed={4} />
            {[[-60, -90], [50, 0], [-30, 90]].map(([dx, dy], i) => <Mol key={i} tipo="cl2" x={dx} y={dy} s={0.75} rot={T * 40 + i * 60} />)}
          </g>
          <Nube T={T} x={klerp(300, 640, kprog(T, K.Cl + 1.2, K.Cl + 2.6))} y={klerp(560, 740, kprog(T, K.Cl + 1.2, K.Cl + 2.6))} f={kprog(T, K.Cl + 1.0, K.Cl + 1.6) * 0.5} r={110} color={CLGAS} seed={6} />
          <Pulmones T={T} x={720} y={930} s={0.9} rojo={kprog(T, K.Cl + 2.6, K.Cl + 3.8)} />
        </SvgCapa>
        <Onomato T={T} at={K.Cl + 3.0} until={K.El - 0.3} x={760} y={1180} texto="¡ÁCIDO!" color={KC.red} tam={80} />
      </Escena>
      {/* 3–4 · por dentro: electrón e iones (noche) */}
      <Escena T={T} a={K.El} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(120,180,255,.25)" />
        <SvgCapa>
          {/* el grano que se abre */}
          {T < K.El + 1.4 && <g opacity={1 - kprog(T, K.El + 0.8, K.El + 1.4)} transform={`translate(540 900) scale(${klerp(1, 6, kprog(T, K.El, K.El + 1.4, kEase.suave))})`}>
            <path d="M -60 -30 L 0 -60 L 60 -30 L 60 40 L 0 70 L -60 40 Z" fill="#e9eef5" stroke={KC.ink} strokeWidth={5} /><path d="M -60 -30 L 0 0 L 60 -30 M 0 0 L 0 70" stroke={KC.ink} strokeWidth={4} fill="none" />
          </g>}
          <g opacity={kprog(T, K.El + 0.9, K.El + 1.5)}>
            <AtomoBohr T={T} x={naX} y={900} s={1.25 * (salta > 0.98 ? klerp(1, 0.85, kprog(T, K.Io + 1.3, K.Io + 1.8)) : 1)} letra="Na" color={NA} capas={[2, 8, 1]} sinUltimo={salta > 0.02 ? 1 : 0} brilloUlt={kprog(T, K.El + 1.6, K.El + 2.0) * (0.5 + 0.5 * Math.sin(T * 8))} carga={salta > 0.98 ? '+' : ''} />
            <AtomoBohr T={T} x={clX} y={900} s={1.25 * (salta > 0.98 ? klerp(1, 1.1, kprog(T, K.Io + 1.3, K.Io + 1.8)) : 1)} letra="Cl" color={CL} capas={salta > 0.98 ? [2, 8, 8] : [2, 8, 7]} hueco={salta <= 0.98} brilloUlt={kprog(T, K.El + 2.6, K.El + 3.0)} carga={salta > 0.98 ? '−' : ''} />
            {salta > 0.02 && salta < 0.98 && <circle cx={ex} cy={ey} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} style={{ filter:`drop-shadow(0 0 16px ${KC.yellow})` }} />}
            {salta > 0.02 && salta < 0.98 && <path d={`M ${300 + 165} 900 Q 540 ${900 - 440} ${ex} ${ey}`} stroke={KC.yellow} strokeWidth={4} fill="none" strokeDasharray="8 8" opacity={0.6} />}
            {junta > 0 && [0, 1, 2].map((i) => { const xm = (naX + clX) / 2; return <path key={i} d={`M ${xm - 40 - i * 18} ${860 + i * 40} L ${xm + 40 + i * 18} ${860 + i * 40}`} stroke={KC.pink} strokeWidth={6} strokeDasharray="10 10" strokeDashoffset={T * 60 * (i % 2 ? 1 : -1)} opacity={junta * 0.9} />; })}
          </g>
          <Escalita x={80} y={1660} w={120} texto="≈ 0.3 nm (esquemático)" color={KC.texto} o={kprog(T, K.El + 1.2, K.El + 1.6)} />
        </SvgCapa>
        <Etq T={T} at={K.El + 1.6} until={K.Io - 0.2} x={140} y={1120} texto="1 electrón afuera" tam={32} color={KC.yellow} />
        <Etq T={T} at={K.El + 2.6} until={K.Io - 0.2} x={1040} y={1120} lado="izq" texto="le falta 1" tam={32} color={CL} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Cr} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={290} y={1120} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>
          <g opacity={0.8} style={{ filter:'grayscale(1)' }}><BarraSodio x={170} y={480} s={0.4} /><Nube T={T} x={420} y={470} f={0.5} r={90} color="#cfcfcf" /></g>
        </SvgCapa>
      </Escena>
      {/* 6 · cristal cúbico (noche) */}
      <Escena T={T} a={K.Cr} b={K.Da} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(120,180,255,.25)" />
        <SvgCapa>
          <Cristal T={T} x={540} y={900} paso={150} ang={25 + (T - K.Cr) * 9} f={kprog(T, K.Cr + 0.2, K.Cr + 2.0)} vecinos={Math.floor(klerp(0, 6.99, kprog(T, K.Cr + 2.2, K.Cr + 3.8)))} lineas={kprog(T, K.Cr + 2.2, K.Cr + 2.5)} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.Cr + 2.2} until={K.Da - 0.3} valor={6} dur={1.6} etiqueta="vecinos de cada sodio" x={540} y={460} tam={150} color={CL} />
      </Escena>
      {/* 7 · Davy 1807 */}
      <Escena T={T} a={K.Da} b={K.Yp}>
        <div style={{ position:'absolute', inset:0, background:'#e7d3a1' }}></div>
        <SvgCapa>
          <Pila x={250} y={1060} n={11} />
          {/* platillo de platino con la sosa cáustica húmeda */}
          <g transform="translate(720 1010) scale(1.15)">
            <ellipse cx={0} cy={30} rx={190} ry={44} fill="#dfe3e8" stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={0} cy={22} rx={150} ry={28} fill="#c9ced6" />
            <path d="M -80 20 Q -90 -60 -20 -80 Q 60 -90 85 -30 Q 95 10 70 25 Z" fill="#f7f7f2" stroke={KC.ink} strokeWidth={6} />
            <path d="M -50 -40 Q -20 -60 20 -50" stroke="#bfe0ff" strokeWidth={8} fill="none" strokeLinecap="round" />
            {[[-60, 18], [-20, 24], [30, 22], [64, 14], [0, 18]].map(([dx, dy], i) => { const on = kprog(T, K.Da + 2.4 + i * 0.35, K.Da + 2.8 + i * 0.35, kEase.rebote);
              return <circle key={i} cx={dx} cy={dy} r={15 * on} fill={PLATA} stroke={KC.ink} strokeWidth={3} style={{ filter:`drop-shadow(0 0 ${8 * on}px #fff)` }} />; })}
          </g>
          {/* cables: + al alambre de arriba, − al platillo */}
          <path d="M 350 620 Q 560 520 720 700 L 720 925" stroke="#b33" strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M 350 1080 Q 480 1150 540 1060 L 560 1050" stroke="#334" strokeWidth={9} fill="none" strokeLinecap="round" />
          <text x={440} y={590} style={{ font:`900 64px ${KF.texto}` }} fill="#b33">+</text>
          <text x={420} y={1180} style={{ font:`900 72px ${KF.texto}` }} fill="#334">−</text>
          {kprog(T, K.Da + 2.0, K.Da + 2.6) > 0 && <g opacity={kprog(T, K.Da + 2.0, K.Da + 2.6) * (0.5 + 0.5 * Math.abs(Math.sin(T * 12)))}>
            <path d="M 700 905 l -20 -20 M 740 905 l 20 -20 M 720 895 l 0 -28" stroke={KC.yellow} strokeWidth={6} strokeLinecap="round" /></g>}
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.12)" />
        </SvgCapa>
        <Etq T={T} at={K.Da + 1.4} until={K.Yp - 0.2} x={1050} y={830} lado="izq" texto="sosa cáustica (NaOH)" tam={30} color={KC.ink} />
        <Etq T={T} at={K.Da + 3.0} until={K.Yp - 0.2} x={540} y={1130} texto="gotitas de sodio (Na)" tam={32} color={KC.ink} />
      </Escena>
      {/* 8 · Ypres 1915 */}
      <Escena T={T} a={K.Yp} b={K.Re}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <MapaBelgica x={560} y={980} s={1.05} />
          <Nube T={T} x={560 - 336 + kprog(T, K.Yp + 0.8, K.Yp + 3.8) * 60} y={980 - 42} f={kprog(T, K.Yp + 0.6, K.Yp + 3.2)} r={170} color={CLGAS} seed={9} n={11} />
        </SvgCapa>
      </Escena>
      {/* 9 · al revés: electrólisis de agua con sal */}
      <Escena T={T} a={K.Re} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={200} y={860} width={560} height={380} rx={20} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={9} />
          <rect x={210} y={940} width={540} height={290} rx={14} fill="#9fd8ff" opacity={0.9} />
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x={240 + (i * 71) % 480} y={980 + (i * 47) % 220} width={12} height={12} fill={SAL} opacity={0.8 * (1 - kprog(T, K.Re + 0.3, K.Re + 1.2))} transform={`rotate(${i * 20} ${246 + (i * 71) % 480} ${986 + (i * 47) % 220})`} />)}
          <rect x={300} y={800} width={40} height={360} fill="#555" stroke={KC.ink} strokeWidth={5} />
          <rect x={620} y={800} width={40} height={360} fill="#555" stroke={KC.ink} strokeWidth={5} />
          <g transform="translate(480 690)"><rect x={-120} y={-50} width={240} height={100} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
            <text x={0} y={18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>⚡</text></g>
          <path d="M 360 690 L 320 690 L 320 800 M 600 690 L 640 690 L 640 800" stroke={KC.ink} strokeWidth={7} fill="none" />
          <text x={598} y={790} style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>+</text>
          <text x={350} y={790} style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>−</text>
          <Burbujas T={T} x={600} y={940} w={80} h={290} n={14} f={kprog(T, K.Re + 0.8, K.Re + 1.6)} color={CLGAS} rmax={16} />
          <Burbujas T={T} x={280} y={940} w={80} h={290} n={10} f={kprog(T, K.Re + 0.8, K.Re + 1.6)} color="#ffffff" rmax={10} seed={3} />
          <Nube T={T} x={klerp(660, 860, kprog(T, K.Re + 1.6, K.Re + 3.6))} y={klerp(820, 860, kprog(T, K.Re + 1.6, K.Re + 3.6))} f={kprog(T, K.Re + 1.4, K.Re + 2.2) * 0.45} r={100} color={CLGAS} seed={12} />
          <g transform="translate(880 1100)" opacity={kprog(T, K.Re + 2.6, K.Re + 3.2)}>
            <rect x={-80} y={-150} width={160} height={300} rx={70} fill="#d9e85a" stroke={KC.ink} strokeWidth={8} />
            <rect x={-30} y={-190} width={60} height={50} rx={8} fill={PLATA} stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>Cl₂</text>
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Re + 0.6} until={K.Ci - 0.2} x={180} y={1290} texto="agua con sal" tam={32} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: el salero del inicio, por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Plato x={540} y={1040} s={1.1} />
          <Monton x={560} y={1030} f={1} />
          <Salero x={430} y={640} s={0.85} />
          <g opacity={1 - kprog(T, K.Ci + 3.4, K.Ci + 4.4)}>
            <BarraSodio x={klerp(170, 430, kprog(T, K.Ci + 3.0, K.Ci + 4.2, kEase.suave))} y={klerp(1450, 440, kprog(T, K.Ci + 3.0, K.Ci + 4.2, kEase.suave))} s={klerp(0.35, 0.05, kprog(T, K.Ci + 3.0, K.Ci + 4.2))} />
            <Nube T={T} x={klerp(920, 430, kprog(T, K.Ci + 3.0, K.Ci + 4.2, kEase.suave))} y={klerp(1450, 440, kprog(T, K.Ci + 3.0, K.Ci + 4.2, kEase.suave))} f={klerp(0.45, 0.05, kprog(T, K.Ci + 3.0, K.Ci + 4.2))} r={110} color={CLGAS} />
          </g>
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.5} until={K.Ou - 0.3} x={690} y={660} r={190} fx={560} fy={1020} interior={(TT, r) => <Rejilla T={TT} r={r} />} tinte={KC.blue} etiqueta="POR DENTRO · Na⁺ Cl⁻" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.2} texto="¿polvito inocente?" x={300} y={470} tam={44} />
      <Chip T={T} at={K.G + 3.4} until={K.So - 0.3} texto="metal + gas venenoso" x={330} y={470} tam={40} borde={KC.red} />
      <Chip T={T} at={K.So + 0.3} until={K.Cl - 0.3} texto="sodio · Na · metal" x={540} y={1500} tam={44} borde={NA} />
      <Etq T={T} at={K.So + 1.4} until={K.So + 2.3} x={780} y={770} texto="blando como cera" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Cl + 0.3} until={K.El - 0.3} texto="cloro · Cl₂ · gas" x={540} y={1500} tam={44} borde={CLGAS} />
      <Etq T={T} at={K.Cl + 0.6} until={K.El - 0.3} x={60} y={1010} texto="amarillo verdoso" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Io + 1.6} until={K.Pr - 0.2} texto="enlace iónico: Na⁺ ⇄ Cl⁻" x={540} y={1500} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.Cr + 0.5} until={K.Da - 0.3} texto="cristal cúbico · NaCl" x={540} y={1500} tam={44} borde={CL} />
      <Chip T={T} at={K.Da + 3.6} until={K.Yp - 0.3} texto="electrólisis" x={540} y={1690} tam={40} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Da + 0.2} until={K.Da + 3.3} anio="1807" quien="Humphry Davy · Londres" revista="Phil. Trans. R. Soc. · sodio aislado con electricidad" y={1560} />
      <TarjetaEstudio T={T} at={K.Yp + 0.2} until={K.Re - 0.3} anio="1915" quien="22 de abril · Ypres, Bélgica" revista="Primera Guerra Mundial · cloro como arma" y={1560} />
      <Chip T={T} at={K.Re + 0.4} until={K.Ci - 0.3} texto="hoy: sal + electricidad → cloro" x={540} y={1500} tam={40} borde={CLGAS} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="Na⁺ + Cl⁻ = NaCl" x={540} y={1500} tam={48} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.So - 0.1} texto="No es polvito: *metal y gas.*" />
      <Subtitulo T={T} idx={1} at={K.So + 0.1} until={K.Cl - 0.1} texto="Sodio: *blando como cera.*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.El - 0.1} texto="Cloro: *ácido en tus pulmones.*" />
      <Subtitulo T={T} idx={3} at={K.El + 0.1} until={K.Io - 0.1} texto="Al cloro *le falta uno.*" />
      <Subtitulo T={T} idx={4} at={K.Io + 0.1} until={K.Pr - 0.1} texto="Le da *su electrón.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Cr - 0.1} texto="¿Por qué ya *no es peligrosa?*" />
      <Subtitulo T={T} idx={6} at={K.Cr + 0.1} until={K.Da - 0.1} texto="Cubos: *seis cloruros alrededor.*" />
      <Subtitulo T={T} idx={7} at={K.Da + 0.1} until={K.Yp - 0.1} texto="1807: Davy *lo aisló.*" />
      <Subtitulo T={T} idx={8} at={K.Yp + 0.1} until={K.Re - 0.1} texto="1915: *arma en Ypres.*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Ci - 0.1} texto="Hoy, de la sal: *cloro.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Metal y veneno: *cubos tranquilos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Sodio + 1.0, CUES.Cloro - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cloro + 1.2, CUES.Electron - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Iones + 2.5, CUES.Pregunta - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Cristal + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Davy + 0.8, CUES.Ypres - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Ypres + 0.5, CUES.Reves - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Reves + 0.5, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SalApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Sal /></CompositionStage></div>;
}
window.SalApp = SalApp;
