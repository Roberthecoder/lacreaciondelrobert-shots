// Shot Fungi Mati #132 · Ese huevo de tortuga no se echó a perder solo — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Fusariosis de los huevos de tortuga marina (complejo Fusarium solani). Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const TH = { arena:'#f5cf73', arena2:'#e2b257', arena3:'#c99a4a', mar:'#1f7fd1', mar2:'#58b4ff', huevo:'#f7f2e6', huevo2:'#e6dcc6',
  amar:'#e9c02f', azul:'#4f9fbe', rojizo:'#c9775a', boba:'#a4592b', boba2:'#c97a3e', carey:'#7a4a1c', carey2:'#d9a441', piel:'#8a6a4a',
  guante:'#7b5cff', hifa:'#fff4d6' };

// Playa: cielo con lunares arriba, mar y arena. ola 0..1 = el agua sube sobre la arena (marea).
function Playa({ T, ola = 0, horizonte = 700, cielo = KC.cyan }) {
  const orilla = horizonte + 110;
  const sube = orilla + ola * 420;
  const onda = (y0, a, f, fase) => Array.from({ length: 28 }, (_, i) => { const x = i * 40; return `${i ? 'L' : 'M'} ${x} ${(y0 + Math.sin(i * f + T * 2 + fase) * a).toFixed(1)}`; }).join(' ');
  return <>
    <FondoLunares color={cielo} />
    {fsvg(<>
      <rect x={0} y={horizonte} width={KW} height={KH} fill={TH.mar} />
      <path d={onda(horizonte + 30, 8, 0.6, 0) + ` L ${KW} ${horizonte + 60} L 0 ${horizonte + 60} Z`} fill={TH.mar2} opacity=".5" />
      <path d={onda(orilla, 10, 0.45, 1) + ` L ${KW + 40} ${KH} L 0 ${KH} Z`} fill={TH.arena} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 70 }, (_, i) => { const r = krng(i + 3); return <circle key={i} cx={r() * KW} cy={orilla + 30 + r() * (KH - orilla)} r={3 + r() * 4} fill={TH.arena2} />; })}
      {ola > 0 && <path d={onda(orilla, 0, 0.45, 1) + ` L ${KW} ${sube} ` + Array.from({ length: 28 }, (_, i) => `L ${KW - i * 40} ${(sube + Math.sin(i * 0.7 + T * 3) * 12).toFixed(1)}`).join(' ') + ' Z'} fill={TH.mar2} opacity=".72" stroke="#fff" strokeWidth={6} />}
    </>, 2)}
  </>;
}

// Huevo de tortuga: casi esférico, blanco, cáscara flexible. manchas 0..1 = zonas amarillas y azuladas que crecen.
const MANCHAS = [[-0.35, -0.2, 0.34, 'amar'], [0.25, 0.1, 0.4, 'azul'], [-0.05, 0.45, 0.28, 'amar'], [0.4, -0.38, 0.22, 'azul'], [-0.48, 0.28, 0.2, 'rojizo'], [0.05, -0.5, 0.2, 'amar']];
function Huevo({ x, y, r = 120, manchas = 0, grieta = 0, rot = 0, id = 'h' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <defs>
      <radialGradient id={`hg${id}`} cx="38%" cy="32%" r="75%"><stop offset="0%" stopColor="#ffffff" /><stop offset="60%" stopColor={TH.huevo} /><stop offset="100%" stopColor={TH.huevo2} /></radialGradient>
      <clipPath id={`hc${id}`}><ellipse rx={r} ry={r * 0.97} /></clipPath>
    </defs>
    <ellipse rx={r} ry={r * 0.97} fill={`url(#hg${id})`} stroke={KC.ink} strokeWidth={Math.max(3, r / 20)} />
    <g clipPath={`url(#hc${id})`}>
      {MANCHAS.map(([mx, my, mr, c], i) => { const k = kclamp(manchas * 1.6 - i * 0.12, 0, 1); if (k <= 0) return null;
        return <g key={i}><ellipse cx={mx * r} cy={my * r} rx={mr * r * k * 1.2} ry={mr * r * k} fill={TH[c]} opacity=".78" />
          <ellipse cx={mx * r} cy={my * r} rx={mr * r * k * 0.55} ry={mr * r * k * 0.45} fill={c === 'azul' ? '#2f6f86' : '#b8862a'} opacity=".55" /></g>; })}
    </g>
    {grieta > 0 && <path d={`M ${-r * 0.1} ${-r * 0.95} l ${r * 0.08} ${r * 0.25 * grieta} l ${-r * 0.1} ${r * 0.18 * grieta} l ${r * 0.12} ${r * 0.2 * grieta}`} stroke={KC.ink} strokeWidth={4} fill="none" />}
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.22} ry={r * 0.12} fill="#fff" opacity=".7" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
  </g>;
}

