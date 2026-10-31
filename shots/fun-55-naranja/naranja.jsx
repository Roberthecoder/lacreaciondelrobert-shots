// Shot Fungi Mati #55 · Ese polvo verde de tu naranja no es polvo: el moho verde (Penicillium digitatum) — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const NJ = { piel:'#ff9a1f', piel2:'#ffb547', poro:'#e07a10', albedo:'#fff4e2', pulpa:'#ffb84d', glandula:'#ffe066',
  olivo:'#7f8f3a', olivo2:'#a9b85c', azul:'#3f7fae', azul2:'#86b7d8', blanco:'#fbf7ec', mojado:'#c8701c', cera:'#fff6c8' };

// Mancha de moho: p 0..1 → zona mojada (0–0.3), pelusa blanca (0.3–0.6), centro de esporas (0.55–1).
function ManchaMoho({ cx, cy, r, p = 1, tipo = 'verde', seed = 4 }) {
  if (p <= 0) return null;
  const c1 = tipo === 'azul' ? NJ.azul : NJ.olivo, c2 = tipo === 'azul' ? NJ.azul2 : NJ.olivo2;
  const moj = kprog(p, 0, 0.3), bl = kprog(p, 0.25, 0.6), ce = kprog(p, 0.55, 1);
  const g = krng(seed);
  const dots = Array.from({ length: 26 }, () => [g() * 2 - 1, g() * 2 - 1]).filter(([a, b]) => a * a + b * b < 1);
  return <g>
    <circle cx={cx} cy={cy} r={r * 1.15 * moj} fill={NJ.mojado} opacity={0.55} />
    {bl > 0 && <Colonia cx={cx} cy={cy} r={r * bl} color={NJ.blanco} seed={seed} />}
    {ce > 0 && <Colonia cx={cx} cy={cy} r={r * 0.72 * ce} color={c1} seed={seed + 1} />}
    {ce > 0.3 && dots.map(([a, b], i) => <circle key={i} cx={cx + a * r * 0.6 * ce} cy={cy + b * r * 0.6 * ce} r={4 + (i % 3) * 2} fill={c2} />)}
  </g>;
}

// Naranja entera. mancha 0..1 (moho), raspon 0..1 (herida), brillo 0..1 (cera).
let NJ_ID = 0;
function Naranja({ x, y, r = 150, mancha = 0, tipo = 'verde', mpos = [0.15, 0.05], mr = 0.55, raspon = 0, brillo = 0, rot = 0, seed = 3, T = 0 }) {
  const id = React.useMemo(() => 'nj' + (NJ_ID++), []);
  const g = krng(seed), poros = Array.from({ length: 34 }, () => [g() * 2 - 1, g() * 2 - 1]).filter(([a, b]) => a * a + b * b < 0.85);
  const mx = mpos[0] * r, my = mpos[1] * r;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
    <circle r={r} fill={NJ.piel} stroke={KC.ink} strokeWidth={Math.max(5, r * 0.045)} />
    <g clipPath={`url(#${id})`}>
      <circle cx={r * 0.25} cy={r * 0.3} r={r * 0.95} fill={NJ.poro} opacity=".35" />
      {poros.map(([a, b], i) => <circle key={i} cx={a * r} cy={b * r} r={r * 0.022} fill={NJ.poro} opacity=".8" />)}
      {raspon > 0 && <g opacity={raspon}>
        <path d={`M ${mx - r * 0.18} ${my - r * 0.06} L ${mx + r * 0.16} ${my + r * 0.05}`} stroke="#b0480a" strokeWidth={r * 0.07} strokeLinecap="round" />
        <path d={`M ${mx - r * 0.12} ${my + r * 0.03} L ${mx + r * 0.1} ${my + r * 0.1}`} stroke="#fff1d6" strokeWidth={r * 0.03} strokeLinecap="round" />
      </g>}
      <ManchaMoho cx={mx} cy={my} r={r * mr} p={mancha} tipo={tipo} seed={seed + 7} />
      <ellipse cx={-r * 0.38} cy={-r * 0.42} rx={r * 0.26} ry={r * 0.13} fill="#fff" opacity={0.35 + brillo * 0.45} transform={`rotate(-35 ${-r * 0.38} ${-r * 0.42})`} />
      {brillo > 0 && <circle r={r * 0.97} fill="none" stroke={NJ.cera} strokeWidth={r * 0.06} opacity={brillo * 0.7} />}
    </g>
    <path d={`M ${-r * 0.06} ${-r * 0.98} q ${r * 0.06} ${-r * 0.12} ${r * 0.14} ${-r * 0.02}`} stroke="#3c7d2a" strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
    <circle cy={-r * 0.95} r={r * 0.05} fill="#5a8f2e" stroke={KC.ink} strokeWidth={3} />
    {brillo > 0 && [0, 1, 2].map((i) => { const u = (T * 0.8 + i / 3) % 1; return <path key={i} d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z"
      transform={`translate(${Math.cos(i * 2.1) * r * 0.75} ${Math.sin(i * 2.1) * r * 0.75 - r * 0.2}) scale(${Math.sin(u * Math.PI) * brillo * 1.4})`} fill="#fff" />; })}
  </g>;
}

