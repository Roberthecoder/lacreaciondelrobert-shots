// Shot Químico #53 · Este huevo no está pelado (el vinagre, el cascarón y la ósmosis) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VINAGRE = '#f3efcf', JARABE = '#e0a136', AGUA = '#9fd8ff', CASCARA = '#f2e3c9', MEMB = '#fff4d6', YEMA = '#ffb21a';

// Contorno de huevo (más angosto arriba). arr = arrugas 0..1.
function huevoPath(rx, ry, arr = 0, ph = 0) {
  const n = 90, p = [];
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2, f = 1 + arr * (0.07 * Math.sin(9 * th + ph) + 0.035 * Math.sin(17 * th + ph * 2));
    p.push(`${(rx * Math.sin(th) * (1 - 0.12 * Math.cos(th)) * f).toFixed(1)} ${(-ry * Math.cos(th) * f).toFixed(1)}`);
  }
  return 'M ' + p.join(' L ') + ' Z';
}
// Huevo: cas = cascarón 0..1 (1 = huevo normal), inf = inflado (escala), arr = arrugado, sq = aplastado (rebote).
function Huevo({ x, y, s = 1, cas = 1, inf = 1, arr = 0, sq = 1, rot = 0, burb = 0, T = 0 }) {
  const RX = 110, RY = 145, d = huevoPath(RX, RY, arr, 1.3);
  const R = krng(11);
  const pecas = Array.from({ length: 14 }, () => [(R() - 0.5) * 150, (R() - 0.5) * 220, 3 + R() * 4]);
  const bs = Array.from({ length: 26 }, (_, i) => { const th = R() * Math.PI * 2; return [th, 6 + R() * 9, R() * 6, i / 26]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * inf / Math.sqrt(sq)} ${s * inf * sq})`}>
    <path d={d} fill="rgba(255,246,214,.78)" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={22} r={62} fill={YEMA} opacity={0.9 * (1 - cas)} />
    <path d={d} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={4} transform="scale(.93)" />
    <path d={huevoPath(RX * 0.82, RY * 0.82, arr, 2)} fill="rgba(255,255,255,.35)" />
    <ellipse cx={-42} cy={-62} rx={18} ry={36} fill="#fff" opacity={0.75} transform="rotate(20 -42 -62)" />
    {cas > 0 && <g opacity={cas}>
      <path d={d} fill={CASCARA} stroke={KC.ink} strokeWidth={8} />
      {pecas.map(([px, py, r], i) => <circle key={i} cx={px} cy={py} r={r} fill="#d9c09a" />)}
      <ellipse cx={-42} cy={-62} rx={16} ry={32} fill="#fff" opacity={0.6} transform="rotate(20 -42 -62)" />
    </g>}
    {burb > 0 && bs.map(([th, r, ph, q], i) => q < burb ? <circle key={i} cx={(RX + 6) * Math.sin(th) + Math.sin(T * 5 + ph) * 3} cy={-(RY + 6) * Math.cos(th) - ((T * 30 + ph * 10) % 18)} r={r} fill="rgba(255,255,255,.55)" stroke="#8fb6c9" strokeWidth={3} /> : null)}
  </g>;
}
// Cuchara que sostiene el huevo desde abajo (el mango sale hacia la izquierda arriba).
function Cuchara({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 120 L -300 -320" stroke="#b9c2cc" strokeWidth={26} strokeLinecap="round" />
    <path d="M -70 120 L -300 -320" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" opacity={0.0} />
    <ellipse cx={0} cy={150} rx={150} ry={46} fill="#d4dbe2" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Vaso con vinagre (o jarabe, o agua). x, y = centro de la base.
function Vaso({ x, y, s = 1, liquido = VINAGRE, nivel = 0.72, ancho = 380, alto = 500, etiqueta, children }) {
  return <g>
    <VasoLab x={x} y={y} s={s} liquido={liquido} nivel={nivel} ancho={ancho} alto={alto} marcas={false}>{children}</VasoLab>
    {etiqueta && <g transform={`translate(${x} ${y - alto * s * 0.09})`}>
      <rect x={-ancho * s * 0.32} y={-30} width={ancho * s * 0.64} height={60} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={13} textAnchor="middle" style={{ font:`900 ${Math.round(34 * s)}px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
    </g>}
  </g>;
}
// Reloj de días (pastilla con horas simuladas).
function RelojH({ T, at, until, horas, x = KW / 2, y = 330, pre = '', titulo = 'EN EL VINAGRE' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'fundido');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:'translate(-50%,-50%)', opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`700 22px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, letterSpacing:'.14em', marginBottom:4 }}>{titulo}</div>
    <div style={{ font:`700 64px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.65)', border:`4px solid ${KC.texto}`, borderRadius:16, padding:'2px 26px' }}>⏱ {pre}{Math.round(horas)} h</div>
  </div>;
}
// Moléculas propias
const QK = {
  acetico: { atomos: [[-40, 0, 30, QA.C, 'C'], [30, 0, 30, QA.C, 'C'], [62, -48, 28, QA.O, 'O'], [72, 40, 28, QA.O, 'O'], [118, 52, 18, QA.H, 'H'], [-80, -28, 18, QA.H, 'H'], [-80, 28, 18, QA.H, 'H'], [-40, -48, 18, QA.H, 'H']],
    enlaces: [[0, 1], [1, 2], [1, 3], [3, 4], [0, 5], [0, 6], [0, 7]] },
  carbonato: { atomos: [[0, 0, 22, QA.C, 'C'], [0, -40, 20, QA.O, 'O'], [35, 22, 20, QA.O, 'O'], [-35, 22, 20, QA.O, 'O']], enlaces: [[0, 1], [0, 2], [0, 3]] },
};
// Red de fibras de la membrana (dos capas). seed fija.
const FIBRAS = (() => { const R = krng(31), out = [];
  for (let i = 0; i < 46; i++) { const capa = i < 26 ? 0 : 1, y0 = capa ? 330 + R() * 200 : 120 + R() * 220, x0 = -60, x1 = 660, a = (R() - 0.5) * 260, b = (R() - 0.5) * 260;
    out.push({ capa, d: `M ${x0} ${y0} C ${x0 + 220} ${y0 + a} ${x1 - 220} ${y0 + b} ${x1} ${y0 + (R() - 0.5) * 120}`, w: capa ? 10 + R() * 6 : 16 + R() * 10, ph: R() * 6 }); }
  return out; })();

