// Shot Biotecnológico #46 · La luz verde de la medusa (GFP) — NARRADO (N1 por dentro + N5 el experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (medusa, proteína, célula y gusano).
// Fluorescencia, no bioluminiscencia: en la medusa la ENERGÍA azul (aequorina + calcio) pasa a la GFP sin llegar a ser luz;
// hacia afuera solo sale verde. En el laboratorio, la GFP sola absorbe luz azul/UV y la devuelve verde.
const GV = '#5dff7a', GV2 = '#c8ffb0', GAZ = '#4d8bff', GUV = '#8a5cff', GCIAN = '#38e8ff', GAMA = '#ffe14a';

function GCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
function GDefs() {
  return <svg width={0} height={0} style={{ position:'absolute' }}><defs>
    <filter id="gfpBlur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="9" /></filter>
    <filter id="gfpBlur2" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="22" /></filter>
    <radialGradient id="gfpMar" cx="50%" cy="35%" r="75%"><stop offset="0%" stopColor="#123a66" /><stop offset="100%" stopColor="#050b1a" /></radialGradient>
    <linearGradient id="gfpCampana" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(220,240,255,.42)" /><stop offset="100%" stopColor="rgba(170,215,255,.16)" /></linearGradient>
  </defs></svg>;
}

// ---------- MEDUSA (Aequorea victoria, esquemática) ----------
// Campana transparente con muchos canales radiales; los órganos de luz son puntitos en la orilla.
// verde 0..1 = luz verde que sale; azul 0..1 = brillo azul tenue DENTRO de cada puntito (energía, no sale al agua).
function Medusa({ T, x, y, s = 1, verde = 1, azul = 0, seed = 1, onda = 0, n = 30 }) {
  const p = Math.sin(T * 2.3 + seed), sx = 1 + 0.045 * p, sy = 1 - 0.065 * p;
  const W = 280, H = 300, R = krng(seed * 11);
  const bell = `M ${-W} 0 C ${-W} ${-H * 0.78} ${-W * 0.55} ${-H} 0 ${-H} C ${W * 0.55} ${-H} ${W} ${-H * 0.78} ${W} 0 Q ${W * 0.5} 30 0 26 Q ${-W * 0.5} 30 ${-W} 0 Z`;
  const rim = Array.from({ length: n }, (_, i) => -W + 14 + (i * (2 * W - 28)) / (n - 1));
  const rimY = (tx) => 10 + 14 * (1 - (tx / W) * (tx / W));
  const tent = Array.from({ length: 34 }, (_, i) => { const tx = -W + 8 + (i * (2 * W - 16)) / 33, L = 170 + R() * 160, ph = R() * 6; return { tx, L, ph }; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* tentáculos finos */}
    {tent.map(({ tx, L, ph }, i) => { const y0 = rimY(tx), sw = Math.sin(T * 1.6 + ph) * 26;
      return <path key={'t' + i} d={`M ${tx * sx} ${y0} Q ${tx * sx + sw} ${y0 + L * 0.5} ${tx * sx - sw * 0.6} ${y0 + L}`} stroke="rgba(210,235,255,.5)" strokeWidth={3} fill="none" />; })}
    <g transform={`scale(${sx} ${sy})`}>
      <path d={bell} fill="url(#gfpCampana)" stroke="rgba(230,245,255,.9)" strokeWidth={7} />
      {/* canales radiales */}
      {Array.from({ length: 36 }, (_, i) => { const tx = -W + 20 + (i * (2 * W - 40)) / 35;
        return <path key={'c' + i} d={`M ${tx * 0.32} ${-H * 0.32} Q ${tx * 0.75} ${-H * 0.2} ${tx * 0.97} ${rimY(tx) - 6}`} stroke="rgba(235,248,255,.35)" strokeWidth={3} fill="none" />; })}
      {/* estómago y manubrio */}
      <ellipse cx={0} cy={-H * 0.3} rx={W * 0.36} ry={34} fill="rgba(255,255,255,.14)" stroke="rgba(235,248,255,.6)" strokeWidth={4} />
      <path d={`M -40 ${-H * 0.28} Q -30 40 0 70 Q 30 40 40 ${-H * 0.28}`} fill="rgba(255,255,255,.12)" stroke="rgba(235,248,255,.55)" strokeWidth={4} />
      {/* órganos de luz en la orilla */}
      {rim.map((tx, i) => { const v = typeof verde === 'function' ? verde(i) : verde, a = typeof azul === 'function' ? azul(i) : azul, fl = 0.75 + 0.25 * Math.sin(T * 7 + i * 1.7 + onda * i);
        return <g key={'o' + i} transform={`translate(${tx} ${rimY(tx)})`}>
          {v > 0 && <circle r={26 * v * fl} fill={GV} opacity={0.75 * v} filter="url(#gfpBlur)" />}
          <circle r={8} fill={mixHex('#9fb4c8', '#7dff95', Math.min(1, v))} stroke="rgba(10,20,30,.6)" strokeWidth={2} />
          {a > 0 && <circle r={4.5} fill={GAZ} opacity={a * (0.6 + 0.4 * Math.sin(T * 9 + i))} />}
        </g>; })}
    </g>
  </g>;
}

// ---------- FRASCO de laboratorio ----------
function Frasco({ x, y, s = 1, liquido = '#cfe9ff', brillo = 0, colorBrillo = GV, etiqueta, nivel = 0.62 }) {
  const id = `fr${Math.round(x)}_${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={60} rx={170} ry={170} fill={colorBrillo} opacity={0.45 * brillo} filter="url(#gfpBlur2)" />}
    <clipPath id={id}><path d="M -110 -40 L 110 -40 L 110 150 Q 110 180 80 180 L -80 180 Q -110 180 -110 150 Z" /></clipPath>
    <rect x={-112} y={180 - 220 * nivel} width={224} height={220 * nivel} fill={brillo > 0 ? mixHex(liquido, colorBrillo, Math.min(1, brillo)) : liquido} opacity={0.88} clipPath={`url(#${id})`} />
    <path d="M -60 -200 L 60 -200 L 60 -90 Q 120 -60 120 0 L 120 150 Q 120 190 80 190 L -80 190 Q -120 190 -120 150 L -120 0 Q -120 -60 -60 -90 Z" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-72} y={-232} width={144} height={40} rx={10} fill="#e8eef7" stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 10 Q -98 80 -86 140" stroke="rgba(255,255,255,.7)" strokeWidth={10} fill="none" strokeLinecap="round" />
    {etiqueta && <g><rect x={-104} y={208} width={208} height={58} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={248} textAnchor="middle" style={{ font:`700 ${etiqueta.length > 9 ? 24 : 30}px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}

// ---------- LÁMPARA de luz azul / ultravioleta ----------
function Lampara({ x, y, rot = 0, s = 1, on = 1, largo = 520, color = GUV }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {on > 0 && <polygon points={`60,-40 ${60 + largo},-120 ${60 + largo},120 60,40`} fill={color} opacity={0.32 * on} />}
    {on > 0 && <polygon points={`60,-22 ${60 + largo},-60 ${60 + largo},60 60,22`} fill={color} opacity={0.4 * on} />}
    <rect x={-170} y={-36} width={170} height={72} rx={18} fill="#3a3f52" stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 -50 L 64 -62 L 64 62 L 0 50 Z" fill="#5a6078" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={64} cy={0} rx={12} ry={58} fill={on > 0 ? mixHex('#d9d0ff', color, 0.4) : '#666b7a'} stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={-52} width={34} height={18} rx={6} fill={on > 0 ? KC.mint : '#777'} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Rayo ondulado (luz que entra o sale) de (x0,y0) a (x1,y1).
function Onda({ T, x0, y0, x1, y1, color, p = 1, amp = 16, ondas = 6, grosor = 9, vel = 6 }) {
  if (p <= 0) return null;
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, N = 60;
  const pts = Array.from({ length: N + 1 }, (_, i) => { const u = (i / N) * p, w = Math.sin(u * ondas * Math.PI * 2 - T * vel) * amp; return `${x0 + ux * L * u + nx * w},${y0 + uy * L * u + ny * w}`; });
  const fin = pts[pts.length - 1].split(',').map(Number);
  return <g><polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" />
    <polygon points={`${fin[0] + ux * 26},${fin[1] + uy * 26} ${fin[0] + nx * 16},${fin[1] + ny * 16} ${fin[0] - nx * 16},${fin[1] - ny * 16}`} fill={color} /></g>;
}

// ---------- PROTEÍNA GFP: barril (11 hebras) con la pieza que brilla adentro (esquemático) ----------
// color = tinte de la proteína; crom 0..1 = la pieza que brilla encendida; arma 0..1 = las 3 cuentas se juntan.
function Barril({ T, x, y, s = 1, color = GV, crom = 1, arma = 1, corte = true }) {
  const W = 120, H = 210;
  const hebras = Array.from({ length: 11 }, (_, i) => i);
  const vis = (i) => Math.cos((i / 11) * Math.PI * 2 + T * 0.25);
  const cuentas = [[-28, -6], [0, 6], [28, -6]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {crom > 0 && <circle r={110 * crom} fill={color} opacity={0.38 * crom} filter="url(#gfpBlur2)" />}
    {/* hebras de atrás */}
    {hebras.filter((i) => vis(i) < 0).map((i) => { const a = (i / 11) * Math.PI * 2 + T * 0.25, hx = Math.sin(a) * W;
      return <rect key={'b' + i} x={hx - 15} y={-H / 2} width={30} height={H} rx={14} fill={mixHex(color, '#1a2a22', 0.55)} stroke={KC.ink} strokeWidth={4} opacity={0.75} />; })}
    {/* hélice central y las 3 cuentas */}
    <path d={`M 0 ${-H / 2 - 30} C 40 -70 -40 -40 ${klerp(-70, -28, arma)} -6`} stroke="#e8f0ff" strokeWidth={6} fill="none" />
    <path d={`M ${klerp(70, 28, arma)} -6 C 40 40 -40 70 0 ${H / 2 + 30}`} stroke="#e8f0ff" strokeWidth={6} fill="none" />
    {cuentas.map(([cx, cy], i) => { const sx = klerp([-70, 0, 70][i], cx, arma), sy = klerp([-40, 40, -40][i], cy, arma);
      return <g key={'q' + i}>
        {crom > 0 && <circle cx={sx} cy={sy} r={30} fill={color} opacity={crom} filter="url(#gfpBlur)" />}
        <circle cx={sx} cy={sy} r={17} fill={mixHex(['#ff8fb1', '#ffd36b', '#8fd3ff'][i], GV2, crom)} stroke={KC.ink} strokeWidth={5} />
      </g>; })}
    {arma > 0.9 && <path d={`M -28 -6 L 0 6 L 28 -6`} stroke={crom > 0 ? GV2 : '#ccc'} strokeWidth={6} fill="none" />}
    {/* hebras de adelante (con corte para ver adentro) */}
    {hebras.filter((i) => vis(i) >= 0).map((i) => { const a = (i / 11) * Math.PI * 2 + T * 0.25, hx = Math.sin(a) * W, cent = Math.abs(hx) < 50 && corte;
      return <g key={'f' + i} opacity={cent ? 0.28 : 0.95}>
        <rect x={hx - 16} y={-H / 2} width={32} height={H} rx={15} fill={color} stroke={KC.ink} strokeWidth={5} />
        <path d={`M ${hx} ${H / 2 - 20} l -10 -20 m 10 20 l 10 -20`} stroke={KC.ink} strokeWidth={4} fill="none" />
      </g>; })}
    <ellipse cx={0} cy={-H / 2} rx={W + 16} ry={26} fill="none" stroke={KC.ink} strokeWidth={4} opacity={0.5} />
  </g>;
}

// ---------- GUSANO Caenorhabditis elegans (transparente, ~1 mm; esquemático) ----------
// Cabeza a la izquierda. on[i] 0..1 = las 6 neuronas del tacto (ALML, ALMR, AVM, PVM, PLML, PLMR).
function gusanoPunto(u, { x0, x1, y0, A, T, fase = 0 }) {
  const X = klerp(x0, x1, u), k = 2.4 * Math.PI, Y = y0 + A * Math.sin(k * u - T * 3.2 + fase);
  const dY = A * k * Math.cos(k * u - T * 3.2 + fase) / (x1 - x0), n = Math.hypot(1, dY);
  return [X, Y, -dY / n, 1 / n];
}
function Gusano({ T, x0 = 140, x1 = 940, y0 = 900, A = 60, ancho = 46, on = [], fase = 0, fondoClaro = false }) {
  const P = { x0, x1, y0, A, T, fase }, N = 70;
  const anchoU = (u) => ancho * (u < 0.08 ? 0.45 + 0.55 * (u / 0.08) : u > 0.82 ? Math.max(0.06, 1 - (u - 0.82) / 0.18) : 1);
  const arriba = [], abajo = [];
  for (let i = 0; i <= N; i++) { const u = i / N, [X, Y, nx, ny] = gusanoPunto(u, P), w = anchoU(u) / 2; arriba.push(`${X + nx * w},${Y + ny * w}`); abajo.unshift(`${X - nx * w},${Y - ny * w}`); }
  const linea = (ua, ub, off = 0) => Array.from({ length: 24 }, (_, i) => { const u = klerp(ua, ub, i / 23), [X, Y, nx, ny] = gusanoPunto(u, P), w = anchoU(u) / 2; return `${X + nx * w * off},${Y + ny * w * off}`; }).join(' ');
  const pt = (u, off) => { const [X, Y, nx, ny] = gusanoPunto(u, P), w = anchoU(u) / 2; return [X + nx * w * off, Y + ny * w * off]; };
  // neuronas: [u del cuerpo, lado, u hasta donde llega la prolongación]
  const NEU = [[0.47, 0.45, 0.12], [0.49, -0.45, 0.12], [0.41, 0.6, 0.16], [0.74, 0.55, 0.45], [0.92, 0.4, 0.5], [0.93, -0.4, 0.5]];
  const cuerpo = fondoClaro ? 'rgba(250,244,230,.75)' : 'rgba(225,235,245,.22)', borde = fondoClaro ? KC.ink : 'rgba(225,240,255,.85)';
  const [fx, fy] = pt(0.11, 0), [bx, by] = pt(0.18, 0);
  return <g>
    <polygon points={[...arriba, ...abajo].join(' ')} fill={cuerpo} stroke={borde} strokeWidth={fondoClaro ? 5 : 4} strokeLinejoin="round" />
    {/* faringe con sus dos bulbos e intestino */}
    <polyline points={linea(0.02, 0.19)} stroke={fondoClaro ? '#b58b6a' : 'rgba(255,220,190,.5)'} strokeWidth={6} fill="none" />
    <circle cx={fx} cy={fy} r={ancho * 0.22} fill={fondoClaro ? '#e9cfb2' : 'rgba(255,220,190,.35)'} stroke={borde} strokeWidth={2} />
    <circle cx={bx} cy={by} r={ancho * 0.3} fill={fondoClaro ? '#e9cfb2' : 'rgba(255,220,190,.35)'} stroke={borde} strokeWidth={2} />
    <polyline points={linea(0.21, 0.86)} stroke={fondoClaro ? '#d4a77a' : 'rgba(255,200,150,.35)'} strokeWidth={ancho * 0.32} strokeLinecap="round" fill="none" />
    {NEU.map(([u, off, ua], i) => { const v = on[i] || 0; if (v <= 0) return null; const [cx, cy] = pt(u, off);
      return <g key={i}>
        <polyline points={linea(ua, u, off)} stroke={GV} strokeWidth={4 + 2 * v} fill="none" opacity={v} />
        <circle cx={cx} cy={cy} r={22 * v} fill={GV} opacity={0.6 * v} filter="url(#gfpBlur)" />
        <circle cx={cx} cy={cy} r={9} fill={GV2} opacity={v} stroke={KC.ink} strokeWidth={2} />
      </g>; })}
  </g>;
}

// ---------- CÉLULA con la proteína marcada (esquemática) ----------
function Celula({ T, x, y, s = 1, marca = 0, gen = 0 }) {
  const N = 40, pts = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2, r = 330 + Math.sin(a * 3 + T * 0.8) * 16 + Math.cos(a * 5 - T) * 10; return [Math.cos(a) * r * 1.15, Math.sin(a) * r * 0.82]; });
  const d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill="rgba(255,190,220,.16)" stroke="#ffb3d1" strokeWidth={9} />
    <ellipse cx={-40} cy={10} rx={120} ry={95} fill="rgba(180,140,255,.25)" stroke={KC.lilac} strokeWidth={7} />
    {gen > 0 && <circle cx={-40} cy={10} r={60 * gen} fill={GV} opacity={0.25 * gen} filter="url(#gfpBlur)" />}
    {/* proteína X marcada: solo donde la célula la fabrica (aquí, en la membrana) */}
    {pts.filter((_, i) => i % 2 === 0).map(([px, py], i) => { const v = kclamp(marca * 22 - i, 0, 1); if (v <= 0) return null;
      return <g key={i}><circle cx={px * 0.95} cy={py * 0.95} r={20 * v} fill={GV} opacity={0.65 * v} filter="url(#gfpBlur)" /><circle cx={px * 0.95} cy={py * 0.95} r={8} fill={GV2} opacity={v} /></g>; })}
    {[[-220, -120], [160, -150], [200, 120], [-200, 150], [60, 200]].map(([mx, my], i) => <ellipse key={i} cx={mx + Math.sin(T + i) * 6} cy={my} rx={34} ry={16} fill="rgba(255,170,90,.35)" stroke="rgba(255,190,120,.7)" strokeWidth={3} transform={`rotate(${i * 37} ${mx} ${my})`} />)}
  </g>;
}

// ---------- otros dibujos ----------
function Luciernaga({ T, x, y, s = 1, luz = 1 }) {
  const ala = Math.sin(T * 30) * 12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && <ellipse cx={70} cy={10} rx={120} ry={90} fill="#d8ff5a" opacity={0.55 * luz} filter="url(#gfpBlur2)" />}
    <ellipse cx={-70} cy={-38 - ala} rx={70} ry={26} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} transform={`rotate(${-20 - ala} -70 -38)`} />
    <ellipse cx={-10} cy={0} rx={70} ry={34} fill="#3b2a24" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={70} cy={6} rx={50} ry={30} fill={mixHex('#8f8a5a', '#efff7a', luz)} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-86} cy={-4} r={28} fill="#ff6b5a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -104 -26 q -30 -40 -50 -30 M -94 -30 q -10 -46 -34 -48" stroke={KC.ink} strokeWidth={5} fill="none" />
    {[-40, 0, 40].map((lx, i) => <path key={i} d={`M ${lx} 28 l ${-10 + i * 4} 34`} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function Tijeras({ x, y, abre = 0.5, rot = 0, s = 1 }) {
  const a = 6 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 -8 L 190 -4 L 190 4 L 0 10 Z" fill="#d9e2ec" stroke={KC.ink} strokeWidth={5} /><circle cx={-60} cy={-12} r={30} fill="none" stroke={KC.red} strokeWidth={14} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 -10 L 190 -4 L 190 4 L 0 8 Z" fill="#c4ced9" stroke={KC.ink} strokeWidth={5} /><circle cx={-60} cy={12} r={30} fill="none" stroke={KC.red} strokeWidth={14} /></g>
    <circle r={8} fill={KC.ink} />
  </g>;
}
function Medalla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 1.5) * 4}) scale(${s})`}>
    <path d="M -110 -330 L -30 -170 L 30 -170 L 110 -330 L 50 -330 L 0 -230 L -50 -330 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle r={210} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={170} fill={KC.gold2} stroke="#b07a10" strokeWidth={6} />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text x={0} y={36} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>QUÍMICA</text>
    <text x={0} y={110} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill="#7a4d00">2008</text>
    <path d={`M -150 ${-60 + Math.sin(T * 3) * 10} L -120 -90`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
  </g>;
}
// Gen como una barra de ADN con rayitas (esquemático).
function Gen({ x, y, w, color, texto }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-34} width={w} height={68} rx={20} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: Math.floor(w / 30) }, (_, i) => <line key={i} x1={18 + i * 30} y1={-22} x2={18 + i * 30} y2={22} stroke="rgba(0,0,0,.35)" strokeWidth={5} />)}
    <text x={w / 2} y={86} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}

