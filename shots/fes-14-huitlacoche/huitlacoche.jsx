// Shot Festivo #14 · Candelaria · Fungi Mati: el huitlacoche (Ustilago maydis) — NARRADO (N1 "Por dentro" con medidores de N3).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (teliospora, esporidias, apresorio y tumor simplificados;
// el códice es una ilustración AL ESTILO del Códice Florentino, no una copia del original).
const HOJA = '#e9dcae', HOJA2 = '#c9b77a', MASA = '#f4d27c', MASA2 = '#e2b85a', NEGRO = '#211c19', GRIS = '#6f6a66';
const GRANO = '#f4c94a', GRANO2 = '#d9a92b', TALLO = '#4caa3c', TALLO2 = '#2f7f2a', ESPIGA = '#d8c27a';
const ESPORA1 = '#4a3322', ESPORA2 = '#120b07', PIEL = '#e8e2c8';
const PAPEL = [KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink];

// ---------- utilidades de dibujo ----------
// Mancha orgánica cerrada (agallas, nubes de esporas). r = radio medio, v = irregularidad.
function blob(seed, r, n = 11, v = 0.18) {
  const g = krng(seed), P = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (1 + (g() - 0.5) * 2 * v); return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(P[n - 1], P[0]).join(' ')}`;
  for (let i = 0; i < n; i++) { const m = mid(P[i], P[(i + 1) % n]); d += ` Q ${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + ' Z';
}
const Defs = () => <defs>
  <radialGradient id="gAgalla" cx="38%" cy="32%" r="75%"><stop offset="0%" stopColor="#ffffff" /><stop offset="35%" stopColor="#d9dde3" /><stop offset="80%" stopColor="#9aa0a8" /><stop offset="100%" stopColor="#7d838c" /></radialGradient>
  <radialGradient id="gEspora" cx="36%" cy="32%" r="80%"><stop offset="0%" stopColor="#6a4a31" /><stop offset="45%" stopColor={ESPORA1} /><stop offset="100%" stopColor={ESPORA2} /></radialGradient>
  <radialGradient id="gMasa" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#fbe3a0" /><stop offset="100%" stopColor={MASA2} /></radialGradient>
</defs>;

// Papel picado que se mece arriba (fiesta de la Candelaria)
function PapelPicado({ T, y = 0, n = 7, alto = 140 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={PAPEL[i % 6]} opacity=".93" />
        <circle cx={0} cy={alto * 0.38} r={15} fill="#fff" opacity=".85" />
        <path d={`M -24 ${alto * 0.62} l 12 -14 l 12 14 l 12 -14 l 12 14`} stroke="#fff" strokeWidth={7} fill="none" opacity=".85" />
      </g>; })}
  </svg>;
}

// ---------- TAMAL abierto en su hoja de maíz, con relleno de huitlacoche ----------
// abre 0..1: las dos alas de la hoja se abren. vapor 0..1.
function Tamal({ T, x, y, s = 1, abre = 1, vapor = 1 }) {
  const g = krng(3);
  const ala = (k) => { const ang = k * klerp(0, 18, abre); return <g transform={`translate(${k * 175 * abre} ${30 * abre}) rotate(${ang} 0 260) scale(${1 - 0.6 * abre} 1)`}>
    <path d={`M 0 -330 C ${k * 60} -250 ${k * 170} -120 ${k * 175} 40 C ${k * 175} 170 ${k * 120} 260 0 300 Z`} fill={HOJA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0.3, 0.55, 0.8].map((q, i) => <path key={i} d={`M 0 ${-300 + i * 10} C ${k * 50 * q * 2} -200 ${k * 130 * q} -60 ${k * 150 * q} 120`} stroke={HOJA2} strokeWidth={4} fill="none" />)}
  </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={330} rx={260} ry={30} fill="rgba(0,0,0,.25)" />
    {/* hoja de abajo (base) */}
    <path d="M 0 -360 C 120 -260 250 -100 250 60 C 250 220 150 320 0 340 C -150 320 -250 220 -250 60 C -250 -100 -120 -260 0 -360 Z" fill={HOJA} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-160, -80, 0, 80, 160].map((vx, i) => <path key={i} d={`M 0 -340 Q ${vx * 0.8} -100 ${vx} 300`} stroke={HOJA2} strokeWidth={4} fill="none" opacity=".8" />)}
    {/* masa */}
    <rect x={-150} y={-220} width={300} height={440} rx={70} fill="url(#gMasa)" stroke={KC.ink} strokeWidth={7} />
    {/* relleno de huitlacoche: guisado negro con pedacitos grises (granos hinchados) */}
    <path d={blob(9, 100, 14, 0.05)} transform="scale(0.82 1.7)" fill={NEGRO} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 22 }, (_, i) => { const px = (g() - 0.5) * 120, py = (g() - 0.5) * 290, r = 7 + g() * 10; return <ellipse key={i} cx={px} cy={py} rx={r} ry={r * 0.8} fill={i % 3 ? GRIS : '#9b958e'} opacity=".9" />; })}
    {Array.from({ length: 6 }, (_, i) => <ellipse key={'b' + i} cx={-40 + (i % 3) * 40} cy={-110 + Math.floor(i / 3) * 200} rx={9} ry={5} fill="#fff" opacity=".35" />)}
    {/* alas de la hoja que se abren */}
    {ala(-1)}{ala(1)}
    {/* vapor */}
    {vapor > 0 && [-90, 0, 90].map((vx, i) => { const ph = ((T * 0.7 + i * 0.33) % 1); return <path key={'v' + i} d={`M ${vx} -250 q 22 -40 0 -80 q -22 -40 0 -80`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * 0.7 * Math.sin(Math.PI * ph)} transform={`translate(0 ${-ph * 70})`} />; })}
  </g>;
}

