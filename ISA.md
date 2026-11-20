---
name: "Personal Site Refactor"
task: "Modernize and restructure Vitaly's personal website"
slug: 20261120-125743_personal-website-refactor
project: Personal-Website
phase: climbing
progress: 22/28
started: 2026-11-20T10:57:43Z
updated: 2026-11-20T11:38:00Z
principal_stated_goal: "I would like to refactor my personal website that is right now in the following directory. /Users/vitalik/projects/Personal-Website. I would like you to make it more modern and better structured."
principal_stated_goal_source: prompt
principal_stated_goal_signal: 4
principal_stated_goal_locked: 2026-11-20T10:57:43Z
context_sufficient: true
interview_invoked: true
absence_review: skipped — single-author personal site, no user data, no live traffic beyond a personal domain, every change reversible through git
---

## Ideal State

### L3 · One sentence

Vitaly's personal site is a current, fast React app that a hiring manager reads top to bottom in one scroll and leaves with the resume in hand, and that Vitaly updates months later by editing one data file.

### L2 · Summary

A modern Vite-built React site whose content lives in typed data modules, whose look is driven by one token file, and whose resume always downloads.

- **For a hiring manager:** the site loads instantly in their own colour scheme, reads cleanly on a phone, and the resume download works the first time.
- **For Vitaly today:** adding a project, a skill or a certification is a one-file edit, and `bun run dev` starts in under a second.
- **For Vitaly in six months:** the structure explains itself, so he picks it back up without re-reading every component.
- **For shipping:** Vitaly pushes, and the pipeline builds, tags and deploys the new site without him thinking about it.

### L1 · Full articulation

This is Vitaly's professional front door: the page a recruiter opens after seeing his CV or his LinkedIn. It has to do two jobs well and nothing else. It has to present him — summary, skills, certifications, projects, resume — in a way that reads as current and competent, because a dated personal site quietly argues against the engineer who wrote it. And it has to stay cheap for him to maintain, because the content changes every few months and the site shouldn't tax him each time.

The engineering target is a site built on tooling that is alive. Create React App was deprecated by the React team in February 2025; the repo still runs it. Vite replaces it, with bun as the single runner so the repo stops mixing `bun.lock` with `npm install`. TypeScript moves to 5.x compiling to a modern target instead of ES5, and React moves to 19. None of this is visible to a visitor, and all of it is visible to Vitaly every time he opens the project.

The structural target is that content and behaviour each live in one place. Today the skills list, the projects list and the certifications list are hardcoded inside component bodies and rebuilt on every render, and the same twenty-line IntersectionObserver reveal block is copy-pasted into five components. After this, content is typed data under `src/content/`, the reveal behaviour is one `useReveal` hook, and a component's job is only to render.

The visual target is a refresh, not a redesign. The same sections in the same order, but driven by a real design system: one token file holding colour, spacing, type scale and radius, both themes defined in that file, component styles scoped as CSS Modules so class names stop colliding. The theme follows the visitor's own `prefers-color-scheme` on first visit and is applied before first paint, so nobody sees a flash of the wrong background. The artificial half-second loading delay goes away, because it never served anyone.

One thing is simply broken and gets fixed on the way through: the Contact page links the resume download and the preview iframe at `resume/resume.pdf`, but the working tree now holds only `resume.docx`. The resume has to download, every time, or the site has failed at the one conversion it exists for.

What it is not becoming: a blog, a CMS-backed site, a Next.js app, or a portfolio with case-study pages. It stays a single-purpose personal site that one person maintains in an afternoon.

## Problem

The site works but is built on dead tooling and is structured so that every content change is a code change. `react-scripts` 5 is unmaintained since CRA's deprecation, which means slow builds, a frozen webpack config and a dependency tree nobody will patch. TypeScript 4.9 targets ES5 for browsers that no longer exist. Content is embedded in component bodies, so updating a project list means editing React and re-reading JSX. The same scroll-reveal logic exists five times, so changing how reveals work means changing it five times. ~1,900 lines of global CSS carry hard-coded colours with no token layer, so the two themes are maintained by hand and class names are one collision away from a bug. And right now the resume download is a 404.

## Vision

Vitaly opens the repo six months from now to add a project. He edits one array in `src/content/projects.ts`, runs `bun run dev`, sees it on screen in under a second, pushes, and the existing pipeline ships it. A recruiter opens the site on their phone in daylight, gets the light theme immediately with no flash, scrolls once through summary, skills, certifications and projects, taps Download Resume, and gets the current PDF. Euphoric surprise: the site feels like it was built this year, and the diff that made it so never touched what the site says.

