// Shot IA #29 · El traductor que convierte a la ingeniera en «él» — NARRADO (N5 "El experimento" + N2 "El número").
// Datos: Prates, Avelar y Lamb, Neural Computing and Applications 32:6363–6381 (en línea 2019; experimentos de 2018);
// blog de Google (6 dic 2018) y Google Research (22 abr 2020); Stanovsky, Smith y Zettlemoyer, ACL 2019. Ver guion.md y verificacion.md.
// La pantalla del traductor es un dibujo esquemático, no la interfaz real.
const AZUL = '#2f6dff';

// Celular con un traductor esquemático. partes de cada salida: [{ t, color, o, tachado }]; color = resaltado.
function Traductor({ T, x = 360, y = 880, s = 0.8, origen = 'HÚNGARO', destino = 'INGLÉS', texto = '', escrito = 1, salidas = [], parpadea = true, o = 1, dx = 0 }) {
  const n = Math.round(texto.length * kclamp(escrito, 0, 1)), caret = escrito < 1 && (T * 2.5) % 1 < 0.6;
  const late = parpadea ? 0.55 + 0.45 * Math.abs(Math.sin(T * 4.2)) : 1;
  return <div style={{ position:'absolute', left:x + dx, top:y, width:560, height:820, transform:`translate(-50%,-50%) scale(${s})`, zIndex:20, opacity:o,
    background:'#f7f8fb', border:`12px solid ${KC.ink}`, borderRadius:70, boxShadow:'0 30px 60px rgba(0,0,0,.35)', overflow:'hidden' }}>
    <div style={{ position:'absolute', left:180, top:14, width:200, height:34, borderRadius:20, background:KC.ink }}></div>
    <div style={{ position:'absolute', left:0, right:0, top:62, height:76, display:'flex', alignItems:'center', gap:14, padding:'0 34px', borderBottom:'4px solid #dfe3ec' }}>
      <div style={{ width:52, height:52, borderRadius:14, background:AZUL, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', font:`900 26px ${KF.texto}` }}>文A</div>
      <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink }}>Traductor</div>
    </div>
    <div style={{ position:'absolute', left:34, right:34, top:160 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', font:`700 24px ${KF.mono}`, color:'#59607a' }}>
        <span style={{ background:'#e7ebf5', borderRadius:12, padding:'4px 14px' }}>{origen}</span>
        <span style={{ font:`900 30px ${KF.texto}`, color:AZUL }}>⇄</span>
        <span style={{ background:'#e7ebf5', borderRadius:12, padding:'4px 14px' }}>{destino}</span>
      </div>
      <div style={{ marginTop:26, minHeight:130, font:`800 52px/1.2 ${KF.texto}`, color:KC.ink }}>{texto.slice(0, n)}<span style={{ opacity: caret ? 1 : 0, color:AZUL }}>|</span></div>
      <div style={{ height:4, background:'#dfe3ec', margin:'10px 0 24px' }}></div>
      {salidas.filter((sa) => T >= sa.at).map((sa, i) => { const e = kprog(T, sa.at, sa.at + 0.35, kEase.sale);
        return <div key={i} style={{ opacity:e, transform:`translateY(${(1 - e) * 24}px)`, marginBottom:20, background:'#eef4ff', borderRadius:22, padding:'16px 20px' }}>
          {sa.tag && <div style={{ font:`700 22px ${KF.mono}`, color:'#59607a', marginBottom:6 }}>{sa.tag}</div>}
          <div style={{ font:`800 48px/1.2 ${KF.texto}`, color:'#1b2a6b' }}>{sa.partes.map((p, k) => <span key={k} style={{ position:'relative', display:'inline-block', opacity:p.o == null ? 1 : p.o,
            background: p.color ? p.color : 'transparent', color: p.color ? '#fff' : 'inherit', borderRadius:10, padding: p.color ? '0 10px' : 0,
            boxShadow: p.color && p.late !== false ? `0 0 ${30 * late}px ${p.color}` : 'none', marginRight: p.color ? 8 : 0 }}>{p.t}
            {p.tachado > 0 && <span style={{ position:'absolute', left:-6, top:'52%', height:8, width:`calc(${p.tachado * 100}% + 12px)`, background:KC.ink, borderRadius:4, transform:'rotate(-8deg)' }}></span>}</span>)}</div>
        </div>; })}
    </div>
  </div>;
}
// Dedo que toca o desliza (en SVG).
function Dedo({ x, y, s = 1, rot = -20, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -22 0 L -22 -120 Q -22 -146 0 -146 Q 22 -146 22 -120 L 22 0 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -10 -130 Q 0 -138 10 -130" stroke="#d98f6b" strokeWidth={5} fill="none" />
    <path d="M -60 -10 Q -64 90 0 120 Q 70 100 66 -6 Q 64 -40 40 -36 Q 30 -60 10 -50 L -22 -40 Q -60 -46 -60 -10 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Persona esquemática. extra: 'casco' | 'cofia' | null.
function Persona({ x, y, s = 1, color = AZUL, extra = null, T = 0, ph = 0 }) {
  const b = Math.sin(T * 3 + ph) * 5;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -95 150 Q -95 30 0 30 Q 95 30 95 150 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={0} cy={-40} r={62} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-22} cy={-44} r={7} fill={KC.ink} /><circle cx={22} cy={-44} r={7} fill={KC.ink} />
    <path d="M -18 -14 Q 0 0 18 -14" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {extra === 'casco' && <g><path d="M -78 -66 Q -76 -150 0 -150 Q 76 -150 78 -66 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-92} y={-74} width={184} height={20} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /><rect x={-10} y={-148} width={20} height={70} fill={KC.orange} stroke={KC.ink} strokeWidth={5} /></g>}
    {extra === 'cofia' && <g><path d="M -64 -80 L -50 -130 L 50 -130 L 64 -80 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-8} y={-124} width={16} height={36} fill={KC.red} /><rect x={-18} y={-114} width={36} height={16} fill={KC.red} /></g>}
  </g>;
}
// Barra vertical con su propio momento de entrada.
function BarraV({ T, at, until, valor, max, texto, etiqueta, color, cx, base = 1080, alto = 330 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.1, at + 1.1, kEase.sale), h = alto * (valor / max) * g;
  return <div style={{ position:'absolute', left:cx - 140, top:base - h - 90, width:280, zIndex:40, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`400 76px ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}`, height:84 }}>{texto}</div>
    <div style={{ height:h, background:color, border:`7px solid ${KC.ink}`, borderRadius:'20px 20px 0 0', marginTop:6, boxShadow:`10px 0 0 ${KC.ink}` }}></div>
    <div style={{ marginTop:12, font:`900 34px/1.1 ${KF.texto}`, color:KC.ink }}>{etiqueta}</div>
  </div>;
}
// Tarjeta con la frase de prueba de Stanovsky et al. (inglés → español, el "El" tachado).
function FrasePrueba({ T, at, until, y = 800 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), es = kprog(T, at + 1.0, at + 1.4, kEase.sale), tacha = kprog(T, at + 1.8, at + 2.2, kEase.sale);
  return <div style={{ position:'absolute', left:70, right:70, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'20px 32px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ font:`700 22px ${KF.mono}`, color:'#5a524a' }}>INGLÉS</div>
    <div style={{ font:`900 40px/1.2 ${KF.texto}`, color:KC.ink }}>The doctor asked the nurse to help <span style={{ background:KC.pink, color:'#fff', borderRadius:8, padding:'0 8px' }}>her</span></div>
    <div style={{ opacity:es, marginTop:14 }}>
      <div style={{ font:`700 22px ${KF.mono}`, color:'#5a524a' }}>ESPAÑOL (traductor)</div>
      <div style={{ font:`900 40px/1.2 ${KF.texto}`, color:KC.ink }}><span style={{ position:'relative', color:KC.red }}>El doctor
        <span style={{ position:'absolute', left:-6, top:'50%', height:9, width:`calc(${tacha * 100}% + 12px)`, background:KC.red, borderRadius:4, transform:'rotate(-6deg)' }}></span></span> le pidió a la enfermera…</div>
    </div>
  </div>;
}

function Traduccion() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Prueba, E: CUES.Estudio, R: CUES.Resultado, Q: CUES.Pregunta, Re: CUES.Realidad, Go: CUES.Google, Es: CUES.Espanol, S: CUES.Seattle, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const svgZ = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:25 }}>{c}</svg>;
  // gancho: el dedo intenta borrar «he» y vuelve a salir
  const borra = kprog(T, K.G + 0.95, K.G + 1.25) * (1 - kprog(T, K.G + 1.8, K.G + 2.1, kEase.sale));
  const dedoX = klerp(150, 330, kprog(T, K.G + 0.25, K.G + 0.9, kEase.sale)) + 120 * kprog(T, K.G + 0.95, K.G + 1.3, kEase.suave);
  const heGancho = [{ t:'he', color:KC.red, o:1 - borra }, { t:"'s an engineer" }];
  // prueba: dos tecleos
  const fase2 = T >= K.P + 7.2;
  const pruebaTexto = fase2 ? 'ő egy ápolónő' : 'ő egy mérnök';
  const pruebaEscrito = fase2 ? kprog(T, K.P + 7.3, K.P + 8.3) : kprog(T, K.P + 2.9, K.P + 4.4);
  const pruebaSal = fase2 ? [{ at: K.P + 8.5, partes: [{ t:'she', color:KC.pink }, { t:"'s a nurse" }] }]
    : [{ at: K.P + 4.7, partes: [{ t:'he', color:AZUL }, { t:"'s an engineer" }] }];
  const ozo = kprog(T, K.P + 0.7, K.P + 1.5, kEase.sale);
  // estudio: lluvia de profesiones
  const PROF = ['ingeniera', 'enfermero', 'piloto', 'doctora', 'chef', 'abogado', 'maestra', 'bombero', 'química', 'programador', 'panadero', 'científica', 'jueza', 'mecánico'];
  const COLS = [KC.yellow, KC.mint, KC.cyan, KC.pink, KC.orange, KC.paper];
  // cierre
  const cierreSal = [{ at: K.C - 1, partes: [{ t:'he', color:KC.red, late: T < K.C + 1.2 }, { t:"'s an engineer" }] },
    { at: K.C + 1.2, partes: [{ t:'she', color:KC.pink, late:false }, { t:"'s an engineer" }] }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el «he» que no se deja borrar */}
      <Escena T={T} a={K.G} b={K.P}>
        <FondoLunares color={KC.cyan} />
        <Traductor T={T} x={340} y={860} texto="ő egy mérnök" salidas={[{ at: -5, partes: heGancho }]} />
        {svgZ(<Dedo x={dedoX} y={1000 + 30 * Math.sin(T * 6) * (1 - kprog(T, K.G + 0.9, K.G + 1.0))} s={0.85} o={1 - kprog(T, K.G + 1.4, K.G + 1.7)} />)}
      </Escena>
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.P - 0.2} texto="¿error de dedo?" x={800} y={880} tam={42} />
      <Chip T={T} at={K.G + 2.0} until={K.P - 0.2} texto="lo aprendió" x={800} y={1000} tam={46} borde={KC.red} />
      {/* 2 · la prueba en húngaro */}
      <Escena T={T} a={K.P} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<g opacity={1 - kprog(T, K.P + 2.3, K.P + 2.7)}>
          <text x={540} y={1000} textAnchor="middle" style={{ font:`400 ${klerp(380, 230, ozo)}px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={12} transform={`translate(0 ${-ozo * 120})`}>ő</text>
          <g opacity={ozo}><Persona x={540 - 230 * ozo} y={900} s={0.9} color={AZUL} T={T} /><Persona x={540 + 230 * ozo} y={900} s={0.9} color={KC.pink} T={T} ph={1} /></g>
          <text x={310} y={1140} textAnchor="middle" opacity={ozo} style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink}>él</text>
          <text x={770} y={1140} textAnchor="middle" opacity={ozo} style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink}>ella</text>
        </g>)}
        <Traductor T={T} x={330} y={880} o={kprog(T, K.P + 2.4, K.P + 2.8)} dx={-200 * (1 - kprog(T, K.P + 2.4, K.P + 2.9, kEase.sale))} texto={pruebaTexto} escrito={pruebaEscrito} salidas={pruebaSal} parpadea={false} />
        {svg(<>
          <g opacity={kprog(T, K.P + 4.9, K.P + 5.3)}><Persona x={830} y={770} s={0.6} color={AZUL} extra="casco" T={T} /></g>
          <g opacity={kprog(T, K.P + 8.7, K.P + 9.1)}><Persona x={830} y={1000} s={0.6} color={KC.pink} extra="cofia" T={T} ph={2} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.P + 0.6} until={K.P + 2.4} texto="húngaro: ő = él o ella" y={560} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.P + 2.6} until={K.E - 0.2} texto="así salía en 2018" x={330} y={500} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.P + 5.0} until={K.E - 0.2} texto="ingeniero → he" x={830} y={880} tam={32} borde={AZUL} />
      <Chip T={T} at={K.P + 8.8} until={K.E - 0.2} texto="enfermera → she" x={830} y={1110} tam={32} borde={KC.pink} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{PROF.map((p, i) => { const t0 = K.E + 0.6 + i * 0.16, u = kprog(T, t0, t0 + 1.2, kEase.sale), col = i % 4, fila = Math.floor(i / 4);
          return <Ficha key={i} x={160 + col * 250 + (fila % 2) * 60} y={klerp(-80, 840 + fila * 64, u)} texto={p} tam={30} color={COLS[i % COLS.length]} rot={(i % 3 - 1) * 5} o={u > 0 ? 1 : 0} />; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.R - 0.3} anio="2018" quien="experimentos · UFRGS, Brasil" revista="Prates, Avelar y Lamb · publicado en 2019" y={600} />
      <Chip T={T} at={K.E + 1.8} until={K.R - 0.3} texto="1,019 profesiones · 12 idiomas sin género" y={1110} tam={36} borde={KC.ink} />
      {/* 4 · resultado en ciencia y tecnología */}
      <Escena T={T} a={K.R} b={K.Q}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      <Chip T={T} at={K.R + 0.2} until={K.Q - 0.2} texto="ciencia y tecnología (STEM)" x={600} y={700} tam={38} borde={KC.ink} />
      <BarrasHT T={T} at={K.R + 0.4} until={K.Q - 0.2} top={790} filas={[{ valor: 71.6, texto:'72 %', etiqueta:'salió «él»', color: AZUL }, { valor: 4.2, texto:'4 %', etiqueta:'salió «ella»', color: KC.pink, at: K.R + 2.9 }]} />
      <Chip T={T} at={K.R + 3.5} until={K.Q - 0.2} texto="el resto: neutro o sin pronombre" y={1120} tam={26} borde={KC.ink} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.Re} zoom={0.1}>
        <FondoLunares color={KC.coral} />
        {svg(<text x={290} y={1120} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      {/* 6 · la realidad: 12 % contra 36 % */}
      <Escena T={T} a={K.Re} b={K.Go}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <BarraV T={T} at={K.Re + 0.4} until={K.Go - 0.2} valor={11.76} max={40} texto="12 %" etiqueta="«ella» en el traductor" color={KC.pink} cx={330} />
      <Chip T={T} at={K.Re + 1.2} until={K.Go - 0.2} texto="(todas las profesiones)" x={330} y={700} tam={30} borde={KC.pink} />
      <BarraV T={T} at={K.Re + 3.9} until={K.Go - 0.2} valor={35.94} max={40} texto="36 %" etiqueta="mujeres en esos trabajos" color={KC.blue} cx={760} />
      <Chip T={T} at={K.Re + 4.6} until={K.Go - 0.2} texto="EE. UU., 2017" x={760} y={640} tam={30} borde={KC.blue} />
      {/* 7 · la respuesta de Google */}
      <Escena T={T} a={K.Go} b={K.Es}>
        <FondoLunares color={KC.orange} />
        <Traductor T={T} x={340} y={880} origen="TURCO" destino="INGLÉS" texto="o bir doktor" escrito={kprog(T, K.Go + 0.2, K.Go + 1.0)} parpadea={false}
          salidas={[{ at: K.Go + 1.4, tag:'femenino', partes:[{ t:'she', color:KC.pink, late:false }, { t:' is a doctor' }] }, { at: K.Go + 1.9, tag:'masculino', partes:[{ t:'he', color:AZUL, late:false }, { t:' is a doctor' }] }]} />
      </Escena>
      <Chip T={T} at={K.Go + 0.5} until={K.Es - 0.2} texto="diciembre 2018" x={820} y={720} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Go + 2.6} until={K.Es - 0.2} texto="algunos idiomas" x={820} y={820} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Go + 4.8} until={K.Es - 0.2} texto="2020: + húngaro" x={820} y={960} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Go + 1.6} until={K.Es - 0.2} texto="ejemplo del blog de Google" x={820} y={1110} tam={24} borde={KC.ink} />
      {/* 8 · en español hay que elegir */}
      <Escena T={T} a={K.Es} b={K.S}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g transform="translate(540 780)"><rect x={-200} y={-60} width={400} height={120} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <text y={20} textAnchor="middle" style={{ font:`900 56px ${KF.texto}` }} fill={KC.ink}>the doctor</text></g>
          {[[-1, AZUL, 'el doctor'], [1, KC.pink, 'la doctora']].map(([d, c, t], i) => { const u = kprog(T, K.Es + 0.6 + i * 0.5, K.Es + 1.2 + i * 0.5, kEase.sale);
            return <g key={i}>
              <path d={`M 540 845 Q ${540 + d * 40} 940 ${540 + d * 240 * u} ${860 + 160 * u}`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
              <g transform={`translate(${540 + d * 240} 1080) scale(${u})`}><rect x={-185} y={-55} width={370} height={110} rx={24} fill={c} stroke={KC.ink} strokeWidth={8} />
                <text y={18} textAnchor="middle" style={{ font:`900 52px ${KF.texto}` }} fill="#fff">{t}</text></g>
            </g>; })}
          <text x={540} y={960} textAnchor="middle" style={{ font:`400 ${110 + 12 * Math.sin(T * 5)}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Es + 1.6, K.Es + 2.0)}>?</text>
        </>)}
      </Escena>
      {/* 9 · Seattle, 2019 */}
      <Escena T={T} a={K.S} b={K.C}>
        <FondoLunares color={KC.pink} />
      </Escena>
      <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 2.5} anio="2019" quien="Universidad de Washington, Seattle" revista="Stanovsky, Smith y Zettlemoyer · ACL" y={760} />
      <FrasePrueba T={T} at={K.S + 2.7} until={K.C - 0.2} y={810} />
      <NumeroGigante T={T} at={K.S + 4.7} until={K.C - 0.2} valor={53} dur={0.9} sufijo=" %" etiqueta="género correcto al español" x={540} y={1050} tam={130} color={KC.yellow} />
      {/* 10 · cierre: el mismo traductor */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        <Traductor T={T} x={340} y={860} texto="ő egy mérnök" salidas={cierreSal} parpadea={T < K.C + 1.2} />
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="¿lo dijo la frase…" x={800} y={800} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="…o lo aprendió?" x={800} y={900} tam={36} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="No fue un error de dedo: *lo aprendió.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.P + 6.0} texto="Húngaro: *una palabra para él y ella.*" />
      <Subtitulo T={T} idx={2} at={K.P + 6.1} until={K.E - 0.1} texto="Salía *«he»*… y con enfermera, *«she».*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.R - 0.1} texto="Brasil: *1,019 profesiones, 12 idiomas.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.Q - 0.1} texto="Ciencia y tecnología: *«él» 72 %*, «ella» 4 %." />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.Re - 0.1} texto="¿Solo *copia la realidad?*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.Go - 0.1} texto="«Ella»: *12 %.* Mujeres en esos trabajos: *36 %.*" />
      <Subtitulo T={T} idx={7} at={K.Go + 0.1} until={K.Es - 0.1} texto="2018: *las dos versiones.* 2020: *húngaro.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.S - 0.1} texto="En español: *el doctor o la doctora.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.C - 0.1} texto="Seattle, 2019: *acertó solo 53 %.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Lo dijo la frase *o lo aprendió?*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Prueba + 5.4, CUES.Estudio - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Resultado + 1.4, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.15, CUES.Realidad + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Realidad + 4.9, CUES.Google - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Google + 1.8, CUES.Espanol - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Espanol + 1.3, CUES.Seattle - 0.1, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Seattle + 4.3, CUES.Cierre - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="29" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Barras horizontales con texto fijo (copia de las del modelo ia-09).
function BarrasHT({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 700 * f.valor / 100 * g), height:80, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 76px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}`, opacity:g }}>{f.texto}</div>
        </div>
      </div>; })}
  </div>;
}

function TraductorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Traduccion /></CompositionStage></div>;
}
window.TraductorApp = TraductorApp;
