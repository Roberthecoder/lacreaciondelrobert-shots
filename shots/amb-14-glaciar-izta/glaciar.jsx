// Shot Ambiental #14 · El glaciar del Iztaccíhuatl que ya nunca vas a ver (Ayoloco) — NARRADO (N4 la imagen que se vacía + N1).
// Datos: Gaceta UNAM (22 abr 2021 y 3 abr 2025), resúmenes del Simposio de Glaciares del IGf-UNAM (2025),
// Cortés-Ramos y Delgado Granados (2015) y nota 338 del C3 UNAM (2025). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático: siluetas de los volcanes, posición de los 12 glaciares y cuadrícula de hectáreas.

// Siluetas en una caja de 1000 × 300 (base en y = 300).
const GL_PATHS = {
  // Iztaccíhuatl, la "Mujer Dormida": cabeza, pecho (la cumbre), rodillas y pies.
  izta: 'M 0 300 L 60 230 Q 110 90 160 80 Q 200 75 230 120 L 270 150 Q 330 20 420 10 Q 500 15 560 90 Q 610 40 660 50 Q 720 60 760 120 Q 820 100 870 110 Q 940 160 1000 300 Z',
  // Popocatépetl: cono con cráter ancho.
  popo: 'M 0 300 Q 250 170 400 45 L 440 55 L 560 55 L 600 45 Q 750 170 1000 300 Z',
  // Pico de Orizaba (Citlaltépetl): cono alto y esbelto.
  orizaba: 'M 80 300 Q 320 150 470 15 L 530 15 Q 680 150 920 300 Z',
};
const GL_ROCA = '#9b7653', GL_ROCA2 = '#6e4f35', GL_HIELO = '#f2fbff';
// Volcán con hielo. nieve = hasta qué altura (en unidades de la caja, desde arriba) llega el hielo; 0 = sin hielo.
function Volcan({ x, y, w = 1000, tipo = 'izta', nieve = 0, id = 'v', grietas = 0, lecho = 0 }) {
  const s = w / 1000, d = GL_PATHS[tipo];
  const ola = Array.from({ length: 22 }, (_, i) => `L ${1010 - i * 48} ${(nieve + 10 * Math.sin(i * 1.7)).toFixed(1)}`).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><path d={`M -10 -10 L 1010 -10 L 1010 ${nieve} ${ola} Z`} /></clipPath></defs>
    <path d={d} fill={GL_ROCA} />
    {/* barrancas */}
    {[[150, 120, 120, 280], [420, 40, 360, 290], [430, 60, 520, 290], [660, 80, 700, 290], [860, 130, 900, 290], [300, 120, 250, 290]].map(([a, b, c, e], i) =>
      <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2 + 20} ${(b + e) / 2} ${c} ${e}`} stroke={GL_ROCA2} strokeWidth={7 / s * 0.6} fill="none" opacity={tipo === 'izta' ? 1 : 0.6} />)}
    {nieve > 0 && <path d={d} fill={GL_HIELO} clipPath={`url(#${id})`} />}
    {nieve > 0 && grietas > 0 && <g clipPath={`url(#${id})`} opacity={grietas}>
      {[[400, 50, 380, 120], [470, 55, 500, 130], [560, 60, 600, 140], [440, 80, 470, 140], [520, 90, 540, 150]].map(([a, b, c, e], i) =>
        <path key={i} d={`M ${a} ${b} L ${(a + c) / 2 + 12} ${(b + e) / 2} L ${c} ${e}`} stroke={GL_ROCA2} strokeWidth={10} fill="none" />)}</g>}
    {lecho > 0 && <ellipse cx={500} cy={60} rx={36 * lecho} ry={18 * lecho} fill={GL_ROCA2} stroke={KC.ink} strokeWidth={4 / s * 0.6} />}
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={8 / s * 0.6} strokeLinejoin="round" />
  </g>;
}
// Placa de metal sobre un poste (en la ladera). Origen = pie del poste.
function Placa({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-9} y={-150} width={18} height={150} fill="#5c5f66" stroke={KC.ink} strokeWidth={5} />
    <rect x={-80} y={-250} width={160} height={110} rx={10} fill="#c3cad1" stroke={KC.ink} strokeWidth={7} />
    {[[-66, -236], [66, -236], [-66, -154], [66, -154]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill="#7d848c" />)}
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-52} y={-228 + i * 16} width={i === 4 ? 60 : 104} height={7} rx={3} fill="#6f767e" />)}
  </g>;
}
// Ladera de roca en primer plano (abajo a la izquierda), donde está la placa.
function Ladera({ y = 980 }) {
  return <g>
    <path d={`M -20 ${y + 60} Q 200 ${y - 40} 520 ${y + 20} Q 760 ${y + 70} 1100 ${y + 30} L 1100 1940 L -20 1940 Z`} fill="#7a5a3f" stroke={KC.ink} strokeWidth={7} />
    {[[90, y + 90, 40], [430, y + 70, 28], [700, y + 120, 36], [250, y + 150, 22], [900, y + 110, 30]].map(([a, b, r], i) =>
      <path key={i} d={`M ${a - r} ${b} Q ${a - r * 0.6} ${b - r} ${a} ${b - r * 0.9} Q ${a + r} ${b - r * 0.7} ${a + r} ${b} Z`} fill="#8d6c4e" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Montañista (esquema): casco, mochila y piernas que caminan.
function Montanista({ x, y, s = 1, T = 0, color = KC.red }) {
  const p = Math.sin(T * 8) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}>
    <line x1={0} y1={-40} x2={-10 + p * 0.6} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <line x1={0} y1={-40} x2={10 - p * 0.6} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <rect x={-14} y={-92} width={28} height={56} rx={12} fill={color} stroke={KC.ink} strokeWidth={5} />
    <rect x={-32} y={-88} width={20} height={42} rx={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle cx={2} cy={-108} r={15} fill="#f2c29b" stroke={KC.ink} strokeWidth={5} />
    <path d="M -15 -110 Q 2 -134 19 -110 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <line x1={14} y1={-70} x2={34} y2={0} stroke="#555" strokeWidth={5} />
  </g>;
}
// Ciudad (Valle de México) en primer plano.
function Ciudad({ y = 920 }) {
  const ed = [[0, 160, 110], [110, 230, 90], [200, 140, 120], [320, 270, 80], [400, 180, 110], [510, 120, 90], [600, 210, 120], [720, 150, 100], [820, 250, 90], [910, 170, 170]];
  return <g>{ed.map(([x, h, w], i) => <g key={i}>
    <rect x={x} y={y + 300 - h} width={w} height={h + 40} fill={i % 2 ? '#3b4a6b' : '#55658a'} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor(h / 45) }, (_, r) => <rect key={r} x={x + 18} y={y + 300 - h + 20 + r * 45} width={w - 36} height={14} fill={KC.yellow} opacity={0.75} />)}
  </g>)}</g>;
}
// Avión de fotos aéreas.
function Avion({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 0 Q -60 -18 60 -12 Q 90 -8 96 0 Q 90 8 60 12 Q -60 18 -80 0 Z" fill="#f4f4f4" stroke={KC.ink} strokeWidth={5} />
    <path d="M -10 -8 L 20 -60 L 40 -60 L 30 -8 Z" fill="#d6dbe2" stroke={KC.ink} strokeWidth={5} />
    <path d="M -10 8 L 20 50 L 40 50 L 30 8 Z" fill="#d6dbe2" stroke={KC.ink} strokeWidth={5} />
    <path d="M -80 0 L -96 -30 L -70 -6 Z" fill="#d6dbe2" stroke={KC.ink} strokeWidth={4} />
    <circle cx={30} cy={14} r={8} fill={KC.ink} />
  </g>;
}
// Copos que caen: arriba de la línea (yLinea) son nieve; abajo se vuelven gotas.
function Copos({ T, yLinea, n = 26, x0 = 200, x1 = 1060 }) {
  const r = krng(14), cs = Array.from({ length: n }, () => ({ x: x0 + r() * (x1 - x0), v: 110 + r() * 80, p: r() * 10 }));
  return <g>{cs.map((c, i) => { const yy = 420 + ((T * c.v + c.p * 90) % 800); const agua = yy > yLinea;
    return agua ? <path key={i} d="M 0 -12 Q 7 0 0 7 Q -7 0 0 -12 Z" transform={`translate(${c.x + Math.sin(T + i) * 6} ${yy})`} fill="#3aa0ff" stroke={KC.ink} strokeWidth={2} />
      : <g key={i} transform={`translate(${c.x + Math.sin(T * 2 + i) * 10} ${yy})`}>{[0, 60, 120].map((a) => <line key={a} x1={-9} y1={0} x2={9} y2={0} stroke="#fff" strokeWidth={4} transform={`rotate(${a})`} />)}</g>; })}</g>;
}
// Termómetro simple. v 0..1.
function TermoG({ x, y, v }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-260} width={44} height={260} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-11} y={-250 * v + 10 - 20} width={22} height={250 * v} rx={11} fill={KC.red} />
    <circle cx={0} cy={18} r={36} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Doce glaciares de 1964 en el Izta (posiciones esquemáticas sobre la cresta) y los restos en los cráteres de hoy.
