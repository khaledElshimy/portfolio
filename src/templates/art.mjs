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
  let tiles = '';
  for (let i = 0; i < 3; i++) {
    const x = 150 + i * 120;
    const y = 120 + i * 26;
    tiles += `<rect x="${x}" y="${y}" width="104" height="104" rx="20" fill="#16204a" stroke="#386bff" stroke-opacity=".5"/>
      <circle cx="${x + 52}" cy="${y + 52}" r="23" fill="none" stroke="#5b86ff" stroke-width="3"/>
      <circle cx="${x + 52}" cy="${y + 52}" r="8" fill="#386bff"/>`;
  }
  return frame(tiles, 'r');
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

const VARIANTS = { waveform, rewards, optimize, connect, network, merge };

export function abstractVisual(variant) {
  const fn = VARIANTS[variant] || connect;
  return fn();
}
