// Shot Científico #18 · Tu GPS funciona gracias a Einstein — NARRADO (N3 "Capítulos y medidores" + N2 el número 38 µs).
// Datos: Ashby 2002/2003, GPS.gov, Pogge (OSU). Ver guion.md y verificacion.md.
// Dibujo esquemático: la Tierra, las órbitas, las distancias y la velocidad de las manecillas no van a escala.
// Sin fórmulas en pantalla y sin cara de Einstein: solo una silueta genérica y un reloj con «t».
const GP_TIERRA = '#3a8dff', GP_TIERRA2 = KC.leaf, GP_PANEL = '#2346ff', GP_MAPA = '#eef3e2', GP_CALLE = '#ffffff', GP_PARQUE = '#9ee39a';

// ---------- piezas ----------
// Satélite GPS esquemático (cuerpo dorado, dos paneles solares, antena abajo).
function Satelite({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={-160} y1={0} x2={160} y2={0} stroke={KC.ink} strokeWidth={8} />
    {[-1, 1].map((k) => <g key={k} transform={`translate(${k * 110} 0)`}>
      <rect x={-55} y={-30} width={110} height={60} rx={6} fill={GP_PANEL} stroke={KC.ink} strokeWidth={7} />
      {[-27, 0, 27].map((dx) => <line key={dx} x1={dx} y1={-30} x2={dx} y2={30} stroke="#9fb4ff" strokeWidth={3} />)}
      <line x1={-55} y1={0} x2={55} y2={0} stroke="#9fb4ff" strokeWidth={3} />
    </g>)}
    <rect x={-40} y={-50} width={80} height={100} rx={12} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <path d="M -28 -34 L 22 -34 M -28 -14 L 28 -14 M -24 6 L 18 6" stroke="rgba(255,255,255,.55)" strokeWidth={5} strokeLinecap="round" />
    <line x1={0} y1={50} x2={0} y2={70} stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 66 Q 0 92 30 66 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// La Tierra (océano + continentes que giran despacio).
function Tierra({ x, y, r, T, id = 'gpT' }) {
  const g = krng(12), manchas = Array.from({ length: 14 }, () => [g() * 2.4 - 1.2, g() * 1.8 - 0.9, 0.12 + g() * 0.22]);
  const dx = ((T * 0.03) % 2.4);
  return <g>
    <circle cx={x} cy={y} r={r + 26} fill="rgba(255,255,255,.22)" />
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <circle cx={x} cy={y} r={r} fill={GP_TIERRA} />
    <g clipPath={`url(#${id})`}>
      {manchas.map(([mx, my, mr], i) => <circle key={i} cx={x + (((mx + dx + 1.2) % 2.4) - 1.2) * r} cy={y + my * r} r={mr * r} fill={GP_TIERRA2} />)}
      <circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.9} fill="rgba(255,255,255,.12)" />
    </g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
// Átomo esquemático (núcleo + 3 órbitas con electrones).
function Atomo({ x, y, r = 60, T = 0, color = KC.pink }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 60, 120].map((a, i) => { const f = T * 3 + i * 2.1;
      return <g key={a} transform={`rotate(${a})`}>
        <ellipse cx={0} cy={0} rx={r} ry={r * 0.36} fill="none" stroke={KC.ink} strokeWidth={5} />
        <circle cx={Math.cos(f) * r} cy={Math.sin(f) * r * 0.36} r={r * 0.11} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />
      </g>; })}
    <circle r={r * 0.2} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Reloj de manecillas. ang = ángulo del minutero (grados). t: dibuja la letra «t». atomo: un átomo al centro (reloj atómico).
function RelojT({ x, y, r = 120, ang = 0, aro = KC.paper, t = false, atomo = false, T = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={r + 14} fill={aro} stroke={KC.ink} strokeWidth={10} />
    <circle r={r - 4} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={Math.sin(i * Math.PI / 6) * (r - 8)} y1={-Math.cos(i * Math.PI / 6) * (r - 8)} x2={Math.sin(i * Math.PI / 6) * (r - (i % 3 ? 26 : 38))} y2={-Math.cos(i * Math.PI / 6) * (r - (i % 3 ? 26 : 38))} stroke={KC.ink} strokeWidth={i % 3 ? 4 : 8} />)}
    {atomo && <Atomo x={0} y={r * 0.35} r={r * 0.36} T={T} />}
    {t && <text x={0} y={-r * 0.18} textAnchor="middle" style={{ font:`italic 900 ${r * 0.62}px ${KF.texto}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={r * 0.03}>t</text>}
    <line x1={0} y1={0} x2={Math.sin(ang / 12 * Math.PI / 180) * r * 0.5} y2={-Math.cos(ang / 12 * Math.PI / 180) * r * 0.5} stroke={KC.ink} strokeWidth={r * 0.1} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(ang * Math.PI / 180) * r * 0.8} y2={-Math.cos(ang * Math.PI / 180) * r * 0.8} stroke={KC.ink} strokeWidth={r * 0.06} strokeLinecap="round" />
    <circle r={r * 0.07} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Silueta genérica de una persona con el pelo alborotado (sin cara, sin foto).
function SiluetaPelo({ x, y, s = 1, T = 0 }) {
  const pelo = Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (1.05 + i * 0.09) + Math.sin(T * 2 + i) * 0.03; return [Math.cos(a) * 78, Math.sin(a) * 74 - 6, 26 + (i % 3) * 7]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 170 Q -110 95 -40 85 L 40 85 Q 110 95 120 170 Z" fill="#2b2f45" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {pelo.map(([px, py, pr], i) => <circle key={i} cx={px} cy={py} r={pr} fill="#e9e9f2" stroke={KC.ink} strokeWidth={6} />)}
    <circle cx={-74} cy={20} r={24} fill="#e9e9f2" stroke={KC.ink} strokeWidth={6} />
    <circle cx={74} cy={20} r={24} fill="#e9e9f2" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={10} rx={64} ry={76} fill="#2b2f45" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Globo de pensamiento con la silueta y el reloj «t».
function GloboEinstein({ x, y, T, at, until = 999, cola = [0, 1] }) {
  if (T < at || T > until + 0.4) return null;
  const s = klerp(0.3, 1, kprog(T, at, at + 0.4, kEase.rebote)), o = kprog(T, at, at + 0.15) * (1 - kprog(T, until, until + 0.4));
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={cola[0] * 60 - 10} cy={150} r={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={cola[0] * 60 - 30} cy={190} r={11} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={215} ry={125} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <g transform="translate(-95 -5)"><SiluetaPelo x={0} y={-10} s={0.62} T={T} /></g>
    <RelojT x={95} y={0} r={78} ang={T * 120} t={true} />
  </g>;
}
// Teléfono con pantalla recortada. children = contenido en coordenadas de la pantalla (0..sw, 0..sh).
const TEL = { w: 480, h: 1000, b: 20 };
function Telefono({ x, y, s = 1, id = 'gpTel', children }) {
  const sw = TEL.w - TEL.b * 2, sh = TEL.h - TEL.b * 2;
  return <g transform={`translate(${x - TEL.w * s / 2} ${y - TEL.h * s / 2}) scale(${s})`}>
    <rect x={10} y={14} width={TEL.w} height={TEL.h} rx={56} fill="rgba(0,0,0,.25)" />
    <rect x={0} y={0} width={TEL.w} height={TEL.h} rx={56} fill="#22252e" stroke={KC.ink} strokeWidth={10} />
    <defs><clipPath id={id}><rect x={0} y={0} width={sw} height={sh} rx={36} /></clipPath></defs>
    <g transform={`translate(${TEL.b} ${TEL.b})`}><g clipPath={`url(#${id})`}>{children}</g></g>
    <rect x={TEL.w / 2 - 50} y={30} width={100} height={18} rx={9} fill="#111" />
  </g>;
}
// Mapa del celular (coordenadas de pantalla 440×960). Ruta del puntito azul hasta la puerta de la casa.
const GP_RUTA = [[90, 600], [90, 420], [300, 420], [300, 180], [300, 150]];
function rutaEn(f) {
  const seg = []; let L = 0;
  for (let i = 1; i < GP_RUTA.length; i++) { const d = Math.hypot(GP_RUTA[i][0] - GP_RUTA[i - 1][0], GP_RUTA[i][1] - GP_RUTA[i - 1][1]); seg.push(d); L += d; }
  let r = kclamp(f, 0, 1) * L;
  for (let i = 0; i < seg.length; i++) { if (r <= seg[i] || i === seg.length - 1) { const q = seg[i] ? Math.min(1, r / seg[i]) : 0; return [klerp(GP_RUTA[i][0], GP_RUTA[i + 1][0], q), klerp(GP_RUTA[i][1], GP_RUTA[i + 1][1], q)]; } r -= seg[i]; }
  return GP_RUTA[GP_RUTA.length - 1];
}
function MapaCel({ T, f = 0, llegada = 0, pin = 1 }) {
  const [px, py] = rutaEn(f), pts = [];
  for (let k = 0; k <= 40; k++) { const q = rutaEn(f + (1 - f) * k / 40); pts.push(q.join(',')); }
  const hal = (T * 1.2) % 1, bote = llegada > 0 ? Math.abs(Math.sin(llegada * 9)) * 22 * (1 - llegada) : 0;
  return <g>
    <rect x={0} y={0} width={440} height={960} fill={GP_MAPA} />
    <rect x={120} y={450} width={150} height={140} rx={16} fill={GP_PARQUE} />
    <rect x={330} y={450} width={110} height={140} rx={10} fill="#d9dccd" />
    <rect x={-10} y={210} width={70} height={180} rx={10} fill="#d9dccd" />
    <rect x={120} y={210} width={150} height={180} rx={10} fill="#d9dccd" />
    <ellipse cx={260} cy={800} rx={170} ry={90} fill="#8fd3ff" />
    <rect x={-10} y={650} width={80} height={300} rx={10} fill="#d9dccd" />
    {[180, 420, 620].map((yy) => <g key={yy}><line x1={-10} y1={yy} x2={450} y2={yy} stroke="#c9ccbd" strokeWidth={46} /><line x1={-10} y1={yy} x2={450} y2={yy} stroke={GP_CALLE} strokeWidth={36} /></g>)}
    {[90, 300].map((xx) => <g key={xx}><line x1={xx} y1={xx === 300 ? 160 : -10} x2={xx} y2={970} stroke="#c9ccbd" strokeWidth={46} /><line x1={xx} y1={xx === 300 ? 160 : -10} x2={xx} y2={970} stroke={GP_CALLE} strokeWidth={36} /></g>)}
    <polyline points={pts.join(' ')} fill="none" stroke="#2f7bff" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 22" />
    {/* casa de destino */}
    <g>
      <path d="M 238 92 L 300 40 L 362 92 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <rect x={250} y={90} width={100} height={62} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
      <rect x={284} y={110} width={32} height={42} fill={llegada > 0.3 ? '#ffe9a8' : '#7a4a22'} stroke={KC.ink} strokeWidth={5} />
    </g>
    {pin > 0 && <g transform={`translate(372 ${40 - bote})`} opacity={pin}>
      <path d="M 0 40 C -30 5 -30 -30 0 -30 C 30 -30 30 5 0 40 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={-6} r={10} fill="#fff" stroke={KC.ink} strokeWidth={3} />
    </g>}
    <circle cx={px} cy={py} r={28 + hal * 40} fill="rgba(47,123,255,.25)" opacity={1 - hal} />
    <circle cx={px} cy={py} r={22} fill="#2f7bff" stroke="#fff" strokeWidth={7} />
  </g>;
}
// Ciudad de cuadras (mapa a pantalla completa, para el error).
function CiudadGrid({ T }) {
  const cuadras = [];
  for (let i = -1; i < 6; i++) for (let j = 0; j < 9; j++) {
    const g = krng(i * 31 + j * 7 + 50), x = i * 230 + 30, y = j * 230 + 20, c = g() < 0.18 ? GP_PARQUE : '#d9dccd';
    cuadras.push(<rect key={i + '-' + j} x={x + 22} y={y + 22} width={186} height={186} rx={18} fill={c} />);
  }
  return <g>
    <rect width={KW} height={KH} fill={GP_MAPA} />
    {cuadras}
    <path d="M -50 1480 C 300 1380 600 1560 1150 1420" fill="none" stroke="#8fd3ff" strokeWidth={70} />
  </g>;
}
// Llave de tuercas (dentro de svg).
function Llave({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-18} y={0} width={36} height={190} rx={16} fill="#b8c0cc" stroke={KC.ink} strokeWidth={7} />
    <path d="M -46 -10 C -60 -60 -20 -84 -12 -60 L -12 -30 L 12 -30 L 12 -60 C 20 -84 60 -60 46 -10 C 36 14 -36 14 -46 -10 Z" fill="#b8c0cc" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Pulso de señal que viaja de (x0,y0) a (x1,y1) entre t0 y t1.
function Pulso({ T, t0, t1, x0, y0, x1, y1, color = KC.yellow, r = 18 }) {
  if (T < t0 || T > t1 + 0.25) return null;
  const p = kprog(T, t0, t1, kEase.suave), x = klerp(x0, x1, p), y = klerp(y0, y1, p);
  return <g opacity={1 - kprog(T, t1, t1 + 0.25)}>
    <line x1={x0} y1={y0} x2={x} y2={y} stroke={color} strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" />
    <circle cx={x} cy={y} r={r * 1.8} fill={color} opacity=".35" />
    <circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Etiqueta de hora que viaja con la señal (texto ilustrativo: "hora de salida").
function TagHora({ T, t0, x0, y0, x1, y1, dur = 2.2 }) {
  if (T < t0 || T > t0 + dur) return null;
  const p = kprog(T, t0, t0 + dur), x = klerp(x0, x1, p), y = klerp(y0, y1, p), o = kprog(T, t0, t0 + 0.2) * (1 - kprog(T, t0 + dur - 0.3, t0 + dur));
  return <g opacity={o} transform={`translate(${x} ${y}) rotate(-4)`}>
    <rect x={-150} y={-46} width={300} height={92} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>hora de salida</text>
    <text x={0} y={28} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.pink}>08:15:{(10 + (t0 * 3.7) % 40).toFixed(6)}</text>
  </g>;
}
// Flecha de gravedad (gruesa o delgada).
function FlechaG({ x, y, largo, grosor, T, color = KC.violet }) {
  const d = Math.sin(T * 4) * 6;
  return <FlechaRecta x1={x} y1={y + d} x2={x} y2={y + largo + d} color={color} grosor={grosor} punta={grosor * 1.6 + 10} />;
}

function Gps() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el puntito avanza por la ruta; cierre: llega a la puerta
  const fG = 0.25 * kprog(T, 0, K.Satelites, kEase.suave);
  const fC = klerp(0.25, 1, kprog(T, K.Cierre + 0.2, K.Cierre + 3.0, kEase.suave));
  const subeTel = klerp(70, 0, kprog(T, -0.2, 0.4, kEase.sale));
  // distancia
  const SAT3 = [[200, 640], [540, 560], [880, 660]], PCEL = [540, 1010];
  // velocidad: el satélite corre en su órbita
  const aV = klerp(-28, 26, kprog(T, K.Velocidad - 0.4, K.Neto + 0.4)) * Math.PI / 180;
  const VX = 540 + 1500 * Math.sin(aV), VY = 2300 - 1500 * Math.cos(aV);
  // error: el puntito se desvía
  const deriva = kprog(T, K.Error + 3.4, K.Error + 6.4, kEase.suave);
  const PV = [300, 920], PE = [klerp(300, 830, deriva), klerp(920, 560, deriva) + Math.sin(deriva * 9) * 30 * deriva];
  // corrección
  const fase2 = K.Correccion + 3.2, subeSat = kprog(T, fase2 - 0.2, fase2 + 0.6, kEase.suave);
  const giroLlave = Math.sin(kprog(T, K.Correccion + 0.8, K.Correccion + 2.8) * Math.PI * 4) * 28;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.yellow }}>
      {/* 0 · gancho: el celular con el mapa; aparece la silueta con el reloj «t» */}
      <Escena T={T} a={K.Gancho} b={K.Satelites} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Telefono x={330} y={1060 + subeTel} id="telG"><MapaCel T={T} f={fG} /></Telefono>
          {T > 1.1 && T < 3.2 && <g>
            <Satelite x={klerp(-140, 560, kprog(T, 1.1, 3.0))} y={470 - 40 * kprog(T, 1.1, 3.0)} s={0.45} rot={-8} o={1 - kprog(T, 2.8, 3.1)} />
          </g>}
          <OndasArco x={klerp(-140, 560, kprog(T, 1.1, 3.0))} y={500} ang={110} T={T} color={KC.pink} largo={180} o={T > 1.3 && T < 2.9 ? 1 : 0} />
          <GloboEinstein x={310} y={400} T={T} at={3.05} until={K.Satelites} cola={[0, 1]} />
        </Lienzo>
      </Escena>

      {/* 1 · satélites: la cámara sube a la órbita */}
      <Escena T={T} a={K.Satelites} b={K.Relojes} fondo={KC.blue}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.18)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} alto={1100} />
          <g transform={`translate(540 1160) scale(${klerp(2.3, 1, kprog(T, K.Satelites - 0.4, K.Satelites + 1.4, kEase.suave))}) translate(-540 -1160)`}>
            <Tierra x={540} y={1560} r={400} T={T} id="tierraS" />
            {[[0, 1, 1], [-14, 1.0, 0.86], [16, 0.95, 0.9]].map(([rot, sx, sy], i) =>
              <ellipse key={i} cx={540} cy={1560} rx={860 * sx} ry={860 * sy} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={5} strokeDasharray="16 16" transform={`rotate(${rot} 540 1560)`} />)}
            {Array.from({ length: 9 }, (_, i) => { const orb = i % 3, rot = [0, -14, 16][orb], sx = [1, 1, 0.95][orb], sy = [1, 0.86, 0.9][orb];
              const a = -Math.PI / 2 + (i / 9 - 0.5) * 2.4 + (T - K.Satelites) * 0.06 * (orb === 1 ? -1 : 1);
              const lx = 540 + Math.cos(a) * 860 * sx, ly = 1560 + Math.sin(a) * 860 * sy, rr = rot * Math.PI / 180;
              const X = 540 + (lx - 540) * Math.cos(rr) - (ly - 1560) * Math.sin(rr), Y = 1560 + (lx - 540) * Math.sin(rr) + (ly - 1560) * Math.cos(rr);
              const at = K.Satelites + 0.5 + i * 0.12;
              return <g key={i} opacity={kprog(T, at, at + 0.3)}><Satelite x={X} y={Y} s={0.32} rot={a * 57 + 90} /></g>; })}
          </g>
          {T > K.Satelites + 1.6 && <g opacity={kprog(T, K.Satelites + 1.6, K.Satelites + 2.0)}>
            <line x1={540} y1={1150} x2={540} y2={1150 - 440 * kprog(T, K.Satelites + 1.6, K.Satelites + 2.4, kEase.sale)} stroke={KC.yellow} strokeWidth={12} strokeDasharray="20 14" />
            <path d="M 510 1140 L 540 1170 L 570 1140" fill="none" stroke={KC.yellow} strokeWidth={10} />
            {T > K.Satelites + 2.4 && <path d="M 510 740 L 540 705 L 570 740" fill="none" stroke={KC.yellow} strokeWidth={10} />}
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Satelites + 2.0} until={K.Relojes - 0.1} texto="≈ 20,000 km de altura" x={540} y={460} tam={50} borde={KC.yellow} />
        <Etq T={T} at={K.Satelites + 0.9} until={K.Satelites + 3.3} x={300} y={600} texto="decenas en órbita" lado="der" />
      </Escena>

      {/* 2 · relojes atómicos a bordo: mandan la hora de salida */}
      <Escena T={T} a={K.Relojes} b={K.Distancia} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Satelite x={560} y={600 + Math.sin(T * 1.5) * 10} s={1.4} />
          <line x1={520} y1={680} x2={360} y2={830} stroke={KC.ink} strokeWidth={6} strokeDasharray="12 10" opacity={kprog(T, K.Relojes + 0.4, K.Relojes + 0.8)} />
          {T > K.Relojes + 0.4 && <g transform={`translate(300 1010) scale(${klerp(0.3, 1, kprog(T, K.Relojes + 0.4, K.Relojes + 0.8, kEase.rebote))})`}>
            <circle r={200} fill={KC.noche} stroke={KC.ink} strokeWidth={10} />
            <RelojT x={0} y={0} r={150} ang={(T - K.Relojes) * 300} atomo={true} T={T} />
          </g>}
          <OndasArco x={560} y={710} ang={60} T={T} color={KC.paper} largo={300} o={kprog(T, K.Relojes + 1.8, K.Relojes + 2.1)} />
          {[0, 1, 2].map((k) => <TagHora key={k} T={T} t0={K.Relojes + 2.0 + k * 0.9} x0={640} y0={800} x1={820} y1={1150} />)}
        </Lienzo>
        <Etq T={T} at={K.Relojes + 0.7} until={K.Distancia - 0.1}  x={40} y={790} texto="POR DENTRO · reloj atómico" lado="der" tam={30} />
        <Chip T={T} at={K.Relojes + 0.3} until={K.Distancia - 0.1} texto="reloj atómico a bordo" x={540} y={430} tam={44} borde={KC.ink} />
      </Escena>

      {/* 3 · distancia: tres señales y tres círculos que se cruzan en tu celular */}
      <Escena T={T} a={K.Distancia} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {SAT3.map(([sx, sy], i) => { const d = Math.hypot(PCEL[0] - sx, PCEL[1] - sy), p = kprog(T, K.Distancia + 3.3 + i * 0.35, K.Distancia + 4.3 + i * 0.35, kEase.sale);
            return p > 0 && <circle key={'c' + i} cx={sx} cy={sy} r={d * p} fill="none" stroke={[KC.pink, KC.blue, KC.orange][i]} strokeWidth={9} strokeDasharray="22 14" />; })}
          {SAT3.map(([sx, sy], i) => <Satelite key={i} x={sx} y={sy + Math.sin(T * 1.4 + i) * 8} s={0.48} />)}
          <g transform={`translate(${PCEL[0]} ${PCEL[1] + 40})`}>
            <rect x={-80} y={-150} width={160} height={300} rx={26} fill="#22252e" stroke={KC.ink} strokeWidth={8} />
            <rect x={-66} y={-130} width={132} height={250} rx={12} fill={GP_MAPA} />
            <circle cx={0} cy={-40} r={16} fill="#2f7bff" stroke="#fff" strokeWidth={5} />
          </g>
          {SAT3.map(([sx, sy], i) => <Pulso key={'p' + i} T={T} t0={K.Distancia + 0.3 + i * 0.45} t1={K.Distancia + 1.5 + i * 0.45} x0={sx} y0={sy + 40} x1={PCEL[0]} y1={PCEL[1]} color={[KC.pink, KC.blue, KC.orange][i]} />)}
          {T > K.Distancia + 4.9 && <circle cx={PCEL[0]} cy={PCEL[1]} r={30 + 30 * ((T * 1.5) % 1)} fill="none" stroke={KC.ink} strokeWidth={6} opacity={1 - ((T * 1.5) % 1)} />}
        </Lienzo>
        <Chip T={T} at={K.Distancia + 0.4} until={K.Distancia + 3.1} texto="salió … llegó → tiempo de viaje" x={540} y={420} tam={38} borde={KC.ink} />
        <Chip T={T} at={K.Distancia + 3.3} until={K.Pregunta - 0.1} texto="distancia a cada satélite" x={540} y={420} tam={42} borde={KC.yellow} />
        <Etq T={T} at={K.Distancia + 5.0} until={K.Pregunta - 0.1} x={470} y={1010} texto="aquí estás" lado="izq" color={KC.ink} tam={32} />
      </Escena>

      {/* 4 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Gravedad} color={KC.pink} />

      {/* 5 · gravedad más débil arriba: el reloj del satélite se adelanta */}
      <Escena T={T} a={K.Gravedad} b={K.Velocidad} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Tierra x={540} y={1760} r={600} T={T} id="tierraG" />
          <line x1={240} y1={1140} x2={240} y2={1180} stroke={KC.ink} strokeWidth={14} />
          <RelojT x={240} y={1000} r={120} ang={(T - K.Gravedad) * 240} />
          <Satelite x={800} y={400} s={0.6} />
          <RelojT x={800} y={640} r={120} ang={(T - K.Gravedad) * 240 * klerp(1, 1.6, kprog(T, K.Gravedad + 2.6, K.Gravedad + 3.4))} aro={KC.yellow} />
          {T > K.Gravedad + 0.6 && <g opacity={kprog(T, K.Gravedad + 0.6, K.Gravedad + 1.0)}>
            <FlechaG x={430} y={900} largo={190} grosor={30} T={T} />
            <FlechaG x={500} y={930} largo={160} grosor={30} T={T + 0.4} />
            <FlechaG x={990} y={570} largo={70} grosor={7} T={T} />
          </g>}
          {T > K.Gravedad + 2.6 && <g opacity={kprog(T, K.Gravedad + 2.6, K.Gravedad + 3.0)}>
            <path d="M 650 560 A 170 170 0 0 1 760 450" fill="none" stroke={KC.pink} strokeWidth={12} strokeLinecap="round" />
            <path d="M 740 438 L 780 446 L 760 480" fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Gravedad + 0.8} until={K.Velocidad - 0.1} x={560} y={1010} texto="gravedad fuerte" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Gravedad + 1.0} until={K.Velocidad - 0.1} x={950} y={800} texto="gravedad más débil" lado="izq" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Gravedad + 2.8} until={K.Gravedad + 4.4} x={660} y={640} texto="el tiempo corre más rápido" lado="izq" color={KC.ink} tam={30} />
        <NumeroGigante T={T} at={K.Gravedad + 4.6} until={K.Velocidad - 0.15} valor={45} desde={0} dur={0.9} prefijo="+" sufijo=" µs/día" x={660} y={905} tam={110} color={KC.yellow} />
      </Escena>

      {/* 6 · velocidad: el satélite corre y su reloj se atrasa */}
      <Escena T={T} a={K.Velocidad} b={K.Neto} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <circle cx={540} cy={2300} r={1500} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={8} strokeDasharray="24 18" />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={VX - 200 - i * 30} y1={VY - 60 + i * 40} x2={VX - 330 - i * 50} y2={VY - 50 + i * 44} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.7 - i * 0.12} />)}
          <Satelite x={VX} y={VY} s={0.75} rot={aV * 57} />
          <line x1={VX} y1={VY + 60} x2={VX} y2={VY + 120} stroke={KC.ink} strokeWidth={6} />
          <RelojT x={VX} y={VY + 230} r={105} ang={(T - K.Velocidad) * 240 * klerp(1, 0.55, kprog(T, K.Velocidad + 3.4, K.Velocidad + 4.0))} aro={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Velocidad + 0.9} until={K.Neto - 0.1} texto="≈ 14,000 km/h" x={380} y={450} tam={54} borde={KC.yellow} />
        <NumeroGigante T={T} at={K.Velocidad + 3.4} until={K.Neto - 0.15} valor={7} desde={0} dur={0.6} prefijo="−" sufijo=" µs/día" x={400} y={650} tam={110} color={KC.cyan} etiqueta="se atrasa" />
      </Escena>

      {/* 7 · neto: +45 − 7 = +38 µs al día */}
      <Escena T={T} a={K.Neto} b={K.Error} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {(() => { const B = 1150, k = 8, g1 = kprog(T, K.Neto + 0.2, K.Neto + 0.8, kEase.sale), g2 = kprog(T, K.Neto + 0.9, K.Neto + 1.3, kEase.sale), g3 = kprog(T, K.Neto + 1.6, K.Neto + 2.3, kEase.sale);
            const top1 = B - 45 * k, top3 = B - 38 * k;
            return <g>
              <line x1={90} y1={B} x2={990} y2={B} stroke={KC.ink} strokeWidth={10} />
              <rect x={130} y={B - 45 * k * g1} width={190} height={45 * k * g1} fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
              {g1 > 0.9 && <TextoSvg x={225} y={top1 - 20} tam={70} color={KC.mint}>+45</TextoSvg>}
              {g2 > 0 && <><line x1={320} y1={top1} x2={440} y2={top1} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
                <rect x={440} y={top1} width={190} height={7 * k * g2} fill={KC.red} stroke={KC.ink} strokeWidth={8} /></>}
              {g2 > 0.9 && <TextoSvg x={535} y={top1 - 20} tam={70} color={KC.red}>−7</TextoSvg>}
              {g3 > 0 && <><line x1={630} y1={top3} x2={750} y2={top3} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
                <rect x={750} y={B - 38 * k * g3} width={190} height={38 * k * g3} fill={KC.gold} stroke={KC.ink} strokeWidth={8} /></>}
              {[['gravedad', 225, K.Neto + 0.2], ['velocidad', 535, K.Neto + 0.9], ['total', 845, K.Neto + 1.6]].map(([t, x, at]) =>
                <text key={t} x={x} y={B + 50} textAnchor="middle" opacity={kprog(T, at, at + 0.3)} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{t}</text>)}
            </g>; })()}
        </Lienzo>
        <NumeroGigante T={T} at={K.Neto + 2.0} until={K.Error - 0.15} valor={38} desde={0} dur={0.8} prefijo="+" sufijo=" µs" x={540} y={560} tam={190} color={KC.gold2} etiqueta="cada día, en el satélite" />
      </Escena>

      {/* 8 · error: sin corregir, el puntito se va > 10 km por día */}
      <Escena T={T} a={K.Error} b={K.Correccion} fondo={GP_MAPA}>
        <Lienzo>
          <CiudadGrid T={T} />
          <Satelite x={820} y={420} s={0.55} rot={-10} />
          {(() => { const p = ((T - K.Error - 0.4) * 1.6) % 1, on = T > K.Error + 0.4 && T < K.Error + 3.6;
            return on && <g>
              <line x1={790} y1={470} x2={PV[0]} y2={PV[1]} stroke={KC.yellow} strokeWidth={30} opacity=".35" strokeLinecap="round" />
              <line x1={790} y1={470} x2={PV[0]} y2={PV[1]} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
              <circle cx={klerp(790, PV[0], p)} cy={klerp(470, PV[1], p)} r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            </g>; })()}
          <circle cx={PV[0]} cy={PV[1]} r={24} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="8 6" />
          {deriva > 0 && <g>
            <line x1={PV[0]} y1={PV[1]} x2={PE[0]} y2={PE[1]} stroke={KC.red} strokeWidth={10} strokeDasharray="20 12" />
            <circle cx={PE[0]} cy={PE[1]} r={70 * ((T * 1.2) % 1) + 20} fill="rgba(255,59,47,.25)" opacity={1 - ((T * 1.2) % 1)} />
          </g>}
          <circle cx={PE[0]} cy={PE[1]} r={26} fill="#2f7bff" stroke="#fff" strokeWidth={8} />
          {T > K.Error + 5.2 && <Alerta x={PE[0] + 10} y={PE[1] - 120} s={klerp(0.3, 0.8, kprog(T, K.Error + 5.2, K.Error + 5.5, kEase.rebote))} />}
          {T > K.Error + 5.0 && <TextoSvg x={560} y={1150} tam={100} color={KC.red} s={klerp(0.4, 1, kprog(T, K.Error + 5.0, K.Error + 5.4, kEase.rebote))}>{'> 10 KM POR DÍA'}</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Error + 0.6} until={K.Error + 3.3} texto="señal = velocidad de la luz" x={650} y={440} tam={36} borde={KC.yellow} />
        <Etq T={T} at={K.Error + 0.8} until={K.Error + 3.4}  x={330} y={920} texto="donde estás" lado="der" color={KC.ink} tam={30} />
        <Chip T={T} at={K.Error + 3.5} until={K.Correccion - 0.1} texto="sin corregir" x={620} y={440} tam={46} borde={KC.red} />
      </Escena>

      {/* 9 · corrección: se ajustan antes del lanzamiento y en órbita marcan igual que en la Tierra */}
      <Escena T={T} a={K.Correccion} b={K.Cierre} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {T < fase2 + 0.6 && <g opacity={1 - subeSat}>
            <rect x={150} y={1120} width={540} height={40} rx={10} fill="#7a7f8f" stroke={KC.ink} strokeWidth={7} />
            <line x1={420} y1={1120} x2={420} y2={760} stroke={KC.ink} strokeWidth={14} />
            <Satelite x={420} y={700} s={1.1} />
            <RelojT x={330} y={960} r={110} ang={(T - K.Correccion) * 200} />
            <circle cx={560} cy={960} r={48} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <line x1={560} y1={960} x2={560 + Math.sin(giroLlave / 20) * 40} y2={960 - Math.cos(giroLlave / 20) * 40} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
            {T > K.Correccion + 0.7 && <Llave x={600} y={950} rot={-50 + giroLlave} s={0.9} />}
          </g>}
          {T > fase2 - 0.2 && <g opacity={subeSat}>
            <Satelite x={540} y={klerp(700, 630, subeSat)} s={klerp(1.1, 0.55, subeSat)} />
            <RelojT x={290} y={900} r={130} ang={(T - fase2) * 220} aro={KC.yellow} />
            <RelojT x={790} y={900} r={130} ang={(T - fase2) * 220} />
            <TextoSvg x={540} y={940} tam={130} color={KC.paper}>=</TextoSvg>
            <text x={290} y={1110} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>en órbita</text>
            <text x={790} y={1110} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>en la Tierra</text>
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Correccion + 1.0} until={fase2 - 0.3} x={620} y={1060} texto="frecuencia" lado="der" color={KC.ink} tam={30} />
        <Chip T={T} at={K.Correccion + 0.3} until={fase2 - 0.2} texto="antes del lanzamiento" x={400} y={440} tam={44} borde={KC.ink} />
        <Chip T={T} at={fase2 + 0.4} until={K.Cierre - 0.1} texto="marcan igual" x={400} y={440} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 10 · cierre: el mismo celular; el puntito llega a la puerta */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Telefono x={330} y={1060} id="telC"><MapaCel T={T} f={fC} llegada={kprog(T, K.Cierre + 3.0, K.Cierre + 4.0)} /></Telefono>
          <GloboEinstein x={310} y={400} T={T} at={K.Cierre + 0.3} cola={[0, 1]} />
          {T > K.Cierre + 3.0 && <g transform={`translate(800 860) scale(${klerp(0.3, 1, kprog(T, K.Cierre + 3.0, K.Cierre + 3.4, kEase.rebote))})`}>
            <circle r={90} fill={KC.mint} stroke={KC.ink} strokeWidth={9} />
            <path d="M -42 0 L -10 32 L 46 -30" fill="none" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.2} until={K.Outro - 0.1} texto="usas la relatividad" x={810} y={1030} tam={34} borde={KC.ink} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Satelites - 0.1} texto="Tu GPS funciona gracias a *Einstein.*" />
      <Subtitulo T={T} idx={1} at={K.Satelites + 0.1} until={K.Relojes - 0.1} texto="Satélites a *≈ 20,000 km* de altura." />
      <Subtitulo T={T} idx={2} at={K.Relojes + 0.1} until={K.Distancia - 0.1} texto="Cada uno lleva *relojes atómicos.*" />
      <Subtitulo T={T} idx={3} at={K.Distancia + 0.1} until={K.Pregunta - 0.1} texto="Salida y llegada → *tu distancia.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Gravedad - 0.1} texto="¿Y qué tiene que ver *Einstein?*" />
      <Subtitulo T={T} idx={5} at={K.Gravedad + 0.1} until={K.Velocidad - 0.1} texto="Menos gravedad: *+45 µs al día.*" />
      <Subtitulo T={T} idx={6} at={K.Velocidad + 0.1} until={K.Neto - 0.1} texto="Más velocidad: *−7 µs al día.*" />
      <Subtitulo T={T} idx={7} at={K.Neto + 0.1} until={K.Error - 0.1} texto="En total: *+38 µs al día.*" />
      <Subtitulo T={T} idx={8} at={K.Error + 0.1} until={K.Correccion - 0.1} texto="Sin corregir: *> 10 km por día.*" />
      <Subtitulo T={T} idx={9} at={K.Correccion + 0.1} until={K.Cierre - 0.1} texto="Se ajustan *antes del lanzamiento.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Cada dirección usa *la relatividad.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Satelites - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Satelites + 0.6, K.Relojes - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Distancia + 0.5, K.Pregunta - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Pregunta + 0.05, K.Gravedad + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Gravedad + 3.0, K.Velocidad - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Velocidad + 0.4, K.Neto - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Neto + 0.3, K.Error - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Error + 0.5, K.Correccion - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Correccion + 0.6, K.Cierre - 0.2, 'avatar_08_recostado_mano', 'arriba-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="18" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function GpsApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gps /></CompositionStage></div>;
}
window.GpsApp = GpsApp;
