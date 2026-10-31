// ============================================================================
//  _PLANTILLA · Shots Micológicos — La Creación del Robert / Fungi Mati
//  Escena 9:16 (1080×1920) sobre animations.jsx (globals en window).
//
//  CÓMO USAR:
//   1) Copia esta carpeta y renómbrala "Shot NN <título>".
//   2) Edita SOLO el contenido de la sección ===== SCENE ===== (abajo).
//      Borra las escenas marcadas "BORRAR" e inventa las tuyas.
//   3) NO toques la ESENCIA: paleta, tipografía, Subtitle, Avatar, logo,
//      marca de agua, badge, ritmo de fundidos. Eso se mantiene idéntico.
//   4) Lee GUIA_SHOT.md antes de construir.
//
//  Cambia SIEMPRE: qué se ilustra, cuántas escenas, tiempos. No hay
//  "organismo protagonista" fijo — el hook lo decide el subtema.
// ============================================================================
const { Stage, Sprite, useSprite, useTimeline, Easing, clamp } = window;

// ---- Paleta (ESENCIA — no cambiar) ----
const CREAM = '#F3EFE6';   // fondo
const INK   = '#1A1712';   // trazo / texto
const GOLD  = '#E8A62A';   // acento dorado
const GOLDL = '#F4C25A';   // dorado claro (micelio, resaltado)
const SOIL  = '#2E241B';   // tierra
const SOILL = '#4A3A2A';
const LEAF  = '#6E8A3C';   // follaje
const LEAFD = '#57712F';
const TRUNK = '#7A5233';   // madera
const WOOD  = '#9C6C3F';
const CAPC  = '#E9DEC8';   // sombrero champiñón
const STEM  = '#F1EADB';   // tronco del champiñón
const APPLE = '#C0392B';
const RED   = '#C43B2B';

const W = 1080, H = 1920;
// DUR: pon aquí la duración EXACTA de tu narración (en segundos). Ver GUIA_SHOT.md.
const DUR = 40;

const rnd = (i) => { const s = Math.sin(i * 91.37) * 43758.5453; return s - Math.floor(s); };

// ====================== KIT REUTILIZABLE (no cambiar) =======================

// fade + slide de entrada/salida
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

// logo isotipo — celda de ADN en dorado (biología = micología)
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
      <g transform="translate(0,-95.3)" stroke="#0a0a0a" strokeWidth={3.4} fill="#0a0a0a">
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" transform="rotate(120)" />
        <circle cx="16.4" cy="4.0" r="2.6" />
        <circle cx="-11.5" cy="-15.1" r="2.6" />
        <circle cx="4.2" cy="6.5" r="2.6" />
        <circle cx="0" cy="0" r="4.5" />
      </g>
      <g transform="translate(-82.5,-47.6)" stroke="#0a0a0a" strokeWidth={3.4} fill="none">
        <path d="M -5,-24 L 5,-24 L 5,-4 L 19,17 Q 22,24 15,24 L -15,24 Q -22,24 -19,17 L -5,-4 Z" />
        <path d="M -8,10 L 8,10" />
      </g>
      <g transform="translate(-82.5,47.6) rotate(28)" stroke="#0a0a0a" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M 0.0,-34.0 L 5.0,-31.2 L 9.2,-28.3 L 12.0,-25.5 L 13.0,-22.7 L 12.0,-19.8 L 9.2,-17.0 L 5.0,-14.2 L 0.0,-11.3 L -5.0,-8.5 L -9.2,-5.7 L -12.0,-2.8 L -13.0,0.0 L -12.0,2.8 L -9.2,5.7 L -5.0,8.5 L 0.0,11.3 L 5.0,14.2 L 9.2,17.0 L 12.0,19.8 L 13.0,22.7 L 12.0,25.5 L 9.2,28.3 L 5.0,31.2 L 0.0,34.0" />
        <path d="M 0.0,-34.0 L -5.0,-31.2 L -9.2,-28.3 L -12.0,-25.5 L -13.0,-22.7 L -12.0,-19.8 L -9.2,-17.0 L -5.0,-14.2 L 0.0,-11.3 L 5.0,-8.5 L 9.2,-5.7 L 12.0,-2.8 L 13.0,0.0 L 12.0,2.8 L 9.2,5.7 L 5.0,8.5 L 0.0,11.3 L -5.0,14.2 L -9.2,17.0 L -12.0,19.8 L -13.0,22.7 L -12.0,25.5 L -9.2,28.3 L -5.0,31.2 L 0.0,34.0" />
        <path d="M 13.0,-22.7 L -13.0,-22.7 M -13.0,0.0 L 13.0,0.0 M 13.0,22.7 L -13.0,22.7" />
      </g>
      <g transform="translate(0,95.3)" fill="#0a0a0a">
        <path d="M 17.0,-3.0 L 3.2,0.2 L 0.0,14.0 L -3.2,0.2 L -17.0,-3.0 L -3.2,-6.2 L -0.0,-20.0 L 3.2,-6.2 Z" />
        <path d="M 20.0,15.0 L 14.4,16.4 L 13.0,22.0 L 11.6,16.4 L 6.0,15.0 L 11.6,13.6 L 13.0,8.0 L 14.4,13.6 Z" />
      </g>
    </svg>
  );
}

