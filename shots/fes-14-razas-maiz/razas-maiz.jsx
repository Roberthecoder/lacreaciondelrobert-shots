// Shot Festivo #14 · Candelaria · Ambiental: las razas de maíz de México — NARRADO (N4 la imagen que se llena + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático: las mazorcas por raza muestran solo rasgos
// generales descritos por Wellhausen et al. 1951 (Cacahuacintle: grano blanco, grande, redondeado; Palomero Toluqueño: mazorca corta y cónica de grano puntiagudo blanco grisáceo;
// Zapalote Chico: mazorca muy corta; Chalqueño: mediana-larga, ancha, que se angosta a la punta); colores y cuadrícula ilustrativos.
const HOJA = '#e9dcae', HOJA2 = '#c9b77a', MASA2 = '#e2b85a', TALLO = '#4caa3c', TALLO2 = '#2f7f2a', ESPIGA = '#d8c27a', OLOTE = '#e8d6a8';
const PAPEL = [KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink];
// paleta de granos (ilustrativa): crema, blanco, amarillo, naranja, rojo, morado, azul, negro
const GRANOS = ['#f3e6c4', '#fbf7ec', '#f4c94a', '#f29a32', '#c9352f', '#7a2c6e', '#3f57a8', '#2a2333', '#e9d38c', '#b8473f'];

function blob(seed, r, n = 11, v = 0.18) {
  const g = krng(seed), P = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (1 + (g() - 0.5) * 2 * v); return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(P[n - 1], P[0]).join(' ')}`;
  for (let i = 0; i < n; i++) { const m = mid(P[i], P[(i + 1) % n]); d += ` Q ${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + ' Z';
}
const Defs = () => <defs>
  <radialGradient id="gMasa" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#fbe3a0" /><stop offset="100%" stopColor={MASA2} /></radialGradient>
</defs>;

// Papel picado que se mece arriba (fiesta de la Candelaria)
function PapelPicado({ T, y = 0, n = 7, alto = 140 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={PAPEL[i % 6]} opacity=".93" />
        <circle cx={0} cy={alto * 0.38} r={15} fill="#fff" opacity=".85" />
        <path d={`M -24 ${alto * 0.62} l 12 -14 l 12 14 l 12 -14 l 12 14`} stroke="#fff" strokeWidth={7} fill="none" opacity=".85" />
      </g>; })}
  </svg>;
}

// ---------- TAMAL en su hoja (abre 0 = cerrado/envuelto, 1 = abierto). relleno: color del relleno ----------
function Tamal({ T, x, y, s = 1, abre = 1, vapor = 1, relleno = '#c9352f' }) {
  const ala = (k) => { const ang = k * klerp(0, 18, abre); return <g transform={`translate(${k * 175 * abre} ${30 * abre}) rotate(${ang} 0 260) scale(${1 - 0.6 * abre} 1)`}>
    <path d={`M 0 -330 C ${k * 60} -250 ${k * 170} -120 ${k * 175} 40 C ${k * 175} 170 ${k * 120} 260 0 300 Z`} fill={HOJA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0.3, 0.55, 0.8].map((q, i) => <path key={i} d={`M 0 ${-300 + i * 10} C ${k * 50 * q * 2} -200 ${k * 130 * q} -60 ${k * 150 * q} 120`} stroke={HOJA2} strokeWidth={4} fill="none" />)}
  </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={330} rx={260} ry={30} fill="rgba(0,0,0,.25)" />
    <path d="M 0 -360 C 120 -260 250 -100 250 60 C 250 220 150 320 0 340 C -150 320 -250 220 -250 60 C -250 -100 -120 -260 0 -360 Z" fill={HOJA} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-160, -80, 0, 80, 160].map((vx, i) => <path key={i} d={`M 0 -340 Q ${vx * 0.8} -100 ${vx} 300`} stroke={HOJA2} strokeWidth={4} fill="none" opacity=".8" />)}
    <rect x={-150} y={-220} width={300} height={440} rx={70} fill="url(#gMasa)" stroke={KC.ink} strokeWidth={7} />
    <path d={blob(9, 100, 14, 0.05)} transform="scale(0.7 1.5)" fill={relleno} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 8 }, (_, i) => { const g = krng(i + 40); return <circle key={i} cx={(g() - 0.5) * 90} cy={(g() - 0.5) * 230} r={7 + g() * 6} fill="#e9785a" opacity=".8" />; })}
    {ala(-1)}{ala(1)}
    {vapor > 0 && [-90, 0, 90].map((vx, i) => { const ph = ((T * 0.7 + i * 0.33) % 1); return <path key={'v' + i} d={`M ${vx} -250 q 22 -40 0 -80 q -22 -40 0 -80`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * 0.7 * Math.sin(Math.PI * ph)} transform={`translate(0 ${-ph * 70})`} />; })}
  </g>;
}

