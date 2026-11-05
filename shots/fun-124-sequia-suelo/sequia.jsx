// Shot Fungi Mati #124 · Esta tierra seca no está muerta: está aguantando la respiración — NARRADO
// (gancho 1 «Esto no es X: es Y»; formato N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const SQ = { seco:'#d9a866', seco2:'#c08a52', mojado:'#4a2f1c', mojado2:'#3a2416', grieta:'#7a5232', cana:'#c9a25a', canaV:'#3fbf4a',
  grano:'#8a6a4a', grano2:'#a7835c', agua:'#4fd2ff', aire:'#c9d3dc', hifa:'#fff1cf', hifaB:'#e8c98f', co2:'#e9eef5' };

// ---------- utilidades ----------
const sqBlob = (cx, cy, r, seed, n = 11, irr = 0.18) => { const g = krng(seed); const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (1 - irr / 2 + g() * irr); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.86]; });
  let d = ''; for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; d += (i ? ' Q ' : `M ${((pts[n - 1][0] + p[0]) / 2).toFixed(1)} ${((pts[n - 1][1] + p[1]) / 2).toFixed(1)} Q `) + `${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + ' Z'; };
// polilínea parcial (p 0..1) → { d, punta, ang }
const sqTramo = (pts, p) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let rest = tot * kclamp(p, 0, 1); const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { if (rest >= L[i - 1]) { out.push(pts[i]); rest -= L[i - 1]; } else { const u = rest / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } }
  const a = out[out.length - 1], b = out[Math.max(0, out.length - 2)];
  return { d: 'M ' + out.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L '), punta: a, ang: Math.atan2(a[1] - b[1], a[0] - b[0]), largo: tot * kclamp(p, 0, 1), out }; };
// punto a una distancia s (px) sobre una polilínea
const sqEn = (pts, s) => { for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (s <= d) { const u = s / d; return [klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]; } s -= d; } return pts[pts.length - 1]; };

// Hifa: tubo con pared (contorno ink), septos y punta redondeada que crece. pts en pantalla.
function Hifa({ pts, p = 1, ancho = 64, color = SQ.hifa, pared = SQ.hifaB, septo = 150, gotas = 0, T = 0 }) {
  if (p <= 0.005) return null;
  const tr = sqTramo(pts, p), sep = [];
  for (let s = septo; s < tr.largo - 40; s += septo) { const a = sqEn(pts, s), b = sqEn(pts, s + 2), ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2;
    sep.push(<line key={s} x1={a[0] + Math.cos(ang) * ancho * 0.42} y1={a[1] + Math.sin(ang) * ancho * 0.42} x2={a[0] - Math.cos(ang) * ancho * 0.42} y2={a[1] - Math.sin(ang) * ancho * 0.42} stroke={pared} strokeWidth={5} />); }
  const gs = []; if (gotas > 0) for (let k = 0; k < 6; k++) { const s = ((T * 140 + k * (tr.largo / 6)) % Math.max(tr.largo, 1)); const q = sqEn(pts, s); gs.push(<circle key={k} cx={q[0]} cy={q[1]} r={ancho * 0.2} fill={SQ.agua} stroke={KC.ink} strokeWidth={3} opacity={gotas} />); }
  return <g>
    <path d={tr.d} stroke={KC.ink} strokeWidth={ancho + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={tr.d} stroke={pared} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={tr.d} stroke={color} strokeWidth={ancho * 0.66} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {sep}{gs}
  </g>;
}

// ---------- mundo macro: la milpa y el terrón ----------
// seco 1 → 0 (tierra mojada), verde 0..1 (milpa reverdece), grieta 0..1 (la grieta del gancho), pecho 0..1 (aire "aguantado"),
// exhala 0..1 (el pulso sale), lluvia 0..1.
function Milpa({ T, seco = 1, verde = 0, grieta = 1, pecho = 1, exhala = 0, desinfla = 0, lluvia = 0, cielo = KC.yellow }) {
  const DY = -140;
  const suelo = mixHex(SQ.seco, SQ.mojado, 1 - seco), terron = mixHex(SQ.seco2, SQ.mojado2, 1 - seco);
  const cana = mixHex(SQ.cana, SQ.canaV, verde);
  const canas = [[110, 640, -2], [270, 700, 3], [860, 660, -3], [1010, 620, 2]];
  const grietasSuelo = [[[40, 1110], [160, 1150], [210, 1230], [330, 1260]], [[700, 1120], [780, 1180], [760, 1260], [880, 1300]], [[880, 1060], [990, 1120], [1080, 1110]], [[60, 1450], [220, 1420], [300, 1500]], [[760, 1480], [900, 1450], [1040, 1530]]];
  const TERRON = 'M 270 1100 Q 250 1010 330 975 Q 380 920 470 935 Q 540 900 620 930 Q 720 925 770 985 Q 830 1030 805 1100 Q 790 1160 690 1170 Q 560 1185 430 1172 Q 300 1165 270 1100 Z';
  const g = krng(31);
  const polvo = Array.from({ length: 14 }, () => ({ a: -Math.PI * (0.15 + g() * 0.7), v: 120 + g() * 260, r: 5 + g() * 9 }));
  const tPolvo = kclamp(grieta * 1.4, 0, 1);
  const lluv = []; if (lluvia > 0) { const gr = krng(77); for (let i = 0; i < 70; i++) { const x0 = gr() * 1200 - 60, v = 1400 + gr() * 500, f = gr(); const y = ((T * v + f * 2200) % 2200) - 200;
    lluv.push(<line key={i} x1={x0} y1={y} x2={x0 - 18} y2={y + 60} stroke="#dff6ff" strokeWidth={5} strokeLinecap="round" opacity={0.8 * lluvia} />); } }
  const resp = pecho * (1 + 0.04 * Math.sin(T * 2.2)) * (1 - 0.7 * desinfla);
  const puffs = []; if (exhala > 0) for (let k = 0; k < 9; k++) { const ph = ((T * 0.45 + k / 9) % 1); const x = 640 + Math.sin(k * 2.3 + T) * (50 + ph * 110), y = 960 - ph * 300;
    puffs.push(<g key={k} opacity={exhala * (1 - ph) * 0.95}><circle cx={x} cy={y} r={26 + ph * 40} fill={SQ.co2} stroke={KC.ink} strokeWidth={4} />{k % 3 === 0 && <text x={x} y={y + 12} textAnchor="middle" style={{ font:`900 ${24 + ph * 16}px ${KF.texto}` }} fill={KC.ink}>CO₂</text>}</g>); }
  return <>
    <FondoLunares color={cielo} />
    {fsvg(<>
      {/* sol (se apaga con la lluvia) */}
      <g transform={`translate(240 560) rotate(${T * 12})`} opacity={kclamp(seco * (1 - lluvia), 0, 1)}>
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-9} y={-150} width={18} height={40} rx={9} fill={KC.orange} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />)}
        <circle r={92} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
      </g>
      {/* nubes de lluvia */}
      {lluvia > 0 && [[260, 470, 1.1], [700, 420, 1.3], [980, 520, 0.9]].map(([x, y, s], i) => <g key={i} transform={`translate(${x + Math.sin(T * 0.5 + i) * 14} ${y}) scale(${s})`} opacity={lluvia}>
        <path d="M -150 30 Q -160 -30 -90 -40 Q -60 -100 10 -80 Q 70 -120 120 -60 Q 180 -50 170 20 Q 160 50 110 50 L -110 50 Q -150 50 -150 30 Z" fill="#eef4f8" stroke={KC.ink} strokeWidth={8} /></g>)}
      <g transform={`translate(0 ${DY})`}>
      {/* subsuelo: raíces, piedras y micelio (lo que vive abajo) */}
      {/* cañas de maíz */}
      {canas.map(([x, top, inc], i) => { const sw = mece(T, i + 2, 0.25) * 2; return <g key={i} transform={`translate(${x} 1010) rotate(${inc + sw})`}>
        <path d={`M -9 0 L -6 ${top - 1010} L 6 ${top - 1010} L 9 0 Z`} fill={cana} stroke={KC.ink} strokeWidth={5} />
        {[0.3, 0.5, 0.7].map((k, j) => { const y = (top - 1010) * k, s = j % 2 ? 1 : -1, caida = klerp(1, 0.25, verde);
          return <path key={j} d={`M 0 ${y} Q ${s * 70} ${y - 50 * (1 - caida) + 10 * caida} ${s * 120} ${y + 90 * caida - 30 * (1 - caida)}`} stroke={KC.ink} strokeWidth={17} fill="none" strokeLinecap="round" />; })}
        {[0.3, 0.5, 0.7].map((k, j) => { const y = (top - 1010) * k, s = j % 2 ? 1 : -1, caida = klerp(1, 0.25, verde);
          return <path key={'h' + j} d={`M 0 ${y} Q ${s * 70} ${y - 50 * (1 - caida) + 10 * caida} ${s * 120} ${y + 90 * caida - 30 * (1 - caida)}`} stroke={cana} strokeWidth={10} fill="none" strokeLinecap="round" />; })}
        <path d={`M 0 ${top - 1010} l -14 -50 M 0 ${top - 1010} l 0 -60 M 0 ${top - 1010} l 14 -50`} stroke={mixHex('#b08a40', '#e8c25a', verde)} strokeWidth={7} strokeLinecap="round" />
      </g>; })}
      {/* suelo */}
      <rect x={-200} y={1010} width={1500} height={1250} fill={suelo} stroke={KC.ink} strokeWidth={10} />
      <SubsueloDetalle T={T} seco={seco} />
      <g opacity={seco}>{grietasSuelo.map((p, i) => <path key={i} d={'M ' + p.map((q) => q.join(' ')).join(' L ')} stroke={SQ.grieta} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}</g>
      {/* brotes al final */}
      {verde > 0 && [150, 330, 720, 930].map((x, i) => { const v = kEase.rebote(kclamp(verde * 1.6 - i * 0.15, 0, 1)); return <g key={i} transform={`translate(${x} 1016) scale(${v})`}>
        <path d="M 0 0 L 0 -60" stroke={KC.ink} strokeWidth={10} /><path d="M 0 0 L 0 -60" stroke={KC.leaf} strokeWidth={5} />
        <path d="M 0 -50 Q -40 -80 -60 -50 Q -30 -40 0 -50 Z M 0 -56 Q 40 -90 62 -58 Q 30 -46 0 -56 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /></g>; })}
      {/* el terrón */}
      <path d={TERRON} fill={terron} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      <path d="M 330 990 Q 450 950 560 960" stroke="#fff" strokeWidth={9} fill="none" opacity={0.25 * seco} strokeLinecap="round" />
      {/* "pecho": aire aguantado dentro del terrón (metáfora) */}
      <ellipse cx={540} cy={1062} rx={170 * resp} ry={64 * resp} fill="rgba(255,255,255,.12)" stroke="#fff" strokeWidth={5} strokeDasharray="16 12" strokeDashoffset={-T * 20} opacity={0.85 * pecho} />
      {/* grieta del gancho */}
      <g opacity={seco}>
        <path d={sqTramo([[470, 935], [500, 990], [480, 1040], [530, 1090], [520, 1170]], grieta).d} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={sqTramo([[640, 930], [620, 975], [660, 1020], [640, 1060]], grieta).d} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      {tPolvo > 0 && tPolvo < 1 && polvo.map((p, i) => <circle key={i} cx={490 + Math.cos(p.a) * p.v * tPolvo} cy={940 + Math.sin(p.a) * p.v * tPolvo + 160 * tPolvo * tPolvo} r={p.r} fill={SQ.seco} stroke={KC.ink} strokeWidth={3} opacity={1 - tPolvo} />)}
      {/* charquitos al mojarse */}
      {seco < 1 && [[180, 1300], [620, 1380], [900, 1250]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={90 * (1 - seco)} ry={22 * (1 - seco)} fill="#6ea7c4" stroke={KC.ink} strokeWidth={4} opacity={1 - seco} />)}
      {puffs}
      </g>
      {lluv}
    </>)}
  </>;
}

// Subsuelo: piedras, raíces de la milpa y un micelio tenue (dibujo esquemático), debajo de la superficie (y = 1010).
function SubsueloDetalle({ T, seco = 1 }) {
  const g = krng(5);
  const piedras = Array.from({ length: 22 }, () => [g() * 1080, 1090 + g() * 1000, 10 + g() * 26]);
  const raices = [[110, 1010], [270, 1010], [860, 1010], [1010, 1010]].map(([x, y], i) => { const r = krng(20 + i); let d = `M ${x} ${y}`, cx = x, cy = y; for (let k = 0; k < 6; k++) { cx += (r() - 0.5) * 70; cy += 50 + r() * 40; d += ` L ${cx.toFixed(0)} ${cy.toFixed(0)}`; } return d; });
  const mic = []; const m = krng(9); for (let i = 0; i < 46; i++) { const x = m() * 1080, y = 1100 + m() * 900, a = m() * Math.PI, l = 40 + m() * 90; mic.push(<line key={i} x1={x} y1={y} x2={x + Math.cos(a) * l} y2={y + Math.sin(a) * l * 0.5} stroke={SQ.hifa} strokeWidth={3} opacity={0.45} />); }
  return <g>
    <rect x={-200} y={1300} width={1500} height={1000} fill="#000" opacity={0.12} />
    {piedras.map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.7} fill={mixHex('#b88a58', '#6b4a32', 1 - seco)} stroke={KC.ink} strokeWidth={3} opacity=".8" />)}
    {raices.map((d, i) => <path key={i} d={d} stroke={mixHex('#e3c48a', '#d8c08a', 1 - seco)} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />)}
    {mic}
  </g>;
}

// Soles: «meses sin lluvia» (cuántos: ilustrativo)
function Soles({ T, at, until, n = 4, x = 700, y = 540 }) {
  if (!kvisible(T, at, until)) return null;
  const sale = until == null ? 0 : kprog(T, until, until + 0.3);
  return fsvg(<>{Array.from({ length: n }, (_, i) => { const k = kEase.rebote(kprog(T, at + i * 0.35, at + i * 0.35 + 0.4)) * (1 - sale); if (k <= 0) return null;
    return <g key={i} transform={`translate(${x + i * 92} ${y}) scale(${k}) rotate(${T * 30})`}>
      {Array.from({ length: 8 }, (_, j) => <rect key={j} x={-5} y={-44} width={10} height={16} rx={5} fill={KC.orange} stroke={KC.ink} strokeWidth={3} transform={`rotate(${j * 45})`} />)}
      <circle r={26} fill={KC.orange} stroke={KC.ink} strokeWidth={5} /></g>; })}</>, 42);
}

// ---------- mundo micro: poros del suelo ----------
const GRANOS = [[170, 520, 150], [530, 470, 125], [890, 560, 150], [320, 830, 140], [720, 870, 165], [120, 1120, 125], [470, 1140, 140], [900, 1150, 140], [1060, 860, 80]];
const PUENTES = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [3, 5], [5, 6], [4, 6], [6, 7], [4, 7], [2, 8], [1, 4]];
const borde = (a, b) => { const A = GRANOS[a], B = GRANOS[b], d = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d;
  return [[A[0] + ux * A[2] * 0.9, A[1] + uy * A[2] * 0.8], [B[0] - ux * B[2] * 0.9, B[1] - uy * B[2] * 0.8]]; };
// bacterias: puente donde viven, fase
const BACS = [[0, 0.1, 1.2], [3, 0.5, 2.1], [6, 0.3, 3.3], [9, 0.7, 4.4], [4, 0.2, 5.6], [10, 0.6, 6.1]];
// hifas que cruzan los poros con aire
const HIFA1 = [[-60, 690], [150, 690], [330, 660], [470, 655], [610, 700], [770, 700], [930, 690], [1140, 640]];
const HIFA2 = [[470, 655], [520, 760], [590, 990], [640, 1040]];
const HIFA3 = [[770, 700], [820, 600], [840, 380]];

function MundoPoros({ T, agua = 1, hifas = 0, nadan = 1, bacVis = 1 }) {
  const film = 4 + 26 * agua;
  return <>
    <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2333 0%, ${KC.dark} 75%)` }}></div>
    {fsvg(<>
      <defs>
        <pattern id="sqAire" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="26" height="26" fill="none" /><line x1="0" y1="0" x2="0" y2="26" stroke={SQ.aire} strokeWidth="3" opacity=".35" /></pattern>
      </defs>
      {/* aire en los poros (aparece al secarse) */}
      <rect x={0} y={330} width={KW} height={950} fill="url(#sqAire)" opacity={1 - agua} />
      {/* agua: puentes (meniscos) y películas */}
      {PUENTES.map(([a, b], i) => { const [p, q] = borde(a, b); return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={SQ.agua} strokeWidth={10 + 70 * agua} strokeLinecap="round" opacity={0.55 * agua} />; })}
      {GRANOS.map(([x, y, r], i) => <path key={'f' + i} d={sqBlob(x, y, r + film, 40 + i)} fill={SQ.agua} opacity={0.35 + 0.2 * agua} />)}
      {GRANOS.map(([x, y, r], i) => <g key={'g' + i}>
        <path d={sqBlob(x, y, r, 40 + i)} fill={i % 2 ? SQ.grano : SQ.grano2} stroke={KC.ink} strokeWidth={7} />
        <path d={sqBlob(x - r * 0.25, y - r * 0.25, r * 0.35, 90 + i, 7)} fill="#fff" opacity=".12" />
      </g>)}
      {/* bacterias que se mueven por el agua; al secarse se quedan quietas en un charquito */}
      {BACS.map(([pu, f, s], i) => { const [p, q] = borde(...PUENTES[pu]); const u = 0.5 + 0.42 * Math.sin(T * 0.9 * nadan + s) * klerp(0.15, 1, agua);
        const x = klerp(p[0], q[0], u), y = klerp(p[1], q[1], u), ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 57.3 + (Math.cos(T * 0.9 + s) < 0 ? 180 : 0);
        return <g key={i} opacity={bacVis}>
          {agua < 0.6 && <ellipse cx={x} cy={y} rx={52} ry={34} fill={SQ.agua} opacity={0.5} stroke={KC.ink} strokeWidth={3} />}
          <BacteriaC T={T * nadan} x={x} y={y} rot={ang} s={0.6} seed={i} color={KC.mint} />
        </g>; })}
      {/* hifas */}
      <Hifa T={T} pts={HIFA1} p={hifas} />
      <Hifa T={T} pts={HIFA2} p={kclamp(hifas * 1.6 - 0.45, 0, 1)} ancho={58} />
      <Hifa T={T} pts={HIFA3} p={kclamp(hifas * 1.6 - 0.6, 0, 1)} ancho={58} />
    </>)}
  </>;
}

