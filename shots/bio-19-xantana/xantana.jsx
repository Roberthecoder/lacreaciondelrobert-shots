// Shot Biotecnológico #19 · Lo espeso de tu aderezo también es obra de una bacteria (goma xantana) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const XB = '#8fd46a', XBACT = '#f2c94c', BABA = 'rgba(200,245,255,.55)', ADEREZO = '#f7f0dc', VIDRIO = 'rgba(220,240,255,.35)';
const VERDE_COL = '#7cc96b', VERDE_OSC = '#4f9a45';

function SvgX({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Frasco de aderezo de vidrio con tapa y etiqueta. agita: grados de bamboleo. resalta 0..1 ilumina «goma xantana».
function FrascoAderezo({ T, x, y, s = 1, agita = 0, resalta = 0, flujo = 0, hueco = 0 }) {
  const ola = Math.sin(T * 2.2) * 6 * (0.3 + flujo);
  return <g transform={`translate(${x} ${y}) rotate(${agita}) scale(${s})`}>
    <ellipse cx={0} cy={270} rx={220} ry={26} fill="rgba(0,0,0,.18)" />
    {/* cuerpo de vidrio */}
    <path d="M -170 -170 Q -200 -150 -200 -100 L -200 220 Q -200 262 -158 262 L 158 262 Q 200 262 200 220 L 200 -100 Q 200 -150 170 -170 Z" fill={VIDRIO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {/* aderezo cremoso */}
    <clipPath id="xfr"><path d="M -192 -100 L 192 -100 L 192 220 Q 192 254 158 254 L -158 254 Q -192 254 -192 220 Z" /></clipPath>
    <g clipPath="url(#xfr)">
      <path d={`M -200 ${-40 + ola} Q -100 ${-60 - ola} 0 ${-40 + ola} T 200 ${-40 - ola} L 200 270 L -200 270 Z`} fill={ADEREZO} />
      {[[-120, 40], [60, 10], [-30, 140], [120, 170], [-140, 200], [20, 80]].map(([a, b], i) => <circle key={i} cx={a + Math.sin(T * (0.6 + flujo * 3) + i) * (3 + flujo * 30)} cy={b} r={6} fill="#7aa55b" opacity=".75" />)}
      {hueco > 0 && <ellipse cx={20} cy={-40} rx={60 * hueco} ry={22 * hueco} fill="#e6dcc0" />}
    </g>
    <path d="M -150 -120 L -150 200" stroke="rgba(255,255,255,.75)" strokeWidth={16} strokeLinecap="round" />
    {/* tapa */}
    <rect x={-182} y={-232} width={364} height={70} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={10} />
    {[-130, -70, -10, 50, 110].map((a) => <line key={a} x1={a + 10} y1={-224} x2={a + 10} y2={-170} stroke="rgba(0,0,0,.25)" strokeWidth={6} />)}
    {/* etiqueta */}
    <rect x={-160} y={-10} width={320} height={190} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={46} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>ADEREZO</text>
    {[78, 104].map((yy) => <rect key={yy} x={-128} y={yy} width={256} height={10} rx={5} fill="#c9c0ae" />)}
    <rect x={-140} y={124} width={280} height={40} rx={10} fill={KC.gold2} opacity={resalta} />
    <text x={0} y={154} textAnchor="middle" style={{ font:`700 ${26 + resalta * 6}px ${KF.mono}` }} fill={KC.ink}>goma xantana</text>
  </g>;
}
// Cuchara que se hunde y sale cubierta. p 0..1 (0 arriba, 0.5 adentro, 1 arriba con aderezo).
function Cuchara({ x, y, p = 0 }) {
  const baja = Math.sin(Math.PI * kclamp(p, 0, 1)) * 230, cubierta = p > 0.5;
  return <g transform={`translate(${x} ${y + baja}) rotate(-14)`}>
    <rect x={-14} y={-380} width={28} height={330} rx={14} fill="#c8d0d8" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-20} rx={60} ry={80} fill="#c8d0d8" stroke={KC.ink} strokeWidth={8} />
    {cubierta && <path d="M -58 -40 Q -60 60 -20 90 Q -10 140 0 150 Q 12 130 18 92 Q 60 60 58 -40 Q 0 -20 -58 -40 Z" fill={ADEREZO} stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Bacteria Xanthomonas (bastón con un flagelo polar), con baba de xantana alrededor (baba 0..1).
function Xanto({ T, x, y, s = 1, rot = 0, baba = 0, seed = 1, hilos = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {baba > 0 && <ellipse cx={0} cy={0} rx={190 * baba + 40} ry={110 * baba + 20} fill={BABA} stroke="rgba(200,245,255,.9)" strokeWidth={4} transform={`rotate(${rot})`} />}
    {hilos > 0 && Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + seed, L = 60 + 120 * hilos;
      const x0 = Math.cos(a) * 80, y0 = Math.sin(a) * 45;
      return <path key={i} d={`M ${x0} ${y0} q ${Math.cos(a) * L * 0.5 + mece(T, i + seed, 0.8) * 20} ${Math.sin(a) * L * 0.5} ${Math.cos(a) * L} ${Math.sin(a) * L}`} stroke="#d9f6ff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.9} />; })}
    <Bacteria T={T} x={0} y={0} largo={200} ancho={74} rot={rot} color={XBACT} seed={seed} />
  </g>;
}
// Hoja de col con la pudrición negra: lesión amarilla en V desde el borde y nervaduras ennegrecidas (v 0..1).
function HojaCol({ T, x, y, s = 1, v = 1 }) {
  const venas = [[-0.9, 1], [-0.55, 1], [-0.2, 1], [0.2, -1], [0.55, -1], [0.9, -1]];
  const L = 300 * kclamp(v, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, 3, 0.3) * 3}) scale(${s})`}>
    <path d="M 0 360 C -330 330 -380 40 -300 -120 C -230 -280 -90 -330 0 -330 C 90 -330 240 -280 300 -120 C 380 40 330 330 0 360 Z" fill={VERDE_COL} stroke={KC.ink} strokeWidth={10} />
    {[-220, -120, 120, 220].map((a, i) => <path key={i} d={`M ${a} ${-200 + i * 40} q 30 40 0 80`} stroke="rgba(255,255,255,.25)" strokeWidth={10} fill="none" />)}
    {/* lesión en V que entra desde el borde derecho */}
    <path d={`M 340 ${-40 - L * 0.55} L ${330 - L} ${20} L 340 ${80 + L * 0.55} Z`} fill="#f2d24a" stroke="#b9962a" strokeWidth={4} opacity={0.95} />
    <path d={`M 340 ${-10 - L * 0.3} L ${336 - L * 0.55} ${20} L 340 ${50 + L * 0.3} Z`} fill="#b07a2a" opacity={0.6 * v} />
    {/* nervaduras */}
    <path d="M 0 360 L 0 -300" stroke="#e9f7d9" strokeWidth={18} strokeLinecap="round" />
    {venas.map(([k, sg], i) => { const yy = -230 + i * 95; const dx = (i < 3 ? -1 : 1);
      const enV = dx > 0 && Math.abs(yy - 20) < 60 + L * 0.5;
      return <path key={i} d={`M 0 ${yy + 60} Q ${dx * 140} ${yy} ${dx * 290} ${yy - 40}`} stroke={enV ? '#1d1a12' : '#e9f7d9'} strokeWidth={enV ? 10 : 9} fill="none" strokeLinecap="round" />; })}
    <path d={`M ${330 - L * 0.9} 20 L 330 20`} stroke="#1d1a12" strokeWidth={9} strokeLinecap="round" opacity={v} />
  </g>;
}
// Cadena de xantana: esqueleto de glucosas (hexágonos) con ramitas de 3 azúcares alternadas, en hélice.
function CadenaX({ T, x, y, n = 9, p = 1, paso = 96, amp = 46, s = 1, vel = 1 }) {
  const hex = (cx, cy, r) => [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
  const pts = Array.from({ length: n }, (_, i) => { const f = i * 0.9 + T * 1.6 * vel; return [i * paso, Math.sin(f) * amp, Math.cos(f)]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {pts.map(([cx, cy, z], i) => { const q = kclamp(p * n - i, 0, 1); if (q <= 0 || i === 0) return null; const [px, py] = pts[i - 1];
      return <line key={'l' + i} x1={px} y1={py} x2={cx} y2={cy} stroke="#ffe7a3" strokeWidth={8} opacity={q} />; })}
    {pts.map(([cx, cy, z], i) => { const q = kclamp(p * n - i, 0, 1); if (q <= 0) return null; const r = 30 + z * 6;
      const rama = i % 2 === 1;
      return <g key={i} opacity={q}>
        {rama && [0, 1, 2].map((k) => { const by = cy - (z > 0 ? 1 : -1) * (62 + k * 58);
          return <g key={k}><line x1={cx} y1={k === 0 ? cy : by + (z > 0 ? 58 : -58)} x2={cx + 6} y2={by} stroke="#c9b5ff" strokeWidth={6} />
            <polygon points={hex(cx + 6, by, 22)} fill={k === 1 ? '#ff9ec4' : '#b18cff'} stroke={KC.ink} strokeWidth={4} /></g>; })}
        <polygon points={hex(cx, cy, r)} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} opacity={0.75 + z * 0.25} />
      </g>; })}
  </g>;
}
// Muchas cadenas: orden 0 = enredadas en red · 1 = alineadas con el flujo. flujo = velocidad del corrimiento.
const XREDS = (() => { const R = krng(77); return Array.from({ length: 11 }, () => ({ a: R() * Math.PI, cx: 160 + R() * 760, cy: 560 + R() * 620, f: R() * 6, c: R() })); })();
function RedCadenas({ T, orden = 0, flujo = 0, o = 1 }) {
  return <g opacity={o}>{XREDS.map((c, i) => {
    const ang = klerp(c.a, 0, orden), cy = klerp(c.cy, 560 + i * 58, orden);
    const off = ((T * 260 * flujo + c.f * 100) % 1200) * orden;
    const cx = klerp(c.cx, -100 + off, orden);
    const pts = Array.from({ length: 14 }, (_, k) => { const t = (k - 6.5) * 46; const w = Math.sin(k * 0.9 + c.f + T * (0.8 + flujo)) * klerp(40, 14, orden);
      return [cx + Math.cos(ang) * t - Math.sin(ang) * w, cy + Math.sin(ang) * t + Math.cos(ang) * w]; });
    const col = c.c < 0.5 ? KC.yellow : KC.gold2;
    return <g key={i}>
      <path d={'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke={col} strokeWidth={9} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {pts.filter((_, k) => k % 3 === 1).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={9} fill="#b18cff" stroke={KC.ink} strokeWidth={3} />)}
    </g>; })}</g>;
}
// Gotitas de agua que avanzan (rápidas si corre, lentas si la red las frena).
function GotasAgua({ T, vel = 1, n = 14, o = 1 }) {
  const R = krng(12);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const y0 = 560 + R() * 640, f = R() * 1000, r = 10 + R() * 8;
    const xx = (f + T * 60 * vel + Math.sin(T * 2 + i) * 10 * (1 - Math.min(1, vel))) % 1080;
    return <circle key={i} cx={xx} cy={y0 + Math.sin(T * 3 + i) * 6} r={r} fill="#6fd0ff" stroke="#e8f8ff" strokeWidth={3} opacity={0.85} />; })}</g>;
}
// Cubo de azúcar.
function Cubo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -30 -20 L 0 -36 L 30 -20 L 0 -4 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <path d="M -30 -20 L 0 -4 L 0 32 L -30 16 Z" fill="#e6ecf2" stroke={KC.ink} strokeWidth={4} />
    <path d="M 30 -20 L 0 -4 L 0 32 L 30 16 Z" fill="#cdd6df" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Vaso de laboratorio con contenido.
function Vaso({ x, y, s = 1, liquido = '#e9d7a0', nivel = 0.6, children, w = 260, h = 320 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <clipPath id={`xv${Math.round(x)}`}><rect x={-w / 2 + 8} y={-h / 2} width={w - 16} height={h - 8} rx={20} /></clipPath>
    <g clipPath={`url(#xv${Math.round(x)})`}><rect x={-w / 2} y={h / 2 - h * nivel} width={w} height={h * nivel} fill={liquido} />{children}</g>
    <path d={`M ${-w / 2} ${-h / 2} L ${-w / 2} ${h / 2 - 20} Q ${-w / 2} ${h / 2} ${-w / 2 + 20} ${h / 2} L ${w / 2 - 20} ${h / 2} Q ${w / 2} ${h / 2} ${w / 2} ${h / 2 - 20} L ${w / 2} ${-h / 2}`} fill={VIDRIO} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[0.3, 0.5, 0.7].map((k) => <line key={k} x1={-w / 2 + 14} y1={h / 2 - h * k} x2={-w / 2 + 50} y2={h / 2 - h * k} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Torre de perforación con lodo que baja por el tubo.
function Torre({ T, x, y, lodo = 1 }) {
  const L = Array.from({ length: 7 }, (_, i) => ((T * 140 + i * 90) % 630));
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -170 0 L -40 -560 L 40 -560 L 170 0" fill="none" stroke={KC.ink} strokeWidth={14} strokeLinejoin="round" />
    {[-460, -340, -220, -100].map((yy, i) => { const w = 40 + (yy + 560) * 0.23; return <g key={i}><line x1={-w} y1={yy} x2={w} y2={yy} stroke={KC.ink} strokeWidth={9} /><line x1={-w} y1={yy} x2={w + 25} y2={yy + 120} stroke={KC.ink} strokeWidth={6} /></g>; })}
    <rect x={-60} y={-600} width={120} height={50} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-260} y={0} width={520} height={40} fill="#6b4b2a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-300} y={40} width={600} height={640} fill="#b07a46" stroke={KC.ink} strokeWidth={8} />
    {[140, 260, 400, 540].map((yy) => <path key={yy} d={`M -300 ${yy} q 150 -24 300 0 t 300 0`} stroke="#8e5e32" strokeWidth={6} fill="none" />)}
    <rect x={-22} y={-560} width={44} height={1220} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
    {L.map((d, i) => <ellipse key={i} cx={0} cy={-540 + d * 1.9} rx={12} ry={20} fill="#c9b07a" stroke={KC.ink} strokeWidth={3} opacity={lodo} />)}
  </g>;
}
// Laboratorio de 1961: mesa, matraces con caldo espeso y un hilo de goma.
function Lab({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-420} y={140} width={840} height={40} fill="#8a5a33" stroke={KC.ink} strokeWidth={8} />
    <rect x={-400} y={180} width={30} height={260} fill="#8a5a33" stroke={KC.ink} strokeWidth={6} /><rect x={370} y={180} width={30} height={260} fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />
    {[[-230, 1], [0, 1.25], [230, 0.9]].map(([cx, s], i) => <g key={i} transform={`translate(${cx} 140) scale(${s})`}>
      <path d="M -26 -240 L -26 -150 L -110 -10 Q -120 0 -100 0 L 100 0 Q 120 0 110 -10 L 26 -150 L 26 -240 Z" fill={VIDRIO} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M -84 -40 L 84 -40 L 104 -6 L -104 -6 Z`} fill="#efe1b0" />
      <path d={`M -84 -40 Q 0 ${-58 + Math.sin(T * 1.5 + i) * 4} 84 -40`} fill="#efe1b0" stroke="#d4c28c" strokeWidth={3} />
      <rect x={-32} y={-262} width={64} height={26} rx={6} fill="#d8c8a8" stroke={KC.ink} strokeWidth={5} />
    </g>)}
    {/* varilla que levanta un hilo de goma */}
    <line x1={40} y1={-120 - Math.abs(Math.sin(T * 1.2)) * 60} x2={10} y2={-360} stroke="#c8d0d8" strokeWidth={12} strokeLinecap="round" />
    <path d={`M 20 ${-70} Q 30 ${-100 - Math.abs(Math.sin(T * 1.2)) * 30} 38 ${-120 - Math.abs(Math.sin(T * 1.2)) * 60}`} stroke="#efe1b0" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Sello redondo.
function Sello({ T, at, until, x, y, texto1, texto2 }) {
  if (T < at || T > until + 0.3) return null;
  const e = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, transform:`translate(-50%,-50%) scale(${klerp(2.2, 1, e)}) rotate(-12deg)`, opacity:kprog(T, at, at + 0.15) * (1 - kprog(T, until, until + 0.3)),
    width:330, height:330, borderRadius:'50%', border:`12px solid ${KC.red}`, background:'rgba(255,255,255,.85)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 30px rgba(0,0,0,.35)' }}>
    <div style={{ font:`400 96px/1 ${KF.titulo}`, color:KC.red }}>{texto1}</div>
    <div style={{ font:`900 30px ${KF.texto}`, color:KC.red, textAlign:'center', marginTop:6, lineHeight:1.1, whiteSpace:'pre-line' }}>{texto2}</div>
  </div>;
}

function Xantana() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Etiqueta, C: CUES.Col, Ta: CUES.Tanque, Al: CUES.Alcohol, P: CUES.Pregunta, Ca: CUES.Cadena, R: CUES.Red, Ag: CUES.Agitar, Es: CUES.Estudio, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const C2 = K.C + (K.Ta - K.C) * 0.53;            // 2ª frase de la escena de la col (la baba)
  const A1 = K.Al + 1.7, A2 = K.Al + 3.6;           // pasos: quitar bacterias → alcohol → polvo
  const AgQ = K.Ag + (K.Es - K.Ag) * 0.62;          // se deja quieto
  const Es2 = K.Es + (K.D - K.Es) * 0.62;           // sello de 1969
  const cuchara = kprog(T, K.G + 0.05, K.G + 1.6, kEase.suave);
  const cuchara2 = kprog(T, K.Ci + 0.3, K.Ci + 1.9, kEase.suave);
  // agitar: bamboleo fuerte de Ag+0.3 a AgQ, luego quieto
  const sacude = T > K.Ag + 0.3 && T < AgQ ? Math.sin(T * 22) * 16 : 0;
  const orden = kprog(T, K.Ag + 0.3, K.Ag + 0.9) * (1 - kprog(T, AgQ, AgQ + 1.0));
  const visc = 0.92 - 0.72 * orden;
  // barra de escala (aprox.): frasco ~5 px/mm · hoja ~3 px/mm. Bacterias y moléculas van sin escala: «esquemático · no a escala».
  const noEscala = (T >= C2 && T < K.Ta) || (T >= K.Ta + 1.6 && T < K.Al);
  const escala = T < K.C ? 5 : T < C2 ? 3 : T < K.Ag ? null : T < K.Es ? 4 : T < K.Ci ? null : T < K.Ou ? 5 : null;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco y la cuchara */}
      <Escena T={T} a={K.G - 0.5} b={K.E} zoom={0.04}>
        <FondoMarca color={KC.yellow} T={T} />
        <SvgX>
          <FrascoAderezo T={T} x={470} y={900} s={1.25} hueco={cuchara > 0.5 ? 1 : 0} />
          <Cuchara x={500} y={640} p={cuchara} />
          <g opacity={kprog(T, K.G + 2.0, K.G + 2.5)}><Xanto T={T} x={870} y={1060 + Math.sin(T * 3) * 10} s={0.8} rot={-20} seed={3} /></g>
        </SvgX>
      </Escena>
      {/* 1 · la etiqueta y la pasta de dientes */}
      <Escena T={T} a={K.E} b={K.C} zoom={0.04}>
        <FondoMarca color={KC.mint} T={T} />
        <SvgX>
          <FrascoAderezo T={T} x={330} y={880} s={1.0} resalta={kprog(T, K.E + 0.2, K.E + 0.8)} />
          <g transform={`translate(${klerp(1300, 800, kprog(T, K.E + 1.4, K.E + 2.1, kEase.sale))} 930) rotate(-24)`}>
            <path d="M -70 -260 L 70 -260 L 90 180 L -90 180 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
            <path d="M -90 180 L 90 180 L 80 214 L -80 214 Z" fill="#c9d3dd" stroke={KC.ink} strokeWidth={7} />
            <rect x={-40} y={-320} width={80} height={62} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
            <rect x={-62} y={-200} width={124} height={200} rx={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
            <text x={0} y={-120} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>PASTA</text>
            <rect x={-56} y={-70} width={112} height={44} rx={8} fill={KC.gold2} opacity={kprog(T, K.E + 2.2, K.E + 2.6)} />
            <text x={0} y={-40} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>xantana</text>
          </g>
        </SvgX>
      </Escena>
      {/* 2–3 · la hoja de col con pudrición negra y, por dentro, la baba */}
      <Escena T={T} a={K.C} b={K.Ta} zoom={0.04}>
        <FondoMarca color={KC.cyan} T={T} />
        <SvgX><HojaCol T={T} x={500} y={900} s={1.15} v={kprog(T, K.C + 0.3, K.C + 3.0, kEase.suave)} /></SvgX>
      </Escena>
      <Lupa T={T} at={C2} until={K.Ta - 0.2} x={540} y={760} r={300} fx={760} fy={920} tinte={KC.mint} etiqueta="AL MICROSCOPIO · HOJA DE COL"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#0b1a14" />
          {[[-90, -80, -15, 1], [110, -30, 25, 2], [-40, 110, 5, 3], [150, 140, -30, 4]].map(([dx, dy, rot, sd], i) =>
            <Xanto key={i} T={t} x={r + dx} y={r + dy} s={0.75} rot={rot} seed={sd} baba={kprog(t, C2 + 0.4 + i * 0.2, C2 + 1.6 + i * 0.2)} />)}
        </svg>} />
      {/* 4 · el tanque con azúcar; la bacteria suelta la goma afuera */}
      <Escena T={T} a={K.Ta} b={K.Al} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={0.35 + 0.4 * kprog(T, K.Ta, K.Al)} rpm={70} fondo={KC.pink} />
        <SvgX>{Array.from({ length: 6 }, (_, i) => { const t0 = K.Ta + 0.2 + i * 0.32, u = kprog(T, t0, t0 + 0.7, kEase.entra); return u > 0 && u < 1 ? <Cubo key={i} x={420 + i * 46} y={klerp(250, 640, u)} rot={i * 40 + u * 120} s={1.1} /> : null; })}</SvgX>
      </Escena>
      <Lupa T={T} at={K.Ta + 1.6} until={K.Al - 0.2} x={560} y={830} r={230} fx={540} fy={1010} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · EL CALDO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1a1508" />
          <Xanto T={t} x={r} y={r} s={0.9} rot={10} seed={5} hilos={kprog(t, K.Ta + 2.0, K.Al - 0.4)} />
        </svg>} />
      {/* 5 · se quitan las bacterias → alcohol → polvo */}
      <Escena T={T} a={K.Al} b={K.P} zoom={0.03}>
        <FondoMarca color={KC.lilac} T={T} />
        <SvgX>
          {T < A1 + 0.3 && <g opacity={1 - kprog(T, A1, A1 + 0.3)}>
            {/* filtro: las bacterias se quedan arriba, el caldo pasa */}
            <path d="M 300 560 L 780 560 L 600 820 L 600 900 L 480 900 L 480 820 Z" fill={VIDRIO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <path d="M 330 600 L 750 600" stroke="#fff" strokeWidth={8} strokeDasharray="14 10" />
            {Array.from({ length: 6 }, (_, i) => <Bacteria key={i} T={T} x={380 + i * 62} y={585 - (i % 2) * 18} largo={70} ancho={26} rot={i * 30} color={XBACT} seed={i} />)}
            <Goteo T={T} x={540} y0={910} y1={1080} cada={0.25} color="#efe1b0" desde={K.Al} hasta={A1} />
            <Vaso x={540} y={1150} s={0.9} nivel={kprog(T, K.Al, A1) * 0.5} liquido="#efe1b0" />
          </g>}
          {T >= A1 && T < A2 + 0.3 && <g opacity={kprog(T, A1, A1 + 0.3) * (1 - kprog(T, A2, A2 + 0.3))}>
            <Vaso x={540} y={980} s={1.3} nivel={0.55 + 0.2 * kprog(T, A1 + 0.3, A1 + 1.3)} liquido="#efe1b0">
              {Array.from({ length: 9 }, (_, i) => { const k = kprog(T, A1 + 0.6 + i * 0.1, A1 + 1.6 + i * 0.1); return <path key={i} d={`M ${-100 + i * 25} 60 q 20 ${-40 * k} 0 ${-90 * k} q -18 -30 6 ${-50 * k}`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={k} />; })}
            </Vaso>
            <g transform={`translate(330 640) rotate(${klerp(20, 75, kprog(T, A1 + 0.1, A1 + 0.5))})`}>
              <rect x={-50} y={-160} width={100} height={200} rx={20} fill="#e8f6ff" stroke={KC.ink} strokeWidth={8} />
              <rect x={-24} y={-200} width={48} height={44} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
              <text x={0} y={-50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>OH</text>
            </g>
            {T < A1 + 1.4 && <path d={`M 400 650 Q 480 680 ${520 + Math.sin(T * 18) * 4} 800`} stroke="#e8f6ff" strokeWidth={14} fill="none" strokeLinecap="round" />}
          </g>}
          {T >= A2 && <g opacity={kprog(T, A2, A2 + 0.3)}>
            <ellipse cx={540} cy={1060} rx={270} ry={50} fill="rgba(0,0,0,.15)" />
            <path d="M 300 820 Q 290 1060 540 1070 Q 790 1060 780 820 Z" fill="#d9b98a" stroke={KC.ink} strokeWidth={10} />
            <path d={`M 330 ${880 - 60 * kprog(T, A2, A2 + 1)} Q 540 ${760 - 90 * kprog(T, A2, A2 + 1)} 750 ${880 - 60 * kprog(T, A2, A2 + 1)} L 760 900 L 320 900 Z`} fill="#fbf8ef" stroke="#cfc7b0" strokeWidth={5} />
            <path d="M 300 820 Q 540 900 780 820" fill="none" stroke={KC.ink} strokeWidth={10} />
            {Array.from({ length: 10 }, (_, i) => { const u = ((T - A2) * 0.9 + i * 0.1) % 1; return <circle key={i} cx={500 + (i % 5) * 20} cy={klerp(560, 800, u)} r={6} fill="#fbf8ef" stroke="#cfc7b0" strokeWidth={2} />; })}
          </g>}
        </SvgX>
      </Escena>
      {/* 6 · pregunta: una pizca en un vaso de agua */}
      <Escena T={T} a={K.P} b={K.Ca} zoom={0.06}>
        <FondoMarca color={KC.orange} T={T} />
        <SvgX>
          <Vaso x={300} y={1010} s={1.2} nivel={0.6} liquido={mixHex('#7fd0ff', '#d6eef7', kprog(T, K.P + 0.8, K.P + 2.0))}>
            <path d={`M -140 ${-28 + Math.sin(T * 6) * 14 * (1 - kprog(T, K.P + 0.8, K.P + 2.0))} Q -50 ${-50 - Math.sin(T * 6) * 18 * (1 - kprog(T, K.P + 0.8, K.P + 2.0))} 30 -28 T 140 -28`} stroke="#fff" strokeWidth={6} fill="none" />
          </Vaso>
          {Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.P + 0.1 + i * 0.05, K.P + 0.7 + i * 0.05); return u > 0 && u < 1 ? <circle key={i} cx={280 + (i % 4) * 12} cy={klerp(560, 900, u)} r={6} fill="#fbf8ef" stroke={KC.ink} strokeWidth={2} /> : null; })}
          <text x={560} y={760} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 560 650)`}>?</text>
        </SvgX>
      </Escena>
      {/* 7 · por dentro: la cadena en hélice */}
      <Escena T={T} a={K.Ca} b={K.R} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(120,200,255,.25)" />
        <SvgX><CadenaX T={T} x={90} y={860} n={10} p={kprog(T, K.Ca + 0.2, K.Ca + 2.2)} paso={94} s={1.1} /></SvgX>
      </Escena>
      {/* 8 · en reposo: la red frena el agua */}
      <Escena T={T} a={K.R} b={K.Ag} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgX><GotasAgua T={T} vel={0.15} /><RedCadenas T={T} orden={0} o={kprog(T, K.R, K.R + 1.2)} /></SvgX>
      </Escena>
      {/* 9 · si agitas: el frasco y, por dentro, las cadenas alineadas */}
      <Escena T={T} a={K.Ag} b={K.Es} zoom={0.02}>
        <FondoMarca color={KC.yellow} T={T} />
        <SvgX><FrascoAderezo T={T} x={300} y={1000} s={0.85} agita={sacude} flujo={orden} /></SvgX>
      </Escena>
      <Lupa T={T} at={K.Ag + 0.2} until={K.Es - 0.2} x={740} y={820} r={250} fx={340} fy={940} tinte={KC.cyan} etiqueta="POR DENTRO · GOMA XANTANA"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1220" />
          <g transform={`translate(${r - 540 * 0.5} ${r - 870 * 0.5}) scale(0.5)`}><GotasAgua T={t} vel={klerp(0.15, 3, orden)} /><RedCadenas T={t} orden={orden} flujo={orden} /></g></svg>} />
      {/* 10 · el estudio: Peoria 1961 y el sello de 1969 */}
      <Escena T={T} a={K.Es} b={K.D} zoom={0.03}>
        <FondoMarca color={KC.cyan} T={T} />
        <SvgX><Lab T={T} x={540} y={960} /></SvgX>
      </Escena>
      {/* 11 · dato: lodo de perforación */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.03}>
        <FondoMarca color={KC.pink} T={T} />
        <SvgX><Torre T={T} x={380} y={1180} /></SvgX>
      </Escena>
      {/* 12 · cierre: el frasco del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoMarca color={KC.yellow} T={T} />
        <SvgX>
          <FrascoAderezo T={T} x={470} y={900} s={1.25} resalta={kprog(T, K.Ci + 1.6, K.Ci + 2.2)} hueco={cuchara2 > 0.5 ? 1 : 0} />
          <Cuchara x={500} y={640} p={cuchara2} />
          <g opacity={kprog(T, K.Ci + 2.0, K.Ci + 2.5)}><Xanto T={T} x={870} y={1060 + Math.sin(T * 3) * 10} s={0.8} rot={-20} seed={3} baba={0.5} /></g>
        </SvgX>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.E - 0.2} texto="¿solo crema?" x={285} y={420} tam={46} />
      <Etiqueta T={T} at={K.G + 2.3} until={K.E - 0.2} x={770} y={1160} texto="bacteria" color={KC.ink} />
      <Chip T={T} at={K.E + 0.4} until={K.C - 0.2} texto="goma xantana" x={330} y={470} tam={48} borde={KC.gold2} />
      <Chip T={T} at={K.C + 0.3} until={C2 - 0.1} texto="pudrición negra de la col" y={1500} tam={40} borde={KC.yellow} />
      <Etiqueta T={T} at={K.C + 1.2} until={C2 - 0.1} x={60} y={1600} texto="Xanthomonas campestris pv. campestris" it tam={32} />
      <Etiqueta T={T} at={C2 + 1.0} until={K.Ta - 0.2} x={60} y={1600} texto="baba de xantana: su escudo" tam={34} />
      {noEscala && <div style={{ position:'absolute', left:60, top:1700, zIndex:40, font:`700 26px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>esquemático · no a escala</div>}
      {escala && <Escala T={T} z={1} pxPorMm={escala} x={60} y={1690} objetivo={170} />}
      <Chip T={T} at={K.Ta + 0.3} until={K.Al - 0.2} texto="fermentación: azúcar → goma" y={1500} tam={40} borde={KC.yellow} />
      <Etiqueta T={T} at={K.Ta + 2.4} until={K.Al - 0.2} x={1020} y={1600} texto="la goma sale por fuera" lado="izq" tam={34} />
      <Chip T={T} at={K.Al + 0.2} until={A1 - 0.1} texto="1 · se eliminan las bacterias" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={A1 + 0.2} until={A2 - 0.1} texto="2 · alcohol: la goma se junta" y={1500} tam={40} borde={KC.cyan} />
      <Chip T={T} at={A2 + 0.2} until={K.P - 0.2} texto="3 · polvo sin bacterias vivas" y={1500} tam={40} borde={KC.mint} />
      <Etiqueta T={T} at={K.Ca + 1.4} until={K.R - 0.2} x={60} y={1500} texto="esqueleto de glucosas" color={KC.yellow} />
      <Etiqueta T={T} at={K.Ca + 2.4} until={K.R - 0.2} x={60} y={1580} texto="ramitas de 3 azúcares" color="#c9b5ff" />
      <Chip T={T} at={K.Ca + 0.3} until={K.R - 0.2} texto="cadena en hélice" x={340} y={470} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.R + 0.3} until={K.Ag - 0.2} texto="en reposo: una red" x={340} y={470} tam={42} borde={KC.gold2} />
      <Medidor T={T} at={K.R + 0.6} until={K.Es - 0.2} valor={K.R <= T && T < K.Ag ? 0.92 : visc} etiqueta="qué tan espeso" texto={(v) => (v > 0.6 ? 'espeso' : 'corre')} x={90} y={1460} color={KC.gold2} />
      <Chip T={T} at={K.Ag + 0.4} until={AgQ - 0.1} texto="agitado: se alinean" y={1610} tam={40} borde={KC.cyan} />
      <Chip T={T} at={AgQ + 0.1} until={K.Es - 0.2} texto="quieto: se enredan" y={1610} tam={40} borde={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={Es2 - 0.1} anio="1961" quien="Jeanes, Pittsley y Senti · Peoria, EE. UU." revista="J. Appl. Polym. Sci. · goma de glucosa por fermentación" y={520} />
      <Chip T={T} at={K.Es + 1.2} until={Es2 - 0.1} texto="Departamento de Agricultura de EE. UU." y={1500} tam={34} borde={KC.gold2} />
      <Sello T={T} at={Es2} until={K.D - 0.1} x={420} y={560} texto1="1969" texto2={'FDA · aditivo\nde alimentos'} />
      <Chip T={T} at={Es2 + 0.3} until={K.D - 0.2} texto="aprobada para alimentos" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.D + 0.3} until={K.Ci - 0.2} texto="lodo para perforar pozos" y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Ci + 0.4} until={K.Ou} texto="crema + baba de bacteria" y={1500} tam={40} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.05} until={K.E - 0.1} texto="No es solo crema: *es una bacteria.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.C - 0.1} texto="Goma xantana: *hasta en tu pasta.*" />
      <Subtitulo T={T} idx={2} at={K.C + 0.1} until={C2 - 0.1} texto="La de la *pudrición negra* de la col." />
      <Subtitulo T={T} idx={3} at={C2 + 0.1} until={K.Ta - 0.1} texto="Se envuelve en *baba.*" />
      <Subtitulo T={T} idx={4} at={K.Ta + 0.1} until={K.Al - 0.1} texto="Azúcar adentro, *goma afuera.*" />
      <Subtitulo T={T} idx={5} at={K.Al + 0.1} until={K.P - 0.1} texto="Sin bacterias, *con alcohol, seca.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ca - 0.1} texto="¿Cómo espesa *con tan poquito?*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.R - 0.1} texto="Una cadena de azúcares *en hélice.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Ag - 0.1} texto="Quietas, *se enredan.*" />
      <Subtitulo T={T} idx={9} at={K.Ag + 0.1} until={K.Es - 0.1} texto="Agitas y corre; *quieto, espesa.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.D - 0.1} texto="1961, Peoria · *1969, aprobada.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.Ci - 0.1} texto="Espesa el *lodo de los pozos.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="También es *baba de bacteria.*" />

      <Robert T={T} apariciones={ROBERT_X(CUES, { C2, AgQ, Es2 })} />
      <MarcaAgua T={T} tema="bioquimica" num="19" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Apariciones de Robert: [at, until, pose, lado]
function ROBERT_X(C, x) {
  return [
    [C.Gancho - 0.45, C.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
    [C.Col + 0.6, x.C2 - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
    [C.Tanque + 0.3, C.Alcohol - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
    [C.Pregunta + 0.05, C.Cadena + 0.6, 'avatar_06_pensativo_menton', 'arriba-der'],
    [C.Red + 0.3, C.Agitar - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
    [C.Agitar + 0.4, C.Estudio - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
    [x.Es2 + 0.1, C.Dato - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
    [C.Dato + 0.2, C.Cierre - 0.2, 'avatar_11_sorprendido', 'grande'],
    [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der'],
  ];
}

function XantanaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Xantana /></CompositionStage></div>;
}
window.XantanaApp = XantanaApp;
