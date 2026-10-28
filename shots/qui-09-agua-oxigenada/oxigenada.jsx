// Shot Químico #09 · Esa espuma no es tu herida sanando (agua oxigenada y catalasa) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const ENZ = '#9b5de5', SANGRE = '#d7263d', CAFE_BOT = '#5a3216';

function Rodilla({ x, y, s = 1, raspon = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -260 Q -200 -320 -40 -300 Q 160 -270 260 -120 Q 330 0 260 140 Q 160 300 -60 320 Q -260 330 -320 200 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={0} rx={150} ry={110} fill={mixHex('#f1b48f', '#e0646f', raspon)} />
    {raspon > 0 && [[-60, -30], [10, 20], [60, -10], [-20, 50], [40, 60]].map(([dx, dy], i) => <path key={i} d={`M ${dx - 30} ${dy} l 60 ${-8 + i * 3}`} stroke={SANGRE} strokeWidth={6} opacity={raspon} strokeLinecap="round" />)}
  </g>;
}
function BotellaCafe({ x, y, s = 1, inclina = 0 }) {
  return <Botella x={x} y={y} s={s} inclina={inclina} color={CAFE_BOT} liquido="#e8f6ff" etiqueta="H₂O₂ 3%" etqColor="#f6f3ec" tapa="#f6f3ec" />;
}
function EspumaH({ T, x, y, f = 1, w = 300, seed = 2 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: 40 }, (_, i) => { const bx = (R() - 0.5) * w, by = (R() - 0.5) * 140, r = 8 + R() * 22, p = R() * 6, on = i / 40 < f;
    return on ? <circle key={i} cx={x + bx + Math.sin(T * 3 + p) * 4} cy={y + by - (i / 40) * 60 * f + Math.cos(T * 4 + p) * 4} r={r} fill="rgba(255,255,255,.9)" stroke="rgba(120,160,190,.9)" strokeWidth={3} /> : null; })}</g>;
}
function Catalasa({ x, y, s = 1, boca = 0, rot = 0 }) {
  const a = 20 + boca * 30;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a * Math.PI / 180) * 60} ${-Math.sin(a * Math.PI / 180) * 60} A 60 60 0 1 0 ${Math.cos(a * Math.PI / 180) * 60} ${Math.sin(a * Math.PI / 180) * 60} Z`} fill={ENZ} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-6} cy={-30} r={8} fill="#fff" /><circle cx={-4} cy={-30} r={4} fill={KC.ink} />
  </g>;
}
function Globulo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={90} ry={60} fill={SANGRE} stroke={KC.ink} strokeWidth={6} />
    <ellipse rx={46} ry={26} fill="#a81a2e" />
  </g>;
}
function Boca({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -40 Q 0 -200 300 -40 Q 0 260 -300 -40 Z" fill="#7a1f2b" stroke={KC.ink} strokeWidth={10} />
    <path d="M -260 -60 Q 0 -170 260 -60 L 240 -30 Q 0 -120 -240 -30 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={60} rx={180} ry={70} fill="#e46a7a" />
    <ellipse cx={60} cy={60} rx={34} ry={22} fill="#f7f1d8" stroke="#c9a0a0" strokeWidth={4} />
  </g>;
}

function Oxigenada() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Ca: CUES.Catalasa, Bu: CUES.Burbujas, Mi: CUES.Mito, Pr: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Revision, Ta: CUES.Takahara, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const vierte = kprog(T, K.G, K.G + 0.35, kEase.sale);
  const espuma = kprog(T, K.G + 0.5, K.G + 3.0);
  const mitadRe = K.Re + 3.6;
  const R = krng(5);
  const moles = Array.from({ length: 7 }, () => [200 + R() * 680, 640 + R() * 480, R() * 360]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: chorro sobre la rodilla y espuma */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Rodilla x={540} y={1010} s={1.1} />
          <Chorro T={T} x0={330} y0={770} x1={520} y1={960} color="#e8f6ff" o={vierte * (1 - kprog(T, K.G + 2.6, K.G + 3.0))} />
          <BotellaCafe x={200} y={720} s={0.62} inclina={klerp(60, 120, vierte)} />
          <EspumaH T={T} x={540} y={980} f={espuma} />
        </SvgCapa>
      </Escena>
      {/* 1 · qué es */}
      <Escena T={T} a={K.Q} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Mol tipo="agua" x={300} y={900} s={2.2} rot={Math.sin(T) * 8} />
          <Mol tipo="h2o2" x={760} y={900} s={2.2} rot={Math.sin(T * 1.2) * 8} />
          <circle cx={760 + 30 * 2.2} cy={900} r={60 + Math.sin(T * 6) * 8} fill="none" stroke={KC.orange} strokeWidth={10} opacity={kprog(T, K.Q + 2.2, K.Q + 2.8)} />
          <text x={300} y={1120} textAnchor="middle" style={{ font:`700 60px ${KF.mono}` }} fill={KC.ink}>H₂O</text>
          <text x={760} y={1120} textAnchor="middle" style={{ font:`700 60px ${KF.mono}` }} fill={KC.ink}>H₂O₂</text>
        </SvgCapa>
      </Escena>
      {/* 2–3 · la catalasa y las burbujas */}
      <Escena T={T} a={K.Ca} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {[[180, 1180, 20], [420, 1220, -15], [700, 1190, 30], [930, 1230, -25]].map(([x, y, r], i) => <Globulo key={i} x={x} y={y} s={1} rot={r + Math.sin(T + i) * 5} />)}
          {moles.map(([x, y, r], i) => { const t0 = K.Ca + 1.2 + i * 0.35, come = kprog(T, t0, t0 + 0.5), sube = kprog(T, t0 + 0.6, t0 + 3.0, kEase.suave);
            return <g key={i}>
              {come < 1 && <Mol tipo="h2o2" x={x} y={y} s={0.9} rot={r + T * 30} o={1 - come} />}
              {T > t0 - 1 && come < 1 && <Catalasa x={klerp(x - 160, x - 70, kprog(T, t0 - 1, t0))} y={y} s={1} boca={Math.abs(Math.sin(T * 10))} />}
              {come >= 1 && <g><Mol tipo="agua" x={x - 30} y={y + 40} s={0.7} rot={T * 20} />
                <g transform={`translate(${x + 40} ${klerp(y - 20, 380, sube)})`}><circle r={36 + sube * 20} fill="rgba(255,255,255,.12)" stroke="#bfe8ff" strokeWidth={4} /><Mol tipo="o2" x={0} y={0} s={0.55} /></g></g>}
            </g>; })}
          {T > K.Bu && <EspumaH T={T} x={540} y={420} f={kprog(T, K.Bu, K.Bu + 2.2)} w={700} seed={8} />}
        </SvgCapa>
      </Escena>
      {/* 4 · mito */}
      <Escena T={T} a={K.Mi} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Rodilla x={540} y={1010} s={1.1} /><EspumaH T={T} x={540} y={980} f={1} /></SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 6 · 1985: fibroblastos en cultivo */}
      <Escena T={T} a={K.Es} b={K.Re}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <ellipse cx={600} cy={1100} rx={330} ry={110} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 14 }, (_, i) => { const x = 360 + (i % 7) * 80, y = 1070 + Math.floor(i / 7) * 60, muere = kprog(T, K.Es + 4.0 + i * 0.12, K.Es + 4.6 + i * 0.12);
            return <path key={i} d={`M ${x - 34} ${y} Q ${x} ${y - 22} ${x + 34} ${y} Q ${x} ${y + 22} ${x - 34} ${y} Z`} fill={mixHex('#ff8fa3', '#8a8f99', muere)} stroke={KC.ink} strokeWidth={4} opacity={1 - muere * 0.5} transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`} />; })}
          <Goteo T={T} x={600} y0={760} y1={1060} cada={0.4} color="#e8f6ff" desde={K.Es + 3.2} hasta={K.Es + 5} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.Es + 4.6} until={K.Re - 0.3} valor={100} dur={1.4} sufijo=" %" etiqueta="fibroblastos muertos (en cultivo)" y={1530} tam={130} color={KC.red} />
      </Escena>
      {/* 7 · 2026 y el agua de la llave */}
      <Escena T={T} a={K.Re} b={K.Ta}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T < mitadRe ? <g><BotellaCafe x={540} y={980} s={1.1} /><Marca x={760} y={760} ok={false} s={1} o={kprog(T, K.Re + 1.0, K.Re + 1.4)} /></g>
            : <g>
              <path d="M 220 640 L 220 700 L 300 700" stroke="#9aa3b5" strokeWidth={30} fill="none" strokeLinecap="round" />
              <Goteo T={T} x={300} y0={720} y1={900} cada={0.3} color="#7fc8ff" desde={mitadRe} hasta={K.Ta} />
              {[['agua de la llave', '#7fc8ff', 300], ['suero', '#cfe9ff', 760]].map(([t, c, x], i) => { const h = 380 * kprog(T, mitadRe + 0.3, mitadRe + 1.3, kEase.sale); return <g key={i}>
                <rect x={x - 100} y={1180 - h} width={200} height={h} fill={c} stroke={KC.ink} strokeWidth={7} />
                <text x={x} y={1230} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text></g>; })}
            </g>}
        </SvgCapa>
      </Escena>
      {/* 8 · Takahara 1948 */}
      <Escena T={T} a={K.Ta} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:'#c9b58e' }}></div>
        <SvgCapa>
          <Boca x={560} y={1020} s={1.2} />
          <g transform={`translate(${660} ${klerp(560, 760, kprog(T, K.Ta + 2.2, K.Ta + 2.8))})`}><rect x={-14} y={-160} width={28} height={140} rx={8} fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={-170} rx={30} ry={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>
          <Goteo T={T} x={660} y0={760} y1={1080} cada={0.4} color="#e8f6ff" desde={K.Ta + 2.8} hasta={K.Ta + 4.4} />
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.18)" />
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: la rodilla del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Rodilla x={540} y={1010} s={1.1} /><EspumaH T={T} x={540} y={980} f={1} /></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿está sanando?" x={330} y={470} tam={46} />
      <Chip T={T} at={K.G + 3.1} until={K.Q - 0.3} texto="tu cuerpo rompe el H₂O₂" x={360} y={470} tam={40} borde={ENZ} />
      <Chip T={T} at={K.Q + 0.3} until={K.Ca - 0.3} texto="peróxido de hidrógeno" x={540} y={1500} tam={46} borde={KC.orange} />
      <Etq T={T} at={K.Q + 2.4} until={K.Ca - 0.3} x={1030} y={1640} texto="un oxígeno de más" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Bu - 0.2} texto="catalasa: H₂O₂ → agua + oxígeno" x={540} y={1500} tam={38} borde={ENZ} />
      <Etq T={T} at={K.Ca + 0.4} until={K.Bu - 0.2} x={60} y={1640} texto="glóbulos rojos" tam={34} color={SANGRE} />
      <Chip T={T} at={K.Bu + 0.3} until={K.Pr - 0.2} texto="O₂ = las burbujas" x={540} y={1500} tam={46} borde="#bfe8ff" />
      <MitoTachado T={T} at={K.Mi + 0.3} tacharEn={K.Mi + 1.8} until={K.Pr - 0.2} texto="espuma = curación" x={540} y={480} tam={44} />
      <Chip T={T} at={K.Mi + 2.4} until={K.Pr - 0.2} texto="espuma = hay catalasa" x={540} y={1500} tam={46} borde={ENZ} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.8} anio="1985" quien="Lineaweaver et al." revista="Plast Reconstr Surg · H₂O₂ al 3 % en cultivo" x={620} y={760} />
      <Chip T={T} at={K.Re + 0.3} until={mitadRe - 0.2} texto="2026: desaconsejada en heridas de cirugía de piel" y={1500} tam={30} borde={KC.red} />
      <Chip T={T} at={mitadRe + 0.3} until={K.Ta - 0.3} texto="12 ensayos · mismas infecciones" y={1500} tam={40} borde="#7fc8ff" />
      <TarjetaEstudio T={T} at={K.Ta + 0.2} until={K.Ta + 2.4} anio="1948" quien="Takahara · Japón" revista="sin burbujas = sin catalasa" y={1580} />
      <Chip T={T} at={K.Ta + 4.6} until={K.Ci - 0.3} texto="ni una burbuja → acatalasemia" y={1500} tam={40} borde={ENZ} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="catalasa + H₂O₂ → agua + oxígeno" y={1500} tam={38} borde={ENZ} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es tu herida sanando: *es tu cuerpo.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Ca - 0.1} texto="Agua con *un oxígeno de más.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Bu - 0.1} texto="La catalasa *la parte.*" />
      <Subtitulo T={T} idx={3} at={K.Bu + 0.1} until={K.Mi - 0.1} texto="El oxígeno: *las burbujas.*" />
      <Subtitulo T={T} idx={4} at={K.Mi + 0.1} until={K.Pr - 0.1} texto="Espuma = *hay catalasa.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y sirve *para las heridas?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Re - 0.1} texto="En cultivo: *murieron todos.*" />
      <Subtitulo T={T} idx={7} at={K.Re + 0.1} until={K.Ta - 0.1} texto="Agua de la llave: *igual que suero.*" />
      <Subtitulo T={T} idx={8} at={K.Ta + 0.1} until={K.Ci - 0.1} texto="1948: *no hizo espuma.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es química *de tu propio cuerpo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Catalasa - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Catalasa + 1.4, CUES.Burbujas - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Mito + 0.3, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.0, CUES.Revision - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Revision + 1.2, CUES.Takahara - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Takahara + 1.0, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OxigenadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Oxigenada /></CompositionStage></div>;
}
window.OxigenadaApp = OxigenadaApp;
