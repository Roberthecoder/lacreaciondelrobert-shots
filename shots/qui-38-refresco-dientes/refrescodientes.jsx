// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Químico #38 · Ese refresco no solo es dulce: es ácido (el refresco y tu esmalte) — NARRADO (N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Lata genérica, sin marca.
const REF = '#5a2a12', REF2 = '#7a3d1c', ESMALTE = '#fbfaf3', DENTINA = '#f2d88f', PULPA = '#ff8fa3', LATA = '#2fb3a0';

// ---------- piezas ----------
function Lata({ x, y, s = 1, rot = 0, etiqueta = 'REFRESCO', color = LATA, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-160} width={180} height={320} rx={26} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-90} y={-60} width={180} height={110} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    <ellipse cx={0} cy={-160} rx={88} ry={20} fill="#c9ced6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={30} cy={-162} rx={22} ry={8} fill="#0b1020" />
    <rect x={-70} y={-140} width={18} height={260} rx={9} fill="#fff" opacity={0.3} />
  </g>;
}
// Sonrisa: labios, dos filas de dientes. lavado = 0..1 (dientes ligeramente opacos/erosionados en el cierre)
function Sonrisa({ T, x, y, s = 1, mate = 0 }) {
  const dientes = (fila) => [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((k, i) => {
    const w = i === 2 || i === 3 ? 92 : 78, cx = k * 86, top = fila ? 40 : -118, h = fila ? 70 : 108;
    return <g key={fila + '' + i}>
      <rect x={cx - w / 2} y={top} width={w} height={h} rx={22} fill={mixHex(ESMALTE, '#e8dcb0', mate)} stroke={KC.ink} strokeWidth={6} />
      {!fila && <rect x={cx - w / 2 + 12} y={top + 12} width={14} height={h * 0.5} rx={7} fill="#fff" opacity={0.8 - mate * 0.6} />}
    </g>;
  });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -380 -60 Q -200 -230 0 -170 Q 200 -230 380 -60 Q 260 250 0 260 Q -260 250 -380 -60 Z" fill="#e2445c" stroke={KC.ink} strokeWidth={12} />
    <path d="M -320 -60 Q 0 -150 320 -60 Q 230 190 0 200 Q -230 190 -320 -60 Z" fill="#5b1020" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={140} rx={170} ry={50} fill="#d9536b" />
    {dientes(0)}{dientes(1)}
  </g>;
}
// Corte de un diente (corona y raíz): esmalte, dentina y pulpa. Esquemático.
function DienteCorte({ x, y, s = 1, erosion = 0 }) {
  const e = erosion;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -150 Q -210 -300 -100 -300 Q -40 -300 0 -260 Q 40 -300 100 -300 Q 210 -300 200 -150 L 170 40 Q 150 300 90 360 Q 60 380 40 300 L 0 140 L -40 300 Q -60 380 -90 360 Q -150 300 -170 40 Z" fill={DENTINA} stroke={KC.ink} strokeWidth={10} />
    <path d={`M -200 -150 Q -210 -300 -100 -300 Q -40 -300 0 -260 Q 40 -300 100 -300 Q 210 -300 200 -150 L 186 -40 L 140 -40 L 150 -150 Q 155 ${-240 + e * 20} 100 ${-245 + e * 25} Q 40 -245 0 -205 Q -40 -245 -100 ${-245 + e * 25} Q -155 ${-240 + e * 20} -150 -150 L -140 -40 L -186 -40 Z`} fill={ESMALTE} stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -150 Q 0 -190 70 -150 L 60 40 L 30 220 L 0 120 L -30 220 L -60 40 Z" fill={PULPA} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Varilla de cristal hexagonal (vista de lado, esquemática).
function Cristal({ x, y, w = 70, h = 300, o = 1, come = 0, T = 0, i = 0 }) {
  const top = y - h + come * h * 0.45, tiembla = come > 0 && come < 1 ? Math.sin(T * 40 + i) * 3 : 0;
  const rug = come > 0.05 ? `L ${x + w * 0.75} ${top + 10 + come * 12} L ${x + w * 0.5} ${top - 6} L ${x + w * 0.25} ${top + 14 + come * 10}` : '';
  return <g opacity={o} transform={`translate(${tiembla} 0)`}>
    <path d={`M ${x} ${y} L ${x} ${top} ${rug} L ${x + w} ${top} L ${x + w} ${y} Z`} fill="#3f77a3" stroke="#bfe6ff" strokeWidth={5} />
    <path d={`M ${x + w * 0.3} ${y - 6} L ${x + w * 0.3} ${top + 16}`} stroke="#fff" strokeWidth={6} opacity={0.6} />
  </g>;
}
// Medidor de pH vertical: 14 arriba (azul), 0 abajo (rojo). valor = pH.
function PHMetro({ T, at, until, x, y0, y1, valor, etiqueta, linea55 = true }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const v = typeof valor === 'function' ? valor(T) : valor;
  const py = (p) => klerp(y1, y0, p / 14), ay = py(v);
  return <svg width={KW} height={KH} viewBox={`0 0 ${KW} ${KH}`} style={{ position:'absolute', left:0, top:0, zIndex:41, opacity:e.o }}>
    <defs><linearGradient id={`ph${x}`} x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#ff3b2f" /><stop offset="0.3" stopColor="#ff8a1f" /><stop offset="0.45" stopColor="#ffe11a" /><stop offset="0.55" stopColor="#2fe0a8" /><stop offset="1" stopColor="#2346ff" /></linearGradient></defs>
    <rect x={x - 26} y={y0} width={52} height={y1 - y0} rx={26} fill={`url(#ph${x})`} stroke={KC.ink} strokeWidth={7} />
    {[0, 7, 14].map((p) => <text key={p} x={x - 40} y={py(p) + 12} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">{p}</text>)}
    {linea55 && <g><line x1={x - 60} y1={py(5.5)} x2={x + 60} y2={py(5.5)} stroke="#fff" strokeWidth={5} strokeDasharray="10 8" />
      <text x={x - 66} y={py(5.5) + 10} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">≈5.5</text></g>}
    <path d={`M ${x + 34} ${ay} l 40 -24 l 0 48 Z`} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={x + 60} y={y0 - 22} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{etiqueta}</text>
  </svg>;
}
function Ion({ x, y, texto, color, r = 34 }) {
  return <g><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={x} y={y + 9} textAnchor="middle" style={{ font:`700 ${texto.length > 4 ? r * 0.42 : r * 0.62}px ${KF.mono}` }} fill="#0b1020">{texto}</text></g>;
}
const MOL_FOSF = { atomos: [[0, 0, 40, KC.orange, 'P'], [0, -78, 30, QA.O, 'O'], [-74, 26, 30, QA.O, 'O'], [74, 26, 30, QA.O, 'O'], [0, 82, 30, QA.O, 'O'], [-122, 8, 20, QA.H, 'H'], [122, 8, 20, QA.H, 'H'], [0, 132, 20, QA.H, 'H']], enlaces: [[0, 1], [0, 2], [0, 3], [0, 4], [2, 5], [3, 6], [4, 7]] };
const MOL_CITR = { atomos: [[-90, 0, 30, QA.C, 'C'], [0, 0, 30, QA.C, 'C'], [90, 0, 30, QA.C, 'C'], [-150, -60, 26, QA.C, 'C'], [150, -60, 26, QA.C, 'C'], [0, -90, 26, QA.C, 'C'], [0, 80, 26, QA.O, 'O'], [-210, -40, 24, QA.O, 'O'], [210, -40, 24, QA.O, 'O'], [0, -160, 24, QA.O, 'O'], [-250, -70, 16, QA.H, 'H'], [250, -70, 16, QA.H, 'H'], [40, -190, 16, QA.H, 'H']], enlaces: [[0, 1], [1, 2], [0, 3], [2, 4], [1, 5], [1, 6], [3, 7], [4, 8], [5, 9], [7, 10], [8, 11], [9, 12]] };
function Hmas({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle r={22} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text y={8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">H⁺</text></g>;
}
function Cubo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><rect x={-30} y={-30} width={60} height={60} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-10} cy={-8} r={4} fill="#d9d2c5" /><circle cx={10} cy={8} r={4} fill="#d9d2c5" /></g>;
}
function Vaso({ x, y, s = 1, popote = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {popote && <path d="M 30 -140 L 70 -260 L 120 -260" stroke={KC.pink} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    <path d="M -90 -150 L 90 -150 L 70 150 L -70 150 Z" fill="rgba(200,235,255,.55)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -80 -60 L 80 -60 L 70 140 L -70 140 Z" fill="#7fc8ff" opacity={0.75} />
    <text x={0} y={60} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>AGUA</text>
  </g>;
}
function Cepillo({ x, y, s = 1, rot = -20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-170} y={-18} width={260} height={36} rx={18} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
    <rect x={80} y={-24} width={110} height={30} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={90 + i * 16} y={-74} width={10} height={50} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
function Reloj({ T, x, y, r = 80, t0 = 0 }) {
  const a = (T - t0) * 3.2;
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-14} y={-r - 26} width={28} height={22} rx={5} fill="#c9ced6" />
    <line x1={0} y1={0} x2={Math.sin(a) * r * 0.75} y2={-Math.cos(a) * r * 0.75} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={9} fill="#0b1020" /></g>;
}
// Perfil esquemático: labios, incisivo de enfrente y el popote pasando por detrás.
function PerfilPopote({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -160 -170 Q -40 -190 20 -120 Q 60 -60 40 0 Q 70 50 30 110 Q -40 190 -160 170 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M 20 -40 Q 60 -30 50 0 Q 60 30 20 40 L -40 30 L -40 -30 Z" fill="#5b1020" stroke={KC.ink} strokeWidth={6} />
    <path d="M 4 -36 L 24 -36 L 20 6 L 2 6 Z" fill={ESMALTE} stroke={KC.ink} strokeWidth={5} />
    <path d="M 190 -10 L -30 4" stroke={KC.pink} strokeWidth={16} strokeLinecap="round" />
    <path d="M -34 6 q -30 10 -60 0" stroke="#7a3d1c" strokeWidth={10} strokeLinecap="round" fill="none" />
  </g>;
}
function Escalita({ texto, ancho = 120, left = 60 }) {
  return <div style={{ position:'absolute', left, top:1640, zIndex:40, display:'flex', alignItems:'center', gap:14, font:`700 26px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>
    <div style={{ width:ancho, height:8, background:KC.texto, border:`2px solid ${KC.ink}` }}></div>{texto}</div>;
}

// ---------- shot ----------
function RefrescoDientes() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Esmalte, C: CUES.Critico, A: CUES.Acido, Er: CUES.Erosion, Az: CUES.Azucar, P: CUES.Pregunta, Es: CUES.Estudio, Co: CUES.Consejo, D: CUES.Dentista, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const micro = K.E + 2.4;              // entra al mundo de los cristales
  const vierte = kprog(T, K.G - 0.2, K.G + 0.3, kEase.sale);
  // pH de la boca: ~7, baja apenas bajo 5.5 (Critico); el refresco ~2.4 en un medidor aparte (Acido)
  const phBoca = (t) => klerp(7, 5.1, kprog(t, K.C + 0.6, K.C + 3.2, kEase.suave));
  const come = (i) => kprog(T, K.Er + 0.4 + (i % 5) * 0.35, K.Er + 3.6 + (i % 5) * 0.35, kEase.suave);
  const NCR = 11, R = krng(11);
  const iones = Array.from({ length: 14 }, (_, i) => [140 + R() * 700, R(), i % 2]);
  const lluviaH = Array.from({ length: 18 }, (_, i) => [130 + R() * 720, R() * 1.4, R()]);
  const estMid = K.Es + 5.3;            // en el estudio: de la cuadrícula al 2.4
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la lata vierte refresco sobre una sonrisa */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Sonrisa T={T} x={540} y={980} s={1.15} />
          <Chorro T={T} x0={400} y0={640} x1={457} y1={944} color={REF2} ancho={26} o={vierte * (1 - kprog(T, K.G + 3.6, K.G + 4.2))} />
          <Lata x={300} y={560} s={0.95} rot={klerp(70, 125, vierte)} />
          <Burbujas T={T} x={255} y={790} w={570} h={310} n={26} f={vierte} color="rgba(255,255,255,.85)" seed={4} rmax={14} />
          {T > K.G + 2.4 && [[-180, -60], [70, -70], [240, -40]].map(([dx, dy], i) => { const p = kprog(T, K.G + 2.4 + i * 0.25, K.G + 3.0 + i * 0.25);
            return <path key={i} transform={`translate(${540 + dx * 1.18} ${980 + dy * 1.18}) scale(${Math.sin(p * Math.PI) * 1.4})`} d="M 0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />; })}
        </SvgCapa>
        <Escalita texto="1 cm (esquemático)" ancho={142} left={140} />
      </Escena>
      {/* 1 · el diente por dentro */}
      <Escena T={T} a={K.E} b={micro} zoom={0.12} origen="50% 30%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa><DienteCorte x={540} y={850} s={1.3} />
          <circle cx={540 - 199} cy={850 - 329} r={92 + Math.sin(T * 6) * 8} fill="none" stroke={KC.red} strokeWidth={9} opacity={kprog(T, K.E + 1.4, K.E + 1.8)} /></SvgCapa>
        <Escalita texto="5 mm (esquemático)" ancho={184} />
      </Escena>
      {/* 2–4 · cristales de hidroxiapatita, el pH, los ácidos y la erosión */}
      <Escena T={T} a={micro} b={K.Az} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(127,200,255,.25)" />
        <SvgCapa>
          {Array.from({ length: NCR }, (_, i) => { const p = kprog(T, micro - 0.4 + i * 0.025, micro + 0.1 + i * 0.025, kEase.sale);   // belleza (2.ª pasada): el esmalte ya está casi completo al entrar
            return <Cristal key={i} T={T} i={i} x={70 + i * 78} y={1340} w={72} h={470 + (i % 3) * 60} o={p} come={T > K.Er ? come(i) : (T > K.C + 3.2 && T < K.A ? 0.04 : 0)} />; })}
          {/* superficie del esmalte */}
          <text x={70} y={1382} style={{ font:`700 30px ${KF.mono}` }} fill="#7fc8ff">esmalte (corte)</text>
          {/* los ácidos */}
          {T > K.A - 0.3 && <g>
            <Molecula {...MOL_FOSF} x={klerp(-200, 250, kprog(T, K.A, K.A + 0.6, kEase.sale))} y={570} s={1.05} rot={Math.sin(T * 2) * 8} o={1 - kprog(T, K.Er + 0.2, K.Er + 0.8)} />
            <Molecula {...MOL_CITR} x={klerp(1300, 625, kprog(T, K.A + 1.6, K.A + 2.2, kEase.sale))} y={580} s={0.8} rot={Math.sin(T * 1.6) * 6} o={1 - kprog(T, K.Er + 0.2, K.Er + 0.8)} />
          </g>}
          {/* lluvia de H+ contra los cristales */}
          {T > K.Er - 0.2 && T < K.Az + 0.3 && lluviaH.map(([x, d, v], i) => { const t = (T - K.Er - d * 0.6) * (0.7 + v * 0.4); if (t < 0) return null; const p = t % 1.4 / 1.4;
            return <Hmas key={i} x={x} y={klerp(400, 790, p)} s={1.35} o={1 - p * 0.3} />; })}
          {/* iones que se sueltan */}
          {T > K.Er + 1.0 && iones.map(([x, d, tipo], i) => { const p = kprog(T, K.Er + 1.0 + d * 2.4, K.Er + 3.6 + d * 2.4, kEase.suave); if (p <= 0) return null;
            return <g key={i} opacity={1 - kprog(p, 0.8, 1)}><Ion x={x + Math.sin(T * 2 + i) * 20} y={klerp(800, 440, p)} texto={tipo ? 'Ca²⁺' : 'fosfato'} color={tipo ? '#d9d2c5' : KC.orange} r={tipo ? 46 : 66} /></g>; })}
        </SvgCapa>
        <PHMetro T={T} at={K.C + 0.2} until={K.A - 0.1} x={930} y0={340} y1={730} valor={phBoca} etiqueta="pH de tu boca" />
        <Escalita texto="cristales · esquemático" />
      </Escena>
      {/* 5 · azúcar y bacterias de la placa */}
      <Escena T={T} a={K.Az} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:'#1b1030' }}></div>
        <SvgCapa>
          <path d="M -40 1120 Q 540 1060 1120 1120 L 1120 1990 L -40 1990 Z" fill="#274560" stroke="#7fc8ff" strokeWidth={6} />
          {Array.from({ length: 15 }, (_, i) => { const x = 20 + i * 74, y0 = 1112 - 60 * Math.sin(Math.PI * x / 1080) * 0.95; return <line key={'cr' + i} x1={x} y1={y0 + 24} x2={x} y2={1900} stroke="rgba(127,200,255,.14)" strokeWidth={10} strokeLinecap="round" />; })}
          <path d="M -40 1120 Q 540 1060 1120 1120 L 1120 1030 Q 540 970 -40 1030 Z" fill="rgba(200,230,90,.35)" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => { const p = kprog(T, K.Az + 0.2 + i * 0.25, K.Az + 0.9 + i * 0.25, kEase.suave); const comido = kprog(T, K.Az + 1.2 + i * 0.25, K.Az + 1.6 + i * 0.25);
            return comido < 1 ? <Cubo key={i} x={120 + i * 140} y={klerp(470, 950, p)} s={1.5 * (1 - comido)} rot={i * 23 + T * 40} /> : null; })}
          {[0, 1, 2, 3, 4, 5].map((i) => <Bacteria key={i} T={T} seed={i} x={140 + i * 160} y={1010 + (i % 2) * 24} rot={(i % 2 ? 10 : -10) + Math.sin(T * 2 + i) * 5} s={1.2} color={i % 2 ? KC.mint : KC.lilac} />)}
          {T > K.Az + 1.6 && Array.from({ length: 12 }, (_, i) => { const p = ((T - K.Az - 1.6 - i * 0.15) % 1.6) / 1.6; if (T - K.Az - 1.6 - i * 0.15 < 0) return null;
            return <Hmas key={i} x={150 + (i % 6) * 160 + Math.sin(i) * 30} y={klerp(960, 600, p)} s={1.4} o={1 - p} />; })}
        </SvgCapa>
        <Escalita texto="placa · esquemático" />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Lata x={470} y={1110} s={1.7} rot={Math.sin(T * 4) * 5} />
          <text x={680} y={770} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 8} 680 700)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · el estudio de 2016: 379 bebidas */}
      <Escena T={T} a={K.Es} b={K.Co}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T < estMid + 0.4 && Array.from({ length: 379 }, (_, i) => { const c = i % 20, r = Math.floor(i / 20), on = T >= K.Es + 0.3 + i * 0.006,   /* belleza (2.ª pasada): las 379 bebidas se encienden desde el inicio */ rojo = i < 354 && T > K.Es + 4.3;
            return <rect key={i} x={93 + c * 45} y={610 + r * 42} width={32} height={30} rx={6} fill={!on ? '#22344d' : rojo ? KC.red : '#7fc8ff'} stroke={on ? KC.ink : '#4a6a8f'} strokeWidth={on ? 3 : 2} opacity={(on ? 1 : 0.7) * (1 - kprog(T, estMid, estMid + 0.4))} />; })}
          {T > estMid && <g opacity={kprog(T, estMid, estMid + 0.4)}><Lata x={290} y={1140} s={1.5} rot={-6} /><Vaso x={800} y={1180} s={1.25} popote={false} /></g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="2016" quien="Reddy et al. · Univ. de Alabama en Birmingham" revista="JADA · pH de 379 bebidas de EUA" y={400} />
        <Chip T={T} at={K.Es + 2.7} until={K.Es + 4.2} texto="379 bebidas" y={1500} tam={46} borde={KC.yellow} />
        <Chip T={T} at={K.Es + 4.3} until={estMid - 0.1} texto="93 % con pH menor a 4" y={1500} tam={46} borde={KC.red} />
        <NumeroGigante T={T} at={estMid + 0.3} until={K.Co - 0.3} valor={2.4} desde={7} dec={1} dur={1.2} etiqueta="colas normales: pH" x={560} y={620} tam={250} color={KC.red} />
        <Chip T={T} at={estMid + 1.2} until={K.Co - 0.3} texto="agua (Birmingham) 7.2" x={790} y={1490} tam={36} borde="#7fc8ff" />
      </Escena>
      {/* 8 · consejos (ADA) */}
      <Escena T={T} a={K.Co} b={K.D}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {kprog(T, K.Co + 0.2, K.Co + 0.6) > 0 && <g opacity={kprog(T, K.Co + 0.2, K.Co + 0.6)}><Vaso x={260} y={700} s={1.15} popote={false} /><Marca x={400} y={520} ok s={0.9} /></g>}
          {kprog(T, K.Co + 1.6, K.Co + 2.0) > 0 && <g opacity={kprog(T, K.Co + 1.6, K.Co + 2.0)}><Cepillo x={740} y={740} s={1.15} /><Marca x={610} y={560} ok={false} s={0.9} /></g>}
          {kprog(T, K.Co + 3.6, K.Co + 4.0) > 0 && <g opacity={kprog(T, K.Co + 3.6, K.Co + 4.0)}><PerfilPopote x={370} y={1170} s={1.35} /></g>}
        </SvgCapa>
        <Etq T={T} at={K.Co + 0.4} until={K.D - 0.3} x={120} y={893} texto="enjuague" tam={36} color={KC.ink} />
        <Etq T={T} at={K.Co + 1.9} until={K.D - 0.3} x={590} y={890} texto="no enseguida" tam={36} color={KC.ink} />
        <Etq T={T} at={K.Co + 4.2} until={K.D - 0.3} x={635} y={1157} texto="popote detrás" tam={34} color={KC.ink} />
        <Chip T={T} at={K.Co + 0.3} until={K.D - 0.3} texto="consejos de la ADA" y={1500} tam={40} borde={KC.mint} />
      </Escena>
      {/* 9 · el dentista: grabado ácido */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.12} origen="50% 40%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g transform="translate(500 1000) scale(1.533) translate(-540 -900)">
          <DienteCorte x={540} y={900} s={0.75} />
          <g transform={`translate(${klerp(900, 630, kprog(T, K.D + 0.4, K.D + 1.2, kEase.sale))} ${klerp(480, 560, kprog(T, K.D + 0.4, K.D + 1.2))}) rotate(35)`}>
            <rect x={-30} y={-220} width={60} height={200} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={-26} y={-120} width={52} height={96} fill="#3aa0ff" />
            <path d="M -12 -20 L 12 -20 L 4 30 L -4 30 Z" fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} />
          </g>
          {T > K.D + 1.2 && <path d="M 410 700 Q 540 660 670 700" stroke="#3aa0ff" strokeWidth={22} fill="none" strokeLinecap="round" opacity={1 - kprog(T, K.D + 4.4, K.D + 4.8)} />}
          {T > K.D + 4.6 && <path d="M 400 690 Q 540 630 680 690" stroke={KC.gold2} strokeWidth={34} fill="none" strokeLinecap="round" opacity={kprog(T, K.D + 4.6, K.D + 5.2)} />}
          </g>
          {T > K.D + 1.6 && T < K.D + 4.6 && <Reloj T={T} x={900} y={1000} r={95} t0={K.D + 1.6} />}
          {T > K.D + 1.6 && T < K.D + 4.6 && <text x={900} y={1140} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>segundos</text>}
        </SvgCapa>
        <Chip T={T} at={K.D + 0.8} until={K.Ci - 0.3} texto="ácido fosfórico 37 %" y={1500} tam={44} borde="#3aa0ff" />
        <Etq T={T} at={K.D + 5.0} until={K.Ci - 0.3} x={730} y={672} texto="resina" tam={38} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: la sonrisa del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="50% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Sonrisa T={T} x={540} y={1010} s={1.15} mate={0.35} />
          <Lata x={330} y={490} s={1} rot={-8} etiqueta="pH ≈ 2.4" />
          <Vaso x={720} y={530} s={0.8} />
        </SvgCapa>
        <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="esmalte: no vuelve a crecer" y={1500} tam={42} borde={KC.red} />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.G + 2.4} texto="dulce ✓" x={720} y={560} tam={48} borde={KC.mint} />
      <Chip T={T} at={K.G + 2.5} until={K.E - 0.3} texto="…y ácido" x={720} y={560} tam={48} borde={KC.red} />
      <Etq T={T} at={K.E + 0.6} until={micro - 0.2} x={790} y={591} texto="esmalte" tam={36} color={KC.ink} />
      <Etq T={T} at={K.E + 1.0} until={micro - 0.2} x={725} y={1008} texto="dentina" tam={36} color={KC.ink} />
      <Chip T={T} at={micro + 0.4} until={K.C - 0.2} texto="hidroxiapatita Ca₁₀(PO₄)₆(OH)₂" y={1500} tam={36} borde="#7fc8ff" />
      <Chip T={T} at={K.C + 3.2} until={K.A - 0.2} texto="bajo ≈5.5: se empiezan a disolver" y={1500} tam={38} borde={KC.orange} />
      <Etq T={T} at={K.A + 0.6} until={K.Er + 0.1} x={40} y={405} texto="ácido fosfórico · colas" tam={32} color={KC.orange} />
      <Etq T={T} at={K.A + 2.2} until={K.Er + 0.1} x={800} y={705} texto="ácido cítrico" lado="izq" tam={32} color={KC.yellow} />
      <PHMetro T={T} at={K.A + 0.4} until={K.Er + 0.2} x={930} y0={340} y1={730} valor={2.4} etiqueta="pH del refresco" linea55={false} />
      <Chip T={T} at={K.Er + 1.4} until={K.Az - 0.2} texto="erosión: el esmalte se ablanda" y={1500} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Az + 0.3} until={K.P - 0.2} texto="azúcar → bacterias → ácido (caries)" y={1500} tam={38} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No solo es dulce: *es ácido.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.C - 0.1} texto="Esmalte: *cristales de hidroxiapatita.*" />
      <Subtitulo T={T} idx={2} at={K.C + 0.1} until={K.A - 0.1} texto="Bajo pH 5.5: *se disuelven.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Er - 0.1} texto="Ácido *fosfórico* y *cítrico.*" />
      <Subtitulo T={T} idx={4} at={K.Er + 0.1} until={K.Az - 0.1} texto="El esmalte *se ablanda.*" />
      <Subtitulo T={T} idx={5} at={K.Az + 0.1} until={K.P - 0.1} texto="Azúcar + bacterias = *ácido.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Qué tan *ácido es?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Co - 0.1} texto="93 % con *pH menor a 4.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.D - 0.1} texto="Agua primero, *cepillo después.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Ci - 0.1} texto="Tu dentista *también lo usa.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El esmalte perdido *no regresa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Esmalte + 0.9, CUES.Critico - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Critico + 1.0, CUES.Acido - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Acido + 1.0, CUES.Erosion - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Erosion + 1.4, CUES.Azucar - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Azucar + 0.9, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.8, CUES.Consejo - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Consejo + 0.6, CUES.Dentista - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Dentista + 0.6, CUES.Cierre - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="38" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RefrescoDientesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RefrescoDientes /></CompositionStage></div>;
}
window.RefrescoDientesApp = RefrescoDientesApp;
