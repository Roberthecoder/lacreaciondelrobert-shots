// Shot Químico #48 · Ese buche de agua se lleva tu flúor (cómo el flúor rehace tu esmalte) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const ORO = '#F4C25A', PIEL = '#f1b48f', LABIO = '#e0646f', BACT = '#9b5de5', CAFE = '#7a4a22', ESMALTE = '#efe9da';

// Ion fluoruro: chispita dorada con "F".
function IonF({ x, y, r = 18, o = 1, T = 0, ph = 0 }) {
  if (o <= 0) return null;
  const g = 1 + 0.12 * Math.sin(T * 8 + ph);
  return <g transform={`translate(${x} ${y}) scale(${g})`} opacity={o}>
    <circle r={r * 1.6} fill={ORO} opacity={0.25} />
    <circle r={r} fill={ORO} stroke={KC.ink} strokeWidth={4} />
    <text y={r * 0.38} textAnchor="middle" style={{ font:`700 ${r * 1.1}px ${KF.mono}` }} fill={KC.ink}>F</text>
  </g>;
}
// Barra de escala fija (texto ya verificado: lo dibujado y la escala coinciden).
function EscalaFija({ T, at, until, texto, largo, x = 60, y = 1440 }) {
  if (T < at || T > until) return null;
  const o = kprog(T, at, at + 0.3) * (1 - kprog(T, until - 0.3, until));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, opacity:o, color:KC.texto, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    <div style={{ width:largo, height:8, background:KC.texto, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}
// Cara de frente con la boca abierta. espuma 0..1, brillo 0..1 (flúor que se queda), manchas 0..1 (café), lineas 0..1 (fluorosis).
function Cara({ T, x, y, s = 1, espuma = 0, brillo = 0, manchas = 0 }) {
  const dientes = [-150, -90, -30, 30, 90, 150];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-40} rx={420} ry={330} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -50 -300 Q 0 -250 50 -300" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={-200} cy={-120} rx={60} ry={34} fill="#ec8f86" opacity={0.6} />
    <ellipse cx={200} cy={-120} rx={60} ry={34} fill="#ec8f86" opacity={0.6} />
    <path d="M -260 -10 Q 0 -150 260 -10 Q 0 230 -260 -10 Z" fill={LABIO} stroke={KC.ink} strokeWidth={10} />
    <path d="M -215 -10 Q 0 -110 215 -10 Q 0 170 -215 -10 Z" fill="#5a1520" />
    <ellipse cx={0} cy={70} rx={130} ry={50} fill="#e46a7a" />
    {dientes.map((dx, i) => { const yt = -78 + Math.abs(dx) * 0.22; return <g key={'s' + i}>
      <rect x={dx - 27} y={yt} width={54} height={62} rx={10} fill={mixHex(ESMALTE, '#ffffff', 0.5)} stroke={KC.ink} strokeWidth={5} />
      {manchas > 0 && <path d={`M ${dx - 20} ${yt + 30} q 12 -14 26 -2 q 10 10 -4 22 q -18 6 -22 -20 Z`} fill={CAFE} opacity={manchas * (0.6 + (i % 3) * 0.15)} />}
    </g>; })}
    {dientes.slice(1, 5).map((dx, i) => <g key={'i' + i}>
      <rect x={dx - 25} y={52 - Math.abs(dx) * 0.15} width={50} height={46} rx={9} fill={mixHex(ESMALTE, '#ffffff', 0.5)} stroke={KC.ink} strokeWidth={5} />
      {manchas > 0 && <ellipse cx={dx} cy={72} rx={14} ry={10} fill={CAFE} opacity={manchas * 0.7} />}
    </g>)}
    {espuma > 0 && Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2, rr = 120 + (i % 4) * 30;
      return <circle key={'e' + i} cx={Math.cos(a) * rr * 1.2 + Math.sin(T * 3 + i) * 5} cy={Math.sin(a) * rr * 0.45 + 10} r={(12 + (i % 5) * 5) * espuma} fill="rgba(255,255,255,.92)" stroke="#9fc3d8" strokeWidth={3} />; })}
    {brillo > 0 && dientes.map((dx, i) => <IonF key={'f' + i} T={T} ph={i} x={dx + 8} y={-60 + Math.abs(dx) * 0.22} r={11} o={brillo} />)}
  </g>;
}
// Vaso de agua que se inclina (x, y = centro de la base).
function VasoAgua({ x, y, s = 1, inclina = 0, nivel = 0.7 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d={`M -70 ${-220 * nivel} L -62 0 L 62 0 L 70 ${-220 * nivel} Z`} fill="#8fd3ff" opacity={0.85} />
    <path d="M -80 -220 L -62 0 L 62 0 L 80 -220" fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -54 -190 L -46 -30" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
  </g>;
}
function Lavabo({ x, y }) {
  return <g>
    <ellipse cx={x} cy={y} rx={360} ry={64} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={x} cy={y + 6} rx={300} ry={44} fill="#d9e6ee" />
    <ellipse cx={x} cy={y + 14} rx={30} ry={10} fill="#5b6672" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Muela (x, y = centro de la corona).
function Muela({ x, y, s = 1, lineas = 0, color = '#ffffff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -100 Q -170 -170 -100 -180 Q -50 -190 -30 -155 Q 0 -190 30 -155 Q 50 -190 100 -180 Q 170 -170 150 -100 L 140 60 Q 130 120 90 120 L 70 280 Q 60 310 35 290 L 10 140 L -10 140 L -35 290 Q -60 310 -70 280 L -90 120 Q -130 120 -140 60 Z"
      fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -144 40 Q 0 70 144 40" stroke="#c9c2b2" strokeWidth={5} fill="none" />
    <path d="M -110 -130 Q -90 -150 -60 -140" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.8} fill="none" />
    {lineas > 0 && [-60, -20, 20, 60].map((dy, i) => <path key={i} d={`M -120 ${dy - 40} q 30 -10 60 0 t 60 0 t 60 0 t 60 0`} stroke="#ffffff" strokeWidth={7} fill="none" opacity={lineas * 0.95} strokeDasharray="18 8" />)}
  </g>;
}
// Prismas del esmalte (dentro de la Lupa): varillas con cristalitos finos.
function Prismas({ T, r }) {
  const w = 60, cols = Math.ceil((2 * r) / w) + 1;
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#16202e" />
    {Array.from({ length: cols }, (_, c) => { const x0 = c * w - 10, osc = Math.sin(T * 1.5 + c) * 3;
      return <g key={c}>
        <rect x={x0 + 4 + osc} y={-10} width={w - 10} height={2 * r + 20} rx={22} fill={c % 2 ? '#e9e2cf' : '#ddd5bf'} stroke={KC.ink} strokeWidth={4} />
        {Array.from({ length: 16 }, (_, k) => <line key={k} x1={x0 + 10 + osc} x2={x0 + w - 12 + osc} y1={k * 30 + 8} y2={k * 30 + 18} stroke="#a89f88" strokeWidth={2.5} />)}
      </g>; })}
    <line x1={r - 30} x2={r + 30} y1={2 * r - 70} y2={2 * r - 70} stroke={ORO} strokeWidth={8} strokeLinecap="round" />
    <text x={r} y={2 * r - 86} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={ORO}>≈ 5 µm</text>
  </svg>;
}
// Red de cristalitos (hexágonos) del esmalte, vista esquemática.
const HEX = Array.from({ length: 3 * 11 }, (_, i) => { const r = Math.floor(i / 11), c = i % 11; return { r, c, x: 40 + c * 96 + (r % 2) * 48, y: 1000 + r * 84 }; });
const ZONA = (h) => (h.r === 0 && h.c >= 3 && h.c <= 7) || (h.r === 1 && h.c >= 4 && h.c <= 6);
function hexPath(x, y, R) { return Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${k ? 'L' : 'M'} ${x + R * Math.cos(a)} ${y + R * Math.sin(a)}`; }).join(' ') + ' Z'; }
function Bichito({ x, y, s = 1, T, ph = 0 }) {
  const w = Math.sin(T * 5 + ph) * 6;
  return <g transform={`translate(${x} ${y + w}) scale(${s})`}>
    <ellipse rx={62} ry={44} fill={BACT} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-18} cy={-8} r={9} fill="#fff" /><circle cx={18} cy={-8} r={9} fill="#fff" />
    <circle cx={-16} cy={-6} r={4} fill={KC.ink} /><circle cx={20} cy={-6} r={4} fill={KC.ink} />
    <path d="M -14 16 Q 0 26 14 16" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
function Medidor({ x, y, acido }) {
  const h = 320, nivel = klerp(0.85, 0.3, acido), c = mixHex('#2fe0a8', '#ff3b2f', acido);
  return <g>
    <rect x={x - 30} y={y} width={60} height={h} rx={30} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={5} />
    <rect x={x - 20} y={y + h * (1 - nivel)} width={40} height={h * nivel - 10} rx={20} fill={c} />
    <text x={x} y={y - 18} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>pH</text>
    <text x={x - 44} y={y + 30} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill="#2fe0a8">neutro</text>
    <text x={x - 44} y={y + h - 10} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill="#ff6b5a">ácido</text>
  </g>;
}
function Cepillo({ x, y, s = 1, pasta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-14} width={360} height={28} rx={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <rect x={40} y={-26} width={180} height={40} rx={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={52 + i * 20} y={-74} width={12} height={50} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}
    {pasta === 'arroz' && <ellipse cx={130} cy={-80} rx={20} ry={8} fill="#fff" stroke="#3aa0d8" strokeWidth={4} />}
    {pasta === 'chicharo' && <circle cx={130} cy={-98} r={26} fill="#fff" stroke="#3aa0d8" strokeWidth={5} />}
  </g>;
}

function Fluor() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Esmalte, A: CUES.Acido, F: CUES.Fluor, C: CUES.Cristal, P: CUES.Pregunta, M: CUES.Manchas, Es: CUES.Estudio, R: CUES.Resultado, N: CUES.Ninos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mitadM = K.M + 5.3, mitadN = K.N + 2.6, mitadR = K.R + 2.2;
  // gancho: el vaso se inclina desde el cuadro 0, el buche se lleva la espuma y el flúor al desagüe
  const inclina = kprog(T, K.G, K.G + 0.4, kEase.sale) * (1 - kprog(T, K.G + 2.0, K.G + 2.4));
  const buche = kprog(T, K.G + 1.6, K.G + 2.0) * (1 - kprog(T, K.G + 4.4, K.G + 4.9));
  const espumaG = 1 - kprog(T, K.G + 1.8, K.G + 3.2);
  // acido / fluor
  const acido = kprog(T, K.A + 1.6, K.A + 3.6) * (1 - kprog(T, K.F + 0.6, K.F + 2.6));
  const disuelve = kprog(T, K.A + 2.0, K.A + 4.6);
  const rehace = kprog(T, K.F + 1.4, K.F + 3.8);
  const RR = krng(11);
  const sueltos = Array.from({ length: 14 }, (_, i) => ({ x: 340 + RR() * 420, y: 980 + RR() * 60, dy: 180 + RR() * 260, ca: i % 2 === 0, ph: RR() * 6 }));
  // cristal
  const saleOH = kprog(T, K.C + 0.9, K.C + 1.8, kEase.suave), entraF = kprog(T, K.C + 1.4, K.C + 2.4, kEase.sale);
  const gota = kprog(T, K.C + 3.0, K.C + 3.5), rebota = kprog(T, K.C + 3.5, K.C + 4.4, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el buche de agua */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Lavabo x={540} y={1200} />
          <Cara T={T} x={540} y={860} s={0.95} espuma={espumaG} brillo={1 - kprog(T, K.G + 1.8, K.G + 2.6)} />
          <Chorro T={T} x0={300} y0={700} x1={420} y1={860} color="#8fd3ff" o={inclina} />
          <VasoAgua x={230} y={760} s={0.9} inclina={klerp(0, 75, inclina)} nivel={klerp(0.75, 0.25, kprog(T, K.G, K.G + 2.0))} />
          <Chorro T={T} x0={560} y0={960} x1={540} y1={1200} color="rgba(220,240,255,.95)" o={buche} ancho={22} />
          {Array.from({ length: 10 }, (_, i) => { const t0 = K.G + 1.9 + i * 0.22, p = kprog(T, t0, t0 + 0.9);
            return p > 0 && p < 1 ? <IonF key={i} T={T} ph={i} x={555 - p * 15 + Math.sin(i * 2) * 12} y={klerp(950, 1205, p)} r={14} o={1 - p * 0.4} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 1 · el esmalte: prismas de cristalitos */}
      <Escena T={T} a={K.E} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Muela x={280} y={960} s={0.85} /></SvgCapa>
        <Lupa T={T} at={K.E + 0.3} until={K.A - 0.2} x={700} y={800} r={230} fx={300} fy={830} interior={(t, r) => <Prismas T={t} r={r} />} tinte={KC.gold2} etiqueta="prismas de cristalitos" />
      </Escena>
      {/* 2–3 · ácido y flúor en la red de cristalitos */}
      <Escena T={T} a={K.A} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Ambiente T={T} n={30} />
          {HEX.map((h, i) => { const z = ZONA(h), op = z ? 1 - disuelve * 0.75 + rehace * 0.75 : 1;
            return <g key={i}>
              <path d={hexPath(h.x, h.y, 52)} fill={ESMALTE} opacity={op} stroke={z && rehace > 0 ? ORO : '#8f8a7c'} strokeWidth={z && rehace > 0 ? 7 : 4} strokeDasharray={z && disuelve > 0.5 && rehace < 0.5 ? '10 8' : 'none'} />
              <circle cx={h.x - 14} cy={h.y - 8} r={8} fill={QA.Ca} stroke={KC.ink} strokeWidth={2} opacity={op} />
              <circle cx={h.x + 14} cy={h.y + 10} r={8} fill={KC.orange} stroke={KC.ink} strokeWidth={2} opacity={op} />
            </g>; })}
          {/* azúcar y bacterias */}
          <rect x={150} y={600} width={70 * (1 - kprog(T, K.A + 0.3, K.A + 1.5))} height={70 * (1 - kprog(T, K.A + 0.3, K.A + 1.5))} fill="#fff" stroke={KC.ink} strokeWidth={5} />
          {[[260, 660, 0], [520, 620, 2], [760, 680, 4]].map(([x, y, ph], i) => <Bichito key={i} T={T} x={x} y={y} ph={ph} s={1} />)}
          {T > K.A + 1.5 && T < K.F + 0.8 && Array.from({ length: 12 }, (_, i) => { const per = 1.2, t0 = K.A + 1.5 + (i % 4) * 0.3 + Math.floor(i / 4) * per, p = kprog(T, t0, t0 + 1.0);
            const x = [300, 520, 740][i % 3] + (i % 2) * 30; return p > 0 && p < 1 ? <g key={i} opacity={1 - p * 0.3}><circle cx={x} cy={klerp(720, 950, p)} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
              <text x={x} y={klerp(720, 950, p) + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">H⁺</text></g> : null; })}
          {/* minerales que se van y regresan */}
          {sueltos.map((s, i) => { const v = disuelve * (1 - rehace); if (v <= 0.02) return null;
            return <g key={i} transform={`translate(${s.x + Math.sin(T * 2 + s.ph) * 10} ${s.y - s.dy * v})`} opacity={Math.min(1, v * 2)}>
              <circle r={14} fill={s.ca ? QA.Ca : KC.orange} stroke={KC.ink} strokeWidth={3} />
              <text y={6} textAnchor="middle" style={{ font:`700 15px ${KF.mono}` }} fill={KC.ink}>{s.ca ? 'Ca' : 'PO₄'}</text></g>; })}
          {/* el flúor llega en la saliva */}
          {T > K.F && Array.from({ length: 12 }, (_, i) => { const t0 = K.F + 0.2 + i * 0.12, p = kprog(T, t0, t0 + 1.6, kEase.suave), hz = HEX.filter(ZONA)[i % 8];
            return p > 0 ? <IonF key={i} T={T} ph={i} x={klerp(120 + i * 75, hz.x, p)} y={klerp(420, hz.y - 40, p)} r={16} /> : null; })}
          <Medidor x={990} y={420} acido={acido} />
        </SvgCapa>
      </Escena>
      {/* 4 · el cristal mete flúor donde había hidroxilo */}
      <Escena T={T} a={K.C} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Ambiente T={T} n={24} />
          <path d={hexPath(540, 900, 300)} fill="rgba(239,233,218,.12)" stroke={entraF > 0.9 ? ORO : ESMALTE} strokeWidth={10} />
          {Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return <Atomo key={k} x={540 + 300 * Math.cos(a)} y={900 + 300 * Math.sin(a)} r={40} color={QA.Ca} letra="Ca" tam={30} />; })}
          {[0, 2, 4].map((k) => { const a = k * Math.PI / 3, x = 540 + 170 * Math.cos(a), y = 900 + 170 * Math.sin(a);
            return <g key={k}><Atomo x={x} y={y} r={44} color={KC.orange} letra="PO₄" tam={24} /></g>; })}
          {saleOH < 1 && <g transform={`translate(${540 + saleOH * 380} ${900 - saleOH * 300})`} opacity={1 - saleOH}><Atomo x={-14} y={0} r={36} color={QA.O} letra="O" tam={30} /><Atomo x={30} y={-22} r={22} color={QA.H} letra="H" tam={22} /></g>}
          {entraF > 0 && <IonF T={T} x={klerp(160, 540, entraF)} y={klerp(500, 900, entraF)} r={38} />}
          {gota > 0 && <g transform={`translate(${540} ${rebota > 0 ? klerp(560, 420, rebota) : klerp(380, 560, gota)})`} opacity={1 - rebota}><circle r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <text y={10} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#fff">H⁺</text></g>}
          <Onomato T={T} at={K.C + 3.5} until={K.C + 4.7} x={300} y={540} texto="¡tink!" color={ORO} tam={80} />
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 6 · 1901: Colorado Springs, manchas color chocolate */}
      <Escena T={T} a={K.M} b={mitadM}>
        <div style={{ position:'absolute', inset:0, background:'#d8c39a' }}></div>
        <SvgCapa>
          <Cara T={T} x={540} y={860} s={0.95} manchas={kprog(T, K.M + 0.8, K.M + 2.2)} />
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.12)" />
        </SvgCapa>
      </Escena>
      {/* 6b · 30 años después: flúor natural en el agua */}
      <Escena T={T} a={mitadM} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {[[160, 1000, 260], [460, 1000, 360], [820, 1000, 300]].map(([x, y, h], i) => <g key={i}>
            <path d={`M ${x - h * 0.9} ${y} L ${x} ${y - h} L ${x + h * 0.9} ${y} Z`} fill="#8a8f99" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <path d={`M ${x - h * 0.25} ${y - h * 0.72} L ${x} ${y - h} L ${x + h * 0.25} ${y - h * 0.72} Q ${x} ${y - h * 0.62} ${x - h * 0.25} ${y - h * 0.72} Z`} fill="#fff" /></g>)}
          <rect x={0} y={1000} width={KW} height={260} fill="#7fc36a" stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(540 1220) scale(${klerp(0.6, 1.4, kprog(T, mitadM, mitadM + 0.8, kEase.sale))})`}>
            <VasoAgua x={0} y={0} s={1} nivel={0.8} />
            {Array.from({ length: 9 }, (_, i) => <IonF key={i} T={T} ph={i} x={-44 + (i % 3) * 44} y={-40 - Math.floor(i / 3) * 50 + Math.sin(T * 2 + i) * 6} r={13} />)}
          </g>
        </SvgCapa>
      </Escena>
      {/* 7 · 1945: Grand Rapids, Michigan */}
      <Escena T={T} a={K.Es} b={K.R}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[[90, 260, KC.pink], [230, 380, KC.cyan], [370, 300, KC.lilac], [930, 330, KC.coral]].map(([x, h, c], i) => <g key={i}>
            <rect x={x - 60} y={1180 - h} width={120} height={h} fill={c} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: Math.floor(h / 70) }, (_, k) => <rect key={k} x={x - 34} y={1180 - h + 24 + k * 70} width={68} height={34} fill="#fff6c8" stroke={KC.ink} strokeWidth={4} />)}</g>)}
          <g>
            <path d="M 570 1180 L 610 900 M 750 1180 L 710 900 M 590 1040 L 730 1040" stroke={KC.ink} strokeWidth={12} />
            <rect x={540} y={720} width={240} height={190} rx={30} fill="#9ad0ff" stroke={KC.ink} strokeWidth={9} />
            <path d="M 530 730 Q 660 640 790 730 Z" fill="#6b8fb3" stroke={KC.ink} strokeWidth={8} />
            <text x={660} y={835} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>AGUA</text>
          </g>
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.Es + 3.0 + i * 0.25, p = kprog(T, t0, t0 + 0.7); return p > 0 && p < 1 ? <IonF key={i} T={T} ph={i} x={660 + (i % 3 - 1) * 30} y={klerp(560, 760, p)} r={14} /> : null; })}
          <rect x={0} y={1180} width={KW} height={80} fill="#7fc36a" stroke={KC.ink} strokeWidth={6} />
        </SvgCapa>
      </Escena>
      {/* 8 · casi 30 mil escolares, más de 60 % menos caries */}
      <Escena T={T} a={K.R} b={K.N}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={1 - kprog(T, mitadR - 0.3, mitadR)}>
            {Array.from({ length: 30 }, (_, i) => { const t0 = K.R + 0.1 + i * 0.04, e = kprog(T, t0, t0 + 0.3, kEase.sale);
              return <Personita key={i} x={170 + (i % 6) * 150} y={720 + Math.floor(i / 6) * 110} s={1.4 * e} color={[KC.yellow, KC.cyan, KC.mint, KC.pink][i % 4]} />; })}
          </g>
          {T > mitadR && (() => { const g = kprog(T, mitadR, mitadR + 1.0, kEase.sale), h1 = 420 * g, h2 = 420 * 0.38 * g;
            return <g>
              <rect x={200} y={1180 - h1} width={240} height={h1} rx={12} fill={KC.coral} stroke={KC.ink} strokeWidth={7} />
              <rect x={640} y={1180 - h2} width={240} height={h2} rx={12} fill={KC.mint} stroke={KC.ink} strokeWidth={7} />
              <line x1={160} x2={920} y1={1180} y2={1180} stroke={KC.ink} strokeWidth={8} />
              <text x={320} y={1225} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>antes del flúor</text>
              <text x={760} y={1225} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>nacidos después</text>
              <text x={760} y={1180 - h2 - 30} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} paintOrder="stroke" opacity={kprog(T, mitadR + 0.8, mitadR + 1.2)}>−60 % o más</text>
              <text x={320} y={1180 - h1 - 24} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>caries</text>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 9 · niños: fluorosis y cantidad de pasta */}
      <Escena T={T} a={K.N} b={K.Ci}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T < mitadN + 0.4 && <g opacity={1 - kprog(T, mitadN, mitadN + 0.4)}><Muela x={540} y={880} s={1.05} lineas={kprog(T, K.N + 0.6, K.N + 1.6)} color="#f4eee0" /></g>}
          {T > mitadN && <g opacity={kprog(T, mitadN, mitadN + 0.4)}>
            <Cepillo x={640} y={820} s={1.15} pasta={T > mitadN + 0.5 ? 'arroz' : null} />
            <text x={300} y={720} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>menos de 3 años</text>
            <text x={300} y={880} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>= grano de arroz</text>
            {T > mitadN + 1.8 && <g opacity={kprog(T, mitadN + 1.8, mitadN + 2.2)}>
              <Cepillo x={640} y={1140} s={1.15} pasta={T > mitadN + 2.3 ? 'chicharo' : null} />
              <text x={300} y={1020} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>de 3 a 6 años</text>
              <text x={300} y={1200} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>= chícharo</text></g>}
          </g>}
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la misma cara, ahora escupe y el flúor se queda */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Lavabo x={540} y={1200} />
          <Cara T={T} x={540} y={860} s={0.95} espuma={1 - kprog(T, K.Ci + 0.6, K.Ci + 1.6)} brillo={kprog(T, K.Ci + 1.4, K.Ci + 2.2)} />
          <Chorro T={T} x0={560} y0={960} x1={540} y1={1200} color="rgba(255,255,255,.95)" o={kprog(T, K.Ci + 0.4, K.Ci + 0.7) * (1 - kprog(T, K.Ci + 1.4, K.Ci + 1.8))} ancho={26} />
          <VasoAgua x={230} y={760} s={0.9} nivel={0.75} />
          <Marca x={230} y={560} ok={false} s={0.6} o={kprog(T, K.Ci + 2.4, K.Ci + 2.8)} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.4} until={K.G + 4.9} texto="¿más limpio?" x={300} y={470} tam={46} />
      <Chip T={T} at={K.G + 2.6} until={K.E - 0.2} texto="se va el flúor de la pasta" y={1500} tam={42} borde={ORO} />
      <Etq T={T} at={K.E + 0.5} until={K.A - 0.2} x={200} y={1240} texto="esmalte" tam={34} color={KC.ink} />
      <Chip T={T} at={K.E + 1.0} until={K.A - 0.2} texto="apatita = calcio + fosfato" y={1500} tam={42} borde={KC.gold2} />
      <Chip T={T} at={K.A + 0.4} until={K.F - 0.2} texto="bacterias + azúcar → ácido" y={1500} tam={42} borde={KC.red} />
      <EscalaFija T={T} at={K.A + 0.2} until={K.C - 0.2} texto="100 nm" largo={150} />
      <Chip T={T} at={K.F + 0.3} until={K.C - 0.2} texto="flúor en la saliva → se reconstruye" y={1500} tam={36} borde={ORO} />
      <Chip T={T} at={K.C + 2.4} until={K.P - 0.2} texto="OH → F: se disuelve menos" y={1500} tam={42} borde={ORO} />
      <div style={{ position:'absolute', left:60, top:1440, zIndex:40, font:`700 24px ${KF.mono}`, color:KC.texto, opacity: T > K.C + 0.2 && T < K.P - 0.2 ? 0.85 : 0 }}>esquema de la red · no a escala</div>
      <TarjetaEstudio T={T} at={K.M + 0.2} until={mitadM - 0.3} anio="1901" quien="Frederick McKay · Colorado Springs" revista="manchas color chocolate · NIDCR (NIH)" y={1560} />
      <Chip T={T} at={K.M + 2.8} until={mitadM - 0.3} texto="manchados… y con menos caries" x={540} y={470} tam={38} borde={CAFE} />
      <Chip T={T} at={mitadM + 0.1} until={K.Es - 0.3} texto="30 años después" x={330} y={560} tam={50} borde={ORO} />
      <Etq T={T} at={mitadM + 1.2} until={K.Es - 0.3} x={720} y={1040} texto="flúor natural de más" tam={34} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.9} anio="1945" quien="Grand Rapids, Michigan" revista="primera ciudad con agua fluorada · NIDCR" y={640} />
      <Chip T={T} at={K.Es + 3.0} until={K.R - 0.2} texto="flúor medido en el agua de la ciudad" y={1500} tam={36} borde={ORO} />
      <Chip T={T} at={K.R + 0.3} until={K.N - 0.2} texto="≈ 30 000 escolares · 15 años" y={1500} tam={42} borde={KC.mint} />
      <Etq T={T} at={K.N + 1.0} until={mitadN} x={760} y={1150} texto="fluorosis leve: líneas blancas" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.N + 0.3} until={K.Ci - 0.2} texto="niños: que la escupan, no la traguen" y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="escupe ✓ · enjuague luego luego ✗" y={1500} tam={38} borde={ORO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="El buche *se lleva el flúor.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.A - 0.1} texto="Esmalte: *cristales de apatita.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.F - 0.1} texto="Las bacterias *hacen ácido.*" />
      <Subtitulo T={T} idx={3} at={K.F + 0.1} until={K.C - 0.1} texto="El flúor *ayuda a reconstruir.*" />
      <Subtitulo T={T} idx={4} at={K.C + 0.1} until={K.P - 0.1} texto="Con flúor *se disuelve menos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.M - 0.1} texto="¿Cómo *se descubrió?*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.Es - 0.1} texto="Manchas: *flúor natural de más.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.R - 0.1} texto="1945: *flúor en el agua.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.N - 0.1} texto="*Más de 60 %* menos caries." />
      <Subtitulo T={T} idx={9} at={K.N + 0.1} until={K.Ci - 0.1} texto="Arroz o *chícharo* de pasta." />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Escupe, *no te enjuagues.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Esmalte + 0.6, CUES.Acido - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Acido + 1.0, CUES.Fluor - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Fluor + 1.0, CUES.Cristal - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cristal + 1.0, CUES.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Manchas + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Manchas + 1.2, CUES.Manchas + 2.6, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Manchas + 5.6, CUES.Estudio - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 3.1, CUES.Resultado - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Resultado + 2.4, CUES.Ninos - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Ninos + 0.5, CUES.Cierre - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="48" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FluorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Fluor /></CompositionStage></div>;
}
window.FluorApp = FluorApp;
