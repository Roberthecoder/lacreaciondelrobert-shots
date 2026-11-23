// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Ambiental #26 · El jaguar que nunca vas a ver (y cuántos quedan en México) — NARRADO (N5 el experimento + N4 la imagen que se llena).
// Datos: 3er Censo Nacional del Jaguar (ANCJ, dato de 2024; Reuters, Por Esto y Gaceta UNAM 2025), UNAM Global 2021 y Silver et al. 2004 (Oryx).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático (mapa, ubicaciones de los sitios y regiones).

const JG = { piel:'#e9a23b', vientre:'#f7e3b5', mancha:'#2a1a0e', dentro:'#c97d22' };
const JG_IR = { piel:'#b9b9b9', vientre:'#e6e6e6', mancha:'#1c1c1c', dentro:'#8f8f8f' };
const JG_TORSO = 'M -240 -20 C -250 -110 -120 -132 0 -122 C 100 -128 170 -132 212 -92 C 242 -60 232 20 190 42 C 100 72 -60 72 -170 56 C -230 46 -240 20 -240 -20 Z';
const JG_CABEZA = 'M 212 -150 C 228 -198 312 -204 342 -162 C 368 -132 368 -96 348 -76 C 322 -50 262 -50 230 -70 C 204 -90 202 -126 212 -150 Z';

// Rosetas: anillos rotos de manchas con 1–2 puntos adentro (morfología del jaguar). Cada semilla da un patrón distinto.
const _rosCache = {};
function jgRosetas(seed) {
  if (_rosCache[seed]) return _rosCache[seed];
  const r = krng(seed), pts = [];
  for (let k = 0; k < 500 && pts.length < 26; k++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r());
    const x = -10 + Math.cos(a) * 215 * d, y = -32 + Math.sin(a) * 74 * d;
    if (pts.every((p) => Math.hypot(p.x - x, p.y - y) > 52)) {
      const R = 15 + r() * 7, n = 5 + Math.floor(r() * 3), hueco = Math.floor(r() * n), giro = r() * 6.28;
      const manchas = Array.from({ length: n }, (_, i) => i === hueco ? null : { a: giro + (i / n) * 6.28, l: 7 + r() * 5, w: 4 + r() * 2.5 });
      const puntos = Array.from({ length: 1 + Math.floor(r() * 2.2) }, () => ({ x: (r() - 0.5) * R * 0.7, y: (r() - 0.5) * R * 0.6, s: 2.5 + r() * 2.5 }));
      pts.push({ x, y, R, manchas, puntos });
    }
  }
  const chicas = Array.from({ length: 22 }, () => ({ x: -20 + r() * 420 - 200, y: r(), s: 3 + r() * 4 }));
  return (_rosCache[seed] = { pts, chicas });
}
function Roseta({ x, y, R, manchas, puntos, c, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={R * 0.78} fill={c.dentro} />
    {manchas.map((m, i) => m && <ellipse key={i} cx={Math.cos(m.a) * R} cy={Math.sin(m.a) * R} rx={m.l} ry={m.w} transform={`rotate(${(m.a * 180) / Math.PI + 90} ${Math.cos(m.a) * R} ${Math.sin(m.a) * R})`} fill={c.mancha} />)}
    {puntos.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.s} fill={c.mancha} />)}
  </g>;
}
// Jaguar de perfil mirando a la derecha. paso = fase de la caminata; seed = patrón de rosetas; espejo = mira a la izquierda (el OTRO costado:
// usar otra semilla, porque los dos lados no son iguales). ir = foto infrarroja (gris). ojos = brillo de ojos de noche.
function Jaguar({ x, y, s = 1, T = 0, paso = 0, seed = 7, espejo = false, ir = false, ojos = false, o = 1 }) {
  const c = ir ? JG_IR : JG, R = jgRosetas(seed), id = `jgc${seed}${ir ? 'i' : ''}`;
  const pata = (hx, fase, lejos) => { const dx = Math.sin(fase) * 26, sube = Math.max(0, Math.cos(fase)) * 12;
    const d = `M ${hx} 10 Q ${hx + dx * 0.4} 80 ${hx + dx} ${146 - sube}`;
    return <g key={hx}><path d={d} stroke={KC.ink} strokeWidth={60} strokeLinecap="round" fill="none" />
      <path d={d} stroke={lejos ? mixHex(c.piel, '#000000', 0.18) : c.piel} strokeWidth={46} strokeLinecap="round" fill="none" />
      <circle cx={hx + dx * 0.7} cy={100} r={5} fill={c.mancha} opacity={0.8} /><circle cx={hx + dx * 0.55 - 8} cy={70} r={4} fill={c.mancha} opacity={0.8} /></g>; };
  const cola = Math.sin(T * 2.2 + seed) * 10;
  const colaD = `M -232 -40 Q -320 -10 -350 ${70 + cola} Q -362 ${118 + cola} -330 ${132 + cola}`;
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`} opacity={o}>
    <defs><clipPath id={id}><path d={JG_TORSO} /></clipPath>
      <linearGradient id="jgVol" x1="0" y1="0" x2="0.25" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.28" /><stop offset="0.45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.32" /></linearGradient>
      <radialGradient id="jgSuelo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#000" stopOpacity="0.5" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient></defs>
    <ellipse cx={0} cy={150} rx={300} ry={30} fill="url(#jgSuelo)" />
    {pata(-150, paso + Math.PI, true)}{pata(160, paso, true)}
    <path d={colaD} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" fill="none" />
    <path d={colaD} stroke={c.piel} strokeWidth={22} strokeLinecap="round" fill="none" />
    {[0.55, 0.72, 0.88].map((q, i) => <circle key={i} cx={klerp(-300, -338, q)} cy={klerp(10, 120 + cola, q)} r={9} fill={c.mancha} />)}
    <path d={JG_TORSO} fill={c.piel} stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#${id})`}>
      <path d="M -220 40 Q -40 90 190 40 L 190 90 L -220 90 Z" fill={c.vientre} />
      {R.pts.map((p, i) => <Roseta key={i} {...p} c={c} />)}
      <rect x={-260} y={-140} width={520} height={240} fill="url(#jgVol)" />
    </g>
    {pata(-180, paso, false)}{pata(185, paso + Math.PI, false)}
    <path d={JG_CABEZA} fill={c.piel} stroke={KC.ink} strokeWidth={8} />
    <circle cx={238} cy={-170} r={20} fill={c.piel} stroke={KC.ink} strokeWidth={7} /><circle cx={238} cy={-170} r={8} fill={c.mancha} />
    <circle cx={292} cy={-186} r={18} fill={c.piel} stroke={KC.ink} strokeWidth={7} /><circle cx={292} cy={-186} r={7} fill={c.mancha} />
    <path d={JG_CABEZA} fill="url(#jgVol)" stroke={KC.ink} strokeWidth={8} />
    <path d="M 300 -110 Q 340 -112 352 -88 Q 340 -64 300 -66 Z" fill={c.vientre} />
    {[[250, -150], [266, -128], [240, -112], [262, -96], [282, -160], [228, -132]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5 + (i % 2) * 2} fill={c.mancha} />)}
    {ojos ? <><circle cx={318} cy={-134} r={22} fill="#eafff4" opacity={0.35} /><circle cx={318} cy={-134} r={11} fill="#eafff4" /></>
      : <><ellipse cx={318} cy={-134} rx={10} ry={8} fill={ir ? '#ddd' : '#f7d64a'} stroke={KC.ink} strokeWidth={4} /><ellipse cx={320} cy={-134} rx={3} ry={7} fill={KC.ink} /></>}
    <path d="M 344 -108 L 362 -104 L 354 -92 Z" fill="#8a4a3a" stroke={KC.ink} strokeWidth={4} />
    <path d="M 352 -88 Q 340 -74 322 -78" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}
