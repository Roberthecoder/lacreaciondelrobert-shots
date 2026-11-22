// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Festivo #01 · Día de Muertos · Ambiental: las mariposas monarca — NARRADO (N2 "El número" + viaje de ida y vuelta a la misma imagen).
// Guion y fuentes: guion.md. El dibujo es esquemático (mariposas, mapa, árboles y oruga simplificados).
const NEGRO = '#0b1020', NARANJA = '#ff8a1f', NARANJA2 = '#f26a0f', OYAMEL = '#1f6b4a', OYAMEL2 = '#16523a';

// Mariposa monarca vista desde arriba: alas naranjas con venas y borde negros y puntos blancos.
// ala: 0..1 apertura (1 = abiertas). Antenas con botoncito. Centro en (0,0), cuerpo de -34 a 40.
function Ala({ arriba = true }) {
  const d = arriba ? 'M 4 -6 C 22 -48 74 -74 104 -60 C 116 -38 96 -10 6 4 Z' : 'M 6 6 C 44 4 82 22 74 54 C 54 76 18 58 4 14 Z';
  const venas = arriba ? ['M 8 -4 L 96 -56', 'M 10 -2 L 100 -36', 'M 12 0 L 88 -16', 'M 30 -26 L 70 -64'] : ['M 8 8 L 70 50', 'M 8 10 L 44 64', 'M 10 8 L 76 30'];
  const puntos = arriba ? [[100, -52], [106, -42], [102, -30], [92, -18], [80, -10], [88, -62]] : [[72, 40], [66, 54], [52, 62], [36, 60], [76, 28]];
  return <g>
    <path d={d} fill="none" stroke="#ffb872" strokeWidth={12} strokeLinejoin="round" />
    <path d={d} fill={NARANJA} stroke={NEGRO} strokeWidth={9} strokeLinejoin="round" />
    {venas.map((v, i) => <path key={i} d={v} stroke={NEGRO} strokeWidth={3.2} fill="none" />)}
    {puntos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill="#fff" />)}
  </g>;
}
function Monarca({ x, y, s = 1, rot = 0, ala = 1, o = 1 }) {
  const a = 0.18 + 0.82 * ala;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <g transform={`scale(${a} 1)`}><Ala arriba /><Ala arriba={false} /></g>
    <g transform={`scale(${-a} 1)`}><Ala arriba /><Ala arriba={false} /></g>
    <path d="M -3 -26 Q -14 -60 -26 -78 M 3 -26 Q 14 -60 26 -78" stroke="#ffb872" strokeWidth={3.5} fill="none" />
    <circle cx={-26} cy={-78} r={5} fill="#ffb872" /><circle cx={26} cy={-78} r={5} fill="#ffb872" />
    <ellipse cx={0} cy={6} rx={7} ry={34} fill={NEGRO} stroke="#ffb872" strokeWidth={1.5} />
    <circle cx={0} cy={-28} r={8} fill={NEGRO} stroke="#ffb872" strokeWidth={1.5} />
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
function Nube({ T, n = 46, revela = 1, cx = 540, cy = 730, ancho = 900, alto = 840, s = 0.95, seed = 9, llega = 1 }) {
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
function Oyamel({ x, y, s = 1, color = OYAMEL, linea = '#8fd9b0' }) {
  if (s < 0.02) return null;
  const tr = Math.min(6, 4.5 / s);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-10} width={28} height={70} fill="#6b4024" stroke={linea} strokeWidth={tr} />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M 0 ${-300 + k * 70} L ${70 + k * 26} ${-170 + k * 70} L ${-70 - k * 26} ${-170 + k * 70} Z`} fill={k % 2 ? color : OYAMEL2} stroke={linea} strokeWidth={tr} strokeLinejoin="round" />)}
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
function Bosque({ T, fondo = KC.cyan, atenua = 0 }) {
  const cielo = mixHex(fondo, '#0a0f1c', 0.74);
  return <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, #070c18 0%, ${cielo} 62%, #0d2a22 100%)` }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={880} cy={300} r={90} fill={KC.yellow} opacity=".6" />
      <g opacity=".55">{[[-30, 1370, 2.5], [250, 1340, 2.25], [540, 1380, 2.6], [830, 1340, 2.25], [1110, 1370, 2.5]].map(([x, y, s], i) => <Oyamel key={i} x={x} y={y} s={s} color="#1c6146" />)}</g>
      {[[110, 1575, 2.45], [400, 1555, 2.15], [690, 1585, 2.55], [985, 1555, 2.25]].map(([x, y, s], i) => <Oyamel key={i} x={x} y={y} s={s} color={i % 2 ? '#2a8a5c' : OYAMEL} />)}
      <rect x={0} y={1590} width={KW} height={400} fill="#10261a" />
      {Array.from({ length: 8 }, (_, i) => <Cempa key={i} T={T} x={70 + i * 135} y={1640 + (i % 2) * 40} s={1.25} />)}
    </svg>
    {atenua > 0 && <div style={{ position:'absolute', inset:0, background:`rgba(8,12,22,${atenua})` }}></div>}
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
  const tr = Math.min(5, 5.5 / s);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.5 + 0.5 * vida}>
    <path d="M 0 0 L 0 -300" stroke={mixHex('#9a7a4a', '#3a9a3a', vida)} strokeWidth={10} />
    {[-60, -130, -200].map((yy, i) => <g key={i}>
      <ellipse cx={-48} cy={yy} rx={48} ry={18} fill={mixHex('#b89a5a', KC.leaf, vida)} stroke={KC.ink} strokeWidth={tr} transform={`rotate(${-20 + Math.sin(T + i) * 4} 0 ${yy})`} />
      <ellipse cx={48} cy={yy - 20} rx={48} ry={18} fill={mixHex('#b89a5a', KC.leaf, vida)} stroke={KC.ink} strokeWidth={tr} transform={`rotate(${20 + Math.sin(T + i) * 4} 0 ${yy - 20})`} />
    </g>)}
    {vida > 0.3 && Array.from({ length: 7 }, (_, i) => <circle key={i} cx={Math.cos(i) * 26} cy={-318 + Math.sin(i * 2) * 16} r={11} fill="#f28ab2" stroke={KC.ink} strokeWidth={3} opacity={vida} />)}
  </g>;
}
// Oruga de monarca: franjas amarillas, negras y blancas. com = mordidas (mueve la cabeza).
function Oruga({ x, y, s = 1, T = 0 }) {
  const seg = 9;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: seg }, (_, i) => { const yy = Math.sin(T * 6 - i * 0.7) * 6; const cols = [KC.yellow, NEGRO, '#fff'];
      return <g key={i}><circle cx={i * 30} cy={yy} r={24} fill={cols[i % 3]} stroke={KC.ink} strokeWidth={2.5} />
        <rect x={i * 30 - 6} y={yy - 24} width={12} height={48} fill={cols[(i + 1) % 3]} opacity=".85" /></g>; })}
    <circle cx={-26} cy={Math.sin(T * 6) * 6} r={26} fill={NEGRO} stroke={KC.ink} strokeWidth={2.5} />
    <path d={`M -30 ${-22 + Math.sin(T * 6) * 6} q -10 -30 -26 -36 M ${seg * 30 - 10} -18 q 10 -30 26 -34`} stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