// marca complementaria: hongo (identifica la serie micológica)
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

// etiqueta de nombre común + científico (científico en itálica)
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

// subtítulo quemado (zona segura: bottom 560; NUNCA más abajo — lo tapa la UI de redes)
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
// palabra clave resaltada en dorado dentro del subtítulo
const Hi = ({ children }) => (
  <span style={{ color: '#8a5b12', background: GOLDL, padding: '0 10px', borderRadius: 8, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{children}</span>
);

// avatar del narrador (reacción). Va en zona libre, NUNCA sobre información.
// Prohibidas poses 01 y 09 (lengua afuera) salvo tema de sabor/gusto.
function Avatar({ src }) {
  const { localTime, duration } = useSprite();
  const i = clamp(localTime / 0.28, 0, 1);
  const o = clamp((duration - localTime) / 0.28, 0, 1);
  const op = Math.min(i, o);
  return (
    <img src={src} alt="" style={{ position: 'absolute', right: 34, top: 232, width: 292, height: 'auto', opacity: op, transform: `translateY(${(1 - i) * 26}px) scale(${0.94 + 0.06 * i})`, filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.22))', transformOrigin: 'bottom right' }} />
  );
}

// píldora-etiqueta (se puede tachar con strike)
function Tag({ x, y, text, tone = GOLD, strike = false }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', background: tone, color: INK, fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 34, padding: '8px 20px', borderRadius: 999, border: `3px solid ${INK}`, whiteSpace: 'nowrap', textDecoration: strike ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: strike ? '5px' : undefined }}>{text}</div>
  );
}

// lienzo SVG a pantalla completa
const Canvas = ({ children }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: 'absolute', inset: 0 }}>{children}</svg>
);

// pista de voz sincronizada a la línea de tiempo (se mezcla al exportar video).
// Pon la MISMA duración que DUR en data-...-play-end.
function AudioSync({ src, end = DUR }) {
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
    data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(end)}
    style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />;
}

// ============= ILUSTRACIONES DE EJEMPLO (BORRAR — invéntalas por episodio) ====
// Estas son las del Shot 01. En un shot nuevo, dibuja las TUYAS con el mismo
// lenguaje: trazo INK grueso, relleno plano, acento GOLD, crecimiento animado.

