// Fungi Mati #04 · ¿Los hongos tienen metales pesados? — NARRADA (N1 "Por dentro" + N2) y MUDO (M2 "¿Por qué NO…?").
// Guion y fuentes: guion.md. El dibujo es esquemático; las partículas de metal NO están a escala (son átomos).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const fondoPuntos = (c) => ({ position:'absolute', inset:0, background:c, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' });
const METAL = [{ s: 'Cd', c: '#ffd23f' }, { s: 'Pb', c: '#8fa3c0' }, { s: 'Hg', c: '#e6e9ef' }];
const PX = 6.6;

// Hongo silvestre tipo boleto (sombrero café, poros amarillos, pie grueso). Base en (x, y).
function Boleto({ x, y, s = 1, rot = 0, tinte = 0 }) {
  const cap = mixHex('#8a4f2a', '#c23a2a', tinte);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -46 0 C -66 -60, -52 -120, -36 -150 L 36 -150 C 52 -120, 66 -60, 46 0 Z" fill="#efe3c6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -26 -40 l 10 -12 M 10 -70 l 12 -10 M -10 -110 l 10 -10" stroke="#c9b48c" strokeWidth={4} />
    <path d="M -150 -150 Q 0 -120 150 -150 Q 140 -128 0 -118 Q -140 -128 -150 -150 Z" fill="#e8c34a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -154 -148 C -150 -290, 150 -290, 154 -148 Q 0 -128 -154 -148 Z" fill={cap} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -90 -230 Q -20 -262 50 -244" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity=".3" />
  </g>;
}
// Rebozuelo (Cantharellus): embudo amarillo con pliegues que bajan por el pie.
function Rebozuelo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -24 0 C -30 -50, -60 -90, -120 -120 C -60 -150, 60 -150, 120 -120 C 60 -90, 30 -50, 24 0 Z" fill="#f4b42a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-60, -30, 0, 30, 60].map((k) => <path key={k} d={`M ${k * 0.3} -10 Q ${k * 0.8} -60 ${k * 1.6} -112`} fill="none" stroke="#c98a1a" strokeWidth={3} />)}
    <path d="M -120 -120 C -60 -150, 60 -150, 120 -120 C 60 -110, -60 -110, -120 -120 Z" fill="#ffcf4a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Partícula de metal con su símbolo.
