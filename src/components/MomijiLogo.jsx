/**
 * MomijiLogo — the brand wordmark "momiji. LABS" as an inline SVG.
 *
 * Based on the Momiji Labs brand system (branding/brand-showcase/concepts-final.jsx).
 * - "momiji" in Space Grotesk 600 at natural tracking
 * - Square period (rect) in accent color — the only hard-cornered moment
 * - "LABS" in Space Grotesk 500, tracked uppercase, vertically centred on x-height
 *
 * Props:
 *   size   — target height in px (default 36). Width scales proportionally.
 *   color  — text fill (default white for dark surfaces)
 *   accent — period + LABS accent fill (default amber #D97706)
 */

const FONT_WORDMARK = `'Space Grotesk', ui-sans-serif, system-ui, sans-serif`

// Glyph measurements at fontSize=200, Space Grotesk 600 (from brand spec):
//   m: 0–171, o: 171–293.6, m: 293.6–464.6, i: 464.6–516.8, j: 516.8–569.4, i: 569.4–621.6
const WORD_END   = 621.6
const BASE_Y     = 220      // text baseline
const PERIOD_SIDE = 32
const PERIOD_GAP  = 16
const PERIOD_X    = WORD_END + PERIOD_GAP              // 637.6
const PERIOD_Y    = BASE_Y - PERIOD_SIDE               // 188
const PERIOD_END  = PERIOD_X + PERIOD_SIDE             // 669.6

const LABS_FS     = 64
const LABS_LS     = 12
const LABS_W      = 204.7
const LABS_GAP    = 36
const LABS_X      = PERIOD_END + LABS_GAP              // 705.6
const LABS_BASE_Y = 182                                // vertically centred on x-height

const TOTAL_W = LABS_X + LABS_W + 6                   // ≈ 916.3
const TOTAL_H = BASE_Y + 30                            // 250 (includes j descender)

export default function MomijiLogo({
  size   = 36,
  color  = '#FAFAFA',
  accent = '#D97706',
}) {
  const renderH = size * 1.15
  const renderW = (TOTAL_W / TOTAL_H) * renderH

  return (
    <svg
      viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
      width={renderW}
      height={renderH}
      style={{ display: 'inline-block', overflow: 'visible', flexShrink: 0 }}
      aria-label="Momiji Labs"
    >
      {/* "momiji" wordmark */}
      <text
        x={0}
        y={BASE_Y}
        fontFamily={FONT_WORDMARK}
        fontWeight={600}
        fontSize={200}
        fill={color}
        style={{ fontFeatureSettings: '"kern" 1' }}
      >
        momiji
      </text>

      {/* Square period in accent */}
      <rect
        x={PERIOD_X}
        y={PERIOD_Y}
        width={PERIOD_SIDE}
        height={PERIOD_SIDE}
        rx={3}
        fill={accent}
      />

      {/* "LABS" — tracked uppercase, vertically centred on x-height */}
      <text
        x={LABS_X}
        y={LABS_BASE_Y}
        fontFamily={FONT_WORDMARK}
        fontWeight={500}
        fontSize={LABS_FS}
        letterSpacing={LABS_LS}
        fill={color}
        style={{ fontFeatureSettings: '"kern" 1' }}
      >
        LABS
      </text>
    </svg>
  )
}
