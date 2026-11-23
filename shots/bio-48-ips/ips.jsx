// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Biotecnológico #48 · Esta célula de tu piel no es solo piel (células iPS, Yamanaka) — NARRADO (N1 por dentro + toque N6).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
// Escala del micro: 1 µm = 2 px (pxPorMm 2000): fibroblasto ~150 µm de largo, célula iPS ~12 µm, colonia de cientos de µm.
const PIEL = '#f1b48f', PIEL_OSC = '#d98f6b';
const GEN = [['Oct4', KC.pink], ['Sox2', KC.cyan], ['Klf4', KC.yellow], ['c-Myc', KC.mint]];
const PX_MM = 2000;

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Mano vista desde arriba (dorso). Truco: primero todos los contornos, luego todos los rellenos → una sola silueta.
function Mano({ x, y, s = 1, rot = 0 }) {
  const dedos = [[-150, -250, 60, 230, -8], [-55, -300, 62, 280, -2], [45, -290, 60, 270, 4], [140, -240, 54, 220, 10]];
  const formas = (st) => <g>
    <rect x={-200} y={-120} width={400} height={360} rx={150} {...st} />
    {dedos.map(([dx, dy, w, h, r], i) => <rect key={i} x={dx - w / 2} y={dy} width={w} height={h} rx={w / 2} transform={`rotate(${r} ${dx} ${dy + h})`} {...st} />)}
    <rect x={-80} y={-80} width={64} height={250} rx={32} transform="rotate(-58 -170 90)" {...st} />
    <rect x={-150} y={180} width={300} height={500} rx={60} {...st} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><linearGradient id="manoIps" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".2" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#8a4a2a" stopOpacity=".3" /></linearGradient></defs>
    {formas({ fill: KC.ink, stroke: KC.ink, strokeWidth: 20 })}
    {formas({ fill: PIEL })}
    {formas({ fill: 'url(#manoIps)' })}{/* belleza: volumen de la mano (luz arriba-izquierda, sombra abajo-derecha) */}
    {dedos.map(([dx, dy, w, h, r], i) => <g key={i} transform={`rotate(${r} ${dx} ${dy + h})`}>
      <path d={`M ${dx - 16} ${dy + 70} q 16 -8 32 0`} stroke={PIEL_OSC} strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={dx - 18} y={dy + 10} width={36} height={34} rx={14} fill="#f7cdb4" stroke={PIEL_OSC} strokeWidth={4} />
    </g>)}
    {[[-90, 20], [10, 40], [100, 10], [-40, 110], [60, 130]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill={PIEL_OSC} opacity={0.7} />)}
  </g>;
}