// Frutero (tazón) con naranjas. podrida = la del frente; sale 0..1 = la podrida se va del tazón.
function Frutero({ T, x = 540, y = 1060, s = 1, mancha = 1, sale = 0, raspones = 0, herida = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Naranja x={-170} y={-130} r={125} seed={11} raspon={raspones} mpos={[0.3, 0.2]} />
    <Naranja x={10} y={-170} r={135} seed={12} />
    <Naranja x={190} y={-120} r={120} seed={13} raspon={raspones} mpos={[-0.2, 0.25]} />
    <path d="M -380 -40 Q -360 170 0 180 Q 360 170 380 -40 Z" fill="#2fb5a0" stroke={KC.ink} strokeWidth={9} />
    <path d="M -380 -40 Q 0 30 380 -40" stroke={KC.ink} strokeWidth={7} fill="none" />
    {[-250, -120, 0, 120, 250].map((dx, i) => <circle key={i} cx={dx} cy={70 + Math.abs(dx) * -0.1} r={14} fill="#fff" opacity=".45" />)}
    <g transform={`translate(${klerp(-20, -720, kEase.suave(sale))} ${klerp(-40, -120, Math.sin(sale * Math.PI))})`}>
      <Naranja x={0} y={0} r={150} seed={5} mancha={mancha} mpos={[0.12, -0.05]} mr={0.58} />
      {herida > 0 && <g opacity={herida}>
        <circle cx={18} cy={-8} r={95} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray="16 10" />
        {Array.from({ length: 9 }, (_, i) => { const a = i * 0.7 + 0.3; return <path key={i} d={`M 18 -8 q ${Math.cos(a) * 40} ${Math.sin(a) * 20} ${Math.cos(a) * 80 * herida} ${Math.sin(a) * 80 * herida}`} stroke={NJ.blanco} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
        <path d="M -4 -22 L 40 6" stroke="#b0480a" strokeWidth={12} strokeLinecap="round" />
      </g>}
    </g>
  </g>;
}

// Nube de esporas (puntitos que se esparcen). p 0..1 · dir = [dx, dy] hacia dónde la lleva el aire.
function NubeEsporas({ x, y, p, n = 40, color = NJ.olivo2, dir = [0, -1], dist = 260, seed = 9 }) {
  if (p <= 0 || p >= 1) return null;
  const g = krng(seed);
  return <g opacity={Math.sin(Math.PI * p)}>{Array.from({ length: n }, (_, i) => { const a = g() * Math.PI * 2, rr = g() * 90, sp = 0.5 + g();
    return <circle key={i} cx={x + Math.cos(a) * rr * (0.3 + p) + dir[0] * dist * p * sp} cy={y + Math.sin(a) * rr * (0.3 + p) + dir[1] * dist * p * sp} r={5 + (i % 3) * 2.5} fill={color} stroke={KC.ink} strokeWidth={1.5} />; })}</g>;
}

// Espora (conidio) de P. digitatum: elipsoidal a cilíndrica, lisa. tubo 0..1 = germina.
function Espora({ x, y, s = 1, rot = 0, tubo = 0, color = NJ.olivo2 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {tubo > 0 && <path d={`M 22 0 q 40 -20 ${80 * tubo} ${-10 * tubo} t ${80 * tubo} ${10 * tubo}`} stroke={NJ.blanco} strokeWidth={12} fill="none" strokeLinecap="round" />}
    <ellipse rx={28} ry={18} fill={color} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-8} cy={-6} rx={9} ry={5} fill="#fff" opacity=".5" />
  </g>;
}

// Conidióforo en forma de pincel con cadenas de esporas (esquemático). p 0..1 crece.
function Pincel({ x, y, s = 1, p = 1, color = NJ.olivo2 }) {
  const tallo = 300 * kprog(p, 0, 0.35);
  const ramas = [-34, 0, 34];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 0 ${-tallo}`} stroke={NJ.blanco} strokeWidth={14} strokeLinecap="round" />
    {p > 0.35 && ramas.map((a, i) => { const k = kprog(p, 0.35, 0.55); const bx = Math.sin(a * Math.PI / 180) * 70 * k, by = -tallo - Math.cos(a * Math.PI / 180) * 60 * k;
      const n = Math.round(6 * kprog(p, 0.55, 1));
      return <g key={i}>
        <path d={`M 0 ${-tallo} L ${bx} ${by}`} stroke={NJ.blanco} strokeWidth={11} strokeLinecap="round" />
        {[-14, 14].map((d, j) => <g key={j}>{Array.from({ length: n }, (_, q) => <ellipse key={q} cx={bx + d * 0.6 + Math.sin(a * Math.PI / 180) * q * 26} cy={by - 26 - q * 30} rx={11} ry={15} fill={color} stroke={KC.ink} strokeWidth={3} />)}</g>)}
      </g>; })}
  </g>;
}

// Corte de la cáscara (vista lateral). sup = y de la superficie. herida 0..1 = muesca; rota 0..1 = glándula rota.
function CorteCascara({ T, sup = 640, herida = 0, rota = 0 }) {
  const g = krng(31);
  const glands = [120, 330, 540, 750, 960];
  const d = 170 * herida;
  return <g>
    <rect x={-20} y={sup} width={1120} height={130} fill={NJ.piel} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={sup + 130} width={1120} height={240} fill={NJ.albedo} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={g() * 1080} cy={sup + 150 + g() * 200} r={10 + g() * 16} fill="none" stroke="#efdcbc" strokeWidth={4} />)}
    <rect x={-20} y={sup + 370} width={1120} height={300} fill={NJ.pulpa} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${i * 130 - 20} ${sup + 380} q 65 120 0 280`} stroke="#ff9a1f" strokeWidth={10} fill="none" />)}
    {glands.map((gx, i) => { const r = i === 2 ? rota : 0; return <g key={i}>
      <ellipse cx={gx} cy={sup + 62} rx={48} ry={40} fill={NJ.glandula} stroke={KC.ink} strokeWidth={5} opacity={1 - r * 0.6} />
    </g>; })}
    {herida > 0 && <path d={`M ${540 - 70 * herida} ${sup - 4} L 540 ${sup + d} L ${540 + 70 * herida} ${sup - 4} Z`} fill={KC.mint} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
    {rota > 0 && Array.from({ length: 8 }, (_, i) => { const u = ((T * 0.9 + i / 8) % 1); return <circle key={i} cx={540 + Math.cos(i * 0.8) * 30 * u} cy={sup + 40 - u * 120} r={9 * (1 - u) + 3} fill={NJ.glandula} stroke={KC.ink} strokeWidth={2} opacity={rota * (1 - u)} />; })}
  </g>;
}

// Células de la cáscara (al microscopio) con paredes que se deshacen según la distancia a la hifa.
function CelulasCascara({ T, frente = 0, x0 = 300, y0 = 900 }) {
  const cells = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
    const cx = 120 + c * 150 + (r % 2) * 70, cy = 620 + r * 120;
    const dist = Math.hypot(cx - x0, cy - y0) / 700;
    const se = kclamp((frente - dist) * 4, 0, 1);
    cells.push(<g key={r + '-' + c}>
      <rect x={cx - 68} y={cy - 54} width={136} height={108} rx={26} fill={mixHex('#f2a64a', '#5b4a35', se * 0.6)} opacity={0.9 - se * 0.4} />
      <rect x={cx - 68} y={cy - 54} width={136} height={108} rx={26} fill="none" stroke={mixHex('#ffd48a', '#7a6a55', se)} strokeWidth={10 - se * 6} strokeDasharray={se > 0.1 ? `${30 - se * 26} ${4 + se * 24}` : 'none'} opacity={1 - se * 0.5} />
    </g>);
  }
  return <g>{cells}</g>;
}
// Enzima: tijerita (esquemática).
function Tijera({ x, y, s = 1, T, i = 0 }) {
  const ab = 18 + Math.sin(T * 14 + i) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 34 ${-ab * 0.5}`} stroke={KC.yellow} strokeWidth={9} strokeLinecap="round" />
    <path d={`M 0 0 L 34 ${ab * 0.5}`} stroke={KC.yellow} strokeWidth={9} strokeLinecap="round" />
    <circle cx={-8} cy={-8} r={8} fill="none" stroke={KC.yellow} strokeWidth={5} /><circle cx={-8} cy={8} r={8} fill="none" stroke={KC.yellow} strokeWidth={5} />
  </g>;
}
// Medidor de acidez (sin números: solo "más ácido").
function MedidorAcido({ T, at, until, nivel, x = 90, y = 470 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'0 0', display:'flex', gap:16, alignItems:'center' }}>
    <div style={{ width:46, height:260, borderRadius:23, border:`5px solid ${KC.texto}`, background:'linear-gradient(#2fe0a8,#ffe11a,#ff3b2f)', position:'relative' }}>
      <div style={{ position:'absolute', left:-16, right:-16, top: 20 + nivel * 200, height:10, background:KC.texto, borderRadius:5, boxShadow:'0 3px 0 rgba(0,0,0,.6)' }}></div>
    </div>
    <div style={{ font:`700 30px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, lineHeight:1.3 }}>ACIDEZ<br />↓ más ácido</div>
  </div>;
}