// ---------- MAZORCA genérica parametrizada ----------
// L = largo (px, mitad), W = medio ancho en la base, punta = cuánto se angosta arriba (0..1), grano: 'redondo' | 'normal' | 'punta'
// color: color del grano (o arreglo para mezclar), hojas: brácteas abiertas a los lados
function Mazorca({ T, x, y, s = 1, rot = 0, L = 260, W = 105, punta = 0.35, grano = 'normal', tam = 34, color = '#f4c94a', hojas = true, desgrana = 0, id = 'm' }) {
  const ancho = (yy) => W * (1 - punta * kclamp((L - yy) / (2 * L), 0, 1) * 1.0) * (yy > L * 0.8 ? Math.sqrt(Math.max(0, (L - yy) / (L * 0.2))) * 0.25 + 0.75 : 1);
  const out = `M 0 ${-L} C ${W * (1 - punta) * 1.1} ${-L} ${W} ${-L * 0.3} ${W} ${L * 0.55} C ${W} ${L * 0.95} ${W * 0.4} ${L} 0 ${L} C ${-W * 0.4} ${L} ${-W} ${L * 0.95} ${-W} ${L * 0.55} C ${-W} ${-L * 0.3} ${-W * (1 - punta) * 1.1} ${-L} 0 ${-L} Z`;
  const cols = Math.max(3, Math.round((2 * W) / tam)), rows = Math.round((2 * L) / (tam * (grano === 'punta' ? 0.8 : 0.95)));
  const pal = Array.isArray(color) ? color : [color];
  const gr = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols + 1; c++) {
    const gy = -L + (r + 0.5) * (2 * L / rows), gx = -W + (c + (r % 2) * 0.5) * (2 * W / cols);
    const idx = r * (cols + 1) + c; if (desgrana > 0 && (idx * 0.618) % 1 < desgrana) continue;
    const col = pal[(idx * 7) % pal.length], sh = tam * 0.46;
    if (grano === 'redondo') gr.push(<circle key={idx} cx={gx} cy={gy} r={sh} fill={col} stroke="rgba(0,0,0,.28)" strokeWidth={3} />);
    else if (grano === 'punta') gr.push(<path key={idx} d={`M ${gx} ${gy - sh * 1.15} Q ${gx + sh} ${gy - sh * 0.2} ${gx + sh * 0.8} ${gy + sh * 0.7} Q ${gx} ${gy + sh * 1.05} ${gx - sh * 0.8} ${gy + sh * 0.7} Q ${gx - sh} ${gy - sh * 0.2} ${gx} ${gy - sh * 1.15} Z`} fill={col} stroke="rgba(0,0,0,.3)" strokeWidth={2.5} />);
    else gr.push(<rect key={idx} x={gx - sh} y={gy - sh * 0.9} width={sh * 2} height={sh * 1.8} rx={sh * 0.6} fill={col} stroke="rgba(0,0,0,.25)" strokeWidth={3} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {hojas && <path d={`M -10 ${L + 40} C ${-W - 90} ${L * 0.6} ${-W - 110} ${-L * 0.2} ${-W * 0.7} ${-L * 0.8} C ${-W - 30} ${-L * 0.1} ${-W - 10} ${L * 0.5} 15 ${L + 30} Z`} fill={TALLO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    <clipPath id={`clip-${id}`}><path d={out} /></clipPath>
    <path d={out} fill={OLOTE} stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#clip-${id})`}>{gr}</g>
    <path d={out} fill="none" stroke={KC.ink} strokeWidth={8} />
    {hojas && <path d={`M 10 ${L + 40} C ${W + 90} ${L * 0.6} ${W + 110} ${-L * 0.2} ${W * 0.7} ${-L * 0.8} C ${W + 30} ${-L * 0.1} ${W + 10} ${L * 0.5} -15 ${L + 30} Z`} fill={TALLO2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
  </g>;
}

// Mazorca chiquita para la cuadrícula de 64 (forma y color ilustrativos)
function MiniMazorca({ x, y, s = 1, color, alto = 1, ancho = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M 0 ${-38 * alto} C ${18 * ancho} ${-38 * alto} ${20 * ancho} ${-10} ${19 * ancho} ${20 * alto} C ${18 * ancho} ${38 * alto} ${6} ${40 * alto} 0 ${40 * alto} C ${-6} ${40 * alto} ${-18 * ancho} ${38 * alto} ${-19 * ancho} ${20 * alto} C ${-20 * ancho} ${-10} ${-18 * ancho} ${-38 * alto} 0 ${-38 * alto} Z`} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <path d={`M -4 ${40 * alto} C ${-30 * ancho} ${20 * alto} ${-30 * ancho} ${-10 * alto} ${-14 * ancho} ${-24 * alto} C ${-20 * ancho} 0 ${-14 * ancho} ${24 * alto} 4 ${40 * alto} Z`} fill={TALLO} stroke={KC.ink} strokeWidth={2.5} />
    {[-1, 0, 1].map((k) => <line key={k} x1={k * 8 * ancho} y1={-30 * alto} x2={k * 8 * ancho} y2={34 * alto} stroke="rgba(0,0,0,.22)" strokeWidth={2.5} />)}
  </g>;
}
function Cuadricula64({ T, t0, dur = 2.4, x0 = 90, y0 = 720, cols = 16, cw = 56, ch = 108, s = 1, brillo = 0 }) {
  return <g>{Array.from({ length: 64 }, (_, i) => { const g = krng(i * 13 + 5), c = i % cols, r = Math.floor(i / cols);
    const u = kprog(T, t0 + (i / 64) * dur, t0 + (i / 64) * dur + 0.3, kEase.rebote); if (u <= 0) return null;
    const col = GRANOS[Math.floor(g() * GRANOS.length)], alto = 0.75 + g() * 0.45, ancho = 0.8 + g() * 0.45;
    const b = brillo > 0 ? 1 + 0.08 * brillo * Math.sin(T * 5 + i) : 1;
    return <MiniMazorca key={i} x={x0 + c * cw + cw / 2} y={y0 + r * ch + ch / 2} s={u * s * b} color={col} alto={alto} ancho={ancho} />; })}</g>;
}

// ---------- piezas de cocina ----------
function Olla({ x, y, s = 1, T, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={170} rx={210} ry={26} fill="rgba(0,0,0,.25)" />
    <path d="M -200 -40 C -230 120 -150 180 0 180 C 150 180 230 120 200 -40 Z" fill="#b4643a" stroke={KC.ink} strokeWidth={9} />
    <path d="M -200 -40 Q -250 -20 -238 30 M 200 -40 Q 250 -20 238 30" stroke={KC.ink} strokeWidth={9} fill="none" />
    <ellipse cx={0} cy={-40} rx={200} ry={40} fill="#e6a35a" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-40} rx={185} ry={32} fill="#d24a2a" opacity={0.7 + 0.3 * lleno} />
    {Array.from({ length: Math.round(lleno * 14) }, (_, i) => { const g = krng(i + 3); return <circle key={i} cx={(g() - 0.5) * 300} cy={-40 + (g() - 0.5) * 40} r={15} fill="#fbf7ec" stroke="rgba(0,0,0,.3)" strokeWidth={2} />; })}
    {[-70, 10, 90].map((vx, i) => { const ph = ((T * 0.7 + i * 0.33) % 1); return <path key={i} d={`M ${vx} -90 q 20 -36 0 -72 q -20 -36 0 -72`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.6 * Math.sin(Math.PI * ph)} transform={`translate(0 ${-ph * 60})`} />; })}
  </g>;
}
function Totopo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={150} fill="#e8b94e" stroke={KC.ink} strokeWidth={8} />
    <circle r={150} fill="none" stroke="#c98e2c" strokeWidth={14} opacity=".5" />
    {Array.from({ length: 16 }, (_, i) => { const g = krng(i + 70), a = g() * Math.PI * 2, d = Math.sqrt(g()) * 115; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={7} fill="#8a5a22" />; })}
    {Array.from({ length: 10 }, (_, i) => { const g = krng(i + 90), a = g() * Math.PI * 2, d = Math.sqrt(g()) * 120; return <ellipse key={'b' + i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} rx={14} ry={9} fill="#c27a26" opacity=".7" />; })}
  </g>;
}
function Palomita({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[[0, -14, 18], [-14, 2, 16], [14, 4, 16], [0, 12, 14], [-6, -2, 12]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#fffaf0" stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -6 18 Q 0 26 8 18" fill="#f4c94a" stroke={KC.ink} strokeWidth={2.5} />
  </g>;
}
function Frasco({ x, y, s = 1, color, lleno = 1, brillo = 0, T = 0 }) {
  const h = 180 * lleno;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle cx={0} cy={-90} r={150} fill={KC.yellow} opacity={0.25 * brillo * (0.7 + 0.3 * Math.sin(T * 5))} />}
    <rect x={-70} y={-200} width={140} height={200} rx={26} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-62} y={-8 - h} width={124} height={h} rx={18} fill={color} />
    {Array.from({ length: Math.round(lleno * 14) }, (_, i) => <circle key={i} cx={-44 + (i % 4) * 29} cy={-22 - Math.floor(i / 4) * 30} r={9} fill="rgba(255,255,255,.35)" />)}
    <rect x={-80} y={-232} width={160} height={36} rx={10} fill="#8f5a26" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Planta de maíz sencilla (para la milpa)
function Planta({ T, x, y, h = 700, color = '#f4c94a', seed = 1 }) {
  const sw = Math.sin(T * 1.2 + seed) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${sw * 0.4})`}>
    <path d={`M -10 0 L -6 ${-h} L 6 ${-h} L 10 0 Z`} fill={TALLO} stroke={KC.ink} strokeWidth={5} />
    {[0.3, 0.55, 0.78].map((q, i) => { const k = i % 2 ? 1 : -1; return <path key={i} d={`M 0 ${-h * q} C ${k * 120} ${-h * q - 70} ${k * 230} ${-h * q - 40} ${k * 290} ${-h * q + 40} C ${k * 210} ${-h * q - 10} ${k * 110} ${-h * q - 20} 0 ${-h * q + 30} Z`} fill={TALLO} stroke={KC.ink} strokeWidth={4} />; })}
    {[-40, -20, 0, 20, 40].map((a, i) => <path key={'e' + i} d={`M 0 ${-h} Q ${a * 1.2} ${-h - 70} ${a * 2.2} ${-h - 100 + Math.abs(a) * 0.6}`} stroke={ESPIGA} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <g transform={`translate(26 ${-h * 0.45}) rotate(24)`}>
      <path d="M 0 -80 C 34 -80 40 -20 38 30 C 36 70 16 84 0 84 C -16 84 -36 70 -38 30 C -40 -20 -34 -80 0 -80 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
      <path d="M -8 90 C -60 50 -60 -40 -30 -70 C -40 -20 -30 40 8 86 Z" fill={TALLO2} stroke={KC.ink} strokeWidth={4} />
      {[-6, 0, 6].map((bx, i) => <path key={i} d={`M ${bx} -80 Q ${bx + 14 * Math.sin(T + i)} -110 ${bx + 6} -140`} stroke="#a8743a" strokeWidth={4} fill="none" />)}
    </g>
  </g>;
}
// Rosca de reyes con su muñequito
function Rosca({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={300} ry={150} fill="rgba(0,0,0,.2)" />
    <path d="M -290 0 A 290 140 0 1 0 290 0 A 290 140 0 1 0 -290 0 Z M -150 0 A 150 60 0 1 1 150 0 A 150 60 0 1 1 -150 0 Z" fill="#d9954a" stroke={KC.ink} strokeWidth={8} fillRule="evenodd" />
    {[-210, -70, 70, 210].map((sx, i) => <path key={i} d={`M ${sx - 40} ${-90 + Math.abs(sx) * 0.2} q 40 -26 80 0`} stroke="#f6e7c8" strokeWidth={22} fill="none" strokeLinecap="round" />)}
    {[[-240, 40, KC.red], [-120, 110, KC.leaf], [130, 110, KC.orange], [240, 40, KC.red], [0, -120, KC.leaf]].map(([fx, fy, c], i) => <rect key={i} x={fx - 16} y={fy - 9} width={32} height={18} rx={6} fill={c} stroke={KC.ink} strokeWidth={3} />)}
    <g transform={`translate(70 ${-60 - 8 * Math.abs(Math.sin(T * 2))})`}>
      <ellipse cx={0} cy={0} rx={24} ry={34} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <circle cx={0} cy={-40} r={20} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}

// ---------- GRANO EN CORTE (escena de color): pericarpio, aleurona, endospermo, germen ----------
// peri / aleu: 0..1, cuánto pigmento (antocianinas) tiene cada capa
function GranoCorte({ T, x, y, s = 1, peri = 0, aleu = 0 }) {
  const out = 'M 0 -300 C 210 -300 280 -120 270 40 C 260 220 140 330 0 340 C -140 330 -260 220 -270 40 C -280 -120 -210 -300 0 -300 Z';
  const P = mixHex('#f1e3b8', '#7a2c6e', peri), A = mixHex('#efe2bd', '#3f57a8', aleu);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* pericarpio (cáscara) */}
    <path d={out} fill={P} stroke={KC.ink} strokeWidth={8} />
    {/* capa de aleurona: una fila de celditas justo debajo */}
    <g transform="scale(0.91)"><path d={out} fill={A} stroke="rgba(0,0,0,.35)" strokeWidth={3} /></g>
    {Array.from({ length: 64 }, (_, i) => { const a = (i / 64) * Math.PI * 2; const rx = 245, ry = (Math.sin(a) > 0 ? 300 : 285); return <line key={i} x1={Math.cos(a) * rx * 0.93} y1={20 + Math.sin(a) * ry * 0.93} x2={Math.cos(a) * rx * 0.86} y2={20 + Math.sin(a) * ry * 0.86} stroke="rgba(0,0,0,.25)" strokeWidth={2} />; })}
    {/* endospermo (almidón) */}
    <g transform="scale(0.83)"><path d={out} fill="#fbf2d6" stroke="rgba(0,0,0,.2)" strokeWidth={3} /></g>
    {Array.from({ length: 40 }, (_, i) => { const g = krng(i + 7); return <circle key={'a' + i} cx={(g() - 0.5) * 360} cy={-200 + g() * 330} r={6 + g() * 8} fill="#efe1b4" />; })}
    {/* germen (embrión) abajo */}
    <path d="M -70 300 C -110 180 -70 80 0 70 C 70 80 110 180 70 300 C 40 320 -40 320 -70 300 Z" fill="#f2cf74" stroke="rgba(0,0,0,.35)" strokeWidth={4} />
  </g>;
}

// Montaña en corte: del mar a la sierra (0 → 3,400 m)
function Montana({ T, sube = 1 }) {
  return <g>
    <rect x={0} y={1240} width={KW} height={700} fill="#2d8fd6" />
    {[0, 1, 2].map((i) => <path key={i} d={`M 0 ${1250 + i * 26} Q 60 ${1240 + i * 26 + 8 * Math.sin(T * 2 + i)} 120 ${1250 + i * 26} T 240 ${1250 + i * 26}`} stroke="#bfe6ff" strokeWidth={5} fill="none" opacity=".7" />)}
    <path d="M 0 1250 L 200 1250 C 330 1220 420 1100 520 950 C 600 830 680 640 780 520 C 820 470 860 460 900 470 L 1080 520 L 1080 1920 L 0 1920 Z" fill="#7fb85a" stroke={KC.ink} strokeWidth={7} />
    <path d="M 640 760 C 700 640 760 560 800 520 C 830 490 870 480 900 490 L 1080 540 L 1080 800 Z" fill="#5f9a46" opacity=".8" />
    <path d="M 0 1252 L 210 1252 C 260 1240 300 1225 330 1205 L 0 1270 Z" fill="#f2dfa4" />
  </g>;
}

// Banco de semillas: estantes con frascos
function Banco({ T, t0, brilla = 0 }) {
  const out = [];
  for (let r = 0; r < 3; r++) {
    out.push(<rect key={'e' + r} x={60} y={765 + r * 185} width={960} height={20} rx={6} fill="#8aa0b8" stroke={KC.ink} strokeWidth={5} />);
    for (let c = 0; c < 5; c++) { const i = r * 5 + c, u = kprog(T, t0 + 0.2 + i * 0.08, t0 + 0.5 + i * 0.08, kEase.rebote);
      out.push(<g key={i} transform={`translate(${150 + c * 195} ${765 + r * 185}) scale(${u})`}><Frasco x={0} y={0} s={0.72} color={GRANOS[(i * 3) % GRANOS.length]} lleno={0.85} brillo={i === 6 ? brilla : 0} T={T} /></g>); }
  }
  return <g>{out}</g>;
}

// ---------- El shot ----------
function RazasMaiz() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Po: CUES.Pozole, To: CUES.Totopos, Pa: CUES.Palomitas, Pl: CUES.Polen, Se: CUES.Semilla, Al: CUES.Altura, P: CUES.Pregunta, Co: CUES.Color, E: CUES.Estudio, Ta: CUES.Tamal, B: CUES.Banco, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}><Defs />{c}</svg>;
  const ist = mxProy(-95.0, 16.4);
  // puntos de colecta (esquemáticos) sobre el centro y sur de México
  const PUNTOS = Array.from({ length: 70 }, (_, i) => { const g = krng(i * 3 + 11); const lon = -105 + g() * 17, lat = 15.5 + g() * 7; return [lon, lat, g()]; })
    .filter(([lon, lat]) => !(lon > -91 && lat < 17.3) && !(lon < -103.5 && lat < 18.5) && !(lon > -97 && lat > 20.5));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tamal se abre; detrás se llena la cuadrícula de 64 razas */}
      <Escena T={T} a={K.G} b={K.Po} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        {svg((() => { const m = kprog(T, K.G + 1.9, K.G + 2.6, kEase.suave);
          return <>
            <Cuadricula64 T={T} t0={K.G + 2.1} dur={2.2} x0={92} y0={700} cw={56} ch={110} />
            <Tamal T={T} x={klerp(540, 540, m)} y={klerp(980, 1640, m)} s={klerp(0.82, 0.42, m) * klerp(0.9, 1, kprog(T, K.G, K.G + 0.5, kEase.rebote))} abre={kprog(T, K.G + 0.1, K.G + 0.8, kEase.sale)} />
          </>; })())}
      </Escena>
      {/* 2 · Cacahuacintle: el maíz del pozole */}
      <Escena T={T} a={K.Po} b={K.To} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Mazorca T={T} id="caca" x={300} y={900} s={1.05} rot={-8} L={270} W={125} punta={0.2} grano="redondo" tam={52} color={['#fbf7ec', '#f3ecda', '#fffdf6']} desgrana={kprog(T, K.Po + 1.2, K.Po + 3.0) * 0.5} />
          {Array.from({ length: 12 }, (_, i) => { const at = K.Po + 1.2 + i * 0.15, u = kprog(T, at, at + 0.55, (p) => p * p); return u > 0 && u < 1 ? <circle key={i} cx={klerp(330, 760, u) + (i % 3) * 20} cy={klerp(860, 920, u) - Math.sin(u * Math.PI) * 180} r={22} fill="#fbf7ec" stroke={KC.ink} strokeWidth={3} /> : null; })}
          <Olla T={T} x={780} y={1040} s={0.95} lleno={kprog(T, K.Po + 1.4, K.Po + 3.2)} />
        </>)}
      </Escena>
      {/* 3 · Zapalote Chico: totopos del istmo */}
      <Escena T={T} a={K.To} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <MapaMexico x={60} y={380} ancho={680} conCA={false} />
          {(() => { const [px, py] = ist; const X = 60 + px * 0.68, Y = 380 + py * 0.68, p = (T * 1.5) % 1; return <g><circle cx={X} cy={Y} r={14 + 40 * p} fill="none" stroke={KC.red} strokeWidth={6} opacity={1 - p} /><circle cx={X} cy={Y} r={13} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>; })()}
          <Mazorca T={T} id="zapa" x={300} y={1040} s={0.75} rot={-6} L={150} W={115} punta={0.25} grano="normal" tam={38} color={['#f3e6c4', '#f4d57a']} />
          <g opacity={kprog(T, K.To + 1.8, K.To + 2.3)}><Totopo x={770} y={1040} s={kprog(T, K.To + 1.8, K.To + 2.4, kEase.rebote) * 1.1} rot={T * 10} /></g>
        </>)}
      </Escena>
      {/* 4 · Palomero Toluqueño: grano puntiagudo que revienta en palomitas */}
      <Escena T={T} a={K.Pa} b={K.Pl} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Mazorca T={T} id="palo" x={300} y={980} s={0.85} rot={-10} L={220} W={85} punta={0.5} grano="punta" tam={32} color={['#e9e6dc', '#d9d5c8']} />
          {Array.from({ length: 14 }, (_, i) => { const at = K.Pa + 0.6 + i * 0.17, u = kprog(T, at, at + 0.9, kEase.sale); if (u <= 0) return null; const g = krng(i + 31);
            return <Palomita key={i} x={klerp(360, 560 + g() * 420, u)} y={klerp(900, 520 + g() * 640, u)} s={klerp(0.4, 1.7, Math.min(1, u * 3))} rot={u * 200 + i * 40} />; })}
        </>)}
      </Escena>
      {/* 5 · cada lugar su maíz, y el polen viaja libre de planta en planta */}
      <Escena T={T} a={K.Pl} b={K.Se} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={0} y={1460} width={KW} height={460} fill="#8a5a33" />
          <Planta T={T} x={200} y={1470} h={760} color="#f4c94a" seed={1} />
          <Planta T={T} x={540} y={1470} h={820} color="#3f57a8" seed={2} />
          <Planta T={T} x={880} y={1470} h={740} color="#c9352f" seed={3} />
          {Array.from({ length: 70 }, (_, i) => { const g = krng(i + 101), from = Math.floor(g() * 3), to = (from + 1 + Math.floor(g() * 2)) % 3, xs = [200, 540, 880];
            const at = K.Pl + 2.6 + g() * 3.6, u = kprog(T, at, at + 1.4, kEase.suave); if (u <= 0 || u >= 1) return null;
            const x0 = xs[from] + (g() - 0.5) * 80, y0 = 1470 - [760, 820, 740][from] - 60, x1 = xs[to] + 40, y1 = 1470 - [760, 820, 740][to] * 0.45 - 90;
            return <circle key={i} cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u) - Math.sin(u * Math.PI) * 120} r={10} fill={KC.gold2} stroke="#a8743a" strokeWidth={2} opacity={Math.sin(u * Math.PI)} />; })}
        </>)}
      </Escena>
      {/* 6 · la semilla se guarda, se intercambia y se prueba */}
      <Escena T={T} a={K.Se} b={K.Al} zoom={0.04}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
        {svg((() => { const sw = kprog(T, K.Se + 1.6, K.Se + 2.6, kEase.suave), br = kprog(T, K.Se + 2.8, K.Se + 3.6);
          return <>
            <Mazorca T={T} id="seme" x={540} y={600} s={0.55} rot={90} L={240} W={95} punta={0.3} grano="normal" tam={34} color={['#3f57a8', '#2f4590']} hojas={false} desgrana={kprog(T, K.Se + 0.2, K.Se + 1.4) * 0.6} />
            {Array.from({ length: 10 }, (_, i) => { const at = K.Se + 0.3 + i * 0.1, u = kprog(T, at, at + 0.45, (p) => p * p); return u > 0 && u < 1 ? <circle key={i} cx={430 + i * 20} cy={klerp(640, 900, u)} r={11} fill="#3f57a8" stroke={KC.ink} strokeWidth={2} /> : null; })}
            <Frasco x={klerp(330, 750, sw)} y={1080 - Math.sin(sw * Math.PI) * 120} color="#3f57a8" lleno={0.3 + 0.6 * kprog(T, K.Se + 0.3, K.Se + 1.4)} />
            <Frasco x={klerp(750, 330, sw)} y={1080 + Math.sin(sw * Math.PI) * 60} color="#f4c94a" lleno={0.85} />
            {sw > 0 && sw < 1 && <path d="M 400 900 Q 540 820 680 900 M 680 1180 Q 540 1260 400 1180" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="20 14" strokeDashoffset={-T * 60} />}
            {/* una semilla que se prueba en la tierra */}
            <g opacity={br}><rect x={470} y={1450} width={140} height={60} rx={14} fill="#8a5a33" /><circle cx={540} cy={1455} r={13} fill="#f4c94a" stroke={KC.ink} strokeWidth={3} />
              <path d={`M 540 1450 Q 530 ${1450 - 70 * br} 548 ${1450 - 110 * br}`} stroke={KC.leaf} strokeWidth={8} fill="none" strokeLinecap="round" />
              <path d={`M 546 ${1450 - 90 * br} q 30 -20 50 -6 q -26 10 -50 6`} fill={KC.leaf} /></g>
          </>; })())}
      </Escena>
      {/* 7 · del nivel del mar a 3,400 m */}
      <Escena T={T} a={K.Al} b={K.P} zoom={0.03}>
        <FondoLunares color="#bfe7ff" punto="rgba(255,255,255,.4)" />
        {svg(<>
          <Montana T={T} />
          <Mazorca T={T} id="costa" x={270} y={1160} s={0.3} rot={-8} L={150} W={115} punta={0.25} tam={38} color={['#f3e6c4', '#f4d57a']} />
          <g opacity={kprog(T, K.Al + 1.6, K.Al + 2.0)}><Mazorca T={T} id="cono" x={850} y={400} s={0.3} rot={8} L={230} W={110} punta={0.55} tam={36} color={['#f3e6c4', '#3f57a8', '#c9352f']} /></g>
          {/* marcador que sube por la ladera */}
          {(() => { const u = kprog(T, K.Al + 0.3, K.Al + 3.4, kEase.suave), px = klerp(200, 900, u), py = u < 0.12 ? 1250 : klerp(1250, 470, (u - 0.12) / 0.88); return <g><circle cx={px} cy={py - 20} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><line x1={px} y1={py - 20} x2={px} y2={py - 80} stroke={KC.ink} strokeWidth={5} /></g>; })()}
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿y el azul o morado? */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <text x={240} y={720} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 240 600)`}>?</text>
          {[['#3f57a8', 130, 1030], ['#7a2c6e', 290, 1060], ['#c9352f', 450, 1020]].map(([c, mx, my], i) => <Mazorca key={i} T={T} id={'pq' + i} x={mx} y={my} s={0.42} rot={Math.sin(T * 2 + i) * 10} L={230} W={100} punta={0.3} tam={36} color={[c, mixHex(c, '#000000', 0.25)]} hojas={false} />)}
        </>)}
      </Escena>
      {/* 9 · por dentro: antocianinas en pericarpio, aleurona o las dos */}
      <Escena T={T} a={K.Co} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} color="rgba(180,140,255,.2)" />
        {svg((() => { const a = kprog(T, K.Co + 0.8, K.Co + 1.6), b = kprog(T, K.Co + 2.0, K.Co + 2.8), c = kprog(T, K.Co + 3.4, K.Co + 4.2);
          return <GranoCorte T={T} x={540} y={860} s={1.05} peri={Math.max(a * (1 - b), c)} aleu={Math.max(b, c)} />; })())}
        {T > K.Co - 0.3 && T < K.E + 0.3 && <Escala T={T} z={1} pxPorMm={60} x={60} y={1610} />}
      </Escena>
      {/* 10 · el estudio: Wellhausen et al., 1951 */}
      <Escena T={T} a={K.E} b={K.Ta} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {svg(<MapaMexico x={60} y={760} ancho={960} conCA={false}>
          {PUNTOS.map(([lon, lat, r], i) => { const [px, py] = mxProy(lon, lat), at = K.E + 1.0 + (i / PUNTOS.length) * 2.4, u = kprog(T, at, at + 0.3, kEase.rebote);
            return u > 0 ? <circle key={i} cx={px} cy={py} r={9 * u} fill={GRANOS[i % 8]} stroke={KC.ink} strokeWidth={3} /> : null; })}
        </MapaMexico>)}
      </Escena>
      {/* 11 · Chalqueño: harina de tamal y hoja para envolver */}
      <Escena T={T} a={K.Ta} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
        {svg((() => { const env = kprog(T, K.Ta + 3.0, K.Ta + 4.4, kEase.suave);
          return <>
            <Mazorca T={T} id="chal" x={260} y={870} s={0.88} rot={-6} L={300} W={115} punta={0.5} grano="normal" tam={32} color={['#f5ead2', '#ece0c2', '#f8f1e2']} />
            {Array.from({ length: 10 }, (_, i) => { const at = K.Ta + 0.6 + i * 0.12, u = kprog(T, at, at + 0.6, (p) => p * p); return u > 0 && u < 1 ? <circle key={i} cx={klerp(330, 720, u)} cy={klerp(800, 760, u) - Math.sin(u * Math.PI) * 150} r={13} fill="#f5ead2" stroke={KC.ink} strokeWidth={2} /> : null; })}
            {/* montoncito de harina */}
            <g opacity={kprog(T, K.Ta + 0.8, K.Ta + 1.2) * (1 - env)}><path d={`M 600 ${860} Q 720 ${860 - 120 * kprog(T, K.Ta + 0.8, K.Ta + 2.4)} 840 860 Z`} fill="#fbf4e2" stroke={KC.ink} strokeWidth={6} /><ellipse cx={720} cy={866} rx={150} ry={20} fill="rgba(0,0,0,.15)" /></g>
            {/* la hoja (totomoxtle) envuelve el tamal */}
            <g opacity={kprog(T, K.Ta + 2.6, K.Ta + 3.0)}><Tamal T={T} x={740} y={980} s={0.62} abre={1 - env} relleno="#c9352f" vapor={env} /></g>
          </>; })())}
      </Escena>
      {/* 12 · bancos de semillas y climas que vienen (hipótesis) */}
      <Escena T={T} a={K.B} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#0f1d2e' }}></div>
        <Ambiente T={T} n={30} color="rgba(200,230,255,.35)" tam={[3, 8]} />
        {svg((() => { const cal = kprog(T, K.B + 3.0, K.B + 5.0);
          return <>
            <Banco T={T} t0={K.B} brilla={kprog(T, K.B + 3.6, K.B + 4.2)} />
            <g opacity={kprog(T, K.B + 2.8, K.B + 3.2)}>
              <circle cx={880} cy={430} r={60 + 10 * cal} fill={KC.orange} opacity={0.6 + 0.4 * cal} />
              {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + T * 0.4; return <line key={i} x1={880 + Math.cos(a) * 80} y1={430 + Math.sin(a) * 80} x2={880 + Math.cos(a) * (110 + 20 * cal)} y2={430 + Math.sin(a) * (110 + 20 * cal)} stroke={KC.orange} strokeWidth={8} strokeLinecap="round" />; })}
            </g>
          </>; })())}
      </Escena>
      {/* 13 · cierre: el mismo tamal; las 64 razas se iluminan */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        {svg(<>
          <Cuadricula64 T={T} t0={K.Ci - 0.4} dur={0.01} x0={92} y0={1420} cw={56} ch={62} s={0.55} brillo={kprog(T, K.Ci + 1.0, K.Ci + 1.6)} />
          <Rosca T={T} x={800} y={1020} s={0.5} />
          <Tamal T={T} x={330} y={900} s={0.82} abre={1} />
        </>)}
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Po, titulo: 'Cada raza, su uso' }, { at: K.Pl, titulo: '¿Por qué tantas?' }, { at: K.P, titulo: 'El color' }, { at: K.E, titulo: 'El estudio' }, { at: K.B, titulo: 'Guardarlas' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.G + 2.0} texto="Especial Candelaria" x={540} y={1520} tam={42} borde={KC.pink} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.4} texto="¿maíz a secas?" x={300} y={420} tam={46} />
      <NumeroGigante T={T} at={K.G + 2.0} until={K.Po - 0.3} valor={64} dur={1.6} sufijo=" razas" x={290} y={560} tam={140} />
      <Etq T={T} at={K.Po + 0.4} until={K.To - 0.3} x={560} y={560} texto="Cacahuacintle" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Po + 0.8} until={K.To - 0.3} x={560} y={625} texto="grano grande y blanco" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Po + 1.6} until={K.To - 0.3} texto="pozole" x={780} y={1520} tam={46} borde={KC.red} />
      <Etq T={T} at={K.To + 0.4} until={K.Pa - 0.3} x={480} y={740} texto="istmo de Tehuantepec" tam={30} color={KC.ink} />
      <Etq T={T} at={K.To + 0.9} until={K.Pa - 0.3} x={60} y={830} texto="Zapalote Chico" tam={40} color={KC.ink} />
      <Chip T={T} at={K.To + 2.2} until={K.Pa - 0.3} texto="totopos" x={770} y={1520} tam={46} borde={KC.orange} />
      <Etq T={T} at={K.Pa + 0.3} until={K.Pl - 0.3} x={60} y={560} texto="Palomero Toluqueño" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Pa + 0.7} until={K.Pl - 0.3} x={60} y={620} texto="valle de Toluca · grano puntiagudo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Pa + 1.6} until={K.Pl - 0.3} texto="palomitas" x={540} y={1520} tam={46} borde={KC.yellow} />
      <Etq T={T} at={K.Pl + 0.6} until={K.Pl + 2.8} x={60} y={480} texto="cada lugar, su maíz" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Pl + 3.2} until={K.Se - 0.3} texto="polen libre: de planta en planta" x={540} y={1560} tam={38} borde={KC.gold2} />
      <Etq T={T} at={K.Se + 0.3} until={K.Se + 1.6} x={60} y={480} texto="se guarda" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Se + 1.6} until={K.Se + 2.8} x={60} y={480} texto="se intercambia" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Se + 2.8} until={K.Al - 0.3} x={60} y={480} texto="se prueba" tam={34} color={KC.ink} />
      <Medidor T={T} at={K.Al + 0.3} until={K.P - 0.3} y={1540} x={90} ancho={900} etiqueta="altura donde se siembra" valor={(t) => kprog(t, K.Al + 0.3, K.Al + 3.4, kEase.suave)} texto={(v) => kformato(Math.round(v * 3400 / 100) * 100) + ' m'} color={KC.mint} />
      <Etq T={T} at={K.Al + 0.6} until={K.P - 0.3} x={330} y={1080} texto="Zapalote Chico · costa" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Al + 1.8} until={K.P - 0.3} x={770} y={330} lado="izq" texto="Cónico · más de 3,000 m" tam={26} color={KC.ink} />
      {T > K.Co - 0.3 && T < K.E + 0.2 && <>
        <Etq T={T} at={K.Co + 0.8} until={K.E - 0.3} x={1030} y={560} lado="izq" texto="pericarpio (cáscara)" tam={30} />
        <Etq T={T} at={K.Co + 2.0} until={K.E - 0.3} x={60} y={1170} texto="capa de aleurona" tam={30} />
        <Etq T={T} at={K.Co + 0.3} until={K.E - 0.3} x={60} y={480} texto="un grano en corte" tam={30} />
      </>}
      <Chip T={T} at={K.Co + 3.4} until={K.E - 0.3} texto="antocianinas: en una capa o en las dos" x={540} y={1530} tam={34} borde={KC.lilac} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="1951" quien="Wellhausen y su equipo" revista="Razas de maíz en México" x={380} y={560} />
      <Chip T={T} at={K.E + 3.6} until={K.Ta - 0.3} texto="≈ 2,000 muestras → 25 razas" x={540} y={1530} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.E + 4.8} until={K.Ta - 0.3} texto="hoy: 64 razas" x={540} y={1630} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Ta + 0.3} until={K.B - 0.3} x={60} y={480} texto="Chalqueño · variante «palomo»" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ta + 1.4} until={K.Ta + 2.8} x={610} y={940} texto="harina de tamal" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ta + 3.4} until={K.B - 0.3} texto="su hoja envuelve tamales" x={540} y={1530} tam={42} borde={KC.leaf} />
      <Etq T={T} at={K.B + 0.4} until={K.B + 2.8} x={360} y={560} texto="banco de semillas" tam={34} />
      <Chip T={T} at={K.B + 3.6} until={K.Ci - 0.3} texto="hipótesis: maíces para climas futuros" x={540} y={1560} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="64 razas · 59 nativas" x={680} y={560} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Po - 0.1} texto="No es maíz a secas: *64 razas.*" />
      <Subtitulo T={T} idx={1} at={K.Po + 0.1} until={K.To - 0.1} texto="Cacahuacintle: *pozole.*" />
      <Subtitulo T={T} idx={2} at={K.To + 0.1} until={K.Pa - 0.1} texto="Zapalote Chico: *totopos.*" />
      <Subtitulo T={T} idx={3} at={K.Pa + 0.1} until={K.Pl - 0.1} texto="Palomero: *palomitas.*" />
      <Subtitulo T={T} idx={4} at={K.Pl + 0.1} until={K.Se - 0.1} texto="Adaptadas a cada lugar; *polen libre.*" />
      <Subtitulo T={T} idx={5} at={K.Se + 0.1} until={K.Al - 0.1} texto="Guardan e intercambian *su semilla.*" />
      <Subtitulo T={T} idx={6} at={K.Al + 0.1} until={K.P - 0.1} texto="Del mar *a 3,400 metros.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Y el maíz *azul o morado?*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.E - 0.1} texto="*Antocianinas* en el grano." />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Ta - 0.1} texto="1951: *25 razas.*" />
      <Subtitulo T={T} idx={10} at={K.Ta + 0.1} until={K.B - 0.1} texto="Chalqueño: *harina y hoja de tamal.*" />
      <Subtitulo T={T} idx={11} at={K.B + 0.1} until={K.Ci - 0.1} texto="Bancos de semillas *y climas futuros.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una raza *que alguien cuidó.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Totopos + 0.5, CUES.Palomitas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Polen + 3.5, CUES.Semilla - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Altura + 0.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Color + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 0.6, CUES.Tamal - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Tamal + 0.5, CUES.Banco - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Banco + 0.6, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RazasMaizApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RazasMaiz /></CompositionStage></div>;
}
window.RazasMaizApp = RazasMaizApp;
