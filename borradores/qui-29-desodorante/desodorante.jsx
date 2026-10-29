// Shot Químico #29 · Ese olor no es tu sudor (desodorante vs. antitranspirante) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PIEL = '#f1b48f', PIEL2 = '#e8a07c', CORY = KC.mint, HOMI = KC.lilac, AUR = '#a7adb8', ENZ = '#9b5de5', OLOR = '#9bd23c', SUDOR = '#7fc8ff';
const PX_UM = 86; // en el mundo micro: 1 µm ≈ 86 px (cocos de ~0.85 µm). Esquemático.

/* ---------- macro: la persona con el brazo arriba (origen = la axila) ---------- */
function Persona({ T, x, y, s = 1, brazo = 1 }) {
  const ang = klerp(95, -92, brazo), bend = klerp(-10, -150, brazo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -470 -110 Q -260 -170 -40 -110 Q 10 -80 10 0 L 40 760 L -480 760 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -430 -60 Q -390 -110 -350 -112 L -320 -60 Q -245 -10 -175 -60 L -150 -112 Q -70 -112 -40 -40 Q -15 15 -12 70 L 22 760 L -462 760 Z" fill={KC.teal} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <g opacity={brazo}>
      <ellipse cx={-6} cy={-30} rx={40} ry={78} fill={PIEL2} />
      {[[-14, -60], [4, -44], [-10, -22], [8, -6]].map(([dx, dy], i) => <path key={i} d={`M ${dx} ${dy} q 6 10 2 20`} stroke="#8a5a3c" strokeWidth={4} fill="none" opacity={0.45} strokeLinecap="round" />)}
    </g>
    <g transform={`translate(-20 -110) rotate(${ang})`}>
      <rect x={-10} y={-62} width={360} height={124} rx={62} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
      <g transform={`translate(330 0) rotate(${bend})`}>
        <rect x={-10} y={-52} width={300} height={104} rx={52} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
        <circle cx={300} cy={0} r={62} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
      </g>
    </g>
    <rect x={-300} y={-240} width={110} height={150} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <circle cx={-245} cy={-330} r={125} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -372 -330 Q -380 -470 -245 -462 Q -110 -470 -118 -330 Q -150 -410 -245 -400 Q -340 -410 -372 -330 Z" fill="#3a2418" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-290} cy={-332} r={11} fill={KC.ink} /><circle cx={-200} cy={-332} r={11} fill={KC.ink} />
    <ellipse cx={-315} cy={-290} rx={20} ry={12} fill="#ff8fa3" opacity={0.6} /><ellipse cx={-175} cy={-290} rx={20} ry={12} fill="#ff8fa3" opacity={0.6} />
    <path d={`M -280 -282 Q -245 ${-262 + Math.sin(T * 2) * 3} -210 -282`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Ondas verdes de "olor" que suben desde (x, y).
function Ondas({ T, x, y, f = 1, n = 3, alto = 260 }) {
  if (f <= 0) return null;
  return <g opacity={Math.min(1, f * 1.4)}>{Array.from({ length: n }, (_, i) => {
    const dx = i * 70, ph = T * 3 + i;
    return <path key={i} d={`M ${x + dx} ${y} q 30 ${-alto / 6} 0 ${-alto / 3} t 0 ${-alto / 3} t 0 ${-alto / 3}`} transform={`translate(${Math.sin(ph) * 10} ${-((T * 40 + i * 30) % 40)})`}
      stroke={OLOR} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${alto * 1.3 * f} 2000`} />; })}</g>;
}
function BarraEsc({ txt, largo, x = 60, y = 1600, color = KC.ink }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 28px ${KF.mono}` }}>
    <div style={{ marginBottom:8 }}>{txt}</div>
    <div style={{ width:largo, height:9, background:color, borderRadius:4 }}></div>
  </div>;
}

/* ---------- micro: moléculas y bacterias ---------- */
// Odorante: tiol (con S) o ácido (con O=O). Los carbonos van sin letra.
function Odorante({ x, y, s = 1, tipo = 'tiol', o = 1, rot = 0, brillo = 0 }) {
  const at = tipo === 'tiol'
    ? [[-34, 0, 22, QA.C, ''], [0, -12, 22, QA.C, ''], [34, 0, 22, QA.C, ''], [0, -58, 28, QA.S, 'S'], [68, -14, 20, QA.O, 'O']]
    : [[-34, 0, 22, QA.C, ''], [0, -12, 22, QA.C, ''], [34, 0, 22, QA.C, ''], [68, -14, 22, QA.C, ''], [92, -48, 20, QA.O, 'O'], [100, 10, 20, QA.O, 'O']];
  const en = tipo === 'tiol' ? [[0, 1], [1, 2], [1, 3], [2, 4]] : [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]];
  return <g opacity={o}>
    {brillo > 0 && tipo === 'tiol' && <circle cx={x} cy={y - 58 * s} r={(46 + Math.sin(brillo * 20) * 6) * s} fill={KC.yellow} opacity={0.35} />}
    <Molecula x={x} y={y} s={s} rot={rot} atomos={at} enlaces={en} />
  </g>;
}
// Cadenita de aminoácidos (cuentas doradas) a la que viene pegado el odorante.
function Cadena({ x, y, s = 1, o = 1 }) {
  const P = [[0, 0], [-34, 18], [-68, 36]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <polyline points={P.map((p) => p.join(',')).join(' ')} stroke={KC.ink} strokeWidth={10} fill="none" />
    {P.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={18} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Precursor: odorante + cadena. corte 0..1 separa; vuelo 0..1 sube el odorante hasta (vx, vy).
function Precursor({ T, x, y, tipo, corte = 0, vuelo = 0, vx = 0, vy = -400, s = 1, fade = 0 }) {
  const ox = x + klerp(0, vx, kEase.suave(vuelo)) + corte * 16, oy = y + klerp(0, vy, kEase.suave(vuelo)) - corte * 10;
  return <g>
    {corte < 0.05 && <line x1={x - 34 * s} y1={y} x2={x - 70 * s} y2={y + 30 * s} stroke={KC.ink} strokeWidth={10 * s} />}
    <Cadena x={x - 70 * s} y={y + 30 * s} s={s} o={1 - fade} />
    <Odorante x={ox} y={oy + Math.sin(T * 2 + x) * 4} s={s} tipo={tipo} rot={vuelo * 25 + Math.sin(T + x) * 5} brillo={vuelo > 0 ? T : 0} />
    {corte > 0 && corte < 1 && <g transform={`translate(${x - 52 * s} ${y + 14 * s})`}>{[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * 40 * corte} y2={Math.sin(a * Math.PI / 180) * 40 * corte} stroke="#fff" strokeWidth={5} opacity={1 - corte} />)}</g>}
  </g>;
}
// Racimo de cocos (Staphylococcus). Sin flagelo (no nadan).
function Racimo({ T = 0, x, y, s = 1, color = HOMI, seed = 1, vida = 1 }) {
  const P = [[0, 0], [52, 8], [26, -42], [-30, -36], [-46, 18], [10, 48], [60, -38]];
  return <g transform={`translate(${x} ${y}) scale(${s * (0.4 + 0.6 * vida)}) rotate(${Math.sin(T * 0.8 + seed) * 6})`} opacity={0.3 + 0.7 * vida}>
    {P.map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={30} fill={vida > 0.5 ? color : '#8a8f99'} stroke={KC.ink} strokeWidth={5} />
      <circle cx={a - 9} cy={b - 10} r={8} fill="#fff" opacity={0.4} /></g>)}
  </g>;
}
// Gota de sudor sobre la piel, en corte (fondo noche). Hijos = lo que va dentro.
function PielCorte({ T, y = 1120, poro = 540, gota = 1, children }) {
  return <g>
    <path d={`M 0 ${y} Q 270 ${y - 20} ${poro - 70} ${y} L ${poro - 40} ${y + 10} L ${poro - 40} ${KH} L 0 ${KH} Z`} fill="#d98f72" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${KW} ${y} Q 810 ${y - 20} ${poro + 70} ${y} L ${poro + 40} ${y + 10} L ${poro + 40} ${KH} L ${KW} ${KH} Z`} fill="#d98f72" stroke={KC.ink} strokeWidth={8} />
    <rect x={poro - 40} y={y + 10} width={80} height={KH} fill={SUDOR} opacity={0.35} />
    {gota > 0 && <path d={`M ${poro - 330 * gota} ${y} Q ${poro - 340 * gota} ${y - 300 * gota} ${poro} ${y - 330 * gota} Q ${poro + 340 * gota} ${y - 300 * gota} ${poro + 330 * gota} ${y} Z`}
      fill="rgba(127,200,255,.28)" stroke="#bfe8ff" strokeWidth={6} />}
    {children}
  </g>;
}
// Barra de desodorante / antitranspirante.
function Barra({ x, y, s = 1, rot = 0, color = KC.white, banda = KC.pink, texto = '' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -200 Q -70 -250 0 -252 Q 70 -250 70 -200 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={-200} width={180} height={400} rx={36} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-90} y={-60} width={180} height={130} fill={banda} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 ${texto.length > 3 ? 44 : 80}px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
function Flor({ x, y, s = 1, rot = 0, color = '#ff8fc8' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-26} rx={18} ry={28} fill={color} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
    <circle r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Destello({ x, y, s = 1, color = '#fff' }) {
  return <path d="M 0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={3} />;
}
// Tijera = enzima PatB.
function Tijera({ x, y, s = 1, abre = 0, rot = 0 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 110 -8 L 110 8 Z" fill={ENZ} stroke={KC.ink} strokeWidth={5} /><circle cx={-34} cy={0} r={22} fill="none" stroke={ENZ} strokeWidth={12} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 110 -8 L 110 8 Z" fill={ENZ} stroke={KC.ink} strokeWidth={5} /><circle cx={-34} cy={0} r={22} fill="none" stroke={ENZ} strokeWidth={12} /></g>
    <circle r={8} fill={KC.ink} />
  </g>;
}
// Pedacito de ADN (gen) que viaja.
function Gen({ x, y, s = 1, T }) {
  const pts = (fase) => Array.from({ length: 13 }, (_, i) => `${-60 + i * 10},${Math.sin(i * 0.9 + fase + T * 4) * 16}`).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-76} y={-34} width={152} height={68} rx={34} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={5} />
    <polyline points={pts(0)} stroke={KC.red} strokeWidth={7} fill="none" /><polyline points={pts(Math.PI)} stroke={KC.blue} strokeWidth={7} fill="none" />
  </g>;
}
// Lo de adentro de la axila, para la Lupa (corte esquemático).
function MiniGota({ T, r, t0, cortar = true }) {
  const c = cortar ? kprog(T, t0 + 0.8, t0 + 1.2) : 0, v = cortar ? kprog(T, t0 + 1.2, t0 + 3.2) : 0;
  return <svg width={r * 2} height={r * 2} viewBox="0 0 400 400" style={{ position:'absolute', left:0, top:0 }}>
    <rect width={400} height={400} fill={KC.noche} />
    <path d="M 0 300 Q 100 290 160 300 L 180 310 L 180 400 L 0 400 Z M 400 300 Q 300 290 240 300 L 220 310 L 220 400 L 400 400 Z" fill="#d98f72" stroke={KC.ink} strokeWidth={5} />
    <rect x={180} y={310} width={40} height={90} fill={SUDOR} opacity={0.4} />
    <path d="M 60 300 Q 60 160 200 150 Q 340 160 340 300 Z" fill="rgba(127,200,255,.28)" stroke="#bfe8ff" strokeWidth={4} />
    <Precursor T={T} x={200} y={240} tipo="tiol" s={0.6} corte={c} vuelo={v} vx={20} vy={-170} />
    <Bacteria x={90} y={255} rot={60} s={0.6} color={CORY} T={T} seed={2} flagelo={false} />
    <Racimo T={T} x={300} y={250} s={0.55} />
  </svg>;
}

function Desodorante() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Su: CUES.Sudor, Ba: CUES.Bacterias, Ol: CUES.Olor, De: CUES.Desodorante, An: CUES.Antitranspirante, Pr: CUES.Pregunta, Es: CUES.Estudio, Pb: CUES.Prueba, Cu: CUES.Curioso, Al: CUES.Aluminio, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.5;
  const AX = 590, AY = 1110;                      // axila en pantalla
  const brazo = kprog(T, K.G - 0.2, K.G + 0.55, kEase.sale);
  const micro = K.Su + 1.8;                        // entra al microscopio
  // precursores en la gota: [x, y, tipo, momento del corte, vuelo hacia (vx, vy)]
  const PRE = [[420, 930, 'tiol', K.Ba + 2.4, -40, -420], [600, 880, 'acido', K.Ba + 2.9, -150, -380], [700, 990, 'tiol', K.Ba + 3.4, -260, -470]];
  // iones de aluminio
  const R = krng(29);
  const IONES = Array.from({ length: 9 }, (_, i) => [540 + (R() - 0.5) * 360, 300 + R() * 160, K.An + 0.8 + i * 0.22]);
  const tapon = kprog(T, K.An + 1.6, K.An + 3.4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho (macro): la axila y el olor */}
      <Escena T={T} a={K.G} b={micro} zoom={0.06} origen="55% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Persona T={T} x={AX} y={AY} brazo={brazo} />
          <Ondas T={T} x={AX + 40} y={AY - 40} f={kprog(T, K.G + 0.35, K.G + 1.4) * (1 - kprog(T, K.Su + 0.6, K.Su + 1.2))} alto={300} />
          {[[30, 20], [-10, -60], [20, -100], [-30, -10], [10, 50]].map(([dx, dy], i) => { const on = kprog(T, K.G + 2.2 + i * 0.12, K.G + 2.5 + i * 0.12, kEase.rebote);
            return on > 0 ? <circle key={i} cx={AX + dx + Math.sin(T * 5 + i) * 3} cy={AY + dy} r={9 * on} fill={i % 2 ? HOMI : CORY} stroke={KC.ink} strokeWidth={3} /> : null; })}
        </SvgCapa>
        <BarraEsc txt="10 cm" largo={180} />
      </Escena>
      {/* 1–3 · al microscopio: la gota de sudor, las bacterias y el olor */}
      <Escena T={T} a={micro} b={K.De} zoom={0.04} origen="50% 55%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(191,232,255,.25)" />
        <SvgCapa>
          <PielCorte T={T} gota={kprog(T, micro, micro + 1.0, kEase.sale)}>
            {PRE.map(([x, y, tipo, tc, vx, vy], i) => <Precursor key={i} T={T} x={x} y={y} tipo={tipo} corte={kprog(T, tc, tc + 0.4)} vuelo={kprog(T, K.Ol + i * 0.3, K.Ol + 2.2 + i * 0.3)} vx={vx} vy={vy} fade={kprog(T, K.Ol + 1, K.Ol + 2) * 0.4} />)}
          </PielCorte>
          {[[200, 880, 70, 0], [880, 1000, -60, 1]].map(([x, y, r, i]) => { const e = kprog(T, K.Ba + 0.1 + i * 0.3, K.Ba + 1.2 + i * 0.3, kEase.sale);
            return <Bacteria key={i} x={klerp(x < 540 ? -120 : 1200, x, e) + Math.sin(T * 1.3 + i) * 6} y={y} rot={r} s={1} color={CORY} T={T} seed={i + 1} flagelo={false} />; })}
          {[[330, 1060, 0], [790, 830, 1]].map(([x, y, i]) => { const e = kprog(T, K.Ba + 0.4 + i * 0.3, K.Ba + 1.5 + i * 0.3, kEase.sale);
            return <Racimo key={i} T={T} x={klerp(x < 540 ? -150 : 1250, x, e)} y={y} s={0.9} seed={i} />; })}
          <Nube T={T} x={420} y={430} f={kprog(T, K.Ol + 1.2, K.Ol + 3.2)} r={170} color={OLOR} seed={4} />
          {[[K.Ba + 2.4, 400, 980], [K.Ba + 2.9, 580, 930], [K.Ba + 3.4, 680, 1040]].map(([t, x, y], i) => <Onomato key={i} T={T} at={t} until={t + 0.7} x={x} y={y} texto="¡clic!" color={KC.white} tam={52} rot={-10 + i * 8} />)}
        </SvgCapa>
        <BarraEsc txt="1 µm" largo={PX_UM} color={KC.texto} />
      </Escena>
      {/* 4 · desodorante */}
      <Escena T={T} a={K.De} b={K.An} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Barra x={270 + Math.sin(T * 3) * 8} y={960} rot={-8 + Math.sin(T * 3) * 4} texto="DESODORANTE" banda={KC.cyan} />
          <circle cx={740} cy={980} r={250} fill={KC.noche} stroke={KC.ink} strokeWidth={10} />
          <circle cx={740} cy={980} r={250} fill="none" stroke={KC.white} strokeWidth={6} opacity={0.7} />
          {(() => { const mata = kprog(T, K.De + 2.6, K.De + 3.8); return <g>
            <Bacteria x={650} y={1060} rot={30} s={0.8} color={CORY} T={T} seed={3} flagelo={false} vida={1 - mata * 0.75} />
            <Racimo T={T} x={830} y={1060} s={0.6} vida={1 - mata * 0.75} />
            <Nube T={T} x={740} y={880} f={1 - kprog(T, K.De + 1.0, K.De + 2.4) * 0.8} r={110} color={OLOR} seed={6} />
            {[[660, 860], [760, 820], [830, 900], [700, 940]].map(([x, y], i) => { const e = kprog(T, K.De + 1.0 + i * 0.2, K.De + 1.4 + i * 0.2, kEase.rebote);
              return e > 0 ? <Flor key={i} x={x} y={y} s={e * 0.9} rot={T * 20 + i * 40} /> : null; })}
            {[[600, 1000], [880, 980], [740, 1130], [700, 1050]].map(([x, y], i) => { const e = kprog(T, K.De + 2.4 + i * 0.15, K.De + 2.7 + i * 0.15);
              return e > 0 ? <Destello key={i} x={x} y={y} s={e * (0.8 + Math.sin(T * 10 + i) * 0.2)} color={KC.yellow} /> : null; })}
          </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 5 · antitranspirante: el tapón en el conducto del sudor */}
      <Escena T={T} a={K.An} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={640} width={KW} height={KH} fill="#d98f72" />
          <path d={`M 0 640 L ${KW} 640`} stroke={KC.ink} strokeWidth={10} />
          <rect x={495} y={640} width={90} height={500} fill="#2a3550" stroke={KC.ink} strokeWidth={8} />
          <path d="M 540 1140 q -120 20 -100 80 q 30 60 100 30 q 80 -30 120 30 q -20 70 -120 50" stroke="#2a3550" strokeWidth={70} fill="none" strokeLinecap="round" />
          {Array.from({ length: 8 }, (_, i) => { const per = 2.2, ph = ((T - K.An) / per + i / 8) % 1; const yy = klerp(1120, 560, ph); const limite = klerp(560, 800, tapon);
            const y2 = Math.max(yy, limite + (i % 3) * 36); return <circle key={i} cx={540 + Math.sin(T * 3 + i) * 14} cy={y2} r={20} fill={SUDOR} stroke={KC.ink} strokeWidth={4} />; })}
          {IONES.map(([x0, y0, t0], i) => { const u = kprog(T, t0, t0 + 1.3, kEase.suave); const tx = 520 + (i % 3) * 20, ty = 690 + Math.floor(i / 3) * 34;
            return T >= t0 ? <g key={i}><Atomo x={klerp(x0, tx, u)} y={klerp(y0, ty, u)} r={26} color="#d6dbe3" letra="Al" tam={22} /></g> : null; })}
          {tapon > 0 && <rect x={497} y={668} width={86} height={110 * tapon} rx={14} fill="rgba(160,168,180,.85)" stroke={KC.ink} strokeWidth={5} />}
        </SvgCapa>
        <Etq T={T} at={K.An + 0.5} until={K.Pr - 0.3} x={480} y={980} texto="conducto del sudor" lado="izq" tam={32} />
        <Etq T={T} at={K.An + 1.2} until={K.Pr - 0.3} x={600} y={560} texto="sales de aluminio" tam={32} color="#d6dbe3" />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Bacteria x={170} y={760} rot={-20} s={1.3} color={CORY} T={T} seed={4} flagelo={false} />
          <Racimo T={T} x={400} y={780} s={1.1} />
          <text x={270} y={1180} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 1000)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · el estudio de York (2020): la enzima de S. hominis */}
      <Escena T={T} a={K.Es} b={K.Pb}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {(() => { const ent = kprog(T, K.Es + 3.0, K.Es + 3.6, kEase.sale), mov = kprog(T, K.Es + 3.6, K.Es + 4.6, kEase.suave), c = kprog(T, K.Es + 4.6, K.Es + 5.0), v = kprog(T, K.Es + 5.0, K.Es + 6.8);
            return <g opacity={ent}>
              <Racimo T={T} x={260} y={920} s={1.7} />
              <Tijera x={klerp(330, 560, mov)} y={klerp(920, 960, mov)} s={1} abre={c > 0 ? 1 - c : Math.abs(Math.sin(T * 6))} />
              <Precursor T={T} x={680} y={960} tipo="tiol" s={1.1} corte={c} vuelo={v} vx={40} vy={-200} />
              <Nube T={T} x={720} y={780} f={v * 0.7} r={90} color={OLOR} seed={9} />
            </g>; })()}
        </SvgCapa>
        <Etq T={T} at={K.Es + 3.8} until={K.Pb - 0.3} x={300} y={1080} texto="enzima PatB" tam={34} color={KC.ink} />
      </Escena>
      {/* 8 · la prueba: el gen pasa a otra bacteria */}
      <Escena T={T} a={K.Pb} b={K.Cu}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Racimo T={T} x={230} y={900} s={1.4} />
          <Racimo T={T} x={830} y={960} s={1.4} color={AUR} seed={3} />
          <path d="M 300 820 Q 540 600 780 860" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="16 12" strokeDashoffset={-T * 40} opacity={kprog(T, K.Pb + 0.3, K.Pb + 0.6)} />
          {(() => { const u = kprog(T, K.Pb + 0.5, K.Pb + 1.9, kEase.suave); if (T < K.Pb + 0.4 || u >= 1) return null;
            const x = (1 - u) * (1 - u) * 300 + 2 * u * (1 - u) * 540 + u * u * 780, y = (1 - u) * (1 - u) * 820 + 2 * u * (1 - u) * 600 + u * u * 860; return <Gen x={x} y={y} T={T} />; })()}
          {(() => { const v = kprog(T, K.Pb + 2.1, K.Pb + 3.8); return v > 0 ? <g><Odorante x={850} y={klerp(860, 700, v)} tipo="tiol" s={0.9} brillo={T} /><Nube T={T} x={860} y={720} f={v * 0.7} r={100} color={OLOR} seed={11} /></g> : null; })()}
        </SvgCapa>
        <Etq T={T} at={K.Pb + 0.3} until={K.Cu - 0.3} x={200} y={1090} texto="S. hominis" it tam={34} color={KC.ink} />
        <Etq T={T} at={K.Pb + 0.6} until={K.Cu - 0.3} x={900} y={1150} texto="S. aureus (no lo hacía)" it lado="izq" tam={32} color={KC.ink} />
      </Escena>
      {/* 9 · lo curioso: antes que nuestra especie */}
      <Escena T={T} a={K.Cu} b={K.Al}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {(() => { const L = kprog(T, K.Cu + 0.2, K.Cu + 1.6, kEase.suave); return <g>
            <line x1={80} y1={1000} x2={80 + 900 * L} y2={1000} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
            <path d={`M ${80 + 900 * L} 975 l 34 25 l -34 25 Z`} fill={KC.ink} opacity={L} />
            <text x={90} y={1070} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={L}>antes</text>
            <text x={1000} y={1070} textAnchor="end" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Cu + 1.4, K.Cu + 1.8)}>ahora</text>
          </g>; })()}
          <Racimo T={T} x={200} y={880} s={1} />
          <Nube T={T} x={240} y={760} f={kprog(T, K.Cu + 0.4, K.Cu + 1.4) * 0.6} r={80} color={OLOR} seed={13} />
          {(() => { const e = kprog(T, K.Cu + 2.0, K.Cu + 2.8, kEase.rebote); return e > 0 ? <Personita x={klerp(1150, 880, e)} y={900} s={3} color={KC.orange} /> : null; })()}
        </SvgCapa>
        <Etq T={T} at={K.Cu + 2.6} until={K.Al - 0.3} x={820} y={1130} texto="nuestra especie" lado="izq" tam={34} color={KC.ink} />
      </Escena>
      {/* 10 · aluminio y cáncer de mama */}
      <Escena T={T} a={K.Al} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Barra x={240} y={960} texto="Al" banda="#d6dbe3" color={KC.white} />
          {(() => { const L = kprog(T, K.Al + 0.8, K.Al + 1.8, kEase.suave); return <g>
            <line x1={360} y1={940} x2={360 + 300 * L} y2={940} stroke="#6b6f78" strokeWidth={14} strokeDasharray="22 18" strokeLinecap="round" />
            <text x={510} y={900} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} opacity={L}>?</text>
          </g>; })()}
          {(() => { const e = kprog(T, K.Al + 1.2, K.Al + 1.7, kEase.rebote); return e > 0 ? <g transform={`translate(830 940) scale(${e})`}>
            <rect x={-160} y={-80} width={320} height={160} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <path d="M -20 -40 Q 0 -70 20 -40 L -10 40 M 20 -40 L -30 50" stroke="#ff6fa8" strokeWidth={14} fill="none" strokeLinecap="round" transform="translate(-95 0)" />
            <text x={30} y={-6} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>cáncer</text>
            <text x={30} y={40} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>de mama</text>
          </g> : null; })()}
        </SvgCapa>
      </Escena>
      {/* 11 · cierre: la misma axila, ahora leída por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="55% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Persona T={T} x={AX} y={AY} brazo={1} />
          <Ondas T={T} x={AX + 40} y={AY - 40} f={kprog(T, K.Ci + 0.2, K.Ci + 1.0)} alto={220} />
        </SvgCapa>
        <BarraEsc txt="10 cm" largo={180} />
      </Escena>

      {/* lupas (sobre las escenas macro) */}
      <Lupa T={T} at={K.Su + 0.1} until={micro - 0.2} x={800} y={860} r={190} fx={AX + 5} fy={AY - 20} interior={(Tl, r) => <MiniGota T={Tl} r={r} t0={K.Su} cortar={false} />} etiqueta="AL MICROSCOPIO · poro" tinte={KC.cyan} />
      <Lupa T={T} at={K.Ci + 0.6} until={FIN} x={820} y={880} r={180} fx={AX + 5} fy={AY - 20} interior={(Tl, r) => <MiniGota T={Tl} r={r} t0={K.Ci + 0.6} />} etiqueta="AL MICROSCOPIO" tinte={KC.mint} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.9} until={K.Su - 0.2} texto="huele tu sudor" x={790} y={1060} tam={40} />
      <Chip T={T} at={K.G + 2.6} until={K.Su - 0.2} texto="huelen las bacterias" y={1500} tam={42} borde={OLOR} />
      <Chip T={T} at={micro + 0.9} until={K.Ba - 0.2} texto="sudor fresco: sin olor" y={1500} tam={42} borde={SUDOR} />
      <Etq T={T} at={micro + 1.4} until={K.Ba + 2.2} x={330} y={1010} texto="aminoácidos" lado="izq" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Ba + 1.1} until={K.Ol - 0.2} x={130} y={800} texto="Corynebacterium" it tam={32} />
      <Etq T={T} at={K.Ba + 1.5} until={K.Ol - 0.2} x={930} y={720} texto="Staphylococcus hominis" it lado="izq" tam={32} />
      <Chip T={T} at={K.Ba + 2.3} until={K.Ol - 0.2} texto="las enzimas cortan" y={1500} tam={42} borde={ENZ} />
      <Chip T={T} at={K.Ol + 0.3} until={K.De - 0.2} texto="ácidos + tioalcoholes (S = azufre)" y={1500} tam={36} borde={OLOR} />
      <Chip T={T} at={K.De + 0.3} until={K.De + 2.3} texto="desodorante = cosmético (FDA)" y={1500} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.De + 2.5} until={K.An - 0.2} texto="perfume + antimicrobianos" y={1500} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.An + 0.3} until={K.An + 3.2} texto="antitranspirante = medicamento (FDA)" y={1500} tam={34} borde="#d6dbe3" />
      <Chip T={T} at={K.An + 3.4} until={K.Pr - 0.2} texto="tapón temporal" y={1500} tam={46} borde="#d6dbe3" />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.9} anio="2020" quien="Universidad de York · Inglaterra" revista="Rudden et al. · Scientific Reports" y={920} />
      <Chip T={T} at={K.Es + 5.0} until={K.Pb - 0.2} texto="suelta el tioalcohol" y={1500} tam={44} borde={ENZ} />
      <Chip T={T} at={K.Pb + 2.4} until={K.Cu - 0.2} texto="3M3SH detectado" y={1500} tam={44} borde={OLOR} mono />
      <Chip T={T} at={K.Cu + 1.0} until={K.Al - 0.2} texto="hipótesis de los autores" y={1500} tam={42} borde={KC.lilac} />
      <TarjetaEstudio T={T} at={K.Al + 2.4} until={K.Ci - 0.3} anio="2026" quien="American Cancer Society" revista="evidencia limitada" y={1520} />
      <Etq T={T} at={K.Ci + 1.2} until={K.Ou} x={560} y={1200} texto="sudor: sin olor" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="el olor = química de bacterias" y={1500} tam={38} borde={OLOR} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Su - 0.1} texto="No es tu sudor: *son bacterias.*" />
      <Subtitulo T={T} idx={1} at={K.Su + 0.1} until={K.Ba - 0.1} texto="El sudor fresco *no huele.*" />
      <Subtitulo T={T} idx={2} at={K.Ba + 0.1} until={K.Ol - 0.1} texto="Bacterias que *las cortan.*" />
      <Subtitulo T={T} idx={3} at={K.Ol + 0.1} until={K.De - 0.1} texto="Ácidos y tioalcoholes: *apestan.*" />
      <Subtitulo T={T} idx={4} at={K.De + 0.1} until={K.An - 0.1} texto="Desodorante: *contra las bacterias.*" />
      <Subtitulo T={T} idx={5} at={K.An + 0.1} until={K.Pr - 0.1} texto="Antitranspirante: *tapón de aluminio.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cuál suelta *el peor olor?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Pb - 0.1} texto="York, 2020: *la enzima.*" />
      <Subtitulo T={T} idx={8} at={K.Pb + 0.1} until={K.Cu - 0.1} texto="Otra bacteria: *empezó a soltarlo.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Al - 0.1} texto="Proponen: *antes que nosotros.*" />
      <Subtitulo T={T} idx={10} at={K.Al + 0.1} until={K.Ci - 0.1} texto="Aluminio y cáncer: *poca evidencia.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es química *de tus bacterias.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Sudor + 2.2, CUES.Bacterias - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Bacterias + 1.8, CUES.Olor + 3.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Desodorante + 0.3, CUES.Antitranspirante - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Antitranspirante + 1.0, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.0, CUES.Prueba - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Prueba + 0.8, CUES.Curioso - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Curioso + 0.3, CUES.Aluminio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Aluminio + 0.5, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="29" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DesodoranteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Desodorante /></CompositionStage></div>;
}
window.DesodoranteApp = DesodoranteApp;
