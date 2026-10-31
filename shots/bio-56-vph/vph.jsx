// Shot Biotecnológico #56 · La vacuna del VPH es una cáscara vacía — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos.
// La cápside del VPH: 360 copias de L1 en 72 pentámeros (capsómeros), ~55 nm (DiGiuseppe et al., J Virol 2017).
const L1C = '#ff8fb8', L1B = '#ff2d78', ADNV = '#ffe11a', PIEL = '#f1b48f', ANTI = '#4dd4ff', VIRC = '#b18cff';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* 72 puntos repartidos en una esfera (espiral de Fibonacci): la posición de cada pentámero. */
const PENT = Array.from({ length: 72 }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / 72, rr = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(a) * rr, y, Math.sin(a) * rr];
});
/* Pentámero de L1: cinco proteínas en anillo alrededor de un hueco. */
function Pentamero({ x, y, s = 1, rot = 0, color = L1C, borde = L1B, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[0, 1, 2, 3, 4].map((k) => { const a = (k * 72 - 90) * Math.PI / 180;
      return <circle key={k} cx={Math.cos(a) * 13} cy={Math.sin(a) * 13} r={10.5} fill={color} stroke={KC.ink} strokeWidth={3} />; })}
    <circle r={5} fill={borde} />
  </g>;
}
/* Cápside del VPH (o partícula de la vacuna).
   arma 0..1: los 72 pentámeros llegan y se acomodan · explota 0..1: se separan
   abierto 0..1: los de enfrente se aclaran para ver adentro · adn: el ADN circular del virus real (0..1). */
