// Shot IA #17 · Tu pregunta a una IA: nueve segundos de tele — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Elsworth et al. (Google), arXiv:2508.15734 (2025) y Google Cloud Blog (21 ago 2025); AIE, Energy and AI (2025). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff';
const svgK = (c, z = 20) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

// Celular dibujado (SVG): pregunta del usuario y respuesta en rayitas. env 0..1 = burbuja enviada; resp 0..1 = respuesta.
function Celu({ x, y, s = 1, env = 1, resp = 1, T = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <rect x={-190} y={-330} width={380} height={660} rx={70} fill={KC.yellow} opacity={0.35 * brillo} />}
    <rect x={-165} y={-305} width={330} height={610} rx={56} fill="#10131a" stroke={KC.ink} strokeWidth={12} />
    <rect x={-55} y={-288} width={110} height={22} rx={11} fill={KC.ink} />
    <g opacity={env} transform={`translate(0 ${(1 - env) * 40})`}>
      <rect x={-110} y={-230} width={240} height={110} rx={26} fill={KC.cyan} />
      <text x={10} y={-185} textAnchor="middle" style={{ font:`800 28px ${KF.texto}` }} fill={KC.ink}>¿Por qué el cielo</text>
      <text x={10} y={-148} textAnchor="middle" style={{ font:`800 28px ${KF.texto}` }} fill={KC.ink}>es azul?</text>
    </g>
    {resp > 0 && <g>
      <rect x={-130} y={-95} width={230} height={210} rx={26} fill="#262c3a" opacity={Math.min(1, resp * 3)} />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-108} y={-70 + k * 36} width={(k === 4 ? 110 : 185) * kclamp(resp * 5 - k, 0, 1)} height={14} rx={7} fill={KC.texto} opacity=".7" />)}
    </g>}
    <circle cx={0} cy={262} r={18} fill="none" stroke="#2c3344" strokeWidth={5} />
  </g>;
}
// Tele con patitas; on 0..1 la enciende; seg = segundos que marca (null = sin contador).
function Tele({ x, y, s = 1, on = 1, seg = null, T = 0, mini = false }) {
  const scr = mixHex('#1b2130', '#7fe3ff', on);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-120} y1={150} x2={-160} y2={200} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <line x1={120} y1={150} x2={160} y2={200} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <rect x={-230} y={-150} width={460} height={300} rx={26} fill="#2b3445" stroke={KC.ink} strokeWidth={10} />
    <rect x={-200} y={-122} width={400} height={244} rx={14} fill={scr} />
    {on > 0.5 && !mini && <g opacity={kclamp(on * 2 - 1, 0, 1)}>
      {/* rayitas de "programa" detrás del contador */}
      {[0, 1, 2].map((k) => <rect key={k} x={-200} y={-122 + ((T * 90 + k * 80) % 244)} width={400} height={8} fill="#fff" opacity=".18" />)}
      {seg != null && <>
        <text x={0} y={40} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{Math.floor(seg)} s</text>
        <text x={0} y={95} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>de tele (~100 W)</text>
      </>}
    </g>}
    {mini && on > 0.5 && <circle cx={0} cy={0} r={60} fill="#fff" opacity=".35" />}
  </g>;
}
// Gota de agua.
function Gota({ x, y, s = 1, o = 1 }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o} d="M 0 -34 C 14 -14 24 0 24 12 A 24 24 0 0 1 -24 12 C -24 0 -14 -14 0 -34 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />;
}
// Vasito con nivel de agua (nivel 0..1).
function Vaso({ x, y, s = 1, nivel = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -48 ${50 - 90 * nivel} L ${-48 + 6 * nivel} 50 L 42 50 L 48 ${50 - 90 * nivel} Z`} fill={KC.cyan} opacity=".85" />
    <path d="M -55 -45 L -45 55 L 45 55 L 55 -45" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Rayo de electricidad.
function Rayo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <path transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o} d="M 10 -60 L -26 6 L 0 6 L -12 60 L 30 -10 L 4 -10 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />;
}
// Rack de servidores con leds que parpadean.
function Rack({ x, y, s = 1, T = 0, seed = 1, calor = 0 }) {
  const r = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-220} width={180} height={440} rx={12} fill="#232a3a" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 8 }, (_, i) => { const ph = r() * 6, f = 2 + r() * 5;
      return <g key={i}>
        <rect x={-72} y={-200 + i * 52} width={144} height={40} rx={6} fill="#151a24" stroke="#3a4560" strokeWidth={3} />
        <circle cx={-50} cy={-180 + i * 52} r={7} fill={Math.sin(T * f + ph) > 0 ? KC.mint : '#1f5c48'} />
        <circle cx={-28} cy={-180 + i * 52} r={7} fill={Math.sin(T * f * 1.3 + ph) > 0.3 ? KC.cyan : '#1d4a5c'} />
        <rect x={0} y={-186 + i * 52} width={56} height={10} rx={5} fill={mixHex('#3a4560', '#ff8a1f', calor)} />
      </g>; })}
  </g>;
}
// Ventilador / enfriamiento.
function Ventilador({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-80} width={160} height={160} rx={20} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${T * 540})`}>{[0, 90, 180, 270].map((a) => <path key={a} d="M 0 0 Q 30 -26 60 -10 Q 30 6 0 0 Z" transform={`rotate(${a})`} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />)}</g>
    <circle r={12} fill={KC.texto} stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${100 + ((T * 60 + k * 20) % 60)} ${-40 + k * 40} q 12 -10 24 0 t 24 0`} stroke={KC.cyan} strokeWidth={5} fill="none" opacity=".7" strokeLinecap="round" />)}
  </g>;
}
// Globo terráqueo esquemático con centros de datos que se encienden (luces 0..1).
function Planeta({ x, y, r = 190, T = 0, luces = 0 }) {
  const pts = [[-90, -70], [-40, -110], [30, -60], [80, -20], [-110, 20], [-30, 40], [60, 70], [110, 50], [-60, 110], [10, 120], [130, -80], [-130, -30]];
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 26} fill={KC.yellow} opacity={0.18 + 0.2 * luces} />
    <circle r={r} fill={AZUL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -60 Q -100 -130 -20 -120 Q 20 -80 -30 -40 Q -60 0 -120 10 Q -170 -10 -150 -60 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M 20 -10 Q 90 -60 150 -10 Q 170 60 110 110 Q 60 150 30 90 Q 0 40 20 -10 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M -110 60 Q -60 50 -40 100 Q -60 150 -100 130 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    {pts.map(([px, py], i) => { const on = kclamp(luces * pts.length - i, 0, 1);
      return <g key={i} opacity={on}><rect x={px - 11} y={py - 11} width={22} height={22} rx={4} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
        <circle cx={px} cy={py} r={20 + 6 * Math.sin(T * 5 + i)} fill={KC.yellow} opacity=".25" /></g>; })}
  </g>;
}
// Japón esquemático (Hokkaidō, Honshū, Shikoku, Kyūshū) con lucecitas.
function Japon({ x, y, s = 1, T = 0, luz = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 60 -120 Q 100 -140 120 -110 Q 110 -80 80 -80 Q 55 -90 60 -120 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={6} />
    <path d="M 70 -60 Q 90 -40 70 0 Q 40 50 -20 70 Q -70 80 -90 70 Q -80 50 -40 40 Q 20 20 40 -20 Q 50 -50 70 -60 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 82 Q -10 80 -10 95 Q -30 105 -50 95 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={5} />
    <path d="M -110 80 Q -85 82 -85 110 Q -100 130 -118 110 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={5} />
    {[[50, -20], [20, 20], [-20, 50], [-60, 62], [90, -110], [60, -45]].map(([px, py], i) =>
      <circle key={i} cx={px} cy={py} r={7} fill={KC.yellow} opacity={luz * (0.6 + 0.4 * Math.sin(T * 6 + i))} />)}
  </g>;
}
// Burbuja de pregunta (tamaño = cuánto gasta), para la fila ordenada.
function Burbuja({ x, y, w, h, color = KC.paper, o = 1 }) {
  return <g opacity={o}><rect x={x - w / 2} y={y - h} width={w} height={h} rx={Math.min(22, w / 3)} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${x - w / 4} ${y - 2} l -10 22 l 26 -22`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></g>;
}
// Icono de imagen o de video con una raya (fuera de la cuenta).
function IconoMedio({ x, y, tipo = 'imagen', raya = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-85} width={220} height={170} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {tipo === 'imagen' ? <>
      <circle cx={45} cy={-35} r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      <path d="M -95 70 L -30 -10 L 20 45 L 50 15 L 95 70 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    </> : <>
      <path d="M -30 -45 L 50 0 L -30 45 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[-80, 80].map((px) => [-60, -20, 20, 60].map((py) => <rect key={`${px}${py}`} x={px - 10} y={py - 8} width={20} height={16} rx={3} fill={KC.ink} />))}
    </>}
    {raya > 0 && <line x1={-130} y1={-100} x2={-130 + 260 * raya} y2={-100 + 200 * raya} stroke={KC.red} strokeWidth={16} strokeLinecap="round" />}
  </g>;
}
// Edificio de centro de datos en corte con tres salas: IA, internet y la nube. ia 0..1 resalta la sala de la IA.
function EdificioDatos({ x, y, T = 0, ia = 0, aparece = 1 }) {
  const salas = [
    { t: 'IA', c: KC.mint },
    { t: 'internet', c: KC.cyan },
    { t: 'la nube', c: KC.lilac },
  ];
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -420 -260 L 0 -360 L 420 -260 Z" fill="#3a4560" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-400} y={-260} width={800} height={540} rx={10} fill="#232a3a" stroke={KC.ink} strokeWidth={9} />
    {salas.map((sa, i) => { const sx = -380 + i * 260, o = kclamp(aparece * 3 - i, 0, 1), glow = i === 0 ? ia : 0;
      return <g key={i} opacity={o}>
        <rect x={sx} y={-235} width={240} height={490} rx={14} fill={mixHex('#151a24', '#1f4f43', glow)} stroke={sa.c} strokeWidth={6} />
        {glow > 0 && <rect x={sx - 10} y={-245} width={260} height={510} rx={18} fill="none" stroke={KC.yellow} strokeWidth={8} opacity={0.5 + 0.5 * Math.sin(T * 6)} />}
        <text x={sx + 120} y={-180} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={sa.c}>{sa.t}</text>
        {i === 0 && <Robotito x={sx + 120} y={20} s={0.62} T={T} cara="feliz" />}
        {i === 1 && <g transform={`translate(${sx + 120} 40)`}>
          <circle r={80} fill={AZUL} stroke={KC.ink} strokeWidth={6} />
          <ellipse rx={36} ry={80} fill="none" stroke={KC.texto} strokeWidth={5} />
          <line x1={-80} y1={0} x2={80} y2={0} stroke={KC.texto} strokeWidth={5} />
          <path d="M -70 -40 Q 0 -25 70 -40 M -70 40 Q 0 25 70 40" stroke={KC.texto} strokeWidth={5} fill="none" />
        </g>}
        {i === 2 && <path transform={`translate(${sx + 120} ${40 + Math.sin(T * 2) * 6})`} d="M -80 30 Q -100 -10 -60 -20 Q -50 -70 0 -60 Q 40 -90 70 -40 Q 110 -30 95 20 Q 90 40 60 40 L -60 40 Q -80 40 -80 30 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={6} />}
        {[0, 1, 2].map((k) => <circle key={k} cx={sx + 40 + k * 26} cy={225} r={7} fill={Math.sin(T * (3 + k + i)) > 0 ? sa.c : '#2c3344'} />)}
      </g>; })}
  </g>;
}

function EnergiaPregunta() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, I: CUES.Incluye, B: CUES.Baja, P: CUES.Pregunta, O: CUES.Ojo, S: CUES.Suma, A: CUES.AIE, R: CUES.Razones, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const L6 = K.O + 5.9, L9 = K.A + 7.7; // líneas que comparten escena

  // gancho y cierre comparten la misma imagen (celular + tele)
  const escenaTele = (t0, conCuenta) => {
    const env = kprog(T, t0 + 0.15, t0 + 0.45, kEase.sale), resp = kprog(T, t0 + 0.9, t0 + 2.2);
    const viaje = kprog(T, t0 + 0.45, t0 + 0.95, kEase.suave), on = kprog(T, t0 + 0.9, t0 + 1.2);
    const seg = conCuenta ? 9 * kprog(T, t0 + 1.1, t0 + 3.6) : 9;
    return <>
      <Celu x={290} y={700} s={1} env={env} resp={resp} T={T} />
      {viaje > 0 && viaje < 1 && <Rayo x={klerp(400, 680, viaje)} y={klerp(720, 900, viaje)} s={1.1} rot={-20 + viaje * 30} />}
      <Tele x={770} y={980} s={0.95} on={on} seg={seg} T={T} />
    </>;
  };
  const gotas = (t0) => <>{[0, 1, 2, 3, 4].map((k) => { const a = t0 + k * 0.32, p = kprog(T, a, a + 0.45, (u) => u * u);
    return T >= a && p < 1 ? <Gota key={k} x={290} y={klerp(1010, 1090, p)} s={0.7} /> : null; })}
    <Vaso x={290} y={1100} s={1} nivel={kprog(T, t0 + 0.3, t0 + 1.9) * 0.55} /></>;

  // cierre: aparecen miles de teles y celulares
  const mosaico = () => { const r = krng(17), out = [];
    for (let i = 0; i < 60; i++) { const c = i % 6, f = Math.floor(i / 6), px = 90 + c * 180 + (f % 2) * 40, py = 360 + f * 82, d = r() * 1.4, on = kprog(T, K.C + 2.6 + d, K.C + 3.0 + d);
      if (on <= 0) continue;
      out.push(<g key={i} opacity={on}>{(i + f) % 2 ? <Tele x={px} y={py} s={0.16} on={1} mini T={T} /> : <Celu x={px} y={py} s={0.11} env={1} resp={1} />}</g>); }
    return out; };
  const zoomFuera = kprog(T, K.C + 2.4, K.C + 3.6, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu pregunta = 9 s de tele + 5 gotas */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svgK(<>{escenaTele(K.G, true)}{gotas(K.G + 4.4)}</>)}
      </Escena>
      <Chip T={T} at={K.G + 0.6} until={K.E - 0.2} texto="Gemini · pregunta típica de texto" x={330} y={330} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.G + 5.2} until={K.E - 0.2} texto="≈ 5 gotas" x={520} y={1100} tam={40} borde={KC.cyan} />

      {/* 2 · el estudio de Google */}
      <Escena T={T} a={K.E} b={K.I}>
        <FondoLunares color={KC.yellow} />
        {svgK(<g opacity={kprog(T, K.E + 2.3, K.E + 2.7)}><Rayo x={250} y={820} s={1.6} rot={-10} /></g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.1} until={K.E + 2.2} anio="2025" quien="Google · su IA Gemini" revista="Elsworth et al. · arXiv 2508.15734" y={620} />
      <NumeroGigante T={T} at={K.E + 2.4} until={K.I - 0.2} valor={0.24} dec={2} dur={1.0} sufijo=" Wh" etiqueta="por pregunta típica de texto" x={620} y={800} tam={210} color={KC.orange} />
      <Chip T={T} at={K.E + 3.4} until={K.I - 0.2} texto="0.26 mL de agua" x={320} y={1060} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.E + 3.8} until={K.I - 0.2} texto="0.03 g CO₂e" x={780} y={1060} tam={36} borde={KC.ink} />

      {/* 3 · qué incluye: por dentro del centro de datos */}
      <Escena T={T} a={K.I} b={K.B}>
        <FondoCircuito T={T} />
        {svgK(<>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={kprog(T, K.I + 0.1 + k * 0.12, K.I + 0.4 + k * 0.12)}><Rack x={170 + k * 200} y={620} s={0.85} T={T} seed={k + 2} calor={k < 2 ? 0.8 : 0} /></g>)}
          <g opacity={kprog(T, K.I + 2.6, K.I + 3.0)}><Ventilador x={900} y={560} s={0.9} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.I + 0.3} until={K.B - 0.2} texto="dentro del centro de datos" x={560} y={330} tam={32} borde={KC.cyan} />
      {T >= K.I + 0.6 && T <= K.B + 0.4 && (() => { const o = kprog(T, K.I + 0.6, K.I + 1.0) * (1 - kprog(T, K.B - 0.1, K.B + 0.4)), a = kprog(T, K.I + 0.7, K.I + 1.5, kEase.sale), b = kprog(T, K.I + 1.6, K.I + 3.4, kEase.sale);
        return <div style={{ position:'absolute', left:90, top:920, width:900, zIndex:40, opacity:o }}>
          <div style={{ display:'flex', height:90, border:`6px solid ${KC.texto}`, borderRadius:18, overflow:'hidden', background:'rgba(0,0,0,.4)' }}>
            <div style={{ width: 375 * a, background:KC.cyan }}></div>
            <div style={{ width: 513 * b, background:KC.orange }}></div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:14, font:`700 28px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>
            <span style={{ color:KC.cyan }}>solo chips: 0.10 Wh</span>
            <span style={{ color:KC.orange, opacity:b }}>+ espera, servidor y enfriamiento</span>
          </div>
          <div style={{ textAlign:'right', font:`400 64px ${KF.titulo}`, color:KC.yellow, opacity:kprog(T, K.I + 3.2, K.I + 3.6), marginTop:4 }}>= 0.24 Wh</div>
        </div>; })()}

      {/* 4 · bajó 33 veces en un año */}
      <Escena T={T} a={K.B} b={K.P}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {T >= K.B && T <= K.P + 0.4 && (() => { const o = kprog(T, K.B, K.B + 0.3) * (1 - kprog(T, K.P - 0.1, K.P + 0.4)), enc = kprog(T, K.B + 1.0, K.B + 2.4, kEase.suave), h0 = 560;
        const hB = klerp(h0, h0 / 33, enc);
        return <div style={{ position:'absolute', inset:0, zIndex:40, opacity:o }}>
          <div style={{ position:'absolute', left:110, top:1110 - h0, width:220, height:h0, background:'rgba(22,18,15,.12)', border:`5px dashed ${KC.ink}`, borderRadius:'18px 18px 0 0' }}></div>
          <div style={{ position:'absolute', left:110, top:1110 - hB, width:220, height:hB, background:KC.red, border:`6px solid ${KC.ink}`, borderRadius:'18px 18px 0 0' }}></div>
          <div style={{ position:'absolute', left:90, width:260, top:1120, textAlign:'center', font:`900 34px ${KF.texto}`, color:KC.ink }}>{enc < 0.5 ? 'mayo 2024' : 'mayo 2025'}</div>
          <div style={{ position:'absolute', left:90, width:260, top:1110 - h0 - 100, textAlign:'center', font:`900 30px/1.15 ${KF.texto}`, color:KC.ink }}>energía de la pregunta típica</div>
        </div>; })()}
      <NumeroGigante T={T} at={K.B + 2.2} until={K.P - 0.2} valor={33} dur={0.8} prefijo="÷" etiqueta="" x={640} y={880} tam={280} color={KC.yellow} />
      <Chip T={T} at={K.B + 2.6} until={K.P - 0.2} texto="en 12 meses (según Google)" x={640} y={1080} tam={32} borde={KC.ink} />

      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.O} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svgK(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 6 · ojo: la pregunta de en medio, autorreportada; imágenes y video fuera */}
      <Escena T={T} a={K.O} b={K.S}>
        <FondoLunares color={KC.lilac} />
        {svgK(<>
          <g opacity={1 - kprog(T, L6 - 0.3, L6 + 0.2)}>
            {Array.from({ length: 9 }, (_, i) => { const h = 40 + i * i * 6.5, w = 80, x = 110 + i * 108, a = K.O + 0.3 + i * 0.12, mid = i === 4;
              const res = kprog(T, K.O + 1.6, K.O + 2.0);
              return <Burbuja key={i} x={x} y={1080} w={w} h={h} o={kprog(T, a, a + 0.25) * (mid ? 1 : 1 - 0.55 * res)} color={mid && res > 0 ? KC.yellow : KC.paper} />; })}
            <g opacity={kprog(T, K.O + 1.8, K.O + 2.2)}><path d="M 542 760 L 542 900" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><path d="M 515 875 L 542 912 L 569 875" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
          </g>
          <g opacity={kprog(T, L6 + 0.1, L6 + 0.4)}>
            <IconoMedio x={530} y={820} tipo="imagen" raya={kprog(T, L6 + 0.9, L6 + 1.3, kEase.sale)} />
            <IconoMedio x={830} y={820} tipo="video" raya={kprog(T, L6 + 1.3, L6 + 1.7, kEase.sale)} />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 1.9} until={K.O + 3.7} texto="la de en medio = mediana" x={540} y={700} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.O + 3.9} until={L6 - 0.3} texto="cifras de Google, sin revisión externa" x={600} y={700} tam={32} borde={KC.red} />
      <Chip T={T} at={L6 + 1.6} until={K.S - 0.2} texto="fuera de la cuenta" x={680} y={1020} tam={40} borde={KC.red} />

      {/* 7 · la suma: miles de millones de preguntas */}
      <Escena T={T} a={K.S} b={K.A} zoom={-0.04}>
        <FondoLunares color={KC.noche} punto="rgba(255,255,255,.05)" />
      </Escena>
      {T >= K.S - 0.3 && T <= K.A + 0.4 && <div style={{ position:'absolute', inset:0, zIndex:30, opacity:kprog(T, K.S - 0.3, K.S + 0.2) * (1 - kprog(T, K.A - 0.1, K.A + 0.4)) }}>
        <Cuadricula T={T} cols={40} filas={24} x={90} y={700} ancho={900} alto={460} llenado={kprog(T, K.S + 0.2, K.S + 3.2, kEase.suave)} lleno={KC.yellow} vacio="rgba(255,255,255,.08)" />
      </div>}
      <Chip T={T} at={K.S + 0.3} until={K.A - 0.2} texto="cada cuadrito = una pregunta" x={380} y={640} tam={30} borde={KC.yellow} />

      {/* 8 · la AIE: en 2030, un poco más que todo Japón */}
      <Escena T={T} a={K.A} b={K.R}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svgK(<>
          <Planeta x={540} y={560} r={180} T={T} luces={kprog(T, K.A + 0.6, K.A + 3.6)} />
          {T >= L9 && <g transform={`translate(540 560) rotate(-12) scale(${klerp(1.8, 1, kprog(T, L9, L9 + 0.35, kEase.sale))})`} opacity={kprog(T, L9, L9 + 0.25)}>
            <rect x={-250} y={-60} width={500} height={120} rx={16} fill="rgba(255,59,47,.15)" stroke={KC.red} strokeWidth={10} />
            <text y={30} textAnchor="middle" style={{ font:`400 88px ${KF.titulo}` }} fill={KC.red}>PROYECCIÓN</text>
          </g>}
        </>)}
      </Escena>
      <Chip T={T} at={K.A + 0.2} until={K.R - 0.2} texto="Agencia Internacional de Energía" x={540} y={330} tam={32} borde={KC.ink} />
      {T >= K.A + 2.6 && T <= K.R + 0.4 && (() => { const o = kprog(T, K.A + 2.6, K.A + 3.0) * (1 - kprog(T, K.R - 0.1, K.R + 0.4)), g1 = kprog(T, K.A + 3.0, K.A + 4.4, kEase.sale), g2 = kprog(T, K.A + 5.4, K.A + 6.8, kEase.sale);
        const fila = (txt, sub, w, g, color, icono, top) => <div style={{ position:'absolute', left:70, top, width:940 }}>
          <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, marginLeft:120 }}>{txt} <span style={{ font:`700 26px ${KF.mono}`, color:'#5a524a' }}>{sub}</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:8 }}>
            <div style={{ width:104, height:104 }}>{icono}</div>
            <div style={{ width: w * g, height:70, background:color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          </div>
        </div>;
        const icoDatos = <svg width={104} height={104} viewBox="-60 -60 120 120"><rect x={-40} y={-50} width={80} height={100} rx={8} fill="#232a3a" stroke={KC.ink} strokeWidth={6} />{[-30, -6, 18].map((yy) => <g key={yy}><rect x={-30} y={yy} width={60} height={16} rx={3} fill="#151a24" /><circle cx={-20} cy={yy + 8} r={4} fill={KC.mint} /></g>)}</svg>;
        const icoJapon = <svg width={104} height={104} viewBox="-130 -150 260 280"><Japon x={0} y={0} s={1} T={T} /></svg>;
        return <div style={{ position:'absolute', inset:0, zIndex:40, opacity:o }}>
          {fila('Centros de datos del mundo', '· 2030', 800, g1, KC.orange, icoDatos, 790)}
          {fila('Japón entero', '· hoy', 760, g2, KC.coral, icoJapon, 975)}
          <div style={{ position:'absolute', left:860, top:870, font:`900 30px ${KF.texto}`, color:KC.ink, opacity:kprog(T, K.A + 6.9, K.A + 7.3) }}>▲ un poco más</div>
        </div>; })()}

      {/* 9 · ahí no solo vive la IA */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svgK(<EdificioDatos x={540} y={860} T={T} aparece={kprog(T, K.R + 0.2, K.R + 2.6)} ia={kprog(T, K.R + 3.2, K.R + 3.6)} />)}
      </Escena>
      <Chip T={T} at={K.R + 3.4} until={K.C - 0.2} texto="la IA: una de las grandes razones" x={560} y={1160} tam={32} borde={KC.mint} />

      {/* 10 · cierre: la misma imagen… multiplicada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${klerp(1, 0.38, zoomFuera)})`, transformOrigin:'50% 42%' }}>
          {svgK(escenaTele(K.C, false))}
        </div>
        {svgK(<>{mosaico()}</>, 25)}
      </Escena>
      <Chip T={T} at={K.C + 3.2} until={K.Ou} texto="× miles de millones" x={360} y={1120} tam={44} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Menos que *9 segundos de tele…* y *5 gotas.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.I - 0.1} texto="Google, 2025: *0.24 Wh* por pregunta." />
      <Subtitulo T={T} idx={2} at={K.I + 0.1} until={K.B - 0.1} texto="Ya cuenta *espera y enfriamiento.*" />
      <Subtitulo T={T} idx={3} at={K.B + 0.1} until={K.P - 0.1} texto="En un año: *33 veces menos.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.O - 0.1} texto="¿Entonces *no gasta nada?*" />
      <Subtitulo T={T} idx={5} at={K.O + 0.1} until={L6 - 0.1} texto="La pregunta *típica*, de texto… y *datos de Google.*" />
      <Subtitulo T={T} idx={6} at={L6 + 0.05} until={K.S - 0.1} texto="Imágenes y video: *fuera de la cuenta.*" />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={K.A - 0.1} texto="Lo que pesa: *la suma.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={L9 - 0.1} texto="2030: *un poco más que Japón.*" />
      <Subtitulo T={T} idx={9} at={L9 + 0.05} until={K.R - 0.1} texto="Es una *proyección.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.C - 0.1} texto="IA, internet y nube… *la IA empuja.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una pregunta: *9 s de tele.* Pero somos *miles de millones.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 2.5, CUES.Incluye - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Baja + 0.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Ojo + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ojo + 4.0, CUES.Suma - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Suma + 0.4, CUES.AIE - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.AIE + 7.8, CUES.Razones - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Razones + 0.4, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="17" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EnergiaPreguntaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EnergiaPregunta /></CompositionStage></div>;
}
window.EnergiaPreguntaApp = EnergiaPreguntaApp;