// ---------- AGALLA: tumor gris plateado. revienta 0..1 → se agrieta y suelta polvo negro ----------
function Agalla({ T, x, y, r, seed = 1, crece = 1, revienta = 0 }) {
  if (crece <= 0.001) return null;
  const k = kEase.rebote(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d={blob(seed, r)} fill="url(#gAgalla)" stroke={KC.ink} strokeWidth={Math.max(3, r * 0.07)} />
    <ellipse cx={-r * 0.3} cy={-r * 0.35} rx={r * 0.25} ry={r * 0.13} fill="#fff" opacity=".75" transform={`rotate(-25 ${-r * 0.3} ${-r * 0.35})`} />
    {revienta > 0 && <>
      <path d={blob(seed + 5, r * 0.5 * revienta, 15, 0.32)} transform={`translate(${r * 0.05} ${-r * 0.25})`} fill={NEGRO} />
      <path d={`M ${-r * 0.5} ${-r * 0.1} L ${-r * 0.15} ${r * 0.05} L ${r * 0.1} ${-r * 0.2} L ${r * 0.45} ${r * 0.1}`} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.05)} fill="none" opacity={revienta} />
    </>}
  </g>;
}

// Nube de polvo negro (teliosporas) que sale de una agalla que revienta. u 0..1
function Polvo({ x, y, u, n = 34, seed = 4, alcance = 260 }) {
  if (u <= 0 || u >= 1) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (g() - 0.5) * 2.4, v = alcance * (0.4 + g() * 0.8), r = 6 + g() * 14;
    const px = x + Math.cos(a) * v * u, py = y + Math.sin(a) * v * u + 120 * u * u;
    return <circle key={i} cx={px} cy={py} r={r * (0.6 + u)} fill={i % 4 ? '#1a1412' : '#3b2a1e'} opacity={(1 - u) * 0.9} />; })}</g>;
}

