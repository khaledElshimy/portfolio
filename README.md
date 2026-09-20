# khaledelshimy.com — portfolio

Static site, generated from data files. **No dependencies** — Node 18+ and nothing else.
No `npm install` is required.

## Run it

```bash
npm run dev      # build + serve on http://localhost:4321, rebuilding on change
npm run build    # production build into dist/
npm run check    # build, then validate links, assets, alt text, headings, meta
npm run serve    # serve an existing dist/
```

`dist/` is the deployable artifact. Upload its **contents** to the web root.

## Where the content lives

Content is kept out of the markup so it can be edited without touching templates:

| File | Holds |
|---|---|
| `src/data/site.js` | Name, positioning, email, socials, nav, résumé path |
| `src/data/projects.js` | Every project, its media and its detail-page copy |
| `src/data/experience.js` | Roles, "Beyond the code", education |
| `src/data/expertise.js` | The four capability groups |

Adding a project to `src/data/projects.js` automatically creates its card, its
filter entries and its page at `/work/<slug>/`. Set `featured: true` to put it in
the default six.

### Media conventions

`media.kind` controls how a project is presented, and the UI labels it honestly:

- `video` — real capture. Poster image plus click-to-play WebM.
- `still` — a single real frame.
- `screens` — real app screenshots (ActionNote).
- `abstract` — a **generated** graphic. Always labelled "Illustrative visual" on
  the card and "not a screenshot" on the page. Never present one as real capture.

## Structure

```
src/data/        content
src/templates/   HTML generation (layout, home, project, icons, generated art)
src/styles/      main.css
src/scripts/     main.js (progressive enhancement only)
static/          assets copied verbatim: images, video, résumé, .htaccess, robots.txt
build.mjs        the whole build
```

## Notes

- The hero sculpture is a torus knot generated in `src/templates/art.mjs` — the
  curve is sampled in 3D and painted back-to-front so the strands cross
  correctly. It is inline SVG, so there is no image request.
- `static/.htaccess` carries 301s from the old site's URLs (`/projects/`,
  `/experience/`, the old résumé filename) plus gzip and cache headers. It is
  Apache-specific, which is what Hostinger runs.
- JavaScript is enhancement only. If `main.js` fails to load, all content is
  still visible and every link still works.
