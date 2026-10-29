// Shot Fungi Mati #15 · Esas venas no son queso echado a perder: el queso azul (Penicillium roqueforti) — NARRADO.
// Formato N1 "Por dentro" con capítulos (1 inocular · 2 picar · 3 madurar). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático (P. roqueforti: tallo rugoso, pincel terverticilado, cadenas de esporas redondas y lisas, 3–4.5 µm).

const QZ = { pasta:'#f4ead0', pasta2:'#e9dbb4', corteza:'#d8bf86', vena:'#2f6f73', vena2:'#5fb3a4', hueco:'#2a4f52', espora:'#3d9a96', esporaLuz:'#8fe0d2', grasa:'#ffd36b', leche:'#fbfaf4', acero:'#cfd6de' };

// Caminatas al azar dentro de un triángulo o rectángulo: las venas del queso.
function qzVenas(seed, dentro, caja, n = 9, pasos = 14, paso = 22) {
  const g = krng(seed), out = [];
  for (let k = 0; k < n; k++) {
    let x, y, t = 0;
    do { x = klerp(caja[0], caja[2], g()); y = klerp(caja[1], caja[3], g()); t++; } while (!dentro(x, y) && t < 50);
    let a = g() * Math.PI * 2; const pts = [[x, y]];
    for (let i = 0; i < pasos; i++) { a += (g() - 0.5) * 1.1; x += Math.cos(a) * paso; y += Math.sin(a) * paso; if (!dentro(x, y)) break; pts.push([x, y]); }
    const hoyos = pts.filter((_, i) => i % 3 === 1).map(([px, py]) => [px + (g() - 0.5) * 14, py + (g() - 0.5) * 14, 4 + g() * 6]);
    out.push({ pts, hoyos, w: 8 + g() * 7 });
  }
  return out;
}
const qzPath = (pts) => 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
const CUNA_F = [[-320, 140], [360, 140], [-320, -170]];
const enCuna = (x, y) => { const [a, b, c] = CUNA_F; const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
  const l1 = ((b[1] - c[1]) * (x - c[0]) + (c[0] - b[0]) * (y - c[1])) / d, l2 = ((c[1] - a[1]) * (x - c[0]) + (a[0] - c[0]) * (y - c[1])) / d; return l1 > 0.04 && l2 > 0.04 && 1 - l1 - l2 > 0.04; };
const VENAS_CUNA = qzVenas(15, enCuna, [-320, -170, 360, 140], 11, 16, 22);
const TUNELES = [-250, -160, -70, 20, 110, 200];

