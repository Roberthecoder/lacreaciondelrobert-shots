// Shot Ambiental #37 · La línea que mide el aire que respiras (curva de Keeling) — NARRADO (N4 la imagen que se llena + N2).
// Datos: NOAA GML (promedios mensuales y anuales de Mauna Loa), Scripps CO2 Program y NOAA Climate.gov. Ver guion.md y verificacion.md.
// La curva se dibuja con los promedios mensuales reales de NOAA (keeling-datos.jsx). Volcanes, árbol, molécula y núcleo de hielo son esquemáticos.

const KD = () => window.KEEL_MM || [];
const kAnio = (i) => 1958 + (2 + i + 0.5) / 12;          // índice 0 = marzo de 1958 (mitad del mes)

// Gráfica de la curva. box = {x, y, w, h} (y = arriba). hasta = cuántos meses dibujar (puede ser fraccional).
function Grafica({ T, box = { x: 140, y: 700, w: 850, h: 440 }, y0 = 260, y1 = 440, a0 = 1958, a1 = 2026, i0 = 0, hasta = 0,
  ticksY = [300, 350, 400], ticksX = [1960, 1980, 2000, 2020], color = KC.red, grosor = 7, pluma = true, base280 = 0, ejes = 1, fondo = 'rgba(255,255,255,.82)', tamTick = 26, dec = 0 }) {
  const d = KD();
  const X = (a) => box.x + (a - a0) / (a1 - a0) * box.w;
  const Y = (v) => box.y + box.h - (v - y0) / (y1 - y0) * box.h;
  const fin = Math.min(d.length - 1, i0 + hasta);
  let path = '', last = null;
  for (let i = i0; i <= Math.floor(fin); i++) { const px = X(kAnio(i)), py = Y(d[i]); path += (path ? ' L ' : 'M ') + px.toFixed(1) + ' ' + py.toFixed(1); last = [px, py, d[i]]; }
  if (fin > Math.floor(fin) && Math.floor(fin) + 1 < d.length) { const k = Math.floor(fin), f = fin - k; const v = klerp(d[k], d[k + 1], f);
    const px = klerp(X(kAnio(k)), X(kAnio(k + 1)), f), py = Y(v); path += ' L ' + px.toFixed(1) + ' ' + py.toFixed(1); last = [px, py, v]; }
  return <g opacity={ejes}>
    <rect x={box.x - 20} y={box.y - 20} width={box.w + 40} height={box.h + 40} rx={22} fill={fondo} stroke={KC.ink} strokeWidth={6} />
    {ticksY.map((v) => <g key={v}><line x1={box.x} y1={Y(v)} x2={box.x + box.w} y2={Y(v)} stroke="rgba(0,0,0,.14)" strokeWidth={3} />
      <text x={box.x - 28} y={Y(v) + 9} textAnchor="end" style={{ font:`700 ${tamTick}px ${KF.mono}` }} fill={KC.ink}>{kformato(v, dec)}</text></g>)}
    {ticksX.map((a) => <text key={a} x={X(a)} y={box.y + box.h + 52} textAnchor="middle" style={{ font:`700 ${tamTick}px ${KF.mono}` }} fill={KC.ink}>{a}</text>)}
    {base280 > 0 && <g opacity={base280}><line x1={box.x} y1={Y(280)} x2={box.x + box.w * base280} y2={Y(280)} stroke="#2a6fdb" strokeWidth={6} strokeDasharray="18 12" /></g>}
    {path && <path d={path} fill="none" stroke={color} strokeWidth={grosor} strokeLinejoin="round" strokeLinecap="round" />}
    {pluma && last && hasta > 0 && <circle cx={last[0]} cy={last[1]} r={13} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
// Valor de la curva en el mes fraccional i.
function kValor(i) { const d = KD(); const k = Math.max(0, Math.min(d.length - 2, Math.floor(i))); return klerp(d[k], d[k + 1], kclamp(i - k, 0, 1)); }

// Volcán en escudo (perfil ancho y bajo) con el observatorio en la ladera. cx = cima, alto en px, ancho = medio ancho.
function Escudo({ x, base = 1150, alto = 470, ancho = 700, lava = '#3b3536', erupcion = 0, T = 0, obs = true, nombre }) {
  const pts = []; for (let k = 0; k <= 60; k++) { const u = -1 + k / 30; pts.push([x + u * ancho, base - alto * Math.pow(Math.max(0, 1 - u * u), 1.5)]); }
  const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + ' Z';
  const hx = (u) => base - alto * Math.pow(Math.max(0, 1 - u * u), 1.5);
  const uo = -0.358, ox = x + uo * ancho, oy = hx(uo);              // 3,400 m de 4,169 m (≈ 0.815 de la altura)
  return <g>
    <path d={d} fill={lava} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* grietas de lava sin plantas */}
    {[-0.6, -0.25, 0.15, 0.5].map((u, i) => <path key={i} d={`M ${x + u * ancho} ${hx(u) + 30} l 30 40 l -20 40 l 25 50`} stroke="#211c1d" strokeWidth={5} fill="none" />)}
    {/* plantas solo abajo */}
    {Array.from({ length: 11 }, (_, i) => { const u = -0.95 + i * 0.19, tx = x + u * ancho, ty = base - 6; return Math.abs(u) > 0.7 ?
      <g key={i}><rect x={tx - 5} y={ty - 30} width={10} height={30} fill="#7a4a22" /><circle cx={tx} cy={ty - 44} r={26} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /></g> : null; })}
    {erupcion > 0 && <g>
      <path d={`M ${x - 40} ${base - alto + 4} Q ${x - 120} ${base - alto * 0.6} ${x - 170} ${base - alto * (0.6 - 0.5 * erupcion)}`} stroke="#ff5a1f" strokeWidth={22} fill="none" strokeLinecap="round" opacity={erupcion} />
      <path d={`M ${x + 30} ${base - alto + 4} Q ${x + 110} ${base - alto * 0.6} ${x + 160} ${base - alto * (0.6 - 0.45 * erupcion)}`} stroke="#ffb21f" strokeWidth={16} fill="none" strokeLinecap="round" opacity={erupcion} />
      {Array.from({ length: 9 }, (_, i) => { const u = ((T * 1.6 + i / 9) % 1); const sx = x - 60 + i * 15;
        return <circle key={i} cx={sx + Math.sin(i * 2.1) * 60 * u} cy={base - alto - 20 - 220 * u + 260 * u * u} r={14 - 8 * u} fill={i % 2 ? '#ffb21f' : '#ff5a1f'} stroke={KC.ink} strokeWidth={3} opacity={erupcion} />; })}
    </g>}
    {obs && <g transform={`translate(${ox} ${oy})`}>
      <rect x={-56} y={-46} width={70} height={46} fill="#f4f4f4" stroke={KC.ink} strokeWidth={5} />
      <path d="M -50 -46 a 30 22 0 0 1 58 0" fill="#e6e6e6" stroke={KC.ink} strokeWidth={5} />
      <rect x={20} y={-40} width={44} height={40} fill="#f4f4f4" stroke={KC.ink} strokeWidth={5} />
      <line x1={80} y1={0} x2={80} y2={-150} stroke={KC.ink} strokeWidth={7} />
      <line x1={80} y1={-150} x2={100} y2={-150} stroke={KC.ink} strokeWidth={7} />
    </g>}
    {nombre && <text x={x} y={base - 120} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{nombre}</text>}
  </g>;
}
// Posición del observatorio (la misma cuenta que dentro de Escudo).
const kObs = (x, base, alto, ancho) => { const u = -0.358; return [x + u * ancho, base - alto * Math.pow(1 - u * u, 1.5)]; };

// Molécula: 'N2' (dos azules), 'O2' (dos rojas), 'Ar' (una gris), 'CO2' (lineal O=C=O).
function Molecula({ tipo, x, y, rot = 0, s = 1, o = 1 }) {
  const r = 18;
  const bola = (cx, c) => <g><circle cx={cx} cy={0} r={r} fill={c} stroke={KC.ink} strokeWidth={4} /><circle cx={cx - 6} cy={-6} r={5} fill="#fff" opacity=".5" /></g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {tipo === 'N2' && <>{bola(-14, '#4f8cff')}{bola(14, '#4f8cff')}</>}
    {tipo === 'O2' && <>{bola(-14, '#ff5a4f')}{bola(14, '#ff5a4f')}</>}
    {tipo === 'Ar' && bola(0, '#b7bcc6')}
    {tipo === 'CO2' && <>{bola(-30, '#ff5a4f')}{bola(30, '#ff5a4f')}{bola(0, '#2a2a2a')}</>}
  </g>;
}
// Árbol de hoja caduca: hojas 0..1 (verano = 1, invierno = 0).
function Arbol({ x, y, s = 1, hojas = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 0 L -10 -120 L -50 -190 M -10 -120 L 10 -150 L 50 -210 M 10 -150 L 14 0" stroke="#7a4a22" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -12 0 L 12 0 L 10 -150 L -10 -120 Z" fill="#7a4a22" />
    <g opacity={hojas}>{[[-60, -200, 70], [40, -230, 80], [0, -170, 75], [-70, -140, 55], [70, -150, 55]].map(([cx, cy, r], i) =>
      <circle key={i} cx={cx} cy={cy} r={r * (0.6 + 0.4 * hojas)} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />)}</g>
    <g opacity={1 - hojas}>{[[-40, 10], [30, 6], [60, 12], [-70, 8]].map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy} rx={16} ry={7} fill="#a8692e" stroke={KC.ink} strokeWidth={3} />)}</g>
  </g>;
}
// Flecha de CO2 (entra o sale de algo).
function FlechaCO2({ x, y, ang = -90, largo = 110, o = 1, texto = 'CO2' }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    <line x1={0} y1={0} x2={largo} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <path d={`M ${largo + 18} 0 L ${largo - 10} -18 L ${largo - 10} 18 Z`} fill={KC.ink} />
    <text x={largo / 2} y={-16} textAnchor="middle" transform={`rotate(${-ang} ${largo / 2} -26)`} style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}
