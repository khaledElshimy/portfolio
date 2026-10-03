# Handoff

Built into `portfolio-modern/`. The old site in `rollback-1-site/` and the live
redesign in `redesign/` were not touched, and nothing was published.

## What was built

- One home page (hero, selected work, expertise, experience, contact) and **17
  project pages** at `/work/<slug>/`, generated from `src/data/`.
- Working category filters (All / SDKs & Integrations / Games & XR / Products)
  and a "View all projects" control that expands the default six to all 17.
  Projects can belong to several categories — MyWhoosh appears under both SDKs
  and Games & XR.
- A 404 page, `sitemap.xml`, `robots.txt`, a generated `KE.` favicon, and an
  `.htaccess` with 301s from the old URLs.
- Zero dependencies. `npm run build` needs only Node 18+.

## Verified, not assumed

Everything on the site traces to the résumé (`assets/files/Khaled-Elshimy-CV.pdf`),
the previous site's `projects.json` / experience page, the public ActionNote
site, or the public TyrAds SDK README. Specifically:

- **No invented metrics.** No download counts, performance percentages, revenue
  or user numbers appear anywhere, because no source verifies any.
- **No invented titles.** You are never described as Product Manager, Delivery
  Manager or Business Development Manager. Leadership, delivery and product
  capability are shown through actual work instead (team leadership at LanaGames
  and Zinad, product cycles at Shababeek, shipping ActionNote alone).
- **Contribution is separated from team work.** Each project page has a "What I
  did" list; broader team or publisher context sits in a separate note. Destroy
  All Humans! says the title is the publisher's and you led the port.
- **TyrAds detail** comes from the SDK's own public README (offerwall, WebView
  rendering, locale management, playtime rewards, achievements, daily rewards,
  Android + iOS, Unity 2021.3+, External Dependency Manager). No SDK source,
  credentials or client data is exposed.



## Résumé alignment (Engineering Manager CV is the source of truth)

- **The downloadable PDF was wrong and is now replaced.** The site had been
  serving the old 2024 game-developer CV (`Tech Lead and Senior Game Developer`)
  while every page said Engineering Manager. `assets/files/Khaled-Elshimy-CV.pdf`
  is now the Engineering Manager résumé, byte-identical to the source file.
- **The "ITI instruction" claim is gone.** `src/data/expertise.js` was dead code
  that still carried it; the résumé lists ITI only under Education, so the file
  was deleted rather than left to be reintroduced.
- **"Mobile & tech" added** — the résumé lists five core strengths and the site
  was showing four.
- **Game title follows the résumé**: *Good Morning, {Employee Name}*. Note the
  Steam store page publishes it as *Good Morning [Employee Name] VR* (square
  brackets, with "VR"). Worth making those agree in one direction or the other.

Swept and verified against the résumé: all 8 company/title pairs, all employment
dates, contact details, and the absence of any Product Manager, Delivery Manager,
Business Development or Co-Founder claim.

### Confirmed by Khaled (not in the résumé)

Police Assistant AI, Car Show VR and The Office VR are **Shababeek Labs work** —
confirmed directly, and described as quick projects rather than long engagements.
They are attributed to Shababeek under the Engineering Manager role and carry a
"Quick project" badge so a short turnaround does not read like a six-month
engagement.

Police Assistant AI was demoted from a full four-beat story to a compact entry
for the same reason: the decision narrative overstated a fast piece of work. It
keeps its real video.

The résumé names only the port crane demo and university client work under
Shababeek, so these three rest on Khaled's confirmation rather than the CV.

## Resolved since the first draft

- **`aub.webm` identified.** It is an **Audiomob product video** (Unity integration
  flow, "Add the Prefab", "Publisher API", Audiomob branding), not an unknown
  project. Re-encoded 35 MB → 4.4 MB and attached to the Audiomob story, which
  previously had no asset at all.
- **Good Morning [Employee Name] VR now has media.** The official trailer
  (youtu.be/XbuA5T2_0HE) plays behind its real thumbnail, and the Steam store
  page is linked. Note the published title uses square brackets —
  *Good Morning [Employee Name] VR* — not the curly braces used in the résumé.
- **Steam facts verified from the store page**: Shababeek Labs is both developer
  and publisher; Q4 2026; Meta Quest 2/3/3S/Pro, Valve Index, HTC Vive, Oculus
  Rift and Windows Mixed Reality; a seated VR mystery over twelve in-game days,
  2–6 hours, three endings.
