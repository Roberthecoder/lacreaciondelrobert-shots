// Shot Ambiental #21 · Ese foco no es una lámpara: es un calentador (focos LED) — NARRADO (N1 por dentro + medidores N3).
// Datos: DOE (EE. UU.) 2021, Premio Nobel de Física 2014 y NOM-028-ENER-2017 (DOF 9 mar 2018). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (foco, filamento, chip por capas).

const FC_VIDRIO = 'M -55 150 C -60 110 -110 80 -110 0 A 110 110 0 1 1 110 0 C 110 80 60 110 55 150 Z';
// Rosca del foco (de y = 150 a 235 en coordenadas del foco).
function FcRosca() {
  return <g>
    <rect x={-56} y={148} width={112} height={74} rx={10} fill="#c9ccd3" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => <path key={i} d={`M -56 ${166 + i * 20} L 56 ${158 + i * 20}`} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -36 222 L -22 246 L 22 246 L 36 222 Z" fill="#2a2a2e" stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={250} r={10} fill="#8a8f99" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Foco incandescente (origen = centro del vidrio; base hacia abajo, o hacia arriba si colgado).
// on 0..1 encendido · roto 0..1 filamento roto · calor 0..1 ondas de calor (en coordenadas de pantalla, suben).
function FocoInc({ T, x, y, s = 1, on = 1, roto = 0, calor = 0, colgado = false, rayos = 1, o = 1 }) {
  const id = 'fi' + Math.round(x * 3 + y);
  const brilla = on * (1 - roto);
  const zig = Array.from({ length: 11 }, (_, i) => `${-40 + i * 8} ${10 + (i % 2 ? -11 : 11)}`).join(' L ');
  const ondas = Array.from({ length: 6 }, (_, i) => {
    const u = ((T * 0.55 + i / 6) % 1), xx = -150 + i * 60, yy = -40 - u * 260;
    return <path key={i} d={`M ${xx} ${yy} q 14 -18 0 -36 q -14 -18 0 -36 q 14 -18 0 -36`} stroke={i % 2 ? KC.red : KC.orange} strokeWidth={9} fill="none" strokeLinecap="round" opacity={calor * Math.sin(Math.PI * u) * 0.95} />;
  });
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><radialGradient id={id}><stop offset="0%" stopColor="#fff7b0" stopOpacity=".95" /><stop offset="45%" stopColor="#ffd84a" stopOpacity=".55" /><stop offset="100%" stopColor="#ffb000" stopOpacity="0" /></radialGradient></defs>
    {brilla > 0.01 && <circle r={240} fill={`url(#${id})`} opacity={brilla * (0.85 + 0.15 * Math.sin(T * 9))} />}
    {brilla > 0.01 && rayos > 0 && Array.from({ length: 6 }, (_, i) => { const a = (-150 + i * 24) * Math.PI / 180 * (colgado ? -1 : 1);
      return <line key={i} x1={Math.cos(a) * 150} y1={Math.sin(a) * 150} x2={Math.cos(a) * 200} y2={Math.sin(a) * 200} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" opacity={brilla * rayos} />; })}
    <g transform={colgado ? 'rotate(180)' : ''}>
      <path d={FC_VIDRIO} fill={brilla > 0.3 ? 'rgba(255,248,210,.88)' : 'rgba(230,236,245,.75)'} stroke={KC.ink} strokeWidth={7} />
      <path d="M -70 -40 Q -78 -80 -45 -95" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".8" />
      <line x1={-18} y1={150} x2={-40} y2={10} stroke="#6b6f78" strokeWidth={5} />
      <line x1={18} y1={150} x2={40} y2={10} stroke="#6b6f78" strokeWidth={5} />
      <path d={`M -40 10 L ${zig}`} stroke={brilla > 0.3 ? '#fffbe0' : '#555'} strokeWidth={brilla > 0.3 ? 6 : 4} fill="none" strokeLinejoin="round"
        strokeDasharray={roto > 0.5 ? '38 12 200' : 'none'} style={{ filter: brilla > 0.3 ? 'drop-shadow(0 0 8px #ffd84a)' : 'none' }} />
      <FcRosca />
    </g>
    <g transform={colgado ? 'translate(0 -40)' : 'translate(0 -110)'}>{ondas}</g>
  </g>;
}
// Foco LED (cúpula lechosa + disipador blanco + rosca).
function FocoLED({ T, x, y, s = 1, on = 1, colgado = false, rayos = 1, o = 1 }) {
  const id = 'fl' + Math.round(x * 3 + y);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><radialGradient id={id}><stop offset="0%" stopColor="#ffffff" stopOpacity=".95" /><stop offset="45%" stopColor="#fff3a8" stopOpacity=".55" /><stop offset="100%" stopColor="#fff3a8" stopOpacity="0" /></radialGradient></defs>
    {on > 0.01 && <circle r={240} fill={`url(#${id})`} opacity={on} />}
    {on > 0.01 && rayos > 0 && Array.from({ length: 6 }, (_, i) => { const a = (-150 + i * 24) * Math.PI / 180 * (colgado ? -1 : 1);
      return <line key={i} x1={Math.cos(a) * 150} y1={Math.sin(a) * 150} x2={Math.cos(a) * 200} y2={Math.sin(a) * 200} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" opacity={on * rayos} />; })}
    <g transform={colgado ? 'rotate(180)' : ''}>
      <path d="M -100 40 A 110 110 0 1 1 100 40 Z" fill={on > 0.3 ? '#fffdf2' : '#eef1f5'} stroke={KC.ink} strokeWidth={7} />
      <path d="M -100 40 L 100 40 L 62 150 L -62 150 Z" fill="#f4f6fa" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={-60 + i * 40} y1={52} x2={-42 + i * 28} y2={140} stroke="#b8bec9" strokeWidth={5} />)}
      <FcRosca />
    </g>
  </g>;
}
// Cable del techo hasta la rosca de un foco colgado.
const Cable = ({ x, y, s = 1 }) => <line x1={x} y1={-20} x2={x} y2={y - 245 * s} stroke={KC.ink} strokeWidth={10} />;

// Diodo LED de 5 mm (cúpula + aro + dos patitas). on 0..1.
function Diodo({ x, y, color, on = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0.01 && <circle cx={0} cy={-40} r={120} fill={color} opacity={0.35 * on} />}
    <line x1={-22} y1={60} x2={-22} y2={190} stroke="#9aa0aa" strokeWidth={8} />
    <line x1={22} y1={60} x2={22} y2={170} stroke="#9aa0aa" strokeWidth={8} />
    <path d="M -50 60 L -50 -40 A 50 50 0 0 1 50 -40 L 50 60 Z" fill={mixHex('#d8dde5', color, 0.35 + 0.65 * on)} stroke={KC.ink} strokeWidth={6} />
    <rect x={-62} y={50} width={124} height={20} rx={6} fill={mixHex('#c3c8d0', color, 0.3 + 0.5 * on)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -30 -50 Q -30 -76 -10 -82" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
}

// Interior del filamento (para la Lupa): espiral que brilla, corriente que la recorre y que se rompe.
function InteriorFilamento({ T, r, t0, rompe }) {
  const w = r * 2, cy = r, br = rompe > 0.5 ? 0 : 1;
  const vueltas = Array.from({ length: 9 }, (_, i) => { const cx = 60 + i * ((w - 120) / 8);
    if (rompe > 0.5 && i === 4) return null;
    return <ellipse key={i} cx={cx} cy={cy} rx={16} ry={56} fill="none" stroke={br ? '#fff3c4' : '#6b6f78'} strokeWidth={9} />; });
  const puntos = br ? Array.from({ length: 10 }, (_, i) => { const u = ((T - t0) * 0.6 + i / 10) % 1; return <circle key={i} cx={40 + u * (w - 80)} cy={cy + Math.sin(u * 50) * 50} r={7} fill={KC.cyan} />; }) : null;
  const chispa = rompe > 0.5 && rompe < 0.95;
  return <svg width={w} height={w}>
    <rect width={w} height={w} fill="#140c08" />
    {br > 0 && <circle cx={r} cy={cy} r={r * 0.9} fill="#ff9a2a" opacity={0.25 + 0.08 * Math.sin(T * 12)} />}
    <line x1={20} y1={cy} x2={60} y2={cy} stroke="#8a8f99" strokeWidth={10} />
    <line x1={w - 60} y1={cy} x2={w - 20} y2={cy} stroke="#8a8f99" strokeWidth={10} />
    <g style={{ filter: br ? 'drop-shadow(0 0 10px #ffcf4a)' : 'none' }}>{vueltas}</g>
    {puntos}
    {chispa && <g transform={`translate(${r} ${cy}) scale(${1 + rompe})`}>{Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={0} x2={Math.cos(i * 0.785) * 60} y2={Math.sin(i * 0.785) * 60} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />)}</g>}
    <text x={r} y={w - 46} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#ffd9a0">alambre en espiral</text>
  </svg>;
}

// Chip LED en corte (esquema): capa n (sobran electrones), capa activa, capa p (faltan electrones = huecos).
// Cada encuentro electrón-hueco suelta un destello de luz; algunos sueltan calor.
function ChipCorte({ T, t0, x = 110, y = 760, w = 860 }) {
  const yN = y, yA = y + 150, yP = y + 210, yF = y + 360;
  const ev = [];
  for (let i = 0; i < 40; i++) {
    const ti = t0 + 0.4 + i * 0.32, u = T - ti; if (u < 0 || u > 1.7) continue;
    const ex = x + 70 + ((i * 263) % (w - 140));
    const baja = kprog(T, ti, ti + 0.7, kEase.suave), xy = klerp(yN + 40, yA + 30, baja), hy = klerp(yF - 40, yA + 30, baja);
    const calor = i % 5 === 3;
    if (u < 0.7) {
      ev.push(<g key={'e' + i}><circle cx={ex} cy={xy} r={15} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} /><text x={ex} y={xy + 8} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>−</text></g>);
      ev.push(<g key={'h' + i}><circle cx={ex} cy={hy} r={15} fill="none" stroke={KC.pink} strokeWidth={5} /><text x={ex} y={hy + 8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.pink}>+</text></g>);
    } else {
      const v = (u - 0.7) / 1.0, f = 1 - kprog(T, ti + 0.7, ti + 0.95);
      ev.push(<circle key={'f' + i} cx={ex} cy={yA + 30} r={10 + 40 * (1 - f)} fill={calor ? KC.red : '#fff6b0'} opacity={f} />);
      if (calor) ev.push(<path key={'c' + i} d={`M ${ex} ${yA + 20 - v * 60} q 10 -12 0 -24 q -10 -12 0 -24`} stroke={KC.red} strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - v} />);
      else { const yy = yA + 10 - v * 380; ev.push(<path key={'p' + i} d={`M ${ex} ${yy} q 14 -15 0 -30 q -14 -15 0 -30 q 14 -15 0 -30`} stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinecap="round" opacity={kclamp(1.3 - v, 0, 1)} />); }
    }
  }
  return <g>
    <rect x={x - 30} y={yN - 40} width={w + 60} height={yF - yN + 80} rx={20} fill="#2a2f3a" stroke={KC.ink} strokeWidth={6} />
    <rect x={x} y={yN} width={w} height={yA - yN} fill="#1d3c7a" stroke={KC.ink} strokeWidth={5} />
    <rect x={x} y={yA} width={w} height={yP - yA} fill={mixHex('#3a2f10', '#ffe066', 0.4 + 0.25 * Math.sin(T * 8))} stroke={KC.ink} strokeWidth={5} />
    <rect x={x} y={yP} width={w} height={yF - yP} fill="#6a1f45" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 14 }, (_, i) => { const px = x + 40 + (i * 61) % (w - 80), py = yN + 30 + ((i * 37) % 90) + Math.sin(T * 3 + i) * 6;
      return <circle key={'en' + i} cx={px} cy={py} r={9} fill={KC.cyan} opacity=".55" />; })}
    {Array.from({ length: 14 }, (_, i) => { const px = x + 40 + (i * 67) % (w - 80), py = yP + 40 + ((i * 41) % 90) + Math.sin(T * 3 + i * 2) * 6;
      return <circle key={'hp' + i} cx={px} cy={py} r={9} fill="none" stroke={KC.pink} strokeWidth={4} opacity=".6" />; })}
    {ev}
    <text x={x + 20} y={yN + 34} style={{ font:`700 28px ${KF.mono}` }} fill="#cfe6ff">n · sobran electrones</text>
    <text x={x + 20} y={yA + 42} style={{ font:`700 26px ${KF.mono}` }} fill="#2a1d00">capa activa</text>
    <text x={x + 20} y={yF - 16} style={{ font:`700 28px ${KF.mono}` }} fill="#ffd0e6">p · faltan electrones (huecos)</text>
  </g>;
}

