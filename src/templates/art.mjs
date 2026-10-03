// Generated SVG artwork. No binary assets, no external libraries.

const r1 = (n) => Math.round(n * 10) / 10;

/**
 * Torus-knot hero sculpture.
 * Samples the curve in 3D, then paints short segments back-to-front so the
 * strands genuinely pass over and under each other. Width and brightness are
 * driven by depth, which is what sells it as a solid object.
 */
export function torusKnot({ p = 2, q = 3, size = 520, steps = 520 } = {}) {
  const R = 118;          // major radius
  const r = 52;           // minor radius
  const cx = size / 2;
  const cy = size / 2;
  const tilt = -0.42;     // x-axis tilt, radians
  const yaw = 0.55;

  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rad = R + r * Math.cos(q * t);
    let x = rad * Math.cos(p * t);
    let y = rad * Math.sin(p * t);
    let z = r * Math.sin(q * t);

    // yaw around Y, then tilt around X
    const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
    const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);

    // weak perspective
    const k = 420 / (420 + z2);
    pts.push({ x: cx + x1 * k, y: cy + y1 * k, z: z2 });
  }

  const zs = pts.map((pt) => pt.z);
  const zMin = Math.min(...zs);
  const zMax = Math.max(...zs);
  const norm = (z) => (z - zMin) / (zMax - zMin || 1);

  // Build segments, then sort far -> near.
  const segs = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    segs.push({ a, b, d: norm((a.z + b.z) / 2) });
  }
  segs.sort((s1, s2) => s1.d - s2.d);

  const body = segs
    .map((s) => {
      const w = r1(9 + s.d * 15);           // nearer = thicker
      const light = s.d;                     // 0 far, 1 near
      const col =
        light > 0.72 ? '#8fb0ff' : light > 0.5 ? '#4f7cff' : light > 0.28 ? '#2f56cc' : '#1c3282';
      const op = r1(0.5 + light * 0.5);
      return `<line x1="${r1(s.a.x)}" y1="${r1(s.a.y)}" x2="${r1(s.b.x)}" y2="${r1(s.b.y)}" stroke="${col}" stroke-width="${w}" stroke-opacity="${op}"/>`;
    })
    .join('');

  // A soft outer glow drawn from the same curve, heavily blurred.
  const glowPath =
    'M' + pts.filter((_, i) => i % 6 === 0).map((pt) => `${r1(pt.x)},${r1(pt.y)}`).join('L');

  return `
<svg viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="knot-title" focusable="false">
  <title id="knot-title">Abstract blue sculptural knot</title>
  <defs>
    <filter id="knot-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <radialGradient id="knot-halo" cx="50%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#386bff" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#386bff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${size * 0.46}" fill="url(#knot-halo)"/>
  <g class="knot-tilt">
    <g class="knot-spin">
      <path d="${glowPath}Z" fill="none" stroke="#386bff" stroke-width="30" stroke-opacity=".5" filter="url(#knot-glow)"/>
      <g stroke-linecap="round">${body}</g>
    </g>
  </g>
</svg>`.trim();
}

/* ------------------------------------------------------------------------ */
/* Abstract card visuals. These stand in for projects with no real capture.  */
/* They are always labelled "Illustrative" in the UI so they cannot be       */
/* mistaken for a screenshot.                                                */
/* ------------------------------------------------------------------------ */

const frame = (inner, extra = '') => `
<svg viewBox="0 0 640 400" role="img" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="ag${extra}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171b26"/>
      <stop offset="100%" stop-color="#0e1016"/>
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="url(#ag${extra})"/>
  ${inner}
</svg>`.trim();

function waveform() {
  let bars = '';
  for (let i = 0; i < 46; i++) {
    const x = 58 + i * 11;
    const seed = Math.sin(i * 1.7) * Math.cos(i * 0.6);
    const h = 26 + Math.abs(seed) * 120;
    const o = 0.3 + Math.abs(seed) * 0.7;
    bars += `<rect x="${x}" y="${r1(200 - h / 2)}" width="5" height="${r1(h)}" rx="2.5" fill="#386bff" fill-opacity="${r1(o)}"/>`;
  }
  return frame(
    `${bars}<line x1="40" y1="200" x2="600" y2="200" stroke="#386bff" stroke-opacity=".25" stroke-width="1"/>`,
    'w'
  );
}