function Metal({ x, y, k = 0, r = 16, o = 1 }) {
  const m = METAL[k % 3];
  return <g transform={`translate(${x} ${y})`} opacity={o}><circle r={r} fill={m.c} stroke={KC.ink} strokeWidth={3} />
    {r >= 14 && <text y={r * 0.36} textAnchor="middle" style={{ font:`700 ${r}px ${KF.mono}` }} fill={KC.ink}>{m.s}</text>}</g>;
}
// Metales que suben del suelo por el micelio hasta el hongo: n partículas en ciclo, p = cuánto ya subió (0..1).
function MetalesSuben({ T, x, sup, alto = 320, n = 18, p = 1, ancho = 300, r = 14 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.25 + i / n) % 1);
    if (i / n > p) return null;
    const x0 = x + ((i * 97) % ancho) - ancho / 2, y0 = sup + 60 + ((i * 53) % 260);
    const xx = klerp(x0, x + ((i * 13) % 80) - 40, kEase.suave(u)), yy = klerp(y0, sup - alto + ((i * 29) % 60), kEase.suave(u));
    return <Metal key={i} x={xx} y={yy} k={i} r={r} o={Math.min(1, u * 5, (1 - u) * 5) * 0.95} />; })}</g>;
}
// Olla con agua hirviendo (burbujas). Centro de la boca en (x, y).
function Olla({ T, x, y, s = 1, hierve = 1, agua = '#7fd6ff', children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 0 L -200 260 Q 0 300 200 260 L 230 0 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-280} y={30} width={60} height={26} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} /><rect x={220} y={30} width={60} height={26} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={230} ry={46} fill={agua} stroke={KC.ink} strokeWidth={9} />
    {children}
    {hierve > 0 && Array.from({ length: 14 }, (_, i) => { const u = ((T * 1.2 + i / 14) % 1); return <circle key={i} cx={-180 + (i * 29) % 360} cy={10 - u * 40} r={6 + (i % 3) * 4} fill="#fff" opacity={hierve * Math.sin(Math.PI * u) * 0.9} />; })}
    {hierve > 0 && Array.from({ length: 4 }, (_, i) => <path key={'v' + i} d={`M ${-120 + i * 80} -40 q 30 -50 0 -100 q -30 -50 0 -100`} fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={hierve * 0.35 * (0.5 + 0.5 * Math.sin(T * 2 + i))} transform={`translate(0 ${-((T * 30 + i * 20) % 40)})`} />)}
  </g>;
}
// Bosque con carretera al fondo. carros = cuántos pasan · polvo 0..1 = partículas que caen al suelo.
function Paisaje({ T, carretera = 1, mina = 0, fondo = KC.cyan, carros = 4, polvo = 0 }) {
  const sup = MUNDO_SUELO.sup;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {mina > 0 && <g opacity={mina}><rect x={70} y={640} width={90} height={400} fill="#6b6f7a" stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.3 + i / 6) % 1); return <circle key={i} cx={115 + u * 160} cy={620 - u * 300} r={30 + u * 50} fill="#9b9ea8" opacity={(1 - u) * 0.8} />; })}</g>}
    {carretera > 0 && <g opacity={carretera}>
      <rect x={-20} y={1040} width={KW + 40} height={110} fill="#4a4d55" stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={((i * 160 - T * 120) % 1280 + 1280) % 1280 - 100} y={1090} width={80} height={10} fill="#f4efe4" />)}
      {Array.from({ length: carros }, (_, i) => { const xx = ((T * 380 + i * 520) % 1700) - 300; return <g key={i} transform={`translate(${xx} 1050)`}>
        <rect x={0} y={0} width={190} height={64} rx={18} fill={[KC.red, KC.yellow, KC.blue, KC.orange][i % 4]} stroke={KC.ink} strokeWidth={6} />
        <rect x={40} y={-34} width={100} height={40} rx={12} fill="#cfe9f5" stroke={KC.ink} strokeWidth={6} />
        <circle cx={44} cy={66} r={20} fill={KC.ink} /><circle cx={150} cy={66} r={20} fill={KC.ink} />
        <circle cx={-20} cy={44} r={14 + 6 * Math.sin(T * 9 + i)} fill="#a8abb4" opacity=".7" /></g>; })}
    </g>}
    {polvo > 0 && Array.from({ length: 40 }, (_, i) => { const u = ((T * 0.3 + i / 40) % 1); return <circle key={i} cx={(i * 131) % KW + Math.sin(u * 6 + i) * 20} cy={1060 + u * (sup - 1060 + 40)} r={5} fill="#5e616b" opacity={polvo * Math.sin(Math.PI * u)} />; })}
  </svg>;
}

