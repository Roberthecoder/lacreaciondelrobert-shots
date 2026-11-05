// Shot Fungi Mati #98 · Ese montículo es una granja: las termitas que cultivan Termitomyces — NARRADO.
// Formato N1 "Por dentro" + tramo N5 (los nidos fósiles de Tanzania). Gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md.
// Morfología (Härkönen et al. 2015, Zambian mushrooms): T. titanicus con sombrero blanquecino y centro café humo, umbo bajo y ancho SIN punta,
// anillo colgante justo bajo las láminas, pie grueso y relativamente corto, pseudorriza delgada y larga que baja al panal.
// Montículo viejo cubierto de pasto y arbustos (sin chimeneas). Obreras viejas del mismo tamaño que las jóvenes. Todo es esquemático.

const TC = { cuerpo:'#f3e7cf', cuerpo2:'#d8c6a2', cabeza:'#d39a4c', tierra:'#b5653a', tierra2:'#8f4a28', tierra3:'#6e3720', hueco:'#2a170d',
  panal:'#a8774a', panal2:'#5e3b22', huecoPanal:'#2e1b0f', nodulo:'#fffaf0', seta:'#f2ece0', setaC:'#8b7458', lamina:'#efe0d2', raiz:'#e3d6bd',
  pasto:'#5aa63a', pasto2:'#3f8a2a', seco:'#e3b04b', hoja:'#9c7a2e', madera:'#8a5a2b', sabana:'#e9b44c', sabana2:'#d39a36', roca:'#cfc4ad', roca2:'#a99b80', alas:'rgba(232,238,248,.78)' };

