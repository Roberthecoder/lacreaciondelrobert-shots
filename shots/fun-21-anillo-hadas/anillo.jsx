// Shot Fungi Mati #21 · Ese círculo en el pasto no es de hadas: es un hongo — NARRADO (gancho 1 "Esto no es X: es Y" + N4 "la imagen que se llena").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const AN = { pasto:'#5fcf55', claro:'#8be872', oscuro:'#1f7a35', banda:'#2f9c45', cafe:'#8a5a25', cafe2:'#c99a55', pradera:'#c6d86a', tierra:'#6b4a2b', tierra2:'#4a3220' };

// Mechones de pasto vistos desde arriba (fijos; se colorean según la distancia al centro del anillo).
const MECHONES = (() => { const g = krng(21), out = []; for (let i = 0; i < 1500; i++) out.push([g() * 1180 - 50, g() * 2020 - 50, g() * 6.283, 14 + g() * 14]); return out; })();

// Césped visto desde arriba con un anillo de hadas. R = radio del anillo (px), W = ancho de la banda verde,
// cafe 0..1 = banda café por dentro, setas 0..1 = setas en el borde, base = color del pasto.
function Cesped({ T, cx = 540, cy = 880, R = 250, W = 60, cafe = 0, setas = 0, base = AN.pasto, claro = AN.claro, anillos = 0, seed = 1 }) {
  const grupos = { c: '', o: '', m: '' };
  for (const [x, y, a, l] of MECHONES) {
    const d = Math.hypot(x - cx, y - cy);
    const enBanda = Math.abs(d - R) < W / 2, enCafe = cafe > 0 && d < R - W / 2 && d > R - W / 2 - 70 * cafe;
    const k = enBanda ? 'o' : enCafe ? 'm' : 'c';
    const L = enBanda ? l * 1.5 : l, dx = Math.cos(a) * L * 0.5, dy = Math.sin(a) * L * 0.5;
    grupos[k] += `M ${(x - dx).toFixed(0)} ${(y - dy).toFixed(0)} L ${(x + dx).toFixed(0)} ${(y + dy).toFixed(0)} `;
  }
  const n = 16;
  return <g>
    <rect x={-60} y={-60} width={KW + 120} height={KH + 120} fill={base} />
    {anillos > 0 && Array.from({ length: Math.floor(anillos) }, (_, i) => { const r = (R / Math.max(1, anillos)) * (i + 1); return r < R - W / 2 ? <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(31,122,53,.35)" strokeWidth={3} /> : null; })}
    {cafe > 0 && <circle cx={cx} cy={cy} r={R - W / 2 - 35 * cafe} fill="none" stroke={AN.cafe} strokeWidth={70 * cafe} opacity={0.8} />}
    <circle cx={cx} cy={cy} r={R} fill="none" stroke={AN.banda} strokeWidth={W} />
    <path d={grupos.c} stroke={claro} strokeWidth={5} strokeLinecap="round" />
    <path d={grupos.m} stroke={AN.cafe2} strokeWidth={5} strokeLinecap="round" />
    <path d={grupos.o} stroke={AN.oscuro} strokeWidth={7} strokeLinecap="round" />
    {setas > 0 && Array.from({ length: n }, (_, i) => { const a = (i / n) * 6.283 + Math.sin(i * 7.3) * 0.12, rr = R + W * 0.35 + Math.sin(i * 3.1) * 10;
      const k = kclamp(setas * 1.6 - (i / n) * 0.6, 0, 1); if (k <= 0) return null; const s = kEase.rebote(k) * (0.8 + 0.3 * Math.abs(Math.sin(i * 5.7)));
      return <SetaArriba key={i} x={cx + Math.cos(a) * rr} y={cy + Math.sin(a) * rr} s={s * (W / 60)} />; })}
  </g>;
}
// Seta de Marasmius oreades vista desde arriba: sombrero crema/tostado con un bultito más oscuro al centro.
function SetaArriba({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={20} fill="#e3c08c" stroke={KC.ink} strokeWidth={4} />
    <circle r={8} fill="#b9895a" />
  </g>;
}
// Marasmius oreades de perfil (dibujo esquemático): pie delgado y correoso, sombrero acampanado-convexo con bultito,
// color crema/tostado y láminas separadas. Base del pie en (x, y). crece 0..1.
function Marasmius({ x, y, s = 1, crece = 1, rot = 0 }) {
  if (crece <= 0) return null;
  const h = 220 * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = 150 * (0.45 + 0.55 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  const top = -h, cap = `M ${-a / 2} ${top} Q ${-a / 2 + 4} ${top - a * 0.34} ${-a * 0.16} ${top - a * 0.4} Q 0 ${top - a * 0.52} ${a * 0.16} ${top - a * 0.4} Q ${a / 2 - 4} ${top - a * 0.34} ${a / 2} ${top} Q 0 ${top + a * 0.06} ${-a / 2} ${top} Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -7 0 Q -4 ${top * 0.5} -6 ${top} L 6 ${top} Q 4 ${top * 0.5} 7 0 Z`} fill="#f0dcb4" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${-a / 2 + 6} ${top + 1} Q 0 ${top + a * 0.14} ${a / 2 - 6} ${top + 1}`} fill="#f6ead0" stroke={KC.ink} strokeWidth={3} />
    {[-0.36, -0.2, -0.05, 0.1, 0.25, 0.38].map((u, i) => <line key={i} x1={u * a} y1={top + 3} x2={u * a * 0.9} y2={top + a * 0.09} stroke="#c9ab7e" strokeWidth={3} />)}
    <path d={cap} fill="#dfb47c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-a * 0.14} ${top - a * 0.39} Q 0 ${top - a * 0.5} ${a * 0.14} ${top - a * 0.39}`} stroke="#b07f48" strokeWidth={a * 0.09} fill="none" strokeLinecap="round" />
    <path d={`M ${-a * 0.36} ${top - a * 0.12} Q ${-a * 0.3} ${top - a * 0.3} ${-a * 0.14} ${top - a * 0.36}`} stroke="#f3d6a6" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Lepista sordida de perfil (esquemática): sombrero convexo lila-violeta, láminas lilas, pie lila.
function Lepista({ x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const h = 170 * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = 190 * (0.45 + 0.55 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -18 0 L -13 ${-h} L 13 ${-h} L 18 0 Z`} fill="#c3a6d6" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-a / 2 + 6} ${-h + 2} Q 0 ${-h + a * 0.12} ${a / 2 - 6} ${-h + 2}`} fill="#b48bd0" stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${-a / 2} ${-h} Q ${-a / 2} ${-h - a * 0.42} 0 ${-h - a * 0.44} Q ${a / 2} ${-h - a * 0.42} ${a / 2} ${-h} Q 0 ${-h + a * 0.08} ${-a / 2} ${-h} Z`} fill="#8e5fb5" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-a * 0.3} ${-h - a * 0.28} Q 0 ${-h - a * 0.4} ${a * 0.22} ${-h - a * 0.32}`} stroke="#b993d6" strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}
// Espora elipsoidal lisa (esquemática).
function Espora({ x, y, s = 1, rot = 20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={44} ry={26} fill="#fff4d6" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-12} cy={-8} rx={12} ry={6} fill="#fff" opacity=".8" />
  </g>;
}
// Granos de tierra (fondo oscuro).
const GRANOS = (() => { const g = krng(8), o = []; for (let i = 0; i < 60; i++) o.push([g() * KW, 380 + g() * 1100, 14 + g() * 30, g() * 180]); return o; })();
function Granos({ o = 1, color = '#5b3a22' }) {
  return <g opacity={o}>{GRANOS.map(([x, y, r, a], i) => <path key={i} d={`M ${-r} 0 L ${-r * 0.3} ${-r * 0.8} L ${r * 0.7} ${-r * 0.5} L ${r} ${r * 0.3} L 0 ${r * 0.8} Z`} transform={`translate(${x} ${y}) rotate(${a})`} fill={color} stroke="#2a1a10" strokeWidth={3} />)}</g>;
}
// Corte del suelo de lado: cielo arriba (fondo de la escena) y tierra desde sueloY. Pasto en la superficie:
// verde(x) 0..1 = más alto y verde oscuro · seco(x) 0..1 = café y caído.
function Corte({ T, sueloY = 1000, verde = () => 0, seco = () => 0, hojas = 1 }) {
  const briznas = [];
  for (let x = -10; x < KW + 20; x += 13) {
    const v = verde(x), sc = seco(x), h = 70 + v * 80 - sc * 30 + Math.sin(x * 0.37) * 10, sway = mece(T, x * 0.03, 0.4) * 6 + sc * 40;
    const col = sc > 0.05 ? mixHex(AN.pasto, AN.cafe, sc) : mixHex(AN.pasto, AN.oscuro, v);
    briznas.push(<path key={x} d={`M ${x - 5} ${sueloY + 4} Q ${x + sway * 0.4} ${sueloY - h * 0.6} ${x + sway} ${sueloY - h} Q ${x + 2} ${sueloY - h * 0.5} ${x + 5} ${sueloY + 4} Z`} fill={col} stroke={KC.ink} strokeWidth={2.5} />);
  }
  return <g>
    <rect x={-20} y={sueloY} width={KW + 40} height={KH} fill={AN.tierra} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={sueloY + 260} width={KW + 40} height={KH} fill={AN.tierra2} />
    {hojas > 0 && Array.from({ length: 9 }, (_, i) => <path key={i} d="M -26 0 Q 0 -16 26 0 Q 0 12 -26 0 Z" transform={`translate(${60 + i * 120} ${sueloY + 40 + (i % 3) * 38}) rotate(${i * 47}) scale(${hojas})`} fill="#9a5a26" stroke={KC.ink} strokeWidth={3} opacity={hojas} />)}
    {briznas}
  </g>;
}
// Bolita de nitrógeno (amonio) que sube.
function BolaN({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={22} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    <text y={10} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill={KC.ink}>N</text></g>;
}
// Molécula esquemática de AHX (anillo de 6 unido a uno de 5).
function MoleculaAHX({ x, y, s = 1, rot = 0 }) {
  const hex = Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3 + Math.PI / 6; return [Math.cos(a) * 34, Math.sin(a) * 34]; });
  const pen = Array.from({ length: 5 }, (_, i) => { const a = i * 2 * Math.PI / 5 + Math.PI; return [62 + Math.cos(a) * 30, Math.sin(a) * 30]; });
  const p = (pts) => 'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={p(hex)} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={p(pen)} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[hex[0], hex[3], pen[2]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9} fill={i === 2 ? KC.blue : KC.pink} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Matraz.
function Matraz({ x, y, s = 1, nivel = 0.5 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -220 L -40 -120 L -130 40 Q -140 70 -110 70 L 110 70 Q 140 70 130 40 L 40 -120 L 40 -220 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-130 + 90 * (1 - nivel)} ${70 - 150 * nivel} L ${130 - 90 * (1 - nivel)} ${70 - 150 * nivel} L 130 40 Q 140 70 110 70 L -110 70 Q -140 70 -130 40 Z`} fill="#c7a5e8" opacity=".9" />
    <rect x={-52} y={-240} width={104} height={26} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Brillito de "hada".
function Brillo4({ x, y, s = 1, o = 1, rot = 0 }) {
  return <path d="M 0 -30 Q 4 -4 30 0 Q 4 4 0 30 Q -4 4 -30 0 Q -4 -4 0 -30 Z" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill="#fff7b0" stroke={KC.gold} strokeWidth={3} opacity={o} style={{ filter:'drop-shadow(0 0 10px #fff3a0)' }} />;
}
// Flechas hacia afuera alrededor de un círculo.
function FlechasAfuera({ cx, cy, r, n = 8, o = 1, color = KC.white, largo = 70 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const a = (i / n) * 6.283 + 0.2; const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r, x2 = cx + Math.cos(a) * (r + largo), y2 = cy + Math.sin(a) * (r + largo);
    const hx = Math.cos(a + 2.6) * 22, hy = Math.sin(a + 2.6) * 22, h2x = Math.cos(a - 2.6) * 22, h2y = Math.sin(a - 2.6) * 22;
    return <g key={i}><path d={`M ${x1} ${y1} L ${x2} ${y2} M ${x2 + hx} ${y2 + hy} L ${x2} ${y2} L ${x2 + h2x} ${y2 + h2y}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x1} ${y1} L ${x2} ${y2} M ${x2 + hx} ${y2 + hy} L ${x2} ${y2} L ${x2 + h2x} ${y2 + h2y}`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}</g>;
}
// Viñeta de cuento (folclor): tarjeta de papel con un dibujito.
function Vineta({ T, at, x, y, w = 600, h = 200, texto, sub, dibujo }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, e)}) rotate(${-2 + (x % 3)})`} opacity={kprog(T, at, at + 0.2)}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2 + 14} y={-h / 2 + 14} width={h - 28} height={h - 28} rx={14} fill="#2b2050" />
    <g transform={`translate(${-w / 2 + h / 2} 0)`}>{dibujo}</g>
    <text x={-w / 2 + h + 10} y={sub ? -8 : 14} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {sub && <text x={-w / 2 + h + 10} y={40} style={{ font:`700 28px ${KF.mono}` }} fill="#5a524a">{sub}</text>}
  </g>;
}
// Persona de pie (de lado, para escala).
function Personita({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-21} r={4.5} fill={KC.ink} /><path d="M 0 -16 L 0 -6 M -5 -12 L 5 -12 M 0 -6 L -4 0 M 0 -6 L 4 0" stroke={KC.ink} strokeWidth={2.4} strokeLinecap="round" />
  </g>;
}
// Suelas de dos zapatos vistas desde arriba (el espectador parado en el pasto).
function Pies({ x, y, s = 1, o = 1 }) {
  const suela = (dx, r) => <g transform={`translate(${dx} 0) rotate(${r})`}><path d="M -34 -90 Q -40 -130 0 -132 Q 40 -130 34 -90 L 30 40 Q 28 80 0 82 Q -28 80 -30 40 Z" fill="#2c3e8f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -18 -110 L 18 -110 M -20 -70 L 20 -70 M -20 -30 L 20 -30" stroke="#fff" strokeWidth={6} strokeLinecap="round" /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{suela(-55, -8)}{suela(55, 8)}</g>;
}

function AnilloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Es: CUES.Espora, Mi: CUES.Micelio, Ce: CUES.Centro, V: CUES.Verde, Ca: CUES.Cafe, S: CUES.Setas, P: CUES.Pregunta, E: CUES.Estudio, Ed: CUES.Edad, J: CUES.Japon, F: CUES.Folclor, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el anillo empieza a empujar hacia afuera
  const Rg = 250 + 40 * kprog(T, K.G + 2.4, K.Es + 0.4, kEase.suave);
  // micelio y centro (vista de arriba, fondo oscuro)
  const gMi = kprog(T, K.Mi - 0.3, K.Ce + 0.4, kEase.suave);
  const rBorde = klerp(330, 400, kprog(T, K.Ce + 0.3, K.V, kEase.suave));
  // verde: el frente avanza a la derecha
  const fr = klerp(330, 720, kprog(T, K.V + 0.2, K.Ca - 0.2, kEase.suave));
  // café: el pasto encima del micelio se seca
  const seco = kprog(T, K.Ca + 0.8, K.Ca + 2.6, kEase.suave);
  // edad: el anillo se llena hacia afuera
  const uEd = kprog(T, K.Ed + 0.2, K.J - 0.4, kEase.sale);
  const yAHX = kprog(T, K.J + 3.0, K.J + 4.2, kEase.sale), creceJ = kprog(T, K.J + 4.0, K.F - 0.4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el círculo del parque; las "hadas" se apagan y el anillo empuja hacia afuera */}
      <Escena T={T} a={K.G} b={K.Es} zoom={0.12} origen="50% 46%">
        {fsvg(<>
          <Cesped T={T} R={Rg} setas={kprog(T, K.G - 0.5, K.G + 0.6)} />
          {Array.from({ length: 7 }, (_, i) => { const a = T * 1.6 + i * 0.9, o = 1 - kprog(T, K.G + 1.4, K.G + 1.9); return o > 0 ? <Brillo4 key={i} x={540 + Math.cos(a) * 250} y={880 + Math.sin(a) * 250 - 40 - Math.abs(Math.sin(T * 5 + i)) * 40} s={0.8 + 0.3 * Math.sin(T * 6 + i)} rot={T * 90} o={o} /> : null; })}
          <Sello T={T} at={K.G + 1.4} x={540} y={880} texto="NO" color={KC.red} r={100} />
          <FlechasAfuera cx={540} cy={880} r={Rg + 40} o={kprog(T, K.G + 2.4, K.G + 2.8)} />
        </>)}
      </Escena>
      {/* 2 · la espora cae y germina (fondo oscuro, corte de suelo) */}
      <Escena T={T} a={K.Es} b={K.Mi} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Granos o={0.9} />
          {(() => { const c = kprog(T, K.Es + 0.1, K.Es + 1.3, kEase.sale); const y = klerp(380, 860, c), x = 540 + Math.sin(T * 3) * 30 * (1 - c);
            const tubo = kprog(T, K.Es + 1.7, K.Mi + 0.3, kEase.sale);
            return <g>{tubo > 0 && <path d={`M ${x + 40} ${y + 6} Q ${x + 90} ${y + 40} ${x + 60 + 120 * tubo} ${y + 20 + 60 * tubo}`} stroke={FK.hifa} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${tubo * 260} 999`} />}
              <Espora x={x} y={y} s={1.3} rot={20 + (1 - c) * 120} /></g>; })()}
        </>)}
      </Escena>
      {/* 3–4 · el micelio se abre en todas direcciones; adentro se acaba la comida y el borde avanza */}
      <Escena T={T} a={K.Mi} b={K.V} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Granos o={0.6 * (1 - kprog(T, K.Ce, K.Ce + 0.8))} />
          {T > K.Ce - 0.2 && <circle cx={540} cy={880} r={rBorde - 40} fill="#4b4f59" opacity={0.75 * kprog(T, K.Ce + 0.2, K.Ce + 1.2)} />}
          <RedHifas T={T} x={540} y={880} g={T < K.Ce ? gMi : 1} seed={21} n={420} escala={T < K.Ce ? 0.13 : klerp(0.13, 0.155, kprog(T, K.Ce + 0.3, K.V))} circ ancho={3} brillo={0.6} />
          {T > K.Ce - 0.2 && <circle cx={540} cy={880} r={rBorde} fill="none" stroke={KC.gold2} strokeWidth={34} opacity={0.85 * kprog(T, K.Ce + 0.6, K.Ce + 1.4)} style={{ filter:`drop-shadow(0 0 16px ${KC.gold})` }} />}
          {T < K.Ce + 0.4 && <Espora x={540} y={880} s={0.5} />}
          <FlechasAfuera cx={540} cy={880} r={rBorde + 26} o={kprog(T, K.Ce + 1.6, K.Ce + 2.0)} color={KC.gold2} largo={60} />
        </>)}
      </Escena>
      {/* 5 · el borde suelta nitrógeno: el pasto se pone más verde (corte de lado) */}
      <Escena T={T} a={K.V} b={K.Ca} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Corte T={T} sueloY={920} verde={(x) => kclamp((x - (fr - 330)) / 60, 0, 1) * kclamp((fr + 20 - x) / 60, 0, 1) * kprog(T, K.V + 1.0, K.V + 2.0)} hojas={1} />
          {Array.from({ length: 9 }, (_, i) => { const hx = 60 + i * 120; const ido = kprog(T, K.V + 0.2 + (hx - 330) / 390 * 2.8, K.V + 1.0 + (hx - 330) / 390 * 2.8); return ido > 0 && hx > 300 ? <circle key={i} cx={hx} cy={960 + (i % 3) * 38} r={34} fill={AN.tierra} opacity={ido} /> : null; })}
          <RedHifas T={T} x={fr - 200} y={930} g={1} seed={5} n={320} escala={0.12} ancho={3} brillo={0.5} />
          <rect x={fr - 40} y={932} width={60} height={230} fill={KC.gold2} opacity={0.25 + 0.15 * Math.sin(T * 6)} rx={24} />
          {Array.from({ length: 8 }, (_, i) => { const u = ((T - K.V - 1.2) * 0.55 + i / 8) % 1; return T > K.V + 1.2 ? <BolaN key={i} x={fr - 220 + (i % 4) * 60} y={1130 - u * 190} s={0.8 * Math.sin(Math.PI * u) + 0.2} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · en otros, el micelio repele el agua: el pasto se seca */}
      <Escena T={T} a={K.Ca} b={K.S} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Corte T={T} sueloY={920} seco={(x) => (x > 260 && x < 820 ? seco : 0)} hojas={0.6} />
          <path d={'M 250 960 ' + Array.from({ length: 12 }, (_, i) => `L ${250 + i * 52} ${958 + Math.sin(i * 1.7) * 8}`).join(' ') + ' L 830 960 Q 850 1010 830 1060 ' + Array.from({ length: 12 }, (_, i) => `L ${830 - i * 52} ${1060 + Math.sin(i * 2.3) * 12}`).join(' ') + ' Q 230 1010 250 960 Z'} fill="rgba(255,244,214,.82)" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Ca, K.Ca + 0.6)} />
          <RedHifas T={T} x={540} y={1010} g={1} seed={9} n={260} escala={0.07} ancho={2.5} color="#b89a6a" circ />
          {Array.from({ length: 22 }, (_, i) => { const x = 40 + (i * 97) % 1000, t0 = K.Ca + 0.2 + (i % 7) * 0.25, ciclo = 1.3; if (T < t0) return null; const u = ((T - t0) % ciclo) / ciclo;
            const sobre = x > 260 && x < 820, yStop = sobre ? 935 : 1080, y = klerp(380, yStop + 20, Math.min(1, u * 1.25));
            const reb = u > 0.8 && sobre ? (u - 0.8) * 5 : 0;
            return <ellipse key={i} cx={x + reb * 30} cy={y - reb * 50} rx={11} ry={18} fill="#8fd8ff" stroke={KC.ink} strokeWidth={3} opacity={u > 0.8 && !sobre ? 1 - (u - 0.8) * 5 : 1} />; })}
        </>)}
      </Escena>
      {/* 7 · con las lluvias brotan las setas en el borde */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[[200, 470, 1], [560, 430, 1.2], [880, 480, 0.9]].map(([x, y, s], i) => <g key={i} transform={`translate(${x + Math.sin(T + i) * 14} ${y}) scale(${s})`} opacity={1 - kprog(T, K.S + 2.0, K.S + 2.8)}><path d="M -110 30 Q -120 -30 -60 -30 Q -40 -80 10 -70 Q 60 -100 90 -40 Q 140 -40 120 30 Z" fill="#eef4ff" stroke={KC.ink} strokeWidth={7} /></g>)}
          {T < K.S + 2.6 && Array.from({ length: 16 }, (_, i) => { const u = ((T * 1.3 + i * 0.37) % 1); return <line key={i} x1={80 + i * 62} y1={520 + u * 400} x2={74 + i * 62} y2={556 + u * 400} stroke="#4aa3ff" strokeWidth={6} strokeLinecap="round" opacity={0.8} />; })}
          <Corte T={T} sueloY={1080} verde={(x) => 0.4} hojas={0.4} />
          <Marasmius x={250} y={1084} s={0.8} crece={kprog(T, K.S + 0.6, K.S + 1.6)} rot={-6} />
          <Marasmius x={470} y={1086} s={1.25} crece={kprog(T, K.S + 0.9, K.S + 2.0)} rot={3} />
          <Marasmius x={690} y={1084} s={0.95} crece={kprog(T, K.S + 1.2, K.S + 2.2)} rot={8} />
          <Marasmius x={880} y={1086} s={0.7} crece={kprog(T, K.S + 1.5, K.S + 2.5)} rot={-4} />
        </>)}
      </Escena>
      {/* 8 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        {fsvg(<><Cesped T={T} R={300} setas={1} /><Interrogacion T={T} x={300} y={1100} /></>)}
      </Escena>
      {/* 9 · el estudio de 1917: pradera de Colorado con anillos; avanzan ~12 cm al año */}
      <Escena T={T} a={K.E} b={K.Ed} zoom={0.04}>
        {fsvg(<>
          <rect x={0} y={0} width={KW} height={KH} fill={AN.pradera} />
          {Array.from({ length: 300 }, (_, i) => { const g = Math.sin(i * 12.9898) * 43758.5453, x = (g - Math.floor(g)) * KW, y = 380 + ((i * 97) % 1100); return <path key={i} d={`M ${x} ${y} l 8 -14 M ${x + 6} ${y} l -4 -12`} stroke="#9fb34a" strokeWidth={4} strokeLinecap="round" />; })}
          {[[240, 1030, 120, 0, 6.28], [760, 760, 190, 0.6, 4.8], [520, 1300, 90, 0, 6.28], [880, 1180, 130, 2.2, 5.6]].map(([x, y, r, a0, a1], i) => {
            const d = `M ${x + Math.cos(a0) * r} ${y + Math.sin(a0) * r} A ${r} ${r} 0 ${a1 - a0 > 3.14 ? 1 : 0} 1 ${x + Math.cos(a1) * r} ${y + Math.sin(a1) * r}`;
            return <path key={i} d={d} stroke={AN.oscuro} strokeWidth={30} fill="none" strokeLinecap="round" opacity={kprog(T, K.E + 0.3 + i * 0.2, K.E + 0.8 + i * 0.2)} />; })}
          {(() => { const m = kprog(T, K.E + 2.8, K.E + 4.0, kEase.sale); return m > 0 ? <g>
            <circle cx={240} cy={1030} r={120} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="16 12" opacity={m} />
            <path d={`M 360 1030 L ${360 + 160 * m} 1030`} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
            <path d={`M 360 1030 L ${360 + 160 * m} 1030`} stroke={KC.yellow} strokeWidth={16} strokeLinecap="round" />
            {Array.from({ length: 6 }, (_, k) => <line key={k} x1={360 + k * 30} y1={1018} x2={360 + k * 30} y2={1042} stroke={KC.ink} strokeWidth={4} opacity={k * 30 < 160 * m ? 1 : 0} />)}
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 10 · la imagen que se llena: el anillo crece año tras año hasta 60 m */}
      <Escena T={T} a={K.Ed} b={K.J} zoom={0.02}>
        {fsvg(<>
          <Cesped T={T} cy={930} R={20 + 360 * uEd} W={20 + 30 * uEd} anillos={uEd * 25} base={AN.pradera} claro="#a8bf4e" />
          <Personita x={540 + 20 + 360 * uEd + 40} y={930} s={1.6} />
        </>)}
      </Escena>
      {/* 11 · Japón, 2010: Lepista sordida suelta una sustancia que hace crecer el pasto */}
      <Escena T={T} a={K.J} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={-20} y={1120} width={KW + 40} height={900} fill={AN.tierra} stroke={KC.ink} strokeWidth={8} />
          <Lepista x={230} y={1124} s={1.3} crece={kprog(T, K.J + 2.6, K.J + 3.4)} />
          <Matraz x={560} y={1050} s={0.9} nivel={0.45 + 0.05 * Math.sin(T * 3)} />
          {yAHX > 0 && <MoleculaAHX x={klerp(560, 830, yAHX)} y={klerp(900, 1060, yAHX) - Math.sin(Math.PI * yAHX) * 120} s={0.9} rot={T * 40} />}
          {[770, 810, 850, 890, 930].map((x, i) => { const h = 60 + 150 * creceJ * (1 - Math.abs(i - 2) * 0.15); return <path key={i} d={`M ${x - 9} 1124 Q ${x + mece(T, i, 0.5) * 6} ${1124 - h * 0.6} ${x + mece(T, i, 0.5) * 12} ${1124 - h} Q ${x + 3} ${1124 - h * 0.5} ${x + 9} 1124 Z`} fill={mixHex(AN.pasto, AN.oscuro, creceJ)} stroke={KC.ink} strokeWidth={3} />; })}
        </>)}
      </Escena>
      {/* 12 · el folclor: hadas, el diablo batiendo mantequilla, un dragón descansando */}
      <Escena T={T} a={K.F} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Vineta T={T} at={K.F + 0.2} x={400} y={560} texto="hadas bailando" dibujo={<g>{Array.from({ length: 5 }, (_, i) => { const a = T * 2 + i * 1.256; return <Brillo4 key={i} x={Math.cos(a) * 46} y={Math.sin(a) * 46} s={0.6} rot={T * 80} />; })}</g>} />
          <Vineta T={T} at={K.F + 1.3} x={400} y={800} texto="el diablo" sub="mantequera · Holanda" dibujo={<g>
            <rect x={-12} y={-20} width={44} height={70} rx={8} fill="#c98b2b" stroke={KC.ink} strokeWidth={4} /><line x1={10} y1={-20} x2={10 + Math.sin(T * 8) * 6} y2={-60} stroke={KC.ink} strokeWidth={6} />
            <circle cx={-34} cy={-22} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><path d="M -48 -36 L -52 -56 L -40 -40 M -22 -38 L -16 -58 L -28 -40" fill={KC.red} stroke={KC.ink} strokeWidth={3} />
            <path d="M -50 0 Q -34 -6 -18 0 L -18 50 L -50 50 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>} />
          <Vineta T={T} at={K.F + 2.4} x={400} y={1040} texto="un dragón" sub="Alemania" dibujo={<g style={{ filter:'drop-shadow(0 0 10px #ffd34d)' }}>
            <path d="M -66 30 Q -40 -20 0 0 Q 30 -30 56 -10 Q 70 0 60 12 L 30 14 Q 10 40 -30 36 Q -50 50 -66 30 Z" fill="#59c26a" stroke={KC.ink} strokeWidth={4} />
            <circle cx={46} cy={-4} r={4} fill={KC.ink} /><path d="M -20 -2 L -14 -18 L -8 -2 M 0 -6 L 6 -22 L 12 -6" fill="#ffd34d" stroke={KC.ink} strokeWidth={3} /></g>} />
          <Sello T={T} at={K.F + 3.6} x={820} y={860} texto="HONGO" color={KC.ink} r={120} rot={10} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo pasto del inicio, ahora con un anillo enorme y tú parado encima */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        {fsvg(<>
          <Cesped T={T} cx={540} cy={880} R={klerp(290, 470, kprog(T, K.C, K.C + 2.0, kEase.suave))} W={74} setas={1} anillos={18} />
          <Pies x={540} y={1110} s={0.75} o={kprog(T, K.C + 1.4, K.C + 1.9)} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.6} until={K.Ou - 0.2} x={300} y={640} r={190} fx={170} fy={1180} etiqueta="RAYOS X · bajo el pasto" tinte={KC.yellow}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a1a10" /><RedHifas T={t} x={r * 1.6} y={r * 1.7} g={1} seed={21} n={300} escala={0.16} circ ancho={3} brillo={0.6} /></svg>} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.G + 2.3} texto="¿anillo de hadas?" x={330} y={470} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.G + 2.5} until={K.Es - 0.3} texto="es un hongo" x={330} y={470} tam={48} borde={KC.leaf} />
      <Etq T={T} at={K.Es + 1.2} until={K.Mi - 0.3} x={620} y={780} texto="espora" tam={36} color={KC.yellow} />
      <Etq T={T} at={K.Mi + 0.8} until={K.Ce - 0.3} x={60} y={1540} texto="micelio (hifas)" tam={34} color={FK.hifa} />
      <Etq T={T} at={K.Ce + 1.0} until={K.V - 0.3} x={540} y={880} texto="comida agotada" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ce + 1.5} until={K.V - 0.3} x={60} y={420} texto="borde vivo" tam={36} color={KC.gold2} />
      <Chip T={T} at={K.V + 0.3} until={K.Ca - 0.3} texto="tipo II · anillo verde" x={360} y={470} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.V + 1.6} until={K.Ca - 0.3} x={60} y={1540} texto="nitrógeno (amonio)" tam={32} color={KC.cyan} />
      <Chip T={T} at={K.Ca + 0.3} until={K.S - 0.3} texto="tipo I · anillo café" x={360} y={470} tam={40} borde={AN.cafe} />
      <Etq T={T} at={K.Ca + 1.0} until={K.S - 0.3} x={60} y={1540} texto="micelio que repele el agua" tam={30} color="#fff4d6" />
      <Chip T={T} at={K.S + 0.3} until={K.P - 0.3} texto="tipo III · anillo de setas" x={380} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.S + 2.0} until={K.P - 0.3} x={60} y={600} texto="Marasmius oreades" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.S + 2.4} until={K.P - 0.3} x={60} y={660} texto="“hongo de los anillos”" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.5} anio="1917" quien="este de Colorado · Shantz y Piemeisel" revista="Journal of Agricultural Research" y={640} />
      <Chip T={T} at={K.E + 3.4} until={K.Ed - 0.3} texto="≈ 12 cm por año (promedio estimado)" x={540} y={1520} tam={34} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.Ed + 0.2} until={K.J - 0.3} valor={250} dur={K.J - 0.6 - K.Ed} sufijo=" años" x={330} y={470} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.Ed + 0.6} until={K.J - 0.3} texto={`${Math.round(60 * uEd)} m de ancho`} x={300} y={620} tam={36} borde={KC.gold} mono />
      <Chip T={T} at={K.Ed + 2.4} until={K.J - 0.3} texto="estimación" x={540} y={1520} tam={30} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.J + 0.2} until={K.J + 2.5} anio="2010" quien="Universidad de Shizuoka, Japón" revista="ChemBioChem, 2010" y={640} />
      <Etq T={T} at={K.J + 3.0} until={K.F - 0.3} x={60} y={760} texto="Lepista sordida" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.J + 3.4} until={K.F - 0.3} texto="AHX (2-azahipoxantina)" x={540} y={1520} tam={34} borde={KC.violet} />
      <Chip T={T} at={K.F + 0.3} until={K.C - 0.3} texto="folclor europeo" x={330} y={400} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="años, o siglos" x={540} y={1520} tam={40} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Es} texto="1 m" largo={120} />
      <BarraEscala T={T} at={K.Es} until={K.Mi} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.Mi} until={K.V} texto="1 cm" largo={150} />
      <BarraEscala T={T} at={K.V} until={K.S} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.S} until={K.P} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="1 m" largo={120} />
      <BarraEscala T={T} at={K.E} until={K.Ed} texto="10 m" largo={140} />
      <BarraEscala T={T} at={K.Ed} until={K.J} texto="10 m" largo={140} />
      <BarraEscala T={T} at={K.J} until={K.F} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m" largo={120} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Es - 0.1} texto="No es de hadas: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Es + 0.1} until={K.Mi - 0.1} texto="Empieza con *una espora.*" />
      <Subtitulo T={T} idx={2} at={K.Mi + 0.1} until={K.Ce - 0.1} texto="El micelio se abre *en todas direcciones.*" />
      <Subtitulo T={T} idx={3} at={K.Ce + 0.1} until={K.V - 0.1} texto="El borde vivo *avanza hacia afuera.*" />
      <Subtitulo T={T} idx={4} at={K.V + 0.1} until={K.Ca - 0.1} texto="Suelta nitrógeno: *pasto más verde.*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.S - 0.1} texto="Repele el agua: *anillo café.*" />
      <Subtitulo T={T} idx={6} at={K.S + 0.1} until={K.P - 0.1} texto="Con las lluvias, *brotan setas.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuántos años *tiene un anillo?*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ed - 0.1} texto="1917: *unos 12 cm al año.*" />
      <Subtitulo T={T} idx={9} at={K.Ed + 0.1} until={K.J - 0.1} texto="60 metros: *unos 250 años.*" />
      <Subtitulo T={T} idx={10} at={K.J + 0.1} until={K.F - 0.1} texto="Una sustancia que *hace crecer el pasto.*" />
      <Subtitulo T={T} idx={11} at={K.F + 0.1} until={K.C - 0.1} texto="Hadas, diablo, *dragón…*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Años, o siglos, *bajo tus pies.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Mi + 0.5, K.Ce - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.V + 0.5, K.Ca - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ca + 0.5, K.S - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.E + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.7, K.Ed - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ed + 0.4, K.J - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.J + 2.7, K.F - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.F + 0.5, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="21" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AnilloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AnilloShot /></CompositionStage></div>;
}
window.AnilloApp = AnilloApp;
