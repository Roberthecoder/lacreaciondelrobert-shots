// Shot Científico #20 · Tienes un hoyo en tu vista y tu cerebro lo rellena — NARRADO (prueba del punto ciego + N1 "Por dentro": la retina).
// Datos: Mariotte 1668, Komatsu et al. 2000 (J Neurosci), Komatsu 2006 (Nat Rev Neurosci), Hanke y Kelber 2020 (Front Physiol). Ver guion.md y verificacion.md.
// LA PRUEBA TIENE QUE FUNCIONAR EN UN CELULAR: de Prueba a Desaparece el fondo es amarillo liso y quieto, la cruz (x 180) y el punto rojo
// (110 px, x 900) están a la misma altura (y 800) y no se mueven; nada se mueve cerca del punto y Robert no sale.
const PRUEBA = { cx: 180, px: 900, y: 800, r: 55 };
const CRETINA = KC.coral, CNERVIO = '#f4c99c';

// Cruz y punto de la prueba (dentro de svg). punto 0..1 = opacidad del punto.
function CruzPunto({ punto = 1 }) {
  return <g>
    <rect x={PRUEBA.cx - 50} y={PRUEBA.y - 9} width={100} height={18} fill={KC.ink} />
    <rect x={PRUEBA.cx - 9} y={PRUEBA.y - 50} width={18} height={100} fill={KC.ink} />
    <circle cx={PRUEBA.px} cy={PRUEBA.y} r={PRUEBA.r} fill={KC.red} opacity={punto} />
  </g>;
}
// Patrón de rayas diagonales (defs).
function Rayas({ id, a = KC.yellow, b = KC.pink, w = 34 }) {
  return <pattern id={id} width={w * 2} height={w * 2} patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
    <rect width={w * 2} height={w * 2} fill={a} /><rect width={w} height={w * 2} fill={b} /></pattern>;
}
// Ojo de frente (almendra) que parpadea. parp 0..1 cierra los párpados.
function OjoFrente({ x, y, s = 1, parp = 0, iris = KC.teal, mira = 0, id = 'of' }) {
  const w = 250 * s, h = 150 * s, alm = `M ${x - w} ${y} Q ${x} ${y - 1.6 * h} ${x + w} ${y} Q ${x} ${y + 1.6 * h} ${x - w} ${y} Z`;
  const ix = x + mira * 0.3 * w, c = parp * h * 0.85;
  return <g>
    <defs><clipPath id={`alm-${id}`}><path d={alm} /></clipPath></defs>
    <path d={alm} fill="#fff" />
    <g clipPath={`url(#alm-${id})`}>
      <circle cx={ix} cy={y} r={0.62 * h} fill={iris} stroke={KC.ink} strokeWidth={7 * s + 2} />
      <circle cx={ix} cy={y} r={0.3 * h} fill={KC.ink} />
      <circle cx={ix + 0.18 * h} cy={y - 0.2 * h} r={0.12 * h} fill="#fff" />
      <rect x={x - w} y={y - h} width={2 * w} height={c + 2} fill={CPIEL} />
      <rect x={x - w} y={y + h - c} width={2 * w} height={c + 2} fill={CPIEL} />
      {parp > 0.05 && <line x1={x - w} y1={y - h + c} x2={x + w} y2={y - h + c} stroke={KC.ink} strokeWidth={8 * s + 2} />}
    </g>
    <path d={alm} fill="none" stroke={KC.ink} strokeWidth={10 * s + 4} />
    {Array.from({ length: 7 }, (_, i) => { const f = 0.2 + i * 0.1, bx = (1 - f) * (1 - f) * (x - w) + 2 * f * (1 - f) * x + f * f * (x + w), by = (1 - f) * (1 - f) * y + 2 * f * (1 - f) * (y - 1.6 * h) + f * f * y;
      return <line key={i} x1={bx} y1={by} x2={bx + (f - 0.5) * 50 * s} y2={by - 40 * s} stroke={KC.ink} strokeWidth={8 * s + 2} strokeLinecap="round" />; })}
  </g>;
}
const parpadeo = (T, t0, d = 0.26) => Math.max(0, 1 - Math.abs(T - t0) / (d / 2));

