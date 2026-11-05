// Shot Fungi Mati #125 · Ese hongo no está podrido: se pone azul al cortarlo — NARRADO (N1 Por dentro, gancho 1 "esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es guía de consumo.

const HA = {
  cafe:'#6b4325', cafe2:'#8a5a32', amarillo:'#f2cf3f', amarillo2:'#e0b524', poro:'#d9b52a', azul:'#1f4fd1', azulN:'#1b2560',
  paja:'#d9b77a', blanca:'#fbf6e6', satan:'#dcd6c6', rojo:'#c8242a', pieY:'#d8b23c', tejido:'#2a2140',
};

// Subtítulo con *resaltado* y _cursiva_ (nombres científicos). Mismo lugar y tiempos que Subtitulo del kit.
function Sub({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0,
      fontStyle: cur ? 'italic' : 'normal', background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Formas de un boleto (origen = base del pie). bulbo 0..1 engorda la base del pie (boleto de Satanás).
const bSomb = 'M -215 -240 C -215 -340 -120 -428 0 -430 C 120 -428 215 -340 215 -240 Q 215 -205 180 -205 L -180 -205 Q -215 -205 -215 -240 Z';
const bCarneSomb = 'M -196 -232 C -196 -322 -112 -404 0 -406 C 112 -404 196 -322 196 -232 L 196 -205 L -196 -205 Z';
const bPie = (k = 0) => `M -48 -205 C -55 -130 ${-80 - 50 * k} -70 ${-72 - 40 * k} -18 Q ${-60 - 30 * k} 0 0 0 Q ${60 + 30 * k} 0 ${72 + 40 * k} -18 C ${80 + 50 * k} -70 55 -130 48 -205 Z`;
const bTubos = 'M -196 -205 L 196 -205 Q 192 -176 160 -172 L 50 -172 L 48 -205 L -48 -205 L -50 -172 L -160 -172 Q -192 -176 -196 -205 Z';

// Boleto entero visto de lado. manchas = [[x, y, r, p]] (moretones azules). red = retícula roja del pie.
function BoletoExt({ T = 0, x, y, s = 1, rot = 0, somb = HA.cafe, brillo = HA.cafe2, poros = HA.poro, pie = HA.pieY, pieBase, red = false, bulbo = 0, manchas = [], azulM = HA.azulN, terciopelo = false, id = 'b' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><linearGradient id={`pie${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={pie} /><stop offset="100%" stopColor={pieBase || pie} /></linearGradient>
      <clipPath id={`cl${id}`}><path d={bPie(bulbo)} /><path d={bTubos} /><path d={bSomb} /></clipPath></defs>
    <path d={bPie(bulbo)} fill={`url(#pie${id})`} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {red && Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-60 - bulbo * 20 + i * 15} -30 L ${-30 + i * 9} -190`} stroke={HA.rojo} strokeWidth={4} opacity=".75" />)}
    {red && Array.from({ length: 8 }, (_, i) => <path key={'h' + i} d={`M ${-70 - bulbo * 30} ${-30 - i * 20} Q 0 ${-20 - i * 20} ${70 + bulbo * 30} ${-30 - i * 20}`} stroke={HA.rojo} strokeWidth={3} fill="none" opacity=".6" />)}
    <path d={bTubos} fill={poros} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={bSomb} fill={somb} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {terciopelo && Array.from({ length: 26 }, (_, i) => { const a = -Math.PI * (0.1 + 0.8 * ((i * 37) % 26) / 26), r = 120 + (i * 53) % 80; return <circle key={i} cx={Math.cos(a) * r} cy={-250 + Math.sin(a) * r * 0.75} r={3} fill="#fff" opacity=".35" />; })}
    <path d="M -140 -360 Q -60 -415 50 -410" stroke={brillo} strokeWidth={20} fill="none" strokeLinecap="round" opacity=".7" />
    <g clipPath={`url(#cl${id})`}>{manchas.map(([mx, my, r, p], i) => p > 0 ? <circle key={i} cx={mx} cy={my} r={r * kEase.sale(kclamp(p, 0, 1))} fill={azulM} opacity={0.85 * kclamp(p * 2, 0, 1)} /> : null)}</g>
  </g>;
}

// Boleto partido a lo largo (la cara del corte). azul 0..1 = la mancha azul crece desde el corte. hueco = cámaras del pie (Gyroporus).
function BoletoCorte({ x, y, s = 1, rot = 0, somb = HA.cafe, carne = HA.amarillo, tubos = HA.amarillo2, pie = HA.amarillo, azul = 0, colorAzul = HA.azul, hueco = false, espejo = false, id = 'c', bulbo = 0, mitad }) {
  const R = 30 + 520 * kEase.suave(kclamp(azul, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s} ${s})`}>
    <defs><clipPath id={`az${id}`}><circle cx={0} cy={-215} r={R} /></clipPath>
      <clipPath id={`mi${id}`}><rect x={mitad === 'der' ? 0 : -400} y={-500} width={mitad ? 400 : 800} height={560} /></clipPath></defs>
    <g clipPath={`url(#mi${id})`}>
    <path d={bPie(bulbo)} fill={pie} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={bSomb} fill={somb} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={bCarneSomb} fill={carne} />
    <path d={bTubos} fill={tubos} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => { const xx = -186 + i * 17.6; return Math.abs(xx) < 52 ? null : <line key={i} x1={xx} y1={-203} x2={xx} y2={-176} stroke="#9c7a12" strokeWidth={3} />; })}
    {azul > 0 && <g clipPath={`url(#az${id})`} opacity={0.15 + 0.85 * kclamp(azul * 1.6, 0, 1)}>
      <path d={bPie(bulbo)} fill={colorAzul} /><path d={bCarneSomb} fill={colorAzul} /><path d={bTubos} fill={mixHex(colorAzul, '#000000', 0.25)} />
    </g>}
    {hueco && [[-130, 26, 34], [-80, 30, 36], [-36, 28, 30]].map(([yy, rx, ry], i) => <ellipse key={i} cx={0} cy={yy} rx={rx} ry={ry} fill="#3a2a18" stroke={KC.ink} strokeWidth={4} opacity=".85" />)}
    <path d={bSomb} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={bPie(bulbo)} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {mitad && <line x1={0} y1={-440} x2={0} y2={4} stroke={KC.ink} strokeWidth={10} />}
    </g>
  </g>;
}

// Navaja que cruza en diagonal. p 0..1.
function Navaja({ p, x0, y0, x1, y1 }) {
  if (p <= 0 || p >= 1) return null;
  const x = klerp(x0, x1, p), y = klerp(y0, y1, p), a = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  return <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <path d="M -10 -14 L 190 -6 Q 230 0 190 8 L -10 14 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={6} />
    <path d="M 10 -6 L 180 -2" stroke="#fff" strokeWidth={4} opacity=".8" />
    <rect x={-170} y={-22} width={170} height={44} rx={16} fill="#5a3416" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Dedo que llega desde la derecha y toca en (x, y). p 0..1 (llega), sale 0..1.
function Dedo({ x, y, p = 1, sale = 0 }) {
  const dx = (1 - kEase.sale(p)) * 600 + sale * 600;
  return <g transform={`translate(${x + dx} ${y}) rotate(-8)`}>
    <rect x={0} y={-34} width={520} height={68} rx={34} fill="#f0b48a" stroke={KC.ink} strokeWidth={7} />
    <path d="M 14 -24 Q 4 0 14 24 L 60 24 Q 70 0 60 -24 Z" fill="#fde3d2" stroke={KC.ink} strokeWidth={4} />
    <path d="M 140 -30 Q 150 0 140 30 M 260 -30 Q 270 0 260 30" stroke="#c98a62" strokeWidth={4} fill="none" />
  </g>;
}

// Superficie de poros vista desde abajo.
function Poros({ x, y, r = 330, color = HA.poro, hoyo = '#a07e10' }) {
  const pts = [];
  for (let j = -12; j <= 12; j++) for (let i = -14; i <= 14; i++) { const px = i * 24 + (j % 2 ? 12 : 0), py = j * 21; if (Math.hypot(px, py / 0.62) < r - 20 && Math.hypot(px, py / 0.62) > 70) pts.push([px, py]); }
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.62} fill={color} stroke={KC.ink} strokeWidth={8} />
    {pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6.5} fill={hoyo} />)}
    <ellipse cx={0} cy={0} rx={62} ry={40} fill={HA.pieY} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Esponja({ x, y, s = 1 }) {
  const h = [[-60, -30, 14], [10, -40, 10], [60, -10, 16], [-30, 20, 12], [40, 40, 9], [-80, 40, 8], [90, -50, 8], [0, 10, 7]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-80} width={260} height={160} rx={26} fill="#ffe36a" stroke={KC.ink} strokeWidth={7} />
    {h.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#c9a52a" />)}
  </g>;
}

// Tejido del hongo por dentro: hifas horizontales con gotitas de pigmento. corte 0..1 abre una grieta en xc.
// azul 0..1 pinta el pigmento que salió. sale 0..1 = cuánto se derrama el pigmento.
const HIFAS = [800, 880, 960, 1040, 1120];
function Tejido({ T, corte = 0, azul = 0, sale = 0, xc = 540 }) {
  const g = 60 * kEase.sale(corte);
  return <g>
    {HIFAS.map((yy, j) => [0, 1].map((ld) => {
      const x0 = ld ? xc + g : 30, x1 = ld ? 1050 : xc - g, ond = Math.sin(T * 0.8 + j) * 4;
      return <g key={j + '-' + ld}>
        <rect x={x0} y={yy - 28 + ond} width={x1 - x0} height={56} rx={28} fill="rgba(255,240,200,.10)" stroke="#fff1c8" strokeWidth={5} />
        {[0.2, 0.45, 0.7].map((u, k) => <line key={k} x1={klerp(x0, x1, u)} y1={yy - 26 + ond} x2={klerp(x0, x1, u)} y2={yy + 26 + ond} stroke="#fff1c8" strokeWidth={4} opacity=".7" />)}
        {[0.1, 0.32, 0.58, 0.84].map((u, k) => <circle key={'g' + k} cx={klerp(x0, x1, u) + 18} cy={yy + ond + (k % 2 ? 6 : -6)} r={11} fill={HA.amarillo} />)}
      </g>; }))}
    {sale > 0 && HIFAS.map((yy, j) => [-1, 1].map((sg) => { const u = kEase.sale(sale), px = xc + sg * (g + 8 - 40 * u) * 0.5, py = yy + (j % 2 ? 1 : -1) * 18 * u - 30 * u;
      return <circle key={j + '' + sg} cx={px + sg * 6 * j * u} cy={py} r={13 + 4 * u} fill={mixHex(HA.amarillo, '#2f6bff', azul)} stroke={azul > 0.5 ? '#bcd0ff' : 'none'} strokeWidth={3} style={azul > 0.3 ? { filter:`drop-shadow(0 0 ${10 * azul}px #2f6bff)` } : null} />; }))}
  </g>;
}
// Molécula de O2 que baja.
function O2({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle cx={-16} cy={0} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><circle cx={16} cy={0} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#ffd2cc">O₂</text></g>;
}
// Enzima esquemática (masa con un hueco).
function Enzima({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2) * 6})`}>
    <path d="M -60 -40 Q -80 -80 -20 -80 Q 40 -90 60 -40 Q 80 10 50 50 Q 0 80 -50 50 Q -90 20 -60 -40 Z M -10 -20 Q 10 -40 30 -15 L 10 10 Z" fill={KC.mint} fillRule="evenodd" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Ácido pulvínico esquemático (anillo - lactona - anillo). color de los anillos; anion = signo "−".
function Pulvinico({ x, y, s = 1, color = HA.amarillo, anion = 0, T = 0 }) {
  const hexa = (cx, cy, r = 46) => Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const pent = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${i ? 'L' : 'M'} ${(44 * Math.cos(a)).toFixed(1)} ${(44 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={anion > 0.3 ? { filter:`drop-shadow(0 0 ${18 * anion}px #2f6bff)` } : null}>
    <line x1={-44} y1={10} x2={-110} y2={30} stroke={color} strokeWidth={9} /><line x1={44} y1={10} x2={110} y2={30} stroke={color} strokeWidth={9} />
    <path d={pent} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" />
    <path d={hexa(-150, 40)} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" />
    <path d={hexa(150, 40)} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" />
    {[[-196, 0], [-190, 86], [196, 0], [190, 86]].map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={13} fill={KC.red} /><text x={a + (a < 0 ? -22 : 22)} y={b + 8} textAnchor={a < 0 ? 'end' : 'start'} style={{ font:`700 24px ${KF.mono}` }} fill="#ffd2cc">OH</text></g>)}
    <circle cx={0} cy={-44} r={12} fill={KC.red} />
    {anion > 0 && <g transform={`translate(0 -110) scale(${kEase.rebote(kclamp(anion, 0, 1))})`}><circle r={34} fill="#2f6bff" stroke="#fff" strokeWidth={5} /><text y={14} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill="#fff">−</text></g>}
  </g>;
}
// Girocianina esquemática (otra forma: ciclopentenona con dos anillos).
function Girocianina({ x, y, s = 1, color = '#cfe0ff' }) {
  const hexa = (cx, cy, r = 40) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const pent = Array.from({ length: 5 }, (_, i) => { const a = Math.PI / 2 + i * 2 * Math.PI / 5; return `${i ? 'L' : 'M'} ${(40 * Math.cos(a)).toFixed(1)} ${(40 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={pent} fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" />
    <line x1={-38} y1={-12} x2={-80} y2={-50} stroke={color} strokeWidth={8} /><line x1={38} y1={-12} x2={80} y2={-50} stroke={color} strokeWidth={8} />
    <path d={hexa(-110, -80)} fill="none" stroke={color} strokeWidth={9} /><path d={hexa(110, -80)} fill="none" stroke={color} strokeWidth={9} />
    <line x1={0} y1={40} x2={0} y2={80} stroke={color} strokeWidth={8} /><circle cx={0} cy={92} r={12} fill={KC.red} />
  </g>;
}
// Calavera simple.
function Calavera({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 Q -80 -100 0 -105 Q 80 -100 70 0 Q 66 30 40 36 L 40 60 L -40 60 L -40 36 Q -66 30 -70 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-30} cy={-20} r={20} fill={KC.ink} /><circle cx={30} cy={-20} r={20} fill={KC.ink} />
    <path d="M 0 0 L -10 20 L 10 20 Z" fill={KC.ink} />
  </g>;
}
// Canasta.
function Canasta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -180 -120 Q 0 -330 180 -120" stroke="#8a5a2a" strokeWidth={18} fill="none" />
    <path d="M -200 -120 L 200 -120 L 160 40 L -160 40 Z" fill="#c98b4a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-80, -40, 0].map((yy, i) => <line key={i} x1={-190 + i * 12} y1={yy} x2={190 - i * 12} y2={yy} stroke="#8a5a2a" strokeWidth={6} />)}
    {[-120, -40, 40, 120].map((xx, i) => <line key={'v' + i} x1={xx} y1={-120} x2={xx * 0.8} y2={40} stroke="#8a5a2a" strokeWidth={6} />)}
  </g>;
}

function HongoAzulShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bo: CUES.Boleto, To: CUES.Toque, Pi: CUES.Pigmento, Co: CUES.Corte, Ox: CUES.Oxida, P: CUES.Pregunta, E: CUES.Estudio, R: CUES.Respuesta, Av: CUES.Aviso, D: CUES.DatoExtra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const corte0 = kprog(T, K.G + 0.15, K.G + 0.6);                 // la navaja cruza
  const abre = kprog(T, K.G + 0.55, K.G + 1.1, kEase.sale);        // se separan las mitades
  const azul0 = kprog(T, K.G + 0.8, K.G + 3.8);                    // se azula desde el corte
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: lo cortan y se pone azul */}
      <Escena T={T} a={K.G} b={K.Bo} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <ellipse cx={360} cy={1125} rx={300} ry={36} fill="#5b3a22" opacity=".55" />
          {abre <= 0 && <BoletoExt x={360} y={1120} s={1.05} id="g0" rot={Math.sin(T * 6) * 1.5} />}
          {abre > 0 && <>
            <BoletoCorte x={360 - 45 * abre} y={1120} s={1.05} rot={-5 * abre} id="gL" azul={azul0} mitad="izq" />
            <BoletoCorte x={360 + 45 * abre} y={1120} s={1.05} rot={5 * abre} id="gR" azul={azul0} mitad="der" />
          </>}
          <Navaja p={corte0} x0={360} y0={560} x1={330} y1={1160} />
        </>)}
      </Escena>
      {/* 2 · es un boleto: poros, no láminas */}
      <Escena T={T} a={K.Bo} b={K.To} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={`translate(0 ${(1 - kprog(T, K.Bo, K.Bo + 0.8, kEase.sale)) * 120})`}><Poros x={440} y={830} r={350} /></g>
          <g opacity={kprog(T, K.Bo + 1.8, K.Bo + 2.3)}><Esponja x={800} y={1130} s={kclamp(kprog(T, K.Bo + 1.8, K.Bo + 2.4, kEase.rebote), 0.01, 1)} /></g>
        </>)}
      </Escena>
      {/* 3 · Cyanoboletus pulverulentus: con solo tocarlo */}
      <Escena T={T} a={K.To} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <BoletoExt x={330} y={1130} s={1.25} id="cy" somb="#4e321e" brillo="#7a5232" poros={HA.poro} pie={HA.pieY} pieBase="#a8532a"
            manchas={[[60, -120, 60, kprog(T, K.To + 1.2, K.To + 2.2)], [120, -190, 40, kprog(T, K.To + 2.6, K.To + 3.4)], [150, -188, 46, kprog(T, K.To + 2.7, K.To + 3.6)]]} />
          <Dedo x={330 + 60 * 1.25 + 30} y={1130 - 120 * 1.25} p={kprog(T, K.To + 0.4, K.To + 1.1)} sale={kprog(T, K.To + 1.6, K.To + 2.1)} />
          <Dedo x={330 + 150 * 1.25 + 30} y={1130 - 190 * 1.25} p={kprog(T, K.To + 2.1, K.To + 2.6)} sale={kprog(T, K.To + 3.2, K.To + 3.7)} />
        </>)}
      </Escena>
      {/* 4 · por dentro: el pigmento en las células (fondo oscuro) */}
      <Escena T={T} a={K.Pi} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <g opacity={kprog(T, K.Pi, K.Pi + 0.8)}><Tejido T={T} /></g>
          <g opacity={kprog(T, K.Pi + 2.6, K.Pi + 3.2)}><Pulvinico x={460} y={600} s={kclamp(kprog(T, K.Pi + 2.6, K.Pi + 3.3, kEase.rebote), 0.01, 1) * 0.9} /></g>
        </>)}
      </Escena>
      {/* 5 · el corte: células rotas, enzima y oxígeno */}
      <Escena T={T} a={K.Co} b={K.Ox} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Tejido T={T} corte={kprog(T, K.Co + 0.6, K.Co + 1.2)} sale={kprog(T, K.Co + 1.0, K.Co + 2.2)} azul={kprog(T, K.Co + 3.8, K.Co + 5.2)} />
          <Navaja p={kprog(T, K.Co + 0.3, K.Co + 1.0)} x0={540} y0={700} x1={540} y1={1200} />
          {[[380, 0], [600, 0.3], [480, 0.6], [700, 0.9], [300, 1.1]].map(([ox, d], i) => { const u = kprog(T, K.Co + 2.0 + d, K.Co + 3.6 + d, kEase.sale);
            return u > 0 ? <O2 key={i} x={ox + (540 - ox) * u * 0.55} y={560 + 300 * u} s={0.9} /> : null; })}
          {(() => { const u = kprog(T, K.Co + 3.0, K.Co + 3.8, kEase.rebote); return u > 0 ? <Enzima x={560} y={735} s={u * 0.85} T={T} /> : null; })()}
        </>)}
      </Escena>
      {/* 6 · se oxida: anión azul */}
      <Escena T={T} a={K.Ox} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(120,160,255,.4)" />
        {fsvg(<>
          {(() => { const c = kprog(T, K.Ox + 0.4, K.Ox + 1.6); return <Pulvinico x={540} y={900} s={1.35} color={mixHex(HA.amarillo, '#4f8bff', c)} anion={kprog(T, K.Ox + 1.4, K.Ox + 2.0)} />; })()}
          {Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.Ox + 0.4 + i * 0.07, K.Ox + 1.2 + i * 0.07); const a = i * 0.63;
            return u > 0 && u < 1 ? <circle key={i} cx={540 + Math.cos(a) * (120 + 260 * u)} cy={900 + Math.sin(a) * (80 + 200 * u)} r={10 * (1 - u)} fill="#cfe0ff" /> : null; })}
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿veneno? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <BoletoCorte x={250} y={1130} s={0.95} id="pq" azul={1} mitad="izq" /><BoletoCorte x={330} y={1130} s={0.95} id="pq2" azul={1} mitad="der" />
          <g transform={`translate(260 ${560 + Math.sin(T * 4) * 10})`}><Calavera x={0} y={0} s={1.1} /></g>
          <text x={400} y={520} style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>?</text>
        </>)}
      </Escena>
      {/* 8 · el estudio de 1968: varias especies de boletos */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.E + 2.0, K.E + 2.6)}><Pulvinico x={600} y={900} s={0.7} color={mixHex(HA.amarillo, '#2f6bff', kprog(T, K.E + 3.0, K.E + 3.8))} anion={kprog(T, K.E + 3.6, K.E + 4.0)} /></g>
          {[0, 1, 2, 3].map((i) => { const on = kprog(T, K.E + 4.0 + i * 0.25, K.E + 4.4 + i * 0.25, kEase.rebote); return on > 0 ?
            <BoletoCorte key={i} x={170 + i * 245} y={1165} s={0.4 * on} id={'e' + i} azul={kprog(T, K.E + 4.6 + i * 0.25, K.E + 6.4 + i * 0.25)} somb={['#6b4325', '#8a3a22', '#a5763a', '#5a4030'][i]} /> : null; })}
        </>)}
      </Escena>
      {/* 9 · el color no dice si se come */}
      <Escena T={T} a={K.R} b={K.Av}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={kprog(T, K.R + 1.6, K.R + 2.2)}><BoletoCorte x={270} y={1150} s={0.8} id="r1" azul={kprog(T, K.R + 1.8, K.R + 3.4)} somb="#7a4a22" /></g>
          <g opacity={kprog(T, K.R + 3.2, K.R + 3.8)}><BoletoExt x={790} y={1150} s={0.8} id="sat" somb={HA.satan} brillo="#f2eee4" poros={HA.rojo} pie="#e8c04a" pieBase="#c8242a" red bulbo={0.6} terciopelo
            manchas={[[20, -100, 50, kprog(T, K.R + 4.4, K.R + 5.6)]]} azulM="#3a63c8" /></g>
          <g opacity={kprog(T, K.R + 5.6, K.R + 6.0)}><Sello T={T} at={K.R + 5.6} x={290} y={590} texto="NO DICE" color={KC.red} r={115} rot={-8} /></g>
        </>)}
      </Escena>
      {/* 10 · aviso: no comas silvestres sin experto */}
      <Escena T={T} a={K.Av} b={K.D}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Canasta x={420} y={1150} s={1.1} />
          <BoletoExt x={330} y={1030} s={0.42} id="cn1" /><BoletoExt x={480} y={1040} s={0.38} id="cn2" somb={HA.satan} poros={HA.rojo} />
          {(() => { const u = kprog(T, K.Av + 0.6, K.Av + 1.4, kEase.sale); return <g transform={`translate(${klerp(1100, 560, u)} 840) rotate(-20)`}>
            <circle r={110} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={14} /><line x1={80} y1={80} x2={170} y2={170} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" /></g>; })()}
        </>)}
      </Escena>
      {/* 11 · dato extra: Gyroporus cyanescens, otra molécula */}
      <Escena T={T} a={K.D} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <BoletoExt x={240} y={1150} s={0.75} id="gy" somb={HA.paja} brillo="#f0d7a4" poros="#f3ecd6" pie="#e6cf9a" terciopelo />
          <BoletoCorte x={620} y={1150} s={0.75} id="gyc" somb={HA.paja} carne={HA.blanca} tubos="#efe6cc" pie={HA.blanca} hueco azul={kprog(T, K.D + 0.8, K.D + 2.6)} colorAzul="#2a5be0" />
          <g opacity={kprog(T, K.D + 2.4, K.D + 2.9)}><g transform="translate(0 0)"><rect x={70} y={540} width={420} height={270} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={6} />
            <Girocianina x={280} y={700} s={0.95} /></g></g>
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo boleto del inicio, ya azul */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <ellipse cx={360} cy={1125} rx={300} ry={36} fill="#5b3a22" opacity=".55" />
          <BoletoCorte x={315} y={1120} s={1.05} rot={-5} id="cL" azul={1} mitad="izq" />
          <BoletoCorte x={405} y={1120} s={1.05} rot={5} id="cR" azul={1} mitad="der" />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.Bo - 0.3} texto="no está podrido" x={300} y={420} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 2.0} until={K.Bo - 0.3} x={60} y={500} texto="se azula desde el corte" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Bo + 0.8} until={K.To - 0.3} x={60} y={430} texto="boleto: poros, no láminas" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Bo + 2.2} until={K.To - 0.3} x={560} y={1010} texto="como esponja" tam={32} color={KC.ink} />
      <Etq T={T} at={K.To + 0.3} until={K.Pi - 0.3} x={60} y={430} texto="Cyanoboletus pulverulentus" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.To + 1.6} until={K.Pi - 0.3} texto="azul casi negro al tocarlo" x={360} y={520} tam={36} borde={HA.azulN} />
      <Chip T={T} at={K.Pi + 0.1} until={K.Co - 0.3} texto="POR DENTRO · CÉLULAS (HIFAS)" x={400} y={420} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pi + 1.0} until={K.Co - 0.3} x={60} y={735} texto="pigmento (aún no es azul)" tam={30} color={HA.amarillo} />
      <Etq T={T} at={K.Pi + 3.0} until={K.Co - 0.3} x={60} y={490} texto="ácido variegático" tam={32} color={HA.amarillo} />
      <Etq T={T} at={K.Pi + 3.6} until={K.Co - 0.3} x={60} y={535} texto="o su pariente, el xerocómico" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Co + 1.0} until={K.Ox - 0.3} x={60} y={735} texto="células rotas" tam={30} color="#fff1c8" />
      <Etq T={T} at={K.Co + 2.2} until={K.Ox - 0.3} x={60} y={430} texto="oxígeno del aire" tam={32} color="#ffd2cc" />
      <Etq T={T} at={K.Co + 3.2} until={K.Ox - 0.3} x={60} y={480} texto="+ enzima" tam={32} color={KC.mint} />
      <Chip T={T} at={K.Ox + 1.2} until={K.P - 0.3} texto="se oxida → anión azul" x={540} y={560} tam={44} borde="#2f6bff" />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.R - 0.3} anio="1968" quien="Beaumont, Edwards y Elsworthy" revista="J. Chem. Soc. C (Londres) · «The blueing of Boletus species»" x={540} y={540} />
      <Etq T={T} at={K.E + 2.4} until={K.R - 0.3} x={60} y={810} texto="ácido variegático" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 4.4} until={K.R - 0.3} x={700} y={810} texto="varias especies" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 0.4} until={K.R + 5.6} texto="¿se come? el azul no lo dice" x={540} y={430} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.R + 2.2} until={K.Av - 0.3} x={60} y={775} texto="unos: comestibles" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 3.8} until={K.Av - 0.3} x={500} y={560} texto="Rubroboletus satanas" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.R + 4.1} until={K.Av - 0.3} x={500} y={605} texto="boleto de Satanás: intoxica" tam={26} color={KC.red} />
      <Chip T={T} at={K.R + 6.0} until={K.Av - 0.3} texto="no es veneno… pero tampoco es permiso" x={540} y={430} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Av + 0.3} until={K.D - 0.3} texto="¿Silvestre? Solo con experto" x={330} y={430} tam={34} borde={KC.red} />
      <Etq T={T} at={K.D + 0.3} until={K.C - 0.3} x={60} y={430} texto="Gyroporus cyanescens" it tam={36} color={KC.ink} />
      <Etq T={T} at={K.D + 1.2} until={K.C - 0.3} x={60} y={480} texto="pie hueco, con cámaras" tam={26} color={KC.ink} />
      <Chip T={T} at={K.D + 2.6} until={K.C - 0.3} texto="otra molécula: girocianina" x={770} y={640} tam={32} borde="#2a5be0" />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="no es podrido: es química" x={330} y={420} tam={42} borde="#2f6bff" />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={60} y={520} texto="pigmento + oxígeno + enzima" tam={28} color={KC.ink} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={60} y={1470} texto="No es guía de consumo: no comas hongos" tam={22} color={KC.ink} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={60} y={1505} texto="silvestres sin que un experto los identifique." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Bo} texto="5 cm" largo={120} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.Bo} until={K.To} texto="1 cm" largo={170} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.To} until={K.Pi} texto="5 cm" largo={125} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.Pi} until={K.Ox} texto="10 µm" largo={160} y={1560} />
      <BarraEscala T={T} at={K.Ox} until={K.P} texto="molécula esquemática" largo={0} y={1560} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={95} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.R} texto="esquemático" largo={0} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.Av} texto="5 cm" largo={85} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="5 cm" largo={85} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={120} y={1560} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.Bo - 0.1} texto="No está podrido: *se pone azul.*" />
      <Sub T={T} idx={1} at={K.Bo + 0.1} until={K.To - 0.1} texto="Un boleto: *poros,* no láminas." />
      <Sub T={T} idx={2} at={K.To + 0.1} until={K.Pi - 0.1} texto="_Cyanoboletus:_ lo tocas y *se pinta.*" />
      <Sub T={T} idx={3} at={K.Pi + 0.1} until={K.Co - 0.1} texto="Un pigmento que *aún no es azul.*" />
      <Sub T={T} idx={4} at={K.Co + 0.1} until={K.Ox - 0.1} texto="Células rotas + *enzima + oxígeno.*" />
      <Sub T={T} idx={5} at={K.Ox + 0.1} until={K.P - 0.1} texto="Se oxida: *anión azul.*" />
      <Sub T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿El azul es *señal de veneno?*" />
      <Sub T={T} idx={7} at={K.E + 0.1} until={K.R - 0.1} texto="1968: el *ácido variegático* azula boletos." />
      <Sub T={T} idx={8} at={K.R + 0.1} until={K.Av - 0.1} texto="El color *no dice* si se come." />
      <Sub T={T} idx={9} at={K.Av + 0.1} until={K.D - 0.1} texto="Silvestres: *solo con un experto.*" />
      <Sub T={T} idx={10} at={K.D + 0.1} until={K.C - 0.1} texto="_Gyroporus:_ otra molécula, *girocianina.*" />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No está podrido: *es química.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.To + 0.6, K.To + 4.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Co + 0.6, K.Co + 4.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.4, K.R + 3.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Av + 0.2, K.Av + 3.7, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.D + 0.5, K.D + 2.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="125" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HongoAzulApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HongoAzulShot /></CompositionStage></div>;
}
window.HongoAzulApp = HongoAzulApp;
