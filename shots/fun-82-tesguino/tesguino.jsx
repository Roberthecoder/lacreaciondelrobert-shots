// Shot Fungi Mati #82 · Esa olla no es solo maíz con agua: es una fábrica de hongos — NARRADO (gancho 1 «Esto no es X: es Y»).
// El tesgüino rarámuri: maíz germinado (malta) → atole → ollas de barro → levaduras. Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. Tono respetuoso: la ciencia de la fermentación y el conocimiento rarámuri; no promueve el alcohol.

/* ===================== TEXTOS EN PANTALLA (cámbialos aquí) =====================
   Todo lo que se lee en el video vive en este bloque, para corregir rápido tras la verificación.
   En los subtítulos: *palabra* = resaltada en dorado · _palabra_ = cursiva (nombres científicos). */
const TX = {
  nombre: 'tesgüino',
  nombreRaramuri: 'en rarámuri: suguiki o bátari',
  lugar: 'Sierra Tarahumara · Chihuahua',
  dias: ['día 1', 'día 5'],
  brote: 'brote pálido: crece a oscuras',
  porDentroGrano: 'POR DENTRO · EL GRANO',
  almidon: 'almidón',
  enzimas: 'enzimas (amilasas)',
  azucar: 'azúcar',
  malta: 'eso es malta',
  metate: 'metate',
  horas: 'se cuece por horas',
  porDentroOlla: 'AL MICROSCOPIO · LA OLLA',
  levadura: 'Saccharomyces cerevisiae',
  levaduraComun: 'levadura (un hongo)',
  otras: 'también Candida, Hansenula…',
  lacticas: 'y bacterias lácticas: lo agrio',
  co2: 'CO₂',
  etanol: 'alcohol',
  fases: '4 fases: cuánto burbujea y qué le agregan',
  fasesLista: ['lento', 'rápido: se agrega el pasto', 'leve → fuerte: atole nuevo', 'quieto'],
  noSeLavan: 'no se lavan',
  costra: 'sedimento de tandas anteriores',
  ciclo: 'tanda anterior → tanda nueva',
  estudioAnio: '1981',
  estudioQuien: 'Patricia Lappe · UNAM',
  estudioDonde: 'Gonogochi, cerca de Creel · tesis de 1988',
  fuenteSedimento: 'principal fuente: el sedimento',
  delSedimento: 'S. cerevisiae · Hansenula · Brettanomyces',
  etanolDato: 'a las 50 h: 3.7 % de alcohol',
  pastoComun: 'basiawi',
  pasto: 'Bromus arizonicus',
  yodo: 'prueba de enzimas',
  sinEnzimas: 'enzimas: no detectadas',
  hipotesis: 'hipótesis: ¿factores de crecimiento?',
  sagrada: 'bebida sagrada',
  pago: 'pago del trabajo en comunidad',
  sobreDe: 'R. Bye · Harvard',
  sobrePara: 'Micología · UNAM',
  sobreAnio: 'publicado en 1973',
  noSoyYo: '(no soy yo)',
  bye: 'R. Bye trabajaba con los rarámuri',
  saber: 'conocimiento rarámuri',
  fabrica: 'fábrica de hongos',
  tandas: 'de tanda en tanda',
};
// Subtítulos (idx = línea de narracion.json)
const SUBT = [
  'No es solo maíz con agua: *es una fábrica de hongos.*',
  'Primero, el maíz *germina a oscuras.*',
  'Sus enzimas vuelven el almidón *azúcar: malta.*',
  'Molido, cocido… *así nace el tesgüino.*',
  'Las levaduras comen azúcar: *alcohol y burbujas.*',
  'Quien cuida las ollas *lee las burbujas.*',
  '¿De dónde salen *esas levaduras?*',
  'Las ollas *no se lavan.*',
  '1981: venían sobre todo *del sedimento de la olla.*',
  'El pasto _Bromus:_ *¿para qué sirve?*',
  'Bebida sagrada y *pago del trabajo en comunidad.*',
  'Las muestras de su primera levadura… *las mandó un Robert.*',
  'Una fábrica de hongos *que se hereda de tanda en tanda.*',
];

/* ===================== COLORES Y PIEZAS ===================== */
const TG = { barro:'#b8582c', barro2:'#8f3f1e', barro3:'#d9804e', borde:'#5a2410', atole:'#ecc75a', atole2:'#d9a93a', costra:'#7a4a22',
  maiz:'#f2b631', maiz2:'#fbe38a', raiz:'#fffaf0', brote:'#e9df86', piedra:'#8d8a84', piedra2:'#6d6a64', lienzo:'#fbf8f0',
  almidon:'#f4efe4', azucar:'#F4C25A', enzima:'#ff2d78', yodo:'#4b2a7a', pasto:'#c8b46a', pasto2:'#9c8a45' };

