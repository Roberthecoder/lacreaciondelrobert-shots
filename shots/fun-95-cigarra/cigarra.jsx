// Shot Fungi Mati #95 · Esa cigarra ya es un hongo: Massospora cicadina — NARRADO.
// Formato N1 "Por dentro" + N5 "El experimento" (playback de cantos, Cooley et al. 2018). Gancho 1 "Esto no es X: es Y".
// Guion y fuentes: guion.md · verificacion.md (APROBADO).
// Morfología: Magicicada negra, ojos rojos, venas de las alas y patas rojo-naranja; tapón de Massospora blanco-crema/amarillento
// en el extremo del abdomen (Boyce et al. 2019, Fig. 1). Conidios ovalados o casi redondos; esporas de reposo redondas, de pared
// gruesa y superficie en red. Todo es esquemático (no se dice ningún tamaño).

const CG = { cuerpo:'#1d1a1f', cuerpo2:'#3a3540', ojo:'#e3262c', naranja:'#e8742a', ala:'rgba(236,246,255,.42)', tapon:'#f2e4b4', tapon2:'#d6bf85',
  tapon3:'#fff7dc', rama:'#7a4a22', rama2:'#5a3416', hoja:'#3fbf4a', hoja2:'#2f9e44', tierra:'#6b4a2b', tierra2:'#4a321c', ninfa:'#c89a5e', ninfa2:'#8a6236',
  reposo:'#9c7440', reposo2:'#4f3418', anual:'#4a3b2c', anual2:'#6e5a44' };

/* ---------- la cigarra (de perfil, mirando a la derecha) ----------
   perdidos 0..4 = anillos del final del abdomen que ya se cayeron (los que faltan dejan ver el tapón).
   vuela 0..1 = alas abiertas aleteando; flick 0..1 = aleteo rápido (la señal de la hembra).
   rayos 0..1 = abdomen transparente (por dentro) y hongo 0..1 = el hongo lo llena; infla 0..1 = el abdomen se hincha. */
