// Shot cie-02 · Científico #02 — "La proteína que responde a un imán" (MagLOV, Oxford, Nature 2026).
// Dos versiones en un mismo archivo: ImanNarradoApp (N1 + N5) y ImanCicloApp (gemelo mudo M4).
// Guion, correcciones del video viejo y fuentes: guion.md. Los dibujos son esquemáticos:
// los electrones NO son bolitas con flechas, es una forma de dibujar el giro (espín).

const QAVS = (n) => 'assets/stickers/' + n + '.png';
const AZUL = '#3b7bff', VERDE = '#7ef0b0', FLAVINA = '#ffd43b', IMANR = '#ff3b2f', IMANA = '#2346ff';

/* ---------- campo de bacterias que brillan ----------
   brillo: 0..1 · n: cuántas. Las células NO se mueven cuando entra el imán: eso es parte del dato. */
function CampoBacterias({ T, brillo = 1, n = 22, seed = 5, luz = 1 }) {
  const g = krng(seed);
  const cel = Array.from({ length: n }, () => ({ x: 70 + g() * 940, y: 560 + g() * 760, r: g() * 180, s: 0.5 + g() * 0.6, f: g() * 7 }));
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {cel.map((c, i) => {
      const pulso = 0.82 + 0.18 * Math.sin(T * 1.6 + c.f);
      const b = brillo * pulso;
      return <g key={i} transform={`translate(${c.x + mece(T, i, 0.08) * 6} ${c.y + mece(T, i + 9, 0.07) * 6}) rotate(${c.r}) scale(${c.s})`}>
        {b > 0.02 && <ellipse rx={118} ry={52} fill={VERDE} opacity={0.26 * b} style={{ filter:`blur(${10 + 14 * b}px)` }} />}
        <rect x={-82} y={-32} width={164} height={64} rx={32}
          fill={mixHex('#24303f', VERDE, 0.18 + 0.72 * b)} stroke="#0d141c" strokeWidth={7} />
        <rect x={-62} y={-20} width={52} height={16} rx={8} fill="#fff" opacity={0.12 + 0.3 * b} />
      </g>;
    })}
    {luz > 0 && <rect x={0} y={0} width={KW} height={KH} fill={AZUL} opacity={0.07 * luz} />}
  </svg>;
}

/* ---------- imán de herradura ---------- */
function Iman({ T, x = 0, y = 0, s = 1, rot = 0, activo = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {activo > 0 && [1, 2, 3].map((k) => <ellipse key={k} rx={150 + k * 52} ry={110 + k * 40} fill="none"
      stroke={AZUL} strokeWidth={5} opacity={activo * 0.3 * (0.5 + 0.5 * Math.sin(T * 2.4 - k))} />)}
    <path d="M -96 70 L -96 -20 A 96 96 0 0 1 96 -20 L 96 70 L 36 70 L 36 -20 A 36 36 0 0 0 -36 -20 L -36 70 Z"
      fill="#9aa4ae" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-96} y={70} width={60} height={58} rx={6} fill={IMANR} stroke={KC.ink} strokeWidth={9} />
    <rect x={36} y={70} width={60} height={58} rx={6} fill={IMANA} stroke={KC.ink} strokeWidth={9} />
    <text x={-66} y={116} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">N</text>
    <text x={66} y={116} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">S</text>
  </g>;
}

/* ---------- la proteína con su flavina (dibujo esquemático) ----------
   excita: 0..1 (la luz azul llegó) · emite: 0..1 (está emitiendo) */
