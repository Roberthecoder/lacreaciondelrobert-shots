// ia-kit.jsx — piezas de la serie Shot IA (lote IA 01, 27 oct 2026). Se carga después de kit-robert.jsx.
// Todo es esquemático y función del tiempo T, como el resto del motor.

// Fondo oscuro de "por dentro de la máquina": pistas de circuito con pulsos que viajan.
function FondoCircuito({ T, color = KC.cyan, fondo = KC.noche, n = 22, seed = 3 }) {
  const r = krng(seed), pistas = Array.from({ length: n }, () => {
    const x = Math.round(r() * 20) * 54, y = Math.round(r() * 34) * 56, l = 120 + r() * 360, v = r() > 0.5;
    return { x, y, l, v, f: 0.15 + r() * 0.35, ph: r() };
  });
  return <div style={{ position:'absolute', inset:0, background:fondo }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {pistas.map((p, i) => { const x2 = p.v ? p.x : p.x + p.l, y2 = p.v ? p.y + p.l : p.y, u = ((T * p.f + p.ph) % 1);
        return <g key={i}>
          <line x1={p.x} y1={p.y} x2={x2} y2={y2} stroke={color} strokeOpacity=".16" strokeWidth={5} strokeLinecap="round" />
          <circle cx={p.x} cy={p.y} r={8} fill="none" stroke={color} strokeOpacity=".25" strokeWidth={4} />
          <circle cx={klerp(p.x, x2, u)} cy={klerp(p.y, y2, u)} r={6} fill={color} opacity={0.75 * Math.sin(Math.PI * u)} />
        </g>; })}
    </svg>
  </div>;
}

// Red neuronal: columnas de nodos unidos; una onda de activación la recorre de izquierda a derecha.
// onda: 0..1 (posición de la onda) o null; capas: nodos por capa.
function RedNeuronal({ T, x = 140, y = 600, ancho = 800, alto = 520, capas = [4, 6, 6, 6, 3], onda = null, color = KC.cyan, acento = KC.yellow, o = 1 }) {
  const cx = (i) => x + (ancho * i) / (capas.length - 1), cy = (i, j) => y + alto / 2 + (j - (capas[i] - 1) / 2) * (alto / Math.max(...capas));
  const brillo = (i) => onda == null ? 0 : Math.max(0, 1 - Math.abs(onda * (capas.length - 1) - i) * 1.4);
  const lineas = [];
  for (let i = 0; i < capas.length - 1; i++) for (let a = 0; a < capas[i]; a++) for (let b = 0; b < capas[i + 1]; b++) {
    const k = (brillo(i) + brillo(i + 1)) / 2;
    lineas.push(<line key={`${i}-${a}-${b}`} x1={cx(i)} y1={cy(i, a)} x2={cx(i + 1)} y2={cy(i + 1, b)} stroke={k > 0.2 ? acento : color} strokeOpacity={0.18 + 0.6 * k} strokeWidth={2 + 3 * k} />);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o }}>
    {lineas}
    {capas.map((n, i) => Array.from({ length: n }, (_, j) => { const k = brillo(i), late = 1 + 0.12 * Math.sin(T * 4 + i + j);
      return <circle key={`n${i}-${j}`} cx={cx(i)} cy={cy(i, j)} r={22 * late} fill={k > 0.2 ? acento : '#1d2b4a'} stroke={k > 0.2 ? KC.ink : color} strokeWidth={5} />; }))}
  </svg>;
}

// Tarjeta de video (GPU) esquemática con ventiladores que giran. calor 0..1 la pone roja.
function TarjetaGPU({ T, x, y, s = 1, calor = 0, gira = 1, etiqueta = 'H100' }) {
  const ang = T * 720 * gira;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-90} width={420} height={180} rx={18} fill={mixHex('#2b3445', '#7a1f1f', calor)} stroke={KC.ink} strokeWidth={8} />
    <rect x={-170} y={90} width={300} height={22} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={-160 + i * 25} y1={92} x2={-160 + i * 25} y2={110} stroke={KC.ink} strokeWidth={3} />)}
    {[-95, 95].map((fx) => <g key={fx} transform={`translate(${fx} 0)`}>
      <circle r={68} fill="#151a24" stroke={KC.ink} strokeWidth={6} />
      <g transform={`rotate(${ang + fx})`}>{[0, 72, 144, 216, 288].map((a) => <path key={a} d="M 0 0 Q 30 -20 56 -8 Q 30 4 0 0 Z" transform={`rotate(${a})`} fill="#7f8ba3" stroke={KC.ink} strokeWidth={3} />)}</g>
      <circle r={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    </g>)}
    <text x={0} y={-62} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{etiqueta}</text>
    {calor > 0.05 && [0, 1, 2].map((k) => <path key={k} d={`M ${-60 + k * 60} -110 q 14 -20 0 -40 q -14 -20 0 -40`} stroke={KC.orange} strokeWidth={7} fill="none" strokeLinecap="round" opacity={calor * (0.5 + 0.5 * Math.sin(T * 6 + k))} transform={`translate(0 ${-((T * 30 + k * 13) % 30)})`} />)}
  </g>;
}

