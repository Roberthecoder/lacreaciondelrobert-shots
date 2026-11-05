// Shot Fungi Mati #74 · Esa costra no es corteza: el cuerpo de hongo más grande jamás documentado — NARRADO
// (gancho 1 "Esto no es X: es Y" + N2 de cifras con viaje tronco → poros y esporas → el mismo tronco con la regla).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const GX = { costra:'#a5521c', costra2:'#c8702e', costra3:'#5e2f10', poro:'#3a1c08', brillo:'#f0b070', madera:'#7a4a22', madera2:'#5a3416', corte:'#d9a86a', anillo:'#a8743c', bosque:'#1f6b3a', suelo:'#4a2e1a' };

// Tronco caído visto de lado y un poco desde abajo. (x, y) = esquina superior izquierda. abajo = alto de la cara inferior visible.
// costra 0..1 = cuánto de la cara de abajo cubre el hongo (crece de izquierda a derecha). brillo = destello de la superficie de poros.
function TroncoCaido({ T = 0, x, y, w = 960, h = 170, abajo = 90, costra = 1, seed = 3 }) {
  const g = krng(seed), poros = Array.from({ length: 70 }, () => [g(), g()]);
  const cw = (w - 70) * costra;
  return <g transform={`translate(${x} ${y})`}>
    {/* cara de abajo (madera vieja) */}
    {abajo > 0 && <path d={`M 20 ${h - 10} L ${w - 10} ${h - 10} Q ${w + 6} ${h + abajo * 0.5} ${w - 30} ${h + abajo} L 50 ${h + abajo} Q 10 ${h + abajo * 0.5} 20 ${h - 10} Z`} fill={GX.madera2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    {/* la costra del hongo: pegada a la cara de abajo, café-óxido con poros */}
    {abajo > 0 && cw > 4 && <g>
      <path d={`M 44 ${h - 4} L ${44 + cw} ${h - 4} Q ${54 + cw} ${h + abajo * 0.5} ${36 + cw} ${h + abajo - 6} L 64 ${h + abajo - 6} Q 34 ${h + abajo * 0.5} 44 ${h - 4} Z`} fill={GX.costra} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M 60 ${h + abajo * 0.3} L ${30 + cw} ${h + abajo * 0.3}`} stroke={GX.costra2} strokeWidth={Math.max(4, abajo * 0.18)} strokeLinecap="round" opacity=".7" />
      {poros.map(([u, v], i) => u * (w - 70) < cw - 10 ? <circle key={i} cx={56 + u * (w - 80)} cy={h + 6 + v * (abajo - 18)} r={2.6} fill={GX.poro} opacity=".7" /> : null)}
      <path d={`M 80 ${h + abajo * 0.62} L ${cw * 0.7} ${h + abajo * 0.62}`} stroke={GX.brillo} strokeWidth={5} strokeLinecap="round" opacity={0.35 + 0.2 * Math.sin(T * 2)} />
    </g>}
    {/* cuerpo del tronco */}
    <rect x={0} y={0} width={w} height={h} rx={34} fill={GX.madera} stroke={KC.ink} strokeWidth={8} />
    {[28, 64, 100, 136].map((yy, i) => <path key={i} d={`M 70 ${yy} Q ${w * 0.45} ${yy - 12} ${w - 30} ${yy + 6}`} stroke={GX.madera2} strokeWidth={6} fill="none" />)}
    {/* musgo arriba */}
    {[0.12, 0.3, 0.55, 0.78].map((u, i) => <ellipse key={i} cx={w * u} cy={6} rx={46} ry={12} fill="#4f9a3a" stroke={KC.ink} strokeWidth={4} />)}
    {/* cara del corte */}
    <ellipse cx={0} cy={h / 2 + abajo * 0.25} rx={50} ry={h / 2 + abajo * 0.25} fill={GX.corte} stroke={KC.ink} strokeWidth={8} />
    {[0.72, 0.46, 0.22].map((k, i) => <ellipse key={i} cx={0} cy={h / 2 + abajo * 0.25} rx={50 * k} ry={(h / 2 + abajo * 0.25) * k} fill="none" stroke={GX.anillo} strokeWidth={4} />)}
  </g>;
}

// Cinta métrica amarilla que se desenrolla de x0 a x0 + largo · p.
function Cinta({ x0, y, largo, p = 1, texto, tam = 40 }) {
  if (p <= 0) return null;
  const L = largo * p;
  return <g>
    <rect x={x0} y={y - 16} width={L} height={32} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor(L / 24) }, (_, i) => <line key={i} x1={x0 + 12 + i * 24} y1={y - 16} x2={x0 + 12 + i * 24} y2={y - (i % 4 === 0 ? 0 : 6)} stroke={KC.ink} strokeWidth={3} />)}
    <rect x={x0 + L - 10} y={y - 30} width={34} height={60} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    {texto && p > 0.95 && <text x={x0 + largo / 2} y={y - 34} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{texto}</text>}
  </g>;
}

// Cota con flechas (horizontal o vertical).
function Cota({ x1, y1, x2, y2, p = 1, texto, tam = 36, color = KC.ink, lado = -1 }) {
  if (p <= 0) return null;
  const ex = klerp(x1, x2, p), ey = klerp(y1, y2, p), ang = Math.atan2(y2 - y1, x2 - x1), hor = Math.abs(y2 - y1) < 2;
  const fl = (px, py, a) => `M ${px} ${py} L ${px - 22 * Math.cos(a - 0.45)} ${py - 22 * Math.sin(a - 0.45)} M ${px} ${py} L ${px - 22 * Math.cos(a + 0.45)} ${py - 22 * Math.sin(a + 0.45)}`;
  return <g>
    <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={6} />
    <path d={fl(x1, y1, ang + Math.PI)} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
    {p > 0.98 && <path d={fl(x2, y2, ang)} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />}
    {p > 0.98 && texto && (hor
      ? <text x={(x1 + x2) / 2} y={y1 + lado * 22 + (lado > 0 ? tam * 0.8 : 0)} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{texto}</text>
      : <text x={x1 + lado * 22} y={(y1 + y2) / 2 + tam * 0.35} textAnchor={lado < 0 ? 'end' : 'start'} style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{texto}</text>)}
  </g>;
}

// Silueta de persona (para comparar tamaño; sin cifra). Pies en (x, y), alto en px.
function Persona({ x, y, alto = 150, paso = 0, color = KC.ink }) {
  const k = alto / 150, pierna = Math.sin(paso) * 14;
  return <g transform={`translate(${x} ${y}) scale(${k})`} fill={color}>
    <circle cx={0} cy={-136} r={14} />
    <rect x={-13} y={-120} width={26} height={58} rx={10} />
    <path d={`M -6 -66 L ${-10 - pierna} 0`} stroke={color} strokeWidth={11} strokeLinecap="round" />
    <path d={`M 6 -66 L ${10 + pierna} 0`} stroke={color} strokeWidth={11} strokeLinecap="round" />
    <path d={`M -12 -112 L ${-24 + pierna * 0.5} -70`} stroke={color} strokeWidth={9} strokeLinecap="round" />
    <path d={`M 12 -112 L ${24 - pierna * 0.5} -70`} stroke={color} strokeWidth={9} strokeLinecap="round" />
  </g>;
}

// Mapa esquemático: costa del sur de China y la isla de Hainan.
function MapaHainan({ x, y, s = 1, p = 1, T = 0 }) {
  const costa = 'M 0 40 Q 120 30 200 90 Q 260 150 330 150 Q 420 140 470 210 Q 520 260 600 250 Q 680 240 760 180 L 760 0 L 0 0 Z';
  const isla = 'M 330 330 Q 380 290 450 300 Q 520 310 530 360 Q 540 420 480 450 Q 420 480 370 450 Q 320 420 330 330 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={costa} fill="#bfe3b4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={150} y={60} style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>CHINA</text>
    <g opacity={p} transform={`translate(430 380) scale(${klerp(0.6, 1, p)}) translate(-430 -380)`}>
      <path d={isla} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" style={{ filter:`drop-shadow(0 0 ${10 + 6 * Math.sin(T * 4)}px ${KC.gold})` }} />
      <circle cx={420} cy={400} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}

// Báscula de carátula: aguja hasta "valor" (0..600 kg), franja 400–500 resaltada.
function Bascula({ x, y, r = 230, aguja = 0, T = 0, franja = 1, mini = false }) {
  const ang = (v) => Math.PI * (1 + v / 600);
  const pt = (v, rr) => [Math.cos(ang(v)) * rr, Math.sin(ang(v)) * rr];
  const arc = (a, b, rr) => { const [x1, y1] = pt(a, rr), [x2, y2] = pt(b, rr); return `M ${x1} ${y1} A ${rr} ${rr} 0 0 1 ${x2} ${y2}`; };
  const v = aguja + (aguja > 380 ? Math.sin(T * 7) * 12 : 0);
  const [ax, ay] = pt(v, r - 40);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-r - 40} y={-r - 40} width={2 * r + 80} height={r + 150} rx={40} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <path d={arc(0, 600, r - 10)} stroke="#cfc6b4" strokeWidth={30} fill="none" />
    <path d={arc(400, 400 + 100 * franja, r - 10)} stroke={KC.red} strokeWidth={30} fill="none" />
    {[0, 100, 200, 300, 400, 500, 600].map((m) => { const [a1, b1] = pt(m, r - 30), [a2, b2] = pt(m, r + 6), [tx, ty] = pt(m, r - 70);
      return <g key={m}><line x1={a1} y1={b1} x2={a2} y2={b2} stroke={KC.ink} strokeWidth={5} />
        {!mini && <text x={tx} y={ty + 10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{m}</text>}</g>; })}
    <line x1={0} y1={0} x2={ax} y2={ay} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <circle r={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={80} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>kg</text>
  </g>;
}

// Champiñón de perfil con láminas (para comparar).
function ConLaminas({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -22 0 L -16 -140 L 16 -140 L 22 0 Z" fill="#f3e6c4" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -140 Q -150 -260 0 -270 Q 150 -260 150 -140 Z" fill="#c98b2b" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -140 Q 0 -110 150 -140" fill="#f7efd9" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 13 }, (_, i) => { const u = -132 + i * 22; return <line key={i} x1={u} y1={-138} x2={u * 0.18} y2={-124} stroke="#a07a4a" strokeWidth={4} />; })}
  </g>;
}
// Superficie de poros (vista de cerca, círculo). n poros por lado.
function SupPoros({ x, y, r = 150, T = 0 }) {
  const pts = []; for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) { const px = i * 24 + (j % 2) * 12, py = j * 22; if (px * px + py * py < (r - 16) * (r - 16)) pts.push([px, py]); }
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={GX.costra2} stroke={KC.ink} strokeWidth={8} />
    {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={7} fill={GX.poro} />)}
    <ellipse cx={-r * 0.35} cy={-r * 0.45} rx={r * 0.35} ry={r * 0.12} fill="#fff" opacity={0.3 + 0.1 * Math.sin(T * 2)} transform={`rotate(-30 ${-r * 0.35} ${-r * 0.45})`} />
  </g>;
}

// Bloque en corte de la costra: capas de tubos que se apilan. n = cuántas capas se ven (0..8). La más nueva queda abajo.
function CapasTubos({ x, y, w = 760, hCapa = 50, n = 8 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-60} width={w} height={60} fill={GX.madera} stroke={KC.ink} strokeWidth={7} />
    <text x={w / 2} y={-18} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.paper}>madera</text>
    {Array.from({ length: 8 }, (_, i) => { const p = kclamp(n - i, 0, 1); if (p <= 0) return null; const yy = i * hCapa;
      return <g key={i} opacity={p} transform={`translate(0 ${(1 - p) * -20})`}>
        <rect x={0} y={yy} width={w} height={hCapa} fill={i % 2 ? GX.costra : GX.costra2} stroke={KC.ink} strokeWidth={4} />
        {Array.from({ length: 24 }, (_, k) => <line key={k} x1={16 + k * 31} y1={yy + 6} x2={16 + k * 31} y2={yy + hCapa - 6} stroke={GX.costra3} strokeWidth={5} strokeLinecap="round" />)}
      </g>; })}
  </g>;
}

// Rodaja de tronco con pudrición blanca que avanza desde la orilla (p 0..1).
function RodajaPodrida({ T, x, y, r = 230, p = 0 }) {
  const g = krng(11), hifas = Array.from({ length: 40 }, () => [g() * Math.PI * 2, 0.4 + g() * 0.6]);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={GX.corte} stroke={KC.ink} strokeWidth={9} />
    {[0.85, 0.68, 0.5, 0.32, 0.16].map((k, i) => <circle key={i} r={r * k} fill="none" stroke={GX.anillo} strokeWidth={5} />)}
    <circle r={r} fill="#f6f1e6" opacity={0.85 * p} />
    <circle r={r * (1 - 0.75 * p)} fill={GX.corte} opacity={p > 0 ? 1 : 0} />
    {p > 0 && [0.85, 0.68, 0.5, 0.32, 0.16].map((k, i) => k < 1 - 0.75 * p ? <circle key={'b' + i} r={r * k} fill="none" stroke={GX.anillo} strokeWidth={5} /> : null)}
    {hifas.map(([a, l], i) => { const r0 = r * (1 - 0.75 * p) - 8, r1 = r0 - 50 * l * p;
      return p > 0.05 ? <path key={i} d={`M ${Math.cos(a) * r} ${Math.sin(a) * r} L ${Math.cos(a + 0.05 * Math.sin(T + i)) * r1} ${Math.sin(a + 0.05 * Math.sin(T + i)) * r1}`} stroke="#ffffff" strokeWidth={3} opacity=".85" /> : null; })}
  </g>;
}

// Espora elipsoide hialina (transparente) de largo L px.
function EsporaElip({ x, y, L = 120, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <ellipse rx={L / 2} ry={L * 0.39} fill="rgba(220,240,255,.18)" stroke="#dff3ff" strokeWidth={Math.max(3, L / 30)} />
    <ellipse cx={-L * 0.12} cy={-L * 0.12} rx={L * 0.14} ry={L * 0.07} fill="#fff" opacity=".45" />
    <circle cx={L * 0.08} cy={L * 0.05} r={L * 0.07} fill="rgba(200,230,255,.35)" />
  </g>;
}

// Medalla de récord.
function Medalla({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 3) * 5})`}>
    <path d="M -40 -120 L -10 -40 L 10 -40 L 40 -120 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <circle r={70} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} />
    <circle r={52} fill="none" stroke={KC.gold} strokeWidth={6} />
    <text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>RÉCORD</text>
  </g>;
}

function GiganteShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Encuentro, M: CUES.Medidas, P: CUES.Peso, Es: CUES.Especie, Po: CUES.Poros, Pr: CUES.Pregunta, Pe: CUES.Perenne, Ed: CUES.Edad, Sp: CUES.Esporas, C: CUES.Contraste, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const giro = kprog(T, K.G, K.G + 0.9, kEase.sale);        // la cámara deja ver la cara de abajo
  const PXM = 860 / 10.85;                                   // px por metro en la vista larga del tronco
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tronco gira y aparece la costra; la cinta mide casi 11 m */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform={`translate(0 ${klerp(-60, 0, giro)})`}>
            <TroncoCaido T={T} x={70} y={820} w={960} h={170} abajo={10 + 110 * giro} costra={kprog(T, K.G + 0.2, K.G + 1.4, kEase.sale)} />
          </g>
          <Cinta x0={110} y={790} largo={860} p={kprog(T, K.G + 1.8, K.G + 3.0, kEase.suave)} texto="≈ 11 m" tam={60} />
        </>)}
      </Escena>
      {/* 2 · el hallazgo: mapa de Hainan y luego dos micólogos que pasan sin reconocerlo */}
      <Escena T={T} a={K.E} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.E + 3.0, K.E + 3.4)}>
            <MapaHainan x={160} y={470} s={1} p={kprog(T, K.E + 0.4, K.E + 1.2, kEase.rebote)} T={T} />
          </g>
          {T > K.E + 3.0 && <g opacity={kprog(T, K.E + 3.0, K.E + 3.4)}>
            {[180, 420, 860].map((cx, i) => <Conifera key={i} x={cx} y={800} s={0.8} T={T} seed={i + 2} />)}
            <TroncoCaido T={T} x={60} y={780} w={960} h={150} abajo={90} costra={1} />
            {[0, 1].map((i) => { const u = kprog(T, K.E + 3.2, K.M, null); return <Persona key={i} x={klerp(-80, 1150, u) - i * 90} y={1150} alto={150} paso={T * 9 + i} />; })}
          </g>}
        </>)}
      </Escena>
      {/* 3 · medidas: 10.85 m, 84 cm, 5 cm, con una persona para comparar */}
      <Escena T={T} a={K.M} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <TroncoCaido T={T} x={110} y={560} w={860} h={150} abajo={100} costra={1} />
          <Persona x={70} y={810} alto={1.7 * PXM} color="#3a2a5a" />
          <Cota x1={150} y1={830} x2={150 + 10.85 * PXM - 50} y2={830} p={kprog(T, K.M + 0.4, K.M + 1.6, kEase.sale)} texto="10.85 m" tam={52} lado={1} />
          {/* bloque de la costra en perspectiva: ancho 84 cm y grosor 5 cm (vista de cerca) */}
          <g opacity={kprog(T, K.M + 2.2, K.M + 2.6)} transform="translate(160 1030)">
            <path d="M 0 0 L 420 0 L 560 -90 L 140 -90 Z" fill={GX.costra2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
            <path d="M 0 0 L 420 0 L 420 26 L 0 26 Z" fill={GX.costra3} stroke={KC.ink} strokeWidth={7} />
            <path d="M 420 0 L 560 -90 L 560 -64 L 420 26 Z" fill={GX.costra} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={40 + (i % 10) * 42 + Math.floor(i / 10) * 46} cy={-18 - Math.floor(i / 10) * 26} r={4} fill={GX.poro} />)}
          </g>
          <Cota x1={160} y1={1082} x2={580} y2={1082} p={kprog(T, K.M + 2.6, K.M + 3.4, kEase.sale)} texto="84 cm de ancho" tam={40} lado={1} />
          <Cota x1={740} y1={940} x2={740} y2={966} p={kprog(T, K.M + 3.9, K.M + 4.4, kEase.sale)} texto="5 cm de grueso" tam={40} lado={1} />
        </>)}
      </Escena>
      {/* 4 · peso: báscula */}
      <Escena T={T} a={K.P} b={K.Es}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Bascula x={540} y={960} r={260} T={T} aguja={600 * 0.75 * kprog(T, K.P + 0.3, K.P + 1.6, kEase.rebote)} franja={kprog(T, K.P + 1.4, K.P + 1.9)} />)}
      </Escena>
      {/* 5 · especie: láminas no, poros sí */}
      <Escena T={T} a={K.Es} b={K.Po}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <ConLaminas x={270} y={1010} s={1.0} />
          {T > K.Es + 1.6 && <Sello T={T} at={K.Es + 1.6} x={270} y={790} texto="NO" color={KC.red} r={80} />}
          <g opacity={kprog(T, K.Es + 2.0, K.Es + 2.4)}><SupPoros x={790} y={860} r={170} T={T} /></g>
          {T > K.Es + 2.8 && <Sello T={T} at={K.Es + 2.8} x={930} y={700} texto="SÍ" color="#118a3a" r={70} rot={8} />}
        </>)}
      </Escena>
      {/* 6 · poros al microscopio: 49 en 1 mm² → ≈ 452 millones */}
      <Escena T={T} a={K.Po} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<g transform="translate(110 430) scale(0.86)">
          <rect x={-10} y={-10} width={580} height={580} fill={GX.costra2} stroke={KC.gold2} strokeWidth={6} strokeDasharray="18 10" />
          {Array.from({ length: 49 }, (_, i) => { const on = kprog(T, K.Po + 0.3 + i * 0.045, K.Po + 0.45 + i * 0.045, kEase.rebote);
            const cx = 40 + (i % 7) * 80 + (Math.floor(i / 7) % 2) * 10, cy = 40 + Math.floor(i / 7) * 80;
            return <g key={i}><circle cx={cx} cy={cy} r={28} fill={GX.poro} stroke={GX.costra3} strokeWidth={4} />
              {on > 0 && <circle cx={cx} cy={cy} r={28 * on} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={1 - kprog(T, K.Po + 3.0, K.Po + 3.4) * 0.6} />}</g>; })}
        </g>)}
        {T < K.Po + 3.0 && <Contador T={T} at={K.Po + 0.3} desde={0} hasta={49} dur={2.2} x={540} y={1050} tam={64} color={KC.yellow} sufijo=" poros en 1 mm²" />}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.Pr} b={K.Pe} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><TroncoCaido T={T} x={40} y={960} w={520} h={110} abajo={70} costra={1} /><Interrogacion T={T} x={300} y={900} tam={420} /></>)}
      </Escena>
      {/* 8 · perenne: capas de tubos que se apilan */}
      <Escena T={T} a={K.Pe} b={K.Ed}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<CapasTubos x={160} y={560} w={760} hCapa={52} n={kprog(T, K.Pe + 0.6, K.Pe + 3.6) * 8} />)}
      </Escena>
      {/* 9 · edad: ~20 años comiendo madera (pudrición blanca) */}
      <Escena T={T} a={K.Ed} b={K.Sp}>
        <FondoLunares color={KC.mint} />
        {fsvg(<RodajaPodrida T={T} x={540} y={900} r={240} p={kprog(T, K.Ed + 0.6, K.Ed + 3.4)} />)}
        <NumeroGigante T={T} at={K.Ed + 0.2} until={K.Sp - 0.2} valor={20} dur={1.6} prefijo="≈ " sufijo=" años" x={700} y={470} tam={120} color={KC.yellow} />
      </Escena>
      {/* 10 · esporas elipsoides (al microscopio) */}
      <Escena T={T} a={K.Sp} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <EsporaElip x={540} y={820} L={300} rot={-18} o={kprog(T, K.Sp + 0.3, K.Sp + 0.9)} />
          {[[200, 600, 90, 30], [880, 620, 80, -40], [170, 980, 85, 60], [910, 1000, 95, 10], [720, 540, 70, 80]].map(([ex, ey, L, r], i) =>
            <EsporaElip key={i} x={ex + Math.sin(T * 0.8 + i) * 14} y={ey + Math.cos(T * 0.7 + i) * 12} L={L} rot={r + T * 8} o={kprog(T, K.Sp + 0.6 + i * 0.15, K.Sp + 1.1 + i * 0.15)} />)}
          <Cota x1={540 - 143} y1={1000} x2={540 + 143} y2={1000} p={kprog(T, K.Sp + 2.0, K.Sp + 2.6, kEase.sale)} texto="≈ 5 µm" tam={44} color={KC.texto} lado={1} />
        </>)}
      </Escena>
      {/* 11 · contraste: el hongo más grande está bajo tierra (Armillaria, Oregón) */}
      <Escena T={T} a={K.C} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fd3ff 0 36%, #4a2e1a 36% 100%)' }}></div>
        {fsvg(<>
          {[90, 250, 420, 600, 780, 950].map((cx, i) => <Conifera key={i} x={cx} y={700} s={0.7} T={T} seed={i + 5} />)}
          <rect x={0} y={690} width={1080} height={20} fill="#3a7a2a" />
          <defs><clipPath id="gxSuelo"><rect x={0} y={712} width={1080} height={1208} /></clipPath></defs>
          <g clipPath="url(#gxSuelo)"><RedHifas T={T} x={540} y={940} g={kprog(T, K.C + 0.5, K.C + 3.5)} seed={7} n={360} escala={0.42} color={KC.gold2} ancho={4} brillo={1} circ /></g>
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo tronco del inicio, ya medido y con su récord */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <TroncoCaido T={T} x={70} y={820} w={960} h={170} abajo={120} costra={1} />
          <Cinta x0={110} y={790} largo={860} p={1} texto="10.85 m" tam={60} />
          <g opacity={kprog(T, K.Ci + 0.8, K.Ci + 1.2)}><Bascula x={250} y={560} r={120} T={T} aguja={450} franja={1} mini /></g>
          {T > K.Ci + 1.6 && <Medalla x={560} y={560} s={klerp(1.8, 1.1, kprog(T, K.Ci + 1.6, K.Ci + 2.0, kEase.rebote))} T={T} />}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.0} until={K.E - 0.3} texto="no es corteza" x={300} y={560} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 1.4} until={K.E - 0.3} x={330} y={1150} texto="la costra: el hongo" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 1.0} until={K.E + 3.0} texto="2010 · Hainan, China" x={540} y={1000} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.E + 1.2} until={K.E + 3.0} x={690} y={860} texto="isla de Hainan" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.M - 0.3} texto="ni lo reconocieron" x={360} y={560} tam={42} borde={KC.red} />
                  <Chip T={T} at={K.P + 0.2} until={K.Es - 0.3} texto="¿cuánto pesa?" x={330} y={470} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.P + 1.6} until={K.Es - 0.3} texto="400–500 kg (estimado)" x={540} y={1170} tam={50} borde={KC.red} />
      <Etq T={T} at={K.Es + 0.3} until={K.Po - 0.3} x={60} y={470} texto="Phellinus ellipsoideus" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.7} until={K.Po - 0.3} x={60} y={530} texto="(antes Fomitiporia ellipsoidea)" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.2} until={K.Po - 0.3} x={110} y={1080} texto="láminas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Es + 2.2} until={K.Po - 0.3} x={660} y={1080} texto="poros" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Po + 0.1} until={K.Pr - 0.3} texto="AL MICROSCOPIO · 1 mm²" x={400} y={370} tam={32} borde={KC.cyan} mono />
      <NumeroGigante T={T} at={K.Po + 3.0} until={K.Pr - 0.2} valor={452} dur={1.2} prefijo="≈ " sufijo=" millones" etiqueta="de poros en total" x={540} y={1070} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.Pe + 0.2} until={K.Ed - 0.3} texto="perenne: capa sobre capa" x={540} y={420} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.Pe + 1.4} until={K.Ed - 0.3} x={60} y={1050} texto="capas de tubos (cada una con sus poros)" tam={28} color={KC.ink} />
            <Etq T={T} at={K.Ed + 1.6} until={K.Sp - 0.3} x={600} y={590} texto="pudrición blanca" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Sp + 0.2} until={K.C - 0.3} texto="AL MICROSCOPIO · ESPORAS" x={540} y={360} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Sp + 1.2} until={K.C - 0.3} x={60} y={450} texto="ellipsoideus = elipsoide (ovalada)" it tam={30} color={KC.texto} />
      <Chip T={T} at={K.C + 0.3} until={K.Ci - 0.3} texto="el hongo más grande: bajo tierra" x={540} y={760} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.C + 1.2} until={K.Ci - 0.3} x={60} y={1080} texto="Armillaria ostoyae" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.C + 1.6} until={K.Ci - 0.3} x={60} y={1130} texto="Oregón (EE. UU.) · 965 ha de micelio" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Ci + 2.2} until={K.Ou} texto="el cuerpo de hongo más grande documentado" x={540} y={1130} tam={32} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.E} texto="1 m" largo={79} y={1440} />
      <BarraEscala T={T} at={K.E} until={K.E + 3.1} texto="mapa esquemático" largo={0} y={1440} />
      <BarraEscala T={T} at={K.E + 3.1} until={K.M} texto="1 m" largo={79} y={1440} />
      <BarraEscala T={T} at={K.M} until={K.P} texto="1 m" largo={79} y={1440} />
      <BarraEscala T={T} at={K.Es} until={K.Po} texto="esquemático" largo={0} y={1440} />
      <BarraEscala T={T} at={K.Po} until={K.Pr} texto="0.5 mm" largo={241} y={1440} />
      <BarraEscala T={T} at={K.Pr} until={K.Pe} texto="1 m" largo={44} y={1440} />
      <BarraEscala T={T} at={K.Pe} until={K.Ed} texto="1 cm (esquemático)" largo={80} y={1440} />
      <BarraEscala T={T} at={K.Ed} until={K.Sp} texto="10 cm (esquemático)" largo={100} y={1440} />
      <BarraEscala T={T} at={K.Sp} until={K.C} texto="5 µm" largo={272} y={1440} />
      <BarraEscala T={T} at={K.C} until={K.Ci} texto="esquemático" largo={0} y={1440} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="1 m" largo={79} y={1440} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No es corteza: *un solo hongo.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.M - 0.1} texto="2010, Hainan: *ni lo reconocieron.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.P - 0.1} texto="*10.85 m* de largo, 84 cm de ancho, 5 de grueso." />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Es - 0.1} texto="Entre *400 y 500 kilos.*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.Po - 0.1} texto="_Phellinus ellipsoideus:_ *poros,* no láminas." />
      <Subtitulo T={T} idx={5} at={K.Po + 0.1} until={K.Pr - 0.1} texto="*49* por mm²: unos *450 millones.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Pe - 0.1} texto="¿Cómo llega a *ese tamaño?*" />
      <Subtitulo T={T} idx={7} at={K.Pe + 0.1} until={K.Ed - 0.1} texto="Perenne: *capa sobre capa.*" />
      <Subtitulo T={T} idx={8} at={K.Ed + 0.1} until={K.Sp - 0.1} texto="Unos *20 años* comiendo madera." />
      <Subtitulo T={T} idx={9} at={K.Sp + 0.1} until={K.C - 0.1} texto="Esporas ovaladas de *5 milésimas de mm.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ci - 0.1} texto="El hongo más grande está *bajo tierra.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El cuerpo de hongo *más grande documentado.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.2, 'avatar_11_sorprendido', 'gancho'],
        [K.E + 3.4, K.M - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.3, K.Es - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Po + 3.0, K.Pr - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pr + 0.05, K.Pe + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ed + 0.3, K.Sp - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.C + 0.4, K.Ci - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="74" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GiganteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GiganteShot /></CompositionStage></div>;
}
window.GiganteApp = GiganteApp;
