// Fungi Mati #03 · Esto no es plástico: la seta rosa (Pleurotus djamor) — NARRADA (N1 "Por dentro" + N5) y MUDO (M4 "Ciclo").
// Fotos reales: cultivo de Robert (feb–abr 2026, video "Pink oyster from spore print to fruiting"). Guion y fuentes: guion.md.
const AVS = (n) => 'assets/stickers/' + n + '.png';
const FOTO = (n) => 'assets/foto_' + n + '.png';
const FOTOS = ['racimo1', 'racimo2', 'laminillas', 'esporada', 'placa', 'grano', 'primordios', 'joven', 'racimo_video'].map(FOTO);
const ROSA = '#f59ab0', ROSA2 = '#d9668a';
const fondoPuntos = (c) => ({ position:'absolute', inset:0, background:c, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' });

// Esporas de Pleurotus: cilíndricas, alargadas (≈ 7–10 × 3–4 µm), lisas.
function EsporaPl({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}><rect x={-15} y={-6} width={30} height={12} rx={6} fill="#f3d6e3" stroke="#7a3a55" strokeWidth={2.5} /><ellipse cx={-6} cy={-2} rx={5} ry={2} fill="rgba(255,255,255,.5)" /></g>;
}
// Micelio que crece radial dentro de un círculo (placa o lupa), en coordenadas de un cuadro 2r × 2r.
function MicelioRadial({ r, p, seed = 9, color = '#fbf7ee' }) {
  const arb = kArbolRadial(seed, 260, true), k = r / 3400;
  return <g transform={`translate(${r} ${r})`}>{arb.map((s, i) => { const q = kclamp((p - s.b) / (s.e - s.b), 0, 1); if (q <= 0) return null;
    return <line key={i} x1={s.x1 * k} y1={s.y1 * k} x2={(s.x1 + (s.x2 - s.x1) * q) * k} y2={(s.y1 + (s.y2 - s.y1) * q) * k} stroke={color} strokeWidth={3} strokeLinecap="round" opacity=".9" />; })}</g>;
}
// Termómetro vertical con el rango 22–30 °C marcado.
function Termometro({ T, x, y, valor = 26, alto = 620 }) {
  const t2y = (c) => y + alto - (c / 45) * alto;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={x - 40} y={y} width={80} height={alto} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 70} y={t2y(30)} width={140} height={t2y(22) - t2y(30)} rx={12} fill={KC.yellow} opacity=".55" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
    <rect x={x - 20} y={t2y(valor)} width={40} height={y + alto - t2y(valor)} rx={20} fill={KC.red} />
    <circle cx={x} cy={y + alto + 40} r={70} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {[10, 20, 30, 40].map((c) => <g key={c}><line x1={x + 40} y1={t2y(c)} x2={x + 70} y2={t2y(c)} stroke={KC.ink} strokeWidth={5} /><text x={x + 82} y={t2y(c) + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{c}°</text></g>)}
  </svg>;
}

/* ---------- versión NARRADA ---------- */
function SetaNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Es: CUES.Especie, Ep: CUES.Esporada, Pl: CUES.Placa, Gr: CUES.Grano, P: CUES.Pregunta, A: CUES.Aire, H: CUES.Humedad, C: CUES.Calor, R: CUES.Rosa, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const co2 = (t) => 1 - 0.8 * kprog(t, K.A + 1.6, K.A + 3.8, kEase.suave);
  const abreH = kprog(T, K.H + 1.2, K.H + 4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Precarga srcs={FOTOS} />
      {/* 0 · gancho: la foto real entra girando; "plástico" y "coral" se tachan */}
      <Escena T={T} a={K.G} b={K.Es} fondo={KC.pink} zoom={0.03}>
        <div style={fondoPuntos(KC.pink)}></div>
        <FotoRecorte T={T} at={K.G + 0.02} src={FOTO('racimo1')} x={400} y={860} w={520} h={700} rot={-3} seed={1} zoom={0.1} />
      </Escena>
      {/* 1 · la especie */}
      <Escena T={T} a={K.Es} b={K.Ep} fondo={KC.mint}>
        <div style={fondoPuntos(KC.mint)}></div>
        <FotoRecorte T={T} at={K.Es} src={FOTO('racimo2')} x={380} y={800} w={470} h={633} rot={-4} seed={2} />
        <FotoRecorte T={T} at={K.Es + 1.2} src={FOTO('laminillas')} x={790} y={960} w={340} h={340} rot={5} seed={3} />
      </Escena>
      {/* 2 · esporada: dibujo de la seta soltando esporas alargadas + la foto */}
      <Escena T={T} a={K.Ep} b={K.Pl} fondo={KC.yellow}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <FotoRecorte T={T} at={K.Ep + 0.1} src={FOTO('racimo_video')} x={540} y={1010} w={720} h={405} rot={2} seed={4} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:39 }}>
          <g transform="translate(300 470) scale(1 -1)"><SetaOstra s={1.9} abre={1} rot={-8} color={ROSA} oscuro={ROSA2} /></g>
          {Array.from({ length: 30 }, (_, i) => { const u = ((T - K.Ep) * 0.5 + i / 30) % 1; return <EsporaPl key={i} x={440 + (i % 6) * 36 + Math.sin(u * 6 + i) * 20} y={520 + u * 300} s={1.4} rot={i * 40 + T * 60} o={Math.sin(Math.PI * u)} />; })}
        </svg>
      </Escena>
      {/* 3 · placa de agar: foto + lupa de rayos X con el micelio que nace */}
      <Escena T={T} a={K.Pl} b={K.Gr} fondo={KC.cyan}>
        <div style={fondoPuntos(KC.cyan)}></div>
        <FotoRecorte T={T} at={K.Pl + 0.05} src={FOTO('placa')} x={350} y={1000} w={480} h={411} rot={-3} seed={5} />
      </Escena>
      {/* 4 · grano y sustrato: línea de tiempo con las fechas reales */}
      <Escena T={T} a={K.Gr} b={K.P} fondo={KC.lilac}>
        <div style={fondoPuntos(KC.lilac)}></div>
        <FotoRecorte T={T} at={K.Gr + 0.05} src={FOTO('grano')} x={330} y={800} w={440} h={346} rot={-4} seed={6} pie="15 mar" />
        <FotoRecorte T={T} at={K.Gr + 1.4} src={FOTO('primordios')} x={720} y={1030} w={440} h={330} rot={4} seed={7} pie="19 abr" />
      </Escena>
      {/* 5-8 · la bolsa: pregunta, aire, humedad, calor */}
      <Escena T={T} a={K.P} b={K.R} fondo={KC.mint} zoom={0.02}>
        <div style={fondoPuntos(KC.mint)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <BolsaCultivo T={T} x={540} y={1060} w={430} h={600} col={1} rayos={kprog(T, K.P + 0.3, K.P + 1) * (1 - kprog(T, K.A, K.A + 0.8))} />
          {/* con CO₂ alto: pie largo y sombrero chico (deforme); con aire fresco: sombreros normales */}
          {T > K.A && <g opacity={1 - kprog(T, K.A + 3.8, K.A + 4.4)}><RacimoOstra T={T} x={720} y={860} s={1.3} abre={0.35} pie={3.2} n={5} color={ROSA} oscuro={ROSA2} /></g>}
          {T > K.A + 3.8 && <RacimoOstra T={T} x={720} y={860} s={klerp(1.3, 1.6, abreH)} abre={0.5 + 0.5 * abreH} pie={1} n={7} color={ROSA} oscuro={ROSA2} />}
          {/* luz (ventana) */}
          {T > K.H && <g opacity={kprog(T, K.H + 0.5, K.H + 1.2)}>{Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${-40 + i * 30} ${300 + i * 12} L ${700} ${720 + i * 50}`} stroke="#fff9c4" strokeWidth={22} opacity={0.25 + 0.1 * Math.sin(T * 2 + i)} />)}</g>}
          {/* gotitas de humedad */}
          {T > K.H && Array.from({ length: 20 }, (_, i) => { const u = ((T - K.H) * 0.35 + i / 20) % 1; return <circle key={i} cx={120 + (i * 47) % 860} cy={380 + u * 900} r={7} fill="#fff" opacity={0.7 * Math.sin(Math.PI * u)} />; })}
        </svg>
        <Lupa T={T} at={K.P + 0.3} until={K.A - 0.2} x={540} y={600} r={230} fx={540} fy={1060} etiqueta="POR DENTRO · bolsa" tinte={KC.cyan}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a2614" />{Array.from({ length: 24 }, (_, i) => <rect key={i} x={(i * 53) % (r * 2)} y={(i * 97) % (r * 2)} width={34} height={12} rx={3} fill="#a86d2c" transform={`rotate(${i * 37} ${(i * 53) % (r * 2)} ${(i * 97) % (r * 2)})`} />)}<MicelioRadial r={r} p={1} seed={4} /></svg>} />
        <Medidor T={T} at={K.A + 0.6} until={K.H - 0.2} etiqueta="CO₂ EN LA BOLSA" valor={co2} texto={(v) => (v > 0.5 ? 'alto' : 'bajo')} y={330} color={KC.red} />
        <Medidor T={T} at={K.H + 0.2} until={K.C - 0.2} etiqueta="HUMEDAD" valor={(t) => 0.9 * kprog(t, K.H + 0.3, K.H + 2)} texto={(v) => Math.round(v * 100) + ' %'} y={330} color={KC.cyan} />
        <Medidor T={T} at={K.H + 1.4} until={K.C - 0.2} etiqueta="LUZ" valor={(t) => 0.5 * kprog(t, K.H + 1.5, K.H + 2.6)} texto={() => 'algo'} y={460} color={KC.yellow} />
      </Escena>
      {/* 8 · calor: termómetro */}
      <Escena T={T} a={K.C} b={K.R} fondo={KC.orange}>
        <div style={fondoPuntos(KC.orange)}></div>
        <Termometro T={T} x={330} y={420} valor={klerp(8, 27, kprog(T, K.C + 0.2, K.C + 2, kEase.sale))} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><RacimoOstra T={T} x={760} y={1000} s={1.8} abre={kprog(T, K.C + 1, K.C + 3)} n={7} color={ROSA} oscuro={ROSA2} /></svg>
      </Escena>
      {/* 9 · el rosa: estudio + primordios intensos que se aclaran */}
      <Escena T={T} a={K.R} b={K.Ci} fondo={KC.lilac}>
        <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 24px, transparent 24px 48px)' }}></div>
        <TarjetaEstudio T={T} at={K.R + 0.3} until={K.R + 3.6} anio="2017" quien="Dulce Salmones · INECOL, Xalapa" revista="Scientia Fungorum 46: 73–85" y={740} />
        {T > K.R + 3.6 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {(() => { const m = kprog(T, K.R + 4.4, K.R + 6.6, kEase.suave); return <>
            <RacimoOstra T={T} x={270} y={1000} s={1.0} abre={0.45} n={6} color="#ff4f86" oscuro="#c93a6a" />
            <path d="M 470 900 L 600 900" stroke={KC.ink} strokeWidth={10} markerEnd="" /><path d="M 590 875 L 630 900 L 590 925" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <RacimoOstra T={T} x={800} y={1000} s={1.2} abre={1} n={7} color={mixHex('#ff5f8f', '#f8d2dc', m)} oscuro={mixHex('#c93a6a', '#e7aebe', m)} />
          </>; })()}
        </svg>}
      </Escena>
      {/* 10 · cierre: la misma foto del inicio, con la lupa en la base (micelio escondido) */}
      <Escena T={T} a={K.Ci} b={FIN} fondo={KC.pink}>
        <div style={fondoPuntos(KC.pink)}></div>
        <FotoRecorte T={T} at={K.Ci - 0.5} src={FOTO('racimo1')} x={400} y={860} w={520} h={700} rot={-3} seed={1} zoom={0.04} />
      </Escena>

      {/* textos sobre las escenas */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.Es - 0.3} texto="¿plástico?" x={300} y={330} tam={44} />
      <MitoTachado T={T} at={K.G + 0.8} tacharEn={K.G + 2.0} until={K.Es - 0.3} texto="¿coral?" x={300} y={440} tam={44} />
      <Chip T={T} at={K.G + 2.6} until={K.Es - 0.2} texto="un hongo vivo" y={1500} x={400} borde={KC.mint} tam={44} />
      <Etq T={T} at={K.Es + 0.6} until={K.Ep - 0.2} x={640} y={420} texto="Pleurotus djamor" it color={KC.ink} />
      <Chip T={T} at={K.Es + 2.2} until={K.Ep - 0.2} texto="silvestre en México y el trópico" y={1500} x={400} borde={KC.gold} tam={38} />
      <Etq T={T} at={K.Ep + 1.4} until={K.Pl - 0.2} x={700} y={620} texto="esporas (≈ 8 µm)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ep + 0.2} until={K.Ep + 2.6} texto="micelio en aserrín pasteurizado" y={420} borde={KC.mint} tam={36} />
      <Chip T={T} at={K.Ep + 2.4} until={K.Pl - 0.2} texto="esporada · 3 feb 2026" y={1500} x={400} borde={KC.pink} tam={38} />
      <Lupa T={T} at={K.Pl + 0.7} until={K.Gr - 0.3} x={720} y={560} r={250} fx={360} fy={1000} etiqueta="AL MICROSCOPIO · agar" tinte={KC.mint}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#e7cf8f" opacity=".25" /><MicelioRadial r={r} p={kprog(t, K.Pl + 1, K.Gr - 0.3)} /><g transform={`translate(${r} ${r})`}><EsporaPl x={0} y={0} s={1.6} /></g></svg>} />
      <Chip T={T} at={K.Pl + 0.3} until={K.Gr - 0.2} texto="agar PDA · 4 feb" y={1500} x={400} borde={KC.mint} tam={38} />
      <Chip T={T} at={K.Gr + 0.3} until={K.P - 0.2} texto="grano → sustrato → semanas" y={420} borde={KC.gold} tam={38} />
      <Chip T={T} at={K.A + 3.9} until={K.H - 0.2} texto="aire fresco = sombrero normal" y={1500} x={400} borde={KC.mint} tam={36} />
      <MitoTachado T={T} at={K.A + 1.2} tacharEn={K.A + 3.6} until={K.A + 4} texto="mucho CO₂ = deforme" x={540} y={1500} tam={38} />
      <Chip T={T} at={K.H + 2.8} until={K.C - 0.2} texto="la luz abre el sombrero" y={1500} x={400} borde={KC.yellow} tam={36} />
      <Chip T={T} at={K.C + 1.8} until={K.R - 0.2} texto="tropical: 22–30 °C" y={1500} x={400} borde={KC.red} tam={44} />
      <Etq T={T} at={K.R + 4.4} until={K.Ci - 0.2} x={300} y={1100} texto="primordio" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 5.4} until={K.Ci - 0.2} x={760} y={1120} texto="adulta" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 4} until={K.Ci - 0.2} texto="¿por qué se pierde el rosa? sin resolver" y={420} borde={KC.pink} tam={36} />
      <Lupa T={T} at={K.Ci + 0.8} until={K.O - 0.1} x={760} y={760} r={170} fx={480} fy={1180} etiqueta="micelio" tinte={KC.mint}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a2614" /><MicelioRadial r={r} p={1} seed={4} /></svg>} />
      <Chip T={T} at={K.Ci + 0.3} until={K.O} texto="no es plástico: es un fruto" y={330} borde={KC.mint} tam={40} />

      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.Es - 0.1} texto="No es plástico: *es un hongo vivo.*" />
      <Subtitulo T={T} idx={1} at={K.Es + 0.1} until={K.Ep - 0.1} texto="La seta rosa, *Pleurotus djamor.*" />
      <Subtitulo T={T} idx={2} at={K.Ep + 0.1} until={K.Pl - 0.1} texto="De un bloque de aserrín… *y su esporada.*" />
      <Subtitulo T={T} idx={3} at={K.Pl + 0.1} until={K.Gr - 0.1} texto="En agar PDA: *mi propia cepa.*" />
      <Subtitulo T={T} idx={4} at={K.Gr + 0.1} until={K.P - 0.1} texto="Se comió el sustrato *por dentro.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.A - 0.1} texto="¿Qué le avisa que *es hora de dar fruto?*" />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.H - 0.1} texto="Aire fresco: con mucho CO₂ *se deforma.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.C - 0.1} texto="Humedad muy alta *y algo de luz.*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={K.R - 0.1} texto="Le gusta el calor: *22 a 30 °C.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Ci - 0.1} texto="¿Y el rosa? *Se pierde al madurar.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.O - 0.1} texto="El fruto de un micelio *que casi nunca ves.*" />

      <Robert T={T} apariciones={[[0, 3.6, 'avatar_11_sorprendido', 'gancho'], [6.5, 10, 'avatar_13_senalando_arriba', 'bajo-der'], [14, 17.5, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'], [22, 25.6, 'avatar_04_bajando_lentes', 'bajo-der'], [26.3, 29.5, 'avatar_06_pensativo_menton', 'bajo-der'], [31, 34.5, 'avatar_07_pensativo_puno', 'bajo-der'], [41.5, 44.5, 'avatar_12_perfil_serio', 'arriba-der'], [48.5, 52.4, 'avatar_11_sorprendido', 'presentador-bajo'], [53.5, 58, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="03" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo MUDO: de esporada a primordios, 77 días en 61.5 s (loop con fotos reales) ---------- */
// Fechas reales (sobreimpresas en el video de Robert): 3 feb esporada · 4 feb placas · 15 mar grano · 29 mar bolsa · 19–21 abr primordios.
const DIAS = { Racimo: 0, Esporada: 0, Placa: 1, Grano: 40, Bolsa: 54, Primordios: 75, Cosecha: 77 };
function SetaCiclo() {
  const { T, CUES } = useComposition();
  const K = { Ra: CUES.Racimo, E: CUES.Esporada, Pl: CUES.Placa, G: CUES.Grano, B: CUES.Bolsa, Pr: CUES.Primordios, C: CUES.Cosecha, F: CUES.Outro };
  const tramo = [[K.E, 0], [K.Pl, 1], [K.G, 40], [K.B, 54], [K.Pr, 75], [K.C, 77]];
  let dia = 0; for (let i = 0; i < tramo.length - 1; i++) if (T >= tramo[i][0]) dia = klerp(tramo[i][1], tramo[i + 1][1], kprog(T, tramo[i][0] + 0.5, tramo[i + 1][0] - 0.3));
  if (T >= K.C) dia = 77;
  const caps = [{ at: K.Ra + 0.2, titulo: 'Un racimo rosa' }, { at: K.E, titulo: 'Esporada' }, { at: K.Pl, titulo: 'Placa de agar' }, { at: K.G, titulo: 'Grano' }, { at: K.B, titulo: 'Bolsa' }, { at: K.Pr, titulo: 'Primordios' }, { at: K.C, titulo: 'Y otra vez' }];
  const fechas = { [K.E]: '3 feb', [K.Pl]: '4 feb', [K.G]: '15 mar', [K.B]: '29 mar', [K.Pr]: '19 abr' };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Precarga srcs={FOTOS} />
      <Escena T={T} a={K.Ra - 1} b={K.E} fondo={KC.pink} zoom={0.05}><div style={fondoPuntos(KC.pink)}></div>
        <FotoRecorte T={T} at={K.Ra - 1} src={FOTO('racimo_video')} x={540} y={900} w={760} h={485} rot={-2} seed={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:39 }}>{Array.from({ length: 24 }, (_, i) => { const u = ((T - K.Ra) * 0.4 + i / 24) % 1; return <EsporaPl key={i} x={300 + (i * 23) % 500 + Math.sin(u * 5 + i) * 30} y={1180 + u * 300} s={1.3} rot={i * 40 + T * 50} o={Math.sin(Math.PI * u)} />; })}</svg>
      </Escena>
      <Escena T={T} a={K.E} b={K.Pl} fondo={KC.yellow}><div style={fondoPuntos(KC.yellow)}></div>
        <FotoRecorte T={T} at={K.E + 0.05} src={FOTO('laminillas')} x={540} y={900} w={760} h={428} rot={2} seed={2} />
        <Lupa T={T} at={K.E + 1.6} until={K.Pl - 0.4} x={540} y={1450} r={190} fx={600} fy={900} etiqueta="esporas" tinte={KC.pink}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2a33" />{Array.from({ length: 26 }, (_, i) => <EsporaPl key={i} x={(i * 71) % (r * 2)} y={(i * 113) % (r * 2)} s={2} rot={i * 47 + t * 20} />)}</svg>} />
      </Escena>
      <Escena T={T} a={K.Pl} b={K.G} fondo={KC.cyan}><div style={fondoPuntos(KC.cyan)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <PlacaPetri x={540} y={1000} r={380} agar="#f1d79a" id="pm"><g transform="translate(-380 -380)"><MicelioRadial r={380} p={kprog(T, K.Pl + 0.6, K.G - 0.6, kEase.suave)} /></g></PlacaPetri>
        </svg>
        <FotoRecorte T={T} at={K.Pl + 5} src={FOTO('placa')} x={760} y={560} w={330} h={283} rot={5} seed={3} pie="15 mar" />
      </Escena>
      <Escena T={T} a={K.G} b={K.B} fondo={KC.lilac}><div style={fondoPuntos(KC.lilac)}></div>
        <FotoRecorte T={T} at={K.G - 0.3} src={FOTO("grano")} x={540} y={900} w={700} h={550} rot={-3} seed={4} zoom={0.12} />
      </Escena>
      <Escena T={T} a={K.B} b={K.Pr} fondo={KC.mint}><div style={fondoPuntos(KC.mint)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><BolsaCultivo T={T} x={540} y={1000} w={480} h={680} col={kprog(T, K.B + 0.3, K.Pr - 1, kEase.suave)} /></svg>
      </Escena>
      <Escena T={T} a={K.Pr} b={K.C} fondo={KC.pink}><div style={fondoPuntos(KC.pink)}></div>
        <FotoRecorte T={T} at={K.Pr + 0.05} src={FOTO('primordios')} x={540} y={900} w={760} h={570} rot={2} seed={5} zoom={0.15} />
      </Escena>
      <Escena T={T} a={K.C} b={K.F + 4} fondo={KC.pink} zoom={0.05}><div style={fondoPuntos(KC.pink)}></div>
        <FotoRecorte T={T} at={K.C - 0.3} src={FOTO("racimo2")} x={330} y={860} w={400} h={539} rot={-4} seed={6} />
        <FotoRecorte T={T} at={K.C + 1.2} src={FOTO('joven')} x={770} y={1000} w={360} h={360} rot={4} seed={7} />
        <FotoRecorte T={T} at={K.C + 5.4} src={FOTO('racimo_video')} x={540} y={900} w={760} h={485} rot={-2} seed={1} />
      </Escena>

      {/* contador de días (dato real) */}
      {T < K.C && <div style={{ position:'absolute', left:40, top:420, zIndex:44 }}>
        <div style={{ display:'inline-block', background:'rgba(14,15,18,.85)', border:`5px solid ${KC.gold}`, borderRadius:30, padding:'10px 34px' }}>
          <span style={{ font:`700 34px ${KF.mono}`, color:KC.texto }}>DÍA </span>
          <span style={{ font:`400 84px/1 ${KF.titulo}`, color:KC.yellow }}>{Math.round(dia)}</span>
          <span style={{ font:`700 34px ${KF.mono}`, color:'rgba(246,243,236,.7)' }}> / 77</span>
        </div>
      </div>}
      {Object.entries(fechas).map(([t, f]) => <Chip key={t} T={T} at={+t + 0.3} until={+t + 4} texto={f} x={240} y={1320} borde={KC.pink} tam={36} mono />)}
      <Capitulo T={T} caps={caps} hasta={K.F} />
      <Etq T={T} at={K.Ra + 1} until={K.E - 0.2} x={160} y={1250} texto="Pleurotus djamor" it tam={32} />
      <Chip T={T} at={K.Pl + 1} until={K.G - 0.3} texto="micelio" y={1540} x={400} borde={KC.mint} tam={44} />
      <Chip T={T} at={K.Pr + 1} until={K.C - 0.3} texto="¡aire, humedad y luz!" y={1540} x={400} borde={KC.yellow} tam={42} />
      <Chip T={T} at={K.C + 2.4} until={K.F - 0.2} texto="y vuelve a empezar" y={1540} x={400} borde={KC.gold} tam={42} />
      <Robert T={T} apariciones={[[0, 3.5, 'avatar_11_sorprendido', 'gancho'], [8, 11.5, 'avatar_13_senalando_arriba', 'bajo-der'], [16, 19.5, 'avatar_06_pensativo_menton', 'bajo-der'], [24.5, 28, 'avatar_04_bajando_lentes', 'arriba-der'], [33, 37, 'avatar_02_apuntando_camara', 'presentador-bajo'], [41, 44.5, 'avatar_11_sorprendido', 'arriba-der'], [50, 53.5, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'], [55, 58, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="03" hasta={K.F} />
      <CierreMarca T={T} at={K.F} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" frase="De esporada a primordios: 77 días" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

window.SetaNarradoApp = kApp(SetaNarrado);
window.SetaCicloApp = kApp(SetaCiclo);