// Ficha de texto (token): pastilla con un pedazo de palabra.
function Ficha({ x, y, texto, color = KC.yellow, s = 1, rot = 0, o = 1, tam = 44 }) {
  const w = Math.max(70, texto.length * tam * 0.62 + 40);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-tam * 0.85} width={w} height={tam * 1.7} rx={18} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={tam * 0.32} textAnchor="middle" style={{ font:`700 ${tam}px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

// Celular con un chat. mensajes: [{ at, yo, texto }] (yo = burbuja del usuario a la derecha).
function CelularChat({ T, x = 540, y = 960, s = 1, mensajes = [], escribe = null, rot = 0, tam = 32 }) {
  const vis = mensajes.filter((m) => T >= m.at);
  return <div style={{ position:'absolute', left:x, top:y, width:560, height:1000, transform:`translate(-50%,-50%) scale(${s}) rotate(${rot}deg)`, zIndex:20,
    background:'#10131a', border:`12px solid ${KC.ink}`, borderRadius:70, boxShadow:'0 30px 60px rgba(0,0,0,.45)', overflow:'hidden' }}>
    <div style={{ position:'absolute', left:180, top:16, width:200, height:36, borderRadius:20, background:KC.ink }}></div>
    <div style={{ position:'absolute', left:24, right:24, top:90, bottom:40, display:'flex', flexDirection:'column', gap:18 }}>
      {vis.map((m, i) => { const e = kprog(T, m.at, m.at + 0.35, kEase.sale);
        return <div key={i} style={{ alignSelf: m.yo ? 'flex-end' : 'flex-start', maxWidth:420, opacity:e, transform:`translateY(${(1 - e) * 30}px)`,
          background: m.yo ? KC.cyan : '#262c3a', color: m.yo ? KC.ink : KC.texto, borderRadius: m.yo ? '28px 28px 6px 28px' : '28px 28px 28px 6px',
          padding:'16px 22px', font:`800 ${tam}px/1.25 ${KF.texto}` }}>{m.texto}</div>; })}
      {escribe != null && T >= escribe[0] && T < escribe[1] && <div style={{ alignSelf:'flex-start', background:'#262c3a', borderRadius:24, padding:'18px 26px', display:'flex', gap:12 }}>
        {[0, 1, 2].map((k) => <div key={k} style={{ width:16, height:16, borderRadius:8, background:KC.texto, opacity:0.3 + 0.7 * Math.max(0, Math.sin(T * 8 - k)) }}></div>)}</div>}
    </div>
  </div>;
}

// Robotito de la IA (pantalla con cara). cara: 'feliz' | 'duda' | 'seguro'
function Robotito({ x, y, s = 1, T = 0, cara = 'feliz', color = KC.cyan }) {
  const b = Math.sin(T * 3) * 6, parpadea = (T % 3.2) < 0.12;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <line x1={0} y1={-150} x2={0} y2={-110} stroke={KC.ink} strokeWidth={8} /><circle cx={0} cy={-160} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <rect x={-130} y={-110} width={260} height={200} rx={50} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-100} y={-80} width={200} height={140} rx={30} fill="#10131a" />
    {parpadea ? <><line x1={-60} y1={-20} x2={-24} y2={-20} stroke={KC.mint} strokeWidth={8} /><line x1={24} y1={-20} x2={60} y2={-20} stroke={KC.mint} strokeWidth={8} /></>
      : <><circle cx={-42} cy={-20} r={16} fill={KC.mint} /><circle cx={42} cy={-20} r={16} fill={KC.mint} /></>}
    {cara === 'feliz' && <path d="M -40 22 Q 0 52 40 22" stroke={KC.mint} strokeWidth={8} fill="none" strokeLinecap="round" />}
    {cara === 'duda' && <path d="M -36 30 Q -12 18 10 30 T 40 26" stroke={KC.mint} strokeWidth={8} fill="none" strokeLinecap="round" />}
    {cara === 'seguro' && <><path d="M -40 26 L 40 26" stroke={KC.mint} strokeWidth={8} strokeLinecap="round" /><path d="M -70 -50 L -20 -40 M 70 -50 L 20 -40" stroke={KC.mint} strokeWidth={7} strokeLinecap="round" /></>}
    <rect x={-90} y={90} width={180} height={50} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />
  </g>;
}

Object.assign(window, { FondoCircuito, RedNeuronal, TarjetaGPU, Ficha, CelularChat, Robotito });
