#!/usr/bin/env node
/**
 * Static build. No dependencies.
 *
 *   node build.mjs            production build into dist/
 *   node build.mjs --check    build, then validate assets and internal links
 *   node build.mjs --serve    build, then serve dist/ on :4321
 *   node build.mjs --watch --serve   rebuild on change while serving
 */
import { readdir, mkdir, readFile, writeFile, copyFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const STATIC = path.join(ROOT, 'static');
const DIST = path.join(ROOT, 'dist');

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
// --relative  : page-relative URLs, so the site can be served from a sub-path
// --no-video  : omit the WebM files; video projects fall back to their poster
// --portable  : both (what the artifact build uses)
const PORTABLE = has('--portable');
const RELATIVE = PORTABLE || has('--relative');
const NO_VIDEO = PORTABLE || has('--no-video');
if (NO_VIDEO) process.env.NO_VIDEO = '1';
if (NO_VIDEO) process.env.PORTABLE = '1';

/**
 * Rewrite root-absolute URLs to page-relative ones so the output can be served
 * from any sub-path (an artifact host, a preview folder, file://).
 * depth = how many directories deep this page sits.
 */
function portablize(html, depth) {
  const up = depth === 0 ? '' : '../'.repeat(depth);
  return html.replace(/(href|src)="\/([^"]*)"/g, (m, attr, rest) => {
    let target = rest;
    if (target === '' || target.endsWith('/')) target += 'index.html';
    return attr + '="' + up + target + '"';
  });
}

const log = (...m) => console.log(...m);
const bytes = (n) => (n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`);

/* ----------------------------------------------------------------- helpers */
async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(path.relative(base, full));
  }
  return out;
}

async function write(rel, contents) {
  const dest = path.join(DIST, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, contents);
  return Buffer.byteLength(contents);
}

/** Conservative CSS minifier: comments and redundant whitespace only. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#101115"/>
<text x="7" y="44" font-family="Inter,Helvetica,Arial,sans-serif" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="-1.5">KE</text>
<circle cx="53" cy="41" r="4.5" fill="#386bff"/>
</svg>`;

/* ------------------------------------------------------------------- build */
async function build() {
  const t0 = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // Import fresh each build so --watch picks up data/template edits.
  const bust = `?t=${Date.now()}`;
  const { site } = await import(pathToFileURL(path.join(SRC, 'data/site.js')).href + bust);
  const { projects } = await import(pathToFileURL(path.join(SRC, 'data/projects.js')).href + bust);
  const { homePage } = await import(pathToFileURL(path.join(SRC, 'templates/home.mjs')).href + bust);
  const { projectPage, notFoundPage } = await import(pathToFileURL(path.join(SRC, 'templates/project.mjs')).href + bust);

  let total = 0;
  const pages = [];

  total += await write('index.html', RELATIVE ? portablize(homePage(), 0) : homePage());
  pages.push('/');

  for (const p of projects) {
    const ph = projectPage(p);
    total += await write(path.join('work', p.slug, 'index.html'), RELATIVE ? portablize(ph, 2) : ph);
    pages.push(`/work/${p.slug}/`);
  }

  total += await write('404.html', RELATIVE ? portablize(notFoundPage(), 0) : notFoundPage());
  total += await write('favicon.svg', FAVICON);

  // sitemap
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  total += await write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  // CSS + JS
  const css = await readFile(path.join(SRC, 'styles/main.css'), 'utf8');
  total += await write('assets/css/main.css', minifyCss(css));
  const js = await readFile(path.join(SRC, 'scripts/main.js'), 'utf8');
  total += await write('assets/js/main.js', js);

  // Static assets
  let staticCount = 0;
  let staticBytes = 0;
  for (const rel of await walk(STATIC)) {
    if (NO_VIDEO && rel.startsWith('assets/media')) continue;
    const from = path.join(STATIC, rel);
    const to = path.join(DIST, rel);
    await mkdir(path.dirname(to), { recursive: true });
    await copyFile(from, to);
    staticBytes += (await stat(from)).size;
    staticCount++;
  }

  log(`built ${pages.length} pages + 404  (${bytes(total)} html/css/js)`);
  log(`copied ${staticCount} static files (${bytes(staticBytes)})`);
  log(`done in ${Date.now() - t0}ms → dist/`);
  return { pages, projects };
}

/* ------------------------------------------------------------------- check */
async function check() {
  const problems = [];
  const files = new Set(await walk(DIST));

  const localPath = (url) => {
    const clean = url.split('#')[0].split('?')[0];
    if (!clean.startsWith('/')) return null;
    let rel = clean.slice(1);
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';
    return rel;
  };

  const htmlFiles = [...files].filter((f) => f.endsWith('.html'));

  for (const f of htmlFiles) {
    const html = await readFile(path.join(DIST, f), 'utf8');

    // internal hrefs + srcs
    const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
      const rel = localPath(ref);
      if (!rel) { problems.push(`${f}: non-absolute internal ref "${ref}"`); continue; }
      if (!files.has(rel)) problems.push(`${f}: broken reference → ${ref}`);
    }

    // accessibility smoke tests
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    for (const img of imgs) {
      if (!/\salt="/.test(img)) problems.push(`${f}: <img> without alt — ${img.slice(0, 70)}…`);
    }
    if (!/<h1\b/.test(html)) problems.push(`${f}: no <h1>`);
    if ((html.match(/<h1\b/g) || []).length > 1) problems.push(`${f}: more than one <h1>`);
    if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${f}: empty or missing <title>`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) problems.push(`${f}: missing meta description`);
  }

  if (problems.length) {
    log(`\n✗ ${problems.length} problem(s):`);
    problems.forEach((p) => log('  - ' + p));
    process.exitCode = 1;
  } else {
    log(`\n✓ checked ${htmlFiles.length} pages — no broken references, all images have alt text`);
  }
}

/* ------------------------------------------------------------------- serve */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webm': 'video/webm', '.pdf': 'application/pdf',
  '.json': 'application/json', '.ico': 'image/x-icon',
};

function serve(port = 4321) {
  createServer(async (req, res) => {
    try {
      let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
      if (rel === '' || rel.endsWith('/')) rel += 'index.html';
      let file = path.join(DIST, rel);
      if (!file.startsWith(DIST)) { res.writeHead(403).end('forbidden'); return; }
      if (!existsSync(file)) {
        const asDir = path.join(DIST, rel, 'index.html');
        if (existsSync(asDir)) file = asDir;
        else {
          res.writeHead(404, { 'content-type': MIME['.html'] });
          res.end(await readFile(path.join(DIST, '404.html')));
          return;
        }
      }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch (e) {
      res.writeHead(500).end(String(e));
    }
  }).listen(port, () => log(`\n▸ http://localhost:${port}`));
}

/* -------------------------------------------------------------------- main */
await build();
if (has('--check')) await check();
if (has('--serve')) serve();
if (has('--watch')) {
  let timer = null;
  for (const dir of [path.join(SRC)]) {
    watch(dir, { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => build().catch((e) => console.error(e)), 120);
    });
  }
  log('▸ watching src/ for changes');
}