function Proteina({ T, x = 0, y = 0, s = 1, excita = 0, emite = 0, rot = 0 }) {
  const g = krng(7);
  const hel = Array.from({ length: 5 }, (_, i) => ({ a: i * 72 + g() * 30, r: 92 + g() * 40 }));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {emite > 0 && <circle r={210} fill={VERDE} opacity={0.3 * emite} style={{ filter:'blur(26px)' }} />}
    <circle r={168} fill="#1b2638" stroke="#3b4a60" strokeWidth={9} />
    {hel.map((h, i) => { const a = (h.a + T * 6) * Math.PI / 180;
      return <g key={i} transform={`translate(${Math.cos(a) * h.r * 0.55} ${Math.sin(a) * h.r * 0.55}) rotate(${h.a})`}>
        <rect x={-48} y={-17} width={96} height={34} rx={17} fill="#2f4059" stroke="#44597a" strokeWidth={5} />
      </g>; })}
    {/* la flavina: el cofactor que absorbe la luz azul */}
    <g transform={`scale(${1 + 0.06 * Math.sin(T * 3)})`}>
      <path d="M -44 -26 L 0 -50 L 44 -26 L 44 26 L 0 50 L -44 26 Z" fill={FLAVINA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round"
        style={{ filter:`drop-shadow(0 0 ${8 + 22 * excita}px ${FLAVINA})` }} />
      <path d="M -18 -12 L 18 -12 M -18 12 L 18 12" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}

/* ---------- los dos espines del par radical ----------
   emite: 1 = los espines quedan OPUESTOS (estado singlete: se recombina y emite luz) ·
          0 = quedan PARALELOS (triplete: no emite).
   Corregido el 28 oct 2026: antes el dibujo ponía "igual → emite", al revés de la física
   (Nature 2026: "mixing into the recombining singlet state is impeded" con ~10 mT). */
function Espines({ T, x = 0, y = 0, s = 1, alineado = 1, sep = 180 }) {
  const emite = alineado;   // 1 = opuestos (emite) · 0 = paralelos (no emite)
  const flecha = (dir, col) => <g>
    <circle r={34} fill={col} stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={dir * 54} x2={0} y2={-dir * 54} stroke={KC.texto} strokeWidth={10} strokeLinecap="round" />
    <path d={`M ${-16} ${-dir * 34} L 0 ${-dir * 62} L 16 ${-dir * 34} Z`} fill={KC.texto} />
  </g>;
  const giro = T * 90;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-sep} y1={0} x2={sep} y2={0} stroke="rgba(255,255,255,.25)" strokeWidth={6} strokeDasharray="14 12" />
    <g transform={`translate(${-sep} 0) rotate(${Math.sin(giro * Math.PI / 180) * 16})`}>{flecha(1, '#5a8dff')}</g>
    <g transform={`translate(${sep} 0) rotate(${Math.sin(giro * Math.PI / 180 + (emite > 0.5 ? Math.PI : 0)) * 16})`}>
      {flecha(emite > 0.5 ? -1 : 1, '#ff6b9a')}
    </g>
  </g>;
}