// Cuña de queso azul de lado: cara cortada con venas. tuneles 0..1 = se ven los túneles de aire de las agujas (cierre).
function Cuna({ T, x, y, s = 1, id, venas = 1, tuneles = 0, color = QZ.vena, color2 = QZ.vena2, rot = 0 }) {
  const cara = CUNA_F.map((p) => p.join(' ')).join(' L ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={id}><path d={'M ' + cara + ' Z'} /></clipPath></defs>
    <ellipse cx={30} cy={150} rx={420} ry={34} fill="rgba(0,0,0,.18)" />
    <path d="M -320 -170 L 360 140 L 420 100 L -260 -215 Z" fill={QZ.corteza} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={'M ' + cara + ' Z'} fill={QZ.pasta} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g clipPath={`url(#${id})`}>
      {VENAS_CUNA.map((v, i) => <g key={i} opacity={venas}>
        <path d={qzPath(v.pts)} stroke={color} strokeWidth={v.w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={qzPath(v.pts)} stroke={color2} strokeWidth={v.w * 0.35} fill="none" strokeLinecap="round" opacity=".8" />
        {v.hoyos.map(([hx, hy, r], k) => <circle key={k} cx={hx} cy={hy} r={r} fill={color === QZ.vena ? QZ.hueco : color} opacity=".9" />)}
      </g>)}
      {tuneles > 0 && TUNELES.map((tx, i) => { const L = 330 * kclamp(tuneles * 1.4 - i * 0.08, 0, 1);
        return <g key={i}>
          <line x1={tx} y1={-220} x2={tx + 14} y2={-220 + L} stroke={QZ.hueco} strokeWidth={14} strokeLinecap="round" opacity=".55" />
          <line x1={tx} y1={-220} x2={tx + 14} y2={-220 + L} stroke="#ffffff" strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" />
          {Array.from({ length: 6 }, (_, k) => { const u = k / 6; return u * 330 < L ? <circle key={k} cx={tx + 14 * u + Math.sin(T * 3 + k + i) * 6} cy={-220 + u * 330 + 20} r={6 + 2 * Math.sin(T * 4 + k)} fill={QZ.esporaLuz} stroke={QZ.vena} strokeWidth={2} /> : null; })}
        </g>; })}
    </g>
    <path d="M -320 -170 L -320 140" stroke={QZ.corteza} strokeWidth={14} />
    <path d={'M ' + cara + ' Z'} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}

// Rueda de queso (cilindro). venas en el costado; hoyos = [[u, v]] sobre la tapa (u,v en -1..1).
function Rueda({ x, y, r = 200, h = 160, s = 1, id, venas = 1, hoyos = [], seed = 3, tapa = QZ.corteza, color = QZ.vena, papel = null }) {
  const ry = r * 0.32;
  const V = React.useMemo(() => qzVenas(seed, (px, py) => Math.abs(px) < r - 8 && py > -h / 2 && py < h / 2 + ry * 0.9, [-r, -h / 2, r, h / 2 + ry], 10, 12, 20), [seed, r, h]);
  const lado = `M ${-r} ${-h / 2} L ${-r} ${h / 2} A ${r} ${ry} 0 0 0 ${r} ${h / 2} L ${r} ${-h / 2} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><path d={lado} /></clipPath></defs>
    <ellipse cx={0} cy={h / 2 + 10} rx={r * 1.05} ry={ry * 0.9} fill="rgba(0,0,0,.18)" />
    <path d={lado} fill={papel || QZ.pasta} stroke={KC.ink} strokeWidth={7} />
    {!papel && <g clipPath={`url(#${id})`} opacity={venas}>{V.map((v, i) => <g key={i}><path d={qzPath(v.pts)} stroke={color} strokeWidth={v.w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {v.hoyos.map(([hx, hy, rr], k) => <circle key={k} cx={hx} cy={hy} r={rr} fill={QZ.hueco} />)}</g>)}</g>}
    {papel && <path d={`M ${-r} ${-h / 2 + 30} L ${r} ${-h / 2 + 30}`} stroke="rgba(255,255,255,.6)" strokeWidth={8} />}
    <ellipse cx={0} cy={-h / 2} rx={r} ry={ry} fill={papel || tapa} stroke={KC.ink} strokeWidth={7} />
    {hoyos.map(([u, v], i) => <ellipse key={i} cx={u * r * 0.85} cy={-h / 2 + v * ry * 0.8} rx={7} ry={4} fill={KC.ink} opacity=".75" />)}
  </g>;
}

// Rebanada de pan de caja, con manchas de moho (moho 0..1).
function Pan({ T, x, y, s = 1, moho = 1 }) {
  const M = [[-60, -40, 38], [50, 10, 30], [-10, 70, 26], [70, -90, 22], [-90, 60, 18]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 180 L -170 -60 Q -230 -120 -180 -190 Q -100 -260 0 -230 Q 100 -260 180 -190 Q 230 -120 170 -60 L 170 180 Z" fill="#b9773a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -145 160 L -145 -50 Q -195 -110 -158 -168 Q -92 -228 0 -202 Q 92 -228 158 -168 Q 195 -110 145 -50 L 145 160 Z" fill="#f3dca8" />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-120 + ((i * 53) % 240)} cy={-150 + ((i * 37) % 290)} r={3 + (i % 3)} fill="#d9be84" />)}
    {M.map(([mx, my, r], i) => { const k = kclamp(moho * 1.6 - i * 0.15, 0, 1); return k > 0 ? <g key={i}>
      <circle cx={mx} cy={my} r={r * k * 1.25} fill="#eef3e6" opacity=".9" />
      <circle cx={mx} cy={my} r={r * k} fill={i % 2 ? '#3f5a34' : '#5e7f3d'} />
      {Array.from({ length: 8 }, (_, j) => <circle key={j} cx={mx + Math.cos(j * 0.8 + i) * r * k * 0.6} cy={my + Math.sin(j * 0.8 + i) * r * k * 0.6} r={4 * k} fill="#26331f" />)}
    </g> : null; })}
  </g>;
}

// Penicilio de P. roqueforti: tallo de pared rugosa → ramas → métulas → fiálides → cadenas de esporas redondas. p = 0..1 crece.
function Penicilio({ T, x, y, s = 1, p = 1, seed = 1 }) {
  const tallo = 300 * kclamp(p * 2.2, 0, 1), rama = kclamp(p * 2.2 - 1, 0, 1), cad = kclamp((p - 0.5) * 2, 0, 1);
  const pol = (x0, y0, ang, L) => [x0 + Math.sin(ang) * L, y0 - Math.cos(ang) * L];
  const partes = [], esporas = [];
  if (rama > 0) [-0.42, 0, 0.42].forEach((a1, i) => {
    const [x1, y1] = pol(0, -tallo, a1, 80 * rama); partes.push([0, -tallo, x1, y1, 14]);
    [-0.2, 0.2].forEach((d2, j) => { const a2 = a1 + d2, [x2, y2] = pol(x1, y1, a2, 70 * rama); partes.push([x1, y1, x2, y2, 12]);
      [-0.14, 0.14].forEach((d3, k) => { const a3 = a2 + d3, [x3, y3] = pol(x2, y2, a3, 52 * rama); partes.push([x2, y2, x3, y3, 9]);
        const n = Math.floor(cad * 4 + 0.001);
        for (let q = 0; q < n; q++) { const [ex, ey] = pol(x3, y3, a3, 18 + q * 30); esporas.push([ex + Math.sin(T * 2 + q + i + seed) * 1.5, ey, i * 4 + j * 2 + k, q]); }
      }); });
  });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 0 ${-tallo}`} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
    <path d={`M 0 0 L 0 ${-tallo}`} stroke={FK.hifa} strokeWidth={15} strokeLinecap="round" />
    {Array.from({ length: Math.floor(tallo / 22) }, (_, i) => <circle key={i} cx={(i % 2 ? 7 : -7)} cy={-i * 22 - 10} r={3} fill="#b9ad8f" />)}
    {partes.map(([a, b, c, d, w], i) => <g key={i}><line x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={w + 8} strokeLinecap="round" /><line x1={a} y1={b} x2={c} y2={d} stroke={FK.hifa} strokeWidth={w} strokeLinecap="round" /></g>)}
    {esporas.map(([ex, ey, c, q], i) => <circle key={i} cx={ex} cy={ey} r={15} fill={QZ.espora} stroke={KC.ink} strokeWidth={4} style={{ filter:`drop-shadow(0 0 ${6 + 3 * Math.sin(T * 3 + c)}px ${QZ.esporaLuz})` }} />)}
  </g>;
}

// 2-heptanona (CH3-CO-(CH2)4-CH3), fórmula de esqueleto: zigzag de 7 carbonos con C=O en el carbono 2.
function Heptanona({ x, y, s = 1, rot = 0, o = 1 }) {
  const pts = Array.from({ length: 7 }, (_, i) => [i * 34 - 102, i % 2 ? -18 : 18]);
  const [cx, cy] = pts[1];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={qzPath(pts)} stroke={KC.ink} strokeWidth={11} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d={qzPath(pts)} stroke="#ffffff" strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <line x1={cx - 5} y1={cy} x2={cx - 5} y2={cy - 44} stroke="#ffffff" strokeWidth={5} /><line x1={cx + 5} y1={cy} x2={cx + 5} y2={cy - 44} stroke="#ffffff" strokeWidth={5} />
    <circle cx={cx} cy={cy - 60} r={17} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={cx} y={cy - 52} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill="#fff">O</text>
  </g>;
}

// Tina de quesería con leche (vista en perspectiva). esporas = puntos que ya están en la leche.
function Tina({ T, x, y, s = 1, esporas = [] }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -360 -80 L -320 200 Q 0 250 320 200 L 360 -80 Z" fill="#c2cbd4" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -300 -40 L -270 170" stroke="#e7edf2" strokeWidth={16} strokeLinecap="round" />
    <ellipse cx={0} cy={-80} rx={360} ry={70} fill="#dfe5ea" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-74} rx={330} ry={56} fill={QZ.leche} />
    <ellipse cx={-90} cy={-90} rx={140} ry={16} fill="#ffffff" />
    {esporas.map(([ex, ey, k], i) => <circle key={i} cx={ex} cy={ey} r={6} fill={QZ.espora} stroke={KC.ink} strokeWidth={2} opacity={k} />)}
  </g>;
}

// Tubo de ensayo con ADN (una cepa secuenciada).
function Tubo({ x, y, s = 1, color = QZ.espora }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 -50 L -14 34 Q 0 52 14 34 L 14 -50" fill="#eaf6ff" stroke={KC.ink} strokeWidth={4} />
    <path d="M -10 0 L -10 32 Q 0 46 10 32 L 10 0 Z" fill={color} />
    <path d="M -7 4 Q 7 12 -7 20 Q 7 28 -7 36 M 7 4 Q -7 12 7 20 Q -7 28 7 36" stroke="#fff" strokeWidth={2} fill="none" />
    <rect x={-17} y={-58} width={34} height={10} rx={3} fill={KC.ink} />
  </g>;
}

function QuesoAzulShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, In: CUES.Inocular, Ai: CUES.Aire, Pi: CUES.Picar, Ve: CUES.Venas, Gr: CUES.Grasa, P: CUES.Pregunta, Pa: CUES.Pan, E: CUES.Estudio, Po: CUES.Poblaciones, Co: CUES.Colores, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el cuchillo baja y corta la cuña
  const corte = kprog(T, K.G + 0.1, K.G + 0.8, kEase.suave);
  // inocular: esporas que caen del sobre a la leche
  const ESP_LECHE = React.useMemo(() => { const g = krng(7); return Array.from({ length: 46 }, () => [g(), g(), g()]); }, []);
  // picar: tres bajadas de agujas, cada una deja 5 hoyitos
  const BAJADAS = [K.Pi + 0.3, K.Pi + 1.25, K.Pi + 2.2];
  const hoyosEn = [];
  BAJADAS.forEach((t0, b) => { if (T > t0 + 0.28) for (let i = 0; i < 5; i++) hoyosEn.push([-0.66 + i * 0.33 + b * 0.1, -0.5 + b * 0.5]); });
  const agujaY = (() => { for (const t0 of BAJADAS) if (T >= t0 - 0.05 && T < t0 + 0.7) { const u = (T - t0) / 0.6; return u < 0.45 ? klerp(0, 1, kEase.suave(kclamp(u / 0.45, 0, 1))) : klerp(1, 0, kEase.suave(kclamp((u - 0.45) / 0.55, 0, 1))); } return 0; })();
  const agujaX = BAJADAS.reduce((a, t0, b) => (T >= t0 - 0.2 ? b * 0.1 : a), 0);
  // grasa
  const GOTAS = [[260, 820, 62], [430, 930, 50], [300, 1060, 72], [560, 1070, 50], [180, 1150, 40], [520, 800, 40]];
  const rompe = kprog(T, K.Gr + 0.9, K.Gr + 2.0);
  const COLORES = [['azul (clásico)', QZ.vena, QZ.vena2], ['blanco', '#fbfbf6', '#ffffff'], ['café', '#7a4b2c', '#a3704a'], ['verde', '#4f8f3a', '#7cc05f']];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: cortan una cuña de queso azul */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={500} cy={1040} rx={470} ry={70} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={500} cy={1030} rx={380} ry={44} fill="#f2f2f2" />
          <Cuna T={T} x={470} y={890} s={1.08} id="cunaG" venas={klerp(0.55, 1, corte)} />
          <g transform={`translate(${klerp(560, 470, corte)} ${klerp(300, 890, corte)}) rotate(${klerp(-35, -8, corte)})`} opacity={1 - kprog(T, K.G + 1.0, K.G + 1.4)}>
            <rect x={-30} y={-420} width={60} height={170} rx={20} fill="#3b2a20" stroke={KC.ink} strokeWidth={7} />
            <path d="M -26 -260 L 26 -260 L 30 120 Q 0 150 -40 110 Z" fill={QZ.acero} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          </g>
        </>)}
      </Escena>
      {/* 2 · se llama Penicillium roqueforti: Roquefort y Gorgonzola */}
      <Escena T={T} a={K.N} b={K.In} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g opacity={kprog(T, K.N + 0.6, K.N + 1.0)}><Rueda x={270} y={880} r={150} h={150} id="ruedaR" seed={11} s={kprog(T, K.N + 0.6, K.N + 1.1, kEase.rebote)} /></g>
          <g opacity={kprog(T, K.N + 1.4, K.N + 1.8)}><Rueda x={770} y={870} r={190} h={170} id="ruedaG" seed={23} s={kprog(T, K.N + 1.4, K.N + 1.9, kEase.rebote)} /></g>
          {T > K.N + 1.0 && <g opacity={kprog(T, K.N + 1.0, K.N + 1.4)}>
            <text x={270} y={1050} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={10} paintOrder="stroke">ROQUEFORT</text>
            <text x={270} y={1096} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>Francia · oveja</text></g>}
          {T > K.N + 1.8 && <g opacity={kprog(T, K.N + 1.8, K.N + 2.2)}>
            <text x={770} y={1050} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={10} paintOrder="stroke">GORGONZOLA</text>
            <text x={770} y={1096} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>Italia · vaca</text></g>}
        </>)}
      </Escena>
      {/* 3 · Cap. 1: inocular la leche */}
      <Escena T={T} a={K.In} b={K.Ai} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Tina T={T} x={500} y={1010} s={1.05} esporas={ESP_LECHE.map(([a, b, c], i) => { const t0 = K.In + 0.5 + c * 1.2; const k = kprog(T, t0, t0 + 0.3);
            const ang = a * Math.PI * 2 + (T - t0) * 0.5 * (i % 2 ? 1 : -1), rr = kprog(T, t0, t0 + 1.6) * (60 + b * 240);
            return [Math.cos(ang) * rr, -74 + Math.sin(ang) * rr * 0.17, k]; })} />
          <g transform={`translate(640 ${klerp(420, 560, kprog(T, K.In, K.In + 0.4, kEase.sale))}) rotate(${klerp(0, 125, kprog(T, K.In + 0.1, K.In + 0.5, kEase.sale))})`}>
            <rect x={-60} y={-90} width={120} height={180} rx={10} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
            <rect x={-60} y={-90} width={120} height={36} fill={QZ.espora} stroke={KC.ink} strokeWidth={5} />
            <circle cx={0} cy={20} r={30} fill={QZ.espora} stroke={KC.ink} strokeWidth={4} />
          </g>
          {Array.from({ length: 26 }, (_, i) => { const t0 = K.In + 0.4 + i * 0.07, u = kprog(T, t0, t0 + 0.55); return u > 0 && u < 1 ? <circle key={i} cx={560 + Math.sin(i * 2.1) * 26 - u * 40} cy={klerp(640, 930, u)} r={7} fill={QZ.espora} stroke={KC.ink} strokeWidth={2} /> : null; })}
        </>)}
      </Escena>
      {/* 4 · por dentro (oscuro): el moho necesita oxígeno; solo hace esporas en los huecos */}
      <Escena T={T} a={K.Ai} b={K.Pi} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <rect x={70} y={700} width={940} height={480} rx={36} fill={QZ.pasta} stroke={KC.ink} strokeWidth={8} />
          <RedHifas T={T} x={540} y={940} g={kprog(T, K.Ai, K.Ai + 2.5)} seed={4} n={220} escala={0.42} color="#cbbf9e" ancho={2.5} />
          {[[230, 830, 70, 40], [480, 1040, 90, 46], [760, 860, 80, 44], [860, 1090, 56, 32], [300, 1100, 50, 28]].map(([hx, hy, rx, ry], i) => {
            const v = kprog(T, K.Ai + 1.2 + i * 0.2, K.Ai + 2.4 + i * 0.2);
            return <g key={i}>
              <ellipse cx={hx} cy={hy} rx={rx} ry={ry} fill="#1d2b3d" stroke={KC.ink} strokeWidth={5} />
              {Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return <circle key={k} cx={hx + Math.cos(a) * rx * 0.86} cy={hy + Math.sin(a) * ry * 0.78} r={8 * v} fill={QZ.espora} stroke={KC.ink} strokeWidth={2} style={{ filter:`drop-shadow(0 0 6px ${QZ.esporaLuz})` }} />; })}
              {[0, 1].map((k) => { const u = ((T * 0.4 + k * 0.5 + i * 0.2) % 1); return <g key={'o' + k} opacity={kprog(T, K.Ai + 0.6, K.Ai + 1.0) * Math.sin(Math.PI * u)}>
                <text x={hx - 20 + k * 30} y={hy + 10 - u * 20} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#ff8a8a">O₂</text></g>; })}
            </g>; })}
        </>)}
      </Escena>
      {/* 5 · Cap. 2: picar con agujas para que entre el aire */}
      <Escena T={T} a={K.Pi} b={K.Ve} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Rueda x={400} y={1000} r={270} h={190} id="ruedaP" seed={31} venas={0} tapa={QZ.pasta2} hoyos={hoyosEn} />
          <g transform={`translate(${400 + agujaX * 270 * 0.85} ${klerp(560, 800, agujaY)})`}>
            {Array.from({ length: 5 }, (_, i) => { const nx = (-0.66 + i * 0.33) * 270 * 0.85; return <g key={i}>
              <line x1={nx} y1={-40} x2={nx} y2={130} stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />
              <line x1={nx} y1={-40} x2={nx} y2={130} stroke={QZ.acero} strokeWidth={6} strokeLinecap="round" /></g>; })}
            <rect x={-270} y={-90} width={540} height={60} rx={16} fill="#8c96a3" stroke={KC.ink} strokeWidth={8} />
          </g>
          {hoyosEn.map(([u, v], i) => { const hx = 400 + u * 270 * 0.85, hy = 905 + v * 86 * 0.8; const f = (T * 0.9 + i * 0.13) % 1;
            return <path key={i} d={`M ${hx - 10} ${hy - 70 + f * 40} q 10 12 0 24 q -10 12 0 24`} stroke="#ffffff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * f) * kprog(T, K.Pi + 0.8, K.Pi + 1.2)} />; })}
        </>)}
      </Escena>
      {/* 6 · Cap. 3: madurar — al microscopio, el moho crece en el túnel y sus esporas dan el color */}
      <Escena T={T} a={K.Ve} b={K.Gr} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <path d="M 0 1220 L 0 330 L 170 330 Q 210 760 150 1220 Z" fill="#cdbf98" opacity=".9" stroke={KC.ink} strokeWidth={6} />
          <path d="M 1080 1220 L 1080 330 L 900 330 Q 860 760 930 1220 Z" fill="#cdbf98" opacity=".9" stroke={KC.ink} strokeWidth={6} />
          <RedHifas T={T} x={170} y={1000} g={kprog(T, K.Ve - 0.3, K.Ve + 2.0)} seed={8} n={140} escala={0.36} color={FK.hifa} ancho={3} rot={60} />
          <RedHifas T={T} x={910} y={900} g={kprog(T, K.Ve - 0.3, K.Ve + 2.0)} seed={9} n={140} escala={0.36} color={FK.hifa} ancho={3} rot={-120} />
          <path d="M 150 1200 Q 400 1180 540 1200 Q 700 1220 930 1190" stroke={FK.hifa} strokeWidth={14} fill="none" opacity=".8" />
          <Penicilio T={T} x={560} y={1190} s={1.15} p={kprog(T, K.Ve, K.Ve + 2.6)} />
          <Penicilio T={T} x={280} y={1195} s={0.55} p={kprog(T, K.Ve + 0.6, K.Ve + 3.0)} seed={3} />
          <Penicilio T={T} x={800} y={1195} s={0.6} p={kprog(T, K.Ve + 0.9, K.Ve + 3.2)} seed={5} />
        </>)}
      </Escena>
      {/* 7 · rompe la grasa → metilcetonas (2-heptanona): el olor */}
      <Escena T={T} a={K.Gr} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <path d={`M -20 1200 Q 120 1120 ${klerp(40, 200, kprog(T, K.Gr, K.Gr + 0.9))} ${klerp(1160, 1000, kprog(T, K.Gr, K.Gr + 0.9))}`} stroke={FK.hifa} strokeWidth={18} fill="none" strokeLinecap="round" />
          {GOTAS.map(([gx, gy, r], i) => { const b = kclamp(rompe * 1.5 - i * 0.1, 0, 1); return <g key={i}>
            <circle cx={gx} cy={gy} r={r * (1 - 0.65 * b)} fill={QZ.grasa} stroke={KC.ink} strokeWidth={5} opacity={1 - b * 0.4} />
            {b > 0 && [0, 1, 2].map((k) => { const a = k * 2.1 + i, d = b * (r + 30); return <path key={k} d={`M 0 0 l 14 -10 l 14 10 l 14 -10 l 14 10 l 14 -10`} transform={`translate(${gx + Math.cos(a) * d} ${gy + Math.sin(a) * d}) rotate(${a * 57})`} stroke={QZ.grasa} strokeWidth={5} fill="none" opacity={1 - kprog(T, K.Gr + 2.0, K.Gr + 2.6)} />; })}
          </g>; })}
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.Gr + 2.0 + i * 0.3, u = T - t0; if (u < 0) return null;
            const yy = 1060 - u * 110 - (i % 3) * 60, xx = 640 + (i % 3) * 120 + Math.sin(T * 1.5 + i) * 20;
            return <Heptanona key={i} x={xx} y={Math.max(yy, 740 + (i % 2) * 80)} s={1.2} rot={Math.sin(T + i) * 15} o={kprog(T, t0, t0 + 0.3)} />; })}
          {Array.from({ length: 3 }, (_, i) => { const f = (T * 0.5 + i / 3) % 1; return <path key={i} d={`M ${700 + i * 100} ${880 - f * 160} q 20 -20 0 -40 q -20 -20 0 -40 q 20 -20 0 -40`} stroke={QZ.esporaLuz} strokeWidth={6} fill="none" strokeLinecap="round" opacity={kprog(T, K.Gr + 2.8, K.Gr + 3.2) * Math.sin(Math.PI * f) * 0.8} />; })}
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿por qué este moho sí y el del pan no? */}
      <Escena T={T} a={K.P} b={K.Pa} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Pan T={T} x={260} y={700} s={0.72} moho={1} />
          <Cuna T={T} x={250} y={1060} s={0.55} id="cunaP" />
          <text x={250} y={905} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={12} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 5} 250 880)`}>VS</text>
        </>)}
      </Escena>
      {/* 9 · el del queso se escoge y se vigila; el del pan llega solo */}
      <Escena T={T} a={K.Pa} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Cuna T={T} x={270} y={1040} s={0.6} id="cunaPa" />
          <Sello T={T} at={K.Pa + 0.5} x={250} y={830} texto="✓" color={KC.leaf} r={70} rot={-8} />
          <Pan T={T} x={790} y={980} s={0.75} moho={kprog(T, K.Pa + 3.0, K.Pa + 4.6)} />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.Pa + 2.7 + i * 0.12, u = kprog(T, t0, t0 + 0.9); return u > 0 && u < 1 ? <circle key={i} cx={klerp(1120, 720 + (i % 4) * 40, u)} cy={klerp(700 + (i % 5) * 60, 920 + (i % 3) * 50, u) + Math.sin(u * 9 + i) * 20} r={7} fill={i % 2 ? '#5e7f3d' : '#26331f'} stroke="#eef3e6" strokeWidth={2} /> : null; })}
          {T > K.Pa + 3.4 && <text x={790} y={760} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke" opacity={kprog(T, K.Pa + 3.4, K.Pa + 3.7)} transform={`rotate(${Math.sin(T * 3) * 6} 790 720)`}>?</text>}
          {T > K.Pa + 5.0 && <g transform={`translate(960 1130) scale(${kprog(T, K.Pa + 5.0, K.Pa + 5.4, kEase.rebote)})`}>
            <path d="M 0 -62 L 58 40 L -58 40 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <text x={0} y={30} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>!</text></g>}
        </>)}
      </Escena>
      {/* 10 · el estudio: 34 genomas, dos domesticaciones */}
      <Escena T={T} a={K.E} b={K.Po} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {Array.from({ length: 34 }, (_, i) => { const on = kprog(T, K.E + 0.9 + i * 0.04, K.E + 1.2 + i * 0.04, kEase.rebote); return on > 0 ? <Tubo key={i} x={120 + (i % 17) * 52} y={780 + Math.floor(i / 17) * 110} s={on} /> : null; })}
          {(() => { const u = kprog(T, K.E + 2.6, K.E + 3.8, kEase.sale); if (u <= 0) return null; return <g>
            <path d={`M 540 1080 L 540 ${klerp(1080, 1000, kclamp(u * 2, 0, 1))}`} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
            {u > 0.5 && <><path d={`M 540 1000 Q 420 980 ${klerp(540, 330, (u - 0.5) * 2)} ${klerp(1000, 950, (u - 0.5) * 2)}`} stroke={QZ.vena} strokeWidth={16} fill="none" strokeLinecap="round" />
              <path d={`M 540 1000 Q 660 980 ${klerp(540, 750, (u - 0.5) * 2)} ${klerp(1000, 950, (u - 0.5) * 2)}`} stroke={KC.pink} strokeWidth={16} fill="none" strokeLinecap="round" /></>}
            {u > 0.95 && <><circle cx={330} cy={950} r={34} fill={QZ.vena} stroke={KC.ink} strokeWidth={6} /><text x={330} y={964} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">1</text>
              <circle cx={750} cy={950} r={34} fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><text x={750} y={964} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">2</text></>}
          </g>; })()}
        </>)}
      </Escena>
      {/* 11 · dos poblaciones: la del Roquefort (cuevas del Combalou) y la de los quesos azules del mundo */}
      <Escena T={T} a={K.Po} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={kprog(T, K.Po, K.Po + 0.4)}>
            <path d="M 40 1180 L 40 760 Q 60 640 170 600 Q 280 580 360 640 Q 470 700 480 820 L 480 1180 Z" fill="#8a7a66" stroke={KC.ink} strokeWidth={8} />
            <path d="M 100 1180 L 100 840 Q 130 720 250 710 Q 380 720 410 850 L 410 1180 Z" fill="#3b3128" stroke={KC.ink} strokeWidth={6} />
            {[[160, 960], [250, 960], [340, 960], [160, 1090], [250, 1090], [340, 1090]].map(([rx, ry], i) => <g key={i}>
              <line x1={110} y1={ry + 38} x2={400} y2={ry + 38} stroke="#a0805c" strokeWidth={10} />
              <Rueda x={rx} y={ry} r={38} h={50} id={'cv' + i} seed={40 + i} s={kprog(T, K.Po + 0.3 + i * 0.1, K.Po + 0.6 + i * 0.1, kEase.rebote)} /></g>)}
            <circle cx={440} cy={700} r={34} fill={QZ.vena} stroke={KC.ink} strokeWidth={6} /><text x={440} y={714} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">1</text>
          </g>
          <g opacity={kprog(T, K.Po + 1.6, K.Po + 2.0)} transform={`translate(780 960) rotate(${(T - K.Po) * 6})`}>
            <circle r={170} fill="#3aa0ff" stroke={KC.ink} strokeWidth={8} />
            <path d="M -120 -60 Q -60 -120 0 -90 Q 30 -40 -20 0 Q -80 20 -120 -60 Z M 30 30 Q 90 0 120 50 Q 100 110 50 120 Q 10 80 30 30 Z M -60 60 Q -30 70 -40 110 Q -80 100 -60 60 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return <g key={i} transform={`translate(${Math.cos(a) * 225} ${Math.sin(a) * 225}) rotate(${-(T - K.Po) * 6})`} opacity={kprog(T, K.Po + 2.0 + i * 0.1, K.Po + 2.3 + i * 0.1)}>
              <Rueda x={0} y={0} r={30} h={36} id={'gl' + i} seed={60 + i} /></g>; })}
          </g>
          
        </>)}
      </Escena>
      {/* 12 · 2024: versiones del moho de otros colores */}
      <Escena T={T} a={K.Co} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {COLORES.map(([nom, c1, c2], i) => { const x = i % 2 ? 790 : 290, y = i < 2 ? 820 : 1070, on = kprog(T, K.Co + 0.4 + i * 0.5, K.Co + 0.8 + i * 0.5, kEase.rebote);
            return on > 0 ? <g key={i}><Cuna T={T} x={x} y={y} s={0.42 * on} id={'cc' + i} color={i === 1 ? '#d6d2c4' : c1} color2={c2} />
              <text x={x} y={y + 100} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{nom}</text></g> : null; })}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma cuña en el mismo plato, ahora con los túneles de aire y las esporas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={500} cy={1040} rx={470} ry={70} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={500} cy={1030} rx={380} ry={44} fill="#f2f2f2" />
          <Cuna T={T} x={470} y={890} s={1.08} id="cunaC" tuneles={kprog(T, K.C + 0.4, K.C + 2.2)} />
        </>)}
      </Escena>

      {/* capítulos */}
      <Capitulo T={T} caps={[{ at:K.In, titulo:'inocular' }, { at:K.Pi, titulo:'picar' }, { at:K.Ve, titulo:'madurar' }]} hasta={K.P - 0.2} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.4} until={K.N - 0.3} texto="¿echado a perder?" x={320} y={460} tam={46} />
      <Chip T={T} at={K.G + 2.9} until={K.N - 0.3} texto="sembrado a propósito" x={320} y={570} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.N + 0.2} until={K.In - 0.3} x={60} y={480} texto="Penicillium roqueforti" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 0.5} until={K.In - 0.3} x={60} y={540} texto="moho azul" tam={32} color={KC.ink} />
      <Etq T={T} at={K.In + 0.8} until={K.Ai - 0.3} x={60} y={480} texto="esporas de" tam={32} color={KC.ink} />
      <Etq T={T} at={K.In + 0.8} until={K.Ai - 0.3} x={60} y={530} texto="P. roqueforti" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.In + 1.2} until={K.Ai - 0.3} x={60} y={830} texto="leche" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ai + 0.3} until={K.Pi - 0.3} texto="necesita oxígeno (O₂)" x={360} y={480} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ai + 1.6} until={K.Pi - 0.3} texto="esporas: solo en los huecos" x={360} y={580} tam={32} borde={QZ.esporaLuz} />
      <Etq T={T} at={K.Ai + 0.8} until={K.Pi - 0.3} x={1040} y={680} lado="izq" texto="pasta del queso" tam={26} />
      <Etq T={T} at={K.Pi + 0.6} until={K.Ve - 0.3} x={1040} y={760} lado="izq" texto="agujas de acero" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pi + 1.4} until={K.Ve - 0.3} x={1040} y={880} lado="izq" texto="entra el aire" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ve + 0.6} until={K.Gr - 0.3} texto="el color está en las esporas" x={620} y={385} tam={34} borde={QZ.esporaLuz} />
      <Etq T={T} at={K.Ve + 1.8} until={K.Gr - 0.3} x={60} y={560} texto="esporas" tam={30} color={QZ.esporaLuz} />
      <Etq T={T} at={K.Ve + 1.0} until={K.Gr - 0.3} x={60} y={1150} texto="túnel con aire" tam={26} />
      <Etq T={T} at={K.Gr + 0.3} until={K.P - 0.3} x={60} y={700} texto="grasa de la leche" tam={30} color={QZ.grasa} />
      <Etq T={T} at={K.Gr + 2.3} until={K.P - 0.3} x={1040} y={1100} lado="izq" texto="2-heptanona" tam={32} color={KC.white} />
      <Chip T={T} at={K.Gr + 1.2} until={K.P - 0.3} texto="metilcetonas" x={330} y={480} tam={38} borde={QZ.grasa} />
      <Chip T={T} at={K.Gr + 3.0} until={K.P - 0.3} texto="= olor a queso azul" x={330} y={580} tam={36} borde={QZ.esporaLuz} />
      <Etq T={T} at={K.Gr + 2.3} until={K.P - 0.3} x={1040} y={1160} lado="izq" texto="molécula: no a escala" tam={22} />
      <Chip T={T} at={K.Pa + 0.4} until={K.E - 0.3} texto="✓ cepas escogidas y vigiladas" x={350} y={470} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Pa + 3.0} until={K.E - 0.3} texto="moho del pan: no sabes cuál es" x={350} y={560} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 5.0} until={K.E - 0.3} texto="algunos mohos: toxinas" x={350} y={650} tam={30} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Po - 0.3} anio="2020" quien="Francia · 34 genomas" revista="Dumas et al., Molecular Ecology" y={540} />
      <Chip T={T} at={K.E + 3.0} until={K.Po - 0.3} texto="domesticado 2 veces" x={540} y={1130} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Po + 0.5} until={K.Co - 0.3} texto="1 · Roquefort" x={250} y={470} tam={36} borde={QZ.vena} />
      <Etq T={T} at={K.Po + 0.8} until={K.Co - 0.3} x={60} y={550} texto="cuevas del Combalou, Francia" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Po + 2.0} until={K.Co - 0.3} texto="2 · quesos azules del mundo" x={760} y={700} tam={30} borde={KC.pink} />
      <Chip T={T} at={K.Co + 0.2} until={K.C - 0.3} texto="U. de Nottingham · 2024" x={350} y={480} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Co + 0.6} until={K.C - 0.3} x={60} y={570} texto="mutantes de color (luz UV)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="sembrado a propósito ✓" x={330} y={460} tam={38} borde={KC.leaf} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={60} y={560} texto="túneles de aire + esporas" tam={28} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={300} />
      <BarraEscala T={T} at={K.N} until={K.In} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.In} until={K.Ai} texto="50 cm" largo={220} />
      <BarraEscala T={T} at={K.Ai} until={K.Pi} texto="1 cm" largo={160} />
      <BarraEscala T={T} at={K.Pi} until={K.Ve} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Ve} until={K.Gr} texto="10 µm" largo={100} />
      <BarraEscala T={T} at={K.Gr} until={K.P} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.Po} until={K.Co} texto="10 cm" largo={90} />
      <BarraEscala T={T} at={K.Co} until={K.C} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={300} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No está echado a perder: *es un moho.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.In - 0.1} texto="Penicillium roqueforti: *Roquefort y Gorgonzola.*" />
      <Subtitulo T={T} idx={2} at={K.In + 0.1} until={K.Ai - 0.1} texto="A la leche: *sus esporas.*" />
      <Subtitulo T={T} idx={3} at={K.Ai + 0.1} until={K.Pi - 0.1} texto="Necesita oxígeno: *esporas en los huecos.*" />
      <Subtitulo T={T} idx={4} at={K.Pi + 0.1} until={K.Ve - 0.1} texto="Lo pican *con agujas.*" />
      <Subtitulo T={T} idx={5} at={K.Ve + 0.1} until={K.Gr - 0.1} texto="Sus esporas lo pintan *de azul verdoso.*" />
      <Subtitulo T={T} idx={6} at={K.Gr + 0.1} until={K.P - 0.1} texto="Grasa → *2-heptanona:* el olor." />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Pa - 0.1} texto="¿Por qué este sí *y el del pan no?*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.E - 0.1} texto="Este se escoge y se vigila. *El del pan, no.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Po - 0.1} texto="2020: se domesticó *dos veces.*" />
      <Subtitulo T={T} idx={10} at={K.Po + 0.1} until={K.Co - 0.1} texto="Roquefort… *y el resto del mundo.*" />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.C - 0.1} texto="2024: *blanco, café o verde.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No está echado a perder: *túneles de aire.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.6, K.In - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ai + 0.4, K.Pi - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pi + 0.5, K.Ve - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Gr + 0.6, K.P - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.Pa + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pa + 1.4, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Po + 0.4, K.Co - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Co + 0.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function QuesoAzulApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><QuesoAzulShot /></CompositionStage></div>;
}
window.QuesoAzulApp = QuesoAzulApp;
