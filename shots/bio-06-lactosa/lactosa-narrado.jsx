// Shot bio-06 · Biotecnológico #06 — versión NARRADA (N1 "Por dentro" + N5 "El experimento").
// Las escenas y los subtítulos se ajustan a la voz con narrar.mjs (window.SUBS); sin voz usan los
// tiempos estimados de OM_SCENES. Guion, correcciones y fuentes: guion.md.

/* ---------- piezas propias de este shot ---------- */

// Interior de la Lupa de rayos X: un trozo del borde del intestino con sus enzimas.
// cuantas: 0..1 cuántas enzimas quedan (de bebé muchas, de adulto casi ninguna).
function BordeConEnzimas({ T, r, cuantas = 1 }) {
  const D = r * 2, sup = r * 1.25, nc = 10, n = 5;
  return <svg width={D} height={D}>
    <rect x={0} y={sup} width={D} height={D - sup} fill="#e8837f" />
    {Array.from({ length: nc }, (_, i) => <g key={'c' + i}>
      <rect x={i * (D / nc) + 2} y={sup} width={D / nc - 4} height={r * 0.62} rx={6}
        fill={i % 2 ? '#ffd9d2' : '#ffc7bd'} stroke="#8e3b3b" strokeWidth={3} />
      <circle cx={i * (D / nc) + D / nc / 2} cy={sup + r * 0.44} r={r * 0.055} fill="#c76a66" />
    </g>)}
    {/* borde de cepillo (microvellosidades), esquemático */}
    {Array.from({ length: 34 }, (_, i) => <line key={'m' + i} x1={i * (D / 34) + 4} y1={sup} x2={i * (D / 34) + 4} y2={sup - 22}
      stroke="#ffb0a4" strokeWidth={4} opacity={0.85} />)}
    {Array.from({ length: n }, (_, i) => { const on = i / n < cuantas;
      return <g key={'e' + i} opacity={on ? 1 : 0.16}>
        <Enzima T={T} x={D * 0.12 + i * D * 0.19} y={sup - 46} s={1.5} rot={-90} fase={i * 1.7}
          color={on ? KC.mint : '#5c6a66'} />
      </g>; })}
    {Array.from({ length: 5 }, (_, i) => { const g = krng(i * 11 + 3);
      return <Molecula key={'l' + i} tipo="lactosa" r={21} gw={3}
        x={60 + g() * (D - 120)} y={50 + g() * (sup - 170) + mece(T, i, 0.2) * 16} rot={mece(T, i + 3, 0.15) * 20} />; })}
  </svg>;
}

// Acercamiento al borde de una vellosidad: las células viejas se desprenden y salen nuevas.
// p: 0..1 avance de la muda · gen: 0..1 brillo del gen dentro de las células.
function BordeRenueva({ T, p = 0, gen = 0 }) {
  const y0 = 1060, celdas = 11;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={-40} y={y0} width={KW + 80} height={KH} fill="#f2a6a0" />
    <rect x={-40} y={y0} width={KW + 80} height={18} fill="#d2726f" />
    {Array.from({ length: celdas }, (_, i) => {
      const fase = (i * 0.09 + p * 1.25) % 1, cae = kclamp((fase - 0.72) / 0.28, 0, 1);
      const x = 40 + i * (KW - 80) / celdas, w = (KW - 80) / celdas - 10;
      const yy = y0 - 150 + cae * 1 - cae * 0 - (1 - Math.min(1, fase / 0.2)) * 160;
      const sube = Math.min(1, fase / 0.18);
      return <g key={i} transform={`translate(${x} ${yy - cae * 520}) rotate(${cae * 26}) scale(${0.6 + 0.4 * sube})`} opacity={(1 - cae * 0.75) * sube}>
        <rect x={0} y={0} width={w} height={150} rx={12} fill={i % 2 ? '#ffd9d2' : '#ffc7bd'} stroke="#8e3b3b" strokeWidth={5} />
        <circle cx={w / 2} cy={92} r={17} fill="#c76a66" />
        {gen > 0 && <g opacity={gen * (1 - cae * 0.4)}>
          <path d={`M ${w * 0.3} 46 q ${w * 0.2} -22 ${w * 0.4} 0`} fill="none" stroke={GEN} strokeWidth={7} strokeLinecap="round"
            style={{ filter:`drop-shadow(0 0 10px ${GEN})` }} />
        </g>}
        {Array.from({ length: 5 }, (_, k) => <line key={k} x1={6 + k * (w - 12) / 4} y1={0} x2={6 + k * (w - 12) / 4} y2={-18} stroke="#8e3b3b" strokeWidth={4} />)}
      </g>;
    })}
  </svg>;
}

