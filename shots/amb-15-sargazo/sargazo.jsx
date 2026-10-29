// Shot Ambiental #15 · El sargazo de Quintana Roo no es basura (N2 el número + N1 por dentro) — NARRADO.
// Datos: Wang et al. 2019 (Science), boletín USF jul 2025 (vía CARICOOS), CONANP Puerto Morelos 2015, Jung et al. 2025 (Nature Geoscience),
// EPA (H2S), Rodríguez-Martínez et al. 2019, NOAA. Ver guion.md y verificacion.md. Mapa, coral y microbios son esquemáticos.

const SG_CAFE = '#b9852a', SG_CAFE2 = '#8a5a1c', SG_VES = '#e0b048', SG_PODRIDO = '#4a3418';

// Hoja (filoide) alargada con borde dentado, sobre el eje x (de 0 a L).
function sgHoja(L, W) {
  const n = 10, top = [], bot = [];
  for (let i = 0; i <= n; i++) { const x = L * i / n, w = W * Math.sin(Math.PI * i / n) * (i % 2 ? 1.25 : 1); top.push(`${x.toFixed(1)} ${(-w).toFixed(1)}`); bot.unshift(`${x.toFixed(1)} ${w.toFixed(1)}`); }
  return 'M ' + top.join(' L ') + ' L ' + bot.join(' L ') + ' Z';
}
// Rama de sargazo pelágico (esquema de Sargassum natans / fluitans): tallo ramificado, hojas dentadas y vesículas de gas.
function Sargazo({ x = 0, y = 0, s = 1, rot = 0, seed = 1, color = SG_CAFE, T = 0, o = 1, ves = true }) {
  const r = krng(seed), ram = [];
  const nR = 5;
  for (let i = 0; i < nR; i++) {
    const t = 0.15 + i * 0.17, lado = i % 2 ? 1 : -1, ang = lado * (45 + r() * 25), largo = 90 + r() * 60;
    ram.push({ t, ang, largo, hojas: [0.35 + r() * 0.1, 0.75 + r() * 0.1], vs: [0.55 + r() * 0.1, 1] , h2: r() });
  }
  const mv = Math.sin(T * 1.3 + seed) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${rot + mv * 0.4}) scale(${s})`} opacity={o}>
    <path d="M 0 0 Q 12 -150 0 -300" stroke={mixHex(color, '#000000', 0.25)} strokeWidth={9} fill="none" strokeLinecap="round" />
    {ram.map((b, i) => { const by = -300 * b.t, bx = 12 * Math.sin(Math.PI * b.t);
      return <g key={i} transform={`translate(${bx} ${by}) rotate(${b.ang - 90})`}>
        <line x1={0} y1={0} x2={b.largo} y2={0} stroke={mixHex(color, '#000000', 0.25)} strokeWidth={6} strokeLinecap="round" />
        {b.hojas.map((h, j) => <g key={j} transform={`translate(${b.largo * h} 0) rotate(${(j % 2 ? 40 : -40)})`}>
          <path d={sgHoja(70, 11)} fill={color} stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" />
          <line x1={4} y1={0} x2={64} y2={0} stroke={mixHex(color, '#000000', 0.35)} strokeWidth={2} /></g>)}
        {ves && b.vs.map((v, j) => <g key={'v' + j} transform={`translate(${b.largo * v} 0) rotate(${j ? 0 : 70})`}>
          <line x1={0} y1={0} x2={14} y2={0} stroke={KC.ink} strokeWidth={3} />
          <circle cx={22} cy={0} r={9} fill={mixHex(SG_VES, color, color === SG_CAFE ? 0 : 0.6)} stroke={KC.ink} strokeWidth={3} />
          <circle cx={19} cy={-3} r={3} fill="#fff" opacity=".6" /></g>)}
      </g>; })}
    <g transform="translate(0 -300) rotate(-80)"><path d={sgHoja(60, 10)} fill={color} stroke={KC.ink} strokeWidth={3.5} /></g>
  </g>;
}
// Montón de sargazo en la arena. podrido 0..1 lo oscurece. llega 0..1 lo empuja desde el mar.
function Monton({ x, y, s = 1, T, podrido = 0, llega = 1 }) {
  const c = mixHex(SG_CAFE, SG_PODRIDO, podrido);
  const piezas = [[-200, 10, -70, 3], [-110, -10, -20, 5], [-20, 0, 30, 7], [80, -5, 75, 9], [170, 12, 110, 11], [-150, 30, 10, 13], [40, 32, -40, 15], [130, 30, 60, 17]];
  return <g transform={`translate(${x} ${y + (1 - llega) * -160}) scale(${s})`} opacity={kclamp(llega * 1.6, 0, 1)}>
    <ellipse cx={0} cy={40} rx={290} ry={46} fill="rgba(0,0,0,.18)" />
    <path d="M -280 40 Q -240 -70 -100 -80 Q 0 -120 110 -80 Q 250 -70 280 40 Z" fill={mixHex('#7a5320', SG_PODRIDO, podrido)} stroke={KC.ink} strokeWidth={6} />
    {piezas.map(([px, py, rr, sd], i) => <Sargazo key={i} x={px} y={py + 30} s={0.42} rot={rr} seed={sd} color={c} T={T} />)}
  </g>;
}
// Playa caribeña: cielo, mar turquesa con olas y arena blanca. ola 0..1 = la ola que deja el sargazo.
function Playa({ T, mar = 760, ola = 1, cielo = '#7fdcff' }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={KW} height={mar - 200} fill={cielo} />
    <circle cx={160} cy={420} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <rect y={mar - 200} width={KW} height={260} fill="#19c3c9" />
    <rect y={mar - 200} width={KW} height={60} fill="#0f8fb8" />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${((i * 190 + T * 40) % 1240) - 120} ${mar - 120 + (i % 3) * 50} q 30 -14 60 0 t 60 0`} stroke="#d9fbff" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <path d={`M 0 ${mar + 60} Q 270 ${mar + 30} 540 ${mar + 60} T 1080 ${mar + 60} L 1080 1920 L 0 1920 Z`} fill="#f6e7bf" stroke={KC.ink} strokeWidth={6} />
    {ola < 1 && <path d={`M 0 ${mar + 60 + ola * 260} Q 270 ${mar + 20 + ola * 260} 540 ${mar + 60 + ola * 260} T 1080 ${mar + 60 + ola * 260} L 1080 ${mar + 40} L 0 ${mar + 40} Z`} fill="#bff6f2" opacity={0.85 * (1 - ola * 0.6)} stroke="#fff" strokeWidth={8} />}
    {Array.from({ length: 22 }, (_, i) => { const r = krng(i + 3); return <circle key={i} cx={r() * KW} cy={mar + 120 + r() * 1000} r={3 + r() * 3} fill="#e2cf9c" />; })}
  </svg>;
}
// Líneas de olor (verdes, onduladas) que suben.
function Olor({ T, x, y, n = 4, o = 1, color = '#7fbf3a' }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.6 + i / n) % 1);
    return <path key={i} d={`M ${x + (i - n / 2) * 70} ${y - u * 220} q 18 -25 0 -50 t 0 -50 t 0 -50`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />; })}</g>;
}
// Mapa esquemático del Atlántico tropical. lon -100..20, lat -10..35.
const AT = { x0: -100, k: 9, lat0: 35, y0: 690, ky: 11.4 };
const atP = (lon, lat) => [(lon - AT.x0) * AT.k, AT.y0 + (AT.lat0 - lat) * AT.ky];
const atPath = (pts) => 'M ' + pts.map(([a, b]) => atP(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
const AT_AMER = [[-100,35],[-76,35],[-80,32],[-81,30],[-80,26.5],[-80.6,25],[-81.8,26.5],[-82.8,28.5],[-84.5,30],[-89,30.3],[-94,29.5],[-97.2,27.5],[-97.6,24],[-97.5,21.2],[-96,19.1],[-94.5,18.2],[-91,18.6],[-90.4,21],[-87,21.5],[-87.5,19.2],[-88.3,16],[-84,15.8],[-83.4,14],[-83.6,11],[-81.5,8.9],[-77.5,8.5],[-75.5,10.8],[-71.5,12.4],[-68,10.6],[-62,10.7],[-60,8.5],[-57,6],[-52,5],[-50,1],[-48,-1],[-44,-2.5],[-39,-3],[-35,-5.5],[-35,-10],[-100,-10]];
const AT_CUBA = [[-85,21.9],[-80,23.2],[-74.2,20.2],[-77.5,19.8],[-82,21.6]];
const AT_ESP = [[-74.4,19.9],[-68.4,19],[-68.6,18.2],[-74.4,18.2]];
const AT_AFR = [[-6,35.8],[-9.5,32],[-10,29],[-13,27.5],[-16,23.5],[-17,21],[-16.5,16],[-17.5,14.7],[-16.7,12.5],[-13.5,9.5],[-11,7],[-7.5,4.4],[-2,4.8],[4,6.3],[8.5,4.5],[9.5,2],[9,-1],[12,-5],[13,-10],[20,-10],[20,35]];
const AT_CINTA = [[-17,9],[-25,8.5],[-33,8.5],[-41,10],[-49,11.5],[-56,13],[-63,14.5],[-70,15],[-77,16.5],[-83,18.5],[-86.5,21.5],[-89,25.5],[-92,26.5]];
function cintaEn(u) { const n = AT_CINTA.length - 1, f = kclamp(u, 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), q = f - i;
  return [klerp(AT_CINTA[i][0], AT_CINTA[i + 1][0], q), klerp(AT_CINTA[i][1], AT_CINTA[i + 1][1], q)]; }
function MapaAtlantico({ T, cinta = 1, regla = 0, sat = -1 }) {
  const blobs = [];
  for (let i = 0; i < 70; i++) { const u = i / 69; if (u > cinta) break; const [lo, la] = cintaEn(u); const [px, py] = atP(lo, la); const r = krng(i + 40);
    blobs.push(<ellipse key={i} cx={px + (r() - 0.5) * 30} cy={py + (r() - 0.5) * 26} rx={26 + r() * 16} ry={11 + r() * 7} fill={i % 3 ? SG_CAFE : SG_CAFE2} stroke={KC.ink} strokeWidth={2.5} opacity={0.92} transform={`rotate(${(r() - 0.5) * 30} ${px} ${py})`} />); }
  const reglaPts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; if (u > regla) break; reglaPts.push(atP(...cintaEn(u)).map((v) => v.toFixed(1)).join(',')); }
  const [sx, sy] = sat >= 0 ? atP(...cintaEn(sat)) : [0, 0];
  return <g>
    <rect x={0} y={AT.y0 - 20} width={KW} height={AT.ky * 45 + 40} fill="#2b7fd0" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 4 }, (_, i) => <line key={i} x1={0} x2={KW} y1={AT.y0 + 100 + i * 110} y2={AT.y0 + 100 + i * 110} stroke="rgba(255,255,255,.12)" strokeWidth={3} />)}
    <path d={atPath(AT_AMER)} fill="#9fdc84" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={atPath(AT_CUBA)} fill="#9fdc84" stroke={KC.ink} strokeWidth={4} />
    <path d={atPath(AT_ESP)} fill="#9fdc84" stroke={KC.ink} strokeWidth={4} />
    <path d={atPath(AT_AFR)} fill="#f2cf7a" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {blobs}
    {reglaPts.length > 1 && <polyline points={reglaPts.join(' ')} fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="22 12" strokeLinecap="round" />}
    {sat >= 0 && <g transform={`translate(${sx} ${sy - 150})`}>
      <path d={`M 0 20 L -60 150 L 60 150 Z`} fill="rgba(255,255,255,.18)" />
      <rect x={-22} y={-16} width={44} height={36} rx={6} fill="#dfe6ee" stroke={KC.ink} strokeWidth={5} />
      <rect x={-92} y={-8} width={62} height={20} fill="#3a6fd8" stroke={KC.ink} strokeWidth={4} />
      <rect x={30} y={-8} width={62} height={20} fill="#3a6fd8" stroke={KC.ink} strokeWidth={4} /></g>}
    {(() => { const [qx, qy] = atP(-87.2, 20.3); return <g><circle cx={qx} cy={qy} r={11} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>; })()}
  </g>;
}
// Corte de un coral con bandas de crecimiento (esquema).
function CoralCorte({ x, y, T, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -170 160 Q -180 -40 -90 -120 Q 0 -190 90 -120 Q 180 -40 170 160 Z" fill="#f3d9c4" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => { const k = 1 - i * 0.1; if (i / 9 > p) return null;
      return <path key={i} d={`M ${-160 * k} 160 Q ${-170 * k} ${-30 * k} ${-85 * k} ${-110 * k + (1 - k) * 60} Q 0 ${-175 * k + (1 - k) * 90} ${85 * k} ${-110 * k + (1 - k) * 60} Q ${170 * k} ${-30 * k} ${160 * k} 160`} fill="none" stroke={i % 2 ? '#c98d6a' : '#a8663f'} strokeWidth={5} />; })}
    <line x1={-190} y1={160} x2={190} y2={160} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Columna de océano con surgencia en el ecuador: agua profunda que sube con fósforo (P).
