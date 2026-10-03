import { site, categories } from '../data/site.js';
import { stories } from '../data/stories.js';
import { experience, productWork, education, strengths } from '../data/experience.js';
import { icon } from './icons.mjs';
import { layout, esc } from './layout.mjs';
import { abstractVisual } from './art.mjs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STATIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'static');
// If a video file has been removed, fall back to its poster instead of
// shipping a player that cannot load anything.
const videoPresent = (url) => existsSync(path.join(STATIC, url.replace(/^\//, '')));
import { projects } from '../data/projects.js';

const hasArchivePage = (slug) => projects.some((p) => p.slug === slug);

/* --------------------------------------------------------------- the media */
function storyMedia(s) {
  const m = s.media;
  const id = `v-${s.slug}`;

  if (m.kind === 'video' && !videoPresent(m.video)) {
    return `
<div class="shot">
  <img src="${esc(m.poster)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="750">
  <p class="cap">${esc(m.note || 'Still from the project.')}</p>
</div>`;
  }

  if (m.kind === 'video') {
    return `
<div class="shot">
  <button class="vbtn" type="button" data-play="${id}" aria-label="Play video for ${esc(s.project)}">
    <img src="${esc(m.poster)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="750">
    <span class="vplay" aria-hidden="true">${icon('play')}</span>
  </button>
  <video id="${id}" hidden preload="none" playsinline poster="${esc(m.poster)}">
    <source src="${esc(m.video)}" type="video/webm">
    <a href="${esc(m.video)}">Download the video</a>
  </video>
  <p class="cap">${esc(m.note || 'Capture from the project.')}</p>
</div>`;
  }

  // A YouTube facade: nothing is requested from YouTube until the viewer
  // presses play, so the page costs no third-party request on load.
  if (m.kind === 'trailer') {
    return `
<div class="shot">
  <button class="vbtn" type="button" data-yt="${esc(m.youtube)}" aria-label="Play the trailer for ${esc(s.project)}">
    <img src="${esc(m.poster)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1280" height="720">
    <span class="vplay" aria-hidden="true">${icon('play')}</span>
  </button>
  <p class="cap">${esc(m.note)}</p>
</div>`;
  }

  if (m.kind === 'still') {
    return `
<div class="shot">
  <img src="${esc(m.poster)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="675">
  <p class="cap">${esc(m.note || 'Still from the project.')}</p>
</div>`;
  }

  if (m.kind === 'screens') {
    return `
<div class="shot">
  <img src="${esc(m.card)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="1200" height="675">
  <div class="screens4">
    ${m.screens.map((x) => `<img src="${esc(x.src)}" alt="${esc(x.alt)}" loading="lazy" decoding="async" width="390" height="844">`).join('')}
  </div>
  <p class="cap">Screenshots from the shipped app.</p>
</div>`;
  }

  // Generated graphic. Always labelled so it cannot be read as a screenshot.
  return `
<div class="shot">
  <div class="abstract" role="img" aria-label="${esc(m.alt)}">${abstractVisual(m.variant)}</div>
  <p class="cap">${esc(m.note)}</p>
</div>`;
}

const tagList = (s) => (s.tags && s.tags.length ? `<ul class="tags">${s.tags.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>` : '');

const linkList = (s) => {
  const out = (s.links || []).map(
    (l) => `<a class="slink" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ${icon('arrowUpRight')}</a>`
  );
  if (hasArchivePage(s.slug)) {
    out.unshift(`<a class="slink" href="/work/${esc(s.slug)}/">Full project page ${icon('arrowRight')}</a>`);
  }
  return out.length ? `<div class="slinks">${out.join('')}</div>` : '';
};

function storyHead(s) {
  return `
<div class="sh">
  <span class="num">${esc(s.n)}</span>
  <h3>${esc(s.title)}</h3>
  ${s.team ? `<span class="team">${esc(s.team)} engineers</span>` : ''}
  ${s.scale === 'quick' ? '<span class="scale">Quick project</span>' : ''}
  <span class="where">${[s.org, s.period].filter(Boolean).map(esc).join(' · ')}</span>
</div>`;
}

function fullStory(s) {
  return `
<article class="story reveal" data-cats="${esc(s.cats.join(' '))}">
  ${storyHead(s)}
  <div class="sgrid">
    <div>
      <div class="beat"><span class="t">${esc((s.labels && s.labels.situation) || 'Context')}</span><p>${esc(s.situation)}</p></div>
      <div class="beat"><span class="t">${esc((s.labels && s.labels.decision) || 'What I owned')}</span><p>${esc(s.decision)}</p></div>
      <div class="beat"><span class="t">${esc((s.labels && s.labels.cost) || 'Approach')}</span><p>${esc(s.cost)}</p></div>
      ${tagList(s)}
      ${linkList(s)}
    </div>
    <div>
      ${storyMedia(s)}
      <div class="out"><span class="t">Outcome</span><p>${esc(s.outcome)}</p></div>
    </div>
  </div>
</article>`;
}

function briefStory(s) {
  return `
<article class="story brief reveal" data-cats="${esc(s.cats.join(' '))}">
  ${storyHead(s)}
  <div class="sgrid">
    <div>
      <p>${esc(s.body)}</p>
      ${tagList(s)}
      ${linkList(s)}
    </div>
    <div>${storyMedia(s)}</div>
  </div>
</article>`;
}

/* -------------------------------------------------------------- the page */
function intro() {
  return `
<section class="intro">
  <div class="wrap">
    <p class="k reveal">${esc(site.positioning)}</p>
    <h1 class="reveal">${esc(site.headline)}</h1>
    <p class="sub reveal">${esc(site.supporting)}</p>
    <div class="stats">
      ${site.stats.map((s) => `<div class="stat reveal"><b>${esc(s.n)}</b><span>${esc(s.k)}</span></div>`).join('')}
    </div>
  </div>
</section>`;
}

function storiesSection() {
  return `
<section class="sec" id="stories" aria-labelledby="stories-title">
  <div class="wrap">
    <div class="sec-head">
      <h2 id="stories-title" class="reveal">The work</h2>
      <div class="filters" data-filters role="group" aria-label="Filter by category">
        ${categories.map((c) => `<button class="filter" type="button" data-filter="${esc(c.id)}" aria-pressed="${c.id === 'all'}">${esc(c.label)}</button>`).join('')}
      </div>
    </div>
    <div data-stories>
      ${stories.map((s) => (s.depth === 'full' ? fullStory(s) : briefStory(s))).join('')}
    </div>
    <p class="lab" style="margin-top:26px" data-count aria-live="polite"></p>
  </div>
</section>`;
}

function experienceSection() {
  return `
<hr class="rule">
<section class="sec" id="experience" aria-labelledby="xp-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="xp-title" class="reveal">Where I've led</h2></div>
    <div class="two">
      <div>
        ${experience
          .map(
            (x) => `
        <article class="xp reveal">
          <div>
            <h3 class="xp-co">${esc(x.company)}${x.current ? '<span class="now">Now</span>' : ''}${x.team ? `<span class="xp-team">${esc(x.team)}</span>` : ''}</h3>
            <p class="xp-role">${esc(x.role)}</p>
          </div>
          <p class="xp-d">${esc(x.start)} – ${esc(x.end)}</p>
          <p class="xp-sum">${esc(x.summary)}</p>
          <ul class="xp-pts">${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        </article>`
          )
          .join('')}
      </div>
      <aside>
        <div class="panel reveal">
          <h3>Selected product work</h3>
          ${productWork
            .map(
              (p) => `<div class="pitem"><b>${esc(p.name)}</b>${p.period ? `<span class="m">${esc(p.period)}</span>` : ''}<p>${esc(p.role)}. ${esc(p.body)}</p></div>`
            )
            .join('')}
          <div class="edu">
            <h3 style="margin-bottom:12px">Education</h3>
            <ul>${education.map((e) => `<li><b>${esc(e.title)}</b>${esc(e.org)}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="panel reveal" style="margin-top:22px">
          <h3>Core strengths</h3>
          ${strengths.map((s) => `<div class="pitem"><b>${esc(s.k)}</b><p>${esc(s.v)}</p></div>`).join('')}
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

function contactSection() {
  return `
<hr class="rule">
<section class="sec contact-wrap" id="contact">
  <div class="wrap">
    <div class="contact">
      <div class="reveal">
        <h2>Looking for an engineering leader<em>?</em></h2>
        <p>I'm open to engineering management roles, and happy to talk about leading a team, delivery, or a project that needs someone to own it.</p>
        <div class="socials">
          ${site.socials.map((s) => `<a class="social" href="${esc(s.href)}" rel="me noopener" target="_blank">${icon(s.icon)}${esc(s.label)}</a>`).join('')}
        </div>
      </div>
      <div class="acts reveal">
        <a class="btn p" href="mailto:${esc(site.email)}">${icon('mail')} Email me</a>
        <a class="btn" href="${esc(site.resume)}" download>${icon('download')} Résumé</a>
      </div>
    </div>
  </div>
</section>`;
}

export function homePage() {
  return layout({
    title: `${site.name}, ${site.title}`,
    description: site.description,
    canonical: site.url + '/',
    isHome: true,
    body: [intro(), storiesSection(), experienceSection(), contactSection()].join('\n'),
  });
}
