// Shot Químico #16 · Ese ceviche no está cocido (el limón desdobla proteínas, pero no esteriliza) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PEZ_CRUDO = '#f2a3a6', PEZ_BLANCO = '#fbf6ee', LIMA = '#7cc242', LIMA_OSC = '#3f8a1f', JUGO = '#e9f5b0', LARVA = '#f3ead6';

// ---------- piezas ----------
function Limon({ x, y, s = 1, rot = 0, apriete = 0 }) {
  const k = 1 - apriete * 0.12;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + apriete * 0.06)} ${s * k})`}>
    <path d="M -110 0 A 110 110 0 0 1 110 0 Z" fill={LIMA} stroke={KC.ink} strokeWidth={9} />
    <path d="M -92 0 A 92 92 0 0 1 92 0 Z" fill="#d9f08a" />
    {[-60, -25, 25, 60].map((a, i) => <line key={i} x1={0} y1={-4} x2={Math.sin(a * Math.PI / 180) * 86} y2={-Math.cos(a * Math.PI / 180) * 86} stroke="#a9d256" strokeWidth={6} />)}
    <rect x={-116} y={-6} width={232} height={14} rx={7} fill={LIMA_OSC} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tazón de ceviche: cubos de pescado (crudo → blanco), jitomate, cebolla morada y cilantro.
function Tazon({ T, x, y, s = 1, blanco = 0 }) {
  const R = krng(11);
  const cubos = Array.from({ length: 13 }, (_, i) => [(-230 + (i % 5) * 112 + (R() - 0.5) * 30) * (i >= 10 ? 0.7 : 1), -40 - Math.floor(i / 5) * 46 + (R() - 0.5) * 16, (R() - 0.5) * 40, 0.8 + R() * 0.35]);
  const pez = mixHex(PEZ_CRUDO, PEZ_BLANCO, blanco);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={250} rx={300} ry={40} fill="rgba(0,0,0,.18)" />
    <path d="M -380 -40 Q -360 230 0 250 Q 360 230 380 -40 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={11} />
    <path d="M -340 70 Q 0 120 340 70" stroke={KC.cyan} strokeWidth={16} fill="none" />
    <ellipse cx={0} cy={-40} rx={380} ry={80} fill={JUGO} stroke={KC.ink} strokeWidth={11} />
    {cubos.map(([cx, cy, r, k], i) => <g key={i} transform={`translate(${cx} ${cy + Math.sin(T * 2 + i) * 2}) rotate(${r}) scale(${k})`}>
      <rect x={-44} y={-34} width={88} height={68} rx={16} fill={pez} stroke={KC.ink} strokeWidth={6} opacity={0.75 + blanco * 0.25} />
      <path d="M -26 -14 Q 0 -24 26 -14" stroke={mixHex('#e07f86', '#e9dfcf', blanco)} strokeWidth={5} fill="none" />
    </g>)}
    {[[-150, -70], [120, -95], [210, -40]].map(([cx, cy], i) => <rect key={'j' + i} x={cx - 22} y={cy - 22} width={44} height={44} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 25} ${cx} ${cy})`} />)}
    {[[-60, -100], [60, -30], [-250, -30]].map(([cx, cy], i) => <path key={'c' + i} d={`M ${cx - 30} ${cy} q 30 -24 60 0`} stroke="#9b3fa8" strokeWidth={10} fill="none" strokeLinecap="round" />)}
    {[[-10, -60], [170, -70], [-200, -90], [90, -110]].map(([cx, cy], i) => <path key={'h' + i} d={`M ${cx} ${cy} l 14 -14 l 10 12 l 14 -10 l 0 18 z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Proteína esquemática: cordón de dos hebras trenzadas con cabecitas. abre 0 = enrollada como estambre, 1 = abierta.
function Cordon({ T, x, y, len = 560, abre = 0, s = 1, color = '#ff9fb0', color2 = '#ffd0a0', seed = 1, cargas = 0 }) {
  const N = 70, pts = (fase) => Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N, th = u * Math.PI * 7 + seed, r = 70 * (0.35 + 0.65 * Math.sin(u * Math.PI)) + 14 * Math.sin(u * 30 + fase);
    const bx = Math.cos(th) * r, by = Math.sin(th) * r * 0.85;
    const ex = -len / 2 + u * len, ey = 16 * Math.sin(u * 34 + fase) + 22 * Math.sin(u * 6 + T * 1.5 + seed);
    return [klerp(bx, ex, abre), klerp(by, ey, abre)];
  });
  const d = (p) => 'M ' + p.map(([a, b]) => a.toFixed(1) + ' ' + b.toFixed(1)).join(' L ');
  const A = pts(0), B = pts(Math.PI), fin = A[N];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d(A)} stroke={KC.ink} strokeWidth={17} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d(A)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d(B)} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d(B)} stroke={color2} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={fin[0] + 14} cy={fin[1] - 14} r={20} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={fin[0] + 20} cy={fin[1] + 18} r={18} fill={color2} stroke={KC.ink} strokeWidth={6} />
    {cargas > 0 && A.filter((_, i) => i % 7 === 3).map(([a, b], i) => <g key={i} opacity={kclamp(cargas * 8 - i, 0, 1)}>
      <circle cx={a} cy={b - 26} r={17} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
      <text x={a} y={b - 17} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>+</text></g>)}
  </g>;
}
// Fibras de músculo de fondo (lo micro).
function Fibras({ T, o = 1 }) {
  return <g opacity={o}>{[420, 640, 860, 1080, 1300, 1520].map((y, i) => <g key={i}>
    <rect x={-40} y={y - 80 + Math.sin(T * 0.6 + i) * 6} width={1160} height={160} rx={80} fill="rgba(255,150,170,.10)" stroke="rgba(255,170,190,.35)" strokeWidth={4} />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => <line key={k} x1={80 + k * 150} x2={80 + k * 150} y1={y - 70} y2={y + 70} stroke="rgba(255,170,190,.18)" strokeWidth={4} />)}</g>)}</g>;
}
// Grumito: cadenas abiertas amontonadas.
function Grumo({ x, y, s = 1, seed = 1, o = 1 }) {
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{Array.from({ length: 5 }, (_, i) => {
    const a = R() * 6.28, p = `M ${Math.cos(a) * 40} ${Math.sin(a) * 30} Q ${(R() - 0.5) * 90} ${(R() - 0.5) * 90} ${(R() - 0.5) * 70} ${(R() - 0.5) * 60} T ${(R() - 0.5) * 80} ${(R() - 0.5) * 70}`;
    return <g key={i}><path d={p} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" /><path d={p} stroke={i % 2 ? '#ffd0a0' : '#ff9fb0'} strokeWidth={7} fill="none" strokeLinecap="round" /></g>; })}</g>;
}
function Rayo({ x0, y0, x1, y1, p = 1, color = KC.yellow, w = 10 }) {
  if (p <= 0) return null;
  return <line x1={x0} y1={y0} x2={klerp(x0, x1, p)} y2={klerp(y0, y1, p)} stroke={color} strokeWidth={w} strokeLinecap="round" opacity={0.95} />;
}
// Larva esquemática de Anisakis: gusanito blanco enrollado (sin detalles gráficos).
function Larva({ T, x, y, s = 1, vida = 1, seed = 0, rot = 0 }) {
  const w = vida * Math.sin(T * 5 + seed) * 14;
  const p = `M -90 20 C -90 -60 ${10 + w} -80 40 -30 C ${70 - w} 10 20 60 -20 40 C -50 25 -30 -10 0 -10`;
  const col = mixHex('#9aa3b5', LARVA, vida);
  return <g transform={`translate(${x} ${y}) rotate(${rot + w * 0.3}) scale(${s})`}>
    <path d={p} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d={p} stroke={col} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d={p} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.5} strokeDasharray="6 26" />
    <circle cx={-90} cy={18} r={3} fill={KC.ink} />
  </g>;
}
function Sarten({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Llama T={T} x={0} y={120} s={1.4} />
    <rect x={150} y={-12} width={190} height={30} rx={14} fill="#3a3a3a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -170 -20 L 170 -20 L 140 60 L -140 60 Z" fill="#4a4a4a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={-20} rx={170} ry={34} fill="#2a2a2a" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Cubo({ x, y, s = 1, blanco = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-60} y={-48} width={120} height={96} rx={20} fill={mixHex(PEZ_CRUDO, PEZ_BLANCO, blanco)} stroke={KC.ink} strokeWidth={8} />
    <path d="M -36 -18 Q 0 -32 36 -18" stroke="#e9dfcf" strokeWidth={6} fill="none" /></g>;
}
function Congelador({ T, x, y, frio = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-330} width={600} height={660} rx={40} fill="#f4f8ff" stroke={KC.ink} strokeWidth={11} />
    <rect x={-250} y={-280} width={500} height={560} rx={24} fill={mixHex('#dff3ff', '#a9dcff', frio)} stroke={KC.ink} strokeWidth={7} />
    <rect x={250} y={-120} width={22} height={160} rx={10} fill="#c9d3e3" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 14 }, (_, i) => { const R = krng(40 + i); const cx = -230 + R() * 460, cy = -260 + R() * 520; return <path key={i} d={`M ${cx - 14} ${cy} L ${cx + 14} ${cy} M ${cx} ${cy - 14} L ${cx} ${cy + 14} M ${cx - 10} ${cy - 10} L ${cx + 10} ${cy + 10} M ${cx + 10} ${cy - 10} L ${cx - 10} ${cy + 10}`} stroke="#fff" strokeWidth={4} opacity={frio} />; })}
  </g>;
}
function TermometroFrio({ x, y, f = 0 }) {
  const temp = Math.round(klerp(20, -20, f));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-260} width={52} height={300} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={klerp(-240, -40, f)} width={24} height={klerp(260, 60, f)} rx={10} fill={KC.blue} />
    <circle cx={0} cy={60} r={44} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <text x={-50} y={-290} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>{temp > 0 ? temp : temp === 0 ? '0' : '−' + Math.abs(temp)} °C</text>
  </g>;
}
function Calendario({ x, y, dia, total, etiqueta = 'DÍA', color = KC.red }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-100} width={220} height={210} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={-100} width={220} height={60} rx={22} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-56} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff">{etiqueta}</text>
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{dia}</text>
    {total && <text x={0} y={140} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{total}</text>}
  </g>;
}
function BarraEscala({ x = 60, y = 1450, px = 200, texto, color = KC.ink }) {
  return <g><line x1={x} x2={x + px} y1={y} y2={y} stroke={color} strokeWidth={8} /><line x1={x} x2={x} y1={y - 14} y2={y + 14} stroke={color} strokeWidth={6} /><line x1={x + px} x2={x + px} y1={y - 14} y2={y + 14} stroke={color} strokeWidth={6} />
    <text x={x + px / 2} y={y - 22} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}

// ---------- el shot ----------
function Ceviche() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, A: CUES.Acido, B: CUES.Blanco, F: CUES.Fuego, P: CUES.Pregunta, L: CUES.Lima, C: CUES.Croacia, Fr: CUES.Francia, Co: CUES.Congelar, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const apr = Math.abs(Math.sin(kprog(T, K.G, K.G + 2.4) * Math.PI * 3));
  const blanqueo = kprog(T, K.G + 0.3, K.G + 4.2, kEase.suave);
  const abre = kprog(T, K.A + 1.6, K.A + 4.6, kEase.suave);
  const grumo = kprog(T, K.B + 0.2, K.B + 1.4, kEase.sale);
  const vistaCubo = kprog(T, K.B + 3.0, K.B + 3.6);
  const lima0 = K.L + 2.6, frio = kprog(T, K.Co + 0.6, K.Co + 3.4, kEase.suave);
  const Rb = krng(21), bact = Array.from({ length: 14 }, (_, i) => [180 + (i % 5) * 180 + (Rb() - 0.5) * 60, 760 + Math.floor(i / 5) * 140 + (Rb() - 0.5) * 50, Rb() * 360]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el limón sobre el ceviche */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.08} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tazon T={T} x={540} y={1000} s={1.15} blanco={blanqueo} />
          <Goteo T={T} x={330} y0={700} y1={930} cada={0.22} color={JUGO} desde={K.G} hasta={K.G + 3.0} r={13} />
          <Limon x={330} y={640} s={0.95} rot={170} apriete={apr} />
          <BarraEscala x={60} y={1470} px={110} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 1–2 · las proteínas por dentro; el ácido las abre */}
      <Escena T={T} a={K.Q} b={K.B} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Fibras T={T} />
          <Cordon T={T} x={540} y={800} abre={abre} s={1.5} cargas={kprog(T, K.A + 0.4, K.A + 1.8)} seed={1} />
          <Cordon T={T} x={330} y={1090} abre={abre} s={0.75} cargas={kprog(T, K.A + 0.6, K.A + 2.0)} seed={3} color="#ffb3c4" />
          <Cordon T={T} x={760} y={1080} abre={abre} s={0.75} cargas={kprog(T, K.A + 0.8, K.A + 2.2)} seed={5} color="#ffb3c4" />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.A + 0.1 + i * 0.1, u = kprog(T, t0, t0 + 0.9, kEase.sale); if (u >= 1 || T < t0) return null;
            const sx = i % 2 ? 1150 : -70, sy = 500 + i * 60; return <g key={i} opacity={1 - u * 0.6}><circle cx={klerp(sx, 540 + (i - 6) * 60, u)} cy={klerp(sy, 760, u)} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
              <text x={klerp(sx, 540 + (i - 6) * 60, u)} y={klerp(sy, 760, u) + 8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>H⁺</text></g>; })}
          {T > K.A + 1.4 && T < K.A + 4.4 && [[-1, 700], [1, 700], [-1, 940], [1, 940]].map(([sg, yy], i) => { const u = (T * 1.5 + i * 0.25) % 1; return <path key={i} d={`M ${540 + sg * (120 + u * 120)} ${yy} l ${sg * 40} 0 m ${-sg * 14} -14 l ${sg * 14} 14 l ${-sg * 14} 14`} stroke={KC.yellow} strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
          <BarraEscala x={60} y={1470} px={240} texto="≈ 100 nm" color={KC.texto} />
        </SvgCapa>
      </Escena>
      {/* 3 · abiertas, se amontonan y dispersan la luz → el cubo blanco */}
      <Escena T={T} a={K.B} b={K.F} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <g opacity={1 - vistaCubo}>
            <Fibras T={T} />
            <text x={300} y={560} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>sin grumos</text>
            <text x={790} y={560} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.gold2}>con grumitos</text>
            <line x1={540} x2={540} y1={600} y2={1160} stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="14 14" />
            <Cordon T={T} x={300} y={820} abre={0} s={1} seed={2} />
            {[[700, 780, 1], [880, 900, 2], [720, 1020, 3], [860, 1090, 4]].map(([gx, gy, sd]) => <Grumo key={sd} x={gx} y={gy} s={klerp(0.5, 1.2, grumo)} seed={sd} o={grumo} />)}
            {[680, 820, 960].map((yy, i) => { const t0 = K.B + 1.2 + i * 0.2; return <Rayo key={i} x0={80} y0={yy} x1={520} y1={yy} p={kprog(T, t0, t0 + 0.5)} />; })}
            {[0, 1, 2, 3].map((i) => { const t0 = K.B + 1.4 + i * 0.15, cy = [780, 900, 1020, 1090][i], cx = [700, 880, 720, 860][i];
              return <g key={i}>{[-70, -25, 20, 65, 120, 170, 220].map((a, k) => { const r = a * Math.PI / 180; return <Rayo key={k} x0={cx} y0={cy} x1={cx + Math.cos(r) * 150} y1={cy + Math.sin(r) * 150} p={kprog(T, t0 + 0.3, t0 + 0.7) * grumo} w={7} />; })}</g>; })}
          </g>
          {vistaCubo > 0 && <g opacity={vistaCubo}><Cubo x={540} y={900} s={2.6 - 0.3 * vistaCubo} blanco={1} /><BarraEscala x={60} y={1470} px={110} texto="1 cm" color={KC.texto} /></g>}
        </SvgCapa>
      </Escena>
      {/* 4 · el fuego hace algo más */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <line x1={540} x2={540} y1={560} y2={1180} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 16" />
          <Sarten T={T} x={290} y={1000} s={0.95} />
          <Cubo x={290} y={930} s={1} blanco={1} />
          <Limon x={790} y={1050} s={0.9} rot={0} />
          <Cubo x={790} y={900} s={1} blanco={1} />
          {[[-1, 0], [1, 1]].map(([lado, k]) => { const cx = lado < 0 ? 290 : 790, mata = lado < 0 ? kprog(T, K.F + 1.4, K.F + 2.6) : 0, ap = kprog(T, K.F + 0.6 + k * 0.4, K.F + 1.1 + k * 0.4);
            return <g key={k} opacity={ap}><Bacteria T={T} x={cx - 110} y={720} s={0.8} rot={-20} vida={1 - mata} color={KC.pink} seed={k} /><Larva T={T} x={cx + 100} y={720} s={0.55} vida={1 - mata} seed={k} /></g>; })}
          <Marca x={290} y={640} ok={false} s={0.9} o={kprog(T, K.F + 2.6, K.F + 3.0)} />
          <text x={790} y={680} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.F + 3.0, K.F + 3.4)}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Tazon T={T} x={540} y={1060} s={0.9} blanco={1} />
          <Goteo T={T} x={300} y0={600} y1={960} cada={0.25} color={JUGO} desde={K.P} hasta={K.L} r={13} />
          <text x={300} y={880} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 700)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · 2010, Lima: bacterias en el ceviche */}
      <Escena T={T} a={K.L} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={90} y={680} width={900} height={500} rx={60} fill={PEZ_BLANCO} opacity={0.16} stroke="rgba(255,255,255,.4)" strokeWidth={5} />
          {bact.map(([bx, by, r], i) => { const ap = kprog(T, K.L + 0.4 + i * 0.08, K.L + 0.8 + i * 0.08), muere = (i === 3 || i === 11) ? kprog(T, lima0 + 1.5, lima0 + 2.5) : 0;
            return <g key={i} opacity={ap}><Bacteria T={T} x={bx + Math.sin(T * 1.3 + i) * 8} y={by} rot={r + Math.sin(T + i) * 10} s={0.85} vida={1 - muere} color={[KC.mint, KC.pink, KC.cyan][i % 3]} seed={i} /></g>; })}
          {T > lima0 && <Goteo T={T} x={540} y0={560} y1={700} cada={0.35} color={JUGO} desde={lima0} hasta={K.C} r={12} />}
          <BarraEscala x={60} y={1470} px={130} texto="2 µm" color={KC.texto} />
        </SvgCapa>
      </Escena>
      {/* 7 · 2019, Croacia: larva en jugo de limón */}
      <Escena T={T} a={K.C} b={K.Fr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <VasoLab x={420} y={1180} s={1.2} liquido={JUGO} nivel={0.7} ancho={360} alto={420} />
          <Larva T={T} x={420} y={1000} s={0.9} seed={1} />
          <Limon x={420} y={700} s={0.55} rot={180} apriete={0} />
          <Calendario x={830} y={900} dia={Math.max(1, Math.min(5, 1 + Math.floor(kprog(T, K.C + 2.8, K.C + 5.6) * 4.999)))} total="en jugo de limón" />
          <BarraEscala x={60} y={1470} px={130} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 8 · 2025, Francia: 40 larvas */}
      <Escena T={T} a={K.Fr} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {Array.from({ length: 40 }, (_, i) => { const t0 = K.Fr + 2.6 + i * 0.05, ap = kprog(T, t0, t0 + 0.3, kEase.rebote); if (ap <= 0) return null;
            return <Larva key={i} T={T} x={150 + (i % 8) * 112} y={830 + Math.floor(i / 8) * 85} s={0.32 * ap} seed={i} rot={(i * 47) % 360} />; })}
        </SvgCapa>
      </Escena>
      {/* 9 · congelar a −20 °C por 7 días */}
      <Escena T={T} a={K.Co} b={K.Ci}>
        <FondoLunares color={mixHex(KC.cyan, '#bfe8ff', 0.5)} />
        <SvgCapa>
          <Congelador T={T} x={420} y={900} frio={frio} />
          <Larva T={T} x={420} y={880} s={0.9} vida={1 - kprog(T, K.Co + 3.6, K.Co + 5.0)} seed={2} />
          <rect x={250} y={740} width={340} height={280} rx={30} fill="rgba(200,235,255,.55)" stroke="#fff" strokeWidth={6} opacity={kprog(T, K.Co + 3.4, K.Co + 4.4)} />
          <TermometroFrio x={850} y={800} f={frio} />
          <Calendario x={850} y={1090} dia={Math.max(1, Math.min(7, 1 + Math.floor(kprog(T, K.Co + 2.0, K.Co + 4.4) * 6.999)))} total="días" color={KC.blue} />
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el tazón del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa><Tazon T={T} x={540} y={1000} s={1.15} blanco={1} /><Limon x={330} y={640} s={0.95} rot={170} /><BarraEscala x={60} y={1470} px={110} texto="1 cm" /></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.6} until={K.G + 4.0} texto="¿cocido?" x={300} y={440} tam={50} />
      <Chip T={T} at={K.G + 0.2} until={K.G + 4.2} texto="⏩ 15 min" x={800} y={1500} tam={30} mono borde={KC.texto} />
      <Chip T={T} at={K.G + 4.2} until={K.Q - 0.3} texto="el limón no lo cuece" x={540} y={1500} tam={40} borde={LIMA} />
      <Chip T={T} at={K.Q + 0.4} until={K.A - 0.3} texto="POR DENTRO · el pescado" x={540} y={470} tam={34} mono borde={KC.pink} />
      <Etq T={T} at={K.Q + 1.4} until={K.A - 0.3} x={400} y={660} texto="proteína" lado="izq" tam={36} color={KC.texto} />
      <Chip T={T} at={K.A + 0.3} until={K.A + 1.9} texto="H⁺ = el ácido del limón" x={540} y={1500} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.A + 2.0} until={K.B - 0.3} texto="ácido → desnaturaliza" x={540} y={1500} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.B + 3.4} until={K.F - 0.3} texto="blanco… pero crudo" x={540} y={1500} tam={42} borde={PEZ_BLANCO} />
      <Etq T={T} at={K.F + 0.4} until={K.P - 0.3} x={290} y={1500} texto="calor" lado="izq" tam={40} color={KC.ink} />
      <Etq T={T} at={K.F + 0.6} until={K.P - 0.3} x={790} y={1500} texto="limón" tam={40} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.L + 0.15} until={K.L + 2.4} anio="2010" quien="Lima, Perú · Herrera et al." revista="J Travel Med · ceviche con bacterias" y={760} />
      <Cronometro T={T} at={lima0} until={K.C - 0.2} inicio={0} factor={1800 / Math.max(1, K.C - lima0 - 0.6)} x={420} y={470} etiqueta="⏩ CÁMARA RÁPIDA" />
      <Etq T={T} at={K.L + 2.8} until={K.C - 0.3} x={140} y={620} texto="Vibrio parahaemolyticus" it tam={30} />
      <Chip T={T} at={K.L + 4.6} until={K.C - 0.3} texto="30 min: casi no bajaron" x={540} y={1500} tam={40} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.C + 0.15} until={K.C + 2.5} anio="2019" quien="Split, Croacia · Šimat y Trumbić" revista="Fishes · larvas en jugo de limón" y={700} />
      <Etq T={T} at={K.C + 2.8} until={K.Fr - 0.3} x={640} y={630} texto="larva de Anisakis" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.C + 4.4} until={K.Fr - 0.3} texto="≈ 5 días vivas" x={540} y={1500} tam={44} borde={KC.lilac} />
      <TarjetaEstudio T={T} at={K.Fr + 0.15} until={K.Fr + 2.4} anio="2025" quien="Francia · Robert et al." revista="Food Waterborne Parasitol" y={760} />
      <NumeroGigante T={T} at={K.Fr + 2.6} until={K.Co - 0.3} valor={40} dur={2.0} etiqueta="larvas" y={540} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.Fr + 3.4} until={K.Co - 0.3} texto="ceviche casero de merluza" x={540} y={1500} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Co + 0.3} until={K.Co + 3.0} texto="FDA · pescado para comer crudo" x={380} y={470} tam={30} borde={KC.blue} />
      <Chip T={T} at={K.Co + 4.4} until={K.Ci - 0.3} texto="mata parásitos" x={540} y={1500} tam={42} borde={KC.blue} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="ácido ≠ cocido" x={540} y={1500} tam={46} borde={LIMA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="El limón *no lo cuece.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.A - 0.1} texto="Proteínas: *cadenas enrolladas.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.B - 0.1} texto="El ácido *las desenrolla.*" />
      <Subtitulo T={T} idx={3} at={K.B + 0.1} until={K.F - 0.1} texto="Abiertas *dispersan la luz.*" />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.P - 0.1} texto="El calor *sí mata.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.L - 0.1} texto="¿Y el limón *no mata?*" />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.C - 0.1} texto="30 minutos: *casi no bajaron.*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.Fr - 0.1} texto="Anisakis: *5 días en limón.*" />
      <Subtitulo T={T} idx={8} at={K.Fr + 0.1} until={K.Co - 0.1} texto="*40 larvas* en Francia." />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="−20 °C *por 7 días.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No está cocido: *está desdoblado.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Acido - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Acido + 2.0, CUES.Blanco - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Fuego + 0.4, CUES.Pregunta - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Lima + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Lima + 2.6, CUES.Croacia - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Croacia + 2.7, CUES.Francia - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Francia + 2.6, CUES.Congelar - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Congelar + 3.2, CUES.Cierre - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="16" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CevicheApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Ceviche /></CompositionStage></div>;
}
window.CevicheApp = CevicheApp;
