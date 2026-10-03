import { site } from '../data/site.js';
import { projects } from '../data/projects.js';
import { icon } from './icons.mjs';
import { abstractVisual } from './art.mjs';
import { layout, esc } from './layout.mjs';

function stage(p) {
  const m = p.media;
  const id = `v-${p.slug}`;
  // In a portable build the WebM files are not shipped, so a video project
  // falls back to its real poster frame rather than a dead play button.
  const noVideo = process.env.NO_VIDEO === '1';

  if (m.kind === 'video' && noVideo) {
    return `
<div class="proj-stage reveal">
  <img src="${esc(m.poster)}" alt="${esc(m.alt)}" width="1200" height="675" decoding="async">
  <p class="media-note">Frame from the project's video. The full build plays the clip here.</p>
</div>`;
  }

  if (m.kind === 'video') {
    return `
<div class="proj-stage reveal">
  <button class="video-poster" type="button" data-play="${id}" aria-label="Play video for ${esc(p.name)}">
    <img src="${esc(m.poster)}" alt="${esc(m.alt)}" width="1200" height="675" decoding="async">
    <span class="video-play" aria-hidden="true">${icon('play')}</span>
  </button>
  <video id="${id}" hidden preload="none" playsinline poster="${esc(m.poster)}">
    <source src="${esc(m.video)}" type="video/webm">
    Your browser cannot play this video. <a href="${esc(m.video)}">Download it instead.</a>
  </video>
  <p class="media-note">Capture from the project itself.</p>
</div>`;
  }

  if (m.kind === 'still') {
    return `
<div class="proj-stage reveal">
  <img src="${esc(m.poster)}" alt="${esc(m.alt)}" width="1200" height="675" decoding="async">
  <p class="media-note">Still from the project.</p>
</div>`;
  }

  if (m.kind === 'screens') {
    return `
<div class="proj-stage reveal">
  <div class="screens">
    ${m.screens
      .map(
        (s) =>
          `<img src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy" decoding="async" width="390" height="844">`
      )
      .join('')}
  </div>
  <p class="media-note">Screenshots from the shipped app.</p>
</div>`;
  }

  return `
<div class="proj-stage reveal">
  <div class="abstract abstract-stage" role="img" aria-label="${esc(m.alt)}">${abstractVisual(m.variant)}</div>
  <p class="media-note">Illustrative graphic. Not a screenshot, and this project has no public capture.</p>
</div>`;
}

function facts(p) {
  const items = [
    ['Role', p.role],
    p.org ? ['Organisation', p.org] : null,
    p.period ? ['Period', p.period] : null,
    p.platforms && p.platforms.length ? ['Platforms', p.platforms.join(', ')] : null,
  ].filter(Boolean);

  return `<div class="proj-facts">
    ${items.map(([k, v]) => `<div><p class="fact-k">${esc(k)}</p><p class="fact-v">${esc(v)}</p></div>`).join('')}
  </div>`;
}

export function projectPage(p) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[i - 1];
  const next = projects[i + 1];

  const body = `
<div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/#work">${icon('arrowLeft')} All projects</a>
  </nav>
  <header class="proj-head">
    <h1 class="reveal">${esc(p.name)}</h1>
    <p class="proj-tagline reveal">${esc(p.summary)}</p>
    ${facts(p)}
  </header>
</div>

<div class="wrap">${stage(p)}</div>

<div class="wrap">
  <div class="proj-body">
    <div>
      ${
        p.challenge
          ? `<section class="proj-block reveal">
               <h2>The challenge</h2>
               <p>${esc(p.challenge)}</p>
             </section>`
          : ''
      }
      <section class="proj-block reveal">
        <h2>What I did</h2>
        <ul class="proj-list">${p.contribution.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        ${p.context ? `<p class="proj-context">${esc(p.context)}</p>` : ''}
      </section>
      ${
        p.sparse
          ? `<section class="proj-block reveal">
               <h2>A note on detail</h2>
               <p>This entry is deliberately short. Only the facts above are verified, and nothing further is claimed.</p>
             </section>`
          : ''
      }
    </div>

    <aside class="proj-aside">
      <div class="aside-card reveal">
        <h3>Technology</h3>
        <ul>${p.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
      </div>
      ${
        p.platforms && p.platforms.length
          ? `<div class="aside-card reveal">
               <h3>Platforms</h3>
               <ul>${p.platforms.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
             </div>`
          : ''
      }
      ${
        (p.links || []).length
          ? `<div class="aside-card reveal">
               <h3>Links</h3>
               <div class="aside-links">
                 ${(p.links || [])
                   .map(
                     (l) =>
                       `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ${icon('arrowUpRight')}</a>`
                   )
                   .join('')}
               </div>
             </div>`
          : ''
      }
    </aside>
  </div>
</div>

<div class="wrap">
  <nav class="proj-nav" aria-label="Project navigation">
    ${
      prev
        ? `<a href="/work/${esc(prev.slug)}/"><span class="k">Previous</span><span class="v">${esc(prev.name)}</span></a>`
        : ''
    }
    ${
      next
        ? `<a class="next" href="/work/${esc(next.slug)}/"><span class="k">Next</span><span class="v">${esc(next.name)}</span></a>`
        : ''
    }
  </nav>
</div>`;

  return layout({
    title: `${p.name}, ${p.tagline} | ${site.name}`,
    description: p.summary,
    canonical: `${site.url}/work/${p.slug}/`,
    isHome: false,
    body,
  });
}

export function notFoundPage() {
  return layout({
    title: `Page not found | ${site.name}`,
    description: 'That page does not exist.',
    isHome: false,
    body: `
<div class="wrap">
  <div class="err">
    <div>
      <h1>404</h1>
      <p>That page does not exist.</p>
      <a class="btn btn-primary" href="/">Back to home ${icon('arrowRight')}</a>
    </div>
  </div>
</div>`,
  });
}
