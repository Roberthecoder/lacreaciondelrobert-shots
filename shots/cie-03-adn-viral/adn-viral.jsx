// Científico #03 · Tu ADN no es completamente humano — NARRADA (N4 "La imagen que se llena" + N1 rayos X a la placenta)
// y gemelo MUDO (M4 "Ciclo": virus → célula germinal → bebé → placenta → generaciones → tu ADN → virus).
// Guion y fuentes: guion.md. El dibujo es esquemático (retrovirus con envoltura y espículas; sincitio = células fundidas).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const VIR = KC.pink, VIR2 = '#ff8ab5', HUM = '#2fe0a8', ADN1 = '#7fd3ff', ADN2 = '#ffd36b';

/* ---------- dibujos ---------- */
// Retrovirus: envoltura con espículas (la proteína de envoltura, "env") y cápside cónica con su ARN.
function Retrovirus({ x, y, s = 1, T = 0, rot = 0, seed = 1, color = VIR }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.2) * 10}) scale(${s})`}>
    {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <g key={i} transform={`rotate(${(a * 180) / Math.PI})`}><line x1={0} y1={-58} x2={0} y2={-80} stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={-84} r={9} fill={KC.lilac} stroke={KC.ink} strokeWidth={4} /></g>; })}
    <circle r={60} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -10 -36 L 26 -24 L 14 36 L -22 30 Z" fill="#fff6c8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -4 -20 q 10 10 0 20 t 0 20 M 6 -16 q 10 10 0 20 t 0 20" stroke={KC.red} strokeWidth={4} fill="none" />
  </g>;
}
// Tira de ADN (doble hélice) horizontal de x0 a x1. marca = [u0, u1] tramo viral (0..1) que brilla.
function TiraADN({ T, x0 = 80, x1 = 1000, y = 960, amp = 46, marca, brillo = 1, fase = 0 }) {
  const n = 60, pts = (sg) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n; return [klerp(x0, x1, u), y + sg * amp * Math.sin(u * 14 + T * 1.5 + fase)]; });
  const enMarca = (u) => marca && u >= marca[0] && u <= marca[1];
  const peld = Array.from({ length: 34 }, (_, i) => { const u = (i + 0.5) / 34, xx = klerp(x0, x1, u), a = amp * Math.sin(u * 14 + T * 1.5 + fase);
    return <line key={i} x1={xx} y1={y - a} x2={xx} y2={y + a} stroke={enMarca(u) ? VIR : (i % 2 ? ADN2 : HUM)} strokeWidth={enMarca(u) ? 9 : 7} opacity={enMarca(u) ? brillo : 0.9} />; });
  return <g>
    {marca && <rect x={klerp(x0, x1, marca[0]) - 10} y={y - amp - 24} width={(x1 - x0) * (marca[1] - marca[0]) + 20} height={amp * 2 + 48} rx={20} fill={VIR} opacity={0.18 * brillo} />}
    {peld}
    <polyline points={pts(1).map((p) => p.join(',')).join(' ')} fill="none" stroke={ADN1} strokeWidth={10} strokeLinecap="round" />
    <polyline points={pts(-1).map((p) => p.join(',')).join(' ')} fill="none" stroke="#4aa3ff" strokeWidth={10} strokeLinecap="round" />
  </g>;
}
// Óvulo con su núcleo; con virus adentro (infectado 0..1).
function Ovulo({ x, y, s = 1, T = 0, infectado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={220} fill="#ffe2ec" stroke={KC.ink} strokeWidth={9} /><circle r={238} fill="none" stroke="#ffc0d6" strokeWidth={14} opacity=".7" />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * 150 * ((i % 5) / 5 + 0.3)} cy={Math.sin(i * 2.4) * 150 * ((i % 5) / 5 + 0.3)} r={8} fill="#f6b8cc" />)}
    <circle cx={30} cy={-20} r={70} fill="#ffc8dc" stroke={KC.ink} strokeWidth={6} />
    {infectado > 0 && <g opacity={infectado}><path d="M -10 -40 q 30 20 0 40 t 0 40" stroke={VIR} strokeWidth={10} fill="none" transform="translate(30 -20)" /><circle cx={30} cy={-20} r={80 + 6 * Math.sin(T * 4)} fill="none" stroke={VIR} strokeWidth={5} opacity=".7" /></g>}
  </g>;
}
function Esperma({ x, y, s = 1, rot = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 26 0 q 40 ${Math.sin(T * 10) * 20} 80 0 t 80 0 t 60 0`} stroke={KC.ink} strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={0} rx={32} ry={22} fill="#e9f6ff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Capa de la placenta: células que se funden en un sincitio (una sola capa con muchos núcleos). funde 0..1.
function Sincitio({ T, r, funde = 0, sinSincitina = false }) {
  const D = r * 2, n = 7, f = sinSincitina ? 0 : funde;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#3a0f22" />
    {/* sangre de la mamá arriba */}
    {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={(i * 61 + T * 40) % D} cy={50 + (i % 3) * 30} rx={20} ry={12} fill="#e23b3b" stroke={KC.ink} strokeWidth={3} />)}
    {/* capa que se funde */}
    {f > 0.6 && <rect x={20} y={D * 0.42} width={D - 40} height={D * 0.22} rx={40} fill="#ffb3cc" stroke={KC.ink} strokeWidth={6} opacity={kprog(f, 0.6, 0.9)} />}
    {Array.from({ length: n }, (_, i) => { const w = (D - 40) / n, cx = 20 + w * (i + 0.5); return <g key={i}>
      <rect x={cx - w / 2 + 6 * (1 - f)} y={D * 0.42} width={w - 12 * (1 - f)} height={D * 0.22} rx={30 * (1 - f) + 4} fill="#ffb3cc" stroke={KC.ink} strokeWidth={6 * (1 - kprog(f, 0.5, 0.8))} opacity={1 - kprog(f, 0.8, 1) * 0.0} />
      <circle cx={cx} cy={D * 0.53} r={14} fill="#8a2a5a" />
    </g>; })}
    {/* bebé abajo (vasos) */}
    <path d={`M 0 ${D * 0.8} q ${D / 4} -30 ${D / 2} 0 t ${D / 2} 0`} stroke="#4aa3ff" strokeWidth={16} fill="none" />
    {sinSincitina && <path d={`M ${D * 0.3} ${D * 0.3} L ${D * 0.7} ${D * 0.75} M ${D * 0.7} ${D * 0.3} L ${D * 0.3} ${D * 0.75}`} stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={kprog(T % 100, 0, 1)} />}
  </svg>;
}
// Silueta de embarazo (macro) para la Lupa.
function Panza({ T }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <g transform={`translate(540 1000) translate(0 ${mece(T, 2, 0.2) * 6})`}>
      <path d="M -150 -560 Q -40 -620 60 -560 L 80 -360 Q 330 -260 300 40 Q 270 280 60 300 L -150 320 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <circle cx={-40} cy={-680} r={110} fill="#e8ad7f" stroke={KC.ink} strokeWidth={10} />
      <path d="M -150 -700 Q -120 -820 -10 -800 Q 80 -790 60 -690 Q 0 -760 -150 -700 Z" fill={KC.ink} />
    </g>
  </svg>;
}
// Embrión que crece dentro (rayos X): placenta arriba, cordón y bebé enroscado. k 0..1 = crecimiento.
function Embrion({ T, r, k = 1 }) {
  const D = r * 2, s = 0.35 + 0.65 * k;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#3a0f22" /><circle cx={r} cy={r * 1.05} r={r * 0.8} fill="#5a1a3a" stroke={VIR2} strokeWidth={5} />
    <ellipse cx={r} cy={r * 0.38} rx={r * 0.55} ry={r * 0.14} fill="#c2185b" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r} ${r * 0.5} q ${r * 0.25} ${r * 0.2} 0 ${r * 0.45 * s}`} stroke="#ffb3cc" strokeWidth={10} fill="none" />
    <g transform={`translate(${r} ${r * 1.15}) scale(${s}) rotate(${mece(T, 1, 0.2) * 5})`}><path d="M 60 -90 C 140 -60 140 60 40 90 C -40 110 -110 40 -90 -20 C -80 -60 -40 -40 -30 -10 C -20 20 20 30 40 0" fill="#ffc8a8" stroke={KC.ink} strokeWidth={8} /><circle cx={70} cy={-60} r={56} fill="#ffc8a8" stroke={KC.ink} strokeWidth={8} /></g>
  </svg>;
}
function Raton({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 120 30 q 80 ${-30 + mece(T, 3, 0.4) * 20} 140 10`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={140} ry={80} fill="#c3cbd3" stroke={KC.ink} strokeWidth={9} />
    <circle cx={-110} cy={-70} r={46} fill="#c3cbd3" stroke={KC.ink} strokeWidth={8} /><circle cx={-110} cy={-70} r={24} fill="#f6a6b2" />
    <circle cx={-150} cy={-10} r={9} fill={KC.ink} /><circle cx={-190} cy={10} r={11} fill="#f6a6b2" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

