# Design Changes Log

## Pre-change baseline
**Git commit:** `1f8de58` — "Intro of branding themes of Amber vs. Crimson"

To revert all changes below to this baseline:
```
git checkout 1f8de58 -- src/
```
Or to revert individual files, e.g.:
```
git checkout 1f8de58 -- src/components/Hero.jsx
```

---

## UI Polish Pass — Amber consistency sweep

### theme.js
- Added `heroGlowBg` property to both `amber` and `crimson` themes
  - Amber: `rgba(217,119,6,0.22)` — stronger, more focused glow for hero
  - Crimson: `rgba(220,38,38,0.15)` — matched strength for crimson

### Hero.jsx
1. **Glow fix** — reduced radial gradient ellipse from `90% 60%` to `65% 45%` and switched to `theme.heroGlowBg` (higher opacity). Prevents the glow from reaching page edges and reading as salmon/peach border.
2. **"Get In Touch" button** — changed from neutral dark border/text to amber border (`var(--color-accent)`) with amber text, using CSS vars (theme-aware).

### About.jsx
3. **Value card left border** — added `borderLeft: 4px solid var(--color-accent)` to all three value cards (Real Problems, Simple by Design, AI with Purpose). Right/top/bottom remain light gray.

### Products.jsx
4. **Product card hover** — added `useState` hover tracking; on hover: left accent bar becomes visible (absolute positioned, matches existing top bar approach) + amber-tinted `box-shadow`.
5. **Description text contrast** — changed product description color from `--color-text-dark-muted` (gray-400, too light) to `--color-text-dark-secondary` (gray-600).
6. **"Launch App" link** — changed from neutral gray to `accent-text` (amber) with underline on hover.
7. **"Get notified →" link** — same treatment as "Launch App".

### Contact.jsx
8. **Email address** — changed from dark text (turning accent on hover) to accent-colored by default, with underline on hover.

### App.jsx
9. **Wrapper background** — changed `background` on the outer `<div>` from `var(--color-bg-primary)` (zinc-950 dark) to `var(--color-bg-light)`. The dark wrapper was bleeding through at page edges when the hero switched to a light background.

### theme.js (continued)
10. **`btnText` / `btnSpinner`** — added per-theme button text and spinner colours. Amber: dark text `#09090B`; Crimson: white text `#FAFAFA`.
11. **`heroIsDark` / `heroBg` / `heroGridColor`** — added per-theme hero background properties. Amber and Crimson both use `heroIsDark: false` (light hero) with `heroBg: '#FAFAFA'` and dark grid lines.

### Navbar.jsx
12. **Button text** — Navbar CTA button now reads `theme.btnText` so it inherits the per-theme colour (consistent with Hero and Contact submit).

### Hero.jsx (continued)
13. **Glow further tightened** — ellipse reduced from `65% 45%` to `45% 38%` with `transparent 80%` stop. `heroGlowBg` increased to `rgba(217,119,6,0.22)` to compensate, keeping the glow visible but fully contained within the headline area.

---

## Contact section expansion — April 25 2026

### Contact.jsx
1. **Three new info rows** added below the email link (icon + text pattern, all using CSS vars — theme-transferrable):
   - **Location** — `MapPin` icon, text: "Vaughan, ON, Canada"
   - **Response time** — `Clock` icon, text: "We reply within 1–2 business days"
   - **Open to** — `Handshake` icon, labelled sub-header + text: "Partnerships, product feedback, investment inquiries & press."
2. **Email link styling** — email text colour changed from accent (amber) to dark (`--color-text-dark`) at rest, with a permanent amber underline (`textDecorationColor: var(--color-accent)`). On hover: text shifts to amber and underline thickens from 1 px to 2 px. Icon box still transitions on hover.
3. **Textarea height** — `rows` increased from 4 to 7 to better balance the right-column form height against the four info rows on the left.
4. **Row hover interaction** — all three static info rows (Location, Response time, Open to) now track hover state. Hovering anywhere over the row — text or icon — triggers the same icon box animation as the email row (amber border + tinted background). Rows use `cursor-default` since they are not clickable links.
5. **"Open to" text** — removed "& collaborations" from "Partnerships & collaborations" to reduce line count and improve left/right column balance.

### Footer.jsx
6. **Location removed** — "— Vaughan, ON, Canada" span and its flex wrapper removed from the footer logo row. Location now lives exclusively in the Contact section.

---

## Button text colour — April 25 2026

### theme.js
- **Amber `btnText` updated** — changed from `#09090B` (near-black) to `#FAFAFA` (white). Spinner class updated from `border-zinc-900/20 border-t-zinc-900` to `border-white/20 border-t-white`. Both themes now use white button text.
- Applies to all four amber-coloured buttons across the site: Hero CTA, Navbar desktop, Navbar mobile, Contact submit.

---

## Google Analytics — April 25 2026

### index.html
- Added GA4 tag (Measurement ID: `G-SLWMK5ZFWE`) immediately after the viewport `<meta>` tag, before primary meta tags
- Two scripts: async loader from `googletagmanager.com` + inline `gtag('config', ...)` initialiser
- Enhanced Measurement enabled in GA dashboard: page views, scrolls, outbound clicks, + 4 more (auto-tracked, no extra code)
- Tag installation verified ✅ via GA "Test installation" tool
- GA property: "momijilabs.com" · Stream: "Momiji Labs Website" · Data stream URL updated to `momijilabs.com` ✅

---

## Phase 1 Code Review Cleanup — April 26 2026

### Contact.jsx
1. **Stale TODO removed** — `// TODO: set up Zoho Mail when domain is ready` removed from `BUSINESS_EMAIL` constant (Zoho Mail has been live since April 25).
2. **JS form validation added** — `formError` state added. `handleChange` clears `formError` on each keystroke. `handleSubmit` now checks `name`, `email`, and `message` are non-empty before calling EmailJS; if not, sets `formError` with "Please fill in all required fields." and returns early. Error displays inline above the submit button using the same `AlertCircle` pattern as the EmailJS error.

### Footer.jsx
3. **Social icon swap** — GitHub icon removed (GitHub org not intended to be public-facing). LinkedIn icon restored with the confirmed company page URL: `https://www.linkedin.com/company/momijilabs`. `LinkedInIcon` SVG component is back; `GitHubIcon` component and its `<a>` anchor removed entirely.

### .gitignore
4. **`export-logo.html` gitignored** — Added under a new "Local utilities" section. The file is a browser-based canvas PNG exporter for the logo; it is a local tool, not part of the shipped website.

### DESIGN_CHANGES_LOG.md
5. **Double separator fixed** — Removed duplicate `---` between the "Button text colour" and "Google Analytics" sections.
6. **Stale GA note updated** — Data stream URL note changed from "(update to momijilabs.com once domain is live)" to "updated to momijilabs.com ✅".

---

*To see what changed in any file vs. baseline commit, run:*
```
git diff 1f8de58 src/components/Hero.jsx
```