// Fibroblasto (huso con prolongaciones) que se redondea hacia célula iPS (redondo 0..1).
function Fibro({ x, y, s = 1, rot = 0, red = 0, T = 0, seed = 1, color = '#ff9fb5', brilla = 0 }) {
  const L = klerp(150, 13, red), W = klerp(22, 12, red), mv = Math.sin(T * 1.3 + seed) * 6 * (1 - red);
  const d = `M ${-L} ${mv} C ${-L * 0.55} ${-W * 1.2}, ${-L * 0.25} ${-W * 1.6 + mv}, 0 ${-W * 1.5} C ${L * 0.3} ${-W * 1.5}, ${L * 0.6} ${-W * 1.1}, ${L} ${-mv}`
    + ` C ${L * 0.6} ${W * 1.1}, ${L * 0.3} ${W * 1.6}, 0 ${W * 1.5} C ${-L * 0.25} ${W * 1.6 - mv}, ${-L * 0.55} ${W * 1.2}, ${-L} ${mv} Z`;
  const cuerpo = red > 0.85 ? null : d;
  const nx = klerp(26, 9, red), ny = klerp(13, 9, red);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brilla > 0 && <circle r={40} fill={KC.gold2} opacity={0.35 * brilla} />}
    {cuerpo ? <path d={cuerpo} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      : <circle r={13} fill={color} stroke={KC.ink} strokeWidth={3.5} />}
    {red < 0.6 && [-1, 1].map((k) => <path key={k} d={`M ${k * L} ${k * -mv} q ${k * 30} ${-10 + mv} ${k * 55} ${6}`} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" opacity={1 - red / 0.6} />)}
    <ellipse rx={nx} ry={ny} fill="#7a3fb0" stroke={KC.ink} strokeWidth={3} />
    <circle cx={nx * 0.25} cy={-ny * 0.2} r={3} fill="#2a0f46" />
  </g>;
}

// Colonia de células iPS: compacta, con borde nítido y células chiquitas muy juntas (mucho núcleo, poco citoplasma).
function Colonia({ x, y, n = 60, p = 1, T = 0, R = 150, brilla = 0 }) {
  const cells = [];
  for (let i = 0; i < n; i++) { const a = i * 2.39996, d = Math.sqrt((i + 0.5) / n) * R; if (i / n > p) break;
    cells.push([Math.cos(a) * d, Math.sin(a) * d * 0.8]); }
  return <g transform={`translate(${x} ${y})`}>
    {brilla > 0 && <ellipse rx={R * 1.3} ry={R * 1.1} fill={KC.gold2} opacity={0.18 * brilla * (0.8 + 0.2 * Math.sin(T * 4))} />}
    {p > 0.25 && <ellipse rx={R * Math.sqrt(p) + 18} ry={(R * Math.sqrt(p) + 18) * 0.82} fill="rgba(255,225,26,.12)" stroke={KC.gold2} strokeWidth={5} />}
    {cells.map(([cx, cy], i) => <g key={i} transform={`translate(${cx + Math.sin(T * 2 + i) * 1.5} ${cy})`}>
      <circle r={12} fill="#ffc2d0" stroke={KC.ink} strokeWidth={2.5} /><circle r={8} fill="#7a3fb0" /></g>)}
  </g>;
}

function Neurona({ x, y, s = 1, T = 0, p = 1 }) {
  const ramas = [[-70, -90], [-100, -10], [-60, 70], [40, -100], [10, 90]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([dx, dy], i) => <g key={i} opacity={p}>
      <path d={`M 0 0 Q ${dx * 0.5} ${dy * 0.6} ${dx} ${dy}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M 0 0 Q ${dx * 0.5} ${dy * 0.6} ${dx} ${dy}`} stroke="#ffe11a" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M ${dx} ${dy} l ${dx * 0.3 - 10} ${-12} M ${dx} ${dy} l ${dx * 0.2 + 8} ${dy * 0.3 + 10}`} stroke="#ffe11a" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>)}
    <path d={`M 20 10 C 80 20, 120 ${40 + Math.sin(T * 2) * 8}, ${170 * p} 60`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" />
    <path d={`M 20 10 C 80 20, 120 ${40 + Math.sin(T * 2) * 8}, ${170 * p} 60`} stroke="#ffe11a" strokeWidth={6} fill="none" strokeLinecap="round" />
    <circle r={34} fill="#ffe11a" stroke={KC.ink} strokeWidth={6} /><circle r={14} fill="#7a3fb0" />
  </g>;
}
// Epitelio pigmentario de la retina: hexágonos con gránulos de pigmento oscuro arriba.
function Retina({ x, y, s = 1 }) {
  const hex = (cx) => [0, 1, 2, 3, 4, 5].map((i) => { const a = i * Math.PI / 3; return `${cx + 42 * Math.cos(a)},${42 * Math.sin(a)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-64, 0, 64].map((cx, i) => <g key={i} transform={`translate(0 ${i === 1 ? 37 : 0})`}>
      <polygon points={hex(cx)} fill="#c98a5a" stroke={KC.ink} strokeWidth={5} />
      {[[-14, -18], [4, -24], [18, -12], [-4, -8]].map(([a, b], j) => <circle key={j} cx={cx + a} cy={b} r={6} fill="#3a2414" />)}
      <circle cx={cx} cy={14} r={11} fill="#7a3fb0" />
    </g>)}
  </g>;
}
// Célula de músculo del corazón: rectangular, rayada (sarcómeros), con una rama; late.
function Cardio({ x, y, s = 1, T = 0 }) {
  const lat = 1 + 0.07 * Math.max(0, Math.sin(T * 7));
  return <g transform={`translate(${x} ${y}) scale(${s * lat} ${s})`}>
    <path d="M -110 -34 L 60 -34 L 100 -70 L 124 -50 L 92 -20 L 110 34 L -110 34 Z" fill="#ff5a6e" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-95 + i * 19} y1={-30} x2={-95 + i * 19} y2={30} stroke="#a3142a" strokeWidth={4} />)}
    <ellipse cx={-10} cy={0} rx={18} ry={11} fill="#7a3fb0" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Burbuja({ x, y, r = 110, fondo = '#fff', children, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={fondo} stroke={KC.ink} strokeWidth={8} />{children}</g>;
}
function Raton({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 110 20 C 200 40, 240 ${-20 + Math.sin(T * 3) * 15}, 300 ${10 + Math.sin(T * 3) * 20}`} stroke="#e7a0a8" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={130} ry={80} fill="#e9e3dc" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-120} cy={-30} rx={70} ry={55} fill="#e9e3dc" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-110} cy={-90} r={36} fill="#f3b8c2" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-150} cy={-36} r={8} fill={KC.ink} /><circle cx={-190} cy={-20} r={10} fill="#e7728a" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Gen como trocito de ADN de color con su nombre.
function GenPieza({ T, x, y, nombre, color, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ADNHebra T={T} x={-70} y={0} largo={140} alto={46} vueltas={1.2} colores={[color]} grosor={6} />
    <rect x={-70} y={34} width={140} height={46} rx={14} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={68} textAnchor="middle" style={{ font:`700 30px ${KF.mono}`, fontStyle:'italic' }} fill={KC.ink}>{nombre}</text>
  </g>;
}
function Foco({ x, y, on = 0, color = KC.gold2 }) {
  return <g transform={`translate(${x} ${y})`}>
    {on > 0 && <circle r={34} fill={color} opacity={0.35 * on} />}
    <circle r={18} fill={mixHex('#3a3f4a', color, on)} stroke={KC.ink} strokeWidth={4} />
    <rect x={-8} y={16} width={16} height={12} rx={3} fill="#9aa3b5" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Ojo en corte (de perfil): córnea a la izquierda, cristalino, retina al fondo con su capa pigmentada.
function Ojo({ x, y, r = 250, lamina = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fbf7f0" stroke={KC.ink} strokeWidth={10} />
    <path d={`M ${-r * 0.88} ${-r * 0.47} A ${r * 0.62} ${r * 0.62} 0 0 0 ${-r * 0.88} ${r * 0.47}`} fill="#bfe8ff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-r * 0.62} cy={0} rx={r * 0.12} ry={r * 0.3} fill="#e8f6ff" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-r * 0.2} ${-r * 0.92} A ${r * 0.94} ${r * 0.94} 0 0 1 ${-r * 0.2} ${r * 0.92}`} fill="none" stroke="#ff7a8a" strokeWidth={26} />
    <path d={`M ${-r * 0.18} ${-r * 0.96} A ${r} ${r} 0 0 1 ${-r * 0.18} ${r * 0.96}`} fill="none" stroke="#5a3216" strokeWidth={9} />
    <circle cx={r * 0.92} cy={0} r={16 + Math.sin(T * 5) * 3} fill="none" stroke={KC.gold} strokeWidth={6} opacity={lamina > 0 ? 1 : 0} />
    {lamina > 0 && <g><rect x={klerp(r * 1.5, r * 0.8, lamina) - 6} y={-50} width={42} height={100} rx={10} fill={KC.gold2} opacity={0.4} />
      <rect x={klerp(r * 1.5, r * 0.8, lamina)} y={-44} width={30} height={88} rx={8} fill="#c98a5a" stroke={KC.ink} strokeWidth={5} /></g>}
    <path d={`M ${r * 0.92} ${r * 0.3} C ${r * 1.1} ${r * 0.6}, ${r * 1.0} ${r * 0.9}, ${r * 1.15} ${r * 1.2}`} stroke="#e8c9a0" strokeWidth={30} fill="none" />
  </g>;
}
function Cerebro({ x, y, s = 1, T = 0, pulso = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 40 C -260 -90, -150 -200, -20 -190 C 120 -210, 250 -120, 240 10 C 260 100, 170 170, 60 150 C 20 200, -60 200, -90 150 C -190 160, -240 110, -230 40 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={10} />
    {[[-150, -60, 60], [-40, -120, -20], [80, -100, 30], [150, -10, 80], [-100, 60, -30], [40, 60, 10]].map(([a, b, r], i) =>
      <path key={i} d={`M ${a - 40} ${b} q 20 -30 40 0 q 20 30 40 0`} stroke="#d9668a" strokeWidth={7} fill="none" transform={`rotate(${r} ${a} ${b})`} />)}
    <ellipse cx={-10} cy={20} rx={46} ry={32} fill={mixHex('#9b5de5', KC.gold2, pulso)} stroke={KC.ink} strokeWidth={6} />
    {pulso > 0 && Array.from({ length: 10 }, (_, i) => { const a = i * 0.63 + T, d = 50 + ((T * 40 + i * 13) % 60);
      return <circle key={i} cx={-10 + Math.cos(a) * d} cy={20 + Math.sin(a) * d * 0.7} r={7} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} opacity={pulso} />; })}
  </g>;
}
function Personita({ x, y, s = 1, color = KC.cyan, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={-70} r={26} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 40 L -36 -10 Q -36 -40 0 -40 Q 36 -40 36 -10 L 36 40 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Gotero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-200} width={44} height={70} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <path d="M -16 -132 L 16 -132 L 8 0 L -8 0 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

function Ips() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pi: CUES.Piel, Ge: CUES.Genes, Ol: CUES.Olvida, In: CUES.Interruptores, Hu: CUES.Humana, Pr: CUES.Pregunta,
    De: CUES.Destino, Re: CUES.Retina, Pa: CUES.Parkinson, Pl: CUES.Plato, Ve: CUES.Veinticuatro, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // zoom de cámara que la capa cine le da al gancho (20 %) y al cierre (10 %): el puntero de la lupa sigue al dedo
  const zG = (t) => 1 + 0.2 * kprog(t, K.G - 0.45, K.Pi + 1.35, kEase.suave), zC = (t) => 1 + 0.1 * kprog(t, K.Ci - 0.45, FIN + 0.45, kEase.suave);
  // neurona · retina · corazón en burbujas grandes (radio r), con flechas: flechas[i] = [x1, y1, x2, y2, curva]
  const trio = (t0, pts, flechas, r = 110) => {
    const k = r / 110;
    return <g>{pts.map(([a, b], i) => { const p = kprog(T, t0 + i * 0.45, t0 + i * 0.45 + 0.6, kEase.sale), [x1, y1, x2, y2, cv] = flechas[i]; return <g key={i}>
      <FlechaCurva x1={x1} y1={y1} x2={x2} y2={y2} p={p} curva={cv} color={KC.gold2} T={T} />
      <g opacity={p} transform={`translate(${a} ${b}) scale(${klerp(0.4, 1, p)}) translate(${-a} ${-b})`}>
        <Burbuja x={a} y={b} r={r} fondo="#101a33">{i === 0 ? <Neurona x={a - 20 * k} y={b} s={0.62 * k} T={T} /> : i === 1 ? <Retina x={a} y={b - 14 * k} s={0.95 * k} /> : <Cardio x={a - 6 * k} y={b + 6 * k} s={0.72 * k} T={T} />}</Burbuja>
      </g></g>; })}</g>;
  };
  const tachaEn = (i) => (['Oct4', 'Sox2', 'Klf4', 'c-Myc'].includes(GENES24[i]) ? Infinity : (DIEZ.includes(GENES24[i]) ? K.Ve + 2.6 + (DIEZ.indexOf(GENES24[i]) * 0.12) : K.Ve + 0.9 + (i % 14) * 0.08));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mano, la Lupa y las tres células posibles */}
      <Escena T={T} a={K.G} b={K.Pi} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {/* pase a mano: la mano llena el cuadro de lado a lado (2.3×), la lupa crece y las tres células salen de la lupa */}
        <Capa><Mano x={540} y={1700} s={2.3} rot={-6} /></Capa>
      </Escena>
      {/* el trío va fuera de la escena para que la cámara (20 % en el gancho) no lo saque del cuadro ni lo despegue de la lupa */}
      {T < K.Pi + 0.4 && <div style={{ position:'absolute', inset:0, zIndex:33, opacity:1 - kprog(T, K.Pi - 0.2, K.Pi + 0.3) }}><Capa>
        {trio(K.G + 1.4, [[845, 330], [900, 610], [845, 890]], [[572, 462, 708, 356, -40], [592, 560, 762, 604, 0], [566, 662, 708, 858, 40]], 122)}</Capa></div>}
      <Lupa T={T} at={K.G} until={K.Pi - 0.2} x={320} y={540} r={265} fx={(t) => 540 - 162 * zG(t)} fy={(t) => 864 + 506 * zG(t)} etiqueta="AL MICROSCOPIO · piel" tinte={KC.pink}
        interior={(t) => <svg width={530} height={530} viewBox="0 0 440 440"><rect width={440} height={440} fill="#14081a" />
          <Fibro x={220} y={220} s={1.2} rot={-14} T={t} seed={2} />
          <Fibro x={120} y={360} s={0.7} rot={20} T={t} seed={5} color="#f78ca8" /><Fibro x={350} y={90} s={0.6} rot={-30} T={t} seed={7} color="#f78ca8" /></svg>} />

      {/* 1 · mismo ADN, cada célula usa su parte */}
      <Escena T={T} a={K.Pi} b={K.Ge}>
        <FondoLunares color={KC.yellow} />
        <Capa>{[['piel', 0.05, 0.3, '#ff9fb5'], ['neurona', 0.38, 0.62, '#ffe11a'], ['corazón', 0.7, 0.95, '#ff5a6e']].map(([n, a, b, c], i) => {
          // pase a mano: las tres hebras ocupan el alto del cuadro (antes 560 px en la mitad de arriba)
          const y = 590 + i * 310, e = kprog(T, K.Pi + 0.2 + i * 0.35, K.Pi + 0.7 + i * 0.35, kEase.sale);
          return <g key={i} opacity={e} transform={`translate(${(1 - e) * -200} 0)`}>
            <rect x={72} y={y - 125} width={936} height={250} rx={40} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={6} />
            <circle cx={180} cy={y - 24} r={66} fill={c} stroke={KC.ink} strokeWidth={7} /><circle cx={180} cy={y - 24} r={25} fill="#7a3fb0" />
            <ADNHebra T={T} x={286} y={y} largo={690} alto={112} vueltas={5} colores={['#5b6070']} grosor={9} resalta={(u) => u >= a && u <= b && T > K.Pi + 1.6 + i * 0.3} />
            <text x={180} y={y + 92} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.texto}>{n}</text>
          </g>; })}</Capa>
      </Escena>

      {/* 2 · 2006: el ratón, la caja de cultivo y los 4 genes */}
      <Escena T={T} a={K.Ge} b={K.Ol} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          {/* pase a mano: caja de cultivo 1.6× (r 250→400) al centro, ratón 1.4× arriba, genes 1.25× que caen dentro de la caja */}
          <g opacity={1 - kprog(T, K.Ge + 2.0, K.Ge + 2.5)}><Raton x={590} y={470} s={1.25} T={T} /></g>
          <PlacaPetri x={540} y={1010} r={400} agar="#ffd5df" id="pg">
            {[[-120, -60, 20], [60, -110, -30], [-40, 60, 60], [120, 40, 10], [-150, 90, -40], [30, 150, 25], [150, -40, 70]].map(([a, b, r], i) => <Fibro key={i} x={a * 1.6} y={b * 1.6} s={0.88} rot={r} T={T} seed={i} />)}
          </PlacaPetri>
          {GEN.map(([n, c], i) => { const t0 = K.Ge + 2.2 + i * 0.55, p = kprog(T, t0, t0 + 0.6, kEase.sale), hund = kprog(T, K.Ge + 5.0, K.Ol, kEase.entra);
            const x0 = 150 + i * 260; return p > 0 ? <g key={i} opacity={1 - hund * 0.8}><GenPieza T={T} x={klerp(x0, klerp(x0, 540, 0.6), hund)} y={klerp(-100, 500, p) + hund * 450} nombre={n} color={c} s={1.25 * (1 - hund * 0.5)} /></g> : null; })}
        </Capa>
        <NumeroGigante T={T} at={K.Ge + 2.2} until={K.Ol - 0.3} valor={4} dur={2.2} sufijo=" genes" x={540} y={300} tam={150} color={KC.yellow} />
      </Escena>
      <Chip T={T} at={K.Ge + 0.3} until={K.Ge + 2.1} texto="2006 · Kioto · Yamanaka" x={540} y={250} tam={38} borde={KC.mint} />
      <Etq T={T} at={K.Ge + 0.8} until={K.Ol - 0.2} x={1040} y={1470} lado="izq" texto="fibroblastos (embrión y cola de ratón)" tam={30} color={KC.ink} />

      {/* 3–4 · se olvida de ser piel → colonia; por dentro: los interruptores */}
      <Escena T={T} a={K.Ol} b={K.Hu}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(255,225,26,.25)" />
        {/* pase a mano: todo el grupo al doble (la barra de escala lleva z = 2: «50 µm» mide lo mismo que antes «100 µm»).
            Las células ya redondas no se amontonan en un punto: se reparten en lugares de la colonia, y la colonia
            empieza a llenarse 0.9 s antes entre ellas para que el cuadro no se quede casi vacío (lo marcaba el auditor). */}
        <Capa><g transform="translate(540 880) scale(2)">
          {T >= K.Ol + 1.4 && <Colonia x={0} y={0} n={70} p={kprog(T, K.Ol + 1.4, K.Ol + 3.4, kEase.sale)} T={T} R={190} brilla={kprog(T, K.Ol + 3.0, K.Ol + 3.8)} />}
          {T < K.Ol + 3.5 && <g opacity={1 - kprog(T, K.Ol + 3.1, K.Ol + 3.5)}>{[[-160, -120, 20], [140, -150, -30], [-60, 40, 60], [170, 60, 10], [-190, 170, -40], [40, 200, 25]].map(([a, b, r], i) => {
            const red = kprog(T, K.Ol + 0.3 + i * 0.1, K.Ol + 1.8 + i * 0.1, kEase.suave), m = kprog(T, K.Ol + 1.2, K.Ol + 2.4, kEase.suave);
            const j = [4, 17, 29, 41, 54, 66][i], ang = j * 2.39996, dist = Math.sqrt((j + 0.5) / 70) * 190, tx = Math.cos(ang) * dist, ty = Math.sin(ang) * dist * 0.8;
            return <Fibro key={i} x={klerp(a, tx, m)} y={klerp(b, ty, m)} s={1} rot={r * (1 - red)} red={red} T={T} seed={i} />; })}</g>}
        </g></Capa>
        {T < K.In && <Escala T={T} z={2} pxPorMm={PX_MM} />}
      </Escena>
      <MitoTachado T={T} at={K.Ol + 0.3} tacharEn={K.Ol + 1.6} until={K.Ol + 2.2} texto="piel" x={540} y={330} tam={52} />
      <Chip T={T} at={K.Ol + 2.4} until={K.In - 0.2} texto="como de embrión" y={400} tam={44} borde={KC.gold2} />
      <Lupa T={T} at={K.In} until={K.Hu - 0.25} x={540} y={930} r={390} fx={540} fy={880} etiqueta="POR DENTRO · el núcleo" tinte={KC.gold2}
        interior={(t) => <svg width={780} height={780} viewBox="0 0 600 600"><rect width={600} height={600} fill="#1a0b26" />
          <ADNHebra T={t} x={40} y={330} largo={520} alto={80} vueltas={4} colores={['#6b5a86']} grosor={7} />
          {[90, 190, 300, 410, 510].map((fx, i) => { const piel = i === 1 || i === 3, on = piel ? 1 - kprog(t, K.In + 1.6, K.In + 2.4) : kprog(t, K.In + 0.9 + i * 0.3, K.In + 1.3 + i * 0.3);
            return <g key={i}><Foco x={fx} y={220} on={on} color={piel ? '#ff9fb5' : KC.gold2} />
              <text x={fx} y={170} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={piel ? '#ff9fb5' : KC.gold2}>{piel ? 'piel' : 'embrión'}</text></g>; })}
          {GEN.map(([n, c], i) => { const fx = [90, 300, 510, 300][i], p = kprog(t, K.In + 0.4 + i * 0.3, K.In + 1.1 + i * 0.3, kEase.sale);
            return <g key={i} transform={`translate(${klerp(fx + (i % 2 ? 200 : -200), fx, p) + (i === 3 ? 40 : 0)} ${klerp(560, 380 + (i === 3 ? 50 : 0), p)})`}>
              <path d="M -34 0 C -34 -30, 34 -30, 34 0 L 20 26 L -20 26 Z" fill={c} stroke={KC.ink} strokeWidth={4} />
              <text y={60} textAnchor="middle" style={{ font:`700 20px ${KF.mono}`, fontStyle:'italic' }} fill="#fff">{n}</text></g>; })}
        </svg>} />

      {/* 5 · se llaman iPS; 2007, piel humana */}
      {/* pase a mano: mano 2× y caja de cultivo 1.8× (r 150→270) llenando la mitad de abajo; «iPS» arriba y los chips sin encimarse.
          La escena termina 0.1 s antes de la «Pregunta» para que no se quede de fondo bajo la colonia grande (se encimaban). */}
      <Escena T={T} a={K.Hu} b={K.Pr - 0.1} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <text x={540} y={610} textAnchor="middle" style={{ font:`400 340px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12}
            transform={`translate(540 500) scale(${klerp(0.6, 1, kprog(T, K.Hu, K.Hu + 0.5, kEase.rebote))}) translate(-540 -500)`}>iPS</text>
          <Mano x={250} y={1270} s={0.8} rot={14} />
          <g opacity={kprog(T, K.Hu + 1.4, K.Hu + 1.9)}><PlacaPetri x={750} y={1130} r={270} agar="#ffd5df" id="ph"><g transform="scale(1.75)"><Colonia x={0} y={0} n={34} p={1} T={T} R={70} /></g></PlacaPetri>
            <FlechaCurva x1={330} y1={930} x2={540} y2={930} p={kprog(T, K.Hu + 1.0, K.Hu + 1.6)} curva={-70} color={KC.ink} T={T} /></g>
        </Capa>
      </Escena>
      <Chip T={T} at={K.Hu + 0.4} until={K.Pr - 0.2} texto="células madre pluripotentes inducidas" y={720} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Hu + 1.4} until={K.Pr - 0.2} texto="2007 · piel humana adulta" y={250} tam={40} borde={KC.pink} />

      {/* 6–7 · ¿para qué? → de ahí, a lo que haga falta */}
      <Escena T={T} a={K.Pr} b={K.Re} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(255,225,26,.25)" />
        <Capa>
          {/* pase a mano: colonia al doble y al centro (barra con z = 2); en «Destino» sube deslizándose (ya no salta) y las
              tres burbujas (r 110→150) llenan la mitad de abajo */}
          {(() => { const m = kprog(T, K.De, K.De + 0.5, kEase.suave);
            return <g transform={`translate(540 ${klerp(1020, 620, m)}) scale(${klerp(2, 1.4, m)})`}><Colonia x={0} y={0} n={70} p={1} T={T} R={150} brilla={1} /></g>; })()}
          {T < K.De + 0.3 && <text x={540} y={700} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} opacity={0.9 * (1 - kprog(T, K.De, K.De + 0.3))} transform={`rotate(${Math.sin(T * 3) * 6} 540 560)`}>?</text>}
          {/* belleza: colonia y burbujas bajan 120 px (la colonia quedaba pegada al logo) */}
          {T >= K.De && trio(K.De + 0.1, [[212, 1250], [540, 1360], [868, 1250]], [[430, 760, 212, 1092, 70], [540, 840, 540, 1202, 0], [650, 760, 868, 1092, -70]], 140)}
        </Capa>
        {T < K.De && <Escala T={T} z={2} pxPorMm={PX_MM} />}
      </Escena>

      {/* 8 · 2014, Kobe: retina de su propia piel */}
      <Escena T={T} a={K.Re} b={K.Pa} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          {/* pase a mano: ojo 1.5× (r 220→330) al centro; la mano (1.7×) baja desde arriba a la derecha; tarjeta y chip arriba, sin tapar el ojo */}
          <Ojo x={480} y={980} r={330} lamina={kprog(T, K.Re + 2.6, K.Re + 4.2, kEase.suave)} T={T} />
          <g opacity={kprog(T, K.Re + 2.4, K.Re + 2.9)}><Mano x={900} y={470} s={0.44} rot={168} />
            <FlechaCurva x1={905} y1={640} x2={860} y2={900} p={kprog(T, K.Re + 2.6, K.Re + 3.4)} curva={-50} color={KC.ink} T={T} /></g>
        </Capa>
      </Escena>
      <TarjetaEstudio T={T} at={K.Re + 0.2} until={K.Re + 2.6} anio="2014" quien="Kobe, Japón · RIKEN" revista="células de su propia piel → retina" x={400} y={370} />
      <Chip T={T} at={K.Re + 3.0} until={K.Pa - 0.2} texto="lámina de 1.3 × 3 mm" x={380} y={470} tam={36} borde={KC.gold} />

      {/* 9 · Kioto: párkinson */}
      <Escena T={T} a={K.Pa} b={K.Pl} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Capa>
          {/* pase a mano: cerebro 1.4× (s 1.2→1.7) a lo ancho del cuadro; los siete pacientes más grandes debajo; tarjeta y chips arriba */}
          <Cerebro x={540} y={900} s={1.7} T={T} pulso={kprog(T, K.Pa + 3.2, K.Pa + 4.2)} />
          {Array.from({ length: 7 }, (_, i) => <Personita key={i} x={120 + i * 140} y={1420} s={0.9} color={[KC.cyan, KC.pink, KC.yellow, KC.mint, KC.lilac, KC.cyan, KC.pink][i]} o={kprog(T, K.Pa + 0.4 + i * 0.15, K.Pa + 0.7 + i * 0.15)} />)}
        </Capa>
      </Escena>
      <TarjetaEstudio T={T} at={K.Pa + 0.2} until={K.Pa + 3.0} anio="2018–2025" quien="Universidad de Kioto" revista="Nature 2025 · 7 pacientes" x={540} y={330} />
      <Chip T={T} at={K.Pa + 3.3} until={K.Pl - 0.2} texto="✓ hicieron dopamina" x={320} y={380} tam={36} borde={KC.gold2} />
      <Chip T={T} at={K.Pa + 4.4} until={K.Pl - 0.2} texto="✓ sin tumores" x={790} y={380} tam={36} borde={KC.mint} />

      {/* 10 · enfermedades en un plato */}
      <Escena T={T} a={K.Pl} b={K.Ve} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          {/* pase a mano: plato 1.5× (r 270→400) y gotero 1.5×; el chip sube y ya no toca el gotero */}
          <PlacaPetri x={540} y={1030} r={400} agar="#ffe9a8" id="pl">
            {[[-120, -80], [90, -110], [-30, 50], [140, 80], [-150, 120]].map(([a, b], i) => <Neurona key={i} x={a * 1.5} y={b * 1.5} s={0.85} T={T + i} />)}
          </PlacaPetri>
          <Gotero x={780} y={klerp(420, 660, kprog(T, K.Pl, K.Pl + 0.6, kEase.sale))} s={1.5} />
          <Goteo T={T} x={780} y0={675} y1={1000} cada={0.45} color="#7fc8ff" desde={K.Pl + 0.7} hasta={K.Ve} r={16} />
        </Capa>
      </Escena>
      <Chip T={T} at={K.Pl + 0.6} until={K.Ve - 0.2} texto="ej.: ELA · ropinirol · Keio 2023" x={390} y={300} tam={34} borde={KC.gold} />

      {/* 11 · 24 → 10 → 4 */}
      <Escena T={T} a={K.Ve} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {/* pase a mano: la tabla de 24 genes 1.3× y centrada (antes cargada a la izquierda y arriba); letra oscura sobre ficha clara */}
        {/* belleza: la célula de piel (la que recibe los genes) queda a media luz detrás de la tabla: ya no es una lista sola */}
        <Capa><g opacity={0.32}><Fibro x={540} y={900} s={4.2} rot={-18} T={T} seed={3} /></g></Capa>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 47%, rgba(10,14,26,.1), rgba(10,14,26,.5))' }}></div>
        <Capa>{GENES24.map((g, i) => { const c = i % 4, r = Math.floor(i / 4), x = 540 + (c - 1.5) * 236, y = 560 + r * 128, t = tachaEn(i), raya = kprog(T, t, t + 0.25), clave = !isFinite(t);
          const col = clave ? GEN.find((q) => q[0] === g)[1] : '#f6f3ec';
          return <g key={i} opacity={1 - raya * 0.6} transform={`translate(${x} ${y}) scale(${1.3 * (clave ? 1 + 0.12 * kprog(T, K.Ve + 3.6, K.Ve + 4.0) : 1)})`}>
            <rect x={-82} y={-36} width={164} height={72} rx={16} fill={T > K.Ve + 3.4 && clave ? col : '#f6f3ec'} stroke={KC.ink} strokeWidth={5} />
            <text y={11} textAnchor="middle" style={{ font:`700 28px ${KF.mono}`, fontStyle:'italic', stroke:'none' }} fill="#0b1020">{g}</text>
            {raya > 0 && <line x1={-90} y1={0} x2={-90 + 180 * raya} y2={-4} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />}
          </g>; })}</Capa>
      </Escena>
      {T < K.Ci - 0.1 && <Contador T={T} at={K.Ve + 0.4} desde={24} hasta={4} dur={3.0} sufijo=" genes" x={540} y={370} tam={96} color={KC.ink} />}
      <Chip T={T} at={K.Ve + 3.0} until={K.Ci - 0.2} texto="Nobel 2012 · Yamanaka y John Gurdon" y={1400} tam={34} borde={KC.gold} />

      {/* 12 · cierre: la mano del inicio, a cuatro genes de distancia */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {/* pase a mano: la misma mano grande del gancho, con la lupa al centro (r 230→290) */}
        <Capa><Mano x={540} y={1700} s={2.3} rot={-6} /></Capa>
      </Escena>
      <Lupa T={T} at={K.Ci + 0.2} until={K.Ou + 0.2} x={540} y={510} r={290} fx={(t) => 540 - 162 * zC(t)} fy={(t) => 864 + 506 * zC(t)} etiqueta="AL MICROSCOPIO · piel" tinte={KC.gold2}
        interior={(t) => <svg width={580} height={580} viewBox="0 0 460 460"><rect width={460} height={460} fill="#14081a" />
          <Fibro x={230} y={230} s={1.2} rot={-14} T={t} seed={2} brilla={kprog(t, K.Ci + 1.5, K.Ci + 2.5)} />
          {GEN.map(([n, c], i) => { const a = t * 1.4 + i * Math.PI / 2, p = kprog(t, K.Ci + 1.0 + i * 0.3, K.Ci + 1.4 + i * 0.3);
            return <circle key={i} cx={230 + Math.cos(a) * 160} cy={230 + Math.sin(a) * 120} r={22 * p} fill={c} stroke={KC.ink} strokeWidth={4} />; })}</svg>} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="a 4 genes de distancia" x={540} y={950} tam={44} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pi - 0.1} texto="No es solo piel: *puede ser neurona.*" />
      <Subtitulo T={T} idx={1} at={K.Pi + 0.1} until={K.Ge - 0.1} texto="Mismo ADN, *cada una usa su parte.*" />
      <Subtitulo T={T} idx={2} at={K.Ge + 0.1} until={K.Ol - 0.1} texto="2006: solo *cuatro genes.*" />
      <Subtitulo T={T} idx={3} at={K.Ol + 0.1} until={K.In - 0.1} texto="Olvidó que era piel: *como de embrión.*" />
      <Subtitulo T={T} idx={4} at={K.In + 0.1} until={K.Hu - 0.1} texto="Prenden el *programa de embrión.*" />
      <Subtitulo T={T} idx={5} at={K.Hu + 0.1} until={K.Pr - 0.1} texto="iPS, y en 2007: *piel humana.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.De - 0.1} texto="¿Para qué *regresarla al inicio?*" />
      <Subtitulo T={T} idx={7} at={K.De + 0.1} until={K.Re - 0.1} texto="La vuelves *lo que necesites.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Pa - 0.1} texto="Retina hecha *de su propia piel.*" />
      <Subtitulo T={T} idx={9} at={K.Pa + 0.1} until={K.Pl - 0.1} texto="Párkinson: *hicieron dopamina.*" />
      <Subtitulo T={T} idx={10} at={K.Pl + 0.1} until={K.Ve - 0.1} texto="Enfermedades *en un plato.*" />
      <Subtitulo T={T} idx={11} at={K.Ve + 0.1} until={K.Ci - 0.1} texto="De 24 genes *a solo cuatro.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una célula madre *a cuatro genes.*" />

      <Robert T={T} apariciones={ROBERT_IPS(CUES)} />
      <MarcaAgua T={T} tema="bioquimica" num="48" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// 24 genes candidatos (Cell 2006). Solo se nombran los 4 finales; los demás van como "gen N" (el dibujo es esquemático).
const CLAVE4 = { 13: 'Oct4', 14: 'Sox2', 19: 'Klf4', 21: 'c-Myc' };
const GENES24 = Array.from({ length: 24 }, (_, i) => CLAVE4[i] || 'gen ' + (i + 1));
const DIEZ = [0, 5, 8, 15, 4, 22].map((i) => GENES24[i]);   // otros 6 del grupo de 10 (esquemático)
const ROBERT_IPS = (C) => [
  [C.Gancho - 0.45, C.Gancho + 5.2, 'avatar_11_sorprendido', 'gancho'],
  [C.Piel + 0.6, C.Genes - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
  [C.Genes + 1.4, C.Olvida - 0.5, 'avatar_13_senalando_arriba', 'izq-alto'],
  [C.Interruptores + 0.5, C.Humana - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
  [C.Pregunta + 0.05, C.Destino - 0.05, 'avatar_07_pensativo_puno', 'grande'],
  [C.Retina + 2.8, C.Parkinson - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
  [C.Parkinson + 3.1, C.Plato - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
  [C.Veinticuatro + 0.5, C.Cierre - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
  [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']];

function IpsApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Ips /></CompositionStage></div>;
}
window.IpsApp = IpsApp;
