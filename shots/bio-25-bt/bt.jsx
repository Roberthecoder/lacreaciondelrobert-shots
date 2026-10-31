// Shot Biotecnológico #25 · El maíz que fabrica su propio insecticida (maíz Bt) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala.
const VERDE = '#3fbf4a', VERDE2 = '#2b8f3a', VERDE_CL = '#8fe07a', CRY = '#F4C25A', TIERRA = '#7a5230', TIERRA2 = '#5e3d22';
const ORUGA = '#7d8a4e', ORUGA2 = '#55603a', CABEZA = '#3a2a1a', ALCA = '#6b4dff', ACIDO = '#ff6b2f';

// Capa SVG de pantalla completa.
function SvgBt({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Texto chico "esquema · sin escala" para las escenas al microscopio.
function SinEscala({ x = 60, y = 1440, color = 'rgba(246,243,236,.75)' }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, font:`700 26px ${KF.mono}`, color, textShadow:'0 2px 0 rgba(0,0,0,.7)', letterSpacing:1 }}>esquema · sin escala</div>;
}

// Puntos de una hoja de maíz (lámina larga en forma de cinta que se arquea). Devuelve { borde, centro(u), normal(u), ancho(u) }.
function hojaGeo(L, W, curva, T, seed) {
  const sway = mece(T, seed, 0.5) * 0.06;
  const P0 = [0, 0], P1 = [L * 0.5, -L * (0.42 + sway) * curva], P2 = [L, -L * (0.05 - sway * 2) * curva + L * 0.25 * Math.max(0, curva - 0.6)];
  const C = (u) => [(1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]];
  const D = (u) => [2 * (1 - u) * (P1[0] - P0[0]) + 2 * u * (P2[0] - P1[0]), 2 * (1 - u) * (P1[1] - P0[1]) + 2 * u * (P2[1] - P1[1])];
  const N = (u) => { const d = D(u), m = Math.hypot(d[0], d[1]) || 1; return [-d[1] / m, d[0] / m]; };
  const A = (u) => W * Math.pow(Math.sin(Math.PI * Math.min(u * 0.92 + 0.08, 1)), 0.55) * (1 - u * 0.35) * 0.5;
  const n = 26, up = [], dn = [];
  for (let i = 0; i <= n; i++) { const u = i / n, c = C(u), nn = N(u), a = A(u); up.push([c[0] + nn[0] * a, c[1] + nn[1] * a]); dn.push([c[0] - nn[0] * a, c[1] - nn[1] * a]); }
  const borde = 'M ' + up.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' L ' + dn.reverse().map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return { borde, C, N, A };
}
// Hoja de maíz. cry 0..1: se encienden las proteínas (puntitos dorados) adentro. mordidas: [[u, lado(1|-1), r]] mordiscos en el borde.
function HojaMaiz({ T = 0, x, y, L = 600, W = 90, rot = 0, curva = 1, cry = 0, mordidas = [], seed = 1, color = VERDE, id = 'h' }) {
  const g = hojaGeo(L, W, curva, T, seed);
  const venas = [-0.55, -0.28, 0.28, 0.55].map((k) => 'M ' + Array.from({ length: 22 }, (_, i) => { const u = 0.04 + (i / 21) * 0.9, c = g.C(u), nn = g.N(u), a = g.A(u) * k; return `${(c[0] + nn[0] * a).toFixed(1)} ${(c[1] + nn[1] * a).toFixed(1)}`; }).join(' L '));
  const R = krng(seed * 7 + 3), puntos = Array.from({ length: 34 }, () => [0.06 + R() * 0.86, (R() - 0.5) * 1.5, R()]);
  const mid = 'M ' + Array.from({ length: 22 }, (_, i) => { const c = g.C(i / 21 * 0.96); return `${c[0].toFixed(1)} ${c[1].toFixed(1)}`; }).join(' L ');
  const mk = `bt-mk-${id}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {mordidas.length > 0 && <defs><mask id={mk} maskUnits="userSpaceOnUse" x={-L} y={-L} width={L * 3} height={L * 3}>
      <rect x={-L} y={-L} width={L * 3} height={L * 3} fill="#fff" />
      {mordidas.map(([u, lado, r], i) => { const c = g.C(u), nn = g.N(u), a = g.A(u); return <circle key={i} cx={c[0] + nn[0] * a * lado} cy={c[1] + nn[1] * a * lado} r={r} fill="#000" />; })}
    </mask></defs>}
    <g mask={mordidas.length ? `url(#${mk})` : undefined}>
      <path d={g.borde} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {venas.map((d, i) => <path key={i} d={d} stroke={VERDE2} strokeWidth={3} fill="none" opacity=".55" />)}
      <path d={mid} stroke={VERDE_CL} strokeWidth={6} fill="none" strokeLinecap="round" opacity=".9" />
      {cry > 0 && puntos.map(([u, k, d], i) => { const on = kprog(cry, d * 0.8, d * 0.8 + 0.2); if (on <= 0) return null; const c = g.C(u), nn = g.N(u), a = g.A(u) * k * 0.6;
        return <circle key={i} cx={c[0] + nn[0] * a} cy={c[1] + nn[1] * a} r={(5 + 3 * Math.sin(T * 5 + i)) * on} fill={CRY} stroke={KC.ink} strokeWidth={2} />; })}
    </g>
  </g>;
}
// Planta de maíz completa: tallo con nudos, hojas alternas, espiga arriba y un elote con sus cabellitos.
function PlantaMaiz({ T = 0, x, y, s = 1, cry = 0, seed = 1, elote = true, id = 'p', color = VERDE }) {
  const alto = 1150, nudos = [0.12, 0.27, 0.42, 0.56, 0.69, 0.8];
  const sw = mece(T, seed, 0.4) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sw * 0.3})`}>
    {/* espiga (flor masculina) */}
    <g transform={`translate(0 ${-alto})`}>
      {[-35, -15, 0, 18, 38].map((a, i) => <path key={i} d={`M 0 0 q ${a * 1.2} -60 ${a * 2.4} -150`} stroke="#d9b54a" strokeWidth={10} fill="none" strokeLinecap="round" />)}
      {[-35, -15, 0, 18, 38].map((a, i) => <path key={'b' + i} d={`M 0 0 q ${a * 1.2} -60 ${a * 2.4} -150`} stroke="#f2d47a" strokeWidth={4} fill="none" strokeDasharray="6 8" strokeLinecap="round" />)}
    </g>
    <path d={`M -16 0 L -12 ${-alto} L 12 ${-alto} L 16 0 Z`} fill={VERDE2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {nudos.map((u, i) => <line key={i} x1={-17} x2={17} y1={-alto * u} y2={-alto * u} stroke={KC.ink} strokeWidth={5} />)}
    {nudos.map((u, i) => { const lado = i % 2 ? 1 : -1, L = 520 - i * 50;
      return <g key={'h' + i} transform={`translate(0 ${-alto * u}) scale(${lado} 1)`}><HojaMaiz T={T} x={6} y={0} L={L} W={80 - i * 5} rot={-28 + i * 3} curva={1.05} cry={cry} seed={seed * 10 + i} id={`${id}${i}`} color={color} /></g>; })}
    {elote && <g transform={`translate(10 ${-alto * 0.5}) rotate(28)`}>
      <ellipse cx={40} cy={-60} rx={34} ry={92} fill="#f7d65a" stroke={KC.ink} strokeWidth={7} />
      <path d="M 10 30 Q -20 -60 30 -150 Q 30 -60 60 30 Z" fill={VERDE_CL} stroke={KC.ink} strokeWidth={6} />
      <path d="M 70 30 Q 100 -60 50 -150 Q 60 -60 20 30 Z" fill={VERDE} stroke={KC.ink} strokeWidth={6} opacity=".95" />
      {[-8, 0, 8].map((d, i) => <path key={i} d={`M ${45 + d} -150 q ${10 + d} -40 ${30 + d * 2} -60`} stroke="#c2703d" strokeWidth={4} fill="none" strokeLinecap="round" />)}
    </g>}
  </g>;
}
// Gusano cogollero (*Spodoptera frugiperda*), larva esquemática: cabeza oscura con la "Y" clara, 3 pares de patas, falsas patas y
// los cuatro puntos oscuros en cuadro del penúltimo segmento. (x, y) = cabeza. mastica 0..1 mueve las mandíbulas.
function Cogollero({ T = 0, x, y, s = 1, rot = 0, onda = 1, mastica = 0, flip = false, seed = 1, muerta = 0 }) {
  const n = 11, seg = 34;
  const pts = Array.from({ length: n }, (_, i) => [i * seg, Math.sin(T * 3 * onda + i * 0.7 + seed) * 6 * onda * (1 - muerta) + muerta * Math.pow(i / n, 2) * 40]);
  const col = mixHex(ORUGA, '#8a8f99', muerta * 0.7);
  const m = Math.sin(T * 16) * 5 * mastica;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>
    {pts.slice(3, 7).concat([pts[n - 1]]).map(([px, py], i) => <rect key={'f' + i} x={px - 7} y={py + 16} width={14} height={16} rx={6} fill={ORUGA2} stroke={KC.ink} strokeWidth={4} />)}
    {pts.slice(1, 4).map(([px, py], i) => <path key={'p' + i} d={`M ${px} ${py + 16} l -6 16`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}
    {pts.slice().reverse().map(([px, py], j) => { const i = n - 1 - j; if (i === 0) return null;
      return <circle key={i} cx={px} cy={py} r={i === 1 ? 22 : 25 - Math.max(0, i - 8) * 2} fill={col} stroke={KC.ink} strokeWidth={6} />; })}
    {pts.slice(1).map(([px, py], i) => <path key={'r' + i} d={`M ${px - 14} ${py - 6} Q ${px} ${py - 12} ${px + 14} ${py - 6}`} stroke="#d7d0a0" strokeWidth={4} fill="none" opacity=".8" />)}
    {pts.slice(2, n - 1).map(([px, py], i) => <circle key={'d' + i} cx={px} cy={py + 4} r={3.5} fill={KC.ink} opacity=".7" />)}
    {(() => { const [px, py] = pts[n - 2]; return [[-7, -8], [7, -8], [-9, 6], [9, 6]].map(([a, b], i) => <circle key={'q' + i} cx={px + a} cy={py + b} r={5} fill={KC.ink} />); })()}
    <g transform={`translate(${pts[0][0] - 6} ${pts[0][1]})`}>
      <path d={`M -14 10 l -14 ${4 + m} M -14 16 l -12 ${12 - m}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
      <circle r={24} fill={CABEZA} stroke={KC.ink} strokeWidth={6} />
      <path d="M -4 14 L 2 0 L -6 -14 M 2 0 L 12 -12" stroke="#f1e6c8" strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={-12} cy={2} r={3} fill="#f1e6c8" />
    </g>
  </g>;
}
// Bacillus thuringiensis en esporulación: bastón con su espora y su cristal de proteína (bipiramidal, en rombo).
function BtCelula({ T = 0, x, y, s = 1, rot = 0, cristal = 1, brilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Bacteria T={T} x={0} y={0} largo={360} ancho={120} rot={rot} color="#9fd6c2" flagelo={false} nucleoide={false} seed={4}
      adentro={(L, W) => <g>
        <ellipse cx={L * 0.24} cy={0} rx={W * 0.42} ry={W * 0.3} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
        <ellipse cx={L * 0.24} cy={-6} rx={W * 0.2} ry={W * 0.1} fill="#fff" opacity=".7" />
        <g transform={`translate(${-L * 0.12} 0) scale(${0.4 + 0.6 * cristal})`} opacity={cristal}>
          {brilla > 0 && <circle r={60} fill={CRY} opacity={0.35 * brilla * (0.7 + 0.3 * Math.sin(T * 6))} />}
          <path d={`M -64 0 L 0 -36 L 64 0 L 0 36 Z`} fill={CRY} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -64 0 L 64 0 M 0 -36 L 0 36" stroke={KC.ink} strokeWidth={2.5} opacity=".5" />
        </g>
      </g>} />
  </g>;
}
// Proteína Cry: protoxina (cápsula larga, opaca) que al activarse se corta y queda la "llave" dorada brillante.
function Cry({ T = 0, x, y, s = 1, rot = 0, activa = 0, rota = 0, o = 1 }) {
  if (rota > 0) return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o * (1 - kprog(rota, 0.6, 1))}>
    {[[-30, -8], [0, 10], [28, -6], [10, -20]].map(([a, b], i) => <rect key={i} x={a * (1 + rota * 2) - 9} y={b * (1 + rota * 2) - 6} width={18} height={12} rx={5} fill={CRY} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 50 + rota * 120} ${a} ${b})`} />)}
  </g>;
  const corta = kprog(activa, 0, 0.6), brilla = kprog(activa, 0.5, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {corta < 1 && <rect x={22 + corta * 30} y={-14} width={46} height={28} rx={14} fill="#b8a07a" stroke={KC.ink} strokeWidth={4} opacity={1 - corta} />}
    {brilla > 0 && <circle r={42} fill={CRY} opacity={0.3 * brilla * (0.7 + 0.3 * Math.sin(T * 7))} />}
    <rect x={-40} y={-16} width={64} height={32} rx={16} fill={mixHex('#c9b27a', CRY, brilla)} stroke={KC.ink} strokeWidth={4} />
    <path d="M 24 -8 L 34 -8 L 34 -2 L 40 -2 M 24 8 L 34 8" stroke={KC.ink} strokeWidth={4} fill="none" opacity={brilla} />
  </g>;
}
// Receptor de la pared del intestino de la oruga: una "cerradura" en la membrana.
function Receptor({ x, y, s = 1, ocupado = 0, color = KC.cyan, redondo = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-58} width={60} height={64} rx={redondo ? 30 : 12} fill={color} stroke={KC.ink} strokeWidth={5} />
    {redondo ? <circle cx={0} cy={-26} r={10} fill={KC.ink} /> : <path d="M 0 -42 a 10 10 0 1 1 -0.1 0 Z M -6 -30 L 6 -30 L 9 -8 L -9 -8 Z" fill={KC.ink} />}
    {ocupado > 0 && <circle cx={0} cy={-30} r={40 * ocupado} fill="none" stroke={CRY} strokeWidth={5} opacity={1 - ocupado * 0.4} />}
  </g>;
}
// Mochila aspersora con la etiqueta "Bt".
function Aspersor({ T, x, y, s = 1, rocia = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-200} width={160} height={240} rx={40} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <rect x={-40} y={-230} width={80} height={36} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-50} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={4}>Bt</text>
    <path d="M 80 -20 Q 180 0 230 -60 L 360 -110" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    {rocia > 0 && Array.from({ length: 16 }, (_, i) => { const u = ((T * 1.4 + i / 16) % 1); return <circle key={i} cx={370 + u * 220} cy={-110 + u * (40 + (i % 5) * 30)} r={6 + (i % 3) * 3} fill="#bfe8ff" stroke={KC.ink} strokeWidth={2} opacity={rocia * (1 - u)} />; })}
  </g>;
}
// Lechuga / col vista de frente para el huerto orgánico.
function Lechuga({ x, y, s = 1, T = 0, seed = 1 }) {
  const w = mece(T, seed, 0.6) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${w})`}>
    {[-50, -20, 20, 50].map((d, i) => <ellipse key={i} cx={d} cy={-30} rx={46} ry={56} fill={i % 2 ? '#7ed957' : '#5fc24a'} stroke={KC.ink} strokeWidth={6} />)}
    <ellipse cx={0} cy={-50} rx={52} ry={48} fill="#a9ee7c" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Isla de Puerto Rico (contorno esquemático).