function rewards() {
  // An offerwall as the SDK actually renders it: a WebView inside a phone frame,
  // with a reward balance, offer rows and a daily-reward strip.
  let rows = '';
  const offers = [
    ['Play 5 minutes', '+120'],
    ['Reach level 3', '+450'],
    ['Daily check-in', '+60'],
    ['Complete tutorial', '+200'],
  ];
  offers.forEach(([label, amt], i) => {
    const y = 150 + i * 46;
    rows += `<rect x="252" y="${y}" width="136" height="38" rx="7" fill="#101729" stroke="#2b3a63"/>
      <circle cx="271" cy="${y + 19}" r="9" fill="#1b2a52" stroke="#5b86ff" stroke-width="1.5"/>
      <rect x="288" y="${y + 11}" width="56" height="6" rx="3" fill="#39467a"/>
      <rect x="288" y="${y + 21}" width="34" height="5" rx="2.5" fill="#2b3558"/>
      <rect x="352" y="${y + 13}" width="28" height="13" rx="6.5" fill="#386bff" fill-opacity=".9"/>`;
  });
  return frame(
    `<rect x="238" y="54" width="164" height="300" rx="20" fill="#0a0e1a" stroke="#2b3a63" stroke-width="2"/>
     <rect x="252" y="72" width="136" height="60" rx="9" fill="#16204a" stroke="#386bff" stroke-opacity=".6"/>
     <circle cx="276" cy="102" r="13" fill="none" stroke="#5b86ff" stroke-width="2.5"/>
     <circle cx="276" cy="102" r="4.5" fill="#5b86ff"/>
     <rect x="298" y="92" width="52" height="8" rx="4" fill="#5b86ff" fill-opacity=".85"/>
     <rect x="298" y="106" width="34" height="6" rx="3" fill="#39467a"/>
     ${rows}
     <text x="440" y="100" fill="#7c8496" font-family="IBM Plex Mono,monospace" font-size="12">WebView</text>
     <text x="440" y="124" fill="#7c8496" font-family="IBM Plex Mono,monospace" font-size="12">Playtime rewards</text>
     <text x="440" y="148" fill="#7c8496" font-family="IBM Plex Mono,monospace" font-size="12">Achievements</text>
     <text x="440" y="172" fill="#7c8496" font-family="IBM Plex Mono,monospace" font-size="12">Daily rewards</text>
     <text x="440" y="196" fill="#7c8496" font-family="IBM Plex Mono,monospace" font-size="12">Locale management</text>
     <line x1="428" y1="84" x2="428" y2="204" stroke="#2b3a63"/>`,
    'r'
  );
}

function optimize() {
  // A frame-time graph settling into budget.
  let d = 'M40,300';
  for (let i = 0; i <= 56; i++) {
    const x = 40 + i * 10;
    const decay = Math.exp(-i / 14);
    const y = 190 + Math.sin(i * 1.3) * 78 * decay + decay * 46;
    d += `L${r1(x)},${r1(y)}`;
  }
  return frame(
    `<line x1="40" y1="196" x2="600" y2="196" stroke="#386bff" stroke-opacity=".35" stroke-dasharray="6 7" stroke-width="2"/>
     <path d="${d}" fill="none" stroke="#5b86ff" stroke-width="3" stroke-linejoin="round"/>
     <text x="40" y="184" fill="#7c8496" font-family="Inter,sans-serif" font-size="13">budget</text>`,
    'o'
  );
}

function connect() {
  let spokes = '';
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const x = 320 + Math.cos(ang) * 150;
    const y = 200 + Math.sin(ang) * 118;
    spokes += `<line x1="320" y1="200" x2="${r1(x)}" y2="${r1(y)}" stroke="#386bff" stroke-opacity=".38" stroke-width="2"/>
      <rect x="${r1(x - 30)}" y="${r1(y - 20)}" width="60" height="40" rx="9" fill="#141a2e" stroke="#386bff" stroke-opacity=".55"/>`;
  }
  return frame(
    `${spokes}<circle cx="320" cy="200" r="42" fill="#16204a" stroke="#5b86ff" stroke-width="2"/>`,
    'c'
  );
}

function network() {
  const nodes = [[150,120],[300,90],[470,140],[220,250],[390,270],[520,230]];
  let edges = '';
  nodes.forEach(([x1, y1], i) => {
    nodes.slice(i + 1).forEach(([x2, y2]) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      if (dist < 210) edges += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#386bff" stroke-opacity=".3" stroke-width="1.5"/>`;
    });
  });
  const dots = nodes
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 2 ? 11 : 16}" fill="#16204a" stroke="#5b86ff" stroke-width="2"/>`)
    .join('');
  return frame(edges + dots, 'n');
}

