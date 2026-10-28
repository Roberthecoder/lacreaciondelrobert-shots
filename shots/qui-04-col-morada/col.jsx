// Shot Químico #04 · Esto no es agua de jamaica: es un medidor de pH (col morada) — NARRADO (N5 experimento + N3 escala).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (colores aproximados).

// Color del jugo de col según el pH (esquemático, de las fuentes: rojo → violeta → azul → verde → amarillo).
const PH_STOPS = [[1, '#d81b3c'], [3, '#ff4f8b'], [5, '#a0409e'], [6.5, '#6a3aa0'], [8, '#2f5fd0'], [10, '#1fa37a'], [12, '#b9d23a'], [13.5, '#f2d23a']];
function colorPH(ph) {
  if (ph <= PH_STOPS[0][0]) return PH_STOPS[0][1];
  for (let i = 0; i < PH_STOPS.length - 1; i++) { const [a, ca] = PH_STOPS[i], [b, cb] = PH_STOPS[i + 1]; if (ph <= b) return mixHex(ca, cb, (ph - a) / (b - a)); }
  return PH_STOPS[PH_STOPS.length - 1][1];
}
const MORADO = colorPH(6.5);

// Vaso de vidrio (x, y = centro de la base).
function Vaso({ T = 0, x, y, s = 1, color = MORADO, nivel = 0.75, hielo = 0, gira = 0 }) {
  const h = 420, wTop = 150, wBot = 115, yl = -h * nivel, wl = klerp(wBot, wTop, nivel);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-wBot + 6} -6 L ${wBot - 6} -6 L ${wl - 6} ${yl} L ${-wl + 6} ${yl} Z`} fill={color} />
    <ellipse cx={0} cy={yl} rx={wl - 6} ry={14} fill={mixHex(color, '#ffffff', 0.25)} />
    {hielo > 0 && [[-50, 0.2], [30, 1.3], [-5, 2.4]].map(([dx, p], i) => <rect key={i} x={dx + Math.sin(T * 1.3 + p) * 8} y={yl - 10 + i * 34 + Math.cos(T * 1.1 + p) * 5} width={56} height={50} rx={10} fill="rgba(255,255,255,.55)" stroke="rgba(0,0,0,.35)" strokeWidth={3} transform={`rotate(${10 + i * 20 + gira} ${dx + 28} ${yl + i * 34})`} opacity={hielo} />)}
    <path d={`M ${-wBot} 0 L ${wBot} 0 L ${wTop} ${-h} L ${-wTop} ${-h} Z`} fill="rgba(255,255,255,.14)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-wTop + 26} ${-h + 30} L ${-wBot + 20} -30`} stroke="rgba(255,255,255,.6)" strokeWidth={10} strokeLinecap="round" />
  </g>;
}
// Col morada partida a la mitad (venas blancas).
function ColMorada({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={150} fill="#5b2a86" stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${-120 + i * 8} ${-60 + i * 30} Q 0 ${-120 + i * 40} ${120 - i * 8} ${-60 + i * 30}`} stroke="#efe3ff" strokeWidth={9} fill="none" opacity={0.9} />)}
    <path d="M -20 150 L 20 150 L 12 70 L -12 70 Z" fill="#f2ecff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Limón (verde, mexicano) partido.
function Limon({ x, y, s = 1, rot = 0, aprieta = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 - aprieta * 0.12)}, ${s * (1 + aprieta * 0.05)})`}>
    <ellipse rx={100} ry={90} fill="#5fbf3a" stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={82} ry={72} fill="#e3f59a" />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 74} y2={Math.sin(a) * 66} stroke="#b7d86a" strokeWidth={5} />; })}
  </g>;
}
// Molécula de antocianina esquemática: dos anillos fusionados + uno colgado. forma 0 = catión (cerrado, +), 1 = base (cerrada), 2 = abierta (chalcona).
function Antocianina({ x, y, s = 1, color = MORADO, forma = 0, T = 0 }) {
  const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`; }).join(' ');
  const abre = kclamp(forma - 1, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8) * 6})`}>
    <polygon points={hex(-104, 0, 60)} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g transform={`rotate(${abre * 25} 0 0)`}>
      <polygon points={hex(0, 0, 60)} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" strokeDasharray={abre > 0.3 ? '70 40' : 'none'} />
      <line x1={52} y1={30} x2={110} y2={60} stroke={KC.ink} strokeWidth={10} />
      <polygon points={hex(160, 70, 52)} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>
    <circle cx={0} cy={-60} r={20} fill={QA.O} stroke={KC.ink} strokeWidth={5} />
    {forma < 0.5 && <text x={36} y={-64} style={{ font:`700 54px ${KF.mono}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">+</text>}
  </g>;
}
function Pescado({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 0 Q -80 -120 140 -30 L 240 -100 L 220 0 L 240 100 L 140 30 Q -80 120 -230 0 Z" fill="#a9c4d6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={-150} cy={-14} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={-148} cy={-14} r={7} fill={KC.ink} />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-70 + i * 60} -50 q 20 50 0 100`} stroke="rgba(0,0,0,.25)" strokeWidth={6} fill="none" />)}
  </g>;
}
function Pollo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -140 -60 Q -200 40 -110 110 Q 0 160 60 60 L 150 10 Q 190 -10 170 -40 Q 150 -70 120 -40 L 30 -20 Q -60 -150 -140 -60 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={175} cy={-60} r={26} fill="#fff4e0" stroke={KC.ink} strokeWidth={6} /><circle cx={195} cy={-30} r={22} fill="#fff4e0" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function FlorJamaica({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: 5 }, (_, i) => <path key={i} d="M 0 0 Q -40 -70 0 -130 Q 40 -70 0 0 Z" fill="#b5122e" stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 72})`} />)}
    <circle r={26} fill="#7a0b1f" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Licuadora({ x, y, s = 1, T = 0, on = 0 }) {
  const vib = on * Math.sin(T * 60) * 3;
  return <g transform={`translate(${x + vib} ${y}) scale(${s})`}>
    <rect x={-120} y={0} width={240} height={130} rx={20} fill="#c3cbd3" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={65} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d="M -100 0 L -130 -330 L 130 -330 L 100 0 Z" fill="rgba(255,255,255,.2)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -96 -10 L -118 -${150 + on * 60} Q 0 -${190 + on * 70 + Math.sin(T * 20) * 20 * on} 118 -${150 + on * 60} L 96 -10 Z`} fill={MORADO} opacity={0.9} />
    <rect x={-140} y={-360} width={280} height={36} rx={12} fill="#3b3f48" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Col() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pi: CUES.Pigmento, Li: CUES.Limon, Bi: CUES.Bicarbonato, Fo: CUES.Forma, Es: CUES.Escala, Pr: CUES.Pregunta, Et: CUES.Estudio, Pe: CUES.Pescado, Ja: CUES.Jamaica, Ca: CUES.Casa, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const llega = kprog(T, K.G, K.G + 0.7, kEase.rebote);
  const rojo = kprog(T, K.Li + 1.0, K.Li + 2.4, kEase.suave), azul = kprog(T, K.Bi + 1.0, K.Bi + 2.4, kEase.suave);
  const phF = klerp(6.5, 3.2, kprog(T, K.Fo + 0.6, K.Fo + 2.4)) + klerp(0, 5.3, kprog(T, K.Fo + 3.2, K.Fo + 5.6));
  const phE = klerp(1, 13.5, kprog(T, K.Es + 0.3, K.Es + 5.3, kEase.suave));
  const dias = kprog(T, K.Pe + 0.3, K.Pe + 5.8);
  const pollo = kprog(T, K.Ja + 2.2, K.Ja + 5.2);
  const tubos = [[1.5, 'muy ácido'], [4, ''], [6.5, 'neutro'], [8, 'básico'], [10.5, ''], [13.5, 'muy básico']];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: ¿jamaica? no: col morada */}
      <Escena T={T} a={K.G} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Vaso T={T} x={klerp(-200, 380, llega)} y={1180} s={1.25} hielo={1} />
          <g opacity={kprog(T, K.G + 2.2, K.G + 2.7)} transform={`translate(${klerp(1200, 0, kprog(T, K.G + 2.2, K.G + 2.9, kEase.sale))} 0)`}><ColMorada x={800} y={1000} s={0.95} rot={T * 8} /></g>
        </SvgCapa>
      </Escena>
      {/* 1 · antocianinas: lupa sobre la col */}
      <Escena T={T} a={K.Pi} b={K.Li}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><ColMorada x={300} y={1050} s={1.25} rot={-10} /></SvgCapa>
        <Lupa T={T} at={K.Pi + 0.4} until={K.Li - 0.2} x={740} y={800} r={230} fx={330} fy={1000} tinte={KC.pink} etiqueta="antocianinas"
          interior={(T2, r) => <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#0d1424" />
            {[[0.35, 0.35, 0.42], [0.7, 0.62, 0.36], [0.3, 0.75, 0.3]].map(([u, v, k], i) => <Antocianina key={i} x={u * 2 * r} y={v * 2 * r} s={k} T={T2 + i} color={MORADO} forma={1} />)}
          </svg>} />
      </Escena>
      {/* 2 · limón → rojo */}
      <Escena T={T} a={K.Li} b={K.Bi}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vaso T={T} x={540} y={1180} s={1.25} color={mixHex(MORADO, colorPH(2), rojo)} />
          <Limon x={420} y={560} s={1.1} rot={-30} aprieta={Math.max(0, Math.sin((T - K.Li) * 8)) * kprog(T, K.Li + 0.2, K.Li + 0.4)} />
          <Goteo T={T} x={440} y0={640} y1={680} cada={0.25} color="#e3f59a" desde={K.Li + 0.3} hasta={K.Li + 2.2} />
          <Burbujas T={T} x={420} y={700} w={240} h={420} n={14} f={rojo} color="rgba(255,255,255,.5)" vel={90} />
        </SvgCapa>
      </Escena>
      {/* 3 · bicarbonato → azul */}
      <Escena T={T} a={K.Bi} b={K.Fo}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Vaso T={T} x={540} y={1180} s={1.25} color={mixHex(MORADO, colorPH(8.3), azul)} />
          <g transform={`translate(640 560) rotate(${klerp(0, -35, kprog(T, K.Bi + 0.2, K.Bi + 0.6))})`}>
            <rect x={-220} y={-14} width={220} height={28} rx={14} fill="#c3cbd3" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={-240} cy={0} rx={60} ry={34} fill="#c3cbd3" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={-240} cy={-8} rx={44} ry={18} fill="#fff" opacity={1 - kprog(T, K.Bi + 0.6, K.Bi + 1.6)} />
          </g>
          {Array.from({ length: 30 }, (_, i) => { const t0 = K.Bi + 0.5 + (i % 10) * 0.08, u = kprog(T, t0, t0 + 0.8); return u > 0 && u < 1 ? <circle key={i} cx={380 + ((i * 37) % 70)} cy={klerp(600, 760, u)} r={5} fill="#fff" stroke={KC.ink} strokeWidth={1.5} /> : null; })}
          <Burbujas T={T} x={420} y={700} w={240} h={420} n={20} f={azul} color="rgba(255,255,255,.6)" vel={120} />
        </SvgCapa>
      </Escena>
      {/* 4 · la molécula cambia de forma */}
      <Escena T={T} a={K.Fo} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Antocianina x={480} y={880} s={1.6} T={T} color={colorPH(phF)} forma={phF < 4 ? 0 : phF < 10 ? 1 : 1 + kprog(phF, 10, 11.8)} />
          {phF < 4.2 && <Atomo x={klerp(900, 600, kprog(T, K.Fo + 0.6, K.Fo + 1.6))} y={650} r={34} color={KC.coral} letra="H⁺" tam={26} />}
          {phF > 6.6 && <Atomo x={klerp(560, 940, kprog(T, K.Fo + 3.2, K.Fo + 4.2))} y={650} r={34} color={KC.coral} letra="H⁺" tam={26} />}
        </SvgCapa>
        <Medidor T={T} at={K.Fo + 0.3} until={K.Es - 0.2} valor={(t) => (phF - 1) / 13} etiqueta="pH" texto={() => phF.toFixed(1)} y={1480} color={colorPH(phF)} />
      </Escena>
      {/* 5 · la escala completa */}
      <Escena T={T} a={K.Es} b={K.Pr}>
        <FondoLunares color="#f4efe4" punto="rgba(0,0,0,.06)" />
        <SvgCapa><g transform="translate(0 -130)">
          {tubos.map(([ph, et], i) => { const x = 150 + i * 156, on = phE >= ph - 0.4 ? 1 : 0.15; return <g key={i}>
            <rect x={x - 44} y={620} width={88} height={460} rx={44} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={7} />
            <rect x={x - 36} y={klerp(1070, 760, on)} width={72} height={klerp(0, 310, on)} rx={34} fill={colorPH(ph)} />
          </g>; })}
          <defs><linearGradient id="phbar">{PH_STOPS.map(([p, c]) => <stop key={p} offset={`${((p - 1) / 13) * 100}%`} stopColor={c} />)}</linearGradient></defs>
          <rect x={100} y={1120} width={880} height={50} rx={25} fill="url(#phbar)" stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(${100 + ((phE - 1) / 13) * 880} 1145)`}><path d="M 0 -50 L -22 -84 L 22 -84 Z" fill={KC.ink} /><circle r={30} fill="none" stroke={KC.ink} strokeWidth={8} /></g>
          {['1', '7', '14'].map((t, i) => <text key={t} x={[110, 540, 970][i]} y={1210} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
        </g></SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Et} zoom={0.1}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7–8 · el estudio: película para pescado */}
      <Escena T={T} a={K.Et} b={K.Ja}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={150} y={900} width={780} height={300} rx={30} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
          <Pescado x={540} y={1050} s={1.25} T={T} />
          <rect x={170} y={920} width={740} height={260} rx={24} fill="rgba(255,255,255,.25)" stroke="rgba(0,0,0,.35)" strokeWidth={4} opacity={kprog(T, K.Et + 1.5, K.Et + 2.5)} />
          <rect x={740} y={950} width={130} height={90} rx={14} fill={colorPH(klerp(2.5, 8, dias))} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Et + 2.2, K.Et + 2.8)} />
          {dias > 0 && [0, 1, 2, 3].map((i) => <path key={i} d={`M ${330 + i * 90} ${880 - ((T * 60 + i * 30) % 120)} q 18 -20 0 -40 q -18 -20 0 -40`} stroke="#7a8f3a" strokeWidth={8} fill="none" opacity={dias * 0.8} />)}
        </SvgCapa>
        <Contador T={T} at={K.Pe + 0.3} desde={0} hasta={9} dur={5.5} sufijo=" días · 4 °C" x={540} y={1620} tam={72} color={KC.ink} />
      </Escena>
      {/* 9 · lo curioso: jamaica y pollo */}
      <Escena T={T} a={K.Ja} b={K.Ca}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <FlorJamaica x={250} y={780} s={1.2} rot={T * 10} />
          <Vaso T={T} x={250} y={1180} s={0.75} color="#9e0f2a" hielo={1} />
          <Pollo x={700} y={1020} s={1.2} />
          <rect x={620} y={930} width={130} height={90} rx={14} fill={mixHex('#d81b3c', '#4b2a8f', pollo)} stroke={KC.ink} strokeWidth={6} />
        </SvgCapa>
      </Escena>
      {/* 10 · pruébalo en casa */}
      <Escena T={T} a={K.Ca} b={K.Ci}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Licuadora x={220} y={1050} s={0.9} T={T} on={kprog(T, K.Ca + 0.3, K.Ca + 0.6) * (1 - kprog(T, K.Ca + 1.6, K.Ca + 1.9))} />
          <g opacity={kprog(T, K.Ca + 1.6, K.Ca + 2.0)}><Vaso T={T} x={600} y={1180} s={0.8} color={mixHex(MORADO, colorPH(2), kprog(T, K.Ca + 2.4, K.Ca + 3.2))} /><Vaso T={T} x={880} y={1180} s={0.8} color={mixHex(MORADO, colorPH(8.3), kprog(T, K.Ca + 3.0, K.Ca + 3.8))} /></g>
          <Limon x={600} y={720} s={0.55} rot={-20} />
          <g transform="translate(880 720)"><rect x={-60} y={-70} width={120} height={140} rx={14} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} /><text y={10} textAnchor="middle" style={{ font:`400 26px ${KF.titulo}` }} fill={KC.ink}>BICARBONATO</text></g>
        </SvgCapa>
      </Escena>
      {/* 11 · cierre: el vaso del inicio se reparte en la escala */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {[1.5, 4, 6.5, 8, 10.5, 13.5].map((ph, i) => { const u = kprog(T, K.Ci + 0.8 + i * 0.12, K.Ci + 1.6 + i * 0.12, kEase.sale); const x = klerp(380, 130 + i * 164, u);
            return <Vaso key={i} T={T} x={x} y={1180} s={klerp(1.25, 0.62, u)} color={u > 0.05 ? colorPH(ph) : MORADO} hielo={i === 0 ? 1 - u : 0} />; })}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.1} tacharEn={K.G + 1.5} until={K.G + 2.6} texto="¿agua de jamaica?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.8} until={K.Pi - 0.3} texto="jugo de col morada" x={330} y={470} tam={44} borde={KC.lilac} />
      <NumeroGigante T={T} at={K.Pi + 1.6} until={K.Li - 0.3} valor={30} dur={1.0} sufijo="+" etiqueta="antocianinas" x={540} y={1560} tam={130} color={KC.yellow} />
      <Etq T={T} at={K.Li + 0.3} until={K.Bi - 0.3} x={60} y={1480} texto="limón = ácido" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Li + 1.8} until={K.Bi - 0.3} texto="→ rojo" x={540} y={1640} tam={50} borde={colorPH(2)} />
      <Etq T={T} at={K.Bi + 0.3} until={K.Fo - 0.3} x={60} y={1480} texto="bicarbonato = básico" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Bi + 1.8} until={K.Fo - 0.3} texto="→ azul" x={540} y={1640} tam={50} borde={colorPH(8.3)} />
      <Chip T={T} at={K.Fo + 0.3} until={K.Es - 0.3} texto="cambia la forma → cambia el color" y={1650} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.Es + 0.2} until={K.Pr - 0.3} texto="la escala del jugo de col" y={470} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.Es + 0.5} until={K.Pr - 0.3} x={110} y={1480} texto="ácido ← · → básico" tam={36} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.Pe - 0.2} anio="2026" quien="Dong et al. · Ningbo, China" revista="Food Chemistry: X · película de empaque" y={620} />
      <Chip T={T} at={K.Pe + 0.4} until={K.Ja - 0.3} texto="se echa a perder → compuestos básicos" y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Pe + 2.0} until={K.Ja - 0.3} x={1000} y={1480} texto="la etiqueta cambia de color" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ja + 0.4} until={K.Ca - 0.3} texto="jamaica · Hibiscus sabdariffa" x={540} y={1640} tam={38} borde="#9e0f2a" />
      <Etq T={T} at={K.Ja + 2.4} until={K.Ca - 0.3} x={1000} y={1480} texto="2026 · Vietnam · pollo" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.2} until={K.Ci - 0.3} texto="licúa · cuela · limón o bicarbonato" y={1500} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="un laboratorio de pH en un vaso" y={1500} tam={40} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pi - 0.1} texto="No es jamaica: *es col morada.*" />
      <Subtitulo T={T} idx={1} at={K.Pi + 0.1} until={K.Li - 0.1} texto="Su color: *antocianinas.*" />
      <Subtitulo T={T} idx={2} at={K.Li + 0.1} until={K.Bi - 0.1} texto="Con limón *se pone roja.*" />
      <Subtitulo T={T} idx={3} at={K.Bi + 0.1} until={K.Fo - 0.1} texto="Con bicarbonato *se pone azul.*" />
      <Subtitulo T={T} idx={4} at={K.Fo + 0.1} until={K.Es - 0.1} texto="Otra forma: *otro color.*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Pr - 0.1} texto="Rojo, violeta, azul, *verde, amarillo.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Et - 0.1} texto="¿Y eso *de qué sirve?*" />
      <Subtitulo T={T} idx={7} at={K.Et + 0.1} until={K.Pe - 0.1} texto="Película de empaque *para pescado.*" />
      <Subtitulo T={T} idx={8} at={K.Pe + 0.1} until={K.Ja - 0.1} texto="Si se echa a perder, *cambia de color.*" />
      <Subtitulo T={T} idx={9} at={K.Ja + 0.1} until={K.Ca - 0.1} texto="La jamaica *también.*" />
      <Subtitulo T={T} idx={10} at={K.Ca + 0.1} until={K.Ci - 0.1} texto="*Pruébalo* en tu cocina." />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Un laboratorio de pH *en un vaso.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Pigmento + 1.0, CUES.Pigmento + 4.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Limon + 0.7, CUES.Forma - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Forma + 1.0, CUES.Escala - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.0, CUES.Pescado - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Jamaica + 0.8, CUES.Casa - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Casa + 0.8, CUES.Cierre - 0.3, 'avatar_02_apuntando_camara', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_01_riendo_lengua', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="04" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ColApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Col /></CompositionStage></div>;
}
window.ColApp = ColApp;
