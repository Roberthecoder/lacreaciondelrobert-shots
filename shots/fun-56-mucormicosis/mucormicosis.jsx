// Shot Fungi Mati #56 · El "hongo negro" no es negro: mucormicosis — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (sin fotos de pacientes). No es consejo médico.

const MC = { piel:'#f1b48f', piel2:'#d98f6b', espora:'#6d6a73', esporangio:'#4a4852', hifa:'#cfe9ff', sangre:'#e23b3b', celula:'#f29aa6', muerto:'#1b1410', hierro:'#ff8a1f', transf:'#4f8dff' };

// Cara de frente (esquemática). mancha 0..1 = mancha oscura al costado de la nariz.
function Cara({ x, y, s = 1, mancha = 0, T = 0 }) {
  const parpadeo = (T % 3.7) > 3.6 ? 0.15 : 1;
  const r = 70 * mancha;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={-205} cy={10} rx={34} ry={60} fill={MC.piel2} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={205} cy={10} rx={34} ry={60} fill={MC.piel2} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={205} ry={255} fill={MC.piel} stroke={KC.ink} strokeWidth={9} />
    <path d="M -200 -60 Q -215 -250 0 -262 Q 215 -250 200 -60 Q 160 -170 0 -175 Q -150 -175 -200 -60 Z" fill="#3a2a20" stroke={KC.ink} strokeWidth={8} />
    <path d="M -120 -60 Q -80 -82 -40 -64" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 40 -64 Q 80 -82 120 -60" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={-80} cy={-20} rx={22} ry={22 * parpadeo} fill={KC.ink} />
    <ellipse cx={80} cy={-20} rx={22} ry={22 * parpadeo} fill={KC.ink} />
    {mancha > 0 && <g>
      <path d={`M ${-58 - r * 0.2} ${70 - r * 0.6} Q ${-58 - r * 1.1} ${70 - r * 0.5} ${-58 - r} ${70 + r * 0.3} Q ${-58 - r * 0.5} ${70 + r * 0.9} ${-58 + r * 0.1} ${70 + r * 0.6} Q ${-48} ${70} ${-58 - r * 0.2} ${70 - r * 0.6} Z`}
        fill={MC.muerto} stroke="#8a3b3b" strokeWidth={10 * mancha} opacity={0.4 + 0.6 * mancha} />
    </g>}
    <path d="M 0 -10 Q -10 60 -38 92 Q -10 112 22 98" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -60 160 Q 0 172 60 160" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}

// Persona (ícono chico).
function Personita({ x, y, s = 1, color = '#8fb6ff', pastilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-34} r={14} fill="#f2c29b" stroke={KC.ink} strokeWidth={3.5} />
    <path d="M -20 14 Q -22 -14 0 -16 Q 22 -14 20 14 Z" fill={color} stroke={KC.ink} strokeWidth={3.5} />
  </g>;
}

// Hifa ancha "como listón": tubo transparente (borde claro, interior casi vacío), con pocos tabiques. p = 0..1 crecimiento.
function Liston({ d, p = 1, ancho = 70, borde = MC.hifa, interior = 'rgba(13,20,36,.82)', septos = [] }) {
  if (p <= 0) return null;
  const da = `${p} 3`;
  return <g>
    <path d={d} pathLength={1} stroke={borde} strokeWidth={ancho + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={da} opacity=".95" />
    <path d={d} pathLength={1} stroke={interior} strokeWidth={ancho - 6} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={da} />
    <path d={d} pathLength={1} stroke="rgba(207,233,255,.18)" strokeWidth={ancho - 6} fill="none" strokeLinecap="round" strokeDasharray={da} />
    {septos.filter(([u]) => u < p).map(([u, sx, sy, ang], i) => <line key={i} x1={sx - Math.cos(ang) * ancho * 0.45} y1={sy - Math.sin(ang) * ancho * 0.45} x2={sx + Math.cos(ang) * ancho * 0.45} y2={sy + Math.sin(ang) * ancho * 0.45} stroke={borde} strokeWidth={4} />)}
  </g>;
}

// Esporangióforo de Rhizopus/Mucor: tallo con esporangio (bolita gris oscuro) en la punta. crece 0..1.
function Esporangioforo({ x, y, alto = 260, crece = 1, rot = 0, r = 30 }) {
  if (crece <= 0) return null;
  const h = alto * kEase.sale(kclamp(crece * 1.4, 0, 1)), b = kclamp(crece * 2 - 1, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 Q 6 ${-h * 0.5} 0 ${-h}`} stroke="#f7f4ec" strokeWidth={9} fill="none" strokeLinecap="round" />
    {b > 0 && <circle cx={0} cy={-h - r * b} r={r * b} fill={MC.esporangio} stroke={KC.ink} strokeWidth={4} />}
    {b > 0 && <circle cx={-r * 0.3 * b} cy={-h - r * 1.3 * b} r={r * 0.22 * b} fill="#7b7884" />}
  </g>;
}

// Corte de tejido con células (para la escena de la hifa transparente y el vaso).
function Celulas({ x0, y0, w, h, n = 14, seed = 3, muerte = 0, foco, radio = 9999 }) {
  const g = krng(seed), out = [];
  const cols = Math.round(Math.sqrt(n * w / h)), filas = Math.ceil(n / cols), cw = w / cols, ch = h / filas;
  for (let i = 0; i < cols * filas; i++) {
    const c = i % cols, f = Math.floor(i / cols), cx = x0 + cw * (c + 0.5) + (g() - 0.5) * cw * 0.2, cy = y0 + ch * (f + 0.5) + (g() - 0.5) * ch * 0.2;
    const dist = foco ? Math.hypot(cx - foco[0], cy - foco[1]) : 0;
    const m = foco ? kclamp(muerte * 1.6 - dist / radio, 0, 1) : muerte;
    const col = m < 0.5 ? mixHex(MC.celula, '#7d7f88', m * 2) : mixHex('#7d7f88', MC.muerto, (m - 0.5) * 2);
    out.push(<g key={i}><ellipse cx={cx} cy={cy} rx={cw * 0.46} ry={ch * 0.44} fill={col} stroke={KC.ink} strokeWidth={4} />
      <circle cx={cx} cy={cy} r={Math.min(cw, ch) * 0.13} fill={mixHex('#8e3a7a', '#2a2326', m)} /></g>);
  }
  return <g>{out}</g>;
}

// Vaso sanguíneo horizontal con glóbulos rojos que corren (flujo = desplazamiento acumulado en px).
function Vaso({ y, alto = 230, flujo = 0, coagulo = 0, xc = 560 }) {
  const glob = Array.from({ length: 9 }, (_, i) => { let gx = (i * 150 + flujo) % 1350 - 140; return gx; });
  return <g>
    <rect x={-20} y={y - alto / 2} width={1120} height={alto} fill="#5a1520" />
    {glob.map((gx, i) => { const yy = y + ((i % 3) - 1) * 52; const cerca = coagulo > 0 && Math.abs(gx - xc) < 160;
      return <g key={i} transform={`translate(${gx} ${yy})`}><ellipse rx={46} ry={30} fill={MC.sangre} stroke={KC.ink} strokeWidth={4} opacity={cerca ? 0.9 : 1} /><ellipse rx={22} ry={11} fill="#b52a2a" /></g>; })}
    {coagulo > 0 && [[0, 0, 70], [-60, -40, 46], [50, 40, 52], [70, -50, 40], [-55, 55, 44], [10, -70, 38], [-10, 70, 38]].map(([dx, dy, r], i) =>
      <circle key={i} cx={xc + dx * coagulo} cy={y + dy * coagulo} r={r * coagulo} fill={i % 2 ? '#7a1420' : '#9b1c28'} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-20} y={y - alto / 2 - 22} width={1120} height={22} fill="#e58b96" stroke={KC.ink} strokeWidth={5} />
    <rect x={-20} y={y + alto / 2} width={1120} height={22} fill="#e58b96" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Mapa esquemático de India (contorno simplificado).
const INDIA = [[68.2, 23.7], [70.0, 20.8], [72.8, 19.0], [73.5, 16.0], [74.8, 12.8], [76.3, 9.5], [77.5, 8.1], [78.2, 8.9], [79.9, 10.3], [80.3, 13.1], [80.2, 15.7], [82.3, 16.6], [84.8, 19.3], [86.9, 20.8], [88.2, 21.7], [89.0, 22.2], [88.6, 24.3], [89.8, 25.9], [92.0, 25.2], [92.5, 23.8], [93.3, 23.0], [94.3, 24.6], [95.3, 26.7], [97.2, 27.8], [96.0, 29.4], [94.4, 29.2], [92.0, 27.8], [88.8, 27.3], [88.1, 26.4], [84.6, 27.4], [80.2, 28.8], [80.5, 30.4], [78.8, 31.2], [77.8, 35.5], [75.5, 36.8], [74.0, 34.5], [74.5, 32.8], [75.4, 32.2], [74.6, 31.1], [73.9, 30.0], [72.8, 28.9], [71.0, 27.8], [70.0, 26.6], [70.6, 25.4], [68.8, 24.3]];
function MapaIndia({ x, y, k = 16 }) {
  const d = 'M ' + INDIA.map(([lo, la]) => `${((lo - 68) * k).toFixed(1)} ${((37 - la) * k * 1.05).toFixed(1)}`).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y})`}><path d={d} fill="#ffd27a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>;
}

// Macrófago (célula de defensa) que engulle una espora: la espora queda quieta adentro, entera (no germina).
function Macrofago({ T, cx, cy, s = 1, p = 0 }) {
  const ex = klerp(150, 0, kEase.sale(kclamp(p * 1.4, 0, 1))), ey = klerp(-70, 0, kEase.sale(kclamp(p * 1.4, 0, 1)));
  const brazo = kclamp(p * 2 - 0.6, 0, 1);
  const N = 18, pts = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2; const rr = 120 + Math.sin(a * 3 + T * 2) * 12 + (Math.cos(a - (-0.45)) > 0.6 ? 40 * (1 - brazo) * Math.sin(T * 3) * 0.2 + 30 * (1 - Math.abs(brazo - 0.5) * 2) : 0); return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z';
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <path d={d} fill="rgba(177,140,255,.55)" stroke="#d9c8ff" strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={-50} cy={40} rx={34} ry={26} fill="#7c4fd0" stroke={KC.ink} strokeWidth={4} />
    {brazo > 0.7 && <circle cx={ex} cy={ey} r={38} fill="none" stroke="#e9ddff" strokeWidth={4} strokeDasharray="8 6" opacity={kprog(brazo, 0.7, 1)} />}
    <ellipse cx={ex} cy={ey} rx={24} ry={19} fill={MC.espora} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Transferrina (guarda el hierro). abre 0..1 = suelta el hierro.
function Transferrina({ x, y, abre = 0, s = 1, conHierro = 1 }) {
  const a = 25 + 35 * abre;
  const rad = (g) => g * Math.PI / 180;
  const d = `M 0 0 L ${Math.cos(rad(a)) * 50} ${-Math.sin(rad(a)) * 50} A 50 50 0 1 0 ${Math.cos(rad(-a)) * 50} ${-Math.sin(rad(-a)) * 50} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill={MC.transf} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {conHierro > 0 && <circle cx={18 + 20 * abre} cy={0} r={13} fill={MC.hierro} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
function Glucosa({ x, y, s = 1 }) {
  const d = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i; return `${i ? 'L' : 'M'} ${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(' ') + ' Z';
  return <path d={d} transform={`translate(${x} ${y}) scale(${s})`} fill="#fff4b0" stroke={KC.ink} strokeWidth={4} />;
}

function Frasco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-200} width={140} height={60} rx={12} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-150} width={240} height={330} rx={40} fill="#ffb347" stroke={KC.ink} strokeWidth={9} />
    <rect x={-100} y={-60} width={200} height={150} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CORTICOIDES</text>
    <text x={0} y={58} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">medicamento</text>
  </g>;
}

function MucorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ap: CUES.Apodo, Mu: CUES.Mucorales, Es: CUES.Esporas, Hi: CUES.Hifas, V: CUES.Vasos, P: CUES.Pregunta, E: CUES.Estudio, Co: CUES.Cosmic, Fe: CUES.Hierro, Ma: CUES.Mal_uso, Cn: CUES.Contagio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const manchaG = kprog(T, K.G + 0.2, K.G + 1.0, kEase.sale);

  // escena de las hifas: camino principal y ramas en ángulo casi recto
  const HMAIN = 'M 200 820 C 380 800 520 850 700 820 S 900 800 1000 830';
  const HR1 = 'M 470 832 L 470 560';
  const HR2 = 'M 760 818 L 766 980';
  const pH = kprog(T, K.Hi + 0.3, K.Hi + 2.6, kEase.suave);

  // vaso: la hifa entra, se forma el coágulo, la sangre se detiene y el tejido muere
  const vEntra = kprog(T, K.V + 0.2, K.V + 1.6, kEase.suave), vCoag = kprog(T, K.V + 1.5, K.V + 2.3, kEase.rebote), vMuere = kprog(T, K.V + 2.6, K.V + 4.8);
  const tc = K.V + 2.2, flujoV = 260 * (Math.min(T, tc) - K.V) + 30 * Math.max(0, Math.min(T, tc + 0.3) - tc);

  // hierro
  const fAzucar = kprog(T, K.Fe + 0.3, K.Fe + 1.4), fAbre = kprog(T, K.Fe + 1.6, K.Fe + 2.4, kEase.sale), fVuela = kprog(T, K.Fe + 2.4, K.Fe + 3.8, kEase.suave);

  // cosmic: dos rejillas (diabetes y corticoides; no se asume que sean las mismas personas)
  const fase2 = T >= K.Co + 3.6;
  const nPint = fase2 ? Math.floor(87 * kprog(T, K.Co + 3.8, K.Co + 5.4)) : Math.floor(78 * kprog(T, K.Co + 0.8, K.Co + 2.6));

  const interiorCierre = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 1080 1080" style={{ display:'block' }}>
    <rect width={1080} height={1080} fill={KC.noche} />
    <Celulas x0={0} y0={0} w={1080} h={300} n={10} seed={8} muerte={1} />
    <Celulas x0={0} y0={780} w={1080} h={300} n={10} seed={9} muerte={1} />
    <Vaso y={540} alto={330} flujo={0} coagulo={1} xc={560} />
    <Liston d="M 300 0 C 360 200 480 380 560 540 S 760 620 1000 560" p={1} ancho={70} />
  </svg>;

  const interiorMoho = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#2a1f14" />
    <path d="M 0 470 Q 300 430 600 480 L 600 600 L 0 600 Z" fill="#8a5a2b" stroke={KC.ink} strokeWidth={5} />
    <RedHifas T={t} x={300} y={470} g={kprog(t, K.Mu + 0.6, K.Mu + 2.0)} seed={11} n={160} escala={0.5} color="#fbf8ef" ancho={4} />
    {[[150, 470, 230, -8], [215, 468, 300, 4], [280, 465, 260, -2], [350, 466, 320, 6], [420, 470, 240, 10], [470, 474, 280, -6]].map(([x, y, h, rt], i) =>
      <Esporangioforo key={i} x={x} y={y} alto={h} rot={rt} r={26} crece={kprog(t, K.Mu + 1.0 + i * 0.18, K.Mu + 2.2 + i * 0.18)} />)}
  </svg>;

  const interiorSana = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill={KC.noche} />
    <Macrofago T={t} cx={300} cy={300} s={1.5} p={kprog(t, K.Es + 2.2, K.Es + 4.4)} />
  </svg>;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mancha negra en la cara */}
      <Escena T={T} a={K.G} b={K.Ap} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cara x={360} y={920} s={1.05} mancha={manchaG} T={T} />
          {(() => { const p = kprog(T, K.G + 0.3, K.G + 0.9, kEase.sale); return p > 0 ? <g opacity={p}>
            <path d={`M 90 640 Q 150 760 ${klerp(90, 230, p)} ${klerp(640, 950, p)}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d={`M 90 640 Q 150 760 ${klerp(90, 230, p)} ${klerp(640, 950, p)}`} stroke={KC.yellow} strokeWidth={7} fill="none" strokeLinecap="round" />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 1 · el apodo: "hongo negro"; en el tejido las hifas son transparentes */}
      <Escena T={T} a={K.Ap} b={K.Mu} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform={`translate(70 420) rotate(-3)`} opacity={kprog(T, K.Ap, K.Ap + 0.3)}>
            <rect width={560} height={330} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <text x={280} y={70} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">ASÍ LE DECÍAN</text>
            <text x={280} y={170} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.ink}>“HONGO NEGRO”</text>
            {[210, 245, 280].map((yy, i) => <rect key={i} x={40} y={yy} width={480 - i * 60} height={14} rx={7} fill="#c9c2b0" />)}
          </g>
          <Sello T={T} at={K.Ap + 1.0} x={520} y={700} texto="APODO" color={KC.red} r={95} />
          <g opacity={kprog(T, K.Ap + 1.6, K.Ap + 2.1)}>
            <rect x={60} y={850} width={960} height={330} rx={30} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <g clipPath="url(#clipTej)"><clipPath id="clipTej"><rect x={60} y={850} width={960} height={330} rx={30} /></clipPath>
              <Celulas x0={60} y0={850} w={960} h={330} n={16} seed={4} />
              <Liston d="M 40 1060 C 300 980 520 1080 760 960 S 960 940 1060 980" p={kprog(T, K.Ap + 2.0, K.Ap + 3.6, kEase.suave)} ancho={60} interior="rgba(255,255,255,.08)" borde="rgba(235,248,255,.95)" />
            </g>
          </g>
        </>)}
      </Escena>
      {/* 2 · mucorales: moho joven, blanco y algodonoso, en hojas podridas */}
      <Escena T={T} a={K.Mu} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1040} width={KW} height={900} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          {[[170, 1050, -18, '#8a5a2b'], [420, 1040, 10, '#6e4520'], [690, 1055, -6, '#7d4f24'], [930, 1045, 20, '#8a5a2b']].map(([x, y, r, c], i) =>
            <path key={i} d="M -150 0 Q 0 -70 150 0 Q 0 50 -150 0 Z" transform={`translate(${x} ${y}) rotate(${r})`} fill={c} stroke={KC.ink} strokeWidth={6} />)}
          {[[260, 1030], [540, 1025], [800, 1035]].map(([x, y], i) => { const c = kprog(T, K.Mu + 0.2 + i * 0.25, K.Mu + 1.4 + i * 0.25, kEase.sale);
            return c > 0 ? <g key={i}>{Array.from({ length: 9 }, (_, k) => <circle key={k} cx={x + (k - 4) * 22 * c} cy={y - Math.abs(Math.sin(k * 1.7)) * 40 * c} r={34 * c} fill="#fbf8ef" opacity=".92" />)}</g> : null; })}
        </>)}
        <Lupa T={T} at={K.Mu + 0.9} until={K.Es - 0.2} x={540} y={620} r={210} fx={540} fy={1010} interior={interiorMoho} tinte={KC.ink} etiqueta="AL MICROSCOPIO · esporangios" />
      </Escena>
      {/* 3 · esporas: se respiran; en una persona sana un macrófago la traga y se queda quieta */}
      <Escena T={T} a={K.Es} b={K.Hi} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cara x={330} y={930} s={0.8} T={T} />
          {Array.from({ length: 12 }, (_, i) => { const u = kprog(T, K.Es + i * 0.1, K.Es + 1.8 + i * 0.1, kEase.suave);
            const sx = klerp(1000 - (i % 4) * 40, 300 + (i % 3) * 8, u), sy = klerp(1250 - (i % 5) * 30, 975, u) + Math.sin(T * 3 + i) * 14 * (1 - u);
            return u > 0 && u < 1 ? <ellipse key={i} cx={sx} cy={sy} rx={11} ry={9} fill={MC.espora} stroke={KC.ink} strokeWidth={3} /> : null; })}
        </>)}
        <Lupa T={T} at={K.Es + 1.8} until={K.Hi - 0.2} x={760} y={900} r={170} fx={300} fy={980} interior={interiorSana} tinte={KC.lilac} etiqueta="PERSONA SANA" />
      </Escena>
      {/* 4 · hifas anchas, casi sin tabiques, como listones */}
      <Escena T={T} a={K.Hi} b={K.V} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <ellipse cx={200} cy={820} rx={44} ry={36} fill={MC.espora} stroke={KC.hifa} strokeWidth={5} />
          <Liston d={HMAIN} p={pH} ancho={78} septos={[[0.55, 700, 820, Math.PI / 2]]} />
          <Liston d={HR1} p={kprog(T, K.Hi + 1.4, K.Hi + 2.8, kEase.suave)} ancho={66} />
          <Liston d={HR2} p={kprog(T, K.Hi + 1.9, K.Hi + 3.2, kEase.suave)} ancho={66} />
          {(() => { const p = kprog(T, K.Hi + 1.0, K.Hi + 2.6); if (p <= 0) return null; return <g opacity={p}>
            <path d="M 150 1110 L 930 1110" pathLength={1} stroke="#9fd0a6" strokeWidth={22} strokeLinecap="round" strokeDasharray={`${p} 2`} />
            {Array.from({ length: 13 }, (_, i) => (i / 13 < p ? <line key={i} x1={190 + i * 58} y1={1098} x2={190 + i * 58} y2={1122} stroke={KC.noche} strokeWidth={5} /> : null))}
          </g>; })()}
        </>)}
      </Escena>
      {/* 5 · se meten en los vasos, los tapan y el tejido muere */}
      <Escena T={T} a={K.V} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Celulas x0={0} y0={420} w={1080} h={300} n={12} seed={6} muerte={vMuere} foco={[560, 760]} radio={700} />
          <Celulas x0={0} y0={1020} w={1080} h={200} n={10} seed={7} muerte={vMuere} foco={[560, 860]} radio={700} />
          <Vaso y={870} alto={250} flujo={flujoV} coagulo={vCoag} xc={600} />
          <Liston d="M 330 380 C 380 560 470 700 560 820 S 700 900 860 880" p={vEntra} ancho={58} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué tantos casos en India? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><MapaIndia x={50} y={600} k={16} /><Interrogacion T={T} x={250} y={1080} tam={420} /></>)}
      </Escena>
      {/* 7 · estudio: 10 centros, 112 → 231 casos */}
      <Escena T={T} a={K.E} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <line x1={100} y1={1150} x2={680} y2={1150} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          {[[160, 112, 'sept–dic 2019', K.E + 1.0, '#8fb6ff'], [430, 231, 'sept–dic 2020', K.E + 1.7, KC.red]].map(([x, v, et, t0, col], i) => { const p = kprog(T, t0, t0 + 1.0, kEase.sale); const h = v * 1.8 * p;
            return <g key={i}><rect x={x} y={1150 - h} width={200} height={h} fill={col} stroke={KC.ink} strokeWidth={7} />
              {p > 0 && <text x={x + 100} y={1150 - h - 18} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>{Math.round(v * p)}</text>}
              <text x={x + 100} y={1196} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{et}</text></g>; })}
        </>)}
      </Escena>
      {/* 8 · COSMIC: 2,826 pacientes; 78 % diabetes; 87 % corticoides */}
      <Escena T={T} a={K.Co} b={K.Fe} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={70} y={620} width={640} height={560} rx={26} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 100 }, (_, i) => <Personita key={i + (fase2 ? 'b' : 'a')} x={115 + (i % 10) * 61} y={680 + Math.floor(i / 10) * 53} s={0.95} color={i < nPint ? (fase2 ? KC.orange : KC.gold) : '#c9ccd4'} />)}
        </>)}
        <NumeroGigante T={T} at={K.Co + 0.9} until={K.Co + 3.5} valor={78} dur={1.6} sufijo=" %" etiqueta="diabetes" x={880} y={880} tam={140} color={KC.gold2} />
        <NumeroGigante T={T} at={K.Co + 3.9} until={K.Fe - 0.2} valor={87} dur={1.5} sufijo=" %" etiqueta="corticoides" x={880} y={880} tam={140} color={KC.orange} />
      </Escena>
      {/* 9 · azúcar alta + sangre ácida = más hierro suelto para el moho */}
      <Escena T={T} a={K.Fe} b={K.Ma} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <rect x={0} y={620} width={KW} height={420} fill="#4a1019" />
          <rect x={0} y={600} width={KW} height={20} fill="#e58b96" /><rect x={0} y={1040} width={KW} height={20} fill="#e58b96" />
          {Array.from({ length: 10 }, (_, i) => { const p = kprog(T, K.Fe + 0.3 + i * 0.1, K.Fe + 0.6 + i * 0.1, kEase.rebote); return p > 0 ? <Glucosa key={i} x={90 + i * 95} y={660 + (i % 2) * 40 + Math.sin(T * 2 + i) * 6} s={p} /> : null; })}
          {[[200, 820], [420, 900], [640, 800], [330, 980], [560, 990]].map(([x, y], i) => <Transferrina key={i} x={x} y={y + Math.sin(T * 2 + i) * 5} abre={fAbre} conHierro={fAbre < 0.9 ? 1 : 0} />)}
          {fAbre > 0.9 && [[200, 820], [420, 900], [640, 800], [330, 980], [560, 990]].map(([x, y], i) => { const u = kprog(fVuela, i * 0.1, 0.6 + i * 0.1);
            return u < 1 ? <circle key={i} cx={klerp(x + 38, 900, u)} cy={klerp(y, 930, u)} r={13} fill={MC.hierro} stroke={KC.ink} strokeWidth={3} style={{ filter:`drop-shadow(0 0 8px ${MC.hierro})` }} /> : null; })}
          <Liston d="M 1100 930 L 980 930 L 880 925" p={0.35 + 0.65 * fVuela} ancho={60} interior="rgba(74,16,25,.85)" />
        </>)}
      </Escena>
      {/* 10 · lo que piden los autores */}
      <Escena T={T} a={K.Ma} b={K.Cn} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Frasco x={330} y={760} s={1.1} />)}
      </Escena>
      {/* 11 · es rara y no se contagia */}
      <Escena T={T} a={K.Cn} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform="translate(260 960) scale(4.2)"><Personita x={0} y={0} color="#8fb6ff" /></g>
          <g transform="translate(820 960) scale(4.2)"><Personita x={0} y={0} color="#ffb347" /></g>
          {(() => { const p = kprog(T, K.Cn + 0.3, K.Cn + 0.9, kEase.sale), x = kprog(T, K.Cn + 1.0, K.Cn + 1.3, kEase.rebote); return <g>
            <path d={`M 380 900 L ${klerp(380, 690, p)} 900`} stroke={KC.ink} strokeWidth={14} strokeDasharray="26 16" strokeLinecap="round" />
            {p > 0.95 && <path d="M 690 870 L 720 900 L 690 930" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />}
            {x > 0 && <g transform={`translate(540 900) scale(${x})`}><path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={26} strokeLinecap="round" /></g>}
          </g>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma cara; por dentro, el vaso tapado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Cara x={360} y={920} s={1.05} mancha={1} T={T} />)}
        <Lupa T={T} at={K.C + 0.5} until={K.Ou} x={790} y={980} r={170} fx={300} fy={1000} interior={interiorCierre} tinte={KC.gold2} etiqueta="POR DENTRO" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.4} until={K.Ap - 0.2} texto="¿el hongo?" x={300} y={470} tam={48} />
      <Chip T={T} at={K.G + 1.7} until={K.Ap - 0.2} texto="tejido muerto (necrosis)" x={320} y={570} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Ap + 2.4} until={K.Mu - 0.3} x={70} y={815} texto="en el tejido: hifas transparentes (hialinas)" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Mu + 0.2} until={K.Es - 0.3} texto="orden Mucorales" x={540} y={330} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Mu + 1.6} until={K.Es - 0.3} x={60} y={1100} texto="moho joven: blanco y algodonoso" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Mu + 2.2} until={K.Es - 0.3} x={60} y={1150} texto="hojas podridas" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Mu + 2.6} until={K.Es - 0.3} x={770} y={540} texto="Rhizopus" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Mu + 3.0} until={K.Es - 0.3} x={770} y={600} texto="Mucor" it tam={36} color={KC.texto} />
      <Chip T={T} at={K.Es + 2.6} until={K.Hi - 0.3} texto="defensas bajas" x={290} y={470} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Es + 3.4} until={K.Hi - 0.3} texto="diabetes sin control" x={300} y={560} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Es + 3.8} until={K.Hi - 0.3} x={40} y={660} texto="macrófago: la traga y la espora no germina" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Hi + 0.4} until={K.V - 0.3} x={60} y={700} texto="espora que germina" tam={28} />
      <Etq T={T} at={K.Hi + 1.6} until={K.V - 0.3} x={520} y={500} texto="ancha, casi sin tabiques" tam={30} color={KC.hifa} />
      <Etq T={T} at={K.Hi + 2.2} until={K.V - 0.3} x={60} y={1050} texto="otros mohos: delgadas y con tabiques" tam={26} color="#9fd0a6" />
      <Etq T={T} at={K.V + 0.6} until={K.P - 0.3} x={60} y={530} texto="hifa" tam={30} color={KC.hifa} />
      <Etq T={T} at={K.V + 1.0} until={K.P - 0.3} x={60} y={1060} texto="vaso sanguíneo" tam={28} color="#ffb3bd" />
      <Chip T={T} at={K.V + 2.4} until={K.P - 0.3} texto="se tapa el vaso" x={300} y={330} tam={34} borde={KC.red} />
      <Chip T={T} at={K.V + 3.3} until={K.P - 0.3} texto="sin sangre → necrosis" x={330} y={420} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.P + 0.2} until={K.E - 0.2} texto="India · pandemia de COVID-19" x={420} y={470} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.6} anio="×2.1" quien="10 centros de India · sept–dic 2019 vs. sept–dic 2020" revista="Patel et al., Emerging Infectious Diseases, 2021" y={460} />
      <Chip T={T} at={K.E + 2.8} until={K.Co - 0.2} texto="112 → 231 casos" x={400} y={480} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Co + 0.1} until={K.Fe - 0.2} texto="2,826 pacientes con mucormicosis asociada a COVID" x={540} y={460} tam={29} borde={KC.ink} />
      <Etq T={T} at={K.Co + 0.5} until={K.Fe - 0.2} x={80} y={560} texto="COSMIC · Indian J. Ophthalmol. · 2021" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Fe + 0.4} until={K.Ma - 0.3} texto="azúcar alta" x={240} y={460} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Fe + 1.0} until={K.Ma - 0.3} texto="sangre ácida" x={250} y={540} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Fe + 1.2} until={K.Ma - 0.3} x={60} y={1085} texto="transferrina (guarda el hierro)" tam={28} color="#9cc0ff" />
      <Etq T={T} at={K.Fe + 2.6} until={K.Ma - 0.3} x={1020} y={1140} lado="izq" texto="hierro libre → moho" tam={28} color={MC.hierro} />
      <Chip T={T} at={K.Ma + 0.5} until={K.Cn - 0.3} texto="los autores piden usarlos solo" x={540} y={1010} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ma + 1.0} until={K.Cn - 0.3} texto="en COVID moderado o grave" x={540} y={1085} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Ma + 1.6} until={K.Cn - 0.3} texto="esto no es consejo médico" x={760} y={760} tam={26} borde={KC.red} />
      <Chip T={T} at={K.Cn + 1.1} until={K.C - 0.3} texto="no se contagia de persona a persona" x={540} y={1110} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Cn + 0.3} until={K.C - 0.3} texto="es rara" x={300} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="tejido sin sangre" x={300} y={470} tam={40} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ap} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Ap} until={K.Mu} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.Mu} until={K.Es} texto="1 cm" largo={120} />
      <BarraEscala T={T} at={K.Es} until={K.Hi} texto="5 cm" largo={100} />
      <BarraEscala T={T} at={K.Hi} until={K.V} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.V} until={K.P} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="500 km" largo={95} />
      <BarraEscala T={T} at={K.Ma} until={K.Cn} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Cn} until={K.C} texto="50 cm" largo={140} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={130} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ap - 0.1} texto="No es el hongo: *es tejido muerto.*" />
      <Subtitulo T={T} idx={1} at={K.Ap + 0.1} until={K.Mu - 0.1} texto="Sus hifas son *transparentes.*" />
      <Subtitulo T={T} idx={2} at={K.Mu + 0.1} until={K.Es - 0.1} texto="Mohos *mucorales:* Rhizopus y Mucor" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Hi - 0.1} texto="Enferman con *defensas bajas*" />
      <Subtitulo T={T} idx={4} at={K.Hi + 0.1} until={K.V - 0.1} texto="Hifas *anchas, como listones*" />
      <Subtitulo T={T} idx={5} at={K.V + 0.1} until={K.P - 0.1} texto="Tapan los vasos: *sin sangre*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por qué tantos casos *en India?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Co - 0.1} texto="Más del *doble de casos*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.Fe - 0.1} texto="*78 %* diabetes · *87 %* corticoides" />
      <Subtitulo T={T} idx={9} at={K.Fe + 0.1} until={K.Ma - 0.1} texto="Más *hierro suelto* para el moho" />
      <Subtitulo T={T} idx={10} at={K.Ma + 0.1} until={K.Cn - 0.1} texto="Solo en COVID *moderado o grave*" />
      <Subtitulo T={T} idx={11} at={K.Cn + 0.1} until={K.C - 0.1} texto="Es rara y *no se contagia*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es tejido *sin sangre.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ap + 0.6, K.Mu - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Es + 0.4, K.Hi - 0.7, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.V + 0.8, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.E - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.7, K.Co - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Fe + 0.4, K.Ma - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ma + 0.3, K.Cn - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Cn + 0.3, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="56" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MucorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MucorShot /></CompositionStage></div>;
}
window.MucorApp = MucorApp;