// Núcleo de hielo con burbujas atrapadas.
function NucleoHielo({ x, y, w = 340, h = 120, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#dff4ff" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={w / 2 - h / 4} cy={0} rx={h / 4} ry={h / 2 - 4} fill="#c3e8fb" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={-w / 2 + 40 + (i * 37) % (w - 90)} cy={((i * 53) % (h - 40)) - h / 2 + 20 + Math.sin(T * 2 + i) * 2} r={5 + (i % 3) * 3} fill="#fff" stroke="#6aa9c9" strokeWidth={3} />)}
  </g>;
}
// Íconos de combustibles fósiles: chimenea, coche y flama de gas.
function Fosiles({ x, y, T = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-170} y={-150} width={60} height={150} fill="#b04a3a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-200} y={-60} width={120} height={60} fill="#c9653f" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => { const u = ((T * 0.8 + i / 3) % 1); return <circle key={i} cx={-140 + u * 40} cy={-170 - u * 120} r={24 + u * 22} fill="#8d8f96" stroke={KC.ink} strokeWidth={4} opacity={1 - u * 0.7} />; })}
    <g transform="translate(20 0)"><rect x={-60} y={-46} width={130} height={34} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
      <path d="M -36 -46 L -18 -76 L 34 -76 L 50 -46 Z" fill="#7fb2ff" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-28} cy={-10} r={15} fill={KC.ink} /><circle cx={42} cy={-10} r={15} fill={KC.ink} />
      {[0, 1].map((i) => { const u = ((T * 1.2 + i / 2) % 1); return <circle key={i} cx={-80 - u * 50} cy={-24 - u * 20} r={8 + u * 12} fill="#9aa0a8" opacity={1 - u} />; })}</g>
    <g transform="translate(190 0)"><rect x={-40} y={-16} width={80} height={16} fill="#555" stroke={KC.ink} strokeWidth={4} />
      <path d={`M 0 -${90 + Math.sin(T * 9) * 8} Q 40 -40 0 -16 Q -40 -40 0 -${90 + Math.sin(T * 9) * 8} Z`} fill="#3d7bff" stroke={KC.ink} strokeWidth={4} />
      <path d="M 0 -60 Q 18 -36 0 -20 Q -18 -36 0 -60 Z" fill="#9fd0ff" /></g>
  </g>;
}

