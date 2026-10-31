// Shot Biotecnológico #26 · La papaya que se defendió con un pedacito del virus (PRSV, Rainbow) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PV = { verde:'#3fae4a', verdeOsc:'#1f7a35', hoja:'#4cc35a', hojaOsc:'#2b8f3d', tronco:'#b9b08f', troncoOsc:'#8a8166',
  piel:'#8fd14f', pielMad:'#ffc23a', pulpa:'#ffb21f', pulpaRoja:'#ff7a4d', semilla:'#1a1410', anillo:'#2f6b1e', virus:'#ff4fa0', arn:'#ffe11a', gen:'#F4C25A' };

// Capa SVG de pantalla completa.
function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Hoja de papayo: palmeada, 7 lóbulos hondos con su nervadura; enferma = mosaico amarillo y lóbulos encogidos.
function HojaPapaya({ x = 0, y = 0, s = 1, rot = 0, enferma = 0, T = 0, seed = 1 }) {
  const lob = [-75, -50, -25, 0, 25, 50, 75];
  const col = mixHex(PV.hoja, '#d9d23a', enferma * 0.75);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.6) * 4}) scale(${s})`}>
    {lob.map((a, i) => { const L = (i === 3 ? 150 : i === 2 || i === 4 ? 135 : i === 1 || i === 5 ? 110 : 80) * (1 - enferma * 0.18), w = 34 * (1 - enferma * 0.3);
      return <g key={i} transform={`rotate(${a - 90})`}>
        <path d={`M 0 0 C ${w} ${-L * 0.3} ${w * 1.3} ${-L * 0.7} ${w * 0.3} ${-L} L 0 ${-L * 0.86} L ${-w * 0.3} ${-L} C ${-w * 1.3} ${-L * 0.7} ${-w} ${-L * 0.3} 0 0 Z`}
          fill={col} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        <line x1={0} y1={0} x2={0} y2={-L * 0.86} stroke={PV.hojaOsc} strokeWidth={4} />
        {[0.35, 0.6].map((u, k) => <g key={k}><line x1={0} y1={-L * u} x2={w * 0.7} y2={-L * (u + 0.12)} stroke={PV.hojaOsc} strokeWidth={3} /><line x1={0} y1={-L * u} x2={-w * 0.7} y2={-L * (u + 0.12)} stroke={PV.hojaOsc} strokeWidth={3} /></g>)}
        {enferma > 0 && [0.3, 0.55, 0.78].map((u, k) => <circle key={'m' + k} cx={(k - 1) * w * 0.4} cy={-L * u} r={w * 0.28} fill="#f4ef6a" opacity={enferma * 0.85} />)}
      </g>; })}
  </g>;
}

// Fruto de papaya entero (oblongo, piriforme), colgado del pico. maduro 0..1, anillos 0..1 (manchas anulares de la PRSV), brilloGen = hebra dorada adentro.
function Papaya({ x = 0, y = 0, s = 1, rot = 0, maduro = 0.6, anillos = 0, brilloGen = 0, T = 0 }) {
  const piel = mixHex(PV.piel, PV.pielMad, maduro);
  const R = krng(11);
  const an = Array.from({ length: 9 }, () => [(R() - 0.5) * 120, -150 + R() * 300, 14 + R() * 16]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-232} width={28} height={40} rx={8} fill={PV.troncoOsc} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -200 C 70 -200 105 -120 108 -20 C 112 110 80 210 0 215 C -80 210 -112 110 -108 -20 C -105 -120 -70 -200 0 -200 Z" fill={piel} stroke={KC.ink} strokeWidth={9} />
    {[-50, 0, 50].map((dx, i) => <path key={i} d={`M ${dx * 0.4} -190 Q ${dx * 1.2} 0 ${dx * 0.5} 205`} stroke="rgba(0,0,0,.12)" strokeWidth={6} fill="none" />)}
    <path d="M -62 -120 Q -84 -20 -66 80" stroke="rgba(255,255,255,.55)" strokeWidth={16} fill="none" strokeLinecap="round" />
    {anillos > 0 && an.map(([ax, ay, r], i) => { const q = kclamp(anillos * 9 - i, 0, 1); return q > 0 ? <g key={i} opacity={q}>
      <circle cx={ax} cy={ay} r={r * q} fill="none" stroke={PV.anillo} strokeWidth={6} />
      <circle cx={ax} cy={ay} r={r * 0.45 * q} fill="none" stroke={PV.anillo} strokeWidth={4} /></g> : null; })}
    {brilloGen > 0 && <g opacity={brilloGen}>
      <ellipse cx={0} cy={10} rx={60} ry={120} fill="rgba(244,194,90,.25)" />
      <path d={`M -30 -40 q 15 ${-20 + Math.sin(T * 4) * 8} 30 0 t 30 0`} stroke={PV.gen} strokeWidth={10} fill="none" strokeLinecap="round" transform="translate(0 20)" />
    </g>}
  </g>;
}

// Papaya partida a lo largo: pulpa (amarilla en Rainbow), cavidad con semillas negras.
function PapayaAbierta({ x = 0, y = 0, s = 1, pulpa = PV.pulpa, T = 0 }) {
  const R = krng(4);
  const sem = Array.from({ length: 34 }, () => [(R() - 0.5) * 70, -90 + R() * 210, 9 + R() * 5]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -200 C 70 -200 105 -120 108 -20 C 112 110 80 210 0 215 C -80 210 -112 110 -108 -20 C -105 -120 -70 -200 0 -200 Z" fill={PV.pielMad} stroke={KC.ink} strokeWidth={9} />
    <path d="M 0 -180 C 58 -180 88 -110 90 -20 C 94 100 66 192 0 196 C -66 192 -94 100 -90 -20 C -88 -110 -58 -180 0 -180 Z" fill={pulpa} />
    <path d="M 0 -110 C 34 -110 50 -40 50 30 C 50 110 30 150 0 152 C -30 150 -50 110 -50 30 C -50 -40 -34 -110 0 -110 Z" fill="#f7d98a" stroke="rgba(0,0,0,.25)" strokeWidth={4} />
    {sem.map(([sx, sy, r], i) => <ellipse key={i} cx={sx * (1 - Math.abs(sy) / 300)} cy={sy} rx={r} ry={r * 1.1} fill={PV.semilla} stroke="#3d342b" strokeWidth={2} transform={`rotate(${i * 23} ${sx} ${sy})`} />)}
  </g>;
}

// Papayo: tronco recto sin ramas con cicatrices de hojas, corona de hojas palmeadas en pecíolos largos y frutos pegados al tronco.
function Papayo({ x = 0, y = 0, s = 1, enferma = 0, anillos = 0, frutos = 5, maduro = 0.3, brilloGen = 0, T = 0, seed = 2 }) {
  const pec = [[-150, -40], [-115, -70], [-70, -95], [-25, -105], [25, -105], [70, -95], [115, -70], [150, -40], [-170, 20], [170, 20]];
  const caida = enferma * 25;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 0 L -24 -560 L 24 -560 L 34 0 Z" fill={PV.tronco} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -18 ${-60 - i * 55} l 18 -14 l 18 14`} stroke={PV.troncoOsc} strokeWidth={6} fill="none" />)}
    {pec.map(([a, l], i) => { const ang = (a / 170) * 70 + mece(T, seed + i, 0.4) * 3 + (a > 0 ? caida : -caida) * 0.5, L = 240 - Math.abs(l) * 0.3;
      const ex = Math.sin(ang * Math.PI / 180) * L, ey = -600 - Math.cos(ang * Math.PI / 180) * L * 0.75 + caida * 2;
      return <g key={i}><line x1={0} y1={-575} x2={ex} y2={ey} stroke={mixHex('#9ccf5a', '#d6c84a', enferma)} strokeWidth={10} strokeLinecap="round" />
        <line x1={0} y1={-575} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={2} opacity=".4" />
        <HojaPapaya x={ex} y={ey} s={0.62} rot={ang} enferma={enferma} T={T} seed={seed + i} /></g>; })}
    {Array.from({ length: frutos }, (_, i) => { const fx = [-46, 46, -40, 40, 0][i], fy = [-430, -440, -330, -340, -380][i];
      return <Papaya key={i} x={fx} y={fy} s={0.36} rot={fx > 0 ? -8 : 8} maduro={maduro + (i % 2) * 0.15} anillos={anillos} brilloGen={brilloGen} T={T} />; })}
  </g>;
}

