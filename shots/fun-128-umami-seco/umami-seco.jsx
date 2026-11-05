// Shot Fungi Mati #128 · Ese hongo arrugado no está echado a perder: es una bomba de umami — NARRADO (N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const UM = { cafe:'#7a4a2a', cafe2:'#a8703f', cafeSeco:'#4e2f1c', grieta:'#e9d6b4', lamina:'#f3e6c4', pie:'#e2cfa6', gmp:'#F4C25A', glu:'#4f7dff',
  mesa:'#b07a45', mesa2:'#8a5a2e', agua:'#9fe3ff', kombu:'#3f5a2a', caldo:'#e9b866', ribo:'#ff6b5a', nuc:'#ff2d78', t1r1:'#b18cff', t1r3:'#2fbfa8' };

// Shiitake de perfil. Base del pie en (x, y). seco 0..1: arrugado, más chico, orilla enrollada y más oscuro. crece 0..1.
function Shiitake({ T = 0, x, y, s = 1, seco = 0, crece = 1, rot = 0 }) {
  if (crece <= 0) return null;
  const c = kEase.rebote(kclamp(crece, 0, 1));
  const W = klerp(230, 190, seco), H = klerp(150, 118, seco);
  // contorno del sombrero con arrugas (más amplitud seco)
  const N = 40, pts = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N, a = Math.PI * (1 - u);
    const arr = 1 + seco * 0.06 * Math.sin(u * 37) + seco * 0.035 * Math.sin(u * 71 + 1.3);
    pts.push([Math.cos(a) * W * arr, -Math.sin(a) * H * arr - 70]);
  }
  const borde = klerp(10, 34, seco); // orilla enrollada hacia adentro
  const somb = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') +
    ` Q ${W - 6} ${-70 + borde} ${W - 40} ${-62 + borde * 0.5} Q 0 ${-50} ${-W + 40} ${-62 + borde * 0.5} Q ${-W + 6} ${-70 + borde} ${-W} -70 Z`;
  const color = mixHex(UM.cafe, UM.cafeSeco, seco);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * c})`}>
    {/* pie corto y fibroso */}
    <path d={`M -34 0 Q -40 -40 -30 -66 L 30 -66 Q 40 -40 34 0 Z`} fill={mixHex(UM.pie, '#b89a70', seco)} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-14, 0, 14].map((dx) => <line key={dx} x1={dx} y1={-8} x2={dx * 0.8} y2={-60} stroke="#a88a60" strokeWidth={3} opacity=".6" />)}
    {/* láminas blancas por debajo */}
    <path d={`M ${-W + 30} -64 Q 0 ${-40 + seco * 6} ${W - 30} -64 L ${W - 40} -72 Q 0 -60 ${-W + 40} -72 Z`} fill={UM.lamina} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 13 }, (_, i) => { const xx = -W + 50 + i * ((2 * W - 100) / 12); return <line key={i} x1={xx} y1={-70} x2={xx * 0.2} y2={-52} stroke="#c9b48a" strokeWidth={3} />; })}
    {/* sombrero */}
    <path d={somb} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* grietas claras de la cutícula (típicas del shiitake) */}
    {[[-110, -150, 40], [-40, -190, -20], [40, -180, 30], [110, -140, -35], [-70, -110, 15], [70, -105, -10], [0, -140, 5]].map(([gx, gy, r], i) =>
      <path key={i} d={`M ${gx * (W / 230) - 16} ${gy * (H / 150) - 70 * (1 - H / 150)} l 12 -6 l 10 8 l 12 -5`} transform={`rotate(${r} ${gx} ${gy})`} stroke={UM.grieta} strokeWidth={5} fill="none" strokeLinecap="round" opacity={klerp(0.75, 0.95, seco)} />)}
    {/* arrugas del secado */}
    {seco > 0 && [[-120, -95], [-60, -150], [20, -170], [90, -130], [140, -90]].map(([gx, gy], i) =>
      <path key={'a' + i} d={`M ${gx} ${gy} q 10 14 0 26`} stroke="#2a180c" strokeWidth={4} fill="none" opacity={seco * 0.7} />)}
    {seco < 0.5 && <ellipse cx={-70} cy={-170} rx={44} ry={14} fill="#fff" opacity={(0.5 - seco) * 0.5} transform="rotate(-18 -70 -170)" />}
  </g>;
}
// Bolita de guanilato (5′-GMP).
function GMP({ x, y, r = 16, o = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o} style={brillo ? { filter:`drop-shadow(0 0 ${12 * brillo}px ${UM.gmp})` } : null}>
    <circle r={r} fill={UM.gmp} stroke={KC.ink} strokeWidth={Math.max(2, r / 5)} />
    {r >= 14 && <text y={r * 0.36} textAnchor="middle" style={{ font:`700 ${r}px ${KF.mono}` }} fill={KC.ink}>G</text>}
  </g>;
}
// Glutamato esquemático (tres esferas azules).
function Glu({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <line x1={-22} y1={6} x2={22} y2={6} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-18} x2={0} y2={6} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={6} r={15} fill={UM.glu} stroke={KC.ink} strokeWidth={4} /><circle cx={22} cy={6} r={15} fill={UM.glu} stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-18} r={17} fill="#8fb0ff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Mesa de madera (abajo).
function Mesa({ y = 1120 }) {
  return <g>
    <rect x={-20} y={y} width={1120} height={240} fill={UM.mesa} stroke={KC.ink} strokeWidth={8} />
    {[40, 95, 150].map((d, i) => <path key={i} d={`M 0 ${y + d} Q 300 ${y + d - 10} 600 ${y + d + 6} T 1100 ${y + d}`} stroke={UM.mesa2} strokeWidth={5} fill="none" />)}
  </g>;
}
// Vaso de agua fría con hielo (base en x, y).
function VasoFrio({ T, x, y, s = 1, dentro }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -300 L -90 0 L 90 0 L 110 -300" fill="rgba(159,227,255,.25)" stroke={KC.ink} strokeWidth={7} />
    <path d="M -104 -220 L -91 -8 L 91 -8 L 104 -220 Z" fill={UM.agua} opacity=".75" />
    {dentro}
    {[[-50, -205, 12], [30, -215, -8], [70, -190, 20]].map(([a, b, r], i) => <rect key={i} x={a - 24} y={b - 22 + Math.sin(T * 2 + i) * 4} width={48} height={44} rx={8} fill="#eafaff" stroke={KC.ink} strokeWidth={4} transform={`rotate(${r} ${a} ${b})`} opacity=".95" />)}
  </g>;
}
// Olla con caldo y vapor (base en x, y).
function Olla({ T, x, y, s = 1, color = UM.caldo, vapor = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && [-90, 0, 90].map((dx, i) => { const k = ((T * 0.6 + i * 0.33) % 1); return <path key={i} d={`M ${dx} ${-200 - k * 140} q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * (1 - k) * 0.8} />; })}
    <rect x={-250} y={-190} width={500} height={190} rx={30} fill="#9aa3ad" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-190} rx={250} ry={46} fill={color} stroke={KC.ink} strokeWidth={8} />
    {children}
    <rect x={-300} y={-170} width={60} height={30} rx={12} fill="#6c747d" stroke={KC.ink} strokeWidth={6} />
    <rect x={240} y={-170} width={60} height={30} rx={12} fill="#6c747d" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Hifas al microscopio: tubos con septos que se agrietan (rompe 0..1).
