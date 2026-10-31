// Shot Científico #43 · Por qué te ruge la tripa (y no siempre es hambre) — NARRADO (N1 "Por dentro": estómago e intestino con sus ondas).
// Datos: Andrews 2002 (Scientific American), MedlinePlus 2024, MedicineNet (borborigmos); Deloose et al. 2012, Takahashi 2013,
// Wang et al. 2025 (complejo motor migratorio, 90–120 min); Tack et al. 2016 (motilina y hambre). Ver guion.md y verificacion.md.
// Dibujo esquemático: órganos, tamaños y volumen no van a escala (las barras de volumen son ilustrativas, sin números).
const TP = { pared:'#f58f8f', pared2:'#f7b0a6', lumen:'#4a1626', ink:KC.ink, comida:['#f2a33a', '#7bc96f', '#e8d26a', '#c97b4a'], gas:'#eaf6ff', liq:'#7fd4f2', resto:'#b5793f' };

/* ---------- tubo digestivo esquemático: esófago → estómago → intestino delgado ---------- */
// Nodos [x, y, R, tramo] en coordenadas locales (tramo 0 esófago, 1 estómago, 2 intestino delgado).
const TR_NODOS = [[0, -380, 20, 0], [0, -320, 22, 0], [-14, -262, 58, 1], [-62, -200, 90, 1], [-74, -120, 96, 1], [-36, -58, 86, 1], [46, -50, 70, 1], [118, -90, 44, 1],
  [168, -128, 28, 2], [214, -84, 28, 2], [214, 4, 28, 2], [140, 46, 28, 2], [-120, 46, 28, 2], [-200, 84, 28, 2], [-150, 130, 28, 2], [130, 130, 28, 2], [206, 172, 28, 2],
  [150, 214, 28, 2], [-130, 214, 28, 2], [-206, 256, 28, 2], [-150, 298, 28, 2], [60, 300, 28, 2]];
const TR = (() => {
  const n = TR_NODOS, pts = [];
  for (let i = 0; i < n.length - 1; i++) {
    const P0 = n[Math.max(0, i - 1)], P1 = n[i], P2 = n[i + 1], P3 = n[Math.min(n.length - 1, i + 2)];
    const M = 12;
    for (let k = 0; k < M; k++) {
      const t = k / M, t2 = t * t, t3 = t2 * t;
      const cr = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      pts.push({ x: cr(P0[0], P1[0], P2[0], P3[0]), y: cr(P0[1], P1[1], P2[1], P3[1]), R: klerp(P1[2], P2[2], t), seg: t < 0.5 ? P1[3] : P2[3] });
    }
  }
  const l = n[n.length - 1]; pts.push({ x: l[0], y: l[1], R: l[2], seg: l[3] });
  let s = 0; pts.forEach((p, i) => { if (i) s += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y); p.s = s; });
  const piloro = pts.find((p) => p.seg === 2 && p.y < -100);
  return { pts, L: s, sPiloro: piloro ? piloro.s : s * 0.3 };
})();
// T: tiempo · amp: fuerza de las ondas · limpia: 0..1 avance de la onda de limpieza (null = no hay) · brilloInt: intestino delgado
// resaltado · apagaEst: estómago atenuado · comida: 0..1 comida en el estómago · gas: burbujas · motil: brillo dorado del estómago.
function Tracto({ T, amp = 1, vel = 1, limpia = null, brilloInt = 0, apagaEst = 0, comida = 0, gas = 0, motil = 0, nOndas = 3 }) {
  const { pts, L } = TR;
  const sq = (s) => { let f = 0; for (let j = 0; j < nOndas; j++) { const c = ((T * 90 * vel + j * L / nOndas) % L); const d = s - c; f += Math.exp(-(d * d) / 1400); } return Math.min(1, f); };
  const cL = limpia == null ? -999 : klerp(-60, L + 60, limpia);
  const datos = pts.map((p) => { const g = limpia == null ? 0 : Math.exp(-((p.s - cL) ** 2) / 3000);
    const r = p.R * (1 - 0.26 * amp * sq(p.s) - 0.3 * g); return { ...p, r, g }; });
  const pared = (p) => p.seg === 2 && brilloInt > 0 ? mixHex(TP.pared, KC.gold2, brilloInt) : (p.seg === 1 && motil > 0 ? mixHex(TP.pared, KC.gold2, motil) : TP.pared);
  const op = (p) => (p.seg === 1 || p.seg === 0 ? 1 - 0.55 * apagaEst : 1);
  const est = datos.filter((p) => p.seg === 1);
  return <g>
    {brilloInt > 0.01 && datos.filter((p) => p.seg === 2).map((p, i) => i % 2 ? null : <circle key={'h' + i} cx={p.x} cy={p.y} r={p.r + 26} fill={KC.gold2} opacity={0.18 * brilloInt} />)}
    {datos.map((p, i) => <circle key={'a' + i} cx={p.x} cy={p.y} r={p.r + 7} fill={TP.ink} opacity={op(p)} />)}
    {datos.map((p, i) => <circle key={'b' + i} cx={p.x} cy={p.y} r={p.r} fill={pared(p)} opacity={op(p)} />)}
    {datos.map((p, i) => <circle key={'c' + i} cx={p.x} cy={p.y} r={p.r * 0.56} fill={TP.lumen} opacity={op(p)} />)}
    {comida > 0.01 && est.filter((p, i) => i % 3 === 0).map((p, i) => { const k = i / (est.length / 3); if (k > comida * 1.05) return null;
      return <rect key={'f' + i} x={p.x - 16 + Math.sin(i * 2.7 + T * 1.5) * p.r * 0.2} y={p.y - 12 + Math.cos(i * 1.9 + T) * p.r * 0.2} width={30} height={22} rx={8}
        fill={TP.comida[i % 4]} stroke={TP.ink} strokeWidth={3} transform={`rotate(${i * 37} ${p.x} ${p.y})`} />; })}
    {gas > 0.01 && Array.from({ length: 14 }, (_, i) => { const s = ((i * L / 14 + T * 70) % L), p = datos[Math.min(datos.length - 1, Math.round(s / L * (datos.length - 1)))];
      return <circle key={'g' + i} cx={p.x + Math.sin(T * 5 + i) * p.r * 0.2} cy={p.y + Math.cos(T * 4 + i) * p.r * 0.2} r={Math.max(4, p.r * 0.28)} fill={TP.gas} stroke={TP.ink} strokeWidth={2.5} opacity={gas * op(p)} />; })}
    {limpia != null && limpia > 0 && limpia < 1 && datos.filter((p) => p.g > 0.25).map((p, i) => <circle key={'l' + i} cx={p.x} cy={p.y} r={p.r + 20} fill="none" stroke={KC.yellow} strokeWidth={7} opacity={p.g * 0.7} />)}
  </g>;
}
// Punto del tubo en el avance f (0..1) — para etiquetas y moléculas.
const trEn = (f) => { const i = Math.round(kclamp(f, 0, 1) * (TR.pts.length - 1)); return TR.pts[i]; };
const trPorS = (s) => TR.pts.reduce((a, p) => (Math.abs(p.s - s) < Math.abs(a.s - s) ? p : a), TR.pts[0]);

