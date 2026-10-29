// Shot Biotecnológico #12 · Los anticuerpos del suero antialacrán los hizo un caballo (faboterápicos) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala salvo la barra de nm).
const ALA = '#d9a441', ALA_OSC = '#a8741f', CAB = '#b5733f', CAB_OSC = '#7a4622', CRIN = '#3f2412';
const AC_H = '#ffd23f', AC_L = '#7fe3ff', TOX = '#ff4f7a', PEP = '#3fbf4a', PLASMA = '#f6d36b', SANGRE = '#c8102e';

// Capa SVG de pantalla completa.
function CapaAV({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Alacrán (Centruroides) de perfil, mirando a la derecha: cuerpo segmentado, pinzas delgadas, 4 patas por lado,
// cola (metasoma) de 5 segmentos arqueada sobre el dorso y telson con aguijón. (x, y) = suelo bajo el cuerpo.
function Alacran({ T, x, y, s = 1, camina = 1, flip = false }) {
  const paso = T * 9 * camina;
  const cola = [[-92, -22], [-138, -58], [-150, -108], [-128, -152], [-86, -176]];
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {/* patas (4 visibles) */}
    {[-58, -26, 6, 38].map((px, i) => { const f = Math.sin(paso + i * 1.7) * 10;
      return <path key={i} d={`M ${px} -18 L ${px + 14 + f} -46 L ${px + 30 + f * 1.4} 0`} stroke={ALA_OSC} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />; })}
    {/* cola */}
    {cola.map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy + Math.sin(T * 3) * 2 * i} rx={21 - i} ry={16 - i} fill={ALA} stroke={KC.ink} strokeWidth={6} />)}
    <g transform={`translate(${-50} ${-172 + Math.sin(T * 3) * 8}) rotate(${20 + Math.sin(T * 3) * 6})`}>
      <ellipse cx={0} cy={0} rx={26} ry={17} fill={ALA_OSC} stroke={KC.ink} strokeWidth={6} />
      <path d="M 20 4 Q 40 14 34 36" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
    {/* cuerpo */}
    {[-70, -40, -10, 20].map((cx, i) => <ellipse key={i} cx={cx} cy={-26} rx={30} ry={22 - i} fill={ALA} stroke={KC.ink} strokeWidth={6} />)}
    <ellipse cx={58} cy={-26} rx={36} ry={22} fill={ALA} stroke={KC.ink} strokeWidth={6} />
    <circle cx={74} cy={-36} r={5} fill={KC.ink} />
    {/* pedipalpos con pinzas delgadas */}
    <path d={`M 84 -24 L 130 -${40 + Math.sin(T * 4) * 6} L 168 -34`} stroke={ALA_OSC} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M 166 -34 q 30 -14 36 4 M 166 -32 q 26 12 34 -2`} stroke={KC.ink} strokeWidth={6} fill={ALA} />
  </g>;
}

// Caballo de perfil mirando a la izquierda. (x, y) = suelo bajo el cuerpo. CUELLO = punto del cuello (local).
const CUELLO = [-175, -455];
function Caballo({ T, x, y, s = 1, cabeza = 0 }) {
  const c = Math.sin(T * 1.6) * 3 + cabeza, cola = Math.sin(T * 2.2) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* cola */}
    <path d={`M 215 -350 Q ${290 + cola} -280 ${262 + cola} -150 Q ${246 + cola} -210 205 -300 Z`} fill={CRIN} stroke={KC.ink} strokeWidth={7} />
    {/* patas */}
    {[[-150, 1], [-95, -1], [120, 1], [175, -1]].map(([px, k], i) => <g key={i}>
      <path d={`M ${px} -260 L ${px + k * 4} -40 L ${px - 2} -6`} stroke={i % 2 ? CAB_OSC : CAB} strokeWidth={36} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={px - 24} y={-24} width={44} height={24} rx={6} fill={KC.ink} /></g>)}
    {/* cuerpo */}
    <ellipse cx={20} cy={-320} rx={240} ry={115} fill={CAB} stroke={KC.ink} strokeWidth={9} />
    <path d="M -120 -380 Q 20 -420 160 -380" stroke="rgba(255,255,255,.25)" strokeWidth={14} fill="none" strokeLinecap="round" />
    {/* cuello y cabeza */}
    <g transform={`rotate(${c} -170 -360)`}>
      <path d="M -120 -400 L -215 -585 Q -250 -625 -295 -600 L -340 -520 Q -365 -480 -330 -470 L -270 -490 L -220 -330 Z" fill={CAB} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      <path d="M -210 -590 Q -160 -520 -125 -400" stroke={CRIN} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M -248 -620 l -10 -40 l 30 30 Z" fill={CAB} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-262} cy={-575} r={9} fill={KC.ink} /><circle cx={-259} cy={-578} r={3} fill="#fff" />
      <ellipse cx={-334} cy={-492} rx={9} ry={6} fill={KC.ink} />
    </g>
  </g>;
}

// Frasco ámpula con polvo liofilizado blanco, tapón de hule y sello de aluminio. caballo 0..1 = caballito en la etiqueta.
function Frasco({ x, y, s = 1, rot = 0, caballo = 0, texto = 'antialacrán' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-70} y={-250} width={140} height={46} rx={10} fill="#c9ced6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-56} y={-262} width={112} height={22} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 -204 L -50 -170 Q -110 -150 -110 -100 L -110 60 Q -110 90 -80 90 L 80 90 Q 110 90 110 60 L 110 -100 Q 110 -150 50 -170 L 50 -204 Z" fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -100 40 Q 0 10 100 40 L 100 60 Q 100 82 78 82 L -78 82 Q -100 82 -100 60 Z" fill="#fbfbf6" stroke="rgba(0,0,0,.2)" strokeWidth={3} />
    <rect x={-96} y={-120} width={192} height={130} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-90} textAnchor="middle" style={{ font:`900 18px ${KF.texto}` }} fill={KC.ink}>FABOTERÁPICO</text>
    <text x={0} y={-64} textAnchor="middle" style={{ font:`700 19px ${KF.mono}` }} fill={KC.red}>{texto}</text>
    {caballo > 0 && <g opacity={caballo} transform={`translate(6 4) scale(${0.085 * (0.6 + 0.4 * caballo)})`}><Caballo T={0} x={0} y={0} /></g>}
    <path d="M -86 -150 L -86 30" stroke="rgba(255,255,255,.7)" strokeWidth={10} strokeLinecap="round" />
  </g>;
}

// Jeringa (aguja hacia la izquierda). emb 0..1 = émbolo empujado.
function Jeringa({ x, y, s = 1, rot = 0, emb = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <line x1={-150} y1={0} x2={-60} y2={0} stroke="#9aa3b5" strokeWidth={6} strokeLinecap="round" />
    <rect x={-60} y={-26} width={200} height={52} rx={10} fill="rgba(230,245,255,.9)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-56} y={-20} width={klerp(120, 30, emb)} height={40} rx={6} fill={ALA} opacity={0.85} />
    {[0, 40, 80, 120].map((px) => <line key={px} x1={-50 + px} y1={-26} x2={-50 + px} y2={-10} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={klerp(70, -20, emb) + 70} y={-12} width={130} height={24} fill="#dfe4ec" stroke={KC.ink} strokeWidth={6} />
    <rect x={klerp(70, -20, emb) + 196} y={-40} width={18} height={80} rx={6} fill="#dfe4ec" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Toxina del veneno: péptido esquemático (bolita con picos).
function Toxina({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 34} y2={Math.sin(a) * 34} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />; })}
    <circle r={22} fill={TOX} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-7} cy={-7} r={6} fill="#fff" opacity=".5" />
  </g>;
}

// Anticuerpo IgG en Y: dos brazos Fab (cadena pesada + ligera), bisagra y base Fc (dos cadenas pesadas).
// (x, y) = bisagra. fc 0..1 = la base (1 entera). migas 0..1 = la base deshecha en pedacitos que se alejan.
function Anticuerpo({ T, x, y, s = 1, rot = 0, fc = 1, migas = 0, puntas = 0 }) {
  const brazo = (lado) => <g transform={`rotate(${lado * 38})`}>
    <rect x={-17} y={-230} width={30} height={220} rx={15} fill={AC_H} stroke={KC.ink} strokeWidth={6} />
    <rect x={lado > 0 ? 13 : -45} y={-226} width={30} height={130} rx={15} fill={AC_L} stroke={KC.ink} strokeWidth={6} />
    {puntas > 0 && <circle cx={lado > 0 ? 12 : -12} cy={-232} r={30 + Math.sin(T * 6) * 4} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={puntas} />}
  </g>;
  const R = krng(4);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brazo(-1)}{brazo(1)}
    <path d="M -24 -6 L 24 -6" stroke={KC.ink} strokeWidth={8} />
    {fc > 0 && <g opacity={fc}>
      <rect x={-34} y={0} width={30} height={200} rx={15} fill={AC_H} stroke={KC.ink} strokeWidth={6} />
      <rect x={4} y={0} width={30} height={200} rx={15} fill={AC_H} stroke={KC.ink} strokeWidth={6} />
    </g>}
    {migas > 0 && Array.from({ length: 12 }, (_, i) => { const bx = (R() - 0.5) * 60, by = 20 + R() * 170, dx = (R() - 0.5) * 520, dy = (R() - 0.6) * 220;
      return <rect key={i} x={bx + dx * migas - 9} y={by + dy * migas - 9} width={18 + R() * 10} height={18} rx={7} fill={AC_H} stroke={KC.ink} strokeWidth={4}
        opacity={1 - migas * 0.85} transform={`rotate(${migas * (R() * 200 - 100)} ${bx + dx * migas} ${by + dy * migas})`} />; })}
  </g>;
}
// punta de un brazo (para que las toxinas lleguen ahí), en coordenadas del mundo
function puntaBrazo(x, y, s, lado) { const a = lado * 38 * Math.PI / 180; return [x + Math.sin(a) * 232 * s, y - Math.cos(a) * 232 * s]; }

// Pepsina: enzima esquemática que muerde (boca 0..1).
function Pepsina({ x, y, s = 1, boca = 0, rot = 0 }) {
  const a = (15 + boca * 32) * Math.PI / 180;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a) * 70} ${-Math.sin(a) * 70} A 70 70 0 1 0 ${Math.cos(a) * 70} ${Math.sin(a) * 70} Z`} fill={PEP} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-10} cy={-36} r={10} fill="#fff" /><circle cx={-7} cy={-36} r={5} fill={KC.ink} />
  </g>;
}

