// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Biotecnológico #27 · El arroz dorado — NARRADO (N1 por dentro + N4 la imagen que se llena).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala salvo la barra del grano).
const ORO = '#f2a516', ORO2 = '#ffcf3d', BLANCO_ARROZ = '#fbf7ec', NARANJA = '#ff7a1a', CASCARA = '#d8b25a', HOJA = '#3fae4a', HOJA2 = '#2c8a3a';

// Capa SVG de pantalla completa.
function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Grano de arroz pulido (endospermo): alargado, con las puntas redondeadas y el germen marcado en una punta.
function Grano({ x, y, l = 60, rot = 0, color = BLANCO_ARROZ, borde = KC.ink, g = 3, brillo = 0 }) {
  const w = l * 0.36;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {brillo > 0 && <ellipse rx={l * 0.7} ry={w * 1.2} fill={ORO2} opacity={0.35 * brillo} />}
    <path d={`M ${-l / 2} 0 C ${-l / 2} ${-w * 0.62} ${-l * 0.2} ${-w / 2} 0 ${-w / 2} C ${l * 0.28} ${-w / 2} ${l / 2} ${-w * 0.4} ${l / 2} ${-w * 0.05} C ${l / 2} ${w * 0.45} ${l * 0.25} ${w / 2} 0 ${w / 2} C ${-l * 0.2} ${w / 2} ${-l / 2} ${w * 0.62} ${-l / 2} 0 Z`}
      fill={color} stroke={borde} strokeWidth={g} />
    <path d={`M ${l * 0.36} ${-w * 0.3} q ${l * 0.08} ${w * 0.25} 0 ${w * 0.5}`} stroke={borde} strokeWidth={g * 0.7} fill="none" opacity=".55" />
    <path d={`M ${-l * 0.3} ${-w * 0.18} q ${l * 0.25} ${-w * 0.14} ${l * 0.5} 0`} stroke="#fff" strokeWidth={g * 1.1} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
// Montoncito de arroz sobre un plato. dorado: 0..1 mezcla de blanco a dorado.
function Plato({ T = 0, x, y, s = 1, dorado = 0, seed = 3, vapor = 0 }) {
  const R = krng(seed), granos = [];
  for (let i = 0; i < 70; i++) { const a = R() * Math.PI, rr = Math.sqrt(R());
    const gx = Math.cos(a) * 240 * rr * (R() < 0.5 ? -1 : 1), gy = -Math.sin(a) * 120 * rr - 10 + R() * 30;
    granos.push([gx, gy, R() * 180, 50 + R() * 14]); }
  granos.sort((p, q) => p[1] - q[1]);
  const c = mixHex(BLANCO_ARROZ, ORO, dorado);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><linearGradient id="adzPlato" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c9d2dc" /></linearGradient>
      <radialGradient id={`adzMonte${seed}`} cx="38%" cy="20%" r="85%"><stop offset="0" stopColor={mixHex('#fffaf0', '#ffc24a', dorado)} /><stop offset="1" stopColor={mixHex('#d9cfb6', '#c96f0c', dorado)} /></radialGradient></defs>
    <ellipse cx={0} cy={78} rx={340} ry={60} fill="#000" opacity={0.35} />
    <ellipse cx={0} cy={40} rx={330} ry={90} fill="url(#adzPlato)" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={34} rx={250} ry={58} fill="#e9eef3" stroke={KC.ink} strokeWidth={4} opacity=".9" />
    <path d="M -260 30 Q -230 -150 0 -160 Q 230 -150 260 30 Z" fill={`url(#adzMonte${seed})`} stroke={KC.ink} strokeWidth={7} />
    {granos.map(([gx, gy, r, l], i) => <Grano key={i} x={gx} y={gy} l={l} rot={r} color={c} g={3} />)}
    {vapor > 0 && [-120, 0, 120].map((vx, i) => { const u = ((T * 0.6 + i * 0.33) % 1);
      return <path key={i} d={`M ${vx} ${-170 - u * 160} q 30 -40 0 -80 q -30 -40 0 -80`} stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={vapor * Math.sin(Math.PI * u) * 0.8} />; })}
  </g>;
}
function Cuchara({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-14} y={-320} width={28} height={260} rx={14} fill="#c9d1db" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-20} rx={58} ry={80} fill="#dfe5ec" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-14} cy={-40} rx={14} ry={30} fill="#fff" opacity=".7" />
  </g>;
}
// Planta de arroz (Oryza sativa): macolla de hojas largas y una panícula que se inclina con sus granos con cáscara.
function PlantaArroz({ T, x, y, s = 1, naranja = 0, granoGris = 0 }) {
  const hojas = [[-160, -620, -0.6], [-80, -760, -0.25], [0, -820, 0.05], [90, -740, 0.3], [170, -600, 0.6], [-220, -470, -0.9], [230, -480, 0.95]];
  const pan = [];
  for (let i = 0; i < 9; i++) { const u = i / 8; pan.push([klerp(40, 300, u), klerp(-860, -560, u * u), 40 + i * 6]); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hojas.map(([hx, hy, b], i) => { const m = mece(T, i) * 14;
      const d = `M ${i * 6 - 18} 0 Q ${hx * 0.3} ${hy * 0.55} ${hx + m} ${hy}`;
      return <g key={i}>
        <path d={d} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d={d} stroke={i % 2 ? HOJA : HOJA2} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d={d} stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" opacity={naranja * (0.7 + 0.3 * Math.sin(T * 5 + i))} />
      </g>; })}
    <path d={`M 0 0 Q 20 -500 40 -860 Q 200 -880 300 -560`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q 20 -500 40 -860 Q 200 -880 300 -560`} stroke="#9bc25a" strokeWidth={9} fill="none" strokeLinecap="round" />
    {pan.map(([px, py, r], i) => <g key={i}>
      <Grano x={px - 22} y={py + 10} l={46} rot={r + 50} color={mixHex(CASCARA, '#b8b8b8', granoGris)} g={4} />
      <Grano x={px + 22} y={py + 14} l={46} rot={r + 110} color={mixHex(CASCARA, '#b8b8b8', granoGris)} g={4} />
    </g>)}
  </g>;
}
function Zanahoria({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-30, 0, 30].map((a, i) => <path key={i} d={`M 0 -130 q ${a} -70 ${a * 1.6} -120`} stroke={HOJA2} strokeWidth={16} fill="none" strokeLinecap="round" />)}
    <defs><linearGradient id="adzZan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffa24d" /><stop offset="0.55" stopColor={NARANJA} /><stop offset="1" stopColor="#c2561a" /></linearGradient></defs>
    <path d="M -55 -130 Q 0 -150 55 -130 Q 30 60 0 200 Q -30 60 -55 -130 Z" fill="url(#adzZan)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -34 -110 Q -24 0 -8 120" stroke="#ffd2a6" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.5} />
    {[-80, -30, 20, 70].map((yy, i) => <path key={i} d={`M ${-40 + i * 6} ${yy} l 24 6`} stroke="#c2561a" strokeWidth={5} strokeLinecap="round" />)}
  </g>;
}
// Narciso (Narcissus pseudonarcissus): seis tépalos amarillo pálido y la trompeta (corona) amarilla.
function Narciso({ T, x, y, s = 1 }) {
  const m = Math.sin(T * 1.6) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 60 Q 10 260 0 420" stroke={KC.ink} strokeWidth={20} fill="none" />
    <path d="M 0 60 Q 10 260 0 420" stroke={HOJA} strokeWidth={11} fill="none" />
    <path d="M -10 420 Q -90 250 -60 120" stroke={HOJA2} strokeWidth={18} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${m - 18})`}>
      {Array.from({ length: 6 }, (_, i) => <path key={i} d="M 0 0 Q 50 -40 0 -150 Q -50 -40 0 0 Z" transform={`rotate(${i * 60})`} fill="#fff3a6" stroke={KC.ink} strokeWidth={6} />)}
      <circle r={62} fill="#ffd21f" stroke={KC.ink} strokeWidth={7} />
      <circle r={44} fill="#ffb81f" stroke={KC.ink} strokeWidth={5} />
      <path d="M -44 0 Q -22 -14 0 0 Q 22 14 44 0" stroke="#e08a12" strokeWidth={5} fill="none" />
    </g>
  </g>;
}
// Mazorca de maíz con hojas.
function Mazorca({ x, y, s = 1, rot = 0 }) {
  const gr = [];
  for (let f = 0; f < 11; f++) for (let c = 0; c < 5; c++) { const yy = -220 + f * 40, ww = 70 - Math.abs(f - 5) * 4; gr.push([(c - 2) * ww * 0.38, yy]); }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -10 230 Q -150 60 -110 -120 Q -60 40 -10 230 Z" fill={HOJA} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={78} ry={250} fill="#ffcc2a" stroke={KC.ink} strokeWidth={8} />
    {gr.map(([gx, gy], i) => <rect key={i} x={gx - 12} y={gy - 15} width={24} height={30} rx={9} fill="#ffdd4a" stroke="#c9901a" strokeWidth={3} />)}
    <path d="M 10 230 Q 150 60 110 -120 Q 60 40 10 230 Z" fill={HOJA2} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Betacaroteno esquemático: cadena en zigzag con un anillo en cada punta. corte: 0..1 separa las dos mitades (vitamina A).
function Betacaroteno({ x, y, s = 1, rot = 0, color = NARANJA, corte = 0, brillo = 0 }) {
  const n = 9, paso = 26, mitad = (i) => i < n / 2 ? -1 : 1;
  const sep = corte * 70;
  const pts = Array.from({ length: n + 1 }, (_, i) => [(i - n / 2) * paso, i % 2 ? -12 : 12]);
  const anillo = (cx, cy) => { const p = Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + (k * Math.PI) / 3; return `${cx + Math.cos(a) * 34},${cy + Math.sin(a) * 34}`; }).join(' ');
    return <polygon points={p} fill={color} fillOpacity=".35" stroke={color} strokeWidth={9} strokeLinejoin="round" />; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <ellipse rx={230} ry={70} fill={color} opacity={0.22 * brillo} />}
    {[-1, 1].map((ld) => <g key={ld} transform={`translate(${ld * sep} 0)`}>
      <polyline points={pts.filter((_, i) => (ld < 0 ? i <= n / 2 : i >= n / 2 + 0.5) || (corte === 0)).map((p) => p.join(',')).join(' ')} fill="none" stroke={KC.ink} strokeWidth={15} strokeLinejoin="round" />
      <polyline points={pts.filter((_, i) => (ld < 0 ? i <= n / 2 : i >= n / 2 + 0.5) || (corte === 0)).map((p) => p.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" />
      {ld < 0 ? anillo(-n / 2 * paso - 30, 12) : anillo(n / 2 * paso + 30, -12)}
    </g>)}
  </g>;
}
// Línea de ensamble dentro del grano: estaciones (engranes) conectadas. on: 0..1. Piezas que avanzan cuando está encendida.
function LineaEnsamble({ T, x, y, w = 620, on = 0, estaciones = 3, color = ORO2 }) {
  const est = Array.from({ length: estaciones }, (_, i) => -w / 2 + (w / (estaciones - 1)) * i);
  const c = mixHex('#59606b', color, on);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 50} y={60} width={w + 100} height={30} rx={15} fill="#2a2f38" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-w / 2 - 40 + ((i * 64 + T * 90 * on) % (w + 80))} y={66} width={26} height={18} rx={5} fill={c} opacity=".8" />)}
    {est.map((ex, i) => <g key={i} transform={`translate(${ex} 0) rotate(${T * 70 * on * (i % 2 ? -1 : 1)})`}>
      {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-11} y={-58} width={22} height={22} rx={4} fill={c} stroke={KC.ink} strokeWidth={4} transform={`rotate(${k * 45})`} />)}
      <circle r={42} fill={c} stroke={KC.ink} strokeWidth={6} />
      <circle r={14} fill="#1b1f26" />
    </g>)}
    {on > 0.05 && Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.45 + i / 4) % 1); const px = -w / 2 - 40 + u * (w + 80);
      return u > 0.85 ? <Betacaroteno key={i} x={px} y={-110} s={0.32} color={NARANJA} /> : <circle key={i} cx={px} cy={-100} r={14 + u * 10} fill={mixHex('#ffe7a0', NARANJA, u)} stroke={KC.ink} strokeWidth={4} opacity={on} />; })}
  </g>;
}
// Interruptor grande.
function Interruptor({ x, y, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-110} width={140} height={220} rx={26} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-34} y={-80} width={68} height={160} rx={18} fill={mixHex('#8a8f99', KC.mint, on)} stroke={KC.ink} strokeWidth={5} />
    <rect x={-30} y={klerp(10, -74, on)} width={60} height={64} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Célula del intestino (enterocito) con microvellosidades arriba.
