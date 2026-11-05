// Shot Fungi Mati #66 · El hongo que vive en la cama del hospital: Candida auris — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const AU = { lev:'#c9a7ff', lev2:'#8f63e0', cama:'#e9eef5', metal:'#9aa7b8', sabana:'#8fd3ff', piel:'#f2c29b', rojo:'#ff3b2f' };

// Levadura ovalada de C. auris (sin hifas), con yema opcional.
function LevAuris({ x, y, s = 1, rot = 0, yema = 0, T = 0, seed = 1 }) {
  const w = Math.sin(T * 2 + seed) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${rot + w}) scale(${s})`}>
    {yema > 0 && <ellipse cx={30 + 12 * yema} cy={0} rx={14 * yema} ry={11 * yema} fill={AU.lev} stroke={KC.ink} strokeWidth={4} />}
    <ellipse rx={30} ry={21} fill={AU.lev} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-8} cy={-6} rx={8} ry={5} fill="rgba(255,255,255,.5)" />
  </g>;
}
// Puntitos morados (el hongo, a escala de "lo que no se ve", sobre algo).
function Puntos({ pts, p = 1, T = 0, r = 10, apaga = 0 }) {
  return <g>{pts.map(([x, y], i) => { const on = kclamp(p * pts.length - i, 0, 1) * (1 - kclamp(apaga * pts.length * 1.2 - i, 0, 1));
    return on > 0 ? <g key={i} opacity={on}><circle cx={x} cy={y} r={r * 2.2} fill={AU.lev} opacity=".25" /><circle cx={x} cy={y + Math.sin(T * 3 + i) * 2} r={r} fill={AU.lev2} stroke={KC.ink} strokeWidth={2.5} /></g> : null; })}</g>;
}
// Cama de hospital con paciente, barandal y monitor.
function Cama({ x, y, s = 1, T, tubos = 0 }) {
  const lat = (T % 1.0) < 0.12 ? 1 : 0;
  const ecg = Array.from({ length: 20 }, (_, i) => { const u = (i / 19 + T * 0.5) % 1; const pk = Math.abs(u - 0.5) < 0.04 ? -40 : 0; return `${i ? 'L' : 'M'} ${-90 + i * 9.5} ${pk}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* monitor */}
    <rect x={300} y={-300} width={200} height={150} rx={16} fill="#1d2333" stroke={KC.ink} strokeWidth={7} />
    <g transform="translate(400 -220)"><path d={ecg} stroke={KC.mint} strokeWidth={5} fill="none" /></g>
    <circle cx={480} cy={-170} r={8} fill={lat ? KC.red : '#5a2020'} />
    <rect x={392} y={-150} width={16} height={110} fill={AU.metal} stroke={KC.ink} strokeWidth={4} />
    {/* cama */}
    <rect x={-420} y={-40} width={840} height={70} rx={14} fill={AU.cama} stroke={KC.ink} strokeWidth={8} />
    <rect x={-440} y={-220} width={40} height={340} rx={10} fill={AU.metal} stroke={KC.ink} strokeWidth={6} />
    <rect x={-400} y={30} width={20} height={130} fill={AU.metal} stroke={KC.ink} strokeWidth={5} />
    <rect x={380} y={30} width={20} height={130} fill={AU.metal} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-390} cy={170} r={18} fill="#444" stroke={KC.ink} strokeWidth={4} /><circle cx={390} cy={170} r={18} fill="#444" stroke={KC.ink} strokeWidth={4} />
    {/* paciente */}
    <ellipse cx={-300} cy={-80} rx={70} ry={40} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-290} cy={-130} r={58} fill={AU.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -315 -135 q 10 6 20 0 M -280 -135 q 10 6 20 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d={`M -250 -60 Q 0 ${-130 - 4 * Math.sin(T * 1.6)} 380 -60 L 380 -30 L -250 -30 Z`} fill={AU.sabana} stroke={KC.ink} strokeWidth={7} />
    <path d="M -230 -70 Q -120 -50 -40 -60" stroke={AU.piel} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M -230 -70 Q -120 -50 -40 -60" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".5" />
    {/* barandal */}
    <rect x={-150} y={-170} width={420} height={18} rx={9} fill={AU.metal} stroke={KC.ink} strokeWidth={5} />
    {[-130, -40, 50, 140, 240].map((bx, i) => <rect key={i} x={bx} y={-160} width={12} height={120} fill={AU.metal} stroke={KC.ink} strokeWidth={3} />)}
    {tubos > 0 && <g opacity={tubos}>
      <path d="M 400 -150 Q 300 -160 -80 -60" stroke="#cfe9ff" strokeWidth={8} fill="none" />
      <path d="M -260 -110 Q -200 -200 -130 -230" stroke="#cfe9ff" strokeWidth={10} fill="none" />
      <rect x={-150} y={-260} width={40} height={60} rx={8} fill="#cfe9ff" stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
const PTS_PAC = [[-200, -70], [-150, -62], [-100, -60], [-240, -120], [-180, -100]];
const PTS_BAR = [[-120, -162], [-40, -160], [40, -164], [120, -161], [200, -163], [250, -160]];
const enCama = (pts, x, y, s) => pts.map(([a, b]) => [x + a * s, y + b * s]);

function Oreja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -200 Q 150 -210 160 -40 Q 165 80 70 150 Q 30 190 -10 170 Q -40 150 -20 110 Q 10 60 -30 30 Q -80 -10 -70 -100 Q -60 -190 0 -200 Z" fill={AU.piel} stroke={KC.ink} strokeWidth={9} />
    <path d="M 10 -150 Q 100 -150 105 -50 Q 108 20 60 60" stroke="#d98f6b" strokeWidth={14} fill="none" strokeLinecap="round" />
    <ellipse cx={20} cy={0} rx={26} ry={34} fill="#5a2a20" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Globo({ x, y, r = 300, T, p = 1 }) {
  const P4 = [[-0.15, -0.52, '#ff8a1f', 'Japón', 0.62, -0.38], [0.26, -0.2, '#ff2d78', 'India/Pakistán', 0.3, -0.05], [0.0, 0.55, '#2fe0a8', 'Sudáfrica', -0.05, 0.42], [-0.62, 0.2, '#ffe11a', 'Venezuela', -0.6, 0.05]];
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#3b6bd6" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${-r * 0.8} ${-r * 0.1} Q ${-r * 0.6} ${-r * 0.5} ${-r * 0.4} ${-r * 0.1} Q ${-r * 0.45} ${r * 0.4} ${-r * 0.55} ${r * 0.6} Q ${-r * 0.75} ${r * 0.3} ${-r * 0.8} ${-r * 0.1} Z`} fill="#62c46f" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-r * 0.2} ${-r * 0.6} Q ${r * 0.3} ${-r * 0.8} ${r * 0.75} ${-r * 0.4} Q ${r * 0.6} ${-r * 0.05} ${r * 0.3} ${0} Q ${r * 0.2} ${r * 0.3} ${r * 0.05} ${r * 0.7} Q ${-r * 0.15} ${r * 0.3} ${-r * 0.1} ${-r * 0.1} Q ${-r * 0.3} ${-r * 0.3} ${-r * 0.2} ${-r * 0.6} Z`} fill="#62c46f" stroke={KC.ink} strokeWidth={5} />
    {P4.map(([a, b, c, n, la, lb], i) => { const on = kclamp(p * 4 - i, 0, 1); return on > 0 ? <g key={i} opacity={on}>
      <circle cx={a * r} cy={b * r} r={26 + 8 * Math.sin(T * 4 + i)} fill={c} opacity=".35" /><circle cx={a * r} cy={b * r} r={18} fill={c} stroke={KC.ink} strokeWidth={4} />
      <text x={la * r + (la < 0 ? 0 : 0)} y={lb * r} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{n}</text></g> : null; })}
  </g>;
}
function Silueta({ x, y, s = 1, p = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={80} fill={AU.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 -230 L 130 -230 L 220 40 L 170 60 L 110 -120 L 110 120 L 140 420 L 50 420 L 0 160 L -50 420 L -140 420 L -110 120 L -110 -120 L -170 60 L -220 40 Z" fill="#8fb6ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-115, -170], [115, -170], [0, 140]].map(([a, b], i) => { const on = kclamp(p * 3 - i, 0, 1); return on > 0 ? <g key={i} opacity={on}>
      <circle cx={a} cy={b} r={44} fill="none" stroke={KC.gold2} strokeWidth={8} strokeDasharray="12 8" /><circle cx={a} cy={b} r={10} fill={AU.lev2} stroke={KC.ink} strokeWidth={3} /></g> : null; })}
  </g>;
}
function Icono({ x, y, tipo, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={130} fill={on > 0.5 ? '#fff' : 'rgba(255,255,255,.6)'} stroke={KC.ink} strokeWidth={8} />
    {tipo === 'barandal' && <g><rect x={-90} y={-40} width={180} height={18} rx={9} fill={AU.metal} stroke={KC.ink} strokeWidth={5} />{[-70, -25, 20, 65].map((bx, i) => <rect key={i} x={bx} y={-26} width={12} height={80} fill={AU.metal} stroke={KC.ink} strokeWidth={3} />)}</g>}
    {tipo === 'perilla' && <g><rect x={-60} y={-80} width={30} height={160} rx={8} fill="#c98b2b" stroke={KC.ink} strokeWidth={5} /><circle cx={10} cy={0} r={42} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} /></g>}
    {tipo === 'presion' && <g><rect x={-80} y={-30} width={120} height={60} rx={14} fill="#4a5fd0" stroke={KC.ink} strokeWidth={5} /><path d="M 40 0 Q 70 0 70 40" stroke={KC.ink} strokeWidth={5} fill="none" /><circle cx={70} cy={60} r={22} fill="#222" stroke={KC.ink} strokeWidth={4} /><circle cx={-20} cy={-70} r={30} fill="#fff" stroke={KC.ink} strokeWidth={5} /><line x1={-20} y1={-70} x2={-5} y2={-85} stroke={KC.red} strokeWidth={4} /></g>}
    {on > 0 && <Puntos pts={[[-60, 70], [50, -80], [70, 60], [-80, -50]]} p={on} r={9} />}
  </g>;
}
function FrascoMed({ x, y, s = 1, texto, color = KC.orange }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-150} width={100} height={40} rx={10} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-115} width={160} height={230} rx={28} fill={color} stroke={KC.ink} strokeWidth={7} />
    <rect x={-66} y={-50} width={132} height={90} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={5} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