// Pulgón alado (forma que dispersa el virus): cuerpo de pera, antenas largas, 6 patas, dos sifones atrás y estilete.
function Pulgon({ x = 0, y = 0, s = 1, rot = 0, T = 0, alas = 1, estilete = 0 }) {
  const aleteo = alas ? Math.sin(T * 60) * 18 : 0;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((k) => <ellipse key={k} cx={-10} cy={-40} rx={70} ry={22} fill="rgba(220,240,255,.65)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${k * (20 + aleteo) - 15} 0 -20)`} />)}
    {[-30, 0, 30].map((dx, i) => <g key={i} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round">
      <path d={`M ${dx} 18 l ${-14 + i * 6} 30 l -10 18`} /><path d={`M ${dx} 18 l ${14 + i * 4} 32 l 10 16`} opacity=".7" /></g>)}
    <path d="M -60 0 C -60 -38 10 -44 52 -16 C 70 -2 70 20 50 28 C 10 44 -60 38 -60 0 Z" fill="#7cc94a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={62} cy={4} rx={24} ry={20} fill="#6ab33d" stroke={KC.ink} strokeWidth={5} />
    <circle cx={72} cy={-2} r={5} fill={KC.ink} />
    <path d="M 74 -12 q 40 -60 90 -50 M 70 -14 q 30 -70 70 -80" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M -40 -22 l -26 -24 M -50 -6 l -30 -18" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <line x1={70} y1={20} x2={70 + estilete * 10} y2={20 + estilete * 46} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
  </g>;
}

// Virus de la mancha anular de la papaya: filamento flexible (760–800 nm × 12 nm) con su cubierta de proteína y el ARN adentro.
// p0..p1: tramo resaltado (gen de la cubierta) · corte 0..1: el ARN se parte en pedazos.
function VirusPRSV({ x = 0, y = 0, largo = 700, grueso = 34, T = 0, ondas = 1.5, resalta = 0, corte = 0, arn = 1, seed = 1, o = 1 }) {
  const n = 40, pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n; pts.push([x + u * largo, y + Math.sin(u * Math.PI * 2 * ondas + T * 1.3 + seed) * largo * 0.06]); }
  const path = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  if (corte > 0) {
    return <g opacity={o * (1 - kprog(corte, 0.7, 1))}>{Array.from({ length: 8 }, (_, k) => { const a = pts[k * 5], b = pts[k * 5 + 4], d = corte * 60;
      return <line key={k} x1={a[0]} y1={a[1] + (k % 2 ? d : -d)} x2={b[0]} y2={b[1] + (k % 2 ? d : -d) * 0.6} stroke={PV.arn} strokeWidth={8} strokeLinecap="round" transform={`rotate(${corte * (k % 2 ? 30 : -30)} ${a[0]} ${a[1]})`} />; })}</g>;
  }
  return <g opacity={o}>
    <path d={path} stroke={KC.ink} strokeWidth={grueso + 10} fill="none" strokeLinecap="round" />
    <path d={path} stroke={PV.virus} strokeWidth={grueso} fill="none" strokeLinecap="round" />
    {pts.map((p, i) => i % 1 === 0 && i < n ? <ellipse key={i} cx={p[0]} cy={p[1]} rx={largo / n * 0.45} ry={grueso * 0.42} fill="#ff86c0" stroke="#b02a6c" strokeWidth={2} /> : null)}
    {arn > 0 && <path d={path} stroke={PV.arn} strokeWidth={5} fill="none" strokeDasharray="10 6" opacity={arn} />}
    {resalta > 0 && (() => { const i0 = Math.floor(n * 0.82), seg = 'M ' + pts.slice(i0).map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
      return <path d={seg} stroke={PV.gen} strokeWidth={grueso * 0.5} fill="none" strokeLinecap="round" opacity={resalta} style={{ filter:'drop-shadow(0 0 12px #F4C25A)' }} />; })()}
  </g>;
}

