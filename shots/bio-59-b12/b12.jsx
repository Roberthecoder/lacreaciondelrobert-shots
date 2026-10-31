// Shot Biotecnológico #59 · Tu B12 la hicieron bacterias — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (la molécula no es la estructura atómica completa).
// Vaca y pastizal adaptados de shots/bio-02-vacas/vacas-comun.jsx.

const B12R = '#d7263d', B12R2 = '#a3122a', COBALTO = '#ff4fa3', PASTO_B = '#3fbf4a', PASTO_B2 = '#2a9a3c';

// Capa SVG de pantalla completa.
function SvgB({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Palomita o tache grande.
function MarcaB({ x, y, ok = true, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.5, 1, kEase.sale(kclamp(o, 0, 1)))})`} opacity={kclamp(o, 0, 1)}>
    <circle r={52} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={7} />
    {ok ? <path d="M -26 0 L -8 20 L 28 -20" stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />}
  </g>;
}
// Personita esquemática (científicos).
function Persona({ x, y, s = 1, color = KC.yellow, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-34} r={16} fill={color} stroke={KC.ink} strokeWidth={4} />
    <path d="M -22 20 Q -22 -14 0 -14 Q 22 -14 22 20 Z" fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Pastilla de B12 (tableta roja: la cianocobalamina es roja). bacteria: 0..1 dibuja una bacteria en la cara.
function Pastilla({ x, y, s = 1, rot = 0, bacteria = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={120} ry={46} fill={B12R2} stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-10} width={240} height={28} fill={B12R2} />
    <ellipse cx={0} cy={-10} rx={120} ry={46} fill={B12R} stroke={KC.ink} strokeWidth={8} />
    <line x1={-120} y1={-10} x2={-120} y2={18} stroke={KC.ink} strokeWidth={8} /><line x1={120} y1={-10} x2={120} y2={18} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-40} cy={-26} rx={40} ry={10} fill="#fff" opacity=".35" />
    {bacteria <= 0 && <text x={0} y={2} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={3}>B12</text>}
    {bacteria > 0 && <g opacity={bacteria} transform={`translate(0 -12) scale(${klerp(0.4, 1, bacteria)})`}>
      <path d={`M -56 0 c -16 ${Math.sin(T * 6) * 10}, -26 ${-Math.sin(T * 6) * 10}, -44 0`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={-56} y={-17} width={112} height={34} rx={17} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
      <circle cx={-14} cy={-3} r={4} fill={KC.ink} /><circle cx={10} cy={-3} r={4} fill={KC.ink} />
    </g>}

  </g>;
}
// Plato de cereal con hojuelas y leche.
function Cereal({ x, y, s = 1, T = 0 }) {
  const g = krng(31);
  const hoj = Array.from({ length: 14 }, () => [(g() - 0.5) * 300, (g() - 0.5) * 40, g() * 360, g()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-10} rx={200} ry={56} fill="#fff7e0" stroke={KC.ink} strokeWidth={8} />
    {hoj.map(([a, b, r, k], i) => <ellipse key={i} cx={a} cy={-18 + b + Math.sin(T * 2 + i) * 2} rx={26} ry={16} fill={k < 0.5 ? '#f4b942' : '#e8932a'} stroke={KC.ink} strokeWidth={4} transform={`rotate(${r} ${a} ${-18 + b})`} />)}
    <path d="M -200 -10 Q -190 140 0 150 Q 190 140 200 -10" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 40 Q 0 70 150 40" stroke="#fff" strokeWidth={8} fill="none" opacity=".5" />
  </g>;
}
// Caja de cereal fortificado.
function CajaCereal({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-120} y={-190} width={240} height={380} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-100} y={-170} width={200} height={90} rx={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-112} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>CEREAL</text>
    {[[-40, 10], [30, 40], [-10, 90], [50, -20]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={30} ry={18} fill="#f4b942" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 40} ${a} ${b})`} />)}
    <circle cx={70} cy={130} r={44} fill={B12R} stroke={KC.ink} strokeWidth={5} />
    <text x={70} y={124} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">+B12</text>
    <text x={70} y={146} textAnchor="middle" style={{ font:`700 13px ${KF.mono}` }} fill="#fff">fortificado</text>
  </g>;
}
// Planta en maceta.
function Planta({ x, y, s = 1, T = 0 }) {
  const m = mece(T, 3, 0.4) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 C ${m} -60 ${m} -100 ${m * 2} -140`} stroke={PASTO_B2} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d={`M ${m} -70 C -60 -110 -90 -60 -80 -40 C -40 -40 -10 -50 ${m} -70 Z`} fill={PASTO_B} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${m * 1.5} -110 C 60 -160 100 -110 90 -90 C 50 -80 20 -90 ${m * 1.5} -110 Z`} fill={PASTO_B} stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 0 L 60 0 L 46 90 L -46 90 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-68} y={-14} width={136} height={24} rx={6} fill={KC.coral} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Vaca holstein de perfil (de bio-02-vacas). Origen = centro del cuerpo. ~760 px de ancho con s = 1.