const GL_DOCE = [[135, 100], [180, 92], [215, 128], [325, 62], [372, 32], [425, 24], [478, 38], [528, 80], [615, 66], [672, 70], [828, 118], [880, 130]];

function GlaciarShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Ayoloco, D: CUES.Doce, L: CUES.Linea, Cu: CUES.Cumbre, P: CUES.Pregunta, Po: CUES.Popo, Pl: CUES.Placa, O: CUES.Orizaba, Ci: CUES.Cinco, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // Gancho / Cierre: la cumbre (el "pecho") de cerca, al fondo; la ladera y la placa adelante.
  const cumbre = (hielo, placaO, id) => <>
    <Volcan x={-376} y={560} w={1800} tipo="izta" nieve={hielo} id={id} />
    {hielo > 4 && <Goteo T={T} x={380} y0={560 + 90} y1={900} cada={0.35} color="#7cc8ff" r={10} />}
    <Ladera y={1000} />
    <Placa x={290} y={1130} s={1.15} o={placaO} />
  </>;
  // Escala de altitud de la escena "línea de equilibrio": 4,700 m → y 1150 · 5,500 m → y 550.
  const alt = (m) => 1150 - (m - 4700) * 0.75;
  const ela = klerp(4900, 5300, kprog(T, K.L + 2.4, K.L + 5.4, kEase.suave));
  const yEla = alt(ela);
  const YIZ = alt(5230) - 18;   // la cumbre (pecho, y local 10 × 1.8) queda en 5,230 m
  // Orizaba: 62 → 37 cuadritos (1 ha cada uno)
  const quedan = Math.round(klerp(62, 37, kprog(T, K.O + 2.2, K.O + 4.6, kEase.suave)));
  // cuenta regresiva
  const cuenta = 5 - Math.floor(kclamp((T - K.Ci - 1.4) / 0.7, 0, 4.99));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el hielo de la cumbre se derrite; en la ladera, la placa */}
      <Escena T={T} a={K.G} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(cumbre(klerp(90, 0, kprog(T, K.G + 0.1, K.G + 3.0, kEase.suave)), kprog(T, K.G + 2.4, K.G + 3.0), 'vg'))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 1 · el Ayoloco en la cumbre del Izta, visto desde el Valle de México */}
      <Escena T={T} a={K.A} b={K.D}>
        <FondoLunares color={KC.mint} />
        {svg(<><Volcan x={50} y={640} w={980} tipo="izta" nieve={95} id="va" /><Ciudad y={900} />
          <path d={`M 462 ${560 + Math.sin(T * 6) * 8} L 462 ${615 + Math.sin(T * 6) * 8}`} stroke={KC.ink} strokeWidth={10} markerEnd="" />
          <path d={`M 444 ${600 + Math.sin(T * 6) * 8} L 462 ${630 + Math.sin(T * 6) * 8} L 480 ${600 + Math.sin(T * 6) * 8} Z`} fill={KC.ink} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · 1964: fotos aéreas, 12 glaciares; hoy: restos en los cráteres */}
      <Escena T={T} a={K.D} b={K.L}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Volcan x={50} y={700} w={980} tipo="izta" nieve={0} id="vd" />
          <Avion x={klerp(-160, 1240, kprog(T, K.D + 0.1, K.D + 2.4))} y={560} s={0.9} />
          {GL_DOCE.map(([gx, gy], i) => { const t0 = K.D + 0.5 + i * 0.13, on = kprog(T, t0, t0 + 0.25, kEase.rebote), off = kprog(T, K.D + 3.2 + i * 0.06, K.D + 3.6 + i * 0.06);
            const X = 50 + gx * 0.98, Y = 700 + gy * 0.98 + 14, resto = (i === 5 || i === 6) ? 0.3 : 0;
            return on > 0 && <g key={i} transform={`translate(${X} ${Y}) scale(${on * (1 - off * (1 - resto))})`}>
              <ellipse rx={30} ry={15} fill={GL_HIELO} stroke={KC.ink} strokeWidth={4} />
              {off < 0.5 && <text y={-24} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{i + 1}</text>}</g>; })}
          {kprog(T, K.D + 0.5, K.D + 2.0) > 0 && kprog(T, K.D + 0.5, K.D + 2.0) < 1 && <circle cx={klerp(-160, 1240, kprog(T, K.D + 0.1, K.D + 2.4))} cy={600} r={60} fill="#fff" opacity={0.5 * Math.abs(Math.sin(T * 25))} />}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3–4 · la línea de equilibrio sube a ~5,300 m; la cumbre (5,230 m) se queda abajo */}
      <Escena T={T} a={K.L} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Volcan x={-196} y={YIZ} w={1800} tipo="izta" nieve={Math.max(0, (yEla - YIZ) / 1.8)} id="vl" />
          <Copos T={T} yLinea={yEla} />
          {T > K.Cu && <Goteo T={T} x={560} y0={YIZ + 30} y1={YIZ + 330} cada={0.4} color="#3aa0ff" r={10} desde={K.Cu} />}
          {/* regla de altitud */}
          <rect x={60} y={alt(5500)} width={16} height={alt(4700) - alt(5500)} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
          {[4800, 4900, 5000, 5100, 5200, 5300, 5400].map((m) => <g key={m}><line x1={60} y1={alt(m)} x2={100} y2={alt(m)} stroke={KC.ink} strokeWidth={5} />
            <text x={108} y={alt(m) + 9} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} stroke={KC.paper} strokeWidth={5} paintOrder="stroke">{kformato(m, 0)}</text></g>)}
          <line x1={60} y1={yEla} x2={1080} y2={yEla} stroke={KC.ink} strokeWidth={6} strokeDasharray="22 14" />
          <line x1={60} y1={yEla} x2={1080} y2={yEla} stroke="#fff" strokeWidth={2} strokeDasharray="22 14" />
          {T > K.Cu && <g transform={`translate(560 ${alt(5230)})`}><path d="M -16 -34 L 16 -34 L 0 -6 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>}
        </>)}
        <Etq T={T} at={K.L + 0.6} until={K.P - 0.1} x={1060} y={yEla - 34} texto={`línea de equilibrio · ${kformato(Math.round(ela / 10) * 10, 0)} m`} lado="izq" tam={28} />
        <Etq T={T} at={K.Cu + 0.2} until={K.P - 0.1} x={600} y={alt(5230) + 50} texto="cumbre: 5,230 m" tam={30} />
      </Escena>
      {/* 5 · ¿y los otros volcanes? */}
      <Escena T={T} a={K.P} b={K.Po} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<><text x={270} y={840} textAnchor="middle" style={{ font:`400 420px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 700)`}>?</text>
          <Volcan x={20} y={930} w={250} tipo="popo" nieve={0} id="vp1" />
          <Volcan x={250} y={900} w={260} tipo="orizaba" nieve={40} id="vp2" /></>)}
        <Etq T={T} at={K.P + 0.1} until={K.Po - 0.1} x={145} y={1040} texto="Popo" tam={26} lado="der" />
      </Escena>
      {/* 6 · Popocatépetl: calor + erupción (desde dic 1994) → glaciares extintos en 2001 */}
      <Escena T={T} a={K.Po} b={K.Pl}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          {Array.from({ length: 5 }, (_, i) => { const u = ((T - K.Po) * 0.5 + i / 5) % 1;
            return <circle key={i} cx={540 + Math.sin(i * 2 + T) * 30 - u * 60} cy={680 - u * 280} r={40 + u * 70} fill="#8b8f96" opacity={0.75 * (1 - u)} stroke={KC.ink} strokeWidth={3} />; })}
          <Volcan x={90} y={640} w={900} tipo="popo" nieve={klerp(95, 0, kprog(T, K.Po + 1.0, K.Po + 4.4, kEase.suave))} grietas={kprog(T, K.Po + 1.0, K.Po + 2.4)} id="vpo" />
          {Array.from({ length: 30 }, (_, i) => { const r = krng(40 + i), xx = 250 + r() * 600, v = 120 + r() * 120; const yy = 560 + ((T * v + r() * 400) % 420);
            return <circle key={i} cx={xx} cy={yy} r={5} fill="#55595f" opacity={kprog(T, K.Po + 0.3, K.Po + 1.0)} />; })}
          <TermoG x={140} y={1040} v={klerp(0.35, 0.85, kprog(T, K.Po + 0.5, K.Po + 3.5, kEase.suave))} />
        </>)}
        <Etq T={T} at={K.Po + 0.4} until={K.Pl - 0.1} x={830} y={1000} texto="Popocatépetl" lado="izq" tam={30} color={KC.ink} />
      </Escena>
      {/* 7 · la placa (abril 2021): montañistas suben y la dejan en la ladera; acercamiento al texto */}
      <Escena T={T} a={K.Pl} b={K.O}>
        <FondoLunares color={KC.mint} />
        {svg(<>{cumbre(0, kprog(T, K.Pl + 2.0, K.Pl + 2.5), 'vpl')}
          {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.Pl + 0.1, K.Pl + 2.6), xx = klerp(1000 + i * 90, 420 + i * 90, u), yy = klerp(1110, 1050, u) + Math.abs(Math.sin(T * 8 + i)) * -4;
            return <Montanista key={i} x={xx} y={yy} s={0.9} T={u < 1 ? T + i : 0} color={[KC.red, KC.blue, KC.pink, KC.leaf][i]} />; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {kvisible(T, K.Pl + 3.0, K.O - 0.15) && (() => { const e = kentrada(T, K.Pl + 3.0, K.O - 0.15, 'pop');
        return <div style={{ position:'absolute', left:540, top:900, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-1.5deg)`, opacity:e.o, width:720,
          background:'linear-gradient(160deg,#dfe4ea,#aab2bb)', border:`8px solid ${KC.ink}`, borderRadius:22, padding:'26px 36px', boxShadow:`12px 12px 0 ${KC.ink}`, textAlign:'center', color:'#23272d' }}>
          <div style={{ font:`900 30px ${KF.texto}`, letterSpacing:'.04em' }}>A LAS GENERACIONES FUTURAS:</div>
          <div style={{ font:`900 40px/1.15 ${KF.texto}`, marginTop:12 }}>Aquí existió el glaciar Ayoloco y retrocedió hasta desaparecer en <span style={{ background:KC.gold2, padding:'0 .15em', borderRadius:6 }}>2018</span>.</div>
          <div style={{ font:`700 22px ${KF.mono}`, marginTop:14, color:'#4a5058' }}>(fragmento de la placa · UNAM)</div>
        </div>; })()}
      {/* 8 · Pico de Orizaba: 62 ha (2007) → 37 ha (2024) */}
      <Escena T={T} a={K.O} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          {Array.from({ length: 62 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8), hay = i < quedan;
            return <rect key={i} x={90 + c * 56} y={630 + r * 56} width={48} height={48} rx={8} fill={hay ? GL_HIELO : '#b08a66'} stroke={KC.ink} strokeWidth={4} opacity={hay ? 1 : 0.55} />; })}
          <Volcan x={570} y={860} w={500} tipo="orizaba" nieve={klerp(120, 75, kprog(T, K.O + 2.2, K.O + 4.6, kEase.suave))} lecho={kprog(T, K.O + 2.6, K.O + 4.0)} id="vo" />
        </>)}
        <div style={{ position:'absolute', left:310, top:500, zIndex:41, transform:'translate(-50%,-50%)', font:`400 120px/1 ${KF.titulo}`, color:KC.paper, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{quedan} ha</div>
        <Etq T={T} at={K.O + 0.4} until={K.Ci - 0.1} x={1050} y={1050} texto="Pico de Orizaba" lado="izq" tam={28} />
        <Etq T={T} at={K.O + 0.6} until={K.Ci - 0.1} x={20} y={590} texto="▢ = 1 ha de hielo" tam={24} />
      </Escena>
      {/* 9 · "podrían desaparecer en unos cinco años" (estimación, 2025) */}
      <Escena T={T} a={K.Ci} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{(() => { const n = kclamp(1 - (T - K.Ci - 1.4) / 3.6, 0, 1); return <>
          <Volcan x={10} y={860} w={400} tipo="izta" nieve={30 * n} id="vc1" />
          <Volcan x={390} y={840} w={320} tipo="popo" nieve={0} id="vc2" />
          <Volcan x={690} y={800} w={380} tipo="orizaba" nieve={80 * n} id="vc3" />
          {[[210, 'Izta'], [550, 'Popo'], [880, 'Orizaba']].map(([lx, lt]) => <text key={lt} x={lx} y={1020} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{lt}</text>)}</>; })()}</>)}
        {T > K.Ci + 1.2 && <div style={{ position:'absolute', left:600, top:650, zIndex:41, transform:`translate(-50%,-50%) scale(${1 + 0.25 * Math.exp(-((T - K.Ci - 1.4) % 0.7) * 8)})`,
          font:`400 330px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`9px ${KC.ink}`, textShadow:`12px 12px 0 ${KC.ink}` }}>{cuenta}</div>}
      </Escena>
      {/* 10 · cierre: regreso a la placa del inicio, con la cumbre ya sin hielo */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(cumbre(0, 1, 'vci'))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.4} until={K.G + 3.2} texto="glaciar Ayoloco" x={290} y={430} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.G + 2.8} until={K.A - 0.2} texto="una placa que lo recuerda" x={330} y={1440} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.A + 0.3} until={K.D - 0.2} texto="Iztaccíhuatl · la Mujer Dormida" y={430} x={400} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.A + 0.8} until={K.D - 0.2} x={440} y={540} texto="Ayoloco" lado="izq" tam={30} />
      <Etq T={T} at={K.A + 2.6} until={K.D - 0.2} x={60} y={1160} texto="Valle de México" tam={28} />
      <Chip T={T} at={K.D + 0.6} until={K.D + 3.3} texto="1964 · fotos aéreas: 12 glaciares" y={430} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.D + 2.0} until={K.D + 3.3} texto="1.4 km² de hielo" y={1440} x={540} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.D + 3.6} until={K.L - 0.2} texto="hoy: restos en sus cráteres" y={430} x={540} tam={32} borde={KC.red} />
      <Chip T={T} at={K.L + 0.4} until={K.Cu - 0.1} texto="arriba: la nieve dura todo el año" y={1440} x={540} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Cu + 0.4} until={K.P - 0.2} texto="cumbre 5,230 m < línea ≈ 5,300 m" y={1440} x={540} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Po + 0.6} until={K.Po + 3.6} texto="erupción desde dic 1994" y={430} x={400} tam={32} borde={KC.orange} />
      <Chip T={T} at={K.Po + 0.9} until={K.Pl - 0.2} texto="+ calor" y={1440} x={300} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Po + 3.8} until={K.Pl - 0.2} texto="2001: glaciares extintos" y={430} x={400} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Pl + 1.0} until={K.O - 0.2} texto="abril 2021 · UNAM · 4,626 m" y={1440} x={540} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.O + 0.4} until={K.O + 2.4} texto="2007: 62 ha de hielo" y={1440} x={540} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.O + 2.6} until={K.Ci - 0.2} texto="2024: 37 ha · −40 %" y={1440} x={540} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.4} until={K.C - 0.2} texto="estimación de H. Delgado Granados (UNAM, 2025)" y={1440} x={540} tam={26} borde={KC.ink} />
            <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="«Sólo ustedes sabrán si lo hicimos»" y={1440} x={540} tam={34} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Este glaciar *ya nunca lo vas a ver.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.D - 0.1} texto="El Ayoloco, *en el Iztaccíhuatl.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.L - 0.1} texto="1964: *12 glaciares.* Hoy, restos." />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.Cu - 0.1} texto="La línea de la nieve *subió a ~5,300 m.*" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.P - 0.1} texto="La cumbre: 5,230 m. *Se quedó abajo.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Po - 0.1} texto="¿Y los *otros volcanes?*" />
      <Subtitulo T={T} idx={6} at={K.Po + 0.1} until={K.Pl - 0.1} texto="Popocatépetl: *extintos en 2001.*" />
      <Subtitulo T={T} idx={7} at={K.Pl + 0.1} until={K.O - 0.1} texto="La placa: *desapareció en 2018.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.Ci - 0.1} texto="Pico de Orizaba: *de 62 a 37 hectáreas.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.C - 0.1} texto="Podrían irse *en unos 5 años.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="«Sólo ustedes sabrán *si lo hicimos.»*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Ayoloco + 2.2, CUES.Doce + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Linea + 2.6, CUES.Cumbre + 1.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Popo + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Popo + 4.0, CUES.Placa - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Placa + 3.6, CUES.Orizaba - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Orizaba + 3.0, CUES.Cinco - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cinco + 0.6, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GlaciarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GlaciarShot /></CompositionStage></div>;
}
window.GlaciarApp = GlaciarApp;