/* ---------- balanza de probabilidad (no empuja: inclina la probabilidad) ---------- */
function Balanza({ T, at, until, x = 540, y = 1120, p = 0.5, izq = 'emite', der = 'no emite' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), ang = (p - 0.5) * 34;
  return <div style={{ position:'absolute', left:x - 360, top:y - 120, width:720, zIndex:42, opacity:e.o }}>
    <svg width={720} height={240}>
      <g transform={`translate(360 120) rotate(${ang})`}>
        <rect x={-320} y={-10} width={640} height={20} rx={10} fill={KC.texto} />
        <circle cx={-300} cy={-56} r={46} fill={VERDE} stroke={KC.ink} strokeWidth={7} />
        <circle cx={300} cy={-56} r={46} fill="#5a6678" stroke={KC.ink} strokeWidth={7} />
      </g>
      <path d="M 360 130 L 310 230 L 410 230 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </svg>
    <div style={{ display:'flex', justifyContent:'space-between', font:`700 30px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, marginTop:-6 }}>
      <span style={{ color:VERDE }}>{izq}</span><span>{der}</span>
    </div>
  </div>;
}

/* ---------- planta de avena (de ahí salió el dominio LOV2) ---------- */
function Avena({ T, x = 0, y = 0, s = 1, seed = 3 }) {
  const b = mece(T, seed, 0.3) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${b * 0.5})`}>
    <path d={`M 0 0 C ${b * 2} -200, ${-b * 2} -420, ${b * 3} -620`} fill="none" stroke="#6fae3e" strokeWidth={14} strokeLinecap="round" />
    {[-1, 1].map((k) => <path key={k} d={`M 0 ${-180 + k * 90} q ${k * 150} -70 ${k * 230} -170`} fill="none" stroke="#86c24f" strokeWidth={13} strokeLinecap="round" />)}
    {Array.from({ length: 7 }, (_, i) => { const yy = -620 + i * 46, lado = i % 2 ? 1 : -1;
      return <g key={i} transform={`translate(${b * 3 + lado * (34 + i * 5)} ${yy}) rotate(${lado * 26 + mece(T, i, 0.5) * 4})`}>
        <ellipse rx={17} ry={40} fill="#e8c76a" stroke="#a98b3a" strokeWidth={5} />
        <line x1={0} y1={-40} x2={lado * 14} y2={-86} stroke="#c9ab55" strokeWidth={5} />
      </g>; })}
  </g>;
}

/* ================= VERSIÓN NARRADA ================= */
function ImanNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Brillan, I: CUES.Iman, N: CUES.Nombre, A: CUES.Avena, Q: CUES.Pregunta,
    P: CUES.Par, Gi: CUES.Giro, Ca: CUES.Campo, M: CUES.Mitad, R: CUES.Radio, Av: CUES.Aves, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const entraIman = (a) => kprog(T, a, a + 1.2, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO — las bacterias brillan y entra el imán */}
      <EscenaFundido T={T} a={K.G} b={K.B} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #101a2a 0%, #07090f 76%)' }}></div>
        <CampoBacterias T={T} brillo={1 - 0.5 * entraIman(K.G + 0.2)} n={22} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(${klerp(1420, 800, entraIman(K.G + 0.2))} 1120) rotate(-96)`}>
            <Iman T={T} s={1.35} activo={entraIman(K.G + 0.2)} />
          </g>
        </svg>
      </EscenaFundido>

      {/* 1 · BRILLAN — se enciende la luz azul */}
      <EscenaFundido T={T} a={K.B} b={K.I} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #0f1c33 0%, #07090f 76%)' }}></div>
        <CampoBacterias T={T} brillo={kprog(T, K.B + 0.3, K.B + 1.1, kEase.sale)} luz={kprog(T, K.B + 0.2, K.B + 0.8)} n={22} />
        <Chip T={T} at={K.B + 0.5} until={K.I - 0.3} texto="luz azul" y={420} borde={AZUL} tam={44} />
      </EscenaFundido>

      {/* 2 · IMÁN — el brillo cae, nada se mueve */}
      <EscenaFundido T={T} a={K.I} b={K.N} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #0f1c33 0%, #07090f 76%)' }}></div>
        <CampoBacterias T={T} brillo={1 - 0.52 * entraIman(K.I + 0.4)} luz={1} n={22} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(${klerp(1420, 790, entraIman(K.I + 0.4))} 1100) rotate(-96)`}>
            <Iman T={T} s={1.4} activo={entraIman(K.I + 0.4)} />
          </g>
        </svg>
        <Chip T={T} at={K.I + 1.4} until={K.N - 0.3} texto="10 mT · nada se movió" x={360} y={420} borde={IMANR} tam={42} />
      </EscenaFundido>

      {/* el medidor acompaña las tres primeras escenas */}
      <Medidor T={T} at={K.B + 0.4} until={K.N - 0.3} etiqueta="FLUORESCENCIA"
        valor={(t) => klerp(1, 0.5, entraIman(K.I + 0.4))}
        texto={(v) => Math.round(v * 100) + ' %'} y={1560} color={VERDE} />

      {/* 3 · NOMBRE — el estudio */}
      <EscenaFundido T={T} a={K.N} b={K.A} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0f1c33, #07090f)' }}></div>
        <Ambiente T={T} n={22} seed={11} color="rgba(120,180,255,.3)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={0.5}><Proteina T={T} x={540} y={1180} s={0.8} excita={0.4} emite={0.3} /></g>
        </svg>
      </EscenaFundido>
      <TarjetaEstudio T={T} at={K.N + 0.2} until={K.A - 0.3} anio="2026" quien="Abrahams y colegas · Oxford" revista="Nature" y={720} />
      <Chip T={T} at={K.N + 1.6} until={K.A - 0.3} texto="MagLOV" y={1000} borde={FLAVINA} tam={52} mono />

      {/* 4 · AVENA — de dónde salió */}
      <EscenaFundido T={T} a={K.A} b={K.Q} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff 0%, #00d2ff 68%, #7fe0c8 100%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={1420} width={KW} height={500} fill={KC.leaf} />
          <path d="M0 1420 Q 270 1392 540 1420 T 1080 1420" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
          <Avena T={T} x={290} y={1430} s={1.35} />
          <Avena T={T} x={140} y={1470} s={0.85} seed={8} />
          <g opacity={kprog(T, K.A + 1.4, K.A + 2.2)} transform="translate(760 880)">
            <circle r={180} fill="rgba(14,15,18,.82)" stroke={FLAVINA} strokeWidth={8} />
            <g transform="scale(0.86)"><Proteina T={T} x={0} y={0} s={0.92} excita={0.5} emite={0} /></g>
          </g>
        </svg>
        <Chip T={T} at={K.A + 0.4} until={K.Q - 0.3} texto="de la avena" y={400} borde={KC.gold} tam={44} />
        <Etiqueta T={T} at={K.A + 0.9} until={K.Q - 0.3} x={380} y={520} texto="Avena sativa" it color={KC.ink} tam={34} />
        <Etiqueta T={T} at={K.A + 2.4} until={K.Q - 0.3} x={560} y={1120} texto="dominio LOV2" color={FLAVINA} lado="izq" tam={34} />
      </EscenaFundido>

      {/* 5 · PREGUNTA — re-gancho */}
      <EscenaFundido T={T} a={K.Q} b={K.P} zoom={0.06} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 48%, #141f33 0%, #07090f 74%)' }}></div>
        <Ambiente T={T} n={26} seed={17} color="rgba(120,180,255,.32)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Proteina T={T} x={450} y={920} s={1.5} excita={0.4 + 0.3 * Math.sin(T * 2)} emite={0.2} rot={(T - K.Q) * 10} />
        </svg>
      </EscenaFundido>

      {/* 6 · PAR RADICAL — llega el fotón y saltan los espines */}
      <EscenaFundido T={T} a={K.P} b={K.Gi} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 44%, #141f33 0%, #07090f 76%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Proteina T={T} x={540} y={760} s={1.15} excita={kprog(T, K.P + 1.0, K.P + 1.6)} emite={0} />
          {/* el fotón azul que llega */}
          {(() => { const p = kprog(T, K.P + 0.2, K.P + 1.1, kEase.sale);
            return <g opacity={1 - kprog(T, K.P + 1.0, K.P + 1.3)}>
              <circle cx={klerp(90, 520, p)} cy={klerp(380, 740, p)} r={22} fill={AZUL} style={{ filter:`drop-shadow(0 0 18px ${AZUL})` }} />
              <path d={`M ${klerp(90, 520, p) - 70} ${klerp(380, 740, p) - 58} l 56 46`} stroke={AZUL} strokeWidth={8} opacity={0.6} strokeLinecap="round" />
            </g>; })()}
          <g opacity={kprog(T, K.P + 1.7, K.P + 2.4)}>
            <Espines T={T} x={540} y={1160} s={0.95} alineado={1} />
          </g>
        </svg>
        <Chip T={T} at={K.P + 2.2} until={K.Gi - 0.3} texto="par radical" y={420} borde="#ff6b9a" tam={46} />
      </EscenaFundido>

      {/* 7 · GIRO — dos caminos */}
      <EscenaFundido T={T} a={K.Gi} b={K.Ca} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#141f33, #07090f)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.Gi + 0.2, K.Gi + 0.8)}>
            <Espines T={T} x={540} y={680} s={1.15} alineado={1} sep={180} />
          </g>
          <g opacity={kprog(T, K.Gi + 1.4, K.Gi + 2.0)}>
            <Espines T={T} x={540} y={1000} s={1.15} alineado={0} sep={180} />
          </g>
        </svg>
        <Chip T={T} at={K.Gi + 0.6} until={K.Ca - 0.3} texto="opuestos → emite" x={540} y={840} borde={VERDE} tam={40} />
        <Chip T={T} at={K.Gi + 1.8} until={K.Ca - 0.3} texto="paralelos → no emite" x={540} y={1140} borde="#5a6678" tam={40} />
      </EscenaFundido>

      {/* 8 · CAMPO — inclina la probabilidad, no empuja */}
      <EscenaFundido T={T} a={K.Ca} b={K.M} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 42%, #1a1430 0%, #07090f 76%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(${klerp(1340, 800, entraIman(K.Ca + 0.3))} 500) rotate(-96)`}>
            <Iman T={T} s={1.0} activo={entraIman(K.Ca + 0.3)} />
          </g>
          <g opacity={kprog(T, K.Ca + 0.2, K.Ca + 0.8)}>
            <Espines T={T} x={430} y={760} s={0.95} alineado={1 - kprog(T, K.Ca + 1.4, K.Ca + 2.6)} sep={150} />
          </g>
        </svg>
        <Balanza T={T} at={K.Ca + 0.6} until={K.M - 0.3} y={1080}
          p={klerp(0.35, 0.72, kprog(T, K.Ca + 1.2, K.Ca + 3.0, kEase.suave))} />
        <Chip T={T} at={K.Ca + 2.6} until={K.M - 0.3} texto="no los empuja: cambia la probabilidad" y={430} borde={AZUL} tam={36} />
      </EscenaFundido>

      {/* 9 · MITAD — el número */}
      <EscenaFundido T={T} a={K.M} b={K.R} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #101a2a 0%, #07090f 76%)' }}></div>
        <CampoBacterias T={T} brillo={klerp(1, 0.5, kprog(T, K.M + 0.4, K.M + 2.0, kEase.suave))} luz={1} n={16} seed={9} />
      </EscenaFundido>
      {T >= K.M - 0.1 && T < K.R - 0.1 && <>
        <NumeroGigante T={T} at={K.M + 0.4} until={K.R - 0.3} valor={-50} sufijo=" %" dur={1.6} etiqueta="FLUORESCENCIA · 1 CÉLULA" y={430} tam={150} color={IMANR} />
        <Chip T={T} at={K.M + 2.2} until={K.R - 0.3} texto="MagLOV 2 · 0 → 10 mT" y={620} borde={AZUL} tam={42} mono />
      </>}

      {/* 10 · RADIO — ODMR, célula por célula */}
      <EscenaFundido T={T} a={K.R} b={K.Av} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#101a2a, #07090f)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* antena y ondas de radio */}
          <g transform="translate(540 560)">
            <line x1={0} y1={0} x2={0} y2={150} stroke="#9aa4ae" strokeWidth={14} strokeLinecap="round" />
            <circle cy={-14} r={20} fill={IMANR} stroke={KC.ink} strokeWidth={6} />
            {[1, 2, 3, 4].map((k) => { const p = ((T * 0.9 + k * 0.25) % 1);
              return <circle key={k} cy={-14} r={60 + p * 300} fill="none" stroke={IMANR} strokeWidth={6} opacity={(1 - p) * 0.6} />; })}
          </g>
          {/* cuadrícula de células; una responde sola */}
          {Array.from({ length: 12 }, (_, i) => { const cx = 190 + (i % 4) * 230, cy = 980 + Math.floor(i / 4) * 130;
            const sola = i === 6, on = sola ? 0.25 + 0.75 * Math.abs(Math.sin(T * 2.2)) : 0.8;
            return <g key={i} transform={`translate(${cx} ${cy})`}>
              <ellipse rx={78} ry={34} fill={mixHex('#24303f', VERDE, on * 0.85)} stroke="#0d141c" strokeWidth={6} />
              {sola && <ellipse rx={104} ry={58} fill="none" stroke={KC.gold} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-T * 40} />}
            </g>; })}
        </svg>
        <Chip T={T} at={K.R + 0.4} until={K.Av - 0.3} texto="604 MHz · 21.6 mT" x={340} y={400} borde={IMANR} tam={42} mono />
        <Chip T={T} at={K.R + 2.6} until={K.Av - 0.3} texto="ODMR · célula por célula" y={820} borde={KC.gold} tam={40} />
      </EscenaFundido>

      {/* 11 · AVES — hipótesis */}
      <EscenaFundido T={T} a={K.Av} b={K.C} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#ffd98a 0%, #ff9f68 55%, #ff7aa2 100%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[[300, 700, 1], [540, 600, 0.78], [760, 760, 0.62]].map(([bx, by, bs], i) => (
            <g key={i} transform={`translate(${bx + Math.sin(T * 0.8 + i) * 40} ${by + Math.sin(T * 1.6 + i) * 18}) scale(${bs})`}>
              <path d={`M -90 0 q 46 ${-40 - 26 * Math.sin(T * 4 + i)} 90 0 q 44 ${-40 - 26 * Math.sin(T * 4 + i)} 90 0`}
                fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
            </g>))}
          <g transform="translate(540 1140)" opacity={kprog(T, K.Av + 1.0, K.Av + 1.8)}>
            <circle r={150} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
            <circle r={122} fill="none" stroke="#b9b2a4" strokeWidth={5} />
            <g transform={`rotate(${mece(T, 2, 0.4) * 22})`}>
              <path d="M 0 -108 L 26 0 L 0 108 L -26 0 Z" fill={IMANR} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
              <path d="M 0 108 L 26 0 L 0 0 Z" fill="#dfe5ea" />
            </g>
            <text y={-128} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>N</text>
          </g>
        </svg>
        <Chip T={T} at={K.Av + 0.3} until={K.C - 0.3} texto="HIPÓTESIS" x={330} y={400} borde={IMANR} tam={52} mono />
      </EscenaFundido>

      {/* 12 · CIERRE — vuelve el campo de bacterias con el imán */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #101a2a 0%, #07090f 76%)' }}></div>
        <CampoBacterias T={T} brillo={0.75 - 0.25 * Math.sin((T - K.C) * 1.5)} luz={1} n={22} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(${840 + Math.sin((T - K.C) * 1.5) * 170} 1110) rotate(-96)`}>
            <Iman T={T} s={1.35} activo={0.8} />
          </g>
        </svg>
        <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="cuántica en bacterias vivas" x={350} y={420} borde={VERDE} tam={42} />
      </EscenaFundido>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="El imán no la mueve: *le cambia el giro.*" />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.I - 0.1} texto="Con *luz azul,* estas bacterias brillan." />
      <Subtitulo T={T} idx={2} at={K.I + 0.1} until={K.N - 0.1} texto="Acercas un imán y el brillo *baja a la mitad.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.A - 0.1} texto="Se llama *MagLOV.* La hicieron en Oxford." />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.Q - 0.1} texto="Salió de *un pedazo de avena.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.P - 0.1} texto="¿Apagar una luz *sin tocar nada?*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Gi - 0.1} texto="Quedan dos electrones *desapareados.*" />
      <Subtitulo T={T} idx={7} at={K.Gi + 0.1} until={K.Ca - 0.1} texto="De su giro depende *si emite luz.*" />
      <Subtitulo T={T} idx={8} at={K.Ca + 0.1} until={K.M - 0.1} texto="El campo cambia *la probabilidad.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.R - 0.1} texto="Con 10 mT, la luz cae *casi a la mitad.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.Av - 0.1} texto="Con radio a 604 MHz: *célula por célula.*" />
      <Subtitulo T={T} idx={11} at={K.Av + 0.1} until={K.C - 0.1} texto="La misma idea, como *hipótesis,* en las aves." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Cuántica *a temperatura ambiente.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // el gancho: el imán no la mueve
        [8.0,  11.6, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala el imán que entra y el brillo que cae
        [16.0, 19.8, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // salió de un pedazo de avena
        [20.7, 23.4, 'avatar_06_pensativo_menton', 'arriba-der'],  // re-gancho: ¿apagar una luz sin tocar nada?
        [29.0, 32.8, 'avatar_04_bajando_lentes',   'arriba-der'],  // de su giro depende si emite luz
        [38.0, 41.8, 'avatar_10_serio_molesto',    'presentador'],  // GRANDE: −50 % de fluorescencia
        [42.4, 46.0, 'avatar_02_apuntando_camara', 'arriba-der'],  // 604 MHz: célula por célula
        [48.4, 52.8, 'avatar_12_perfil_serio',     'arriba-der'],  // la brújula de las aves, como hipótesis
        [53.4, 57.9, 'avatar_13_senalando_arriba', 'gancho'],  // cierre: cuántica en bacterias vivas
      ]} />

      <MarcaAgua T={T} tema="fisica" num="02" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ================= GEMELO MUDO (M4 · el ciclo del par radical) ================= */
function ImanCiclo() {
  const { T, CUES } = useComposition();
  const K = { O: CUES.Oscuro, L: CUES.Luz, E: CUES.Emite, I: CUES.Iman, Tr: CUES.Triplete,
    B: CUES.Baja, Q: CUES.Quita, V: CUES.Vuelve, Ou: CUES.Outro };
  const caps = [
    { at: K.O, titulo: 'en reposo' }, { at: K.L, titulo: 'llega luz azul' },
    { at: K.E, titulo: 'par radical: giros opuestos' }, { at: K.I, titulo: 'entra el imán' },
    { at: K.Tr, titulo: 'los giros se quedan paralelos' }, { at: K.B, titulo: 'la luz cae a la mitad' },
    { at: K.Q, titulo: 'se quita el imán' }, { at: K.V, titulo: 'vuelve a emitir' },
  ];
  const excita = kprog(T, K.L + 0.6, K.L + 2.0);
  // el campo está puesto desde "Baja" hasta que se quita: ahí la fluorescencia cae a la mitad y vuelve
  const campo = kprog(T, K.B, K.B + 1.6, kEase.suave) * (1 - kprog(T, K.Q + 0.8, K.V, kEase.suave));
  const emite = kprog(T, K.E + 0.2, K.E + 1.0) * (1 - 0.52 * campo) * (1 - kprog(T, K.Ou - 1.0, K.Ou - 0.1));
  const imanIn = kprog(T, K.I + 0.4, K.I + 2.0, kEase.suave) * (1 - kprog(T, K.Q + 0.2, K.Q + 2.0, kEase.suave));
  const alineado = 1 - kprog(T, K.Tr + 0.4, K.Tr + 2.4, kEase.suave) * (1 - kprog(T, K.Q + 0.6, K.V, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 44%, #141f33 0%, #07090f 78%)' }}></div>
      <Ambiente T={T} n={24} seed={19} color="rgba(120,180,255,.26)" tam={[3, 9]} />

      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <Proteina T={T} x={540} y={740} s={1.25} excita={excita} emite={kclamp(emite, 0, 1)} rot={T * 5} />
        {/* fotones azules que llegan una y otra vez */}
        {T > K.L && Array.from({ length: 6 }, (_, i) => {
          const per = 2.2, t0 = K.L + 0.3 + i * 0.37, p = (((T - t0) / per) % 1);
          if (T < t0) return null;
          return <circle key={i} cx={klerp(60, 470, p)} cy={klerp(300, 700, p)} r={14} fill={AZUL}
            opacity={(1 - p) * 0.9} style={{ filter:`drop-shadow(0 0 14px ${AZUL})` }} />;
        })}
        <g opacity={kprog(T, K.E - 0.4, K.E + 0.4)}>
          <Espines T={T} x={540} y={1220} s={1.0} alineado={alineado} sep={170} />
        </g>
        <g transform={`translate(${klerp(1340, 870, imanIn)} 520) rotate(-104)`} opacity={Math.min(1, imanIn * 2)}>
          <Iman T={T} s={0.95} activo={imanIn} />
        </g>
      </svg>

      <Capitulo T={T} caps={caps} hasta={K.Ou - 0.1} />
      <Medidor T={T} at={K.E - 0.2} until={K.Ou - 0.2} etiqueta="FLUORESCENCIA"
        valor={() => kclamp(emite, 0, 1)} texto={(v) => Math.round(v * 100) + ' %'} y={1560} color={VERDE} />
      <Chip T={T} at={K.I + 1.2} until={K.Q + 0.4} texto="10 mT" y={400} borde={IMANR} tam={46} mono />
      <Chip T={T} at={K.V + 2.0} until={K.Ou - 0.1} texto="…y vuelve a empezar" y={400} borde={KC.gold} tam={44} />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // la proteína en reposo
        [5.5,  9.5,  'avatar_13_senalando_arriba', 'presentador'],  // GRANDE: llega la luz azul
        [14.0, 17.5, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // par radical: emite
        [22.0, 25.5, 'avatar_10_serio_molesto',    'arriba-der'],  // entra el imán
        [30.0, 33.5, 'avatar_06_pensativo_menton', 'arriba-der'],  // los giros se desemparejan
        [38.0, 41.5, 'avatar_12_perfil_serio',     'arriba-der'],  // la luz cae a la mitad
        [46.0, 49.5, 'avatar_04_bajando_lentes',   'arriba-der'],  // se quita el imán
        [52.5, 56.5, 'avatar_02_apuntando_camara', 'arriba-der'],  // vuelve a emitir: el loop
      ]} />

      <MarcaAgua T={T} tema="fisica" num="02" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ImanNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <ImanNarrado />
    </CompositionStage>
  </div>;
}
function ImanCicloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <ImanCiclo />
    </CompositionStage>
  </div>;
}
window.CampoBacterias = CampoBacterias; window.Iman = Iman; window.Proteina = Proteina; window.Espines = Espines;
window.ImanNarradoApp = ImanNarradoApp;
window.ImanCicloApp = ImanCicloApp;
