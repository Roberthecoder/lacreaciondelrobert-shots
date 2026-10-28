// Shot IA #03 · Un chatbot por dentro: adivina la siguiente pieza de palabra — NARRADO (N1 "Por dentro").
// Viaje: el chat en el celular (macro) → por dentro (tokens, números, capas, lista de probabilidades) → el mismo chat, ya entendido.
// Cifras: GPT-3 175 mil millones de parámetros (OpenAI, 2020) · Llama 3 vocabulario de 128 mil tokens (Meta, 2024). Ver guion.md.
// Las barras de probabilidad del ejemplo "el cielo es…" son ilustrativas (sin números), y así lo dice la pantalla.
const PREG = ['¿De', ' qué', ' color', ' es', ' el', ' cielo', '?'];
const RESP = ['El', ' cielo', ' es', ' azul', '.'];
const CAND = [['azul', 1, KC.cyan], ['gris', 0.42, '#9aa3b5'], ['despejado', 0.28, KC.mint], ['bonito', 0.18, KC.pink], ['verde', 0.04, KC.leaf]];

// Barras de probabilidad (ilustrativas). u = 0..1 crecen. elegido = índice resaltado.
function Probas({ T, x = 120, y = 620, u = 1, elegido = -1, ancho = 640 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {CAND.map(([w, p, c], i) => { const yy = y + i * 92, on = i === elegido;
      return <g key={w}>
        <text x={x + 250} y={yy + 48} textAnchor="end" style={{ font:`700 44px ${KF.mono}` }} fill={on ? KC.yellow : KC.texto}>{w}</text>
        <rect x={x + 280} y={yy} width={Math.max(8, ancho * p * u)} height={64} rx={14} fill={c} stroke={on ? KC.yellow : KC.ink} strokeWidth={on ? 8 : 5} />
      </g>; })}
  </svg>;
}
// Perilla (parámetro) que gira.
function Perilla({ x, y, a, r = 26 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2b3445" stroke={KC.cyan} strokeWidth={4} />
    <line x1={0} y1={0} x2={Math.cos(a) * r * 0.8} y2={Math.sin(a) * r * 0.8} stroke={KC.yellow} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Dado.
function Dado({ x, y, s = 1, rot = 0, cara = 5 }) {
  const P = { 1: [[0, 0]], 3: [[-30, -30], [0, 0], [30, 30]], 5: [[-30, -30], [30, -30], [0, 0], [-30, 30], [30, 30]], 6: [[-30, -32], [30, -32], [-30, 0], [30, 0], [-30, 32], [30, 32]] };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-60} width={120} height={120} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {(P[cara] || P[5]).map(([a, b], i) => <circle key={i} cx={a} cy={b} r={11} fill={KC.ink} />)}
  </g>;
}

function Siguiente() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Corta, N: CUES.Numeros, Pe: CUES.Perillas, P: CUES.Pregunta, L: CUES.Lista, Ci: CUES.Cielo, R: CUES.Repite, E: CUES.Estudio, O: CUES.Ojo, A: CUES.Azar, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // respuesta que aparece token por token (gancho y cierre)
  const resp = (t0, cada = 0.55) => RESP.slice(0, Math.max(0, Math.min(RESP.length, Math.floor((T - t0) / cada) + 1))).join('');
  // zoom de entrada al celular (al final del gancho) y de salida (cierre)
  const entra = kprog(T, K.Co - 0.9, K.Co + 0.1, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el chat (macro). La respuesta sale pedacito por pedacito desde 0.3 s */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${1 + entra * 3})`, transformOrigin:'50% 62%' }}>
          <CelularChat T={T} x={380} y={1000} s={1.05} tam={44} mensajes={[{ at: K.G - 1, yo: true, texto: '¿De qué color es el cielo?' }, { at: K.G + 0.3, yo: false, texto: resp(K.G + 0.3) || '…' }]} />
        </div>
      </Escena>
      {/* 2–4 · por dentro: tokens → números → capas → perillas */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.02}>
        <FondoCircuito T={T} />
        {svg(<>
          {PREG.map((w, i) => { const sep = kprog(T, K.Co + 0.6 + i * 0.15, K.Co + 1.0 + i * 0.15, kEase.rebote), aN = kprog(T, K.N + 0.2, K.N + 1.2, kEase.suave), aPe = kprog(T, K.Pe - 0.6, K.Pe);
            const x0 = 150 + i * 120, x1 = 110 + i * 145;
            return <g key={i} opacity={1 - aPe}>
              <Ficha x={klerp(x0, x1, sep)} y={klerp(620, 560, aN)} texto={w.trim()} tam={40} color={[KC.yellow, KC.cyan, KC.mint, KC.pink, KC.orange, KC.lilac, KC.yellow][i]} />
              {T > K.Co + 0.6 + i * 0.15 && T < K.Co + 1.2 + i * 0.15 && <line x1={x1 + 62} y1={560} x2={x1 + 62} y2={680} stroke={KC.red} strokeWidth={6} strokeDasharray="10 8" />}
              {aN > 0 && Array.from({ length: 6 }, (_, k) => { const v = Math.sin(i * 3.1 + k * 1.7) * 0.5 + 0.5; return <rect key={k} x={x1 - 22} y={640 + k * 46} width={44 * aN} height={36} rx={6} fill={mixHex('#2f6dff', KC.yellow, v)} stroke={KC.ink} strokeWidth={3} />; })}
            </g>; })}
          {/* perillas: parámetros que giran */}
          {T > K.Pe - 0.6 && Array.from({ length: 96 }, (_, i) => { const c = i % 12, r = Math.floor(i / 12), on = kprog(T, K.Pe - 0.3 + i * 0.012, K.Pe + i * 0.012, kEase.rebote);
            return <g key={i} transform={`translate(${130 + c * 75} ${730 + r * 62}) scale(${on})`}><Perilla x={0} y={0} a={T * (1 + (i % 5) * 0.4) + i} /></g>; })}
        </>)}
        <RedNeuronal T={T} x={170} y={880} ancho={740} alto={300} capas={[6, 8, 8, 8, 6]} onda={((T - K.N) * 0.6) % 1} o={kprog(T, K.N + 1.0, K.N + 1.6) * (1 - kprog(T, K.Pe - 0.6, K.Pe))} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6–8 · la lista de probabilidades y el ejemplo "el cielo es…" */}
      <Escena T={T} a={K.L} b={K.R}>
        <FondoCircuito T={T} color={KC.mint} />
        {T < K.L + 4.0 && svg(Array.from({ length: 30 }, (_, i) => { const y = 560 + ((i * 64 + (T - K.L) * 260) % 640); return <text key={i} x={120 + (i % 3) * 300} y={y} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto} opacity={0.25 + 0.5 * ((i * 7) % 3) / 3}>{['casa', 'gato', 'ción', 'azul', 'run', 'el', 'cielo', 'mente', 'sol', 'des'][i % 10]}</text>; }))}
        {T >= K.L + 4.0 && <Probas T={T} y={700} u={kprog(T, K.L + 4.2, K.L + 5.4, kEase.sale)} elegido={T > K.Ci + 2.2 ? 0 : -1} />}
      </Escena>
      {/* 9 · repite: el token elegido se pega al final y vuelve a entrar */}
      <Escena T={T} a={K.R} b={K.E}>
        <FondoCircuito T={T} />
        {svg(<>
          {['el', 'cielo', 'es', 'azul', '.'].map((w, i) => { const at = i < 3 ? K.R - 1 : K.R + 0.4 + (i - 3) * 1.4, e = kprog(T, at, at + 0.4, kEase.rebote);
            return <Ficha key={i} x={160 + i * 170} y={600} texto={w} tam={40} s={e} color={i >= 3 ? KC.yellow : KC.cyan} />; })}
          <path d="M 900 700 C 1000 900 900 1080 540 1080 C 200 1080 80 900 160 700" fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-T * 120} />
          <path d="M 140 730 l 20 -40 l 26 36 z" fill={KC.yellow} />
        </>)}
        <RedNeuronal T={T} x={300} y={760} ancho={480} alto={260} capas={[4, 6, 6, 4]} onda={((T - K.R) * 0.7) % 1} />
      </Escena>
      {/* 10 · el estudio */}
      <Escena T={T} a={K.E} b={K.O}>
        <FondoLunares color={KC.orange} />
      </Escena>
      {/* 11 · probable no es verdadero */}
      <Escena T={T} a={K.O} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Robotito x={540} y={900} s={1.4} T={T} cara="seguro" />
          {T > K.O + 1.6 && <g transform={`translate(540 900) rotate(${-8 + Math.sin(T * 3) * 3})`} opacity={kprog(T, K.O + 1.6, K.O + 2.0)}><path d="M -230 -230 L 230 230 M 230 -230 L -230 230" stroke={KC.red} strokeWidth={30} strokeLinecap="round" opacity=".85" /></g>}
        </>)}
      </Escena>
      {/* 12 · azar: un dado y dos respuestas distintas */}
      <Escena T={T} a={K.A} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<Dado x={540} y={klerp(400, 860, kprog(T, K.A + 0.2, K.A + 1.0, kEase.rebote))} rot={(1 - kprog(T, K.A + 0.2, K.A + 1.2)) * 720} cara={T < K.A + 1.0 ? [1, 3, 6, 5][Math.floor(T * 10) % 4] : 5} s={1.3} />)}
        <div style={{ position:'absolute', left:90, top:1000, width:900, zIndex:30, display:'flex', gap:24 }}>
          {['El cielo es azul.', 'El cielo es azul claro.'].map((t, i) => { const e = kprog(T, K.A + 1.6 + i * 0.7, K.A + 2.0 + i * 0.7, kEase.sale);
            return <div key={i} style={{ flex:1, opacity:e, transform:`translateY(${(1 - e) * 40}px)`, background:'#262c3a', color:KC.texto, borderRadius:'28px 28px 28px 6px', padding:'18px 22px', font:`800 34px/1.2 ${KF.texto}`, border:`4px solid ${KC.ink}` }}>
              <div style={{ font:`700 24px ${KF.mono}`, color:KC.gold2, marginBottom:6 }}>intento {i + 1}</div>{t}</div>; })}
        </div>
      </Escena>
      {/* 13 · cierre: el mismo chat del inicio, ahora con cada pedacito como una apuesta */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${klerp(4, 1, kprog(T, K.C - 0.4, K.C + 0.8, kEase.suave))})`, transformOrigin:'50% 62%' }}>
          <CelularChat T={T} x={380} y={1000} s={1.05} tam={44} mensajes={[{ at: K.C - 2, yo: true, texto: '¿De qué color es el cielo?' }, { at: K.C + 0.8, yo: false, texto: resp(K.C + 0.8, 0.6) || '…' }]} />
        </div>
        {svg(RESP.map((w, i) => { const at = K.C + 0.8 + i * 0.6; return T > at ? <g key={i} opacity={kprog(T, at, at + 0.3)}><Dado x={160 + i * 95} y={470 - (i % 2) * 30} s={0.5} rot={(T - at) * 200 * Math.max(0, 1 - (T - at))} cara={[5, 3, 6, 1, 5][i]} /></g> : null; }))}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.Co + 0.3} until={K.N - 0.2} texto="tokens = pedacitos" x={540} y={430} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.N + 0.3} until={K.Pe - 0.4} texto="números → capas de cálculos" x={540} y={430} tam={40} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.Pe + 0.2} until={K.P - 0.2} valor={175000000000} dur={2.0} etiqueta="perillas (parámetros) · GPT-3, 2020" y={520} tam={92} />
      <Chip T={T} at={K.L + 0.4} until={K.L + 3.9} texto="¿cuál sigue?" x={540} y={430} tam={50} borde={KC.mint} />
      <NumeroGigante T={T} at={K.L + 4.2} until={K.Ci - 0.2} valor={128} dur={1.0} sufijo=" mil" etiqueta="tokens posibles · Llama 3, 2024" y={420} tam={110} color={KC.mint} />
      <Chip T={T} at={K.Ci + 0.2} until={K.R - 0.2} texto="el cielo es ___" x={540} y={430} tam={50} borde={KC.yellow} />
      <Etq T={T} at={K.Ci + 0.6} until={K.R - 0.2} x={1040} y={1200} texto="ejemplo ilustrativo" lado="izq" tam={26} />
      <Chip T={T} at={K.R + 0.2} until={K.E - 0.2} texto="escoge · pega · repite" x={540} y={430} tam={46} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.O - 0.3} anio="2020" quien="OpenAI · GPT-3" revista="Brown et al. · Language Models are Few-Shot Learners" y={820} />
      <Chip T={T} at={K.E + 2.6} until={K.O - 0.3} texto="más grande → aprende con pocos ejemplos" y={1120} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.O + 0.3} until={K.A - 0.2} texto="probable ≠ verdadero" x={620} y={460} tam={52} borde={KC.red} />
      <Chip T={T} at={K.A + 0.2} until={K.C - 0.2} texto="un poco de azar" x={540} y={430} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="no salió de golpe: la apostó" x={540} y={1540} tam={48} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No sale de golpe: *es una apuesta.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.N - 0.1} texto="Corta tu pregunta *en tokens.*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.Pe - 0.1} texto="Números que pasan *por capas de cálculos.*" />
      <Subtitulo T={T} idx={3} at={K.Pe + 0.1} until={K.P - 0.1} texto="GPT-3: *175 mil millones de perillas.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.L - 0.1} texto="¿Y qué *sale del otro lado?*" />
      <Subtitulo T={T} idx={5} at={K.L + 0.1} until={K.L + 4.1} texto="Una lista: *¿cuál sigue?*" />
      <Subtitulo T={T} idx={6} at={K.L + 4.2} until={K.Ci - 0.1} texto="Llama 3: *128 mil opciones.*" />
      <Subtitulo T={T} idx={7} at={K.Ci + 0.1} until={K.R - 0.1} texto="«Azul», muy probable; *«verde», poquito.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.E - 0.1} texto="Lo pega *y repite.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.O - 0.1} texto="Más grande: *tareas nuevas con pocos ejemplos.*" />
      <Subtitulo T={T} idx={10} at={K.O + 0.1} until={K.A - 0.1} texto="Lo probable *no es lo verdadero.*" />
      <Subtitulo T={T} idx={11} at={K.A + 0.1} until={K.C - 0.1} texto="Un poco de azar: *otra respuesta.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No salió de golpe: *la apostó.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Corta + 1.8, CUES.Numeros + 1.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Perillas + 2.4, CUES.Pregunta - 0.05, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Lista + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Cielo + 0.4, CUES.Repite + 0.6, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Estudio + 3.0, CUES.Ojo - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Ojo + 0.6, CUES.Azar - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Azar + 1.2, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="03" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SiguienteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Siguiente /></CompositionStage></div>;
}
window.SiguienteApp = SiguienteApp;