// Banda de empacadora: naranjas que avanzan; estaciones de lavado, selección, fungicida y cera.
function Empacadora({ T, a }) {
  const yb = 980, N = 6;
  const quita = kprog(T, a + 1.6, a + 2.4, kEase.sale);
  return <g>
    <rect x={-20} y={yb + 60} width={1120} height={60} fill="#5d6670" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={((i * 100 - T * 140) % 1200 + 1200) % 1200 - 60} cy={yb + 90} r={20} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />)}
    {/* estaciones */}
    <g transform="translate(200 0)">
      {[-50, 0, 50].map((dx, i) => <g key={i} transform={`translate(${dx} ${yb - 150}) rotate(${T * 300 + i * 40})`}><circle r={32} fill="#ffd0e1" stroke={KC.ink} strokeWidth={5} />{[0, 60, 120].map((r) => <line key={r} x1={-30} y1={0} x2={30} y2={0} transform={`rotate(${r})`} stroke={KC.ink} strokeWidth={3} />)}</g>)}
      {Array.from({ length: 10 }, (_, i) => { const u = (T * 0.7 + i / 10) % 1; return <circle key={i} cx={-80 + (i * 37) % 160} cy={yb - 100 + u * 60} r={10 + u * 8} fill="#fff" stroke="#9ad7ff" strokeWidth={3} opacity={1 - u} />; })}
    </g>
    <g transform="translate(720 0)">
      <rect x={-60} y={yb - 240} width={120} height={40} rx={12} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => { const u = (T * 1.6 + i / 12) % 1; return <path key={i} d="M 0 -10 Q 7 4 0 10 Q -7 4 0 -10 Z" transform={`translate(${-50 + (i * 23) % 100} ${yb - 190 + u * 150})`} fill="#7fd6ff" stroke={KC.ink} strokeWidth={2} />; })}
    </g>
    <g transform="translate(960 0)">
      <rect x={-70} y={yb - 240} width={140} height={46} rx={14} fill={NJ.cera} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 6 }, (_, i) => { const u = (T * 1.2 + i / 6) % 1; return <ellipse key={i} cx={-40 + i * 16} cy={yb - 180 + u * 120} rx={6} ry={12} fill={NJ.cera} stroke={KC.ink} strokeWidth={2} opacity={1 - u * 0.5} />; })}
    </g>
    {Array.from({ length: N }, (_, i) => { const xx = ((T * 140 + i * 210) % 1260) - 90; const pod = i === 2;
      const sube = pod ? quita : 0; const lavada = xx > 200 ? 1 : 0, cera = xx > 960 ? kclamp((xx - 960) / 60, 0, 1) : 0;
      return <g key={i} transform={`translate(0 ${-sube * 420})`} opacity={pod ? 1 - kprog(T, a + 2.6, a + 3.0) : 1}>
        <Naranja x={pod ? 520 : xx} y={yb - 10} r={62} seed={i + 20} mancha={pod ? 1 : 0} mr={0.6} brillo={cera} T={T} rot={xx * 0.5} />
      </g>; })}
    {/* mano que saca la podrida */}
    {quita > 0 && <g transform={`translate(520 ${yb - 80 - quita * 420})`} opacity={1 - kprog(T, a + 2.6, a + 3.0)}>
      <rect x={-34} y={-150} width={68} height={120} rx={30} fill="#f2c29b" stroke={KC.ink} strokeWidth={6} />
      <rect x={-60} y={-60} width={120} height={50} rx={22} fill="#f2c29b" stroke={KC.ink} strokeWidth={6} />
    </g>}
  </g>;
}

