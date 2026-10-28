// Shot Ambiental #01 · Especial Día de Muertos: las mariposas monarca — NARRADO (N2 "El número" + viaje de ida y vuelta a la misma imagen).
// Guion y fuentes: guion.md. El dibujo es esquemático (mariposas, mapa, árboles y oruga simplificados).
const NARANJA = '#ff8a1f', NARANJA2 = '#f26a0f', OYAMEL = '#1f6b4a', OYAMEL2 = '#16523a';

// Mariposa monarca vista desde arriba: alas naranjas con venas y borde negros y puntos blancos.
// ala: 0..1 apertura (1 = abiertas). Antenas con botoncito. Centro en (0,0), cuerpo de -34 a 40.
function Ala({ arriba = true }) {
  const d = arriba ? 'M 4 -6 C 22 -48 74 -74 104 -60 C 116 -38 96 -10 6 4 Z' : 'M 6 6 C 44 4 82 22 74 54 C 54 76 18 58 4 14 Z';
  const venas = arriba ? ['M 8 -4 L 96 -56', 'M 10 -2 L 100 -36', 'M 12 0 L 88 -16', 'M 30 -26 L 70 -64'] : ['M 8 8 L 70 50', 'M 8 10 L 44 64', 'M 10 8 L 76 30'];
  const puntos = arriba ? [[100, -52], [106, -42], [102, -30], [92, -18], [80, -10], [88, -62]] : [[72, 40], [66, 54], [52, 62], [36, 60], [76, 28]];
  return <g>
    <path d={d} fill={NARANJA} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {venas.map((v, i) => <path key={i} d={v} stroke={KC.ink} strokeWidth={3.2} fill="none" />)}
    {puntos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill="#fff" />)}
  </g>;
}
function Monarca({ x, y, s = 1, rot = 0, ala = 1, o = 1 }) {
  const a = 0.18 + 0.82 * ala;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <g transform={`scale(${a} 1)`}><Ala arriba /><Ala arriba={false} /></g>
    <g transform={`scale(${-a} 1)`}><Ala arriba /><Ala arriba={false} /></g>
    <path d="M -3 -26 Q -14 -60 -26 -78 M 3 -26 Q 14 -60 26 -78" stroke={KC.ink} strokeWidth={3.5} fill="none" />
    <circle cx={-26} cy={-78} r={5} fill={KC.ink} /><circle cx={26} cy={-78} r={5} fill={KC.ink} />
    <ellipse cx={0} cy={6} rx={7} ry={34} fill={KC.ink} />
    <circle cx={0} cy={-28} r={8} fill={KC.ink} />
  </g>;
}
// Hoja seca naranja (lo que "parece" la nube antes de revelarse).
function Hoja({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 -50 C 34 -30 34 30 0 50 C -34 30 -34 -30 0 -50 Z" fill={NARANJA2} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -46 L 0 46 M 0 -10 L 16 -24 M 0 10 L -16 -4" stroke="#8a3b06" strokeWidth={4} fill="none" />
  </g>;
}
// Nube de mariposas: n partículas que se mecen. revela 0 = hojas, 1 = mariposas.
function Nube({ T, n = 46, revela = 1, cx = 540, cy = 760, ancho = 860, alto = 520, s = 0.62, seed = 9, llega = 1 }) {
  const r = krng(seed);
  const ps = Array.from({ length: n }, () => ({ u: r() - 0.5, v: r() - 0.5, f: 0.6 + r() * 0.9, ph: r() * 6.28, rot: r() * 360, k: 0.7 + r() * 0.6 }));
  return <g>{ps.map((p, i) => {
    const x = cx + p.u * ancho + Math.sin(T * p.f + p.ph) * 26, y = cy + p.v * alto + Math.cos(T * p.f * 1.3 + p.ph) * 20 - (1 - llega) * 600;
    const ala = Math.abs(Math.cos(T * 9 * p.f + p.ph));
    return <g key={i}>
      {revela < 1 && <Hoja x={x} y={y} s={s * p.k * 0.8} rot={p.rot + T * 40 * p.f} o={1 - revela} />}
      {revela > 0 && <Monarca x={x} y={y} s={s * p.k} rot={Math.sin(T * p.f + p.ph) * 25} ala={ala} o={revela} />}
    </g>;
  })}</g>;
}
// Oyamel (abeto): pisos de triángulos verdes con tronco.
function Oyamel({ x, y, s = 1, color = OYAMEL }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-10} width={28} height={70} fill="#6b4024" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M 0 ${-300 + k * 70} L ${70 + k * 26} ${-170 + k * 70} L ${-70 - k * 26} ${-170 + k * 70} Z`} fill={k % 2 ? color : OYAMEL2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />)}
  </g>;
}
// Flor de cempasúchil (esquemática).
function Cempa({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2 + x) * 3}) scale(${s})`}>
    <path d="M 0 0 L 0 90" stroke={KC.leaf} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283; return <circle key={i} cx={Math.cos(a) * 26} cy={Math.sin(a) * 26} r={20} fill={i % 2 ? '#ffb000' : NARANJA} stroke={KC.ink} strokeWidth={4} />; })}
    <circle r={20} fill="#ffcf3a" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Bosque de oyameles con cempasúchil al pie.
