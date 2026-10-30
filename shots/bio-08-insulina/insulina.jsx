// Shot bio-08 · Biotecnológico #08 — "La insulina sale de un tanque".
// Dos versiones en un mismo archivo: InsulinaNarradoApp (N1 + N5) y InsulinaCicloApp (gemelo mudo M4).
// Guion, corrección (levadura) y fuentes: guion.md. Todos los dibujos son esquemáticos.

const IAVS = (n) => 'assets/stickers/' + n + '.png';
const ADN1 = '#2563a8', ADN2 = '#d1477a', PLAS = '#ffd43b', INS = '#2fe0a8', BACT = '#7ee787';
const AMINOS = 51;   // la insulina humana tiene 51 aminoácidos (21 de la cadena A + 30 de la cadena B)

/* ---------- doble hélice horizontal ----------
   corte: 0..1 — se abre un hueco donde estaba el gen. */
function Helice({ T, x = 0, y = 0, largo = 900, alto = 70, n = 26, corte = 0, desde = 0.42, hasta = 0.58 }) {
  const paso = largo / n;
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n, ph = u * Math.PI * 4 + T * 0.8;
      const dentro = u >= desde && u <= hasta, o = dentro ? 1 - corte : 1;
      const yy = Math.sin(ph) * alto, xx = u * largo + (dentro ? 0 : 0);
      return <g key={i} opacity={o}>
        <line x1={xx} y1={yy} x2={xx} y2={-yy} stroke={dentro ? PLAS : '#9aa4ae'} strokeWidth={dentro ? 9 : 6} strokeLinecap="round" />
        <circle cx={xx} cy={yy} r={11} fill={ADN1} /><circle cx={xx} cy={-yy} r={11} fill={ADN2} />
      </g>;
    })}
  </g>;
}

/* ---------- gen escrito: en 1978 los genes de las cadenas A y B de la insulina humana
   se diseñaron con el código genético y se SINTETIZARON químicamente (no se tomaron de ADN humano).
   p: 0..1 las letras se van escribiendo · h: 0..1 de las letras se forma la doble hélice.
   Letras esquemáticas: no es la secuencia real. */
const LETRAS_GEN = 'ATGGCTTTCGTTAACCAGCACCTGTGCGGT';
function GenEscrito({ T, x = 0, y = 0, p = 1, h = 0, etiqueta = '', letras = LETRAS_GEN, largo = 720 }) {
  const n = Math.floor(kclamp(p, 0, 1) * letras.length), paso = largo / letras.length;
  const cursor = p < 1 && Math.floor(T * 3) % 2 === 0;
  return <g transform={`translate(${x} ${y})`}>
    {etiqueta && <text x={-16} y={-58} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={PLAS}>{etiqueta}</text>}
    <g opacity={1 - h * 0.75}>
      {letras.slice(0, n).split('').map((c, i) => <text key={i} x={i * paso} y={0} style={{ font:`700 34px ${KF.mono}` }}
        fill={{ A:'#7ee787', T:'#ff6b5a', G:'#ffd43b', C:'#5ec8ff' }[c]}>{c}</text>)}
      {cursor && <rect x={n * paso + 2} y={-30} width={6} height={36} fill="#ffffff" />}
    </g>
    {h > 0 && <g opacity={h} transform={`translate(0 ${klerp(-10, 70, h)})`}>
      <Helice T={T} largo={largo} alto={36} n={14} desde={0} hasta={1} />
    </g>}
  </g>;
}

/* ---------- plásmido: anillo de ADN con el gen marcado ----------
   cierra: 0..1 — el anillo se termina de cerrar sobre el gen. */