// Acercamiento a una cripta: las células madre del fondo (doradas) hacen las células nuevas.
function CriptaCerca({ T, a, gen = 0 }) {
  const cx = 540, boca = 560, fondo = 1080, an = 130;   // boca, fondo y media anchura de la cripta
  const subiendo = Array.from({ length: 8 }, (_, i) => {
    const fase = ((T - a) * 0.3 + i / 8) % 1, y = klerp(fondo - 90, boca - 10, fase), s = klerp(0.72, 1, fase);
    const lado = i % 2 ? 1 : -1;
    return <g key={i} transform={`translate(${cx + lado * (an - 48)} ${y}) scale(${s})`} opacity={0.4 + 0.6 * Math.min(1, fase * 4)}>
      <rect x={-42} y={-48} width={84} height={96} rx={16} fill="#ffd0c8" stroke="#8e3b3b" strokeWidth={6} />
      <circle cy={12} r={16} fill="#c76a66" />
    </g>;
  });
  return <>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #2a2230 0%, #0E0F12 74%)' }}></div>
    <Ambiente T={T} n={26} seed={8} color="rgba(255,220,214,.3)" tam={[3, 8]} vel={-10} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {/* la pared con el hueco de la cripta en medio */}
      <path d={`M -60 ${boca - 300} L 180 ${boca} L ${cx - an} ${boca} L ${cx - an + 16} ${fondo}` +
               ` Q ${cx} ${fondo + 170} ${cx + an - 16} ${fondo} L ${cx + an} ${boca} L ${KW - 180} ${boca}` +
               ` L ${KW + 60} ${boca - 300} L ${KW + 60} ${KH + 60} L -60 ${KH + 60} Z`}
        fill="#f2a6a0" stroke="#8e3b3b" strokeWidth={9} />
      {subiendo}
      {/* células madre del fondo: la fábrica */}
      {[-1, 1].map((s2) => <g key={s2}>
        <circle cx={cx + s2 * 52} cy={fondo + 80} r={56} fill={KC.gold} stroke={KC.ink} strokeWidth={7}
          opacity={0.72 + 0.28 * (0.5 + 0.5 * Math.sin(T * 2.6 + s2))}
          style={{ filter:`drop-shadow(0 0 ${16 + 10 * Math.sin(T * 2.6 + s2)}px ${KC.gold})` }} />
        <circle cx={cx + s2 * 52} cy={fondo + 80} r={21} fill="#8a5f10" />
      </g>)}
      {/* el gen se queda arriba, en las células que ya se van */}
      {gen > 0 && [-1, 1].map((s2) => <g key={s2} opacity={gen}>
        <path d={`M ${cx + s2 * 300 - 34} ${boca - 80} q 34 -30 68 0`} fill="none" stroke={GEN}
          strokeWidth={10} strokeLinecap="round" style={{ filter:`drop-shadow(0 0 14px ${GEN})` }} />
      </g>)}
    </svg>
  </>;
}