- **The trailer costs nothing on load.** It uses a facade: the page embeds no
  YouTube iframe until the viewer presses play, and then uses youtube-nocookie.com.
  Verified — 0 YouTube iframes before click, 1 after.

## Things you should check or fill in

These are real gaps. Nothing was invented to cover them.

1. **Shababeek Labs job title conflict.** The résumé says *Lead Game Developer*;
   the old site said *Co-Founder & Director*. The timeline uses the résumé title,
   and "Founder, Shababeek Labs" appears under *Beyond the code* as you asked.
   Tell me which is correct and I'll make them agree.
2. **ITI instruction is unverified.** The résumé lists ITI only under Education
   (Game Development Diploma). Your brief said you teach there, so it is in
   *Beyond the code* and the Teaching expertise group — but no source confirms an
   instructor role. Confirm before anyone reads it.
3. **TyrAds has no dates.** It appears as a project, not as a role in the
   timeline, because no employment or contract dates are verified. If you have
   them, it can move into the timeline.
4. **Tamatem Connect Plus is nearly empty.** The only verified fact is
   "Streamlined SDK to enhance integration across games." Its page is short by
   design and says so. It needs your input to become a real entry.
5. **Three videos referenced by the old site do not exist** anywhere in your
   files: `DAH.webm` (Destroy All Humans), `doublejump1.webm` (Double Jump) and
   `City Gaurdians.webm` (note the typo). Those three projects use generated
   graphics instead. If you have the captures, drop them into
   `static/assets/media/` and switch `media.kind` to `video`.
6. **Two "videos" were single frames.** `pimp.webm` and `wca.webm` were 0.1s
   stubs (62 KB and 112 KB). They are used as stills, not video.
7. **`aub.webm` is unidentified.** 35 MB, 1280×720 — the highest-quality capture
   you have, and the only one not referenced by any project. A poster was
   extracted to `static/assets/img/posters/aub.jpg`. Tell me what it is and it
   can become a project.
8. **No public capture exists for the SDK work**, so Audiomob, TyrAds, Tamatem,
   Destroy All Humans, Double Jump and City Guardians use generated graphics,
   labelled "Illustrative visual" on the card and "not a screenshot" on the page.
9. **Phone number omitted.** `+201001826485` is in the résumé but was not on the
   old public site, so it is not on the new one. It is still inside the
   downloadable PDF.
10. **Template junk was left behind deliberately.** `rollback-1-site/assets/images/projects/`
    contains ~40 stock screenshots (Hulu, Flipkart, Instagram clones) that are
    not your work. None were carried over.

## Media weight

`static/assets/media/` is **155 MB** of WebM, and it dominates the build.
Nothing autoplays — every video is `preload="none"` behind a poster and a play
button, so a visitor downloads none of it unless they ask. But it is 155 MB to
upload.

Two are badly encoded at source and worth re-encoding before you deploy:

| File | Now | Problem |
|---|---|---|
| `police-assistant-ai.webm` | 38 MB | 360×360 — tiny resolution, huge file |
| `aub.webm` | 35 MB | 51s at 1280×720, unused |

Say the word and I'll re-encode the set; it should come down a long way.

## Accessibility & validation

`npm run check` passes: no broken internal references, every `<img>` has alt
text, every page has exactly one `<h1>`, a title and a meta description.

Measured in Chrome:

- No horizontal overflow at 390, 768 or 1440 (`scrollWidth === clientWidth`).
- No console errors and no broken images on home, three project pages and 404.
- Filters return 4 / 1 / 13 for SDK / Products / Games & XR; "View all" takes 6
  to 17; `aria-pressed` tracks the active filter; Escape closes the mobile menu.

Also covered: skip link, visible focus rings, semantic headings, `aria-current`
on the active nav item, a live region announcing the project count, keyboard
focus moved to newly revealed cards on expand, and full `prefers-reduced-motion`
support (parallax, the rotating sculpture and all movement transitions are
removed).

**Content never depends on JavaScript.** Scroll reveals are armed by JS only
after it runs, so if `main.js` fails the page renders fully visible. A failsafe
also force-reveals everything shortly after load.

## Not done

- Not deployed. Your live site is untouched.
- `main.js` ships unminified (~9 KB). CSS is minified; I did not hand-roll a JS
  minifier because a wrong one silently breaks behaviour.
- `/saal/` (the Unity build from the old site) was not carried over — it is
  unrelated to the portfolio. It is still in `public_html/saal/`.