// Pájaro esquemático (tipo chara azul). abre 0..1 el pico.
function Pajaro({ x, y, s = 1, abre = 0, rot = 0 }) {
  const k = Math.min(1, 1.1 / s);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={110} ry={74} fill="#3a7bff" stroke={KC.ink} strokeWidth={7 * k} />
    <path d="M 60 -20 L 150 -60 L 120 10 Z" fill="#2457d6" stroke={KC.ink} strokeWidth={6 * k} />
    <path d="M -20 -10 Q 30 40 90 10" fill="#2457d6" stroke={KC.ink} strokeWidth={6 * k} />
    <path d="M -70 -40 L -110 -100 L -60 -60 Z" fill="#2457d6" stroke={KC.ink} strokeWidth={6 * k} />
    <circle cx={-60} cy={-20} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4 * k} /><circle cx={-64} cy={-20} r={6} fill={NEGRO} />
    <path d={`M -100 -6 L -160 ${-4 - abre * 26} L -104 6 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5 * k} />
    <path d={`M -104 8 L -158 ${14 + abre * 26} L -100 18 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5 * k} />
  </g>;
}
function Tocon({ x, y, s = 1 }) {
  if (s < 0.02) return null;
  const k = Math.min(1, 1.2 / s);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-60} width={100} height={90} fill="#8a5a34" stroke={KC.ink} strokeWidth={7 * k} />
    <ellipse cx={0} cy={-60} rx={50} ry={20} fill="#e9c48c" stroke={KC.ink} strokeWidth={7 * k} />
    <ellipse cx={0} cy={-60} rx={28} ry={10} fill="none" stroke="#b07a46" strokeWidth={4 * k} />
  </g>;
}

