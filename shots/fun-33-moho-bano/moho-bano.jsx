// Shot Fungi Mati #33 · Esa mancha negra del baño no es mugre: es moho — NARRADO (gancho 1 "Esto no es X: es Y" + N2 "qué sí sirve").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const MB = { azulejo:'#f6fbfc', junta:'#c9d3d6', silicon:'#f1f0ea', moho:'#1d1a17', moho2:'#3b3a2c', oliva:'#6f5f2c', oliva2:'#8a7a3c', rosa:'#f2557a', rosa2:'#ff9a8a', agua:'#9ad7ff', tabla:'#e9e2cf', stachy:'#26301f' };
const MURO = { x0: 60, x1: 1020, y0: 360, y1: 1160, paso: 120 };

// Manchas de moho a lo largo de las juntas (más abajo, donde se junta el agua) y del silicón.
const MANCHAS = (() => {
  const g = krng(33), out = [];
  for (let i = 0; i < 220; i++) {
    const enSilicon = g() < 0.35;
    if (enSilicon) { out.push({ x: klerp(MURO.x0 + 10, MURO.x1 - 10, g()), y: MURO.y1 + 2 + (g() - 0.5) * 14, r: 4 + g() * 8, c: g(), u: g() }); continue; }
    const fila = 4 + Math.floor(g() * 3); // juntas horizontales de abajo
    if (g() < 0.55) out.push({ x: klerp(MURO.x0, MURO.x1, g()), y: MURO.y0 + fila * MURO.paso + (g() - 0.5) * 10, r: 3 + g() * 6, c: g(), u: g() });
    else { const col = 1 + Math.floor(g() * 7); out.push({ x: MURO.x0 + col * MURO.paso + (g() - 0.5) * 10, y: klerp(MURO.y0 + 4 * MURO.paso, MURO.y1, g()), r: 3 + g() * 6, c: g(), u: g() }); }
  }
  return out;
})();

// Ventilador / extractor de baño.
function Extractor({ T, x, y, gira = 0, r = 70 }) {
  const a = T * 720 * gira;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-r - 14} y={-r - 14} width={2 * r + 28} height={2 * r + 28} rx={18} fill="#e7ecef" stroke={KC.ink} strokeWidth={6} />
    <circle r={r} fill="#cfd8dc" stroke={KC.ink} strokeWidth={5} />
    <g transform={`rotate(${a})`}>{[0, 90, 180, 270].map((k) => <path key={k} d="M 0 0 Q 20 -30 8 -60 Q -14 -40 0 0 Z" transform={`rotate(${k})`} fill="#9aa7ad" stroke={KC.ink} strokeWidth={3} />)}</g>
    <circle r={12} fill="#7c878c" stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// La pared de la regadera: azulejos, juntas, silicón, jabonera y el moho. moho 0..1 · rosa 0..1 · limpio 0..1 · gira = extractor.
