// Shot Fungi Mati #36 · Esto no es soya prensada: el tempeh lo amarra un hongo — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Morfología: Rhizopus = hifas anchas sin tabiques; esporangios esféricos negro-grisáceos (hasta ~100 µm) sobre esporangióforos con rizoides;
// las hifas entran ~¼ del grosor del cotiledón (Jurus y Sundberg 1976); la bacteria de la B12 es un bastón (bacilo) sin flagelo dibujado.

const TP = { crema:'#f6efdc', blanco:'#fffdf5', soya:'#e8c15a', soya2:'#f6dc8a', soyaOsc:'#b8892c', madera:'#c98b4e', madera2:'#9c6633', espora:'#4a4e56', hilo:'#d8cfb8' };

// Granos repartidos en un rectángulo (semilla fija): [x, y, rx, ry, rot]
function tGranos(seed, w, h, n) {
  const key = 'g' + seed + w + h + n; if (tGranos[key]) return tGranos[key];
  const g = krng(seed), out = [], cols = Math.round(Math.sqrt(n * w / h)), filas = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) { const c = i % cols, f = Math.floor(i / cols);
    out.push([(c + 0.5) / cols * w - w / 2 + (g() - 0.5) * w / cols * 0.5, (f + 0.5) / filas * h - h / 2 + (g() - 0.5) * h / filas * 0.5, 26 + g() * 8, 19 + g() * 5, g() * 180]); }
  return (tGranos[key] = out);
}
// Hilitos que salen por la orilla (pelusa del micelio).
function tPelusa(seed, w, h, n) {
  const g = krng(seed + 7);
  return Array.from({ length: n }, () => { const lado = g(); let x, y;
    if (lado < 0.5) { x = (g() - 0.5) * w; y = -h / 2; } else if (lado < 0.75) { x = -w / 2; y = (g() - 0.5) * h; } else { x = w / 2; y = (g() - 0.5) * h; }
    return [x, y, g() * 6.283, 8 + g() * 14]; });
}

// Bloque de tempeh visto de frente: blanco cremoso con granos que se asoman. blanco 0..1 = cuánto lo cubre el micelio.
function BloqueTempeh({ T = 0, x, y, w = 560, h = 260, seed = 3, blanco = 1, manchas = 0, granosN = 24 }) {
  const gr = tGranos(seed, w - 60, h - 50, granosN), pel = tPelusa(seed, w, h, 40);
  const gm = krng(seed + 99);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill={mixHex('#efe2b0', TP.crema, blanco)} stroke={KC.ink} strokeWidth={8} />
    {gr.map(([gx, gy, rx, ry, r], i) => <ellipse key={i} cx={gx} cy={gy} rx={rx} ry={ry} transform={`rotate(${r} ${gx} ${gy})`} fill={TP.soya} stroke={TP.soyaOsc} strokeWidth={3} opacity={1 - 0.6 * blanco} />)}
    <rect x={-w / 2 + 10} y={-h / 2 + 10} width={w - 20} height={h - 20} rx={26} fill={TP.blanco} opacity={0.35 * blanco} />
    {blanco > 0.3 && pel.map(([px, py, a, L], i) => <path key={i} d={`M ${px} ${py} q ${Math.cos(a) * L} ${-Math.abs(Math.sin(a)) * L - 4 + Math.sin(T * 2 + i)} ${Math.cos(a) * L * 1.6} ${-L * 0.6}`} stroke="#fff" strokeWidth={3} fill="none" opacity={blanco * 0.9} />)}
    {manchas > 0 && Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={(gm() - 0.5) * (w - 90)} cy={(gm() - 0.5) * (h - 80)} rx={20 + gm() * 26} ry={14 + gm() * 16} fill="#2c2a2a" opacity={manchas * (0.55 + gm() * 0.35)} />)}
  </g>;
}

// Corte (rebanada vista de frente): granos partidos y los hilos que los amarran. p = 0..1 hilos visibles.
function Corte({ T = 0, x, y, w = 520, h = 300, seed = 5, p = 1, brilla = 0 }) {
  const gr = tGranos(seed, w - 70, h - 60, 12), g = krng(seed + 3);
  const hilos = [];
  gr.forEach((a, i) => gr.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 150) hilos.push([a, b, g()]); }));
  const col = brilla > 0 ? mixHex('#c9bfa6', KC.gold, brilla) : '#c9bfa6';
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill={TP.blanco} stroke={KC.ink} strokeWidth={8} />
    {hilos.map(([a, b, r], i) => { const n = 3; return Array.from({ length: n }, (_, k) => { const mx = (a[0] + b[0]) / 2 + (r - 0.5) * 40 + (k - 1) * 12, my = (a[1] + b[1]) / 2 + (k - 1) * 14;
      return <path key={i + '_' + k} d={`M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`} stroke={col} strokeWidth={3 + brilla * 2} fill="none" strokeDasharray={`${300 * p} 400`} opacity={0.9} />; }); })}
    {gr.map(([gx, gy, rx, ry, r], i) => <g key={i} transform={`rotate(${r} ${gx} ${gy})`}>
      <ellipse cx={gx} cy={gy} rx={rx * 1.3} ry={ry * 1.3} fill={TP.soya2} stroke={TP.soyaOsc} strokeWidth={4} />
      <line x1={gx - rx * 1.1} y1={gy} x2={gx + rx * 1.1} y2={gy} stroke={TP.soyaOsc} strokeWidth={2} opacity=".6" />
      <ellipse cx={gx} cy={gy} rx={rx * 1.3} ry={ry * 1.3} fill="none" stroke={col} strokeWidth={4} strokeDasharray="6 8" opacity={p} />
    </g>)}
  </g>;
}