function SetaGroup({ grow = 1, spore = 0, bump = false }) {
  return (
    <g transform={`scale(1 ${grow})`}>
      {bump && <ellipse cx={0} cy={2} rx={58} ry={15} fill={SOILL} opacity={0.5} />}
      <path d="M-30 -4 C-40 -80 -30 -122 0 -124 C30 -122 40 -80 30 -4 C14 5 -14 5 -30 -4 Z" fill={STEM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M-30 -70 C-14 -62 14 -62 30 -70" fill="none" stroke={INK} strokeWidth={4} opacity={0.5} />
      <path d="M-132 -118 C-126 -210 -66 -250 0 -250 C66 -250 126 -210 132 -118 C88 -100 44 -96 0 -96 C-44 -96 -88 -100 -132 -118 Z" fill={CAPC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M-118 -116 C-60 -104 60 -104 118 -116" fill="none" stroke="#B9A277" strokeWidth={5} opacity={0.7} />
      <path d="M-96 -168 C-72 -196 -30 -210 4 -206" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.35} />
      {spore > 0 && [0, 1, 2, 3, 4, 5, 6].map((k) => {
        const p = clamp(spore * 1.3 - k * 0.1, 0, 1);
        const sx = -96 + k * 32 + Math.sin(k * 2 + spore * 6) * 9;
        return <circle key={k} cx={sx} cy={-92 + p * 230} r={7} fill={GOLD} opacity={p > 0 ? (1 - p) * 0.85 + 0.12 : 0} />;
      })}
    </g>
  );
}

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
      <rect x={-250} y={-62} width={500} height={124} rx={62} fill={TRUNK} stroke={INK} strokeWidth={6} />
      <path d="M-190 -30 C-60 -44 120 -44 210 -22" fill="none" stroke="#5F3F27" strokeWidth={5} opacity={0.6} />
      <path d="M-200 22 C-60 36 120 34 200 20" fill="none" stroke="#5F3F27" strokeWidth={5} opacity={0.5} />
      <clipPath id="logclip"><rect x={-250} y={-62} width={500} height={124} rx={62} /></clipPath>
      <g clipPath="url(#logclip)">
        {threads.map(({ ex, ey, cx, cy, i }) => {
          const local = clamp(grow * 1.3 - (i % 4) * 0.08, 0, 1);
          return <path key={i} d={`M-30 0 Q ${cx} ${cy} ${ex} ${ey}`} fill="none" stroke={GOLDL} strokeWidth={3.4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} opacity={0.9} />;
        })}
      </g>
      <ellipse cx={-250} cy={0} rx={30} ry={62} fill={WOOD} stroke={INK} strokeWidth={6} />
      <ellipse cx={-250} cy={0} rx={18} ry={40} fill="none" stroke="#7A5233" strokeWidth={4} opacity={0.7} />
      <ellipse cx={-250} cy={0} rx={8} ry={20} fill="none" stroke="#7A5233" strokeWidth={4} opacity={0.7} />
      <g transform="translate(70 -62)"><OysterCluster grow={grow} scale={1.15} /></g>
      <g transform="translate(-130 -48)"><OysterCluster grow={grow} scale={0.72} /></g>
    </g>
  );
}

// growth wrappers — se escalan a la duración de su propia ventana (Sprite)
function GrowSeta({ y = 940, bump = true }) {
  const { localTime, duration } = useSprite();
  const gd = Math.min(1.3, duration * 0.55);
  const g = Easing.easeOutBack(clamp(localTime / gd, 0, 1));
  return <g transform={`translate(540 ${y})`}><SetaGroup grow={g} bump={bump} /></g>;
}
function SporeSeta({ y = 960 }) {
  const { localTime, duration } = useSprite();
  const sp = clamp((localTime - 0.25) / (duration * 0.7), 0, 1);
  return <g transform={`translate(540 ${y})`}><SetaGroup grow={1} spore={sp} bump /></g>;
}
function DigMycelium({ x = 540, y = 1010, spread = 460, depth = 360 }) {
  const { localTime, duration } = useSprite();
  const grow = clamp((localTime - 0.15) / (duration * 0.82), 0, 1);
  return <g transform={`translate(${x} ${y})`}><MyceliumGroup grow={grow} spread={spread} depth={depth} /></g>;
}

