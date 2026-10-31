// Shot 01 — El Micelio (Serie: Shots Micológicos · La Creación del Robert)
// Escena 9:16 sobre animations.jsx (globals en window).
const { Stage, Sprite, useSprite, useTimeline, Easing, clamp } = window;

// ---- Paleta (esencia de marca) ----
const CREAM = '#F3EFE6';
const INK   = '#1A1712';
const GOLD  = '#E8A62A';
const GOLDL = '#F4C25A';
const SOIL  = '#2E241B';
const SOILL = '#4A3A2A';
const LEAF  = '#6E8A3C';
const LEAFD = '#57712F';
const TRUNK = '#7A5233';
const WOOD  = '#9C6C3F';
const CAPC  = '#E9DEC8';   // sombrero champiñón (blanco/beige)
const STEM  = '#F1EADB';   // tronco del champiñón
const APPLE = '#C0392B';
const RED   = '#C43B2B';

const W = 1080, H = 1920, DUR = 39.889;

const rnd = (i) => { const s = Math.sin(i * 91.37) * 43758.5453; return s - Math.floor(s); };

// ---------- fade wrapper ----------
function Layer({ children, style, fade = 0.5, rise = 0 }) {
  const { localTime, duration } = useSprite();
  const i = clamp(localTime / fade, 0, 1);
  const o = clamp((duration - localTime) / fade, 0, 1);
  const op = Math.min(i, o);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, transform: `translateY(${(1 - i) * rise}px)`, ...style }}>
      {children}
    </div>
  );
}

// ---------- logo isotipo (ADN en dorado = biología / micología) ----------
function LogoIso({ size = 104 }) {
  return (
    <svg viewBox="-160 -170 320 340" width={size} height={size * 1.0625} style={{ display: 'block' }}>
      <path d="M 55.0,95.3 L 27.5,142.9 L -27.5,142.9 L -55.0,95.3 L -110.0,95.3 L -137.5,47.6 L -110.0,0.0 L -137.5,-47.6 L -110.0,-95.3 L -55.0,-95.3 L -27.5,-142.9 L 27.5,-142.9 L 55.0,-95.3 L 27.5,-47.6 L -27.5,-47.6 L -55.0,-0.0 L -27.5,47.6 L 27.5,47.6 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth={7} />
      <path d="M -27.5 47.6 L -55 0 L -110 0 L -137.5 47.6 L -110 95.3 L -55 95.3 Z" fill={GOLD} />
      <g stroke="#0a0a0a" strokeWidth={2.6} strokeOpacity={0.65}>
        <line x1="-55.0" y1="95.3" x2="-27.5" y2="47.6" />
        <line x1="-110.0" y1="0.0" x2="-55.0" y2="-0.0" />
        <line x1="-55.0" y1="-95.3" x2="-27.5" y2="-47.6" />
      </g>
      {/* átomo */}
      <g transform="translate(0,-95.3)" stroke="#0a0a0a" strokeWidth={3.4} fill="#0a0a0a">
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" transform="rotate(120)" />
        <circle cx="16.4" cy="4.0" r="2.6" />
        <circle cx="-11.5" cy="-15.1" r="2.6" />
        <circle cx="4.2" cy="6.5" r="2.6" />
        <circle cx="0" cy="0" r="4.5" />
      </g>
      {/* matraz */}
      <g transform="translate(-82.5,-47.6)" stroke="#0a0a0a" strokeWidth={3.4} fill="none">
        <path d="M -5,-24 L 5,-24 L 5,-4 L 19,17 Q 22,24 15,24 L -15,24 Q -22,24 -19,17 L -5,-4 Z" />
        <path d="M -8,10 L 8,10" />
      </g>
      {/* ADN detallado (negro) sobre celda dorada */}
      <g transform="translate(-82.5,47.6) rotate(28)" stroke="#0a0a0a" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M 0.0,-34.0 L 5.0,-31.2 L 9.2,-28.3 L 12.0,-25.5 L 13.0,-22.7 L 12.0,-19.8 L 9.2,-17.0 L 5.0,-14.2 L 0.0,-11.3 L -5.0,-8.5 L -9.2,-5.7 L -12.0,-2.8 L -13.0,0.0 L -12.0,2.8 L -9.2,5.7 L -5.0,8.5 L 0.0,11.3 L 5.0,14.2 L 9.2,17.0 L 12.0,19.8 L 13.0,22.7 L 12.0,25.5 L 9.2,28.3 L 5.0,31.2 L 0.0,34.0" />
        <path d="M 0.0,-34.0 L -5.0,-31.2 L -9.2,-28.3 L -12.0,-25.5 L -13.0,-22.7 L -12.0,-19.8 L -9.2,-17.0 L -5.0,-14.2 L 0.0,-11.3 L 5.0,-8.5 L 9.2,-5.7 L 12.0,-2.8 L 13.0,0.0 L 12.0,2.8 L 9.2,5.7 L 5.0,8.5 L 0.0,11.3 L -5.0,14.2 L -9.2,17.0 L -12.0,19.8 L -13.0,22.7 L -12.0,25.5 L -9.2,28.3 L -5.0,31.2 L 0.0,34.0" />
        <path d="M 13.0,-22.7 L -13.0,-22.7 M -13.0,0.0 L 13.0,0.0 M 13.0,22.7 L -13.0,22.7" />
      </g>
      {/* destello */}
      <g transform="translate(0,95.3)" fill="#0a0a0a">
        <path d="M 17.0,-3.0 L 3.2,0.2 L 0.0,14.0 L -3.2,0.2 L -17.0,-3.0 L -3.2,-6.2 L -0.0,-20.0 L 3.2,-6.2 Z" />
        <path d="M 20.0,15.0 L 14.4,16.4 L 13.0,22.0 L 11.6,16.4 L 6.0,15.0 L 11.6,13.6 L 13.0,8.0 L 14.4,13.6 Z" />
      </g>
    </svg>
  );
}