## Out of Scope

- **No new sections or content.** The same five areas in the same order; what the site says is unchanged by this work.
- **No redesign of the information architecture.** Hero, skills, certifications, projects, contact stay as they are.
- **No framework migration.** React stays; this is not a move to Next.js, Astro or Remix.
- **No CMS or headless backend.** Content stays in the repo as typed modules.
- **No new runtime dependencies for styling.** Plain CSS with tokens and CSS Modules — no Tailwind, no CSS-in-JS.
- **No change to the deploy contract.** Same registry, same image tags, same SSH deploy step, same nginx config.
- **No analytics, tracking or third-party embeds.**
- **No resume content changes.** The site serves whatever the current PDF is; editing the CV is separate work.

## Principles

- A visitor's first paint is sacred: nothing artificial may delay it, and nothing may flash the wrong colour.
- Content is data. If updating the site requires reading JSX, the structure has failed.
- One behaviour, one implementation. A pattern that appears twice becomes a hook.
- The refresh must be legible as the same site. A visitor who saw it last month should recognise it.
- Tooling should be boring and alive. Prefer what is maintained over what is clever.

## Constraints

- bun is the only package manager and task runner; `npm` appears nowhere, including the Dockerfile and CI.
- TypeScript strict mode stays on, and the build fails on any type error.
- Styling is plain CSS: one token file plus per-component CSS Modules. No styling dependency may be added.
- The production artifact stays a static bundle served by nginx from the existing Dockerfile's final stage.
- The GitHub Actions workflow's job names, image tags and deploy step are unchanged.
- The site must render correctly without JavaScript errors in current Chrome, Safari and Firefox.
- No horizontal scroll at 390px.

## Features

### F0 · Cross-cutting

Why: the repo builds clean on one toolchain, and the dead one leaves no trace behind.

- [x] ISC-1: `bunx tsc --noEmit` exits 0 under strict mode.
- [x] ISC-2: `bun run build` exits 0 and writes `dist/index.html` plus content-hashed JS and CSS assets.
- [x] ISC-3: Anti: no `react-scripts` entry remains in `package.json` dependencies or scripts.
- [x] ISC-4: Anti: no `npm` invocation remains in the `Dockerfile` or `.github/workflows/deploy.yaml`.
- [ ] ISC-5: `[DEFERRED-VERIFY]` The harness runs end to end: dev server launches, readiness probe passes, the home page is driven through F4's `Reach:` entry, a screenshot is captured, teardown stops only the server it launched, and the screenshot is still on disk afterwards.

### F1 · Toolchain

Why: the project runs on tooling that is still maintained, so builds are fast and the dependency tree is patchable.

- [x] ISC-6: `vite.config.ts` exists at the repo root and declares the React plugin.
- [x] ISC-7: `bun run dev` serves the app and `GET /` returns HTTP 200 with `text/html` within 30 seconds of launch.
- [x] ISC-8: `tsconfig.json` sets `target` to `ES2022` or later with `strict: true`.
- [x] ISC-9: The installed `react` and `react-dom` are 19.x.
- [ ] ISC-28: The app mounts with zero console errors on load. `[DEFERRED-VERIFY]`

### F2 · Content as data

Why: Vitaly changes what the site says by editing data, never by editing a component.
Reach: /#skills → list "Skills" ; /#projects → list "Projects" ; /#certifications → list "Certifications"

- [x] ISC-10: `src/content/skills.ts`, `src/content/projects.ts` and `src/content/certifications.ts` each export a typed array and its item interface.
- [x] ISC-11: Anti: no skill, project or certification literal appears in any `src/components/**/*.tsx` file.
- [x] ISC-12: Every skill, project and certification visible on the site before the refactor is still visible after it, same names, same order.

### F3 · Shared behaviour

Why: one reveal implementation and one theme mechanism, so changing either is a single edit.

- [x] ISC-13: Exactly one `new IntersectionObserver` call exists in `src/`, inside a reusable hook under `src/hooks/`.
- [x] ISC-14: Theme is set on `document.documentElement` as `data-theme` by an inline script in `index.html` before the app bundle loads.
- [ ] ISC-15: `[DEFERRED-VERIFY]` With no stored preference, the initial theme matches the browser's `prefers-color-scheme`.
- [ ] ISC-16: `[DEFERRED-VERIFY]` A chosen theme survives a reload, and the toggle switches themes without a full re-render of the page loader.
- [x] ISC-17: Anti: no `setTimeout` gates the first render of the application shell.

