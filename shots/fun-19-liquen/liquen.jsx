// Shot Fungi Mati #19 · Esa mancha en la piedra no es una planta: el liquen — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (capas y proporciones ilustrativas).

const LQ = { roca:'#9aa0a6', roca2:'#7d838a', roca3:'#c3c8cd', naranja:'#f28c1e', naranja2:'#c8620f', mapa:'#c9d63a', mapa2:'#9fb02a', gris:'#a9b8a0', gris2:'#7f9277',
  cortex:'#e9c27a', cortex2:'#c99a4c', alga:'#46b04a', alga2:'#2a7a31', hifa:'#f3e6c4', levadura:'#ff5fa2', azucar:'#fff2a8', corteza:'#6b4a2b' };

// Mancha de liquen vista desde arriba. tipo: 'naranja' (talo foliáceo lobulado, tipo Xanthoria, con apotecios en disco),
// 'mapa' (costroso amarillo verdoso en areolas con borde negro, tipo Rhizocarpon), 'gris' (foliáceo gris verdoso).
function ManchaLiquen({ x, y, r, tipo = 'naranja', crece = 1, seed = 1, rot = 0, T = 0 }) {
  if (crece <= 0) return null;
  const g = krng(seed), s = kEase.sale(kclamp(crece, 0, 1));
  const lob = (rr, k, amp, fase) => { const pts = []; for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2; const q = rr * (1 + amp * Math.sin(k * a + fase) + amp * 0.5 * Math.sin((k * 2 + 1) * a + fase * 2)); pts.push([Math.cos(a) * q, Math.sin(a) * q]); } return 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z'; };
  if (tipo === 'mapa') {
    const areolas = Array.from({ length: 26 }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.78; return [Math.cos(a) * d, Math.sin(a) * d, r * (0.1 + g() * 0.07)]; });
    return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={lob(r, 5, 0.08, seed)} fill="#1b1714" stroke={KC.ink} strokeWidth={5} />
      {areolas.map(([ax, ay, ar], i) => <rect key={i} x={ax - ar} y={ay - ar} width={ar * 2} height={ar * 1.7} rx={ar * 0.35} fill={i % 3 ? LQ.mapa : LQ.mapa2} transform={`rotate(${(i * 37) % 60 - 30} ${ax} ${ay})`} />)}
    </g>;
  }
  const c1 = tipo === 'gris' ? LQ.gris : LQ.naranja, c2 = tipo === 'gris' ? LQ.gris2 : LQ.naranja2;
  const discos = tipo === 'naranja' ? Array.from({ length: 6 }, () => { const a = g() * Math.PI * 2, d = g() * r * 0.45; return [Math.cos(a) * d, Math.sin(a) * d, r * (0.08 + g() * 0.05)]; }) : [];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={lob(r, 9, 0.12, seed)} fill={c2} stroke={KC.ink} strokeWidth={5} />
    <path d={lob(r * 0.82, 9, 0.12, seed + 0.4)} fill={c1} />
    <path d={lob(r * 0.5, 7, 0.14, seed + 1)} fill={c2} opacity=".55" />
    {discos.map(([dx, dy, dr], i) => <g key={i}><circle cx={dx} cy={dy} r={dr} fill={c2} stroke={KC.ink} strokeWidth={2.5} /><circle cx={dx} cy={dy} r={dr * 0.6} fill={mixHex(c2, '#7a3a08', 0.4)} /></g>)}
  </g>;
}