/* ---------- el shot ---------- */
function LactosaNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Bebe, A: CUES.Adulto, Ga: CUES.Gas, P: CUES.Pregunta, E: CUES.Estudio,
    R: CUES.Ratas, Au: CUES.Auto, O: CUES.Ojo, Re: CUES.Renueva, Cr: CUES.Cripta, Pa: CUES.Pastilla, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const camGas = [{ t: K.Ga - 0.5, x: 540, y: 1010, z: 1 }, { t: K.P, x: 610, y: 960, z: 1.16 }];
  const camEst = [{ t: K.E - 0.5, x: 540, y: 980, z: 1.05 }, { t: K.R, x: 470, y: 1040, z: 1.3 }];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO — el vaso de leche y el virus que gira desde el cuadro 0 */}
      <EscenaFundido T={T} a={K.G} b={K.B} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VasoLeche T={T} x={760} y={900} s={1.3} lleno={0.86} />
          <g transform={`translate(${klerp(240, 400, kprog(T, K.G, K.B, kEase.suave))} ${880 + mece(T, 1, 0.3) * 20})`}>
            <VirusAAV T={T} s={klerp(0.8, 1.25, kprog(T, K.G, K.G + 2.4, kEase.sale))} rot={(T - K.G) * 95} r={120} />
          </g>
        </svg>
        <Chip T={T} at={K.G + 0.9} until={K.B - 0.3} texto="virus adeno-asociado" y={430} borde={KC.cyan} tam={42} />
        <Etiqueta T={T} at={K.G + 2.1} until={K.B - 0.3} x={250} y={1140} texto="no te enferma" color={KC.texto} tam={36} />
      </EscenaFundido>

      {/* 1 · BEBÉ — de bebé había lactasa de sobra */}
      <EscenaFundido T={T} a={K.B} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.yellow} paso={48} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Biberon T={T} x={320} y={820} s={1.15} />
        </svg>
      </EscenaFundido>

      {/* 2 · ADULTO — la producción baja */}
      <EscenaFundido T={T} a={K.A} b={K.Ga} zoom={0.04}>
        <FondoLunares color={KC.lilac} paso={48} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VasoLeche T={T} x={540} y={760} s={1.5} lleno={0.86} />
          <g transform="translate(830 820)" opacity={kprog(T, K.A + 1.4, K.A + 2)}>
            <circle r={84} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
            <text y={34} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red}>?</text>
          </g>
        </svg>
      </EscenaFundido>

      {/* la Lupa de rayos X vive en las dos escenas: llena de enzimas y luego casi vacía */}
      <Lupa T={T} at={K.B + 0.35} until={K.A - 0.25} x={720} y={700} r={250} fx={360} fy={900}
        interior={(t, r) => <BordeConEnzimas T={t} r={r} cuantas={1} />} etiqueta="RAYOS X · borde del intestino" />
      <Lupa T={T} at={K.A + 0.3} until={K.Ga - 0.25} x={330} y={620} r={230} fx={540} fy={860}
        interior={(t, r) => <BordeConEnzimas T={t} r={r} cuantas={0.12} />} etiqueta="el mismo borde, de adulto" tinte={KC.red} />
      <Medidor T={T} at={K.B + 1.6} until={K.Ga - 0.25} etiqueta="LACTASA EN EL BORDE"
        valor={(t) => klerp(1, 0.1, kprog(t, K.A + 0.6, K.A + 2.6, kEase.suave))}
        texto={(v) => (v > 0.6 ? 'de sobra' : v > 0.25 ? 'bajando…' : 'casi nada')} y={1560} color={KC.mint} />

      {/* 3 · GAS — por dentro, fondo oscuro */}
      <EscenaFundido T={T} a={K.Ga} b={K.P} zoom={0} fondo={KC.dark}>
        <Camara T={T} keys={camGas}>
          <MundoIntestino T={T} lactasa={0} lactosa={9} corta={0} gas={kprog(T, K.Ga + 0.6, K.Ga + 2.4)} />
        </Camara>
        <Escala T={T} z={camaraEn(T, camGas).z} pxPorMm={MUNDO_INTESTINO.pxPorMm} />
      </EscenaFundido>

      {/* 4 · PREGUNTA — re-gancho */}
      <EscenaFundido T={T} a={K.P} b={K.E} zoom={0.05} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 52%, #1d2433 0%, #0E0F12 72%)' }}></div>
        <Ambiente T={T} n={30} seed={5} color="rgba(230,245,255,.35)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(470 900) rotate(${mece(T, 2, 0.14) * 8})`}>
            <Molecula tipo="lactosa" r={132} gw={10} />
          </g>
          <g transform={`translate(${880 + Math.sin((T - K.P) * 3) * 26} 900)`}>
            <Enzima T={T} s={3.6} rot={180} color="#6f7a84" />
          </g>
        </svg>
      </EscenaFundido>

      {/* 5 · ESTUDIO — 1998, el virus entra por la boca */}
      <EscenaFundido T={T} a={K.E} b={K.R} zoom={0} fondo={KC.dark}>
        <Camara T={T} keys={camEst}>
          <MundoIntestino T={T} lactasa={0} lactosa={5} corta={0} gas={0.25} />
        </Camara>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[0, 1, 2].map((i) => { const at = K.E + 2.6 + i * 0.5, p = kprog(T, at, at + 2.0, kEase.suave);
            if (T < at) return null;
            return <g key={i} transform={`translate(${320 + i * 230 + mece(T, i, 0.4) * 24} ${klerp(380, 1020, p)})`}>
              <VirusAAV T={T} s={0.62} rot={(T - at) * 150} r={95} suelta={kclamp((p - 0.82) / 0.18, 0, 1)} />
            </g>; })}
        </svg>
        <Escala T={T} z={camaraEn(T, camEst).z} pxPorMm={MUNDO_INTESTINO.pxPorMm} />
      </EscenaFundido>
      <TarjetaEstudio T={T} at={K.E + 0.25} until={K.E + 2.4} anio="1998" quien="During y colegas · Filadelfia" revista="Nature Medicine" y={760} />

      {/* 6 · RATAS — funcionó en ratas, durante meses */}
      <EscenaFundido T={T} a={K.R} b={K.Au} zoom={0.05}>
        <FondoLunares color={KC.mint} paso={48} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Rata T={T} x={330} y={900} s={1.05} seed={1} />
          <Rata T={T} x={820} y={1010} s={0.9} seed={4} mira={-1} />
          <g opacity={kprog(T, K.R + 1.0, K.R + 1.6)}>
            {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${430 + i * 60} ${640 + mece(T, i, 0.5) * 12})`}>
              <Molecula tipo="galactosa" r={15} x={-18} gw={2.4} /><Molecula tipo="glucosa" r={15} x={18} gw={2.4} />
            </g>)}
          </g>
        </svg>
      </EscenaFundido>
      <Medidor T={T} at={K.R + 0.5} until={K.Au - 0.25} etiqueta="LACTASA EN EL BORDE"
        valor={(t) => klerp(0.1, 0.84, kprog(t, K.R + 0.7, K.R + 2.4, kEase.sale))}
        texto={(v) => (v > 0.5 ? 'otra vez' : 'subiendo…')} y={1560} color={KC.mint} />
      <Chip T={T} at={K.R + 2.6} until={K.Au - 0.25} texto="en ratas · duró meses" y={430} borde={KC.gold} tam={42} />

      {/* 7 · AUTO — 2018, un divulgador */}
      <EscenaFundido T={T} a={K.Au} b={K.O} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2b0f63, #0E0F12)' }}></div>
        <Ambiente T={T} n={22} seed={13} color="rgba(177,140,255,.4)" tam={[3, 10]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`rotate(${mece(T, 6, 0.2) * 1.2} 540 880)`}>
            <MarcoVideo T={T} x={540} y={880} w={760} h={440} titulo="The Thought Emporium · 2018" pie="Justin Atkin" />
          </g>
        </svg>
      </EscenaFundido>

      {/* 8 · OJO — el matiz obligatorio */}
      <EscenaFundido T={T} a={K.O} b={K.Re} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#3a1414, #0E0F12)' }}></div>
        <Ambiente T={T} n={18} seed={21} color="rgba(255,120,110,.3)" tam={[4, 11]} />
      </EscenaFundido>
      <MitoTachado T={T} at={K.O + 0.3} tacharEn={K.O + 1.6} until={K.Re - 0.3} texto="¿cura aprobada?" x={430} y={660} tam={56} />
      <Chip T={T} at={K.O + 2.1} until={K.Re - 0.3} texto="autoexperimento" x={430} y={830} borde={KC.red} tam={44} />
      <Chip T={T} at={K.O + 3.0} until={K.Re - 0.3} texto="sin revisión por pares" x={430} y={960} borde={KC.red} tam={44} />
      <Chip T={T} at={K.O + 3.8} until={K.Re - 0.3} texto="no lo intentes" x={430} y={1090} borde={KC.gold} tam={44} mono />

      {/* 9 · RENUEVA — el intestino se cambia solo */}
      <EscenaFundido T={T} a={K.Re} b={K.Cr} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 58%, #22293a 0%, #0E0F12 74%)' }}></div>
        <Ambiente T={T} n={24} seed={31} color="rgba(255,225,220,.3)" tam={[3, 8]} vel={-14} />
        <BordeRenueva T={T} p={kprog(T, K.Re, K.Cr, kEase.suave) * 1.1} gen={0} />
      </EscenaFundido>
      {T >= K.Re - 0.2 && T < K.Cr - 0.1 && <>
        <Contador T={T} at={K.Re + 0.4} desde={1} hasta={5} dur={3.2} x={540} y={470} tam={150} color={KC.yellow} />
        <Chip T={T} at={K.Re + 0.6} until={K.Cr - 0.3} texto="días para cambiar todo el recubrimiento" y={610} tam={38} />
      </>}

      {/* 10 · CRIPTA — donde está la fábrica de células */}
      <EscenaFundido T={T} a={K.Cr} b={K.Pa} zoom={0.05} fondo={KC.dark}>
        <CriptaCerca T={T} a={K.Cr} gen={kprog(T, K.Cr + 1.2, K.Cr + 2.2) * (1 - kprog(T, K.Pa - 1.4, K.Pa - 0.4))} />
      </EscenaFundido>
      <Etiqueta T={T} at={K.Cr + 0.5} until={K.Pa - 0.3} x={700} y={1120} texto="células madre" color={KC.gold} tam={36} />
      <Etiqueta T={T} at={K.Cr + 1.4} until={K.Pa - 0.3} x={620} y={420} texto="el gen se queda arriba" color={GEN} tam={34} />

      {/* 11 · PASTILLA — lo que sí existe hoy */}
      <EscenaFundido T={T} a={K.Pa} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.cyan} paso={52} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VasoLeche T={T} x={790} y={880} s={1.35} lleno={0.86} />
          <g transform="translate(360 700)">
            <Pastilla T={T} abre={kprog(T, K.Pa + 0.5, K.Pa + 1.3, kEase.sale)} s={1.05} />
          </g>
          {Array.from({ length: 6 }, (_, i) => { const at = K.Pa + 1.2 + i * 0.16, p = kprog(T, at, at + 1.5, kEase.suave);
            if (T < at) return null;
            return <Enzima key={i} T={T} x={klerp(360, 690, p) + mece(T, i, 0.5) * 16} y={klerp(700, 900 + i * 14, p)}
              s={2.2} rot={p * 120 - 40} fase={i * 1.3} />; })}
          {Array.from({ length: 4 }, (_, i) => { const at = K.Pa + 2.4 + i * 0.2;
            if (T < at) return null;
            const p = kprog(T, at, at + 0.9, kEase.sale);
            return <g key={'m' + i} opacity={p}>
              <Molecula tipo="galactosa" r={26} x={660 - p * 50} y={1180 + i * 3} gw={3.2} />
              <Molecula tipo="glucosa" r={26} x={800 + p * 50} y={1180 + i * 3} gw={3.2} />
            </g>; })}
        </svg>
        <Chip T={T} at={K.Pa + 2.0} until={K.C - 0.3} texto="la misma enzima, pero por fuera" y={440} borde={KC.mint} tam={40} />
      </EscenaFundido>

      {/* 12 · CIERRE — la imagen del inicio, ya con respuesta */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VasoLeche T={T} x={760} y={900} s={1.3} lleno={0.86} />
          <g transform={`translate(400 ${880 + mece(T, 1, 0.3) * 20})`}>
            <VirusAAV T={T} s={1.25} rot={(T - K.C) * 95} r={120} gen={0.55 + 0.45 * Math.sin(T * 2)} />
          </g>
        </svg>
        <Chip T={T} at={K.C + 0.7} until={K.Ou} texto="te presta un gen · un rato" y={430} borde={KC.gold} tam={44} />
      </EscenaFundido>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="Ese virus no viene a enfermarte: *trae un gen.*" />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.A - 0.1} texto="De bebé tu intestino hacía *lactasa.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Ga - 0.1} texto="Al crecer, *la mayoría baja* esa producción." />
      <Subtitulo T={T} idx={3} at={K.Ga + 0.1} until={K.P - 0.1} texto="La lactosa sigue de largo: *tus bacterias la fermentan.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si le devolvieras *la receta?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="1998: un *virus con el gen,* por la boca." />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Au - 0.1} texto="Las ratas digirieron lactosa *durante meses.*" />
      <Subtitulo T={T} idx={7} at={K.Au + 0.1} until={K.O - 0.1} texto="En 2018 un divulgador *se lo hizo a sí mismo.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.Re - 0.1} texto="Ojo: *no es un tratamiento aprobado.*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Cr - 0.1} texto="Tu intestino se cambia *cada 4 o 5 días.*" />
      <Subtitulo T={T} idx={10} at={K.Cr + 0.1} until={K.Pa - 0.1} texto="La receta *se va con las células viejas.*" />
      <Subtitulo T={T} idx={11} at={K.Pa + 0.1} until={K.C - 0.1} texto="Lo que sí existe: *la enzima en pastilla.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No te enferma: *te presta un gen.*" />

      {/* stickers de reacción (en los re-ganchos) */}
      <Sticker T={T} src={LAVS('avatar_06_pensativo_menton')} at={K.P + 0.1} until={K.E - 0.3} lado="arriba-der" />
      <Sticker T={T} src={LAVS('avatar_10_serio_molesto')} at={K.O + 1.7} until={K.Re - 0.3} lado="arriba-der" />

      <MarcaAgua T={T} tema="bioquimica" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LactosaNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <LactosaNarrado />
      </CompositionStage>
    </div>
  );
}
window.BordeConEnzimas = BordeConEnzimas;
window.BordeRenueva = BordeRenueva;
window.CriptaCerca = CriptaCerca;
window.LactosaNarradoApp = LactosaNarradoApp;
