// Shot Químico #43 · Lo que mata no huele ni se ve (monóxido de carbono del anafre y el boiler) — NARRADO (N1 por dentro + estudio de 1987).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático; las personas son monitos esquemáticos.
const SANGRE = '#d7263d', PIEL = '#f1b48f', BRASA = '#ff5a1f', GRIS_CO = '#9fb0c8';
const MOL_CO = { atomos: [[-26, 0, 30, QA.C, 'C'], [26, 0, 30, QA.O, 'O']], enlaces: [[0, 1]] };
const MolCO = (p) => <Molecula {...MOL_CO} {...p} />;

// ---------- piezas del shot ----------
// Anafre: bracero de lámina sobre 3 patas con carbones. encendido 0..1 (1 = brasas rojas que chisporrotean).
function Anafre({ T, x, y, s = 1, encendido = 1 }) {
  const R = krng(11);
  const carb = Array.from({ length: 9 }, (_, i) => [-90 + i * 22 + (R() - 0.5) * 8, -8 - (i % 3) * 12 - R() * 6, 20 + R() * 8, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-80, 0, 80].map((dx, i) => <path key={i} d={`M ${dx} 50 L ${dx * 1.25} 150`} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />)}
    {carb.map(([cx, cy, r, ph], i) => { const f = encendido * (0.75 + 0.25 * Math.sin(T * 7 + ph));
      return <circle key={i} cx={cx} cy={cy} r={r} fill={mixHex('#55524f', BRASA, f)} stroke={KC.ink} strokeWidth={5} />; })}
    {encendido > 0 && carb.slice(0, 6).map(([cx, cy, r, ph], i) => <circle key={'b' + i} cx={cx} cy={cy} r={r * 0.45} fill="#ffd36b" opacity={encendido * (0.5 + 0.5 * Math.sin(T * 9 + ph))} />)}
    <path d="M -140 -10 L 140 -10 L 110 60 L -110 60 Z" fill="#6e6a66" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 -16 L 150 -16" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    {[-60, 0, 60].map((dx, i) => <circle key={'h' + i} cx={dx} cy={28} r={9} fill={encendido > 0 ? BRASA : '#3a3735'} stroke={KC.ink} strokeWidth={3} />)}
    {encendido > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.9 + i / 6) % 1); return <circle key={'c' + i} cx={-70 + i * 28 + Math.sin(T * 5 + i) * 12} cy={-40 - u * 160} r={5 * (1 - u)} fill="#ffd36b" opacity={encendido * (1 - u)} />; })}
  </g>;
}
// Boiler (calentador de agua de gas) con su tubo de salida; tapado = tubo bloqueado (los gases se quedan adentro).
function Boiler({ T, x, y, s = 1, tapado = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -20 -330 L -20 -470 L 120 -470" stroke="#9aa3b5" strokeWidth={34} fill="none" strokeLinejoin="round" />
    <path d="M -20 -330 L -20 -470 L 120 -470" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinejoin="round" opacity={0.6} />
    {tapado && <g transform="translate(130 -470)"><rect x={-14} y={-30} width={28} height={60} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" /></g>}
    <rect x={-110} y={-340} width={220} height={340} rx={40} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    <rect x={-60} y={-110} width={120} height={70} rx={14} fill="#1b2235" stroke={KC.ink} strokeWidth={6} />
    {[-30, 0, 30].map((dx, i) => { const h = 22 + Math.sin(T * 12 + i) * 6; return <path key={i} d={`M ${dx - 9} -50 Q ${dx} ${-50 - h * 1.4} ${dx + 9} -50 Z`} fill={i % 2 ? '#ffb02e' : '#5fc6ff'} />; })}
    <circle cx={0} cy={-250} r={34} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 -250 L ${Math.cos(T) * 22} ${-250 + Math.sin(T) * 22}`} stroke={KC.red} strokeWidth={5} strokeLinecap="round" />
    <path d="M -50 0 L -50 40 M 50 0 L 50 40" stroke="#9aa3b5" strokeWidth={16} />
  </g>;
}
// Nube de monóxido: invisible en la realidad; aquí, contorno punteado transparente con moléculas CO adentro.
function NubeCO({ T, x, y, f = 1, r = 300, seed = 4, n = 9, mol = true }) {
  if (f <= 0) return null;
  const R = krng(seed);
  const bs = Array.from({ length: n }, () => [R() * 2 - 1, R() * 2 - 1, 0.45 + R() * 0.55, R() * 6]);
  return <g opacity={Math.min(1, f * 1.4)}>
    {bs.map(([u, v, k, ph], i) => <circle key={i} cx={x + u * r * f + Math.sin(T * 0.7 + ph) * 16} cy={y + v * r * 0.55 * f + Math.cos(T * 0.6 + ph) * 10} r={r * 0.5 * k * f}
      fill="rgba(235,240,250,.16)" stroke="rgba(30,40,60,.55)" strokeWidth={5} strokeDasharray="16 14" />)}
    {mol && bs.slice(0, 6).map(([u, v, k, ph], i) => <MolCO key={'m' + i} x={x + u * r * f * 0.8 + Math.sin(T * 1.1 + ph) * 22} y={y + v * r * 0.45 * f + Math.cos(T * 0.9 + ph) * 18} s={0.55} rot={T * 30 + ph * 40} o={0.85} />)}
  </g>;
}
// Ícono tachado (nariz u ojo) para "no huele" / "no se ve".
function IconoNo({ x, y, tipo, o = 1, texto }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, o)})`} opacity={o}>
    <circle r={78} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {tipo === 'nariz' ? <path d="M -6 -46 Q -10 0 -34 22 Q -20 36 0 30 Q 20 36 34 22 Q 12 0 8 -46" fill={PIEL} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      : <g><path d="M -54 0 Q 0 -46 54 0 Q 0 46 -54 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle r={20} fill="#2a6fdb" stroke={KC.ink} strokeWidth={5} /><circle r={8} fill={KC.ink} /></g>}
    <path d="M -56 -56 L 56 56" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
    {texto && <text y={122} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={8} paintOrder="stroke">{texto}</text>}
  </g>;
}
// Cuarto: piso, zoclo y ventana (cerrada con candado o abierta con cielo).
function Cuarto({ T, abierta = 0 }) {
  const wx = 90, wy = 420, ww = 260, wh = 240;
  return <g>
    <rect x={0} y={1120} width={KW} height={KH - 1120} fill="#8a5a3c" />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 150} y1={1120} x2={i * 150 - 80} y2={KH} stroke="rgba(0,0,0,.18)" strokeWidth={5} />)}
    <rect x={0} y={1104} width={KW} height={22} fill="#5b3a26" />
    <rect x={wx} y={wy} width={ww} height={wh} fill={abierta > 0 ? mixHex('#1d2a4a', '#8fd8ff', abierta) : '#1d2a4a'} stroke={KC.ink} strokeWidth={10} />
    {abierta > 0 && <g opacity={abierta}><circle cx={wx + 200} cy={wy + 60} r={34} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={wx + 90} cy={wy + 110} rx={60} ry={24} fill="#fff" />
      {[0, 1, 2].map((i) => { const u = (T * 0.8 + i / 3) % 1; return <path key={i} d={`M ${wx + ww - u * 420} ${wy + 70 + i * 50} q 30 -16 60 0 t 60 0`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - u} />; })}</g>}
    {/* postigos */}
    <rect x={wx + 4} y={wy + 4} width={(ww / 2 - 4) * (1 - abierta * 0.85)} height={wh - 8} fill="#a8683f" stroke={KC.ink} strokeWidth={6} />
    <rect x={wx + ww - 4 - (ww / 2 - 4) * (1 - abierta * 0.85)} y={wy + 4} width={(ww / 2 - 4) * (1 - abierta * 0.85)} height={wh - 8} fill="#a8683f" stroke={KC.ink} strokeWidth={6} />
    {abierta < 0.5 && <g transform={`translate(${wx + ww / 2} ${wy + wh / 2 + 20})`} opacity={1 - abierta * 2}>
      <path d="M -18 -10 L -18 -30 Q 0 -52 18 -30 L 18 -10" stroke={KC.ink} strokeWidth={8} fill="none" />
      <rect x={-28} y={-12} width={56} height={46} rx={8} fill={KC.gold} stroke={KC.ink} strokeWidth={6} /></g>}
  </g>;
}
// Cama con una persona dormida (esquemática).
function CamaDormida({ T, x, y, s = 1, zzz = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-190} y={-20} width={380} height={90} rx={14} fill="#c9844f" stroke={KC.ink} strokeWidth={8} />
    <rect x={-200} y={-120} width={30} height={200} rx={8} fill="#a8683f" stroke={KC.ink} strokeWidth={7} />
    <rect x={-170} y={-70} width={110} height={56} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-110} cy={-74} r={42} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
    <path d="M -128 -78 q 8 8 16 0 M -100 -78 q 8 8 16 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -150 -100 Q -110 -136 -70 -100" fill="#3b2a25" stroke={KC.ink} strokeWidth={5} />
    <path d="M -70 -40 Q 40 -90 180 -40 L 180 -10 L -70 -10 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {zzz > 0 && [0, 1, 2].map((i) => { const u = (T * 0.5 + i / 3) % 1; return <text key={i} x={-60 + u * 70} y={-130 - u * 120} style={{ font:`400 ${40 + u * 30}px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke" opacity={zzz * (1 - u)}>z</text>; })}
  </g>;
}
// Pulmones esquemáticos con tráquea y bronquios.
function Pulmones({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -40 Q -210 -40 -220 140 Q -230 330 -60 330 Q -24 330 -24 280 L -24 40 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 30 -40 Q 210 -40 220 140 Q 230 330 60 330 Q 24 330 24 280 L 24 40 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-20} y={-220} width={40} height={210} rx={14} fill="#f6d5c8" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -10 L -90 80 L -130 170 M -90 80 L -60 190 M 0 -10 L 90 80 L 130 170 M 90 80 L 60 190" stroke="#c2405a" strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Una subunidad de hemoglobina con su "asiento" de hierro (Fe).
function Hemoglobina({ T, x, y, s = 1, ocup = [] }) {
  const lob = [[-80, -70, '#ff6f61'], [80, -70, '#ffa24c'], [-80, 70, '#ffa24c'], [80, 70, '#ff6f61']];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {lob.map(([dx, dy, c], i) => <circle key={i} cx={dx} cy={dy} r={92} fill={c} stroke={KC.ink} strokeWidth={8} />)}
    {lob.map(([dx, dy], i) => { const sx = dx * 1.05, sy = dy * 1.05, o = ocup[i] || {};
      return <g key={'s' + i}>
        <rect x={sx - 30} y={sy - 30} width={60} height={60} rx={10} fill="#8c2d1e" stroke={KC.ink} strokeWidth={5} />
        <text x={sx} y={sy + 12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#ffd9a8">Fe</text>
        {o.o2 > 0 && <g transform={`translate(${sx + (dx > 0 ? 1 : -1) * 60 * (1 - o.o2 + 0.6)} ${sy - 60 - (1 - o.o2) * 160 + Math.sin(T * 5 + i) * 6})`} opacity={o.o2}><Mol tipo="o2" x={0} y={0} s={0.7} rot={dx > 0 ? 20 : -20} /></g>}
        {o.co > 0 && <g transform={`translate(${sx} ${sy - 54 - (1 - o.co) * 220})`}><MolCO x={0} y={0} s={0.75} rot={90} />
          {o.co >= 1 && <g transform="translate(46 30)"><path d="M -10 -6 L -10 -18 Q 0 -30 10 -18 L 10 -6" stroke={KC.ink} strokeWidth={5} fill="none" /><rect x={-16} y={-8} width={32} height={26} rx={5} fill={KC.gold} stroke={KC.ink} strokeWidth={4} /></g>}</g>}
      </g>; })}
  </g>;
}
// Busto de persona (esquemático) con síntomas.
function Busto({ T, x, y, s = 1, dolor = 0, mareo = 0, nausea = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 330 Q -200 140 0 140 Q 200 140 200 330 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={9} />
    <rect x={-40} y={90} width={80} height={70} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={0} r={120} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -120 -20 Q -120 -140 0 -140 Q 120 -140 120 -20 Q 60 -90 -120 -20 Z" fill="#3b2a25" stroke={KC.ink} strokeWidth={7} />
    <path d="M -54 10 q 14 -10 28 0 M 26 10 q 14 -10 28 0" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d={`M -36 64 Q 0 ${44 - nausea * 0} 36 64`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    {dolor > 0 && [[-150, -110, -30], [150, -110, 30], [0, -190, 0]].map(([dx, dy, r], i) => <path key={i} d="M 0 0 l 18 -24 l -14 -6 l 18 -26" transform={`translate(${dx} ${dy}) rotate(${r}) scale(${dolor * (1 + 0.1 * Math.sin(T * 14 + i))})`} stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
    {mareo > 0 && <g transform={`translate(0 -250) rotate(${T * 240}) scale(${mareo})`}><path d="M 0 0 m -6 0 a 6 6 0 1 1 12 0 a 14 14 0 1 1 -28 0 a 24 24 0 1 1 48 0 a 34 34 0 1 1 -68 0" stroke={KC.violet} strokeWidth={7} fill="none" strokeLinecap="round" /></g>}
    {nausea > 0 && <g opacity={nausea}><circle cx={0} cy={250} r={52} fill="#bfe86a" stroke={KC.ink} strokeWidth={6} />
      {[0, 1].map((i) => <path key={i} d={`M -30 ${240 + i * 20} q 15 ${-10 + Math.sin(T * 8) * 4} 30 0 t 30 0`} stroke={KC.ink} strokeWidth={5} fill="none" />)}</g>}
  </g>;
}
// Detector de monóxido en la pared. alarma 0..1 (luz roja que parpadea) o ok (luz verde).
function Detector({ T, x, y, s = 1, alarma = 0, ok = false }) {
  const luz = ok ? '#39e07a' : alarma > 0 ? (Math.sin(T * 16) > 0 ? KC.red : '#5a1a1a') : '#39e07a';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-60} width={160} height={120} rx={26} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-40} cy={-14} r={16} fill={luz} stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2].map((i) => <line key={i} x1={0} x2={56} y1={-26 + i * 16} y2={-26 + i * 16} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />)}
    <text x={0} y={46} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>CO</text>
    {alarma > 0 && [1, 2].map((k) => { const u = (T * 1.6 + k / 2) % 1; return <circle key={k} r={90 + u * 90} fill="none" stroke={KC.red} strokeWidth={6} opacity={alarma * (1 - u)} />; })}
  </g>;
}
// Reloj de pared con manecillas que giran rápido (time-lapse).
function Reloj({ T, x, y, r = 190, horas = 0 }) {
  const aM = horas * 360, aH = horas * 30;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={12} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 18} x2={0} y2={-r + (i % 3 ? 36 : 54)} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 9} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" transform={`rotate(${aH})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={KC.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${aM})`} />
    <circle r={14} fill={KC.ink} />
  </g>;
}
// Casa vista de lado (para salir al aire libre).
function CasaLado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 0 L -200 -260 L 0 -420 L 200 -260 L 200 0 Z" fill="#f4a261" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -240 -240 L 0 -450 L 240 -240" stroke={KC.red} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-60} y={-170} width={110} height={170} fill="#5b3a26" stroke={KC.ink} strokeWidth={8} transform="skewY(0)" />
    <rect x={80} y={-220} width={90} height={80} fill="#8fd8ff" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Monoxido() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, F: CUES.Fuentes, Pu: CUES.Pulmon, H: CUES.Hemoglobina, D: CUES.Desplaza, Pr: CUES.Pregunta, S: CUES.Sintomas, E: CUES.Estudio, L: CUES.Lento, A: CUES.Aviso, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const nube0 = kprog(T, K.G, K.G + 4.0, kEase.sale);
  const avisoB = K.A + 3.4;
  // ocupación de los 4 asientos de la hemoglobina: primero oxígeno que va y viene; luego el CO se pega y no se suelta
  const ocup = [0, 1, 2, 3].map((i) => {
    const tco = K.H + 2.2 + i * 0.25 + (i > 0 ? (K.D - K.H - 2.2) + (i - 1) * 0.9 : 0);
    const co = kprog(T, tco, tco + 0.45, kEase.sale);
    const o2 = (0.6 + 0.4 * Math.abs(Math.sin(T * 1.6 + i))) * kprog(T, K.H + 0.2 + i * 0.2, K.H + 0.7 + i * 0.2) * (1 - kprog(T, tco - 0.3, tco));
    return { o2, co };
  });
  const coEnSangre = 1 - 0.5 * kprog(T, K.L + 0.6, K.L + 3.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el anafre prendido en el cuarto cerrado */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05} origen="55% 55%">
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Cuarto T={T} abierta={0} />
          <CamaDormida T={T} x={270} y={1040} s={0.95} />
          <Anafre T={T} x={760} y={980} s={1} />
          <NubeCO T={T} x={600} y={820} f={nube0} r={420} />
          <IconoNo x={470} y={500} tipo="nariz" o={kprog(T, K.G + 2.6, K.G + 3.0, kEase.rebote)} texto="no huele" />
          <IconoNo x={470} y={790} tipo="ojo" o={kprog(T, K.G + 3.3, K.G + 3.7, kEase.rebote)} texto="no se ve" />
        </SvgCapa>
      </Escena>
      {/* 1 · qué es: combustión completa vs. incompleta */}
      <Escena T={T} a={K.Q} b={K.F}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {(() => { const r1 = kprog(T, K.Q + 0.3, K.Q + 1.3, kEase.sale), r2 = kprog(T, K.Q + 2.4, K.Q + 3.4, kEase.sale);
            return <g>
              <g opacity={kprog(T, K.Q, K.Q + 0.3)}>
                <rect x={60} y={660} width={960} height={210} rx={30} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
                <Atomo x={klerp(170, 240, r1)} y={760} r={42} color={QA.C} letra="C" />
                <text x={330} y={784} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>+</text>
                <Mol tipo="o2" x={klerp(500, 440, r1)} y={760} s={1} />
                <text x={575} y={784} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>→</text>
                <Mol tipo="co2" x={800} y={760} s={1.05} o={r1} />
                <text x={800} y={850} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={r1}>CO₂</text>
              </g>
              <g opacity={kprog(T, K.Q + 2.2, K.Q + 2.5)}>
                <rect x={60} y={930} width={960} height={230} rx={30} fill="rgba(255,255,255,.75)" stroke={KC.red} strokeWidth={8} />
                <Atomo x={klerp(130, 190, r2)} y={1020} r={38} color={QA.C} letra="C" />
                <Atomo x={klerp(130, 190, r2)} y={1110} r={38} color={QA.C} letra="C" />
                <text x={290} y={1084} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>+</text>
                <Mol tipo="o2" x={klerp(470, 410, r2)} y={1060} s={1} />
                <text x={555} y={1084} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={KC.ink}>→</text>
                <MolCO x={760} y={1010} s={1.05} o={r2} rot={Math.sin(T * 3) * 8} />
                <MolCO x={760} y={1110} s={1.05} o={r2} rot={-Math.sin(T * 3) * 8} />
                <circle cx={760} cy={1060} r={130 + Math.sin(T * 6) * 6} fill="none" stroke={KC.red} strokeWidth={8} opacity={r2} strokeDasharray="20 12" />
                <text x={940} y={1072} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={3} opacity={r2}>CO</text>
              </g>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 2 · fuentes: anafre y boiler en el cuarto cerrado */}
      <Escena T={T} a={K.F} b={K.Pu} zoom={0.06} origen="50% 60%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Cuarto T={T} abierta={0} />
          <Boiler T={T} x={800} y={1080} s={1} tapado />
          <Anafre T={T} x={330} y={980} s={0.95} />
          <NubeCO T={T} x={330} y={760} f={kprog(T, K.F, K.F + 1.6, kEase.sale)} r={300} seed={6} />
          <NubeCO T={T} x={760} y={560} f={kprog(T, K.F + 0.9, K.F + 2.5, kEase.sale)} r={300} seed={9} />
        </SvgCapa>
      </Escena>
      {/* 3 · del pulmón al glóbulo rojo */}
      <Escena T={T} a={K.Pu} b={K.H} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Pulmones x={270} y={830} s={0.95} />
          {Array.from({ length: 5 }, (_, i) => { const u = kprog(T, K.Pu + i * 0.25, K.Pu + 1.4 + i * 0.25); return u > 0 && u < 1 ? <MolCO key={i} x={270 + Math.sin(i * 2) * 20} y={klerp(560, 920, u)} s={0.45} rot={T * 60 + i * 50} /> : null; })}
          {/* lupa: alvéolo y capilar */}
          <line x1={330} y1={960} x2={640} y2={900} stroke="#fff" strokeWidth={4} strokeDasharray="12 10" opacity={kprog(T, K.Pu + 0.5, K.Pu + 0.9)} />
          <g opacity={kprog(T, K.Pu + 0.5, K.Pu + 0.9)}>
            <clipPath id="lupaPu"><circle cx={780} cy={900} r={250} /></clipPath>
            <g clipPath="url(#lupaPu)">
              <rect x={520} y={640} width={520} height={520} fill="#1a2440" />
              <ellipse cx={780} cy={780} rx={260} ry={150} fill="#ffc2cc" stroke={KC.ink} strokeWidth={8} />
              <rect x={520} y={960} width={520} height={130} fill="#7a1424" stroke={KC.ink} strokeWidth={8} />
              {[0, 1, 2, 3].map((i) => { const gx = 520 + ((T * 70 + i * 140) % 560); return <g key={i}><ellipse cx={gx} cy={1025} rx={58} ry={34} fill={SANGRE} stroke={KC.ink} strokeWidth={5} /><ellipse cx={gx} cy={1025} rx={28} ry={14} fill="#a81a2e" /></g>; })}
              {Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.Pu + 0.9 + i * 0.3, K.Pu + 2.0 + i * 0.3); return <MolCO key={i} x={640 + i * 50} y={klerp(760, 1025, u)} s={0.42} rot={T * 40 + i * 30} o={u < 1 ? 1 : 0} />; })}
            </g>
            <circle cx={780} cy={900} r={250} fill="none" stroke="#fff" strokeWidth={10} />
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Pu + 0.3} until={K.H - 0.2} x={120} y={1200} texto="pulmón" color={KC.texto} />
        <Etq T={T} at={K.Pu + 1.1} until={K.H - 0.2} x={1040} y={1180} lado="izq" texto="glóbulos rojos" color="#ff8fa3" />
        <Etq T={T} at={K.Pu + 0.9} until={K.H - 0.2} x={1040} y={620} lado="izq" texto="alvéolo" color="#ffc2cc" />
      </Escena>
      {/* 4–5 · la hemoglobina: el CO se pega y le quita el lugar al oxígeno */}
      <Escena T={T} a={K.H} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <ellipse cx={540} cy={890} rx={520} ry={360} fill="#5e0f1c" stroke="#a81a2e" strokeWidth={14} />
          <Hemoglobina T={T} x={540} y={900} s={1.25} ocup={ocup} />
          {T > K.D && [0, 1, 2].map((i) => { const u = kprog(T, K.D + 0.4 + i * 0.6, K.D + 2.4 + i * 0.6); return <Mol key={i} tipo="o2" x={klerp(540, i === 1 ? 980 : (i ? 920 : 140), u)} y={klerp(900, 620 + i * 60, u)} s={0.6} rot={T * 50} o={u > 0 ? 0.8 : 0} />; })}
        </SvgCapa>
        <Etq T={T} at={K.H + 0.3} until={K.D - 0.2} x={60} y={1200} texto="hemoglobina" color="#ffa24c" />
        <NumeroGigante T={T} at={K.H + 3.0} until={K.D - 0.2} valor={200} dur={1.0} prefijo="×" sufijo="+" etiqueta="más fuerte que el oxígeno" x={680} y={470} tam={170} color={KC.red} />
        <Medidor T={T} at={K.D + 0.3} until={K.Pr - 0.2} valor={(t) => 1 - 0.7 * kprog(t, K.D + 0.3, K.D + 3.2)} etiqueta="oxígeno que llega" texto={(v) => (v > 0.75 ? 'normal' : 'baja')} x={90} y={470} ancho={900} color={KC.mint} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · síntomas: parece gripa; dormido no te das cuenta */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {T < K.S + 3.3 ? <g>
            <Busto T={T} x={560} y={830} s={1} dolor={kprog(T, K.S + 0.1, K.S + 0.5, kEase.rebote)} mareo={kprog(T, K.S + 0.8, K.S + 1.2, kEase.rebote)} nausea={kprog(T, K.S + 1.4, K.S + 1.8)} />
          </g> : <g>
            <rect x={0} y={1120} width={KW} height={KH - 1120} fill="#2a8f6e" />
            <CamaDormida T={T} x={560} y={1020} s={1.3} zzz={1 - kprog(T, K.S + 4.0, K.S + 5.2)} />
          </g>}
        </SvgCapa>
        <Etq T={T} at={K.S + 0.2} until={K.S + 3.2} x={760} y={640} texto="dolor de cabeza" color={KC.ink} tam={32} />
        <Etq T={T} at={K.S + 0.9} until={K.S + 3.2} x={300} y={560} lado="izq" texto="mareo" color={KC.ink} tam={32} />
        <Etq T={T} at={K.S + 1.5} until={K.S + 3.2} x={760} y={1080} texto="náuseas" color={KC.ink} tam={32} />
        <Chip T={T} at={K.S + 2.0} until={K.S + 3.2} texto="¿gripa?" y={1500} tam={52} borde={KC.blue} />
        <Chip T={T} at={K.S + 3.5} until={K.E - 0.2} texto="dormido, no te das cuenta" y={1500} tam={44} borde={KC.red} />
      </Escena>
      {/* 8 · el estudio: Chicago, 1987 */}
      <Escena T={T} a={K.E} b={K.L}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={700} y={420} width={300} height={220} fill="#cfe6ff" stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 14 }, (_, i) => { const u = (T * 0.25 + i / 14) % 1; return <circle key={i} cx={712 + ((i * 53) % 276)} cy={430 + u * 200} r={7} fill="#fff" />; })}
          <line x1={850} y1={420} x2={850} y2={640} stroke={KC.ink} strokeWidth={6} />
          <g transform="translate(160 520)"><rect x={-60} y={-60} width={120} height={120} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={7} /><rect x={-14} y={-42} width={28} height={84} fill={KC.red} /><rect x={-42} y={-14} width={84} height={28} fill={KC.red} /></g>
          {(() => { const rojos = [3, 10, 17, 21, 26, 30, 35]; return Array.from({ length: 37 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8), k = rojos.indexOf(i);
            const on = k >= 0 ? kprog(T, K.E + 4.0 + k * 0.25, K.E + 4.3 + k * 0.25) : 0;
            const ap = kprog(T, K.E + 0.6 + i * 0.03, K.E + 0.9 + i * 0.03);
            return <Personita key={i} x={150 + c * 112} y={790 + r * 100} s={1.5 * klerp(0.6, 1, ap)} o={ap} color={mixHex('#f6f3ec', KC.red, on)} />; }); })()}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.5} anio="1987" quien="Heckerling · Chicago" revista="Am J Emerg Med · urgencias en invierno" x={540} y={560} />
        <Chip T={T} at={K.E + 1.0} until={K.E + 3.9} texto="37 personas con dolor de cabeza" y={1500} tam={40} borde={KC.blue} />
        <Chip T={T} at={K.E + 4.2} until={K.E + 6.3} texto="7: más del 10 % de su hemoglobina con CO" y={1500} tam={32} borde={KC.red} />
        <MitoTachado T={T} at={K.E + 6.4} tacharEn={K.E + 7.2} until={K.L - 0.2} texto="¿será monóxido?" x={540} y={1500} tam={42} />
      </Escena>
      {/* 9 · lento: horas para sacar la mitad */}
      <Escena T={T} a={K.L} b={K.A}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Reloj T={T} x={340} y={900} r={210} horas={4.5 * kprog(T, K.L + 0.4, K.L + 3.4, kEase.suave) + T * 0.05} />
          <g>
            <rect x={700} y={680} width={200} height={460} rx={30} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={9} />
            <rect x={712} y={692 + 436 * (1 - coEnSangre)} width={176} height={436 * coEnSangre} rx={22} fill={GRIS_CO} />
            {[0, 1, 2, 3].map((i) => <MolCO key={i} x={800} y={1090 - i * 100} s={0.6} rot={T * 30 + i * 40} o={coEnSangre * 4 - i > 1 ? 1 : 0.15} />)}
            <line x1={680} y1={910} x2={920} y2={910} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" />
            <text x={940} y={922} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>½</text>
          </g>
        </SvgCapa>
        <Etq T={T} at={K.L + 0.3} until={K.A - 0.2} x={1000} y={640} lado="izq" texto="CO en tu sangre" color={KC.ink} tam={32} />
        <Chip T={T} at={K.L + 2.4} until={K.A - 0.2} texto="la mitad: ≈ 4–5 h" y={1500} tam={48} borde={KC.violet} />
      </Escena>
      {/* 10 · aviso: varios con dolor de cabeza → salir al aire libre → 911 */}
      <Escena T={T} a={K.A} b={avisoB + 0.2}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Cuarto T={T} abierta={0} />
          <Detector T={T} x={800} y={520} s={1.2} alarma={kprog(T, K.A + 1.6, K.A + 1.8)} />
          {[[260, 1060], [470, 1080], [640, 1060]].map(([x, y], i) => <g key={i}>
            <Personita x={x} y={y} s={3} color={[KC.orange, KC.blue, KC.mint][i]} />
            {kprog(T, K.A + 0.2 + i * 0.3, K.A + 0.5 + i * 0.3) > 0 && <path d="M 0 0 l 14 -18 l -10 -4 l 14 -20" transform={`translate(${x + 40} ${y - 170})`} stroke={KC.red} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>)}
        </SvgCapa>
        <Onomato T={T} at={K.A + 1.7} until={avisoB} x={800} y={720} texto="¡pip pip!" color={KC.red} tam={70} />
      </Escena>
      <Escena T={T} a={avisoB} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#8fd8ff' }}></div>
        <SvgCapa>
          <circle cx={900} cy={480} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={1120} width={KW} height={KH - 1120} fill={KC.leaf} />
          <CasaLado x={250} y={1130} s={0.9} />
          {[[600, 1100], [740, 1110], [880, 1100]].map(([x, y], i) => { const u = kprog(T, avisoB + i * 0.2, avisoB + 1.2 + i * 0.2, kEase.sale); return <Personita key={i} x={klerp(300, x, u)} y={y} s={3} color={[KC.orange, KC.blue, KC.mint][i]} />; })}
          {[0, 1, 2].map((i) => { const u = (T * 0.6 + i / 3) % 1; return <path key={i} d={`M ${1080 - u * 700} ${620 + i * 70} q 30 -16 60 0 t 60 0`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
        </SvgCapa>
        <Chip T={T} at={avisoB + 1.2} until={K.C - 0.2} texto="pide ayuda: 911" y={1500} tam={56} borde={KC.red} />
      </Escena>
      {/* 11 · cierre: el mismo cuarto, transformado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="55% 55%">
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Cuarto T={T} abierta={kprog(T, K.C + 0.2, K.C + 1.4, kEase.sale)} />
          <g opacity={kprog(T, K.C + 1.0, K.C + 1.6)}><Anafre T={T} x={220} y={600} s={0.35} encendido={1} /></g>
          <CamaDormida T={T} x={270} y={1040} s={0.95} />
          <g opacity={1 - kprog(T, K.C + 0.2, K.C + 1.0)}><Anafre T={T} x={760} y={980} s={1} encendido={1} /></g>
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.2)}><Marca x={760} y={960} ok={false} s={1.3} o={1 - kprog(T, K.C + 2.6, K.C + 3.0)} /></g>
          <NubeCO T={T} x={600} y={820} f={1 - kprog(T, K.C + 0.2, K.C + 2.2)} r={420} />
          <Detector T={T} x={800} y={520} s={1.2} ok />
        </SvgCapa>
        <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="anafre: solo al aire libre" y={1500} tam={46} borde={KC.mint} />
      </Escena>

      {/* textos que cruzan escenas */}
      <Chip T={T} at={K.Q + 0.4} until={K.Q + 2.3} texto="con mucho oxígeno" x={540} y={620} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Q + 2.5} until={K.F - 0.2} texto="sin suficiente oxígeno: monóxido" y={1500} tam={40} borde={KC.red} />
      <Etq T={T} at={K.F + 0.3} until={K.Pu - 0.2} x={140} y={720} texto="anafre" color={KC.ink} tam={36} />
      <Etq T={T} at={K.F + 0.9} until={K.Pu - 0.2} x={1040} y={720} lado="izq" texto="boiler" color={KC.ink} tam={36} />
      <Chip T={T} at={K.F + 1.4} until={K.Pu - 0.2} texto="cuarto cerrado" y={1500} tam={48} borde={KC.red} />
      <Chip T={T} at={K.G + 0.3} until={K.G + 2.4} texto="monóxido de carbono · CO" y={1500} tam={42} borde={GRIS_CO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No huele, *no se ve.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.F - 0.1} texto="Carbón o gas *sin oxígeno suficiente.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.Pu - 0.1} texto="Anafre o boiler, *cuarto cerrado.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.H - 0.1} texto="Del pulmón *a tu sangre.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.D - 0.1} texto="Se pega *más de 200 veces.*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.Pr - 0.1} texto="Le quita *el lugar al oxígeno.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.S - 0.1} texto="¿Y cómo *te das cuenta?*" />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={K.E - 0.1} texto="Dolor, mareo: *parece gripa.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.L - 0.1} texto="7 de 37: *nadie lo sospechó.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.A - 0.1} texto="Horas para *sacar la mitad.*" />
      <Subtitulo T={T} idx={10} at={K.A + 0.1} until={K.C - 0.1} texto="Salgan *al aire libre.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="El anafre, *nunca adentro.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 0.9, CUES.Fuentes - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pulmon + 0.3, CUES.Hemoglobina - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Hemoglobina + 2.0, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Sintomas + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Sintomas + 3.4, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.7, CUES.Lento - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Lento + 0.5, CUES.Aviso - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Aviso + 3.6, CUES.Cierre - 0.3, 'avatar_02_apuntando_camara', 'izq-alto'],
        [CUES.Cierre + 1.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="43" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MonoxidoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Monoxido /></CompositionStage></div>;
}
window.MonoxidoApp = MonoxidoApp;