// Tronco de árbol (vertical).
function Tronco({ x, y0 = 0, y1 = KH, w = 150, color = '#6b4a2b' }) {
  return <g><rect x={x - w / 2} y={y0} width={w} height={y1 - y0} fill={color} stroke={KC.ink} strokeWidth={7} />
    {[0.2, 0.45, 0.7].map((q, i) => <path key={i} d={`M ${x - w * 0.3} ${klerp(y0, y1, q)} q 20 40 0 90`} stroke="rgba(0,0,0,.3)" strokeWidth={6} fill="none" />)}</g>;
}
// Cámara trampa camuflada amarrada a un tronco: lente, sensor de movimiento (domo) y panel de luces infrarrojas. flash 0..1.
function CamaraTrampa({ x, y, s = 1, flash = 0, sensor = 0, T = 0, espejo = false }) {
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`}>
    <rect x={-95} y={-20} width={190} height={34} fill="#3b2a18" stroke={KC.ink} strokeWidth={5} />
    <rect x={-75} y={-110} width={150} height={220} rx={22} fill="#5b6b3a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -70 -60 q 30 -20 50 10 q -30 20 -50 -10 Z M 20 30 q 30 -15 50 15 q -25 25 -50 -15 Z M -60 60 q 25 -10 35 15 q -25 10 -35 -15 Z" fill="#3e4a26" />
    <rect x={-50} y={-95} width={100} height={52} rx={8} fill="#1d1d1d" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-38 + (i % 6) * 15.2} cy={-82 + Math.floor(i / 6) * 24} r={5} fill={mixHex('#552020', '#ff5050', flash)} />)}
    <circle cx={0} cy={0} r={30} fill="#111" stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={0} r={18} fill="#2b4a6b" /><circle cx={-6} cy={-6} r={6} fill="#cfe6ff" />
    <ellipse cx={0} cy={62} rx={22} ry={16} fill="#f2f2e6" stroke={KC.ink} strokeWidth={4} />
    {sensor > 0 && [1, 2, 3].map((k) => { const u = ((T * 1.6 + k / 3) % 1); return <path key={k} d={`M ${40 + u * 120} ${62 - 40 - u * 70} q ${30 + u * 30} ${40 + u * 70} 0 ${80 + u * 140}`} stroke={KC.yellow} strokeWidth={6} fill="none" opacity={sensor * (1 - u)} />; })}
    {flash > 0 && <g opacity={flash}><circle cx={0} cy={-68} r={90} fill="#fff" opacity={0.5} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-5} y={-68 - 170} width={10} height={70} rx={5} fill="#fff" transform={`rotate(${i * 36} 0 -68)`} />)}</g>}
  </g>;
}
// Selva de noche (fondo de la cámara trampa).
function SelvaNoche({ T }) {
  const r = krng(31), hojas = Array.from({ length: 30 }, () => ({ x: r() * KW, y: r() * 700, rx: 60 + r() * 90, ry: 26 + r() * 30, a: r() * 60 - 30 }));
  return <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 60%, #1f5a52 0%, #0b2b2e 55%, #051315 100%)' }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {[90, 860, 1010].map((x, i) => <rect key={i} x={x - 50} y={0} width={100 + i * 10} height={1300} fill="#0a1d1c" />)}
      {hojas.map((h, i) => <ellipse key={i} cx={h.x + Math.sin(T * 0.8 + i) * 6} cy={h.y} rx={h.rx} ry={h.ry} transform={`rotate(${h.a} ${h.x} ${h.y})`} fill={i % 2 ? '#0f3b33' : '#14483c'} />)}
      <path d="M 0 1270 Q 300 1235 540 1262 Q 800 1290 1080 1252 L 1080 1920 L 0 1920 Z" fill="#183a2a" />
      {Array.from({ length: 14 }, (_, i) => { const u = krng(50 + i)(); return <circle key={i} cx={(u * 997 + i * 83) % KW} cy={300 + ((u * 613 + i * 71) % 800)} r={4} fill="#d8ff7a" opacity={0.3 + 0.5 * Math.abs(Math.sin(T * 1.7 + i))} />; })}
    </svg>
  </div>;
}
// Marco de visor de la cámara trampa (esquinas, REC, hora).
function Visor({ T, t0 = 0, cam = '07' }) {
  const seg = 45 + Math.floor(T - t0);
  const esq = (x, y, sx, sy) => <path d={`M ${x} ${y + sy * 70} L ${x} ${y} L ${x + sx * 70} ${y}`} stroke="#fff" strokeWidth={8} fill="none" opacity={0.85} />;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>
    {esq(40, 400, 1, 1)}{esq(1040, 400, -1, 1)}{esq(40, 1360, 1, -1)}{esq(1040, 1360, -1, -1)}
    <circle cx={250} cy={225} r={14} fill={KC.red} opacity={Math.sin(T * 6) > 0 ? 1 : 0.25} />
    <text x={275} y={238} style={{ font:`700 38px ${KF.mono}` }} fill="#fff">REC · IR</text>
    <text x={540} y={1490} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff" opacity={0.85}>{`CÁMARA ${cam} · 03:12:${String(seg % 60).padStart(2, '0')}`}</text>
  </svg>;
}
// Destello blanco de pantalla completa.
function Flash({ v }) { return v > 0 ? <div style={{ position:'absolute', inset:0, zIndex:44, background:'#fff', opacity:v * 0.75 }}></div> : null; }
const flashEn = (T, t) => (T < t ? 0 : Math.exp(-(T - t) * 7));

// (div) Foto de cámara trampa (polaroid) con un jaguar en infrarrojo. seed = qué jaguar.
function FotoTrampa({ T, at, until, x, y, w = 250, seed = 7, espejo = false, texto, marca, rot = 0 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, zIndex:38, opacity:e.o, transform:`translate(-50%,-50%) scale(${e.s}) rotate(${rot}deg)`, background:'#fff', padding:10, paddingBottom:44, borderRadius:8, boxShadow:'0 14px 30px rgba(0,0,0,.45)', border:`4px solid ${KC.ink}` }}>
    <svg width={w - 28} height={(w - 28) * 0.7} viewBox="-420 -260 840 590" style={{ display:'block', background:'#3a3a3a' }}>
      <Jaguar x={0} y={30} s={1} seed={seed} espejo={espejo} ir={true} />
    </svg>
    {texto && <div style={{ position:'absolute', left:0, right:0, bottom:6, textAlign:'center', font:`700 22px ${KF.mono}`, color:KC.ink }}>{texto}</div>}
    {marca && <div style={{ position:'absolute', right:-22, top:-22, width:62, height:62, borderRadius:31, background:marca === 'ok' ? KC.leaf : KC.orange, border:`5px solid ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center', font:`900 36px ${KF.texto}`, color:'#fff' }}>{marca === 'ok' ? '✓' : '+'}</div>}
  </div>;
}
// (div) Credencial con un pedazo de piel (sus rosetas).
function Credencial({ T, at, until, x = 280, y = 590 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), R = jgRosetas(7);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:39, opacity:e.o, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-4deg)`, width:440, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:24, overflow:'hidden', boxShadow:'0 18px 40px rgba(0,0,0,.5)' }}>
    <div style={{ background:KC.gold, padding:'8px 20px', font:`900 30px ${KF.texto}`, color:KC.ink, letterSpacing:2 }}>CREDENCIAL · ID</div>
    <div style={{ display:'flex', gap:16, padding:16, alignItems:'center' }}>
      <svg width={150} height={150} viewBox="-90 -100 180 180" style={{ background:JG.piel, border:`4px solid ${KC.ink}`, borderRadius:12, flex:'none' }}>
        {R.pts.slice(0, 9).map((p, i) => <Roseta key={i} {...p} x={(p.x + 10) * 0.42} y={(p.y + 32) * 0.95 - 10} c={JG} s={1.05} />)}
      </svg>
      <div style={{ color:KC.ink }}>
        <div style={{ font:`900 34px ${KF.texto}` }}>Jaguar #07</div>
        <div style={{ font:`italic 700 26px ${KF.mono}` }}>Panthera onca</div>
        <div style={{ font:`700 22px ${KF.mono}`, marginTop:8 }}>señas: sus rosetas</div>
      </div>
    </div>
  </div>;
}
// Huella digital (íconito de comparación).
function Huella({ x, y, r = 80 }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={r * 0.8} ry={r} fill="#ffe9d6" stroke={KC.ink} strokeWidth={6} />
    {[0.25, 0.42, 0.59, 0.76].map((q, i) => <ellipse key={i} rx={r * 0.8 * q} ry={r * q} fill="none" stroke="#b5774f" strokeWidth={5} strokeDasharray={i % 2 ? '30 8' : '50 10'} />)}
  </g>;
}
// Cabeza de jaguar chiquita (cuadrícula de N4). luz 0..1 (encendida / apagada), parcial = fracción del ancho encendida.
function CabezaJ({ x, y, r = 40, luz = 1, rango = false, parcial = 1, id }) {
  const cara = (col, op) => <g opacity={op}>
    <circle cx={-r * 0.62} cy={-r * 0.7} r={r * 0.3} fill={col} stroke={KC.ink} strokeWidth={4} />
    <circle cx={r * 0.62} cy={-r * 0.7} r={r * 0.3} fill={col} stroke={KC.ink} strokeWidth={4} />
    <circle r={r} fill={col} stroke={KC.ink} strokeWidth={5} strokeDasharray={rango ? '9 7' : 'none'} />
    <ellipse cx={0} cy={r * 0.38} rx={r * 0.42} ry={r * 0.3} fill="#f7e3b5" />
    <circle cx={-r * 0.36} cy={-r * 0.12} r={r * 0.11} fill={KC.ink} /><circle cx={r * 0.36} cy={-r * 0.12} r={r * 0.11} fill={KC.ink} />
    <circle cx={-r * 0.55} cy={r * 0.3} r={r * 0.09} fill={KC.ink} /><circle cx={r * 0.6} cy={-r * 0.45} r={r * 0.08} fill={KC.ink} />
  </g>;
  const on = rango ? '#f6cf8a' : JG.piel;
  return <g transform={`translate(${x} ${y})`}>
    {cara('#9aa0a6', 0.55)}
    <defs><clipPath id={id}><rect x={-r * 1.1} y={-r * 1.2} width={r * 2.2 * parcial} height={r * 2.4} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>{cara(on, luz)}</g>
  </g>;
}
// Íconos de amenazas (cada uno en una tarjeta de 380 × 260).
function TarjetaAmenaza({ T, at, x, y, titulo, children, color, k = 1 }) {
  if (T < at) return null;
  const e = kentrada(T, at, null, 'pop');
  return <g transform={`translate(${x} ${y}) scale(${e.s * k})`} opacity={e.o}>
    <rect x={-190} y={-130} width={380} height={260} rx={28} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={-190} y={78} width={380} height={52} rx={0} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={115} textAnchor="middle" style={{ font:`900 ${titulo.length > 18 ? 24 : 30}px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
    {children}
  </g>;
}

