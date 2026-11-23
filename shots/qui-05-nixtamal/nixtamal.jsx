// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Químico #05 · Esa masa no es solo maíz molido: la nixtamalización — NARRADO (N3 capítulos + viaje N1).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const MAIZ = '#f5c542', MASA = '#f1dc9a', PERICARPIO = '#e88a1a', CAL = '#f4f4f0';
// Volumen (pase de belleza): degradados del mismo tono, luz arriba a la izquierda.
function NxDefs() {
  const rg = (id, a, b, c) => <radialGradient id={id} cx="0.35" cy="0.28" r="0.85"><stop offset="0" stopColor={a} /><stop offset="0.55" stopColor={b} /><stop offset="1" stopColor={c} /></radialGradient>;
  return <defs>
    {rg('nx-masa', '#fbf0c8', MASA, '#c9ad62')}
    {rg('nx-tort', '#fcf2cf', '#f3e2a6', '#cdb46a')}
    {rg('nx-maiz', '#ffe48a', MAIZ, '#c98f1c')}
    {rg('nx-germen', '#fffbe6', '#fff3c4', '#e0cf8e')}
    {rg('nx-olla', '#d9774a', '#b4542b', '#76311a')}
    {rg('nx-piedra', '#9a948f', '#6f6a66', '#45413e')}
    {rg('nx-mano', '#aaa39d', '#837d78', '#57524e')}
    {rg('nx-comal', '#5a606c', '#3b3f48', '#202329')}
    {rg('nx-madera', '#b07a52', '#8a5a3a', '#5a3820')}
    <linearGradient id="nx-brillo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.4" /><stop offset="0.5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.25" /></linearGradient>
  </defs>;
}