// ---------- macetas tapadas (de Vries et al. 2018) ----------
function Macetas({ T, at }) {
  const pots = [180, 430, 680, 930];
  return fsvg(<>
    {/* gotas de lluvia que pegan en el techo y escurren */}
    {Array.from({ length: 16 }, (_, i) => { const x = 60 + i * 64, ph = ((T * 1.3 + i * 0.37) % 1); const y = klerp(330, 640 - (x - 60) * 0.12, ph);
      return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.85} />; })}
    {/* techo transparente */}
    <path d="M 40 680 L 1040 560" stroke={KC.ink} strokeWidth={10} />
    <path d="M 40 680 L 1040 560 L 1040 590 L 40 710 Z" fill="rgba(220,245,255,.65)" stroke={KC.ink} strokeWidth={6} />
    {[100, 1000].map((x, i) => <line key={i} x1={x} y1={690 - (x - 40) * 0.12} x2={x} y2={1090} stroke={KC.ink} strokeWidth={9} />)}
    {/* escurrimiento */}
    {Array.from({ length: 4 }, (_, i) => { const ph = ((T * 0.8 + i * 0.25) % 1); return <circle key={i} cx={klerp(1040, 1070, ph)} cy={560 + ph * 420} r={10} fill="#ffffff" stroke={KC.ink} strokeWidth={3} />; })}
    {/* macetas con pradera */}
    {pots.map((x, i) => { const on = kEase.rebote(kprog(T, at + 0.4 + i * 0.12, at + 0.8 + i * 0.12)); return <g key={i} transform={`translate(${x} 1090) scale(${on})`}>
      {Array.from({ length: 9 }, (_, j) => { const dx = -80 + j * 20, h = 90 + ((j * 37) % 50), sw = mece(T, i * 9 + j, 0.4) * 6;
        return <path key={j} d={`M ${dx} -150 Q ${dx + sw} ${-150 - h * 0.6} ${dx + sw * 2 + (j % 2 ? 12 : -12)} ${-150 - h}`} stroke={j % 3 ? '#5fae3a' : '#3f8f2a'} strokeWidth={9} fill="none" strokeLinecap="round" />; })}
      <path d="M -100 -160 L 100 -160 L 80 0 L -80 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-112} y={-180} width={224} height={30} rx={8} fill={KC.coral} stroke={KC.ink} strokeWidth={7} />
    </g>; })}
  </>);
}