// Ojo humano en corte, de perfil, mirando a la derecha. El nervio óptico sale por el fondo (disco = punto ciego).
const ANG_DISCO = 192 * Math.PI / 180;
function OjoCorteH({ cx, cy, R = 290, T, rayos = 0, pulso = 0, fibras = 0, disco = 0 }) {
  const Rr = R - 22, dx = Math.cos(ANG_DISCO), dy = -Math.sin(ANG_DISCO);
  const D = [dx * Rr, dy * Rr], gap = 0.11;
  // nervio: tubo desde el disco hacia la izquierda y abajo
  const n0 = [D[0] - 10, D[1]], n1 = [-R - 260, D[1] + 120];
  return <g transform={`translate(${cx} ${cy})`}>
    <path d={`M ${n0[0]} ${n0[1] - 44} C ${-R - 60} ${D[1] - 40} ${-R - 120} ${n1[1] - 50} ${n1[0]} ${n1[1] - 50} L ${n1[0]} ${n1[1] + 50} C ${-R - 120} ${n1[1] + 50} ${-R - 60} ${D[1] + 50} ${n0[0]} ${n0[1] + 44} Z`} fill={CNERVIO} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {pulso > 0 && Array.from({ length: 5 }, (_, i) => { const f = (T * 0.7 + i / 5) % 1, x = klerp(n0[0] - 20, n1[0] + 40, f), y = klerp(n0[1], n1[1], f * f);
      return <circle key={i} cx={x} cy={y} r={13} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={pulso * Math.sin(Math.PI * f)} />; })}
    <path d={`M ${0.74 * R} ${-0.66 * R} Q ${1.32 * R} 0 ${0.74 * R} ${0.66 * R}`} fill="rgba(210,245,255,.75)" stroke={KC.ink} strokeWidth={9} />
    <circle r={R} fill="#fffaf3" stroke={KC.ink} strokeWidth={11} />
    <circle r={R - 34} fill="rgba(175,228,255,.35)" />
    {/* retina en dos tramos: el hueco es el disco del nervio */}
    <path d={`M ${Rr * Math.cos(1.05)} ${-Rr * Math.sin(1.05)} A ${Rr} ${Rr} 0 0 0 ${Rr * Math.cos(ANG_DISCO - gap)} ${-Rr * Math.sin(ANG_DISCO - gap)}`} fill="none" stroke={CRETINA} strokeWidth={20} strokeLinecap="round" />
    <path d={`M ${Rr * Math.cos(ANG_DISCO + gap)} ${-Rr * Math.sin(ANG_DISCO + gap)} A ${Rr} ${Rr} 0 0 0 ${Rr * Math.cos(-1.05)} ${-Rr * Math.sin(-1.05)}`} fill="none" stroke={CRETINA} strokeWidth={20} strokeLinecap="round" />
    {/* fibras que corren por la retina hacia el disco */}
    {fibras > 0 && <g opacity={fibras}>{[-1, 1].map((sg) => [0.25, 0.5, 0.8, 1.1].map((da, j) => { const a0 = ANG_DISCO + sg * (gap + da), r0 = Rr - 18;
      const pts = Array.from({ length: 9 }, (_, k) => { const a = klerp(a0, ANG_DISCO + sg * gap * 0.3, k / 8); return `${(r0 * Math.cos(a)).toFixed(1)},${(-r0 * Math.sin(a)).toFixed(1)}`; });
      return <polyline key={sg + '' + j} points={pts.join(' ')} fill="none" stroke={KC.yellow} strokeWidth={4} strokeDasharray="12 8" strokeDashoffset={-T * 40} />; }))}</g>}
    {disco > 0 && <circle cx={D[0]} cy={D[1]} r={46} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="12 8" opacity={disco} transform={`rotate(${T * 40} ${D[0]} ${D[1]})`} />}
    {[-1, 1].map((sg) => <line key={sg} x1={0.8 * R} y1={sg * 0.17 * R} x2={0.8 * R} y2={sg * 0.6 * R} stroke={KC.teal} strokeWidth={22} strokeLinecap="round" />)}
    <ellipse cx={0.62 * R} cy={0} rx={0.15 * R} ry={0.34 * R} fill="rgba(255,236,190,.95)" stroke={KC.ink} strokeWidth={8} />
    {rayos > 0 && <g opacity={rayos}>{[-1, 0, 1].map((j) => <polyline key={j} points={`${2.0 * R},${j * 0.18 * R} ${0.62 * R},${j * 0.1 * R} ${-Rr + 20},${j * -0.25 * R}`} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="30 16" strokeDashoffset={T * 110} strokeLinejoin="round" />)}</g>}
  </g>;
}
// Retina vista de cerca (franja). La luz llega de arriba. hueco: dibuja el disco sin conos ni bastones y las fibras que bajan por él.
// cefalopodo: las fibras salen por abajo (detrás) en muchos haces y la retina no tiene hueco.
function RetinaCerca({ T, x0 = 60, x1 = 1020, y = 760, p = 1, hueco = true, marca = 0, cefalopodo = false, haces = 1 }) {
  const g0 = 400, g1 = 680, celdas = [];
  for (let i = 0, x = x0 + 20; x < x1 - 10; i++, x += 46) {
    if (hueco && x > g0 && x < g1) continue;
    const e = kprog(p, Math.abs(x - 540) / 900, Math.abs(x - 540) / 900 + 0.25, kEase.rebote);
    const cono = i % 3 === 1;
    celdas.push(<g key={i} transform={`translate(${x} ${y}) scale(${e})`}>
      {cono ? <><rect x={-12} y={10} width={24} height={60} rx={8} fill="#ffd0a8" stroke={KC.ink} strokeWidth={4} /><path d="M -14 10 L 0 -40 L 14 10 Z" fill={[KC.red, KC.mint, KC.blue][(i / 3 | 0) % 3]} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /></>
        : <><rect x={-10} y={10} width={20} height={60} rx={8} fill="#ffd0a8" stroke={KC.ink} strokeWidth={4} /><rect x={-9} y={-70} width={18} height={80} rx={9} fill={KC.lilac} stroke={KC.ink} strokeWidth={4} /></>}
    </g>);
  }
  // fibras nerviosas
  const fib = [];
  if (!cefalopodo) {
    // vertebrado: las fibras corren ENCIMA (del lado de la luz) y bajan por el hueco
    for (let k = 0; k < 6; k++) { const yy = y - 110 - k * 12;
      fib.push(<path key={'l' + k} d={`M ${x0} ${yy} L ${g0 + 20 + k * 14} ${yy} Q ${g0 + 60 + k * 18} ${yy} ${g0 + 70 + k * 18} ${y + 120} L ${g0 + 70 + k * 18} ${y + 380}`} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={0.85} />);
      fib.push(<path key={'r' + k} d={`M ${x1} ${yy} L ${g1 - 20 - k * 14} ${yy} Q ${g1 - 60 - k * 18} ${yy} ${g1 - 70 - k * 18} ${y + 120} L ${g1 - 70 - k * 18} ${y + 380}`} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={0.85} />); }
  } else {
    // pulpo: cada célula manda su fibra por DETRÁS; se juntan en muchos haces delgados que salen hacia abajo
    for (let k = 0; k < 10; k++) { const xb = x0 + 60 + k * ((x1 - x0 - 120) / 9);
      for (let j = -1; j <= 1; j++) fib.push(<path key={k + '_' + j} d={`M ${xb + j * 16} ${y + 70} Q ${xb + j * 6} ${y + 150} ${xb + (540 - xb) * 0.12} ${y + 260 + 160 * haces}`} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={haces} />); }
  }
  return <g opacity={Math.min(1, p * 3)}>
    <rect x={x0} y={y - 75} width={x1 - x0} height={150} rx={24} fill="rgba(255,107,90,.18)" stroke="rgba(255,255,255,.25)" strokeWidth={3} />
    {fib}
    {celdas}
    {hueco && marca > 0 && <g opacity={marca}><rect x={g0 + 6} y={y - 90} width={g1 - g0 - 12} height={180} rx={20} fill="rgba(255,59,47,.18)" stroke={KC.red} strokeWidth={7} strokeDasharray="20 12" strokeDashoffset={-T * 30} /></g>}
  </g>;
}
// Ojo de pulpo en corte: retina sin hueco y muchos haces delgados de nervio que salen por detrás de ella.
function OjoPulpo({ cx, cy, R = 270, T, haces = 1, rayos = 0 }) {
  const Rr = R - 22, nh = 18;
  return <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: nh }, (_, i) => { const a = Math.PI * (0.62 + 0.76 * i / (nh - 1)), e = kprog(haces, i / nh * 0.6, i / nh * 0.6 + 0.4);
      const x0 = Rr * Math.cos(a), y0 = -Rr * Math.sin(a), x1 = (R + 40 + 150 * e) * Math.cos(a), y1 = -(R + 40 + 150 * e) * Math.sin(a);
      return <g key={i} opacity={e}>{[-5, 0, 5].map((o) => <line key={o} x1={x0 + o} y1={y0 + o} x2={x1 + o * 2} y2={y1 + o * 2} stroke={KC.yellow} strokeWidth={4} strokeLinecap="round" />)}
        <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KC.ink} strokeWidth={3} opacity=".3" /></g>; })}
    <circle r={R} fill="#fffaf3" stroke={KC.ink} strokeWidth={11} />
    <circle r={R - 34} fill="rgba(175,228,255,.35)" />
    <path d={`M ${Rr * Math.cos(1.0)} ${-Rr * Math.sin(1.0)} A ${Rr} ${Rr} 0 1 0 ${Rr * Math.cos(-1.0)} ${-Rr * Math.sin(-1.0)}`} fill="none" stroke={CRETINA} strokeWidth={20} strokeLinecap="round" />
    {[-1, 1].map((sg) => <line key={sg} x1={0.8 * R} y1={sg * 0.15 * R} x2={0.8 * R} y2={sg * 0.6 * R} stroke="#c9a227" strokeWidth={22} strokeLinecap="round" />)}
    <circle cx={0.5 * R} cy={0} r={0.24 * R} fill="rgba(255,236,190,.95)" stroke={KC.ink} strokeWidth={8} />
    {rayos > 0 && <g opacity={rayos}>{[-1, 0, 1].map((j) => <polyline key={j} points={`${1.9 * R},${j * 0.2 * R} ${0.5 * R},${j * 0.1 * R} ${-Rr + 20},${j * -0.3 * R}`} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="30 16" strokeDashoffset={T * 110} strokeLinejoin="round" />)}</g>}
  </g>;
}
// Pulpo chiquito (macro).
function Pulpo({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 6 }, (_, i) => { const bx = -90 + i * 36, w = Math.sin(T * 3 + i) * 18;
      return <path key={i} d={`M ${bx} 40 C ${bx - 10 + w} 110 ${bx + 20 - w} 150 ${bx + w} 200`} fill="none" stroke="#e8517a" strokeWidth={26} strokeLinecap="round" />; })}
    {Array.from({ length: 6 }, (_, i) => { const bx = -90 + i * 36, w = Math.sin(T * 3 + i) * 18;
      return <path key={i} d={`M ${bx} 40 C ${bx - 10 + w} 110 ${bx + 20 - w} 150 ${bx + w} 200`} fill="none" stroke="#ff7aa0" strokeWidth={16} strokeLinecap="round" />; })}
    <ellipse cx={0} cy={-30} rx={120} ry={110} fill="#ff7aa0" stroke={KC.ink} strokeWidth={9} />
    {[-45, 45].map((ox) => <g key={ox}><circle cx={ox} cy={10} r={26} fill="#fff" stroke={KC.ink} strokeWidth={6} /><rect x={ox - 14} y={4} width={28} height={10} rx={5} fill={KC.ink} /></g>)}
    <circle cx={-60} cy={-80} r={14} fill="rgba(255,255,255,.5)" />
  </g>;
}
// Pergamino con la prueba dibujada (Mariotte).
function Pergamino({ x, y, p = 1, T }) {
  return <g transform={`translate(${x} ${y}) rotate(3) scale(${klerp(0.5, 1, p)})`} opacity={p}>
    <rect x={-330} y={-110} width={660} height={220} rx={18} fill="#f1e2bf" stroke={KC.ink} strokeWidth={8} />
    <rect x={-350} y={-125} width={40} height={250} rx={20} fill="#d9bf8a" stroke={KC.ink} strokeWidth={7} />
    <rect x={310} y={-125} width={40} height={250} rx={20} fill="#d9bf8a" stroke={KC.ink} strokeWidth={7} />
    <g stroke="#3a2a1a" strokeWidth={8} strokeLinecap="round"><line x1={-230} y1={0} x2={-170} y2={0} /><line x1={-200} y1={-30} x2={-200} y2={30} /></g>
    <circle cx={190} cy={0} r={30} fill="#9c2a1e" opacity={0.5 + 0.5 * Math.abs(Math.sin(T * 2))} />
    <path d="M -120 -50 Q 0 -80 120 -50" fill="none" stroke="#3a2a1a" strokeWidth={4} strokeDasharray="10 10" />
    <text x={0} y={80} textAnchor="middle" style={{ font:`italic 700 30px ${KF.mono}` }} fill="#3a2a1a">1668</text>
  </g>;
}
// Flechas "cerca ↔ lejos" estáticas (no se mueven: no estorban la prueba).
function CercaLejos({ x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <line x1={-170} y1={0} x2={170} y2={0} stroke={KC.ink} strokeWidth={12} />
    <path d="M -200 0 l 44 -28 l 0 56 Z M 200 0 l -44 -28 l 0 56 Z" fill={KC.ink} />
    <text x={-210} y={14} textAnchor="end" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>cerca</text>
    <text x={210} y={14} textAnchor="start" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>lejos</text>
  </g>;
}

function Ciego() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el hoyo aparece en lo que ve el ojo y se rellena
  const hoyo = kprog(T, K.Gancho + 0.9, K.Gancho + 1.3, kEase.rebote) * (1 - kprog(T, K.Gancho + 2.6, K.Gancho + 3.4, kEase.suave));
  const HG = { x: 640, y: 905 };
  // ojo del corte (Nervio)
  const OC = { cx: 600, cy: 960, R: 280 };
  const discoX = OC.cx + Math.cos(ANG_DISCO) * (OC.R - 22), discoY = OC.cy - Math.sin(ANG_DISCO) * (OC.R - 22);
  // relleno de rayas
  const RH = { x: 600, y: 900 }, rellena = kprog(T, K.Rellena + 1.6, K.Rellena + 3.0, kEase.suave);
  // dos ojos
  const junta = kprog(T, K.Dos + 1.7, K.Dos + 2.6, kEase.suave), tapa = kprog(T, K.Dos + 2.6, K.Dos + 3.2);
  const cI = klerp(310, 480, junta), cD = klerp(770, 600, junta);
  const parpCierre = Math.floor((T - K.Cierre) * 1.6) % 2 === 1 && T > K.Cierre + 1.2 ? 1 : 0;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el ojo parpadea; en lo que ve aparece un hoyo negro que se rellena */}
      <Escena T={T} a={K.Gancho} b={K.Prueba} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <defs><Rayas id="rg" /><clipPath id="cuadro-g"><rect x={110} y={730} width={860} height={350} rx={30} /></clipPath></defs>
          <path d={`M 330 520 L 110 730 L 970 730 Z`} fill="rgba(255,255,255,.35)" />
          <g transform={`translate(540 905) scale(${klerp(0.6, 1, kprog(T, K.Gancho, K.Gancho + 0.4, kEase.rebote))}) translate(-540 -905)`}>
            <rect x={110} y={730} width={860} height={350} rx={30} fill="url(#rg)" />
            <g clipPath="url(#cuadro-g)">
              <circle cx={HG.x} cy={HG.y} r={110 * hoyo} fill={KC.ink} />
              {T > K.Gancho + 2.6 && T < K.Gancho + 3.8 && Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4, f = kprog(T, K.Gancho + 2.6, K.Gancho + 3.6);
                return <circle key={i} cx={HG.x + Math.cos(a) * (140 - 110 * f)} cy={HG.y + Math.sin(a) * (140 - 110 * f)} r={10} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity={1 - f} />; })}
            </g>
            <rect x={110} y={730} width={860} height={350} rx={30} fill="none" stroke={KC.ink} strokeWidth={10} />
          </g>
          <OjoFrente x={330} y={470} s={0.9} parp={parpadeo(T, K.Gancho + 0.35) + parpadeo(T, K.Gancho + 3.0)} mira={0.4} id="g" />
          <TextoSvg x={540} y={1150} tam={70} color={KC.yellow} rot={-4} o={kprog(T, K.Gancho + 1.0, K.Gancho + 1.2) * (1 - kprog(T, K.Gancho + 2.5, K.Gancho + 2.7))} s={klerp(0.5, 1, kprog(T, K.Gancho + 1.0, K.Gancho + 1.4, kEase.rebote))}>¡UN HOYO!</TextoSvg>
          <TextoSvg x={540} y={1150} tam={70} color={KC.pink} rot={-4} o={kprog(T, K.Gancho + 3.0, K.Gancho + 3.2)} s={klerp(0.5, 1, kprog(T, K.Gancho + 3.0, K.Gancho + 3.4, kEase.rebote))}>¿CUÁL HOYO?</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 1–3 · LA PRUEBA: fondo amarillo liso y quieto, cruz y punto fijos. Una sola escena (sin cortes ni zoom). */}
      <Escena T={T} a={K.Prueba} b={K.Nervio} fondo={KC.yellow} zoom={0}>
        <Lienzo>
          <CruzPunto />
          <CercaLejos x={470} y={600} o={kprog(T, K.Acercate + 0.2, K.Acercate + 0.6) * (1 - kprog(T, K.Desaparece - 0.3, K.Desaparece))} />
        </Lienzo>
        <Chip T={T} at={K.Prueba + 0.3} until={K.Acercate - 0.2} texto="tapa tu ojo IZQUIERDO" x={540} y={390} tam={48} borde={KC.ink} />
        <Chip T={T} at={K.Prueba + 2.4} until={K.Desaparece + 3.0} texto="mira fijo la cruz" x={540} y={490} tam={40} borde={KC.ink} />
        <Chip T={T} at={K.Acercate + 0.1} until={K.Desaparece - 0.2} texto="acércate o aléjate despacio" x={540} y={390} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Desaparece + 0.2} until={K.Nervio - 0.2} texto="¿ya desapareció?" x={540} y={390} tam={52} borde={KC.red} />
      </Escena>
      {/* 4 · por dentro: el nervio óptico sale por el fondo del ojo */}
      <Escena T={T} a={K.Nervio} b={K.Sin} fondo={KC.noche}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g transform={`translate(${OC.cx} ${OC.cy}) scale(${klerp(0.4, 1, kprog(T, K.Nervio - 0.3, K.Nervio + 0.5, kEase.rebote))}) translate(${-OC.cx} ${-OC.cy})`}>
            <OjoCorteH {...OC} T={T} rayos={kprog(T, K.Nervio + 0.4, K.Nervio + 1.0)} fibras={kprog(T, K.Nervio + 1.0, K.Nervio + 1.6)} pulso={kprog(T, K.Nervio + 2.6, K.Nervio + 3.0)} disco={kprog(T, K.Nervio + 1.6, K.Nervio + 2.0)} />
          </g>
        </Lienzo>
        <Etq T={T} at={K.Nervio + 0.9} until={K.Sin - 0.2} x={OC.cx - OC.R + 40} y={OC.cy - 230} texto="retina" lado="izq" color={CRETINA} tam={38} />
        <Etq T={T} at={K.Nervio + 1.6} until={K.Sin - 0.2} x={40} y={1212} texto="nervio óptico" lado="der" color={CNERVIO} tam={34} />
        <Chip T={T} at={K.Nervio + 2.8} until={K.Sin - 0.1} texto="→ el cable a tu cerebro" x={330} y={430} tam={38} borde={KC.yellow} />
        <Lupa T={T} at={K.Nervio + 3.4} until={K.Sin - 0.3} x={800} y={390} r={140} fx={discoX} fy={discoY} tinte={KC.yellow} etiqueta="POR DENTRO · RETINA"
          interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="200 560 680 680"><rect x={200} y={560} width={680} height={680} fill="#0b1a2c" /><RetinaCerca T={t} p={1} y={850} /></svg>} />
      </Escena>
      {/* 5 · al microscopio: en el disco no hay conos ni bastones */}
      <Escena T={T} a={K.Sin} b={K.Pregunta} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          {[200, 540, 880].map((x, i) => <g key={i} opacity={kprog(T, K.Sin + 0.2, K.Sin + 0.6)}><line x1={x} y1={470} x2={x} y2={570} stroke={KC.yellow} strokeWidth={10} strokeDasharray="22 12" strokeDashoffset={-T * 60} /><path d={`M ${x - 18} 570 l 18 26 l 18 -26 Z`} fill={KC.yellow} /></g>)}
          <RetinaCerca T={T} y={800} p={kprog(T, K.Sin + 0.1, K.Sin + 1.6)} marca={kprog(T, K.Sin + 3.4, K.Sin + 3.8)} />
          {T > K.Sin + 3.6 && <TextoSvg x={540} y={1060} tam={64} color={KC.red} s={klerp(0.5, 1, kprog(T, K.Sin + 3.6, K.Sin + 4.0, kEase.rebote))}>PUNTO CIEGO</TextoSvg>}
        </Lienzo>
        <Etq T={T} at={K.Sin + 0.9} until={K.Pregunta - 0.2} x={250} y={935} texto="conos" lado="izq" color={KC.mint} tam={36} />
        <Etq T={T} at={K.Sin + 1.3} until={K.Pregunta - 0.2} x={1010} y={935} texto="bastones" lado="izq" color={KC.lilac} tam={36} />
        <Chip T={T} at={K.Sin + 1.9} until={K.Pregunta - 0.1} texto="ni conos ni bastones" x={540} y={420} tam={44} borde={KC.red} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Dos} color={KC.lilac} />
      {/* 7 · dos ojos: lo que no ve uno lo ve el otro */}
      <Escena T={T} a={K.Dos} b={K.Rellena} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g opacity={kprog(T, K.Dos + 0.1, K.Dos + 0.5)}>
            <circle cx={cI} cy={780} r={300} fill={KC.pink} fillOpacity={0.8} stroke={KC.ink} strokeWidth={8} />
            <circle cx={cD} cy={780} r={300} fill={KC.yellow} fillOpacity={0.65} stroke={KC.ink} strokeWidth={8} />
            <circle cx={cI - 140} cy={790} r={46} fill={KC.ink} opacity={1 - tapa} />
            <circle cx={cD + 140} cy={790} r={46} fill={KC.ink} opacity={1 - tapa} />
            {tapa > 0 && [cI - 140, cD + 140].map((x, i) => <g key={i} transform={`translate(${x} 790) scale(${kEase.rebote(tapa)})`}><circle r={40} fill="#fff" stroke={KC.ink} strokeWidth={6} /><path d="M -18 0 l 12 14 l 24 -28" fill="none" stroke={KC.leaf} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>)}
          </g>
          <OjoFrente x={400} y={1150} s={0.3} parp={parpadeo(T, K.Dos + 1.0)} id="d1" iris={KC.pink} />
          <OjoFrente x={680} y={1150} s={0.3} parp={parpadeo(T, K.Dos + 1.0)} id="d2" iris={KC.blue} />
        </Lienzo>
        <Chip T={T} at={K.Dos + 0.3} until={K.Rellena - 0.1} texto="ojo izq. + ojo der." x={540} y={410} tam={42} borde={KC.ink} />
      </Escena>
      {/* 8 · el cerebro rellena el hueco con lo de alrededor */}
      <Escena T={T} a={K.Rellena} b={K.Mariotte} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <defs><Rayas id="rr" a={KC.yellow} b={KC.blue} w={38} /><clipPath id="cuadro-r"><rect x={110} y={630} width={860} height={540} rx={30} /></clipPath></defs>
          <rect x={110} y={630} width={860} height={540} rx={30} fill="url(#rr)" />
          <g clipPath="url(#cuadro-r)">
            <circle cx={RH.x} cy={RH.y} r={130 * kprog(T, K.Rellena + 0.2, K.Rellena + 0.6, kEase.rebote) * (1 - rellena)} fill={KC.ink} />
            {rellena > 0 && rellena < 1 && Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4, rr = 230 - 110 * rellena;
              return <FlechaRecta key={i} x1={RH.x + Math.cos(a) * rr} y1={RH.y + Math.sin(a) * rr} x2={RH.x + Math.cos(a) * (rr - 70)} y2={RH.y + Math.sin(a) * (rr - 70)} color="#fff" grosor={9} punta={22} />; })}
          </g>
          <rect x={110} y={630} width={860} height={540} rx={30} fill="none" stroke={KC.ink} strokeWidth={10} />
        </Lienzo>
        <Chip T={T} at={K.Rellena + 0.4} until={K.Rellena + 1.6} texto="el hueco" x={400} y={420} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Rellena + 1.7} until={K.Mariotte - 0.1} texto="relleno con lo de alrededor" x={420} y={420} tam={40} borde={KC.gold} />
      </Escena>
      {/* 9 · Mariotte, siglo XVII */}
      <Escena T={T} a={K.Mariotte} b={K.Pulpo} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo><Pergamino x={540} y={1030} p={kprog(T, K.Mariotte + 1.2, K.Mariotte + 1.7, kEase.rebote)} T={T} /></Lienzo>
        <TarjetaEstudio T={T} at={K.Mariotte + 0.2} until={K.Pulpo - 0.2} anio="SIGLO XVII" quien="Edme Mariotte · Francia" revista="describió el punto ciego" x={540} y={680} />
      </Escena>
      {/* 10 · el pulpo: muchos haces delgados de nervio salen por detrás de la retina */}
      <Escena T={T} a={K.Pulpo} b={K.Cierre} fondo={KC.noche}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g opacity={kprog(T, K.Pulpo - 0.2, K.Pulpo + 0.3)}><Pulpo x={210} y={560} s={0.75} T={T} /></g>
          <g transform={`translate(640 900) scale(${klerp(0.3, 1, kprog(T, K.Pulpo + 0.6, K.Pulpo + 1.2, kEase.rebote))}) translate(-640 -900)`} opacity={kprog(T, K.Pulpo + 0.6, K.Pulpo + 0.9)}>
            <OjoPulpo cx={610} cy={900} R={250} T={T} haces={kprog(T, K.Pulpo + 1.6, K.Pulpo + 3.4)} rayos={kprog(T, K.Pulpo + 1.0, K.Pulpo + 1.5)} />
          </g>
        </Lienzo>
        <Etq T={T} at={K.Pulpo + 0.4} until={K.Cierre - 0.2} x={340} y={470} texto="pulpo" lado="der" color={KC.texto} tam={34} />
        <Etq T={T} at={K.Pulpo + 2.6} until={K.Cierre - 0.2} x={30} y={1085} texto="nervios por detrás" lado="der" color={KC.yellow} tam={34} />
        <Chip T={T} at={K.Pulpo + 3.4} until={K.Cierre - 0.1} texto="✓ sin punto ciego" x={700} y={400} tam={46} borde={KC.mint} />
      </Escena>
      {/* 11 · cierre: regresa la prueba; el punto parpadea y aparece tu punto ciego */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.yellow} zoom={0.02}>
        <Lienzo>
          <CruzPunto punto={1 - parpCierre} />
          {T > K.Cierre + 1.2 && <circle cx={PRUEBA.px} cy={PRUEBA.y} r={95} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" opacity={kprog(T, K.Cierre + 1.2, K.Cierre + 1.6)} />}
          <OjoFrente x={540} y={1040} s={0.55} parp={parpadeo(T, K.Cierre + 0.4) + parpadeo(T, K.Cierre + 3.2)} id="c" mira={0} />
        </Lienzo>
        <Etq T={T} at={K.Cierre + 1.6} until={K.Outro - 0.1} x={PRUEBA.px - 110} y={PRUEBA.y - 130} texto="tu punto ciego" lado="izq" color={KC.ink} tam={34} />
        <Chip T={T} at={K.Cierre + 0.6} until={K.Outro - 0.1} texto="tu cerebro pone de su parte" x={540} y={420} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Prueba - 0.1} texto="Tienes un *hoyo en tu vista.*" />
      <Subtitulo T={T} idx={1} at={K.Prueba + 0.1} until={K.Acercate - 0.1} texto="Tapa tu ojo izquierdo: *mira la cruz.*" />
      <Subtitulo T={T} idx={2} at={K.Acercate + 0.1} until={K.Desaparece - 0.1} texto="Acércate o aléjate *despacio.*" />
      <Subtitulo T={T} idx={3} at={K.Desaparece + 0.1} until={K.Nervio - 0.1} texto="El punto rojo *desaparece.*" />
      <Subtitulo T={T} idx={4} at={K.Nervio + 0.1} until={K.Sin - 0.1} texto="Ahí sale el *nervio óptico.*" />
      <Subtitulo T={T} idx={5} at={K.Sin + 0.1} until={K.Pregunta - 0.1} texto="Ni conos ni bastones: *un hoyo.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Dos - 0.1} texto="¿Por qué no ves *un hoyo negro?*" />
      <Subtitulo T={T} idx={7} at={K.Dos + 0.1} until={K.Rellena - 0.1} texto="Uno: *tienes dos ojos.*" />
      <Subtitulo T={T} idx={8} at={K.Rellena + 0.1} until={K.Mariotte - 0.1} texto="Dos: tu cerebro *lo rellena.*" />
      <Subtitulo T={T} idx={9} at={K.Mariotte + 0.1} until={K.Pulpo - 0.1} texto="Siglo XVII: *Edme Mariotte.*" />
      <Subtitulo T={T} idx={10} at={K.Pulpo + 0.1} until={K.Cierre - 0.1} texto="El pulpo: *sin punto ciego.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu cerebro *pone de su parte.*" />

      {/* Robert NO sale durante la prueba (Prueba–Desaparece): lo compensan más apariciones después */}
      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Prueba - 0.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Nervio + 0.5, K.Nervio + 3.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Sin + 2.2, K.Pregunta - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Pregunta + 0.05, K.Dos + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Dos + 0.6, K.Rellena - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Rellena + 0.3, K.Mariotte - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Mariotte + 0.3, K.Pulpo - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pulpo + 0.3, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="20" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function CiegoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Ciego /></CompositionStage></div>;
}
window.CiegoApp = CiegoApp;