### F4 · Design system and visual refresh

Why: the look is current and both themes are maintained in one file instead of by hand across six stylesheets.
Reach: / → heading "Vitaly Nudelman" ; / → button "Toggle theme"

- [x] ISC-18: `src/styles/tokens.css` defines colour, spacing, type-scale and radius custom properties, with the dark theme under `[data-theme="dark"]`.
- [x] ISC-19: Every component stylesheet under `src/components/` is a `*.module.css` imported as an object.
- [x] ISC-20: Anti: no hard-coded hex or `rgb()` colour literal appears in any file under `src/` other than `tokens.css`.
- [ ] ISC-21: `[DEFERRED-VERIFY]` The home page renders with no horizontal overflow at 390px, 768px and 1440px.
- [ ] ISC-22: `[DEFERRED-VERIFY]` Both themes render correctly at 1440px, judged on viewed screenshots against the refreshed design.

### F5 · Resume delivery

Why: the download is the site's one conversion, and it currently 404s.
Reach: /contact → link "Download Resume"

- [x] ISC-23: The path the download link points at returns HTTP 200 with `application/pdf` from the built site.
- [x] ISC-24: The served PDF is byte-identical to the current full-cycle resume PDF in the Resume folder.

### F6 · Deploy pipeline

Why: shipping stays one push, and the image builds without re-installing dependencies on every source change.

- [x] ISC-25: `docker build` succeeds and the resulting container returns HTTP 200 with `text/html` at `/`.
- [x] ISC-26: The Dockerfile copies `package.json` and `bun.lock` and installs before copying application source.
- [x] ISC-27: Anti: the deploy workflow's image tags, registry login and SSH deploy step are unchanged from `main`.

## Test Strategy

