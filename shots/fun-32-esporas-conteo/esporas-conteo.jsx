// Shot Fungi Mati #32 · Cuántas esporas suelta una seta (y cómo verlas en tu casa) — NARRADO (gancho 4 "número que contradice" + N4 "la imagen que se llena" con tramo N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Las cifras son estimaciones antiguas (Buller 1909 y 1922).
// Morfología: Agaricus campestris (sombrero blanco, laminillas rosa-café, anillo delgado); Agaricus bisporus del súper ya abierto
// (sombrero blanco, velo roto, laminillas café oscuro); esporas elipsoides lisas cafés (6–8 × 5–6 µm); Ganoderma applanatum
// (repisa café dura, borde blanco, poros blancos abajo); Calvatia gigantea (bola blanca, base pequeña).

const EC = { gill:'#c9826f', gill2:'#7a4a3a', cafe:'#5a3826', cafe2:'#7b4a2e', espora:'#7b4a2e', espora2:'#a8693f', blanco:'#fbf8f2', mesa:'#c98d55', mesa2:'#a46b38', pasto:'#3fbf4a', tierra:'#6b4a2b', gano:'#7a4426', gano2:'#9b5a32', gris:'#8a8f99' };

// Champiñón de campo (Agaricus campestris) de perfil. Base del pie en (x, y). esporas 0..1 = lluvia fina; boletos 0..1 = la lluvia se vuelve boletos.
function CampoSeta({ T, x, y, s = 1, esporas = 0, suelo = 520, seed = 3 }) {
  const g = krng(seed); const P = Array.from({ length: 50 }, () => [g() * 420 - 210, g(), g()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -38 0 Q -46 -6 -40 -20 L -30 -300 L 30 -300 L 40 -20 Q 46 -6 38 0 Z" fill={EC.blanco} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -32 -232 Q -64 -212 -54 -196 Q 0 -206 54 -196 Q 64 -212 32 -232 Z" fill={EC.blanco} stroke={KC.ink} strokeWidth={5} />
    <path d="M -236 -300 Q 0 -232 236 -300 Q 0 -262 -236 -300 Z" fill={EC.gill} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 19 }, (_, i) => { const u = -1 + (i + 0.5) * 2 / 19; return <line key={i} x1={u * 228} y1={-300 + Math.abs(u) * 2} x2={u * 130} y2={-268 + Math.abs(u) * 10} stroke={EC.gill2} strokeWidth={4} />; })}
    <path d="M -246 -300 Q -250 -520 0 -540 Q 250 -520 246 -300 Q 0 -286 -246 -300 Z" fill="#fffdf8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 -470 Q -40 -520 90 -490" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
    {esporas > 0 && P.map(([px, v, w], i) => { const u = ((T * (0.35 + v * 0.3) + w) % 1); const yy = -272 + u * (suelo + 272);
      return <circle key={i} cx={px * (1 - u * 0.15) + Math.sin(T * 2 + i) * 6} cy={yy} r={5} fill={EC.espora} opacity={esporas * (u < 0.08 ? u / 0.08 : 1) * (1 - kprog(u, 0.85, 1))} />; })}
  </g>;
}

// Pasto del prado (fondo de marca arriba).
function Prado({ T, y = 1000 }) {
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={KH - y} fill={EC.tierra} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 34 }, (_, i) => { const x = i * 33 + 6, h = 40 + (i * 37) % 50; return <path key={i} d={`M ${x - 9} ${y + 4} Q ${x + mece(T, i, 0.3) * 8} ${y - h} ${x + 9 + mece(T, i + 2, 0.3) * 10} ${y - h - 6} Q ${x + 4} ${y - h * 0.5} ${x + 9} ${y + 4} Z`} fill={i % 3 ? EC.pasto : '#2e9e3a'} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}

// Boleto de lotería (cae y gira). premio = dorado con estrella; si no, gris con ✗.
function Boleto({ x, y, rot = 0, s = 1, premio = false }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -46 -24 L 46 -24 L 46 -8 A 8 8 0 0 0 46 8 L 46 24 L -46 24 L -46 8 A 8 8 0 0 0 -46 -8 Z" fill={premio ? KC.gold2 : '#d9d6cf'} stroke={KC.ink} strokeWidth={4} />
    <line x1={-22} y1={-20} x2={-22} y2={20} stroke={KC.ink} strokeWidth={2} strokeDasharray="4 4" />
    <text x={12} y={11} textAnchor="middle" style={{ font:`400 32px ${KF.titulo}` }} fill={premio ? KC.ink : '#7d776d'}>{premio ? '★' : '✗'}</text>
  </g>;
}