function VacaB({ T = 0, x = 0, y = 0, s = 1, mastica = 0, brillo = 0 }) {
  const mand = Math.max(0, Math.sin(mastica)) * 10, c = Math.sin(T * 1.7) * 12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(-300 -90) rotate(${c})`}><path d="M 0 0 C -40 40 -50 120 -40 190" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" /><ellipse cx={-40} cy={200} rx={16} ry={28} fill={KC.ink} /></g>
    {[[-230, 0], [-150, 1], [150, 0], [230, 1]].map(([px], i) => <g key={i} transform={`rotate(${Math.sin(T * 0.8 + i) * 1.2} ${px} 60)`}>
      <rect x={px - 26} y={40} width={52} height={210} rx={20} fill={i % 2 ? '#f4efe4' : '#fff'} stroke={KC.ink} strokeWidth={8} /><rect x={px - 28} y={226} width={56} height={34} rx={10} fill="#3a2b22" stroke={KC.ink} strokeWidth={6} />
    </g>)}
    <path d="M -60 120 Q 0 190 60 120 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-320} y={-170} width={600} height={320} rx={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    {brillo > 0 && <ellipse cx={-60} cy={10} rx={230} ry={130} fill={KC.yellow} opacity={0.4 * brillo} />}
    <path d="M -250 -150 C -200 -110 -150 -140 -130 -90 C -110 -40 -190 -20 -230 -60 C -270 -100 -290 -130 -250 -150 Z" fill={KC.ink} />
    <path d="M 20 -168 C 70 -120 140 -150 150 -100 C 160 -40 70 -40 40 -80 C 20 -110 0 -150 20 -168 Z" fill={KC.ink} />
    <path d="M -120 60 C -80 30 -20 50 -30 100 C -40 140 -110 130 -130 100 Z" fill={KC.ink} />
    <path d="M 160 40 C 200 20 250 40 240 90 C 220 120 170 110 160 80 Z" fill={KC.ink} />
    <g transform={`translate(300 -110) rotate(${mece(T, 5, 0.25) * 2})`}>
      <path d="M -20 -40 L -60 -66 L -40 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 10 -76 q 10 -30 30 -36" stroke="#e8d9b0" strokeWidth={12} fill="none" strokeLinecap="round" />
      <rect x={-30} y={-80} width={170} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={9} />
      <path d="M 40 -80 C 70 -60 60 -20 30 -30 C 10 -40 10 -70 40 -80 Z" fill={KC.ink} />
      <circle cx={70} cy={-20} r={12} fill={KC.ink} /><circle cx={74} cy={-24} r={4} fill="#fff" />
      <rect x={70} y={10} width={110} height={60} rx={28} fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
      <circle cx={150} cy={34} r={6} fill={KC.ink} /><circle cx={124} cy={34} r={6} fill={KC.ink} />
      <g transform={`translate(0 ${mand})`}><rect x={84} y={62} width={90} height={26} rx={13} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} /></g>
    </g>
  </g>;
}
function PastizalB({ T, horizonte = 1240 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff 0%, #00d2ff 65%, #7fe0c8 100%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={920} cy={760} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      {[[860, 330, 60], [640, 420, 46]].map(([x, y, r], i) => <g key={i} transform={`translate(${mece(T, i + 4, 0.05) * 30} 0)`}><ellipse cx={x} cy={y} rx={r * 1.5} ry={r * 0.6} fill="#fff" stroke={KC.ink} strokeWidth={6} /></g>)}
      <rect x={0} y={horizonte} width={KW} height={KH - horizonte} fill={PASTO_B} />
      <path d={`M0 ${horizonte} Q 270 ${horizonte - 30} 540 ${horizonte} T 1080 ${horizonte}`} fill={PASTO_B} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M ${20 + i * 50} ${horizonte + 220 + (i % 3) * 40} l ${8 + mece(T, i, 0.4) * 6} -34 l ${8 - mece(T, i, 0.4) * 6} 34`} stroke={PASTO_B2} strokeWidth={6} fill="none" />)}
    </svg>
  </>;
}
// Mini molécula de B12 (hexágono rojo con un punto de cobalto): lo que sueltan los microbios.
function B12Mini({ x, y, s = 1, rot = 0, o = 1 }) {
  const pts = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2; return `${Math.cos(a) * 22},${Math.sin(a) * 22}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={pts} fill={B12R} stroke="#fff" strokeWidth={4} />
    <circle r={8} fill={COBALTO} stroke="#fff" strokeWidth={2} />
  </g>;
}
// Interior del rumen para la Lupa (cuadro 2r × 2r): fibras de pasto, bacterias y arqueas que sueltan B12.
function RumenB12({ T, r, t0 }) {
  const D = r * 2, g = krng(44);
  const bac = Array.from({ length: 9 }, () => [g() * 0.8 + 0.1, g() * 0.8 + 0.1, g() * 360, g()]);
  const fib = Array.from({ length: 5 }, () => [g() * 0.8 + 0.1, g() * 0.8 + 0.1, g() * 180]);
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#2a1219" />
    {fib.map(([a, b, rr], i) => <rect key={'f' + i} x={a * D - 60} y={b * D - 12} width={120} height={24} rx={10} fill="#9ccf5a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${rr + mece(T, i, 0.2) * 6} ${a * D} ${b * D})`} />)}
    {bac.map(([a, b, rr, k], i) => k < 0.75
      ? <Bacteria key={i} T={T} x={a * D + mece(T, i, 0.3) * 12} y={b * D + mece(T, i + 7, 0.3) * 10} largo={74} ancho={30} rot={rr + T * 12} color={KC.mint} seed={i} flagelo={k < 0.3} nucleoide={false} />
      : <rect key={i} x={a * D - 26} y={b * D - 13} width={52} height={26} rx={13} fill="#8b4dff" stroke={KC.ink} strokeWidth={4} transform={`rotate(${rr + mece(T, i, 0.4) * 20} ${a * D} ${b * D})`} />)}
    {bac.map(([a, b], i) => { const f = ((T - t0) * 0.45 + i / 9) % 1; if (T < t0 + i * 0.15) return null;
      return <B12Mini key={'m' + i} x={a * D + 30 + f * 40} y={b * D - f * 120} s={0.8} rot={T * 60 + i * 30} o={1 - f} />; })}
  </svg>;
}
// Vaso de leche y bistec.
function Leche({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -110 L 60 -110 L 48 100 L -48 100 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -56 -70 L 56 -70" stroke="#d8e7ef" strokeWidth={6} />
  </g>;
}
function Bistec({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -20 C -120 -80 -20 -90 40 -70 C 120 -50 130 20 80 50 C 20 90 -100 70 -110 -20 Z" fill="#c8434a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -20 C -60 -50 0 -50 40 -30" stroke="#f3d3c7" strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={30} cy={10} r={16} fill="#f3d3c7" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Plato de verduras (con trazas de B12: "casi 0").
function PlatoVerde({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={20} rx={220} ry={70} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={14} rx={160} ry={46} fill="#eef6ee" />
    <path d="M -120 0 C -120 -60 -40 -70 -40 -10 Z" fill={PASTO_B} stroke={KC.ink} strokeWidth={5} />
    <path d="M -60 -6 C -40 -90 40 -90 40 -6 Z" fill="#2fb350" stroke={KC.ink} strokeWidth={5} />
    <circle cx={70} cy={-10} r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d={`M 110 10 l 70 ${-30 + Math.sin(T * 2) * 3}`} stroke={KC.orange} strokeWidth={22} strokeLinecap="round" />
    <circle cx={-10} cy={20} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Matraz de laboratorio que burbujea.
function Matraz({ x, y, s = 1, T = 0, liquido = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -260 L -50 -120 L -180 120 Q -190 150 -150 150 L 150 150 Q 190 150 180 120 L 50 -120 L 50 -260" fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -120 20 L -180 120 Q -190 150 -150 150 L 150 150 Q 190 150 180 120 L 120 20 Z" fill={liquido} stroke={KC.ink} strokeWidth={6} />
    <rect x={-66} y={-282} width={132} height={30} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => { const f = (T * 0.7 + i / 9) % 1; return <circle key={i} cx={-90 + (i * 23) % 180 + Math.sin(T * 3 + i) * 6} cy={130 - f * 360} r={8 + (i % 3) * 5} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={3} opacity={1 - f} />; })}
  </g>;
}
// Anillo de corrina (esquemático): 4 anillos de 5 lados unidos alrededor del cobalto. p = cuánto se ha dibujado (0..1).
function Corrina({ T, x, y, s = 1, p = 1, co = 1 }) {
  const ang = [-135, -45, 45, 135];
  const pent = (cx, cy, rot) => Array.from({ length: 5 }, (_, i) => { const a = (rot + i * 72) * Math.PI / 180; return [cx + Math.cos(a) * 70, cy + Math.sin(a) * 70]; });
  const rings = ang.map((a) => { const r = a * Math.PI / 180; return pent(Math.cos(r) * 190, Math.sin(r) * 190, a + 180); });
  const cola = [[-260, -230], [-330, -160], [260, -240], [340, -170], [270, 230], [340, 170], [-270, 230], [-330, 300]];
  const giro = Math.sin(T * 0.6) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${giro}) scale(${s})`}>
    {rings.map((pts, i) => { const k = kclamp(p * 5 - i, 0, 1); const d = 'M ' + pts.map((q) => q.join(' ')).join(' L ') + ' Z';
      return <g key={i} opacity={k > 0 ? 1 : 0}>
        <path d={d} fill="rgba(255,79,163,.12)" stroke="#9fe8ff" strokeWidth={9} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - k} />
        <line x1={pts[0][0]} y1={pts[0][1]} x2={0} y2={0} stroke="#2fe0a8" strokeWidth={6} strokeDasharray="12 10" opacity={kclamp(co * 2, 0, 1)} />
        <circle cx={pts[0][0]} cy={pts[0][1]} r={16} fill="#2346ff" stroke="#fff" strokeWidth={4} opacity={k} />
      </g>; })}
    {/* puentes entre anillos: el gran anillo de corrina */}
    {rings.map((pts, i) => { const n = rings[(i + 1) % 4]; const k = kclamp(p * 5 - 4, 0, 1); if (i === 3) return null;
      return <line key={'p' + i} x1={pts[2][0]} y1={pts[2][1]} x2={n[3][0]} y2={n[3][1]} stroke="#9fe8ff" strokeWidth={9} opacity={k} strokeLinecap="round" />; })}
    <line x1={rings[3][2][0]} y1={rings[3][2][1]} x2={rings[0][3][0]} y2={rings[0][3][1]} stroke="#9fe8ff" strokeWidth={9} opacity={kclamp(p * 5 - 4, 0, 1)} strokeLinecap="round" />
    {/* cadenas laterales */}
    {cola.map(([a, b], i) => { const k = kclamp(p * 5 - 4, 0, 1); const r0 = rings[Math.floor(i / 2) % 4][1];
      return <path key={'c' + i} d={`M ${r0[0]} ${r0[1]} L ${a} ${b}`} stroke="#9fe8ff" strokeWidth={6} opacity={k * 0.7} strokeLinecap="round" />; })}
    {/* cobalto */}
    {co > 0 && <g opacity={co}>
      <circle r={70 + Math.sin(T * 5) * 8} fill={COBALTO} opacity=".25" />
      <circle r={52} fill={COBALTO} stroke="#fff" strokeWidth={6} />
      <text y={20} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill="#fff">Co</text>
    </g>}
  </g>;
}
// Escena de difracción: tubo de rayos X, cristal rojo y placa con puntos.
function Difraccion({ T, t0 }) {
  const haz = kprog(T, t0 + 0.4, t0 + 1.0), pts = kprog(T, t0 + 1.0, t0 + 3.4);
  const g = krng(9), dots = Array.from({ length: 46 }, () => [(g() - 0.5) * 220, (g() - 0.5) * 360, 3 + g() * 9]);
  return <g>
    <rect x={60} y={920} width={200} height={130} rx={20} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
    <rect x={250} y={965} width={50} height={40} fill="#6b7385" stroke={KC.ink} strokeWidth={6} />
    <text x={160} y={1000} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>RAYOS X</text>
    <path d={`M 300 985 L ${klerp(300, 500, haz)} 985`} stroke={KC.yellow} strokeWidth={18} strokeLinecap="round" opacity={0.8 + Math.sin(T * 20) * 0.2} />
    <g transform={`translate(540 985) rotate(${T * 20})`}>
      <polygon points="0,-44 38,-14 26,36 -26,36 -38,-14" fill={B12R} stroke={KC.ink} strokeWidth={6} />
      <polygon points="0,-44 12,-8 -12,-8" fill="#fff" opacity=".4" />
    </g>
    {haz >= 1 && [-140, -70, 0, 70, 140].map((dy, i) => <line key={i} x1={580} y1={985} x2={klerp(580, 840, pts)} y2={985 + dy * 1.4 * pts} stroke={KC.yellow} strokeWidth={5} opacity={0.6} />)}
    <rect x={840} y={780} width={180} height={410} rx={10} fill="#1b2333" stroke={KC.ink} strokeWidth={8} />
    {dots.map(([a, b, r], i) => i / 46 < pts && <circle key={i} cx={930 + a * 0.7} cy={985 + b} r={r} fill="#fff" opacity={0.8} />)}
  </g>;
}
// Medalla dorada.
function Medalla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 1.6) * 5}) scale(${s})`}>
    <path d="M -80 -320 L -20 -120 L 20 -120 L 80 -320" fill="none" stroke={KC.blue} strokeWidth={44} />
    <circle r={170} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={130} fill="none" stroke={KC.gold2} strokeWidth={8} />
    <text y={-20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={46} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>QUÍMICA</text>
    <text y={100} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>1964</text>
    <path d="M -110 -110 L -70 -150" stroke="#fff" strokeWidth={10} opacity=".5" strokeLinecap="round" />
  </g>;
}
// Tira de pasos de la síntesis química que se desenrolla.
function TiraPasos({ T, t0, y = 900 }) {
  const p = kprog(T, t0, t0 + 3.2);
  return <g>
    {Array.from({ length: 16 }, (_, i) => { const x = 80 + i * 170 - Math.max(0, p * 16 - 5.5) * 170; const vis = kclamp(p * 16 - i, 0, 1); if (x < -180 || x > 1180 || vis <= 0) return null;
      return <g key={i} transform={`translate(${x} ${y + Math.sin(i * 1.3) * 30}) rotate(${(i % 2 ? 4 : -4)})`} opacity={vis}>
        <rect x={0} y={-60} width={150} height={120} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
        <text x={75} y={-16} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">paso</text>
        <text x={75} y={36} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
        {i < 15 && <path d="M 150 0 l 20 0" stroke={KC.ink} strokeWidth={6} />}
      </g>; })}
  </g>;
}
// Queso suizo con hoyos que se inflan (CO₂ de Propionibacterium) y una bacteria que asoma.
function QuesoSuizo({ T, x, y, s = 1, t0 }) {
  const hoyos = [[-120, -40, 46], [40, -90, 34], [110, 30, 52], [-30, 70, 40], [-170, 90, 28], [180, -60, 26], [60, 140, 24]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -160 L 280 -220 L 280 200 L -260 220 Z" fill="#ffd54a" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -260 -160 L 280 -220 L 200 -290 L -300 -220 Z" fill="#ffe27a" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {hoyos.map(([a, b, r], i) => { const k = kprog(T, t0 + 0.3 + i * 0.25, t0 + 1.0 + i * 0.25, kEase.rebote); return <g key={i}>
      <circle cx={a} cy={b} r={r * k} fill="#e0a92a" stroke={KC.ink} strokeWidth={6} />
      <circle cx={a + r * 0.2} cy={b + r * 0.2} r={r * k * 0.7} fill="#c98f1e" />
      {k > 0.9 && i < 3 && <text x={a} y={b - r - 14 - ((T - t0) * 30) % 40} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={0.8}>CO₂</text>}
    </g>; })}
    <g transform={`translate(110 ${30 + klerp(40, -10, kprog(T, t0 + 1.8, t0 + 2.4, kEase.sale))})`}>
      <Bacteria T={T} x={0} y={-20} largo={90} ancho={40} rot={-70} color={KC.lilac} seed={4} flagelo={false} nucleoide={false} />
      <circle cx={-8} cy={-48} r={5} fill={KC.ink} /><circle cx={8} cy={-50} r={5} fill={KC.ink} />
    </g>
  </g>;
}

function B12() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nadie, V: CUES.Vaca, Ve: CUES.Vegano, P: CUES.Pregunta, M: CUES.Molecula, H: CUES.Hodgkin,
    S: CUES.Sintesis, Ta: CUES.Tanque, Q: CUES.Queso, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // divisiones dentro de las escenas con dos líneas de voz (fracción de la escena, sigue a la voz en la narrada)
  const V2 = klerp(K.V, K.Ve, 0.39), H2 = klerp(K.H, K.S, 0.71), S2 = klerp(K.S, K.Ta, 0.62);
  const cae = kprog(T, K.G, K.G + 0.45, kEase.entra || ((p) => p * p));
  const rebote = Math.abs(Math.sin(kprog(T, K.G + 0.45, K.G + 1.1) * Math.PI)) * (1 - kprog(T, K.G + 0.45, K.G + 1.1)) * 70;
  const pastY = klerp(260, 1060, cae) - rebote;
  const R = krng(7), orbita = Array.from({ length: 6 }, (_, i) => [i / 6 * Math.PI * 2, 190 + R() * 60, R() * 360]);
  const anillo = (t0, cx, cy, s = 1) => orbita.map(([a, rr, rot], i) => { const k = kprog(T, t0 + i * 0.15, t0 + 0.5 + i * 0.15, kEase.rebote); if (k <= 0) return null;
    const ang = a + (T - t0) * 0.6; return <g key={i} transform={`translate(${cx + Math.cos(ang) * rr * s} ${cy + Math.sin(ang) * rr * 0.55 * s}) scale(${k})`}>
      <Bacteria T={T} x={0} y={0} largo={80} ancho={34} rot={rot + T * 30} color={i % 2 ? KC.mint : KC.lilac} seed={i + 2} flagelo={i % 3 === 0} nucleoide={false} /></g>; });
  const cient = Math.floor(klerp(0, 99, kprog(T, K.S + 0.6, K.S + 3.6, kEase.suave)));
  const coloresPais = [KC.yellow, KC.pink, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.coral, KC.gold2, '#7fd8ff', '#ffb3c7', '#9ccf5a', '#ffffff', '#ff8fa3', '#c9d3ff', '#f4b942', '#2fe0a8', '#e8336d', '#b6e33a', '#8b4dff'];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la pastilla cae junto al cereal; la planta y el animal se tachan; llegan las bacterias */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05} origen="40% 60%">
        <FondoLunares color={KC.mint} />
        <SvgB>
          <Cereal x={760} y={1110} s={1} T={T} />
          <ellipse cx={360} cy={1100} rx={130 * klerp(0.4, 1, cae)} ry={22} fill="rgba(0,0,0,.18)" />
          <Pastilla x={360} y={pastY} s={1} rot={klerp(-30, 0, cae)} T={T} />
          <Planta x={170} y={830} s={0.8} T={T} />
          <MarcaB x={230} y={720} ok={false} s={0.8} o={kprog(T, K.G + 1.6, K.G + 2.0)} />
          <g transform={`translate(440 820) scale(0.26)`}><VacaB T={T} mastica={T * 6} /></g>
          <MarcaB x={500} y={720} ok={false} s={0.8} o={kprog(T, K.G + 2.1, K.G + 2.5)} />
          {anillo(K.G + 3.0, 360, 1060, 1)}
        </SvgB>
      </Escena>
      {/* 1 · ningún animal ni planta: solo bacterias y arqueas */}
      <Escena T={T} a={K.N} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgB>
          <rect x={60} y={640} width={440} height={600} rx={30} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
          <rect x={580} y={640} width={440} height={600} rx={30} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
          <text x={280} y={720} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>NO LA HACEN</text>
          <text x={800} y={720} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>SÍ LA HACEN</text>
          <Planta x={170} y={900} s={0.65} T={T} />
          <g transform="translate(360 870) scale(0.2)"><VacaB T={T} mastica={T * 6} /></g>
          <Persona x={280} y={1110} s={2.2} color={KC.coral} />
          {[[200, 840], [400, 820], [330, 1080]].map(([x, y], i) => <MarcaB key={i} x={x} y={y} ok={false} s={0.6} o={kprog(T, K.N + 0.6 + i * 0.35, K.N + 1.0 + i * 0.35)} />)}
          <Bacteria T={T} x={800} y={880} largo={240} ancho={90} rot={-8} color={KC.mint} seed={3} />
          <rect x={720} y={1060} width={160} height={70} rx={35} fill="#8b4dff" stroke={KC.ink} strokeWidth={7} transform={`rotate(${mece(T, 2, 0.4) * 10} 800 1095)`} />
          <MarcaB x={950} y={800} ok s={0.6} o={kprog(T, K.N + 2.0, K.N + 2.4)} />
          <MarcaB x={950} y={1060} ok s={0.6} o={kprog(T, K.N + 2.6, K.N + 3.0)} />
        </SvgB>
        <Etq T={T} at={K.N + 2.0} until={K.V - 0.3} x={640} y={975} texto="bacterias" tam={30} color={KC.ink} />
        <Etq T={T} at={K.N + 2.6} until={K.V - 0.3} x={640} y={1180} texto="arqueas" tam={30} color={KC.ink} />
      </Escena>
      {/* 2–3 · la vaca: por dentro, los microbios de su panza la fabrican; de ahí, la carne y la leche */}
      <Escena T={T} a={K.V} b={K.Ve} zoom={0.03}>
        <PastizalB T={T} />
        <SvgB>
          <VacaB T={T} x={500} y={1010} s={0.85} mastica={T * 5} brillo={kprog(T, K.V + 0.4, K.V + 1.0) * (1 - kprog(T, V2, V2 + 0.4))} />
          {T > V2 && <g>
            <path d={`M 560 900 Q 760 700 ${klerp(560, 850, kprog(T, V2 + 0.3, V2 + 1.0))} ${klerp(900, 760, kprog(T, V2 + 0.3, V2 + 1.0))}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="20 14" strokeDashoffset={-T * 30} />
            <g opacity={kprog(T, V2 + 0.9, V2 + 1.3)}><Leche x={880} y={780} s={0.8} /></g>
            <g opacity={kprog(T, V2 + 1.4, V2 + 1.8)}><Bistec x={160} y={720} s={0.9} /></g>
          </g>}
        </SvgB>
        <Lupa T={T} at={K.V + 0.6} until={V2 + 0.3} x={330} y={560} r={210} fx={420} fy={1010} tinte={KC.yellow}
          etiqueta="AL MICROSCOPIO · RUMEN" interior={(t, r) => <RumenB12 T={t} r={r} t0={K.V + 1.2} />} />
      </Escena>
      {/* 4 · si eres vegano */}
      <Escena T={T} a={K.Ve} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgB>
          <PlatoVerde x={300} y={1050} s={1} T={T} />
          <g opacity={kprog(T, K.Ve + 1.6, K.Ve + 2.0)} transform={`translate(0 ${(1 - kprog(T, K.Ve + 1.6, K.Ve + 2.1, kEase.sale)) * 80})`}>
            <CajaCereal x={800} y={930} s={0.95} rot={4} />
            <Pastilla x={610} y={760} s={0.6} rot={-8} T={T} />
          </g>
        </SvgB>
        <Chip T={T} at={K.Ve + 0.4} until={K.P - 0.3} texto="B12: casi 0" x={300} y={850} tam={44} borde={KC.red} />
        <Chip T={T} at={K.Ve + 2.0} until={K.P - 0.3} texto="suplemento o fortificados" x={540} y={1520} tam={40} borde={B12R} />
      </Escena>
      {/* 5 · re-gancho: ¿por qué no con pura química? */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgB>
          <Matraz x={290} y={1040} s={1} T={T} />
          <text x={290} y={720} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 620)`}>?</text>
        </SvgB>
      </Escena>
      {/* 6 · la molécula por dentro: anillo de corrina con cobalto */}
      <Escena T={T} a={K.M} b={K.H} zoom={0.06}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} seed={8} color="rgba(159,232,255,.25)" tam={[3, 8]} vel={10} />
        <SvgB>
          <Corrina T={T} x={540} y={930} s={1.05} p={kprog(T, K.M + 0.2, K.M + 2.2)} co={kprog(T, K.M + 2.2, K.M + 2.7, kEase.rebote)} />
        </SvgB>
        <Etq T={T} at={K.M + 1.0} until={K.H - 0.3} x={60} y={1500} texto="anillo de corrina" tam={42} color="#9fe8ff" />
        <Etq T={T} at={K.M + 2.4} until={K.H - 0.3} x={1020} y={1580} texto="un átomo de cobalto" lado="izq" tam={42} color={COBALTO} />
      </Escena>
      {/* 7 · Hodgkin, 1956: rayos X → 8 · Nobel 1964 */}
      <Escena T={T} a={K.H} b={K.S} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgB>
          {T < H2 + 0.3 && <g opacity={1 - kprog(T, H2 - 0.1, H2 + 0.3)}><Difraccion T={T} t0={K.H} /></g>}
          {T > H2 - 0.1 && <g opacity={kprog(T, H2 - 0.1, H2 + 0.3)} transform={`translate(540 980) scale(${klerp(0.6, 1.2, kprog(T, H2, H2 + 0.6, kEase.rebote))}) translate(-540 -980)`}><Medalla T={T} x={540} y={1000} s={1} /></g>}
        </SvgB>
        <TarjetaEstudio T={T} at={K.H + 0.3} until={H2 - 0.6} anio="1956" quien="Dorothy Hodgkin · Oxford" revista="Nature · su forma, con rayos X" x={400} y={560} />
        <Chip T={T} at={K.H + 2.6} until={H2 - 0.2} texto="la vitamina más compleja" x={540} y={1520} tam={42} borde={B12R} />
      </Escena>
      {/* 9 · 1972: casi cien científicos de 19 países, 11 años → 10 · nunca se usó para producirla */}
      <Escena T={T} a={K.S} b={K.Ta} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <SvgB>
          {T < S2 + 0.3 && <g opacity={1 - kprog(T, S2 - 0.1, S2 + 0.3)}>
            <rect x={80} y={640} width={920} height={600} rx={30} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 99 }, (_, i) => { const c = i % 11, f = Math.floor(i / 11); const on = i < cient;
              return <Persona key={i} x={145 + c * 79} y={720 + f * 60} s={0.9} color={on ? coloresPais[i % 19] : 'rgba(255,255,255,.4)'} o={on ? 1 : 0.35} />; })}
          </g>}
          {T > S2 - 0.1 && <g opacity={kprog(T, S2 - 0.1, S2 + 0.3)}><TiraPasos T={T} t0={S2} y={960} /></g>}
        </SvgB>
        {T < S2 && <Contador T={T} at={K.S + 0.6} hasta={99} dur={3} x={540} y={1490} tam={70} color={KC.texto} sufijo=" científicos" />}
        <Chip T={T} at={K.S + 1.2} until={S2 - 0.2} texto="Harvard + ETH Zúrich" x={340} y={560} tam={36} borde={KC.blue} />
        <Chip T={T} at={K.S + 2.6} until={S2 - 0.2} texto="19 países · 11 años" x={540} y={1600} tam={44} borde={KC.blue} />
        <MitoTachado T={T} at={S2 + 0.4} tacharEn={S2 + 1.8} until={K.Ta - 0.2} texto="B12 hecha con pura química" x={540} y={1520} tam={40} />
      </Escena>
      {/* 11 · hoy: tanques de fermentación con bacterias */}
      <Escena T={T} a={K.Ta} b={K.Q} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={0.6} burbujas={1} rpm={90} fondo={KC.cyan} />
        <Lupa T={T} at={K.Ta + 0.8} until={K.Q - 0.2} x={330} y={560} r={190} fx={540} fy={1010} tinte={KC.mint}
          etiqueta="AL MICROSCOPIO · CALDO" interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1d1a10" />
            {Array.from({ length: 7 }, (_, i) => { const gx = 60 + (i * 97) % (r * 2 - 100), gy = 70 + (i * 61) % (r * 2 - 120);
              return <g key={i}><Bacteria T={t} x={gx + mece(t, i, 0.3) * 10} y={gy} largo={80} ancho={32} rot={i * 50 + t * 10} color={i % 2 ? KC.mint : KC.lilac} seed={i} flagelo={false} nucleoide={false} />
                <B12Mini x={gx + 30} y={gy - 30 - ((t * 40 + i * 20) % 60)} s={0.6} rot={t * 50} o={0.9} /></g>; })}</svg>} />
        <Chip T={T} at={K.Ta + 1.8} until={K.Q - 0.2} texto={<i>Pseudomonas denitrificans</i>} x={540} y={1510} tam={36} borde={KC.mint} />
        <Chip T={T} at={K.Ta + 2.6} until={K.Q - 0.2} texto={<i>Propionibacterium freudenreichii</i>} x={540} y={1610} tam={36} borde={KC.lilac} />
      </Escena>
      {/* 12 · el queso suizo */}
      <Escena T={T} a={K.Q} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgB><QuesoSuizo T={T} x={780} y={950} s={0.85} t0={K.Q} /></SvgB>
        <Chip T={T} at={K.Q + 1.6} until={K.C - 0.2} texto={<i>Propionibacterium freudenreichii</i>} x={540} y={1520} tam={36} borde={KC.lilac} />
      </Escena>
      {/* 13 · cierre: la pastilla del inicio, ahora con su bacteria */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgB>
          <Cereal x={760} y={1110} s={1} T={T} />
          <ellipse cx={360} cy={1100} rx={130} ry={22} fill="rgba(0,0,0,.18)" />
          <Pastilla x={360} y={1060} s={1.15} T={T} bacteria={kprog(T, K.C + 0.8, K.C + 1.4)} />
          {anillo(K.C + 0.3, 360, 1060, 1.1)}
        </SvgB>
        <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="hecha por bacterias" x={540} y={1520} tam={44} borde={KC.mint} />
      </Escena>

      <Chip T={T} at={K.G + 0.6} until={K.N - 0.3} texto="vitamina B12 · cobalamina" x={330} y={1520} tam={38} borde={B12R} />
      <Chip T={T} at={K.N + 1.4} until={K.V - 0.3} texto="solo bacterias y arqueas" x={540} y={1520} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.V + 1.2} until={V2 - 0.2} texto="la arman sus microbios" x={540} y={1520} tam={42} borde={KC.yellow} />
      <Chip T={T} at={V2 + 0.8} until={K.Ve - 0.2} texto="origen: microbios" x={540} y={1520} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No la hizo una planta: *la hicieron bacterias.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.V - 0.1} texto="Solo *bacterias y arqueas.*" />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={V2 - 0.1} texto="La vaca: *microbios de su panza.*" />
      <Subtitulo T={T} idx={3} at={V2 + 0.1} until={K.Ve - 0.1} texto="Carne y leche: *de microbios.*" />
      <Subtitulo T={T} idx={4} at={K.Ve + 0.1} until={K.P - 0.1} texto="Si eres vegano: *suplemento.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.M - 0.1} texto="¿Y con *pura química?*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.H - 0.1} texto="Un anillo con *cobalto en el centro.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={H2 - 0.1} texto="1956: *la más compleja.*" />
      <Subtitulo T={T} idx={8} at={H2 + 0.1} until={K.S - 0.1} texto="*Nobel de Química* 1964." />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={S2 - 0.1} texto="1972: *casi cien científicos.*" />
      <Subtitulo T={T} idx={10} at={S2 + 0.1} until={K.Ta - 0.1} texto="Nunca *se usó para producirla.*" />
      <Subtitulo T={T} idx={11} at={K.Ta + 0.1} until={K.Q - 0.1} texto="Sale de *tanques con bacterias.*" />
      <Subtitulo T={T} idx={12} at={K.Q + 0.1} until={K.C - 0.1} texto="La de los *hoyos del queso.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu B12: *de bacterias.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [V2 + 0.2, K.Ve - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ve + 0.3, K.P - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.P + 0.05, K.M - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.M + 0.6, K.H - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [H2 + 0.2, K.S - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.S + 0.5, S2 - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [S2 + 0.3, K.Ta - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ta + 1.2, K.Q - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Q + 0.2, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="59" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function B12App() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><B12 /></CompositionStage></div>;
}
window.B12App = B12App;