// Tijeras de la defensa (silenciamiento de ARN), esquemáticas: abren y cierran.
function Tijera({ x = 0, y = 0, s = 1, abre = 0.5, rot = 0, color = KC.lilac }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * a})`}>
      <path d="M 0 0 L 90 -10 Q 100 0 90 10 Z" fill="#e8f0ff" stroke={KC.ink} strokeWidth={5} transform={`scale(1 ${k})`} />
      <circle cx={-34} cy={k * 16} r={20} fill="none" stroke={color} strokeWidth={10} />
    </g>)}
    <circle r={7} fill={KC.ink} />
  </g>;
}

// Isla de Hawái (esquemática), con Puna en la punta este.
function IslaHawaii({ x = 0, y = 0, s = 1, puna = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -300 C 40 -320 120 -260 150 -180 C 190 -120 280 -90 300 -20 C 320 40 250 60 220 110 C 170 200 60 300 -40 310 C -110 320 -150 260 -170 180 C -200 80 -260 20 -240 -80 C -220 -180 -150 -290 -60 -300 Z"
      fill="#7fd06a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -40 -60 l 40 -60 l 40 60 Z M 40 40 l 34 -50 l 34 50 Z" fill="#a98f6c" stroke={KC.ink} strokeWidth={5} />
    {puna > 0 && <g opacity={puna}>
      <circle cx={250} cy={10} r={50 + Math.sin(T * 6) * 10} fill="rgba(255,59,47,.35)" stroke={KC.red} strokeWidth={6} />
      <circle cx={250} cy={10} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}

// Pistola de genes (bombardeo con microbalines), esquemática, y placa con grupitos de células de papaya.
function PistolaGenes({ x = 0, y = 0, s = 1, T = 0, disparo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-260} width={300} height={360} rx={30} fill="#cfd8e0" stroke={KC.ink} strokeWidth={10} />
    <rect x={-110} y={-220} width={220} height={260} rx={18} fill="rgba(180,230,255,.45)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-300} width={80} height={60} rx={12} fill="#6f7a84" stroke={KC.ink} strokeWidth={8} />
    <circle cx={110} cy={70} r={14} fill={disparo > 0 && disparo < 1 ? KC.red : '#47525c'} stroke={KC.ink} strokeWidth={4} />
    <line x1={-60} y1={-200} x2={60} y2={-200} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function PlacaCelulas({ x = 0, y = 0, s = 1, T = 0, brillo = 0 }) {
  const R = krng(9);
  const cl = Array.from({ length: 7 }, () => [(R() - 0.5) * 220, (R() - 0.5) * 50]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={150} ry={46} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    {cl.map(([cx, cy], i) => <g key={i}>{[0, 1, 2, 3].map((k) => <circle key={k} cx={cx + (k % 2) * 16 - 8} cy={cy + Math.floor(k / 2) * 12 - 6} r={10} fill={mixHex('#e9f2b0', PV.gen, brillo * (i % 2))} stroke={KC.ink} strokeWidth={3} />)}</g>)}
  </g>;
}

// Llave (el gen) y cerradura (el virus): encaja si se parecen.
function Cerradura({ x = 0, y = 0, s = 1, nombre, ok, abierto = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M -50 -40 L -50 ${-90 - abierto * 30} A 50 50 0 0 1 50 ${-90 - abierto * 30} L 50 -40`} stroke="#9aa4ae" strokeWidth={22} fill="none" />
    <rect x={-80} y={-50} width={160} height={140} rx={22} fill={ok ? KC.mint : '#ffb0a8'} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={0} r={18} fill={KC.ink} /><rect x={-8} y={0} width={16} height={46} fill={KC.ink} />
    <text x={0} y={140} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
  </g>;
}
function Marca2({ x, y, ok = true, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.5, 1, o)})`} opacity={o}>
    <circle r={48} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={7} />
    {ok ? <path d="M -24 0 L -6 18 L 26 -18" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -20 -20 L 20 20 M 20 -20 L -20 20" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />}
  </g>;
}
// Barra de escala (escenas microscópicas).
function BarraEscala({ x = 80, y = 1440, ancho = 300, texto, color = KC.texto }) {
  return <g>
    <line x1={x} y1={y} x2={x + ancho} y2={y} stroke={color} strokeWidth={8} />
    <line x1={x} y1={y - 16} x2={x} y2={y + 16} stroke={color} strokeWidth={6} /><line x1={x + ancho} y1={y - 16} x2={x + ancho} y2={y + 16} stroke={color} strokeWidth={6} />
    <text x={x + ancho / 2} y={y - 24} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={color}>{texto}</text>
  </g>;
}

function Papaya26() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Llega, Pu: CUES.Pulgon, D: CUES.Dano, Ca: CUES.Caida, Pr: CUES.Pregunta, Ge: CUES.Gen, Di: CUES.Disparo,
    Si: CUES.Silencio, Es: CUES.Estudio, Ra: CUES.Rainbow, Me: CUES.Medida, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mx = K.Me + 4.2;                                  // «…se enferma.» → «Y el virus también está en México»
  const vuelo = kprog(T, K.Pu + 0.2, K.Pu + 1.3, kEase.suave), pica = kprog(T, K.Pu + 1.3, K.Pu + 1.6) * (1 - kprog(T, K.Pu + 2.3, K.Pu + 2.5)), seVa = kprog(T, K.Pu + 2.5, K.Pu + 3.2, kEase.suave);
  const azucar = 1 - 0.5 * kprog(T, K.D + 2.2, K.D + 3.6, kEase.suave);
  const barra = kprog(T, K.Ca + 0.4, K.Ca + 1.4, kEase.sale), barra2 = kprog(T, K.Ca + 1.4, K.Ca + 2.6, kEase.sale);
  const disparo = kprog(T, K.Di + 1.0, K.Di + 2.0);
  // árboles del ensayo de 1995: bloque central con el gen, matriz alrededor (~9 de cada 10 enferman) y fila de control (todas)
  const filas = 6, cols = 6, arbol = [];
  for (let r = 0; r < filas; r++) for (let c = 0; c < cols; c++) {
    const centro = r >= 1 && r <= 3 && c >= 2 && c <= 3, control = r === 5;
    const tipo = centro ? 'gen' : control ? 'control' : 'matriz';
    const idx = r * cols + c, sano = tipo === 'gen' || (tipo === 'matriz' && (idx === 7 || idx === 22));   // 2 de 22 de la matriz siguen sanos (≈ 9 de cada 10 enferman)
    arbol.push({ x: 190 + c * 140, y: 640 + r * 108, tipo, sano, t0: K.Es + 1.2 + ((idx * 7) % 13) * 0.18 });
  }
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el papayo y su papaya; el insecticida se tacha */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <ellipse cx={330} cy={1185} rx={230} ry={36} fill="rgba(0,0,0,.15)" />
          <Papayo x={330} y={1190} s={0.92} T={T} maduro={0.5} brilloGen={kprog(T, K.G + 2.2, K.G + 3.2)} />
          <Papaya x={760} y={1010} s={0.95 + 0.03 * Math.sin(T * 3)} rot={-10 + Math.sin(T * 2) * 6} maduro={0.75} brilloGen={kprog(T, K.G + 2.2, K.G + 3.2)} T={T} />
        </Capa>
      </Escena>
      {/* 1 · llega el virus a Puna, 1992 */}
      <Escena T={T} a={K.L} b={K.Pu}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <IslaHawaii x={520} y={740} s={1.0} puna={kprog(T, K.L + 0.8, K.L + 1.3)} T={T} />
          {[0, 1, 2, 3].map((i) => <Papayo key={i} x={180 + i * 240} y={1200} s={0.3} T={T} seed={i + 3} enferma={kprog(T, K.L + 1.4 + i * 0.3, K.L + 3.2)} />)}
        </Capa>
      </Escena>
      {/* 2 · el pulgón pica unos segundos y pasa el virus */}
      <Escena T={T} a={K.Pu} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <HojaPapaya x={250} y={1150} s={2.3} rot={-20} enferma={0.9} T={T} seed={1} />
          <HojaPapaya x={820} y={1170} s={2.3} rot={20} enferma={kprog(T, K.Pu + 2.4, K.Pu + 3.2) * 0.4} T={T} seed={2} />
          <Pulgon x={klerp(220, 760, vuelo) + seVa * 400} y={klerp(780, 880, vuelo) - Math.sin(vuelo * Math.PI) * 160 - seVa * 300} s={2} T={T} alas={pica > 0.5 ? 0 : 1} estilete={pica} rot={-8} />
          {pica > 0 && [0, 1, 2].map((k) => <path key={k} d={`M ${900 + k * 18} ${960 + k * 14} q 10 ${10 + Math.sin(T * 8 + k) * 6} 26 ${16}`} stroke={PV.virus} strokeWidth={6} fill="none" strokeLinecap="round" opacity={pica} />)}
          
        </Capa>
      </Escena>
      {/* 3 · daño: anillos en el fruto y azúcar que baja */}
      <Escena T={T} a={K.D} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Papaya x={420} y={900} s={1.55} rot={6} maduro={0.45} anillos={kprog(T, K.D + 0.2, K.D + 2.0)} T={T} />
          <HojaPapaya x={860} y={760} s={0.9} rot={30} enferma={1} T={T} seed={5} />
          <g transform="translate(860 1080)">
            <rect x={-60} y={-260} width={120} height={260} rx={18} fill="rgba(0,0,0,.35)" stroke={KC.ink} strokeWidth={7} />
            <rect x={-48} y={-248 + 236 * (1 - azucar)} width={96} height={236 * azucar} rx={12} fill={KC.yellow} />
            <text x={0} y={50} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>azúcar</text>
          </g>
        </Capa>
      </Escena>
      {/* 4 · la caída: 55.8 → 35.7 millones de libras de papaya fresca (1992 → 1997) */}
      <Escena T={T} a={K.Ca} b={K.Pr}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <line x1={140} y1={1180} x2={980} y2={1180} stroke={KC.ink} strokeWidth={8} />
          {[[360, 55.8, '1992', barra, PV.verde], [720, 35.7, '1997', barra2, KC.red]].map(([bx, v, a, p, c], i) => { const h = 420 * (v / 55.8) * p;
            return <g key={i}><rect x={bx - 100} y={1180 - h} width={200} height={h} fill={c} stroke={KC.ink} strokeWidth={8} />
              <text x={bx} y={1240} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{a}</text>
              {p > 0.9 && <text x={bx} y={1160 - h} textAnchor="middle" style={{ font:`400 72px ${KF.titulo}` }} fill={KC.ink}>{kformato(v, 1)}</text>}
              <Papaya x={bx} y={1180 - h - 130} s={0.3 * p} maduro={0.8} /></g>; })}
          <text x={540} y={1440} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>millones de libras de papaya fresca · Hawái</text>
        </Capa>
      </Escena>
      {/* 5 · re-gancho: algo que no ves (virus de ~0.8 µm) */}
      <Escena T={T} a={K.Pr} b={K.Ge} zoom={0.08}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <text x={260} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 260 820)`}>?</text>
          <VirusPRSV x={90} y={1130} largo={420} grueso={20} T={T} o={kprog(T, K.Pr + 0.6, K.Pr + 1.2)} />
          <BarraEscala x={90} y={1460} ancho={420} texto="≈ 0.8 µm" />
        </Capa>
      </Escena>
      {/* 6 · el gen de la cubierta */}
      <Escena T={T} a={K.Ge} b={K.Di} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <VirusPRSV x={90} y={860} largo={900} grueso={46} T={T} resalta={kprog(T, K.Ge + 1.4, K.Ge + 2.0)} />
          {(() => { const sale = kprog(T, K.Ge + 2.4, K.Ge + 3.6, kEase.suave);
            return sale > 0 ? <g transform={`translate(${klerp(830, 540, sale)} ${klerp(860, 1080, sale)})`}>
              <path d="M -90 0 q 22 -24 45 0 t 45 0 t 45 0 t 45 0" stroke={PV.gen} strokeWidth={16} fill="none" strokeLinecap="round" style={{ filter:'drop-shadow(0 0 14px #F4C25A)' }} />
            </g> : null; })()}
          <BarraEscala x={90} y={1460} ancho={180} texto="≈ 160 nm" />
        </Capa>
      </Escena>
      {/* 7 · el disparo: microbalines con el gen entran a células de papaya */}
      <Escena T={T} a={K.Di} b={K.Si} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <PistolaGenes x={540} y={820} s={1.2} T={T} disparo={disparo} />
          <PlacaCelulas x={540} y={1110} s={1.6} T={T} brillo={kprog(T, K.Di + 1.8, K.Di + 2.6)} />
          {disparo > 0 && disparo < 1 && Array.from({ length: 16 }, (_, i) => { const u = kclamp(disparo * 1.6 - (i % 5) * 0.12, 0, 1), xx = 540 + ((i * 37) % 200) - 100;
            return u > 0 && u < 1 ? <circle key={i} cx={xx} cy={klerp(700, 1100, u)} r={9} fill={PV.gen} stroke={KC.ink} strokeWidth={3} /> : null; })}
          <text x={540} y={1650} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>células de papaya en cultivo</text>
        </Capa>
      </Escena>
      {/* 8 · por dentro: la planta lee el gen y corta el ARN parecido */}
      <Escena T={T} a={K.Si} b={K.Es} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <HojaPapaya x={540} y={1640} s={2.0} rot={0} T={T} seed={8} />
          <BarraEscala x={50} y={1470} ancho={150} texto="≈ 15 cm" color={KC.ink} />
        </Capa>
      </Escena>
      <Lupa T={T} at={K.Si + 0.2} until={K.Es - 0.3} x={540} y={760} r={330} fx={540} fy={1400} tinte={KC.mint} etiqueta="POR DENTRO · célula de la hoja" interior={(T2, r) => {
        const lee = kprog(T2, K.Si + 0.6, K.Si + 1.6), entra = kprog(T2, K.Si + 2.4, K.Si + 3.4, kEase.suave), corta = kprog(T2, K.Si + 3.5, K.Si + 4.6);
        return <svg width={2 * r} height={2 * r}>
          <rect width={2 * r} height={2 * r} fill="#0d2a1c" />
          <ellipse cx={r * 0.55} cy={r * 0.6} rx={r * 0.32} ry={r * 0.26} fill="#284a7a" stroke="#9ec8ff" strokeWidth={5} />
          <text x={r * 0.55} y={r * 0.25} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#9ec8ff">núcleo</text>
          <path d={`M ${r * 0.38} ${r * 0.62} q 30 -20 60 0 t 60 0`} stroke={PV.gen} strokeWidth={10} fill="none" strokeLinecap="round" />
          {[0, 1, 2].map((k) => { const u = kclamp(lee * 3 - k, 0, 1); return u > 0 ? <path key={k} d="M 0 0 q 15 -10 30 0 t 30 0" transform={`translate(${klerp(r * 0.6, r * 1.1 + k * 40, u)} ${klerp(r * 0.7, r * 0.95 + k * 50, u)})`} stroke={PV.gen} strokeWidth={6} fill="none" opacity={0.85} /> : null; })}
          {lee > 0.5 && [0, 1].map((k) => <g key={k} transform={`translate(${r * 1.25 + k * 120} ${r * 1.2 + k * 40})`}><Tijera s={0.7} abre={0.5 + 0.5 * Math.sin(T2 * 10 + k)} rot={-20 + k * 30} /></g>)}
          {corta < 1 && <g transform={`translate(${klerp(2 * r + 40, r * 0.7, entra)} ${r * 1.55})`}><VirusPRSV x={0} y={0} largo={360} grueso={18} T={T2} arn={1} o={1 - corta} /></g>}
          {corta > 0 && <g transform={`translate(${r * 0.7} ${r * 1.55})`}><VirusPRSV x={0} y={0} largo={360} grueso={18} T={T2} corte={Math.max(0.01, corta * 0.65)} /></g>}
          <text x={r} y={2 * r - 90} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>ARN del virus → en pedazos</text>
        </svg>; }} />
      {/* 9 · el ensayo de Puna, 1995 */}
      <Escena T={T} a={K.Es} b={K.Ra}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <rect x={440} y={680} width={300} height={350} rx={20} fill="rgba(47,224,168,.35)" stroke={KC.ink} strokeWidth={6} strokeDasharray="18 10" />
          <rect x={100} y={1150} width={880} height={90} rx={20} fill="rgba(255,59,47,.18)" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />
          {arbol.map((a, i) => <Papayo key={i} x={a.x} y={a.y + 40} s={0.15} T={T} seed={i} frutos={3} enferma={a.sano ? 0 : kprog(T, a.t0, a.t0 + 0.8)} anillos={a.sano ? 0 : kprog(T, a.t0, a.t0 + 0.8)} />)}
          <text x={590} y={668} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>con el gen</text>
          <text x={540} y={1282} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>control (sin el gen)</text>
        </Capa>
      </Escena>
      {/* 10 · Rainbow: pulpa amarilla y la mitad de los campos en cosecha (2000) */}
      <Escena T={T} a={K.Ra} b={K.Me} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <PapayaAbierta x={300} y={900} s={1.4} pulpa={PV.pulpa} T={T} />
          {(() => { const p = kprog(T, K.Ra + 2.6, K.Ra + 3.8, kEase.sale), a = p * Math.PI; const cx = 790, cy = 860, rr = 170;
            return <g opacity={kprog(T, K.Ra + 2.3, K.Ra + 2.7)}>
              <circle cx={cx} cy={cy} r={rr} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
              <path d={`M ${cx} ${cy} L ${cx} ${cy - rr} A ${rr} ${rr} 0 ${a > Math.PI ? 1 : 0} 1 ${cx + Math.sin(a) * rr} ${cy - Math.cos(a) * rr} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
              <text x={cx} y={cy + rr + 60} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>{Math.round(50 * p)} %</text>
            </g>; })()}
          <text x={790} y={1140} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ra + 3.0, K.Ra + 3.4)}>campos en cosecha · Hawái 2000</text>
        </Capa>
      </Escena>
      {/* 11 · a la medida: llave y cerraduras; luego México */}
      <Escena T={T} a={K.Me} b={mx}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          {[['Hawái', true, 220], ['Brasil', false, 540], ['Tailandia', false, 860]].map(([n, ok, cx], i) => { const t0 = K.Me + 0.6 + i * 0.9, ll = kprog(T, t0, t0 + 0.5, kEase.sale);
            return <g key={i}>
              <Cerradura x={cx} y={1000} s={1.15} nombre={n} ok={ok} abierto={ok ? kprog(T, t0 + 0.5, t0 + 0.8) : 0} />
              <g transform={`translate(${cx + 10} ${klerp(700, 860, ll)}) rotate(90)`} opacity={ll}>
                <circle cx={-60} cy={0} r={26} fill="none" stroke={PV.gen} strokeWidth={12} /><path d="M -34 0 L 40 0 M 20 0 l 0 16 M 34 0 l 0 12" stroke={PV.gen} strokeWidth={12} strokeLinecap="round" />
              </g>
              <Marca2 x={cx + 70} y={880} ok={ok} o={kprog(T, t0 + 0.5, t0 + 0.8)} />
            </g>; })}
          <text x={540} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>la llave = el gen de Hawái</text>
        </Capa>
      </Escena>
      <Escena T={T} a={mx} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <MapaMexico x={40} y={560} ancho={1000}>
            {(() => { const [vx, vy] = mxProy(-96.6, 19.0); return <g><circle cx={vx} cy={vy} r={22 + Math.sin(T * 6) * 5} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
              <text x={vx + 30} y={vy - 30} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Veracruz</text></g>; })()}
          </MapaMexico>
          <Papaya x={260} y={1110} s={0.55} rot={-10} maduro={0.4} anillos={kprog(T, mx + 0.4, mx + 1.6)} />
        </Capa>
      </Escena>
      {/* 12 · cierre: el papayo del inicio, sano y con la hebra dorada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <ellipse cx={330} cy={1185} rx={230} ry={36} fill="rgba(0,0,0,.15)" />
          <Papayo x={330} y={1190} s={0.92} T={T} maduro={0.7} brilloGen={1} />
          <Papaya x={760} y={1010} s={0.95} rot={-10 + Math.sin(T * 2) * 6} maduro={0.85} brilloGen={1} T={T} />
        </Capa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.G + 2.2} texto="¿insecticida?" x={540} y={1500} tam={46} />
      <Chip T={T} at={K.G + 2.4} until={K.L - 0.3} texto="un gen del virus" x={760} y={1500} tam={42} borde={PV.gen} />
      <Chip T={T} at={K.L + 0.9} until={K.Pu - 0.3} texto="Puna, Hawái · 1992" y={1490} tam={44} borde={KC.red} />
      <Etq T={T} at={K.L + 1.0} until={K.Pu - 0.3} x={800} y={650} texto="Puna" lado="der" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Pu + 1.4} until={K.D - 0.3} texto="un piquete de segundos" y={1500} tam={42} borde={PV.virus} />
      <Etq T={T} at={K.D + 0.6} until={K.Ca - 0.3} x={560} y={600} texto="manchas en anillo" tam={34} color={KC.ink} />
      <Chip T={T} at={K.D + 2.4} until={K.Ca - 0.3} texto="puede bajar 50 % o más" x={540} y={1490} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 2.7} until={K.Pr - 0.2} texto="−36 % en 5 años" y={1520} tam={46} borde={KC.red} />
      <Etq T={T} at={K.Pr + 1.0} until={K.Ge - 0.2} x={520} y={1090} texto="virus de la mancha anular" tam={30} />
      <Chip T={T} at={K.Ge + 2.0} until={K.Di - 0.3} texto="gen de la cubierta del virus" y={1500} tam={40} borde={PV.gen} />
      <Etq T={T} at={K.Ge + 0.4} until={K.Ge + 2.0} x={500} y={760} texto="cubierta de proteína" tam={32} />
      <Etq T={T} at={K.Ge + 0.8} until={K.Ge + 2.2} x={500} y={970} texto="ARN" tam={32} color={PV.arn} />
      <Chip T={T} at={K.Di + 1.6} until={K.Si - 0.3} texto="bombardeo con microbalines" y={1520} tam={40} borde={PV.gen} />
      <Chip T={T} at={K.Si + 1.2} until={K.Es - 0.4} texto="silenciamiento de ARN" y={1520} tam={40} borde={KC.lilac} />
      <TarjetaEstudio T={T} at={K.Es + 0.1} until={K.Es + 2.9} anio="1995" quien="Puna, Hawái · ensayo de campo" revista="Ferreira et al. · Plant Disease (2002)" y={430} />
      <Chip T={T} at={K.Es + 3.1} until={K.Ra - 0.3} texto="control: 100 % enfermas · con el gen: 0" y={1500} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Ra + 0.2} until={K.Ra + 2.4} texto="1998 · sale Rainbow" y={1500} tam={46} borde={KC.orange} />
      <Etq T={T} at={K.Ra + 0.8} until={K.Me - 0.3} x={200} y={570} texto="pulpa amarilla" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Me + 3.6} until={mx - 0.2} texto="Rainbow: defensa a la medida" y={1500} tam={40} borde={PV.gen} />
      <Chip T={T} at={mx + 0.3} until={K.Ci - 0.3} texto="el virus también está en México" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="un pedacito del virus la defiende" x={540} y={1500} tam={38} borde={PV.gen} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="No fue insecticida: *un pedacito del virus.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.Pu - 0.1} texto="1992: el virus *llega a Puna.*" />
      <Subtitulo T={T} idx={2} at={K.Pu + 0.1} until={K.D - 0.1} texto="Lo cargan *pulgones.*" />
      <Subtitulo T={T} idx={3} at={K.D + 0.1} until={K.Ca - 0.1} texto="Anillos y *menos azúcar.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.Pr - 0.1} texto="Más de *un tercio menos.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ge - 0.1} texto="¿Contra algo *que no ves?*" />
      <Subtitulo T={T} idx={6} at={K.Ge + 0.1} until={K.Di - 0.1} texto="El gen *de la cubierta.*" />
      <Subtitulo T={T} idx={7} at={K.Di + 0.1} until={K.Si - 0.1} texto="Disparado *a sus células.*" />
      <Subtitulo T={T} idx={8} at={K.Si + 0.1} until={K.Es - 0.1} texto="Corta el *ARN del virus.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Ra - 0.1} texto="Con el gen: *ninguna enferma.*" />
      <Subtitulo T={T} idx={10} at={K.Ra + 0.1} until={K.Me - 0.1} texto="Rainbow: *la mitad de los campos.*" />
      <Subtitulo T={T} idx={11} at={K.Me + 0.1} until={K.Ci - 0.1} texto="A la medida: *solo el de Hawái.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La salvó *un pedacito del virus.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Pulgon + 0.3, CUES.Dano - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Caida + 0.4, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Gen + 1.0, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Disparo + 0.3, CUES.Silencio - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Estudio + 3.1, CUES.Rainbow - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Rainbow + 0.5, CUES.Medida - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Medida + 4.4, CUES.Cierre - 0.2, 'avatar_07_pensativo_puno', 'arriba-der'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="26" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PapayaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Papaya26 /></CompositionStage></div>;
}
window.PapayaApp = PapayaApp;
