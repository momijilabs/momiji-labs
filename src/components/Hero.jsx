import { motion } from 'framer-motion'
import { theme } from '../theme'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero() {
  const isDark = theme.heroIsDark

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden"
      style={{ background: theme.heroBg }}
    >
      {/* Ambient glow — tight ellipse centred on headline, fades before reaching page edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 38% at 50% 40%, ${theme.heroGlowBg} 0%, transparent 80%)`,
        }}
      />

      {/* Subtle grid overlay — 48px per brand spec */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isDark ? 0.03 : 0.05,
          backgroundImage: `linear-gradient(${theme.heroGridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.heroGridColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7">

        {/* Eyebrow tag */}
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{
              background: 'var(--accent-soft-bg)',
              border: '1px solid var(--accent-soft-border)',
              color: 'var(--color-accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full accent-dot animate-pulse" />
            Independent Software Studio · Made in Canada
          </span>
        </motion.div>

        {/* Headline — Space Grotesk 600 per brand Typography artboard */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.07]"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: isDark ? '#FAFAFA' : '#09090B',
          }}
        >
          Building thoughtful,{' '}
          <span
            className="accent-text"
            style={{ textShadow: `0 0 40px var(--accent-glow)` }}
          >
            AI-powered
          </span>
          {' '}apps for everyday life.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl max-w-2xl leading-relaxed"
          style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
        >
          Simple tools. Meaningful impact. We build software that solves real problems —
          for parents, landlords, commuters, and you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-3 mt-1"
        >
          <button
            onClick={scrollToProducts}
            className="accent-bg px-7 py-3.5 rounded-lg font-semibold text-sm cursor-pointer tracking-wide"
            style={{ color: theme.btnText }}
          >
            Explore Our Products
          </button>
          <button
            onClick={scrollToContact}
            className="px-7 py-3.5 rounded-lg font-semibold text-sm cursor-pointer bg-transparent transition-colors"
            style={{
              border: '1.5px solid var(--color-accent)',
              color: 'var(--color-accent)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent-hover)'
              e.currentTarget.style.color = 'var(--color-accent-hover)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ color: isDark ? '#71717A' : '#A1A1AA' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          width="24" height="24" viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </section>
  )
}