function Camita({ x, y, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-50} y={-10} width={100} height={22} rx={6} fill={on ? '#fff' : 'rgba(255,255,255,.5)'} stroke={KC.ink} strokeWidth={4} />
    <rect x={-50} y={-40} width={10} height={60} fill={AU.metal} stroke={KC.ink} strokeWidth={3} />
    <circle cx={-26} cy={-22} r={14} fill={AU.piel} stroke={KC.ink} strokeWidth={3} />
    <rect x={-12} y={-30} width={60} height={22} rx={8} fill={on ? AU.lev : '#cfd6e0'} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

function AurisShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Ct: CUES.Continentes, Pi: CUES.Piel, Su: CUES.Superficies, Gr: CUES.Graves, P: CUES.Pregunta, Re: CUES.Resiste, Tr: CUES.Tres, Cf: CUES.Confunde, E: CUES.Estudio, D: CUES.Desinfecta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const CX = 450, CY = 920, CS = 0.85;

  const interiorOreja = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill={KC.noche} />
    {[[150, 170, 0, 1], [300, 140, 30, 0], [440, 210, -20, 1], [200, 330, 15, 0], [360, 320, -10, 1], [480, 400, 40, 0], [140, 460, -30, 0], [300, 470, 10, 1]].map(([x, y, rt, yv], i) =>
      <LevAuris key={i} x={x} y={y} s={1.6} rot={rt} yema={yv * (0.5 + 0.5 * Math.sin(t * 1.5 + i))} T={t} seed={i} />)}
  </svg>;
  const interiorBarandal = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#2b3240" />
    <rect x={0} y={260} width={600} height={90} fill={AU.metal} stroke={KC.ink} strokeWidth={6} />
    {[[90, 280], [220, 300], [350, 275], [480, 305], [160, 320], [420, 322]].map(([x, y], i) => { const v = 1 - kprog(t, K.C + 1.5 + i * 0.12, K.C + 2.0 + i * 0.12);
      return v > 0 ? <g key={i} opacity={v}><LevAuris x={x} y={y} s={1.3} rot={i * 20} T={t} seed={i} /></g> : null; })}
  </svg>;

  const pCama = kprog(T, K.G + 0.5, K.G + 2.4);
  const nC = Math.floor(12 * kprog(T, K.E + 1.4, K.E + 3.6));
  const fBar = (i) => kprog(T, K.Re + 0.6 + i * 0.4, K.Re + 1.8 + i * 0.4, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el hongo en el paciente… y en su cama */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cama x={CX} y={CY} s={CS} T={T} />
          <Puntos pts={enCama(PTS_PAC, CX, CY, CS)} p={kprog(T, K.G + 0.3, K.G + 1.0)} T={T} />
          <Puntos pts={enCama(PTS_BAR, CX, CY, CS)} p={kprog(T, K.G + 1.6, K.G + 2.6)} T={T} />
        </>)}
      </Escena>
      {/* 1 · nombre: 2009, oído, Japón */}
      <Escena T={T} a={K.N} b={K.Ct} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Oreja x={260} y={960} s={1.3} />)}
        <Lupa T={T} at={K.N + 0.8} until={K.Ct - 0.2} x={760} y={900} r={200} fx={286} fy={960} interior={interiorOreja} tinte={KC.lilac} etiqueta="AL MICROSCOPIO" />
      </Escena>
      {/* 2 · tres continentes, poblaciones separadas */}
      <Escena T={T} a={K.Ct} b={K.Pi} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Globo x={540} y={900} r={330} T={T} p={kprog(T, K.Ct + 0.3, K.Ct + 2.2)} />)}
      </Escena>
      {/* 3 · en la piel: axilas e ingles, sin síntomas */}
      <Escena T={T} a={K.Pi} b={K.Su} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Silueta x={360} y={950} s={0.95} p={kprog(T, K.Pi + 0.4, K.Pi + 2.0)} />)}
      </Escena>
      {/* 4 · semanas en superficies */}
      <Escena T={T} a={K.Su} b={K.Gr} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Icono x={220} y={820} tipo="barandal" on={kprog(T, K.Su + 0.3, K.Su + 1.0)} />
          <Icono x={540} y={1040} tipo="perilla" on={kprog(T, K.Su + 1.0, K.Su + 1.7)} />
          <Icono x={860} y={820} tipo="presion" on={kprog(T, K.Su + 1.7, K.Su + 2.4)} />
        </>)}
      </Escena>
      {/* 5 · casi todos los que enferman ya estaban muy graves */}
      <Escena T={T} a={K.Gr} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Cama x={CX} y={CY} s={CS} T={T} tubos={kprog(T, K.Gr + 0.4, K.Gr + 1.4)} />)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Re} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Interrogacion T={T} x={250} y={1080} tam={460} />)}
      </Escena>
      {/* 7 · resistencia en EE. UU. */}
      <Escena T={T} a={K.Re} b={K.Tr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <line x1={120} y1={1080} x2={960} y2={1080} stroke="rgba(255,255,255,.6)" strokeWidth={6} />
          {[[200, 90, 'fluconazol', KC.red], [620, 30, 'anfotericina B', KC.orange]].map(([x, v, et, c], i) => { const p = fBar(i), h = v * 4.4 * p;
            return <g key={i}><rect x={x} y={1080 - h} width={260} height={h} rx={10} fill={c} stroke={KC.ink} strokeWidth={6} />
              {p > 0 && <text x={x + 130} y={1080 - h - 22} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.texto}>{`~${Math.round(v * p)} %`}</text>}
              <text x={x + 130} y={1125} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{et}</text></g>; })}
        </>)}
      </Escena>
      {/* 8 · algunas cepas resisten las tres clases */}
      <Escena T={T} a={K.Tr} b={K.Cf} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <LevAuris x={540} y={760} s={3.2} T={T} yema={0.6} />
          {[['azoles', 200, KC.orange], ['polienos', 540, KC.cyan], ['equinocandinas', 880, KC.pink]].map(([n, x, c], i) => { const u = kprog(T, K.Tr + 0.4 + i * 0.6, K.Tr + 1.2 + i * 0.6);
            const yy = u < 0.5 ? klerp(500, 700, u * 2) : klerp(700, 540, (u - 0.5) * 2), xx = klerp(x, x + (540 - x) * 0.5, u < 0.5 ? u * 2 : 1 - (u - 0.5) * 2);
            return <g key={i}><FrascoMed x={x} y={1060} s={0.8} texto={n} color={c} />
              {u > 0 && u < 1 && <rect x={xx - 18} y={yy - 18} width={36} height={36} transform={`rotate(45 ${xx} ${yy})`} fill={c} stroke={KC.ink} strokeWidth={4} />}</g>; })}
        </>)}
      </Escena>
      {/* 9 · las pruebas comunes pueden confundirla */}
      <Escena T={T} a={K.Cf} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={140} y={640} width={800} height={460} rx={30} fill="#d5dbe4" stroke={KC.ink} strokeWidth={9} />
          <rect x={200} y={700} width={680} height={300} rx={16} fill="#11303a" stroke={KC.ink} strokeWidth={6} />
          <text x={540} y={760} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#9fe6c8">RESULTADO:</text>
          <text x={540} y={860} textAnchor="middle" style={{ font:`italic 700 60px ${KF.mono}` }} fill="#9fe6c8" opacity={T < K.Cf + 2.2 ? 1 : 0.35}>C. haemulonii</text>
          {T > K.Cf + 1.6 && <line x1={250} y1={845} x2={klerp(250, 830, kprog(T, K.Cf + 1.6, K.Cf + 2.1))} y2={845} stroke={KC.red} strokeWidth={12} strokeLinecap="round" />}
          {T > K.Cf + 2.3 && <text x={540} y={960} textAnchor="middle" style={{ font:`italic 700 64px ${KF.mono}` }} fill={KC.gold2}>C. auris</text>}
          {[300, 420, 540].map((bx, i) => <circle key={i} cx={bx} cy={1050} r={26} fill={i === 0 ? KC.mint : '#8a93a3'} stroke={KC.ink} strokeWidth={5} />)}
        </>)}
      </Escena>
      {/* 10 · Monterrey 2020: 12 pacientes de terapia intensiva y muestras de sus cuartos */}
      <Escena T={T} a={K.E} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMexico x={60} y={560} ancho={460} conCA={false}>
            {(() => { const [mx, my] = mxProy(-100.3, 25.7); return <g><circle cx={mx} cy={my} r={16 + 4 * Math.sin(T * 4)} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>; })()}
          </MapaMexico>
          {Array.from({ length: 12 }, (_, i) => <Camita key={i} x={600 + (i % 3) * 140} y={640 + Math.floor(i / 3) * 110} on={i < nC} />)}
          {[0, 1, 2].map((i) => { const p = kprog(T, K.E + 3.8 + i * 0.3, K.E + 4.2 + i * 0.3, kEase.rebote); return p > 0 ? <g key={i} transform={`translate(${180 + i * 150} 1120) scale(${p})`}>
            <rect x={-24} y={-60} width={48} height={110} rx={12} fill="#e9f4ff" stroke={KC.ink} strokeWidth={5} /><rect x={-28} y={-74} width={56} height={22} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
            <circle cx={0} cy={10} r={12} fill={AU.lev2} stroke={KC.ink} strokeWidth={3} /></g> : null; })}
        </>)}
      </Escena>
      {/* 11 · solo amonio cuaternario no la elimina */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g transform="translate(260 960)">
            <rect x={-90} y={-120} width={180} height={300} rx={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
            <rect x={-40} y={-200} width={80} height={90} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} /><rect x={30} y={-195} width={70} height={26} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
            <rect x={-70} y={-40} width={140} height={120} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
            <text x={0} y={10} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>solo amonio</text>
            <text x={0} y={40} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>cuaternario</text>
          </g>
          {(() => { const p = kprog(T, K.D + 0.5, K.D + 1.6); return p > 0 ? <g>{Array.from({ length: 14 }, (_, i) => <circle key={i} cx={klerp(360, 560 + (i % 5) * 60, p)} cy={klerp(780, 700 + (i * 37) % 260, p)} r={6} fill="#dff6ff" opacity={1 - p * 0.6} />)}</g> : null; })()}
          <rect x={560} y={860} width={440} height={24} rx={12} fill={AU.metal} stroke={KC.ink} strokeWidth={5} />
          <Puntos pts={[[600, 872], [680, 868], [760, 875], [840, 870], [920, 873], [980, 869]]} p={1} T={T} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma cama; se limpia el barandal */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cama x={CX} y={CY} s={CS} T={T} />
          <Puntos pts={enCama(PTS_BAR, CX, CY, CS)} p={1} apaga={kprog(T, K.C + 1.5, K.C + 2.8)} T={T} />
          {(() => { const p = kprog(T, K.C + 1.4, K.C + 3.0, kEase.suave); return p > 0 && p < 1 ? <rect x={klerp(360, 800, p) - 60} y={CY - 200} width={120} height={60} rx={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} transform={`rotate(${Math.sin(T * 12) * 6} ${klerp(360, 800, p)} ${CY - 170})`} /> : null; })()}
        </>)}
        <Lupa T={T} at={K.C + 0.4} until={K.Ou} x={760} y={620} r={170} fx={CX + 60 * CS} fy={CY - 162 * CS} interior={interiorBarandal} tinte={KC.gold2} etiqueta="POR DENTRO · barandal" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.5} until={K.N - 0.2} texto="solo el paciente" x={290} y={470} tam={42} />
      <Chip T={T} at={K.G + 1.7} until={K.N - 0.2} texto="también su cama" x={290} y={560} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.N + 0.5} until={K.Ct - 0.3} x={60} y={650} texto="Candida auris" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.Ct - 0.3} x={60} y={700} texto="auris = oreja (latín)" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.N + 1.8} until={K.Ct - 0.2} anio="2009" quien="conducto del oído · hospital de Japón" revista="Satoh et al., Microbiol Immunol, 2009" y={420} />
      <Chip T={T} at={K.Ct + 2.3} until={K.Pi - 0.3} texto="poblaciones distintas, no un solo viaje" x={540} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Pi + 0.8} until={K.Su - 0.3} x={600} y={790} texto="axilas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Pi + 1.4} until={K.Su - 0.3} x={600} y={1090} texto="ingles" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Pi + 1.8} until={K.Su - 0.3} texto="sin síntomas (colonización)" x={760} y={980} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Su + 2.4} until={K.Gr - 0.3} texto="sobrevive semanas" x={540} y={600} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Su + 0.5} until={K.Gr - 0.3} x={100} y={990} texto="barandal" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Su + 1.2} until={K.Gr - 0.3} x={460} y={1210} texto="perilla" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Su + 1.9} until={K.Gr - 0.3} x={720} y={990} texto="baumanómetro" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Gr + 0.6} until={K.P - 0.3} texto="la mayoría: ya muy graves" x={300} y={470} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Gr + 1.4} until={K.P - 0.3} texto="gente sana: por lo general no lo porta" x={540} y={1170} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.Gr + 1.0} until={K.P - 0.3} x={60} y={640} texto="tubos y catéteres" tam={28} color={KC.ink} />
      <Chip T={T} at={K.P + 0.2} until={K.Re - 0.2} texto="“superhongo” (apodo)" x={420} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Re + 0.2} until={K.Tr - 0.3} texto="resistentes en EE. UU. · CDC" x={540} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Tr + 2.2} until={K.Cf - 0.3} texto="algunas cepas: resisten a las 3" x={540} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Cf + 2.6} until={K.E - 0.3} texto="se puede confundir con otras levaduras" x={540} y={1165} tam={30} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 3.5} anio="2020" quien="Monterrey · 12 pacientes de terapia intensiva" revista="Villanueva-Lozano et al., Clin Microbiol Infect, 2021" y={480} />
      <Etq T={T} at={K.E + 3.9} until={K.D - 0.3} x={560} y={1190} texto="3 muestras + en los cuartos" tam={26} color={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.D - 0.3} x={150} y={1010} texto="Monterrey" tam={28} color={KC.ink} />
      <Chip T={T} at={K.D + 1.8} until={K.C - 0.3} texto="no la elimina" x={780} y={760} tam={38} borde={KC.red} />
      <Chip T={T} at={K.D + 2.4} until={K.C - 0.3} texto="CDC: desinfectantes de la lista P de la EPA" x={540} y={1170} tam={26} borde={KC.mint} />
      <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="limpiar también su cama" x={300} y={470} tam={38} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="50 cm" largo={120} />
      <BarraEscala T={T} at={K.N} until={K.Ct} texto="2 cm" largo={110} />
      <BarraEscala T={T} at={K.Ct} until={K.Pi} texto="2,000 km" largo={100} />
      <BarraEscala T={T} at={K.Pi} until={K.Su} texto="50 cm" largo={110} />
      <BarraEscala T={T} at={K.Tr} until={K.Cf} texto="2 µm" largo={90} />
      <BarraEscala T={T} at={K.E} until={K.D} texto="500 km" largo={70} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={120} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="También vive *en su cama*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Ct - 0.1} texto="Candida auris: *el oído*, Japón" />
      <Subtitulo T={T} idx={2} at={K.Ct + 0.1} until={K.Pi - 0.1} texto="Surgió en *tres continentes*" />
      <Subtitulo T={T} idx={3} at={K.Pi + 0.1} until={K.Su - 0.1} texto="En la piel, *sin síntomas*" />
      <Subtitulo T={T} idx={4} at={K.Su + 0.1} until={K.Gr - 0.1} texto="Sobrevive *semanas*" />
      <Subtitulo T={T} idx={5} at={K.Gr + 0.1} until={K.P - 0.1} texto="Enferma a pacientes *muy graves*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Re - 0.1} texto="¿Por qué *superhongo?*" />
      <Subtitulo T={T} idx={7} at={K.Re + 0.1} until={K.Tr - 0.1} texto="*~90 %* resiste al fluconazol" />
      <Subtitulo T={T} idx={8} at={K.Tr + 0.1} until={K.Cf - 0.1} texto="Algunas resisten *las tres*" />
      <Subtitulo T={T} idx={9} at={K.Cf + 0.1} until={K.E - 0.1} texto="Las pruebas *pueden confundirla*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.D - 0.1} texto="Monterrey: *12 pacientes*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="Solo amonio *no la elimina*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Hay que *limpiar su cama*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.6, K.N + 1.7, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pi + 0.5, K.Su - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Gr + 0.6, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Re - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tr + 0.5, K.Cf - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Cf + 0.7, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.E + 3.6, K.D - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.D + 0.6, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.7, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="66" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AurisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AurisShot /></CompositionStage></div>;
}
window.AurisApp = AurisApp;
