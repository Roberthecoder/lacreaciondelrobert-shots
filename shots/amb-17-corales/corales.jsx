// Shot Ambiental #17 · Esto no es una roca: es un animal (corales y blanqueamiento) — NARRADO (N1 "Por dentro").
// Datos: NOAA Ocean Service, Davy et al. 2012, NOAA NESDIS (2 jun 2026), GCRMN. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático. Corales pétreos: pólipos con tentáculos y septos en múltiplos de 6 (aquí 12).

const CO_COLOR = { cerebro: '#c98a3c', ramas: '#e0739b', mesa: '#8fb04a', polipo: '#b9844a', zoox: '#b8862b' };
const CO_BLANCO = '#f3f1ea';
const coTinte = (c, blanco) => mixHex(c, CO_BLANCO, kclamp(blanco, 0, 1));

// Coral cerebro (domo con surcos que serpentean). (x, y) = centro de la base.
function CoralCerebro({ x, y, r = 220, color = CO_COLOR.cerebro, blanco = 0, muerto = 0 }) {
  const c = mixHex(coTinte(color, blanco), '#9a9484', muerto * 0.8), surco = mixHex(mixHex(color, '#5a3410', 0.45), '#cfcabd', blanco);
  const id = 'cc' + Math.round(x + y + r);
  const surcos = Array.from({ length: 6 }, (_, i) => {
    const yy = -r * 0.12 - i * r * 0.13, ww = Math.sqrt(Math.max(0, 1 - Math.pow((i * 0.13 + 0.12) / 0.78, 2))) * r * 0.92;
    let d = `M ${-ww} ${yy}`; const n = 10; for (let k = 1; k <= n; k++) { const px = -ww + (2 * ww * k) / n; d += ` Q ${px - ww / n} ${yy + (k % 2 ? -1 : 1) * r * 0.07} ${px} ${yy}`; }
    return <path key={i} d={d} stroke={surco} strokeWidth={r * 0.035} fill="none" strokeLinecap="round" />;
  });
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><path d={`M ${-r} 0 A ${r} ${r * 0.78} 0 0 1 ${r} 0 Z`} /></clipPath></defs>
    <path d={`M ${-r} 0 A ${r} ${r * 0.78} 0 0 1 ${r} 0 Z`} fill={c} stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#${id})`}>{surcos}</g>
    <path d={`M ${-r * 0.55} ${-r * 0.55} Q ${-r * 0.2} ${-r * 0.72} ${r * 0.15} ${-r * 0.7}`} stroke="#fff" strokeOpacity=".35" strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
  </g>;
}
// Coral de ramas (tipo cuerno de ciervo). (x, y) = base.
function CoralRamas({ x, y, h = 340, color = CO_COLOR.ramas, blanco = 0, seed = 3 }) {
  const r = krng(seed), segs = [];
  const rama = (x0, y0, ang, len, w, n) => {
    const x1 = x0 + Math.sin(ang) * len, y1 = y0 - Math.cos(ang) * len; segs.push([x0, y0, x1, y1, w]);
    if (n > 0) { rama(x1, y1, ang - 0.35 - r() * 0.3, len * 0.72, w * 0.8, n - 1); rama(x1, y1, ang + 0.35 + r() * 0.3, len * 0.72, w * 0.8, n - 1); }
  };
  rama(0, 0, -0.1, h * 0.38, 44, 3);
  const c = coTinte(color, blanco);
  return <g transform={`translate(${x} ${y})`}>
    {segs.map(([a, b, c2, d, w], i) => <line key={'o' + i} x1={a} y1={b} x2={c2} y2={d} stroke={KC.ink} strokeWidth={w + 12} strokeLinecap="round" />)}
    {segs.map(([a, b, c2, d, w], i) => <line key={'c' + i} x1={a} y1={b} x2={c2} y2={d} stroke={c} strokeWidth={w} strokeLinecap="round" />)}
    {segs.filter((s) => s[4] < 30).map(([a, b, c2, d, w], i) => <circle key={'p' + i} cx={c2} cy={d} r={w * 0.28} fill={mixHex(c, '#ffffff', 0.5)} />)}
  </g>;
}
// Coral de mesa (tallo y plato).
function CoralMesa({ x, y, w = 300, color = CO_COLOR.mesa, blanco = 0 }) {
  const c = coTinte(color, blanco);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-150} width={52} height={150} rx={18} fill={c} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-160} rx={w / 2} ry={42} fill={c} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-172} rx={w / 2 - 30} ry={20} fill="#fff" opacity=".22" />
  </g>;
}
// Pez de caricatura que nada.
function Pez({ x, y, s = 1, color = KC.yellow, dir = 1, T = 0 }) {
  const cola = Math.sin(T * 12) * 10;
  return <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
    <path d={`M -60 0 L -100 ${-30 + cola} L -100 ${30 + cola} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={70} ry={38} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -10 -36 Q 0 0 -10 36" stroke={KC.ink} strokeWidth={4} fill="none" opacity=".5" />
    <circle cx={38} cy={-8} r={9} fill={KC.ink} /><circle cx={41} cy={-11} r={3} fill="#fff" />
  </g>;
}
// Arrecife completo (fondo + corales + peces). blanco 0..1 = blanqueado.
function Arrecife({ T, blanco = 0 }) {
  const pez = (i, y0, vel, color, s) => { const u = ((T * vel + i * 0.37) % 1.4) - 0.2; return <Pez key={i} T={T + i} x={u * KW} y={y0 + Math.sin(T * 2 + i) * 14} s={s} color={color} />; };
  return <>
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex('#29c6ee', '#8fb3c4', blanco * 0.6)}, ${mixHex('#0f8fd0', '#5d7f92', blanco * 0.6)})` }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {Array.from({ length: 7 }, (_, i) => <polygon key={i} points={`${80 + i * 160},0 ${150 + i * 160},0 ${40 + i * 170 + Math.sin(T * 0.6 + i) * 30},1200 ${-40 + i * 170},1200`} fill="#fff" opacity={0.07} />)}
      {pez(0, 610, 0.09, KC.yellow, 0.7)}{pez(1, 1080, 0.07, KC.orange, 0.55)}
      <path d="M 0 1180 Q 270 1130 540 1170 T 1080 1160 L 1080 1920 L 0 1920 Z" fill={mixHex('#f2d58e', '#e6dcc4', blanco)} stroke={KC.ink} strokeWidth={8} />
      <CoralMesa x={150} y={1200} w={250} blanco={blanco} />
      <CoralRamas x={840} y={1200} h={430} blanco={blanco} />
      <CoralCerebro x={430} y={1210} r={250} blanco={blanco} />
      {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.35 + i / 6) % 1); return <circle key={i} cx={560 + i * 30 + Math.sin(T * 3 + i) * 8} cy={900 - u * 400} r={6 + (i % 3) * 3} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - u} />; })}
    </svg>
  </>;
}
// Pólipo visto desde arriba: 12 tentáculos (múltiplos de 6) alrededor de la boca. abre 0..1.
function PolipoArriba({ x, y, r = 70, abre = 1, color = CO_COLOR.polipo, blanco = 0, T = 0, seed = 1 }) {
  const c = coTinte(color, blanco), L = r * (0.25 + 0.75 * abre);
  return <g transform={`translate(${x} ${y}) rotate(${seed * 17})`}>
    {Array.from({ length: 12 }, (_, i) => { const a = i * 30 + Math.sin(T * 2 + i + seed) * 4;
      return <g key={i} transform={`rotate(${a})`}><ellipse cx={0} cy={-r * 0.38 - L * 0.5} rx={r * 0.13} ry={L * 0.5} fill={c} stroke={KC.ink} strokeWidth={4} />
        <circle cx={0} cy={-r * 0.38 - L * 0.92} r={r * 0.07} fill={mixHex(c, '#ffffff', 0.55)} /></g>; })}
    <circle r={r * 0.45} fill={mixHex(c, '#ffffff', 0.18)} stroke={KC.ink} strokeWidth={5} />
    <ellipse rx={r * 0.17} ry={r * 0.07} fill={KC.ink} opacity=".75" />
  </g>;
}
// Pólipo de lado sobre su copa de caliza (coralito). piel 0..1 = cuánto se ve el cuerpo blando (rayos X lo baja).
function PolipoLado({ x, y, s = 1, color = CO_COLOR.polipo, piel = 1, T = 0, blanco = 0 }) {
  const c = coTinte(color, blanco);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* copa de caliza con septos */}
    <path d="M -170 0 L -140 -190 L 140 -190 L 170 0 Z" fill="#d7d3c8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={-120 + i * 40} y1={-185} x2={-140 + i * 46.6} y2={-6} stroke="#9c978b" strokeWidth={6} />)}
    {/* cuerpo blando */}
    <g opacity={piel}>
      <path d="M -120 -150 L -110 -330 Q 0 -360 110 -330 L 120 -150 Z" fill={c} fillOpacity=".92" stroke={KC.ink} strokeWidth={7} />
      {[-150, -110, -70, -35, 0, 35, 70, 110, 150].map((a, i) => { const sw = Math.sin(T * 2.2 + i) * 8;
        return <path key={i} d={`M ${a * 0.65} -335 Q ${a * 1.2 + sw} -440 ${a * 1.45 + sw * 1.5} -520`} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />; })}
      {[-150, -110, -70, -35, 0, 35, 70, 110, 150].map((a, i) => { const sw = Math.sin(T * 2.2 + i) * 8;
        return <path key={'c' + i} d={`M ${a * 0.65} -335 Q ${a * 1.2 + sw} -440 ${a * 1.45 + sw * 1.5} -520`} stroke={c} strokeWidth={20} fill="none" strokeLinecap="round" />; })}
      <ellipse cx={0} cy={-338} rx={70} ry={14} fill={KC.ink} opacity=".6" />
    </g>
  </g>;
}
// Copa de caliza vista desde arriba (12 septos), para la lupa.
function CopaArriba({ r }) {
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1d2a33" />
    <circle cx={r} cy={r} r={r * 0.78} fill="#d7d3c8" stroke="#f4f1e8" strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return <line key={i} x1={r + Math.cos(a) * r * 0.2} y1={r + Math.sin(a) * r * 0.2} x2={r + Math.cos(a) * r * 0.78} y2={r + Math.sin(a) * r * 0.78} stroke="#8e897c" strokeWidth={9} strokeLinecap="round" />; })}
    <circle cx={r} cy={r} r={r * 0.2} fill="#b7b2a5" />
  </svg>;
}
// Zooxantela (alga dinoflagelada en estado de quiste): esfera dorada-café con cloroplasto en red y pirenoide.
function Zoox({ x, y, r = 55, o = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r * 1.18} fill="none" stroke="#e9d8a6" strokeWidth={3} strokeDasharray="8 6" opacity=".7" />
    <circle r={r} fill={CO_COLOR.zoox} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-r * 0.7} ${-r * 0.2} Q ${-r * 0.2} ${-r * 0.6} ${r * 0.3} ${-r * 0.4} M ${-r * 0.6} ${r * 0.3} Q 0 0 ${r * 0.6} ${r * 0.2} M ${-r * 0.2} ${r * 0.7} Q ${r * 0.2} ${r * 0.3} ${r * 0.5} ${r * 0.6}`} stroke="#6e4a10" strokeWidth={6} fill="none" strokeLinecap="round" />
    <circle cx={r * 0.25} cy={-r * 0.1} r={r * 0.22} fill="#e9c66a" stroke="#6e4a10" strokeWidth={3} />
  </g>;
}
const ZX = [[-250, -90], [-60, -160], [140, -110], [260, 60], [60, 120], [-150, 130], [-300, 70]];
// Célula del coral con zooxantelas. palidez 0..1, expulsa 0..1 (las algas salen), azucar 0..1 (flujo de alimento).
function Celula({ T, x = 540, y = 860, w = 840, h = 620, palidez = 0, expulsa = 0, azucar = 0, entra = 1 }) {
  const fondo = mixHex('#3d6b5a', '#2a3036', palidez);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={w / 2 + 14} ry={h / 2 + 14} fill="none" stroke="#7fe3c4" strokeOpacity=".35" strokeWidth={14} />
    <ellipse rx={w / 2} ry={h / 2} fill={fondo} stroke="#9ff0d4" strokeWidth={8} />
    <ellipse cx={-w * 0.36} cy={-h * 0.25} rx={70} ry={58} fill="#6b4fa8" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-w * 0.36 + 12} cy={-h * 0.25 - 6} r={16} fill="#9d85d6" />
    {ZX.map(([zx, zy], i) => {
      const k = kclamp(expulsa * 1.6 - i * 0.09, 0, 1), dir = Math.atan2(zy, zx);
      const px = zx + Math.cos(dir) * k * 520, py = zy + Math.sin(dir) * k * 420;
      return <Zoox key={i} x={px + Math.sin(T * 1.5 + i) * 4} y={py + Math.cos(T * 1.3 + i) * 4} r={52} o={(1 - k * 0.9) * kclamp(entra * 7 - i, 0, 1)} />;
    })}
    {azucar > 0 && ZX.slice(0, 6).map(([zx, zy], i) => Array.from({ length: 3 }, (_, j) => {
      const u = ((T * 0.7 + j / 3 + i * 0.13) % 1), tx = klerp(zx, zx * 0.3 - 80, u), ty = klerp(zy, zy * 0.3 - 40, u);
      return <polygon key={i + '-' + j} points={Array.from({ length: 6 }, (_, q) => `${(tx + Math.cos(q * Math.PI / 3) * 12).toFixed(1)},${(ty + Math.sin(q * Math.PI / 3) * 12).toFixed(1)}`).join(' ')}
        fill={KC.yellow} stroke={KC.ink} strokeWidth={3} opacity={azucar * Math.sin(Math.PI * u)} />; }))}
  </g>;
}
// Termómetro. valor 0..1.
function Termometro({ x, y, alto = 520, valor = 0.3 }) {
  const c = mixHex('#ffb02e', KC.red, valor);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-alto} width={68} height={alto} rx={34} fill="#f4f1e8" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={30} r={64} fill={c} stroke={KC.ink} strokeWidth={7} />
    <rect x={-18} y={-alto * valor - 10 + 20} width={36} height={alto * valor + 20} rx={18} fill={c} />
    {[0.2, 0.4, 0.6, 0.8].map((q) => <line key={q} x1={34} y1={-alto * q} x2={60} y2={-alto * q} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Globo esquemático con arrecifes (puntos en la franja tropical). blancos 0..1 = fracción de puntos que se ponen blancos.
const GL_PTS = (() => { const r = krng(17); return Array.from({ length: 50 }, () => ({ a: r() * 2 - 1, b: (r() * 2 - 1) * 0.36, o: r() })).sort((p, q) => p.o - q.o); })();
function Globo({ T, x, y, r = 280, blancos = 0 }) {
  const id = 'gl' + Math.round(x);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
    <circle r={r + 20} fill="none" stroke="#bff3ff" strokeOpacity=".5" strokeWidth={16} />
    <circle r={r} fill="#1f74c9" stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#${id})`}>
      <rect x={-r} y={-r * 0.36} width={r * 2} height={r * 0.72} fill="#ffffff" opacity=".08" />
      <path d={`M ${-r * 0.75} ${-r * 0.75} q 120 -40 200 30 q 30 90 -40 150 q -60 30 -70 120 q -40 40 -80 -40 q -60 -120 -10 -260 Z`} fill="#66b85a" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${r * 0.05} ${-r * 0.8} q 140 -20 220 60 q 20 80 -60 110 q 40 60 10 160 q -60 80 -110 -10 q -40 -90 -20 -170 q -60 -60 -40 -150 Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${r * 0.45} ${r * 0.35} q 90 -20 130 40 q -10 70 -100 60 q -50 -40 -30 -100 Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
      {GL_PTS.map((p, i) => { const w = i < blancos * GL_PTS.length; return <circle key={i} cx={p.a * r * 0.95} cy={p.b * r} r={11} fill={w ? '#ffffff' : KC.coral} stroke={KC.ink} strokeWidth={3} />; })}
    </g>
  </g>;
}
// Barras de los 4 eventos globales (porcentaje del área de arrecifes con calor de blanqueamiento).
function Barras({ T, at, x = 140, base = 1120, alto = 460 }) {
  const datos = [['1998', 21], ['2010', 37], ['2014–17', 68], ['2023–25', 84]];
  return <g>{datos.map(([a, v], i) => { const k = kprog(T, at + i * 0.35, at + i * 0.35 + 0.5, kEase.sale), h = (alto * v / 100) * k, bx = x + i * 215;
    return <g key={i} opacity={kprog(T, at + i * 0.35, at + i * 0.35 + 0.15)}>
      <rect x={bx} y={base - h} width={150} height={h} rx={12} fill={i === 3 ? '#ffffff' : '#f4c9b8'} stroke={KC.ink} strokeWidth={6} />
      <text x={bx + 75} y={base - h - 18} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>{v} %</text>
      <text x={bx + 75} y={base + 44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{a}</text>
    </g>; })}</g>;
}
// Franja del Arrecife Mesoamericano (Quintana Roo → Belice → Islas de la Bahía, Honduras). esquemático.
const MAR_PTS = [[-86.75, 21.3], [-86.85, 20.6], [-87.3, 19.9], [-87.45, 19.0], [-87.75, 18.3], [-87.85, 17.6], [-88.05, 16.9], [-88.25, 16.3], [-87.6, 16.15], [-86.6, 16.25]];

function CoralesShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Po: CUES.Polipos, E: CUES.Esqueleto, A: CUES.Algas, Co: CUES.Comida, P: CUES.Pregunta, Ca: CUES.Calor, H: CUES.Hambre, M: CUES.Mundo, Mx: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // mapa del Caribe: centro en (-87.5, 18.6)
  const MS = 2.6, [mlx, mly] = mxProy(-87.5, 18.6), MX0 = 560 - mlx * MS, MY0 = 860 - mly * MS;
  const mp = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [MX0 + a * MS, MY0 + b * MS]; };
  const marBl = kprog(T, K.Mx + 2.0, K.Mx + 3.6, kEase.suave);
  const marD = 'M ' + MAR_PTS.map(([a, b]) => mp(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ');
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el arrecife; ¿roca? ¿planta? no: animal */}
      <Escena T={T} a={K.G} b={K.Po}>
        <Arrecife T={T} blanco={0} />
      </Escena>
      {/* 2 · pólipos vistos desde arriba, abriendo sus 12 tentáculos */}
      <Escena T={T} a={K.Po} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={60} y={460} width={960} height={760} rx={60} fill="#d9b27a" stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2].map((fi) => [0, 1, 2, 3].map((ci) => { const i = fi * 4 + ci, x = 190 + ci * 235 + (fi % 2) * 50, y = 590 + fi * 250;
            return <PolipoArriba key={i} x={x} y={y} r={88} T={T} seed={i} abre={kprog(T, K.Po + 0.2 + i * 0.12, K.Po + 0.8 + i * 0.12, kEase.rebote)} />; }))}</>)}
        <EscalaFija texto="1 cm (aprox.)" largo={120} y={1440} color={KC.ink} />
      </Escena>
      {/* 3 · un pólipo de lado sobre su esqueleto de caliza */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.yellow} />
        {svg(<><rect x={0} y={1060} width={KW} height={860} fill="#cfc9b8" /><line x1={0} y1={1060} x2={KW} y2={1060} stroke={KC.ink} strokeWidth={8} />
          <PolipoLado x={360} y={1080} s={1.05} T={T} piel={1 - 0.55 * kprog(T, K.E + 1.2, K.E + 2.0)} /></>)}
      </Escena>
      <Lupa T={T} at={K.E + 1.4} until={K.A - 0.2} x={790} y={930} r={160} fx={360} fy={960} tinte={KC.cyan} etiqueta="CALIZA" interior={(t, r) => <CopaArriba r={r} />} />
      {/* 4–5 · adentro: una célula con zooxantelas; le pasan azúcar */}
      <Escena T={T} a={K.A} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 45%, #13303a 0%, #0E0F12 75%)' }}></div>
        {svg(<>{Array.from({ length: 5 }, (_, i) => <polygon key={i} points={`${620 + i * 90},0 ${660 + i * 90},0 ${420 + i * 110},1200 ${360 + i * 110},1200`} fill="#ffe9a0" opacity={0.07 + 0.04 * Math.sin(T * 1.5 + i)} />)}
          <Celula T={T} x={540} y={860} palidez={0} entra={kprog(T, K.A + 0.2, K.A + 1.6)} azucar={kprog(T, K.Co + 0.2, K.Co + 0.8)} /></>)}
        <EscalaFija texto="10 µm (esquema)" largo={104} y={1440} />
      </Escena>
      {/* 6 · pregunta: ¿por qué hay corales blancos? */}
      <Escena T={T} a={K.P} b={K.Ca} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><CoralCerebro x={270} y={820} r={190} blanco={0} /><CoralCerebro x={270} y={1180} r={190} blanco={1} />
          <text x={560} y={520} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 560 420)`}>?</text></>)}
      </Escena>
      {/* 7 · calor: el coral expulsa a sus algas */}
      <Escena T={T} a={K.Ca} b={K.H}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, ${mixHex('#13303a', '#3a1414', kprog(T, K.Ca, K.Ca + 2))} 0%, #0E0F12 75%)` }}></div>
        {svg(<><Celula T={T} x={600} y={860} w={720} h={560} palidez={kprog(T, K.Ca + 1.2, K.Ca + 3.4)} expulsa={kprog(T, K.Ca + 1.0, K.Ca + 3.6, kEase.suave)} />
          <Termometro x={120} y={1130} valor={klerp(0.35, 0.92, kprog(T, K.Ca + 0.2, K.Ca + 1.4, kEase.sale))} /></>)}
      </Escena>
      {/* 8 · blanqueado no es muerto (pero sin comida) */}
      <Escena T={T} a={K.H} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<><path d="M 0 1180 Q 270 1130 540 1170 T 1080 1160 L 1080 1920 L 0 1920 Z" fill="#e6dcc4" stroke={KC.ink} strokeWidth={8} />
          <CoralCerebro x={400} y={1200} r={300} blanco={1} muerto={kprog(T, K.H + 3.4, K.H + 5.0)} />
          {[[300, 1010], [420, 960], [540, 1030], [360, 1110], [480, 1120], [240, 1120]].map(([px, py], i) => <PolipoArriba key={i} x={px} y={py} r={34} T={T} seed={i} blanco={1} abre={1 - kprog(T, K.H + 3.4, K.H + 5.0)} />)}</>)}
      </Escena>
      <Medidor T={T} at={K.H + 1.6} until={K.M - 0.3} valor={(t) => klerp(0.9, 0.12, kprog(t, K.H + 1.8, K.H + 4.4, kEase.suave))} etiqueta="comida del coral" texto={() => ''} x={90} y={1410} color={KC.yellow} />
      {/* 9 · el mundo: 84 % (2023 – mediados de 2025) y los eventos anteriores */}
      <Escena T={T} a={K.M} b={K.Mx}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><g opacity={1 - kprog(T, K.M + 5.0, K.M + 5.5)}><Globo T={T} x={470} y={900} r={270} blancos={0.84 * kprog(T, K.M + 0.8, K.M + 3.6)} /></g>
          <Barras T={T} at={K.M + 5.4} /></>)}
      </Escena>
      {/* 10 · Arrecife Mesoamericano */}
      <Escena T={T} a={K.Mx} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'#7fd6f5' }}></div>
        {svg(<><MapaMexico x={MX0} y={MY0} ancho={1000 * MS} />
          <path d={marD} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={marD} stroke={mixHex(KC.coral, '#ffffff', marBl)} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2400" strokeDashoffset={2400 * (1 - kprog(T, K.Mx + 0.3, K.Mx + 1.6, kEase.suave))} />
          {[['MÉXICO', -89.6, 19.6], ['BELICE', -88.9, 17.3], ['GUATEMALA', -90.4, 15.6], ['HONDURAS', -87.2, 14.9]].map(([n, a, b]) => { const [px, py] = mp(a, b);
            return <text key={n} x={px} y={py} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Mx + 0.8, K.Mx + 1.3)}>{n}</text>; })}
          <text x={mp(-84.6, 19.2)[0]} y={mp(-84.6, 19.2)[1]} textAnchor="middle" style={{ font:`700 italic 34px ${KF.mono}` }} fill="#0b4f7a">Mar Caribe</text></>)}
        <EscalaFija texto="esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: el mismo arrecife del inicio, ahora blanco */}
      <Escena T={T} a={K.C} b={FIN}>
        <Arrecife T={T} blanco={kprog(T, K.C - 0.3, K.C + 1.2, kEase.suave)} />
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.15} tacharEn={K.G + 1.1} until={K.Po - 0.2} texto="¿una roca?" x={300} y={470} />
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 1.8} until={K.Po - 0.2} texto="¿una planta?" x={300} y={580} />
      <Chip T={T} at={K.G + 2.2} until={K.Po - 0.2} texto="ES UN ANIMAL" x={300} y={700} tam={56} borde={KC.yellow} />
      <Chip T={T} at={K.Po + 0.3} until={K.E - 0.2} texto="pólipos: cientos a miles por coral" y={380} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Po + 1.6} until={K.E - 0.2} x={960} y={1255} texto="12 tentáculos" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.A - 0.2} x={590} y={760} texto="pólipo (blando)" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 2.2} until={K.A - 0.2} texto="esqueleto de carbonato de calcio" y={1440} x={540} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.0} until={K.P - 0.2} x={240} y={500} texto="célula del coral" tam={30} />
      <Etq T={T} at={K.A + 1.8} until={K.P - 0.2} x={830} y={1140} texto="zooxantela (alga)" lado="izq" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.A + 2.6} until={K.Co - 0.2} x={830} y={1190} texto="Symbiodiniaceae" it lado="izq" tam={26} color={KC.gold2} />
      <NumeroGigante T={T} at={K.Co + 0.3} until={K.P - 0.2} valor={90} dur={1.0} prefijo="hasta " sufijo=" %" etiqueta="de lo que fabrican, al coral" x={380} y={400} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Co + 2.8} until={K.P - 0.2} texto="su color = sus algas" y={1440} x={540} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Ca + 0.5} until={K.H - 0.2} texto="agua demasiado caliente" y={430} x={560} tam={36} borde={KC.red} />
      <Chip T={T} at={K.H + 0.3} until={K.M - 0.2} texto="blanqueado ≠ muerto" y={470} x={360} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.H + 3.4} until={K.M - 0.2} texto="si el calor sigue: se muere" y={590} x={360} tam={32} borde={KC.red} />
      <NumeroGigante T={T} at={K.M + 0.8} until={K.Mx - 0.2} valor={84} dur={1.4} sufijo=" %" etiqueta="de los arrecifes del mundo" x={340} y={420} tam={150} color={KC.coral} />
      <Chip T={T} at={K.M + 2.0} until={K.Mx - 0.2} texto="NOAA · 2023 – mediados de 2025" y={1440} x={540} tam={30} borde={KC.coral} />
      <Chip T={T} at={K.Mx + 0.3} until={K.C - 0.2} texto="Arrecife Mesoamericano" y={430} x={660} tam={36} borde={KC.coral} />
      <Chip T={T} at={K.Mx + 2.4} until={K.C - 0.2} texto="2023: el peor blanqueamiento registrado" y={1440} x={540} tam={28} borde={KC.red} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="ES UN ANIMAL" x={300} y={600} tam={56} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Po - 0.1} texto="No es roca ni planta: *es un animal.*" />
      <Subtitulo T={T} idx={1} at={K.Po + 0.1} until={K.E - 0.1} texto="Miles de animalitos: *los pólipos.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.A - 0.1} texto="Un esqueleto de *piedra caliza.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Co - 0.1} texto="En sus células: *zooxantelas.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.P - 0.1} texto="Hasta el *90 %* de su comida." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ca - 0.1} texto="¿Por qué *corales blancos?*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.H - 0.1} texto="Agua muy caliente: *expulsa sus algas.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.M - 0.1} texto="No está muerto, *pero no come.*" />
      <Subtitulo T={T} idx={8} at={K.M + 0.1} until={K.Mx - 0.1} texto="2023–2025: *84 % de los arrecifes.*" />
      <Subtitulo T={T} idx={9} at={K.Mx + 0.1} until={K.C - 0.1} texto="Mesoamericano: *2023, el peor.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un animal que *se muere de hambre.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Polipos - 0.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Esqueleto + 1.0, CUES.Algas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Comida + 1.6, CUES.Pregunta - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Calor - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Hambre + 0.5, CUES.Mundo - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Mundo + 1.5, CUES.Mundo + 5.0, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Mexico + 1.2, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="17" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CoralesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CoralesShot /></CompositionStage></div>;
}
window.CoralesApp = CoralesApp;