| isc | type | check | threshold | tool | anchors_to | severity | tier |
|-----|------|-------|-----------|------|------------|----------|------|
| ISC-1 | bash | strict typecheck has no errors | exit 0 | `bunx tsc --noEmit` | literal |  | integrity |
| ISC-2 | bash | production build emits hashed assets | exit 0 and dist/index.html exists | `bun run build && test -f dist/index.html` | literal |  | integrity |
| ISC-3 | bash | react-scripts is gone from the manifest | 0 matches | `! grep -q react-scripts package.json` | literal |  | liveness |
| ISC-4 | bash | npm is gone from Dockerfile and CI | 0 matches | `! grep -rqE '\bnpm (install\|ci\|run)' Dockerfile .github/workflows` | literal |  | liveness |
| ISC-5 | bash | one full harness pass, screenshot still present after teardown | exit 0 | `bash scripts/harness-pass.sh` | derived: harness |  | build |
| ISC-6 | bash | vite config declares the React plugin | 1 match | `grep -q '@vitejs/plugin-react' vite.config.ts` | literal |  | liveness |
| ISC-7 | curl | dev server serves HTML | 200 + text/html | `curl -sfI http://localhost:5173/ \| grep -qi 'content-type: text/html'` | literal |  | liveness |
| ISC-8 | bash | tsconfig targets a modern ES version in strict mode | ES2022 or later, strict true | `bash scripts/check-tsconfig.sh` | literal |  | liveness |
| ISC-9 | bash | react runtime is version 19 | 19.x | `bun -e "console.log(require('react/package.json').version)"` | literal |  | liveness |
| ISC-28 | screenshot | the app mounts with no console errors | 0 errors | Interceptor console read on load | derived: clean-mount |  | integrity |
| ISC-10 | bash | content modules export typed arrays | 3 files present with exports | `bash scripts/check-content-modules.sh` | derived: content-as-data |  | integrity |
| ISC-11 | bash | no content literals remain in components | 0 matches | `bash scripts/check-no-content-in-components.sh` | derived: content-as-data |  | integrity |
| ISC-12 | bash | every pre-refactor skill, project and certification still renders, same names and order | exact set match | `bash scripts/check-content-parity.sh` | derived: parity |  | integrity |
| ISC-13 | bash | exactly one IntersectionObserver in the source | 1 match | `test "$(grep -rc 'new IntersectionObserver' src \| awk -F: '{s+=$2} END {print s}')" = 1` | derived: one-implementation |  | integrity |
| ISC-14 | bash | theme is applied by an inline script before the bundle | script precedes module script | `bash scripts/check-theme-preload.sh` | derived: no-flash |  | integrity |
| ISC-15 | screenshot | first visit with no stored preference follows the OS scheme | matches emulated scheme | Interceptor with `prefers-color-scheme` emulation, storage cleared | derived: no-flash |  | integrity |
| ISC-16 | screenshot | chosen theme survives reload | same theme after reload | Interceptor: toggle, reload, screenshot | literal |  | integrity |
| ISC-17 | bash | no timer gates the app shell's first render | 0 matches | `! grep -rq 'setTimeout' src/components/App` | literal |  | liveness |
| ISC-18 | bash | token file defines both themes | tokens.css has :root and [data-theme="dark"] | `bash scripts/check-tokens.sh` | derived: design-system |  | liveness |
| ISC-19 | bash | every component stylesheet is a CSS Module | 0 non-module component CSS files | `! find src/components -name '*.css' ! -name '*.module.css' \| grep -q .` | derived: design-system |  | liveness |
| ISC-20 | bash | no colour literals outside the token file | 0 matches | `bash scripts/check-no-hex.sh` | derived: design-system |  | integrity |
| ISC-21 | screenshot | no horizontal overflow at three widths | scrollWidth <= clientWidth at 390, 768, 1440 | Interceptor viewport sweep | derived: responsive |  | integrity |
| ISC-22 | eval | both themes read as a current, coherent refresh of the same site | judged pass | viewed screenshots at 1440px, light and dark | derived: visual-refresh |  | integrity |
| ISC-23 | curl | resume path serves a PDF from the built site | 200 + application/pdf | `curl -sfI http://localhost:4173/resume/resume.pdf \| grep -qi 'content-type: application/pdf'` | literal |  | liveness |
| ISC-24 | bash | served PDF matches the current full-cycle resume | identical sha256 | `bash scripts/check-resume-identity.sh` | derived: resume-currency |  | integrity |
| ISC-25 | bash | container image builds and serves the site | 200 + text/html | `bash scripts/docker-smoke.sh` | literal |  | build |
| ISC-26 | bash | dependency install precedes source copy in the Dockerfile | install layer before COPY . . | `bash scripts/check-docker-layers.sh` | derived: build-cache |  | liveness |
| ISC-27 | bash | deploy contract is unchanged from main | no diff in tags, login or deploy steps | `bash scripts/check-deploy-contract.sh` | derived: deploy-parity |  | integrity |

## Harness

```yaml
surface: web
targets:
  local: http://localhost:5173
  preview: http://localhost:4173
launch: bun run dev --port 5173
ready: curl -sf http://localhost:5173/
ready_timeout: 30s
doctor: bunx tsc --noEmit
drive: interceptor
identity: none — the site is fully public, no sign-in path
seed: none
isolation: serial
evidence: ./.harness/evidence
teardown: bash scripts/stop-dev.sh
```

## Decisions

