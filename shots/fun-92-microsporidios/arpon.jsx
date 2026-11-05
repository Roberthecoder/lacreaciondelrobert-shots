// Shot Fungi Mati #92 · El parásito que dispara un arpón (microsporidios y su tubo polar) — NARRADO.
// Gancho 1 «Esto no es X: es Y» · formato N1 «Por dentro» + medidor: espora → su tubo enrollado → el disparo → la misma espora.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (la espora mide ~4 µm; el tubo, ~20 veces más).

const MO = { pared:'#6b5a8a', pared2:'#a48fd0', dentro:'#f2e6ff', tubo:'#ffd43b', nucleo:'#ff6b9a', celula:'#ffb3a7', celula2:'#ff8f80', nucC:'#b0306a', seda:'#f3ead2', gusano:'#efe6cf' };

// Espora ovalada (eje largo horizontal, punta de salida a la derecha). Medidas locales: 260 × 150.
// carga 1..0 = cuánto contenido queda; tubo 0..1 = cuánto salió; largo = largo del tubo fuera (px); viaje 0..1 = el contenido dentro del tubo.
function Espora({ T, x, y, s = 1, rot = 0, carga = 1, tubo = 0, largo = 900, viaje = -1, onda = 60, corte = false, nucleos = true }) {
  const pts = []; const L = largo * tubo;
  for (let i = 0; i <= 60; i++) { const u = i / 60, d = u * L; pts.push([130 + d, Math.sin(d / 140) * onda * Math.min(1, d / 200)]); }
  const path = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const at = (u) => { const k = Math.round(kclamp(u, 0, 1) * 60); return pts[k]; };
  const vueltas = Math.round(7 * (1 - tubo * 0.9));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {tubo > 0 && <><path d={path} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" /><path d={path} stroke={MO.tubo} strokeWidth={8} fill="none" strokeLinecap="round" /></>}
    {/* pared gruesa, más delgada en la punta */}
    <ellipse cx={0} cy={0} rx={130} ry={76} fill={MO.pared} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={6} cy={0} rx={112} ry={60} fill={mixHex('#3a2f4a', MO.dentro, 0.3 + 0.7 * carga)} />
    <ellipse cx={-30} cy={-34} rx={60} ry={14} fill="#fff" opacity=".25" />
    {/* tubo polar enrollado: vueltas inclinadas */}
    {carga > 0.05 && Array.from({ length: vueltas }, (_, i) => <ellipse key={i} cx={-70 + i * 22} cy={0} rx={10} ry={48} transform={`rotate(-22 ${-70 + i * 22} 0)`} fill="none" stroke={MO.tubo} strokeWidth={7} opacity={carga} />)}
    {/* parte recta del tubo y disco de anclaje en la punta */}
    <path d="M 80 -6 L 118 0" stroke={MO.tubo} strokeWidth={8} strokeLinecap="round" />
    <path d="M 108 -22 Q 124 0 108 22" stroke={KC.ink} strokeWidth={6} fill="none" />
    {nucleos && carga > 0.2 && <g opacity={carga}><circle cx={-6} cy={14} r={17} fill={MO.nucleo} stroke={KC.ink} strokeWidth={4} /><circle cx={24} cy={14} r={17} fill={MO.nucleo} stroke={KC.ink} strokeWidth={4} /></g>}
    {/* contenido que viaja por el tubo (se deforma como pasta de dientes) */}
    {viaje >= 0 && viaje <= 1 && tubo > 0 && (() => { const p = at(viaje); return <g><ellipse cx={p[0]} cy={p[1]} rx={46} ry={11} fill={MO.dentro} stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={p[0] - 8} cy={p[1]} rx={16} ry={6} fill={MO.nucleo} /><ellipse cx={p[0] + 14} cy={p[1]} rx={16} ry={6} fill={MO.nucleo} /></g>; })()}
  </g>;
}
// Célula hospedera: membrana, citoplasma y núcleo. contenido = gotita del parásito ya adentro (0..1).
function Celula({ T, x, y, r = 260, s = 1, contenido = 0, cx = -60, cy = -40, esporas = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={Array.from({ length: 41 }, (_, i) => { const a = i / 40 * Math.PI * 2, rr = r * (1 + 0.04 * Math.sin(a * 5 + T * 1.2)); return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z'}
      fill={MO.celula} stroke={KC.ink} strokeWidth={8} />
    <circle cx={r * 0.25} cy={r * 0.2} r={r * 0.3} fill={MO.nucC} stroke={KC.ink} strokeWidth={6} opacity=".85" />
    {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={Math.cos(i * 2.1) * r * 0.6} cy={Math.sin(i * 2.1) * r * 0.55} rx={16} ry={8} fill={MO.celula2} transform={`rotate(${i * 30} ${Math.cos(i * 2.1) * r * 0.6} ${Math.sin(i * 2.1) * r * 0.55})`} />)}
    {contenido > 0 && <g transform={`translate(${cx} ${cy}) scale(${kEase.rebote(contenido)})`}><ellipse rx={44} ry={34} fill={MO.dentro} stroke={KC.ink} strokeWidth={4} /><circle cx={-12} cy={4} r={11} fill={MO.nucleo} /><circle cx={12} cy={4} r={11} fill={MO.nucleo} /></g>}
    {Array.from({ length: Math.round(esporas) }, (_, i) => <g key={i} transform={`translate(${-120 + (i % 4) * 70} ${-80 + Math.floor(i / 4) * 90}) rotate(${i * 25}) scale(.22)`}><Espora T={T} x={0} y={0} nucleos={false} /></g>)}
  </g>;
}
// Glóbulo rojo (dona) para comparar tamaños.
function Globulo({ x, y, r = 120 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill="#e23b3b" stroke={KC.ink} strokeWidth={7} /><circle r={r * 0.45} fill="#b82626" /></g>;
}
// Gusano de seda con manchitas negras (pebrina) y capullos.
function GusanoSeda({ T, x, y, s = 1, manchas = 0 }) {
  const seg = Array.from({ length: 10 }, (_, i) => ({ x: -260 + i * 56, y: Math.sin(T * 3 - i * 0.6) * 10, r: i === 9 ? 46 : 52 - Math.abs(i - 4) * 2 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {seg.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r={q.r} fill={MO.gusano} stroke={KC.ink} strokeWidth={6} />)}
    {seg.slice(0, 9).map((q, i) => <line key={'p' + i} x1={q.x} y1={q.y + q.r - 4} x2={q.x} y2={q.y + q.r + 16} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}
    <circle cx={seg[9].x + 20} cy={seg[9].y - 8} r={7} fill={KC.ink} />
    {manchas > 0 && [[-230, -20], [-170, 14], [-120, -26], [-60, 10], [0, -18], [50, 22], [110, -10], [170, 16]].map(([a, b], i) => <circle key={i} cx={a} cy={b + Math.sin(T * 3 - i * 0.6) * 10} r={10 * kclamp(manchas * 2 - i * 0.15, 0, 1)} fill="#1b1410" />)}
  </g>;
}
function Capullo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse rx={70} ry={44} fill={MO.seda} stroke={KC.ink} strokeWidth={6} />
    {[-40, -15, 10, 35].map((dx, i) => <path key={i} d={`M ${dx} -38 Q ${dx + 10} 0 ${dx} 38`} stroke="#d9cfb2" strokeWidth={4} fill="none" />)}</g>;
}
// Cronómetro sencillo.
function Reloj({ T, x, y, r = 120, t = 0, pausa = false }) {
  const a = (t % 1) * Math.PI * 2 - Math.PI / 2;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-24} y={-r - 40} width={48} height={30} rx={8} fill={KC.ink} />
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={Math.cos(i * Math.PI / 6) * r * 0.8} y1={Math.sin(i * Math.PI / 6) * r * 0.8} x2={Math.cos(i * Math.PI / 6) * r * 0.92} y2={Math.sin(i * Math.PI / 6) * r * 0.92} stroke={KC.ink} strokeWidth={6} />)}
    <line x1={0} y1={0} x2={Math.cos(a) * r * 0.75} y2={Math.sin(a) * r * 0.75} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
    {pausa && <g opacity={0.5 + 0.5 * Math.sin(T * 6)}><rect x={-34} y={r * 0.3} width={20} height={44} fill={KC.ink} /><rect x={14} y={r * 0.3} width={20} height={44} fill={KC.ink} /></g>}
  </g>;
}
// Barras de genoma (esquema, no a escala del humano).
function BarrasGenoma({ T, p = 1 }) {
  const fil = [['humano', '≈ 3,055 millones de letras', 2000, KC.lilac], ['levadura del pan', '≈ 12 millones', 300, KC.gold2], ['Encephalitozoon intestinalis', '≈ 2.3 millones', 58, KC.mint]];
  return <g>{fil.map(([n, t, w, c], i) => { const q = kprog(p, i * 0.25, i * 0.25 + 0.4, kEase.sale); const y = 620 + i * 190;
    return <g key={i} opacity={kclamp(q * 3, 0, 1)}>
      <text x={80} y={y - 24} style={{ font:`700 34px ${KF.mono}`, fontStyle: i === 2 ? 'italic' : 'normal' }} fill={KC.texto}>{n}</text>
      <rect x={80} y={y} width={Math.max(8, w * q)} height={70} rx={14} fill={c} stroke={KC.ink} strokeWidth={6} />
      <text x={80} y={y + 116} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} opacity=".85">{t}</text>
    </g>; })}</g>;
}

function ArponShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Quien, Pa: CUES.Pariente, R: CUES.Resorte, D: CUES.Dispara, V: CUES.Viaja, P: CUES.Pregunta, E: CUES.Estudio, Ve: CUES.Velocidad, Ps: CUES.Pasteur, Ge: CUES.Genoma, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const disp0 = kprog(T, K.G + 0.35, K.G + 1.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la «cápsula» dispara su arpón */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} />
        {fsvg(<>
          <Celula T={T} x={930} y={760} r={300} />
          <Espora T={T} x={190} y={900} s={0.9} rot={-14 + Math.sin(T * 2) * 3 * (1 - disp0)} tubo={disp0} largo={880} onda={50} />
        </>)}
      </Escena>
      {/* 2 · solo se multiplica dentro de células */}
      <Escena T={T} a={K.Q} b={K.Pa} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<Celula T={T} x={540} y={860} r={340} esporas={kprog(T, K.Q + 0.6, K.Q + 3.0) * 8} cx={-60} cy={-40} />)}
      </Escena>
      {/* 3 · pariente de los hongos y tamaño */}
      <Escena T={T} a={K.Pa} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Pa + 2.4, K.Pa + 2.8)}>
            <path d="M 540 1080 L 540 860 M 540 860 Q 420 760 300 700 M 540 860 Q 660 760 780 700" stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${kprog(T, K.Pa + 0.2, K.Pa + 1.2)} 1`} />
            <g opacity={kprog(T, K.Pa + 0.9, K.Pa + 1.3)}><Seta x={300} y={690} s={0.45} /></g>
            <g opacity={kprog(T, K.Pa + 1.1, K.Pa + 1.5)}><Espora T={T} x={780} y={650} s={0.45} /></g>
          </g>
          <g opacity={kprog(T, K.Pa + 2.6, K.Pa + 3.0)}>
            <Globulo x={360} y={860} r={195} />
            <Espora T={T} x={760} y={860} s={0.38} />
          </g>
        </>)}
      </Escena>
      {/* 4–6 · por dentro: el resorte, el disparo y el contenido que viaja */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <g opacity={kprog(T, K.D + 0.2, K.D + 0.8)}><Celula T={T} x={930} y={900} r={260} contenido={kprog(T, K.V + 2.6, K.V + 3.4)} cx={-120} cy={30} /></g>
          <Espora T={T} x={klerp(540, 230, kprog(T, K.D - 0.2, K.D + 0.6, kEase.suave))} y={900} s={klerp(1.9, 1.0, kprog(T, K.D - 0.2, K.D + 0.6, kEase.suave))}
            tubo={kprog(T, K.D + 0.8, K.D + 2.2, kEase.sale)} largo={470} onda={30}
            carga={1 - kprog(T, K.V + 0.4, K.V + 3.0)} viaje={T > K.V + 0.4 && T < K.V + 3.0 ? kprog(T, K.V + 0.4, K.V + 3.0) : -1} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿qué tan rápido? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Reloj T={T} x={300} y={820} r={170} t={0} pausa />)}
      </Escena>
      {/* 8–9 · el estudio y la velocidad: espora sola en el portaobjetos (así se filmó) */}
      <Escena T={T} a={K.E} b={K.Ps} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#1a2236' }}></div>
        {fsvg(<>
          {Array.from({ length: 7 }, (_, i) => <rect key={i} x={((i * 170 - T * 160) % 1190 + 1190) % 1190 - 110} y={1000} width={130} height={90} rx={8} fill="#0b0f18" stroke="#3a4560" strokeWidth={5} opacity={1 - kprog(T, K.Ve - 0.3, K.Ve)} />)}
          <g opacity={kprog(T, K.Ve - 0.4, K.Ve)}>
            <rect x={40} y={690} width={1000} height={280} rx={20} fill="rgba(180,220,255,.12)" stroke="#6a86b0" strokeWidth={5} />
            <Espora T={T} x={110} y={830} s={0.17} tubo={kprog(T, K.Ve + 0.3, K.Ve + 1.13)} largo={5200} onda={160} />
            {T > K.Ve + 1.6 && <g opacity={kprog(T, K.Ve + 1.6, K.Ve + 2.0)}>
              <line x1={75} y1={1010} x2={975} y2={1010} stroke={KC.texto} strokeWidth={6} />
              {Array.from({ length: 21 }, (_, i) => <line key={i} x1={75 + i * 45} y1={996} x2={75 + i * 45} y2={1024} stroke={KC.texto} strokeWidth={i % 5 === 0 ? 6 : 3} />)}
            </g>}
          </g>
        </>)}
      </Escena>
      {/* 10 · Pasteur y la seda */}
      <Escena T={T} a={K.Ps} b={K.Ge} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <GusanoSeda T={T} x={560} y={700} s={0.9} manchas={kprog(T, K.Ps + 0.5, K.Ps + 1.6)} />
          <Capullo x={180} y={560} s={0.9} />
          {(() => { const u = kprog(T, K.Ps + 2.0, K.Ps + 3.4, kEase.sale); return <g opacity={kprog(T, K.Ps + 1.8, K.Ps + 2.2)}>
            <line x1={160} y1={1120} x2={940} y2={1120} stroke={KC.ink} strokeWidth={8} />
            <rect x={240} y={1120 - 260 * u} width={200} height={260 * u} fill={KC.mint} stroke={KC.ink} strokeWidth={7} />
            <rect x={640} y={1120 - 65 * u} width={200} height={65 * u} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            <text x={340} y={1100 - 260 * u} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1853</text>
            <text x={740} y={1100 - 65 * u} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1863</text>
            <text x={340} y={1120 - 260 * u + 50} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>26,000 t</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 11 · genoma diminuto */}
      <Escena T={T} a={K.Ge} b={K.C} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<BarrasGenoma T={T} p={kprog(T, K.Ge + 0.2, K.Ge + 2.6)} />)}
      </Escena>
      {/* 12 · cierre: la misma espora, cargada, junto a la célula */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} />
        {fsvg(<>
          <Celula T={T} x={930} y={760} r={300} />
          <Espora T={T} x={190} y={900} s={0.9} rot={-14 + Math.sin(T * 2) * 3} />
          <ellipse cx={190} cy={900} rx={140} ry={90} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={0.5 + 0.4 * Math.sin(T * 4)} transform="rotate(-14 190 900)" />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.G + 2.6} texto="no es una semilla" x={330} y={560} tam={42} borde={KC.red} />
      <Chip T={T} at={K.G + 2.8} until={K.Q - 0.3} texto="el arpón: ~20 veces su largo" x={420} y={560} tam={36} borde={KC.gold2} />
      <Etq T={T} at={K.Q + 0.4} until={K.Pa - 0.3} x={60} y={470} texto="microsporidio" tam={40} color={KC.texto} />
      <Chip T={T} at={K.Q + 1.2} until={K.Pa - 0.3} texto="solo se multiplica dentro de células" x={540} y={1240} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.Pa + 0.9} until={K.Pa + 2.5} x={300} y={600} texto="hongos" tam={34} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Pa + 1.1} until={K.Pa + 2.5} x={760} y={560} texto="microsporidios" tam={34} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Pa + 1.3} until={K.Pa + 2.5} texto="¿hongos o sus parientes más cercanos?" x={540} y={1180} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Pa + 2.9} until={K.R - 0.3} x={200} y={600} texto="glóbulo rojo · ~8 µm" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pa + 3.1} until={K.R - 0.3} x={640} y={720} texto="espora · 1–4 µm" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pa + 3.3} until={K.R - 0.3} x={640} y={765} texto="(las que infectan humanos)" tam={22} color={KC.ink} />
      <Chip T={T} at={K.R + 0.2} until={K.D - 0.3} texto="POR DENTRO · LA ESPORA" x={540} y={420} tam={32} borde={KC.lilac} mono />
      <Etq T={T} at={K.R + 0.7} until={K.D - 0.2} x={300} y={620} texto="tubo polar (enrollado)" tam={30} color={MO.tubo} />
      <Etq T={T} at={K.R + 1.3} until={K.D - 0.2} x={300} y={1150} texto="pared gruesa" tam={30} color={MO.pared2} />
      <Etq T={T} at={K.R + 1.8} until={K.D - 0.2} x={640} y={1080} texto="contenido con 2 núcleos" tam={28} color={MO.nucleo} />
      <Etq T={T} at={K.D + 1.6} until={K.V + 0.2} x={560} y={600} texto="célula" tam={32} color={KC.texto} />
      <Chip T={T} at={K.D + 2.0} until={K.V - 0.2} texto="se clava en la célula" x={380} y={470} tam={36} borde={KC.gold2} />
      <Chip T={T} at={K.V + 0.5} until={K.P - 0.3} texto="el contenido viaja por el tubo" x={370} y={470} tam={34} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ve - 0.3} anio="2020" quien="Jaroenlak et al. · NYU" revista="PLoS Pathogens, 2020 · microscopía de alta velocidad" x={540} y={760} />
      <Chip T={T} at={K.Ve + 0.2} until={K.Ps - 0.3} texto="sin célula: así lo filmaron" x={420} y={470} tam={30} borde={KC.cyan} mono />
      <EtqMix T={T} at={K.Ve + 1.2} until={K.Ps - 0.3} x={540} y={540} centro partes={[['≈ 235–336 µm/s', false]]} tam={56} color={KC.gold2} />
      <Etq T={T} at={K.Ve + 1.4} until={K.Ps - 0.3} x={360} y={605} texto="(promedios de 3 especies)" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Ve + 2.0} until={K.Ps - 0.3} x={75} y={1070} texto="≈ 20 × la espora · < 1 s" tam={32} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Ps + 0.6} until={K.Ps + 1.9} anio="1865" quien="Louis Pasteur · pebrina" revista="1865–1870 · gusano de seda" x={540} y={1050} />
      <EtqMix T={T} at={K.Ps + 0.8} until={K.Ge - 0.3} x={520} y={580} partes={[['pebrina: ', false], ['Nosema bombycis', true]]} tam={30} color={KC.ink} sombra={false} />
      <Chip T={T} at={K.Ps + 2.4} until={K.Ge - 0.3} texto="capullos: 26,000 t → 6,500 t" x={540} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ge + 0.2} until={K.C - 0.3} texto="esquema · el humano se sale de la pantalla" x={540} y={430} tam={26} borde={KC.lilac} mono />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="un arpón que espera" x={400} y={560} tam={42} borde={KC.gold2} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Q} texto="1 µm" largo={52} />
      <BarraEscala T={T} at={K.Q} until={K.Pa} texto="5 µm (esquema)" largo={120} />
      <BarraEscala T={T} at={K.Pa} until={K.R} texto="2 µm" largo={100} />
      <BarraEscala T={T} at={K.R} until={K.D} texto="1 µm" largo={124} />
      <BarraEscala T={T} at={K.D} until={K.P} texto="1 µm" largo={65} />
      <BarraEscala T={T} at={K.Ve} until={K.Ps} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.Ps} until={K.Ge} texto="2 cm" largo={160} />
      <BarraEscala T={T} at={K.Ge} until={K.C} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 µm" largo={52} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es una semilla: *dispara un arpón.*" />
      <Sub T={T} idx={1} at={K.Q + 0.1} until={K.Pa - 0.1} texto="Microsporidio: *vive de otras células.*" />
      <Sub T={T} idx={2} at={K.Pa + 0.1} until={K.R - 0.1} texto="Pariente de los hongos: *milésimas de milímetro.*" />
      <Sub T={T} idx={3} at={K.R + 0.1} until={K.D - 0.1} texto="Un tubo enrollado: *el tubo polar.*" />
      <Sub T={T} idx={4} at={K.D + 0.1} until={K.V - 0.1} texto="Sale disparado *y se clava.*" />
      <Sub T={T} idx={5} at={K.V + 0.1} until={K.P - 0.1} texto="Su contenido *se escurre por el tubo.*" />
      <Sub T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué *tan rápido* es?" />
      <Sub T={T} idx={7} at={K.E + 0.1} until={K.Ve - 0.1} texto="2020: lo filmaron *en alta velocidad.*" />
      <Sub T={T} idx={8} at={K.Ve + 0.1} until={K.Ps - 0.1} texto="Cientos de micras por segundo: *en menos de 1 s.*" />
      <Sub T={T} idx={9} at={K.Ps + 0.1} until={K.Ge - 0.1} texto="La seda de Francia *cayó a la cuarta parte.*" />
      <Sub T={T} idx={10} at={K.Ge + 0.1} until={K.C - 0.1} texto="De los *genomas más chicos.*" />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un arpón *que espera su célula.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Q + 1.0, K.Pa - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.R + 0.4, K.D - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.V + 0.4, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [K.Ve + 1.8, K.Ps - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Ps + 2.2, K.Ge - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Ge + 1.6, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="92" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArponApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArponShot /></CompositionStage></div>;
}
window.ArponApp = ArponApp;
