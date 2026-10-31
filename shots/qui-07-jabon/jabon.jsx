// Shot Químico #07 · El jabón no desaparece la grasa: la encierra (micelas) — NARRADO (N1 por dentro + número N2).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PIEL = '#f1b48f', GRASA = '#f2c14e', CABEZA = '#ff3b6b', COLA = '#3a3a3a';

function Mano({ x, y, s = 1, rot = 0, espejo = false, mugre = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s}, ${s})`}>
    <path d="M -90 160 L -100 -20 Q -105 -60 -80 -60 Q -60 -60 -60 -20 L -60 -110 Q -60 -140 -35 -140 Q -10 -140 -10 -110 L -10 -130 Q -10 -160 15 -160 Q 40 -160 40 -130 L 40 -110 Q 40 -140 65 -140 Q 90 -140 90 -110 L 90 0 Q 90 40 120 40 L 150 20 Q 175 10 180 35 Q 120 120 80 160 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {mugre > 0 && [[-30, 20], [30, -40], [10, 80], [-60, 100]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={30} ry={18} fill={GRASA} opacity={mugre * 0.85} stroke="#b8902a" strokeWidth={3} />)}
  </g>;
}
function Espuma({ T, x, y, w = 400, h = 200, f = 1, seed = 4 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  return <g opacity={f}>{Array.from({ length: 26 }, (_, i) => { const bx = R() * w, by = R() * h, r = 14 + R() * 26, p = R() * 6;
    return <circle key={i} cx={x + bx + Math.sin(T * 2 + p) * 6} cy={y + by + Math.cos(T * 2 + p) * 6} r={r} fill="rgba(255,255,255,.75)" stroke="rgba(120,160,190,.9)" strokeWidth={3} />; })}</g>;
}
// Molécula de jabón: cabeza (círculo con carga) + cola en zigzag. ang en grados (la cola apunta hacia ang).
function MolJabon({ x, y, s = 1, ang = 0, n = 8, o = 1, T = 0 }) {
  const pts = Array.from({ length: n + 1 }, (_, i) => `${30 + i * 26},${(i % 2 ? 12 : -12) + Math.sin(T * 6 + i) * 2}`).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`} opacity={o}>
    <polyline points={pts} fill="none" stroke={COLA} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={0} cy={0} r={30} fill={CABEZA} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">−</text>
  </g>;
}
// Micela: k moléculas en círculo, colas hacia adentro. junta 0..1 = se forman desde lejos. grasa 0..1 = gota en el centro.
function Micela({ T, x, y, r = 170, k = 14, junta = 1, grasa = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 8})`}>
    {grasa > 0 && <circle r={(r - 40) * 0.8 * grasa} fill={GRASA} stroke="#b8902a" strokeWidth={5} />}
    {Array.from({ length: k }, (_, i) => { const a = (i / k) * Math.PI * 2, d = klerp(r * 2.6 + (i % 3) * 60, r, junta);
      return <MolJabon key={i} x={Math.cos(a) * d} y={Math.sin(a) * d} s={0.55} ang={a * 180 / Math.PI + 180 + (1 - junta) * (i * 47 % 120 - 60)} n={5} T={T + i} />; })}
  </g>;
}
function Virus({ T, x, y, s = 1, rompe = 0 }) {
  const n = 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2 - 0.05, sep = rompe * (60 + (i % 3) * 40);
      const cx = Math.cos((a0 + a1) / 2) * sep, cy = Math.sin((a0 + a1) / 2) * sep;
      return <g key={i} transform={`translate(${cx} ${cy}) rotate(${rompe * (i % 2 ? 30 : -30)})`} opacity={1 - rompe * 0.4}>
        <path d={`M ${Math.cos(a0) * 120} ${Math.sin(a0) * 120} A 120 120 0 0 1 ${Math.cos(a1) * 120} ${Math.sin(a1) * 120}`} stroke={GRASA} strokeWidth={26} fill="none" />
        <line x1={Math.cos(a0) * 132} y1={Math.sin(a0) * 132} x2={Math.cos(a0) * 175} y2={Math.sin(a0) * 175} stroke={KC.red} strokeWidth={12} />
        <circle cx={Math.cos(a0) * 180} cy={Math.sin(a0) * 180} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      </g>; })}
    <circle r={80} fill="#7a4fd0" stroke={KC.ink} strokeWidth={6} opacity={1 - rompe * 0.3} />
    <path d="M -40 -20 Q 0 -60 40 -20 Q 0 20 -40 60" stroke="#fff" strokeWidth={8} fill="none" opacity={0.7} />
  </g>;
}
function Hospital({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-200} width={600} height={360} fill="#d8c3a0" stroke={KC.ink} strokeWidth={9} />
    <path d="M -330 -200 L 0 -330 L 330 -200 Z" fill="#b89a70" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-200, -70, 70, 200].map((dx, i) => <rect key={i} x={dx - 40} y={-140} width={80} height={110} fill="#5b4a36" stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-60} y={20} width={120} height={140} fill="#5b4a36" stroke={KC.ink} strokeWidth={6} />
    <rect x={-25} y={-300} width={50} height={20} fill={KC.red} /><rect x={-10} y={-315} width={20} height={50} fill={KC.red} />
  </g>;
}

function Jabon() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Molecula, Sa: CUES.Sal, Mi: CUES.Micela, Gr: CUES.Grasa, Vi: CUES.Virus, Pr: CUES.Pregunta, Es: CUES.Estudio, Ta: CUES.Tallar, Hi: CUES.Historia, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const talla = (a) => Math.sin((T - a) * 9) * 40;
  const junta = kprog(T, K.Mi + 0.4, K.Mi + 3.4, kEase.suave);
  const grasa = kprog(T, K.Gr + 0.3, K.Gr + 2.0);
  const lava = kprog(T, K.Gr + 2.4, K.Gr + 4.0, kEase.suave);
  const rompe = kprog(T, K.Vi + 1.6, K.Vi + 3.0, kEase.sale);
  const mitad = K.Es + 4.6;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: manos con grasa que se tallan */}
      <Escena T={T} a={K.G} b={K.Mo} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Mano x={360 + talla(K.G)} y={1000} s={1.3} rot={20} mugre={1 - kprog(T, K.G + 1.5, K.G + 4.5)} />
          <Mano x={700 - talla(K.G)} y={1000} s={1.3} rot={-20} espejo mugre={1 - kprog(T, K.G + 1.5, K.G + 4.5)} />
          <Espuma T={T} x={330} y={760} w={420} h={260} f={kprog(T, K.G + 0.1, K.G + 1.2)} />
        </SvgCapa>
      </Escena>
      {/* 1–2 · la molécula */}
      <Escena T={T} a={K.Mo} b={K.Mi}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(80,170,255,.08)" />
          <MolJabon x={270} y={900} s={2.4} n={8} T={T} />
          {T > K.Sa && Array.from({ length: 8 }, (_, i) => T > K.Sa + 0.3 + i * 0.18 ? <circle key={i} cx={270 + (30 + (i + 1) * 26) * 2.4} cy={900 + (i % 2 ? -12 : 12) * 2.4} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /> : null)}
          {T > K.Sa && <Atomo x={klerp(160, 180, kprog(T, K.Sa, K.Sa + 0.5))} y={klerp(700, 760, kprog(T, K.Sa, K.Sa + 0.5))} r={36} color={QA.Na} letra="Na⁺" tam={24} />}
        </SvgCapa>
      </Escena>
      {/* 3–4 · micela y grasa */}
      <Escena T={T} a={K.Mi} b={K.Vi}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {[[540, 880, 1], [230, 1120, 0.55], [860, 1100, 0.6]].map(([x, y, s], i) => <g key={i} transform={`translate(${-lava * 1300} 0)`}><Micela T={T + i} x={x} y={y} s={s} junta={i === 0 ? junta : kprog(T, K.Mi + 1.0, K.Mi + 4, kEase.suave)} grasa={grasa} /></g>)}
          {T > K.Gr - 0.5 && T < K.Gr + 2.2 && Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.Gr + i * 0.15, K.Gr + 1.6 + i * 0.15, kEase.suave); return <circle key={i} cx={klerp(1000 - (i % 3) * 300, 540, u)} cy={klerp(560 + (i * 40), 880, u)} r={22 * (1 - u * 0.5)} fill={GRASA} stroke="#b8902a" strokeWidth={4} />; })}
          {lava > 0 && <path d={`M -100 ${780 + Math.sin(T * 4) * 10} Q 540 ${700} 1180 ${780}`} stroke="#7fc8ff" strokeWidth={60 * lava} fill="none" opacity={0.6} />}
        </SvgCapa>
      </Escena>
      {/* 5 · virus con envoltura */}
      <Escena T={T} a={K.Vi} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:'#1d1240' }}></div>
        <SvgCapa>
          <Virus T={T} x={540} y={880} s={1.5} rompe={rompe} />
          {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2, u = kprog(T, K.Vi + 0.3 + i * 0.08, K.Vi + 1.6 + i * 0.08, kEase.suave), d = klerp(560, 230, u);
            return <MolJabon key={i} x={540 + Math.cos(a) * d} y={880 + Math.sin(a) * d} s={0.8} ang={a * 180 / Math.PI + 180} n={5} T={T + i} o={1 - rompe * 0.5} />; })}
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · Cochrane 2021: ≈ −30 % */}
      <Escena T={T} a={K.Es} b={K.Ta}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {T > mitad && Array.from({ length: 10 }, (_, i) => { const x = 140 + (i % 5) * 200, y = 820 + Math.floor(i / 5) * 230, apaga = i >= 7 ? kprog(T, mitad + 1.4 + (i - 7) * 0.3, mitad + 1.7 + (i - 7) * 0.3) : 0, e = kprog(T, mitad + i * 0.08, mitad + i * 0.08 + 0.3, kEase.rebote);
            return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}>
              <circle r={80} fill={mixHex('#c9a14a', '#d9d6cf', apaga)} stroke={KC.ink} strokeWidth={7} opacity={1 - apaga * 0.5} />
              <path d="M -30 -20 Q 0 -50 30 -20 Q 10 10 -20 0 Q -40 20 0 30" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" opacity={1 - apaga * 0.6} />
              {apaga > 0 && <path d="M -60 -60 L 60 60" stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={apaga} />}
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 8 · tallar importa */}
      <Escena T={T} a={K.Ta} b={K.Hi}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Mano x={380 + talla(K.Ta) * 1.5} y={1000} s={1.3} rot={20} mugre={1 - kprog(T, K.Ta + 0.5, K.Ta + 3.6)} />
          <Mano x={700 - talla(K.Ta) * 1.5} y={1000} s={1.3} rot={-20} espejo mugre={1 - kprog(T, K.Ta + 0.5, K.Ta + 3.6)} />
          <Espuma T={T} x={330} y={760} w={420} h={260} f={1} seed={9} />
        </SvgCapa>
        <Medidor T={T} at={K.Ta + 0.2} until={K.Hi - 0.2} valor={(t) => 1 - 0.85 * kprog(t, K.Ta + 0.5, K.Ta + 3.6)} etiqueta="mugre en la piel" y={1480} color="#c9a14a" />
      </Escena>
      {/* 9 · siglo XIX */}
      <Escena T={T} a={K.Hi} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:'#c9b58e' }}></div>
        <SvgCapa><Hospital x={540} y={960} s={1.2} /><rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.2)" /></SvgCapa>
      </Escena>
      {/* 10 · cierre: las mismas manos, limpias */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Mano x={360} y={1000} s={1.3} rot={20} />
          <Mano x={700} y={1000} s={1.3} rot={-20} espejo />
          {[0, 1, 2].map((i) => <Micela key={i} T={T + i} x={klerp(300 + i * 220, 540, kprog(T, K.Ci + 1.0, K.Ci + 3.5))} y={klerp(700, 1500, kprog(T, K.Ci + 1.0 + i * 0.2, K.Ci + 3.5))} s={0.35} grasa={1} />)}
          <ellipse cx={540} cy={1530} rx={90} ry={26} fill="#3b3f48" stroke={KC.ink} strokeWidth={6} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿la desaparece?" x={330} y={470} tam={46} />
      <Chip T={T} at={K.G + 3.1} until={K.Mo - 0.3} texto="la encierra" x={300} y={470} tam={50} borde={GRASA} />
      <Etq T={T} at={K.Mo + 1.0} until={K.Mi - 0.3} x={60} y={1060} texto="cabeza: se lleva con el agua" tam={32} color={CABEZA} />
      <Etq T={T} at={K.Mo + 2.4} until={K.Mi - 0.3} x={1030} y={760} texto="cola: evita el agua" lado="izq" tam={32} />
      <Chip T={T} at={K.Sa + 0.3} until={K.Mi - 0.3} texto="sal de un ácido graso de cadena larga" y={1500} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.Mi + 2.6} until={K.Gr - 0.2} texto="micela" x={540} y={1500} tam={56} borde={CABEZA} />
      <Etq T={T} at={K.Gr + 0.8} until={K.Vi - 0.3} x={60} y={1500} texto="grasa al centro → el agua se la lleva" tam={32} />
      <Chip T={T} at={K.Vi + 0.3} until={K.Pr - 0.3} texto="envoltura de grasa del virus" y={1500} tam={38} borde={GRASA} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={mitad - 0.2} anio="2021" quien="Revisión Cochrane · 29 ensayos" revista="lavado de manos y diarrea" y={880} />
      <NumeroGigante T={T} at={mitad + 1.4} until={K.Ta - 0.3} valor={30} dur={1.4} prefijo="≈ −" sufijo=" %" etiqueta="episodios de diarrea" y={1530} tam={130} color={KC.ink} />
      <Chip T={T} at={mitad + 0.2} until={K.Ta - 0.3} texto="guarderías y comunidades" x={540} y={1690} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Hi + 0.5} until={K.Ci - 0.3} texto="siglo XIX" x={540} y={1500} tam={56} borde={KC.ink} fondo="rgba(60,40,20,.85)" />
      <Chip T={T} at={K.Ci + 3.4} until={K.Ou} texto="la encierra · el agua se la lleva" y={1680} tam={38} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="No la desaparece: *la encierra.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.Sa - 0.1} texto="Una cabeza *y una cola.*" />
      <Subtitulo T={T} idx={2} at={K.Sa + 0.1} until={K.Mi - 0.1} texto="Una sal de *ácido graso.*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.Gr - 0.1} texto="Colas adentro: *una micela.*" />
      <Subtitulo T={T} idx={4} at={K.Gr + 0.1} until={K.Vi - 0.1} texto="La grasa al centro, *el agua se la lleva.*" />
      <Subtitulo T={T} idx={5} at={K.Vi + 0.1} until={K.Pr - 0.1} texto="Les desarma *la envoltura.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y de verdad *cambia algo?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ta - 0.1} texto="Cerca de *30 % menos diarrea.*" />
      <Subtitulo T={T} idx={8} at={K.Ta + 0.1} until={K.Hi - 0.1} texto="*Tallar* importa." />
      <Subtitulo T={T} idx={9} at={K.Hi + 0.1} until={K.Ci - 0.1} texto="Se entendió *en el siglo XIX.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La encierra, *y el agua se la lleva.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Molecula + 1.0, CUES.Molecula + 5.9, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Micela + 1.0, CUES.Micela + 6.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Virus + 0.6, CUES.Pregunta - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.2, CUES.Tallar - 0.4, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Tallar + 0.4, CUES.Historia - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Historia + 0.7, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function JabonApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Jabon /></CompositionStage></div>;
}
window.JabonApp = JabonApp;
