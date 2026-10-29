// Shot Fungi Mati #13 · Champiñones al sol: la fábrica de vitamina D — NARRADO (gancho 1 "Esto no es X: es Y" + N1/N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const VD = { blanco:'#f6f0e4', sombra:'#dccdb3', lam:'#b9897a', lam2:'#8a5a4c', carne:'#fbf6ec', madera:'#c98a4b', madera2:'#a96d34',
  uv:'#b05cff', uv2:'#e2b8ff', sol:'#ffd23a', foco:'#fff36b', salmon:'#ff8a5c', sangre:'#d7263d', metal:'#c9d1d9' };

// Champiñón (Agaricus bisporus) de perfil: sombrero blanco redondo, pie corto y grueso, anillo, laminillas rosado-cafés.
// focos 0..1 = puntos de vitamina D que se encienden en el sombrero.
function Champi({ T = 0, x, y, s = 1, crece = 1, focos = 0, rot = 0 }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1)), r = 150 * (0.4 + 0.6 * c), h = 130 * c;
  const PTS = [[-0.55, -0.55], [0.1, -0.85], [0.6, -0.5], [-0.15, -0.35], [0.35, -0.95], [-0.75, -0.25], [0.78, -0.2], [-0.35, -0.85]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={r * 0.9} ry={16} fill="rgba(0,0,0,.18)" />
    <path d={`M -38 0 C -36 ${-h * 0.5} -32 ${-h * 0.8} -30 ${-h} L 30 ${-h} C 32 ${-h * 0.8} 36 ${-h * 0.5} 38 0 Z`} fill={VD.carne} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M -36 ${-h * 0.7} Q 0 ${-h * 0.58} 36 ${-h * 0.7} L 40 ${-h * 0.6} Q 0 ${-h * 0.48} -40 ${-h * 0.6} Z`} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${-r * 0.92} ${-h - 6} Q 0 ${-h + r * 0.22} ${r * 0.92} ${-h - 6}`} fill={VD.lam} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-r} ${-h - 4} C ${-r} ${-h - r * 1.05} ${r} ${-h - r * 1.05} ${r} ${-h - 4} Q 0 ${-h + r * 0.06} ${-r} ${-h - 4} Z`} fill={VD.blanco} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M ${-r * 0.6} ${-h - r * 0.62} Q ${-r * 0.15} ${-h - r * 0.8} ${r * 0.25} ${-h - r * 0.7}`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".8" />
    {focos > 0 && PTS.map(([u, v], i) => { const k = kprog(focos, i / PTS.length, (i + 1) / PTS.length, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${u * r} ${-h - 4 + v * r * 0.78}) scale(${k})`}>
      <circle r={22 + 4 * Math.sin(T * 5 + i)} fill={VD.foco} opacity=".45" />
      <circle r={15} fill={VD.foco} stroke={KC.ink} strokeWidth={4} />
      <text y={7} textAnchor="middle" style={{ font:`400 22px ${KF.titulo}` }} fill={KC.ink}>D</text></g> : null; })}
  </g>;
}
// Rebanada vertical de champiñón (vista de frente, acostada al sol). brillo 0..1 = vitamina D que aparece.
function Rebanada({ T = 0, x, y, s = 1, rot = 0, brillo = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={-40} rx={110} ry={90} fill={VD.foco} opacity={0.35 * brillo + 0.06 * Math.sin(T * 5 + seed)} />}
    <path d="M -95 -40 C -95 -130 95 -130 95 -40 Q 95 -22 70 -22 L 26 -22 L 30 60 Q 0 70 -30 60 L -26 -22 L -70 -22 Q -95 -22 -95 -40 Z" fill={VD.carne} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -86 -34 Q -60 -40 -28 -34 L -28 -24 L -70 -24 Q -84 -24 -86 -34 Z M 86 -34 Q 60 -40 28 -34 L 28 -24 L 70 -24 Q 84 -24 86 -34 Z" fill={VD.lam2} />
    <path d="M -70 -80 Q -10 -112 50 -86" stroke="#efe4cf" strokeWidth={8} fill="none" strokeLinecap="round" />
    {brillo > 0.2 && [[-40, -70], [20, -78], [55, -52], [0, 20]].map(([u, v], i) => { const k = kprog(brillo, 0.2 + i * 0.18, 0.4 + i * 0.18, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${u} ${v}) scale(${k})`}>
      <circle r={13} fill={VD.foco} stroke={KC.ink} strokeWidth={3} /><text y={6} textAnchor="middle" style={{ font:`400 18px ${KF.titulo}` }} fill={KC.ink}>D</text></g> : null; })}
  </g>;
}
// Sol con rayos que giran.
function Sol({ T, x, y, r = 90, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r * 1.9} fill={VD.sol} opacity=".18" />
    <g transform={`rotate(${T * 20})`}>{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-9} y={-r * 1.65} width={18} height={r * 0.45} rx={9} fill={VD.sol} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />)}</g>
    <circle r={r} fill={VD.sol} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.25} fill="#fff6b0" opacity=".8" />
  </g>;
}
// Rayo ultravioleta ondulado de (x1,y1) a (x2,y2). p 0..1 = cuánto ha avanzado.
function RayoUV({ T, x1, y1, x2, y2, p = 1, color = VD.uv, ancho = 9, fase = 0 }) {
  if (p <= 0) return null;
  const N = 40, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const pts = []; for (let i = 0; i <= N * p; i++) { const u = i / N, w = Math.sin(u * L / 26 - T * 12 + fase) * 12; pts.push(`${(x1 + dx * u + nx * w).toFixed(1)} ${(y1 + dy * u + ny * w).toFixed(1)}`); }
  if (pts.length < 2) return null;
  return <g><path d={'M ' + pts.join(' L ')} stroke={KC.ink} strokeWidth={ancho + 6} fill="none" strokeLinecap="round" opacity=".6" />
    <path d={'M ' + pts.join(' L ')} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" style={{ filter:`drop-shadow(0 0 8px ${color})` }} /></g>;
}
// Tabla de picar.
function Tabla({ x, y, w = 760, h = 150 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 70} y={-h / 2 + 30} width={110} height={70} rx={30} fill={VD.madera2} stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill={VD.madera} stroke={KC.ink} strokeWidth={8} />
    {[0.25, 0.5, 0.75].map((u, i) => <path key={i} d={`M ${-w / 2 + 40} ${-h / 2 + h * u} Q 0 ${-h / 2 + h * u + 10} ${w / 2 - 40} ${-h / 2 + h * u}`} stroke={VD.madera2} strokeWidth={4} fill="none" />)}
  </g>;
}
// Esterol esquemático (ergosterol): anillos A-B-C de seis lados, D de cinco y cola.
// abre 0..1 = la luz UV abre el anillo B (previtamina D2); abre 1..2 = el anillo A gira (vitamina D2).
function Esterol({ x, y, s = 1, rot = 0, abre = 0, color = KC.gold2, grosor = 9, cola = true, ho = true }) {
  const L = 46, r3 = Math.sqrt(3);
  const hexV = (cx, cy) => Array.from({ length: 6 }, (_, k) => { const a = (-90 + 60 * k) * Math.PI / 180; return [cx + L * Math.cos(a), cy + L * Math.sin(a)]; });
  const A = hexV(0, 0), B = hexV(r3 * L, 0), Cc = [r3 * L + 0.866 * L, -1.5 * L], C = hexV(Cc[0], Cc[1]);
  const xe = Cc[0] + 0.866 * L, pc = [xe + 0.688 * L, Cc[1]], R5 = 0.851 * L;
  const D = [216, 288, 0, 72, 144].map((g) => [pc[0] + R5 * Math.cos(g * Math.PI / 180), pc[1] + R5 * Math.sin(g * Math.PI / 180)]);
  const poly = (P, cerrado = true) => 'M ' + P.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + (cerrado ? ' Z' : '');
  const o1 = kclamp(abre, 0, 1), o2 = kclamp(abre - 1, 0, 1);
  const piv = A[2], angA = -28 * kEase.suave(o1) - 115 * kEase.suave(o2);
  const tail = [D[1]]; for (let i = 1; i <= 5; i++) tail.push([D[1][0] + i * 38, D[1][1] - 26 - (i % 2) * 26 - i * 6]);
  const st = { stroke: color, strokeWidth: grosor, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round' };
  const sombra = { ...st, stroke: KC.ink, strokeWidth: grosor + 7 };
  const cuerpo = (S) => <>
    <path d={poly([B[5], B[4], B[3], B[2], B[1], B[0]], false)} {...S} />
    {o1 < 1 && <path d={poly([B[0], B[5]], false)} {...S} opacity={1 - o1} />}
    <path d={poly(C)} {...S} /><path d={poly(D)} {...S} />
    {cola && <path d={poly(tail, false)} {...S} />}
  </>;
  const anilloA = (S) => <g transform={`rotate(${angA} ${piv[0]} ${piv[1]})`}><path d={poly(A)} {...S} />
    {ho && S.stroke !== KC.ink && <text x={A[4][0] - 70} y={A[4][1] + 34} style={{ font:`700 34px ${KF.mono}` }} fill={color}>HO</text>}</g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {cuerpo(sombra)}{anilloA(sombra)}{cuerpo(st)}{anilloA(st)}
    {o1 < 0.5 && <path d={poly([[B[3][0] + 9, B[3][1] - 8], [B[2][0] - 9, B[2][1] - 4]], false)} {...st} strokeWidth={grosor * 0.6} opacity={1 - o1 * 2} />}
  </g>;
}
// Bicapa de la membrana (fondo oscuro): cabezas y colas, con ergosterol metido entre las colas.
function Membrana({ T, y0 = 760, alto = 380, ergo = 1 }) {
  const n = 18, paso = KW / n, cab = [];
  for (let i = 0; i <= n; i++) {
    const x = i * paso + 20, m = Math.sin(T * 2 + i) * 4;
    cab.push(<g key={'s' + i}><line x1={x - 8} y1={y0 + 24} x2={x - 10 + m} y2={y0 + alto / 2 - 14} stroke="#ffd9a8" strokeWidth={5} /><line x1={x + 8} y1={y0 + 24} x2={x + 10 - m} y2={y0 + alto / 2 - 14} stroke="#ffd9a8" strokeWidth={5} />
      <circle cx={x} cy={y0 + 14} r={20} fill="#4fc3f7" stroke={KC.ink} strokeWidth={4} /></g>);
    cab.push(<g key={'i' + i}><line x1={x - 8} y1={y0 + alto - 24} x2={x - 10 - m} y2={y0 + alto / 2 + 14} stroke="#ffd9a8" strokeWidth={5} /><line x1={x + 8} y1={y0 + alto - 24} x2={x + 10 + m} y2={y0 + alto / 2 + 14} stroke="#ffd9a8" strokeWidth={5} />
      <circle cx={x} cy={y0 + alto - 14} r={20} fill="#4fc3f7" stroke={KC.ink} strokeWidth={4} /></g>);
  }
  const er = [2, 6, 10, 14].map((i, k) => { const on = kprog(ergo, k * 0.2, k * 0.2 + 0.3, kEase.rebote); return on > 0 ?
    <g key={'e' + k} transform={`translate(${i * paso + 20 + paso / 2} ${y0 + 70 + Math.sin(T * 1.5 + k) * 6}) scale(${on})`}><Esterol x={0} y={0} s={0.6} rot={90} cola={false} ho={false} grosor={12} color={KC.yellow} /></g> : null; });
  return <g>{cab}{er}</g>;
}
// Bandeja de metal con rebanadas al sol.
function Charola({ T, x, y, brillo = 0, n = 6 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-400} y={-170} width={800} height={340} rx={26} fill={VD.metal} stroke={KC.ink} strokeWidth={8} />
    <rect x={-375} y={-145} width={750} height={290} rx={18} fill="#e6ebf0" stroke={KC.ink} strokeWidth={3} />
    {Array.from({ length: n }, (_, i) => <Rebanada key={i} T={T} x={-250 + (i % 3) * 250} y={-60 + Math.floor(i / 3) * 150} s={0.62} rot={(i % 2 ? 8 : -6)} brillo={brillo} seed={i} />)}
  </g>;
}
// Filete de salmón.
function Salmon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -40 Q -60 -95 150 -60 Q 190 -20 160 40 Q -20 90 -170 50 Q -200 5 -170 -40 Z" fill={VD.salmon} stroke={KC.ink} strokeWidth={7} />
    {[-110, -50, 10, 70, 125].map((dx, i) => <path key={i} d={`M ${dx} -60 Q ${dx + 25} 0 ${dx} 55`} stroke="#ffd6c2" strokeWidth={7} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Tubo de sangre que se llena.
function Tubo({ x, y, nivel = 0, color = VD.sangre }) {
  const H = 420, h = H * kclamp(nivel, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-H - 50} width={120} height={50} rx={10} fill={KC.violet} stroke={KC.ink} strokeWidth={6} />
    <path d={`M -50 ${-H} L -50 -40 Q -50 20 0 20 Q 50 20 50 -40 L 50 ${-H}`} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
    {h > 0 && <path d={`M -42 ${-h + 10} L -42 -40 Q -42 12 0 12 Q 42 12 42 -40 L 42 ${-h + 10} Z`} fill={color} />}
    {[0.25, 0.5, 0.75].map((u, i) => <line key={i} x1={30} y1={-H * u} x2={50} y2={-H * u} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Refri con calendario de 7 días que se van tachando (dias 0..7).
function Refri({ x, y, dias = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-210} y={-380} width={420} height={760} rx={36} fill="#eaf6ff" stroke={KC.ink} strokeWidth={9} />
    <line x1={-210} y1={-120} x2={210} y2={-120} stroke={KC.ink} strokeWidth={7} />
    <rect x={150} y={-330} width={22} height={160} rx={10} fill={VD.metal} stroke={KC.ink} strokeWidth={5} />
    <rect x={150} y={-60} width={22} height={200} rx={10} fill={VD.metal} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-60} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>4 °C</text>
    {Array.from({ length: 7 }, (_, i) => { const on = dias > i; return <g key={i} transform={`translate(${-150 + (i % 4) * 92} ${30 + Math.floor(i / 4) * 100})`}>
      <rect x={-34} y={-34} width={74} height={74} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <text x={3} y={-6} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#7a7068">día</text>
      <text x={3} y={26} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
      {on && <path d="M -22 2 L -4 20 L 28 -20" stroke={KC.leaf} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />}</g>; })}
  </g>;
}
// Brazo (piel) al sol, de lado.
function Brazo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 40 Q -120 -20 60 -10 Q 140 -40 200 -30 Q 250 -20 240 20 Q 230 50 180 50 Q 110 70 60 60 Q -100 90 -230 110 Z" fill="#e7a87e" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -160 30 Q -60 0 40 10" stroke="#f6c9a6" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}

function VitaminaDShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Oscuras, E: CUES.Ergosterol, L: CUES.Luz, Pi: CUES.Piel, P: CUES.Pregunta, Es: CUES.Estudio, R: CUES.Resultado, Sa: CUES.Salmon, H: CUES.Hora, Cu: CUES.Cuerpo, Tr: CUES.Truco, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const rayo0 = kprog(T, K.G + 0.15, K.G + 0.7);
  const abre = kprog(T, K.L + 1.4, K.L + 2.4) + kprog(T, K.L + 3.0, K.L + 4.0);
  const reloj = kclamp((T - (K.R + 0.1)) / 2.4, 0, 1);
  const brilloCh = kprog(T, K.R + 0.3, K.R + 2.5);
  const enTruco = kprog(T, K.Tr + 2.2, K.Tr + 2.7);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el champiñón en la tabla; le pega el sol y se encienden los "focos" de vitamina D */}
      <Escena T={T} a={K.G} b={K.O} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sol T={T} x={200} y={520} r={80} o={kprog(T, K.G, K.G + 0.25)} />
          <RayoUV T={T} x1={260} y1={590} x2={470} y2={860} p={rayo0} color="#ff9d00" fase={0} />
          <RayoUV T={T} x1={290} y1={540} x2={560} y2={830} p={rayo0} color="#ff9d00" fase={2} />
          <Tabla x={540} y={1110} />
          <Champi T={T} x={470} y={1080} s={1.45} focos={kprog(T, K.G + 0.4, K.G + 2.6)} rot={mece(T, 2, 0.4) * 1.5} />
        </>)}
      </Escena>
      {/* 2 · a oscuras: cuarto de cultivo */}
      <Escena T={T} a={K.O} b={K.E} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#141a2e, #0b0f1c)' }}></div>
        {fsvg(<>
          {[760, 1060].map((yy, k) => <g key={k}>
            <rect x={60} y={yy} width={960} height={40} rx={8} fill="#5d4a3a" stroke={KC.ink} strokeWidth={6} />
            <rect x={60} y={yy - 30} width={960} height={34} fill="#3b2c22" />
            {Array.from({ length: 6 }, (_, i) => <Champi key={i} T={T} x={140 + i * 160} y={yy - 22} s={0.42 + ((i + k) % 3) * 0.05} crece={kprog(T, K.O + 0.2 + i * 0.12 + k * 0.3, K.O + 1.0 + i * 0.12 + k * 0.3)} />)}
          </g>)}
          <rect x={0} y={0} width={KW} height={KH} fill="#05070d" opacity=".35" />
          <circle cx={540} cy={430} r={60} fill="none" stroke="#ffffff" strokeWidth={8} opacity=".25" />
          <line x1={500} y1={390} x2={580} y2={470} stroke="#ffffff" strokeWidth={8} opacity=".25" />
        </>)}
      </Escena>
      {/* 3 · al microscopio: la membrana con ergosterol, que se parece al colesterol */}
      <Escena T={T} a={K.E} b={K.L} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g opacity={1 - 0.9 * kprog(T, K.E + 2.2, K.E + 2.7)}><Membrana T={T} y0={640} alto={360} ergo={kprog(T, K.E + 0.6, K.E + 2.0)} /></g>
          <g opacity={kprog(T, K.E + 2.3, K.E + 2.8)}>
            <Esterol x={110} y={900} s={0.75} color={KC.gold2} />
            <Esterol x={660} y={900} s={0.75} color="#9fd8ff" />
            <text x={560} y={930} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.texto}>≈</text>
          </g>
        </>)}
      </Escena>
      {/* 4 · la luz UV abre un anillo: previtamina D2 → vitamina D2 */}
      <Escena T={T} a={K.L} b={K.Pi} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {[0, 1, 2].map((i) => <RayoUV key={i} T={T} x1={60 + i * 90} y1={330 + i * 40} x2={420 + i * 40} y2={760 + i * 30} p={kprog(T, K.L + 0.2 + i * 0.15, K.L + 1.2 + i * 0.15)} fase={i * 2} />)}
          <Esterol x={250} y={960} s={1.6} abre={abre} color={abre >= 1.9 ? KC.yellow : KC.gold2} />
          {abre > 1.9 && <circle cx={480} cy={900} r={330} fill={KC.yellow} opacity={0.08 + 0.04 * Math.sin(T * 5)} />}
        </>)}
      </Escena>
      {/* 5 · tu piel hace casi lo mismo: D3 */}
      <Escena T={T} a={K.Pi} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Sol T={T} x={540} y={560} r={70} />
          <RayoUV T={T} x1={480} y1={640} x2={270} y2={900} p={kprog(T, K.Pi + 0.2, K.Pi + 0.9)} fase={0} />
          <RayoUV T={T} x1={600} y1={640} x2={800} y2={900} p={kprog(T, K.Pi + 0.6, K.Pi + 1.3)} fase={2} />
          <Rebanada T={T} x={260} y={1010} s={1.1} brillo={kprog(T, K.Pi + 0.6, K.Pi + 1.6)} />
          <Brazo x={800} y={990} s={1.0} />
          <line x1={540} y1={760} x2={540} y2={1160} stroke={KC.ink} strokeWidth={6} strokeDasharray="18 14" />
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Champi T={T} x={300} y={1150} s={0.9} /><Interrogacion T={T} x={300} y={880} tam={420} /></>)}
      </Escena>
      {/* 7–8 · el experimento de 2015: rebanadas al sol de mediodía, 15 minutos */}
      <Escena T={T} a={K.Es} b={K.Sa} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Sol T={T} x={130} y={700} r={60} o={kprog(T, K.Es + 1.6, K.Es + 2.1)} />
          <g opacity={kprog(T, K.Es + 1.4, K.Es + 2.0)} transform={`translate(0 ${klerp(80, 0, kprog(T, K.Es + 1.4, K.Es + 2.0, kEase.sale))})`}>
            <Charola T={T} x={540} y={980} brillo={brilloCh} />
          </g>
          {[0, 1, 2].map((i) => <RayoUV key={i} T={T} x1={200} y1={740 + i * 20} x2={330 + i * 230} y2={880} p={kprog(T, K.Es + 2.4 + i * 0.2, K.Es + 3.2 + i * 0.2)} fase={i} color="#ff7a00" />)}
        </>)}
      </Escena>
      {/* 9 · comparable al salmón y más de lo recomendado al día */}
      <Escena T={T} a={K.Sa} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const b0 = 1150, esc = 30, hC = 17.6 * esc * kprog(T, K.Sa + 1.0, K.Sa + 1.8, kEase.sale), hA = 15 * esc * kprog(T, K.Sa + 2.4, K.Sa + 3.1, kEase.sale);
            return <g>
              <line x1={80} y1={b0} x2={1000} y2={b0} stroke={KC.ink} strokeWidth={7} />
              <rect x={560} y={b0 - hC} width={150} height={hC} fill={VD.foco} stroke={KC.ink} strokeWidth={7} />
              <rect x={790} y={b0 - hA} width={150} height={hA} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
              {hC > 10 && <text x={635} y={b0 - hC - 18} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>17.6 µg</text>}
              {hA > 10 && <text x={865} y={b0 - hA - 18} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>15 µg</text>}
              {hC > 10 && <text x={635} y={b0 - hC - 80} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>champiñón al sol</text>}
              {hA > 10 && <text x={865} y={b0 - hA - 80} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>adulto, al día</text>}
            </g>; })()}
          <g opacity={kprog(T, K.Sa + 0.2, K.Sa + 0.7)}><Salmon x={260} y={880} s={1.05} /></g>
        </>)}
      </Escena>
      {/* 10 · más sol no es más vitamina: sube, se estanca y baja */}
      <Escena T={T} a={K.H} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={70} y={600} width={940} height={620} rx={30} fill="rgba(255,255,255,.88)" stroke={KC.ink} strokeWidth={8} />
          <line x1={150} y1={1110} x2={960} y2={1110} stroke={KC.ink} strokeWidth={7} /><line x1={150} y1={1110} x2={150} y2={660} stroke={KC.ink} strokeWidth={7} />
          {(() => { const pts = [[150, 1100], [380, 740], [500, 730], [660, 735], [760, 740], [940, 960]]; const u = kprog(T, K.H + 0.2, K.H + 2.8); const n = Math.max(2, Math.ceil(u * pts.length));
            return <path d={'M ' + pts.slice(0, n).map((p) => p.join(' ')).join(' L ')} stroke={KC.gold} strokeWidth={14} fill="none" strokeLinejoin="round" strokeLinecap="round" />; })()}
          <text x={265} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>1.ª hora</text>
          <text x={570} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>se estanca</text>
          <text x={860} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>2 h más</text>
          <text x={110} y={680} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} transform="rotate(-90 110 680)" textAnchor="end">vitamina D2</text>
        </>)}
      </Escena>
      {/* 11 · tu cuerpo la aprovecha: estudio pequeño de 2013 */}
      <Escena T={T} a={K.Cu} b={K.Tr} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g opacity={kprog(T, K.Cu + 2.8, K.Cu + 3.3)}>
          <Tubo x={330} y={1160} nivel={kprog(T, K.Cu + 3.4, K.Cu + 6.2, kEase.suave) * 0.8} />
          <Tubo x={750} y={1160} nivel={kprog(T, K.Cu + 3.4, K.Cu + 6.2, kEase.suave) * 0.8} />
          <Champi T={T} x={170} y={1080} s={0.45} />
          <g transform="translate(910 1000)"><rect x={-60} y={-26} width={120} height={52} rx={26} fill={KC.white} stroke={KC.ink} strokeWidth={6} /><rect x={-60} y={-26} width={60} height={52} rx={26} fill={KC.orange} stroke={KC.ink} strokeWidth={6} /></g>
        </g>)}
      </Escena>
      {/* 12 · truco: rebanados mejor que enteros; en el refri, una semana */}
      <Escena T={T} a={K.Tr} b={K.C} zoom={0.04}>
        <FondoLunares color={enTruco > 0.5 ? KC.lilac : KC.yellow} />
        {fsvg(<>
          <g opacity={1 - enTruco}>
            <Sol T={T} x={540} y={520} r={60} />
            <Champi T={T} x={270} y={1100} s={0.95} focos={kprog(T, K.Tr + 0.6, K.Tr + 1.6) * 0.35} />
            {[0, 1, 2].map((i) => <Rebanada key={i} T={T} x={700 + (i - 1) * 120} y={1020 + (i % 2) * 70} s={0.75} rot={(i - 1) * 10} brillo={kprog(T, K.Tr + 0.6, K.Tr + 1.8)} seed={i} />)}
          </g>
          {enTruco > 0 && <g opacity={enTruco} transform="translate(480 870) scale(.85) translate(-480 -870)"><Refri x={480} y={870} dias={kprog(T, K.Tr + 2.7, K.Tr + 4.0) * 7} /></g>}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma tabla del inicio, ahora rebanado al sol y con todos los focos */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sol T={T} x={200} y={520} r={80} />
          <RayoUV T={T} x1={260} y1={590} x2={470} y2={880} p={kprog(T, K.C + 0.2, K.C + 0.8)} color="#ff9d00" />
          <RayoUV T={T} x1={290} y1={540} x2={640} y2={860} p={kprog(T, K.C + 0.3, K.C + 0.9)} color="#ff9d00" fase={2} />
          <Tabla x={540} y={1110} />
          {[0, 1, 2, 3].map((i) => <Rebanada key={i} T={T} x={300 + i * 160} y={1050 + (i % 2) * 12} s={0.85} rot={(i - 1.5) * 7} brillo={kprog(T, K.C + 0.6 + i * 0.25, K.C + 1.6 + i * 0.25)} seed={i} />)}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.6} until={K.O - 0.3} texto="vitamina D" x={300} y={700} tam={46} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.2} until={K.O - 0.3} x={1040} y={950} lado="izq" texto="champiñón" tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 2.5} until={K.O - 0.3} x={1040} y={1000} lado="izq" texto="Agaricus bisporus" it tam={30} color={KC.ink} />
      <Medidor T={T} at={K.O + 0.4} until={K.E - 0.3} valor={0.03} etiqueta="vitamina D" texto={() => '< 1 µg / 100 g (fresco)'} x={360} ancho={660} y={470} color={KC.yellow} />
      <Chip T={T} at={K.O + 1.6} until={K.E - 0.3} texto="algunos de tienda ya vienen tratados con luz UV" x={540} y={690} tam={28} borde={VD.uv} />
      <Etq T={T} at={K.O + 1.0} until={K.E - 0.3} x={60} y={1140} texto="Agaricus bisporus" it tam={30} />
      <Etq T={T} at={K.E + 0.4} until={K.L - 0.3} x={60} y={470} texto="membrana de una célula del hongo" tam={27} />
      <Etq T={T} at={K.E + 1.4} until={K.L - 0.3} x={60} y={560} texto="ergosterol" tam={36} color={KC.gold2} />
      <Etq T={T} at={K.E + 2.5} until={K.L - 0.3} x={60} y={1060} texto="ergosterol (hongo)" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.E + 2.7} until={K.L - 0.3} x={1040} y={1060} lado="izq" texto="colesterol (tú)" tam={28} color="#9fd8ff" />
      <Etq T={T} at={K.L + 0.4} until={K.L + 1.5} x={1040} y={1090} lado="izq" texto="ergosterol" tam={36} color={KC.gold2} />
      <Chip T={T} at={K.L + 0.3} until={K.Pi - 0.3} texto="luz UV" x={300} y={470} tam={40} borde={VD.uv} />
      <Etq T={T} at={K.L + 1.7} until={K.L + 3.1} x={1040} y={1090} lado="izq" texto="previtamina D2" tam={36} color={KC.gold2} />
      <Etq T={T} at={K.L + 3.4} until={K.Pi - 0.3} x={1040} y={1090} lado="izq" texto="vitamina D2" tam={40} color={KC.yellow} />
      <Chip T={T} at={K.Pi + 0.8} until={K.P - 0.2} texto="hongo → D2" x={270} y={760} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Pi + 1.2} until={K.P - 0.2} texto="tu piel → D3" x={800} y={760} tam={36} borde={KC.coral} />
      <TarjetaEstudio T={T} at={K.Es + 0.1} until={K.Es + 1.6} anio="2015" quien="un equipo de Alemania y Dinamarca" revista="Urbain y Jakobsen · J. Agric. Food Chem." y={760} />
      <Chip T={T} at={K.Es + 1.8} until={K.R + 2.5} texto="rebanados, al sol de mediodía" x={380} y={470} tam={34} borde={KC.ink} />
      {T >= K.R && T < K.Sa && (() => { const s = Math.floor(reloj * 900); const f2 = (n) => String(n).padStart(2, '0');
        return <div style={{ position:'absolute', left:420, top:590, transform:'translate(-50%,-50%)', zIndex:42, textAlign:'center', opacity:kprog(T, K.R, K.R + 0.3) * (1 - kprog(T, K.Sa - 0.3, K.Sa)) }}>
          <div style={{ font:`700 64px ${KF.mono}`, color:reloj >= 1 ? KC.yellow : KC.texto, background:'rgba(0,0,0,.65)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'4px 22px' }}>{f2(Math.floor(s / 60))}:{f2(s % 60)}</div></div>; })()}
      <Medidor T={T} at={K.R + 0.3} until={K.Sa - 0.3} valor={(t) => kprog(t, K.R + 0.3, K.R + 2.5) * 0.9} etiqueta="vitamina D2" texto={(v) => (v * 17.6 / 0.9).toFixed(1) + ' µg / 100 g'} y={1290 - 590} color={KC.yellow} />
      <Chip T={T} at={K.R + 2.8} until={K.Sa - 0.3} texto="17.6 µg de vitamina D2 por 100 g de champiñón fresco" x={540} y={470} tam={27} borde={KC.yellow} />
      <Etq T={T} at={K.Sa + 0.6} until={K.H - 0.3} x={110} y={760} texto="salmón: comparable" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Sa + 2.6} until={K.H - 0.3} texto="adulto de 19 a 70 años: 15 µg al día" x={540} y={480} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Sa + 3.2} until={K.H - 0.3} x={60} y={560} texto="mayores de 70: 20 µg" tam={24} color={KC.ink} />
      <Chip T={T} at={K.H + 1.4} until={K.Cu - 0.2} texto="más sol ≠ más vitamina" x={420} y={470} tam={38} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Cu + 0.2} until={K.Cu + 2.8} anio="2013" quien="25 adultos, 3 meses" revista="cápsulas de polvo de champiñón · Keegan et al., 2013" y={760} />
      <Etq T={T} at={K.Cu + 3.6} until={K.Tr - 0.3} x={330} y={1200} lado="izq" texto="D2 de champiñón" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Cu + 3.8} until={K.Tr - 0.3} x={750} y={1200} texto="suplemento de D2" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cu + 5.2} until={K.Tr - 0.3} texto="vitamina D en sangre: igual" x={420} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Tr + 0.5} until={K.Tr + 2.2} x={270} y={1150} lado="izq" texto="entero" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Tr + 0.7} until={K.Tr + 2.2} x={600} y={1150} texto="rebanado: más" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Tr + 2.8} until={K.C - 0.3} texto="en el refri: una semana" x={420} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="15 min de sol de mediodía" x={420} y={770} tam={38} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.O} texto="5 cm" largo={190} color={KC.ink} />
      <BarraEscala T={T} at={K.O} until={K.E} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.E} until={K.L} texto="5 nm" largo={300} />
      <BarraEscala T={T} at={K.L} until={K.Pi} texto="0.5 nm" largo={120} />
      <BarraEscala T={T} at={K.Pi} until={K.P} texto="5 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="5 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.Sa} texto="5 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.Sa} until={K.H} texto="5 cm" largo={100} color={KC.ink} />
      <BarraEscala T={T} at={K.Cu + 2.8} until={K.Tr} texto="5 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.Tr} until={K.Tr + 2.4} texto="5 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.Tr + 2.4} until={K.C} texto="50 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={140} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="No es solo comida: *es una fábrica de vitamina D.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.E - 0.1} texto="Crecen a oscuras: *casi sin vitamina D.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.L - 0.1} texto="*Ergosterol:* parecido al colesterol." />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.Pi - 0.1} texto="Luz UV: *previtamina D2 → vitamina D2.*" />
      <Subtitulo T={T} idx={4} at={K.Pi + 0.1} until={K.P - 0.1} texto="Tu piel hace *vitamina D3.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Cuánto sol *necesita?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.R - 0.1} texto="2015: champiñones rebanados *al sol.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.Sa - 0.1} texto="15 minutos: *17.6 µg por 100 g.*" />
      <Subtitulo T={T} idx={8} at={K.Sa + 0.1} until={K.H - 0.1} texto="Como el salmón, y *más de lo recomendado al día.*" />
      <Subtitulo T={T} idx={9} at={K.H + 0.1} until={K.Cu - 0.1} texto="Sube, se estanca… *y baja.*" />
      <Subtitulo T={T} idx={10} at={K.Cu + 0.1} until={K.Tr - 0.1} texto="Tu cuerpo *sí la aprovecha.*" />
      <Subtitulo T={T} idx={11} at={K.Tr + 0.1} until={K.C - 0.1} texto="Rebanados, mejor; *una semana en el refri.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="15 minutos de sol: *tu fábrica de vitamina D.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.O + 0.6, K.E - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.L + 0.5, K.Pi - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 2.0, K.R + 2.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.H + 0.3, K.Cu - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cu + 3.4, K.Tr - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Tr + 0.3, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VitaminaDApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VitaminaDShot /></CompositionStage></div>;
}
window.VitaminaDApp = VitaminaDApp;