// Tabla de picar.
function Tabla({ x, y, w = 820, h = 90 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={h} rx={22} fill={TP.madera} stroke={KC.ink} strokeWidth={8} />
    {[0.2, 0.45, 0.7].map((u, i) => <path key={i} d={`M ${-w / 2 + 40} ${h * u + 10} Q 0 ${h * u - 4} ${w / 2 - 40} ${h * u + 12}`} stroke={TP.madera2} strokeWidth={4} fill="none" />)}
    <circle cx={w / 2 - 50} cy={h / 2} r={14} fill={KC.ink} opacity=".5" />
  </g>;
}
// Cuchillo (filo hacia abajo). (x, y) = punta inferior del filo.
function Cuchillo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -14 0 L -14 -300 Q -14 -330 10 -330 L 40 -330 L 40 -40 Q 30 0 -14 0 Z" fill="#dfe5ec" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-20} y={-500} width={66} height={180} rx={18} fill="#3b2a20" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

// Mapa esquemático de Indonesia occidental (contornos simplificados a mano).
const ID_K = 30;
const idProy = (lon, lat) => [(lon - 94) * ID_K, (7 - lat) * ID_K];
const idPath = (pts) => 'M ' + pts.map(([a, b]) => idProy(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
const ID_JAVA = [[105.2,-6.8],[106.0,-5.9],[107.0,-6.0],[108.3,-6.3],[109.0,-6.8],[110.4,-6.9],[111.0,-6.5],[112.6,-6.9],[114.4,-7.7],[114.6,-8.6],[113.2,-8.3],[111.5,-8.3],[110.0,-8.1],[108.6,-7.8],[107.3,-7.5],[106.4,-7.4],[105.4,-6.9]];
const ID_SUMATRA = [[95.3,5.6],[97.5,5.2],[98.7,3.8],[100.4,2.2],[101.4,1.7],[103.7,0.4],[104.5,-1.0],[106.0,-3.1],[105.9,-5.8],[104.5,-5.9],[103.5,-4.8],[102.3,-4.0],[100.9,-2.0],[100.3,-0.8],[99.1,0.4],[98.4,1.9],[97.1,3.1],[95.9,4.4],[95.2,5.4]];
const ID_BORNEO = [[109.0,1.7],[109.6,1.9],[111.0,1.8],[113.0,3.3],[115.5,5.3],[116.7,6.9],[117.7,6.2],[119.2,5.3],[118.1,4.6],[117.9,2.0],[118.9,1.0],[117.5,0.0],[117.2,-1.0],[116.5,-2.0],[116.2,-3.9],[114.6,-3.9],[113.0,-3.2],[111.6,-3.0],[110.2,-2.9],[110.0,-1.3],[109.0,0.0]];
const ID_SULAWESI = [[119.5,-5.5],[119.4,-3.5],[118.8,-2.6],[119.8,0.1],[120.0,0.8],[121.5,1.0],[123.0,0.9],[124.8,1.5],[125.1,1.3],[124.0,0.4],[121.0,0.4],[120.2,-0.8],[121.6,-1.0],[123.4,-0.8],[121.3,-1.9],[122.5,-4.5],[121.0,-4.6],[120.4,-3.2],[120.5,-5.5]];
const ID_BALI = [[114.4,-8.1],[115.7,-8.4],[115.2,-8.8],[114.5,-8.5]];
function MapaIndonesia({ T, x, y, java = 0 }) {
  const pulso = 0.5 + 0.5 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y})`}>
    {[ID_SUMATRA, ID_BORNEO, ID_SULAWESI, ID_BALI].map((p, i) => <path key={i} d={idPath(p)} fill="#bfe3b4" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    <path d={idPath(ID_JAVA)} fill={mixHex('#bfe3b4', KC.yellow, java)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" style={java > 0 ? { filter:`drop-shadow(0 0 ${10 + 14 * pulso * java}px ${KC.yellow})` } : null} />
  </g>;
}

// Olla con granos de soya hirviendo.
function OllaSoya({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-120, -40, 40, 120].map((dx, i) => <path key={i} d={`M ${dx - 30} 150 Q ${dx} ${80 - 30 * Math.abs(Math.sin(T * 7 + i))} ${dx + 30} 150 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -240 -60 L 240 -60 L 214 140 Q 0 168 -214 140 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={9} />
    <rect x={-270} y={-80} width={540} height={34} rx={14} fill="#b8c0c8" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-62} rx={230} ry={30} fill="#d8c48a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={-190 + i * 29} cy={-64 + Math.sin(T * 6 + i * 1.7) * 6} rx={16} ry={11} fill={TP.soya2} stroke={TP.soyaOsc} strokeWidth={3} />)}
    {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.7 + i / 6) % 1); return <circle key={i} cx={-180 + i * 72} cy={-100 - u * 150} r={16 + u * 18} fill="#fff" opacity={(1 - u) * 0.6} />; })}
  </g>;
}
// Charola con granos sin cáscara (mitades de cotiledón).
function Charola({ x, y, w = 760, seed = 8 }) {
  const gr = tGranos(seed, w - 80, 110, 26);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} -70 L ${w / 2} -70 L ${w / 2 - 30} 80 L ${-w / 2 + 30} 80 Z`} fill="#c3ccd6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {gr.map(([gx, gy, rx, ry, r], i) => <ellipse key={i} cx={gx} cy={gy} rx={rx} ry={ry} transform={`rotate(${r} ${gx} ${gy})`} fill={TP.soya2} stroke={TP.soyaOsc} strokeWidth={3} />)}
  </g>;
}

// Superficie de un grano al microscopio: filas de células (ladrillos) desde y0 hacia abajo.
function SuperficieGrano({ y0 = 1120, celda = 70, alto = 46, color = '#e6c46a', aclara = 0 }) {
  const filas = Math.ceil((KH - y0) / alto) + 1, out = [];
  for (let f = 0; f < filas; f++) for (let c = -1; c < KW / celda + 1; c++) {
    const xx = c * celda + (f % 2 ? celda / 2 : 0), yy = y0 + f * alto;
    out.push(<rect key={f + '_' + c} x={xx + 3} y={yy + 3} width={celda - 6} height={alto - 6} rx={12} fill={mixHex(color, '#fff3cf', f < 3 ? aclara : 0)} stroke="#a37c2a" strokeWidth={3} />);
  }
  return <g>{out}</g>;
}

// Espora de Rhizopus (esporangiospora): ovalada-redonda, gris, con estrías finas. hincha 0..1 al germinar.
function Espora({ x, y, r = 16, hincha = 0 }) {
  const k = 1 + 0.35 * hincha;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <ellipse rx={r * 1.1} ry={r} fill="#8b9099" stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${-r * 0.7} ${-r * 0.3} Q 0 ${-r * 0.6} ${r * 0.7} ${-r * 0.3} M ${-r * 0.8} ${r * 0.2} Q 0 ${-r * 0.1} ${r * 0.8} ${r * 0.2}`} stroke="#5d626b" strokeWidth={2} fill="none" />
  </g>;
}