// Bolsa de sangre colgada. sep 0..1 = el plasma (amarillo) se separa arriba.
function Bolsa({ x, y, s = 1, sep = 0, nivel = 1 }) {
  const h = 380 * nivel, top = 200 - h, hp = h * 0.55 * sep;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={-330} x2={0} y2={-230} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-340} r={14} fill="none" stroke={KC.ink} strokeWidth={7} />
    <clipPath id="bolsaAV"><rect x={-140} y={-210} width={280} height={410} rx={50} /></clipPath>
    <g clipPath="url(#bolsaAV)">
      <rect x={-140} y={-210} width={280} height={410} fill="rgba(240,248,255,.6)" />
      <rect x={-140} y={top} width={280} height={hp} fill={PLASMA} />
      <rect x={-140} y={top + hp} width={280} height={h - hp} fill={SANGRE} />
    </g>
    <rect x={-140} y={-210} width={280} height={410} rx={50} fill="none" stroke={KC.ink} strokeWidth={9} />
    <rect x={-20} y={200} width={40} height={40} fill="#dfe4ec" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Camita de hospital con un niño. sano 0..1 (rojo → verde).
function Cama({ x, y, s = 1, sano = 0, grupo = AC_H }) {
  const c = mixHex('#ff5a5a', '#2fe0a8', sano);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-20} width={140} height={34} rx={8} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} />
    <line x1={-66} y1={14} x2={-66} y2={46} stroke={KC.ink} strokeWidth={7} /><line x1={66} y1={14} x2={66} y2={46} stroke={KC.ink} strokeWidth={7} />
    <rect x={-74} y={-60} width={14} height={80} rx={5} fill={grupo} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-34} cy={-36} r={22} fill="#f1b48f" stroke={KC.ink} strokeWidth={5} />
    <rect x={-12} y={-40} width={78} height={26} rx={10} fill={c} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Bandera de México (esquemática).
