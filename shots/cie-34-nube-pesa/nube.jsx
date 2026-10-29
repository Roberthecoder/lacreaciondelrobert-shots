// Shot Científico #34 · Una nube pesa como cien elefantes — NARRADO (N2 "El número" + N1 "Por dentro").
// Datos: LeMone (NCAR) vía Mental Floss 2013 y USGS; física de nubes (Stull; SciAm). Ver guion.md y verificacion.md.
// Dibujo esquemático: la nube, los elefantes, las gotitas y el cubo no van a escala.
const NB_GRIS = '#c9d3e6', NB_ELE = '#9aa3b5', NB_AGUA = '#7fd3ff';

// Nube cúmulo esponjosa con base plana. (x, y) = centro de la base; tono 0..1 (0 blanca, 1 gris de lluvia).
const NB_BOLAS = [[-230, -40, 120], [-110, -130, 160], [60, -170, 185], [215, -70, 140], [0, -60, 150], [-300, 10, 80], [310, 10, 85], [120, -40, 130]];
function Cumulo({ x, y, s = 1, T = 0, tono = 0, children }) {
  const col = tono > 0 ? `rgb(${Math.round(klerp(255, 140, tono))},${Math.round(klerp(255, 150, tono))},${Math.round(klerp(255, 172, tono))})` : '#fff';
  const resp = 1 + 0.015 * Math.sin(T * 1.6);
  return <g transform={`translate(${x} ${y}) scale(${s * resp} ${s})`}>
    {NB_BOLAS.map(([cx, cy, r], i) => <circle key={'b' + i} cx={cx} cy={cy + Math.sin(T * 1.2 + i) * 4} r={r} fill={col} stroke={KC.ink} strokeWidth={10} />)}
    <rect x={-360} y={-30} width={720} height={80} rx={40} fill={col} stroke={KC.ink} strokeWidth={10} />
    {NB_BOLAS.map(([cx, cy, r], i) => <circle key={'c' + i} cx={cx} cy={cy + Math.sin(T * 1.2 + i) * 4} r={r - 5} fill={col} />)}
    <rect x={-355} y={-25} width={710} height={70} rx={35} fill={col} />
    <path d="M -330 30 Q 0 55 330 30" fill="none" stroke={NB_GRIS} strokeWidth={22} strokeLinecap="round" opacity={0.8} />
    <circle cx={-60} cy={-200} r={40} fill="#fff" opacity={0.6} />
    {children}
  </g>;
}
// Elefantito de perfil (para el conteo de 100). (x, y) = centro.
function Elefante({ x, y, s = 1, o = 1, color = NB_ELE }) {
  if (o <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-16, -4, 8, 18].map((lx, i) => <rect key={i} x={lx - 5} y={6} width={10} height={16} rx={3} fill={color} stroke={KC.ink} strokeWidth={3} />)}
    <ellipse cx={0} cy={0} rx={26} ry={17} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <path d="M 30 -2 Q 44 10 38 24" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M 30 -2 Q 44 10 38 24" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
    <circle cx={26} cy={-8} r={13} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <ellipse cx={19} cy={-6} rx={8} ry={11} fill="#c2c9d6" stroke={KC.ink} strokeWidth={3} />
    <circle cx={31} cy={-12} r={2.4} fill={KC.ink} />
    <path d="M -26 -2 q -8 4 -6 12" fill="none" stroke={KC.ink} strokeWidth={3} strokeLinecap="round" />
  </g>;
}
// Ciudad al fondo (debajo del subtítulo).
function Ciudad({ y = 1440 }) {
  const ed = [[0, 220, '#ff8a1f'], [130, 300, '#b18cff'], [250, 180, '#ff2d78'], [380, 340, '#2fe0a8'], [520, 240, '#ffe11a'], [650, 320, '#ff6b5a'], [790, 200, '#b18cff'], [910, 290, '#2fe0a8']];
  return <g>
    {ed.map(([x, h, c], i) => <g key={i}>
      <rect x={x} y={y + 200 - h} width={150} height={h + 400} fill={c} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 6 }, (_, k) => <rect key={k} x={x + 22 + (k % 2) * 62} y={y + 230 - h + Math.floor(k / 2) * 70} width={42} height={42} rx={6} fill="#fff6c8" stroke={KC.ink} strokeWidth={4} />)}
    </g>)}
    <rect x={0} y={y + 330} width={KW} height={300} fill="#5a6075" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Báscula gigante de piso con pantalla. p = 0..1 (aguja), texto en la pantalla.