// Tortuga marina de perfil (mira a la izquierda). tipo 'boba' (cabeza grande, caparazón café rojizo) o 'carey' (escudos encimados, pico de halcón).
function Tortuga({ T, x, y, s = 1, tipo = 'boba', aleta = 0 }) {
  const c1 = tipo === 'carey' ? TH.carey : TH.boba, c2 = tipo === 'carey' ? TH.carey2 : TH.boba2;
  const cab = tipo === 'boba' ? 1.25 : 1;
  const a = Math.sin(T * 3) * 12 * aleta;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* aleta trasera */}
    <path d="M 150 10 Q 220 30 230 60 Q 180 60 140 35 Z" fill={TH.piel} stroke={KC.ink} strokeWidth={6} />
    {/* aleta delantera */}
    <g transform={`rotate(${a} -90 20)`}><path d="M -90 20 Q -150 70 -210 120 Q -140 120 -60 50 Z" fill={TH.piel} stroke={KC.ink} strokeWidth={6} /></g>
    {/* cabeza */}
    <g transform={`scale(${cab}) translate(${-170 / cab + 170} 0)`}>
      <path d={tipo === 'carey' ? 'M -150 -20 Q -200 -40 -238 -10 L -250 8 Q -225 20 -190 22 Q -160 22 -140 10 Z' : 'M -150 -30 Q -225 -45 -240 -5 Q -235 25 -190 25 Q -160 25 -140 12 Z'} fill={TH.piel} stroke={KC.ink} strokeWidth={6} />
      <circle cx={-205} cy={-14} r={7} fill={KC.ink} />
      {tipo === 'carey' && <path d="M -238 -10 Q -256 -2 -250 8" stroke={KC.ink} strokeWidth={6} fill="none" />}
    </g>
    {/* caparazón */}
    <path d="M -160 20 Q -150 -110 0 -125 Q 150 -110 175 20 Z" fill={c1} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {tipo === 'carey'
      ? [[-110, -40], [-40, -70], [40, -70], [110, -40], [-70, -10], [10, -20], [90, -10]].map(([px, py], i) => <path key={i} d={`M ${px - 40} ${py + 20} Q ${px} ${py - 30} ${px + 40} ${py + 20} Z`} fill={c2} opacity=".75" stroke={KC.ink} strokeWidth={4} />)
      : [[-90, -40], [0, -70], [90, -40]].map(([px, py], i) => <path key={i} d={`M ${px - 50} ${py + 30} L ${px - 30} ${py - 20} L ${px + 30} ${py - 20} L ${px + 50} ${py + 30} Z`} fill={c2} opacity=".6" stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -160 20 L 175 20" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 20 Q 0 50 165 20" fill="#e8d3a0" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tortuga vista desde arriba (íconos del mapa de especies).
function TortugaIcono({ x, y, s = 1, color = TH.boba, on = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * on})`} opacity={on}>
    {[[-38, -30, -40], [38, -30, 40], [-30, 34, -140], [30, 34, 140]].map(([ax, ay, r], i) => <ellipse key={i} cx={ax} cy={ay} rx={i < 2 ? 34 : 18} ry={10} transform={`rotate(${r} ${ax} ${ay})`} fill={TH.piel} stroke={KC.ink} strokeWidth={4} />)}
    <ellipse cx={0} cy={-58} rx={16} ry={18} fill={TH.piel} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={38} ry={50} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -42 L 0 42 M -26 -16 L 26 -16 M -26 18 L 26 18" stroke={KC.ink} strokeWidth={3} opacity=".5" />
  </g>;
}

// Conidios del complejo Fusarium solani: macroconidio en canoa (grueso, apenas curvo, 3–5 tabiques, puntas romas) y microconidio ovalado.
function Macroconidio({ x, y, rot = 0, s = 1, sep = 4, p = 1 }) {
  const L = 150, W = 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * p})`} opacity={p}>
    <path d={`M ${-L / 2} 0 Q ${-L / 2} ${-W * 0.95} ${-L / 2 + W * 0.8} ${-W * 0.9} Q 0 ${-W * 1.45} ${L / 2 - W * 0.8} ${-W * 0.9} Q ${L / 2} ${-W * 0.95} ${L / 2} 0 Q ${L / 2} ${W * 0.55} ${L / 2 - W * 0.8} ${W * 0.5} Q 0 ${W * 0.1} ${-L / 2 + W * 0.8} ${W * 0.5} Q ${-L / 2} ${W * 0.55} ${-L / 2} 0 Z`}
      fill="rgba(234,255,247,.9)" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: sep }, (_, i) => { const u = (i + 1) / (sep + 1), sx = -L / 2 + u * L, top = -W * 0.9 - Math.sin(u * Math.PI) * W * 0.5, bot = W * 0.5 - Math.sin(u * Math.PI) * W * 0.38;
      return <line key={i} x1={sx} y1={top + 4} x2={sx} y2={bot - 3} stroke="#6aa898" strokeWidth={4} />; })}
  </g>;
}
function Microconidio({ x, y, rot = 0, s = 1, p = 1 }) {
  return <ellipse cx={x} cy={y} rx={22 * s * p} ry={12 * s * p} transform={`rotate(${rot} ${x} ${y})`} fill="rgba(234,255,247,.9)" stroke={KC.ink} strokeWidth={4} opacity={p} />;
}

