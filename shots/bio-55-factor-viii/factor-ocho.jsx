// Shot Biotecnológico #55 · La pieza que le falta a tu sangre: el factor VIII (hemofilia A) — NARRADO (N1 por dentro + estudio).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala, salvo la barra de la red de fibrina).
const F8 = { piel:'#f2c09a', pielO:'#d8946c', una:'#fbe3d3', sangre:'#d7263d', sangreO:'#8e1426', curita:'#e9b98a', curitaO:'#c98f5f',
  xii:KC.lilac, xi:KC.cyan, ix:KC.pink, viii:KC.yellow, x:KC.mint, ii:KC.red, fibrina:'#ffd36b', plaqueta:'#c9a2ff',
  plasma:'#ffd65c', gris:'#5d6b82', grisO:'#3c475a', virus1:'#ff7a59', virus2:'#7fd1ff', hamster:'#e2a35f', hamsterO:'#b9773a' };

function FSvg({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Dedo índice horizontal (sale por la izquierda) con uña, nudillos y una cortada encima.
// sangra 0..1 (gota que crece), curita 0..1 (se pega), quita 0..1 (la curita se despega), cerrada 0..1 (la cortada ya cerró)
function Dedo({ T, y = 1000, sangra = 0, curita = 0, quita = 0, cerrada = 0 }) {
  const cx = 560, cy = y - 92;
  const gota = sangra * (1 - cerrada);
  return <g>
    <ellipse cx={480} cy={y + 150} rx={460} ry={34} fill="rgba(0,0,0,.14)" />
    <path d={`M -60 ${y - 110} L 760 ${y - 104} Q 900 ${y - 100} 900 ${y} Q 900 ${y + 100} 760 ${y + 104} L -60 ${y + 110} Z`} fill={F8.piel} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M 762 ${y - 70} Q 850 ${y - 66} 852 ${y} Q 850 ${y + 30} 790 ${y + 34} L 762 ${y + 34}`} fill={F8.una} stroke={KC.ink} strokeWidth={6} />
    {[180, 440].map((nx, i) => <path key={i} d={`M ${nx} ${y - 60} q 14 30 0 60 M ${nx + 22} ${y - 50} q 12 26 0 46`} stroke={F8.pielO} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {/* cortada */}
    <path d={`M ${cx - 70} ${cy + 6} Q ${cx} ${cy - 10} ${cx + 70} ${cy + 4}`} stroke={cerrada > 0.5 ? '#e79a8a' : F8.sangreO} strokeWidth={klerp(12, 5, cerrada)} fill="none" strokeLinecap="round" />
    {gota > 0 && <g transform={`translate(${cx + 10} ${cy - 6})`}>
      <path d={`M 0 ${-60 * gota} Q ${34 * gota} ${-10 * gota} 0 ${10 * gota} Q ${-34 * gota} ${-10 * gota} 0 ${-60 * gota} Z`} transform={`translate(0 ${-6 * gota}) rotate(180)`} fill={F8.sangre} stroke={KC.ink} strokeWidth={5} />
      <circle cx={-8 * gota} cy={18 * gota} r={7 * gota} fill="rgba(255,255,255,.6)" />
    </g>}
    {curita > 0 && quita < 1 && <g transform={`translate(${cx + quita * 260} ${cy + 4 - quita * 360}) rotate(${-6 + quita * 40}) scale(${klerp(1.45, 1, curita)})`} opacity={kprog(curita, 0, 0.25) * (1 - quita)}>
      <rect x={-200} y={-58} width={400} height={116} rx={58} fill={F8.curita} stroke={KC.ink} strokeWidth={8} />
      <rect x={-70} y={-46} width={140} height={92} rx={14} fill="#f7e6d2" stroke={F8.curitaO} strokeWidth={5} />
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-170 + (i % 5) * 22 + (i > 4 ? 280 : 0)} cy={-18 + (i % 2) * 34} r={4} fill={F8.curitaO} />)}
    </g>}
  </g>;
}

// Ficha de dominó de un factor de la coagulación. cae 0..1 gira sobre su esquina inferior derecha.
function Ficha({ x, y, lab, color, cae = 0, vacia = 0, brillo = 0, s = 1, sub }) {
  const w = 104, h = 210, ang = cae * 20;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${w / 2} 0) rotate(${ang}) translate(${-w / 2} 0)`}>
      {brillo > 0 && <rect x={-16} y={-h - 16} width={w + 32} height={h + 32} rx={26} fill={color} opacity={0.35 * brillo} />}
      <rect x={0} y={-h} width={w} height={h} rx={16} fill={vacia ? `rgba(255,255,255,${0.08 + 0.12 * (1 - vacia)})` : color} stroke={vacia ? KC.texto : KC.ink} strokeWidth={vacia ? 6 : 8} strokeDasharray={vacia ? '18 12' : 'none'} />
      {!vacia && <line x1={14} y1={-h / 2} x2={w - 14} y2={-h / 2} stroke={KC.ink} strokeWidth={5} />}
      <text x={w / 2} y={-h / 2 - 22} textAnchor="middle" style={{ font:`400 ${lab.length > 3 ? 40 : 52}px ${KF.titulo}` }} fill={vacia ? KC.texto : KC.ink} opacity={vacia ? 0.7 : 1}>{lab}</text>
      {!vacia && [0, 1].map((i) => <circle key={i} cx={w / 2 + (i ? 20 : -20)} cy={-h / 4 + (i ? 16 : -16)} r={9} fill={KC.ink} />)}
    </g>
    {sub && <text x={w / 2} y={44} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>{sub}</text>}
  </g>;
}
const FILA = [['XII', 'xii'], ['XI', 'xi'], ['IX', 'ix'], ['VIII', 'viii'], ['X', 'x'], ['II', 'ii']];
// Fila de 6 fichas. t0 = cuándo cae la primera; paso = s entre fichas. falta: la VIII casi vacía (la fila se detiene).
// llega 0..1: la VIII entra a su hueco desde arriba (cierre).
function FilaDomino({ T, t0, paso = 0.42, y = 1150, falta = false, llega = 1, x0 = 100, dx = 150, subs = false, vaciaNivel = 0.85 }) {
  const fallen = (i) => kprog(T, t0 + i * paso, t0 + i * paso + 0.35, kEase.sale);
  const tope = falta && llega < 1 ? 3 : 99;
  return <g>
    <line x1={x0 - 30} y1={y + 4} x2={x0 + dx * 5 + 140} y2={y + 4} stroke="rgba(255,255,255,.25)" strokeWidth={6} />
    {FILA.map(([lab, k], i) => {
      const esVIII = i === 3, vacia = falta && esVIII && llega < 1;
      let c = i < tope ? fallen(i) : 0;
      if (i < tope && i === tope - 1) c = Math.min(c, 0.25);   // la IX se recarga en el hueco y ahí se queda
      const yy = esVIII && falta && llega > 0 && llega < 1 ? y - (1 - llega) * 500 : y;
      return <g key={lab}>
        {esVIII && falta && llega > 0 && llega < 1 && <Ficha x={x0 + dx * i} y={y} lab="VIII" color={F8.viii} vacia={vaciaNivel} />}
        <Ficha x={x0 + dx * i} y={yy} lab={lab} color={F8[k]} cae={c} vacia={vacia ? vaciaNivel : 0} brillo={c > 0.9 && !vacia ? 1 : 0} sub={subs ? (i === 5 ? 'trombina' : null) : null} />
      </g>; })}
  </g>;
}

// Glóbulo rojo (disco bicóncavo visto de frente) y plaqueta.
function Globulo({ x, y, r = 38, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}><ellipse rx={r} ry={r * 0.92} fill={F8.sangre} stroke={KC.ink} strokeWidth={5} /><ellipse rx={r * 0.48} ry={r * 0.42} fill={F8.sangreO} opacity={0.75} /></g>;
}
function Plaqueta({ x, y, s = 1, rot = 0, activa = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -22 -8 Q -14 -20 0 -16 Q 18 -22 24 -6 Q ${30 + activa * 16} 6 14 16 Q 0 ${24 + activa * 10} -16 16 Q ${-30 - activa * 14} 8 -22 -8 Z`} fill={F8.plaqueta} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-4} cy={0} r={4} fill="#7a4fc9" /><circle cx={8} cy={4} r={3} fill="#7a4fc9" />
  </g>;
}
// Red de fibrina: hilos que crecen (p 0..1) entre puntos fijos.
function RedFibrina({ T, p = 1, semilla = 3, x = 0, y = 0, w = 1080, h = 700, n = 22, brillo = 0 }) {
  const R = krng(semilla);
  const hilos = Array.from({ length: n }, () => [x + R() * w, y + R() * h, x + R() * w, y + R() * h, R()]);
  return <g>{hilos.map(([a, b, c, d, r], i) => { const q = kprog(p, r * 0.5, r * 0.5 + 0.5);
    return q > 0 && <g key={i}>
      {brillo > 0 && <line x1={a} y1={b} x2={klerp(a, c, q)} y2={klerp(b, d, q)} stroke={F8.fibrina} strokeWidth={22} opacity={0.3 * brillo} strokeLinecap="round" />}
      <line x1={a} y1={b} x2={klerp(a, c, q)} y2={klerp(b, d, q)} stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />
      <line x1={a} y1={b} x2={klerp(a, c, q)} y2={klerp(b, d, q)} stroke={F8.fibrina} strokeWidth={7} strokeLinecap="round" strokeDasharray="26 6" />
    </g>; })}</g>;
}
// Fibrinógeno: bastoncito con tres bolitas (esquema).
function Fibrinogeno({ x, y, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <line x1={-34} y1={0} x2={34} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" /><line x1={-34} y1={0} x2={34} y2={0} stroke={F8.fibrina} strokeWidth={4} strokeLinecap="round" />
    {[-34, 0, 34].map((cx) => <circle key={cx} cx={cx} cy={0} r={cx ? 11 : 8} fill={F8.fibrina} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

// Cromosoma (X o Y) esquemático con banda marcada (Xq28).
function Cromosoma({ x, y, tipo = 'X', marca = 0, s = 1, color = '#7fb8ff', sana = false }) {
  if (tipo === 'Y') return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 -110 Q -14 -6 0 0 Q 14 -6 46 -110" stroke={KC.ink} strokeWidth={50} fill="none" strokeLinecap="round" />
    <path d="M -46 -110 Q -14 -6 0 0 Q 14 -6 46 -110" stroke="#9ad9a8" strokeWidth={36} fill="none" strokeLinecap="round" />
    <path d="M 0 0 L 0 70" stroke={KC.ink} strokeWidth={50} strokeLinecap="round" /><path d="M 0 0 L 0 70" stroke="#9ad9a8" strokeWidth={36} strokeLinecap="round" />
    <circle r={16} fill={KC.ink} />
  </g>;
  const brazo = (d) => <g><path d={d} stroke={KC.ink} strokeWidth={54} fill="none" strokeLinecap="round" /><path d={d} stroke={color} strokeWidth={40} fill="none" strokeLinecap="round" /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brazo('M -60 -150 Q -10 -20 0 0 Q 10 20 70 170')}
    {brazo('M 60 -150 Q 10 -20 0 0 Q -10 20 -70 170')}
    {[[-38, -90], [38, -90], [-34, 80], [34, 80]].map(([bx, by], i) => <line key={i} x1={bx - 18} y1={by + (i < 2 ? -6 : 6) * Math.sign(bx)} x2={bx + 18} y2={by - (i < 2 ? -6 : 6) * Math.sign(bx)} stroke="rgba(22,18,15,.35)" strokeWidth={6} />)}
    {marca > 0 && <g opacity={marca}>
      <circle cx={58} cy={150} r={26 + 6 * Math.sin(marca * 9)} fill="none" stroke={sana ? KC.mint : KC.red} strokeWidth={6} />
      <rect x={44} y={138} width={28} height={22} rx={6} fill={sana ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={4} transform="rotate(-30 58 150)" />
    </g>}
    <circle r={16} fill={KC.ink} />
  </g>;
}

// Persona (icono) para la cuadrícula de 10.
function Persona({ x, y, color = 'rgba(255,255,255,.18)', s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-70} r={34} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -54 40 Q -54 -26 0 -26 Q 54 -26 54 40 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Bolsa de plasma.
function Bolsa({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 -50 Q -44 -62 -30 -62 L 30 -62 Q 44 -62 40 -50 L 44 50 Q 44 64 30 64 L -30 64 Q -44 64 -44 50 Z" fill={F8.plasma} stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={-40} width={60} height={30} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={3} />
    <path d="M 0 -62 L 0 -86" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tanque de mezcla de plasma (vista de frente).
function Tanque({ T, x = 540, y = 950, nivel = 0.5, color = F8.plasma, turbio = 0 }) {
  const top = y - 230, fondo = y + 210, ny = klerp(fondo - 20, top + 60, nivel);
  return <g>
    <path d={`M ${x - 260} ${top} L ${x - 260} ${fondo - 50} Q ${x - 260} ${fondo} ${x - 200} ${fondo} L ${x + 200} ${fondo} Q ${x + 260} ${fondo} ${x + 260} ${fondo - 50} L ${x + 260} ${top}`} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={10} />
    <path d={`M ${x - 254} ${ny + Math.sin(T * 3) * 6} Q ${x} ${ny - 18 + Math.sin(T * 3 + 1) * 8} ${x + 254} ${ny + Math.sin(T * 3 + 2) * 6} L ${x + 254} ${fondo - 50} Q ${x + 254} ${fondo - 6} ${x + 200} ${fondo - 6} L ${x - 200} ${fondo - 6} Q ${x - 254} ${fondo - 6} ${x - 254} ${fondo - 50} Z`} fill={color} opacity={0.9} />
    {turbio > 0 && <rect x={x - 254} y={ny} width={508} height={fondo - ny - 8} fill={F8.grisO} opacity={0.25 * turbio} />}
    <rect x={x - 290} y={top - 24} width={580} height={30} rx={10} fill="#c9d3e0" stroke={KC.ink} strokeWidth={8} />
    {[-180, 180].map((dx) => <rect key={dx} x={x + dx - 18} y={fondo} width={36} height={60} fill="#8b97a8" stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Partícula viral esquemática (no a escala): esfera con espigas.
function Virus({ x, y, r = 34, color, rot = 0, lab, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return <g key={i}><line x1={Math.cos(a) * r} y1={Math.sin(a) * r} x2={Math.cos(a) * (r + 16)} y2={Math.sin(a) * (r + 16)} stroke={KC.ink} strokeWidth={5} />
      <circle cx={Math.cos(a) * (r + 18)} cy={Math.sin(a) * (r + 18)} r={7} fill={color} stroke={KC.ink} strokeWidth={3} /></g>; })}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle r={r * 0.45} fill="rgba(22,18,15,.25)" />
    {lab && <text y={r + 64} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} transform={`rotate(${-rot})`}>{lab}</text>}
  </g>;
}
// Hámster (dibujo de frente, sentado).
function Hamster({ x, y, s = 1, T = 0 }) {
  const bigote = Math.sin(T * 9) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={150} ry={120} fill={F8.hamster} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={70} rx={90} ry={80} fill="#fff4e3" />
    {[-1, 1].map((k) => <g key={k}><circle cx={k * 95} cy={-80} r={40} fill={F8.hamster} stroke={KC.ink} strokeWidth={8} /><circle cx={k * 95} cy={-80} r={20} fill="#f3a7a7" /></g>)}
    <ellipse cx={0} cy={-30} rx={125} ry={95} fill={F8.hamster} stroke={KC.ink} strokeWidth={9} />
    {[-1, 1].map((k) => <g key={k}><ellipse cx={k * 70} cy={0} rx={42} ry={30} fill="#fff4e3" /><circle cx={k * 48} cy={-46} r={12} fill={KC.ink} /><circle cx={k * 48 + 4} cy={-50} r={4} fill="#fff" /></g>)}
    <ellipse cx={0} cy={-12} rx={12} ry={8} fill="#e07a8a" stroke={KC.ink} strokeWidth={3} />
    {[-1, 1].map((k) => [0, 1].map((j) => <line key={k + '' + j} x1={k * 20} y1={-6 + j * 10} x2={k * 92} y2={-16 + j * 22 + bigote} stroke={KC.ink} strokeWidth={3} />))}
    {[-1, 1].map((k) => <ellipse key={k} cx={k * 50} cy={130} rx={30} ry={16} fill="#f3c3a3" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Célula de hámster en cultivo (esquema): membrana ondulada, núcleo, y fichas VIII chiquitas que salen al caldo.
function CelulaCHO({ T, x, y, r = 170, suelta = 0 }) {
  const N = 40, pts = Array.from({ length: N }, (_, i) => { const a = i / N * Math.PI * 2, rr = r * (1 + 0.05 * Math.sin(a * 5 + T * 1.5)); return `${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr * 0.85).toFixed(1)}`; });
  const fichas = Array.from({ length: 7 }, (_, i) => { const ph = ((T * 0.45 + i / 7) % 1), a = -1.1 + i * 0.55; const d = klerp(r * 0.6, r * 2.1, ph);
    return { x: x + Math.cos(a) * d, y: y + Math.sin(a) * d * 0.85, o: suelta * Math.min(1, ph * 4) * (1 - kprog(ph, 0.8, 1)), rot: ph * 90 + i * 30 }; });
  return <g>
    <path d={`M ${pts.join(' L ')} Z`} fill="#ffd2c4" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={x - 20} cy={y + 10} rx={r * 0.38} ry={r * 0.32} fill="#b18cff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={x - 30} cy={y} r={14} fill="#7a4fc9" />
    {[[60, -60], [80, 40], [-90, -70], [20, 80]].map(([dx, dy], i) => <ellipse key={i} cx={x + dx} cy={y + dy} rx={22} ry={9} fill="#ff9e7a" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 40} ${x + dx} ${y + dy})`} />)}
    {fichas.map((f, i) => f.o > 0 && <g key={i} opacity={f.o}><Ficha x={f.x - 18} y={f.y + 36} lab="VIII" color={F8.viii} s={0.34} /></g>)}
  </g>;
}
// Frasco (vial) de factor VIII.
function Frasco({ x, y, s = 1, color = '#fff', etiqueta = '', tapa = KC.blue, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-150} width={140} height={44} rx={10} fill={tapa} stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -106 L -50 -84 Q -90 -70 -90 -30 L -90 120 Q -90 150 -60 150 L 60 150 Q 90 150 90 120 L 90 -30 Q 90 -70 50 -84 L 50 -106 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={0} width={160} height={110} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={52} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    <text x={0} y={90} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>factor VIII</text>
  </g>;
}
// Anticuerpo biespecífico (Y): un brazo rosa (agarra IXa) y uno menta (agarra X).
function Anticuerpo({ x, y, s = 1, rot = 0, abre = 1 }) {
  const brazo = (k, c) => <g transform={`rotate(${k * klerp(18, 38, abre)})`}>
    <rect x={-22} y={-200} width={44} height={170} rx={22} fill={c} stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={-190} width={20} height={150} rx={10} fill="rgba(255,255,255,.35)" />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-26} y={-20} width={52} height={190} rx={24} fill="#e8f0ff" stroke={KC.ink} strokeWidth={7} />
    {brazo(-1, F8.ix)}{brazo(1, F8.x)}
    <circle cx={0} cy={-20} r={16} fill={KC.ink} />
  </g>;
}