// ============================== SCENE =======================================
// Reemplaza TODO lo de abajo por tus escenas. Regla de oro del ritmo:
//   · cada Subtítulo entra JUNTO con su plano y dura lo que su clip de voz.
//   · cortes con fundido (~0.3–0.5 s), nada estático > 4 s, nada vive < 1.2 s.
//   · el plano saliente se desvanece antes de que entre el nuevo en su lugar.
// Los tiempos van pegados (audio corrido, sin silencios): cada Sprite empieza
// donde termina el anterior. Ancla los cortes a las pausas reales de tu voz.
function ShotPlantilla() {
  return (
    <Stage width={W} height={H} duration={DUR} background={CREAM}>
      {/* Descomenta cuando tengas tu narración lista y su duración = DUR:
      <AudioSync src="assets/narracion.mp3" /> */}

      {/* ---------- ESCENA EJEMPLO 1 · BORRAR ---------- */}
      <Sprite start={0} end={4.5}><Layer fade={0.3}><Canvas><GrowSeta y={940} /></Canvas></Layer></Sprite>
      <Sprite start={0.7} end={4.2}><NameLabel common="Champiñón" sci="Agaricus bisporus" x={540} y={515} /></Sprite>
      <Sprite start={0} end={2.4}><Subtitle>Esto que crees que es un <Hi>hongo</Hi>…</Subtitle></Sprite>
      <Sprite start={2.4} end={4.2}><Subtitle>…es solo su <Hi>fruto</Hi> visible.</Subtitle></Sprite>
      <Sprite start={2.4} end={4.2}><Avatar src="../assets/stickers/avatar_11_sorprendido.png" /></Sprite>

      {/* ---------- ESCENA EJEMPLO 2 · BORRAR ---------- */}
      <Sprite start={4.5} end={9.5}>
        <Layer fade={0.3}>
          <Canvas>
            <rect x={0} y={1000} width={W} height={H - 1000} fill={SOIL} />
            <rect x={0} y={1000} width={W} height={18} fill={SOILL} />
            <g transform="translate(540 1000)"><SetaGroup grow={1} /></g>
            <DigMycelium x={540} y={1010} />
          </Canvas>
        </Layer>
      </Sprite>
      <Sprite start={4.6} end={9.5}><Subtitle>El verdadero hongo es el <Hi>micelio</Hi>, bajo tierra.</Subtitle></Sprite>
      <Sprite start={4.6} end={9.5}><Avatar src="../assets/stickers/avatar_04_bajando_lentes.png" /></Sprite>

      {/* ---------- CIERRE FIJO (ESENCIA — mantener texto y layout) ---------- */}
      {/* Ajusta 'end' del cierre y de la marca de agua a tu DUR. */}
      <Sprite start={9.5} end={DUR}>
        <Layer fade={0.35}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ marginBottom: 26 }}><BrandLockup iso={300} /></div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 96, color: INK, textAlign: 'center', lineHeight: 1.16, letterSpacing: '0.01em' }}>ESTO FUE UN<br />SHOT <span style={{ color: GOLD }}>MICOLÓGICO</span></div>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 56, color: INK, marginTop: 26, background: GOLD, padding: '12px 44px', borderRadius: 999, border: `4px solid ${INK}` }}>Sígueme</div>
          </div>
        </Layer>
      </Sprite>

      {/* ---------- MARCA DE AGUA + BADGE (ESENCIA — cambia SOLO el #NN) ---------- */}
      <Sprite start={0} end={9.5}>
        <div style={{ position: 'absolute', left: 44, top: 96, display: 'flex', alignItems: 'center', gap: 18 }}>
          <BrandLockup iso={150} />
          <div style={{ background: GOLD, border: `5px solid ${INK}`, borderRadius: 18, padding: '6px 22px', fontFamily: 'Anton, sans-serif', fontSize: 46, color: INK, lineHeight: 1 }}>#NN</div>
        </div>
      </Sprite>
    </Stage>
  );
}

window.ShotPlantilla = ShotPlantilla;
