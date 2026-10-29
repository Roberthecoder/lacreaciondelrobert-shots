// Shot Ambiental #54 · Tu basura de un año: casi 400 kilos, y a dónde van — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: SEMARNAT/INECC, Diagnóstico Básico para la Gestión Integral de los Residuos 2026 (datos del CNGMD 2023, año 2022). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (la pila, la bolsa en corte, el mapa, Jalisco y los sitios de disposición).

// ---------- piezas propias ----------
// Bolsa negra de basura amarrada (origen = base de la bolsa).
function BolsaNegra({ x, y, s = 1, rot = 0, o = 1, color = '#2a2d33' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -58 0 Q -72 -40 -52 -78 Q -36 -100 -14 -104 L 14 -104 Q 36 -100 52 -78 Q 72 -40 58 0 Q 0 10 -58 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -14 -104 Q -30 -128 -22 -136 Q -8 -126 0 -112 Q 8 -126 22 -136 Q 30 -128 14 -104 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -38 -70 Q -44 -46 -36 -22" stroke="#6b707a" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 10 -90 Q 24 -60 20 -30" stroke="#454952" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}
// Pila de 15 bolsas (5-4-3-2-1). t0 = momento en que empiezan a caer; cada bolsa cae en 0.35 s.
const PILA = (() => { const r = []; const fil = [5, 4, 3, 2, 1]; fil.forEach((n, f) => { for (let i = 0; i < n; i++) r.push({ x: (i - (n - 1) / 2) * 112, y: -f * 92, rot: ((i * 37 + f * 11) % 19) - 9 }); }); return r; })();
function Pila({ T, t0, x, y, s = 1, cada = 0.17 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {PILA.map((b, i) => { const a = t0 + i * cada, u = kprog(T, a, a + 0.35); if (T < a) return null;
      const caida = (1 - u * u) * -900, rebote = u >= 1 ? Math.sin(kclamp((T - a - 0.35) * 14, 0, Math.PI)) * -8 * Math.exp(-(T - a - 0.35) * 5) : 0;
      return <BolsaNegra key={i} x={b.x} y={b.y + caida + rebote} rot={b.rot} />; })}
  </g>;
}
// Báscula con pantalla.
function Bascula({ x, y, texto, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-170} y={0} width={340} height={46} rx={12} fill="#d6dce4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-130} y={46} width={260} height={90} rx={14} fill="#aeb7c2" stroke={KC.ink} strokeWidth={7} />
    <rect x={-100} y={62} width={200} height={58} rx={8} fill="#183b2b" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={105} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill="#7dff9e">{texto}</text>
  </g>;
}
// Bolsa transparente en corte con capas: org (verde), apr (azul), otr (gris). Cada valor 0..1 = cuánto se llenó esa capa.
const BC_PATH = 'M -210 0 Q -250 -260 -170 -470 Q -90 -520 0 -520 Q 90 -520 170 -470 Q 250 -260 210 0 Q 0 22 -210 0 Z';
function BolsaCorte({ T, x, y, org = 0, apr = 0, otr = 0 }) {
  const H = 500, hO = H * 0.4015 * org, hA = H * 0.3626 * apr, hX = H * 0.2359 * otr;
  const capa = (y0, h, fill) => h > 0 && <rect x={-260} y={-y0 - h} width={520} height={h + 1} fill={fill} />;
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="bc-clip"><path d={BC_PATH} /></clipPath></defs>
    <path d={BC_PATH} fill="rgba(255,255,255,.55)" />
    <g clipPath="url(#bc-clip)">
      {capa(0, hO, '#8fd16a')}{capa(hO, hA, '#7cc4ff')}{capa(hO + hA, hX, '#b9bec6')}
      {/* orgánicos: cáscaras de plátano, hojas y pasto, corazón de manzana */}
      {org > 0.3 && <g opacity={kclamp(org * 2 - 0.6, 0, 1)}>
        <path d="M -150 -40 q 40 -60 100 -30 q -50 0 -90 50 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
        <ellipse cx={40} cy={-60} rx={44} ry={18} fill="#3f9a3a" stroke={KC.ink} strokeWidth={4} transform="rotate(-20 40 -60)" />
        <ellipse cx={120} cy={-120} rx={36} ry={14} fill="#4fb04a" stroke={KC.ink} strokeWidth={4} transform="rotate(25 120 -120)" />
        <path d="M -60 -150 q 14 -20 28 0 q -6 16 0 30 q -14 20 -28 0 q 6 -14 0 -30 Z" fill="#f3e2b8" stroke={KC.ink} strokeWidth={4} />
        {[-120, -100, -80, 60, 80].map((px, i) => <path key={i} d={`M ${px} -10 q 4 -40 ${i % 2 ? 10 : -6} -70`} stroke="#2f8a2f" strokeWidth={5} fill="none" strokeLinecap="round" />)}
      </g>}
      {/* aprovechables: botella, caja de cartón, lata, hoja de papel, frasco */}
      {apr > 0.3 && <g opacity={kclamp(apr * 2 - 0.6, 0, 1)} transform={`translate(0 ${-hO})`}>
        <g transform="translate(-130 -40) rotate(-70)"><rect x={-22} y={-70} width={44} height={110} rx={14} fill="#bfe8ff" stroke={KC.ink} strokeWidth={4} /><rect x={-10} y={-90} width={20} height={22} rx={4} fill="#2f6fd8" stroke={KC.ink} strokeWidth={4} /></g>
        <rect x={-30} y={-130} width={110} height={80} fill="#c89a5a" stroke={KC.ink} strokeWidth={4} transform="rotate(8 25 -90)" />
        <rect x={110} y={-90} width={46} height={70} rx={6} fill="#c7ccd4" stroke={KC.ink} strokeWidth={4} transform="rotate(-15 133 -55)" />
        <rect x={-110} y={-150} width={80} height={60} fill="#fff" stroke={KC.ink} strokeWidth={4} transform="rotate(-12 -70 -120)" />
        <rect x={20} y={-46} width={50} height={40} rx={8} fill="rgba(160,230,200,.9)" stroke={KC.ink} strokeWidth={4} />
      </g>}
      {/* otros: pañal desechable y trapo */}
      {otr > 0.3 && <g opacity={kclamp(otr * 2 - 0.6, 0, 1)} transform={`translate(0 ${-hO - hA})`}>
        <path d="M -90 -80 L 10 -80 L -10 -20 Q -40 0 -70 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
        <path d="M 40 -70 q 40 -20 90 0 q -10 30 -40 40 q -40 -10 -50 -40 Z" fill="#e57d6b" stroke={KC.ink} strokeWidth={4} />
      </g>}
    </g>
    <path d={BC_PATH} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -40 -520 Q -60 -570 -30 -580 Q 0 -560 0 -530 Q 0 -560 30 -580 Q 60 -570 40 -520" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Camión recolector visto de lado (mira a la izquierda). origen = suelo bajo el centro.
function Camion({ T, x, y, s = 1 }) {
  const g = T * 400;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-190} width={300} height={150} rx={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
    <path d="M 240 -190 L 300 -150 L 300 -40 L 240 -40 Z" fill="#2f9a3a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => <line key={i} x1={20 + i * 70} y1={-176} x2={20 + i * 70} y2={-56} stroke="#2f9a3a" strokeWidth={6} />)}
    <path d="M -60 -150 L -160 -150 L -190 -100 L -190 -40 L -60 -40 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -150 -138 L -175 -100 L -110 -100 L -110 -138 Z" fill="#9fd8ff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-200} y={-46} width={510} height={16} rx={6} fill="#555b66" stroke={KC.ink} strokeWidth={5} />
    {[-130, 120, 220].map((wx, i) => <g key={i} transform={`translate(${wx} -20) rotate(${-g})`}><circle r={34} fill="#2a2d33" stroke={KC.ink} strokeWidth={6} /><circle r={12} fill="#c7ccd4" /><line x1={-26} y1={0} x2={26} y2={0} stroke="#c7ccd4" strokeWidth={5} /></g>)}
  </g>;
}
// Puntos dentro de México (esquema), en coordenadas de mxProy. Muestreo por rechazo dentro del contorno.
const MX_BAJA2 = [[-117.1,32.5],[-116.6,31.7],[-116,30.4],[-115,29.5],[-114.2,28],[-114.1,27.6],[-112.1,24.8],[-111.6,24.3],[-110,22.9],[-109.4,23.2],[-110.3,24.2],[-111.4,25.8],[-112.4,27.2],[-112.9,28.5],[-114.6,30.2],[-114.8,31.6],[-114.8,32.5]];
function dentroPol(lon, lat, P) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c; } return c; }
const SITIOS = (() => { const r = krng(54), out = []; let k = 0;
  while (out.length < 2250 && k < 200000) { k++; const lon = -117.2 + r() * 30.5, lat = 14.4 + r() * 18.4;
    if (dentroPol(lon, lat, window.MX_CONT) || dentroPol(lon, lat, MX_BAJA2)) out.push(mxProy(lon, lat)); }
  return out; })();
const RELLENOS = (() => { const r = krng(7), s = new Set(); while (s.size < 52) s.add(Math.floor(r() * SITIOS.length)); return [...s]; })();

// Sección de suelo de un sitio de disposición (ancho 480). tipo 'relleno' o 'abierto'.
function SitioCorte({ T, x, y, tipo }) {
  const W = 480;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={140} width={W} height={260} fill="#a8794a" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={60 + i * 120} cy={330 + (i % 2) * 30} r={10} fill="#7d5532" />)}
    {tipo === 'relleno' ? <g>
      <path d="M 50 140 L 100 360 L 380 360 L 430 140 Z" fill="#6f7680" />
      {[0, 1, 2].map((f) => <g key={f}>
        <path d={`M ${100 - (2 - f) * 0 + f * 0} ${360 - f * 70} L ${380} ${360 - f * 70} L ${396 + f * 12} ${300 - f * 70} L ${84 - f * 12} ${300 - f * 70} Z`} fill="#3a3f47" />
        <rect x={86 - f * 12} y={292 - f * 70} width={308 + f * 24} height={10} fill="#c29a62" />
      </g>)}
      <path d="M 50 140 L 100 360 L 380 360 L 430 140" fill="none" stroke="#111" strokeWidth={12} strokeLinejoin="round" />
      <path d="M 40 140 Q 240 80 440 140 Z" fill="#7cc46a" stroke={KC.ink} strokeWidth={6} />
      <rect x={300} y={40} width={18} height={250} fill="#c7ccd4" stroke={KC.ink} strokeWidth={5} />
      <rect x={290} y={30} width={38} height={18} rx={4} fill="#9aa2ad" stroke={KC.ink} strokeWidth={5} />
    </g> : <g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => { const fx = [80, 180, 280, 380, 130, 230, 330][i], fy = i < 4 ? 150 : 70; return <BolsaNegra key={i} x={fx} y={fy} s={0.85} rot={(i * 23) % 17 - 8} color={i % 3 ? '#2a2d33' : '#5a3f2a'} />; })}
      <BolsaNegra x={240} y={0} s={0.85} rot={4} />
      {[0, 1, 2, 3, 4].map((i) => { const u = ((T * 0.6 + i / 5) % 1); return <path key={i} d={`M ${110 + i * 70} ${160 + u * 200} q 6 14 0 26`} stroke="#3b2a12" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={240 + Math.sin(T * 5 + i * 2) * 120} cy={-40 + Math.cos(T * 4 + i * 3) * 50} r={6} fill={KC.ink} />)}
      {[0, 1].map((i) => { const bx = 120 + i * 220 + Math.sin(T * 1.2 + i) * 30, by = -120 + i * 30; const al = Math.sin(T * 8 + i) * 10; return <path key={i} d={`M ${bx - 30} ${by + al} Q ${bx - 12} ${by - 10} ${bx} ${by} Q ${bx + 12} ${by - 10} ${bx + 30} ${by + al}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
    </g>}
  </g>;
}
// Barra de 100 kg partida en dos (div).
function BarraReparto({ T, at, until, y = 1440 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), p = kprog(T, at + 0.2, at + 1.2, kEase.sale);
  return <div style={{ position:'absolute', left:90, width:900, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.4}px)` }}>
    <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink, marginBottom:8, textAlign:'center' }}>de cada 100 kg que llegan a los sitios</div>
    <div style={{ display:'flex', height:64, border:`6px solid ${KC.ink}`, borderRadius:18, overflow:'hidden', background:'#fff' }}>
      <div style={{ width:`${15.6 * p}%`, background:KC.leaf, display:'flex', alignItems:'center', justifyContent:'center', font:`900 30px ${KF.texto}`, color:KC.ink }}>15</div>
      <div style={{ width:`${84.4 * p}%`, background:KC.red, display:'flex', alignItems:'center', justifyContent:'center', font:`900 30px ${KF.texto}`, color:'#fff' }}>85</div>
    </div>
  </div>;
}
// Silueta esquemática de Jalisco (aproximada).
const JAL_PATH = 'M 40 60 L 120 20 L 190 40 L 230 10 L 290 50 L 270 110 L 310 150 L 280 210 L 220 230 L 200 280 L 140 300 L 80 270 L 30 220 L 0 150 L 20 100 Z';

function BasuraShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Dia, B: CUES.Bolsa, M: CUES.Material, Ca: CUES.Camion, P: CUES.Pregunta, Di: CUES.Diagnostico, De: CUES.Destino, J: CUES.Jalisco, Tr: CUES.Tratamiento, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // camión: cruza de derecha a izquierda; recoge 77 de 100 bolsitas
  const camX = klerp(1300, -400, kprog(T, K.Ca + 0.1, K.Ca + 3.6));
  const bolsitas = Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10); const bx = 250 + c * 64, by = 800 + f * 36;
    const tS = i < 77 ? kclamp((bx + 120 - camX) / 160, 0, 1) : 0;
    return <BolsaNegra key={i} x={bx} y={by - 90 * tS} s={0.28} o={1 - tS} color={i < 77 ? '#2a2d33' : '#4a4f58'} />; });
  const quedan = Array.from({ length: 23 }, (_, k) => { const i = 77 + k, c = i % 10, f = Math.floor(i / 10); return <circle key={i} cx={250 + c * 64} cy={800 + f * 36 - 15} r={22} fill="none" stroke={KC.red} strokeWidth={5} opacity={kprog(T, K.Ca + 2.6, K.Ca + 3.0)} />; });
  const nSit = Math.round(2250 * kprog(T, K.Di + 0.3, K.Di + 3.0, kEase.suave));
  const verde = kprog(T, K.Di + 4.4, K.Di + 5.0);
  const mapX = 50, mapY = 700, mapS = 0.98;
  const altoJ = 500 * kprog(T, K.J + 0.4, K.J + 2.0, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pila de un año */}
      <Escena T={T} a={K.G} b={K.D}>
        <FondoLunares color={KC.yellow} />
        {svg(<Pila T={T} t0={K.G + 0.05} x={360} y={1130} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · un día: una bolsa en la báscula */}
      <Escena T={T} a={K.D} b={K.B}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Pila T={T} t0={-99} x={330} y={980} s={klerp(0.75, 0.0, kprog(T, K.D + 0.1, K.D + 1.0, kEase.suave))} />
          <g opacity={kprog(T, K.D + 0.6, K.D + 1.1)}><BolsaNegra x={330} y={984 - (1 - kprog(T, K.D + 0.6, K.D + 1.1, kEase.rebote)) * 120} s={1.5} /></g>
          <Bascula x={330} y={984} texto={kformato(1.076 * kprog(T, K.D + 1.0, K.D + 2.0, kEase.suave), 3) + ' kg'} /></>)}
      </Escena>
      {/* 3 y 4 · la bolsa por dentro */}
      <Escena T={T} a={K.B} b={K.Ca}>
        <FondoLunares color={KC.mint} />
        {svg(<BolsaCorte T={T} x={330} y={1140} org={kprog(T, K.B + 0.1, K.B + 1.4, kEase.suave)} apr={kprog(T, K.M + 0.3, K.M + 1.8, kEase.suave)} otr={kprog(T, K.M + 2.4, K.M + 3.4, kEase.suave)} />)}
        <EscalaFija texto="esquema (por peso)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · el camión recoge 77 de cada 100 */}
      <Escena T={T} a={K.Ca} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><rect x={0} y={700} width={KW} height={14} fill="#9aa2ad" />{bolsitas}{quedan}<Camion T={T} x={camX} y={702} s={0.95} /></>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Di} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 820)`}>?</text>
          <rect x={0} y={1150} width={KW} height={14} fill="#7a68b8" /><Camion T={T} x={klerp(420, -300, kprog(T, K.P, K.Di + 0.4))} y={1152} s={0.6} /></>)}
      </Escena>
      {/* 7 · el diagnóstico: 2,250 sitios, 52 rellenos sanitarios */}
      <Escena T={T} a={K.Di} b={K.De}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={mapX} y={mapY} ancho={1000 * mapS} conCA={false}>
          {SITIOS.slice(0, nSit).map(([px, py], i) => <circle key={i} cx={px} cy={py} r={3.2} fill="#6b707a" />)}
          {verde > 0 && RELLENOS.map((i) => <circle key={'r' + i} cx={SITIOS[i][0]} cy={SITIOS[i][1]} r={9 * verde} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} />)}
        </MapaMexico>)}
        <EscalaFija texto="esquema: puntos ilustrativos" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · destino: relleno sanitario contra sitio que no cumple la norma */}
      <Escena T={T} a={K.De} b={K.J}>
        <FondoLunares color={KC.mint} />
        {svg(<><SitioCorte T={T} x={30} y={700} tipo="relleno" /><SitioCorte T={T} x={570} y={700} tipo="abierto" />
          <text x={270} y={1065} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.De + 1.0, K.De + 1.5)}>15 %</text>
          <text x={810} y={1065} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.De + 3.4, K.De + 3.9)}>85 %</text></>)}
      </Escena>
      {/* 9 · Jalisco */}
      <Escena T={T} a={K.J} b={K.Tr}>
        <FondoLunares color={KC.orange} />
        {svg(<><g transform="translate(50 330) scale(0.75)"><path d={JAL_PATH} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /><text x={150} y={170} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Jalisco</text></g>
          <rect x={60} y={1110} width={960} height={10} fill={KC.ink} />
          <rect x={300} y={1110 - altoJ} width={170} height={altoJ} fill="#4a4f58" stroke={KC.ink} strokeWidth={7} />
          <rect x={520} y={1110 - 500 * 99.839 / 8436.905 * kprog(T, K.J + 2.0, K.J + 2.4)} width={170} height={500 * 99.839 / 8436.905 * kprog(T, K.J + 2.0, K.J + 2.4)} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
          <text x={385} y={1090 - altoJ} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.J + 1.4, K.J + 2.0)}>8,437 t/día</text></>)}
      </Escena>
      {/* 10 · solo el 5 % recibe tratamiento */}
      <Escena T={T} a={K.Tr} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = 9 - Math.floor(i / 10); const on = i < 5 && T > K.Tr + 1.0 + i * 0.15;
          return <rect key={i} x={190 + c * 50} y={620 + f * 50} width={42} height={42} rx={8} fill={on ? KC.leaf : '#c3c8cf'} stroke={KC.ink} strokeWidth={on ? 5 : 3} opacity={kprog(T, K.Tr + i * 0.006, K.Tr + 0.3 + i * 0.006)} />; }))}
      </Escena>
      {/* 11 · cierre: la misma pila, en otro lugar */}
      <Escena T={T} a={K.C} b={FIN}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#bfe6ff 0%, #ffe9b0 52%, #a8794a 52%, #8a5f37 100%)' }}></div>
        {svg(<><Pila T={T} t0={K.C - 0.3} x={360} y={1130} cada={0.12} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={330 + Math.sin(T * 5 + i * 2) * 260} cy={850 + Math.cos(T * 4 + i * 3) * 80} r={6} fill={KC.ink} />)}
          {[0, 1, 2, 3].map((i) => { const u = ((T * 0.5 + i / 4) % 1); return <path key={i} d={`M ${170 + i * 100} ${1200 + u * 160} q 6 14 0 26`} stroke="#3b2a12" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - u} />; })}</>)}
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.D - 0.2} valor={393} dur={2.6} sufijo=" kg" etiqueta="tu basura de 1 año:" x={330} y={520} tam={130} color={KC.paper} />
      <Chip T={T} at={K.G + 1.2} until={K.D - 0.2} texto="1.076 kg × 365 días ≈ 393 kg" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.D + 2.2} until={K.B - 0.2} texto="casa 0.746 kg" y={470} x={330} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.D + 3.4} until={K.B - 0.2} texto="calles y negocios 0.330 kg" y={570} x={330} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.D + 0.3} until={K.B - 0.2} texto="por persona al día · promedio nacional · datos de 2022" y={1440} x={540} tam={26} borde={KC.cyan} />
      <Etq T={T} at={K.B + 1.6} until={K.Ca - 0.2} x={560} y={1040} texto="orgánicos 40 %" tam={34} color={KC.ink} />
      <Etq T={T} at={K.M + 1.4} until={K.Ca - 0.2} x={575} y={870} texto="aprovechables 36 %" tam={34} color={KC.ink} />
      <Etq T={T} at={K.M + 3.0} until={K.Ca - 0.2} x={560} y={740} texto="otros 24 %" tam={34} color={KC.ink} />
      <Chip T={T} at={K.M + 0.4} until={K.Ca - 0.2} texto="plástico · cartón · papel · vidrio · latas" y={1440} x={540} tam={30} borde={KC.blue} />
      <NumeroGigante T={T} at={K.Ca + 1.0} until={K.P - 0.2} valor={77} dur={2.0} sufijo=" de 100" etiqueta="kilos que se recogen:" x={540} y={390} tam={110} color={KC.leaf} />
      <Chip T={T} at={K.Ca + 2.8} until={K.P - 0.2} texto="23 kg de cada 100 se quedan sin recoger" y={1440} x={540} tam={30} borde={KC.red} />
      <NumeroGigante T={T} at={K.Di + 0.3} until={K.Di + 4.3} valor={2250} dur={2.7} etiqueta="sitios de basura:" x={330} y={520} tam={130} color={KC.paper} />
      <NumeroGigante T={T} at={K.Di + 4.5} until={K.De - 0.2} valor={52} dur={0.6} etiqueta="rellenos sanitarios:" x={330} y={520} tam={150} color={KC.leaf} />
      <Chip T={T} at={K.Di + 0.6} until={K.De - 0.2} texto="SEMARNAT · INECC · DBGIR 2026 (datos de 2022)" y={1440} x={540} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.De + 0.5} until={K.J - 0.2} x={230} y={660} texto="relleno sanitario" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.De + 0.9} until={K.J - 0.2} x={330} y={920} texto="geomembrana" lado="izq" tam={24} color={KC.paper} />
      <Etq T={T} at={K.De + 2.8} until={K.J - 0.2} x={590} y={540} texto="no cumple la norma" lado="der" tam={30} color={KC.ink} />
      <BarraReparto T={T} at={K.De + 0.3} until={K.J - 0.2} />
      <Etq T={T} at={K.J + 2.4} until={K.Tr - 0.2} x={700} y={1080} texto="< 100 t/día" tam={34} color={KC.ink} />
      <Etq T={T} at={K.J + 2.8} until={K.Tr - 0.2} x={700} y={1020} texto="a relleno sanitario" tam={24} color={KC.ink} />
      <Chip T={T} at={K.J + 1.0} until={K.Tr - 0.2} texto="llegan a sus 123 sitios · solo 6 son rellenos" y={1440} x={540} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Tr + 1.0} until={K.C - 0.2} valor={5} dur={0.8} sufijo=" %" etiqueta="recibe tratamiento:" x={330} y={470} tam={150} color={KC.leaf} />
      <Chip T={T} at={K.Tr + 0.4} until={K.C - 0.2} texto="de toda la basura del país" y={1440} x={540} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="solo cambia de lugar" y={470} x={340} tam={40} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="Un año de tu basura: *casi 400 kilos.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.B - 0.1} texto="*Poco más de 1 kilo* por persona al día." />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.M - 0.1} texto="4 de cada 10 partes: *orgánicas.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.Ca - 0.1} texto="Más de un tercio: *aprovechable.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.P - 0.1} texto="El camión recoge *77 de cada 100 kilos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Di - 0.1} texto="¿A dónde va *lo que se lleva?*" />
      <Subtitulo T={T} idx={6} at={K.Di + 0.1} until={K.De - 0.1} texto="2,250 sitios: *solo 52 rellenos sanitarios.*" />
      <Subtitulo T={T} idx={7} at={K.De + 0.1} until={K.J - 0.1} texto="15 a relleno, *85 fuera de norma.*" />
      <Subtitulo T={T} idx={8} at={K.J + 0.1} until={K.Tr - 0.1} texto="Jalisco: *menos de 100 toneladas* a relleno." />
      <Subtitulo T={T} idx={9} at={K.Tr + 0.1} until={K.C - 0.1} texto="Solo el *5 %* recibe tratamiento." />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No desaparece: *cambia de lugar.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Dia + 3.0, CUES.Bolsa + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Material + 0.8, CUES.Camion - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Diagnostico + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Diagnostico + 4.5, CUES.Destino - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Destino + 4.5, CUES.Jalisco - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Jalisco + 3.0, CUES.Tratamiento - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Tratamiento + 1.5, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="54" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BasuraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BasuraShot /></CompositionStage></div>;
}
window.BasuraApp = BasuraApp;