// Tina con agua tibia (baño de carbonato de sodio).
function Tina({ T, x, y, naranjas = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -300 -80 L 300 -80 L 260 160 Q 0 190 -260 160 Z" fill="#c9d3dc" stroke={KC.ink} strokeWidth={9} />
    <path d={`M -290 -30 Q -150 ${-46 + Math.sin(T * 3) * 8} 0 -30 T 290 -30 L 262 150 Q 0 178 -262 150 Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={5} opacity=".9" />
    {Array.from({ length: 8 }, (_, i) => { const u = (T * 0.5 + i / 8) % 1; return <path key={i} d="M 0 0 q 8 -14 0 -28" transform={`translate(${-220 + i * 60} ${-90 - u * 80})`} stroke="#fff" strokeWidth={6} fill="none" opacity={(1 - u) * 0.7} />; })}
    {naranjas > 0 && [-150, 0, 150].map((dx, i) => <Naranja key={i} x={dx} y={10 + Math.sin(T * 2 + i) * 6 - (1 - naranjas) * 300} r={70} seed={40 + i} raspon={1} mpos={[0, -0.2]} />)}
  </g>;
}
// Termómetro (sin número dentro; el valor va en el chip).
function Termometro({ x, y, nivel = 0.6, color = KC.red, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-220} width={44} height={240} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-10} y={-200 + 200 * (1 - nivel)} width={20} height={200 * nivel + 10} rx={10} fill={color} />
    <circle cy={40} r={40} fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Caja (comparación esquemática).
function Caja({ x, y, podridas = [], etiqueta, color = '#c98b4a', T }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3, 4, 5].map((i) => <Naranja key={i} x={-105 + (i % 3) * 105} y={-60 + Math.floor(i / 3) * 90} r={52} seed={50 + i} mancha={podridas.includes(i) ? 1 : 0} mr={0.7} T={T} />)}
    <path d="M -190 20 L 190 20 L 170 140 L -170 140 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
    <line x1={-180} y1={80} x2={180} y2={80} stroke={KC.ink} strokeWidth={4} />
    <text y={210} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}

function NaranjaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Herida, A: CUES.Aceite, E: CUES.Enzimas, P: CUES.Pelusa, Az: CUES.Azul, Q: CUES.Pregunta, Em: CUES.Empacadora, Ce: CUES.Cera,
    Es: CUES.Estudio, B: CUES.Bano, Ai: CUES.Aire, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el dedo toca la naranja y se acerca la cámara a la mancha
  const toque = kprog(T, K.G + 0.2, K.G + 0.5, kEase.sale) * (1 - kprog(T, K.G + 0.7, K.G + 1.1));
  const zoomG = 1 + 0.6 * kprog(T, K.G + 1.4, K.G + 3.2, kEase.suave);
  const caida = kprog(T, K.H, K.H + 0.6, kEase.sale);
  const corte = kprog(T, K.H + 1.2, K.H + 1.6);
  const germ = kprog(T, K.A + 2.2, K.A + 3.6, kEase.sale);
  const frente = kprog(T, K.E + 0.6, K.E + 4.6);
  const pelusa = kprog(T, K.P - 0.2, K.P + 3.2);
  const contagio = kprog(T, K.Az + 2.8, K.Az + 5.2);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la naranja del frutero con su polvo verde */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${zoomG})`, transformOrigin:'540px 1010px' }}>
          {fsvg(<>
            <Frutero T={T} x={540} y={1060} mancha={1} />
            <NubeEsporas x={560} y={1010} p={kprog(T, K.G + 0.35, K.G + 2.4)} dir={[0.3, -1]} dist={220} />
            <g transform={`translate(${klerp(-80, 330, toque)} 990)`}>
              <rect x={-420} y={-40} width={420} height={80} rx={40} fill="#f2c29b" stroke={KC.ink} strokeWidth={7} />
              <ellipse cx={-30} cy={-6} rx={22} ry={16} fill="#ffe3d0" stroke={KC.ink} strokeWidth={3} />
            </g>
          </>)}
        </div>
        {fsvg(<g opacity={kprog(T, K.G + 2.3, K.G + 2.7)}>
          <circle cx={300} cy={620} r={200} fill={KC.noche} stroke={KC.white} strokeWidth={10} />
          {[[-110, 60, -10], [-30, 40, 5], [60, 70, 12]].map(([dx, dy, rot], j) => <g key={j}>
            {Array.from({ length: 5 }, (_, q) => <Espora key={q} x={300 + dx + q * 6} y={620 + dy - q * 46} s={0.8} rot={90 + rot} />)}
          </g>)}
          <text x={300} y={790} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>AL MICROSCOPIO</text>
        </g>)}
      </Escena>
      {/* 2 · la herida: golpe → corte de la cáscara */}
      <Escena T={T} a={K.H} b={K.A}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {corte < 1 && <g opacity={1 - corte}>
            <rect x={0} y={1100} width={KW} height={300} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
            <path d="M 700 1100 L 760 1040 L 820 1100 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
            <Naranja x={klerp(380, 640, caida)} y={klerp(500, 950, caida)} r={150} seed={8} raspon={kprog(T, K.H + 0.6, K.H + 0.8)} mpos={[0.2, 0.6]} rot={caida * 90} />
          </g>}
          {corte > 0 && <g opacity={corte}><CorteCascara T={T} sup={640} herida={kprog(T, K.H + 1.6, K.H + 2.4, kEase.sale)} rota={0} /></g>}
        </>)}
      </Escena>
      {/* 3 · al microscopio: sale aceite y azúcar; la espora germina */}
      <Escena T={T} a={K.A} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d="M 0 700 L 380 700 L 540 980 L 700 700 L 1080 700 L 1080 1200 L 0 1200 Z" fill="#b5631a" opacity=".55" stroke={KC.ink} strokeWidth={6} />
          <ellipse cx={330} cy={860} rx={170} ry={120} fill={NJ.glandula} stroke={KC.ink} strokeWidth={7} opacity=".85" />
          <path d="M 470 830 L 520 870 L 480 900" stroke={KC.ink} strokeWidth={8} fill="none" />
          {Array.from({ length: 12 }, (_, i) => { const u = ((T - K.A) * 0.5 + i / 12) % 1; const on = kprog(T, K.A + 0.3, K.A + 0.8);
            return <circle key={i} cx={500 + u * 160 + (i % 3) * 20} cy={860 - u * 110 + (i % 4) * 25} r={16 * (1 - u * 0.5)} fill={NJ.glandula} stroke={KC.ink} strokeWidth={3} opacity={on * (1 - u)} />; })}
          {Array.from({ length: 10 }, (_, i) => { const u = ((T - K.A) * 0.4 + i / 10) % 1; const on = kprog(T, K.A + 1.0, K.A + 1.5);
            return <rect key={i} x={560 + (i % 5) * 34} y={900 - u * 160} width={14} height={14} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={on * (1 - u)} transform={`rotate(${i * 20} ${567 + (i % 5) * 34} ${907 - u * 160})`} />; })}
          <Espora x={klerp(700, 560, kprog(T, K.A + 1.2, K.A + 2.2, kEase.sale))} y={klerp(420, 940, kprog(T, K.A + 1.2, K.A + 2.2, kEase.sale))} s={1.5} rot={-20} tubo={germ} />
        </>)}
      </Escena>
      {/* 4 · acidifica y suelta enzimas: las paredes de las células se deshacen */}
      <Escena T={T} a={K.E} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <CelulasCascara T={T} frente={frente} x0={160} y0={1000} />
          <defs><clipPath id="clipEnz"><rect x={0} y={540} width={1080} height={640} /></clipPath></defs>
          <g clipPath="url(#clipEnz)"><RedHifas T={T} x={160} y={1000} g={0.2 + frente * 0.8} seed={7} n={120} escala={0.9} color={NJ.blanco} ancho={7} rot={-30} /></g>
          {Array.from({ length: 8 }, (_, i) => { const u = kclamp(frente * 1.3 - i * 0.06, 0, 1); return u > 0 ? <Tijera key={i} T={T} i={i} x={160 + Math.cos(-0.5 + i * 0.18) * 650 * u} y={1000 + Math.sin(-0.5 + i * 0.18) * 650 * u - 120} s={1.1} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · se ablanda, pelusa blanca y polvo verde olivo */}
      <Escena T={T} a={K.P} b={K.Az} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Naranja x={420} y={880} r={300} seed={5} mancha={pelusa} mpos={[0.05, 0]} mr={0.62} />
          <g opacity={kprog(T, K.P + 2.4, K.P + 2.8)}>
            <circle cx={820} cy={1010} r={180} fill={KC.noche} stroke={KC.white} strokeWidth={10} />
            <Pincel x={820} y={1150} s={0.5} p={kprog(T, K.P + 2.5, K.P + 4.2)} />
            <line x1={880} y1={1140} x2={915} y2={1140} stroke={KC.texto} strokeWidth={6} />
            <text x={898} y={1128} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill={KC.texto}>10 µm</text>
          </g>
        </>)}
      </Escena>
      {/* 6 · el moho azul: aguanta más el frío y contagia más a la de junto */}
      <Escena T={T} a={K.Az} b={K.Q}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Naranja x={270} y={720} r={140} seed={5} mancha={1} mr={0.6} />
          <Naranja x={270} y={1010} r={130} seed={61} mancha={0} />
          <Naranja x={800} y={720} r={140} seed={6} mancha={1} tipo="azul" mr={0.6} />
          <Naranja x={800} y={1010} r={130} seed={62} mancha={contagio} tipo="azul" mpos={[0, -0.75]} mr={0.5} />
          <g opacity={kprog(T, K.Az + 1.6, K.Az + 2.0)}>
            <Termometro x={540} y={940} nivel={0.2} color="#4aa8ff" s={0.8} />
            <path d="M 540 680 L 540 760 M 505 700 L 575 740 M 505 740 L 575 700" stroke="#fff" strokeWidth={9} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿por qué brillan? */}
      <Escena T={T} a={K.Q} b={K.Em} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Naranja x={300} y={960} r={210} seed={70} brillo={1} T={T} />
          <Interrogacion T={T} x={290} y={700} tam={340} />
        </>)}
      </Escena>
      {/* 8–9 · la empacadora y la cera */}
      <Escena T={T} a={K.Em} b={K.Ce}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Empacadora T={T} a={K.Em} />)}
      </Escena>
      <Escena T={T} a={K.Ce} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Naranja x={420} y={900} r={240} seed={71} brillo={1} T={T} />
          {Array.from({ length: 7 }, (_, i) => { const a = -2.6 + i * 0.55; const u = ((T - K.Ce) * 0.9 + i / 7) % 1; const rr = 240 + Math.sin(u * Math.PI) * 50;
            return <path key={i} d="M 0 -16 Q 11 2 0 14 Q -11 2 0 -16 Z" transform={`translate(${420 + Math.cos(a) * rr} ${900 + Math.sin(a) * rr}) rotate(${a * 57 + 90})`} fill="#7fd6ff" stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Ce + 0.3, K.Ce + 0.6)} />; })}
        </>)}
      </Escena>
      {/* 10–11 · el estudio de 1997 en Fresno, California */}
      <Escena T={T} a={K.Es} b={K.Ai}>
        <FondoLunares color={T < K.B ? KC.cyan : KC.mint} />
        {fsvg(<>
          {T < K.B + 0.3 && <g opacity={1 - kprog(T, K.B - 0.2, K.B + 0.3)}>
            {[0, 1, 2, 3, 4].map((i) => { const on = kprog(T, K.Es + 1.4 + i * 0.15, K.Es + 1.8 + i * 0.15, kEase.rebote); return on > 0 ? <g key={i} transform={`translate(${150 + i * 195} 1010) scale(${on})`}>
              <Naranja x={0} y={0} r={80} seed={80 + i} raspon={1} mpos={[0, -0.3]} />
              {Array.from({ length: 5 }, (_, q) => { const u = kprog(T, K.Es + 2.4 + q * 0.1, K.Es + 3.0 + q * 0.1); return <circle key={q} cx={-20 + q * 10} cy={-24 - (1 - u) * 160} r={6} fill={NJ.olivo2} stroke={KC.ink} strokeWidth={2} opacity={u > 0 ? 1 : 0} />; })}
            </g> : null; })}
          </g>}
          {T > K.B - 0.3 && T < K.B + 3.4 && <g opacity={kprog(T, K.B - 0.3, K.B + 0.2) * (1 - kprog(T, K.B + 3.0, K.B + 3.4))}>
            <Tina T={T} x={420} y={900} naranjas={kprog(T, K.B + 1.2, K.B + 1.8, kEase.sale)} />
            <Termometro x={860} y={960} nivel={0.65} />
          </g>}
          {T > K.B + 3.0 && <g opacity={kprog(T, K.B + 3.0, K.B + 3.4)}>
            <Caja x={280} y={840} podridas={[0, 2, 3, 4]} etiqueta="sin baño" T={T} />
            <Caja x={800} y={840} podridas={[4]} etiqueta="con baño" color="#7fc28a" T={T} />
          </g>}
        </>)}
      </Escena>
      {/* 12 · las esporas viajan por el aire */}
      <Escena T={T} a={K.Ai} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Frutero T={T} x={540} y={1060} mancha={1} raspones={1} />
          <NubeEsporas x={520} y={1000} p={kprog(T, K.Ai + 0.3, K.Ai + 4.4)} n={60} dir={[0, -1]} dist={260} seed={12} />
          <NubeEsporas x={520} y={1000} p={kprog(T, K.Ai + 0.8, K.Ai + 4.6)} n={30} dir={[-1.2, -0.3]} dist={300} seed={13} />
          <NubeEsporas x={520} y={1000} p={kprog(T, K.Ai + 1.0, K.Ai + 4.6)} n={30} dir={[1.2, -0.3]} dist={300} seed={14} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo frutero; la herida por dentro y la naranja sale del frutero */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Frutero T={T} x={540} y={1060} mancha={1} herida={kprog(T, K.C + 0.3, K.C + 1.3)} sale={kprog(T, K.C + 2.2, K.C + 3.6)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.6} until={K.G + 2.2} texto="¿polvo?" x={300} y={440} tam={48} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.8} until={K.H - 0.3} x={60} y={880} texto="moho verde" tam={36} />
      <Etq T={T} at={K.G + 3.2} until={K.H - 0.3} x={60} y={935} texto="Penicillium digitatum" it tam={36} />
      <Chip T={T} at={K.H + 0.7} until={K.H + 1.5} texto="¡raspón!" x={380} y={460} tam={44} borde={KC.red} />
      <Chip T={T} at={K.H + 1.7} until={K.A - 0.3} texto="la herida le abre la puerta" x={400} y={470} tam={34} borde={KC.red} />
      <Etq T={T} at={K.H + 2.0} until={K.A - 0.3} x={60} y={600} texto="cáscara" tam={28} color={KC.ink} />
      <Etq T={T} at={K.H + 2.2} until={K.A - 0.3} x={60} y={700} texto="glándula de aceite" tam={26} color={KC.ink} />
      <Etq T={T} at={K.H + 2.4} until={K.A - 0.3} x={60} y={860} texto="parte blanca" tam={26} color={KC.ink} />
      <Chip T={T} at={K.A + 0.2} until={K.E - 0.3} texto="AL MICROSCOPIO" x={360} y={430} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.A + 0.6} until={K.E - 0.3} x={60} y={640} texto="aceite" tam={30} color={NJ.glandula} />
      <Etq T={T} at={K.A + 1.2} until={K.E - 0.3} x={1040} y={1040} lado="izq" texto="azúcares" tam={30} />
      <Etq T={T} at={K.A + 2.4} until={K.E - 0.3} x={60} y={1100} texto="espora germinando" tam={30} color={NJ.olivo2} />
      <Chip T={T} at={K.A + 1.0} until={K.E - 0.3} texto="esquemático, sin proporción" x={360} y={510} tam={24} borde={KC.ink} />
      <MedidorAcido T={T} at={K.E + 0.3} until={K.P - 0.3} nivel={kprog(T, K.E + 0.4, K.E + 1.8)} x={70} y={380} />
      <Etq T={T} at={K.E + 2.3} until={K.P - 0.3} x={380} y={470} texto="enzimas = «tijeritas»" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.E + 0.8} until={K.P - 0.3} x={60} y={1080} texto="hifa" tam={30} color={NJ.blanco} />
      <Etq T={T} at={K.P + 1.4} until={K.Az - 0.3} x={60} y={470} texto="pelusa blanca: el hongo joven" tam={26} color={KC.ink} />
      <Etq T={T} at={K.P + 2.4} until={K.Az - 0.3} x={60} y={530} texto="verde olivo: esporas" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Az + 0.3} until={K.Q - 0.3} texto="moho verde" x={270} y={450} tam={36} borde={NJ.olivo} />
      <Chip T={T} at={K.Az + 0.6} until={K.Q - 0.3} texto="moho azul" x={800} y={450} tam={36} borde={NJ.azul} />
      <Etq T={T} at={K.Az + 0.5} until={K.Q - 0.3} x={60} y={555} texto="P. digitatum" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Az + 0.8} until={K.Q - 0.3} x={1040} y={555} lado="izq" texto="P. italicum" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.Az + 1.8} until={K.Q - 0.3} texto="aguanta más el frío" x={540} y={1160} tam={30} borde="#4aa8ff" />
      <Chip T={T} at={K.Em + 0.4} until={K.Ce - 0.3} texto="1 · lavar" x={260} y={460} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Em + 1.6} until={K.Ce - 0.3} texto="2 · sacar las podridas" x={330} y={540} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Em + 3.0} until={K.Ce - 0.3} texto="3 · fungicida en agua o en la cera" x={400} y={620} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ce + 0.3} until={K.Es - 0.3} texto="la cera: menos pérdida de agua" x={400} y={470} tam={32} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.B - 0.3} anio="1997" quien="Fresno, California" revista="Smilanick et al. · Plant Disease" x={360} y={600} />
      <NumeroGigante T={T} at={K.B + 0.1} until={K.B + 1.4} valor={24} dur={1.0} sufijo=" h" etiqueta="después de infectarlas" x={380} y={500} tam={130} />
      <Chip T={T} at={K.B + 1.5} until={K.B + 3.0} texto="2 min · carbonato de sodio" x={400} y={470} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.B + 1.8} until={K.B + 3.0} texto="agua tibia ≈ 40 °C" x={400} y={560} tam={32} borde={KC.red} />
      <Chip T={T} at={K.B + 3.4} until={K.Ai - 0.3} texto="el moho bajó en todas las pruebas" x={420} y={470} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.B + 3.8} until={K.Ai - 0.3} texto="esquema: sin cifras del estudio" x={380} y={560} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.Ai + 2.6} until={K.C - 0.3} texto="sácala" x={300} y={500} tam={56} borde={KC.red} />
      <Etq T={T} at={K.Ai + 1.2} until={K.C - 0.3} x={60} y={640} texto="esporas en el aire" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="entró por una herida" x={360} y={470} tam={38} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.H} until={K.H + 1.4} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.H + 1.4} until={K.A} texto="1 mm" largo={90} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="10 µm" largo={80} />
      <BarraEscala T={T} at={K.P} until={K.Az} texto="5 cm" largo={140} />
      <BarraEscala T={T} at={K.Az} until={K.Q} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.Q} until={K.Em} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.Em} until={K.Ce} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Ce} until={K.Es} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.Es} until={K.B} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.B} until={K.Ai} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.Ai} until={K.Ou} texto="5 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es polvo: *son esporas.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.A - 0.1} texto="Entró por *una herida.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.E - 0.1} texto="Aceites y azúcares *despiertan a la espora.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.P - 0.1} texto="Enzimas que *deshacen las paredes.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Az - 0.1} texto="Pelusa blanca… *y polvo verde olivo.*" />
      <Subtitulo T={T} idx={5} at={K.Az + 0.1} until={K.Q - 0.1} texto="¿Azul? Es su primo, *Penicillium italicum.*" />
      <Subtitulo T={T} idx={6} at={K.Q + 0.1} until={K.Em - 0.1} texto="¿Por qué *brillan?*" />
      <Subtitulo T={T} idx={7} at={K.Em + 0.1} until={K.Ce - 0.1} texto="Lavar, sacar las podridas, *fungicida.*" />
      <Subtitulo T={T} idx={8} at={K.Ce + 0.1} until={K.Es - 0.1} texto="La cera evita *que se sequen.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.B - 0.1} texto="1997, Fresno: *naranjas infectadas.*" />
      <Subtitulo T={T} idx={10} at={K.B + 0.1} until={K.Ai - 0.1} texto="Baño tibio con carbonato: *el moho bajó.*" />
      <Subtitulo T={T} idx={11} at={K.Ai + 0.1} until={K.C - 0.1} texto="Viajan por el aire: *sácala del frutero.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es un hongo que *entró por una herida.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.5, K.H + 3.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 0.3, K.E + 2.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.9, K.P + 4.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Q + 0.05, K.Em + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Em + 0.9, K.Ce + 2.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.5, K.B + 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.B + 3.4, K.Ai + 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ai + 0.6, K.C - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="55" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NaranjaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NaranjaShot /></CompositionStage></div>;
}
window.NaranjaApp = NaranjaApp;