/* ---------- versión NARRADA ---------- */
function MetalesNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Micelio, R: CUES.Riesgo, L: CUES.Lugar, Cu: CUES.Cultivo, P: CUES.Pregunta, E: CUES.Estudio, D: CUES.Digestion, Li: CUES.Limpia, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4, sup = MUNDO_SUELO.sup;
  const keysG = [{ t: K.G, x: 540, y: 960, z: 1 }, { t: K.Mi - 0.4, x: 540, y: 960, z: 1.04 }, { t: K.Mi + 1.2, x: 560, y: 1080, z: 1.7 }, { t: K.R, x: 560, y: 1100, z: 1.8 }];
  const cG = camaraEn(T, keysG);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0-1 · gancho: agua y metales suben por el micelio al hongo */}
      <Escena T={T} a={K.G} b={K.R} zoom={0}>
        <Camara T={T} keys={keysG}>
          <MundoSuelo T={T} red={1} brillo={kprog(T, K.Mi + 0.4, K.Mi + 1.4)} ox={560} cielo={KC.cyan}>
            <Boleto x={560} y={sup + 4} s={1.55} rot={mece(T, 2, 0.15) * 1.5} tinte={0.25 * kprog(T, K.G + 2, K.Mi)} />
            {/* gota de agua que sube (acción en el primer segundo) */}
            {T < K.G + 1.6 && <g transform={`translate(560 ${klerp(sup + 420, sup - 200, kprog(T, K.G + 0.05, K.G + 1.4, kEase.suave))})`} opacity={1 - kprog(T, K.G + 1.2, K.G + 1.6)}><path d="M 0 -34 C 22 -6, 26 10, 0 26 C -26 10, -22 -6, 0 -34 Z" fill="#5ac8ff" stroke={KC.ink} strokeWidth={5} /></g>}
            <MetalesSuben T={T} x={560} sup={sup} alto={300} n={22} p={kprog(T, K.G + 1.4, K.G + 3.5)} r={18} />
          </MundoSuelo>
        </Camara>
        <Escala T={T} z={cG.z} pxPorMm={PX} />
      </Escena>
      {/* 2 · tres cosas */}
      <Escena T={T} a={K.R} b={K.L} fondo={KC.yellow}>
        <div style={fondoPuntos(KC.yellow)}></div>
        {['la especie', 'el lugar', 'cuánto comes'].map((t, i) => { const e = kentrada(T, K.R + 0.4 + i * 0.9, null, 'pop'); if (T < K.R + 0.4 + i * 0.9) return null;
          return <div key={i} style={{ position:'absolute', left:110, top:440 + i * 230, width:840, height:190, boxSizing:'border-box', opacity:e.o, transform:`scale(${e.s}) rotate(${(i % 2 ? 1.5 : -1.5) + mece(T, i, 0.2)}deg)`,
            background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:30, boxShadow:`12px 12px 0 ${KC.ink}`, display:'flex', alignItems:'center', gap:30, padding:'0 40px' }}>
            <div style={{ font:`400 120px/1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`4px ${KC.ink}` }}>{i + 1}</div>
            <div style={{ font:`900 64px ${KF.texto}`, color:KC.ink }}>{t}</div>
          </div>; })}
      </Escena>
      {/* 3 · junto a minas, fundidoras y carreteras */}
      <Escena T={T} a={K.L} b={K.Cu} zoom={0.03}>
        <MundoSuelo T={T} red={1} ox={760} cielo={KC.lilac} />
        <Paisaje T={T} carretera={kprog(T, K.L + 0.3, K.L + 0.8)} mina={kprog(T, K.L, K.L + 0.5)} polvo={kprog(T, K.L + 1, K.L + 2)} carros={3} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Boleto x={760} y={sup + 4} s={1.2} tinte={kprog(T, K.L + 1.5, K.L + 4)} />
          <MetalesSuben T={T} x={760} sup={sup} alto={230} n={30} p={1} r={13} />
        </svg>
        <Medidor T={T} at={K.L + 0.8} until={K.Cu - 0.2} etiqueta="METALES EN EL HONGO" valor={(t) => 0.25 + 0.7 * kprog(t, K.L + 1.5, K.L + 4.2)} texto={(v) => (v > 0.7 ? 'muy alto' : 'subiendo')} y={330} color={KC.red} />
      </Escena>
      {/* 4 · cultivados: sustrato controlado */}
      <Escena T={T} a={K.Cu} b={K.P} fondo={KC.mint}>
        <div style={fondoPuntos(KC.mint)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[250, 720].map((x, i) => <g key={i}><BolsaCultivo T={T} x={x} y={1020} w={340} h={520} col={1} seed={i + 4} />
            <RacimoOstra T={T} x={x + 110} y={880} s={1.1} abre={kprog(T, K.Cu + 0.4 + i * 0.4, K.Cu + 2 + i * 0.4)} n={6} color="#d8dde3" oscuro="#9aa4ae" seed={i + 2} /></g>)}
        </svg>
        <Medidor T={T} at={K.Cu + 0.8} until={K.P - 0.2} etiqueta="METALES EN EL HONGO" valor={(t) => 0.6 - 0.45 * kprog(t, K.Cu + 1, K.Cu + 3)} texto={(v) => (v < 0.3 ? 'bajo' : 'bajando')} y={330} color={KC.mint} />
      </Escena>
      {/* 5-6 · ¿y si los hierves? el estudio de Polonia (2017) */}
      <Escena T={T} a={K.P} b={K.D} fondo={KC.orange}>
        <div style={fondoPuntos(KC.orange)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {(() => { const tira = kprog(T, K.D - 3.4, K.D - 2.2, kEase.suave);
            return <g transform={`translate(${tira * 140} ${-tira * 60}) rotate(${tira * 38} 540 1120)`}>
              <Olla T={T} x={540} y={1120} s={1.15} hierve={1 - tira} agua={mixHex('#7fd6ff', '#a7a48a', kprog(T, K.E + 3, K.E + 6))}>
                {T < K.E + 7 ? [-110, 0, 110].map((dx, i) => <Rebozuelo key={i} x={dx} y={10 + mece(T, i, 0.8) * 8} s={0.55} rot={i * 25 - 25} />)
                  : [-90, 60].map((dx, i) => <g key={i} transform={`translate(${dx} ${10 + mece(T, i, 0.8) * 8}) scale(0.5)`}><path d="M -110 0 C -110 -90, 110 -90, 110 0 Z" fill="#c9823a" stroke={KC.ink} strokeWidth={8} /><rect x={-18} y={0} width={36} height={60} fill="#efe3c6" stroke={KC.ink} strokeWidth={6} /></g>)}
                {T > K.E + 2.5 && Array.from({ length: 10 }, (_, i) => <Metal key={i} x={-170 + i * 38} y={30 + ((i * 7) % 3) * 12} k={2} r={11} o={kprog(T, K.E + 2.6 + i * 0.12, K.E + 3 + i * 0.12)} />)}
              </Olla>
              {tira > 0.6 && Array.from({ length: 16 }, (_, i) => { const u = ((T * 1.1 + i / 16) % 1); return <circle key={i} cx={790 + u * 60} cy={1100 + u * 500} r={10} fill="#a7a48a" opacity={Math.sin(Math.PI * u)} />; })}
            </g>; })()}
        </svg>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2017" quien="Falandysz y Drewnowska · Polonia" revista="Environ. Sci. Pollut. Res. 24: 13352" y={620} />
        <Medidor T={T} at={K.E + 2.6} until={K.E + 6.8} etiqueta="MERCURIO · rebozuelo" valor={(t) => 1 - 0.15 * kprog(t, K.E + 3, K.E + 5)} texto={(v) => '−' + Math.round((1 - v) * 100) + ' %'} y={330} color={KC.yellow} />
        <Medidor T={T} at={K.E + 7} until={K.D - 0.2} etiqueta="MERCURIO · Amanita fulva" valor={(t) => 1 - 0.56 * kprog(t, K.E + 7.2, K.E + 9)} texto={(v) => '−' + Math.round((1 - v) * 100) + ' %'} y={330} color={KC.yellow} />
      </Escena>
      {/* 7 · digestión simulada */}
      <Escena T={T} a={K.D} b={K.Li} fondo="radial-gradient(circle at 50% 50%, #3a1c2e 0%, #0E0F12 75%)">
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <path d="M 120 520 C 120 360, 420 340, 480 520 C 540 700, 960 640, 960 900 C 960 1160, 560 1140, 420 1060 C 260 980, 120 900, 120 520 Z" fill="#e88aa0" stroke={KC.ink} strokeWidth={10} />
          <path d="M 170 540 C 180 420, 400 410, 440 560 C 500 740, 900 700, 900 900 C 900 1100, 580 1080, 450 1010 C 300 940, 170 860, 170 540 Z" fill="#f6c1cd" />
          {Array.from({ length: 10 }, (_, i) => { const x = 300 + (i * 61) % 460, y = 640 + (i * 83) % 330; return <rect key={'h' + i} x={x - 30} y={y - 12} width={60} height={24} rx={10} fill="#d9b58a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 40} ${x} ${y})`} />; })}
          {Array.from({ length: 30 }, (_, i) => { const sale = i < 12, u = kprog(T, K.D + 1 + i * 0.07, K.D + 3.2 + i * 0.07, kEase.suave), x0 = 300 + (i * 61) % 460, y0 = 640 + (i * 83) % 330;
            return <Metal key={i} x={sale ? klerp(x0, x0 + 120, u) : x0 + mece(T, i, 0.5) * 6} y={sale ? klerp(y0, 1260 + (i % 3) * 30, u) : y0} k={i} r={13} />; })}
        </svg>
        <TarjetaEstudio T={T} at={K.D + 0.1} until={K.D + 1.2} anio="2020" quien="Chiocchetti et al." revista="Food Chemistry 306" y={420} />
        <Medidor T={T} at={K.D + 1.2} until={K.Li - 0.2} etiqueta="SE LIBERA EN LA DIGESTIÓN" valor={(t) => 0.4 * kprog(t, K.D + 1.4, K.D + 3.4)} texto={(v) => (v < 0.39 ? Math.round(v * 100) + ' %' : '< 40 %')} y={330} color={KC.pink} />
      </Escena>
      {/* 8 · esa esponja limpia suelos */}
      <Escena T={T} a={K.Li} b={K.Ci} zoom={0.03}>
        <MundoSuelo T={T} red={kprog(T, K.Li, K.Li + 3)} brillo={0.7} ox={540} cielo={KC.mint}>
          {Array.from({ length: 34 }, (_, i) => { const u = kprog(T, K.Li + 0.5 + i * 0.07, K.Li + 2.5 + i * 0.07, kEase.suave), x0 = 80 + (i * 97) % 920, y0 = sup + 80 + (i * 61) % 480;
            return <Metal key={i} x={klerp(x0, 560, u)} y={klerp(y0, sup - 60, u)} k={i} r={12} o={1 - kprog(u, 0.8, 1)} />; })}
          <RacimoOstra T={T} x={560} y={sup - 20} s={1.4} abre={kprog(T, K.Li + 1, K.Li + 3)} n={7} color="#e8e4da" oscuro="#a7a090" />
        </MundoSuelo>
      </Escena>
      {/* 9 · cierre: el mismo hongo del inicio, ahora "reflejando" el suelo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <MundoSuelo T={T} red={1} brillo={kprog(T, K.Ci + 0.4, K.Ci + 1.4)} ox={560} cielo={KC.cyan}>
          <ellipse cx={560} cy={sup + 160} rx={330 * kprog(T, K.Ci + 0.4, K.Ci + 1.6)} ry={120 * kprog(T, K.Ci + 0.4, K.Ci + 1.6)} fill="none" stroke={KC.gold2} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={-T * 40} />
          <Boleto x={560} y={sup + 4} s={1.55} rot={mece(T, 2, 0.15) * 1.5} />
          <MetalesSuben T={T} x={560} sup={sup} alto={300} n={10} p={1} r={16} />
        </MundoSuelo>
        <Escala T={T} z={1} pxPorMm={PX} />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.8} until={K.Mi - 0.2} texto="cadmio · plomo · mercurio" y={1530} x={400} borde={KC.red} tam={40} />
      <Chip T={T} at={K.Mi + 1.4} until={K.R - 0.2} texto="micelio → fruto" y={430} borde={KC.mint} tam={42} />
      <Chip T={T} at={K.R + 0.1} until={K.L - 0.2} texto="el riesgo depende de" y={330} borde={KC.red} tam={40} />
      <Chip T={T} at={K.L + 1.2} until={K.Cu - 0.2} texto="minas · fundidoras · carreteras" y={1530} x={400} borde={KC.red} tam={36} />
      <Chip T={T} at={K.Cu + 0.3} until={K.P - 0.2} texto="sustrato controlado" y={1530} x={400} borde={KC.mint} tam={42} />
      <Chip T={T} at={K.E + 3} until={K.E + 6.8} texto="rebozuelos blanqueados" y={1530} x={400} borde={KC.yellow} tam={38} />
      <Etq T={T} at={K.E + 7.4} until={K.D - 0.2} x={100} y={1530} texto="Amanita fulva, hervida" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.D - 2.4} until={K.D - 0.2} texto="el agua se tira" x={300} y={760} borde={KC.red} tam={44} />
      <Etq T={T} at={K.D + 3.4} until={K.Li - 0.2} x={990} y={1300} texto="se absorbe" color={KC.pink} lado="izq" />
      <Etq T={T} at={K.D + 3.8} until={K.Li - 0.2} x={990} y={560} texto="se queda en el hongo" lado="izq" tam={28} />
      <Chip T={T} at={K.Li + 1} until={K.Ci - 0.2} texto="micorremediación" y={430} borde={KC.mint} tam={44} />
      <Etq T={T} at={K.Li + 2} until={K.Ci - 0.2} x={200} y={760} texto="Pleurotus" it lado="der" />
      <Chip T={T} at={K.Ci + 0.6} until={K.O} texto="un espejo del suelo" y={430} borde={KC.gold} tam={46} />

      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.Mi - 0.1} texto="No solo chupó agua: *también metales.*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.R - 0.1} texto="El micelio los guarda *en el fruto.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.L - 0.1} texto="Especie, lugar *y cuánto comes.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.Cu - 0.1} texto="Junto a minas o carreteras: *muchísimo más.*" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.P - 0.1} texto="Los cultivados *suelen tener menos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si *los hierves?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.E + 6.8} texto="Blanquear rebozuelos: *−15 % de mercurio.*" />
      <Subtitulo T={T} idx={7} at={K.E + 6.9} until={K.D - 0.1} texto="Hervir quitó más de la mitad… *y el agua se tira.*" />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={K.Li - 0.1} texto="En la digestión se libera *menos del 40 %.*" />
      <Subtitulo T={T} idx={9} at={K.Li + 0.1} until={K.Ci - 0.1} texto="Esa esponja *limpia suelos.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.O - 0.1} texto="No es veneno: *es un espejo del suelo.*" />

      <Robert T={T} apariciones={[[0, 3.6, 'avatar_11_sorprendido', 'gancho'], [6.5, 10, 'avatar_13_senalando_arriba', 'bajo-der'], [12, 15, 'avatar_07_pensativo_puno', 'bajo-der'], [17, 20.5, 'avatar_10_serio_molesto', 'bajo-der'], [22.5, 26, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'], [27.3, 30, 'avatar_06_pensativo_menton', 'arriba-der'], [37.2, 40.6, 'avatar_02_apuntando_camara', 'presentador-bajo'], [43.5, 47, 'avatar_11_sorprendido', 'bajo-der'], [50, 53.5, 'avatar_04_bajando_lentes', 'bajo-der'], [54.6, 58.2, 'avatar_12_perfil_serio', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="04" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo MUDO: ¿Por qué NO recoger hongos junto a la carretera? (M2) ---------- */
function MetalesMudo() {
  const { T, CUES } = useComposition();
  const K = { P: CUES.Pregunta, C: CUES.Carretera, R: CUES.Rayos, B: CUES.Bosque, H: CUES.Hervir, Re: CUES.Respuesta, V: CUES.Vuelta, F: CUES.Outro };
  const sup = MUNDO_SUELO.sup;
  // nivel de metales en el hongo: sube junto a la carretera, baja lejos, y hervir quita una parte
  const nivel = (t) => t < K.B ? 0.15 + 0.8 * kprog(t, K.C + 1, K.R + 2, kEase.suave) : t < K.H ? 0.95 - 0.8 * kprog(t, K.B + 0.5, K.B + 3) : t < K.Re ? 0.95 - 0.5 * kprog(t, K.H + 2, K.H + 6) : t < K.V ? 0.15 : 0.15;
  const enCarretera = T < K.B - 0.3 || T > K.V - 0.3;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* carretera (inicio, rayos X y final del loop) */}
      <Escena T={T} a={K.P - 1} b={K.B} zoom={0.02}>
        <MundoSuelo T={T} red={kprog(T, K.P, K.C + 3) * 0.6 + 0.4} brillo={kprog(T, K.R, K.R + 0.8)} ox={760} cielo={KC.lilac} />
        <Paisaje T={T} carretera={1} polvo={kprog(T, K.C, K.C + 2)} carros={4} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Boleto x={760} y={sup + 4} s={1.3} tinte={kprog(T, K.C + 2, K.R + 2)} rot={mece(T, 2, 0.15) * 1.5} />
          <MetalesSuben T={T} x={760} sup={sup} alto={250} n={28} p={kprog(T, K.C + 1, K.R + 2)} r={14} />
        </svg>
      </Escena>
      {/* bosque lejos */}
      <Escena T={T} a={K.B} b={K.H} zoom={0.03}>
        <MundoSuelo T={T} red={1} ox={540} cielo={KC.mint}>
          <Boleto x={540} y={sup + 4} s={1.5} rot={mece(T, 3, 0.15) * 1.5} />
          {[120, 950].map((x, i) => <g key={i}><rect x={x - 22} y={sup - 520} width={44} height={524} fill="#8a5a3b" stroke={KC.ink} strokeWidth={7} /><circle cx={x} cy={sup - 560} r={150} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} /></g>)}
        </MundoSuelo>
      </Escena>
      {/* hervir y tirar el agua */}
      <Escena T={T} a={K.H} b={K.Re} fondo={KC.orange}>
        <div style={fondoPuntos(KC.orange)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {(() => { const tira = kprog(T, K.Re - 3, K.Re - 1.8, kEase.suave);
            return <g transform={`translate(${tira * 140} ${-tira * 60}) rotate(${tira * 38} 540 1120)`}>
              <Olla T={T} x={540} y={1120} s={1.15} hierve={1 - tira} agua={mixHex('#7fd6ff', '#a7a48a', kprog(T, K.H + 2, K.H + 6))}>
                {[-90, 60].map((dx, i) => <g key={i} transform={`translate(${dx} ${10 + mece(T, i, 0.8) * 8}) scale(0.5)`}><path d="M -110 0 C -110 -90, 110 -90, 110 0 Z" fill="#8a4f2a" stroke={KC.ink} strokeWidth={8} /><rect x={-18} y={0} width={36} height={60} fill="#efe3c6" stroke={KC.ink} strokeWidth={6} /></g>)}
                {Array.from({ length: 12 }, (_, i) => <Metal key={i} x={-190 + i * 34} y={30 + ((i * 7) % 3) * 12} k={i} r={11} o={kprog(T, K.H + 2 + i * 0.3, K.H + 2.4 + i * 0.3)} />)}
              </Olla>
              {tira > 0.6 && Array.from({ length: 16 }, (_, i) => { const u = ((T * 1.1 + i / 16) % 1); return <circle key={i} cx={790 + u * 60} cy={1100 + u * 500} r={10} fill="#a7a48a" opacity={Math.sin(Math.PI * u)} />; })}
            </g>; })()}
        </svg>
      </Escena>
      {/* respuesta → vuelta a la carretera (loop) */}
      <Escena T={T} a={K.Re} b={K.V} fondo={KC.yellow}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 1100) scale(${1 + 0.03 * Math.sin(T * 2)})`}>
            <rect x={-330} y={-420} width={660} height={560} rx={40} fill="#cfeef7" stroke={KC.ink} strokeWidth={10} />
            <rect x={-310} y={40} width={620} height={80} rx={10} fill="#6b4a32" />
            {Array.from({ length: 9 }, (_, i) => <Metal key={i} x={-260 + i * 65} y={80 + (i % 2) * 14} k={i} r={12} />)}
            <g transform="translate(0 44)"><Boleto x={0} y={0} s={1.1} /></g>
            {Array.from({ length: 9 }, (_, i) => <Metal key={'c' + i} x={-90 + (i % 5) * 45} y={-240 + Math.floor(i / 5) * 40} k={i} r={11} />)}
          </g>
        </svg>
      </Escena>
      <Escena T={T} a={K.V} b={K.F + 4} zoom={0}>
        <MundoSuelo T={T} red={0.4} ox={760} cielo={KC.lilac} />
        <Paisaje T={T} carretera={1} carros={4} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Boleto x={760} y={sup + 4} s={1.3} rot={mece(T, 2, 0.15) * 1.5} /></svg>
      </Escena>

      {/* la pregunta fija arriba (M2) */}
      {T < K.F && <div style={{ position:'absolute', left:60, right:60, top:330, zIndex:44, textAlign:'center', opacity:kprog(T, K.P, K.P + 0.3) }}>
        <div style={{ display:'inline-block', background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, padding:'14px 30px', boxShadow:`10px 10px 0 ${KC.ink}`, font:`900 50px/1.1 ${KF.texto}`, color:KC.ink }}>
          ¿Por qué <span style={{ color:KC.red }}>NO</span> recoger hongos junto a la carretera?</div></div>}
      <Lupa T={T} at={K.R + 0.2} until={K.B - 0.4} x={360} y={760} r={210} fx={760} fy={sup - 320} etiqueta="RAYOS X · sombrero" tinte={KC.red}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#e9d9bf" />{Array.from({ length: 26 }, (_, i) => <Metal key={i} x={(i * 71 + 30) % (r * 2 - 30) + 15} y={(i * 113 + 40) % (r * 2 - 30) + 15 + mece(t, i, 0.5) * 6} k={i} r={18} o={kprog(t, K.R + 0.4 + i * 0.08, K.R + 0.7 + i * 0.08)} />)}</svg>} />
      <Medidor T={T} at={K.C + 0.6} until={K.Re - 0.3} etiqueta="METALES EN EL HONGO" valor={nivel} texto={(v) => (v > 0.7 ? 'alto' : v > 0.35 ? 'medio' : 'bajo')} y={640} color={nivel(T) > 0.7 ? KC.red : nivel(T) > 0.35 ? KC.orange : KC.mint} />
      <Chip T={T} at={K.C + 0.4} until={K.R - 0.2} texto="polvo y humo caen al suelo" y={560} borde={KC.red} tam={36} />
      <Chip T={T} at={K.R + 1.2} until={K.B - 0.3} texto="Cd · Pb · Hg" x={360} y={1060} borde={KC.red} tam={40} mono />
      <Chip T={T} at={K.B + 0.4} until={K.H - 0.3} texto="lejos de la contaminación" y={560} borde={KC.mint} tam={38} />
      <Chip T={T} at={K.H + 0.4} until={K.Re - 3} texto="hervir quita una parte" y={560} borde={KC.yellow} tam={38} />
      <Chip T={T} at={K.Re - 2.8} until={K.Re - 0.2} texto="…y el agua se tira" y={560} borde={KC.red} tam={40} />
      <Chip T={T} at={K.Re + 0.5} until={K.V - 0.2} texto="porque el hongo es un espejo del suelo" y={560} borde={KC.gold} tam={34} />
      <Robert T={T} apariciones={[[0, 3.6, 'avatar_11_sorprendido', 'bajo-der'], [7, 10.5, 'avatar_10_serio_molesto', 'bajo-der'], [13, 16, 'avatar_13_senalando_arriba', 'bajo-der'], [18.7, 21.7, 'avatar_07_pensativo_puno', 'bajo-der'], [26, 29.5, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'], [38, 41.5, 'avatar_04_bajando_lentes', 'bajo-der'], [45, 49, 'avatar_02_apuntando_camara', 'presentador-bajo'], [53, 57, 'avatar_12_perfil_serio', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="04" hasta={K.F} />
      <CierreMarca T={T} at={K.F} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" frase="El hongo es un espejo del suelo" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

window.MetalesNarradoApp = kApp(MetalesNarrado);
window.MetalesMudoApp = kApp(MetalesMudo);
