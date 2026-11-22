// Shot Ambiental #25 · Un día antes, el pronóstico decía poco más de 100 km/h: Otis llegó con casi 260 — NARRADO (N3 capítulos y medidores).
// Datos: NHC Tropical Cyclone Report de Otis (Reinhart y Reinhart, 2024), discusión #7 del NHC (23 oct 2023), glosario NHC y escala
// Saffir-Simpson, NOAA NESDIS. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const KT = 1.852; // km/h por nudo
// Mejor trayectoria (Tabla 1 del TCR): [hora desde 22/1200 UTC, lon, lat, nudos]
const OT_TRACK = [[0, -96.7, 9.8, 30], [6, -96.9, 10.2, 35], [12, -97.1, 10.8, 35], [18, -97.2, 11.4, 35], [24, -97.3, 11.9, 40], [30, -97.6, 12.6, 45],
  [36, -98.0, 13.3, 50], [42, -98.5, 13.8, 55], [48, -98.9, 14.2, 65], [54, -99.4, 14.9, 100], [60, -99.6, 15.7, 130], [63, -99.7, 16.1, 145],
  [66, -99.8, 16.7, 145], [66.75, -99.9, 16.8, 140]];
function otEn(h) { // interpolación lineal en la trayectoria → { lon, lat, kt }
  const P = OT_TRACK; if (h <= P[0][0]) return { lon: P[0][1], lat: P[0][2], kt: P[0][3] };
  for (let i = 1; i < P.length; i++) if (h <= P[i][0]) { const a = P[i - 1], b = P[i], u = (h - a[0]) / (b[0] - a[0]);
    return { lon: klerp(a[1], b[1], u), lat: klerp(a[2], b[2], u), kt: klerp(a[3], b[3], u) }; }
  const z = P[P.length - 1]; return { lon: z[1], lat: z[2], kt: z[3] };
}
// Mapa: MapaMexico con ancho 2000 desplazado para que Acapulco quede arriba al centro.
const OM = { x: -302, y: -130, s: 2 };
function otP(lon, lat) { const [a, b] = mxProy(lon, lat); return [OM.x + a * OM.s, OM.y + b * OM.s]; }
// Colores de la escala Saffir-Simpson (km/h): tormenta tropical 63–118 · cat 1 119–153 · 2 154–177 · 3 178–208 · 4 209–251 · 5 ≥ 252
const OT_BANDAS = [[0, 63, '#a9b8c8', ''], [63, 119, KC.cyan, 'TT'], [119, 154, '#fff06a', '1'], [154, 178, KC.gold2, '2'], [178, 209, KC.orange, '3'], [209, 252, KC.red, '4'], [252, 300, '#c21fd6', '5']];
function otColor(kmh) { for (const b of OT_BANDAS) if (kmh < b[1]) return b[2]; return '#c21fd6'; }

