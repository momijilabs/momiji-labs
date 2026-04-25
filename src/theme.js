// ─────────────────────────────────────────────────────────────────
// Momiji Labs — Colour Theme
//
// To switch themes, change ACTIVE_THEME below, then commit + push.
// Options: 'amber' | 'crimson'
// ─────────────────────────────────────────────────────────────────
export const ACTIVE_THEME = 'amber'

export const themes = {
  amber: {
    accent:          '#D97706',               // amber-600
    accentHover:     '#B45309',               // amber-700
    accentSoftBg:    'rgba(217,119,6,0.07)',   // tinted bg (eyebrow tag, etc.)
    accentSoftBorder:'rgba(217,119,6,0.25)',   // tinted border
    accentGlowBg:    'rgba(217,119,6,0.09)',   // hero ambient glow (used outside hero)
    accentGlow:      'rgba(217,119,6,0.30)',   // text-shadow glow
    heroGlowBg:      'rgba(217,119,6,0.22)',   // stronger focused glow for hero section
    // "In Development" product badge (themed to match accent)
    badgeClass:      'bg-amber-50 text-amber-700 border border-amber-200',
    badgeDot:        'bg-amber-600',
    // Button text colour — white text on amber for better contrast
    btnText:         '#FAFAFA',
    btnSpinner:      'border-white/20 border-t-white',
    // Hero background — light backdrop
    heroIsDark:      false,
    heroBg:          '#FAFAFA',               // zinc-50
    heroGridColor:   'rgba(0,0,0,0.4)',       // dark grid lines on light bg
  },
  crimson: {
    accent:          '#DC2626',               // red-600
    accentHover:     '#B91C1C',               // red-700
    accentSoftBg:    'rgba(220,38,38,0.07)',
    accentSoftBorder:'rgba(220,38,38,0.25)',
    accentGlowBg:    'rgba(220,38,38,0.09)',
    accentGlow:      'rgba(220,38,38,0.30)',
    heroGlowBg:      'rgba(220,38,38,0.15)',   // stronger focused glow for hero section
    // "In Development" stays amber — red would read as risk/blocked, not in-progress
    badgeClass:      'bg-amber-50 text-amber-700 border border-amber-200',
    badgeDot:        'bg-amber-600',
    // Button text colour — white text on crimson
    btnText:         '#FAFAFA',
    btnSpinner:      'border-white/20 border-t-white',
    // Hero background — crimson uses a light bg so it doesn't read as halloween
    heroIsDark:      false,
    heroBg:          '#FAFAFA',               // zinc-50, clean off-white
    heroGridColor:   'rgba(0,0,0,0.4)',       // dark grid lines on light bg
  },
}

export const theme = themes[ACTIVE_THEME]