// Subtítulo con cursivas (_palabra_) además del resaltado (*palabra*). Mismos tiempos que el Subtitulo del kit (window.SUBS en la narrada).
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 60 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('_')) { p = p.replace('_', ''); it = false; } if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Texto libre en pantalla (bloque con sombra), alineado a la izquierda o centrado. it = cursiva.
function Rotulo({ T, at, until, x, y, texto, tam = 34, color = KC.texto, it = false, centro = false, fondo }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translate(${centro ? '-50%' : 0}, -50%) translateY(${e.y * 0.5}px)`,
    font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color, whiteSpace:'nowrap', textShadow: fondo ? 'none' : '0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)',
    background:fondo, padding: fondo ? '8px 18px' : 0, borderRadius:14 }}>{texto}</div>;
}

// Olla tesgüinera de barro (panzona, boca ancha). Base en (x, y), alto ≈ 380·s.
// burb = burbujas por segundo en la superficie · lienzo 0..1 = tapada con un lienzo blanco · corte = vista en corte (vacía, con costra).
function Olla({ T = 0, x, y, s = 1, burb = 0, lienzo = 0, lienzoSube = 0, corte = false, costra = 0, id = 'o1', liquido = true }) {
  const cuerpo = 'M -130 -368 Q -150 -320 -205 -272 Q -268 -195 -236 -100 Q -205 -12 -110 0 L 110 0 Q 205 -12 236 -100 Q 268 -195 205 -272 Q 150 -320 130 -368 Z';
  const dentro = 'M -112 -360 Q -130 -312 -182 -264 Q -238 -192 -210 -108 Q -184 -34 -100 -24 L 100 -24 Q 184 -34 210 -108 Q 238 -192 182 -264 Q 130 -312 112 -360 Z';
  const g = krng(7), bur = [];
  if (burb > 0 && !corte) for (let i = 0; i < 9; i++) { const ph = ((T * burb * 0.35) + i * 0.37 + g()) % 1; const cx = -100 + ((i * 53) % 200); const cy = -372 + ((i * 17) % 20) - 8;
    bur.push(<circle key={i} cx={cx} cy={cy} r={4 + 12 * ph} fill="none" stroke="#fff6d0" strokeWidth={4} opacity={(1 - ph) * kclamp(burb / 1.5, 0.35, 1)} />); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={210} ry={22} fill="rgba(0,0,0,.25)" />
    <defs>
      <linearGradient id={id + 'g'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={TG.barro2} /><stop offset=".35" stopColor={TG.barro3} /><stop offset=".7" stopColor={TG.barro} /><stop offset="1" stopColor={TG.barro2} /></linearGradient>
      <clipPath id={id + 'c'}><path d={dentro} /></clipPath>
    </defs>
    <path d={cuerpo} fill={`url(#${id}g)`} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {corte ? <>
      <path d={dentro} fill="#3a1d0e" stroke={TG.borde} strokeWidth={5} />
      <g clipPath={`url(#${id}c)`}>
        {/* costra (sedimento de tandas anteriores) pegada a la pared y al fondo */}
        <path d={dentro} fill="none" stroke={TG.costra} strokeWidth={42 * costra} opacity={costra} />
        {Array.from({ length: 26 }, (_, i) => { const a = i / 25; const px = klerp(-200, 200, a), py = -40 - Math.pow(Math.abs(a - 0.5) * 2, 2.2) * 230;
          return <circle key={i} cx={px} cy={py} r={(9 + (i % 4) * 4) * costra} fill={i % 3 ? '#9a6532' : '#5e3818'} opacity={costra} />; })}
      </g>
    </> : <>
      <path d="M -190 -250 Q -238 -170 -214 -110" stroke="#f0b088" strokeWidth={16} fill="none" opacity=".5" strokeLinecap="round" />
      <path d="M -218 -205 Q 0 -165 218 -205" stroke={TG.borde} strokeWidth={5} fill="none" opacity=".55" />
      <path d="M -224 -180 Q 0 -140 224 -180" stroke={TG.borde} strokeWidth={3} fill="none" opacity=".4" strokeDasharray="10 12" />
    </>}
    <ellipse cx={0} cy={-370} rx={150} ry={32} fill={TG.barro} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-370} rx={124} ry={22} fill={corte ? '#2a1408' : (liquido ? TG.atole : '#3a1d0e')} stroke={TG.borde} strokeWidth={4} />
    {bur}
    {lienzo > 0 && <g opacity={lienzo * (1 - kclamp(lienzoSube * 1.6 - 0.6, 0, 1))} transform={`translate(${lienzoSube * 160} ${-lienzoSube * 260}) rotate(${lienzoSube * 25} 0 -370)`}>
      <path d="M -168 -372 Q -120 -410 -40 -398 Q 20 -414 80 -400 Q 140 -410 170 -372 Q 180 -320 160 -300 Q 120 -330 80 -312 Q 30 -336 -20 -312 Q -80 -334 -120 -310 Q -170 -322 -168 -372 Z" fill={TG.lienzo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -80 -396 Q -86 -350 -96 -320 M 30 -404 Q 34 -360 30 -322 M 120 -398 Q 130 -350 124 -318" stroke="#d8d2c2" strokeWidth={4} fill="none" />
    </g>}
  </g>;
}
// Grano de maíz (forma de diente) con raicilla (raiz 0..1) y brote pálido (brote 0..1: germinado a oscuras, sin verde).
function Grano({ x, y, s = 1, rot = 0, raiz = 0, brote = 0, T = 0, seed = 1 }) {
  const m = mece(T, seed, 0.3) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {raiz > 0 && <path d={`M 0 30 Q ${8 + m} ${30 + 40 * raiz} ${-6 + m} ${30 + 80 * raiz}`} stroke={TG.raiz} strokeWidth={7} fill="none" strokeLinecap="round" />}
    {raiz > 0.4 && <path d={`M 2 46 Q ${18 + m} ${60 + 20 * raiz} ${22 + m} ${70 + 30 * raiz}`} stroke={TG.raiz} strokeWidth={4} fill="none" strokeLinecap="round" opacity={raiz} />}
    {brote > 0 && <path d={`M 0 -28 Q ${-10 + m} ${-28 - 60 * brote} ${4 + m} ${-28 - 120 * brote}`} stroke={TG.brote} strokeWidth={11} fill="none" strokeLinecap="round" />}
    <path d="M -24 30 Q -32 -8 -20 -32 Q 0 -44 20 -32 Q 32 -8 24 30 Q 0 40 -24 30 Z" fill={TG.maiz} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={10} rx={11} ry={17} fill={TG.maiz2} />
    <path d="M -14 -26 Q -4 -32 8 -28" stroke="#fff" strokeWidth={4} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
// Cadena de almidón: cuentas unidas; corte 0..1 = la enzima va cortando (las cuentas se sueltan y se vuelven azúcar).
function CadenaAlmidon({ T, x, y, n = 9, paso = 62, corte = 0, seed = 1 }) {
  const ex = x + corte * (n - 1) * paso;
  return <g>
    {Array.from({ length: n }, (_, j) => { const libre = kclamp((ex - (x + j * paso)) / paso + 0.2, 0, 1);
      const cx = x + j * paso + mece(T, seed * 9 + j, 0.4) * 18 * libre, cy = y + (j % 2) * 16 + mece(T, seed * 5 + j, 0.35) * 30 * libre - libre * 20;
      return <g key={j}>
        {j > 0 && <line x1={x + (j - 1) * paso} y1={y + ((j - 1) % 2) * 16} x2={x + j * paso} y2={y + (j % 2) * 16} stroke={TG.almidon} strokeWidth={6} opacity={1 - libre} />}
        <circle cx={cx} cy={cy} r={18} fill={mixHex(TG.almidon, TG.azucar, libre)} stroke={KC.ink} strokeWidth={4} />
      </g>; })}
    {corte > 0 && corte < 1 && <Enzima x={ex} y={y + 8} T={T} />}
  </g>;
}
// Enzima esquemática: «tijera» que muerde (círculo con boca que abre y cierra).
function Enzima({ x, y, T, r = 30 }) {
  const b = 0.35 + 0.3 * Math.abs(Math.sin(T * 12));
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 L ${r * Math.cos(b)} ${-r * Math.sin(b)} A ${r} ${r} 0 1 0 ${r * Math.cos(b)} ${r * Math.sin(b)} Z`} fill={TG.enzima} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-r * 0.25} cy={-r * 0.45} r={4} fill={KC.ink} />
  </g>;
}
// Metate (piedra inclinada de tres patas) con su mano que va y viene.
function Metate({ T, x, y, s = 1, muele = 0 }) {
  const ida = Math.sin(T * 7) * 60 * muele;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -40 L 230 -110 L 240 -80 L -225 -8 Z" fill={TG.piedra} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -200 -12 L -190 60 L -160 60 L -165 -16 Z M 190 -86 L 200 40 L 228 40 L 222 -90 Z M 10 -46 L 16 50 L 44 50 L 40 -50 Z" fill={TG.piedra2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <g transform={`translate(${ida} ${-ida * 0.15}) rotate(-9)`}>
      <rect x={-40} y={-112} width={80} height={56} rx={28} fill="#a7a49d" stroke={KC.ink} strokeWidth={7} />
      <rect x={-140} y={-100} width={280} height={34} rx={17} fill="#a7a49d" stroke={KC.ink} strokeWidth={7} />
    </g>
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-150 + i * 26} cy={-40 - i * 6 + (i % 2) * 6} r={8} fill={TG.atole2} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Fuego (leña con flamas que bailan).
function Fuego({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => <rect key={k} x={-120} y={-14} width={240} height={28} rx={14} fill="#6b3d1a" stroke={KC.ink} strokeWidth={6} transform={`rotate(${k * 12})`} />)}
    {[[-50, 1.0, KC.orange], [0, 1.3, KC.red], [50, 0.9, KC.yellow], [-15, 0.7, KC.yellow]].map(([dx, h, c], i) =>
      <path key={i} d={`M ${dx - 34} -6 Q ${dx - 30 + mece(T, i, 1.2) * 10} ${-90 * h} ${dx + mece(T, i + 4, 1.4) * 14} ${-150 * h} Q ${dx + 30} ${-80 * h} ${dx + 34} -6 Z`} fill={c} stroke={KC.ink} strokeWidth={5} opacity=".95" />)}
  </g>;
}
// Vapor que sube.
function Vapor({ T, x, y, n = 4 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const ph = (T * 0.5 + i / n) % 1; return <path key={i} d={`M ${x + (i - n / 2) * 40} ${y - ph * 200} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={(1 - ph) * 0.6} />; })}</g>;
}
// Canasta-colador tejida.
function Canasta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -60 L 150 -60 L 100 40 L -100 40 Z" fill="#d9a65a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-110, -60, -10, 40, 90].map((dx) => <line key={dx} x1={dx} y1={-60} x2={dx * 0.7 + 4} y2={40} stroke="#9a6a2a" strokeWidth={5} />)}
    {[-30, 0, 25].map((dy) => <line key={dy} x1={-140 + (dy + 60) * 0.4} y1={dy} x2={140 - (dy + 60) * 0.4} y2={dy} stroke="#9a6a2a" strokeWidth={5} />)}
  </g>;
}
// Burbuja de CO₂ (contorno) y molécula de alcohol (dos carbonos + OH), esquemáticas.
function Etanol({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <line x1={-22} y1={0} x2={22} y2={0} stroke={KC.texto} strokeWidth={6} /><line x1={22} y1={0} x2={44} y2={-18} stroke={KC.texto} strokeWidth={6} />
    <circle cx={-22} cy={0} r={14} fill="#555" stroke={KC.texto} strokeWidth={3} /><circle cx={22} cy={0} r={14} fill="#555" stroke={KC.texto} strokeWidth={3} />
    <circle cx={46} cy={-20} r={13} fill={KC.red} stroke={KC.texto} strokeWidth={3} />
  </g>;
}
// Pasto Bromus arizonicus: tallo erguido con panícula contraída; espiguillas ERGUIDAS (ascendentes), elípticas y muy aplanadas,
// con aristas rectas (ficha: «Seedhead droops: No», «strongly laterally compressed», arista subapical recta). Base en (x, y).
function Bromus({ T, x, y, s = 1, seed = 2 }) {
  const m = mece(T, seed, 0.25) * 6;
  const esp = [[-520, 0, 0], [-470, -1, 22], [-470, 1, 22], [-405, -1, 40], [-405, 1, 40], [-340, -1, 30], [-340, 1, 30], [-280, -1, 18]];
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m * 0.4})`}>
    <path d="M 0 0 L 0 -540" stroke={TG.pasto2} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 0 -40 Q -70 -110 -96 -210" stroke="#7fa04a" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 4 -120 Q 70 -190 92 -280" stroke="#7fa04a" strokeWidth={10} fill="none" strokeLinecap="round" />
    {esp.map(([yy, lado, dx], i) => { const bx = lado * dx, ang = lado * 16;
      return <g key={i}>
        {lado !== 0 && <line x1={0} y1={yy + 40} x2={bx} y2={yy} stroke={TG.pasto2} strokeWidth={4} />}
        <g transform={`translate(${bx} ${yy}) rotate(${ang})`}>
          <path d="M 0 0 Q 17 -48 0 -104 Q -17 -48 0 0 Z" fill={TG.pasto} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
          <line x1={0} y1={-6} x2={0} y2={-98} stroke={TG.pasto2} strokeWidth={3} />
          {[-22, -44, -66, -86].map((q) => <g key={q}>
            <path d={`M -11 ${q + 8} L 0 ${q} L 11 ${q + 8}`} stroke={TG.pasto2} strokeWidth={3} fill="none" />
            <line x1={lado >= 0 ? 6 : -6} y1={q} x2={lado >= 0 ? 16 : -16} y2={q - 26} stroke={TG.pasto2} strokeWidth={2.5} />
          </g>)}
          <line x1={0} y1={-104} x2={0} y2={-136} stroke={TG.pasto2} strokeWidth={2.5} />
        </g>
      </g>; })}
  </g>;
}
// Tubo de ensayo con líquido (color).
function Tubo({ x, y, s = 1, color = TG.yodo, nivel = 0.6 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -40 ${-300 + 300 * (1 - nivel)} L -40 -40 Q -40 0 0 0 Q 40 0 40 -40 L 40 ${-300 + 300 * (1 - nivel)} Z`} fill={color} />
    <path d="M -40 -300 L -40 -40 Q -40 0 0 0 Q 40 0 40 -40 L 40 -300" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-52} y={-312} width={104} height={20} rx={8} fill="#e8f4f8" stroke={KC.ink} strokeWidth={5} />
    <line x1={-24} y1={-260} x2={-24} y2={-60} stroke="#fff" strokeWidth={6} opacity=".5" strokeLinecap="round" />
  </g>;
}
// Persona en silueta (sencilla, sin disfraz): camina cargando (brazos arriba). color = ropa.
function Persona({ T, x, y, s = 1, color = KC.teal, seed = 1, carga = true }) {
  const p = Math.sin(T * 5 + seed) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-12} y1={-80} x2={-16 - p} y2={0} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <line x1={12} y1={-80} x2={16 + p} y2={0} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <rect x={-36} y={-200} width={72} height={130} rx={30} fill={color} stroke={KC.ink} strokeWidth={6} />
    {carga ? <><line x1={-26} y1={-180} x2={-20} y2={-250} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /><line x1={26} y1={-180} x2={22} y2={-250} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /></>
      : <><line x1={-28} y1={-180} x2={-46} y2={-110} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /><line x1={28} y1={-180} x2={46} y2={-110} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /></>}
    <circle cx={0} cy={-232} r={30} fill="#8a5a3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 -240 Q 0 -275 30 -240 Q 0 -252 -30 -240 Z" fill="#1b1410" />
  </g>;
}
// Sobre de correo con estampilla.
function Sobre({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-210} y={-130} width={420} height={260} rx={14} fill="#f6ecd2" stroke={KC.ink} strokeWidth={7} />
    <path d="M -210 -130 L 0 20 L 210 -130" fill="none" stroke={KC.ink} strokeWidth={6} />
    <rect x={120} y={-110} width={70} height={84} rx={4} fill={KC.coral} stroke={KC.ink} strokeWidth={4} strokeDasharray="6 4" />
    <circle cx={110} cy={-50} r={44} fill="none" stroke="#3a3a8a" strokeWidth={4} opacity=".7" />
    <text x={-180} y={-80} style={{ font:`700 24px ${KF.mono}` }} fill="#3a3a8a">{TX.sobreAnio}</text>
    <text x={-180} y={70} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>de: {TX.sobreDe}</text>
    <text x={-180} y={108} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>a: {TX.sobrePara}</text>
  </g>;
}
// Interior de la olla al microscopio, para la Lupa (cuadro de 2r × 2r): levaduras con yemas, azúcar y burbujas.
function InteriorOlla(Tl, r, mucho = false) {
  const lev = mucho ? [[0.35, 0.38, 0.2], [0.66, 0.34, 0.6], [0.5, 0.62, 0.9], [0.28, 0.7, 0.4], [0.74, 0.66, 0.75], [0.5, 0.2, 0.1]] : [[0.38, 0.42, 0.2], [0.66, 0.6, 0.7], [0.4, 0.72, 0.5]];
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#2b1d08" />
    {Array.from({ length: 16 }, (_, i) => { const ph = (Tl * 0.4 + i * 0.13) % 1; return <circle key={'b' + i} cx={((i * 67) % 100) / 100 * r * 2} cy={r * 2 * (1 - ph)} r={5 + (i % 3) * 3} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.7 * (1 - ph)} />; })}
    {Array.from({ length: 10 }, (_, i) => <circle key={'a' + i} cx={((i * 41 + 13) % 100) / 100 * r * 2 + mece(Tl, i, 0.3) * 10} cy={((i * 29 + 7) % 100) / 100 * r * 2} r={7} fill={TG.azucar} />)}
    {lev.map(([u, v, b], i) => <Levadura key={i} x={u * r * 2} y={v * r * 2} r={r * 0.15} brote={kclamp(b + ((Tl * 0.25 + i * 0.3) % 1) * 0.5, 0, 1)} rot={i * 50} T={Tl} seed={i + 1} />)}
  </svg>;
}