function Enterocito({ x, y, w = 200, h = 300, color = '#f39ab6' }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><linearGradient id="adzEnt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f9c3d4" /><stop offset="0.6" stopColor={color} /><stop offset="1" stopColor="#c86a8c" /></linearGradient></defs>
    <rect x={-w / 2} y={0} width={w} height={h} rx={28} fill="url(#adzEnt)" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-w / 2 + 12 + i * (w - 24) / 8} y={-30} width={14} height={40} rx={7} fill={color} stroke={KC.ink} strokeWidth={4} />)}
    <ellipse cx={0} cy={h * 0.65} rx={44} ry={36} fill="#b04a78" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Tijeras({ x, y, s = 1, abre = 0 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((ld) => <g key={ld} transform={`rotate(${ld * a})`}>
      <path d={`M 0 0 L ${ld * 6} -170 L ${ld * -16} -150 Z`} fill="#dfe5ec" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={ld * -10} cy={60} rx={30} ry={40} fill="none" stroke={KC.red} strokeWidth={14} />
    </g>)}
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Ojo de frente. noche: 0..1 oscurece alrededor; nube: 0..1 la córnea se pone opaca (esquemático, sin imagen clínica).
function Ojo({ T, x, y, s = 1, nube = 0 }) {
  const parp = Math.max(0, 1 - Math.abs(((T * 0.5) % 4) - 3.9) * 12);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><radialGradient id="adzEsc" cx="50%" cy="50%" r="60%"><stop offset="0.55" stopColor="#ffffff" /><stop offset="1" stopColor="#c7cfdb" /></radialGradient>
      <radialGradient id="adzIris" cx="50%" cy="50%" r="50%"><stop offset="0.45" stopColor="#3a2410" /><stop offset="0.75" stopColor="#7a4e26" /><stop offset="1" stopColor="#4a2e14" /></radialGradient></defs>
    <path d="M -300 0 Q 0 -230 300 0 Q 0 230 -300 0 Z" fill="url(#adzEsc)" stroke={KC.ink} strokeWidth={10} />
    <circle r={120} fill="url(#adzIris)" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return <line key={i} x1={Math.cos(a) * 66} y1={Math.sin(a) * 66} x2={Math.cos(a) * 112} y2={Math.sin(a) * 112} stroke="#a8743e" strokeWidth={4} opacity={0.45} />; })}
    <circle r={60} fill="#111" />
    <circle cx={-40} cy={-44} r={22} fill="#fff" opacity={1 - nube * 0.8} />
    <circle r={128} fill="#e9eef3" opacity={nube * 0.85} />
    <path d={`M -300 0 Q 0 ${-230 + parp * 230} 300 0`} fill="#f1b48f" stroke={KC.ink} strokeWidth={parp > 0 ? 10 : 0} opacity={parp > 0 ? 1 : 0} />
  </g>;
}
// Figurita de niño (para contar).
function Nino({ x, y, s = 1, color = KC.yellow }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-30} r={18} fill={color} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-6} cy={-36} r={5} fill="#fff" opacity={0.45} />
    <path d="M -22 30 Q -22 -6 0 -6 Q 22 -6 22 30 Z" fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Filipinas esquemático: Luzón, las Bisayas y Mindanao (contorno simplificado a mano).
