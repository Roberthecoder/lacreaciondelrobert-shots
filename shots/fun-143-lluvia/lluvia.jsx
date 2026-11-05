// Shot Fungi Mati #143 · Ese hongo no nació anoche con la lluvia — NARRADO
// Formato N1 (por dentro): pasto con lluvia → bajo tierra (micelio) → dentro del pie (células que se inflan) → el mismo pasto, ya explicado.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const LL = { cielo:'#7fdcff', cielo2:'#bfefff', pasto:'#3fbf4a', pasto2:'#2a8f36', tierra:'#6b4a32', tierra2:'#3e2a1c',
  somb:'#f8f5ef', somb2:'#e4ddcf', lamJ:'#f2a0b4', lamM:'#4a2e24', pie:'#f6f1e6', agua:'#3aa8ff', alimento:'#F4C25A',
  tinta:'#9a9590', tinta2:'#5f5a56', carmin:'#d11a3a', hifa:'#f4ecd8' };
const SUP = 1180;   // superficie del suelo en las escenas de pasto

// Champiñón de campo (Agaricus campestris): sombrero blanco convexo, laminillas libres rosadas (jóvenes) → café oscuro (maduras),
// anillo delgado a media altura/arriba, pie que se adelgaza hacia la base, sin volva. Base del pie en (x, y).
// crece 0..1 (botón → adulto) · abre 0..1 · mad 0..1 (color de laminillas) · celulas 0..1 (dibuja las células del pie) · puntos = [fracciones] (carmín)
function Campestris({ x, y, s = 1, crece = 1, abre = 1, mad = 0.15, celulas = 0, inflado = 1, puntos, rot = 0 }) {
  if (crece <= 0) return null;
  const c = kclamp(crece, 0, 1), a = kclamp(abre, 0, 1);
  const hP = klerp(16, 150, c), w = klerp(18, 46, c);
  const rC = klerp(16, 128, c) * klerp(0.72, 1, a), alto = rC * klerp(0.95, 0.58, a), yC = -hP;
  const lam = mixHex(LL.lamJ, LL.lamM, mad);
  const pieD = `M ${-w * 0.22} 0 C ${-w * 0.62} ${-hP * 0.25}, ${-w * 0.56} ${-hP * 0.7}, ${-w * 0.44} ${yC} L ${w * 0.44} ${yC} C ${w * 0.56} ${-hP * 0.7}, ${w * 0.62} ${-hP * 0.25}, ${w * 0.22} 0 Z`;
  const filas = 7, cols = 3;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={pieD} fill={LL.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {celulas > 0 && <g opacity={celulas}>
      {Array.from({ length: filas * cols }, (_, i) => { const r = Math.floor(i / cols), k = i % cols; const hh = hP / filas, ww = w * 0.8 / cols;
        const yy = -hh * (r + 1), xx = -w * 0.4 + k * ww; return <rect key={i} x={xx + 1.5} y={yy + 1.5} width={ww - 3} height={hh - 3} rx={Math.min(ww, hh) * 0.4} fill="rgba(58,168,255,.22)" stroke="#2a6fb0" strokeWidth={1.6} />; })}
    </g>}
    {puntos && puntos.map((f, i) => <circle key={i} cx={(i % 2 ? 1 : -1) * w * 0.12} cy={-hP * f} r={5.5} fill={LL.carmin} stroke={KC.ink} strokeWidth={1.5} />)}
    {a > 0.4 && <path d={`M ${-w * 0.5} ${yC + hP * 0.24} q ${w * 0.5} ${10 * a} ${w} 0 l 3 ${12 * a} q ${-w * 0.52} ${9 * a} ${-w - 6} 0 Z`} fill="#fbf8f1" stroke={KC.ink} strokeWidth={3.5} opacity={kprog(a, 0.4, 0.65)} />}
    {a > 0.12 && <g opacity={kprog(a, 0.12, 0.4)}>
      <path d={`M ${-rC * 0.95} ${yC - 2} Q 0 ${yC + alto * 0.6} ${rC * 0.95} ${yC - 2} Z`} fill={lam} stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 15 }, (_, i) => { const u = (i + 0.5) / 15 * 2 - 1; return <line key={i} x1={u * rC * 0.9} y1={yC - 1} x2={u * w * 0.5} y2={yC + alto * 0.28} stroke={mixHex(lam, '#2a1812', 0.5)} strokeWidth={1.8} />; })}
    </g>}
    <path d={`M ${-rC} ${yC} C ${-rC} ${yC - alto * 1.3}, ${rC} ${yC - alto * 1.3}, ${rC} ${yC} Q 0 ${yC + alto * 0.1} ${-rC} ${yC} Z`} fill={LL.somb} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-rC * 0.55} ${yC - alto * 0.78} Q ${-rC * 0.1} ${yC - alto * 0.98} ${rC * 0.25} ${yC - alto * 0.84}`} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".8" />
    {[[-0.45, -0.4], [0.35, -0.5], [0.05, -0.25], [0.6, -0.22]].map(([u, v], i) => <ellipse key={i} cx={u * rC} cy={yC + v * alto} rx={rC * 0.06} ry={alto * 0.04} fill={LL.somb2} />)}
  </g>;
}
// Hongo tinta (Coprinopsis cinerea): sombrero cónico/alargado gris con fibrillas, borde que se ennegrece; pie largo, blanco y delgado.
function HongoTinta({ x, y, s = 1, h = 1, negro = 0 }) {
  const hP = klerp(90, 430, h), rC = 62, altoC = 150;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -11 0 L -8 ${-hP} L 8 ${-hP} L 11 0 Z`} fill="#fbf9f4" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <g transform={`translate(0 ${-hP + 10})`}>
      <path d={`M ${-rC} 0 C ${-rC} ${-altoC * 0.8}, ${-rC * 0.45} ${-altoC}, 0 ${-altoC} C ${rC * 0.45} ${-altoC}, ${rC} ${-altoC * 0.8}, ${rC} 0 Q 0 14 ${-rC} 0 Z`} fill={LL.tinta} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[-0.7, -0.45, -0.2, 0.05, 0.3, 0.55].map((u, i) => <path key={i} d={`M ${u * rC * 0.9} -4 Q ${u * rC * 0.75} ${-altoC * 0.5} ${u * rC * 0.2} ${-altoC * 0.9}`} stroke={LL.tinta2} strokeWidth={3} fill="none" />)}
      {[[-0.3, -0.75], [0.2, -0.6], [-0.1, -0.45], [0.4, -0.35]].map(([u, v], i) => <ellipse key={i} cx={u * rC} cy={v * altoC} rx={7} ry={4} fill="#d9d4cc" />)}
      <path d={`M ${-rC} 0 Q 0 14 ${rC} 0 L ${rC * 0.96} ${-altoC * 0.18 * negro} Q 0 ${14 - altoC * 0.2 * negro} ${-rC * 0.96} ${-altoC * 0.18 * negro} Z`} fill="#16120f" opacity={negro} />
    </g>
  </g>;
}
// Pasto: hojitas que se mecen sobre la línea y.
function Pasto({ T, y = SUP, n = 64, seed = 4, alto = 70, color = LL.pasto, color2 = LL.pasto2 }) {
  const g = krng(seed);
  const H = Array.from({ length: n }, (_, i) => ({ x: -20 + (i + g() * 0.8) * (1120 / n), h: alto * (0.6 + g() * 0.7), c: g() < 0.5 ? color : color2, s: g() * 9 }));
  return <g>{H.map((b, i) => { const m = mece(T, b.s + 1, 0.4) * 10; return <path key={i} d={`M ${b.x - 7} ${y + 4} Q ${b.x - 2 + m * 0.5} ${y - b.h * 0.5} ${b.x + m} ${y - b.h} Q ${b.x + 3 + m * 0.4} ${y - b.h * 0.5} ${b.x + 7} ${y + 4} Z`} fill={b.c} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />; })}</g>;
}
// Lluvia: rayitas que caen. o = intensidad 0..1.
function Lluvia({ T, o = 1, n = 46, y0 = 120, y1 = SUP }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = (i * 197 + 40) % 1080, L = y1 - y0 + 200; const yy = y0 - 120 + ((T * 1500 + i * 331) % L);
    return yy < y1 ? <line key={i} x1={x} y1={yy} x2={x - 8} y2={yy + 46} stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity=".75" /> : null; })}</g>;
}
// Cielo con luna que se vuelve sol (anillo de tiempo "anoche → hoy").
function Cielo({ dia = 0 }) {
  return <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex('#27306b', LL.cielo, dia)}, ${mixHex('#4a5aa8', LL.cielo2, dia)})` }}></div>;
}
function Astro({ x, y, dia = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {dia < 1 && <g opacity={1 - dia}><circle r={58} fill="#f4efd0" stroke={KC.ink} strokeWidth={6} /><circle cx={24} cy={-14} r={50} fill={mixHex('#27306b', LL.cielo, dia)} /></g>}
    {dia > 0 && <g opacity={dia} transform={`scale(${klerp(0.6, 1, dia)})`}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-78} x2={0} y2={-100} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
      <circle r={62} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /></g>}
  </g>;
}
// Suelo en corte (macro) con la red de micelio. red 0..1, brillo 0..1. Hijos SVG encima.
function SueloCorte({ T, red = 1, brillo = 0, cielo = LL.cielo, ox = 330, children }) {
  return <MundoSuelo T={T} red={red} brillo={brillo} ox={ox} sup={SUP} cielo={cielo} escala={0.5} hojas={false}>{children}</MundoSuelo>;
}
// Flechitas que suben por un camino (agua azul o alimento dorado). p = fase.
function Flujo({ T, pts, color, n = 6, vel = 0.5, r = 11, fase = 0 }) {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const en = (u) => { let r0 = u * tot; for (let i = 1; i < pts.length; i++) { if (r0 <= L[i - 1]) { const k = r0 / L[i - 1]; return [klerp(pts[i - 1][0], pts[i][0], k), klerp(pts[i - 1][1], pts[i][1], k)]; } r0 -= L[i - 1]; } return pts[pts.length - 1]; };
  return <g>{Array.from({ length: n }, (_, i) => { const u = ((T * vel + i / n + fase) % 1 + 1) % 1; const [px, py] = en(u);
    return <path key={i} d={`M ${px} ${py - r * 1.4} Q ${px + r} ${py} ${px} ${py + r * 0.6} Q ${px - r} ${py} ${px} ${py - r * 1.4} Z`} fill={color} stroke={KC.ink} strokeWidth={2.5} opacity={Math.sin(u * Math.PI)} />; })}</g>;
}
// Corte del pie AL MICROSCOPIO: las mismas 24 células se alargan e inflan (p 0..1). Base en (x, y).
function PieMicro({ T, x = 470, y = 1240, p = 0 }) {
  const cols = 4, filas = 6, ww = 74, hh = klerp(42, 95, kEase.suave(p)), ancho = cols * ww + 24;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-ancho / 2} y={-filas * hh - 24} width={ancho} height={filas * hh + 24} rx={30} fill="rgba(246,241,230,.08)" stroke="#eafff7" strokeWidth={5} strokeDasharray="16 10" />
    {Array.from({ length: cols * filas }, (_, i) => { const r = Math.floor(i / cols), k = i % cols; const cx = -ancho / 2 + 12 + k * ww + ww / 2, cy = -12 - r * hh - hh / 2;
      const inf = klerp(0.78, 0.95, p) + 0.02 * Math.sin(T * 3 + i);
      return <g key={i}>
        <rect x={cx - ww * inf / 2} y={cy - hh * 0.46} width={ww * inf} height={hh * 0.92} rx={22} fill={mixHex('#26405e', '#3a8fe0', p)} stroke="#cfe9ff" strokeWidth={3.5} />
        <ellipse cx={cx} cy={cy} rx={ww * inf * 0.32} ry={hh * 0.3} fill="#6cc4ff" opacity={0.25 + 0.5 * p} />
        <circle cx={cx - 8} cy={cy - hh * 0.18} r={6} fill="#ffe7a8" /><circle cx={cx + 8} cy={cy - hh * 0.18} r={6} fill="#ffe7a8" />
      </g>; })}
  </g>;
}

function LluviaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Sp: CUES.Especie, F: CUES.Fruto, Mi: CUES.Micelio, P: CUES.Pregunta, B: CUES.Boton, I: CUES.Inflar, A: CUES.Agua,
    E: CUES.Estudio, Es: CUES.Estiron, Al: CUES.Alimento, Ti: CUES.Tinta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const dia = kprog(T, K.G + 0.4, K.G + 2.4, kEase.suave);
  const PUNTOS = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: lluvia, anoche → hoy, el champiñón ya está */}
      <Escena T={T} a={K.G} b={K.Sp} zoom={0.04}>
        <Cielo dia={dia} />
        <div style={{ position:'absolute', left:0, top:SUP, width:KW, height:KH - SUP, background:`linear-gradient(${LL.tierra}, ${LL.tierra2})`, borderTop:`10px solid ${KC.ink}` }}></div>
        {fsvg(<>
          <Astro x={150} y={700} dia={dia} />
          <Lluvia T={T} o={1 - kprog(T, K.G + 2.6, K.G + 3.6)} />
          <Campestris x={330} y={SUP + 6} s={1.6} crece={1} abre={0.75} mad={0.1} rot={mece(T, 3, 0.6) * 1.5} />
          <Pasto T={T} />
          {T < K.G + 0.6 && [0, 1, 2].map((i) => { const u = kprog(T, K.G + i * 0.12, K.G + 0.45 + i * 0.12); return u > 0 && u < 1 ? <circle key={i} cx={260 + i * 70} cy={SUP - 300 + 20 * i} r={16 + 30 * u} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - u} /> : null; })}
        </>)}
      </Escena>
      {/* 2 · especie: el champiñón de campo de cerca */}
      <Escena T={T} a={K.Sp} b={K.F} zoom={0.05}>
        <Cielo dia={1} />
        <div style={{ position:'absolute', left:0, top:SUP, width:KW, height:KH - SUP, background:`linear-gradient(${LL.tierra}, ${LL.tierra2})`, borderTop:`10px solid ${KC.ink}` }}></div>
        {fsvg(<>
          <Campestris x={320} y={SUP + 6} s={2.1} crece={1} abre={1} mad={0.1} />
          <Campestris x={800} y={SUP + 6} s={1.25} crece={1} abre={1} mad={0.85} />
          <Pasto T={T} alto={55} />
        </>)}
      </Escena>
      {/* 3–5 · bajo tierra: el fruto y su micelio; la pregunta */}
      <Escena T={T} a={K.F} b={K.B} zoom={0.03}>
        <SueloCorte T={T} red={kprog(T, K.F + 0.4, K.Mi + 4.5)} brillo={kprog(T, K.Mi, K.Mi + 1.2)}>
          <Campestris x={330} y={SUP + 6} s={1.6} crece={1} abre={0.8} mad={0.15} />
          <Pasto T={T} alto={50} />
          {T > K.Mi && T < K.P + 2.6 && <g transform="translate(700 1560)" opacity={kprog(T, K.Mi + 0.5, K.Mi + 0.9) * (1 - kprog(T, K.P - 0.2, K.P + 0.2))}>
            <rect x={-150} y={-70} width={300} height={140} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <rect x={-150} y={-70} width={300} height={42} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={42} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{['ENE', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'][Math.min(5, Math.floor(kprog(T, K.Mi + 0.9, K.Mi + 5.2) * 6))]}</text>
          </g>}
          {T > K.P - 0.2 && <g opacity={kprog(T, K.P - 0.2, K.P + 0.3)}><Interrogacion T={T} x={330} y={790} tam={230} /></g>}
        </SueloCorte>
      </Escena>
      {/* 6 · el botón (primordio) en el micelio, bajo el pasto */}
      <Escena T={T} a={K.B} b={K.I} zoom={0.06} origen="40% 60%">
        <SueloCorte T={T} red={1} brillo={0.5}>
          <Campestris x={400} y={SUP + 40 - 34 * kprog(T, K.B + 0.4, K.B + 2.6)} s={1.6} crece={0.08 + 0.22 * kprog(T, K.B + 0.3, K.B + 2.6, kEase.sale)} abre={0} />
          <Pasto T={T} alto={50} />
          {[0, 1, 2, 3].map((i) => { const u = (T * 0.6 + i / 4) % 1; return <circle key={i} cx={400} cy={SUP + 20} r={30 + u * 110} fill="none" stroke="#2fe0a8" strokeWidth={4} opacity={(1 - u) * 0.7} />; })}
        </SueloCorte>
      </Escena>
      {/* 7 · al microscopio: las mismas células se llenan de agua y se estiran */}
      <Escena T={T} a={K.I} b={K.A} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <PieMicro T={T} x={380} y={1190} p={kprog(T, K.I + 0.6, K.A - 0.4)} />
          <Flujo T={T} pts={[[380, 1300], [380, 1150], [380, 900], [380, 650]]} color={LL.agua} n={7} vel={0.6} r={13} />
          <Flujo T={T} pts={[[250, 1300], [250, 1000], [250, 700]]} color={LL.agua} n={5} vel={0.5} r={11} fase={0.3} />
          <Flujo T={T} pts={[[510, 1300], [510, 1000], [510, 700]]} color={LL.agua} n={5} vel={0.55} r={11} fase={0.6} />
        </>)}
      </Escena>
      {/* 8 · más de 80 % agua */}
      <Escena T={T} a={K.A} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Campestris x={300} y={1200} s={1.9} crece={1} abre={1} mad={0.3} />
          {(() => { const u = kprog(T, K.A + 0.3, K.A + 2.0, kEase.sale) * 0.835, X = 600, Y = 760, W = 150, H = 440; return <g>
            <rect x={X} y={Y} width={W} height={H} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <rect x={X + 8} y={Y + H - 8 - (H - 16) * u} width={W - 16} height={(H - 16) * u} rx={18} fill={LL.agua} />
            <path d={`M ${X + 8} ${Y + H - 8 - (H - 16) * u} q ${(W - 16) / 4} ${-10 * Math.sin(T * 5)} ${(W - 16) / 2} 0 t ${(W - 16) / 2} 0`} fill="none" stroke="#bfe6ff" strokeWidth={5} />
            <line x1={X - 20} y1={Y + H - 8 - (H - 16) * 0.8} x2={X + W + 20} y2={Y + H - 8 - (H - 16) * 0.8} stroke={KC.red} strokeWidth={6} strokeDasharray="14 8" />
            <text x={X + W + 30} y={Y + H - (H - 16) * 0.8 + 4} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>80 %</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 9–10 · el estudio de 1956: puntitos de carmín que se separan */}
      <Escena T={T} a={K.E} b={K.Al} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const cr = klerp(0.42, 1, kprog(T, K.E + 3.8, K.Es + 4.6, kEase.suave)); return <g>
            <Campestris x={360} y={1230} s={2.2} crece={cr} abre={klerp(0.1, 0.9, kprog(T, K.Es + 1, K.Es + 5))} mad={0.1} puntos={T > K.E + 1.6 ? PUNTOS.slice(0, Math.min(6, Math.floor((T - K.E - 1.6) / 0.25) + 1)) : null} />
            {/* regla */}
            <g transform="translate(560 1230)">
              <rect x={0} y={-360} width={60} height={360} fill="#fff3c4" stroke={KC.ink} strokeWidth={5} />
              {Array.from({ length: 13 }, (_, i) => <line key={i} x1={0} y1={-i * 28} x2={i % 2 ? 22 : 38} y2={-i * 28} stroke={KC.ink} strokeWidth={4} />)}
            </g>
          </g>; })()}
        </>)}
      </Escena>
      {/* 11 · el micelio le manda agua y alimento */}
      <Escena T={T} a={K.Al} b={K.Ti} zoom={0.04}>
        <SueloCorte T={T} red={1} brillo={0.7}>
          <Campestris x={330} y={SUP + 6} s={1.6} crece={1} abre={0.9} mad={0.2} />
          <Pasto T={T} alto={50} />
          <Flujo T={T} pts={[[90, 1650], [220, 1420], [330, 1200], [330, 1000]]} color={LL.agua} n={7} vel={0.5} r={13} />
          <Flujo T={T} pts={[[640, 1700], [460, 1430], [338, 1200], [338, 1000]]} color={LL.alimento} n={6} vel={0.45} r={13} fase={0.4} />
        </SueloCorte>
      </Escena>
      {/* 12 · un hongo tinta: el estirón más rápido, unas cinco horas */}
      <Escena T={T} a={K.Ti} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <div style={{ position:'absolute', left:0, top:1240, width:KW, height:KH - 1240, background:`linear-gradient(${LL.tierra}, ${LL.tierra2})`, borderTop:`10px solid ${KC.ink}` }}></div>
        {fsvg(<>
          <HongoTinta x={330} y={1246} s={1.2} h={kprog(T, K.Ti + 0.5, K.Ti + 4.8, kEase.suave)} negro={kprog(T, K.Ti + 3.8, K.C)} />
          <Pasto T={T} y={1240} alto={40} n={50} seed={9} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo pasto con lluvia, ahora con el micelio y las células a la vista */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <SueloCorte T={T} red={1} brillo={kprog(T, K.C + 0.4, K.C + 1.6)}>
          <Astro x={150} y={700} dia={1} />
          <Lluvia T={T} o={0.6} />
          <Campestris x={330} y={SUP + 6} s={1.6} crece={1} abre={0.75} mad={0.1} celulas={kprog(T, K.C + 1.2, K.C + 2.2)} />
          <Pasto T={T} />
        </SueloCorte>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.Sp - 0.3} texto="¿nació anoche?" x={330} y={460} tam={52} />
      <Etq T={T} at={K.Sp + 0.3} until={K.F - 0.2} x={60} y={430} texto="champiñón de campo" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Sp + 0.7} until={K.F - 0.2} x={60} y={490} texto="Agaricus campestris" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.Sp + 1.2} until={K.F - 0.2} x={540} y={900} texto="laminillas rosadas" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Sp + 1.6} until={K.F - 0.2} x={560} y={1020} texto="maduro: café oscuro" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Sp + 2.0} until={K.F - 0.2} x={60} y={1500} texto="No comas hongos silvestres sin un experto: hay parecidos venenosos." tam={22} color={KC.texto} />
      <Chip T={T} at={K.F + 0.6} until={K.Mi - 0.2} texto="esto es el fruto" x={380} y={560} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Mi + 0.4} until={K.P - 0.2} x={60} y={1290} texto="micelio (hifas)" tam={34} color="#eafff7" />
      <Chip T={T} at={K.Mi + 1.0} until={K.P - 0.2} texto="la mayor parte del hongo" x={380} y={560} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Mi + 2.6} until={K.P - 0.2} texto="todo el año, comiendo" x={380} y={650} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.B + 0.4} until={K.I - 0.2} texto="primordio: el botón" x={380} y={560} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.I + 0.1} until={K.A - 0.2} texto="AL MICROSCOPIO · DENTRO DEL PIE" x={420} y={430} tam={30} borde={KC.cyan} mono />
      <Chip T={T} at={K.I + 1.0} until={K.A - 0.2} texto="las mismas células" x={300} y={520} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.I + 1.6} until={K.A - 0.2} x={600} y={1000} texto="agua →" tam={30} color={LL.agua} />
      <NumeroGigante T={T} at={K.A + 0.4} until={K.E - 0.3} valor={80} dur={1.6} sufijo=" %" etiqueta="agua: más de" x={330} y={560} tam={150} color={LL.agua} />
      <Etq T={T} at={K.A + 1.0} until={K.E - 0.3} x={60} y={1450} texto="Agaricus campestris" it tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.6} anio="1956" quien="Bonner, Kane y Levey" revista="Mycologia · «el champiñón común», como se le llamaba" x={500} y={560} />
      <Etq T={T} at={K.E + 1.8} until={K.Es - 0.2} x={630} y={1050} texto="puntitos de carmín" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.5} until={K.Al - 0.2} texto="desde ~2 cm: casi sin células nuevas" x={420} y={470} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Es + 1.0} until={K.Al - 0.2} x={60} y={540} texto="(probablemente; al menos en el pie)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Es + 2.4} until={K.Al - 0.2} texto="sobre todo se estiraron" x={380} y={640} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.Al + 0.3} until={K.Ti - 0.2} x={480} y={1560} texto="agua" tam={32} color={LL.agua} />
      <Etq T={T} at={K.Al + 0.8} until={K.Ti - 0.2} x={680} y={1650} texto="alimento" tam={32} color={LL.alimento} />
      <Chip T={T} at={K.Al + 1.2} until={K.Ti - 0.2} texto="no solo agua: también alimento" x={420} y={560} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Ti + 0.3} until={K.C - 0.2} x={60} y={430} texto="un hongo tinta" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Ti + 0.7} until={K.C - 0.2} x={60} y={490} texto="Coprinopsis cinerea" it tam={38} color={KC.ink} />
      <Cronometro T={T} at={K.Ti + 0.5} until={K.Ti + 4.8} factor={18000 / 4.3} x={760} y={1080} etiqueta="ESTIRÓN MÁS RÁPIDO" />
      <Chip T={T} at={K.Ti + 4.8} until={K.C - 0.2} texto="≈ 5 horas" x={760} y={1080} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no nació: se infló" x={380} y={560} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={60} y={1500} texto="No comas hongos silvestres sin un experto." tam={22} color={KC.texto} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Sp} texto="5 cm" largo={260} y={1580} />
      <BarraEscala T={T} at={K.Sp} until={K.F} texto="5 cm" largo={340} y={1580} />
      <BarraEscala T={T} at={K.F} until={K.I} texto="5 cm · micelio esquemático" largo={260} y={1580} />
      <BarraEscala T={T} at={K.I} until={K.A} texto="esquemático · no a escala" largo={0} y={1580} />
      <BarraEscala T={T} at={K.A} until={K.E} texto="5 cm" largo={300} y={1580} />
      <BarraEscala T={T} at={K.E} until={K.Al} texto="regla: 1 marca = 5 mm (esquemático)" largo={0} y={1580} />
      <BarraEscala T={T} at={K.Al} until={K.Ti} texto="5 cm · micelio esquemático" largo={260} y={1580} />
      <BarraEscala T={T} at={K.Ti} until={K.C} texto="5 cm" largo={190} y={1580} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={260} y={1580} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Sp - 0.1} texto="No nació anoche: *ya vivía ahí.*" />
      <Subtitulo T={T} idx={1} at={K.Sp + 0.1} until={K.F - 0.1} texto="Es el *champiñón de campo.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.Mi - 0.1} texto="Lo que ves *es su fruto.*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.P - 0.1} texto="El micelio vive *bajo tierra.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.B - 0.1} texto="¿Por qué aparece *de golpe?*" />
      <Subtitulo T={T} idx={5} at={K.B + 0.1} until={K.I - 0.1} texto="Primero arma *un botón.*" />
      <Subtitulo T={T} idx={6} at={K.I + 0.1} until={K.A - 0.1} texto="Sus células *se llenan de agua.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.E - 0.1} texto="Más de *80 % agua.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Es - 0.1} texto="1956: *puntitos rojos* en el pie." />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Al - 0.1} texto="Casi sin células nuevas: *se estiraron.*" />
      <Subtitulo T={T} idx={10} at={K.Al + 0.1} until={K.Ti - 0.1} texto="Agua y *alimento* del micelio." />
      <Subtitulo T={T} idx={11} at={K.Ti + 0.1} until={K.C - 0.1} texto="Un hongo tinta: *unas 5 horas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="La lluvia le dio *agua para inflarse.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.F + 0.3, K.Mi - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mi + 3.0, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.B + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.I + 0.8, K.A - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.A + 0.3, K.E + 0.8, 'avatar_11_sorprendido', 'arriba-der'],
        [K.E + 3.7, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Es + 1.0, K.Al + 3.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ti + 1.5, K.Ti + 5.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="143" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LluviaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LluviaShot /></CompositionStage></div>;
}
window.LluviaApp = LluviaApp;