function HuevoVinagre() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Cascaron, Bu: CUES.Burbujas, Di: CUES.Dias, Me: CUES.Membrana, Pr: CUES.Pregunta, Os: CUES.Osmosis, Es: CUES.Estudio, Ja: CUES.Jarabe, Re: CUES.Rebote, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la cuchara saca el huevo desnudo del vinagre y se bambolea
  const sube = kprog(T, K.G, K.G + 0.7, kEase.sale);
  const bamb = Math.sin(T * 9) * 0.05 * Math.exp(-Math.max(0, T - K.G - 0.5) * 0.6);
  const yHuevo = klerp(1000, 690, sube);
  // cascarón: huevo normal que entra al vinagre
  const entra = kprog(T, K.Ca + 0.2, K.Ca + 1.0, kEase.suave);
  // días
  const dias = kprog(T, K.Di, K.Di + 4.2);
  // jarabe
  const arruga = kprog(T, K.Ja + 0.3, K.Ja + 2.4, kEase.suave), salto = kprog(T, K.Ja + 2.6, K.Ja + 3.2, kEase.suave), infla = kprog(T, K.Ja + 3.3, K.Ja + 5.0, kEase.sale);
  const xJ = klerp(300, 780, salto), yJ = 960 - Math.sin(salto * Math.PI) * 420;
  // rebote
  const tr = T - K.Re - 0.3;
  let yR = 760, sqR = 1;
  const SUELO = 1150 - 145 * 0.9;
  if (tr > 0) {
    if (tr < 0.35) yR = klerp(760, SUELO, (tr / 0.35) ** 2);
    else if (tr < 0.75) { const u = (tr - 0.35) / 0.4; yR = SUELO - Math.sin(u * Math.PI) * 120; }
    else if (tr < 1.05) { const u = (tr - 0.75) / 0.3; yR = SUELO - Math.sin(u * Math.PI) * 40; }
    else yR = SUELO;
    const imp = [0.35, 0.75, 1.05].reduce((a, t0) => a + Math.max(0, 1 - Math.abs(tr - t0) / 0.08) * (t0 === 0.35 ? 0.28 : 0.14), 0);
    sqR = 1 - imp; yR += imp * 60;
  }
  // burbujas (molecular): ácido que llega al cristal
  const sitios = [[300, 0], [420, 1], [540, 0], [660, 1], [780, 0], [480, 2], [600, 2]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el huevo desnudo sale del vinagre */}
      <Escena T={T} a={K.G} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vaso x={400} y={1190} s={1} etiqueta="vinagre" />
          <g transform={`rotate(${bamb * 60} 400 ${yHuevo + 150})`}>
            <Huevo x={400} y={yHuevo} s={0.95} cas={0} inf={1.05} sq={1 + bamb * 2} />
            <Cuchara x={400} y={yHuevo} s={0.95} />
          </g>
          <Goteo T={T} x={430} y0={yHuevo + 200} y1={1000} cada={0.35} color={VINAGRE} desde={K.G + 0.6} hasta={K.G + 4.5} />
        </SvgCapa>
      </Escena>
      {/* 1 · el cascarón: 95 % mineral */}
      <Escena T={T} a={K.Ca} b={K.Bu}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Vaso x={330} y={1190} s={0.9} etiqueta="vinagre" />
          <Huevo x={330} y={klerp(620, 1000, entra)} s={0.8} cas={1} rot={klerp(-20, 0, entra)} />
          {(() => { const f = 0.95 * kprog(T, K.Ca + 0.6, K.Ca + 1.8, kEase.sale), a = f * Math.PI * 2, r = 170, cx = 790, cy = 880;
            const x1 = cx + r * Math.sin(a), y1 = cy - r * Math.cos(a);
            return <g>
              <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
              {f > 0 && <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`} fill={CASCARA} stroke={KC.ink} strokeWidth={6} />}
              <text x={cx} y={cy + 20} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink}>{Math.round(f * 100)} %</text>
              <text x={cx} y={cy + 240} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>del cascarón:</text>
              <text x={cx} y={cy + 290} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>mineral</text>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: ácido acético + carbonato de calcio → CO₂ */}
      <Escena T={T} a={K.Bu} b={K.Di}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={150} y={1010} width={780} height={200} rx={20} fill="rgba(242,227,201,.12)" stroke={CASCARA} strokeWidth={4} strokeDasharray="14 10" />
          {Array.from({ length: 21 }, (_, i) => { const c = i % 7, f = Math.floor(i / 7), x = 240 + c * 100, y = 1050 + f * 65;
            const s = sitios.findIndex(([sx, sf]) => Math.abs(sx - x) < 70 && sf === f && f < 1);
            const t0 = s >= 0 ? K.Bu + 0.6 + s * 0.7 : Infinity, ido = kprog(T, t0 + 0.5, t0 + 1.0);
            return (c + f) % 2 ? <g key={i} opacity={1 - ido}><Mol tipo="carbonato" x={x} y={y - ido * 60} s={0.75} rot={i * 20} /></g>
              : <g key={i} opacity={1 - ido}><Atomo x={x + ido * 80} y={y} r={24} color={QA.Ca} letra="Ca" tam={20} /></g>; })}
          {sitios.slice(0, 5).map(([sx], i) => { const t0 = K.Bu + 0.6 + i * 0.7, baja = kprog(T, t0 - 0.9, t0, kEase.sale), gas = kprog(T, t0 + 0.4, t0 + 3.2, kEase.suave);
            return <g key={i}>
              {baja < 1 || T < t0 + 0.4 ? <Molecula {...QK.acetico} x={sx} y={klerp(460, 960, baja)} s={0.75} rot={i * 50 + T * 20} o={1 - kprog(T, t0 + 0.2, t0 + 0.5)} /> : null}
              {T > t0 + 0.4 && <g transform={`translate(${sx + Math.sin(T * 3 + i) * 14} ${klerp(990, 700, gas)})`} opacity={1 - kprog(T, t0 + 2.9, t0 + 3.3)}>
                <circle r={62 + gas * 18} fill="rgba(255,255,255,.1)" stroke="#bfe8ff" strokeWidth={5} /><Mol tipo="co2" x={0} y={0} s={0.6} /></g>}
            </g>; })}
        </SvgCapa>
        <Etq T={T} at={K.Bu + 0.3} until={K.Di - 0.2} x={150} y={1240} texto="cascarón: CaCO₃" color={CASCARA} tam={30} />
        <Etq T={T} at={K.Bu + 0.5} until={K.Bu + 2.4} x={90} y={440} texto="ácido acético (vinagre)" tam={30} color={KC.yellow} />
      </Escena>
      {/* 3 · días: se va el cascarón, queda la membrana */}
      <Escena T={T} a={K.Di} b={K.Me} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Vaso x={540} y={1190} s={1} etiqueta="vinagre" />
          <Huevo T={T} x={540} y={985 - Math.sin(T * 2) * 8} s={0.9} cas={1 - dias} burb={1} inf={1 + 0.04 * dias} />
          <Burbujas T={T} x={380} y={700} w={320} h={420} n={22} vel={120} seed={4} color="rgba(255,255,255,.85)" />
        </SvgCapa>
      </Escena>
      {/* 4 · la membrana: red de fibras de proteína */}
      <Escena T={T} a={K.Me} b={K.Pr} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <g transform="translate(240 560)">
            <rect x={-40} y={60} width={680} height={540} rx={40} fill="rgba(255,244,214,.06)" />
            {FIBRAS.map((f, i) => <path key={i} d={f.d} fill="none" stroke={f.capa ? '#f7d88a' : '#fff4d6'} strokeWidth={f.w} strokeLinecap="round"
              opacity={kprog(T, K.Me + 0.1 + i * 0.03, K.Me + 0.5 + i * 0.03) * (f.capa ? 0.85 : 0.7)} transform={`translate(${Math.sin(T * 0.8 + f.ph) * 5} 0)`} />)}
          </g>
          {(() => { const e = kprog(T, K.Me + 1.6, K.Me + 2.2, kEase.sale); return <g opacity={e}>
            <line x1={960} y1={640} x2={960} y2={640 + 480 * e} stroke={KC.gold2} strokeWidth={8} />
            <line x1={940} y1={640} x2={980} y2={640} stroke={KC.gold2} strokeWidth={8} />
            <line x1={940} y1={1120} x2={980} y2={1120} stroke={KC.gold2} strokeWidth={8} />
          </g>; })()}
        </SvgCapa>
        <Etq T={T} at={K.Me + 2.0} until={K.Pr - 0.2} x={1000} y={600} lado="izq" texto="grosor: 50–70 µm" color={KC.gold2} tam={38} />
        <Etq T={T} at={K.Me + 0.6} until={K.Pr - 0.2} x={150} y={640} texto="capa externa" tam={28} />
        <Etq T={T} at={K.Me + 1.0} until={K.Pr - 0.2} x={150} y={1150} texto="capa interna" tam={28} color="#f7d88a" />
      </Escena>
      {/* 5 · pregunta: ¿por qué sale más grande? */}
      <Escena T={T} a={K.Pr} b={K.Os} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Huevo x={150} y={880} s={0.62} cas={1} />
          <Huevo x={390} y={850} s={0.62} cas={0} inf={klerp(1, 1.2, kprog(T, K.Pr + 0.3, K.Pr + 1.2, kEase.rebote))} />
          <text x={150} y={1050} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>antes</text>
          <text x={390} y={1050} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>después</text>
          <text x={300} y={640} textAnchor="middle" style={{ font:`400 260px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 660)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · ósmosis: el agua cruza la membrana */}
      <Escena T={T} a={K.Os} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={60} y={680} width={460} height={500} rx={30} fill="rgba(159,216,255,.10)" />
          <rect x={560} y={680} width={460} height={500} rx={30} fill="rgba(255,244,214,.10)" />
          <path d={`M 540 670 ${Array.from({ length: 13 }, (_, i) => `Q ${540 + (i % 2 ? 22 : -22)} ${670 + i * 40 + 20} 540 ${670 + (i + 1) * 40}`).join(' ')}`} stroke="#fff4d6" strokeWidth={22} fill="none" strokeDasharray="34 12" />
          {(() => { const R = krng(9), out = [];
            for (let i = 0; i < 16; i++) out.push(<circle key={'s' + i} cx={600 + R() * 390} cy={720 + R() * 430} r={24} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`translate(${Math.sin(T * 2 + i) * 6} ${Math.cos(T * 2 + i) * 6})`} />);
            for (let i = 0; i < 26; i++) { const x0 = 90 + R() * 400, y0 = 720 + R() * 430, cruza = i < 12, t0 = K.Os + 0.8 + i * 0.25;
              const u = cruza ? kprog(T, t0, t0 + 1.4, kEase.suave) : 0, x = cruza ? klerp(x0, 600 + R() * 390, u) : x0;
              out.push(<circle key={'w' + i} cx={x + Math.sin(T * 3 + i) * 5} cy={y0 + Math.cos(T * 3 + i) * 5} r={13} fill={AGUA} stroke={KC.ink} strokeWidth={3} />); }
            return out; })()}
          {[0, 1, 2].map((i) => <path key={i} d={`M ${400} ${800 + i * 150} L ${690} ${800 + i * 150}`} stroke={AGUA} strokeWidth={8} strokeLinecap="round"
            opacity={kprog(T, K.Os + 1.5 + i * 0.3, K.Os + 2.0 + i * 0.3) * (0.5 + 0.5 * Math.sin(T * 5 + i))} markerEnd="" />)}
          {[0, 1, 2].map((i) => <path key={'p' + i} d={`M 690 ${780 + i * 150} L 720 ${800 + i * 150} L 690 ${820 + i * 150}`} stroke={AGUA} strokeWidth={8} fill="none" strokeLinecap="round" opacity={kprog(T, K.Os + 1.5 + i * 0.3, K.Os + 2.0 + i * 0.3)} />)}
        </SvgCapa>
        <Etq T={T} at={K.Os + 0.3} until={K.Es - 0.2} x={80} y={1215} texto="afuera" tam={30} color={AGUA} />
        <Etq T={T} at={K.Os + 0.5} until={K.Es - 0.2} x={1000} y={1215} lado="izq" texto="adentro del huevo" tam={30} color={KC.yellow} />
        <Etq T={T} at={K.Os + 2.2} until={K.Es - 0.2} x={560} y={640} texto="membrana" tam={30} color="#fff4d6" />
      </Escena>
      {/* 7 · 2026, Japón: agua y partículas a través de la membrana */}
      <Escena T={T} a={K.Es} b={K.Ja}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {(() => { const emp = kprog(T, K.Es + 3.4, K.Es + 7.6, kEase.suave); return <g opacity={kprog(T, K.Es + 3.0, K.Es + 3.5)}>
            <rect x={460} y={660} width={160} height={300} rx={10} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
            <rect x={470} y={klerp(700, 820, emp)} width={140} height={140 - klerp(0, 120, emp) + 120} fill="rgba(159,216,255,.6)" />
            <rect x={520} y={klerp(560, 680, emp) - 100} width={40} height={140} fill="#e5e5e5" stroke={KC.ink} strokeWidth={6} />
            <rect x={470} y={klerp(680, 800, emp)} width={140} height={24} rx={6} fill="#555" stroke={KC.ink} strokeWidth={5} />
            <rect x={440} y={960} width={200} height={40} rx={8} fill="#7d8a99" stroke={KC.ink} strokeWidth={6} />
            <rect x={455} y={968} width={170} height={20} fill={MEMB} stroke={KC.ink} strokeWidth={3} />
            <path d="M 470 1000 L 510 1060 L 570 1060 L 610 1000" fill="#7d8a99" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 8 }, (_, i) => <circle key={'g' + i} cx={490 + (i % 4) * 33} cy={klerp(900, 940, emp) - Math.floor(i / 4) * 34} r={14} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />)}
            {Array.from({ length: 10 }, (_, i) => { const t0 = K.Es + 4.0 + i * 0.35, u = kprog(T, t0, t0 + 1.2); return u > 0 && u < 1 ?
              <circle key={'c' + i} cx={540 + ((i % 3) - 1) * 14} cy={klerp(1000, 1200, u)} r={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={2} /> : null; })}
            <Goteo T={T} x={540} y0={1070} y1={1190} cada={0.5} color={AGUA} desde={K.Es + 3.6} hasta={K.Ja - 0.5} r={10} />
          </g>; })()}
        </SvgCapa>
        <Etq T={T} at={K.Es + 4.2} until={K.Ja - 0.2} x={440} y={880} lado="izq" texto="204 nm: se quedan" tam={28} color={KC.ink} />
        <Etq T={T} at={K.Es + 4.8} until={K.Ja - 0.2} x={590} y={1140} texto="14 nm: pasan" tam={28} color={KC.ink} />
      </Escena>
      {/* 8 · jarabe y agua */}
      <Escena T={T} a={K.Ja} b={K.Re}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vaso x={300} y={1190} s={0.85} liquido={JARABE} etiqueta="jarabe" />
          <rect x={300 - 160} y={1190 - 500 * 0.85 * 0.72 - 16 * arruga} width={320} height={16 * arruga + 2} fill={AGUA} opacity={0.9 * arruga} />
          <Vaso x={780} y={1190} s={0.85} liquido={AGUA} etiqueta="agua" />
          <Huevo x={xJ} y={yJ} s={0.78} cas={0} inf={salto < 1 ? klerp(1.04, 0.86, arruga) : klerp(0.86, 1.06, infla)} arr={salto < 1 ? arruga : 1 - infla} />
        </SvgCapa>
        <RelojH T={T} at={K.Ja + 0.2} until={K.Re - 0.3} horas={T < K.Ja + 2.6 ? klerp(0, 24, kprog(T, K.Ja + 0.3, K.Ja + 2.4)) : klerp(0, 24, kprog(T, K.Ja + 3.3, K.Ja + 5.0))} pre="+" titulo={T < K.Ja + 2.6 ? 'EN JARABE' : 'EN AGUA'} />
      </Escena>
      {/* 9 · rebote */}
      <Escena T={T} a={K.Re} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={0} y={1150} width={KW} height={240} fill="#c98b4f" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={540} cy={1158} rx={100 * (1 - (SUELO - yR) / 600)} ry={14} fill="rgba(0,0,0,.25)" />
          <Huevo x={540} y={yR} s={0.9} cas={0} sq={sqR} />
          {(() => { const l = kprog(T, K.Re + 2.4, K.Re + 2.9, kEase.sale); return l > 0 ? <g opacity={l}>
            <path d="M 120 640 L 120 700 L 200 700" stroke="#9aa3b5" strokeWidth={30} fill="none" strokeLinecap="round" />
            <Goteo T={T} x={200} y0={720} y1={1100} cada={0.25} color={AGUA} desde={K.Re + 2.6} hasta={K.Ci} />
          </g> : null; })()}
        </SvgCapa>
        <Onomato T={T} at={K.Re + 0.65} until={K.Re + 1.8} x={300} y={760} texto="¡BOING!" color={KC.pink} tam={90} />
      </Escena>
      {/* 10 · cierre: la imagen del inicio, transformada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vaso x={400} y={1190} s={1} etiqueta="vinagre" />
          <Burbujas T={T} x={240} y={880} w={320} h={280} n={14} vel={90} seed={6} color="rgba(255,255,255,.9)" />
          <g transform={`rotate(${Math.sin(T * 4) * 2} 400 840)`}>
            <Huevo x={400} y={690} s={0.95} cas={0} inf={1.05} />
            <Cuchara x={400} y={690} s={0.95} />
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Ci + 0.8} until={K.Ou} x={500} y={820} texto="membrana semipermeable" tam={26} color={KC.ink} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 3.2} texto="¿pelado?" x={300} y={440} tam={50} />
      <Chip T={T} at={K.G + 3.0} until={K.Ca - 0.3} texto="huevo crudo · sin cascarón" y={1500} tam={42} borde={KC.orange} />
      <Chip T={T} at={K.Ca + 1.8} until={K.Bu - 0.2} texto="casi todo: CaCO₃ (calcita)" y={1500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Bu + 2.4} until={K.Di - 0.2} texto="CaCO₃ + 2 CH₃COOH → Ca(CH₃COO)₂ + H₂O + CO₂" y={1500} tam={27} mono borde={KC.yellow} />
      <Chip T={T} at={K.Bu + 0.6} until={K.Bu + 2.3} texto="CO₂ = las burbujas" y={1500} tam={44} borde="#bfe8ff" />
      <RelojH T={T} at={K.Di} until={K.Me - 0.3} horas={48 * dias} x={400} y={420} />
      <Chip T={T} at={K.Di + 2.8} until={K.Me - 0.2} texto="queda la membrana" y={1500} tam={46} borde={KC.mint} />
      <Chip T={T} at={K.Me + 0.4} until={K.Pr - 0.2} texto="fibras de proteína · < 0.1 mm" y={1500} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.Pr + 0.4} until={K.Os - 0.2} texto="¿por qué creció?" x={300} y={1500} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.Os + 2.8} until={K.Es - 0.2} texto="ÓSMOSIS: el agua va a lo más concentrado" y={1500} tam={32} borde={AGUA} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.3} anio="2026" quien="Hagiri y Suzuki · Japón" revista="BMC Research Notes · membrana del huevo" y={900} />
      <Chip T={T} at={K.Es + 5.6} until={K.Ja - 0.2} texto="poros estimados: ≈ 100–200 nm" y={1500} tam={40} borde={KC.violet} />
      <Chip T={T} at={K.Ja + 0.8} until={K.Ja + 2.6} texto="el agua sale → se arruga" y={1500} tam={42} borde={JARABE} />
      <Chip T={T} at={K.Ja + 3.3} until={K.Re - 0.2} texto="el agua entra → se infla" y={1500} tam={42} borde={AGUA} />
      <Chip T={T} at={K.Re + 1.0} until={K.Re + 2.4} texto="solo desde muy poquito" y={1500} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.Re + 2.6} until={K.Ci - 0.2} texto="huevo crudo: lávate las manos 🧼" y={1500} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="CaCO₃ → CO₂ 🫧 · queda la membrana" y={1500} tam={36} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="No está pelado: *es vinagre.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.Bu - 0.1} texto="95 % mineral: *carbonato de calcio.*" />
      <Subtitulo T={T} idx={2} at={K.Bu + 0.1} until={K.Di - 0.1} texto="Las burbujas: *dióxido de carbono.*" />
      <Subtitulo T={T} idx={3} at={K.Di + 0.1} until={K.Me - 0.1} texto="Se va el cascarón, *queda la membrana.*" />
      <Subtitulo T={T} idx={4} at={K.Me + 0.1} until={K.Pr - 0.1} texto="Una red de *fibras de proteína.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Os - 0.1} texto="¿Por qué *sale más grande?*" />
      <Subtitulo T={T} idx={6} at={K.Os + 0.1} until={K.Es - 0.1} texto="El agua la cruza: *ósmosis.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ja - 0.1} texto="2026, Japón: *poros diminutos.*" />
      <Subtitulo T={T} idx={8} at={K.Ja + 0.1} until={K.Re - 0.1} texto="En jarabe *se arruga.*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Ci - 0.1} texto="¡Rebota! *Lávate las manos.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El vinagre *se comió el mineral.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cascaron + 0.8, CUES.Burbujas - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Burbujas + 1.5, CUES.Dias - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Dias + 0.5, CUES.Membrana - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Osmosis + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Osmosis + 1.5, CUES.Estudio - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Estudio + 3.6, CUES.Jarabe - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Jarabe + 0.5, CUES.Rebote - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Rebote + 0.3, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="53" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuevoVinagreApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HuevoVinagre /></CompositionStage></div>;
}
window.HuevoVinagreApp = HuevoVinagreApp;
