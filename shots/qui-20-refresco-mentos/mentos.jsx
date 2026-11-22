// Shot Químico #20 · Esa fuente no es una reacción química (refresco de dieta y Mentos) — NARRADO (N5 experimento + capítulos N3).
// Guion y fuentes: guion.md · verificación: verificacion.md (Coffey, Am. J. Phys. 2008). El dibujo es esquemático.
// Sin marcas dibujadas: botella genérica de refresco y pastilla genérica.
const REF = '#4a2412', REF2 = '#7a4220', ESPUMA = '#f3e6c8';

// Botella PET de 2 L genérica. Origen = centro de la base; alto 640 a s = 1. Boca en y = -600.
const BOT_CUERPO = 'M -30 -600 L 30 -600 L 32 -560 Q 34 -520 60 -490 Q 98 -450 98 -380 L 98 -60 Q 98 -30 80 -14 Q 60 0 40 -6 Q 20 4 0 -4 Q -20 4 -40 -6 Q -60 0 -80 -14 Q -98 -30 -98 -60 L -98 -380 Q -98 -450 -60 -490 Q -34 -520 -32 -560 Z';
function BotellaPet({ T = 0, x, y, s = 1, rot = 0, nivel = 0.9, tapa = true, banda = KC.mint, txt = '2 L', burbujas = 0, children, id }) {
  const cid = 'bp' + (id || `${Math.round(x)}_${Math.round(y)}`);
  const yl = klerp(-8, -560, nivel);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <clipPath id={cid}><path d={BOT_CUERPO} /></clipPath>
    <path d={BOT_CUERPO} fill="rgba(235,250,245,.45)" />
    <g clipPath={`url(#${cid})`}>
      <rect x={-100} y={yl} width={200} height={-yl + 10} fill={REF} />
      <path d={`M -100 ${yl} Q -50 ${yl - 6 + Math.sin(T * 5) * 4} 0 ${yl} T 100 ${yl}`} stroke={ESPUMA} strokeWidth={8} fill="none" opacity={0.7} />
      {burbujas > 0 && <Burbujas T={T} x={-90} y={yl} w={180} h={-yl} n={34} f={burbujas} color="rgba(255,236,200,.85)" vel={300} rmax={9} seed={Math.round(x)} />}
      {children}
    </g>
    <rect x={-98} y={-380} width={196} height={120} fill={banda} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-300} textAnchor="middle" style={{ font:`400 ${txt.length > 4 ? 44 : 64}px ${KF.titulo}` }} fill={KC.ink}>{txt}</text>
    <path d="M -72 -440 L -72 -400 M -72 -240 L -72 -90" stroke="rgba(255,255,255,.6)" strokeWidth={12} strokeLinecap="round" />
    <path d={BOT_CUERPO} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-40} y={-582} width={80} height={12} rx={5} fill="#e8e8e8" stroke={KC.ink} strokeWidth={5} />
    {tapa && <rect x={-36} y={-642} width={72} height={46} rx={9} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />}
  </g>;
}
// Fuente vertical desde la boca (x, y). f = 0..1 del alto.
function Fuente({ T, x, y, alto, f = 1, ancho = 36, seed = 4 }) {
  if (f <= 0) return null;
  const H = alto * f, R = krng(seed);
  const L = [], Rr = [];
  for (let i = 0; i <= 14; i++) { const u = i / 14, yy = y - H * u, w = ancho * (0.7 + u * 1.3) + Math.sin(T * 22 + u * 9) * 5, cx = x + Math.sin(T * 7 + u * 5) * 9 * u;
    L.push(`${cx - w / 2} ${yy}`); Rr.unshift(`${cx + w / 2} ${yy}`); }
  const top = y - H;
  const gotas = Array.from({ length: 26 }, (_, i) => { const ph = R(), vx = (R() - 0.5) * 340, r = 6 + R() * 10, t = (T * 0.8 + ph) % 1;
    return <circle key={i} cx={x + vx * t} cy={top - 120 * t + 560 * t * t} r={r} fill={i % 3 ? REF2 : ESPUMA} stroke={KC.ink} strokeWidth={3} opacity={f} />; });
  return <g>
    <path d={'M ' + L.join(' L ') + ' L ' + Rr.join(' L ') + ' Z'} fill={REF2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: 12 }, (_, i) => { const u = i / 12; return <circle key={i} cx={x + Math.sin(T * 9 + i) * 8 * u} cy={y - H * u} r={ancho * (0.18 + u * 0.35)} fill={ESPUMA} opacity={0.75} />; })}
    {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + T * 2; return <circle key={'c' + i} cx={x + Math.cos(a) * ancho * 0.9} cy={top + Math.sin(a) * 18} r={ancho * 0.55} fill={ESPUMA} stroke={KC.ink} strokeWidth={4} />; })}
    {gotas}
  </g>;
}
// Chorro en arco (botella inclinada): de (x0,y0) a (x1, yg) con altura extra `alto`. f = cuánto ha avanzado.
function Arco({ T, x0, y0, x1, yg, alto, f = 1, grosor = 22, o = 1 }) {
  if (f <= 0 || o <= 0) return null;
  const pts = [];
  for (let i = 0; i <= 30; i++) { const u = (i / 30) * f; pts.push([klerp(x0, x1, u), klerp(y0, yg, u) - 4 * alto * u * (1 - u) + Math.sin(T * 20 + i) * 2]); }
  const d = 'M ' + pts.map((p) => p.join(' ')).join(' L ');
  const [ex, ey] = pts[pts.length - 1];
  return <g opacity={o}>
    <path d={d} stroke={KC.ink} strokeWidth={grosor + 10} fill="none" strokeLinecap="round" />
    <path d={d} stroke={REF2} strokeWidth={grosor} fill="none" strokeLinecap="round" />
    <path d={d} stroke={ESPUMA} strokeWidth={grosor * 0.3} fill="none" strokeLinecap="round" strokeDasharray="10 18" strokeDashoffset={-T * 200} />
    {f >= 1 && [0, 1, 2, 3, 4].map((k) => { const a = Math.PI * (0.15 + k * 0.17), t = (T * 1.6 + k * 0.2) % 1;
      return <circle key={k} cx={ex + Math.cos(a) * 60 * t * (k % 2 ? 1 : -1)} cy={ey - Math.sin(a) * 70 * t + 90 * t * t} r={7} fill={REF2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Pastilla de menta genérica (vista 3/4).
function Pastilla({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={12} rx={62} ry={24} fill="#d8d2c4" stroke={KC.ink} strokeWidth={6} />
    <rect x={-62} y={-8} width={124} height={20} fill="#d8d2c4" />
    <line x1={-62} y1={-8} x2={-62} y2={12} stroke={KC.ink} strokeWidth={6} /><line x1={62} y1={-8} x2={62} y2={12} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-8} rx={62} ry={24} fill="#fbf8f0" stroke={KC.ink} strokeWidth={6} />
    {[[-30, -10], [-8, -18], [14, -6], [32, -14], [-16, 2], [6, 6]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={2.5} fill="#bdb6a6" />)}
  </g>;
}
// Polvo de pastilla molida.
function Polvo({ x, y, s = 1, o = 1 }) {
  const R = krng(31);
  return <g opacity={o}>{Array.from({ length: 26 }, (_, i) => <circle key={i} cx={x + (R() - 0.5) * 70 * s} cy={y + (R() - 0.5) * 30 * s} r={(2 + R() * 4) * s} fill="#fbf8f0" stroke={KC.ink} strokeWidth={1.5} />)}</g>;
}
// Gota sobre una superficie con ángulo de contacto `ang` (grados). Base de semiancho a.
function GotaAngulo({ x, y, a = 110, ang = 85, color = '#7fc8ff', o = 1 }) {
  const th = ang * Math.PI / 180, R = a / Math.sin(th), h = R * (1 - Math.cos(th));
  return <g opacity={o}>
    <path d={`M ${x - a} ${y} A ${R} ${R} 0 ${ang > 90 ? 1 : 0} 1 ${x + a} ${y} Z`} fill={color} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={x - a * 0.35} cy={y - h * 0.6} rx={a * 0.14} ry={h * 0.12} fill="#fff" opacity={0.7} />
    <path d={`M ${x - a} ${y} L ${x - a + 70 * Math.cos(-th)} ${y + 70 * Math.sin(-th)}`} stroke={KC.red} strokeWidth={5} strokeLinecap="round" />
    <path d={`M ${x - a + 40} ${y} A 40 40 0 0 0 ${x - a + 40 * Math.cos(-th)} ${y + 40 * Math.sin(-th)}`} stroke={KC.red} strokeWidth={4} fill="none" />
  </g>;
}
// Manómetro (presión).
function Manometro({ T, x, y, v = 0, r = 64 }) {
  const a = klerp(-210, 30, v) * Math.PI / 180 + Math.sin(T * 30) * 0.03 * v;
  return <g>
    <circle cx={x} cy={y} r={r} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${x + Math.cos(-0.5) * r * 0.75} ${y + Math.sin(-0.5) * r * 0.75} A ${r * 0.75} ${r * 0.75} 0 0 1 ${x + Math.cos(0.5) * r * 0.75} ${y + Math.sin(0.5) * r * 0.75}`} stroke={KC.red} strokeWidth={10} fill="none" />
    <line x1={x} y1={y} x2={x + Math.cos(a) * r * 0.7} y2={y + Math.sin(a) * r * 0.7} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <circle cx={x} cy={y} r={9} fill={KC.ink} />
    <rect x={x - 12} y={y + r - 2} width={24} height={30} fill="#bbb" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Molécula de CO₂ chiquita (O=C=O) para escenas moleculares.
function CO2({ x, y, s = 0.5, rot = 0, o = 1 }) { return <Mol tipo="co2" x={x} y={y} s={s} rot={rot} o={o} />; }
// Interior de la lupa: CO₂ apretado entre el agua.
function InteriorGas(T, r) {
  const R = krng(17), W = r * 2;
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill={KC.noche} />
    {Array.from({ length: 30 }, (_, i) => { const x = 30 + R() * (W - 60), y = 30 + R() * (W - 60), ph = R() * 9, co = i % 3 === 0;
      const jx = Math.sin(T * 7 + ph) * 6, jy = Math.cos(T * 8 + ph) * 6;
      return co ? <CO2 key={i} x={x + jx} y={y + jy} s={0.5} rot={ph * 40 + T * 40} /> : <Mol key={i} tipo="agua" x={x + jx} y={y + jy} s={0.42} rot={ph * 50} o={0.55} />; })}
  </svg>;
}
// Interior de la lupa: superficie áspera del dulce donde nacen burbujas en los hoyos.
function InteriorRugoso(T, r, t0) {
  const W = r * 2, base = W * 0.66, R = krng(11);
  const pits = [0.22, 0.45, 0.66, 0.84];
  const pts = [];
  for (let x = 0; x <= W; x += 16) { const near = pits.some((p) => Math.abs(x - p * W) < 14); pts.push([x, base + (R() - 0.5) * 46 + (near ? 46 : 0)]); }
  const d = 'M 0 ' + W + ' L ' + pts.map((p) => p.join(' ')).join(' L ') + ` L ${W} ${W} Z`;
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill="#2a1408" />
    {Array.from({ length: 16 }, (_, i) => { const x = (i * 53) % W, y = 30 + ((i * 97) % (base - 60)); return <circle key={i} cx={x + Math.sin(T * 3 + i) * 8} cy={y + Math.cos(T * 2 + i) * 8} r={4} fill="#bfe8ff" opacity={0.6} />; })}
    <path d={d} fill="#efe9da" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {pits.map((p, k) => { if (T < t0) return null; const u = ((T - t0) / 1.4 + k * 0.27) % 1, rr = 6 + 36 * Math.min(u / 0.6, 1), sube = Math.max(0, (u - 0.6) / 0.4);
      const px = p * W, py = base + 24;
      return <circle key={k} cx={px + Math.sin(T * 4 + k) * 4 * sube} cy={py - rr - sube * 320} r={rr * (1 + sube * 0.4)} fill="rgba(255,255,255,.18)" stroke="#e8f6ff" strokeWidth={4} />; })}
    <rect x={24} y={W - 54} width={120} height={8} fill={KC.texto} />
    <text x={24} y={W - 64} style={{ font:`700 22px ${KF.mono}` }} fill={KC.texto}>1 µm</text>
  </svg>;
}
// Recuadro de pH.
function PhBox({ T, at, x, y, titulo, valor, color = KC.mint }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, width:230, transform:`translate(-50%,-50%) scale(${e})`, zIndex:41, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:20, textAlign:'center', padding:'8px 0 10px', boxShadow:`8px 8px 0 ${KC.ink}` }}>
    <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a' }}>{titulo}</div>
    <div style={{ font:`400 74px/1 ${KF.titulo}`, color }}><span style={{ fontSize:40 }}>pH </span>{valor}</div>
  </div>;
}
function Pasto({ y, color = KC.leaf }) {
  return <g><rect x={0} y={y} width={KW} height={KH - y} fill={color} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 28 }, (_, i) => <path key={i} d={`M ${i * 40 + 10} ${y} l 8 -22 l 8 22`} fill={color} stroke={KC.ink} strokeWidth={4} />)}</g>;
}
// Cinta métrica en metros sobre el piso.
function Cinta({ x0, y, pxm, n = 5 }) {
  return <g>{Array.from({ length: n + 1 }, (_, i) => <g key={i}>
    <line x1={x0 + i * pxm} y1={y} x2={x0 + i * pxm} y2={y + 18} stroke={KC.ink} strokeWidth={5} />
    <text x={x0 + i * pxm} y={y + 46} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{i} m</text></g>)}
    <line x1={x0} y1={y + 4} x2={x0 + n * pxm} y2={y + 4} stroke={KC.yellow} strokeWidth={10} /><line x1={x0} y1={y + 4} x2={x0 + n * pxm} y2={y + 4} stroke={KC.ink} strokeWidth={2} /></g>;
}

function Mentos() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ga: CUES.Gas, Bu: CUES.Burbuja, Ru: CUES.Rugoso, Ca: CUES.Cadena, Pr: CUES.Pregunta, Es: CUES.Estudio, Di: CUES.Dieta, Mo: CUES.Molido, Se: CUES.Seguridad, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // botella del inicio y del cierre
  const BX = 330, BY = 1640, BS = 1.1, BOCA = BY - 600 * BS;
  // escena Burbuja: moléculas que intentan juntarse
  const Rb = krng(23);
  const sueltas = Array.from({ length: 18 }, () => [80 + Rb() * 920, 600 + Rb() * 600, Rb() * 9]);
  const grupo = Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return [Math.cos(a), Math.sin(a)]; });
  const intento = (t0) => { const junta = kprog(T, t0, t0 + 0.7, kEase.suave), rompe = kprog(T, t0 + 0.8, t0 + 1.1, kEase.sale); return { d: klerp(220, 60, junta) + rompe * 260, burb: junta * (1 - rompe), o: 1 - rompe * 0.3 }; };
  const i1 = intento(K.Bu + 0.2), i2 = intento(K.Bu + 1.3);
  const nicho = kprog(T, K.Bu + 2.5, K.Bu + 3.6, kEase.sale);
  // estudio: setup aparece tras la tarjeta
  const setup = kprog(T, K.Es + 3.2, K.Es + 3.8);
  const pxft = 50, SBX = 170, SGY = 1180, SBS = 0.6, srot = 10, smx = SBX + Math.sin(srot * Math.PI / 180) * 600 * SBS, smy = SGY - Math.cos(srot * Math.PI / 180) * 600 * SBS;
  // dieta
  const gotasO = 1 - kprog(T, K.Di + 3.1, K.Di + 3.5);
  // molido
  const pxm = 165, X0 = 180, G1 = 900, G2 = 1140, ms = 0.35, mrot = 10;
  const mbx = 110, mmx = mbx + Math.sin(mrot * Math.PI / 180) * 600 * ms, mdy = Math.cos(mrot * Math.PI / 180) * 600 * ms;
  const lane2 = kprog(T, K.Mo + 2.6, K.Mo + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la fuente ya va saliendo */}
      <Escena T={T} a={K.G} b={K.Ga} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Pasto y={1640} />
          <Fuente T={T} x={BX} y={BOCA} alto={klerp(700, 560, kprog(T, 0, K.Ga))} f={1} />
          <BotellaPet T={T} x={BX} y={BY} s={BS} tapa={false} nivel={klerp(0.7, 0.4, kprog(T, 0, K.Ga))} burbujas={1} id="g0" />
          <Pastilla x={BX + 30} y={BY - 70} s={0.5} rot={20} />
          <g><rect x={560} y={1580} width={227} height={10} fill={KC.ink} /><text x={560} y={1566} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>10 cm</text></g>
        </SvgCapa>
      </Escena>
      {/* 1 · Gas: la botella cerrada, CO₂ a presión */}
      <Escena T={T} a={K.Ga} b={K.Bu}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Pasto y={1500} />
          <BotellaPet T={T} x={250} y={1500} s={0.95} nivel={0.88} id="ga" />
          <Manometro T={T} x={250} y={780} v={kprog(T, K.Ga + 0.4, K.Ga + 1.4, kEase.sale)} />
          <text x={170} y={690} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Ga + 1.2, K.Ga + 1.5)}>presión alta</text>
        </SvgCapa>
        <Lupa T={T} at={K.Ga + 0.6} until={K.Bu - 0.1} x={700} y={880} r={230} fx={250} fy={1250} interior={InteriorGas} tinte={KC.cyan} etiqueta="POR DENTRO · CO₂ disuelto" />
      </Escena>
      {/* 2 · Burbuja: no nace en el líquido liso; sí en un rincón */}
      <Escena T={T} a={K.Bu} b={K.Ru} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {sueltas.map(([x, y, ph], i) => <CO2 key={i} x={x + Math.sin(T * 1.5 + ph) * 30} y={y + Math.cos(T * 1.2 + ph) * 30} s={0.45} rot={ph * 40 + T * 30} o={0.6} />)}
          {[i1, i2].map((it, k) => (T >= K.Bu + 0.2 + k * 1.1 && T < K.Bu + 1.3 + k * 1.1) ? <g key={k} opacity={it.o}>
            {it.burb > 0.05 && <circle cx={540} cy={820} r={70 * it.burb} fill="rgba(255,255,255,.12)" stroke="#bfe8ff" strokeWidth={4} />}
            {grupo.map(([c, s], j) => <CO2 key={j} x={540 + c * it.d} y={820 + s * it.d} s={0.5} rot={j * 50 + T * 60} />)}
          </g> : null)}
          {nicho > 0 && <g opacity={nicho}>
            <path d="M 300 1160 L 470 1160 L 540 1040 L 610 1160 L 780 1160 L 780 1200 L 300 1200 Z" fill="#efe9da" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform="translate(0 -60)" />
            <circle cx={540} cy={1020 - 50 * nicho - 60} r={20 + 50 * nicho} fill="rgba(255,255,255,.15)" stroke="#e8f6ff" strokeWidth={5} />
          </g>}
        </SvgCapa>
        <Medidor T={T} at={K.Bu + 0.3} until={K.Ru - 0.2} valor={(t) => 0.9 - 0.55 * kprog(t, K.Bu + 2.6, K.Bu + 3.4)} etiqueta="trabajo para formar una burbuja" texto={(v) => (v > 0.6 ? 'ALTO' : 'MENOS')} x={90} y={1450} color={KC.red} />
      </Escena>
      {/* 3 · Rugoso: la pastilla al microscopio */}
      <Escena T={T} a={K.Ru} b={K.Ca}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Pastilla x={280} y={klerp(-120, 840, kprog(T, K.Ru - 0.2, K.Ru + 0.6, kEase.sale))} s={1.6} rot={klerp(-40, 8, kprog(T, K.Ru - 0.2, K.Ru + 0.6))} />
        </SvgCapa>
        <Lupa T={T} at={K.Ru + 1.0} until={K.Ca - 0.1} x={690} y={850} r={230} fx={360} fy={830} interior={(t, r) => InteriorRugoso(t, r, K.Ru + 1.6)} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · su superficie" />
      </Escena>
      {/* 4 · Cadena: las burbujas jalan más gas y sale la fuente */}
      <Escena T={T} a={K.Ca} b={K.Pr}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Fuente T={T} x={400} y={1640 - 600 * 1.15} alto={600} f={kprog(T, K.Ca + 2.4, K.Ca + 3.0, kEase.sale)} />
          <BotellaPet T={T} x={400} y={1640} s={1.15} tapa={false} nivel={klerp(0.9, 0.3, kprog(T, K.Ca + 2.6, K.Ca + 5.2))} burbujas={kprog(T, K.Ca + 0.5, K.Ca + 2.2)} id="ca">
            <Pastilla x={0} y={klerp(-540, -40, kprog(T, K.Ca + 0.2, K.Ca + 0.9))} s={0.55} rot={T * 40} />
            {Array.from({ length: 8 }, (_, i) => { const t0 = K.Ca + 1.0 + i * 0.25, u = kprog(T, t0, t0 + 1.4); return u > 0 && u < 1 ? <circle key={i} cx={Math.sin(i * 2) * 50} cy={klerp(-50, -560, u)} r={8 + u * 26} fill="rgba(255,240,210,.3)" stroke={ESPUMA} strokeWidth={4} /> : null; })}
          </BotellaPet>
        </SvgCapa>
        <Contador T={T} at={K.Ca + 0.9} desde={0} hasta={3.8} dur={2.6} dec={1} sufijo=" s" x={800} y={1060} tam={96} />
        <Etq T={T} at={K.Ca + 0.9} until={K.Pr} x={640} y={970} texto="cronómetro" tam={30} color={KC.ink} />
      </Escena>
      {/* 5 · Pregunta: ¿por qué el de dieta? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <BotellaPet T={T} x={170} y={1200} s={0.75} rot={Math.sin(T * 4) * 4} banda={KC.mint} txt="DIETA" id="p1" />
          <BotellaPet T={T} x={420} y={1200} s={0.75} rot={Math.sin(T * 4 + 1) * 4} banda={KC.yellow} txt="AZÚCAR" id="p2" />
          <text x={300} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 540)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · Estudio 2008: medición con banderitas y pH */}
      <Escena T={T} a={K.Es} b={K.Di} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={setup}>
            <Pasto y={SGY} />
            {Array.from({ length: 8 }, (_, i) => { const fx = smx + (i + 1) * 2 * pxft; return <g key={i}><line x1={fx} y1={SGY} x2={fx} y2={SGY - 50} stroke={KC.ink} strokeWidth={4} /><path d={`M ${fx} ${SGY - 50} l 26 9 l -26 9 Z`} fill={i % 2 ? KC.yellow : KC.red} stroke={KC.ink} strokeWidth={3} /></g>; })}
            <text x={smx + 15.3 * pxft + 20} y={SGY - 70} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Es + 5.8, K.Es + 6.1)}>15.3 pies</text>
            <Arco T={T} x0={smx} y0={smy} x1={smx + 15.3 * pxft} yg={SGY} alto={260} f={kprog(T, K.Es + 5.0, K.Es + 5.8)} o={1 - kprog(T, K.Es + 7.6, K.Es + 8.2)} />
            <path d={`M ${SBX - 60} ${SGY} L ${SBX - 20} ${SGY - 300} M ${SBX + 70} ${SGY} L ${SBX + 40} ${SGY - 300}`} stroke="#8a8f99" strokeWidth={12} strokeLinecap="round" />
            <BotellaPet T={T} x={SBX} y={SGY} s={SBS} rot={srot} tapa={false} nivel={klerp(0.9, 0.3, kprog(T, K.Es + 5.0, K.Es + 7.0))} burbujas={kprog(T, K.Es + 4.8, K.Es + 5.2)} id="es" />
          </g>
        </SvgCapa>
        <PhBox T={T} at={K.Es + 4.2} x={250} y={520} titulo="ANTES" valor="3.0" />
        <PhBox T={T} at={K.Es + 6.2} x={530} y={520} titulo="DESPUÉS" valor="3.0" />
      </Escena>
      {/* 7 · Dieta: gotas que se aplastan y distancia del chorro */}
      <Escena T={T} a={K.Di} b={K.Mo}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g opacity={gotasO}>
            <rect x={60} y={1000} width={960} height={40} rx={10} fill="#d7dbe2" stroke={KC.ink} strokeWidth={6} />
            {[[220, 85, '#7fc8ff', 'agua', 0.3], [540, 77, '#ffd27f', '+ aspartamo', 1.0], [860, 75, '#b9f0c8', '+ benzoato', 1.7]].map(([x, ang, c, t, d], i) => { const o = kprog(T, K.Di + d, K.Di + d + 0.35);
              return <g key={i} opacity={o}><GotaAngulo x={x} y={1000} a={110} ang={ang} color={c} />
                <text x={x} y={1090} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{t}</text>
                <text x={x} y={1130} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>{ang}°</text></g>; })}
          </g>
        </SvgCapa>
        <Comparativa T={T} at={K.Di + 3.3} until={K.Mo + 0.2} izq={{ valor: 15.3, texto: '15.3 pies', etiqueta: 'de dieta', color: KC.mint }} der={{ valor: 11.6, texto: '11.6 pies', etiqueta: 'con azúcar', color: KC.orange }} max={16} y={500} alto={340} />
      </Escena>
      {/* 8 · Molido: entero vs molido */}
      <Escena T={T} a={K.Mo} b={K.Se}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={0} y={G1} width={KW} height={14} fill={KC.ink} />
          <Cinta x0={X0} y={G1} pxm={pxm} />
          <Arco T={T} x0={mmx} y0={G1 - mdy} x1={X0 + 4.66 * pxm} yg={G1} alto={150} f={kprog(T, K.Mo + 0.3, K.Mo + 1.1)} grosor={16} />
          <BotellaPet T={T} x={mbx} y={G1} s={ms} rot={mrot} tapa={false} nivel={klerp(0.9, 0.3, kprog(T, K.Mo + 0.3, K.Mo + 1.5))} id="m1" />
          <Pastilla x={45} y={G1 - 40} s={0.32} />
          <text x={X0 + 4.66 * pxm} y={G1 - 40} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Mo + 1.1, K.Mo + 1.4)}>4.7 m</text>
          <g opacity={lane2}>
            <rect x={0} y={G2} width={KW} height={14} fill={KC.ink} />
            <Cinta x0={X0} y={G2} pxm={pxm} />
            <Arco T={T} x0={mmx} y0={G2 - mdy} x1={X0 + 0.3 * pxm} yg={G2} alto={30} f={kprog(T, K.Mo + 3.0, K.Mo + 3.4)} grosor={14} />
            <BotellaPet T={T} x={mbx} y={G2} s={ms} rot={mrot} tapa={false} nivel={0.8} id="m2" />
            <Polvo x={40} y={G2 - 30} s={0.7} />
            <text x={X0 + 0.3 * pxm + 40} y={G2 - 40} style={{ font:`400 54px ${KF.titulo}` }} fill={KC.red} opacity={kprog(T, K.Mo + 3.4, K.Mo + 3.7)}>30 cm</text>
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Mo + 0.4} until={K.Se} x={40} y={G1 - 300} texto="enteros" tam={34} color={KC.ink} />
        <Etq T={T} at={K.Mo + 2.8} until={K.Se} x={190} y={G2 - 140} texto="molidos" tam={34} color={KC.ink} />
      </Escena>
      {/* 9 · Seguridad */}
      <Escena T={T} a={K.Se} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <circle cx={180} cy={560} r={70 + Math.sin(T * 3) * 4} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
          <Pasto y={1150} />
          <rect x={110} y={900} width={40} height={250} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />
          <circle cx={130} cy={860} r={110} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
          <Fuente T={T} x={420} y={1150 - 600 * 0.5} alto={260} f={1} ancho={20} seed={9} />
          <BotellaPet T={T} x={420} y={1150} s={0.5} tapa={false} nivel={0.5} id="se" />
          <Personita x={880} y={1080} s={3.2} color={KC.pink} />
          <path d="M 540 1000 L 760 1000 M 540 1000 l 24 -16 M 540 1000 l 24 16 M 760 1000 l -24 -16 M 760 1000 l -24 16" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={kprog(T, K.Se + 1.0, K.Se + 1.3)} />
          <text x={650} y={970} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Se + 1.0, K.Se + 1.3)}>lejos</text>
          <Marca x={420} y={760} ok={true} s={0.8} o={kprog(T, K.Se + 0.3, K.Se + 0.6)} />
        </SvgCapa>
      </Escena>
      {/* 10 · Cierre: la botella del inicio, explicada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Pasto y={1640} />
          <Fuente T={T} x={BX} y={BOCA} alto={640} f={1} />
          <BotellaPet T={T} x={BX} y={BY} s={BS} tapa={false} nivel={0.45} burbujas={1} id="ci" />
          <Pastilla x={BX + 30} y={BY - 70} s={0.5} rot={20} />
        </SvgCapa>
        <Etq T={T} at={K.Ci + 0.6} until={FIN} x={400} y={560} texto="chorro" tam={36} color={KC.ink} />
        <Etq T={T} at={K.Ci + 1.4} until={FIN} x={440} y={1020} texto="burbujas" tam={36} color={KC.ink} />
        <Etq T={T} at={K.Ci + 2.2} until={FIN} x={440} y={1140} texto="CO₂ disuelto" tam={36} color={KC.ink} />
        <Etq T={T} at={K.Ci + 3.0} until={FIN} x={420} y={1570} texto="rincones del dulce" tam={36} color={KC.ink} />
      </Escena>

      {/* capítulos y textos */}
      <Capitulo T={T} hasta={K.Pr - 0.1} caps={[{ at: K.Ga, titulo: 'Gas' }, { at: K.Bu, titulo: 'Burbuja' }, { at: K.Ru, titulo: 'Rugoso' }, { at: K.Ca, titulo: 'Cadena' }]} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.G + 3.0} texto="¿reacción química?" x={770} y={960} tam={44} />
      <Chip T={T} at={K.G + 3.1} until={K.Ga - 0.3} texto="gas que ya estaba" x={770} y={960} tam={44} borde={KC.cyan} />
      <Chip T={T} at={K.Ga + 0.2} until={K.Ga + 2.0} texto="⏪ antes de abrir" x={540} y={470} tam={40} borde={KC.blue} />
      <Chip T={T} at={K.Bu + 3.0} until={K.Ru - 0.2} texto="en un rincón, sí" x={540} y={560} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Ru + 0.6} until={K.Ca - 0.2} x={90} y={1010} texto="1–2 cm" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ru + 2.4} until={K.Ca - 0.2} texto="rugosidad ≈ 0.44 µm" y={1480} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 3.4} until={K.Pr - 0.2} texto="sale más de 1 litro" x={760} y={1480} tam={40} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.6} anio="2008" quien="Coffey · Appalachian State" revista="Am. J. Phys. · publicado en 2008 · Boone, EE. UU." y={720} />
      <Chip T={T} at={K.Es + 1.6} until={K.Es + 3.6} texto="estudiantes de física" y={1000} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Es + 6.9} until={K.Es + 8.3} texto="pH igual → no es ácido-base ✗" y={1480} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Es + 8.4} until={K.Di - 0.2} texto="con bicarbonato: pH 6.1 (esa sí)" y={1480} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Di + 2.4} until={K.Di + 3.2} texto="cafeína: casi no influyó" y={760} tam={38} borde="#8a8f99" />
      <Medidor T={T} at={K.Di + 0.4} until={K.Di + 3.1} valor={(t) => 0.95 - 0.35 * kprog(t, K.Di + 0.8, K.Di + 2.2)} etiqueta="trabajo para formar burbuja" texto={(v) => (v > 0.8 ? 'agua pura' : 'baja')} x={90} y={1450} color={KC.orange} />
      <Chip T={T} at={K.Di + 3.6} until={K.Mo - 0.2} texto="distancia del chorro · promedio ±10 %" y={1480} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Mo + 4.4} until={K.Se - 0.2} texto="la entera cae en 0.7 s (en agua)" x={420} y={470} tam={32} borde={KC.blue} />
      <Chip T={T} at={K.Se + 0.4} until={K.Ci - 0.2} texto="afuera ✓" x={760} y={1480} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ga - 0.1} texto="No es química: *es gas.*" />
      <Subtitulo T={T} idx={1} at={K.Ga + 0.1} until={K.Bu - 0.1} texto="CO₂ disuelto, *a presión.*" />
      <Subtitulo T={T} idx={2} at={K.Bu + 0.1} until={K.Ru - 0.1} texto="Necesita *un rincón.*" />
      <Subtitulo T={T} idx={3} at={K.Ru + 0.1} until={K.Ca - 0.1} texto="El dulce es *áspero.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.Pr - 0.1} texto="En 4 s: *más de un litro.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Por qué *el de dieta?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Di - 0.1} texto="*No fue* ácido-base." />
      <Subtitulo T={T} idx={7} at={K.Di + 0.1} until={K.Mo - 0.1} texto="Burbujas *más fáciles.*" />
      <Subtitulo T={T} idx={8} at={K.Mo + 0.1} until={K.Se - 0.1} texto="Molidos: *30 cm.*" />
      <Subtitulo T={T} idx={9} at={K.Se + 0.1} until={K.Ci - 0.1} texto="*Afuera* y lejos." />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="*Gas* buscando salida." />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Burbuja + 0.2, CUES.Rugoso - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cadena + 0.8, CUES.Pregunta - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio - 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.6, CUES.Dieta - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Dieta + 0.4, CUES.Dieta + 3.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Molido + 1.2, CUES.Seguridad - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Seguridad + 0.2, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="20" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MentosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Mentos /></CompositionStage></div>;
}
window.MentosApp = MentosApp;
