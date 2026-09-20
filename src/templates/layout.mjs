import { site } from '../data/site.js';
import { icon } from './icons.mjs';

export const esc = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// The site is served from the domain root, so every internal URL is
// root-absolute. That keeps home and /work/<slug>/ pages on one scheme.
function header(isHome) {
  const href = (h) => (isHome ? h : '/' + h);
  return `
<header class="header">
  <div class="wrap header-inner">
    <a class="logo" href="/" aria-label="${esc(site.name)} — home">${esc(site.initials)}<span class="dot">.</span></a>
    <nav class="nav" aria-label="Primary">
      <ul>${site.nav.map((n) => `<li><a href="${href(n.href)}">${esc(n.label)}</a></li>`).join('')}</ul>
    </nav>
    <p class="tagline-mark">Build<br>Brighter<br>Experiences.</p>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menu"><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-open="false">
  ${site.nav.map((n) => `<a href="${href(n.href)}">${esc(n.label)}</a>`).join('')}
  <a class="btn btn-primary" href="mailto:${esc(site.email)}">Let's talk ${icon('arrowRight')}</a>
</div>`;
}

function footer() {
  return `
<footer class="footer">
  <div class="wrap footer-inner">
    <div class="footer-id">
      <a class="logo" href="/">${esc(site.initials)}<span class="dot">.</span></a>
      <span class="sep" aria-hidden="true"></span>
      <span class="footer-meta">${esc(site.name)}</span>
      <span class="sep" aria-hidden="true"></span>
      <span class="footer-meta">${esc(site.title)}</span>
    </div>
    <div class="footer-right">
      <p class="footer-motto">Different experiences.<br>A brighter tomorrow.</p>
      <div class="footer-socials">
        ${site.socials
          .map(
            (s) =>
              `<a href="${esc(s.href)}" rel="me noopener" target="_blank" aria-label="${esc(s.label)}">${icon(s.icon)}</a>`
          )
          .join('')}
      </div>
    </div>
  </div>
</footer>`;
}

export function layout({ title, description, body, isHome = false, canonical = '' }) {
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.name)}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#101115">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;550;600;650;700;800&display=swap">
<link rel="stylesheet" href="/assets/css/main.css">
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(isHome)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}