// Sitios de muestreo (23), esquemáticos, en los 16 estados del censo.
const JG_SITIOS = [[-109.2,29.0],[-108.8,27.6],[-106.9,24.6],[-105.9,23.4],[-105.2,21.9],[-105.0,19.5],[-104.3,20.3],[-102.3,18.6],[-100.6,17.6],[-99.3,17.4],[-99.1,18.7],
  [-93.0,16.4],[-91.4,16.6],[-89.8,18.2],[-90.6,19.3],[-88.1,19.6],[-87.6,20.7],[-89.3,20.8],[-98.7,20.9],[-99.4,22.1],[-99.3,23.6],[-100.1,25.1],[-98.1,22.7]];
// Regiones del censo de 2024: [nombre, jaguares, lon, lat, etiqueta arriba?]
const JG_REG = [['Península de Yucatán', 1699, -89.3, 19.4, 'arriba'], ['Pacífico Sur', 1541, -97.5, 17.0, 'abajo'], ['Noreste y Centro', 813, -99.0, 24.5, 'arriba'],
  ['Pacífico Norte', 733, -107.8, 26.5, 'arriba'], ['Pacífico Central', 540, -104.0, 19.8, 'izq']];
const MXX = 40, MXY = 700;
const mxp = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [MXX + a, MXY + b]; };

function JaguarShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Disparo, R: CUES.Rosetas, Ce: CUES.Censo, P: CUES.Pregunta, N: CUES.Numero, M: CUES.Mapa, A: CUES.Antes, Am: CUES.Amenazas, L: CUES.Lados, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho y cierre: el jaguar camina frente a la cámara y, con el flash, queda la foto infrarroja
  const tfG = K.G + 2.3, tfC = K.C + 2.0, tfD = K.D + 2.5, tfL = K.L + 3.9;
  const noche = (t0, tf, xa, xb) => { const u = kprog(T, t0 - 0.5, tf); const xx = klerp(xa, xb, u); const foto = T >= tf;
    return svg(<Jaguar x={xx} y={1110} s={1.2} T={T} paso={foto ? 0.6 : (T - t0) * 6} seed={7} ir={foto} ojos={!foto} />); };
  // Disparo: el jaguar entra por la derecha caminando hacia la cámara
  const xD = klerp(1420, 690, kprog(T, K.D - 0.3, tfD, kEase.sale));
  // Rosetas
  const fase2 = K.R + 2.7;
  // Numero
  const barra = (v, y, col, txt, at) => { const p = kprog(T, at, at + 1.0, kEase.sale);
    return <g><rect x={120} y={y} width={820 * (v / 5326) * p} height={70} rx={14} fill={col} stroke={KC.ink} strokeWidth={6} />
      <text x={130} y={y - 14} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{txt}</text></g>; };
  // Antes: 25 cabezas (1 = 1,000 jaguares)
  const apaga = (i) => (i < 5 ? 1 : 1 - kprog(T, K.A + 3.0 + (24 - i) * 0.06, K.A + 3.3 + (24 - i) * 0.06));
  const cabezas = Array.from({ length: 25 }, (_, i) => { const cx = 240 + (i % 5) * 150, cy = 640 + Math.floor(i / 5) * 150;
    const ent = kprog(T, K.A + 0.2 + i * 0.05, K.A + 0.5 + i * 0.05, kEase.sale);
    if (ent <= 0) return null;
    const parcial = i === 5 ? klerp(1, 0.33, kprog(T, K.A + 3.0, K.A + 4.2)) : 1;
    const luz = i === 5 ? 1 : apaga(i);
    return <g key={i} transform={`translate(${cx} ${cy}) scale(${ent}) translate(${-cx} ${-cy})`}><CabezaJ x={cx} y={cy} r={56} luz={luz} rango={i >= 20} parcial={parcial} id={`cj${i}`} /></g>; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cámara trampa ve lo que tú nunca verás */}
      <Escena T={T} a={K.G} b={K.D}>
        <SelvaNoche T={T} />
        {noche(K.G, tfG, 20, 470)}
        <Visor T={T} />
      </Escena>
      {/* 2 · el movimiento la dispara */}
      <Escena T={T} a={K.D} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<><Tronco x={170} /><CamaraTrampa x={200} y={840} s={1.55} T={T} sensor={kprog(T, K.D + 1.0, K.D + 1.4) * (1 - kprog(T, tfD, tfD + 0.2))} flash={flashEn(T, tfD)} />
          <Jaguar x={xD} y={1110} s={0.95} T={T} paso={T < tfD ? (T - K.D) * 6 : 0.6} seed={7} espejo={true} />
          <path d="M 0 1270 Q 540 1240 1080 1270" stroke="rgba(0,0,0,.25)" strokeWidth={10} fill="none" /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · rosetas distintas, como tu huella */}
      <Escena T={T} a={K.R} b={K.Ce}>
        <FondoLunares color={KC.yellow} />
        {T < fase2 + 0.5 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, fase2, fase2 + 0.4) }}>
          {svg(<><Jaguar x={500} y={1170} s={1.15} T={T} paso={0} seed={7} />
            {T > K.R + 1.2 && <g opacity={kprog(T, K.R + 1.2, K.R + 1.6)}><Huella x={830} y={660} r={105} /><text x={650} y={685} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>≈</text></g>}</>)}
        </div>}
      </Escena>
      <Lupa T={T} at={K.R + 0.3} until={fase2 - 0.1} x={340} y={660} r={220} fx={420} fy={1120} tinte={KC.orange} etiqueta="AUMENTADO · rosetas"
        interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="-60 -60 120 120"><rect x={-60} y={-60} width={120} height={120} fill={JG.piel} />
          {jgRosetas(7).pts.slice(0, 8).map((p, i) => <Roseta key={i} {...p} x={(p.x + 10) * 0.28} y={(p.y + 32) * 0.7} c={JG} s={0.62} />)}</svg>} />
      <FotoTrampa T={T} at={fase2 + 0.2} until={K.Ce - 0.2} x={280} y={770} w={340} seed={7} texto="foto A · lunes" rot={-4} />
      <FotoTrampa T={T} at={fase2 + 0.6} until={K.Ce - 0.2} x={680} y={770} w={340} seed={7} texto="foto B · jueves" rot={3} marca={T > fase2 + 1.2 ? 'ok' : null} />
      <FotoTrampa T={T} at={tfD + 0.3} until={K.R - 0.1} x={760} y={560} w={300} seed={7} espejo={true} texto="03:12 · jaguar" rot={4} />
      <Chip T={T} at={fase2 + 1.2} until={K.Ce - 0.2} texto="mismas rosetas: ya visto" x={480} y={1000} tam={32} borde={KC.leaf} />
      <FotoTrampa T={T} at={fase2 + 1.7} until={K.Ce - 0.2} x={480} y={1220} w={340} seed={23} texto="foto C · otras rosetas" rot={-2} marca={T > fase2 + 2.1 ? 'nuevo' : null} />
      {/* 4 · el censo: 920 cámaras, 23 sitios, 90 días */}
      <Escena T={T} a={K.Ce} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={MXX} y={MXY} ancho={1000} conCA={false}>{null}</MapaMexico>)}
        {svg(<>{JG_SITIOS.map(([lo, la], i) => { const [px, py] = mxp(lo, la); const e = kprog(T, K.Ce + 0.5 + i * 0.11, K.Ce + 0.8 + i * 0.11, kEase.rebote);
          return e > 0 && <g key={i} transform={`translate(${px} ${py}) scale(${e})`}><rect x={-13} y={-16} width={26} height={32} rx={6} fill="#5b6b3a" stroke={KC.ink} strokeWidth={4} /><circle r={6} fill="#cfe6ff" stroke={KC.ink} strokeWidth={2} /></g>; })}</>)}
        <EscalaFija texto="ubicaciones esquemáticas" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {kvisible(T, K.Ce + 0.4, K.P - 0.2) && T < K.P + 0.2 && <Contador T={T} at={K.Ce + 0.4} hasta={920} dur={2.6} sufijo=" cámaras" x={330} y={600} tam={60} color={KC.texto} />}
      <Chip T={T} at={K.Ce + 0.2} until={K.Ce + 2.6} texto="3er Censo Nacional del Jaguar (ANCJ)" x={540} y={1260} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ce + 2.9} until={K.P - 0.2} texto="23 sitios · 90 días" x={540} y={1260} tam={40} borde={KC.ink} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.N} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={380} y={1200} textAnchor="middle" style={{ font:`400 760px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={16} transform={`rotate(${Math.sin(T * 3) * 6} 380 920)`}>?</text>
          {[0, 1, 2].map((i) => <CabezaJ key={i} x={200 + i * 250} y={1360} r={72} id={`cq${i}`} />)}</>)}
      </Escena>
      {/* 6 · 5,326 en 2024; 4,800 en 2018 */}
      <Escena T={T} a={K.N} b={K.M}>
        <FondoLunares color={KC.orange} />
        {svg(<><g opacity={0.6}><Jaguar x={520} y={1270} s={1.0} T={T} paso={0} seed={7} /></g>{barra(4800, 960, '#fff6e0', '2018: 4,800', K.N + 2.6)}{barra(5326, 830, KC.yellow, '2024: 5,326', K.N + 0.4)}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.N + 0.3} until={K.M - 0.2} valor={5326} dur={1.6} etiqueta="jaguares en México (2024)" x={630} y={600} tam={210} color={KC.yellow} />
      <Chip T={T} at={K.N + 3.4} until={K.M - 0.2} texto="estimación estadística · 3er censo" x={540} y={1450} tam={28} borde={KC.ink} />
      {/* 7 · dónde viven */}
      <Escena T={T} a={K.M} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<MapaMexico x={MXX} y={MXY} ancho={1000} conCA={false}>{null}</MapaMexico>)}
        {svg(<>{JG_REG.map(([nom, n, lo, la, arriba], i) => { const [px, py] = mxp(lo, la), rr = 1.7 * Math.sqrt(n);
          const e = kprog(T, K.M + 0.3 + i * 0.35, K.M + 0.8 + i * 0.35, kEase.rebote); if (e <= 0) return null;
          return <g key={i}><circle cx={px} cy={py} r={rr * e} fill={i === 0 ? JG.piel : '#f6cf8a'} fillOpacity={0.92} stroke={KC.ink} strokeWidth={6} />
            <text x={px} y={py + 14} textAnchor="middle" style={{ font:`400 ${i < 2 ? 46 : 36}px ${KF.titulo}` }} fill={KC.ink} opacity={e}>{kformato(n)}</text>
            <text x={arriba === 'izq' ? px - rr - 10 : px} y={arriba === 'arriba' ? py - rr - 14 : arriba === 'abajo' ? py + rr + 32 : py + 9} textAnchor={arriba === 'izq' ? 'end' : 'middle'} style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke" opacity={e}>{nom}</text></g>; })}
          {T > K.M + 2.6 && (() => { const [px, py] = mxp(-105.0, 19.5), d = kprog(T, K.M + 2.6, K.M + 3.0, kEase.rebote);
            return <g transform={`translate(${px} ${py})`}><g transform={`translate(0 ${-(1 - d) * 120})`}><path d="M 0 0 C -22 -30 -22 -54 0 -60 C 22 -54 22 -30 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} /><circle cy={-42} r={8} fill="#fff" /></g>
              <text x={-20} y={80} textAnchor="end" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke" opacity={d}>Chamela, Jalisco</text></g>; })()}</>)}
        <EscalaFija texto="esquema · regiones del censo 2024" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Chip T={T} at={K.M + 1.0} until={K.A - 0.2} texto="1,699 de 5,326: casi 1/3" x={400} y={600} tam={32} borde={KC.ink} />
      {/* 8 · antes eran 20 a 25 mil (estimación) */}
      <Escena T={T} a={K.A} b={K.Am}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{cabezas}
          <g transform="translate(450 1400)"><CabezaJ x={0} y={0} r={38} id="cjl" /><text x={60} y={12} textAnchor="start" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>= 1,000</text></g></>)}
      </Escena>
      <Chip T={T} at={K.A + 0.6} until={K.A + 2.9} texto="inicios del siglo XX: 20,000–25,000 (estimación)" x={540} y={500} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.A + 3.2} until={K.Am - 0.2} texto="2024: 5,326" x={540} y={500} tam={40} borde={KC.red} />
      {/* 9 · amenazas */}
      <Escena T={T} a={K.Am} b={K.L}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          <g opacity={0.55}><Jaguar x={520} y={1320} s={0.8} T={T} paso={0} seed={7} /></g>
          <TarjetaAmenaza T={T} at={K.Am + 0.4} k={1.12} x={290} y={700} titulo="pérdida de selva" color={KC.leaf}>
            <rect x={-30} y={-30} width={60} height={70} fill="#7a5230" stroke={KC.ink} strokeWidth={5} /><ellipse cx={0} cy={-30} rx={30} ry={12} fill="#d7b07a" stroke={KC.ink} strokeWidth={5} />
            <ellipse cx={0} cy={-30} rx={16} ry={6} fill="none" stroke="#9b6f3f" strokeWidth={3} />
            <rect x={45} y={10} width={130} height={36} rx={8} fill="#7a5230" stroke={KC.ink} strokeWidth={5} /><ellipse cx={175} cy={28} rx={10} ry={18} fill="#d7b07a" stroke={KC.ink} strokeWidth={4} />
            <circle cx={-110} cy={-50} r={45} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} /><rect x={-118} y={-8} width={16} height={60} fill="#7a5230" stroke={KC.ink} strokeWidth={4} /></TarjetaAmenaza>
          <TarjetaAmenaza T={T} at={K.Am + 1.6} k={1.12} x={790} y={700} titulo="cacería" color={KC.orange}>
            <circle r={70} fill="none" stroke={KC.ink} strokeWidth={8} /><line x1={-95} y1={0} x2={95} y2={0} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={-95} x2={0} y2={70} stroke={KC.ink} strokeWidth={5} />
            <circle r={8} fill={KC.red} /></TarjetaAmenaza>
          <TarjetaAmenaza T={T} at={K.Am + 2.7} k={1.12} x={290} y={1010} titulo="tráfico de pieles y colmillos" color={KC.yellow}>
            <path d="M -150 -90 L -30 -90 L -20 -60 L -40 40 L -150 40 L -165 -30 Z" fill={JG.piel} stroke={KC.ink} strokeWidth={5} />
            {[[-120, -55], [-75, -40], [-110, 5], [-60, 10]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={13} fill="none" stroke={JG.mancha} strokeWidth={6} strokeDasharray="10 5" />)}
            <path d="M 40 -80 Q 70 -10 110 30 Q 70 20 30 -70 Z" fill="#fffbe8" stroke={KC.ink} strokeWidth={5} />
            <g transform="rotate(-14 90 -40)"><rect x={20} y={-75} width={150} height={44} rx={6} fill="none" stroke={KC.red} strokeWidth={6} /><text x={95} y={-42} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.red}>ILEGAL</text></g></TarjetaAmenaza>
          <TarjetaAmenaza T={T} at={K.Am + 4.4} k={1.12} x={790} y={1010} titulo="atropellos" color={KC.cyan}>
            <path d="M -190 40 L 190 -10 L 190 60 L -190 78 Z" fill="#555" />
            {[-140, -50, 40, 130].map((a, i) => <line key={i} x1={a} y1={46 - (a + 190) * 0.13} x2={a + 40} y2={41 - (a + 230) * 0.13} stroke="#fff" strokeWidth={6} />)}
            <g transform="translate(0 -50) rotate(45)"><rect x={-50} y={-50} width={100} height={100} rx={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /></g>
            <g transform="translate(-4 -48) scale(0.11)"><Jaguar x={0} y={0} s={1} seed={3} ir={true} /></g></TarjetaAmenaza></>)}
      </Escena>
      {/* 10 · los dos lados son distintos; cámaras en pares */}
      <Escena T={T} a={K.L} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {T < K.L + 3.4 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.L + 3.0, K.L + 3.4) }}>
          {svg(<><Jaguar x={560} y={720} s={0.85} T={T} seed={7} /><Jaguar x={540} y={1140} s={0.85} T={T} seed={41} espejo={true} />
            <g transform="translate(950 960)" opacity={kprog(T, K.L + 1.4, K.L + 1.8)} stroke={KC.ink} strokeWidth={6} fill={KC.red}><rect x={-60} y={-34} width={120} height={22} rx={8} /><rect x={-60} y={12} width={120} height={22} rx={8} /><path d="M 18 -76 L 34 -70 L -18 76 L -34 70 Z" /></g></>)}
        </div>}
        {T > K.L + 3.0 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.L + 3.0, K.L + 3.4) }}>
          {svg(<g transform="translate(540 930) scale(1.85) translate(-540 -875)"><rect x={-200} y={790} width={KW + 400} height={170} fill="#6a5843" stroke={KC.ink} strokeWidth={6} />
            <circle cx={540} cy={640} r={70} fill="#6b4a2b" stroke={KC.ink} strokeWidth={6} /><circle cx={540} cy={1110} r={70} fill="#6b4a2b" stroke={KC.ink} strokeWidth={6} />
            <CamaraTrampa x={540} y={700} s={0.55} T={T} flash={flashEn(T, tfL)} /><CamaraTrampa x={540} y={1050} s={0.55} T={T} flash={flashEn(T, tfL)} />
            <Jaguar x={klerp(1180, 560, kprog(T, K.L + 3.0, tfL, kEase.sale))} y={885} s={0.3} T={T} paso={T < tfL ? (T - K.L) * 7 : 0.6} seed={7} espejo={true} /></g>)}
        </div>}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Etq T={T} at={K.L + 0.4} until={K.L + 3.0} x={70} y={520} texto="derecho" tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 0.9} until={K.L + 3.0} x={70} y={1320} texto="izquierdo" tam={30} color={KC.ink} />
      <Chip T={T} at={tfL + 0.2} until={K.C - 0.2} texto="2 cámaras: foto de cada lado" x={540} y={290} tam={32} borde={KC.ink} />
      {/* 11 · cierre: regreso a la cámara del inicio */}
      <Escena T={T} a={K.C} b={FIN}>
        <SelvaNoche T={T} />
        {noche(K.C, tfC, 20, 470)}
        <Visor T={T} t0={-40} />
      </Escena>
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="en peligro de extinción (México)" x={370} y={520} tam={30} borde={KC.red} />
      <Credencial T={T} at={K.G + 3.6} until={K.D - 0.2} x={290} y={610} />
      <Flash v={flashEn(T, tfG) + flashEn(T, tfC) + flashEn(T, tfD) * 0.6 + flashEn(T, tfL) * 0.5} />
      <Etq T={T} at={tfG + 0.4} until={K.D - 0.2} x={540} y={1320} texto="Panthera onca" it={true} tam={30} />
      <Etq T={T} at={tfC + 0.4} until={K.Ou - 0.1} x={500} y={1320} texto="jaguar · Panthera onca" it={true} tam={28} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="Sus manchas no son adorno: *son su credencial.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.R - 0.1} texto="El movimiento la dispara: *¡clic!*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Ce - 0.1} texto="Rosetas distintas, *como tu huella.*" />
      <Subtitulo T={T} idx={3} at={K.Ce + 0.1} until={K.P - 0.1} texto="920 cámaras · *23 sitios · 90 días.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.N - 0.1} texto="¿Cuántos hay *en todo México?*" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.M - 0.1} texto="2024: *5,326 jaguares.*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.A - 0.1} texto="Casi 1/3 en *la Península de Yucatán.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.Am - 0.1} texto="Inicios del siglo XX: *20 a 25 mil.*" />
      <Subtitulo T={T} idx={8} at={K.Am + 0.1} until={K.L - 0.1} texto="Selva, cacería, tráfico… *y atropellos.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.C - 0.1} texto="Izquierda y derecha: *manchas distintas.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Sigue *en peligro de extinción.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Rosetas + 2.4, CUES.Censo - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Censo + 2.5, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Numero + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Numero + 2.6, CUES.Mapa - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Mapa + 1.6, CUES.Antes - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Antes + 2.0, CUES.Amenazas - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Lados + 1.2, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_12_perfil_serio', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="26" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function JaguarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><JaguarShot /></CompositionStage></div>;
}
window.JaguarApp = JaguarApp;