/* ---------- piezas ---------- */
// Obrera de termita de perfil (mira a la derecha): abdomen pálido, cabeza ámbar, mandíbulas, antenas de cuentas, sin ojos. carga: nodo SVG en las mandíbulas.
function Termita({ T = 0, x, y, s = 1, ang = 0, fase = 0, anda = 1, cabeza = TC.cabeza, cuerpo = TC.cuerpo, carga = null, come = 0, espejo = false }) {
  const p = Math.sin(T * 16 + fase) * anda, m = come ? Math.max(0, Math.sin(T * 18 + fase)) * 6 : 0;
  const pata = (lx, sw, k) => <path key={k} d={`M ${lx} 6 L ${lx - 8 + sw} 24 L ${lx - 14 + sw} 36`} stroke={KC.ink} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${espejo ? -s : s} ${s})`}>
    {[-16, 0, 16].map((lx, i) => pata(lx + 4, (i % 2 ? p : -p) * 7, 'a' + i))}
    <ellipse cx={-46} cy={0} rx={36} ry={20} fill={cuerpo} stroke={KC.ink} strokeWidth={4.5} />
    {[-62, -50, -38].map((sx, i) => <path key={i} d={`M ${sx} -17 Q ${sx + 5} 0 ${sx} 17`} stroke={TC.cuerpo2} strokeWidth={3.5} fill="none" />)}
    <ellipse cx={-6} cy={-1} rx={15} ry={13} fill={cuerpo} stroke={KC.ink} strokeWidth={4.5} />
    <ellipse cx={10} cy={-2} rx={11} ry={11} fill={cuerpo} stroke={KC.ink} strokeWidth={4} />
    {[-16, 0, 16].map((lx, i) => pata(lx + 2, (i % 2 ? -p : p) * 7, 'b' + i))}
    <path d={`M 40 -8 Q 54 ${-16 - m} 66 -2`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d={`M 40 6 Q 54 ${14 + m} 64 4`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={30} cy={-2} rx={19} ry={16} fill={cabeza} stroke={KC.ink} strokeWidth={4.5} />
    <path d="M 36 -15 Q 48 -40 66 -40" stroke={KC.ink} strokeWidth={3.5} fill="none" />
    {[0.25, 0.5, 0.75, 1].map((u, i) => <circle key={i} cx={36 + 30 * u} cy={-15 - 25 * Math.sin(u * 1.6)} r={3.2} fill={KC.ink} />)}
    {carga && <g transform="translate(70 2)">{carga}</g>}
  </g>;
}
// Termita alada (rey o reina): cuerpo oscuro, ojos, alas largas. bola 0..1 = bolita de hongo que lleva por dentro (esquemático).
function Alado({ T = 0, x, y, s = 1, ang = 0, alas = 1, bola = 0, fase = 0 }) {
  const al = Math.sin(T * 3 + fase) * 2;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    {alas > 0 && <g opacity={alas}>
      <path d={`M 0 -10 Q -80 ${-34 + al} -170 -18 Q -96 4 0 -2 Z`} fill={TC.alas} stroke={KC.ink} strokeWidth={3.5} />
      <path d={`M 0 -6 Q -86 ${-14 - al} -178 2 Q -100 16 0 4 Z`} fill={TC.alas} stroke={KC.ink} strokeWidth={3.5} />
      <path d="M -10 -8 L -150 -16 M -10 -2 L -160 0" stroke="rgba(22,18,15,.35)" strokeWidth={2} />
    </g>}
    {[-14, 0, 14].map((lx, i) => <path key={i} d={`M ${lx} 8 L ${lx - 6} 26 L ${lx - 12} 36`} stroke={KC.ink} strokeWidth={4.5} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-36} cy={4} rx={34} ry={18} fill="#7a4a26" stroke={KC.ink} strokeWidth={4.5} />
    {[-52, -40, -28].map((sx, i) => <path key={i} d={`M ${sx} -11 Q ${sx + 5} 4 ${sx} 19`} stroke="#5a3418" strokeWidth={3} fill="none" />)}
    {bola > 0 && <circle cx={-14} cy={2} r={12 * bola} fill={TC.nodulo} stroke={KC.ink} strokeWidth={3} style={{ filter:`drop-shadow(0 0 ${10 * bola}px #fff4d6)` }} />}
    <ellipse cx={4} cy={0} rx={14} ry={13} fill="#7a4a26" stroke={KC.ink} strokeWidth={4.5} />
    <ellipse cx={28} cy={-2} rx={17} ry={15} fill="#5a3418" stroke={KC.ink} strokeWidth={4.5} />
    <circle cx={34} cy={-6} r={5} fill={KC.ink} />
    <path d="M 38 -14 Q 50 -36 66 -36" stroke={KC.ink} strokeWidth={3.5} fill="none" />
  </g>;
}
// Acacia de la sabana (copa plana).
function Acacia({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 0 L -6 -150 L -60 -230 M -6 -150 L 50 -240 M -8 -120 L -90 -200" stroke="#6b4a2b" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M -200 -230 Q -120 ${-300 + mece(T, 2, 0.2) * 4} 0 -290 Q 140 -300 210 -236 Q 100 -205 0 -214 Q -110 -205 -200 -230 Z`} fill={TC.pasto2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Mata de pasto (sobre el montículo y la sabana).
function Mata({ x, y, s = 1, T = 0, seed = 1, color = TC.pasto }) {
  const m = mece(T, seed, 0.4) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-18, -8, 0, 8, 18].map((dx, i) => <path key={i} d={`M ${dx * 0.4} 0 Q ${dx + m * 0.5} -22 ${dx * 1.6 + m} -44`} stroke={i % 2 ? TC.pasto2 : color} strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Montículo viejo de termitas, cubierto de pasto y arbustos (sin chimeneas). Base en (x, y), ancho W, alto H.
// corte 0..1 = ventana "por dentro" con la cámara y el panal; seta 0..1 = T. titanicus que brota arriba (con su pseudorriza al panal).
function Monticulo({ T = 0, x, y, W = 740, H = 520, corte = 0, seta = 0, setaS = 0.8, hoyos = true, nod = 0.6 }) {
  const d = `M ${-W / 2} 0 Q ${-W * 0.46} ${-H * 0.62} ${-W * 0.2} ${-H * 0.94} Q 0 ${-H * 1.04} ${W * 0.2} ${-H * 0.93} Q ${W * 0.47} ${-H * 0.6} ${W / 2} 0 Z`;
  const cima = -H * 0.99, cx = 0, cy = -H * 0.36, cw = W * 0.5, ch = H * 0.36;
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={TC.tierra} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-0.28, -0.3, 60, 26], [0.22, -0.22, 70, 22], [-0.05, -0.62, 54, 20], [0.3, -0.55, 40, 16], [-0.32, -0.62, 36, 14]].map(([u, v, rx, ry], i) =>
      <ellipse key={i} cx={u * W} cy={v * H} rx={rx} ry={ry} fill={TC.tierra2} opacity=".55" />)}
    {/* pasto y arbustos encima: montículo viejo */}
    {[[-0.36, -0.42, 1], [-0.24, -0.78, 1.1], [-0.06, -0.97, 1.2], [0.12, -0.95, 1], [0.3, -0.7, 1.1], [0.42, -0.36, 0.9], [-0.42, -0.18, 0.9], [0.05, -0.55, 0.8], [-0.15, -0.3, 0.8], [0.22, -0.42, 0.7]].map(([u, v, k], i) =>
      <Mata key={i} x={u * W} y={v * H} s={k} T={T} seed={i + 3} />)}
    {[[-0.3, -0.66, 1.1], [0.27, -0.8, 0.95], [0.4, -0.18, 0.8]].map(([u, v, k], i) => <g key={'a' + i} transform={`translate(${u * W} ${v * H}) scale(${k})`}>
      <circle cx={-26} cy={-18} r={30} fill={TC.pasto2} stroke={KC.ink} strokeWidth={6} /><circle cx={16} cy={-26} r={36} fill={TC.pasto} stroke={KC.ink} strokeWidth={6} /><circle cx={44} cy={-10} r={24} fill={TC.pasto2} stroke={KC.ink} strokeWidth={6} />
    </g>)}
    {hoyos && [[-0.3, -10], [0.08, -8], [0.33, -10]].map(([u, dy], i) => <ellipse key={i} cx={u * W} cy={dy} rx={26} ry={13} fill={TC.hueco} stroke={KC.ink} strokeWidth={4} />)}
    {/* ventana por dentro (esquemática) */}
    {corte > 0 && <g opacity={corte}>
      <ellipse cx={cx} cy={cy} rx={cw / 2 + 26} ry={ch / 2 + 22} fill={TC.tierra3} stroke={KC.gold2} strokeWidth={7} strokeDasharray="20 12" />
      <ellipse cx={cx} cy={cy} rx={cw / 2} ry={ch / 2} fill={TC.hueco} stroke={KC.ink} strokeWidth={5} />
      <Panal x={cx} y={cy + 6} w={cw * 0.82} h={ch * 0.8} seed={9} nod={nod} id="pM" />
    </g>}
    {seta > 0 && <>
      {corte > 0 && <path d={`M 4 ${cima} C 18 ${cima + 120} -14 ${cy - ch * 0.6} 6 ${cy - ch * 0.3}`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" opacity={corte * kclamp(seta * 2, 0, 1)} />}
      {corte > 0 && <path d={`M 4 ${cima} C 18 ${cima + 120} -14 ${cy - ch * 0.6} 6 ${cy - ch * 0.3}`} stroke={TC.raiz} strokeWidth={7} fill="none" strokeLinecap="round" opacity={corte * kclamp(seta * 2, 0, 1)} />}
      <Titanicus x={4} y={cima + 6} s={setaS} crece={seta} />
    </>}
  </g>;
}
// Panal de hongo (fungus comb): masa esponjosa en laberinto, hecha de bolitas de popó. tono 0 fresco → 1 maduro; nod = nódulos visibles; come = comido desde abajo.
function Panal({ x, y, w = 600, h = 420, seed = 3, tono = 0.3, nod = 0, come = 0, id = 'pn', hifas = 0, T = 0 }) {
  const g = krng(seed), n = 26;
  const borde = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, r = 1 + (g() - 0.5) * 0.1; return `${i ? 'L' : 'M'} ${(Math.cos(a) * w / 2 * r).toFixed(1)} ${(Math.sin(a) * h / 2 * r).toFixed(1)}`; }).join(' ') + ' Z';
  const tubos = Array.from({ length: 34 }, () => { const a = g() * Math.PI * 2, rr = Math.sqrt(g()) * 0.82; return [Math.cos(a) * rr * w / 2, Math.sin(a) * rr * h / 2, 14 + g() * 26, g() * 180, 8 + g() * 8]; });
  const nods = Array.from({ length: 24 }, () => { const a = g() * Math.PI * 2, rr = Math.sqrt(g()) * 0.8; return [Math.cos(a) * rr * w / 2, Math.sin(a) * rr * h / 2, 6 + g() * 5]; });
  const col = mixHex(TC.panal, TC.panal2, tono), alto = h * (1 - come);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><rect x={-w} y={-h / 2 - 20} width={w * 2} height={alto + 20} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <path d={borde} fill={col} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {tubos.map(([tx, ty, l, r, sw], i) => <path key={i} d={`M ${-l} 0 Q 0 ${-l * 0.7} ${l} 0 Q ${l * 1.4} ${l * 0.5} ${l * 1.8} ${l * 0.1}`} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) rotate(${r.toFixed(0)})`}
        stroke={TC.huecoPanal} strokeWidth={sw} fill="none" strokeLinecap="round" opacity=".85" />)}
      {hifas > 0 && <RedHifas T={T} x={0} y={0} g={hifas} seed={seed + 40} n={220} escala={Math.min(w, h) / 900} color={FK.hifa} ancho={3} brillo={0.5} />}
      {nods.map(([nx, ny, r], i) => nod > (i + 0.5) / nods.length ? <circle key={'n' + i} cx={nx} cy={ny} r={r} fill={TC.nodulo} stroke={KC.ink} strokeWidth={2.5} /> : null)}
    </g>
    {come > 0 && Array.from({ length: 7 }, (_, i) => <circle key={'m' + i} cx={-w * 0.35 + i * w * 0.12} cy={-h / 2 + alto + 10 + (i % 2) * 8} r={6} fill={col} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Termitomyces titanicus de perfil. Base del pie en (x, y). crece 0..1. Sombrero blanquecino con centro café humo, umbo bajo y ancho sin punta,
// láminas, anillo colgante justo bajo las láminas, pie grueso y relativamente corto. (La pseudorriza la dibuja quien la llama.)
function Titanicus({ x, y, s = 1, crece = 1, id = 'tt' }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1)), h = 210 * kclamp(c * 1.25, 0, 1), W = 560 * (0.35 + 0.65 * kclamp(c * 1.4 - 0.3, 0, 1)), A = W * 0.2;
  const cap = `M ${-W / 2} ${-h + 8} Q ${-W * 0.42} ${-h - A * 0.9} ${-W * 0.14} ${-h - A * 1.08} Q 0 ${-h - A * 1.32} ${W * 0.14} ${-h - A * 1.08} Q ${W * 0.42} ${-h - A * 0.9} ${W / 2} ${-h + 8} Q 0 ${-h - A * 0.18} ${-W / 2} ${-h + 8} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><radialGradient id={id} cx="50%" cy="0%" r="60%"><stop offset="0%" stopColor={TC.setaC} /><stop offset="45%" stopColor="#b9a688" /><stop offset="100%" stopColor={TC.seta} /></radialGradient></defs>
    <path d={`M -44 0 Q -50 ${-h * 0.5} -34 ${-h} L 34 ${-h} Q 50 ${-h * 0.5} 44 0 Z`} fill={TC.seta} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M -20 -10 Q -24 ${-h * 0.5} -16 ${-h + 10}`} stroke="#d9cfbd" strokeWidth={6} fill="none" />
    <path d={`M ${-W * 0.47} ${-h + 6} Q 0 ${-h + A * 0.32} ${W * 0.47} ${-h + 6} Q 0 ${-h - A * 0.1} ${-W * 0.47} ${-h + 6} Z`} fill={TC.lamina} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 13 }, (_, i) => { const u = -0.42 + i * 0.07; return <line key={i} x1={u * W} y1={-h + 4} x2={u * W * 0.2} y2={-h + A * 0.18} stroke="#c9b3a2" strokeWidth={2.5} />; })}
    {h > 80 && <path d={`M -38 ${-h + 26} Q -62 ${-h + 54} -54 ${-h + 74} Q 0 ${-h + 88} 54 ${-h + 74} Q 62 ${-h + 54} 38 ${-h + 26} Z`} fill={TC.seta} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />}
    <path d={cap} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-0.4, -0.3, 0.32, 0.42].map((u, i) => <path key={i} d={`M ${u * W} ${-h - A * 0.5} l ${u > 0 ? 10 : -10} 16`} stroke="#bfb29b" strokeWidth={4} strokeLinecap="round" />)}
  </g>;
}
// Bolitas de popó que caen de una obrera al panal: lista de [t0, x0, y0, x1, y1].
function Bolitas({ T, lista, r = 11, color = TC.panal }) {
  return <g>{lista.map(([t0, x0, y0, x1, y1], i) => { const u = kprog(T, t0, t0 + 0.5, kEase.sale); if (u <= 0) return null;
    return <circle key={i} cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u) - Math.sin(u * Math.PI) * 40} r={r} fill={color} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}
// Mapa esquemático: África y Asia tropical (zona de las termitas cultivadoras) resaltadas en menta.
function MapaAfroAsia({ T, at, x = 0, y = 0, s = 1 }) {
  const k = (d) => kclamp(kprog(T, at + d, at + d + 0.5, kEase.sale), 0, 1);
  const beige = '#f6e3b4', menta = KC.mint;
  const africa = 'M 70 60 L 210 30 L 270 70 L 300 120 L 370 150 L 340 230 L 300 290 L 280 370 L 230 450 L 190 440 L 170 350 L 140 270 L 70 220 L 25 150 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g opacity={k(0)}>
      <defs><clipPath id="subsahara"><rect x={0} y={150} width={420} height={400} /></clipPath></defs>
      <path d={africa} fill={beige} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={africa} fill={menta} clipPath="url(#subsahara)" opacity={k(0.5)} />
      <path d={africa} fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={345} cy={360} rx={16} ry={44} transform="rotate(20 345 360)" fill={menta} stroke={KC.ink} strokeWidth={5} opacity={k(0.5)} />
    </g>
    <g opacity={k(0.3)}>
      <path d="M 300 70 L 420 60 L 440 150 L 380 190 L 320 120 Z" fill={beige} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 430 0 L 860 -20 L 900 80 L 760 120 L 640 110 L 520 80 L 440 60 Z" fill={beige} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 500 80 L 620 100 L 580 250 L 545 280 L 510 180 Z" fill={menta} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" opacity={0.4 + 0.6 * k(0.8)} />
      <ellipse cx={575} cy={300} rx={14} ry={20} fill={menta} stroke={KC.ink} strokeWidth={4} opacity={0.4 + 0.6 * k(0.8)} />
      <path d="M 640 110 L 760 120 L 780 200 L 730 280 L 700 240 L 690 170 Z" fill={menta} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" opacity={0.4 + 0.6 * k(0.8)} />
      <path d="M 700 310 L 790 330 L 780 350 L 690 330 Z M 800 300 L 860 290 L 870 330 L 810 340 Z" fill={menta} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" opacity={0.4 + 0.6 * k(0.8)} />
    </g>
    <text x={190} y={300} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={k(0.6)}>África</text>
    <text x={680} y={60} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={k(0.9)}>Asia</text>
  </g>;
}
// Persona sencilla (familia en el puesto).
function Persona({ x, y, s = 1, color = KC.coral, piel = '#7a4a2e', T = 0, fase = 0 }) {
  const m = Math.sin(T * 2 + fase) * 2;
  return <g transform={`translate(${x} ${y + m}) scale(${s})`}>
    <path d="M -46 0 L -40 -120 Q 0 -160 40 -120 L 46 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={-170} r={38} fill={piel} stroke={KC.ink} strokeWidth={6} />
    <path d="M -14 -168 L -14 -160 M 14 -168 L 14 -160" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    <path d="M -12 -146 Q 0 -138 12 -146" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}
// Roca cortada con el nido fósil: cámaras, y en tres de ellas el panal petrificado (red de tubitos tipo espagueti). p 0..1 aparece.
function RocaFosil({ T, x, y, p = 1, s = 1 }) {
  const g = krng(77);
  const camaras = [[-250, -40, 150, 110, true], [40, -120, 130, 95, false], [230, 30, 160, 115, true], [-60, 120, 140, 100, true]];
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.9, 1, p)})`} opacity={p}>
    <path d="M -440 -260 Q -200 -300 60 -270 Q 300 -300 440 -250 L 450 250 Q 200 290 -40 260 Q -280 290 -450 250 Z" fill={TC.roca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-180, -90, 0, 90, 180].map((yy, i) => <path key={i} d={`M -440 ${yy} Q -150 ${yy - 20 + i * 4} 120 ${yy + 10} T 445 ${yy - 6}`} stroke={TC.roca2} strokeWidth={4} fill="none" opacity=".7" />)}
    <path d="M -250 -40 Q -110 -110 40 -120 M 40 -120 Q 160 -60 230 30 M -250 -40 Q -180 60 -60 120 M -60 120 Q 90 100 230 30" stroke="#8d7f66" strokeWidth={16} fill="none" strokeLinecap="round" />
    {camaras.map(([cx, cy, rx, ry, panal], i) => <g key={i}>
      <ellipse cx={cx} cy={cy} rx={rx * 0.5} ry={ry * 0.5} fill="#6e6250" stroke={KC.ink} strokeWidth={6} />
      {panal && Array.from({ length: 9 }, (_, k) => { const ax = cx + (g() - 0.5) * rx * 0.7, ay = cy + (g() - 0.5) * ry * 0.6; return <path key={k} d={`M ${ax - 18} ${ay} q 10 -16 20 0 t 20 0`} stroke="#efe6d2" strokeWidth={6} fill="none" strokeLinecap="round" />; })}
    </g>)}
  </g>;
}