function IslaPR({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -20 Q -310 -60 -250 -70 L -120 -78 Q 0 -86 140 -74 L 270 -64 Q 320 -50 300 -10 Q 290 30 230 44 L 80 60 Q -40 70 -170 58 L -270 40 Q -300 20 -300 -20 Z" fill="#bfe3b4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={10} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Puerto Rico</text>
  </g>;
}
// Mazorca de maíz nativo (para la milpa mexicana): color de grano libre.
function Mazorca({ x, y, s = 1, rot = 0, color = '#f7d65a' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={30} ry={78} fill={color} stroke={KC.ink} strokeWidth={6} />
    {[-50, -25, 0, 25, 50].map((d, i) => <line key={i} x1={-26} x2={26} y1={d} y2={d} stroke={KC.ink} strokeWidth={2.5} opacity=".4" />)}
    {[-12, 12].map((d, i) => <line key={'v' + i} x1={d} x2={d} y1={-70} y2={70} stroke={KC.ink} strokeWidth={2.5} opacity=".4" />)}
    <path d="M -10 70 Q -50 20 -36 -40 Q -20 30 6 74 Z" fill={VERDE_CL} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Costal de semilla.
function Costal({ x, y, s = 1, texto = 'semilla', tachado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -120 Q -130 -150 -90 -160 L 90 -160 Q 130 -150 110 -120 Q 140 40 100 110 L -100 110 Q -140 40 -110 -120 Z" fill="#e3c99a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 -130 Q 0 -110 90 -130" stroke={KC.ink} strokeWidth={5} fill="none" />
    <text x={0} y={0} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {tachado > 0 && <g opacity={tachado}><circle r={170} fill="none" stroke={KC.red} strokeWidth={18} /><line x1={-120} y1={-120} x2={120} y2={120} stroke={KC.red} strokeWidth={18} strokeLinecap="round" /></g>}
  </g>;
}
// Estómago humano (bolsa en forma de frijol) con burbujas de ácido.
function Estomago({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -220 Q -40 -150 -120 -60 Q -200 60 -100 170 Q 20 270 160 160 Q 220 100 170 20 Q 140 -40 60 -10 Q 0 10 -10 -120 L -20 -220 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -95 100 Q 20 200 140 120" stroke="#e46a7a" strokeWidth={8} fill="none" />
    {Array.from({ length: 9 }, (_, i) => { const u = (T * 0.5 + i / 9) % 1; return <circle key={i} cx={-80 + (i * 37) % 200} cy={150 - u * 160} r={7 + (i % 3) * 3} fill={ACIDO} opacity={0.75 * (1 - u)} stroke={KC.ink} strokeWidth={2} />; })}
  </g>;
}

// Interior del intestino de la oruga (para la Lupa): tubo con pared de células y luz alcalina.
function IntestinoOruga({ T, r, a0 }) {
  const D = r * 2, t = T - a0;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#120c2e" />
    <rect y={D * 0.22} width={D} height={D * 0.56} fill={ALCA} opacity={0.18 + 0.2 * kprog(T, a0 + 0.6, a0 + 2.0)} />
    {[0, 1].map((k) => <g key={k}>{Array.from({ length: 7 }, (_, i) => { const cx = i * (D / 6), cy = k ? D * 0.86 : D * 0.14;
      return <g key={i}><rect x={cx - D / 14} y={cy - D * 0.08} width={D / 7 - 6} height={D * 0.16} rx={10} fill="#ff9fb5" stroke={KC.ink} strokeWidth={4} />
        <circle cx={cx - 2} cy={cy} r={9} fill="#b8407a" /></g>; })}</g>)}
    {Array.from({ length: 6 }, (_, i) => { const xx = ((t * 70 + i * D / 5) % (D + 120)) - 60, yy = D * (0.36 + (i % 3) * 0.14) + Math.sin(T * 2 + i) * 8, act = kprog(T, a0 + 1.2 + i * 0.3, a0 + 2.6 + i * 0.3);
      return <g key={i}>
        {act < 0.5 && <path d={`M ${xx - 34} ${yy} L ${xx} ${yy - 20} L ${xx + 34} ${yy} L ${xx} ${yy + 20} Z`} fill={CRY} stroke={KC.ink} strokeWidth={4} opacity={1 - act * 2} transform={`scale(1)`} />}
        {act >= 0.3 && <Cry T={T} x={xx} y={yy} s={0.9} activa={kprog(act, 0.3, 1)} rot={Math.sin(T + i) * 10} />}
      </g>; })}
  </svg>;
}
// Interior de la hoja (para la Lupa): células vegetales con cloroplastos donde se encienden las proteínas Cry.
function CelulasHoja({ T, r, a0 }) {
  const D = r * 2, cols = 5, filas = 5, w = D / cols, h = D / filas;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#0f2a16" />
    {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), x0 = c * w + (f % 2) * w * 0.3 - w * 0.15, y0 = f * h, on = kprog(T, a0 + 1.0 + ((i * 7) % 11) * 0.12, a0 + 1.4 + ((i * 7) % 11) * 0.12);
      return <g key={i}>
        <rect x={x0 + 4} y={y0 + 4} width={w - 8} height={h - 8} rx={14} fill="#5fc24a" stroke="#d8ffd0" strokeWidth={4} />
        {[[0.3, 0.3], [0.7, 0.35], [0.4, 0.72], [0.75, 0.7]].map(([a, b], j) => <ellipse key={j} cx={x0 + w * a} cy={y0 + h * b} rx={9} ry={6} fill="#1f7a2e" />)}
        {on > 0 && <rect x={x0 + w * 0.36} y={y0 + h * 0.42} width={w * 0.3 * on} height={h * 0.16} rx={8} fill={CRY} stroke={KC.ink} strokeWidth={3} />}
      </g>; })}
  </svg>;
}
// Interior del suelo (para la Lupa): Bt con su espora y su cristal entre granos de tierra.
function SueloMicro({ T, r, a0 }) {
  const D = r * 2;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#2a1a0e" />
    {[[60, 80, 50], [420, 70, 60], [80, 430, 70], [440, 420, 55], [260, 470, 40], [470, 250, 36]].map(([a, b, rr], i) => <circle key={i} cx={a} cy={b} r={rr} fill="#7a5230" stroke="#3b2513" strokeWidth={5} />)}
    <BtCelula T={T} x={D / 2} y={D / 2} s={1.05} rot={-12} cristal={1} brilla={kprog(T, a0 + 1.2, a0 + 2.0)} />
  </svg>;
}

function Bt() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ge: CUES.Gen, C: CUES.Cry, Mo: CUES.Mordida, Pr: CUES.Pregunta, Al: CUES.Alcalino, Re: CUES.Receptor, Tu: CUES.Tu, Or: CUES.Organico, Es: CUES.Estudio, Mx: CUES.Mexico, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mordG = Math.floor(kclamp((T - K.G) / 0.9, 0, 4));             // mordiscos en la hoja del gancho
  const mordidas = [[0.62, 1, 26], [0.68, 1, 22], [0.74, 1, 24], [0.79, 1, 20]].slice(0, mordG + 1);
  const PR = K.Es + 3.0, P2010 = K.Es + 6.0;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la milpa y la hoja con el cogollero mordiendo */}
      <Escena T={T} a={K.G} b={K.Ge} zoom={0.06} origen="60% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgBt>
          <rect x={0} y={1700} width={KW} height={220} fill={TIERRA} stroke={KC.ink} strokeWidth={8} />
          <PlantaMaiz T={T} x={250} y={1720} s={1.05} seed={2} id="g1" />
          <PlantaMaiz T={T} x={930} y={1740} s={0.8} seed={5} id="g2" elote={false} />
          <HojaMaiz T={T} x={90} y={1120} L={980} W={150} rot={-8} curva={0.55} seed={9} mordidas={mordidas} id="gh" />
          <Cogollero T={T} x={700} y={1000} s={1.3} rot={8} mastica={1} />
        </SvgBt>
      </Escena>
      {/* 1 · el gen viene de una bacteria del suelo */}
      <Escena T={T} a={K.Ge} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgBt>
          <rect x={0} y={760} width={KW} height={1160} fill={TIERRA} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 137) % KW} cy={800 + ((i * 91) % 1100)} r={8 + (i % 5) * 4} fill={TIERRA2} />)}
          {[-60, -20, 25, 60].map((d, i) => <path key={i} d={`M 540 760 q ${d} 80 ${d * 2.2} 200`} stroke="#e9d9b0" strokeWidth={7} fill="none" strokeLinecap="round" />)}
          <PlantaMaiz T={T} x={540} y={770} s={0.55} seed={3} id="ge" elote={false} />
          {T > K.Ge + 2.0 && <g transform={`translate(${klerp(800, 520, kprog(T, K.Ge + 2.0, K.C, kEase.suave))} ${klerp(1450, 820, kprog(T, K.Ge + 2.0, K.C, kEase.suave))}) rotate(-60)`}>
            <ADNHebra T={T} x={-150} y={0} largo={300} alto={46} vueltas={2} resalta={(u) => u > 0.3 && u < 0.7} /></g>}
        </SvgBt>
        <Lupa T={T} at={K.Ge + 0.4} until={K.C - 0.3} x={520} y={860} r={240} fx={800} fy={1500} tinte={KC.mint}
          etiqueta="AL MICROSCOPIO · suelo" interior={(T, r) => <SueloMicro T={T} r={r} a0={K.Ge + 0.4} />} />
      </Escena>
      {/* 2 · la planta hace las proteínas Cry en sus hojas */}
      <Escena T={T} a={K.C} b={K.Mo} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgBt>
          <HojaMaiz T={T} x={60} y={1500} L={1000} W={170} rot={-14} curva={0.5} seed={11} cry={kprog(T, K.C + 1.2, K.C + 3.6)} id="ch" />
          <g transform={`translate(${klerp(-200, 240, kprog(T, K.C, K.C + 1.2, kEase.sale))} 1340) rotate(-14)`}><ADNHebra T={T} x={-150} y={0} largo={300} alto={40} vueltas={2} resalta={(u) => u > 0.3 && u < 0.7} /></g>
        </SvgBt>
        <Lupa T={T} at={K.C + 0.8} until={K.Mo - 0.3} x={500} y={820} r={240} fx={620} fy={1330} tinte={KC.gold2}
          etiqueta="POR DENTRO · células de la hoja" interior={(T, r) => <CelulasHoja T={T} r={r} a0={K.C + 0.8} />} />
      </Escena>
      {/* 3 · el cogollero muerde y se las traga */}
      <Escena T={T} a={K.Mo} b={K.Pr} zoom={0.08} origen="55% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgBt>
          <HojaMaiz T={T} x={-60} y={1180} L={1200} W={260} rot={-6} curva={0.35} seed={12} cry={1} mordidas={[[0.52, 1, 50], [0.6, 1, 44], [0.67, 1, 40]].slice(0, 1 + Math.floor(kclamp((T - K.Mo) / 1.1, 0, 2)))} id="mh" />
          <Cogollero T={T} x={560} y={930} s={2.2} rot={12} mastica={1} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Mo) * 0.9 + i / 6) % 1; return T > K.Mo + 0.4 ? <circle key={i} cx={klerp(560, 480, u)} cy={klerp(1050, 940, u)} r={9 * (1 - u * 0.5)} fill={CRY} stroke={KC.ink} strokeWidth={3} opacity={1 - u} /> : null; })}
        </SvgBt>
      </Escena>
      {/* 4 · re-gancho: ¿por qué a la oruga sí y a ti no? */}
      <Escena T={T} a={K.Pr} b={K.Al} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgBt>
          <Cogollero T={T} x={160} y={1000} s={1.5} rot={-4} />
          <text x={300} y={860} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 760)`}>?</text>
          <Mazorca x={540} y={1560} s={1.4} rot={70} />
        </SvgBt>
      </Escena>
      {/* 5 · por dentro: intestino alcalino de la oruga */}
      <Escena T={T} a={K.Al} b={K.Re} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgBt>
          <Cogollero T={T} x={150} y={1640} s={2.1} rot={-2} />
          <ellipse cx={560} cy={1640} rx={300} ry={26} fill="none" stroke={ALCA} strokeWidth={6} strokeDasharray="12 10" opacity={kprog(T, K.Al + 0.3, K.Al + 0.8)} />
        </SvgBt>
        <Lupa T={T} at={K.Al + 0.2} until={K.Re - 0.25} x={520} y={820} r={260} fx={560} fy={1640} tinte={ALCA}
          etiqueta="POR DENTRO · intestino de la oruga" interior={(T, r) => <IntestinoOruga T={T} r={r} a0={K.Al + 0.2} />} />
      </Escena>
      {/* 6 · receptores: llave en cerradura y poros */}
      <Escena T={T} a={K.Re} b={K.Tu} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgBt>
          <rect x={0} y={300} width={KW} height={560} fill={ALCA} opacity=".14" />
          {Array.from({ length: 5 }, (_, i) => { const x0 = i * 230 - 40, hincha = kprog(T, K.Re + 3.0, K.Re + 4.6) * (i % 2 ? 1 : 0.6);
            return <g key={i} transform={`translate(${x0 + 115} 1060) scale(${1 + hincha * 0.08} ${1 + hincha * 0.05}) translate(${-x0 - 115} -1060)`}>
              {Array.from({ length: 9 }, (_, j) => <rect key={j} x={x0 + 12 + j * 23} y={826} width={14} height={40} rx={7} fill="#ffb3c6" stroke={KC.ink} strokeWidth={3} />)}
              <rect x={x0 + 6} y={860} width={218} height={420} rx={26} fill="#ff9fb5" stroke={KC.ink} strokeWidth={7} />
              <circle cx={x0 + 115} cy={1110} r={34} fill="#b8407a" stroke={KC.ink} strokeWidth={5} />
            </g>; })}
          {[200, 430, 660, 890].map((rx, i) => { const t0 = K.Re + 0.6 + i * 0.35, baja = kprog(T, t0, t0 + 0.9, kEase.suave), poro = kprog(T, K.Re + 2.4 + i * 0.2, K.Re + 3.2 + i * 0.2);
            return <g key={i}>
              <Receptor x={rx} y={866} ocupado={baja >= 1 ? kprog(T, t0 + 0.9, t0 + 1.3) : 0} />
              {poro <= 0 && <Cry T={T} x={klerp(rx - 120, rx, baja)} y={klerp(420 + (i % 2) * 120, 790, baja)} rot={klerp(-40, 90, baja)} activa={1} s={1.1} />}
              {poro > 0 && <g>
                {[-1, 0, 1].map((k) => <Cry key={k} T={T} x={rx + k * 34} y={790} rot={90} activa={1} s={0.9} />)}
                <ellipse cx={rx} cy={866} rx={30 * poro} ry={14 * poro} fill="#06060a" stroke={CRY} strokeWidth={5} />
                {Array.from({ length: 5 }, (_, j) => { const u = ((T - K.Re - 2.4) * 1.2 + j / 5) % 1; return <circle key={j} cx={rx + Math.sin(j * 2) * 14} cy={850 + u * 220} r={7} fill="#7fc8ff" opacity={poro * (1 - u)} />; })}
              </g>}
            </g>; })}
        </SvgBt>
        <SinEscala />
      </Escena>
      {/* 7 · tú: estómago ácido, sin receptores */}
      <Escena T={T} a={K.Tu} b={K.Or} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgBt>
          <line x1={540} y1={760} x2={540} y2={1250} stroke="rgba(255,255,255,.3)" strokeWidth={5} strokeDasharray="14 12" />
          <Estomago T={T} x={280} y={1000} s={1.0} />
          {[0, 1, 2].map((i) => { const t0 = K.Tu + 0.3 + i * 0.4, entra = kprog(T, t0, t0 + 0.7, kEase.suave), rompe = kprog(T, t0 + 0.8, t0 + 1.6);
            return <Cry key={i} T={T} x={klerp(240, 230 + i * 40, entra)} y={klerp(780, 980 + i * 40, entra)} rot={i * 40} activa={1} rota={rompe} s={1} />; })}
          {[650, 800, 950].map((rx, i) => <Receptor key={i} x={rx} y={1150} redondo color="#c9d3ff" />)}
          <rect x={590} y={1150} width={440} height={90} fill="#ffcfa8" stroke={KC.ink} strokeWidth={6} />
          {(() => { const t0 = K.Tu + 2.0, u = kprog(T, t0, t0 + 0.7, kEase.suave), reb = kprog(T, t0 + 0.7, t0 + 1.3, kEase.sale);
            return T > t0 ? <g><Cry T={T} x={800 + reb * 120} y={klerp(860, 1040, u) - reb * 160} rot={90 + reb * 140} activa={1} s={1.1} />
              {reb > 0 && <g transform="translate(800 1010)" opacity={reb}><line x1={-30} y1={-30} x2={30} y2={30} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /><line x1={30} y1={-30} x2={-30} y2={30} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /></g>}</g> : null; })()}
        </SvgBt>
        <Etq T={T} at={K.Tu + 0.4} until={K.Or - 0.3} x={60} y={730} texto="tu estómago: ácido" tam={32} color="#ffb08a" />
        <Etq T={T} at={K.Tu + 1.9} until={K.Or - 0.3} x={1030} y={1290} texto="sin esos receptores" lado="izq" tam={32} color="#c9d3ff" />
        <SinEscala />
      </Escena>
      {/* 8 · la bacteria como insecticida, también en agricultura orgánica */}
      <Escena T={T} a={K.Or} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgBt>
          <rect x={0} y={1420} width={KW} height={500} fill={TIERRA} stroke={KC.ink} strokeWidth={8} />
          {[160, 360, 560, 760, 960].map((x, i) => <Lechuga key={i} x={x} y={1440} s={1.1} T={T} seed={i + 1} />)}
          {[260, 460, 660, 860].map((x, i) => <Lechuga key={'b' + i} x={x} y={1640} s={1.2} T={T} seed={i + 7} />)}
          <Aspersor T={T} x={210} y={1080} s={1.05} rocia={kprog(T, K.Or + 0.6, K.Or + 1.2)} />
        </SvgBt>
        <Chip T={T} at={K.Or + 2.6} until={K.Es - 0.3} texto="agricultura orgánica ✔" x={720} y={760} tam={40} borde={KC.leaf} />
      </Escena>
      {/* 9 · 1995 y la resistencia en Puerto Rico */}
      <Escena T={T} a={K.Es} b={K.Mx} zoom={0.04}>
        <FondoLunares color={T < PR ? KC.cyan : KC.orange} />
        <SvgBt>
          <rect x={0} y={1480} width={KW} height={440} fill={TIERRA} stroke={KC.ink} strokeWidth={8} />
          {T < PR ? [140, 400, 660, 920].map((x, i) => <PlantaMaiz key={i} T={T} x={x} y={1500} s={0.62} seed={i + 20} id={'e' + i} elote={i % 2 === 0} />)
            : <g>
              <IslaPR x={780} y={470} s={0.8} />
              {[620, 900].map((x, i) => <PlantaMaiz key={i} T={T} x={x} y={1500} s={0.62} seed={i + 30} id={'r' + i} elote={false} color="#9ccf5a" />)}
              {[[560, 1180, 10], [820, 1080, -8], [940, 1300, 4]].map(([x, y, r], i) => <Cogollero key={i} T={T} x={x} y={y} s={1.1} rot={r} mastica={1} seed={i} />)}
            </g>}
        </SvgBt>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={PR - 0.2} anio="1995" quien="EE. UU. · EPA" revista="primer maíz Bt registrado" x={540} y={800} />
        <TarjetaEstudio T={T} at={P2010} until={K.Mx - 0.2} anio="2010" quien="Storer et al. · Puerto Rico" revista="resistencia a Cry1F confirmada" x={540} y={820} />
      </Escena>
      {/* 10 · México: la Constitución prohíbe sembrar maíz transgénico */}
      <Escena T={T} a={K.Mx} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgBt>
          <MapaMexico x={170} y={470} ancho={1000} conCA={false}>
            {[['#2346ff', -103.5, 21.5], ['#ff3b2f', -99.2, 19.5], ['#f7d65a', -96.8, 17.3], ['#f4efe4', -92.8, 16.6], ['#8a2be2', -101.5, 24.5]].map(([c, lo, la], i) => { const [px, py] = mxProy(lo, la), e = kprog(T, K.Mx + 0.4 + i * 0.2, K.Mx + 0.8 + i * 0.2, kEase.rebote);
              return <g key={i} transform={`translate(${px} ${py}) scale(${e})`}><Mazorca x={0} y={0} s={0.55} rot={(i - 2) * 12} color={c} /></g>; })}
          </MapaMexico>
          <Costal x={260} y={1600} s={0.95} texto="transgénico" tachado={kprog(T, K.Mx + 2.4, K.Mx + 2.9)} />
        </SvgBt>
        <Chip T={T} at={K.Mx + 1.2} until={K.Ci - 0.3} texto="Constitución · arts. 4o. y 27 · marzo 2025" x={540} y={1100} tam={34} borde={KC.gold} />
      </Escena>
      {/* 11 · cierre: la misma milpa, la hoja brilla por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="60% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgBt>
          <rect x={0} y={1700} width={KW} height={220} fill={TIERRA} stroke={KC.ink} strokeWidth={8} />
          <PlantaMaiz T={T} x={250} y={1720} s={1.05} seed={2} id="c1" cry={kprog(T, K.Ci + 0.3, K.Ci + 2.5)} />
          <PlantaMaiz T={T} x={930} y={1740} s={0.8} seed={5} id="c2" elote={false} cry={kprog(T, K.Ci + 0.3, K.Ci + 2.5)} />
          <HojaMaiz T={T} x={90} y={1120} L={980} W={150} rot={-8} curva={0.55} seed={9} mordidas={[[0.62, 1, 26], [0.68, 1, 22]]} cry={kprog(T, K.Ci + 0.3, K.Ci + 2.0)} id="cih" />
          <Cogollero T={T} x={klerp(700, 760, kprog(T, K.Ci + 2.5, K.Ci + 4))} y={klerp(1000, 1640, kprog(T, K.Ci + 2.5, K.Ci + 3.6, kEase.suave))} s={1.3} rot={klerp(8, 30, kprog(T, K.Ci + 2.5, K.Ci + 3.6))} onda={1 - kprog(T, K.Ci + 2.5, K.Ci + 3.6)} muerta={kprog(T, K.Ci + 2.5, K.Ci + 3.6)} />
        </SvgBt>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.Ge - 0.3} texto="¿fumigada?" x={290} y={470} tam={50} />
      <Etq T={T} at={K.Ge + 1.0} until={K.C - 0.3} x={1030} y={1440} texto="Bacillus thuringiensis" it lado="izq" tam={34} color={KC.texto} />
      <Chip T={T} at={K.C + 1.6} until={K.Mo - 0.3} texto="proteínas Cry" x={540} y={1500} tam={48} borde={CRY} />
      <Etq T={T} at={K.Mo + 0.6} until={K.Pr - 0.3} x={60} y={1470} texto="gusano cogollero" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.9} until={K.Pr - 0.3} x={60} y={1520} texto="Spodoptera frugiperda" it tam={32} color={KC.ink} />
      <Medidor T={T} at={K.Al + 0.8} until={K.Re - 0.3} valor={(T) => klerp(0.5, 0.92, kprog(T, K.Al + 1.0, K.Al + 2.6, kEase.sale))} etiqueta="ácido ← pH → alcalino" texto={(v) => v > 0.8 ? 'muy alcalino' : 'subiendo…'} x={90} y={1440} ancho={900} color={ALCA} />
      <Chip T={T} at={K.Re + 2.4} until={K.Tu - 0.3} texto="llave + cerradura → poro" x={540} y={1500} tam={42} borde={CRY} />
      <Chip T={T} at={K.Or + 0.4} until={K.Or + 2.4} texto="Bt: insecticida desde hace décadas" x={540} y={1500} tam={36} borde={KC.leaf} />
      <Chip T={T} at={PR + 0.3} until={P2010 - 0.2} texto="el cogollero ya no muere" x={540} y={1500} tam={42} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ge - 0.1} texto="No fumigada: *lo fabrica ella.*" />
      <Subtitulo T={T} idx={1} at={K.Ge + 0.1} until={K.C - 0.1} texto="Un gen de *bacteria del suelo.*" />
      <Subtitulo T={T} idx={2} at={K.C + 0.1} until={K.Mo - 0.1} texto="La receta: *proteínas Cry.*" />
      <Subtitulo T={T} idx={3} at={K.Mo + 0.1} until={K.Pr - 0.1} texto="El cogollero *se las traga.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Al - 0.1} texto="¿Y por qué *a ti no?*" />
      <Subtitulo T={T} idx={5} at={K.Al + 0.1} until={K.Re - 0.1} texto="Intestino *muy alcalino.*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.Tu - 0.1} texto="Llave en cerradura: *hoyos.*" />
      <Subtitulo T={T} idx={7} at={K.Tu + 0.1} until={K.Or - 0.1} texto="Tu estómago *la deshace.*" />
      <Subtitulo T={T} idx={8} at={K.Or + 0.1} until={K.Es - 0.1} texto="También en *agricultura orgánica.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Mx - 0.1} texto="El cogollero *se volvió resistente.*" />
      <Subtitulo T={T} idx={10} at={K.Mx + 0.1} until={K.Ci - 0.1} texto="México: *prohibido sembrarlo.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Su insecticida *viene adentro.*" />

      <Robert T={T} apariciones={[
        [0, K.Ge - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Ge + 1.4, K.C - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.C + 1.6, K.Mo - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pr + 0.05, K.Al + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Al + 1.6, K.Re - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Re + 1.0, K.Tu - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Tu + 0.6, K.Or - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Or + 0.6, K.Es - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [PR + 0.1, P2010 - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [K.Mx + 0.6, K.Ci - 0.3, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="25" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BtApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Bt /></CompositionStage></div>;
}
window.BtApp = BtApp;
