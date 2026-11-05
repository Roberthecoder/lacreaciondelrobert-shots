// Shot Fungi Mati #151 · Ese olor a champiñón no es tierra: es sobre todo una molécula — NARRADO (N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (moléculas, enzimas, nariz y ácaro no van a escala entre escenas).

const OH = { tabla:'#d9a25e', tabla2:'#b9803e', tabla3:'#8a5a2b', hoja:'#dfe6ea', mango:'#2b2b33', oro:'#ffd34d', carbono:'#2a2622',
  oxi:'#ff3b2f', hifa:'#eafff7', hifa2:'#a8d8c6', linol:'#c9c2b0', seta:'#efe2c4', seta2:'#cdb68a', acaro:'#f5efe2' };

// Tabla de picar (vista de frente, un poco desde arriba). Superficie en y.
function Tabla({ x = 120, y = 1060, w = 840, h = 150 }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={26} fill={OH.tabla} stroke={KC.ink} strokeWidth={8} />
    <rect x={x} y={y + h - 34} width={w} height={34} rx={14} fill={OH.tabla2} stroke={KC.ink} strokeWidth={6} />
    {[0.25, 0.5, 0.75].map((k, i) => <path key={i} d={`M ${x + 40} ${y + 30 + i * 30} Q ${x + w * k} ${y + 18 + i * 30} ${x + w - 40} ${y + 34 + i * 30}`} stroke={OH.tabla2} strokeWidth={4} fill="none" />)}
    <circle cx={x + w - 50} cy={y + 50} r={16} fill={OH.tabla3} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Cuchillo: punta del filo en (x, y), hoja vertical hacia arriba.
function Cuchillo({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 L -10 -40 L -10 -330 L 70 -330 L 70 -60 Q 50 -10 0 0 Z" fill={OH.hoja} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 52 -300 L 52 -80" stroke="#fff" strokeWidth={8} opacity=".6" strokeLinecap="round" />
    <rect x={-18} y={-520} width={96} height={200} rx={22} fill={OH.mango} stroke={KC.ink} strokeWidth={7} />
    {[-480, -400].map((yy) => <circle key={yy} cx={30} cy={yy} r={9} fill="#b9b9c4" />)}
  </g>;
}
// Champiñón cortado: dos mitades separadas por el corte en x = cx (coordenadas de pantalla).
function ChampiCortado({ id, x, y, s, cx, sep = 0, cortes = [] }) {
  const bordes = [-2000, ...cortes, 4000];
  return <g>
    <defs>{bordes.slice(0, -1).map((b, i) => <clipPath key={i} id={`${id}${i}`}><rect x={b} y={-2000} width={bordes[i + 1] - b} height={6000} /></clipPath>)}</defs>
    {bordes.slice(0, -1).map((b, i) => <g key={i} transform={`translate(${i * sep} 0)`}>
      <g clipPath={`url(#${id}${i})`}><Champinon x={x} y={y} s={s} /></g>
      {i > 0 && sep > 0.5 && <rect x={b - 4} y={y - 330 * s / 1.6} width={10} height={330 * s / 1.6} fill="#f6eedf" opacity={Math.min(1, sep / 10)} />}
    </g>)}
  </g>;
}
// Rayitas de olor que suben ondulando desde (x, y). o = opacidad.
function Rayitas({ T, x, y, n = 3, o = 1, color = KC.ink, alto = 170, sep = 46, grosor = 9 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const dx = (i - (n - 1) / 2) * sep, f = (T * 0.8 + i * 0.33) % 1;
    const yy = y - f * 60, a = 1 - f * 0.6;
    return <path key={i} d={`M ${x + dx} ${yy} q 18 ${-alto * 0.25} 0 ${-alto * 0.5} q -18 ${-alto * 0.25} 0 ${-alto * 0.5}`} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" opacity={a} />; })}</g>;
}
// Molécula de 1-octen-3-ol (esqueleto en zigzag de 8 carbonos, doble enlace C1=C2, –OH en C3 con cuña).
// espejo = la imagen en el espejo (el otro enantiómero). Centro aproximado en (x, y).
function Octenol({ x, y, s = 1, espejo = false, color = OH.oro, brillo = 0, p = 1 }) {
  const sx = espejo ? -1 : 1, P = Array.from({ length: 8 }, (_, i) => [(-175 + i * 50) * sx, i % 2 ? -22 : 22]);
  const k = Math.ceil(8 * p);
  const c3 = P[2], oh = [c3[0], c3[1] + 78];
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${16 * brillo}px ${color})` } : null}>
    {P.slice(0, k).map((q, i) => i ? <line key={'l' + i} x1={P[i - 1][0]} y1={P[i - 1][1]} x2={q[0]} y2={q[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /> : null)}
    {P.slice(0, k).map((q, i) => i ? <line key={'m' + i} x1={P[i - 1][0]} y1={P[i - 1][1]} x2={q[0]} y2={q[1]} stroke={color} strokeWidth={5} strokeLinecap="round" /> : null)}
    {k >= 2 && <line x1={P[0][0] + 4 * sx} y1={P[0][1] - 14} x2={P[1][0] - 2 * sx} y2={P[1][1] - 2} stroke={color} strokeWidth={5} strokeLinecap="round" transform="translate(0 0)" />}
    {k >= 3 && <path d={`M ${c3[0]} ${c3[1]} L ${oh[0] - 11} ${oh[1] - 16} L ${oh[0] + 11} ${oh[1] - 16} Z`} fill={KC.ink} />}
    {k >= 3 && <><circle cx={oh[0]} cy={oh[1]} r={22} fill={OH.oxi} stroke={KC.ink} strokeWidth={5} />
      <circle cx={oh[0] + 26 * sx} cy={oh[1] + 16} r={12} fill="#fff" stroke={KC.ink} strokeWidth={4} /></>}
    {P.slice(0, k).map((q, i) => <circle key={'c' + i} cx={q[0]} cy={q[1]} r={13} fill={OH.carbono} stroke={color} strokeWidth={4} />)}
  </g>;
}
// Cadena de ácido linoleico (18 carbonos, esquemática). corte 0..1 = se separan C1–C10 y C11–C18; sube = el pedazo de 8 se va.
// oxigeno 0..1 = aparece el –OOH en el C10. Coordenadas: C1 en (x, y).
function Linoleico({ T, x, y, paso = 46, oxigeno = 0, corte = 0, sube = 0, oro = 0, fuera = 0 }) {
  const P = Array.from({ length: 18 }, (_, i) => [x + i * paso, y + (i % 2 ? -18 : 18)]);
  const izq = P.slice(0, 10), der = P.slice(10);
  const dx = corte * 30, dy = -sube * 380, rot = sube * -8;
  const linea = (pts, c, w) => pts.map((q, i) => i ? <line key={i} x1={pts[i - 1][0]} y1={pts[i - 1][1]} x2={q[0]} y2={q[1]} stroke={c} strokeWidth={w} strokeLinecap="round" /> : null);
  const bolitas = (pts, c) => pts.map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={11} fill={OH.carbono} stroke={c} strokeWidth={4} />);
  const colDer = mixHex(OH.linol, OH.oro, oro);
  return <g>
    <g>{corte < 0.05 && <><line x1={P[9][0]} y1={P[9][1]} x2={P[10][0]} y2={P[10][1]} stroke={KC.ink} strokeWidth={9} /><line x1={P[9][0]} y1={P[9][1]} x2={P[10][0]} y2={P[10][1]} stroke={OH.linol} strokeWidth={4} /></>}
      {linea(izq, KC.ink, 9)}{linea(izq, OH.linol, 4)}{bolitas(izq, OH.linol)}
      {/* –COOH en C1 */}
      <circle cx={x - 40} cy={y - 22} r={15} fill={OH.oxi} stroke={KC.ink} strokeWidth={4} /><circle cx={x - 40} cy={y + 30} r={15} fill={OH.oxi} stroke={KC.ink} strokeWidth={4} />
      <line x1={x} y1={y + 18} x2={x - 28} y2={y - 14} stroke={KC.ink} strokeWidth={6} /><line x1={x} y1={y + 18} x2={x - 28} y2={y + 30} stroke={KC.ink} strokeWidth={6} />
      {/* –OOH en C10 (lo pega la enzima 1) */}
      {oxigeno > 0 && <g transform={`translate(${P[9][0]} ${P[9][1]})`} opacity={kclamp(oxigeno * 2, 0, 1)}>
        <line x1={0} y1={0} x2={0} y2={-48 * oxigeno} stroke={KC.ink} strokeWidth={6} />
        <circle cx={0} cy={-56 * kEase.rebote(oxigeno)} r={16} fill={OH.oxi} stroke={KC.ink} strokeWidth={4} />
        <circle cx={22} cy={-92 * kEase.rebote(oxigeno)} r={16} fill={OH.oxi} stroke={KC.ink} strokeWidth={4} />
      </g>}
    </g>
    <g opacity={1 - fuera} transform={`translate(${dx} ${dy}) rotate(${rot} ${P[13][0]} ${P[13][1]})`} style={oro > 0 ? { filter:`drop-shadow(0 0 ${18 * oro}px ${OH.oro})` } : null}>
      {linea(der, KC.ink, 9)}{linea(der, colDer, 4)}{bolitas(der, colDer)}
    </g>
  </g>;
}
// Enzima esquemática (tijera/boca). (x, y) centro; abre 0..1.
function Enzima({ x, y, s = 1, color = KC.pink, abre = 0.5, rot = 0 }) {
  const a = 20 + abre * 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a * Math.PI / 180) * 90} ${-Math.sin(a * Math.PI / 180) * 90} A 90 90 0 1 0 ${Math.cos(a * Math.PI / 180) * 90} ${Math.sin(a * Math.PI / 180) * 90} Z`}
      fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-26} cy={-38} r={10} fill={KC.ink} />
  </g>;
}
// Hifas del sombrero en corte: hileras de células alargadas; las del medio, rotas por el filo (x = xc).
function HifasCorte({ T, xc = 540, y0 = 600, rota = 1 }) {
  const filas = [0, 1, 2, 3];
  return <g>{filas.map((f) => { const y = y0 + f * 95, off = (f % 2) * 90;
    return Array.from({ length: 7 }, (_, i) => { const x = -60 + off + i * 190; const cerca = Math.abs(x + 85 - xc) < 120; const roto = cerca && rota > 0;
      return <g key={f + '-' + i} transform={roto ? `translate(${(x + 85 < xc ? -1 : 1) * 14 * rota} 0)` : ''}>
        <rect x={x} y={y} width={170} height={74} rx={36} fill="rgba(234,255,247,.12)" stroke={OH.hifa} strokeWidth={5} strokeDasharray={roto ? '40 18' : 'none'} />
        <circle cx={x + 85} cy={y + 37} r={11} fill={OH.hifa2} opacity=".8" />
      </g>; }); })}
    {rota > 0 && <path d={`M ${xc - 6} ${y0 - 30} L ${xc + 12} ${y0 + 120} L ${xc - 10} ${y0 + 230} L ${xc + 8} ${y0 + 400}`} stroke={OH.oxi} strokeWidth={6} fill="none" strokeDasharray="16 12" opacity={rota} />}
  </g>;
}
// Nariz caricatura de perfil (mira a la derecha). aspira 0..1.
function Nariz({ x, y, s = 1, aspira = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -260 Q -40 -250 20 -60 Q 60 40 10 70 Q -30 90 -80 60 L -140 60 L -140 -260 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={-28} cy={52} rx={22 + aspira * 6} ry={12 + aspira * 4} fill="#7a3a2a" />
    <path d="M -60 20 Q -20 0 0 30" stroke="#c98a6b" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Vaso de 1 L con unos puntitos (pocas moléculas). Base en (x, y).
function Vaso({ T, x, y, w = 240, h = 330, puntos = 6 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} ${-h} L ${-w / 2 + 22} 0 L ${w / 2 - 22} 0 L ${w / 2} ${-h} Z`} fill="rgba(160,220,255,.35)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w / 2 + 8} ${-h * 0.82} L ${w / 2 - 8} ${-h * 0.82}`} stroke="#6fc3ff" strokeWidth={6} />
    {Array.from({ length: puntos }, (_, i) => <circle key={i} cx={Math.sin(i * 2.3 + T * 0.6) * w * 0.3} cy={-h * 0.15 - ((i * 0.37 + T * 0.05) % 1) * h * 0.6} r={7} fill={OH.oro} stroke={KC.ink} strokeWidth={2} />)}
    <text x={0} y={-h - 24} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>1 L de agua</text>
  </g>;
}
// Frasco de vidrio abierto con setas adentro y tubito al medidor.
function FrascoSetas({ T, x, y, w = 330, h = 400, abre = 1, corte = 0 }) {
  return <g>
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={34} fill="rgba(200,235,255,.32)" stroke={KC.ink} strokeWidth={8} />
      <rect x={-w / 2 + 26} y={-h + 30} width={22} height={h - 70} rx={11} fill="#fff" opacity=".45" />
      <g transform={`translate(${-6} ${-14})`}><RacimoOstra T={T} x={0} y={0} s={0.8} abre={abre} n={5} color={OH.seta} oscuro={OH.seta2} pie={1.4} seed={4} /></g>
      {corte > 0 && corte < 1 && <g transform={`translate(${60 - corte * 40} ${-170}) rotate(${-20 + corte * 30})`}>
        <path d="M 0 0 L 90 -12 L 90 6 Z M 0 0 L 90 30 L 84 46 Z" fill={OH.hoja} stroke={KC.ink} strokeWidth={4} /><circle r={10} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>}
    </g>
    <path d={`M ${x + 40} ${y - h + 60} Q ${x + 60} ${y - h - 120} ${x + 300} ${y - h - 60}`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d={`M ${x + 40} ${y - h + 60} Q ${x + 60} ${y - h - 120} ${x + 300} ${y - h - 60}`} stroke="#e8f0ff" strokeWidth={9} fill="none" strokeLinecap="round" />
    <g transform={`translate(${x + 300} ${y - h - 140})`}>
      <rect x={0} y={0} width={240} height={190} rx={22} fill="#3a3f4a" stroke={KC.ink} strokeWidth={8} />
      <rect x={20} y={20} width={200} height={110} rx={10} fill="#0d1424" stroke={KC.ink} strokeWidth={4} />
      <path d={'M 30 110 ' + Array.from({ length: 18 }, (_, i) => `L ${30 + i * 10} ${110 - 60 * Math.abs(Math.sin(i * 0.5 + T * 3)) * (i > 4 ? 1 : 0.2)}`).join(' ')} stroke={KC.mint} strokeWidth={4} fill="none" />
      <text x={120} y={168} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>medidor de aire</text>
    </g>
  </g>;
}
// Gráfica: 1-octen-3-ol en el aire tras el corte (forma de la curva tomada del estudio: sube antes de 1 s, pico en 8–12 s, luego baja).
const GR = { x: 120, y: 690, w: 840, h: 350, tmax: 20 };
const curva = (t) => { if (t <= 0.3) return 0; const u = Math.pow((t - 0.3) / 9.7, 1.3); return u * Math.exp(1 - u); };
function Grafica({ T, tDatos }) {
  const px = (t) => GR.x + (t / GR.tmax) * GR.w, py = (v) => GR.y + GR.h - v * GR.h * 0.9;
  const N = 80, hasta = kclamp(tDatos, 0, GR.tmax);
  const pts = Array.from({ length: N + 1 }, (_, i) => { const t = (i / N) * hasta; return `${i ? 'L' : 'M'} ${px(t).toFixed(1)} ${py(curva(t)).toFixed(1)}`; }).join(' ');
  return <g>
    <rect x={GR.x - 30} y={GR.y - 40} width={GR.w + 60} height={GR.h + 120} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={px(8)} y={GR.y} width={px(12) - px(8)} height={GR.h} fill={KC.gold2} opacity={0.35 * kprog(tDatos, 8, 9)} />
    <line x1={GR.x} y1={GR.y + GR.h} x2={GR.x + GR.w} y2={GR.y + GR.h} stroke={KC.ink} strokeWidth={6} />
    <line x1={GR.x} y1={GR.y} x2={GR.x} y2={GR.y + GR.h} stroke={KC.ink} strokeWidth={6} />
    {[0, 5, 10, 15, 20].map((t) => <g key={t}><line x1={px(t)} y1={GR.y + GR.h} x2={px(t)} y2={GR.y + GR.h + 14} stroke={KC.ink} strokeWidth={5} />
      <text x={px(t)} y={GR.y + GR.h + 48} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{t} s</text></g>)}
    <path d={pts} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d={pts} stroke={KC.gold} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    {tDatos > 0 && tDatos < GR.tmax && <circle cx={px(hasta)} cy={py(curva(hasta))} r={14} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />}
    {tDatos > 1 && <g opacity={kprog(tDatos, 1, 2)}><line x1={px(1)} y1={GR.y + 40} x2={px(1)} y2={GR.y + GR.h} stroke={KC.red} strokeWidth={4} strokeDasharray="10 8" />
      <text x={px(1) + 10} y={GR.y + 30} style={{ font:`700 26px ${KF.mono}` }} fill={KC.red}>1 s: ya subía</text></g>}
    {tDatos > 9 && <text x={(px(8) + px(12)) / 2} y={GR.y + GR.h - 20} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(tDatos, 9, 10)}>máximo: 8–12 s</text>}
    <text x={GR.x + 10} y={GR.y - 6} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>1-octen-3-ol en el aire</text>
  </g>;
}
// Ácaro (Tyrophagus putrescentiae, esquemático): cuerpo ovalado blanco perlado, 8 patas, sedas largas. mira = 1 izquierda, -1 derecha.
function Acaro({ T, x, y, s = 1, mira = 1, camina = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * mira} ${s})`}>
    {[0, 1, 2, 3].map((i) => [1, -1].map((ld) => { const ph = Math.sin(T * 14 * camina + i * 1.4 + (ld > 0 ? 0 : Math.PI)) * 12 * camina;
      return <path key={i + '' + ld} d={`M ${-60 + i * 40} ${ld * 30} q ${-10 + ph} ${ld * 40} ${-30 + ph} ${ld * 70}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />; }))}
    {[-70, -20, 40, 90].map((sx, i) => <path key={i} d={`M ${sx} ${-40} q ${10} ${-50} ${30} ${-80}`} stroke="#c9c0ad" strokeWidth={4} fill="none" />)}
    <path d="M 120 -10 q 60 -30 110 -10 M 120 10 q 60 30 110 10" stroke="#c9c0ad" strokeWidth={4} fill="none" />
    <ellipse cx={0} cy={0} rx={120} ry={70} fill={OH.acaro} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-110} cy={0} rx={34} ry={28} fill="#e8d9bf" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={30} cy={-28} rx={40} ry={14} fill="#fff" opacity=".7" />
  </g>;
}
// Vaca caricatura (de amb-04), mirando a la derecha. Nariz en ≈ (x + 470 s, y − 80 s).
function Vaca({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-160} width={560} height={300} rx={140} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <path d="M -180 -150 Q -120 -60 -200 40 Q -260 -20 -240 -120 Z" fill={KC.ink} /><path d="M 60 -40 Q 160 -80 180 40 Q 100 90 40 40 Z" fill={KC.ink} />
    {[-220, -120, 120, 200].map((lx, i) => <rect key={i} x={lx} y={110} width={46} height={190} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={9} />)}
    <g transform={`translate(300 -120) rotate(${mece(T, 2, 0.3) * 3})`}>
      <rect x={-20} y={-60} width={180} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={10} />
      <rect x={90} y={0} width={90} height={80} rx={34} fill="#f6a6b2" stroke={KC.ink} strokeWidth={8} />
      <circle cx={60} cy={-6} r={12} fill={KC.ink} /><path d="M 0 -60 l -40 -40 M 40 -60 l 10 -50" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    </g>
    <path d={`M -300 -40 q -60 ${40 + mece(T, 1, 0.4) * 20} -40 140`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Trampa de succión para mosquitos con sobrecito de octenol. Base en (x, y).
function Trampa({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={0} x2={0} y2={-260} stroke={KC.ink} strokeWidth={14} />
    <rect x={-90} y={-520} width={180} height={260} rx={30} fill="#3a3f4a" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-520} rx={110} ry={30} fill="#5a606e" stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 -520) rotate(${T * 600})`}>{[0, 120, 240].map((a) => <rect key={a} x={-6} y={-24} width={12} height={24} fill="#c9ced8" transform={`rotate(${a})`} />)}</g>
    <g transform={`translate(-150 -400) rotate(-8)`}>
      <rect x={-70} y={-40} width={140} height={80} rx={12} fill={OH.oro} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={12} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>octenol</text>
      <line x1={70} y1={0} x2={150} y2={20} stroke={KC.ink} strokeWidth={4} />
    </g>
    <path d="M -110 0 L 110 0" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
  </g>;
}
function Mosquito({ T, x, y, s = 1, seed = 1 }) {
  const al = Math.sin(T * 60 + seed) * 0.5 + 0.5;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={-14} cy={-14} rx={22} ry={8 + al * 6} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={2} transform="rotate(-30 -14 -14)" />
    <ellipse cx={0} cy={0} rx={26} ry={6} fill="#2b2622" />
    <circle cx={-28} cy={-2} r={7} fill="#2b2622" /><line x1={-34} y1={-2} x2={-54} y2={4} stroke="#2b2622" strokeWidth={3} />
    {[-10, 0, 10].map((lx) => <path key={lx} d={`M ${lx} 4 l -6 22 M ${lx} 4 l 8 22`} stroke="#2b2622" strokeWidth={2} />)}
  </g>;
}
// Panel tipo tarjeta (para la comparación geosmina vs alcohol de hongo).
function Panel({ x, y, w, h, color = KC.paper, children }) {
  return <g><rect x={x} y={y} width={w} height={h} rx={30} fill={color} stroke={KC.ink} strokeWidth={8} />{children}</g>;
}

function OlorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ge: CUES.Geosmina, Co: CUES.Corte, E1: CUES.Enzima1, E2: CUES.Enzima2, N: CUES.Nariz, P: CUES.Pregunta, Es: CUES.Estudio,
    S: CUES.Segundos, D: CUES.Defensa, Ep: CUES.Espejo, V: CUES.Vacas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el cuchillo baja y corta desde el cuadro 0
  const baja = kprog(T, K.G, K.G + 0.45, kEase.suave), alzaG = kprog(T, K.G + 1.2, K.G + 1.8, kEase.suave);
  const sepG = 26 * kprog(T, K.G + 0.5, K.G + 1.0, kEase.sale);
  // corte (escena 2): el cuchillo vuelve a cortar
  const bajaC = kprog(T, K.Co + 0.1, K.Co + 0.55, kEase.suave), sepC = 30 * kprog(T, K.Co + 0.55, K.Co + 1.0, kEase.sale);
  const sube = (t0) => kprog(T, t0, t0 + 1.2);
  // datos del estudio: el reloj de la gráfica corre a ~4.3 s de datos por segundo de video
  const tDatos = Math.max(0, (T - K.S - 0.4) * 4.3);
  // ácaro: entra, huele la nube y da media vuelta
  const vuelta = kprog(T, K.D + 2.2, K.D + 2.6);
  const acX = T < K.D + 2.2 ? klerp(1150, 640, kprog(T, K.D, K.D + 2.2, kEase.sale)) : klerp(640, 1250, kprog(T, K.D + 2.6, K.D + 4.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el cuchillo corta el champiñón y sube el olor */}
      <Escena T={T} a={K.G} b={K.Ge} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla />
          <ChampiCortado id="cg" x={400} y={1070} s={1.6} cortes={[470]} sep={sepG} />
          <Cuchillo x={470 + sepG / 2} y={klerp(560, 1062, baja) - alzaG * 520} />
          <Rayitas T={T} x={480} y={640} o={kprog(T, K.G + 0.4, K.G + 0.9)} />
        </>)}
      </Escena>
      {/* 2 · no es la geosmina: dos tarjetas */}
      <Escena T={T} a={K.Ge} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Panel x={60} y={560} w={460} h={560}>
            <path d="M 150 1040 L 170 900 L 410 900 L 430 1040 Z" fill="#c2643a" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={290} cy={900} rx={120} ry={22} fill="#4a2e1c" stroke={KC.ink} strokeWidth={6} />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${210 + i * 80} ${700 + ((T * 1.2 + i * 0.3) % 1) * 160} q 8 14 0 22 q -8 -8 0 -22`} fill="#6fc3ff" stroke={KC.ink} strokeWidth={3} />)}
            <Molecula x={240} y={690} s={0.8} anillos={2} cola={1} color="#a87b4f" />
            <g opacity={kprog(T, K.Ge + 1.6, K.Ge + 2.0)}><path d="M 110 610 L 470 1070 M 470 610 L 110 1070" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity=".85" /></g>
          </Panel>
          <Panel x={560} y={560} w={460} h={560}>
            <Champinon x={790} y={1060} s={0.9} />
            <Octenol x={790} y={700} s={0.8} p={kprog(T, K.Ge + 2.2, K.Ge + 3.0)} brillo={0.6} />
            <path d="M 900 1010 L 940 1050 L 1000 970" stroke="#118a3a" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.Ge + 3.0, K.Ge + 3.3)} />
          </Panel>
        </>)}
      </Escena>
      {/* 3 · casi no lo tiene: lo fabrica al cortarlo */}
      <Escena T={T} a={K.Co} b={K.E1} zoom={0.06} origen="45% 60%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla y={1100} />
          <ChampiCortado id="cc" x={380} y={1110} s={1.45} cortes={[440]} sep={sepC} />
          <Cuchillo x={440 + sepC / 2} y={klerp(560, 1102, bajaC) - kprog(T, K.Co + 1.3, K.Co + 1.9, kEase.suave) * 520} />
          <Rayitas T={T} x={450} y={720} o={kprog(T, K.Co + 0.6, K.Co + 1.0)} />
        </>)}
      </Escena>
      {/* 4–5 · por dentro: células rotas, la grasa, las dos enzimas y el pedazo de 8 carbonos (fondo oscuro) */}
      <Escena T={T} a={K.E1} b={K.N} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <g opacity={1 - 0.55 * kprog(T, K.E1 + 1.2, K.E1 + 2.0)}><HifasCorte T={T} xc={540} y0={560} rota={kprog(T, K.E1 + 0.2, K.E1 + 0.8)} /></g>
          {(() => { const sale = kprog(T, K.E1 + 0.8, K.E1 + 1.6, kEase.sale);
            return <g opacity={sale} transform={`translate(0 ${(1 - sale) * -120})`}>
              <Linoleico T={T} x={150} y={1030} oxigeno={kprog(T, K.E1 + 2.3, K.E1 + 2.9)} corte={kprog(T, K.E2 + 1.0, K.E2 + 1.3)} sube={kprog(T, K.E2 + 1.4, K.E2 + 3.2, kEase.suave)} oro={kprog(T, K.E2 + 1.2, K.E2 + 1.6)} fuera={kprog(T, K.E2 + 3.0, K.E2 + 3.4)} />
            </g>; })()}
          {/* enzima 1: le pega oxígeno en el carbono 10 */}
          {T < K.E2 + 0.2 && <g opacity={kprog(T, K.E1 + 1.4, K.E1 + 1.8) * (1 - kprog(T, K.E2 - 0.2, K.E2 + 0.2))}>
            <Enzima x={klerp(1150, 610, kprog(T, K.E1 + 1.4, K.E1 + 2.2, kEase.sale))} y={900} s={0.9} color={KC.pink} rot={150} abre={0.5 + 0.5 * Math.sin(T * 10)} /></g>}
          {/* enzima 2: la parte entre el carbono 10 y el 11 */}
          {T > K.E2 - 0.2 && <g opacity={kprog(T, K.E2 - 0.2, K.E2 + 0.2) * (1 - kprog(T, K.E2 + 2.6, K.E2 + 3.0))}>
            <Enzima x={klerp(1150, 640, kprog(T, K.E2, K.E2 + 0.9, kEase.sale))} y={900} s={0.9} color={KC.cyan} rot={210} abre={T > K.E2 + 0.9 && T < K.E2 + 1.2 ? 0 : 0.8} /></g>}
          {T > K.E2 + 3.0 && <g opacity={kprog(T, K.E2 + 3.0, K.E2 + 3.4)}><Octenol x={800} y={640 - kprog(T, K.E2 + 3.0, K.E2 + 4.4) * 60} s={0.9} brillo={0.9} p={1} /></g>}
        </>)}
      </Escena>
      {/* 6 · tu nariz: umbral bajísimo */}
      <Escena T={T} a={K.N} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Nariz x={260} y={980} s={1.25} aspira={0.5 + 0.5 * Math.sin(T * 4)} />
          <Vaso T={T} x={760} y={1160} puntos={5} />
          <Rayitas T={T} x={560} y={980} n={3} o={kprog(T, K.N + 0.6, K.N + 1.0)} color={OH.tabla3} alto={140} />
        </>)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Tabla x={60} y={1120} w={560} />
          <ChampiCortado id="cp" x={300} y={1130} s={1.2} cortes={[350]} sep={30} />
          <Interrogacion T={T} x={330} y={760} tam={300} />
        </>)}
      </Escena>
      {/* 8 · el estudio de 2026: setas en un frasco, aire medido segundo a segundo */}
      <Escena T={T} a={K.Es} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<FrascoSetas T={T} x={330} y={1150} w={440} h={440} abre={kprog(T, K.Es + 0.6, K.Es + 2.0)} corte={kprog(T, K.Es + 5.2, K.Es + 6.4)} />)}
      </Escena>
      {/* 9 · la gráfica: sube antes de 1 s, pico en 8–12 s */}
      <Escena T={T} a={K.S} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Grafica T={T} tDatos={tDatos} />
          <g transform="translate(200 580) scale(.42)"><FrascoSetas T={T} x={0} y={0} corte={kprog(T, K.S, K.S + 0.6)} /></g></>)}
      </Escena>
      {/* 10 · defensa: el ácaro huele la nube y se va (fondo oscuro: escala de ácaro) */}
      <Escena T={T} a={K.D} b={K.Ep} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d="M -40 520 Q 260 620 300 1180 L -40 1180 Z" fill={OH.seta} stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-20 + i * 40} ${560 + i * 70} Q ${120 + i * 20} ${700 + i * 60} ${150 + i * 18} ${1180}`} stroke={OH.seta2} strokeWidth={5} fill="none" />)}
          {(() => { const nube = kprog(T, K.D + 1.2, K.D + 2.0); return nube > 0 ? <g opacity={nube * (1 - kprog(T, K.D + 4.2, K.D + 4.8))} style={{ filter:`drop-shadow(0 0 18px ${OH.oro})` }}>
            {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={300 + (i % 4) * 90 + Math.sin(T * 2 + i) * 20 + nube * 60} cy={820 + Math.floor(i / 4) * 80 + Math.cos(T * 1.7 + i) * 16} r={14} fill={OH.oro} stroke={KC.ink} strokeWidth={3} />)}
          </g> : null; })()}
          <Acaro T={T} x={acX} y={980} s={1} mira={vuelta > 0.5 ? -1 : 1} camina={vuelta > 0 && vuelta < 1 ? 0.3 : 1} />
        </>)}
      </Escena>
      {/* 11 · dos versiones espejo */}
      <Escena T={T} a={K.Ep} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={530} y={650} width={20} height={300} rx={8} fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} />
          <Octenol x={290} y={780} s={0.85} p={kprog(T, K.Ep + 0.3, K.Ep + 1.0)} />
          <Octenol x={790} y={780} s={0.85} espejo p={kprog(T, K.Ep + 0.9, K.Ep + 1.6)} color="#b7f08a" />
        </>)}
      </Escena>
      {/* 12 · vacas y trampas para mosquitos */}
      <Escena T={T} a={K.V} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#9feaff, #00d2ff 60%)' }}></div>
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={740} fill={KC.leaf} />
          <path d="M 0 1180 Q 270 1150 540 1180 T 1080 1180" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
          <Vaca x={260} y={1040} s={0.72} T={T} />
          <Rayitas T={T} x={560} y={930} n={3} o={kprog(T, K.V + 0.6, K.V + 1.1)} color={KC.gold} alto={130} sep={36} />
          <Trampa T={T} x={880} y={1180} />
          {Array.from({ length: 5 }, (_, i) => { const u = kprog(T, K.V + 2.2 + i * 0.25, K.V + 4.2 + i * 0.25);
            return u > 0 ? <Mosquito key={i} T={T} seed={i} s={0.9} x={klerp(1100 - i * 30, 900 + (i % 2) * 30, u) + Math.sin(T * 5 + i) * 18} y={klerp(420 + i * 90, 640 + i * 10, u) + Math.cos(T * 4 + i) * 14} /> : null; })}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma tabla, ahora en rebanadas y oliendo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla />
          <ChampiCortado id="cf" x={400} y={1070} s={1.6} cortes={[330, 470]} sep={34} />
          <Rayitas T={T} x={360} y={640} n={2} o={kprog(T, K.C + 0.3, K.C + 0.8)} />
          <Rayitas T={T} x={530} y={640} n={2} o={kprog(T, K.C + 0.5, K.C + 1.0)} />
          <Cuchillo x={820} y={1060} rot={60} s={0.8} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.6} until={K.Ge - 0.3} texto="¿tierra?" x={300} y={440} tam={50} />
      <Chip T={T} at={K.G + 2.0} until={K.Ge - 0.3} texto="su molécula clave" x={300} y={540} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.G + 2.6} until={K.Ge - 0.3} x={600} y={880} texto="champiñón" tam={32} color={KC.ink} />
      <Etq T={T} at={K.G + 2.9} until={K.Ge - 0.3} x={600} y={930} texto="Agaricus bisporus" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ge + 0.5} until={K.Co - 0.3} x={70} y={480} texto="geosmina" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ge + 0.9} until={K.Co - 0.3} x={70} y={525} texto="bacterias del suelo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ge + 2.4} until={K.Co - 0.3} x={570} y={480} texto="1-octen-3-ol" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ge + 2.8} until={K.Co - 0.3} x={570} y={525} texto="alcohol de hongo" tam={26} color={KC.ink} />
      <Medidor T={T} at={K.Co + 0.05} until={K.E1 - 0.3} x={60} y={430} ancho={600} color={KC.gold} etiqueta="1-octen-3-ol en el aire"
        valor={(t) => 0.03 + 0.9 * kprog(t, K.Co + 0.55, K.Co + 1.6, kEase.sale)} texto={(v) => (v < 0.1 ? 'casi nada' : '¡sube!')} />
      <Chip T={T} at={K.Co + 0.3} until={K.E1 - 0.3} texto="seta entera: casi nada" x={780} y={820} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Co + 1.2} until={K.E1 - 0.3} texto="cortada: ¡sube!" x={780} y={900} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.E1 + 0.1} until={K.N - 0.3} texto="POR DENTRO · AL MICROSCOPIO" x={540} y={400} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.E1 + 0.5} until={K.E1 + 2.0} x={60} y={500} texto="células rotas por el filo" tam={28} color={OH.hifa} />
      <Etq T={T} at={K.E1 + 1.3} until={K.N - 0.3} x={60} y={1160} texto="ácido linoleico · un ácido graso" tam={28} color={OH.linol} />
      <Etq T={T} at={K.E1 + 1.9} until={K.E2 - 0.2} x={600} y={790} texto="enzima 1 · lipoxigenasa" tam={28} color={KC.pink} />
      <Etq T={T} at={K.E1 + 2.6} until={K.E2 - 0.2} x={180} y={880} texto="+ oxígeno" tam={30} color={OH.oxi} />
      <Etq T={T} at={K.E2 + 0.6} until={K.N - 0.3} x={560} y={790} texto="enzima 2 · hidroperóxido liasa" tam={26} color={KC.cyan} />
      <Etq T={T} at={K.E2 + 3.0} until={K.N - 0.3} x={60} y={560} texto="1-octen-3-ol · 8 carbonos" tam={32} color={OH.oro} />
      <Etq T={T} at={K.E2 + 3.3} until={K.N - 0.3} x={60} y={960} texto="el resto (10 carbonos) se queda" tam={24} color={OH.linol} />
      <Chip T={T} at={K.N + 0.4} until={K.P - 0.3} texto="umbral de olor: bajísimo" x={360} y={480} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.N + 1.2} until={K.P - 0.3} x={60} y={600} texto="basta poquísimo para notarlo" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="2026" quien="U. de Yamaguchi, Japón" revista="Fungal Biology, 2026" x={540} y={560} />
      <Etq T={T} at={K.Es + 3.4} until={K.S - 0.3} x={60} y={470} texto="Pleurotus cornucopiae" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.8} until={K.S - 0.3} x={60} y={520} texto="seta tipo ostra" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 4.4} until={K.S - 0.3} texto="aire medido segundo a segundo" x={400} y={600} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.2} until={K.D - 0.3} texto={`t = ${Math.min(20, Math.floor(tDatos))} s`} x={820} y={740} tam={32} borde={KC.gold} mono />
      <Etq T={T} at={K.D + 0.4} until={K.Ep - 0.3} x={440} y={1120} texto="ácaro" tam={30} color={KC.texto} />
      <Etq T={T} at={K.D + 0.7} until={K.Ep - 0.3} x={440} y={1165} texto="Tyrophagus putrescentiae" it tam={26} color={KC.texto} />
      <Etq T={T} at={K.D + 0.4} until={K.Ep - 0.3} x={60} y={480} texto="orilla de una seta" tam={26} color={KC.texto} />
      <Chip T={T} at={K.D + 2.4} until={K.Ep - 0.3} texto={<>lo ahuyenta · estudio en <i>Pleurotus</i>, 2022</>} x={500} y={790} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.D + 3.0} until={K.Ep - 0.3} texto="se cree que es defensa" x={500} y={870} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Ep + 1.0} until={K.V - 0.3} texto="(R): huele a champiñón" x={280} y={990} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.Ep + 1.6} until={K.V - 0.3} texto="(S): huele a moho y pasto" x={800} y={990} tam={26} borde="#b7f08a" />
      <Chip T={T} at={K.Ep + 2.4} until={K.V - 0.3} texto="en el champiñón: más del 98.5 % es (R)" x={540} y={1075} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Ep + 2.8} until={K.V - 0.3} texto="medido en 2004" x={540} y={1145} tam={26} borde={KC.ink} mono />
      <Chip T={T} at={K.V + 0.8} until={K.C - 0.3} texto="1-octen-3-ol en el olor de las vacas (1984)" x={690} y={520} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.V + 2.2} until={K.C - 0.3} texto="Florida, 1989: trampas con octenol" x={690} y={600} tam={26} borde={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 0.7} until={K.Ou} texto="¿tierra?" x={300} y={440} tam={50} />
      <Etq T={T} at={K.C + 1.0} until={K.Ou} x={60} y={560} texto="1-octen-3-ol" tam={34} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ge} texto="2 cm" largo={190} color={KC.ink} />
      <BarraEscala T={T} at={K.Ge} until={K.Co} texto="dibujos esquemáticos" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Co} until={K.E1} texto="2 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.E1} until={K.N} texto="10 µm (hifas) · moléculas esquemáticas" largo={100} />
      <BarraEscala T={T} at={K.N} until={K.P} texto="10 cm" largo={330} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="2 cm" largo={140} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.S} texto="5 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.D} texto="datos: Nagata et al., 2026 (forma esquemática)" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.D} until={K.Ep} texto="0.1 mm" largo={75} />
      <BarraEscala T={T} at={K.Ep} until={K.V} texto="moléculas esquemáticas" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.V} until={K.C} texto="dibujo esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={190} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ge - 0.1} texto="No es tierra: *sobre todo, una molécula.*" />
      <Subtitulo T={T} idx={1} at={K.Ge + 0.1} until={K.Co - 0.1} texto="No es la geosmina *de la tierra mojada.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.E1 - 0.1} texto="Lo fabrica *cuando la cortas.*" />
      <Subtitulo T={T} idx={3} at={K.E1 + 0.1} until={K.E2 - 0.1} texto="Una enzima le pega *oxígeno a una grasa.*" />
      <Subtitulo T={T} idx={4} at={K.E2 + 0.1} until={K.N - 0.1} texto="Otra la parte: *8 carbonos al aire.*" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.P - 0.1} texto="Su umbral de olor: *bajísimo.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Por qué *tan rápido?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.S - 0.1} texto="2026, Japón: *el aire, segundo a segundo.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.D - 0.1} texto="Subió en *menos de 1 segundo.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Ep - 0.1} texto="Se cree que es *una defensa.*" />
      <Subtitulo T={T} idx={10} at={K.Ep + 0.1} until={K.V - 0.1} texto="Dos versiones: *champiñón o moho.*" />
      <Subtitulo T={T} idx={11} at={K.V + 0.1} until={K.C - 0.1} texto="También en *el olor de las vacas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es la seta *reaccionando a tu cuchillo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Co + 0.1, K.E1 - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.N + 0.1, K.P - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 0.5, K.D - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.D + 0.5, K.Ep - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ep + 0.1, K.V - 0.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.V + 0.1, K.C - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.C + 0.1, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="151" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OlorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OlorShot /></CompositionStage></div>;
}
window.OlorApp = OlorApp;
