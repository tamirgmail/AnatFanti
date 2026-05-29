# CLAUDE.md

## What this is

A **static, zero-build, bilingual (English/Hebrew) personal website** for Anat Fanti, a
wellbeing/happiness researcher and speaker — branded "Happiness Intelligence with Dr Fanti."
No framework, no bundler, no `package.json`. Plain HTML/CSS/vanilla JS served directly by Vercel.

## Files

- `index.html` — the entire public site (single page). Sections: header/nav, hero, expertise
  cards, feature cards, media grid, speaking, contact form, footer. Content hooks:
  - `data-field="..."` → editable content text (rendered from `content[lang]` in app.js)
  - `data-i18n="..."` → static UI strings (rendered from `translations[lang]`)
- `app.js` — the engine for the public site. Contains:
  - `defaultContent` — all EN/HE copy, `media` items, and `talks`
  - `translations` — EN/HE UI strings
  - `themes` — 4 color palettes (`scholar`, `editorial`, `warm`, `clear`)
  - all rendering (`render`, `renderMedia`, `renderTalks`, ...) and event wiring
  - the inline `<dialog>` editor logic
- `styles.css` — CSS-variable-driven theming. Each theme is a `body[data-theme="..."]` block
  that overrides root vars. Shared between index.html and admin.html.
- `admin.html` / `admin.js` / `admin.css` — standalone editor at `/admin.html` with sidebar
  tabs (Pages / Text / Articles & videos / Talks / Design). Mirrors the inline editor.
  Note: `admin.js` keeps its **own copy** of default content (`adminDefaultContent`).
- `Media/` — portraits and reference images.
- `favicon.svg`, `vercel.json` (`cleanUrls`, `trailingSlash: false`).
- `v0-export/` — a Next.js/React/Tailwind export from v0, used only as a visual reference.
  **Gitignored, not deployed.** Do not treat it as the site's source.

## Content & editing model

- Content lives in `defaultContent` (in code) and is **edited/persisted in `localStorage`**
  under key `anat-fanti-site-content`. There is no backend.
- The intended way to persist real edits is **Export JSON** (then commit the updated defaults
  or import elsewhere). Saves otherwise only live in the current browser.
- Two editors, both client-side: the inline `<dialog>` in index.html, and `/admin.html`.
  Inline editor opens via the `#admin` hash, typing `welledit` on the page, or **3 clicks on
  the footer "powered by" logo**.

## Conventions

- **Keep both languages in sync.** Any content/field change must update both `en` and `he`
  in `defaultContent` (and in `adminDefaultContent` in admin.js if relevant).
- New editable field = add to `defaultContent` (en + he), add to `editableFields` in app.js,
  add a `data-field`/`data-i18n` hook in index.html.
- All user/content strings are rendered through `escapeHtml` / `escapeAttribute` — keep it that way.
- **Manual cache-busting:** when you change `styles.css`, `app.js`, `admin.js`, or `admin.css`,
  bump the `?v=YYYYMMDD-N` query string on the corresponding `<link>`/`<script>` in
  index.html / admin.html. (RTL handling: `render()` sets `body.dir = "rtl"` for Hebrew.)

## Deploy

- `main` → production. `staging` → `staging.*` subdomain (this is the current working branch).
- `render()` swaps the page title to "Staging | Anat Fanti" when the hostname contains "staging".
- No build step. Open `index.html` directly or serve the folder with any static server.

## ⚠️ Security note

Admin credentials are **hardcoded in client-side JS** (`app.js`, `admin.js`) and are visible
to anyone viewing source. This is acknowledged as prototype-only login; edits are localStorage-only
so nothing sensitive is currently exposed. **If a real backend/CMS is ever added, move auth
server-side** — do not rely on this check.