// Tijeras (símbolo de enzima que corta).
function Tijera({ x, y, s = 1, rot = 0, color = KC.mint, abre = 0.5 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 70 -6 L 70 6 Z" fill="#e8edf2" stroke={KC.ink} strokeWidth={4} /><circle cx={-26} cy={0} r={16} fill="none" stroke={color} strokeWidth={9} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 70 -6 L 70 6 Z" fill="#e8edf2" stroke={KC.ink} strokeWidth={4} /><circle cx={-26} cy={0} r={16} fill="none" stroke={color} strokeWidth={9} /></g>
    <circle r={5} fill={KC.ink} />
  </g>;
}

// Esporangióforo de Rhizopus: tallo que sale de un nudo con rizoides y termina en un esporangio esférico negro-grisáceo.
function Esporangioforo({ T, x, y, alto = 420, r = 48, crece = 1, seed = 1 }) {
  if (crece <= 0) return null;
  const h = alto * kEase.sale(kclamp(crece * 1.4, 0, 1)), rr = r * kEase.rebote(kclamp(crece * 1.6 - 0.6, 0, 1));
  const g = krng(seed);
  return <g transform={`translate(${x} ${y})`}>
    {[-1, -0.4, 0.3, 1].map((k, i) => <path key={i} d={`M 0 0 q ${k * 30} 20 ${k * 50} ${40 + i * 8} t ${k * 20} 30`} stroke="#d9d2c0" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <path d={`M 0 0 Q ${4 + Math.sin(T + seed) * 3} ${-h / 2} 0 ${-h}`} stroke="#e9e3d2" strokeWidth={10} fill="none" strokeLinecap="round" />
    {rr > 1 && <g transform={`translate(0 ${-h - rr * 0.85})`}>
      <circle r={rr} fill="#3a3c42" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={(g() - 0.5) * rr * 1.4} cy={(g() - 0.5) * rr * 1.4} r={3.5} fill="#7b7f88" />)}
      <circle cx={-rr * 0.35} cy={-rr * 0.35} r={rr * 0.18} fill="#fff" opacity=".18" />
    </g>}
  </g>;
}

// Reloj de horas (sin depender del idioma del navegador).
function Reloj({ T, at, until, horas, dur, x, y, etiqueta = 'HORAS' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'fundido'), h = Math.floor(horas * kprog(T, at, at + dur));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:'translate(-50%,-50%)', opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`700 24px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, marginBottom:4, letterSpacing:'.12em' }}>{etiqueta}</div>
    <div style={{ font:`700 72px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.6)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'4px 26px' }}>{String(h).padStart(2, '0')} h</div>
  </div>;
}

// Rótulo grande (texto plano en pantalla).
function Rotulo({ T, at, until, texto, x, y, tam = 46, color = KC.ink, fondo = KC.paper }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:fondo, color, border:`5px solid ${KC.ink}`, borderRadius:16, padding:'8px 24px', font:`900 ${tam}px ${KF.texto}`, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}

function TempehShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, J: CUES.Java, Es: CUES.Esporas, H: CUES.Hilos, A: CUES.Amarra, P: CUES.Pregunta, En: CUES.Enzimas, F: CUES.Fitico, Et: CUES.Estudio, B: CUES.Bacteria, Bl: CUES.Blanco, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const corte = kprog(T, K.G + 0.2, K.G + 0.9, kEase.suave);
  const sep = kprog(T, K.G + 0.9, K.G + 1.3, kEase.sale);
  const amA = K.A + (K.P - K.A) * 0.56;          // en "Amarra": de micro (grano por dentro) a macro (bloque)
  const baA = K.B + 2.3;                          // en "Bacteria": de las cajas al microscopio
  const blA = K.Bl + 3.0;                         // en "Blanco": de los bloques a los esporangios
  const SPO = [[250, 1100], [560, 1092], [850, 1104]];
  // grano en corte (Amarra, micro): 200 px = 1 mm · grosor 600 px = 3 mm · entrada de hifas 150 px ≈ 750 µm (¼)
  const GR = { cx: 540, cy: 1000, rx: 520, ry: 300 }, PEN = 150;
  const pen = kprog(T, K.A + 0.4, amA - 0.3, kEase.sale);
  // proteína: cadena de cuentas; cortes en 3 puntos
  const AA = 14, CUTS = [4, 8, 11];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cuchillo rebana el bloque; en el corte se ven los granos amarrados */}
      <Escena T={T} a={K.G} b={K.J} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={400} y={1090} />
          <defs>
            <clipPath id="tpIzq"><rect x={0} y={0} width={500} height={KH} /></clipPath>
            <clipPath id="tpDer"><rect x={500} y={0} width={KW} height={KH} /></clipPath>
          </defs>
          <g clipPath="url(#tpIzq)"><BloqueTempeh T={T} x={400} y={960} w={600} h={260} seed={3} /></g>
          <g clipPath="url(#tpDer)" transform={`translate(${sep * 60} ${-sep * 6}) rotate(${sep * 4} 600 1090)`}><BloqueTempeh T={T} x={400} y={960} w={600} h={260} seed={3} /></g>
          <Cuchillo x={500 + sep * 30} y={klerp(700, 1090, corte)} rot={sep * 8} />
          {T > K.G + 1.0 && <g transform={`translate(330 ${600}) scale(${kprog(T, K.G + 1.0, K.G + 1.45, kEase.rebote)})`}><Corte T={T} x={0} y={0} w={540} h={300} p={kprog(T, K.G + 1.3, K.G + 2.6)} /></g>}
        </>)}
      </Escena>
      {/* 1 · Java, Indonesia */}
      <Escena T={T} a={K.J} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><MapaIndonesia T={T} x={70} y={720} java={kprog(T, K.J + 1.6, K.J + 2.2)} />
          <g transform={`translate(${idProy(110, -7.3)[0] + 70} ${idProy(110, -7.3)[1] + 720 - 70}) scale(${kprog(T, K.J + 2.4, K.J + 2.8, kEase.rebote)})`}>
            <path d="M 0 0 C -30 -40 -30 -80 0 -90 C 30 -80 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cy={-60} r={12} fill="#fff" />
          </g></>)}
      </Escena>
      {/* 2 · se cuecen, se enfrían, se les ponen esporas */}
      <Escena T={T} a={K.Es} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {T < K.Es + 2.2 && <g opacity={1 - kprog(T, K.Es + 1.6, K.Es + 2.2)}><OllaSoya T={T} x={460} y={960} s={1.05} /></g>}
          {T > K.Es + 1.6 && <g opacity={kprog(T, K.Es + 1.6, K.Es + 2.2)}>
            <Charola x={480} y={1040} />
            <g transform={`translate(${klerp(900, 560, kprog(T, K.Es + 2.2, K.Es + 2.8, kEase.sale))} 640) rotate(${-20 - 18 * Math.max(0, Math.sin(T * 9)) * kprog(T, K.Es + 2.8, K.Es + 3.0)})`}>
              <path d="M -80 -60 L 80 -60 L 70 70 L -70 70 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              <text y={18} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>esporas</text>
            </g>
            {Array.from({ length: 40 }, (_, i) => { const t0 = K.Es + 2.9 + (i % 20) * 0.07; const u = kprog(T, t0, t0 + 0.9); if (u <= 0) return null;
              const gx = 470 + ((i * 53) % 300) - 150 + Math.sin(i) * 40; return <circle key={i} cx={gx + (i % 2 ? 1 : -1) * u * 60} cy={klerp(700, 1000 + (i % 5) * 12, u)} r={5} fill={TP.espora} opacity={0.9} />; })}
          </g>}
        </>)}
      </Escena>
      {/* 3 · al microscopio: las esporas germinan y sacan hifas (micelio) */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <SuperficieGrano y0={1120} />
          {SPO.map(([sx, sy], i) => { const t0 = K.H + 0.7 + i * 0.35; const g = kprog(T, t0 + 0.4, K.A - 0.2); return <g key={i}>
            {g > 0 && <RedHifas T={T} x={sx} y={sy} g={g} seed={4 + i * 3} n={140} escala={0.3} ancho={11} color={FK.hifa} circ={true} brillo={0.4} />}
            <Espora x={sx} y={sy} r={17} hincha={kprog(T, t0, t0 + 0.5)} />
          </g>; })}
        </>)}
      </Escena>
      {/* 4a · por dentro de un grano: las hifas entran ~¼ del grosor y amarran con el grano de al lado */}
      <Escena T={T} a={K.A} b={amA}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <defs><clipPath id="tpGrano"><ellipse cx={GR.cx} cy={GR.cy} rx={GR.rx} ry={GR.ry} /></clipPath></defs>
          {/* granos vecinos arriba y abajo */}
          <ellipse cx={300} cy={560} rx={420} ry={180} fill="#d9b456" stroke={KC.ink} strokeWidth={6} />
          <ellipse cx={820} cy={1460} rx={420} ry={150} fill="#d9b456" stroke={KC.ink} strokeWidth={6} />
          <g clipPath="url(#tpGrano)">
            <ellipse cx={GR.cx} cy={GR.cy} rx={GR.rx} ry={GR.ry} fill="#e6c46a" />
            {Array.from({ length: 16 }, (_, f) => Array.from({ length: 16 }, (_, c) => <rect key={f + '_' + c} x={c * 70 - 20 + (f % 2) * 35} y={GR.cy - GR.ry + f * 40} width={64} height={34} rx={10} fill="none" stroke="#a37c2a" strokeWidth={3} />))}
            <ellipse cx={GR.cx} cy={GR.cy} rx={GR.rx} ry={GR.ry} fill="none" stroke="rgba(255,248,225,.55)" strokeWidth={PEN * 2 * pen} />
            {Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2, ex = GR.cx + Math.cos(a) * GR.rx, ey = GR.cy + Math.sin(a) * GR.ry;
              const nx = Math.cos(a) / GR.rx, ny = Math.sin(a) / GR.ry, L = Math.hypot(nx, ny), d = PEN * pen * (0.75 + 0.25 * Math.sin(i * 2.3));
              return <path key={i} d={`M ${ex} ${ey} q ${-nx / L * d * 0.5 + Math.sin(i) * 14} ${-ny / L * d * 0.5} ${-nx / L * d} ${-ny / L * d}`} stroke={FK.hifa} strokeWidth={7} fill="none" strokeLinecap="round" />; })}
          </g>
          <ellipse cx={GR.cx} cy={GR.cy} rx={GR.rx} ry={GR.ry} fill="none" stroke={KC.ink} strokeWidth={7} />
          {/* hifas que cruzan de grano a grano */}
          {Array.from({ length: 9 }, (_, i) => { const x0 = 160 + i * 85, u = kprog(T, K.A + 0.6 + i * 0.12, K.A + 1.8 + i * 0.12); return <path key={i} d={`M ${x0} ${720 - 10} Q ${x0 + 30} ${740} ${x0 + 10 + Math.sin(i) * 20} 760`} stroke={FK.hifa} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={`${u * 80} 200`} />; })}
          {Array.from({ length: 6 }, (_, i) => { const x0 = 560 + i * 80, u = kprog(T, K.A + 0.8 + i * 0.12, K.A + 2.0 + i * 0.12); return <path key={i} d={`M ${x0} ${1265} Q ${x0 - 20} ${1290} ${x0} ${1320}`} stroke={FK.hifa} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={`${u * 80} 200`} />; })}
          {/* llave de ¼ */}
          <g opacity={kprog(T, K.A + 1.6, K.A + 2.0)}>
            <path d={`M 1010 ${GR.cy - GR.ry + 40} L 1030 ${GR.cy - GR.ry + 40} L 1030 ${GR.cy - GR.ry + 40 + PEN} L 1010 ${GR.cy - GR.ry + 40 + PEN}`} stroke={KC.yellow} strokeWidth={6} fill="none" />
          </g>
        </>)}
      </Escena>
      {/* 4b · de vuelta a escala real: los granos quedan pegados en un bloque */}
      <Escena T={T} a={amA} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<BloqueTempeh T={T} x={540} y={950} w={620} h={300} seed={11} blanco={kprog(T, amA + 0.1, K.P - 0.4)} granosN={28} />)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.En} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 6 · enzimas: cortan proteínas y grasas (esquema molecular) */}
      <Escena T={T} a={K.En} b={K.F}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d="M -40 560 Q 80 640 120 860 Q 150 1040 -40 1180" stroke={FK.hifa} strokeWidth={70} fill="none" strokeLinecap="round" opacity=".9" />
          {/* proteína */}
          {Array.from({ length: AA }, (_, i) => { const seg = CUTS.filter((c) => i >= c).length; const ct = CUTS.map((c, k) => kprog(T, K.En + 1.0 + k * 0.45, K.En + 1.5 + k * 0.45, kEase.sale));
            let dx = 0, dy = 0; for (let k = 0; k < CUTS.length; k++) if (i >= CUTS[k]) { dx += 22 * ct[k]; dy += (k % 2 ? -1 : 1) * 26 * ct[k]; }
            const col = [KC.pink, KC.yellow, KC.cyan, KC.orange, KC.lilac][i % 5];
            return <g key={i}>{i > 0 && !CUTS.includes(i) && <line x1={250 + (i - 1) * 54 + dx} y1={720 + Math.sin(i - 1 + T * 2) * 14 + dy} x2={250 + i * 54 + dx} y2={720 + Math.sin(i + T * 2) * 14 + dy} stroke="#cfd6e0" strokeWidth={8} />}
              <circle cx={250 + i * 54 + dx} cy={720 + Math.sin(i + T * 2) * 14 + dy} r={22} fill={col} stroke={KC.ink} strokeWidth={4} /></g>; })}
          {CUTS.map((c, k) => { const t0 = K.En + 0.4 + k * 0.45, u = kprog(T, t0, t0 + 0.6, kEase.sale); if (u <= 0 || T > K.En + 2.8 + k * 0.45) return null;
            return <Tijera key={k} x={klerp(130, 250 + c * 54 - 27, u)} y={klerp(800, 660, u)} rot={90} s={0.8} color={KC.mint} abre={Math.abs(Math.sin(T * 10))} />; })}
          {/* grasas: triglicérido = glicerol + 3 cadenas; las lipasas sueltan cadenas */}
          {[0, 1].map((m) => { const gx = 360 + m * 340, gy = 1000; return <g key={m}>
            <rect x={gx - 18} y={gy - 70} width={36} height={140} rx={14} fill="#9ad7ff" stroke={KC.ink} strokeWidth={4} />
            {[-50, 0, 50].map((dy, j) => { const t0 = K.En + 2.4 + (m * 3 + j) * 0.22, u = kprog(T, t0, t0 + 0.5, kEase.sale);
              return <path key={j} d={`M ${gx + 18 + u * 50} ${gy + dy + u * (j - 1) * 30} l 24 -14 l 24 14 l 24 -14 l 24 14 l 24 -14 l 24 14 l 24 -14`} stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />; })}
          </g>; })}
          {[0, 1, 2].map((k) => { const t0 = K.En + 2.0 + k * 0.5, u = kprog(T, t0, t0 + 0.5, kEase.sale); if (u <= 0 || T > K.F - 0.2) return null;
            return <Tijera key={'l' + k} x={klerp(130, 380 + k * 170, u)} y={klerp(900, 1100, u)} rot={-30} s={0.7} color={KC.pink} abre={Math.abs(Math.sin(T * 10 + k))} />; })}
        </>)}
      </Escena>
      {/* 7 · baja el ácido fítico: suelta minerales */}
      <Escena T={T} a={K.F} b={K.Et}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {(() => { const cx = 540, cy = 860, out = [];
            const hex = Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2 - Math.PI / 2; return [cx + Math.cos(a) * 100, cy + Math.sin(a) * 100, a]; });
            out.push(<path key="hex" d={'M ' + hex.map((p) => p[0] + ' ' + p[1]).join(' L ') + ' Z'} fill="none" stroke="#cfd6e0" strokeWidth={10} strokeLinejoin="round" />);
            const MIN = [['Fe', '#c0503a'], ['Zn', '#7d8fb3'], ['Ca', '#f1efe6']];
            hex.forEach(([hx, hy, a], i) => { const t0 = K.F + 0.9 + i * 0.32, u = kprog(T, t0, t0 + 0.7, kEase.sale);
              const px = cx + Math.cos(a) * (190 + u * 260), py = cy + Math.sin(a) * (190 + u * 260);
              out.push(<line key={'l' + i} x1={hx} y1={hy} x2={cx + Math.cos(a) * 190} y2={cy + Math.sin(a) * 190} stroke="#cfd6e0" strokeWidth={8} opacity={1 - u} />);
              out.push(<g key={'p' + i} opacity={1 - u * 0.85}><circle cx={px} cy={py} r={36} fill={KC.orange} stroke={KC.ink} strokeWidth={4} /><text x={px} y={py + 12} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>P</text></g>);
              if (i % 2 === 0) { const [s, col] = MIN[i / 2]; const ma = a + Math.PI / 6, mr = 270, f = kprog(T, t0 + 0.2, t0 + 1.6, kEase.sale);
                const mx = cx + Math.cos(ma) * mr + f * (i === 0 ? 0 : (i === 2 ? 120 : -120)), my = cy + Math.sin(ma) * mr + f * (380 - Math.sin(ma) * mr * 0.4);
                out.push(<g key={'m' + i}><circle cx={mx} cy={my} r={40} fill={col} stroke={KC.ink} strokeWidth={5} style={f > 0.9 ? { filter:`drop-shadow(0 0 12px ${KC.mint})` } : null} /><text x={mx} y={my + 12} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{s}</text></g>); }
            });
            return out; })()}
          {/* medidor de ácido fítico (cualitativo) */}
          <g transform="translate(140 470)">
            <rect x={0} y={0} width={500} height={44} rx={22} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={4} />
            <rect x={6} y={6} width={488 * (1 - 0.65 * kprog(T, K.F + 0.9, K.F + 3.0))} height={32} rx={16} fill={KC.orange} />
          </g>
        </>)}
      </Escena>
      {/* 8 · el estudio de 1977 */}
      <Escena T={T} a={K.Et} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g transform="translate(400 1060)"><rect x={-300} y={-150} width={600} height={300} rx={40} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
            <BloqueTempeh T={T} x={0} y={0} w={520} h={220} seed={17} />
            <rect x={-150} y={-40} width={300} height={80} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
            <text y={16} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>TEMPEH</text></g>
          <g transform={`translate(860 ${1060}) scale(${kprog(T, K.Et + 2.6, K.Et + 3.0, kEase.rebote)})`}>
            <rect x={-70} y={-120} width={140} height={230} rx={26} fill="#ffe9f1" stroke={KC.ink} strokeWidth={7} />
            <rect x={-80} y={-150} width={160} height={46} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            <text y={10} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red}>B12</text>
            <text y={86} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>?</text></g>
        </>)}
      </Escena>
      {/* 9a · el hongo solo no la hace; con la bacteria, sí */}
      <Escena T={T} a={K.B} b={baA}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Petri x={290} y={930} r={190}><Colonia cx={0} cy={0} r={150 * kprog(T, K.B, K.B + 0.8)} seed={2} /></Petri>
          <Petri x={790} y={930} r={190}><Colonia cx={0} cy={0} r={150 * kprog(T, K.B + 0.3, K.B + 1.1)} seed={5} />
            {Array.from({ length: 18 }, (_, i) => { const a = i * 0.9, rr = 40 + (i * 37) % 110; return <ellipse key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} rx={9} ry={5} transform={`rotate(${i * 40} ${Math.cos(a) * rr} ${Math.sin(a) * rr})`} fill={KC.mint} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.B + 0.6, K.B + 1.0)} />; })}
          </Petri>
        </>)}
      </Escena>
      {/* 9b · al microscopio: bacterias en bastón junto a una hifa */}
      <Escena T={T} a={baA} b={K.Bl}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <path d="M -60 640 Q 400 700 620 880 Q 820 1040 1140 1060" stroke={KC.ink} strokeWidth={150} fill="none" strokeLinecap="round" />
          <path d="M -60 640 Q 400 700 620 880 Q 820 1040 1140 1060" stroke={FK.hifa} strokeWidth={138} fill="none" strokeLinecap="round" />
          {[[260, 860, 20], [380, 900, -30], [520, 1040, 60], [700, 1150, 10], [860, 1180, -20], [180, 980, 80], [640, 760, -40], [880, 900, 30]].map(([bx, by, r], i) =>
            <Bacteria key={i} T={T} x={bx + Math.sin(T * 1.5 + i) * 6} y={by} rot={r} s={kprog(T, baA + 0.1 + i * 0.08, baA + 0.5 + i * 0.08, kEase.rebote) * 0.42} color={KC.mint} flagelo={false} seed={i} />)}
        </>)}
      </Escena>
      {/* 10a · blanco con poco aire; con aire, manchas de esporas */}
      <Escena T={T} a={K.Bl} b={blA}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g><rect x={50} y={790} width={440} height={300} rx={30} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={7} />
            <BloqueTempeh T={T} x={270} y={940} w={360} h={220} seed={21} granosN={14} />
            {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={90 + (i % 6) * 72} cy={820 + Math.floor(i / 6) * 240} r={6} fill={KC.ink} />)}</g>
          <BloqueTempeh T={T} x={800} y={940} w={360} h={220} seed={23} granosN={14} manchas={kprog(T, K.Bl + 1.4, K.Bl + 2.4)} />
        </>)}
      </Escena>
      {/* 10b · al microscopio: esporangios negro-grisáceos (hasta ~100 µm) llenos de esporas */}
      <Escena T={T} a={blA} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d="M -20 1150 Q 300 1120 540 1150 T 1100 1140" stroke="#d9d2c0" strokeWidth={9} fill="none" />
          <Esporangioforo T={T} x={300} y={1145} alto={360} r={48} crece={kprog(T, blA + 0.1, blA + 1.2)} seed={1} />
          <Esporangioforo T={T} x={560} y={1150} alto={470} r={50} crece={kprog(T, blA + 0.4, blA + 1.5)} seed={2} />
          <Esporangioforo T={T} x={800} y={1142} alto={300} r={44} crece={kprog(T, blA + 0.7, blA + 1.8)} seed={3} />
        </>)}
      </Escena>
      {/* 11 · cierre: la misma tabla y el mismo bloque, ahora en rebanadas con los hilos marcados */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={400} y={1090} />
          <defs>{[0, 1, 2, 3].map((k) => <clipPath key={k} id={'tpR' + k}><rect x={100 + k * 150} y={0} width={150} height={KH} /></clipPath>)}</defs>
          {[0, 1, 2, 3].map((k) => <g key={k} clipPath={`url(#tpR${k})`} transform={`translate(${(k - 1.5) * 26 * kprog(T, K.C + 0.2, K.C + 0.9, kEase.sale)} 0)`}><BloqueTempeh T={T} x={400} y={960} w={600} h={260} seed={3} /></g>)}
          <g transform={`translate(330 600) scale(${kprog(T, K.C + 0.5, K.C + 1.0, kEase.rebote)})`}><Corte T={T} x={0} y={0} w={540} h={300} p={1} brilla={kprog(T, K.C + 1.2, K.C + 2.0)} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.15} tacharEn={K.G + 1.6} until={K.G + 2.4} texto="¿soya prensada?" x={330} y={400} tam={46} />
      <Chip T={T} at={K.G + 2.5} until={K.J - 0.2} texto="soya + hongo vivo" x={330} y={400} tam={42} borde={KC.leaf} />
      <Etq T={T} at={K.G + 1.6} until={K.J - 0.2} x={600} y={820} texto="hilos del hongo" tam={28} color={KC.ink} lado="izq" />
      <Rotulo T={T} at={K.J + 0.3} until={K.Es - 0.2} texto="TEMPEH" x={300} y={480} tam={70} />
      <Etq T={T} at={K.J + 2.2} until={K.Es - 0.2} x={idProy(108, -8.6)[0] + 70} y={idProy(108, -8.6)[1] + 720 + 50} texto="Java" tam={44} color={KC.ink} />
      <Etq T={T} at={K.J + 1.0} until={K.Es - 0.2} x={idProy(111, 4)[0] + 70} y={idProy(111, 4)[1] + 720 - 70} texto="Indonesia" tam={34} color={KC.ink} />
      <Chip T={T} at={K.J + 2.8} until={K.Es - 0.2} texto="muy probablemente" x={340} y={620} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Es + 0.4} until={K.Es + 1.6} x={160} y={760} texto="soya cocida" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Es + 1.9} until={K.Es + 2.8} texto="se enfría (~25 °C)" x={360} y={520} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Es + 3.1} until={K.H - 0.2} x={120} y={500} texto="moho:" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.1} until={K.H - 0.2} x={300} y={500} texto="Rhizopus" it tam={40} color={KC.ink} />
      <Reloj T={T} at={K.H + 0.3} until={K.A - 0.2} horas={48} dur={4.2} x={300} y={470} />
      <Chip T={T} at={K.H + 0.8} until={K.A - 0.2} texto="25–30 °C" x={300} y={640} tam={38} borde={KC.orange} />
      <Etq T={T} at={K.H + 0.9} until={K.H + 3.0} x={SPO[0][0] + 30} y={SPO[0][1] - 80} texto="espora" tam={30} color={KC.texto} />
      <Etq T={T} at={K.H + 3.0} until={K.A - 0.2} x={80} y={900} texto="hifas = micelio" tam={34} color={FK.hifa} />
      <Etq T={T} at={K.H + 1.0} until={K.A - 0.2} x={1040} y={1180} texto="superficie del grano" lado="izq" tam={26} color={KC.yellow} />
      <Chip T={T} at={K.A + 0.2} until={amA - 0.2} texto="POR DENTRO · grano de soya" x={420} y={300} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.A + 1.8} until={amA - 0.2} x={1000} y={GR.cy - GR.ry + 40 + PEN / 2} texto="hasta ~¼ del grosor" lado="izq" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.A + 1.2} until={amA - 0.2} x={40} y={1060} texto="células del grano" tam={28} color={KC.ink} />
      <Etq T={T} at={K.A + 0.9} until={amA - 0.2} x={60} y={420} texto="hifas entre granos" tam={30} color={FK.hifa} />
      <Chip T={T} at={amA + 0.4} until={K.P - 0.2} texto="un solo bloque" x={400} y={560} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.En + 0.6} until={K.F - 0.2} texto="proteasas → proteínas" x={430} y={480} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.En + 2.2} until={K.F - 0.2} texto="lipasas → grasas" x={430} y={580} tam={36} borde={KC.pink} />
      <Etq T={T} at={K.F + 0.2} until={K.Et - 0.2} x={140} y={440} texto="ácido fítico" tam={32} color={KC.orange} />
      <Etq T={T} at={K.F + 1.6} until={K.Et - 0.2} x={1040} y={1200} texto="minerales libres" lado="izq" tam={30} color={KC.mint} />
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.B - 0.2} anio="1977" quien="tempeh comprado en Toronto, Canadá" revista="Liem, Steinkraus y Cronk · Appl. Environ. Microbiol." y={560} />
      <Rotulo T={T} at={K.B + 0.4} until={baA - 0.2} texto="solo el hongo" x={290} y={680} tam={34} />
      <Rotulo T={T} at={K.B + 0.7} until={baA - 0.2} texto="hongo + bacteria" x={790} y={680} tam={34} />
      <Rotulo T={T} at={K.B + 1.2} until={baA - 0.2} texto="B12: no" x={290} y={1170} tam={44} color={KC.white} fondo={KC.red} />
      <Rotulo T={T} at={K.B + 1.6} until={baA - 0.2} texto="B12: sí ✓" x={790} y={1170} tam={44} color={KC.ink} fondo={KC.mint} />
      <Chip T={T} at={baA + 0.2} until={K.Bl - 0.2} texto="AL MICROSCOPIO · bacteria y hongo" x={460} y={300} tam={30} borde={KC.mint} mono />
      <Etq T={T} at={baA + 0.6} until={K.Bl - 0.2} x={60} y={560} texto="hifa del hongo" tam={30} color={FK.hifa} />
      <Etq T={T} at={baA + 0.9} until={K.Bl - 0.2} x={1040} y={1220} texto="bacteria (bastón)" lado="izq" tam={30} color={KC.mint} />
      <Rotulo T={T} at={K.Bl + 0.3} until={blA - 0.2} texto="poco aire" x={270} y={700} tam={38} />
      <Rotulo T={T} at={K.Bl + 1.2} until={blA - 0.2} texto="con esporas" x={800} y={700} tam={38} />
      <Chip T={T} at={blA + 0.3} until={K.C - 0.2} texto="AL MICROSCOPIO · esporangios" x={420} y={300} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={blA + 1.4} until={K.C - 0.2} x={40} y={560} texto="esporangio: bolsa de esporas" tam={30} color={KC.texto} />
      <Chip T={T} at={blA + 2.0} until={K.C - 0.2} texto="manchas = esporas" x={400} y={460} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="soya + hongo" x={330} y={400} tam={44} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.J} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.J} until={K.Es} texto="500 km" largo={135} />
      <BarraEscala T={T} at={K.Es} until={K.H} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.H} until={K.A} texto="50 µm" largo={200} />
      <BarraEscala T={T} at={K.A} until={amA} texto="1 mm" largo={200} />
      <BarraEscala T={T} at={amA} until={K.P} texto="1 cm" largo={90} />
      <BarraEscala T={T} at={K.En} until={K.F} texto="1 nm" largo={140} />
      <BarraEscala T={T} at={K.F} until={K.Et} texto="0.2 nm" largo={140} />
      <BarraEscala T={T} at={K.Et} until={K.B} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.B} until={baA} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={baA} until={K.Bl} texto="5 µm" largo={110} />
      <BarraEscala T={T} at={K.Bl} until={blA} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={blA} until={K.C} texto="100 µm" largo={100} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={120} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.J - 0.1} texto="No es soya prensada: *la amarra un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.J + 0.1} until={K.Es - 0.1} texto="Tempeh: nació en *Java, Indonesia.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.H - 0.1} texto="Soya cocida + *esporas de moho.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.A - 0.1} texto="En 1 o 2 días: *hilos blancos.*" />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="Los hilos *pegan los granos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.En - 0.1} texto="¿Qué le hace *por dentro?*" />
      <Subtitulo T={T} idx={6} at={K.En + 0.1} until={K.F - 0.1} texto="Enzimas que parten *proteínas y grasas.*" />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.Et - 0.1} texto="Baja el *ácido fítico.*" />
      <Subtitulo T={T} idx={8} at={K.Et + 0.1} until={K.B - 0.1} texto="1977, Toronto: *¿y la B12?*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.Bl - 0.1} texto="La B12 la hace *una bacteria.*" />
      <Subtitulo T={T} idx={10} at={K.Bl + 0.1} until={K.C - 0.1} texto="Poco aire: *casi sin esporas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Soya *amarrada por un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.5, 'avatar_11_sorprendido', 'gancho'],
        [K.J + 0.6, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.5, K.A - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.En + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.F + 0.3, K.Et - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.B + 0.0, K.Bl - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Bl + 1.0, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="36" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TempehApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TempehShot /></CompositionStage></div>;
}
window.TempehApp = TempehApp;