function Plasmido({ T, x = 0, y = 0, r = 150, gen = 1, cierra = 1, rot = 0 }) {
  const hueco = klerp(50, 0, kclamp(cierra, 0, 1));    // grados que faltan por cerrar
  const circulo = hueco < 3;                           // ya cerrado: un arco de 360° no se dibuja
  const arco = (a0, a1, col, w) => {
    const p = (a) => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1), grande = (a1 - a0) % 360 > 180 ? 1 : 0;
    return <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${grande} 1 ${x1} ${y1}`} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" />;
  };
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {circulo ? <circle r={r} fill="none" stroke="#9aa4ae" strokeWidth={18} /> : arco(hueco - 60, 300 - hueco, '#9aa4ae', 18)}
    {gen > 0 && <g opacity={gen} style={{ filter:`drop-shadow(0 0 14px ${PLAS})` }}>{arco(-60, 20, PLAS, 24)}</g>}
    {Array.from({ length: 10 }, (_, i) => { const a = (i * 36 + T * 14) * Math.PI / 180;
      return <circle key={i} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={6} fill="#d8dee4" />; })}
  </g>;
}

/* ---------- bacteria (E. coli) esquemática ----------
   cuerpos: 0..1 — grumos de proteína guardados adentro (cuerpos de inclusión). */
function Bacteria({ T, x = 0, y = 0, s = 1, rot = 0, brilla = 0, plasmido = 0, cuerpos = 0, seed = 1 }) {
  const b = mece(T, seed, 0.4) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${rot + b}) scale(${s})`}>
    {brilla > 0 && <rect x={-182} y={-82} width={364} height={164} rx={82} fill={INS} opacity={0.22 * brilla} />}
    <rect x={-170} y={-70} width={340} height={140} rx={70} fill={BACT} stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-52} width={300} height={40} rx={20} fill="rgba(255,255,255,.35)" />
    {/* cromosoma enredado */}
    <path d={`M -100 10 q 40 -40 80 0 q 40 40 80 0 q 30 -30 50 10`} fill="none" stroke="#2f7a44" strokeWidth={9} strokeLinecap="round" />
    {plasmido > 0 && <g opacity={plasmido} transform="translate(-86 -12) scale(0.26)"><Plasmido T={T} r={150} gen={1} cierra={1} rot={T * 20} /></g>}
    {cuerpos > 0 && [[70, -16], [110, 22], [36, 30]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={klerp(0, 24, cuerpos)}
      fill={INS} stroke="#14795a" strokeWidth={5} />)}
    {/* flagelos */}
    {[-1, 1].map((k) => <path key={k} d={`M ${k * 170} ${k * 18} q ${k * 70} ${mece(T, seed + k, 1.2) * 26} ${k * 130} ${k * 10}`}
      fill="none" stroke="#2f7a44" strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}

/* ---------- levadura (Saccharomyces cerevisiae) con su yema ---------- */
function Levadura({ T, x = 0, y = 0, s = 1, suelta = 0, seed = 2 }) {
  const b = mece(T, seed, 0.3) * 4, yema = 0.3 + 0.12 * Math.sin(T * 0.8);
  return <g transform={`translate(${x} ${y}) rotate(${b}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={128} fill="#f6d06a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={118} cy={-86} rx={150 * yema} ry={128 * yema} fill="#f9dd92" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-40} cy={-16} rx={52} ry={44} fill="#e0a73c" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-52} cy={-28} rx={18} ry={14} fill="rgba(255,255,255,.5)" />
    {[[60, 40], [20, 64], [86, -8]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={16} fill="#e8bb57" />)}
    {suelta > 0 && Array.from({ length: 4 }, (_, i) => { const p = ((T * 0.5 + i / 4) % 1);
      return <g key={'s' + i} opacity={suelta * (1 - p)} transform={`translate(${klerp(120, 300, p)} ${klerp(60, -40 - i * 30, p)})`}>
        <CadenaInsulina T={T} s={0.45} n={8} />
      </g>; })}
  </g>;
}

/* ---------- cadena de insulina esquemática (collar de aminoácidos) ---------- */
function CadenaInsulina({ T, x = 0, y = 0, s = 1, n = 14, seed = 3, color = INS }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => {
      const a = i / (n - 1) * Math.PI * 1.6 + mece(T, seed + i * 0.3, 0.3) * 0.12;
      const px = Math.cos(a) * 90 + i * 6, py = Math.sin(a) * 70;
      return <circle key={i} cx={px} cy={py} r={18} fill={color} stroke={KC.ink} strokeWidth={5} />;
    })}
  </g>;
}

/* ---------- frasco de insulina ---------- */
function Frasco({ T, x = 0, y = 0, s = 1, etiqueta, lleno = 0.72, tapa = KC.cyan }) {
  const h = 230, w = 130, nivel = h * (1 - lleno);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={h + 14} rx={w * 0.7} ry={16} fill="rgba(0,0,0,.2)" />
    <rect x={-w / 2} y={nivel} width={w} height={h - nivel} rx={14} fill={INS} opacity={0.85} />
    <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-w / 2 - 10} y={-46} width={w + 20} height={48} rx={12} fill={tapa} stroke={KC.ink} strokeWidth={9} />
    <rect x={-w / 2 - 2} y={-70} width={w + 4} height={30} rx={8} fill="#c3cbd3" stroke={KC.ink} strokeWidth={7} />
    <rect x={-w / 2 + 10} y={76} width={w - 20} height={90} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {etiqueta && <text y={132} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

/* ---------- ribosoma que corre por el ARN y deja caer aminoácidos ----------
   p: 0..1 avance · n: aminoácidos de la cadena (A = 21, B = 30; cada cadena la hace su propia cepa).
   Suenan 51 notas en el audio (los 51 aminoácidos de la insulina, 21 + 30). */
function Ribosoma({ T, p = 0, y = 900, x0 = 120, x1 = 960, n = AMINOS }) {
  const AMINOS = n;
  const x = klerp(x0, x1, kclamp(p, 0, 1)), hechos = Math.floor(p * AMINOS);
  return <g>
    <line x1={x0 - 60} y1={y} x2={x1 + 60} y2={y} stroke="#9aa4ae" strokeWidth={12} strokeLinecap="round" strokeDasharray="26 16" strokeDashoffset={-T * 40} />
    {Array.from({ length: Math.min(hechos, AMINOS) }, (_, i) => {
      const u = i / AMINOS, px = klerp(x0, x, u / Math.max(p, 0.001)), cae = kclamp((p - u) * 6, 0, 1);
      return <circle key={i} cx={px} cy={y + 60 + cae * (60 + Math.sin(i * 1.3) * 26)} r={13} fill={INS} stroke={KC.ink} strokeWidth={4} opacity={0.9} />;
    })}
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={-26} rx={62} ry={44} fill="#b78cff" stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={0} cy={22} rx={48} ry={32} fill="#8e6bd6" stroke={KC.ink} strokeWidth={7} />
    </g>
  </g>;
}

/* ---------- siluetas de cerdo y res (de dónde venía antes) ---------- */
function Animal({ x = 0, y = 0, s = 1, tipo = 'cerdo', color = '#8e7c72' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {tipo === 'cerdo' ? <g fill={color}>
      <ellipse cx={0} cy={0} rx={130} ry={82} /><circle cx={-116} cy={-28} r={54} />
      <ellipse cx={-162} cy={-16} rx={22} ry={18} /><path d="M -140 -74 l 30 -44 l 24 40 Z" />
      {[-70, -20, 40, 90].map((k) => <rect key={k} x={k} y={64} width={22} height={54} rx={10} />)}
      <path d="M 124 -34 q 40 -16 24 26" fill="none" stroke={color} strokeWidth={12} />
    </g> : <g fill={color}>
      <ellipse cx={0} cy={0} rx={150} ry={88} /><ellipse cx={-146} cy={-34} rx={62} ry={50} />
      <path d="M -196 -66 q -16 -40 18 -30 M -96 -72 q 16 -42 -18 -32" stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />
      {[-90, -30, 50, 108].map((k) => <rect key={k} x={k} y={72} width={24} height={60} rx={11} />)}
      <path d="M 146 -40 q 44 10 20 70" fill="none" stroke={color} strokeWidth={12} />
    </g>}
  </g>;
}

/* ================= VERSIÓN NARRADA ================= */
function InsulinaNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Antes, R: CUES.Reaccion, Ge: CUES.Gen, L: CUES.Lee, Q: CUES.Pregunta,
    P: CUES.Plasmido, Ri: CUES.Ribosoma, H: CUES.Humulin, Ho: CUES.Hoy, Le: CUES.Levadura, D: CUES.Diferencia,
    C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const V = MUNDO_BIORREACTOR.ventana;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO — el tanque trabajando y el frasco */}
      <EscenaFundido T={T} a={K.G} b={K.A} zoom={0.05}>
        <MundoBiorreactor T={T} turbio={klerp(0.25, 0.8, kprog(T, K.G, K.A, kEase.suave))} burbujas={1} rpm={110} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Frasco T={T} x={880} y={1420} s={0.9} etiqueta="insulina" />
        </svg>
      </EscenaFundido>

      {/* 1 · ANTES — cerdos y reses */}
      <EscenaFundido T={T} a={K.A} b={K.R} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.yellow, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.A + 0.2, K.A + 0.8)}><Animal x={300} y={760} s={0.95} tipo="cerdo" color="#d98fa4" /></g>
          <g opacity={kprog(T, K.A + 0.7, K.A + 1.3)}><Animal x={720} y={1060} s={0.9} tipo="res" color="#8e7c72" /></g>
          <g opacity={kprog(T, K.A + 1.6, K.A + 2.2)}><Frasco T={T} x={250} y={1230} s={0.75} etiqueta="desde 1922" tapa="#b7a98f" lleno={0.6} /></g>
        </svg>
        <Chip T={T} at={K.A + 0.4} until={K.R - 0.3} texto="del páncreas de un animal" y={420} borde={KC.red} tam={42} />
      </EscenaFundido>

      {/* 2 · REACCIÓN — no era humana */}
      <EscenaFundido T={T} a={K.R} b={K.Ge} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.coral, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.26) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`rotate(${mece(T, 2, 0.2) * 1.5} 540 960)`}>
            <rect x={210} y={760} width={660} height={300} rx={150} fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
            {[[420, 880], [530, 940], [640, 870], [560, 830]].map(([cx, cy], i) => {
              const o = kprog(T, K.R + 0.8 + i * 0.22, K.R + 1.3 + i * 0.22, kEase.rebote);
              return <g key={i} opacity={o}><circle cx={cx} cy={cy} r={klerp(0, 34, o)} fill="#e8475a" opacity={0.75} />
                <circle cx={cx} cy={cy} r={klerp(0, 14, o)} fill="#b82a3c" /></g>; })}
          </g>
        </svg>
      </EscenaFundido>
      <MitoTachado T={T} at={K.R + 0.3} tacharEn={K.R + 2.2} until={K.Ge - 0.3} texto="¿insulina humana?" y={600} tam={52} />

      {/* 3 · GEN — se ESCRIBE (síntesis química, cadenas A y B) y entra al plásmido */}
      <EscenaFundido T={T} a={K.Ge} b={K.L} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #1d2433 0%, #0E0F12 76%)' }}></div>
        <Ambiente T={T} n={24} seed={5} color="rgba(190,220,255,.3)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <GenEscrito T={T} x={250} y={560} etiqueta="A" p={kprog(T, K.Ge + 0.2, K.Ge + 1.5)} h={kprog(T, K.Ge + 1.5, K.Ge + 2.1, kEase.sale)} />
          <GenEscrito T={T} x={250} y={760} etiqueta="B" p={kprog(T, K.Ge + 0.5, K.Ge + 1.8)} h={kprog(T, K.Ge + 1.7, K.Ge + 2.3, kEase.sale)} letras="TTCGTGAATCAACACCTTTGTGGCTCACAT" />
          {/* un plásmido (y una cepa de E. coli) para cada gen: A a la izquierda, B a la derecha */}
          <g opacity={kprog(T, K.Ge + 2.0, K.Ge + 2.6)}>
            <Plasmido T={T} x={300} y={1010} r={130} gen={1} rot={T * 14}
              cierra={kprog(T, K.Ge + 2.7, K.Ge + 3.5, kEase.sale)} />
            <Plasmido T={T} x={780} y={1010} r={130} gen={1} rot={-T * 14 + 40}
              cierra={kprog(T, K.Ge + 2.9, K.Ge + 3.7, kEase.sale)} />
            <text x={300} y={1032} textAnchor="middle" style={{ font:`900 64px ${KF.texto}` }} fill={PLAS}>A</text>
            <text x={780} y={1032} textAnchor="middle" style={{ font:`900 64px ${KF.texto}` }} fill={PLAS}>B</text>
          </g>
        </svg>
        <Chip T={T} at={K.Ge + 2.3} until={K.L - 0.3} texto="un plásmido y una bacteria para cada uno" y={1520} borde={PLAS} tam={34} />
        <Chip T={T} at={K.Ge + 0.3} until={K.L - 0.3} texto="1978 · dos genes, escritos" y={400} borde={KC.gold} tam={42} />
      </EscenaFundido>

      {/* 4 · LEE — la bacteria fabrica la proteína */}
      <EscenaFundido T={T} a={K.L} b={K.Q} zoom={0.05} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #16281f 0%, #0E0F12 76%)' }}></div>
        <Ambiente T={T} n={20} seed={8} color="rgba(126,231,135,.3)" tam={[3, 10]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Bacteria T={T} x={540} y={900} s={1.25} plasmido={kprog(T, K.L + 0.3, K.L + 0.9)}
            brilla={kprog(T, K.L + 1.2, K.L + 2.0)} />
          {Array.from({ length: 5 }, (_, i) => { const at = K.L + 1.6 + i * 0.3, p = kprog(T, at, at + 1.8, kEase.suave);
            if (T < at) return null;
            return <g key={i} opacity={1 - p * 0.3} transform={`translate(${klerp(540, 300 + i * 150, p)} ${klerp(900, 1250 + (i % 2) * 70, p)})`}>
              <CadenaInsulina T={T} s={0.7} seed={i} />
            </g>; })}
        </svg>
      </EscenaFundido>

      {/* 5 · PREGUNTA — re-gancho con la escala */}
      <EscenaFundido T={T} a={K.Q} b={K.P} zoom={0.06} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 48%, #1d2433 0%, #0E0F12 74%)' }}></div>
        <Ambiente T={T} n={26} seed={13} color="rgba(190,220,255,.32)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Bacteria T={T} x={480} y={900} s={klerp(0.9, 1.5, kprog(T, K.Q, K.P, kEase.suave))} plasmido={1} />
        </svg>
        <Escala T={T} z={klerp(0.9, 1.5, kprog(T, K.Q, K.P, kEase.suave))} pxPorMm={170000} />
      </EscenaFundido>

      {/* 6 · PLÁSMIDO — Lupa de rayos X sobre la ventana del tanque */}
      <EscenaFundido T={T} a={K.P} b={K.H} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={0.85} burbujas={1} rpm={110} fondo={KC.cyan} />
      </EscenaFundido>
      <Lupa T={T} at={K.P + 0.3} until={K.Ri + 0.2} x={520} y={620} r={260} fx={V.x} fy={V.y}
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#07131d" />
          <g transform={`translate(${r} ${r}) scale(${r / 260})`}>
            <Bacteria T={t} s={0.82} plasmido={1} brilla={0.5} />
          </g>
        </svg>} etiqueta="AL MICROSCOPIO · dentro del caldo" />
      <Etiqueta T={T} at={K.P + 1.6} until={K.Ri + 0.1} x={300} y={760} texto="el plásmido" color={PLAS} tam={34} />

      {/* 7 · RIBOSOMA — 51 aminoácidos */}
      <EscenaFundido T={T} a={K.Ri + 0.2} b={K.H} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #241f33 0%, #0E0F12 76%)' }}></div>
        <Ambiente T={T} n={22} seed={21} color="rgba(183,140,255,.3)" tam={[3, 9]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* cada cepa arma su cadena: A (21) arriba, B (30) abajo */}
          <Ribosoma T={T} y={680} n={21} p={kprog(T, K.Ri + 0.4, K.H - 0.4, kEase.suave)} />
          <Ribosoma T={T} y={980} n={30} p={kprog(T, K.Ri + 0.4, K.H - 0.4, kEase.suave)} />
        </svg>
        <Etiqueta T={T} at={K.Ri + 0.8} until={K.H - 0.3} x={80} y={580} texto="cadena A · 21" color={INS} tam={34} />
        <Etiqueta T={T} at={K.Ri + 0.8} until={K.H - 0.3} x={80} y={880} texto="cadena B · 30" color={INS} tam={34} />
        <Chip T={T} at={K.Ri + 0.6} until={K.H - 0.3} texto="cadena A: 21 · cadena B: 30" y={450} borde={INS} tam={40} />
        <Medidor T={T} at={K.Ri + 1.2} until={K.H - 0.3} etiqueta="CADENAS ARMADAS"
          valor={(t) => kprog(t, K.Ri + 0.4, K.H - 0.4, kEase.suave)}
          texto={(v) => 'A ' + Math.round(v * 21) + '/21 · B ' + Math.round(v * 30) + '/30'} y={1560} color={INS} />
      </EscenaFundido>

      {/* 8 · HUMULIN */}
      <EscenaFundido T={T} a={K.H} b={K.Ho} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.H + 2.6, K.H + 3.2)}>
            <Frasco T={T} x={300} y={960} s={1.25} etiqueta="Humulin" />
          </g>
        </svg>
        <TarjetaEstudio T={T} at={K.H + 0.3} until={K.H + 2.6} anio="1982" quien="octubre · FDA" revista="el primer fármaco de ADN recombinante" y={820} />
      </EscenaFundido>

      {/* 9 · HOY — no todo es bacteria */}
      <EscenaFundido T={T} a={K.Ho} b={K.Le} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.28) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Bacteria T={T} x={320} y={900} s={0.7} plasmido={1} />
          <g opacity={kprog(T, K.Ho + 0.6, K.Ho + 1.4)}><Levadura T={T} x={790} y={900} s={0.85} /></g>
        </svg>
        <Chip T={T} at={K.Ho + 0.2} until={K.Le - 0.3} texto="no todo es bacteria" y={470} borde={KC.gold} tam={46} />
      </EscenaFundido>

      {/* 10 · LEVADURA — la secreta al caldo */}
      <EscenaFundido T={T} a={K.Le} b={K.D} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 44% 50%, #3b2f17 0%, #120f08 78%)' }}></div>
        <Ambiente T={T} n={22} seed={31} color="rgba(246,208,106,.3)" tam={[3, 10]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Levadura T={T} x={430} y={900} s={1.25} suelta={kprog(T, K.Le + 0.8, K.Le + 1.6)} />
        </svg>
        <Etiqueta T={T} at={K.Le + 0.5} until={K.D - 0.3} x={430} y={1160} texto="Saccharomyces cerevisiae" it color={KC.gold2} tam={32} />
        <Chip T={T} at={K.Le + 2.2} until={K.D - 0.3} texto="la suelta al caldo" y={450} borde={INS} tam={44} />
      </EscenaFundido>

      {/* 11 · DIFERENCIA — adentro vs. afuera */}
      <EscenaFundido T={T} a={K.D} b={K.C} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#16281f, #0E0F12)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Bacteria T={T} x={300} y={850} s={0.78} plasmido={1} cuerpos={kprog(T, K.D + 0.4, K.D + 1.4, kEase.rebote)} />
          <g opacity={kprog(T, K.D + 1.8, K.D + 2.4)}><Levadura T={T} x={790} y={850} s={0.72} suelta={1} /></g>
        </svg>
        <Chip T={T} at={K.D + 0.6} until={K.C - 0.3} texto="se queda adentro" x={300} y={1110} borde={BACT} tam={36} />
        <Chip T={T} at={K.D + 2.0} until={K.C - 0.3} texto="la secreta" x={790} y={1110} borde={KC.gold2} tam={36} />
      </EscenaFundido>

      {/* 12 · CIERRE — el tanque del inicio */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.04}>
        <MundoBiorreactor T={T} turbio={0.85} burbujas={1} rpm={110} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Frasco T={T} x={880} y={1420} s={0.95} etiqueta="insulina" />
        </svg>
        <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="de un tanque, no de un animal" x={340} y={420} borde={KC.gold} tam={42} />
      </EscenaFundido>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Esa insulina salió *de un tanque.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.R - 0.1} texto="Antes venía del *páncreas de un animal.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Ge - 0.1} texto="No era humana: *daba reacciones.*" />
      <Subtitulo T={T} idx={3} at={K.Ge + 0.1} until={K.L - 0.1} texto="1978: *dos genes,* cada uno en su bacteria." />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.Q - 0.1} texto="Lo lee *y fabrica la proteína.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.P - 0.1} texto="¿Cómo cabe una fábrica *ahí dentro?*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ri - 0.1} texto="Un anillito de ADN extra: *el plásmido.*" />
      <Subtitulo T={T} idx={7} at={K.Ri + 0.1} until={K.H - 0.1} texto="Arman su cadena: *A de 21 y B de 30.*" />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.Ho - 0.1} texto="1982: *Humulin,* el primero de su clase." />
      <Subtitulo T={T} idx={9} at={K.Ho + 0.1} until={K.Le - 0.1} texto="Pero hoy *no todo es bacteria.*" />
      <Subtitulo T={T} idx={10} at={K.Le + 0.1} until={K.D - 0.1} texto="Mucha se hace *en levadura.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="En la bacteria *hay que sacarla y doblarla.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu insulina viene *de un tanque.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // el gancho: no salió de ningún animal
        [9.2,  12.8, 'avatar_10_serio_molesto',    'arriba-der'],  // las reacciones de la insulina animal
        [18.6, 22.0, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala la proteína que sale
        [22.9, 25.2, 'avatar_06_pensativo_menton', 'arriba-der'],  // re-gancho: ¿cómo cabe una fábrica ahí?
        [34.9, 38.2, 'avatar_02_apuntando_camara', 'presentador'],  // GRANDE: 1982, el primer fármaco recombinante
        [43.2, 46.8, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // la levadura la suelta al caldo
        [48.2, 51.8, 'avatar_04_bajando_lentes',   'arriba-der'],  // la diferencia entre las dos rutas
        [52.8, 57.9, 'avatar_13_senalando_arriba', 'gancho'],  // cierre: viene de un tanque
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ================= GEMELO MUDO (M4 · ciclo en loop) ================= */
function InsulinaCiclo() {
  const { T, CUES } = useComposition();
  const K = { Ge: CUES.Gen, P: CUES.Plasmido, E: CUES.Entra, D: CUES.Divide, Ta: CUES.Tanque,
    Ri: CUES.Ribosoma, S: CUES.Sale, F: CUES.Frasco, Ou: CUES.Outro };
  const caps = [
    { at: K.Ge, titulo: 'dos genes, escritos' }, { at: K.P, titulo: 'entra al plásmido' },
    { at: K.E, titulo: 'entra a la célula' }, { at: K.D, titulo: 'la célula se divide' },
    { at: K.Ta, titulo: 'el tanque' }, { at: K.Ri, titulo: 'cadenas A (21) y B (30)' },
    { at: K.S, titulo: 'la insulina sale' }, { at: K.F, titulo: 'y llena el frasco' },
  ];
  const nDiv = Math.min(16, Math.floor(kprog(T, K.D + 0.4, K.Ta - 0.3) * 16));
  const g = krng(81);
  const pobl = Array.from({ length: 16 }, () => [120 + g() * 840, 620 + g() * 700, g() * 360, 0.3 + g() * 0.18]);
  const vuelve = kprog(T, K.F + 4.4, K.Ou - 0.1, kEase.suave);     // la cámara regresa al gen: el loop

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #1d2433 0%, #0E0F12 78%)' }}></div>
      <Ambiente T={T} n={26} seed={6} color="rgba(190,220,255,.26)" tam={[3, 9]} />

      {/* 1-2 · el gen y el plásmido */}
      {(T < K.E + 1.2 || vuelve > 0.05) && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <g opacity={Math.max(1 - kprog(T, K.E + 0.2, K.E + 1.2), vuelve)}>
          <GenEscrito T={T} x={250} y={480} etiqueta="A" p={Math.max(kprog(T, K.Ge + 0.3, K.Ge + 3.0), vuelve)} h={Math.max(kprog(T, K.P + 0.2, K.P + 1.0, kEase.sale) * (1 - vuelve), 0)} />
          <GenEscrito T={T} x={250} y={660} etiqueta="B" p={Math.max(kprog(T, K.Ge + 1.0, K.Ge + 3.7), vuelve)} h={Math.max(kprog(T, K.P + 0.4, K.P + 1.2, kEase.sale) * (1 - vuelve), 0)} letras="TTCGTGAATCAACACCTTTGTGGCTCACAT" />
          <g opacity={Math.max(kprog(T, K.P + 0.8, K.P + 1.6) * (1 - vuelve), 0)}>
            <Plasmido T={T} x={540} y={1020} r={170} gen={1} rot={T * 14} cierra={kprog(T, K.P + 2.4, K.P + 3.4, kEase.sale)} />
          </g>
        </g>
      </svg>}

      {/* 3-4 · entra a la célula y se divide */}
      {T > K.E - 0.6 && T < K.Ta + 1.0 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <g opacity={kprog(T, K.E - 0.6, K.E + 0.4) * (1 - kprog(T, K.Ta + 0.2, K.Ta + 1.0))}>
          <Bacteria T={T} x={540} y={900} s={klerp(1.4, 0.5, kprog(T, K.D, K.D + 2.0, kEase.suave))} plasmido={1}
            brilla={kprog(T, K.E + 1.2, K.E + 2.2)} />
          {pobl.slice(0, nDiv).map(([x, y, r, s], i) => {
            const at = K.D + 0.4 + i * 0.4, p = kprog(T, at, at + 0.9, kEase.rebote);
            if (T < at) return null;
            return <g key={i} opacity={p}><Bacteria T={T} x={klerp(540, x, p)} y={klerp(900, y, p)} s={s * p} rot={r} plasmido={1} seed={i + 2} /></g>;
          })}
        </g>
      </svg>}

      {/* 5 · el tanque */}
      {T > K.Ta - 0.8 && T < K.Ri + 0.8 && <div style={{ position:'absolute', inset:0,
        opacity:kprog(T, K.Ta - 0.8, K.Ta + 0.2) * (1 - kprog(T, K.Ri + 0.1, K.Ri + 0.8)) }}>
        <MundoBiorreactor T={T} turbio={klerp(0.3, 0.9, kprog(T, K.Ta, K.Ri, kEase.suave))} burbujas={1} rpm={110} fondo={KC.cyan} />
      </div>}

      {/* 6 · los ribosomas arman la cadena: 51 aminoácidos */}
      {T > K.Ri - 0.4 && T < K.S + 1.0 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <g opacity={kprog(T, K.Ri - 0.4, K.Ri + 0.4) * (1 - kprog(T, K.S + 0.2, K.S + 1.0))}>
          <Ribosoma T={T} y={680} n={21} p={kprog(T, K.Ri + 0.4, K.S - 0.6, kEase.suave)} />
          <Ribosoma T={T} y={980} n={30} p={kprog(T, K.Ri + 0.4, K.S - 0.6, kEase.suave)} />
        </g>
      </svg>}

      {/* 7-8 · sale (levadura la secreta, bacteria hay que abrirla) y llena el frasco */}
      {T > K.S - 0.4 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <g opacity={kprog(T, K.S - 0.4, K.S + 0.4) * (1 - kprog(T, K.F + 0.6, K.F + 1.4))}>
          <Levadura T={T} x={360} y={820} s={0.9} suelta={1} />
          <Bacteria T={T} x={700} y={1180} s={0.85} plasmido={1} cuerpos={kprog(T, K.S + 1.0, K.S + 2.2, kEase.rebote)} />
        </g>
        <g opacity={kprog(T, K.F + 0.4, K.F + 1.2) * (1 - vuelve)}>
          <Frasco T={T} x={540} y={760} s={1.5} etiqueta="insulina"
            lleno={klerp(0.05, 0.78, kprog(T, K.F + 1.0, K.F + 3.6, kEase.suave))} />
        </g>
      </svg>}

      <Capitulo T={T} caps={caps} hasta={K.Ou - 0.1} />
      {T < K.S + 1.2 && <Contador T={T} at={K.Ri + 0.4} desde={0} hasta={AMINOS} dur={K.S - 0.6 - K.Ri - 0.4} sufijo=" aminoácidos (21 + 30)" x={540} y={470} tam={70} color={INS} />}
      <Chip T={T} at={K.F + 4.6} until={K.Ou - 0.1} texto="…y vuelve a empezar" y={1480} borde={KC.gold} tam={44} />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.6,  'avatar_11_sorprendido',      'gancho'],  // el gen de la insulina, escrito letra por letra
        [7.0,  10.5, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala el plásmido que se cierra
        [14.0, 17.5, 'avatar_06_pensativo_menton', 'arriba-der'],  // entra a la célula
        [20.5, 24.5, 'avatar_04_bajando_lentes',   'presentador'],  // GRANDE: la célula se divide y llena el tanque
        [28.0, 31.5, 'avatar_02_apuntando_camara', 'arriba-der'],  // el tanque trabajando
        [35.0, 38.5, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // cadenas A (21) y B (30)
        [44.0, 47.5, 'avatar_10_serio_molesto',    'arriba-der'],  // sacarla cuesta: hay que abrir la bacteria
        [51.5, 55.5, 'avatar_12_perfil_serio',     'arriba-der'],  // y llena el frasco
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function InsulinaNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <InsulinaNarrado />
    </CompositionStage>
  </div>;
}
function InsulinaCicloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <InsulinaCiclo />
    </CompositionStage>
  </div>;
}
window.Bacteria = Bacteria; window.Levadura = Levadura; window.Plasmido = Plasmido;
window.InsulinaNarradoApp = InsulinaNarradoApp;
window.InsulinaCicloApp = InsulinaCicloApp;