- 2026-11-20 12:57: Vite chosen over keeping react-scripts or moving to Next.js. CRA is deprecated and unmaintained; Next.js would be a framework migration the principal did not ask for and would change the deploy contract from a static nginx bundle to a Node server.
- 2026-11-20 12:57: Plain CSS with tokens plus CSS Modules chosen over Tailwind, selected by the principal from a presented fork. Keeps the dependency count at zero added and lets the existing ~1,900 lines of CSS carry over instead of being rewritten.
- 2026-11-20 12:57: Scope set to "engineering plus visual refresh" by the principal from a presented fork: same sections and same information architecture, modernized look. A full redesign was offered and declined.
- 2026-11-20 12:57: Absence review skipped. Single-author personal site, no user accounts, no data to lose, no live traffic beyond a personal domain, and every change is reversible through git, so the review's cost outweighs its expected yield.
- 2026-11-20 12:57: The resume 404 is folded into this work rather than fixed separately, because the refactor touches the Contact component and the public asset layout anyway.
- 2026-11-20 13:20: Project-card click-to-expand replaced by making the whole card a link to its repository. The old handler fought the inner anchor and needed `stopPropagation`; one link target is both simpler and reachable by keyboard.
- 2026-11-20 13:35: ❌ Interceptor is not installed on this machine (`PreflightIsolation FAIL: interceptor not found on PATH`), and no other browser automation is connected to the session. Per the verification doctrine an unavailable verifier defers rather than substitutes, so ISC-5, ISC-15, ISC-16, ISC-21, ISC-22 and ISC-28 carry `[DEFERRED-VERIFY]`. No curl or static read was dressed up as visual evidence. Follow-up: install Interceptor (`Skill("Interceptor")` Update intent), then run the five browser rows.
- 2026-11-20 13:38: refined: ISC-9 was compound, asserting both the React version and a clean console. Split, with the version staying ISC-9 and the console claim becoming ISC-28, which is browser-bound and therefore deferred. The original wording would have let a deterministic half close the judged half.
- 2026-11-20 17:15: The in-page resume preview iframe is removed at the principal's request: it rendered poorly and the download link already carries the conversion. ISC-23 and F5's `Reach:` line drop their iframe clause.
- 2026-11-20 17:15: Skill chips overflowed on the longest names ("Elasticsearch", "Prometheus"), reported by the principal from the running site. Cause: a flex item defaults to `min-width: auto` and will not shrink below its own text. Fixed at both ends, a wider grid track and a shrinkable, wrapping label, so length alone cannot break a chip again.
- 2026-11-20 13:38: refined: ISC-12's row moved from `manual` to `bash`. A server render of the real components through `scripts/check-content-parity.sh` makes content parity deterministic; it is evidence about content only and is never cited for layout or appearance.

## Verification

- ISC-1: `bunx tsc --noEmit` — exit 0 under strict mode
- ISC-2: `bun run build` — exit 0, `dist/index.html` plus 3 content-hashed assets, 409ms
- ISC-3: `grep react-scripts package.json` — 0 matches
- ISC-4: `grep -rE 'npm (install|ci|run|version)' Dockerfile .github/workflows` — 0 matches
- ISC-6: `vite.config.ts` declares `@vitejs/plugin-react`
- ISC-7: `curl -sfI http://localhost:5173/` — `200 / content-type: text/html`, server ready in 120ms
- ISC-8: `scripts/check-tsconfig.sh` — target=ES2022 strict=true
- ISC-9: `require('react/package.json').version` — 19.3.1; react-dom 19.3.1
- ISC-10: `scripts/check-content-modules.sh` — three modules each export their typed array
- ISC-11: `scripts/check-no-content-in-components.sh` — 0 content literals under src/components, src/pages
- ISC-12: `scripts/check-content-parity.sh` — 22/22 baseline items render, each section in its original order
- ISC-13: `grep -rc 'new IntersectionObserver' src` — 1, in `src/hooks/useReveal.ts`
- ISC-14: `scripts/check-theme-preload.sh` — theme script at line 35, module bundle at line 45
- ISC-17: `grep setTimeout src/App.tsx src/main.tsx src/components/Nav` — 0 matches
- ISC-18: `scripts/check-tokens.sh` — both themes and all four token families present
- ISC-19: `find src/components -name '*.css' ! -name '*.module.css'` — 0 files
- ISC-20: `scripts/check-no-hex.sh` — 0 colour literals outside tokens.css
- ISC-23: `curl -sfI http://localhost:4173/resume/resume.pdf` — `200 / application/pdf / content-length: 78059`
- ISC-24: served bytes sha256 `328adb05…e2b57` matches `Vitaly_Nudelman_Resume_SWDev_FullCycle_v12.pdf`
- ISC-25: `scripts/docker-smoke.sh` — image builds in 8s, `/` returns text/html, resume returns application/pdf
- ISC-26: `scripts/check-docker-layers.sh` — manifest (7) → install (8) → source (10)
- ISC-27: `scripts/check-deploy-contract.sh` — no tag, login, build-push, PR or deploy line differs from origin/main

## Not yet specified

- fog: whether the two-route structure (`/` and `/contact`) should stay, given the home page already carries every section and the nav offers only two destinations — resolves once the refreshed home page is on screen and the navigation reads either adequate or redundant.
- fog: whether the typing animation on the hero subtitle survives the refresh — resolves when the refreshed hero is viewed beside the current one. The refresh currently renders the subtitle as static monospace text; the animation was not carried over.
- fog: whether the refreshed layout holds at phone, tablet and desktop widths, and whether both themes read as intended — cannot resolve on this machine until a browser verifier is installed (see the 13:35 Decisions row).
