// Shot Químico #08 · Esas lágrimas no son de tristeza: el gas de la cebolla — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const GAS = '#b6e33a', AZUFRE = '#ffe11a', ENZ1 = '#9b5de5', ENZ2 = '#2fe0a8';

function Cebolla({ x, y, s = 1, cortada = 0, escudo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {escudo > 0 && <path d="M 0 -260 Q 200 -220 210 -60 Q 200 140 0 230 Q -200 140 -210 -60 Q -200 -220 0 -260 Z" fill="rgba(47,224,168,.25)" stroke={ENZ2} strokeWidth={10} opacity={escudo} />}
    <g transform={`translate(${-cortada * 30} 0)`}>
      <path d="M 0 -200 Q 30 -150 40 -130 Q 170 -90 170 30 Q 160 170 0 170 Q -160 170 -170 30 Q -170 -90 -40 -130 Q -30 -150 0 -200 Z" fill="#e8c27a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      {[0.75, 0.5, 0.25].map((k, i) => <path key={i} d={`M 0 ${-130 * k - 40} Q ${170 * k} ${-90 * k} ${170 * k} ${30 * k} Q ${160 * k} ${170 * k} 0 ${170 * k}`} fill="none" stroke="#c99a4a" strokeWidth={5} />)}
    </g>
    {cortada > 0 && <g transform={`translate(${cortada * 30} 0)`}>
      <path d="M 0 -130 Q 170 -90 170 30 Q 160 170 0 170 Z" fill="#fbf2dc" stroke={KC.ink} strokeWidth={9} />
      {[0.75, 0.5, 0.25].map((k, i) => <path key={i} d={`M 0 ${-130 * k} Q ${170 * k} ${-90 * k} ${170 * k} ${30 * k} Q ${160 * k} ${170 * k} 0 ${170 * k}`} fill="none" stroke="#e6d3a8" strokeWidth={6} />)}
    </g>}
  </g>;
}
function Cuchillo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -20 -360 L 20 -360 L 30 0 L -30 20 Z" fill="#d5dbe2" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-26} y={-520} width={52} height={170} rx={16} fill="#5a3a22" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Ojo({ x, y, s = 1, rojo = 0, T = 0, llora = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 0 Q 0 -140 200 0 Q 0 140 -200 0 Z" fill={mixHex('#ffffff', '#ffb3b3', rojo)} stroke={KC.ink} strokeWidth={9} />
    {rojo > 0.2 && [[-120, -10], [120, 10], [-90, 30], [100, -30]].map(([dx, dy], i) => <path key={i} d={`M ${dx} ${dy} q 20 -10 30 5`} stroke="#e23b3b" strokeWidth={4} fill="none" opacity={rojo} />)}
    <circle r={62} fill="#6b3a1c" stroke={KC.ink} strokeWidth={6} /><circle r={28} fill={KC.ink} /><circle cx={-18} cy={-18} r={10} fill="#fff" />
    {llora > 0 && Array.from({ length: 3 }, (_, i) => { const u = ((T * 0.9 + i / 3) % 1); return <path key={i} d="M 0 -22 Q 16 0 0 14 Q -16 0 0 -22 Z" transform={`translate(${150 + i * 8} ${40 + u * 300}) scale(1.4)`} fill="#7fc8ff" stroke={KC.ink} strokeWidth={3} opacity={llora * (1 - u)} />; })}
  </g>;
}
function Tijera({ x, y, s = 1, color = ENZ1, abre = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-12 - abre * 18})`}><path d="M 0 0 L 90 -10 L 0 10 Z" fill={color} stroke={KC.ink} strokeWidth={4} /></g>
    <g transform={`rotate(${12 + abre * 18})`}><path d="M 0 0 L 90 10 L 0 -10 Z" fill={color} stroke={KC.ink} strokeWidth={4} /></g>
    <circle cx={-22} cy={-16} r={16} fill="none" stroke={color} strokeWidth={8} /><circle cx={-22} cy={16} r={16} fill="none" stroke={color} strokeWidth={8} />
  </g>;
}
function MolS({ x, y, s = 1, rot = 0, o = 1, partida = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <g transform={`translate(${-partida * 30} 0)`}><line x1={-50} y1={0} x2={0} y2={0} stroke={KC.ink} strokeWidth={10} /><Atomo x={-50} y={0} r={22} color={QA.C} /></g>
    <g transform={`translate(${partida * 30} 0)`}><Atomo x={0} y={0} r={30} color={AZUFRE} letra="S" tam={26} /><line x1={0} y1={0} x2={46} y2={-30} stroke={KC.ink} strokeWidth={10} /><Atomo x={46} y={-30} r={20} color={QA.O} /></g>
  </g>;
}
function Celula({ T, roto = 0 }) {
  return <g>
    <rect x={110} y={560} width={860} height={660} rx={60} fill="#fdf3dc" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={560} cy={880} rx={250 + roto * 30} ry={190 + roto * 20} fill="rgba(155,93,229,.18)" stroke={ENZ1} strokeWidth={8} strokeDasharray={roto > 0.05 ? `${60 - roto * 50} ${20 + roto * 60}` : 'none'} />
    <circle cx={850} cy={680} r={60} fill="#e9c89a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Bichito({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={60} ry={40} fill="#6b8f3a" stroke={KC.ink} strokeWidth={6} />
    {[-30, 0, 30].map((dx, i) => <line key={i} x1={dx} y1={30} x2={dx + Math.sin(T * 12 + i) * 10} y2={60} stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={-50} cy={-20} r={10} fill="#fff" /><circle cx={-50} cy={-20} r={4} fill={KC.ink} />
  </g>;
}

function Cebolla_() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ce: CUES.Celula, Co: CUES.Corte, Ac: CUES.Acido, Ga: CUES.Gas, De: CUES.Defensa, Pr: CUES.Pregunta, Ja: CUES.Japon, Si: CUES.Sinlagrimas, Cr: CUES.Crispr, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const corte = kprog(T, K.G, K.G + 0.45, kEase.sale);
  const nube = kprog(T, K.G + 0.6, K.G + 3.0);
  const roto = kprog(T, K.Co + 0.4, K.Co + 1.4);
  const R = krng(13);
  const mols = Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2 + 0.3, k = 1.28 + R() * 0.12; return [560 + Math.cos(a) * 250 * k, 880 + Math.sin(a) * 190 * k, R() * 360]; });
  const enz = Array.from({ length: 5 }, () => [420 + R() * 260, 760 + R() * 240, R() * 360]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cuchillo corta y sale el gas */}
      <Escena T={T} a={K.G} b={K.Ce} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={120} y={1100} width={840} height={70} rx={20} fill="#c48a52" stroke={KC.ink} strokeWidth={8} />
          <Cebolla x={500} y={960} s={1.1} cortada={kprog(T, K.G + 0.4, K.G + 0.8)} />
          <Cuchillo x={500} y={klerp(560, 1060, corte)} s={1.0} />
          <Nube T={T} x={500} y={klerp(860, 640, nube)} f={nube} r={150} color={GAS} seed={3} />
        </SvgCapa>
      </Escena>
      {/* 1–4 · por dentro de la célula */}
      <Escena T={T} a={K.Ce} b={K.De}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Celula T={T} roto={roto} />
          {T > K.Co && T < K.Co + 1.6 && <g transform={`translate(${klerp(-100, 1180, kprog(T, K.Co, K.Co + 1.2))} 900) rotate(90)`}><Cuchillo x={0} y={0} s={0.8} /></g>}
          {mols.map(([x, y, r], i) => { const t0 = K.Ac + 0.1 + i * 0.08, parte = kprog(T, t0, t0 + 0.5), conv = kprog(T, K.Ga + 0.5 + i * 0.12, K.Ga + 1.4 + i * 0.12), sube = kprog(T, K.Ga + 1.4 + i * 0.12, K.Ga + 4.0 + i * 0.12, kEase.suave);
            if (conv < 0.5) return <MolS key={i} x={x + Math.sin(T + i) * 10} y={y} s={1.1} rot={r + T * 20} partida={parte} />;
            return <circle key={i} cx={x + Math.sin(T * 2 + i) * 20} cy={klerp(y, 380, sube)} r={26} fill={GAS} stroke={KC.ink} strokeWidth={5} opacity={1 - sube * 0.7} />; })}
          {enz.map(([x, y, r], i) => { const sale = kprog(T, K.Co + 1.0, K.Co + 3.0, kEase.suave), tx = klerp(x, mols[i * 2 % 9][0] - 60, sale), ty = klerp(y, mols[i * 2 % 9][1], sale);
            return <Tijera key={i} x={tx} y={ty} s={1.1} rot={r + T * 30} abre={Math.max(0, Math.sin(T * 10 + i))} />; })}
          {T > K.Ga && [0, 1, 2].map((i) => <Tijera key={'l' + i} x={klerp(-80, 300 + i * 220, kprog(T, K.Ga + 0.1, K.Ga + 0.6))} y={1060 - i * 140} s={1.1} color={ENZ2} rot={-T * 40 + i * 90} abre={Math.max(0, Math.sin(T * 9 + i))} />)}
          {T > K.Ga + 2.6 && <g transform="translate(0 -40)"><Ojo x={540} y={420} s={0.9} rojo={kprog(T, K.Ga + 3.6, K.Ga + 5)} llora={kprog(T, K.Ga + 4.6, K.Ga + 5.4)} T={T} /></g>}
        </SvgCapa>
      </Escena>
      {/* 5 · defensa */}
      <Escena T={T} a={K.De} b={K.Pr}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Cebolla x={480} y={960} s={1.3} escudo={kprog(T, K.De + 0.4, K.De + 1.2)} />
          <Bichito x={klerp(860, 1200, kprog(T, K.De + 1.8, K.De + 3.6, kEase.suave))} y={1080} s={1.3} T={T} />
          <Nube T={T} x={720} y={900} f={kprog(T, K.De + 1.2, K.De + 2)} r={90} color={GAS} seed={5} n={6} />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ja} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · 2002: la enzima, en Nature */}
      <Escena T={T} a={K.Ja} b={K.Si}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Tijera x={760} y={1080} s={3} color={ENZ2} rot={-20 + Math.sin(T * 2) * 8} abre={Math.max(0, Math.sin(T * 4))} /></SvgCapa>
      </Escena>
      {/* 8 · 2016: cebollas sin lágrimas */}
      <Escena T={T} a={K.Si} b={K.Cr}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T < K.Si + 2.4 && <g>{Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={360 + i * 70} cy={1080} rx={18} ry={12} fill="#2a2a2a" />)}
            <line x1={540} y1={560} x2={540} y2={1060} stroke={KC.pink} strokeWidth={30 + Math.sin(T * 30) * 6} opacity={0.6} />
            <rect x={440} y={500} width={200} height={70} rx={14} fill="#3b3f48" stroke={KC.ink} strokeWidth={6} /></g>}
          {T >= K.Si + 2.4 && <g>
            <rect x={150} y={1150 - 480} width={170} height={480} fill={GAS} stroke={KC.ink} strokeWidth={7} />
            <rect x={150 + 200} y={1150 - 480 / 7.5 * kprog(T, K.Si + 2.6, K.Si + 3.6)} width={170} height={480 / 7.5 * kprog(T, K.Si + 2.6, K.Si + 3.6)} fill={GAS} stroke={KC.ink} strokeWidth={7} />
            <text x={235} y={1210} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>normal</text>
            <text x={435} y={1210} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>nueva</text>
            {Array.from({ length: 20 }, (_, i) => T > K.Si + 4.0 + i * 0.08 ? <g key={i} transform={`translate(${600 + (i % 5) * 84} ${720 + Math.floor(i / 5) * 110})`}><circle r={34} fill="#ffd36b" stroke={KC.ink} strokeWidth={5} /><circle cx={-12} cy={-6} r={5} fill={KC.ink} /><circle cx={12} cy={-6} r={5} fill={KC.ink} /><path d="M -14 12 Q 0 22 14 12" stroke={KC.ink} strokeWidth={4} fill="none" /></g> : null)}
          </g>}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Si + 3.0} until={K.Cr - 0.3} valor={7.5} dec={1} dur={1.0} prefijo="÷ " etiqueta="factor lacrimógeno" x={300} y={1530} tam={120} color={KC.ink} />
      </Escena>
      {/* 9 · 2026: CRISPR */}
      <Escena T={T} a={K.Cr} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:'#1d1240' }}></div>
        <SvgCapa>
          {Array.from({ length: 16 }, (_, i) => { const x = 140 + i * 52, cut = i === 8 ? kprog(T, K.Cr + 1.0, K.Cr + 1.4) * 30 : 0; return <g key={i}><line x1={x + (i >= 8 ? cut : 0)} y1={650 + Math.sin(i * 0.8) * 40} x2={x + (i >= 8 ? cut : 0)} y2={750 + Math.sin(i * 0.8) * 40} stroke={['#ff3b6b', '#2fe0a8', '#ffe11a', '#00d2ff'][i % 4]} strokeWidth={14} /></g>; })}
          <Tijera x={560} y={700} s={1.5} color={KC.cyan} abre={Math.max(0, Math.sin(T * 8))} rot={90} />
          <g opacity={kprog(T, K.Cr + 2.4, K.Cr + 3.0)}>
            <rect x={420} y={1110} width={200} height={110} rx={10} fill="#b4542b" stroke={KC.ink} strokeWidth={7} />
            <path d={`M 520 1110 Q ${520 + Math.sin(T) * 10} 1000 480 940 Q 450 900 500 860`} stroke={KC.leaf} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M 500 1000 Q 560 990 580 1040" stroke={KC.leaf} strokeWidth={10} fill="none" />
            <path d="M 720 900 L 860 1040 M 860 900 L 720 1040" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.Cr + 4.0, K.Cr + 4.4)} />
            <circle cx={790} cy={970} r={50} fill="none" stroke="#ffffff55" strokeWidth={6} strokeDasharray="10 8" />
          </g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la misma tabla, la cebolla con su escudo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={120} y={1100} width={840} height={70} rx={20} fill="#c48a52" stroke={KC.ink} strokeWidth={8} />
          <Cebolla x={500} y={960} s={1.1} cortada={1} escudo={kprog(T, K.Ci + 1.0, K.Ci + 2.0)} />
          <Nube T={T} x={500} y={660} f={1} r={150} color={GAS} seed={3} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿tristeza?" x={330} y={470} tam={50} />
      <Chip T={T} at={K.G + 3.1} until={K.Ce - 0.3} texto="un gas" x={300} y={470} tam={52} borde={GAS} />
      <Etq T={T} at={K.Ce + 0.6} until={K.Co - 0.2} x={60} y={1500} texto="compuesto con azufre (S)" tam={34} color={AZUFRE} />
      <Etq T={T} at={K.Ce + 1.4} until={K.Co - 0.2} x={1030} y={1580} texto="enzima, en su compartimento" lado="izq" tam={34} color={ENZ1} />
      <Chip T={T} at={K.Co + 1.2} until={K.Ac - 0.2} texto="aliinasa" x={540} y={1500} tam={52} borde={ENZ1} />
      <Chip T={T} at={K.Ac + 0.2} until={K.Ga - 0.2} texto="ácido sulfénico" x={540} y={1500} tam={48} borde={AZUFRE} />
      <Chip T={T} at={K.Ga + 0.3} until={K.De - 0.2} texto="factor lacrimógeno" x={540} y={1500} tam={48} borde={GAS} />
      <Etq T={T} at={K.Ga + 0.4} until={K.Ga + 2.6} x={60} y={1640} texto="2.ª enzima (LFS)" tam={34} color={ENZ2} />
      <Chip T={T} at={K.De + 0.5} until={K.Pr - 0.3} texto="defensa química" x={540} y={1500} tam={50} borde={ENZ2} />
      <TarjetaEstudio T={T} at={K.Ja + 0.2} until={K.Si - 0.3} anio="2002" quien="Imai et al. · House Foods, Japón" revista="Nature · la enzima que hace llorar" x={420} y={800} />
      <Chip T={T} at={K.Si + 0.3} until={K.Si + 2.3} texto="semillas irradiadas · 2016" x={540} y={1500} tam={42} borde={KC.pink} />
      <Etq T={T} at={K.Si + 4.0} until={K.Cr - 0.3} x={1030} y={1700} texto="20 catadores: sin lágrimas" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Cr + 0.3} until={K.Ci - 0.3} texto="2026 · CRISPR · Front Plant Sci" x={540} y={1500} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.Cr + 4.2} until={K.Ci - 0.3} x={60} y={1640} texto="creció mal · sin semilla" tam={34} color={KC.red} />
      <Chip T={T} at={K.Ci + 2.0} until={K.Ou} texto="no es tristeza: es defensa" y={1500} tam={44} borde={GAS} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ce - 0.1} texto="No es tristeza: *es un gas.*" />
      <Subtitulo T={T} idx={1} at={K.Ce + 0.1} until={K.Co - 0.1} texto="Azufre y enzima: *separados.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.Ac - 0.1} texto="El cuchillo *los junta.*" />
      <Subtitulo T={T} idx={3} at={K.Ac + 0.1} until={K.Ga - 0.1} texto="Sale un *ácido sulfénico.*" />
      <Subtitulo T={T} idx={4} at={K.Ga + 0.1} until={K.De - 0.1} texto="Gas irritante: *te hace llorar.*" />
      <Subtitulo T={T} idx={5} at={K.De + 0.1} until={K.Pr - 0.1} texto="Es su *defensa.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ja - 0.1} texto="¿Una cebolla *que no haga llorar?*" />
      <Subtitulo T={T} idx={7} at={K.Ja + 0.1} until={K.Si - 0.1} texto="2002: *la enzima, en Nature.*" />
      <Subtitulo T={T} idx={8} at={K.Si + 0.1} until={K.Cr - 0.1} texto="7.5 veces *menos gas.*" />
      <Subtitulo T={T} idx={9} at={K.Cr + 0.1} until={K.Ci - 0.1} texto="Con CRISPR: *crecieron mal.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es la *defensa química* de la cebolla." />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Celula + 1.0, CUES.Corte + 0.9, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Acido + 0.2, CUES.Gas + 0.8, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Gas + 2.2, CUES.Defensa - 0.1, 'avatar_01_riendo_lengua', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Japon + 1.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Japon + 1.6, CUES.Sinlagrimas - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Sinlagrimas + 1.6, CUES.Crispr - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Crispr + 1.4, CUES.Cierre - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CebollaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cebolla_ /></CompositionStage></div>;
}
window.CebollaApp = CebollaApp;