function FactorOcho() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Cascada, Fi: CUES.Fibrina, Fa: CUES.Falta, Cr: CUES.Cromosoma, P: CUES.Pregunta, Pl: CUES.Plasma,
    V: CUES.Virus, Ci: CUES.Cifra, Ge: CUES.Gen, H: CUES.Hamster, A: CUES.Aprobado, An: CUES.Anticuerpo, Cie: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const R = krng(11);
  const glob = Array.from({ length: 9 }, () => [R() * 980 + 50, R() * 560 + 600, R() * 360]);
  const plaq = Array.from({ length: 10 }, () => [R() * 980 + 50, R() * 560 + 600, R() * 360]);
  const fibr = Array.from({ length: 14 }, () => [R() * 960 + 60, R() * 600 + 560, R() * 180, R()]);
  const cierreMicro = K.Cie + 2.3;   // del dominó (micro) regresamos al dedo (macro)
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el dedo, la cortada y la curita */}
      <Escena T={T} a={K.G} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <FSvg>
          <Dedo T={T} y={1040} sangra={kprog(T, K.G, K.G + 0.7, kEase.sale)} curita={kprog(T, K.G + 1.0, K.G + 1.4, kEase.sale)} />
        </FSvg>
      </Escena>
      <Lupa T={T} at={K.G + 2.6} until={K.Ca - 0.1} x={320} y={620} r={240} fx={570} fy={948} tinte={KC.cyan} etiqueta="POR DENTRO · TU SANGRE"
        interior={(t) => <svg width={480} height={480}>
          <rect width={480} height={480} fill="#14070c" />
          <rect x={0} y={60} width={500} height={50} fill="#ff8fa3" stroke={KC.ink} strokeWidth={5} />
          <path d="M 200 60 L 230 110 L 270 110 L 300 60" fill="#14070c" />
          {[0, 1, 2, 3, 4].map((i) => <Globulo key={i} x={((i * 120 + t * 90) % 600) - 50} y={250 + (i % 2) * 90} r={34} rot={i * 50} />)}
          {[0, 1, 2].map((i) => <Plaqueta key={i} x={klerp(80 + i * 140, 220 + i * 30, kprog(t, K.G + 2.9 + i * 0.2, K.G + 3.6 + i * 0.2))} y={klerp(380, 130, kprog(t, K.G + 2.9 + i * 0.2, K.G + 3.6 + i * 0.2))} s={1.4} activa={kprog(t, K.G + 3.4, K.G + 3.9)} />)}
        </svg>} />

      {/* 1 · cascada en dominó (micro, fondo oscuro) */}
      <Escena T={T} a={K.Ca} b={K.Fi} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <FSvg>
          {plaq.slice(0, 6).map(([px, py, pr], i) => <Plaqueta key={i} x={px} y={py - 160 + Math.sin(T + i) * 8} rot={pr + T * 10} s={1.1} />)}
          <FilaDomino T={T} t0={K.Ca + 0.9} paso={0.5} y={1180} />
        </FSvg>
        <Etq T={T} at={K.Ca + 0.4} until={K.Fi - 0.2} x={90} y={760} texto="proteínas de la coagulación" tam={34} color={KC.texto} />
        <Etq T={T} at={K.Ca + 0.6} until={K.Fi - 0.2} x={90} y={815} texto="(los factores, en números romanos)" tam={26} color="rgba(246,243,236,.75)" />
        <Etq T={T} at={K.Ca + 3.2} until={K.Fi - 0.2} x={1010} y={845} lado="izq" texto="II = trombina" tam={30} color={F8.ii} />
      </Escena>

      {/* 2 · la trombina arma la red de fibrina */}
      <Escena T={T} a={K.Fi} b={K.Fa} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <FSvg>
          {fibr.map(([fx, fy, fr, fd], i) => <Fibrinogeno key={i} x={fx + Math.sin(T * 1.2 + i) * 10} y={fy} rot={fr + T * 20 * (fd - 0.5)} o={1 - kprog(T, K.Fi + 0.8 + fd * 0.6, K.Fi + 1.4 + fd * 0.6)} />)}
          <RedFibrina T={T} p={kprog(T, K.Fi + 0.9, K.Fi + 3.2, kEase.suave)} x={40} y={560} w={1000} h={640} n={32} />
          {glob.map(([gx, gy, gr], i) => { const atrapa = kprog(T, K.Fi + 1.6, K.Fi + 3.0, kEase.sale);
            return <Globulo key={i} x={gx + (1 - atrapa) * ((T * 160 + i * 140) % 300 - 150)} y={gy} r={38} rot={gr} />; })}
          {plaq.map(([px, py, pr], i) => <Plaqueta key={i} x={px} y={py} rot={pr} s={1.1} activa={1} />)}
          <g transform={`translate(${klerp(1180, 860, kprog(T, K.Fi, K.Fi + 0.7, kEase.sale))} 470)`}>
            <Ficha x={0} y={100} lab="II" color={F8.ii} s={0.7} brillo={0.6 + 0.4 * Math.sin(T * 6)} />
          </g>
        </FSvg>
        <Etq T={T} at={K.Fi + 0.3} until={K.Fa - 0.2} x={830} y={420} lado="izq" texto="trombina" tam={34} color={KC.texto} />
        <Etq T={T} at={K.Fi + 1.4} until={K.Fa - 0.2} x={60} y={500} texto="hilos de fibrina" tam={34} color={F8.fibrina} />
        <Escala T={T} z={1} pxPorMm={10000} objetivo={120} y={1440} />
      </Escena>

      {/* 3 · hemofilia A: la VIII casi vacía, la fila se detiene */}
      <Escena T={T} a={K.Fa} b={K.Cr} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <FSvg>
          <FilaDomino T={T} t0={K.Fa + 0.3} paso={0.4} y={1150} falta llega={0} />
          {T > K.Fa + 1.5 && <text x={555} y={790} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Fa + 1.5, K.Fa + 1.8)} transform={`rotate(${Math.sin(T * 5) * 4} 555 760)`}>!</text>}
        </FSvg>
      </Escena>

      {/* 4 · el gen está en el cromosoma X */}
      <Escena T={T} a={K.Cr} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <FSvg>
          <g transform="translate(290 870)">
            <rect x={-230} y={-300} width={460} height={560} rx={36} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={8} />
            <Cromosoma x={-80} y={-20} tipo="X" marca={kprog(T, K.Cr + 0.8, K.Cr + 1.3)} s={0.9} />
            <Cromosoma x={110} y={20} tipo="Y" s={0.9} />
            <text x={0} y={-230} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.texto}>XY</text>
            <text x={0} y={220} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Cr + 1.6, K.Cr + 2.0)}>una sola X</text>
          </g>
          <g transform="translate(790 870)">
            <rect x={-230} y={-300} width={460} height={560} rx={36} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={8} />
            <Cromosoma x={-90} y={0} tipo="X" marca={kprog(T, K.Cr + 0.8, K.Cr + 1.3)} s={0.9} />
            <Cromosoma x={90} y={0} tipo="X" marca={kprog(T, K.Cr + 2.0, K.Cr + 2.5)} sana s={0.9} color="#ffb3c1" />
            <text x={0} y={-230} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.texto}>XX</text>
            <text x={0} y={220} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Cr + 2.2, K.Cr + 2.6)}>la otra X ayuda</text>
          </g>
        </FSvg>
        <Chip T={T} at={K.Cr + 0.9} until={K.P - 0.2} texto="gen F8 · cromosoma X (Xq28)" y={480} tam={36} borde={KC.red} />
      </Escena>

      {/* 5 · pregunta: ¿de dónde lo sacas? */}
      <Escena T={T} a={K.P} b={K.Pl} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        <FSvg>
          <Ficha x={200} y={1150} lab="VIII" color={F8.viii} vacia={0.85} s={1.5} />
          <text x={280} y={740} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 7} 280 640)`}>?</text>
        </FSvg>
      </Escena>

      {/* 6 · plasma de miles de donantes en un solo lote */}
      <Escena T={T} a={K.Pl} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <FSvg>
          <Tanque T={T} x={540} y={1000} nivel={0.2 + 0.55 * kprog(T, K.Pl + 0.2, K.V)} />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.Pl + 0.1 + i * 0.22, p = kprog(T, t0, t0 + 0.7, (q) => q * q);
            return p > 0 && p < 1 && <Bolsa key={i} x={300 + (i * 97) % 480} y={klerp(600, 900, p)} rot={(i % 2 ? 1 : -1) * (20 + p * 60)} s={0.9} />; })}
        </FSvg>
        <Chip T={T} at={K.Pl + 0.6} until={K.V - 0.1} texto="donantes por lote: de 1,000 a más de 20,000" y={480} tam={32} borde={KC.ink} />
      </Escena>

      {/* 7 · en los ochenta, el plasma traía VIH y hepatitis C (tono serio) */}
      <Escena T={T} a={K.V} b={K.Ci} zoom={0.03}>
        <FondoLunares color={F8.gris} punto="rgba(255,255,255,.12)" />
        <FSvg>
          <Tanque T={T} x={540} y={1000} nivel={0.75} turbio={kprog(T, K.V + 0.4, K.V + 1.6)} />
          {[[380, 940, F8.virus1, 'VIH'], [700, 1020, F8.virus2, 'VHC'], [560, 1110, F8.virus1, null], [430, 1120, F8.virus2, null], [690, 880, F8.virus1, null]].map(([vx, vy, c, lab], i) =>
            <Virus key={i} x={vx + Math.sin(T * 1.5 + i) * 12} y={vy + Math.cos(T * 1.2 + i) * 10} r={lab ? 34 : 24} color={c} rot={T * 15 + i * 40} lab={lab} o={kprog(T, K.V + 0.5 + i * 0.25, K.V + 0.9 + i * 0.25)} />)}
        </FSvg>
        <Chip T={T} at={K.V + 0.3} until={K.Ci - 0.1} texto="años 80 · concentrados de plasma" y={1500} tam={34} borde={KC.texto} />
        <Chip T={T} at={K.V + 1.2} until={K.Ci - 0.1} texto="virus: esquema, no a escala" x={330} y={1860} tam={22} mono borde="rgba(255,255,255,.4)" />
      </Escena>

      {/* 8 · 1987: 7 de cada 10 personas con hemofilia A analizadas en EE. UU. tenían VIH */}
      <Escena T={T} a={K.Ci} b={K.Ge} zoom={0.03}>
        <FondoLunares color={F8.grisO} punto="rgba(255,255,255,.08)" />
        <FSvg>
          {Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.Ci + 1.4 + i * 0.18, K.Ci + 1.7 + i * 0.18);
            return <Persona key={i} x={160 + (i % 5) * 190} y={560 + Math.floor(i / 5) * 250} s={1} color={i < 7 && on > 0 ? `rgba(215,38,61,${0.35 + 0.6 * on})` : 'rgba(255,255,255,.22)'} o={kprog(T, K.Ci + 0.2 + i * 0.06, K.Ci + 0.5 + i * 0.06)} />; })}
        </FSvg>
        <NumeroGigante T={T} at={K.Ci + 2.6} until={K.Ge - 0.15} valor={7} dur={0.5} sufijo=" de 10" y={1040} tam={200} color={KC.texto} />
        <Chip T={T} at={K.Ci + 0.4} until={K.Ge - 0.15} texto="EE. UU. · 1987 · analizadas en centros de hemofilia" y={1500} tam={28} borde={KC.texto} />
      </Escena>

      {/* 9 · 1984, Nature: el gen del factor VIII, 186 mil letras */}
      <Escena T={T} a={K.Ge} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <FSvg>
          {T > K.Ge + 2.0 && <g opacity={kprog(T, K.Ge + 2.0, K.Ge + 2.4)}>
            <rect x={40} y={980} width={1000} height={170} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            <svg x={46} y={986} width={988} height={158} overflow="hidden"><g transform={`translate(${-((T - K.Ge) * 260) % 400} 0)`}><ADNHebra T={T} x={0} y={110} largo={1500} alto={60} vueltas={9} vel={1} /></g></svg>
          </g>}
        </FSvg>
        <TarjetaEstudio T={T} at={K.Ge + 0.2} until={K.Ge + 2.0} anio="1984" quien="Genentech · Genetics Institute" revista="Nature · noviembre de 1984" y={650} />
        {T > K.Ge + 2.0 && <Contador T={T} at={K.Ge + 2.1} desde={0} hasta={186000} dur={2.2} sufijo=" letras" x={540} y={1035} tam={60} color={KC.yellow} />}
      </Escena>

      {/* 10 · células de hámster que lo fabrican y lo sueltan al caldo */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <FSvg>
          <g opacity={1 - kprog(T, K.H + 1.6, K.H + 2.2)}><Hamster x={540} y={900} s={klerp(1.4, 2.4, kprog(T, K.H, K.H + 2.2, kEase.suave))} T={T} /></g>
          {T > K.H + 1.6 && <g opacity={kprog(T, K.H + 1.6, K.H + 2.2)}>
            <rect x={60} y={560} width={960} height={680} rx={60} fill="#2a1a10" stroke={KC.ink} strokeWidth={10} />
            <rect x={60} y={560} width={960} height={680} rx={60} fill="rgba(255,214,92,.12)" />
            <CelulaCHO T={T} x={420} y={900} r={170} suelta={kprog(T, K.H + 2.4, K.H + 3.0)} />
          </g>}
        </FSvg>
        <Etq T={T} at={K.H + 0.3} until={K.H + 1.8} x={90} y={520} texto="hámster" tam={40} color={KC.ink} />
        <Etq T={T} at={K.H + 2.0} until={K.A - 0.2} x={90} y={520} texto="células de hámster, en cultivo" tam={36} color={KC.ink} />
        <Etq T={T} at={K.H + 2.7} until={K.A - 0.2} x={1000} y={1190} lado="izq" texto="factor VIII al caldo" tam={30} color={F8.viii} />
      </Escena>

      {/* 11 · 1992: primer factor VIII hecho por células (Recombinate) */}
      <Escena T={T} a={K.A} b={K.An} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <FSvg>
          <Frasco x={680} y={1020} s={1.15} color="#f1e6c8" etiqueta="PLASMA" tapa="#8b97a8" o={0.55} />
          <g transform={`translate(${klerp(1200, 900, kprog(T, K.A + 0.2, K.A + 0.8, kEase.sale))} 0)`}><Frasco x={0} y={1000} s={1.3} color="#ffffff" etiqueta="CÉLULAS" tapa={KC.blue} /></g>
          {(() => { const p = kprog(T, K.A + 1.3, K.A + 1.6, kEase.rebote); return p > 0 && <g transform={`translate(800 620) rotate(-10) scale(${klerp(1.8, 1, p)})`} opacity={Math.min(1, p * 2)}>
            <rect x={-230} y={-90} width={460} height={180} rx={24} fill="none" stroke={KC.red} strokeWidth={12} />
            <text x={0} y={-10} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.red}>FDA · 1992</text>
            <text x={0} y={56} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>diciembre</text>
          </g>; })()}
        </FSvg>
        <Chip T={T} at={K.A + 2.0} until={K.An - 0.15} texto="Recombinate · primer factor VIII recombinante" y={1500} tam={32} borde={KC.blue} />
      </Escena>

      {/* 12 · hoy: un anticuerpo junta IXa y X (emicizumab) */}
      <Escena T={T} a={K.An} b={K.Cie} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <FSvg>
          {(() => { const junta = kprog(T, K.An + 1.6, K.An + 2.4, kEase.suave), entra = kprog(T, K.An + 0.4, K.An + 1.4, kEase.sale);
            return <g>
              <g transform={`translate(${klerp(250, 360, junta)} 0)`}><Ficha x={0} y={1150} lab="IXa" color={F8.ix} brillo={junta} /></g>
              <g transform={`translate(${klerp(720, 560, junta)} 0)`}><Ficha x={0} y={1150} lab="X" color={F8.x} cae={kprog(T, K.An + 2.6, K.An + 3.0, kEase.sale)} brillo={kprog(T, K.An + 2.6, K.An + 3.0)} /></g>
              <Anticuerpo x={klerp(540, 512, junta)} y={klerp(340, 715, entra)} s={1.3} abre={1 - junta} rot={180} />
              {T > K.An + 2.9 && <g opacity={kprog(T, K.An + 2.9, K.An + 3.3)}><Ficha x={760} y={1150} lab="II" color={F8.ii} brillo={0.6 + 0.4 * Math.sin(T * 6)} /></g>}
            </g>; })()}
        </FSvg>
        <Etq T={T} at={K.An + 0.8} until={K.Cie - 0.2} x={140} y={470} texto="anticuerpo" tam={36} color={KC.texto} />
        <Chip T={T} at={K.An + 1.4} until={K.Cie - 0.15} texto="emicizumab · se inyecta bajo la piel" y={1500} tam={32} borde={F8.ix} />
      </Escena>

      {/* 13 · cierre: la VIII entra a su hueco, la red brilla y regresamos al dedo ya cerrado */}
      <Escena T={T} a={K.Cie} b={cierreMicro} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <FSvg>
          <FilaDomino T={T} t0={K.Cie + 0.9} paso={0.18} y={1150} falta llega={kprog(T, K.Cie + 0.1, K.Cie + 0.8, kEase.sale) < 1 ? kprog(T, K.Cie + 0.1, K.Cie + 0.8, kEase.sale) : 1} />
          {T > K.Cie + 1.5 && <RedFibrina T={T} p={kprog(T, K.Cie + 1.5, K.Cie + 2.3)} x={40} y={420} w={1000} h={420} n={14} semilla={8} brillo={1} />}
        </FSvg>
      </Escena>
      <Escena T={T} a={cierreMicro} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <FSvg>
          <Dedo T={T} y={1040} sangra={0} curita={1} quita={kprog(T, cierreMicro + 0.4, cierreMicro + 1.2, kEase.suave)} cerrada={1} />
        </FSvg>
      </Escena>

      {/* textos fijos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.0} until={K.G + 2.6} texto="¿la curita?" x={330} y={620} tam={48} />
      <Chip T={T} at={K.Fa + 1.2} until={K.Cr - 0.15} texto="hemofilia A = falta o hay poco factor VIII" y={1500} tam={30} borde={F8.viii} />
      <Chip T={T} at={K.Ca + 0.2} until={K.O} texto="dibujo esquemático" x={870} y={1860} tam={20} mono borde="rgba(255,255,255,.4)" />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="La cierra *una red de tu sangre.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.Fi - 0.1} texto="Proteínas que caen *como dominó.*" />
      <Subtitulo T={T} idx={2} at={K.Fi + 0.1} until={K.Fa - 0.1} texto="Trombina: *hilos de fibrina.*" />
      <Subtitulo T={T} idx={3} at={K.Fa + 0.1} until={K.Cr - 0.1} texto="Hemofilia A: *falla el factor VIII.*" />
      <Subtitulo T={T} idx={4} at={K.Cr + 0.1} until={K.P - 0.1} texto="Su gen: *el cromosoma X.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Pl - 0.1} texto="¿De dónde *lo sacas?*" />
      <Subtitulo T={T} idx={6} at={K.Pl + 0.1} until={K.V - 0.1} texto="Plasma de *miles de donantes.*" />
      <Subtitulo T={T} idx={7} at={K.V + 0.1} until={K.Ci - 0.1} texto="Traía *VIH y hepatitis C.*" />
      <Subtitulo T={T} idx={8} at={K.Ci + 0.1} until={K.Ge - 0.1} texto="1987: *7 de cada 10* analizadas." />
      <Subtitulo T={T} idx={9} at={K.Ge + 0.1} until={K.H - 0.1} texto="1984: *su gen, 186 mil letras.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.A - 0.1} texto="Lo fabrican *células de hámster.*" />
      <Subtitulo T={T} idx={11} at={K.A + 0.1} until={K.An - 0.1} texto="1992: *hecho por células.*" />
      <Subtitulo T={T} idx={12} at={K.An + 0.1} until={K.Cie - 0.1} texto="Un anticuerpo *lo imita.*" />
      <Subtitulo T={T} idx={13} at={K.Cie + 0.1} until={K.O - 0.1} texto="Si falta una pieza, *una célula la presta.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [K.Ca + 1.0, K.Fi - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Fa + 0.4, K.Cr - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Pl - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [K.V + 0.4, K.Ci - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ge + 2.2, K.H - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A + 0.2, K.An - 0.3, 'avatar_02_apuntando_camara', 'grande-izq'],
        [K.An + 1.6, K.Cie - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [cierreMicro + 0.1, K.O - 0.1, 'avatar_04_bajando_lentes', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="55" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FactorOchoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FactorOcho /></CompositionStage></div>;
}
window.FactorOchoApp = FactorOchoApp;