function kMolPos(i, T) { const r = krng(100 + i); let bx = 210 + r() * 660, by = 690 + r() * 420; if (i === 17) { bx = 560; by = 880; } else if (Math.abs(bx - 560) < 110 && Math.abs(by - 880) < 90) { bx += bx < 560 ? -130 : 130; } const f1 = 0.8 + r(), f2 = 0.7 + r(), g = r() - 0.5;
  return [bx + Math.sin(T * f1 + i) * 18, by + Math.cos(T * f2 + i) * 16, T * 40 * g + i * 30]; }

function KeelingShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Volcan, Pp: CUES.Ppm, I: CUES.Inicio, Re: CUES.Respira, P: CUES.Pregunta, E: CUES.Estudio, H: CUES.Hoy, A: CUES.Antes, Vz: CUES.Volcanazo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const N = KD().length;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // Gancho: la curva completa se dibuja en 4.6 s
  const hG = (N - 1) * kprog(T, K.G + 0.15, K.G + 4.6, kEase.suave);
  // Respira: 1958–1960 (34 meses) en lupa
  const hR = 33 * kprog(T, K.Re + 0.2, K.P - 0.3);
  const veranoR = kValor(hR + 0.5) < kValor(hR);           // baja = verano del norte (las plantas absorben)
  // Pregunta: sigue hasta 2000
  const hP = klerp(34, 12 * 42 + 10, kprog(T, K.P - 0.2, K.E - 0.2, kEase.suave));
  // Hoy: la curva se completa
  const hH = (N - 1) * kprog(T, K.H - 0.3, K.H + 1.8, kEase.suave);
  const fosil = K.A + 4.4;
  const box = { x: 150, y: 690, w: 840, h: 400 };
  const iErup = (2022 - 1958) * 12 + 8;                       // nov 2022 (índice)
  const X = (a) => box.x + (a - 1958) / (2026 - 1958) * box.w, Y = (v) => box.y + box.h - (v - 260) / 180 * box.h;
  const [ox, oy] = kObs(540, 1150, 470, 700);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la línea se dibuja */}
      <Escena T={T} a={K.G} b={K.V}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Grafica T={T} box={box} hasta={hG} />
          <text x={box.x - 10} y={box.y - 40} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>CO2 en el aire (ppm)</text></>)}
      </Escena>
      {/* 2 · el observatorio de Mauna Loa */}
      <Escena T={T} a={K.V} b={K.Pp} zoom={0.03} origen="30% 55%">
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe3ff 0%, #c9f3ff 55%, #2f8fd8 60%, #1f6fb8 100%)' }}></div>
        {svg(<><Escudo x={540} T={T} />
          {/* aire que entra a la toma */}
          {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.9 + i / 4) % 1); return <path key={i} d={`M ${ox + 250 - u * 140} ${oy - 150 + Math.sin(i) * 20} q -20 -12 -40 0`} stroke="#fff" strokeWidth={6} fill="none" opacity={kprog(T, K.V + 1, K.V + 1.4) * (1 - u)} />; })}
          {/* regla de altura */}
          <g opacity={kprog(T, K.V + 1.2, K.V + 1.8)}>
            <line x1={90} y1={1150} x2={90} y2={1150 - (1150 - oy) * kprog(T, K.V + 1.2, K.V + 2.4, kEase.sale)} stroke={KC.ink} strokeWidth={8} />
            {[0, 1, 2, 3].map((k) => <line key={k} x1={78} y1={1150 - k * (1150 - oy) / 3.4} x2={102} y2={1150 - k * (1150 - oy) / 3.4} stroke={KC.ink} strokeWidth={5} />)}
            <line x1={90} y1={oy} x2={ox - 60} y2={oy} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={kprog(T, K.V + 2.4, K.V + 2.8)} />
          </g></>)}
        <Etq T={T} at={K.V + 2.4} until={K.Pp - 0.2} x={100} y={(1150 + oy) / 2 + 40} texto="3,400 m" tam={40} color={KC.texto} />
        <Etq T={T} at={K.V + 0.6} until={K.Pp - 0.2} x={ox + 60} y={oy - 200} texto="observatorio" lado="izq" tam={30} color={KC.ink} />
        <Etq T={T} at={K.V + 3.4} until={K.Pp - 0.2} x={540} y={1000} texto="lava sin plantas" lado="der" tam={30} color={KC.texto} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 3 · partes por millón: micro */}
      <Escena T={T} a={K.Pp} b={K.I} fondo={KC.noche}>
        {svg(<>
          <g opacity={1 - kprog(T, K.Pp + 2.6, K.Pp + 3.1)}>
            <rect x={150} y={640} width={780} height={520} rx={26} fill="rgba(255,255,255,.06)" stroke="#9fd7ff" strokeWidth={6} strokeDasharray="22 14" />
            {Array.from({ length: 42 }, (_, i) => { const tipo = i === 17 ? 'CO2' : i === 30 ? 'Ar' : i % 5 === 0 ? 'O2' : 'N2'; const [mx, my, mr] = kMolPos(i, T);
              return <Molecula key={i} tipo={tipo} x={mx} y={my} rot={mr} />; })}
            {(() => { const [mx, my] = kMolPos(17, T); return <circle cx={mx} cy={my} r={58} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={kprog(T, K.Pp + 1.0, K.Pp + 1.4)} />; })()}
          </g>
          <g opacity={kprog(T, K.Pp + 2.8, K.Pp + 3.3)}>
            <defs><pattern id="kgrid" x={240} y={560} width={6} height={6} patternUnits="userSpaceOnUse"><circle cx={3} cy={3} r={2} fill="#7fa6c9" /></pattern></defs>
            <rect x={240} y={560} width={600} height={600} fill="url(#kgrid)" />
            {[[3, 71], [52, 18], [77, 88], [29, 46]].map(([c, f], i) => <g key={i}><circle cx={240 + c * 6 + 3} cy={560 + f * 6 + 3} r={4} fill={KC.yellow} />
              <circle cx={240 + c * 6 + 3} cy={560 + f * 6 + 3} r={22} fill="none" stroke={KC.yellow} strokeWidth={5} opacity={kprog(T, K.Pp + 3.4 + i * 0.25, K.Pp + 3.7 + i * 0.25)} /></g>)}
          </g></>)}
        <Etq T={T} at={K.Pp + 0.4} until={K.Pp + 2.6} x={160} y={600} texto="N2 · O2 · Ar · CO2" tam={30} />
        <Etq T={T} at={K.Pp + 1.2} until={K.Pp + 2.6} x={720} y={600} texto="esquema" tam={26} color={KC.gold2} />
        <Chip T={T} at={K.Pp + 0.3} until={K.Pp + 2.7} texto="ppm = partes por millón" y={470} x={540} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Pp + 3.0} until={K.I - 0.2} texto="10,000 moléculas · hoy ≈ 4 son CO2" y={470} x={540} tam={34} borde={KC.yellow} />
      </Escena>
      {/* 4 · el primer día: 313 */}
      <Escena T={T} a={K.I} b={K.Re}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Grafica T={T} box={box} hasta={0} pluma={false} />
          <circle cx={X(1958.2)} cy={Y(313)} r={16 * kprog(T, K.I + 0.3, K.I + 0.7, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></>)}
        <Etq T={T} at={K.I + 0.6} until={K.Re - 0.2} x={X(1958.2) + 20} y={Y(313) - 40} texto="marzo 1958 · 313 ppm" tam={30} color={KC.ink} />
        <NumeroGigante T={T} at={K.I + 0.4} until={K.Re - 0.2} valor={313} desde={250} dur={1.0} etiqueta="el primer día:" x={360} y={500} tam={220} color={KC.red} />
      </Escena>
      {/* 5 · la curva respira (1958–1960) */}
      <Escena T={T} a={K.Re} b={K.P}>
        <FondoLunares color={veranoR ? KC.mint : KC.orange} />
        {svg(<><Grafica T={T} box={box} a0={1958.1} a1={1961.05} y0={311} y1={322} ticksY={[312, 316, 320]} ticksX={[1959, 1960, 1961]} hasta={hR} />
          <Arbol x={700} y={600} s={1.05} hojas={veranoR ? 1 : 0} />
          <FlechaCO2 x={veranoR ? 960 : 760} y={veranoR ? 380 : 380} ang={veranoR ? 180 : 0} largo={130} o={kprog(T, K.Re + 0.5, K.Re + 0.9)} />
          <text x={320} y={540} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={8} paintOrder="stroke">{veranoR ? 'verano del norte' : 'invierno del norte'}</text>
          <text x={320} y={590} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{veranoR ? 'las hojas lo absorben' : 'las hojas se pudren'}</text></>)}
        <Etq T={T} at={K.Re + 1.2} until={K.P - 0.2} x={(box.x + (1958.37 - 1958.1) / 2.95 * box.w) + 10} y={box.y + box.h - (317.51 - 311) / 11 * box.h - 30} texto="mayo: máximo" tam={26} color={KC.ink} />
        <Etq T={T} at={K.Re + 2.2} until={K.P - 0.2} x={(box.x + (1958.79 - 1958.1) / 2.95 * box.w) + 10} y={box.y + box.h - (312.42 - 311) / 11 * box.h + 10} texto="sep–oct: mínimo" tam={26} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta: ¿por qué no deja de subir? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Grafica T={T} box={{ x: 200, y: 340, w: 780, h: 230 }} ticksY={[300, 400]} ticksX={[]} hasta={hP} tamTick={22} grosor={5} />
          <text x={830} y={1120} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 830 950)`}>?</text></>)}
      </Escena>
      {/* 7 · el estudio: Keeling, Scripps, 1960 */}
      <Escena T={T} a={K.E} b={K.H}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g transform="rotate(1.5 540 930)">
          <rect x={150} y={740} width={780} height={400} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
          <text x={190} y={795} style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">Tellus · 1960</text>
          <Grafica T={T} box={{ x: 240, y: 830, w: 640, h: 240 }} a0={1958.1} a1={1960.1} y0={311} y1={321} ticksY={[]} ticksX={[1959, 1960]} hasta={22 * kprog(T, K.E + 0.6, K.E + 3.5)} tamTick={22} grosor={5} fondo="rgba(255,255,255,0)" />
        </g>)}
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.H - 0.2} anio="1960" quien="Charles David Keeling" revista="Scripps · revista Tellus" x={380} y={470} />
        <Chip T={T} at={K.E + 3.4} until={K.H - 0.2} texto="la Tierra respira" y={705} x={290} tam={32} borde={KC.leaf} />
        <Chip T={T} at={K.E + 4.6} until={K.H - 0.2} texto="y va en aumento" y={705} x={650} tam={32} borde={KC.red} />
      </Escena>
      {/* 8 y 9 · hoy (427) y antes de la industria (280) */}
      <Escena T={T} a={K.H} b={K.Vz}>
        <FondoLunares color={T < fosil ? KC.cyan : KC.yellow} />
        {svg(<><Grafica T={T} box={box} hasta={hH} base280={kprog(T, K.A + 0.6, K.A + 1.8, kEase.sale)} pluma={T < K.A} />
          <circle cx={X(2025.5)} cy={Y(427.35)} r={15 * kprog(T, K.H + 1.8, K.H + 2.2, kEase.rebote)} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          <g opacity={kprog(T, K.A + 0.8, K.A + 1.2) * (1 - kprog(T, fosil - 0.3, fosil))}><NucleoHielo x={760} y={470} T={T} /></g>
          <Fosiles x={770} y={590} T={T} o={kprog(T, fosil, fosil + 0.4)} /></>)}
        <NumeroGigante T={T} at={K.H + 0.5} until={K.A - 0.1} valor={427} desde={313} dur={1.4} etiqueta="promedio de 2025:" x={420} y={500} tam={210} color={KC.yellow} />
        <Etq T={T} at={K.H + 2.0} until={K.Vz - 0.2} x={X(2025.5) - 10} y={930} texto="2025: 427 ppm" lado="izq" tam={30} color={KC.ink} />
        <Etq T={T} at={K.A + 1.2} until={K.Vz - 0.2} x={box.x + 20} y={Y(280) - 30} texto="antes de la industria: ≈ 280" tam={28} color="#1d4fa8" />
        <Etq T={T} at={K.A + 1.0} until={fosil - 0.3} x={600} y={570} texto="burbujas en el hielo" lado="der" tam={28} color={KC.ink} />
        <Chip T={T} at={fosil + 0.3} until={K.Vz - 0.2} texto="sobre todo: combustibles fósiles" y={660} x={640} tam={30} borde={KC.ink} />
      </Escena>
      {/* 10 · la erupción: midieron desde Maunakea */}
      <Escena T={T} a={K.Vz} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#ffb48a 0%, #ffe0c2 55%, #2f8fd8 60%, #1f6fb8 100%)' }}></div>
        {svg(<><Escudo x={820} base={1150} alto={440} ancho={300} lava="#5b5560" obs={false} nombre="Maunakea" />
          <Escudo x={330} base={1150} alto={400} ancho={430} T={T} erupcion={kprog(T, K.Vz + 0.3, K.Vz + 1.2)} nombre="Mauna Loa" />
          {(() => { const [ax, ay] = kObs(330, 1150, 400, 430), bx = 820 - 0.3 * 300, by = 1150 - 440 * Math.pow(1 - 0.09, 1.5), p = kprog(T, K.Vz + 2.2, K.Vz + 3.2, kEase.sale);
            return <g opacity={p > 0 ? 1 : 0}>
              <path d={`M ${ax + 40} ${ay - 60} Q ${(ax + bx) / 2} ${ay - 320} ${klerp(ax + 40, bx, p)} ${klerp(ay - 60, by - 40, p) - Math.sin(p * Math.PI) * 120}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeDasharray="20 12" />
              <g transform={`translate(${bx} ${by})`} opacity={kprog(T, K.Vz + 3.0, K.Vz + 3.3)}>
                <rect x={-36} y={-40} width={72} height={40} fill="#f4f4f4" stroke={KC.ink} strokeWidth={5} /><path d="M -30 -40 a 30 22 0 0 1 60 0" fill="#e6e6e6" stroke={KC.ink} strokeWidth={5} />
              </g></g>; })()}</>)}
        <Chip T={T} at={K.Vz + 0.8} until={K.C - 0.2} texto="nov 2022 – jul 2023" y={450} x={330} tam={34} borde={KC.red} />
        <Chip T={T} at={K.Vz + 3.0} until={K.C - 0.2} texto="Maunakea: ≈ 34 km al norte" y={545} x={380} tam={30} borde={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 11 · cierre: la misma línea del inicio, ya completa */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Grafica T={T} box={box} hasta={N - 1} base280={1} pluma={false} />
          <circle cx={X(1958.2)} cy={Y(313)} r={13} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          <circle cx={X(2025.5)} cy={Y(427.35)} r={15} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /></>)}
        <Etq T={T} at={K.C + 0.6} until={K.Ou - 0.1} x={X(1958.2) + 10} y={870} texto="1958: 313" tam={30} color={KC.ink} />
        <Etq T={T} at={K.C + 1.0} until={K.Ou - 0.1} x={X(2025.5) - 10} y={930} texto="2025: 427" lado="izq" tam={30} color={KC.ink} />
        <Etq T={T} at={K.C + 1.4} until={K.Ou - 0.1} x={box.x + 20} y={Y(280) - 30} texto="≈ 280" tam={28} color="#1d4fa8" />
        <Chip T={T} at={K.C + 0.3} until={K.Ou - 0.1} texto="el aire que respiras" y={500} x={680} tam={38} borde={KC.yellow} />
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="Esta línea es *el aire que respiras.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Pp - 0.1} texto="Mauna Loa: *3,400 metros,* lava sin plantas." />
      <Subtitulo T={T} idx={2} at={K.Pp + 0.1} until={K.I - 0.1} texto="CO2 en *partes por millón.*" />
      <Subtitulo T={T} idx={3} at={K.I + 0.1} until={K.Re - 0.1} texto="El primer día: *313.*" />
      <Subtitulo T={T} idx={4} at={K.Re + 0.1} until={K.P - 0.1} texto="No sube derecha: *respira.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por qué *no deja de subir?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.H - 0.1} texto="Keeling, 1960: *va en aumento.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.A - 0.1} texto="2025: *427* en promedio." />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.Vz - 0.1} texto="Antes: *unas 280.* Sube por *combustibles fósiles.*" />
      <Subtitulo T={T} idx={9} at={K.Vz + 0.1} until={K.C - 0.1} texto="Erupción: *midieron desde Maunakea.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="El aire que respiras: *más CO2 cada año.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Volcan + 1.3, CUES.Ppm - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Inicio + 0.3, CUES.Respira + 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.5, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Estudio + 3.1, CUES.Hoy - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Antes + 0.7, CUES.Antes + 5.7, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Volcanazo + 1.6, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'izq-alto']]} />
      <MarcaAgua T={T} tema="fisica" num="37" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function KeelingApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><KeelingShot /></CompositionStage></div>;
}
window.KeelingApp = KeelingApp;
