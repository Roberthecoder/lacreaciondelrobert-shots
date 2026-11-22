// Shot Fungi Mati #43 · La enfermedad de las cuevas: Histoplasma capsulatum — NARRADO (gancho 1 "Esto no es X: es Y" + N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.
// Escala del mundo micro: 10 µm = 150 px (15 px por µm). Microconidias 2–4 µm (r ≈ 22 px), macroconidias 8–15 µm (r ≈ 85 px),
// levaduras 2–4 µm (óvalos de ~45 × 33 px), macrófago ~20 µm (r ≈ 150–170 px).

const HP = { roca:'#4a3b52', roca2:'#2c2233', cueva:'#1d1624', piso:'#5b3a22', guano:'#2a1a10', polvo:'#d9c3a0', espora:'#fff2a8',
  hifa:'#fff4d6', levadura:'#ffd166', macro:'#c9a7f0', macro2:'#9a76c9', agua:'#36d6d0', piedra:'#d8c9a6', piedra2:'#b9a782' };

// Murciélago colgado de cabeza (alas plegadas). (x, y) = patas en el techo.
function Murcielago({ T, x, y, s = 1, seed = 1 }) {
  const r = mece(T, seed, 0.5) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <line x1={-8} y1={0} x2={-6} y2={16} stroke={KC.ink} strokeWidth={4} /><line x1={8} y1={0} x2={6} y2={16} stroke={KC.ink} strokeWidth={4} />
    <path d="M -24 16 Q -34 60 -14 92 Q 0 100 14 92 Q 34 60 24 16 Z" fill="#3a2d3f" stroke={KC.ink} strokeWidth={5} />
    <path d="M -24 20 Q -40 56 -20 88" stroke="#5a4762" strokeWidth={5} fill="none" /><path d="M 24 20 Q 40 56 20 88" stroke="#5a4762" strokeWidth={5} fill="none" />
    <circle cx={0} cy={104} r={17} fill="#4b3a52" stroke={KC.ink} strokeWidth={5} />
    <path d="M -12 114 L -16 132 L -4 118 Z M 12 114 L 16 132 L 4 118 Z" fill="#4b3a52" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-6} cy={100} r={3} fill="#ffd166" /><circle cx={6} cy={100} r={3} fill="#ffd166" />
  </g>;
}
// Bota de perfil (suela en y = 0).
function Bota({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -230 L 20 -230 L 24 -80 Q 110 -70 120 -20 L 120 0 L -70 0 L -70 -40 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-74} y={-14} width={198} height={18} rx={6} fill="#2b1a10" stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 -200 L 10 -200 M -50 -165 L 10 -165 M -50 -130 L 10 -130" stroke="#c98b2b" strokeWidth={6} />
  </g>;
}
// Nube de polvo que sube desde (x, y) a partir de t0; esporas = puntitos brillantes que siguen flotando.
function Polvo({ T, t0, x, y, esporas = 0, n = 16, seed = 7, hacia }) {
  if (T < t0) return null;
  const g = krng(seed), P = Array.from({ length: n }, () => [g() * 2 - 1, g(), 0.6 + g() * 0.8]);
  const E = Array.from({ length: 26 }, () => [g() * 2 - 1, g(), g()]);
  const u = kprog(T, t0, t0 + 2.6, kEase.sale), dt = T - t0;
  return <g>
    {P.map(([a, b, k], i) => <circle key={i} cx={x + a * 230 * u} cy={y - (40 + b * 260) * u} r={(26 + 40 * k) * (0.4 + u)} fill={HP.polvo} opacity={0.75 * (1 - kprog(T, t0 + 0.8, t0 + 3.6))} />)}
    {esporas > 0 && E.map(([a, b, c], i) => {
      let ex = x + a * 300 * u + Math.sin(dt * 1.3 + i) * 18, ey = y - (60 + b * 380) * u + Math.cos(dt * 1.1 + i) * 14;
      if (hacia) { const v = kprog(T, hacia.at + c * 0.8, hacia.at + 1.4 + c * 0.8, kEase.suave); ex = klerp(ex, hacia.x + Math.sin(i) * 10, v); ey = klerp(ey, hacia.y + Math.cos(i) * 8, v); }
      return <circle key={'e' + i} cx={ex} cy={ey} r={5 + c * 3} fill={HP.espora} opacity={esporas * kprog(T, t0 + 0.2, t0 + 0.8)} style={{ filter:`drop-shadow(0 0 6px ${HP.espora})` }} />; })}
  </g>;
}
// Cueva de frente: arco de roca, interior oscuro, murciélagos en el techo y piso con montones de guano.
function Cueva({ T, pisa = -9, esporas = 0, hacia, seed = 3 }) {
  const baja = kprog(T, pisa - 0.35, pisa, kEase.entra || ((p) => p * p)), sube = kprog(T, pisa + 0.35, pisa + 0.9, kEase.suave);
  const by = klerp(760, 1110, baja) - sube * 120;
  return <>
    <path d="M -20 1180 L -20 380 Q 120 300 300 330 Q 540 250 780 330 Q 960 300 1100 380 L 1100 1180 Z" fill={HP.roca} stroke={KC.ink} strokeWidth={10} />
    <path d="M 70 1180 L 90 620 Q 140 430 320 440 Q 540 380 760 440 Q 950 440 990 640 L 1010 1180 Z" fill={HP.cueva} stroke={KC.ink} strokeWidth={8} />
    {[[110, 520], [990, 560], [200, 420], [880, 420]].map(([cx, cy], i) => <path key={i} d={`M ${cx - 30} ${cy} L ${cx} ${cy + 60} L ${cx + 30} ${cy} Z`} fill={HP.roca2} stroke={KC.ink} strokeWidth={5} />)}
    {[[230, 456], [300, 448], [372, 444], [450, 436], [520, 432], [592, 436]].map(([mx, my], i) => <Murcielago key={i} T={T} x={mx} y={my} s={0.8 + (i % 2) * 0.15} seed={i + seed} />)}
    <path d="M -20 1110 Q 300 1080 540 1100 Q 800 1120 1100 1090 L 1100 1200 L -20 1200 Z" fill={HP.piso} stroke={KC.ink} strokeWidth={8} />
    {[[200, 1105, 120], [470, 1110, 150], [760, 1108, 130]].map(([gx, gy, w], i) => <g key={i}>
      <path d={`M ${gx - w} ${gy} Q ${gx} ${gy - 70} ${gx + w} ${gy} Z`} fill={HP.guano} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={gx - w * 0.6 + k * w * 0.24} cy={gy - 12 - (k % 2) * 16} r={5} fill="#4a3424" />)}
    </g>)}
    <Bota x={470} y={by} s={1.05} />
    {T > pisa - 0.05 && <Polvo T={T} t0={pisa} x={480} y={1100} esporas={esporas} seed={seed + 11} hacia={hacia} />}
  </>;
}
// Hifa ondulada con septos, microconidias lisas a los lados y macroconidias tuberculadas en ramitas cortas.
function HifaHisto({ T, x1, y1, x2, y2, p = 1, at = 0, micro = [], macro = [], onda = 18 }) {
  const N = 30, pts = [];
  for (let i = 0; i <= N; i++) { const u = i / N, nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny) || 1, w = Math.sin(u * Math.PI * 2.5) * onda;
    pts.push([klerp(x1, x2, u) + nx / L * w, klerp(y1, y2, u) + ny / L * w]); }
  const n = Math.max(2, Math.ceil(p * N) + 1), vis = pts.slice(0, n);
  const d = 'M ' + vis.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const at_ = (u) => pts[Math.min(N, Math.round(u * N))];
  const nrm = (u) => { const i = Math.min(N - 1, Math.round(u * N)), a = pts[i], b = pts[i + 1]; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; };
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={HP.hifa} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {[0.2, 0.4, 0.6, 0.8].filter((u) => u < p).map((u, i) => { const [px, py] = at_(u), [nx, ny] = nrm(u); return <line key={i} x1={px - nx * 10} y1={py - ny * 10} x2={px + nx * 10} y2={py + ny * 10} stroke="#c9b48a" strokeWidth={4} />; })}
    {micro.filter(([u]) => u < p).map(([u, lado], i) => { const [px, py] = at_(u), [nx, ny] = nrm(u), k = kprog(T, at + u * 1.4 + 0.3, at + u * 1.4 + 0.6, kEase.rebote);
      const sx = px + nx * lado * 34, sy = py + ny * lado * 34;
      return k > 0 ? <g key={i}><line x1={px} y1={py} x2={sx} y2={sy} stroke={HP.hifa} strokeWidth={6} />
        <circle cx={sx + nx * lado * 18} cy={sy + ny * lado * 18} r={21 * k} fill="#fffbe6" stroke={KC.ink} strokeWidth={4} /></g> : null; })}
    {macro.filter(([u]) => u < p).map(([u, lado], i) => { const [px, py] = at_(u), [nx, ny] = nrm(u), k = kprog(T, at + u * 1.4 + 0.7, at + u * 1.4 + 1.1, kEase.rebote);
      const sx = px + nx * lado * 40, sy = py + ny * lado * 40, cx = sx + nx * lado * 85, cy = sy + ny * lado * 85;
      return k > 0 ? <g key={'M' + i}><line x1={px} y1={py} x2={sx} y2={sy} stroke={HP.hifa} strokeWidth={8} />
        <Macroconidia x={cx} y={cy} s={k} rot={T * 6 + i * 40} /></g> : null; })}
  </g>;
}
// Macroconidia tuberculada: esfera de pared gruesa (~12 µm) con proyecciones redondeadas.
function Macroconidia({ x, y, s = 1, rot = 0 }) {
  const n = 18;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return <g key={i} transform={`rotate(${a * 180 / Math.PI})`}>
      <path d="M 70 -9 L 92 -6 Q 100 0 92 6 L 70 9 Z" fill="#f3dcae" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /></g>; })}
    <circle r={76} fill="#f3dcae" stroke={KC.ink} strokeWidth={6} />
    <circle r={62} fill="#fff4d6" stroke="#c9b48a" strokeWidth={4} />
    <ellipse cx={-22} cy={-24} rx={20} ry={11} fill="#fff" opacity=".6" transform="rotate(-30 -22 -24)" />
  </g>;
}
// Levadura ovalada (2–4 µm) con yema opcional. halo = anillo claro (el falso "cápsula").
function LevaduraH({ x, y, s = 1, rot = 0, yema = 0, halo = 0, color = HP.levadura }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {halo > 0 && <ellipse rx={36} ry={28} fill="rgba(255,255,255,.18)" stroke="#e8f4ff" strokeWidth={4} opacity={halo} />}
    {yema > 0 && <ellipse cx={22 + 6 * yema} cy={0} rx={12 * yema} ry={10 * yema} fill={color} stroke={KC.ink} strokeWidth={3} />}
    <ellipse rx={22} ry={16} fill={color} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-6} cy={-5} rx={7} ry={4} fill="#fff" opacity=".55" />
  </g>;
}
// Macrófago: célula grande con contorno que se mueve (seudópodos) y núcleo de riñón. (cx, cy) centro.
function Macrofago({ T, cx, cy, r = 160, seed = 2, children }) {
  const g = krng(seed), fases = Array.from({ length: 7 }, () => g() * 6.28), n = 48;
  const d = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2;
    const rr = r * (1 + fases.reduce((acc, f, k) => acc + Math.sin(a * (k + 2) + f + T * (0.6 + k * 0.15)) * 0.05 / (1 + k * 0.4), 0));
    return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g>
    <path d={d} fill={HP.macro} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" opacity=".95" />
    <path d={`M ${cx - r * 0.55} ${cy + r * 0.25} Q ${cx - r * 0.6} ${cy - r * 0.35} ${cx - r * 0.15} ${cy - r * 0.3} Q ${cx - r * 0.3} ${cy} ${cx - r * 0.1} ${cy + r * 0.3} Q ${cx - r * 0.35} ${cy + r * 0.55} ${cx - r * 0.55} ${cy + r * 0.25} Z`} fill={HP.macro2} stroke={KC.ink} strokeWidth={5} />
    {children}
  </g>;
}
// Persona simple (ícono). mal 0..1 = cara verdosa.
function PersonaH({ x, y, s = 1, color = '#8fb6ff', mal = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-62} r={26} fill={mixHex('#f2c29b', '#b9cf8e', mal)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Cenote en corte: suelo con selva arriba, bóveda de piedra caliza con una boca, agua turquesa y murciélagos en el techo.
function Cenote({ T, x = 0, y = 0, nadadores = 0, cerrado = 0, seed = 5 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-20} y={760} width={1120} height={560} fill={HP.piedra2} stroke={KC.ink} strokeWidth={8} />
    <path d="M -20 760 L 1100 760 L 1100 790 L -20 790 Z" fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />
    {[[90, 760], [200, 760], [870, 760], [990, 760]].map(([tx, ty], i) => <g key={i} transform={`translate(${tx} ${ty}) rotate(${mece(T, i + seed, 0.4) * 2})`}>
      <rect x={-8} y={-110} width={16} height={110} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
      <circle cx={0} cy={-130} r={52} fill="#2f9e44" stroke={KC.ink} strokeWidth={5} /></g>)}
    <path d="M 120 1210 Q 100 900 380 850 L 430 790 L 650 790 L 700 850 Q 980 900 960 1210 Z" fill="#1f2a3a" stroke={KC.ink} strokeWidth={8} />
    <path d={`M 430 790 L 650 790 L 760 1150 L 320 1150 Z`} fill="rgba(255,248,200,.16)" />
    {[[250, 900], [320, 872], [760, 872], [830, 900], [700, 860]].map(([mx, my], i) => <Murcielago key={i} T={T} x={mx} y={my} s={0.55} seed={i + seed} />)}
    <path d={`M 128 1110 ${Array.from({ length: 21 }, (_, i) => `L ${128 + i * 41.6} ${1110 + Math.sin(T * 2.4 + i * 0.9) * 6}`).join(' ')} L 955 1210 L 125 1210 Z`} fill={HP.agua} stroke={KC.ink} strokeWidth={6} opacity=".95" />
    {nadadores > 0 && [380, 480, 600, 700].map((nx, i) => { const k = kprog(nadadores, i * 0.2, i * 0.2 + 0.4, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${nx + Math.sin(T * 1.2 + i) * 14} ${1104 + Math.sin(T * 2.4 + i) * 5}) scale(${k})`}>
      <circle r={22} fill="#f2c29b" stroke={KC.ink} strokeWidth={5} /><path d="M -40 14 Q 0 0 40 14" stroke="#fff" strokeWidth={5} fill="none" /></g> : null; })}
    {cerrado > 0 && <g opacity={kprog(cerrado, 0, 0.3)}>
      {[[-14, 0], [12, 1]].map(([rot, k]) => <g key={k} transform={`translate(540 ${770 + k * 50}) rotate(${rot}) scale(${kprog(cerrado, k * 0.25, k * 0.25 + 0.4, kEase.sale)} 1)`}>
        <rect x={-560} y={-30} width={1120} height={60} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: 28 }, (_, i) => <path key={i} d={`M ${-560 + i * 40} 30 L ${-540 + i * 40} -30 L ${-525 + i * 40} -30 L ${-545 + i * 40} 30 Z`} fill={KC.ink} opacity=".85" />)}
      </g>)}
    </g>}
  </g>;
}

function HistoplasmaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, A: CUES.Aire, Pu: CUES.Pulmon, Ca: CUES.Cambio, P: CUES.Pregunta, M: CUES.Macrofago, S: CUES.Sintomas,
    E: CUES.Estudio, En: CUES.Enfermos, Ce: CUES.Cenote, N: CUES.Nombre, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // macrófago: traga (M+0.4..M+2.0), multiplica (M+2.2..M+4.0), viaja (M+3.8..fin)
  const traga = kprog(T, K.M + 0.4, K.M + 2.0, kEase.suave), viaja = kprog(T, K.M + 3.8, K.S + 0.2, kEase.suave);
  const mcx = klerp(400, 640, viaja), mcy = klerp(900, 1010, viaja);
  const nLev = 5 + Math.floor(7 * kprog(T, K.M + 2.2, K.M + 4.0));
  const LEV = [[-60, -40], [40, -70], [70, 20], [-20, 50], [-90, 30], [10, -10], [90, -40], [-50, -90], [40, 80], [-100, -30], [110, 60], [-30, 100]];
  const FUERA = [[-330, -260], [300, -280], [330, 200], [-300, 240], [-360, -20]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la bota pisa el piso de la cueva y levanta polvo */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.06} origen="45% 60%">
        <FondoLunares color={KC.lilac} />
        {fsvg(<Cueva T={T} pisa={K.G + 0.35} esporas={kprog(T, K.G + 3.2, K.G + 4.0)} seed={3} />)}
      </Escena>
      {/* 2 · al microscopio: hifas con microconidias y macroconidias */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <HifaHisto T={T} x1={-40} y1={1000} x2={700} y2={700} p={kprog(T, K.H, K.H + 1.6)} at={K.H} micro={[[0.12, 1], [0.24, -1], [0.38, 1], [0.5, -1], [0.66, 1], [0.8, -1]]} macro={[[0.58, -1]]} />
          <HifaHisto T={T} x1={1120} y1={830} x2={560} y2={1010} p={kprog(T, K.H + 0.4, K.H + 2.0)} at={K.H + 0.4} micro={[[0.15, -1], [0.3, 1], [0.48, -1], [0.62, 1]]} macro={[[0.85, 1]]} onda={14} />
        </>)}
      </Escena>
      {/* 3 · otra pisada: las esporas suben al aire */}
      <Escena T={T} a={K.A} b={K.Pu} zoom={0.08} origen="45% 55%">
        <FondoLunares color={KC.lilac} />
        {fsvg(<Cueva T={T} pisa={K.A + 0.25} esporas={1} seed={9} />)}
      </Escena>
      {/* 4 · las respiras: bajan hasta los alvéolos */}
      <Escena T={T} a={K.Pu} b={K.Ca} zoom={0.06} origen="50% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <circle cx={540} cy={560} r={110} fill="#f2c29b" stroke={KC.ink} strokeWidth={8} />
          <path d="M 500 600 Q 540 625 580 600" stroke={KC.ink} strokeWidth={6} fill="none" />
          <path d="M 260 1250 Q 250 760 540 720 Q 830 760 820 1250 Z" fill="#8fb6ff" stroke={KC.ink} strokeWidth={8} />
          <path d="M 520 780 Q 380 790 350 950 Q 330 1120 470 1130 Q 520 1040 520 900 Z" fill="#ff8fa8" stroke={KC.ink} strokeWidth={7} />
          <path d="M 560 780 Q 700 790 730 950 Q 750 1120 610 1130 Q 560 1040 560 900 Z" fill="#ff8fa8" stroke={KC.ink} strokeWidth={7} />
          <path d="M 540 640 L 540 820 M 540 820 Q 500 860 460 940 M 540 820 Q 580 860 620 940 M 470 920 L 420 1000 M 470 920 L 490 1040 M 610 920 L 660 1000 M 610 920 L 590 1040" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
          {Array.from({ length: 12 }, (_, i) => { const u = kprog(T, K.Pu + 0.2 + i * 0.12, K.Pu + 1.6 + i * 0.12, kEase.suave); if (u <= 0) return null;
            const destX = [420, 490, 660, 590][i % 4], destY = [1000, 1040, 1000, 1040][i % 4];
            const x = u < 0.4 ? klerp(180 + (i % 3) * 40, 540, u / 0.4) : u < 0.7 ? 540 : klerp(540, destX, (u - 0.7) / 0.3);
            const y = u < 0.4 ? klerp(520 + (i % 4) * 30, 612, u / 0.4) : u < 0.7 ? klerp(610, 820, (u - 0.4) / 0.3) : klerp(820, destY, (u - 0.7) / 0.3);
            return <circle key={i} cx={x} cy={y} r={9} fill={HP.espora} stroke={KC.ink} strokeWidth={2} style={{ filter:`drop-shadow(0 0 6px ${HP.espora})` }} />; })}
        </>)}
      </Escena>
      {/* 5 · el calor del cuerpo: de espora (moho) a levadura */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#2a0f1e' }}></div>
        <Ambiente T={T} n={14} color="rgba(255,180,200,.3)" />
        {fsvg(<>
          <circle cx={540} cy={880} r={380} fill="rgba(255,143,168,.12)" stroke="#ff8fa8" strokeWidth={14} />
          {[[400, 760], [620, 720], [520, 900], [700, 960], [380, 1000]].map(([x, y], i) => { const v = kprog(T, K.Ca + 1.0 + i * 0.15, K.Ca + 2.0 + i * 0.15, kEase.suave);
            return <g key={i}>
              {v < 1 && <circle cx={x} cy={y} r={21} fill="#fffbe6" stroke={KC.ink} strokeWidth={4} opacity={1 - v} />}
              {v > 0 && <LevaduraH x={x} y={y + Math.sin(T * 2 + i) * 4} s={v} yema={kprog(T, K.Ca + 2.4 + i * 0.1, K.Ca + 3.2 + i * 0.1)} rot={i * 50} />}
            </g>; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7 · el macrófago se las traga, pero adentro se multiplican y viajan */}
      <Escena T={T} a={K.M} b={K.S} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d={`M -40 ${1060 + 0} Q 400 ${980} 1120 ${1180}`} stroke="#5a1f2c" strokeWidth={180} fill="none" opacity={kprog(T, K.M + 3.4, K.M + 4.0)} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.25 + i / 6) % 1); return <circle key={i} cx={klerp(-40, 1120, u)} cy={klerp(1060, 1180, u) - 60 * Math.sin(u * Math.PI)} r={22} fill="#d6455a" opacity={0.7 * kprog(T, K.M + 3.4, K.M + 4.0)} />; })}
          <Macrofago T={T} cx={mcx} cy={mcy} r={165}>
            {LEV.slice(0, nLev).map(([dx, dy], i) => { const ent = i < 5 ? traga : 1; const [fx, fy] = i < 5 ? FUERA[i] : [dx, dy];
              const x = mcx + klerp(fx, dx, ent), y = mcy + klerp(fy, dy, ent);
              const nace = i < 5 ? 1 : kprog(T, K.M + 2.2 + (i - 5) * 0.25, K.M + 2.5 + (i - 5) * 0.25, kEase.rebote);
              return <g key={i}>
                {ent > 0.9 && <ellipse cx={x} cy={y} rx={30} ry={24} fill="rgba(255,255,255,.22)" stroke="#e8dcff" strokeWidth={3} />}
                <LevaduraH x={x} y={y} s={nace} rot={i * 37} yema={i < 5 ? kprog(T, K.M + 2.2 + i * 0.3, K.M + 2.6 + i * 0.3) * (i % 2) : 0} />
              </g>; })}
          </Macrofago>
        </>)}
      </Escena>
      {/* 8 · a casi todos no les pasa nada o algo leve */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 20 }, (_, i) => { const on = kprog(T, K.S + 0.2 + i * 0.05, K.S + 0.5 + i * 0.05, kEase.rebote); const x = 140 + (i % 5) * 200, y = 720 + Math.floor(i / 5) * 128;
            const leve = i === 6 || i === 13 || i === 17; const mk = kprog(T, K.S + 1.4 + i * 0.04, K.S + 1.7 + i * 0.04, kEase.rebote);
            return on > 0 ? <g key={i}><PersonaH x={x} y={y} s={on * 0.85} mal={leve ? 0.6 : 0} color={leve ? '#ffb38a' : '#8fb6ff'} />
              {mk > 0 && !leve && <path d={`M ${x + 30} ${y - 70} l 12 14 l 24 -30`} stroke="#1f9e3a" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`translate(0 0) scale(1)`} opacity={mk} />}
              {mk > 0 && leve && <g transform={`translate(${x + 52} ${y - 80}) scale(${mk})`}>
                {i === 6 && <><rect x={-6} y={-30} width={12} height={40} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={3} /><rect x={-3} y={-12} width={6} height={22} fill={KC.red} /><circle cy={14} r={11} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></>}
                {i === 13 && <path d="M -10 -14 Q 10 -4 -10 6 M 4 -22 Q 26 -4 4 14" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />}
                {i === 17 && <text x={0} y={8} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.blue} stroke={KC.ink} strokeWidth={1.5}>z</text>}
              </g>}
            </g> : null; })}
        </>)}
      </Escena>
      {/* 9 · el estudio: abril de 2024, un cenote de la península de Yucatán */}
      <Escena T={T} a={K.E} b={K.En} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<Cenote T={T} y={-130} nadadores={kprog(T, K.E + 2.0, K.E + 4.0)} seed={5} />)}
      </Escena>
      {/* 10 · 2–3 semanas después: 3 confirmados y 1 sospechoso */}
      <Escena T={T} a={K.En} b={K.Ce}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {Array.from({ length: 21 }, (_, i) => { const on = kprog(T, K.En + 0.3 + i * 0.07, K.En + 0.5 + i * 0.07); const x = 110 + (i % 7) * 82, y = 560 + Math.floor(i / 7) * 82; const marca = i >= 14;
            return on > 0 ? <g key={i} opacity={on}><rect x={x} y={y} width={70} height={70} rx={10} fill={marca ? KC.red : '#fff'} stroke={KC.ink} strokeWidth={5} />
              <text x={x + 35} y={y + 46} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={marca ? '#fff' : KC.ink}>{i + 1}</text></g> : null; })}
          {[0, 1, 2, 3].map((i) => { const on = kprog(T, K.En + 2.2 + i * 0.2, K.En + 2.5 + i * 0.2, kEase.rebote); const x = 210 + i * 220, y = 970; const conf = i < 3;
            const tag = kprog(T, K.En + 3.0 + i * 0.3, K.En + 3.3 + i * 0.3, kEase.rebote);
            return on > 0 ? <g key={i}><PersonaH x={x} y={y} s={on * 1.3} mal={0.7} color="#8fb6ff" />
              {tag > 0 && <g transform={`translate(${x} ${y + 70}) scale(${tag}) rotate(-6)`}>
                <rect x={-100} y={-26} width={200} height={52} rx={12} fill={conf ? KC.red : KC.paper} stroke={KC.ink} strokeWidth={5} />
                <text y={10} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={conf ? '#fff' : KC.ink}>{conf ? 'confirmado' : 'sospechoso'}</text></g>}
            </g> : null; })}
        </>)}
      </Escena>
      {/* 11 · otro cenote de la zona, cerrado desde 2019 */}
      <Escena T={T} a={K.Ce} b={K.N} zoom={0.05} origen="50% 45%">
        <FondoLunares color={KC.mint} />
        {fsvg(<Cenote T={T} y={-130} cerrado={kprog(T, K.Ce + 0.6, K.Ce + 2.0)} seed={8} />)}
      </Escena>
      {/* 12 · el nombre: "capsulatum" por un halo que parecía cápsula */}
      <Escena T={T} a={K.N} b={K.C} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<Macrofago T={T} cx={540} cy={900} r={230} seed={4}>
          {LEV.slice(0, 11).map(([dx, dy], i) => <LevaduraH key={i} x={540 + dx * 1.45} y={900 + dy * 1.45} rot={i * 37} halo={kprog(T, K.N + 0.4, K.N + 1.0)} />)}
        </Macrofago>)}
      </Escena>
      {/* 13 · cierre: la misma cueva y la misma bota; el polvo lleva esporas rumbo a una nariz */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 60%">
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Cueva T={T} pisa={K.C + 0.3} esporas={1} seed={3} hacia={{ at: K.C + 1.6, x: 905, y: 905 }} />
          <g opacity={kprog(T, K.C + 0.8, K.C + 1.3)}>
            <path d="M 1100 760 Q 980 770 960 860 Q 920 880 905 905 Q 930 930 955 935 Q 950 1010 1010 1060 L 1100 1060 Z" fill="#f2c29b" stroke={KC.ink} strokeWidth={7} />
            <circle cx={1000} cy={840} r={8} fill={KC.ink} />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.6} until={K.H - 0.3} texto="no es solo tierra: puede ser guano" x={400} y={1040} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.G + 2.4} until={K.H - 0.3} x={170} y={650} texto="murciélagos" tam={30} />
      <Chip T={T} at={K.H + 0.3} until={K.A - 0.3} texto="AL MICROSCOPIO · moho" x={360} y={420} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.H + 0.9} until={K.A - 0.3} x={60} y={520} texto="Histoplasma capsulatum" it tam={38} />
      <Etq T={T} at={K.H + 1.5} until={K.A - 0.3} x={60} y={580} texto="vive en el guano" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.H + 1.9} until={K.A - 0.3} x={60} y={1110} texto="microconidias 2–4 µm (lisas)" tam={28} color="#fffbe6" />
      <Etq T={T} at={K.H + 2.5} until={K.A - 0.3} x={1040} y={1010} lado="izq" texto="macroconidia 8–15 µm" tam={28} color="#f3dcae" />
      <Chip T={T} at={K.A + 1.2} until={K.Pu - 0.2} texto="esporas de 2–4 µm: no las ves" x={400} y={1040} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Pu + 0.8} until={K.Ca - 0.2} x={760} y={980} texto="pulmones" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.2} until={K.Ca + 1.4} texto="en el suelo: moho" x={540} y={430} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Ca + 1.6} until={K.P - 0.2} texto="a 37 °C, en tu cuerpo: levadura" x={540} y={430} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Ca + 0.5} until={K.P - 0.2} x={940} y={540} lado="izq" texto="POR DENTRO · pulmón" tam={28} color="#ff8fa8" />
      <Etq T={T} at={K.M + 0.8} until={K.S - 0.2} x={40} y={680} texto="macrófago (defensa)" tam={30} color={HP.macro} />
      <Etq T={T} at={K.M + 1.6} until={K.S - 0.2} x={40} y={1110} texto="levaduras de 2–4 µm" tam={28} color={HP.levadura} />
      <Chip T={T} at={K.M + 2.3} until={K.M + 3.8} texto="adentro se multiplica" x={400} y={460} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.M + 4.0} until={K.S - 0.2} texto="y viaja dentro de él" x={400} y={460} tam={34} borde={KC.red} />
      <Chip T={T} at={K.S + 0.4} until={K.E - 0.2} texto="casi todos: nada o algo leve" x={400} y={470} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.0} until={K.E - 0.2} texto="fiebre · tos · cansancio" x={400} y={570} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.6} anio="2024" quien="abril · cenote de la península de Yucatán" revista="4 turistas · CCDR (Canadá), 2025" y={470} />
      <Etq T={T} at={K.E + 3.8} until={K.En - 0.2} x={1000} y={690} lado="izq" texto="murciélagos en el techo" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.En - 0.2} texto="4 turistas nadaron aquí" x={380} y={470} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.En + 0.2} until={K.Ce - 0.2} texto="2–3 semanas después" x={380} y={460} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ce + 2.0} until={K.N - 0.2} texto="CERRADO desde 2019 · CCDR 2025" x={380} y={470} tam={30} fondo={KC.yellow} color={KC.ink} borde={KC.ink} />
      <Etq T={T} at={K.Ce + 0.6} until={K.Ce + 1.9} x={40} y={470} texto="otro cenote de la zona" tam={30} color={KC.ink} />
      <Chip T={T} at={K.N + 0.2} until={K.C - 0.2} texto="capsulatum = “con cápsula”" x={400} y={440} tam={34} borde={KC.gold} />
      <MitoTachado T={T} at={K.N + 0.8} tacharEn={K.N + 1.7} until={K.C - 0.2} texto="cápsula" x={300} y={560} tam={46} />
      <Etq T={T} at={K.N + 1.9} until={K.C - 0.2} x={1040} y={1100} lado="izq" texto="solo un halo claro" tam={30} color="#e8f4ff" />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="no es solo tierra: puede ser guano" x={400} y={1040} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="1 m" largo={160} />
      <BarraEscala T={T} at={K.H} until={K.A} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.A} until={K.Pu} texto="1 m" largo={160} />
      <BarraEscala T={T} at={K.Pu} until={K.Ca} texto="10 cm" largo={140} />
      <BarraEscala T={T} at={K.Ca} until={K.P} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.M} until={K.S} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.E} until={K.En} texto="10 m" largo={180} />
      <BarraEscala T={T} at={K.Ce} until={K.N} texto="10 m" largo={180} />
      <BarraEscala T={T} at={K.N} until={K.C} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es solo tierra: *puede ser guano.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.A - 0.1} texto="En el guano crece *como moho.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Pu - 0.1} texto="Pisas y las esporas *suben al aire.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.Ca - 0.1} texto="Las respiras *hasta el fondo.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.P - 0.1} texto="Tu calor lo vuelve *levadura.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.M - 0.1} texto="¿Tus defensas *no se lo comen?*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.S - 0.1} texto="Sobrevive *dentro del macrófago.*" />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={K.E - 0.1} texto="Casi todos: *nada o algo leve.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.En - 0.1} texto="2024: un cenote *con murciélagos.*" />
      <Subtitulo T={T} idx={9} at={K.En + 0.1} until={K.Ce - 0.1} texto="3 confirmados *y 1 sospechoso.*" />
      <Subtitulo T={T} idx={10} at={K.Ce + 0.1} until={K.N - 0.1} texto="Otro cenote: *cerrado desde 2019.*" />
      <Subtitulo T={T} idx={11} at={K.N + 0.1} until={K.C - 0.1} texto="¿Capsulatum? *No tiene cápsula.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ese polvo puede llevar *un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.0, K.A - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A + 0.5, K.Ca - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.M + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [K.M + 3.0, K.S + 2.5, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.E + 3.8, K.En + 2.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ce + 0.3, K.N + 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.N + 0.5, K.C - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="43" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HistoplasmaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HistoplasmaShot /></CompositionStage></div>;
}
window.HistoplasmaApp = HistoplasmaApp;