function Surgencia({ x, y, w = 440, h = 470, T, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><linearGradient id="sgOc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3fb3e8" /><stop offset="1" stopColor="#0c2b5c" /></linearGradient></defs>
    <rect x={0} y={0} width={w} height={h} rx={24} fill="url(#sgOc)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 0 40 q ${w / 8} -16 ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0`} stroke="#d9fbff" strokeWidth={5} fill="none" />
    {[0.3, 0.5, 0.7].map((q, i) => <path key={i} d={`M ${w * q} ${h - 30} Q ${w * q + (i - 1) * 40} ${h / 2} ${w * q} 70`} stroke="#bfe9ff" strokeWidth={8} fill="none" strokeDasharray="18 14" strokeDashoffset={T * 60} opacity={p} markerEnd="" />)}
    {Array.from({ length: 9 }, (_, i) => { const u = ((T * 0.35 + i / 9) % 1); const px = w * (0.25 + (i % 3) * 0.25) + Math.sin(T * 2 + i) * 10, py = (h - 40) - u * (h - 110);
      return <g key={i} opacity={p * Math.sin(Math.PI * u)} transform={`translate(${px} ${py})`}><circle r={22} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
        <text y={9} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill="#fff">P</text></g>; })}
  </g>;
}
// Microbio pegado a la hoja (esquema): cadenita de células.
function Microbio({ x, y, rot = 0, T, seed = 1 }) {
  const b = Math.sin(T * 3 + seed) * 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot + b})`}>
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={i * 26} cy={0} r={13} fill="#3ad6c4" stroke={KC.ink} strokeWidth={3.5} />)}
    {[0, 1, 2, 3].map((i) => <circle key={'b' + i} cx={i * 26 - 4} cy={-4} r={4} fill="#fff" opacity=".5" />)}
  </g>;
}
// Molécula de N2 del aire (dos esferas unidas).
function N2({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <line x1={-18} y1={0} x2={18} y2={0} stroke="#fff" strokeWidth={8} />
    {[-18, 18].map((dx) => <g key={dx}><circle cx={dx} r={20} fill="#6d8cff" stroke={KC.ink} strokeWidth={4} /><text x={dx} y={8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill="#fff">N</text></g>)}
  </g>;
}
// Huevo podrido caricatura.
function Huevo({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 4) * 4})`}>
    <path d="M 0 -110 C 70 -110 95 10 80 50 C 65 100 -65 100 -80 50 C -95 10 -70 -110 0 -110 Z" fill="#e8e3b0" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -20 L -30 -40 L -10 -15 L 20 -45 L 45 -18" stroke={KC.ink} strokeWidth={6} fill="none" />
    <circle cx={-25} cy={20} r={8} fill={KC.ink} /><circle cx={25} cy={20} r={8} fill={KC.ink} />
    <path d="M -25 60 Q 0 40 25 60" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -50 -20 Q -40 30 -55 60" stroke="#9bbf3a" strokeWidth={8} fill="none" opacity=".7" />
  </g>;
}
// Pez y cangrejo esquemáticos (vivo = colores; muerto = gris y de lado).
function Pez({ x, y, s = 1, muerto = 0, color = '#ffb03a' }) {
  const c = mixHex(color, '#9aa0a6', muerto);
  return <g transform={`translate(${x} ${y}) rotate(${muerto * 180}) scale(${s})`}>
    <path d="M -60 0 Q -20 -40 40 -10 L 70 -30 L 70 30 L 40 10 Q -20 40 -60 0 Z" fill={c} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-35} cy={-6} r={6} fill={KC.ink} />{muerto > 0.5 && <path d="M -42 -14 L -28 2 M -28 -14 L -42 2" stroke="#fff" strokeWidth={3} />}
  </g>;
}
function Cangrejo({ x, y, s = 1, muerto = 0 }) {
  const c = mixHex('#ff5a3a', '#9aa0a6', muerto);
  return <g transform={`translate(${x} ${y}) rotate(${muerto * 180}) scale(${s})`}>
    {[-1, 1].map((d) => <g key={d}>{[0, 1, 2].map((i) => <line key={i} x1={d * 30} y1={5 + i * 8} x2={d * 62} y2={18 + i * 14} stroke={KC.ink} strokeWidth={5} />)}
      <circle cx={d * 58} cy={-30} r={16} fill={c} stroke={KC.ink} strokeWidth={4} /></g>)}
    <ellipse rx={44} ry={28} fill={c} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-12} cy={-20} r={5} fill={KC.ink} /><circle cx={12} cy={-20} r={5} fill={KC.ink} />
  </g>;
}
function Tortuga({ x, y, s = 1, T }) {
  const a = Math.sin(T * 3) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={-50} cy={-30} rx={30} ry={12} fill="#7fc46a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-30 + a} -30 -10)`} />
    <ellipse cx={-50} cy={30} rx={30} ry={12} fill="#7fc46a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${30 - a} -30 10)`} />
    <circle cx={68} cy={0} r={20} fill="#7fc46a" stroke={KC.ink} strokeWidth={4} /><circle cx={76} cy={-6} r={4} fill={KC.ink} />
    <ellipse rx={60} ry={42} fill="#5f8f3a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -30 -20 L 0 -30 L 30 -20 L 30 20 L 0 30 L -30 20 Z" fill="none" stroke="#3f6a26" strokeWidth={4} />
  </g>;
}
function Ave({ x, y, s = 1, T }) {
  const a = Math.sin(T * 6) * 18;
  return <path transform={`translate(${x} ${y}) scale(${s})`} d={`M -60 ${a} Q -30 -20 0 0 Q 30 -20 60 ${a}`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />;
}

function SargazoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Al: CUES.Alga, Ci: CUES.Cinturon, Cf: CUES.Cifra, H: CUES.Hoy, P: CUES.Pregunta, E: CUES.Estudio, N: CUES.Nitrogeno, Pl: CUES.Playa, M: CUES.Muertes, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 1) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const ola = kprog(T, K.G - 0.3, K.G + 0.9, kEase.sale);
  const pod = kprog(T, K.Pl + 0.8, K.Pl + 3.5, kEase.suave);
  const cinta = kprog(T, K.Ci + 0.6, K.Ci + 4.6, kEase.suave);
  const regla = kprog(T, K.Cf + 0.3, K.Cf + 2.0, kEase.sale);
  const g18 = kprog(T, K.H + 0.2, K.H + 1.0, kEase.sale), g25 = kprog(T, K.H + 1.3, K.H + 2.6, kEase.sale);
  const ox = 1 - kprog(T, K.M + 0.4, K.M + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la playa de Quintana Roo con el montón de sargazo que apesta */}
      <Escena T={T} a={K.G - 1} b={K.Ci}>
        <Playa T={T} ola={ola} />
        {svg(<><Monton x={420} y={1040} s={1.1} T={T} llega={ola} /><Olor T={T} x={420} y={960} o={kprog(T, K.G + 0.4, K.G + 1.0)} /></>, 2)}
      </Escena>
      <Lupa T={T} at={K.Al + 0.1} until={K.Ci - 0.25} x={420} y={790} r={270} fx={420} fy={1000} tinte={KC.yellow}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0f4d7a" />
          <Sargazo x={r - 10} y={r * 2 - 20} s={1.55} seed={5} T={T} />
          <line x1={r + 120} y1={95} x2={r + 175} y2={60} stroke="#fff" strokeWidth={4} />
          <text x={r + 30} y={50} style={{ font:`700 30px ${KF.mono}` }} fill="#fff">vesícula de gas</text></svg>} />

      {/* 2–3 · el cinturón en el mapa del Atlántico (esquema) */}
      <Escena T={T} a={K.Ci} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<MapaAtlantico T={T} cinta={cinta} regla={regla} sat={T < K.Cf ? kclamp(1 - (T - K.Ci - 0.6) / 4, 0, 1) : -1} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · 2018 vs 2025 */}
      <Escena T={T} a={K.H} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <line x1={90} y1={1080} x2={990} y2={1080} stroke={KC.ink} strokeWidth={8} />
          <rect x={170} y={1080 - 274 * g18} width={240} height={274 * g18} rx={16} fill={SG_CAFE} stroke={KC.ink} strokeWidth={7} />
          <rect x={620} y={1080 - 520 * g25} width={240} height={520 * g25} rx={16} fill={SG_CAFE2} stroke={KC.ink} strokeWidth={7} />
          {[0, 1, 2].map((i) => <Sargazo key={i} x={210 + i * 80} y={1075} s={0.28 * g18} seed={i + 21} T={T} />)}
          {[0, 1, 2, 3, 4].map((i) => <Sargazo key={'b' + i} x={655 + (i % 3) * 80} y={1075 - Math.floor(i / 3) * 240} s={0.28 * g25} seed={i + 31} T={T} />)}
          <text x={290} y={1130} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>jun 2018 · el cinturón</text>
          <text x={740} y={1130} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>jul 2025 · todo el Atlántico</text>
          {g18 > 0.6 && <text x={290} y={1080 - 274 - 26} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>+20 mill. t</text>}
          {g25 > 0.6 && <text x={740} y={1080 - 520 - 26} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>~38 mill. t</text>}
        </>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <Sargazo x={300} y={1180} s={0.6} seed={8} T={T} /></>)}
      </Escena>
      {/* 6 · el estudio: corales del Caribe y fósforo que sube en el ecuador (hipótesis) */}
      <Escena T={T} a={K.E} b={K.N}>
        <FondoLunares color={KC.cyan} />
        {svg(<><CoralCorte x={280} y={920} T={T} p={kprog(T, K.E + 1.8, K.E + 3.0)} />
          <text x={280} y={1130} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>coral en corte (esquema)</text>
          <g opacity={kprog(T, K.E + 2.6, K.E + 3.2)}><Surgencia x={560} y={680} T={T} />
            <text x={780} y={1190} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Atlántico ecuatorial</text></g></>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.1} until={K.E + 2.3} anio="2025" quien="corales del Caribe" revista="Nature Geoscience · hipótesis" x={540} y={850} />
      {/* 7 · microbios del alga que fijan nitrógeno (fondo oscuro, esquema) */}
      <Escena T={T} a={K.N} b={K.Pl}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #12305a 0%, ${KC.noche} 75%)` }}></div>
        {svg(<>
          <g transform="translate(60 960)"><path d={sgHoja(960, 120)} fill={SG_CAFE} stroke={KC.ink} strokeWidth={8} /><line x1={30} y1={0} x2={930} y2={0} stroke={SG_CAFE2} strokeWidth={8} /></g>
          {Array.from({ length: 7 }, (_, i) => <Microbio key={i} x={170 + i * 120} y={850 + (i % 2) * 10} rot={-10 + (i % 3) * 8} T={T} seed={i} />)}
          {Array.from({ length: 6 }, (_, i) => { const u = kclamp(((T - K.N) * 0.5 + i / 6) % 1, 0, 1); return <N2 key={i} x={210 + i * 130} y={560 + u * 260} s={0.9} o={Math.sin(Math.PI * u)} />; })}
          {Array.from({ length: 8 }, (_, i) => { const u = ((T * 0.7 + i / 8) % 1); return <g key={'n' + i} opacity={kprog(T, K.N + 1.0, K.N + 1.5) * Math.sin(Math.PI * u)}>
            <circle cx={200 + i * 100} cy={880 + u * 120} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
            <text x={200 + i * 100} y={886 + u * 120} textAnchor="middle" style={{ font:`900 16px ${KF.texto}` }} fill={KC.ink}>N</text></g>; })}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 8 · de regreso a la playa: 48 h pudriéndose → ácido sulfhídrico */}
      <Escena T={T} a={K.Pl} b={K.M}>
        <Playa T={T} />
        {svg(<><Monton x={420} y={1040} s={1.1} T={T} podrido={pod} />
          <Olor T={T} x={420} y={960} n={5} o={0.4 + pod * 0.6} color={mixHex('#7fbf3a', '#5a7a20', pod)} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.45 + i / 6) % 1); return <g key={i} opacity={pod * Math.sin(Math.PI * u)} transform={`translate(${250 + i * 70} ${920 - u * 280})`}>
            <circle r={34} fill="rgba(200,230,120,.85)" stroke={KC.ink} strokeWidth={4} /><text y={9} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>H₂S</text></g>; })}
          <g opacity={kprog(T, K.Pl + 3.2, K.Pl + 3.8)}><Huevo x={850} y={980} s={1} T={T} /></g>
          {(() => { const c = kprog(T, K.Pl + 0.3, K.Pl + 3.5); return <g transform="translate(540 470)"><circle r={95} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <path d={`M 0 0 L 0 -80 A 80 80 0 ${c > 0.5 ? 1 : 0} 1 ${80 * Math.sin(c * 2 * Math.PI)} ${-80 * Math.cos(c * 2 * Math.PI)} Z`} fill={KC.orange} opacity=".7" />
            <line x1={0} y1={0} x2={70 * Math.sin(c * 12 * Math.PI)} y2={-70 * Math.cos(c * 12 * Math.PI)} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
            <text y={150} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{kformato(48 * c, 0)} h</text></g>; })()}
        </>, 2)}
      </Escena>
      {/* 9 · el agua de la orilla: poco oxígeno, 78 especies muertas (2018) */}
      <Escena T={T} a={K.M} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex('#3fb3c8', '#6b5528', 1 - ox * 0.6)}, ${mixHex('#1d6b80', '#3a2c14', 1 - ox * 0.5)})` }}></div>
        {svg(<>
          <g transform="translate(150 1160)"><rect x={-60} y={-480} width={120} height={480} rx={20} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
            <rect x={-50} y={-470 * (0.15 + 0.85 * ox)} width={100} height={470 * (0.15 + 0.85 * ox) - 10} rx={14} fill={ox > 0.4 ? '#4fc3ff' : KC.red} />
            <text y={50} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">oxígeno</text></g>
          {[[400, 760, 0], [640, 700, 1], [860, 800, 2], [470, 960, 3], [760, 980, 4]].map(([px, py, i]) => { const m = kprog(T, K.M + 1.2 + i * 0.45, K.M + 1.8 + i * 0.45, kEase.suave);
            return i === 3 ? <Cangrejo key={i} x={px} y={py + m * 60} s={1} muerto={m} /> : <Pez key={i} x={px} y={py - m * 40} s={1.1} muerto={m} color={['#ffb03a', '#ff6fb1', '#ffe11a', '', '#7affc4'][i]} />; })}
          {Array.from({ length: 10 }, (_, i) => { const r = krng(i + 70); return <circle key={'p' + i} cx={300 + r() * 760} cy={600 + ((r() * 600 + T * 30) % 600)} r={4 + r() * 6} fill="rgba(60,40,15,.55)" />; })}
        </>)}
      </Escena>
      {/* 10 · cierre: la misma imagen del inicio, ahora con el mar abierto donde es refugio */}
      <Escena T={T} a={K.C} b={FIN}>
        <Playa T={T} mar={1000} cielo="#9be6ff" />
        {svg(<>
          <rect x={0} y={560} width={KW} height={300} fill="#1f8fd0" stroke={KC.ink} strokeWidth={6} />
          <path d="M 0 560 q 60 -14 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0" stroke="#d9fbff" strokeWidth={6} fill="none" />
          {[0, 1, 2, 3, 4].map((i) => <Sargazo key={i} x={420 + i * 70} y={600} s={0.3} rot={180} seed={50 + i} T={T} />)}
          <rect x={380} y={548} width={380} height={26} rx={13} fill={SG_CAFE} stroke={KC.ink} strokeWidth={4} />
          <Pez x={330 + Math.sin(T) * 20} y={700} s={0.7} /><Pez x={560 + Math.sin(T + 2) * 20} y={760} s={0.6} color="#ff6fb1" /><Pez x={850 + Math.sin(T + 4) * 20} y={690} s={0.7} color="#ffe11a" />
          <Tortuga x={640 + Math.sin(T * 0.8) * 30} y={680} s={0.8} T={T} />
          <Ave x={250} y={430} s={0.8} T={T} /><Ave x={420} y={380} s={0.6} T={T + 1} />
          <text x={60} y={840} style={{ font:`900 32px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">mar abierto</text>
          <Monton x={420} y={1130} s={0.8} T={T} podrido={0.6} />
          <Olor T={T} x={420} y={1070} n={3} o={0.7} />
          <text x={780} y={1160} style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>tu playa</text>
        </>, 2)}
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.4} until={K.Al - 0.2} texto="BASURA" x={330} y={470} tam={60} />
      <Chip T={T} at={K.G + 3.0} until={K.Al - 0.2} texto="un alga viajera" x={330} y={590} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.G + 3.4} until={K.Al - 0.2} x={120} y={1200} texto="Quintana Roo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Al + 0.6} until={K.Ci - 0.2} x={90} y={1150} texto="Sargassum natans · S. fluitans" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Al + 0.8} until={K.Ci - 0.2} texto="flota con vesículas de gas" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 0.3} until={K.Cf - 0.2} texto="satélites: desde 2011" y={470} x={360} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Ci + 3.6} until={K.Cf - 0.2} x={850} y={1060} texto="África Occ." lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ci + 4.6} until={K.Cf - 0.2} x={300} y={660} texto="Golfo de México" lado="izq" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.Cf + 0.3} until={K.H - 0.2} valor={8850} dur={1.6} sufijo=" km" x={680} y={470} tam={140} color={KC.yellow} />
      <Chip T={T} at={K.Cf + 2.8} until={K.H - 0.2} texto="+20 millones de toneladas · jun 2018" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.H + 2.8} until={K.P - 0.2} texto="áreas medidas distintas" y={430} x={360} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.3} until={K.Pl - 0.2} texto="propuesta (hipótesis): fósforo + nitrógeno" y={1440} x={540} tam={30} borde={KC.pink} />
      <Etq T={T} at={K.N + 0.4} until={K.Pl - 0.2} x={760} y={1110} texto="hoja del alga" tam={28} color={KC.texto} />
      <Etq T={T} at={K.N + 0.8} until={K.Pl - 0.2} x={80} y={780} texto="microbios (esquema)" tam={28} color={KC.texto} />
      <Etq T={T} at={K.N + 0.6} until={K.Pl - 0.2} x={80} y={500} texto="N₂ del aire" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Pl + 1.2} until={K.M - 0.2} texto="H₂S · ácido sulfhídrico" y={1440} x={540} tam={34} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.M + 1.2} until={K.C - 0.2} valor={78} dur={2.2} sufijo=" especies" x={380} y={470} tam={100} color={KC.yellow} />
      <Chip T={T} at={K.M + 0.5} until={K.C - 0.2} texto="Caribe mexicano · 2018" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="mar: refugio · playa: problema" y={1440} x={540} tam={36} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Al - 0.1} texto="No es basura: *viajó miles de km.*" />
      <Subtitulo T={T} idx={1} at={K.Al + 0.1} until={K.Ci - 0.1} texto="Flota con *bolitas de gas.*" />
      <Subtitulo T={T} idx={2} at={K.Ci + 0.1} until={K.Cf - 0.1} texto="Desde 2011: *de África al Golfo.*" />
      <Subtitulo T={T} idx={3} at={K.Cf + 0.1} until={K.H - 0.1} texto="Junio de 2018: *8,850 km.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.P - 0.1} texto="Julio de 2025: *~38 millones de t.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué lo hace *crecer tanto?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.N - 0.1} texto="Propuesta: *fósforo del fondo.*" />
      <Subtitulo T={T} idx={7} at={K.N + 0.1} until={K.Pl - 0.1} texto="Microbios le dan *nitrógeno.*" />
      <Subtitulo T={T} idx={8} at={K.Pl + 0.1} until={K.M - 0.1} texto="48 horas: *huevo podrido.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="2018: *78 especies muertas.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Refugio en el mar, *problema en tu playa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cinturon + 1.5, CUES.Cinturon + 5.5, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cifra + 2.5, CUES.Hoy - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.2, CUES.Nitrogeno - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Nitrogeno + 1.1, CUES.Playa - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Playa + 2.4, CUES.Muertes - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Muertes + 1.7, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.9, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SargazoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SargazoShot /></CompositionStage></div>;
}
window.SargazoApp = SargazoApp;