const FASES = [0, 0.5, 1.15, 1.9];   // inicio de cada fase de burbujeo (s dentro de la escena Burbujas)

function TesguinoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ge: CUES.Germina, M: CUES.Malta, A: CUES.Atole, L: CUES.Levaduras, B: CUES.Burbujas, P: CUES.Pregunta, O: CUES.Olla,
    E: CUES.Estudio, Pa: CUES.Pasto, Te: CUES.Tesguinada, R: CUES.Robert, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // granos para el costal (germinación)
  const GR = Array.from({ length: 11 }, (_, i) => [230 + (i % 6) * 120 + (i >= 6 ? 60 : 0), i < 6 ? 960 : 1060, (i * 37) % 50 - 25]);
  const germ = kprog(T, K.Ge + 0.3, K.M - 0.2, kEase.suave);
  const fase = (() => { const t = T - K.B; let f = -1; FASES.forEach((a, i) => { if (t >= a) f = i; }); return f; })();
  const burbFase = fase === 2 ? klerp(0.6, 3.4, kprog(T, K.B + FASES[2] + 0.2, K.B + FASES[3] - 0.1)) : [0.8, 3.2, 0, 0][Math.max(0, fase)];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la olla de barro que burbujea y, por dentro, levaduras */}
      <Escena T={T} a={K.G} b={K.Ge} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Olla T={T} x={330} y={1110} s={1.2} burb={1.4 + Math.sin(T * 3)} lienzo={T < K.G + 0.9 ? 1 : 0} lienzoSube={kprog(T, K.G + 0.1, K.G + 0.8, kEase.sale)} id="og" />
          {T > K.G + 0.15 && T < K.G + 0.8 && <circle cx={360} cy={662} r={10 + (T - K.G) * 60} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - (T - K.G - 0.15) / 0.65} />}
        </>)}
      </Escena>
      <Lupa T={T} at={K.G + 1.0} until={K.Ge - 0.3} x={770} y={960} r={175} fx={330} fy={666} tinte={KC.cyan} interior={(Tl, r) => InteriorOlla(Tl, r)} />

      {/* 2 · el maíz germina a oscuras */}
      <Escena T={T} a={K.Ge} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 55%, rgba(0,0,0,0) 30%, rgba(8,10,20,.78) 75%)', opacity:kprog(T, K.Ge + 0.2, K.Ge + 0.8) }}></div>
        {fsvg(<>
          <rect x={150} y={880} width={780} height={250} rx={40} fill="rgba(240,161,74,.35)" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 12 }, (_, i) => <line key={'h' + i} x1={150 + i * 56} y1={880} x2={150 + i * 56 + 120} y2={1130} stroke="#f0a14a" strokeWidth={5} opacity=".8" />)}
          {Array.from({ length: 12 }, (_, i) => <line key={'v' + i} x1={270 + i * 56} y1={880} x2={150 + i * 56} y2={1130} stroke="#f0a14a" strokeWidth={5} opacity=".8" />)}
          {GR.map(([gx, gy, r], i) => <Grano key={i} x={gx} y={gy} s={1.05} rot={r} T={T} seed={i + 1} raiz={kclamp(germ * 1.6 - i * 0.03, 0, 1)} brote={kclamp(germ * 1.3 - 0.25 - i * 0.02, 0, 1)} />)}
          <g transform="translate(560 420)" opacity={kprog(T, K.Ge + 0.4, K.Ge + 0.9)}>
            <MapaMexico x={0} y={0} ancho={460} conCA={false}>
              {(() => { const [px, py] = mxProy(-107.63, 27.75); return <circle cx={px} cy={py} r={20 + 6 * Math.sin(T * 6)} fill={KC.red} stroke={KC.ink} strokeWidth={6} />; })()}
            </MapaMexico>
          </g>
        </>)}
      </Escena>

      {/* 3 · por dentro del grano: enzimas cortan el almidón en azúcar (malta) */}
      <Escena T={T} a={K.M} b={K.A} zoom={0.07}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {/* capa de aleurona arriba (de ahí salen las enzimas) */}
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={90 + i * 102} y={560} width={96} height={70} rx={14} fill="#c9a86a" stroke={KC.ink} strokeWidth={5} />)}
          {/* granos de almidón poliédricos del endospermo (fondo) */}
          {Array.from({ length: 12 }, (_, i) => { const cx = 140 + (i % 6) * 160, cy = 690 + Math.floor(i / 6) * 420; return <path key={'p' + i} d={Array.from({ length: 6 }, (_, k) => { const a = k * Math.PI / 3 + i; return `${k ? 'L' : 'M'} ${(cx + 44 * Math.cos(a)).toFixed(0)} ${(cy + 38 * Math.sin(a)).toFixed(0)}`; }).join(' ') + ' Z'} fill="rgba(244,239,228,.12)" stroke="rgba(244,239,228,.35)" strokeWidth={4} />; })}
          {[0, 1, 2, 3].map((i) => <CadenaAlmidon key={i} T={T} x={200} y={770 + i * 95} n={11} paso={66} seed={i + 1} corte={kprog(T, K.M + 0.4 + i * 0.25, K.M + 2.1 + i * 0.25)} />)}
        </>)}
      </Escena>

      {/* 4 · metate, cocción y ollas de barro: así nace el tesgüino */}
      <Escena T={T} a={K.A} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.A + 1.4, K.A + 1.8)}><Metate T={T} x={540} y={980} s={1.4} muele={1} /></g>
          <g opacity={kprog(T, K.A + 1.4, K.A + 1.8) * (1 - kprog(T, K.A + 2.9, K.A + 3.3))}>
            <Fuego T={T} x={540} y={1120} s={1.3} />
            <Olla T={T} x={540} y={1010} s={1.0} burb={3} id="oc" />
            <Vapor T={T} x={540} y={600} />
          </g>
          <g opacity={kprog(T, K.A + 2.9, K.A + 3.3)}>
            <Olla T={T} x={300} y={1110} s={0.85} burb={0.5} id="oa" />
            <Olla T={T} x={760} y={1110} s={0.85} burb={0.5} id="ob" />
            <Canasta x={300 + 460 * kprog(T, K.A + 3.6, K.A + 4.3, kEase.suave)} y={640} s={0.8} />
            <Goteo T={T} x={300 + 460 * kprog(T, K.A + 3.6, K.A + 4.3, kEase.suave)} y0={690} y1={790} cada={0.12} color={TG.atole} desde={K.A + 3.1} />
          </g>
        </>)}
      </Escena>

      {/* 5 · al microscopio: levaduras con yemas comen azúcar y sueltan alcohol y CO₂ */}
      <Escena T={T} a={K.L} b={K.B} zoom={0.06}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(244,194,90,.35)" />
        {fsvg(<>
          {Array.from({ length: 22 }, (_, i) => { const ph = (T * 0.35 + i * 0.11) % 1; return <circle key={'c' + i} cx={120 + ((i * 47) % 860)} cy={1150 - ph * 700} r={8 + (i % 4) * 5} fill="none" stroke="#e8f7ff" strokeWidth={4} opacity={(1 - ph) * kprog(T, K.L + 1.6, K.L + 2.4)} />; })}
          {Array.from({ length: 12 }, (_, i) => <circle key={'s' + i} cx={140 + ((i * 83) % 820) + mece(T, i, 0.3) * 20} cy={620 + ((i * 59) % 480)} r={10} fill={TG.azucar} stroke={KC.ink} strokeWidth={2} opacity={1 - kprog(T, K.L + 1.0 + i * 0.08, K.L + 2.0 + i * 0.08)} />)}
          {[[330, 820, 0], [660, 760, 1], [520, 1010, 2], [800, 1000, 3]].map(([lx, ly, i]) =>
            <Levadura key={i} x={lx} y={ly} r={i === 0 ? 105 : 72} rot={i * 40} T={T} seed={i + 2} brote={kprog(T, K.L + 0.4 + i * 0.5, K.L + 3.4 + i * 0.4)} />)}
          {[0, 1, 2, 3, 4].map((i) => { const ph = kprog(T, K.L + 2.2 + i * 0.5, K.L + 4.2 + i * 0.5); return ph > 0 && ph < 1 ? <Etanol key={'e' + i} x={150 + i * 90 + ph * 40} y={1000 - ph * 200} s={0.9} o={Math.sin(Math.PI * ph)} /> : null; })}
          {[[620, 640, 20], [960, 920, -30], [880, 1120, 60]].map(([bx, by, r], i) => <BacteriaC key={'b' + i} x={bx} y={by} rot={r + mece(T, i, 0.2) * 10} s={0.55} color={KC.mint} T={T} seed={i} />)}
        </>)}
      </Escena>

      {/* 6 · las burbujas marcan las fases */}
      <Escena T={T} a={K.B} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Olla T={T} x={810} y={1110} s={0.9} burb={burbFase} lienzo={0} id="of" />
          <rect x={50} y={555} width={500} height={540} rx={28} fill="rgba(255,255,255,.88)" stroke={KC.ink} strokeWidth={5} />
          {TX.fasesLista.map((f, i) => { const on = fase >= i; const yy = 620 + i * 130; const [a, b] = f.includes(':') ? [f.split(':')[0] + ':', f.split(':')[1].trim()] : [f, ''];
            return <g key={i} opacity={on ? 1 : 0.45}>
              <circle cx={110} cy={yy} r={36} fill={on ? (fase === i ? KC.pink : KC.gold2) : '#fff'} stroke={KC.ink} strokeWidth={6} />
              <text x={110} y={yy + 15} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
              <text x={165} y={yy + (b ? -2 : 12)} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{a}</text>
              {b && <text x={165} y={yy + 40} style={{ font:`700 34px ${KF.texto}` }} fill={KC.ink}>{b}</text>}
            </g>; })}
        </>)}
      </Escena>

      {/* 7 · re-gancho: ¿de dónde salen las levaduras? */}
      <Escena T={T} a={K.P} b={K.O} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Olla T={T} x={300} y={1110} s={1.1} burb={1} id="op" /><Interrogacion T={T} x={300} y={600} tam={300} /></>)}
      </Escena>

      {/* 8 · las ollas no se lavan: costra con levaduras de la tanda anterior */}
      <Escena T={T} a={K.O} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Olla T={T} x={330} y={1100} s={1.15} corte costra={kprog(T, K.O + 0.4, K.O + 1.4)} id="ok" />
          <g opacity={kprog(T, K.O + 3.0, K.O + 3.5)}>
            <path d="M 160 470 A 210 70 0 1 1 560 470" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
            <path d="M 560 470 l -34 -24 m 34 24 l -40 14" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" fill="none" />
          </g>
        </>)}
      </Escena>
      <Lupa T={T} at={K.O + 1.5} until={K.E - 0.3} x={800} y={860} r={180} fx={330 + 150 * 1.15} fy={1100 - 120 * 1.15} tinte={KC.yellow}
        interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#4a2c12" />
          {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={((i * 37) % 100) / 100 * r * 2} cy={((i * 53 + 11) % 100) / 100 * r * 2} r={6 + (i % 5) * 4} fill={i % 2 ? '#7a4a22' : '#5e3818'} />)}
          {[[0.3, 0.35], [0.62, 0.3], [0.45, 0.62], [0.72, 0.68], [0.25, 0.72]].map(([u, v], i) => <Levadura key={'l' + i} x={u * r * 2} y={v * r * 2} r={r * 0.13} brote={i % 2 ? 0.5 : 0} rot={i * 60} T={Tl * 0.3} seed={i + 4} />)}
        </svg>} />

      {/* 9 · el estudio de 1981: del sedimento de la olla a las cajas de Petri */}
      <Escena T={T} a={K.E} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g opacity={kprog(T, K.E + 3.2, K.E + 3.7)}>
          <Olla T={T} x={190} y={1100} s={0.62} corte costra={1} id="oe" />
          <path d={`M 250 980 Q 380 ${820} ${klerp(260, 470, kprog(T, K.E + 3.6, K.E + 4.4))} 800`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="18 12" />
          {[[560, 860], [800, 980], [580, 1080]].map(([px, py], i) => <Petri key={i} x={px} y={py} r={100}>
            {Array.from({ length: 7 }, (_, k) => <Colonia key={k} cx={Math.cos(k * 2.3 + i) * 52} cy={Math.sin(k * 2.3 + i) * 52} r={(10 + (k % 3) * 6) * kprog(T, K.E + 3.9 + i * 0.3 + k * 0.05, K.E + 4.8 + i * 0.3)} color="#fffaf0" seed={k + i * 7} />)}
          </Petri>)}
        </g>)}
      </Escena>

      {/* 10 · el pasto Bromus (basiawi): no mostró enzimas */}
      <Escena T={T} a={K.Pa} b={K.Te} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Bromus T={T} x={290} y={1150} s={1.0} />
          <g opacity={kprog(T, K.Pa + 1.6, K.Pa + 2.0)}>
            <Tubo x={760} y={1150} s={1.0} color={TG.yodo} nivel={0.55} />
            <Goteo T={T} x={760} y0={790} y1={980} cada={0.4} color="#6a3a9a" desde={K.Pa + 1.9} hasta={K.Pa + 2.8} />
          </g>
        </>)}
      </Escena>

      {/* 11 · bebida sagrada y pago del trabajo en comunidad */}
      <Escena T={T} a={K.Te} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1010} width={1080} height={200} fill="#c9a35a" opacity=".6" />
          {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><line x1={620 + i * 70} y1={1020} x2={620 + i * 70} y2={870} stroke="#6b3d1a" strokeWidth={14} strokeLinecap="round" /></g>)}
          <line x1={600} y1={900} x2={1000} y2={900} stroke="#6b3d1a" strokeWidth={12} /><line x1={600} y1={960} x2={1000} y2={960} stroke="#6b3d1a" strokeWidth={12} />
          {(() => { const avz = kprog(T, K.Te, K.Te + 3.5, kEase.suave) * 140; return <g transform={`translate(${avz} 0)`}>
            <rect x={90} y={738} width={420} height={26} rx={12} fill="#8a5a2a" stroke={KC.ink} strokeWidth={6} />
            <Persona T={T} x={150} y={1000} s={1} color={KC.teal} seed={1} />
            <Persona T={T} x={300} y={1000} s={1} color={KC.coral} seed={2} />
            <Persona T={T} x={450} y={1000} s={1} color={KC.blue} seed={3} />
          </g>; })()}
          <g opacity={kprog(T, K.Te + 2.0, K.Te + 2.5)}><Olla T={T} x={880} y={1160} s={0.45} burb={1} id="ot" /></g>
        </>)}
      </Escena>

      {/* 12 · dato curioso: las primeras muestras las mandó un tal Robert (Bye, 1973) */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform="translate(840 1010)">
            <rect x={-200} y={-300} width={400} height={300} fill="#e9e4d8" stroke={KC.ink} strokeWidth={8} />
            <path d="M -230 -300 L 0 -400 L 230 -300 Z" fill="#c9c2b0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            {[-130, -40, 50, 140].map((dx) => <rect key={dx} x={dx - 22} y={-250} width={44} height={180} fill="#9aa3b0" stroke={KC.ink} strokeWidth={5} />)}
            <text x={0} y={-330} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>UNAM</text>
          </g>
          {(() => { const v = kprog(T, K.R + 0.3, K.R + 2.2, kEase.suave); return <Sobre x={klerp(330, 700, v)} y={klerp(620, 860, v) - Math.sin(Math.PI * v) * 120} s={klerp(1.0, 0.62, v)} rot={klerp(-8, 6, v)} />; })()}
        </>)}
      </Escena>

      {/* 13 · cierre: la misma olla, ahora una fábrica de hongos que pasa a la siguiente */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Olla T={T} x={330} y={1110} s={1.2} burb={2.2 + Math.sin(T * 2)} id="oz" />
          <g opacity={kprog(T, K.C + 2.4, K.C + 2.9)}>
            <path d="M 150 600 A 180 50 0 1 1 510 600" fill="none" stroke={KC.ink} strokeWidth={10} strokeDasharray="20 12" strokeDashoffset={-T * 40} strokeLinecap="round" />
            <path d="M 510 600 l -40 -14 m 40 14 l -6 -42" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" fill="none" />
          </g>
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.6} until={K.Ou - 0.2} x={790} y={930} r={170} fx={330} fy={666} tinte={KC.gold} interior={(Tl, r) => InteriorOlla(Tl, r, true)} />

      {/* ============ textos (todos salen de TX) ============ */}
      <Etq T={T} at={K.G + 0.4} until={K.Ge - 0.3} x={60} y={430} texto={TX.nombre} tam={58} color={KC.ink} />
      <Rotulo T={T} at={K.G + 0.9} until={K.Ge - 0.3} x={60} y={500} texto={TX.nombreRaramuri} tam={28} color={KC.ink} fondo="rgba(255,255,255,.75)" />
      <Rotulo T={T} at={K.G + 1.2} until={K.Ge - 0.3} x={770} y={1160} texto={TX.levaduraComun} tam={26} centro color={KC.ink} fondo="rgba(255,255,255,.85)" />

      <Chip T={T} at={K.Ge + 0.5} until={K.M - 0.3} texto={TX.lugar} x={540} y={370} tam={30} borde={KC.mint} />
      <Rotulo T={T} at={K.Ge + 0.3} until={K.M - 0.3} x={150} y={850} texto={germ < 0.5 ? TX.dias[0] : TX.dias[1]} tam={40} color={KC.texto} />
      <Etq T={T} at={K.Ge + 1.8} until={K.M - 0.3} x={300} y={790} texto={TX.brote} tam={26} color={KC.texto} />

      <Chip T={T} at={K.M + 0.1} until={K.M + 2.1} texto={TX.porDentroGrano} x={540} y={470} tam={32} borde={KC.cyan} mono />
      <Rotulo T={T} at={K.M + 0.5} until={K.A - 0.3} x={90} y={700} texto={TX.almidon} tam={30} color={TG.almidon} />
      <Rotulo T={T} at={K.M + 0.9} until={K.A - 0.3} x={540} y={700} texto={TX.enzimas} tam={30} color={TG.enzima} />
      <Rotulo T={T} at={K.M + 1.6} until={K.A - 0.3} x={760} y={1150} texto={TX.azucar} tam={34} color={TG.azucar} />
      <Chip T={T} at={K.M + 2.4} until={K.A - 0.2} texto={TX.malta} x={400} y={470} tam={44} borde={KC.gold} />

      <Rotulo T={T} at={K.A + 0.2} until={K.A + 1.4} x={540} y={760} texto={TX.metate} tam={36} centro color={KC.ink} fondo="rgba(255,255,255,.8)" />
      <Rotulo T={T} at={K.A + 1.6} until={K.A + 2.9} x={540} y={470} texto={TX.horas} tam={32} centro color={KC.ink} fondo="rgba(255,255,255,.8)" />
      <Rotulo T={T} at={K.A + 3.1} until={K.L - 0.3} x={540} y={470} texto={TX.nombre.toUpperCase()} tam={90} centro color={KC.ink} fondo="rgba(255,255,255,.85)" />

      <Chip T={T} at={K.L + 0.1} until={K.B - 0.3} texto={TX.porDentroOlla} x={430} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.L + 0.6} until={K.B - 0.3} x={60} y={600} texto={TX.levadura} it tam={34} color={KC.texto} />
      <Rotulo T={T} at={K.L + 1.0} until={K.B - 0.3} x={150} y={650} texto={TX.levaduraComun} tam={26} color={KC.gold2} />
      <Rotulo T={T} at={K.L + 2.4} until={K.B - 0.3} x={250} y={1060} texto={TX.etanol} tam={28} color={KC.texto} />
      <Rotulo T={T} at={K.L + 2.0} until={K.B - 0.3} x={880} y={800} texto={TX.co2} tam={34} color="#e8f7ff" />
      <Rotulo T={T} at={K.L + 3.6} until={K.B - 0.3} x={60} y={1150} texto={TX.otras} tam={24} color={KC.texto} it />
      <Rotulo T={T} at={K.L + 4.2} until={K.B - 0.3} x={60} y={1190} texto={TX.lacticas} tam={24} color={KC.mint} />

      <Chip T={T} at={K.B + 0.1} until={K.P - 0.2} texto={TX.fases} x={540} y={470} tam={32} borde={KC.ink} />

      <Chip T={T} at={K.O + 0.3} until={K.E - 0.3} texto={TX.noSeLavan} x={360} y={560} tam={40} borde={KC.red} />
      <Rotulo T={T} at={K.O + 1.2} until={K.E - 0.3} x={110} y={1160} texto={TX.costra} tam={26} color={KC.ink} fondo="rgba(255,255,255,.8)" />
      <Rotulo T={T} at={K.O + 3.1} until={K.E - 0.3} x={360} y={400} texto={TX.ciclo} tam={26} centro color={KC.ink} fondo="rgba(255,255,255,.85)" />

      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.2} anio={TX.estudioAnio} quien={TX.estudioQuien} revista={TX.estudioDonde} x={470} y={960} />
      <Chip T={T} at={K.E + 3.4} until={K.Pa - 0.3} texto={TX.fuenteSedimento} x={400} y={470} tam={32} borde={KC.gold} />
      <Rotulo T={T} at={K.E + 4.6} until={K.Pa - 0.3} x={60} y={560} texto={TX.delSedimento} tam={24} it color={KC.ink} fondo="rgba(255,255,255,.85)" />
      <Rotulo T={T} at={K.E + 5.6} until={K.Pa - 0.3} x={60} y={630} texto={TX.etanolDato} tam={22} color={KC.ink} fondo="rgba(255,255,255,.7)" />

      <Etq T={T} at={K.Pa + 0.4} until={K.Te - 0.3} x={340} y={610} texto={TX.pastoComun} tam={38} color={KC.ink} />
      <Etq T={T} at={K.Pa + 0.8} until={K.Te - 0.3} x={345} y={700} texto={TX.pasto} it tam={32} color={KC.ink} />
      <Rotulo T={T} at={K.Pa + 1.7} until={K.Te - 0.3} x={760} y={800} texto={TX.yodo} tam={24} centro color={KC.ink} fondo="rgba(255,255,255,.85)" />
      <Chip T={T} at={K.Pa + 2.6} until={K.Te - 0.3} texto={TX.sinEnzimas} x={700} y={470} tam={34} borde={KC.red} />
      <Rotulo T={T} at={K.Pa + 3.3} until={K.Te - 0.3} x={700} y={545} centro texto={TX.hipotesis} tam={24} color={KC.ink} fondo="rgba(255,255,255,.8)" />

      <Chip T={T} at={K.Te + 0.4} until={K.R - 0.3} texto={TX.sagrada} x={330} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Te + 1.6} until={K.R - 0.3} texto={TX.pago} x={420} y={560} tam={32} borde={KC.teal} />

      <Chip T={T} at={K.R + 2.4} until={K.C - 0.3} texto={TX.noSoyYo} x={800} y={470} tam={34} borde={KC.pink} />
      <Rotulo T={T} at={K.R + 3.9} until={K.C - 0.3} x={760} y={560} centro texto={TX.bye} tam={24} color={KC.ink} fondo="rgba(255,255,255,.88)" />

      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto={TX.fabrica} x={290} y={390} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.C + 3.9} until={K.Ou} texto={TX.saber} x={790} y={1160} tam={28} borde={KC.gold} />
      <Rotulo T={T} at={K.C + 2.4} until={K.Ou} x={330} y={480} centro texto={TX.tandas} tam={30} color={KC.ink} fondo="rgba(255,255,255,.85)" />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ge} texto="20 cm" largo={190} />
      <BarraEscala T={T} at={K.Ge} until={K.M} texto="1 cm" largo={90} />
      <BarraEscala T={T} at={K.M} until={K.A} texto="10 µm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.A} until={K.L} texto="20 cm" largo={150} />
      <BarraEscala T={T} at={K.L} until={K.B} texto="5 µm" largo={130} />
      <BarraEscala T={T} at={K.B} until={K.O} texto="20 cm" largo={200} />
      <BarraEscala T={T} at={K.O} until={K.E} texto="20 cm" largo={190} />
      <BarraEscala T={T} at={K.E} until={K.Pa} texto="caja de Petri: 9 cm" largo={180} />
      <BarraEscala T={T} at={K.Pa} until={K.Te} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.Te} until={K.R} texto="1 m" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="20 cm" largo={190} />

      {/* subtítulos (idx = línea de narracion.json) */}
      {[K.G, K.Ge, K.M, K.A, K.L, K.B, K.P, K.O, K.E, K.Pa, K.Te, K.R, K.C].map((a, i, arr) =>
        <SubIt key={i} T={T} idx={i} at={a + 0.1} until={(arr[i + 1] || K.Ou) - 0.1} texto={SUBT[i]} />)}

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.M + 0.8, K.M + 3.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.L + 0.6, K.L + 5.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.O - 0.35, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 0.7, K.E + 6.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pa + 0.8, K.Pa + 4.3, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Te + 0.6, K.Te + 3.8, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.R + 0.1, K.C - 0.1, 'avatar_11_sorprendido', 'grande-izq'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="82" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TesguinoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TesguinoShot /></CompositionStage></div>;
}
window.TesguinoApp = TesguinoApp;