const SEG = 8, SEGW = 24;
function segAlto(i, infla) { return (92 - i * 6) * (1 + 0.16 * infla * Math.sin(Math.PI * (i + 1) / (SEG + 1))); }
function Ala({ ang = 0, trasera = false, opac = 1 }) {
  const L = trasera ? 0.78 : 1;
  return <g transform={`rotate(${ang} 62 -38) translate(62 -38) scale(${L}) translate(-62 38)`} opacity={opac}>
    <path d="M 62 -38 Q -40 -100 -250 -52 Q -282 -30 -252 -8 Q -90 -6 62 -20 Z" fill={CG.ala} stroke={CG.naranja} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 62 -36 Q -40 -96 -248 -50" stroke={CG.naranja} strokeWidth={9} fill="none" strokeLinecap="round" />
    {[[-40, -62, -160, -38], [-10, -48, -200, -26], [10, -34, -150, -12], [-120, -54, -230, -30], [-90, -30, -210, -12]].map(([a, b, c, d], i) =>
      <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${(b + d) / 2 - 8} ${c} ${d}`} stroke={CG.naranja} strokeWidth={3.5} fill="none" opacity=".9" />)}
    <path d="M -150 -40 L -165 -16 M -195 -44 L -205 -18" stroke={CG.naranja} strokeWidth={3} opacity=".85" />
  </g>;
}
function Tapon({ x0, x1, h, T = 0, brillo = 0 }) {
  // masa de esporas: bulto con borde abultado entre x1 (punta) y x0 (donde terminan los anillos)
  const cx = (x0 + x1) / 2, rx = Math.abs(x0 - x1) / 2 + 12, ry = h / 2;
  const n = 18, d = Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2; const b = 1 + 0.07 * Math.sin(k * 2.7 + 1) + (Math.cos(a) < 0 ? 0.05 : 0);
    return `${k ? 'L' : 'M'} ${(cx + Math.cos(a) * rx * b).toFixed(1)} ${(4 + Math.sin(a) * ry * b).toFixed(1)}`; }).join(' ') + ' Z';
  return <g style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px #fff2b0)` } : null}>
    <path d={d} fill={CG.tapon} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {[[-0.5, -0.3, 7], [-0.1, 0.35, 8], [0.3, -0.25, 6], [-0.65, 0.2, 5], [0.1, -0.05, 9], [0.45, 0.3, 5], [-0.3, -0.05, 6]].map(([u, v, r], i) =>
      <circle key={i} cx={cx + u * rx} cy={4 + v * ry} r={r} fill={i % 2 ? CG.tapon2 : CG.tapon3} opacity=".95" />)}
  </g>;
}
function Cigarra({ T = 0, x, y, s = 1, rot = 0, espejo = false, vuela = 0, flick = 0, perdidos = 0, tapon = true, rayos = 0, hongo = 0, infla = 0,
  anual = false, id = 'c', brilloTapon = 0, patas = true, alas = 0 }) {
  const dir = espejo ? -1 : 1;
  const negro = anual ? CG.anual : CG.cuerpo, negro2 = anual ? CG.anual2 : CG.cuerpo2;
  const quedan = SEG - Math.floor(perdidos + 1e-6), parcial = perdidos - Math.floor(perdidos + 1e-6);
  const xFin = 10 - SEGW * SEG; // punta del abdomen completo
  const xCorte = 10 - SEGW * quedan; // donde terminan los anillos que quedan
  const aleteo = vuela > 0 ? vuela * (12 + 30 * Math.sin(T * 38)) : 0;
  const angF = aleteo + flick * 46 + alas, angH = (vuela > 0 ? vuela * (8 + 26 * Math.sin(T * 38 + 0.9)) : 0) + flick * 40 + alas * 0.8;
  const absPath = `M 14 ${-segAlto(0, infla) / 2} ` + Array.from({ length: SEG }, (_, i) => `L ${10 - SEGW * (i + 1)} ${-segAlto(i, infla) / 2 + 4}`).join(' ') +
    ` Q ${xFin - 22} 4 ${xFin} ${segAlto(SEG - 1, infla) / 2 + 2} ` + Array.from({ length: SEG }, (_, i) => `L ${10 - SEGW * (SEG - i - 1)} ${segAlto(SEG - i - 1, infla) / 2 + 6}`).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${dir * s} ${s})`}>
    {/* alas traseras (detrás del cuerpo) */}
    <Ala ang={angH - 4} trasera opac={0.9} />
    {vuela > 0.3 && <Ala ang={angH + 22} trasera opac={0.22} />}
    {/* patas rojo-naranja */}
    {patas && [[96, 30, 120, 78, 104, 104], [70, 34, 72, 86, 46, 108], [44, 32, 20, 80, -6, 104]].map(([a, b, c, d, e, f], i) => {
      const sube = vuela * 26; const dd = `M ${a} ${b} L ${c} ${d - sube} L ${e} ${f - sube * 1.6}`;
      return <g key={i}><path d={dd} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={dd} stroke={CG.naranja} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
    {/* abdomen: anillos negros con borde naranja */}
    {rayos < 1 && Array.from({ length: quedan }, (_, i) => {
      const h = segAlto(i, infla), cx = 10 - SEGW * i - SEGW / 2;
      return <g key={i} opacity={1 - rayos}>
        <rect x={cx - SEGW / 2 - 2} y={-h / 2 + 4} width={SEGW + 4} height={h} rx={10} fill={negro} stroke={KC.ink} strokeWidth={4} />
        <rect x={cx - SEGW / 2 + 1} y={h / 2 - 8} width={SEGW - 2} height={10} rx={4} fill={CG.naranja} opacity=".85" />
      </g>; })}
    {rayos > 0 && <g>
      <defs><clipPath id={'abd' + id}><path d={absPath} /></clipPath></defs>
      <path d={absPath} fill="rgba(20,40,70,.55)" stroke={KC.cyan} strokeWidth={5} opacity={rayos} />
      <g clipPath={`url(#abd${id})`} opacity={rayos}>
        <RedHifas T={T} x={8} y={4} g={hongo} seed={95} n={260} escala={0.62} color={CG.tapon3} ancho={4} brillo={0.6} rot={180} circ={false} />
        {hongo > 0 && Array.from({ length: 9 }, (_, k) => { const u = kclamp(hongo * 1.6 - k * 0.1, 0, 1); return u > 0 ?
          <ellipse key={k} cx={-20 - k * 20} cy={4 + Math.sin(k * 2.1) * 14} rx={22 * u} ry={26 * u} fill={CG.tapon} opacity={0.75} /> : null; })}
      </g>
      {Array.from({ length: SEG - 1 }, (_, i) => <line key={i} x1={10 - SEGW * (i + 1)} y1={-segAlto(i, infla) / 2 + 8} x2={10 - SEGW * (i + 1)} y2={segAlto(i, infla) / 2} stroke={KC.cyan} strokeWidth={2} opacity={0.45 * rayos} />)}
    </g>}
    {/* tapón de esporas donde faltan los anillos */}
    {tapon && perdidos > 0.01 && rayos < 1 && <Tapon x0={xCorte + 6} x1={xFin + (1 - Math.min(1, perdidos)) * 0 - 4} h={segAlto(quedan - 1 < 0 ? 0 : quedan - 1, infla) * 0.92} T={T} brillo={brilloTapon} />}
    {/* tórax */}
    <ellipse cx={70} cy={-4} rx={64} ry={52} fill={negro} stroke={KC.ink} strokeWidth={5} />
    <path d="M 30 -40 Q 70 -60 112 -34" stroke={negro2} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 40 -16 Q 66 -8 96 -18" stroke={CG.naranja} strokeWidth={4} fill="none" opacity=".55" />
    {/* cabeza con ojos rojos */}
    <ellipse cx={136} cy={6} rx={30} ry={40} fill={negro} stroke={KC.ink} strokeWidth={5} />
    <circle cx={146} cy={-20} r={18} fill={anual ? '#5b4a36' : CG.ojo} stroke={KC.ink} strokeWidth={4} />
    <circle cx={151} cy={-25} r={5} fill="#fff" opacity=".85" />
    <path d="M 160 4 L 176 -6 M 158 10 L 178 8" stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />
    <path d="M 128 40 Q 118 70 96 82" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* alas delanteras (encima) */}
    {vuela > 0.3 && <Ala ang={angF + 24} opac={0.22} />}
    <Ala ang={angF} />
  </g>;
}
// punto del mundo para un punto local de la cigarra (para que etiquetas y esporas sigan al tapón)
function cPunto(c, lx, ly) { const dir = c.espejo ? -1 : 1, r = (c.rot || 0) * Math.PI / 180, X = dir * c.s * lx, Y = c.s * ly;
  return [c.x + X * Math.cos(r) - Y * Math.sin(r), c.y + X * Math.sin(r) + Y * Math.cos(r)]; }
const COLA = [-196, 8];

// estela de esporas que caen desde donde estaba el tapón: pos(t) = [x, y] del tapón en el tiempo t
function Estela({ T, desde, hasta, pos, cada = 0.05, vida = 1.8, color = CG.tapon3, seed = 3, tam = 1 }) {
  const out = [];
  const t0 = Math.max(desde, T - vida);
  for (let k = Math.ceil(t0 / cada); k * cada <= Math.min(T, hasta); k++) {
    const tk = k * cada, age = T - tk; if (age < 0) continue;
    const g = krng(k * 7 + seed); const [px, py] = pos(tk);
    const xx = px + (g() - 0.5) * 30 + Math.sin(age * 2 + g() * 6) * 14 + (g() - 0.5) * 40 * age, yy = py + 40 * age + 60 * age * age;
    out.push(<circle key={k} cx={xx} cy={yy} r={(3 + g() * 4) * tam} fill={color} stroke="rgba(0,0,0,.35)" strokeWidth={1.5} opacity={1 - age / vida} />);
  }
  return <g>{out}</g>;
}

