// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Fungi Mati #131 · Ese anillo morado es un animal defendiéndose de un hongo de tierra — NARRADO (N1 Por dentro).
// Gancho 1 «Esto no es X: es Y». Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (mapas, árbol genético, células).

const AX = { fan:'#9b5cc9', fan2:'#7a3fa8', fanOsc:'#4e1f73', anillo:'#5a0f7a', eje:'#d9c7a3', eje2:'#a8916a', arena:'#f4dc9a',
  tejido:'#e58aa6', tejido2:'#b85a7a', hifa:'#f2f0e6', melanina:'#2a1609', ameba:'#ffd36b', conidio:'#2fa98a', conidio2:'#1d7a63',
  tierra:'#8a5a2b', tierra2:'#6b421d', polvo:'#e9b860', mar:'#1fb8e6', tierraMapa:'#ffe9a8' };

// ---------- Abanico de mar (Gorgonia ventalina): red plana de ramitas unidas, sale de un pie en la roca ----------
// Se genera una sola vez (determinista). lesion = {x, y, r} en coordenadas locales (0,0 = pie). sano 0..1 = joven/limpio.
const FAN = (() => {
  const R = krng(131), ramas = [], uniones = [];
  const N = 11;
  for (let i = 0; i < N; i++) {
    const a = -1.15 + (2.3 * i) / (N - 1) + (R() - 0.5) * 0.08;
    const L = 520 + R() * 120 - Math.abs(a) * 110;
    const pts = [];
    for (let k = 0; k <= 10; k++) { const u = k / 10, w = Math.sin(u * 5 + i) * 10 * u; pts.push([Math.sin(a) * L * u + w, -Math.cos(a) * L * u * 0.98 - 40 * u]); }
    ramas.push(pts);
  }
  for (let i = 0; i < N - 1; i++) for (let k = 2; k <= 10; k++) {
    const A = ramas[i][k], B = ramas[i + 1][Math.min(10, k + (R() < 0.5 ? 0 : -1))];
    uniones.push([A, B, (R() - 0.5) * 18]);
    if (k < 10 && R() < 0.6) { const A2 = ramas[i][k], B2 = ramas[i + 1][k + 1]; uniones.push([[(A2[0] + ramas[i][k + 1][0]) / 2, (A2[1] + ramas[i][k + 1][1]) / 2], [(B[0] + B2[0]) / 2, (B[1] + B2[1]) / 2], (R() - 0.5) * 14]); }
  }
  return { ramas, uniones };
})();
function Abanico({ T, x, y, s = 1, lesion, color = AX.fan, fase = 0 }) {
  const rot = Math.sin(T * 0.9 + fase) * 3.2;
  const d = (pts) => 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const dentro = (p) => lesion && Math.hypot(p[0] - lesion.x, p[1] - lesion.y) < lesion.r * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {FAN.uniones.map(([A, B, c], i) => { const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2 + c; const muerto = dentro([mx, my]);
      return <path key={'u' + i} d={`M ${A[0]} ${A[1]} Q ${mx} ${my} ${B[0]} ${B[1]}`} stroke={muerto ? AX.eje2 : color} strokeWidth={muerto ? 3 : 6} fill="none" />; })}
    {FAN.ramas.map((p, i) => <path key={'r' + i} d={d(p)} stroke={AX.fanOsc} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    {FAN.ramas.map((p, i) => <path key={'q' + i} d={d(p)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />)}
    {lesion && <g>
      <circle cx={lesion.x} cy={lesion.y} r={lesion.r} fill="none" stroke={AX.anillo} strokeWidth={lesion.r * 0.38} opacity=".92" />
      <circle cx={lesion.x} cy={lesion.y} r={lesion.r * 0.62} fill={AX.eje} opacity=".85" />
      {[-1, 0, 1].map((k) => <path key={k} d={`M ${lesion.x - lesion.r * 0.55} ${lesion.y + k * lesion.r * 0.3} Q ${lesion.x} ${lesion.y + k * lesion.r * 0.3 - 8} ${lesion.x + lesion.r * 0.55} ${lesion.y + k * lesion.r * 0.3}`} stroke={AX.eje2} strokeWidth={3} fill="none" />)}
    </g>}
    <path d="M -40 10 Q 0 -30 40 10 Z" fill={AX.fanOsc} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Fondo del arrecife: agua cian con rayos de luz, arena y unas rocas.
// pase a mano (modo cine): la arena y las rocas van oscuras (antes una franja crema a media pantalla) y dy las baja para que el abanico crezca.
function Arrecife({ T, burbujas = true, dy = 0 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#204657 0%, #0c3a51 55%, #0a3047 100%)' }}></div>
    {fsvg(<>
      {[0, 1, 2, 3].map((i) => <polygon key={i} points={`${120 + i * 260 + Math.sin(T * 0.4 + i) * 30},0 ${220 + i * 260 + Math.sin(T * 0.4 + i) * 30},0 ${60 + i * 300},1500 ${-60 + i * 300},1500`} fill="#ffffff" opacity=".1" />)}
      <g transform={`translate(0 ${dy})`}>
      <path d="M -60 1330 Q 270 1270 540 1310 Q 820 1350 1140 1290 L 1140 2400 L -60 2400 Z" fill="#4a4026" stroke={KC.ink} strokeWidth={6} />
      <path d="M 80 1330 Q 120 1240 220 1250 Q 300 1260 320 1320 Z" fill="#37424d" stroke={KC.ink} strokeWidth={6} />
      <path d="M 700 1320 Q 760 1230 880 1240 Q 980 1260 1000 1300 Z" fill="#2f3943" stroke={KC.ink} strokeWidth={6} />
      </g>
    </>, 2)}
    {burbujas && <Ambiente T={T} n={16} seed={9} color="rgba(255,255,255,.45)" tam={[5, 12]} vel={-26} />}
  </>;
}
// Pólipo de octocoral: 8 tentáculos con pínulas (como plumitas). abre 0..1.
function Polipo({ x, y, s = 1, abre = 1, rot = 0 }) {
  const a = abre;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -22 0 L -16 ${-60 * a} L 16 ${-60 * a} L 22 0 Z`} fill="#f7d6e6" stroke={KC.ink} strokeWidth={4} />
    {a > 0.05 && Array.from({ length: 8 }, (_, i) => { const ang = (-80 + i * (160 / 7)) * Math.PI / 180, L = 70 * a;
      const ex = Math.sin(ang) * L, ey = -60 * a - Math.cos(ang) * L;
      return <g key={i}>
        <line x1={0} y1={-60 * a} x2={ex} y2={ey} stroke="#fff2f8" strokeWidth={7} strokeLinecap="round" />
        {[0.35, 0.55, 0.75, 0.92].map((k, j) => { const px = ex * k, py = -60 * a + (ey + 60 * a) * k, nx = Math.cos(ang) * 12 * a, ny = Math.sin(ang) * 12 * a;
          return <g key={j}><line x1={px} y1={py} x2={px + nx} y2={py + ny} stroke="#fff2f8" strokeWidth={3} /><line x1={px} y1={py} x2={px - nx} y2={py - ny} stroke="#fff2f8" strokeWidth={3} /></g>; })}
      </g>; })}
  </g>;
}
// Conidio de Aspergillus: redondo y rugoso (puntitos en el borde).
function Conidio({ x, y, r = 9, c = AX.conidio }) {
  return <g><circle cx={x} cy={y} r={r} fill={c} stroke={KC.ink} strokeWidth={2} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={x + Math.cos(k * 0.785) * r} cy={y + Math.sin(k * 0.785) * r} r={1.8} fill={KC.ink} />)}</g>;
}
// Conidióforo de Aspergillus sydowii: pie largo, vesícula redonda, métulas, fiálides y cadenas de conidios (cabeza biseriada).
function Conidioforo({ T, x, y, s = 1, crece = 1 }) {
  const h = 300 * kclamp(crece * 1.6, 0, 1), cab = kclamp(crece * 2.2 - 1.0, 0, 1);
  const cy = -h - 40;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -10 0 Q -14 ${-h * 0.5} -8 ${-h} L 8 ${-h} Q 12 ${-h * 0.5} 10 0 Z`} fill="#f2efe2" stroke={KC.ink} strokeWidth={4} />
    {cab > 0 && <g opacity={kclamp(cab * 3, 0, 1)}>
      {Array.from({ length: 11 }, (_, i) => { const ang = (-150 + i * 30) * Math.PI / 180; const ux = Math.cos(ang), uy = Math.sin(ang);
        const m0 = [ux * 44, cy + uy * 44], m1 = [ux * 70, cy + uy * 70];
        return <g key={i}>
          <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke="#cfe8d9" strokeWidth={14} strokeLinecap="round" />
          {[-0.18, 0.18].map((da, j) => { const ux2 = Math.cos(ang + da), uy2 = Math.sin(ang + da); const f1 = [m1[0] + ux2 * 26, m1[1] + uy2 * 26];
            const n = Math.floor(6 * cab);
            return <g key={j}>
              <line x1={m1[0]} y1={m1[1]} x2={f1[0]} y2={f1[1]} stroke="#a9dcc2" strokeWidth={8} strokeLinecap="round" />
              {Array.from({ length: n }, (_, k) => <Conidio key={k} x={f1[0] + ux2 * (14 + k * 18)} y={f1[1] + uy2 * (14 + k * 18)} r={8} c={k % 2 ? AX.conidio : AX.conidio2} />)}
            </g>; })}
        </g>; })}
      <circle cx={0} cy={cy} r={46} fill="#e6f4ea" stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Hifas tabicadas que crecen ramificándose. p 0..1 = cuánto han crecido.
const HIF = [
  'M 120 760 Q 300 800 420 880 Q 560 960 700 1000 Q 820 1030 960 1010',
  'M 420 880 Q 470 780 560 730 Q 640 690 720 650',
  'M 700 1000 Q 720 1080 790 1130',
  'M 300 820 Q 260 930 300 1040',
  'M 560 730 Q 600 640 580 560',
];
function Hifas({ p = 1, w = 9 }) {
  return <g>{HIF.map((d, i) => { const q = kclamp(p * 1.6 - i * 0.15, 0, 1); return q > 0 ? <g key={i}>
    <path d={d} stroke={AX.hifa} strokeWidth={w} fill="none" strokeLinecap="round" pathLength={100} strokeDasharray={`${q * 100} 100`} />
    <path d={d} stroke="#6b6658" strokeWidth={w + 2} fill="none" pathLength={100} strokeDasharray="0.6 6.4" opacity={q >= 1 ? 0.9 : 0} />
  </g> : null; })}</g>;
}
// Amebocito (célula de defensa): redonda, con gránulos.
function Amebocito({ x, y, r = 22 }) {
  return <g><circle cx={x} cy={y} r={r} fill={AX.ameba} stroke={KC.ink} strokeWidth={3} />
    {[[-7, -6], [6, -8], [0, 5], [-9, 7], [9, 5]].map(([a, b], i) => <circle key={i} cx={x + a * r / 22} cy={y + b * r / 22} r={3} fill="#c4801c" />)}</g>;
}
// Sello rectangular (palabras largas como HIPÓTESIS).
function SelloRect({ T, at, x, y, texto, color = KC.red, tam = 70, rot = -8 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), w = texto.length * tam * 0.62 + 70; // belleza: el texto ya cabe en el sello
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-tam * 0.85} width={w} height={tam * 1.5} rx={14} fill="rgba(16,20,40,.82)" stroke={color} strokeWidth={10} />
    <text y={tam * 0.3} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:2 }} fill={color}>{texto}</text>
  </g>;
}
// Mapa esquemático del Atlántico: América a la izquierda, África a la derecha.
// pase a mano (modo cine): mar y tierra de los dos mapas en tonos oscuros (antes cian y crema brillantes a media pantalla); rótulos claros.
const MAPA = { mar:'#0f4666', tierra:'#6a5a36' };
function MapaAtlantico() {
  return <g>
    <rect x={0} y={380} width={1080} height={900} fill={MAPA.mar} />
    <path d="M 0 380 L 330 380 Q 300 470 250 520 Q 230 560 270 600 Q 320 640 330 720 Q 335 760 310 770 Q 280 740 250 700 Q 180 690 130 720 Q 90 760 110 820 Q 140 830 170 800 Q 190 840 160 900 Q 200 960 250 990 Q 300 1000 340 1010 Q 450 1020 560 1080 Q 600 1150 560 1280 L 0 1280 Z" fill={MAPA.tierra} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[[360, 830, 60, 14], [450, 850, 30, 12], [500, 860, 18, 10], [540, 880, 10, 8], [560, 910, 8, 8], [590, 960, 8, 8]].map(([a, b, rx, ry], i) => <ellipse key={i} cx={a} cy={b} rx={rx} ry={ry} fill={MAPA.tierra} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 1080 380 L 760 380 Q 700 460 690 540 Q 640 600 640 690 Q 660 760 730 800 Q 800 820 860 860 Q 900 960 920 1080 Q 960 1200 1000 1280 L 1080 1280 Z" fill={MAPA.tierra} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <text x={880} y={600} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#f0cf7a">SAHARA</text>
    <text x={150} y={470} style={{ font:`700 26px ${KF.mono}` }} fill="#d8c594">AMÉRICA</text>
    <text x={880} y={1000} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#d8c594">ÁFRICA</text>
    <text x={470} y={790} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#a9dcf2">CARIBE</text>
    <text x={500} y={600} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#a9dcf2">océano Atlántico</text>
  </g>;
}
// Nube de polvo que cruza el Atlántico (de África al Caribe). p 0..1.
function NubePolvo({ T, p }) {
  if (p <= 0) return null;
  const R = krng(7);
  return <g>{Array.from({ length: 34 }, (_, i) => { const u = R(), q = kclamp(p * 1.4 - u * 0.4, 0, 1);
    const x = klerp(820, 380, q) + (R() - 0.5) * 120 + Math.sin(T * 1.3 + i) * 8, y = klerp(640, 820, q) + (R() - 0.5) * 100;
    return q > 0 ? <circle key={i} cx={x} cy={y} r={14 + R() * 22} fill={AX.polvo} opacity={0.5} /> : null; })}</g>;
}
// Árbol genético esquemático: hojas "abanico" (morado) mezcladas con hojas "ambiente" (café).
const HOJAS = ['a', 'm', 'm', 'a', 'm', 'a', 'a', 'm', 'a', 'm', 'm', 'a'];
function Arbol({ x, y, p = 1 }) {
  const n = HOJAS.length, dx = 74;
  const nodos = [];
  return <g transform={`translate(${x} ${y})`} opacity={kclamp(p * 2, 0, 1)}>
    {HOJAS.map((t, i) => { const lx = i * dx; const pair = Math.floor(i / 2) * 2 * dx + dx / 2;
      return <g key={i}>
        <line x1={lx} y1={0} x2={lx} y2={-60} stroke={KC.ink} strokeWidth={5} />
        <circle cx={lx} cy={20} r={20} fill={t === 'a' ? AX.fan : '#c98a4b'} stroke={KC.ink} strokeWidth={4} opacity={kclamp(p * 3 - i * 0.1, 0, 1)} />
      </g>; })}
    {[0, 1, 2, 3, 4, 5].map((k) => <line key={'p' + k} x1={k * 2 * dx} y1={-60} x2={k * 2 * dx + dx} y2={-60} stroke={KC.ink} strokeWidth={5} />)}
    {[0, 1, 2, 3, 4, 5].map((k) => <line key={'v' + k} x1={k * 2 * dx + dx / 2} y1={-60} x2={k * 2 * dx + dx / 2} y2={-110 - (k % 2) * 30} stroke={KC.ink} strokeWidth={5} />)}
    {[0, 1, 2].map((k) => <g key={'s' + k}>
      <line x1={k * 4 * dx + dx / 2} y1={-110} x2={k * 4 * dx + 2.5 * dx} y2={-110} stroke={KC.ink} strokeWidth={5} />
      <line x1={k * 4 * dx + 2.5 * dx} y1={-140} x2={k * 4 * dx + 2.5 * dx} y2={-110} stroke={KC.ink} strokeWidth={5} />
      <line x1={k * 4 * dx + 1.5 * dx} y1={-110} x2={k * 4 * dx + 1.5 * dx} y2={-180} stroke={KC.ink} strokeWidth={5} />
    </g>)}
    <line x1={1.5 * dx} y1={-180} x2={9.5 * dx} y2={-180} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2].map((k) => <line key={'w' + k} x1={k * 4 * dx + 1.5 * dx} y1={-180} x2={k * 4 * dx + 1.5 * dx} y2={-180} />)}
  </g>;
}
// belleza: el mismo árbol, más alto (k veces en vertical), con ramas que crecen desde la raíz y hojas con volumen.
function ArbolAlto({ x, y, p = 1, k = 2.2 }) {
  const dx = 74, L = (x1, y1, x2, y2, key, t0) => { const q = kclamp((p - t0) * 4, 0, 1);
    return <line key={key} x1={x1} y1={y1 * k} x2={klerp(x1, x2, q)} y2={klerp(y1, y2, q) * k} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />; };
  return <g transform={`translate(${x} ${y})`} opacity={kclamp(p * 2, 0, 1)}>
    <defs><radialGradient id="hojaVol" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".35" /></radialGradient></defs>
    {L(1.5 * dx, -180, 9.5 * dx, -180, 'r', 0)}
    {[0, 1, 2].map((m) => <g key={'s' + m}>{L(m * 4 * dx + 1.5 * dx, -180, m * 4 * dx + 1.5 * dx, -110, 'a', 0.1)}{L(m * 4 * dx + dx / 2, -110, m * 4 * dx + 2.5 * dx, -110, 'b', 0.2)}
      {L(m * 4 * dx + 2.5 * dx, -140, m * 4 * dx + 2.5 * dx, -110, 'c', 0.2)}</g>)}
    {[0, 1, 2, 3, 4, 5].map((m) => <g key={'v' + m}>{L(m * 2 * dx + dx / 2, -110 - (m % 2) * 30, m * 2 * dx + dx / 2, -60, 'v', 0.3)}{L(m * 2 * dx, -60, m * 2 * dx + dx, -60, 'h', 0.4)}</g>)}
    {HOJAS.map((t, i) => { const lx = i * dx, o = kclamp(p * 3 - 1.2 - i * 0.08, 0, 1), c = t === 'a' ? AX.fan : '#c98a4b';
      return <g key={i}>
        {L(lx, -60, lx, 0, 'l', 0.5)}
        <g opacity={o}><circle cx={lx} cy={30} r={44} fill={c} opacity=".18" />
          <circle cx={lx} cy={30} r={28} fill={c} stroke={KC.ink} strokeWidth={5} /><circle cx={lx} cy={30} r={26} fill="url(#hojaVol)" /></g>
      </g>; })}
  </g>;
}
// Muestra de polvo (filtro redondo) con ✗.
function Filtro({ x, y, tache = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={34} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    <circle r={22} fill={AX.polvo} opacity=".7" />
    {tache > 0 && <path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={tache} transform={`scale(${klerp(1.6, 1, tache)})`} />}
  </g>;
}
// Mapa del Caribe (esquemático): Florida y sus Cayos, Cuba, la península de Yucatán.
function MapaCaribe({ flo = 0, yuc = 0 }) {
  return <g>
    <rect x={0} y={380} width={1080} height={900} fill={MAPA.mar} />
    <path d="M 0 380 L 1080 380 L 1080 420 Q 760 420 700 460 Q 660 520 690 600 Q 720 680 700 740 Q 680 770 650 740 Q 600 660 560 600 Q 520 560 440 560 Q 300 560 200 600 Q 120 640 80 720 Q 60 800 80 880 L 0 880 Z" fill={MAPA.tierra} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 880 L 80 880 Q 120 980 180 1010 Q 230 1040 300 1000 Q 330 960 320 880 Q 300 830 250 820 Q 230 860 200 900 Q 170 960 140 1060 Q 150 1160 200 1280 L 0 1280 Z" fill={MAPA.tierra} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 420 860 Q 520 820 640 830 Q 760 840 880 900 Q 900 920 860 925 Q 760 905 650 880 Q 530 880 440 885 Z" fill={MAPA.tierra} stroke={KC.ink} strokeWidth={5} />
    {[[640, 780], [610, 795], [580, 805], [550, 812], [520, 816]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill={MAPA.tierra} stroke={KC.ink} strokeWidth={3} />)}
    {flo > 0 && <circle cx={590} cy={800} r={70 * kEase.rebote(kclamp(flo, 0, 1))} fill="none" stroke={KC.red} strokeWidth={9} />}
    {yuc > 0 && <circle cx={250} cy={930} r={95 * kEase.rebote(kclamp(yuc, 0, 1))} fill="none" stroke={KC.red} strokeWidth={9} />}
    <text x={720} y={540} style={{ font:`700 28px ${KF.mono}` }} fill="#d8c594">FLORIDA</text>
    <text x={660} y={960} style={{ font:`700 24px ${KF.mono}` }} fill="#d8c594">CUBA</text>
    <text x={20} y={1150} style={{ font:`700 24px ${KF.mono}` }} fill="#d8c594">MÉXICO</text>
    <text x={380} y={720} style={{ font:`700 24px ${KF.mono}` }} fill="#a9dcf2">golfo de México</text>
    <text x={560} y={1080} style={{ font:`700 26px ${KF.mono}` }} fill="#a9dcf2">mar Caribe</text>
  </g>;
}
// Abanico chiquito (íconos de conteo).
function MiniAbanico({ x, y, s = 1, enfermo = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -25, 0, 25, 50].map((a, i) => <line key={i} x1={0} y1={0} x2={Math.sin(a * Math.PI / 180) * 90} y2={-Math.cos(a * Math.PI / 180) * 90} stroke={AX.fan} strokeWidth={8} strokeLinecap="round" />)}
    {[40, 65].map((r, i) => <path key={i} d={`M ${-Math.sin(0.87) * r} ${-Math.cos(0.87) * r} A ${r} ${r} 0 0 1 ${Math.sin(0.87) * r} ${-Math.cos(0.87) * r}`} stroke={AX.fan} strokeWidth={5} fill="none" />)}
    {enfermo && <><circle cx={10} cy={-55} r={20} fill="none" stroke={AX.anillo} strokeWidth={9} /><circle cx={10} cy={-55} r={11} fill={AX.eje} /></>}
    <path d="M -14 4 Q 0 -10 14 4 Z" fill={AX.fanOsc} />
  </g>;
}
// Silueta de persona.
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={70} fill="#5a3a8a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -130 0 Q -130 -200 0 -210 Q 130 -200 130 0 Z" fill="#5a3a8a" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

const LES = { x: -60, y: -330, r: 46 };        // la lesión, en coordenadas del abanico
function AbanicoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Animal, H: CUES.Hongo, Hi: CUES.Hifas, D: CUES.Defensa, An: CUES.Anillo, P: CUES.Pregunta, Po: CUES.Polvo, Co: CUES.Contra, F: CUES.Florida, Y: CUES.Yucatan, Hu: CUES.Humanos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.5;
  const lupaG = kprog(T, K.G + 0.25, K.G + 0.9, kEase.rebote);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el abanico en el arrecife, la lupa sobre el anillo morado */}
      {/* pase a mano: abanico 1.33× (s 1.05→1.4) y centrado, de orilla a orilla; barra «10 cm» 110→147 px */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.06}>
        <Arrecife T={T} dy={130} />
        {fsvg(<>
          <Abanico T={T} x={540} y={1430} s={1.4} lesion={LES} />
          {lupaG > 0 && <g transform={`translate(${540 + LES.x * 1.4} ${1430 + LES.y * 1.4}) scale(${lupaG})`}>
            <circle r={150} fill="rgba(255,255,255,.18)" stroke={KC.white} strokeWidth={12} />
            <line x1={106} y1={106} x2={200} y2={200} stroke={KC.ink} strokeWidth={28} strokeLinecap="round" />
          </g>}
        </>, 20)}
      </Escena>
      {/* 2 · no es planta: pólipos de 8 tentáculos sobre una ramita (aumentada) */}
      <Escena T={T} a={K.A} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {/* pase a mano: ramita y pólipos 1.8× (tres pólipos llenan el ancho); barra «1 mm» 160→288 px */}
        {fsvg(<g transform="translate(540 1150) scale(1.8) translate(-480 -990)">
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.fanOsc} strokeWidth={130} fill="none" strokeLinecap="round" />
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.fan} strokeWidth={110} fill="none" strokeLinecap="round" />
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.eje2} strokeWidth={16} fill="none" strokeDasharray="30 18" opacity=".6" />
          {[120, 300, 480, 660, 840, 1000].map((px, i) => { const py = 990 + Math.sin(px / 170) * -20 - 40; const ab = kprog(T, K.A + 0.3 + i * 0.2, K.A + 1.1 + i * 0.2, kEase.sale) * (0.85 + 0.15 * Math.sin(T * 2 + i));
            return <Polipo key={i} x={px} y={py} s={1.3} abre={ab} rot={(i % 2 ? 6 : -6)} />; })}
        </g>)}
      </Escena>
      {/* 3 · el hongo: Aspergillus sydowii en el suelo */}
      <Escena T={T} a={K.H} b={K.Hi} zoom={0.06}>
        {/* pase a mano: fondo oscuro (antes amarillo brillante y tierra café clara), el suelo baja y el hongo crece 1.39× (s 1.15→1.6) al centro;
            barra «30 µm» 170→237 px */}
        <FondoLunares color={AX.polvo} />
        {fsvg(<>
          <g transform="translate(120 264)">
            <rect x={-200} y={1060} width={1480} height={900} fill="#452c13" />
            <path d="M -200 1060 Q 270 1030 540 1060 Q 810 1090 1280 1050" stroke={KC.ink} strokeWidth={6} fill="none" />
            {[[120, 1160, 30], [380, 1230, 22], [700, 1150, 36], [900, 1260, 26], [250, 1320, 18], [-60, 1250, 24]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={r * 1.4} ry={r} fill="#2e1c0b" stroke={KC.ink} strokeWidth={4} />)}
            <path d="M -120 1090 Q 300 1080 420 1066 Q 540 1052 760 1090 Q 900 1110 1040 1080" stroke="#f2efe2" strokeWidth={9} fill="none" />
          </g>
          {/* el pie del hongo ya está a medio crecer cuando empieza la escena (antes el cuadro arrancaba vacío) */}
          <Conidioforo T={T} x={540} y={1330} s={1.6} crece={klerp(0.45, 1, kprog(T, K.H - 0.2, K.H + 1.8))} />
        </>)}
      </Escena>
      {/* 4–5 · por dentro: hifas que comen el tejido; células de defensa y banda de melanina */}
      <Escena T={T} a={K.Hi} b={K.An} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        {/* pase a mano: el tejido 1.3× (ocupa del 25 al 70 % del alto); barra «20 µm» 120→156 px */}
        {fsvg(<g transform="translate(540 900) scale(1.3) translate(-540 -880)">
          {(() => { const R = krng(31); return Array.from({ length: 70 }, (_, i) => { const cx = 40 + R() * 1000, cy = 560 + R() * 620; const near = HIF.length && kprog(T, K.Hi + 0.2, K.Hi + 2.4);
            const comido = (Math.abs(cy - (760 + (cx - 120) * 0.3)) < 90) ? near : 0;
            return <circle key={i} cx={cx} cy={cy} r={26 + R() * 14} fill={mixHex(AX.tejido, '#5a4a52', comido * 0.8)} stroke={AX.tejido2} strokeWidth={3} opacity={1 - comido * 0.5} />; }); })()}
          {T > K.D && <path d={HIF[0]} stroke={AX.melanina} strokeWidth={46 * kprog(T, K.D + 1.2, K.D + 2.6, kEase.sale)} fill="none" strokeLinecap="round" opacity=".9" />}
          {T > K.D && <path d={HIF[1]} stroke={AX.melanina} strokeWidth={40 * kprog(T, K.D + 1.5, K.D + 2.9, kEase.sale)} fill="none" strokeLinecap="round" opacity=".9" />}
          <Hifas p={kprog(T, K.Hi + 0.1, K.Hi + 2.6)} w={15} />
          {T > K.D && (() => { const R = krng(77); return Array.from({ length: 16 }, (_, i) => { const sx = R() * 1080, sy = R() < 0.5 ? 480 : 1260, tx = 160 + (i / 15) * 760, ty = 760 + (tx - 120) * 0.3 + (i % 2 ? -46 : 46);
            const q = kprog(T, K.D + 0.1 + i * 0.05, K.D + 1.3 + i * 0.05, kEase.sale); return <Amebocito key={i} x={klerp(sx, tx, q)} y={klerp(sy, ty, q)} r={20} />; }); })()}
        </g>)}
      </Escena>
      {/* 6 · por fuera: el anillo morado con el centro muerto */}
      <Escena T={T} a={K.An} b={K.P} zoom={0.05}>
        <Arrecife T={T} dy={420} />
        {fsvg(<g transform="translate(540 900) scale(2.6) translate(60 330)"><Abanico T={T} x={0} y={0} s={1} lesion={LES} /></g>, 20)}
      </Escena>
      {/* 7 · re-gancho: ¿cómo llega un hongo de tierra al mar? */}
      <Escena T={T} a={K.P} b={K.Po} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {/* pase a mano: la tierra con su hongo arriba y el abanico abajo, grandes (antes dos dibujos chicos a los lados) */}
          <g transform="translate(540 700) scale(1.3) translate(-840 -1130)"><path d="M 640 1130 Q 760 960 900 1000 Q 1000 1040 1040 1130 Z" fill="#5a3a1c" stroke={KC.ink} strokeWidth={6} /></g>
          <Conidioforo T={T} x={552} y={545} s={0.56} crece={1} />
          <Abanico T={T} x={540} y={1500} s={0.8} lesion={LES} />
          <Interrogacion T={T} x={540} y={960} tam={240} />
        </>)}
      </Escena>
      {/* 8–9 · hipótesis del polvo del Sahara y lo que la contradice */}
      <Escena T={T} a={K.Po} b={K.F} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {/* pase a mano: mapa oscuro y 70 px más abajo (centrado); tarjetas arriba, fuera del mapa; árbol 1.15× sobre panel oscuro */}
        {fsvg(<g transform="translate(0 130)">{/* belleza (encuadre): el mapa baja 60 px más (estaba ARRIBA) */}
          <g opacity={1 - kprog(T, K.Co + 2.6, K.Co + 3.1)}>
            <MapaAtlantico />
            <NubePolvo T={T} p={kprog(T, K.Po + 0.5, K.Po + 3.5)} />
            <SelloRect T={T} at={K.Po + 0.3} x={540} y={1130} texto="HIPÓTESIS" color={KC.red} tam={64} />
            {T > K.Co && <><Filtro x={780} y={700} tache={kprog(T, K.Co + 0.6, K.Co + 0.9)} /><Filtro x={850} y={760} tache={kprog(T, K.Co + 0.8, K.Co + 1.1)} />
              <Filtro x={560} y={880} tache={kprog(T, K.Co + 1.0, K.Co + 1.3)} /><Filtro x={620} y={940} tache={kprog(T, K.Co + 1.2, K.Co + 1.5)} /></>}
          </g>
          {T > K.Co + 2.6 && <g opacity={kprog(T, K.Co + 2.6, K.Co + 3.1)}>
            <rect x={0} y={380} width={1080} height={900} fill="#141d33" />
            <g transform="translate(540 1020) scale(1.02) translate(-540 -1000)"><ArbolAlto x={133} y={1000} k={2.3} p={kprog(T, K.Co + 2.8, K.Co + 4.2)} /></g>
          </g>}
        </g>)}
      </Escena>
      {/* 10–11 · Florida y Yucatán */}
      <Escena T={T} a={K.F} b={K.Hu} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<g transform="translate(0 130)">{/* belleza (encuadre): el mapa baja 60 px más (estaba ARRIBA) */}
          <MapaCaribe flo={kprog(T, K.F + 0.3, K.F + 0.9)} yuc={kprog(T, K.Y + 0.2, K.Y + 0.8)} />
          {T > K.F && T < K.Y && (() => { const v = kprog(T, K.F + 2.2, K.F + 3.8, kEase.suave); return <g transform="translate(850 1180)">
            <g opacity={1 - v * 0.75}><MiniAbanico x={0} y={0} s={1.3} /></g>
            <rect x={-130} y={-140} width={130} height={150} fill="none" />
          </g>; })()}
          {T > K.Y && Array.from({ length: 8 }, (_, i) => { const on = kprog(T, K.Y + 1.0 + i * 0.08, K.Y + 1.3 + i * 0.08, kEase.rebote);
            return on > 0 ? <MiniAbanico key={i} x={110 + i * 123} y={1150} s={0.75 * on} enfermo={i === 5 && T > K.Y + 1.9} /> : null; })}
        </g>)}
      </Escena>
      {/* 12 · dato raro: también en personas */}
      <Escena T={T} a={K.Hu} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {/* pase a mano: persona 1.5× y hongo 1.5×, uno junto al otro llenando el cuadro */}
          <Persona x={290} y={1400} s={1.85} />
          <Conidioforo T={T} x={800} y={1400} s={1.15} crece={kprog(T, K.Hu + 0.3, K.Hu + 1.5)} />
          <path d="M 425 860 L 580 985" stroke={KC.ink} strokeWidth={8} strokeDasharray="16 12" />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo arrecife y el mismo abanico; llegan abanicos jóvenes */}
      {/* pase a mano: el mismo encuadre grande del gancho; los abanicos jóvenes crecen delante, a los lados */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <Arrecife T={T} dy={130} />
        {fsvg(<>
          <Abanico T={T} x={540} y={1430} s={1.4} lesion={LES} />
          {[[850, 1450, 0.46], [1000, 1440, 0.34], [150, 1455, 0.4], [320, 1465, 0.27]].map(([x, y, s], i) => { const q = kprog(T, K.C + 1.0 + i * 0.4, K.C + 2.0 + i * 0.4, kEase.sale);
            return q > 0 ? <Abanico key={i} T={T} x={x} y={y} s={s * q} fase={i * 1.7} /> : null; })}
        </>, 20)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.A - 0.3} texto="no es su color normal" x={400} y={290} tam={40} borde={AX.anillo} />
      <Etq T={T} at={K.G + 2.6} until={K.A - 0.3} x={625} y={975} texto="anillo morado" tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 3.6} until={K.A - 0.3} x={60} y={390} texto="sospechoso: un hongo de tierra" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 0.6} until={K.H - 0.3} x={60} y={440} texto="abanico de mar" tam={38} color={KC.ink} />
      <Etq T={T} at={K.A + 1.0} until={K.H - 0.3} x={60} y={500} texto="Gorgonia ventalina" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.A + 1.8} until={K.H - 0.3} x={60} y={660} texto="pólipos de 8 tentáculos · animal" tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 2.4} until={K.H - 0.3} texto="NO ES PLANTA" x={400} y={300} tam={44} borde={KC.red} />
      <Etq T={T} at={K.H + 0.5} until={K.Hi - 0.2} x={575} y={1180} texto="Aspergillus sydowii" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.H + 1.2} until={K.Hi - 0.2} texto="suele vivir en el suelo" x={540} y={1440} tam={36} borde={AX.tierra} />
      <Etq T={T} at={K.H + 1.9} until={K.Hi - 0.2} x={560} y={410} texto="esporas rugosas" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.05} until={K.An - 0.3} texto="POR DENTRO · EL TEJIDO" x={360} y={290} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hi + 0.8} until={K.D + 1.0} x={60} y={690} texto="hifas" tam={36} color={KC.texto} />
      <Etq T={T} at={K.D + 0.6} until={K.An - 0.3} x={60} y={1340} texto="células de defensa" tam={32} color={AX.ameba} />
      <Etq T={T} at={K.D + 1.8} until={K.An - 0.3} x={60} y={400} texto="banda de melanina" tam={32} color="#e0b98f" />
      <Etq T={T} at={K.An + 0.5} until={K.P - 0.2} x={60} y={560} texto="anillo morado" tam={40} color={KC.ink} />
      <Etq T={T} at={K.An + 1.3} until={K.P - 0.2} x={60} y={630} texto="centro: tejido muerto, eje desnudo" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Po + 1.4} until={K.Co - 0.2} anio="2000" quien="Shinn y colegas" revista="Geophys. Res. Letters" x={330} y={300} />
      <TarjetaEstudio T={T} at={K.Co + 0.1} until={K.Co + 2.5} anio="2008" quien="Rypien · Cornell" revista="7 muestras · sin A. sydowii" x={330} y={300} />
      <Etq T={T} at={K.Co + 1.6} until={K.Co + 2.5} x={60} y={1400} texto="no lo descarta del todo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.0} until={K.F - 0.3} texto="muchas entradas desde tierra" x={540} y={560} tam={40} borde={AX.tierra} />
      <Etq T={T} at={K.Co + 3.4} until={K.F - 0.3} x={60} y={1260} texto="● abanico" tam={30} color={AX.fan} />
      <Etq T={T} at={K.Co + 3.6} until={K.F - 0.3} x={330} y={1260} texto="● ambiente (suelo, aire…)" tam={30} color="#c98a4b" />
      <Etq T={T} at={K.Co + 3.8} until={K.F - 0.3} x={60} y={1320} texto="árbol genético (esquemático)" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.F + 0.6} until={K.F + 2.1} anio="2004" quien="Kim y Harvell · Cayos de Florida" revista="Am. Naturalist · datos 1997–2003" x={400} y={300} />
      <NumeroGigante T={T} at={K.F + 2.2} until={K.Y - 0.2} valor={50} dur={1.2} prefijo="> " sufijo=" %" etiqueta="del tejido, perdido" x={540} y={300} tam={150} color={KC.red} />
      <NumeroGigante T={T} at={K.Y + 1.9} until={K.Hu - 0.2} valor={8} dur={0.5} prefijo="1 de cada " x={540} y={320} tam={110} color={AX.fan} />
      <Etq T={T} at={K.Y + 2.6} until={K.Hu - 0.2} x={40} y={1445} texto="enfermos: 12.85 % en 2002 · 5.26 % en 2004" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Hu + 0.6} until={K.C - 0.3} x={560} y={700} texto="Aspergillus sydowii" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.Y + 2.9} until={K.Hu - 0.2} x={40} y={1482} texto="Ward y colegas · Dis. Aquat. Org., 2006" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Hu + 1.2} until={K.C - 0.3} texto="misma especie, también en personas" x={540} y={330} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Hu + 1.8} until={K.C - 0.3} x={60} y={440} texto="muestreo genético mundial, 2008" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="los casos bajaron (1997–2003)" x={400} y={290} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="¿más resistencia? (hipótesis)" x={400} y={380} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.A} texto="10 cm" largo={147} y={1460} />
      <BarraEscala T={T} at={K.A} until={K.H} texto="1 mm" largo={288} />
      <BarraEscala T={T} at={K.H} until={K.Hi} texto="30 µm" largo={237} y={1460} />
      <BarraEscala T={T} at={K.Hi} until={K.An} texto="20 µm" largo={156} />
      {/* pase a mano: en esta escena el abanico va a 2.6 (10 cm = 273 px, misma proporción que el gancho), así que «5 cm» mide 136 px (antes 170) */}
      <BarraEscala T={T} at={K.An} until={K.P} texto="5 cm" largo={136} y={1460} />
      <BarraEscala T={T} at={K.Po} until={K.Hu} texto="mapa esquemático" largo={0} y={1460} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={147} y={1460} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Ese anillo morado *es su defensa.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.H - 0.1} texto="No es planta: *es una colonia de pólipos.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Hi - 0.1} texto="*Aspergillus sydowii:* suele vivir en el suelo." />
      <Subtitulo T={T} idx={3} at={K.Hi + 0.1} until={K.D - 0.1} texto="Las hifas *se comen el tejido.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.An - 0.1} texto="Células de defensa y *melanina.*" />
      <Subtitulo T={T} idx={5} at={K.An + 0.1} until={K.P - 0.1} texto="Anillo morado, *centro muerto.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Po - 0.1} texto="¿Cómo llega *al mar?*" />
      <Subtitulo T={T} idx={7} at={K.Po + 0.1} until={K.Co - 0.1} texto="Hipótesis: *el polvo del Sahara.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.F - 0.1} texto="Polvo: no. Genes: *muchas entradas desde tierra.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.Y - 0.1} texto="Florida, 1997–2003: *más de la mitad del tejido.*" />
      <Subtitulo T={T} idx={10} at={K.Y + 0.1} until={K.Hu - 0.1} texto="Yucatán, 2002: *1 de cada 8 enfermo.*" />
      <Subtitulo T={T} idx={11} at={K.Hu + 0.1} until={K.C - 0.1} texto="También *en personas enfermas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un animal *defendiéndose.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.A + 0.5, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.4, K.Hi - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.D + 0.6, K.An - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Po + 0.4, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.Po + 0.9, K.Co - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.F + 1.0, K.Y - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Hu + 0.3, K.C - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="131" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AbanicoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AbanicoShot /></CompositionStage></div>;
}
window.AbanicoApp = AbanicoApp;
