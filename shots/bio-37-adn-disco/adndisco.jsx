// Shot Biotecnológico #37 · Tu disco duro, en un gramo de ADN — NARRADO (N2 "El número" + tramo N4 "La imagen que se llena").
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (letras y bits de ejemplo, no un archivo real).
const LC = { A: '#2fe0a8', C: '#00d2ff', G: '#ffe11a', T: '#ff2d78' };
const LETRAS = ['A', 'C', 'G', 'T'];
const PAR = { A: '00', C: '01', G: '10', T: '11' };

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// secuencia fija de letras de ejemplo
function seqDe(n, seed) { const R = krng(seed); return Array.from({ length: n }, () => LETRAS[Math.floor(R() * 4)]); }

// Ficha de una letra (base) con su color.
function Base({ x, y, l, r = 20, o = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill={LC[l]} stroke={KC.ink} strokeWidth={4} />
    <text y={r * 0.38} textAnchor="middle" style={{ font:`700 ${r * 1.05}px ${KF.mono}` }} fill={KC.ink}>{l}</text>
  </g>;
}
// Hebra sencilla (ADN sintético de una sola cadena): esqueleto + bases. n = cuántas bases ya están.
function Hebra({ x, y, seq, n = seq.length, paso = 44, r = 19, T = 0, seed = 1, onda = 6 }) {
  const k = Math.max(0, Math.min(seq.length, Math.floor(n)));
  if (k <= 0) return null;
  const yy = (i) => y + Math.sin(T * 2 + i * 0.7 + seed) * onda;
  const d = Array.from({ length: k }, (_, i) => `${i ? 'L' : 'M'} ${x + i * paso} ${yy(i)}`).join(' ');
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#e8f0ff" strokeWidth={6} fill="none" strokeLinecap="round" />
    {seq.slice(0, k).map((l, i) => <Base key={i} x={x + i * paso} y={yy(i)} l={l} r={r} s={i === k - 1 ? klerp(1.4, 1, n - Math.floor(n)) : 1} />)}
  </g>;
}
// Foto de ejemplo (cielo, sol, montañas) que se dibuja dentro de un rectángulo.
function Foto({ x, y, w, h, T = 0 }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} fill="#7fd8ff" />
    <circle cx={x + w * 0.72} cy={y + h * 0.28} r={w * 0.13} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
    <path d={`M ${x} ${y + h * 0.78} L ${x + w * 0.3} ${y + h * 0.45} L ${x + w * 0.5} ${y + h * 0.65} L ${x + w * 0.72} ${y + h * 0.4} L ${x + w} ${y + h * 0.7} L ${x + w} ${y + h} L ${x} ${y + h} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} />
    <path d={`M ${x + w * 0.24} ${y + h * 0.52} L ${x + w * 0.3} ${y + h * 0.45} L ${x + w * 0.36} ${y + h * 0.52} Z`} fill="#fff" />
    <ellipse cx={x + w * 0.25 + Math.sin(T * 0.8) * 8} cy={y + h * 0.16} rx={w * 0.12} ry={h * 0.035} fill="#fff" opacity=".9" />
  </g>;
}
// Celular. foto: 0..1 (cuánto de la foto se ve, de arriba abajo). bits: 0..1 (la foto se vuelve ceros y unos).
function Celular({ x, y, s = 1, T = 0, foto = 1, bits = 0, seed = 3, color = '#2b2f3a' }) {
  const W = 300, H = 560, sw = 260, sh = 470, sx = -sw / 2, sy = -sh / 2 + 6;
  const R = krng(seed), cols = 8, filas = 13;
  const id = `cel${Math.round(x)}_${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={44} fill={color} stroke={KC.ink} strokeWidth={9} />
    <clipPath id={id}><rect x={sx} y={sy} width={sw} height={sh} rx={22} /></clipPath>
    <g clipPath={`url(#${id})`}>
      <rect x={sx} y={sy} width={sw} height={sh} fill="#0d1424" />
      {foto > 0 && <g clipPath={`url(#${id})`}><g opacity={1 - bits * 0.85}><rect x={sx} y={sy} width={sw} height={sh * foto} fill="none" />
        <svg x={sx} y={sy} width={sw} height={sh * foto} overflow="hidden"><Foto x={0} y={0} w={sw} h={sh} T={T} /></svg></g></g>}
      {bits > 0 && Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), on = R() < bits * 1.15;
        return on ? <text key={i} x={sx + 18 + c * 32} y={sy + 34 + f * 35} style={{ font:`700 28px ${KF.mono}` }} fill={(c + f) % 3 ? '#9fffd8' : '#fff'}>{(Math.floor(R() * 2 + T * 0.0001))}</text> : null; })}
    </g>
    <rect x={-40} y={-H / 2 + 14} width={80} height={14} rx={7} fill={KC.ink} />
  </g>;
}
function MiniCel({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-23} y={-42} width={46} height={84} rx={9} fill="#2b2f3a" stroke={KC.ink} strokeWidth={4} />
    <rect x={-17} y={-34} width={34} height={64} rx={4} fill="#7fd8ff" />
    <path d="M -17 22 L -6 6 L 2 14 L 10 4 L 17 14 L 17 30 L -17 30 Z" fill={KC.leaf} />
  </g>;
}
// Tubito de laboratorio (tipo Eppendorf) con tapa. liquido 0..1, polvo 0..1, brillo 0..1. Punta en y = 180·s.
function Tubo({ x, y, s = 1, liquido = 0, polvo = 0, brillo = 0, T = 0, hebritas = 0, rot = 0 }) {
  const id = `tb${Math.round(x)}_${Math.round(y)}_${Math.round(s * 100)}`;
  const cuerpo = 'M -50 -160 L 50 -160 L 50 50 L 8 176 Q 0 186 -8 176 L -50 50 Z';
  const nivel = klerp(176, -150, liquido);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle cx={0} cy={60} r={150} fill={KC.gold2} opacity={0.35 * brillo} />}
    <clipPath id={id}><path d={cuerpo} /></clipPath>
    <path d={cuerpo} fill="rgba(255,255,255,.55)" />
    <g clipPath={`url(#${id})`}>
      {liquido > 0 && <rect x={-60} y={nivel + Math.sin(T * 3) * 2} width={120} height={200} fill="#bfe8ff" opacity=".9" />}
      {hebritas > 0 && Array.from({ length: 7 }, (_, i) => { const yy = klerp(150, -120, ((i * 0.37 + T * 0.05) % 1)); return yy > nivel + 6 ? <path key={i} d={`M ${-30 + (i % 3) * 14} ${yy} q 10 -8 20 0 t 20 0`} stroke={[KC.pink, KC.cyan, KC.mint, KC.yellow][i % 4]} strokeWidth={5} fill="none" opacity={hebritas} /> : null; })}
      {polvo > 0 && <path d={`M -40 ${178 - 70 * polvo} Q 0 ${150 - 80 * polvo} 40 ${178 - 70 * polvo} L 8 182 L -8 182 Z`} fill="#fbfbf6" stroke="#c9c2b0" strokeWidth={3} />}
      {brillo > 0 && <g transform="translate(0 120) scale(.32)"><rect x={-80} y={-60} width={160} height={120} fill="none" /><svg x={-80} y={-60} width={160} height={120}><Foto x={0} y={0} w={160} h={120} T={T} /></svg></g>}
    </g>
    <path d={cuerpo} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -34 -140 L -34 30" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
    <rect x={-62} y={-196} width={124} height={40} rx={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <path d="M 62 -180 q 40 0 40 30 q 0 22 -30 22" fill="none" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Balanza({ x, y, lectura = '', on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -190 0 L 190 0 L 210 130 L -210 130 Z" fill="#dfe3ea" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-150} y={-24} width={300} height={24} rx={8} fill="#b9c0cc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={36} width={220} height={70} rx={10} fill={on ? '#0f2a1f' : '#2b2f3a'} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={88} textAnchor="middle" style={{ font:`700 50px ${KF.mono}` }} fill={on ? '#5dffb0' : '#556'}>{lectura}</text>
  </g>;
}
// Disco duro (vista de arriba): plato que gira y brazo lector.
function DiscoDuro({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-160} y={-210} width={320} height={420} rx={22} fill="#9aa3b5" stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-40} r={130} fill="#d9dee8" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((i) => <path key={i} d={`M 0 -40 m ${Math.cos(T * 6 + i * 2.1) * 120} ${Math.sin(T * 6 + i * 2.1) * 120} A 120 120 0 0 1 ${Math.cos(T * 6 + i * 2.1 + 0.6) * 120} ${-40 + Math.sin(T * 6 + i * 2.1 + 0.6) * 120}`} stroke="#fff" strokeWidth={6} fill="none" opacity=".8" />)}
    <circle cx={0} cy={-40} r={26} fill="#6b7385" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${-20 + Math.sin(T * 3) * 10} 110 150)`}><path d="M 110 150 L 20 -30" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" /><path d="M 110 150 L 20 -30" stroke="#c9ced8" strokeWidth={8} strokeLinecap="round" /></g>
    <circle cx={110} cy={150} r={22} fill="#6b7385" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Muela de mamut vista desde arriba (superficie de masticar): óvalo con muchas láminas de esmalte paralelas.
function MuelaMamut({ x, y, s = 1 }) {
  const id = 'muela' + Math.round(x);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <clipPath id={id}><path d="M -230 -40 Q -235 -110 -150 -115 L 170 -95 Q 240 -85 235 -10 L 225 60 Q 215 115 150 112 L -160 100 Q -232 92 -232 30 Z" /></clipPath>
    <path d="M -230 -40 Q -235 -110 -150 -115 L 170 -95 Q 240 -85 235 -10 L 225 60 Q 215 115 150 112 L -160 100 Q -232 92 -232 30 Z" fill="#8a6a43" />
    <g clipPath={`url(#${id})`}>{Array.from({ length: 16 }, (_, i) => { const xx = -230 + i * 30;
      return <g key={i}><path d={`M ${xx} -120 Q ${xx + 22} 0 ${xx + 6} 120`} stroke={KC.ink} strokeWidth={15} fill="none" /><path d={`M ${xx} -120 Q ${xx + 22} 0 ${xx + 6} 120`} stroke="#f3e6c8" strokeWidth={8} fill="none" /></g>; })}</g>
    <path d="M -230 -40 Q -235 -110 -150 -115 L 170 -95 Q 240 -85 235 -10 L 225 60 Q 215 115 150 112 L -160 100 Q -232 92 -232 30 Z" fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Caballo galopando en silueta negra (5 posturas esquemáticas, al estilo de las fotos de Muybridge).
