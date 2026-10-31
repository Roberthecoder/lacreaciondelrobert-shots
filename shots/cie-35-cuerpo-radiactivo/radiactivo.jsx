// Shot Científico #35 · Tu cuerpo es un poquito radiactivo — NARRADO (N2 "El número" + N1 "Por dentro").
// Datos: HPS "Are our bodies naturally radioactive?", Ministerio del Medio Ambiente de Japón / UNSCEAR 2008, NIST (abundancia K-40),
// NUBASE2020 (K-40 → Ca-40), EPA FGR 13 / Eisenbud y Gesell (homeostasis), Nie et al. 2023 Science (K-40 de supernovas).
// Ver guion.md y verificacion.md. Las chispitas son esquemáticas: la radiación no se ve. El átomo NO se rompe: se transforma de K en Ca.
const RA_CHISPA = '#d9ff4a', RA_K = '#ff8a1f', RA_K40 = KC.pink, RA_CA = KC.cyan, RA_CUERPO = '#2b0f63';

// Silueta de una persona de frente. (x, yPies) = pies; s = escala (alto ≈ 830 px a s=1).
const SIL_LINEAS = [[-150, -590, -215, -300, 74], [150, -590, 215, -300, 74], [-70, -270, -88, -16, 92], [70, -270, 88, -16, 92]];
function siluetaPuntos(seed, n) {
  const g = krng(seed), pts = [];
  while (pts.length < n) {
    const k = g();
    if (k < 0.16) { const a = g() * 6.283, r = Math.sqrt(g()) * 72; pts.push([Math.cos(a) * r, -730 + Math.sin(a) * r]); }
    else if (k < 0.6) pts.push([-120 + g() * 240, -590 + g() * 320]);
    else { const L = SIL_LINEAS[Math.floor(g() * 4)], f = g(); pts.push([klerp(L[0], L[2], f) + (g() - 0.5) * L[4] * 0.5, klerp(L[1], L[3], f)]); }
  }
  return pts;
}
const SIL_PTS = siluetaPuntos(35, 90);
function Chispa({ x, y, r = 18, color = RA_CHISPA, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <circle r={r * 1.6} fill={color} opacity=".25" />
    <path d={`M 0 ${-r} Q ${r * 0.18} ${-r * 0.18} ${r} 0 Q ${r * 0.18} ${r * 0.18} 0 ${r} Q ${-r * 0.18} ${r * 0.18} ${-r} 0 Q ${-r * 0.18} ${-r * 0.18} 0 ${-r} Z`} fill={color} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// chispas: 0..1 (cuántas parpadean); halo: 0..1 brillo suave alrededor (cierre).
function Silueta({ T, x, yPies, s = 1, color = RA_CUERPO, chispas = 1, halo = 0, vel = 1, estrellas = 0 }) {
  const formas = (fill, extra, op = 1) => <g opacity={op}>
    <circle cx={0} cy={-730} r={92 + extra / 2} fill={fill} />
    <rect x={-32 - extra / 2} y={-660} width={64 + extra} height={60} fill={fill} />
    <rect x={-152 - extra / 2} y={-622 - extra / 2} width={304 + extra} height={380 + extra} rx={80} fill={fill} />
    {SIL_LINEAS.map(([a, b, c, d, w], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={fill} strokeWidth={w + extra} strokeLinecap="round" />)}
  </g>;
  return <g transform={`translate(${x} ${yPies}) scale(${s})`}>
    {halo > 0.01 && <g opacity={halo * (0.75 + 0.25 * Math.sin(T * 2.4))} style={{ filter:'blur(18px)' }}>{formas(RA_CHISPA, 70)}</g>}
    {formas(KC.ink, 18)}
    {formas(color, 0)}
    <ellipse cx={-34} cy={-745} rx={20} ry={12} fill="#fff" opacity=".18" />
    {SIL_PTS.map(([px, py], i) => {
      if (i / SIL_PTS.length > chispas) return null;
      const per = 0.7 + (i % 7) * 0.13, f = ((T * vel / per) + i * 0.618) % 1, o = f < 0.35 ? Math.sin(f / 0.35 * Math.PI) : 0;
      return o > 0.02 && <Chispa key={i} x={px} y={py} r={13 + (i % 4) * 4} o={o} rot={i * 23} color={i % 3 ? RA_CHISPA : KC.mint} />;
    })}
    {estrellas > 0 && SIL_PTS.slice(0, 14).map(([px, py], i) => <g key={'e' + i} opacity={estrellas * (0.55 + 0.45 * Math.sin(T * 3 + i))}>
      <Chispa x={px * 0.9} y={py} r={10} color="#fff" rot={45} /></g>)}
  </g>;
}
// Tarjeta del elemento (como en la tabla periódica).
function Elemento({ x, y, s = 1, sim = 'K', num = '19', nombre = 'potasio', color = RA_K }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-122} y={-132} width={250} height={270} rx={26} fill={KC.ink} />
    <rect x={-130} y={-140} width={250} height={270} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-130} y={-140} width={250} height={40} rx={18} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text x={-105} y={-58} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{num}</text>
    <text x={-5} y={60} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{sim}</text>
    <text x={-5} y={112} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
  </g>;
}
function Platano({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -190 -60 C -150 90 120 120 200 -40 C 140 30 -60 40 -150 -80 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -150 -40 C -80 40 80 60 170 -10" fill="none" stroke="#e0b800" strokeWidth={8} strokeLinecap="round" />
    <path d="M -190 -60 L -215 -95 L -190 -102 L -168 -72" fill="#7a5a1e" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={200} cy={-40} r={10} fill="#3a2a12" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Aguacate({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -170 C 70 -170 80 -80 110 -10 C 150 90 90 170 0 170 C -90 170 -150 90 -110 -10 C -80 -80 -70 -170 0 -170 Z" fill="#3f6b2a" stroke={KC.ink} strokeWidth={10} />
    <path d="M 0 -140 C 55 -140 62 -70 88 -5 C 120 80 72 145 0 145 C -72 145 -120 80 -88 -5 C -62 -70 -55 -140 0 -140 Z" fill="#c9e27a" />
    <circle cx={0} cy={50} r={58} fill="#8a5a2b" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-18} cy={30} rx={16} ry={10} fill="#fff" opacity=".35" />
  </g>;
}
// Bolita de átomo con su símbolo.
function Atomo({ x, y, r = 34, color = RA_K, sim = 'K', brillo = 0, T = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {brillo > 0.01 && <circle r={r * (1.9 + 0.2 * Math.sin(T * 6))} fill={color} opacity={0.35 * brillo} />}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.13)} />
    <ellipse cx={-r * 0.32} cy={-r * 0.36} rx={r * 0.28} ry={r * 0.16} fill="#fff" opacity=".45" />
    <text x={0} y={r * 0.34} textAnchor="middle" style={{ font:`900 ${r * 0.9}px ${KF.texto}` }} fill={KC.ink}>{sim}</text>
  </g>;
}
// Átomo grande (núcleo + órbitas) que cambia de K-40 a Ca-40. cambio 0..1, destello 0..1.
function AtomoGrande({ T, x, y, s = 1, cambio = 0, destello = 0 }) {
  const g = krng(40), nuc = Array.from({ length: 26 }, (_, i) => { const a = g() * 6.283, r = Math.sqrt(g()) * 62; return [Math.cos(a) * r, Math.sin(a) * r, i % 2]; });
  const col = mixHex('#ff2d78', '#00d2ff', cambio);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {destello > 0.01 && <g opacity={destello}>
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} y1={-90} x2={0} y2={-90 - 150 * destello - (i % 2) * 50} stroke={RA_CHISPA} strokeWidth={14} strokeLinecap="round" transform={`rotate(${i * 360 / 14 + T * 20})`} />)}
      <circle r={110 + 60 * destello} fill="#fff" opacity={0.5 * destello} />
    </g>}
    {[0, 60, 120].map((a, i) => <ellipse key={i} rx={170} ry={62} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={5} transform={`rotate(${a})`} />)}
    {[0, 60, 120].map((a, i) => { const t = T * 1.6 + i * 2.1; return <circle key={'e' + i} cx={Math.cos(t) * 170} cy={Math.sin(t) * 62} r={13} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />; })}
    <g transform={`scale(${1 + 0.04 * Math.sin(T * 9) * (1 - cambio)})`}>
      {nuc.map(([nx, ny, p], i) => <circle key={i} cx={nx} cy={ny} r={22} fill={p ? col : '#c9ced8'} stroke={KC.ink} strokeWidth={4} />)}
    </g>
    <g transform="translate(0 150)">
      <rect x={-110} y={-36} width={220} height={66} rx={33} fill="rgba(10,12,20,.85)" stroke={col} strokeWidth={5} />
      <text x={0} y={14} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.texto}>{cambio < 0.5 ? 'K-40' : 'Ca-40'}</text>
    </g>
  </g>;
}
// Montón de átomos de potasio: uno (el especial) es K-40.
const RA_GRID = { cols: 8, filas: 7, x0: 155, y0: 470, paso: 110, esp: [5, 4] };
function MontonAtomos({ T, at, brillo = 1 }) {
  const { cols, filas, x0, y0, paso, esp } = RA_GRID;
  return <g>{Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), es = c === esp[0] && f === esp[1];
    const e = kprog(T, at + (c + f) * 0.04, at + 0.3 + (c + f) * 0.04, kEase.rebote);
    const jx = Math.sin(T * 2 + i) * 4, jy = Math.cos(T * 1.7 + i * 1.3) * 4;
    return <g key={i} transform={`translate(${x0 + c * paso + jx} ${y0 + f * paso + jy}) scale(${e})`}>
      <Atomo x={0} y={0} r={es ? 40 : 34} color={es ? RA_K40 : RA_K} sim="K" brillo={es ? brillo : 0} T={T} />
    </g>; })}</g>;
}
const RA_ESP = [RA_GRID.x0 + RA_GRID.esp[0] * RA_GRID.paso, RA_GRID.y0 + RA_GRID.esp[1] * RA_GRID.paso];
// Gráfica de pastel: fracción f de "tu propio cuerpo" (dibujada a ~9 %, dentro del 7–10 % verificado).
function Pastel({ T, x, y, r = 300, p = 1, sale = 0 }) {
  const f = 0.09, a0 = -Math.PI / 2, a1 = a0 + 2 * Math.PI * f * kclamp(p * 3 - 2, 0, 1), aEnd = a0 + 2 * Math.PI * Math.min(1, p * 1.5);
  const arco = (A, B, R, dx = 0, dy = 0) => `M ${dx} ${dy} L ${dx + Math.cos(A) * R} ${dy + Math.sin(A) * R} A ${R} ${R} 0 ${B - A > Math.PI ? 1 : 0} 1 ${dx + Math.cos(B) * R} ${dy + Math.sin(B) * R} Z`;
  const am = a0 + Math.PI * f, dx = Math.cos(am) * 50 * sale, dy = Math.sin(am) * 50 * sale;
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={10} cy={14} r={r} fill={KC.ink} />
    {aEnd > a0 + 0.01 && <path d={arco(a0 + 2 * Math.PI * f, Math.max(a0 + 2 * Math.PI * f + 0.001, aEnd), r)} fill={KC.paper} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />}
    {a1 > a0 + 0.01 && <path d={arco(a0, a1, r * (1 + 0.04 * sale), dx, dy)} fill={KC.pink} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />}
  </g>;
}
// Riñón (frijol) chiquito.
function Rinon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M -10 -60 C 50 -70 60 0 40 50 C 25 85 -40 75 -45 30 C -48 10 -20 5 -20 -10 C -20 -25 -50 -30 -45 -45 C -40 -58 -25 -58 -10 -60 Z" fill="#b5404a" stroke={KC.ink} strokeWidth={7} /></g>;
}
// Tierra que se forma del polvo. f 0..1.
function TierraNace({ T, x, y, r = 120, f = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.2, 1, f)})`} opacity={kclamp(f * 2, 0, 1)}>
    <circle r={r * 1.35} fill="#4da3ff" opacity=".18" />
    <circle r={r} fill="#2f7dff" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${-r * 0.6} ${-r * 0.3} q ${r * 0.4} ${-r * 0.4} ${r * 0.7} ${-r * 0.1} q ${-r * 0.1} ${r * 0.4} ${-r * 0.5} ${r * 0.4} z`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r * 0.1} ${r * 0.2} q ${r * 0.5} ${-r * 0.1} ${r * 0.55} ${r * 0.35} q ${-r * 0.3} ${r * 0.35} ${-r * 0.55} ${r * 0.05} z`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function Radiactivo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const SX = 370, SY = 1165;                           // silueta del gancho y del cierre
  const cuenta = Math.floor(Math.max(0, T - K.Gancho) * 4000);
  // supernova
  const sn = K.Viejo + 0.5, junta = K.Viejo + 2.6;
  const polvo = krng(77), granos = Array.from({ length: 46 }, (_, i) => ({ a: polvo() * 6.283, v: 260 + polvo() * 260, k40: i % 6 === 0 }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu cuerpo con chispitas y el contador */}
      <Escena T={T} a={K.Gancho} b={K.Potasio} fondo={KC.lilac} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Silueta T={T} x={SX} yPies={SY} s={0.92} chispas={kprog(T, 0, 1.2) * 0.85 + 0.15} vel={1.4} />
        </Lienzo>
        <Etq T={T} at={1.2} until={K.Potasio - 0.3} x={SX + 170} y={850} texto="tú" lado="der" color={KC.texto} tam={40} />
        <div style={{ position:'absolute', left:0, right:0, top:1430, zIndex:41, textAlign:'center' }}>
          <div style={{ font:`700 34px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>en ti desde que empezó el video (adulto)</div>
          <div style={{ display:'inline-block', marginTop:10, font:`700 84px ${KF.mono}`, color:RA_CHISPA, background:'rgba(14,15,18,.82)', border:`5px solid ${RA_CHISPA}`, borderRadius:20, padding:'2px 30px' }}>{kformato(cuenta)}</div>
          <div style={{ font:`700 26px ${KF.mono}`, color:'rgba(246,243,236,.85)', marginTop:16, textShadow:KSOMBRA }}>chispitas esquemáticas: la radiación no se ve</div>
        </div>
      </Escena>
      {/* 1 · potasio: plátano, aguacate → tú; nervios y músculos */}
      <Escena T={T} a={K.Potasio} b={K.Isotopo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Potasio + 0.1, K.Potasio + 0.6, kEase.rebote)) * -500})`}><Elemento x={540} y={560} s={1} /></g>
          {T < K.Potasio + 3.0 ? <g opacity={1 - kprog(T, K.Potasio + 2.7, K.Potasio + 3.0)}>
            <g transform={`scale(${kprog(T, K.Potasio + 0.8, K.Potasio + 1.2, kEase.rebote)})`} style={{ transformOrigin:'260px 950px' }}><Platano x={260} y={950} s={1.05} rot={-12} /></g>
            <g transform={`scale(${kprog(T, K.Potasio + 1.3, K.Potasio + 1.7, kEase.rebote)})`} style={{ transformOrigin:'820px 940px' }}><Aguacate x={820} y={940} s={0.95} rot={10} /></g>
            {[[260, 950], [820, 940]].map(([ax, ay], j) => Array.from({ length: 3 }, (_, i) => { const f = kprog(T, K.Potasio + 1.6 + j * 0.3 + i * 0.25, K.Potasio + 2.4 + j * 0.3 + i * 0.25, kEase.suave);
              return f > 0 && f < 1 && <Atomo key={j + '-' + i} x={klerp(ax, 540, f)} y={klerp(ay, 690, f) - Math.sin(f * Math.PI) * 120} r={26} />; }))}
          </g> : <g opacity={kprog(T, K.Potasio + 3.0, K.Potasio + 3.4)}>
            <PersonaSimple x={540} yPies={1180} alto={480} color={KC.pink} brazos={0.75} cara="sonrie" />
            {/* nervio: rayito que recorre el brazo; músculo: bíceps que se infla */}
            <path d="M 590 1000 L 640 960 L 610 940 L 680 880 L 650 860 L 720 790" fill="none" stroke={KC.cyan} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="420" strokeDashoffset={420 * (1 - kprog(T, K.Potasio + 3.3, K.Potasio + 3.9))} opacity={0.6 + 0.4 * Math.sin(T * 12)} />
            <ellipse cx={398} cy={835} rx={44 + 10 * Math.max(0, Math.sin(T * 5))} ry={30} fill="#ff6b5a" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Potasio + 4.0, K.Potasio + 4.3)} />
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Potasio + 0.9} until={K.Potasio + 2.6} x={150} y={1090} texto="plátano" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Potasio + 1.4} until={K.Potasio + 2.6} x={930} y={1140} texto="aguacate" lado="izq" color={KC.ink} />
        <Etq T={T} at={K.Potasio + 3.6} until={K.Isotopo - 0.2} x={740} y={780} texto="nervios" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Potasio + 4.1} until={K.Isotopo - 0.2} x={340} y={780} texto="músculos" lado="izq" color={KC.ink} />
      </Escena>
      {/* 2 · isótopo: muchos K, uno es K-40 (por dentro, oscuro) */}
      <Escena T={T} a={K.Isotopo} b={K.Decae + 0.5} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={24} color="rgba(255,255,255,.12)" />
        <Lienzo><MontonAtomos T={T} at={K.Isotopo} brillo={kprog(T, K.Isotopo + 1.6, K.Isotopo + 2.2)} />
          {T > K.Isotopo + 2.0 && <g transform={`translate(${RA_ESP[0] - 110} ${RA_ESP[1] - 95}) scale(${klerp(0.4, 1, kprog(T, K.Isotopo + 2.0, K.Isotopo + 2.35, kEase.rebote))})`}>
            <rect x={-200} y={-36} width={400} height={68} rx={34} fill="rgba(10,12,20,.92)" stroke={RA_K40} strokeWidth={5} />
            <text x={0} y={12} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>potasio-40 · inestable</text></g>}</Lienzo>
        <Chip T={T} at={K.Isotopo + 0.3} until={K.Isotopo + 2.8} texto="átomos de potasio" x={540} y={400} tam={38} borde={RA_K} />
        <Chip T={T} at={K.Isotopo + 3.0} until={K.Decae - 0.2} texto="muy poquito: ≈ 1 de cada 8,500" x={540} y={400} tam={36} borde={RA_K40} />
      </Escena>
      {/* 3 · al microscopio: el átomo se transforma de K en Ca y suelta un destello */}
      <Escena T={T} a={K.Decae} b={K.Cuenta} fondo={KC.noche} zoom={0}>
        <FondoMarca patron="oscuro" />
        <Lienzo o={0.45}><MontonAtomos T={T} at={-10} brillo={1} /></Lienzo>
        <Lupa T={T} at={K.Decae + 0.2} until={K.Cuenta - 0.25} x={540} y={720} r={260} fx={RA_ESP[0]} fy={RA_ESP[1]} tinte={RA_K40} etiqueta="AL MICROSCOPIO · ÁTOMO"
          interior={(t, r) => { const c = kprog(t, K.Decae + 2.1, K.Decae + 2.5), d = kprog(t, K.Decae + 2.1, K.Decae + 2.4) * (1 - kprog(t, K.Decae + 2.9, K.Decae + 3.8));
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1424" /><AtomoGrande T={t} x={r} y={r - 30} s={1.15} cambio={c} destello={d} />
              {t > K.Decae + 2.3 && [0, 1, 2].map((i) => { const f = kprog(t, K.Decae + 2.3 + i * 0.15, K.Decae + 3.6 + i * 0.15);
                return f > 0 && f < 1 && <path key={i} d={`M ${r + 80 + f * 240} ${r - 140 - f * 120} q 12 -20 24 0 t 24 0 t 24 0`} fill="none" stroke={RA_CHISPA} strokeWidth={8} strokeLinecap="round" opacity={1 - f} />; })}</svg>; }} />
        <Chip T={T} at={K.Decae + 2.6} until={K.Cuenta - 0.2} texto="potasio-40 → calcio-40" x={540} y={400} tam={40} borde={RA_CA} />
        <Etq T={T} at={K.Decae + 2.9} until={K.Cuenta - 0.2} x={810} y={1140} texto="+ un poquito de radiación" lado="izq" color={RA_CHISPA} tam={32} />
      </Escena>
      {/* 4 · el número */}
      <Escena T={T} a={K.Cuenta} b={K.Pregunta} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo><Silueta T={T} x={540} yPies={1185} s={0.42} chispas={1} vel={2.2} /></Lienzo>
        <NumeroGigante T={T} at={K.Cuenta + 0.2} until={K.Pregunta - 0.1} valor={4000} prefijo="≈ " etiqueta="átomos que se desintegran (adulto)" x={540} y={560} tam={230} color={KC.yellow} />
        <Chip T={T} at={K.Cuenta + 0.9} until={K.Pregunta - 0.1} texto="por segundo" x={540} y={760} tam={52} borde={KC.yellow} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Normal} color={KC.cyan} />
      {/* 6 · normal: toda tu vida + pastel de un año */}
      <Escena T={T} a={K.Normal} b={K.Platano} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {T < K.Normal + 3.6 && <g opacity={1 - kprog(T, K.Normal + 3.2, K.Normal + 3.6)}>
            {[[0.3, 170], [0.5, 390], [0.75, 720]].map(([sc, sx], i) => { const e = kprog(T, K.Normal + 0.6 + i * 0.6, K.Normal + 1.0 + i * 0.6, kEase.rebote);
              return <g key={i} transform={`translate(${sx} 1150) scale(${e}) translate(${-sx} -1150)`}><Silueta T={T + i} x={sx} yPies={1150} s={sc} chispas={0.6} vel={1.2} /></g>; })}
          </g>}
          {T > K.Normal + 3.3 && <Pastel T={T} x={540} y={850} r={300} p={kprog(T, K.Normal + 3.4, K.Normal + 4.6, kEase.suave)} sale={kprog(T, K.Normal + 4.6, K.Normal + 5.0, kEase.rebote)} />}
          {T > K.Normal + 4.9 && <g opacity={kprog(T, K.Normal + 4.9, K.Normal + 5.2)}>
            <line x1={690} y1={560} x2={735} y2={560} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
            <TextoSvg x={745} y={555} tam={44} color={KC.white} ancla="start" fuente="texto">tu propio</TextoSvg>
            <TextoSvg x={745} y={605} tam={44} color={KC.white} ancla="start" fuente="texto">cuerpo</TextoSvg>
            <TextoSvg x={745} y={680} tam={70} color={KC.pink} ancla="start">7–10 %</TextoSvg>
            <text x={500} y={980} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Normal + 5.3, K.Normal + 5.6)}>el resto</text>
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Normal + 0.2} until={K.Normal + 3.3} texto="radiación natural" x={540} y={420} tam={44} borde={KC.leaf} />
        <Chip T={T} at={K.Normal + 1.9} until={K.Normal + 3.3} texto="toda tu vida →" x={300} y={560} tam={38} borde={KC.yellow} />
        <Chip T={T} at={K.Normal + 3.5} until={K.Platano - 0.15} texto="radiación natural de un año" x={540} y={420} tam={40} borde={KC.leaf} />
      </Escena>
      {/* 7 · el plátano también tiene potasio */}
      <Escena T={T} a={K.Platano} b={K.Igual} fondo={KC.yellow}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Platano, K.Platano + 0.5, kEase.rebote)) * 600})`}>
            <Platano x={530} y={880} s={1.8} rot={-14 + Math.sin(T * 1.5) * 3} />
            {SIL_PTS.slice(0, 26).map(([px, py], i) => { const f = ((T * 1.3 / (0.7 + (i % 5) * 0.15)) + i * 0.618) % 1, o = f < 0.35 ? Math.sin(f / 0.35 * Math.PI) : 0;
              return o > 0.02 && <Chispa key={i} x={530 + px * 1.2} y={880 + (py + 430) * 0.28} r={22} color={i % 2 ? KC.white : KC.mint} o={o * kprog(T, K.Platano + 0.6, K.Platano + 1.0)} rot={i * 30} />; })}
          </g>
        </Lienzo>
        <Lupa T={T} at={K.Platano + 2.6} until={K.Igual - 0.25} x={700} y={560} r={180} fx={600} fy={900} tinte={RA_K40} etiqueta="AL MICROSCOPIO · PLÁTANO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1424" />
            {Array.from({ length: 16 }, (_, i) => { const c = i % 4, f = Math.floor(i / 4), es = i === 9; return <Atomo key={i} x={r - 135 + c * 90 + Math.sin(t * 2 + i) * 4} y={r - 135 + f * 90} r={30} color={es ? RA_K40 : RA_K} brillo={es ? 1 : 0} T={t} />; })}</svg>} />
        <Chip T={T} at={K.Platano + 1.0} until={K.Platano + 2.5} texto="también tiene potasio" x={540} y={430} tam={44} borde={KC.yellow} />
      </Escena>
      {/* 8 · comer plátanos no te hace más radiactivo */}
      <Escena T={T} a={K.Igual} b={K.Viejo} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <PersonaSimple x={300} yPies={1170} alto={640} color={KC.pink} brazos={0.35} cara={T > K.Igual + 2.5 ? 'sonrie' : 'o'} />
          {[0, 1, 2].map((i) => { const a = K.Igual + 0.4 + i * 0.9, f = kprog(T, a, a + 0.7, kEase.suave);
            return f > 0 && f < 1 && <Platano key={i} x={klerp(1000, 330, f)} y={klerp(520, 620, f) - Math.sin(f * Math.PI) * 100} s={klerp(0.5, 0.2, f)} rot={f * 200} />; })}
          <Rinon x={330} y={880} s={kprog(T, K.Igual + 2.6, K.Igual + 3.0, kEase.rebote)} />
          {[0, 1, 2, 3].map((i) => { const f = ((T - K.Igual - 3.0) * 0.6 + i / 4) % 1; return T > K.Igual + 3.0 && <Atomo key={i} x={klerp(340, 560, f)} y={klerp(920, 1085, f)} r={22} o={Math.min(1, (1 - f) * 3)} />; })}
          <FlechaRecta x1={370} y1={950} x2={540} y2={1075} p={kprog(T, K.Igual + 3.0, K.Igual + 3.5, kEase.sale)} color={KC.yellow} grosor={12} />
          {/* medidor de potasio que se queda igual */}
          <g transform="translate(820 480)">
            <rect x={-70} y={0} width={140} height={420} rx={40} fill="rgba(14,15,18,.75)" stroke={KC.ink} strokeWidth={9} />
            <rect x={-48} y={22 + 376 * 0.4 + Math.sin(T * 4) * 3} width={96} height={376 * 0.6 - Math.sin(T * 4) * 3} rx={26} fill={RA_K} />
            <line x1={-95} y1={22 + 376 * 0.4} x2={95} y2={22 + 376 * 0.4} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" />
            <text x={0} y={290} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>K</text>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Igual + 0.2} until={K.Viejo - 0.2} texto="tu potasio" x={820} y={420} tam={36} borde={RA_K} />
        <Chip T={T} at={K.Igual + 1.8} until={K.Viejo - 0.2} texto="se queda igual" x={820} y={960} tam={40} borde={KC.leaf} />
        <Etq T={T} at={K.Igual + 3.2} until={K.Viejo - 0.2} x={575} y={1085} texto="sale lo que sobra" lado="der" color={KC.ink} tam={30} />
      </Escena>
      {/* 9 · viene de estrellas que explotaron */}
      <Escena T={T} a={K.Viejo} b={K.Cierre} fondo={KC.violet} zoom={0.03}>
        <Lienzo>
          <rect width={KW} height={KH} fill="#120a2e" />
          <EstrellasFondo T={T} n={80} seed={35} />
          {T < sn + 0.4 && <g transform={`translate(540 700) scale(${1 + 0.15 * kprog(T, K.Viejo, sn) + 0.05 * Math.sin(T * 14)})`}>
            <circle r={150} fill="#ffb347" opacity=".25" /><circle r={95} fill="#ffd23a" stroke={KC.ink} strokeWidth={9} /></g>}
          {T >= sn && <g>
            <circle cx={540} cy={700} r={80 + 500 * kprog(T, sn, sn + 1.2, kEase.sale)} fill="#fff6b0" opacity={0.7 * (1 - kprog(T, sn, sn + 1.2))} />
            {granos.map((gr, i) => { const ex = kprog(T, sn, sn + 1.6, kEase.sale), jn = kprog(T, junta, junta + 2.0, kEase.suave);
              const ox = 540 + Math.cos(gr.a) * gr.v * ex, oy = 700 + Math.sin(gr.a) * gr.v * ex;
              const ang = gr.a + jn * 3, rr = klerp(gr.v * 0.5, 0, jn);
              const X = klerp(ox, 540 + Math.cos(ang) * rr, jn), Y = klerp(oy, 980 + Math.sin(ang) * rr * 0.4, jn);
              return <circle key={i} cx={X} cy={Y} r={gr.k40 ? 13 : 8} fill={gr.k40 ? RA_K40 : '#ffcf8a'} stroke={KC.ink} strokeWidth={3} opacity={1 - kprog(T, junta + 1.6, junta + 2.2)} />; })}
          </g>}
          <TierraNace T={T} x={540} y={980} r={130} f={kprog(T, junta + 1.4, junta + 2.2, kEase.rebote)} />
        </Lienzo>
        <Chip T={T} at={sn + 0.3} until={junta - 0.1} texto="estrella que explota" x={540} y={420} tam={42} borde={KC.orange} />
        {T > sn + 0.9 && T < junta + 1.6 && <div style={{ position:'absolute', left:90, top:1095, zIndex:41, display:'flex', alignItems:'center', gap:14, opacity:kprog(T, sn + 0.9, sn + 1.2) * (1 - kprog(T, junta + 1.2, junta + 1.6)) }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:RA_K40, border:`4px solid ${KC.ink}` }}></div>
          <div style={{ font:`700 32px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>= potasio-40</div></div>}
        <Chip T={T} at={junta + 0.1} until={K.Cierre - 0.15} texto="antes de que existiera la Tierra" x={540} y={420} tam={38} borde={KC.cyan} />
      </Escena>
      {/* 10 · cierre: la misma silueta, ahora brilla tenue */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.lilac} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Silueta T={T} x={SX} yPies={SY} s={0.92} chispas={0.7} halo={kprog(T, K.Cierre + 0.3, K.Cierre + 1.5)} estrellas={kprog(T, K.Cierre + 2.0, K.Cierre + 2.8)} vel={1} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.2} until={K.Outro - 0.1} texto="restos de estrellas ✦" x={700} y={470} tam={42} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Potasio - 0.1} texto="Tu cuerpo es *un poquito radiactivo.*" />
      <Subtitulo T={T} idx={1} at={K.Potasio + 0.1} until={K.Isotopo - 0.1} texto="La culpa: *el potasio.*" />
      <Subtitulo T={T} idx={2} at={K.Isotopo + 0.1} until={K.Decae - 0.1} texto="Una parte chiquita: *potasio-40.*" />
      <Subtitulo T={T} idx={3} at={K.Decae + 0.1} until={K.Cuenta - 0.1} texto="Se transforma y suelta *radiación.*" />
      <Subtitulo T={T} idx={4} at={K.Cuenta + 0.1} until={K.Pregunta - 0.1} texto="*≈ 4,000* por segundo." />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Normal - 0.1} texto="¿Y eso es *peligroso?*" />
      <Subtitulo T={T} idx={6} at={K.Normal + 0.1} until={K.Platano - 0.1} texto="No: es *radiación natural.*" />
      <Subtitulo T={T} idx={7} at={K.Platano + 0.1} until={K.Igual - 0.1} texto="El plátano: *un poquito de K-40.*" />
      <Subtitulo T={T} idx={8} at={K.Igual + 0.1} until={K.Viejo - 0.1} texto="Comer plátanos *no cambia nada.*" />
      <Subtitulo T={T} idx={9} at={K.Viejo + 0.1} until={K.Cierre - 0.1} texto="Viene de *estrellas que explotaron.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Llevas *restos de estrellas* dentro." />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Potasio - 0.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Potasio + 3.0, K.Isotopo - 0.15, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Isotopo + 2.4, K.Decae - 0.15, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Decae + 2.6, K.Cuenta - 0.15, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Normal + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.Normal + 4.6, K.Platano - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Platano + 3.2, K.Igual - 0.15, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Igual + 3.6, K.Viejo - 0.15, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Viejo + 2.4, K.Cierre - 0.15, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="35" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function RadiactivoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Radiactivo /></CompositionStage></div>;
}
window.RadiactivoApp = RadiactivoApp;