function Gfp() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Me: CUES.Medusa, Pr: CUES.Proteinas, Fl: CUES.Fluorescencia, Di: CUES.Diferencia, Pd: CUES.PorDentro, Pg: CUES.Pregunta,
    Tr: CUES.Truco, Es: CUES.Estudio, Vi: CUES.Vivas, Co: CUES.Colores, No: CUES.Nobel, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la orilla se enciende en ola (verde hacia afuera; el azul es tenue y se queda adentro)
  const olaG = (i) => kprog(T, K.G + 0.1 + i * 0.04, K.G + 0.5 + i * 0.04, kEase.sale);
  const red = kprog(T, K.Me + 0.2, K.Me + 2.2, kEase.suave);
  const corte = kprog(T, K.Me + 2.7, K.Me + 4.8);
  const gota = kprog(T, K.Pr + 0.5, K.Pr + 1.0), flashAz = kprog(T, K.Pr + 1.0, K.Pr + 1.2) * (1 - kprog(T, K.Pr + 1.3, K.Pr + 2.6));
  const lampFl = kprog(T, K.Fl + 0.4, K.Fl + 0.7), entra = kprog(T, K.Fl + 0.7, K.Fl + 1.8, kEase.sale), sale = kprog(T, K.Fl + 2.2, K.Fl + 3.4, kEase.sale);
  const apaga = kprog(T, K.Di + 1.6, K.Di + 1.9);
  const arma = kprog(T, K.Pd + 1.2, K.Pd + 2.4, kEase.suave), oxi = kprog(T, K.Pd + 2.2, K.Pd + 3.0, kEase.sale), crom = kprog(T, K.Pd + 3.0, K.Pd + 3.5);
  const pega = kprog(T, K.Tr + 0.2, K.Tr + 1.2, kEase.sale), mete = kprog(T, K.Tr + 1.5, K.Tr + 2.3, kEase.suave), marca = kprog(T, K.Tr + 2.6, K.Tr + 4.4);
  const neu = (i) => kprog(T, K.Es + 2.6 + i * 0.42, K.Es + 2.9 + i * 0.42);
  const neus = [0, 1, 2, 3, 4, 5].map(neu);
  const muta = (i) => kprog(T, K.Co + 0.5 + i * 0.55, K.Co + 0.8 + i * 0.55);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.noche }}>
      <GDefs />
      {/* 0 · GANCHO: la medusa de noche. Por dentro de cada puntito: energía azul tenue → sale solo verde */}
      <Escena T={T} a={K.G} b={K.Me} zoom={0.06} origen="45% 50%">
        <GCapa>
          <rect width={KW} height={KH} fill="url(#gfpMar)" />
          {Array.from({ length: 26 }, (_, i) => { const R = krng(i + 3); const px = R() * KW, py = (R() * KH - T * 30 * (0.5 + R())) % KH; return <circle key={i} cx={px} cy={py < 0 ? py + KH : py} r={2 + R() * 4} fill="rgba(200,230,255,.35)" />; })}
          <Medusa T={T} x={410} y={990} s={1.12} verde={olaG} azul={(i) => 0.35 + 0.65 * (1 - olaG(i)) * kprog(T, 0, 0.1)} seed={2} />
          {/* recuadro: qué pasa dentro de un puntito */}
          <g opacity={kprog(T, K.G + 0.9, K.G + 1.4)}>
            <rect x={50} y={360} width={520} height={250} rx={30} fill="rgba(8,14,30,.85)" stroke={GV} strokeWidth={5} />
            <circle cx={150} cy={470} r={46} fill="#1d2f6b" stroke={GAZ} strokeWidth={6} />
            <circle cx={150} cy={470} r={24 + 6 * Math.sin(T * 8)} fill={GAZ} opacity={0.55} filter="url(#gfpBlur)" />
            <text x={150} y={560} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#b9ccff">aequorina</text>
            <path d={`M 205 470 L ${klerp(205, 330, kprog(T, K.G + 1.4, K.G + 2.0))} 470`} stroke={GAZ} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-T * 40} />
            <text x={268} y={448} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#b9ccff">energía</text>
            <circle cx={385} cy={470} r={46} fill="#123d22" stroke={GV} strokeWidth={6} />
            <circle cx={385} cy={470} r={30 * kprog(T, K.G + 2.0, K.G + 2.3)} fill={GV} opacity={0.8} filter="url(#gfpBlur)" />
            <text x={385} y={560} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={GV2}>GFP</text>
            <Onda T={T} x0={436} y0={470} x1={545} y1={470} color={GV} p={kprog(T, K.G + 2.3, K.G + 2.8)} amp={10} ondas={3} grosor={7} />
          </g>
        </GCapa>
      </Escena>
      {/* 1 · 1961, Friday Harbor: red de mano, ~10 000 medusas, la orilla se corta */}
      <Escena T={T} a={K.Me} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <GCapa>
          <rect x={0} y={760} width={KW} height={560} fill="#0a8fc0" opacity={0.85} />
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${-40 + ((i * 160 + T * 40) % 1200)} ${800 + (i % 3) * 120} q 40 -18 80 0`} stroke="rgba(255,255,255,.5)" strokeWidth={5} fill="none" />)}
          {[[160, 1040, 0.28], [380, 1150, 0.24], [640, 1060, 0.3], [880, 1170, 0.25], [520, 920, 0.22]].map(([mx, my, ms], i) => (i !== 4 || red < 0.55) &&
            <Medusa key={i} T={T} x={mx} y={my + Math.sin(T * 1.2 + i) * 10} s={ms} verde={0} azul={0} seed={i + 4} n={14} />)}
          {/* muelle */}
          <rect x={0} y={700} width={360} height={70} fill="#b07a45" stroke={KC.ink} strokeWidth={8} />
          {[40, 140, 240, 330].map((px) => <rect key={px} x={px} y={770} width={26} height={160} fill="#8a5a2e" stroke={KC.ink} strokeWidth={6} />)}
          {/* red de mano que saca una medusa */}
          <g transform={`translate(${klerp(300, 520, red)} ${klerp(560, 960, Math.sin(red * Math.PI))}) rotate(${klerp(-20, 30, red)})`}>
            <line x1={-260} y1={-200} x2={0} y2={0} stroke="#8a5a2e" strokeWidth={14} strokeLinecap="round" />
            <ellipse cx={30} cy={20} rx={70} ry={30} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={6} />
            {red > 0.55 && <Medusa T={T} x={30} y={30} s={0.18} verde={0} azul={0} seed={9} n={10} />}
          </g>
          {/* tabla de corte: la orilla (órganos de luz) se separa como anillo */}
          {corte > 0 && <g opacity={kprog(T, K.Me + 2.6, K.Me + 3.0)}>
            <rect x={140} y={820} width={600} height={340} rx={30} fill="#e9d2a6" stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={440} cy={990} rx={210} ry={120} fill="rgba(210,235,255,.85)" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={440} cy={990} rx={150} ry={80} fill="rgba(235,248,255,.95)" stroke="rgba(0,0,0,.25)" strokeWidth={4} strokeDasharray="10 8" />
            <ellipse cx={440} cy={990 - 60 * kprog(T, K.Me + 4.4, K.Me + 5.2, kEase.sale)} rx={210} ry={120} fill="none" stroke={mixHex('#9fb4c8', '#7dff95', kprog(T, K.Me + 4.4, K.Me + 5.0))} strokeWidth={22} opacity={kprog(T, K.Me + 4.2, K.Me + 4.4)} />
            {(() => { const a = corte * Math.PI * 2 - Math.PI / 2; return <Tijeras x={440 + Math.cos(a) * 180} y={990 + Math.sin(a) * 104} abre={Math.abs(Math.sin(T * 14))} rot={(a * 180) / Math.PI + 90} s={0.8} />; })()}
          </g>}
        </GCapa>
      </Escena>
      {/* 2 · dos proteínas: aequorina (azul con calcio) y la proteína verde */}
      <Escena T={T} a={K.Pr} b={K.Fl} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <GCapa>
          {flashAz > 0 && <circle cx={300} cy={1000} r={260 * flashAz + 60} fill={GAZ} opacity={0.6 * flashAz} filter="url(#gfpBlur2)" />}
          <Frasco x={300} y={1000} s={1} liquido="#dfe6ff" brillo={flashAz} colorBrillo={GAZ} etiqueta="aequorina" />
          <Frasco x={780} y={1000} s={1} liquido="#e9f7d9" brillo={0.35 + 0.15 * Math.sin(T * 3)} colorBrillo={GV} etiqueta="proteína verde" />
          {gota < 1 && T > K.Pr + 0.4 && <g transform={`translate(300 ${klerp(560, 900, gota)})`}><path d="M 0 -30 Q 22 0 0 18 Q -22 0 0 -30 Z" fill="#e6f4ff" stroke={KC.ink} strokeWidth={5} /></g>}
          <text x={300} y={590} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Pr + 0.4, K.Pr + 0.7) * (1 - gota)}>Ca²⁺</text>
        </GCapa>
      </Escena>
      {/* 3 · fluorescencia: entra azul/UV, sale verde */}
      <Escena T={T} a={K.Fl} b={K.Di} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <GCapa>
          <Lampara x={170} y={620} rot={28} s={1} on={lampFl} largo={430} />
          <Onda T={T} x0={260} y0={680} x1={520} y1={900} color={GUV} p={entra} amp={14} ondas={5} />
          <Frasco x={600} y={1000} s={1.05} liquido="#e9f7d9" brillo={sale} colorBrillo={GV} etiqueta="GFP" />
          {[[-30, 0], [20, 1], [-75, 2]].map(([ang, i]) => { const a = (ang * Math.PI) / 180; return <Onda key={i} T={T} x0={700} y0={940} x1={700 + Math.cos(a) * 300} y1={940 + Math.sin(a) * 300} color={GV} p={kprog(T, K.Fl + 2.2 + i * 0.2, K.Fl + 3.2 + i * 0.2)} amp={12} ondas={4} />; })}
        </GCapa>
        <Etq T={T} at={K.Fl + 1.0} until={K.Di - 0.2} x={70} y={880} texto="entra azul / UV" tam={34} color="#cdb8ff" />
        <Etq T={T} at={K.Fl + 2.8} until={K.Di - 0.2} x={1010} y={560} texto="sale verde" lado="izq" tam={34} color={GV2} />
      </Escena>
      {/* 4 · bioluminiscencia vs. fluorescencia */}
      <Escena T={T} a={K.Di} b={K.Pd} zoom={0.03}>
        <GCapa>
          <rect x={0} y={0} width={540} height={KH} fill={KC.yellow} />
          <rect x={540} y={0} width={540} height={KH} fill="#141a2e" />
          <line x1={540} y1={0} x2={540} y2={KH} stroke={KC.ink} strokeWidth={10} />
          <Luciernaga T={T} x={250} y={930} s={1.2} luz={0.75 + 0.25 * Math.sin(T * 4)} />
          <Lampara x={650} y={720} rot={50} s={0.7} on={1 - apaga} largo={300} />
          <Frasco x={830} y={1010} s={0.85} liquido="#e9f7d9" brillo={1 - apaga} colorBrillo={GV} etiqueta="GFP" />
          <text x={270} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>hace su luz</text>
          <text x={810} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} opacity={kprog(T, K.Di + 1.9, K.Di + 2.2)}>sin luz, nada</text>
        </GCapa>
        <Etq T={T} at={K.Di + 0.3} until={K.Pd - 0.2} x={40} y={1460} texto="bioluminiscencia" tam={32} color={KC.ink} />
        <Etq T={T} at={K.Di + 0.3} until={K.Pd - 0.2} x={1050} y={1460} texto="fluorescencia" lado="izq" tam={32} color={GV2} />
      </Escena>
      {/* 5 · por dentro: 3 aminoácidos + oxígeno = la pieza que brilla */}
      <Escena T={T} a={K.Pd} b={K.Pg} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <GCapa><Frasco x={540} y={1050} s={0.9} liquido="#e9f7d9" brillo={0.5} colorBrillo={GV} /></GCapa>
        <Lupa T={T} at={K.Pd + 0.2} until={K.Pg - 0.1} x={540} y={790} r={290} fx={540} fy={1080} tinte={GV} etiqueta="AL MICROSCOPIO · la proteína"
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#07131a" />
            <Barril T={t} x={r} y={r + 10} s={1.05} color={GV} crom={crom} arma={arma} />
            {oxi > 0 && oxi < 1 && <g transform={`translate(${klerp(r * 2 + 40, r + 30, oxi)} ${klerp(60, r - 30, oxi)})`}>
              <circle r={30} fill="rgba(140,200,255,.25)" stroke="#bfe8ff" strokeWidth={4} />
              <text y={11} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#bfe8ff">O₂</text></g>}
          </svg>} />
      </Escena>
      {/* 6 · re-gancho: ¿para qué en un laboratorio? */}
      <Escena T={T} a={K.Pg} b={K.Tr} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        <GCapa>
          <rect x={0} y={1180} width={KW} height={60} fill="#c98a4a" stroke={KC.ink} strokeWidth={8} />
          <Frasco x={560} y={980} s={1.05} liquido="#bfe0ff" />
          <Medusa T={T} x={560} y={960} s={0.32} verde={0.9} azul={0} seed={7} n={12} />
          <text x={860} y={900} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 7} 860 780)`}>?</text>
        </GCapa>
      </Escena>
      {/* 7 · el truco: gen de la proteína X + gen de GFP → la célula la fabrica y se ve dónde */}
      <Escena T={T} a={K.Tr} b={K.Es} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <GCapa>
          <Celula T={T} x={540} y={990} s={1.05} marca={marca} gen={mete} />
          {mete < 1 && <g opacity={1 - mete} transform={`translate(${klerp(540, 500, mete)} ${klerp(500, 1000, mete)}) scale(${1 - mete * 0.7}) translate(-540 -500)`}>
            <Gen x={klerp(60, 150, pega)} y={560} w={420} color={KC.pink} texto="gen de la proteína X" />
            <Gen x={klerp(720, 570, pega)} y={560} w={200} color={GV} texto="gen GFP" />
          </g>}
        </GCapa>
        <Etq T={T} at={K.Tr + 3.0} until={K.Es - 0.2} x={60} y={1440} texto="verde = ahí está la proteína X" tam={32} color={GV2} />
      </Escena>
      {/* 8 · 1994: el gusano de Chalfie, 6 neuronas del tacto */}
      <Escena T={T} a={K.Es} b={K.Vi} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:540 - 470, top:930 - 400, width:940, height:800, borderRadius:'50%', background:'radial-gradient(circle, #0f1a24 0%, #05080c 78%)', border:`14px solid ${KC.ink}`, boxShadow:'0 0 0 10px #9aa3b5' }}></div>
        <GCapa>
          <Gusano T={T} x0={150} x1={930} y0={930} A={55} ancho={50} on={neus} />
        </GCapa>
        <Escala T={T} z={1} pxPorMm={780} x={60} y={1610} objetivo={200} color={KC.ink} />
        <Contador T={T} at={K.Es + 2.6} desde={0} hasta={6} dur={2.4} x={540} y={1450} tam={64} color={GV2} sufijo=" de 6 neuronas" />
      </Escena>
      {/* 9 · vivo: dónde y cuándo, sin matar células */}
      <Escena T={T} a={K.Vi} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <GCapa>
          <ellipse cx={300} cy={930} rx={290} ry={290} fill="#f1d27a" stroke={KC.ink} strokeWidth={10} />
          <ellipse cx={300} cy={930} rx={250} ry={250} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={6} />
          <Gusano T={T} x0={110} x1={490} y0={930} A={36} ancho={28} on={[1, 1, 1, 1, 1, 1]} fondoClaro />
          <g transform="translate(300 600)"><circle r={56} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <line x1={0} y1={0} x2={0} y2={-38} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
            <line x1={0} y1={0} x2={Math.sin(T * 4) * 32} y2={-Math.cos(T * 4) * 32} stroke={KC.red} strokeWidth={6} strokeLinecap="round" /></g>
        </GCapa>
        <Escala T={T} z={1} pxPorMm={380} x={110} y={1430} objetivo={160} color={KC.ink} />
      </Escena>
      {/* 10 · Tsien: nuevos colores */}
      <Escena T={T} a={K.Co} b={K.No} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <GCapa>
          {[[180, GV], [420, GAZ], [660, GCIAN], [900, GAMA]].map(([bx, c], i) => <g key={i}>
            <Barril T={T + i} x={bx} y={900 + Math.sin(T * 2 + i) * 12} s={0.62} color={i === 0 ? GV : mixHex(GV, c, muta(i))} crom={1} arma={1} />
            {i > 0 && muta(i) > 0 && muta(i) < 1 && <circle cx={bx} cy={900} r={40 + 120 * muta(i)} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - muta(i)} />}
            <text x={bx} y={1130} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={i === 0 ? 1 : muta(i)}>{['verde', 'azul', 'cian', 'amarillo'][i]}</text>
          </g>)}
        </GCapa>
        <Etq T={T} at={K.Co + 0.2} until={K.No - 0.2} x={60} y={600} texto="Roger Tsien" tam={40} color={KC.ink} />
      </Escena>
      {/* 11 · Nobel de Química 2008 */}
      <Escena T={T} a={K.No} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <GCapa><Medalla T={T} x={420} y={960} s={kprog(T, K.No, K.No + 0.5, kEase.rebote)} /></GCapa>
      </Escena>
      {/* 12 · cierre: la misma medusa, con su verde "prestado" a la ciencia */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="45% 50%">
        <GCapa>
          <rect width={KW} height={KH} fill="url(#gfpMar)" />
          <Medusa T={T} x={430} y={930} s={1.15} verde={1} azul={0.35} seed={2} />
          <g opacity={kprog(T, K.Ci + 0.8, K.Ci + 1.6)}>
            {[[GV, 0], [GAZ, 1], [GCIAN, 2], [GAMA, 3]].map(([c, i]) => { const a = T * 0.6 + (i * Math.PI) / 2; return <Barril key={i} T={T} x={430 + Math.cos(a) * 380} y={1020 + Math.sin(a) * 120} s={0.28} color={c} crom={1} arma={1} />; })}
          </g>
          <g opacity={kprog(T, K.Ci + 1.4, K.Ci + 2.2)}><Gusano T={T} x0={560} x1={1000} y0={1160} A={22} ancho={22} on={[1, 1, 1, 1, 1, 1]} /></g>
        </GCapa>
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.6} until={K.Me - 0.3} x={60} y={1440} texto="Aequorea victoria" it tam={36} color={KC.texto} />
      <Chip T={T} at={K.G + 2.4} until={K.Me - 0.2} texto="energía azul → luz verde" y={1530} tam={40} borde={GV} />
      <NumeroGigante T={T} at={K.Me + 0.5} until={K.Me + 2.5} valor={10000} dur={1.5} prefijo="≈ " etiqueta="medusas · verano de 1961" x={400} y={500} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Me + 0.4} until={K.Pr - 0.2} texto="Friday Harbor · Washington, EE. UU." y={1520} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Me + 3.2} until={K.Pr - 0.3} x={170} y={1190} texto="la orilla: órganos de luz" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Fl + 0.6} until={K.Di - 0.2} texto="fluorescencia" y={1520} tam={46} borde={GV} />
      <MitoTachado T={T} at={K.Di + 0.3} tacharEn={K.Di + 2.0} until={K.Pd - 0.2} texto="la GFP brilla sola" x={300} y={470} tam={40} />
      <Chip T={T} at={K.Pd + 0.6} until={K.Pd + 2.8} texto="238 aminoácidos" y={1520} tam={42} borde={GV} />
      <Chip T={T} at={K.Pd + 3.0} until={K.Pg - 0.2} texto="3 aminoácidos + O₂ = la pieza que brilla" y={1520} tam={32} borde={GV} />
      <TarjetaEstudio T={T} at={K.Es + 0.15} until={K.Es + 2.35} anio="1994" quien="Chalfie et al. · Columbia" revista="Science 263: 802" x={540} y={560} />
      <Etq T={T} at={K.Es + 2.6} until={K.Vi - 0.2} x={60} y={1550} texto="Caenorhabditis elegans · ~1 mm" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Vi + 0.5} until={K.Co - 0.2} texto="animal vivo ✓" x={300} y={1580} tam={42} borde={GV} />
      <Chip T={T} at={K.Co + 1.6} until={K.No - 0.2} texto="azul · cian · amarillo" y={1520} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.No + 0.6} until={K.Ci - 0.2} texto="Shimomura · Chalfie · Tsien" y={1520} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="su verde: para ver células vivas" y={1520} tam={38} borde={GV} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Me - 0.1} texto="No es luz verde: *es energía azul.*" />
      <Subtitulo T={T} idx={1} at={K.Me + 0.1} until={K.Pr - 0.1} texto="1961: *diez mil medusas.*" />
      <Subtitulo T={T} idx={2} at={K.Pr + 0.1} until={K.Fl - 0.1} texto="Una azul… *y una verde.*" />
      <Subtitulo T={T} idx={3} at={K.Fl + 0.1} until={K.Di - 0.1} texto="Absorbe azul, *devuelve verde.*" />
      <Subtitulo T={T} idx={4} at={K.Di + 0.1} until={K.Pd - 0.1} texto="Sin luz, *no brilla.*" />
      <Subtitulo T={T} idx={5} at={K.Pd + 0.1} until={K.Pg - 0.1} texto="Tres aminoácidos *+ oxígeno.*" />
      <Subtitulo T={T} idx={6} at={K.Pg + 0.1} until={K.Tr - 0.1} texto="¿Y para qué *sirve?*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Es - 0.1} texto="Pegas su gen: *se prende verde.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Vi - 0.1} texto="1994: *seis neuronas verdes.*" />
      <Subtitulo T={T} idx={9} at={K.Vi + 0.1} until={K.Co - 0.1} texto="Sin matar *células.*" />
      <Subtitulo T={T} idx={10} at={K.Co + 0.1} until={K.No - 0.1} texto="Azul, cian *y amarillo.*" />
      <Subtitulo T={T} idx={11} at={K.No + 0.1} until={K.Ci - 0.1} texto="Nobel de Química *2008.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Su verde, *para ver la vida.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Medusa + 2.7, CUES.Proteinas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Proteinas + 1.3, CUES.Proteinas + 3.9, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Diferencia + 0.2, CUES.PorDentro - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Truco - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Estudio + 2.5, CUES.Vivas - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Vivas + 0.1, CUES.Colores - 0.2, 'avatar_02_apuntando_camara', 'grande'],
        [CUES.Nobel + 0.15, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="46" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GfpApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gfp /></CompositionStage></div>;
}
window.GfpApp = GfpApp;