/* ---------- tubo grande en primer plano (Ruido, Barre) ---------- */
// Cruza la pantalla de izquierda a derecha. frente: x de la onda fuerte (null = ondas normales). restos: barre las migas.
function TuboGrande({ T, y = 820, R = 170, amp = 1, gas = 0, liq = 0, frente = null, restos = 0, seed = 3 }) {
  const P = []; for (let x = -160; x <= 1240; x += 9) P.push({ x, y: y + 70 * Math.sin(x / 260 + 0.6) });
  const sq = (x) => { if (frente != null) return Math.exp(-((x - frente) ** 2) / 5000); let f = 0; for (let j = 0; j < 2; j++) { const c = ((T * 260 + j * 700) % 1400) - 160; f += Math.exp(-((x - c) ** 2) / 9000); } return f; };
  const D = P.map((p) => ({ ...p, r: R * (1 - (frente != null ? 0.62 : 0.32) * amp * sq(p.x)) }));
  const yEn = (x) => y + 70 * Math.sin(x / 260 + 0.6), rEn = (x) => R * (1 - (frente != null ? 0.62 : 0.32) * amp * sq(x));
  const g = krng(seed);
  const migas = Array.from({ length: 16 }, (_, i) => ({ x0: 80 + g() * 940, dy: (g() - 0.5) * 0.9, c: [TP.resto, '#8f5a2c', '#d39a55'][i % 3], w: 34 + g() * 24, rot: g() * 180 }));
  return <g>
    {D.map((p, i) => <circle key={'a' + i} cx={p.x} cy={p.y} r={p.r + 10} fill={TP.ink} />)}
    {D.map((p, i) => <circle key={'b' + i} cx={p.x} cy={p.y} r={p.r} fill={TP.pared} />)}
    {D.map((p, i) => i % 4 ? null : <path key={'m' + i} d={`M ${p.x} ${p.y - p.r + 6} L ${p.x} ${p.y - p.r * 0.72}`} stroke="#d96a6a" strokeWidth={6} strokeLinecap="round" />)}
    {D.map((p, i) => <circle key={'c' + i} cx={p.x} cy={p.y} r={p.r * 0.7} fill={TP.lumen} />)}
    {liq > 0.01 && D.map((p, i) => i % 2 ? null : <ellipse key={'q' + i} cx={p.x} cy={p.y + p.r * 0.38} rx={14} ry={p.r * 0.3} fill={TP.liq} opacity={0.75 * liq} />)}
    {gas > 0.01 && Array.from({ length: 18 }, (_, i) => { const x = ((i * 83 + T * (180 + (i % 3) * 40)) % 1400) - 160, r = rEn(x);
      const yy = yEn(x) - r * 0.25 + Math.sin(T * 6 + i) * r * 0.18, rb = Math.max(8, r * (0.12 + (i % 4) * 0.05));
      return <g key={'g' + i} opacity={gas}><circle cx={x} cy={yy} r={rb} fill={TP.gas} stroke={TP.ink} strokeWidth={4} /><circle cx={x - rb * 0.35} cy={yy - rb * 0.35} r={rb * 0.25} fill="#fff" /></g>; })}
    {restos > 0.01 && migas.map((m, i) => { const x = frente == null ? m.x0 : Math.max(m.x0, frente + 60 + (i % 6) * 22), r = rEn(x);
      return x < 1200 && <rect key={'r' + i} x={x - m.w / 2} y={yEn(x) + m.dy * r * 0.5 - 10} width={m.w} height={m.w * 0.7} rx={6} fill={m.c} stroke={TP.ink} strokeWidth={3} opacity={restos} transform={`rotate(${m.rot + (frente || 0) * 0.3} ${x} ${yEn(x)})`} />; })}
  </g>;
}

