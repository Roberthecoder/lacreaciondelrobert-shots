// Shot Fungi Mati #154 · Para un medicamento, ese hongo y tú son casi lo mismo — NARRADO (N1 «Por dentro» + capítulos chicos).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const AF = { piel:'#f1b48f', piel2:'#d98f6b', moho:'#7d9a6a', moho2:'#a9bf8f', moho3:'#4f6b45', agar:'#f5e7b8',
  col:'#ff9a3c', ergo:'#F4C25A', lipido:'#8fd6ff', cola:'#cfe9ff', glucano:'#E8A62A', quitina:'#b18cff', azol:'#ff2d78', amb:'#2fe0a8', rinon:'#c0504d' };

// Mano esquemática (palma hacia arriba, entra desde la derecha). (x, y) = centro de la palma.
function Mano({ x, y, s = 1, rot = -8 }) {
  const dedo = (dx, h, r) => <rect x={dx - 23} y={-110 - h} width={46} height={h + 40} rx={23} fill={AF.piel} stroke={KC.ink} strokeWidth={7} transform={`rotate(${r} ${dx} -90)`} />;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={40} y={60} width={150} height={260} rx={40} fill={AF.piel2} stroke={KC.ink} strokeWidth={7} />
    {dedo(-75, 120, -12)}{dedo(-25, 160, -4)}{dedo(25, 165, 3)}{dedo(75, 135, 10)}
    <rect x={-110} y={-110} width={220} height={210} rx={70} fill={AF.piel} stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-40} width={110} height={48} rx={24} fill={AF.piel} stroke={KC.ink} strokeWidth={7} transform="rotate(-35 -100 -16)" />
    <path d="M -60 10 Q 0 40 60 0" stroke={AF.piel2} strokeWidth={6} fill="none" />
  </g>;
}
// Cápsula genérica (sin marca).
function Capsula({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-44} y={-18} width={88} height={36} rx={18} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -18 L 26 -18 Q 44 -18 44 0 Q 44 18 26 18 L 0 18 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Colonia de moho verde-gris en una caja Petri (anillos y puntitos de esporas). r crece.
function Moho({ x, y, r, seed = 3 }) {
  if (r <= 2) return null;
  const g = krng(seed);
  const pts = Array.from({ length: 40 }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.85; return [x + Math.cos(a) * d, y + Math.sin(a) * d]; });
  return <g>
    <Colonia cx={x} cy={y} r={r * 1.06} color="#eef2e2" seed={seed} />
    <Colonia cx={x} cy={y} r={r * 0.86} color={AF.moho2} seed={seed + 1} />
    <Colonia cx={x} cy={y} r={r * 0.6} color={AF.moho} seed={seed + 2} />
    <Colonia cx={x} cy={y} r={r * 0.3} color={AF.moho3} seed={seed + 3} />
    {pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3 + (i % 3)} fill={AF.moho3} opacity=".7" />)}
  </g>;
}
// Diana (blanco del medicamento).
function Diana({ x, y, r = 70, color = KC.red, o = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} />
    <circle r={r * 0.66} fill={color} stroke={KC.ink} strokeWidth={4} />
    <circle r={r * 0.33} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <circle r={r * 0.12} fill={color} />
    <line x1={-r - 20} y1={0} x2={r + 20} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={0} y1={-r - 20} x2={0} y2={r + 20} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Esterol esquemático: 3 hexágonos + 1 pentágono fusionados + cola. ergo = dobles enlaces de más (anillo B y cola) y metilo extra.
function Esterol({ x, y, s = 1, rot = 0, color = AF.col, ergo = false, o = 1 }) {
  const R = 20, hexa = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + R * Math.cos(a)).toFixed(1)} ${(cy + R * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={hexa(0, 0)} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <path d={hexa(34.6, 0)} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <path d={hexa(52, 30)} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 69.3 20 L 88 12 L 96 30 L 82 46 L 69.3 40 Z" fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 96 30 L 118 22 L 136 34 L 156 26 L 174 38" stroke={color} strokeWidth={6} fill="none" strokeLinejoin="round" />
    <circle cx={-22} cy={8} r={7} fill={KC.red} />
    {ergo && <>
      <line x1={22} y1={-6} x2={22} y2={10} stroke="#fff" strokeWidth={4} />
      <line x1={140} y1={27} x2={154} y2={21} stroke="#fff" strokeWidth={4} />
      <line x1={156} y1={26} x2={160} y2={6} stroke={color} strokeWidth={5} />
    </>}
  </g>;
}
// Fosfolípido: cabeza y dos colas. arriba = la cabeza mira hacia arriba.
function Lipido({ x, y, arriba = true, color = AF.lipido }) {
  const d = arriba ? 1 : -1;
  return <g>
    <line x1={x - 6} y1={y} x2={x - 6} y2={y + d * 52} stroke={AF.cola} strokeWidth={4} />
    <line x1={x + 6} y1={y} x2={x + 6} y2={y + d * 52} stroke={AF.cola} strokeWidth={4} />
    <circle cx={x} cy={y} r={13} fill={color} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Bicapa horizontal con esteroles metidos. quitados = índices de esteroles arrancados (salen volando con prog 0..1).
function Bicapa({ T, x, y, w = 900, ergo = false, n = 7, quitados = [], salida = 0, color = AF.lipido, debil = 0 }) {
  const paso = 34, k = Math.floor(w / paso);
  return <g>
    {Array.from({ length: k }, (_, i) => <g key={i} transform={`translate(0 ${Math.sin(i * 1.7 + T * 2) * 3 * (1 + debil * 3)})`}>
      <Lipido x={x + i * paso + 17} y={y} arriba={false} color={color} /><Lipido x={x + i * paso + 17} y={y + 124} arriba color={color} />
    </g>)}
    {Array.from({ length: n }, (_, i) => { const q = quitados.indexOf(i), sal = q >= 0 ? kclamp(salida * 1.6 - q * 0.15, 0, 1) : 0;
      return <Esterol key={i} x={x + 40 + i * (w - 120) / (n - 1)} y={y + 52 - sal * 170} s={0.42} rot={90} color={ergo ? AF.ergo : AF.col} ergo={ergo} o={1 - sal * 0.2} />; })}
  </g>;
}
// Célula esquemática con núcleo (ADN) y organelos. pared = 0..1 (fibras de glucano y quitina alrededor).
function Celula({ T, x, y, r = 170, color = 'rgba(143,214,255,.22)', borde = AF.lipido, nucleo = 1, brillo = 0, pared = 0, adelgaza = 0, seed = 2 }) {
  const g = krng(seed);
  const rib = Array.from({ length: 18 }, () => { const a = g() * Math.PI * 2, d = r * (0.45 + g() * 0.4); return [Math.cos(a) * d, Math.sin(a) * d]; });
  const nf = 36;
  return <g transform={`translate(${x} ${y})`}>
    {pared > 0 && Array.from({ length: nf }, (_, i) => { const a = (i / nf) * Math.PI * 2, vis = kclamp(pared * nf - i, 0, 1) * (i % 2 === 0 ? 1 - adelgaza : 1);
      const r1 = r + 10, r2 = r + 10 + 34 * vis;
      return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a + 0.12) * r2} y2={Math.sin(a + 0.12) * r2} stroke={i % 2 === 0 ? AF.glucano : AF.quitina} strokeWidth={9} strokeLinecap="round" opacity={vis > 0.02 ? 1 : 0} />; })}
    <circle r={r} fill={color} stroke={borde} strokeWidth={8} />
    {rib.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill={KC.lilac} opacity=".8" />)}
    <ellipse cx={-r * 0.45} cy={r * 0.4} rx={38} ry={20} fill="#ff8a1f" stroke={KC.ink} strokeWidth={3} transform={`rotate(25 ${-r * 0.45} ${r * 0.4})`} />
    <ellipse cx={r * 0.5} cy={r * 0.35} rx={34} ry={18} fill="#ff8a1f" stroke={KC.ink} strokeWidth={3} transform={`rotate(-30 ${r * 0.5} ${r * 0.35})`} />
    <circle r={r * 0.36 * nucleo} fill="rgba(177,140,255,.35)" stroke={KC.lilac} strokeWidth={6} style={brillo ? { filter:`drop-shadow(0 0 ${20 * brillo}px ${KC.lilac})` } : null} />
    {nucleo > 0.5 && <path d={Array.from({ length: 21 }, (_, i) => `${i ? 'L' : 'M'} ${-r * 0.24 + i * r * 0.024} ${Math.sin(i * 0.9 + T * 3) * r * 0.1}`).join(' ')} stroke={KC.yellow} strokeWidth={5} fill="none" />}
  </g>;
}
// "Esponja" de anfotericina B: barritas en racimo. (x, y) centro.
function Esponja({ T, x, y, s = 1, color = AF.amb, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2 + T * 0.4; return <rect key={i} x={Math.cos(a) * 30 - 10} y={Math.sin(a) * 30 - 34} width={20} height={68} rx={10} fill={color} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a * 57.3} ${Math.cos(a) * 30} ${Math.sin(a) * 30})`} />; })}
  </g>;
}
// Silueta esquemática del estado de Nueva York.
function MapaNY({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 40 120 L 330 120 L 360 60 L 420 40 L 470 0 L 520 10 L 540 90 L 560 220 L 570 300 L 600 330 L 520 345 L 470 320 L 420 300 L 380 230 L 60 230 L 40 180 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 570 330 L 700 300 L 690 320 L 580 352 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tubo de ensayo con tierra.
function Tubo({ x, y, s = 1, tierra = '#7a4a22', on = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * on})`}>
    <rect x={-18} y={-110} width={36} height={110} rx={18} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={5} />
    <rect x={-13} y={-46} width={26} height={42} rx={12} fill={tierra} />
  </g>;
}
// Frasco de vidrio (mason jar) para el correo.
function FrascoVidrio({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-40} y={-100} width={80} height={100} rx={16} fill="rgba(200,235,255,.7)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-118} width={68} height={22} rx={5} fill="#c0c0c0" stroke={KC.ink} strokeWidth={5} />
    <path d="M -22 -40 Q -10 -60 0 -40 T 22 -40" stroke="#7a5a2a" strokeWidth={6} fill="none" />
  </g>;
}
// Bacteria filamentosa (Streptomyces): hifas ramificadas.
function Streptomyces({ x, y, s = 1, p = 1, color = KC.mint }) {
  const r = [['M 0 0 L 120 -20 L 240 10 L 360 -10', 0], ['M 120 -20 L 170 -90 L 230 -120', 0.3], ['M 240 10 L 290 80 L 350 100', 0.45], ['M 170 -90 L 130 -150', 0.6], ['M 360 -10 L 420 -60', 0.7]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {r.map(([d, t], i) => <path key={i} d={d} stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - kclamp((p - t) * 2.5, 0, 1)} />)}
  </g>;
}
// Riñón esquemático.
function Rinon({ x, y, s = 1, alerta = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -90 Q 80 -110 100 -20 Q 110 60 40 90 Q -20 110 -50 60 Q -30 30 -40 0 Q -50 -30 -30 -60 Q -20 -85 0 -90 Z" fill={AF.rinon} stroke={KC.ink} strokeWidth={7} style={alerta ? { filter:`drop-shadow(0 0 ${24 * alerta}px ${KC.red})` } : null} />
    <path d="M -38 0 Q -10 -10 20 0" stroke="#f3c6a0" strokeWidth={8} fill="none" />
  </g>;
}
// Molécula esquemática de equinocandina (anillo grande con cola).
function Equino({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={34} fill="rgba(255,45,120,.25)" stroke={KC.pink} strokeWidth={8} />
    <path d="M 34 0 L 60 -14 L 82 4 L 104 -10 L 126 6" stroke={KC.pink} strokeWidth={7} fill="none" />
  </g>;
}
// Azol esquemático: anillo de 5 con nitrógenos.
function Azol({ x, y, s = 1, rot = 0 }) {
  const P = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [Math.cos(a) * 26, Math.sin(a) * 26]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={P.map((q, i) => `${i ? 'L' : 'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ') + ' Z'} fill="rgba(255,45,120,.25)" stroke={AF.azol} strokeWidth={7} strokeLinejoin="round" />
    {[0, 2].map((i) => <text key={i} x={P[i][0] * 1.7} y={P[i][1] * 1.7 + 9} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">N</text>)}
  </g>;
}

function AntifungicosShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ar: CUES.Arbol, Ce: CUES.Celula, Po: CUES.Pocos, Fa: CUES.Familias, Pr: CUES.Pregunta, Me: CUES.Membrana, Az: CUES.Azoles, Pa: CUES.Pared, Es: CUES.Estudio, Ri: CUES.Rinon, Di: CUES.Diez, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G + 0.15, K.G + 0.75, kEase.sale);
  const moho = (a) => 40 + 150 * kprog(T, a, a + 2.4, kEase.sale);
  const FAM = ['polienos', 'azoles', 'equinocandinas', 'pirimidinas', 'triterpenoides'];
  // Pocos: la diana visita 3 organelos (posición relativa a la célula)
  const OBJ = [[0, 0, 'núcleo'], [62, 52, 'ribosomas'], [85, 60, 'mitocondria']];
  const iObj = Math.min(2, Math.floor(kclamp((T - K.Po - 0.3) / 1.0, 0, 2.99)));
  const azolStop = kprog(T, K.Az + 1.2, K.Az + 1.5);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu mano ≈ el moho de la caja Petri */}
      <Escena T={T} a={K.G} b={K.Ar} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Petri x={310} y={930} r={230} medio={AF.agar}><Moho x={0} y={0} r={moho(K.G)} /></Petri>
          <Mano x={820} y={1000} s={1.0} />
          {caida < 1 ? <Capsula x={klerp(820, 640, caida)} y={klerp(700, 1120, caida) - Math.sin(caida * Math.PI) * 120} rot={caida * 400} /> : <Capsula x={640} y={1120} rot={30} />}
          <text x={570} y={980} textAnchor="middle" style={{ font:`400 ${200 * kEase.rebote(kprog(T, K.G + 0.4, K.G + 0.9))}px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={8}>≈</text>
        </>)}
      </Escena>
      {/* 1 · árbol: hongos y animales, grupos hermanos */}
      <Escena T={T} a={K.Ar} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg((() => { const p1 = kprog(T, K.Ar + 0.1, K.Ar + 0.9), p2 = kprog(T, K.Ar + 0.8, K.Ar + 1.6), p3 = kprog(T, K.Ar + 1.5, K.Ar + 2.4);
          const L = (x1, y1, x2, y2, p) => <line x1={x1} y1={y1} x2={klerp(x1, x2, p)} y2={klerp(y1, y2, p)} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />;
          return <>
            {L(360, 1150, 360, 1040, p1)}{L(360, 1040, 130, 860, p2)}{L(360, 1040, 450, 930, p2)}
            {L(450, 930, 300, 730, p3)}{L(450, 930, 600, 730, p3)}
            {p2 >= 1 && <g transform="translate(130 850)"><path d="M 0 0 L 0 -90" stroke="#3fbf4a" strokeWidth={10} /><ellipse cx={-30} cy={-70} rx={34} ry={16} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} transform="rotate(-25 -30 -70)" /><ellipse cx={30} cy={-90} rx={34} ry={16} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} transform="rotate(25 30 -90)" /></g>}
            {p3 >= 1 && <Seta x={300} y={720} s={0.9} crece={kprog(T, K.Ar + 2.4, K.Ar + 3.0)} />}
            {p3 >= 1 && <g transform={`translate(600 720) scale(${kEase.rebote(kprog(T, K.Ar + 2.5, K.Ar + 3.0))})`}><circle cx={0} cy={-130} r={34} fill={AF.piel} stroke={KC.ink} strokeWidth={6} /><rect x={-36} y={-92} width={72} height={92} rx={26} fill={KC.blue} stroke={KC.ink} strokeWidth={6} /></g>}
            {T > K.Ar + 3.0 && <path d={`M 300 540 Q 450 ${470 - 20 * Math.sin(T * 3)} 600 540`} stroke={KC.pink} strokeWidth={8} fill="none" strokeDasharray="16 12" />}
          </>; })())}
      </Escena>
      {/* 2–3 · por dentro: tu célula y la del hongo; la diana no encuentra diferencias */}
      <Escena T={T} a={K.Ce} b={K.Fa} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Celula T={T} x={290} y={860} r={200} color="rgba(255,138,31,.16)" borde={AF.col} brillo={kprog(T, K.Ce + 0.6, K.Ce + 1.0) * (1 - kprog(T, K.Po, K.Po + 0.5))} seed={4} />
          <Celula T={T} x={790} y={860} r={200} brillo={kprog(T, K.Ce + 0.6, K.Ce + 1.0) * (1 - kprog(T, K.Po, K.Po + 0.5))} seed={7} />
          {T > K.Po + 0.2 && (() => { const [ox, oy] = OBJ[iObj], hit = kprog(T, K.Po + 0.3 + iObj, K.Po + 0.75 + iObj);
            return <>
              <Diana x={790 + ox} y={860 + oy} r={58} o={0.9} s={klerp(1.4, 1, kEase.sale(hit))} />
              {hit > 0.6 && <Diana x={290 + ox} y={860 + oy} r={58} o={0.5} color={KC.gold} />}
            </>; })()}
        </>)}
      </Escena>
      {/* 4 · cinco familias de antifúngicos (OMS 2025) */}
      <Escena T={T} a={K.Fa} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {FAM.map((f, i) => { const on = kEase.rebote(kprog(T, K.Fa + 0.6 + i * 0.25, K.Fa + 0.95 + i * 0.25));
            return on > 0 ? <g key={f} transform={`translate(90 ${700 + i * 100}) scale(${on})`}>
              <rect x={0} y={-38} width={560} height={76} rx={38} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <Capsula x={52} y={0} s={0.7} rot={-20} />
              <text x={110} y={14} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{f}</text>
            </g> : null; })}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿cómo le atinan? */}
      <Escena T={T} a={K.Pr} b={K.Me} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Diana x={280} y={930} r={170} s={1 + 0.05 * Math.sin(T * 6)} /><Interrogacion T={T} x={300} y={820} tam={300} /></>)}
      </Escena>
      {/* 6 · membrana: colesterol (tú) vs ergosterol (hongo) */}
      <Escena T={T} a={K.Me} b={K.Az} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <g opacity={kprog(T, K.Me + 0.2, K.Me + 0.8)}><Bicapa T={T} x={90} y={640} w={900} color="#ffb27a" /></g>
          <g opacity={kprog(T, K.Me + 1.8, K.Me + 2.4)}><Bicapa T={T} x={90} y={960} w={900} ergo color={AF.lipido} /></g>
        </>)}
      </Escena>
      {/* 7 · azoles (fábrica que se atora) y anfotericina B (esponja que arranca ergosterol) */}
      <Escena T={T} a={K.Az} b={K.Pa} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {/* línea de ensamble */}
          <rect x={60} y={720} width={620} height={26} rx={13} fill="#3a4a66" stroke={KC.ink} strokeWidth={4} />
          {[160, 360, 560].map((mx, i) => <g key={i}><rect x={mx - 55} y={600} width={110} height={110} rx={18} fill={i === 1 ? (azolStop > 0 ? '#8a2a3a' : '#4a5f86') : '#4a5f86'} stroke={KC.ink} strokeWidth={5} />
            <circle cx={mx} cy={655} r={26} fill="none" stroke="#cfe9ff" strokeWidth={6} strokeDasharray="20 10" transform={`rotate(${(i === 1 ? T - azolStop * (T - K.Az - 1.3) : T) * 120} ${mx} 655)`} /></g>)}
          {Array.from({ length: 5 }, (_, i) => { const tt = (T * 0.35 + i * 0.2) % 1, xx = 70 + tt * 600, parado = azolStop > 0 && xx > 330;
            return !parado ? <circle key={i} cx={xx} cy={706} r={10} fill={AF.ergo} /> : null; })}
          <g opacity={1 - azolStop}><Esterol x={700} y={690} s={0.55} color={AF.ergo} ergo /></g>
          <Azol x={klerp(360, 360, 1)} y={klerp(480, 655, kprog(T, K.Az + 0.8, K.Az + 1.3, kEase.sale))} s={1.1} rot={T * 40 * (1 - azolStop)} />
          {/* membrana del hongo y esponja */}
          <Bicapa T={T} x={90} y={930} w={900} ergo n={7} quitados={[2, 3, 4]} salida={kprog(T, K.Az + 2.4, K.Az + 3.8)} debil={kprog(T, K.Az + 2.8, K.Az + 4)} />
          <Esponja T={T} x={540} y={klerp(1300, 800, kprog(T, K.Az + 2.0, K.Az + 2.6, kEase.sale))} s={1.1} o={kprog(T, K.Az + 2.0, K.Az + 2.3)} />
        </>)}
      </Escena>
      {/* 8 · pared: β-glucano y quitina; equinocandinas frenan la glucano sintasa */}
      <Escena T={T} a={K.Pa} b={K.Es} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Celula T={T} x={240} y={940} r={130} color="rgba(255,138,31,.16)" borde={AF.col} seed={4} />
          <Celula T={T} x={700} y={900} r={200} pared={kprog(T, K.Pa + 0.2, K.Pa + 1.4)} adelgaza={kprog(T, K.Pa + 2.6, K.Pa + 3.8)} seed={7} />
          {(() => { const e = kprog(T, K.Pa + 1.8, K.Pa + 2.5, kEase.sale); return <Equino x={klerp(1000, 885, e)} y={klerp(1200, 960, e)} s={1.1} />; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio: Hazen y Brown, Nueva York (ciudad y Albany), tierra → Streptomyces → nistatina */}
      <Escena T={T} a={K.Es} b={K.Ri} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg((() => { const jar = kprog(T, K.Es + 2.4, K.Es + 3.6, kEase.suave);
          return <>
            <MapaNY x={130} y={420} s={1.05} />
            <circle cx={130 + 545 * 1.05} cy={420 + 315 * 1.05} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
            <circle cx={130 + 520 * 1.05} cy={420 + 170 * 1.05} r={16} fill={KC.blue} stroke={KC.ink} strokeWidth={4} />
            {jar > 0 && jar < 1 && <FrascoVidrio x={klerp(130 + 545 * 1.05, 130 + 520 * 1.05, jar)} y={klerp(420 + 300 * 1.05, 420 + 150 * 1.05, jar) - Math.sin(jar * Math.PI) * 80} s={0.6} rot={Math.sin(jar * 12) * 10} />}
            {Array.from({ length: 8 }, (_, i) => <Tubo key={i} x={110 + i * 66} y={1150} s={0.9} on={kEase.rebote(kprog(T, K.Es + 0.6 + i * 0.12, K.Es + 0.9 + i * 0.12))} tierra={['#7a4a22', '#5b3a22', '#8a5a2a', '#6a4426'][i % 4]} />)}
            {T > K.Es + 4.3 && <Streptomyces x={600} y={1000} s={0.9} p={kprog(T, K.Es + 4.3, K.Es + 5.6)} />}
            {T > K.Es + 6.3 && <g transform="translate(560 1120)"><Esterol x={0} y={0} s={0.8} color={AF.ergo} ergo /><g transform={`translate(${klerp(260, 120, kprog(T, K.Es + 6.4, K.Es + 7.2, kEase.sale))} -20)`}><rect x={0} y={-12} width={130} height={24} rx={12} fill={AF.amb} stroke={KC.ink} strokeWidth={4} /></g></g>}
          </>; })())}
      </Escena>
      {/* 10 · 2023: la anfotericina también jala colesterol de células de riñón; AM-2-19 no */}
      <Escena T={T} a={K.Ri} b={K.Di} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg((() => { const nueva = kprog(T, K.Ri + 4.6, K.Ri + 5.4);
          return <>
            <Rinon x={180} y={560} s={1.1} alerta={kprog(T, K.Ri + 1.6, K.Ri + 2.2) * (1 - nueva)} />
            <Bicapa T={T} x={90} y={760} w={900} n={7} color="#ffb27a" quitados={nueva > 0 ? [] : [1, 3, 5]} salida={kprog(T, K.Ri + 0.6, K.Ri + 2.0) * (1 - nueva)} />
            <g opacity={1 - nueva}><Esponja T={T} x={540} y={660} s={1.0} /></g>
            <g opacity={nueva}><Bicapa T={T} x={90} y={1040} w={900} n={7} ergo quitados={[1, 3, 5]} salida={kprog(T, K.Ri + 5.4, K.Ri + 6.6)} /><Esponja T={T} x={540} y={960} s={1.0} color={KC.cyan} /></g>
          </>; })())}
      </Escena>
      {/* 11 · en diez años, solo cuatro antifúngicos nuevos */}
      <Escena T={T} a={K.Di} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <line x1={110} y1={1060} x2={970} y2={1060} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          {Array.from({ length: 11 }, (_, i) => <g key={i}><line x1={110 + i * 86} y1={1040} x2={110 + i * 86} y2={1080} stroke={KC.ink} strokeWidth={5} />
            {(i === 0 || i === 10) && <text x={110 + i * 86} y={1130} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{2014 + i}</text>}</g>)}
          {[0.15, 0.4, 0.62, 0.9].map((q, i) => { const c = kprog(T, K.Di + 0.4 + i * 0.35, K.Di + 0.8 + i * 0.35, kEase.rebote); return c > 0 ? <Capsula key={i} x={110 + q * 860} y={klerp(700, 1018, c)} rot={-20 + i * 15} s={1.1} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma mano y el mismo moho, ahora con las dianas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Petri x={310} y={930} r={230} medio={AF.agar}><Moho x={0} y={0} r={190} /></Petri>
          <Mano x={820} y={1000} s={1.0} />
          <Capsula x={640} y={1120} rot={30} />
          <text x={570} y={980} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={8}>≈</text>
          {[[190, 700], [310, 650], [430, 700]].map(([dx, dy], i) => <Diana key={i} x={dx} y={dy} r={44} s={kEase.rebote(kprog(T, K.Ci + 0.6 + i * 0.3, K.Ci + 1.0 + i * 0.3))} color={[AF.ergo, AF.glucano, AF.quitina][i]} />)}
        </>)}
      </Escena>

      {/* capítulos chicos */}
      <Capitulo T={T} caps={[{ at: K.Me, titulo:'MEMBRANA' }, { at: K.Pa, titulo:'PARED' }, { at: K.Es + 6.2, titulo:'POLIENOS' }]} hasta={K.Ri - 0.1} x={40} y={330} />

      {/* textos */}
      <Etq T={T} at={K.G + 1.0} until={K.Ar - 0.3} x={120} y={640} texto="moho (un hongo)" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 1.4} until={K.Ar - 0.3} x={500} y={760} texto="tú" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Ar + 1.0} until={K.Ce - 0.3} x={60} y={700} texto="plantas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ar + 2.5} until={K.Ce - 0.3} x={160} y={500} texto="hongos" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ar + 2.6} until={K.Ce - 0.3} x={560} y={520} texto="animales" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ar + 3.0} until={K.Ce - 0.3} texto="grupos hermanos" x={450} y={430} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Ce + 0.1} until={K.Fa - 0.3} texto="POR DENTRO" x={330} y={440} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ce + 0.3} until={K.Fa - 0.3} x={150} y={620} texto="tu célula" tam={32} color={AF.col} />
      <Etq T={T} at={K.Ce + 0.5} until={K.Fa - 0.3} x={430} y={580} texto="célula del hongo" tam={32} color={AF.lipido} />
      <Chip T={T} at={K.Ce + 0.8} until={K.Po - 0.1} texto="las dos: con núcleo" x={540} y={1110} tam={34} borde={KC.lilac} />
      {[0, 1, 2].map((i) => <Chip key={i} T={T} at={K.Po + 0.75 + i} until={i < 2 ? K.Po + 1.7 + i : K.Fa - 0.3} texto={`${OBJ[i][2]}: ✗ también tú`} x={540} y={1110} tam={34} borde={KC.red} />)}
      <NumeroGigante T={T} at={K.Fa + 0.2} until={K.Pr - 0.3} valor={5} dur={0.5} etiqueta="familias de antifúngicos" x={850} y={860} tam={220} color={KC.yellow} />
      <Chip T={T} at={K.Fa + 0.4} until={K.Pr - 0.3} texto="aprobadas para infecciones graves · OMS 2025" x={540} y={470} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Fa + 2.4} until={K.Pr - 0.3} x={640} y={1060} texto="4 de uso clínico" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Me + 0.6} until={K.Az - 0.3} x={60} y={590} texto="tu membrana: colesterol" tam={32} color="#ffb27a" />
      <Etq T={T} at={K.Me + 2.2} until={K.Az - 0.3} x={60} y={910} texto="la del hongo: ergosterol" tam={32} color={AF.ergo} />
      <Chip T={T} at={K.Me + 3.0} until={K.Az - 0.3} texto="casi igual, con unos átomos distintos" x={540} y={1160} tam={30} borde={AF.ergo} />
      <Etq T={T} at={K.Az + 0.3} until={K.Pa - 0.3} x={60} y={560} texto="fábrica de ergosterol" tam={28} color={AF.ergo} />
      <Etq T={T} at={K.Az + 1.0} until={K.Pa - 0.3} x={410} y={470} texto="azol" tam={32} color={AF.azol} />
      <Chip T={T} at={K.Az + 1.5} until={K.Pa - 0.3} texto="enzima 14-α-desmetilasa: frenada" x={400} y={800} tam={26} borde={AF.azol} />
      <Etq T={T} at={K.Az + 2.4} until={K.Pa - 0.3} x={640} y={780} texto="anfotericina B" tam={30} color={AF.amb} />
      <Etq T={T} at={K.Pa + 0.4} until={K.Es - 0.3} x={110} y={760} texto="tú: sin pared" tam={28} color={AF.col} />
      <Etq T={T} at={K.Pa + 1.0} until={K.Es - 0.3} x={560} y={620} texto="β-glucano" tam={30} color={AF.glucano} />
      <Etq T={T} at={K.Pa + 1.3} until={K.Es - 0.3} x={560} y={665} texto="quitina" tam={30} color={AF.quitina} />
      <Etq T={T} at={K.Pa + 2.0} until={K.Es - 0.3} x={760} y={1140} texto="equinocandina → glucano sintasa" tam={26} color={KC.pink} lado="izq" />
      <Chip T={T} at={K.Pa + 3.0} until={K.Es - 0.3} texto="quitina: aún sin medicamento que funcione bien" x={540} y={470} tam={26} borde={AF.quitina} />
      <Etq T={T} at={K.Es + 0.4} until={K.Es + 4.0} x={600} y={1210} texto="ciudad de Nueva York" tam={24} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Es + 0.6} until={K.Es + 4.0} x={760} y={540} texto="Albany" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 4.1} anio="1950" quien="Hazen y Brown" revista="Depto. de Salud del Edo. de Nueva York · Science, 1950" x={420} y={940} />
      <Etq T={T} at={K.Es + 4.6} until={K.Ri - 0.3} x={600} y={850} texto="Streptomyces noursei" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Es + 5.2} until={K.Ri - 0.3} texto="nistatina = New York State" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Es + 6.6} until={K.Ri - 0.3} x={560} y={1050} texto="se pega al ergosterol" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ri + 2.2} until={K.Ri + 4.5} anio="2023" quien="U. de Illinois" revista="Nature, 2023" x={540} y={1040} />
      <Etq T={T} at={K.Ri + 0.3} until={K.Ri + 4.5} x={300} y={470} texto="célula de riñón" tam={30} color="#ffb27a" />
      <Etq T={T} at={K.Ri + 1.0} until={K.Ri + 4.5} x={640} y={600} texto="jala colesterol" tam={30} color={AF.amb} />
      <Etq T={T} at={K.Ri + 4.9} until={K.Di - 0.3} x={640} y={900} texto="AM-2-19" tam={34} color={KC.cyan} />
      <Chip T={T} at={K.Ri + 5.4} until={K.Di - 0.3} texto="en ratones y células de riñón en laboratorio" x={540} y={640} tam={26} borde={KC.cyan} />
      <Chip T={T} at={K.Ri + 6.0} until={K.Di - 0.3} texto="todavía no es medicamento" x={540} y={730} tam={28} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.Di + 0.3} until={K.Ci - 0.3} valor={4} dur={1.4} etiqueta="antifúngicos nuevos" x={540} y={600} tam={220} color={KC.pink} />
      <Chip T={T} at={K.Di + 0.8} until={K.Ci - 0.3} texto="aprobados 2014–2024 · OMS 2025" x={540} y={1180} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Ci + 1.0} until={K.Ou} x={70} y={560} texto="ergosterol · β-glucano · quitina" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ci + 1.6} until={K.Ou} x={640} y={760} texto="colesterol ✓ tuyo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1520} texto="El dibujo es esquemático. No es consejo médico." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ar} texto="5 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.Ar} until={K.Ce} texto="árbol esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ce} until={K.Fa} texto="10 µm" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.Me} texto="diana esquemática" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Me} until={K.Pa} texto="5 nm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.Pa} until={K.Es} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.Es} until={K.Ri} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ri} until={K.Di} texto="5 nm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="5 cm" largo={110} y={1580} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ar - 0.1} texto="Ese hongo y tú: *casi lo mismo.*" />
      <Subtitulo T={T} idx={1} at={K.Ar + 0.1} until={K.Ce - 0.1} texto="Hongos y animales: *grupos hermanos.*" />
      <Subtitulo T={T} idx={2} at={K.Ce + 0.1} until={K.Po - 0.1} texto="Células *con núcleo,* como las tuyas." />
      <Subtitulo T={T} idx={3} at={K.Po + 0.1} until={K.Fa - 0.1} texto="Pocos blancos que *no te dañen.*" />
      <Subtitulo T={T} idx={4} at={K.Fa + 0.1} until={K.Pr - 0.1} texto="Solo *cinco familias* de antifúngicos." />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Me - 0.1} texto="¿Cómo *le atinan?*" />
      <Subtitulo T={T} idx={6} at={K.Me + 0.1} until={K.Az - 0.1} texto="Colesterol tú, *ergosterol* el hongo." />
      <Subtitulo T={T} idx={7} at={K.Az + 0.1} until={K.Pa - 0.1} texto="Frenar su fábrica *o arrancárselo.*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.Es - 0.1} texto="Su pared: *tú no la tienes.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Ri - 0.1} texto="1950: *la nistatina,* de la tierra." />
      <Subtitulo T={T} idx={10} at={K.Ri + 0.1} until={K.Di - 0.1} texto="También jala *tu colesterol.*" />
      <Subtitulo T={T} idx={11} at={K.Di + 0.1} until={K.Ci - 0.1} texto="Diez años: *solo cuatro nuevos.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Los separan *unas moléculas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.9, 'avatar_11_sorprendido', 'gancho'],
        [K.Ar + 2.2, K.Ce - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Po + 0.3, K.Fa - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pr + 0.05, K.Me + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Az + 0.5, K.Pa - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.4, K.Es + 4.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ri + 0.4, K.Ri + 5.8, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Di + 0.3, K.Ci - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ci + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="154" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AntifungicosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AntifungicosShot /></CompositionStage></div>;
}
window.AntifungicosApp = AntifungicosApp;
