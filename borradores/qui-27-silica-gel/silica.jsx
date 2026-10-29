// Shot Químico #27 · Esas bolitas de «no comer» no son veneno (sílica gel) — NARRADO (N1 por dentro + mito).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const AGUA = '#7fc8ff', AZUL_CO = '#2a6bff', ROSA_CO = '#ff8fc0', GEL = '#eef6ff', ARENA = '#e3b971', PARED = '#5d6b86';

// ---------- piezas ----------
function Tenis({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 L -292 -150 Q -286 -215 -210 -222 L -140 -224 Q -90 -130 40 -112 L 210 -84 Q 300 -66 304 0 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -128 -200 Q -60 -126 40 -112 L 60 -150 Q -40 -160 -100 -230 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-96 + i * 40} y1={-196 + i * 22} x2={-62 + i * 40} y2={-214 + i * 22} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />)}
    <ellipse cx={-214} cy={-218} rx={70} ry={14} fill="#3a1424" stroke={KC.ink} strokeWidth={6} />
    <path d="M -230 -90 Q -60 -40 200 -40" fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" />
    <rect x={-312} y={-6} width={628} height={52} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <line x1={-290} y1={30} x2={290} y2={30} stroke="#c9c2b6" strokeWidth={6} strokeDasharray="20 14" />
  </g>;
}
function Sobre({ x, y, s = 1, rot = 0, rasga = 0, o = 1 }) {
  const zig = (y0, dir) => { let d = `M -110 ${y0}`; for (let i = 0; i <= 11; i++) d += ` L ${-110 + i * 20} ${y0 + (i % 2 ? dir * 10 : 0)}`; return d; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`${zig(-150, -1)} L 110 150 L -110 150 Z`} fill="#fbfaf6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={zig(150, 1)} fill="none" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-74} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>SILICA GEL</text>
    <rect x={-92} y={-44} width={184} height={70} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={4} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff">NO COMER</text>
    <text x={0} y={70} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">DO NOT EAT</text>
    <g transform="translate(0 112)">{[-50, -25, 0, 25, 50].map((dx, i) => <circle key={i} cx={dx} cy={0} r={9} fill={GEL} stroke="#9aa3b5" strokeWidth={3} />)}</g>
    {rasga > 0 && <g transform={`translate(${rasga * 40} ${-rasga * 70}) rotate(${rasga * 25} 110 -150)`}>
      <path d={`${zig(-150, -1)} L 110 -128 L -110 -128 Z`} fill="#fbfaf6" stroke={KC.ink} strokeWidth={6} /></g>}
  </g>;
}
function Bolita({ x, y, r = 22, color = GEL, o = 1 }) {
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={color} fillOpacity={0.9} stroke={KC.ink} strokeWidth={Math.max(3, r / 7)} />
    <ellipse cx={x - r * 0.35} cy={y - r * 0.38} rx={r * 0.32} ry={r * 0.2} fill="#fff" opacity={0.9} />
  </g>;
}
// caída con rebote: y0 → piso
function kCae(t, y0, piso, g = 2600) {
  const tf = Math.sqrt((2 * (piso - y0)) / g);
  if (t < tf) return y0 + 0.5 * g * t * t;
  const tb = t - tf; return piso - 90 * Math.exp(-3.2 * tb) * Math.abs(Math.sin(tb * 9));
}
const BOLITAS = (() => { const R = krng(11); return Array.from({ length: 16 }, (_, i) => ({ dx: (R() - 0.5) * 520, piso: 1130 + R() * 40, r: 16 + R() * 12, d: i * 0.05 })); })();
// Mundo del gancho y del cierre: tenis, sobre que sale y bolitas que caen. tt = tiempo desde el inicio.
function MundoTenis({ T, tt, vapor = 0 }) {
  const sale = kprog(tt, -0.45, 0.9, kEase.sale), rasga = kprog(tt, 1.2, 1.5, kEase.sale);
  const sx = klerp(500, 380, sale), sy = klerp(1020, 760, sale), rot = klerp(-30, -8, sale) + Math.sin(T * 2) * 2;
  return <g>
    <rect x={0} y={1160} width={KW} height={760} fill="rgba(22,18,15,.12)" />
    <Tenis x={720} y={1150} s={0.95} />
    {tt > 1.5 && BOLITAS.map((b, i) => { const t = tt - 1.5 - b.d; if (t < 0) return null; const p = Math.min(1, t / 0.7);
      return <Bolita key={i} x={sx + 60 + b.dx * p} y={kCae(t, 640, b.piso)} r={b.r} />; })}
    <Sobre x={sx} y={sy} rot={rot} rasga={rasga} />
    {vapor > 0 && Array.from({ length: 8 }, (_, i) => { const ph = ((T * 0.5 + i / 8) % 1);
      return <path key={i} d={`M ${120 + i * 70} ${1000 + (1 - ph) * 180} q 14 -20 0 -40 q -14 -20 0 -40`} fill="none" stroke={AGUA} strokeWidth={8} strokeLinecap="round" opacity={vapor * Math.sin(ph * Math.PI)} />; })}
  </g>;
}
// Bolita gigante con poros y túneles (p = cuántos poros se ven).
function BolitaPoros({ x, y, r, p = 0 }) {
  const R = krng(4);
  const poros = Array.from({ length: 34 }, () => { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r * 0.82; return [x + Math.cos(a) * d, y + Math.sin(a) * d, 6 + R() * 12]; });
  return <g>
    <circle cx={x} cy={y} r={r} fill={GEL} stroke={KC.ink} strokeWidth={10} />
    {poros.map(([px, py, pr], i) => i / 34 < p ? <circle key={i} cx={px} cy={py} r={pr * kprog(p, i / 34, i / 34 + 0.15)} fill="#4d5a73" stroke={KC.ink} strokeWidth={3} /> : null)}
    <ellipse cx={x - r * 0.38} cy={y - r * 0.42} rx={r * 0.26} ry={r * 0.14} fill="#fff" opacity={0.85} />
  </g>;
}
function GranoArena({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -40 L -60 -120 L 50 -110 L 130 -30 L 110 80 L 10 125 L -100 90 Z" fill={ARENA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -60 -120 L -10 -20 L 130 -30 M -10 -20 L 10 125" fill="none" stroke="#c49650" strokeWidth={6} />
  </g>;
}
function Cancha({ x, y, w, h, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#e59a52" stroke={KC.ink} strokeWidth={8} />
    <g stroke="#fff" strokeWidth={5} fill="none">
      <rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} />
      <line x1={0} y1={-h / 2 + 12} x2={0} y2={h / 2 - 12} />
      <circle cx={0} cy={0} r={h * 0.12} />
      <rect x={-w / 2 + 12} y={-h * 0.17} width={w * 0.2} height={h * 0.34} fill="rgba(35,70,255,.35)" />
      <rect x={w / 2 - 12 - w * 0.2} y={-h * 0.17} width={w * 0.2} height={h * 0.34} fill="rgba(35,70,255,.35)" />
      <path d={`M ${-w / 2 + 12} ${-h * 0.42} A ${h * 0.42} ${h * 0.42} 0 0 1 ${-w / 2 + 12} ${h * 0.42}`} />
      <path d={`M ${w / 2 - 12} ${-h * 0.42} A ${h * 0.42} ${h * 0.42} 0 0 0 ${w / 2 - 12} ${h * 0.42}`} />
    </g>
  </g>;
}
// Silanol en la pared: Si (gris) con un O–H que apunta al canal. dir = 1 (hacia abajo) o -1 (hacia arriba).
function Silanol({ x, y, dir = 1 }) {
  return <g>
    <line x1={x} y1={y} x2={x} y2={y + dir * 58} stroke={KC.ink} strokeWidth={10} />
    <line x1={x} y1={y + dir * 58} x2={x + 30} y2={y + dir * 88} stroke={KC.ink} strokeWidth={8} />
    <Atomo x={x} y={y} r={30} color="#c9ccd6" letra="Si" />
    <Atomo x={x} y={y + dir * 58} r={22} color={QA.O} letra="O" />
    <Atomo x={x + 30} y={y + dir * 88} r={14} color={QA.H} letra="" />
  </g>;
}
// Persona chiquita con relleno parcial (para el 2.7 %): f = fracción pintada de naranja.
function PersonaParcial({ x, y, s, f, base, color, id }) {
  return <g>
    <Personita x={x} y={y} s={s} color={base} />
    <clipPath id={id}><rect x={x - 30 * s} y={y - 60 * s} width={60 * s * f} height={90 * s} /></clipPath>
    <g clipPath={`url(#${id})`}><Personita x={x} y={y} s={s} color={color} /></g>
  </g>;
}
function Telefono({ T, x, y, s = 1, suena = 0 }) {
  const vib = suena ? Math.sin(T * 60) * 5 * suena : 0;
  return <g transform={`translate(${x + vib} ${y}) scale(${s})`}>
    <path d="M -130 40 L -100 -40 L 100 -40 L 130 40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-150} y={40} width={300} height={70} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <path d={`M -150 -70 Q 0 ${-120 - suena * 20} 150 -70 L 150 -40 L -150 -40 Z`} fill={KC.ink} />
    <circle cx={0} cy={20} r={34} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {suena > 0 && [0, 1].map((i) => <path key={i} d={`M ${170 + i * 30} -80 q 30 50 0 100 M ${-170 - i * 30} -80 q -30 50 0 100`} fill="none" stroke={KC.ink} strokeWidth={7} opacity={0.5 + 0.5 * Math.sin(T * 12 + i)} />)}
  </g>;
}
function Calendario({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-190} width={340} height={380} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-190} width={340} height={100} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-118} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill="#fff">ABRIL</text>
    {Array.from({ length: 30 }, (_, i) => <rect key={i} x={-145 + (i % 6) * 48} y={-70 + Math.floor(i / 6) * 50} width={38} height={38} rx={6} fill={i > 9 && i < 16 ? KC.gold2 : '#ece6da'} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Interior del cierre: túneles con agua pegada.
function TunelesAgua(T, r) {
  const R = krng(21);
  const tubos = Array.from({ length: 7 }, (_, i) => { const y0 = 40 + i * (r * 2 - 80) / 6; return `M -20 ${y0} C ${r * 0.6} ${y0 + (R() - 0.5) * 160}, ${r * 1.3} ${y0 + (R() - 0.5) * 160}, ${r * 2 + 20} ${y0 + (R() - 0.5) * 60}`; });
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#25324a" />
    {tubos.map((d, i) => <g key={i}><path d={d} fill="none" stroke="#0b1220" strokeWidth={34} strokeLinecap="round" /><path d={d} fill="none" stroke={AGUA} strokeWidth={10} strokeDasharray="2 16" strokeLinecap="round" strokeDashoffset={-T * 6} opacity={0.95} /></g>)}
  </svg>;
}

function Silica() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Su: CUES.Superficie, Si: CUES.Silanol, Ad: CUES.Adsorcion, Pr: CUES.Pregunta, Ri: CUES.Riesgo, Es: CUES.Estudio, Sn: CUES.Sintomas, Cu: CUES.Curioso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const riMitad = K.Ri + 4.2;
  // canal del silanol: paredes en y = 700 (arriba) y 1140 (abajo); 1 nm ≈ 110 px (esquemático)
  const SIL_X = [130, 330, 530, 730, 930];
  const aguas = [[330, 1], [730, 1], [130, -1], [530, -1], [930, 1], [930, -1], [330, -1], [530, 1]];
  const cancha = kprog(T, K.Su + 0.6, K.Su + 2.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el sobre sale del tenis, se rasga y caen las bolitas */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><MundoTenis T={T} tt={T - K.G} vapor={kprog(T, K.G + 3.0, K.G + 3.6)} /></SvgCapa>
      </Escena>
      {/* 1 · qué es: arena vs. sílica gel con poros */}
      <Escena T={T} a={K.Q} b={K.Su}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <GranoArena x={290} y={870} s={1.15 * (0.6 + 0.4 * kprog(T, K.Q, K.Q + 0.5, kEase.rebote))} />
          <BolitaPoros x={760} y={870} r={180 * (0.6 + 0.4 * kprog(T, K.Q + 0.2, K.Q + 0.7, kEase.rebote))} p={kprog(T, K.Q + 2.6, K.Q + 4.4)} />
          <text x={290} y={1080} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.ink}>arena</text>
          <text x={760} y={1110} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.ink}>sílica gel</text>
          <g opacity={kprog(T, K.Q + 1.0, K.Q + 1.4)}>
            <text x={540} y={630} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">SiO₂</text>
            <path d="M 450 650 L 340 740 M 630 650 L 680 700" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          </g>
        </SvgCapa>
      </Escena>
      {/* 2 · superficie: un gramo por dentro > una cancha */}
      <Escena T={T} a={K.Su} b={K.Si} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Cancha x={540} y={930} w={klerp(60, 900, cancha)} h={klerp(60, 482, cancha)} o={kprog(T, K.Su + 0.5, K.Su + 0.8)} />
          {cancha < 0.98 && <BolitaPoros x={540} y={930} r={klerp(110, 30, kprog(T, K.Su, K.Su + 0.8))} p={1} />}
          {cancha > 0.98 && <g><text x={540} y={1135} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">28 m × 15 m = 420 m²</text></g>}
        </SvgCapa>
        <Contador T={T} at={K.Su + 0.6} desde={0} hasta={420} dur={2.2} sufijo=" m²" x={540} y={930} tam={96} color={KC.texto} />
      </Escena>
      {/* 3 · silanoles: el agua se pega (fondo oscuro: escala molecular) */}
      <Escena T={T} a={K.Si} b={K.Ad}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={460} width={KW} height={140} fill={PARED} stroke={KC.ink} strokeWidth={6} />
          <rect x={0} y={1080} width={KW} height={140} fill={PARED} stroke={KC.ink} strokeWidth={6} />
          {SIL_X.map((x, i) => <g key={i}><Silanol x={x} y={600} dir={1} /><Silanol x={x} y={1080} dir={-1} /></g>)}
          {aguas.map(([x, dir], i) => { const t0 = K.Si + 0.6 + i * 0.45, p = kprog(T, t0, t0 + 0.9, kEase.sale);
            const hx = x + 30, hy = dir > 0 ? 600 + 88 : 1080 - 88, tx = hx + 10, ty = hy + dir * 80;
            const R = krng(30 + i), x0 = 1180, y0 = 760 + R() * 200;
            const mx = klerp(x0, tx, p) + (p < 1 ? Math.sin(T * 5 + i) * 14 : 0), my = klerp(y0, ty, p) + (p < 1 ? Math.cos(T * 4 + i) * 14 : 0);
            return <g key={i}>
              {p >= 1 && <line x1={hx} y1={hy} x2={tx} y2={ty - dir * 30} stroke={AGUA} strokeWidth={5} strokeDasharray="8 8" />}
              {T > t0 - 0.6 && <Mol tipo="agua" x={mx} y={my} s={1.0} rot={p >= 1 ? (dir > 0 ? 180 : 0) : T * 60 + i * 40} />}
            </g>; })}
        </SvgCapa>
        <div style={{ position:'absolute', left:60, top:1420, zIndex:40, color:KC.texto, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
          <div style={{ marginBottom:8 }}>≈ 2 nm (esquemático)</div>
          <div style={{ width:220, height:8, background:KC.texto, borderRadius:4 }}></div>
        </div>
      </Escena>
      {/* 4 · absorción vs. adsorción */}
      <Escena T={T} a={K.Ad} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={kprog(T, K.Ad + 0.1, K.Ad + 0.5)}>
            <rect x={90} y={760} width={380} height={300} rx={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} />
            <clipPath id="esponja"><rect x={90} y={760} width={380} height={300} rx={40} /></clipPath>
            <rect x={90} y={1060 - 300 * kprog(T, K.Ad + 0.4, K.Ad + 2.0)} width={380} height={300} fill={AGUA} opacity={0.75} clipPath="url(#esponja)" />
            {[[150, 820], [260, 860], [380, 810], [180, 960], [320, 980], [420, 920]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={22} ry={16} fill="#c9a400" opacity={0.7} />)}
            <text x={280} y={1130} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>esponja</text>
          </g>
          <g opacity={kprog(T, K.Ad + 1.2, K.Ad + 1.6)}>
            <rect x={600} y={960} width={400} height={100} fill={PARED} stroke={KC.ink} strokeWidth={8} />
            {[650, 730, 810, 890, 960].map((x, i) => { const p = kprog(T, K.Ad + 1.6 + i * 0.2, K.Ad + 2.0 + i * 0.2, kEase.rebote);
              return <Mol key={i} tipo="agua" x={x} y={klerp(780, 922, p)} s={0.7} rot={180} o={p} />; })}
            <text x={800} y={1130} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>sílica gel</text>
          </g>
          <g opacity={kprog(T, K.Ad + 0.6, K.Ad + 1.0)}>
            <text x={280} y={700} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">ABSORBE</text>
            <text x={280} y={740} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>(con b: adentro)</text>
          </g>
          <g opacity={kprog(T, K.Ad + 2.0, K.Ad + 2.4)}>
            <text x={800} y={700} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">A<tspan fill={KC.gold2} style={{ font:`400 ${66 + 30 * kprog(T, K.Ad + 2.6, K.Ad + 3.0, kEase.rebote)}px ${KF.titulo}` }}>D</tspan>SORBE</text>
            <text x={800} y={740} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>(con d: encima)</text>
          </g>
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ri} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Sobre x={290} y={930} s={1.5 * (1 + 0.05 * Math.sin(T * 8))} rot={-6} />
          <text x={300} y={660} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 8} 300 600)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6a · riesgo: atragantamiento */}
      <Escena T={T} a={K.Ri} b={riMitad}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <g transform="translate(660 960)">
            <path d="M -170 260 Q -170 60 0 60 Q 170 60 170 260 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={9} />
            <circle cx={0} cy={-80} r={150} fill="#f1b48f" stroke={KC.ink} strokeWidth={9} />
            <circle cx={-50} cy={-100} r={14} fill={KC.ink} /><circle cx={50} cy={-100} r={14} fill={KC.ink} />
            <ellipse cx={0} cy={-20} rx={34} ry={22} fill="#7a1f2b" stroke={KC.ink} strokeWidth={5} />
          </g>
          <Sobre x={klerp(360, 560, kprog(T, K.Ri + 0.3, K.Ri + 1.3, kEase.suave))} y={950} s={0.55} rot={-20} />
          {T > K.Ri + 1.5 && <g transform={`translate(860 700) scale(${kprog(T, K.Ri + 1.5, K.Ri + 1.9, kEase.rebote)})`}>
            <path d="M 0 -90 L 90 70 L -90 70 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
            <text x={0} y={52} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink}>!</text></g>}
        </SvgCapa>
      </Escena>
      {/* 6b · riesgo: cloruro de cobalto, azul → rosa */}
      <Escena T={T} a={riMitad} b={K.Es}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {[0, 1, 2, 3, 4].map((i) => { const x = 220 + i * 160, cambia = kprog(T, riMitad + 1.0 + i * 0.45, riMitad + 1.6 + i * 0.45);
            return <g key={i}>
              {Array.from({ length: 3 }, (_, k) => { const ph = (T * 0.8 + k / 3 + i * 0.13) % 1; return <path key={k} d={`M ${x - 30 + k * 30} ${720 + ph * 180} q 10 -14 0 -28 q -10 -14 0 -28`} fill="none" stroke={AGUA} strokeWidth={6} strokeLinecap="round" opacity={Math.sin(ph * Math.PI) * (1 - cambia * 0.6)} />; })}
              <Bolita x={x} y={1000 + Math.sin(T * 2 + i) * 6} r={62} color={mixHex(AZUL_CO, ROSA_CO, cambia)} />
            </g>; })}
          <text x={300} y={1150} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>seca: azul</text>
          <text x={800} y={1150} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, riMitad + 2.5, riMitad + 3.0)}>mojada: rosa</text>
        </SvgCapa>
      </Escena>
      {/* 7 · el estudio de Israel */}
      <Escena T={T} a={K.Es} b={K.Sn}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T > K.Es + 3.4 && <Telefono T={T} x={250} y={960} s={0.9} suena={T < K.Es + 6.0 ? 1 : 0} />}
          {T > K.Es + 5.6 && <g opacity={kprog(T, K.Es + 5.6, K.Es + 6.0)}>
            <rect x={90} y={1120} width={900} height={70} rx={35} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
            <rect x={90} y={1120} width={900 * 0.914 * kprog(T, K.Es + 5.8, K.Es + 7.0, kEase.sale)} height={70} rx={35} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
            <text x={540} y={1100} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>91 % · niños menores de 6 años</text>
          </g>}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Es + 3.6} until={K.Sn - 0.3} valor={546} dur={1.8} etiqueta="casos en 1 año" x={700} y={900} tam={220} color={KC.pink} />
      </Escena>
      {/* 8 · síntomas: menos de 3 de cada 100 */}
      <Escena T={T} a={K.Sn} b={K.Cu}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {Array.from({ length: 100 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), x = 103 + (i % 20) * 46, y = 780 + Math.floor(i / 20) * 82;
            const on = kprog(T, K.Sn + 0.2 + i * 0.012, K.Sn + 0.4 + i * 0.012), nar = kprog(T, K.Sn + 1.8, K.Sn + 2.3);
            const base = mixHex('#d8f5ea', '#2a9d6a', on);
            if (i < 2) return <Personita key={i} x={x} y={y} s={0.78} color={mixHex(base, KC.orange, nar)} o={on} />;
            if (i === 2) return <PersonaParcial key={i} id="p27" x={x} y={y} s={0.78} f={0.7 * nar} base={base} color={KC.orange} />;
            return <Personita key={i} x={x} y={y} s={0.78} color={base} o={Math.max(0.3, on)} />; })}
        </SvgCapa>
      </Escena>
      {/* 9 · curioso: el pico de abril */}
      <Escena T={T} a={K.Cu} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Calendario x={270} y={900} />
          {[['mes típico', 42, '#d9d2c5', 650], ['abril', 74, KC.red, 880]].map(([t, v, c, x], i) => { const h = (v / 74) * 340 * kprog(T, K.Cu + 0.5 + i * 0.6, K.Cu + 1.4 + i * 0.6, kEase.sale);
            return <g key={i}>
              <rect x={x - 80} y={1110 - h} width={160} height={h} fill={c} stroke={KC.ink} strokeWidth={8} />
              <text x={x} y={1090 - h} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke" opacity={h > 10 ? 1 : 0}>{v}</text>
              <text x={x} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{t}</text>
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el tenis del inicio, ahora visto por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><MundoTenis T={T} tt={6} vapor={1} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Ci + 0.5} until={K.Ou - 0.2} x={760} y={720} r={190} fx={440} fy={1140} interior={TunelesAgua} tinte={AGUA} etiqueta="POR DENTRO · agua atrapada" />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.G + 3.0} texto="☠ ¿veneno?" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 3.1} until={K.Q - 0.3} texto="una trampa para el agua" x={540} y={1500} tam={44} borde={AGUA} />
      <Chip T={T} at={K.Q + 1.2} until={K.Su - 0.3} texto="dióxido de silicio" y={1500} tam={44} borde={KC.orange} />
      <Etq T={T} at={K.Q + 2.8} until={K.Su - 0.3} x={1040} y={630} texto="poros diminutos" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Su + 3.0} until={K.Si - 0.3} texto="1 g por dentro: 450–640 m²" y={1500} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Si + 0.5} until={K.Ad - 0.3} x={560} y={480} texto="pared del poro: Si–OH" lado="der" tam={32} />
      <Chip T={T} at={K.Si + 2.2} until={K.Ad - 0.3} texto="puente de hidrógeno" y={1560} tam={42} borde={AGUA} />
      <Chip T={T} at={K.Ad + 3.0} until={K.Pr - 0.2} texto="se queda en la superficie" y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ri + 1.8} until={riMitad - 0.3} texto="riesgo: atragantarse" y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={riMitad + 0.4} until={K.Es - 0.3} texto="cloruro de cobalto (CoCl₂)" y={1500} tam={40} borde={AZUL_CO} />
      <Etq T={T} at={riMitad + 3.4} until={K.Es - 0.3} x={540} y={600} texto="tóxico · ≤ 1 %" lado="der" tam={40} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.4} anio="2015" quien="Lavon y Bentur · Israel" revista="Isr Med Assoc J · centro de toxicología" x={640} y={860} />
      <Chip T={T} at={K.Sn + 2.4} until={K.Cu - 0.2} texto="2.7 % con síntomas leves" y={1500} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Cu + 1.8} until={K.Ci - 0.2} texto="justo antes de la Pascua judía" y={1500} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="arena con túneles + agua pegada" y={1500} tam={38} borde={AGUA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No son veneno: *trampa para agua.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Su - 0.1} texto="Sílica gel: *arena con poros.*" />
      <Subtitulo T={T} idx={2} at={K.Su + 0.1} until={K.Si - 0.1} texto="Un gramo: *más que una cancha.*" />
      <Subtitulo T={T} idx={3} at={K.Si + 0.1} until={K.Ad - 0.1} texto="El agua *se les pega.*" />
      <Subtitulo T={T} idx={4} at={K.Ad + 0.1} until={K.Pr - 0.1} texto="Adsorción, *con d.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ri - 0.1} texto="¿Por qué *«no comer»?*" />
      <Subtitulo T={T} idx={6} at={K.Ri + 0.1} until={K.Es - 0.1} texto="Atragantarse y *cloruro de cobalto.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Sn - 0.1} texto="Israel: *546 casos en un año.*" />
      <Subtitulo T={T} idx={8} at={K.Sn + 0.1} until={K.Cu - 0.1} texto="Menos de 3 *de cada 100.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="El pico: *abril.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Túneles *atrapando agua.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Superficie - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Superficie + 1.2, CUES.Silanol - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Silanol + 1.5, CUES.Adsorcion - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Adsorcion + 0.8, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Riesgo + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Riesgo + 1.5, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 1.0, CUES.Sintomas - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Sintomas + 0.5, CUES.Curioso - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Curioso + 0.3, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="27" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SilicaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Silica /></CompositionStage></div>;
}
window.SilicaApp = SilicaApp;