function BanderaMX({ x, y, s = 1, ondea = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) skewY(${ondea})`}>
    <rect x={0} y={0} width={80} height={140} fill="#006847" /><rect x={80} y={0} width={80} height={140} fill="#fff" /><rect x={160} y={0} width={80} height={140} fill="#ce1126" />
    <circle cx={120} cy={70} r={22} fill="#8a5a2b" opacity=".8" />
    <rect x={0} y={0} width={240} height={140} fill="none" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Antiveneno() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Do: CUES.Dosis, Ap: CUES.Aprende, Pl: CUES.Plasma, An: CUES.Anticuerpo, Pe: CUES.Pepsina, Pr: CUES.Pregunta,
    Es: CUES.Estudio, Re: CUES.Resultado, Fd: CUES.FDA, Mx: CUES.Mexico, Mu: CUES.Muertes, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el alacrán cruza desde el cuadro 0 y el caballo asoma
  const alaX = klerp(60, 600, kprog(T, K.G, K.G + 2.4, kEase.sale));
  const asoma = kprog(T, K.G + 2.6, K.G + 3.3, kEase.rebote);
  // dosis: la jeringa llega al cuello y empuja en escalones
  const HX = 700, HY = 1180, HS = 1.05;
  const cueX = HX + CUELLO[0] * HS, cueY = HY + CUELLO[1] * HS;
  const llega = kprog(T, K.Do + 0.2, K.Do + 1.0, kEase.sale);
  const escalon = (t) => { const u = (t - K.Do - 1.0) / 0.75; return kclamp(Math.floor(u) + 1, 0, 4) / 4; };
  // anticuerpo
  const AX = 600, AY = 960, AS = 1.15;
  const tox = [[-1, 0], [1, 0.5], [-1, 1.1], [1, 1.6]];
  const corte = kprog(T, K.Pe + 1.3, K.Pe + 1.6), migas = kprog(T, K.Pe + 1.5, K.Pe + 3.6, kEase.sale);
  // estudio: 8 + 7 camitas
  const camas = [...Array.from({ length: 8 }, (_, i) => ({ g: 0, x: 140 + (i % 2) * 190, y: 760 + Math.floor(i / 2) * 115 })),
    ...Array.from({ length: 7 }, (_, i) => ({ g: 1, x: 690 + (i % 2) * 190, y: 760 + Math.floor(i / 2) * 115 }))];
  const crono0 = K.Re + 0.3, cronoDur = 3.6;
  const sanoDe = (c, i) => c.g === 0 ? kprog(T, crono0 + 0.4 + (i % 8) * 0.38, crono0 + 0.8 + (i % 8) * 0.38) : (i === 10 ? kprog(T, crono0 + 2.6, crono0 + 3.0) : 0);
  // México: alacranes en el centro y el Pacífico, y Jalisco
  const MAPX = 40, MAPY = 690, gdl = mxProy(-103.35, 20.67);
  // estados con más casos en el boletín (centro y Pacífico), un alacrán por estado (esquemático)
  const puntos = [[-101.2, 21.0], [-99.9, 17.6], [-104.4, 21.6], [-101.4, 19.4], [-99.2, 18.8], [-103.8, 19.3], [-104.9, 24.2], [-98.0, 18.6], [-99.7, 19.5],
    [-107.6, 25.0], [-102.7, 22.9], [-96.6, 17.0], [-100.2, 20.7], [-110.6, 29.3], [-102.3, 21.9]].map(([a, b]) => mxProy(a, b));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el suero y el alacrán */}
      <Escena T={T} a={K.G} b={K.Do} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <CapaAV>
          <ellipse cx={540} cy={1185} rx={520} ry={40} fill="rgba(0,0,0,.12)" />
          <Frasco x={380} y={1090} s={1.25} rot={Math.sin(T * 2.2) * 3} />
          {asoma > 0 && <g transform={`translate(${klerp(1300, 980, asoma)} 1190)`}><Caballo T={T} x={0} y={0} s={0.85} /></g>}
          <Alacran T={T} x={alaX} y={1185} s={1.2} camina={1 - kprog(T, K.G + 2.4, K.G + 2.6)} />
        </CapaAV>
      </Escena>
      {/* 1–2 · dosis y meses: el caballo aprende */}
      <Escena T={T} a={K.Do} b={K.Pl} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <CapaAV>
          <rect x={0} y={HY} width={KW} height={KH - HY} fill="#7fcf6a" />
          <path d={`M 40 ${HY - 120} L 1040 ${HY - 120} M 40 ${HY - 60} L 1040 ${HY - 60}`} stroke="#8a5a2b" strokeWidth={16} />
          <Caballo T={T} x={HX} y={HY} s={HS} />
          {T < K.Ap + 0.3 && <g opacity={1 - kprog(T, K.Ap, K.Ap + 0.3)}>
            <Jeringa x={klerp(cueX + 420, cueX + 160, llega)} y={cueY - 40} s={1} rot={-15} emb={escalon(T)} />
            <Goteo T={T} x={cueX + 10} y0={cueY - 20} y1={cueY + 10} cada={0.75} color={ALA} desde={K.Do + 1.1} hasta={K.Ap - 0.2} r={9} />
          </g>}
          {T > K.Ap && <g transform={`translate(110 470) rotate(-4)`} opacity={kprog(T, K.Ap, K.Ap + 0.3)}>
            <rect x={0} y={0} width={240} height={200} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <rect x={0} y={0} width={240} height={56} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
            <circle cx={60} cy={0} r={12} fill={KC.ink} /><circle cx={180} cy={0} r={12} fill={KC.ink} />
            <text x={120} y={150} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.ink}>{`mes ${1 + Math.min(5, Math.floor(kprog(T, K.Ap + 0.2, K.Pl - 0.4) * 6))}`}</text>
          </g>}
        </CapaAV>
      </Escena>
      <Lupa T={T} at={K.Ap + 0.3} until={K.Pl - 0.2} x={760} y={640} r={190} fx={cueX + 30} fy={cueY + 40} tinte={KC.red} etiqueta="POR DENTRO · SANGRE"
        interior={(t, r) => { const n = Math.floor(2 + kprog(t, K.Ap + 0.5, K.Pl - 0.5) * 14); const Rr = krng(9);
          return <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#3a0a14" />
            {Array.from({ length: 9 }, (_, i) => <ellipse key={'g' + i} cx={Rr() * r * 2} cy={(Rr() * r * 2 + t * 30) % (r * 2)} rx={34} ry={20} fill={SANGRE} stroke="#000" strokeWidth={3} opacity={0.8} />)}
            {Array.from({ length: n }, (_, i) => { const px = 40 + Rr() * (r * 2 - 80), py = 40 + Rr() * (r * 2 - 80);
              return <g key={i} transform={`translate(${px} ${py + Math.sin(t * 2 + i) * 6}) rotate(${Rr() * 360 + t * 20}) scale(0.16)`}><Anticuerpo T={t} x={0} y={0} /></g>; })}
          </svg>; }} />
      {/* 3 · plasma: la bolsa se separa y lo rojo regresa al caballo */}
      <Escena T={T} a={K.Pl} b={K.An} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <CapaAV>
          <Bolsa x={330} y={900} s={1} sep={kprog(T, K.Pl + 0.3, K.Pl + 2.0, kEase.suave)} />
          <Caballo T={T} x={830} y={1190} s={0.62} />
          <path d={`M 350 1140 Q 520 1260 ${830 + CUELLO[0] * 0.62} ${1190 + CUELLO[1] * 0.62 + 30}`} stroke={SANGRE} strokeWidth={14} fill="none" strokeDasharray="26 16" strokeDashoffset={-T * 80}
            opacity={kprog(T, K.Pl + 2.0, K.Pl + 2.4)} strokeLinecap="round" />
          <FlechaCurva x1={420} y1={1180} x2={640} y2={1100} p={kprog(T, K.Pl + 2.0, K.Pl + 2.6)} color={SANGRE} T={T} />
        </CapaAV>
      </Escena>
      {/* 4–5 · el anticuerpo por dentro y la pepsina */}
      <Escena T={T} a={K.An} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(127,227,255,.25)" />
        <CapaAV>
          <Anticuerpo T={T} x={AX} y={AY} s={AS} rot={Math.sin(T * 0.8) * 3} fc={1 - corte} migas={migas} puntas={kprog(T, K.An + 0.4, K.An + 0.9) * (1 - kprog(T, K.Pe + 3.4, K.Pe + 3.8))} />
          {tox.map(([lado, d], i) => { const t0 = K.An + 1.0 + d, [px, py] = puntaBrazo(AX, AY, AS, lado), u = kprog(T, t0, t0 + 0.8, kEase.sale);
            const sx = px + lado * 300, sy = py - 220 + i * 40;
            return <Toxina key={i} x={klerp(sx, px + lado * 26 * (i < 2 ? 1 : 2.2), u)} y={klerp(sy, py - 30 - (i < 2 ? 0 : 40), u)} s={0.9} rot={T * 40 + i * 50} o={kprog(T, t0 - 0.3, t0)} />; })}
          {T > K.Pe - 0.2 && <Pepsina x={klerp(1180, AX + 70, kprog(T, K.Pe, K.Pe + 1.2, kEase.sale))} y={AY + 12} s={1} boca={Math.abs(Math.sin(T * 9))}
            rot={180} />}
        </CapaAV>
        <Escala T={T} z={1} pxPorMm={AS * 465 / 15e-6} x={70} y={1430} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <CapaAV>
          <Frasco x={290} y={1090} s={1.15} rot={Math.sin(T * 5) * 10} />
          <text x={300} y={780} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 8} 300 700)`}>?</text>
        </CapaAV>
      </Escena>
      {/* 7–8 · el ensayo de Tucson */}
      <Escena T={T} a={K.Es} b={K.Fd} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <CapaAV>
          {camas.map((c, i) => <Cama key={i} x={c.x} y={c.y} s={0.95} sano={sanoDe(c, i)} grupo={c.g === 0 ? AC_H : '#9aa3b5'} />)}
          <text x={235} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>con suero</text>
          <text x={785} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>con placebo</text>
          <line x1={540} y1={680} x2={540} y2={1180} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" />
        </CapaAV>
        <Cronometro T={T} at={crono0} until={K.Fd - 0.3} factor={4 * 3600 / (K.Fd - 0.25 - crono0)} x={330} y={470} etiqueta="TIEMPO DESDE EL SUERO" />
      </Escena>
      {/* 9 · FDA 2011 */}
      <Escena T={T} a={K.Fd} b={K.Mx} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <CapaAV>
          <Frasco x={540} y={1060} s={1.5} />
          {(() => { const p = kprog(T, K.Fd + 0.4, K.Fd + 0.7, kEase.rebote); return p > 0 && <g transform={`translate(700 830) rotate(-14) scale(${klerp(2.2, 1, p)})`} opacity={Math.min(1, p * 1.5)}>
            <circle r={120} fill="rgba(255,255,255,.85)" stroke={KC.red} strokeWidth={12} />
            <circle r={98} fill="none" stroke={KC.red} strokeWidth={4} />
            <text y={-6} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.red}>FDA</text>
            <text y={52} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.red}>2011</text>
          </g>; })()}
          <g opacity={kprog(T, K.Fd + 1.4, K.Fd + 1.8)}><BanderaMX x={120} y={560} s={0.9} ondea={Math.sin(T * 3) * 3} /></g>
        </CapaAV>
      </Escena>
      {/* 10 · México 2025 */}
      <Escena T={T} a={K.Mx} b={K.Mu} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <CapaAV>
          <MapaMexico x={MAPX} y={MAPY} ancho={1000} conCA={false}>
            {puntos.map(([px, py], i) => { const p = kprog(T, K.Mx + 0.4 + i * 0.09, K.Mx + 0.7 + i * 0.09, kEase.rebote);
              return p > 0 && <g key={i} transform={`translate(${px} ${py}) scale(${0.24 * p}) rotate(${(i * 47) % 360})`}><Alacran T={T} x={0} y={0} camina={0.3} /></g>; })}
            {(() => { const p = kprog(T, K.Mx + 3.0, K.Mx + 3.4, kEase.rebote); return p > 0 && <g transform={`translate(${gdl[0]} ${gdl[1]})`}>
              <circle r={Math.max(1, 46 * p + Math.sin(T * 6) * 4)} fill="none" stroke={KC.red} strokeWidth={10} />
              <path d={`M 0 0 L -24 -60 A 26 26 0 1 1 24 -60 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={6} transform={`scale(${p})`} />
            </g>; })()}
          </MapaMexico>
        </CapaAV>
      </Escena>
      {/* 11 · muertes: fines de los 70 vs estudio de 2020 */}
      <Escena T={T} a={K.Mu} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <CapaAV>
          {[[430, 500, 'fines de los 70', '~500 al año', KC.red], [810, 50, 'estudio de 2020', 'menos de 50', KC.mint]].map(([cx, v, et, num, col], i) => {
            const g = kprog(T, K.Mu + 0.3 + i * 1.6, K.Mu + 1.2 + i * 1.6, kEase.sale), h = 380 * (v / 500) * g, base = 1180;
            return <g key={i} opacity={kprog(T, K.Mu + 0.2 + i * 1.6, K.Mu + 0.5 + i * 1.6)}>
              <rect x={cx - 110} y={base - h} width={220} height={h} rx={16} fill={col} stroke={KC.ink} strokeWidth={8} />
              <text x={cx} y={base - h - 24} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{num}</text>
              <text x={cx} y={base + 50} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{et}</text>
            </g>; })}
          <line x1={280} y1={1182} x2={960} y2={1182} stroke={KC.ink} strokeWidth={8} />
        </CapaAV>
      </Escena>
      {/* 12 · cierre: el mismo frasco, ahora con el caballito */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaAV>
          <ellipse cx={540} cy={1185} rx={520} ry={40} fill="rgba(0,0,0,.12)" />
          <Frasco x={380} y={1090} s={1.25} rot={Math.sin(T * 2.2) * 3} caballo={kprog(T, K.Ci + 0.4, K.Ci + 1.2)} />
          <Alacran T={T} x={klerp(380, 1250, kprog(T, K.Ci + 1.0, K.Ou, kEase.suave))} y={1185} s={0.8} />
        </CapaAV>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 2.2} until={K.Do - 0.3} texto="¿lo hizo una máquina?" x={320} y={520} tam={42} />
      <Chip T={T} at={K.G + 3.0} until={K.Do - 0.3} texto="los anticuerpos: de un caballo" y={1500} tam={42} borde={CAB} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.8} x={90} y={1440} texto="Centruroides" it tam={36} color={KC.ink} />
      <Medidor T={T} at={K.Do + 1.0} until={K.Ap - 0.2} valor={(t) => escalon(t)} etiqueta="dosis de veneno" texto={(v) => (v < 0.3 ? 'poquito' : v < 0.8 ? 'un poco más' : 'más')} x={90} y={1440} color={ALA} />
      <Chip T={T} at={K.Ap + 0.4} until={K.Pl - 0.3} texto="anticuerpos contra el veneno" y={1500} tam={40} borde={AC_H} />
      <Chip T={T} at={K.Pl + 1.0} until={K.An - 0.3} texto="plasma = lo rico en anticuerpos" y={1500} tam={38} borde={PLASMA} />
      <Etq T={T} at={K.Pl + 1.2} until={K.An - 0.3} x={490} y={640} texto="plasma" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Pl + 2.2} until={K.An - 0.3} x={640} y={1290} texto="el resto regresa" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.An + 0.6} until={K.Pe - 0.2} x={1040} y={600} texto="brazos: atrapan" lado="izq" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.An + 1.0} until={K.Pe + 1.3} x={650} y={1100} texto="base (Fc)" tam={32} color={AC_H} />
      <Chip T={T} at={K.An + 2.0} until={K.Pe - 0.2} texto="toxina atrapada = toxina neutralizada" y={1520} tam={34} borde={TOX} />
      <Etq T={T} at={K.Pe + 0.5} until={K.Pe + 1.4} x={960} y={1050} texto="pepsina" lado="izq" tam={34} color={PEP} />
      <Chip T={T} at={K.Pe + 2.2} until={K.Pr - 0.2} texto="F(ab')₂ · faboterápico" y={1520} tam={46} borde={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Re - 0.2} anio="2004" quien="y 2005 · Tucson, Arizona" revista="15 niños · doble ciego · NEJM 2009" y={430} />
      <Chip T={T} at={K.Re + 3.6} until={K.Fd - 0.3} texto="suero: 8 de 8 · placebo: 1 de 7" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Fd + 0.9} until={K.Mx - 0.3} texto="Anascorp · hecho en México" y={1500} tam={42} borde={KC.red} />
      <NumeroGigante T={T} at={K.Mx + 0.4} until={K.Mu - 0.3} valor={300} dur={1.4} prefijo="+" sufijo=" mil" etiqueta="intoxicaciones · 2025" x={380} y={500} tam={130} color={KC.red} />
      <Chip T={T} at={K.Mx + 3.2} until={K.Mu - 0.3} texto="Jalisco · casi 48 mil" x={330} y={1480} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Mx + 3.6} until={K.Mu - 0.3} texto="Boletín Epidemiológico SSA · preliminar" y={1590} tam={26} mono borde="#9aa3b5" />
      <Chip T={T} at={K.Mu + 3.6} until={K.Ci - 0.3} texto="mejor atención + faboterápicos + acceso a salud" y={1500} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="¿te picó? → centro de salud" y={1500} tam={44} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Do - 0.1} texto="No los hizo una máquina: *los hizo un caballo.*" />
      <Subtitulo T={T} idx={1} at={K.Do + 0.1} until={K.Ap - 0.1} texto="Poquito veneno, *cada vez más.*" />
      <Subtitulo T={T} idx={2} at={K.Ap + 0.1} until={K.Pl - 0.1} texto="Su sangre se llena de *anticuerpos.*" />
      <Subtitulo T={T} idx={3} at={K.Pl + 0.1} until={K.An - 0.1} texto="Separan *el plasma.*" />
      <Subtitulo T={T} idx={4} at={K.An + 0.1} until={K.Pe - 0.1} texto="Una Y que *atrapa toxinas.*" />
      <Subtitulo T={T} idx={5} at={K.Pe + 0.1} until={K.Pr - 0.1} texto="La pepsina *corta la base.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿De verdad *funciona?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Re - 0.1} texto="Tucson: *15 niños graves.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Fd - 0.1} texto="8 de 8 *en menos de 4 horas.*" />
      <Subtitulo T={T} idx={9} at={K.Fd + 0.1} until={K.Mx - 0.1} texto="2011: *suero mexicano.*" />
      <Subtitulo T={T} idx={10} at={K.Mx + 0.1} until={K.Mu - 0.1} texto="Más de *300 mil* en 2025." />
      <Subtitulo T={T} idx={11} at={K.Mu + 0.1} until={K.Ci - 0.1} texto="De 500 a *menos de 50.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Tu antídoto *empezó en un caballo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Dosis + 1.0, CUES.Aprende - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Plasma + 0.5, CUES.Anticuerpo - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Anticuerpo + 1.5, CUES.Pepsina - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Resultado + 1.2, CUES.FDA - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Mexico + 2.5, CUES.Muertes - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Muertes + 1.0, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AntivenenoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Antiveneno /></CompositionStage></div>;
}
window.AntivenenoApp = AntivenenoApp;
