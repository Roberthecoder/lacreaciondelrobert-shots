// Shot Fungi Mati #51 · El hongo que se come el combustible de los aviones (Amorphotheca resinae) — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Morfología: hifas de 2–3 µm de ancho, esporas ovaladas (~2–3 × 5 µm) en cadenas ramificadas; crece en la frontera agua–turbosina (Arnold 1983).

const QK = { turbo:'#f2c14e', turbo2:'#e0a92e', agua:'#3d8fe0', agua2:'#2a6bb5', tapete:'#7a5232', tapete2:'#5a3a22', hifa:'#c9a27a', espora:'#8a6440',
  alu:'#c9d1d9', alu2:'#9aa6b2', creosota:'#3b2516', creosota2:'#5a3a24', filtro:'#f4f0e6', avion:'#f6f7fb' };

// Filtro de combustible (cartucho plisado) de pie. manchas 0..1 = manchas oscuras "de leopardo".
function Filtro({ T, x, y, s = 1, manchas = 0, seed = 7 }) {
  const r = krng(seed), M = Array.from({ length: 16 }, () => [r() * 220 - 110, r() * 460 - 230, 10 + r() * 22, r()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-260} width={300} height={520} rx={14} fill={QK.filtro} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1={-130 + i * 21.6} y1={-250} x2={-130 + i * 21.6} y2={250} stroke="#d8d1bf" strokeWidth={5} />)}
    {M.map(([mx, my, mr, q], i) => { const k = kprog(manchas, q * 0.6, q * 0.6 + 0.4, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${mx} ${my}) scale(${k})`}>
      <ellipse rx={mr * 1.25} ry={mr} fill="#4a3322" opacity=".85" /><ellipse rx={mr * 0.6} ry={mr * 0.45} cx={mr * 0.2} fill="#2a1c12" opacity=".8" /></g> : null; })}
    <rect x={-172} y={-300} width={344} height={52} rx={12} fill="#8f98a3" stroke={KC.ink} strokeWidth={8} />
    <rect x={-172} y={250} width={344} height={52} rx={12} fill="#8f98a3" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-300} rx={60} ry={14} fill="#5b636d" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Avión visto desde arriba (nariz hacia arriba). tanque 0..1 = ala transparente con turbosina; humo/llama en motor izquierdo; aviso en el derecho.
function AvionArriba({ T, x, y, s = 1, rot = 0, tanque = 0, llama = 0, aviso = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -360 40 L -40 -60 L 40 -60 L 360 40 L 360 80 L 40 30 L -40 30 L -360 80 Z" fill={QK.avion} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {tanque > 0 && <g opacity={tanque}>
      <path d="M -320 46 L -60 -40 L -60 18 L -320 66 Z" fill={QK.turbo} stroke={KC.ink} strokeWidth={4} />
      <path d="M 320 46 L 60 -40 L 60 18 L 320 66 Z" fill={QK.turbo} stroke={KC.ink} strokeWidth={4} />
    </g>}
    <path d="M -130 290 L -20 250 L 20 250 L 130 290 L 130 312 L -130 312 Z" fill={QK.avion} stroke={KC.ink} strokeWidth={7} />
    <path d="M -42 -250 Q -42 -330 0 -350 Q 42 -330 42 -250 L 42 300 Q 0 330 -42 300 Z" fill={QK.avion} stroke={KC.ink} strokeWidth={8} />
    <path d="M -24 -290 Q 0 -312 24 -290" stroke={KC.ink} strokeWidth={8} fill="none" />
    {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 170} -10)`}>
      <rect x={-26} y={-40} width={52} height={96} rx={20} fill="#c7ccd6" stroke={KC.ink} strokeWidth={6} />
      {sd < 0 && llama > 0 && [0, 1, 2].map((k) => <path key={k} d={`M -20 56 Q 0 ${56 + (90 + 40 * Math.sin(T * 22 + k)) * llama} 20 56 Z`} fill={k === 1 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={3} transform={`translate(${(k - 1) * 9} 0)`} />)}
      {sd > 0 && aviso > 0 && <g transform={`translate(0 -100) scale(${aviso})`}><path d="M 0 -40 L 40 30 L -40 30 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
        <text y={22} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>!</text></g>}
    </g>)}
  </g>;
}
// Poste de telégrafo con creosota + durmientes de vía; manchas del hongo.
function PosteVia({ T, manchas = 1 }) {
  const r = krng(11), M = Array.from({ length: 14 }, () => [r(), r(), 8 + r() * 14]);
  return <g>
    <rect x={0} y={1180} width={KW} height={500} fill="#a88b6a" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => <g key={i}><rect x={40 + i * 175} y={1240} width={130} height={300} rx={8} fill={QK.creosota} stroke={KC.ink} strokeWidth={6} />
      <line x1={55 + i * 175} y1={1300} x2={155 + i * 175} y2={1300} stroke={QK.creosota2} strokeWidth={5} /></g>)}
    <rect x={0} y={1300} width={KW} height={26} fill="#7d8790" stroke={KC.ink} strokeWidth={5} />
    <rect x={0} y={1460} width={KW} height={26} fill="#7d8790" stroke={KC.ink} strokeWidth={5} />
    <rect x={720} y={380} width={70} height={820} fill={QK.creosota} stroke={KC.ink} strokeWidth={8} />
    <rect x={600} y={430} width={310} height={40} rx={6} fill={QK.creosota2} stroke={KC.ink} strokeWidth={7} />
    {[620, 700, 810, 890].map((cx, i) => <rect key={i} x={cx - 8} y={404} width={16} height={28} rx={4} fill="#9fe6ff" stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 0 420 Q 300 470 612 418 M 900 418 Q 1000 440 1080 430" stroke={KC.ink} strokeWidth={4} fill="none" />
    {M.map(([a, b, rr], i) => { const k = kprog(manchas, i / 14 * 0.7, i / 14 * 0.7 + 0.3, kEase.rebote); const enPoste = i < 7;
      const cx = enPoste ? 735 + a * 40 : 60 + Math.floor(a * 6) * 175 + b * 100, cy = enPoste ? 560 + b * 560 : 1270 + a * 240;
      return k > 0 ? <circle key={i} cx={cx} cy={cy} r={rr * k} fill="#1a1a14" stroke="#6d6a4a" strokeWidth={3} /> : null; })}
  </g>;
}
// Tanque del ala en corte: turbosina arriba, agua abajo (sube con agua 0..1), gotitas que se condensan y caen.
function TanqueCorte({ T, agua = 0, gotas = 0, x0 = 90, y0 = 620, w = 900, h = 560 }) {
  const ya = y0 + h - 30 - 120 * agua;
  return <g>
    <rect x={x0 - 20} y={y0 - 20} width={w + 40} height={h + 40} rx={26} fill={QK.alu} stroke={KC.ink} strokeWidth={10} />
    <rect x={x0} y={y0} width={w} height={h} rx={12} fill={QK.turbo} stroke={KC.ink} strokeWidth={5} />
    {[0.33, 0.66].map((f, i) => <rect key={i} x={x0 + w * f - 8} y={y0} width={16} height={h} fill={QK.alu2} stroke={KC.ink} strokeWidth={4} />)}
    <path d={`M ${x0} ${ya} Q ${x0 + w / 4} ${ya + Math.sin(T * 2) * 6} ${x0 + w / 2} ${ya} T ${x0 + w} ${ya} L ${x0 + w} ${y0 + h} L ${x0} ${y0 + h} Z`} fill={QK.agua} stroke={KC.ink} strokeWidth={5} />
    {gotas > 0 && Array.from({ length: 9 }, (_, i) => { const per = 1.6, u = ((T * 0.9 + i * 0.37) % per) / per; const gx = x0 + 60 + i * 95;
      const gy = u < 0.35 ? y0 + 14 : klerp(y0 + 14, ya - 8, Math.pow((u - 0.35) / 0.65, 2)); const rr = 6 + 8 * Math.min(1, u / 0.35);
      return <path key={i} d={`M ${gx} ${gy - rr * 1.6} Q ${gx + rr} ${gy} ${gx} ${gy + rr} Q ${gx - rr} ${gy} ${gx} ${gy - rr * 1.6} Z`} fill="#9fd3ff" stroke={KC.ink} strokeWidth={3} opacity={gotas} />; })}
  </g>;
}
// Cadena ramificada de esporas ovaladas (conidios). (x, y) = base; p 0..1 la va formando.
const ESP_RAMAS = [[0, -1, 5], [-0.55, -0.85, 3, 2], [0.6, -0.8, 3, 3], [-0.3, -0.95, 2, 4]];
function CadenaEsporas({ x, y, p = 1, s = 1, rot = 0, color = QK.espora }) {
  const L = 62, sp = [];
  ESP_RAMAS.forEach(([dx, dy, n, desde], ri) => {
    let bx = 0, by = 0; if (desde) { bx = ESP_RAMAS[0][0] * L * desde; by = ESP_RAMAS[0][1] * L * desde; if (ri === 3) { bx = ESP_RAMAS[1][0] * L * 2 + ESP_RAMAS[0][0] * L * 2; by = ESP_RAMAS[1][1] * L * 2 + ESP_RAMAS[0][1] * L * 2; } }
    const a = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    for (let k = 0; k < n; k++) sp.push({ x: bx + dx * L * (k + 0.5), y: by + dy * L * (k + 0.5), a, q: (ri * 0.15 + k * 0.12) });
  });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {sp.map((o, i) => { const k = kprog(p, o.q, o.q + 0.25, kEase.rebote); return k > 0 ? <ellipse key={i} cx={o.x} cy={o.y} rx={15 * k} ry={30 * k} transform={`rotate(${o.a} ${o.x} ${o.y})`} fill={color} stroke={KC.ink} strokeWidth={3.5} /> : null; })}
  </g>;
}
// Frasco con mugre café (biopelícula) y un ADN encima.
function Frasco({ T, x, y, k = 1, adn = 0, i = 0 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <rect x={-56} y={-120} width={112} height={170} rx={20} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-50} y={-30} width={100} height={74} rx={14} fill={QK.turbo} />
    <path d={`M -50 10 Q -20 ${-4 + Math.sin(T * 3 + i) * 4} 0 8 T 50 6 L 50 44 L -50 44 Z`} fill={QK.tapete} />
    <rect x={-62} y={-142} width={124} height={30} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    {adn > 0 && <g transform={`translate(0 -200) scale(${adn})`}>
      {Array.from({ length: 7 }, (_, j) => { const yy = -60 + j * 20, xx = 26 * Math.sin(T * 3 + j * 0.9); return <g key={j}><line x1={-xx} y1={yy} x2={xx} y2={yy} stroke={j % 2 ? KC.pink : KC.mint} strokeWidth={6} />
        <circle cx={xx} cy={yy} r={6} fill={KC.ink} /><circle cx={-xx} cy={yy} r={6} fill={KC.ink} /></g>; })}
    </g>}
  </g>;
}

function QuerosenoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Cr: CUES.Creosota, Ag: CUES.Agua, Fr: CUES.Frontera, Ta: CUES.Tapetes, P: CUES.Pregunta, D: CUES.Dano, E: CUES.Estudio, R: CUES.Remedio, Ga: CUES.Gatwick, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const IY = 900; // frontera agua–turbosina en lo micro
  const sube = kprog(T, K.G, K.G + 0.8, kEase.sale);
  // tiempos del avión de Gatwick
  const g0 = K.Ga + 2.6, desp = kprog(T, g0, g0 + 2.2, kEase.suave), vuelta = kprog(T, g0 + 2.4, K.C - 0.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el filtro sale con manchas oscuras */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={`translate(0 ${(1 - sube) * 700})`}><Filtro T={T} x={330} y={1010} s={1.05} manchas={kprog(T, K.G + 0.3, K.G + 2.2)} /></g>
          <path d="M 120 1330 Q 330 1290 540 1330" stroke={KC.ink} strokeWidth={0} fill="none" />
        </>)}
      </Escena>
      {/* 1 · el nombre: un avión con el ala transparente, llena de turbosina */}
      <Escena T={T} a={K.N} b={K.Cr} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<AvionArriba T={T} x={540} y={960} s={1.25} tanque={kprog(T, K.N + 0.6, K.N + 1.4)} />)}
      </Escena>
      {/* 2 · antes: postes y durmientes con creosota */}
      <Escena T={T} a={K.Cr} b={K.Ag}>
        <FondoLunares color={KC.orange} />
        {fsvg(<PosteVia T={T} manchas={kprog(T, K.Cr + 0.5, K.Cr + 2.6)} />)}
      </Escena>
      {/* 3 · el agua se condensa y queda abajo de la turbosina */}
      <Escena T={T} a={K.Ag} b={K.Fr} zoom={0.12} origen="50% 80%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<TanqueCorte T={T} agua={kprog(T, K.Ag + 0.8, K.Ag + 4.2)} gotas={kprog(T, K.Ag + 0.2, K.Ag + 0.8)} />)}
      </Escena>
      {/* 4–5 · al microscopio: la frontera; hifas que se tejen en tapete; cadenas de esporas */}
      <Escena T={T} a={K.Fr} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <rect x={0} y={0} width={KW} height={IY} fill={QK.turbo} opacity=".16" />
          <rect x={0} y={IY} width={KW} height={KH - IY} fill={QK.agua2} opacity=".42" />
          <path d={`M 0 ${IY} Q 270 ${IY + Math.sin(T * 1.5) * 8} 540 ${IY} T 1080 ${IY}`} stroke="#9fd3ff" strokeWidth={6} fill="none" />
          {/* espora que germina */}
          <ellipse cx={540} cy={IY - 4} rx={15} ry={30} transform={`rotate(80 540 ${IY - 4})`} fill={QK.espora} stroke={KC.ink} strokeWidth={4} opacity={1 - kprog(T, K.Ta + 1.0, K.Ta + 2.0)} />
          <RedHifas T={T} x={540} y={IY} g={kprog(T, K.Fr + 0.6, K.Ta + 1.6)} seed={9} n={260} escala={0.62} ancho={9} color={QK.hifa} rot={0} />
          <RedHifas T={T} x={300} y={IY + 10} g={kprog(T, K.Ta - 0.2, K.Ta + 2.6)} seed={4} n={200} escala={0.5} ancho={9} color={QK.hifa} rot={20} />
          <RedHifas T={T} x={800} y={IY + 6} g={kprog(T, K.Ta + 0.1, K.Ta + 2.9)} seed={6} n={200} escala={0.5} ancho={9} color={QK.hifa} rot={-15} />
          {/* tapete café */}
          <path d={`M 40 ${IY - 30} Q 300 ${IY - 70} 540 ${IY - 40} T 1040 ${IY - 30} L 1040 ${IY + 60} Q 540 ${IY + 90} 40 ${IY + 60} Z`} fill={QK.tapete} stroke={KC.ink} strokeWidth={6} opacity={0.85 * kprog(T, K.Ta + 1.2, K.Ta + 2.6)} />
          {kprog(T, K.Ta + 1.2, K.Ta + 2.6) > 0 && Array.from({ length: 22 }, (_, i) => <path key={i} d={`M ${60 + i * 45} ${IY - 20 + (i % 3) * 18} q 22 ${-14 + (i % 4) * 8} 44 0`} stroke={QK.tapete2} strokeWidth={7} fill="none" opacity={kprog(T, K.Ta + 1.2, K.Ta + 2.6)} />)}
          {/* cadenas de esporas que suben a la turbosina */}
          <CadenaEsporas x={300} y={IY - 50} p={kprog(T, K.Ta + 1.8, K.Ta + 3.6)} s={1.0} rot={-6} />
          <CadenaEsporas x={720} y={IY - 50} p={kprog(T, K.Ta + 2.1, K.Ta + 3.9)} s={1.0} rot={8} />
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.D} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7 · el daño: filtro tapado → ácidos en el aluminio → agujero en el ala */}
      <Escena T={T} a={K.D} b={K.E}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const a1 = 1 - kprog(T, K.D + 2.0, K.D + 2.4); if (a1 <= 0) return null; const tapa = kprog(T, K.D + 0.3, K.D + 1.6);
            return <g opacity={a1}>
              <rect x={120} y={760} width={840} height={200} rx={30} fill="#d9dde3" stroke={KC.ink} strokeWidth={9} />
              <rect x={500} y={740} width={80} height={240} rx={10} fill={QK.filtro} stroke={KC.ink} strokeWidth={7} />
              <rect x={500} y={760 + 200 * (1 - tapa)} width={80} height={200 * tapa} fill={QK.tapete} opacity=".9" />
              {Array.from({ length: 6 }, (_, i) => { const v = 1 - 0.85 * tapa; const u = ((T * 0.8 * v + i / 6) % 1); return <path key={i} d="M 0 -16 L 30 0 L 0 16 Z" transform={`translate(${160 + u * 320} ${820 + (i % 3) * 40})`} fill={QK.turbo} stroke={KC.ink} strokeWidth={4} />; })}
              {Array.from({ length: 6 }, (_, i) => { const v = 1 - 0.95 * tapa; const u = ((T * 0.8 * v + i / 6) % 1); return <path key={i} d="M 0 -16 L 30 0 L 0 16 Z" transform={`translate(${620 + u * 300} ${820 + (i % 3) * 40})`} fill={QK.turbo} stroke={KC.ink} strokeWidth={4} opacity={1 - tapa * 0.85} />; })}
            </g>; })()}
          {(() => { const a2 = kprog(T, K.D + 2.0, K.D + 2.4) * (1 - kprog(T, K.D + 4.0, K.D + 4.4)); if (a2 <= 0) return null; const pic = kprog(T, K.D + 2.4, K.D + 3.9);
            return <g opacity={a2}>
              <rect x={100} y={880} width={880} height={160} fill={QK.alu} stroke={KC.ink} strokeWidth={9} />
              <rect x={100} y={760} width={880} height={120} fill={QK.agua} opacity=".7" />
              <path d="M 100 800 Q 540 770 980 800 L 980 880 L 100 880 Z" fill={QK.tapete} opacity=".85" />
              {Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.9 + i * 0.29) % 1); return <circle key={i} cx={170 + i * 120} cy={872 - u * 90} r={10 + 6 * u} fill="#e9ff7a" stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
              {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${150 + i * 120} 880 q 20 ${40 * pic} 40 0`} fill="#4b4f55" stroke={KC.ink} strokeWidth={4} />)}
            </g>; })()}
          {(() => { const a3 = kprog(T, K.D + 4.0, K.D + 4.4); if (a3 <= 0) return null; const ag = kprog(T, K.D + 4.4, K.D + 5.2, kEase.rebote);
            return <g opacity={a3}>
              <path d="M 60 1000 L 960 760 L 1040 820 L 140 1110 Z" fill={QK.avion} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
              <ellipse cx={560} cy={930} rx={60 * ag} ry={36 * ag} fill="#4b4f55" stroke={KC.ink} strokeWidth={6} />
              <ellipse cx={560} cy={930} rx={26 * ag} ry={16 * ag} fill={KC.ink} />
              {ag > 0.5 && Array.from({ length: 4 }, (_, i) => { const u = ((T * 1.4 + i * 0.25) % 1); return <path key={i} d="M 0 -12 Q 10 0 0 12 Q -10 0 0 -12 Z" transform={`translate(${560 + (i - 1.5) * 10} ${960 + u * 220})`} fill={QK.turbo} stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
            </g>; })()}
        </>)}
      </Escena>
      {/* 8 · el estudio: ADN de la mugre de 6 tanques */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {Array.from({ length: 6 }, (_, i) => <Frasco key={i} T={T} i={i} x={180 + (i % 3) * 360} y={i < 3 ? 920 : 1180} k={kprog(T, K.E + 2.5 + i * 0.15, K.E + 2.8 + i * 0.15, kEase.rebote)} adn={kprog(T, K.E + 3.6 + i * 0.12, K.E + 4.0 + i * 0.12, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 9 · el remedio: drenar el agua y biocida en dosis exacta */}
      <Escena T={T} a={K.R} b={K.Ga}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <path d="M -20 700 L 1100 620 L 1100 760 L -20 860 Z" fill={QK.avion} stroke={KC.ink} strokeWidth={9} />
          <rect x={300} y={790} width={60} height={50} rx={8} fill="#8f98a3" stroke={KC.ink} strokeWidth={6} />
          <rect x={320} y={836} width={20} height={36} fill="#5b636d" stroke={KC.ink} strokeWidth={4} />
          <Goteo T={T} x={330} y0={880} y1={1110} cada={0.25} color={QK.agua} desde={K.R + 0.4} hasta={K.R + 2.6} r={11} />
          <path d="M 250 1060 L 270 1180 L 390 1180 L 410 1060 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
          <rect x={268} y={1180 - 100 * kprog(T, K.R + 0.6, K.R + 2.8)} width={124} height={100 * kprog(T, K.R + 0.6, K.R + 2.8)} fill={QK.agua} opacity=".8" />
          {(() => { const b = kprog(T, K.R + 1.8, K.R + 2.3, kEase.rebote); if (b <= 0) return null; return <g transform={`translate(760 1060) scale(${b})`}>
            <rect x={-70} y={-110} width={140} height={200} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={-70} y={-30} width={140} height={60} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
            <rect x={-26} y={-170} width={52} height={64} rx={10} fill={KC.ink} />
            <circle cx={0} cy={-200} r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <rect x={-6} y={-260 + 30 * Math.abs(Math.sin(T * 3))} width={12} height={30} rx={6} fill="#9fe6ff" opacity={kprog(T, K.R + 2.6, K.R + 2.9)} />
          </g>; })()}
        </>)}
      </Escena>
      {/* 10 · Gatwick 2020: unas 38 veces la dosis; llamas solo en el motor izquierdo, aviso en el derecho; aterriza */}
      <Escena T={T} a={K.Ga} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1560} width={KW} height={400} fill="#5d6670" />
          <rect x={470} y={1560} width={140} height={400} fill="#3c434b" />
          {Array.from({ length: 5 }, (_, i) => <rect key={i} x={532} y={1580 + i * 70} width={16} height={40} fill="#fff" />)}
          {T > g0 - 0.3 && <AvionArriba T={T} x={540} y={klerp(1500, 980, desp) + 520 * vuelta * vuelta} s={klerp(0.62, 0.95, desp) - 0.33 * vuelta} rot={kclamp(vuelta * 2.2, 0, 1) * 0 + Math.sin(vuelta * Math.PI) * -22}
            llama={kprog(T, g0 + 1.0, g0 + 1.3) * (1 - kprog(T, K.C - 1.0, K.C - 0.5))} aviso={kprog(T, g0 + 2.2, g0 + 2.6, kEase.rebote) * (1 - kprog(T, K.C - 1.0, K.C - 0.5))} />}
        </>)}
      </Escena>
      {/* 11 · cierre: el mismo filtro del inicio, ahora con la lupa que deja ver hifas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Filtro T={T} x={330} y={1010} s={1.05} manchas={1} />
          {(() => { const l = kprog(T, K.C + 0.4, K.C + 1.3, kEase.sale); return <g transform={`translate(${klerp(900, 360, l)} ${klerp(560, 880, l)})`} opacity={kprog(T, K.C + 0.3, K.C + 0.6)}>
            <circle r={150} fill={KC.noche} stroke={KC.ink} strokeWidth={16} />
            <clipPath id="lupaQ"><circle r={142} /></clipPath>
            <g clipPath="url(#lupaQ)">
              <rect x={-150} y={20} width={300} height={140} fill={QK.agua2} opacity=".5" />
              <RedHifas T={T} x={0} y={20} g={kprog(T, K.C + 0.8, K.C + 3.0)} seed={9} n={220} escala={0.4} ancho={7} color={QK.hifa} />
              <CadenaEsporas x={-40} y={0} p={kprog(T, K.C + 1.6, K.C + 3.2)} s={0.6} />
            </g>
            <circle r={150} fill="none" stroke="#fff" strokeWidth={8} />
            <line x1={106} y1={106} x2={210} y2={210} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
          </g>; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.4} until={K.N - 0.3} texto="¿mugre? → ¿o un hongo?" x={360} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.G + 1.4} until={K.N - 0.3} x={520} y={1160} texto="filtro de turbosina" tam={30} color={KC.ink} />
      <Etq T={T} at={K.N + 0.2} until={K.Cr - 0.3} x={60} y={470} texto="Amorphotheca resinae" it tam={42} color={KC.ink} />
      <Etq T={T} at={K.N + 0.6} until={K.Cr - 0.3} x={60} y={530} texto="“hongo del queroseno”" tam={32} color={KC.ink} />
      <Etq T={T} at={K.N + 1.2} until={K.Cr - 0.3} x={60} y={580} texto="antes: Hormoconis / Cladosporium resinae" it tam={24} color={KC.ink} />
      <Chip T={T} at={K.N + 1.4} until={K.Cr - 0.3} texto="turbosina = Jet A-1" x={540} y={1440} tam={34} borde={KC.ink} mono />
      <Chip T={T} at={K.Cr + 0.4} until={K.Ag - 0.3} texto="el hongo de la creosota" x={360} y={300} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Cr + 1.0} until={K.Ag - 0.3} x={700} y={700} lado="izq" texto="poste con creosota" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Cr + 1.6} until={K.Ag - 0.3} x={60} y={1600} texto="durmientes" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ag + 0.4} until={K.Fr - 0.3} texto="POR DENTRO · tanque del ala" x={420} y={470} tam={34} borde={KC.ink} mono />
      <Etq T={T} at={K.Ag + 1.2} until={K.Fr - 0.3} x={140} y={760} texto="turbosina" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ag + 2.6} until={K.Fr - 0.3} x={140} y={1110} texto="agua (abajo)" tam={32} color={KC.white} />
      <Chip T={T} at={K.Fr + 0.2} until={K.Ta - 0.3} texto="AL MICROSCOPIO · la frontera" x={420} y={470} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Fr + 0.8} until={K.P - 0.3} x={40} y={640} texto="turbosina" tam={30} color={QK.turbo} />
      <Etq T={T} at={K.Fr + 1.0} until={K.P - 0.3} x={40} y={1160} texto="agua" tam={30} color="#9fd3ff" />
      <Etq T={T} at={K.Fr + 1.4} until={K.Ta - 0.3} x={600} y={IY - 120} texto="hifas" tam={30} color={QK.hifa} />
      <Chip T={T} at={K.Ta + 0.2} until={K.P - 0.3} texto="hifas: 2–3 µm de ancho" x={360} y={470} tam={32} borde={QK.hifa} mono />
      <Etq T={T} at={K.Ta + 1.8} until={K.P - 0.3} x={40} y={IY + 120} texto="tapete" tam={30} color="#e8c39a" />
      <Etq T={T} at={K.Ta + 2.4} until={K.P - 0.3} x={820} y={620} texto="esporas" tam={30} color="#e8c39a" />
      <Chip T={T} at={K.D + 0.4} until={K.D + 2.0} texto="filtros tapados" x={380} y={560} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.D + 2.4} until={K.D + 4.0} texto="ácidos orgánicos → corrosión" x={420} y={560} tam={36} borde={KC.red} />
      <Etq T={T} at={K.D + 2.6} until={K.D + 4.0} x={120} y={1090} texto="aluminio" tam={30} color={KC.ink} />
      <Chip T={T} at={K.D + 4.4} until={K.E - 0.3} texto="antes: tanques perforados" x={420} y={560} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="2021" quien="Hamburgo, Alemania · 6 tanques" revista="Krohn et al., Frontiers in Microbiology" y={760} />
      <Chip T={T} at={K.E + 3.6} until={K.R - 0.3} texto="ADN de la mugre" x={360} y={560} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.E + 5.0} until={K.R - 0.3} texto="el hongo más abundante: Amorphotheca" x={540} y={1460} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.R + 0.5} until={K.Ga - 0.3} x={370} y={815} texto="drenaje de agua" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 2.0} until={K.Ga - 0.3} x={690} y={1060} lado="izq" texto="biocida" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 2.4} until={K.Ga - 0.3} texto="dosis exacta" x={760} y={1440} tam={38} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.Ga + 0.2} until={g0 - 0.2} valor={38} dur={0.9} prefijo="≈" sufijo="×" etiqueta="la dosis de biocida" x={420} y={760} tam={260} color={KC.red} />
      <Chip T={T} at={K.Ga + 0.4} until={K.C - 0.3} texto="2020 · Gatwick, Londres" x={380} y={470} tam={36} borde={KC.ink} mono />
      <Etq T={T} at={g0 + 1.2} until={g0 + 4.0} x={330} y={1260 - 260} lado="izq" texto="motor 1: llamas" tam={26} color={KC.ink} />
      <Etq T={T} at={g0 + 2.4} until={g0 + 4.6} x={760} y={880} texto="motor 2: aviso" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C - 2.2} until={K.C - 0.2} texto="aterrizó · 0 heridos" x={540} y={1460} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="¿mugre? o ¿un hongo con hambre de turbosina?" x={540} y={470} tam={30} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="10 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.Cr} texto="10 m" largo={190} color={KC.ink} />
      <BarraEscala T={T} at={K.Cr} until={K.Ag} texto="1 m" largo={170} y={1700} />
      <BarraEscala T={T} at={K.Ag} until={K.Fr} texto="50 cm" largo={300} color={KC.ink} y={1300} />
      <BarraEscala T={T} at={K.Fr} until={K.P} texto="10 µm" largo={120} y={1500} />
      <BarraEscala T={T} at={K.D} until={K.E} texto="1 cm" largo={180} y={1500} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.R} texto="5 cm" largo={110} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.Ga} texto="10 cm" largo={130} y={1500} color={KC.ink} />
      <BarraEscala T={T} at={K.Ga} until={K.C} texto="10 m" largo={140} y={1500} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={160} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No siempre es mugre: *puede ser un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Cr - 0.1} texto="El hongo *del queroseno.*" />
      <Subtitulo T={T} idx={2} at={K.Cr + 0.1} until={K.Ag - 0.1} texto="Antes se comía *la creosota.*" />
      <Subtitulo T={T} idx={3} at={K.Ag + 0.1} until={K.Fr - 0.1} texto="Sin agua *no crece.*" />
      <Subtitulo T={T} idx={4} at={K.Fr + 0.1} until={K.Ta - 0.1} texto="En la frontera *se pone a comer.*" />
      <Subtitulo T={T} idx={5} at={K.Ta + 0.1} until={K.P - 0.1} texto="Hilos que forman *tapetes cafés.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.D - 0.1} texto="¿Y qué le hace *al avión?*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.E - 0.1} texto="Tapa filtros y *corroe el aluminio.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.R - 0.1} texto="2021: ADN de *seis tanques.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Ga - 0.1} texto="Drenar el agua y biocida *en dosis exacta.*" />
      <Subtitulo T={T} idx={10} at={K.Ga + 0.1} until={K.C - 0.1} texto="Unas 38 veces la dosis… *y aterrizó a salvo.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo con hambre *de turbosina.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.4, K.Cr + 3.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Fr + 0.4, K.Ta + 3.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.D + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.D + 2.6, K.D + 5.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 3.0, K.R - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 0.4, K.Ga - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ga + 3.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="51" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function QuerosenoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><QuerosenoShot /></CompositionStage></div>;
}
window.QuerosenoApp = QuerosenoApp;
