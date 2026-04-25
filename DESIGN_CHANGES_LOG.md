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

---

*To see what changed in any file vs. baseline commit, run:*
```
git diff 1f8de58 src/components/Hero.jsx
```