// ---------- marca complementaria: hongo (identifica la serie) ----------
function MushroomMark({ size = 60 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      <path d="M40 56 L38 84 Q38 92 46 92 L54 92 Q62 92 62 84 L60 56 Z" fill={CREAM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M8 57 A42 45 0 0 1 92 57 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M18 57 L82 57" stroke={INK} strokeWidth={4} opacity={0.4} />
    </svg>
  );
}
function BrandLockup({ iso = 140 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: iso * 0.11 }}>
      <LogoIso size={iso} />
      <MushroomMark size={iso * 0.44} />
    </div>
  );
}

// ---------- orellana / seta de ostra (Pleurotus ostreatus) ----------
function OysterCluster({ grow = 1, scale = 1 }) {
  const caps = [
    { r: 44, rot: -40, dx: -10, dy: -2 },
    { r: 58, rot: -18, dx: 0, dy: -14 },
    { r: 50, rot: 6, dx: 14, dy: -8 },
    { r: 34, rot: 26, dx: 12, dy: 8 },
  ];
  return (
    <g transform={`scale(${scale})`}>
      {caps.map((c, k) => {
        const rr = c.r * clamp(grow * 1.3 - k * 0.12, 0, 1);
        if (rr < 1) return null;
        return (
          <g key={k} transform={`translate(${c.dx} ${c.dy}) rotate(${c.rot})`}>
            <path d={`M ${-rr} 0 A ${rr} ${rr * 0.92} 0 0 1 ${rr} 0 Q ${rr * 0.55} ${rr * 0.42} 0 ${rr * 0.36} Q ${-rr * 0.55} ${rr * 0.42} ${-rr} 0 Z`} fill="#DAD3C3" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d={`M ${-rr * 0.72} ${rr * 0.06} Q 0 ${rr * 0.24} ${rr * 0.72} ${rr * 0.06}`} fill="none" stroke="#AFA68E" strokeWidth={3} opacity={0.7} />
          </g>
        );
      })}
    </g>
  );
}