const PH_ISLAS = [
  [[120.6,18.5],[122.2,18.5],[122.0,17.0],[121.6,15.8],[121.6,14.3],[122.5,14.0],[124.0,13.0],[123.0,12.8],[121.8,13.8],[120.6,14.2],[120.0,15.5],[119.8,16.3],[120.4,16.5]],
  [[120.3,13.5],[121.5,13.3],[121.2,12.2],[120.4,12.6]],
  [[119.2,11.4],[119.6,11.0],[118.2,9.0],[117.2,8.3],[117.0,8.6],[118.6,10.4]],
  [[124.3,12.5],[125.7,12.2],[125.3,11.0],[124.5,11.3]],
  [[124.3,11.5],[125.0,11.2],[125.2,10.1],[124.7,10.0],[124.3,10.8]],
  [[121.9,11.9],[123.1,11.5],[122.8,10.5],[122.0,10.6]],
  [[123.0,10.9],[123.5,10.6],[123.2,9.1],[122.6,9.6]],
  [[123.9,11.2],[124.1,10.3],[123.4,9.5],[123.7,10.6]],
  [[123.8,10.1],[124.6,10.0],[124.3,9.6],[123.8,9.7]],
  [[122.0,7.0],[123.5,8.6],[125.5,9.8],[126.5,8.0],[126.0,6.3],[125.4,5.6],[124.0,6.5],[123.4,7.7],[122.5,7.2]],
];
// Filipinas esquemático (contorno simplificado a mano desde coordenadas aproximadas). k = px por grado.
function MapaFilipinas({ x, y, k = 55, color = '#ffe9a8' }) {
  const P = (lon, lat) => `${((lon - 116.5) * k).toFixed(1)} ${((19 - lat) * k).toFixed(1)}`;
  return <g transform={`translate(${x} ${y})`}>{PH_ISLAS.map((pts, i) => <path key={i} d={'M ' + pts.map(([a, b]) => P(a, b)).join(' L ') + ' Z'} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />)}</g>;
}
function Mazo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-16} y={-10} width={32} height={260} rx={12} fill="#8a5a2b" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={-90} width={220} height={90} rx={22} fill="#a46a33" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-80} width={30} height={70} rx={8} fill="#d9a35a" stroke={KC.ink} strokeWidth={5} />
    <rect x={90} y={-80} width={30} height={70} rx={8} fill="#d9a35a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Sello({ T, at, until, x, y, texto, color = KC.red, rot = -8, tam = 64 }) {
  if (T < at || (until != null && T > until + 0.3)) return null;
  const sale = until == null ? 0 : kprog(T, until, until + 0.3);
  const e = kprog(T, at, at + 0.3, kEase.rebote), s = klerp(2.2, 1, e);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${s})`, opacity:kprog(T, at, at + 0.15) * (1 - sale),
    border:`8px solid ${color}`, color, borderRadius:18, padding:'10px 30px', font:`400 ${tam}px/1 ${KF.titulo}`, background:'rgba(255,255,255,.88)', whiteSpace:'nowrap', letterSpacing:'.02em' }}>{texto}</div>;
}
// Grano grande "por dentro": contorno del grano con la línea de ensamble. dorado: 0..1 se llena de amarillo desde afuera.
function GranoPorDentro({ T, cx, cy, r, on = 0, dorado = 0 }) {
  const L = r * 1.75, W = L * 0.42;
  return <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>
    <defs><radialGradient id="relleno"><stop offset={`${Math.max(0, 100 - dorado * 160)}%`} stopColor={BLANCO_ARROZ} /><stop offset={`${Math.max(1, 130 - dorado * 130)}%`} stopColor={ORO2} /></radialGradient></defs>
    <g transform={`translate(${cx} ${cy})`}>
      <path d={`M ${-L / 2} 0 C ${-L / 2} ${-W * 0.62} ${-L * 0.2} ${-W / 2} 0 ${-W / 2} C ${L * 0.28} ${-W / 2} ${L / 2} ${-W * 0.4} ${L / 2} ${-W * 0.05} C ${L / 2} ${W * 0.45} ${L * 0.25} ${W / 2} 0 ${W / 2} C ${-L * 0.2} ${W / 2} ${-L / 2} ${W * 0.62} ${-L / 2} 0 Z`}
        fill={dorado > 0 ? 'url(#relleno)' : BLANCO_ARROZ} stroke={dorado > 0.5 ? ORO : '#cfc6b0'} strokeWidth={8} opacity=".95" />
      {Array.from({ length: 22 }, (_, i) => { const R = krng(40 + i); const px = (R() - 0.5) * L * 0.7, py = (R() - 0.5) * W * 0.6;
        return <circle key={i} cx={px} cy={py} r={6 + R() * 6} fill="#efe6cf" stroke="#c7bb9c" strokeWidth={2} opacity=".7" />; })}
      <LineaEnsamble T={T} x={0} y={10} w={L * 0.52} on={on} estaciones={3} />
    </g>
  </svg>;
}

function ArrozDorado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hojas, Gr: CUES.Grano, Ge: CUES.Genes, Ca: CUES.Camino, Pr: CUES.Pregunta, In: CUES.Intestino, Oj: CUES.Ojos,
    Ni: CUES.Ninos, Ma: CUES.Maiz, Es: CUES.Estudio, Fi: CUES.Filipinas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.4, kEase.sale);
  const narciso2maiz = kprog(T, K.Ma + 0.3, K.Ma + 1.3, kEase.suave);
  const pig = kprog(T, K.Ma + 1.6, K.Ma + 4.6, kEase.suave);
  const corta = kprog(T, K.In + 1.0, K.In + 1.4, kEase.sale);
  const nube = kprog(T, K.Oj + 2.2, K.Oj + 3.6, kEase.suave);
  const noche = kprog(T, K.Oj + 0.2, K.Oj + 1.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: dos platos, la cuchara cae en el dorado */}
      <Escena T={T} a={K.G - 1} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          {/* encuadre cine: los dos platos ×1.15, de borde a borde y centrados */}
          <g transform="translate(540 960) scale(1.15) translate(-495 -860)">
          <Plato T={T} x={250} y={1110} s={0.62} dorado={0} seed={4} />
          <Plato T={T} x={600} y={930} s={1.05} dorado={1} seed={3} vapor={1} />
          <Cuchara x={klerp(760, 700, cae)} y={klerp(560, 850, cae)} rot={klerp(30, 22, cae) + (T > K.G + 0.4 ? Math.sin((T - K.G) * 18) * 3 * Math.exp(-(T - K.G - 0.4) * 4) : 0)} />
          {T > K.G + 0.4 && T < K.G + 1.2 && [-1, 1, -0.5, 0.6].map((d, i) => { const u = kprog(T, K.G + 0.4, K.G + 1.2); return <Grano key={i} x={700 + d * 120 * u} y={800 - 160 * u + 260 * u * u} l={44} rot={u * 400 * d} color={ORO} />; })}
          </g>
        </Capa>
      </Escena>
      {/* 1 · la planta hace betacaroteno en sus hojas, no en el grano */}
      <Escena T={T} a={K.H} b={K.Gr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <rect x={0} y={1260} width={KW} height={660} fill="#42342b" />
          <rect x={0} y={1240} width={KW} height={40} fill="#3c6a82" opacity=".7" />
          <PlantaArroz T={T} x={560} y={1260} s={1} naranja={kprog(T, K.H + 1.2, K.H + 2.2)} granoGris={0} />
          <Zanahoria x={190} y={1020} s={0.9} rot={-12} />
          {T > K.H + 3.4 && <g opacity={kprog(T, K.H + 3.4, K.H + 3.8)}>
            <circle cx={790} cy={560} r={95} fill="none" stroke={KC.red} strokeWidth={12} />
            <path d="M 720 490 L 860 630" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
          </g>}
        </Capa>
      </Escena>
      {/* 2 · el grano por dentro: la fábrica apagada */}
      <Escena T={T} a={K.Gr} b={K.Ge} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Grano x={540} y={1330} l={300} rot={-14} color={BLANCO_ARROZ} g={9} />
        </Capa>
      </Escena>
      {/* 3 · los genes: narciso y bacteria */}
      <Escena T={T} a={K.Ge} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <g transform="translate(540 920) scale(1.2) translate(-540 -880)">
          <Narciso T={T} x={250} y={760} s={1} />
          <g transform={`translate(830 820) rotate(${Math.sin(T * 1.4) * 8})`}><Bacteria T={T} x={0} y={0} largo={300} ancho={120} color="#b9f07a" seed={3} /></g>
          <Grano x={600} y={1040} l={200} rot={-8} color={mixHex(BLANCO_ARROZ, ORO2, kprog(T, K.Ge + 4.0, K.Ge + 5.6))} g={7} brillo={kprog(T, K.Ge + 3.6, K.Ge + 4.4)} />
          {[[250, 760, K.Ge + 1.0], [830, 820, K.Ge + 1.8]].map(([sx, sy, t0], i) => { const u = kprog(T, t0, t0 + 1.6, kEase.suave); if (T < t0 || u >= 1) return null;
            const px = klerp(sx, 600, u), py = klerp(sy, 1030, u) - Math.sin(Math.PI * u) * 160;
            return <g key={i} transform={`translate(${px - 90} ${py}) scale(${1 - u * 0.5})`}><ADNHebra T={T} x={0} y={0} largo={180} alto={40} vueltas={1.5} grosor={6} colores={i ? [KC.mint, KC.cyan] : [KC.yellow, KC.orange]} /></g>; })}
          </g>
        </Capa>
      </Escena>
      {/* 4 · el camino encendido: el grano se pinta de amarillo */}
      <Escena T={T} a={K.Ca} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <div style={{ position:'absolute', left:540 - 540, top:960 - 540, width:1080, height:1080 }}>
          <GranoPorDentro T={T} cx={540} cy={540} r={540} on={kprog(T, K.Ca, K.Ca + 0.6)} dorado={kprog(T, K.Ca + 0.8, K.Ca + 3.2, kEase.suave)} />
        </div>
        <Ambiente T={T} n={30} color="rgba(255,207,61,.35)" />
      </Escena>
      {/* 5 · ¿de qué te sirve? escala del grano */}
      <Escena T={T} a={K.Pr} b={K.In} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Grano x={540} y={1080} l={780} rot={0} color={ORO2} g={12} />
        </Capa>
        <div style={{ position:'absolute', left:240, top:560, width:600, textAlign:'center', font:`400 300px/1 ${KF.titulo}`, color:KC.pink, WebkitTextStroke:`10px ${KC.ink}`, transform:`rotate(${Math.sin(T * 3) * 6}deg)` }}>?</div>
      </Escena>
      {/* 6 · tu cuerpo lo vuelve vitamina A */}
      <Escena T={T} a={K.In} b={K.Oj} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          {[-330, -110, 110, 330].map((dx, i) => <Enterocito key={i} x={540 + dx} y={1000} w={210} h={300} />)}
          <Betacaroteno x={540} y={klerp(560, 800, kprog(T, K.In, K.In + 0.9, kEase.sale))} s={1.4} corte={corta} brillo={corta} color={corta > 0 ? ORO2 : NARANJA} />
          {T > K.In + 0.5 && T < K.In + 1.8 && <Tijeras x={540} y={kprog(T, K.In + 0.5, K.In + 1.0) * 120 + 700} s={0.9} abre={Math.abs(Math.sin(T * 9))} />}
          {T > K.In + 1.8 && [-1, 1].map((ld, i) => { const u = kprog(T, K.In + 1.8, K.In + 3.0, kEase.suave), pasa = i === 0;
            return <g key={i} opacity={pasa ? 1 : 1 - u * 0.6}><circle cx={540 + ld * 100} cy={pasa ? klerp(800, 1150, u) : 800} r={60} fill={ORO2} opacity=".25" /></g>; })}
        </Capa>
      </Escena>
      {/* 7 · ojos: no ves de noche, luego te quedas ciego */}
      <Escena T={T} a={K.Oj} b={K.Ni} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#1f3f80', '#060912', noche) }}></div>
        <Capa>
          <circle cx={860} cy={1370} r={70} fill="#fff6c8" opacity={0.25 + 0.75 * (1 - noche)} />
          {[[120, 1330, 160], [300, 1290, 200], [520, 1340, 150]].map(([hx, hy, hw], i) => <g key={i} opacity={1 - noche * 0.85}>
            <rect x={hx} y={hy} width={hw} height={1450 - hy} fill="#ffcf8a" stroke={KC.ink} strokeWidth={6} />
            <path d={`M ${hx - 20} ${hy} L ${hx + hw / 2} ${hy - 70} L ${hx + hw + 20} ${hy} Z`} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
          </g>)}
          <Ojo T={T} x={540} y={930} s={1.6} nube={nube} />
        </Capa>
      </Escena>
      {/* 8 · 190 millones de niños (OMS, datos 1995–2005): cada figura = 2 millones */}
      <Escena T={T} a={K.Ni} b={K.Ma} zoom={0.02}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          {Array.from({ length: 95 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), on = T > K.Ni + 0.4 + i * 0.03;
            return <Nino key={i} x={130 + c * 91} y={575 + f * 70} s={on ? 1 : 0.8} color={on ? KC.yellow : 'rgba(255,255,255,.35)'} />; })}
        </Capa>
      </Escena>
      {/* 9 · Golden Rice 2: gen de maíz, hasta 23 veces más pigmento */}
      <Escena T={T} a={K.Ma} b={K.Es} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          {narciso2maiz < 1 && <g transform={`translate(${-380 * narciso2maiz} 0)`} opacity={1 - narciso2maiz}><Narciso T={T} x={330} y={700} s={1.15} /></g>}
          {narciso2maiz > 0 && <g transform={`translate(${380 * (1 - narciso2maiz)} 0)`}><Mazorca x={330} y={820} s={1.2} rot={-10} /></g>}
          <Grano x={740} y={1010} l={340} rot={-20} color={mixHex('#ffe7a0', ORO, pig)} g={9} brillo={pig} />
        </Capa>
        <Medidor T={T} at={K.Ma + 1.5} until={K.Es - 0.2} valor={(t) => klerp(1 / 23, 1, kprog(t, K.Ma + 1.6, K.Ma + 4.6, kEase.suave))} etiqueta="carotenoides en el grano" texto={(v) => '×' + Math.max(1, Math.round(v * 23))} x={90} y={1300} color={ORO} />
      </Escena>
      {/* 10 · el estudio publicado en 2009 (Boston): cinco voluntarios */}
      <Escena T={T} a={K.Es} b={K.Fi} zoom={0.03}>
        <FondoLunares color={KC.coral} />
        <Capa>
          {Array.from({ length: 5 }, (_, i) => { const x = 140 + i * 200, sube = kprog(T, K.Es + 3.0 + i * 0.25, K.Es + 4.0 + i * 0.25, kEase.suave);
            return <g key={i}>
              <Plato T={T} x={x} y={1200} s={0.36} dorado={1} seed={10 + i} />
              <Nino x={x} y={1040} s={2.6} color={[KC.yellow, KC.mint, KC.cyan, KC.lilac, KC.paper][i]} />
              {sube > 0 && <g opacity={sube}><path d={`M ${x} ${900} L ${x} ${klerp(900, 750, sube)}`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
                <path d={`M ${x} ${klerp(900, 710, sube) - 40} q 34 40 0 70 q -34 -30 0 -70 Z`} fill={ORO2} stroke={KC.ink} strokeWidth={5} /></g>}
            </g>; })}
        </Capa>
      </Escena>
      {/* 11 · Filipinas: aprobado en 2021, frenado en 2024 */}
      <Escena T={T} a={K.Fi} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.leaf} />
        <Capa>
          <MapaFilipinas x={20} y={380} k={70} />
          {Array.from({ length: 18 }, (_, i) => { const c = i % 6, f = Math.floor(i / 6), u = kprog(T, K.Fi + 0.6 + i * 0.05, K.Fi + 1.2 + i * 0.05, kEase.rebote);
            const x = 730 + c * 56, y = 820 + f * 95;
            return <g key={i} transform={`translate(${x} ${y}) scale(${u})`} opacity={1 - kprog(T, K.Fi + 2.6, K.Fi + 3.4) * 0.6}>
              <path d="M 0 0 Q -20 -50 -30 -80 M 0 0 Q 0 -60 4 -100 M 0 0 Q 20 -50 34 -76" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
              <path d="M 0 0 Q -20 -50 -30 -80 M 0 0 Q 0 -60 4 -100 M 0 0 Q 20 -50 34 -76" stroke="#bff07a" strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>; })}
          {T > K.Fi + 1.9 && <Mazo x={870} y={kprog(T, K.Fi + 1.9, K.Fi + 2.2, kEase.sale) * 0 + 880} rot={klerp(-60, 10, kprog(T, K.Fi + 1.9, K.Fi + 2.2, kEase.sale))} />}
        </Capa>
      </Escena>
      {/* 12 · cierre: el plato del inicio, por dentro con la fábrica encendida */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Plato T={T} x={540} y={1210} s={1.25} dorado={1} seed={3} vapor={1} />
        </Capa>
      </Escena>

      {/* lupas (por dentro del grano) */}
      <Lupa T={T} at={K.Gr + 0.3} until={K.Ge - 0.2} x={540} y={790} r={330} fx={540} fy={1330} tinte={KC.cyan} etiqueta="POR DENTRO · el grano"
        interior={(t, r) => <GranoPorDentro T={t} cx={r} cy={r} r={r} on={0} dorado={0} />} />
      <Lupa T={T} at={K.Ci + 0.4} until={K.Ou - 0.1} x={540} y={640} r={300} fx={560} fy={1060} tinte={ORO2} etiqueta="POR DENTRO · grano dorado"
        interior={(t, r) => <GranoPorDentro T={t} cx={r} cy={r} r={r} on={1} dorado={1} />} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.H - 0.2} texto="¿pintado?" x={260} y={480} tam={54} />
      <Etq T={T} at={K.G + 0.6} until={K.H - 0.2} x={40} y={1420} texto="arroz blanco" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 1.0} until={K.H - 0.2} x={1040} y={1420} texto="arroz dorado" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.H + 0.4} until={K.Gr - 0.2} x={1040} y={1420} lado="izq" texto="Oryza sativa" it tam={36} color={KC.texto} />
      <Chip T={T} at={K.H + 1.4} until={K.Gr - 0.2} texto="betacaroteno: en las hojas" y={1500} tam={42} borde={NARANJA} />
      <Etq T={T} at={K.H + 1.6} until={K.Gr - 0.2} x={40} y={1320} texto="el mismo pigmento" tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 3.6} until={K.Gr - 0.2} texto="en el grano: no" x={790} y={790} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Gr + 1.0} until={K.Ge - 0.2} texto="fábrica: APAGADA" y={1500} tam={44} borde="#8a8f99" />
      <Chip T={T} at={K.Ge + 0.3} until={K.Ca - 0.2} texto="2000 · Potrykus y Beyer · Science" y={1500} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Ge + 0.6} until={K.Ca - 0.2} x={60} y={1175} texto="narciso" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ge + 0.8} until={K.Ca - 0.2} x={60} y={1230} texto="Narcissus pseudonarcissus" it tam={28} color={KC.texto} />
      <Etq T={T} at={K.Ge + 1.2} until={K.Ca - 0.2} x={1040} y={960} texto="bacteria" lado="izq" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ge + 1.4} until={K.Ca - 0.2} x={1040} y={1005} texto="Pantoea ananatis" lado="izq" it tam={28} color={KC.texto} />
      <Chip T={T} at={K.Ca + 0.3} until={K.Pr - 0.2} texto="fábrica: ENCENDIDA" y={1500} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.Ca + 1.4} until={K.Pr - 0.2} x={560} y={700} texto="betacaroteno" tam={36} color={ORO2} />
      {T > K.Pr + 0.2 && T < K.In - 0.1 && <Escala T={T} z={1} pxPorMm={130} y={1460} x={60} objetivo={300} color={KC.ink} />}
      <Etq T={T} at={K.Pr + 0.3} until={K.In - 0.2} x={290} y={1300} texto="grano de arroz ≈ 6 mm" tam={32} color={KC.ink} />
      <Chip T={T} at={K.In + 1.6} until={K.Oj - 0.2} texto="betacaroteno → vitamina A" y={1500} tam={42} borde={ORO2} />
      <Etq T={T} at={K.In + 0.2} until={K.Oj - 0.2} x={60} y={1380} texto="células del intestino" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Oj + 0.8} until={K.Oj + 2.4} texto="1ª señal: no ver de noche" y={1500} tam={42} borde={KC.cyan} />
      <Chip T={T} at={K.Oj + 2.6} until={K.Ni - 0.2} texto="causa prevenible de ceguera infantil" y={1500} tam={34} borde={KC.red} />
      <NumeroGigante T={T} at={K.Ni + 0.6} until={K.Ma - 0.2} valor={190} dur={2.2} sufijo=" millones" y={1345} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Ni + 1.2} until={K.Ma - 0.2} texto="niños preescolares · OMS · datos 1995–2005" y={1490} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.Ni + 2.0} until={K.Ma - 0.2} x={130} y={495} texto="cada figura = 2 millones" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ma + 0.4} until={K.Es - 0.2} texto="Golden Rice 2 · 2005" y={1460} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Ma + 1.4} until={K.Es - 0.2} x={460} y={600} texto="gen de maíz" tam={34} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.9} anio="2009" quien="Publicado en 2009 · Boston" revista="Universidad Tufts · 5 voluntarios" x={540} y={600} />
      <Chip T={T} at={K.Es + 3.2} until={K.Fi - 0.2} texto="5 voluntarios → vitamina A" y={1420} tam={42} borde={ORO2} />
      <Sello T={T} at={K.Fi + 0.6} until={K.Ci - 0.2} x={640} y={1345} texto="2021 · SE APRUEBA" color={KC.teal} rot={-4} tam={52} />
      <Sello T={T} at={K.Fi + 2.2} until={K.Ci - 0.2} x={540} y={1480} texto="2024 · UN TRIBUNAL LO FRENA" color={KC.red} rot={3} tam={46} />
      <Etq T={T} at={K.Fi + 0.3} until={K.Ci - 0.2} x={480} y={520} texto="Filipinas" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="no es pintura: es betacaroteno" y={1450} tam={40} borde={ORO2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No está pintado: *fabrica algo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Gr - 0.1} texto="Betacaroteno: *en las hojas.*" />
      <Subtitulo T={T} idx={2} at={K.Gr + 0.1} until={K.Ge - 0.1} texto="En el grano: *apagado.*" />
      <Subtitulo T={T} idx={3} at={K.Ge + 0.1} until={K.Ca - 0.1} texto="Genes de *narciso y bacteria.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.Pr - 0.1} texto="El grano *se pinta de amarillo.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.In - 0.1} texto="¿Y de qué *te sirve?*" />
      <Subtitulo T={T} idx={6} at={K.In + 0.1} until={K.Oj - 0.1} texto="Lo vuelves *vitamina A.*" />
      <Subtitulo T={T} idx={7} at={K.Oj + 0.1} until={K.Ni - 0.1} texto="Sin ella: *no ves de noche.*" />
      <Subtitulo T={T} idx={8} at={K.Ni + 0.1} until={K.Ma - 0.1} texto="190 millones de niños *con poca.*" />
      <Subtitulo T={T} idx={9} at={K.Ma + 0.1} until={K.Es - 0.1} texto="Gen de maíz: *hasta 23 veces más.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Fi - 0.1} texto="Su cuerpo *sí lo convirtió.*" />
      <Subtitulo T={T} idx={11} at={K.Fi + 0.1} until={K.Ci - 0.1} texto="2021: sí · 2024: *frenado.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El mismo grano, *encendido.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Hojas + 2.6, CUES.Grano - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Grano + 0.6, CUES.Genes - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Genes + 3.0, CUES.Camino - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Intestino - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Ojos + 0.3, CUES.Ninos - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Maiz + 1.9, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'grande'],
        [CUES.Estudio + 3.0, CUES.Filipinas - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Filipinas + 1.0, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="27" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArrozDoradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArrozDorado /></CompositionStage></div>;
}
window.ArrozDoradoApp = ArrozDoradoApp;