function Masa({ x, y, s = 1, aplana = 0, T = 0 }) {
  const rx = klerp(120, 230, aplana), ry = klerp(110, 34, aplana);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <NxDefs />
    <ellipse rx={rx} ry={ry} fill="url(#nx-masa)" stroke={KC.ink} strokeWidth={8} />
    {[[-40, -20], [30, 10], [-10, 30], [50, -30], [-70, 40], [80, 30], [10, -60], [-20, 70]].map(([dx, dy], i) => <circle key={i} cx={dx * rx / 120} cy={dy * ry / 110} r={i < 4 ? 6 : 3.5} fill="#d9be6c" opacity={i < 4 ? 1 : 0.7} />)}
    <ellipse cx={-rx * 0.38} cy={-ry * 0.45} rx={rx * 0.28} ry={ry * 0.16} fill="#fff" opacity={0.35} />
  </g>;
}
function Tortilla({ x, y, s = 1, infla = 0, rot = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <NxDefs />
    <ellipse rx={220} ry={60 + infla * 40} fill="url(#nx-tort)" stroke={KC.ink} strokeWidth={8} />
    {infla > 0 && <ellipse cx={0} cy={-20 - infla * 30} rx={150} ry={20 + infla * 45} fill="url(#nx-masa)" stroke={KC.ink} strokeWidth={6} />}
    {infla > 0 && <ellipse cx={-50} cy={-30 - infla * 50} rx={60} ry={8 + infla * 10} fill="#fff" opacity={0.3} />}
    {[[-90, 10], [40, -10], [110, 20], [-30, 25], [70, 30]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={16} ry={7} fill="#b88a3a" opacity={0.7} />)}
  </g>;
}
// Tortilla "sin cal" que se rompe en migajas (f = 0..1).
function TortillaRota({ x, y, s = 1, f = 0 }) {
  const R = krng(5);
  const piezas = Array.from({ length: 9 }, (_, i) => [R() * 300 - 150, R() * 60 - 30, R() * 60 - 30, R() * 300 - 150]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {piezas.map(([dx, dy, rr, vx], i) => <g key={i} transform={`translate(${dx * 0.6 + vx * f * 0.5} ${dy + f * f * (220 + i * 20)}) rotate(${rr * f * 3})`}>
      <path d="M -45 -25 L 40 -30 L 50 20 L -35 30 Z" fill="#e8d59b" stroke={KC.ink} strokeWidth={5} />
    </g>)}
  </g>;
}
function Grano({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <NxDefs />
    <path d="M 0 -40 Q 34 -36 32 0 Q 28 34 0 40 Q -28 34 -32 0 Q -34 -36 0 -40 Z" fill="url(#nx-maiz)" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-11} cy={-20} rx={8} ry={11} fill="#fff" opacity={0.35} />
    <path d="M -8 22 Q 0 34 8 22 Q 6 8 0 6 Q -6 8 -8 22 Z" fill="#fff3c4" />
  </g>;
}
function Olla({ x, y, s = 1, T = 0, hierve = 0, cal = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <NxDefs />
    <path d="M -260 -160 Q -290 120 -150 170 L 150 170 Q 290 120 260 -160 Z" fill="url(#nx-olla)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -200 -90 Q -215 40 -140 120" stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.18} />
    {[-40, 30, 100].map((dy, i) => <path key={i} d={`M -250 ${dy} Q 0 ${dy + 22} 250 ${dy}`} stroke="#6a2a12" strokeWidth={4} fill="none" opacity={0.35} />)}
    <ellipse cx={0} cy={-160} rx={265} ry={50} fill="#7a3418" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-155} rx={240} ry={38} fill={mixHex('#9fd8ff', '#e9e4cf', cal)} />
    {Array.from({ length: 14 }, (_, i) => <Grano key={i} x={-190 + (i % 7) * 63 + Math.sin(T * 3 + i) * 4 * hierve} y={-160 + Math.floor(i / 7) * 18 + Math.cos(T * 4 + i) * 4 * hierve} s={0.6} rot={i * 40} />)}
    <Burbujas T={T} x={-200} y={-200} w={400} h={50} n={16} f={hierve} color="rgba(255,255,255,.85)" vel={50} rmax={10} />
    <path d="M -270 -60 Q -330 -60 -320 0 M 270 -60 Q 330 -60 320 0" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}
// Grano en corte (gigante): pericarpio (capa externa naranja) que se despega con `pela` 0..1. calcio 0..1 = puntitos de Ca adentro.
function GranoCorte({ T, x, y, s = 1, pela = 0, calcio = 0 }) {
  const contorno = "M 0 -300 Q 250 -270 240 0 Q 220 260 0 300 Q -220 260 -240 0 Q -250 -270 0 -300 Z";
  const R = krng(3);
  const ca = Array.from({ length: 22 }, () => [R() * 340 - 170, R() * 440 - 220]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${pela * 380} ${-pela * 260}) rotate(${pela * 30})`} opacity={1 - pela * 0.6}>
      <path d={contorno} fill="none" stroke={PERICARPIO} strokeWidth={34} />
      <path d={contorno} fill="none" stroke={KC.ink} strokeWidth={4} transform="scale(1.06)" />
    </g>
    <NxDefs />
    <path d={contorno} fill="url(#nx-maiz)" stroke={KC.ink} strokeWidth={8} transform="scale(0.93)" />
    <path d="M -150 -200 Q -195 -60 -170 60" stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.2} />
    <path d="M -90 120 Q 0 260 90 120 Q 80 20 0 10 Q -80 20 -90 120 Z" fill="url(#nx-germen)" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-120 + (i % 5) * 60} cy={-160 + Math.floor(i / 5) * 70} r={18} fill="#ffe28a" opacity={0.7} />)}
    {calcio > 0 && ca.map(([dx, dy], i) => i / ca.length < calcio ? <Atomo key={i} x={dx * 0.8} y={dy * 0.8} r={20} color={QA.Ca} letra="Ca" tam={14} /> : null)}
  </g>;
}
function Niacina({ x, y, s = 1, color = '#9b7bff' }) {
  const hex = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${Math.cos(a) * 60},${Math.sin(a) * 60}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points={hex} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <text x={0} y={16} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.ink}>N</text>
    <line x1={52} y1={-30} x2={110} y2={-62} stroke={KC.ink} strokeWidth={10} />
    <Atomo x={124} y={-70} r={30} color={QA.C} letra="" /><Atomo x={170} y={-104} r={24} color={QA.O} /><Atomo x={164} y={-30} r={24} color={QA.O} />
  </g>;
}
function Candado({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -40 -10 L -40 -60 Q -40 -110 0 -110 Q 40 -110 40 -60 L 40 ${-10 - abre * 60}`} stroke={KC.ink} strokeWidth={22} fill="none" transform={`translate(0 ${-abre * 40})`} />
    <rect x={-65} y={-20} width={130} height={110} rx={18} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={30} r={14} fill={KC.ink} />
  </g>;
}
function Barco({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 8}) rotate(${Math.sin(T * 1.6) * 3}) scale(${s})`}>
    <NxDefs />
    <path d="M -200 0 L 200 0 L 150 90 L -150 90 Z" fill="url(#nx-madera)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[28, 58].map((dy, i) => <path key={i} d={`M ${-190 + dy * 0.55} ${dy} L ${190 - dy * 0.55} ${dy}`} stroke="#4a2c18" strokeWidth={4} opacity={0.6} />)}
    <line x1={0} y1={0} x2={0} y2={-260} stroke={KC.ink} strokeWidth={12} />
    <path d="M 10 -250 Q 140 -170 10 -60 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    {[-120, -60, 60, 120].map((dx, i) => <g key={i} transform={`translate(${dx} -30) rotate(${i * 20 - 30})`}><ellipse rx={22} ry={52} fill="url(#nx-maiz)" stroke={KC.ink} strokeWidth={5} /><path d="M -20 30 Q -40 60 -10 70 M 20 30 Q 40 60 10 70" stroke={KC.leaf} strokeWidth={8} fill="none" /></g>)}
  </g>;
}
function Metate({ x, y, s = 1, T = 0, muele = 0 }) {
  const mx = Math.sin(T * 5) * 60 * muele;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <NxDefs />
    <ellipse cx={0} cy={80} rx={300} ry={20} fill="#000" opacity={0.3} />
    <path d="M -260 -40 L 240 -90 L 250 -40 L -250 10 Z" fill="url(#nx-piedra)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={-220 + i * 33} cy={-28 - i * 3.6 + (i % 3) * 6} r={2.5} fill="#2e2b29" opacity={0.6} />)}
    {[-200, 0, 180].map((dx, i) => <path key={i} d={`M ${dx - 30} ${-10 - i * 15} L ${dx - 20} ${70 - i * 10} L ${dx + 20} ${70 - i * 10} L ${dx + 30} ${-15 - i * 15} Z`} fill="url(#nx-piedra)" stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-160 + mx} y={-130} width={260} height={56} rx={28} fill="url(#nx-mano)" stroke={KC.ink} strokeWidth={8} transform={`rotate(-6 ${-30 + mx} -100)`} />
    <ellipse cx={130} cy={-80} rx={60} ry={16} fill="url(#nx-masa)" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Comal({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <NxDefs />
    <ellipse rx={280} ry={60} fill="url(#nx-comal)" stroke={KC.ink} strokeWidth={9} />
    <ellipse rx={250} ry={46} fill="#2a2d33" />
    <path d="M -200 -22 Q -60 -44 120 -36" stroke="#fff" strokeWidth={6} fill="none" opacity={0.12} strokeLinecap="round" />
  </g>;
}

function Nixtamal() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pr: CUES.Proceso, Ca: CUES.Cascara, Ne: CUES.Nejayote, Cl: CUES.Calcio, Ni: CUES.Niacina, Pg: CUES.Pregunta, Eu: CUES.Europa, Es: CUES.Estudio, Me: CUES.Mesoamerica, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.6, kEase.rebote);
  const rompe = kprog(T, K.G + 2.6, K.G + 4.2, kEase.suave);
  const noche = kprog(T, K.Pr + 3.2, K.Pr + 4.0);
  const fb1 = 1 - 0.95 * kprog(T, K.Es + 3.2, K.Es + 5.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: masa contra tortilla sin cal */}
      <Escena T={T} a={K.G} b={K.Pr} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {/* modo cine: antes del segundo 3 ya asoma la olla (hacia dónde va la historia), chica y atenuada */}
          {/* segunda vuelta: la bola de masa llena el cuadro sobre una mesa de madera oscura; la tortilla sin cal se desmorona a su lado */}
          <rect x={-80} y={1290} width={KW + 160} height={800} fill="#2e1f12" stroke="#6b5238" strokeWidth={6} />
          {[1400, 1530, 1680].map((ty, i) => <path key={i} d={`M -60 ${ty} Q 300 ${ty - 16 + i * 9} 560 ${ty} T 1140 ${ty + 6}`} stroke="#1f140a" strokeWidth={6} fill="none" />)}
          <g opacity={0.45 * kprog(T, K.G + 1.2, K.G + 2.2)}><Olla T={T} x={250} y={470} s={0.55} hierve={1} cal={0} /></g>
          <g opacity={kprog(T, K.G + 0.7, K.G + 1.2)}><TortillaRota x={840} y={680} s={1.7} f={rompe} /></g>
          <ellipse cx={420} cy={1300} rx={330} ry={30} fill="rgba(0,0,0,.45)" />
          <Masa x={420} y={klerp(300, 1010, cae)} s={2.7} />
        </SvgCapa>
      </Escena>
      {/* 1 · la olla con cal y la noche */}
      <Escena T={T} a={K.Pr} b={K.Ca}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#2a180c', '#1b2340', noche) }}></div>
        <SvgCapa>
          {noche > 0 && <g opacity={noche}><circle cx={890} cy={520} r={84} fill="#fff6c8" stroke={KC.ink} strokeWidth={6} /><circle cx={926} cy={496} r={74} fill="#1b2340" /></g>}
          <Olla T={T} x={540} y={1060} s={1.4} hierve={1 - noche * 0.8} cal={kprog(T, K.Pr + 1.0, K.Pr + 2.0)} />
          <Llama T={T} x={540} y={1322} s={1.87} o={1 - noche} />
          {Array.from({ length: 40 }, (_, i) => { const t0 = K.Pr + 0.8 + (i % 12) * 0.06, u = kprog(T, t0, t0 + 0.7); return u > 0 && u < 1 ? <circle key={i} cx={430 + ((i * 53) % 200)} cy={klerp(540, 850, u)} r={8} fill={CAL} stroke={KC.ink} strokeWidth={1.5} /> : null; })}
          <g opacity={1 - kprog(T, K.Pr + 2.2, K.Pr + 2.6)} transform="translate(430 500) scale(1.35) translate(-430 -540)"><rect x={340} y={480} width={180} height={120} rx={14} fill={CAL} stroke={KC.ink} strokeWidth={6} transform="rotate(-20 430 540)" /><text x={430} y={555} textAnchor="middle" transform="rotate(-20 430 540)" style={{ font:`400 40px ${KF.titulo}` }} fill="#0b1020">CAL</text></g>
        </SvgCapa>
        <Cronometro T={T} at={K.Pr + 3.4} until={K.Ca - 0.2} inicio={21 * 3600} factor={3600 * 4} y={1440} etiqueta="REPOSO · TODA LA NOCHE" />
      </Escena>
      {/* 2–4 · el grano por dentro: pericarpio, nejayote, calcio */}
      <Escena T={T} a={K.Ca} b={K.Ni}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <GranoCorte T={T} x={T < K.Ne ? 540 : klerp(540, 330, kprog(T, K.Ne, K.Ne + 0.6)) + 210 * kprog(T, K.Cl - 0.2, K.Cl + 0.5, kEase.suave)} y={900} s={T < K.Ne ? 1.5 : klerp(1.5, 1.1, kprog(T, K.Ne, K.Ne + 0.6)) + 0.3 * kprog(T, K.Cl - 0.2, K.Cl + 0.5, kEase.suave)} pela={kprog(T, K.Ca + 1.2, K.Ca + 4.0, kEase.suave)} calcio={kprog(T, K.Cl + 0.3, K.Cl + 2.2)} />
          <g opacity={kprog(T, K.Ne, K.Ne + 0.4) * (1 - kprog(T, K.Cl - 0.3, K.Cl + 0.1))}>
            <Cubeta x={820} y={1150} s={1.0} liquido="#e9d98a" nivel={0.3 + 0.4 * kprog(T, K.Ne + 0.3, K.Ne + 2.4)} color={KC.cyan} />
            <Chorro T={T} x0={640} y0={760} x1={815} y1={1040} color="#e9d98a" o={kprog(T, K.Ne + 0.3, K.Ne + 0.5)} ancho={28} />
          </g>
          {T > K.Cl && Array.from({ length: 8 }, (_, i) => { const t0 = K.Cl + 0.2 + i * 0.2, u = kprog(T, t0, t0 + 0.8, kEase.suave); return u < 1 && u > 0 ? <Atomo key={i} x={klerp(1000, 540, u)} y={klerp(480 + i * 70, 900, u)} r={32} color={QA.Ca} letra="Ca" tam={22} /> : null; })}
        </SvgCapa>
        <Medidor T={T} at={K.Cl + 0.2} until={K.Ni - 0.2} valor={(t) => 0.2 + 0.7 * kprog(t, K.Cl + 0.3, K.Cl + 2.2)} etiqueta="calcio en el grano" texto={(v) => v > 0.5 ? 'sube' : ''} y={1430} color={QA.Ca} />
      </Escena>
      {/* 5 · niacina amarrada */}
      <Escena T={T} a={K.Ni} b={K.Pg}>
        <div style={{ position:'absolute', inset:0, background:'#1d1240' }}></div>
        <SvgCapa>
          <g transform="translate(540 920) scale(1.45) translate(-540 -900)">
          <GranoCorte T={T} x={540} y={900} s={1.0} pela={1} calcio={0} />
          <Niacina x={klerp(520, 655, kprog(T, K.Ni + 3.2, K.Ni + 4.6, kEase.sale))} y={klerp(860, 650, kprog(T, K.Ni + 3.2, K.Ni + 4.6, kEase.sale))} s={1.1} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${380 + i * 20} ${760 + i * 70} L ${700 - i * 20} ${980 - i * 50}`} stroke="#9aa3b5" strokeWidth={12} strokeDasharray="22 10" opacity={1 - kprog(T, K.Ni + 2.6, K.Ni + 3.2)} />)}
          <g opacity={1 - kprog(T, K.Ni + 3.0, K.Ni + 3.6)}><Candado x={560} y={980} s={0.9} abre={kprog(T, K.Ni + 2.2, K.Ni + 2.8)} /></g>
          </g>
          {Array.from({ length: 10 }, (_, i) => { const t0 = K.Ni + 1.2 + i * 0.08, u = kprog(T, t0, t0 + 0.8); return u > 0 && u < 1 ? <circle key={i} cx={klerp(80, 520, u)} cy={klerp(500 + i * 40, 1000, u)} r={10} fill={CAL} stroke={KC.ink} strokeWidth={1.5} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pg} b={K.Eu} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {/* encuadre: el grano con su niacina suelta (lo de la escena anterior) sigue a cuadro, a media luz, y la pregunta encima */}
        <div style={{ position:'absolute', inset:0, background:'rgba(10,15,28,.85)' }}></div>
        <SvgCapa>
          <g opacity={0.55} transform="translate(540 920) scale(1.45) translate(-540 -900)">
            <GranoCorte T={T} x={540} y={900} s={1.0} pela={1} calcio={0} />
            <Niacina x={655} y={650} s={1.1} />
          </g>
        </SvgCapa>
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · Europa y la pelagra */}
      <Escena T={T} a={K.Eu} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {/* encuadre: barco, mar y síntomas bajan 150 px juntos para quedar centrados */}
          <g transform="translate(0 150)">
          {/* segunda vuelta: barco grande sobre un mar oscuro que llega hasta abajo */}
          <g opacity={1 - 0.72 * kprog(T, K.Eu + 2.8, K.Eu + 3.3)}><Barco T={T} x={klerp(-380, 540, kprog(T, K.Eu, K.Eu + 2.6, kEase.sale))} y={1080} s={2.1} /></g>
          <rect x={-80} y={1200} width={KW + 160} height={900} fill="#0a1636" opacity={0.92} />
          {[0, 1, 2].map((i) => <path key={i} d={`M -80 ${1230 + i * 110} q 70 ${-26 + Math.sin(T * 1.5 + i) * 8} 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0`} stroke="#2c4484" strokeWidth={6} fill="none" opacity={0.7 - i * 0.18} />)}
          <g opacity={kprog(T, K.Eu + 3.0, K.Eu + 3.5)}>
            {[['piel', '#ff6b5a', 220], ['diarrea', '#c9a14a', 540], ['demencia', '#9aa3b5', 860]].map(([t, c, x], i) => <g key={i} transform={`translate(${x} 800) scale(${1.2 * kprog(T, K.Eu + 3.6 + i * 0.6, K.Eu + 4.0 + i * 0.6, kEase.rebote)})`}>
              <circle r={120} fill={c} stroke={KC.ink} strokeWidth={9} />
              <circle r={120} fill="url(#nx-brillo)" />
              {i === 0 && <g>{[[-40, -30], [30, 10], [-10, 40], [45, -40]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={18} fill="#c0392b" />)}</g>}
              {i === 1 && <path d="M -60 -40 Q 60 -60 40 0 Q 20 50 -40 20 Q -80 0 -30 -10 Q 30 -10 10 20" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />}
              {i === 2 && <g><path d="M -70 20 Q -80 -60 0 -70 Q 80 -60 70 20 Q 60 70 0 60 Q -60 70 -70 20 Z" fill="#f2b8c6" stroke={KC.ink} strokeWidth={7} /><path d="M -50 -10 Q 0 -40 50 -10" stroke="#fff" strokeWidth={10} strokeDasharray="8 10" fill="none" /></g>}
            </g>)}
          </g>
          </g>
        </SvgCapa>
      </Escena>
      {/* 8 · Soweto 2025: fumonisina −95 % */}
      <Escena T={T} a={K.Es} b={K.Me}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g transform="translate(540 920) scale(1.35) translate(-500 -970)">
          {Array.from({ length: 12 }, (_, i) => <Grano key={i} x={180 + (i % 6) * 70} y={1150 + Math.floor(i / 6) * 70} s={0.9} rot={i * 33} />)}
          {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={190 + (i * 41) % 380} cy={1140 + (i * 29) % 90} r={10 + (i % 3) * 4} fill="#5d7a3a" opacity={0.9 * fb1} />)}
          <rect x={660} y={1200 - 520} width={180} height={520} rx={16} fill="rgba(0,0,0,.18)" stroke={KC.ink} strokeWidth={6} />
          <rect x={668} y={1192 - 504 * fb1} width={164} height={504 * fb1} rx={12} fill={KC.red} />
          </g>
        </SvgCapa>
        <NumeroGigante T={T} at={K.Es + 3.2} until={K.Me - 0.3} valor={95} dur={2.0} prefijo="−" sufijo=" %" etiqueta="fumonisina B1 en el maíz" x={540} y={1465} tam={130} color={KC.red} />
      </Escena>
      {/* 9 · Mesoamérica */}
      <Escena T={T} a={K.Me} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <g transform="translate(540 900) scale(1.25) translate(-490 -900)">
          <Metate T={T} x={480} y={1060} s={1.3} muele={1} />
          <Comal x={540} y={700} s={0.8} />
          <Tortilla x={540} y={680} s={0.6} infla={Math.max(0, Math.sin((T - K.Me) * 2))} />
          </g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la masa del inicio se vuelve tortilla que se infla */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Comal x={540} y={1070} s={1.6} />
          {T < K.Ci + 1.4 ? <g opacity={kprog(T, K.Ci - 0.1, K.Ci + 0.5)}><Masa x={540} y={985} s={1.75} aplana={kprog(T, K.Ci + 0.3, K.Ci + 1.4)} /></g>
            : <Tortilla x={540} y={1020} s={1.6} infla={kprog(T, K.Ci + 2.0, K.Ci + 3.2, kEase.rebote)} />}
          <Marca x={870} y={640} ok s={1.2} o={kprog(T, K.Ci + 3.4, K.Ci + 3.8)} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.6} until={K.Pr - 0.3} x={60} y={1420} texto="con cal: amarra" tam={36} color={KC.ink} />
      <Etq T={T} at={K.G + 2.4} until={K.Pr - 0.3} x={1030} y={470} texto="sin cal: se desmorona" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Pr + 0.2} until={K.Ca - 0.3} texto="nixtamalización" x={540} y={280} tam={48} borde={KC.yellow} />
      <Etq T={T} at={K.Pr + 1.0} until={K.Pr + 3.0} x={600} y={480} texto="cal · Ca(OH)₂" tam={36} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Ne - 0.2} texto="pericarpio: la cascarita" y={1450} tam={42} borde={PERICARPIO} />
      <Chip T={T} at={K.Ne + 0.3} until={K.Cl - 0.2} texto="nejayote" x={820} y={1420} tam={48} borde="#e9d98a" />
      <Chip T={T} at={K.Ni + 0.3} until={K.Pg - 0.3} texto="niacina · vitamina B3" y={1460} tam={42} borde={'#9b7bff'} />
      <Etq T={T} at={K.Ni + 3.4} until={K.Pg - 0.3} x={1030} y={330} texto="la cal la suelta" lado="izq" tam={34} />
      <Chip T={T} at={K.Eu + 0.4} until={K.Eu + 2.8} texto="maíz a Europa · sin cal" x={540} y={1440} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Eu + 3.2} until={K.Es - 0.3} texto="pelagra" x={540} y={1440} tam={56} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2025" quien="Soweto, Sudáfrica" revista="Toxins · maíz con moho nixtamalizado" x={310} y={400} />
      <Chip T={T} at={K.Me + 0.3} until={K.Ci - 0.3} texto="conocimiento de Mesoamérica" y={1400} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 3.2} until={K.Ou} texto="maíz + cal = química que amarra" y={1400} tam={40} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pr - 0.1} texto="No es solo maíz: *es maíz con cal.*" />
      <Subtitulo T={T} idx={1} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="Hierve con cal *y reposa la noche.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Ne - 0.1} texto="Se afloja *la cascarita.*" />
      <Subtitulo T={T} idx={3} at={K.Ne + 0.1} until={K.Cl - 0.1} texto="Esa agua: *nejayote.*" />
      <Subtitulo T={T} idx={4} at={K.Cl + 0.1} until={K.Ni - 0.1} texto="El grano *gana calcio.*" />
      <Subtitulo T={T} idx={5} at={K.Ni + 0.1} until={K.Pg - 0.1} texto="Y suelta *la niacina.*" />
      <Subtitulo T={T} idx={6} at={K.Pg + 0.1} until={K.Eu - 0.1} texto="¿Y *sin cal?*" />
      <Subtitulo T={T} idx={7} at={K.Eu + 0.1} until={K.Es - 0.1} texto="En Europa: *pelagra.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Me - 0.1} texto="La toxina *bajó 95 %.*" />
      <Subtitulo T={T} idx={9} at={K.Me + 0.1} until={K.Ci - 0.1} texto="Ciencia *de Mesoamérica.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Por eso tu tortilla *sí amarra.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Proceso + 1.0, CUES.Proceso + 5.7, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cascara + 1.0, CUES.Cascara + 5.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Calcio + 0.3, CUES.Niacina - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Europa + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Europa + 1.4, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 0.9, CUES.Mesoamerica - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Mesoamerica + 0.7, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="05" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NixApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Nixtamal /></CompositionStage></div>;
}
window.NixApp = NixApp;