// ---------- MAZORCA (elote) con huitlacoche ----------
// huit 0..1: las agallas crecen; revienta 0..1. hojas: brácteas verdes.
const AGALLAS_ELOTE = [[-50, -170, 62, 2], [45, -120, 70, 3], [-40, -40, 66, 4], [55, 10, 60, 5], [-30, 80, 72, 6], [50, 140, 58, 7], [-55, 190, 52, 8], [10, -230, 50, 9], [5, 230, 48, 10]];
function Mazorca({ T, x, y, s = 1, rot = 0, huit = 1, revienta = 0, hojas = true, agallas = AGALLAS_ELOTE }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {hojas && <path d="M -20 300 C -170 200 -200 -40 -120 -250 C -150 -40 -110 160 10 290 Z" fill={TALLO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    <clipPath id="clipElote"><path d="M 0 -300 C 120 -300 130 -100 125 40 C 120 200 80 300 0 300 C -80 300 -120 200 -125 40 C -130 -100 -120 -300 0 -300 Z" /></clipPath>
    <path d="M 0 -300 C 120 -300 130 -100 125 40 C 120 200 80 300 0 300 C -80 300 -120 200 -125 40 C -130 -100 -120 -300 0 -300 Z" fill={GRANO2} stroke={KC.ink} strokeWidth={8} />
    <g clipPath="url(#clipElote)">
      {Array.from({ length: 15 }, (_, r) => Array.from({ length: 6 }, (_, c) => <rect key={r + '-' + c} x={-120 + c * 40 + (r % 2) * 10} y={-300 + r * 40} width={34} height={34} rx={11} fill={GRANO} stroke={GRANO2} strokeWidth={3} />))}
    </g>
    {/* barbas */}
    {[-20, -6, 8, 22].map((bx, i) => <path key={i} d={`M ${bx} -295 Q ${bx + 30 * Math.sin(T * 1.2 + i)} -360 ${bx + 14} -420`} stroke="#a8743a" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    {agallas.map(([ax, ay, ar, sd], i) => <Agalla key={i} T={T} x={ax} y={ay} r={ar} seed={sd} crece={kclamp(huit * 1.6 - i * 0.07, 0, 1)} revienta={revienta} />)}
    {hojas && <path d="M 20 300 C 170 200 200 -40 130 -230 C 150 -40 110 160 -10 290 Z" fill={TALLO2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
  </g>;
}

// ---------- TELIOSPORA: redonda, café oscuro a negra, pared equinulada (cubierta de espinitas) ----------
function Teliospora({ x, y, r, rot = 0, detalle = 1, o = 1 }) {
  const n = detalle > 0.5 ? 72 : 22, g = krng(Math.round(r) + 3);
  const espinas = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, b = (Math.PI / n) * 0.5, h = r * 0.12;
    return `M ${Math.cos(a - b) * r * 0.99} ${Math.sin(a - b) * r * 0.99} L ${Math.cos(a) * (r + h)} ${Math.sin(a) * (r + h)} L ${Math.cos(a + b) * r * 0.99} ${Math.sin(a + b) * r * 0.99} Z`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {detalle > 0.5 && <circle r={r * 1.25} fill="rgba(255,220,170,.10)" />}
    <path d={espinas} fill={detalle > 0.5 ? '#9a7350' : ESPORA2} stroke={detalle > 0.5 ? '#c9a27a' : 'none'} strokeWidth={1.2} />
    <circle r={r} fill="url(#gEspora)" stroke={ESPORA2} strokeWidth={Math.max(1.5, r * 0.03)} />
    {detalle > 0.5 && Array.from({ length: 70 }, (_, i) => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.9; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={r * 0.028} fill="#8a6446" opacity={0.55 + 0.45 * (1 - d / r)} />; })}
    <path d={`M ${-r * 0.62} ${-r * 0.2} A ${r * 0.7} ${r * 0.7} 0 0 1 ${-r * 0.1} ${-r * 0.66}`} stroke="#fff" strokeWidth={Math.max(2, r * 0.06)} fill="none" strokeLinecap="round" opacity=".35" />
  </g>;
}

// Esporidia (célula haploide, como levadura): forma de puro, con núcleo. yema 0..1 = gemación en una punta.
function Esporidia({ x, y, rot = 0, s = 1, color = PIEL, nucleo = KC.mint, yema = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {yema > 0 && <ellipse cx={34 + 22 * yema} cy={0} rx={22 * yema} ry={9 * yema} fill={color} stroke={KC.ink} strokeWidth={3} />}
    <ellipse rx={38} ry={13} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <circle cx={-4} cy={0} r={5.5} fill={nucleo} />
  </g>;
}

// Células de la planta (epidermis en corte) para las escenas micro
function Epidermis({ y = 1060, filas = 3, alto = 120, ancho = 170, o = 1, desplaza = 0 }) {
  const out = [];
  for (let f = 0; f < filas; f++) for (let c = -1; c < 8; c++) {
    const w = ancho, x = c * w + (f % 2) * w / 2 - desplaza;
    out.push(<rect key={f + '-' + c} x={x + 4} y={y + f * alto + 4} width={w - 8} height={alto - 8} rx={22} fill={f ? '#2f6b34' : '#3f8a44'} stroke="#7fd17a" strokeWidth={4} opacity={o} />);
    out.push(<circle key={'n' + f + '-' + c} cx={x + w * 0.62} cy={y + f * alto + alto * 0.45} r={9} fill="#a6e39a" opacity={o * 0.7} />);
  }
  return <g>{out}<line x1={0} y1={y} x2={KW} y2={y} stroke="#c8f5b0" strokeWidth={6} opacity={o * 0.8} /></g>;
}

// ---------- PLANTA DE MAÍZ completa con agallas en hoja, tallo, espiga y elote ----------
function PlantaMaiz({ T, t0, k = 1 }) {
  const p = (d) => kprog(T, t0 + d, t0 + d + 0.6);
  const sway = Math.sin(T * 1.1) * 3;
  return <g transform={`rotate(${sway * 0.3} 540 1760)`}>
    <rect x={-40} y={1740} width={KW + 80} height={200} fill="#8a5a33" />
    <path d="M 0 1745 Q 540 1720 1080 1745" stroke="#5e3b20" strokeWidth={8} fill="none" />
    {/* espiga (flor masculina) */}
    {[-50, -25, 0, 25, 50].map((a, i) => <path key={i} d={`M 540 560 Q ${540 + a * 1.4} 470 ${540 + a * 2.6} ${420 + Math.abs(a) * 0.8}`} stroke={ESPIGA} strokeWidth={9} fill="none" strokeLinecap="round" />)}
    <path d="M 540 560 L 540 380" stroke={ESPIGA} strokeWidth={11} strokeLinecap="round" />
    {/* tallo */}
    <path d="M 528 1745 L 532 560 L 548 560 L 552 1745 Z" fill={TALLO} stroke={KC.ink} strokeWidth={6} />
    {[1500, 1250, 1000, 760].map((ny) => <line key={ny} x1={526} y1={ny} x2={554} y2={ny} stroke={TALLO2} strokeWidth={6} />)}
    {/* hojas */}
    <path d="M 540 1500 C 380 1430 230 1460 120 1580 C 250 1490 390 1480 540 1530 Z" fill={TALLO} stroke={KC.ink} strokeWidth={5} />
    <path d="M 540 1250 C 720 1160 880 1180 990 1290 C 870 1220 720 1230 540 1285 Z" fill={TALLO} stroke={KC.ink} strokeWidth={5} />
    <path d="M 540 1000 C 380 900 220 880 110 950 C 250 920 390 950 540 1035 Z" fill={TALLO} stroke={KC.ink} strokeWidth={5} />
    <path d="M 540 760 C 700 660 840 640 960 700 C 830 690 700 720 540 795 Z" fill={TALLO} stroke={KC.ink} strokeWidth={5} />
    {/* elote en la axila */}
    <Mazorca T={T} x={640} y={1080} s={0.42} rot={22} huit={p(2.6) * k} />
    {/* agallas en hoja, tallo y espiga */}
    <Agalla T={T} x={250} y={918} r={44} seed={21} crece={p(0.6)} />
    <Agalla T={T} x={540} y={1380} r={52} seed={22} crece={p(1.3)} />
    {[[515, 440, 22], [570, 470, 26], [540, 400, 18]].map(([ax, ay, ar], i) => <Agalla key={i} T={T} x={ax} y={ay} r={ar} seed={30 + i} crece={p(2.0 + i * 0.1)} />)}
  </g>;
}

// ---------- ROSCA DE REYES con su muñequito ----------
function Rosca({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={300} ry={150} fill="rgba(0,0,0,.2)" />
    <path d="M -290 0 A 290 140 0 1 0 290 0 A 290 140 0 1 0 -290 0 Z M -150 0 A 150 60 0 1 1 150 0 A 150 60 0 1 1 -150 0 Z" fill="#d9954a" stroke={KC.ink} strokeWidth={8} fillRule="evenodd" />
    {[-210, -70, 70, 210].map((sx, i) => <path key={i} d={`M ${sx - 40} ${-90 + Math.abs(sx) * 0.2} q 40 -26 80 0`} stroke="#f6e7c8" strokeWidth={22} fill="none" strokeLinecap="round" />)}
    {[[-240, 40, KC.red], [-120, 110, KC.leaf], [130, 110, KC.orange], [240, 40, KC.red], [0, -120, KC.leaf]].map(([fx, fy, c], i) => <rect key={i} x={fx - 16} y={fy - 9} width={32} height={18} rx={6} fill={c} stroke={KC.ink} strokeWidth={3} />)}
    {/* muñequito (el Niño) asomándose */}
    <g transform={`translate(70 ${-60 - 8 * Math.abs(Math.sin(T * 2))})`}>
      <ellipse cx={0} cy={0} rx={24} ry={34} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <circle cx={0} cy={-40} r={20} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}

// ---------- ADN que se lee letra por letra ----------
function ADNLectura({ T, t0, y = 960 }) {
  const L = 'ACGTTGCATGCAAGTCCGATAGCTTACG', paso = 58;
  const corre = (T - t0) * 160;
  return <g>
    {Array.from({ length: 26 }, (_, i) => { const x = ((i * paso - corre) % (26 * paso) + 26 * paso) % (26 * paso) - 100, f = Math.sin(x / 70 + T);
      const y1 = y - 70 * f, y2 = y + 70 * f, leida = x < 540;
      return <g key={i}>
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={leida ? KC.gold2 : 'rgba(255,255,255,.5)'} strokeWidth={6} />
        <circle cx={x} cy={y1} r={11} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><circle cx={x} cy={y2} r={11} fill={KC.pink} stroke={KC.ink} strokeWidth={3} />
        {leida && <text x={x} y={y - 110 - 10 * Math.abs(f)} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{L[i % L.length]}</text>}
      </g>; })}
    <rect x={530} y={y - 150} width={20} height={300} rx={8} fill={KC.gold} opacity={0.5 + 0.3 * Math.sin(T * 8)} />
  </g>;
}

// Caja de Petri con colonias tipo levadura (cremosas)
function Petri({ T, x, y, r = 260, crece = 1 }) {
  const g = krng(17);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={18} rx={r + 10} ry={(r + 10) * 0.42} fill="rgba(0,0,0,.25)" />
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.42} fill="#f2e6a6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-6} rx={r * 0.94} ry={r * 0.38} fill="#f7efc4" />
    {Array.from({ length: 18 }, (_, i) => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.8, cr = (10 + g() * 18) * kclamp(crece * 1.4 - i * 0.04, 0, 1);
      return cr > 0.5 ? <ellipse key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.4 - 6} rx={cr} ry={cr * 0.45} fill="#fffaf0" stroke="#c9b98a" strokeWidth={2} /> : null; })}
    <ellipse cx={0} cy={-10} rx={r + 4} ry={(r + 4) * 0.42} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={5} />
  </g>;
}

// Quesadilla con huitlacoche
function Quesadilla({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 40 A 170 150 0 0 1 170 40 Z" fill={NEGRO} />
    <path d="M -180 40 A 180 160 0 0 1 180 40 L 150 40 A 150 128 0 0 0 -150 40 Z" fill="#e7c06a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -180 40 A 180 160 0 0 1 180 40" fill="none" stroke={KC.ink} strokeWidth={7} />
    {[[-80, 10], [-20, -20], [50, 0], [100, 25]].map(([qx, qy], i) => <ellipse key={i} cx={qx} cy={qy} rx={16} ry={11} fill={GRIS} />)}
    <path d="M -180 40 L 180 40" stroke={KC.ink} strokeWidth={7} />
    {[-110, -10, 90].map((mx) => <circle key={mx} cx={mx} cy={-60 + Math.abs(mx) * 0.3} r={9} fill="#b97a2f" opacity=".7" />)}
  </g>;
}
// Canasta tejida
function Canasta({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
    <path d="M -230 0 L 230 0 L 190 200 L -190 200 Z" fill="#c98b45" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[40, 90, 140].map((ly) => <path key={ly} d={`M ${-230 + ly * 0.2} ${ly} L ${230 - ly * 0.2} ${ly}`} stroke="#8f5a26" strokeWidth={6} />)}
    {[-150, -75, 0, 75, 150].map((lx) => <path key={lx} d={`M ${lx} 0 L ${lx * 0.84} 200`} stroke="#8f5a26" strokeWidth={6} />)}
  </g>;
}

// Ilustración AL ESTILO del Códice Florentino (no es una copia del original): papel amate/crema, tinta negra, colores planos.
function CodiceEstilo({ T, x, y, abre = 1 }) {
  const w = 620, h = 760;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, abre)}) rotate(${klerp(-8, -2, abre)})`} opacity={abre}>
    <rect x={-w / 2 + 14} y={-h / 2 + 14} width={w} height={h} rx={10} fill="rgba(0,0,0,.35)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#efe0b9" stroke="#7a5a32" strokeWidth={6} />
    {Array.from({ length: 30 }, (_, i) => { const g = krng(i + 90); return <circle key={i} cx={(g() - 0.5) * w * 0.9} cy={(g() - 0.5) * h * 0.9} r={3 + g() * 6} fill="#d8c496" opacity=".6" />; })}
    {/* renglones de texto (sin letras reales) */}
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-w / 2 + 50} y1={-h / 2 + 60 + i * 34} x2={w / 2 - 50 - (i === 3 ? 160 : 0)} y2={-h / 2 + 60 + i * 34} stroke="#6b5233" strokeWidth={5} strokeDasharray="22 10 8 12" opacity=".55" />)}
    {/* recuadro del dibujo */}
    <rect x={-w / 2 + 50} y={-h / 2 + 200} width={w - 100} height={h - 260} fill="none" stroke={NEGRO} strokeWidth={5} />
    {/* mazorca deforme: contorno de tinta y colores planos */}
    <g transform="translate(0 70)">
      <path d="M -40 230 C -150 150 -170 -60 -90 -210 C -120 -40 -80 120 0 220 Z" fill="#7d9a4a" stroke={NEGRO} strokeWidth={6} />
      <path d="M 40 230 C 150 150 170 -60 90 -210 C 120 -40 80 120 0 220 Z" fill="#6a8a3e" stroke={NEGRO} strokeWidth={6} />
      <path d="M 0 -220 C 80 -220 90 -80 86 20 C 82 140 50 220 0 220 C -50 220 -82 140 -86 20 C -90 -80 -80 -220 0 -220 Z" fill="#d9b25a" stroke={NEGRO} strokeWidth={6} />
      {[[-30, -130, 46], [35, -70, 54], [-25, 10, 50], [30, 80, 46], [-10, 150, 40]].map(([ax, ay, ar], i) => <g key={i}>
        <path d={blob(40 + i, ar, 9, 0.22)} transform={`translate(${ax} ${ay})`} fill={i % 2 ? '#2a2420' : '#3a332d'} stroke={NEGRO} strokeWidth={5} />
        <path d={blob(50 + i, ar * 0.45, 7, 0.2)} transform={`translate(${ax - ar * 0.2} ${ay - ar * 0.2})`} fill="#8c8a84" opacity=".7" />
      </g>)}
    </g>
  </g>;
}

// ---------- El shot ----------
function Huitlacoche() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Es: CUES.Espora, L: CUES.Levaduras, F: CUES.Fusion, P: CUES.Pregunta, Tu: CUES.Tumor, A: CUES.Agallas, Ep: CUES.Esporas, E: CUES.Estudio, Pl: CUES.Plaga, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}><Defs />{c}</svg>;

  // levaduras: esporidias que salen del promicelio y se multiplican por gemación
  const SP = Array.from({ length: 16 }, (_, i) => { const g = krng(i * 7 + 2); return { x: 560 + g() * 420, y: 560 + g() * 560, rot: g() * 180, t: K.L + 1.2 + i * 0.13 }; });
  const PROM = (u) => [[330, 840], [390, 800], [440, 780], [490, 790]].slice(0, Math.max(1, Math.ceil(u * 4)));

  // fusión
  const fA = kprog(T, K.F + 0.2, K.F + 1.4, kEase.suave), fus = kprog(T, K.F + 1.5, K.F + 1.9), fil = kprog(T, K.F + 2.0, K.F + 3.6, kEase.suave), apr = kprog(T, K.F + 3.6, K.F + 4.1), pen = kprog(T, K.F + 4.1, K.F + 5.2, kEase.suave);
  const filPts = Array.from({ length: 30 }, (_, i) => { const q = i / 29; return [540 - 280 * q, 660 + 170 * q + Math.sin(q * 9) * 16]; });
  const filTip = filPts[Math.min(29, Math.floor(fil * 29))];

  // tumor
  const tum = kprog(T, K.Tu + 0.6, K.Tu + 4.2, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tamal se abre y deja ver el relleno negro */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        {svg(<Tamal T={T} x={380} y={880} s={klerp(0.8, 0.95, kprog(T, K.G, K.G + 0.6, kEase.rebote))} abre={kprog(T, K.G + 0.15, K.G + 0.9, kEase.sale)} />)}
      </Escena>
      {/* 2 · se llama huitlacoche: la mazorca con agallas */}
      <Escena T={T} a={K.N} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {svg(<Mazorca T={T} x={360} y={960} s={1.25} rot={-6} huit={kprog(T, K.N + 0.1, K.N + 1.6)} />)}
      </Escena>
      {/* 3 · la teliospora: redonda, oscura, con espinitas (micro) */}
      <Escena T={T} a={K.Es} b={K.L} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(160,140,110,.22)" />
        {svg(<>
          <path d="M 0 1180 Q 540 1140 1080 1180 L 1080 1920 L 0 1920 Z" fill="#2f6b34" opacity={kprog(T, K.Es + 2.0, K.Es + 2.8) * 0.9} />
          <Teliospora x={500} y={klerp(780, 900, kprog(T, K.Es + 1.6, K.Es + 3.0, kEase.suave))} r={200} rot={T * 6} />
          {kprog(T, K.Es + 2.9, K.Es + 3.2) > 0 && kprog(T, K.Es + 2.9, K.Es + 3.6) < 1 && <circle cx={540} cy={1110} r={klerp(40, 300, kprog(T, K.Es + 2.9, K.Es + 3.6))} fill="none" stroke="#c8f5b0" strokeWidth={6} opacity={1 - kprog(T, K.Es + 2.9, K.Es + 3.6)} />}
        </>)}
        {T > K.Es - 0.3 && T < K.L + 0.3 && <Escala T={T} z={1} pxPorMm={40000} x={60} y={1440} />}
      </Escena>
      {/* 4 · al germinar suelta esporidias que crecen como levaduras */}
      <Escena T={T} a={K.L} b={K.F} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} color="rgba(160,200,140,.2)" />
        {svg((() => { const u = kprog(T, K.L + 0.2, K.L + 1.2); const pts = PROM(u);
          return <>
            <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={PIEL} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
            <Teliospora x={300} y={860} r={56} detalle={1} />
            {SP.map((c, i) => { const v = kprog(T, c.t, c.t + 0.5, kEase.sale); if (v <= 0) return null;
              const x0 = 490, y0 = 790, yema = kprog(T, c.t + 0.6, c.t + 1.4);
              return <Esporidia key={i} x={klerp(x0, c.x, v)} y={klerp(y0, c.y, v)} rot={c.rot + Math.sin(T + i) * 8} s={1.1} yema={yema} nucleo={KC.mint} />; })}
          </>; })())}
        {T > K.L - 0.3 && T < K.F + 0.3 && <Escala T={T} z={1} pxPorMm={10000} x={60} y={1440} />}
      </Escena>
      {/* 5 · dos compatibles se fusionan: filamento que perfora la planta */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} color="rgba(160,200,140,.2)" />
        {svg(<>
          <Epidermis y={880} />
          {/* tubos de conjugación */}
          {fA > 0.5 && fus < 1 && <line x1={klerp(200, 440, fA) + 80} y1={640} x2={klerp(880, 640, fA) - 80} y2={640} stroke={PIEL} strokeWidth={20} strokeLinecap="round" opacity={1 - fus} />}
          <Esporidia x={klerp(200, 440, fA)} y={640} rot={0} s={2.3} nucleo={KC.cyan} o={1 - fus * 0.6} />
          <Esporidia x={klerp(880, 640, fA)} y={640} rot={180} s={2.3} nucleo={KC.pink} o={1 - fus * 0.6} />
          {fus > 0 && fus < 1 && <circle cx={540} cy={650} r={40 + 140 * fus} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={1 - fus} />}
          {/* filamento dicariótico (dos núcleos) que crece sobre la hoja */}
          {fil > 0 && <polyline points={filPts.slice(0, Math.max(2, Math.floor(fil * 29) + 1)).map((p) => p.join(',')).join(' ')} fill="none" stroke={PIEL} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />}
          {fil > 0 && <g transform={`translate(${filTip[0]} ${filTip[1]})`}><circle cx={10} cy={-4} r={7} fill={KC.cyan} /><circle cx={24} cy={4} r={7} fill={KC.pink} /></g>}
          {/* apresorio (punta hinchada) y entrada a la célula */}
          {apr > 0 && <ellipse cx={filPts[29][0]} cy={filPts[29][1] + 20} rx={20 + 22 * apr} ry={16 + 14 * apr} fill={PIEL} stroke={KC.ink} strokeWidth={3} />}
          {pen > 0 && <path d={`M ${filPts[29][0]} ${filPts[29][1] + 30} q 30 ${60 * pen} ${10} ${170 * pen} q -30 ${50 * pen} ${40} ${110 * pen}`} fill="none" stroke={PIEL} strokeWidth={14} strokeLinecap="round" />}
          {pen > 0.2 && pen < 0.7 && <circle cx={filPts[29][0]} cy={882} r={20 + 60 * pen} fill="none" stroke={KC.red} strokeWidth={6} opacity={1 - pen} />}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué se hincha? */}
      <Escena T={T} a={K.P} b={K.Tu} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={240} y={760} textAnchor="middle" style={{ font:`400 380px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 240 640)`}>?</text>
          <Mazorca T={T} x={300} y={1100} s={0.75} rot={-10} huit={0} agallas={[[30, -60, 70, 3]]} />
          <g transform={`translate(${300 + 20} ${1100 - 50})`}>
            <Agalla T={T} x={0} y={0} r={klerp(20, 120, kprog(T, K.P + 0.3, K.P + 2.4, kEase.suave))} seed={3} crece={1} />
          </g>
        </>)}
      </Escena>
      {/* 7 · tumor: las células del maíz crecen y se dividen de más */}
      <Escena T={T} a={K.Tu} b={K.A} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg((() => { const out = []; const cx = 540, cy = 950;
          for (let r = -4; r <= 4; r++) for (let c = -4; c <= 4; c++) {
            const bx = cx + c * 110, by = cy + r * 100, d = Math.hypot(c, r * 1.1), cerca = kclamp(1 - d / 3.2, 0, 1);
            const s = 1 + 0.55 * tum * cerca, ox = (bx - cx) * 0.22 * tum * cerca, oy = (by - cy) * 0.22 * tum * cerca;
            const w = 100 * s, h = 90 * s, X = bx + ox - w / 2, Y = by + oy - h / 2, divide = tum > 0.45 && cerca > 0.3;
            out.push(<g key={r + '_' + c}>
              <rect x={X} y={Y} width={w} height={h} rx={20} fill={cerca > 0.3 ? mixHex('#3f8a44', '#7fbf5a', tum * cerca) : '#2f6b34'} stroke="#9be08f" strokeWidth={4} />
              {divide ? <><line x1={X + w / 2} y1={Y + 6} x2={X + w / 2} y2={Y + h - 6} stroke="#9be08f" strokeWidth={4} opacity={kprog(tum, 0.45, 0.6)} /><circle cx={X + w * 0.27} cy={Y + h / 2} r={8} fill="#c9f2b5" /><circle cx={X + w * 0.73} cy={Y + h / 2} r={8} fill="#c9f2b5" /></> : <circle cx={X + w * 0.6} cy={Y + h / 2} r={8} fill="#a6e39a" opacity=".7" />}
            </g>);
          }
          const hif = Array.from({ length: 40 }, (_, i) => { const q = i / 39; return [80 + q * 920, cy - 60 + Math.sin(q * 7 + 1) * 90]; });
          out.push(<polyline key="h" points={hif.slice(0, Math.max(2, Math.ceil(kprog(T, K.Tu, K.Tu + 1.2) * 40))).map((p) => p.join(',')).join(' ')} fill="none" stroke={PIEL} strokeWidth={12} strokeLinecap="round" />);
          return out; })())}
        {T > K.Tu - 0.3 && T < K.A + 0.3 && <Escala T={T} z={1} pxPorMm={3000} x={60} y={1440} />}
      </Escena>
      {/* 8 · en una semana o menos: agallas en hoja, tallo, espiga y granos */}
      <Escena T={T} a={K.A} b={K.Ep} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {svg(<PlantaMaiz T={T} t0={K.A} />)}
      </Escena>
      {/* 9 · por dentro, la agalla se llena de esporas negras y revienta en polvo */}
      <Escena T={T} a={K.Ep} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Agalla T={T} x={540} y={900} r={250} seed={12} crece={1} revienta={kprog(T, K.Ep + 2.1, K.Ep + 2.5)} />
          <Polvo x={540} y={820} u={kprog(T, K.Ep + 2.1, K.Ep + 3.3)} n={60} alcance={480} />
        </>)}
        <Lupa T={T} at={K.Ep + 0.2} until={K.Ep + 2.0} x={540} y={900} r={230} fx={540} fy={900} linea={false} tinte={KC.gold2} etiqueta="POR DENTRO · agalla"
          interior={(Tl, r) => { const llena = kprog(Tl, K.Ep + 0.5, K.Ep + 1.9); const g = krng(5);
            return <svg width={r * 2} height={r * 2}><Defs /><rect width={r * 2} height={r * 2} fill="#cfd3c4" />
              {Array.from({ length: 10 }, (_, i) => <path key={'h' + i} d={`M ${g() * r * 2} 0 Q ${g() * r * 2} ${r} ${g() * r * 2} ${r * 2}`} stroke="#f7f5ea" strokeWidth={8} fill="none" opacity={1 - llena * 0.7} />)}
              {Array.from({ length: 120 }, (_, i) => { const px = g() * r * 2, py = g() * r * 2; return i / 120 < llena ? <Teliospora key={i} x={px} y={py} r={13} detalle={0} /> : null; })}
            </svg>; }} />
      </Escena>
      {/* 10 · el estudio: genoma (Marburgo, 2006) y hongo modelo de laboratorio */}
      <Escena T={T} a={K.E} b={K.Pl} zoom={0.04}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
        {svg(<>
          <g opacity={1 - kprog(T, K.E + 3.0, K.E + 3.5)}><rect x={0} y={760} width={KW} height={400} fill="rgba(13,20,36,.85)" /><ADNLectura T={T} t0={K.E} y={960} /></g>
          <g opacity={kprog(T, K.E + 3.0, K.E + 3.5)}><Petri T={T} x={540} y={980} r={330} crece={kprog(T, K.E + 3.2, K.E + 5.0)} /></g>
        </>)}
      </Escena>
      {/* 11 · allá enfermedad, aquí comida */}
      <Escena T={T} a={K.Pl} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {(() => { const der = kprog(T, K.Pl + 3.0, K.Pl + 3.6, kEase.sale);
          return <>
            <div style={{ position:'absolute', left:540 + (1 - der) * 540, top:0, width:540, height:KH, background:KC.yellow, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.33) 7px, transparent 8px)', backgroundSize:'52px 52px', borderLeft:`8px solid ${KC.ink}` }}></div>
            {svg(<>
              <Mazorca T={T} x={270} y={900} s={0.8} huit={1} />
              {/* sello rojo de "enfermedad" */}
              <g opacity={kprog(T, K.Pl + 1.4, K.Pl + 1.7)} transform={`translate(270 900) rotate(-14) scale(${klerp(1.6, 1, kprog(T, K.Pl + 1.4, K.Pl + 1.7, kEase.sale))})`}>
                <rect x={-230} y={-50} width={460} height={100} rx={14} fill="rgba(255,255,255,.65)" stroke={KC.red} strokeWidth={10} />
                <text x={0} y={22} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.red}>ENFERMEDAD</text>
              </g>
              <g transform={`translate(${(1 - der) * 540} 0)`}>
                <Canasta x={810} y={840} s={0.85}><Mazorca T={T} x={-40} y={-120} s={0.48} rot={-60} huit={1} /><Mazorca T={T} x={60} y={-90} s={0.42} rot={50} huit={1} hojas={false} /></Canasta>
                <Quesadilla x={810} y={1560} s={0.78} />
              </g>
            </>)}
          </>; })()}
      </Escena>
      {/* 12 · dato: lisina, y una ilustración al estilo del Códice Florentino */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g opacity={1 - kprog(T, K.D + 3.6, K.D + 4.0)}>
            <Mazorca T={T} x={250} y={960} s={0.5} huit={0} />
            <Agalla T={T} x={780} y={1000} r={110} seed={14} crece={1} />
            <text x={250} y={1170} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>maíz</text>
            <text x={780} y={1170} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>huitlacoche</text>
          </g>
          <CodiceEstilo T={T} x={540} y={880} abre={kprog(T, K.D + 3.8, K.D + 4.6, kEase.sale)} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo tamal del inicio; por dentro, las esporas con espinitas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        {svg(<>
          <Rosca T={T} x={790} y={1520} s={0.62} />
          <Tamal T={T} x={330} y={900} s={0.85} abre={1} />
        </>)}
        <Lupa T={T} at={K.Ci + 0.8} until={K.Ou - 0.2} x={770} y={720} r={170} fx={330} fy={880} tinte={KC.gold2} etiqueta="AL MICROSCOPIO · esporas"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><Defs /><rect width={r * 2} height={r * 2} fill="#d8d4c4" />
            {[[0.32, 0.36, 62], [0.72, 0.4, 54], [0.5, 0.75, 58], [0.12, 0.8, 40], [0.9, 0.82, 36]].map(([a, b, rr], i) => <Teliospora key={i} x={a * r * 2} y={b * r * 2} r={rr} rot={Tl * 10 + i * 30} />)}
          </svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Es, titulo: 'La espora' }, { at: K.F, titulo: 'La infección' }, { at: K.Tu, titulo: 'La agalla' }, { at: K.E, titulo: 'El laboratorio' }, { at: K.Pl, titulo: 'A la mesa' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.N - 0.2} texto="Especial Candelaria" x={540} y={1520} tam={42} borde={KC.pink} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.6} texto="¿podrido?" x={290} y={540} tam={52} />
      <Etq T={T} at={K.G + 2.0} until={K.N - 0.3} x={560} y={900} texto="un hongo" tam={44} color={KC.ink} />
      <Etq T={T} at={K.N + 0.4} until={K.Es - 0.3} x={560} y={760} texto="huitlacoche" tam={46} color={KC.ink} />
      <Etq T={T} at={K.N + 0.9} until={K.Es - 0.3} x={560} y={840} texto="Ustilago maydis" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 1.3} until={K.Es - 0.3} x={560} y={905} texto="(hoy Mycosarcoma maydis)" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.5} until={K.L - 0.3} x={60} y={500} texto="teliospora · ≈ 10 µm" tam={34} />
      <Chip T={T} at={K.Es + 1.2} until={K.L - 0.3} texto="cubierta de espinitas" x={540} y={1530} tam={44} borde={KC.gold2} />
      <Etq T={T} at={K.L + 0.5} until={K.F - 0.3} x={60} y={500} texto="la espora germina" tam={32} />
      <Chip T={T} at={K.L + 1.6} until={K.F - 0.3} texto="esporidias: crecen como levaduras" x={540} y={1530} tam={38} borde={KC.mint} />
      <Etq T={T} at={K.F + 0.4} until={K.F + 1.9} x={60} y={500} texto="2 células compatibles" tam={32} />
      <Etq T={T} at={K.F + 2.2} until={K.F + 3.8} x={600} y={760} texto="filamento con 2 núcleos" tam={32} />
      <Chip T={T} at={K.F + 3.8} until={K.P - 0.3} texto="apresorio: perfora la planta" x={540} y={1530} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Tu + 0.3} until={K.A - 0.3} x={60} y={420} texto="células del maíz" tam={32} />
      <Etq T={T} at={K.Tu + 0.8} until={K.A - 0.3} x={60} y={470} texto="hifas del hongo" tam={32} color={PIEL} />
      <Chip T={T} at={K.Tu + 2.2} until={K.A - 0.3} texto="crecen y se dividen de más" x={540} y={1530} tam={42} borde={KC.mint} />
      {kvisible(T, K.A + 0.2, K.Ep - 0.3, 0.3) && <div style={{ position:'absolute', right:40, top:470, zIndex:42, opacity:kprog(T, K.A + 0.2, K.A + 0.5) * (1 - kprog(T, K.Ep - 0.3, K.Ep)), background:'rgba(14,15,18,.85)', border:`4px solid ${KC.gold2}`, borderRadius:18, padding:'8px 22px', textAlign:'center' }}>
        <div style={{ font:`700 22px ${KF.mono}`, color:KC.gold2, letterSpacing:'.12em' }}>INFECCIÓN</div>
        <div style={{ font:`700 54px ${KF.mono}`, color:KC.texto }}>DÍA {Math.min(7, 1 + Math.floor(kprog(T, K.A + 0.3, K.A + 3.0) * 6.99))}</div>
      </div>}
      <Etq T={T} at={K.A + 0.9} until={K.Ep - 0.3} x={290} y={830} texto="hoja" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 1.6} until={K.Ep - 0.3} x={600} y={1400} texto="tallo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 2.3} until={K.Ep - 0.3} x={600} y={410} texto="espiga" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 3.0} until={K.Ep - 0.3} x={760} y={1110} texto="granos" tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 3.6} until={K.Ep - 0.3} texto="≤ 1 semana: agallas grises" x={540} y={1530} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.Ep + 2.3} until={K.E - 0.2} texto="polvo negro = esporas" x={540} y={1530} tam={42} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2006" quien="Marburgo, Alemania" revista="genoma de Ustilago maydis · Nature" x={360} y={560} />
      <Chip T={T} at={K.E + 3.4} until={K.Pl - 0.3} texto="hongo modelo de laboratorio" x={540} y={1530} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.E + 3.6} until={K.Pl - 0.3} x={60} y={730} texto="crece como levadura en la caja" tam={28} />
      <Chip T={T} at={K.Pl + 0.3} until={K.D - 0.3} texto="EE. UU.: corn smut" x={270} y={1530} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Pl + 3.4} until={K.D - 0.3} texto="México: comida" x={810} y={560} tam={36} borde={KC.leaf} />
      <Etq T={T} at={K.Pl + 4.0} until={K.D - 0.3} x={600} y={1100} texto="se cosecha tierno" tam={26} color={KC.ink} />
      <Medidor T={T} at={K.D + 0.3} until={K.D + 3.5} y={470} x={90} ancho={580} etiqueta="lisina · maíz" valor={(t) => 0.2 * kprog(t, K.D + 0.4, K.D + 1.2)} texto={() => 'poca'} color={KC.yellow} />
      <Medidor T={T} at={K.D + 0.7} until={K.D + 3.5} y={590} x={90} ancho={580} etiqueta="lisina · huitlacoche" valor={(t) => 0.85 * kprog(t, K.D + 0.8, K.D + 2.0)} texto={() => 'rico'} color={KC.mint} />
      <Etq T={T} at={K.D + 4.4} until={K.Ci - 0.3} x={60} y={1490} texto="ilustración al estilo del Códice Florentino · s. XVI" tam={26} />
      <Chip T={T} at={K.Ci + 3.2} until={K.Ou} texto="no está podrido: es un hongo" x={540} y={1530} tam={42} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No está podrido: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Es - 0.1} texto="Se llama *huitlacoche.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.L - 0.1} texto="Una espora *con espinitas.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.F - 0.1} texto="Crecen *como levaduras.*" />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.P - 0.1} texto="Se fusionan *y perforan la planta.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Tu - 0.1} texto="¿Por qué *se hincha?*" />
      <Subtitulo T={T} idx={6} at={K.Tu + 0.1} until={K.A - 0.1} texto="Crecen de más: *tumores.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.Ep - 0.1} texto="En una semana: *agallas.*" />
      <Subtitulo T={T} idx={8} at={K.Ep + 0.1} until={K.E - 0.1} texto="Adentro: *esporas negras.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Pl - 0.1} texto="2006: *su genoma.*" />
      <Subtitulo T={T} idx={10} at={K.Pl + 0.1} until={K.D - 0.1} texto="Allá enfermedad; *aquí, comida.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.Ci - 0.1} texto="*Lisina,* y dibujado *en el siglo XVI.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No está podrido: *lleva hongo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Espora + 0.4, CUES.Levaduras - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Fusion + 2.0, CUES.Pregunta - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Tumor + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Agallas + 0.5, CUES.Esporas - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Estudio + 0.6, CUES.Plaga - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Plaga + 0.6, CUES.Dato - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Dato + 0.4, CUES.Dato + 3.6, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuitlacocheApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Huitlacoche /></CompositionStage></div>;
}
window.HuitlacocheApp = HuitlacocheApp;