// Champiñón del súper (Agaricus bisporus) YA ABIERTO, de perfil. Origen = plano de las laminillas. pie 0..1 (largo del pie que queda), lam 0..1 (cuánto se ven las laminillas).
function Bisporus({ x, y, s = 1, rot = 0, pie = 1, lam = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {pie > 0.02 && <path d={`M -34 10 L -38 ${10 + 170 * pie} Q 0 ${22 + 170 * pie} 38 ${10 + 170 * pie} L 34 10 Z`} fill={EC.blanco} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    <path d="M -214 0 Q -220 -205 0 -220 Q 220 -205 214 0 Q 0 24 -214 0 Z" fill={EC.blanco} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -140 -160 Q -40 -205 90 -180" stroke="#ffffff" strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d={`M -206 4 Q 0 ${30 + 46 * lam} 206 4 Q 0 26 -206 4 Z`} fill={EC.cafe} stroke={KC.ink} strokeWidth={5} />
    {lam > 0.2 && Array.from({ length: 17 }, (_, i) => { const u = -1 + (i + 0.5) * 2 / 17; return <line key={i} x1={u * 200} y1={6 + 2 * Math.abs(u)} x2={u * 70} y2={22 + 40 * lam * (1 - Math.abs(u) * 0.5)} stroke="#2e1c12" strokeWidth={3} opacity={lam} />; })}
    {[-1, 1].map((k) => <path key={k} d={`M ${k * 214} 0 L ${k * 200} 26 L ${k * 188} 6 L ${k * 176} 22 L ${k * 168} 4 Z`} fill={EC.blanco} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

// Vaso de vidrio volteado. Base (boca) en (x, y).
function Vaso({ x, y, ancho = 520, alto = 400, o = 1 }) {
  return <g opacity={o}>
    <path d={`M ${x - ancho / 2} ${y} L ${x - ancho / 2 + 20} ${y - alto} L ${x + ancho / 2 - 20} ${y - alto} L ${x + ancho / 2} ${y}`} fill="rgba(210,240,255,.28)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={x - ancho / 2 + 14} y={y - alto - 14} width={ancho - 28} height={28} rx={10} fill="rgba(210,240,255,.5)" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${x - ancho / 2 + 50} ${y - alto + 40} L ${x - ancho / 2 + 64} ${y - 50}`} stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity=".7" />
  </g>;
}

// Huella de esporas vista desde arriba: rayos (laminillas) alrededor de un hueco central. p 0..1 = qué tan oscura.
function Huella({ cx, cy, r = 260, p = 1, color = EC.cafe, seed = 7, n = 110 }) {
  if (p <= 0) return null;
  const g = krng(seed);
  return <g opacity={p}>
    <circle cx={cx} cy={cy} r={r * 0.98} fill={color} opacity={0.18} />
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + g() * 0.02, r0 = r * (i % 2 ? 0.5 : i % 4 === 0 ? 0.22 : 0.36), r1 = r * (0.93 + g() * 0.06);
      return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke={color} strokeWidth={r * 0.016 + 2} strokeLinecap="round" opacity={0.75 + g() * 0.25} />; })}
    <circle cx={cx} cy={cy} r={r * 0.17} fill="none" stroke={color} strokeWidth={3} opacity=".5" />
  </g>;
}

// Espora de Agaricus al microscopio: elipsoide lisa café con apículo.
function EsporaMicro({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={52} ry={40} fill={EC.espora} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-14} cy={-14} rx={18} ry={9} fill={EC.espora2} opacity=".8" />
    <path d="M 48 10 l 14 8 l -16 4 Z" fill={EC.espora} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Hongo de repisa (Ganoderma applanatum) de perfil, saliendo de un tronco hacia la derecha. Raíz en (x, y).
function Repisa({ T, x, y, s = 1, humo = 0, seed = 5 }) {
  const g = krng(seed); const P = Array.from({ length: 26 }, () => [g(), g(), g()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {humo > 0 && P.map(([a, b, c], i) => { const u = ((T * (0.18 + a * 0.12) + c) % 1); const px = 40 + b * 330 + u * 120 + Math.sin(T + i) * 12, py = 30 + u * 520;
      return <circle key={i} cx={px} cy={py} r={14 + u * 46} fill="#8a5a3a" opacity={humo * 0.28 * (1 - u)} />; })}
    <path d="M 0 -120 Q 220 -130 400 -30 Q 420 -8 400 10 L 0 24 Z" fill={EC.gano} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[0.35, 0.6, 0.82].map((k, i) => <path key={i} d={`M 0 ${-120 + 140 * (1 - k) * 0.2} Q ${220 * k} ${-130 + 70 * (1 - k)} ${400 * k} ${-30 + 10 * (1 - k)}`} stroke={i % 2 ? EC.gano2 : '#5e321b'} strokeWidth={10} fill="none" opacity=".8" />)}
    <path d="M 360 -44 Q 412 -16 402 8" stroke="#f3eee2" strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M 0 18 L 402 8 Q 380 34 0 40 Z" fill="#f3eee2" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={20 + i * 17} cy={28 - i * 0.4} r={2.5} fill="#b8ad98" />)}
  </g>;
}

// Bejín gigante (Calvatia gigantea): bola blanca con base pequeña. Centro en (x, y), radio r.
function Bejin({ x, y, r = 250, sopla = 0, T = 0 }) {
  return <g>
    <ellipse cx={x} cy={y + r * 0.86} rx={r * 0.4} ry={r * 0.12} fill="rgba(0,0,0,.25)" />
    <path d={`M ${x - r * 0.18} ${y + r * 0.8} Q ${x} ${y + r * 0.98} ${x + r * 0.18} ${y + r * 0.8}`} fill="#efe6d2" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.86} fill="#fbf8ef" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${x - r * 0.55} ${y - r * 0.45} Q ${x - r * 0.1} ${y - r * 0.78} ${x + r * 0.35} ${y - r * 0.62}`} stroke="#fff" strokeWidth={r * 0.1} fill="none" strokeLinecap="round" />
    {[[-0.3, 0.2], [0.25, 0.35], [0.45, -0.1], [-0.55, 0.45], [0.05, 0.6]].map(([a, b], i) => <path key={i} d={`M ${x + a * r} ${y + b * r} l ${r * 0.08} ${-r * 0.04} l ${r * 0.06} ${r * 0.05}`} stroke="#d9cfb9" strokeWidth={4} fill="none" />)}
    {sopla > 0 && Array.from({ length: 14 }, (_, i) => { const u = ((T * 0.5 + i / 14) % 1); return <circle key={i} cx={x + Math.cos(i * 2.1) * r * (0.6 + u)} cy={y - r * 0.5 - u * r * 0.8} r={6 + u * 18} fill="#7d6a3a" opacity={sopla * 0.35 * (1 - u)} />; })}
  </g>;
}

// Microscopio esquemático.
function Microscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={240} height={40} rx={12} fill="#2c2f3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M 40 -30 Q 110 -140 40 -260" stroke="#2c2f3a" strokeWidth={46} fill="none" strokeLinecap="round" />
    <rect x={-70} y={-120} width={150} height={20} rx={6} fill="#c7ccd6" stroke={KC.ink} strokeWidth={5} />
    <rect x={-40} y={-330} width={56} height={170} rx={14} fill="#e9ecf2" stroke={KC.ink} strokeWidth={6} transform="rotate(-18 -12 -245)" />
    <rect x={-30} y={-176} width={36} height={50} rx={6} fill="#2c2f3a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Calendario de hoja que va pasando de mayo a octubre (p 0..1).
const MESES = ['mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre'];
function Calendario({ x, y, p = 0 }) {
  const i = Math.min(5, Math.floor(p * 6));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-130} y={-110} width={260} height={220} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-130} y={-110} width={260} height={64} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-66} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">{MESES[i]}</text>
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-104 + (k % 4) * 54} y={-30 + Math.floor(k / 4) * 44} width={40} height={32} rx={6} fill={k / 12 < (p * 6 - i) ? '#8a5a3a' : '#eee7d8'} />)}
  </g>;
}

// Mosaico de lugares donde caen las esporas (casi todos sin futuro).
const LUGARES = [['asfalto', '#55585f'], ['agua', '#3aa0d8'], ['piedra', '#a9a39a'], ['techo', '#c0522f'], ['tierra húmeda', '#6b4a2b'], ['vidrio', '#bfe8f2']];

function EsporasConteoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, So: CUES.Sombrero, V: CUES.Vaso, H: CUES.Huella, Po: CUES.Polvo, Co: CUES.Color, P: CUES.Pregunta, B: CUES.Buller, R: CUES.Repisa, Bj: CUES.Bejin, Ra: CUES.Razon, L: CUES.Loteria, A: CUES.Aviso, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // escena 1–3 (cocina): corte del pie, el sombrero baja al papel, el vaso tapa, noche → día, se levanta.
  const corte = kprog(T, K.So + 1.4, K.So + 2.0, kEase.sale);
  const baja = kprog(T, K.So + 2.3, K.So + 3.6, kEase.suave);
  const inclina = klerp(-22, 0, kprog(T, K.So + 2.3, K.So + 3.2, kEase.suave));
  const vasoBaja = kprog(T, K.V + 0.1, K.V + 0.8, kEase.sale);
  const noche = kprog(T, K.V + 0.7, K.V + 1.1) * (1 - kprog(T, K.V + 1.9, K.V + 2.3));
  const levanta = kprog(T, K.H + 0.1, K.H + 0.9, kEase.suave);
  const arriba = kprog(T, K.H + 1.0, K.H + 1.7, kEase.suave); // pasa a vista desde arriba
  const MESA = 1020;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el champiñón de campo suelta su lluvia de esporas; el número corre */}
      <Escena T={T} a={K.G} b={K.So} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Prado T={T} y={1000} />
          <CampoSeta T={T} x={300} y={1010} s={0.72} esporas={kprog(T, K.G + 0.1, K.G + 0.6)} suelo={0} />
          {(() => { const g = kprog(T, K.G + 3.9, K.G + 5.0, kEase.sale), o = kprog(T, K.G + 3.8, K.G + 4.1); return o > 0 ? <g opacity={o}>
            <text x={540} y={590} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>esporas: 16,000 millones</text>
            <rect x={540} y={606} width={480 * g} height={58} rx={12} fill={EC.cafe2} stroke={KC.ink} strokeWidth={6} />
            <text x={540} y={730} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>personas en la Tierra:</text>
            <text x={540} y={764} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>8,200 millones (ONU, 2024)</text>
            <rect x={540} y={780} width={480 * (8.2 / 16) * g} height={58} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            {g > 0.95 && <text x={540 + 480 * (8.2 / 16) + 18} y={822} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>≈ la mitad</text>}
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 1–3 · en la cocina: el sombrero sobre el papel, el vaso, una noche, la huella */}
      <Escena T={T} a={K.So} b={K.Po} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', inset:0, background:'#0d1424', opacity:noche * 0.75 }}></div>
        {fsvg(<>
          {noche > 0.05 && <g opacity={noche}><circle cx={880} cy={420} r={70} fill="#fff6c8" stroke={KC.ink} strokeWidth={6} /><circle cx={910} cy={400} r={62} fill="#26304a" /></g>}
          {T > K.V + 1.9 && T < K.H + 0.8 && <g opacity={kprog(T, K.V + 1.9, K.V + 2.3) * (1 - kprog(T, K.H + 0.4, K.H + 0.8))}><circle cx={880} cy={420} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 8 }, (_, i) => <line key={i} x1={880 + Math.cos(i * 0.785) * 88} y1={420 + Math.sin(i * 0.785) * 88} x2={880 + Math.cos(i * 0.785) * 120} y2={420 + Math.sin(i * 0.785) * 120} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />)}</g>}
          <g opacity={1 - arriba}>
            <rect x={-20} y={MESA} width={KW + 40} height={KH - MESA} fill={EC.mesa} stroke={KC.ink} strokeWidth={8} />
            <path d={`M 150 ${MESA + 4} L 930 ${MESA + 4} L 960 ${MESA + 26} L 120 ${MESA + 26} Z`} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            {levanta > 0 && <ellipse cx={540} cy={MESA + 14} rx={190 * levanta + 10} ry={9} fill={EC.cafe} opacity={0.85 * levanta} />}
            {/* pie cortado que se queda / cae */}
            {corte > 0 && T < K.So + 2.4 && <g opacity={1 - kprog(T, K.So + 1.9, K.So + 2.4)}><path d={`M 486 ${MESA - 2} L 482 ${MESA - 150} L 562 ${MESA - 150} L 558 ${MESA - 2} Z`} fill={EC.blanco} stroke={KC.ink} strokeWidth={7} transform={`translate(${380 * corte} 0)`} /></g>}
            <Bisporus x={540} y={klerp(MESA - 190, MESA - 6, baja) - levanta * 520} s={1} rot={inclina} pie={corte > 0 ? 0 : 1} lam={1} />
            {/* cuchillo */}
            {T > K.So + 1.0 && T < K.So + 2.4 && <g transform={`translate(${klerp(120, 820, kprog(T, K.So + 1.2, K.So + 2.0, kEase.suave))} ${MESA - 150})`} opacity={1 - kprog(T, K.So + 2.1, K.So + 2.4)}>
              <path d="M -170 -6 L 60 -14 L 80 0 L -170 10 Z" fill="#dfe4ea" stroke={KC.ink} strokeWidth={5} /><rect x={-290} y={-14} width={130} height={30} rx={10} fill="#3b2a20" stroke={KC.ink} strokeWidth={5} /></g>}
            <Vaso x={540} y={klerp(MESA - 520, MESA + 2, vasoBaja) - levanta * 560} ancho={540} alto={330} o={kprog(T, K.V, K.V + 0.2) * (1 - kprog(T, K.H + 0.6, K.H + 1.0))} />
          </g>
          {/* vista desde arriba: la hoja con su huella */}
          {arriba > 0 && <g opacity={arriba}>
            <rect x={-20} y={-20} width={KW + 40} height={KH + 40} fill={EC.mesa} />
            {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-20} y1={180 + i * 200} x2={KW + 20} y2={160 + i * 200} stroke={EC.mesa2} strokeWidth={5} opacity=".6" />)}
            <rect x={150} y={440} width={780} height={760} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={8} transform={`rotate(-3 540 820)`} />
            <Huella cx={540} cy={800} r={290} p={kprog(T, K.H + 1.2, K.H + 2.6)} />
          </g>}
        </>)}
      </Escena>
      {/* 4 · al microscopio: el polvo café son esporas */}
      <Escena T={T} a={K.Po} b={K.Co} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>{Array.from({ length: 34 }, (_, i) => { const g = krng(i + 11); const x = 80 + g() * 920, y = 430 + g() * 760, on = kprog(T, K.Po + 0.1 + g() * 0.9, K.Po + 0.5 + g() * 0.9, kEase.rebote);
          return on > 0 ? <EsporaMicro key={i} x={x + mece(T, i, 0.4) * 10} y={y + mece(T, i + 5, 0.4) * 10} s={0.9 * on} rot={g() * 180} /> : null; })}</>)}
      </Escena>
      {/* 5 · el color de la huella */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[['#f5f1e6', 'blanca', 230], [EC.cafe, 'café', 540], ['#c98a7e', 'rosada', 850]].map(([c, t, x], i) => { const on = kprog(T, K.Co + 0.2 + i * 0.35, K.Co + 0.6 + i * 0.35, kEase.rebote); return on > 0 ? <g key={i} transform={`translate(${x} 820) scale(${on})`}>
            <rect x={-135} y={-150} width={270} height={300} rx={14} fill={i === 0 ? '#2b2b33' : '#fff'} stroke={KC.ink} strokeWidth={7} />
            <Huella cx={0} cy={-10} r={110} p={1} color={c} n={70} seed={i + 2} />
            <text x={0} y={128} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={i === 0 ? '#fff' : KC.ink}>{t}</text></g> : null; })}
        </>)}
        {T > K.Co + 2.0 && <div style={{ position:'absolute', left:540, top:1050, zIndex:43, transform:`translate(-50%,-50%) rotate(-6deg) scale(${klerp(2, 1, kprog(T, K.Co + 2.0, K.Co + 2.35, kEase.rebote))})`, opacity:kprog(T, K.Co + 2.0, K.Co + 2.15),
          border:`10px solid ${KC.red}`, borderRadius:22, padding:'8px 30px', font:`400 66px ${KF.titulo}`, color:KC.red, background:'rgba(255,255,255,.88)', whiteSpace:'nowrap' }}>NO dice si se come</div>}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>{Array.from({ length: 40 }, (_, i) => { const g = krng(i + 40); return <circle key={i} cx={60 + g() * 500} cy={500 + g() * 600 + Math.sin(T * 2 + i) * 14} r={6} fill={EC.espora} opacity=".7" />; })}<Interrogacion T={T} x={300} y={1080} /></>)}
      </Escena>
      {/* 7 · Buller cuenta */}
      <Escena T={T} a={K.B} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Microscopio x={300} y={1150} s={1.1} />
          <g transform="translate(720 1010) rotate(4)"><rect x={-190} y={-140} width={380} height={280} rx={12} fill="#fffbea" stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 12 }, (_, i) => kprog(T, K.B + 0.8 + i * 0.12, K.B + 0.9 + i * 0.12) > 0 ? <line key={i} x1={-150 + (i % 6) * 22 + Math.floor(i / 6) * 160} y1={-100} x2={-150 + (i % 6) * 22 + Math.floor(i / 6) * 160 + (i % 6 === 5 ? -110 : 0)} y2={-30} stroke="#2a3a8a" strokeWidth={6} strokeLinecap="round" /> : null)}
            {kprog(T, K.B + 2.5, K.B + 2.8) > 0 && <text x={-165} y={60} style={{ font:`700 30px ${KF.mono}` }} fill="#2a3a8a" opacity={kprog(T, K.B + 2.5, K.B + 2.8)}>≈ 16,000,000,000</text>}</g>
        </>)}
      </Escena>
      {/* 8 · el hongo de repisa: 30 mil millones al día, por seis meses */}
      <Escena T={T} a={K.R} b={K.Bj} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={-20} y={300} width={240} height={1700} fill="#8b5a33" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${30 + i * 28} 320 Q ${40 + i * 28 + Math.sin(i) * 20} 1100 ${30 + i * 28} 1990`} stroke="#6d4424" strokeWidth={6} fill="none" />)}
          <Repisa T={T} x={210} y={660} s={1.25} humo={kprog(T, K.R + 0.4, K.R + 1.2)} />
          <Repisa T={T} x={210} y={940} s={0.8} humo={kprog(T, K.R + 0.6, K.R + 1.4)} seed={9} />
          <Calendario x={830} y={1040} p={kprog(T, K.R + 2.4, K.R + 5.2)} />
        </>)}
        <NumeroGigante T={T} at={K.R + 1.0} until={K.Bj - 0.3} valor={30000000000} dur={1.2} sufijo="" etiqueta="esporas al día" x={400} y={500} tam={88} color={KC.yellow} />
      </Escena>
      {/* 9 · el bejín gigante */}
      <Escena T={T} a={K.Bj} b={K.Ra} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Prado T={T} y={1090} />
          <Bejin T={T} x={400} y={870} r={250 * kprog(T, K.Bj - 0.2, K.Bj + 0.6, kEase.rebote)} sopla={kprog(T, K.Bj + 2.2, K.Bj + 3.0)} />
        </>)}
        <NumeroGigante T={T} at={K.Bj + 0.8} until={K.Ra - 0.3} valor={7000000000000} dur={1.4} etiqueta="esporas adentro" x={400} y={480} tam={80} color={KC.pink} />
      </Escena>
      {/* 10 · casi ninguna cae donde pueda crecer */}
      <Escena T={T} a={K.Ra} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {LUGARES.map(([t, c], i) => <g key={i}><rect x={i * 180} y={1000} width={180} height={200} fill={c} stroke={KC.ink} strokeWidth={6} />
            <text x={i * 180 + 90} y={1050} textAnchor="middle" style={{ font:`700 ${t.length > 8 ? 20 : 26}px ${KF.mono}` }} fill={i === 1 || i === 5 ? KC.ink : '#fff'}>{t}</text></g>)}
          {Array.from({ length: 48 }, (_, i) => { const g = krng(i + 70); const x0 = 100 + g() * 880, t0 = K.Ra + g() * 1.6, u = kprog(T, t0, t0 + 0.9), x = x0 + Math.sin(i + T * 2) * 10, y = klerp(420, 990, u);
            const muerta = u >= 1 && Math.floor(x / 180) !== 4; const ok = u >= 1 && !muerta;
            return T >= t0 ? <circle key={i} cx={x} cy={y} r={8} fill={muerta ? EC.gris : ok ? KC.leaf : EC.espora} stroke={KC.ink} strokeWidth={2} opacity={muerta ? 0.55 : 1} /> : null; })}
        </>)}
      </Escena>
      {/* 11 · la lotería: 1 de unos 20 mil millones */}
      <Escena T={T} a={K.L} b={K.A} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Cuadricula T={T} cols={36} filas={40} llenado={kprog(T, K.L + 0.2, K.L + 2.6)} x={90} y={420} ancho={900} alto={760} vacio="rgba(255,255,255,.45)" lleno="#8a8f99" />
        {fsvg(<>{T > K.L + 2.8 && <g transform={`translate(${90 + 25 * 23 + 12} ${420 + 19 * 21 + 10})`}>
          <circle r={70 + 14 * Math.sin(T * 6)} fill={KC.gold2} opacity=".55" stroke={KC.ink} strokeWidth={4} />
          <rect x={-11} y={-9} width={21} height={17} rx={3} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />
          <g transform={`translate(0 -6) scale(${0.55 * kprog(T, K.L + 3.0, K.L + 3.8, kEase.rebote)})`}><Bisporus x={0} y={-180} s={0.6} pie={1} lam={0} /></g>
        </g>}</>, 35)}
      </Escena>
      {/* 12 · son cálculos aproximados */}
      <Escena T={T} a={K.A} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {[['16,000,000,000', 'champiñón de campo', 'Buller, 1922'], ['30,000,000,000 / día', 'hongo de repisa', 'J. H. White (en Buller), 1922'], ['7,000,000,000,000', 'bejín gigante', 'Buller, 1909']].map(([n, t, a], i) => { const e = kprog(T, K.A + 0.1 + i * 0.25, K.A + 0.5 + i * 0.25, kEase.rebote);
          return <div key={i} style={{ position:'absolute', left:90, top:470 + i * 190, width:900, zIndex:40, opacity:kprog(T, K.A + 0.1 + i * 0.25, K.A + 0.3 + i * 0.25), transform:`scale(${klerp(0.6, 1, e)})`, transformOrigin:'0 50%',
            background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:20, padding:'14px 26px', boxShadow:`8px 8px 0 ${KC.ink}` }}>
            <div style={{ font:`400 62px/1 ${KF.titulo}`, color:KC.ink }}>{n}</div>
            <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:6 }}>{t} · {a}</div></div>; })}
        {T > K.A + 1.3 && <div style={{ position:'absolute', left:560, top:1100, zIndex:44, transform:`translate(-50%,-50%) rotate(-5deg) scale(${klerp(2, 1, kprog(T, K.A + 1.3, K.A + 1.65, kEase.rebote))})`, opacity:kprog(T, K.A + 1.3, K.A + 1.45),
          border:`9px solid ${KC.red}`, borderRadius:22, padding:'6px 26px', font:`400 54px ${KF.titulo}`, color:KC.red, background:'rgba(255,255,255,.9)', whiteSpace:'nowrap' }}>≈ aproximados (1909–1922)</div>}
      </Escena>
      {/* 13 · cierre: el mismo champiñón del inicio; la lluvia de esporas se vuelve boletos */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Prado T={T} y={1000} />
          <CampoSeta T={T} x={300} y={1010} s={0.72} esporas={1 - kprog(T, K.C + 0.4, K.C + 1.2)} suelo={0} />
          {Array.from({ length: 22 }, (_, i) => { const g = krng(i + 300); const t0 = K.C + 0.6 + g() * 2.2, u = kprog(T, t0, t0 + 1.4, kEase.sale); const premio = i === 13;
            if (T < t0) return null; const x = 520 + g() * 500, y = klerp(520, 860 + g() * 110, u);
            return <Boleto key={i} x={x} y={y} rot={(g() - 0.5) * 70 + Math.sin(T * 2 + i) * 6} s={premio ? 1.3 : 0.95} premio={premio} />; })}
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.0} until={K.So - 0.3} x={60} y={470} texto="Agaricus campestris" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 1.4} until={K.So - 0.3} x={60} y={515} texto="champiñón de campo" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.G + 0.2} until={K.So - 0.3} valor={16000000000} dur={1.8} etiqueta="esporas" x={540} y={1620} tam={112} color={KC.yellow} />
      <Chip T={T} at={K.So + 0.3} until={K.V - 0.2} texto="1 · uno abierto · laminillas abajo" x={380} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.So + 0.6} until={K.So + 2.2} x={60} y={560} texto="Agaricus bisporus" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 0.3} until={K.H - 0.1} texto="2 · tápalo · espera una noche" x={400} y={470} tam={34} borde={KC.ink} />
      <Cronometro T={T} at={K.V + 0.6} until={K.H} factor={16000} etiqueta="UNA NOCHE" x={400} y={600} />
      <Etq T={T} at={K.H + 2.0} until={K.Po - 0.3} x={60} y={380} texto="huella de esporas" tam={36} color={KC.ink} />
      <Chip T={T} at={K.H + 2.8} until={K.Po - 0.3} texto="a veces no sale con champiñones del súper" x={540} y={1100} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Po + 0.2} until={K.Co - 0.3} x={60} y={380} texto="AL MICROSCOPIO · huella de esporas" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Po + 1.0} until={K.Co - 0.3} texto="≈ 7 µm cada una" x={540} y={1090} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Co + 1.2} until={K.P - 0.2} texto="color de esporas = una pista" x={380} y={470} tam={32} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.B + 0.2} until={K.R - 0.3} anio="1922" quien="A. H. R. Buller · U. de Manitoba, Canadá" revista="Researches on Fungi, vol. II" y={560} />
      <Etq T={T} at={K.R + 0.6} until={K.Bj - 0.3} x={540} y={780} texto="Ganoderma applanatum" it lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 1.0} until={K.Bj - 0.3} x={540} y={822} texto="hongo del artista" tam={24} color={KC.ink} />
      <Chip T={T} at={K.R + 2.6} until={K.Bj - 0.3} texto="medido por J. H. White, Toronto" x={380} y={1100} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Bj + 0.6} until={K.Ra - 0.3} x={660} y={760} texto="Calvatia gigantea" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Bj + 1.0} until={K.Ra - 0.3} x={660} y={802} texto="bejín gigante" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Bj + 2.0} until={K.Ra - 0.3} texto="billón = un millón de millones" x={540} y={1090} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.L + 2.9} until={K.A - 0.3} texto="1 de ≈ 20,000,000,000 (estimación de Buller, 1909)" x={540} y={1100} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="casi ningún premio" x={400} y={470} tam={40} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.So} texto="5 cm" largo={177} />
      <BarraEscala T={T} at={K.So} until={K.Po} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.Po} until={K.Co} texto="10 µm" largo={140} />
      <BarraEscala T={T} at={K.Co} until={K.P} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.R} until={K.Bj} texto="10 cm" largo={330} />
      <BarraEscala T={T} at={K.Bj} until={K.Ra} texto="40 cm" largo={500} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={177} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.So - 0.1} texto="Un champiñón de campo: *16 mil millones* de esporas." />
      <Subtitulo T={T} idx={1} at={K.So + 0.1} until={K.V - 0.1} texto="Sombrero abierto, *boca abajo* en un papel." />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={K.H - 0.1} texto="Tápalo y *espera una noche.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Po - 0.1} texto="Su *huella de esporas.*" />
      <Subtitulo T={T} idx={4} at={K.Po + 0.1} until={K.Co - 0.1} texto="Cada grano: *7 milésimas de mm.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.P - 0.1} texto="El color ayuda… *pero no dice si se come.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.05} until={K.B - 0.1} texto="¿Para qué *tantas?*" />
      <Subtitulo T={T} idx={7} at={K.B + 0.1} until={K.R - 0.1} texto="1922: *Reginald Buller* publicó sus cuentas." />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Bj - 0.1} texto="*30 mil millones* al día, por seis meses." />
      <Subtitulo T={T} idx={9} at={K.Bj + 0.1} until={K.Ra - 0.1} texto="Un bejín gigante: *7 billones.*" />
      <Subtitulo T={T} idx={10} at={K.Ra + 0.1} until={K.L - 0.1} texto="Casi ninguna cae *donde pueda crecer.*" />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.A - 0.1} texto="Quizá solo *una* forma un hongo nuevo." />
      <Subtitulo T={T} idx={12} at={K.A + 0.1} until={K.C - 0.1} texto="Cálculos de hace un siglo: *aproximados.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una lotería: *casi ningún premio.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [K.So + 0.8, K.V - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 1.3, K.Po - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Co + 0.4, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.B + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.1, K.R + 2.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Bj + 0.6, K.Ra - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.L + 0.5, K.A - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="32" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsporasConteoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsporasConteoShot /></CompositionStage></div>;
}
window.EsporasConteoApp = EsporasConteoApp;