// Etiqueta en cajita clara (acepta JSX para poner en cursiva solo el nombre científico).
function Caja({ T, at, until, x, y, texto, tam = 32, centro = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`${centro ? 'translateX(-50%) ' : ''}translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.95)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px ${KF.mono}`, color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}
// Subtítulo con *palabra clave* resaltada y _nombres científicos_ en cursiva (mismo diseño y zona que el Subtitulo del kit).
function SubT({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Texto SVG con contorno (se lee sobre cualquier fondo).
const TxtS = ({ x, y, t, tam = 30, anchor = 'middle', color = KC.texto, o = 1, it = false }) =>
  <text x={x} y={y} textAnchor={anchor} opacity={o} style={{ font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal' }} fill={color} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{t}</text>;

// La sabana del gancho y del cierre (misma imagen).
function Sabana({ T }) {
  return <>
    <rect x={0} y={1040} width={KW} height={KH - 1040} fill={TC.sabana} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => <Mata key={i} x={30 + i * 68} y={1060 + (i % 3) * 26} s={0.8} T={T} seed={i + 20} color={TC.seco} />)}
    <Acacia x={930} y={1050} s={0.9} T={T} />
  </>;
}

function TermitasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, F: CUES.Forraje, Pa: CUES.Panal, H: CUES.Hongo, B: CUES.Bolitas, V: CUES.Viejas, P: CUES.Pregunta,
    Es: CUES.Esporas, E: CUES.Estudio, O: CUES.Origen, Ti: CUES.Titanicus, M: CUES.Mercado, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const MX = 440, MY = 1110; // montículo del gancho y del cierre
  const acerca = kprog(T, K.G, K.G + 1.2, kEase.sale);
  // obreras que entran al montículo (gancho y cierre)
  const filaEntrada = (t0) => [0, 1, 2, 3].map((i) => { const u = ((T - t0) * 0.16 + i * 0.25) % 1; return <Termita key={i} T={T} x={klerp(20, MX - 230, u)} y={MY + 8} s={0.55} fase={i} />; });
  const crecePanal = kprog(T, K.Pa + 0.4, K.Pa + 3.0, kEase.sale);
  const pellets = Array.from({ length: 8 }, (_, i) => { const izq = i % 2 === 0; return [K.Pa + 0.5 + i * 0.32, izq ? 250 : 820, izq ? 700 : 725, 380 + i * 45, klerp(760, 680, kprog(T, K.Pa + 0.4, K.Pa + 3.0)) + (i % 3) * 14]; });
  const nodB = kprog(T, K.B + 0.2, K.B + 1.6);
  const madura = kprog(T, K.V + 0.1, K.V + 1.0), comido = kprog(T, K.V + 0.6, K.V + 2.6) * 0.42;
  const aterriza = kprog(T, K.P + 0.1, K.P + 1.3, kEase.sale);
  const setaTi = kprog(T, K.Ti + 1.6, K.Ti + 4.0, kEase.sale);
  const lluvia = 1 - kprog(T, K.Ti + 2.4, K.Ti + 3.4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el montículo de la sabana; la cámara se acerca y las obreras entran */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.06} origen="40% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={`translate(${MX - MX * (1 + 0.1 * acerca)} ${MY - MY * (1 + 0.1 * acerca)}) scale(${1 + 0.1 * acerca})`}>
          <Sabana T={T} />
          <Monticulo T={T} x={MX} y={MY} />
          {filaEntrada(K.G - 2)}
        </g>)}
      </Escena>
      {/* 2 · dónde viven: África y Asia; el hongo se llama Termitomyces */}
      <Escena T={T} a={K.N} b={K.F} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaAfroAsia T={T} at={K.N + 0.1} x={70} y={680} s={0.95} />)}
      </Escena>
      {/* 3 · las obreras traen planta muerta: pasto seco, hojas y madera */}
      <Escena T={T} a={K.F} b={K.Pa} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1080} width={KW} height={KH} fill={TC.sabana} stroke={KC.ink} strokeWidth={8} />
          <path d="M 860 1084 Q 900 720 1120 660 L 1120 1084 Z" fill={TC.tierra} stroke={KC.ink} strokeWidth={8} />
          <Acacia x={260} y={1084} s={1.15} T={T} /><Mata x={990} y={740} s={1} T={T} seed={4} /><Mata x={930} y={840} s={0.9} T={T} seed={5} />
          <ellipse cx={935} cy={1062} rx={40} ry={20} fill={TC.hueco} stroke={KC.ink} strokeWidth={5} />
          {[['pasto seco', <path d="M -6 -4 Q 40 -50 110 -60" stroke={TC.seco} strokeWidth={9} fill="none" strokeLinecap="round" />],
            ['hoja', <path d="M 0 0 Q 30 -50 80 -30 Q 50 14 0 0 Z" fill={TC.hoja} stroke={KC.ink} strokeWidth={4} />],
            ['madera', <rect x={-4} y={-14} width={90} height={22} rx={6} fill={TC.madera} stroke={KC.ink} strokeWidth={4} transform="rotate(-12)" />]].map(([nom, carga], i) => {
            const xx = klerp(60 + i * 290, 250 + i * 290, kprog(T, K.F - 0.4, K.Pa + 0.4));
            return <g key={i}><Termita T={T} x={xx} y={1026} s={1.4} fase={i * 1.3} carga={carga} />
              <TxtS x={xx + 20} y={900} t={nom} tam={34} o={kprog(T, K.F + 0.4 + i * 0.6, K.F + 0.8 + i * 0.6)} /></g>; })}
        </>)}
      </Escena>
      {/* 4 · por dentro del montículo: las jóvenes comen la planta y con su popó arman el panal */}
      <Escena T={T} a={K.Pa} b={K.H} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:TC.tierra3 }}></div>
        {fsvg(<>
          {[[160, 470, 300], [880, 520, 260], [300, 1180, 360]].map(([tx, ty, w], i) => <path key={i} d={`M ${tx - w} ${ty} Q ${tx} ${ty - 70} ${tx + w} ${ty + 20}`} stroke={TC.hueco} strokeWidth={60} fill="none" strokeLinecap="round" opacity=".7" />)}
          <ellipse cx={540} cy={820} rx={430} ry={290} fill={TC.hueco} stroke={KC.ink} strokeWidth={8} />
          <Panal x={540} y={850} w={600} h={klerp(220, 380, crecePanal)} seed={5} tono={0.2} id="pPa" />
          <Bolitas T={T} lista={pellets} />
          <Termita T={T} x={250} y={720} s={1.3} ang={20} fase={0.4} anda={0.3} />
          <Termita T={T} x={820} y={745} s={1.3} ang={-25} fase={1.2} anda={0.3} espejo />
        </>)}
      </Escena>
      {/* 5 · al microscopio: crecen las hifas y la planta se deshace */}
      <Escena T={T} a={K.H} b={K.B} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg((() => { const d = kprog(T, K.H + 0.3, K.B + 0.2); return <>
          {Array.from({ length: 7 }, (_, i) => { const y0 = 600 + i * 78; return <path key={i} d={`M 80 ${y0} Q 400 ${y0 - 60 + i * 12} 700 ${y0 + 20} T 1010 ${y0 - 10}`} stroke={mixHex('#9c8a3a', '#5a4a2a', d)} strokeWidth={30 - d * 12}
            fill="none" strokeLinecap="round" strokeDasharray={d > 0.05 ? `${Math.max(8, 260 - d * 240)} ${10 + d * 70}` : 'none'} opacity={1 - d * 0.55} />; })}
          <RedHifas T={T} x={540} y={820} g={kprog(T, K.H, K.B + 0.3)} seed={98} n={360} escala={0.85} color={FK.hifa} ancho={6} brillo={0.8} />
        </>; })())}
      </Escena>
      {/* 6 · nódulos: bolitas blancas de esporas que comen las jóvenes para sembrar más panal */}
      <Escena T={T} a={K.B} b={K.V} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:TC.tierra3 }}></div>
        {fsvg(<>
          <ellipse cx={540} cy={820} rx={430} ry={290} fill={TC.hueco} stroke={KC.ink} strokeWidth={8} />
          <Panal x={540} y={850} w={600} h={380} seed={5} tono={0.35} nod={nodB} id="pB" />
          {(() => { const u = kprog(T, K.B + 2.0, K.B + 3.4, kEase.suave); return <Termita T={T} x={klerp(150, 280, u)} y={klerp(1060, 990, u)} s={1.3} ang={-25} fase={0.2} anda={1 - u} come={u > 0.9 ? 1 : 0} />; })()}
          {kprog(T, K.B + 3.0, K.B + 3.6) > 0 && <path d="M 250 920 C 220 640 380 600 450 650" stroke={KC.gold2} strokeWidth={8} fill="none" strokeDasharray="18 12" strokeDashoffset={-T * 40}
            opacity={kprog(T, K.B + 3.0, K.B + 3.6)} markerEnd="none" />}
          {kprog(T, K.B + 3.4, K.B + 3.8) > 0 && <path d="M 440 632 l 34 18 l -36 14 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.B + 3.4, K.B + 3.8)} />}
          {/* lupa sobre un nódulo: esporas */}
          {(() => { const k = kprog(T, K.B + 0.8, K.B + 1.3, kEase.rebote); if (k <= 0) return null; const nx = 720, ny = 740, lx = 800, ly = 520, R = 145 * k;
            return <g><line x1={nx} y1={ny} x2={lx - 20} y2={ly + R * 0.9} stroke={KC.gold2} strokeWidth={5} strokeDasharray="12 8" />
              <circle cx={nx} cy={ny} r={22} fill="none" stroke={KC.gold2} strokeWidth={5} />
              <circle cx={lx} cy={ly} r={R} fill="#1c120a" stroke={KC.gold2} strokeWidth={9} />
              <circle cx={lx} cy={ly} r={R * 0.62} fill={TC.nodulo} stroke={KC.ink} strokeWidth={5} />
              {Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, rr = (i % 4) * 0.13 * R + 0.05 * R; return <ellipse key={i} cx={lx + Math.cos(a) * rr} cy={ly + Math.sin(a) * rr} rx={9 * k} ry={6 * k} transform={`rotate(${i * 37} ${lx + Math.cos(a) * rr} ${ly + Math.sin(a) * rr})`} fill="#e6dcc6" stroke="#8a7a5a" strokeWidth={2} />; })}
            </g>; })()}
        </>)}
      </Escena>
      {/* 7 · las obreras viejas se comen el panal maduro */}
      <Escena T={T} a={K.V} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:TC.tierra3 }}></div>
        {fsvg(<>
          <ellipse cx={540} cy={820} rx={430} ry={290} fill={TC.hueco} stroke={KC.ink} strokeWidth={8} />
          <Panal x={540} y={850} w={600} h={380} seed={5} tono={klerp(0.35, 1, madura)} nod={0.5} come={comido} id="pV" />
          {[[330, 0], [540, 1], [750, 2]].map(([xx, i]) => <Termita key={i} T={T} x={xx} y={klerp(1160, 850 + 190 - 380 * comido + 56, kprog(T, K.V + 0.2, K.V + 1.0))} s={1.1} ang={-90} fase={i} anda={0.5} come={1} cabeza="#b9803c" />)}
        </>)}
      </Escena>
      {/* 8 · re-gancho: llegan el rey y la reina, solos, sin hongo */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1010} width={KW} height={KH} fill={TC.tierra} stroke={KC.ink} strokeWidth={8} />
          <Alado T={T} x={klerp(90, 190, aterriza)} y={klerp(620, 980, aterriza)} s={1.3} ang={klerp(-20, 0, aterriza)} />
          <Alado T={T} x={klerp(560, 440, aterriza)} y={klerp(560, 985, aterriza)} s={1.3} ang={klerp(25, 0, aterriza)} fase={1} />
          <TxtS x={170} y={1080} t="rey" tam={30} o={kprog(T, K.P + 1.2, K.P + 1.5)} />
          <TxtS x={420} y={1085} t="reina" tam={30} o={kprog(T, K.P + 1.3, K.P + 1.6)} />
          <Interrogacion T={T} x={300} y={800} tam={360} />
        </>)}
      </Escena>
      {/* 9 · ¿de dónde sale el hongo? la mayoría: esporas del ambiente · unas pocas: lo trae el rey o la reina */}
      <Escena T={T} a={K.Es} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1010} width={KW} height={KH} fill={TC.tierra} stroke={KC.ink} strokeWidth={8} />
          <line x1={540} y1={680} x2={540} y2={1010} stroke={KC.ink} strokeWidth={8} strokeDasharray="22 14" />
          <Titanicus x={130} y={1014} s={0.4} id="tEs" />
          {Array.from({ length: 16 }, (_, i) => { const u = ((T - K.Es) * 0.35 + i / 16) % 1; return T > K.Es ? <ellipse key={i} cx={150 + u * 300 + Math.sin(T * 2 + i) * 14} cy={880 - Math.sin(u * Math.PI) * 150 + u * 100 + (i % 4) * 10}
            rx={7} ry={4.5} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={1 - u * 0.4} /> : null; })}
          <Termita T={T} x={350} y={985} s={1} fase={0.3} anda={0.6} />
          <Termita T={T} x={470} y={980} s={1} fase={1.9} anda={0.6} espejo />
          <Alado T={T} x={860} y={850} s={1.9} alas={1} bola={kprog(T, K.Es + 3.1, K.Es + 3.8, kEase.rebote)} />
          <TxtS x={290} y={1070} t="esporas del ambiente" tam={28} o={kprog(T, K.Es + 0.8, K.Es + 1.2)} />
        </>)}
      </Escena>
      {/* 10 · el estudio: nidos fósiles con panal, Tanzania (publicado en 2016) */}
      <Escena T={T} a={K.E} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<RocaFosil T={T} x={540} y={910} s={0.8} p={kprog(T, K.E + 2.2, K.E + 2.9, kEase.sale)} />)}
      </Escena>
      {/* 11 · origen: África, hace unos 30 millones de años (estimación ≈ 31 M) */}
      <Escena T={T} a={K.O} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg((() => { const X = (ma) => 980 - (ma / 35) * 860, pt = (d) => kprog(T, K.O + d, K.O + d + 0.4, kEase.rebote); return <>
          <line x1={X(35)} y1={720} x2={X(0) + 20} y2={720} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          <path d={`M ${X(0) + 30} 720 l -30 -20 l 0 40 Z`} fill={KC.ink} />
          {[[0, 'hoy', 0.1, KC.white], [25, '25 M · fósil', 0.6, KC.gold2], [31, '≈ 31 M · cálculo', 1.1, KC.mint]].map(([ma, t, d, c], i) => { const k = pt(d); return k > 0 ? <g key={i}>
            <circle cx={X(ma)} cy={720} r={22 * k} fill={c} stroke={KC.ink} strokeWidth={6} />
            <TxtS x={X(ma)} y={i === 1 ? 800 : 668} t={t} tam={32} o={kclamp(k, 0, 1)} />
          </g> : null; })}
          <g transform="translate(330 860) scale(0.62)"><MapaAfroAsia T={T} at={K.O + 1.6} /></g>
        </>; })())}
      </Escena>
      {/* 12 · con las lluvias, del montículo brota T. titanicus; su pseudorriza baja hasta el panal */}
      <Escena T={T} a={K.Ti} b={K.M} zoom={0.05} origen="40% 50%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {lluvia > 0 && Array.from({ length: 40 }, (_, i) => { const g = krng(i + 300); const x0 = g() * KW, u = ((T * 1.4 + g()) % 1); return <line key={i} x1={x0} y1={u * 1300 - 100} x2={x0 - 12} y2={u * 1300 - 40} stroke="#e8f8ff" strokeWidth={5} strokeLinecap="round" opacity={0.8 * lluvia} />; })}
          <Sabana T={T} />
          <Monticulo T={T} x={MX} y={MY} corte={kprog(T, K.Ti + 2.6, K.Ti + 3.4)} seta={setaTi} setaS={0.75} nod={0.7} />
          {(() => { const k = kprog(T, K.Ti + 3.4, K.Ti + 4.0); const W = 560 * 0.75, x0 = MX + 4 - W / 2, x1 = MX + 4 + W / 2, yy = 340; return k > 0 ? <g opacity={k}>
            <line x1={x0} y1={yy} x2={x1} y2={yy} stroke={KC.ink} strokeWidth={6} /><line x1={x0} y1={yy - 18} x2={x0} y2={yy + 18} stroke={KC.ink} strokeWidth={6} /><line x1={x1} y1={yy - 18} x2={x1} y2={yy + 18} stroke={KC.ink} strokeWidth={6} />
            <TxtS x={MX} y={yy - 76} t="Termitomyces titanicus" tam={32} it /><TxtS x={MX} y={yy - 30} t="sombrero: 40–80 cm · hasta 1 m" tam={30} />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 13 · Zambia: se venden a la orilla de la carretera; una sola alcanza para una familia grande */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1060} width={KW} height={KH} fill="#5f6168" stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={40 + i * 230} y={1150} width={120} height={14} rx={7} fill={KC.yellow} />)}
          <rect x={0} y={1000} width={KW} height={64} fill={TC.sabana} stroke={KC.ink} strokeWidth={7} />
          {[[200, 850, 0.95, KC.coral, 0], [330, 830, 1.05, KC.blue, 1], [770, 880, 1.0, KC.teal, 2], [900, 900, 0.8, KC.violet, 3], [650, 880, 0.7, KC.orange, 4]].map(([px, py, s, c, i]) =>
            <g key={i} opacity={kprog(T, K.M + 1.4 + i * 0.15, K.M + 1.8 + i * 0.15)}><Persona x={px} y={py} s={s} color={c} piel={['#6b3f26', '#8a5a3a', '#5a3420', '#7a4a2e', '#9a6a46'][i]} T={T} fase={i} /></g>)}
          <rect x={120} y={820} width={840} height={36} rx={8} fill="#a0622f" stroke={KC.ink} strokeWidth={7} />
          <rect x={160} y={856} width={30} height={160} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} /><rect x={890} y={856} width={30} height={160} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
          {[[230, 0], [330, 1]].map(([hx, i]) => <g key={i}>{[0, 1, 2].map((k) => <Seta key={k} x={hx - 30 + k * 30} y={822 - (k === 1 ? 14 : 0)} s={0.42} sombrero="#efe7d6" escamas={false} anillo={false} />)}</g>)}
          <g opacity={kprog(T, K.M + 0.3, K.M + 0.8)}><Titanicus x={540} y={822} s={0.55} id="tM" /></g>
        </>)}
      </Escena>
      {/* 14 · cierre: el mismo montículo del inicio, ya con la seta encima y el panal a la vista */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={`translate(${MX - MX * 1.1} ${MY - MY * 1.1}) scale(1.1)`}>
          <Sabana T={T} />
          <Monticulo T={T} x={MX} y={MY} corte={kprog(T, K.C + 0.3, K.C + 1.0)} seta={1} setaS={0.75} nod={0.7} />
          {filaEntrada(K.C)}
        </g>)}
      </Escena>

      {/* textos en pantalla */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.9} until={K.G + 3.6} texto="casa de termitas" x={320} y={440} tam={46} />
      <Chip T={T} at={K.G + 2.2} until={K.N - 0.3} texto="granja de hongos" x={320} y={540} tam={44} borde={KC.gold} />
      <Caja T={T} at={K.N + 0.3} until={K.F - 0.3} x={50} y={400} texto="termitas cultivadoras" tam={32} />
      <Caja T={T} at={K.N + 0.6} until={K.F - 0.3} x={50} y={472} texto="Macrotermitinae" tam={32} />
      <Caja T={T} at={K.N + 2.4} until={K.F - 0.3} x={50} y={544} texto={<span>hongo: <i>Termitomyces</i></span>} tam={32} />
      <Etq T={T} at={K.N + 1.5} until={K.F - 0.3} x={60} y={1140} texto="mapa esquemático" tam={26} color={KC.ink} />
      <Chip T={T} at={K.F + 0.3} until={K.Pa - 0.3} texto="planta muerta" x={540} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 0.2} until={K.H - 0.3} texto="POR DENTRO · esquemático" x={330} y={470} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Pa + 1.2} until={K.H - 0.3} x={250} y={560} texto="bolitas de popó" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Pa + 2.0} until={K.H - 0.3} x={60} y={1135} texto="panal de hongo (fungus comb)" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.H + 0.2} until={K.B - 0.3} texto="AL MICROSCOPIO · esquemático" x={540} y={470} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.H + 0.6} until={K.B - 0.3} x={60} y={575} texto="fibras de planta" tam={30} color="#d9c27a" />
      <Etq T={T} at={K.H + 1.2} until={K.B - 0.3} x={60} y={1135} texto={'hifas del hongo'} tam={30} color={FK.hifa} />
      <Chip T={T} at={K.B + 1.0} until={K.V - 0.3} texto="nódulo · esporas asexuales" x={770} y={330} tam={28} borde={KC.gold2} mono />
      <Etq T={T} at={K.B + 2.4} until={K.V - 0.3} x={60} y={1135} texto="obrera joven: se los come" tam={30} color={KC.texto} />
      <Etq T={T} at={K.B + 3.4} until={K.V - 0.3} x={490} y={600} texto="panal nuevo" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.V + 0.3} until={K.P - 0.3} texto="panal viejo = comida" x={540} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.V + 1.0} until={K.P - 0.3} x={60} y={1135} texto="obreras viejas" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Es + 0.3} until={K.E - 0.3} texto="la mayoría" x={270} y={620} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Es + 2.9} until={K.E - 0.3} texto="unas pocas" x={810} y={620} tam={38} borde={KC.ink} />
      <Caja T={T} at={K.Es + 3.4} until={K.E - 0.3} x={810} y={940} centro texto={<span><i>Macrotermes bellicosus</i>: el rey</span>} tam={22} />
      <Caja T={T} at={K.Es + 3.8} until={K.E - 0.3} x={810} y={1040} centro texto={<span><i>Microtermes</i>: la reina</span>} tam={22} />
      <Etq T={T} at={K.Es + 3.9} until={K.E - 0.3} x={820} y={760} lado="izq" texto="hongo adentro" tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.3} anio="2016" quien="Tanzania · cuenca del Rukwa" revista="Roberts y col. · PLoS ONE" x={540} y={760} />
      <Chip T={T} at={K.E + 2.6} until={K.O - 0.3} texto="≈ 25 millones de años" x={330} y={470} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.E + 3.2} until={K.O - 0.3} x={60} y={590} texto="nido fósil (roca)" tam={30} color={KC.ink} />
      <Caja T={T} at={K.E + 3.8} until={K.O - 0.3} x={80} y={1030} texto="panal petrificado · esquemático" tam={24} />
      <Chip T={T} at={K.O + 0.2} until={K.Ti - 0.3} texto="nació en África" x={540} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.O + 1.4} until={K.Ti - 0.3} x={60} y={560} texto="estimación (no edad exacta)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ti + 0.2} until={K.Ti + 2.5} texto="temporada de lluvias" x={540} y={300} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Ti + 3.6} until={K.M - 0.3} x={MX + 120} y={760} lado="der" texto="pseudorriza al panal" tam={26} color={KC.texto} />
      <Chip T={T} at={K.M + 0.2} until={K.C - 0.3} texto="Zambia · temporada de lluvias" x={370} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.M + 2.4} until={K.C - 0.3} x={60} y={560} texto="1 seta alcanza para una familia" tam={26} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.F} until={K.Ti} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Ti} until={K.M} texto="sombrero 40–80 cm (hasta 1 m)" largo={160} />
      <BarraEscala T={T} at={K.M} until={FIN} texto="esquemático" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubT T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es una casa: *es una granja de hongos.*" />
      <SubT T={T} idx={1} at={K.N + 0.1} until={K.F - 0.1} texto="Termitas de África y Asia cultivan *_Termitomyces._*" />
      <SubT T={T} idx={2} at={K.F + 0.1} until={K.Pa - 0.1} texto="Traen *pasto, hojas y madera.*" />
      <SubT T={T} idx={3} at={K.Pa + 0.1} until={K.H - 0.1} texto="Con su popó *arman un panal.*" />
      <SubT T={T} idx={4} at={K.H + 0.1} until={K.B - 0.1} texto="El hongo *deshace la planta.*" />
      <SubT T={T} idx={5} at={K.B + 0.1} until={K.V - 0.1} texto="Bolitas de esporas: *siembran más panal.*" />
      <SubT T={T} idx={6} at={K.V + 0.1} until={K.P - 0.1} texto="Las viejas *se comen el panal.*" />
      <SubT T={T} idx={7} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Y de dónde saca *su hongo una colonia nueva?*" />
      <SubT T={T} idx={8} at={K.Es + 0.1} until={K.E - 0.1} texto="Esporas del ambiente… *o lo trae el rey o la reina.*" />
      <SubT T={T} idx={9} at={K.E + 0.1} until={K.O - 0.1} texto="Tanzania: *nidos fósiles de 25 millones de años.*" />
      <SubT T={T} idx={10} at={K.O + 0.1} until={K.Ti - 0.1} texto="Nació en África hace *unos 30 millones de años.*" />
      <SubT T={T} idx={11} at={K.Ti + 0.1} until={K.M - 0.1} texto="_Termitomyces_ _titanicus:_ *sombrero de hasta 1 metro.*" />
      <SubT T={T} idx={12} at={K.M + 0.1} until={K.C - 0.1} texto="Zambia: *una alcanza para una familia grande.*" />
      <SubT T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una granja de *millones de años.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.6, K.F - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pa + 0.4, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.B + 0.4, K.V - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.P - 0.1, K.Es + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.6, K.O - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ti + 3.9, K.M + 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.M + 1.1, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="98" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TermitasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TermitasShot /></CompositionStage></div>;
}
window.TermitasApp = TermitasApp;
