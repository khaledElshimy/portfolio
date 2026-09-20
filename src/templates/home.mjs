import { site, categories } from '../data/site.js';
import { projects } from '../data/projects.js';
import { expertise } from '../data/expertise.js';
import { experience, beyond, education } from '../data/experience.js';
import { icon } from './icons.mjs';
import { torusKnot, abstractVisual } from './art.mjs';
import { layout, esc } from './layout.mjs';

const STACK_ICONS = { Unity: 'unity', 'Unreal Engine': 'unreal', 'Native SDKs': 'code', Mobile: 'mobile', XR: 'xr' };

function cardMedia(p) {
  const m = p.media;
  if (m.kind === 'video' || m.kind === 'still') {
    return `<img src="${esc(m.poster)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="675">`;
  }
  if (m.kind === 'screens') {
    return `<img src="${esc(m.card || m.screens[1].src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="675">`;
  }
  return `<div class="abstract" role="img" aria-label="${esc(m.alt)}">${abstractVisual(m.variant)}</div>`;
}

function card(p) {
  const illustrative = p.media.kind === 'abstract';
  return `
<article class="card reveal" data-categories="${esc(p.categories.join(' '))}">
  <div class="card-media">
    ${cardMedia(p)}
    <div class="card-overlay">
      <h3><a class="card-link" href="/work/${esc(p.slug)}/">${esc(p.name)}</a></h3>
      <p>${esc(p.tagline)}</p>
    </div>
    ${illustrative ? '<span class="card-tag">Illustrative visual</span>' : ''}
    <span class="card-arrow" aria-hidden="true">${icon('arrowRight')}</span>
  </div>
  <div class="card-body">
    <p class="card-role"><b>${esc(p.role)}</b>${p.org ? ` · ${esc(p.org)}` : ''}</p>
    <ul class="card-tech">${p.tech.slice(0, 4).map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
  </div>
</article>`;
}

function heroSection() {
  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-name reveal">${esc(site.name)}</p>
        <h1 id="hero-title" class="reveal">
          ${site.headline
            .map((l, i) => `<span class="line">${esc(l.replace(/\.$/, ''))}<span class="dot">.</span></span>`)
            .join('')}
        </h1>
        <p class="hero-role reveal">${esc(site.positioning)}</p>
        <p class="hero-sub reveal">${esc(site.supporting)}</p>
        <div class="hero-actions reveal">
          <a class="btn btn-primary" href="#work">Explore my work ${icon('arrowRight')}</a>
          <a class="btn btn-ghost" href="#contact">Let's talk</a>
        </div>
      </div>
      <div class="hero-art" data-paused="false">
        ${torusKnot()}
        <p class="hero-art-note">Real<br>ideas<br>bolder<br>worlds</p>
      </div>
    </div>
  </div>
  <div class="stack">
    <div class="wrap">
      <ul>
        ${site.stack.map((s) => `<li>${icon(STACK_ICONS[s] || 'code')}<span>${esc(s)}</span></li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
}

function workSection() {
  return `
<section class="section" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="work-head">
      <h2 id="work-title" class="reveal">Selected work</h2>
      <div class="filters" data-filters role="group" aria-label="Filter projects by category">
        ${categories
          .map(
            (c) =>
              `<button class="filter" type="button" data-filter="${esc(c.id)}" aria-pressed="${c.id === 'all'}">${esc(c.label)}</button>`
          )
          .join('')}
      </div>
    </div>
    <div class="cards" data-cards>${projects.map(card).join('')}</div>
    <p class="no-results" data-empty hidden>No projects in this category.</p>
    <div class="work-foot">
      <button class="btn btn-ghost" type="button" data-more aria-expanded="false">View all projects</button>
      <span class="work-count" data-count aria-live="polite"></span>
    </div>
    <p class="work-note">Cards marked “Illustrative visual” use generated graphics, not screenshots — the SDK work is under NDA-style client ownership and has no public capture.</p>
  </div>
</section>`;
}

function expertiseSection() {
  return `
<hr class="rule">
<section class="section" id="expertise" aria-labelledby="expertise-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="expertise-title" class="reveal">Engineering, with a wider perspective<span class="dot">.</span></h2>
    </div>
    <div class="exp-grid">
      ${expertise
        .map(
          (e) => `
      <div class="exp-item reveal">
        <div class="exp-icon">${icon(e.icon)}</div>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.body)}</p>
        <ul>${e.items.map((i) => `<li class="chip">${esc(i)}</li>`).join('')}</ul>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function experienceSection() {
  return `
<hr class="rule">
<section class="section" id="experience" aria-labelledby="experience-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="experience-title" class="reveal">Experience that connects the dots<span class="dot">.</span></h2>
    </div>
    <div class="xp-layout">
      <div class="timeline">
        ${experience
          .map(
            (x) => `
        <article class="xp reveal">
          <div>
            <h3 class="xp-company">${esc(x.company)}${x.current ? '<span class="xp-now">Now</span>' : ''}</h3>
            <p class="xp-role">${esc(x.role)}</p>
          </div>
          <p class="xp-dates">${esc(x.start)} – ${esc(x.end)}</p>
          <p class="xp-summary">${esc(x.summary)}</p>
          <ul class="xp-points">${x.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>
        </article>`
          )
          .join('')}
      </div>
      <aside class="beyond reveal">
        <h3>Beyond the code<span class="dot" style="color:var(--blue)">.</span></h3>
        ${beyond
          .map(
            (b) => `
        <div class="beyond-item">
          ${icon(b.icon)}
          <div>
            <h4>${esc(b.title)}</h4>
            <p>${esc(b.body)}</p>
          </div>
        </div>`
          )
          .join('')}
        <div class="edu">
          <h4>Education</h4>
          <ul>${education.map((e) => `<li><b>${esc(e.title)}</b>${esc(e.org)}</li>`).join('')}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

function contactSection() {
  return `
<hr class="rule">
<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="wrap">
    <div class="contact-inner">
      <div class="reveal">
        <h2 id="contact-title">Have something worth building<span class="dot">?</span></h2>
        <p>Ideas, collaborations or just a good technical conversation — I'd love to hear from you.</p>
        <div class="socials">
          ${site.socials
            .map(
              (s) =>
                `<a class="social" href="${esc(s.href)}" rel="me noopener" target="_blank">${icon(s.icon)}${esc(s.label)}</a>`
            )
            .join('')}
        </div>
      </div>
      <div class="contact-actions reveal">
        <a class="btn btn-primary" href="mailto:${esc(site.email)}">${icon('mail')} Let's talk</a>
        ${
          // A sandboxed host (e.g. an artifact preview) blocks download links,
          // so there the résumé opens in a new tab instead of saving.
          process.env.PORTABLE === '1'
            ? `<a class="btn btn-ghost" href="${esc(site.resume)}" target="_blank" rel="noopener">${icon('arrowUpRight')} Résumé</a>`
            : `<a class="btn btn-ghost" href="${esc(site.resume)}" download>${icon('download')} Résumé</a>`
        }
      </div>
    </div>
  </div>
</section>`;
}

export function homePage() {
  return layout({
    title: `${site.name} — ${site.title} | SDKs, Mobile & Real-Time Experiences`,
    description: site.description,
    canonical: site.url + '/',
    isHome: true,
    body: [heroSection(), workSection(), expertiseSection(), experienceSection(), contactSection()].join('\n'),
  });
}