function merge() {
  return frame(
    `<rect x="150" y="150" width="90" height="90" rx="16" fill="#141a2e" stroke="#386bff" stroke-opacity=".5"/>
     <rect x="275" y="150" width="90" height="90" rx="16" fill="#141a2e" stroke="#386bff" stroke-opacity=".5"/>
     <rect x="410" y="132" width="126" height="126" rx="22" fill="#16204a" stroke="#5b86ff" stroke-width="2"/>
     <path d="M250,195 L265,195 M370,195 L398,195" stroke="#5b86ff" stroke-width="3" stroke-linecap="round"/>
     <path d="M392,188 l8,7 -8,7" fill="none" stroke="#5b86ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    'm'
  );
}


function crane() {
  // Gantry + load schematic — an operator-training control picture.
  return frame(
    `<line x1="90" y1="300" x2="90" y2="110" stroke="#386bff" stroke-opacity=".55" stroke-width="4"/>
     <line x1="550" y1="300" x2="550" y2="110" stroke="#386bff" stroke-opacity=".55" stroke-width="4"/>
     <line x1="70" y1="110" x2="570" y2="110" stroke="#5b86ff" stroke-width="5"/>
     <rect x="300" y="96" width="70" height="30" rx="6" fill="#16204a" stroke="#5b86ff" stroke-width="2"/>
     <line x1="335" y1="126" x2="335" y2="226" stroke="#5b86ff" stroke-width="2" stroke-dasharray="7 6"/>
     <rect x="291" y="226" width="88" height="62" rx="8" fill="#141a2e" stroke="#386bff" stroke-opacity=".7" stroke-width="2"/>
     <line x1="60" y1="318" x2="580" y2="318" stroke="#386bff" stroke-opacity=".3" stroke-width="2"/>`,
    'cr'
  );
}

function shield() {
  // Security-awareness training.
  return frame(
    `<path d="M320 108 L420 146 V214 c0 56 -43 94 -100 112 c-57 -18 -100 -56 -100 -112 V146 Z"
       fill="#141a2e" stroke="#5b86ff" stroke-width="2.5"/>
     <path d="M284 206 l26 26 l52 -54" fill="none" stroke="#386bff" stroke-width="5"
       stroke-linecap="round" stroke-linejoin="round"/>`,
    'sh'
  );
}

function payments() {
  // A game reaching a regional payment network: one integration on the left,
  // many local payment rails on the right.
  const rails = ['e-wallet', 'carrier', 'cash', 'card', 'bank', 'voucher'];
  let tiles = '';
  rails.forEach((label, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 404 + col * 118, y = 118 + row * 70;
    tiles += `<rect x="${x}" y="${y}" width="104" height="54" rx="9" fill="#141a2e" stroke="#386bff" stroke-opacity=".5"/>
      <rect x="${x + 14}" y="${y + 16}" width="34" height="7" rx="3.5" fill="#5b86ff" fill-opacity=".75"/>
      <rect x="${x + 14}" y="${y + 30}" width="58" height="6" rx="3" fill="#2b3558"/>
      <text x="${x + 14}" y="${y + 48}" fill="#6b7490" font-family="IBM Plex Mono,monospace" font-size="9">${label}</text>`;
  });
  return frame(
    `<rect x="92" y="150" width="116" height="200" rx="18" fill="#0f1422" stroke="#2b3a63" stroke-width="2"/>
     <rect x="106" y="168" width="88" height="10" rx="5" fill="#39467a"/>
     <rect x="106" y="188" width="60" height="7" rx="3.5" fill="#2b3558"/>
     <rect x="106" y="300" width="88" height="28" rx="8" fill="#386bff" fill-opacity=".9"/>
     <text x="150" y="318" fill="#eaf0ff" font-family="Inter,sans-serif" font-size="11" text-anchor="middle">Buy</text>
     <circle cx="312" cy="250" r="40" fill="#16204a" stroke="#5b86ff" stroke-width="2"/>
     <text x="312" y="246" fill="#9fb6ff" font-family="IBM Plex Mono,monospace" font-size="10" text-anchor="middle">one</text>
     <text x="312" y="260" fill="#9fb6ff" font-family="IBM Plex Mono,monospace" font-size="10" text-anchor="middle">API</text>
     <line x1="208" y1="250" x2="272" y2="250" stroke="#386bff" stroke-opacity=".6" stroke-width="2"/>
     <path d="M352,250 C378,250 378,145 404,145" fill="none" stroke="#386bff" stroke-opacity=".35" stroke-width="1.6"/>
     <path d="M352,250 C378,250 378,215 404,215" fill="none" stroke="#386bff" stroke-opacity=".35" stroke-width="1.6"/>
     <path d="M352,250 C378,250 378,285 404,285" fill="none" stroke="#386bff" stroke-opacity=".35" stroke-width="1.6"/>
     ${tiles}`,
    'pay'
  );
}

const VARIANTS = { waveform, rewards, optimize, connect, network, merge, crane, shield, payments };

export function abstractVisual(variant) {
  const fn = VARIANTS[variant] || connect;
  return fn();
}