// Medidor de aguja en lúmenes por watt (0 a 80).
function MedidorLm({ T, cx, cy, r, valor, marca = 0, o = 1 }) {
  const ang = (v) => Math.PI - (v / 80) * Math.PI, P = (v, rr) => [cx + rr * Math.cos(ang(v)), cy - rr * Math.sin(ang(v))];
  const arco = (v0, v1, rr) => { const [x0, y0] = P(v0, rr), [x1, y1] = P(v1, rr); return `M ${x0} ${y0} A ${rr} ${rr} 0 0 1 ${x1} ${y1}`; };
  const [nx, ny] = P(valor, r - 60), [mx0, my0] = P(60, r - 40), [mx1, my1] = P(60, r + 40), [lx, ly] = P(60, r + 80);
  return <g opacity={o}>
    <path d={`M ${cx - r - 50} ${cy + 30} A ${r + 50} ${r + 50} 0 0 1 ${cx + r + 50} ${cy + 30} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d={arco(0, 60, r)} stroke="#ff9a7a" strokeWidth={46} fill="none" />
    <path d={arco(60, 80, r)} stroke={KC.leaf} strokeWidth={46} fill="none" />
    {[0, 20, 40, 60, 80].map((v) => { const [a, b] = P(v, r - 40), [c, d] = P(v, r - 70), [tx, ty] = P(v, r - 105);
      return <g key={v}><line x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={6} /><text x={tx} y={ty + 12} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>; })}
    {marca > 0 && <g opacity={marca}><line x1={mx0} y1={my0} x2={mx1} y2={my1} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
      <text x={lx} y={ly} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>60</text></g>}
    <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
    <circle cx={cx} cy={cy} r={26} fill={KC.ink} />
    <text x={cx} y={cy + 80} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>lúmenes por watt</text>
  </g>;
}

// Robert que entra y sale de lado (nunca cruza el subtítulo al salir, a diferencia del Sticker del kit, que baja).
const FC_LADOS = { 'arriba-der': { left:690, top:300, width:330 }, 'gancho': { left:600, top:230, width:460 }, 'izq-alto': { left:-10, top:300, width:330 },
  'grande': { left:520, top:560, width:580 }, 'grande-izq': { left:-20, top:560, width:580 } };
function RobertF({ T, apariciones = [], base = 'assets/stickers/' }) {
  return <>{apariciones.map(([at, until, pose, lado], k) => {
    if (T < at || T > until + 0.45) return null;
    const L = FC_LADOS[lado] || FC_LADOS['arriba-der'], izq = lado === 'izq-alto' || lado === 'grande-izq';
    const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
    const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
    const tx = ((1 - i) + o) * (L.width + 120) * (izq ? -1 : 1);
    return <img key={k} src={`${base}${pose}.png`} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%',
      transform:`translate(${tx}px, 0px) scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
  })}</>;
}

function FocosShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Calor, F: CUES.Filamento, P: CUES.Pregunta, Ch: CUES.Chip, N: CUES.Nobel, A: CUES.Ahorro, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: el foco se enciende con un clic antes del segundo 0.3
  const onG = kprog(T, K.G + 0.15, K.G + 0.35);
  // calor: barra 90/10 y 10 cuadritos de energía
  const rojo = kprog(T, K.Ca + 0.6, K.Ca + 2.6, kEase.suave), amar = kprog(T, K.Ca + 2.8, K.Ca + 3.3, kEase.sale);
  const cuadro = (i) => kprog(T, K.Ca + 3.6 + i * 0.22, K.Ca + 3.8 + i * 0.22);
  // filamento: se rompe
  const rompe = kprog(T, K.F + 3.6, K.F + 4.2);
  // cierre: cambia el foco por el LED
  const cambio = kprog(T, K.C + 2.4, K.C + 3.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el foco colgado se enciende y echa calor */}
      <Escena T={T} a={K.G} b={K.Ca}>
        <FondoLunares color={KC.orange} />
        {svg(<><Cable x={330} y={700} /><FocoInc T={T} x={330} y={700} colgado on={onG} calor={onG} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 2 · 90 % calor, 10 % luz */}
      <Escena T={T} a={K.Ca} b={K.F}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={90} y={760} width={900} height={96} rx={24} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={7} />
          <rect x={98} y={768} width={Math.max(0, 810 * rojo - 4)} height={80} rx={18} fill={KC.red} />
          <rect x={98 + 810} y={768} width={Math.max(0, 84 * amar)} height={80} rx={18} fill={KC.gold2} />
          {rojo > 0.5 && <text x={130} y={826} style={{ font:`400 54px ${KF.titulo}` }} fill="#fff" opacity={kprog(T, K.Ca + 1.6, K.Ca + 2.0)}>CALOR · 90 %</text>}
          {amar > 0.5 && <text x={990} y={910} textAnchor="end" style={{ font:`400 48px ${KF.titulo}` }} fill={KC.ink}>LUZ · 10 %</text>}
          {Array.from({ length: 10 }, (_, i) => { const c = cuadro(i), luz = i === 9, cx = 135 + i * 90;
            return <g key={i} transform={`translate(${cx} 1040)`}>
              <rect x={-36} y={-36} width={72} height={72} rx={14} fill={c > 0.5 ? (luz ? KC.gold2 : KC.red) : '#fff'} stroke={KC.ink} strokeWidth={6} />
              {c > 0.5 && (luz ? <circle r={14} fill="#fff" /> : <path d="M -6 18 q 12 -12 0 -24 q -12 -12 0 -24" transform="translate(0 6)" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />)}
            </g>; })}
          <text x={540} y={1130} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={cuadro(0)}>10 partes de energía</text>
          <FocoInc T={T} x={250} y={560} s={0.62} on={1} calor={1} />
        </>)}
      </Escena>
      {/* 3 · el filamento por dentro: se calienta y se rompe */}
      <Escena T={T} a={K.F} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<FocoInc T={T} x={540} y={930} s={1.15} on={1} roto={rompe} calor={1 - rompe} />)}
        <EscalaFija texto="esquema" largo={0} y={1500} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.F + 0.5} until={K.P - 0.25} x={640} y={500} r={190} fx={540} fy={940} tinte={KC.orange} etiqueta="POR DENTRO · FILAMENTO"
        interior={(t, r) => <InteriorFilamento T={t} r={r} t0={K.F} rompe={rompe} />} />
      {/* 4 · pregunta: ¿y el LED? */}
      <Escena T={T} a={K.P} b={K.Ch} zoom={0.08}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <text x={250} y={760} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 640)`}>?</text>
          <FocoLED T={T} x={260} y={980} s={0.8} on={kprog(T, K.P + 0.5, K.P + 0.8)} />
        </>)}
      </Escena>
      {/* 5 · el chip LED por capas (fondo oscuro: adentro del chip) */}
      <Escena T={T} a={K.Ch} b={K.N}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 55%, #1a2440 0%, ${KC.noche} 70%)` }}></div>
        {svg(<ChipCorte T={T} t0={K.Ch} x={110} y={790} w={860} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.texto} />
      </Escena>
      {/* 6 · el LED azul: Nobel 2014 */}
      <Escena T={T} a={K.N} b={K.A}>
        <FondoLunares color={KC.lilac} />
        {(() => { const az = kprog(T, K.N + 1.6, K.N + 2.0), mez = kprog(T, K.N + 2.6, K.N + 3.2, kEase.suave), fuera = 1 - kprog(T, K.N + 3.7, K.N + 4.1);
          return svg(<g opacity={fuera}>
            <rect x={110} y={520} width={860} height={720} rx={40} fill="#14112a" stroke={KC.ink} strokeWidth={7} />
            <Diodo x={klerp(300, 470, mez)} y={940} color="#ff3b3b" on={1} />
            <Diodo x={540} y={940} color="#2fe060" on={1} />
            <Diodo x={klerp(780, 610, mez)} y={940} color="#2f6bff" on={az} />
            {az < 0.5 && <text x={780} y={760} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6}>?</text>}
            {mez > 0 && <g opacity={mez} style={{ mixBlendMode:'screen' }}>
              <circle cx={480} cy={690} r={110} fill="#ff3b3b" opacity=".85" /><circle cx={600} cy={690} r={110} fill="#2f6bff" opacity=".85" /><circle cx={540} cy={600} r={110} fill="#2fe060" opacity=".85" />
              <circle cx={540} cy={660} r={56 * mez} fill="#fff" /></g>}
            {mez > 0.5 && <text x={540} y={1200} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill="#fff">rojo + verde + azul = BLANCO</text>}
          </g>); })()}
      </Escena>
      {/* 7 · ahorro: 9 W = 75 W de luz, y dura hasta 25 veces más */}
      <Escena T={T} a={K.A} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {(() => { const p1 = 1 - kprog(T, K.A + 3.0, K.A + 3.4), p2 = kprog(T, K.A + 3.3, K.A + 3.7), seg = kprog(T, K.A + 3.8, K.A + 5.8);
          return svg(<>
            <g opacity={p1}>
              <path d="M 230 820 L 130 1180 L 450 1180 L 350 820 Z" fill="#fff3a0" opacity=".7" />
              <path d="M 730 820 L 630 1180 L 950 1180 L 850 820 Z" fill="#fff3a0" opacity=".7" />
              <FocoInc T={T} x={290} y={620} s={0.72} on={1} calor={1} />
              <FocoLED T={T} x={790} y={620} s={0.72} on={1} />
              <text x={290} y={460} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4}>75 W</text>
              <text x={790} y={460} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={4}>9 W</text>
              <text x={290} y={1100} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1,100 lm</text>
              <text x={790} y={1100} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1,100 lm</text>
            </g>
            <g opacity={p2}>
              <text x={90} y={850} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>incandescente</text>
              <rect x={90} y={870} width={32} height={60} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
              <text x={90} y={1010} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>LED: hasta ×25</text>
              {Array.from({ length: 25 }, (_, i) => i / 25 < seg ? <rect key={i} x={90 + i * 36} y={1030} width={32} height={60} rx={8} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} /> : null)}
              <text x={990} y={1140} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>cuánto duran (veces)</text>
            </g>
          </>); })()}
      </Escena>
      {/* 8 · México: la norma pide 60 lm/W; el clásico da 16 */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={kprog(T, K.M + 0.3, K.M + 0.8)}><MapaMexico x={80} y={500} ancho={420} conCA={false} color="#ffe9a8" /></g>
          <MedidorLm T={T} cx={540} cy={1110} r={300} valor={16 * kprog(T, K.M + 6.0, K.M + 7.0, kEase.sale)} marca={kprog(T, K.M + 4.6, K.M + 5.0)} />
        </>)}
      </Escena>
      {/* 9 · cierre: el mismo foco del inicio… y el LED en su lugar */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={mixHex(KC.orange, KC.cyan, cambio)} />
        {svg(<><Cable x={330} y={700} />
          <FocoInc T={T} x={330} y={700} colgado on={1} calor={1 - cambio} o={1 - cambio} />
          <FocoLED T={T} x={330} y={700} colgado on={1} o={cambio} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1500} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.4} until={K.Ca - 0.2} texto="¿lámpara o calentador?" y={1460} x={540} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ca + 0.7} until={K.F - 0.2} texto="DOE (EE. UU.), 2021" y={430} x={560} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.F + 4.1} until={K.P - 0.2} texto="dura ≈ 1,000 horas" y={1460} x={540} tam={38} borde={KC.orange} />
      <Etq T={T} at={K.P + 0.9} until={K.Ch - 0.2} x={260} y={1240} texto="LED" lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ch + 0.3} until={K.N - 0.2} texto="chip LED por dentro" y={430} x={380} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Ch + 2.4} until={K.N - 0.2} texto="● luz   ● algo de calor" y={1460} x={540} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.N + 1.4} until={K.A - 0.2} texto="inicios de los 90 · Japón" y={430} x={380} tam={30} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.N + 4.0} until={K.A - 0.2} anio="2014" quien="Akasaki, Amano y Nakamura" revista="Nobel de Física · el LED azul" x={540} y={930} />
      <Chip T={T} at={K.A + 0.4} until={K.M - 0.2} texto="DOE, 2021" y={1460} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.3} until={K.C - 0.2} texto="México · NOM-028-ENER-2017" y={430} x={380} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.M + 4.8} until={K.C - 0.2} texto="mínimo desde 2019: 60 lm/W" y={1460} x={540} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.M + 6.8} until={K.C - 0.2} texto="foco clásico: 16 lm/W" y={1545} x={540} tam={30} borde={KC.red} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou - 0.1} texto="misma luz, mucho menos calor" y={1460} x={540} tam={36} borde={KC.cyan} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="No es una lámpara: *es un calentador.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.F - 0.1} texto="*90 % calor,* solo 10 % luz." />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.P - 0.1} texto="Ese calor *destruye el alambre.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Ch - 0.1} texto="¿Y cómo le hace *un LED?*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={K.N - 0.1} texto="Electricidad → *luz directa.*" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.A - 0.1} texto="El LED azul: *Nobel 2014.*" />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.M - 0.1} texto="9 W, la luz de 75 W: *hasta 25× más vida.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.C - 0.1} texto="México pide 60 lm/W: *el clásico da 16.*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un calentador *que de paso alumbra.*" />

      <RobertF T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Calor + 0.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Calor + 3.7, CUES.Filamento - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Filamento + 3.0, CUES.Pregunta - 0.5, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Chip - 0.45, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Chip + 3.9, CUES.Nobel - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Nobel + 4.2, CUES.Ahorro - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Ahorro + 3.4, CUES.Mexico - 0.5, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Mexico + 4.2, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="21" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FocosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FocosShot /></CompositionStage></div>;
}
window.FocosApp = FocosApp;
