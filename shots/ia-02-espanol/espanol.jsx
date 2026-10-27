// Shot IA #02 · Lo que leyó GPT-3: 92.6 % inglés y 0.77 % español — NARRADO (N4 "La imagen que se llena").
// Datos: openai/gpt-3, dataset_statistics/languages_by_word_count.csv (2020) y model-card.md (sept 2020). Ver guion.md.
// 100 cuadritos = todas las palabras del entrenamiento. Orden de llenado: inglés, francés, alemán, otros y al final español,
// para que el español quede dentro del ÚLTIMO cuadrito (0.773 de un cuadrito: "ni uno completo").
const IDIOMAS = [
  { k: 'en', nombre: 'inglés', pct: 92.64708, color: '#2f6dff' },
  { k: 'fr', nombre: 'francés', pct: 1.81853, color: KC.lilac },
  { k: 'de', nombre: 'alemán', pct: 1.46937, color: KC.yellow },
  { k: 'otros', nombre: 'los demás idiomas', pct: 100 - 92.64708 - 1.81853 - 1.46937 - 0.77289, color: '#8d96a8' },
  { k: 'es', nombre: 'español', pct: 0.77289, color: KC.red },
];
const GX = 80, GY = 500, GL = 560, GC = GL / 10;   // cuadrícula de 10 × 10

