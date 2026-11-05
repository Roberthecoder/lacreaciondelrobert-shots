// Shot Fungi Mati #73 · Este pasto no aguanta el calor solo: lo salva el virus de un hongo — NARRADO (gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md (Márquez et al. 2007, Science; Redman et al. 1999). El dibujo es esquemático.

const PX = { verde:'#2f9e44', verde2:'#56c95f', seco:'#c9a13c', seco2:'#e0c46a', tierra:'#6b4222', tierra2:'#4a2c14', hifa:'#f3d9a4', virus:'#ff4fa0', vapor:'rgba(255,255,255,.75)', jit:'#e8392c' };

// Mata de pasto (Dichanthelium, esquemático). Base en (x, y). salud 1 = verde y derecho · 0 = seco y doblado.
function Pasto({ T = 0, x, y, s = 1, salud = 1, seed = 1, n = 15, alto = 320 }) {
  const g = krng(seed);
  const hojas = Array.from({ length: n }, (_, i) => ({ dx: (i - (n - 1) / 2) * 9 + (g() - 0.5) * 8, h: alto * (0.55 + g() * 0.45), lado: i < n / 2 ? -1 : 1, abre: 0.4 + g() * 0.9, f: g() * 6 }));
  const col = mixHex(PX.verde, PX.seco, 1 - salud), col2 = mixHex(PX.verde2, PX.seco2, 1 - salud);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hojas.map((b, i) => {
      const mec = Math.sin(T * 1.6 + b.f) * 6 * (0.3 + salud);
      const tx = b.dx * 2.2 + b.lado * b.abre * b.h * (0.35 + (1 - salud) * 0.75) + mec;
      const ty = -b.h * (0.45 + 0.55 * salud) + (1 - salud) * b.h * 0.25;
      const cx = b.dx * 1.4 + b.lado * b.abre * 20, cy = -b.h * (0.7 - (1 - salud) * 0.25);
      return <path key={i} d={`M ${b.dx - 7} 0 Q ${cx} ${cy} ${tx} ${ty} Q ${cx + 8} ${cy + 4} ${b.dx + 7} 0 Z`} fill={i % 2 ? col : col2} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />;
    })}
    {[-3, 2, 5].map((k, i) => { const b = hojas[(k + n) % n]; const tx = b.dx * 2.2 + b.lado * b.abre * b.h * 0.35 * salud + Math.sin(T * 1.6 + b.f) * 6;
      return <g key={'p' + i} opacity={salud}>{[0, 1, 2, 3].map((q) => <circle key={q} cx={tx + q * 7 * b.lado} cy={-b.h * 0.95 - 14 - q * 12} r={6} fill={PX.seco2} stroke={KC.ink} strokeWidth={2.5} />)}</g>; })}
  </g>;
}
// Raíces bajo la mata.
function Raices({ x, y, s = 1, color = '#e9d3a8' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round">
    {[[-60, 120], [-25, 160], [10, 175], [45, 150], [75, 110], [-90, 80]].map(([a, b], i) => <path key={i} d={`M 0 0 Q ${a * 0.5} ${b * 0.4} ${a} ${b}`} />)}
  </g>;
}
// Franja de suelo con vapor que sube. y = superficie.
function Suelo({ T, y, h = 360, vapor = 1, color = PX.tierra, seed = 3 }) {
  const g = krng(seed);
  const granos = Array.from({ length: 70 }, () => [g() * KW, y + 20 + g() * (h - 30), 3 + g() * 6]);
  const humos = Array.from({ length: 9 }, (_, i) => ({ x: 60 + i * 120 + g() * 40, f: g() }));
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={h} fill={color} stroke={KC.ink} strokeWidth={8} />
    {granos.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={PX.tierra2} opacity=".6" />)}
    {vapor > 0 && humos.map((q, i) => { const u = ((T * 0.35 + q.f) % 1); const yy = y - u * 260;
      return <path key={'v' + i} d={`M ${q.x} ${yy} q 18 -30 0 -60 q -18 -30 0 -60`} stroke={PX.vapor} strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * Math.sin(u * Math.PI) * 0.8} />; })}
  </g>;
}
// Termómetro vertical. valor en °C (0..max). Bulbo en (x, y).
function Termo({ x, y, valor, max = 80, alto = 300, s = 1, texto = true, color = KC.red }) {
  const u = kclamp(valor / max, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-alto} width={44} height={alto} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-11} y={-alto * u - 6} width={22} height={alto * u + 10} rx={11} fill={color} />
    <circle r={38} fill={color} stroke={KC.ink} strokeWidth={6} />
    {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={-22} x2={-8} y1={-alto * k} y2={-alto * k} stroke={KC.ink} strokeWidth={4} />)}
    {texto && <text x={34} y={-alto * u + 12} style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink} stroke="#fff" strokeWidth={8} paintOrder="stroke">{Math.round(valor)} °C</text>}
  </g>;
}
// Hifa horizontal ondulada que crece (g 0..1), con septos y partículas de virus (virus 0..1 = cuántas se ven).
function Hifa({ T, x, y, largo = 700, g = 1, amp = 18, seed = 1, virus = 0, ancho = 26, color = PX.hifa, nv = 9, vColor = PX.virus }) {
  const N = 40, k = Math.max(1, Math.round(N * g));
  const pts = Array.from({ length: k + 1 }, (_, i) => { const u = i / N; return [x + u * largo, y + Math.sin(u * 7 + seed) * amp]; });
  const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const vis = Math.round(nv * virus);
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {pts.filter((_, i) => i % 8 === 4).map((p, i) => <line key={i} x1={p[0]} y1={p[1] - ancho / 2} x2={p[0]} y2={p[1] + ancho / 2} stroke={KC.ink} strokeWidth={3} opacity=".5" />)}
    {Array.from({ length: vis }, (_, i) => { const u = (i + 0.5) / nv; if (u > g) return null; const px = x + u * largo + Math.sin(T * 2 + i) * 4, py = y + Math.sin(u * 7 + seed) * amp + Math.cos(T * 2.4 + i * 2) * 4;
      return <circle key={'v' + i} cx={px} cy={py} r={7} fill={vColor} stroke={KC.ink} strokeWidth={2} />; })}
  </g>;
}
// Mata de jitomate. dobla 0..1 = se cae.
function Jitomate({ T = 0, x, y, s = 1, dobla = 0, seed = 2 }) {
  const r = dobla * 58 + Math.sin(T * 1.3 + seed) * 2;
  const col = mixHex(PX.verde, PX.seco, dobla * 0.8);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${r} 0 -60)`}>
      <path d="M 0 0 Q -8 -150 4 -300" stroke={col} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 0 0 Q -8 -150 4 -300" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" opacity=".0" />
      {[[-1, -110], [1, -170], [-1, -230], [1, -280]].map(([l, yy], i) => <g key={i} transform={`translate(0 ${yy}) rotate(${l * (35 + dobla * 25)})`}>
        <path d={`M 0 0 L ${l * 70} -10`} stroke={col} strokeWidth={8} />
        <ellipse cx={l * 55} cy={-18} rx={34} ry={18} fill={col} stroke={KC.ink} strokeWidth={4} transform={`rotate(${l * -20} ${l * 55} -18)`} />
        <ellipse cx={l * 92} cy={-8} rx={26} ry={14} fill={col} stroke={KC.ink} strokeWidth={4} />
      </g>)}
      {[[-30, -140], [26, -200], [-22, -250]].map(([a, b], i) => <g key={'t' + i}><circle cx={a} cy={b} r={26} fill={PX.jit} stroke={KC.ink} strokeWidth={5} /><path d={`M ${a - 10} ${b - 24} L ${a} ${b - 30} L ${a + 10} ${b - 24}`} stroke={PX.verde} strokeWidth={5} fill="none" /><circle cx={a - 8} cy={b - 8} r={6} fill="#fff" opacity=".5" /></g>)}
    </g>
  </g>;
}
// Partícula de virus grande (para el ícono del cierre).
function Virus({ x, y, r = 40 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={PX.virus} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return <circle key={i} cx={Math.cos(a) * r * 0.62} cy={Math.sin(a) * r * 0.62} r={r * 0.13} fill="#ffb3d6" />; })}
  </g>;
}
// Raíz en corte (por dentro): células alineadas. y = centro.
function RaizCorte({ y = 860, alto = 340 }) {
  const filas = 4, cols = 12, cw = KW / cols + 6, ch = alto / filas;
  return <g>
    <rect x={-20} y={y - alto / 2 - 20} width={KW + 40} height={alto + 40} fill="#2c4a2a" stroke="#5fae5a" strokeWidth={6} />
    {Array.from({ length: filas * cols }, (_, i) => { const c = i % cols, f = Math.floor(i / cols); const ox = (f % 2) * cw / 2;
      return <rect key={i} x={c * cw - ox - 10} y={y - alto / 2 + f * ch + 5} width={cw - 10} height={ch - 10} rx={18} fill="#3f6b3a" stroke="#79c46f" strokeWidth={3} opacity=".95" />; })}
  </g>;
}

function PastoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lugar, E: CUES.Endofito, S: CUES.Solos, J: CUES.Juntos, P: CUES.Pregunta, Es: CUES.Estudio, SV: CUES.SinVirus, CV: CUES.ConVirus, Ji: CUES.Jitomate, M: CUES.Mecanismo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const t65 = (a, b) => klerp(37, 65, kprog(T, a, b, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el pasto en el suelo humeante; la lupa deja ver el hongo y el virus */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo T={T} y={920} vapor={1} />
          <Raices x={420} y={922} s={1} />
          <Pasto T={T} x={420} y={922} s={1.05} seed={4} />
          <Termo x={150} y={1010} valor={klerp(30, 65, kprog(T, K.G, K.G + 2.2, kEase.sale))} />
        </>)}
        <Lupa T={T} at={K.G + 2.4} until={K.L - 0.2} x={790} y={760} r={190} fx={440} fy={1010} tinte={KC.pink} etiqueta="POR DENTRO · RAÍZ"
          interior={(TT, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1d3a1c" />
            {[0, 1, 2].map((f) => [0, 1, 2, 3].map((c) => <rect key={f + '-' + c} x={c * 100 - (f % 2) * 50 - 10} y={f * 130 + 6} width={90} height={118} rx={16} fill="#3f6b3a" stroke="#79c46f" strokeWidth={3} />))}
            <Hifa T={TT} x={10} y={r} largo={r * 2 - 20} g={kprog(TT, K.G + 2.6, K.G + 3.6)} amp={22} virus={kprog(TT, K.G + 3.3, K.G + 4.0)} nv={6} ancho={24} />
          </svg>} />
      </Escena>
      {/* 2 · Yellowstone: suelos termales */}
      <Escena T={T} a={K.L} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <path d="M -20 820 Q 200 700 420 780 Q 640 860 860 740 Q 980 690 1100 720 L 1100 1300 L -20 1300 Z" fill="#c9b48a" stroke={KC.ink} strokeWidth={8} />
          {[[300, 960, 150], [760, 1010, 120]].map(([a, b, r], i) => <g key={i}>
            <ellipse cx={a} cy={b} rx={r + 26} ry={(r + 26) * 0.32} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={a} cy={b} rx={r} ry={r * 0.32} fill="#3fd1e0" stroke={KC.ink} strokeWidth={5} />
            {[0, 1, 2].map((q) => { const u = (T * 0.4 + q / 3 + i * 0.2) % 1; return <circle key={q} cx={a - 30 + q * 30} cy={b - 30 - u * 220} r={26 + u * 40} fill="#fff" opacity={0.55 * Math.sin(u * Math.PI)} />; })}
          </g>)}
          {[[110, 1130, 0.5, 1], [520, 1140, 0.62, 2], [930, 1150, 0.5, 3], [600, 880, 0.38, 5]].map(([a, b, k, sd], i) =>
            <Pasto key={i} T={T} x={a} y={b} s={k * kprog(T, K.L + 0.3 + i * 0.25, K.L + 1.0 + i * 0.25, kEase.rebote)} seed={sd} />)}
          <Termo x={870} y={1110} s={0.7} valor={klerp(20, 70, kprog(T, K.L + 1.6, K.L + 3.2, kEase.sale))} />
        </>)}
      </Escena>
      {/* 3 · por dentro: el hongo endófito entre las células de la raíz */}
      <Escena T={T} a={K.E} b={K.S} zoom={0.07}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <RaizCorte y={880} alto={360} />
          <Hifa T={T} x={-20} y={800} largo={1120} g={kprog(T, K.E + 0.2, K.E + 2.2)} amp={30} seed={1} virus={kprog(T, K.E + 2.0, K.E + 3.0)} nv={12} />
          <Hifa T={T} x={-20} y={960} largo={1120} g={kprog(T, K.E + 0.8, K.E + 2.8)} amp={26} seed={3} virus={kprog(T, K.E + 2.4, K.E + 3.4)} nv={12} />
        </>)}
      </Escena>
      {/* 4 · solos: ni el pasto ni el hongo arriba de 38 °C */}
      <Escena T={T} a={K.S} b={K.J} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const m = kprog(T, K.S + 1.6, K.S + 3.0); return <>
            <rect x={60} y={880} width={420} height={150} rx={20} fill={PX.tierra} stroke={KC.ink} strokeWidth={7} />
            <Pasto T={T} x={270} y={882} s={0.8} salud={1 - m * 0.85} seed={6} />
            <Petri x={760} y={900} r={150}><Colonia cx={0} cy={0} r={klerp(30, 70, kprog(T, K.S, K.S + 1.4)) * (1 - m * 0.15)} color={mixHex('#f3e2c0', '#9a8f80', m)} seed={4} /></Petri>
            {[[270, 760], [760, 760]].map(([a, b], i) => { const x = kprog(T, K.S + 2.6 + i * 0.2, K.S + 3.0 + i * 0.2, kEase.rebote); return x > 0 &&
              <path key={i} d="M -60 -60 L 60 60 M 60 -60 L -60 60" transform={`translate(${a} ${b}) scale(${x})`} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />; })}
          </>; })()}
          <Termo x={520} y={1030} s={0.7} valor={klerp(25, 38, kprog(T, K.S + 0.4, K.S + 1.6))} />
        </>)}
      </Escena>
      {/* 5 · juntos: 65 °C, 10 h al día, 2 semanas */}
      <Escena T={T} a={K.J} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Suelo T={T} y={920} vapor={kprog(T, K.J + 0.3, K.J + 1.2)} />
          <Raices x={420} y={922} />
          <Pasto T={T} x={420} y={922} s={1.0} seed={4} />
          <Termo x={150} y={1010} valor={t65(K.J + 0.2, K.J + 1.4)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Pasto T={T} x={300} y={1180} s={1.1} seed={4} /><Interrogacion T={T} x={300} y={760} tam={380} /></>)}
      </Escena>
      {/* 7 · el estudio: le quitan el virus al hongo (congelado) */}
      <Escena T={T} a={K.Es} b={K.SV}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Hifa T={T} x={80} y={900} largo={920} g={1} amp={20} seed={2} virus={1 - kprog(T, K.Es + 3.6, K.Es + 4.8)} nv={10} />
          {T > K.Es + 2.6 && Array.from({ length: 22 }, (_, i) => { const u = ((T - K.Es - 2.6) * 0.5 + i / 22) % 1; const o = kprog(T, K.Es + 2.6, K.Es + 3.0) * (1 - kprog(T, K.Es + 5.0, K.Es + 5.6));
            return <text key={i} x={60 + (i * 47) % 960} y={720 + u * 380} style={{ font:`700 42px ${KF.mono}` }} fill="#bfe8ff" opacity={o * 0.85}>❄</text>; })}
          <rect x={80} y={1040} width={920} height={0} />
        </>)}
      </Escena>
      {/* 8 · sin virus: el pasto se seca */}
      <Escena T={T} a={K.SV} b={K.CV} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo T={T} y={920} vapor={1} />
          <Pasto T={T} x={420} y={922} s={1.0} seed={4} salud={1 - kprog(T, K.SV + 0.3, K.SV + 2.2, kEase.suave)} />
          <Termo x={150} y={1010} valor={65} />
        </>)}
      </Escena>
      {/* 9 · con el virus de vuelta: fusión de hifas */}
      <Escena T={T} a={K.CV} b={K.Ji}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {(() => { const f = kprog(T, K.CV + 0.3, K.CV + 1.4, kEase.sale), pasa = kprog(T, K.CV + 1.4, K.CV + 2.8);
            return <g>
              <Hifa T={T} x={60} y={klerp(640, 760, f)} largo={460} g={1} amp={14} seed={1} virus={1} nv={7} />
              <Hifa T={T} x={560} y={klerp(900, 790, f)} largo={460} g={1} amp={14} seed={4} virus={pasa} nv={7} />
              {f > 0.95 && <circle cx={545} cy={772} r={30 + Math.sin(T * 8) * 4} fill="none" stroke={KC.gold2} strokeWidth={6} />}
              {pasa > 0 && pasa < 1 && [0, 1, 2].map((q) => <circle key={q} cx={klerp(470, 640, (pasa * 3 + q * 0.33) % 1)} cy={780} r={8} fill={PX.virus} stroke={KC.ink} strokeWidth={2} />)}
            </g>; })()}
          <g opacity={kprog(T, K.CV + 2.4, K.CV + 2.9)}>
            <rect x={60} y={1020} width={380} height={110} rx={18} fill={PX.tierra} stroke="#f6f3ec" strokeWidth={5} />
            <Pasto T={T} x={250} y={1022} s={0.7} seed={4} salud={kprog(T, K.CV + 2.6, K.CV + 3.8, kEase.sale)} />
            <Termo x={110} y={1100} s={0.45} valor={65} texto={false} />
          </g>
        </>)}
      </Escena>
      {/* 10 · también en jitomate */}
      <Escena T={T} a={K.Ji} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Suelo T={T} y={920} vapor={1} />
          {[[230, 0], [520, 1], [810, 2]].map(([a, i]) => <Jitomate key={i} T={T} x={a} y={922} s={kprog(T, K.Ji + 0.2 + i * 0.25, K.Ji + 0.8 + i * 0.25, kEase.rebote) * 0.95} seed={i} dobla={i === 2 ? kprog(T, K.Ji + 2.6, K.Ji + 3.6, kEase.suave) : 0} />)}
        </>)}
      </Escena>
      {/* 11 · mecanismo: las defensas ya están altas y no suben */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g transform="translate(330 700) rotate(-18)">
            <path d="M -260 0 Q -120 -170 120 -130 Q 260 -100 300 0 Q 260 100 120 130 Q -120 170 -260 0 Z" fill={PX.verde2} stroke={KC.ink} strokeWidth={8} />
            <path d="M -260 0 L 290 0" stroke={PX.verde} strokeWidth={8} />
            {[-160, -60, 40, 140].map((a) => <g key={a}><path d={`M ${a} 0 Q ${a + 40} -50 ${a + 90} -90`} stroke={PX.verde} strokeWidth={5} fill="none" /><path d={`M ${a} 0 Q ${a + 40} 50 ${a + 90} 90`} stroke={PX.verde} strokeWidth={5} fill="none" /></g>)}
            {[[-120, -40], [10, 50], [150, -30]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={14 + Math.sin(T * 3 + i) * 2} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />)}
          </g>
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo pasto del inicio, con la alianza de tres */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Suelo T={T} y={920} vapor={1} />
          <Raices x={420} y={922} />
          <Pasto T={T} x={420} y={922} s={1.05} seed={4} />
          <Termo x={150} y={1010} valor={65} />
          {(() => { const a = kprog(T, K.C + 0.3, K.C + 1.2, kEase.rebote); const P = [[360, 420], [200, 590], [520, 590]];
            return <g opacity={kprog(T, K.C + 0.2, K.C + 0.5)}>
              {[[0, 1], [1, 2], [2, 0]].map(([i, j], q) => <line key={q} x1={P[i][0]} y1={P[i][1]} x2={klerp(P[i][0], P[j][0], kprog(T, K.C + 0.9 + q * 0.2, K.C + 1.3 + q * 0.2))} y2={klerp(P[i][1], P[j][1], kprog(T, K.C + 0.9 + q * 0.2, K.C + 1.3 + q * 0.2))} stroke={KC.ink} strokeWidth={8} strokeDasharray="16 10" />)}
              <g transform={`translate(${P[0][0]} ${P[0][1]}) scale(${a})`}><circle r={78} fill="#fff" stroke={KC.ink} strokeWidth={7} /><Pasto T={T} x={0} y={45} s={0.28} seed={4} /></g>
              <g transform={`translate(${P[1][0]} ${P[1][1]}) scale(${a})`}><circle r={78} fill="#fff" stroke={KC.ink} strokeWidth={7} /><Hifa T={T} x={-52} y={0} largo={104} g={1} amp={8} ancho={18} virus={0} /></g>
              <g transform={`translate(${P[2][0]} ${P[2][1]}) scale(${a})`}><circle r={78} fill="#fff" stroke={KC.ink} strokeWidth={7} /><Virus x={0} y={0} r={40} /></g>
            </g>; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 3.4} until={K.L - 0.3} texto="pasto + hongo + virus" x={330} y={470} tam={38} borde={KC.pink} />
      <Etq T={T} at={K.L + 0.8} until={K.E - 0.3} x={60} y={470} texto="Yellowstone (EE. UU.)" tam={40} color={KC.ink} />
      <Etq T={T} at={K.L + 1.8} until={K.E - 0.3} x={60} y={680} texto="suelo: hasta 70 °C (en algunos puntos)" tam={28} color={KC.ink} />
      <Etq T={T} at={K.L + 3.0} until={K.E - 0.3} x={60} y={545} texto="Dichanthelium lanuginosum" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.E + 0.1} until={K.S - 0.3} texto="POR DENTRO · RAÍZ" x={330} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.E + 1.0} until={K.S - 0.3} x={60} y={600} texto="Curvularia protuberata" it tam={36} color={PX.hifa} />
      <Etq T={T} at={K.E + 2.0} until={K.S - 0.3} x={60} y={1110} texto="endófito: vive dentro, sin enfermarla" tam={30} color={KC.texto} />
      <NumeroGigante T={T} at={K.S + 0.4} until={K.J - 0.3} valor={38} dur={1.2} sufijo=" °C" etiqueta="solos, no crecen arriba de" x={330} y={500} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.S + 0.8} until={K.J - 0.3} x={110} y={1080} texto="pasto solo" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 1.0} until={K.J - 0.3} x={640} y={1110} texto="hongo solo" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.J + 0.4} until={K.P - 0.3} valor={65} dur={1.0} sufijo=" °C" etiqueta="juntos, en la tierra:" x={330} y={470} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.J + 1.8} until={K.P - 0.3} texto="10 h al día" x={860} y={710} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.J + 2.6} until={K.P - 0.3} texto={`día ${Math.max(1, Math.min(14, Math.floor(klerp(1, 15, kprog(T, K.J + 2.6, K.J + 4.6)))))} de 14`} x={860} y={800} tam={36} borde={KC.ink} mono />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.4} anio="2007" quien="Oklahoma + Washington + Montana" revista="Science, 2007" x={540} y={560} />
      <Etq T={T} at={K.Es + 0.8} until={K.SV - 0.3} x={80} y={1030} texto="virus: partículas de ~27 nm (esquemático)" tam={26} color={PX.virus} />
      <Chip T={T} at={K.Es + 3.6} until={K.SV - 0.3} texto="congelado → hongo sin virus" x={540} y={560} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.SV + 1.2} until={K.CV - 0.3} texto="sin virus: no aguanta" x={340} y={500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.CV + 0.2} until={K.Ji - 0.3} texto="fusión de hifas" x={330} y={480} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.CV + 1.6} until={K.Ji - 0.3} x={560} y={960} texto="el virus pasa" tam={28} color={PX.virus} />
      <Etq T={T} at={K.CV + 3.0} until={K.Ji - 0.3} x={470} y={1090} texto="65 °C: vuelve a aguantar" tam={28} color={KC.mint} />
      <Etq T={T} at={K.Ji + 0.8} until={K.M - 0.3} x={60} y={480} texto="jitomate" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Ji + 1.2} until={K.M - 0.3} x={60} y={545} texto="Solanum lycopersicum" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ji + 1.8} until={K.M - 0.3} texto="¡y ni es pasto!" x={300} y={640} tam={36} borde={KC.pink} />
      <Etq T={T} at={K.Ji + 3.4} until={K.M - 0.3} x={560} y={480} texto="no todas lo lograron" tam={26} color={KC.ink} />
      <Medidor T={T} at={K.M + 1.0} until={K.C - 0.3} valor={(t) => kprog(t, K.M + 1.0, K.M + 2.4, kEase.sale) * 0.95} etiqueta="calor en la tierra" texto={(v) => Math.round(37 + 28 * v / 0.95) + ' °C'} x={90} y={930} ancho={900} color={KC.red} />
      <Medidor T={T} at={K.M + 1.6} until={K.C - 0.3} valor={0.82} etiqueta="defensas de la planta" texto={() => 'ya altas'} x={90} y={1060} ancho={900} color={KC.mint} />
      <Chip T={T} at={K.M + 3.4} until={K.C - 0.3} texto="pista, no respuesta final" x={330} y={460} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="alianza de tres" x={420} y={1110} tam={40} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.L} texto="10 cm" largo={100} y={1450} />
      <BarraEscala T={T} at={K.L} until={K.E} texto="paisaje esquemático" largo={0} y={1450} />
      <BarraEscala T={T} at={K.E} until={K.S} texto="20 µm" largo={100} y={1450} />
      <BarraEscala T={T} at={K.S} until={K.J} texto="10 cm" largo={125} y={1450} />
      <BarraEscala T={T} at={K.J} until={K.P} texto="10 cm" largo={100} y={1450} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="10 cm" largo={110} y={1450} />
      <BarraEscala T={T} at={K.Es} until={K.Ji} texto="dibujo esquemático" largo={0} y={1450} />
      <BarraEscala T={T} at={K.Ji} until={K.M} texto="10 cm" largo={100} y={1450} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="dibujo esquemático" largo={0} y={1450} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={100} y={1450} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="Lo salva *el virus de un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.E - 0.1} texto="Yellowstone: suelos de *hasta 70 °C.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.S - 0.1} texto="Un hongo *endófito:* vive dentro." />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.J - 0.1} texto="Solos, *nada arriba de 38 °C.*" />
      <Subtitulo T={T} idx={4} at={K.J + 0.1} until={K.P - 0.1} texto="Juntos: *65 °C,* 10 h al día, 2 semanas." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Y si el truco *no fuera del hongo?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.SV - 0.1} texto="2007: le quitaron *el virus al hongo.*" />
      <Subtitulo T={T} idx={7} at={K.SV + 0.1} until={K.CV - 0.1} texto="Sin virus, *el pasto murió.*" />
      <Subtitulo T={T} idx={8} at={K.CV + 0.1} until={K.Ji - 0.1} texto="Virus de vuelta: *volvió a aguantar.*" />
      <Subtitulo T={T} idx={9} at={K.Ji + 0.1} until={K.M - 0.1} texto="También ayudó *a jitomates.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.C - 0.1} texto="Pista: ya trae *sus defensas altas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una *alianza de tres.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.3, 'avatar_11_sorprendido', 'gancho'],
        [K.L + 0.5, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.S + 0.5, K.J - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.J + 0.9, K.P - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.SV + 0.3, K.CV - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.CV + 1.0, K.Ji + 2.6, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.M + 0.5, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="73" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PastoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PastoShot /></CompositionStage></div>;
}
window.PastoApp = PastoApp;