function Regadera({ T, moho = 1, rosa = 0, limpio = 0, gira = 0, gotas = 1 }) {
  const { x0, x1, y0, y1, paso } = MURO;
  const cols = Math.round((x1 - x0) / paso), filas = Math.round((y1 - y0) / paso);
  const vis = moho * (1 - limpio);
  return <g>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={MB.junta} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols); return <rect key={i} x={x0 + c * paso + 5} y={y0 + f * paso + 5} width={paso - 10} height={paso - 10} rx={6} fill={MB.azulejo} />; })}
    {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols); return <rect key={'b' + i} x={x0 + c * paso + 16} y={y0 + f * paso + 14} width={30} height={8} rx={4} fill="#fff" />; })}
    {/* gotas que escurren */}
    {gotas > 0 && [[250, 0.0], [520, 0.4], [760, 0.9], [900, 0.2]].map(([x, f], i) => { const u = ((T * 0.18 + f) % 1); return <ellipse key={i} cx={x} cy={klerp(y0 + 300, y1 - 20, u)} rx={9} ry={13} fill={MB.agua} stroke={KC.ink} strokeWidth={2.5} opacity={gotas * 0.85} />; })}
    {/* moho en las juntas */}
    {MANCHAS.map((m, i) => { const o = kclamp(vis * 1.4 - m.u * 0.4, 0, 1); return o > 0.02 ? <circle key={i} cx={m.x} cy={m.y} r={m.r * (0.6 + 0.4 * o)} fill={m.c < 0.7 ? MB.moho : MB.moho2} opacity={0.9 * o} /> : null; })}
    {/* silicón y tina */}
    <rect x={x0} y={y1 - 6} width={x1 - x0} height={22} rx={11} fill={MB.silicon} opacity={0.9} />
    {MANCHAS.filter((m) => m.y > y1 - 12).map((m, i) => { const o = kclamp(vis * 1.4 - m.u * 0.4, 0, 1); return o > 0.02 ? <circle key={'s' + i} cx={m.x} cy={m.y + 4} r={m.r * 0.8} fill={MB.moho} opacity={0.85 * o} /> : null; })}
    <rect x={-10} y={y1 + 16} width={KW + 20} height={KH} fill="#dfe9ec" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <line key={'p' + i} x1={i * 135} y1={y1 + 136} x2={i * 135 - 60} y2={KH} stroke="#c3d0d4" strokeWidth={6} />)}
    <rect x={-10} y={y1 + 16} width={KW + 20} height={120} rx={30} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    {/* mancha rosa en la esquina */}
    {rosa > 0 && <g opacity={rosa}>
      <path d={`M ${x1 - 150} ${y1 + 14} Q ${x1 - 140} ${y1 - 70} ${x1 - 60} ${y1 - 90} Q ${x1 + 4} ${y1 - 80} ${x1 - 6} ${y1 + 14} Z`} fill={MB.rosa2} opacity=".8" />
      <path d={`M ${x1 - 110} ${y1 + 14} Q ${x1 - 100} ${y1 - 30} ${x1 - 50} ${y1 - 46} Q ${x1 - 8} ${y1 - 40} ${x1 - 6} ${y1 + 14} Z`} fill={MB.rosa} opacity=".85" />
    </g>}
    {/* jabonera */}
    <g transform="translate(250 800)">
      <path d="M -90 0 L 90 0 L 70 34 L -70 34 Z" fill="#dfe6ea" stroke={KC.ink} strokeWidth={6} />
      <rect x={-60} y={-40} width={120} height={46} rx={20} fill="#ffd36e" stroke={KC.ink} strokeWidth={6} />
      <rect x={-44} y={-32} width={40} height={10} rx={5} fill="#fff" opacity=".6" />
    </g>
    <Extractor T={T} x={190} y={470} gira={gira} r={60} />
  </g>;
}

// Esporas que flotan (puntitos oliva).
function Esporas({ T, n = 34, seed = 7, o = 1, color = MB.oliva, area = [0, 340, KW, 1200] }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => {
    const px = g(), py = g(), v = 0.5 + g(), f = g() * 9;
    const x = area[0] + ((px * area[2] + T * 26 * v) % area[2]), y = area[1] + py * (area[3] - area[1]) + mece(T, f, 0.2) * 30;
    return <ellipse key={i} cx={x} cy={y} rx={7} ry={10} transform={`rotate(${f * 40} ${x} ${y})`} fill={color} stroke={KC.ink} strokeWidth={2} />;
  })}</g>;
}