// rama de árbol con hojas
function Rama({ x0 = -40, y0 = 1060, x1 = 1120, y1 = 980, T = 0 }) {
  return <g>
    <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2} ${(y0 + y1) / 2 + 40} ${x1} ${y1}`} stroke={KC.ink} strokeWidth={50} fill="none" strokeLinecap="round" />
    <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2} ${(y0 + y1) / 2 + 40} ${x1} ${y1}`} stroke={CG.rama} strokeWidth={40} fill="none" strokeLinecap="round" />
    <path d={`M ${x0 + 60} ${y0 - 6} Q ${(x0 + x1) / 2} ${(y0 + y1) / 2 + 30} ${x1 - 40} ${y1 - 8}`} stroke={CG.rama2} strokeWidth={6} fill="none" opacity=".6" />
    {[[0.18, -1], [0.42, 1], [0.7, -1], [0.88, 1]].map(([u, sg], i) => { const bx = klerp(x0, x1, u), by = klerp(y0, y1, u) + 30 * Math.sin(Math.PI * u) ;
      const r = mece(T, i + 2, 0.3) * 4;
      return <g key={i} transform={`rotate(${r} ${bx} ${by})`}>
        <path d={`M ${bx} ${by} q ${sg * 30} ${70} ${sg * 10} ${130}`} stroke={CG.rama2} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d={`M ${bx + sg * 10} ${by + 130} q ${sg * 60} 10 ${sg * 70} 80 q ${-sg * 60} 0 ${-sg * 70} -80 Z`} fill={CG.hoja} stroke={KC.ink} strokeWidth={5} />
        <path d={`M ${bx + sg * 10} ${by + 130} q ${sg * 40} 30 ${sg * 70} 80`} stroke={CG.hoja2} strokeWidth={4} fill="none" />
      </g>; })}
  </g>;
}
// ninfa de cigarra (bajo tierra): cuerpo café claro, patas delanteras gruesas para cavar. (x, y) = centro; mira hacia arriba.
function Ninfa({ T, x, y, s = 1, contagio = 0 }) {
  const pata = Math.sin(T * 7) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((sg) => <g key={sg}>
      <path d={`M ${sg * 26} -40 Q ${sg * 62} ${-70 + pata * sg} ${sg * 46} ${-96 + pata * sg}`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${sg * 26} -40 Q ${sg * 62} ${-70 + pata * sg} ${sg * 46} ${-96 + pata * sg}`} stroke={CG.ninfa2} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M ${sg * 30} 0 L ${sg * 60} 24 M ${sg * 28} 30 L ${sg * 56} 62`} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    </g>)}
    <ellipse cx={0} cy={40} rx={38} ry={66} fill={CG.ninfa} stroke={KC.ink} strokeWidth={5} />
    {[20, 44, 68, 90].map((yy) => <path key={yy} d={`M -32 ${yy} Q 0 ${yy + 10} 32 ${yy}`} stroke={CG.ninfa2} strokeWidth={4} fill="none" />)}
    <ellipse cx={0} cy={-24} rx={34} ry={30} fill={CG.ninfa} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-56} rx={24} ry={18} fill={CG.ninfa2} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-14} cy={-62} r={5} fill={KC.ink} /><circle cx={14} cy={-62} r={5} fill={KC.ink} />
    {contagio > 0 && <circle cx={22} cy={24} r={13} fill={CG.reposo} stroke={CG.reposo2} strokeWidth={5} opacity={contagio} style={{ filter:`drop-shadow(0 0 ${10 * contagio}px ${KC.gold2})` }} />}
  </g>;
}
// espora de reposo: redonda, pared gruesa, superficie en red (esquemática)
function EsporaReposo({ x, y, r = 26, rot = 0 }) {
  const id = 'er' + Math.round(x) + '_' + Math.round(y);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <defs><clipPath id={id}><circle r={r - 5} /></clipPath></defs>
    <circle r={r} fill={CG.reposo} stroke={CG.reposo2} strokeWidth={8} />
    <g clipPath={`url(#${id})`} stroke={CG.reposo2} strokeWidth={2.5} fill="none" opacity=".8">
      {[-0.6, -0.2, 0.2, 0.6].map((u, i) => <path key={'a' + i} d={`M ${-r} ${u * r} Q 0 ${u * r + (i % 2 ? 6 : -6)} ${r} ${u * r}`} />)}
      {[-0.6, -0.2, 0.2, 0.6].map((u, i) => <path key={'b' + i} d={`M ${u * r} ${-r} Q ${u * r + (i % 2 ? -6 : 6)} 0 ${u * r} ${r}`} />)}
    </g>
    <circle cx={-r * 0.35} cy={-r * 0.4} r={r * 0.18} fill="#fff" opacity=".25" />
  </g>;
}
// conidio: ovalado o casi redondo, de superficie verrugosa («verrucose (warty) conidia», Microbiol. Resour. Announc. 2022)
function Conidio({ x, y, r = 22, e = 1.25, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return <circle key={'v' + i} cx={Math.cos(a) * r * 0.97} cy={Math.sin(a) * r / e * 0.97} r={r * 0.13} fill={CG.tapon2} stroke="#8a7440" strokeWidth={2} />; })}
    <ellipse rx={r} ry={r / e} fill={CG.tapon} stroke="#8a7440" strokeWidth={4} />
    {[[-0.35, 0.3], [0.2, 0.4], [0.45, -0.1], [-0.1, -0.05], [0.05, 0.75 - 0.5]].map(([u, v], i) => <circle key={'w' + i} cx={u * r} cy={v * r / e} r={r * 0.09} fill={CG.tapon2} opacity=".9" />)}
    <ellipse cx={-r * 0.3} cy={-r * 0.25 / e} rx={r * 0.3} ry={r * 0.18} fill="#fff" opacity=".5" />
  </g>;
}
// bocina del experimento con ondas de sonido
function Bocina({ T, x, y, s = 1, suena = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-150} width={140} height={300} rx={22} fill="#3a3f4a" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-70} r={40} fill="#222" stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={-70} r={14} fill="#666" />
    <circle cx={0} cy={50} r={62} fill="#222" stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={50} r={22 + suena * 4 * Math.sin(T * 40)} fill="#666" />
    <rect x={-30} y={150} width={60} height={40} fill="#3a3f4a" stroke={KC.ink} strokeWidth={6} />
    {suena > 0 && [0, 1, 2].map((k) => { const u = ((T * 1.4 + k / 3) % 1); return <path key={k} d={`M ${90 + u * 160} ${-90 - u * 50} Q ${130 + u * 200} 0 ${90 + u * 160} ${90 + u * 50}`}
      stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" opacity={suena * (1 - u)} />; })}
  </g>;
}
// salero con alitas (un segundo, la metáfora)
function Salero({ T, x, y, s = 1 }) {
  const al = Math.sin(T * 30) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -40 -40 Q -110 ${-90 + al} -130 ${-30 + al} Q -80 -10 -40 -10 Z`} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 40 -40 Q 110 ${-90 - al} 130 ${-30 - al} Q 80 -10 40 -10 Z`} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -46 -40 L -38 90 Q 0 104 38 90 L 46 -40 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 20 L -36 88 Q 0 100 36 88 L 40 20 Z" fill={CG.tapon} />
    <path d="M -50 -40 Q -50 -88 0 -90 Q 50 -88 50 -40 Z" fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
    {[[-18, -64], [0, -72], [18, -64], [-8, -52], [10, -52]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill={KC.ink} />)}
  </g>;
}
// molécula esquemática: átomos con letra y enlaces (dobles con d: true)
function Mol({ x, y, s = 1, p = 1, enlaces, letras, color = KC.ink, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${12 * brillo}px ${KC.gold2})` } : null}>
    {enlaces.map(([a, b, c, d, dbl], i) => { const u = kclamp(p * enlaces.length - i, 0, 1); if (u <= 0) return null; const ex = klerp(a, c, u), ey = klerp(b, d, u);
      const nx = -(d - b), ny = c - a, L = Math.hypot(nx, ny) || 1, o = 7;
      return <g key={i}><line x1={a} y1={b} x2={ex} y2={ey} stroke={color} strokeWidth={6} strokeLinecap="round" />
        {dbl && <line x1={a + nx / L * o * 1.6 + (c - a) * 0.12} y1={b + ny / L * o * 1.6 + (d - b) * 0.12} x2={klerp(a, c, u * 0.88) + nx / L * o * 1.6} y2={klerp(b, d, u * 0.88) + ny / L * o * 1.6} stroke={color} strokeWidth={5} strokeLinecap="round" />}</g>; })}
    {p > 0.95 && letras.map(([lx, ly, t], i) => <g key={'l' + i}>
      <rect x={lx - t.length * 11 - 6} y={ly - 22} width={t.length * 22 + 12} height={42} rx={10} fill={KC.paper} />
      <text x={lx} y={ly + 12} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={color}>{t}</text></g>)}
  </g>;
}
// catinona: fenilo–C(=O)–CH(NH2)–CH3
const H6 = [[43, 25], [0, 50], [-43, 25], [-43, -25], [0, -50], [43, -25]];
const anillo = (dbl) => H6.map((v, i) => { const w = H6[(i + 1) % 6]; return [v[0], v[1], w[0], w[1], dbl.includes(i)]; });
const CATINONA = { enlaces: [...anillo([0, 2, 4]), [43, -25, 90, 0], [90, 0, 90, 54, true], [90, 0, 137, -25], [137, -25, 137, -78], [137, -25, 184, 0]],
  letras: [[90, 74, 'O'], [137, -96, 'NH₂'], [196, 12, 'CH₃']] };
// psilocibina: indol con fosfato en C4 y dimetilaminoetilo en C3
const PSILO = { enlaces: [...anillo([0, 2, 4]), [43, -25, 90, -40], [90, -40, 119, 0, true], [119, 0, 90, 40], [90, 40, 43, 25],
  [0, -50, 0, -92], [90, -40, 110, -88], [110, -88, 160, -100], [160, -100, 180, -146]],
  letras: [[0, -110, 'OPO₃H₂'], [92, 58, 'NH'], [200, -160, 'N(CH₃)₂']] };

// letrero pegado a un punto (sigue a lo que se mueve): línea del punto al texto
function Senal({ T, at, until, px, py, tx, ty, texto, it = false, tam = 32, ancla = 'izq', fondo = 'rgba(244,239,228,.95)', color = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), v = (q) => (typeof q === 'function' ? q(T) : q);
  const PX = v(px), PY = v(py), TX = v(tx), TY = v(ty), w = kprog(T, at, at + 0.4, kEase.sale);
  return <>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:41, opacity:e.o, pointerEvents:'none' }}>
      <line x1={PX} y1={PY} x2={klerp(PX, TX, w)} y2={klerp(PY, TY, w)} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <line x1={PX} y1={PY} x2={klerp(PX, TX, w)} y2={klerp(PY, TY, w)} stroke="#fff" strokeWidth={4} strokeLinecap="round" />
      <circle cx={PX} cy={PY} r={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    </svg>
    <div style={{ position:'absolute', left:TX, top:TY, zIndex:42, opacity:e.o, transform:`translate(${ancla === 'izq' ? '0' : ancla === 'centro' ? '-50%' : '-100%'}, -50%)`,
      background:fondo, border:`4px solid ${KC.ink}`, borderRadius:14, padding:'4px 16px', font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color, whiteSpace:'nowrap', boxShadow:`5px 5px 0 ${KC.ink}` }}>{texto}</div>
  </>;
}
// cajita de texto (nombre científico, etc.)
function Caja({ T, at, until, x, y, children, tam = 36, ancla = 'izq' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translate(${ancla === 'centro' ? '-50%' : '0'}, ${e.y * 0.4}px)`, background:'rgba(244,239,228,.95)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px ${KF.mono}`, color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{children}</div>;
}
// sello rectangular "HIPÓTESIS"
function SelloTexto({ T, at, until, x, y, texto, color = KC.red, tam = 110, rot = -8 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, k)})`, opacity:kprog(T, at, at + 0.15) * (until != null ? 1 - kprog(T, until, until + 0.4) : 1),
    border:`12px solid ${color}`, borderRadius:24, padding:'6px 34px', font:`400 ${tam}px/1 ${KF.titulo}`, color, background:'rgba(255,255,255,.75)', letterSpacing:'.04em', whiteSpace:'nowrap' }}>{texto}</div>;
}
// marcador del experimento: n cuadritos, los primeros `si` se pintan
function Marcador({ T, at, x, y, n, si, cols, lado = 46, color = KC.gold2, cada = 0.07 }) {
  if (T < at) return null;
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const on = i < si && T > at + i * cada; const u = kprog(T, at + i * cada, at + i * cada + 0.2, kEase.rebote);
      return <g key={i} transform={`translate(${c * (lado + 10) + lado / 2} ${r * (lado + 10) + lado / 2}) scale(${i < si ? (on ? klerp(0.4, 1, u) : 0.4) : 1})`}>
        <rect x={-lado / 2} y={-lado / 2} width={lado} height={lado} rx={9} fill={i < si ? (on ? color : 'rgba(255,255,255,.4)') : 'rgba(255,255,255,.55)'} stroke={KC.ink} strokeWidth={4} />
        {i >= si && T > at + si * cada && <path d={`M ${-lado * 0.25} ${-lado * 0.25} L ${lado * 0.25} ${lado * 0.25} M ${lado * 0.25} ${-lado * 0.25} L ${-lado * 0.25} ${lado * 0.25}`} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />}
      </g>; })}
  </g>;
}
// hoja de khat (Catha edulis), esquemática
function HojaKhat({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 Q 50 -40 110 0 Q 50 40 0 0 Z" fill="#5aa84a" stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 0 L 104 0" stroke="#2f7a30" strokeWidth={4} />
    {[20, 40, 60, 80].map((xx) => <path key={xx} d={`M ${xx} 0 l 12 -12 M ${xx} 0 l 12 12`} stroke="#2f7a30" strokeWidth={3} />)}
    <path d="M 0 0 L -40 10" stroke={CG.rama} strokeWidth={8} strokeLinecap="round" />
  </g>;
}

function CigarraShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, S: CUES.Suelo, A: CUES.Adentro, Ta: CUES.Tapon, Sa: CUES.Salero, P: CUES.Pregunta, E: CUES.Estudio,
    Al: CUES.Aleteo, M: CUES.Machos, Ca: CUES.Catinona, Ps: CUES.Psilocibina, H: CUES.Hipotesis, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // 0–1 · la cigarra despega de la rama (cuadro 0) y vuela; la parte de atrás es un tapón de esporas
  const despega = kprog(T, K.G + 0.05, K.G + 1.0, kEase.sale);
  const gC = (t) => ({ x: klerp(470, 520, kprog(t, K.G, K.G + 1.0, kEase.sale)) + Math.sin(t * 1.3) * 28, y: klerp(1005, 880, kprog(t, K.G + 0.05, K.G + 1.0, kEase.sale)) + Math.sin(t * 2.1) * 18,
    s: 1.45, rot: -4 + Math.sin(t * 1.7) * 3, espejo: false });
  const gc = gC(T);
  // 4 · el tapón: se caen los anillos uno por uno
  const caen = [0, 1, 2, 3].map((k) => K.Ta + 0.4 + k * 0.55);
  const perdidosTa = caen.reduce((a, t0) => a + (T >= t0 ? 1 : 0), 0);
  const tc = { x: 620, y: 930, s: 2.15, rot: -3, espejo: false };
  // 5 · salero: vuela cruzando la pantalla
  const sC = (t) => ({ x: klerp(250, 760, kprog(t, K.Sa - 0.3, K.P + 0.3)), y: 880 + Math.sin(t * 2.4) * 30, s: 1.25, rot: -6 + Math.sin(t * 2) * 4, espejo: false });
  // 7–9 · el experimento: macho con tapón en la rama (mira a la bocina)
  const ex = { x: 445, y: 1060, s: 1.1, rot: 2, espejo: true };
  const flickT = [K.Al + 0.5, K.Al + 1.1, K.Al + 2.2, K.Al + 2.8, K.Al + 3.9, K.Al + 4.5];
  const flick = 0.85 * flickT.reduce((a, t0) => Math.max(a, kprog(T, t0, t0 + 0.1) * (1 - kprog(T, t0 + 0.1, t0 + 0.3))), 0);
  const llega = kprog(T, K.M + 0.2, K.M + 1.8, kEase.sale);
  const sano = { x: klerp(1300, 840, llega), y: klerp(780, 1050, llega), s: 0.95, rot: klerp(-14, -2, llega), espejo: false };
  // 13 · cierre: la misma cigarra y la misma rama del inicio
  const cC = (t) => ({ x: klerp(470, 520, kprog(t, K.C, K.C + 1.0, kEase.sale)) + Math.sin(t * 1.3) * 28, y: klerp(1005, 880, kprog(t, K.C + 0.05, K.C + 1.0, kEase.sale)) + Math.sin(t * 2.1) * 18,
    s: 1.45, rot: -4 + Math.sin(t * 1.7) * 3, espejo: false });
  const cc = cC(T);
  const colaG = (t) => cPunto(gC(t), COLA[0], COLA[1]);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho y nombre */}
      <Escena T={T} a={K.G} b={K.S} zoom={0.06} origen="45% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rama T={T} />
          <Estela T={T} desde={K.G + 0.5} hasta={K.S} pos={colaG} tam={1.5} />
          <Cigarra T={T} {...gc} vuela={despega} perdidos={4} id="g" />
          {kprog(T, K.N + 0.8, K.N + 1.2) > 0 && [['13', 170], ['17', 360]].map(([n, xx], i) => { const u = kprog(T, K.N + 0.8 + i * 0.35, K.N + 1.2 + i * 0.35, kEase.rebote); return u > 0 ?
            <g key={n} transform={`translate(${xx} 620) scale(${0.8 * u})`}>
              <rect x={-95} y={-80} width={190} height={170} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              <rect x={-95} y={-80} width={190} height={44} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
              <text x={0} y={42} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>{n}</text>
              <text x={0} y={80} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>años</text></g> : null; })}
        </>)}
      </Escena>
      {/* 2 · bajo tierra: esporas de reposo y ninfas que salen */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={560} width={KW} height={KH} fill={CG.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={530} width={KW} height={40} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
          {[[260, 1300], [640, 1240]].map(([tx, ty], i) => <path key={'t' + i} d={`M ${tx} ${ty} Q ${tx + (i ? -30 : 40)} ${(ty + 560) / 2} ${tx + (i ? 10 : -10)} 560`} stroke={CG.tierra2} strokeWidth={120} fill="none" strokeLinecap="round" />)}
          {[[130, 760, 0], [430, 690, 30], [520, 960, 60], [400, 1090, 10], [860, 1060, 80], [110, 1120, 40], [800, 700, 20], [940, 880, 50]].map(([x, y, r], i) =>
            <EsporaReposo key={i} x={x} y={y + Math.sin(T * 1.2 + i) * 3} r={30} rot={r} />)}
          <Ninfa T={T} x={klerp(262, 270, 0)} y={klerp(1060, 800, kprog(T, K.S + 0.2, K.A + 0.3))} s={1.35} contagio={kprog(T, K.S + 2.1, K.S + 2.5)} />
          <Ninfa T={T + 0.4} x={636} y={klerp(1090, 860, kprog(T, K.S + 0.5, K.A + 0.3))} s={1.2} contagio={kprog(T, K.S + 2.8, K.S + 3.2)} />
        </>)}
      </Escena>
      {/* 3 · por dentro: el hongo llena el abdomen y lo infla */}
      <Escena T={T} a={K.A} b={K.Ta} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<Cigarra T={T} x={620} y={930} s={2.15} rot={-3} rayos={1} hongo={kprog(T, K.A + 0.1, K.Ta)} infla={kprog(T, K.A + 1.0, K.Ta + 0.2, kEase.suave)} perdidos={0} id="a" alas={34} />)}
      </Escena>
      {/* 4 · se caen los últimos anillos: queda el tapón de esporas */}
      <Escena T={T} a={K.Ta} b={K.Sa} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Cigarra T={T} {...tc} perdidos={perdidosTa} infla={1} id="t" alas={34} brilloTapon={kprog(T, caen[3], caen[3] + 0.6) * 0.6} />
          {caen.map((t0, k) => { const u = kprog(T, t0, t0 + 1.4); if (u <= 0 || u >= 1) return null; const i = SEG - 1 - k; const h = segAlto(i, 1); const [px, py] = cPunto(tc, 10 - SEGW * i - SEGW / 2, 4);
            return <g key={k} transform={`translate(${px - 40 * u - k * 6} ${py + 520 * u * u + 30 * u}) rotate(${-140 * u - k * 20}) scale(${tc.s})`} opacity={1 - u * 0.4}>
              <rect x={-SEGW / 2 - 2} y={-h / 2} width={SEGW + 4} height={h} rx={10} fill={CG.cuerpo} stroke={KC.ink} strokeWidth={4} />
              <rect x={-SEGW / 2 + 1} y={h / 2 - 12} width={SEGW - 2} height={10} rx={4} fill={CG.naranja} opacity=".85" /></g>; })}
        </>)}
      </Escena>
      {/* 5 · aun así sigue volando: un salero con alas */}
      <Escena T={T} a={K.Sa} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Rama T={T} x0={-40} y0={1180} x1={1120} y1={1120} />
          <Estela T={T} desde={K.Sa - 0.4} hasta={K.P + 0.4} pos={(t) => cPunto(sC(t), COLA[0], COLA[1])} cada={0.035} seed={5} tam={1.5} />
          <Cigarra T={T} {...sC(T)} vuela={1} perdidos={4} id="s" />
          {kprog(T, K.Sa + 1.6, K.Sa + 2.0) > 0 && <g opacity={1 - kprog(T, K.P - 0.4, K.P)} transform={`translate(${sC(T).x - 260} ${700}) scale(${kprog(T, K.Sa + 1.6, K.Sa + 2.0, kEase.rebote)})`}>
            <Salero T={T} x={0} y={0} s={0.9} /></g>}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿cómo contagia a más cigarras? (coro de cigarras) */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Rama T={T} x0={-40} y0={1080} x1={700} y1={1010} />
          <Cigarra T={T} x={200} y={985} s={0.75} rot={-3} perdidos={0} id="p1" />
          <Cigarra T={T} x={430} y={960} s={0.75} rot={-5} perdidos={0} espejo id="p2" />
          <Cigarra T={T} x={300} y={760} s={0.75} rot={-8} vuela={1} perdidos={4} id="p3" />
          <Interrogacion T={T} x={250} y={700} tam={360} />
        </>)}
      </Escena>
      {/* 7–9 · el experimento: cantos de macho por una bocina; el macho con tapón responde con el aleteo de las hembras */}
      <Escena T={T} a={K.E} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Rama T={T} x0={240} y0={1180} x1={1140} y1={1140} />
          <g opacity={kprog(T, K.E + 1.6, K.E + 2.1)}><Bocina T={T} x={140} y={990} s={0.85} suena={kprog(T, K.E + 2.0, K.E + 2.3) * (1 - kprog(T, K.M + 0.2, K.M + 0.6))} /></g>
          <Cigarra T={T} {...ex} flick={flick} perdidos={4} id="e" />
          {/* el chasquido del aleteo */}
          {flick > 0.2 && [0, 1, 2, 3, 4].map((k) => { const a = -1.9 + k * 0.35; const [px, py] = cPunto(ex, -60, -90); return <line key={k} x1={px + Math.cos(a) * 60} y1={py + Math.sin(a) * 60} x2={px + Math.cos(a) * (80 + 50 * flick)} y2={py + Math.sin(a) * (80 + 50 * flick)} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}
          {T > K.M && <Cigarra T={T} {...sano} vuela={1 - llega} perdidos={0} id="m" />}
          {T > K.M + 1.6 && <Estela T={T} desde={K.M + 1.6} hasta={K.Ca} pos={(t) => { const [ax, ay] = cPunto(ex, COLA[0], COLA[1]); return [ax + 30 * Math.sin(t * 5), ay - 10]; }} cada={0.12} vida={1.2} seed={9} tam={1.3} />}
          {T > K.Al + 1.2 && T < K.M + 0.2 && <g opacity={1 - kprog(T, K.M - 0.2, K.M + 0.2)}><Marcador T={T} at={K.Al + 1.2} x={70} y={400} n={25} si={23} cols={5} lado={44} cada={0.06} /></g>}
                  </>)}
      </Escena>
      {/* 10 · 2019: catinona en los tapones */}
      <Escena T={T} a={K.Ca} b={K.Ps} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Cigarra T={T} x={600} y={1040} s={1.4} rot={-3} perdidos={4} infla={1} id="k" brilloTapon={0.6} alas={10} />
          {(() => { const p = kprog(T, K.Ca + 2.3, K.Ca + 3.4); const [px, py] = cPunto({ x: 600, y: 1040, s: 1.4, rot: -3 }, COLA[0], COLA[1]);
            return p > 0 ? <g>
              {Array.from({ length: 6 }, (_, k) => { const u = kprog(T, K.Ca + 2.1 + k * 0.08, K.Ca + 2.9 + k * 0.08); return u > 0 && u < 1 ? <circle key={k} cx={klerp(px, 470, u) + Math.sin(k) * 20} cy={klerp(py, 760, u)} r={8} fill={KC.gold2} opacity={1 - u} /> : null; })}
              <Mol x={300} y={760} s={1.25} p={p} {...CATINONA} brillo={0.6 * p} />
            </g> : null; })()}
          {kprog(T, K.Ca + 3.6, K.Ca + 4.0) > 0 && <g opacity={kprog(T, K.Ca + 3.6, K.Ca + 4.0)}><HojaKhat x={760} y={660} s={1.1} rot={-20} /><HojaKhat x={770} y={700} s={0.9} rot={20} /></g>}
        </>)}
      </Escena>
      {/* 11 · psilocibina en otras Massospora (cigarras anuales) */}
      <Escena T={T} a={K.Ps} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cigarra T={T} x={720} y={1060} s={1.2} rot={-3} perdidos={3} anual id="ps" brilloTapon={0.5} alas={10} />
          <Mol x={220} y={830} s={1.2} p={kprog(T, K.Ps + 0.6, K.Ps + 1.8)} {...PSILO} brillo={0.6} />
        </>)}
      </Escena>
      {/* 12 · hipótesis: ¿la droga cambia la conducta? */}
      <Escena T={T} a={K.H} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Mol x={170} y={880} s={0.85} p={1} {...CATINONA} />
          {(() => { const u = kprog(T, K.H + 0.3, K.H + 1.0, kEase.sale); return <g>
            <line x1={430} y1={880} x2={klerp(430, 560, u)} y2={880} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
            {u > 0.95 && <path d="M 540 852 L 580 880 L 540 908" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>; })()}
          <Cigarra T={T} x={870} y={900} s={0.95} rot={-3} perdidos={4} flick={Math.max(0, Math.sin(T * 9)) * kprog(T, K.H + 0.8, K.H + 1.0)} id="h" />
          <text x={870} y={1060} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>conducta</text>
          <text x={330} y={1060} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>catinona</text>
        </>)}
      </Escena>
      {/* 13 · cierre: la misma cigarra en la misma rama, ahora se ve el hongo que lleva */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="45% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rama T={T} />
          <Estela T={T} desde={K.C + 0.5} hasta={FIN} pos={(t) => cPunto(cC(t), COLA[0], COLA[1])} cada={0.035} seed={13} tam={1.5} />
          <Cigarra T={T} {...cc} vuela={kprog(T, K.C + 0.05, K.C + 1.0, kEase.sale)} perdidos={4} id="c" brilloTapon={0.5 + 0.4 * Math.sin(T * 4)} />
        </>)}
      </Escena>

      {/* textos en pantalla */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.9} until={K.G + 3.3} texto="cigarra entera" x={330} y={430} tam={50} />
      <Senal T={T} at={K.G + 2.4} until={K.N + 0.5} px={() => cPunto(gc, COLA[0] - 10, COLA[1])[0]} py={() => cPunto(gc, COLA[0] - 10, COLA[1])[1]} tx={60} ty={680} texto="hongo: tapón de esporas" tam={30} />
      <Senal T={T} at={K.G + 2.9} until={K.N - 0.2} px={() => cPunto(gc, 70, 20)[0]} py={() => cPunto(gc, 70, 20)[1]} tx={480} ty={1140} texto="cigarra viva" tam={30} ancla="centro" />
      <Caja T={T} at={K.N + 0.2} until={K.S - 0.3} x={60} y={430}><i>Massospora cicadina</i></Caja>
      <Caja T={T} at={K.N + 0.6} until={K.S - 0.3} x={60} y={1110} tam={30}>cigarra periódica · <i>Magicicada</i></Caja>
      <Chip T={T} at={K.S + 0.2} until={K.A - 0.3} texto="BAJO TIERRA · esquemático" x={400} y={440} tam={32} borde={KC.gold} mono />
      <Senal T={T} at={K.S + 0.8} until={K.A - 0.3} px={430} py={690} tx={380} ty={590} texto="esporas de reposo" tam={30} ancla="der" />
      <Senal T={T} at={K.S + 1.4} until={K.A - 0.3} px={() => 690} py={() => klerp(1090, 860, kprog(T, K.S + 0.5, K.A + 0.3)) + 40} tx={1030} ty={1150} texto="ninfa de cigarra" tam={30} ancla="der" />
      <Etq T={T} at={K.S + 2.3} until={K.A - 0.3} x={330} y={880} texto="se contagia al salir" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.A + 0.2} until={K.Ta - 0.3} texto="POR DENTRO · esquemático" x={400} y={440} tam={32} borde={KC.cyan} mono />
      <Senal T={T} at={K.A + 0.9} until={K.Ta - 0.3} px={cPunto({ x: 620, y: 930, s: 2.15, rot: -3 }, -90, 0)[0]} py={cPunto({ x: 620, y: 930, s: 2.15, rot: -3 }, -90, 0)[1]} tx={120} ty={640} texto="hongo dentro del abdomen" tam={30} />
      <Etq T={T} at={K.A + 1.6} until={K.Ta - 0.3} x={200} y={1150} texto="se infla" tam={34} color={KC.gold2} />
      <Senal T={T} at={K.Ta + 0.5} until={K.Sa - 0.3} px={cPunto(tc, -150, 60)[0]} py={cPunto(tc, -150, 60)[1]} tx={80} ty={1160} texto="anillos que se caen" tam={30} />
      <Senal T={T} at={K.Ta + 2.6} until={K.Sa - 0.3} px={cPunto(tc, -170, -20)[0]} py={cPunto(tc, -170, -20)[1]} tx={60} ty={560} texto="tapón de esporas" tam={32} />
      <Lupa T={T} at={K.Ta + 3.0} until={K.Sa - 0.35} x={810} y={640} r={170} fx={() => cPunto(tc, -175, 8)[0]} fy={() => cPunto(tc, -175, 8)[1]} tinte={KC.gold}
        etiqueta="conidios (esporas)" interior={(Tl, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1a1406" />
          {[[0.3, 0.35, 0], [0.55, 0.3, 30], [0.75, 0.45, 70], [0.38, 0.6, 110], [0.62, 0.62, 10], [0.25, 0.8, 60], [0.5, 0.85, 140], [0.8, 0.75, 20], [0.45, 0.15, 90], [0.15, 0.55, 45], [0.85, 0.2, 120]].map(([u, v, ro], i) =>
            <Conidio key={i} x={u * r * 2 + Math.sin(Tl * 1.3 + i) * 3} y={v * r * 2 + Math.cos(Tl + i) * 3} r={30} e={i % 3 ? 1.3 : 1.08} rot={ro} />)}
        </svg>} />
      <Chip T={T} at={K.Sa + 0.2} until={K.P - 0.3} texto="sigue viva y volando" x={400} y={440} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Sa + 2.1} until={K.P - 0.3} x={180} y={560} texto="«salero con alas»" tam={32} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 1.9} anio="2002" quien="cantos en EE. UU." revista="Cooley, Marshall y Hill · Scientific Reports 2018" x={540} y={600} />
      <Etq T={T} at={K.E + 2.2} until={K.Al - 0.2} x={60} y={820} texto="canto de macho" tam={30} color={KC.ink} />
      <Senal T={T} at={K.E + 2.5} until={K.Al + 1.0} px={cPunto(ex, -185, -10)[0]} py={cPunto(ex, -185, -10)[1]}  tx={1030} ty={820} texto="macho con tapón" tam={30} ancla="der" />
      {T > K.Al + 1.2 && T < K.M && <div style={{ position:'absolute', left:70, top:672, zIndex:42, font:`900 40px ${KF.texto}`, color:KC.ink, opacity:kprog(T, K.Al + 2.6, K.Al + 2.9) * (1 - kprog(T, K.M - 0.3, K.M)) }}>23 de 25 machos con tapón de conidios</div>}
      {T > K.Al + 2.7 && T < K.M && <div style={{ position:'absolute', left:70, top:722, zIndex:42, font:`700 28px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.Al + 2.8, K.Al + 3.1) * (1 - kprog(T, K.M - 0.3, K.M)) }}>…respondieron con el aleteo de hembra</div>}
      {T > K.Al + 3.3 && T < K.M && <div style={{ position:'absolute', left:70, top:768, zIndex:42, font:`700 28px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.Al + 3.3, K.Al + 3.6) * (1 - kprog(T, K.M - 0.3, K.M)) }}>con tapón de esporas de reposo: 0 de 17</div>}
      <Senal T={T} at={K.M + 1.8} until={K.Ca - 0.3} px={() => cPunto(sano, 70, -30)[0]} py={() => cPunto(sano, 70, -30)[1]} tx={1030} ty={820} texto="macho sano" tam={30} ancla="der" />
      <Chip T={T} at={K.M + 2.4} until={K.Ca - 0.3} texto="al parecer, por contacto" x={360} y={470} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ca + 0.2} until={K.Ca + 2.1} anio="2019" quien="West Virginia University" revista="Boyce, Kasson y col. · Fungal Ecology" x={540} y={650} />
      <Caja T={T} at={K.Ca + 2.6} until={K.Ps - 0.3} x={60} y={430}>catinona</Caja>
      <Etq T={T} at={K.Ca + 3.0} until={K.Ps - 0.3} x={60} y={560} texto="una anfetamina de planta" tam={30} color={KC.ink} />
      <Caja T={T} at={K.Ca + 3.8} until={K.Ps - 0.3} x={640} y={800} tam={28}>khat · <i>Catha edulis</i></Caja>
      <Senal T={T} at={K.Ca + 1.0} until={K.Ps - 0.3} px={cPunto({ x: 600, y: 1040, s: 1.4, rot: -3 }, -200, 30)[0]} py={cPunto({ x: 600, y: 1040, s: 1.4, rot: -3 }, -200, 30)[1]} tx={60} ty={1112} texto={<>tapón de <i>M. cicadina</i></>} tam={28} />
      <Caja T={T} at={K.Ps + 0.2} until={K.H - 0.3} x={60} y={430}>psilocibina</Caja>
      <Etq T={T} at={K.Ps + 0.9} until={K.H - 0.3} x={60} y={545} texto="la de los hongos mágicos" tam={30} color={KC.ink} />
      <Senal T={T} at={K.Ps + 1.0} until={K.H - 0.3} px={cPunto({ x: 720, y: 1060, s: 1.2, rot: -3 }, -175, 20)[0]} py={cPunto({ x: 720, y: 1060, s: 1.2, rot: -3 }, -175, 20)[1]} tx={60} ty={1112} texto={<><i>M. platypediae</i> / <i>M. levispora</i></>} tam={26} />
      <Etq T={T} at={K.Ps + 1.4} until={K.H - 0.3} x={1020} y={880} lado="izq" texto="cigarra anual" tam={30} color={KC.ink} />
      <SelloTexto T={T} at={K.H + 1.2} until={K.C - 0.5} x={400} y={640} texto="HIPÓTESIS" />
      <Senal T={T} at={K.C + 1.0} until={K.Ou - 0.1} px={() => cPunto(cc, COLA[0] - 10, COLA[1])[0]} py={() => cPunto(cc, COLA[0] - 10, COLA[1])[1]} tx={60} ty={680} texto="vuela con un hongo" tam={32} />
      <Caja T={T} at={K.C + 0.3} until={K.Ou} x={60} y={420}>cigarra + <i>Massospora</i></Caja>

      {/* barras de escala / esquemático */}
      <BarraEscala T={T} at={K.G} until={K.Ou} texto="esquemático" largo={160} color={KC.texto} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Lo de atrás ya es *un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.S - 0.1} texto="_Massospora cicadina:_ *13 o 17 años.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.A - 0.1} texto="Esporas que *esperan en la tierra.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Ta - 0.1} texto="El hongo *infla el abdomen.*" />
      <Subtitulo T={T} idx={4} at={K.Ta + 0.1} until={K.Sa - 0.1} texto="Queda un *tapón de esporas.*" />
      <Subtitulo T={T} idx={5} at={K.Sa + 0.1} until={K.P - 0.1} texto="Sigue volando: *un salero con alas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo *contagia a más?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Al - 0.1} texto="2002: *cantos de macho.*" />
      <Subtitulo T={T} idx={8} at={K.Al + 0.1} until={K.M - 0.1} texto="23 de 25: *aleteo de hembra.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.Ca - 0.1} texto="Otros machos *se contagiaban.*" />
      <Subtitulo T={T} idx={10} at={K.Ca + 0.1} until={K.Ps - 0.1} texto="2019: *catinona* en los tapones." />
      <Subtitulo T={T} idx={11} at={K.Ps + 0.1} until={K.H - 0.1} texto="En otras _Massospora:_ *psilocibina.*" />
      <Subtitulo T={T} idx={12} at={K.H + 0.1} until={K.C - 0.1} texto="Aún es *hipótesis.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Vuela *con un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.6, K.S - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.S + 0.6, K.A - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Sa + 0.3, K.P - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P - 0.1, K.E - 0.25, 'avatar_07_pensativo_puno', 'grande'],
        [K.Al + 3.0, K.M - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.M + 0.5, K.Ca - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ca + 2.4, K.Ps - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ps + 0.4, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.2, K.C - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="95" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CigarraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CigarraShot /></CompositionStage></div>;
}
window.CigarraApp = CigarraApp;
