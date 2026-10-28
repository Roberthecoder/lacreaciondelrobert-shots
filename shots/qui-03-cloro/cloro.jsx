// Shot Químico #03 · ¿Por qué NO se mezcla el cloro con vinagre? — NARRADO (N3 capítulos + M2 "¿Por qué NO…?").
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VERDE = '#c8e65a', AZUL_CLORO = '#d9f0ff', VINAGRE = '#f3e7b0', AMONIACO = '#e3dcff';

// Escena de la cubeta (gancho y cierre). mezcla: 1 = cloro + vinagre (gas) · 0 = cloro + agua (bien).
function EscenaCubeta({ T, a, mezcla = 1, apartar = 0 }) {
  const vierte = kprog(T, a, a + 0.35, kEase.sale);
  const gas = mezcla * kprog(T, a + 1.2, a + 3.2, kEase.sale);
  const lado = (dx) => apartar * dx;
  return <SvgCapa>
    <Nube T={T} x={480} y={790 - gas * 120} f={gas} r={210} color={VERDE} seed={4} n={11} />
    <Cubeta x={480} y={1060} liquido={mezcla ? klerp(0, 1, gas) > 0.5 ? '#dfe9a0' : AZUL_CLORO : '#9fd8ff'} nivel={0.35 + 0.3 * kprog(T, a, a + 3)} />
    <Burbujas T={T} x={340} y={930} w={280} h={70} n={14} f={gas} color="rgba(120,140,20,.8)" vel={60} rmax={9} />
    <Chorro T={T} x0={300} y0={812} x1={430} y1={915} color={AZUL_CLORO} o={vierte * (1 - kprog(T, a + 3.4, a + 3.8))} />
    <Botella x={170} y={760} s={0.62} inclina={klerp(60, 120, vierte)} etiqueta="CLORO" etqColor={KC.cyan} liquido={AZUL_CLORO} />
    {mezcla > 0 ? <g transform={`translate(${lado(260)} 0)`}>
      <Chorro T={T + 1} x0={662} y0={900} x1={540} y1={918} color={VINAGRE} o={vierte * (1 - kprog(T, a + 3.4, a + 3.8))} />
      <Botella x={800} y={850} s={0.62} inclina={klerp(-60, -120, vierte)} etiqueta="VINAGRE" etqColor={KC.yellow} liquido={VINAGRE} tapa={KC.red} />
    </g> : <g>
      <Chorro T={T + 1} x0={662} y0={900} x1={540} y1={918} color="#9fd8ff" o={vierte * (1 - kprog(T, a + 2.4, a + 2.8))} />
      <Botella x={800} y={850} s={0.62} inclina={klerp(-60, -120, vierte)} etiqueta="AGUA" etqColor={KC.mint} liquido="#9fd8ff" tapa={KC.teal} />
      <g opacity={kprog(T, a + 1.4, a + 1.8)}>
        <g transform="translate(790 520) rotate(-10)"><Botella x={0} y={0} s={0.42} etiqueta="VINAGRE" etqColor={KC.yellow} liquido={VINAGRE} tapa={KC.red} /></g>
        <g transform="translate(960 520) rotate(8)"><Botella x={0} y={0} s={0.42} etiqueta="AMONIACO" etqColor={KC.lilac} liquido={AMONIACO} tapa={KC.violet} /></g>
        <Marca x={875} y={560} ok={false} s={0.8} o={kprog(T, a + 1.8, a + 2.2)} />
      </g>
      <Marca x={480} y={1000} ok s={0.9} o={kprog(T, a + 1.0, a + 1.4)} />
    </g>}
  </SvgCapa>;
}
// Dentro del líquido: agua, Na+ y ClO-; con ácido (H+) los ClO- se vuelven Cl2 y suben.
function DentroLiquido({ T, a, acido = 0, x0 = 0 }) {
  const R = krng(9);
  const aguas = Array.from({ length: 16 }, () => [R() * 940 + 70, R() * 760 + 600, R() * 360, R() * 6]);
  const iones = Array.from({ length: 8 }, () => [R() * 860 + 110, R() * 640 + 660, R() * 6]);
  return <SvgCapa>
    {aguas.map(([x, y, r, p], i) => <Mol key={'w' + i} tipo="agua" x={x + Math.sin(T * 0.8 + p) * 20} y={y + Math.cos(T * 0.7 + p) * 16} rot={r + T * 20} s={0.8} o={0.55} />)}
    {iones.map(([x, y, p], i) => {
      const t0 = a + 0.8 + i * 0.35, sube = acido ? kprog(T, t0, t0 + 2.2, kEase.suave) : 0;
      const xx = x + Math.sin(T + p) * 24, yy = klerp(y, 480, sube);
      return <g key={'i' + i}>
        {i % 2 === 0 ? (sube > 0.05 ? <Mol tipo="cl2" x={xx} y={yy} s={0.9} rot={T * 60 + p * 40} /> : <Mol tipo="hipoclorito" x={xx} y={yy} s={0.9} rot={T * 30 + p * 40} />)
          : <g opacity={1 - sube}><Atomo x={xx} y={yy} r={30} color={QA.Na} letra="Na⁺" tam={22} /></g>}
        {acido > 0 && i % 2 === 0 && T > t0 - 0.6 && sube < 0.1 && <Atomo x={klerp(xx - 160, xx - 40, kprog(T, t0 - 0.6, t0))} y={yy - 40} r={20} color={KC.coral} letra="H⁺" tam={16} />}
      </g>; })}
    {acido > 0 && <Nube T={T} x={540} y={440} f={kprog(T, a + 2.0, a + 4.5)} r={240} color={VERDE} seed={8} n={10} />}
  </SvgCapa>;
}
// Vías respiratorias esquemáticas: tráquea + dos pulmones. dano 0..1 enrojece la pared.
function Pulmones({ T, dano = 0, late = 0 }) {
  const k = 1 + Math.sin(T * 7) * 0.02 * late;
  const pared = mixHex('#f2a0a8', '#e0202e', dano);
  return <g transform={`translate(540 980) scale(${k})`}>
    <rect x={-40} y={-430} width={80} height={300} rx={30} fill={pared} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={-40} x2={40} y1={-400 + i * 46} y2={-400 + i * 46} stroke="rgba(0,0,0,.25)" strokeWidth={6} />)}
    <path d="M -20 -140 Q -60 -90 -120 -70 M 20 -140 Q 60 -90 120 -70" stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M -20 -140 Q -60 -90 -120 -70 M 20 -140 Q 60 -90 120 -70" stroke={pared} strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d="M -60 -120 Q -300 -150 -330 80 Q -340 300 -170 300 Q -60 300 -50 120 Z" fill={pared} stroke={KC.ink} strokeWidth={9} />
    <path d="M 60 -120 Q 300 -150 330 80 Q 340 300 170 300 Q 60 300 50 120 Z" fill={pared} stroke={KC.ink} strokeWidth={9} />
    {[[-200, 40], [-150, 160], [-240, 180], [200, 40], [150, 160], [240, 180], [-110, -40], [110, -40]].map(([x, y], i) =>
      <path key={i} d={`M ${x} ${y - 16} Q ${x + 12} ${y + 4} ${x} ${y + 12} Q ${x - 12} ${y + 4} ${x} ${y - 16} Z`} fill="#bfe8ff" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Trinchera esquemática (Primera Guerra Mundial), en sepia.
function Trinchera({ T, a }) {
  const avanza = kprog(T, a + 0.3, a + 4.4);
  return <SvgCapa>
    <rect x={0} y={0} width={KW} height={KH} fill="#c9b58e" />
    <path d={`M 0 1180 L 1080 1180 L 1080 1920 L 0 1920 Z`} fill="#7a6040" />
    <path d="M 0 1060 Q 200 1020 400 1070 T 800 1050 T 1080 1060 L 1080 1200 L 0 1200 Z" fill="#8f7350" stroke={KC.ink} strokeWidth={8} />
    {[120, 300, 520, 740, 940].map((x, i) => <g key={i}><line x1={x} y1={1040} x2={x + 30} y2={960} stroke="#3b2a1a" strokeWidth={10} /><path d={`M ${x - 30} 990 L ${x + 60} 1010`} stroke="#3b2a1a" strokeWidth={4} strokeDasharray="10 8" /></g>)}
    <Nube T={T} x={klerp(-200, 560, avanza)} y={900} f={1} r={330} color={VERDE} seed={12} n={14} />
    <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.25)" />
  </SvgCapa>;
}

function Cloro() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cl: CUES.Cloro, A: CUES.Acido, Am: CUES.Amoniaco, P: CUES.Pulmon, E: CUES.Efecto, Pr: CUES.Pregunta, Es: CUES.Estudio, Ca: CUES.Casa, En: CUES.Encuesta, Gu: CUES.Guerra, Ay: CUES.Ayuda, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mitad = (K.Es + K.Ca) / 2 - 0.4;
  const golpeNo = kprog(T, K.G + 0.05, K.G + 0.4, kEase.rebote);
  const cof = (t) => Math.exp(-Math.max(0, T - t) * 6) * (T >= t ? 1 : 0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: cloro + vinagre en la cubeta → gas */}
      <Escena T={T} a={K.G} b={K.Cl} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <EscenaCubeta T={T} a={K.G} mezcla={1} />
      </Escena>
      {/* 1 · la botella de cloro y lo que trae adentro */}
      <Escena T={T} a={K.Cl} b={K.A}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Botella x={330} y={1000} s={1.25} inclina={Math.sin(T * 2) * 3} etiqueta="CLORO" etqColor={KC.yellow} liquido={AZUL_CLORO} /></SvgCapa>
        <Lupa T={T} at={K.Cl + 0.6} until={K.A - 0.2} x={740} y={800} r={230} fx={330} fy={1080} tinte={KC.cyan} etiqueta="NaClO + agua"
          interior={(T2, r) => <svg width={2 * r} height={2 * r}>
            <rect width={2 * r} height={2 * r} fill="#0d1424" />
            {[[0.25, 0.3], [0.7, 0.25], [0.5, 0.7], [0.2, 0.75], [0.8, 0.7]].map(([u, v], i) => <Mol key={i} tipo="agua" x={u * 2 * r + Math.sin(T2 + i) * 8} y={v * 2 * r} s={0.7} rot={T2 * 30 + i * 50} o={0.6} />)}
            <Mol tipo="hipoclorito" x={r * 0.8} y={r * 1.0} s={0.9} rot={T2 * 25} />
            <Atomo x={r * 1.4} y={r * 1.2} r={30} color={QA.Na} letra="Na⁺" tam={22} />
          </svg>} />
      </Escena>
      {/* 2 · por dentro: el ácido convierte el hipoclorito en cloro gaseoso */}
      <Escena T={T} a={K.A} b={K.Am}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><rect x={0} y={560} width={KW} height={1360} fill="rgba(160,210,255,.10)" /><line x1={0} x2={KW} y1={560} y2={560} stroke="#9fd8ff" strokeWidth={6} strokeDasharray="20 14" /></SvgCapa>
        <DentroLiquido T={T} a={K.A} acido={1} />
      </Escena>
      {/* 3 · con amoniaco: cloraminas */}
      <Escena T={T} a={K.Am} b={K.P}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Cubeta x={480} y={1080} liquido={AZUL_CLORO} nivel={0.6} color={KC.cyan} />
          <Chorro T={T} x0={662} y0={920} x1={540} y1={938} color={AMONIACO} o={kprog(T, K.Am + 0.2, K.Am + 0.5) * (1 - kprog(T, K.Am + 2.4, K.Am + 2.8))} />
          <Botella x={800} y={870} s={0.62} inclina={klerp(-60, -120, kprog(T, K.Am, K.Am + 0.4, kEase.sale))} etiqueta="AMONIACO" etqColor={KC.lilac} liquido={AMONIACO} tapa={KC.violet} />
          <Nube T={T} x={460} y={800} f={kprog(T, K.Am + 0.9, K.Am + 2.6)} r={170} color="#e9f0c9" seed={5} />
          {[0, 1, 2].map((i) => <Mol key={i} tipo="cloramina" x={300 + i * 170} y={klerp(900, 700 - i * 30, kprog(T, K.Am + 1.2 + i * 0.3, K.Am + 2.6 + i * 0.3, kEase.sale))} s={0.9} rot={T * 40 + i * 70} o={kprog(T, K.Am + 1.2 + i * 0.3, K.Am + 1.5 + i * 0.3)} />)}
        </SvgCapa>
      </Escena>
      {/* 4–5 · en tus vías respiratorias */}
      <Escena T={T} a={K.P} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Pulmones T={T} dano={kprog(T, K.P + 3.0, K.P + 6.0)} late={kprog(T, K.E, K.E + 0.3)} />
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.P + 0.4 + i * 0.35, u = kprog(T, t0, t0 + 1.8, kEase.suave); const lado = i % 2 ? 1 : -1;
            const x = u < 0.55 ? 540 + Math.sin(i) * 10 : 540 + lado * klerp(0, 190, (u - 0.55) / 0.45), y = u < 0.55 ? klerp(420, 830, u / 0.55) : klerp(830, 1040 + (i % 3) * 50, (u - 0.55) / 0.45);
            const reac = kprog(T, t0 + 1.8, t0 + 2.2);
            return u > 0 ? <g key={i}>
              {reac < 1 && <Mol tipo="cl2" x={x} y={y} s={0.7} rot={T * 80 + i * 30} o={1 - reac} />}
              {reac > 0 && <text x={x} y={y + 10} textAnchor="middle" style={{ font:`700 ${i % 2 ? 40 : 44}px ${KF.mono}` }} fill={i % 2 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={5} paintOrder="stroke" opacity={reac}>{i % 2 ? 'HCl' : 'HOCl'}</text>}
            </g> : null; })}
          <Onomato T={T} at={K.E + 0.1} until={K.Pr} x={260} y={700} texto="¡COF!" color={KC.yellow} />
          <Onomato T={T} at={K.E + 0.9} until={K.Pr} x={820} y={760} texto="¡COF!" color={KC.orange} rot={8} tam={80} />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · el estudio: 85,104 exposiciones */}
      <Escena T={T} a={K.Es} b={K.Ca}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>{Array.from({ length: 30 }, (_, i) => { const at = mitad + 0.2 + i * 0.05; return T > at ? <g key={i} transform={`translate(${100 + (i % 6) * 176} ${1500 + Math.floor(i / 6) * 70}) scale(${0.5 * kprog(T, at, at + 0.2, kEase.rebote)})`}><Botella x={0} y={0} s={0.5} etiqueta="" liquido={AZUL_CLORO} /></g> : null; })}</SvgCapa>
      </Escena>
      {/* 8 · 85 de cada 100 en casa */}
      <Escena T={T} a={K.Ca} b={K.En}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><Cien T={T} at={K.Ca + 0.2} k={85} icono="casa" x={160} y={560} paso={84} on={KC.orange} dt={0.018} /></SvgCapa>
      </Escena>
      {/* 9 · la encuesta: 35 de cada 100 */}
      <Escena T={T} a={K.En} b={K.Gu}>
        <div style={{ position:'absolute', inset:0, background:'#14213d' }}></div>
        <SvgCapa><Cien T={T} at={K.En + 1.2} k={35} x={160} y={560} paso={84} on={KC.mint} dt={0.06} /></SvgCapa>
      </Escena>
      {/* 10 · la Primera Guerra Mundial */}
      <Escena T={T} a={K.Gu} b={K.Ay}>
        <Trinchera T={T} a={K.Gu} />
      </Escena>
      {/* 11 · qué hacer: sal al aire libre */}
      <Escena T={T} a={K.Ay} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={60} y={600} width={520} height={620} rx={20} fill="#f4efe4" stroke={KC.ink} strokeWidth={9} />
          <Nube T={T} x={300} y={820} f={1 - kprog(T, K.Ay + 2.5, K.Ay + 4.5)} r={150} color={VERDE} seed={2} />
          <rect x={560} y={760} width={40} height={460} fill="#8a5a3a" stroke={KC.ink} strokeWidth={6} transform={`rotate(${-50 * kprog(T, K.Ay + 0.2, K.Ay + 0.7)} 580 1220)`} />
          <circle cx={900} cy={720} r={90} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${700 + i * 120} 1180 q 30 -60 60 0`} stroke={KC.leaf} strokeWidth={12} fill="none" />)}
          <g transform={`translate(${klerp(320, 840, kprog(T, K.Ay + 0.5, K.Ay + 2.0, kEase.suave))} 1120)`}><Personita x={0} y={0} s={2.6} color={KC.yellow} /></g>
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: la misma cubeta, ahora con agua */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <EscenaCubeta T={T} a={K.Ci} mezcla={0} />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.05} until={K.Cl - 0.3} texto="¿Por qué NO?" x={300} y={470} tam={56} borde={KC.red} />
      <Etq T={T} at={K.G + 1.8} until={K.Cl - 0.3} x={240} y={1500} texto="gas amarillo verdoso" tam={40} color={KC.ink} />
      <Etq T={T} at={K.G + 0.3} until={K.Cl - 0.3} x={40} y={980} texto="cloro" tam={36} color={KC.ink} lado="der" />
      <Etq T={T} at={K.G + 0.3} until={K.Cl - 0.3} x={1040} y={1060} texto="vinagre" tam={36} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Cl + 0.4} until={K.A - 0.3} x={60} y={1450} texto="hipoclorito de sodio · NaClO" tam={34} color={KC.ink} />
      <Chip T={T} at={K.A + 0.3} until={K.Am - 0.3} texto="ácido (vinagre) + NaClO" y={1500} tam={40} borde={KC.coral} />
      <Chip T={T} at={K.A + 2.4} until={K.Am - 0.3} texto="Cl₂ · cloro gaseoso" x={540} y={300} tam={44} borde={VERDE} />
      <Chip T={T} at={K.Am + 1.0} until={K.P - 0.3} texto="cloraminas (NH₂Cl)" y={1500} tam={44} borde={KC.lilac} />
      <Chip T={T} at={K.P + 0.2} until={K.Pr - 0.3} texto="tus vías respiratorias" y={330} x={600} tam={40} borde={KC.pink} />
      <Etq T={T} at={K.P + 2.5} until={K.Pr - 0.3} x={60} y={1640} texto="Cl₂ + humedad → HOCl + HCl" tam={34} />
      <Medidor T={T} at={K.E} until={K.Pr - 0.2} valor={(t) => 1 - 0.6 * kprog(t, K.E, K.E + 1.6)} etiqueta="aire" texto={(v) => Math.round(v * 100) + ' %'} y={1480} color={KC.coral} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={mitad} anio="2024" quien="Atalla et al. · U. de Maryland y Pittsburgh" revista="Clinical Toxicology · centros de toxicología de EE. UU." y={900} />
      <NumeroGigante T={T} at={mitad + 0.2} until={K.Ca - 0.3} valor={85104} dur={1.6} etiqueta="exposiciones a cloro y cloraminas" y={850} tam={190} />
      <Chip T={T} at={mitad + 0.8} until={K.Ca - 0.3} texto="EE. UU. · 2015–2022" y={1080} tam={40} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.Ca + 0.3} until={K.En - 0.3} valor={84.9} dec={1} dur={1.5} sufijo=" %" etiqueta="pasaron en casa" y={1500} tam={130} color={KC.orange} />
      <Chip T={T} at={K.En + 0.2} until={K.Gu - 0.3} texto="encuesta · 502 adultos · EE. UU. 2020" y={1690} tam={34} borde={KC.mint} />
      <NumeroGigante T={T} at={K.En + 1.4} until={K.Gu - 0.3} valor={35} dur={2.1} sufijo=" de 100" etiqueta="sabían que NO se mezclan" y={1500} tam={120} color={KC.mint} />
      <Chip T={T} at={K.Gu + 0.4} until={K.Ay - 0.3} texto="Primera Guerra Mundial" y={1500} tam={48} borde={KC.ink} fondo="rgba(60,40,20,.85)" />
      <Chip T={T} at={K.Ay + 1.0} until={K.Ci - 0.3} texto="1 · sal al aire libre" x={540} y={470} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Ay + 2.6} until={K.Ci - 0.3} texto="2 · ¿te cuesta respirar? → médico" y={1500} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="cloro + agua ✓ · un producto a la vez" y={1500} tam={36} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cl - 0.1} texto="¿Cloro con vinagre? *NO.*" />
      <Subtitulo T={T} idx={1} at={K.Cl + 0.1} until={K.A - 0.1} texto="Cloro = *hipoclorito de sodio* en agua." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Am - 0.1} texto="Con ácido suelta *cloro gaseoso.*" />
      <Subtitulo T={T} idx={3} at={K.Am + 0.1} until={K.P - 0.1} texto="Con amoniaco: *cloraminas.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="Con tu humedad forma *dos ácidos.*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Pr - 0.1} texto="Tos y *falta de aire.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cuántos *se equivocan?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ca - 0.1} texto="Más de *85 mil exposiciones.*" />
      <Subtitulo T={T} idx={8} at={K.Ca + 0.1} until={K.En - 0.1} texto="Casi 85 de cada 100: *en casa.*" />
      <Subtitulo T={T} idx={9} at={K.En + 0.1} until={K.Gu - 0.1} texto="Solo *35 de cada 100* lo sabían." />
      <Subtitulo T={T} idx={10} at={K.Gu + 0.1} until={K.Ay - 0.1} texto="El mismo gas *de la guerra.*" />
      <Subtitulo T={T} idx={11} at={K.Ay + 0.1} until={K.Ci - 0.1} texto="Sal *al aire libre.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Cloro con agua: *sí.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cloro + 1.0, CUES.Cloro + 3.5, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Amoniaco + 0.3, CUES.Pulmon + 1.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.0, CUES.Estudio + 7.0, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Encuesta + 0.8, CUES.Guerra - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Guerra + 0.6, CUES.Ayuda - 0.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Ayuda + 1.0, CUES.Cierre - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="03" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CloroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cloro /></CompositionStage></div>;
}
window.CloroApp = CloroApp;