// Conidióforo de Cladosporium: tallo erguido y cadenas ramificadas de conidios con forma de limón, color oliva-café.
function Cladosporium({ x, y, s = 1, crece = 1, seed = 2, T = 0 }) {
  if (crece <= 0) return null;
  const g = krng(seed), H = 340 * kEase.sale(kclamp(crece * 1.6, 0, 1));
  const conidios = [];
  const rama = (cx, cy, ang, n, tam, nivel, d0) => {
    let px = cx, py = cy;
    for (let k = 0; k < n; k++) {
      const orden = d0 + k; if (orden / 14 > kclamp(crece * 1.4 - 0.25, 0, 1)) return;
      const L = tam * 2.1; px += Math.cos(ang) * L; py += Math.sin(ang) * L;
      conidios.push(<ellipse key={conidios.length} cx={px} cy={py} rx={tam} ry={tam * 0.62} transform={`rotate(${ang * 180 / Math.PI} ${px} ${py})`} fill={k % 2 ? MB.oliva2 : MB.oliva} stroke={KC.ink} strokeWidth={3} />);
      if (nivel < 2 && k === 1) rama(px, py, ang + (g() < 0.5 ? -0.55 : 0.55), n - 1, tam * 0.85, nivel + 1, orden + 1);
      ang += (g() - 0.5) * 0.25; tam *= 0.9;
    }
  };
  if (crece > 0.3) { rama(0, -H, -Math.PI / 2 - 0.55, 5, 30, 0, 0); rama(0, -H, -Math.PI / 2 + 0.5, 5, 30, 0, 1); rama(0, -H, -Math.PI / 2, 4, 27, 1, 2); }
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.2 + seed) * 4}) scale(${s})`}>
    <path d={`M -10 0 Q -14 ${-H * 0.5} -6 ${-H} L 6 ${-H} Q 14 ${-H * 0.5} 10 0 Z`} fill="#4f4422" stroke={KC.ink} strokeWidth={4} />
    {[0.3, 0.6].map((f, i) => H > 100 && <line key={i} x1={-10} y1={-H * f} x2={10} y2={-H * f} stroke={KC.ink} strokeWidth={3} />)}
    {conidios}
  </g>;
}

// Muro de tablaroca con una fuga y Stachybotrys (mancha verde-negra) que crece.
function Tablaroca({ T, x, y, crece = 0 }) {
  const g = krng(5), pts = Array.from({ length: 90 }, () => ({ a: g() * Math.PI * 2, d: Math.sqrt(g()), r: 6 + g() * 14, u: g() }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={600} height={640} fill={MB.tabla} stroke={KC.ink} strokeWidth={8} />
    <line x1={300} y1={0} x2={300} y2={640} stroke="#cfc6ae" strokeWidth={5} />
    <rect x={-20} y={-60} width={640} height={60} fill="#9aa3ad" stroke={KC.ink} strokeWidth={7} />
    <circle cx={180} cy={-30} r={18} fill={MB.agua} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={200} cy={330} rx={190} ry={250} fill="#cdbf98" opacity=".55" />
    {pts.map((p, i) => { const o = kclamp(crece * 1.5 - p.u * 0.5, 0, 1); return o > 0.02 ? <circle key={i} cx={200 + Math.cos(p.a) * p.d * 150} cy={360 + Math.sin(p.a) * p.d * 200} r={p.r * (0.5 + 0.5 * o)} fill={i % 3 ? MB.stachy : '#3c4a2c'} opacity={0.9 * o} /> : null; })}
    {/* papel mojado en el piso */}
    <g transform="translate(360 560) rotate(-6)"><rect x={0} y={0} width={200} height={70} fill="#fdfbf3" stroke={KC.ink} strokeWidth={5} />
      {[18, 36, 54].map((yy) => <line key={yy} x1={16} y1={yy} x2={180} y2={yy} stroke="#b9c3cc" strokeWidth={4} />)}
      <ellipse cx={70} cy={40} rx={50 * crece} ry={22 * crece} fill={MB.stachy} opacity=".8" /></g>
  </g>;
}

// Cara de perfil con nariz (para alergia).
function Cara({ T, x, y, estornudo = 0 }) {
  const sac = Math.sin(kclamp(estornudo, 0, 1) * Math.PI) * 14;
  return <g transform={`translate(${x + sac} ${y})`}>
    <circle r={210} fill="#f2c29b" stroke={KC.ink} strokeWidth={8} />
    <path d="M 190 -40 Q 290 20 200 60 Z" fill="#f2c29b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={205} cy={45} r={7} fill={KC.ink} />
    <path d={estornudo > 0.3 && estornudo < 0.9 ? 'M 60 -70 L 120 -60' : 'M 60 -80 Q 95 -100 125 -78'} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M 110 110 Q 150 125 180 105" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -200 -60 Q -200 -230 0 -215 Q 160 -210 190 -120 Q 90 -170 -40 -150 Q -150 -140 -200 -60 Z" fill="#3a2a1e" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Inhalador (asma).
function Inhalador({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-15)`}>
    <rect x={-40} y={-120} width={80} height={150} rx={20} fill="#4aa3ff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 10 L -40 60 L 70 60 L 70 20 L 40 10 Z" fill="#dfe6ea" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