// ---------- etiqueta de nombre (común + científico) ----------
function NameLabel({ common, sci, x, y }) {
  const { localTime, duration } = useSprite();
  const i = clamp(localTime / 0.4, 0, 1);
  const o = clamp((duration - localTime) / 0.4, 0, 1);
  const op = Math.min(i, o);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,0) translateY(${(1 - i) * 16}px)`, opacity: op, textAlign: 'center', width: 620 }}>
      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 58, color: INK, lineHeight: 0.98, letterSpacing: '0.01em' }}>{common}</div>
      <div style={{ fontFamily: 'Archivo, sans-serif', fontStyle: 'italic', fontWeight: 600, fontSize: 34, color: '#8a5b12', marginTop: 8 }}>{sci}</div>
    </div>
  );
}

// ---------- champiñón (sombrero conectado al tronco) ----------
function SetaGroup({ grow = 1, spore = 0, bump = false }) {
  return (
    <g transform={`scale(1 ${grow})`}>
      {bump && <ellipse cx={0} cy={2} rx={58} ry={15} fill={SOILL} opacity={0.5} />}
      {/* tronco */}
      <path d="M-30 -4 C-40 -80 -30 -122 0 -124 C30 -122 40 -80 30 -4 C14 5 -14 5 -30 -4 Z" fill={STEM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* anillo (velo) */}
      <path d="M-30 -70 C-14 -62 14 -62 30 -70" fill="none" stroke={INK} strokeWidth={4} opacity={0.5} />
      {/* sombrero (superpuesto al tronco → conectado) */}
      <path d="M-132 -118 C-126 -210 -66 -250 0 -250 C66 -250 126 -210 132 -118 C88 -100 44 -96 0 -96 C-44 -96 -88 -100 -132 -118 Z" fill={CAPC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* láminas bajo el sombrero */}
      <path d="M-118 -116 C-60 -104 60 -104 118 -116" fill="none" stroke="#B9A277" strokeWidth={5} opacity={0.7} />
      {/* brillo suave */}
      <path d="M-96 -168 C-72 -196 -30 -210 4 -206" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.35} />
      {/* esporas */}
      {spore > 0 && [0, 1, 2, 3, 4, 5, 6].map((k) => {
        const p = clamp(spore * 1.3 - k * 0.1, 0, 1);
        const sx = -96 + k * 32 + Math.sin(k * 2 + spore * 6) * 9;
        return <circle key={k} cx={sx} cy={-92 + p * 230} r={7} fill={GOLD} opacity={p > 0 ? (1 - p) * 0.85 + 0.12 : 0} />;
      })}
    </g>
  );
}

// ---------- manzano ----------
function TreeGroup({ grow = 1, ringApple = false }) {
  const apples = [[-70, -352], [60, -300], [-10, -410], [95, -388]];
  return (
    <g transform={`scale(${grow})`}>
      <rect x={-28} y={-268} width={56} height={268} rx={12} fill={TRUNK} stroke={INK} strokeWidth={6} />
      <circle cx={-92} cy={-330} r={118} fill={LEAFD} stroke={INK} strokeWidth={6} />
      <circle cx={96} cy={-322} r={112} fill={LEAFD} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-408} r={128} fill={LEAF} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-330} r={132} fill={LEAF} stroke={INK} strokeWidth={6} />
      {apples.map(([ax, ay], k) => (
        <g key={k}>
          <circle cx={ax} cy={ay} r={22} fill={APPLE} stroke={INK} strokeWidth={4} />
          {ringApple && k === 1 && (
            <circle cx={ax} cy={ay} r={40} fill="none" stroke={GOLD} strokeWidth={7} strokeDasharray="10 10" />
          )}
        </g>
      ))}
    </g>
  );
}

// ---------- micelio (red de hilos que crece) ----------
function MyceliumGroup({ grow = 1, spread = 460, depth = 360 }) {
  const N = 18;
  const threads = [];
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * 2 - 1;
    const ex = t * spread + (rnd(i) - 0.5) * 70;
    const ey = 70 + rnd(i + 7) * depth + Math.abs(t) * 30;
    const cx = ex * 0.42 + (rnd(i + 3) - 0.5) * 110;
    const cy = ey * 0.4 + 30;
    threads.push({ ex, ey, cx, cy, i });
  }
  return (
    <g>
      {threads.map(({ ex, ey, cx, cy, i }) => {
        const local = clamp(grow * 1.25 - (i % 5) * 0.06, 0, 1);
        const node = clamp((local - 0.7) / 0.3, 0, 1);
        return (
          <g key={i}>
            <path d={`M0 0 Q ${cx} ${cy} ${ex} ${ey}`} fill="none" stroke={GOLDL} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} opacity={0.92} />
            <path d={`M${cx} ${cy} q ${(rnd(i + 2) - 0.5) * 120} ${40 + rnd(i) * 60} ${(rnd(i + 5) - 0.5) * 140} ${90 + rnd(i + 1) * 70}`} fill="none" stroke={GOLD} strokeWidth={2.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp(local * 1.1 - 0.2, 0, 1)} opacity={0.6} />
            <circle cx={ex} cy={ey} r={6} fill={GOLDL} opacity={node} />
          </g>
        );
      })}
    </g>
  );
}

// ---------- tronco caído con micelio dentro ----------
function LogGroup({ grow = 1 }) {
  const N = 12;
  const threads = [];
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * 2 - 1;
    const ex = t * 210 + (rnd(i) - 0.5) * 40;
    const ey = (rnd(i + 4) - 0.5) * 80 + (i % 3) * 12;
    threads.push({ ex, ey, cx: ex * 0.4 + (rnd(i + 1) - 0.5) * 60, cy: ey * 0.4, i });
  }
  return (
    <g>
      <ellipse cx={10} cy={80} rx={250} ry={30} fill={INK} opacity={0.12} />
      {/* cuerpo del tronco */}
      <rect x={-250} y={-62} width={500} height={124} rx={62} fill={TRUNK} stroke={INK} strokeWidth={6} />
      {/* corteza */}
      <path d="M-190 -30 C-60 -44 120 -44 210 -22" fill="none" stroke="#5F3F27" strokeWidth={5} opacity={0.6} />
      <path d="M-200 22 C-60 36 120 34 200 20" fill="none" stroke="#5F3F27" strokeWidth={5} opacity={0.5} />
      {/* micelio dentro (clip a la madera) */}
      <clipPath id="logclip"><rect x={-250} y={-62} width={500} height={124} rx={62} /></clipPath>
      <g clipPath="url(#logclip)">
        {threads.map(({ ex, ey, cx, cy, i }) => {
          const local = clamp(grow * 1.3 - (i % 4) * 0.08, 0, 1);
          return <path key={i} d={`M-30 0 Q ${cx} ${cy} ${ex} ${ey}`} fill="none" stroke={GOLDL} strokeWidth={3.4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} opacity={0.9} />;
        })}
      </g>
      {/* cara cortada con anillos */}
      <ellipse cx={-250} cy={0} rx={30} ry={62} fill={WOOD} stroke={INK} strokeWidth={6} />
      <ellipse cx={-250} cy={0} rx={18} ry={40} fill="none" stroke="#7A5233" strokeWidth={4} opacity={0.7} />
      <ellipse cx={-250} cy={0} rx={8} ry={20} fill="none" stroke="#7A5233" strokeWidth={4} opacity={0.7} />
      {/* orellanas (Pleurotus ostreatus) brotando del tronco */}
      <g transform="translate(70 -62)"><OysterCluster grow={grow} scale={1.15} /></g>
      <g transform="translate(-130 -48)"><OysterCluster grow={grow} scale={0.72} /></g>
    </g>
  );
}

// ---------- overlays ----------
function Subtitle({ children }) {
  const { localTime, duration } = useSprite();
  const i = clamp(localTime / 0.32, 0, 1);
  const o = clamp((duration - localTime) / 0.32, 0, 1);
  const op = Math.min(i, o);
  return (
    <div style={{ position: 'absolute', left: 54, right: 54, bottom: 560, opacity: op, transform: `translateY(${(1 - i) * 26}px)` }}>
      <div style={{ background: 'rgba(243,239,230,0.92)', border: `3px solid ${INK}`, borderRadius: 26, padding: '26px 34px', textAlign: 'center', boxShadow: '0 10px 0 rgba(26,23,18,0.14)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 58, lineHeight: 1.14, color: INK, letterSpacing: '-0.01em' }}>
        {children}
      </div>
    </div>
  );
}
const Hi = ({ children }) => (
  <span style={{ color: '#8a5b12', background: GOLDL, padding: '0 10px', borderRadius: 8, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{children}</span>
);

function Avatar({ src }) {
  const { localTime, duration } = useSprite();
  const i = clamp(localTime / 0.28, 0, 1);
  const o = clamp((duration - localTime) / 0.28, 0, 1);
  const op = Math.min(i, o);
  return (
    <img src={src} alt="" style={{ position: 'absolute', right: 34, top: 232, width: 292, height: 'auto', opacity: op, transform: `translateY(${(1 - i) * 26}px) scale(${0.94 + 0.06 * i})`, filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.22))', transformOrigin: 'bottom right' }} />
  );
}

function Tag({ x, y, text, tone = GOLD, strike = false }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', background: tone, color: INK, fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 34, padding: '8px 20px', borderRadius: 999, border: `3px solid ${INK}`, whiteSpace: 'nowrap', textDecoration: strike ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: strike ? '5px' : undefined }}>{text}</div>
  );
}

const Canvas = ({ children }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: 'absolute', inset: 0 }}>{children}</svg>
);

// growth wrappers (se escalan a la duración de su propia ventana)
function GrowSeta({ y = 940, bump = true }) {
  const { localTime, duration } = useSprite();
  const gd = Math.min(1.3, duration * 0.55);
  const g = Easing.easeOutBack(clamp(localTime / gd, 0, 1));
  return <g transform={`translate(540 ${y})`}><SetaGroup grow={g} bump={bump} /></g>;
}
function GrowTree() {
  const { localTime, duration } = useSprite();
  const gd = Math.min(1.4, duration * 0.55);
  const g = Easing.easeOutBack(clamp(localTime / gd, 0, 1)) * 1.05;
  return <g transform="translate(540 1220)"><TreeGroup grow={g} ringApple={localTime > duration * 0.5} /></g>;
}
function DigMycelium({ x = 540, y = 1010, spread = 460, depth = 360 }) {
  const { localTime, duration } = useSprite();
  const grow = clamp((localTime - 0.15) / (duration * 0.82), 0, 1);
  return <g transform={`translate(${x} ${y})`}><MyceliumGroup grow={grow} spread={spread} depth={depth} /></g>;
}
function GrowLog() {
  const { localTime, duration } = useSprite();
  const g = clamp((localTime - 0.12) / Math.min(2.0, duration * 0.7), 0, 1);
  return <g transform="translate(540 1138)"><LogGroup grow={g} /></g>;
}
function SporeSeta({ y = 960 }) {
  const { localTime, duration } = useSprite();
  const sp = clamp((localTime - 0.25) / (duration * 0.7), 0, 1);
  return <g transform={`translate(540 ${y})`}><SetaGroup grow={1} spore={sp} bump /></g>;
}

// pista de audio (voz) sincronizada a la línea de tiempo + mezclada al exportar
function AudioSync({ src }) {
  const { time, playing } = useTimeline();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (Math.abs(v.currentTime - time) > 0.18) { try { v.currentTime = time; } catch (e) {} }
  }, [time]);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (playing) { v.play().catch(() => {}); } else { v.pause(); }
  }, [playing]);
  return <video ref={ref} src={src} preload="auto" playsInline
    data-om-exportable-video-play-start="0" data-om-exportable-video-play-end="39.889"
    style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />;
}

// ================= SCENE =================
// Sincronizado a la voz (39.889 s). Cortes anclados a las pausas reales del audio
// (subs 1–3 confirmados: 2.43 / 4.22 / 5.48) y ritmo uniforme para el resto.
// s1 0–2.43 · s2 –4.22 · s3 –5.48 · s4 –9.54 · s5 –11.35 · s6 –13.80 · s7 –15.65
// s8 –18.10 · s9 –20.85 · s10 –23.62 · s11 –26.70 · s12 –30.05 · s13 –32.55
// s14 –37.75 · cierre –39.889
function ShotMicelio() {
  return (
    <Stage width={W} height={H} duration={DUR} background={CREAM}>
      <AudioSync src="assets/narracion.mp3" />

      {/* A · Hook — s1,s2 */}
      <Sprite start={0} end={4.52}><Layer fade={0.3}><Canvas><GrowSeta y={940} /></Canvas></Layer></Sprite>
      <Sprite start={0.7} end={4.22}><NameLabel common="Champiñón" sci="Agaricus bisporus" x={540} y={515} /></Sprite>
      <Sprite start={0} end={2.43}><Subtitle>Esto que crees que es un <Hi>hongo</Hi>…</Subtitle></Sprite>
      <Sprite start={2.43} end={4.22}><Subtitle>…es solo su <Hi>fruto</Hi> visible.</Subtitle></Sprite>
      <Sprite start={2.43} end={4.22}><Avatar src="assets/avatar_11_sorprendido.png" /></Sprite>

      {/* B · Manzano — s3,s4 */}
      <Sprite start={4.22} end={9.84}>
        <Layer fade={0.3}>
          <Canvas>
            <line x1={0} y1={1220} x2={W} y2={1220} stroke={INK} strokeWidth={5} strokeDasharray="18 14" opacity={0.5} />
            <GrowTree />
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={4.22} end={5.48}><Subtitle>Piensa en un <Hi>manzano</Hi>.</Subtitle></Sprite>
      <Sprite start={5.48} end={9.54}><Subtitle>El árbol entero es el ser vivo; la <Hi>manzana</Hi> es solo su fruto.</Subtitle></Sprite>
      <Sprite start={4.35} end={9.54}><Avatar src="assets/avatar_06_pensativo_menton.png" /></Sprite>

      {/* C · Puente — s5 */}
      <Sprite start={9.54} end={11.65}>
        <Layer fade={0.3}>
          <Canvas>
            <g transform="translate(300 940)"><g transform="scale(0.6)"><SetaGroup grow={1} bump /></g></g>
            <text x={540} y={870} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={140} fill={INK}>=</text>
            <g transform="translate(790 940)"><g transform="scale(0.55)"><TreeGroup grow={1} /></g></g>
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={9.54} end={11.35}><Subtitle>Con los <Hi>hongos</Hi> pasa exactamente igual.</Subtitle></Sprite>
      <Sprite start={9.54} end={11.35}><Avatar src="assets/avatar_02_apuntando_camara.png" /></Sprite>

      {/* D1 · Bajo tierra — s6 */}
      <Sprite start={11.35} end={14.10}>
        <Layer fade={0.3}>
          <Canvas>
            <rect x={0} y={1000} width={W} height={H - 1000} fill={SOIL} />
            <rect x={0} y={1000} width={W} height={18} fill={SOILL} />
            <g transform="translate(540 1000)"><SetaGroup grow={1} /></g>
            <DigMycelium x={540} y={1010} />
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={11.35} end={13.80}><Subtitle>El hongo de verdad vive escondido: <Hi>bajo tierra</Hi>…</Subtitle></Sprite>
      <Sprite start={11.35} end={13.80}><Avatar src="assets/avatar_04_bajando_lentes.png" /></Sprite>

      {/* D2 · Dentro de un tronco — s7 */}
      <Sprite start={13.80} end={15.95}>
        <Layer fade={0.3}>
          <Canvas>
            <line x1={0} y1={1200} x2={W} y2={1200} stroke={INK} strokeWidth={5} strokeDasharray="18 14" opacity={0.4} />
            <GrowLog />
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={13.80} end={15.65}><Subtitle>…o dentro de un <Hi>tronco caído</Hi>.</Subtitle></Sprite>
      <Sprite start={13.80} end={15.65}><Avatar src="assets/avatar_13_senalando_arriba.png" /></Sprite>
      <Sprite start={13.95} end={15.65}><NameLabel common="Seta de ostra" sci="Pleurotus ostreatus" x={430} y={775} /></Sprite>

      {/* D3 · Es el micelio — s8 */}
      <Sprite start={15.65} end={18.40}>
        <Layer fade={0.3}>
          <Canvas>
            <rect x={0} y={980} width={W} height={H - 980} fill={SOIL} />
            <rect x={0} y={980} width={W} height={18} fill={SOILL} />
            <DigMycelium x={540} y={1000} spread={520} depth={440} />
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={15.65} end={18.10}><Subtitle>Esa red de hilos vivos es el <Hi>micelio</Hi>.</Subtitle></Sprite>
      <Sprite start={15.65} end={18.10}><Avatar src="assets/avatar_02_apuntando_camara.png" /></Sprite>

      {/* E · Esporas = semillas — s9,s10 */}
      <Sprite start={18.10} end={23.92}><Layer fade={0.32}><Canvas><SporeSeta y={980} /></Canvas></Layer></Sprite>
      <Sprite start={18.10} end={20.85}><Subtitle>La seta brota solo para soltar <Hi>esporas</Hi> y reproducirse.</Subtitle></Sprite>
      <Sprite start={20.85} end={23.62}><Subtitle>Igual que la manzana lleva las <Hi>semillas</Hi> del árbol.</Subtitle></Sprite>
      <Sprite start={18.10} end={20.85}><Avatar src="assets/avatar_05_sonriendo.png" /></Sprite>
      <Sprite start={20.85} end={23.62}><Avatar src="assets/avatar_06_pensativo_menton.png" /></Sprite>

      {/* F · Conclusión — s11 */}
      <Sprite start={23.62} end={27.00}>
        <Layer fade={0.32}>
          <Canvas>
            <line x1={540} y1={560} x2={540} y2={1240} stroke={INK} strokeWidth={4} opacity={0.22} />
            <g transform="translate(300 1130)"><g transform="scale(0.58)"><SetaGroup grow={1} bump /></g></g>
            <g transform="translate(760 1035)"><g transform="scale(0.6)"><MyceliumGroup grow={1} spread={330} depth={300} /></g></g>
          </Canvas>
          <Tag x={300} y={1240} text="LA SETA = FRUTO" />
          <Tag x={790} y={1240} text="EL MICELIO = HONGO" />
        </Layer>
      </Sprite>
      <Sprite start={23.62} end={26.70}><Subtitle>La seta es el fruto. El <Hi>micelio</Hi> es el hongo.</Subtitle></Sprite>
      <Sprite start={23.62} end={26.70}><Avatar src="assets/avatar_13_senalando_arriba.png" /></Sprite>

      {/* G · Aclaración científica — s12,s13,s14 */}
      <Sprite start={26.70} end={38.05}>
        <Layer fade={0.32}>
          <Canvas>
            <g transform="translate(540 980)"><g transform="scale(0.82)"><SetaGroup grow={1} bump /></g></g>
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={27.0} end={37.75}><Layer fade={0.35}><Tag x={430} y={560} text="FRUTO" tone={CREAM} strike /></Layer></Sprite>
      <Sprite start={27.4} end={37.75}><Layer fade={0.35}><Tag x={680} y={640} text="cuerpo fructífero" /></Layer></Sprite>
      <Sprite start={26.70} end={30.05}><Subtitle>Ojo: en biología, la seta <Hi>no</Hi> es un fruto de verdad.</Subtitle></Sprite>
      <Sprite start={30.05} end={32.55}><Subtitle>Un fruto guarda <Hi>semillas</Hi>; la seta suelta esporas.</Subtitle></Sprite>
      <Sprite start={32.55} end={37.75}><Subtitle>La manera correcta de decirle es <Hi>cuerpo fructífero</Hi>. La analogía solo ayuda a entenderlo.</Subtitle></Sprite>
      <Sprite start={26.70} end={30.05}><Avatar src="assets/avatar_04_bajando_lentes.png" /></Sprite>
      <Sprite start={30.05} end={32.55}><Avatar src="assets/avatar_02_apuntando_camara.png" /></Sprite>
      <Sprite start={32.55} end={37.75}><Avatar src="assets/avatar_05_sonriendo.png" /></Sprite>

      {/* Cierre fijo — s15 */}
      <Sprite start={37.75} end={39.889}>
        <Layer fade={0.35}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ marginBottom: 26 }}><BrandLockup iso={300} /></div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 96, color: INK, textAlign: 'center', lineHeight: 1.16, letterSpacing: '0.01em' }}>ESTO FUE UN<br />SHOT <span style={{ color: GOLD }}>MICOLÓGICO</span></div>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 56, color: INK, marginTop: 26, background: GOLD, padding: '12px 44px', borderRadius: 999, border: `4px solid ${INK}` }}>Sígueme</div>
          </div>
        </Layer>
      </Sprite>

      {/* Marca de agua + badge (oculto en cierre) */}
      <Sprite start={0} end={37.75}>
        <div style={{ position: 'absolute', left: 44, top: 96, display: 'flex', alignItems: 'center', gap: 18 }}>
          <BrandLockup iso={150} />
          <div style={{ background: GOLD, border: `5px solid ${INK}`, borderRadius: 18, padding: '6px 22px', fontFamily: 'Anton, sans-serif', fontSize: 46, color: INK, lineHeight: 1 }}>#01</div>
        </div>
      </Sprite>
    </Stage>
  );
}

window.ShotMicelio = ShotMicelio;