// Cuadrícula: cada idioma se llena hasta "lleno[k]" (0..1 de su porcentaje). gris = 0..1 (todo leído, sin color aún).
function Cien({ T, lleno = {}, gris = 0, brilla = -1 }) {
  let acc = 0; const seg = IDIOMAS.map((l) => { const s = { ...l, a: acc, b: acc + l.pct * (lleno[l.k] || 0) }; acc += l.pct; return s; });
  const celdas = [];
  for (let i = 0; i < 100; i++) {
    const c = i % 10, r = Math.floor(i / 10), x = GX + c * GC, y = GY + r * GC, g = i < gris * 100;
    const partes = seg.map((s) => { const a = Math.max(i, s.a), b = Math.min(i + 1, s.b); return b > a ? <rect key={s.k} x={x + 4 + (a - i) * (GC - 8)} y={y + 4} width={(b - a) * (GC - 8)} height={GC - 8} fill={s.color} /> : null; });
    const late = i === brilla ? 1 + 0.06 * Math.sin(T * 8) : 1;
    celdas.push(<g key={i} transform={`translate(${x + GC / 2} ${y + GC / 2}) scale(${late}) translate(${-x - GC / 2} ${-y - GC / 2})`}>
      <rect x={x + 4} y={y + 4} width={GC - 8} height={GC - 8} rx={8} fill={g ? '#3a4152' : 'rgba(255,255,255,.12)'} />
      {partes}
      <rect x={x + 4} y={y + 4} width={GC - 8} height={GC - 8} rx={8} fill="none" stroke={i === brilla ? KC.yellow : KC.ink} strokeWidth={i === brilla ? 7 : 3} />
    </g>);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{celdas}</svg>;
}
// Leyenda a la derecha: un renglón por idioma visible.
function Leyenda({ T, filas }) {
  return <div style={{ position:'absolute', left:680, top:690, width:380, zIndex:41, display:'flex', flexDirection:'column', gap:22 }}>
    {filas.map(([at, k, txt]) => { if (T < at) return null; const l = IDIOMAS.find((x) => x.k === k), e = kprog(T, at, at + 0.4, kEase.sale);
      return <div key={k} style={{ display:'flex', alignItems:'center', gap:14, opacity:e, transform:`translateX(${(1 - e) * 60}px)` }}>
        <div style={{ width:40, height:40, borderRadius:8, background:l.color, border:`4px solid ${KC.ink}` }}></div>
        <div style={{ font:`900 34px/1.05 ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{l.nombre}<br /><span style={{ font:`700 30px ${KF.mono}`, color:l.color === '#8d96a8' ? KC.texto : l.color }}>{txt}</span></div>
      </div>; })}
  </div>;
}
// Libro esquemático.
function Libro({ x, y, s = 1, color = KC.orange, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-80} width={120} height={160} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-80} width={22} height={160} fill="rgba(0,0,0,.2)" />
    <rect x={-20} y={-50} width={60} height={14} rx={4} fill="#fff" opacity=".7" />
  </g>;
}
// Personita (para "comunidades").
function Persona({ x, y, s = 1, color = KC.mint, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-34} r={20} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -30 30 Q -30 -8 0 -8 Q 30 -8 30 30 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function Espanol() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Cuadritos, R: CUES.Reto, I: CUES.Ingles, O: CUES.Otros, E: CUES.Espanol, M: CUES.Mucho, P: CUES.Pregunta, In: CUES.Internet, F: CUES.Ficha, Fu: CUES.Fuera, Co: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // cuántas celdas "leídas" (gris) en el gancho, y cuánto de cada idioma se colorea
  const gris = kprog(T, K.G + 0.2, K.G + 3.8) * (1 - kprog(T, K.R + 0.2, K.R + 0.6));
  const lleno = { en: kprog(T, K.I, K.I + 2.0, kEase.suave), fr: kprog(T, K.O + 0.1, K.O + 0.9), de: kprog(T, K.O + 1.2, K.O + 2.0), otros: kprog(T, K.E + 0.1, K.E + 0.8), es: kprog(T, K.E + 1.0, K.E + 2.2, kEase.sale) };
  const todo = { en: 1, fr: 1, de: 1, otros: 1, es: 1 };
  const palabras = ['the', 'of', 'and', 'le', 'der', 'to', 'the', 'el', 'in', 'is', 'die', 'a'];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–6 · los cien cuadritos (fondo noche: es "por dentro" de la IA) */}
      <Escena T={T} a={K.G} b={K.M} zoom={0.02}>
        <FondoCircuito T={T} color={KC.cyan} />
        {svg(palabras.map((w, i) => { const at = K.G + 0.05 + i * 0.28, u = kprog(T, at, at + 0.9, kEase.suave); return u > 0 && u < 1 ? <Ficha key={i} x={klerp(1150, GX + 60 + (i * 137) % 480, u)} y={klerp(380 + (i % 4) * 90, GY + 60 + (i * 89) % 480, u)} texto={w} tam={36} o={1 - u * 0.6} s={1 - u * 0.4} /> : null; }))}
        <Cien T={T} gris={T < K.R + 0.6 ? gris : 0} lleno={T < K.I ? {} : lleno} brilla={T > K.Cu + 0.4 && T < K.R ? 44 : T > K.E + 0.9 ? 99 : -1} />
        <Leyenda T={T} filas={[[K.I + 0.6, 'en', '92.6 %'], [K.O + 0.2, 'fr', '1.8 %'], [K.O + 1.3, 'de', '1.5 %'], [K.E + 0.3, 'otros', '3.3 %'], [K.E + 1.2, 'es', '0.77 %']]} />
      </Escena>
      {/* 7 · "suena a mucho": 1,510 millones contra 181,015 millones */}
      <Escena T={T} a={K.M} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={610} y={kprog(T, K.M + 4.2, K.M + 5.6, kEase.suave) * 0 + 1100 - 560 * kprog(T, K.M + 4.2, K.M + 5.6, kEase.suave)} width={320} height={560 * kprog(T, K.M + 4.2, K.M + 5.6, kEase.suave)} fill="#2f6dff" stroke={KC.ink} strokeWidth={8} />
          <rect x={150} y={1100 - Math.max(6, 560 * 0.00834) * kprog(T, K.M + 0.6, K.M + 1.2)} width={320} height={Math.max(6, 560 * 0.00834) * kprog(T, K.M + 0.6, K.M + 1.2)} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
          <line x1={100} y1={1104} x2={980} y2={1104} stroke={KC.ink} strokeWidth={10} />
          <text x={770} y={1160} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.M + 4.2, K.M + 4.6)}>inglés</text>
          <text x={310} y={1160} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>español</text>
        </>)}
      </Escena>
      {/* 8 · pregunta */}
      <Escena T={T} a={K.P} b={K.In} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 9 · de internet y de libros a un embudo donde casi todo es inglés */}
      <Escena T={T} a={K.In} b={K.F}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g transform={`translate(260 560) rotate(${T * 20})`}><circle r={150} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} /><ellipse rx={150} ry={60} fill="none" stroke={KC.ink} strokeWidth={6} /><ellipse rx={60} ry={150} fill="none" stroke={KC.ink} strokeWidth={6} /><line x1={-150} y1={0} x2={150} y2={0} stroke={KC.ink} strokeWidth={6} /></g>
          <text x={260} y={770} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>internet</text>
          {[0, 1, 2].map((i) => <Libro key={i} x={780 + i * 70} y={560 - i * 20} rot={-10 + i * 10} color={[KC.orange, KC.pink, KC.mint][i]} />)}
          <text x={850} y={720} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>libros</text>
          <path d="M 220 860 L 860 860 L 600 1130 L 480 1130 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
          {Array.from({ length: 24 }, (_, i) => { const t0 = K.In + 0.4 + i * 0.18, u = (T - t0) / 1.2; if (u < 0 || u > 1) return null; const es = i === 17;
            return <Ficha key={i} x={klerp(i % 2 ? 260 : 820, 540, u)} y={klerp(700, 1160, u * u)} texto={es ? 'ES' : i % 9 === 4 ? 'FR' : 'EN'} tam={30} color={es ? KC.red : i % 9 === 4 ? KC.lilac : '#6f9bff'} o={1 - u * 0.3} />; })}
        </>)}
      </Escena>
      {/* 10 · la ficha del modelo (model card) de OpenAI, sept 2020 */}
      <Escena T={T} a={K.F} b={K.Fu}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:150, top:520, width:780, height:700, background:KC.paper, border:`8px solid ${KC.ink}`, borderRadius:20, boxShadow:`16px 16px 0 ${KC.ink}`, transform:`rotate(-2deg) translateY(${(1 - kprog(T, K.F, K.F + 0.6, kEase.sale)) * 400}px)`, padding:'34px 44px', boxSizing:'border-box' }}>
          <div style={{ font:`700 30px ${KF.mono}`, color:'#5a524a' }}>OpenAI · sept 2020</div>
          <div style={{ font:`400 74px/1 ${KF.titulo}`, color:KC.ink, margin:'10px 0 20px' }}>Ficha de GPT-3</div>
          {[0, 1, 2].map((k) => <div key={k} style={{ height:20, background:'#d8d1c2', borderRadius:10, margin:'16px 0', width:`${90 - k * 12}%` }}></div>)}
          <div style={{ font:`900 40px/1.25 ${KF.texto}`, color:KC.ink, marginTop:26 }}>
            «más representativa de la gente <span style={{ background: T > K.F + 4.6 ? KC.yellow : 'transparent' }}>conectada a internet</span>… y sobre todo de <span style={{ background: T > K.F + 6.6 ? KC.yellow : 'transparent' }}>EE. UU.</span>»
          </div>
          <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a', marginTop:14 }}>(traducción; original: "mostly U.S.-centric")</div>
        </div>
      </Escena>
      {/* 11 · comunidades con menos internet */}
      <Escena T={T} a={K.Fu} b={K.Co}>
        <FondoLunares color={KC.orange} />
        {svg(Array.from({ length: 20 }, (_, i) => { const fuera = i % 5 === 3 || i % 7 === 2, o = fuera ? 1 - 0.75 * kprog(T, K.Fu + 0.8 + i * 0.05, K.Fu + 1.6 + i * 0.05) : 1;
          return <Persona key={i} x={190 + (i % 5) * 175} y={680 + Math.floor(i / 5) * 150} s={1.1} color={fuera ? KC.pink : KC.cyan} o={o} />; }))}
      </Escena>
      {/* 12 · consejo: el chat en español */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.pink} />
        <CelularChat T={T} x={620} y={1000} s={0.82} mensajes={[{ at: K.Co + 0.3, yo: true, texto: '¿Qué comida típica hay en mi pueblo?' }, { at: K.Co + 2.0, yo: false, texto: 'Claro, aquí tienes…' }]} escribe={[K.Co + 0.9, K.Co + 2.0]} />
      </Escena>
      {/* 13 · cierre: la misma cuadrícula del inicio, ya entendida */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <FondoCircuito T={T} color={KC.cyan} />
        <Cien T={T} lleno={todo} brilla={99} />
        <Leyenda T={T} filas={[[K.C, 'en', '92.6 %'], [K.C + 0.15, 'fr', '1.8 %'], [K.C + 0.3, 'de', '1.5 %'], [K.C + 0.45, 'otros', '3.3 %'], [K.C + 0.6, 'es', '0.77 %']]} />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.Cu - 0.2} texto="todo lo que leyó GPT-3" x={360} y={410} tam={42} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 0.3} until={K.R - 0.2} texto="1 cuadrito = 1 de cada 100 palabras" x={500} y={410} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.R + 0.2} until={K.I - 0.1} texto="¿cuántos en español?" x={360} y={410} tam={46} borde={KC.red} />
      <NumeroGigante T={T} at={K.E + 2.0} until={K.M - 0.2} valor={0.77} dec={2} dur={0.8} sufijo=" %" etiqueta="español" x={360} y={380} tam={110} color={KC.red} />
      <Lupa T={T} at={K.E + 1.6} until={K.M - 0.3} x={860} y={1540} r={150} fx={GX + 9.5 * GC} fy={GY + 9.5 * GC} tinte={KC.red} etiqueta="el último cuadrito"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a4152" /><rect x={0} y={0} width={r * 2 * 0.227} height={r * 2} fill="#8d96a8" /><rect x={r * 2 * 0.227} y={0} width={r * 2 * 0.773} height={r * 2} fill={KC.red} /></svg>} />
      <NumeroGigante T={T} at={K.M + 0.4} until={K.M + 4.0} valor={1510} dur={1.0} sufijo=" millones" etiqueta="palabras en español" x={650} y={450} tam={92} color={KC.red} />
      <NumeroGigante T={T} at={K.M + 4.2} until={K.P - 0.2} valor={181015} dur={1.2} sufijo=" millones" etiqueta="palabras en inglés" x={650} y={430} tam={92} color="#2f6dff" />
      <Chip T={T} at={K.M + 6.2} until={K.P - 0.2} texto="≈ 120 veces más" x={330} y={960} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Fu + 0.3} until={K.Co - 0.2} texto="menos internet = menos representadas" y={470} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Co + 2.6} until={K.C - 0.2} texto="¿en qué idioma aprendió?" x={540} y={470} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="tu idioma: ni un cuadrito" x={360} y={410} tam={42} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="Todo lo que leyó GPT-3, *en 100 cuadritos.*" />
      <Subtitulo T={T} idx={1} at={K.Cu + 0.1} until={K.R - 0.1} texto="Cada uno: *1 de cada 100 palabras.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.I - 0.1} texto="Adivina: *¿cuántos en español?*" />
      <Subtitulo T={T} idx={3} at={K.I + 0.1} until={K.O - 0.1} texto="Inglés: *casi 93.*" />
      <Subtitulo T={T} idx={4} at={K.O + 0.1} until={K.E - 0.1} texto="Francés *casi 2,* alemán *1.5.*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.M - 0.1} texto="¿Español? *Ni uno completo.*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.M + 4.1} texto="Más de 1,500 millones *de palabras en español…*" />
      <Subtitulo T={T} idx={7} at={K.M + 4.2} until={K.P - 0.1} texto="…contra 181 mil millones *en inglés.*" />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.In - 0.1} texto="¿Por qué *tan poquito?*" />
      <Subtitulo T={T} idx={9} at={K.In + 0.1} until={K.F - 0.1} texto="Internet y libros: *el inglés aplastó.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.F + 3.9} texto="Lo escribió *OpenAI en 2020:*" />
      <Subtitulo T={T} idx={11} at={K.F + 4.0} until={K.Fu - 0.1} texto="Representa más *a Estados Unidos.*" />
      <Subtitulo T={T} idx={12} at={K.Fu + 0.1} until={K.Co - 0.1} texto="Menos internet: *menos representadas.*" />
      <Subtitulo T={T} idx={13} at={K.Co + 0.1} until={K.C - 0.1} texto="Pregúntate: *¿en qué idioma aprendió?*" />
      <Subtitulo T={T} idx={14} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu idioma *no llenó ni uno.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Reto + 0.2, CUES.Ingles + 1.5, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Espanol + 0.6, CUES.Mucho - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Mucho + 5.5, CUES.Pregunta - 0.05, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Internet + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ficha + 3.5, CUES.Fuera - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Consejo + 0.4, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="02" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EspanolApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Espanol /></CompositionStage></div>;
}
window.EspanolApp = EspanolApp;