// Higrómetro de carátula.
function Higrometro({ x, y, valor = 80, r = 150 }) {
  const ang = klerp(-120, 120, valor / 100);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${r * 0.78 * Math.sin(-Math.PI * 2 / 3 * 0 + (-120 + 0.6 * 240) * Math.PI / 180)} ${-r * 0.78 * Math.cos((-120 + 0.6 * 240) * Math.PI / 180)} A ${r * 0.78} ${r * 0.78} 0 0 1 ${r * 0.78 * Math.sin(120 * Math.PI / 180)} ${-r * 0.78 * Math.cos(120 * Math.PI / 180)}`} stroke={KC.red} strokeWidth={14} fill="none" />
    <path d={`M ${r * 0.78 * Math.sin(-120 * Math.PI / 180)} ${-r * 0.78 * Math.cos(-120 * Math.PI / 180)} A ${r * 0.78} ${r * 0.78} 0 0 1 0 ${-r * 0.78}`} stroke={KC.leaf} strokeWidth={14} fill="none" />
    {[0, 25, 50, 75, 100].map((v) => { const a = klerp(-120, 120, v / 100) * Math.PI / 180; return <g key={v}><line x1={Math.sin(a) * r * 0.86} y1={-Math.cos(a) * r * 0.86} x2={Math.sin(a) * r * 0.96} y2={-Math.cos(a) * r * 0.96} stroke={KC.ink} strokeWidth={5} />
      <text x={Math.sin(a) * r * 0.6} y={-Math.cos(a) * r * 0.6 + 10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>; })}
    <line x1={0} y1={0} x2={Math.sin(ang * Math.PI / 180) * r * 0.82} y2={-Math.cos(ang * Math.PI / 180) * r * 0.82} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <circle r={14} fill={KC.ink} />
    <text y={r * 0.55} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>% HR</text>
  </g>;
}

// Cepillo que talla.
function Cepillo({ x, y, rot = -20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-110} y={-36} width={220} height={52} rx={22} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-120} width={80} height={86} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-96 + i * 21} y1={16} x2={-96 + i * 21} y2={46} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}

// Esponja.
function Esponja({ x, y }) {
  return <g transform={`translate(${x} ${y}) rotate(-8)`}>
    <rect x={-80} y={-46} width={160} height={92} rx={20} fill="#ffe11a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={14} width={160} height={32} rx={12} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    {[[-40, -20], [10, -26], [40, -6], [-14, -2]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill="#e2c400" />)}
  </g>;
}

// Mancha simple (para el "todo moho se trata igual").
function Mancha({ x, y, r = 70, color, seed = 1, s = 1 }) {
  const g = krng(seed), n = 16;
  const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (0.75 + g() * 0.4); return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d={d} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={(g() - 0.5) * r * 1.2} cy={(g() - 0.5) * r * 1.2} r={4 + g() * 6} fill="rgba(255,255,255,.18)" />)}</g>;
}

function MohoBanoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Esporas, Cl: CUES.Cladosporium, R: CUES.Rosa, P: CUES.Pregunta, St: CUES.Stachybotrys, Mi: CUES.Mito, Al: CUES.Alergia, Es: CUES.Estudio, S: CUES.Sirve, Ta: CUES.Tallar, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // esponja del gancho: talla de ida y vuelta sobre la junta y la mancha no se va
  const esp = kprog(T, K.G + 0.15, K.G + 2.0);
  const bur = kprog(T, K.G + 2.6, K.G + 4.3);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la mancha negra de la regadera; la esponja no la quita */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Regadera T={T} moho={klerp(0.85, 1, kprog(T, K.G, K.E))} />
          {esp > 0 && esp < 1 && <Esponja x={klerp(220, 760, 0.5 - 0.5 * Math.cos(esp * Math.PI * 3))} y={MURO.y0 + 5 * MURO.paso + 10} />}
          {bur > 0 && Array.from({ length: 7 }, (_, i) => { const u = kclamp(bur * 1.6 - i * 0.09, 0, 1); if (u <= 0 || u >= 1) return null; const x = klerp(250, 330 + i * 80, u), y = klerp(760, 960 + (i % 3) * 60, u) - Math.sin(u * Math.PI) * 120; return <circle key={i} cx={x} cy={y} r={26 * (1 - u * 0.7)} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={3} />; })}
          <Sello T={T} at={K.G + 2.4} x={300} y={640} texto="MOHO" color={KC.ink} r={105} />
        </>)}
      </Escena>
      {/* 2 · esporas en el aire: solo germinan donde hay agua */}
      <Escena T={T} a={K.E} b={K.Cl} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Regadera T={T} moho={0.25} gotas={0} />
          {[[300, 1040], [520, 1100], [700, 1020], [880, 1110]].map(([x, y], i) => { const g = kprog(T, K.E + 1.6 + i * 0.25, K.E + 3.4 + i * 0.25); return <g key={i}>
            <ellipse cx={x} cy={y} rx={34} ry={22} fill={MB.agua} stroke={KC.ink} strokeWidth={3} opacity=".9" />
            {g > 0 && <ellipse cx={x} cy={y - 4} rx={8} ry={11} fill={MB.oliva} stroke={KC.ink} strokeWidth={2} />}
            {g > 0 && [-0.9, -0.2, 0.6, 1.4, 2.4].map((a, k) => <line key={k} x1={x} y1={y - 4} x2={x + Math.cos(a) * 70 * g} y2={y - 4 + Math.sin(a) * 50 * g} stroke={MB.moho} strokeWidth={4} strokeLinecap="round" />)}
          </g>; })}
          <Esporas T={T} n={36} o={kprog(T, K.E - 0.3, K.E + 0.6)} area={[0, 340, KW, 1150]} />
          {/* esporas que caen en seco y no hacen nada */}
          {[[420, 620], [820, 700]].map(([x, y], i) => <g key={i} opacity={kprog(T, K.E + 2.4, K.E + 2.8)}><ellipse cx={x} cy={y} rx={8} ry={11} fill={MB.oliva} stroke={KC.ink} strokeWidth={2} /><path d={`M ${x - 26} ${y - 26} L ${x + 26} ${y + 26} M ${x + 26} ${y - 26} L ${x - 26} ${y + 26}`} stroke={KC.red} strokeWidth={6} strokeLinecap="round" /></g>)}
        </>)}
      </Escena>
      {/* 3 · al microscopio: Cladosporium (oliva-café) */}
      <Escena T={T} a={K.Cl} b={K.R} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <path d="M 0 1180 Q 300 1150 540 1175 T 1080 1170 L 1080 1300 L 0 1300 Z" fill="#2a2f3a" stroke={KC.ink} strokeWidth={6} />
          <Cladosporium T={T} x={330} y={1180} s={1.2} crece={kprog(T, K.Cl + 0.2, K.Cl + 3.2)} seed={2} />
          <Cladosporium T={T} x={760} y={1185} s={1.15} crece={kprog(T, K.Cl + 1.0, K.Cl + 4.0)} seed={9} />
          <Cladosporium T={T} x={560} y={1190} s={0.85} crece={kprog(T, K.Cl + 1.8, K.Cl + 4.6)} seed={4} />
        </>)}
      </Escena>
      {/* 4 · la mancha rosa: Serratia marcescens (bacteria) */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.04} origen="80% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Regadera T={T} moho={0.6} rosa={kprog(T, K.R + 0.2, K.R + 1.0)} />
          {(() => { const z = kprog(T, K.R + 1.2, K.R + 1.8, kEase.sale); return z > 0 ? <g opacity={z}>
            <line x1={940} y1={1110} x2={420} y2={860} stroke={KC.white} strokeWidth={6} strokeDasharray="14 10" />
            <circle cx={340} cy={820} r={230 * z} fill={KC.noche} stroke={KC.white} strokeWidth={12} />
            <clipPath id="lupaRosa"><circle cx={340} cy={820} r={222 * z} /></clipPath>
            <g clipPath="url(#lupaRosa)">
              <rect x={100} y={580} width={480} height={480} fill="rgba(242,85,122,.18)" />
              {Array.from({ length: 11 }, (_, i) => { const g = krng(40 + i); return <Bacteria key={i} T={T} seed={i} x={200 + g() * 290} y={660 + g() * 320} rot={g() * 180} s={0.62} color={i % 3 ? '#e8335a' : '#ff6f61'} flagelo={false} />; })}
            </g>
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿el famoso moho negro tóxico? */}
      <Escena T={T} a={K.P} b={K.St} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={270} y={1180} />
          <g transform={`translate(540 ${430 + Math.sin(T * 14) * 3}) rotate(${Math.sin(T * 9) * 1.5})`} opacity={kprog(T, K.P, K.P + 0.3)}>
            <text textAnchor="middle" style={{ font:`400 118px ${KF.titulo}` }} fill="#9be15d" stroke={KC.ink} strokeWidth={10} paintOrder="stroke">MOHO NEGRO TÓXICO</text>
            {[-300, -120, 80, 260].map((dx, i) => <path key={i} d={`M ${dx} 10 Q ${dx + 8} ${40 + 30 * ((T * 0.8 + i * 0.3) % 1)} ${dx} ${60 + 40 * ((T * 0.8 + i * 0.3) % 1)}`} stroke="#9be15d" strokeWidth={12} strokeLinecap="round" fill="none" />)}
          </g>
        </>)}
      </Escena>
      {/* 6 · Stachybotrys: tablaroca y papel siempre mojados */}
      <Escena T={T} a={K.St} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Tablaroca T={T} x={70} y={560} crece={kprog(T, K.St + 0.6, K.St + 4.0)} />
          <Goteo T={T} x={250} y0={540} y1={1180} cada={0.45} color={MB.agua} desde={K.St - 0.4} r={12} />
        </>)}
      </Escena>
      {/* 7 · el mito tachado: todo moho se trata igual */}
      <Escena T={T} a={K.Mi} b={K.Al} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {[[200, MB.moho, 1], [540, MB.stachy, 2], [880, '#6b7378', 3]].map(([x, c, sd], i) => <Mancha key={i} x={x} y={1080} r={78} color={c} seed={sd} s={kprog(T, K.Mi + 2.6 + i * 0.25, K.Mi + 3.0 + i * 0.25, kEase.rebote)} />)}
          {[370, 710].map((x, i) => <text key={i} x={x} y={1110} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Mi + 3.4 + i * 0.2, K.Mi + 3.7 + i * 0.2)}>=</text>)}
        </>)}
      </Escena>
      {/* 8 · alergia y asma */}
      <Escena T={T} a={K.Al} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cara T={T} x={300} y={940} estornudo={kprog(T, K.Al + 1.5, K.Al + 2.3)} />
          {(() => { const g = krng(12); return Array.from({ length: 14 }, (_, i) => { const d = g(), u = ((T - K.Al) * 0.35 + d) % 1; return <ellipse key={i} cx={klerp(1060, 510, u)} cy={klerp(780 + g() * 300, 985, u)} rx={7} ry={10} fill={MB.oliva} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.Al, K.Al + 0.4)} />; }); })()}
          {kprog(T, K.Al + 1.6, K.Al + 2.4) > 0 && kprog(T, K.Al + 1.6, K.Al + 2.4) < 1 && <text x={700} y={1130} style={{ font:`400 96px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} paintOrder="stroke" transform={`rotate(-8 700 1130)`}>¡ACHÚ!</text>}
          {T > K.Al + 3.0 && <Inhalador x={760} y={1060} s={kprog(T, K.Al + 3.0, K.Al + 3.4, kEase.rebote)} />}
        </>)}
      </Escena>
      {/* 9 · el estudio de Osaka: con jabón crecen, en seco no */}
      <Escena T={T} a={K.Es} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Petri x={290} y={1010} r={200} medio="#f5e7b8">
            {[0, 1, 2, 3, 4].map((i) => <Colonia key={i} cx={[-70, 60, -20, 90, -100][i]} cy={[-60, -80, 50, 60, 70][i]} r={60 * kprog(T, K.Es + 2.4 + i * 0.2, K.Es + 4.6)} color={i % 2 ? '#3d3a2a' : MB.moho} seed={i + 3} />)}
            {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-140 + i * 55} cy={-140 + (i % 2) * 280} r={14} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={2} />)}
          </Petri>
          <Petri x={790} y={1010} r={200} medio="#efe3c8">
            {[[-120, -40, 80, 20], [-30, -150, 40, 30], [40, 60, 150, 10], [-100, 90, 0, 150]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#c8b48a" strokeWidth={4} />)}
            {[0, 1].map((i) => <Colonia key={i} cx={[-30, 50][i]} cy={[-20, 40][i]} r={10 * kprog(T, K.Es + 2.4, K.Es + 4.6)} color={MB.moho} seed={i + 9} />)}
          </Petri>
        </>)}
      </Escena>
      {/* 10 · lo que sí sirve: extractor, ventana y humedad abajo de 50 % */}
      <Escena T={T} a={K.S} b={K.Ta} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Regadera T={T} moho={0.6} gira={1} gotas={0} />
          {Array.from({ length: 8 }, (_, i) => { const u = ((T - K.S) * 0.5 + i / 8) % 1; return <circle key={i} cx={klerp(560 + (i % 4) * 90, 190, u)} cy={klerp(1000 - (i % 3) * 80, 470, u)} r={60 * (1 - u * 0.6)} fill="rgba(255,255,255,.75)" opacity={(1 - u) * kprog(T, K.S, K.S + 0.5) * (1 - kprog(T, K.S + 2.4, K.S + 2.9))} />; })}
          {T > K.S + 2.4 && <g opacity={kprog(T, K.S + 2.4, K.S + 2.9)}>
            <rect x={60} y={360} width={960} height={800} fill="rgba(255,225,26,.82)" />
            <Higrometro x={300} y={960} valor={klerp(80, 50, kprog(T, K.S + 2.7, K.S + 4.0, kEase.suave))} r={170} />
          </g>}
        </>)}
      </Escena>
      {/* 11 · tállalo: quitarlo, no solo matarlo */}
      <Escena T={T} a={K.Ta} b={K.C} zoom={0.04} origen="50% 60%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Regadera T={T} moho={0.6} limpio={kprog(T, K.Ta + 0.3, K.Ta + 3.8)} gotas={0} />
          {(() => { const u = kprog(T, K.Ta + 0.2, K.Ta + 3.8); return u > 0 && u < 1 ? <Cepillo x={klerp(160, 900, 0.5 - 0.5 * Math.cos(u * Math.PI * 5))} y={MURO.y0 + 5 * MURO.paso - 10} /> : null; })()}
          {(() => { const g = krng(77); return Array.from({ length: 12 }, (_, i) => { const t0 = K.Ta + 0.6 + g() * 3, u = kprog(T, t0, t0 + 2.2); if (u <= 0 || u >= 1) return null; const x = 160 + g() * 760, y = klerp(1000, 640, u);
            return <g key={i} opacity={Math.sin(u * Math.PI)}><ellipse cx={x} cy={y} rx={9} ry={12} fill="#8a8f99" stroke={KC.ink} strokeWidth={2} /><path d={`M ${x - 8} ${y - 8} L ${x + 8} ${y + 8} M ${x + 8} ${y - 8} L ${x - 8} ${y + 8}`} stroke={KC.ink} strokeWidth={3} /></g>; }); })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma regadera, limpia, seca y con el extractor encendido */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Regadera T={T} moho={0.6} limpio={1} gira={1} gotas={0} />
          <Sello T={T} at={K.C + 0.8} x={300} y={640} texto="SECO" color={KC.leaf} r={105} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.4} texto="¿mugre?" x={300} y={640} tam={56} />
      <Chip T={T} at={K.G + 2.8} until={K.E - 0.3} texto="se come los restos de jabón" x={380} y={1070} tam={30} borde={KC.yellow} />
      <Etq T={T} at={K.E + 0.6} until={K.Cl - 0.3} x={60} y={330} texto="esporas en el aire" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 2.0} until={K.Cl - 0.3} texto="sin agua, no crecen" x={360} y={560} tam={38} borde={KC.red} />
      <NumeroGigante T={T} at={K.Cl + 0.3} until={K.Cl + 2.8} valor={113} dur={1.2} etiqueta="muestras de baños · 2010" x={420} y={560} tam={200} color={KC.gold2} />
      <Chip T={T} at={K.Cl + 0.6} until={K.Cl + 2.8} texto="Países Bajos · Alemania · Austria" x={420} y={760} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.Cl + 3.0} until={K.R - 0.3} x={60} y={420} texto="Cladosporium" it tam={44} color={MB.oliva2} />
      <Etq T={T} at={K.Cl + 3.3} until={K.R - 0.3} x={60} y={480} texto="moho negro" tam={30} />
      <Chip T={T} at={K.Cl + 3.6} until={K.R - 0.3} texto="el más frecuente en cultivo directo" x={420} y={570} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.Cl + 2.4} until={K.R - 0.3} x={1040} y={820} lado="izq" texto="conidios en cadena" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.R + 1.8} until={K.P - 0.3} x={110} y={1110} texto="Serratia marcescens" it tam={36} color={KC.ink} />
      <Etq T={T} at={K.R + 2.2} until={K.P - 0.3} x={110} y={1160} texto="bacteria, no hongo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 2.6} until={K.P - 0.3} texto="pigmento: prodigiosina" x={340} y={530} tam={30} borde={MB.rosa} />
      <Etq T={T} at={K.St + 1.6} until={K.Mi - 0.3} x={70} y={430} texto="Stachybotrys chartarum" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.St + 2.2} until={K.Mi - 0.3} texto="celulosa + agua constante" x={360} y={1150} tam={30} borde={MB.stachy} />
      <Etq T={T} at={K.St + 2.6} until={K.Mi - 0.3} x={480} y={1060} texto="papel mojado" tam={26} color={KC.ink} />
      <MitoTachado T={T} at={K.Mi + 0.2} tacharEn={K.Mi + 1.6} until={K.Al - 0.3} texto="MÁS PELIGROSO QUE LOS DEMÁS" x={540} y={800} tam={40} />
      <Chip T={T} at={K.Mi + 1.4} until={K.Al - 0.3} texto="no hay prueba que lo ligue a síntomas (CDC)" x={540} y={900} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Mi + 3.6} until={K.Al - 0.3} texto="todo moho se trata igual" x={540} y={1190} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Al + 0.6} until={K.Es - 0.3} texto="alergia (si eres sensible)" x={340} y={480} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.Al + 3.0} until={K.Es - 0.3} texto="asma (si tienes asma y alergia)" x={340} y={570} tam={30} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.3} anio="2010" quien="Osaka, Japón" revista="Hamada y Abe · Biocontrol Science" y={560} />
      <Chip T={T} at={K.Es + 2.4} until={K.S - 0.3} texto="con jabón y champú" x={290} y={760} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.Es + 2.8} until={K.S - 0.3} texto="en seco" x={790} y={760} tam={28} borde={KC.red} />
      <Chip T={T} at={K.S + 0.5} until={K.S + 2.4} texto="✓ extractor" x={330} y={620} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.2} until={K.S + 2.4} texto="✓ ventana al bañarte" x={360} y={720} tam={36} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.S + 2.8} until={K.Ta - 0.3} valor={50} desde={80} dur={1.2} sufijo=" %" etiqueta="humedad: abajo de" x={760} y={1000} tam={150} color={KC.mint} />
      <Chip T={T} at={K.Ta + 0.8} until={K.C - 0.3} texto="quitarlo, no solo matarlo" x={370} y={560} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.Ta + 2.6} until={K.C - 0.3} texto="muerto, todavía puede dar alergia" x={420} y={1080} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="le sobra agua" x={620} y={900} tam={44} borde={KC.cyan} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Cl} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.Cl} until={K.R} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.St} until={K.Mi} texto="50 cm" largo={200} />
      <BarraEscala T={T} at={K.Mi} until={K.Al} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Al} until={K.Es} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Es} until={K.S} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.S} until={K.Ou} texto="10 cm" largo={100} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No es mugre: *es moho.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.Cl - 0.1} texto="Solo crece *donde hay humedad.*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.R - 0.1} texto="113 muestras de baños: *Cladosporium.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.P - 0.1} texto="¿La rosa? Muchas veces *es una bacteria.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.St - 0.1} texto="¿Y el *moho negro tóxico?*" />
      <Subtitulo T={T} idx={5} at={K.St + 0.1} until={K.Mi - 0.1} texto="Crece en *celulosa siempre mojada.*" />
      <Subtitulo T={T} idx={6} at={K.Mi + 0.1} until={K.Al - 0.1} texto="CDC: todo moho *se trata igual.*" />
      <Subtitulo T={T} idx={7} at={K.Al + 0.1} until={K.Es - 0.1} texto="Alergia, y asma *si eres alérgico.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.S - 0.1} texto="Comen jabón… *en seco crecen mal.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.Ta - 0.1} texto="Extractor, ventana y *humedad < 50 %.*" />
      <Subtitulo T={T} idx={10} at={K.Ta + 0.1} until={K.C - 0.1} texto="Quitarlo, *no solo matarlo.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="A tu baño *le sobra agua.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Cl + 3.0, K.R - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.R + 0.5, K.P - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.St + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mi + 0.5, K.Al - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Al + 0.6, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Es + 2.6, K.S - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S + 0.4, K.Ta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ta + 0.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="33" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MohoBanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MohoBanoShot /></CompositionStage></div>;
}
window.MohoBanoApp = MohoBanoApp;