/* ---------- versión narrada ---------- */
const GR = { cols: 20, filas: 30 };   // 600 cuadritos = tu genoma (~5 millones de letras cada uno)
const VIRALES = (() => { const g = krng(88), set = new Set(); while (set.size < 48) set.add(Math.floor(g() * 600)); return set; })();   // 48/600 = 8 %
function GenomaCuadros({ T, llenado, resalta = 0, x = 60, y = 500, ancho = 600, alto = 690, pulso = 0 }) {
  const N = GR.cols * GR.filas, k = Math.floor(llenado * N), cw = ancho / GR.cols, ch = alto / GR.filas;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: N }, (_, i) => { const c = i % GR.cols, r = Math.floor(i / GR.cols), v = VIRALES.has(i), on = i < k;
      const col = !on ? 'rgba(255,255,255,.13)' : v && resalta > 0 ? mixHex(HUM, VIR, resalta) : HUM;
      const s = v && resalta > 0 ? 1 + 0.25 * resalta * (0.5 + 0.5 * Math.sin(T * 4 + i)) * (1 + pulso) : 1;
      return <rect key={i} x={x + c * cw + cw * 0.1} y={y + r * ch + ch * 0.1} width={cw * 0.8} height={ch * 0.8} rx={4} fill={col} transform={s !== 1 ? `translate(${(x + c * cw + cw / 2) * (1 - s)} ${(y + r * ch + ch / 2) * (1 - s)}) scale(${s})` : undefined} stroke={v && resalta > 0.5 ? KC.ink : 'none'} strokeWidth={2} />; })}
  </svg>;
}
function AdnViralNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Retro, Ge: CUES.Germen, H: CUES.Hereda, Ro: CUES.Rotos, P: CUES.Pregunta, E: CUES.Estudio, F: CUES.Funde, Ra: CUES.Ratones, O: CUES.Otros, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const llena = kprog(T, K.G + 0.05, K.G + 2.4, kEase.sale);
  const integra = kprog(T, K.R + 2.2, K.R + 4.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* gancho: tu ADN en 600 cuadritos; 48 (8 %) se vuelven rosas */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #1b2b3a 0%, #0E0F12 80%)' }}></div>
        <GenomaCuadros T={T} llenado={llena} resalta={kprog(T, K.G + 2.6, K.G + 3.4)} />
      </Escena>
      {/* retrovirus: entra a una célula, copia su ARN a ADN y se mete en un cromosoma */}
      <Escena T={T} a={K.R} b={K.Ge}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 40%, #2a1430 0%, #0E0F12 80%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <circle cx={540} cy={1300} r={560} fill="#1d2a3a" stroke="#4aa3ff" strokeWidth={10} />
          <TiraADN T={T} y={1120} marca={integra > 0.5 ? [0.45, 0.6] : null} brillo={kprog(integra, 0.5, 1)} />
          <Retrovirus x={klerp(820, 540, kprog(T, K.R, K.R + 1.6, kEase.suave))} y={klerp(480, 760, kprog(T, K.R, K.R + 1.6, kEase.suave))} s={klerp(1.6, 1.0, kprog(T, K.R, K.R + 1.6))} T={T} />
          {/* ARN → ADN que baja al cromosoma */}
          {T > K.R + 1.6 && <path d={`M 540 820 q 20 ${60 * integra} 0 ${120 + 180 * integra}`} stroke={VIR} strokeWidth={10} fill="none" strokeDasharray="12 8" opacity={1 - kprog(integra, 0.8, 1)} />}
        </svg>
      </Escena>
      <Escena T={T} a={K.Ge} b={K.H}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.22)" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Ovulo x={540} y={920} s={1.2} T={T} infectado={kprog(T, K.Ge + 1.6, K.Ge + 2.6)} />
          <Retrovirus x={klerp(900, 600, kprog(T, K.Ge + 0.2, K.Ge + 1.6))} y={klerp(560, 860, kprog(T, K.Ge + 0.2, K.Ge + 1.6))} s={0.6 * (1 - kprog(T, K.Ge + 1.5, K.Ge + 1.9))} T={T} />
          <Esperma x={160} y={1150} rot={-20} T={T} s={1.1} />
        </svg>
      </Escena>
      {/* generaciones: la tira de ADN con su tramo rosa pasa de abuelos a ti */}
      <Escena T={T} a={K.H} b={K.Ro}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[0, 1, 2, 3, 4].map((i) => { const at = K.H + 0.3 + i * 0.55; if (T < at) return null; const p = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={i} transform={`translate(0 ${560 + i * 150}) scale(1 ${p})`}><TiraADN T={T} y={0} x0={180} x1={980} amp={34} marca={[0.45, 0.58]} fase={i} />
              <circle cx={110} cy={0} r={40} fill={i === 4 ? KC.pink : '#fff'} stroke={KC.ink} strokeWidth={6} /><text x={110} y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{i === 4 ? 'TÚ' : ''}</text></g>; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.Ro} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #2a1430 0%, #0E0F12 80%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <TiraADN T={T} y={960} marca={[0.2, 0.8]} amp={60} brillo={1} />
          {['gag', 'pol', 'env'].map((g, i) => { const x = 330 + i * 210; return <g key={g}>
            <text x={x} y={820} textAnchor="middle" style={{ font:`700 46px ${KF.mono}` }} fill={i === 2 && T > K.P ? KC.yellow : KC.texto}>{g}</text>
            {T > K.Ro + 1.2 + i * 0.4 && !(i === 2 && T > K.P) && <path d={`M ${x - 50} 900 L ${x + 50} 1020 M ${x + 50} 900 L ${x - 50} 1020`} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}
          </g>; })}
          {T > K.P && <circle cx={750} cy={960} r={90 + 10 * Math.sin(T * 5)} fill="none" stroke={KC.yellow} strokeWidth={8} />}
        </svg>
      </Escena>
      {/* estudio y fusión: la placenta por rayos X */}
      <Escena T={T} a={K.E} b={K.Ra}>
        <FondoLunares color={KC.mint} />
        <Panza T={T} />
      </Escena>
      <Escena T={T} a={K.Ra} b={K.O}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Raton x={560} y={1120} s={1.4} T={T} /></svg>
      </Escena>
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[['primates', VIR], ['roedores', KC.blue], ['conejos', KC.orange], ['carnívoros', KC.leaf], ['rumiantes', KC.lilac]].map(([t, c], i) => { const at = K.O + 0.4 + i * 0.45; if (T < at) return null; const p = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={t} transform={`translate(${i % 2 ? 760 : 320} ${560 + i * 130}) scale(${p})`}><rect x={-200} y={-52} width={400} height={104} rx={52} fill={KC.paper} stroke={KC.ink} strokeWidth={6} /><Retrovirus x={-140} y={0} s={0.42} T={T} color={c} seed={i} /><text x={30} y={14} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #3a1430 0%, #0E0F12 80%)' }}></div>
        <GenomaCuadros T={T} llenado={1} resalta={1} pulso={kprog(T, K.C + 1, K.C + 2)} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 2.6} until={K.R - 0.3} valor={8} prefijo="~" sufijo=" %" etiqueta="de tu ADN vino de virus" x={330} y={330} tam={150} color={VIR} />
      <Chip T={T} at={K.G + 0.3} until={K.G + 2.4} texto="tu genoma · 600 cuadritos" x={330} y={360} tam={36} mono borde={HUM} />
      <Etq T={T} at={K.R + 0.8} until={K.Ge - 0.3} x={640} y={560} texto="retrovirus" color={VIR} />
      <Etq T={T} at={K.R + 3.4} until={K.Ge - 0.3} x={620} y={1240} texto="se mete en tu ADN" color={VIR} />
      <Etq T={T} at={K.Ge + 0.6} until={K.H - 0.3} x={90} y={1050} texto="espermatozoide" color={KC.ink} />
      <Etq T={T} at={K.Ge + 0.3} until={K.H - 0.3} x={820} y={620} texto="óvulo" color={KC.ink} />
      <Chip T={T} at={K.H + 0.2} until={K.Ro - 0.3} texto="millones de años → hoy" y={420} tam={40} />
      <Chip T={T} at={K.Ro + 0.3} until={K.P - 0.2} texto="retrovirus endógenos: rotos" y={1480} tam={40} borde={KC.red} />
      <Chip T={T} at={K.P + 0.2} until={K.E - 0.3} texto="env: la envoltura" y={1480} tam={44} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2000" quien="Mi et al. · Genetics Institute" revista="Nature 403: 785–789 · sincitina" y={520} />
      <Lupa T={T} at={K.E + 3.6} until={K.Ra - 0.3} x={760} y={560} r={230} fx={700} fy={960} interior={(t, r) => <Sincitio T={t} r={r} funde={kprog(t, K.F + 0.6, K.F + 3.6)} />} etiqueta="RAYOS X · placenta" tinte={VIR2} />
      <Etq T={T} at={K.F + 3.4} until={K.Ra - 0.3} x={560} y={1150} texto="una sola capa: sincitio" color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ra + 0.2} until={K.Ra + 2.4} anio="2009" quien="Dupressoir et al. · Francia" revista="PNAS 106: 12127–12132 · ratones" y={540} />
      <Lupa T={T} at={K.Ra + 2.2} until={K.O - 0.3} x={540} y={560} r={200} fx={520} fy={1110} interior={(t, r) => <Sincitio T={t} r={r} sinSincitina />} etiqueta="sin sincitina" tinte={KC.red} />
      <Chip T={T} at={K.O + 0.2} until={K.C - 0.3} texto="cada grupo, su propio virus" y={1480} tam={40} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="parte de ti fue virus" x={360} y={330} tam={48} borde={VIR} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="1 de cada 12 *no es humano: es virus.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.Ge - 0.1} texto="Retrovirus: *meten su código* en la célula." />
      <Subtitulo T={T} idx={2} at={K.Ge + 0.1} until={K.H - 0.1} texto="Infectaron *óvulos y espermatozoides.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Ro - 0.1} texto="Y se heredó *hasta ti.*" />
      <Subtitulo T={T} idx={4} at={K.Ro + 0.1} until={K.P - 0.1} texto="Casi todos *están rotos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si alguno *todavía sirve?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.F - 0.1} texto="La sincitina *era la envoltura de un virus.*" />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.Ra - 0.1} texto="Funde las células *de tu placenta.*" />
      <Subtitulo T={T} idx={8} at={K.Ra + 0.1} until={K.O - 0.1} texto="Sin sincitina, *la placenta falla.*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.C - 0.1} texto="Otros mamíferos: *otros virus.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una parte de ti *fue virus.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Retro + 1.8, CUES.Germen - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Germen + 2.6, CUES.Hereda - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Rotos + 1.0, CUES.Pregunta - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'arriba-der'],
        [CUES.Estudio + 4.0, CUES.Funde + 3.5, 'avatar_13_senalando_arriba', 'grande-izq'],
        [CUES.Ratones + 2.6, CUES.Otros + 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Otros + 1.2, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="03" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={AVS('avatar_04_bajando_lentes')} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo mudo (M4 "Ciclo") ---------- */
// Virus → entra a una célula y se mete en su ADN → óvulo → bebé con placenta (la sincitina funde células)
// → generaciones → tu genoma en 100 cuadritos (8 rosas = 8 %) → el virus otra vez. Música: cada cuadrito es un toque
// y cada uno de los 8 virales, una nota; cada generación, un pulso.
function AdnViralMudo() {
  const { T, CUES } = useComposition();
  const K = { V: CUES.Virus, En: CUES.Entra, Ge: CUES.Germen, B: CUES.Bebe, Gn: CUES.Generaciones, Pl: CUES.Placenta, Cu: CUES.Cuadritos, L: CUES.Loop };
  const FIN = K.L + 6.5;
  const integra = kprog(T, K.En + 2.5, K.En + 5.5, kEase.suave);
  const VIR100 = new Set([7, 19, 23, 41, 56, 62, 78, 93]);
  const llena = kprog(T, K.Cu + 0.3, K.Cu + 7.3);
  const vuelve = kprog(T, K.L + 1, FIN - 0.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.V} b={K.Ge}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 40%, #2a1430 0%, #0E0F12 80%)' }}></div>
        <Ambiente T={T} n={30} seed={6} color="rgba(255,180,210,.35)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {T > K.En - 0.4 && <circle cx={540} cy={1300} r={560} fill="#1d2a3a" stroke="#4aa3ff" strokeWidth={10} opacity={kprog(T, K.En - 0.4, K.En + 0.4)} />}
          {T > K.En && <TiraADN T={T} y={1120} marca={integra > 0.5 ? [0.45, 0.6] : null} brillo={kprog(integra, 0.5, 1)} />}
          <Retrovirus x={klerp(540, 540, 0) + mece(T, 1, 0.15) * 40} y={T < K.En ? 860 + mece(T, 2, 0.2) * 40 : klerp(860, 1000, kprog(T, K.En, K.En + 2))} s={T < K.En ? 2.2 : klerp(2.2, 0.0001, kprog(T, K.En + 1.5, K.En + 2.6))} T={T} rot={T * 30} />
        </svg>
      </Escena>
      <Escena T={T} a={K.Ge} b={K.B}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.22)" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Ovulo x={540} y={920} s={1.3} T={T} infectado={1} /><Esperma x={klerp(-200, 330, kprog(T, K.Ge + 0.5, K.Ge + 3))} y={980} rot={-10} T={T} s={1.1} /></svg>
      </Escena>
      <Escena T={T} a={K.B} b={K.Gn}><FondoLunares color={KC.mint} /><Panza T={T} /></Escena>
      <Lupa T={T} at={K.B + 0.8} until={K.Gn - 0.3} x={540} y={600} r={260} fx={700} fy={960} interior={(t, r) => <Embrion T={t} r={r} k={kprog(t, K.B + 1, K.Gn - 0.6)} />} etiqueta="RAYOS X · bebé y placenta" tinte={VIR2} />
      <Escena T={T} a={K.Gn} b={K.Pl}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {Array.from({ length: 6 }, (_, i) => { const at = K.Gn + 0.4 + i * 1.3; if (T < at) return null; const p = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={i} transform={`translate(0 ${520 + i * 140}) scale(1 ${p})`}><TiraADN T={T} y={0} x0={180} x1={980} amp={30} marca={[0.45, 0.58]} fase={i} /><circle cx={110} cy={0} r={36} fill={i === 5 ? KC.pink : '#fff'} stroke={KC.ink} strokeWidth={6} /></g>; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.Pl} b={K.Cu}>
        <div style={{ position:'absolute', inset:0, background:'#3a0f22' }}></div>
        <div style={{ position:'absolute', left:540 - 420, top:900 - 420, width:840, height:840, borderRadius:'50%', overflow:'hidden', boxShadow:`0 0 0 10px ${VIR2}` }}><Sincitio T={T} r={420} funde={kprog(T, K.Pl + 1, K.Pl + 7)} /></div>
      </Escena>
      <Escena T={T} a={K.Cu} b={K.L}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #1b2b3a 0%, #0E0F12 80%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {Array.from({ length: 100 }, (_, i) => { const on = i < Math.floor(llena * 100), v = VIR100.has(i); const x = 150 + (i % 10) * 80, y = 650 + Math.floor(i / 10) * 80;
            return <rect key={i} x={x} y={y} width={66} height={66} rx={10} fill={!on ? 'rgba(255,255,255,.12)' : v ? VIR : HUM} stroke={v && on ? KC.ink : 'none'} strokeWidth={4} transform={v && on ? `translate(${(x + 33) * (1 - (1.1 + 0.1 * Math.sin(T * 5 + i)))} ${(y + 33) * (1 - (1.1 + 0.1 * Math.sin(T * 5 + i)))}) scale(${1.1 + 0.1 * Math.sin(T * 5 + i)})` : undefined} />; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.L} b={FIN + 1} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 40%, #2a1430 0%, #0E0F12 80%)' }}></div>
        <Ambiente T={T} n={30} seed={6} color="rgba(255,180,210,.35)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Retrovirus x={540 + mece(T, 1, 0.15) * 40} y={860 + mece(T, 2, 0.2) * 40} s={klerp(0.3, 2.2, vuelve)} T={T} rot={T * 30} /></svg>
      </Escena>

      {T > K.Cu + 0.3 && T < K.L - 0.2 && <div style={{ position:'absolute', left:0, right:0, top:380, textAlign:'center', zIndex:41, font:`400 110px/1 ${KF.titulo}`, color:VIR, WebkitTextStroke:`4px ${KC.ink}`, textShadow:KSOMBRA }}>{[...VIR100].filter((i) => i < Math.floor(llena * 100)).length} %</div>}
      <Chip T={T} at={K.Cu + 0.3} until={K.L - 0.3} texto="1 cuadrito = 1 % de tu ADN" y={1520} tam={36} mono borde={HUM} />
      <Chip T={T} at={K.Pl + 0.4} until={K.Cu - 0.3} texto="sincitina: las células se funden" y={380} tam={36} borde={VIR2} />
      <Chip T={T} at={K.Gn + 0.3} until={K.Pl - 0.3} texto="generación tras generación" y={380} tam={38} />

      <Robert T={T} apariciones={[
        [CUES.Virus - 1, CUES.Virus + 3.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Entra + 2, CUES.Entra + 6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Germen + 1, CUES.Germen + 5, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Bebe + 1.5, CUES.Bebe + 6.5, 'avatar_06_pensativo_menton', 'presentador'],
        [CUES.Generaciones + 3, CUES.Generaciones + 7, 'avatar_12_perfil_serio', 'abajo-izq'],
        [CUES.Placenta + 3, CUES.Placenta + 7, 'avatar_04_bajando_lentes', 'abajo-der'],
        [CUES.Cuadritos + 3, CUES.Loop - 0.5, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Loop + 2, CUES.Loop + 11.5, 'avatar_11_sorprendido', 'gancho']]} />
      <MarcaAgua T={T} tema="biologia" num="03" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AdnViralNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AdnViralNarrado /></CompositionStage></div>;
}
function AdnViralMudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AdnViralMudo /></CompositionStage></div>;
}
window.AdnViralNarradoApp = AdnViralNarradoApp;
window.AdnViralMudoApp = AdnViralMudoApp;