// Mapa del mundo esquemático (lon/lat → px).
const MP = (lon, lat) => [540 + lon * 2.9, 760 - lat * 2.9];
const CONT = [
  [[-165, 65], [-140, 70], [-95, 72], [-75, 62], [-55, 50], [-80, 25], [-97, 18], [-87, 13], [-78, 8], [-105, 22], [-118, 32], [-125, 48], [-150, 60]],
  [[-78, 8], [-60, 10], [-35, -6], [-40, -22], [-58, -38], [-70, -53], [-75, -40], [-71, -18], [-81, -5]],
  [[-17, 15], [-10, 30], [10, 37], [32, 31], [43, 12], [51, 11], [40, -15], [32, -28], [20, -35], [12, -18], [9, 4], [-8, 5]],
  [[-10, 36], [-9, 44], [0, 50], [10, 58], [25, 70], [60, 72], [100, 77], [140, 72], [170, 66], [140, 50], [122, 30], [108, 20], [100, 10], [80, 8], [72, 20], [57, 25], [50, 30], [35, 36], [25, 40], [10, 44]],
  [[114, -22], [130, -12], [137, -12], [142, -11], [146, -18], [153, -27], [150, -37], [140, -38], [130, -32], [115, -34]],
];
// sitios de muestreo (Sarmiento-Ramírez et al. 2014)
const SITIOS = [[144.0, -11.6], [141.9, -10.9], [-80.8, -1.5], [-77.4, 8.4], [-83.3, 10.2], [-14.4, -7.9], [-22.8, 16.1]];
const OAXACA = [-96.7, 15.7];
const ESPECIES = [['verde', '#3f8f4a'], ['boba', TH.boba], ['carey', TH.carey2], ['golfina', '#7c8a5a'], ['laúd', '#3a3f4a'], ['plana', '#b0a070']];

// huevos del nido (posiciones dentro de la cámara, en corte)
const NIDO = (() => { const out = []; const r = krng(11); for (let row = 0; row < 6; row++) { const n = 7 - Math.abs(row - 2.5) * 1.2 | 0; for (let i = 0; i < n; i++) out.push([(i - (n - 1) / 2) * 62 + (r() - 0.5) * 8, row * 56 + (r() - 0.5) * 6]); } return out; })();
const VECINOS = [[0, 0], [-230, -10], [230, -10], [-115, -190], [115, -190], [-115, 180], [115, 180]];

function TortugaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nido, Li: CUES.Limpio, Ar: CUES.Arena, Ca: CUES.Cascara, M: CUES.Manchas, Co: CUES.Contagio, P: CUES.Pregunta, E: CUES.Estudio, D: CUES.Datos, Mu: CUES.Mundo, Cl: CUES.Calor, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const rueda = kprog(T, K.G, K.G + 1.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el huevo rueda en la arena y enseña sus manchas */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <Playa T={T} />
        {fsvg(<>
          <ellipse cx={360} cy={1150} rx={170} ry={26} fill="rgba(0,0,0,.18)" />
          <Huevo id="g" x={klerp(250, 360, rueda)} y={1000} r={150} rot={klerp(-160, 0, rueda)} manchas={kprog(T, K.G + 0.3, K.G + 1.8)} />
        </>, 20)}
      </Escena>
      {/* 2 · la tortuga boba entierra sus huevos y se va (corte de la playa) */}
      <Escena T={T} a={K.N} b={K.Li} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={620} width={KW} height={KH} fill={TH.arena} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 60 }, (_, i) => { const r = krng(i + 40); return <circle key={i} cx={r() * KW} cy={650 + r() * 1200} r={3 + r() * 4} fill={TH.arena2} />; })}
          <path d="M 400 625 L 380 800 Q 160 830 170 1000 Q 190 1180 420 1190 Q 660 1180 670 1000 Q 680 830 460 800 L 450 625 Z" fill={TH.arena3} stroke={KC.ink} strokeWidth={5} strokeDasharray="16 10" />
          {NIDO.map(([ex, ey], i) => <Huevo key={i} id={'n' + i} x={420 + ex} y={880 + ey} r={28 * kprog(T, K.N - 0.4 + i * 0.015, K.N + 0.1 + i * 0.015, kEase.rebote)} />)}
          <Tortuga T={T} x={klerp(430, 900, kprog(T, K.N + 0.8, K.N + 3.2, kEase.suave))} y={600} s={0.75} tipo="boba" aleta={1} />
        </>, 20)}
      </Escena>
      {/* 3 · huevos de carey tomados directo de la madre: sin hongo */}
      <Escena T={T} a={K.Li} b={K.Ar} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1000} width={KW} height={KH} fill={TH.arena} stroke={KC.ink} strokeWidth={6} />
          <Tortuga T={T} x={360} y={960} s={1.2} tipo="carey" />
          {Array.from({ length: 4 }, (_, i) => { const u = kclamp(((T - K.Li - 0.6 - i * 0.9) / 0.6), 0, 1); if (T < K.Li + 0.6 + i * 0.9) return null;
            return <Huevo key={i} id={'l' + i} x={600 + i * 14 + u * 60} y={klerp(950, 1060 - i * 10, u)} r={26} />; })}
          {/* mano con guante */}
          <path d="M 590 1095 Q 640 1130 760 1110 Q 800 1100 790 1075 L 600 1070 Z" fill={TH.guante} stroke={KC.ink} strokeWidth={6} />
          <path d="M 790 1075 Q 840 1080 900 1140 L 860 1170 Q 820 1130 780 1110 Z" fill={TH.guante} stroke={KC.ink} strokeWidth={6} />
          {T > K.Li + 3.2 && <g transform={`translate(840 980) scale(${kprog(T, K.Li + 3.2, K.Li + 3.6, kEase.rebote)})`}><circle r={50} fill="#118a3a" stroke={KC.ink} strokeWidth={6} /><path d="M -22 2 L -6 18 L 24 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" /></g>}
        </>, 20)}
      </Escena>
      {/* 4 · al microscopio: el hongo vive en la arena y come materia muerta */}
      <Escena T={T} a={K.Ar} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {[[120, 420, 120], [980, 420, 140], [60, 1050, 150], [1020, 1150, 130], [560, 1250, 120], [300, 820, 70], [700, 560, 60]].map(([gx, gy, gr], i) =>
            <polygon key={i} points={Array.from({ length: 7 }, (_, k) => { const a = k / 7 * Math.PI * 2, rr = gr * (0.8 + krng(i * 9 + k)() * 0.3); return `${gx + Math.cos(a) * rr},${gy + Math.sin(a) * rr}`; }).join(' ')} fill="rgba(245,207,115,.28)" stroke="rgba(245,207,115,.6)" strokeWidth={5} />)}
        </>, 5)}
        <Ambiente T={T} n={20} />
        <HifasMicro T={T} g={kprog(T, K.Ar + 0.2, K.Ar + 3.2)} enzimas={kprog(T, K.Ar + 2.2, K.Ar + 3.6)} comida={{ x: 800, y: 780 }} ancho={22} />
        {fsvg(<>
          <Macroconidio x={250} y={540} rot={-14} sep={4} p={kprog(T, K.Ar + 1.0, K.Ar + 1.4, kEase.rebote)} />
          <Macroconidio x={330} y={640} rot={18} sep={3} s={0.9} p={kprog(T, K.Ar + 1.2, K.Ar + 1.6, kEase.rebote)} />
          <Macroconidio x={180} y={680} rot={-40} sep={5} s={1.05} p={kprog(T, K.Ar + 1.4, K.Ar + 1.8, kEase.rebote)} />
          {[[470, 520, 20], [500, 600, -30], [440, 690, 60], [530, 700, 0]].map(([mx, my, mr], i) => <Microconidio key={i} x={mx} y={my} rot={mr} p={kprog(T, K.Ar + 1.6 + i * 0.1, K.Ar + 1.9 + i * 0.1, kEase.rebote)} />)}
        </>, 25)}
      </Escena>
      {/* 5 · la cáscara en corte: hifas sobre la grieta, ácidos y enzimas, y entra */}
      <Escena T={T} a={K.Ca} b={K.M} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg((() => { const dis = kprog(T, K.Ca + 1.6, K.Ca + 3.0), ent = kprog(T, K.Ca + 2.8, K.Ca + 4.4, kEase.suave), red = kprog(T, K.Ca + 0.2, K.Ca + 1.6);
          return <>
            <rect x={0} y={960} width={KW} height={300} fill="#f1e2a8" opacity=".22" />
            {Array.from({ length: 13 }, (_, i) => { const cx = 40 + i * 84, cerca = Math.abs(cx - 540) < 130; const o = cerca ? 1 - dis * 0.75 : 1;
              return <g key={i} opacity={o}><rect x={cx - 38} y={640} width={76} height={220} rx={26} fill="#e8e2d2" stroke={KC.ink} strokeWidth={5} />
                <path d={`M ${cx - 20} 660 L ${cx} 840 M ${cx + 18} 660 L ${cx + 4} 840`} stroke="#bdb39a" strokeWidth={4} /></g>; })}
            <rect x={505} y={630} width={70} height={240} fill={KC.noche} />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M 0 ${872 + i * 9} Q 270 ${862 + i * 9 + (i % 2) * 14} 540 ${872 + i * 9} T 1080 ${872 + i * 9}`} stroke="#d9cfe8" strokeWidth={3} fill="none" opacity=".7" />)}
            {/* red de hifas sobre el huevo dañado */}
            {[[60, 600, 520, 610], [520, 610, 1020, 590], [200, 600, 160, 470], [700, 600, 760, 480], [380, 605, 420, 500], [880, 595, 930, 520]].map(([x1, y1, x2, y2], i) => { const q = kclamp(red * 1.5 - i * 0.1, 0, 1);
              return <line key={i} x1={x1} y1={y1} x2={klerp(x1, x2, q)} y2={klerp(y1, y2, q)} stroke={TH.hifa} strokeWidth={14} strokeLinecap="round" />; })}
            {/* gotitas de ácidos y enzimas en la grieta */}
            {dis > 0 && Array.from({ length: 14 }, (_, k) => { const u = ((T * 0.6 + k / 14) % 1); return <circle key={k} cx={500 + (k % 5) * 20 + Math.sin(T * 2 + k) * 6} cy={610 + u * 240} r={8} fill={k % 2 ? KC.yellow : KC.mint} opacity={dis * Math.sin(Math.PI * u)} />; })}
            {/* la hifa entra por la grieta hasta adentro */}
            <path d={`M 540 600 L 540 ${600 + ent * 420}`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" opacity={ent > 0 ? 1 : 0} />
            <path d={`M 540 600 L 540 ${600 + ent * 420}`} stroke={TH.hifa} strokeWidth={14} strokeLinecap="round" opacity={ent > 0 ? 1 : 0} />
            {ent > 0.85 && <path d={`M 540 1010 Q ${540 - 90 * (ent - 0.85) / 0.15} 1050 ${540 - 160 * (ent - 0.85) / 0.15} 1080 M 540 1010 Q ${540 + 90 * (ent - 0.85) / 0.15} 1050 ${540 + 160 * (ent - 0.85) / 0.15} 1070`} stroke={TH.hifa} strokeWidth={10} fill="none" strokeLinecap="round" />}
          </>; })(), 20)}
      </Escena>
      {/* 6 · manchas por fuera; adentro, el embrión muere */}
      <Escena T={T} a={K.M} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={400} cy={1150} rx={260} ry={34} fill="rgba(0,0,0,.18)" />
          <Huevo id="m" x={400} y={880} r={250} manchas={kprog(T, K.M, K.M + 2.2)} />
        </>, 20)}
        <Lupa T={T} at={K.M + 1.2} until={K.Co - 0.1} x={800} y={760} r={190} fx={470} fy={860} tinte={KC.mint} etiqueta="POR DENTRO · EMBRIÓN"
          interior={(t, r) => { const muere = kprog(t, K.M + 1.8, K.M + 3.4), mic = kprog(t, K.M + 2.0, K.M + 3.6);
            return <svg width={r * 2} height={r * 2}>
              <circle cx={r} cy={r} r={r * 0.9} fill="#2a2414" />
              <g transform={`translate(${r} ${r})`} opacity={1 - muere * 0.5} style={{ filter:`grayscale(${muere})` }}>
                <path d="M -40 30 Q -70 -20 -20 -55 Q 40 -75 60 -20 Q 70 25 30 45 Q 0 55 -10 30" fill="#f29a9a" stroke={KC.ink} strokeWidth={5} />
                <circle cx={-14} cy={-36} r={8} fill={KC.ink} />
                <path d="M 20 40 Q 40 70 10 80" stroke="#c96a6a" strokeWidth={8} fill="none" />
              </g>
              {[[0.2, 0.3, 0.8, 0.7], [0.15, 0.7, 0.85, 0.35], [0.5, 0.1, 0.45, 0.9], [0.1, 0.5, 0.9, 0.55]].map(([a, b, c, d], i) => { const q = kclamp(mic * 1.4 - i * 0.15, 0, 1);
                return <path key={i} d={`M ${a * 2 * r} ${b * 2 * r} Q ${r + (i - 1.5) * 30} ${r + (i % 2 ? 40 : -40)} ${klerp(a, c, q) * 2 * r} ${klerp(b, d, q) * 2 * r}`} stroke="#fff" strokeWidth={6} fill="none" opacity={q} strokeLinecap="round" />; })}
            </svg>; }} />
      </Escena>
      {/* 7 · de huevo en huevo dentro del nido */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:TH.arena3 }}></div>
        {fsvg(<>
          {Array.from({ length: 50 }, (_, i) => { const r = krng(i + 70); return <circle key={i} cx={r() * KW} cy={r() * KH} r={4 + r() * 5} fill={TH.arena2} />; })}
          {VECINOS.map(([vx, vy], i) => <Huevo key={i} id={'v' + i} x={540 + vx} y={790 + vy} r={105} manchas={i === 0 ? 1 : (i === 1 || i === 4 || i === 6 ? kprog(T, K.Co + 1.0, K.Co + 2.4) * 0.45 : 0)} />)}
          {[[1, -1], [4, 0], [6, 0]].map(([j], k) => { const [vx, vy] = VECINOS[j]; const q = kprog(T, K.Co + 0.2 + k * 0.2, K.Co + 1.2 + k * 0.2);
            return <path key={k} d={`M 540 790 Q ${540 + vx * 0.5 + 30} ${790 + vy * 0.5 - 30} ${540 + vx * q} ${790 + vy * q}`} stroke={TH.hifa} strokeWidth={10} fill="none" strokeLinecap="round" style={{ filter:'drop-shadow(0 0 4px #000)' }} />; })}
        </>, 20)}
      </Escena>
      {/* 8 · re-gancho: ¿por qué unos nidos se salvan? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Interrogacion T={T} x={300} y={900} tam={420} />
          {[[160, 1110, 0], [420, 1110, 1]].map(([nx, ny, mal], k) => <g key={k}>
            <path d={`M ${nx - 110} ${ny} A 110 90 0 0 0 ${nx + 110} ${ny} Z`} fill={TH.arena3} stroke={KC.ink} strokeWidth={6} />
            {[[-50, 20], [0, 26], [50, 20], [-25, 60], [25, 60]].map(([ex, ey], i) => <Huevo key={i} id={`p${k}${i}`} x={nx + ex} y={ny + ey} r={22} manchas={mal ? 1 : 0} />)}
          </g>)}
        </>, 20)}
      </Escena>
      {/* 9 · el estudio: Boa Vista, Cabo Verde, 2011, 29 nidos */}
      <Escena T={T} a={K.E} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <path d="M 760 820 Q 820 900 800 1000 Q 880 1060 1080 1040 L 1080 760 Q 900 740 760 820 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
          {[[380, 870, 30], [450, 830, 24], [520, 880, 22], [600, 950, 46], [560, 1020, 26], [470, 1010, 20], [400, 960, 18]].map(([ix, iy, ir], i) =>
            <circle key={i} cx={ix} cy={iy} r={ir} fill={i === 3 ? KC.gold2 : '#ffe9a8'} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.E + 0.8 + i * 0.06, K.E + 1.1 + i * 0.06)} />)}
          {Array.from({ length: 29 }, (_, i) => { const on = kprog(T, K.E + 1.6 + i * 0.05, K.E + 1.9 + i * 0.05, kEase.rebote); const col = i < 13 ? TH.arena : i < 21 ? TH.mar2 : '#8a6a4a';
            return on > 0 ? <circle key={i} cx={110 + (i % 15) * 62} cy={1110 + Math.floor(i / 15) * 60} r={24 * on} fill={col} stroke={KC.ink} strokeWidth={4} /> : null; })}
        </>, 20)}
      </Escena>
      {/* 10 · los datos: arena seca vs. nidos inundados */}
      <Escena T={T} a={K.D} b={K.Mu} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg((() => { const u = kprog(T, K.D + 0.6, K.D + 2.4, kEase.sale), ola = kprog(T, K.D + 2.4, K.D + 3.6, kEase.suave), H = 520, B = 1090;
          return <>
            <line x1={120} y1={B} x2={960} y2={B} stroke={KC.ink} strokeWidth={8} />
            <rect x={210} y={B - H * 0.296 * u} width={240} height={H * 0.296 * u} fill={TH.arena} stroke={KC.ink} strokeWidth={7} />
            <rect x={630} y={B - H * 0.997 * u} width={240} height={H * 0.997 * u} fill={TH.mar2} stroke={KC.ink} strokeWidth={7} />
            <text x={330} y={B - H * 0.296 * u - 24} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink} opacity={u}>29.6 %</text>
            <text x={750} y={B - H * 0.997 * u - 24} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink} opacity={u}>99.7 %</text>
            <text x={330} y={B + 44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>arena seca · 13 nidos</text>
            <text x={750} y={B + 44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>inundados · 8 nidos</text>
            {ola > 0 && <path d={`M 600 ${B} ` + Array.from({ length: 9 }, (_, i) => `L ${600 + i * 37.5} ${(B - ola * 120 + Math.sin(i * 0.9 + T * 4) * 10).toFixed(1)}`).join(' ') + ` L 900 ${B} Z`} fill="#1f7fd1" opacity=".55" stroke="#fff" strokeWidth={5} />}
          </>; })(), 20)}
      </Escena>
      {/* 11 · el mundo: seis especies con el hongo; la golfina también anida en Oaxaca */}
      <Escena T={T} a={K.Mu} b={K.Cl} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={20} y={500} width={1040} height={520} rx={30} fill="#bfe9ff" stroke={KC.ink} strokeWidth={6} />
          {CONT.map((poly, i) => <path key={i} d={'M ' + poly.map(([lo, la]) => MP(lo, la).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z'} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
          {SITIOS.map(([lo, la], i) => { const [px, py] = MP(lo, la); const on = kprog(T, K.Mu + 0.5 + i * 0.2, K.Mu + 0.8 + i * 0.2, kEase.rebote);
            return <circle key={i} cx={px} cy={py} r={16 * on} fill={KC.red} stroke={KC.ink} strokeWidth={4} />; })}
          {(() => { const [ox, oy] = MP(...OAXACA), [gx, gy] = MP(-80.8, -1.5), q = kprog(T, K.Mu + 5.0, K.Mu + 6.0, kEase.sale);
            return q > 0 ? <g>
              <path d={`M ${gx} ${gy} Q ${gx - 60} ${gy - 20} ${klerp(gx, ox, q)} ${klerp(gy, oy, q)}`} stroke={KC.ink} strokeWidth={5} strokeDasharray="12 9" fill="none" />
              <circle cx={ox} cy={oy} r={14 * q} fill="#7c8a5a" stroke={KC.ink} strokeWidth={4} />
            </g> : null; })()}
          {ESPECIES.map(([nom, col], i) => { const on = kprog(T, K.Mu + 2.0 + i * 0.3, K.Mu + 2.4 + i * 0.3, kEase.rebote);
            return <g key={i}><TortugaIcono x={115 + i * 170} y={1110} s={0.8} color={col} on={on} />
              <text x={115 + i * 170} y={1185} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={on}>{nom}</text></g>; })}
        </>, 20)}
      </Escena>
      {/* 12 · su temperatura favorita = la del nido */}
      <Escena T={T} a={K.Cl} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <Termometro x={220} y={420} alto={620} max={40} marcas={[20, 25, 30, 35, 40]} valor={klerp(18, 29.7, kprog(T, K.Cl + 0.3, K.Cl + 1.8, kEase.sale))} />
        {fsvg(<>
          <line x1={290} y1={580} x2={klerp(290, 380, kprog(T, K.Cl + 1.6, K.Cl + 2.0))} y2={580} stroke={KC.ink} strokeWidth={6} strokeDasharray="10 8" />
          <g opacity={kprog(T, K.Cl + 2.4, K.Cl + 2.8)}>
            <path d="M 470 820 A 120 90 0 0 0 710 820 Z" fill={TH.arena3} stroke={KC.ink} strokeWidth={6} />
            {[[-50, 20], [0, 26], [50, 20], [-25, 60], [25, 60]].map(([ex, ey], i) => <Huevo key={i} id={`c${i}`} x={590 + ex} y={820 + ey} r={22} />)}
          </g>
        </>, 31)}
      </Escena>
      {/* 13 · cierre: la misma playa y el mismo huevo, ahora con el hongo bajo la arena */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <Playa T={T} ola={kprog(T, K.C + 1.6, K.C + 3.6, kEase.suave) * 0.35} />
        {fsvg(<>
          <ellipse cx={360} cy={1150} rx={170} ry={26} fill="rgba(0,0,0,.18)" />
          <Huevo id="c" x={360} y={1000} r={150} manchas={1} />
          {[[200, 1200, 60, 1290], [360, 1180, 420, 1300], [520, 1150, 700, 1230], [700, 1230, 880, 1190]].map(([x1, y1, x2, y2], i) => { const q = kprog(T, K.C + 0.4 + i * 0.2, K.C + 1.4 + i * 0.2);
            return <line key={i} x1={x1} y1={y1} x2={klerp(x1, x2, q)} y2={klerp(y1, y2, q)} stroke={TH.hifa} strokeWidth={8} strokeLinecap="round" opacity=".9" style={{ filter:'drop-shadow(0 0 3px #000)' }} />; })}
        </>, 20)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.4} until={K.N - 0.3} texto="no se echó a perder: hongo" x={330} y={620} tam={34} borde={KC.red} />
      <Etq T={T} at={K.N + 0.5} until={K.Li - 0.3} x={560} y={470} texto="tortuga boba" tam={34} color={KC.ink} />
      <Etq T={T} at={K.N + 0.8} until={K.Li - 0.3} x={560} y={520} texto="Caretta caretta" it tam={32} color={KC.ink} />
      <NumeroGigante T={T} at={K.N + 0.4} until={K.Li - 0.3} valor={100} dur={1.2} prefijo="≈ " etiqueta="huevos por nido" x={850} y={1000} tam={120} color={KC.yellow} />
      <Etq T={T} at={K.Li + 0.3} until={K.Ar - 0.3} x={60} y={470} texto="carey · Ecuador" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Li + 0.6} until={K.Ar - 0.3} x={60} y={520} texto="Eretmochelys imbricata" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Li + 3.0} until={K.Ar - 0.3} texto="recién puestos, antes de tocar la arena: sin hongo" x={540} y={1180} tam={28} borde="#118a3a" />
      <Chip T={T} at={K.Ar + 0.1} until={K.Ca - 0.3} texto="AL MICROSCOPIO · EN LA ARENA" x={540} y={400} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ar + 0.6} until={K.Ca - 0.3} x={60} y={470} texto="complejo Fusarium solani" it tam={32} color={KC.mint} />
      <Etq T={T} at={K.Ar + 1.4} until={K.Ca - 0.3} x={600} y={460} texto="conidios" lado="izq" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Ar + 2.0} until={K.Ca - 0.3} x={920} y={900} texto="hoja muerta" lado="izq" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Ar + 2.6} until={K.Ca - 0.3} x={60} y={1150} texto="F. falciforme · F. keratoplasticum" it tam={28} color={KC.texto} />
      <Chip T={T} at={K.Ca + 0.1} until={K.M - 0.3} texto="POR DENTRO · LA CÁSCARA" x={540} y={400} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ca + 0.5} until={K.M - 0.3} x={60} y={470} texto="hifas sobre un huevo dañado" tam={28} color={TH.hifa} />
      <Etq T={T} at={K.Ca + 1.0} until={K.M - 0.3} x={60} y={750} texto="capa mineral" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Ca + 1.3} until={K.M - 0.3} x={60} y={910} texto="membrana" tam={28} color={KC.lilac} />
      <Chip T={T} at={K.Ca + 1.8} until={K.M - 0.3} texto="ácidos · enzimas" x={790} y={520} tam={30} borde={KC.yellow} />
      <Etq T={T} at={K.Ca + 3.2} until={K.M - 0.3} x={600} y={1110} texto="adentro" tam={28} color={KC.texto} />
      <Etq T={T} at={K.M + 0.6} until={K.Co - 0.3} x={60} y={470} texto="manchas amarillas y azuladas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Co + 0.4} until={K.P - 0.3} x={60} y={470} texto="de huevo en huevo" tam={34} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.D - 0.3} anio="2011" quien="Boa Vista, Cabo Verde" revista="29 nidos de tortuga boba · PLoS ONE, 2014" x={440} y={580} />
      <Etq T={T} at={K.E + 1.0} until={K.D - 0.3} x={640} y={1000} texto="Boa Vista" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.D + 0.3} until={K.Mu - 0.3} x={60} y={430} texto="huevos que no nacieron" tam={34} color={KC.ink} />
      <Chip T={T} at={K.D + 3.2} until={K.Mu - 0.3} texto="hongo en los huevos: 78 % inundados" x={540} y={500} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.D + 3.6} until={K.Mu - 0.3} texto="vs 21 % arena seca (5 nidos por grupo)" x={540} y={570} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.D + 4.6} until={K.Mu - 0.3} texto="la marea también ahoga los huevos" x={540} y={1180} tam={28} borde={KC.yellow} />
      <Chip T={T} at={K.Mu + 0.3} until={K.Cl - 0.3} texto="2005–2012 · 6 especies · América, África y Australia" x={540} y={440} tam={26} borde={KC.red} />
      <Etq T={T} at={K.Mu + 5.6} until={K.Cl - 0.3} x={MP(...OAXACA)[0] - 20} y={MP(...OAXACA)[1] - 40} texto="Oaxaca: aquí anida la golfina" lado="izq" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Cl + 1.8} until={K.C - 0.3} x={390} y={580} texto="el hongo crece mejor: ≈ 29.7 °C" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cl + 2.6} until={K.C - 0.3} x={720} y={960} texto="nido incubándose" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cl + 3.0} until={K.C - 0.3} texto="su temperatura favorita = la del nido" x={540} y={1180} tam={30} borde={KC.red} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="su peligro: la arena" x={300} y={620} tam={36} borde={KC.red} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={60} y={1350} texto="hifas bajo la arena (esquemático)" tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="4 cm" largo={300} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.N} until={K.Li} texto="20 cm" largo={280} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.Li} until={K.Ar} texto="50 cm" largo={250} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.Ar} until={K.Ca} texto="50 µm" largo={180} y={1450} />
      <BarraEscala T={T} at={K.Ca} until={K.M} texto="100 µm" largo={90} y={1450} />
      <BarraEscala T={T} at={K.M} until={K.Co} texto="4 cm" largo={500} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.Co} until={K.P} texto="4 cm" largo={210} y={1450} />
      <BarraEscala T={T} at={K.E} until={K.D} texto="mapa esquemático" largo={0} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.Mu} until={K.Cl} texto="mapa esquemático" largo={0} color={KC.ink} y={1450} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="4 cm" largo={300} color={KC.ink} y={1450} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No se echó a perder: *lo mató un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Li - 0.1} texto="Entierra *unos cien huevos* y se va." />
      <Subtitulo T={T} idx={2} at={K.Li + 0.1} until={K.Ar - 0.1} texto="Directo de la madre: *sin hongo.*" />
      <Subtitulo T={T} idx={3} at={K.Ar + 0.1} until={K.Ca - 0.1} texto="El hongo vive *en la arena.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.M - 0.1} texto="Deshace la cáscara *y entra.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Co - 0.1} texto="Adentro, *el embrión muere.*" />
      <Subtitulo T={T} idx={6} at={K.Co + 0.1} until={K.P - 0.1} texto="Puede pasar *a los vecinos.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por qué unos nidos *se salvan?*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.D - 0.1} texto="2011, Boa Vista: *29 nidos.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Mu - 0.1} texto="Inundados: *casi ninguno nació.*" />
      <Subtitulo T={T} idx={10} at={K.Mu + 0.1} until={K.Cl - 0.1} texto="Seis especies: *todas con el hongo.*" />
      <Subtitulo T={T} idx={11} at={K.Cl + 0.1} until={K.C - 0.1} texto="Su temperatura favorita: *la del nido.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Su peligro estaba *en la arena.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Li + 0.4, K.Ar - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ca + 0.3, K.M - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.D + 1.6, K.Mu - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Mu + 1.2, K.Cl - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cl + 0.4, K.C - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="132" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TortugaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TortugaShot /></CompositionStage></div>;
}
window.TortugaApp = TortugaApp;
