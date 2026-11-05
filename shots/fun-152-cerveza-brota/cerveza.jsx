// Shot Fungi Mati #152 · Esa cerveza no estaba agitada: traía proteínas de un hongo — NARRADO (N1 Por dentro, gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Divulgación científica: no invita a consumir alcohol.

const CV = { ambar:'#a8560f', ambar2:'#d98a2b', ambar3:'#6e3606', espuma:'#fff8e6', espuma2:'#f1e2bd', cebada:'#e9c46a', cebada2:'#c99a3a',
  salmon:'#ff9a76', salmon2:'#e8664a', hidro:'#4f8cff', parche:'#9aa3ad', cis:'#ffe11a', vidrio:'#bfe8ff', vidrio2:'#7cc7ec', agua:'#7fd3ff' };

// ---------- piezas ----------
// Botella genérica (sin marca). Base en (x, y); alto ≈ 560·s. tapa 0..1 = la corcholata sale volando.
function Botella({ x, y, s = 1, tapa = 0, etiqueta = 'CERVEZA', color = CV.ambar, brillo = CV.ambar2, nivel = 0.86, liquido = null, rot = 0 }) {
  const cuerpo = 'M -95 0 L -95 -300 Q -95 -360 -40 -400 L -34 -500 L 34 -500 L 40 -400 Q 95 -360 95 -300 L 95 0 Q 95 14 80 14 L -80 14 Q -95 14 -95 0 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={cuerpo} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {liquido && <path d={`M -87 ${-300 * nivel} L 87 ${-300 * nivel} L 87 0 L -87 0 Z`} fill={liquido} opacity=".55" />}
    <rect x={-70} y={-330} width={26} height={300} rx={13} fill={brillo} opacity=".55" />
    <rect x={-30} y={-490} width={12} height={80} rx={6} fill={brillo} opacity=".5" />
    <rect x={-88} y={-250} width={176} height={130} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-176} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    <path d="M -50 -150 L 50 -150" stroke={KC.ink} strokeWidth={4} opacity=".4" />
    <g transform={`translate(${tapa * 120} ${-506 - tapa * 220 + tapa * tapa * 90}) rotate(${tapa * 260})`} opacity={1 - kprog(tapa, 0.85, 1)}>
      <path d="M -44 -6 L 44 -6 L 40 22 L -40 22 Z" fill="#d9d4c7" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[-30, -15, 0, 15, 30].map((d) => <line key={d} x1={d} y1={4} x2={d} y2={20} stroke="#8a8578" strokeWidth={4} />)}
    </g>
  </g>;
}
// Chorro de espuma que sale de la boca de una botella (boca en (x, y)). p 0..1 = cuánto sube; dir = inclinación.
function Chorro({ T, x, y, p = 1, alto = 520, ancho = 70, seed = 3, dir = 0 }) {
  if (p <= 0) return null;
  const g = krng(seed), n = 34;
  const bol = Array.from({ length: n }, (_, i) => { const u = i / n; return { u, dx: (g() - 0.5) * ancho * (0.6 + u * 1.6), r: 22 + g() * 26 + u * 22, f: g() * 6 }; });
  return <g>
    {bol.filter((b) => b.u <= p).map((b, i) => { const yy = y - b.u * alto * p, xx = x + b.dx + Math.sin(T * 6 + b.f) * 6 + dir * b.u * alto * 0.3;
      return <circle key={i} cx={xx} cy={yy} r={b.r} fill={i % 3 ? CV.espuma : CV.espuma2} stroke={KC.ink} strokeWidth={4} />; })}
    {bol.filter((b) => b.u <= p).map((b, i) => <circle key={'b' + i} cx={x + b.dx * 0.8 + dir * b.u * alto * 0.3 - 6} cy={y - b.u * alto * p - 6} r={b.r * 0.32} fill="#fff" opacity=".8" />)}
  </g>;
}
// Nivel de burbuja (muestra que la botella está quieta).
function Nivel({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-34} width={240} height={68} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <rect x={-70} y={-18} width={140} height={36} rx={18} fill="#d8ffd0" stroke={KC.ink} strokeWidth={5} />
    <line x1={-22} y1={-18} x2={-22} y2={18} stroke={KC.ink} strokeWidth={4} /><line x1={22} y1={-18} x2={22} y2={18} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={Math.sin(T * 1.3) * 1.5} cy={0} rx={16} ry={11} fill="#fff" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Espiga de cebada (barbas largas). Base del tallo en (x, y). mancha 0..1 = moho salmón en las espiguillas.
function Espiga({ x, y, s = 1, T = 0, mancha = 0, seed = 1, alto = 520 }) {
  const m = mece(T, seed, 0.6) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${m}) scale(${s})`}>
    <path d={`M 0 0 Q 8 ${-alto * 0.5} 0 ${-alto}`} stroke="#5f8f2a" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d={`M 0 ${-alto * 0.35} Q 60 ${-alto * 0.45} 90 ${-alto * 0.62}`} stroke="#6fa83a" strokeWidth={9} fill="none" strokeLinecap="round" />
    {Array.from({ length: 9 }, (_, i) => { const yy = -alto - i * 30, lado = i % 2 ? 1 : -1, inf = i >= 2 && i <= 6 && (i * 0.17) < mancha + 0.2;
      return <g key={i} transform={`translate(${lado * 10} ${yy}) rotate(${lado * 18})`}>
        <line x1={0} y1={-18} x2={lado * 22} y2={-200} stroke={CV.cebada2} strokeWidth={3} />
        <ellipse cx={0} cy={0} rx={15} ry={26} fill={inf && mancha > 0 ? mixHexCV(CV.cebada, CV.salmon, mancha) : CV.cebada} stroke={KC.ink} strokeWidth={4} />
        {inf && mancha > 0.4 && <circle cx={lado * -4} cy={6} r={7 * mancha} fill={CV.salmon2} opacity=".9" />}
      </g>; })}
  </g>;
}
function mixHexCV(a, b, t) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * kclamp(t, 0, 1)).toString(16).padStart(2, '0')).join(''); }
// Lluvia (rayitas que caen).
function Lluvia({ T, n = 60, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const g = krng(i * 7 + 1), x0 = g() * 1180 - 60, v = 900 + g() * 500, y0 = ((g() * 2000 + T * v) % 2100) - 100;
    return <line key={i} x1={x0} y1={y0} x2={x0 - 12} y2={y0 + 46} stroke="#ffffff" strokeWidth={4} opacity=".7" strokeLinecap="round" />; })}</g>;
}
// Grano de cebada germinando. Centro en (x, y). germ 0..1 = raicillas y brote; hifas 0..1 = moho que lo cubre.
function Grano({ T, x, y, s = 1, germ = 1, hifas = 0, puntos = 0 }) {
  const g = krng(11);
  const hf = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2 + g() * 0.3, r0 = 150 + g() * 40, L = 120 + g() * 140; return { a, r0, L, c: (g() - 0.5) * 80 }; });
  const pts = Array.from({ length: 22 }, () => ({ a: g() * Math.PI * 2, r: 200 + g() * 230, f: g() * 6 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {germ > 0 && <>
      {[[-1, 0.9], [-0.6, 1.2], [-1.3, 0.7]].map(([a, k], i) => <path key={i} d={`M -230 40 q ${-120 * k * germ} ${60 * a} ${-230 * k * germ} ${140 * a * -0.4 + 120}`} stroke="#f3ecd8" strokeWidth={12} fill="none" strokeLinecap="round" />)}
      <path d={`M 200 -40 Q ${240 + 80 * germ} ${-120 * germ} ${260 + 160 * germ} ${-210 * germ}`} stroke="#8bcf4a" strokeWidth={16} fill="none" strokeLinecap="round" />
    </>}
    <path d="M -260 30 Q -250 -140 0 -150 Q 250 -140 270 0 Q 250 140 0 150 Q -250 150 -260 30 Z" fill={CV.cebada} stroke={KC.ink} strokeWidth={9} />
    <path d="M -220 10 Q 0 -30 230 0" stroke={CV.cebada2} strokeWidth={8} fill="none" />
    <path d="M -160 -90 Q 0 -120 160 -90" stroke="#fff" strokeWidth={10} fill="none" opacity=".35" strokeLinecap="round" />
    {hifas > 0 && hf.map((h, i) => { const k = kclamp(hifas * 1.6 - i * 0.04, 0, 1); if (k <= 0) return null;
      const x0 = Math.cos(h.a) * h.r0 * 1.35, y0 = Math.sin(h.a) * h.r0 * 0.75, x1 = x0 + Math.cos(h.a) * h.L * k, y1 = y0 + Math.sin(h.a) * h.L * k;
      return <path key={i} d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + h.c * k} ${(y0 + y1) / 2 - h.c * k} ${x1} ${y1}`} stroke="#ffe9e0" strokeWidth={5} fill="none" strokeLinecap="round" />; })}
    {hifas > 0 && <path d="M -200 -60 Q -80 -110 60 -90 Q 180 -70 220 10" stroke={CV.salmon} strokeWidth={22} fill="none" opacity={0.55 * hifas} strokeLinecap="round" />}
    {puntos > 0 && pts.map((q, i) => { const k = kclamp(puntos * 1.5 - i * 0.03, 0, 1); if (k <= 0) return null;
      return <circle key={'p' + i} cx={Math.cos(q.a) * q.r * k * 1.1} cy={Math.sin(q.a) * q.r * k * 0.8 + Math.sin(T * 2 + q.f) * 6} r={10} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Hidrofobina: cadena de ~100 cuentas (aminoácidos) que se pliega. pliegue 0..1; ss 0..1 = 4 puentes S–S entre 8 cisteínas.
const CIS = [12, 22, 23, 40, 55, 66, 67, 86];          // posiciones de las 8 cisteínas en la cadena (esquemático)
const PARES = [[0, 5], [1, 4], [2, 3], [6, 7]];          // 4 puentes disulfuro (esquemático)
function Hidrofobina({ T, x, y, s = 1, pliegue = 1, ss = 0, rot = 0, n = 100 }) {
  const pos = (i) => {
    const u = i / (n - 1);
    const lx = (u - 0.5) * 860, ly = Math.sin(u * Math.PI * 6) * 30;            // estirada
    const a = i * 0.62, r = 30 + 150 * Math.sqrt(u);                              // plegada: espiral compacta
    const px = Math.cos(a) * r * 0.95, py = Math.sin(a) * r * 0.8;
    const k = kEase.suave(kclamp(pliegue * 1.15 - (1 - u) * 0.15, 0, 1));
    return [klerp(lx, px, k), klerp(ly, py, k)];
  };
  const P = Array.from({ length: n }, (_, i) => pos(i));
  const d = 'M ' + P.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} stroke="#5d6b85" strokeWidth={6} fill="none" opacity=".8" />
    {P.map((q, i) => CIS.includes(i) ? null : <circle key={i} cx={q[0]} cy={q[1]} r={11} fill={i % 3 === 0 ? '#7fb2ff' : i % 3 === 1 ? '#b9c6d8' : '#5aa0ff'} stroke={KC.ink} strokeWidth={2.5} />)}
    {ss > 0 && PARES.map(([a, b], k) => { const e = kclamp(ss * 4 - k, 0, 1); if (e <= 0) return null; const A = P[CIS[a]], B = P[CIS[b]];
      return <g key={'s' + k}>
        <line x1={A[0]} y1={A[1]} x2={klerp(A[0], B[0], e)} y2={klerp(A[1], B[1], e)} stroke={CV.cis} strokeWidth={9} strokeLinecap="round" />
        {e >= 1 && <text x={(A[0] + B[0]) / 2 + 10} y={(A[1] + B[1]) / 2 - 10} style={{ font:`700 26px ${KF.mono}` }} fill={CV.cis} stroke={KC.ink} strokeWidth={1}>S–S</text>}
      </g>; })}
    {CIS.map((ci, k) => { const q = P[ci]; return <g key={'c' + k}><circle cx={q[0]} cy={q[1]} r={16} fill={CV.cis} stroke={KC.ink} strokeWidth={3} />
      <text x={q[0]} y={q[1] + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>C</text></g>; })}
  </g>;
}
// Proteína plegada vista como objeto de dos caras: cuerpo azul (ama el agua) y parche plano gris (la repele) hacia +y local.
function DosCaras({ x, y, s = 1, rot = 0, glow = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -110 30 Q -130 -90 -20 -120 Q 100 -130 120 -30 Q 130 20 110 40 L -100 40 Z" fill={CV.hidro} stroke={KC.ink} strokeWidth={6} style={glow ? { filter:`drop-shadow(0 0 ${12 * glow}px ${CV.hidro})` } : null} />
    <path d="M -100 40 L 110 40 L 104 62 L -94 62 Z" fill={CV.parche} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -60 -80 Q 0 -100 60 -80" stroke="#fff" strokeWidth={8} fill="none" opacity=".35" strokeLinecap="round" />
  </g>;
}
// Gota de agua.
function Gota({ x, y, r = 22, o = 1 }) {
  return <path transform={`translate(${x} ${y})`} d={`M 0 ${-r * 1.5} Q ${r} ${-r * 0.2} ${r} ${r * 0.3} A ${r} ${r} 0 0 1 ${-r} ${r * 0.3} Q ${-r} ${-r * 0.2} 0 ${-r * 1.5} Z`} fill={CV.agua} stroke={KC.ink} strokeWidth={4} opacity={o} />;
}
// Burbuja de CO2. cubierta 0..1 = hidrofobinas alrededor (parche gris hacia adentro, cara azul hacia afuera).
function Burbuja({ x, y, r, cubierta = 0, n = 16 }) {
  const k = Math.round(n * cubierta);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="rgba(220,240,255,.18)" stroke="#dff3ff" strokeWidth={5} />
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.25} ry={r * 0.14} fill="#fff" opacity=".6" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
    {r > 30 && <text y={10} textAnchor="middle" style={{ font:`700 ${Math.min(30, r * 0.3)}px ${KF.mono}` }} fill="#dff3ff" opacity=".8">CO₂</text>}
    {Array.from({ length: k }, (_, i) => { const a = (i / n) * Math.PI * 2; return <g key={i} transform={`rotate(${a * 180 / Math.PI}) translate(0 ${-(r + 16)}) scale(.2) rotate(180)`}><DosCaras x={0} y={0} /></g>; })}
  </g>;
}
// Báscula de laboratorio con lectura.
function Bascula({ x, y, texto, color = KC.ink }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={0} width={240} height={70} rx={14} fill="#e9eef2" stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={14} width={160} height={42} rx={8} fill="#1d2b24" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={46} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color === KC.ink ? '#7dff9a' : color}>{texto}</text>
  </g>;
}
// Icono de etapa para la cadena de producción.
function Etapa({ x, y, tipo, texto }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-95} y={-95} width={190} height={190} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    {tipo === 0 && [[-30, -10], [20, -30], [10, 25], [-25, 30], [40, 15]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={22} ry={13} fill={CV.cebada} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 40} ${a} ${b})`} />)}
    {tipo === 1 && <><path d="M -60 -40 L 60 -40 L 50 55 L -50 55 Z" fill="#c9a06a" stroke={KC.ink} strokeWidth={5} /><path d="M -60 -10 L 60 -10" stroke="#8a6232" strokeWidth={5} /></>}
    {tipo === 2 && <><path d="M -50 -50 L 50 -50 L 40 55 L -40 55 Z" fill="#e7b04a" stroke={KC.ink} strokeWidth={5} /><path d="M -20 -70 Q 0 -90 20 -70" stroke="#fff" strokeWidth={5} fill="none" /></>}
    {tipo === 3 && <g transform="translate(0 70) scale(.28)"><Botella x={0} y={0} etiqueta="" /></g>}
    <text x={0} y={135} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

// Etiqueta legible sobre fondo brillante (texto oscuro con halo claro).
function EtqB({ T, at, until, x, y, texto, it = false, lado = 'der', tam = 28 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:60 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:KC.ink, borderRadius:2 }}></div>
    <div style={{ font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color:KC.ink, background:'rgba(255,255,255,.72)', padding:'2px 10px', borderRadius:8, whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}
// Cuadro de texto que sí hace saltos de línea (para la aclaración de la prueba).
function Nota({ T, at, until, x, y, w = 480, texto, tam = 30, borde = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, zIndex:42, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'0 0',
    background:'rgba(14,15,18,.86)', color:KC.texto, border:`4px solid ${borde}`, borderRadius:24, padding:'14px 22px', font:`700 ${tam}px/1.25 ${KF.mono}` }}>{texto}</div>;
}

// ---------- shot ----------
function CervezaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Campo, M: CUES.Malta, Pr: CUES.Proteina, DC: CUES.DosCaras, Bo: CUES.Botella, P: CUES.Pregunta,
    Bl: CUES.Blindaje, A: CUES.Abrir, E: CUES.Estudio, D: CUES.Dosis, PQ: CUES.ParaQue, Ag: CUES.Agua, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const tapa = kprog(T, K.G + 0.2, K.G + 0.9, kEase.sale);
  const chorro = kprog(T, K.G + 0.3, K.G + 1.1, kEase.sale);
  const chorroA = kprog(T, K.A + 2.0, K.A + 3.0, kEase.sale);
  // en el estudio, la botella con hidrofobina brota
  const brota = kprog(T, K.D + 1.6, K.D + 2.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: botella quieta que brota al abrirla */}
      <Escena T={T} a={K.G} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={60} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
          <Nivel x={860} y={1146} T={T} />
          <Chorro T={T} x={330} y={1180 - 560 * 1.05} p={chorro} alto={560} ancho={60} />
          <Botella x={330} y={1180} s={1.05} tapa={tapa} />
        </>)}
      </Escena>
      {/* 1 · campo de cebada bajo la lluvia, con Fusarium */}
      <Escena T={T} a={K.Ca} b={K.M} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={80} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
          {[[120, 1.0, 1], [270, 1.15, 2], [430, 1.05, 3], [590, 1.2, 4], [760, 1.0, 5], [920, 1.1, 6]].map(([ex, s2, sd], i) =>
            <Espiga key={i} T={T} x={ex} y={1190} s={s2 * 0.8} alto={260} seed={sd} mancha={i === 1 || i === 3 || i === 4 ? kprog(T, K.Ca + 1.0 + i * 0.2, K.Ca + 2.6 + i * 0.2) : 0} />)}
          <Lluvia T={T} o={0.9} />
        </>)}
      </Escena>
      {/* 2 · malta: grano que germina y el moho que suelta hidrofobinas */}
      <Escena T={T} a={K.M} b={K.Pr} zoom={0.07}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Grano T={T} x={520} y={860} s={1.05} germ={kprog(T, K.M, K.M + 1.4, kEase.sale)} hifas={kprog(T, K.M + 0.8, K.M + 2.4)} puntos={kprog(T, K.M + 2.2, K.M + 3.6)} />)}
      </Escena>
      {/* 3–4 · al microscopio: la proteína (100 aminoácidos, 8 C, 4 S–S) y sus dos caras */}
      <Escena T={T} a={K.Pr} b={K.Bo} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          {T < K.DC + 0.4 && <g opacity={1 - kprog(T, K.DC, K.DC + 0.4)}>
            <Hidrofobina T={T} x={540} y={860} s={1.1} pliegue={kprog(T, K.Pr + 0.4, K.Pr + 2.0)} ss={kprog(T, K.Pr + 2.2, K.Pr + 3.8)} rot={Math.sin(T * 0.6) * 4} />
          </g>}
          {T > K.DC - 0.1 && <g opacity={kprog(T, K.DC - 0.1, K.DC + 0.4)}>
            <DosCaras x={540} y={900} s={2.4} rot={Math.sin(T * 0.8) * 6} />
            {/* gotas: se pegan arriba (cara azul), resbalan en el parche */}
            {[-1, 0, 1].map((k) => { const t0 = K.DC + 0.6 + (k + 1) * 0.25, u = kprog(T, t0, t0 + 0.8, kEase.sale);
              return <Gota key={'a' + k} x={540 + k * 150} y={klerp(620, 650 + Math.abs(k) * 70, u)} r={24} o={u > 0 ? 1 : 0} />; })}
            {[-1, 1].map((k) => { const t0 = K.DC + 1.3 + (k + 1) * 0.15, u = kprog(T, t0, t0 + 1.2);
              return <Gota key={'b' + k} x={540 + k * (180 + u * 220)} y={1030 + u * 30} r={24} o={u > 0 ? 1 - kprog(u, 0.8, 1) : 0} />; })}
          </g>}
        </>)}
      </Escena>
      {/* 5 · la cadena: malta → macerado → mosto → botella; solo una parte llega */}
      <Escena T={T} a={K.Bo} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {['malta', 'macerado', 'mosto', 'cerveza'].map((t, i) => <Etapa key={i} x={150 + i * 260} y={860} tipo={i} texto={t} />)}
          {[0, 1, 2].map((i) => <path key={i} d={`M ${255 + i * 260} 860 l 50 0 m -16 -16 l 16 16 l -16 16`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />)}
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 40), u = kprog(T, K.Bo + 0.1 + i * 0.03, K.Bo + 2.0 + i * 0.03), llega = i < 2, para = llega ? 1 : 0.15 + g() * 0.6, uu = Math.min(u, para);
            return <circle key={i} cx={150 + uu * 780} cy={720 - Math.sin(uu * Math.PI * 3) * 40 + (u >= para && !llega ? (u - para) * 220 : 0)} r={14} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} opacity={u > 0 ? (llega ? 1 : 1 - kclamp((u - para) * 3, 0, 0.7)) : 0} />; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Bl} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Botella x={320} y={1180} s={1.0} rot={Math.sin(T * 3) * 2} /><Interrogacion T={T} x={640} y={1080} tam={380} color={KC.yellow} /></>)}
      </Escena>
      {/* 7–8 · dentro de la cerveza: burbujas blindadas; al abrir, cae la presión */}
      <Escena T={T} a={K.Bl} b={K.A + 2.0} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 45%, #3a2406 0%, #120a02 75%)' }}></div>
        <Ambiente T={T} n={20} color="rgba(255,220,150,.3)" />
        {fsvg(<>
          {/* burbuja sola: se encoge y se disuelve */}
          {(() => { const u = kprog(T, K.Bl + 0.5, K.Bl + 2.6); return u < 1 ? <Burbuja x={270} y={820} r={klerp(110, 4, u)} /> : null; })()}
          {/* burbuja blindada */}
          {(() => { const cub = kprog(T, K.Bl + 0.6, K.Bl + 2.4), crece = kprog(T, K.A + 0.6, K.A + 2.0, kEase.sale);
            return <Burbuja x={720} y={820} r={110 + crece * 150} cubierta={cub} n={20} />; })()}
          {/* nacen muchas burbujas nuevas */}
          {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 9), t0 = K.A + 1.2 + g() * 0.6, u = kprog(T, t0, t0 + 0.9, kEase.sale); if (u <= 0) return null;
            const a = g() * Math.PI * 2, d = 160 + g() * 300;
            return <Burbuja key={i} x={720 + Math.cos(a) * d * u} y={820 + Math.sin(a) * d * u - u * 80} r={14 + g() * 30 * u} />; })}
        </>)}
      </Escena>
      <Escena T={T} a={K.A + 2.0} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={60} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
          <Chorro T={T} x={330} y={1180 - 560 * 1.05} p={chorroA} alto={560} ancho={60} seed={5} />
          <Botella x={330} y={1180} s={1.05} tapa={1} />
        </>)}
      </Escena>
      {/* 9–10 · el estudio de 2012 (VTT): misma agitación, control 0 g y 1 µg → brota */}
      <Escena T={T} a={K.E} b={K.PQ} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={60} fill="#d9dfe6" stroke={KC.ink} strokeWidth={8} />
          {/* gotero */}
          {T < K.D + 0.5 && (() => { const u = kprog(T, K.E + 1.2, K.E + 2.0, kEase.sale), o = 1 - kprog(T, K.D, K.D + 0.5);
            return <g opacity={u * o} transform={`translate(${klerp(250, 360, u)} ${klerp(470, 690, u)})`}>
              <rect x={-22} y={-150} width={44} height={150} rx={10} fill="#e9f6ff" stroke={KC.ink} strokeWidth={6} />
              <rect x={-18} y={-80} width={36} height={76} rx={8} fill={KC.gold2} opacity=".8" />
              <path d="M -10 0 L 10 0 L 4 50 L -4 50 Z" fill="#e9f6ff" stroke={KC.ink} strokeWidth={5} />
              <ellipse cx={0} cy={-170} rx={30} ry={26} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
              {[0, 1, 2].map((k) => { const v = kprog(T, K.E + 2.2 + k * 0.6, K.E + 2.6 + k * 0.6); return v > 0 && v < 1 ? <circle key={k} cx={0} cy={60 + v * 70} r={9} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} /> : null; })}
            </g>; })()}
          <Botella x={150} y={1110} s={0.62} etiqueta="CONTROL" rot={T < K.D + 0.9 && T > K.D + 0.1 ? Math.sin(T * 18) * 5 : 0} />
          <Chorro T={T} x={360} y={1110 - 506 * 0.62} p={brota} alto={130} ancho={36} seed={8} />
          <Botella x={360} y={1110} s={0.62} etiqueta="+1 µg" tapa={kprog(T, K.D + 1.4, K.D + 1.9)} rot={T < K.D + 0.9 && T > K.D + 0.1 ? Math.sin(T * 18 + 1) * 5 : 0} />
          {T > K.D + 0.4 && <><Bascula x={150} y={1110} texto="0 g" /><Bascula x={360} y={1110} texto={brota > 0.2 ? `-${Math.round(106 * kprog(T, K.D + 1.8, K.D + 3.0))} g` : '0 g'} /></>}
        </>)}
      </Escena>
      {/* 11 · para qué le sirven a los hongos: romper la superficie del agua; esporas que no se mojan */}
      <Escena T={T} a={K.PQ} b={K.Ag} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg((() => { const pel = kprog(T, K.PQ + 1.0, K.PQ + 2.6), sale = kprog(T, K.PQ + 2.6, K.PQ + 3.8, kEase.sale);
          const empuja = Math.min(1, kprog(T, K.PQ + 0.2, K.PQ + 1.2)) * (1 - sale);
          const yS = 820, tipY = klerp(960, yS - 30 * empuja, kprog(T, K.PQ + 0.2, K.PQ + 1.2)) - sale * 300;
          const curva = `M 60 ${yS} Q 300 ${yS} 380 ${yS - 50 * empuja} Q 400 ${yS - 70 * empuja} 420 ${yS - 50 * empuja} Q 500 ${yS} 1020 ${yS}`;
          return <>
            <rect x={60} y={yS} width={960} height={300} fill={CV.agua} opacity=".75" />
            <path d={curva} stroke="#1d6fa5" strokeWidth={8} fill="none" />
            {pel > 0 && Array.from({ length: Math.round(pel * 20) }, (_, i) => <rect key={i} x={70 + i * 48} y={yS - 9} width={40} height={14} rx={7} fill={CV.hidro} stroke={KC.ink} strokeWidth={3} />)}
            <path d={`M 400 1120 Q 395 ${(1120 + tipY) / 2} 400 ${tipY}`} stroke={KC.ink} strokeWidth={32} fill="none" strokeLinecap="round" />
            <path d={`M 400 1120 Q 395 ${(1120 + tipY) / 2} 400 ${tipY}`} stroke="#fff4d6" strokeWidth={22} fill="none" strokeLinecap="round" />
            {/* espora con gota que no la moja (aparece al final) */}
            {(() => { const u = kprog(T, K.PQ + 4.6, K.PQ + 5.4, kEase.rebote); if (u <= 0) return null;
              return <g transform={`translate(840 730) scale(${u})`}>
                <ellipse cx={0} cy={40} rx={60} ry={40} fill="#c9b27a" stroke={KC.ink} strokeWidth={6} />
                <circle cx={0} cy={-34} r={36} fill={CV.agua} stroke={KC.ink} strokeWidth={5} /><circle cx={-12} cy={-46} r={9} fill="#fff" opacity=".8" />
              </g>; })()}
          </>; })())}
      </Escena>
      {/* 12 · agua mineral con gas: también brota */}
      <Escena T={T} a={K.Ag} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={60} fill="#d9dfe6" stroke={KC.ink} strokeWidth={8} />
          <Chorro T={T} x={330} y={1180 - 560 * 1.0} p={kprog(T, K.Ag + 0.4, K.Ag + 1.4, kEase.sale)} alto={420} ancho={50} seed={12} />
          <Botella x={330} y={1180} s={1.0} tapa={kprog(T, K.Ag + 0.2, K.Ag + 0.8)} color={CV.vidrio} brillo="#ffffff" etiqueta="AGUA" liquido={CV.vidrio2} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma botella del inicio, ya "leída" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={60} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
          <Nivel x={860} y={1146} T={T} />
          <Chorro T={T} x={330} y={1180 - 560 * 1.05} p={1} alto={560} ancho={60} />
          <Botella x={330} y={1180} s={1.05} tapa={1} />
          {(() => { const u = kprog(T, K.C + 1.6, K.C + 2.6, kEase.sale); if (u <= 0) return null;
            return <g opacity={u}>
              <path d={`M 470 620 Q 640 ${560 - 30 * u} 700 ${klerp(620, 880, u)}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="16 12" strokeDashoffset={-T * 40} />
              <g transform="translate(760 1150) scale(.55)"><Espiga T={T} x={0} y={0} mancha={1} seed={2} /></g>
              <g transform="translate(900 1080) scale(.22)"><Grano T={T} x={0} y={0} germ={1} hifas={1} /></g>
            </g>; })()}
        </>)}
        <Lupa T={T} at={K.C + 0.6} until={FIN} x={330} y={380} r={140} fx={330} fy={560} tinte={KC.gold}
          interior={(T2, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a1006" />
            <Burbuja x={r} y={r} r={70} cubierta={1} n={18} /><Burbuja x={r * 0.4} y={r * 0.5} r={30} cubierta={1} n={10} /><Burbuja x={r * 1.6} y={r * 1.5} r={36} cubierta={1} n={12} /></svg>} />
      </Escena>

      {/* ---------- textos ---------- */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.2} until={K.Ca - 0.3} texto="¿agitada?" x={700} y={900} tam={40} />
      <Chip T={T} at={K.G + 2.6} until={K.Ca - 0.3} texto="proteínas de un hongo" x={700} y={990} tam={36} borde={CV.salmon} />
      <EtqB T={T} at={K.G + 3.0} until={K.Ca - 0.3} x={520} y={1062} texto="también hay causas del proceso" tam={20} />
      <EtqB T={T} at={K.G + 3.0} until={K.Ca - 0.3} x={520} y={1100} texto="(gushing secundario)" tam={20} />
      <Chip T={T} at={K.Ca + 1.4} until={K.M - 0.3} texto={<i>Fusarium</i>} x={250} y={470} tam={52} borde={CV.salmon} />
      <EtqB T={T} at={K.Ca + 1.8} until={K.M - 0.3} x={40} y={560} texto="F. graminearum · F. culmorum · F. poae" it tam={20} />
      <Chip T={T} at={K.Ca + 2.4} until={K.M - 0.3} texto={<>cebada · <i>Hordeum vulgare</i></>} x={300} y={650} tam={30} borde={CV.cebada} />
      <Chip T={T} at={K.Ca + 3.0} until={K.M - 0.3} texto="más con lluvia" x={250} y={740} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.M + 0.2} until={K.Pr - 0.3} texto="malta = cebada germinada y secada" x={420} y={470} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.M + 2.4} until={K.Pr - 0.3} texto="● hidrofobinas" x={300} y={1140} tam={34} borde={KC.gold2} />
      <Chip T={T} at={K.Pr + 0.1} until={K.DC + 1.7} texto="AL MICROSCOPIO · HIDROFOBINA" x={420} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pr + 0.6} until={K.DC - 0.3} x={60} y={560} texto="~100 aminoácidos" tam={32} color="#9fc4ff" />
      <Chip T={T} at={K.Pr + 2.4} until={K.DC - 0.2} texto="8 cisteínas → 4 puentes disulfuro" x={480} y={1130} tam={32} borde={CV.cis} />
      <Chip T={T} at={K.DC + 0.5} until={K.Bo - 0.3} texto="ama el agua · hidrofílica" x={540} y={565} tam={28} borde={CV.hidro} mono />
      <Chip T={T} at={K.DC + 1.3} until={K.Bo - 0.3} texto="la repele · hidrofóbica" x={540} y={1110} tam={28} borde={CV.parche} mono />
      <Chip T={T} at={K.DC + 1.9} until={K.Bo - 0.2} texto="anfipática: dos caras" x={420} y={470} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.Bo + 1.0} until={K.P - 0.2} texto="solo una parte llega (un estudio: ~10–20 %)" x={540} y={1080} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Bl + 0.2} until={K.A + 1.8} texto="AL MICROSCOPIO · DENTRO DE LA CERVEZA" x={480} y={470} tam={26} borde={KC.gold} mono />
      <Chip T={T} at={K.Bl + 0.8} until={K.A - 0.2} texto="hipótesis" x={720} y={1080} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Bl + 1.2} until={K.A - 0.3} x={60} y={1010} texto="sola: se disuelve" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Bl + 2.0} until={K.A - 0.3} x={60} y={600} texto="blindada" tam={34} color={KC.gold2} />
      <Medidor T={T} at={K.A + 0.1} until={K.A + 1.9} valor={(t) => 1 - kprog(t, K.A + 0.4, K.A + 0.9, kEase.sale) * 0.75} etiqueta="presión" texto={(v) => v > 0.6 ? 'alta' : '¡baja!'} x={60} y={540} ancho={520} color={KC.pink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.D - 0.2} anio="2012" quien="VTT, Finlandia · Sarlin et al." revista="J. Basic Microbiol., 2012" x={700} y={640} />
      <EtqB T={T} at={K.E + 1.4} until={K.D - 0.3} x={470} y={830} texto="de F. graminearum y F. poae" it tam={22} />
      <EtqB T={T} at={K.E + 1.6} until={K.D - 0.3} x={470} y={872} texto="(producidas en Trichoderma reesei)" it tam={22} />
      <Nota T={T} at={K.E + 2.4} until={K.D + 0.1} x={500} y={930} w={520} tam={28} borde={KC.pink} texto="prueba de laboratorio: se agitan 3 días, reposan, se voltean 3 veces y se abren" />
      <NumeroGigante T={T} at={K.D + 0.2} until={K.PQ - 0.3} valor={1} dur={0.4} sufijo=" µg" x={270} y={400} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.D + 0.4} until={K.PQ - 0.3} texto="una millonésima de gramo" x={270} y={510} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.D + 0.6} until={K.PQ - 0.3} texto="en 330 ml = 0.003 ppm" x={270} y={578} tam={28} borde={KC.ink} mono />
      <Chip T={T} at={K.D + 0.3} until={K.PQ - 0.3} texto="misma agitación" x={270} y={646} tam={30} borde={KC.pink} />
            <EtqB T={T} at={K.D + 0.8} until={K.PQ - 0.3} x={30} y={1500} texto="CONTROL = sin hidrofobina · 106 g = promedio de 2 botellas" tam={20} />
      <Chip T={T} at={K.PQ + 0.2} until={K.Ag - 0.3} texto="la hifa tiene que salir del agua" x={420} y={470} tam={32} borde={KC.ink} />
      <Medidor T={T} at={K.PQ + 0.9} until={K.Ag - 0.3} valor={(t) => klerp(72, 24, kprog(t, K.PQ + 1.0, K.PQ + 2.6, kEase.suave)) / 72} etiqueta="tensión superficial" texto={(v) => Math.round(v * 72) + ' mJ/m²'} x={90} y={540} ancho={560} color={CV.hidro} />
      <EtqB T={T} at={K.PQ + 1.4} until={K.Ag - 0.3} x={40} y={680} texto="en el hongo Schizophyllum commune (1999)" it tam={22} />
      <EtqB T={T} at={K.PQ + 4.8} until={K.Ag - 0.3} x={770} y={720} lado="izq" texto="espora: no se moja" tam={26} />
      <Chip T={T} at={K.Ag + 0.6} until={K.C - 0.2} texto="misma dosis: 0.003 ppm" x={300} y={480} tam={34} borde={KC.cyan} />
      <EtqB T={T} at={K.Ag + 0.9} until={K.C - 0.3} x={40} y={560} texto="en la misma prueba" tam={24} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="gushing primario: viene del grano" x={540} y={790} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="hipótesis" x={330} y={560} tam={24} borde={KC.yellow} />
      <EtqB T={T} at={K.C + 2.6} until={K.Ou} x={30} y={1500} texto="Divulgación científica: no invita a consumir alcohol." tam={20} />
      <EtqB T={T} at={K.C + 2.6} until={K.Ou} x={30} y={1540} texto="El dibujo es esquemático." tam={20} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ca} texto="5 cm" largo={100} y={1600} />
      <BarraEscala T={T} at={K.Ca} until={K.M} texto="5 cm" largo={90} y={1600} />
      <BarraEscala T={T} at={K.M} until={K.Pr} texto="2 mm" largo={140} y={1600} />
      <BarraEscala T={T} at={K.Pr} until={K.Bo} texto="2 nm (esquemático)" largo={160} y={1600} />
      <BarraEscala T={T} at={K.Bo} until={K.P} texto="esquema del proceso" largo={0} y={1600} />
      <BarraEscala T={T} at={K.P} until={K.Bl} texto="5 cm" largo={100} y={1600} />
      <BarraEscala T={T} at={K.Bl} until={K.A + 2.0} texto="100 nm (esquemático)" largo={200} y={1600} />
      <BarraEscala T={T} at={K.A + 2.0} until={K.E} texto="5 cm" largo={100} y={1600} />
      <BarraEscala T={T} at={K.E} until={K.PQ} texto="5 cm" largo={70} y={1600} />
      <BarraEscala T={T} at={K.PQ} until={K.Ag} texto="50 µm" largo={150} y={1600} />
      <BarraEscala T={T} at={K.Ag} until={K.C} texto="5 cm" largo={100} y={1600} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={100} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="No estaba agitada: traía *proteínas de un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.M - 0.1} texto="El moho *Fusarium* infecta la cebada." />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.Pr - 0.1} texto="En la malta suelta *hidrofobinas.*" />
      <Subtitulo T={T} idx={3} at={K.Pr + 0.1} until={K.DC - 0.1} texto="100 aminoácidos, *4 puentes de azufre.*" />
      <Subtitulo T={T} idx={4} at={K.DC + 0.1} until={K.Bo - 0.1} texto="Una cara ama el agua; *la otra la repele.*" />
      <Subtitulo T={T} idx={5} at={K.Bo + 0.1} until={K.P - 0.1} texto="Una parte *llega a la botella.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Bl - 0.1} texto="¿Qué hacen *ahí dentro?*" />
      <Subtitulo T={T} idx={7} at={K.Bl + 0.1} until={K.A - 0.1} texto="Hipótesis: *blindan las burbujitas.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.E - 0.1} texto="Cae la presión: *crecen de golpe.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.D - 0.1} texto="2012, *VTT de Finlandia.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.PQ - 0.1} texto="Misma agitación: *una millonésima de gramo.*" />
      <Subtitulo T={T} idx={11} at={K.PQ + 0.1} until={K.Ag - 0.1} texto="A los hongos les sirven para *salir del agua.*" />
      <Subtitulo T={T} idx={12} at={K.Ag + 0.1} until={K.C - 0.1} texto="Agua mineral con gas: *igual.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo traía *desde el grano.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ca + 0.3, K.M - 0.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pr + 0.3, K.DC - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Bo + 0.5, K.Bl - 0.3, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.A - 0.1, K.E - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.D, K.PQ - 0.2, 'avatar_04_bajando_lentes', 'grande'],
        [K.PQ + 1.2, K.Ag - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ag + 0.2, K.C - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.8, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="152" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CervezaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CervezaShot /></CompositionStage></div>;
}
window.CervezaApp = CervezaApp;