function Bascula({ x, y, p, texto, T }) {
  const a = -110 + 220 * p + (p > 0.98 ? Math.sin(T * 18) * 2 : 0);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-290} y={0} width={580} height={36} rx={14} fill="#dfe6f2" stroke={KC.ink} strokeWidth={9} />
    <rect x={-260} y={36} width={520} height={200} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <circle cx={-150} cy={136} r={78} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => { const g = (-110 + i * 27.5) * Math.PI / 180; return <line key={i} x1={-150 + Math.sin(g) * 66} y1={136 - Math.cos(g) * 66} x2={-150 + Math.sin(g) * 52} y2={136 - Math.cos(g) * 52} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={-150} y1={136} x2={-150 + Math.sin(a * Math.PI / 180) * 58} y2={136 - Math.cos(a * Math.PI / 180) * 58} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle cx={-150} cy={136} r={10} fill={KC.ink} />
    <rect x={-50} y={78} width={290} height={116} rx={14} fill="#10202a" stroke={KC.ink} strokeWidth={7} />
    <text x={95} y={126} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#7dffb0">{texto[0]}</text>
    <text x={95} y={170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#7dffb0">{texto[1]}</text>
  </g>;
}
// La escena de la ciudad con la nube y la báscula (gancho y cierre). cierre: los elefantes se deshacen en pedacitos.
function Cielo({ T, t0, cierre = false }) {
  const p = kprog(T, t0 + 0.2, t0 + 1.4, kEase.sale);
  const pant = T < t0 + 0.4 ? ['', ''] : (T < t0 + 1.4 && !cierre ? [(Math.floor(T * 12) % 2 ? '8888' : '----'), ''] : ['CIENTOS DE', 'TONELADAS']);
  const flota = Math.sin(T * 1.5) * 12;
  const ce = cierre ? kprog(T, t0 + 0.6, t0 + 1.4) : 0, pz = cierre ? kprog(T, t0 + 2.4, t0 + 4.2, kEase.suave) : 0;
  return <g>
    <Ciudad />
    <Bascula x={380} y={985} p={cierre ? 1 : p} texto={pant} T={T} />
    {[0, 1, 2].map((i) => { const f = ((T * 0.7 + i / 3) % 1); return <path key={i} d={`M ${250 + i * 130} ${960 - f * 50} l -14 14 m 14 -14 l 14 14`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" opacity={(1 - f) * 0.8} />; })}
    <Cumulo x={380} y={880 + flota} s={0.82} T={T}>
      {cierre && Array.from({ length: 12 }, (_, i) => { const ex = -240 + (i % 4) * 160, ey = -170 + Math.floor(i / 4) * 85, g = krng(300 + i);
        return <g key={i}>
          <Elefante x={ex} y={ey} s={1.25} o={ce * (1 - pz)} />
          {pz > 0 && Array.from({ length: 14 }, (_, k) => { const a = g() * 6.28, d = g() * 70 * pz; return <circle key={k} cx={ex + Math.cos(a) * d} cy={ey + Math.sin(a) * d * 0.7} r={4 + g() * 3} fill={NB_AGUA} stroke={KC.ink} strokeWidth={2} opacity={pz} />; })}
        </g>; })}
    </Cumulo>
  </g>;
}
// Gotitas dentro de la lupa (al microscopio): billones de gotitas que flotan.
function GotitasLupa(T, r) {
  const g = krng(77);
  return <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: 110 }, (_, i) => { const x = g() * r * 2, y0 = g() * r * 2, rr = 5 + g() * 11, v = 6 + g() * 10;
      const yy = ((y0 + Math.sin(T * 0.8 + i) * 10 - T * v * 0.3) % (r * 2) + r * 2) % (r * 2);
      return <g key={i}><circle cx={x + Math.sin(T * 0.6 + i * 2) * 8} cy={yy} r={rr} fill={NB_AGUA} opacity={0.9} stroke="#dff6ff" strokeWidth={2} />
        <circle cx={x + Math.sin(T * 0.6 + i * 2) * 8 - rr * 0.35} cy={yy - rr * 0.35} r={rr * 0.3} fill="#fff" /></g>; })}
  </svg>;
}
// Gota grande (micro) con brillo.
function Gota({ x, y, r, o = 1, color = NB_AGUA }) {
  if (o <= 0.01 || r <= 0.5) return null;
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={color} stroke="#e8f8ff" strokeWidth={Math.max(2, r * 0.08)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.28} fill="#fff" opacity={0.9} /></g>;
}
// Flechas de aire que suben (se repiten).
function AireSube({ x, y0, y1, T, n = 3, color = KC.texto, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = ((T * 0.45 + i / n) % 1), y = klerp(y0, y1, f);
    return <g key={i} opacity={Math.sin(Math.PI * f)}><path d={`M ${x - 34} ${y + 30} L ${x} ${y} L ${x + 34} ${y + 30}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></g>; })}</g>;
}
// Cubo en alambre (perspectiva caballera). (x, y) = esquina sup-izq de la cara de enfrente; p = 0..1 cuánto se dibujó.
function CuboAlambre({ x, y, l, dx, dy, p = 1 }) {
  const F = [[x, y], [x + l, y], [x + l, y + l], [x, y + l]], B = F.map(([a, b]) => [a + dx, b + dy]);
  const aristas = [[F[0], F[1]], [F[1], F[2]], [F[2], F[3]], [F[3], F[0]], [F[0], B[0]], [F[1], B[1]], [F[2], B[2]], [F[3], B[3]], [B[0], B[1]], [B[1], B[2]], [B[2], B[3]], [B[3], B[0]]];
  return <g>
    {p > 0.99 && <path d={`M ${F[0]} L ${B[0]} L ${B[1]} L ${F[1]} Z`} fill="rgba(255,255,255,.18)" />}
    {aristas.map(([a, b], i) => { const q = kclamp(p * 12 - i, 0, 1); if (q <= 0) return null; const ex = klerp(a[0], b[0], q), ey = klerp(a[1], b[1], q), atras = i >= 8 || i === 4 && false;
      return <g key={i}><line x1={a[0]} y1={a[1]} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
        <line x1={a[0]} y1={a[1]} x2={ex} y2={ey} stroke={KC.yellow} strokeWidth={7} strokeLinecap="round" strokeDasharray={i >= 8 ? '16 12' : 'none'} /></g>; })}
  </g>;
}
// Balanza de dos platos. ang en grados (negativo = baja el plato izquierdo).
function Balanza({ x, y, ang, izq, der, L = 360 }) {
  const rad = ang * Math.PI / 180, lx = x - L * Math.cos(rad), ly = y - L * Math.sin(rad), rx = x + L * Math.cos(rad), ry = y + L * Math.sin(rad);
  const Plato = ({ px, py, children }) => <g>
    <line x1={px} y1={py} x2={px - 120} y2={py + 170} stroke={KC.ink} strokeWidth={6} />
    <line x1={px} y1={py} x2={px + 120} y2={py + 170} stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(${px} ${py + 170})`}>{children}</g>
    <path d={`M ${px - 150} ${py + 170} Q ${px} ${py + 240} ${px + 150} ${py + 170} Z`} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
  return <g>
    <rect x={x - 22} y={y} width={44} height={520} fill="#8a6a3a" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${x - 170} ${y + 560} L ${x + 170} ${y + 560} L ${x + 110} ${y + 500} L ${x - 110} ${y + 500} Z`} fill="#8a6a3a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#c58f3b" strokeWidth={16} strokeLinecap="round" />
    <circle cx={x} cy={y} r={26} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <Plato px={lx} py={ly}>{izq}</Plato>
    <Plato px={rx} py={ry}>{der}</Plato>
  </g>;
}

function NubeShot() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // lluvia por dentro: A+B → C, C+D → E, E+F → G, G cae
  const L0 = K.Lluvia, M1 = L0 + 0.9, M2 = L0 + 1.9, M3 = L0 + 2.9, CAE = L0 + 3.3, L2 = L0 + 4.4;
  const cb = (...r) => Math.cbrt(r.reduce((a, q) => a + q ** 3, 0));
  const rA = 26, rB = 22, rC = cb(rA, rB), rD = 30, rE = cb(rC, rD), rF = 34, rG = cb(rE, rF);
  const acerca = (t, m, dist) => dist * (1 - kprog(T, t, m, kEase.entra));
  const gx = 540, gy0 = 820, caida = T > CAE ? 0.5 * 2600 * (T - CAE) ** 2 : 0;
  // ángulo de la balanza
  const angB = -15 * kprog(T, K.Aire + 0.8, K.Aire + 1.8, kEase.rebote) + (T > K.Aire + 1.8 ? Math.sin(T * 3) * 1 : 0);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.cyan }}>
      {/* 0 · gancho: la nube esponjosa flota sobre una báscula gigante */}
      <Escena T={T} a={K.Gancho} b={K.Agua} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><Cielo T={T} t0={K.Gancho} /></Lienzo>
        <Chip T={T} at={K.Gancho + 1.6} until={K.Agua - 0.1} texto="…y aun así flota" x={380} y={560} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 1 · agua: al microscopio, billones de gotitas */}
      <Escena T={T} a={K.Agua} b={K.Cuenta} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><Cumulo x={540} y={560} s={0.55} T={T} /></Lienzo>
        <Lupa T={T} at={K.Agua + 0.3} until={K.Cuenta - 0.3} x={540} y={860} r={270} fx={540} fy={500} interior={GotitasLupa} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · NUBE" />
        <Chip T={T} at={K.Agua + 1.4} until={K.Cuenta - 0.2} texto="billones de gotitas" x={540} y={330} tam={50} borde={KC.yellow} />
        <Etq T={T} at={K.Agua + 4.3} until={K.Cuenta - 0.3} x={320} y={1166} texto="a simple vista: invisibles" lado="der" tam={30} />
      </Escena>
      {/* 2 · la cuenta: 2013, Peggy LeMone → ≈ 500 t de agua */}
      <Escena T={T} a={K.Cuenta} b={K.Elefantes} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo o={kprog(T, K.Cuenta + 3.5, K.Cuenta + 3.9)}>
          <Cumulo x={600} y={640} s={0.75} T={T} />
          {Array.from({ length: 10 }, (_, i) => { const g = krng(200 + i), f = ((T * 0.9 + g()) % 1); return <Gota key={i} x={360 + g() * 480} y={680 + f * 150} r={7 + g() * 5} o={1 - f} />; })}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Cuenta + 0.25} until={K.Cuenta + 3.6} anio="2013" quien="Peggy LeMone · meteoróloga" x={540} y={760} />
        <Etq T={T} at={K.Cuenta + 4.2} until={K.Elefantes - 0.2} x={880} y={420} texto="nube cúmulo típica" lado="izq" tam={30} />
        <NumeroGigante T={T} at={K.Cuenta + 3.9} until={K.Elefantes - 0.15} valor={500} desde={0} dur={1.2} prefijo="≈ " sufijo=" t" x={560} y={960} tam={210} color={KC.yellow} />
        <Lienzo z={42} o={kprog(T, K.Cuenta + 4.6, K.Cuenta + 5.0) * (1 - kprog(T, K.Elefantes - 0.3, K.Elefantes - 0.1))}>
          <TextoSvg x={560} y={1160} tam={72} fuente="texto" color={KC.texto}>de agua</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 3 · cien elefantes flotando sobre tu cabeza */}
      <Escena T={T} a={K.Elefantes} b={K.Pregunta} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Cumulo x={540} y={980} s={1.35} T={T} />
          {Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), at = K.Elefantes + 0.3 + i * 0.02, e = kprog(T, at, at + 0.25, kEase.rebote);
            return <Elefante key={i} x={180 + c * 76 + (f % 2) * 14} y={560 + f * 46 + Math.sin(T * 2 + i) * 3} s={0.95 * klerp(0.3, 1, e)} o={kprog(T, at, at + 0.1)} />; })}
          <PersonaSimple x={250} yPies={1820} alto={360} color={KC.pink} cara="o" />
        </Lienzo>
        <NumeroGigante T={T} at={K.Elefantes + 0.3} until={K.Pregunta - 0.1} valor={100} desde={0} dur={2.1} sufijo=" elefantes" x={540} y={420} tam={110} color={KC.yellow} />
      </Escena>
      {/* 4 · pregunta: ¿por qué no se cae? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Gotitas} color={KC.pink} />
      {/* 5 · gotitas: caen lentísimo y el aire que sube las sostiene (al microscopio) */}
      <Escena T={T} a={K.Gotitas} b={K.Repartida} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          {Array.from({ length: 40 }, (_, i) => { const g = krng(500 + i); return <Gota key={i} x={g() * KW} y={300 + g() * 1100 + Math.sin(T + i) * 10} r={6 + g() * 8} o={0.35} />; })}
          {[200, 880].map((x, i) => <AireSube key={i} x={x} y0={1150} y1={420} T={T + i * 0.5} n={4} color={KC.mint} o={kprog(T, K.Gotitas + 2.6, K.Gotitas + 3.2)} />)}
          {(() => { const y = 640 + 120 * kprog(T, K.Gotitas + 0.2, K.Gotitas + 2.8, kEase.sale) + Math.sin(T * 2.2) * 6;
            return <g>
              <Gota x={540} y={y} r={95} />
              <FlechaRecta x1={540} y1={y + 120} x2={540} y2={y + 190} p={kprog(T, K.Gotitas + 0.6, K.Gotitas + 1.0)} color={KC.coral} grosor={10} punta={24} />
              {T > K.Gotitas + 2.8 && <FlechaRecta x1={540} y1={y + 400} x2={540} y2={y + 250} p={kprog(T, K.Gotitas + 2.8, K.Gotitas + 3.3)} color={KC.mint} grosor={22} punta={44} />}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Gotitas + 0.2} until={K.Repartida - 0.1} texto="AL MICROSCOPIO · UNA GOTITA" x={540} y={420} tam={34} borde={KC.cyan} mono />
        <Etq T={T} at={K.Gotitas + 0.9} until={K.Repartida - 0.2} x={660} y={700} texto="cae lentísimo" lado="der" color={KC.coral} tam={34} />
        <Etq T={T} at={K.Gotitas + 3.2} until={K.Repartida - 0.2} x={610} y={1100} texto="aire que sube" lado="der" color={KC.mint} tam={34} />
      </Escena>
      {/* 6 · repartida: un cubo de 1 km por lado */}
      <Escena T={T} a={K.Repartida} b={K.Aire} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Cumulo x={470} y={1010} s={0.62} T={T} />
          <CuboAlambre x={150} y={700} l={480} dx={170} dy={-130} p={kprog(T, K.Repartida + 0.4, K.Repartida + 2.2)} />
          {T > K.Repartida + 2.2 && <TextoSvg x={390} y={1250 - 60} tam={64} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Repartida + 2.2, K.Repartida + 2.6, kEase.rebote))}>1 KM POR LADO</TextoSvg>}
          {T > K.Repartida + 2.2 && [[150, 1150, 630, 1150]].map(([a, b, c, d], i) => <g key={i} opacity={kprog(T, K.Repartida + 2.2, K.Repartida + 2.5)}>
            <line x1={a} y1={b - 40} x2={c} y2={d - 40} stroke={KC.ink} strokeWidth={6} />
            <line x1={a} y1={b - 56} x2={a} y2={b - 24} stroke={KC.ink} strokeWidth={6} /><line x1={c} y1={d - 56} x2={c} y2={d - 24} stroke={KC.ink} strokeWidth={6} /></g>)}
        </Lienzo>
        <Chip T={T} at={K.Repartida + 0.3} until={K.Aire - 0.1} texto="el peso, repartido" x={400} y={420} tam={44} borde={KC.ink} />
      </Escena>
      {/* 7 · aire: el aire del cubo pesa muchísimo más que el agua */}
      <Escena T={T} a={K.Aire} b={K.Lluvia} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Balanza x={540} y={620} ang={angB}
            izq={<g transform="translate(0 -10)">
              <path d="M -110 0 L -110 -170 L -60 -215 L 120 -215 L 120 -45 L 70 0 Z" fill="rgba(160,225,255,.75)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
              <path d="M -110 -170 L 70 -170 L 120 -215 M 70 -170 L 70 0" fill="none" stroke={KC.ink} strokeWidth={6} />
              {Array.from({ length: 16 }, (_, i) => { const g = krng(600 + i); return <circle key={i} cx={-95 + g() * 155 + Math.sin(T * 4 + i) * 5} cy={-155 + g() * 140 + Math.cos(T * 4 + i) * 5} r={6} fill="#fff" stroke={KC.ink} strokeWidth={2} />; })}
            </g>}
            der={<g transform="translate(0 -45) scale(0.28)"><Cumulo x={0} y={0} s={1} T={T} /></g>} />
          <TextoSvg x={540 - 360} y={1250 - 60} tam={60} fuente="texto" color={KC.texto} o={kprog(T, K.Aire + 0.4, K.Aire + 0.8)}>aire</TextoSvg>
          <TextoSvg x={540 + 360} y={1250 - 270} tam={46} fuente="texto" color={KC.texto} o={kprog(T, K.Aire + 0.4, K.Aire + 0.8)}>agua de la nube</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Aire + 0.2} until={K.Aire + 1.8} texto="el mismo cubo" x={540} y={420} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Aire + 2.0} until={K.Lluvia - 0.1} texto="el aire pesa muchísimo más" x={540} y={420} tam={44} borde={KC.red} />
      </Escena>
      {/* 8a · lluvia por dentro: las gotitas chocan, se juntan, crecen y caen */}
      <Escena T={T} a={L0} b={L2} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          {Array.from({ length: 50 }, (_, i) => { const g = krng(700 + i); return <Gota key={i} x={g() * KW} y={300 + g() * 1050 + Math.sin(T + i) * 10} r={6 + g() * 7} o={0.35} />; })}
          {T < M1 && <><Gota x={gx - 30 - acerca(L0, M1, 170)} y={gy0 - 140} r={rA} /><Gota x={gx + 30 + acerca(L0, M1, 170)} y={gy0 - 120} r={rB} /></>}
          {T >= M1 && T < M2 && <Gota x={gx} y={gy0 - 130 + 120 * kprog(T, M1, M2)} r={rC * klerp(1.25, 1, kprog(T, M1, M1 + 0.2))} />}
          {T < M2 && <Gota x={gx + 40 + acerca(L0 + 0.8, M2, 190)} y={gy0 + 10} r={rD} />}
          {T >= M2 && T < M3 && <Gota x={gx + 20} y={gy0 + 10 + 80 * kprog(T, M2, M3)} r={rE * klerp(1.25, 1, kprog(T, M2, M2 + 0.2))} />}
          {T < M3 && <Gota x={gx - 60 - acerca(L0 + 1.8, M3, 200)} y={gy0 + 100} r={rF} />}
          {T >= M3 && <Gota x={gx} y={gy0 + 100 + caida} r={rG * klerp(1.25, 1, kprog(T, M3, M3 + 0.2))} />}
          {T >= CAE && <FlechaRecta x1={gx + 150} y1={gy0 + 60 + caida * 0.5} x2={gx + 150} y2={gy0 + 260 + caida * 0.5} p={kprog(T, CAE, CAE + 0.3)} color={KC.coral} grosor={14} />}
        </Lienzo>
        <Onomato T={T} at={M1} dur={0.6} x={760} y={640} texto="¡PLOP!" tam={80} color={KC.cyan} />
        <Onomato T={T} at={M2} dur={0.6} x={300} y={760} texto="¡PLOP!" tam={90} color={KC.cyan} />
        <Onomato T={T} at={M3} dur={0.6} x={780} y={900} texto="¡PLOP!" tam={100} color={KC.cyan} />
        <Chip T={T} at={L0 + 0.2} until={M2 - 0.05} texto="chocan y se juntan" x={540} y={420} tam={44} borde={KC.cyan} />
        <Chip T={T} at={M2} until={L2 - 0.1} texto="más grandes y pesadas" x={540} y={420} tam={44} borde={KC.coral} />
      </Escena>
      {/* 8b · …y caen: eso es la lluvia */}
      <Escena T={T} a={L2} b={K.Cierre} fondo={KC.blue}>
        <FondoLunares color="#5b78ff" />
        <Lienzo>
          <Ciudad />
          <g>{Array.from({ length: 70 }, (_, i) => { const g = krng(800 + i), x = 320 + g() * 640, v = 1300 + g() * 400, y = 700 + ((g() * 800 + (T - L2) * v) % 800);
            return <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 44} stroke="#dff1ff" strokeWidth={6} strokeLinecap="round" opacity={kprog(T, L2 + 0.2, L2 + 0.6)} />; })}</g>
          <Cumulo x={640} y={700} s={0.95} T={T} tono={0.8} />
        </Lienzo>
        <Chip T={T} at={L2 + 0.4} until={K.Cierre - 0.1} texto="eso es la lluvia" x={660} y={330} tam={48} borde={KC.cyan} />
      </Escena>
      {/* 9 · cierre: la misma nube del inicio, ahora sabes qué lleva dentro */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><Cielo T={T} t0={K.Cierre} cierre /></Lienzo>
        <Chip T={T} at={K.Cierre + 2.6} until={K.Outro - 0.1} texto="agua de cien elefantes, en pedacitos" x={540} y={430} tam={38} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Agua - 0.1} texto="Pesa *cientos de toneladas…* y flota." />
      <Subtitulo T={T} idx={1} at={K.Agua + 0.1} until={K.Cuenta - 0.1} texto="*Billones de gotitas* diminutas." />
      <Subtitulo T={T} idx={2} at={K.Cuenta + 0.1} until={K.Elefantes - 0.1} texto="Una nube cúmulo: *≈ 500 t de agua.*" />
      <Subtitulo T={T} idx={3} at={K.Elefantes + 0.1} until={K.Pregunta - 0.1} texto="Como *cien elefantes* sobre ti." />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Gotitas - 0.1} texto="¿Por qué *no se cae?*" />
      <Subtitulo T={T} idx={5} at={K.Gotitas + 0.1} until={K.Repartida - 0.1} texto="Cae lentísimo y *el aire la sostiene.*" />
      <Subtitulo T={T} idx={6} at={K.Repartida + 0.1} until={K.Aire - 0.1} texto="Repartida en *un cubo de 1 km.*" />
      <Subtitulo T={T} idx={7} at={K.Aire + 0.1} until={K.Lluvia - 0.1} texto="El aire pesa *muchísimo más.*" />
      <Subtitulo T={T} idx={8} at={K.Lluvia + 0.1} until={K.Cierre - 0.1} texto="Se juntan, pesan… *y llueve.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Cien elefantes *en pedacitos.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Agua - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Agua + 3.6, K.Cuenta - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cuenta + 4.0, K.Elefantes - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Elefantes + 0.8, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Gotitas - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Repartida + 1.0, K.Aire - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Aire + 1.8, K.Lluvia - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [L2 + 0.3, K.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Cierre + 1.0, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="34" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function NubeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NubeShot /></CompositionStage></div>;
}
window.NubeApp = NubeApp;