// ---------- redes de co-ocurrencia («quién aparece con quién») ----------
const NODOS = (cx, cy, seed) => { const g = krng(seed); return Array.from({ length: 13 }, (_, i) => { const a = (i / 13) * Math.PI * 2 + g() * 0.4, r = 60 + g() * 150; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9]; }); };
const NB = NODOS(290, 930, 5), NH = NODOS(790, 930, 9);
const ARISTAS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [0, 5], [2, 9], [4, 11], [7, 12]];
const EXTRA = [[0, 7], [1, 9], [3, 10], [2, 6], [5, 11], [1, 4], [6, 12], [8, 3]];
function Redes({ T, sequia = 0 }) {
  const tiemblaB = (i, k) => sequia * 22 * mece(T * 3, i * 3 + k, 1.2);
  const pB = NB.map(([x, y], i) => [x + tiemblaB(i, 1), y + tiemblaB(i, 2)]);
  const pH = NH.map(([x, y], i) => [x + mece(T, i + 30, 0.2) * 4, y + mece(T, i + 50, 0.2) * 4]);
  return fsvg(<>
    {/* bacterias */}
    {ARISTAS.map(([a, b], i) => <line key={'b' + i} x1={pB[a][0]} y1={pB[a][1]} x2={pB[b][0]} y2={pB[b][1]} stroke={sequia > 0.3 ? mixHex('#ffffff', KC.red, sequia) : '#ffffff'} strokeWidth={6} opacity={0.85} />)}
    {EXTRA.map(([a, b], i) => { const o = kclamp(sequia * 2 - i * 0.15, 0, 1) * (0.6 + 0.4 * Math.sin(T * 9 + i)); return <line key={'e' + i} x1={pB[a][0]} y1={pB[a][1]} x2={pB[b][0]} y2={pB[b][1]} stroke={KC.red} strokeWidth={5} strokeDasharray="12 8" opacity={o} />; })}
    {pB.map(([x, y], i) => <g key={'nb' + i}><circle cx={x} cy={y} r={30} fill={KC.dark} stroke={KC.ink} strokeWidth={5} /><BacteriaC x={x} y={y} s={0.36} rot={i * 40} seed={i} T={T} flagelo={false} /></g>)}
    {/* hongos */}
    {ARISTAS.map(([a, b], i) => <line key={'h' + i} x1={pH[a][0]} y1={pH[a][1]} x2={pH[b][0]} y2={pH[b][1]} stroke="#ffffff" strokeWidth={6} opacity={0.85} />)}
    {pH.map(([x, y], i) => <g key={'nh' + i}><circle cx={x} cy={y} r={30} fill={KC.dark} stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${x - 18} ${y + 8} Q ${x - 4} ${y - 14} ${x + 18} ${y - 6} M ${x - 2} ${y - 4} L ${x + 4} ${y + 16}`} stroke={SQ.hifa} strokeWidth={8} fill="none" strokeLinecap="round" /></g>)}
    <text x={290} y={720} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">BACTERIAS</text>
    <text x={790} y={720} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">HONGOS</text>
  </>);
}

// ---------- caja de dos cámaras (Guhr et al. 2015) ----------
const CAJA = { x0: 90, x1: 990, y0: 760, y1: 1120, g0: 520, g1: 560 };
const HIFAS_CAJA = [[[150, 880], [300, 860], [470, 900], [540, 905], [640, 880], [760, 930], [880, 900]], [[180, 1010], [330, 1040], [480, 1000], [540, 1000], [620, 1030], [720, 1000], [820, 1050], [950, 1020]], [[120, 950], [260, 960], [400, 940], [540, 950], [600, 960], [700, 960]]];
function CajaDosTierras({ T, hifas = 0, agua = 0, oscurece = 0 }) {
  const C = CAJA, seca = mixHex(SQ.seco, '#8f6538', oscurece);
  return fsvg(<>
    <rect x={C.x0 - 14} y={C.y0 - 14} width={C.x1 - C.x0 + 28} height={C.y1 - C.y0 + 28} rx={24} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
    <rect x={C.x0} y={C.y0} width={C.g0 - C.x0} height={C.y1 - C.y0} rx={10} fill={SQ.mojado} stroke={KC.ink} strokeWidth={6} />
    <rect x={C.g1} y={C.y0} width={C.x1 - C.g1} height={C.y1 - C.y0} rx={10} fill={seca} stroke={KC.ink} strokeWidth={6} />
    <rect x={C.g0} y={C.y0} width={C.g1 - C.g0} height={C.y1 - C.y0} fill="#f2fbff" />
    {[...Array(8)].map((_, i) => <circle key={i} cx={C.x0 + 40 + (i * 53) % 400} cy={C.y0 + 40 + (i * 97) % 300} r={8} fill="#2b1a10" opacity=".6" />)}
    {[...Array(8)].map((_, i) => <circle key={'s' + i} cx={C.g1 + 40 + (i * 61) % 390} cy={C.y0 + 50 + (i * 83) % 300} r={8} fill="#a8794a" opacity=".7" />)}
    {HIFAS_CAJA.map((pts, i) => <Hifa key={i} T={T} pts={pts} p={kclamp(hifas * 1.3 - i * 0.12, 0, 1)} ancho={20} septo={90} gotas={agua} />)}
    <text x={(C.x0 + C.g0) / 2} y={C.y0 + 52} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>tierra húmeda</text>
    <text x={(C.g1 + C.x1) / 2} y={C.y0 + 52} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>tierra seca</text>
    <text x={(C.g0 + C.g1) / 2} y={C.y0 - 26} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>aire</text>
  </>);
}

// Rebanada de pizza con champiñones
function Pizza({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 140 L -120 -110 Q 0 -160 120 -110 Z" fill="#ffd36b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -100 -100 Q 0 -140 100 -100 L 0 110 Z" fill="#ff6b3a" opacity=".85" />
    <path d="M -120 -110 Q 0 -165 120 -110 Q 125 -135 100 -142 Q 0 -185 -100 -142 Q -125 -135 -120 -110 Z" fill="#e0a043" stroke={KC.ink} strokeWidth={8} />
    {[[-40, -70], [35, -60], [0, 0], [-10, -110 + 30]].map(([a, b], i) => <g key={i} transform={`translate(${a} ${b})`}>
      <path d="M -22 4 Q -22 -22 0 -22 Q 22 -22 22 4 Z" fill="#f4ead8" stroke={KC.ink} strokeWidth={4} /><rect x={-7} y={2} width={14} height={14} fill="#f4ead8" stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}

// Sello rectangular «HIPÓTESIS»
function SelloTexto({ T, at, until, x, y, texto, color = KC.orange, rot = -8, tam = 96 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const fuera = until == null ? 0 : kprog(T, until, until + 0.35);
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, k)})`, opacity:kprog(T, at, at + 0.15) * (1 - fuera),
    border:`12px solid ${color}`, borderRadius:24, padding:'6px 34px 10px', font:`400 ${tam}px/1 ${KF.titulo}`, color, background:'rgba(14,15,18,.75)', letterSpacing:'.04em', boxShadow:`0 0 0 5px ${KC.ink}` }}>{texto}</div>;
}

// Gráfica del pulso de CO₂ (esquemática): baja, llueve (línea punteada), sube de golpe y baja despacio.
function GraficaPulso({ T, at, until, x = 70, y = 380, w = 600, h = 300 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), p = kprog(T, at + 0.5, at + 2.4, kEase.suave);
  const xl = x + 150, N = 60, pts = [];
  for (let i = 0; i <= N * p; i++) { const u = i / N, xx = x + 60 + u * (w - 90); const t = xx - xl; const v = t < 0 ? 0.08 : 0.08 + 0.85 * (1 - Math.exp(-t / 8)) * Math.exp(-t / 120); pts.push(`${i ? 'L' : 'M'} ${xx.toFixed(1)} ${(y + h - 40 - v * (h - 80)).toFixed(1)}`); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:41, opacity:e.o }}>
    <rect x={x} y={y} width={w} height={h} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <line x1={x + 60} y1={y + 30} x2={x + 60} y2={y + h - 40} stroke={KC.ink} strokeWidth={5} />
    <line x1={x + 60} y1={y + h - 40} x2={x + w - 24} y2={y + h - 40} stroke={KC.ink} strokeWidth={5} />
    <text x={x + 76} y={y + 52} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>CO₂ que sale</text>
    <text x={x + w - 30} y={y + h - 12} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>tiempo →</text>
    <line x1={xl} y1={y + 70} x2={xl} y2={y + h - 40} stroke="#2a8fd6" strokeWidth={5} strokeDasharray="10 8" />
    <text x={xl - 8} y={y + h - 54} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill="#2a8fd6">lluvia</text>
    <path d={pts.join(' ')} stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

// Interior de la lupa sobre el terrón: granos, hifas y bacterias.
function LupaTierra(T, r) {
  const g = krng(12);
  const gr = Array.from({ length: 9 }, (_, i) => [g() * 2 * r, g() * 2 * r, 40 + g() * 50]);
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#140f0b" />
    {gr.map(([x, y, rr], i) => <path key={i} d={sqBlob(x, y, rr, 60 + i)} fill={i % 2 ? SQ.grano : SQ.grano2} stroke={KC.ink} strokeWidth={4} />)}
    <path d={`M -10 ${r * 0.9} Q ${r * 0.6} ${r * 0.7} ${r} ${r * 1.05} T ${r * 2.1} ${r * 0.8}`} stroke={SQ.hifaB} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={`M ${r * 0.7} ${r * 0.8} Q ${r * 0.8} ${r * 1.3} ${r * 0.6} ${r * 1.9}`} stroke={SQ.hifaB} strokeWidth={12} fill="none" strokeLinecap="round" />
    {[[0.35, 0.45], [1.4, 0.5], [1.2, 1.5], [0.5, 1.45], [1.65, 1.15]].map(([u, v], i) => <BacteriaC key={i} T={T} x={u * r} y={v * r + Math.sin(T * 2 + i) * 6} s={0.42} rot={i * 50} seed={i} color={KC.mint} />)}
  </svg>;
}

function SequiaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Milpa, Ba: CUES.Bacterias, Se: CUES.Seca, Hi: CUES.Hifas, P: CUES.Pregunta, E: CUES.Estudio, R: CUES.Redes,
    Ch: CUES.Champinon, Pi: CUES.Pizza, Hp: CUES.Hipotesis, Ll: CUES.Lluvia, Bi: CUES.Birch, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // estado de la milpa
  const lluvia = kprog(T, K.Ll + 0.1, K.Ll + 1.0) * (1 - kprog(T, K.C + 0.2, K.C + 1.6));
  const seco = 1 - kprog(T, K.Ll + 0.4, K.Bi + 0.6, kEase.suave);
  const exhala = kprog(T, K.Ll + 1.6, K.Bi + 0.4) * (1 - kprog(T, K.C + 0.6, K.C + 2.0));
  const verde = kprog(T, K.C + 0.3, K.C + 2.4, kEase.suave);
  const cielo = T < K.Ll ? KC.yellow : T < K.C ? mixHex(KC.yellow, KC.cyan, kprog(T, K.Ll, K.Ll + 0.8)) : mixHex(KC.cyan, KC.mint, kprog(T, K.C, K.C + 1.5));
  const pecho = T < K.Ll ? kprog(T, K.G + 0.6, K.G + 1.6, kEase.sale) : 1;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · la milpa seca: el terrón se agrieta (0.3 s) y "aguanta la respiración"; la lupa baja al microscopio */}
      <Escena T={T} a={K.G} b={K.Ba} zoom={0.06} origen="50% 55%">
        <Milpa T={T} grieta={kprog(T, K.G + 0.25, K.G + 0.9, kEase.sale)} pecho={pecho} />
      </Escena>
      {/* 3–5 · los poros por dentro: películas de agua, bacterias, aire, hifas */}
      <Escena T={T} a={K.Ba} b={K.P} zoom={0.05}>
        <MundoPoros T={T} agua={1 - kprog(T, K.Se + 0.2, K.Se + 2.2, kEase.suave)} hifas={kprog(T, K.Hi + 0.2, K.Hi + 3.6, kEase.suave)} nadan={1 - kprog(T, K.Se + 0.5, K.Se + 2.2)} />
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <BacteriaC T={T} x={190} y={640} s={1.6} rot={-15 + Math.sin(T * 3) * 6} color={KC.mint} seed={3} />
          <Hifa T={T} pts={[[-40, 1010], [140, 990], [300, 1030], [430, 990]]} p={1} ancho={70} />
          <Interrogacion T={T} x={300} y={930} tam={320} />
        </>)}
      </Escena>
      {/* 7 · el estudio de 2018: macetas de pradera bajo techo transparente; se lee el ADN */}
      <Escena T={T} a={K.E} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Macetas T={T} at={K.E} />
        {fsvg(<g opacity={kprog(T, K.E + 3.2, K.E + 3.6)}><ADNHebra T={T} x={130} y={520} largo={820} alto={70} vueltas={4} resalta={(u) => u < kprog(T, K.E + 3.4, K.E + 5.6)} /></g>, 22)}
      </Escena>
      {/* 8 · redes: la de bacterias se desacomoda con la sequía; la de hongos aguanta */}
      <Escena T={T} a={K.R} b={K.Ch} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Redes T={T} sequia={kprog(T, K.R + 1.0, K.R + 2.4)} />
      </Escena>
      {/* 9–11 · la caja de dos tierras: el champiñón lleva agua por sus hifas; medidor; pizza; hipótesis */}
      <Escena T={T} a={K.Ch} b={K.Ll} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <CajaDosTierras T={T} hifas={kprog(T, K.Ch + 0.8, K.Ch + 3.4, kEase.suave)} agua={kprog(T, K.Ch + 3.0, K.Ch + 3.6)} oscurece={kprog(T, K.Ch + 3.6, K.Pi + 1.0)} />
        {fsvg(<>
          <Champinon x={150} y={746} s={0.42} crece={kprog(T, K.Ch + 0.2, K.Ch + 1.0, kEase.sale)} abre={kprog(T, K.Ch + 0.6, K.Ch + 1.4)} />
          {T > K.Pi + 1.4 && <Pizza x={860} y={640} s={kEase.rebote(kprog(T, K.Pi + 1.4, K.Pi + 1.8)) * 0.7} rot={12 + Math.sin(T * 3) * 4} />}
        </>, 21)}
        <div style={{ position:'absolute', inset:0, background:'rgba(14,15,18,.45)', opacity:kprog(T, K.Hp, K.Hp + 0.4), zIndex:30 }}></div>
      </Escena>
      {/* 12–14 · llueve: la tierra exhala (efecto Birch) y regresa la milpa, ya mojada y verde */}
      <Escena T={T} a={K.Ll} b={FIN} zoom={0.04} origen="50% 55%">
        <Milpa T={T} seco={seco} verde={verde} grieta={1} pecho={1} exhala={exhala} desinfla={kprog(T, K.Ll + 1.6, K.Bi + 0.6)} lluvia={lluvia} cielo={cielo} />
      </Escena>

      {/* lupa: macro → micro */}
      <Lupa T={T} at={K.Mi + 0.4} until={K.Ba - 0.25} x={420} y={560} r={205} fx={540} fy={910} interior={LupaTierra} tinte={KC.mint} etiqueta="AL MICROSCOPIO · LA TIERRA" />

      {/* textos */}
      <Chip T={T} at={K.Mi + 0.2} until={K.Ba - 0.3} texto="meses sin lluvia" x={830} y={440} tam={34} borde={KC.orange} />
      <Soles T={T} at={K.Mi + 0.6} until={K.Ba - 0.3} x={700} y={540} />
      <Etq T={T} at={K.Mi + 1.6} until={K.Ba - 0.3} x={640} y={640} texto="hongos (hifas)" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Mi + 2.1} until={K.Ba - 0.3} x={640} y={700} texto="bacterias" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Ba + 0.2} until={K.Se - 0.2} texto="AL MICROSCOPIO · POROS DEL SUELO" x={450} y={400} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ba + 0.9} until={K.Se + 1.0} x={560} y={680} texto="película de agua" tam={28} color={SQ.agua} />
      <Etq T={T} at={K.Ba + 1.4} until={K.Hi - 0.2} x={300} y={1010} texto="bacteria" lado="izq" tam={28} color={KC.mint} />
      <Etq T={T} at={K.Ba + 1.9} until={K.Hi - 0.2} x={40} y={700} texto="grano de suelo" tam={26} color="#ffd9a8" />
      <Chip T={T} at={K.Se + 1.2} until={K.Hi - 0.2} texto="poro con aire" x={540} y={1010} tam={34} borde={SQ.aire} />
      <Etq T={T} at={K.Hi + 1.0} until={K.P - 0.2} x={140} y={600} texto="hifa (hilo del hongo)" tam={30} color={SQ.hifa} />
      <Chip T={T} at={K.Hi + 2.2} until={K.P - 0.2} texto="cruza el aire" x={330} y={420} tam={34} borde={SQ.hifa} />
      <Etq T={T} at={K.P + 0.3} until={K.E - 0.2} x={300} y={560} texto="bacteria" tam={30} color={KC.ink} />
      <Etq T={T} at={K.P + 0.5} until={K.E - 0.2} x={60} y={1100} texto="hifa" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="2018" quien="de Vries y col. · Inglaterra" revista="Nature Communications, 2018" x={540} y={470} />
      <Chip T={T} at={K.E + 1.4} until={K.R - 0.3} texto="techo transparente: sin lluvia" x={540} y={790} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.E + 3.3} until={K.R - 0.3} texto="leen el ADN de sus microbios" x={540} y={420} tam={34} borde={KC.pink} />
      <Etq T={T} at={K.E + 2.0} until={K.R - 0.3} x={60} y={1145} texto="macetas de pradera" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 0.1} until={K.Ch - 0.3} texto="¿quién aparece con quién?" x={360} y={430} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.R + 1.0} until={K.Ch - 0.3} texto="SEQUÍA" x={360} y={520} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.R + 2.2} until={K.Ch - 0.3} texto="bacterias: menos estable" x={290} y={1135} tam={32} borde={KC.red} />
      <Chip T={T} at={K.R + 3.0} until={K.Ch - 0.3} texto="hongos: más estable" x={790} y={1135} tam={32} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Ch + 0.2} until={K.Ch + 2.6} anio="2015" quien="Guhr y col. · laboratorio" revista="PNAS, 2015" x={400} y={480} />
      <Etq T={T} at={K.Ch + 2.8} until={K.Pi - 0.2} x={120} y={560} texto="champiñón" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ch + 3.1} until={K.Pi - 0.2} x={120} y={612} texto="Agaricus bisporus" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ch + 3.4} until={K.Pi - 0.2} texto="agua por las hifas →" x={540} y={1075} tam={30} borde={SQ.agua} />
      <Medidor T={T} at={K.Pi + 0.1} until={K.Hp - 0.2} x={90} y={410} ancho={900} color={KC.red} valor={(t) => kprog(t, K.Pi + 0.3, K.Pi + 1.5, kEase.sale)}
        etiqueta="CO₂ de descomposición, tierra seca" texto={(v) => '+' + kformato(Math.round(v * 2800), 0) + ' %'} />
      <Etq T={T} at={K.Pi + 0.6} until={K.Hp - 0.2} x={90} y={540} texto="vs. hifas cortadas · 7 días" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.Pi + 0.3} until={K.Hp - 0.2} valor={2800} dur={1.2} prefijo="+" sufijo=" %" x={380} y={630} tam={120} color={KC.red} />
      <SelloTexto T={T} at={K.Hp + 0.25} until={K.Ll - 0.1} x={540} y={600} texto="HIPÓTESIS" />
      <Chip T={T} at={K.Hp + 0.7} until={K.Ll - 0.2} texto="¿así aguantan la sequía?" x={540} y={760} tam={40} borde={KC.orange} />
      <GraficaPulso T={T} at={K.Bi + 0.1} until={K.C - 0.3} x={60} y={360} w={610} h={280} />
      <Chip T={T} at={K.Bi + 1.4} until={K.Bi + 4.2} texto="en minutos" x={250} y={700} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Bi + 2.6} until={K.C - 0.3} texto="microbios" x={220} y={1100} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.Bi + 3.0} until={K.C - 0.3} texto="enzimas fuera de ellos" x={650} y={1100} tam={30} borde={KC.lilac} />
      <Chip T={T} at={K.Bi + 4.4} until={K.C - 0.3} texto="efecto Birch · África del Este, años 50" x={460} y={700} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no estaba muerta" x={330} y={430} tam={40} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ba} texto="10 cm (terrón)" largo={130} />
      <BarraEscala T={T} at={K.Ba} until={K.P} texto="5 µm (esquemático)" largo={145} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.R} texto="20 cm (maceta)" largo={95} />
      <BarraEscala T={T} at={K.R} until={K.Ch} texto="red esquemática" largo={0} />
      <BarraEscala T={T} at={K.Ch} until={K.Ll} texto="2 mm (hueco de aire)" largo={40} />
      <BarraEscala T={T} at={K.Ll} until={K.Ou} texto="10 cm (terrón)" largo={130} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="No está muerta: *aguanta la respiración.*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.Ba - 0.1} texto="Meses sin lluvia… y abajo, *hongos y bacterias.*" />
      <Subtitulo T={T} idx={2} at={K.Ba + 0.1} until={K.Se - 0.1} texto="Las bacterias son *seres de agua.*" />
      <Subtitulo T={T} idx={3} at={K.Se + 0.1} until={K.Hi - 0.1} texto="Al secarse: *poros con aire.*" />
      <Subtitulo T={T} idx={4} at={K.Hi + 0.1} until={K.P - 0.1} texto="Las hifas *cruzan el aire.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Eso los hace *aguantar más?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.R - 0.1} texto="Sin lluvia… *y a leer su ADN.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.Ch - 0.1} texto="Bacterias: *menos estable.* Hongos: no." />
      <Subtitulo T={T} idx={8} at={K.Ch + 0.1} until={K.Pi - 0.1} texto="El champiñón *llevó agua* a la tierra seca." />
      <Subtitulo T={T} idx={9} at={K.Pi + 0.1} until={K.Hp - 0.1} texto="La descomposición *se disparó.*" />
      <Subtitulo T={T} idx={10} at={K.Hp + 0.1} until={K.Ll - 0.1} texto="¿Su secreto? *Es una hipótesis.*" />
      <Subtitulo T={T} idx={11} at={K.Ll + 0.1} until={K.Bi - 0.1} texto="Cuando llueve, *la tierra exhala.*" />
      <Subtitulo T={T} idx={12} at={K.Bi + 0.1} until={K.C - 0.1} texto="Un pulso de CO₂: *el efecto Birch.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="No estaba muerta: *esperaba la lluvia.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.Mi - 0.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Ba + 0.5, K.Se - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Se + 0.4, K.Hi - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.4, K.Ch - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ch + 2.8, K.Pi - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pi + 1.2, K.Hp + 2.7, 'avatar_02_apuntando_camara', 'bajo-der'],
        [K.Ll + 0.6, K.Bi + 3.5, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="124" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SequiaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SequiaShot /></CompositionStage></div>;
}
window.SequiaApp = SequiaApp;
