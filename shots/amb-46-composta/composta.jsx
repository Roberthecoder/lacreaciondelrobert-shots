// Shot Ambiental #46 · Esa cáscara no se vuelve tierra en el basurero: se pudre y se vuelve gas — NARRADO (N1 por dentro).
// Datos: SEMARNAT DBGIR 2026 (40.15 % orgánicos), IPCC AR6 WG1 Tabla 7.15 (GWP-20 CH4 no fósil 79.7), EPA, Meyer-Dombard et al. 2020,
// NMSU Guía H-110, Pérez, Vergara y Silver 2023 (medición de 2018 en Nicasio, California). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (microbios, moléculas, corte del relleno y de la composta).

const CP = { cascara:'#ffd23f', cafe:'#7a4a22', tierra:'#4a3020', tierra2:'#5e3d27', bolsa:'#3a3f4a', verde:'#3fbf4a', metano:'#b6f0ff', arquea:'#c79bff', lombriz:'#ff8fa3', hifa:'#f6f1e3', madera:'#c98a4b' };

// Cáscara de plátano vista desde arriba: 4 tiras que salen del pedúnculo. pudre 0..1 = amarilla → café; deshace 0..1 = se vuelve tierra.
function Cascara({ x, y, s = 1, rot = 0, pudre = 0, deshace = 0, T = 0 }) {
  const col = mixHex(CP.cascara, '#5a3a1c', kclamp(pudre, 0, 1));
  const k = 1 - 0.85 * deshace;
  const tira = (a, l) => <path key={a} d={`M 0 0 C ${-26} ${l * 0.35} ${-24} ${l * 0.8} 0 ${l} C ${24} ${l * 0.8} ${26} ${l * 0.35} 0 0 Z`} transform={`rotate(${a})`}
    fill={col} stroke={KC.ink} strokeWidth={6} />;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={1 - deshace * 0.9}>
    <g transform={`scale(${k})`}>
      {[[-150, 120], [-30, 130], [40, 115], [150, 125]].map(([a, l]) => tira(a + Math.sin(T * 2 + a) * 2, l))}
      {pudre > 0.2 && [[-30, 60], [40, 55], [150, 70]].map(([a, d], i) => <circle key={i} cx={Math.sin(-a * Math.PI / 180) * d} cy={Math.cos(a * Math.PI / 180) * d} r={9} fill="#3b2412" opacity={kclamp(pudre * 1.5 - 0.3, 0, 0.8)} />)}
      <rect x={-12} y={-46} width={24} height={50} rx={8} fill="#8a6a2a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-14} y={-56} width={28} height={14} rx={5} fill="#3b2a12" />
    </g>
  </g>;
}
// Bote de basura de cocina con pedal. tapa 0..1 = abierta.
function Bote({ x, y, s = 1, tapa = 0, color = '#5aa9e6' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -300 L 150 -300 L 125 0 L -125 0 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-70, 0, 70].map((d) => <line key={d} x1={d} y1={-260} x2={d * 0.85} y2={-40} stroke="rgba(0,0,0,.18)" strokeWidth={10} strokeLinecap="round" />)}
    <rect x={-60} y={-6} width={120} height={22} rx={8} fill="#2b2f3a" stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(-160 -300) rotate(${-tapa * 70})`}>
      <path d="M 0 0 L 320 0 Q 310 -50 160 -56 Q 10 -50 0 0 Z" fill={mixHex(color, '#ffffff', 0.25)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>
  </g>;
}
// Bolsa de basura de 1 kg (atada arriba).
function Bolsa({ x, y, s = 1, color = CP.bolsa, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -60 0 Q -78 -70 -40 -110 L -16 -128 L 16 -128 L 40 -110 Q 78 -70 60 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -16 -128 L -28 -150 M 16 -128 L 28 -150" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <path d="M -36 -80 q 10 30 -4 60" stroke="rgba(255,255,255,.3)" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Molécula de metano: carbono gris al centro y 4 hidrógenos blancos.
function Metano({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b], i) => <line key={i} x1={0} y1={0} x2={a * 34} y2={b * 34} stroke={KC.ink} strokeWidth={6} />)}
    {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b], i) => <circle key={'h' + i} cx={a * 34} cy={b * 34} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />)}
    <circle r={24} fill="#6b7280" stroke={KC.ink} strokeWidth={5} />
    <text y={9} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill="#fff">C</text>
  </g>;
}
// Arquea metanógena esquemática: racimo de cocos (como Methanosarcina) o bastón (como Methanobacterium).
function Arquea({ x, y, s = 1, T = 0, seed = 1, forma = 'racimo' }) {
  const w = Math.sin(T * 3 + seed) * 4;
  if (forma === 'baston') return <g transform={`translate(${x} ${y + w}) rotate(${seed * 37 % 180}) scale(${s})`}>
    <rect x={-50} y={-16} width={100} height={32} rx={16} fill={CP.arquea} stroke={KC.ink} strokeWidth={5} /><rect x={-36} y={-9} width={36} height={6} rx={3} fill="#fff" opacity=".4" /></g>;
  return <g transform={`translate(${x} ${y + w}) scale(${s})`}>
    {[[-18, -16], [18, -16], [-18, 18], [18, 18]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={20} fill={CP.arquea} stroke={KC.ink} strokeWidth={5} />)}
    {[[-24, -22], [12, -22]].map(([a, b], i) => <circle key={'b' + i} cx={a} cy={b} r={5} fill="#fff" opacity=".5" />)}
  </g>;
}
// Lombriz que se mueve (segmentos).
function Lombriz({ x, y, s = 1, T = 0, seed = 1, largo = 9 }) {
  const pts = Array.from({ length: largo }, (_, i) => [i * 16, Math.sin(T * 4 + seed + i * 0.7) * 10]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={CP.lombriz} strokeWidth={17} strokeLinecap="round" strokeLinejoin="round" />
    {pts.slice(1, -1).map((p, i) => <line key={i} x1={p[0]} y1={p[1] - 7} x2={p[0]} y2={p[1] + 7} stroke="rgba(0,0,0,.25)" strokeWidth={3} />)}
    <rect x={pts[3][0] - 8} y={pts[3][1] - 10} width={22} height={20} rx={8} fill="#e06a83" />
  </g>;
}
// Hifas de hongo blancas que crecen (p 0..1).
function Hifas({ x, y, s = 1, p = 1, seed = 3 }) {
  const r = krng(seed), ram = Array.from({ length: 7 }, (_, i) => ({ a: -90 + (r() - 0.5) * 160, l: 60 + r() * 80, d: i * 0.1 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ram.map((b, i) => { const q = kclamp((p - b.d) / 0.5, 0, 1); const ex = Math.cos(b.a * Math.PI / 180) * b.l * q, ey = Math.sin(b.a * Math.PI / 180) * b.l * q;
      return <g key={i}><path d={`M 0 0 Q ${ex * 0.5 + 10} ${ey * 0.5} ${ex} ${ey}`} stroke={CP.hifa} strokeWidth={5} fill="none" strokeLinecap="round" />
        {q > 0.6 && <path d={`M ${ex * 0.6} ${ey * 0.6} l ${20 * q} ${-24 * q}`} stroke={CP.hifa} strokeWidth={4} strokeLinecap="round" />}</g>; })}
  </g>;
}
// Flecha de aire que entra (onda).
function Aire({ x, y, s = 1, T = 0, rot = 0, o = 1 }) {
  const d = (T * 60) % 40;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -80 0 q 20 -18 40 0 t 40 0 t 40 0" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="30 10" strokeDashoffset={-d} />
    <path d="M 30 -16 L 50 0 L 30 16" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Termómetro vertical. v 0..1.
function Termo({ x, y, v = 0, alto = 420, etiqueta }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-alto} width={60} height={alto} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={20} r={48} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={-15} y={-alto * 0.92 * v} width={30} height={alto * 0.92 * v + 20} fill={KC.red} />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={30} y1={-alto * 0.92 * q} x2={50} y2={-alto * 0.92 * q} stroke={KC.ink} strokeWidth={5} />)}
    {etiqueta && <text x={70} y={-alto * 0.92 * v + 14} style={{ font:`400 76px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={3}>{etiqueta}</text>}
  </g>;
}
// Pila larga de composta (hilera) con sensores en mástiles.
function Hilera({ x, y, w = 900, T = 0, sensores = 0, vapor = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 Q 60 -170 ${w * 0.25} -190 L ${w * 0.75} -190 Q ${w - 60} -170 ${w} 0 Z`} fill={CP.cafe} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={60 + i * (w - 120) / 13} cy={-60 - (i % 3) * 40} r={10} fill={i % 2 ? '#a4703b' : '#3fbf4a'} opacity=".8" />)}
    {sensores > 0 && [0.62, 0.9].map((q, i) => <g key={i} opacity={sensores}><line x1={w * q} y1={0} x2={w * q} y2={-330} stroke={KC.ink} strokeWidth={8} />
      <rect x={w * q - 26} y={-370} width={52} height={40} rx={8} fill="#e9eef5" stroke={KC.ink} strokeWidth={5} />
      <circle cx={w * q} cy={-350} r={7} fill={Math.sin(T * 6 + i) > 0 ? KC.red : '#7a2a2a'} /></g>)}
    {vapor > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.6 + i / 6) % 1); return <path key={'v' + i} d={`M ${w * 0.2 + i * w * 0.12} ${-200 - u * 160} q 20 -20 0 -40 q -20 -20 0 -40`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={vapor * (1 - u) * 0.8} />; })}
  </g>;
}

function CompostaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Bote, S: CUES.Sinaire, Ba: CUES.Bacterias, A: CUES.Arqueas, Po: CUES.Potencia, P: CUES.Pregunta, Co: CUES.Composta, E: CUES.Estudio, Ca: CUES.Calor, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // 1 · gancho: la cáscara cae al bote, la tapa se abre y se cierra
  const caeG = kprog(T, K.G + 0.05, K.G + 0.8, kEase.suave);
  const tapaG = kprog(T, K.G, K.G + 0.25) * (1 - kprog(T, K.G + 0.95, K.G + 1.3));
  // bolsas: 4 de 10 orgánicas
  const bolsas = Array.from({ length: 10 }, (_, i) => { const e = kprog(T, K.B + 0.2 + i * 0.1, K.B + 0.5 + i * 0.1, kEase.rebote); const org = i < 4 && T > K.B + 1.6 + i * 0.15;
    return <Bolsa key={i} x={150 + (i % 5) * 195} y={1060 + Math.floor(i / 5) * 190 - 190} s={0.85 * e} color={org ? CP.verde : CP.bolsa} o={e} />; });
  // relleno en corte
  const cubre = kprog(T, K.S + 0.1, K.S + 1.2, kEase.suave);
  const relleno = <>
    <rect x={0} y={0} width={KW} height={560} fill="#9be7ff" />
    <rect x={0} y={520} width={KW} height={760} fill={CP.tierra} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 4 }, (_, f) => Array.from({ length: 7 }, (_, i) => <Bolsa key={f + '-' + i} x={70 + i * 160 + (f % 2) * 70} y={760 + f * 130} s={0.75} color={['#3a3f4a', '#4b5563', '#2f6f3a', '#5a4a7a'][(i + f) % 4]} />))}
    <rect x={0} y={520} width={KW} height={110 * cubre} fill={CP.tierra2} />
    <rect x={0} y={510} width={KW} height={22} fill={KC.leaf} opacity={cubre} />
  </>;
  // metano que sube (escena Arqueas)
  const burbujas = (t0, n, y0) => Array.from({ length: n }, (_, i) => { const u = ((T - t0) * 0.35 + i / n) % 1; if (T < t0 + i * 0.12) return null;
    return <Metano key={i} x={180 + (i * 137) % 720 + Math.sin(T * 2 + i) * 20} y={y0 - u * 700} s={0.8} o={Math.min(1, (1 - u) * 3)} />; });
  // balanza (Potencia): 1 kg de metano ≈ 80 kg de CO₂ en 20 años
  const incl = 0;
  // composta en corte (escenas Composta y Calor)
  const pCo = kprog(T, K.Co + 0.3, K.Co + 5, kEase.suave);
  const compostera = (x, y) => <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={620} height={560} fill="#6a4426" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-14} y={i * 140 + 10} width={648} height={110} rx={10} fill={CP.madera} stroke={KC.ink} strokeWidth={6} opacity={0.35} />)}
    <rect x={20} y={30} width={580} height={510} fill="#5b3a20" />
    {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={50 + (i * 97) % 540} cy={80 + (i * 61) % 440} r={14 + (i % 3) * 5} fill={i % 3 === 0 ? '#3fbf4a' : (i % 3 === 1 ? '#c9a256' : '#8a5a2b')} stroke={KC.ink} strokeWidth={3} opacity={0.9 - pCo * 0.5} />)}
    <Hifas x={150} y={430} p={pCo} seed={4} /><Hifas x={430} y={480} p={pCo} seed={7} s={0.9} />
    <Lombriz x={80} y={300} T={T} seed={1} /><Lombriz x={360} y={200} T={T} seed={3} s={0.9} />
    <Bacteria x={470} y={360} s={0.45} T={T} seed={2} color={KC.mint} /><Bacteria x={240} y={140} s={0.45} T={T} seed={5} rot={30} color={KC.mint} />
    <Cascara x={300} y={330} s={0.7} pudre={0.3 + pCo * 0.5} deshace={pCo * 0.5} T={T} />
  </g>;
  // regreso al inicio: la cáscara cae otra vez, ahora sobre tierra de composta
  const caeC = kprog(T, K.C + 3.0, K.C + 3.7, kEase.suave), hazTierra = kprog(T, K.C + 3.9, K.C + 6.2, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cáscara va al bote */}
      <Escena T={T} a={K.G} b={K.B}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={0} y={1180} width={KW} height={740} fill="#e9d8b6" /><line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={6} />
          <Bote x={330} y={1180} s={1.25} tapa={tapaG} />
          {caeG < 1 && <Cascara x={330} y={klerp(250, 760, caeG)} s={0.9} rot={caeG * 200} T={T} />}
          <g opacity={kprog(T, K.G + 2.2, K.G + 2.6)}><path d={`M 330 470 Q 470 330 620 ${380 + Math.sin(T * 4) * 6}`} stroke={KC.ink} strokeWidth={10} fill="none" strokeDasharray="22 14" strokeDashoffset={-T * 40} />
            <path d="M 600 350 L 640 382 L 596 410" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g></>)}
        <Chip T={T} at={K.G + 2.4} until={K.B - 0.2} texto="→ al relleno" x={300} y={360} tam={40} borde={KC.ink} />
      </Escena>
      {/* 2 · 4 de cada 10 kilos son orgánicos */}
      <Escena T={T} a={K.B} b={K.S}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{bolsas}</>)}
        <EscalaFija texto="cada bolsa = 1 kg (esquema)" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 3 · relleno: enterrada entre bolsas, sin aire */}
      <Escena T={T} a={K.S} b={K.Ba}>
        {svg(<>{relleno}<Cascara x={540} y={890} s={0.55} pudre={0.4} T={T} /></>)}
        <EscalaFija texto="corte del relleno · esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.S + 1.5} until={K.Ba - 0.15} x={340} y={470} r={170} fx={540} fy={890} tinte={KC.orange} etiqueta="POR DENTRO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a120c" />
          <Cascara x={r} y={r + 10} s={0.9} pudre={0.6} T={t} /><Bacteria x={r - 80} y={r + 90} s={0.5} T={t} color={KC.mint} /><Bacteria x={r + 90} y={r - 60} s={0.5} T={t} seed={3} rot={40} color={KC.mint} /></svg>} />
      {/* 4 · bacterias: ácidos e hidrógeno */}
      <Escena T={T} a={K.Ba} b={K.A} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #2a1d14 0%, ${KC.dark} 75%)` }}></div>
        {svg(<>
          {Array.from({ length: 5 }, (_, i) => { const corte = kprog(T, K.Ba + 0.3 + i * 0.35, K.Ba + 0.8 + i * 0.35);
            return <g key={i}><path d={`M ${120 + i * 40} ${520 + i * 120} L ${520 - corte * 60} ${500 + i * 120 + 20}`} stroke={CP.cascara} strokeWidth={22} strokeLinecap="round" opacity={0.85} />
              <path d={`M ${560 + corte * 60} ${505 + i * 120 + 20} L ${960 - i * 30} ${540 + i * 110}`} stroke={CP.cascara} strokeWidth={22} strokeLinecap="round" opacity={0.85} /></g>; })}
          {Array.from({ length: 5 }, (_, i) => <Bacteria key={i} x={540 + Math.sin(T * 2 + i) * 12} y={510 + i * 120 + 20} s={0.8} T={T} seed={i} rot={80 + i * 10} color={KC.mint} />)}
          {Array.from({ length: 8 }, (_, i) => { const e = kprog(T, K.Ba + 0.9 + i * 0.2, K.Ba + 1.3 + i * 0.2, kEase.rebote); const h = i % 2;
            return <g key={'f' + i} transform={`translate(${140 + (i * 233) % 820} ${380 + ((i * 167) % 4) * 210 + Math.sin(T * 2 + i) * 10}) scale(${e})`}>
              <circle r={h ? 26 : 34} fill={h ? '#fff' : KC.orange} stroke={KC.ink} strokeWidth={5} />
              <text y={h ? 9 : 10} textAnchor="middle" style={{ font:`900 ${h ? 24 : 22}px ${KF.texto}` }} fill={KC.ink}>{h ? 'H₂' : 'ácido'}</text></g>; })}
        </>)}
        <EscalaFija texto="al microscopio · esquema" largo={0} y={1440} color={KC.texto} />
      </Escena>
      {/* 5 · arqueas metanógenas → metano */}
      <Escena T={T} a={K.A} b={K.Po} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1e1530 0%, ${KC.dark} 75%)` }}></div>
        {svg(<>
          {[[250, 1050, 'racimo'], [560, 980, 'baston'], [820, 1080, 'racimo'], [400, 860, 'baston'], [720, 820, 'racimo']].map(([x, y, f], i) =>
            <Arquea key={i} x={x} y={y} s={1.3 * kprog(T, K.A - 0.45 + i * 0.1, K.A - 0.1 + i * 0.1, kEase.rebote)} T={T} seed={i + 1} forma={f} />)}
          {burbujas(K.A - 0.2, 9, 1080)}
        </>)}
        <Etq T={T} at={K.A + 0.6} until={K.Po - 0.2} x={250} y={1150} texto="arqueas metanógenas" tam={32} color={CP.arquea} />
        <Chip T={T} at={K.A + 1.6} until={K.Po - 0.2} texto="CH₄ = metano" x={300} y={500} tam={40} borde={CP.metano} />
        <EscalaFija texto="al microscopio · esquema" largo={0} y={1440} color={KC.texto} />
      </Escena>
      {/* 6 · potencia: ~80 veces en 20 años */}
      <Escena T={T} a={K.Po} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<g transform="translate(540 1050)">
          <polygon points="-60,120 60,120 0,0" fill="#6b7280" stroke={KC.ink} strokeWidth={7} />
          <g transform={`rotate(${incl})`}><rect x={-420} y={-12} width={840} height={24} rx={12} fill="#9aa3ae" stroke={KC.ink} strokeWidth={6} />
            <line x1={-340} y1={0} x2={-340} y2={-120} stroke={KC.ink} strokeWidth={5} /><line x1={340} y1={0} x2={340} y2={-120} stroke={KC.ink} strokeWidth={5} />
            <path d="M -460 -120 L -220 -120 Q -340 -60 -460 -120 Z" fill="#e9eef5" stroke={KC.ink} strokeWidth={6} />
            <path d="M 220 -120 L 460 -120 Q 340 -60 220 -120 Z" fill="#e9eef5" stroke={KC.ink} strokeWidth={6} />
            <Metano x={-340} y={-180} s={1.4 * kprog(T, K.Po + 0.3, K.Po + 0.7, kEase.rebote)} />
            {Array.from({ length: 20 }, (_, i) => { const e = kprog(T, K.Po + 1.0 + i * 0.07, K.Po + 1.3 + i * 0.07, kEase.rebote);
              return <g key={i} transform={`translate(${260 + (i % 5) * 30} ${-150 - Math.floor(i / 5) * 32}) scale(${e})`}><circle r={14} fill="#cfd8e3" stroke={KC.ink} strokeWidth={3} /></g>; })}
            <text x={-340} y={60} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>1 kg de metano</text>
            <text x={340} y={60} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>≈ 80 kg de CO₂</text></g>
        </g>)}
        <EscalaFija texto="esquema · horizonte de 20 años" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <NumeroGigante T={T} at={K.Po + 0.4} until={K.P - 0.2} valor={80} dur={1.4} sufijo="×" etiqueta="calienta unas" x={660} y={560} tam={230} color={KC.yellow} />
      <Chip T={T} at={K.Po + 2.6} until={K.P - 0.2} texto="IPCC 2021: ~80× en 20 años" x={540} y={1160} tam={34} borde={KC.ink} />
      {/* 7 · ¿y si tuviera aire? */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={250} y={760} textAnchor="middle" style={{ font:`400 420px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 250 600)`}>?</text>
          <Cascara x={260} y={1000} s={0.85} T={T} />
          <Aire x={150} y={880} T={T} rot={20} /><Aire x={380} y={1130} T={T} rot={-160} s={0.9} /></>)}
      </Escena>
      {/* 8 · composta con aire: bacterias, hongos y lombrices */}
      <Escena T={T} a={K.Co} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>{compostera(60, 600)}
          <Aire x={-10} y={760} T={T} o={0.9} /><Aire x={-10} y={1000} T={T} o={0.9} /><Aire x={760} y={880} T={T} rot={180} o={0.9} /></>)}
        <EscalaFija texto="composta en corte · esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <Etq T={T} at={K.Co + 0.8} until={K.E - 0.2} x={700} y={1040} texto="hongos" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Co + 1.2} until={K.E - 0.2} x={700} y={850} texto="lombrices" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Co + 1.6} until={K.E - 0.2} x={700} y={960} texto="bacterias" lado="der" tam={30} color={KC.ink} />
      {['abono', 'H₂O', 'calor', 'CO₂'].map((t, i) => <Chip key={t} T={T} at={K.Co + 3.4 + i * 0.7} until={K.E - 0.2} texto={t} x={150 + i * 160} y={480 - (i % 2) * 70} tam={34}
        borde={[KC.leaf, KC.cyan, KC.red, '#9aa3ae'][i]} />)}
      {/* 9 · el estudio: Nicasio, California (medido en 2018) */}
      <Escena T={T} a={K.E} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<><rect x={0} y={1180} width={KW} height={740} fill="#b8d98a" /><line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={6} />
          <Hilera x={90} y={1180} w={900} T={T} sensores={kprog(T, K.E + 3.6, K.E + 4.2)} />
          {T > K.E + 4.4 && <Aire x={180} y={880} T={T} o={0.7} />}
          {(() => { const g = kprog(T, K.E + 5.0, K.E + 6.4, kEase.sale), g2 = kprog(T, K.E + 6.2, K.E + 7.6, kEase.sale); const base = 860, H = 380;
            return <g opacity={kprog(T, K.E + 4.8, K.E + 5.1)}>
              <rect x={110} y={base - H * g} width={160} height={H * g} fill="#7b8794" stroke={KC.ink} strokeWidth={6} />
              <text x={190} y={base + 46} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>relleno</text>
              <rect x={360} y={base - H * 0.16 * g2} width={160} height={H * 0.16 * g2} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
              <rect x={360} y={base - H * 0.62 * g2} width={160} height={H * 0.46 * g2} fill="url(#rayas)" stroke={KC.ink} strokeWidth={6} strokeDasharray="12 8" />
              <text x={440} y={base + 46} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>composta</text>
              <text x={190} y={base - H * g - 18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>100</text>
              <text x={440} y={base - H * 0.62 * g2 - 18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink} opacity={g2}>16–62</text>
              <defs><pattern id="rayas" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="20" fill="#a8e6a0" /><rect width="8" height="20" fill={KC.leaf} /></pattern></defs>
            </g>; })()}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 4.2} anio="2018" quien="Universidad de California" revista="medido en Nicasio · publicado en 2023 (Sci. Rep.)" x={500} y={620} />
      <Etq T={T} at={K.E + 3.8} until={K.Ca - 0.2} x={880} y={1110} texto="sensores" lado="izq" tam={28} color={KC.texto} />
      <Chip T={T} at={K.E + 5.2} until={K.Ca - 0.2} texto="gases de invernadero (CO₂e)" x={330} y={360} tam={30} borde={KC.ink} />
      {/* 10 · se calienta sola: más de 60 °C */}
      <Escena T={T} a={K.Ca} b={K.C} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<><rect x={0} y={1180} width={KW} height={740} fill="#b8d98a" /><line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={6} />
          <Hilera x={60} y={1180} w={960} T={T} vapor={kprog(T, K.Ca + 1.0, K.Ca + 2.0)} />
          <Termo x={640} y={1000} v={kprog(T, K.Ca + 0.3, K.Ca + 2.2, kEase.suave) * 0.75} etiqueta={T > K.Ca + 2.0 ? '60 °C' : null} alto={480} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: la receta y la misma cáscara, ahora tierra */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={0} y={1180} width={KW} height={740} fill="#e9d8b6" /><line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={6} />
          <path d={`M 120 1180 Q 330 ${1180 - 170 - hazTierra * 40} 540 1180 Z`} fill={CP.tierra2} stroke={KC.ink} strokeWidth={7} />
          {caeC > 0 && <Cascara x={330} y={klerp(250, 1020, caeC)} s={0.9} rot={caeC * 200} pudre={hazTierra} deshace={hazTierra * 0.6} T={T} />}
          {hazTierra > 0.6 && <g transform={`translate(330 ${1020 - 20}) scale(${kprog(T, K.C + 5.2, K.C + 6.0, kEase.rebote)})`}>
            <path d="M 0 0 L 0 -90" stroke={KC.leaf} strokeWidth={10} strokeLinecap="round" />
            <path d="M 0 -60 Q -60 -100 -80 -60 Q -40 -40 0 -60 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
            <path d="M 0 -80 Q 60 -130 90 -90 Q 40 -60 0 -80 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} /></g>}
          {[['cáscaras', 0], ['hojas secas', 1], ['esponja exprimida', 2], ['voltear', 3]].map(([t, i]) => { const e = kprog(T, K.C + 0.2 + i * 0.6, K.C + 0.6 + i * 0.6, kEase.rebote), o = 1 - kprog(T, K.C + 2.8, K.C + 3.2);
            const cx = 150 + i * 255; return <g key={t} transform={`translate(${cx} 560) scale(${e})`} opacity={o}>
              <circle r={90} fill="#fff" stroke={KC.ink} strokeWidth={7} />
              {i === 0 && <Cascara x={0} y={-10} s={0.45} T={T} />}
              {i === 1 && <g><path d="M 0 -60 Q 55 -10 0 60 Q -55 -10 0 -60 Z" fill="#b5651d" stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-50} x2={0} y2={70} stroke={KC.ink} strokeWidth={5} /></g>}
              {i === 2 && <g><rect x={-55} y={-35} width={110} height={70} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />{[[-25, -10], [10, 8], [30, -14], [-10, 15]].map(([a, b], j) => <circle key={j} cx={a} cy={b} r={6} fill="#d9a400" />)}
                <path d="M 0 40 L 0 70" stroke="#4aa8ff" strokeWidth={8} strokeLinecap="round" /></g>}
              {i === 3 && <g transform={`rotate(${Math.sin(T * 5) * 15})`}><rect x={-8} y={-70} width={16} height={100} fill={CP.madera} stroke={KC.ink} strokeWidth={5} /><path d="M -35 30 L 35 30 L 25 75 L -25 75 Z" fill="#9aa3ae" stroke={KC.ink} strokeWidth={6} /></g>}
              <text y={130} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{t}</text>
              {i < 3 && <text x={128} y={14} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>+</text>}</g>; })}
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <Chip T={T} at={K.C + 4.4} until={K.Ou - 0.1} texto="ahora sí: tierra 🌱" x={330} y={380} tam={40} borde={KC.leaf} />

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.B + 0.3} until={K.S - 0.2} valor={4} dur={0.8} sufijo=" de 10" etiqueta="kilos de basura urbana:" x={480} y={520} tam={150} color={KC.leaf} />
      <Chip T={T} at={K.B + 2.0} until={K.S - 0.2} texto="SEMARNAT 2026: 40 % orgánicos" x={540} y={1160} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 0.6} until={K.Ba - 0.2} texto="O₂ ✕  sin aire" x={760} y={760} tam={38} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G} until={K.B - 0.02} texto="No se vuelve tierra: *se pudre y se vuelve gas.*" />
      <Subtitulo T={T} idx={1} at={K.B} until={K.S - 0.02} texto="En México: *4 de cada 10 kilos.*" />
      <Subtitulo T={T} idx={2} at={K.S} until={K.Ba - 0.02} texto="Enterrada, *sin aire.*" />
      <Subtitulo T={T} idx={3} at={K.Ba} until={K.A - 0.02} texto="Bacterias: *ácidos e hidrógeno.*" />
      <Subtitulo T={T} idx={4} at={K.A} until={K.Po - 0.02} texto="Arqueas metanógenas: *metano.*" />
      <Subtitulo T={T} idx={5} at={K.Po} until={K.P - 0.02} texto="Kilo por kilo: *unas 80 veces.*" />
      <Subtitulo T={T} idx={6} at={K.P} until={K.Co - 0.02} texto="¿Y si tuviera *aire?*" />
      <Subtitulo T={T} idx={7} at={K.Co} until={K.E - 0.02} texto="Con oxígeno: *abono.*" />
      <Subtitulo T={T} idx={8} at={K.E} until={K.Ca - 0.02} texto="Nicasio, 2018: *38 a 84 % menos.*" />
      <Subtitulo T={T} idx={9} at={K.Ca} until={K.C - 0.02} texto="Se calienta: *más de 60 °C.*" />
      <Subtitulo T={T} idx={10} at={K.C} until={K.Ou - 0.02} texto="Así sí se vuelve *tierra.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Sinaire + 0.3, CUES.Bacterias + 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Arqueas + 1.0, CUES.Potencia - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Potencia + 2.2, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Composta + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Composta + 3.2, CUES.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Estudio + 5.0, CUES.Estudio + 9.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Calor + 0.3, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 3.2, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="46" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CompostaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CompostaShot /></CompositionStage></div>;
}
window.CompostaApp = CompostaApp;