function Capside({ T, x, y, r = 200, giro = 0.25, arma = 1, explota = 0, abierto = 0, adn = 0, color = L1C, brillo = 0, o = 1 }) {
  const a = T * giro, ca = Math.cos(a), sa = Math.sin(a);
  const pts = PENT.map(([px, py, pz], i) => { const X = px * ca + pz * sa, Z = -px * sa + pz * ca; return { i, X, Y: py, Z }; }).sort((p, q) => p.Z - q.Z);
  const s0 = r / 62;
  const dibuja = (p) => {
    const li = kclamp(arma * 72 - (p.i * 0.83), 0, 1); if (li <= 0) return null;
    const vuela = (1 - kEase.sale(li)) * 1.6 + explota * 1.1, k = r * 0.86 * (1 + vuela);
    const frente = p.Z > 0 ? 1 - abierto * 0.85 : 1;
    const sz = s0 * (0.62 + 0.38 * (p.Z + 1) / 2);
    const sombra = 0.55 + 0.45 * (p.Z + 1) / 2;
    return <Pentamero key={p.i} x={p.X * k} y={p.Y * k} s={sz} rot={p.i * 23 + T * 10} color={mixHex('#6a3550', color, sombra)} o={li * frente * (p.Z < -0.2 && abierto < 0.5 && arma >= 1 && explota < 0.1 ? 0.0 : 1)} />;
  };
  const cerrado = arma >= 1 && explota < 0.05;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {brillo > 0 && <circle r={r * 1.25} fill={color} opacity={0.18 * brillo + 0.06 * Math.sin(T * 4) * brillo} />}
    {cerrado && <circle r={r * 0.95} fill="#2a1630" stroke={KC.ink} strokeWidth={6} opacity={1 - abierto * 0.4} />}
    {pts.filter((p) => p.Z <= 0).map(dibuja)}
    {adn > 0 && <g opacity={adn}><path d={Array.from({ length: 61 }, (_, k) => { const t = k / 60 * Math.PI * 2, rr = r * 0.5 + Math.sin(t * 9 + T * 2) * r * 0.08;
      return (k ? 'L ' : 'M ') + (Math.cos(t) * rr).toFixed(1) + ' ' + (Math.sin(t) * rr * 0.85).toFixed(1); }).join(' ') + ' Z'}
      fill="none" stroke={ADNV} strokeWidth={Math.max(4, r * 0.05)} strokeLinejoin="round" style={{ filter:`drop-shadow(0 0 10px ${ADNV})` }} /></g>}
    {pts.filter((p) => p.Z > 0).map(dibuja)}
  </g>;
}
/* Anticuerpo en "Y". */
function Anticuerpo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 40 L 0 0 M 0 0 L -26 -34 M 0 0 L 26 -34" stroke={KC.ink} strokeWidth={17} strokeLinecap="round" fill="none" />
    <path d="M 0 40 L 0 0 M 0 0 L -26 -34 M 0 0 L 26 -34" stroke={ANTI} strokeWidth={9} strokeLinecap="round" fill="none" />
  </g>;
}
/* Brazo y jeringa (la escena del inicio y del cierre). */
function Brazo({ x = 540, y = 1040 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -620 -120 Q -200 -170 220 -140 Q 420 -130 560 -90 L 560 150 Q 380 170 200 150 Q -200 120 -620 140 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -200 -60 Q -120 -80 -40 -64" stroke="#d98f6b" strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 120 -40 Q 200 -54 280 -40" stroke="#d98f6b" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
function Jeringa({ T, x, y, rot = -35, emb = 0, nivel = 1, particulas = true, s = 1 }) {
  const L = 420;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-L - 70} y={-12} width={90} height={24} rx={6} fill="#d9dee6" stroke={KC.ink} strokeWidth={6} transform={`translate(${emb * 60} 0)`} />
    <rect x={-L - 90} y={-46} width={22} height={92} rx={6} fill="#d9dee6" stroke={KC.ink} strokeWidth={6} transform={`translate(${emb * 60} 0)`} />
    <rect x={-L} y={-44} width={L} height={88} rx={14} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-L * nivel + 6} y={-36} width={L * nivel - 12} height={72} rx={10} fill="#bfe8ff" />
    {particulas && nivel > 0.1 && Array.from({ length: 9 }, (_, i) => { const px = -L * nivel + 30 + ((i * 47 + T * 30) % (L * nivel - 60)), py = Math.sin(T * 2 + i) * 18;
      return <Pentamero key={i} x={px} y={py} s={0.55} rot={T * 40 + i * 30} />; })}
    {[0.2, 0.4, 0.6, 0.8].map((u) => <line key={u} x1={-L * u} y1={-44} x2={-L * u} y2={-20} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={0} y={-16} width={30} height={32} fill="#d9dee6" stroke={KC.ink} strokeWidth={5} />
    <line x1={30} y1={0} x2={170} y2={0} stroke="#9aa3b5" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
/* Útero esquemático con el cuello uterino (donde el VPH causa el cáncer cervicouterino). */
function Utero({ x = 540, y = 820, s = 1, punto = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -190 Q -260 -250 -200 -250 Q -140 -240 -120 -190" fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <path d="M 230 -190 Q 260 -250 200 -250 Q 140 -240 120 -190" fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <path d="M -230 -190 Q -260 -250 -200 -250 Q -140 -240 -120 -190" fill="none" stroke="#ff9eb5" strokeWidth={10} strokeLinecap="round" />
    <path d="M 230 -190 Q 260 -250 200 -250 Q 140 -240 120 -190" fill="none" stroke="#ff9eb5" strokeWidth={10} strokeLinecap="round" />
    <ellipse cx={-262} cy={-230} rx={34} ry={24} fill="#ffd0a8" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={262} cy={-230} rx={34} ry={24} fill="#ffd0a8" stroke={KC.ink} strokeWidth={6} />
    <path d="M -130 -200 Q 0 -230 130 -200 Q 150 -40 60 70 L 50 170 Q 0 190 -50 170 L -60 70 Q -150 -40 -130 -200 Z" fill="#ff7aa2" stroke={KC.ink} strokeWidth={10} />
    <path d="M -70 -150 Q 0 -165 70 -150 Q 70 -50 20 30 L 0 30 L -20 30 Q -70 -50 -70 -150 Z" fill="#ffd3e0" />
    <rect x={-30} y={30} width={60} height={140} rx={20} fill="#e85a85" />
    {punto > 0 && <g opacity={punto}><circle cx={0} cy={130} r={30 + Math.sin(T * 6) * 6} fill="none" stroke={KC.red} strokeWidth={8} /><circle cx={0} cy={130} r={12} fill={KC.red} /></g>}
  </g>;
}
/* Matraz con el caldo donde se fabrican las proteínas de la cáscara. */
function Matraz({ x, y, s = 1, T = 0, color = '#c7f0ff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -220 L -50 -90 L -170 120 Q -180 150 -150 150 L 150 150 Q 180 150 170 120 L 50 -90 L 50 -220 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -112 20 L 112 20 L 162 118 Q 168 140 146 140 L -146 140 Q -168 140 -162 118 Z" fill={color} />
    <rect x={-64} y={-240} width={128} height={30} rx={8} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-80 + i * 32} cy={110 - ((T * 60 + i * 37) % 80)} r={6} fill="#fff" opacity={0.8} />)}
  </g>;
}
/* Polilla (Trichoplusia ni, "gusano medidor de la col" de adulto): alas pardas con su manchita plateada. */
function Polilla({ T, x, y, s = 1 }) {
  const ala = 1 - 0.18 * Math.abs(Math.sin(T * 7));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((d) => <g key={d} transform={`scale(${d * ala} 1)`}>
      <path d="M 10 -20 Q 120 -120 220 -70 Q 230 20 120 50 Q 50 50 10 10 Z" fill="#8a7560" stroke={KC.ink} strokeWidth={8} />
      <path d="M 10 10 Q 110 60 150 120 Q 90 170 20 60 Z" fill="#a8927a" stroke={KC.ink} strokeWidth={7} />
      <path d="M 100 -40 q 20 -10 30 6 q -14 4 -10 20 q -16 -8 -20 -26 Z" fill="#e8ecf2" stroke="#6f7480" strokeWidth={3} />
      <path d="M 40 -40 Q 120 -70 190 -50" stroke="#5e4c3c" strokeWidth={4} fill="none" />
    </g>)}
    <ellipse cx={0} cy={20} rx={22} ry={90} fill="#6e5a48" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-76} r={22} fill="#6e5a48" stroke={KC.ink} strokeWidth={6} />
    <path d="M -8 -94 Q -40 -150 -70 -160 M 8 -94 Q 40 -150 70 -160" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
/* Frasco con células de insecto (redondas) en suspensión. */
function FrascoCelulas({ T, x, y, s = 1 }) {
  const R = krng(12);
  const cel = Array.from({ length: 12 }, () => [(R() - 0.5) * 200, (R() - 0.2) * 140, 18 + R() * 8, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-130} width={280} height={300} rx={36} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-128} y={-60} width={256} height={218} rx={28} fill="#ffe8b8" />
    <rect x={-70} y={-170} width={140} height={44} rx={10} fill={KC.teal} stroke={KC.ink} strokeWidth={6} />
    {cel.map(([cx, cy, r, p], i) => <g key={i}><circle cx={cx} cy={cy + Math.sin(T * 1.5 + p) * 6} r={r} fill="#ffd27a" stroke={KC.ink} strokeWidth={3} />
      <circle cx={cx + 4} cy={cy - 3 + Math.sin(T * 1.5 + p) * 6} r={r * 0.35} fill="#c58a3a" /></g>)}
  </g>;
}
/* Niña y niño (silueta sencilla). */
function Nino({ x, y, s = 1, color = KC.blue, nina = false, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 3 + x) * 4}) scale(${s})`}>
    <path d="M -60 160 Q -70 40 0 30 Q 70 40 60 160 Z" fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-20} r={48} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
    {nina ? <path d="M -52 -30 Q -50 -80 0 -78 Q 50 -80 52 -30 Q 60 20 44 40 L 40 -20 Q 0 -50 -40 -20 L -44 40 Q -60 20 -52 -30 Z" fill="#3b2316" stroke={KC.ink} strokeWidth={5} />
      : <path d="M -48 -30 Q -46 -76 0 -74 Q 46 -76 48 -30 Q 20 -50 -48 -30 Z" fill="#3b2316" stroke={KC.ink} strokeWidth={5} />}
    <circle cx={-16} cy={-18} r={5} fill={KC.ink} /><circle cx={16} cy={-18} r={5} fill={KC.ink} />
    <path d="M -14 4 Q 0 14 14 4" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <rect x={44} y={56} width={30} height={24} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
/* Célula (borde de una célula grande, abajo). */
function CelulaBorde({ T, y = 1150, color = '#ffb3c7' }) {
  return <g>
    <path d={`M -40 ${y + 40} Q 540 ${y - 120 + Math.sin(T * 1.3) * 10} 1120 ${y + 40} L 1120 1960 L -40 1960 Z`} fill={color} stroke={KC.ink} strokeWidth={10} />
    <path d={`M -40 ${y + 70} Q 540 ${y - 90 + Math.sin(T * 1.3) * 10} 1120 ${y + 70}`} fill="none" stroke="#e8869f" strokeWidth={8} strokeDasharray="22 16" />
  </g>;
}

function Vph() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Vi: CUES.Virus, Ca: CUES.Capside, L1: CUES.L1, No: CUES.Noventa, Ar: CUES.Arma, Pr: CUES.Pregunta, Va: CUES.Vacia,
    De: CUES.Defensas, Es: CUES.Escocia, Po: CUES.Polilla, Mx: CUES.Mexico, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const PXMM = 440 / 55e-6;   // cápside de 55 nm dibujada con 440 px de diámetro
  const entra = kprog(T, K.G, K.G + 0.8, kEase.sale);
  const pica = kprog(T, K.G + 0.8, K.G + 1.4, kEase.sale);
  const empuja = kprog(T, K.G + 1.5, K.Vi - 0.2, kEase.suave);
  // escena Vacia: la cáscara baja a la célula, se pega y no pasa nada
  const baja = kprog(T, K.Va + 0.6, K.Va + 1.8, kEase.sale);
  // escena Defensas
  const anti1 = kprog(T, K.De + 0.2, K.De + 1.6, kEase.sale), virusEntra = kprog(T, K.De + 2.0, K.De + 3.0, kEase.sale), anti2 = kprog(T, K.De + 2.8, K.De + 3.8, kEase.sale);
  const R = krng(9);
  const ANT = Array.from({ length: 10 }, (_, i) => [R() * 1080, R() * 1300 + 300, (i / 10) * Math.PI * 2]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la jeringa con "cáscaras" se acerca al brazo */}
      <Escena T={T} a={K.G} b={K.Vi} zoom={0.05}>
        <FondoMarca T={T} color={KC.pink} />
        <Capa>
          <Brazo x={540} y={1060} />
          <Jeringa T={T} x={klerp(80, 470, entra) + pica * 40} y={klerp(560, 900, entra) + pica * 30} rot={-35} emb={empuja} nivel={1 - empuja * 0.6} s={1.15} />
          {pica > 0.95 && <circle cx={545} cy={950} r={20 + Math.sin(T * 8) * 4} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - empuja} />}
        </Capa>
      </Escena>
      {/* 1 · el VPH y el cáncer cervicouterino */}
      <Escena T={T} a={K.Vi} b={K.Ca}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa><Utero x={560} y={840} s={1.05} punto={kprog(T, K.Vi + 1.6, K.Vi + 2.2)} T={T} /></Capa>
      </Escena>
      {/* 2 · por dentro: el virus de verdad, con su ADN */}
      <Escena T={T} a={K.Ca} b={K.L1} zoom={0.02}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa><Utero x={560} y={840} s={1.05} punto={1} T={T} /></Capa>
        <Lupa T={T} at={K.Ca + 0.1} until={K.L1 - 0.2} x={540} y={720} r={300} fx={560} fy={977} tinte={KC.mint} etiqueta="AL MICROSCOPIO · VPH"
          interior={(TT, r) => <svg width={r * 2} height={r * 2}><Capside T={TT} x={r} y={r} r={220} abierto={kprog(TT, K.Ca + 1.4, K.Ca + 2.4)} adn={kprog(TT, K.Ca + 1.6, K.Ca + 2.6)} /></svg>} />
      </Escena>
      {/* 3 · 360 copias de L1: la cáscara se separa en sus piezas */}
      <Escena T={T} a={K.L1} b={K.No} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(255,143,184,.25)" />
        <Capa><Capside T={T} x={560} y={900} r={210} explota={0.45 * kprog(T, K.L1 + 0.6, K.L1 + 2.2, kEase.suave)} /></Capa>
      </Escena>
      {/* 4 · los noventa: fabricaron solo la cáscara */}
      <Escena T={T} a={K.No} b={K.Ar}>
        <FondoMarca T={T} color={KC.mint} />
        <Capa>
          <Matraz x={540} y={1040} s={0.95} T={T} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.No + 1.0 + i * 0.4, u = kprog(T, t0, t0 + 2.4); if (u <= 0) return null;
            return <Pentamero key={i} x={540 + Math.sin(i * 2.1) * 60 + u * (i % 2 ? 1 : -1) * (120 + i * 18)} y={830 - u * 160 + Math.sin(T * 2 + i) * 8} s={1.4} rot={T * 30 + i * 40} o={kclamp(u * 4, 0, 1) * (1 - kprog(T, K.Ar - 0.3, K.Ar))} />; })}
        </Capa>
      </Escena>
      {/* 5 · se arma sola: 72 pentámeros */}
      <Escena T={T} a={K.Ar} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={24} color="rgba(255,143,184,.22)" />
        <Capa><Capside T={T} x={620} y={840} r={250} arma={kprog(T, K.Ar + 0.2, K.Ar + 3.2)} brillo={kprog(T, K.Ar + 3.2, K.Ar + 3.6)} /></Capa>
      </Escena>
      {/* 6 · re-gancho: ¿te puede contagiar? */}
      <Escena T={T} a={K.Pr} b={K.Va} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <Capside T={T} x={270} y={600} r={150} abierto={1} adn={1} color={VIRC} />
          <Capside T={T} x={270} y={1010} r={150} abierto={0} />
          <text x={470} y={1080} style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} transform={`rotate(${Math.sin(T * 3) * 6} 520 1000)`} opacity={kprog(T, K.Pr + 0.3, K.Pr + 0.6)}>?</text>
        </Capa>
      </Escena>
      {/* 7 · está vacía: llega a la célula, se pega y no pasa nada */}
      <Escena T={T} a={K.Va} b={K.De} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <CelulaBorde T={T} y={1130} />
          <Capside T={T} x={540} y={klerp(620, 930, baja)} r={170} abierto={kprog(T, K.Va + 0.1, K.Va + 0.6) * (1 - baja * 0.6)} />
          {baja >= 1 && <circle cx={540} cy={930} r={190 + Math.sin(T * 5) * 6} fill="none" stroke={KC.mint} strokeWidth={5} strokeDasharray="14 12" opacity={0.7} />}
          <g transform="translate(870 640)" opacity={kprog(T, K.Va + 0.3, K.Va + 0.7)}>
            <path d="M -60 0 Q -30 -40 0 0 Q 30 40 60 0" stroke={ADNV} strokeWidth={12} fill="none" strokeLinecap="round" />
            <line x1={-70} y1={-50} x2={70} y2={50} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
          </g>
        </Capa>
      </Escena>
      {/* 8 · defensas: anticuerpos contra la cáscara y contra el virus de verdad */}
      <Escena T={T} a={K.De} b={K.Es} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <CelulaBorde T={T} y={1180} color="#ffc7d6" />
          <Capside T={T} x={640} y={600} r={130} />
          {ANT.map(([ax, ay, ang], i) => { const tx = 640 + Math.cos(ang) * 175, ty = 600 + Math.sin(ang) * 175;
            return <Anticuerpo key={'a' + i} x={klerp(ax, tx, anti1)} y={klerp(ay, ty, anti1)} rot={anti1 * (ang * 180 / Math.PI - 90) + (1 - anti1) * T * 40} s={0.9} />; })}
          <Capside T={T} x={klerp(1260, 640, virusEntra)} y={980} r={110} abierto={0.6} adn={1} color={VIRC} />
          {Array.from({ length: 8 }, (_, i) => { const ang = i / 8 * Math.PI * 2, tx = 640 + Math.cos(ang) * 150, ty = 980 + Math.sin(ang) * 150;
            return <Anticuerpo key={'b' + i} x={klerp(tx + Math.cos(ang) * 500, tx, anti2)} y={klerp(ty + Math.sin(ang) * 500, ty, anti2)} rot={ang * 180 / Math.PI - 90} s={0.8} o={kprog(T, K.De + 2.6, K.De + 2.9)} />; })}
        </Capa>
      </Escena>
      {/* 9 · Escocia, 2024 */}
      <Escena T={T} a={K.Es} b={K.Po}>
        <FondoMarca T={T} color={KC.lilac} />
        <Capa>
          {T > K.Es + 3.0 && Array.from({ length: 12 }, (_, i) => { const x = 620 + (i % 4) * 120, y = 1110 + Math.floor(i / 4) * 0, on = kprog(T, K.Es + 3.4 + i * 0.08, K.Es + 3.7 + i * 0.08);
            return i < 4 ? <g key={i} opacity={on}><circle cx={x} cy={y - 50} r={26} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <path d={`M ${x - 40} ${y + 50} Q ${x - 40} ${y - 16} ${x} ${y - 18} Q ${x + 40} ${y - 16} ${x + 40} ${y + 50} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <path d={`M ${x - 14} ${y + 10} l 10 12 l 20 -26`} stroke={KC.leaf} strokeWidth={8} fill="none" strokeLinecap="round" /></g> : null; })}
        </Capa>
      </Escena>
      {/* 10 · lo curioso: células de polilla y levadura */}
      <Escena T={T} a={K.Po} b={K.Mx}>
        <FondoMarca T={T} color={KC.cyan} />
        <Capa>
          <Polilla T={T} x={760} y={660} s={0.95} />
          <FrascoCelulas T={T} x={760} y={1020} s={0.9} />
          <g opacity={kprog(T, K.Po + 1.6, K.Po + 2.2)}>
            <Levadura T={T} x={280} y={960} r={110} brote={kprog(T, K.Po + 2.0, K.Po + 3.4)} seed={3} />
          </g>
          {[0, 1, 2].map((i) => { const u = ((T - K.Po - 0.8 + i * 0.7) % 2.1) / 2.1; return T > K.Po + 0.8 ? <Pentamero key={i} x={890 + u * 70} y={900 - u * 150} s={1.1} rot={T * 50} o={Math.sin(u * Math.PI)} /> : null; })}
        </Capa>
      </Escena>
      {/* 11 · México */}
      <Escena T={T} a={K.Mx} b={K.Ci}>
        <FondoMarca T={T} color={KC.yellow} />
        <Capa>
          <MapaMexico x={110} y={600} ancho={860} conCA={false} />
          <Nino x={430} y={900} s={1.1} color={KC.pink} nina T={T} />
          <g opacity={kprog(T, K.Mx + 2.6, K.Mx + 3.0)} transform={`translate(${klerp(80, 0, kprog(T, K.Mx + 2.6, K.Mx + 3.0, kEase.sale))} 0)`}>
            <Nino x={650} y={900} s={1.1} color={KC.blue} T={T} />
          </g>
        </Capa>
      </Escena>
      {/* 12 · cierre: el brazo del inicio, ya con la cáscara y los anticuerpos */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoMarca T={T} color={KC.pink} />
        <Capa>
          <Brazo x={540} y={1060} />
          <Jeringa T={T} x={330} y={760} rot={-35} emb={1} nivel={0.4} s={0.9} particulas={false} />
          <Capside T={T} x={450} y={560} r={120} brillo={1} />
          {Array.from({ length: 7 }, (_, i) => { const ang = i / 7 * Math.PI * 2 + T * 0.3, u = kprog(T, K.Ci + 1.0 + i * 0.15, K.Ci + 1.6 + i * 0.15);
            return <Anticuerpo key={i} x={450 + Math.cos(ang) * klerp(400, 175, u)} y={560 + Math.sin(ang) * klerp(400, 175, u)} rot={ang * 180 / Math.PI - 90} s={0.75} o={u} />; })}
        </Capa>
      </Escena>

      {/* escala real (nm) en lo microscópico */}
      {T > K.Ca + 1.0 && T < K.Pr && <Escala T={T} z={T < K.L1 ? 1 : (T < K.Ar ? 230 / 220 : 250 / 220)} pxPorMm={PXMM} x={60} y={1430} />}

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.4} texto="VIRUS" x={300} y={440} tam={60} />
      <Chip T={T} at={K.G + 2.2} until={K.Vi - 0.2} texto="CÁSCARA VACÍA" x={320} y={440} tam={50} borde={L1B} />
      <Chip T={T} at={K.Vi + 0.4} until={K.Ca - 0.2} texto="VPH = virus del papiloma humano" y={1520} tam={36} borde={VIRC} />
      <Etq T={T} at={K.Vi + 2.0} until={K.Ca - 0.2} x={600} y={977} texto="cuello uterino" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.4} until={K.L1 - 0.2} texto="ADN del virus" x={540} y={1520} tam={38} borde={ADNV} />
      {T < K.No - 0.1 && <Contador T={T} at={K.L1 + 0.6} hasta={360} dur={1.6} x={720} y={470} tam={110} sufijo=" × L1" color={L1C} />}
      <Chip T={T} at={K.L1 + 2.3} until={K.No - 0.2} texto="+ algo de L2 (proteína menor)" y={1520} tam={32} borde={L1C} />
      <TarjetaEstudio T={T} at={K.No + 0.2} until={K.No + 2.5} anio="1991" quien="Zhou y Frazer · Queensland, Australia" revista="Virology · L1 + L2" x={540} y={560} />
      <TarjetaEstudio T={T} at={K.No + 2.6} until={K.Ar - 0.2} anio="1992" quien="Kirnbauer, Lowy y Schiller · NCI, EE. UU." revista="PNAS · solo L1" x={540} y={560} />
      <Chip T={T} at={K.No + 1.2} until={K.Ar - 0.2} texto="sin ADN" x={820} y={1520} tam={36} borde={ADNV} />
      {T < K.Pr - 0.1 && <Contador T={T} at={K.Ar + 0.2} hasta={72} dur={3.0} x={760} y={470} tam={110} color={L1C} />}
      <Chip T={T} at={K.Ar + 0.6} until={K.Pr - 0.2} texto="72 piezas · 5 L1 cada una" y={1520} tam={38} borde={L1C} />
      <Etq T={T} at={K.Pr + 0.4} until={K.Va - 0.2} x={110} y={790} texto="virus: con ADN" tam={32} />
      <Etq T={T} at={K.Pr + 0.7} until={K.Va - 0.2} x={110} y={1195} texto="vacuna: ¿?" tam={32} />
      <Chip T={T} at={K.Va + 0.3} until={K.De - 0.2} texto="0 ADN" x={870} y={500} tam={40} borde={ADNV} />
      <Chip T={T} at={K.Va + 1.9} until={K.De - 0.2} texto="sin ADN = sin infección" y={1520} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.De + 1.0} until={K.Es - 0.2} x={840} y={420} texto="anticuerpos" tam={34} color={ANTI} lado="izq" />
      <Chip T={T} at={K.De + 3.4} until={K.Es - 0.2} texto="el virus real, atrapado" y={1520} tam={38} borde={ANTI} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.9} anio="2024" quien="Palmer et al. · Escocia" revista="JNCI · vacunadas a los 12–13 años" x={540} y={640} />
      <NumeroGigante T={T} at={K.Es + 3.0} until={K.Po - 0.3} valor={0} x={800} y={720} tam={380} color={KC.yellow} />
      <Chip T={T} at={K.Es + 3.3} until={K.Po - 0.3} texto="casos de cáncer invasor" x={790} y={960} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.Po + 0.5} until={K.Mx - 0.2} x={1040} y={440} texto="Trichoplusia ni (polilla)" it tam={30} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Po + 0.9} until={K.Mx - 0.2} x={610} y={1110} texto="Cervarix" tam={34} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Po + 2.0} until={K.Mx - 0.2} x={40} y={848} texto="Saccharomyces cerevisiae" it tam={28} color={KC.ink} lado="der" />
      <Etq T={T} at={K.Po + 2.3} until={K.Mx - 0.2} x={60} y={790} texto="Gardasil" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mx + 0.3} until={K.Ci - 0.2} texto="5.º de primaria · 11 años · desde 2025 también niños" y={470} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="cáscara vacía → tu cuerpo aprende" y={1520} tam={38} borde={L1B} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Vi - 0.1} texto="No es un virus: *es su cáscara.*" />
      <Subtitulo T={T} idx={1} at={K.Vi + 0.1} until={K.Ca - 0.1} texto="El VPH: *cáncer cervicouterino.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.L1 - 0.1} texto="Su ADN, *dentro de la cáscara.*" />
      <Subtitulo T={T} idx={3} at={K.L1 + 0.1} until={K.No - 0.1} texto="Sobre todo *360 copias de L1.*" />
      <Subtitulo T={T} idx={4} at={K.No + 0.1} until={K.Ar - 0.1} texto="Fabricaron *solo la cáscara.*" />
      <Subtitulo T={T} idx={5} at={K.Ar + 0.1} until={K.Pr - 0.1} texto="Se armó *sola.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Va - 0.1} texto="¿Te puede *contagiar?*" />
      <Subtitulo T={T} idx={7} at={K.Va + 0.1} until={K.De - 0.1} texto="Sin ADN: *no infecta.*" />
      <Subtitulo T={T} idx={8} at={K.De + 0.1} until={K.Es - 0.1} texto="Tu cuerpo hace *anticuerpos.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Po - 0.1} texto="Escocia, 2024: *ni un caso.*" />
      <Subtitulo T={T} idx={10} at={K.Po + 0.1} until={K.Mx - 0.1} texto="Hecha por *células de polilla.*" />
      <Subtitulo T={T} idx={11} at={K.Mx + 0.1} until={K.Ci - 0.1} texto="Desde 2025, *también niños.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una cáscara *que te enseña.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Vi + 0.8, K.Ca - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.L1 + 0.5, K.No - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Ar + 0.6, K.Pr - 0.25, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Pr + 0.05, K.Va + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [K.De + 0.8, K.Es - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Es + 3.0, K.Po - 0.3, 'avatar_02_apuntando_camara', 'grande-izq'],
        [K.Po + 0.6, K.Mx - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Mx + 0.6, K.Ci - 0.3, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="56" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VphApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Vph /></CompositionStage></div>;
}
window.VphApp = VphApp;
