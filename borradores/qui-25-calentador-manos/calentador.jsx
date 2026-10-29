// Shot Químico #25 · Ese calentador no trae pilas: es hierro oxidándose a propósito — NARRADO (N1 por dentro + toque de N5).
// Guion y fuentes: guion.md · verificación: verificacion.md (APROBADO). El dibujo es esquemático.
const FE = '#8d939c', OXI = '#c4561c', PIEL = '#f1b48f', PLATA = '#c9ced6', TELA = '#f7f4ee';
const PXMM = 4; // la bolsita (~9 cm) mide ~360 px en la escena macro

// Termómetro chico: v = 0..1 (llenado), on = se enciende (color).
function Termo({ x, y, s = 1, v = 0, on = 1, texto }) {
  const col = mixHex('#9aa3b5', '#ff3b2f', on);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-200} width={44} height={210} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={-188 + 180 * (1 - v)} width={20} height={180 * v + 10} rx={10} fill={col} />
    <circle cx={0} cy={30} r={38} fill={col} stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.5, 0.75].map((m) => <line key={m} x1={22} x2={40} y1={-188 + 180 * (1 - m)} y2={-188 + 180 * (1 - m)} stroke={KC.ink} strokeWidth={5} />)}
    {texto && <text x={0} y={110} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Bolsita de tela no tejida (el calentador). calor 0..1 = ondas de calor; oxido 0..1 tiñe el relleno.
function Bolsita({ T, x, y, s = 1, rot = 0, calor = 0, oxido = 0 }) {
  const R = krng(11);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {calor > 0 && [-60, 0, 60].map((dx, i) => <path key={i} d={`M ${dx} -210 q 20 -30 0 -60 q -20 -30 0 -60`} transform={`translate(${Math.sin(T * 3 + i) * 8} ${-((T * 40 + i * 30) % 40)})`}
      stroke={KC.orange} strokeWidth={12} fill="none" strokeLinecap="round" opacity={calor * 0.9} />)}
    <rect x={-130} y={-180} width={260} height={360} rx={40} fill={mixHex(TELA, '#f1d9c4', oxido * 0.6)} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={-110 + R() * 220} cy={-160 + R() * 320} r={3} fill="#cfc8bb" />)}
    <rect x={-130} y={-180} width={260} height={360} rx={40} fill="none" stroke="#bdb5a6" strokeWidth={4} strokeDasharray="10 10" transform="scale(.9)" />
    {calor > 0 && <rect x={-130} y={-180} width={260} height={360} rx={40} fill={KC.orange} opacity={0.12 * calor + 0.06 * Math.sin(T * 5) * calor} />}
  </g>;
}
// Sobre plateado hermético. abre 0..1 = la tira de arriba sale volando.
function Sobre({ x, y, s = 1, abre = 0, candado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-200} width={340} height={420} rx={18} fill={PLATA} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -150 L 150 -150" stroke="#fff" strokeWidth={10} opacity={0.6} />
    <path d="M -120 -40 L 120 160" stroke="#fff" strokeWidth={24} opacity={0.35} />
    <g transform={`translate(${abre * 260} ${-abre * 260}) rotate(${abre * 50})`} opacity={1 - abre}>
      <rect x={-170} y={-250} width={340} height={56} rx={10} fill={PLATA} stroke={KC.ink} strokeWidth={8} />
      <path d="M -150 -222 L 150 -222" stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" />
    </g>
    {candado > 0 && <g opacity={candado} transform="translate(0 30)">
      <path d="M -40 -40 L -40 -80 Q -40 -120 0 -120 Q 40 -120 40 -80 L 40 -40" stroke={KC.ink} strokeWidth={14} fill="none" />
      <rect x={-62} y={-44} width={124} height={100} rx={14} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
      <circle cx={0} cy={0} r={12} fill={KC.ink} />
    </g>}
  </g>;
}
// Manos que sostienen algo a los lados (palmas esquemáticas).
function Manos({ x, y, s = 1, sep = 200 }) {
  const mano = (lado) => <g transform={`translate(${lado * sep} 40) scale(${lado} 1)`}>
    <path d="M 40 -120 Q -10 -130 -40 -60 L -60 120 Q -60 200 40 220 L 260 240 L 260 -40 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-90, -40, 10, 60].map((dy, i) => <path key={i} d={`M 30 ${dy} Q -40 ${dy + 10} -50 ${dy + 40}`} stroke={KC.ink} strokeWidth={8} fill={PIEL} strokeLinecap="round" />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{mano(-1)}{mano(1)}</g>;
}
// Granos de hierro (polígonos irregulares). ox(i) 0..1 = cuánto se oxidó cada grano.
function Granos({ x, y, w, h, n = 40, ox = () => 0, seed = 3, r0 = 14, r1 = 30, T = 0 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => {
    const cx = x + R() * w, cy = y + R() * h, r = r0 + R() * (r1 - r0), k = 6 + Math.floor(R() * 3), ph = R() * 6;
    const pts = Array.from({ length: k }, (_, j) => { const a = (j / k) * Math.PI * 2 + ph, rr = r * (0.75 + R() * 0.35); return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
    const o = kclamp(ox(i), 0, 1);
    return <g key={i}><polygon points={pts} fill={mixHex(FE, OXI, o)} stroke={KC.ink} strokeWidth={3} />
      {o > 0.05 && o < 0.98 && <circle cx={cx} cy={cy} r={r * 1.5} fill={KC.orange} opacity={0.25 * Math.sin(o * Math.PI)} />}</g>;
  })}</g>;
}
// Clavo grande con una mancha de óxido que crece (m 0..1).
function Clavo({ x, y, s = 1, m = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-260} width={140} height={34} rx={8} fill={FE} stroke={KC.ink} strokeWidth={8} />
    <path d="M -22 -226 L 22 -226 L 22 180 L 0 250 L -22 180 Z" fill={FE} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={4} cy={20} rx={6 + 14 * m} ry={10 + 30 * m} fill={OXI} opacity={0.9} />
  </g>;
}
// Reloj: vel = vueltas por segundo de la manecilla.
function Reloj({ T, x, y, r = 70, vel = 0.1, color = '#fff', texto }) {
  const a = T * vel * Math.PI * 2;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={-r + 10} x2={0} y2={-r + 24} stroke={KC.ink} strokeWidth={6} transform={`rotate(${k * 90})`} />)}
    <line x1={0} y1={0} x2={Math.sin(a) * r * 0.7} y2={-Math.cos(a) * r * 0.7} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={9} fill={KC.ink} />
    {texto && <text y={r + 56} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Reja chiquita oxidada (guiño al #21).
function Reja({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-80, -40, 0, 40, 80].map((dx) => <rect key={dx} x={dx - 8} y={-110} width={16} height={220} fill={OXI} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-100} y={-80} width={200} height={16} fill={OXI} stroke={KC.ink} strokeWidth={5} />
    <rect x={-100} y={60} width={200} height={16} fill={OXI} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Carboncito poroso.
function Carbon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -30 L -40 -90 L 50 -80 L 100 -10 L 70 70 L -30 90 L -100 40 Z" fill="#2a2a2a" stroke={KC.ink} strokeWidth={8} />
    {[[-40, -30], [20, -40], [50, 20], [-20, 40], [-60, 20], [10, 0]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={12} fill="#555" stroke="#111" strokeWidth={3} />)}
  </g>;
}
// Hojuela de vermiculita en capas; agua 0..1 = se ve más oscura y con gotas guardadas.
function Vermi({ x, y, s = 1, agua = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-45, -15, 15, 45].map((dy, i) => <path key={i} d={`M -100 ${dy} Q -20 ${dy - 16} 100 ${dy} L 100 ${dy + 22} Q -20 ${dy + 6} -100 ${dy + 22} Z`} fill={mixHex('#e2b04a', '#b07a2a', agua)} stroke={KC.ink} strokeWidth={5} />)}
    {agua > 0 && [[-50, -26], [20, 4], [60, -26], [-10, 34]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9 * agua} fill="#5fc6ff" stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Gota de agua.
function Gota({ x, y, s = 1 }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 -80 Q 60 0 50 30 Q 40 80 0 80 Q -40 80 -50 30 Q -60 0 0 -80 Z" fill="#5fc6ff" stroke={KC.ink} strokeWidth={8} />;
}
// Corte de piel: epidermis, dermis y grasa; dano 0..1 enrojece lo de abajo.
function PielCorte({ x, y, w = 900, dano = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={60} fill="#f6c6a4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2} y={60} width={w} height={150} fill={mixHex('#f0a08a', '#d7263d', dano * 0.7)} stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2} y={210} width={w} height={130} fill={mixHex('#ffe9a8', '#e0646f', dano * 0.8)} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-w / 2 + 60 + i * 100} cy={275} r={36} fill="none" stroke="rgba(0,0,0,.25)" strokeWidth={4} />)}
    {dano > 0 && <ellipse cx={0} cy={180} rx={200 * dano} ry={90 * dano} fill="#b3122a" opacity={0.55 * dano} />}
    <text x={-w / 2 + 16} y={44} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>piel</text>
    <text x={-w / 2 + 16} y={250} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>tejido de abajo</text>
  </g>;
}
// Cama con luna (para "ni para dormir").
function Cama({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-20} width={300} height={70} rx={14} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-60} width={90} height={50} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-160} y={-90} width={20} height={180} fill="#8a5a3a" stroke={KC.ink} strokeWidth={5} />
    <rect x={140} y={-30} width={20} height={120} fill="#8a5a3a" stroke={KC.ink} strokeWidth={5} />
    <path d="M 90 -170 A 50 50 0 1 0 140 -110 A 38 38 0 1 1 90 -170 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function Calentador() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Re: CUES.Relleno, Em: CUES.Empaque, Ox: CUES.Oxido, Po: CUES.Polvo, Ay: CUES.Ayudantes, Pr: CUES.Pregunta, Pa: CUES.Patente, Cu: CUES.Cuidado, Co: CUES.Consejo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: se rompe el sobre, sale la bolsita y se calienta
  const rompe = kprog(T, K.G + 0.05, K.G + 0.55, kEase.sale);
  const sale = kprog(T, K.G + 0.35, K.G + 1.3, kEase.sale);
  const calorG = kprog(T, K.G + 1.4, K.G + 3.0);
  // relleno: barra apilada en el orden de la voz (hierro, agua, carbón, vermiculita, sal); anchos con el punto medio de cada rango
  const ING = [['hierro en polvo', '50–60 %', 55, FE], ['agua', '30–40 %', 35, '#5fc6ff'], ['carbón activado', '5–10 %', 7.5, '#2a2a2a'], ['vermiculita', '5–10 %', 7.5, '#e2b04a'], ['sal', '1–5 %', 3, '#ffffff']];
  const totIng = ING.reduce((a, r) => a + r[2], 0);
  const abreEm = kprog(T, K.Em + 1.6, K.Em + 2.2, kEase.sale);
  const oxPo = (i) => kprog(T, K.Po + 1.0 + (i % 12) * 0.08, K.Po + 2.6 + (i % 7) * 0.1);
  const R = krng(9);
  const o2s = Array.from({ length: 9 }, () => [R() * 900 + 90, R() * 260, R() * 6]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el sobre se rompe y sale la bolsita */}
      <Escena T={T} a={K.G} b={K.Re} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Sobre x={420} y={1000 + sale * 260} s={1} abre={rompe} />
          <Bolsita T={T} x={420} y={klerp(1040, 900, sale)} s={0.95} rot={Math.sin(T * 9) * 6 * kprog(T, K.G + 1.2, K.G + 1.5) * (1 - kprog(T, K.G + 2.4, K.G + 2.7))} calor={calorG} />
          {sale > 0.9 && <Manos x={420} y={920} s={0.95} sep={210} />}
          <Termo x={900} y={1080} s={0.9} v={0.15 + 0.6 * calorG} on={calorG} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={PXMM} x={60} y={1430} color={KC.ink} />
      </Escena>
      {/* 1 · relleno: por dentro de la bolsita + barra de ingredientes */}
      <Escena T={T} a={K.Re} b={K.Em} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Bolsita T={T} x={250} y={830} s={0.75} calor={0.6} />
          {(() => { let acc = 0; return ING.map(([nom, rango, v, c], i) => { const w = 960 * v / totIng, x0 = 60 + acc; acc += w;
            const f = kprog(T, K.Re + 2.6 + i * 0.75, K.Re + 3.2 + i * 0.75, kEase.sale);
            return <rect key={i} x={x0} y={1100} width={w * f} height={100} fill={c} stroke={KC.ink} strokeWidth={6} />; }); })()}
          <rect x={60} y={1100} width={960} height={100} fill="none" stroke={KC.ink} strokeWidth={8} />
          {ING.map(([nom, rango, v, c], i) => { const f = kprog(T, K.Re + 2.6 + i * 0.75, K.Re + 3.0 + i * 0.75); const big = i < 2;
            return <g key={i} opacity={f}>
              <rect x={90} y={1420 + i * 64} width={44} height={44} rx={8} fill={c} stroke={KC.ink} strokeWidth={5} />
              <text x={150} y={1455 + i * 64} style={{ font:`${big ? 900 : 700} ${big ? 42 : 36}px ${big ? KF.texto : KF.mono}` }} fill={KC.ink}>{nom}</text>
              <text x={1000} y={1455 + i * 64} textAnchor="end" style={{ font:`${big ? 900 : 700} ${big ? 42 : 36}px ${KF.mono}` }} fill={KC.ink}>{rango}</text>
            </g>; })}
        </SvgCapa>
        <Lupa T={T} at={K.Re + 0.3} until={K.Em - 0.4} x={680} y={800} r={230} fx={250} fy={830} etiqueta="POR DENTRO · el relleno" tinte={KC.orange}
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#1a1410" />
            <Granos x={10} y={10} w={r * 2 - 20} h={r * 2 - 20} n={46} seed={4} r0={14} r1={28} />
            {[[120, 120], [300, 180], [200, 320], [360, 330]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={16} fill="#5fc6ff" stroke={KC.ink} strokeWidth={3} />)}
            <Carbon x={330} y={100} s={0.35} /><Vermi x={130} y={330} s={0.4} />
            {[[260, 260], [80, 220]].map(([a, b], i) => <rect key={i} x={a} y={b} width={22} height={22} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}
          </svg>} />
        <Escala T={T} z={0.75} pxPorMm={PXMM} x={60} y={1260} color={KC.ink} />
      </Escena>
      {/* 2 · empaque: sin aire → se abre y entra oxígeno */}
      <Escena T={T} a={K.Em} b={K.Ox} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Bolsita T={T} x={420} y={880 - abreEm * 120} s={0.85} calor={kprog(T, K.Em + 3.0, K.Em + 4.0)} />
          <g opacity={1 - abreEm * 0.85}><Sobre x={420} y={900 + abreEm * 300} s={1.05} abre={abreEm} candado={1 - abreEm} /></g>
          {abreEm > 0 && o2s.slice(0, 7).map(([ox, oy, ph], i) => { const p = kprog(T, K.Em + 2.0 + i * 0.18, K.Em + 3.4 + i * 0.18, kEase.suave);
            return p > 0 && p < 1 ? <Mol key={i} tipo="o2" x={klerp(ox < 540 ? 60 : 1020, 420 + (i - 3) * 30, p)} y={klerp(560 + oy, 820, p)} s={0.7} rot={T * 60 + ph * 50} o={1 - kprog(p, 0.85, 1)} /> : null; })}
          <Termo x={880} y={1080} s={0.9} v={0.15 + 0.45 * kprog(T, K.Em + 2.6, K.Em + 4.2)} on={kprog(T, K.Em + 2.4, K.Em + 3.0)} />
        </SvgCapa>
        <Escala T={T} z={0.85} pxPorMm={PXMM} x={60} y={1430} color={KC.ink} />
      </Escena>
      {/* 3 · óxido: un grano de hierro por dentro (micro, fondo noche) */}
      <Escena T={T} a={K.Ox} b={K.Po} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} seed={7} />
        <SvgCapa>
          {(() => { const ox = kprog(T, K.Ox + 1.2, K.Ox + 4.2); const cx = 540, cy = 900;
            const pts = Array.from({ length: 11 }, (_, j) => { const a = j / 11 * Math.PI * 2, rr = 230 * (0.85 + 0.15 * Math.sin(j * 2.3)); return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
            return <g>
              <polygon points={pts} fill={FE} stroke={KC.ink} strokeWidth={10} />
              <polygon points={pts} fill="none" stroke={OXI} strokeWidth={10 + 60 * ox} strokeLinejoin="round" opacity={0.95} />
              {Array.from({ length: 10 }, (_, i) => { const t0 = K.Ox + 1.2 + i * 0.3, p = kprog(T, t0, t0 + 0.7); const a = i * 0.63 * Math.PI;
                return p > 0 && p < 1 ? <circle key={i} cx={cx + Math.cos(a) * (250 + p * 120)} cy={cy + Math.sin(a) * (250 + p * 120)} r={20 + p * 40} fill={KC.orange} opacity={0.8 * (1 - p)} /> : null; })}
              {Array.from({ length: 6 }, (_, i) => { const t0 = K.Ox + 0.2 + i * 0.5, p = kprog(T, t0, t0 + 1.0, kEase.suave), a = i * 1.05 + 0.4;
                return p < 1 ? <Mol key={i} tipo="o2" x={cx + Math.cos(a) * klerp(520, 250, p)} y={cy + Math.sin(a) * klerp(520, 250, p)} s={0.8} rot={T * 50 + i * 40} /> : null; })}
              {kprog(T, K.Ox + 0.4, K.Ox + 1.3) < 1 && <Gota x={klerp(160, 330, kprog(T, K.Ox + 0.4, K.Ox + 1.3))} y={klerp(620, 700, kprog(T, K.Ox + 0.4, K.Ox + 1.3))} s={0.7} />}
              <text x={cx} y={cy + 20} textAnchor="middle" style={{ font:`700 80px ${KF.mono}` }} fill={KC.ink}>Fe</text>
            </g>; })()}
          <Reja x={880} y={1130} s={0.8} o={kprog(T, K.Ox + 1.6, K.Ox + 2.1) * (1 - kprog(T, K.Po - 0.6, K.Po - 0.2))} />
        </SvgCapa>
        <Etq T={T} at={K.Ox + 2.6} until={K.Po - 0.3} x={300} y={1180} texto="óxido de hierro" color={KC.orange} lado="izq" />
      </Escena>
      {/* 4 · polvo + sal contra un clavo */}
      <Escena T={T} a={K.Po} b={K.Ay} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <line x1={540} y1={700} x2={540} y2={1200} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 14" />
          <Clavo x={270} y={940} s={0.9} m={kprog(T, K.Po + 0.5, K.Ay)} />
          <rect x={590} y={760} width={420} height={330} rx={30} fill="#1a1410" stroke={KC.ink} strokeWidth={8} />
          <Granos x={610} y={780} w={380} h={290} n={60} seed={6} r0={10} r1={20} ox={oxPo} />
          {Array.from({ length: 8 }, (_, i) => { const p = kprog(T, K.Po + 0.3 + i * 0.08, K.Po + 1.0 + i * 0.08); return p < 1 && p > 0 ? <rect key={i} x={630 + i * 45} y={klerp(620, 900, p)} width={20} height={20} fill="#fff" stroke={KC.ink} strokeWidth={3} /> : null; })}
          <Reloj T={T} x={270} y={1440} r={60} vel={0.12} texto="lento" />
          <Reloj T={T} x={800} y={1440} r={60} vel={1.6} color={KC.yellow} texto="rápido" />
        </SvgCapa>
        <Etq T={T} at={K.Po + 0.4} until={K.Ay - 0.3} x={60} y={700} texto="un clavo" color={KC.ink} />
        <Etq T={T} at={K.Po + 0.6} until={K.Ay - 0.3} x={600} y={720} texto="polvo + sal" color={KC.ink} />
      </Escena>
      {/* 5 · los ayudantes */}
      <Escena T={T} a={K.Ay} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.Ay + 0.2 && <g opacity={kprog(T, K.Ay + 0.2, K.Ay + 0.5)}><Gota x={200} y={900} s={1.3} /><text x={200} y={1100} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>agua</text></g>}
          {T > K.Ay + 1.0 && <g opacity={kprog(T, K.Ay + 1.0, K.Ay + 1.3)}><Carbon x={540} y={900} s={1.3} />
            {[[-70, -40], [40, -60], [70, 40], [-30, 60]].map(([a, b], i) => <Mol key={i} tipo="o2" x={540 + a * 1.3} y={900 + b * 1.3 + Math.sin(T * 4 + i) * 4} s={0.45} o={kprog(T, K.Ay + 1.4 + i * 0.15, K.Ay + 1.6 + i * 0.15)} />)}
            <text x={540} y={1100} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>carbón</text></g>}
          {T > K.Ay + 2.2 && <g opacity={kprog(T, K.Ay + 2.2, K.Ay + 2.5)}><Vermi x={870} y={900} s={1.2} agua={kprog(T, K.Ay + 2.6, K.Ay + 3.6)} />
            <text x={870} y={1100} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>vermiculita</text></g>}
        </SvgCapa>
        <Chip T={T} at={K.Ay + 0.4} until={K.Pr - 0.2} texto="ayuda · atrapa O₂ · guarda agua como esponja" y={1500} tam={32} borde={KC.lilac} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Pa} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={260} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 900)`}>?</text>
          <g transform={`translate(260 1300) rotate(${(T - K.Pr) * 120})`}><path d="M -50 -70 L 50 -70 L 0 0 L 50 70 L -50 70 L 0 0 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /></g>
        </SvgCapa>
      </Escena>
      {/* 7 · la patente: 45–50 °C por 22 horas */}
      <Escena T={T} a={K.Pa} b={K.Cu}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {(() => { const p = kprog(T, K.Pa + 2.4, K.Pa + 6.0), X0 = 160, X1 = 980, Y0 = 1180, Y1 = 760;
            const ty = (c) => klerp(Y0, Y1, (c - 20) / 40), tx = (h) => klerp(X0, X1, h / 24);
            const curva = (h) => (h < 1 ? klerp(20, 47.5, h) : 47.5 + Math.sin(h * 1.3) * 1.5);
            const pts = []; for (let h = 0; h <= 22 * p; h += 0.25) pts.push(`${tx(h)},${ty(curva(h))}`);
            return <g opacity={kprog(T, K.Pa + 2.0, K.Pa + 2.4)}>
              <rect x={X0} y={ty(50)} width={X1 - X0} height={ty(45) - ty(50)} fill={KC.orange} opacity={0.35} />
              <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={KC.ink} strokeWidth={8} /><line x1={X0} y1={Y0} x2={X0} y2={Y1 - 30} stroke={KC.ink} strokeWidth={8} />
              <text x={X0 + 14} y={ty(50) - 14} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>45–50 °C (promedio)</text>
              <text x={X1} y={Y0 + 50} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>horas →</text>
              {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={KC.red} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />}
              <Bolsita T={T} x={1000} y={680} s={0.35} calor={1} rot={10} />
            </g>; })()}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Pa + 0.45} until={K.Pa + 2.2} anio="años 70" quien="Asahi Kasei · patente" revista="US 3,976,049 · prueba del ejemplo 4" x={560} y={820} />
        {T > K.Pa + 2.4 && <Contador T={T} at={K.Pa + 2.4} desde={0} hasta={22} dur={3.6} sufijo=" horas" x={560} y={1480} tam={90} color={KC.ink} />}
      </Escena>
      {/* 8 · cuidado: quemadura de baja temperatura */}
      <Escena T={T} a={K.Cu} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.coral} />
        <SvgCapa>
          <PielCorte x={540} y={900} dano={kprog(T, K.Cu + 3.0, K.Cu + 6.5)} />
          <Bolsita T={T} x={540} y={800} s={0.5} rot={90} calor={1} />
          <Termo x={140} y={1440} s={0.7} v={0.55} on={1} texto="44 °C" />
          <Reloj T={T} x={940} y={1400} r={60} vel={0.9} texto="3–4 h" />
          {T > K.Cu + 3.5 && <text x={760} y={860} style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Cu + 3.5, K.Cu + 3.9)}>“solo tibio” 🙂</text>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Cu + 0.2} until={K.Cu + 2.8} anio="2025" quien="NITE · Japón" revista="aviso sobre calentadores (カイロ)" x={640} y={620} />
        <Chip T={T} at={K.Cu + 3.0} until={K.Co - 0.2} texto="quemadura de baja temperatura" y={1500} tam={36} borde={KC.red} />
      </Escena>
      {/* 9 · consejo */}
      <Escena T={T} a={K.Co} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, K.Co + 0.1, K.Co + 0.4)}><rect x={60} y={860} width={280} height={140} rx={20} fill={PIEL} stroke={KC.ink} strokeWidth={7} /><Bolsita T={T} x={200} y={930} s={0.3} rot={90} calor={1} /><Marca x={200} y={1100} ok={false} s={0.8} /></g>
          <g opacity={kprog(T, K.Co + 1.0, K.Co + 1.3)}><Cama x={540} y={950} s={0.85} /><Bolsita T={T} x={560} y={920} s={0.22} rot={90} calor={1} /><Marca x={540} y={1100} ok={false} s={0.8} o={kprog(T, K.Co + 1.2, K.Co + 1.5)} /></g>
          <g opacity={kprog(T, K.Co + 2.0, K.Co + 2.3)}><rect x={740} y={830} width={280} height={200} rx={30} fill={KC.blue} stroke={KC.ink} strokeWidth={7} /><text x={880} y={1015} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#fff">ropa / guante</text><Bolsita T={T} x={880} y={920} s={0.3} calor={1} /><Marca x={880} y={1100} ok={true} s={0.8} o={kprog(T, K.Co + 2.2, K.Co + 2.5)} /></g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: las manos del inicio; por dentro, el polvo ya es óxido */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {(() => { const m = kprog(T, K.Ci + 2.4, K.Ci + 2.9) * (1 - kprog(T, K.Ci + 3.7, K.Ci + 4.2));
            return <g>
              <g opacity={1 - m}><Bolsita T={T} x={420} y={900} s={0.95} calor={1} oxido={1} /></g>
              <Reja x={420} y={900} s={1.4} o={m} />
              <Manos x={420} y={920} s={0.95} sep={210} />
            </g>; })()}
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.4} until={K.Ci + 2.3} x={800} y={760} r={200} fx={420} fy={900} etiqueta="POR DENTRO · ya es óxido" tinte={KC.orange}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a1410" /><Granos x={10} y={10} w={r * 2 - 20} h={r * 2 - 20} n={40} seed={4} ox={(i) => (i % 9 === 0 ? 0.3 : 1)} /></svg>} />
        <Escala T={T} z={1} pxPorMm={PXMM} x={60} y={1430} color={KC.ink} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.G + 2.6} texto="¿pilas? ¿fuego?" x={330} y={470} tam={46} />
      <Chip T={T} at={K.G + 2.7} until={K.Re - 0.3} texto="hierro + oxígeno" x={300} y={470} tam={44} borde={OXI} />
      <Chip T={T} at={K.Re + 0.4} until={K.Em - 0.3} texto="hoja de seguridad · 2021" x={300} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Em + 0.2} until={K.Em + 1.8} texto="sobre cerrado: sin aire" y={1500} tam={40} borde="#9aa3b5" />
      <Chip T={T} at={K.Em + 2.2} until={K.Ox - 0.2} texto="entra O₂ por la tela" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ox + 0.5} until={K.Po - 0.2} texto="hierro + oxígeno → óxido + calor" y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.Pr + 0.2} until={K.Pa - 0.1} texto="¿cuántas horas?" x={300} y={470} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="hierro + oxígeno → óxido + calor" y={1500} tam={38} borde={KC.orange} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Re - 0.1} texto="No trae pilas: *es óxido.*" />
      <Subtitulo T={T} idx={1} at={K.Re + 0.1} until={K.Em - 0.1} texto="La mitad o más: *hierro.*" />
      <Subtitulo T={T} idx={2} at={K.Em + 0.1} until={K.Ox - 0.1} texto="Al abrirlo, *entra oxígeno.*" />
      <Subtitulo T={T} idx={3} at={K.Ox + 0.1} until={K.Po - 0.1} texto="Se oxida y *suelta calor.*" />
      <Subtitulo T={T} idx={4} at={K.Po + 0.1} until={K.Ay - 0.1} texto="Polvo con sal: *rapidísimo.*" />
      <Subtitulo T={T} idx={5} at={K.Ay + 0.1} until={K.Pr - 0.1} texto="Agua, carbón *y vermiculita.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Pa - 0.1} texto="¿Cuánto *aguanta el calor?*" />
      <Subtitulo T={T} idx={7} at={K.Pa + 0.1} until={K.Cu - 0.1} texto="22 horas *a 45–50 °C.*" />
      <Subtitulo T={T} idx={8} at={K.Cu + 0.1} until={K.Co - 0.1} texto="44 °C *pueden quemarte.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="Ni en la piel *ni al dormir.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una reja *en tu bolsillo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Relleno + 1.5, CUES.Empaque - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Empaque + 0.4, CUES.Oxido - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Oxido + 0.8, CUES.Polvo - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Polvo + 2.0, CUES.Ayudantes - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Patente + 0.35, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Patente + 2.6, CUES.Cuidado - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cuidado + 0.5, CUES.Consejo - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Consejo + 0.3, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="25" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CalentadorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Calentador /></CompositionStage></div>;
}
window.CalentadorApp = CalentadorApp;