/* ---------- personas y objetos ---------- */
// Alumno de frente (medio cuerpo). (x, y) = centro del pecho; la panza queda en (x, y + 90 s). mira -1..1 mueve los ojos.
// cara: 'normal' | 'sonrie' | 'o' | 'pena'. ventana 0..1 abre un círculo en la panza que deja ver `dentro` (coordenadas de la ventana, r = 150).
function Alumno({ x = 0, y = 0, s = 1, color = KC.yellow, mira = 0, cara = 'normal', ventana = 0, dentro, uid = 'a', pelo = CPELO, piel = CPIEL, brinco = 0 }) {
  const ex = mira * 8;
  return <g transform={`translate(${x} ${y - brinco}) scale(${s})`}>
    <g transform="rotate(8 -170 -150)"><rect x={-206} y={-170} width={74} height={380} rx={37} fill={color} stroke={KC.ink} strokeWidth={9} /></g>
    <g transform="rotate(-8 170 -150)"><rect x={132} y={-170} width={74} height={380} rx={37} fill={color} stroke={KC.ink} strokeWidth={9} /></g>
    <path d="M -150 -170 C -170 -60 -172 120 -160 300 L 160 300 C 172 120 170 -60 150 -170 Q 0 -210 -150 -170 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-36} y={-215} width={72} height={60} fill={piel} stroke={KC.ink} strokeWidth={8} />
    {ventana > 0.01 && <g opacity={ventana}>
      <clipPath id={`vt${uid}`}><circle cx={0} cy={90} r={150 * ventana} /></clipPath>
      <circle cx={0} cy={90} r={150 * ventana + 8} fill={KC.ink} />
      <g clipPath={`url(#vt${uid})`}><rect x={-160} y={-70} width={320} height={320} fill="#2a0f19" /><g transform="translate(0 90)">{dentro}</g></g>
      <circle cx={0} cy={90} r={150 * ventana} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="18 12" />
    </g>}
    <circle cx={-98} cy={-300} r={24} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <circle cx={98} cy={-300} r={24} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-305} r={98} fill={piel} stroke={KC.ink} strokeWidth={9} />
    <path d="M -98 -305 Q -104 -410 0 -410 Q 104 -410 98 -305 Q 60 -370 -98 -305 Z" fill={pelo} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-34, 34].map((e) => <g key={e}><circle cx={e} cy={-300} r={cara === 'o' ? 17 : 14} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={e + ex} cy={-300} r={7} fill={KC.ink} /></g>)}
    {cara === 'pena' && <><circle cx={-58} cy={-262} r={18} fill={KC.pink} opacity=".55" /><circle cx={58} cy={-262} r={18} fill={KC.pink} opacity=".55" /></>}
    {cara === 'o' ? <ellipse cx={0} cy={-250} rx={13} ry={17} fill="#5a1f22" stroke={KC.ink} strokeWidth={5} />
      : <path d={cara === 'sonrie' ? 'M -30 -258 Q 0 -230 30 -258' : cara === 'pena' ? 'M -22 -250 Q 0 -262 22 -250' : 'M -20 -252 L 20 -252'} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
  </g>;
}
function Pupitre({ x, y, ancho = 620 }) {
  return <g><rect x={x - ancho / 2 + 40} y={y + 50} width={22} height={260} fill="#6b4a2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={x + ancho / 2 - 62} y={y + 50} width={22} height={260} fill="#6b4a2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - ancho / 2} y={y} width={ancho} height={60} rx={12} fill="#c98b5a" stroke={KC.ink} strokeWidth={9} />
    <rect x={x - 130} y={y - 22} width={200} height={26} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={5} transform={`rotate(-4 ${x} ${y})`} />
    <rect x={x + 90} y={y - 14} width={110} height={12} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(12 ${x + 140} ${y})`} /></g>;
}
// Escoba simpática (dentro de svg): barre de lado a lado.
function Escoba({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-9} y={-190} width={18} height={170} rx={8} fill="#a8703f" stroke={KC.ink} strokeWidth={6} />
    <path d="M -46 -30 L 46 -30 L 66 70 L -66 70 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-44, -22, 0, 22, 44].map((xx) => <line key={xx} x1={xx * 0.8} y1={10} x2={xx * 1.15} y2={66} stroke="#c9a000" strokeWidth={4} />)}
    <rect x={-50} y={-38} width={100} height={18} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-16} cy={-2} r={8} fill={KC.ink} /><circle cx={16} cy={-2} r={8} fill={KC.ink} />
    <path d="M -14 16 Q 0 28 14 16" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
function Reloj({ x, y, r = 150, vueltas = 0 }) {
  const a = vueltas * Math.PI * 2;
  return <g>
    <circle cx={x} cy={y} r={r + 14} fill={KC.paper} stroke={KC.ink} strokeWidth={12} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={x + Math.sin(i * Math.PI / 6) * (r - 6)} y1={y - Math.cos(i * Math.PI / 6) * (r - 6)} x2={x + Math.sin(i * Math.PI / 6) * (r - 30)} y2={y - Math.cos(i * Math.PI / 6) * (r - 30)} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 10} />)}
    <line x1={x} y1={y} x2={x + Math.sin(a / 12) * (r * 0.5)} y2={y - Math.cos(a / 12) * (r * 0.5)} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x + Math.sin(a) * (r - 36)} y2={y - Math.cos(a) * (r - 36)} stroke={KC.pink} strokeWidth={10} strokeLinecap="round" />
    <circle cx={x} cy={y} r={16} fill={KC.ink} />
  </g>;
}
// Tambor hueco con baquetas: golpe 0..1 (1 justo al pegar).
function Tambor({ x, y, s = 1, golpe = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -40 L -150 110 Q 0 170 150 110 L 150 -40" fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-110, -40, 40, 110].map((xx, i) => <path key={i} d={`M ${xx} ${-10 + (i % 2) * 0} L ${xx + (i % 2 ? -30 : 30)} 120`} stroke={KC.paper} strokeWidth={8} />)}
    <ellipse cx={0} cy={-40} rx={150} ry={46} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-40} rx={150 - 20 * golpe} ry={46 - 8 * golpe} fill="none" stroke={KC.gold} strokeWidth={6} opacity={golpe} />
    <g transform={`rotate(${-30 + 22 * golpe} -60 -40)`}><rect x={-70} y={-200} width={16} height={170} rx={8} fill="#c98b5a" stroke={KC.ink} strokeWidth={5} /><circle cx={-62} cy={-200} r={16} fill={KC.paper} stroke={KC.ink} strokeWidth={5} /></g>
    <g transform={`rotate(${30 - 22 * golpe} 60 -40)`}><rect x={54} y={-200} width={16} height={170} rx={8} fill="#c98b5a" stroke={KC.ink} strokeWidth={5} /><circle cx={62} cy={-200} r={16} fill={KC.paper} stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}
// Medidor de volumen ilustrativo (sin números): 5 barras, v 0..1.
function Volumen({ x, y, v = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-380} width={200} height={440} rx={26} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 5 }, (_, i) => { const on = v * 5 + 0.25 * Math.sin(T * 12) > i + 0.3;
      return <rect key={i} x={0} y={-30 - (i + 1) * 64} width={140} height={48} rx={10} fill={on ? [KC.mint, KC.mint, KC.yellow, KC.orange, KC.red][i] : 'rgba(255,255,255,.14)'} stroke={KC.ink} strokeWidth={4} />; })}
    <text x={70} y={34} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.texto}>volumen</text>
  </g>;
}
// Estómago grande (escenas Lleno / Vacío). comida 0..1. ondas = pulso de las paredes.
function Estomago({ x, y, s = 1, comida = 1, T = 0, ondas = 0 }) {
  const p = 1 + 0.035 * ondas * Math.sin(T * 9);
  const forma = 'M -40 -330 L -40 -260 C -170 -250 -230 -120 -210 20 C -190 170 -40 250 90 210 C 200 175 250 80 230 -10 L 300 -30 L 300 -80 L 210 -80 C 190 -130 120 -150 70 -110 C 30 -80 50 -200 40 -260 L 40 -330 Z';
  const g = krng(11);
  const trozos = Array.from({ length: 26 }, () => ({ x: -170 + g() * 360, y: -60 + g() * 230, w: 34 + g() * 30, c: TP.comida[Math.floor(g() * 4)], r: g() * 180 }));
  const nivel = klerp(240, -110, comida);
  return <g transform={`translate(${x} ${y}) scale(${s * p} ${s / p})`}>
    <clipPath id="estclip"><path d={forma} /></clipPath>
    <path d={forma} fill={TP.lumen} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <g clipPath="url(#estclip)">
      {comida > 0.01 && <rect x={-260} y={nivel} width={600} height={400} fill="#c77b3a" opacity=".55" />}
      {trozos.map((t, i) => t.y > nivel - 20 && <rect key={i} x={t.x} y={t.y + Math.sin(T * 2 + i) * 6} width={t.w} height={t.w * 0.7} rx={10} fill={t.c} stroke={KC.ink} strokeWidth={4} transform={`rotate(${t.r} ${t.x} ${t.y})`} />)}
      {comida < 0.5 && Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.6 + i / 6) % 1); return <circle key={i} cx={-120 + i * 50} cy={200 - f * 300} r={14 + (i % 3) * 6} fill="none" stroke={TP.gas} strokeWidth={4} opacity={(1 - comida * 2) * (1 - f)} />; })}
    </g>
    <path d={forma} fill="none" stroke={TP.pared} strokeWidth={26} strokeLinejoin="round" opacity=".9" />
    <path d={forma} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Motilina: hormona (péptido) dibujada como cadena de cuentas.
function Motilina({ x, y, s = 1, T = 0, brillo = 0 }) {
  const n = 9;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle r={90} fill={KC.gold2} opacity={0.3 * brillo} />}
    <polyline points={Array.from({ length: n }, (_, i) => `${-80 + i * 20},${Math.sin(i * 1.3 + T * 4) * 16}`).join(' ')} fill="none" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={-80 + i * 20} cy={Math.sin(i * 1.3 + T * 4) * 16} r={12} fill={[KC.pink, KC.lilac, KC.cyan][i % 3]} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
function Palomita({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={110} fill={KC.mint} stroke={KC.ink} strokeWidth={10} />
    <path d="M -50 4 L -12 42 L 54 -36" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" /></g>;
}

function Tripa() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho y cierre: el mismo salón
  const ALU = { x: 350, y: 880, s: 1 }, PANZA = [ALU.x, ALU.y + 90 * ALU.s];
  const grrG = [0.15, 2.3].map((t) => K.Gancho + t), grrC = [0.3, 2.2].map((t) => K.Cierre + t);
  const tiembla = (ts) => ts.reduce((a, t) => a + (T > t && T < t + 1.1 ? Math.sin((T - t) * 50) * 5 * (1 - (T - t) / 1.1) : 0), 0);
  const miraG = kprog(T, K.Gancho + 0.6, K.Gancho + 0.9);
  // limpieza
  const limpL = kprog(T, K.Limpieza + 1.8, K.Limpieza + 5.2);
  const frenteB = klerp(-200, 1300, kprog(T, K.Barre + 0.5, K.Barre + 4.6, kEase.suave));
  // hambre: la motilina sale del intestino y enciende el estómago
  const tLlega = K.Hambre + 2.4;
  const salon = (cierre) => {
    const ts = cierre ? grrC : grrG, mira = cierre ? 1 : miraG;
    return <>
      <rect x={0} y={1180} width={KW} height={KH - 1180} fill="#e0517f" opacity=".45" />
      <g transform={`translate(${tiembla(ts)} 0)`}>
        <Alumno x={ALU.x} y={ALU.y} s={ALU.s} color={KC.yellow} cara={cierre ? 'sonrie' : (T > ts[0] ? 'pena' : 'normal')} uid={cierre ? 'c' : 'g'}
          ventana={cierre ? kprog(T, K.Cierre + 1.0, K.Cierre + 1.5, kEase.sale) : 0}
          dentro={cierre && <g><g transform="scale(0.42) translate(0 -20)"><Tracto T={T} amp={0.8} /></g>
            <Escoba x={Math.sin(T * 3.2) * 70} y={60} s={0.62} rot={Math.sin(T * 3.2) * 18} /></g>} />
      </g>
      <Pupitre x={ALU.x} y={1130} />
      {[0, 1].map((k) => { const lx = k ? 920 : 70, ly = k ? 1000 : 960;
        return <g key={k}><Alumno x={lx} y={ly} s={0.55} color={k ? KC.cyan : KC.mint} mira={(k ? -1 : 1) * mira} cara={cierre ? 'sonrie' : (mira > 0.5 ? 'o' : 'normal')} uid={'v' + k + (cierre ? 'c' : 'g')} pelo={k ? '#6b3a1f' : CPELO} />
          {!cierre && <TextoSvg x={lx + (k ? -40 : 60)} y={ly - 290} tam={70} color={KC.paper} o={kprog(T, K.Gancho + 0.9, K.Gancho + 1.2)} s={klerp(0.4, 1, kprog(T, K.Gancho + 0.9, K.Gancho + 1.3, kEase.rebote))}>?</TextoSvg>}</g>; })}
      {ts.map((t, i) => <g key={i}><Onomato T={T} at={t} dur={1.5} x={PANZA[0] + 230 + i * 20} y={PANZA[1] - 40 - i * 40} texto="GRRR" tam={130} color={KC.yellow} rot={i % 2 ? 6 : -7} />
        {T > t && T < t + 1.8 && <><OndasArco x={PANZA[0] + 100} y={PANZA[1]} ang={0} T={T} color={KC.paper} largo={160} o={1 - kprog(T, t + 1.3, t + 1.8)} />
          <OndasArco x={PANZA[0] - 100} y={PANZA[1]} ang={180} T={T} color={KC.paper} largo={130} o={1 - kprog(T, t + 1.3, t + 1.8)} /></>}</g>)}
    </>;
  };
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: en clase la panza hace «grrr» y todos voltean */}
      <Escena T={T} a={K.Gancho} b={K.Musculos}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          {salon(false)}
          {T > K.Gancho + 2.6 && <circle cx={PANZA[0]} cy={PANZA[1]} r={150 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="18 12" opacity={kprog(T, K.Gancho + 2.6, K.Gancho + 2.9)} />}
        </Lienzo>
        <Chip T={T} at={K.Gancho + 2.7} until={K.Gancho + 4.0} texto="¿hambre?" x={300} y={380} tam={48} borde={KC.ink} />
        <Chip T={T} at={K.Gancho + 4.0} until={K.Musculos - 0.1} texto="no siempre" x={300} y={380} tam={48} borde={KC.yellow} />
        <Etq T={T} at={K.Gancho + 4.2} until={K.Musculos - 0.1} x={PANZA[0] + 160} y={PANZA[1] + 120} texto="tu intestino" lado="der" color={KC.paper} />
      </Escena>
      {/* 1 · tubos de músculo que se aprietan en ondas */}
      <Escena T={T} a={K.Musculos} b={K.Ruido}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Alumno x={300} y={960} s={1.25} color={KC.yellow} uid="m" ventana={kprog(T, K.Musculos + 0.2, K.Musculos + 0.7, kEase.sale)}
            dentro={<g transform="scale(0.42) translate(0 -20)"><Tracto T={T} amp={1} /></g>} />
        </Lienzo>
        <Lupa T={T} at={K.Musculos + 0.6} until={K.Ruido - 0.25} x={720} y={760} r={300} fx={300} fy={960 + 90 * 1.25} tinte={KC.yellow} etiqueta="POR DENTRO · PANZA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a0f19" />
            <g transform={`translate(${r} ${r + 20}) scale(0.78)`}><Tracto T={t} amp={1.2} /></g>
            <text x={r - 20} y={150} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke" opacity={kprog(t, K.Musculos + 1.6, K.Musculos + 2)}>estómago</text>
            <text x={r} y={r * 2 - 70} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke" opacity={kprog(t, K.Musculos + 2.3, K.Musculos + 2.7)}>intestino</text></svg>} />
        <Chip T={T} at={K.Musculos + 1.0} until={K.Musculos + 3.1} texto="tubos de músculo" x={540} y={370} tam={46} borde={KC.yellow} />
        <Chip T={T} at={K.Musculos + 3.2} until={K.Ruido - 0.1} texto="se aprietan en ondas" x={540} y={370} tam={44} borde={KC.pink} />
      </Escena>
      {/* 2 · líquido y gas que se revuelven: borborigmo */}
      <Escena T={T} a={K.Ruido} b={K.Lleno} fondo={KC.noche} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <TuboGrande T={T} y={860} R={190} amp={1} gas={kprog(T, K.Ruido + 0.4, K.Ruido + 1.0)} liq={kprog(T, K.Ruido + 0.2, K.Ruido + 0.8)} />
          {[1.2, 2.0, 2.8].map((t, i) => <Onomato key={i} T={T} at={K.Ruido + t} dur={0.7} x={[260, 560, 820][i]} y={[620, 1110, 640][i]} texto="blub" tam={70} color={KC.cyan} rot={i % 2 ? 8 : -8} />)}
          {T > K.Ruido + 3.3 && <TextoSvg x={540} y={520} tam={118} color={KC.yellow} rot={-3 + Math.sin(T * 3) * 2} s={klerp(0.4, 1, kprog(T, K.Ruido + 3.3, K.Ruido + 3.7, kEase.rebote))}>BORBORIGMO</TextoSvg>}
        </Lienzo>
        <Etq T={T} at={K.Ruido + 0.6} until={K.Ruido + 3.2} x={250} y={1110} texto="líquido" lado="der" color={TP.liq} />
        <Etq T={T} at={K.Ruido + 1.1} until={K.Ruido + 3.2} x={760} y={560} texto="gas" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Ruido + 3.6} until={K.Lleno - 0.1} texto="el ruido tiene nombre" x={540} y={1150} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 3–4 · lleno: ruido apagado · vacío: suena más fuerte, como tambor hueco */}
      <Escena T={T} a={K.Lleno} b={K.Pregunta}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {(() => { const com = 1 - kprog(T, K.Vacio + 0.2, K.Vacio + 1.6, kEase.suave), fuerte = kprog(T, K.Vacio + 1.2, K.Vacio + 2);
            const golpes = [3.2, 3.7, 4.2, 4.7, 5.2].map((t) => K.Vacio + t), gp = golpes.reduce((a, t) => Math.max(a, T > t ? Math.exp(-(T - t) * 9) : 0), 0);
            return <>
              <Estomago x={360} y={830} s={1.15} comida={com} T={T} ondas={0.3 + fuerte} />
              <OndasArco x={640} y={780} ang={-10} T={T} color={fuerte > 0.5 ? KC.red : '#8a7a5a'} largo={klerp(70, 230, fuerte)} grosor={klerp(5, 12, fuerte)} o={klerp(0.45, 1, fuerte)} n={klerp(2, 4, fuerte)} />
              <OndasArco x={110} y={780} ang={190} T={T} color={fuerte > 0.5 ? KC.red : '#8a7a5a'} largo={klerp(50, 160, fuerte)} grosor={klerp(5, 12, fuerte)} o={klerp(0.45, 1, fuerte)} />
              <Volumen x={840} y={1130} v={klerp(0.25, 1, fuerte)} T={T} />
              {T > K.Vacio + 2.9 && <g opacity={kprog(T, K.Vacio + 2.9, K.Vacio + 3.2)}><Tambor x={420} y={430 + 0} s={0.7 * klerp(0.5, 1, kprog(T, K.Vacio + 2.9, K.Vacio + 3.3, kEase.rebote))} golpe={gp} /></g>}
              {golpes.map((t, i) => <Onomato key={i} T={T} at={t} dur={0.35} x={i % 2 ? 640 : 200} y={420} texto="pum" tam={64} color={KC.red} rot={i % 2 ? 8 : -8} />)}
            </>; })()}
        </Lienzo>
        <Etq T={T} at={K.Lleno + 0.4} until={K.Vacio + 0.4} x={300} y={1140} texto="comida" lado="der" color={KC.ink} />
        <Chip T={T} at={K.Lleno + 0.6} until={K.Vacio - 0.1} texto="con comida: más apagado" x={540} y={440} tam={42} borde={'#8a7a5a'} />
        <Chip T={T} at={K.Vacio + 1.2} until={K.Vacio + 2.8} texto="vacío: más fuerte" x={660} y={440} tam={46} borde={KC.red} />
        <Chip T={T} at={K.Vacio + 3.1} until={K.Pregunta - 0.1} texto="tambor hueco" x={760} y={600} tam={40} borde={KC.red} />
      </Escena>
      {/* 5 · ¿por qué ruge con hambre? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Limpieza} />
      {/* 6 · horas sin comer: la onda de limpieza recorre estómago e intestino */}
      <Escena T={T} a={K.Limpieza} b={K.Barre}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Reloj x={230} y={600} r={130} vueltas={3 * kprog(T, K.Limpieza + 0.2, K.Limpieza + 2.2, kEase.suave) + 0.05 * T} />
          <g opacity={kprog(T, K.Limpieza + 1.2, K.Limpieza + 1.7)}>
            <rect x={300} y={520} width={700} height={700} rx={60} fill="#2a0f19" stroke={KC.ink} strokeWidth={10} />
            <g transform="translate(650 880) scale(0.95)"><Tracto T={T} amp={0.4} limpia={limpL > 0 && limpL < 1 ? limpL : null} /></g>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Limpieza + 0.3} until={K.Barre - 0.1} texto="horas sin comer" x={260} y={420} tam={38} borde={KC.ink} />
        <Chip T={T} at={K.Limpieza + 1.8} until={K.Barre - 0.1} texto="onda de limpieza" x={720} y={440} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 7 · barre los restos hacia adelante; ≈ cada 1.5–2 h */}
      <Escena T={T} a={K.Barre} b={K.Hambre} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <TuboGrande T={T} y={840} R={180} amp={1} frente={frenteB} restos={1} gas={0} />
          {frenteB > -150 && frenteB < 1150 && <g opacity=".85">{[0, 1].map((k) => <circle key={k} cx={frenteB} cy={840 + 70 * Math.sin(frenteB / 260 + 0.6)} r={180 + 26 + k * 20} fill="none" stroke={KC.yellow} strokeWidth={7 - k * 3} opacity={0.6 - k * 0.3} />)}</g>}
          <FlechaRecta x1={200} y1={1110} x2={880} y2={1110} p={kprog(T, K.Barre + 0.8, K.Barre + 1.6, kEase.sale)} color={KC.yellow} grosor={14} />
        </Lienzo>
        <Etq T={T} at={K.Barre + 0.3} until={K.Barre + 2.6} x={560} y={600} texto="restos de comida" lado="der" color={TP.resto} />
        <Chip T={T} at={K.Barre + 1.0} until={K.Barre + 3.0} texto="hacia adelante" x={540} y={460} tam={42} borde={KC.yellow} />
        <Chip T={T} at={K.Barre + 3.0} until={K.Hambre - 0.1} texto="≈ cada 1.5–2 h" x={540} y={460} tam={60} borde={KC.yellow} />
      </Escena>
      {/* 8 · la motilina, hormona del intestino, la pone en marcha y avisa hambre */}
      <Escena T={T} a={K.Hambre} b={K.Lugar}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const C = { x: 400, y: 900, s: 1.15 }, k = 150 / 340 * 0.95;
            const dO = trEn(0.36), aE = trEn(0.14); // duodeno → estómago (coordenadas del tracto)
            const enc = kprog(T, tLlega, tLlega + 0.6);
            return <>
              <Alumno x={C.x} y={C.y} s={C.s} color={KC.yellow} uid="h" ventana={1} cara={T > K.Hambre + 3.8 ? 'o' : 'normal'}
                dentro={<g transform={`scale(${k})`}><Tracto T={T} amp={0.3 + enc} motil={enc * (0.6 + 0.4 * Math.sin(T * 7))} limpia={enc > 0 ? kprog(T, tLlega + 0.2, tLlega + 3.0) : null} />
                  {[0, 1, 2].map((i) => { const f = kprog(T, K.Hambre + 0.6 + i * 0.35, tLlega + i * 0.2, kEase.suave);
                    return f > 0 && f < 1 && <Motilina key={i} x={klerp(dO.x + 40, aE.x, f) + i * 30} y={klerp(dO.y + 60, aE.y, f) + Math.sin(f * 6) * 40} s={2.6} T={T} brillo={1} />; })}</g>} />
              {T > K.Hambre + 3.6 && <g opacity={kprog(T, K.Hambre + 3.6, K.Hambre + 4.0)}>
                <circle cx={560} cy={500} r={16} fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle cx={610} cy={450} r={24} fill="#fff" stroke={KC.ink} strokeWidth={6} />
                <g transform={`translate(800 380) scale(${klerp(0.4, 1.15, kprog(T, K.Hambre + 3.7, K.Hambre + 4.1, kEase.rebote))})`}><Nube x={0} y={0} s={1} />
                  <text x={-5} y={14} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>hambre</text></g></g>}
            </>; })()}
        </Lienzo>
        <Chip T={T} at={K.Hambre + 0.3} until={K.Hambre + 3.4} texto="hormona de tu intestino" x={770} y={560} tam={40} borde={KC.pink} />
        <Etq T={T} at={K.Hambre + 0.8} until={K.Lugar - 0.15} x={600} y={1000} texto="motilina" lado="der" color={KC.ink} tam={44} />
        <Chip T={T} at={tLlega + 0.3} until={K.Lugar - 0.15} texto="pone en marcha la onda" x={560} y={1170} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 9 · gran parte del ruido viene del intestino delgado */}
      <Escena T={T} a={K.Lugar} b={K.Normal} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          {(() => { const b = kprog(T, K.Lugar + 1.2, K.Lugar + 2.0), C = { x: 620, y: 800, s: 0.85 };
            return <>
              <g transform={`translate(${C.x} ${C.y}) scale(${C.s})`}><Tracto T={T} amp={1} brilloInt={b * (0.75 + 0.25 * Math.sin(T * 6))} apagaEst={b * 0.8} gas={b} /></g>
              {b > 0.3 && [0, 1, 2].map((i) => <OndasArco key={i} x={C.x + 0.85 * [-240, 250, -230][i]} y={C.y + 0.85 * [80, 180, 260][i]} ang={[180, 0, 180][i]} T={T + i * 0.3} color={KC.gold2} largo={150} o={b} />)}
              {[0.3, 1.4].map((t, i) => <Onomato key={i} T={T} at={K.Lugar + 2.4 + t} dur={0.9} x={i ? 860 : 330} y={i ? 1000 : 1060} texto="grrr" tam={80} color={KC.gold2} rot={i ? 8 : -8} />)}
            </>; })()}
        </Lienzo>
        <Etq T={T} at={K.Lugar + 0.5} until={K.Normal - 0.1} x={700} y={640} texto="estómago" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Lugar + 1.4} until={K.Normal - 0.1} x={330} y={1130} texto="intestino delgado" lado="der" color={KC.gold2} />
        <Chip T={T} at={K.Lugar + 3.4} until={K.Normal - 0.1} texto="no solo el estómago" x={660} y={440} tam={42} borde={KC.gold2} />
      </Escena>
      {/* 10 · es normal: está trabajando */}
      <Escena T={T} a={K.Normal} b={K.Cierre}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Alumno x={360} y={930} s={1.05} color={KC.yellow} uid="n" ventana={1} cara="sonrie" dentro={<g transform="scale(0.42) translate(0 -20)"><Tracto T={T} amp={1} gas={0.6} /></g>} />
          {T > K.Normal + 0.5 && <Palomita x={820} y={700} s={klerp(0.3, 1, kprog(T, K.Normal + 0.5, K.Normal + 0.9, kEase.rebote))} />}
        </Lienzo>
        <Chip T={T} at={K.Normal + 0.3} until={K.Cierre - 0.1} texto="es normal" x={540} y={440} tam={64} borde={KC.mint} />
        <Chip T={T} at={K.Normal + 1.6} until={K.Cierre - 0.1} texto="está trabajando" x={780} y={960} tam={38} borde={KC.ink} />
      </Escena>
      {/* 11 · cierre: el mismo salón; la panza hace la limpieza */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>{salon(true)}</Lienzo>
        <Chip T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} texto="haciendo la limpieza" x={540} y={380} tam={44} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Musculos - 0.1} texto="No siempre es *hambre.*" />
      <Subtitulo T={T} idx={1} at={K.Musculos + 0.1} until={K.Ruido - 0.1} texto="Tubos de músculo *en ondas.*" />
      <Subtitulo T={T} idx={2} at={K.Ruido + 0.1} until={K.Lleno - 0.1} texto="Líquido y gas: *borborigmo.*" />
      <Subtitulo T={T} idx={3} at={K.Lleno + 0.1} until={K.Vacio - 0.1} texto="Con comida: *más apagado.*" />
      <Subtitulo T={T} idx={4} at={K.Vacio + 0.1} until={K.Pregunta - 0.1} texto="Vacío: *suena más fuerte.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Limpieza - 0.1} texto="¿Y por qué *con hambre?*" />
      <Subtitulo T={T} idx={6} at={K.Limpieza + 0.1} until={K.Barre - 0.1} texto="Sin comer: *onda de limpieza.*" />
      <Subtitulo T={T} idx={7} at={K.Barre + 0.1} until={K.Hambre - 0.1} texto="Barre restos *≈ cada 1.5–2 h.*" />
      <Subtitulo T={T} idx={8} at={K.Hambre + 0.1} until={K.Lugar - 0.1} texto="La *motilina* la enciende." />
      <Subtitulo T={T} idx={9} at={K.Lugar + 0.1} until={K.Normal - 0.1} texto="Mucho viene del *intestino delgado.*" />
      <Subtitulo T={T} idx={10} at={K.Normal + 0.1} until={K.Cierre - 0.1} texto="Es *normal:* está trabajando." />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No te regaña: *hace limpieza.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Ruido + 0.5, K.Lleno - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Vacio + 2.6, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Limpieza + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Barre + 1.0, K.Hambre - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Hambre + 2.6, K.Lugar - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Lugar + 1.0, K.Normal - 0.1, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Normal + 0.3, K.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="43" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function TripaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Tripa /></CompositionStage></div>;
}
window.TripaApp = TripaApp;
