// Shot Ambiental #24 · Ese chicle no es chicle: es plástico — NARRADO (N1 "Por dentro").
// Datos: FDA 21 CFR 172.615; patente Wrigley US10492512B2; Satari et al. 2020 (Sci Rep); Nciri et al. 2021 (Polymers);
// gov.wales 2022; El Pilar (UCSB); DOF 15 feb 2024 (IMPI, Chicle Maya); Chicza. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

const CH_ROSA = '#ff7fb0', CH_GRIS = '#a59ea6', CH_CAFE = '#c99a5b';

// Banqueta en perspectiva (fondo de pared amarilla con lunares arriba). manchas: cuántas manchas grises de chicle viejo.
function Banqueta({ T, manchas = 0, limpio = 0, seed = 7 }) {
  const r = krng(seed), sp = Array.from({ length: 26 }, () => ({ x: 60 + r() * 960, y: 820 + r() * 380, s: 0.5 + r() * 0.7, a: r() * 3 }));
  const lineas = [];
  for (let i = 0; i < 9; i++) { const y = 780 + Math.pow(i / 8, 1.5) * 460; lineas.push(<line key={'h' + i} x1={0} y1={y} x2={KW} y2={y} stroke="#b9b2a7" strokeWidth={3 + i * 0.6} />); }
  for (let i = -6; i <= 6; i++) lineas.push(<line key={'v' + i} x1={540 + i * 70} y1={780} x2={540 + i * 260} y2={1260} stroke="#b9b2a7" strokeWidth={4} />);
  return <g>
    <rect x={0} y={760} width={KW} height={KH - 760} fill="#e4ded4" />
    <rect x={0} y={740} width={KW} height={34} fill="#cfc7bb" stroke={KC.ink} strokeWidth={5} />
    {lineas}
    {sp.slice(0, manchas).map((p, i) => {
      const d = limpio > 0 ? kclamp(1 - Math.hypot(p.x - 600, p.y - 1000) / (limpio * 900), 0, 1) : 0;
      return <ellipse key={i} cx={p.x} cy={p.y} rx={30 * p.s} ry={13 * p.s} transform={`rotate(${p.a * 6} ${p.x} ${p.y})`} fill="#8d8890" stroke="#5f5a62" strokeWidth={3} opacity={(0.9 - d * 0.75) * kprog(T, 0, 0.01)} />;
    })}
  </g>;
}
// Chicle aplastado (vista en perspectiva). gris 0..1 = cuánto perdió color.
function ChicleAplastado({ x, y, s = 1, gris = 0, T = 0 }) {
  const c = mixHex(CH_ROSA, CH_GRIS, gris);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 Q -120 -34 -60 -42 Q -20 -64 30 -46 Q 100 -50 112 -14 Q 130 20 70 34 Q 10 52 -50 38 Q -118 34 -110 0 Z" fill={c} stroke={KC.ink} strokeWidth={6} />
    <path d="M -64 -18 Q -30 -34 6 -26" stroke="#fff" strokeOpacity=".55" strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={46} cy={-6} r={7} fill="rgba(0,0,0,.18)" /><circle cx={-20} cy={14} r={5} fill="rgba(0,0,0,.18)" />
  </g>;
}
// Tenis visto de lado; lift en px hacia arriba. Hilos de chicle entre la suela y el chicle (hilos 0..1).
function Tenis({ x, y, lift = 0, hilos = 0, gris = 0 }) {
  const Y = y - lift, c = mixHex(CH_ROSA, CH_GRIS, gris);
  return <g>
    {hilos > 0 && [-60, -20, 25, 60].map((dx, i) => {
      const k = Math.sin(Math.PI * kclamp(hilos, 0, 1)), w = 10 * (1 - lift / 300) + 3;
      return <path key={i} d={`M ${x + dx} ${y - 10} Q ${x + dx * 0.6} ${(y + Y) / 2} ${x + dx * 0.9} ${Y + 4}`} stroke={c} strokeWidth={Math.max(2, w)} fill="none" strokeLinecap="round" opacity={k} />;
    })}
    <g transform={`translate(${x} ${Y}) rotate(${-lift * 0.03})`}>
      <path d="M -170 -30 L 150 -30 Q 190 -30 190 0 L -175 0 Q -190 -10 -170 -30 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
      <path d="M -165 -30 Q -170 -110 -110 -150 L -40 -165 Q 0 -120 40 -110 Q 130 -95 170 -60 Q 190 -40 150 -30 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
      <path d="M -40 -160 Q -20 -130 10 -115" stroke="#fff" strokeWidth={6} fill="none" />
      {[0, 1, 2].map((i) => <line key={i} x1={-30 + i * 28} y1={-150 + i * 10} x2={-10 + i * 28} y2={-130 + i * 10} stroke="#fff" strokeWidth={6} strokeLinecap="round" />)}
      <path d="M 40 -70 Q 90 -60 130 -45" stroke={KC.yellow} strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>
  </g>;
}
// Cadena de polímero esquemática (camino al azar con cuentas). p 0..1 = cuánto se ha dibujado.
function CadenaPolimero({ seed, x, y, n = 26, paso = 26, color = KC.cyan, p = 1, T = 0, o = 1 }) {
  const r = krng(seed); let a = r() * 6.28, X = 0, Y = 0; const pts = [[0, 0]];
  for (let i = 1; i < n; i++) { a += (r() - 0.5) * 1.4; X += Math.cos(a) * paso; Y += Math.sin(a) * paso; pts.push([X, Y]); }
  const m = Math.max(1, Math.floor(n * p));
  const vis = pts.slice(0, m).map(([px, py], i) => [px + Math.sin(T * 1.5 + i + seed) * 3, py + Math.cos(T * 1.3 + i) * 3]);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <polyline points={vis.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" opacity=".85" />
    {vis.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={8} fill={color} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Fila de dientes (arriba o abajo).
function Dientes({ x, y, abajo = false }) {
  return <g transform={`translate(${x} ${y}) scale(1 ${abajo ? -1 : 1})`}>
    <path d="M -380 -140 Q 0 -230 380 -140 L 380 -40 L -380 -40 Z" fill="#e8557a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-360 + i * 90} y={-60} width={80} height={90} rx={22} fill="#fffaf0" stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Árbol de chicozapote con cortes en zigzag; cortes 0..1 dibuja los cortes; latex 0..1 llena los cortes de látex.
const ZZ = (() => { const p = []; for (let i = 0; i <= 9; i++) p.push([i % 2 ? 392 : 268, 470 + i * 68]); return p; })();
function Chicozapote({ T, cortes = 0, latex = 0 }) {
  const n = Math.max(1, Math.round(cortes * (ZZ.length - 1)) + 1), nl = Math.max(1, Math.round(latex * (ZZ.length - 1)) + 1);
  const hojas = Array.from({ length: 18 }, (_, i) => ({ x: 120 + (i % 6) * 70 + (i > 11 ? 30 : 0), y: 190 + Math.floor(i / 6) * 70, a: (i * 47) % 360 }));
  return <g>
    <rect x={250} y={330} width={160} height={900} rx={30} fill="#8a5a36" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${280 + i * 32} 360 Q ${270 + i * 34} 760 ${285 + i * 30} 1200`} stroke="#6e4528" strokeWidth={5} fill="none" />)}
    <ellipse cx={330} cy={250} rx={300} ry={150} fill="#2e9b4a" stroke={KC.ink} strokeWidth={8} />
    {hojas.map((h, i) => <ellipse key={i} cx={h.x + mece(T, i) * 0} cy={h.y} rx={34} ry={14} transform={`rotate(${h.a + Math.sin(T * 1.2 + i) * 6} ${h.x} ${h.y})`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} />)}
    {[[210, 330], [470, 320], [380, 360]].map(([fx, fy], i) => <circle key={i} cx={fx} cy={fy} r={22} fill="#9a6b3f" stroke={KC.ink} strokeWidth={5} />)}
    <polyline points={ZZ.slice(0, n).map((q) => q.join(',')).join(' ')} fill="none" stroke="#3b220f" strokeWidth={14} strokeLinejoin="miter" />
    {latex > 0 && <polyline points={ZZ.slice(0, nl).map((q) => q.join(',')).join(' ')} fill="none" stroke="#fffbe8" strokeWidth={8} strokeLinejoin="miter" />}
    {latex > 0.95 && <Goteo T={T} x={330} y0={1095} y1={1150} cada={0.45} color="#fffbe8" r={10} />}
    <path d="M 270 1140 L 390 1140 L 375 1215 Q 330 1235 285 1215 Z" fill="#5a4a3a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Paila (olla) que hierve sobre fuego, con burbujas de látex.
function Paila({ T, x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {[0, 1, 2].map((i) => { const f = Math.sin(T * 12 + i * 2) * 8; return <path key={i} d={`M ${-60 + i * 60} 90 Q ${-80 + i * 60} ${40 + f} ${-60 + i * 60} 10 Q ${-40 + i * 60} ${40 - f} ${-60 + i * 60} 90 Z`} fill={i % 2 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={4} />; })}
    <path d="M -160 -40 L 160 -40 Q 150 40 0 50 Q -150 40 -160 -40 Z" fill="#555b66" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-40} rx={160} ry={26} fill="#f2e6c4" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 5 }, (_, i) => { const u = (T * 0.8 + i / 5) % 1; return <circle key={i} cx={-100 + i * 50} cy={-44 - u * 30} r={8 + u * 8} fill="none" stroke="#fffbe8" strokeWidth={4} opacity={1 - u} />; })}
    {Array.from({ length: 3 }, (_, i) => { const u = (T * 0.4 + i / 3) % 1; return <path key={'v' + i} d={`M ${-50 + i * 50} ${-80 - u * 120} q 20 -20 0 -40`} stroke="#fff" strokeWidth={6} fill="none" opacity={(1 - u) * 0.7} strokeLinecap="round" />; })}
  </g>;
}
// Bloque de chicle natural (marqueta).
function Marqueta({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -80 -40 L 50 -40 L 80 -60 L -50 -60 Z" fill="#dcb47a" stroke={KC.ink} strokeWidth={5} />
    <path d="M 50 -40 L 80 -60 L 80 20 L 50 40 Z" fill="#a8783f" stroke={KC.ink} strokeWidth={5} />
    <rect x={-80} y={-40} width={130} height={80} fill={CH_CAFE} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Barco de carga esquemático.
function Barco({ x, y, carga = 3 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: carga }, (_, i) => <Marqueta key={i} x={-90 + i * 95} y={-70} s={0.6} />)}
    <path d="M -200 -30 L 200 -30 L 160 50 L -170 50 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={120} y={-110} width={50} height={80} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Fábrica con chimenea.
function Fabrica({ x, y, T, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => { const u = (T * 0.5 + i / 3) % 1; return <circle key={i} cx={110 + u * 40} cy={-210 - u * 160} r={30 + u * 30} fill="#8f949c" opacity={1 - u} />; })}
    <rect x={90} y={-220} width={50} height={140} fill="#6b707a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -150 0 L -150 -100 L -90 -60 L -90 -100 L -30 -60 L -30 -100 L 30 -60 L 30 -100 L 160 -100 L 160 0 Z" fill="#9aa1ab" stroke={KC.ink} strokeWidth={7} />
    {[-110, -50, 10, 80].map((wx) => <rect key={wx} x={wx} y={-50} width={36} height={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Cadenita de cocos (Streptococcus, esquema).
function Estrepto({ x, y, rot = 0, n = 5, o = 1, T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(T + seed) * 6})`} opacity={o}>
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={i * 30 - n * 15} cy={Math.sin(i * 1.3) * 5} r={15} fill="#b18cff" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

function ChicleShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Mascar, Re: CUES.Receta, Pe: CUES.Petroleo, P: CUES.Pregunta, Cz: CUES.Chicozapote, Si: CUES.Sinteticos,
    Es: CUES.Estudio, B: CUES.Banqueta, Ch: CUES.Chicleros, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho y cierre: el tenis despega el chicle
  const liftG = 200 * kprog(T, K.G + 0.05, K.G + 1.2, kEase.sale) * (1 - 0.15 * Math.sin(Math.max(0, T - K.G - 1.2) * 3));
  const liftC = 200 * kprog(T, K.C + 0.05, K.C + 1.2, kEase.sale);
  // masticar: mordidas
  const mord = (t) => 0.5 + 0.5 * Math.cos((t - K.Ma) * 5.2);
  const gris = kprog(T, K.Ma + 1.5, K.Ma + 3.6);
  // estudio: semanas 1 → 9 (las de la boca bajan pero no desaparecen del todo)
  const sem = kprog(T, K.Es + 2.2, K.Es + 6.4);
  const r1 = krng(31), estr = Array.from({ length: 9 }, () => ({ x: 300 + r1() * 480, y: 760 + r1() * 400, a: r1() * 180 }));
  const r2 = krng(57), sph = Array.from({ length: 14 }, () => ({ x: 290 + r2() * 500, y: 750 + r2() * 420, a: r2() * 180, t: r2() }));
  // mapa de la península
  const PX = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [a * 4.5 - 2540, b * 4.5 - 699]; };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el tenis despega el chicle de la banqueta */}
      <Escena T={T} a={K.G} b={K.Ma}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Banqueta T={T} manchas={6} /><ChicleAplastado x={380} y={1070} s={1.2} />
          <Tenis x={380} y={1060} lift={liftG} hilos={kprog(T, K.G + 0.05, K.G + 1.0)} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 1 · al masticar: azúcar y sabor se van; queda la goma */}
      <Escena T={T} a={K.Ma} b={K.Re}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Dientes x={540} y={700 + 90 * (1 - mord(T))} />
          <Dientes x={540} y={1110 - 90 * (1 - mord(T))} abajo />
          <g transform={`translate(540 905) scale(${1 + 0.25 * (1 - mord(T))} ${1 - 0.25 * (1 - mord(T))})`}><ellipse rx={130} ry={70} fill={mixHex(CH_ROSA, CH_GRIS, gris)} stroke={KC.ink} strokeWidth={7} /></g>
          {Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.Ma + 0.4 + i * 0.25, K.Ma + 2.2 + i * 0.25); if (u <= 0 || u >= 1) return null;
            const ang = (i * 73) % 360 * Math.PI / 180, d = 140 + u * 260;
            return i % 2 ? <rect key={i} x={540 + Math.cos(ang) * d - 12} y={905 + Math.sin(ang) * d * 0.5 - 12} width={24} height={24} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity={1 - u} transform={`rotate(${u * 200} ${540 + Math.cos(ang) * d} ${905 + Math.sin(ang) * d * 0.5})`} />
              : <circle key={i} cx={540 + Math.cos(ang) * d} cy={905 + Math.sin(ang) * d * 0.5} r={14} fill={KC.mint} stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · por dentro de la goma: cadenas de polímero (lista de la FDA) */}
      <Escena T={T} a={K.Re} b={K.Pe}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #1b2440 0%, #0E0F12 75%)' }}></div>
        {svg(<>
          <circle cx={540} cy={900} r={330} fill="rgba(165,158,166,.18)" stroke={CH_GRIS} strokeWidth={6} strokeDasharray="16 12" />
          {[[1, 420, 760, KC.cyan], [2, 640, 820, KC.cyan], [3, 500, 980, KC.yellow], [4, 700, 1020, KC.yellow], [5, 380, 900, KC.cyan], [6, 600, 900, KC.yellow]].map(([s, x, y, c], i) =>
            <CadenaPolimero key={s} seed={s * 11} x={x} y={y} n={16} paso={24} color={c} p={kprog(T, K.Re + 0.2 + i * 0.25, K.Re + 1.6 + i * 0.25)} T={T} />)}
        </>)}
        <EscalaFija texto="esquema (moléculas, no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 3 · del petróleo: patente de Wrigley */}
      <Escena T={T} a={K.Pe} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <g transform={`translate(230 ${880 + Math.sin(T * 2) * 8})`}><path d="M 0 -140 Q 90 -10 90 50 Q 90 130 0 130 Q -90 130 -90 50 Q -90 -10 0 -140 Z" fill="#1d1a1f" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={-30} cy={30} rx={18} ry={34} fill="#fff" opacity=".25" /></g>
          <text x={230} y={1070} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>petróleo</text>
          <CadenaPolimero seed={77} x={330} y={860} n={12} paso={22} color={KC.cyan} p={kprog(T, K.Pe + 0.4, K.Pe + 2.0)} T={T} />
        </>)}
        {kvisible(T, K.Pe + 1.2, K.P - 0.2) && (() => { const e = kentrada(T, K.Pe + 1.2, K.P - 0.2, 'pop'); return (
          <div style={{ position:'absolute', left:430, top:600, width:500, zIndex:30, transform:`rotate(3deg) scale(${e.s})`, opacity:e.o, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:16, padding:'24px 28px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
            <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a' }}>US 10,492,512 B2 · Wrigley</div>
            <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink, margin:'10px 0 16px' }}>Chewing gum base…</div>
            {[0, 1, 2].map((i) => <div key={i} style={{ height:12, background:'#cfc6b6', borderRadius:6, margin:'10px 0', width:`${92 - i * 9}%` }}></div>)}
            <div style={{ font:`700 28px/1.3 ${KF.mono}`, color:KC.ink, background:`linear-gradient(transparent 55%, ${KC.yellow} 55%)`, backgroundSize:`${kprog(T, K.Pe + 2.2, K.Pe + 3.4) * 100}% 100%`, backgroundRepeat:'no-repeat' }}>"man-made polymers derived from petroleum"</div>
            {[0, 1].map((i) => <div key={'b' + i} style={{ height:12, background:'#cfc6b6', borderRadius:6, margin:'12px 0 0', width:`${85 - i * 20}%` }}></div>)}
          </div>); })()}
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cz} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <ChicleAplastado x={290} y={1130} s={0.9} gris={0.6} /></>)}
      </Escena>
      {/* 5 · el chicle original: látex del chicozapote */}
      <Escena T={T} a={K.Cz} b={K.Si}>
        <FondoLunares color={KC.mint} />
        {svg(<><Chicozapote T={T} cortes={kprog(T, K.Cz + 1.6, K.Cz + 3.6)} latex={kprog(T, K.Cz + 3.6, K.Cz + 5.0)} />
          <Paila T={T} x={780} y={1080} o={kprog(T, K.Cz + 5.0, K.Cz + 5.5)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · 1880s–1950s: exportación; luego los sintéticos */}
      <Escena T={T} a={K.Si} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <path d={`M 0 ${1060 + Math.sin(T * 2) * 6} Q 270 ${1040 - Math.sin(T * 2) * 6} 540 1060 T 1080 1060 L 1080 1200 L 0 1200 Z`} fill="#2f8fd8" stroke={KC.ink} strokeWidth={6} />
          <g opacity={1 - kprog(T, K.Si + 2.8, K.Si + 3.4)}><Barco x={klerp(250, 760, kprog(T, K.Si + 0.3, K.Si + 3.2, kEase.suave))} y={1040} carga={3} /></g>
          <g opacity={kprog(T, K.Si + 2.8, K.Si + 3.4)}><Fabrica x={330} y={1040} T={T} s={1.1} /></g>
          <line x1={100} y1={760} x2={980} y2={760} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          <line x1={100} y1={760} x2={100 + 880 * kprog(T, K.Si + 0.2, K.Si + 2.6)} y2={760} stroke={KC.yellow} strokeWidth={14} strokeLinecap="round" />
          <text x={120} y={730} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>1880s</text>
          <text x={960} y={730} textAnchor="end" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Si + 2.0, K.Si + 2.6)}>1950s</text>
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · estudio de Valencia (2020): bacterias en el chicle tirado */}
      <Escena T={T} a={K.Es} b={K.B}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #1d2238 0%, #0E0F12 75%)' }}></div>
        {svg(<>
          <ellipse cx={540} cy={960} rx={330} ry={260} fill="rgba(165,158,166,.25)" stroke={CH_GRIS} strokeWidth={6} />
          {estr.map((b, i) => <Estrepto key={i} x={b.x} y={b.y} rot={b.a} T={T} seed={i} o={kprog(T, K.Es + 2.0, K.Es + 2.4) * (i < 3 ? 1 - 0.55 * sem : 1 - sem)} />)}
          {sph.map((b, i) => { const v = kprog(T, K.Es + 2.4 + b.t * 3.6, K.Es + 2.9 + b.t * 3.6, kEase.sale); return v > 0 ? <Bacteria key={i} x={b.x} y={b.y} rot={b.a} s={0.5 * v} color={KC.yellow} T={T} seed={i} flagelo={false} /> : null; })}
        </>)}
        <TarjetaEstudio T={T} at={K.Es + 0.1} until={K.Es + 2.0} anio="2020" quien="Universitat de València" revista="Scientific Reports · chicles de 5 países" y={880} />
        <Etq T={T} at={K.Es + 2.6} until={K.B - 0.2} x={150} y={650} texto="de tu boca (Streptococcus)" it lado="der" tam={28} color={KC.lilac} />
        <Etq T={T} at={K.Es + 4.2} until={K.B - 0.2} x={830} y={1215} texto="del ambiente (Sphingomonas)" it lado="izq" tam={28} color={KC.yellow} />
        {T >= K.Es + 2.2 && T < K.B + 0.3 && <Chip T={T} at={K.Es + 2.2} until={K.B - 0.2} texto={`semana ${Math.max(1, Math.round(1 + sem * 8))}`} x={540} y={560} tam={40} borde={KC.mint} mono />}
        <EscalaFija texto="al microscopio · esquema" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 8 · la banqueta llena de manchas; la limpieza */}
      <Escena T={T} a={K.B} b={K.Ch}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Banqueta T={T} manchas={26} limpio={kprog(T, K.B + 2.4, K.B + 5.5)} />
          {kprog(T, K.B + 2.2, K.B + 2.6) > 0 && <g opacity={kprog(T, K.B + 2.2, K.B + 2.6)}>
            <line x1={1020} y1={600} x2={760} y2={900} stroke="#444" strokeWidth={22} strokeLinecap="round" />
            <rect x={990} y={560} width={70} height={90} rx={12} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 14 }, (_, i) => { const u = ((T * 2.2 + i / 14) % 1); return <circle key={i} cx={760 - u * 160 + Math.sin(i * 7) * 30 * u} cy={900 + u * 140 + Math.cos(i * 5) * 20 * u} r={6 + 4 * u} fill="#bfe7ff" stroke="#2f8fd8" strokeWidth={2} opacity={1 - u} />; })}
          </g>}</>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · Quintana Roo y Campeche: cooperativas de chicleros */}
      <Escena T={T} a={K.Ch} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <MapaMexico x={-2540} y={-699} ancho={4500} />
          {[[-89.6, 18.4, 0.0], [-89.2, 18.9, 0.3], [-88.6, 19.4, 0.6], [-88.2, 18.7, 0.9], [-90.2, 18.1, 1.2], [-89.9, 19.0, 1.5]].map(([lo, la, d], i) => { const [px, py] = PX(lo, la); const v = kprog(T, K.Ch + 0.5 + d, K.Ch + 0.9 + d, kEase.rebote);
            return <g key={i} transform={`translate(${px} ${py}) scale(${v})`}><rect x={-6} y={-10} width={12} height={34} fill="#8a5a36" stroke={KC.ink} strokeWidth={3} /><circle cy={-22} r={24} fill="#2e9b4a" stroke={KC.ink} strokeWidth={4} /></g>; })}
        </>)}
        <Etq T={T} at={K.Ch + 1.0} until={K.C - 0.2} x={PX(-88.1, 19.6)[0] + 10} y={PX(-88.1, 19.6)[1]} texto="Quintana Roo" tam={30} color={KC.ink} />
        <Etq T={T} at={K.Ch + 1.6} until={K.C - 0.2} x={PX(-90.4, 19.2)[0] - 10} y={PX(-90.4, 19.2)[1]} texto="Campeche" lado="izq" tam={30} color={KC.ink} />
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: la misma banqueta, ahora con el chicle natural al lado */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Banqueta T={T} manchas={6} /><ChicleAplastado x={380} y={1070} s={1.2} gris={0.5} />
          <Tenis x={380} y={1060} lift={liftC} hilos={kprog(T, K.C + 0.05, K.C + 1.0)} gris={0.5} />
          <Marqueta x={800} y={1080} s={1.4 * kprog(T, K.C + 1.4, K.C + 1.9, kEase.rebote)} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.9} until={K.Ma - 0.2} texto="¿chicle?" x={300} y={560} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.G + 2.0} until={K.Ma - 0.2} texto="plástico*" x={300} y={660} tam={46} borde={KC.red} />
      <Etq T={T} at={K.G + 2.6} until={K.Ma - 0.2} x={500} y={1130} texto="*su goma" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ma + 0.8} until={K.Re - 0.2} texto="azúcar y sabor: se disuelven" x={540} y={470} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.Ma + 2.6} until={K.Re - 0.2} x={680} y={905} texto="goma base" tam={32} color={KC.texto} />
      <Chip T={T} at={K.Re + 0.3} until={K.Pe - 0.2} texto="FDA · 21 CFR 172.615" x={330} y={480} tam={30} borde={KC.gold} mono />
      <Chip T={T} at={K.Re + 1.4} until={K.Pe - 0.2} texto="acetato de polivinilo" x={360} y={580} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Re + 2.6} until={K.Pe - 0.2} texto="poliisobutileno" x={330} y={680} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.Cz + 0.3} until={K.Si - 0.2} texto="el original: látex" x={330} y={470} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.Cz + 0.8} until={K.Si - 0.2} x={410} y={760} texto="chicozapote" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cz + 1.2} until={K.Si - 0.2} x={410} y={810} texto="Manilkara zapota" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Cz + 2.6} until={K.Si - 0.2} x={410} y={990} texto="cortes en zigzag" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Cz + 5.4} until={K.Si - 0.2} x={780} y={1180} texto="paila" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Si + 0.4} until={K.Si + 2.8} texto="gran exportación" x={760} y={850} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Si + 3.0} until={K.Es - 0.2} texto="sintéticos, más baratos" x={760} y={850} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.B + 1.6} until={K.Ch - 0.2} valor={7} dur={1.0} prefijo="≈ £" sufijo=" millones" etiqueta="limpiar chicles, al año" x={640} y={560} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.B + 2.4} until={K.Ch - 0.2} texto="Reino Unido · estimado de 2022" x={640} y={680} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.4} until={K.Ch - 0.2} x={120} y={1180} texto="la goma se queda" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ch + 2.4} until={K.C - 0.2} texto="cooperativas de chicleros" x={540} y={1150} tam={36} borde={KC.leaf} />
      <Etq T={T} at={K.C + 1.0} until={K.Ou - 0.1} x={60} y={975} texto="goma de polímeros" tam={30} color={KC.ink} />
      <Etq T={T} at={K.C + 1.9} until={K.Ou - 0.1} x={880} y={1180} texto="chicle de chicozapote" lado="izq" tam={28} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="Ese chicle no es chicle: *es plástico.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.Re - 0.1} texto="El azúcar se va. *Queda la goma.*" />
      <Subtitulo T={T} idx={2} at={K.Re + 0.1} until={K.Pe - 0.1} texto="Permitidos: *acetato de polivinilo…*" />
      <Subtitulo T={T} idx={3} at={K.Pe + 0.1} until={K.P - 0.1} texto="Polímeros *del petróleo.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Cz - 0.1} texto="¿Por qué *le decimos chicle?*" />
      <Subtitulo T={T} idx={5} at={K.Cz + 0.1} until={K.Si - 0.1} texto="Látex del *chicozapote.*" />
      <Subtitulo T={T} idx={6} at={K.Si + 0.1} until={K.Es - 0.1} texto="Luego ganaron *los sintéticos.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.B - 0.1} texto="Valencia, 2020: *llegan bacterias del ambiente.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.Ch - 0.1} texto="La goma *se queda.*" />
      <Subtitulo T={T} idx={9} at={K.Ch + 0.1} until={K.C - 0.1} texto="Quintana Roo y Campeche: *chicleros.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es chicle. *Es plástico.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Receta + 1.0, CUES.Receta + 4.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Chicozapote + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Chicozapote + 3.0, CUES.Sinteticos - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Sinteticos + 2.6, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Banqueta - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Banqueta + 2.0, CUES.Chicleros - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Chicleros + 1.4, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="24" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChicleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ChicleShot /></CompositionStage></div>;
}
window.ChicleApp = ChicleApp;