// Velocímetro de viento (semicírculo 0–300 km/h) con franjas de la escala. valor y pron en km/h (pron = aguja punteada del pronóstico).
function Velocimetro({ x, y, r, valor, pron = null, max = 300, lectura = true, o = 1 }) {
  const ang = (v) => Math.PI * (1 - kclamp(v, 0, max) / max);
  const pt = (v, rr) => [x + rr * Math.cos(ang(v)), y - rr * Math.sin(ang(v))];
  const arco = (v0, v1, rr) => { const [a, b] = pt(v0, rr), [c, d] = pt(v1, rr); return `M ${a} ${b} A ${rr} ${rr} 0 0 1 ${c} ${d}`; };
  const R = r * 1.12;
  const [nx, ny] = pt(valor, r * 0.86), a = ang(valor), w = r * 0.05;
  return <g opacity={o}>
    <path d={`M ${x - R} ${y} A ${R} ${R} 0 0 1 ${x + R} ${y} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {OT_BANDAS.map(([v0, v1, c, t], i) => <g key={i}>
      <path d={arco(v0, v1, r * 0.94)} stroke={c} strokeWidth={r * 0.17} fill="none" />
      {t && (() => { const [tx, ty] = pt((v0 + v1) / 2, r * 0.94); return <text x={tx} y={ty + r * 0.03} textAnchor="middle" style={{ font:`900 ${r * 0.085}px ${KF.texto}` }} fill={KC.ink}>{t}</text>; })()}
    </g>)}
    <path d={arco(0, max, r * 1.025)} stroke={KC.ink} strokeWidth={5} fill="none" />
    <path d={arco(0, max, r * 0.855)} stroke={KC.ink} strokeWidth={4} fill="none" />
    {[0, 50, 100, 150, 200, 250, 300].map((v) => { const [a1, b1] = pt(v, r * 0.85), [a2, b2] = pt(v, r * 0.78), [tx, ty] = pt(v, r * 0.68);
      return <g key={v}><line x1={a1} y1={b1} x2={a2} y2={b2} stroke={KC.ink} strokeWidth={5} />
        <text x={tx + (v === 300 ? -r * 0.04 : v === 0 ? r * 0.04 : 0)} y={ty + ((v === 0 || v === 300) ? -r * 0.06 : r * 0.03)} textAnchor="middle" style={{ font:`700 ${r * 0.075}px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>; })}
    {pron != null && (() => { const [px, py] = pt(pron, r * 0.84); return <line x1={x} y1={y} x2={px} y2={py} stroke="#5d6673" strokeWidth={r * 0.035} strokeDasharray={`${r * 0.07} ${r * 0.045}`} strokeLinecap="round" />; })()}
    <polygon points={`${nx},${ny} ${x + w * Math.sin(a)},${y + w * Math.cos(a)} ${x - w * Math.sin(a)},${y - w * Math.cos(a)}`} fill={KC.red} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={x} cy={y} r={r * 0.08} fill={KC.ink} />
    {lectura && <text x={x} y={y + r * 0.3} textAnchor="middle" style={{ font:`400 ${r * 0.26}px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={r * 0.035} paintOrder="stroke">{Math.round(valor)} km/h</text>}
  </g>;
}

// Huracán visto desde el satélite (esquema): bandas en espiral de "nubes". org 0..1 (desordenado → compacto), ojo 0..1, inclina = empuje al oeste.
function Huracan({ T, x, y, r, org = 1, ojo = 0, inclina = 0, vel = 1, o = 1, seed = 3 }) {
  const rnd = krng(seed), puffs = [];
  for (let arm = 0; arm < 3; arm++) for (let k = 0; k < 9; k++) {
    const u = k / 8, j = (rnd() - 0.5) * (1 - org) * r * 0.5, j2 = (rnd() - 0.5) * (1 - org) * r * 0.5;
    const ang = (arm * 120 - u * 210) * Math.PI / 180, rad = r * (0.2 + 0.8 * u);
    puffs.push({ x: Math.cos(ang) * rad + j, y: Math.sin(ang) * rad + j2, r: r * (0.24 - 0.14 * u) * (0.75 + 0.25 * org) });
  }
  const rot = -T * 40 * vel, dx = -inclina * r * 0.45;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <g transform={`translate(${dx} 0) rotate(${rot})`}>
      {puffs.map((p, i) => <circle key={'b' + i} cx={p.x} cy={p.y} r={p.r + 5} fill={KC.ink} />)}
      <circle r={r * 0.34 + 5} fill={KC.ink} />
      {puffs.map((p, i) => <circle key={'w' + i} cx={p.x} cy={p.y} r={p.r} fill="#f5f8ff" />)}
      <circle r={r * 0.34} fill="#ffffff" />
    </g>
    {ojo > 0 && <circle cx={dx * 0.3} cy={0} r={r * 0.09 * ojo} fill="#1c3f6e" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Flechas de "viento de altura" (cizalladura del este: empujan hacia el oeste). f 0..1 = fuerza.
function VientoAltura({ T, x, y, f = 1 }) {
  return <g opacity={0.35 + 0.65 * f}>{[0, 1, 2].map((i) => { const L = 60 + 170 * f, u = ((T * 0.8 + i * 0.33) % 1), xx = x + 120 - u * 140, yy = y + i * 46;
    return <g key={i}><line x1={xx} y1={yy} x2={xx - L} y2={yy} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <path d={`M ${xx - L - 22} ${yy} l 26 -18 l 0 36 Z`} fill={KC.ink} /></g>; })}</g>;
}
// Avión de reconocimiento visto desde arriba (turbohélice de 4 motores, ala alta; esquema). Nariz hacia +x.
function AvionCaza({ x, y, rot = 0, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-20} y={-150} width={58} height={300} rx={18} fill="#e9edf2" stroke={KC.ink} strokeWidth={6} />
    {[-110, -55, 55, 110].map((e) => <g key={e}><rect x={30} y={e - 12} width={34} height={24} rx={8} fill="#c9d1db" stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={70} cy={e} rx={5} ry={26 + 4 * Math.sin(T * 40 + e)} fill={KC.ink} opacity={0.7} /></g>)}
    <ellipse cx={0} cy={0} rx={120} ry={26} fill="#f4f6f9" stroke={KC.ink} strokeWidth={6} />
    <rect x={-118} y={-60} width={30} height={120} rx={10} fill="#e9edf2" stroke={KC.ink} strokeWidth={5} />
    <rect x={-126} y={-8} width={30} height={16} rx={6} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <path d="M 95 -12 Q 120 0 95 12" fill="#7fb8e6" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Barómetro de carátula: baja 0..1 = cuánto cayó la presión (0 → −10 mb).
function Barometro({ x, y, r = 120, baja = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 12} fill="#b9894d" stroke={KC.ink} strokeWidth={7} />
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 11 }, (_, i) => { const t = (-150 + i * 30) * Math.PI / 180; return <line key={i} x1={Math.sin(t) * r * 0.78} y1={-Math.cos(t) * r * 0.78} x2={Math.sin(t) * r * 0.92} y2={-Math.cos(t) * r * 0.92} stroke={KC.ink} strokeWidth={4} />; })}
    <text y={r * 0.5} textAnchor="middle" style={{ font:`700 ${r * 0.2}px ${KF.mono}` }} fill={KC.ink}>mb</text>
    <g transform={`rotate(${-baja * 70})`}><line x1={0} y1={14} x2={0} y2={-r * 0.82} stroke={KC.red} strokeWidth={8} strokeLinecap="round" /></g>
    <circle r={12} fill={KC.ink} />
  </g>;
}
// Costa con la bahía de Acapulco (esquema, vista desde arriba; el mar abajo).
const OT_COSTA = 'M 0 0 H 1080 V 800 Q 930 812 790 796 Q 760 650 560 632 Q 380 646 350 796 Q 200 812 0 790 Z';

function OtisShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, To: CUES.Tormenta, Ma: CUES.Mar, Mo: CUES.Motor, P: CUES.Pregunta, R: CUES.Rapida, Av: CUES.Avion, Ti: CUES.Tierra, Re: CUES.Record, Vi: CUES.Victimas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const PRON = 55 * KT, REAL = 140 * KT; // 102 km/h (pronóstico de 24 h de la discusión #7) · 259 km/h al tocar tierra
  // aguja del gancho: sube al pronóstico y luego se dispara al valor real
  const vG = klerp(0, 105, kprog(T, K.G + 0.15, K.G + 1.1, kEase.sale)) + (REAL - 105) * kprog(T, K.G + 5.8, K.G + 6.9, kEase.sale);
  const vC = klerp(105, REAL, kprog(T, K.C + 2.0, K.C + 3.0, kEase.sale));
  // mapa con el mar y la trayectoria hasta la hora h
  const mapa = (h, calor, extra) => <>
    <rect width={KW} height={KH} fill={'#3a9ad9'} />
    <defs><radialGradient id="otsst"><stop offset="0%" stopColor="#ff7a1a" stopOpacity=".95" /><stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" /></radialGradient></defs>
    {calor > 0 && <ellipse cx={otP(-99, 14.6)[0]} cy={otP(-99, 14.6)[1]} rx={430} ry={260} fill="url(#otsst)" opacity={calor} />}
    <MapaMexico x={OM.x} y={OM.y} ancho={2000} />
    {(() => { const pts = []; for (let hh = 0; hh <= h; hh += 1) { const p = otEn(hh); pts.push(otP(p.lon, p.lat)); } const p = otEn(h); pts.push(otP(p.lon, p.lat));
      return <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={KC.white} strokeWidth={8} strokeDasharray="4 16" strokeLinecap="round" />; })()}
    {(() => { const [ax, ay] = otP(-99.9, 16.85); return <g><circle cx={ax} cy={ay} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>; })()}
    {extra}
  </>;
  const hTo = klerp(12, 30, kprog(T, K.To + 0.2, K.Ma - 0.2, kEase.suave));
  const hMa = klerp(30, 42, kprog(T, K.Ma + 0.2, K.Mo - 0.3, kEase.suave));
  const pTo = otEn(hTo), pMa = otEn(hMa);
  const shearMa = 1 - kprog(T, K.Ma + 3.4, K.Ma + 5.0, kEase.suave);
  // barras de la intensificación rápida (5 px por km/h)
  const b1 = 30 * KT * 5 * kprog(T, K.R + 1.5, K.R + 2.3, kEase.sale), b2 = 90 * KT * 5 * kprog(T, K.R + 3.6, K.R + 6.6, kEase.suave);
  const horas = 21 * kprog(T, K.R + 3.6, K.R + 6.6, kEase.suave);
  // avión: dos pasadas por el centro
  const HX = 400, HY = 840;
  const pa1 = kprog(T, K.Av + 0.3, K.Av + 2.3), pa2 = kprog(T, K.Av + 2.6, K.Av + 4.6);
  const hTi = kprog(T, K.Ti + 0.2, K.Ti + 2.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: medidor de viento, pronóstico vs. realidad */}
      <Escena T={T} a={K.G} b={K.To}>
        <FondoLunares color={KC.yellow} />
        {svg(<Velocimetro x={380} y={990} r={300} valor={vG} pron={T > K.G + 0.2 ? 105 : null} o={1 - kprog(T, K.To - 0.95, K.To - 0.45)} />)}
      </Escena>
      {/* 1 · cap. 1: tormenta tropical frenada por el viento de altura (23 oct 2023) */}
      <Escena T={T} a={K.To} b={K.Ma}>
        {svg(mapa(hTo, 0, <>
          <Huracan T={T} x={otP(pTo.lon, pTo.lat)[0]} y={otP(pTo.lon, pTo.lat)[1]} r={110} org={0.15} inclina={1} vel={0.6} />
          <VientoAltura T={T} x={otP(pTo.lon, pTo.lat)[0] + 80} y={otP(pTo.lon, pTo.lat)[1] - 190} f={1} />
          <Velocimetro x={220} y={690} r={140} valor={pTo.kt * KT} />
        </>))}
      </Escena>
      {/* 2 · cap. 2: mar de 30–31 °C y el viento de altura afloja */}
      <Escena T={T} a={K.Ma} b={K.Mo}>
        {svg(mapa(hMa, kprog(T, K.Ma + 0.4, K.Ma + 2.2), <>
          <Huracan T={T} x={otP(pMa.lon, pMa.lat)[0]} y={otP(pMa.lon, pMa.lat)[1]} r={115} org={klerp(0.2, 0.8, 1 - shearMa)} inclina={shearMa} vel={0.8} />
          <VientoAltura T={T} x={otP(pMa.lon, pMa.lat)[0] + 80} y={otP(pMa.lon, pMa.lat)[1] - 200} f={shearMa} />
          <Velocimetro x={220} y={690} r={140} valor={pMa.kt * KT} />
          <g transform="translate(940 1090)">
            <rect x={-26} y={-380} width={52} height={380} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-16} y={-370 * kprog(T, K.Ma + 0.4, K.Ma + 2.2, kEase.sale) * 0.92} width={32} height={370 * kprog(T, K.Ma + 0.4, K.Ma + 2.2, kEase.sale) * 0.92} rx={16} fill={KC.red} />
            <circle cy={14} r={40} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
          </g>
        </>))}
      </Escena>
      {/* 3 · el motor: evaporación → nubes → calor (corte esquemático) */}
      <Escena T={T} a={K.Mo} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <rect x={0} y={1010} width={KW} height={300} fill="#ff9a3c" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${60 + i * 180} ${1040 + Math.sin(T * 2 + i) * 6} q 40 -18 80 0`} stroke="#ffd08a" strokeWidth={8} fill="none" strokeLinecap="round" />)}
          {Array.from({ length: 9 }, (_, i) => { const u = ((T - K.Mo) * 0.55 + i / 9) % 1, xx = 140 + i * 100; const op = kprog(T, K.Mo - 0.4, K.Mo) * Math.sin(Math.PI * u);
            return <path key={i} d={`M ${xx} ${1000 - u * 320} q 14 -20 0 -40 q -14 -20 0 -40`} stroke="#ffffff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={op} />; })}
          <g opacity={kprog(T, K.Mo - 0.4, K.Mo + 0.1)} transform={`translate(540 ${klerp(700, 640, kprog(T, K.Mo - 0.4, K.Mo + 2.5, kEase.sale))})`}>
            {[[-200, 60, 90], [-110, -10, 110], [0, -90, 130], [110, -10, 110], [200, 60, 90], [-60, 80, 100], [70, 80, 100], [0, -200, 110], [-80, -170, 90], [90, -170, 90]].map(([a, b, rr], i) => <circle key={'k' + i} cx={a} cy={b} r={rr + 6} fill={KC.ink} />)}
            {[[-200, 60, 90], [-110, -10, 110], [0, -90, 130], [110, -10, 110], [200, 60, 90], [-60, 80, 100], [70, 80, 100], [0, -200, 110], [-80, -170, 90], [90, -170, 90]].map(([a, b, rr], i) => <circle key={'w' + i} cx={a} cy={b} r={rr} fill="#f5f8ff" />)}
          </g>
          {Array.from({ length: 4 }, (_, i) => { const e = kprog(T, K.Mo + 2.1 + i * 0.15, K.Mo + 2.6 + i * 0.15), u = ((T * 0.9 + i * 0.25) % 1);
            const lado = i % 2 ? 1 : -1, xx = 540 + lado * (330 + u * 120), yy = 520 + Math.floor(i / 2) * 170;
            return <path key={i} d={`M ${xx} ${yy} q ${lado * 20} -20 0 -40 q ${-lado * 20} -20 0 -40`} stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" opacity={e * (1 - u)} />; })}
          <ellipse cx={540} cy={930} rx={420} ry={60} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="60 30" strokeDashoffset={-(T - K.Mo) * (60 + 140 * kprog(T, K.Mo + 2.2, K.Mo + 4))} opacity={kprog(T, K.Mo + 2.2, K.Mo + 2.8)} />
        </>)}
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Huracan T={T} x={290} y={1000} r={170} org={1} ojo={0.6} vel={2.2} />
          <text x={290} y={880} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 700)`}>?</text>
        </>)}
      </Escena>
      {/* 5 · intensificación rápida: +56 km/h en 24 h (umbral) vs. Otis +167 km/h en 21 h */}
      <Escena T={T} a={K.R} b={K.Av}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <text x={80} y={735} style={{ font:`700 31px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.R + 1.4, K.R + 1.8)}>intensificación rápida (NHC):</text>
          <rect x={80} y={760} width={b1} height={90} rx={16} fill={KC.cyan} stroke={KC.ink} strokeWidth={b1 > 2 ? 6 : 0} />
          {b1 > 200 && <text x={80 + b1 + 18} y={822} style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>+56 km/h · 24 h</text>}
          <text x={80} y={935} style={{ font:`700 31px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.R + 3.4, K.R + 3.8)}>Otis (24–25 oct 2023):</text>
          <rect x={80} y={960} width={b2} height={90} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={b2 > 2 ? 6 : 0} />
          {b2 > 330 && <text x={80 + b2 - 18} y={1022} textAnchor="end" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">+{Math.round(b2 / 5)} km/h</text>}
          <line x1={80 + 30 * KT * 5} y1={740} x2={80 + 30 * KT * 5} y2={1080} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={kprog(T, K.R + 3.6, K.R + 4.0)} />
          {T > K.R + 3.5 && <g transform="translate(250 560)">
            <circle r={110} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <path d={`M 0 0 L 0 -110 A 110 110 0 ${horas / 21 > 0.5 ? 1 : 0} 1 ${110 * Math.sin(horas / 21 * 2 * Math.PI * 0.999)} ${-110 * Math.cos(horas / 21 * 2 * Math.PI * 0.999)} Z`} fill={KC.red} opacity={0.75} />
            <circle r={110} fill="none" stroke={KC.ink} strokeWidth={8} />
            <text y={30} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{Math.floor(horas)} h</text>
          </g>}
        </>)}
        <Etq T={T} at={K.R + 6.4} until={K.Av - 0.2} x={140} y={1110} texto="de 102 a 269 km/h (pico)" tam={30} color={KC.ink} />
      </Escena>
      {/* 6 · el avión cazahuracanes: −10 mb en 85 min (24 oct 2023) */}
      <Escena T={T} a={K.Av} b={K.Ti}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Huracan T={T} x={HX} y={HY} r={290} org={1} ojo={1} vel={1.4} />
          {pa1 > 0 && pa1 < 1 && <AvionCaza x={klerp(-180, 980, pa1)} y={HY} rot={0} s={0.8} T={T} />}
          {pa2 > 0 && pa2 < 1 && <AvionCaza x={klerp(900, -100, pa2)} y={klerp(1140, 540, pa2)} rot={Math.atan2(-600, -1000) * 180 / Math.PI} s={0.8} T={T} />}
          <Barometro x={870} y={930} r={115} baja={kprog(T, K.Av + 1.0, K.Av + 4.2, kEase.suave)} />
        </>)}
      </Escena>
      {/* 7 · cap. 3: tocó tierra en Acapulco como categoría 5 (noche, 25 oct 2023) */}
      <Escena T={T} a={K.Ti} b={K.Re}>
        {svg(<>
          <rect width={KW} height={KH} fill="#13284d" />
          <path d={OT_COSTA} fill="#1f3b2c" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={330} cy={845} rx={46} ry={22} fill="#1f3b2c" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 26 }, (_, i) => { const u = i / 25, xx = 370 + u * 400, yy = 790 - Math.sin(Math.PI * u) * 150 - 14; return <circle key={i} cx={xx} cy={yy} r={5} fill={KC.yellow} opacity={(0.5 + 0.5 * Math.sin(T * 5 + i)) * (1 - kprog(T, K.Ti + 2.3, K.Ti + 2.8))} />; })}
          <Huracan T={T} x={560} y={klerp(1330, 800, hTi)} r={270} org={1} ojo={1} vel={2.4} o={0.95} />
        </>)}
        <Etq T={T} at={K.Ti + 0.4} until={K.Re - 0.2} x={800} y={720} texto="Acapulco" tam={34} />
      </Escena>
      {/* 8 · récord: el más fuerte al tocar tierra en el Pacífico oriental desde 1988 */}
      <Escena T={T} a={K.Re} b={K.Vi}>
        {svg(<>
          <rect width={KW} height={KH} fill="#7cc8f0" />
          <MapaMexico x={OM.x} y={OM.y} ancho={2000} />
          {OT_TRACK.slice(0, -1).map((p, i) => { const q = OT_TRACK[i + 1], [x1, y1] = otP(p[1], p[2]), [x2, y2] = otP(q[1], q[2]), e = kprog(T, K.Re + 0.2 + i * 0.12, K.Re + 0.35 + i * 0.12);
            return e > 0 ? <line key={i} x1={x1} y1={y1} x2={klerp(x1, x2, e)} y2={klerp(y1, y2, e)} stroke={otColor(q[3] * KT)} strokeWidth={16} strokeLinecap="round" /> : null; })}
          {OT_TRACK.map((p, i) => { const [xx, yy] = otP(p[1], p[2]); return T > K.Re + 0.2 + i * 0.12 ? <circle key={'c' + i} cx={xx} cy={yy} r={10} fill={otColor(p[3] * KT)} stroke={KC.ink} strokeWidth={4} /> : null; })}
          {T > K.Re + 1.8 && <Huracan T={T} x={otP(-99.9, 16.8)[0]} y={otP(-99.9, 16.8)[1]} r={70} org={1} ojo={1} vel={2} />}
        </>)}
      </Escena>
      {/* 9 · víctimas: escena quieta y sobria */}
      <Escena T={T} a={K.Vi} b={K.C}>
        {svg(<>
          <rect width={KW} height={KH} fill="#c9ced4" />
          <circle cx={170} cy={720} r={50} fill="#eef0f2" opacity={0.9} />
          <rect x={0} y={790} width={KW} height={600} fill="#9aa6b2" />
        </>)}
        <div style={{ position:'absolute', left:0, right:0, top:860, textAlign:'center', zIndex:41, opacity:kprog(T, K.Vi + 0.5, K.Vi + 1.3) }}>
          <div style={{ font:`400 104px/1.05 ${KF.titulo}`, color:KC.ink }}>52 muertes</div>
          <div style={{ font:`400 104px/1.05 ${KF.titulo}`, color:KC.ink }}>32 desaparecidos</div>
        </div>
        <div style={{ position:'absolute', left:0, right:0, top:700, textAlign:'center', zIndex:41, opacity:kprog(T, K.Vi + 1.6, K.Vi + 2.3), font:`700 30px ${KF.mono}`, color:'#2e343b' }}>
          gobierno de México · nov 2023<br />el total es incierto
        </div>
      </Escena>
      {/* 10 · cierre: regreso al medidor del inicio */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<Velocimetro x={380} y={990} r={300} valor={vC} pron={105} />)}
      </Escena>

      <Capitulo T={T} caps={[{ at: K.To, titulo: 'Tormenta' }, { at: K.Ma, titulo: 'Mar caliente' }, { at: K.Ti, titulo: 'Tierra' }]} hasta={K.Re} />

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.5} until={K.To - 0.6} texto="un día antes: ≈ 105 km/h" x={330} y={440} tam={30} borde="#5d6673" />
      <Chip T={T} at={K.G + 6.0} until={K.To - 0.6} texto="llegó: 259 km/h" x={330} y={530} tam={34} borde={KC.red} />
      <Chip T={T} at={K.To + 0.3} until={K.Ma - 0.2} texto="23 oct 2023" x={220} y={450} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.To + 1.0} until={K.Ma - 0.2} x={otP(pTo.lon, pTo.lat)[0] - 130} y={otP(pTo.lon, pTo.lat)[1] - 144} texto="viento de altura" tam={28} color={KC.white} lado="izq" />
      <Chip T={T} at={K.Ma + 0.3} until={K.Mo - 0.2} texto="24 oct 2023" x={220} y={450} tam={28} borde={KC.orange} mono />
      <Chip T={T} at={K.Ma + 1.4} until={K.Mo - 0.2} texto="mar: 30–31 °C" x={230} y={810} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Ma + 2.0} until={K.Mo - 0.2} texto="+1–2 °C de lo normal (oct)" x={250} y={890} tam={22} borde={KC.orange} />
      <Etq T={T} at={K.Mo + 0.1} until={K.P - 0.2} x={120} y={880} texto="vapor" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.4} until={K.P - 0.2} x={800} y={420} texto="nubes" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Mo + 2.3} until={K.P - 0.2} x={880} y={760} texto="calor" tam={30} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Mo + 0.3} until={K.P - 0.2} texto="esquema" x={540} y={1130} tam={26} borde={KC.ink} mono />
      <Chip T={T} at={K.Av + 0.3} until={K.Ti - 0.2} texto="24 oct 2023 · cazahuracanes" x={380} y={450} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Av + 2.0} until={K.Ti - 0.2} texto="−10 mb en 85 min" x={850} y={760} tam={30} borde={KC.red} />
      <NumeroGigante T={T} at={K.Ti + 1.2} until={K.Re - 0.2} valor={259} desde={102} dur={1.0} sufijo=" km/h" etiqueta="al tocar tierra:" x={330} y={480} tam={120} color="#e05cf0" />
      <Chip T={T} at={K.Ti + 2.4} until={K.Re - 0.2} texto="25 oct 2023 · categoría 5" x={540} y={1110} tam={30} borde="#c21fd6" />
      <Chip T={T} at={K.Re + 0.4} until={K.Vi - 0.2} texto="Pacífico oriental · desde 1988" x={360} y={440} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Re + 1.6} until={K.Vi - 0.2} texto="el más fuerte al tocar tierra" x={360} y={530} tam={28} borde="#c21fd6" />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="un día antes: ≈ 105 km/h" x={330} y={440} tam={30} borde="#5d6673" />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="realidad: 259 km/h" x={330} y={530} tam={34} borde={KC.red} />
      <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} o={T < K.Ou ? 1 : 0} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.To - 0.1} texto="Un día antes: *100.* Llegó: *260.*" />
      <Subtitulo T={T} idx={1} at={K.To + 0.1} until={K.Ma - 0.1} texto="Cap. 1: *tormenta tropical.*" />
      <Subtitulo T={T} idx={2} at={K.Ma + 0.1} until={K.Mo - 0.1} texto="Cap. 2: *hasta 31 °C.*" />
      <Subtitulo T={T} idx={3} at={K.Mo + 0.1} until={K.P - 0.1} texto="El agua caliente: *su gasolina.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.R - 0.1} texto="¿Qué tan *rápido creció?*" />
      <Subtitulo T={T} idx={5} at={K.R + 0.1} until={K.Av - 0.1} texto="+167 km/h *en 21 horas.*" />
      <Subtitulo T={T} idx={6} at={K.Av + 0.1} until={K.Ti - 0.1} texto="*−10 mb en 85 min.*" />
      <Subtitulo T={T} idx={7} at={K.Ti + 0.1} until={K.Re - 0.1} texto="Cap. 3: *categoría 5.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Vi - 0.1} texto="Desde 1988: *el más fuerte.*" />
      <Subtitulo T={T} idx={9} at={K.Vi + 0.1} until={K.C - 0.1} texto="52 muertes y 32 desaparecidos." color="#d6dbe0" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un día antes: ~100. *Realidad: ~260.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 7.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tormenta + 2.0, CUES.Mar + 0.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Mar + 3.6, CUES.Motor + 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Rapida + 1.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Rapida + 4.6, CUES.Avion - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Avion + 2.4, CUES.Tierra + 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Tierra + 1.6, CUES.Record + 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Record + 1.4, CUES.Victimas - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Victimas + 1.2, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="25" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OtisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OtisShot /></CompositionStage></div>;
}
window.OtisApp = OtisApp;