function Hifas({ T, rompe = 0 }) {
  const filas = [640, 790, 940, 1090];
  return <g>
    {filas.map((yy, i) => { const dx = (i % 2) * 90 - 40;
      return <g key={i} transform={`translate(${dx} ${yy + Math.sin(T * 0.8 + i) * 4})`}>
        <rect x={40} y={-42} width={1000} height={84} rx={42} fill="rgba(255,244,214,.14)" stroke="#fff4d6" strokeWidth={6} />
        {[260, 520, 780].map((sx) => <line key={sx} x1={sx} y1={-40} x2={sx} y2={40} stroke="#fff4d6" strokeWidth={5} opacity=".8" />)}
        {/* grietas */}
        {rompe > 0 && [180, 430, 650, 900].map((gx, j) => <path key={j} d={`M ${gx} -42 l 10 ${22 * rompe} l -12 ${16 * rompe} l 10 ${18 * rompe}`} stroke={KC.red} strokeWidth={6} fill="none" opacity={kclamp(rompe * 2 - j * 0.15, 0, 1)} />)}
        {/* ARN que sale */}
        {rompe > 0.3 && [180, 650].map((gx, j) => { const k = kclamp((rompe - 0.3) / 0.7, 0, 1);
          return <path key={'r' + j} d={`M ${gx} -42 q 20 ${-30 * k} 0 ${-55 * k} q -20 ${-25 * k} 4 ${-50 * k}`} stroke={KC.lilac} strokeWidth={7} fill="none" strokeLinecap="round" />; })}
      </g>; })}
  </g>;
}
// Hebra de ARN horizontal ondulada; cortes = cuántos cortes lleva (0..n).
function HebraARN({ T, x, y, w = 900, cortes = 0, n = 6 }) {
  const seg = w / n;
  return <g>
    {Array.from({ length: n }, (_, i) => { const roto = i < cortes; const dy = roto ? 0 : 0;
      const d = Array.from({ length: 13 }, (_, k) => { const u = k / 12; return `${k ? 'L' : 'M'} ${(x + i * seg + 8 + u * (seg - 16)).toFixed(1)} ${(y + dy + Math.sin((i * seg + u * seg) / 40 + T * 2) * 22).toFixed(1)}`; }).join(' ');
      return <g key={i}>
        <path d={d} stroke={KC.lilac} strokeWidth={10} fill="none" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, k) => { const xx = x + i * seg + 20 + k * (seg - 40) / 3; return <line key={k} x1={xx} y1={y + Math.sin(xx / 40 + T * 2) * 22} x2={xx} y2={y + Math.sin(xx / 40 + T * 2) * 22 + 26} stroke={[KC.yellow, KC.pink, KC.cyan, KC.mint][(i + k) % 4]} strokeWidth={7} />; })}
      </g>; })}
  </g>;
}
// Tijeras (ribonucleasa) esquemáticas. abre 0..1.
function Tijeras({ x, y, s = 1, abre = 0.5 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 110 -8 L 110 8 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={5} /><circle cx={-46} cy={-6} r={24} fill="none" stroke={UM.ribo} strokeWidth={12} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 110 -8 L 110 8 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={5} /><circle cx={-46} cy={6} r={24} fill="none" stroke={UM.ribo} strokeWidth={12} /></g>
    <circle r={8} fill={KC.ink} />
  </g>;
}
// Termómetro: nivel en °C (20..90). Franja 60–70 resaltada.
function Termometro({ x, y, nivel = 20, franja = 1 }) {
  const Y = (c) => -80 - (c - 20) * 9; // 20 °C → -80 ; 90 °C → -710
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-760} width={92} height={720} rx={46} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-30} y={Y(70)} width={60 + 150 * franja} height={Y(60) - Y(70)} fill={KC.mint} opacity={0.85 * franja} />
    <rect x={-20} y={Y(nivel)} width={40} height={-40 - Y(nivel)} rx={20} fill={KC.red} />
    <circle cx={0} cy={-20} r={78} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {[20, 30, 40, 50, 60, 70, 80, 90].map((c) => <g key={c}><line x1={46} y1={Y(c)} x2={76} y2={Y(c)} stroke={KC.ink} strokeWidth={5} />
      <text x={-70} y={Y(c) + 10} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{c}°</text></g>)}
  </g>;
}
// "Gomita" que come guanilato (nucleotidasa). boca 0..1; dormida = Zz.
function Nucleotidasa({ T, x, y, s = 1, come = 1, dormida = 0 }) {
  const b = come * (0.15 + 0.35 * Math.abs(Math.sin(T * 7)));
  const a = b * Math.PI / 2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a) * 70} ${-Math.sin(a) * 70} A 70 70 0 1 0 ${Math.cos(a) * 70} ${Math.sin(a) * 70} Z`} fill={UM.nuc} stroke={KC.ink} strokeWidth={6} />
    {dormida > 0.5 ? <path d="M 2 -36 q 12 6 24 0" stroke={KC.ink} strokeWidth={5} fill="none" /> : <circle cx={12} cy={-36} r={9} fill={KC.ink} />}
    {dormida > 0 && <text x={60} y={-80 - Math.sin(T * 2) * 6} style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink} opacity={dormida}>Zz</text>}
  </g>;
}
// Receptor del umami (modelo): dos dominios atrapamoscas sobre la membrana. T1R1 (cierre c 0..1) y T1R3 (fijo, al lado).
function Lobulo({ ang, color, lado }) {
  const L = lado;
  return <g transform={`rotate(${ang * L})`}>
    <path d={`M 0 0 Q ${150 * L} -40 ${130 * L} -190 Q ${100 * L} -290 0 -300 Z`} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 7 }, (_, i) => { const u = (i + 1) / 8; const px = 0, py = -300 * u + (u > 0.9 ? 0 : 0);
      return <line key={i} x1={px} y1={py} x2={-26 * L} y2={py - 14} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />; })}
  </g>;
}
function Receptor({ T, x, y, c = 0, glu = 0, nuc = 0, brillo = 0 }) {
  const ang = klerp(30, 4, c);
  return <g transform={`translate(${x} ${y})`}>
    {/* membrana */}
    <rect x={-700} y={80} width={1600} height={90} fill="rgba(255,225,26,.18)" />
    {Array.from({ length: 34 }, (_, i) => <g key={i}><circle cx={-690 + i * 48} cy={92} r={14} fill="#ffd36b" /><circle cx={-690 + i * 48} cy={158} r={14} fill="#ffd36b" /></g>)}
    {/* tallos y hélices en la membrana */}
    <path d="M 0 0 L 0 70 l -24 18 l 48 18 l -48 18 l 48 18 l -24 18" stroke={UM.t1r1} strokeWidth={14} fill="none" strokeLinejoin="round" />
    <path d="M 330 0 L 330 70 l -24 18 l 48 18 l -48 18 l 48 18 l -24 18" stroke={UM.t1r3} strokeWidth={14} fill="none" strokeLinejoin="round" />
    {/* T1R3 (al lado, entreabierto) */}
    <g transform="translate(330 0) scale(.8)" opacity=".85"><Lobulo ang={18} color={UM.t1r3} lado={-1} /><Lobulo ang={18} color={UM.t1r3} lado={1} /></g>
    {/* T1R1: la trampa */}
    <g style={brillo ? { filter:`drop-shadow(0 0 ${30 * brillo}px ${UM.gmp})` } : null}>
      <Lobulo ang={ang} color={UM.t1r1} lado={-1} />
      {glu > 0 && <Glu x={0} y={-60 - (1 - glu) * 380} s={0.95} o={kclamp(glu * 3, 0, 1)} />}
      {nuc > 0 && <GMP x={klerp(-260, 0, nuc)} y={klerp(-520, -240, nuc)} r={22} o={kclamp(nuc * 3, 0, 1)} brillo={brillo} />}
      <Lobulo ang={ang} color={UM.t1r1} lado={1} />
    </g>
    <circle cx={0} cy={0} r={14} fill={KC.ink} />
  </g>;
}

function UmamiShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, F: CUES.FrescoSeco, Ce: CUES.Celulas, Ti: CUES.Tijeras, Te: CUES.Temperatura, A: CUES.AguaFria, P: CUES.Pregunta,
    R: CUES.Receptor, Gl: CUES.Glutamato, N: CUES.Nucleotido, E: CUES.Estudio, U: CUES.Umbral, D: CUES.Dashi, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G, K.G + 0.55);
  const reb = T > K.G + 0.55 ? Math.abs(Math.sin((T - K.G - 0.55) * 9)) * 40 * Math.exp(-(T - K.G - 0.55) * 4) : 0;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el hongo arrugado cae a la mesa */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa y={1120} />
          <ellipse cx={360} cy={1125} rx={190 * kclamp(caida, 0.3, 1)} ry={22} fill="rgba(0,0,0,.25)" />
          <Shiitake T={T} x={360} y={klerp(640, 1120, kEase.suave(caida)) - reb} s={1.15} seco={1} rot={klerp(-30, 0, caida)} />
          {T > K.G + 2.4 && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const k = kprog(T, K.G + 2.4 + i * 0.07, K.G + 3.2 + i * 0.07, kEase.sale); const a = -Math.PI * (0.15 + i * 0.1);
            return <GMP key={i} x={360 + Math.cos(a) * 260 * k} y={960 + Math.sin(a) * 260 * k} r={16} o={k} brillo={1} />; })}
        </>)}
      </Escena>
      {/* 1 · el hongo: shiitake (fresco, para reconocerlo) */}
      <Escena T={T} a={K.H} b={K.F} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<><Mesa y={1150} /><Shiitake T={T} x={420} y={1150} s={1.6} seco={1} crece={kprog(T, K.H - 0.2, K.H + 0.6)} /></>)}
      </Escena>
      {/* 2 · fresco contra seco */}
      <Escena T={T} a={K.F} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Mesa y={1130} />
          <line x1={540} y1={560} x2={540} y2={1120} stroke={KC.ink} strokeWidth={6} strokeDasharray="20 14" />
          <Shiitake T={T} x={270} y={1130} s={0.95} seco={0} />
          <Shiitake T={T} x={810} y={1130} s={0.95} seco={1} />
          {[[230, 880], [300, 830], [260, 940]].map(([a, b], i) => <GMP key={i} x={a} y={b} r={15} o={kprog(T, K.F + 0.6 + i * 0.15, K.F + 0.9 + i * 0.15)} />)}
          {Array.from({ length: 22 }, (_, i) => { const a = 700 + (i % 6) * 44 + ((i / 6 | 0) % 2) * 22, b = 790 + (i / 6 | 0) * 44;
            return <GMP key={'s' + i} x={a} y={b} r={15} o={kprog(T, K.F + 2.4 + i * 0.05, K.F + 2.7 + i * 0.05)} brillo={0.6} />; })}
        </>)}
      </Escena>
      {/* 3 · por dentro: al secarse, las células se rompen (fondo oscuro) */}
      <Escena T={T} a={K.Ce} b={K.Ti} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<Hifas T={T} rompe={kprog(T, K.Ce + 0.3, K.Ce + 1.8)} />)}
      </Escena>
      {/* 4 · al calentarlo: tijeras (ribonucleasas) cortan ARN y sueltan guanilato */}
      <Escena T={T} a={K.Ti} b={K.Te} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <div style={{ position:'absolute', left:0, right:0, bottom:560, height:420, background:`linear-gradient(to top, rgba(255,120,40,${0.55 * kprog(T, K.Ti, K.Ti + 0.8)}), transparent)` }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {(() => { const cortes = Math.floor(kprog(T, K.Ti + 1.0, K.Ti + 3.6) * 5.99); const tx = 90 + Math.min(cortes + 1, 5) * 150 - 100;
            return <>
              <HebraARN T={T} x={90} y={880} w={900} cortes={cortes} n={6} />
              {T > K.Ti + 0.5 && <Tijeras x={tx} y={830} s={1} abre={0.5 + 0.5 * Math.sin(T * 14)} />}
              {Array.from({ length: cortes }, (_, i) => { const t0 = K.Ti + 1.0 + (i + 1) * 0.43; const k = kprog(T, t0, t0 + 0.9, kEase.sale);
                return <GMP key={i} x={90 + (i + 1) * 150} y={910 + k * 200} r={20} brillo={1} />; })}
            </>; })()}
        </>)}
      </Escena>
      {/* 5 · temperatura: 60–70 °C */}
      <Escena T={T} a={K.Te} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Termometro x={300} y={1200} nivel={klerp(20, 66, kprog(T, K.Te + 0.1, K.Te + 1.6, kEase.sale))} franja={kprog(T, K.Te + 1.2, K.Te + 1.7)} />
          {T > K.Te + 1.4 && <Tijeras x={640} y={480 - 8 * Math.sin(T * 6)} s={1.2} abre={0.5 + 0.5 * Math.sin(T * 12)} />}
        </>)}
      </Escena>
      {/* 6 · otra enzima lo deshace a temperatura ambiente → remojo en agua fría */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={40} y={720} width={470} height={460} rx={30} fill="rgba(255,138,31,.85)" stroke={KC.ink} strokeWidth={7} />
          <rect x={570} y={720} width={470} height={460} rx={30} fill="rgba(0,210,255,.85)" stroke={KC.ink} strokeWidth={7} />
          <Nucleotidasa T={T} x={170} y={960} s={1.2} come={1} />
          {Array.from({ length: 5 }, (_, i) => { const t0 = K.A + 0.4 + i * 0.45; const k = kprog(T, t0, t0 + 0.45);
            return k < 1 ? <GMP key={i} x={klerp(460, 230, k)} y={960} r={18} o={1 - k * 0.6} /> : null; })}
          <VasoFrio T={T} x={805} y={1170} s={1.0} dentro={<g opacity={kprog(T, K.A + 2.0, K.A + 2.6)}><Shiitake T={T} x={0} y={-60} s={0.45} seco={0.6} />
            <Nucleotidasa T={T} x={-30} y={-150} s={0.45} come={0} dormida={1} />
            {[[-50, -110], [40, -120], [10, -90]].map(([a, b], i) => <GMP key={i} x={a} y={b} r={11} />)}</g>} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y por qué una pizca hace tanto? */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform={`translate(280 1030) rotate(${-8 + Math.sin(T * 3) * 3})`}>
            <ellipse cx={0} cy={0} rx={130} ry={60} fill="#dfe6ee" stroke={KC.ink} strokeWidth={8} />
            <rect x={110} y={-14} width={260} height={28} rx={14} fill="#dfe6ee" stroke={KC.ink} strokeWidth={7} />
            {[[-30, -14], [0, -24], [26, -12], [-8, -6], [16, -30]].map(([a, b], i) => <GMP key={i} x={a} y={b} r={13} brillo={1} />)}
          </g>
          <Interrogacion T={T} x={280} y={820} tam={380} />
        </>)}
      </Escena>
      {/* 8–10 · el receptor: atrapamoscas (modelo), glutamato y nucleótido */}
      <Escena T={T} a={K.R} b={K.E} zoom={0.04} origen="50% 60%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<Receptor T={T} x={400} y={980}
          c={kprog(T, K.Gl + 1.2, K.Gl + 2.0, kEase.sale) * 0.6 + kprog(T, K.N + 1.0, K.N + 1.6, kEase.sale) * 0.4}
          glu={kprog(T, K.Gl + 0.2, K.Gl + 1.2, kEase.sale)} nuc={kprog(T, K.N + 0.1, K.N + 1.0, kEase.sale)}
          brillo={kprog(T, K.N + 1.0, K.N + 1.4) * (0.6 + 0.4 * Math.sin(T * 5))} />)}
      </Escena>
      {/* 11 · el estudio de 2008 */}
      <Escena T={T} a={K.E} b={K.U} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g transform="translate(540 1010)">
          {[0, 1, 2, 3, 4].map((i) => { const cambia = kprog(T, K.E + 0.8 + i * 0.3, K.E + 1.1 + i * 0.3, kEase.rebote);
            return <rect key={i} x={-330 + i * 132} y={-60 - cambia * 30} width={110} height={110} rx={18} fill={mixHex(UM.t1r1, UM.t1r3, i % 2 ? cambia : cambia * 0.5)} stroke={KC.ink} strokeWidth={7} />; })}
        </g>)}
      </Escena>
      {/* 12 · menos glutamato para notarlo (umbral que baja, sin número) */}
      <Escena T={T} a={K.U} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <line x1={130} y1={1060} x2={950} y2={1060} stroke={KC.ink} strokeWidth={8} />
          {(() => { const u = kprog(T, K.U + 0.3, K.U + 1.3, kEase.sale), v = kprog(T, K.U + 1.8, K.U + 2.8, kEase.sale);
            const umbral = klerp(680, 880, kprog(T, K.U + 2.0, K.U + 3.2, kEase.suave));
            return <>
              <rect x={230} y={1060 - 380 * u} width={220} height={380 * u} fill={UM.glu} stroke={KC.ink} strokeWidth={7} />
              <rect x={630} y={1060 - (1060 - umbral) * v} width={220} height={(1060 - umbral) * v} fill={UM.glu} stroke={KC.ink} strokeWidth={7} />
              {v > 0 && [0, 1, 2].map((i) => <GMP key={i} x={690 + i * 50} y={umbral - 30} r={14} o={v} brillo={1} />)}
              <line x1={170} y1={umbral} x2={910} y2={umbral} stroke={KC.red} strokeWidth={8} strokeDasharray="26 16" opacity={u} />
            </>; })()}
          <text x={340} y={1105} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>solo glutamato</text>
          <text x={740} y={1105} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>+ pizca de IMP</text>
        </>)}
      </Escena>
      {/* 13 · el caldo: kombu (glutamato) + hongo remojado en frío (guanilato) */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Olla T={T} x={540} y={1150} s={1.15} vapor={1}>
            {(() => { const k1 = kprog(T, K.D + 0.3, K.D + 1.2, kEase.sale), k2 = kprog(T, K.D + 1.6, K.D + 2.5, kEase.sale);
              return <>
                <g transform={`translate(${-110} ${klerp(-620, -205, k1)}) rotate(${klerp(-30, -8, k1)})`}><rect x={-120} y={-26} width={240} height={52} rx={20} fill={UM.kombu} stroke={KC.ink} strokeWidth={6} /></g>
                <g transform={`translate(${110} ${klerp(-640, -195, k2)})`}><Shiitake T={T} x={0} y={30} s={0.42} seco={0.35} /></g>
                {k1 > 0.9 && [0, 1, 2, 3].map((i) => <circle key={i} cx={-180 + i * 40} cy={-215 - ((T * 40 + i * 30) % 90)} r={11} fill={UM.glu} stroke={KC.ink} strokeWidth={3} opacity={1 - ((T * 40 + i * 30) % 90) / 90} />)}
                {k2 > 0.9 && [0, 1, 2, 3].map((i) => <GMP key={i} x={60 + i * 40} y={-215 - ((T * 40 + i * 25 + 15) % 90)} r={11} o={1 - ((T * 40 + i * 25 + 15) % 90) / 90} />)}
              </>; })()}
          </Olla>
        </>)}
      </Escena>
      {/* 14 · cierre: el mismo hongo del inicio, ya remojado, con su vaso frío y la olla */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa y={1120} />
          <Shiitake T={T} x={360} y={1120} s={1.15} seco={klerp(1, 0.35, kprog(T, K.C + 0.4, K.C + 2.0, kEase.suave))} />
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.2)}><VasoFrio T={T} x={820} y={1120} s={0.8} /></g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const k = kprog(T, K.C + 2.2 + i * 0.07, K.C + 3.0 + i * 0.07, kEase.sale); const a = -Math.PI * (0.15 + i * 0.1);
            return <GMP key={i} x={360 + Math.cos(a) * 270 * k} y={950 + Math.sin(a) * 270 * k} r={16} o={k} brillo={1} />; })}
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.6} until={K.H - 0.3} texto="¿echado a perder?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.4} until={K.H - 0.3} texto="bomba de umami" x={330} y={580} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.H + 0.3} until={K.F - 0.2} x={60} y={470} texto="shiitake seco" tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 0.7} until={K.F - 0.2} x={60} y={530} texto="Lentinula edodes" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.F + 0.2} until={K.Ce - 0.2} texto="fresco" x={270} y={700} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.F + 1.6} until={K.Ce - 0.2} texto="seco" x={810} y={700} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.F + 0.6} until={K.Ce - 0.2} x={60} y={430} texto="● guanilato · 5′-GMP" tam={30} color={KC.ink} />
      <Etq T={T} at={K.F + 3.2} until={K.Ce - 0.2} x={60} y={1210} texto="esquemático: sin escala de cantidad" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Ce + 0.1} until={K.Ti - 0.2} texto="POR DENTRO · HIFAS DEL SOMBRERO" x={480} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ce + 1.2} until={K.Ti - 0.2} x={60} y={540} texto="ARN" tam={34} color={KC.lilac} />
      <Chip T={T} at={K.Ti + 0.2} until={K.Te - 0.2} texto="AL CALENTARLO" x={330} y={470} tam={34} borde={KC.orange} mono />
      <Etq T={T} at={K.Ti + 0.8} until={K.Te - 0.2} x={60} y={560} texto="ribonucleasas = tijeras" tam={32} color={UM.ribo} />
      <Etq T={T} at={K.Ti + 0.4} until={K.Te - 0.2} x={60} y={790} texto="ARN" tam={30} color={KC.lilac} />
      <Etq T={T} at={K.Ti + 2.0} until={K.Te - 0.2} x={60} y={630} texto="● guanilato que se suelta" tam={30} color={UM.gmp} />
      <Chip T={T} at={K.Te + 1.5} until={K.A - 0.2} texto="60–70 °C" x={740} y={790} tam={60} borde={KC.mint} />
      <Etq T={T} at={K.Te + 1.8} until={K.A - 0.2} x={540} y={890} texto="aquí cortan mejor" tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 0.2} until={K.P - 0.2} texto="25 °C" x={275} y={770} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.A + 0.5} until={K.P - 0.2} x={70} y={1090} texto="nucleotidasa" tam={28} color={KC.ink} />
      <Etq T={T} at={K.A + 0.9} until={K.P - 0.2} x={70} y={1135} texto="se come el guanilato" tam={24} color={KC.ink} />
      <Chip T={T} at={K.A + 2.0} until={K.P - 0.2} texto="agua fría" x={805} y={770} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.A + 2.6} until={K.P - 0.2} texto="remojo en frío" x={300} y={620} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.R + 0.2} until={K.E - 0.2} texto="TU RECEPTOR DEL UMAMI" x={380} y={440} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={K.R + 0.8} until={K.E - 0.2} x={60} y={520} texto="modelo (esquemático)" tam={26} color={KC.texto} />
      <Etq T={T} at={K.R + 1.2} until={K.E - 0.2} x={60} y={1030} texto="T1R1" tam={34} color={UM.t1r1} />
      <Etq T={T} at={K.R + 1.6} until={K.E - 0.2} x={1040} y={1030} texto="T1R3" lado="izq" tam={34} color={UM.t1r3} />
      <Etq T={T} at={K.R + 2.2} until={K.Gl - 0.1} x={60} y={600} texto="dominio «atrapamoscas»" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Gl + 0.5} until={K.E - 0.2} x={330} y={930} lado="izq" texto="glutamato" tam={28} color="#8fb0ff" />
      <Etq T={T} at={K.N + 0.6} until={K.E - 0.2} x={300} y={740} lado="izq" texto="nucleótido" tam={28} color={UM.gmp} />
      <Chip T={T} at={K.N + 1.3} until={K.E - 0.2} texto="más cerrada" x={800} y={580} tam={36} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.U - 0.2} anio="2008" quien="Zhang et al. · San Diego" revista="PNAS, 2008 · receptores mutados pieza por pieza" x={540} y={640} />
      <Chip T={T} at={K.U + 0.2} until={K.D - 0.2} texto="pruebas de sabor en personas" x={330} y={460} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.U + 2.2} until={K.D - 0.2} x={60} y={620} texto="nivel para notarlo" tam={28} color={KC.red} />
      <Chip T={T} at={K.U + 3.2} until={K.D - 0.2} texto="menos glutamato para notarlo" x={330} y={540} tam={30} borde={KC.red} />
      <Etq T={T} at={K.D + 0.6} until={K.C - 0.2} x={60} y={460} texto="kombu → glutamato" tam={32} color={KC.ink} />
      <Etq T={T} at={K.D + 1.9} until={K.C - 0.2} x={60} y={515} texto="hongo remojado → guanilato" tam={32} color={KC.ink} />
      <Chip T={T} at={K.D + 3.0} until={K.C - 0.2} texto="se suman en el receptor" x={360} y={620} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="bomba de umami ✓" x={330} y={520} tam={46} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="2 cm" largo={90} />
      <BarraEscala T={T} at={K.H} until={K.F} texto="2 cm" largo={125} />
      <BarraEscala T={T} at={K.F} until={K.Ce} texto="2 cm" largo={75} />
      <BarraEscala T={T} at={K.Ce} until={K.Ti} texto="10 µm" largo={200} />
      <BarraEscala T={T} at={K.Ti} until={K.Te} texto="ARN: esquemático" largo={0} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.R} until={K.E} texto="5 nm (esquemático)" largo={180} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={90} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No está echado a perder: *bomba de umami.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.F - 0.1} texto="Shiitake seco, *Lentinula edodes.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.Ce - 0.1} texto="Fresco, poco guanilato; *seco, muchísimo.*" />
      <Subtitulo T={T} idx={3} at={K.Ce + 0.1} until={K.Ti - 0.1} texto="Al secarse, sus células *se rompen.*" />
      <Subtitulo T={T} idx={4} at={K.Ti + 0.1} until={K.Te - 0.1} texto="Las ribonucleasas cortan ARN y *sueltan guanilato.*" />
      <Subtitulo T={T} idx={5} at={K.Te + 0.1} until={K.A - 0.1} texto="Mejor entre *60 y 70 grados.*" />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.P - 0.1} texto="Por eso, remójalo *en agua fría.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.R - 0.1} texto="¿Por qué una pizca *hace tanto?*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Gl - 0.1} texto="Tu receptor del umami: *una atrapamoscas.*" />
      <Subtitulo T={T} idx={9} at={K.Gl + 0.1} until={K.N - 0.1} texto="El glutamato entra y *la trampa se cierra.*" />
      <Subtitulo T={T} idx={10} at={K.N + 0.1} until={K.E - 0.1} texto="El nucleótido la deja *más cerrada.*" />
      <Subtitulo T={T} idx={11} at={K.E + 0.1} until={K.U - 0.1} texto="Lo propuso en 2008 *un equipo de San Diego.*" />
      <Subtitulo T={T} idx={12} at={K.U + 0.1} until={K.D - 0.1} texto="Notas el glutamato *con mucho menos.*" />
      <Subtitulo T={T} idx={13} at={K.D + 0.1} until={K.C - 0.1} texto="Kombu + hongo seco: *sabor profundo.*" />
      <Subtitulo T={T} idx={14} at={K.C + 0.1} until={K.Ou - 0.1} texto="Esperaba tu agua fría *y tu fuego.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.H - 0.25, 'avatar_11_sorprendido', 'gancho'],
        [K.F + 0.6, K.Ce - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ti + 0.6, K.Te - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.A + 0.4, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.R + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Gl + 1.2, K.N - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.U + 0.4, K.D - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.D + 0.5, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_12_perfil_serio', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="128" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function UmamiSecoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><UmamiShot /></CompositionStage></div>;
}
window.UmamiSecoApp = UmamiSecoApp;