function Caballo({ x, y, s = 1, f = 0 }) {
  const P = [[30, -20, 25, -30], [55, 10, -10, 40], [10, 40, -40, 20], [-30, 10, -20, -10], [-10, -40, 40, -30]][f % 5];
  const pata = (bx, ang, i) => { const a = ang * Math.PI / 180; return <path key={i} d={`M ${bx} 18 L ${bx + Math.sin(a) * 42} ${18 + Math.cos(a) * 42} L ${bx + Math.sin(a) * 42 + Math.sin(a * 0.4) * 30} ${18 + Math.cos(a) * 42 + 30}`} stroke="#111" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={70} ry={28} fill="#111" />
    <path d="M 50 -10 L 82 -52 L 104 -46 L 96 -30 L 70 6 Z" fill="#111" />
    <path d="M -66 -8 Q -96 0 -100 30" stroke="#111" strokeWidth={10} fill="none" strokeLinecap="round" />
    {[pata(-48, P[0], 0), pata(-34, P[1], 1), pata(40, P[2], 2), pata(54, P[3], 3)]}
  </g>;
}
// Locomotora esquemática (la película de 1895 es la llegada de un tren).
function Tren({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-22} width={70} height={36} rx={6} fill="#222" /><rect x={14} y={-40} width={34} height={54} rx={4} fill="#222" />
    <rect x={-40} y={-44} width={14} height={24} fill="#222" />
    <circle cx={-34} cy={20} r={10} fill="#222" /><circle cx={-4} cy={20} r={10} fill="#222" /><circle cx={30} cy={20} r={10} fill="#222" />
    <circle cx={-30} cy={-56} r={9} fill="#888" opacity=".7" /><circle cx={-18} cy={-70} r={12} fill="#999" opacity=".5" />
  </g>;
}
// Reloj de pared con manecillas que corren.
function Reloj({ x, y, r = 170, horas = 0 }) {
  const am = (horas % 1) * 360, ah = (horas / 12) * 360;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={12} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 18} x2={0} y2={-r + 42} stroke={KC.ink} strokeWidth={8} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" transform={`rotate(${ah})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={KC.red} strokeWidth={9} strokeLinecap="round" transform={`rotate(${am})`} />
    <circle r={14} fill={KC.ink} />
  </g>;
}
// Barra de escala fija para las hebras (no hay zoom de cámara en estas escenas).
function EscalaHebra({ T, at, until, y = 1430 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:60, top:y, zIndex:40, opacity:e.o, color:KC.texto, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
    <div style={{ width:300, height:8, background:KC.texto, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)', marginBottom:8 }}></div>
    <div>una hebra de 200 letras: &lt; 0.1 µm</div>
    <div style={{ fontSize:22, opacity:.85 }}>(≈ 70 nm en doble hélice · dibujo no a escala)</div>
  </div>;
}

function AdnDisco() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bi: CUES.Bits, Le: CUES.Letras, Si: CUES.Sintesis, Se: CUES.Seco, Lc: CUES.Lectura, Pr: CUES.Pregunta, Ma: CUES.Mamut,
    So: CUES.Sonetos, Fo: CUES.Fountain, Ca: CUES.Caballo, Pb: CUES.Problema, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // gancho y cierre: el tubito cae en la balanza; los celulares se apilan
  const cae = kprog(T, K.G, K.G + 0.55, kEase.rebote);
  const pesa = T >= K.G + 0.45;
  const pila = (t0) => Array.from({ length: 18 }, (_, i) => { const c = i % 6, f = Math.floor(i / 6), at = t0 + 0.2 + i * 0.16;
    const p = kprog(T, at, at + 0.3, kEase.rebote); return p > 0 ? <MiniCel key={i} x={715 + c * 56} y={900 + f * 104} s={p} /> : null; });
  const escenaBalanza = (t0, final) => <SvgCapa>
    <Balanza x={300} y={1060} lectura={pesa || final ? '1 g' : '0 g'} on={pesa || final ? 1 : 0} />
    <Tubo x={300} y={final ? 868 : klerp(-300, 868, cae)} s={0.9} polvo={1} brillo={final ? kprog(T, t0 + 0.8, t0 + 1.6) : 0} T={T} />
    {pila(final ? t0 - 3 : t0)}
  </SvgCapa>;

  // bits y letras
  const seqG = seqDe(36, 11);
  const Rb = krng(4);
  const letrasCelda = seqG.map((l, i) => ({ l, at: K.Le + 0.5 + i * 0.1 + (i % 6) * 0.02 }));

  // síntesis: 5 hebras crecen en paralelo, una letra por ciclo
  const filasS = [0, 1, 2, 3, 4].map((i) => seqDe(18, 30 + i));
  const ciclo = kclamp((T - K.Si - 0.2) / 0.17, 0, 18);
  const boquilla = 150 + Math.min(17, Math.floor(ciclo)) * 44;

  // secado
  const seca = kprog(T, K.Se + 0.2, K.Se + 2.0, kEase.suave);

  // lectura
  const seqL = seqDe(60, 77);

  // problema: HELLO letra por letra
  const hello = 'HELLO'.split('');

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: 1 g de ADN contra una pila de celulares */}
      <Escena T={T} a={K.G} b={K.Bi} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {escenaBalanza(K.G, false)}
      </Escena>

      {/* 1 · ceros y unos; las cuatro letras */}
      <Escena T={T} a={K.Bi} b={K.Le} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Celular x={300} y={880} s={0.85} T={T} foto={1} bits={kprog(T, K.Bi + 0.6, K.Bi + 2.0)} />
          {LETRAS.map((l, i) => { const at = K.Bi + 2.3 + i * 0.35, p = kprog(T, at, at + 0.35, kEase.rebote);
            return p > 0 ? <g key={l}><rect x={640} y={640 + i * 130} width={320} height={110} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={7} transform={`translate(${800 * (1 - p)} 0)`} />
              <Base x={700 + 800 * (1 - p)} y={695 + i * 130} l={l} r={40} />
              <text x={850 + 800 * (1 - p)} y={710 + i * 130} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{l === 'A' ? 'adenina' : l === 'C' ? 'citosina' : l === 'G' ? 'guanina' : 'timina'}</text></g> : null; })}
        </SvgCapa>
      </Escena>

      {/* 2 · cada par de bits se vuelve una letra (la imagen que se llena) */}
      <Escena T={T} a={K.Le} b={K.Si} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={90} y={650} width={900} height={540} rx={30} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={8} />
          {letrasCelda.map(({ l, at }, i) => { const c = i % 6, f = Math.floor(i / 6), cx = 165 + c * 150, cy = 700 + f * 86, p = kprog(T, at, at + 0.3, kEase.rebote);
            return <g key={i}>
              {p < 1 && <text x={cx} y={cy + 14} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill="#9fffd8" opacity={1 - p}>{PAR[l]}</text>}
              {p > 0 && <g transform={`translate(${cx} ${cy}) scale(${p})`}><rect x={-60} y={-34} width={120} height={68} rx={14} fill={LC[l]} stroke={KC.ink} strokeWidth={5} />
                <text y={16} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>{l}</text></g>}
            </g>; })}
        </SvgCapa>
        {/* la clave, debajo del subtítulo */}
        <div style={{ position:'absolute', left:0, right:0, top:1450, zIndex:41, display:'flex', justifyContent:'center', gap:18, opacity:kprog(T, K.Le + 0.2, K.Le + 0.6) }}>
          {LETRAS.map((l) => <div key={l} style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(14,15,18,.85)', border:`4px solid ${LC[l]}`, borderRadius:20, padding:'8px 18px', font:`700 36px ${KF.mono}`, color:KC.texto }}>
            {PAR[l]} <span style={{ color:LC[l] }}>→ {l}</span></div>)}
        </div>
      </Escena>

      {/* 3 · una máquina escribe las hebras, letra por letra */}
      <Escena T={T} a={K.Si} b={K.Se} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {LETRAS.map((l, i) => <g key={l}><rect x={250 + i * 160} y={440} width={100} height={90} rx={16} fill={LC[l]} stroke={KC.ink} strokeWidth={7} />
            <text x={300 + i * 160} y={502} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>{l}</text></g>)}
          <rect x={150} y={520} width={780} height={150} rx={26} fill="#dfe3ea" stroke={KC.ink} strokeWidth={9} />
          <text x={540} y={612} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>SINTETIZADOR DE ADN</text>
          <g transform={`translate(${boquilla} 690)`}><rect x={-26} y={-26} width={52} height={60} rx={8} fill="#6b7385" stroke={KC.ink} strokeWidth={6} /><path d="M -12 34 L 12 34 L 0 56 Z" fill={KC.ink} /></g>
          {ciclo > 0 && ciclo < 18 && [0, 1, 2, 3, 4].map((r) => { const u = (ciclo % 1); return <circle key={r} cx={boquilla} cy={klerp(760, 820 + r * 80, u)} r={8} fill={LC[filasS[r][Math.floor(ciclo)]]} stroke={KC.ink} strokeWidth={3} opacity={u < 0.9 ? 1 : 0} />; })}
          {filasS.map((sq, r) => <Hebra key={r} x={150} y={830 + r * 80} seq={sq} n={ciclo} T={T} seed={r} onda={3} r={18} />)}
        </SvgCapa>
        <Chip T={T} at={K.Si + 1.0} until={K.Se - 0.2} texto="en 2017: 72 000 hebras de 200 letras" y={1590} tam={32} borde={KC.mint} />
        <EscalaHebra T={T} at={K.Si + 0.4} until={K.Se - 0.2} y={1400} />
      </Escena>

      {/* 4 · se seca: queda un polvito */}
      <Escena T={T} a={K.Se} b={K.Lc} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Tubo x={600} y={880} s={1.5} liquido={0.75 * (1 - seca)} polvo={seca} hebritas={1 - seca} T={T} />
          {seca > 0 && seca < 1 && [0, 1, 2].map((i) => <path key={i} d={`M ${560 + i * 40} ${560 - ((T * 120 + i * 50) % 160)} q 14 -20 0 -40 q -14 -20 0 -40`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".8" />)}
        </SvgCapa>
        <Etq T={T} at={K.Se + 1.6} until={K.Lc - 0.2} x={700} y={1140} texto="ADN seco" lado="der" tam={36} color={KC.ink} />
        <Chip T={T} at={K.Se + 0.6} until={K.Lc - 0.2} texto="seco, frío y oscuro" y={1530} tam={40} borde={KC.cyan} />
      </Escena>

      {/* 5 · se lee con un secuenciador y vuelve a ser la foto */}
      <Escena T={T} a={K.Lc} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Tubo x={170} y={840} s={0.7} liquido={kprog(T, K.Lc + 0.1, K.Lc + 0.8) * 0.5} polvo={1 - kprog(T, K.Lc + 0.1, K.Lc + 0.8)} hebritas={1} T={T} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Lc - 0.8) * 0.6 + i / 6) % 1; if (T < K.Lc + 0.8) return null;
            return <Base key={i} x={klerp(200, 430, u)} y={980 - Math.sin(u * Math.PI) * 60} l={seqL[i]} r={16} />; })}
          <rect x={420} y={720} width={340} height={360} rx={30} fill="#dfe3ea" stroke={KC.ink} strokeWidth={9} />
          <rect x={450} y={750} width={280} height={180} rx={14} fill="#0d1424" stroke={KC.ink} strokeWidth={6} />
          {[0, 1, 2, 3].map((f) => <g key={f}>{Array.from({ length: 8 }, (_, c) => { const k = Math.floor((T - K.Lc) * 8) + f * 8 + c; const l = seqL[((k % 60) + 60) % 60];
            return <text key={c} x={470 + c * 32} y={790 + f * 40} style={{ font:`700 30px ${KF.mono}` }} fill={LC[l]}>{l}</text>; })}</g>)}
          <text x={590} y={1010} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>SECUENCIADOR</text>
          {Array.from({ length: 8 }, (_, i) => { const u = ((T - K.Lc) * 0.7 + i / 8) % 1; return <text key={i} x={klerp(770, 840, u)} y={900 + (i % 3) * 30} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={1 - u}>{i % 2}</text>; })}
          <Celular x={930} y={900} s={0.48} T={T} foto={kprog(T, K.Lc + 1.6, K.Lc + 3.8)} />
        </SvgCapa>
      </Escena>

      {/* 6 · re-gancho: ¿por qué no un disco? */}
      <Escena T={T} a={K.Pr} b={K.Ma} zoom={0.05}>
        <FondoLunares color={KC.teal} />
        <SvgCapa>
          <DiscoDuro x={810} y={660} s={0.62} T={T} />
          <text x={810} y={905} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={4}>VS</text>
          <Tubo x={810} y={1060} s={0.55} polvo={1} T={T} rot={Math.sin(T * 2) * 4} />
          <text x={960} y={520} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} transform={`rotate(${Math.sin(T * 3) * 8} 960 460)`} opacity={kprog(T, K.Pr + 0.3, K.Pr + 0.7)}>?</text>
        </SvgCapa>
      </Escena>

      {/* 7 · ADN de mamut de más de un millón de años */}
      <Escena T={T} a={K.Ma} b={K.So} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={250} y={880} width={600} height={330} rx={40} fill="rgba(230,248,255,.85)" stroke={KC.ink} strokeWidth={8} />
          <path d="M 300 920 L 360 980 L 340 1040 M 760 900 L 720 980 L 790 1050" stroke="#7fb8d8" strokeWidth={5} fill="none" />
          <MuelaMamut x={550} y={1045} s={1.05} />
        </SvgCapa>
        <Lupa T={T} at={K.Ma + 0.9} until={K.So - 0.3} x={400} y={530} r={170} fx={550} fy={1030} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · ADN antiguo"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}>{Array.from({ length: 8 }, (_, i) => { const R = krng(60 + i), px = 40 + R() * (r * 2 - 160), py = 50 + R() * (r * 2 - 100);
            return <g key={i} transform={`translate(${px + Math.sin(Tl + i) * 8} ${py}) rotate(${R() * 360 + Tl * 10})`}><ADNHebra T={Tl} x={0} y={0} largo={60 + R() * 60} alto={24} vueltas={1} grosor={4} /></g>; })}</svg>} />
        <Etq T={T} at={K.Ma + 0.5} until={K.So - 0.2} x={850} y={865} texto="muela de mamut" lado="izq" tam={30} color={KC.ink} />
        <Chip T={T} at={K.Ma + 1.4} until={K.So - 0.2} texto="más de 1 000 000 de años · 2021" y={1500} tam={36} borde={KC.cyan} />
        <Chip T={T} at={K.Ma + 2.0} until={K.So - 0.2} texto="congelado en Siberia · ADN en pedacitos" y={1590} tam={30} borde={KC.white} />
      </Escena>

      {/* 8 · 2013: sonetos y discurso en ADN */}
      <Escena T={T} a={K.So} b={K.Fo} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <g transform="translate(290 960)">
            <path d="M 0 -130 Q -110 -160 -220 -130 L -220 130 Q -110 100 0 130 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <path d="M 0 -130 Q 110 -160 220 -130 L 220 130 Q 110 100 0 130 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 7 }, (_, i) => <g key={i}><line x1={-195} x2={-30} y1={-90 + i * 30} y2={-90 + i * 30} stroke="#8a8170" strokeWidth={5} /><line x1={30} x2={195} y1={-90 + i * 30} y2={-90 + i * 30} stroke="#8a8170" strokeWidth={5} /></g>)}
            <text x={-110} y={-100} textAnchor="middle" style={{ font:`italic 700 22px ${KF.mono}` }} fill={KC.ink}>Sonnet 18</text>
          </g>
          <g transform="translate(800 960)">
            <rect x={-170} y={-130} width={340} height={260} rx={26} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 13 }, (_, i) => { const h = 20 + Math.abs(Math.sin(T * 7 + i * 0.9) * Math.sin(T * 2.3 + i)) * 160; return <rect key={i} x={-150 + i * 23} y={-h / 2} width={14} height={h} rx={7} fill={KC.gold2} />; })}
          </g>
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.So + 3.6 + i * 0.16, u = kprog(T, t0, t0 + 0.8, kEase.suave); if (u <= 0) return null;
            const desde = i % 2 ? [800, 960] : [290, 960], hasta = [200 + (i % 14) * 52, 1170];
            return <Base key={i} x={klerp(desde[0], hasta[0], u)} y={klerp(desde[1], hasta[1], u) - Math.sin(u * Math.PI) * 80} l={seqDe(14, 5)[i]} r={20} />; })}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.So + 0.2} until={K.So + 3.4} anio="2013" quien="EMBL-EBI · Inglaterra" revista="Nature · Goldman, Birney y equipo" y={560} />
        <Chip T={T} at={K.So + 3.6} until={K.Fo - 0.2} texto="154 sonetos + 26 s de «I Have a Dream»" y={1500} tam={34} borde={KC.gold} />
      </Escena>

      {/* 9 · 2017: una película y un sistema operativo, sin errores */}
      <Escena T={T} a={K.Fo} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g>
            <rect x={-20} y={1020} width={1120} height={170} fill="#222" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 9 }, (_, i) => { const xx = ((i * 170 + (T - K.Fo) * 140) % 1530) - 230; return <g key={i}>
              <rect x={xx} y={1045} width={150} height={120} rx={6} fill="#efe6cf" />
              <Tren x={xx + 80} y={1112} s={0.8} />
              {[0, 1, 2, 3].map((k) => <g key={k}><rect x={xx + k * 40} y={1026} width={18} height={12} rx={3} fill="#efe6cf" /><rect x={xx + k * 40} y={1172} width={18} height={12} rx={3} fill="#efe6cf" /></g>)}
            </g>; })}
          </g>
          <Tubo x={540} y={1060} s={0.85} polvo={1} brillo={0.6} T={T} />
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Fo + 0.15} until={K.Fo + 2.6} anio="2017" quien="Columbia y New York Genome Center" revista="Science · Erlich y Zielinski" y={700} />
        <Chip T={T} at={K.Fo + 0.6} until={K.Fo + 2.7} texto="un sistema operativo, una película de 1895" y={1500} tam={30} borde={KC.gold} />
        <Chip T={T} at={K.Fo + 0.9} until={K.Fo + 2.7} texto="y 4 archivos más" y={1580} tam={30} borde={KC.gold} />
        <Chip T={T} at={K.Fo + 2.9} until={K.Ca - 0.2} texto="0 errores al leerlos" y={1520} tam={46} borde={KC.mint} />
      </Escena>

      {/* 10 · 2017, Harvard: un caballo galopando en bacterias vivas (CRISPR) */}
      <Escena T={T} a={K.Ca} b={K.Pb} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {[0, 1, 2].map((b) => { const div = kprog(T, K.Ca + 3.2, K.Ca + 4.2, kEase.suave), bx = 230 + b * 310;
            return <g key={b}>
              <Bacteria T={T} x={bx - div * 0} y={1060 - div * 70} largo={230} ancho={92} seed={b + 1} color="#7fd88a"
                adentro={() => <g>{[0, 1, 2, 3, 4].filter((f) => f % 3 === b && T > K.Ca + 1.6 + f * 0.35).map((f) => <rect key={f} x={-40 + (f > 2 ? 30 : 0)} y={-16} width={26} height={19} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}</g>} />
              {div > 0 && <Bacteria T={T} x={bx} y={1060 + div * 70} largo={230} ancho={92} seed={b + 7} color="#7fd88a" opacidad={div}
                adentro={() => <g>{[0, 1, 2, 3, 4].filter((f) => f % 3 === b).map((f) => <rect key={f} x={-40 + (f > 2 ? 30 : 0)} y={-16} width={26} height={19} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}</g>} />}
            </g>; })}
          {[0, 1, 2, 3, 4].map((f) => { const t0 = K.Ca + 1.2 + f * 0.35, u = kprog(T, t0, t0 + 0.5, kEase.suave), bx = 230 + (f % 3) * 310;
            const x0 = 140 + f * 200, y0 = 740, cx = klerp(x0, bx, u), cy = klerp(y0, 1060, u), s = klerp(1, 0.18, u);
            return <g key={f} opacity={u >= 1 ? 0 : 1} transform={`translate(${cx} ${cy}) scale(${s})`}>
              <rect x={-85} y={-62} width={170} height={124} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <Caballo x={-6} y={-6} s={0.62} f={Math.floor(T * 8) + f} />
            </g>; })}
        </SvgCapa>
        <Etq T={T} at={K.Ca + 2.0} until={K.Pb - 0.2} x={120} y={1200} texto="Escherichia coli" it lado="der" tam={34} color={KC.ink} />
        <Chip T={T} at={K.Ca + 0.4} until={K.Pb - 0.2} texto="Harvard · 2017 · con CRISPR" y={1500} tam={36} borde={KC.mint} />
        <Chip T={T} at={K.Ca + 1.4} until={K.Pb - 0.2} texto="5 cuadros de 36 × 26 píxeles" y={1585} tam={30} borde={KC.white} />
      </Escena>

      {/* 11 · el problema: lento (y caro) */}
      <Escena T={T} a={K.Pb} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        <SvgCapa>
          <Reloj x={660} y={740} r={170} horas={kprog(T, K.Pb + 0.4, K.Ci - 0.3) * 21} />
          {hello.map((l, i) => { const at = K.Pb + 0.7 + i * 0.6, p = kprog(T, at, at + 0.35, kEase.rebote); return p > 0 ?
            <g key={i} transform={`translate(${300 + i * 120} 1120) scale(${p})`}><rect x={-50} y={-60} width={100} height={120} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              <text y={30} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>{l}</text></g> : null; })}
        </SvgCapa>
        <Chip T={T} at={K.Pb + 0.4} until={K.Ci - 0.2} texto="2019 · Microsoft + U. de Washington" x={560} y={985} tam={28} borde={KC.white} />
        <Medidor T={T} at={K.Pb + 0.6} until={K.Ci - 0.2} valor={(t) => kprog(t, K.Pb + 0.6, K.Pb + 3.8)} etiqueta="escribir y leer 5 letras" texto={(v) => Math.round(v * 21) + ' h'} y={1470} color={KC.yellow} />
      </Escena>

      {/* 12 · cierre: el mismo tubito, ya con el archivo adentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {escenaBalanza(K.Ci, true)}
        <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="1 g de ADN ≈ más de 1 millón de celulares de 128 GB" y={1500} tam={28} borde={KC.gold} />
      </Escena>

      {/* textos del gancho */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.Bi - 0.3} valor={215} dur={1.0} sufijo=" millones" etiqueta="de gigas en 1 gramo de ADN" y={1520} tam={150} color={KC.pink} />
      <Chip T={T} at={K.G + 1.2} until={K.Bi - 0.3} texto="récord logrado en 2017 · Science" x={290} y={560} tam={26} borde={KC.pink} />
      <Chip T={T} at={K.G + 3.2} until={K.Bi - 0.3} texto="≈ 1.7 millones × 128 GB" x={840} y={790} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.G + 1.0} until={K.Bi - 0.3} x={420} y={1010} texto="ADN seco" lado="der" tam={30} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bi - 0.1} texto="215 millones de gigas *en un gramo*" />
      <Subtitulo T={T} idx={1} at={K.Bi + 0.1} until={K.Le - 0.1} texto="Ceros y unos → *A, C, G, T*" />
      <Subtitulo T={T} idx={2} at={K.Le + 0.1} until={K.Si - 0.1} texto="*Dos bits* = una letra" />
      <Subtitulo T={T} idx={3} at={K.Si + 0.1} until={K.Se - 0.1} texto="Se escriben *hebras de ADN*" />
      <Subtitulo T={T} idx={4} at={K.Se + 0.1} until={K.Lc - 0.1} texto="Seco: *un polvito*" />
      <Subtitulo T={T} idx={5} at={K.Lc + 0.1} until={K.Pr - 0.1} texto="Se lee y *vuelve a ser archivo*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ma - 0.1} texto="¿Por qué no *en un disco?*" />
      <Subtitulo T={T} idx={7} at={K.Ma + 0.1} until={K.So - 0.1} texto="Dura: *más de un millón de años*" />
      <Subtitulo T={T} idx={8} at={K.So + 0.1} until={K.Fo - 0.1} texto="2013: *Shakespeare* en ADN" />
      <Subtitulo T={T} idx={9} at={K.Fo + 0.1} until={K.Ca - 0.1} texto="Una película, *sin errores*" />
      <Subtitulo T={T} idx={10} at={K.Ca + 0.1} until={K.Pb - 0.1} texto="Un caballo *en bacterias vivas*" />
      <Subtitulo T={T} idx={11} at={K.Pb + 0.1} until={K.Ci - 0.1} texto="HELLO: *21 horas*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Falta que sea *rápido y barato*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Letras + 0.5, CUES.Letras + 4.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Seco + 0.3, CUES.Lectura - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Mamut - 0.15, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Mamut + 0.8, CUES.Sonetos - 0.25, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Fountain + 2.6, CUES.Caballo - 0.15, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Caballo + 1.3, CUES.Problema - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Problema + 0.3, CUES.Cierre - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="37" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AdnDiscoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AdnDisco /></CompositionStage></div>;
}
window.AdnDiscoApp = AdnDiscoApp;
