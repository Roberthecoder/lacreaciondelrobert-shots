// Shot Fungi Mati #42 · Ese polvo no es solo tierra: la fiebre del valle (Coccidioides) — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const FV = { arena:'#e9c27a', arena2:'#d7a85a', polvo:'#c99a5b', polvo2:'#a8783f', cielo:'#ffb347', crema:'#f6ead0', suelo:'#2a1a10', pulmon:'#3a1426', carne:'#ff8fa3' };

// Artroconidia: célula en forma de barril (~3 × 4.5 µm). Origen = centro. w × h en px.
function Barril({ x, y, s = 1, rot = 0, color = FV.crema, w = 34, h = 52, o = 1 }) {
  const a = w / 2, b = h / 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M ${-a} ${-b} Q ${-a - 7} 0 ${-a} ${b} L ${a} ${b} Q ${a + 7} 0 ${a} ${-b} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <line x1={-a + 2} y1={-b + 5} x2={a - 2} y2={-b + 5} stroke="#b88a4a" strokeWidth={4} />
    <line x1={-a + 2} y1={b - 5} x2={a - 2} y2={b - 5} stroke="#b88a4a" strokeWidth={4} />
  </g>;
}
// Grano de polvo irregular.
function Grano({ x, y, r = 20, seed = 1, color = FV.polvo2 }) {
  const g = krng(seed), n = 7;
  const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (0.7 + g() * 0.45); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <path d={d} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />;
}
// Saguaro.
function Saguaro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} fill="#3a9b4a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round">
    <path d="M -55 -150 Q -55 -100 -20 -100 L -20 -130 Q -40 -130 -40 -150 L -40 -200 Q -55 -205 -55 -150 Z" />
    <path d="M 55 -220 Q 55 -150 20 -150 L 20 -175 Q 38 -175 38 -220 L 38 -260 Q 55 -265 55 -220 Z" />
    <rect x={-24} y={-340} width={48} height={340} rx={24} />
  </g>;
}
// Remolino de polvo: partículas que giran alrededor de un eje vertical. crece 0..1. esporas = barrilitos visibles.
function Remolino({ T, x, y, alto = 520, crece = 1, n = 150, esporas = 0 }) {
  if (crece <= 0) return null;
  const H = alto * kEase.sale(kclamp(crece, 0, 1)), el = [];
  for (let i = 0; i < n; i++) {
    const u = ((i * 0.6180339) % 1), h = u * H, r = 18 + u * 150 + Math.sin(T * 2 + i) * 6;
    const a = T * (5 - u * 2) + i * 2.399, cx = x + Math.cos(a) * r + Math.sin(T * 1.3 + u * 3) * 30 * u, cy = y - h + Math.sin(a) * r * 0.18;
    const fr = Math.sin(a) > 0;
    el.push(<circle key={i} cx={cx} cy={cy} r={4 + (i % 4) * 2.5} fill={fr ? FV.polvo : FV.polvo2} opacity={fr ? 0.95 : 0.55} />);
  }
  const sp = [];
  if (esporas > 0) for (let i = 0; i < 6; i++) { const u = 0.2 + i * 0.12, a = T * 3.5 + i * 1.7, r = 30 + u * 140;
    sp.push(<g key={'s' + i}><Grano x={x + Math.cos(a) * r} y={y - u * H + 8} r={26} seed={i + 4} /><Barril x={x + Math.cos(a) * r} y={y - u * H - 22} s={0.75 * esporas} rot={Math.sin(T * 2 + i) * 20} /></g>); }
  return <g>
    <ellipse cx={x} cy={y + 10} rx={170 * crece} ry={26} fill={FV.polvo2} opacity=".45" />
    <path d={`M ${x - 20} ${y} Q ${x - 60} ${y - H * 0.5} ${x - 160} ${y - H} L ${x + 160} ${y - H} Q ${x + 60} ${y - H * 0.5} ${x + 20} ${y} Z`} fill={FV.polvo} opacity=".28" />
    {el}{sp}
  </g>;
}
// Desierto de Sonora (macro): cielo, sol, cerros, tierra, saguaros, camino.
function Desierto({ T }) {
  return <>
    <FondoLunares color={KC.yellow} />
    {fsvg(<>
      <circle cx={860} cy={520} r={90} fill="#fff6b0" stroke={KC.ink} strokeWidth={7} />
      <path d="M 0 1000 L 160 860 L 300 960 L 470 820 L 640 950 L 820 840 L 1080 980 L 1080 1100 L 0 1100 Z" fill="#c9875a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={0} y={1060} width={KW} height={900} fill={FV.arena} stroke={KC.ink} strokeWidth={7} />
      <path d="M 430 1060 L 650 1060 L 1000 1920 L 140 1920 Z" fill={FV.arena2} />
      {[[140, 1190, 0.8], [940, 1150, 0.65], [980, 1500, 1.0]].map(([x, y, s], i) => <Saguaro key={i} x={x} y={y} s={s} />)}
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={(i * 113 + 40) % KW} cy={1130 + (i * 71) % 300} r={8} fill={FV.polvo2} />)}
    </>, 5)}
  </>;
}
// Mapa esquemático: suroeste de EE. UU. + México, con la zona seca donde vive el hongo.
const US_SO = [[-117.1, 32.5], [-115, 32.7], [-114.8, 32.5], [-111, 31.3], [-108.2, 31.3], [-108.2, 31.8], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-102.4, 29.8], [-101, 29.4], [-99.5, 27.5], [-99.1, 26.4], [-97.5, 25.9], [-97.3, 27.6], [-96, 28.6], [-94, 29.6], [-93.5, 30], [-93.5, 38.5], [-123, 38.5], [-122.5, 37.6], [-120.6, 34.6], [-118.5, 34], [-117.1, 32.5]];
const ZONA = [[-121, 37.4], [-118.5, 35.8], [-116, 34.8], [-112.5, 35.6], [-108.5, 34.8], [-104.5, 33.6], [-101.5, 31.2], [-99, 28.5], [-99.3, 25.2], [-102.5, 24.3], [-105.8, 25.3], [-108.6, 25.9], [-110.8, 26.8], [-112.6, 28.9], [-114.6, 30.2], [-115.4, 29.2], [-114.3, 27.6], [-113.2, 26.6], [-114.4, 26.2], [-116.4, 29.8], [-117.4, 32.6], [-119, 34.3], [-120.4, 35.6]];
const FV_BAJA = [[-117.1,32.5],[-116.6,31.7],[-116,30.4],[-115,29.5],[-114.2,28],[-114.1,27.6],[-112.1,24.8],[-111.6,24.3],[-110,22.9],[-109.4,23.2],[-110.3,24.2],[-111.4,25.8],[-112.4,27.2],[-112.9,28.5],[-114.6,30.2],[-114.8,31.6],[-114.8,32.5]];
const mpath = (pts) => 'M ' + pts.map(([a, b]) => mxProy(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function MapaZona({ T, at }) {
  const MX = 140, MY = 800, S = 0.86, zona = kprog(T, at + 0.8, at + 2.0), [px, py] = mxProy(-110.95, 29.1);
  return <g transform={`translate(${MX} ${MY}) scale(${S})`}>
    <defs><clipPath id="tierraFV"><path d={mpath(US_SO)} /><path d={mpath(MX_CONT)} /><path d={mpath(FV_BAJA)} /></clipPath>
      <pattern id="rayasFV" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="22" height="22" fill="#e0893a" /><rect width="9" height="22" fill="#c96a22" /></pattern></defs>
    <path d={mpath(US_SO)} fill="#f3e3b5" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <MapaMexico x={0} y={0} ancho={1000} color="#ffe9a8" />
    <g clipPath="url(#tierraFV)"><path d={mpath(ZONA)} fill="url(#rayasFV)" opacity={0.85 * zona} stroke="none" /></g>
    <path d={mpath(ZONA)} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={zona} />
    {T > at + 1.8 && <g transform={`translate(${px} ${py - 10 * Math.abs(Math.sin(T * 4))}) scale(${kprog(T, at + 1.8, at + 2.2, kEase.rebote)})`}>
      <path d="M 0 0 C -30 -40 -30 -70 0 -75 C 30 -70 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={-50} r={11} fill="#fff" /></g>}
  </g>;
}
// Persona (ícono). mal = tono enfermo.
function Persona({ x, y, s = 1, color = '#8fb6ff', cara = '#f2c29b' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-62} r={26} fill={cara} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Perro de perfil (mirando a la izquierda).
function Perro({ x, y, s = 1, T }) {
  const cola = Math.sin(T * 10) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round">
    <path d={`M 95 -70 Q 140 ${-110 + cola} 150 ${-130 + cola}`} fill="none" strokeWidth={12} strokeLinecap="round" />
    <path d={`M 95 -70 Q 140 ${-110 + cola} 150 ${-130 + cola}`} fill="none" stroke="#d9a35f" strokeWidth={6} strokeLinecap="round" />
    {[-60, -30, 50, 80].map((dx, i) => <rect key={i} x={dx} y={-40} width={22} height={60} rx={8} fill="#d9a35f" />)}
    <ellipse cx={10} cy={-70} rx={100} ry={45} fill="#d9a35f" />
    <circle cx={-95} cy={-120} r={48} fill="#d9a35f" />
    <ellipse cx={-140} cy={-108} rx={30} ry={20} fill="#d9a35f" />
    <circle cx={-170} cy={-110} r={9} fill={KC.ink} />
    <path d="M -80 -165 Q -50 -150 -60 -100 Q -85 -120 -80 -165 Z" fill="#a8743a" />
    <circle cx={-110} cy={-132} r={7} fill={KC.ink} />
  </g>;
}
// Termómetro chiquito.
function TermoMini({ x, y, s = 1, rot = 0, nivel = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-110} width={28} height={110} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-6} y={-100 * nivel + 5} width={12} height={100 * nivel} rx={6} fill={KC.red} />
    <circle cx={0} cy={8} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Pulmones (ícono en el pecho).
function Pulmones({ x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round">
    <path d="M -8 -70 L -8 -20 M 8 -70 L 8 -20" fill="none" />
    <path d="M -14 -30 Q -60 -60 -80 0 Q -90 70 -30 70 Q -12 60 -14 -30 Z" fill={mixHex('#ff9fb0', '#ff5470', brillo)} />
    <path d="M 14 -30 Q 60 -60 80 0 Q 90 70 30 70 Q 12 60 14 -30 Z" fill={mixHex('#ff9fb0', '#ff5470', brillo)} />
  </g>;
}
// Retroexcavadora esquemática (mira a la izquierda). pala = ángulo de excavar.
function Retro({ x, y, s = 1, T }) {
  const ang = -20 + Math.sin(T * 2.4) * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round">
    <rect x={-40} y={-150} width={210} height={90} rx={12} fill={KC.yellow} />
    <rect x={40} y={-250} width={110} height={105} rx={10} fill={KC.yellow} /><rect x={58} y={-232} width={74} height={56} rx={6} fill="#bfe8ff" />
    <circle cx={0} cy={-40} r={42} fill="#333" /><circle cx={140} cy={-40} r={42} fill="#333" />
    <circle cx={0} cy={-40} r={14} fill="#888" /><circle cx={140} cy={-40} r={14} fill="#888" />
    <g transform={`translate(-30 -130) rotate(${ang})`}>
      <rect x={-200} y={-14} width={210} height={28} rx={10} fill={KC.orange} />
      <g transform="translate(-200 0) rotate(40)"><rect x={-12} y={0} width={24} height={130} rx={8} fill={KC.orange} />
        <path d="M -40 130 L 30 130 L 20 175 L -30 175 Z" fill="#888" /></g>
    </g>
  </g>;
}
// Montañas que tiemblan (terremoto) con deslave.
function Montes({ T, a, sacude = 0, deslave = 0 }) {
  const dx = Math.sin(T * 70) * 9 * sacude;
  return <g transform={`translate(${dx} 0)`}>
    <path d="M -20 1120 L 180 760 L 330 900 L 520 680 L 720 920 L 880 780 L 1100 1060 L 1100 1150 L -20 1150 Z" fill="#a0764a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 450 760 L 520 680 L 580 760 Z" fill="#7b5532" />
    {deslave > 0 && <path d={`M 470 ${740} Q 520 ${740 + 200 * deslave} ${600 + 40 * deslave} ${760 + 330 * deslave} L ${520} ${760 + 340 * deslave} Q 470 ${760 + 160 * deslave} 440 760 Z`} fill="#6b4a2b" stroke={KC.ink} strokeWidth={6} />}
    <rect x={-20} y={1140} width={1120} height={800} fill="#c8a76a" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <g key={i} transform={`translate(${560 + (i % 5) * 95} ${1190 + Math.floor(i / 5) * 80})`}>
      <rect x={-30} y={-30} width={60} height={42} fill="#fff1d6" stroke={KC.ink} strokeWidth={4} /><path d="M -38 -28 L 0 -58 L 38 -28 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}
// Nube de polvo: círculos grandes que crecen y se expanden.
function NubePolvo({ T, x, y, p = 1, ancho = 600, n = 16, o = 0.8 }) {
  if (p <= 0) return null;
  const g = krng(9);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const u = g(), v = g(), r = (70 + g() * 90) * p;
    return <circle key={i} cx={x + (u - 0.3) * ancho * p + Math.sin(T * 0.8 + i) * 12} cy={y - v * 260 * p} r={r} fill={i % 2 ? '#d9b98a' : '#c9a575'} opacity=".75" />; })}</g>;
}
// Fila de hifa que se parte en artroconidias alternadas con celdas vacías. p = 0 (hilo entero) → 1 (barrilitos). suelta = se separan.
function HifaParte({ T, y, x0 = 40, n = 15, p = 0, suelta = 0, seed = 1, paso = 66 }) {
  const el = [];
  for (let k = 0; k < n; k++) {
    const x = x0 + k * paso, esp = k % 2 === 0;
    const dy = esp ? -suelta * (30 + ((k * 37 + seed * 13) % 60)) : 0, rot = esp ? suelta * (((k * 53 + seed) % 40) - 20) : 0;
    if (esp) el.push(<g key={k}>
      <rect x={x - 33} y={y - 17} width={66} height={34} fill={FV.crema} opacity={1 - p} />
      <Barril x={x} y={y + dy} rot={90 + rot} w={klerp(30, 34, p)} h={klerp(64, 54, p)} color={mixHex('#fff4d6', FV.crema, p)} o={kclamp(p * 1.6, 0, 1)} />
    </g>);
    else el.push(<g key={k} opacity={1 - suelta * 0.7}>
      <rect x={x - 33} y={y - 17} width={66} height={34} fill={FV.crema} opacity={1 - p} />
      <line x1={x - 33} y1={y - 15} x2={x - 33} y2={y + 15} stroke="#c9b48c" strokeWidth={3} opacity={1 - p} />
      {p > 0 && <rect x={x - 26} y={y - 15} width={52} height={30} fill="none" stroke="#c9b48c" strokeWidth={4} strokeDasharray="8 7" opacity={p} />}
    </g>);
  }
  return <g>
    <rect x={x0 - 33} y={y - 17} width={n * paso} height={34} rx={17} fill="none" stroke={KC.ink} strokeWidth={6} opacity={1 - p} />
    {el}
  </g>;
}
// Esférula: pared gruesa, llena de endosporas (llena 0..1), revienta (0..1).
function Esferula({ T, x, y, r = 230, llena = 0, revienta = 0, seed = 3, nEndo = 200 }) {
  const g = krng(seed), pts = [];
  for (let i = 0; i < nEndo; i++) { const a = g() * Math.PI * 2, rr = Math.sqrt(g()) * (r - 26), vel = 1 + g() * 1.4; pts.push([a, rr, vel, g()]); }
  const k = Math.floor(llena * nEndo);
  const pared = 22 * r / 230;
  return <g>
    {revienta < 1 && <circle cx={x} cy={y} r={r} fill="#f3e6c4" opacity={(1 - revienta) * 0.9} />}
    {pts.slice(0, k).map(([a, rr, vel, q], i) => { const d = rr + revienta * (220 + q * 260) * vel; return <circle key={i} cx={x + Math.cos(a) * d} cy={y + Math.sin(a) * d} r={7 * r / 230 + 2} fill="#fff9e6" stroke={KC.ink} strokeWidth={2.5} opacity={1 - revienta * 0.25} />; })}
    {revienta <= 0 ? <circle cx={x} cy={y} r={r} fill="none" stroke="#c58f3a" strokeWidth={pared} />
      : Array.from({ length: 8 }, (_, i) => { const a0 = i * Math.PI / 4 + 0.15, a1 = a0 + Math.PI / 4 - 0.3, m = (a0 + a1) / 2, d = revienta * 160;
        const cx = x + Math.cos(m) * d, cy = y + Math.sin(m) * d;
        return <path key={i} d={`M ${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r}`} fill="none" stroke="#c58f3a" strokeWidth={pared} strokeLinecap="round" opacity={1 - revienta * 0.6} />; })}
    {revienta <= 0 && <circle cx={x} cy={y} r={r + pared / 2} fill="none" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Alvéolos de fondo (pulmón al microscopio).
function Alveolos({ T, o = 1 }) {
  return <g opacity={o}>{[[130, 560, 200], [960, 620, 230], [120, 1180, 220], [980, 1220, 210], [540, 1500, 260]].map(([x, y, r], i) =>
    <circle key={i} cx={x} cy={y + Math.sin(T * 1.2 + i) * 8} r={r} fill="#4a1a30" stroke="#ff8fa3" strokeWidth={10} opacity=".7" />)}</g>;
}

function FiebreValleShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Su: CUES.Suelo, Es: CUES.Esporas, V: CUES.Viento, P: CUES.Pregunta, Ef: CUES.Esferula, En: CUES.Endosporas, D: CUES.Dimorfo, Et: CUES.Estudio, Ca: CUES.Casos, Cl: CUES.Calma, Si: CUES.Sintomas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const seca = kprog(T, K.Es + 0.6, K.Es + 2.6, kEase.suave), suelta = kprog(T, K.Es + 2.9, K.Es + 4.4, kEase.sale);
  const crece = kprog(T, K.Ef + 0.4, K.Ef + 3.2, kEase.suave);
  const llena = kprog(T, K.En + 0.1, K.En + 2.2), revienta = kprog(T, K.En + 2.5, K.En + 3.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el remolino de polvo del desierto */}
      <Escena T={T} a={K.G} b={K.Su} zoom={0.05}>
        <Desierto T={T} />
        {fsvg(<Remolino T={T} x={430} y={1120} crece={kprog(T, K.G, K.G + 1.0)} />)}
      </Escena>
      <Lupa T={T} at={K.G + 1.2} until={K.G + 4.0} x={330} y={640} r={165} fx={430} fy={900} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · POLVO"
        interior={(T, r) => fsvg(<g>
          {[[90, 120, 34, 1], [230, 90, 40, 2], [250, 240, 46, 3], [100, 250, 30, 5]].map(([x, y, rr, s], i) => <Grano key={i} x={x} y={y + Math.sin(T * 2 + i) * 6} r={rr} seed={s} />)}
          {[[170, 170, 20], [70, 190, -30], [280, 165, 60]].map(([x, y, rot], i) => <Barril key={i} x={x} y={y + Math.cos(T * 2 + i) * 6} rot={rot + T * 15} s={kprog(T, K.G + 1.8 + i * 0.25, K.G + 2.2 + i * 0.25, kEase.rebote)} />)}
        </g>)} />
      {/* 2 · dónde vive: mapa esquemático */}
      <Escena T={T} a={K.Su} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaZona T={T} at={K.Su} />)}
      </Escena>
      {/* 3 · en el suelo: los hilos se parten en barrilitos (artroconidias) */}
      <Escena T={T} a={K.Es} b={K.V}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#24170e', '#3a2a1a', seca) }}></div>
        <Ambiente T={T} n={16} color="rgba(255,220,170,.25)" />
        {fsvg(<>
          {[[90, 560, 60, 1], [960, 640, 80, 2], [150, 1110, 70, 3], [930, 1060, 66, 4], [540, 1180, 50, 6], [600, 560, 46, 7]].map(([x, y, r, s], i) => <Grano key={i} x={x} y={y} r={r} seed={s} color="#6b4a2b" />)}
          {[[300, 640], [760, 980], [420, 1110], [880, 760]].map(([x, y], i) => <circle key={'w' + i} cx={x} cy={y} r={26 * (1 - seca)} fill="#7cc8ff" stroke={KC.ink} strokeWidth={3} opacity={1 - seca} />)}
          <HifaParte T={T} y={720} p={seca} suelta={suelta} seed={1} x0={70} />
          <HifaParte T={T} y={880} p={seca} suelta={suelta} seed={2} x0={37} />
          <HifaParte T={T} y={1020} p={seca} suelta={suelta} seed={3} x0={70} />
        </>)}
      </Escena>
      {/* 4 · el viento o una excavación las levantan, y tú las respiras */}
      <Escena T={T} a={K.V} b={K.P}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={800} fill={FV.arena} stroke={KC.ink} strokeWidth={7} />
          <Retro x={780} y={1150} s={1.0} T={T} />
          <NubePolvo T={T} x={600} y={1110} p={kprog(T, K.V + 0.2, K.V + 1.4)} ancho={420} n={10} o={0.7} />
          {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.9 + i / 4) % 1); return <path key={i} d={`M ${1000 - u * 900} ${560 + i * 60} q 40 -20 80 0 t 80 0`} stroke="#fff" strokeWidth={6} fill="none" opacity={Math.sin(u * Math.PI) * 0.8} strokeLinecap="round" />; })}
          <Persona x={230} y={1080} s={4.2} color="#8fb6ff" />
          <Pulmones x={230} y={1000} s={1.25} brillo={kprog(T, K.V + 2.0, K.V + 3.2)} />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.V + 0.5 + i * 0.18, u = kprog(T, t0, t0 + 1.3, kEase.suave); if (u <= 0 || u >= 1) return null;
            const x = klerp(640, 330, u), y = klerp(1000 - (i % 4) * 30, 815, u) + Math.sin(u * 9 + i) * 26 * (1 - u); return <Barril key={i} x={x} y={y} s={0.55} rot={T * 120 + i * 30} />; })}
        </>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Ef} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 6–7 · en el pulmón: el barrilito se vuelve esférula, se llena de endosporas y revienta */}
      <Escena T={T} a={K.Ef} b={K.D}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Alveolos T={T} />
          {crece < 0.15 ? <Barril x={540} y={860} s={1.6 + crece * 6} rot={T * 10} />
            : <Esferula T={T} x={540} y={860} r={klerp(40, 230, crece)} llena={T >= K.En ? llena : 0} revienta={revienta} />}
          {revienta > 0.5 && [[260, 640], [820, 600], [250, 1120], [840, 1110], [540, 1300]].map(([x, y], i) => { const g2 = kprog(T, K.En + 3.2 + i * 0.15, K.En + 4.4 + i * 0.15, kEase.sale); return g2 > 0 ? <Esferula key={i} T={T} x={x} y={y} r={10 + 40 * g2} seed={10 + i} nEndo={0} /> : null; })}
        </>)}
      </Escena>
      {/* 8 · dos vidas: hilos en la tierra, esferas en ti */}
      <Escena T={T} a={K.D} b={K.Et}>
        <div style={{ position:'absolute', left:0, top:0, width:KW / 2, height:KH, background:'#2a1a10' }}></div>
        <div style={{ position:'absolute', left:KW / 2, top:0, width:KW / 2, height:KH, background:FV.pulmon }}></div>
        {fsvg(<>
          <line x1={540} y1={0} x2={540} y2={KH} stroke={KC.gold2} strokeWidth={8} />
          <HifaParte T={T} y={780} p={0} n={7} x0={70} />
          <HifaParte T={T} y={920} p={1} n={7} x0={70} seed={4} />
          <HifaParte T={T} y={1060} p={0.3} n={7} x0={70} seed={5} />
          <Esferula T={T} x={810} y={800} r={130} llena={1} seed={21} nEndo={70} />
          <Esferula T={T} x={700} y={1040} r={70} seed={22} nEndo={0} />
          <Esferula T={T} x={930} y={1050} r={60} llena={1} seed={23} nEndo={18} />
        </>)}
      </Escena>
      {/* 9 · el estudio: terremoto de 1994, deslaves y nubes de polvo */}
      <Escena T={T} a={K.Et} b={K.Cl}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Montes T={T} sacude={T < K.Ca ? kprog(T, K.Et, K.Et + 0.3) * (1 - kprog(T, K.Et + 1.6, K.Et + 2.2)) : 0} deslave={kprog(T, K.Et + 1.0, K.Et + 2.4, kEase.sale)} />
          <NubePolvo T={T} x={520} y={1080} p={kprog(T, K.Et + 1.6, K.Ca + 1.0, kEase.sale)} ancho={900} n={18} o={T > K.Ca ? 0.55 : 0.85} />
          {T > K.Ca && Array.from({ length: 203 }, (_, i) => { const t0 = K.Ca + 0.5 + i * 0.012, on = kprog(T, t0, t0 + 0.25, kEase.rebote); if (on <= 0) return null;
            const c = i % 23, f = Math.floor(i / 23); return <g key={i} transform={`translate(${100 + c * 38} ${760 + f * 44}) scale(${on})`}><circle cy={-8} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={2.5} /><rect x={-9} y={0} width={18} height={14} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={2.5} /></g>; })}
        </>)}
      </Escena>
      {/* 10 · seis de cada diez no sienten nada */}
      <Escena T={T} a={K.Cl} b={K.Si}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>{Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.Cl + 0.3 + i * 0.1, K.Cl + 0.6 + i * 0.1, kEase.rebote), sin = i < 6;
          return on > 0 ? <Persona key={i} x={150 + (i % 5) * 195} y={900 + Math.floor(i / 5) * 230} s={1.7 * on} color={sin ? '#3fbf4a' : KC.orange} /> : null; })}</>)}
      </Escena>
      {/* 11 · síntomas, no se contagia entre personas, y los perros también */}
      <Escena T={T} a={K.Si} b={K.C}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {T < K.Si + 2.9 && <g opacity={1 - kprog(T, K.Si + 2.5, K.Si + 2.9)}>
            <g transform={`translate(200 640) scale(${kprog(T, K.Si + 0.2, K.Si + 0.5, kEase.rebote)})`}>
              <Persona x={0} y={60} s={1.6} />{[0, 1, 2].map((k) => <circle key={k} cx={60 + k * 34 + kprog(T, K.Si + 0.4, K.Si + 1.2) * 20} cy={-40 - k * 12} r={16 + k * 4} fill="#fff" stroke={KC.ink} strokeWidth={4} opacity={0.9 - k * 0.2} />)}</g>
            <g transform={`translate(540 680) scale(${kprog(T, K.Si + 0.7, K.Si + 1.0, kEase.rebote)})`}><TermoMini x={0} y={0} s={1.4} nivel={0.3 + 0.6 * kprog(T, K.Si + 0.8, K.Si + 1.8)} /></g>
            <g transform={`translate(860 640) scale(${kprog(T, K.Si + 1.2, K.Si + 1.5, kEase.rebote)})`}>
              <rect x={-90} y={-45} width={170} height={90} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={7} /><rect x={82} y={-18} width={16} height={36} rx={4} fill={KC.ink} />
              <rect x={-78} y={-33} width={36} height={66} rx={6} fill={KC.red} /></g>
          </g>}
          {T > K.Si + 2.4 && <g opacity={kprog(T, K.Si + 2.4, K.Si + 2.8)}>
            <Persona x={230} y={940} s={1.8} /><Persona x={590} y={940} s={1.8} color="#ffd36b" />
            <path d="M 300 830 L 500 830" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" /><path d="M 480 806 L 512 830 L 480 854" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 360 780 L 450 880 M 450 780 L 360 880" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.Si + 3.0, K.Si + 3.3)} />
          </g>}
          {T > K.Si + 3.7 && <g transform={`translate(${klerp(1300, 860, kprog(T, K.Si + 3.7, K.Si + 4.4, kEase.sale))} 1150)`}>
            <Perro x={0} y={0} s={0.95} T={T} /><TermoMini x={-150} y={-150} s={0.6} rot={-60} nivel={0.85} /></g>}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo desierto y el mismo remolino, ahora con las esporas "en taxi" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <Desierto T={T} />
        {fsvg(<Remolino T={T} x={430} y={1120} crece={1} esporas={kprog(T, K.C + 0.6, K.C + 1.4, kEase.rebote)} />)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.0} until={K.Su - 0.3} x={610} y={760} texto="remolino de polvo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Su + 0.5} until={K.Es - 0.3} x={560} y={500} texto="Coccidioides" it tam={44} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Su + 0.9} until={K.Es - 0.3} texto="zona seca donde vive el hongo" x={540} y={1150} tam={30} borde="#c96a22" />
      <Etq T={T} at={K.Su + 0.4} until={K.Es - 0.3} x={250} y={640} texto="EE. UU." tam={30} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Su + 0.4} until={K.Es - 0.3} x={640} y={960} texto="MÉXICO" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Su + 2.0} until={K.Es - 0.3} x={250} y={880} texto="Sonora" tam={34} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Su + 0.3} until={K.Es - 0.3} texto="mapa esquemático" x={790} y={1060} tam={22} mono borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.2} until={K.V - 0.3} texto="POR DENTRO · SUELO" x={540} y={470} tam={30} mono borde={KC.gold2} />
      <Chip T={T} at={K.Es + 0.7} until={K.Es + 2.6} texto="la tierra se seca" x={540} y={560} tam={32} borde={KC.orange} />
      <Etq T={T} at={K.Es + 0.4} until={K.Es + 1.9} x={400} y={640} texto="hilos (hifas)" tam={30} />
      <Etq T={T} at={K.Es + 2.0} until={K.V - 0.3} x={140} y={1120} texto="artroconidias (~3 × 4.5 µm)" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Es + 2.4} until={K.V - 0.3} x={136} y={680} texto="celda vacía" tam={26} />
      <Etq T={T} at={K.V + 0.3} until={K.P - 0.3} x={620} y={830} texto="excavación" tam={30} color={KC.ink} />
      <Etq T={T} at={K.V + 2.0} until={K.P - 0.3} x={330} y={1060} texto="pulmones" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ef + 0.6} until={K.D - 0.3} texto="AL MICROSCOPIO · PULMÓN" x={400} y={470} tam={30} mono borde={KC.cyan} />
      <Medidor T={T} at={K.Ef + 1.2} until={K.En - 0.2} valor={(t) => kprog(t, K.Ef + 1.2, K.Ef + 3.2)} etiqueta="tamaño de la esférula" texto={() => '30–100+ µm'} y={540} color={KC.gold2} />
      <Etq T={T} at={K.Ef + 2.4} until={K.En + 2.4} x={790} y={1140} texto="esférula" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Ef + 2.8} until={K.En + 2.4} x={300} y={1140} texto="pared gruesa" tam={28} lado="izq" />
      <Chip T={T} at={K.En + 0.6} until={K.D - 0.3} texto="100–300 endosporas" x={420} y={560} tam={36} borde={KC.gold2} />
      <Etq T={T} at={K.En + 0.9} until={K.En + 2.4} x={700} y={760} texto="endosporas" tam={30} />
      <Chip T={T} at={K.D + 0.2} until={K.Et - 0.3} texto="hongo dimórfico: 2 formas" x={420} y={470} tam={32} borde={KC.gold2} />
      <Etq T={T} at={K.D + 0.4} until={K.Et - 0.3} x={60} y={640} texto="EN LA TIERRA: hilos (ampliados)" tam={28} />
      <Etq T={T} at={K.D + 0.8} until={K.Et - 0.3} x={1030} y={1150} texto="EN TI: esferas" tam={28} lado="izq" />
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.Ca - 0.3} anio="1994" quien="terremoto de Northridge, California" revista="Schneider et al., JAMA, 1997" y={520} />
      <Etq T={T} at={K.Et + 1.4} until={K.Ca - 0.3} x={600} y={760} texto="deslaves" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ca + 0.3} until={K.Cl - 0.3} valor={203} dur={1.6} etiqueta="casos · condado de Ventura" x={370} y={470} tam={170} color={KC.red} />
      <Chip T={T} at={K.Ca + 2.6} until={K.Cl - 0.3} texto="dentro de la nube de polvo: más riesgo" x={540} y={1170} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Cl + 0.6} until={K.Si - 0.3} texto="≈ 6 de cada 10: sin síntomas" x={420} y={520} tam={36} borde={KC.leaf} />
      <Etq T={T} at={K.Si + 0.4} until={K.Si + 2.5} x={120} y={760} texto="tos" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Si + 0.9} until={K.Si + 2.5} x={470} y={760} texto="fiebre" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Si + 1.4} until={K.Si + 2.5} x={760} y={730} texto="cansancio" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Si + 2.9} until={K.C - 0.3} texto="no se contagia entre personas" x={420} y={520} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Si + 4.3} until={K.C - 0.3} x={560} y={1060} texto="perros también" tam={30} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="el taxi de un hongo" x={400} y={500} tam={40} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Su} texto="1 m" largo={110} />
      <BarraEscala T={T} at={K.Su} until={K.Es} texto="500 km" largo={95} />
      <BarraEscala T={T} at={K.Es} until={K.V} texto="10 µm" largo={115} />
      <BarraEscala T={T} at={K.V} until={K.P} texto="1 m" largo={130} />
      <BarraEscala T={T} at={K.Ef} until={K.D} texto="50 µm" largo={230} />
      <BarraEscala T={T} at={K.D} until={K.Et} texto="50 µm (esferas)" largo={130} />
      <BarraEscala T={T} at={K.Et} until={K.Cl} texto="1 km" largo={120} />
      <BarraEscala T={T} at={K.Cl} until={K.C} texto="1 m" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Su - 0.1} texto="Ese polvo no es solo tierra: *puede traer esporas.*" />
      <Subtitulo T={T} idx={1} at={K.Su + 0.1} until={K.Es - 0.1} texto="*Coccidioides:* suelo seco del suroeste de EE. UU. y del norte de México." />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.V - 0.1} texto="Sus hilos se parten *en barrilitos.*" />
      <Subtitulo T={T} idx={3} at={K.V + 0.1} until={K.P - 0.1} texto="El viento las levanta… *y las respiras.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ef - 0.1} texto="¿Qué hace *dentro de ti?*" />
      <Subtitulo T={T} idx={5} at={K.Ef + 0.1} until={K.En - 0.1} texto="En tu pulmón se vuelve *una esfera.*" />
      <Subtitulo T={T} idx={6} at={K.En + 0.1} until={K.D - 0.1} texto="Se llena de esporitas *y revienta.*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.Et - 0.1} texto="Hilos en la tierra, *esferas en ti.*" />
      <Subtitulo T={T} idx={8} at={K.Et + 0.1} until={K.Ca - 0.1} texto="Terremoto, deslaves *y polvo.*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.Cl - 0.1} texto="Ventura: *203 casos.*" />
      <Subtitulo T={T} idx={10} at={K.Cl + 0.1} until={K.Si - 0.1} texto="Cerca de 6 de cada 10 *no sienten nada.*" />
      <Subtitulo T={T} idx={11} at={K.Si + 0.1} until={K.C - 0.1} texto="Tos, fiebre, cansancio. *Tu perro también puede enfermar.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ese polvo: a veces, *el taxi de un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Su + 2.5, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.V + 0.3, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ef + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.En + 2.4, K.D + 3.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ca + 0.3, K.Cl - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Cl + 0.3, K.Si - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Si + 3.0, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="42" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FiebreValleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FiebreValleShot /></CompositionStage></div>;
}
window.FiebreValleApp = FiebreValleApp;