// Piedra con manchas de liquen (la imagen del inicio y del cierre). casco = 0..1 (a dos manchas les sale un casco de astronauta).
const PIEDRA_MANCHAS = [[340, 905, 95, 'naranja', 3], [705, 965, 112, 'mapa', 5], [505, 1095, 68, 'gris', 7], [835, 835, 46, 'naranja', 9], [225, 1075, 52, 'gris', 11], [600, 830, 34, 'mapa', 13]];
function Piedra({ T, crece = 1, casco = 0, respira = 0 }) {
  return <g transform="translate(0 -90)">
    <path d="M 110 1185 Q 90 920 250 805 Q 420 705 640 735 Q 900 760 975 950 Q 1010 1090 965 1185 Z" fill={LQ.roca} stroke={KC.ink} strokeWidth={9} />
    <path d="M 250 805 Q 420 705 640 735 Q 560 790 420 800 Q 320 810 250 805 Z" fill={LQ.roca3} opacity=".8" />
    <path d="M 965 1185 Q 1010 1090 975 950 Q 930 1060 880 1185 Z" fill={LQ.roca2} opacity=".9" />
    {[[190, 960, 260, 1000], [760, 1110, 860, 1080], [430, 1150, 520, 1160]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${c} ${d}`} stroke={LQ.roca2} strokeWidth={6} strokeLinecap="round" />)}
    {PIEDRA_MANCHAS.map(([x, y, r, tipo, sd], i) => {
      const c = typeof crece === 'number' ? kclamp(crece * 1.6 - i * 0.12, 0, 1) : 1;
      const rr = r * (1 + respira * 0.04 * Math.sin(T * 3 + i));
      return <ManchaLiquen key={i} x={x} y={y} r={rr} tipo={tipo} seed={sd} crece={c} rot={i * 23} />;
    })}
    {casco > 0 && [[340, 905, 95], [705, 965, 112]].map(([x, y, r], i) => <g key={i} opacity={casco} transform={`translate(${x} ${y - (1 - casco) * 80})`}>
      <circle r={r * 1.18} fill="rgba(200,240,255,.28)" stroke="#fff" strokeWidth={8} />
      <circle r={r * 1.18} fill="none" stroke={KC.ink} strokeWidth={3} />
      <path d={`M ${-r * 0.75} ${-r * 0.55} Q ${-r * 0.5} ${-r * 0.95} ${-r * 0.05} ${-r * 1.0}`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>)}
  </g>;
}

// Cohetito (cierre).
function Cohete({ x, y, s = 1, rot = 30, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2].map((i) => <path key={i} d={`M -14 70 Q 0 ${120 + 20 * Math.abs(Math.sin(T * 9 + i))} 14 70 Z`} fill={i ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={3} transform={`scale(${1 - i * 0.25})`} />)}
    <path d="M -30 60 L -30 -20 Q 0 -90 30 -20 L 30 60 Z" fill="#f4f4f6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 30 L -52 70 L -30 60 Z M 30 30 L 52 70 L 30 60 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={0} r={13} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Corte transversal del talo (liquen foliáceo heterómero): córtex superior (hifas muy apretadas), capa de algas
// (células verdes redondas rodeadas de hifas), médula (hifas sueltas), córtex inferior y rizinas pegadas a la piedra.
const CT = { x0: 330, x1: 1030, top: 660, alg: 735, med: 830, low: 990, riz: 1022, roca: 1070 };
const CT_DATA = (() => {
  const g = krng(19);
  const celdas = []; for (let row = 0; row < 3; row++) for (let x = CT.x0 + 6 + (row % 2) * 12; x < CT.x1 - 6; x += 25) celdas.push([x + (g() - 0.5) * 4, CT.top + 13 + row * 24 + (g() - 0.5) * 3, 12 + g() * 2, 10 + g() * 2]);
  const bajas = []; for (let x = CT.x0 + 8; x < CT.x1 - 6; x += 22) bajas.push([x + (g() - 0.5) * 4, CT.low + 17 + (g() - 0.5) * 6, 11, 13]);
  const algas = []; let tries = 0;
  while (algas.length < 24 && tries++ < 600) { const r = 14 + g() * 7, x = CT.x0 + 24 + g() * (CT.x1 - CT.x0 - 48), y = CT.alg + 22 + g() * 56; if (algas.every(([ax, ay, ar]) => Math.hypot(ax - x, ay - y) > ar + r + 6)) algas.push([x, y, r]); }
  const hifAlg = Array.from({ length: 26 }, () => { const x = CT.x0 + g() * (CT.x1 - CT.x0), y = CT.alg + g() * 95; return `M ${x} ${y} q ${20 + g() * 30} ${(g() - 0.5) * 40} ${50 + g() * 40} ${(g() - 0.5) * 30}`; });
  const hifMed = Array.from({ length: 46 }, () => { const x = CT.x0 + 10 + g() * (CT.x1 - CT.x0 - 80), y = CT.med + 10 + g() * (CT.low - CT.med - 20); const dx = 60 + g() * 110, dy = (g() - 0.5) * 120;
    return `M ${x} ${y} C ${x + dx * 0.3} ${y + (g() - 0.5) * 80} ${x + dx * 0.7} ${y + dy + (g() - 0.5) * 60} ${x + dx} ${kclamp(y + dy, CT.med + 6, CT.low - 6)}`; });
  const riz = Array.from({ length: 7 }, (_, i) => CT.x0 + 60 + i * ((CT.x1 - CT.x0 - 120) / 6) + (g() - 0.5) * 30);
  const azucar = algas.slice(0, 12).map(([x, y], i) => [x, y, x + (g() - 0.5) * 70, CT.med + 30 + g() * 90, g()]);
  return { celdas, bajas, algas, hifAlg, hifMed, riz, azucar };
})();
function Alga({ x, y, r, brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {brillo > 0 && <circle r={r + 8} fill={KC.leaf} opacity={0.35 * brillo} />}
    <circle r={r} fill={LQ.alga} stroke={KC.ink} strokeWidth={3} />
    <path d={`M ${-r * 0.55} ${-r * 0.1} Q ${-r * 0.3} ${-r * 0.65} ${r * 0.2} ${-r * 0.5} Q ${r * 0.7} ${-r * 0.2} ${r * 0.45} ${r * 0.35} Q ${0} ${r * 0.7} ${-r * 0.5} ${r * 0.3} Z`} fill={LQ.alga2} />
    <circle r={r * 0.22} fill="#b8f0a0" />
  </g>;
}
function CorteTalo({ T, at, foco = null, azucar = 0, sol = 0 }) {
  const ap = (k) => kprog(T, at + k * 0.18, at + k * 0.18 + 0.4, kEase.sale);
  const dim = (capa) => (foco && foco !== capa ? 0.35 : 1);
  const W = CT.x1 - CT.x0;
  return <g>
    {/* piedra debajo */}
    <rect x={CT.x0 - 20} y={CT.roca} width={W + 60} height={60} fill={LQ.roca} stroke={KC.ink} strokeWidth={6} opacity={ap(0)} />
    {/* rizinas */}
    <g opacity={ap(0) * dim('baja')}>{CT_DATA.riz.map((x, i) => <path key={i} d={`M ${x} ${CT.riz} q ${-8} 20 0 34 t ${4} 32 M ${x + 8} ${CT.riz} q 10 22 2 36 t -2 30`} stroke="#4a3a2c" strokeWidth={7} fill="none" strokeLinecap="round" />)}</g>
    {/* córtex inferior */}
    <g opacity={ap(1) * dim('baja')} transform={`translate(${(1 - ap(1)) * -200} 0)`}>
      <rect x={CT.x0} y={CT.low} width={W} height={CT.riz - CT.low} fill="#7a5a3a" stroke={KC.ink} strokeWidth={5} rx={10} />
      {CT_DATA.bajas.map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#9a744c" stroke="#4a3426" strokeWidth={2} />)}
    </g>
    {/* médula: hifas sueltas */}
    <g opacity={ap(2) * dim('medula')}>
      <rect x={CT.x0} y={CT.med} width={W} height={CT.low - CT.med} fill="rgba(243,230,196,.06)" />
      {CT_DATA.hifMed.map((d, i) => <path key={i} d={d} stroke={LQ.hifa} strokeWidth={5} fill="none" strokeLinecap="round" transform={`translate(0 ${foco === 'medula' ? Math.sin(T * 2.4 + i) * 2.5 : 0})`} />)}
    </g>
    {/* capa de algas */}
    <g opacity={ap(3) * dim('algas')} transform={`translate(${(1 - ap(3)) * 200} 0)`}>
      {CT_DATA.algas.map(([x, y, r], i) => <Alga key={i} x={x} y={y} r={r * (foco === 'algas' ? 1 + 0.05 * Math.sin(T * 4 + i) : 1)} brillo={foco === 'algas' ? 1 : 0} />)}
      {CT_DATA.hifAlg.map((d, i) => <path key={i} d={d} stroke={LQ.hifa} strokeWidth={4.5} fill="none" strokeLinecap="round" />)}
    </g>
    {/* azúcar que pasa de las algas a las hifas */}
    {azucar > 0 && CT_DATA.azucar.map(([x0, y0, x1, y1, f], i) => { const u = ((T * 0.55 + f) % 1); return <polygon key={i} points="0,-9 8,-4.5 8,4.5 0,9 -8,4.5 -8,-4.5" transform={`translate(${klerp(x0, x1, u)} ${klerp(y0, y1, u)})`} fill={LQ.azucar} stroke={KC.ink} strokeWidth={2.5} opacity={azucar * Math.sin(Math.PI * u)} />; })}
    {/* córtex superior: hifas muy apretadas */}
    <g opacity={ap(4) * dim('cortex')} transform={`translate(0 ${(1 - ap(4)) * -120})`}>
      <rect x={CT.x0} y={CT.top} width={W} height={CT.alg - CT.top} fill={LQ.cortex2} stroke={KC.ink} strokeWidth={5} rx={12} />
      {CT_DATA.celdas.map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={LQ.cortex} stroke="#8a6326" strokeWidth={2} />)}
    </g>
    {/* resaltado de la capa enfocada */}
    {foco && (() => { const b = { cortex: [CT.top, CT.alg], algas: [CT.alg, CT.med], medula: [CT.med, CT.low] }[foco]; return b ? <rect x={CT.x0 - 10} y={b[0] - 6} width={W + 20} height={b[1] - b[0] + 12} rx={14} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="22 12" strokeDashoffset={-T * 40} /> : null; })()}
    {/* sol que rebota en el córtex */}
    {sol > 0 && <g opacity={sol}>
      <g transform={`translate(880 470) rotate(${T * 20})`}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-70} x2={0} y2={-92} stroke={KC.yellow} strokeWidth={9} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}</g>
      <circle cx={880} cy={470} r={56} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      {[0, 1, 2].map((i) => { const u = ((T * 0.8 + i / 3) % 1); const xs = 800 - i * 130, xe = xs - 120; const hit = [xs - 60, CT.top - 4];
        const p = u < 0.5 ? [klerp(xs, hit[0], u * 2), klerp(520, hit[1], u * 2)] : [klerp(hit[0], xe, (u - 0.5) * 2), klerp(hit[1], 560, (u - 0.5) * 2)];
        return <g key={i}><path d={`M ${xs} 520 L ${hit[0]} ${hit[1]} L ${xe} 560`} stroke={KC.yellow} strokeWidth={4} strokeDasharray="10 10" fill="none" opacity=".6" /><circle cx={p[0]} cy={p[1]} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>; })}
    </g>}
  </g>;
}

// Vista dentro de la lupa: córtex con levaduras en la capa de afuera (Spribille et al. 2016).
function LupaLevaduras(T, r) {
  const g = krng(7), D = r * 2;
  const cel = []; for (let row = 0; row < 6; row++) for (let x = -10 + (row % 2) * 22; x < D + 20; x += 44) cel.push([x + (g() - 0.5) * 6, D * 0.42 + row * 36 + (g() - 0.5) * 4]);
  const lev = Array.from({ length: 9 }, (_, i) => [20 + i * (D - 40) / 8 + (g() - 0.5) * 16, D * 0.42 - 26 + (g() - 0.5) * 14, 11 + g() * 4]);
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#0b1a24" />
    <path d={`M 0 ${D * 0.42 - 44} Q ${D / 2} ${D * 0.42 - 60} ${D} ${D * 0.42 - 44} L ${D} ${D} L 0 ${D} Z`} fill={LQ.cortex2} opacity=".45" />
    {cel.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={21} ry={16} fill={LQ.cortex} stroke="#8a6326" strokeWidth={3} />)}
    {lev.map(([x, y, rr], i) => { const p = 1 + 0.08 * Math.sin(T * 5 + i); return <g key={i}><circle cx={x} cy={y} r={rr * p + 7} fill={LQ.levadura} opacity=".3" /><circle cx={x} cy={y} r={rr * p} fill={LQ.levadura} stroke={KC.ink} strokeWidth={3} /><circle cx={x - rr * 0.3} cy={y - rr * 0.3} r={rr * 0.25} fill="#ffd0e4" /></g>; })}
  </svg>;
}

// Bryoria: liquen que cuelga de las ramas como pelo café.
const BRY = (() => { const g = krng(23); return Array.from({ length: 34 }, (_, i) => { const x = 70 + i * 18 + (g() - 0.5) * 10; return { x, y: 790 + (x / 720) * 30, L: 180 + g() * 170, f: g() * 6, amarillo: i > 19 }; }); })();
function Bryoria({ T, crece = 1 }) {
  return <g>
    <path d="M -20 780 Q 300 770 740 815" stroke={LQ.corteza} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M -20 780 Q 300 770 740 815" stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="30 50" />
    {BRY.map((b, i) => { const L = b.L * kEase.sale(kclamp(crece * 1.4 - i * 0.012, 0, 1)); const sw = Math.sin(T * 1.2 + b.f) * 10;
      return <path key={i} d={`M ${b.x} ${b.y} q ${8 + sw * 0.3} ${L * 0.3} ${-6 + sw * 0.6} ${L * 0.55} t ${sw} ${L * 0.45}`} stroke={b.amarillo ? '#9c8432' : '#3e2b1f'} strokeWidth={4} fill="none" strokeLinecap="round" />; })}
  </g>;
}

// Satélite Foton con la caja BIOPAN arriba (esquemático). tapa 0..1 = abierta.
function Satelite({ T, x, y, s = 1, tapa = 0, para = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {para > 0 && <g opacity={para}><path d="M -170 -300 Q 0 -460 170 -300 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} />{[-160, -60, 60, 160].map((dx, i) => <line key={i} x1={dx} y1={-300} x2={0} y2={-150} stroke={KC.ink} strokeWidth={3} />)}</g>}
    <rect x={-120} y={60} width={240} height={150} rx={16} fill="#c9ced6" stroke={KC.ink} strokeWidth={7} />
    {[-230, 130].map((dx, i) => <g key={i}><rect x={dx} y={95} width={100} height={70} fill="#2346ff" stroke={KC.ink} strokeWidth={5} /><line x1={dx + 50} y1={95} x2={dx + 50} y2={165} stroke="#9ad7ff" strokeWidth={3} /></g>)}
    <circle cx={0} cy={0} r={135} fill="#dfe3ea" stroke={KC.ink} strokeWidth={8} />
    <path d="M -95 -95 Q 0 -150 95 -95" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".7" />
    {/* caja BIOPAN */}
    <rect x={-70} y={-175} width={140} height={50} rx={8} fill="#8a919b" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-28} cy={-160} rx={22} ry={11} fill={LQ.naranja} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={28} cy={-160} rx={22} ry={11} fill={LQ.mapa} stroke={KC.ink} strokeWidth={3} />
    <g transform={`rotate(${-tapa * 110} -70 -175)`}><rect x={-70} y={-190} width={140} height={18} rx={6} fill="#b5bcc6" stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}

function LiquenShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Donde, Ct: CUES.Corte, Cz: CUES.Corteza, Al: CUES.Algas, Me: CUES.Medula, Tr: CUES.Trato, P: CUES.Pregunta, H: CUES.Historia, E: CUES.Estudio, Cn: CUES.Continentes, Es: CUES.Espacio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const SEC = K.Ct + 1.0; // aparece el corte al microscopio
  const foco = T < K.Cz + 0.2 ? null : T < K.Al ? 'cortex' : T < K.Me ? 'algas' : 'medula';
  const zoomCorte = kprog(T, K.Ct - 0.1, K.Ct + 1.2, kEase.suave);
  const regreso = kprog(T, K.Es + 5.0, K.Es + 6.2, kEase.suave);
  const LUGARES = [['piedra', 60], ['tronco', 390], ['barda', 720]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la piedra con manchas */}
      <Escena T={T} a={K.G} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Piedra T={T} crece={kprog(T, K.G + 0.05, K.G + 1.4)} respira={1} />)}
      </Escena>
      {/* 2 · dónde lo ves: piedra, tronco, barda */}
      <Escena T={T} a={K.D} b={K.Ct}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{LUGARES.map(([nom, x], i) => { const e = kprog(T, K.D + 0.1 + i * 0.7, K.D + 0.6 + i * 0.7, kEase.rebote); if (e <= 0) return null;
          return <g key={i} transform={`translate(${x + 150} 900) scale(${e}) translate(${-x - 150} -960) translate(0 -20)`}>
            <clipPath id={`vin${i}`}><rect x={x} y={760} width={300} height={400} rx={28} /></clipPath>
            <g clipPath={`url(#vin${i})`}>
              {i === 0 && <><rect x={x} y={760} width={300} height={400} fill={LQ.roca} /><path d={`M ${x} 900 L ${x + 300} 860 M ${x + 60} 1160 L ${x + 140} 1000`} stroke={LQ.roca2} strokeWidth={6} /></>}
              {i === 1 && <><rect x={x} y={760} width={300} height={400} fill="#7a5233" />{[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${x + 30 + k * 60} 760 q 14 100 -4 200 t 6 200`} stroke="#4f331f" strokeWidth={9} fill="none" />)}</>}
              {i === 2 && <><rect x={x} y={760} width={300} height={400} fill="#d27a5a" />{[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <g key={k}><line x1={x} y1={760 + k * 52} x2={x + 300} y2={760 + k * 52} stroke="#efe4d2" strokeWidth={8} />{[0, 1, 2].map((j) => <line key={j} x1={x + (k % 2 ? 50 : 0) + j * 100} y1={760 + k * 52} x2={x + (k % 2 ? 50 : 0) + j * 100} y2={812 + k * 52} stroke="#efe4d2" strokeWidth={8} />)}</g>)}</>}
              <ManchaLiquen x={x + 110} y={920} r={70} tipo={['naranja', 'gris', 'naranja'][i]} seed={20 + i} crece={kprog(T, K.D + 0.3 + i * 0.7, K.D + 1.1 + i * 0.7)} rot={i * 40} />
              <ManchaLiquen x={x + 200} y={1060} r={52} tipo={['mapa', 'naranja', 'gris'][i]} seed={30 + i} crece={kprog(T, K.D + 0.45 + i * 0.7, K.D + 1.2 + i * 0.7)} />
            </g>
            <rect x={x} y={760} width={300} height={400} rx={28} fill="none" stroke={KC.ink} strokeWidth={9} />
            <rect x={x + 60} y={738} width={180} height={52} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
            <text x={x + 150} y={777} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{nom}</text>
          </g>; })}</>)}
      </Escena>
      {/* 3 · el corte: la cámara baja a una mancha y la corta */}
      <Escena T={T} a={K.Ct} b={SEC}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', inset:0, transformOrigin:'340px 815px', transform:`scale(${klerp(1, 4.2, zoomCorte)})` }}>
          {fsvg(<>
            <Piedra T={T} />
            <path d={`M 250 815 L ${klerp(250, 440, kprog(T, K.Ct + 0.35, K.Ct + 0.85))} 815`} stroke={KC.red} strokeWidth={4} strokeDasharray="10 6" />
            <g transform={`translate(${klerp(240, 445, kprog(T, K.Ct + 0.35, K.Ct + 0.85))} 815)`} opacity={kprog(T, K.Ct + 0.2, K.Ct + 0.35)}>
              <path d="M 0 0 L -16 -50 L 10 -50 Z" fill="#e6e9ee" stroke={KC.ink} strokeWidth={3} /><rect x={-10} y={-100} width={18} height={52} rx={5} fill={KC.ink} />
            </g>
          </>)}
        </div>
      </Escena>
      {/* 4–6 · por dentro: córtex, algas, médula (fondo oscuro) */}
      <Escena T={T} a={SEC} b={K.Tr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<CorteTalo T={T} at={SEC} foco={foco} azucar={kprog(T, K.Al + 1.6, K.Al + 2.2) * (1 - kprog(T, K.Me + 0.3, K.Me + 0.8))} sol={kprog(T, K.Cz + 0.8, K.Cz + 1.3) * (1 - kprog(T, K.Al - 0.3, K.Al + 0.2))} />)}
      </Escena>
      {/* 7 · el trato: el hongo pone la casa, el socio la comida */}
      <Escena T={T} a={K.Tr} b={K.P} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const c = kprog(T, K.Tr + 0.1, K.Tr + 0.9, kEase.sale); return <g>
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${290 - k * 6} ${800 + k * 10} Q ${420} ${640 + k * 12} 540 ${560 + k * 14} Q 660 ${640 + k * 12} ${790 + k * 6} ${800 + k * 10}`} stroke={LQ.hifa} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${c * 700} 900`} />)}
            {[0, 1, 2].map((k) => <path key={'w' + k} d={`M ${330 + k * 10} 820 q ${-20} 80 0 160 t 0 150`} stroke={LQ.hifa} strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray={`${c * 330} 400`} />)}
            {[0, 1, 2].map((k) => <path key={'e' + k} d={`M ${750 - k * 10} 820 q 20 80 0 160 t 0 150`} stroke={LQ.hifa} strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray={`${c * 330} 400`} />)}
            <path d="M 300 1130 Q 540 1110 780 1130" stroke={LQ.hifa} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${c * 520} 600`} />
          </g>; })()}
          <Alga x={540} y={950} r={110 * kprog(T, K.Tr + 0.4, K.Tr + 0.9, kEase.rebote)} brillo={0.6} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Tr) * 0.7 + i / 6) % 1; if (T < K.Tr + 1.0) return null; const ang = (i / 6) * Math.PI * 2;
            return <polygon key={i} points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" transform={`translate(${540 + Math.cos(ang) * (90 + u * 150)} ${950 + Math.sin(ang) * (90 + u * 110)})`} fill={LQ.azucar} stroke={KC.ink} strokeWidth={4} opacity={Math.sin(Math.PI * u)} />; })}
        </>)}
      </Escena>
      {/* 8 · pregunta */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 9 · Schwendener, 1867 */}
      <Escena T={T} a={K.H} b={K.E}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g>
          {(() => { const e = (k) => kprog(T, K.H + 1.2 + k * 0.35, K.H + 1.6 + k * 0.35, kEase.rebote); return <g>
            <g transform={`translate(200 930) scale(${e(0)})`}><circle r={78} fill="#5a3d26" stroke={KC.ink} strokeWidth={6} />{[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M -60 ${-40 + k * 20} q 30 -25 60 0 t 60 0`} stroke={LQ.hifa} strokeWidth={6} fill="none" />)}</g>
            <text x={330} y={955} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={e(1)}>+</text>
            <g transform={`translate(450 930) scale(${e(1)})`}><Alga x={0} y={0} r={70} /></g>
            <text x={590} y={955} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={e(2)}>=</text>
            <ManchaLiquen x={790} y={930} r={110} tipo="naranja" seed={4} crece={e(2)} />
          </g>; })()}
          <text x={200} y={1060} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.H + 1.4, K.H + 1.7)}>hongo</text>
          <text x={450} y={1060} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.H + 1.75, K.H + 2.05)}>alga</text>
          <text x={790} y={1080} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.H + 2.1, K.H + 2.4)}>liquen</text>
        </g>)}
      </Escena>
      {/* 10 · el estudio de 2016: levaduras en la piel de Bryoria (Montana) */}
      <Escena T={T} a={K.E} b={K.Cn}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Bryoria T={T} crece={kprog(T, K.E + 0.2, K.E + 1.6)} />)}
      </Escena>
      {/* 11 · seis continentes */}
      <Escena T={T} a={K.Cn} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <circle cx={540} cy={900} r={175} fill="#7fd3ff" stroke={KC.ink} strokeWidth={8} />
          {[-0.6, -0.3, 0, 0.3, 0.6].map((k, i) => <ellipse key={i} cx={540} cy={900} rx={175 * Math.abs(Math.cos(T * 0.6 + k * 2))} ry={175} fill="none" stroke="#2b7fb5" strokeWidth={3} />)}
          {[-120, -60, 0, 60, 120].map((dy, i) => <line key={'l' + i} x1={540 - Math.sqrt(175 * 175 - dy * dy)} y1={900 + dy} x2={540 + Math.sqrt(175 * 175 - dy * dy)} y2={900 + dy} stroke="#2b7fb5" strokeWidth={3} />)}
          {Array.from({ length: 6 }, (_, i) => { const e = kprog(T, K.Cn + 0.3 + i * 0.3, K.Cn + 0.7 + i * 0.3, kEase.rebote); if (e <= 0) return null; const a = -Math.PI / 2 + (i - 0.5) * (Math.PI * 2 / 6) + Math.PI / 6;
            const bx = 540 + Math.cos(a) * 265, by = 900 + Math.sin(a) * 245;
            return <g key={i} transform={`translate(${bx} ${by}) scale(${e})`}>
              <line x1={0} y1={0} x2={-Math.cos(a) * 80} y2={-Math.sin(a) * 70} stroke={KC.ink} strokeWidth={4} strokeDasharray="8 6" />
              <circle r={58} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <ManchaLiquen x={0} y={4} r={36} tipo={['naranja', 'gris', 'mapa'][i % 3]} seed={40 + i} />
              <circle cx={24} cy={-26} r={13} fill={LQ.levadura} stroke={KC.ink} strokeWidth={3} />
              {T > K.Cn + 3.0 && <text x={40} y={-36} style={{ font:`400 ${40 * kprog(T, K.Cn + 3.0 + i * 0.1, K.Cn + 3.4 + i * 0.1, kEase.rebote)}px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={2}>?</text>}
            </g>; })}
        </>)}
      </Escena>
      {/* 12 · en el espacio: ≈ 15 días expuestos por fuera de un satélite */}
      <Escena T={T} a={K.Es} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {Array.from({ length: 60 }, (_, i) => { const g = krng(100 + i); const x = g() * KW, y = g() * 1300; return <circle key={i} cx={x} cy={y} r={1.5 + g() * 3} fill="#fff" opacity={0.4 + 0.6 * Math.abs(Math.sin(T * 1.5 + i))} />; })}
          <circle cx={540} cy={2350 - regreso * 500} r={1250} fill="#2a6fd6" stroke={KC.ink} strokeWidth={8} />
          <path d={`M -100 ${1180 - regreso * 500} Q 200 ${1130 - regreso * 500} 420 ${1170 - regreso * 500} Q 700 ${1210 - regreso * 500} 1180 ${1150 - regreso * 500}`} stroke={KC.leaf} strokeWidth={40} fill="none" opacity=".8" />
          {T < K.Es + 5.0 && Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.9 + i / 7) % 1); const x0 = 60 + i * 70, y0 = 300; const x1 = 380 + i * 12, y1 = 600;
            return <line key={i} x1={klerp(x0, x1, u)} y1={klerp(y0, y1, u)} x2={klerp(x0, x1, Math.min(1, u + 0.12))} y2={klerp(y0, y1, Math.min(1, u + 0.12))} stroke={KC.lilac} strokeWidth={7} strokeLinecap="round" opacity={kprog(T, K.Es + 0.6, K.Es + 1.0) * (1 - kprog(T, K.Es + 4.6, K.Es + 5.0))} />; })}
          <g opacity={1 - kprog(T, K.Es + 6.0, K.Es + 6.4)}>
            <Satelite T={T} x={klerp(430, 300, regreso) + Math.sin(T * 0.8) * 6} y={klerp(800, 1150, regreso)} s={klerp(1, 0.5, regreso)} tapa={kprog(T, K.Es + 0.4, K.Es + 1.0) * (1 - kprog(T, K.Es + 4.6, K.Es + 5.0))} para={kprog(T, K.Es + 5.2, K.Es + 5.6)} />
          </g>
          {T > K.Es + 6.0 && (() => { const a = kprog(T, K.Es + 6.2, K.Es + 7.0, kEase.sale), b = kprog(T, K.Es + 6.8, K.Es + 7.6, kEase.sale); return <g>
            <rect x={200} y={700} width={700} height={430} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Es + 6.0, K.Es + 6.3)} />
            <text x={550} y={770} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Es + 6.0, K.Es + 6.3)}>fotosíntesis</text>
            <rect x={300} y={1050 - 230 * a} width={180} height={230 * a} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
            <rect x={620} y={1050 - 222 * b} width={180} height={222 * b} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
            <line x1={260} y1={1050} x2={840} y2={1050} stroke={KC.ink} strokeWidth={6} />
            <text x={390} y={1100} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>antes</text>
            <text x={710} y={1100} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>después</text>
            <text x={550} y={900} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Es + 7.6, K.Es + 7.9)}>≈</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma piedra, ahora es un equipo (y dos aguantaron el espacio) */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Piedra T={T} casco={kprog(T, K.C + 2.6, K.C + 3.2, kEase.sale)} respira={1} />
          <Cohete T={T} x={klerp(1160, 900, kprog(T, K.C + 3.0, K.C + 3.8, kEase.sale))} y={klerp(700, 760, kprog(T, K.C + 3.0, K.C + 3.8, kEase.sale))} s={0.9} rot={35} />
          {[['hongo', 120, 0], ['alga', 280, 1], ['¿levadura?', 450, 2]].map(([t, x, i]) => { const e = kprog(T, K.C + 0.6 + i * 0.35, K.C + 1.0 + i * 0.35, kEase.rebote); if (e <= 0) return null;
            return <g key={i} transform={`translate(${x} 580) scale(${e})`} opacity={i === 2 ? 0.5 : 1}>
              <circle r={56} fill={KC.paper} stroke={KC.ink} strokeWidth={6} strokeDasharray={i === 2 ? '10 8' : 'none'} />
              {i === 0 && [0, 1, 2].map((k) => <path key={k} d={`M -36 ${-16 + k * 16} q 18 -14 36 0 t 36 0`} stroke="#8a6326" strokeWidth={6} fill="none" strokeLinecap="round" />)}
              {i === 1 && <Alga x={0} y={0} r={34} />}
              {i === 2 && <><circle r={22} fill={LQ.levadura} stroke={KC.ink} strokeWidth={3} /><text x={0} y={-48} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>¿?</text></>}
              <text x={0} y={92} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{t}</text>
            </g>; })}
          {[0, 1].map((i) => <text key={i} x={190 + i * 160} y={590} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.C + 0.9 + i * 0.35, K.C + 1.2 + i * 0.35)}>+</text>)}
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 2.2} until={K.G + 3.1} texto="¿planta?" x={300} y={470} tam={50} />
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 2.6} until={K.G + 3.1} texto="¿musgo?" x={300} y={600} tam={50} />
      <Chip T={T} at={K.G + 3.2} until={K.D - 0.2} texto="hongo + socio" x={300} y={520} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.D + 0.2} until={K.Ct - 0.2} texto="liquen" x={300} y={470} tam={52} borde={KC.ink} />
      <Chip T={T} at={K.Ct + 0.2} until={SEC - 0.1} texto="lo cortamos" x={540} y={430} tam={40} borde={KC.red} />
      <Chip T={T} at={SEC + 0.3} until={K.Al + 0.6} texto="corte de un liquen (al microscopio)" x={540} y={430} tam={32} borde={KC.cyan} />
      <Etq T={T} at={SEC + 0.9} until={K.Tr - 0.3} x={322} y={(CT.top + CT.alg) / 2} lado="izq" texto="córtex" tam={30} color={foco === 'cortex' ? KC.yellow : KC.texto} />
      <Etq T={T} at={SEC + 1.0} until={K.Tr - 0.3} x={322} y={(CT.alg + CT.med) / 2} lado="izq" texto="algas" tam={30} color={foco === 'algas' ? KC.yellow : KC.texto} />
      <Etq T={T} at={SEC + 1.1} until={K.Tr - 0.3} x={322} y={(CT.med + CT.low) / 2} lado="izq" texto="médula" tam={30} color={foco === 'medula' ? KC.yellow : KC.texto} />
      <Etq T={T} at={SEC + 1.2} until={K.Tr - 0.3} x={322} y={CT.riz + 30} lado="izq" texto="piedra" tam={26} />
      <Chip T={T} at={K.Cz + 0.4} until={K.Al - 0.2} texto="hilos del hongo, apretados" x={360} y={560} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.Al + 0.4} until={K.Me - 0.2} texto="algas o cianobacterias" x={350} y={500} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Al + 1.9} until={K.Me - 0.2} texto="fotosíntesis → azúcar" x={350} y={585} tam={30} borde={LQ.azucar} />
      <Chip T={T} at={K.Me + 0.4} until={K.Tr - 0.3} texto="hilos sueltos del hongo" x={360} y={560} tam={30} borde={LQ.hifa} />
      <Chip T={T} at={K.Tr + 0.6} until={K.P - 0.2} texto="el hongo pone la casa" x={540} y={400} tam={40} borde={LQ.hifa} />
      <Chip T={T} at={K.Tr + 1.2} until={K.P - 0.2} texto="el socio, la comida" x={540} y={485} tam={40} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.H + 0.2} until={K.E - 0.3} anio="1867" quien="Simon Schwendener" revista="propuso: el liquen son dos seres" x={370} y={540} />
      <Chip T={T} at={K.H + 2.8} until={K.E - 0.3} texto="¡no!" x={860} y={745} tam={46} fondo={KC.paper} color={KC.ink} borde={KC.ink} />
      <Chip T={T} at={K.H + 3.2} until={K.E - 0.3} texto="¿dos seres?" x={250} y={745} tam={40} fondo={KC.paper} color={KC.ink} borde={KC.ink} />
      <Chip T={T} at={K.H + 3.6} until={K.E - 0.3} texto="¿un hongo?" x={560} y={745} tam={40} fondo={KC.paper} color={KC.ink} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.0} anio="2016" quien="Montana, EUA" revista="Spribille et al., Science" x={540} y={470} />
      <Etq T={T} at={K.E + 0.9} until={K.Cn - 0.3} x={40} y={720} texto="Bryoria" it tam={36} color={KC.ink} />
      <Lupa T={T} at={K.E + 2.0} until={K.Cn - 0.3} x={760} y={880} r={190} fx={430} fy={960} interior={LupaLevaduras} tinte={LQ.levadura} etiqueta="levaduras en la piel" />
      <NumeroGigante T={T} at={K.Cn + 0.3} until={K.Cn + 2.9} valor={6} dur={1.8} etiqueta="continentes" x={300} y={470} tam={200} color={KC.yellow} />
      <Chip T={T} at={K.Cn + 3.0} until={K.Es - 0.2} texto="¿qué hacen ahí? aún se estudia" x={420} y={470} tam={34} borde={LQ.levadura} />
      <Chip T={T} at={K.Es + 0.6} until={K.Es + 5.0} texto="expuestos al espacio" x={330} y={430} tam={36} borde={KC.lilac} />
      <Contador T={T} at={K.Es + 1.0} hasta={14.6} dur={3.4} dec={1} sufijo=" días" x={330} y={530} tam={64} color={KC.yellow} />
      <Etq T={T} at={K.Es + 1.8} until={K.Es + 5.0} x={520} y={600} texto="Xanthoria elegans" it tam={28} color={LQ.naranja} />
      <Etq T={T} at={K.Es + 2.3} until={K.Es + 5.0} x={520} y={660} texto="Rhizocarpon geographicum" it tam={26} color={LQ.mapa} />
      <Chip T={T} at={K.Es + 5.2} until={K.Es + 6.4} texto="de regreso a la Tierra" x={540} y={470} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Es + 7.8} until={K.C - 0.2} texto="casi igual" x={550} y={1190} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.9} until={K.Ou} texto="es un equipo" x={300} y={440} tam={46} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.D} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.D} until={K.Ct} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.Ct} until={SEC} texto="1 cm" largo={150} />
      <BarraEscala T={T} at={SEC} until={K.Tr} texto="50 µm" largo={170} />
      <BarraEscala T={T} at={K.Tr} until={K.P} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.E} until={K.E + 2.0} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.E + 2.0} until={K.Cn} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="No es planta: *es un hongo con un socio.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.Ct - 0.1} texto="Es un *liquen*: piedras, troncos, bardas." />
      <Subtitulo T={T} idx={2} at={K.Ct + 0.1} until={K.Cz - 0.1} texto="Al microscopio, *tiene pisos.*" />
      <Subtitulo T={T} idx={3} at={K.Cz + 0.1} until={K.Al - 0.1} texto="Arriba: *piel del hongo* contra el sol." />
      <Subtitulo T={T} idx={4} at={K.Al + 0.1} until={K.Me - 0.1} texto="Debajo: *algas* que dan azúcar." />
      <Subtitulo T={T} idx={5} at={K.Me + 0.1} until={K.Tr - 0.1} texto="Abajo, hilos sueltos: *la médula.*" />
      <Subtitulo T={T} idx={6} at={K.Tr + 0.1} until={K.P - 0.1} texto="Hongo: *casa.* Socio: *comida.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.H - 0.1} texto="¿Y si hubiera *alguien más?*" />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.E - 0.1} texto="1867, Schwendener: *muchos no le creyeron.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Cn - 0.1} texto="2016, Montana: *levaduras en la piel.*" />
      <Subtitulo T={T} idx={10} at={K.Cn + 0.1} until={K.Es - 0.1} texto="Seis continentes. *¿Qué hacen ahí?*" />
      <Subtitulo T={T} idx={11} at={K.Es + 0.1} until={K.C - 0.1} texto="≈15 días en el espacio: *fotosíntesis casi igual.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es una planta: *es un equipo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.D + 0.4, K.Ct - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Al + 0.8, K.Me - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.H + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.H + 2.4, K.E - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cn + 0.4, K.Es - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Es + 5.1, K.Es + 8.9, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="19" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LiquenApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LiquenShot /></CompositionStage></div>;
}
window.LiquenApp = LiquenApp;