function Monarcas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Vi: CUES.Viaje, A: CUES.Almas, Bi: CUES.Bisnieta, S: CUES.Sol, P: CUES.Pregunta, Bo: CUES.Bosque, E: CUES.Estudio, An: CUES.Antes, Am: CUES.Amenazas, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const revela = kprog(T, K.G + 2.2, K.G + 3.2, kEase.suave);
  // mapa: Michoacán (-100.3, 19.6) y Edomex (-99.8, 19.4)
  const MAPX = -120, MAPY = 500, MAPW = 1250, sM = MAPW / 1000;
  const pm = (lon, lat) => { const [a, b] = mxProy(lon, lat); return [MAPX + a * sM, MAPY + b * sM]; };
  const [mx, my] = pm(-100.3, 19.6), [ex, ey] = pm(-99.7, 19.35);
  const vuelo = kprog(T, K.Vi + 0.6, K.Vi + 4.4, kEase.suave);
  // generaciones
  const gens = ['sale de México', 'hija', 'nieta', 'bisnieta', 'tataranieta'];
  // barras de la comparación (propias, en la mitad izquierda: Robert grande a la derecha)
  // la barra de este invierno (2.93, ya dicha en la escena anterior) está desde que empieza la escena; la de 1996–97 crece a su lado
  const g = kprog(T, K.An + 0.2, K.An + 1.5, kEase.sale), g2 = kprog(T, K.An - 0.4, K.An + 0.3, kEase.sale);
  const H = 860, base = 1390;
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
          <path d={`M 470 300 C 520 460 ${mx - 40} 680 ${mx} ${my}`} stroke={KC.ink} strokeWidth={10} strokeDasharray="26 18" strokeDashoffset={-T * 60} fill="none" opacity={kprog(T, K.Vi + 0.2, K.Vi + 0.6)} />
          {[0, 1, 2, 3, 4].map((k) => { const u = kclamp(vuelo * 1.2 - k * 0.09, 0, 1); const bx = klerp(470, mx, u) + Math.sin(u * 9 + k) * 30, by = klerp(300, my, u * u * 0.4 + u * 0.6);
            return u > 0 && u < 1 ? <Monarca key={k} x={bx} y={by} s={0.8} rot={160} ala={Math.abs(Math.cos(T * 10 + k))} /> : null; })}
          {[[mx, my], [ex, ey]].map(([x, y], i) => { const on = kprog(T, K.Vi + 3.6 + i * 0.4, K.Vi + 4.0 + i * 0.4, kEase.rebote);
            return <g key={i} transform={`translate(${x} ${y}) scale(${on})`}><circle r={30} fill={NARANJA} stroke={KC.ink} strokeWidth={5} /><circle r={10} fill={NEGRO} /></g>; })}
        </>)}
      </Escena>
      {/* 3 · las almas: papel picado, velas y mariposas */}
      <Escena T={T} a={K.A} b={K.Bi} zoom={0.08}>
        <FondoLunares color={KC.magenta} punto="rgba(255,255,255,.18)" />
        <PapelPicado T={T} y={250} />
        {svg(<>
          {[170, 420, 660, 910].map((x, i) => <Vela key={i} x={x} y={1330} T={T} s={1.8} />)}
          {[0, 1, 2, 3, 4, 5].map((k) => { const t0 = K.A - 0.8 + k * 0.15, u = kprog(T, t0, t0 + 4.2);
            return <Monarca key={k} x={150 + k * 156 + Math.sin(T * 2 + k) * 40} y={klerp(1160, 700, u) + (k % 2) * 110} s={1.15} rot={Math.sin(T * 3 + k) * 20} ala={Math.abs(Math.cos(T * 8 + k))} o={0.95} />; })}
          {Array.from({ length: 6 }, (_, i) => <Cempa key={i} T={T} x={100 + i * 176} y={1565} s={1.3} />)}
        </>)}
      </Escena>
      {/* 4 · cinco generaciones: la que viaja es la tataranieta */}
      <Escena T={T} a={K.Bi} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {gens.map((t, i) => { const at = K.Bi + 0.3 + i * 0.55, e = kprog(T, at, at + 0.4, kEase.rebote), e1 = Math.min(1, e);
            const P = (j) => [215 + j * 165, j % 2 ? 1160 : 760], [x, y] = P(i);
            const vuela = i === 4 ? kprog(T, K.Bi + 3.4, K.S + 0.4, kEase.suave) : 0;
            // flecha a la siguiente generación (entre las dos mariposas, sin tocarlas)
            let flecha = null;
            if (i < 4) { const [nx, ny] = P(i + 1), d = Math.hypot(nx - x, ny - y), ux = (nx - x) / d, uy = (ny - y) / d;
              const ax = x + ux * 165, ay = y + uy * 165, bx = nx - ux * 165, by = ny - uy * 165, an = Math.atan2(uy, ux);
              flecha = <g opacity={kprog(T, at + 0.3, at + 0.6)} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" fill="none">
                <path d={`M ${ax} ${ay} L ${bx} ${by}`} />
                <path d={`M ${bx - Math.cos(an - 0.5) * 34} ${by - Math.sin(an - 0.5) * 34} L ${bx} ${by} L ${bx - Math.cos(an + 0.5) * 34} ${by - Math.sin(an + 0.5) * 34}`} />
              </g>; }
            return <g key={i}>
              {flecha}
              <g transform={`translate(${vuela * 200} ${-vuela * 900})`}><Monarca x={x} y={y} s={1.25 * (0.82 + 0.18 * e)} ala={Math.abs(Math.cos(T * 7 + i))} rot={vuela * -20} o={0.3 + 0.7 * e1} /></g>
              <text x={x} y={i % 2 ? y + 165 : y - 135} textAnchor="middle" style={{ font:`700 ${i >= 3 ? 40 : 34}px ${KF.mono}` }} fill={KC.ink} opacity={e1 * (1 - vuela)}>{t}</text>
            </g>; })}
        </>)}
        <Chip T={T} at={K.Bi + 2.8} until={K.S - 0.2} texto="cuántas generaciones: depende del clima y la latitud" y={1450} borde={KC.gold} tam={34} />
      </Escena>
      {/* 5 · el sol y el reloj de las antenas */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g transform={`translate(230 500) rotate(${T * 20})`}>{Array.from({ length: 12 }, (_, i) => <path key={i} d="M 0 -150 L 18 -110 L -18 -110 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 30})`} />)}</g>
          <circle cx={230} cy={500} r={100} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
          <line x1={320} y1={590} x2={470} y2={880} stroke={KC.yellow} strokeWidth={8} strokeDasharray="20 14" strokeDashoffset={-T * 40} />
          <Monarca x={560} y={1110} s={3.4} ala={0.75 + 0.25 * Math.cos(T * 3)} rot={0} />
        </>)}
        <Lupa T={T} at={K.S + 1.6} until={K.P - 0.1} x={810} y={500} r={185} fx={560 + 26 * 3.4 * 0.75} fy={1110 - 78 * 3.4} tinte={KC.yellow} etiqueta="reloj en las antenas"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><circle cx={r} cy={r} r={r * 0.7} fill="#fff8e0" stroke={KC.yellow} strokeWidth={8} />
            {Array.from({ length: 12 }, (_, i) => <line key={i} x1={r + Math.cos(i * 0.5236) * r * 0.58} y1={r + Math.sin(i * 0.5236) * r * 0.58} x2={r + Math.cos(i * 0.5236) * r * 0.66} y2={r + Math.sin(i * 0.5236) * r * 0.66} stroke={KC.ink} strokeWidth={5} />)}
            <line x1={r} y1={r} x2={r + Math.cos(t * 2) * r * 0.5} y2={r + Math.sin(t * 2) * r * 0.5} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            <line x1={r} y1={r} x2={r + Math.cos(t * 0.4) * r * 0.32} y2={r + Math.sin(t * 0.4) * r * 0.32} stroke={KC.red} strokeWidth={10} strokeLinecap="round" /></svg>} />
      </Escena>
      {/* 6 · ¿cuántas llegan? */}
      <Escena T={T} a={K.P} b={K.Bo} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <text x={470} y={760} textAnchor="middle" style={{ font:`400 420px ${KF.titulo}` }} fill={KC.yellow} stroke={NEGRO} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 470 620)`}>?</text>
          <Nube T={T} n={14} cx={540} cy={1500} ancho={900} alto={240} s={0.5} seed={4} />
        </>)}
      </Escena>
      {/* 7 · se mide el bosque que cubren */}
      <Escena T={T} a={K.Bo} b={K.E}>
        <Bosque T={T} fondo="#7fd8ff" />
        {svg(<>
          <Nube T={T} n={90} cx={540} cy={1010} ancho={880} alto={740} s={0.5} seed={12} />
          <rect x={50} y={590} width={980} height={850} rx={20} fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="34 20" strokeDashoffset={-T * 50} opacity={kprog(T, K.Bo + 1.2, K.Bo + 1.8)} />
        </>)}
      </Escena>
      {/* 8 · 2.93 hectáreas: cuadritos de una hectárea */}
      <Escena T={T} a={K.E} b={K.An} zoom={0.03}>
        <Bosque T={T} fondo="#7fd8ff" atenua={0.68} />
        {svg(<>
          {/* cada cuadro es una hectárea de bosque; se llena de mariposas (la tercera, al 93 %) */}
          {[0, 1, 2].map((i) => { const at = K.E + 1.5 + i * 0.5, e = Math.min(1, kprog(T, at, at + 0.5, kEase.sale)), lleno = i < 2 ? 1 : 0.93, L = 310;
            return <g key={i} transform={`translate(${45 + i * 340} 940)`} opacity={kprog(T, K.E - 0.3, K.E + 0.3)}>
              <rect x={0} y={0} width={L} height={L} rx={8} fill="#0f2a1f" stroke={KC.ink} strokeWidth={5} />
              <rect x={0} y={L * (1 - lleno * e)} width={L} height={L * lleno * e} fill={NARANJA} opacity=".38" />
              {e > 0 && <line x1={0} y1={L * (1 - lleno * e)} x2={L} y2={L * (1 - lleno * e)} stroke={NARANJA} strokeWidth={5} />}
              {[0, 1, 2].map((r) => [0, 1, 2].map((c) => { const my = L - L * lleno * ((r + 0.5) / 3), on = kprog(e, (r + 0.2) / 3.4, (r + 1) / 3.4);
                return on > 0 ? <Monarca key={r * 3 + c} x={55 + c * 100 + (r % 2) * 8} y={my} s={0.38 * on} rot={(c - 1) * 14 + r * 9} ala={Math.abs(Math.cos(T * 7 + r * 2 + c + i))} /> : null; }))}
              <text x={L / 2} y={L + 78} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={e}>{i < 2 ? '1 ha' : '0.93'}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 9 · 1996–97 contra 2025–26 */}
      <Escena T={T} a={K.An} b={K.Am}>
        <Bosque T={T} fondo="#7fd8ff" atenua={0.74} />
        {svg(<>
          {[[310, 18.19, '1996–97', NARANJA, g], [770, 2.93, '2025–26', KC.coral, g2]].map(([x, v, et, c, gg], i) => { const h = H * (v / 18.19) * gg;
            return <g key={i}>
              <rect x={x - 150} y={base - h} width={300} height={h} rx={16} fill={c} stroke={KC.ink} strokeWidth={5} />
              <text x={x} y={base - h - 28} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.ink} opacity={gg}>{kformato(v * gg, 2)} ha</text>
              <text x={x} y={base + 74} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>{et}</text>
            </g>; })}
          {Array.from({ length: 10 }, (_, i) => <Monarca key={i} x={310 + (i % 2 ? 68 : -68)} y={base - 80 - i * 78} s={0.52 * kclamp((g * H - (60 + i * 78)) / 60, 0, 1)} ala={Math.abs(Math.cos(T * 8 + i))} />)}
        </>)}
      </Escena>
      {/* 10 · amenazas: tala, algodoncillo que desaparece, clima extremo */}
      <Escena T={T} a={K.Am} b={K.D}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          {(() => { const on = (i) => 0.3 + 0.7 * kprog(T, K.Am + 0.2 + i * 1.4, K.Am + 0.6 + i * 1.4), tala = kprog(T, K.Am + 0.9, K.Am + 1.3);
            return <>
              {/* tala: el oyamel grande queda en tocón */}
              <g opacity={on(0)}>
                <Oyamel x={280} y={1250} s={1.9 * (1 - tala)} />
                <Tocon x={290} y={1270} s={3.3 * kprog(T, K.Am + 0.9, K.Am + 1.3, kEase.rebote)} />
                <Tocon x={95} y={1340} s={1.9 * kprog(T, K.Am + 1.1, K.Am + 1.5, kEase.rebote)} />
              </g>
              {/* el algodoncillo se seca */}
              <g opacity={on(1)}><Algodoncillo x={770} y={1320} s={1.9} T={T} vida={1 - kprog(T, K.Am + 2.4, K.Am + 3.8)} /></g>
              {/* clima extremo: sol y helada */}
              <g opacity={on(2)} transform="translate(590 500) scale(1.7)">
                <circle r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} transform="translate(-40 -60)" />
                <g transform={`translate(40 80) rotate(${T * 30})`}>{[0, 60, 120].map((a) => <path key={a} d="M 0 -80 L 0 80 M -14 -60 L 0 -46 L 14 -60 M -14 60 L 0 46 L 14 60" stroke="#e8f7ff" strokeWidth={10} strokeLinecap="round" transform={`rotate(${a})`} />)}</g>
              </g>
            </>; })()}
          {[['tala ilegal', 280, 1420], ['algodoncillo', 770, 1420], ['clima extremo', 590, 850]].map(([t, x, y], i) => <text key={'t' + i} x={x} y={y} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Am + 0.5 + i * 1.4, K.Am + 0.9 + i * 1.4)}>{t}</text>)}
        </>)}
      </Escena>
      {/* 11 · la oruga, el algodoncillo y el pájaro que la escupe */}
      <Escena T={T} a={K.D} b={K.C}>
        <FondoLunares color={KC.leaf} punto="rgba(255,255,255,.2)" />
        {svg(<>
          <Algodoncillo x={300} y={1340} s={2.2} T={T} />
          {(() => { const pico = kprog(T, K.D + 2.6, K.D + 3.2, kEase.suave), escupe = kprog(T, K.D + 4.0, K.D + 4.8, kEase.sale);
            const ox = klerp(klerp(425, 550, pico), 1010, escupe), oy = klerp(klerp(900, 790, pico), 1560, escupe * escupe);
            // el pájaro ya asoma por la derecha desde que empieza la escena y luego entra a picar
            const px = klerp(klerp(1420, 1075, kprog(T, K.D - 0.3, K.D + 0.5, kEase.sale)), 800, kprog(T, K.D + 1.8, K.D + 2.6, kEase.sale));
            return <>
              <Oruga x={ox} y={oy} s={1.25} T={T} />
              <Pajaro x={px} y={730} s={1.45} abre={pico > 0 && escupe < 1 ? (escupe > 0 ? 1 : 0.2) : 0} rot={escupe * 10} />
              {escupe > 0 && <g opacity={1 - kprog(T, K.D + 5.6, K.D + 6.2)}><text x={700} y={450} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.yellow} stroke={NEGRO} strokeWidth={8} transform={`rotate(-6 700 450)`}>¡PUAJ!</text></g>}
            </>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma nube sobre el bosque */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <Bosque T={T} />
        {svg(<Nube T={T} revela={kprog(T, K.C + 0.6, K.C + 1.6, kEase.suave)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Vi - 0.3} texto="Especial Día de Muertos" x={330} y={1460} tam={38} borde={NARANJA} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.2} x={60} y={1255} texto="¿hojas secas?" tam={44} />
      <Etq T={T} at={K.G + 3.0} until={K.Vi - 0.3} x={60} y={1255} texto="mariposas monarca" tam={46} color={KC.yellow} />
      <Etq T={T} at={K.G + 3.4} until={K.Vi - 0.3} x={60} y={1320} texto="Danaus plexippus" it tam={36} />
      <Chip T={T} at={K.Vi + 0.3} until={K.A - 0.3} texto="Canadá y EUA" x={470} y={255} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Vi + 3.9} until={K.A - 0.3} texto="Michoacán y Edomex: bosques de oyamel" x={540} y={1460} tam={34} borde={NARANJA} />
      <Chip T={T} at={K.A + 0.6} until={K.Bi - 0.3} texto="creencia: traen a los difuntos" y={530} tam={40} borde={NARANJA} />
      <Chip T={T} at={K.Bi + 0.2} until={K.S - 0.3} texto="ninguna conoce el camino" y={440} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.4} until={K.S + 1.5} texto="brújula de sol" x={720} y={400} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Bo + 1.4} until={K.E - 0.3} texto="se mide el bosque que cubren" y={500} tam={42} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.E + 0.3} until={K.An - 0.3} valor={2.93} dec={2} dur={1.2} sufijo=" ha" etiqueta="invierno 2025–2026 · WWF y CONANP" y={540} tam={190} />
      <Chip T={T} at={K.E + 2.6} until={K.An - 0.3} texto="+64 % que el año anterior" y={770} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.An + 2.4} until={K.Am - 0.3} texto="6 veces más" x={770} y={1040} tam={54} borde={KC.red} />
      <Etq T={T} at={K.D + 0.6} until={K.D + 2.6} x={480} y={1160} texto="solo come algodoncillo" tam={32} />
      <Chip T={T} at={K.D + 3.4} until={K.C - 0.3} texto="el veneno de la planta = amarga" y={1460} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="una visita que hay que cuidar" x={380} y={470} tam={36} borde={NARANJA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Vi - 0.1} texto="No son hojas: *son mariposas monarca.*" />
      <Subtitulo T={T} idx={1} at={K.Vi + 0.1} until={K.A - 0.1} texto="De Canadá y EUA *a los oyameles de México.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Bi - 0.1} texto="Dicen que traen *las almas.*" />
      <Subtitulo T={T} idx={3} at={K.Bi + 0.1} until={K.S - 0.1} texto="Viaja *la bisnieta o la tataranieta.*" />
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
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MonarcasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Monarcas /></CompositionStage></div>;
}
window.MonarcasApp = MonarcasApp;
