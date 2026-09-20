// Inline SVG icons. Stroke-based, currentColor, no icon font dependency.
const s = (d, extra = '') =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${d}</svg>`;

export const icons = {
  arrowRight: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: s('<path d="M7 17 17 7M8 7h9v9"/>'),
  arrowLeft: s('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
  download: s('<path d="M12 3v12M7 11l5 5 5-5M5 21h14"/>'),
  mail: s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  play: s('<path d="M7 4.5v15l13-7.5z"/>'),

  // stack strip
  unity: s('<path d="m12 3 7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z"/><path d="M12 12 4.5 7.5M12 12l7.5-4.5M12 12v9"/>'),
  unreal: s('<circle cx="12" cy="12" r="9"/><path d="M9.5 8.5v5.2c0 1.3 1 2.3 2.5 2.3s2.5-1 2.5-2.3V10"/>'),
  code: s('<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>'),
  mobile: s('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'),
  xr: s('<path d="M3 9.5h18v5a2 2 0 0 1-2 2h-3l-2-2h-4l-2 2H5a2 2 0 0 1-2-2v-5Z"/>'),

  // expertise
  sdk: s('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 9h8M8 12h8M8 15h4"/>'),
  realtime: s('<path d="M3 12h4l2.5-7 4 14L16 12h5"/>'),
  leadership: s('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><path d="M17 11a2.6 2.6 0 0 0 0-5"/><path d="M18 20c0-2-.6-3.5-1.7-4.6"/>'),
  teaching: s('<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M5 11.5V16c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.5"/>'),

  // beyond
  teach: s('<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M5 11.5V16c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.5"/>'),
  founder: s('<path d="M4 20h16"/><path d="M6 20V9l6-5 6 5v11"/><path d="M10 20v-5h4v5"/>'),
  product: s('<path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5Z"/><path d="M3 7l9 4.5L21 7M12 11.5V21"/>'),

  // socials
  linkedin: s('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-3.6c0-1.1.9-1.9 2-1.9s2 .8 2 1.9V17"/>'),
  github: s('<path d="M9 19c-4 1.4-4-2.1-6-2.6m12 4.6v-3.6a3 3 0 0 0-.9-2.4c2.9-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.6 0C6 1.1 4.9 1.4 4.9 1.4a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3.4 8.4c0 5.1 3.1 6.3 6 6.6a3 3 0 0 0-.9 2.3V21" transform="translate(0,1.2)"/>'),
  telegram: s('<path d="M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z"/><path d="m8 13 9-6"/>'),
};

export const icon = (name) => icons[name] || '';