function Bosque({ T, fondo = KC.cyan }) {
  return <div style={{ position:'absolute', inset:0, background:fondo }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={880} cy={330} r={90} fill={KC.yellow} opacity=".8" />
      {[[90, 1500, 1.5], [330, 1460, 1.25], [560, 1520, 1.6], [800, 1470, 1.3], [1020, 1510, 1.5]].map(([x, y, s], i) => <Oyamel key={i} x={x} y={y} s={s} color={i % 2 ? '#2a8a5c' : OYAMEL} />)}
      <rect x={0} y={1560} width={KW} height={400} fill="#3b7a2a" />
      {Array.from({ length: 9 }, (_, i) => <Cempa key={i} T={T} x={60 + i * 120} y={1600 + (i % 2) * 40} s={0.9} />)}
    </svg>
  </div>;
}
// Papel picado: banderitas de colores con cortes.
function PapelPicado({ T, y = 230 }) {
  const cols = [KC.pink, KC.yellow, KC.cyan, KC.mint, NARANJA, KC.lilac];
  return <svg width={KW} height={420} style={{ position:'absolute', left:0, top:y - 60 }}>
    <path d="M -20 40 Q 540 110 1100 40" stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: 8 }, (_, i) => { const x = 20 + i * 135, yy = 52 + Math.sin((i / 7) * Math.PI) * 30, sw = Math.sin(T * 2 + i) * 4;
      return <g key={i} transform={`translate(${x} ${yy}) rotate(${sw} 60 0)`}>
        <path d="M 0 0 L 120 0 L 120 150 L 105 165 L 90 150 L 75 165 L 60 150 L 45 165 L 30 150 L 15 165 L 0 150 Z" fill={cols[i % 6]} stroke={KC.ink} strokeWidth={4} />
        <circle cx={60} cy={60} r={22} fill="rgba(0,0,0,.35)" /><path d="M 30 110 L 90 110 M 40 30 L 50 40 M 80 30 L 70 40" stroke="rgba(0,0,0,.35)" strokeWidth={8} />
      </g>; })}
  </svg>;
}
function Vela({ x, y, T, s = 1 }) {
  const f = 1 + 0.12 * Math.sin(T * 13 + x);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-120} rx={60} ry={80} fill={KC.yellow} opacity={0.18 * f} />
    <rect x={-28} y={-60} width={56} height={150} rx={8} fill="#fff4dc" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 ${-118 * f} C 22 -90 16 -66 0 -62 C -16 -66 -22 -90 0 ${-118 * f} Z`} fill={NARANJA} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 -96 C 8 -80 6 -70 0 -68 C -6 -70 -8 -80 0 -96 Z" fill={KC.yellow} />
  </g>;
}
// Algodoncillo (Asclepias): tallo con hojas y flores rosadas. vida 0..1 (0 = se secó y desapareció).
function Algodoncillo({ x, y, s = 1, vida = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.2 + 0.8 * vida}>
    <path d="M 0 0 L 0 -300" stroke={mixHex('#9a7a4a', '#3a9a3a', vida)} strokeWidth={10} />
    {[-60, -130, -200].map((yy, i) => <g key={i}>
      <ellipse cx={-48} cy={yy} rx={48} ry={18} fill={mixHex('#b89a5a', KC.leaf, vida)} stroke={KC.ink} strokeWidth={5} transform={`rotate(${-20 + Math.sin(T + i) * 4} 0 ${yy})`} />
      <ellipse cx={48} cy={yy - 20} rx={48} ry={18} fill={mixHex('#b89a5a', KC.leaf, vida)} stroke={KC.ink} strokeWidth={5} transform={`rotate(${20 + Math.sin(T + i) * 4} 0 ${yy - 20})`} />
    </g>)}
    {vida > 0.3 && Array.from({ length: 7 }, (_, i) => <circle key={i} cx={Math.cos(i) * 26} cy={-318 + Math.sin(i * 2) * 16} r={11} fill="#f28ab2" stroke={KC.ink} strokeWidth={3} opacity={vida} />)}
  </g>;
}
// Oruga de monarca: franjas amarillas, negras y blancas. com = mordidas (mueve la cabeza).
function Oruga({ x, y, s = 1, T = 0 }) {
  const seg = 9;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: seg }, (_, i) => { const yy = Math.sin(T * 6 - i * 0.7) * 6; const cols = [KC.yellow, KC.ink, '#fff'];
      return <g key={i}><circle cx={i * 30} cy={yy} r={24} fill={cols[i % 3]} stroke={KC.ink} strokeWidth={4} />
        <rect x={i * 30 - 6} y={yy - 24} width={12} height={48} fill={cols[(i + 1) % 3]} opacity=".85" /></g>; })}
    <circle cx={-26} cy={Math.sin(T * 6) * 6} r={26} fill={KC.ink} />
    <path d={`M -30 ${-22 + Math.sin(T * 6) * 6} q -10 -30 -26 -36 M ${seg * 30 - 10} -18 q 10 -30 26 -34`} stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
// Pájaro esquemático (tipo chara azul). abre 0..1 el pico.
function Pajaro({ x, y, s = 1, abre = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={110} ry={74} fill="#3a7bff" stroke={KC.ink} strokeWidth={7} />
    <path d="M 60 -20 L 150 -60 L 120 10 Z" fill="#2457d6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -20 -10 Q 30 40 90 10" fill="#2457d6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -70 -40 L -110 -100 L -60 -60 Z" fill="#2457d6" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-60} cy={-20} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={-64} cy={-20} r={6} fill={KC.ink} />
    <path d={`M -100 -6 L -160 ${-4 - abre * 26} L -104 6 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <path d={`M -104 8 L -158 ${14 + abre * 26} L -100 18 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Tocon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-60} width={100} height={90} fill="#8a5a34" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-60} rx={50} ry={20} fill="#e9c48c" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-60} rx={28} ry={10} fill="none" stroke="#b07a46" strokeWidth={4} />
  </g>;
}

function Monarcas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Vi: CUES.Viaje, A: CUES.Almas, Bi: CUES.Bisnieta, S: CUES.Sol, P: CUES.Pregunta, Bo: CUES.Bosque, E: CUES.Estudio, An: CUES.Antes, Am: CUES.Amenazas, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const revela = kprog(T, K.G + 2.2, K.G + 3.2, kEase.suave);
  // mapa: Michoacán (-100.3, 19.6) y Edomex (-99.8, 19.4)
  const MAPX = -120, MAPY = 420, MAPW = 1250, sM = MAPW / 1000;
  const pm = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [MAPX + a * sM, MAPY + b * sM]; };
  const [mx, my] = pm(-100.3, 19.6), [ex, ey] = pm(-99.7, 19.35);
  const vuelo = kprog(T, K.Vi + 0.6, K.Vi + 4.4, kEase.suave);
  // generaciones
  const gens = ['sale de México', '2ª generación', '3ª generación', 'tataranieta'];
  // barras de la comparación (propias, en la mitad izquierda: Robert grande a la derecha)
  const g = kprog(T, K.An + 0.5, K.An + 1.6, kEase.sale), g2 = kprog(T, K.An + 1.4, K.An + 2.2, kEase.sale);
  const H = 560, base = 1080;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la nube de "hojas" que son mariposas, sobre el bosque de oyamel */}
      <Escena T={T} a={K.G} b={K.Vi} zoom={0.06}>
        <Bosque T={T} />
        {svg(<Nube T={T} revela={revela} llega={kprog(T, K.G - 0.5, K.G + 1.2, kEase.sale)} />)}
      </Escena>
      {/* 2 · el viaje en el mapa */}
      <Escena T={T} a={K.Vi} b={K.A}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <MapaMexico x={MAPX} y={MAPY} ancho={MAPW} />
          <path d={`M 470 200 C 520 380 ${mx - 40} 600 ${mx} ${my}`} stroke={KC.ink} strokeWidth={10} strokeDasharray="26 18" strokeDashoffset={-T * 60} fill="none" opacity={kprog(T, K.Vi + 0.2, K.Vi + 0.6)} />
          {[0, 1, 2, 3, 4].map((k) => { const u = kclamp(vuelo - k * 0.06, 0, 1); const bx = klerp(470, mx, u) + Math.sin(u * 9 + k) * 30, by = klerp(200, my, u * u * 0.4 + u * 0.6);
            return u > 0 && u < 1 ? <Monarca key={k} x={bx} y={by} s={0.45} rot={160} ala={Math.abs(Math.cos(T * 10 + k))} /> : null; })}
          {[[mx, my], [ex, ey]].map(([x, y], i) => { const on = kprog(T, K.Vi + 3.6 + i * 0.4, K.Vi + 4.0 + i * 0.4, kEase.rebote);
            return <g key={i} transform={`translate(${x} ${y}) scale(${on})`}><circle r={24} fill={NARANJA} stroke={KC.ink} strokeWidth={6} /><circle r={8} fill={KC.ink} /></g>; })}
        </>)}
      </Escena>
      {/* 3 · las almas: papel picado, velas y mariposas */}
      <Escena T={T} a={K.A} b={K.Bi} zoom={0.08}>
        <FondoLunares color={KC.magenta} punto="rgba(255,255,255,.18)" />
        <PapelPicado T={T} y={250} />
        {svg(<>
          {[220, 420, 660, 860].map((x, i) => <Vela key={i} x={x} y={1500} T={T} s={1.1} />)}
          {[0, 1, 2, 3, 4, 5].map((k) => { const t0 = K.A + 0.3 + k * 0.35, u = kprog(T, t0, t0 + 3.5);
            return u > 0 ? <Monarca key={k} x={200 + k * 140 + Math.sin(T * 2 + k) * 40} y={klerp(1350, 700, u)} s={0.7} rot={Math.sin(T * 3 + k) * 20} ala={Math.abs(Math.cos(T * 8 + k))} o={0.9} /> : null; })}
          {Array.from({ length: 6 }, (_, i) => <Cempa key={i} T={T} x={120 + i * 170} y={1640} s={1} />)}
        </>)}
      </Escena>
      {/* 4 · cuatro generaciones: la que viaja es la tataranieta */}
      <Escena T={T} a={K.Bi} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {gens.map((t, i) => { const at = K.Bi + 0.3 + i * 0.7, e = kprog(T, at, at + 0.4, kEase.rebote), x = 150 + i * 260, y = 880 + (i % 2) * 50;
            const vuela = i === 3 ? kprog(T, K.Bi + 3.4, K.S + 0.4, kEase.suave) : 0;
            return <g key={i}>
              {i < 3 && <path d={`M ${x + 70} ${y} L ${x + 175} ${y + (i % 2 ? -40 : 40)}`} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, at + 0.3, at + 0.6)} markerEnd="" />}
              {i < 3 && <path d={`M ${x + 160} ${y + (i % 2 ? -50 : 30)} l 18 12 l -20 8`} stroke={KC.ink} strokeWidth={7} fill="none" opacity={kprog(T, at + 0.3, at + 0.6)} />}
              <g transform={`translate(${vuela * 200} ${-vuela * 700})`}><Monarca x={x} y={y} s={1.0 * e} ala={Math.abs(Math.cos(T * 7 + i))} rot={vuela * -20} /></g>
              <text x={x} y={y + 120} textAnchor="middle" style={{ font:`700 ${i === 3 ? 38 : 30}px ${KF.mono}` }} fill={i === 3 ? KC.ink : '#1d4b3a'} opacity={e * (1 - vuela)}>{t}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 5 · el sol y el reloj de las antenas */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g transform={`translate(230 560) rotate(${T * 20})`}>{Array.from({ length: 12 }, (_, i) => <path key={i} d="M 0 -150 L 18 -110 L -18 -110 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}</g>
          <circle cx={230} cy={560} r={100} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
          <line x1={330} y1={640} x2={500} y2={800} stroke={KC.yellow} strokeWidth={8} strokeDasharray="20 14" strokeDashoffset={-T * 40} />
          <Monarca x={600} y={1000} s={2.3} ala={0.75 + 0.25 * Math.cos(T * 3)} rot={-8} />
        </>)}
        <Lupa T={T} at={K.S + 1.6} until={K.P - 0.1} x={820} y={560} r={150} fx={600 + 26 * 2.3} fy={1000 - 78 * 2.3} tinte={KC.yellow} etiqueta="reloj en las antenas"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><circle cx={r} cy={r} r={r * 0.7} fill="#fff8e0" stroke={KC.yellow} strokeWidth={8} />
            {Array.from({ length: 12 }, (_, i) => <line key={i} x1={r + Math.cos(i * 0.5236) * r * 0.58} y1={r + Math.sin(i * 0.5236) * r * 0.58} x2={r + Math.cos(i * 0.5236) * r * 0.66} y2={r + Math.sin(i * 0.5236) * r * 0.66} stroke={KC.ink} strokeWidth={5} />)}
            <line x1={r} y1={r} x2={r + Math.cos(t * 2) * r * 0.5} y2={r + Math.sin(t * 2) * r * 0.5} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            <line x1={r} y1={r} x2={r + Math.cos(t * 0.4) * r * 0.32} y2={r + Math.sin(t * 0.4) * r * 0.32} stroke={KC.red} strokeWidth={10} strokeLinecap="round" /></svg>} />
      </Escena>
      {/* 6 · ¿cuántas llegan? */}
      <Escena T={T} a={K.P} b={K.Bo} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>
          <Nube T={T} n={14} cx={300} cy={600} ancho={500} alto={300} s={0.5} seed={4} />
        </>)}
      </Escena>
      {/* 7 · se mide el bosque que cubren */}
      <Escena T={T} a={K.Bo} b={K.E}>
        <Bosque T={T} fondo="#7fd8ff" />
        {svg(<>
          <Nube T={T} n={90} cx={540} cy={1180} ancho={900} alto={420} s={0.42} seed={12} />
          <rect x={80} y={900} width={920} height={560} rx={20} fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="34 20" strokeDashoffset={-T * 50} opacity={kprog(T, K.Bo + 1.2, K.Bo + 1.8)} />
        </>)}
      </Escena>
      {/* 8 · 2.93 hectáreas: cuadritos de una hectárea */}
      <Escena T={T} a={K.E} b={K.An} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {[0, 1, 2].map((i) => { const at = K.E + 1.5 + i * 0.5, e = kprog(T, at, at + 0.4, kEase.rebote), lleno = i < 2 ? 1 : 0.93;
            return <g key={i} transform={`translate(${120 + i * 290} 1430) scale(${e})`}>
              <rect x={0} y={0} width={250} height={250} fill="#fff" stroke={KC.ink} strokeWidth={7} />
              <rect x={0} y={250 * (1 - lleno)} width={250} height={250 * lleno} fill={NARANJA} stroke={KC.ink} strokeWidth={7} />
              <text x={125} y={150} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>{i < 2 ? '1 ha' : '0.93'}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 9 · 1996–97 contra 2025–26 */}
      <Escena T={T} a={K.An} b={K.Am}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {[[150, 18.19, '1996–97', NARANJA, g], [380, 2.93, '2025–26', KC.coral, g2]].map(([x, v, et, c, gg], i) => { const h = H * (v / 18.19) * gg;
            return <g key={i}>
              <rect x={x - 90} y={base - h} width={180} height={h} rx={14} fill={c} stroke={KC.ink} strokeWidth={8} />
              <text x={x} y={base - h - 24} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink} opacity={gg}>{kformato(v * gg, 2)} ha</text>
              <text x={x} y={base + 60} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{et}</text>
            </g>; })}
          {Array.from({ length: 10 }, (_, i) => <Monarca key={i} x={100 + (i % 2) * 100} y={base - 60 - i * 58} s={0.32 * g} ala={Math.abs(Math.cos(T * 8 + i))} />)}
        </>)}
      </Escena>
      {/* 10 · amenazas: tala, algodoncillo que desaparece, clima extremo */}
      <Escena T={T} a={K.Am} b={K.D}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          {[0, 1, 2].map((i) => <rect key={i} x={40 + i * 340} y={560} width={320} height={520} rx={26} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} opacity={kprog(T, K.Am + 0.2 + i * 1.4, K.Am + 0.6 + i * 1.4)} />)}
          <g opacity={kprog(T, K.Am + 0.2, K.Am + 0.6)}>
            <Oyamel x={200} y={900} s={0.6 * (1 - kprog(T, K.Am + 0.9, K.Am + 1.3))} />
            <Tocon x={200} y={960} s={kprog(T, K.Am + 0.9, K.Am + 1.3, kEase.rebote)} />
            <Tocon x={110} y={990} s={0.6 * kprog(T, K.Am + 1.1, K.Am + 1.5, kEase.rebote)} />
          </g>
          <g opacity={kprog(T, K.Am + 1.6, K.Am + 2.0)}><Algodoncillo x={540} y={960} s={0.85} T={T} vida={1 - kprog(T, K.Am + 2.4, K.Am + 3.8)} /></g>
          <g opacity={kprog(T, K.Am + 3.0, K.Am + 3.4)} transform={`translate(880 880)`}>
            <circle r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} transform="translate(-40 -60)" />
            <g transform={`translate(40 80) rotate(${T * 30})`}>{[0, 60, 120].map((a) => <path key={a} d="M 0 -80 L 0 80 M -14 -60 L 0 -46 L 14 -60 M -14 60 L 0 46 L 14 60" stroke="#e8f7ff" strokeWidth={12} strokeLinecap="round" transform={`rotate(${a})`} />)}
              {[0, 60, 120].map((a) => <path key={'b' + a} d="M 0 -80 L 0 80" stroke={KC.ink} strokeWidth={3} transform={`rotate(${a})`} />)}</g>
          </g>
          {['tala ilegal', 'algodoncillo', 'clima extremo'].map((t, i) => <text key={'t' + i} x={200 + i * 340} y={1040} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Am + 0.5 + i * 1.4, K.Am + 0.9 + i * 1.4)}>{t}</text>)}
        </>)}
      </Escena>
      {/* 11 · la oruga, el algodoncillo y el pájaro que la escupe */}
      <Escena T={T} a={K.D} b={K.C}>
        <FondoLunares color={KC.leaf} punto="rgba(255,255,255,.2)" />
        {svg(<>
          <Algodoncillo x={330} y={1180} s={1.6} T={T} />
          {(() => { const pico = kprog(T, K.D + 2.6, K.D + 3.2, kEase.suave), escupe = kprog(T, K.D + 4.0, K.D + 4.8, kEase.sale);
            const ox = klerp(klerp(420, 640, pico), 1000, escupe), oy = klerp(klerp(860, 760, pico), 1500, escupe * escupe);
            return <>
              <Oruga x={ox} y={oy} s={0.9} T={T} />
              <Pajaro x={klerp(1300, 830, kprog(T, K.D + 1.8, K.D + 2.6, kEase.sale))} y={720} s={1.1} abre={pico > 0 && escupe < 1 ? (escupe > 0 ? 1 : 0.2) : 0} rot={escupe * 10} />
              {escupe > 0 && <g opacity={1 - kprog(T, K.D + 5.6, K.D + 6.2)}><text x={720} y={560} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} transform={`rotate(-6 720 560)`}>¡PUAJ!</text></g>}
            </>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma nube sobre el bosque */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <Bosque T={T} />
        {svg(<Nube T={T} revela={kprog(T, K.C + 0.6, K.C + 1.6, kEase.suave)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Vi - 0.3} texto="Especial Día de Muertos" x={330} y={1440} tam={38} borde={NARANJA} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.2} x={60} y={1090} texto="¿hojas secas?" tam={40} />
      <Etq T={T} at={K.G + 3.0} until={K.Vi - 0.3} x={60} y={1090} texto="mariposas monarca" tam={42} color={KC.yellow} />
      <Etq T={T} at={K.G + 3.4} until={K.Vi - 0.3} x={60} y={1150} texto="Danaus plexippus" it tam={34} />
      <Chip T={T} at={K.Vi + 0.3} until={K.A - 0.3} texto="Canadá y EUA" x={470} y={170 + 0} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Vi + 3.9} until={K.A - 0.3} texto="Michoacán y Edomex: bosques de oyamel" x={540} y={1460} tam={34} borde={NARANJA} />
      <Chip T={T} at={K.A + 0.6} until={K.Bi - 0.3} texto="creencia: traen a los difuntos" y={800} tam={38} borde={NARANJA} />
      <Chip T={T} at={K.Bi + 0.2} until={K.S - 0.3} texto="ninguna conoce el camino" y={560} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.4} until={K.S + 1.5} texto="brújula de sol" x={700} y={420} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Bo + 1.4} until={K.E - 0.3} texto="se mide el bosque que cubren" y={820} tam={40} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.E + 0.3} until={K.An - 0.3} valor={2.93} dec={2} dur={1.2} sufijo=" ha" etiqueta="invierno 2025–2026 · WWF y CONANP" y={900} tam={210} />
      <Chip T={T} at={K.E + 2.6} until={K.An - 0.3} texto="+64 % que el año anterior" y={1140} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.An + 2.4} until={K.Am - 0.3} texto="6 veces más" x={385} y={720} tam={46} borde={KC.red} />
      <Etq T={T} at={K.D + 0.6} until={K.D + 2.6} x={560} y={1010} texto="solo come algodoncillo" tam={34} />
      <Chip T={T} at={K.D + 3.4} until={K.C - 0.3} texto="el veneno de la planta = amarga" y={1460} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="una visita que hay que cuidar" x={380} y={470} tam={36} borde={NARANJA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Vi - 0.1} texto="No son hojas: *son mariposas monarca.*" />
      <Subtitulo T={T} idx={1} at={K.Vi + 0.1} until={K.A - 0.1} texto="De Canadá y EUA *a los oyameles de México.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Bi - 0.1} texto="Dicen que traen *las almas.*" />
      <Subtitulo T={T} idx={3} at={K.Bi + 0.1} until={K.S - 0.1} texto="Viaja *la tataranieta.*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="El Sol y un *reloj en las antenas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Bo - 0.1} texto="¿Y *cuántas llegan?*" />
      <Subtitulo T={T} idx={6} at={K.Bo + 0.1} until={K.E - 0.1} texto="Se mide *el bosque que cubren.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.An - 0.1} texto="2025–2026: *2.93 hectáreas.*" />
      <Subtitulo T={T} idx={8} at={K.An + 0.1} until={K.Am - 0.1} texto="1996–1997: *más de 18 hectáreas.*" />
      <Subtitulo T={T} idx={9} at={K.Am + 0.1} until={K.D - 0.1} texto="Tala, algodoncillo *y clima extremo.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.C - 0.1} texto="Comen algodoncillo: *saben amargas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No son hojas: *es una visita que cuidar.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Viaje + 1.0, CUES.Viaje + 4.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Almas + 0.3, CUES.Bisnieta + 1.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta - 0.05, CUES.Bosque + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 0.4, CUES.Antes - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Antes + 0.4, CUES.Amenazas + 0.5, 'avatar_10_serio_molesto', 'grande'],
        [CUES.Dato + 0.8, CUES.Dato + 5.0, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MonarcasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Monarcas /></CompositionStage></div>;
}
window.MonarcasApp = MonarcasApp;
